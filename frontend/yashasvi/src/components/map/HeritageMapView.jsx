import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { MOCK_HERITAGE } from '../../data/mockHeritage';
import { MOCK_RECOMMENDATIONS } from '../../data/mockRecommendations';
import { 
  MapPin, 
  Layers, 
  Compass, 
  Sparkles, 
  Navigation, 
  ArrowUpRight, 
  Headphones, 
  X,
  Filter
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const HeritageMapView = () => {
  const { 
    currentCity, 
    openMonumentDetail, 
    startAudioGuide, 
    showToast 
  } = useHeritage();

  const [activeLayer, setActiveLayer] = useState('All'); // 'All' | 'Monuments' | 'Crafts' | 'Food' | 'Events'
  const [selectedPin, setSelectedPin] = useState(null);
  const [activeRadius, setActiveRadius] = useState('15 km');

  // Prepare map pins from monuments and recommendations
  const monuments = MOCK_HERITAGE.filter(m => m.cityId === currentCity.id).map(m => ({
    id: m.id,
    type: 'Monuments',
    title: m.name,
    subtitle: m.category,
    distance: `${m.distanceKm} km`,
    image: m.heroImage,
    description: m.overview,
    icon: '🏛️',
    coords: m.coordinates,
    isMonument: true,
    pos: { top: '32%', left: '44%' }
  }));

  const recommendations = MOCK_RECOMMENDATIONS.filter(r => r.cityId === currentCity.id || r.cityId === 'jaipur').map(r => ({
    id: r.id,
    type: r.category,
    title: r.name,
    subtitle: r.location,
    distance: `${r.distanceKm} km`,
    image: r.image,
    description: r.description,
    icon: r.category === 'Food' ? '🍲' : r.category === 'Crafts' ? '🎨' : r.category === 'Music' ? '🎵' : '🎪',
    isMonument: false,
    pos: r.category === 'Food' ? { top: '58%', left: '38%' } : r.category === 'Crafts' ? { top: '42%', left: '68%' } : { top: '65%', left: '60%' }
  }));

  const allPins = [...monuments, ...recommendations];

  const filteredPins = activeLayer === 'All'
    ? allPins
    : allPins.filter(p => p.type === activeLayer);

  const handlePinClick = (pin) => {
    setSelectedPin(pin);
    showToast(`Selected marker: ${pin.title}`, 'info');
  };

  const handleExplorePin = (pin) => {
    if (pin.isMonument) {
      openMonumentDetail(pin.id);
    } else {
      showToast(`Opening details for ${pin.title}`, 'info');
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* Map Control Header Bar */}
      <section className="bg-white p-4 sm:p-6 rounded-3xl border border-heritage-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-red">
              Location-Aware Discovery
            </span>
            <Badge variant="emerald" size="xs">
              Live Simulated Cartography
            </Badge>
          </div>
          <h2 className="font-editorial-heading font-bold text-xl sm:text-2xl text-heritage-textDark mt-1">
            Heritage Cartography · {currentCity.name}
          </h2>
        </div>

        {/* Radius Selector */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-heritage-textMuted">Radius:</span>
          {['5 km', '15 km', '30 km'].map((rad) => (
            <button
              key={rad}
              onClick={() => setActiveRadius(rad)}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                activeRadius === rad
                  ? 'bg-heritage-red text-white border-heritage-red shadow-subtle'
                  : 'bg-heritage-bg hover:bg-heritage-beige text-heritage-textDark border-heritage-border'
              }`}
            >
              {rad}
            </button>
          ))}
        </div>
      </section>

      {/* Layer Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['All', 'Monuments', 'Crafts', 'Food', 'Events'].map((layer) => {
          const isSelected = activeLayer === layer;
          return (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isSelected
                  ? 'bg-heritage-red text-white border-heritage-red shadow-subtle'
                  : 'bg-white hover:bg-heritage-beige text-heritage-textDark border-heritage-border'
              }`}
            >
              {layer}
            </button>
          );
        })}
      </div>

      {/* Large Interactive Map Canvas Area */}
      <div className="relative bg-[#F4EFE6] rounded-3xl h-[520px] sm:h-[580px] overflow-hidden border border-heritage-border shadow-card flex flex-col justify-between p-6">
        
        {/* Background Architectural Vector Grid & Concentric Rings */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cartoGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#9E1B32" strokeWidth="0.5" strokeDasharray="3,5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cartoGrid)" />
            <circle cx="50%" cy="50%" r="120" fill="none" stroke="#9E1B32" strokeWidth="1" strokeDasharray="4,4" />
            <circle cx="50%" cy="50%" r="240" fill="none" stroke="#9E1B32" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="50%" cy="50%" r="360" fill="none" stroke="#9E1B32" strokeWidth="1" strokeOpacity="0.2" />
          </svg>
        </div>

        {/* Center User Location Radar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
          <div className="w-8 h-8 rounded-full bg-heritage-red/20 animate-ping absolute" />
          <div className="w-6 h-6 rounded-full bg-heritage-red border-2 border-white shadow-glow-red flex items-center justify-center text-white text-[10px]">
            📍
          </div>
          <span className="mt-1 bg-white/90 px-2 py-0.5 rounded-full text-[10px] font-bold text-heritage-textDark shadow-subtle">
            You Are Here
          </span>
        </div>

        {/* Interactive Custom Markers */}
        <div className="absolute inset-0 z-20">
          {filteredPins.map((pin) => {
            const isSelected = selectedPin?.id === pin.id;

            return (
              <div
                key={pin.id}
                style={pin.pos}
                onClick={() => handlePinClick(pin)}
                className={`absolute cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 group ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                }`}
              >
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-card border transition-all ${
                  isSelected
                    ? 'bg-heritage-red text-white border-heritage-red shadow-glow-red'
                    : 'bg-white hover:bg-heritage-bg text-heritage-textDark border-heritage-border'
                }`}>
                  <span>{pin.icon}</span>
                  <span className="text-xs font-bold whitespace-nowrap max-w-[130px] truncate">
                    {pin.title}
                  </span>
                  <span className={`text-[10px] font-medium ${isSelected ? 'text-white/80' : 'text-heritage-textMuted'}`}>
                    · {pin.distance}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Floating Mini Legend */}
        <div className="relative z-30 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-heritage-border shadow-subtle text-[11px] font-medium text-heritage-textDark self-start">
          <Compass className="w-3.5 h-3.5 text-heritage-red" />
          <span>Click any marker to inspect heritage dossier</span>
        </div>

        {/* Bottom Sliding Information Card Preview on Pin Click */}
        {selectedPin && (
          <div className="relative z-30 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-modal border border-heritage-border max-w-lg animate-fade-in flex flex-col sm:flex-row items-center gap-4">
            <img
              src={selectedPin.image}
              alt={selectedPin.title}
              className="w-full sm:w-28 h-24 rounded-xl object-cover border border-heritage-border flex-shrink-0"
            />
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-heritage-red uppercase tracking-wider">
                  {selectedPin.type} · {selectedPin.distance}
                </span>
                <button
                  onClick={() => setSelectedPin(null)}
                  className="p-1 text-heritage-textMuted hover:text-heritage-textDark"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h4 className="font-editorial-heading font-bold text-base text-heritage-textDark mt-0.5 truncate">
                {selectedPin.title}
              </h4>
              <p className="text-xs text-heritage-textMuted line-clamp-2 mt-1">
                {selectedPin.description}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => handleExplorePin(selectedPin)}
                  className="py-1.5 px-3 bg-heritage-red hover:bg-heritage-deepRed text-white text-xs font-semibold rounded-lg shadow-subtle transition-all flex items-center gap-1"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {selectedPin.isMonument && (
                  <button
                    onClick={() => startAudioGuide(selectedPin.id)}
                    className="py-1.5 px-3 bg-heritage-bg hover:bg-heritage-beige text-heritage-textDark text-xs font-semibold rounded-lg border border-heritage-border transition-all flex items-center gap-1"
                  >
                    <Headphones className="w-3.5 h-3.5 text-heritage-red" />
                    <span>AI Voice Guide</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
