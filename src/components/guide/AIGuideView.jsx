import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { VoiceVisualizer } from './VoiceVisualizer';
import { 
  Play, 
  Pause, 
  MapPin, 
  Sparkles, 
  Volume2, 
  Navigation,
  RefreshCw,
  AlertCircle,
  Headphones,
  Search,
  Bookmark
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const AIGuideView = () => {
  const { 
    locationState, 
    requestUserLocation,
    triggerGuideMe, 
    guideState, 
    toggleAudioPlayback, 
    stopAudioGuide,
    startPoiAudio,
    showToast 
  } = useHeritage();

  const [selectedPoiId, setSelectedPoiId] = useState(null);

  // Dynamic state extracted from backend response
  const stateName = locationState.state ? locationState.state.toUpperCase() : 'UTTAR PRADESH';
  const monumentName = locationState.monumentName || 'Taj Mahal';
  const pois = locationState.pointsOfInterest || [];
  const currentSpot = locationState.currentPointOfInterest;
  const transcript = locationState.transcript;

  const handleSelectPoi = (poi) => {
    setSelectedPoiId(poi.id);
    startPoiAudio(poi);
    showToast(`Exploring ${poi.name}`, 'info');
  };

  // Determine Visualizer State
  const visualizerState = guideState.isPlaying && guideState.isSpeaking
    ? 'speaking'
    : locationState.isGettingLocation || locationState.isGettingMonument
    ? 'listening'
    : 'idle';

  // Handle Main Guide Me / Pause Action
  const handlePrimaryGuideAction = () => {
    if (locationState.isGettingLocation) return;

    if (guideState.isPlaying) {
      toggleAudioPlayback();
    } else if (transcript && window.speechSynthesis && window.speechSynthesis.paused) {
      toggleAudioPlayback();
    } else {
      triggerGuideMe();
    }
  };

  return (
    <div className="max-w-md sm:max-w-xl md:max-w-3xl mx-auto pb-16 animate-fade-in rounded-3xl bg-[#F8F3E8] text-[#1A1209] relative overflow-hidden border border-[#D4AA57]/30 shadow-2xl">
      
      {/* ── 1. Top Traditional Indian Woven Ribbon Border ── */}
      <div className="w-full h-2.5 bg-gradient-to-r from-[#C0392B] via-[#D4AA57] via-[#368D8D] via-[#4A0E00] to-[#C0392B] opacity-90" />

      {/* ── 2. Deep Crimson Header Banner with Taj Mahal Silhouette ── */}
      <header className="relative bg-gradient-to-r from-[#88242A] via-[#96281B] to-[#7A1F24] text-[#F8F3EC] p-5 sm:p-7 overflow-hidden border-b border-[#D4AA57]/30">
        
        {/* Taj Mahal & Minarets Silhouette SVG Watermark */}
        <svg 
          className="absolute right-0 bottom-0 h-32 sm:h-36 opacity-20 pointer-events-none text-white" 
          viewBox="0 0 400 200" 
          fill="currentColor"
        >
          {/* Main Dome */}
          <path d="M 200 60 Q 180 100 160 120 L 240 120 Q 220 100 200 60 Z" />
          <path d="M 200 40 L 200 60 M 195 45 L 205 45" stroke="currentColor" strokeWidth="2" />
          <rect x="170" y="120" width="60" height="70" rx="4" />
          <arch d="M 185 150 Q 200 135 215 150 L 215 190 L 185 190 Z" fill="#7A1F24" />
          
          {/* Side Domes */}
          <path d="M 140 90 Q 128 115 115 130 L 165 130 Q 152 115 140 90 Z" />
          <path d="M 260 90 Q 248 115 235 130 L 285 130 Q 272 115 260 90 Z" />
          
          {/* Minarets */}
          <rect x="70" y="70" width="16" height="120" />
          <path d="M 78 50 L 70 70 L 86 70 Z" />
          <rect x="314" y="70" width="16" height="120" />
          <path d="M 322 50 L 314 70 L 330 70 Z" />
        </svg>

        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#D4AA57]">
              {monumentName.toUpperCase()} · {stateName}
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-editorial-heading font-bold text-white tracking-wide drop-shadow">
              AI Voice Heritage Companion
            </h1>
          </div>
        </div>
      </header>

      {/* ── 3. Main Body Container ── */}
      <div className="p-4 sm:p-7 space-y-5">
        
        {/* State Subheader & Location Badge */}
        <header className="flex flex-col items-center text-center space-y-1.5 pt-1">
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-[#8C6B38]">
            {stateName}
          </span>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFFDF7] text-[#1A1209] border border-[#D4AA57]/40 rounded-full text-xs sm:text-sm font-editorial-serif shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#C0392B] flex-shrink-0" />
            <span className="font-semibold">You're at {monumentName}</span>
          </div>
        </header>

        {/* Location Alert Banner */}
        {locationState.errorMessage && (
          <div className="p-3.5 bg-amber-100/90 border border-amber-400/60 rounded-2xl flex items-center justify-between gap-3 text-amber-900 font-editorial-serif text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>{locationState.errorMessage}</span>
            </div>
            <button
              onClick={requestUserLocation}
              className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-[11px] font-bodoni flex items-center gap-1 transition-colors flex-shrink-0"
            >
              <RefreshCw className={`w-3 h-3 ${locationState.isLocating ? 'animate-spin' : ''}`} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* ── 4. Main Cultural Visualizer Card (Light Parchment with Gold Filigree) ── */}
        <section className="bg-[#FFFDF7] rounded-3xl p-5 sm:p-8 border border-[#D4AA57]/40 shadow-card text-center flex flex-col items-center justify-between relative overflow-hidden">
          
          {/* Corner Decorative Filigree Accents (⚜️) */}
          <span className="absolute top-3 left-3 text-[#D4AA57]/60 text-xs font-serif select-none">⚜️</span>
          <span className="absolute top-3 right-3 text-[#D4AA57]/60 text-xs font-serif select-none">⚜️</span>
          <span className="absolute bottom-3 left-3 text-[#D4AA57]/60 text-xs font-serif select-none">⚜️</span>
          <span className="absolute bottom-3 right-3 text-[#D4AA57]/60 text-xs font-serif select-none">⚜️</span>

          {/* Spot Pill Badge */}
          <div className="relative z-10 mb-2">
            {currentSpot ? (
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#FDF0D5] border border-[#D4AA57]/50 rounded-full text-xs font-editorial-serif text-[#8C4E10]">
                <span className="w-2 h-2 rounded-full bg-[#D4701E] animate-pulse" />
                <span>Exact Spot: {currentSpot}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#F5EDE0] border border-[#D4AA57]/40 rounded-full text-xs font-editorial-serif text-[#8C5E1A]">
                <Navigation className="w-3 h-3 text-[#D4701E]" />
                <span>Ready for location-aware narration</span>
              </div>
            )}
          </div>

          {/* Central Sacred Mandala Acoustic Visualizer */}
          <div className="relative z-10 my-2">
            <VoiceVisualizer
              state={visualizerState}
              onMicClick={handlePrimaryGuideAction}
              disabled={locationState.isGettingLocation}
            />
          </div>

          {/* Dynamic Title & Instructions below Visualizer */}
          <div className="relative z-10 space-y-1 mb-4">
            <h3 className="font-editorial-serif font-bold text-lg sm:text-xl text-[#1A1209]">
              {visualizerState === 'listening' 
                ? 'Listening to your question...' 
                : visualizerState === 'speaking' 
                ? 'Veda Audio Narration Active' 
                : 'Tap Guide Me to Start Narration'}
            </h3>
            <p className="font-editorial-serif text-xs sm:text-sm text-[#7A6050]">
              {visualizerState === 'listening'
                ? 'Ask about anything nearby, then pause to submit'
                : visualizerState === 'speaking'
                ? 'Streaming real-time historical and architectural context'
                : 'Tap the mic to ask a question about where you are'}
            </p>
          </div>

          {/* Golden Lotus Filament Line Divider */}
          <div className="flex items-center justify-center gap-3 w-full my-2 opacity-70">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AA57] to-transparent flex-1 max-w-[100px]" />
            <span className="text-[#D4AA57] text-sm">🪷</span>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AA57] to-transparent flex-1 max-w-[100px]" />
          </div>

          {/* Main Action Button / Pill Status */}
          <div className="relative z-10 w-full max-w-xs mt-3">
            {visualizerState === 'listening' ? (
              <div className="w-full py-3 px-5 rounded-2xl bg-[#FDF0D5] border border-[#D4AA57]/50 text-[#8C5E1A] font-editorial-serif text-xs font-bold shadow-sm flex items-center justify-center gap-2">
                <Navigation className="w-3.5 h-3.5 animate-spin text-[#D4701E]" />
                <span>Preparing your heritage narration...</span>
              </div>
            ) : guideState.isPlaying ? (
              <button
                onClick={toggleAudioPlayback}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#1A1209] hover:bg-[#2C1A0E] text-[#FDF0D5] font-bodoni font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 border border-[#D4AA57]/40"
              >
                <Pause className="w-4 h-4 text-[#D4AA57]" />
                <span>Pause Narration</span>
              </button>
            ) : (
              <button
                onClick={handlePrimaryGuideAction}
                disabled={locationState.isGettingLocation}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D46B18] via-[#C66218] to-[#B3520D] hover:from-[#E3751E] hover:to-[#C25B12] text-white font-editorial-serif font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-[#D46B18]/30 flex items-center justify-center gap-2.5 border border-[#FDF0D5]/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span className="text-base">🎙️</span>
                <span>Guide Me</span>
              </button>
            )}

            {/* Sub-action to reset guide if transcript exists */}
            {transcript && (
              <button
                onClick={stopAudioGuide}
                className="mt-2 text-[11px] font-editorial-serif text-[#7A6050] hover:text-[#C0392B] transition-colors"
              >
                Reset Guide Audio
              </button>
            )}
          </div>

        </section>

        {/* ── 5. Did You Know? Cultural Trivia Card ── */}
        <div className="p-4 sm:p-5 bg-[#FBF3E2] border border-[#E8D5B0] rounded-2xl flex items-start gap-3.5 shadow-sm text-left">
          {/* Terracotta Urn Icon 🏺 */}
          <span className="text-2xl flex-shrink-0 mt-0.5 filter drop-shadow-sm">🏺</span>
          <div className="space-y-0.5">
            <p className="font-editorial-serif text-xs sm:text-sm text-[#3E2E1E] leading-relaxed">
              <strong className="text-[#8C4E10] font-bold">Did you know?</strong> {monumentName === 'Taj Mahal' 
                ? 'The Taj Mahal took 22 years and 20,000 artisans to complete — a masterpiece of Mughal architecture.' 
                : `${monumentName} is a revered treasure of Indian heritage built with intricate architectural mastery.`}
            </p>
          </div>
        </div>

        {/* Live Audio Transcript (If narrative available) */}
        {transcript && (
          <div className="p-5 bg-[#FFFDF7] rounded-2xl border border-[#D4AA57]/30 border-l-4 border-l-[#C0392B] shadow-sm space-y-2 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#C0392B] flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#C0392B]" />
                Live Audio Narration
              </span>
              <Badge variant="gold" size="xs">
                Veda Synthesis
              </Badge>
            </div>
            <p className="font-editorial-serif text-xs sm:text-sm text-[#1A1209]/90 leading-relaxed italic">
              "{transcript}"
            </p>
          </div>
        )}

        {/* Points of Interest Chips Section */}
        {pois.length > 0 && (
          <section className="p-4 sm:p-5 bg-[#FFFDF7] rounded-2xl border border-[#D4AA57]/30 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-sans font-bold text-[#8C5E1A] uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-[#C0392B]" />
                Points of Interest
              </p>
              <span className="text-[10px] text-[#7A6050] font-editorial-serif">
                {pois.length} Sites Nearby
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {pois.map((poi) => {
                const isSelected = selectedPoiId === poi.id || (currentSpot && currentSpot.toLowerCase().includes(poi.name.toLowerCase()));
                return (
                  <button
                    key={poi.id}
                    onClick={() => handleSelectPoi(poi)}
                    className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-editorial-serif transition-all border ${
                      isSelected
                        ? 'bg-[#C0392B] text-white border-[#C0392B] shadow-sm'
                        : 'bg-[#F5EDE0] hover:bg-[#EAD8C0] text-[#1A1209] border-[#D4AA57]/30'
                    }`}
                  >
                    <span>{poi.name}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

      </div>

      {/* ── 6. Bottom Traditional Indian Woven Ribbon Border ── */}
      <div className="w-full h-2.5 bg-gradient-to-r from-[#C0392B] via-[#D4AA57] via-[#368D8D] via-[#4A0E00] to-[#C0392B] opacity-90" />

    </div>
  );
};
