import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { PRESET_GUIDE_QUESTIONS, generateAIResponse } from '../../data/mockGuideDialogue';
import { Mic, Send, X, Sparkles, MessageSquare, Volume2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export const VoiceQuestionModal = ({ isOpen, onClose, monument, onQuestionAnswered }) => {
  const { showToast } = useHeritage();
  const [questionInput, setQuestionInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const presets = PRESET_GUIDE_QUESTIONS[monument.id] || PRESET_GUIDE_QUESTIONS['amber-fort'] || [];

  const handleSimulateVoiceInput = () => {
    setIsRecording(true);
    showToast('Simulating microphone voice recognition...', 'info');

    // Simulate voice speech-to-text recognition
    setTimeout(() => {
      setIsRecording(false);
      const randomPreset = presets[Math.floor(Math.random() * presets.length)];
      if (randomPreset) {
        setQuestionInput(randomPreset.question);
      }
    }, 1200);
  };

  const handleSubmitQuestion = (qText) => {
    const finalQ = qText || questionInput;
    if (!finalQ.trim()) return;

    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      const answer = generateAIResponse(monument.id, finalQ);
      onQuestionAnswered({
        id: `dialogue-${Date.now()}`,
        question: finalQ,
        answer: answer,
        timestamp: 'Just now'
      });
      setQuestionInput('');
      onClose();

      // Trigger speech synthesis for the AI answer
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(answer);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-modal border border-heritage-border overflow-hidden p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-heritage-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-heritage-red flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial-heading font-bold text-base text-heritage-textDark">
                Ask the AI Heritage Guide
              </h3>
              <p className="text-xs text-heritage-textMuted">
                Context: {monument.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-heritage-textMuted hover:text-heritage-textDark rounded-lg hover:bg-heritage-bg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input area */}
        <div className="my-5 space-y-3">
          <div className="relative">
            <input
              type="text"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="e.g. Why was this entrance important? or How was the glass lit?"
              className="w-full px-4 py-3 bg-heritage-bg border border-heritage-border rounded-xl text-sm font-medium text-heritage-textDark placeholder-heritage-textMuted focus:outline-none focus:border-heritage-red focus:bg-white transition-all pr-24"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmitQuestion();
              }}
            />

            <div className="absolute right-2 top-2 flex items-center gap-1">
              <button
                onClick={handleSimulateVoiceInput}
                disabled={isRecording}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-heritage-red text-white animate-pulse' 
                    : 'bg-white hover:bg-heritage-beige text-heritage-red border border-heritage-border'
                }`}
                title="Simulate Voice Input"
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSubmitQuestion()}
                disabled={!questionInput.trim() || isThinking}
                className="p-2 bg-heritage-red hover:bg-heritage-deepRed disabled:opacity-50 text-white rounded-lg transition-colors"
                title="Send Question"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isRecording && (
            <p className="text-xs text-heritage-red font-semibold animate-pulse text-center">
              🎙️ Listening to your voice... speaking "Why was this entrance important?"
            </p>
          )}

          {isThinking && (
            <p className="text-xs text-heritage-gold font-semibold animate-pulse text-center">
              Consulting royal Rajput architectural archives...
            </p>
          )}
        </div>

        {/* Suggested Historical Questions */}
        <div>
          <p className="text-[11px] font-bold text-heritage-textMuted uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-heritage-red" />
            Suggested Questions for {monument.name}:
          </p>

          <div className="space-y-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSubmitQuestion(preset.question)}
                className="w-full p-3 bg-heritage-bg hover:bg-red-50/60 border border-heritage-border hover:border-red-200 rounded-xl text-left text-xs font-medium text-heritage-textDark transition-all flex items-center justify-between group"
              >
                <span>"{preset.question}"</span>
                <span className="text-[10px] font-semibold text-heritage-red opacity-0 group-hover:opacity-100 transition-opacity">
                  Ask →
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
