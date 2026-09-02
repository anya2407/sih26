import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { VoiceVisualizer } from './VoiceVisualizer';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  MapPin, 
  Sparkles, 
  Volume2, 
  Navigation,
  RefreshCw,
  AlertCircle,
  Headphones
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
  const stateName = locationState.state ? locationState.state.toUpperCase() : 'INDIAN HERITAGE';
  const monumentName = locationState.monumentName || 'Heritage Monument';
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
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fade-in">
      
      {/* 1. Dynamic Top Location Header */}
      <header className="flex flex-col items-center text-center pt-2">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-heritage-red mb-2">
          {stateName}
        </span>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-heritage-red border border-red-200 rounded-full text-xs sm:text-sm font-bold shadow-subtle">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span>You're at {monumentName}</span>
        </div>
      </header>

      {/* Location Permission / Error Alert banner if location issue occurs */}
      {locationState.errorMessage && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-900 animate-fade-in">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{locationState.errorMessage}</span>
          </div>
          <button
            onClick={requestUserLocation}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0 shadow-subtle"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${locationState.isLocating ? 'animate-spin' : ''}`} />
            <span>Retry Location</span>
          </button>
        </div>
      )}

      {/* 2. Main AI Voice Guide Interactive Player Card */}
      <section className="bg-white min-h-[480px] p-6 sm:p-10 rounded-3xl border border-heritage-border shadow-card text-center relative overflow-hidden flex flex-col justify-between">
        {/* Subtle decorative radial background */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#E8E3DD_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* Current Active Location Spot Badge (determined by /api/get-location) */}
        <div className="relative z-10 flex justify-center">
          {currentSpot ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-heritage-bg border border-heritage-border rounded-full text-xs font-semibold text-heritage-textDark animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-heritage-red animate-pulse" />
              <span>Exact Spot: {currentSpot}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-heritage-bg/70 border border-heritage-border/70 rounded-full text-xs font-medium text-heritage-textMuted">
              <Navigation className="w-3 h-3 text-heritage-red" />
              <span>Ready for location-aware narration</span>
            </div>
          )}
        </div>

        {/* Main Acoustic Visualizer */}
        <div className="relative z-10 my-4">
          <VoiceVisualizer
            state={visualizerState}
            onMicClick={handlePrimaryGuideAction}
            disabled={locationState.isGettingLocation}
          />
        </div>

        {/* Primary Guide Me / Pause Action Button */}
        <div className="relative z-10 max-w-sm mx-auto w-full space-y-3">
          <button
            onClick={handlePrimaryGuideAction}
            disabled={locationState.isGettingLocation}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-card hover:shadow-card-hover transition-all flex items-center justify-center gap-2.5 ${
              locationState.isGettingLocation
                ? 'bg-heritage-beige text-heritage-textDark cursor-wait border border-heritage-border'
                : guideState.isPlaying
                ? 'bg-heritage-textDark hover:bg-black text-white'
                : 'bg-heritage-red hover:bg-heritage-deepRed text-white shadow-glow-red'
            }`}
          >
            {locationState.isGettingLocation ? (
              <>
                <Navigation className="w-4 h-4 animate-spin text-heritage-red" />
                <span>{locationState.statusMessage || 'Finding your exact location...'}</span>
              </>
            ) : guideState.isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : transcript && !guideState.isPlaying ? (
              <>
                <Play className="w-4 h-4 ml-0.5" />
                <span>Resume Narration</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Guide Me</span>
              </>
            )}
          </button>

          {/* Sub-controls when audio has been loaded */}
          {transcript && (
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={stopAudioGuide}
                className="text-[11px] font-semibold text-heritage-textMuted hover:text-heritage-red transition-colors"
              >
                Reset Guide
              </button>
            </div>
          )}
        </div>

        {/* Live Narration Transcript Box */}
        <div className="relative z-10 mt-6 p-5 bg-heritage-bg/80 rounded-2xl border border-heritage-border text-left max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-heritage-red flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              Live Narration Transcript
            </span>
            <Badge variant="emerald" size="xs">
              AI Location Synthesis
            </Badge>
          </div>

          <p className="font-editorial-serif text-sm sm:text-base text-heritage-textDark leading-relaxed italic">
            {transcript
              ? `"${transcript}"`
              : 'Stand at any spot within the monument and tap "Guide Me" to stream real-time historical and architectural narration.'}
          </p>
        </div>
      </section>

      {/* 3. Points of Interest Section (populated ONLY from /api/get-monument) */}
      {pois.length > 0 && (
        <section className="bg-white p-5 sm:p-6 rounded-3xl border border-heritage-border shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-heritage-textMuted uppercase tracking-wider flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-heritage-red" />
              Points of Interest at {monumentName}
            </p>
            <span className="text-[11px] text-heritage-textMuted font-medium">
              {pois.length} Sites Identified
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {pois.map((poi) => {
              const isSelected = selectedPoiId === poi.id || (currentSpot && currentSpot.toLowerCase().includes(poi.name.toLowerCase()));
              return (
                <button
                  key={poi.id}
                  onClick={() => handleSelectPoi(poi)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-heritage-red text-white border-heritage-red shadow-subtle'
                      : 'bg-heritage-bg hover:bg-heritage-beige text-heritage-textDark border-heritage-border'
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
  );
};
