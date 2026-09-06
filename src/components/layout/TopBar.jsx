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
    locationState,
    setIsSearchModalOpen,
    guideState,
    savedHeritageIds,
    savedStoryIds,
    isDetailViewOpen,
    closeMonumentDetail
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
    <header className="sticky top-0 z-20 px-4 md:px-8 pt-3 pb-2 transition-all pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between px-5 py-3 rounded-full bg-[#F5EDE0]/88 backdrop-blur-xl border border-heritage-red/15 shadow-md">
        {/* Left Title / Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('explore')} 
            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity pr-2 border-r border-[#C0392B]/20"
          >
            <div className="w-8 h-8 rounded-full bg-[#C0392B] text-[#F8F3EC] flex items-center justify-center font-serif font-bold text-xs shadow-sm">
              स्मृ
            </div>
            <span className="font-serif font-bold text-lg text-[#96281B] tracking-wide hidden sm:inline">
              Smriti
            </span>
          </button>

          {isDetailViewOpen ? (
            <button
              onClick={closeMonumentDetail}
              className="flex items-center gap-2 text-xs font-serif text-heritage-red hover:opacity-80 px-3 py-1.5 rounded-full bg-white/70 border border-heritage-red/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-heritage-red" />
              <span>← Back to Discovery</span>
            </button>
          ) : (
            <div>
              <span className="text-[9px] uppercase font-sans font-semibold tracking-[0.22em] text-heritage-red">
                ✦ {locationState.state ? `${locationState.monumentName ? `${locationState.monumentName} · ` : ''}${locationState.state}` : `${currentCity.name} · ${currentCity.state}`}
              </span>
              <h2 className="font-display font-bold text-base md:text-lg text-heritage-textDark leading-tight">
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
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-heritage-red/10 border border-heritage-red/30 text-heritage-red rounded-full text-xs font-serif font-semibold transition-all shadow-subtle hover:bg-heritage-red hover:text-white"
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
            className="p-2 md:px-3.5 md:py-1.5 text-heritage-textDark hover:text-white hover:bg-heritage-red rounded-full border border-heritage-red/20 bg-white/80 flex items-center gap-2 text-xs font-bodoni transition-all shadow-sm"
            title="Search Cultural Heritage"
          >
            <Search className="w-3.5 h-3.5 text-heritage-red" />
            <span className="hidden lg:inline">Search</span>
          </button>

          {/* Saved Items Shortcut */}
          <button
            onClick={() => setActiveTab('profile')}
            className="relative p-2 text-heritage-textDark hover:bg-white rounded-full border border-heritage-red/20 bg-white/60 transition-colors shadow-sm"
            title="Saved Cultural Items"
          >
            <Bookmark className="w-4 h-4 text-heritage-red" />
            {totalSaved > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-heritage-red text-white text-[9px] font-bold font-sans flex items-center justify-center shadow-sm">
                {totalSaved}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
