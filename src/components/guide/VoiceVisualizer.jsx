import React from 'react';

export const VoiceVisualizer = ({ 
  state = 'idle', // 'idle' | 'listening' | 'thinking' | 'speaking'
  onMicClick,
  disabled = false 
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-6 select-none">
      
      {/* Concentric Pulsing Acoustic Rings */}
      <div className="relative flex items-center justify-center">
        {state === 'speaking' && (
          <>
            <div className="absolute w-44 h-44 rounded-full bg-heritage-red/10 animate-ping duration-1000" />
            <div className="absolute w-36 h-36 rounded-full bg-heritage-red/15 animate-pulse" />
          </>
        )}

        {(state === 'listening' || state === 'thinking') && (
          <>
            <div className="absolute w-44 h-44 rounded-full bg-heritage-gold/20 animate-ping duration-700" />
            <div className="absolute w-36 h-36 rounded-full bg-heritage-gold/30 animate-pulse" />
          </>
        )}

        {/* Central Glowing Mic Ring */}
        <button
          onClick={onMicClick}
          disabled={disabled}
          className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-card hover:shadow-card-hover transition-all duration-300 transform active:scale-95 ${
            state === 'speaking'
              ? 'bg-heritage-red text-white shadow-glow-red'
              : state === 'listening' || state === 'thinking'
              ? 'bg-heritage-gold text-white scale-105'
              : 'bg-white hover:bg-heritage-bg text-heritage-textDark border-2 border-heritage-border'
          }`}
          title="Click to ask the AI guide a question"
        >
          {/* Animated Waveform Inside Button if speaking */}
          {state === 'speaking' ? (
            <div className="flex items-center gap-1 h-8">
              <span className="w-1.5 bg-white rounded-full animate-sound-1 h-6" />
              <span className="w-1.5 bg-white rounded-full animate-sound-2 h-8" />
              <span className="w-1.5 bg-white rounded-full animate-sound-3 h-5" />
              <span className="w-1.5 bg-white rounded-full animate-sound-4 h-7" />
              <span className="w-1.5 bg-white rounded-full animate-sound-5 h-4" />
            </div>
          ) : state === 'listening' ? (
            <div className="flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-white animate-ping mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">Listening</span>
            </div>
          ) : state === 'thinking' ? (
            <div className="flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-white animate-pulse mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">Thinking</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-0.5">🎙️</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-heritage-textMuted">Ask guide</span>
            </div>
          )}
        </button>
      </div>

      {/* State Indicator Text */}
      <div className="mt-5 text-center">
        <p className="font-editorial-heading font-bold text-sm tracking-wide text-heritage-textDark">
          {state === 'speaking' && 'AI Voice Narration Active'}
          {state === 'listening' && 'Listening to your question...'}
          {state === 'thinking' && 'Finding your answer...'}
          {state === 'idle' && 'Tap Guide Me to start narration'}
        </p>
        <p className="text-xs text-heritage-textMuted mt-0.5">
          {state === 'speaking' && 'Streaming architectural and historical context'}
          {state === 'listening' && 'Ask about anything nearby, then pause to submit'}
          {state === 'thinking' && 'Matching your location and question to an answer'}
          {state === 'idle' && 'Tap the mic to ask a question about where you are'}
        </p>
      </div>
    </div>
  );
};