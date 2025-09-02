// Quiz data for Fill-in-the-Baybayin feature
const quizData = {
  // All words combined with difficulty levels
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
    { latin: "KAMAY", baybayin: "ᜃᜋᜌ᜔", meaning: "Hand", difficulty: "Medium" },
    { latin: "BAHAY", baybayin: "ᜊᜑᜌ᜔", meaning: "House", difficulty: "Medium" },
    { latin: "MAGANDA", baybayin: "ᜋᜄᜈ᜔ᜇᜀ", meaning: "Beautiful", difficulty: "Medium" },
    { latin: "MABUTI", baybayin: "ᜋᜊᜓᜆᜒ", meaning: "Good", difficulty: "Medium" },
    { latin: "UMAGA", baybayin: "ᜂᜋᜄᜀ", meaning: "Morning", difficulty: "Medium" },
    { latin: "TAON", baybayin: "ᜆᜂᜈ᜔", meaning: "Year", difficulty: "Medium" },
    { latin: "BAYAN", baybayin: "ᜊᜌᜈ᜔", meaning: "Country", difficulty: "Medium" },
    { latin: "MAGULANG", baybayin: "ᜋᜄᜓᜎᜅ᜔", meaning: "Parent", difficulty: "Medium" },
    { latin: "KAPITBAHAY", baybayin: "ᜃᜉᜒᜆ᜔ᜊᜑᜌ᜔", meaning: "Neighbor", difficulty: "Medium" },
    { latin: "KAPATID", baybayin: "ᜃᜉᜆᜒᜇ᜔", meaning: "Sibling", difficulty: "Medium" },
    
    // Hard (3+ syllable words)
    { latin: "KAPAMILYA", baybayin: "ᜃᜉᜋᜒᜎᜌ", meaning: "Family", difficulty: "Hard" },
    { latin: "KAPATIRAN", baybayin: "ᜃᜉᜆᜒᜇᜈ᜔", meaning: "Brotherhood", difficulty: "Hard" },
    { latin: "KASALANAN", baybayin: "ᜃᜐᜎᜈᜈ᜔", meaning: "Sin", difficulty: "Hard" },
    { latin: "KAPANGYARIHAN", baybayin: "ᜃᜉᜅ᜔ᜌᜇᜒᜑᜈ᜔", meaning: "Power", difficulty: "Hard" },
    { latin: "KAPALARAN", baybayin: "ᜃᜉᜎᜇᜈ᜔", meaning: "Destiny", difficulty: "Hard" }
  ]
};
  
  // Baybayin character mapping for tile generation
  const baybayinCharacters = {
    katinig: [
      { character: "ᜊ", latin: "BA", sound: "/ba/" },
      { character: "ᜃ", latin: "KA", sound: "/ka/" },
      { character: "ᜄ", latin: "GA", sound: "/ga/" },
      { character: "ᜅ", latin: "NGA", sound: "/ŋa/" },
      { character: "ᜆ", latin: "TA", sound: "/ta/" },
      { character: "ᜇ", latin: "DA / RA", sound: "/da/ o /ra/" },
      { character: "ᜈ", latin: "NA", sound: "/na/" },
      { character: "ᜉ", latin: "PA", sound: "/pa/" },
      { character: "ᜎ", latin: "LA", sound: "/la/" },
      { character: "ᜋ", latin: "MA", sound: "/ma/" },
      { character: "ᜌ", latin: "YA", sound: "/ya/" },
      { character: "ᜏ", latin: "WA", sound: "/wa/" },
      { character: "ᜐ", latin: "SA", sound: "/sa/" },
      { character: "ᜑ", latin: "HA", sound: "/ha/" }
    ]
  };
  

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
  