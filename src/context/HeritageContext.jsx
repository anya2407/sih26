import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { CITIES_DATA } from '../data/citiesData';
import { MOCK_HERITAGE } from '../data/mockHeritage';
import { MOCK_STORIES } from '../data/mockStories';
import { getMonument, getLocation } from '../services/heritageApi';
import confetti from 'canvas-confetti';

const HeritageContext = createContext(null);

export const HeritageProvider = ({ children }) => {
  // 1. Dynamic Backend & Location State
  const [locationState, setLocationState] = useState({
    latitude: null,
    longitude: null,
    state: '',
    monumentName: '',
    pointsOfInterest: [],
    currentPointOfInterest: '',
    transcript: '',
    locationPermissionStatus: 'idle', // 'idle' | 'requesting' | 'granted' | 'denied' | 'error'
    isLocating: false,
    isGettingMonument: false,
    isGettingLocation: false,
    statusMessage: '',
    errorMessage: null,
    isLocationDetected: false
  });

  // Onboarding & manual picker state
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);

  // Navigation State
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' | 'explore' | 'community' | 'culture' | 'map' | 'profile'
  
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

  const [downvotedStoryIds, setDownvotedStoryIds] = useState(() => {
    try {
      const saved = localStorage.getItem('virasat_downvoted_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
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
      { id: 'b1', name: 'Pink City Scholar', icon: '🏛️', date: 'Earned Aug 2026', description: 'Explored 4 historical monuments in Rajasthan' },
      { id: 'b2', name: 'Textile Patron', icon: '🧵', date: 'Earned Aug 2026', description: 'Discovered Bandhani & Sanganer crafts' },
      { id: 'b3', name: 'Oral Historian', icon: '🎙️', date: 'Earned Aug 2026', description: 'Listened to AI Voice heritage guides' },
      { id: 'b4', name: 'Astronomy Seeker', icon: '✨', date: 'Earned Aug 2026', description: 'Completed celestial tour' }
    ]
  });

  // AI Voice Guide Playback State
  const [guideState, setGuideState] = useState({
    isPlaying: false,
    isListening: false,
    isSpeaking: false,
    progressSeconds: 0,
    totalSeconds: 200,
    isMiniPlayerVisible: false,
    speechRate: 0.95,
    guideVoiceGender: 'female'
  });

  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  // Show Toast helper
  const showToast = useCallback((text, type = 'info') => {
    setToastMessage({ text, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // 2. Request user GPS location and call /api/get-monument
  const requestUserLocation = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      setLocationState(prev => ({
        ...prev,
        locationPermissionStatus: 'error',
        errorMessage: 'Geolocation is not supported by your browser.',
        isLocating: false
      }));
      return;
    }

    setLocationState(prev => ({
      ...prev,
      isLocating: true,
      locationPermissionStatus: 'requesting',
      statusMessage: 'Requesting location...',
      errorMessage: null
    }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setLocationState(prev => ({
          ...prev,
          latitude,
          longitude,
          locationPermissionStatus: 'granted',
          isLocating: false,
          isGettingMonument: true,
          statusMessage: 'Identifying nearby heritage site...'
        }));

        try {
          const monumentData = await getMonument(latitude, longitude);

          setLocationState(prev => ({
            ...prev,
            latitude,
            longitude,
            state: monumentData.state,
            monumentName: monumentData.monumentName,
            pointsOfInterest: monumentData.pointsOfInterest,
            isGettingMonument: false,
            statusMessage: '',
            errorMessage: null,
            isLocationDetected: true
          }));

          setIsOnboarded(true);
          showToast(`Located at ${monumentData.monumentName}`, 'success');
        } catch (apiErr) {
          console.error('[HeritageContext] Failed to get monument from /api/get-monument:', apiErr);
          setLocationState(prev => ({
            ...prev,
            isGettingMonument: false,
            statusMessage: '',
            errorMessage: 'Unable to identify your heritage location. Please try again.'
          }));
        }
      },
      (geoError) => {
        console.warn('[HeritageContext] Geolocation error:', geoError);
        let errorMsg = 'Unable to access your location. Please allow location access to use the AI Heritage Guide.';
        let permStatus = 'error';

        if (geoError.code === 1) { // PERMISSION_DENIED
          permStatus = 'denied';
          errorMsg = 'Unable to access your location. Please allow location access to use the AI Heritage Guide.';
        } else if (geoError.code === 2) { // POSITION_UNAVAILABLE
          errorMsg = 'Location information is unavailable. Please check your GPS settings and try again.';
        } else if (geoError.code === 3) { // TIMEOUT
          errorMsg = 'Location request timed out. Please try again.';
        }

        setLocationState(prev => ({
          ...prev,
          isLocating: false,
          locationPermissionStatus: permStatus,
          statusMessage: '',
          errorMessage: errorMsg
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  }, [showToast]);

  // Initial prompt on website open
  useEffect(() => {
    requestUserLocation();
  }, [requestUserLocation]);

  // 3. "Guide Me" Action: Captures fresh GPS and calls /api/get-location
  const triggerGuideMe = useCallback(async () => {
    if (locationState.isGettingLocation) return;

    if (!('geolocation' in navigator)) {
      showToast('Geolocation is not supported by your browser.', 'error');
      return;
    }

    setLocationState(prev => ({
      ...prev,
      isGettingLocation: true,
      statusMessage: 'Finding your exact location...',
      errorMessage: null
    }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setLocationState(prev => ({
          ...prev,
          latitude,
          longitude,
          statusMessage: 'Preparing your heritage narration...'
        }));

        try {
          const locData = await getLocation(latitude, longitude);

          setLocationState(prev => ({
            ...prev,
            currentPointOfInterest: locData.currentLocation || prev.currentPointOfInterest,
            transcript: locData.transcript,
            isGettingLocation: false,
            statusMessage: ''
          }));

          // Trigger browser SpeechSynthesis narration immediately
          if (locData.transcript && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(locData.transcript);
            utterance.rate = 0.92;
            utterance.pitch = 1.0;

            utterance.onend = () => {
              setGuideState(p => ({ ...p, isPlaying: false, isSpeaking: false }));
            };

            utterance.onerror = (e) => {
              console.warn('Speech synthesis error:', e);
              setGuideState(p => ({ ...p, isPlaying: false, isSpeaking: false }));
            };

            window.speechSynthesis.speak(utterance);
          }

          setGuideState(prev => ({
            ...prev,
            isPlaying: true,
            isSpeaking: true,
            isMiniPlayerVisible: true
          }));

          showToast('AI Heritage Voice Guide active', 'success');
        } catch (apiErr) {
          console.error('[HeritageContext] Failed to get location narration from /api/get-location:', apiErr);
          setLocationState(prev => ({
            ...prev,
            isGettingLocation: false,
            statusMessage: '',
            errorMessage: 'Unable to prepare heritage narration. Please try again.'
          }));
          showToast('Unable to identify exact spot or narration.', 'error');
        }
      },
      (geoError) => {
        console.warn('[HeritageContext] Fresh GPS error during Guide Me:', geoError);
        setLocationState(prev => ({
          ...prev,
          isGettingLocation: false,
          statusMessage: '',
          errorMessage: 'Unable to capture current GPS coordinates.'
        }));
        showToast('Unable to capture current GPS coordinates.', 'error');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [locationState.isGettingLocation, showToast]);

  // Audio Playback Controls
  const toggleAudioPlayback = useCallback(() => {
    setGuideState(prev => {
      const nextPlaying = !prev.isPlaying;
      if ('speechSynthesis' in window) {
        if (!nextPlaying) {
          window.speechSynthesis.pause();
        } else {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          } else if (locationState.transcript) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(locationState.transcript);
            utterance.rate = 0.92;
            utterance.pitch = 1.0;
            utterance.onend = () => {
              setGuideState(p => ({ ...p, isPlaying: false, isSpeaking: false }));
            };
            window.speechSynthesis.speak(utterance);
          }
        }
      }
      return {
        ...prev,
        isPlaying: nextPlaying,
        isSpeaking: nextPlaying
      };
    });
  }, [locationState.transcript]);

  const stopAudioGuide = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setGuideState(prev => ({
      ...prev,
      isPlaying: false,
      isSpeaking: false,
      isMiniPlayerVisible: false
    }));
  }, []);

  // Start specific POI audio
  const startPoiAudio = useCallback((poi) => {
    if (!poi) return;
    const textToSpeak = poi.narration || poi.description || `${poi.name}`;

    setLocationState(prev => ({
      ...prev,
      currentPointOfInterest: poi.name
    }));

    setGuideState(prev => ({
      ...prev,
      isPlaying: true,
      isSpeaking: true,
      isMiniPlayerVisible: true
    }));

    if ('speechSynthesis' in window && textToSpeak) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        setGuideState(p => ({ ...p, isPlaying: false, isSpeaking: false }));
      };
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // 4. Synchronized Location Context for Derived Views
  const currentMonument = useMemo(() => {
    const matchingMock = MOCK_HERITAGE.find(m => 
      (locationState.monumentName && m.name.toLowerCase().includes(locationState.monumentName.toLowerCase())) ||
      (locationState.monumentName && locationState.monumentName.toLowerCase().includes(m.name.toLowerCase()))
    );

    if (locationState.monumentName) {
      return {
        id: matchingMock?.id || 'detected-monument',
        name: locationState.monumentName,
        state: locationState.state,
        locationName: locationState.state ? `${locationState.monumentName}, ${locationState.state}` : locationState.monumentName,
        pointsOfInterest: locationState.pointsOfInterest.length > 0 
          ? locationState.pointsOfInterest 
          : (matchingMock?.pointsOfInterest || []),
        audioGuideScript: locationState.transcript || matchingMock?.audioGuideScript || `Welcome to ${locationState.monumentName}.`,
        heroImage: matchingMock?.heroImage || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
        gallery: matchingMock?.gallery || [
          'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80'
        ],
        category: matchingMock?.category || 'Royal Fort & Heritage Monument',
        era: matchingMock?.era || 'Historic Architectural Wonder',
        overview: matchingMock?.overview || `${locationState.monumentName} is a celebrated heritage monument located in ${locationState.state || 'India'}.`,
        unesco: matchingMock?.unesco ?? true,
        unescoTitle: matchingMock?.unescoTitle || `${locationState.monumentName} Heritage Area`,
        entryFee: matchingMock?.entryFee || '₹100 (Indian Nationals) · ₹550 (Foreign Nationals)',
        hours: matchingMock?.hours || '8:00 AM – 5:30 PM',
        historyTimeline: matchingMock?.historyTimeline || [],
        architectureDetails: matchingMock?.architectureDetails || { style: 'Indo-Islamic and Rajput Heritage Architecture', materials: 'Sandstone and Marble', notableFeatures: [] },
        folkloreAndLegends: matchingMock?.folkloreAndLegends || []
      };
    }

    return matchingMock || MOCK_HERITAGE[0];
  }, [locationState.monumentName, locationState.state, locationState.pointsOfInterest, locationState.transcript]);

  const currentCity = useMemo(() => {
    const stateName = locationState.state || 'Rajasthan';
    const placeName = locationState.monumentName || stateName;
    const matchingCity = CITIES_DATA.find(c => 
      c.state.toLowerCase() === stateName.toLowerCase() || 
      c.name.toLowerCase() === placeName.toLowerCase()
    );

    return {
      id: matchingCity?.id || 'detected-location',
      name: locationState.monumentName || matchingCity?.name || 'Heritage Hub',
      state: locationState.state || matchingCity?.state || 'India',
      hindiName: matchingCity?.hindiName || 'विरासत',
      tagline: `Living Heritage & Architectural Wonders of ${locationState.state || 'India'}`,
      description: matchingCity?.description || `Explore historical monuments, living crafts, and cultural archives in ${locationState.state || 'India'}.`,
      coverImage: matchingCity?.coverImage || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
      heritageCount: locationState.pointsOfInterest.length || matchingCity?.heritageCount || 5,
      cultureCount: matchingCity?.cultureCount || 4,
      storiesCount: matchingCity?.storiesCount || 3,
      climate: matchingCity?.climate || 'Cultural Climate'
    };
  }, [locationState.state, locationState.monumentName, locationState.pointsOfInterest.length]);

  // Save / Bookmark helpers
  const toggleSaveHeritage = useCallback((id) => {
    setSavedHeritageIds(prev => {
      const isSaved = prev.includes(id);
      if (isSaved) {
        showToast('Removed from your saved cultural collection', 'info');
        return prev.filter(item => item !== id);
      } else {
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
  }, [showToast]);

  const toggleSaveStory = useCallback((id) => {
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
  }, [showToast]);

  const toggleUpvoteStory = useCallback((id) => {
    setUpvotedStoryIds(prev => {
      const isUpvoted = prev.includes(id);
      if (isUpvoted) {
        return prev.filter(item => item !== id);
      } else {
        setDownvotedStoryIds(downvotes => downvotes.filter(item => item !== id));
        showToast('Marked story as culturally helpful', 'success');
        return [...prev, id];
      }
    });
  }, [showToast]);

  const toggleDownvoteStory = useCallback((id) => {
    setDownvotedStoryIds(prev => {
      const isDownvoted = prev.includes(id);
      if (isDownvoted) {
        return prev.filter(item => item !== id);
      }
      setUpvotedStoryIds(upvotes => upvotes.filter(item => item !== id));
      showToast('Marked story as less helpful', 'info');
      return [...prev, id];
    });
  }, [showToast]);

  // Detail View Controls
  const openMonumentDetail = useCallback((monumentId) => {
    setSelectedMonumentId(monumentId);
    setIsDetailViewOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeMonumentDetail = useCallback(() => {
    setIsDetailViewOpen(false);
  }, []);

  // Manual fallback city setter (e.g. from picker modal)
  const setCity = useCallback((cityId) => {
    const city = CITIES_DATA.find(c => c.id === cityId);
    if (city) {
      setLocationState(prev => ({
        ...prev,
        state: city.state,
        monumentName: city.name,
        isLocationDetected: true
      }));
      setIsOnboarded(true);
      showToast(`Selected region: ${city.name}, ${city.state}`, 'info');
    }
  }, [showToast]);

  const completeOnboarding = useCallback((cityId) => {
    setCity(cityId);
  }, [setCity]);

  // LocalStorage persistence for user bookmarks
  useEffect(() => {
    localStorage.setItem('virasat_saved_heritage', JSON.stringify(savedHeritageIds));
  }, [savedHeritageIds]);

  useEffect(() => {
    localStorage.setItem('virasat_saved_stories', JSON.stringify(savedStoryIds));
  }, [savedStoryIds]);

  useEffect(() => {
    localStorage.setItem('virasat_upvoted_stories', JSON.stringify(upvotedStoryIds));
  }, [upvotedStoryIds]);

  useEffect(() => {
    localStorage.setItem('virasat_downvoted_stories', JSON.stringify(downvotedStoryIds));
  }, [downvotedStoryIds]);

  return (
    <HeritageContext.Provider
      value={{
        // Dynamic Location & API state
        locationState,
        setLocationState,
        requestUserLocation,
        triggerGuideMe,
        startPoiAudio,

        // Onboarding & Location Selection
        isOnboarded,
        setIsOnboarded,
        completeOnboarding,
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
        downvotedStoryIds,
        toggleSaveHeritage,
        toggleSaveStory,
        toggleUpvoteStory,
        toggleDownvoteStory,
        userPassport,

        // Audio Guide Playback
        guideState,
        setGuideState,
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
