import type { HumanityStory } from "@/lib/types"
import { StoryCategory } from "@/lib/types"

const humanityStories: HumanityStory[] = [
  {
    slug: "maria-venezuela-remittances",
    name: "Maria",
    role: "Small Business Owner",
    location: {
      country: "Venezuela",
      region: "Latin America",
    },
    date: "2024-03-15",
    category: StoryCategory.FINANCIAL_INCLUSION,
    tags: ["remittances", "stablecoins", "developing-nations", "payments"],
    storyEnglish:
      "When hyperinflation made our currency worthless, my family in the US couldn't send money through traditional channels - the fees were 15% and it took weeks. Now they send USDC on Ethereum L2s, and I receive it in minutes for less than a dollar. I can convert it to local currency when I need to, or save it in stablecoins to protect against inflation. This has allowed me to keep my small bakery running and employ three people from my community.",
    storyOriginal:
      "Cuando la hiperinflación hizo que nuestra moneda no valiera nada, mi familia en EE.UU. no podía enviar dinero por canales tradicionales - las comisiones eran del 15% y tardaba semanas. Ahora envían USDC en Ethereum L2, y lo recibo en minutos por menos de un dólar. Puedo convertirlo a moneda local cuando lo necesito, o guardarlo en stablecoins para protegerme de la inflación. Esto me ha permitido mantener mi pequeña panadería y emplear a tres personas de mi comunidad.",
    originalLanguage: "es",
    relatedPages: ["/defi/", "/stablecoins/", "/layer-2/"],
    featured: true,
  },
  {
    slug: "olumide-nigeria-freelancer",
    name: "Olumide",
    role: "Software Developer",
    location: {
      country: "Nigeria",
      region: "Africa",
    },
    date: "2024-02-20",
    category: StoryCategory.FINANCIAL_INCLUSION,
    tags: ["freelancing", "payments", "developing-nations", "self-custody"],
    storyEnglish:
      "As a freelance developer, getting paid from international clients was a nightmare. Nigerian banks would freeze accounts, delay transfers for weeks, or charge huge fees. PayPal didn't work here. With Ethereum, I receive payments directly to my wallet within minutes. I've earned enough to support my family and fund my younger brother's university education. The financial freedom is life-changing.",
    storyOriginal: null,
    relatedPages: ["/defi/", "/wallets/"],
    featured: true,
  },
  {
    slug: "aisha-kenya-microloans",
    name: "Aisha",
    role: "Women's Cooperative Leader",
    location: {
      country: "Kenya",
      region: "Africa",
    },
    date: "2024-01-10",
    category: StoryCategory.FINANCIAL_INCLUSION,
    tags: ["microloans", "defi", "women", "developing-nations"],
    storyEnglish:
      "Traditional banks wouldn't give loans to women in our village without a male guarantor. Through a DeFi protocol built on Ethereum, our women's cooperative can now access microloans using our group's reputation as collateral. We've funded 47 small businesses - tailoring shops, food stalls, and farming supplies. The smart contract ensures fair terms that no bank would offer us.",
    storyOriginal: null,
    relatedPages: ["/defi/", "/dao/"],
    featured: true,
  },
  {
    slug: "chen-taiwan-medical-records",
    name: "Dr. Chen Wei-Lin",
    role: "Hospital Administrator",
    location: {
      country: "Taiwan",
      region: "Asia",
    },
    date: "2024-04-05",
    category: StoryCategory.HEALTHCARE,
    tags: ["medical-records", "privacy", "data-ownership"],
    storyEnglish:
      "Our hospital network implemented an Ethereum-based system for patient medical records. Patients control access to their own data through their wallets. When they visit a new specialist, they can grant temporary access with a single signature. This has eliminated duplicate tests, reduced medical errors from incomplete histories, and given patients true ownership of their health data for the first time.",
    storyOriginal:
      "我們的醫院網絡實施了基於以太坊的病患醫療記錄系統。病患透過錢包控制自己的資料存取。當他們去看新的專科醫生時，只需一個簽名就能授予臨時存取權限。這消除了重複檢查，減少了因病史不完整導致的醫療錯誤，並首次讓病患真正擁有自己的健康資料。",
    originalLanguage: "zh-tw",
    relatedPages: ["/wallets/", "/developers/docs/"],
  },
  {
    slug: "amara-ethiopia-education",
    name: "Amara",
    role: "Student",
    location: {
      country: "Ethiopia",
      region: "Africa",
    },
    date: "2024-05-12",
    category: StoryCategory.EDUCATION,
    tags: ["education", "credentials", "opportunity"],
    storyEnglish:
      "I completed online courses from top universities, but employers wouldn't trust certificates I could have faked. Now my credentials are issued as NFTs on Ethereum - verifiable, permanent, and impossible to forge. This blockchain-verified degree helped me land a remote job with a European company. I'm the first in my family to have a career in tech.",
    storyOriginal: null,
    relatedPages: ["/nft/", "/developers/docs/"],
  },
  {
    slug: "lucas-brazil-rainforest",
    name: "Lucas",
    role: "Environmental Scientist",
    location: {
      country: "Brazil",
      region: "Latin America",
    },
    date: "2024-06-08",
    category: StoryCategory.ENVIRONMENTAL,
    tags: ["climate", "carbon-credits", "transparency", "conservation"],
    storyEnglish:
      "Tracking carbon credits was plagued by double-counting and fraud. Our organization now uses Ethereum to create transparent, verifiable carbon credits tied to specific rainforest parcels. Satellite data is recorded on-chain, and anyone can verify that the forest is still standing. This transparency has attracted serious climate investors who previously avoided carbon markets due to trust issues.",
    storyOriginal:
      "O rastreamento de créditos de carbono era atormentado por dupla contagem e fraude. Nossa organização agora usa Ethereum para criar créditos de carbono transparentes e verificáveis, vinculados a parcelas específicas de floresta tropical. Dados de satélite são registrados na blockchain, e qualquer pessoa pode verificar que a floresta ainda está de pé. Essa transparência atraiu investidores climáticos sérios que anteriormente evitavam mercados de carbono devido a problemas de confiança.",
    originalLanguage: "pt-br",
    relatedPages: ["/dao/", "/developers/docs/"],
  },
  {
    slug: "fatima-jordan-refugees",
    name: "Fatima",
    role: "Aid Worker",
    location: {
      country: "Jordan",
      region: "Middle East",
    },
    date: "2024-07-22",
    category: StoryCategory.HUMAN_RIGHTS,
    tags: ["refugees", "identity", "aid-distribution"],
    storyEnglish:
      "Refugees often lose all identity documents when fleeing. We implemented an Ethereum-based digital identity system that allows displaced people to prove who they are and access services. The system has helped over 5,000 refugees receive aid, open bank accounts, and even find employment - all without traditional ID documents that were lost or destroyed.",
    storyOriginal: null,
    relatedPages: ["/wallets/", "/developers/docs/"],
  },
  {
    slug: "priya-india-artisan",
    name: "Priya",
    role: "Textile Artisan",
    location: {
      country: "India",
      region: "Asia",
    },
    date: "2024-08-14",
    category: StoryCategory.CREATOR_ECONOMY,
    tags: ["artisans", "nft", "fair-trade", "creators"],
    storyEnglish:
      "For generations, middlemen took most of the profit from our traditional textile work. Now I sell my designs directly as NFTs, and smart contracts ensure I receive royalties every time my work is resold. I've earned more in one year than in the previous five combined. I'm now training other women in my village to do the same.",
    storyOriginal:
      "पीढ़ियों से, बिचौलिये हमारे पारंपरिक कपड़ा काम से ज्यादातर मुनाफा ले जाते थे। अब मैं अपने डिज़ाइन सीधे NFT के रूप में बेचती हूं, और स्मार्ट कॉन्ट्रैक्ट सुनिश्चित करते हैं कि जब भी मेरा काम दोबारा बिकता है, मुझे रॉयल्टी मिलती है। मैंने एक साल में पिछले पांच साल से ज्यादा कमाया है। अब मैं अपने गांव की अन्य महिलाओं को भी यही करना सिखा रही हूं।",
    originalLanguage: "hi",
    relatedPages: ["/nft/", "/dao/"],
  },
  {
    slug: "miguel-philippines-supply-chain",
    name: "Miguel",
    role: "Coffee Farmer",
    location: {
      country: "Philippines",
      region: "Asia",
    },
    date: "2024-09-03",
    category: StoryCategory.SUPPLY_CHAIN,
    tags: ["supply-chain", "fair-trade", "transparency", "agriculture"],
    storyEnglish:
      "Coffee buyers claimed they couldn't pay fair prices because they couldn't verify our organic, shade-grown practices. Now every step of our coffee's journey - from planting to roasting - is recorded on Ethereum. Consumers scan a QR code and see the entire history. This transparency commands premium prices, and we've increased our income by 40% while proving our sustainable practices.",
    storyOriginal: null,
    relatedPages: ["/developers/docs/"],
  },
  {
    slug: "elena-ukraine-dao-governance",
    name: "Elena",
    role: "Community Organizer",
    location: {
      country: "Ukraine",
      region: "Europe",
    },
    date: "2024-10-18",
    category: StoryCategory.GOVERNANCE_IDENTITY,
    tags: ["dao", "governance", "community", "voting"],
    storyEnglish:
      "After our local government became dysfunctional, our community formed a DAO to manage shared resources - a community center, shared equipment, and emergency funds. Every decision is voted on transparently, every expense is visible on-chain. We've rebuilt trust in collective action that was destroyed by years of corruption. Even skeptics now see that transparent, programmable governance works.",
    storyOriginal:
      "Після того, як наша місцева влада стала недієздатною, наша громада створила DAO для управління спільними ресурсами - громадським центром, спільним обладнанням та фондом допомоги. Кожне рішення голосується прозоро, кожна витрата видима в блокчейні. Ми відновили довіру до колективних дій, яка була зруйнована роками корупції. Навіть скептики тепер бачать, що прозоре, програмоване управління працює.",
    originalLanguage: "uk",
    relatedPages: ["/dao/", "/developers/docs/"],
  },
]

export default humanityStories
