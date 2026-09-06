import React from 'react';

export const VoiceVisualizer = ({ 
  state = 'idle', // 'idle' | 'listening' | 'speaking'
  onMicClick,
  disabled = false 
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-2 select-none">
      
      {/* ── 1. Sacred Mandala Wheel & Concentric Geometric Rings ── */}
      <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
        
        {/* Sacred Geometry SVG Wheel Background */}
        <svg 
          className={`absolute inset-0 w-full h-full text-[#D4AA57] transition-transform duration-1000 ${
            state === 'speaking' ? 'animate-spin-slow opacity-70' : state === 'listening' ? 'animate-spin-slow opacity-80' : 'opacity-40'
          }`} 
          viewBox="0 0 300 300"
        >
          {/* Outer Dashed Orbit & Dots */}
          <circle cx="150" cy="150" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
          <circle cx="150" cy="150" r="122" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
          <circle cx="150" cy="150" r="104" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="150" cy="150" r="86" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />

          {/* 16 Sacred Radial Spokes */}
          {Array.from({ length: 16 }, (_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const x1 = 150 + Math.cos(angle) * 86;
            const y1 = 150 + Math.sin(angle) * 86;
            const x2 = 150 + Math.cos(angle) * 140;
            const y2 = 150 + Math.sin(angle) * 140;
            return (
              <line 
                key={i} 
                x1={x1} 
                y1={y1} 
                x2={x2} 
                y2={y2} 
                stroke="currentColor" 
                strokeWidth={i % 4 === 0 ? "1.5" : "0.75"} 
                opacity={i % 2 === 0 ? "0.6" : "0.3"} 
              />
            );
          })}

          {/* Decorative Arch Petals / Lotus Filigree */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * 360;
            return (
              <path
                key={i}
                d="M 150 28 A 122 122 0 0 1 170 34 C 158 50 142 50 130 34 A 122 122 0 0 1 150 28 Z"
                fill="currentColor"
                opacity="0.25"
                transform={`rotate(${angle} 150 150)`}
              />
            );
          })}
        </svg>

        {/* Orbiting Particle Dots (As seen in Image 3) */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${state !== 'idle' ? 'opacity-100 animate-spin-slow' : 'opacity-60'}`}>
          <span className="absolute top-[18%] left-[22%] w-2 h-2 rounded-full bg-[#E5A038] shadow-[0_0_8px_#E5A038]" />
          <span className="absolute top-[12%] right-[30%] w-2.5 h-2.5 rounded-full bg-[#C0392B] shadow-[0_0_10px_#C0392B]" />
          <span className="absolute bottom-[20%] right-[18%] w-2 h-2 rounded-full bg-[#D4AA57] shadow-[0_0_8px_#D4AA57]" />
          <span className="absolute bottom-[14%] left-[28%] w-2.5 h-2.5 rounded-full bg-[#368D8D] shadow-[0_0_10px_#368D8D]" />
        </div>

        {/* Sonar Pulsing Rings for Listening / Speaking */}
        {state === 'listening' && (
          <>
            <div className="absolute w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-[#368D8D]/25 animate-ping duration-1000" />
            <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#368D8D]/40 animate-pulse" />
          </>
        )}

        {state === 'speaking' && (
          <>
            <div className="absolute w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-[#C0392B]/20 animate-ping duration-1000" />
            <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#D4AA57]/30 animate-pulse" />
          </>
        )}

        {/* ── 2. Interactive Center Visualizer Orb ── */}
        <button
          onClick={onMicClick}
          disabled={disabled}
          className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 transform active:scale-95 shadow-2xl cursor-pointer ${
            state === 'listening'
              ? 'bg-gradient-to-br from-[#45A1A1] via-[#2F8686] to-[#185959] text-white ring-4 ring-[#368D8D]/50 shadow-[0_0_35px_rgba(54,141,141,0.6)] scale-105'
              : state === 'speaking'
              ? 'bg-gradient-to-br from-[#D45330] via-[#96281B] to-[#4A0E00] text-white ring-4 ring-[#D4AA57]/50 shadow-[0_0_40px_rgba(192,57,43,0.7)] scale-105'
              : 'bg-gradient-to-br from-[#E6A442] via-[#C67D28] to-[#8C4E10] hover:from-[#EFA947] hover:to-[#9E5713] text-white ring-4 ring-[#D4AA57]/30 shadow-[0_8px_30px_rgba(198,125,40,0.5)]'
          }`}
          title="Click to interact with Veda AI Guide"
        >
          {/* Subtle Inner Glow Rim */}
          <div className="absolute inset-1 rounded-full border border-white/25 pointer-events-none" />

          {/* Orb State Content */}
          {state === 'speaking' ? (
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-serif font-bold text-[#FDF0D5] mb-0.5 tracking-wider">वे</span>
              {/* Animated Equalizer Wave */}
              <div className="flex items-center gap-1 h-4 mb-0.5">
                <span className="w-1 bg-[#FDF0D5] rounded-full animate-pulse h-3" />
                <span className="w-1 bg-[#FDF0D5] rounded-full animate-bounce h-4" />
                <span className="w-1 bg-[#FDF0D5] rounded-full animate-pulse h-2.5" />
                <span className="w-1 bg-[#FDF0D5] rounded-full animate-bounce h-4" />
                <span className="w-1 bg-[#FDF0D5] rounded-full animate-pulse h-3" />
              </div>
              <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.25em] text-[#FDF0D5]/90">VEDA</span>
            </div>
          ) : state === 'listening' ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping mb-1.5" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-white">
                LISTENING
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-xl mb-0.5 filter drop-shadow-md">🎙️</span>
              <span className="text-[9px] font-sans font-extrabold uppercase tracking-[0.22em] text-white/95 drop-shadow">
                ASK GUIDE
              </span>
            </div>
          )}
        </button>
      </div>

    </div>
  );
};
