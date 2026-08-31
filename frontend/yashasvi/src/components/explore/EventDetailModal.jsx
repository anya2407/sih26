import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeritage } from '../../context/HeritageContext';
import { 
  X, 
  Calendar, 
  MapPin, 
  Star, 
  Share2, 
  Bookmark, 
  CheckCircle2, 
  Ticket, 
  Compass, 
  Users,
  Clock
} from 'lucide-react';
import { Badge } from '../common/Badge';
import confetti from 'canvas-confetti';

export const EventDetailModal = ({ isOpen, onClose, event }) => {
  const navigate = useNavigate();
  const { showToast, savedHeritageIds, toggleSaveHeritage } = useHeritage();
  const [isReserved, setIsReserved] = useState(false);

  if (!isOpen || !event) return null;

  const isSaved = savedHeritageIds.includes(event.id);

  const handleReserve = () => {
    setIsReserved(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#9E1B32', '#C5A059', '#171717']
    });
    showToast(`Complimentary Cultural Pass reserved for "${event.name}"!`, 'success');
  };

  const handleViewOnMap = () => {
    onClose();
    navigate('/Map');
    showToast(`Locating ${event.name} on Discovery Map`, 'info');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Event link copied to clipboard', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-modal border border-heritage-border overflow-hidden max-h-[90vh] flex flex-col justify-between">
        
        {/* Modal Header & Hero Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden flex-shrink-0">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <Badge variant="gold" size="xs" className="backdrop-blur-md font-semibold">
              {event.reasonTag || 'Live Heritage Experience'}
            </Badge>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 bg-white/90 hover:bg-white text-heritage-textDark rounded-xl backdrop-blur-md transition-colors shadow-subtle cursor-pointer"
                title="Share Event"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleSaveHeritage(event.id)}
                className={`p-2 rounded-xl backdrop-blur-md transition-colors shadow-subtle cursor-pointer ${
                  isSaved
                    ? 'bg-heritage-red text-white'
                    : 'bg-white/90 hover:bg-white text-heritage-textDark'
                }`}
                title="Save Event"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2 bg-white/90 hover:bg-white text-heritage-textDark rounded-xl backdrop-blur-md transition-colors shadow-subtle cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold">
                {event.category}
              </span>
              <span className="text-white/60">•</span>
              <span className="text-xs text-amber-300 flex items-center gap-1 font-semibold">
                <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                {event.rating} ({event.reviewsCount} reviews)
              </span>
            </div>
            <h2 className="font-editorial-heading font-bold text-xl sm:text-2xl text-white leading-tight">
              {event.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Key Event Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-heritage-bg rounded-2xl border border-heritage-border text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-heritage-red flex-shrink-0" />
              <div>
                <p className="text-[10px] text-heritage-textMuted font-medium uppercase">Venue</p>
                <p className="font-semibold text-heritage-textDark truncate">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-heritage-red flex-shrink-0" />
              <div>
                <p className="text-[10px] text-heritage-textMuted font-medium uppercase">Proximity</p>
                <p className="font-semibold text-heritage-textDark">{event.distanceKm} km away</p>
              </div>
            </div>

            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Ticket className="w-4 h-4 text-heritage-red flex-shrink-0" />
              <div>
                <p className="text-[10px] text-heritage-textMuted font-medium uppercase">Entry</p>
                <p className="font-semibold text-emerald-700">Open Access / RSVP</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-heritage-textMuted mb-1.5">
              Experience Dossier & Heritage Narrative
            </h4>
            <p className="text-xs sm:text-sm text-heritage-textDark leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Tags */}
          {event.tags && (
            <div className="flex flex-wrap gap-1.5">
              {event.tags.map((t, idx) => (
                <span key={idx} className="text-xs bg-heritage-beige text-heritage-textDark px-2.5 py-1 rounded-lg border border-heritage-border font-medium">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Reservation Confirmation Notice if Reserved */}
          {isReserved && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="font-bold">Pass Confirmed & Added to Your Cultural Passport!</p>
                <p className="text-emerald-700 text-[11px] mt-0.5">Present this confirmation at the venue for expedited priority entry.</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 sm:p-6 bg-heritage-bg/60 border-t border-heritage-border flex items-center justify-between gap-3">
          <button
            onClick={handleViewOnMap}
            className="py-3 px-4 bg-white hover:bg-heritage-beige text-heritage-textDark text-xs font-semibold rounded-xl border border-heritage-border flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-heritage-red" />
            <span>Show on Discovery Map</span>
          </button>

          <button
            onClick={handleReserve}
            disabled={isReserved}
            className={`py-3 px-6 rounded-xl text-xs font-semibold transition-all shadow-subtle flex items-center gap-2 cursor-pointer ${
              isReserved
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-heritage-red hover:bg-heritage-deepRed text-white'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>{isReserved ? 'Pass Reserved' : 'Reserve Complimentary Pass'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
