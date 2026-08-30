import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { MOCK_RECOMMENDATIONS } from '../../data/mockRecommendations';
import { 
  Sparkles, 
  MapPin, 
  Star, 
  ArrowUpRight, 
  Bookmark, 
  Layers, 
  Compass, 
  Calendar 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const RecommendationsView = () => {
  const { 
    currentCity, 
    openMonumentDetail, 
    savedHeritageIds, 
    toggleSaveHeritage, 
    setActiveTab,
    showToast 
  } = useHeritage();

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Places', 'Food', 'Crafts', 'Textiles', 'Music', 'Events'];

  const filteredRecs = selectedCategory === 'All'
    ? MOCK_RECOMMENDATIONS
    : MOCK_RECOMMENDATIONS.filter(r => r.category === selectedCategory);

  const handleExploreAction = (rec) => {
    if (rec.category === 'Places') {
      openMonumentDetail('amber-fort');
    } else if (rec.category === 'Crafts' || rec.category === 'Textiles' || rec.category === 'Music') {
      setActiveTab('culture');
    } else {
      showToast(`Viewing details for ${rec.name}`, 'info');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fade-in">
      
      {/* 1. Header Banner */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl border border-heritage-border shadow-card">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-heritage-red border border-red-200 rounded-full text-xs font-bold shadow-subtle mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cultural Intelligence Personalization Engine</span>
        </div>

        <h1 className="font-editorial-heading font-bold text-2xl sm:text-4xl text-heritage-textDark leading-tight">
          Curated for you in <span className="text-heritage-red italic font-editorial-serif font-normal">{currentCity.name}</span>
        </h1>

        <p className="mt-2 text-xs sm:text-base text-heritage-textMuted max-w-2xl leading-relaxed">
          Unique cultural experiences, authentic artisan workshops, heirloom culinary masters, and musical evenings tailored to your journey.
        </p>

        {/* Personalized Insight Pill */}
        <div className="mt-5 p-3.5 bg-heritage-bg rounded-2xl border border-heritage-border flex items-center gap-3 text-xs text-heritage-textDark">
          <span className="text-heritage-red font-bold">✨ Curated Insight:</span>
          <span>Because you showed interest in royal Rajput architecture and handloom textiles, we weighted master artisan workshops and palace viewpoints higher.</span>
        </div>
      </section>

      {/* 2. Category Filter Tabs */}
      <section className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isSelected
                  ? 'bg-heritage-red text-white border-heritage-red shadow-subtle'
                  : 'bg-white hover:bg-heritage-beige text-heritage-textDark border-heritage-border'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </section>

      {/* 3. Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecs.map((rec) => {
          const isSaved = savedHeritageIds.includes(rec.id);

          return (
            <div
              key={rec.id}
              onClick={() => handleExploreAction(rec)}
              className="group bg-white rounded-3xl overflow-hidden border border-heritage-border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="w-full h-full object-cover card-image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Personalization Reason Tag */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <Badge variant="gold" size="xs" className="backdrop-blur-md font-semibold text-[10px] line-clamp-1 max-w-[210px]">
                    {rec.reasonTag}
                  </Badge>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveHeritage(rec.id);
                    }}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                      isSaved
                        ? 'bg-white text-heritage-red shadow-sm'
                        : 'bg-black/30 text-white hover:bg-white hover:text-heritage-textDark'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-heritage-red text-heritage-red' : ''}`} />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] text-white/80 font-medium uppercase tracking-wider">
                    {rec.category}
                  </span>
                  <h4 className="font-editorial-heading font-bold text-base text-white leading-tight">
                    {rec.name}
                  </h4>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs text-heritage-textMuted mb-2">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-heritage-red" />
                      {rec.distanceKm} km away
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-heritage-textDark">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {rec.rating} ({rec.reviewsCount})
                    </span>
                  </div>

                  <p className="text-xs text-heritage-textMuted line-clamp-2 leading-relaxed">
                    {rec.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {rec.tags?.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-heritage-bg text-heritage-textDark px-2 py-0.5 rounded-md border border-heritage-border">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-3 border-t border-heritage-border/70 flex items-center justify-between">
                  <span className="text-xs font-semibold text-heritage-textDark group-hover:text-heritage-red transition-colors">
                    Explore Experience
                  </span>
                  <div className="w-7 h-7 rounded-full bg-heritage-bg group-hover:bg-red-50 text-heritage-textDark group-hover:text-heritage-red flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
