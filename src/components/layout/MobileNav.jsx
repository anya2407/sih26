import React from 'react';
import { useHeritage } from '../../context/HeritageContext';

export const MobileNav = () => {
  const { 
    activeTab, 
    setActiveTab, 
    guideState, 
    isDetailViewOpen, 
    closeMonumentDetail,
    setIsLocationPickerOpen,
    signOut,
    savedHeritageIds,
    savedStoryIds
  } = useHeritage();

  const [open, setOpen] = React.useState(false);

  const totalSaved = savedHeritageIds.length + savedStoryIds.length;

  const navItems = [
    { id: 'explore', label: 'Explore', icon: '🧭' },
    { id: 'guide', label: 'AI Guide', icon: '🎙️', showWave: guideState.isPlaying },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'culture', label: 'Cultural Mosaic', icon: '🎨' },
    { id: 'map', label: 'Discovery Map', icon: '🗺️' },
    { id: 'profile', label: 'Cultural Passport', icon: '📜', badge: totalSaved > 0 ? totalSaved : null },
    { id: 'location_picker', label: 'Change Region', icon: '📍', isAction: true },
    { id: 'sign_out', label: 'Sign Out', icon: '🚪', isAction: true }
  ];

  const handleNavClick = (item) => {
    if (item.isAction) {
      if (item.id === 'location_picker') {
        setIsLocationPickerOpen(true);
      } else if (item.id === 'sign_out') {
        signOut();
      }
    } else {
      if (isDetailViewOpen) {
        closeMonumentDetail();
      }
      setActiveTab(item.id);
    }
    setOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#120d06]/65 backdrop-blur-md transition-opacity animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Floating nav stack + FAB */}
      <div
        className="fixed z-50 flex flex-col items-center gap-2.5 select-none"
        style={{ bottom: 24, left: '50%', transform: 'translateX(-50%)' }}
      >
        {/* Nav pills — rendered bottom-to-top */}
        {open &&
          [...navItems].reverse().map((item, idx) => {
            const isActive = activeTab === item.id && !isDetailViewOpen;
            const delay = (navItems.length - 1 - idx) * 0.03;
            const isSignOut = item.id === 'sign_out';
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="flex items-center gap-3 px-4 py-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  animation: `floatUp 0.22s cubic-bezier(0.34,1.56,0.64,1) ${delay}s both`,
                  backgroundColor: isSignOut ? '#4A0E00' : isActive ? '#C0392B' : '#1A1209',
                  border: isSignOut
                    ? '1.5px solid rgba(192,57,43,0.5)'
                    : isActive
                    ? '1.5px solid rgba(192,57,43,0.7)'
                    : '1.5px solid rgba(212,170,90,0.3)',
                  borderRadius: 999,
                  boxShadow: isActive
                    ? '0 6px 24px rgba(192,57,43,0.5), 0 2px 10px rgba(0,0,0,0.5)'
                    : '0 6px 24px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
                  color: isActive ? '#FFFFFF' : '#F8F3EC',
                  fontFamily: "'Lora', serif",
                  fontSize: '0.85rem',
                  minWidth: 180,
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: isSignOut
                      ? 'rgba(192,57,43,0.35)'
                      : isActive
                      ? 'rgba(255,255,255,0.22)'
                      : 'rgba(192,57,43,0.25)',
                    fontSize: 14,
                  }}
                >
                  {item.icon}
                </span>
                <span className="flex-1 text-left font-semibold">{item.label}</span>
                
                {/* Badge or Dot Indicator */}
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-[#E5A038] text-[#1A1209] text-[10px] font-sans font-bold shadow-sm">
                    {item.badge}
                  </span>
                )}
                {isActive && !item.badge && (
                  <span className="w-2 h-2 rounded-full flex-shrink-0 bg-white animate-pulse" />
                )}
              </button>
            );
          })}

        {/* Floating Center Trigger FAB Button (वि) */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
          style={{
            width: 58,
            height: 58,
            borderRadius: '50%',
            backgroundColor: open ? '#C0392B' : '#1A1209',
            border: `2.5px solid ${open ? 'rgba(212,170,90,0.8)' : '#C0392B'}`,
            fontFamily: "'Lora', serif",
            fontSize: open ? 18 : 17,
            fontWeight: 700,
            color: '#F8F3EC',
            boxShadow: open
              ? '0 0 0 8px rgba(192,57,43,0.2), 0 8px 30px rgba(192,57,43,0.6)'
              : '0 0 0 6px rgba(192,57,43,0.15), 0 6px 24px rgba(0,0,0,0.7)',
            transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          title="Toggle Navigation Menu"
        >
          {open ? '✕' : 'स्मृ'}
        </button>
      </div>
    </>
  );
};
