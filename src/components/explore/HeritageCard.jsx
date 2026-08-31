import React from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { Bookmark, Headphones, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

export const HeritageCard = ({ monument, isFeatured = false }) => {
  const { 
    openMonumentDetail, 
    startAudioGuide, 
    savedHeritageIds, 
    toggleSaveHeritage 
  } = useHeritage();

  const isSaved = savedHeritageIds.includes(monument.id);

  const handleCardClick = () => {
    openMonumentDetail(monument.id);
  };

  const handleAudioGuideClick = (e) => {
    e.stopPropagation();
    startAudioGuide(monument.id);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    toggleSaveHeritage(monument.id);
  };

  if (isFeatured) {
    return (
      <div 
        onClick={handleCardClick}
        className="group relative bg-white rounded-3xl overflow-hidden border border-heritage-border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
      >
        {/* Featured Image */}
        <div className="lg:col-span-7 relative h-72 lg:h-96 overflow-hidden">
          <img
            src={monument.heroImage}
            alt={monument.name}
            className="w-full h-full object-cover card-image-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge variant="red" size="sm" className="bg-white/95 text-heritage-red font-bold backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-heritage-red" />
              Featured Monument
            </Badge>
            {monument.unesco && (
              <Badge variant="gold" size="sm" className="backdrop-blur-md font-semibold">
                UNESCO Heritage
              </Badge>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
              {monument.era}
            </span>
            <h3 className="font-editorial-heading font-bold text-2xl lg:text-3xl leading-tight mt-1">
              {monument.name}
            </h3>
          </div>
        </div>

        {/* Featured Details */}
        <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between text-xs text-heritage-textMuted mb-2">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-heritage-red" />
                {monument.distanceKm} km away · {monument.locationName}
              </span>
              <button
                onClick={handleSaveClick}
                className={`p-2 rounded-full border transition-all ${
                  isSaved
                    ? 'bg-red-50 text-heritage-red border-red-200'
                    : 'text-heritage-textMuted hover:text-heritage-textDark border-heritage-border hover:bg-heritage-bg'
                }`}
                title={isSaved ? 'Saved' : 'Save Monument'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-heritage-red text-heritage-red' : ''}`} />
              </button>
            </div>

            <p className="text-sm text-heritage-textMuted line-clamp-3 mt-3 leading-relaxed">
              {monument.overview}
            </p>

            <div className="mt-4 p-3 bg-heritage-bg rounded-xl border border-heritage-border/70 text-xs">
              <p className="font-semibold text-heritage-textDark">Key Architectural Wonder:</p>
              <p className="text-heritage-textMuted mt-0.5 line-clamp-2">
                {monument.architectureDetails.notableFeatures[0]}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleAudioGuideClick}
              className="flex-1 py-3 px-4 bg-heritage-red hover:bg-heritage-deepRed text-white font-semibold text-xs rounded-xl shadow-subtle flex items-center justify-center gap-2 transition-all group/btn"
            >
              <Headphones className="w-4 h-4" />
              <span>Start AI Voice Guide</span>
            </button>
            
            <button
              onClick={handleCardClick}
              className="py-3 px-4 bg-heritage-bg hover:bg-heritage-beige text-heritage-textDark font-semibold text-xs rounded-xl border border-heritage-border flex items-center gap-1.5 transition-all"
            >
              <span>Explore Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden border border-heritage-border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Card Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={monument.heroImage}
          alt={monument.name}
          className="w-full h-full object-cover card-image-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {monument.unesco ? (
            <Badge variant="gold" size="xs" className="backdrop-blur-md">
              UNESCO
            </Badge>
          ) : (
            <Badge variant="default" size="xs" className="bg-white/90 backdrop-blur-md">
              {monument.category}
            </Badge>
          )}

          <button
            onClick={handleSaveClick}
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
          <p className="text-[10px] text-white/80 font-medium uppercase tracking-wider">
            {monument.era}
          </p>
          <h4 className="font-editorial-heading font-bold text-lg text-white leading-tight">
            {monument.name}
          </h4>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-xs text-heritage-textMuted mb-2">
            <span className="flex items-center gap-1 font-medium truncate max-w-[170px]">
              <MapPin className="w-3 h-3 text-heritage-red flex-shrink-0" />
              {monument.distanceKm} km away
            </span>
            <span className="text-[11px] font-semibold text-heritage-textDark">
              {monument.hours.split(',')[0]}
            </span>
          </div>

          <p className="text-xs text-heritage-textMuted line-clamp-2 leading-relaxed">
            {monument.overview}
          </p>
        </div>

        {/* Bottom Action Footer */}
        <div className="mt-4 pt-3 border-t border-heritage-border/70 flex items-center justify-between">
          <button
            onClick={handleAudioGuideClick}
            className="flex items-center gap-1.5 text-xs font-semibold text-heritage-red hover:text-heritage-deepRed group-hover:underline"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>AI Voice Guide</span>
          </button>

          <span className="text-xs text-heritage-textMuted group-hover:text-heritage-textDark flex items-center gap-0.5 font-medium">
            Explore <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
