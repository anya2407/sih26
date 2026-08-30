export const MOCK_STORIES = [
  {
    id: 'story-1',
    cityId: 'jaipur',
    title: 'The Secret 14-Day Mineral Quartz Firing of Jaipur Blue Pottery',
    contributor: {
      name: 'Rameshwar Lal Kumawat',
      handle: '@rameshwar_artisan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badge: 'Master Craftsman · President Awardee'
    },
    location: 'Kot Jewar Artisan Cluster, Jaipur',
    date: '3 days ago',
    type: 'Local Knowledge',
    typeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    typeIcon: '🏛️',
    typeDescription: 'Community-contributed technical process verified by regional artisan collective.',
    content: 'Many visitors ask why Jaipur Blue Pottery cannot be shaped on a traditional potter’s wheel like red clay. The secret lies in our recipe: we mix 80% ground quartz stone, 10% cullet glass powder, 5% gum, and 5% Multani Mitti (Fuller’s Earth). Because there is no plastic clay, each vessel must be pressed into handmade open-faced terracotta molds and left to dry slowly in the desert sun for 14 days before the master painter touches it with cobalt and copper oxide brushes.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    upvotes: 284,
    commentsCount: 38,
    savedCount: 94,
    comments: [
      { id: 'c1', user: 'Ananya Roy', text: 'Visited your workshop last autumn! The turquoise glaze bowls we bought are our family’s prized centerpiece.', time: '2 days ago' },
      { id: 'c2', user: 'Vikramaditya S.', text: 'Fascinating to know there is zero clay used. The mineral science behind this is incredible.', time: 'Yesterday' }
    ]
  },
  {
    id: 'story-2',
    cityId: 'jaipur',
    title: 'The Subterranean Escape Vaults Between Amber and Jaigarh Fort',
    contributor: {
      name: 'Rana Harshwardhan Rathore',
      handle: '@harsh_heritage_raj',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      badge: 'Heritage Guide & Oral Historian'
    },
    location: 'Cheel ka Teela Ridge, Amer, Rajasthan',
    date: '1 week ago',
    type: 'Folklore / Oral Tradition',
    typeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    typeIcon: '📜',
    typeDescription: 'Oral folklore passed down generations; represents cultural mythos rather than verified archaeological proof.',
    content: 'My great-grandfather served as a royal guard at the Suraj Pol entrance. He used to tell us that beneath the courtyard of Jaleb Chowk, a vaulted secret tunnel branches into three paths: one leads directly up the rocky ridge into the arsenal of Jaigarh Fort, one to the royal stepwell for freshwater supply, and the third was a decoy filled with stone traps. While the upper kilometer of the Jaigarh tunnel is now open to visitors, local folklore insists the deepest vault still holds royal armor that was never cataloged.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    upvotes: 412,
    commentsCount: 52,
    savedCount: 167,
    comments: [
      { id: 'c3', user: 'Divya N.', text: 'Walking that tunnel between Amber and Jaigarh was the highlight of our Jaipur trip! You can feel the mountain breeze whistling through the slits.', time: '5 days ago' }
    ]
  },
  {
    id: 'story-3',
    cityId: 'jaipur',
    title: 'The Astronomical Calculation Manuscripts of Sawai Jai Singh II',
    contributor: {
      name: 'Dr. Alok Nath Verma',
      handle: '@alok_archaeo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      badge: 'Senior Archivist, Rajasthan State Archives'
    },
    location: 'Jantar Mantar Archives, Jaipur',
    date: '2 weeks ago',
    type: 'Verified Historical Record',
    typeColor: 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold',
    typeIcon: '🟢',
    typeDescription: 'Corroborated by state archaeological records, contemporary Persian manuscripts, and physical epigraphy.',
    content: 'In 1728 CE, Maharaja Sawai Jai Singh II was unsatisfied with the existing astronomical tables of Ulugh Beg and French astronomer Philippe de La Hire due to small angular discrepancies during solar eclipses. In the royal *Zij-i Muhammad Shahi* treatises preserved in the City Palace archives, his scribes recorded over 1,400 consecutive observations of the Moon, Venus, and Sirius using the Samrat Yantra sundial to recalibrate planetary tables for the Indian subcontinent.',
    image: 'https://images.unsplash.com/photo-1603813354784-48f8691515bb?auto=format&fit=crop&w=1200&q=80',
    upvotes: 539,
    commentsCount: 41,
    savedCount: 220,
    comments: [
      { id: 'c4', user: 'Prof. S. Sen', text: 'The Zij-i Muhammad Shahi is one of the greatest syncretic scientific texts of the 18th century. Wonderful archival documentation!', time: '1 week ago' }
    ]
  },
  {
    id: 'story-4',
    cityId: 'jaipur',
    title: 'Echoes of the Shehnai: 70 Years of Bismillah Khan’s Morning Ragas',
    contributor: {
      name: 'Ustad Tariq Hussain',
      handle: '@tariq_shehnai',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      badge: 'Living Tradition Bearer'
    },
    location: 'Ganga Ghats & Vishwanath Corridor, Varanasi',
    date: '3 weeks ago',
    type: 'Oral Audio Recording',
    typeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    typeIcon: '🎙️',
    typeDescription: 'Includes authentic archival audio recording and transcript.',
    hasAudio: true,
    audioDuration: '02:45',
    audioTitle: 'Raga Bhairav Shehnai Improvisation at Dawn',
    content: 'Before the world woke up, Ustad Bismillah Khan would sit at the small Balaji temple near the ghats, practicing Raga Bhairav while the river mist touched his fingers. Listen to this rare family oral recording sharing his philosophy on how the breath of the shehnai mimics the slow ripple of the Ganga current at sunrise.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    upvotes: 681,
    commentsCount: 64,
    savedCount: 310,
    comments: [
      { id: 'c5', user: 'Meera Iyer', text: 'This audio snippet gave me goosebumps. Pure divine soul.', time: '2 weeks ago' }
    ]
  },
  {
    id: 'story-5',
    cityId: 'jaipur',
    title: '1890 Archival Photograph: Sireh Deori Bazaar Outside Hawa Mahal',
    contributor: {
      name: 'Jaipur Archival Photography Trust',
      handle: '@jaipur_archives',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Verified Cultural Institution'
    },
    location: 'Badi Chaupar, Jaipur',
    date: '1 month ago',
    type: 'Historical Photograph',
    typeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    typeIcon: '📷',
    typeDescription: 'Archival albumen silver print from the Maharaja Sawai Ram Singh II photographic collections.',
    content: 'This glass-plate negative photograph captured around 1890 shows the horse-drawn royal tongas and spice merchants gathered in the shadow of Hawa Mahal’s 953 jharokhas. Notice the unpaved limestone streets and the traditional red oxide limewash on the surrounding shopfronts before modern signage.',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    upvotes: 490,
    commentsCount: 29,
    savedCount: 185,
    comments: []
  }
];
