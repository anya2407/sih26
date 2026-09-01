import React, { useEffect, useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { CITIES_DATA } from '../../data/citiesData';
import { MOCK_HERITAGE } from '../../data/mockHeritage';
import { X, MapPin, Search, Check, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const LocationPickerModal = () => {
  const { 
    isLocationPickerOpen, 
    setIsLocationPickerOpen, 
    completeOnboarding, 
    setCity, 
    selectedCityId,
    isOnboarded
  } = useHeritage();

  const [activeCityId, setActiveCityId] = useState(selectedCityId || null);
  const [mapSearch, setMapSearch] = useState('');

  // Keep the simulated map in sync when the home screen chooses a city first.
  useEffect(() => {
    if (isLocationPickerOpen) setActiveCityId(selectedCityId || null);
  }, [isLocationPickerOpen, selectedCityId]);

  if (!isLocationPickerOpen) return null;

  const activeCity = CITIES_DATA.find(c => c.id === activeCityId);
  const cityMonuments = activeCity ? MOCK_HERITAGE.filter(m => m.cityId === activeCity.id) : [];

  const filteredCities = CITIES_DATA.filter(c => 
    c.name.toLowerCase().includes(mapSearch.toLowerCase()) || 
    c.state.toLowerCase().includes(mapSearch.toLowerCase())
  );

  const handleConfirmLocation = () => {
    if (!activeCity) return;
    if (!isOnboarded) {
      completeOnboarding(activeCity.id);
    } else {
      setCity(activeCity.id);
    }
    setIsLocationPickerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-5xl h-[88vh] rounded-3xl shadow-modal border border-heritage-border flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Interactive Map Simulation Area */}
        <div className="relative flex-1 bg-[#F4EFE6] min-h-[300px] flex flex-col justify-between overflow-hidden">
          <button
            onClick={() => setIsLocationPickerOpen(false)}
            className="absolute top-4 right-4 z-10 md:hidden p-2 bg-white/90 rounded-full border border-heritage-border text-heritage-textDark"
            aria-label="Close location picker"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Simulated Vector / Architectural Map Canvas */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
            {/* Ambient Map Topography Grid Lines */}
            <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="mapGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#9E1B32" strokeWidth="0.5" strokeDasharray="2,4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapGrid)" />
              {/* Concentric Discovery Radii */}
              <circle cx="50%" cy="50%" r="100" fill="none" stroke="#9E1B32" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4,4" />
              <circle cx="50%" cy="50%" r="200" fill="none" stroke="#9E1B32" strokeWidth="1" strokeOpacity="0.2" />
              <circle cx="50%" cy="50%" r="300" fill="none" stroke="#9E1B32" strokeWidth="1" strokeOpacity="0.1" />
            </svg>

            {/* Central Pin Pulse */}
            {activeCity && <div className="absolute flex flex-col items-center pointer-events-auto">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-heritage-red/20 animate-ping absolute -top-1 -left-1" />
                <div className="w-10 h-10 rounded-full bg-heritage-red text-white flex items-center justify-center shadow-glow-red font-bold text-sm relative z-10 border-2 border-white">
                  📍
                </div>
              </div>
              <div className="mt-2 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-card border border-heritage-border text-xs font-bold text-heritage-textDark whitespace-nowrap">
                {activeCity.name} Hub · {activeCity.heritageCount} Sites
              </div>
            </div>}

            {/* Floating Marker Pins for Selected City */}
            {cityMonuments.slice(0, 3).map((mon, index) => {
              const offsets = [
                { top: '25%', left: '28%' },
                { top: '35%', right: '22%' },
                { bottom: '26%', left: '34%' }
              ];
              const pos = offsets[index] || { top: '50%', left: '50%' };
              return (
                <div
                  key={mon.id}
                  style={pos}
                  className="absolute bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-heritage-border shadow-subtle flex items-center gap-1.5 text-[11px] font-semibold text-heritage-textDark animate-fade-in"
                >
                  <span className="w-2 h-2 rounded-full bg-heritage-red inline-block" />
                  <span>{mon.name}</span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Side: Location Selection & Confirmation Panel */}
        <div className="w-full md:w-96 p-6 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-heritage-border">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-heritage-border">
              <div>
                <h3 className="font-editorial-heading font-bold text-lg text-heritage-textDark">
                  Select Location
                </h3>
                <p className="text-xs text-heritage-textMuted">
                  Choose a heritage center across India
                </p>
              </div>
              <button
                onClick={() => setIsLocationPickerOpen(false)}
                className="hidden md:block p-1.5 text-heritage-textMuted hover:text-heritage-textDark rounded-lg hover:bg-heritage-bg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* City Search Bar */}
            <div className="relative my-4">
              <Search className="w-3.5 h-3.5 text-heritage-textMuted absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={mapSearch}
                onChange={(e) => setMapSearch(e.target.value)}
                placeholder="Search Indian destinations..."
                className="w-full pl-9 pr-3 py-2 bg-heritage-bg border border-heritage-border rounded-xl text-xs font-medium text-heritage-textDark placeholder-heritage-textMuted focus:outline-none focus:border-heritage-red"
              />
            </div>

            {/* City Selection List */}
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {filteredCities.map((city) => {
                const isSelected = activeCityId === city.id;
                return (
                  <div
                    key={city.id}
                    onClick={() => setActiveCityId(city.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-red-50/60 border-heritage-red shadow-subtle'
                        : 'bg-white hover:bg-heritage-bg border-heritage-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={city.coverImage}
                        alt={city.name}
                        className="w-10 h-10 rounded-xl object-cover border border-heritage-border flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-xs text-heritage-textDark">{city.name}</p>
                          <span className="text-[10px] text-heritage-textMuted">({city.state})</span>
                        </div>
                        <p className="text-[10px] text-heritage-textMuted mt-0.5">{city.heritageCount} Cultural Experiences</p>
                      </div>
                    </div>

                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-heritage-red text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    ) : (
                      <span className="text-xs font-editorial-serif text-heritage-textMuted">{city.hindiName}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Location Summary */}
            <div className="mt-4 p-4 bg-heritage-bg rounded-2xl border border-heritage-border">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-heritage-red uppercase tracking-wider">
                  Target Destination
                </span>
                <Badge variant="emerald" size="xs">
                  Ready to Explore
                </Badge>
              </div>
              <h4 className="font-editorial-heading font-bold text-base text-heritage-textDark mt-1">
                {activeCity ? `${activeCity.name}, ${activeCity.state}` : 'No destination selected'}
              </h4>
              <p className="text-xs text-heritage-textMuted mt-1 leading-relaxed">
                {activeCity ? <>We found <strong className="text-heritage-textDark">{activeCity.heritageCount} cultural experiences</strong>, {activeCity.cultureCount} artisan traditions, and {activeCity.storiesCount} community stories around you.</> : 'Select a heritage center to view its cultural experiences, artisan traditions, and community stories.'}
              </p>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="pt-4 border-t border-heritage-border mt-4">
            <button
              onClick={handleConfirmLocation}
              disabled={!activeCity}
              className="w-full py-3.5 px-4 bg-heritage-red hover:bg-heritage-deepRed disabled:bg-heritage-red/40 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl shadow-card transition-all flex items-center justify-center gap-2 group"
            >
              <span>{activeCity ? `Begin Exploring ${activeCity.name}` : 'Select a destination to begin'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
