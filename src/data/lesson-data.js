// Lesson modules data
const lessonModules = {
  pinagmulan: {
    id: "pinagmulan",
    title: "Pinagmulan ng Wika",
    description: "Alamin ang kasaysayan at pinagmulan ng Baybayin",
    icon: "📚",
    contentTitle: "Ang Wikang Baybayin",
    content: [
      "Batid natin ang kahalagahan ng wika sa ating buhay. Ito ay isang instrumento ng pagkakaunawaan. Ayon sa mga propesor sa Komunikasyon na sina Emmert at Donaghy (1981), ang wika, kung ito ay pasalita, ay isang sistema ng mga sagisag na binubuo ng mga tunog; kung ito naman ay pasulat, ito ay iniuugnay natin sa mga kahulugang nais nating iparating sa ibang tao.",
      "Ngunit saan nga ba nagmula ang wika? Walang nakaaalam kung paano ito nagsimula ngunit maraming mga haka-haka at teorya tungkol sa pinagmulan ng wika. Ang mga lingguwistang nag-aaral at nagsuri ng wika ay nakakalap ng iba't ibang teoryang maaring magbigay-linaw sa pinagmulan ng wika, bagama't ang mga ito ay hindi makapagpapatunay o makapagpapabulaan sa pinanggalingan ng wika.",
      "Ang unang taong naninirahan sa Pilipinas ay nagtataglay na ng mga patakarang pangkabuhayan, kultura, at paniniwalang panrelihiyon. Gayundin, mahihinuha na sila man ay may sarili nang wikang ginagamit bagama't pinaniniwalaang walang isang wikang nanaig sa Pilipinas noon. Gayunpaman, napatunayang marunong sumulat at bumasa ang mga katutubo. May sinusunod silang pamamaraan na pagsulat na tinatawag na baybayin.",
      { type: "image", src: require("@assets/baybayin-patinig-katinig.webp") }
    ]
  },
  patinig: {
    id: "patinig",
    title: "Patinig",
    description: "Matuto ng mga patinig sa Baybayin",
    icon: "🔤",
    contentTitle: "Mga Patinig",
    content: [
      "Ang mga patinig ay mga tunog na hindi nangangailangan ng pagbabara ng hangin sa bibig. Sa Baybayin, may tatlong pangunahing patinig: A, I, at U.",
      "Ang patinig na A (ᜀ) ay binibigkas na /a/ tulad ng sa salitang 'ama'.",
      "Ang patinig na I (ᜁ) ay binibigkas na /i/ tulad ng sa salitang 'iti'.",
      "Ang patinig na U (ᜂ) ay binibigkas na /u/ tulad ng sa salitang 'ulo'."
    ],
    characters: [
      { baybayin: "ᜀ", latin: "A", pronunciation: "/a/", description: "Patinig na A" },
      { baybayin: "ᜁ", latin: "I o E", pronunciation: "/i/", description: "Patinig na I o E" },
      { baybayin: "ᜂ", latin: "U o O", pronunciation: "/u/", description: "Patinig na U o O" }
    ],
    examples: [
      { baybayin: "ᜀᜃᜓ", latin: "AKO", meaning: "I, me" },
      { baybayin: "ᜁᜃᜏ᜔", latin: "IKAW", meaning: "You" },
      { baybayin: "ᜂᜋᜄ", latin: "UMAGA", meaning: "Morning" }
    ]
  },
  katinig: {
    id: "katinig",
    title: "Katinig",
    description: "Matuto ng mga katinig sa Baybayin",
    icon: "🔠",
    contentTitle: "Mga Katinig",
    content: [
      "Ang mga katinig ay mga tunog na nangangailangan ng pagbabara ng hangin sa bibig. Sa Baybayin, may labing-apat na pangunahing katinig.",
      "Ang bawat katinig ay may kasamang tunog na patinig na /a/ kapag walang kudlit.",
      "Narito ang pagkakasunod ng mga pangunahing katinig sa Baybayin: BA, KA, DA, GA, HA, LA, MA, NA, SA, PA, RA, TA, WA, YA."
    ],
    characters: [
      { baybayin: "ᜊ", latin: "BA", pronunciation: "/ba/", description: "Katinig na BA" },
      { baybayin: "ᜃ", latin: "KA", pronunciation: "/ka/", description: "Katinig na KA" },
      { baybayin: "ᜇ", latin: "DA", pronunciation: "/da/", description: "Katinig na DA" },
      { baybayin: "ᜄ", latin: "GA", pronunciation: "/ga/", description: "Katinig na GA" },
      { baybayin: "ᜑ", latin: "HA", pronunciation: "/ha/", description: "Katinig na HA" },
      { baybayin: "ᜎ", latin: "LA", pronunciation: "/la/", description: "Katinig na LA" },
      { baybayin: "ᜋ", latin: "MA", pronunciation: "/ma/", description: "Katinig na MA" },
      { baybayin: "ᜈ", latin: "NA", pronunciation: "/na/", description: "Katinig na NA" },
      { baybayin: "ᜐ", latin: "SA", pronunciation: "/sa/", description: "Katinig na SA" },
      { baybayin: "ᜉ", latin: "PA", pronunciation: "/pa/", description: "Katinig na PA" },
      { baybayin: "ᜍ", latin: "RA", pronunciation: "/ra/", description: "Katinig na RA" },
      { baybayin: "ᜆ", latin: "TA", pronunciation: "/ta/", description: "Katinig na TA" },
      { baybayin: "ᜏ", latin: "WA", pronunciation: "/wa/", description: "Katinig na WA" },
      { baybayin: "ᜌ", latin: "YA", pronunciation: "/ya/", description: "Katinig na YA" }
    ],
    examples: [
      { baybayin: "ᜊᜌᜈᜒ", latin: "BAYANI", meaning: "Hero" },
      { baybayin: "ᜃᜋ", latin: "KAMA", meaning: "Bed" },
      { baybayin: "ᜑᜎᜒᜋ᜔ᜊᜏ", latin: "HALIMBAWA", meaning: "Example" },
      { baybayin: "ᜎᜒᜈ᜔ᜆ", latin: "LINTA", meaning: "Leech" }    
    ]
  },
  kudlit: {
    id: "kudlit",
    title: "Ang Paggamit ng Kudlit",
    description: "Matuto ng paggamit ng kudlit",
    icon: "⚡",
    contentTitle: "Mga Kudlit",
    content: [
      "Ang kudlit ay mga tuldok na ginagamit upang baguhin ang tunog ng isang karakter.",
      "Kudlit sa itaas (ᜒ) - nagbabago ang tunog sa /e/ o /i/",
      "Kudlit sa ibaba (ᜓ) - nagbabago ang tunog sa /o/ o /u/",
      { type: "image", src: require("@assets/kudlit-taas.webp") },
      { type: "image", src: require("@assets/kudlit-baba.webp") }
    ],
    characters: [
      // BA
      { baybayin: "ᜊᜒ", latin: "BE / BI", pronunciation: "/be/ o /bi/", description: "BA na may kudlit sa itaas" },
      { baybayin: "ᜊᜓ", latin: "BO / BU", pronunciation: "/bo/ o /bu/", description: "BA na may kudlit sa ibaba" },
    
      // KA
      { baybayin: "ᜃᜒ", latin: "KE / KI", pronunciation: "/ke/ o /ki/", description: "KA na may kudlit sa itaas" },
      { baybayin: "ᜃᜓ", latin: "KO / KU", pronunciation: "/ko/ o /ku/", description: "KA na may kudlit sa ibaba" },
    
      // DA / RA
      { baybayin: "ᜇᜒ", latin: "DE / DI", pronunciation: "/de/ o /di/", description: "DA na may kudlit sa itaas" },
      { baybayin: "ᜇᜓ", latin: "DO / DU", pronunciation: "/do/ o /du/", description: "DA na may kudlit sa ibaba" },
    
      // GA
      { baybayin: "ᜄᜒ", latin: "GE / GI", pronunciation: "/ge/ o /gi/", description: "GA na may kudlit sa itaas" },
      { baybayin: "ᜄᜓ", latin: "GO / GU", pronunciation: "/go/ o /gu/", description: "GA na may kudlit sa ibaba" },
    
      // HA
      { baybayin: "ᜑᜒ", latin: "HE / HI", pronunciation: "/he/ o /hi/", description: "HA na may kudlit sa itaas" },
      { baybayin: "ᜑᜓ", latin: "HO / HU", pronunciation: "/ho/ o /hu/", description: "HA na may kudlit sa ibaba" },
    
      // LA
      { baybayin: "ᜎᜒ", latin: "LE / LI", pronunciation: "/le/ o /li/", description: "LA na may kudlit sa itaas" },
      { baybayin: "ᜎᜓ", latin: "LO / LU", pronunciation: "/lo/ o /lu/", description: "LA na may kudlit sa ibaba" },
    
      // MA
      { baybayin: "ᜋᜒ", latin: "ME / MI", pronunciation: "/me/ o /mi/", description: "MA na may kudlit sa itaas" },
      { baybayin: "ᜋᜓ", latin: "MO / MU", pronunciation: "/mo/ o /mu/", description: "MA na may kudlit sa ibaba" },
    
      // NA
      { baybayin: "ᜈᜒ", latin: "NE / NI", pronunciation: "/ne/ o /ni/", description: "NA na may kudlit sa itaas" },
      { baybayin: "ᜈᜓ", latin: "NO / NU", pronunciation: "/no/ o /nu/", description: "NA na may kudlit sa ibaba" },
    
      // NGA
      { baybayin: "ᜅᜒ", latin: "NGE / NGI", pronunciation: "/ŋe/ o /ŋi/", description: "NGA na may kudlit sa itaas" },
      { baybayin: "ᜅᜓ", latin: "NGO / NGU", pronunciation: "/ŋo/ o /ŋu/", description: "NGA na may kudlit sa ibaba" },
    
      // PA
      { baybayin: "ᜉᜒ", latin: "PE / PI", pronunciation: "/pe/ o /pi/", description: "PA na may kudlit sa itaas" },
      { baybayin: "ᜉᜓ", latin: "PO / PU", pronunciation: "/po/ o /pu/", description: "PA na may kudlit sa ibaba" },
    
      // RA
      { baybayin: "ᜇᜒ", latin: "RE / RI", pronunciation: "/re/ o /ri/", description: "RA na may kudlit sa itaas" },
      { baybayin: "ᜇᜓ", latin: "RO / RU", pronunciation: "/ro/ o /ru/", description: "RA na may kudlit sa ibaba" },
    
      // SA
      { baybayin: "ᜐᜒ", latin: "SE / SI", pronunciation: "/se/ o /si/", description: "SA na may kudlit sa itaas" },
      { baybayin: "ᜐᜓ", latin: "SO / SU", pronunciation: "/so/ o /su/", description: "SA na may kudlit sa ibaba" },
    
      // TA
      { baybayin: "ᜆᜒ", latin: "TE / TI", pronunciation: "/te/ o /ti/", description: "TA na may kudlit sa itaas" },
      { baybayin: "ᜆᜓ", latin: "TO / TU", pronunciation: "/to/ o /tu/", description: "TA na may kudlit sa ibaba" },
    
      // WA
      { baybayin: "ᜏᜒ", latin: "WE / WI", pronunciation: "/we/ o /wi/", description: "WA na may kudlit sa itaas" },
      { baybayin: "ᜏᜓ", latin: "WO / WU", pronunciation: "/wo/ o /wu/", description: "WA na may kudlit sa ibaba" },
    
      // YA
      { baybayin: "ᜌᜒ", latin: "YE / YI", pronunciation: "/ye/ o /yi/", description: "YA na may kudlit sa itaas" },
      { baybayin: "ᜌᜓ", latin: "YO / YU", pronunciation: "/yo/ o /yu/", description: "YA na may kudlit sa ibaba" }
    ],
    examples: [
      // Kudlit sa itaas (/e/, /i/)
      { baybayin: "ᜊᜒᜎᜒ", latin: "BILI", meaning: "Buy" },
      { baybayin: "ᜃᜒᜆᜒ", latin: "KITI", meaning: "Tick" },
      { baybayin: "ᜎᜒᜃᜒ", latin: "LIKI", meaning: "Crack" },
    
      // Kudlit sa ibaba (/o/, /u/)
      { baybayin: "ᜊᜓᜃᜓ", latin: "BUKO", meaning: "Coconut" },
      { baybayin: "ᜃᜓᜈᜓ", latin: "KUNO", meaning: "Pretend" },
      { baybayin: "ᜎᜓᜉᜓ", latin: "LUPO", meaning: "Sinkhole" }
    ]
    
  },
  pangaltas: {
    id: "pangaltas",
    title: "Mga Uri ng Pangaltas",
    description: "Matuto ng iba't ibang uri ng pangaltas o vowel deleter sa Baybayin",
    icon: "✂️",
    contentTitle: "Ano ang Pangaltas?",
    content: [
      "Ang pangaltas ay isang simbolo na ginagamit upang alisin ang tunog na patinig sa isang katinig.",
      "Sa tradisyonal na Baybayin, walang pangaltas. Ngunit kalaunan ay nadagdagan ito upang maisulat ang mga salitang nagtatapos sa katinig.",
      "May apat na pangunahing uri ng pangaltas na ginagamit ngayon."
    ],
    characters: [
      {
        baybayin: "ᜃ᜔",
        latin: "Kurus o Virama (+)",
        pronunciation: "/k/",
        description: "Ginagamit ng mga prayle noong ika-17 siglo upang ipahiwatig na walang patinig."
      },
      {
        baybayin: "ᜃ᜵",
        latin: "Pamudpod (﹎)",
        pronunciation: "/k/",
        description: "Modernong bersyon na ipinakilala noong 1980s ni Postma; ginagamit sa Surat Mangyan."
      },
      {
        baybayin: "ᜃ᜔",
        latin: "Ekis (X)",
        pronunciation: "/k/",
        description: "Isang modernong adaptasyon na ipinakilala noong 2006 ni De los Santos (Nordermx)."
      },
      {
        baybayin: "ᜃ᜷",
        latin: "Pangaltas (─)",
        pronunciation: "/k/",
        description: "Pinakabagong modernong bersyon mula 2020 ni Leyson (Baybayin GLOKAL)."
      }
    ],
    examples: [
      {
        baybayin: "ᜊᜃ᜔ᜆ᜔",
        latin: "BAKT",
        meaning: "Gamit ang Kurus (+) bilang pangaltas."
      },
      {
        baybayin: "ᜊᜃ᜵ᜆ᜵",
        latin: "BAKT",
        meaning: "Gamit ang Pamudpod (﹎) bilang pangaltas."
      },
      {
        baybayin: "ᜊᜃ᜶ᜆ᜶",
        latin: "BAKT",
        meaning: "Gamit ang Ekis (X) bilang pangaltas."
      },
      {
        baybayin: "ᜊᜃ᜷ᜆ᜷",
        latin: "BAKT",
        meaning: "Gamit ang Pangaltas (─) bilang pangaltas."
      }
    ]
  },
  danda: {
    id: "danda",
    title: "Danda",
    description: "Matuto ng paggamit ng danda",
    icon: "📝",
    contentTitle: "Ang Paggamit ng Danda",
    content: [
      "Ang danda (᜵) ay ginagamit bilang punctuation mark sa Baybayin.",
      "Ito ay katumbas ng period (.) sa modernong alpabeto.",
      "Ginagamit ito sa dulo ng mga pangungusap upang ipahiwatig ang pagtatapos ng isang kaisipan."
    ],
    characters: [
      { baybayin: "ᜀ᜵", latin: "A + Danda", pronunciation: "/a/", description: "Danda - pangungusap" },
      { baybayin: "ᜃ᜵", latin: "KA + Danda", pronunciation: "/ka/", description: "Danda - pangungusap" }
    ],
    examples: [
      { baybayin: "ᜀᜃᜓ᜵", latin: "AKO.", meaning: "I am." },
      { baybayin: "ᜋᜄᜈ᜔ᜇ᜵", latin: "MAGANDA.", meaning: "Beautiful." }
    ]
  }
};

export { lessonModules };
