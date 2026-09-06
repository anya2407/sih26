import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { MOCK_HERITAGE } from '../../data/mockHeritage';
import { 
  Headphones, 
  MapPin, 
  Calendar, 
  Clock, 
  Ticket, 
  Bookmark, 
  Share2, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Info,
  Layers,
  Compass,
  MessageSquare
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const HeritageDetailView = () => {
  const { 
    selectedMonumentId, 
    closeMonumentDetail, 
    startAudioGuide, 
    savedHeritageIds, 
    toggleSaveHeritage, 
    setActiveTab,
    showToast 
  } = useHeritage();

  const monument = MOCK_HERITAGE.find(m => m.id === selectedMonumentId) || MOCK_HERITAGE[0];
  const [activeTab, setActiveSectionTab] = useState('overview'); // 'overview' | 'history' | 'architecture' | 'folklore' | 'voices'
  const isSaved = savedHeritageIds.includes(monument.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Cultural dossier link copied to clipboard', 'success');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24 animate-fade-in p-4 sm:p-8 rounded-3xl bg-heritage-pattern border border-[#C0392B]/20 shadow-2xl">
      
      {/* 1. Hero Image & Monument Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-white border border-[#EDE5D8] shadow-card">
        <div className="relative h-72 sm:h-96 md:h-[420px] overflow-hidden">
          <img
            src={monument.heroImage}
            alt={monument.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Top Bar Actions on Image */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 font-bodoni">
            <button
              onClick={closeMonumentDetail}
              className="flex items-center gap-2 px-4 py-2 bg-white/95 hover:bg-white text-[#1A1209] rounded-full text-xs font-semibold backdrop-blur-md transition-colors shadow-subtle"
            >
              <ArrowLeft className="w-4 h-4 text-[#C0392B]" />
              <span>← Back</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 bg-white/95 hover:bg-white text-[#1A1209] rounded-full backdrop-blur-md transition-colors shadow-subtle"
                title="Share Dossier"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleSaveHeritage(monument.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-colors shadow-subtle ${
                  isSaved
                    ? 'bg-[#C0392B] text-white'
                    : 'bg-white/95 hover:bg-white text-[#1A1209]'
                }`}
                title="Save Monument"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom Title & Badges */}
          <div className="absolute bottom-6 left-6 right-6 text-white z-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {monument.unesco && (
                <Badge variant="gold" size="xs" className="backdrop-blur-md font-sans">
                  ★ UNESCO World Heritage
                </Badge>
              )}
              <Badge variant="default" size="xs" className="bg-white/90 text-[#1A1209] backdrop-blur-md font-sans">
                {monument.era}
              </Badge>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <h1 className="font-display font-bold text-2xl sm:text-4xl text-white leading-tight">
                  {monument.name}
                </h1>
                <p className="font-serif text-sm sm:text-base text-white/80 mt-0.5">
                  {monument.hindiName} · {monument.locationName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Essential Quick Meta Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#F5EDE0] border-t border-[#EDE5D8] text-xs font-serif">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
            <div>
              <p className="text-[10px] text-[#7a6050] font-sans font-medium uppercase">Commissioned</p>
              <p className="font-semibold text-[#1A1209]">{monument.yearBuilt}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
            <div>
              <p className="text-[10px] text-[#7a6050] font-sans font-medium uppercase">Visiting Hours</p>
              <p className="font-semibold text-[#1A1209] truncate">{monument.hours.split(',')[0]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Ticket className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
            <div>
              <p className="text-[10px] text-[#7a6050] font-sans font-medium uppercase">Entry Ticket</p>
              <p className="font-semibold text-[#1A1209] truncate">{monument.entryFee.split('·')[0]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
            <div>
              <p className="text-[10px] text-[#7a6050] font-sans font-medium uppercase">Distance</p>
              <p className="font-semibold text-[#1A1209]">{monument.distanceKm} km from center</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Call-to-Action Bar for AI Guide */}
      <section className="bg-[#1A1209] text-white p-6 rounded-2xl border border-[#C0392B]/30 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#C0392B] text-white flex items-center justify-center flex-shrink-0 shadow-subtle">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Experience with AI Heritage Voice Companion
            </h3>
            <p className="text-xs font-serif text-white/70">
              {monument.audioGuideLength} · Listen while walking through courtyards
            </p>
          </div>
        </div>

        <button
          onClick={() => startAudioGuide(monument.id)}
          className="w-full sm:w-auto py-3 px-6 bg-[#C0392B] hover:bg-[#96281B] text-white text-xs font-bodoni uppercase tracking-wider rounded-full shadow-card transition-all flex items-center justify-center gap-2"
        >
          <Headphones className="w-4 h-4" />
          <span>🎙️ Start Audio Narration</span>
        </button>
      </section>

      {/* 3. Editorial Tabs Navigation */}
      <section className="flex items-center gap-2 border-b border-[#EDE5D8] pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview & Highlights' },
          { id: 'history', label: 'Historical Timeline' },
          { id: 'architecture', label: 'Architectural Genius' },
          { id: 'folklore', label: 'Legends vs Facts' },
          { id: 'voices', label: 'Community & Historians' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSectionTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-serif transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#C0392B] text-white font-bold shadow-subtle'
                : 'text-[#7a6050] hover:text-[#1A1209] hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </section>

      {/* 4. Tab Content Area */}
      <section className="bg-white/95 p-6 sm:p-8 rounded-3xl border border-[#EDE5D8] shadow-card space-y-6">
        
        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display font-bold text-2xl text-[#1A1209] mb-3">
                Civilizational Dossier
              </h3>
              <p className="font-serif text-base sm:text-lg text-[#1A1209] leading-relaxed">
                {monument.overview}
              </p>
            </div>

            {/* Points of Interest Highlight Tiles */}
            <div>
              <h4 className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#C0392B] mb-3">
                ✦ Key Points of Interest in the Complex:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {monument.pointsOfInterest?.map((poi) => (
                  <div key={poi.id} className="p-4 bg-[#F5EDE0] rounded-2xl border border-[#EDE5D8] space-y-1.5 border-l-4 border-l-[#C0392B]">
                    <div className="flex items-center justify-between">
                      <p className="font-display font-bold text-sm text-[#1A1209]">{poi.name}</p>
                      <span className="text-[10px] font-mono text-[#C0392B] font-semibold">{poi.audioTime}</span>
                    </div>
                    <p className="text-[11px] font-serif text-[#7a6050]">{poi.location}</p>
                    <p className="text-xs font-serif text-[#1A1209]/80 leading-relaxed pt-1">{poi.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: History Timeline */}
        {activeTab === 'history' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-display font-bold text-2xl text-[#1A1209]">
              Chronological Historical Timeline
            </h3>

            <div className="relative border-l-2 border-[#C0392B]/30 ml-4 pl-6 space-y-6 font-serif">
              {monument.historyTimeline?.map((item, idx) => (
                <div key={idx} className="relative group">
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#C0392B] group-hover:bg-[#C0392B] transition-colors" />
                  <span className="text-xs font-bold font-mono text-[#C0392B] bg-[#C0392B]/10 px-2.5 py-0.5 rounded-full border border-[#C0392B]/20">
                    {item.year}
                  </span>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#1A1209] leading-relaxed">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display font-bold text-2xl text-[#1A1209] mb-1">
                Architectural Style & Materiality
              </h3>
              <p className="text-xs font-serif text-[#7a6050]">
                Style: <strong className="text-[#1A1209]">{monument.architectureDetails.style}</strong> · Materials: {monument.architectureDetails.materials}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#C0392B]">
                ✦ Engineering Innovations:
              </h4>
              {monument.architectureDetails.notableFeatures.map((feat, idx) => (
                <div key={idx} className="p-4 bg-[#F5EDE0] rounded-2xl border border-[#EDE5D8] flex items-start gap-3 border-l-4 border-l-[#C0392B]">
                  <span className="text-[#C0392B] font-display font-bold text-base">0{idx + 1}.</span>
                  <p className="text-xs sm:text-sm font-serif text-[#1A1209] leading-relaxed">
                    {feat}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Folklore vs Facts */}
        {activeTab === 'folklore' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display font-bold text-2xl text-[#1A1209] mb-1">
                Oral Traditions & Historical Distinctions
              </h3>
              <p className="text-xs font-serif text-[#7a6050]">
                Clear distinction between certified archaeological fact and regional cultural folklore.
              </p>
            </div>

            <div className="space-y-4">
              {monument.folkloreAndLegends?.map((item, idx) => (
                <div key={idx} className="p-5 bg-[#F5EDE0] rounded-2xl border border-[#EDE5D8] space-y-2 border-l-4 border-l-[#D4AA57]">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-base text-[#1A1209]">{item.title}</h4>
                    <Badge variant={item.type.includes('Verified') ? 'emerald' : 'gold'} size="xs">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm font-serif text-[#7a6050] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Community Voices */}
        {activeTab === 'voices' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-display font-bold text-2xl text-[#1A1209]">
              Voices of Historians & Living Custodians
            </h3>

            <div className="space-y-4">
              {monument.communityVoices?.map((voice, idx) => (
                <div key={idx} className="p-5 bg-[#F5EDE0] rounded-2xl border border-[#EDE5D8] space-y-3 border-l-4 border-l-[#C0392B]">
                  <p className="font-serif text-base text-[#1A1209] italic leading-relaxed">
                    "{voice.quote}"
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#EDE5D8]">
                    <span className="w-2 h-2 rounded-full bg-[#C0392B]" />
                    <div>
                      <p className="text-xs font-serif font-bold text-[#1A1209]">{voice.author}</p>
                      <p className="text-[10px] font-sans text-[#7a6050]">{voice.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* Floating Sticky "Ask the AI Guide" Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-fade-in font-bodoni">
        <button
          onClick={() => startAudioGuide(monument.id)}
          className="px-6 py-3.5 bg-[#C0392B] hover:bg-[#96281B] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-modal hover:shadow-card-hover flex items-center gap-2 transition-all border border-[#D4AA57]/40"
        >
          <Headphones className="w-4 h-4" />
          <span>🎙️ Ask Veda About {monument.name}</span>
        </button>
      </div>

    </div>
  );
};
