import React from 'react';

export const AudioWave = ({ isPlaying = false, barCount = 5, className = 'h-4' }) => {
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: barCount }).map((_, index) => (
        <span
          key={index}
          className={`w-1 bg-heritage-red rounded-full transition-all duration-300 ${
            isPlaying ? `animate-sound-${(index % 6) + 1} h-full` : 'h-1.5 opacity-40'
          }`}
          style={{
            animationDuration: isPlaying ? `${0.7 + (index * 0.15)}s` : 'none',
            minHeight: '3px'
          }}
        />
      ))}
    </div>
  );
};
