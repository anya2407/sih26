import React from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { MOCK_HERITAGE } from '../../data/mockHeritage';
import { MOCK_CULTURE } from '../../data/mockCulture';
import { MOCK_STORIES } from '../../data/mockStories';
import { MOCK_RECOMMENDATIONS } from '../../data/mockRecommendations';
import { HeritageCard } from './HeritageCard';
import { CultureCard } from './CultureCard';
import { EventCard } from './EventCard';
import { 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Headphones, 
  Compass, 
  BookOpen, 
  Layers, 
  Calendar,
  Search,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const ExploreDashboard = () => {
  const { 
    currentCity, 
    setIsLocationPickerOpen, 
    setActiveTab, 
    startAudioGuide, 
    openMonumentDetail,
    setIsSearchModalOpen
  } = useHeritage();

  // Get current hour for dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const cityMonuments = MOCK_HERITAGE.filter(m => m.cityId === currentCity.id);
  const featuredMonument = cityMonuments[0] || MOCK_HERITAGE[0];
  const otherMonuments = cityMonuments.slice(1);

  const cityStories = MOCK_STORIES.filter(s => s.cityId === currentCity.id || s.cityId === 'jaipur');
  const cityRecommendations = MOCK_RECOMMENDATIONS.filter(r => r.cityId === currentCity.id || r.cityId === 'jaipur');
  const events = cityRecommendations.filter(r => r.category === 'Events');

  return (
    <div className="space-y-10 pb-16 animate-fade-in">
      
      {/* 1. Contextual Greeting & Location Banner */}
      <section className="relative bg-white rounded-3xl p-6 sm:p-10 border border-heritage-border shadow-card overflow-hidden">
        {/* Subtle decorative heritage radial glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-heritage-red border border-red-200 rounded-full text-xs font-bold shadow-subtle">
                <MapPin className="w-3.5 h-3.5" />
                {currentCity.name}, {currentCity.state}
              </span>
              <span className="text-xs font-semibold text-heritage-textMuted">
                {currentCity.climate}
              </span>
            </div>

            <h1 className="font-editorial-heading font-bold text-2xl sm:text-4xl text-heritage-textDark leading-tight tracking-tight">
              {getGreeting()}. Discover what makes <span className="text-heritage-red italic font-editorial-serif font-normal">{currentCity.name}</span> extraordinary.
            </h1>

            <p className="mt-3 text-sm sm:text-base text-heritage-textMuted leading-relaxed">
              {currentCity.description}
            </p>

            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-heritage-bg hover:bg-heritage-beige border border-heritage-border rounded-xl text-xs font-semibold text-heritage-textDark transition-colors"
            >
              <Search className="w-4 h-4 text-heritage-red" />
              <span>Search heritage, culture & stories</span>
            </button>

            {/* Quick stats pills */}
            <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium text-heritage-textDark">
              <span className="px-3 py-1.5 bg-heritage-bg rounded-xl border border-heritage-border flex items-center gap-1.5">
                🏛️ <strong className="font-semibold">{currentCity.heritageCount}</strong> Royal Sites
              </span>
              <span className="px-3 py-1.5 bg-heritage-bg rounded-xl border border-heritage-border flex items-center gap-1.5">
                🎨 <strong className="font-semibold">{currentCity.cultureCount}</strong> Living Crafts
              </span>
              <span className="px-3 py-1.5 bg-heritage-bg rounded-xl border border-heritage-border flex items-center gap-1.5">
                📜 <strong className="font-semibold">{currentCity.storiesCount}</strong> Oral Traditions
              </span>
            </div>
          </div>

          {/* Quick AI Voice Guide Callout Card */}
          <div className="bg-heritage-bg p-5 rounded-2xl border border-heritage-border/90 flex flex-col justify-between max-w-sm flex-shrink-0">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-heritage-red flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-heritage-red" />
                  AI Heritage Companion
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h4 className="font-editorial-heading font-bold text-base text-heritage-textDark">
                Ready to explore with voice?
              </h4>
              <p className="text-xs text-heritage-textMuted mt-1 leading-relaxed">
                Stand near any monument and listen to location-aware historical narration in real time.
              </p>
            </div>

            <button
              onClick={() => startAudioGuide(featuredMonument.id)}
              className="mt-4 w-full py-2.5 px-4 bg-heritage-red hover:bg-heritage-deepRed text-white text-xs font-semibold rounded-xl shadow-subtle flex items-center justify-center gap-2 transition-all"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Listen at {featuredMonument.name}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Section: Nearby Heritage & Royal Forts */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-heritage-red">
              Architectural Wonders
            </span>
            <h2 className="font-editorial-heading font-bold text-xl sm:text-2xl text-heritage-textDark mt-1">
              Nearby Heritage & Forts
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('map')}
            className="flex items-center gap-1.5 text-xs font-semibold text-heritage-red hover:underline"
          >
            <span>View all on map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Large Feature Card for Primary Monument */}
        <HeritageCard monument={featuredMonument} isFeatured={true} />

        {/* Grid of Other Nearby Monuments */}
        {otherMonuments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {otherMonuments.map(monument => (
              <HeritageCard key={monument.id} monument={monument} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Section: Experience the Culture & Living Traditions */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-heritage-gold">
              Living Heritage
            </span>
            <h2 className="font-editorial-heading font-bold text-xl sm:text-2xl text-heritage-textDark mt-1">
              Experience the Culture
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('culture')}
            className="flex items-center gap-1.5 text-xs font-semibold text-heritage-red hover:underline"
          >
            <span>Explore Cultural Mosaic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_CULTURE.map(culture => (
            <CultureCard key={culture.id} culture={culture} />
          ))}
        </div>
      </section>

      {/* 4. Section: Stories From Here (Editorial Storytelling Block) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-heritage-red">
              Oral History & Archives
            </span>
            <h2 className="font-editorial-heading font-bold text-xl sm:text-2xl text-heritage-textDark mt-1">
              Stories From Here
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('community')}
            className="flex items-center gap-1.5 text-xs font-semibold text-heritage-red hover:underline"
          >
            <span>View all {cityStories.length} stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cityStories.slice(0, 2).map(story => (
            <div
              key={story.id}
              onClick={() => setActiveTab('community')}
              className="group bg-white p-6 rounded-3xl border border-heritage-border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header with Credibility Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{story.typeIcon}</span>
                    <Badge variant={story.type === 'Verified Historical Record' ? 'emerald' : 'default'} size="xs">
                      {story.type}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-heritage-textMuted">{story.date}</span>
                </div>

                <h3 className="font-editorial-heading font-bold text-lg text-heritage-textDark group-hover:text-heritage-red transition-colors leading-snug">
                  {story.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-heritage-textMuted line-clamp-3 leading-relaxed">
                  {story.content}
                </p>

                {/* Contributor Profile */}
                <div className="mt-4 flex items-center gap-3 pt-3 border-t border-heritage-border/60">
                  <img
                    src={story.contributor.avatar}
                    alt={story.contributor.name}
                    className="w-8 h-8 rounded-full object-cover border border-heritage-border"
                  />
                  <div>
                    <p className="text-xs font-semibold text-heritage-textDark">{story.contributor.name}</p>
                    <p className="text-[10px] text-heritage-textMuted">{story.contributor.badge}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-heritage-border/60 flex items-center justify-between text-xs text-heritage-textMuted">
                <span>📍 {story.location}</span>
                <span className="font-semibold text-heritage-red group-hover:underline flex items-center gap-1">
                  Read full archive <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Section: Happening Nearby & Cultural Events */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-heritage-gold">
              Live Festivals & Walks
            </span>
            <h2 className="font-editorial-heading font-bold text-xl sm:text-2xl text-heritage-textDark mt-1">
              Happening Nearby
            </h2>
          </div>

          <span className="text-xs font-semibold text-heritage-textMuted">Local highlights</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
          {/* Fallback local highlight if fewer events */}
          {cityRecommendations.slice(0, 1).map(rec => (
            <EventCard key={rec.id} event={rec} />
          ))}
        </div>
      </section>

      {/* 6. Editorial Cultural Passport Callout Banner */}
      <section className="relative bg-gradient-to-r from-[#232323] to-[#171717] rounded-3xl p-6 sm:p-10 text-white shadow-modal overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-xl">
          <Badge variant="gold" size="xs" className="mb-3 font-semibold">
            National Cultural Passport
          </Badge>
          <h3 className="font-editorial-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
            Preserve Indian heritage as you travel.
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Every monument you explore, story you bookmark, and artisan workshop you support unlocks verified digital heritage badges on your cultural passport.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => setActiveTab('profile')}
              className="py-3 px-5 bg-heritage-red hover:bg-heritage-deepRed text-white text-xs font-semibold rounded-xl shadow-card transition-all"
            >
              View Your Cultural Passport
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all"
            >
              Contribute a Story
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
