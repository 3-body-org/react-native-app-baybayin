const quizData = {
  words: [
    // Easy (1-syllable words)
    { latin: "AKO", baybayin: "ᜀᜃᜓ", meaning: "I, me", difficulty: "Easy" },
    { latin: "IKAW", baybayin: "ᜁᜃᜏ", meaning: "You", difficulty: "Easy" },
    { latin: "MATA", baybayin: "ᜋᜆ", meaning: "Eye", difficulty: "Easy" },
    { latin: "TAO", baybayin: "ᜆᜂ", meaning: "Person", difficulty: "Easy" },
    { latin: "BUKO", baybayin: "ᜊᜓᜃᜓ", meaning: "Coconut", difficulty: "Easy" },
    { latin: "GABI", baybayin: "ᜄᜊᜁ", meaning: "Night", difficulty: "Easy" },
    { latin: "HALIK", baybayin: "ᜑᜎᜒᜃ᜔", meaning: "Kiss", difficulty: "Easy" },
    
    // Medium (2-syllable words)
    { latin: "KAMAY", baybayin: "ᜃᜋᜌ᜔", meaning: "Hand", difficulty: "Average" },
    { latin: "BAHAY", baybayin: "ᜊᜑᜌ᜔", meaning: "House", difficulty: "Average" },
    { latin: "MAGANDA", baybayin: "ᜋᜄᜈ᜔ᜇᜀ", meaning: "Beautiful", difficulty: "Average" },
    { latin: "MABUTI", baybayin: "ᜋᜊᜓᜆᜒ", meaning: "Good", difficulty: "Average" },
    { latin: "UMAGA", baybayin: "ᜂᜋᜄᜀ", meaning: "Morning", difficulty: "Average" },
    { latin: "TAON", baybayin: "ᜆᜂᜈ᜔", meaning: "Year", difficulty: "Average" },
    { latin: "BAYAN", baybayin: "ᜊᜌᜈ᜔", meaning: "Country", difficulty: "Average" },
    { latin: "MAGULANG", baybayin: "ᜋᜄᜓᜎᜅ᜔", meaning: "Parent", difficulty: "Average" },
    { latin: "KAPITBAHAY", baybayin: "ᜃᜉᜒᜆ᜔ᜊᜑᜌ᜔", meaning: "Neighbor", difficulty: "Average" },
    { latin: "KAPATID", baybayin: "ᜃᜉᜆᜒᜇ᜔", meaning: "Sibling", difficulty: "Average" },
    
    // Hard (3+ syllable words)
    { latin: "KAPAMILYA", baybayin: "ᜃᜉᜋᜒᜎᜌ", meaning: "Family", difficulty: "Hard" },
    { latin: "KAPATIRAN", baybayin: "ᜃᜉᜆᜒᜇᜈ᜔", meaning: "Brotherhood", difficulty: "Hard" },
    { latin: "KASALANAN", baybayin: "ᜃᜐᜎᜈᜈ᜔", meaning: "Sin", difficulty: "Hard" },
    { latin: "KAPANGYARIHAN", baybayin: "ᜃᜉᜅ᜔ᜌᜇᜒᜑᜈ᜔", meaning: "Power", difficulty: "Hard" },
    { latin: "KAPALARAN", baybayin: "ᜃᜉᜎᜇᜈ᜔", meaning: "Destiny", difficulty: "Hard" }
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
  
    // KATINIG + PANGALTAS (KRUS)
    "ᜊ᜔", // B
    "ᜃ᜔", // K
    "ᜄ᜔", // G
    "ᜅ᜔", // NG
    "ᜆ᜔", // T
    "ᜇ᜔", // D / R
    "ᜈ᜔", // N
    "ᜉ᜔", // P
    "ᜎ᜔", // L
    "ᜋ᜔", // M
    "ᜌ᜔", // Y
    "ᜏ᜔", // W
    "ᜐ᜔", // S
    "ᜑ᜔", // H
  ];
  
  

// Game configuration
const gameConfig = {
  lives: {
    maxLives: 3,
    loseLifeOnWrong: true
  },
  scoring: {
    correctAnswer: 10
  },
  questions: {
    totalQuestions: 10
  }
};



export { quizData, gameConfig, baybayinCharacters };
  