export const PRESET_GUIDE_QUESTIONS = {
  'amber-fort': [
    {
      id: 'q1',
      question: 'Why was this Suraj Pol entrance so important?',
      answer: 'Suraj Pol, or the Sun Gate, was the grand ceremonial entrance reserved exclusively for the royal sovereigns and returning armed forces. Because it faces directly east towards the rising sun, the morning light bathed the Maharaja in golden sunrays as he entered Jaleb Chowk on royal elephants, symbolizing victory and solar royalty derived from the Suryavanshi lineage.'
    },
    {
      id: 'q2',
      question: 'Tell me about the Sheesh Mahal mirror work and how it was lit.',
      answer: 'The Sheesh Mahal (Palace of Mirrors) was engineered in the 17th century using thousands of concave mirrors imported from Belgium and set into lime plaster floral stucco. During cold desert winters, when heavy silk curtains were drawn, the light of just two candles carried inside would reflect continuously across the curved glass, creating the stunning optical illusion of a million twinkling stars on the ceiling while generating gentle ambient warmth.'
    },
    {
      id: 'q3',
      question: 'Are the secret escape tunnels to Jaigarh Fort real?',
      answer: 'Yes, the subterranean escape tunnel is a documented historical engineering feat. It spans approximately 2 kilometers underground, connecting the royal quarters of Amber Fort directly to the fortified military arsenal of Jaigarh Fort on the Cheel ka Teela ridge. In the event of a siege, the royal family could safely retreat without ever stepping outside into open terrain.'
    },
    {
      id: 'q4',
      question: 'How did the water cooling system work in the summer heat?',
      answer: 'Amber Fort utilized Persian water wheels driven by bullocks to lift water from Maota Lake through layered stone aqueducts. The water flowed down behind carved marble jali screens and through channels set into the palace floors, naturally cooling desert breezes from 45°C down to 28°C through evaporation before the air entered the queen’s chambers.'
    }
  ],
  'hawa-mahal': [
    {
      id: 'hq1',
      question: 'Why does Hawa Mahal have 953 windows?',
      answer: 'The 953 stone-screened casements (jharokhas) were designed by architect Lal Chand Ustad in 1799. They served two purposes: first, they allowed royal women to observe religious processions and street festivals through the fine lattice without breaking the purdah veil; second, the tapering miniature windows exploited the Venturi effect, sucking in hot dry air and expelling it as a chilled breeze.'
    },
    {
      id: 'hq2',
      question: 'Why is it built without a conventional foundation?',
      answer: 'Because Hawa Mahal was built primarily as a lightweight crown-shaped facade extension to the City Palace complex rather than a heavy fortress, it sits upon a shallow stone base with a gentle pyramid taper, leaning back at an angle of 85 degrees to maintain balance without deep basement foundations.'
    }
  ],
  'city-palace': [
    {
      id: 'cq1',
      question: 'What is the story behind the giant silver Gangajalis?',
      answer: 'In 1902, Maharaja Sawai Madho Singh II prepared to travel to London for the coronation of King Edward VII. As a devout Hindu, he refused to drink European tap water. He commissioned local silversmiths to melt down 14,000 silver coins into two mammoth 340-kilogram urns holding 4,000 liters of sacred water from the Ganga, entering the Guinness Book of World Records as the largest single sterling silver objects in the world.'
    },
    {
      id: 'cq2',
      question: 'What do the four seasonal gates in the courtyard represent?',
      answer: 'In Pritam Niwas Chowk, the four gates celebrate the seasons: the Peacock Gate represents Autumn and Lord Krishna; the Lotus Gate represents Summer and Lord Shiva; the Rose Gate represents Winter and Goddess Devi; and the Green Leheriya Gate represents Spring and Lord Ganesha.'
    }
  ]
};

export const generateAIResponse = (monumentId, userQuestion) => {
  const qLower = userQuestion.toLowerCase();
  
  // Check preset questions for monument
  const presets = PRESET_GUIDE_QUESTIONS[monumentId] || PRESET_GUIDE_QUESTIONS['amber-fort'];
  const matched = presets.find(p => 
    qLower.includes(p.question.toLowerCase().slice(0, 15)) ||
    (qLower.includes('entrance') && p.question.includes('entrance')) ||
    (qLower.includes('mirror') && p.question.includes('Sheesh')) ||
    (qLower.includes('tunnel') && p.question.includes('tunnel')) ||
    (qLower.includes('water') && p.question.includes('water')) ||
    (qLower.includes('window') && p.question.includes('windows')) ||
    (qLower.includes('silver') && p.question.includes('silver'))
  );

  if (matched) return matched.answer;

  // Contextual fallback response
  return `That is a wonderful historical inquiry about this monument. In Rajput and Mughal architectural treatises, every archway, courtyard orientation, and decorative motif was meticulously calculated according to Vastu geometry, climate thermodynamics, and imperial royal protocol. The artisans embedded both spiritual symbolism and defensive mastery into these stones to ensure the legacy would withstand centuries.`;
};
