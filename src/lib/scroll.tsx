import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';

interface ScrollToOptions {
  offset?: number;
  immediate?: boolean;
  duration?: number;
  easing?: (t: number) => number;
}

interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: ScrollToOptions) => void;
  lockScroll: () => void;
  unlockScroll: () => void;
  isLocked: boolean;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
  lockScroll: () => {},
  unlockScroll: () => {},
  isLocked: false,
});

export function useLenis(): LenisContextValue {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: React.ReactNode;
  autoStart?: boolean;
}

export function LenisProvider({ children, autoStart = true }: LenisProviderProps): JSX.Element {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(!autoStart);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Smooth scrolling strictly via Lenis per BRIEF §0, §1, §7.3
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      autoRaf: false,
    });

    lenisRef.current = instance;
    setLenis(instance);

    if (!autoStart) {
      instance.stop();
    }

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [autoStart]);

  const scrollTo = useCallback((target: string | HTMLElement | number, options?: ScrollToOptions) => {
    if (!lenisRef.current) return;
    lenisRef.current.scrollTo(target, {
      offset: options?.offset ?? 0,
      immediate: options?.immediate ?? false,
      duration: options?.duration ?? 1.2,
      easing: options?.easing,
    });
  }, []);

  const lockScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
    setIsLocked(true);
  }, []);

  const unlockScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
    setIsLocked(false);
  }, []);

  return (
    <LenisContext.Provider value={{ lenis, scrollTo, lockScroll, unlockScroll, isLocked }}>
      {children}
    </LenisContext.Provider>
  );
}
