import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { CITIES_DATA } from '../../data/citiesData';
import { MapPin, Navigation, Map, Search, Sparkles, ArrowRight, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export const LocationOnboarding = () => {
  const { 
    completeOnboarding, 
    setIsLocationPickerOpen,
    requestUserLocation,
    locationState 
  } = useHeritage();

  const [selectedCityId, setSelectedCityId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCity = CITIES_DATA.find(c => c.id === selectedCityId);

  const filteredCities = CITIES_DATA.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUseMyLocation = () => {
    requestUserLocation();
  };

  const handleStartExploring = () => {
    if (selectedCityId) completeOnboarding(selectedCityId);
  };

  const isLocating = locationState.isLocating || locationState.isGettingMonument;

  return (
    <div className="min-h-screen bg-heritage-bg flex flex-col justify-between relative overflow-hidden bg-heritage-pattern select-none">
      {/* Subtle Ambient Red Glows in background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/40 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F4EDE2]/80 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

      {/* Minimal Header */}
      <header className="relative z-10 px-6 md:px-12 py-6 flex items-center justify-between border-b border-heritage-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-heritage-red text-white flex items-center justify-center font-editorial-heading text-xl font-bold shadow-card">
            वि
          </div>
          <div>
            <span className="font-editorial-heading font-bold text-xl tracking-widest text-heritage-textDark">
              VIRASAT
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-heritage-textMuted font-medium">
              National Cultural AI Platform · SIH 2026
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-heritage-border rounded-full text-xs text-heritage-textDark font-medium shadow-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Cultural Archive
          </span>
        </div>
      </header>

      {/* Main Hero & Onboarding Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-12 flex flex-col items-center text-center">
        {/* Editorial Subtitle */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-heritage-border rounded-full text-xs font-semibold text-heritage-red shadow-subtle mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-heritage-red" />
          <span>DISCOVER • EXPERIENCE • PRESERVE INDIAN HERITAGE</span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="font-editorial-heading font-semibold text-3xl sm:text-5xl md:text-6xl text-heritage-textDark max-w-3xl leading-[1.12] tracking-tight">
          Tell us where your <span className="text-heritage-red italic font-editorial-serif font-normal">journey begins.</span>
        </h1>

        <p className="mt-4 md:mt-6 text-sm sm:text-lg text-heritage-textMuted max-w-xl font-normal leading-relaxed">
          India is an unbroken story of monuments, sacred sounds, living crafts, and oral wisdom. Enable GPS for instant AI heritage detection.
        </p>

        {/* Location Error / Permission Banner if denied */}
        {locationState.errorMessage && (
          <div className="mt-6 w-full max-w-xl p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-900 text-left animate-fade-in shadow-subtle">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{locationState.errorMessage}</span>
            </div>
            <button
              onClick={handleUseMyLocation}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0 shadow-subtle"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>Retry GPS</span>
            </button>
          </div>
        )}

        {/* Location Selection Interaction Box */}
        <div className="mt-8 md:mt-10 w-full max-w-xl bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-heritage-border text-left animate-fade-in">
          <label className="block text-xs font-bold uppercase tracking-wider text-heritage-textMuted mb-2">
            Instant Location Detection or Region Selection
          </label>

          {/* Primary Quick GPS Action */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={handleUseMyLocation}
              disabled={isLocating}
              className="flex items-center justify-center gap-2 py-3 px-3 bg-red-50 hover:bg-red-100/80 border border-red-200 rounded-xl text-xs font-bold text-heritage-red shadow-subtle transition-all"
            >
              <Navigation className={`w-4 h-4 text-heritage-red ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? (locationState.statusMessage || 'Detecting GPS...') : 'Use My Live GPS'}</span>
            </button>

            <button
              onClick={() => setIsLocationPickerOpen(true)}
              className="flex items-center justify-center gap-2 py-3 px-3 bg-heritage-bg hover:bg-heritage-beige border border-heritage-border rounded-xl text-xs font-semibold text-heritage-textDark transition-all"
            >
              <Map className="w-4 h-4 text-heritage-red" />
              <span>Choose on Map</span>
            </button>
          </div>

          <div className="relative flex items-center mb-4">
            <Search className="w-4 h-4 text-heritage-textMuted absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Indian city, royal state, or sacred valley..."
              className="w-full pl-11 pr-4 py-3 bg-heritage-bg border border-heritage-border rounded-xl text-sm font-medium text-heritage-textDark placeholder-heritage-textMuted focus:outline-none focus:border-heritage-red focus:bg-white transition-all"
            />
          </div>

          {/* Quick Hub Chips */}
          <div className="mb-6">
            <p className="text-[11px] font-medium text-heritage-textMuted mb-2">
              Popular Cultural Centers:
            </p>
            <div className="flex flex-wrap gap-2">
              {filteredCities.map((city) => {
                const isSelected = selectedCityId === city.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCityId(city.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-heritage-red text-white border-heritage-red shadow-subtle'
                        : 'bg-heritage-bg hover:bg-heritage-beige text-heritage-textDark border-heritage-border'
                    }`}
                  >
                    {city.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected City Context Snapshot */}
          {selectedCity ? (
            <div className="p-4 bg-heritage-bg/70 rounded-2xl border border-heritage-border/80 mb-6 flex items-start gap-4">
              <img
                src={selectedCity.coverImage}
                alt={selectedCity.name}
                className="w-16 h-16 rounded-xl object-cover border border-heritage-border shadow-subtle flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial-heading font-bold text-base text-heritage-textDark">
                    {selectedCity.name}, {selectedCity.state}
                  </h3>
                  <span className="font-editorial-serif text-sm font-bold text-heritage-red">
                    {selectedCity.hindiName}
                  </span>
                </div>
                <p className="text-xs text-heritage-textMuted line-clamp-1 mt-0.5">
                  {selectedCity.tagline}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-heritage-textDark font-medium">
                  <span>📍 {selectedCity.heritageCount} Monuments</span>
                  <span>•</span>
                  <span>🎨 {selectedCity.cultureCount} Living Crafts</span>
                  <span>•</span>
                  <span>📜 {selectedCity.storiesCount} Stories</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-heritage-bg/70 rounded-2xl border border-dashed border-heritage-border/80 mb-6 text-xs text-heritage-textMuted">
              Click <strong className="text-heritage-textDark">"Use My Live GPS"</strong> above for automatic location detection, or select a cultural hub to explore.
            </div>
          )}

          {/* Primary CTA */}
          <button
            onClick={handleStartExploring}
            disabled={!selectedCity && !isLocating}
            className="w-full py-4 px-6 bg-heritage-red hover:bg-heritage-deepRed disabled:bg-heritage-red/40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl shadow-card hover:shadow-card-hover transition-all flex items-center justify-center gap-2 group"
          >
            <span>{selectedCity ? `Explore from ${selectedCity.name}` : 'Select a destination or enable GPS'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Editorial Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-6 border-t border-heritage-border/50 flex flex-col sm:flex-row items-center justify-between text-xs text-heritage-textMuted gap-2">
        <p>© 2026 Virasat Cultural Intelligence Platform · Built for Smart India Hackathon</p>
        <p className="flex items-center gap-2 font-medium">
          <span>AI-Powered Location Guide</span>
          <span>•</span>
          <span>Digital Heritage Archive</span>
        </p>
      </footer>
    </div>
  );
};
