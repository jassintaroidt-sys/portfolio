import { lazy, Suspense } from 'react';
import { Overlay } from '../ui/Overlay';

// Code-splitting via React.lazy per BRIEF §8.4
const ParticipationPage = lazy(() =>
  import('./ParticipationPage').then((m) => ({ default: m.ParticipationPage }))
);
const AchievementPage = lazy(() =>
  import('./AchievementPage').then((m) => ({ default: m.AchievementPage }))
);
const MagazineArtPage = lazy(() =>
  import('./MagazineArtPage').then((m) => ({ default: m.MagazineArtPage }))
);
const PhotographyPage = lazy(() =>
  import('./PhotographyPage').then((m) => ({ default: m.PhotographyPage }))
);
const MyMessagePage = lazy(() =>
  import('./MyMessagePage').then((m) => ({ default: m.MyMessagePage }))
);
const MyStrategyPage = lazy(() =>
  import('./MyStrategyPage').then((m) => ({ default: m.MyStrategyPage }))
);
const NotesPage = lazy(() =>
  import('./NotesPage').then((m) => ({ default: m.NotesPage }))
);
const StrategyDetailPage = lazy(() =>
  import('./StrategyDetailPage').then((m) => ({ default: m.StrategyDetailPage }))
);

export interface RouteOverlayManagerProps {
  route: string;
  isOverlayRoute: boolean;
  overlayName: string;
  onClose: () => void;
}

export function RouteOverlayManager({
  route,
  isOverlayRoute,
  overlayName,
  onClose,
}: RouteOverlayManagerProps): JSX.Element | null {
  if (!isOverlayRoute) return null;

  const renderContent = () => {
    if (route.startsWith('strategy/')) {
      const slug = route.replace(/^strategy\//, '');
      return <StrategyDetailPage slug={slug} />;
    }

    switch (route) {
      case 'participation':
        return <ParticipationPage />;
      case 'achievement':
        return <AchievementPage />;
      case 'magazine-art':
        return <MagazineArtPage />;
      case 'photography':
        return <PhotographyPage />;
      case 'my-message':
        return <MyMessagePage />;
      case 'my-strategy':
        return <MyStrategyPage />;
      case 'notes':
        return <NotesPage />;
      default:
        return (
          <div className="py-8 text-center flex flex-col items-center">
            <h3 className="font-serif text-2xl font-bold text-ink mb-2">
              {overlayName}
            </h3>
            <p className="font-mono text-xs text-gray-500 mb-6">
              Route: <code className="bg-blush/40 px-2 py-1 rounded">#/{route}</code>
            </p>
          </div>
        );
    }
  };

  return (
    <Overlay isOpen={isOverlayRoute} onClose={onClose} title={overlayName}>
      <Suspense
        fallback={
          <div className="py-16 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-3 border-hot-pink border-t-transparent animate-spin" />
            <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
              Loading Page...
            </span>
          </div>
        }
      >
        {renderContent()}
      </Suspense>
    </Overlay>
  );
}

export default RouteOverlayManager;
