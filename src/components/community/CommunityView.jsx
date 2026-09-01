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
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fade-in">
      
      {/* 1. Header Banner */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl border border-heritage-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-heritage-red border border-red-200 rounded-full text-xs font-bold shadow-subtle mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Living Community Cultural Archive</span>
          </div>

          <h1 className="font-editorial-heading font-bold text-2xl sm:text-3xl text-heritage-textDark leading-tight">
            Stories from the people who know these places best.
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-heritage-textMuted max-w-xl leading-relaxed">
            Preserving oral genealogies, master artisan processes, local folklore, and verified historical records across generations.
          </p>
        </div>

        <button
          onClick={() => setIsCreateStoryOpen(true)}
          className="py-3 px-5 bg-heritage-red hover:bg-heritage-deepRed text-white text-xs font-semibold rounded-xl shadow-card transition-all flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Contribute a Story</span>
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
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isSelected
                  ? 'bg-heritage-red text-white border-heritage-red shadow-subtle'
                  : 'bg-white hover:bg-heritage-beige text-heritage-textDark border-heritage-border'
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
              className="bg-white rounded-3xl p-6 sm:p-8 border border-heritage-border shadow-card hover:shadow-card-hover transition-all duration-300 space-y-5"
            >
              {/* Contributor Header & Credibility Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-heritage-border/70">
                <div className="flex items-center gap-3">
                  <img
                    src={story.contributor.avatar}
                    alt={story.contributor.name}
                    className="w-10 h-10 rounded-full object-cover border border-heritage-border flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-heritage-textDark">
                        {story.contributor.name}
                      </h4>
                      <span className="text-[11px] text-heritage-textMuted">
                        {story.contributor.handle}
                      </span>
                    </div>
                    <p className="text-[10px] text-heritage-textMuted flex items-center gap-1.5 mt-0.5">
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
                <h3 className="font-editorial-heading font-bold text-lg sm:text-xl text-heritage-textDark leading-snug">
                  {story.title}
                </h3>

                <p className="mt-3 font-editorial-serif text-base sm:text-lg text-heritage-textDark leading-relaxed">
                  "{story.content}"
                </p>

                <p className="text-[11px] text-heritage-textMuted mt-2 italic bg-heritage-bg p-2.5 rounded-xl border border-heritage-border/60">
                  ℹ️ {story.typeDescription}
                </p>
              </div>

              {/* Optional Archival Image */}
              {story.image && (
                <div className="rounded-2xl overflow-hidden border border-heritage-border max-h-80">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Oral Audio Snippet Player if applicable */}
              {story.hasAudio && (
                <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleAudio(story.id)}
                      className="w-10 h-10 rounded-full bg-indigo-900 text-white flex items-center justify-center shadow-subtle hover:bg-indigo-800 transition-colors flex-shrink-0"
                    >
                      {isAudioPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <div>
                      <p className="font-bold text-xs text-indigo-950">{story.audioTitle}</p>
                      <p className="text-[10px] text-indigo-700">Archival Audio Recording · {story.audioDuration}</p>
                    </div>
                  </div>
                  <Volume2 className={`w-5 h-5 text-indigo-800 ${isAudioPlaying ? 'animate-bounce' : ''}`} />
                </div>
              )}

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-heritage-border/70 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Upvote */}
                  <button
                    onClick={() => toggleUpvoteStory(story.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                      isUpvoted
                        ? 'bg-red-50 text-heritage-red border-red-200 font-bold'
                        : 'bg-heritage-bg hover:bg-heritage-beige text-heritage-textDark border-heritage-border'
                    }`}
                  >
                    <ArrowBigUp className={`w-4 h-4 ${isUpvoted ? 'fill-heritage-red text-heritage-red' : ''}`} />
                    <span>Upvote ({voteScore})</span>
                  </button>

                  {/* Downvote */}
                  <button
                    onClick={() => toggleDownvoteStory(story.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                      isDownvoted
                        ? 'bg-heritage-textDark text-white border-heritage-textDark font-bold'
                        : 'bg-heritage-bg hover:bg-heritage-beige text-heritage-textDark border-heritage-border'
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
                    className={`p-2 rounded-xl border transition-all ${
                      isSaved
                        ? 'bg-red-50 text-heritage-red border-red-200'
                        : 'bg-heritage-bg hover:bg-heritage-beige text-heritage-textMuted border-heritage-border'
                    }`}
                    title={isSaved ? 'Saved in Archive' : 'Save Story'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-heritage-red text-heritage-red' : ''}`} />
                  </button>

                  {/* Share */}
                  <button
                    onClick={() => handleShareStory(story)}
                    className="p-2 bg-heritage-bg hover:bg-heritage-beige text-heritage-textMuted hover:text-heritage-textDark rounded-xl border border-heritage-border transition-colors"
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
