/**
 * Pre-computed static torch holders data
 * This data is final and will not be updated (the torch has been burned)
 */

export type TorchHolder = {
  address: string
  name: string
  role: string
  twitter: string
  avatarPath: string
  event: {
    from: string
    to: string
    blockNumber: number
    transactionHash: string
    timestamp: number
  }
}

// Addresses filtered from the UI (eth.org safe address)
const FILTERED_ADDRESSES = [
  "0x8d3e2e0e562634244e5d229c3b97a38efbec65ab", // eth.org safe address
]

export const isAddressFiltered = (address: string): boolean => {
  return FILTERED_ADDRESSES.includes(address.toLowerCase())
}

// Pre-computed torch holders with their transfer events
// The torch was burned on the final transfer (to 0x0000...0000)
export const torchHolders: TorchHolder[] = [
  {
    address: "0x88C2C3C9E64a1299e6417C24Fa2ae773c6cEa47c",
    name: "Joseph Lubin",
    role: "Co-founder of Ethereum",
    twitter: "https://x.com/ethereumJoseph",
    avatarPath:
      "/images/10-year-anniversary/torchbearers/0x88C2C3C9E64a1299e6417C24Fa2ae773c6cEa47c.jpg",
    event: {
      from: "0x8d3e2e0e562634244e5d229c3b97a38efbec65ab",
      to: "0x88c2c3c9e64a1299e6417c24fa2ae773c6cea47c",
      blockNumber: 22959927,
      transactionHash:
        "0x4e3673694351fdc7e12b5198355bcc259c819856c5c92ac39a7ccf0561a52d79",
      timestamp: 1753008731,
    },
  },
  {
    address: "0x11adBC1B3fd5cb5F29B0052b4AfFe725645b5e4C",
    name: "Audrey Tang",
    role: "Cyber Ambassador, 1st Digital Minister of Taiwan (2016-2024)",
    twitter: "https://x.com/audreyt",
    avatarPath:
      "/images/10-year-anniversary/torchbearers/0x11adBC1B3fd5cb5F29B0052b4AfFe725645b5e4C.jpg",
    event: {
      from: "0x88c2c3c9e64a1299e6417c24fa2ae773c6cea47c",
      to: "0x11adbc1b3fd5cb5f29b0052b4affe725645b5e4c",
      blockNumber: 22965258,
      transactionHash:
        "0xbd3da85330f64b9d7b848bc9f3dc735770f1ece6b9e9b66fc07dd4ad0afac2ad",
      timestamp: 1753073063,
    },
  },
  {
    address: "0xcc2047a4108033Cb48727B8C69914F40cC0bBC1B",
    name: "Manoj Gorle",
    role: "Co-president 0xblocsoc, Undergrad IIT Delhi",
    twitter: "https://x.com/manojkgorle",
    avatarPath:
      "/images/10-year-anniversary/torchbearers/0xcc2047a4108033Cb48727B8C69914F40cC0bBC1B.jpg",
    event: {
      from: "0x11adbc1b3fd5cb5f29b0052b4affe725645b5e4c",
      to: "0xcc2047a4108033cb48727b8c69914f40cc0bbc1b",
      blockNumber: 22972035,
      transactionHash:
        "0x7397e35cdf8cc0262e4d56eda9340d29ed704884b30291d4d61b638e0536b833",
      timestamp: 1753154831,
    },
  },
  {
    address: "0x5F19021618AF1cEB5De7Ca112B505F51f813aE18",
    name: "Roman and Alexey Defense Fund",
    role: "",
    twitter: "",
    avatarPath:
      "/images/10-year-anniversary/torchbearers/0x5F19021618AF1cEB5De7Ca112B505F51f813aE18.jpg",
    event: {
      from: "0xcc2047a4108033cb48727b8c69914f40cc0bbc1b",
      to: "0x5f19021618af1ceb5de7ca112b505f51f813ae18",
      blockNumber: 22979916,
      transactionHash:
        "0x0c4d6a4a876ed2d48a9a4dccd10d2b9398ab8d017b097a82ac0bd6e161a31423",
      timestamp: 1753250075,
    },
  },
  {
    address: "0x7a16fF8270133F063aAb6C9977183D9e72835428",
    name: "Michael Egorov",
    role: "Founder of Curve Finance",
    twitter: "https://x.com/newmichwill",
    avatarPath:
      "/images/10-year-anniversary/torchbearers/0x7a16fF8270133F063aAb6C9977183D9e72835428.jpg",
    event: {
      from: "0x5f19021618af1ceb5de7ca112b505f51f813ae18",
      to: "0x7a16ff8270133f063aab6c9977183d9e72835428",
      blockNumber: 22986579,
      transactionHash:
        "0xa26a83f51b94c16378a03f0b227519dcfe29750746585389abe93728c8433c93",
      timestamp: 1753330691,
    },
  },
  {
    address: "0x0c004944e16e9065Da1c7dB49F9964E2a3ac8892",
    name: "Letícia Pires",
    role: "CEO Pomodoki",
    twitter: "https://x.com/letispires",
    avatarPath:
      "/images/10-year-anniversary/torchbearers/0x0c004944e16e9065Da1c7dB49F9964E2a3ac8892.jpg",
    event: {
      from: "0x7a16ff8270133f063aab6c9977183d9e72835428",
      to: "0x0c004944e16e9065da1c7db49f9964e2a3ac8892",
      blockNumber: 22994565,
      transactionHash:
        "0x4b8cd47c48e21d69193d300b19d74e17156ac6a1cc754be7af72a6aa45e4abf0",
      timestamp: 1753427183,
    },
  },
  {
    address: "0x54bae63e59B422Dd7C047E375f051D60C37cb60F",
    name: "Ayodeje Ebunayo",
    role: "Founder of Web3Bridge",
    twitter: "https://x.com/Ebunayo08",
    avatarPath:
      "/images/10-year-anniversary/torchbearers/0x54bae63e59B422Dd7C047E375f051D60C37cb60F.jpg",
    event: {
      from: "0x0c004944e16e9065da1c7db49f9964e2a3ac8892",
      to: "0x54bae63e59b422dd7c047e375f051d60c37cb60f",
      blockNumber: 23001408,
      transactionHash:
        "0x763d47e62f18f287de1d95686a7ac7099e794ec6b42a2210e2beeda4f804e271",
      timestamp: 1753509863,
    },
  },
  {
    address: "0xA307A15d113D9763C6fc84768AC34909438bB2EE",
    name: "Alex Bornyakov",
    role: "The Deputy Minister of Digital Transformation of Ukraine",
    twitter: "https://x.com/abornyakov",
    avatarPath:
      "/images/10-year-anniversary/torchbearers/0xA307A15d113D9763C6fc84768AC34909438bB2EE.jpg",
    event: {
      from: "0x54bae63e59b422dd7c047e375f051d60c37cb60f",
      to: "0xa307a15d113d9763c6fc84768ac34909438bb2ee",
      blockNumber: 23008580,
      transactionHash:
        "0x3740f90f7ef273b821f9f9106ad45542ab0af1ebba4af53b3c0a0ba13ae24b82",
      timestamp: 1753596383,
    },
  },
  {
    address: "0x648aA14e4424e0825A5cE739C8C68610e143FB79",
    name: "Anthony Sassano",
    role: "Founder of The Daily Gwei",
    twitter: "https://x.com/sassal0x",
    avatarPath:
      "/images/10-year-anniversary/torchbearers/0x648aA14e4424e0825A5cE739C8C68610e143FB79.jpg",
    event: {
      from: "0xa307a15d113d9763c6fc84768ac34909438bb2ee",
      to: "0x648aa14e4424e0825a5ce739c8c68610e143fb79",
      blockNumber: 23017584,
      transactionHash:
        "0x5760ed9cf8b8611a57c07f7aec5f3d9256325cf52a4b999658ee77efb91603f4",
      timestamp: 1753704983,
    },
  },
  {
    address: "0x36ACC9E5248f33B030d3eA3465AC1f99E55868Ec",
    name: "Candela Fassano",
    role: "Builder SEED Latam",
    twitter: "https://x.com/candufaz",
    avatarPath:
      "/images/10-year-anniversary/torchbearers/0x36ACC9E5248f33B030d3eA3465AC1f99E55868Ec.jpg",
    event: {
      from: "0x648aa14e4424e0825a5ce739c8c68610e143fb79",
      to: "0x36acc9e5248f33b030d3ea3465ac1f99e55868ec",
      blockNumber: 23023646,
      transactionHash:
        "0x77dd6bbe4da042c9f7ad26447070807be5de946d129148c345f70b9cb891c74b",
      timestamp: 1753778231,
    },
  },
  // Final holder - the torch was burned
  {
    address: "0x0000000000000000000000000000000000000000",
    name: "Burned",
    role: "Torch has been burned",
    twitter: "",
    avatarPath: "/images/10-year-anniversary/torch-cover.webp",
    event: {
      from: "0x36acc9e5248f33b030d3ea3465ac1f99e55868ec",
      to: "0x0000000000000000000000000000000000000000",
      blockNumber: 23032809,
      transactionHash:
        "0x7b6c5ae7767ee63abb5ac88374fc197bab571e71749e25fd574b102d315ec4bd",
      timestamp: 1753889003,
    },
  },
]

// Utility functions (inlined from @/lib/torch)

export const extractTwitterHandle = (twitterUrl: string): string | null => {
  const patterns = [
    /twitter\.com\/([^/?]+)/,
    /x\.com\/([^/?]+)/,
    /^@?([a-zA-Z0-9_]{1,15})$/,
  ]

  for (const pattern of patterns) {
    const match = twitterUrl.match(pattern)
    if (match) {
      return match[1]
    }
  }

  return null
}

export const formatTorchDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  const month = date.toLocaleDateString("en-US", { month: "long" })
  const day = date.getDate().toString().padStart(2, "0")
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return `${month} ${day}, ${time}`
}

export const getTxEtherscanUrl = (txHash: string): string => {
  return `https://etherscan.io/tx/${txHash}`
}
