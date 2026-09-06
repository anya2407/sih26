import React, { useState } from 'react';
import { CULTURAL_MOSAIC_CATEGORIES } from '../../data/mockCulture';
import { CultureDetailModal } from './CultureDetailModal';
import { Layers, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { Badge } from '../common/Badge';

export const CultureExplorerView = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fade-in p-4 sm:p-8 rounded-3xl bg-teak-pattern border border-[#D4AA57]/20 shadow-2xl">
      
      {/* Header Banner */}
      <section className="bg-[#F5EDE0] p-6 sm:p-10 rounded-3xl border border-[#D4AA57]/30 shadow-card">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#C0392B]/10 text-[#C0392B] border border-[#C0392B]/20 rounded-full text-xs font-sans font-semibold shadow-subtle mb-3">
          <Layers className="w-3.5 h-3.5 text-[#C0392B]" />
          <span className="tracking-[0.18em]">✦ Pan-Indian Cultural Heritage Atlas ✦</span>
        </div>

        <h1 className="font-display font-bold text-2xl sm:text-4xl text-[#1A1209] leading-tight">
          The Living Indian <em className="text-[#C0392B] not-italic font-display">Cultural Mosaic</em>
        </h1>

        <p className="mt-2 text-xs sm:text-base text-[#7a6050] max-w-2xl font-serif leading-relaxed">
          From 5,000-year-old temple acoustics and Vedic geometry to master weaving looms, tribal earth art, and classical dance mudras.
        </p>
      </section>

      {/* Editorial Pinned Polaroid Mosaic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CULTURAL_MOSAIC_CATEGORIES.map((category, index) => {
          const isLarge = index === 0 || index === 3;
          const tilts = ["rotate(-1.5deg)", "rotate(1.2deg)", "rotate(-1deg)", "rotate(1.8deg)"];
          const tiltStyle = tilts[index % tilts.length];

          return (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              style={{ transform: tiltStyle, transformOrigin: "bottom center" }}
              className={`group relative bg-[#F5EDE0] p-3 pb-5 rounded-2xl border border-[#D4AA57]/30 shadow-card hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isLarge ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Paper Pin Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-[#C0392B] shadow-md border border-white/60" />

              <div className={`relative overflow-hidden rounded-xl ${isLarge ? 'h-64 sm:h-72' : 'h-52'}`}>
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover card-image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <Badge variant="gold" size="xs" className="backdrop-blur-md font-sans font-semibold">
                    {category.badge}
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-display font-bold text-lg sm:text-2xl text-white leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5 font-serif">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-3 pt-4 flex flex-col justify-between flex-1">
                <p className="text-xs font-serif text-[#6a5040] line-clamp-2 leading-relaxed">
                  {category.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#D4AA57]/30 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-sans text-[#7a6050]">
                    <span>✦ {category.featuredEntities.length} Master Traditions</span>
                  </div>

                  <span className="text-xs font-bodoni font-semibold text-[#C0392B] group-hover:underline flex items-center gap-1">
                    Explore Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Modal */}
      <CultureDetailModal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        category={selectedCategory}
      />

    </div>
  );
};
