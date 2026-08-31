import React from 'react';
import { HeritageProvider, useHeritage } from './context/HeritageContext';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { TopBar } from './components/layout/TopBar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { LocationOnboarding } from './components/location/LocationOnboarding';
import { LocationPickerModal } from './components/location/LocationPickerModal';
import { ExploreDashboard } from './components/explore/ExploreDashboard';
import { AIGuideView } from './components/guide/AIGuideView';
import { MiniPlayer } from './components/guide/MiniPlayer';
import { HeritageDetailView } from './components/detail/HeritageDetailView';
import { CommunityView } from './components/community/CommunityView';
import { RecommendationsView } from './components/recommendations/RecommendationsView';
import { CultureExplorerView } from './components/culture/CultureExplorerView';
import { HeritageMapView } from './components/map/HeritageMapView';
import { UserProfileView } from './components/profile/UserProfileView';
import { NotificationToast } from './components/common/NotificationToast';

const MainApp = () => {
  const { 
    isOnboarded, 
    activeTab, 
    isDetailViewOpen 
  } = useHeritage();

  // If user has not completed location onboarding, show opening hero onboarding screen
  if (!isOnboarded) {
    return (
      <>
        <LocationOnboarding />
        <LocationPickerModal />
        <NotificationToast />
      </>
    );
  }

  // Render view based on active tab and detail view state
  const renderActiveView = () => {
    if (isDetailViewOpen) {
      return <HeritageDetailView />;
    }

    switch (activeTab) {
      case 'explore':
        return <ExploreDashboard />;
      case 'guide':
        return <AIGuideView />;
      case 'community':
        return <CommunityView />;
      case 'recommendations':
        return <RecommendationsView />;
      case 'culture':
        return <CultureExplorerView />;
      case 'map':
        return <HeritageMapView />;
      case 'profile':
        return <UserProfileView />;
      default:
        return <ExploreDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-heritage-bg flex flex-col md:flex-row text-heritage-textDark">
      {/* Refined Desktop Left Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Bar Navigation & Controls */}
        <TopBar />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-12">
          {renderActiveView()}
        </main>
      </div>

      {/* Persistent Floating Mini Audio Guide Player */}
      <MiniPlayer />

      {/* Responsive Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals & Notifications */}
      <GlobalSearchModal />
      <LocationPickerModal />
      <NotificationToast />
    </div>
  );
};

export function App() {
  return (
    <HeritageProvider>
      <MainApp />
    </HeritageProvider>
  );
}

export default App;
