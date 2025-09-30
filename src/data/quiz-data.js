const quizData = {
  // PINAGMULAN NG WIKA - Basic foundational words
  pinagmulan: [
    { latin: "WIKA", baybayin: "ᜏᜒᜃ", inputCount: 2, meaning: "Language" },
    { latin: "BUHAY", baybayin: "ᜊᜓᜑᜌ᜔", inputCount: 3, meaning: "Life" },
    { latin: "TAO", baybayin: "ᜆᜂ", inputCount: 2, meaning: "Person" },
    { latin: "BAYAN", baybayin: "ᜊᜌᜈ᜔", inputCount: 3, meaning: "Country" },
    { latin: "PAGSULAT", baybayin: "ᜉᜄ᜔ᜐᜓᜎᜆ᜔", inputCount: 5, meaning: "Writing" },
    { latin: "BAYBAYIN", baybayin: "ᜊᜌ᜔ᜊᜌᜒᜈ᜔", inputCount: 5, meaning: "Baybayin script" },
    { latin: "KASAYSAYAN", baybayin: "ᜃᜐᜌ᜔ᜐᜌᜈ᜔", inputCount: 6, meaning: "History" },
    { latin: "KULTURA", baybayin: "ᜃᜓᜎ᜔ᜆᜓᜇ", inputCount: 4, meaning: "Culture" },
    { latin: "PILIPINAS", baybayin: "ᜉᜒᜎᜒᜉᜒᜈᜐ᜔", inputCount: 5, meaning: "Philippines" },
    { latin: "KATUTUBO", baybayin: "ᜃᜆᜓᜆᜓᜊᜓ", inputCount: 4, meaning: "Indigenous" }
  ],

  // PATINIG - Words focusing on vowel sounds
  patinig: [
    { latin: "AKO", baybayin: "ᜀᜃᜓ", inputCount: 2, meaning: "I, me" },
    { latin: "IKAW", baybayin: "ᜁᜃᜏ᜔", inputCount: 3, meaning: "You" },
    { latin: "UMAGA", baybayin: "ᜂᜋᜄ", inputCount: 3, meaning: "Morning" },
    { latin: "ITO", baybayin: "ᜁᜆᜓ", inputCount: 2, meaning: "This" },
    { latin: "UNA", baybayin: "ᜂᜈ", inputCount: 2, meaning: "First" },
    { latin: "ARAW", baybayin: "ᜀᜇᜏ᜔", inputCount: 3, meaning: "Day/Sun" },
    { latin: "APOY", baybayin: "ᜀᜉᜓᜌ᜔", inputCount: 3, meaning: "Fire" },
    { latin: "USO", baybayin: "ᜂᜐᜓ", inputCount: 2, meaning: "Trend" },
    { latin: "ORAS", baybayin: "ᜂᜇ", inputCount: 2, meaning: "Hour" },
    { latin: "EDEN", baybayin: "ᜁᜇᜒᜈ᜔", inputCount: 3, meaning: "Eden" }
  ],

  // KATINIG - Words emphasizing consonant sounds
  katinig: [
    { latin: "BAYANI", baybayin: "ᜊᜌᜈᜒ", inputCount: 3, meaning: "Hero" },
    { latin: "KAMA", baybayin: "ᜃᜋ", inputCount: 2, meaning: "Bed" },
    { latin: "GABI", baybayin: "ᜄᜊᜁ", inputCount: 3, meaning: "Night" },
    { latin: "DAAN", baybayin: "ᜇᜀᜈ᜔", inputCount: 3, meaning: "Road" },
    { latin: "HALIK", baybayin: "ᜑᜎᜒᜃ᜔", inputCount: 3, meaning: "Kiss" },
    { latin: "LUPA", baybayin: "ᜎᜓᜉ", inputCount: 2, meaning: "Land" },
    { latin: "MATA", baybayin: "ᜋᜆ", inputCount: 2, meaning: "Eye" },
    { latin: "NANAY", baybayin: "ᜈᜈᜌ᜔", inputCount: 3, meaning: "Mother" },
    { latin: "SAYA", baybayin: "ᜐᜌ", inputCount: 2, meaning: "Joy" },
    { latin: "PAMILYA", baybayin: "ᜉᜋᜒᜎᜌ", inputCount: 4, meaning: "Family" }
  ],

  // KUDLIT - Words demonstrating kudlit usage
  kudlit: [
    { latin: "BILI", baybayin: "ᜊᜒᜎᜒ", inputCount: 2, meaning: "Buy" },
    { latin: "BUKO", baybayin: "ᜊᜓᜃᜓ", inputCount: 2, meaning: "Coconut" },
    { latin: "KITI", baybayin: "ᜃᜒᜆᜒ", inputCount: 2, meaning: "Tick" },
    { latin: "KUNO", baybayin: "ᜃᜓᜈᜓ", inputCount: 2, meaning: "Pretend" },
    { latin: "DITO", baybayin: "ᜇᜒᜆᜓ", inputCount: 2, meaning: "Here" },
    { latin: "GULO", baybayin: "ᜄᜓᜎᜓ", inputCount: 2, meaning: "Chaos" },
    { latin: "HULI", baybayin: "ᜑᜓᜎᜒ", inputCount: 2, meaning: "Late/Catch" },
    { latin: "LILO", baybayin: "ᜎᜒᜎᜓ", inputCount: 2, meaning: "Bathe" },
    { latin: "MULI", baybayin: "ᜋᜓᜎᜒ", inputCount: 2, meaning: "Again" },
    { latin: "SUKI", baybayin: "ᜐᜓᜃᜒ", inputCount: 2, meaning: "Regular customer" }
  ],

  // PANGALTAS - Words with consonant endings
  pangaltas: [
    { latin: "KAMAY", baybayin: "ᜃᜋᜌ᜔", inputCount: 3, meaning: "Hand" },
    { latin: "BAHAY", baybayin: "ᜊᜑᜌ᜔", inputCount: 3, meaning: "House" },
    { latin: "TAON", baybayin: "ᜆᜂᜈ᜔", inputCount: 3, meaning: "Year" },
    { latin: "KAPATID", baybayin: "ᜃᜉᜆᜒᜇ᜔", inputCount: 4, meaning: "Sibling" },
    { latin: "MAGULANG", baybayin: "ᜋᜄᜓᜎᜅ᜔", inputCount: 4, meaning: "Parent" },
    { latin: "ASIN", baybayin: "ᜀᜐᜒᜈ᜔", inputCount: 3, meaning: "Salt" },
    { latin: "ULAN", baybayin: "ᜂᜎᜈ᜔", inputCount: 3, meaning: "Rain" },
    { latin: "HANGIN", baybayin: "ᜑᜅᜒᜈ᜔", inputCount: 3, meaning: "Wind" },
    { latin: "LANGIT", baybayin: "ᜎᜅᜒᜆ᜔", inputCount: 3, meaning: "Sky" },
    { latin: "TUBIG", baybayin: "ᜆᜓᜊᜒᜄ᜔", inputCount: 3, meaning: "Water" }
  ],

  // DANDA - Complete sentences with punctuation
  danda: [
    { latin: "MABUTI", baybayin: "ᜋᜊᜓᜆᜒ᜵", inputCount: 4, meaning: "Good." },
    { latin: "MAGANDA", baybayin: "ᜋᜄᜈ᜔ᜇ᜵", inputCount: 5, meaning: "Beautiful." },
    { latin: "MALAKI", baybayin: "ᜋᜎᜃᜒ᜵", inputCount: 4, meaning: "Big." },
    { latin: "MALIIT", baybayin: "ᜋᜎᜒᜁᜆ᜔᜵", inputCount: 5, meaning: "Small." },
    { latin: "MASARAP", baybayin: "ᜋᜐᜇᜉ᜔᜵", inputCount: 5, meaning: "Delicious." },
    { latin: "MAINIT", baybayin: "ᜋᜁᜈᜒᜆ᜔᜵", inputCount: 5, meaning: "Hot." },
    { latin: "MALAMIG", baybayin: "ᜋᜎᜋᜒᜄ᜔᜵", inputCount: 5, meaning: "Cold." },
    { latin: "MASAYA", baybayin: "ᜋᜐᜌ᜵", inputCount: 4, meaning: "Happy." },
    { latin: "MALUNGKOT", baybayin: "ᜋᜎᜓᜅ᜔ᜃᜓᜆ᜔᜵", inputCount: 6, meaning: "Sad." },
    { latin: "MABAIT", baybayin: "ᜋᜊᜁᜆ᜔᜵", inputCount: 5, meaning: "Kind." }
  ]
};

// Baybayin character mapping for tile generation
const baybayinCharacters = [
  // PATINIG
  "ᜀ", // A
  "ᜁ", // I / E
  "ᜂ", // U / O

  // KATINIG + KUDLIT
  "ᜊ", "ᜊᜒ", "ᜊᜓ", // BA, BE/BI, BO/BU
  "ᜃ", "ᜃᜒ", "ᜃᜓ", // KA, KE/KI, KO/KU
  "ᜄ", "ᜄᜒ", "ᜄᜓ", // GA, GE/GI, GO/GU
  "ᜅ", "ᜅᜒ", "ᜅᜓ", // NGA, NGE/NGI, NGO/NGU
  "ᜆ", "ᜆᜒ", "ᜆᜓ", // TA, TE/TI, TO/TU
  "ᜇ", "ᜇᜒ", "ᜇᜓ", // DA/RA, DE/DI, DO/DU
  "ᜈ", "ᜈᜒ", "ᜈᜓ", // NA, NE/NI, NO/NU
  "ᜉ", "ᜉᜒ", "ᜉᜓ", // PA, PE/PI, PO/PU
  "ᜎ", "ᜎᜒ", "ᜎᜓ", // LA, LE/LI, LO/LU
  "ᜋ", "ᜋᜒ", "ᜋᜓ", // MA, ME/MI, MO/MU
  "ᜌ", "ᜌᜒ", "ᜌᜓ", // YA, YE/YI, YO/YU
  "ᜏ", "ᜏᜒ", "ᜏᜓ", // WA, WE/WI, WO/WU
  "ᜐ", "ᜐᜒ", "ᜐᜓ", // SA, SE/SI, SO/SU
  "ᜑ", "ᜑᜒ", "ᜑᜓ", // HA, HE/HI, HO/HU

  // PANGALTAS & PUNCTUATION
  "᜔", // Pangaltas (Virama)
  "᜵"  // Danda (Period)
];

// Game configuration
const gameConfig = {
  lives: {
    maxLives: 3,
    loseLifeOnWrong: true
  },
  scoring: {
    correctAnswer: 10,
    bonusForSpeed: 5
  },
  questions: {
    questionsPerLesson: 10,
    totalLessons: 6
  },
  difficulty: {
    easy: { lessonIds: ["patinig", "katinig"] },
    medium: { lessonIds: ["kudlit", "pangaltas"] },
    hard: { lessonIds: ["pinagmulan", "danda"] }
  }
};

// Helper functions
const getQuizByLesson = (lessonId) => {
  return quizData[lessonId] || [];
};

const getRandomWordsFromLesson = (lessonId, count = 10) => {
  const lessonWords = quizData[lessonId] || [];
  if (lessonWords.length <= count) return lessonWords;
  
  const shuffled = [...lessonWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getAllWords = () => {
  return Object.values(quizData).flat();
};

export { 
  quizData, 
  baybayinCharacters, 
  gameConfig, 
  getQuizByLesson, 
  getRandomWordsFromLesson, 
  getAllWords 
};