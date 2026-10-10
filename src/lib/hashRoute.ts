import { useState, useEffect, useCallback } from 'react';

export function getHashRoute(): string {
  if (typeof window === 'undefined') return '';
  return window.location.hash.replace(/^#\/?/, '').trim();
}

export function setHashRoute(route: string): void {
  if (typeof window === 'undefined') return;
  if (!route) {
    // Retain scroll position when clearing hash route per BRIEF §7.1
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  } else {
    window.location.hash = `#/${route.replace(/^\/+/, '')}`;
  }
}

export function closeHashRoute(): void {
  if (typeof window === 'undefined') return;
  if (window.location.hash && window.location.hash !== '#/' && window.location.hash !== '#') {
    window.history.back();
  } else {
    setHashRoute('');
  }
}

export function useHashRoute(): {
  route: string;
  isOverlayRoute: boolean;
  overlayName: string;
  closeOverlay: () => void;
  openRoute: (r: string) => void;
} {
  const [route, setRoute] = useState<string>(getHashRoute);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getHashRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const closeOverlay = useCallback(() => {
    closeHashRoute();
  }, []);

  const openRoute = useCallback((r: string) => {
    setHashRoute(r);
  }, []);

  // Determine if active route is one of the §7.1 overlay routes
  const OVERLAY_ROUTES = [
    'participation',
    'achievement',
    'my-message',
    'magazine-art',
    'photography',
    'my-strategy',
    'notes',
  ];

  const isStrategyRoute = route.startsWith('strategy/');
  const isOverlayRoute = OVERLAY_ROUTES.includes(route) || isStrategyRoute;

  let overlayName = '';
  if (isOverlayRoute) {
    if (isStrategyRoute) {
      const variant = route.split('/')[1] || '';
      overlayName = `Strategy: ${variant.replace(/-/g, ' ').toUpperCase()}`;
    } else {
      overlayName = route
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
  }

  return {
    route,
    isOverlayRoute,
    overlayName,
    closeOverlay,
    openRoute,
  };
}
