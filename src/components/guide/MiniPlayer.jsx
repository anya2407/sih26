import React from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { MOCK_HERITAGE } from '../../data/mockHeritage';
import { Play, Pause, X, Maximize2, Headphones } from 'lucide-react';
import { AudioWave } from '../common/AudioWave';

export const MiniPlayer = () => {
  const { 
    guideState, 
    toggleAudioPlayback, 
    stopAudioGuide, 
    setActiveTab, 
    activeTab,
    isDetailViewOpen 
  } = useHeritage();

  // Hide mini player if we are already on the full guide page or if not visible
  if (!guideState.isMiniPlayerVisible || activeTab === 'guide') return null;

  const currentMon = MOCK_HERITAGE.find(m => m.id === guideState.monumentId) || MOCK_HERITAGE[0];
  const currentPoi = currentMon.pointsOfInterest?.find(p => p.id === guideState.currentPoiId) || currentMon.pointsOfInterest?.[0];

  const handleExpand = () => {
    setActiveTab('guide');
  };

  return (
    <div className="fixed bottom-16 md:bottom-6 right-4 md:right-8 z-40 animate-fade-in max-w-sm w-full">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-modal border border-heritage-border flex items-center justify-between gap-3">
        {/* Left Thumbnail & Info */}
        <div 
          onClick={handleExpand}
          className="flex items-center gap-3 min-w-0 cursor-pointer group flex-1"
        >
          <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-heritage-border">
            <img
              src={currentMon.heroImage}
              alt={currentMon.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-heritage-textDark truncate group-hover:text-heritage-red transition-colors">
                {currentMon.name}
              </p>
              <AudioWave isPlaying={guideState.isPlaying} barCount={3} className="h-3" />
            </div>
            <p className="text-[11px] text-heritage-textMuted truncate">
              {currentPoi ? currentPoi.name : 'AI Audio Guide'}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={toggleAudioPlayback}
            className="w-8 h-8 rounded-full bg-heritage-red hover:bg-heritage-deepRed text-white flex items-center justify-center shadow-subtle transition-all"
            title={guideState.isPlaying ? 'Pause Narration' : 'Play Narration'}
          >
            {guideState.isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>

          <button
            onClick={handleExpand}
            className="p-1.5 text-heritage-textMuted hover:text-heritage-textDark rounded-lg hover:bg-heritage-bg transition-colors"
            title="Expand Full Guide"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <button
            onClick={stopAudioGuide}
            className="p-1.5 text-heritage-textMuted hover:text-heritage-textDark rounded-lg hover:bg-heritage-bg transition-colors"
            title="Close Guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
