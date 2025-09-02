const quizData = {
  words: [
    { latin: "AKO", baybayin: "ᜀᜃᜓ", meaning: "I, me" },
    { latin: "IKAW", baybayin: "ᜁᜃᜏ", meaning: "You" },
    { latin: "MATA", baybayin: "ᜋᜆ", meaning: "Eye" },
    { latin: "TAO", baybayin: "ᜆᜂ", meaning: "Person" },
    { latin: "BUKO", baybayin: "ᜊᜓᜃᜓ", meaning: "Coconut" },
    { latin: "GABI", baybayin: "ᜄᜊᜁ", meaning: "Night" },
    { latin: "HALIK", baybayin: "ᜑᜎᜒᜃ᜔", meaning: "Kiss" },
    { latin: "KAMAY", baybayin: "ᜃᜋᜌ᜔", meaning: "Hand" },
    { latin: "BAHAY", baybayin: "ᜊᜑᜌ᜔", meaning: "House" },
    { latin: "MAGANDA", baybayin: "ᜋᜄᜈ᜔ᜇᜀ", meaning: "Beautiful" },
    { latin: "MABUTI", baybayin: "ᜋᜊᜓᜆᜒ", meaning: "Good" },
    { latin: "UMAGA", baybayin: "ᜂᜋᜄᜀ", meaning: "Morning" },
    { latin: "TAON", baybayin: "ᜆᜂᜈ᜔", meaning: "Year" },
    { latin: "BAYAN", baybayin: "ᜊᜌᜈ᜔", meaning: "Country" },
    { latin: "MAGULANG", baybayin: "ᜋᜄᜓᜎᜅ᜔", meaning: "Parent" },
    { latin: "KAPITBAHAY", baybayin: "ᜃᜉᜒᜆ᜔ᜊᜑᜌ᜔", meaning: "Neighbor" },
    { latin: "KAPATID", baybayin: "ᜃᜉᜆᜒᜇ᜔", meaning: "Sibling" },
    { latin: "KAPAMILYA", baybayin: "ᜃᜉᜋᜒᜎᜌ", meaning: "Family" },
    { latin: "KAPATIRAN", baybayin: "ᜃᜉᜆᜒᜇᜈ᜔", meaning: "Brotherhood" },
    { latin: "KASALANAN", baybayin: "ᜃᜐᜎᜈᜈ᜔", meaning: "Sin" },
    { latin: "KAPANGYARIHAN", baybayin: "ᜃᜉᜅ᜔ᜌᜇᜒᜑᜈ᜔", meaning: "Power" },
    { latin: "KAPALARAN", baybayin: "ᜃᜉᜎᜇᜈ᜔", meaning: "Destiny" }
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
  
    // PANGALTAS (KRUS) - Individual tiles
    "᜔" // Pangaltas
  ];
  
  

// Pangaltas replacement symbol for display
const pangaltasReplacement = "×"; // Using × symbol for better visibility

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



export { quizData, gameConfig, baybayinCharacters, pangaltasReplacement };
  