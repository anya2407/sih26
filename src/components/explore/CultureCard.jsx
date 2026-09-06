import React from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from '../common/Badge';

export const CultureCard = ({ culture }) => {
  const { setActiveTab } = useHeritage();

  return (
    <div 
      onClick={() => setActiveTab('culture')}
      className="group bg-white rounded-2xl overflow-hidden border border-heritage-border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={culture.image}
          alt={culture.name}
          className="w-full h-full object-cover card-image-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3">
          {culture.giTagged ? (
            <Badge variant="emerald" size="xs" className="backdrop-blur-md">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              GI Certified
            </Badge>
          ) : (
            <Badge variant="default" size="xs" className="bg-white/90">
              {culture.domain}
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-[10px] text-white/80 font-medium">{culture.domain}</p>
          <h4 className="font-editorial-heading font-bold text-base text-white leading-tight">
            {culture.name}
          </h4>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <p className="text-xs text-heritage-textMuted line-clamp-2 leading-relaxed">
          {culture.description}
        </p>

        {culture.artisanQuote && (
          <div className="mt-3 p-2.5 bg-heritage-bg rounded-xl border border-heritage-border/70 text-[11px] italic text-heritage-textDark">
            {culture.artisanQuote}
          </div>
        )}

        <div className="mt-4 pt-2.5 border-t border-heritage-border/70 flex items-center justify-between text-xs font-semibold text-heritage-red group-hover:text-heritage-deepRed">
          <span>Discover Tradition</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
