export const MOCK_HERITAGE = [
  {
    id: 'amber-fort',
    name: 'Amber Fort & Palace',
    hindiName: 'आमेर क़िला',
    cityId: 'jaipur',
    locationName: 'Amer, 11 km North of Jaipur, Rajasthan',
    category: 'Fort & Royal Palace',
    era: 'Late 16th Century (Kachwaha Dynasty)',
    yearBuilt: '1592 CE',
    builtBy: 'Raja Man Singh I (expanded by Mirza Raja Jai Singh & Sawai Jai Singh)',
    architect: 'Indo-Islamic and Rajput Imperial Master Guilds',
    unesco: true,
    unescoTitle: 'Hill Forts of Rajasthan UNESCO World Heritage Site',
    entryFee: '₹100 (Indian Nationals) · ₹550 (Foreign Nationals)',
    hours: '8:00 AM – 5:30 PM, 6:30 PM – 9:15 PM (Night Tourism)',
    distanceKm: 9.4,
    coordinates: { lat: 26.9855, lng: 75.8513 },
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603813354784-48f8691515bb?auto=format&fit=crop&w=1200&q=80'
    ],
    audioGuideLength: '18 min audio tour · 5 points of interest',
    audioGuideCurrentLocation: 'Near the Suraj Pol (Sun Gate) entrance',
    audioGuideScript: 'Welcome to Amber Fort, perched majestically atop the Cheel ka Teela hills. You are currently standing before Suraj Pol, the Sun Gate, so named because it faces east towards the rising dawn. Through this very gateway, victorious armies and royal processions entered the courtyard of Jaleb Chowk with trumpets and war drums. As you walk inside, notice how the yellow and pink sandstone reflects the desert light, merging Rajput grandeur with refined Mughal symmetry.',
    pointsOfInterest: [
      {
        id: 'suraj-pol',
        name: 'Suraj Pol (Sun Gate)',
        location: 'Eastern Entrance / Jaleb Chowk',
        audioTime: '00:00 - 03:20',
        description: 'The monumental royal entrance where returning kings and royal cavalry entered the fort facing the rising sun.',
        narration: 'You are standing near the eastern entrance of Amber Fort, the Suraj Pol. Built with red sandstone and lime mortar, its heavy wooden doors were reinforced with iron spikes to deter war elephants during siege warfare.'
      },
      {
        id: 'sheesh-mahal',
        name: 'Sheesh Mahal (Mirror Palace)',
        location: 'Third Courtyard / Jai Mandir',
        audioTime: '03:20 - 07:45',
        description: 'A breathtaking pavilion encrusted with convex Belgian glass mirror mosaics that illuminate the entire chamber with a single candle flame.',
        narration: 'Look closely at the concave Belgian mirrors set into marble stucco. In the 17th century, when queen and court resided here during winter evenings, the light of two candles reflected millions of tiny stars across the ceiling, creating an illusion of a starlit night sky indoors.'
      },
      {
        id: 'ganesh-pol',
        name: 'Ganesh Pol',
        location: 'Entrance to Private Palaces',
        audioTime: '07:45 - 11:30',
        description: 'A multi-tiered gateway decorated with exquisite natural vegetable and stone pigment frescoes depicting Lord Ganesha.',
        narration: 'The Ganesh Pol marks the threshold between public statecraft and private royal living quarters. Notice the jali marble screens above where royal women observed royal durbars unseen by outside visitors.'
      },
      {
        id: 'kesar-kyari',
        name: 'Kesar Kyari (Saffron Garden)',
        location: 'Maota Lake Floating Parterre',
        audioTime: '11:30 - 14:50',
        description: 'A star-shaped geometric Persian Charbagh garden floating in Maota Lake, historically planted with aromatic saffron and night-blooming jasmine.',
        narration: 'Gazing down towards Maota Lake, the intricate star-shaped beds of Kesar Kyari were designed to cool the desert breezes blowing up into the palace pavilions.'
      },
      {
        id: 'escape-tunnel',
        name: 'Subterranean Jaigarh Secret Tunnel',
        location: 'Lower Royal Quarter',
        audioTime: '14:50 - 18:00',
        description: 'A 2-kilometer underground vaulted tunnel connecting Amber Palace directly to the military fortress of Jaigarh Fort.',
        narration: 'This subterranean tunnel provided an emergency escape route for royal family members during siege invasions, allowing safe passage up to the fortified arsenal of Jaigarh.'
      }
    ],
    overview: 'Amber Fort is a monumental masterpiece of Rajput-Mughal architecture, constructed with warm yellow and pink sandstone alongside pure white Makrana marble. High upon the Aravalli hills, its four vast courtyards, opulent mirrored pavilions, and subterranean waterways reflect centuries of Kachwaha royal supremacy.',
    historyTimeline: [
      { year: '967 CE', event: 'Original settlement and citadel founded by the Chanda clan of Meenas.' },
      { year: '1037 CE', event: 'Kachwaha Rajputs establish Amber as their royal capital under Kakil Dev.' },
      { year: '1592 CE', event: 'Raja Man Singh I, commander of Mughal Emperor Akbar’s imperial army, begins construction of the modern palace complex.' },
      { year: '1667 CE', event: 'Mirza Raja Jai Singh builds the iconic Sheesh Mahal and Ganesh Pol.' },
      { year: '1727 CE', event: 'Sawai Jai Singh II founds Jaipur in the plains below, shifting the royal administrative capital.' },
      { year: '2013 CE', event: 'Inscribed as a UNESCO World Heritage Site under the Hill Forts of Rajasthan.' }
    ],
    architectureDetails: {
      style: 'Rajput & Mughal Syncretic Architecture',
      materials: 'Pink & Yellow Sandstone, White Makrana Marble, Lime Plaster (Chunam)',
      notableFeatures: [
        'Naturally ventilated Jali lattice work keeping interior chambers up to 8°C cooler than the outside desert heat.',
        'Persian Charbagh hydraulic water lifting systems using Persian wheels and aqueducts from Maota Lake.',
        'Belgian convex mirrors embedded in floral gypsum plaster reliefs in Sheesh Mahal.'
      ]
    },
    folkloreAndLegends: [
      {
        title: 'The Hidden Royal Treasury of Jaigarh',
        type: 'Folklore / Oral Tradition',
        text: 'Local oral tradition tells of a vast subterranean vault deep within the Jaigarh-Amber complex containing the legendary royal treasure brought from Raja Man Singh’s Afghan conquests. Though searched multiple times in modern history, the legend continues to capture Jaipur folklore.'
      },
      {
        title: 'The Single Candle Starlit Illusion',
        type: 'Verified Historical Craft',
        text: 'The architectural design of Sheesh Mahal was engineered so that a single oil lamp or candle carried by the Maharaja would cast thousands of twinkling reflections across the curved ceiling mirrors, simulating the night sky without modern lighting.'
      }
    ],
    communityVoices: [
      {
        author: 'Pandit Ramratan Sharma',
        role: '4th Generation Amber Fort Heritage Guide',
        quote: 'When the winter sun sets over Maota lake, stand beneath the Ganesh Pol arches. The acoustics were tuned so whispers could travel only to the guard posts, guarding the Maharaja from assassins.'
      },
      {
        author: 'Dr. Meenakshi Joshi',
        role: 'Architectural Historian, Jaipur',
        quote: 'Amber is not just a palace; it is a masterclass in climatological desert engineering. The water cooling channels run under the palace floors to create natural air conditioning.'
      }
    ]
  },
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal (Palace of Winds)',
    hindiName: 'हवा महल',
    cityId: 'jaipur',
    locationName: 'Badi Chaupar, Old City, Jaipur',
    category: 'Royal Pavilion & Facade',
    era: '1799 CE (Kachwaha Dynasty)',
    yearBuilt: '1799 CE',
    builtBy: 'Maharaja Sawai Pratap Singh (Devotee of Lord Krishna)',
    architect: 'Lal Chand Ustad',
    unesco: true,
    unescoTitle: 'Jaipur City UNESCO World Heritage Site',
    entryFee: '₹50 (Indian Nationals) · ₹200 (Foreign Nationals)',
    hours: '9:00 AM – 5:00 PM',
    distanceKm: 3.1,
    coordinates: { lat: 26.9239, lng: 75.8267 },
    heroImage: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80'
    ],
    audioGuideLength: '12 min audio tour · 4 points of interest',
    audioGuideCurrentLocation: 'Facing the 953 Jharokha Facade on Sireh Deori Bazaar',
    audioGuideScript: 'You are viewing Hawa Mahal, the Palace of the Winds, an architectural marvel shaped like the crown of Lord Krishna. With its 953 intricately carved honeycomb jharokha casements, it allowed royal women to observe the vibrant street life of the bazaars without violating the customary purdah veil. The ingenious Venturi effect of the small windows created natural cool drafts even in scorching 45°C summers.',
    pointsOfInterest: [
      {
        id: 'jharokha-facade',
        name: 'The 953 Honeycomb Casements',
        location: 'Main Sireh Deori Facade',
        audioTime: '00:00 - 03:15',
        description: 'A five-storey pyramid facade rising 50 feet with 953 stone-screened casements.',
        narration: 'Notice how thin the structure is at the top—less than a foot thick! The facade acts as a giant natural cooling tower.'
      },
      {
        id: 'sharad-mandir',
        name: 'Sharad Mandir (Autumn Chamber)',
        location: 'Ground Floor Courtyard',
        audioTime: '03:15 - 06:10',
        description: 'Where royal autumn celebrations and Krishna devotional poetry recitals were held.',
        narration: 'Maharaja Sawai Pratap Singh composed heartfelt devotional poetry in praise of Krishna inside this courtyard.'
      },
      {
        id: 'hawa-mandir',
        name: 'Hawa Mandir (Top Pavilion)',
        location: 'Fifth Floor Apex',
        audioTime: '06:10 - 09:30',
        description: 'The highest summit offering 360-degree panoramic vistas across Jantar Mantar and Nahargarh Fort.',
        narration: 'From this lofty vantage point, the breeze flows unhindered from the Aravalli hills down across the Pink City grid.'
      }
    ],
    overview: 'Rising five storeys without a formal foundation, Hawa Mahal is one of the most recognizable icons of Indian architectural genius. Its honeycomb facade designed in pink and red sandstone creates continuous air circulation, earning its poetic title of Palace of Winds.',
    historyTimeline: [
      { year: '1799 CE', event: 'Commissioned by Sawai Pratap Singh, inspired by the Khetri Mahal of Jhunjhunu.' },
      { year: '1853 CE', event: 'Painted in distinctive terracotta pink by Maharaja Ram Singh for the royal visit.' },
      { year: '2006 CE', event: 'Extensive scientific stone restoration carried out to stabilize the sandstone lattice.' }
    ],
    architectureDetails: {
      style: 'Rajput & Mughal Crown-Shaped Screen Architecture',
      materials: 'Red and Pink Terracotta Sandstone, White Chunam Plaster Highlights',
      notableFeatures: [
        'Venturi aerodynamic cooling effect generated through tapering micro-openings.',
        'Ramped corridors without staircases to allow palanquins to be carried smoothly to upper levels.'
      ]
    },
    folkloreAndLegends: [
      {
        title: 'Lord Krishna’s Mukut (Crown)',
        type: 'Historical Intent',
        text: 'Sawai Pratap Singh was a devoted follower of Lord Krishna, and had architect Lal Chand Ustad sculpt the exterior silhouette to directly mirror the peacock-feathered crown of the deity.'
      }
    ],
    communityVoices: [
      {
        author: 'Gulab Chand Saini',
        role: 'Tea Stall Veteran across Hawa Mahal for 48 years',
        quote: 'Watch Hawa Mahal at 6:30 in the morning when the sun hits the pink stone. It looks like a giant honeycombed jewel waking up.'
      }
    ]
  },
  {
    id: 'city-palace',
    name: 'City Palace of Jaipur',
    hindiName: 'सिटी पैलेस, जयपुर',
    cityId: 'jaipur',
    locationName: 'Jaleb Chowk, Old City, Jaipur',
    category: 'Living Royal Residence & Museum',
    era: '1727 – 1732 CE',
    yearBuilt: '1727 CE',
    builtBy: 'Maharaja Sawai Jai Singh II & successive rulers',
    architect: 'Vidyadhar Bhattacharya & Sir Samuel Swinton Jacob',
    unesco: true,
    unescoTitle: 'Jaipur City UNESCO World Heritage Site',
    entryFee: '₹200 (Courtyards) · ₹3,000 (Chandra Mahal Royal Splendour Tour)',
    hours: '9:30 AM – 5:00 PM, 7:00 PM – 10:00 PM',
    distanceKm: 2.8,
    coordinates: { lat: 26.9258, lng: 75.8237 },
    heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'
    ],
    audioGuideLength: '15 min audio tour · 4 points of interest',
    audioGuideCurrentLocation: 'Standing in the Pritam Niwas Chowk Peacock Courtyard',
    audioGuideScript: 'You are inside the City Palace, the living seat of Jaipur’s royal family. Located at the geometric center of the walled city, this sprawling complex blends Vastu Shastra principles with Mughal pavilions and European neoclassicism. Notice the four legendary gates in Pritam Niwas Chowk, each dedicated to a season and Hindu deity.',
    pointsOfInterest: [
      {
        id: 'peacock-gate',
        name: 'Peacock Gate (Pritam Niwas Chowk)',
        location: 'Inner Courtyard',
        audioTime: '00:00 - 04:00',
        description: 'Exquisite high-relief mosaic gate representing Autumn and Lord Krishna, adorned with shimmering glass peacocks.',
        narration: 'The Peacock Gate is adorned with vivid 3D glass mosaics capturing the dance of peacocks during the monsoon and autumn.'
      },
      {
        id: 'silver-urns',
        name: 'The Gangajali Silver Urns',
        location: 'Diwan-i-Khas Courtyard',
        audioTime: '04:00 - 07:30',
        description: 'Guinness World Record holding sterling silver vessels (340 kg each) forged without solder to carry holy Ganga water to London in 1902.',
        narration: 'Maharaja Sawai Madho Singh II commissioned these giant sterling silver vessels to carry 4,000 liters of sacred Ganga water for his voyage to King Edward VII’s coronation.'
      },
      {
        id: 'mubarak-mahal',
        name: 'Mubarak Mahal (Welcome Palace)',
        location: 'First Courtyard',
        audioTime: '07:30 - 11:00',
        description: 'A delicate fusion of Islamic arches, Rajput jharokhas, and Victorian carved marble.',
        narration: 'Built in the late 19th century as a reception pavilion for royal dignitaries, it now houses the royal textile and costume treasury.'
      }
    ],
    overview: 'A magnificent living royal palace at the epicenter of Jaipur, featuring courtyards, gardens, armouries, and the seven-storey Chandra Mahal where the royal descendants still reside.',
    historyTimeline: [
      { year: '1727 CE', event: 'Sawai Jai Singh II begins construction along with the founding of Jaipur.' },
      { year: '1902 CE', event: 'Madho Singh II travels to England carrying the famous giant silver Gangajalis.' },
      { year: '1959 CE', event: 'Maharaja Sawai Man Singh II opens the Maharaja Sawai Man Singh II Museum.' }
    ],
    architectureDetails: {
      style: 'Rajput, Mughal & European Eclectic',
      materials: 'Red and Pink Sandstone, Makrana Marble, Enamelled Glass Tilework',
      notableFeatures: [
        'Pritam Niwas Chowk four seasonal gates: Peacock (Autumn), Lotus (Summer), Rose (Winter), Green Wave (Spring).',
        'Traditional Vastu Shastra 9-square grid cosmological city planning.'
      ]
    },
    folkloreAndLegends: [
      {
        title: 'The Sawai (One and a Quarter) Royal Flag',
        type: 'Verified Historical Tradition',
        text: 'When the Maharaja is in residence at Chandra Mahal, two flags fly overhead: the royal state flag and a smaller one-quarter flag below it, commemorating Emperor Aurangzeb bestowing the title "Sawai" (one and a quarter) on Jai Singh for his exceptional brilliance.'
      }
    ],
    communityVoices: [
      {
        author: 'Maharaj Narendra Singh',
        role: 'Jaipur Royal Heritage Custodian',
        quote: 'The City Palace is not a dead monument of stone. It is a breathing sanctuary of rituals, artisan guilds, and festivals celebrated continuously for three centuries.'
      }
    ]
  },
  {
    id: 'jantar-mantar',
    name: 'Jantar Mantar Observatory',
    hindiName: 'जंतर मंतर',
    cityId: 'jaipur',
    locationName: 'Near City Palace, Jaipur',
    category: 'Astronomical Heritage & Science',
    era: '1734 CE (Kachwaha Dynasty)',
    yearBuilt: '1734 CE',
    builtBy: 'Maharaja Sawai Jai Singh II (Astronomer King)',
    architect: 'Sawai Jai Singh II with Pandit Jagannatha Samrat',
    unesco: true,
    unescoTitle: 'UNESCO World Heritage Astronomical Site',
    entryFee: '₹50 (Indian Nationals) · ₹200 (Foreign Nationals)',
    hours: '9:00 AM – 5:00 PM',
    distanceKm: 2.9,
    coordinates: { lat: 26.9248, lng: 75.8246 },
    heroImage: 'https://images.unsplash.com/photo-1603813354784-48f8691515bb?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603813354784-48f8691515bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'
    ],
    audioGuideLength: '14 min audio tour · 4 points of interest',
    audioGuideCurrentLocation: 'At the foot of the Vrihat Samrat Yantra sundial',
    audioGuideScript: 'You are standing within Jantar Mantar, the largest stone astronomical observatory in the world. Built by the scholar-king Sawai Jai Singh II, these monumental stone and marble instruments calculate celestial coordinates, track planetary eclipses, and measure solar time with an accuracy within two seconds.',
    pointsOfInterest: [
      {
        id: 'samrat-yantra',
        name: 'Vrihat Samrat Yantra (Giant Sundial)',
        location: 'Central Observatory',
        audioTime: '00:00 - 04:30',
        description: 'The world’s largest stone sundial standing 27 meters tall, tracking solar time to an accuracy of 2 seconds.',
        narration: 'Observe the giant shadow moving across the calibrated marble dial. You can physically watch the shadow shift by 1 millimeter every second as the earth rotates.'
      },
      {
        id: 'jai-prakash',
        name: 'Jai Prakash Yantra (Sky Mirror)',
        location: 'Western Section',
        audioTime: '04:30 - 08:15',
        description: 'Two complementary hemispherical bowl sundials mapping the inverted celestial hemisphere.',
        narration: 'Astronomers would walk inside the bowl along the open pathways to sight stars directly through crosswires.'
      }
    ],
    overview: 'A collection of nineteen architectural astronomical instruments completed in 1734. The site features the world’s largest stone sundial and is a UNESCO World Heritage site representing the pinnacle of pre-telescopic astronomical science.',
    historyTimeline: [
      { year: '1728 CE', event: 'Jai Singh sends astronomical expeditions to Central Asia and Europe to cross-examine astronomical tables.' },
      { year: '1734 CE', event: 'Construction of Jaipur Jantar Mantar observatory completed.' },
      { year: '2010 CE', event: 'Inscribed as a UNESCO World Heritage Site.' }
    ],
    architectureDetails: {
      style: 'Astronomical Instrument Architecture & Vedic Geometry',
      materials: 'Local Sandstone, White Marble Calibrated Scales, Brass Astrolabes',
      notableFeatures: [
        'Monumental scale minimizes observation error inherent in small brass instruments.',
        'Precision alignment along the exact meridian and celestial latitude of Jaipur (26.9° N).'
      ]
    },
    folkloreAndLegends: [
      {
        title: 'The Eclipse Prediction Tradition',
        type: 'Verified Science & Cultural Practice',
        text: 'Royal astrologers and astronomers sat together at the Rama Yantra each year on Guru Purnima to calculate the exact timing of solar eclipses and predict the onset of monsoon winds.'
      }
    ],
    communityVoices: [
      {
        author: 'Prof. Rajesh K. Sharma',
        role: 'Vedic Astronomy Researcher, Rajasthan University',
        quote: 'Jantar Mantar is poetry written in mathematical stone. Jai Singh realized that stone does not warp or expand like brass, ensuring measurements that remain accurate 300 years later.'
      }
    ]
  },
  {
    id: 'kashi-vishwanath',
    name: 'Kashi Vishwanath & Sacred Ghats',
    hindiName: 'काशी विश्वनाथ एवं पावन घाट',
    cityId: 'varanasi',
    locationName: 'Vishwanath Gali & Dashashwamedh Ghat, Varanasi, UP',
    category: 'Spiritual Heritage & Riverfront Ghats',
    era: 'Antiquity (Rebuilt 1780 CE by Ahilyabai Holkar)',
    yearBuilt: '1780 CE (Current Temple Structure)',
    builtBy: 'Maharani Ahilyabai Holkar of Indore',
    architect: 'Nagari Temple Guilds & Ghat Stone Masons',
    unesco: false,
    unescoTitle: 'Tentative UNESCO World Heritage Riverfront List',
    entryFee: 'Free (General Darshan) · ₹300 (Sugam Darshan)',
    hours: '3:00 AM – 11:00 PM (Mangala Aarti to Shayan Aarti)',
    distanceKm: 1.2,
    coordinates: { lat: 25.3109, lng: 83.0104 },
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80'
    ],
    audioGuideLength: '16 min audio tour · 4 points of interest',
    audioGuideCurrentLocation: 'At Dashashwamedh Ghat facing the sacred Ganga',
    audioGuideScript: 'Welcome to Varanasi, the eternal city on the banks of the sacred Ganga. You are standing near Dashashwamedh Ghat, where according to ancient tradition, Lord Brahma performed the ten-horse sacrifice. Behind you winds the sacred corridor leading to the golden spire of the Kashi Vishwanath temple, rebuilt with devotion by Queen Ahilyabai Holkar in 1780.',
    pointsOfInterest: [
      {
        id: 'dashashwamedh-ghat',
        name: 'Dashashwamedh Ghat & Evening Ganga Aarti',
        location: 'Central Riverfront',
        audioTime: '00:00 - 05:00',
        description: 'The most sacred and vibrant ghat in Varanasi where the choreographed brass-lamp Ganga Aarti takes place each dusk.',
        narration: 'Every evening at twilight, young priests clad in silk dhotis raise giant multi-tiered brass oil lamps in synchronized devotion to Mother Ganga.'
      },
      {
        id: 'golden-spire',
        name: 'The Golden Spire of Vishwanath',
        location: 'Temple Inner Sanctum',
        audioTime: '05:00 - 09:30',
        description: 'The golden dome gilded with nearly 1,000 kilograms of pure gold donated by Maharaja Ranjit Singh of Punjab in 1835.',
        narration: 'Notice how the gold-covered shikhara reflects the morning sunlight over the labyrinthine alleys of the old city.'
      }
    ],
    overview: 'The spiritual heart of Varanasi, Kashi Vishwanath is one of the twelve sacred Jyotirlingas of Lord Shiva. The riverfront of 84 ancient stone ghats forms an extraordinary living amphitheater of rituals, music, philosophy, and eternal traditions.',
    historyTimeline: [
      { year: '11th Century BCE', event: 'Earliest continuous habitation and Vedic hymns composed in Kashi.' },
      { year: '1780 CE', event: 'Queen Ahilyabai Holkar of Malwa reconstructs the temple complex.' },
      { year: '1835 CE', event: 'Maharaja Ranjit Singh of Punjab donates one ton of pure gold to plate the spires.' },
      { year: '2021 CE', event: 'Inauguration of the expansive Kashi Vishwanath Riverfront Corridor connecting temple directly to Ganga.' }
    ],
    architectureDetails: {
      style: 'Nagara North Indian Temple Architecture & Riverfront Stone Embankments',
      materials: 'Chunar Sandstone, Gilded Copper & Gold Foil, Makrana Marble Pavements',
      notableFeatures: [
        'Monumental stepped river embankments designed to withstand seasonal monsoon river swells of up to 15 meters.',
        'High-density urban labyrinth (Galis) engineered for thermal shade and pedestrian circulation.'
      ]
    },
    folkloreAndLegends: [
      {
        title: 'City Resting on Shiva’s Trishul',
        type: 'Mythology & Oral Tradition',
        text: 'Vedic folklore holds that Kashi never falls during cosmic dissolutions because it rests delicately upon the three tines of Lord Shiva’s trident (Trishul).'
      }
    ],
    communityVoices: [
      {
        author: 'Acharya Vidyadhar Tripathi',
        role: 'Varanasi Ghat Sanskrit Scholar',
        quote: 'In Kashi, time does not move in a straight line. When you sit on the steps of the ghat at sunrise hearing the shehnai of Bismillah Khan’s students, you sit with three thousand years of ancestors.'
      }
    ]
  },
  {
    id: 'qutub-minar',
    name: 'Qutub Minar & Mehrauli Complex',
    hindiName: 'क़ुतुब मीनार',
    cityId: 'delhi',
    locationName: 'Mehrauli, South Delhi',
    category: 'Sultanate Monument & Victory Tower',
    era: '1199 – 1220 CE (Delhi Sultanate)',
    yearBuilt: '1199 CE',
    builtBy: 'Qutb-ud-din Aibak & Shams-ud-din Iltutmish',
    architect: 'Sultanate and Indigenous Stone Carvers',
    unesco: true,
    unescoTitle: 'Qutb Minar and its Monuments UNESCO World Heritage Site',
    entryFee: '₹40 (Indian Nationals) · ₹600 (Foreign Nationals)',
    hours: '7:00 AM – 8:00 PM',
    distanceKm: 14.2,
    coordinates: { lat: 28.5244, lng: 77.1855 },
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80'
    ],
    audioGuideLength: '14 min audio tour · 3 points of interest',
    audioGuideCurrentLocation: 'Courtyard facing the 72.5-meter sandstone minaret',
    audioGuideScript: 'You are standing beneath Qutub Minar, the tallest brick minaret in the world at 72.5 meters. Begun in 1199 CE by Qutb-ud-din Aibak and expanded by Iltutmish and Firoz Shah Tughlaq, its tapering storeys blend fluted red sandstone with intricate calligraphic Quranic bands and lotus flower brackets carved by indigenous Indian stonemasons.',
    pointsOfInterest: [
      {
        id: 'iron-pillar',
        name: 'The 1,600-Year-Old Rustless Iron Pillar',
        location: 'Quwwat-ul-Islam Courtyard',
        audioTime: '00:00 - 04:30',
        description: 'A 4th-century Gupta Empire metallurgical marvel of forge-welded high-phosphorus iron that has resisted rust for sixteen centuries.',
        narration: 'Scientists worldwide have studied this iron pillar: its protective layer of iron hydrogen phosphate hydrate preserves the ancient Sanskrit inscription of King Chandra.'
      }
    ],
    overview: 'The Qutb complex in Mehrauli contains monumental architecture spanning five centuries, including the world’s tallest stone minaret, the iconic rust-resistant 4th-century Gupta Iron Pillar, and the Alai Darwaza gateway.',
    historyTimeline: [
      { year: '1199 CE', event: 'Qutb-ud-din Aibak constructs the first storey as a victory tower and minaret.' },
      { year: '1220 CE', event: 'Iltutmish adds three upper storeys in red sandstone.' },
      { year: '1368 CE', event: 'Firoz Shah Tughlaq repairs lightning damage, rebuilding top storeys with white marble.' }
    ],
    architectureDetails: {
      style: 'Early Indo-Islamic Architecture with Nagari Calligraphy',
      materials: 'Red Fluted Sandstone, White Marble Accents, High-Phosphorus Iron',
      notableFeatures: [
        'Alternating angular and rounded flutings on lower storeys.',
        'Brackets under balconies featuring indigenous Hindu lotus-bud motifs adapted for Islamic geometry.'
      ]
    },
    folkloreAndLegends: [
      {
        title: 'The Backward Hug of Good Luck',
        type: 'Folklore / Popular Custom',
        text: 'For generations, visitors stood with their backs to the ancient Iron Pillar and attempted to wrap their arms around it backwards; folklore claimed anyone who could touch their fingers would receive a fulfilled wish.'
      }
    ],
    communityVoices: [
      {
        author: 'Sohail Hashmi',
        role: 'Delhi Heritage Historian & Oral Storyteller',
        quote: 'Look at the carving on the lower storey. The stonemasons were indigenous artisans who carved Arabic inscriptions with the same graceful leafy flourishes they used for temple friezes.'
      }
    ]
  },
  {
    id: 'virupaksha-temple',
    name: 'Virupaksha Temple & Hampi Ruins',
    hindiName: 'विरूपाक्ष मंदिर, हम्पी',
    cityId: 'hampi',
    locationName: 'Hampi Bazaar, Tungabhadra Riverfront, Karnataka',
    category: 'Ancient Dravidian Temple & Royal Ruins',
    era: '7th Century (Expanded 1510 CE by Krishnadevaraya)',
    yearBuilt: 'Continuous worship since 7th Century CE',
    builtBy: 'Vijayanagara Emperors (Emperor Krishnadevaraya)',
    architect: 'Vijayanagara Imperial Guild of Sculptors',
    unesco: true,
    unescoTitle: 'Group of Monuments at Hampi UNESCO World Heritage Site',
    entryFee: '₹25 (Indian Nationals) · ₹500 (Foreign Nationals)',
    hours: '6:00 AM – 6:00 PM',
    distanceKm: 0.8,
    coordinates: { lat: 15.3353, lng: 76.4598 },
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f010f444b434?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600100397608-f010f444b434?auto=format&fit=crop&w=1200&q=80'
    ],
    audioGuideLength: '15 min audio tour · 3 points of interest',
    audioGuideCurrentLocation: 'Under the 50-meter Eastern Raya Gopuram',
    audioGuideScript: 'You are standing before Virupaksha Temple, the oldest continuously active temple in Hampi, dedicated to Lord Shiva. Rising nine tiers into the Deccan sky, its eastern gopuram overlooks the ancient one-kilometer chariot street where Persian, Portuguese, and Arab traders once bartered pearls and rubies by the basketful.',
    pointsOfInterest: [
      {
        id: 'pinhole-camera',
        name: 'The Inverted Pin-Hole Shadow Phenomenon',
        location: 'Rear Shrine Chamber',
        audioTime: '00:00 - 04:30',
        description: 'An optical pinhole camera effect in the inner sanctum wall that casts an inverted shadow of the 50-meter gopuram.',
        narration: 'Stand in the dark chamber at noon to witness an upside-down projected shadow of the massive temple tower, engineered centuries before modern cameras.'
      }
    ],
    overview: 'The spiritual nerve center of the Vijayanagara Empire, Virupaksha temple has been in continuous active worship since at least the 7th century, surviving the sack of the imperial capital.',
    historyTimeline: [
      { year: '7th Century CE', event: 'Earliest shrines built on the banks of holy Pampa Sarovar.' },
      { year: '1510 CE', event: 'Emperor Krishnadevaraya commissions the grand Eastern Gopuram to commemorate his coronation.' },
      { year: '1986 CE', event: 'Inscribed as a UNESCO World Heritage Site.' }
    ],
    architectureDetails: {
      style: 'Vijayanagara Dravidian Temple Architecture',
      materials: 'Granite Monoliths, Stucco Superstructures, Soapstone Carvings',
      notableFeatures: [
        'Carved monolithic pillars depicting mythical Yali creatures with lions and elephant trunks.',
        'Extensive ceiling frescoes in the Ranga Mandapa depicting the Mahabharata and royal processions.'
      ]
    },
    folkloreAndLegends: [
      {
        title: 'Kishkindha Kingdom of the Ramayana',
        type: 'Mythology & Sacred Geography',
        text: 'Local belief identifies Hampi’s boulder hills as Kishkindha, the monkey kingdom where Lord Rama met Hanuman and Sugriva in the Ramayana.'
      }
    ],
    communityVoices: [
      {
        author: 'Shankar Gowda',
        role: 'Hampi Coracle Boatman and Storyteller',
        quote: 'The stones in Hampi sing if you listen at sunrise when the river mist rises over the monolithic boulders.'
      }
    ]
  }
];
