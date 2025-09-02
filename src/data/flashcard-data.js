const flashcardCategories = {
  patinig: {
    cards: [
      { baybayin: "ᜀ", letter: "A", sound: "/a/" },
      { baybayin: "ᜁ", letter: "I / E", sound: "/i/ o /e/" },
      { baybayin: "ᜂ", letter: "U / O", sound: "/u/ o /o/" },
    ]
  },

  katinig: {
    cards: [
      // BA series
      { baybayin: "ᜊ", letter: "BA", sound: "/ba/" },
      { baybayin: "ᜊᜒ", letter: "BE / BI", sound: "/be/ o /bi/" },
      { baybayin: "ᜊᜓ", letter: "BO / BU", sound: "/bo/ o /bu/" },
      { baybayin: "ᜊ᜔", letter: "B", sound: "/b/" },

      // KA series
      { baybayin: "ᜃ", letter: "KA", sound: "/ka/" },
      { baybayin: "ᜃᜒ", letter: "KE / KI", sound: "/ke/ o /ki/" },
      { baybayin: "ᜃᜓ", letter: "KO / KU", sound: "/ko/ o /ku/" },
      { baybayin: "ᜃ᜔", letter: "K", sound: "/k/" },

      // DA / RA series
      { baybayin: "ᜇ", letter: "DA / RA", sound: "/da/ o /ra/" },
      { baybayin: "ᜇᜒ", letter: "DE / DI / RE / RI", sound: "/de/ /di/ /re/ /ri/" },
      { baybayin: "ᜇᜓ", letter: "DO / DU / RO / RU", sound: "/do/ /du/ /ro/ /ru/" },
      { baybayin: "ᜇ᜔", letter: "D / R", sound: "/d/ o /r/" },

      // GA series
      { baybayin: "ᜄ", letter: "GA", sound: "/ga/" },
      { baybayin: "ᜄᜒ", letter: "GE / GI", sound: "/ge/ o /gi/" },
      { baybayin: "ᜄᜓ", letter: "GO / GU", sound: "/go/ o /gu/" },
      { baybayin: "ᜄ᜔", letter: "G", sound: "/g/" },

      // HA series
      { baybayin: "ᜑ", letter: "HA", sound: "/ha/" },
      { baybayin: "ᜑᜒ", letter: "HE / HI", sound: "/he/ o /hi/" },
      { baybayin: "ᜑᜓ", letter: "HO / HU", sound: "/ho/ o /hu/" },
      { baybayin: "ᜑ᜔", letter: "H", sound: "/h/" },

      // LA series
      { baybayin: "ᜎ", letter: "LA", sound: "/la/" },
      { baybayin: "ᜎᜒ", letter: "LE / LI", sound: "/le/ o /li/" },
      { baybayin: "ᜎᜓ", letter: "LO / LU", sound: "/lo/ o /lu/" },
      { baybayin: "ᜎ᜔", letter: "L", sound: "/l/" },

      // MA series
      { baybayin: "ᜋ", letter: "MA", sound: "/ma/" },
      { baybayin: "ᜋᜒ", letter: "ME / MI", sound: "/me/ o /mi/" },
      { baybayin: "ᜋᜓ", letter: "MO / MU", sound: "/mo/ o /mu/" },
      { baybayin: "ᜋ᜔", letter: "M", sound: "/m/" },

      // NA series
      { baybayin: "ᜈ", letter: "NA", sound: "/na/" },
      { baybayin: "ᜈᜒ", letter: "NE / NI", sound: "/ne/ o /ni/" },
      { baybayin: "ᜈᜓ", letter: "NO / NU", sound: "/no/ o /nu/" },
      { baybayin: "ᜈ᜔", letter: "N", sound: "/n/" },

      // NGA series
      { baybayin: "ᜅ", letter: "NGA", sound: "/ŋa/" },
      { baybayin: "ᜅᜒ", letter: "NGE / NGI", sound: "/ŋe/ o /ŋi/" },
      { baybayin: "ᜅᜓ", letter: "NGO / NGU", sound: "/ŋo/ o /ŋu/" },
      { baybayin: "ᜅ᜔", letter: "NG", sound: "/ŋ/" },

      // PA series
      { baybayin: "ᜉ", letter: "PA", sound: "/pa/" },
      { baybayin: "ᜉᜒ", letter: "PE / PI", sound: "/pe/ o /pi/" },
      { baybayin: "ᜉᜓ", letter: "PO / PU", sound: "/po/ o /pu/" },
      { baybayin: "ᜉ᜔", letter: "P", sound: "/p/" },

      // SA series
      { baybayin: "ᜐ", letter: "SA", sound: "/sa/" },
      { baybayin: "ᜐᜒ", letter: "SE / SI", sound: "/se/ o /si/" },
      { baybayin: "ᜐᜓ", letter: "SO / SU", sound: "/so/ o /su/" },
      { baybayin: "ᜐ᜔", letter: "S", sound: "/s/" },

      // TA series
      { baybayin: "ᜆ", letter: "TA", sound: "/ta/" },
      { baybayin: "ᜆᜒ", letter: "TE / TI", sound: "/te/ o /ti/" },
      { baybayin: "ᜆᜓ", letter: "TO / TU", sound: "/to/ o /tu/" },
      { baybayin: "ᜆ᜔", letter: "T", sound: "/t/" },

      // WA series
      { baybayin: "ᜏ", letter: "WA", sound: "/wa/" },
      { baybayin: "ᜏᜒ", letter: "WE / WI", sound: "/we/ o /wi/" },
      { baybayin: "ᜏᜓ", letter: "WO / WU", sound: "/wo/ o /wu/" },
      { baybayin: "ᜏ᜔", letter: "W", sound: "/w/" },

      // YA series
      { baybayin: "ᜌ", letter: "YA", sound: "/ya/" },
      { baybayin: "ᜌᜒ", letter: "YE / YI", sound: "/ye/ o /yi/" },
      { baybayin: "ᜌᜓ", letter: "YO / YU", sound: "/yo/ o /yu/" },
      { baybayin: "ᜌ᜔", letter: "Y", sound: "/y/" },
    ]
  },

  special: {
    cards: [
      { baybayin: "᜔", letter: "Virama", sound: "removes vowel", description: "Ginagamit para tanggalin ang patinig" },
      { baybayin: "᜵", letter: "Danda", sound: "•", description: "Tuldok o period sa dulo ng pangungusap" },
      { baybayin: "᜶", letter: "Double Danda", sound: "••", description: "Ginagamit bilang pagtatapos ng talata o pahayag" },
    ]
  }
};

export default flashcardCategories;
