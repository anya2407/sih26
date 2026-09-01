import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { MOCK_HERITAGE } from '../../data/mockHeritage';
import { VoiceVisualizer } from './VoiceVisualizer';
import { VoiceQuestionModal } from './VoiceQuestionModal';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  MapPin, 
  Sparkles, 
  Volume2, 
  MessageSquare, 
  BookOpen, 
  Info,
  Mic,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const AIGuideView = () => {
  const { 
    guideState, 
    setGuideState, 
    toggleAudioPlayback, 
    showToast 
  } = useHeritage();

  const monument = MOCK_HERITAGE.find(m => m.id === guideState.monumentId) || MOCK_HERITAGE[0];
  const [selectedPoiId, setSelectedPoiId] = useState(guideState.currentPoiId || monument.pointsOfInterest?.[0]?.id || 'suraj-pol');
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  // Conversational History State
  const [conversationHistory, setConversationHistory] = useState([
    {
      id: 'd-initial',
      question: 'Why was this entrance important?',
      answer: 'Suraj Pol (the Sun Gate) was the grand ceremonial entrance facing east towards the rising dawn. Victorious Kachwaha Maharajas entered through this gate upon royal elephants after battle victories, greeted by the royal brass trumpets from the Naqqar Khana above.',
      timestamp: '2 mins ago'
    }
  ]);

  const currentPoi = monument.pointsOfInterest?.find(p => p.id === selectedPoiId) || monument.pointsOfInterest?.[0];

  const handleSelectPoi = (poi) => {
    setSelectedPoiId(poi.id);
    setGuideState(prev => ({
      ...prev,
      currentPoiId: poi.id,
      isPlaying: true,
      isSpeaking: true
    }));

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(poi.narration);
      utterance.rate = 0.92;
      window.speechSynthesis.speak(utterance);
    }
    showToast(`Now guiding: ${poi.name}`, 'info');
  };

  const handleMicClick = () => {
    if (guideState.isPlaying) {
      toggleAudioPlayback();
    } else {
      setIsQuestionModalOpen(true);
    }
  };

  const handleQuestionAnswered = (newDialogue) => {
    setConversationHistory(prev => [newDialogue, ...prev]);
    showToast('AI Guide responded with archival context', 'success');
  };

  // Determine Visualizer State
  const visualizerState = guideState.isPlaying && guideState.isSpeaking
    ? 'speaking'
    : guideState.isListening
    ? 'listening'
    : 'idle';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fade-in">
      
      {/* 1. Header & Location Awareness Card */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-heritage-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-heritage-red border border-red-200 rounded-full text-xs font-bold shadow-subtle">
              <MapPin className="w-3.5 h-3.5" />
              You're at {monument.name}
            </span>
            <span className="text-xs text-heritage-textMuted font-medium">
              Near {currentPoi?.name || 'Main Gate'}
            </span>
          </div>

          <h1 className="font-editorial-heading font-bold text-2xl sm:text-3xl text-heritage-textDark">
            AI Voice Cultural Companion
          </h1>

          <p className="text-xs sm:text-sm text-heritage-textMuted mt-1">
            Intelligent location-aware narration, architectural acoustic insights, and live historical Q&A.
          </p>
        </div>

      </section>

      {/* 2. Central Voice Visualizer & Interactive Narration Player */}
      <section className="bg-white min-h-[calc(100vh-11rem)] p-6 sm:p-10 rounded-3xl border border-heritage-border shadow-card text-center relative overflow-hidden flex flex-col justify-center">
        {/* Subtle decorative radial background */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#E8E3DD_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* Current Active Location Pill */}
        <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1 bg-heritage-bg border border-heritage-border rounded-full text-xs font-semibold text-heritage-textDark mb-4">
          <span className="w-2 h-2 rounded-full bg-heritage-red animate-pulse" />
          <span>Point: {currentPoi?.name}</span>
          <span className="text-heritage-textMuted">({currentPoi?.location})</span>
        </div>

        {/* Main Acoustic Visualizer */}
        <div className="relative z-10">
          <VoiceVisualizer
            state={visualizerState}
            onMicClick={handleMicClick}
          />
        </div>

        {/* Playback Controls & Progress */}
        <div className="relative z-10 max-w-md mx-auto mt-6 space-y-4">
          {/* Simulated Scrubber Bar */}
          <div className="space-y-1">
            <div className="w-full bg-heritage-border h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div 
                className="bg-heritage-red h-full rounded-full transition-all duration-300"
                style={{ width: guideState.isPlaying ? '42%' : '15%' }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-heritage-textMuted">
              <span>01:14</span>
              <span>{currentPoi?.audioTime.split('-')[1]?.trim() || '03:45'}</span>
            </div>
          </div>

          {/* Player Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => showToast('Replayed previous 10 seconds', 'info')}
              className="p-2 text-heritage-textMuted hover:text-heritage-textDark rounded-full hover:bg-heritage-bg transition-colors"
              title="Rewind 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleAudioPlayback}
              className="w-12 h-12 rounded-full bg-heritage-red hover:bg-heritage-deepRed text-white flex items-center justify-center shadow-card hover:shadow-card-hover transition-all"
            >
              {guideState.isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <button
              onClick={() => showToast('Advanced forward 10 seconds', 'info')}
              className="p-2 text-heritage-textMuted hover:text-heritage-textDark rounded-full hover:bg-heritage-bg transition-colors"
              title="Forward 10s"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Narration Transcript Box */}
        <div className="relative z-10 mt-8 p-5 bg-heritage-bg/80 rounded-2xl border border-heritage-border text-left max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-heritage-red flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              Live Narration Transcript
            </span>
            <Badge variant="emerald" size="xs">
              Corroborated by Archeological Survey
            </Badge>
          </div>

          <p className="font-editorial-serif text-base sm:text-lg text-heritage-textDark leading-relaxed italic">
            "{currentPoi?.narration || monument.audioGuideScript}"
          </p>
        </div>

        {/* Dual Actions: Continue Listening or Ask Question */}
        <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsQuestionModalOpen(true)}
            className="py-3 px-6 bg-heritage-red hover:bg-heritage-deepRed text-white font-semibold text-xs rounded-xl shadow-card transition-all flex items-center gap-2"
          >
            <Mic className="w-4 h-4" />
            <span>Ask the AI Guide a Question</span>
          </button>

          <button
            onClick={toggleAudioPlayback}
            className="py-3 px-5 bg-heritage-bg hover:bg-heritage-beige text-heritage-textDark font-semibold text-xs rounded-xl border border-heritage-border transition-all"
          >
            {guideState.isPlaying ? 'Pause Narration' : 'Continue Listening'}
          </button>
        </div>
      </section>

      {/* 3. Point of Interest Navigation Bar */}
      <section className="bg-white p-4 rounded-2xl border border-heritage-border shadow-subtle">
        <p className="text-[11px] font-bold text-heritage-textMuted uppercase tracking-wider mb-2.5 px-2">
          Points of Interest Along the Heritage Route:
        </p>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {monument.pointsOfInterest?.map((poi) => {
            const isSelected = selectedPoiId === poi.id;
            return (
              <button
                key={poi.id}
                onClick={() => handleSelectPoi(poi)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-heritage-red text-white border-heritage-red shadow-subtle'
                    : 'bg-heritage-bg hover:bg-heritage-beige text-heritage-textDark border-heritage-border'
                }`}
              >
                <span>{poi.name}</span>
                <span className={`block text-[9px] font-mono mt-0.5 ${isSelected ? 'text-white/80' : 'text-heritage-textMuted'}`}>
                  {poi.audioTime}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Interactive Conversation History */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-heritage-border shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-heritage-border">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-heritage-red" />
            <h3 className="font-editorial-heading font-bold text-base text-heritage-textDark">
              Conversation with the AI Guide
            </h3>
          </div>
          <span className="text-xs text-heritage-textMuted">
            {conversationHistory.length} Exchanges Recorded
          </span>
        </div>

        <div className="space-y-4">
          {conversationHistory.map((item) => (
            <div key={item.id} className="p-4 bg-heritage-bg rounded-2xl border border-heritage-border/80 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-heritage-textDark flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-heritage-beige text-heritage-red flex items-center justify-center text-[10px]">
                    Q
                  </span>
                  "{item.question}"
                </p>
                <span className="text-[10px] text-heritage-textMuted">{item.timestamp}</span>
              </div>

              <div className="pl-7 border-l-2 border-heritage-red/40 py-1">
                <p className="text-xs text-heritage-textMuted leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Question Modal */}
      <VoiceQuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        monument={monument}
        onQuestionAnswered={handleQuestionAnswered}
      />
    </div>
  );
};
