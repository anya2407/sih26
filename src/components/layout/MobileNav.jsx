import React from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { Compass, Headphones, Users } from 'lucide-react';

export const MobileNav = () => {
  const { activeTab, setActiveTab, guideState, isDetailViewOpen, closeMonumentDetail } = useHeritage();

  const navItems = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'guide', label: 'AI Guide', icon: Headphones, showWave: guideState.isPlaying },
    { id: 'community', label: 'Community', icon: Users }
  ];

  const handleNavClick = (tabId) => {
    if (isDetailViewOpen) {
      closeMonumentDetail();
    }
    setActiveTab(tabId);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-heritage-border px-3 py-2 flex items-center justify-around shadow-modal">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id && !isDetailViewOpen;

        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex flex-1 flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors relative ${
              isActive ? 'text-heritage-red font-semibold' : 'text-heritage-textMuted hover:text-heritage-textDark'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.showWave && (
                <span className="absolute -top-1 -right-2">
                  <span className="w-2 h-2 rounded-full bg-heritage-red animate-ping inline-block" />
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
