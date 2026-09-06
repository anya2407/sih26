import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { MOCK_STORIES } from '../../data/mockStories';
import { CreateStoryModal } from './CreateStoryModal';
import { 
  Bookmark, 
  ArrowBigUp, 
  ArrowBigDown,
  Share2, 
  Play, 
  Pause, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  Filter,
  Volume2
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const CommunityView = () => {
  const { 
    savedStoryIds, 
    toggleSaveStory, 
    upvotedStoryIds, 
    toggleUpvoteStory,
    downvotedStoryIds,
    toggleDownvoteStory,
    showToast 
  } = useHeritage();

  const [stories, setStories] = useState(MOCK_STORIES);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
  const [playingAudioStoryId, setPlayingAudioStoryId] = useState(null);

  const filterOptions = [
    'All',
    'Verified Historical Record',
    'Folklore / Oral Tradition',
    'Local Knowledge',
    'Oral Audio Recording',
    'Historical Photograph'
  ];

  const filteredStories = (selectedFilter === 'All'
    ? stories
    : stories.filter(s => s.type === selectedFilter))
    .slice()
    .sort((a, b) => {
      const score = (story) => story.upvotes
        + (upvotedStoryIds.includes(story.id) ? 1 : 0)
        - (downvotedStoryIds.includes(story.id) ? 1 : 0);
      return score(b) - score(a);
    });

  const handleToggleAudio = (storyId) => {
    if (playingAudioStoryId === storyId) {
      setPlayingAudioStoryId(null);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      showToast('Audio playback paused', 'info');
    } else {
      setPlayingAudioStoryId(storyId);
      const story = stories.find(s => s.id === storyId);
      if ('speechSynthesis' in window && story) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(story.content);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
      showToast('Playing community oral recording narration', 'success');
    }
  };

  const handleShareStory = (story) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`Archival link for "${story.title}" copied!`, 'success');
    }
  };

  const handleStoryCreated = (newStory) => {
    setStories(prev => [newStory, ...prev]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fade-in p-4 sm:p-8 rounded-3xl bg-terracotta-pattern border border-[#FB923C]/25 shadow-2xl">
      
      {/* 1. Header Banner */}
      <section className="bg-[#FEF3C7]/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-[#F59E0B]/30 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#F59E0B]/15 text-[#1A1209] border border-[#F59E0B]/30 rounded-full text-xs font-sans font-semibold shadow-subtle mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="tracking-[0.16em]">✦ Voices from Hampi & Living Archives ✦</span>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-4xl text-[#1A1209] leading-tight">
            Stories from the people who <em className="text-[#C0392B] not-italic">know these places best.</em>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#7a6050] max-w-xl font-serif leading-relaxed">
            Preserving oral genealogies, master artisan processes, local folklore, and verified historical records across generations.
          </p>
        </div>

        <button
          onClick={() => setIsCreateStoryOpen(true)}
          className="py-3.5 px-6 bg-[#F59E0B] hover:bg-[#D97706] text-[#1A1209] font-display text-sm font-bold rounded-full shadow-card transition-all flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>✦ Share a Story</span>
        </button>
      </section>

      {/* 2. Filter Pills */}
      <section className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterOptions.map((opt) => {
          const isSelected = selectedFilter === opt;
          return (
            <button
              key={opt}
              onClick={() => setSelectedFilter(opt)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-sans font-medium transition-all border ${
                isSelected
                  ? 'bg-[#F59E0B] text-[#1A1209] border-[#F59E0B] font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-[#FEF3C7] border-white/15'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </section>

      {/* 3. Community Feed Posts */}
      <div className="space-y-6">
        {filteredStories.map((story) => {
          const isSaved = savedStoryIds.includes(story.id);
          const isUpvoted = upvotedStoryIds.includes(story.id);
          const isDownvoted = downvotedStoryIds.includes(story.id);
          const isAudioPlaying = playingAudioStoryId === story.id;
          const voteScore = story.upvotes + (isUpvoted ? 1 : 0) - (isDownvoted ? 1 : 0);

          return (
            <article
              key={story.id}
              className="bg-[#FEF3C7]/95 rounded-3xl p-6 sm:p-8 border border-[#F59E0B]/30 shadow-card hover:shadow-card-hover transition-all duration-300 space-y-5"
            >
              {/* Contributor Header & Credibility Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#7a6050]/20">
                <div className="flex items-center gap-3">
                  <img
                    src={story.contributor.avatar}
                    alt={story.contributor.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#F59E0B]/40 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1A1209]">
                        {story.contributor.name}
                      </h4>
                      <span className="text-[11px] font-sans text-[#7a6050]">
                        {story.contributor.handle}
                      </span>
                    </div>
                    <p className="text-[10px] font-sans text-[#7a6050] flex items-center gap-1.5 mt-0.5">
                      <span>📍 {story.location}</span>
                      <span>•</span>
                      <span>{story.date}</span>
                    </p>
                  </div>
                </div>

                {/* Explicit Credibility Badge */}
                <div className="flex items-center gap-2">
                  <Badge variant={story.type === 'Verified Historical Record' ? 'emerald' : story.type === 'Folklore / Oral Tradition' ? 'gold' : 'default'} size="sm">
                    <span>{story.typeIcon}</span>
                    <span>{story.type}</span>
                  </Badge>
                </div>
              </div>

              {/* Story Content */}
              <div>
                <h3 className="font-display font-bold text-lg sm:text-2xl text-[#1A1209] leading-snug">
                  {story.title}
                </h3>

                <p className="mt-3 font-serif text-base sm:text-lg text-[#1A1209] leading-relaxed">
                  "{story.content}"
                </p>

                <p className="text-[11px] font-serif text-[#7a6050] mt-2 italic bg-[#F5EDE0] p-2.5 rounded-xl border border-[#EDE5D8]">
                  ℹ️ {story.typeDescription}
                </p>
              </div>

              {/* Optional Archival Image */}
              {story.image && (
                <div className="rounded-2xl overflow-hidden border border-[#EDE5D8] max-h-80">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Oral Audio Snippet Player if applicable */}
              {story.hasAudio && (
                <div className="p-4 bg-[#4A0E00]/10 rounded-2xl border border-[#C0392B]/30 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleAudio(story.id)}
                      className="w-10 h-10 rounded-full bg-[#C0392B] text-white flex items-center justify-center shadow-subtle hover:bg-[#96281B] transition-colors flex-shrink-0"
                    >
                      {isAudioPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <div>
                      <p className="font-display font-bold text-sm text-[#1A1209]">{story.audioTitle}</p>
                      <p className="text-[10px] font-sans text-[#7a6050]">Archival Audio Recording · {story.audioDuration}</p>
                    </div>
                  </div>
                  <Volume2 className={`w-5 h-5 text-[#C0392B] ${isAudioPlaying ? 'animate-bounce' : ''}`} />
                </div>
              )}

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-[#7a6050]/20 flex items-center justify-between text-xs font-bodoni">
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Upvote */}
                  <button
                    onClick={() => toggleUpvoteStory(story.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all ${
                      isUpvoted
                        ? 'bg-[#C0392B] text-white border-[#C0392B] font-bold shadow-sm'
                        : 'bg-white hover:bg-[#F5EDE0] text-[#1A1209] border-[#EDE5D8]'
                    }`}
                  >
                    <ArrowBigUp className={`w-4 h-4 ${isUpvoted ? 'fill-white text-white' : ''}`} />
                    <span>Upvote ({voteScore})</span>
                  </button>

                  {/* Downvote */}
                  <button
                    onClick={() => toggleDownvoteStory(story.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all ${
                      isDownvoted
                        ? 'bg-[#1A1209] text-white border-[#1A1209] font-bold'
                        : 'bg-white hover:bg-[#F5EDE0] text-[#1A1209] border-[#EDE5D8]'
                    }`}
                  >
                    <ArrowBigDown className={`w-4 h-4 ${isDownvoted ? 'fill-current' : ''}`} />
                    <span>Downvote</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Bookmark Save */}
                  <button
                    onClick={() => toggleSaveStory(story.id)}
                    className={`p-2 rounded-full border transition-all ${
                      isSaved
                        ? 'bg-[#C0392B]/15 text-[#C0392B] border-[#C0392B]/40'
                        : 'bg-white hover:bg-[#F5EDE0] text-[#7a6050] border-[#EDE5D8]'
                    }`}
                    title={isSaved ? 'Saved in Archive' : 'Save Story'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#C0392B] text-[#C0392B]' : ''}`} />
                  </button>

                  {/* Share */}
                  <button
                    onClick={() => handleShareStory(story)}
                    className="p-2 bg-white hover:bg-[#F5EDE0] text-[#7a6050] hover:text-[#1A1209] rounded-full border border-[#EDE5D8] transition-colors"
                    title="Share Archival Story"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </article>
          );
        })}
      </div>

      <CreateStoryModal
        isOpen={isCreateStoryOpen}
        onClose={() => setIsCreateStoryOpen(false)}
        onStoryCreated={handleStoryCreated}
      />

    </div>
  );
};
