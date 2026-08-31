import React from 'react';
import { X, Sparkles, ShieldCheck, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const CultureDetailModal = ({ isOpen, onClose, category }) => {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-modal border border-heritage-border overflow-hidden max-h-[88vh] overflow-y-auto">
        
        {/* Modal Hero Banner */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <Badge variant="gold" size="xs" className="mb-2 backdrop-blur-md">
              {category.badge}
            </Badge>
            <h2 className="font-editorial-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
              {category.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              {category.subtitle}
            </p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-heritage-red mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Civilizational Importance & Lineage
            </h3>
            <p className="font-editorial-serif text-lg text-heritage-textDark leading-relaxed">
              {category.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-heritage-textMuted mb-3">
              Prominent Living Traditions & Masterpieces:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.featuredEntities?.map((entity, idx) => (
                <div key={idx} className="p-3.5 bg-heritage-bg rounded-2xl border border-heritage-border flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-50 text-heritage-red font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-xs text-heritage-textDark">{entity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-heritage-beige/60 rounded-2xl border border-heritage-border text-xs text-heritage-textDark space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-heritage-red">
              <ShieldCheck className="w-4 h-4" />
              Preservation & GI Tag Protections
            </p>
            <p className="text-heritage-textMuted leading-relaxed">
              These traditions are preserved through unbroken Guru-Shishya paramparas, government Geographical Indication registries, and national master artisan collectives.
            </p>
          </div>

          <div className="pt-2 border-t border-heritage-border flex justify-end">
            <button
              onClick={onClose}
              className="py-2.5 px-6 bg-heritage-red hover:bg-heritage-deepRed text-white text-xs font-bold rounded-xl transition-all"
            >
              Close Explorer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
