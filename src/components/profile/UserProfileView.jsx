import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { MOCK_HERITAGE } from '../../data/mockHeritage';
import { MOCK_STORIES } from '../../data/mockStories';
import { 
  Award, 
  Bookmark, 
  Sparkles, 
  Headphones, 
  MapPin, 
  Share2, 
  Trash2, 
  ArrowUpRight, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../common/Badge';
import confetti from 'canvas-confetti';

export const UserProfileView = () => {
  const { 
    userPassport, 
    savedHeritageIds, 
    toggleSaveHeritage, 
    savedStoryIds, 
    toggleSaveStory,
    openMonumentDetail,
    setActiveTab,
    showToast 
  } = useHeritage();

  const [activeTab, setActiveTabLocal] = useState('savedMonuments'); // 'savedMonuments' | 'savedStories' | 'badges'

  const savedMonuments = MOCK_HERITAGE.filter(m => savedHeritageIds.includes(m.id));
  const savedStories = MOCK_STORIES.filter(s => savedStoryIds.includes(s.id));

  const handleSharePassport = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#9E1B32', '#C5A059', '#171717']
    });
    showToast('Cultural Passport achievement link copied!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fade-in p-4 sm:p-8 rounded-3xl bg-heritage-pattern border border-[#D4AA57]/20 shadow-2xl">
      
      {/* 1. Cultural Passport Card */}
      <section className="relative bg-gradient-to-br from-[#1A1209] via-[#2D2318] to-[#120D06] text-white rounded-3xl p-6 sm:p-10 border border-[#D4AA57]/30 shadow-modal overflow-hidden">
        {/* Subtle gold radial geometric overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none bg-[radial-gradient(#D4AA57_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-[#C0392B] text-white flex items-center justify-center font-display font-bold text-2xl border-2 border-[#D4AA57] shadow-glow-red flex-shrink-0">
              YR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="gold" size="xs" className="font-sans font-semibold text-[10px]">
                  National Heritage Explorer · Level {userPassport.level}
                </Badge>
                <span className="text-xs font-serif text-neutral-300">Smriti Edition</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white mt-1">
                {userPassport.name}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 flex items-center gap-1.5 mt-0.5 font-serif">
                <span className="w-2 h-2 rounded-full bg-[#D4AA57] inline-block" />
                {userPassport.levelTitle}
              </p>
            </div>
          </div>

          <button
            onClick={handleSharePassport}
            className="py-2.5 px-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bodoni uppercase tracking-wider rounded-full flex items-center gap-2 self-start md:self-auto transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Passport</span>
          </button>
        </div>

        {/* XP Progress Bar */}
        <div className="relative z-10 mt-6 pt-6 border-t border-neutral-700/60 space-y-2 font-serif">
          <div className="flex items-center justify-between text-xs text-neutral-300">
            <span>Explorer Experience: {userPassport.xp} / {userPassport.nextLevelXp} XP</span>
            <span className="text-[#D4AA57] font-bold font-sans">Level 4 at 1000 XP</span>
          </div>
          <div className="w-full bg-neutral-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#C0392B] to-[#D4AA57] h-full rounded-full transition-all duration-500"
              style={{ width: `${(userPassport.xp / userPassport.nextLevelXp) * 100}%` }}
            />
          </div>
        </div>

        {/* 4 Key Heritage Metrics */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-neutral-700/60 text-center font-serif">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-lg sm:text-2xl font-bold font-display text-[#D4AA57]">
              {userPassport.monumentsExplored}
            </p>
            <p className="text-[10px] uppercase font-sans text-neutral-400 font-medium mt-0.5">Monuments Visited</p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-lg sm:text-2xl font-bold font-display text-[#D4AA57]">
              {userPassport.audioMinutesListened}m
            </p>
            <p className="text-[10px] uppercase font-sans text-neutral-400 font-medium mt-0.5">Audio Guide Time</p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-lg sm:text-2xl font-bold font-display text-[#D4AA57]">
              {userPassport.badges.length}
            </p>
            <p className="text-[10px] uppercase font-sans text-neutral-400 font-medium mt-0.5">Badges Unlocked</p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-lg sm:text-2xl font-bold font-display text-[#D4AA57]">
              {savedHeritageIds.length + savedStoryIds.length}
            </p>
            <p className="text-[10px] uppercase font-sans text-neutral-400 font-medium mt-0.5">Saved Curations</p>
          </div>
        </div>
      </section>

      {/* 2. Passport Badges Showcase */}
      <section className="bg-white/95 p-6 sm:p-8 rounded-3xl border border-[#EDE5D8] shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EDE5D8]">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D4AA57]" />
            <h3 className="font-display font-bold text-xl text-[#1A1209]">
              Unlocked Heritage Badges
            </h3>
          </div>
          <span className="text-xs font-serif font-semibold text-[#C0392B]">
            {userPassport.badges.length} of 12 Badges
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {userPassport.badges.map((b) => (
            <div key={b.id} className="p-4 bg-[#F5EDE0] rounded-2xl border border-[#EDE5D8] text-center space-y-2 group hover:border-[#D4AA57] transition-colors">
              <span className="text-3xl inline-block group-hover:scale-110 transition-transform">{b.icon}</span>
              <h4 className="font-serif font-bold text-xs text-[#1A1209]">{b.name}</h4>
              <p className="text-[11px] font-serif text-[#7a6050] leading-snug">{b.description}</p>
              <span className="inline-block text-[9px] text-emerald-800 font-sans font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {b.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Saved Items Tabs & Lists */}
      <section className="bg-white/95 p-6 sm:p-8 rounded-3xl border border-[#EDE5D8] shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-[#EDE5D8] pb-3">
          <div className="flex items-center gap-2 font-serif">
            <button
              onClick={() => setActiveTabLocal('savedMonuments')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'savedMonuments'
                  ? 'bg-[#C0392B] text-white shadow-subtle'
                  : 'text-[#7a6050] hover:text-[#1A1209] hover:bg-[#F5EDE0]'
              }`}
            >
              Saved Monuments ({savedMonuments.length})
            </button>
            <button
              onClick={() => setActiveTabLocal('savedStories')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'savedStories'
                  ? 'bg-[#C0392B] text-white shadow-subtle'
                  : 'text-[#7a6050] hover:text-[#1A1209] hover:bg-[#F5EDE0]'
              }`}
            >
              Saved Stories ({savedStories.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Saved Monuments */}
        {activeTab === 'savedMonuments' && (
          <div className="space-y-3 font-serif">
            {savedMonuments.length === 0 ? (
              <p className="text-xs text-[#7a6050] text-center py-8">
                No monuments saved yet. Explore and tap the bookmark icon to collect them here!
              </p>
            ) : (
              savedMonuments.map((mon) => (
                <div
                  key={mon.id}
                  className="flex items-center justify-between p-3.5 bg-[#F5EDE0] rounded-2xl border border-[#EDE5D8] hover:bg-white transition-colors"
                >
                  <div 
                    onClick={() => openMonumentDetail(mon.id)}
                    className="flex items-center gap-3 cursor-pointer group flex-1"
                  >
                    <img
                      src={mon.heroImage}
                      alt={mon.name}
                      className="w-14 h-14 rounded-xl object-cover border border-[#EDE5D8]"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#1A1209] group-hover:text-[#C0392B] transition-colors">
                        {mon.name}
                      </h4>
                      <p className="text-[11px] text-[#7a6050]">{mon.era} · {mon.locationName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-bodoni">
                    <button
                      onClick={() => openMonumentDetail(mon.id)}
                      className="py-1.5 px-3 bg-white hover:bg-[#F5EDE0] text-[#1A1209] text-xs font-semibold rounded-lg border border-[#EDE5D8] flex items-center gap-1 transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleSaveHeritage(mon.id)}
                      className="p-2 text-[#7a6050] hover:text-[#C0392B] rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Saved Stories */}
        {activeTab === 'savedStories' && (
          <div className="space-y-3 font-serif">
            {savedStories.length === 0 ? (
              <p className="text-xs text-[#7a6050] text-center py-8">
                No community stories saved yet. Browse the community archive to bookmark stories!
              </p>
            ) : (
              savedStories.map((story) => (
                <div
                  key={story.id}
                  className="flex items-center justify-between p-3.5 bg-[#F5EDE0] rounded-2xl border border-[#EDE5D8] hover:bg-white transition-colors"
                >
                  <div 
                    onClick={() => setActiveTab('community')}
                    className="flex items-center gap-3 cursor-pointer group flex-1"
                  >
                    <span className="text-2xl">{story.typeIcon}</span>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#1A1209] group-hover:text-[#C0392B] transition-colors line-clamp-1">
                        {story.title}
                      </h4>
                      <p className="text-[11px] text-[#7a6050]">{story.contributor.name} · {story.type}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveStory(story.id)}
                    className="p-2 text-[#7a6050] hover:text-[#C0392B] rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove Story"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

      </section>

    </div>
  );
};
