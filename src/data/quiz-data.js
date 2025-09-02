const quizData = {
  words: [
    { latin: "AKO", baybayin: "ᜀᜃᜓ" },
    { latin: "IKAW", baybayin: "ᜁᜃᜏ" },
    { latin: "MATA", baybayin: "ᜋᜆ" },
    { latin: "TAO", baybayin: "ᜆᜂ" },
    { latin: "BUKO", baybayin: "ᜊᜓᜃᜓ" },
    { latin: "GABI", baybayin: "ᜄᜊᜁ" },
    { latin: "HALIK", baybayin: "ᜑᜎᜒᜃ᜔" },
    { latin: "KAMAY", baybayin: "ᜃᜋᜌ᜔" },
    { latin: "BAHAY", baybayin: "ᜊᜑᜌ᜔" },
    { latin: "MAGANDA", baybayin: "ᜋᜄᜈ᜔ᜇᜀ" },
    { latin: "MABUTI", baybayin: "ᜋᜊᜓᜆᜒ" },
    { latin: "UMAGA", baybayin: "ᜂᜋᜄᜀ" },
    { latin: "TAON", baybayin: "ᜆᜂᜈ᜔" },
    { latin: "BAYAN", baybayin: "ᜊᜌᜈ᜔" },
    { latin: "MAGULANG", baybayin: "ᜋᜄᜓᜎᜅ᜔" },
    { latin: "KAPITBAHAY", baybayin: "ᜃᜉᜒᜆ᜔ᜊᜑᜌ᜔" },
    { latin: "KAPATID", baybayin: "ᜃᜉᜆᜒᜇ᜔" },
    { latin: "KAPAMILYA", baybayin: "ᜃᜉᜋᜒᜎᜌ" },
    { latin: "KAPATIRAN", baybayin: "ᜃᜉᜆᜒᜇᜈ᜔" },
    { latin: "KASALANAN", baybayin: "ᜃᜐᜎᜈᜈ᜔" },
    { latin: "KAPANGYARIHAN", baybayin: "ᜃᜉᜅ᜔ᜌᜇᜒᜑᜈ᜔" },
    { latin: "KAPALARAN", baybayin: "ᜃᜉᜎᜇᜈ᜔" }
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
  