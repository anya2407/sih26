import React from 'react';
import { Calendar, MapPin, Ticket, ArrowUpRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const EventCard = ({ event }) => {
  return (
    <div className="group bg-white p-5 rounded-2xl border border-heritage-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs text-heritage-textMuted mb-2">
          <Badge variant="red" size="xs">
            {event.reasonTag || 'Upcoming Festival'}
          </Badge>
          <span className="flex items-center gap-1 font-semibold text-heritage-textDark">
            <Ticket className="w-3.5 h-3.5 text-heritage-red" />
            ★ {event.rating}
          </span>
        </div>

        <h4 className="font-editorial-heading font-bold text-base text-heritage-textDark group-hover:text-heritage-red transition-colors leading-snug">
          {event.name}
        </h4>

        <p className="text-xs text-heritage-textMuted mt-2 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        <div className="mt-4 space-y-1.5 text-xs text-heritage-textDark font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-heritage-red flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-heritage-textMuted">
            <Calendar className="w-3.5 h-3.5 text-heritage-gold flex-shrink-0" />
            <span>This Weekend · Guided Walk</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-heritage-border/70 flex items-center justify-between">
        <span className="text-[11px] font-bold text-heritage-red">
          {event.distanceKm} km from current location
        </span>
        <button className="flex items-center gap-1 text-xs font-semibold text-heritage-textDark group-hover:text-heritage-red transition-colors">
          <span>Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
