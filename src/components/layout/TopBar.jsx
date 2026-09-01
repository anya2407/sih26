import React from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { 
  Search,
  Bookmark, 
  ArrowLeft
} from 'lucide-react';
import { AudioWave } from '../common/AudioWave';

export const TopBar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentCity,
    setIsSearchModalOpen,
    guideState,
    toggleAudioPlayback,
    savedHeritageIds,
    savedStoryIds,
    isDetailViewOpen,
    closeMonumentDetail,
    currentMonument
  } = useHeritage();

  const tabTitles = {
    explore: 'Cultural Discovery',
    guide: 'AI Voice Heritage Companion',
    community: 'Community Cultural Archive',
    culture: 'Indian Cultural Mosaic',
    map: 'Heritage Discovery Map',
    profile: 'Saved & Cultural Passport'
  };

  const totalSaved = savedHeritageIds.length + savedStoryIds.length;

  return (
    <header className="sticky top-0 z-20 bg-heritage-bg/90 backdrop-blur-md border-b border-heritage-border/70 px-4 md:px-8 py-3.5 flex items-center justify-between transition-all">
      {/* Left Title / Breadcrumbs */}
      <div className="flex items-center gap-3">
        {isDetailViewOpen ? (
          <button
            onClick={closeMonumentDetail}
            className="flex items-center gap-2 text-sm font-medium text-heritage-textMuted hover:text-heritage-textDark px-2.5 py-1.5 rounded-lg hover:bg-heritage-beige transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-heritage-red" />
            <span>Back to Discovery</span>
          </button>
        ) : (
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-heritage-textMuted/90">
              {currentCity.name} · {currentCity.state}
            </span>
            <h2 className="font-editorial-heading font-semibold text-lg md:text-xl text-heritage-textDark leading-tight">
              {tabTitles[activeTab]}
            </h2>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Active AI Guide Mini Status */}
        {guideState.isPlaying && (
          <button
            onClick={() => setActiveTab('guide')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-red-50 hover:bg-red-100/80 border border-red-200 text-heritage-red rounded-full text-xs font-semibold transition-all shadow-subtle"
          >
            <AudioWave isPlaying={true} barCount={4} />
            <span className="truncate max-w-[120px]">Guide Active</span>
          </button>
        )}

        {/* Global Search Button */}
        <button
          onClick={() => {
            setActiveTab('explore');
            setIsSearchModalOpen(true);
          }}
          className="p-2 md:px-3 md:py-2 text-heritage-textMuted hover:text-heritage-textDark hover:bg-heritage-beige rounded-xl border border-heritage-border/80 flex items-center gap-2 text-xs font-medium transition-colors"
          title="Search Cultural Heritage"
        >
          <Search className="w-4 h-4 text-heritage-red" />
          <span className="hidden lg:inline">Search</span>
        </button>

        {/* Saved Items Shortcut */}
        <button
          onClick={() => setActiveTab('profile')}
          className="relative p-2 text-heritage-textMuted hover:text-heritage-textDark hover:bg-heritage-beige rounded-xl border border-heritage-border/80 transition-colors"
          title="Saved Cultural Items"
        >
          <Bookmark className="w-4 h-4" />
          {totalSaved > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-heritage-red text-white text-[9px] font-bold flex items-center justify-center">
              {totalSaved}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
