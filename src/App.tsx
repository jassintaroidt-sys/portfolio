import { useState, useEffect } from 'react';
import { useHashRoute } from './lib/hashRoute';
import { LenisProvider } from './lib/scroll';
import { TokensPage } from './components/pages/TokensPage';
import { TornDemoPage } from './components/pages/TornDemoPage';
import { UiDemoPage } from './components/pages/UiDemoPage';
import { RouteOverlayManager } from './components/pages/RouteOverlayManager';
import { Preloader } from './components/ui/Preloader';
import { Opening } from './components/sections/Opening';
import { PersonalBrand } from './components/sections/PersonalBrand';
import { WritingPortfolio } from './components/sections/WritingPortfolio';
import { ContentMarketing } from './components/sections/ContentMarketing';
import { ExampleStrategy } from './components/sections/ExampleStrategy';
import { ProjectCampus } from './components/sections/ProjectCampus';
import { Podcast } from './components/sections/Podcast';
import { Archive } from './components/sections/Archive';
import { Contact } from './components/sections/Contact';
import { TocButton } from './components/nav/TocButton';

export function AppContent(): JSX.Element {
  const { route, isOverlayRoute, overlayName, closeOverlay } = useHashRoute();
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isLockerOpen, setIsLockerOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('opening');

  // Track active section via IntersectionObserver per BRIEF §7 & §7.3
  useEffect(() => {
    const sectionIds = [
      'opening',
      'personal-brand',
      'writing-portfolio',
      'content-marketing',
      'example-strategy',
      'project-campus',
      'podcast',
      'archive',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLockerOpen]);

  // Dedicated dev routes
  if (route === '__tokens') {
    return <TokensPage />;
  }
  if (route === '__torn') {
    return <TornDemoPage />;
  }
  if (route === '__ui') {
    return <UiDemoPage />;
  }

  const handleOpenLocker = () => {
    setIsLockerOpen(true);
  };

  // Sections with dedicated in-section INDEX buttons per BRIEF §7 (Cassette, Content Marketing, Video Reveal, Archive, Contact)
  const sectionsWithEmbeddedIndex = [
    'writing-portfolio',
    'content-marketing',
    'example-strategy',
    'archive',
    'contact',
  ];
  const hideFloatingIndex = sectionsWithEmbeddedIndex.includes(activeSectionId);

  return (
    <div className="relative w-full min-h-[100svh] overflow-x-clip bg-mist font-poppins">
      {!isPreloaderDone && <Preloader onLoaded={() => setIsPreloaderDone(true)} maxWaitMs={1800} />}

      {/* Discreet Dev Switcher Bar (top right, non-obtrusive) */}
      <div className="fixed top-2 right-2 z-50 flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <a
          href="#/__tokens"
          className="px-2 py-1 rounded-md bg-white/80 hover:bg-white text-[10px] font-mono font-bold text-hot-pink border border-warm-grey shadow-xs"
          title="Inspect Color Tokens"
        >
          Tokens
        </a>
        <a
          href="#/__torn"
          className="px-2 py-1 rounded-md bg-white/80 hover:bg-white text-[10px] font-mono font-bold text-berry border border-warm-grey shadow-xs"
          title="Inspect Torn Edges"
        >
          Torn
        </a>
        <a
          href="#/__ui"
          className="px-2 py-1 rounded-md bg-white/80 hover:bg-white text-[10px] font-mono font-bold text-grape-soda border border-warm-grey shadow-xs"
          title="Inspect UI Components"
        >
          UI
        </a>
      </div>

      {/* 1. Opening Section (State 1: Closed -> State 2: Open) (§9, seed 101) */}
      <Opening isOpenState={isLockerOpen} onOpen={handleOpenLocker} />

      {/* 2. Personal Brand Section (§11) */}
      <PersonalBrand />

      {/* 3. Writing Portfolio Section (§12, seed 202) */}
      <WritingPortfolio />

      {/* 4. Content Marketing Specialist Section (§13, seed 303) */}
      <ContentMarketing />

      {/* 5. Example Strategy Section (§14, seed 404) */}
      <ExampleStrategy />

      {/* 6. Project Campus Section (§15, seed 505) */}
      <ProjectCampus />

      {/* 7. Podcast Section (§16) */}
      <Podcast />

      {/* 8. Archive Section (§17, seed 606) */}
      <Archive />

      {/* 9. Contact Section (§18, final section - no tear at bottom) */}
      <Contact />

      {/* Floating Table of Contents Button (unlocked once locker is open; auto-hides when section has own INDEX) */}
      <TocButton
        activeSectionId={activeSectionId}
        hidden={hideFloatingIndex}
        isOpeningUnlocked={isLockerOpen}
      />

      {/* Accessible Route Modal Manager for all §7.1 routes */}
      <RouteOverlayManager
        route={route}
        isOverlayRoute={isOverlayRoute}
        overlayName={overlayName}
        onClose={closeOverlay}
      />
    </div>
  );
}

export function App(): JSX.Element {
  return (
    <LenisProvider autoStart={false}>
      <AppContent />
    </LenisProvider>
  );
}

export default App;
