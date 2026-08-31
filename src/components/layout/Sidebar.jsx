import React from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { 
  Compass, 
  Headphones, 
  Users, 
  Sparkles, 
  Layers, 
  Map as MapIcon, 
  Bookmark, 
  MapPin, 
  ChevronRight,
  Search
} from 'lucide-react';
import { AudioWave } from '../common/AudioWave';

export const Sidebar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentCity, 
    setIsLocationPickerOpen,
    guideState,
    savedHeritageIds,
    savedStoryIds,
    userPassport,
    setIsSearchModalOpen,
    isDetailViewOpen,
    closeMonumentDetail
  } = useHeritage();

  const navItems = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { 
      id: 'guide', 
      label: 'AI Guide', 
      icon: Headphones,
      badge: guideState.isPlaying ? 'Active' : null,
      showWave: guideState.isPlaying
    },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'recommendations', label: 'Curated', icon: Sparkles },
    { id: 'culture', label: 'Cultural Mosaic', icon: Layers },
    { id: 'map', label: 'Discovery Map', icon: MapIcon },
    { 
      id: 'profile', 
      label: 'Saved & Passport', 
      icon: Bookmark,
      count: savedHeritageIds.length + savedStoryIds.length
    }
  ];

  const handleNavClick = (tabId) => {
    if (isDetailViewOpen) {
      closeMonumentDetail();
    }
    setActiveTab(tabId);
  };

  return (
    <aside className="hidden md:flex flex-col justify-between w-64 h-screen sticky top-0 bg-white border-r border-heritage-border z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-heritage-border/60">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('explore')}>
            <div className="w-10 h-10 rounded-xl bg-heritage-red text-white flex items-center justify-center font-editorial-heading text-xl font-bold shadow-subtle">
              वि
            </div>
            <div>
              <h1 className="font-editorial-heading font-bold text-xl tracking-wider text-heritage-textDark leading-none">
                VIRASAT
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-heritage-textMuted font-medium mt-1">
                Heritage Intelligence
              </p>
            </div>
          </div>

          {/* Quick Search Bar Trigger */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full mt-5 flex items-center justify-between px-3 py-2 bg-heritage-bg hover:bg-heritage-beige border border-heritage-border rounded-lg text-left text-xs text-heritage-textMuted transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-heritage-red" />
              Search culture, sites...
            </span>
            <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-heritage-border font-mono text-heritage-textMuted">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          <p className="px-3 py-1 text-[11px] font-semibold tracking-wider text-heritage-textMuted/80 uppercase">
            Platform Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !isDetailViewOpen;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-red-50 text-heritage-red shadow-sm'
                    : 'text-heritage-textDark/80 hover:bg-heritage-bg hover:text-heritage-textDark'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-heritage-red' : 'text-heritage-textMuted group-hover:text-heritage-textDark'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.showWave && <AudioWave isPlaying={true} barCount={4} />}
                  {item.badge && (
                    <span className="text-[10px] bg-heritage-red text-white px-2 py-0.5 rounded-full font-semibold">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-[10px] bg-heritage-beige text-heritage-textDark px-2 py-0.5 rounded-full font-medium border border-heritage-border">
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Location & User Passport Card */}
      <div className="p-4 space-y-3 border-t border-heritage-border/60 bg-heritage-bg/50">
        {/* Current Location Switcher Button */}
        <div
          onClick={() => setIsLocationPickerOpen(true)}
          className="p-3 bg-white hover:bg-heritage-cardHover border border-heritage-border rounded-xl cursor-pointer transition-all shadow-subtle group"
        >
          <div className="flex items-center justify-between text-xs text-heritage-textMuted mb-1">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-heritage-red" />
              Active Region
            </span>
            <span className="text-[10px] text-heritage-red group-hover:underline">Change</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-heritage-textDark leading-tight">
                {currentCity.name}, {currentCity.state}
              </p>
              <p className="text-[11px] text-heritage-textMuted mt-0.5">
                {currentCity.heritageCount} Heritage Sites Nearby
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-heritage-textMuted group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* User Cultural Passport Profile */}
        <div 
          onClick={() => handleNavClick('profile')}
          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white cursor-pointer transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-heritage-beige border border-heritage-border flex items-center justify-center font-bold text-xs text-heritage-red">
            YR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-heritage-textDark truncate">
              {userPassport.name}
            </p>
            <p className="text-[10px] text-heritage-textMuted truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-heritage-gold inline-block"></span>
              {userPassport.levelTitle}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
