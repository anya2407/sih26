import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CITIES_DATA } from '../data/citiesData';
import { MOCK_HERITAGE } from '../data/mockHeritage';
import { MOCK_STORIES } from '../data/mockStories';
import confetti from 'canvas-confetti';

const HeritageContext = createContext(null);

export const HeritageProvider = ({ children }) => {
  // Location & Onboarding State
  const [selectedCityId, setSelectedCityId] = useState(() => {
    const savedCityId = localStorage.getItem('virasat_selected_city');
    return CITIES_DATA.some(city => city.id === savedCityId) ? savedCityId : null;
  });
  const [isOnboarded, setIsOnboarded] = useState(() => {
    const savedCityId = localStorage.getItem('virasat_selected_city');
    const hasValidSavedCity = CITIES_DATA.some(city => city.id === savedCityId);

    // Older builds persisted only this flag, which made a stale value reopen the
    // Jaipur dashboard. A completed onboarding now requires a saved destination.
    return localStorage.getItem('virasat_onboarded') === 'true' && hasValidSavedCity;
  });
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(() => {
    const savedCityId = localStorage.getItem('virasat_selected_city');
    const hasValidSavedCity = CITIES_DATA.some(city => city.id === savedCityId);
    return !(localStorage.getItem('virasat_onboarded') === 'true' && hasValidSavedCity);
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'guide' | 'community' | 'recommendations' | 'culture' | 'map' | 'profile'
  
  // Detail Views & Modals
  const [selectedMonumentId, setSelectedMonumentId] = useState('amber-fort');
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);

  // Bookmarks & Engagement
  const [savedHeritageIds, setSavedHeritageIds] = useState(() => {
    try {
      const saved = localStorage.getItem('virasat_saved_heritage');
      return saved ? JSON.parse(saved) : ['amber-fort', 'blue-pottery'];
    } catch {
      return ['amber-fort', 'blue-pottery'];
    }
  });

  const [savedStoryIds, setSavedStoryIds] = useState(() => {
    try {
      const saved = localStorage.getItem('virasat_saved_stories');
      return saved ? JSON.parse(saved) : ['story-1', 'story-3'];
    } catch {
      return ['story-1', 'story-3'];
    }
  });

  const [upvotedStoryIds, setUpvotedStoryIds] = useState(() => {
    try {
      const saved = localStorage.getItem('virasat_upvoted_stories');
      return saved ? JSON.parse(saved) : ['story-1'];
    } catch {
      return ['story-1'];
    }
  });

  // User Cultural Passport Stats
  const [userPassport, setUserPassport] = useState({
    name: 'Yashasvi Ranjan',
    levelTitle: 'Senior Heritage Connoisseur',
    level: 3,
    xp: 840,
    nextLevelXp: 1000,
    monumentsExplored: 7,
    storiesShared: 2,
    audioMinutesListened: 48,
    badges: [
      { id: 'b1', name: 'Pink City Scholar', icon: '🏛️', date: 'Earned Aug 2026', description: 'Explored 4 historical monuments in Jaipur' },
      { id: 'b2', name: 'Textile Patron', icon: '🧵', date: 'Earned Aug 2026', description: 'Discovered Bandhani & Sanganer crafts' },
      { id: 'b3', name: 'Oral Historian', icon: '🎙️', date: 'Earned Aug 2026', description: 'Listened to 30+ minutes of AI Voice heritage guides' },
      { id: 'b4', name: 'Astronomy Seeker', icon: '✨', date: 'Earned Aug 2026', description: 'Completed Jantar Mantar celestial tour' }
    ]
  });

  // AI Voice Guide State
  const [guideState, setGuideState] = useState({
    isPlaying: false,
    isListening: false,
    isSpeaking: false,
    monumentId: 'amber-fort',
    currentPoiId: 'suraj-pol',
    progressSeconds: 0,
    totalSeconds: 200,
    isMiniPlayerVisible: false,
    speechRate: 1.0,
    guideVoiceGender: 'female' // 'female' | 'male'
  });

  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('virasat_onboarded', isOnboarded ? 'true' : 'false');
  }, [isOnboarded]);

  useEffect(() => {
    if (selectedCityId) {
      localStorage.setItem('virasat_selected_city', selectedCityId);
    }
  }, [selectedCityId]);

  useEffect(() => {
    localStorage.setItem('virasat_saved_heritage', JSON.stringify(savedHeritageIds));
  }, [savedHeritageIds]);

  useEffect(() => {
    localStorage.setItem('virasat_saved_stories', JSON.stringify(savedStoryIds));
  }, [savedStoryIds]);

  useEffect(() => {
    localStorage.setItem('virasat_upvoted_stories', JSON.stringify(upvotedStoryIds));
  }, [upvotedStoryIds]);

  // Current City Object
  const currentCity = CITIES_DATA.find(c => c.id === selectedCityId) || CITIES_DATA[0];

  // Current Monument Object
  const currentMonument = MOCK_HERITAGE.find(m => m.id === selectedMonumentId) || MOCK_HERITAGE[0];

  // Show Toast helper
  const showToast = useCallback((text, type = 'info') => {
    setToastMessage({ text, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Complete Onboarding
  const completeOnboarding = (cityId) => {
    if (!CITIES_DATA.some(city => city.id === cityId)) return;
    setSelectedCityId(cityId);
    setIsOnboarded(true);
    showToast(`Welcome to ${cityId.charAt(0).toUpperCase() + cityId.slice(1)}. Exploring cultural heritage around you.`, 'success');
  };

  // Switch City
  const setCity = (cityId) => {
    setSelectedCityId(cityId);
    const city = CITIES_DATA.find(c => c.id === cityId);
    if (city) {
      // Find first monument of that city if available
      const firstMon = MOCK_HERITAGE.find(m => m.cityId === cityId);
      if (firstMon) {
        setSelectedMonumentId(firstMon.id);
      }
      showToast(`Location switched to ${city.name}, ${city.state}`, 'info');
    }
  };

  // Open Monument Detail
  const openMonumentDetail = (monumentId) => {
    setSelectedMonumentId(monumentId);
    setIsDetailViewOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeMonumentDetail = () => {
    setIsDetailViewOpen(false);
  };

  // Start Audio Guide
  const startAudioGuide = (monumentId = 'amber-fort', poiId = null) => {
    setSelectedMonumentId(monumentId);
    const mon = MOCK_HERITAGE.find(m => m.id === monumentId) || MOCK_HERITAGE[0];
    const initialPoi = poiId || (mon.pointsOfInterest && mon.pointsOfInterest[0]?.id) || 'poi-1';

    setGuideState(prev => ({
      ...prev,
      isPlaying: true,
      isSpeaking: true,
      monumentId: monumentId,
      currentPoiId: initialPoi,
      isMiniPlayerVisible: true
    }));

    setActiveTab('guide');
    setIsDetailViewOpen(false);
    showToast(`AI Heritage Voice Guide active for ${mon.name}`, 'success');

    // Trigger browser Web Speech API narration if supported
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const poi = mon.pointsOfInterest.find(p => p.id === initialPoi);
      const textToSpeak = poi ? poi.narration : mon.audioGuideScript;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      
      utterance.onend = () => {
        setGuideState(p => ({ ...p, isSpeaking: false }));
      };
      
      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
      }
    }
  };

  const toggleAudioPlayback = () => {
    setGuideState(prev => {
      const nextPlaying = !prev.isPlaying;
      if (!nextPlaying && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      } else if (nextPlaying && 'speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }
      return {
        ...prev,
        isPlaying: nextPlaying,
        isSpeaking: nextPlaying
      };
    });
  };

  const stopAudioGuide = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setGuideState(prev => ({
      ...prev,
      isPlaying: false,
      isSpeaking: false,
      isMiniPlayerVisible: false
    }));
  };

  // Toggle Save Heritage
  const toggleSaveHeritage = (id) => {
    setSavedHeritageIds(prev => {
      const isSaved = prev.includes(id);
      if (isSaved) {
        showToast('Removed from your saved cultural collection', 'info');
        return prev.filter(item => item !== id);
      } else {
        // Fire celebratory subtle confetti
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.85 },
          colors: ['#9E1B32', '#C5A059', '#7F1628', '#FAF9F6']
        });
        showToast('Added to your saved cultural collection', 'success');
        return [...prev, id];
      }
    });
  };

  // Toggle Save Story
  const toggleSaveStory = (id) => {
    setSavedStoryIds(prev => {
      const isSaved = prev.includes(id);
      if (isSaved) {
        showToast('Story removed from saved archives', 'info');
        return prev.filter(item => item !== id);
      } else {
        showToast('Story saved to your personal cultural archive', 'success');
        return [...prev, id];
      }
    });
  };

  // Toggle Upvote Story
  const toggleUpvoteStory = (id) => {
    setUpvotedStoryIds(prev => {
      const isUpvoted = prev.includes(id);
      if (isUpvoted) {
        return prev.filter(item => item !== id);
      } else {
        showToast('Marked story as culturally helpful', 'success');
        return [...prev, id];
      }
    });
  };

  return (
    <HeritageContext.Provider
      value={{
        // Location
        isOnboarded,
        completeOnboarding,
        selectedCityId,
        currentCity,
        setCity,
        isLocationPickerOpen,
        setIsLocationPickerOpen,

        // Navigation
        activeTab,
        setActiveTab,

        // Detail views & Modals
        selectedMonumentId,
        currentMonument,
        isDetailViewOpen,
        openMonumentDetail,
        closeMonumentDetail,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isContributeModalOpen,
        setIsContributeModalOpen,

        // Bookmarks & Community
        savedHeritageIds,
        savedStoryIds,
        upvotedStoryIds,
        toggleSaveHeritage,
        toggleSaveStory,
        toggleUpvoteStory,
        userPassport,

        // AI Guide
        guideState,
        setGuideState,
        startAudioGuide,
        toggleAudioPlayback,
        stopAudioGuide,

        // Notifications
        toastMessage,
        showToast
      }}
    >
      {children}
    </HeritageContext.Provider>
  );
};

export const useHeritage = () => {
  const context = useContext(HeritageContext);
  if (!context) {
    throw new Error('useHeritage must be used within a HeritageProvider');
  }
  return context;
};
