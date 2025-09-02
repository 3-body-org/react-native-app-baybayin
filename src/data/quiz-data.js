// Quiz data for Fill-in-the-Baybayin feature
const quizData = {
    // Level 1: 1-syllable words (Beginner)
    level1: {
      title: "Mga Salitang Isang Pantig",
      description: "Mga simpleng salita na isang pantig lamang",
      words: [
        { latin: "AKO", baybayin: "ᜀᜃᜓ", meaning: "I, me", difficulty: 1 },
        { latin: "IKAW", baybayin: "ᜁᜃᜏ", meaning: "You", difficulty: 1 },
        { latin: "MATA", baybayin: "ᜋᜆ", meaning: "Eye", difficulty: 1 },
        { latin: "TAO", baybayin: "ᜆᜂ", meaning: "Person", difficulty: 1 },
        { latin: "BUKO", baybayin: "ᜊᜓᜃᜓ", meaning: "Coconut", difficulty: 1 },
        { latin: "GABI", baybayin: "ᜄᜊᜁ", meaning: "Night", difficulty: 1 },
        { latin: "HALIK", baybayin: "ᜑᜎᜒᜃ᜔", meaning: "Kiss", difficulty: 1 }
      ]
    },
  
    // Level 2: 2-syllable words (Intermediate)
    level2: {
      title: "Mga Salitang Dalawang Pantig",
      description: "Mga salita na dalawang pantig",
      words: [
        { latin: "KAMAY", baybayin: "ᜃᜋᜌ᜔", meaning: "Hand", difficulty: 2 },
        { latin: "BAHAY", baybayin: "ᜊᜑᜌ᜔", meaning: "House", difficulty: 2 },
        { latin: "MAGANDA", baybayin: "ᜋᜄᜈ᜔ᜇᜀ", meaning: "Beautiful", difficulty: 2 },
        { latin: "MABUTI", baybayin: "ᜋᜊᜓᜆᜒ", meaning: "Good", difficulty: 2 },
        { latin: "UMAGA", baybayin: "ᜂᜋᜄᜀ", meaning: "Morning", difficulty: 2 },
        { latin: "TAON", baybayin: "ᜆᜂᜈ᜔", meaning: "Year", difficulty: 2 },
        { latin: "BAYAN", baybayin: "ᜊᜌᜈ᜔", meaning: "Country", difficulty: 2 },
        { latin: "MAGULANG", baybayin: "ᜋᜄᜓᜎᜅ᜔", meaning: "Parent", difficulty: 2 },
        { latin: "KAPITBAHAY", baybayin: "ᜃᜉᜒᜆ᜔ᜊᜑᜌ᜔", meaning: "Neighbor", difficulty: 2 },
        { latin: "KAPATID", baybayin: "ᜃᜉᜆᜒᜇ᜔", meaning: "Sibling", difficulty: 2 }
      ]
    },
  
    // Level 3: 3+ syllable words (Advanced)
    level3: {
      title: "Mga Salitang Tatlo o Higit Pang Pantig",
      description: "Mga masalimuot na salita na tatlo o higit pang pantig",
      words: [
        { latin: "KAPAMILYA", baybayin: "ᜃᜉᜋᜒᜎᜌ", meaning: "Family", difficulty: 3 },
        { latin: "KAPATIRAN", baybayin: "ᜃᜉᜆᜒᜇᜈ᜔", meaning: "Brotherhood", difficulty: 3 },
        { latin: "KASALANAN", baybayin: "ᜃᜐᜎᜈᜈ᜔", meaning: "Sin", difficulty: 3 },
        { latin: "KAPANGYARIHAN", baybayin: "ᜃᜉᜅ᜔ᜌᜇᜒᜑᜈ᜔", meaning: "Power", difficulty: 3 },
        { latin: "KAPALARAN", baybayin: "ᜃᜉᜎᜇᜈ᜔", meaning: "Destiny", difficulty: 3 }
      ]
    }
  };
  
  // Baybayin character mapping for tile generation
  const baybayinCharacters = {
    patinig: [
      { character: "ᜀ", latin: "A", sound: "/a/" },
      { character: "ᜁ", latin: "I / E", sound: "/i/ o /e/" },
      { character: "ᜂ", latin: "U / O", sound: "/u/ o /o/" }
    ],
  
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
    ],
  
    kudlit: [
      { character: "ᜒ", latin: "Kudlit sa Itaas", sound: "/e/ o /i/" },
      { character: "ᜓ", latin: "Kudlit sa Ibaba", sound: "/o/ o /u/" }
    ],
  
    special: [
      { character: "᜴", latin: "Virama", sound: "Walang patinig" },
      { character: "᜵", latin: "Danda", sound: "Tuldok ng pangungusap" }
    ]
  };
  