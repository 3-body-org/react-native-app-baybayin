// Quiz data for Fill-in-the-Baybayin feature
const quizData = {
    // Level 1: 1-syllable words (Beginner)
    level1: {
      title: "Mga Salitang Isang Pantig",
      description: "Mga simpleng salita na isang pantig lamang",
      words: [
        { latin: "AKO", baybayin: "ᜀᜃᜓ", meaning: "I, me" },
        { latin: "IKAW", baybayin: "ᜁᜃᜏ", meaning: "You" },
        { latin: "MATA", baybayin: "ᜋᜆ", meaning: "Eye" },
        { latin: "TAO", baybayin: "ᜆᜂ", meaning: "Person" },
        { latin: "BUKO", baybayin: "ᜊᜓᜃᜓ", meaning: "Coconut" },
        { latin: "GABI", baybayin: "ᜄᜊᜁ", meaning: "Night" },
        { latin: "HALIK", baybayin: "ᜑᜎᜒᜃ᜔", meaning: "Kiss" }
      ]
    },
  
    // Level 2: 2-syllable words (Intermediate)
    level2: {
      title: "Mga Salitang Dalawang Pantig",
      description: "Mga salita na dalawang pantig",
      words: [
        { latin: "KAMAY", baybayin: "ᜃᜋᜌ᜔", meaning: "Hand" },
        { latin: "BAHAY", baybayin: "ᜊᜑᜌ᜔", meaning: "House" },
        { latin: "MAGANDA", baybayin: "ᜋᜄᜈ᜔ᜇᜀ", meaning: "Beautiful" },
        { latin: "MABUTI", baybayin: "ᜋᜊᜓᜆᜒ", meaning: "Good" },
        { latin: "UMAGA", baybayin: "ᜂᜋᜄᜀ", meaning: "Morning" },
        { latin: "TAON", baybayin: "ᜆᜂᜈ᜔", meaning: "Year" },
        { latin: "BAYAN", baybayin: "ᜊᜌᜈ᜔", meaning: "Country" },
        { latin: "MAGULANG", baybayin: "ᜋᜄᜓᜎᜅ᜔", meaning: "Parent" },
        { latin: "KAPITBAHAY", baybayin: "ᜃᜉᜒᜆ᜔ᜊᜑᜌ᜔", meaning: "Neighbor" },
        { latin: "KAPATID", baybayin: "ᜃᜉᜆᜒᜇ᜔", meaning: "Sibling" }
      ]
    },
  
    // Level 3: 3+ syllable words (Advanced)
    level3: {
      title: "Mga Salitang Tatlo o Higit Pang Pantig",
      description: "Mga masalimuot na salita na tatlo o higit pang pantig",
      words: [
        { latin: "KAPAMILYA", baybayin: "ᜃᜉᜋᜒᜎᜌ", meaning: "Family" },
        { latin: "KAPATIRAN", baybayin: "ᜃᜉᜆᜒᜇᜈ᜔", meaning: "Brotherhood" },
        { latin: "KASALANAN", baybayin: "ᜃᜐᜎᜈᜈ᜔", meaning: "Sin" },
        { latin: "KAPANGYARIHAN", baybayin: "ᜃᜉᜅ᜔ᜌᜇᜒᜑᜈ᜔", meaning: "Power" },
        { latin: "KAPALARAN", baybayin: "ᜃᜉᜎᜇᜈ᜔", meaning: "Destiny" }
      ]
    }
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
  timer: {
    enabled: true,
    defaultTime: 30,
    bonusThreshold: 10
  },
  scoring: {
    correctAnswer: 10,
    bonusTime: 5,
    streakBonus: 2
  },
  levels: {
    maxLevel: 3,
    unlockThreshold: 5
  }
};

// Achievements data
const achievements = {
  'baybayin-beginner': {
    id: 'baybayin-beginner',
    title: 'Baybayin Beginner',
    description: 'First correct answer!',
    icon: '🌱',
    unlocked: false
  },
  'speed-demon': {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: '5 correct answers in a row under 10 seconds each',
    icon: '⚡',
    unlocked: false
  },
  'translation-master': {
    id: 'translation-master',
    title: 'Translation Master',
    description: 'Perfect score on all questions',
    icon: '🏆',
    unlocked: false
  },
  'level-master': {
    id: 'level-master',
    title: 'Level Master',
    description: 'Reached the highest level',
    icon: '👑',
    unlocked: false
  }
};

export { quizData, gameConfig, achievements, baybayinCharacters };
  