import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { CITIES_DATA } from '../../data/citiesData';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { AudioWave } from '../common/AudioWave';

export const TopBar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentCity, 
    setCity, 
    setIsLocationPickerOpen,
    setIsSearchModalOpen,
    guideState,
    toggleAudioPlayback,
    savedHeritageIds,
    savedStoryIds,
    isDetailViewOpen,
    closeMonumentDetail,
    currentMonument
  } = useHeritage();

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const tabTitles = {
    explore: 'Cultural Discovery',
    guide: 'AI Voice Heritage Companion',
    community: 'Community Cultural Archive',
    recommendations: 'Curated Recommendations',
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
          onClick={() => setIsSearchModalOpen(true)}
          className="p-2 md:px-3 md:py-2 text-heritage-textMuted hover:text-heritage-textDark hover:bg-heritage-beige rounded-xl border border-heritage-border/80 flex items-center gap-2 text-xs font-medium transition-colors"
          title="Search Cultural Heritage"
        >
          <Search className="w-4 h-4 text-heritage-red" />
          <span className="hidden lg:inline">Search</span>
        </button>

        {/* Location Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-heritage-cardHover border border-heritage-border rounded-xl text-xs font-medium text-heritage-textDark shadow-subtle transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-heritage-red" />
            <span className="font-semibold">{currentCity.name}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-heritage-textMuted transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isCityDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-modal border border-heritage-border p-2 z-50 animate-fade-in">
              <div className="px-3 py-2 border-b border-heritage-border text-[11px] font-semibold text-heritage-textMuted uppercase tracking-wider flex items-center justify-between">
                <span>Select Heritage Hub</span>
                <span 
                  onClick={() => {
                    setIsCityDropdownOpen(false);
                    setIsLocationPickerOpen(true);
                  }}
                  className="text-heritage-red cursor-pointer hover:underline text-[10px]"
                >
                  Open Map
                </span>
              </div>
              <div className="max-h-60 overflow-y-auto py-1 space-y-1">
                {CITIES_DATA.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setCity(city.id);
                      setIsCityDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                      city.id === currentCity.id
                        ? 'bg-red-50 text-heritage-red font-semibold'
                        : 'hover:bg-heritage-bg text-heritage-textDark'
                    }`}
                  >
                    <div>
                      <p className="font-medium">{city.name}, {city.state}</p>
                      <p className="text-[10px] text-heritage-textMuted">{city.heritageCount} Monuments & Sites</p>
                    </div>
                    <span className="font-editorial-serif text-sm font-semibold opacity-70">
                      {city.hindiName}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

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
