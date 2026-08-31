export const MOCK_CULTURE = [
  {
    id: 'blue-pottery',
    name: 'Jaipur Blue Pottery',
    hindiName: 'जयपुर ब्लू पॉटरी',
    cityId: 'jaipur',
    domain: 'Crafts & Artisanship',
    tagline: 'Glazed Quartz Mastery · Persian Roots Reborn in Jaipur',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    origin: 'Imported by Maharaja Sawai Ram Singh II in the 19th Century from Turko-Persian artisans.',
    giTagged: true,
    giTitle: 'Geographical Indication (GI) Certified Handicraft',
    description: 'Unlike traditional clay pottery, Jaipur Blue Pottery is made entirely without clay. It uses a unique dough of quartz stone powder, powdered glass, Fuller’s Earth (Multani Mitti), and natural gum, fired only once.',
    artisanQuote: '"When the blue oxide touches the quartz in the 800-degree kiln, it turns the color of a desert twilight." — Master Artisan Kripal Singh Shekhawat lineage',
    notableTechniques: ['Clay-free quartz dough formulation', 'Hand-painting with cobalt oxide (deep blue) and copper oxide (turquoise)', 'Low-fire single kiln process'],
    whereToExperience: 'Kripal Kumbh & Sanganer Artisan Clusters, Jaipur',
    authenticityTips: 'Authentic blue pottery is lightweight, produces a metallic ring when tapped, and shows fine hand-painted brush strokes rather than printed stencils.'
  },
  {
    id: 'bandhani-textiles',
    name: 'Bandhani & Leheriya Textiles',
    hindiName: 'बंधेज एवं लहरिया वस्त्र',
    cityId: 'jaipur',
    domain: 'Textiles & Weaving',
    tagline: 'The Ancient Art of Resist Dyeing & Wave Patterns',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
    origin: 'Historical records date Bandhani back to the 6th-century Ajanta cave murals.',
    giTagged: true,
    giTitle: 'GI Certified Rajasthani Tie-Dye Textile',
    description: 'Skilled women artisans tie thousands of tiny knots using fingernail-plucking (nakhuna) technique before immersing the silk or cotton in vivid turmeric yellows, sindoori reds, and madder dyes.',
    artisanQuote: '"A single wedding Odhna can take up to 25,000 hand-tied knots and three months of patience." — Sita Devi, Bikaner Bandhani Guild',
    notableTechniques: ['Mothra check resist-dye', 'Leheriya chevron wave patterning', 'Shikargah animal motifs'],
    whereToExperience: 'Johari Bazaar & Kishanpole Bazaar, Jaipur',
    authenticityTips: 'Genuine hand-tied Bandhani has raised texture (puckering) where each knot was pulled and tied.'
  },
  {
    id: 'rajasthani-folk-music',
    name: 'Rajasthani Folk & Desert Strings',
    hindiName: 'राजस्थानी लोक संगीत',
    cityId: 'jaipur',
    domain: 'Music & Performing Arts',
    tagline: 'The Melodies of Manganiyars, Langas & the Kamaicha',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    origin: 'Hereditary court musician communities patronized by royal Rajput courts for over 800 years.',
    giTagged: false,
    giTitle: 'Intangible Living Heritage of Rajasthan',
    description: 'The desert music of Rajasthan features ancient string instruments like the bowed Kamaicha (crafted from mango wood and goat skin) and the Sindhi Sarangi, accompanied by the hypnotic rhythms of Khartal teak castanets.',
    artisanQuote: '"Our songs carry the genealogies of kings, the arrival of rain clouds, and the cries of separated lovers across sand dunes." — Ustad Lakha Khan',
    notableTechniques: ['Raga Maand improvisations', 'Khartal hand percussion virtuosity', 'Morchang jaw harp resonance'],
    whereToExperience: 'Jawahar Kala Kendra & Chokhi Dhani Evenings, Jaipur',
    authenticityTips: 'Listen for the rich resonance of gut strings played with a fingernail glide rather than finger pads.'
  },
  {
    id: 'rajasthani-cuisine',
    name: 'Dal Baati Churma & Royal Thali',
    hindiName: 'दाल बाटी चूरमा व राजसी थाल',
    cityId: 'jaipur',
    domain: 'Culinary Heritage',
    tagline: 'Desert Survival Food Elevated to Imperial Royal Feasts',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    origin: 'Originating during the 8th-century warfare of the Guhilot dynasty of Mewar.',
    giTagged: false,
    giTitle: 'Iconic Regional Culinary Heritage',
    description: 'Slow-baked whole wheat baatis cracked open and drenched in pure desi ghee, served with Panchmel five-lentil dal and sweet crushed wheat churma infused with cardamom, saffron, and pistachios.',
    artisanQuote: '"In the desert where water was scarce, our grandmothers perfected sun-dried berries (Ker Sangri) and ghee-rich breads that lasted for weeks." — Chef Ranveer Brar notes on Rajasthani Rasoi',
    notableTechniques: ['Cow-dung ash open-pit roasting (traditional Dhungar)', 'Panchmel Dal tempered with hing and cloves', 'Ghevar honeycomb syrup crystallization'],
    whereToExperience: 'Laxmi Mishthan Bhandar (LMB) Johari Bazaar & 1135 AD Amer, Jaipur',
    authenticityTips: 'Authentic Ghevar has an airy, honeycomb structure that melts on the tongue without oiliness.'
  }
];

export const CULTURAL_MOSAIC_CATEGORIES = [
  {
    id: 'architecture',
    title: 'Sacred & Imperial Architecture',
    subtitle: 'Nagara, Dravidian, Vesara & Indo-Islamic Masterpieces',
    badge: '12 UNESCO Sites',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    featuredEntities: ['Amber Fort (Jaipur)', 'Sun Temple (Konark)', 'Brihadisvara Temple (Thanjavur)', 'Humayun’s Tomb (Delhi)'],
    description: 'Centuries of sophisticated stone joinery, interlocking dry masonry, acoustic courtyards, and celestial alignment across royal forts and sacred shrines.'
  },
  {
    id: 'textiles',
    title: 'Textiles & Handloom Weaving',
    subtitle: 'The Fabric of Civilizations',
    badge: '60+ GI Tagged Weaves',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
    featuredEntities: ['Patan Patola Double Ikat', 'Banarasi Brocade Silk', 'Kanchipuram Temple Weaves', 'Chanderi & Maheshwari'],
    description: 'From 5,000-year-old Harappan madder-dyed cottons to complex double ikats requiring six months of mathematical tie-dye precision.'
  },
  {
    id: 'dance',
    title: 'Classical & Ritual Dance',
    subtitle: 'Living Traditions of the Natya Shastra',
    badge: '8 Classical Forms',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    featuredEntities: ['Bharatanatyam (Tamil Nadu)', 'Kathakali (Kerala)', 'Odissi (Odisha)', 'Kathak (North India)'],
    description: 'Sacred geometric postures, mudra hand language, expressive abhinaya eyes, and mathematical rhythmic footwork codified in ancient Sanskrit treatises.'
  },
  {
    id: 'crafts',
    title: 'Master Artisanship & Metallurgy',
    subtitle: 'Guilds of Sculptors, Enamellers & Potters',
    badge: 'Living National Treasures',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    featuredEntities: ['Chola Lost-Wax Bronze', 'Jaipur Meenakari Enamelling', 'Bidriware Silver Inlay', 'Tarkashi Wire Inlay'],
    description: 'Metals, stones, and minerals transformed through ancestral techniques passed down through unbroken family lineages for generations.'
  },
  {
    id: 'tribal',
    title: 'Tribal & Indigenous Heritage',
    subtitle: 'Earth-Centered Art and Oral Genealogies',
    badge: '700+ Indigenous Tribes',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=80',
    featuredEntities: ['Gond Painting (Madhya Pradesh)', 'Warli Wall Art (Maharashtra)', 'Dhokra Bell-Metal Casting', 'Pithora Ritual Murals'],
    description: 'Intricate visual narratives connecting sacred groves, animal spirits, harvest rhythms, and ancestral memory directly onto earth walls and handmade paper.'
  },
  {
    id: 'music',
    title: 'Hindustani & Carnatic Music',
    subtitle: 'The Science of Ragas and Microtonal Shrutis',
    badge: 'Ancient Musical Systems',
    image: 'https://images.unsplash.com/photo-1603813354784-48f8691515bb?auto=format&fit=crop&w=1000&q=80',
    featuredEntities: ['Dhrupad Vedic Chanting', 'Khayal Improvisation', 'Carnatic Kriti Compositions', 'Sufi Sama Traditions'],
    description: 'Melodic ragas timed to the hour of the day and season, exploring the 22 microtones of Indian music with veena, sitar, and mridangam.'
  }
];
