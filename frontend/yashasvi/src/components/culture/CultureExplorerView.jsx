import React, { useState } from 'react';
import { CULTURAL_MOSAIC_CATEGORIES } from '../../data/mockCulture';
import { CultureDetailModal } from './CultureDetailModal';
import { Layers, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { Badge } from '../common/Badge';

export const CultureExplorerView = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl border border-heritage-border shadow-card">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-heritage-red border border-red-200 rounded-full text-xs font-bold shadow-subtle mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Pan-Indian Cultural Heritage Atlas</span>
        </div>

        <h1 className="font-editorial-heading font-bold text-2xl sm:text-4xl text-heritage-textDark leading-tight">
          The Living Indian <span className="text-heritage-red italic font-editorial-serif font-normal">Cultural Mosaic</span>
        </h1>

        <p className="mt-2 text-xs sm:text-base text-heritage-textMuted max-w-2xl leading-relaxed">
          From 5,000-year-old temple acoustics and Vedic geometry to master weaving looms, tribal earth art, and classical dance mudras.
        </p>
      </section>

      {/* Editorial Mosaic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CULTURAL_MOSAIC_CATEGORIES.map((category, index) => {
          const isLarge = index === 0 || index === 3;

          return (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`group bg-white rounded-3xl overflow-hidden border border-heritage-border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isLarge ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${isLarge ? 'h-64 sm:h-72' : 'h-52'}`}>
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover card-image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <Badge variant="gold" size="xs" className="backdrop-blur-md font-semibold">
                    {category.badge}
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-editorial-heading font-bold text-lg sm:text-2xl text-white leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <p className="text-xs text-heritage-textMuted line-clamp-2 leading-relaxed">
                  {category.description}
                </p>

                <div className="mt-4 pt-3 border-t border-heritage-border/70 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-heritage-textMuted">
                    <span>{category.featuredEntities.length} Master Traditions</span>
                  </div>

                  <span className="text-xs font-semibold text-heritage-red group-hover:underline flex items-center gap-1">
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
