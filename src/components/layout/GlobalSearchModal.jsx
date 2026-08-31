import React, { useState, useEffect } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { MOCK_HERITAGE } from '../../data/mockHeritage';
import { MOCK_CULTURE } from '../../data/mockCulture';
import { MOCK_STORIES } from '../../data/mockStories';
import { CITIES_DATA } from '../../data/citiesData';
import { Search, X, MapPin, Sparkles, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const GlobalSearchModal = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    openMonumentDetail, 
    setActiveTab, 
    setCity 
  } = useHeritage();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K or Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredMonuments = q
    ? MOCK_HERITAGE.filter(m => m.name.toLowerCase().includes(q) || m.locationName.toLowerCase().includes(q) || m.category.toLowerCase().includes(q))
    : MOCK_HERITAGE.slice(0, 3);

  const filteredCulture = q
    ? MOCK_CULTURE.filter(c => c.name.toLowerCase().includes(q) || c.domain.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q))
    : MOCK_CULTURE.slice(0, 2);

  const filteredStories = q
    ? MOCK_STORIES.filter(s => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q) || s.type.toLowerCase().includes(q))
    : MOCK_STORIES.slice(0, 2);

  const filteredCities = q
    ? CITIES_DATA.filter(c => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q))
    : [];

  const handleSelectMonument = (monumentId) => {
    setIsSearchModalOpen(false);
    openMonumentDetail(monumentId);
  };

  const handleSelectCulture = () => {
    setIsSearchModalOpen(false);
    setActiveTab('culture');
  };

  const handleSelectStory = () => {
    setIsSearchModalOpen(false);
    setActiveTab('community');
  };

  const handleSelectCity = (cityId) => {
    setIsSearchModalOpen(false);
    setCity(cityId);
    setActiveTab('explore');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-modal border border-heritage-border overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-heritage-border bg-heritage-bg/40">
          <Search className="w-5 h-5 text-heritage-red mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search monuments, textiles, oral stories, cities, or craft guilds..."
            className="w-full bg-transparent text-heritage-textDark placeholder-heritage-textMuted text-sm font-medium focus:outline-none"
            autoFocus
          />
          {query ? (
            <button onClick={() => setQuery('')} className="p-1 text-heritage-textMuted hover:text-heritage-textDark">
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="text-[10px] bg-white px-2 py-0.5 rounded border border-heritage-border text-heritage-textMuted font-mono">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5">
          {/* Cities section if matched */}
          {filteredCities.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-heritage-textMuted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-heritage-red" />
                Heritage Cities
              </p>
              <div className="grid grid-cols-2 gap-2">
                {filteredCities.map(city => (
                  <div
                    key={city.id}
                    onClick={() => handleSelectCity(city.id)}
                    className="p-3 bg-heritage-bg hover:bg-red-50 border border-heritage-border rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-xs text-heritage-textDark">{city.name}, {city.state}</p>
                      <p className="text-[10px] text-heritage-textMuted">{city.heritageCount} Monuments</p>
                    </div>
                    <span className="text-xs font-editorial-serif font-bold text-heritage-red">{city.hindiName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monuments */}
          <div>
            <p className="text-[11px] font-bold text-heritage-textMuted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-heritage-red" />
              Monuments & Royal Forts
            </p>
            <div className="space-y-2">
              {filteredMonuments.map(mon => (
                <div
                  key={mon.id}
                  onClick={() => handleSelectMonument(mon.id)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-heritage-bg border border-transparent hover:border-heritage-border cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={mon.heroImage}
                      alt={mon.name}
                      className="w-12 h-12 rounded-lg object-cover border border-heritage-border"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-xs text-heritage-textDark group-hover:text-heritage-red transition-colors">
                          {mon.name}
                        </p>
                        {mon.unesco && (
                          <Badge variant="gold" size="xs">UNESCO</Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-heritage-textMuted">{mon.era} · {mon.locationName}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-heritage-textMuted group-hover:translate-x-1 group-hover:text-heritage-red transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Traditional Crafts & Textiles */}
          <div>
            <p className="text-[11px] font-bold text-heritage-textMuted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-heritage-red" />
              Crafts, Music & Culinary Heritage
            </p>
            <div className="space-y-2">
              {filteredCulture.map(cul => (
                <div
                  key={cul.id}
                  onClick={handleSelectCulture}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-heritage-bg border border-transparent hover:border-heritage-border cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cul.image}
                      alt={cul.name}
                      className="w-12 h-12 rounded-lg object-cover border border-heritage-border"
                    />
                    <div>
                      <p className="font-semibold text-xs text-heritage-textDark group-hover:text-heritage-red transition-colors">
                        {cul.name}
                      </p>
                      <p className="text-[11px] text-heritage-textMuted">{cul.domain} · {cul.tagline}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-heritage-red opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stories */}
          <div>
            <p className="text-[11px] font-bold text-heritage-textMuted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-heritage-red" />
              Community Archives & Oral Traditions
            </p>
            <div className="space-y-2">
              {filteredStories.map(story => (
                <div
                  key={story.id}
                  onClick={handleSelectStory}
                  className="p-2.5 rounded-xl hover:bg-heritage-bg border border-transparent hover:border-heritage-border cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs">{story.typeIcon}</span>
                    <Badge variant={story.type === 'Verified Historical Record' ? 'emerald' : 'default'} size="xs">
                      {story.type}
                    </Badge>
                    <span className="text-[10px] text-heritage-textMuted">{story.contributor.name}</span>
                  </div>
                  <p className="font-semibold text-xs text-heritage-textDark group-hover:text-heritage-red transition-colors line-clamp-1">
                    {story.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-heritage-bg border-t border-heritage-border flex items-center justify-between text-[11px] text-heritage-textMuted">
          <span>Search the comprehensive Indian cultural intelligence registry</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
