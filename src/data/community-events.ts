import { CommunityConference } from "@/lib/types"

const communityConferences: CommunityConference[] = [
  {
    title: "ETH Canal",
    startDate: "2024-03-19",
    endDate: "2024-03-21",
    to: "https://ethcanal.xyz",
    location: "Panama City, PA",
    description:
      "Experience three transformative where the Ethereum community gathers in Panama, to discuss blockchain innovation.",
  },
  {
    title: "ETHTaipei",
    startDate: "2024-03-21",
    endDate: "2024-03-24",
    to: "https://ethtaipei.org",
    location: "Taipei, TW",
    description:
      "ETHTaipei presents an opportunity to learn about cutting-edge technology and applications about Ethereum, as well as to get involved with the local community in Taiwan.",
  },
  {
    title: "ETHSamba",
    to: "https://www.ethsamba.org/",
    location: "Rio de Janeiro, Brazil",
    description:
      "Bootcamp & Hackathon for builders in sunny Rio de Janeiro with the usual ETHSamba vibes",
    startDate: "2024-03-22",
    endDate: "2024-03-24",
  },
  {
    title: "ETHBucharest",
    startDate: "2024-03-27",
    endDate: "2024-03-30",
    to: "https://ethbucharest.xyz",
    location: "Bucharest, ROU",
    description:
      "Eth Bucharest is not just an event; it’s a movement empowering creativity, bold ideas, and meaningful connections in the heart of Eastern Europe.",
  },
  {
    title: "ETH Seoul",
    startDate: "2024-03-29",
    endDate: "2024-03-31",
    to: "https://ethseoul.org",
    location: "Seoul, KR",
    description:
      "ETH Seoul is a 3 day hackathon that takes place from March 29-31 in Neowiz building in Pangyo, South Korea",
  },
  {
    title: "DEFICON",
    startDate: "2024-03-30",
    endDate: "2024-03-30",
    to: "https://deficon.nyc",
    location: "New York, NYC, USA",
    description:
      "DeFiCon is a nonprofit conference with a mission to elevate the ethos of peer-to-peer crypto.",
  },
  {
    title: "NFT NYC",
    startDate: "2024-04-03",
    endDate: "2024-04-05",
    to: "https://nft.nyc",
    location: "NYC, USA",
    description: "7th edition of the NFT.NYC",
  },
  {
    title: "Ethereumzuri.ch 2024",
    to: "https://ethereumzuri.ch/",
    location: "Zurich, Switzerland",
    description:
      "Switzerland's largest Ethereum research and development-focused community conference and hackathon, with the goal of connecting academics, developers, researchers, and enthusiasts, and creating a space for collaboration and innovation.",
    startDate: "2024-04-05",
    endDate: "2024-04-07",
  },
  {
    title: "Scaling Ethereum 2024",
    to: "https://ethglobal.com/events/scaling2024",
    location: "Remote",
    description:
      "Join us April as we bring back our community favorite — Scaling Ethereum. Strap in for three weeks of hacking and summits devoted to pushing the envelope and building the future L2 infrastructure of our ecosystem.",
    startDate: "2024-4-5",
    endDate: "2024-4-26",
  },
  {
    title: "ETHDam",
    to: "https://www.ethdam.com/",
    location: "Amsterdam, Netherlands",
    description:
      "Conference and hackathon gathering the best Privacy and Security builders",
    startDate: "2024-04-12",
    endDate: "2024-04-14",
  },
  {
    title: "Web3FC³",
    to: "https://www.web3fc.xyz/",
    location: "Barcelona, Spain",
    description:
      "A chain-agnostic conference for the grassroots community. An event by Web3 Family, running in-person meetups and conference in Barcelona.",
    startDate: "2024-04-17",
    endDate: "2024-04-19",
  },
  {
    title: "TOKEN2049",
    startDate: "2024-04-18",
    endDate: "2024-04-19",
    to: "https://token2049.com",
    location: "Dubai, UAE",
    description:
      "TOKEN2049 is organized annually in Dubai and Singapore, where founders and executives in the web3 industry share their view on the industry",
  },
  {
    title: "ETHTallinn",
    startDate: "2024-04-19",
    endDate: "2024-04-21",
    to: "https://ethtallinn.org/",
    location: "Tallinn, EST",
    description:
      "ETHTallinn is an Ethereum community focused on pushing technologies to new limits within the DeFi, NFT, and web3 industry",
  },
  {
    title: "ETHDubai",
    startDate: "2024-04-19",
    endDate: "2024-04-21",
    to: "https://www.ethdubaiconf.org/",
    location: "Dubai, UAE",
    description:
      "The Ethereum dev conference and hackathon in Dubai on everything DeFi, privacy, EVM scaling, layers 2, Account Abstraction and more with a focus on decentralization and community projects. We also organize a Demo Pitch Day with VCs.",
  },
  {
    title: "Pragma Sydney",
    to: "https://ethglobal.com/events/pragma-sydney",
    location: "Sydney, Australia",
    description:
      "Pragma is a one-day, single-track, in-person summit hosted by ETHGlobal. With a focus on intimacy, Pragma serves as a hub for high-quality talks and as a forum of discussion for builders and leaders from Ethereum ecosystem and beyond. Join us at our first event in Oceania and meet incredible founders helping shape this ecosystem.",
    startDate: "2024-5-2",
    endDate: "2024-5-2",
  },
  {
    title: "ETHGlobal Sydney",
    to: "https://ethglobal.com/events/sydney",
    location: "Sydney, Australia",
    description:
      "ETHGlobal Sydney is going to be an event full of hacking, networking, side events and fun activities. This will be our inaugural event on the continent of Oceania-completing the global in ETHGlobal as the sixth and final continent in our world tour.",
    startDate: "2024-5-3",
    endDate: "2024-5-5",
  },
  {
    title: "ETH Rio",
    startDate: "2024-05-13",
    endDate: "2024-05-15",
    to: "https://www.ethereumbrasil.com/",
    location: "Rio de Janeiro, Brazil",
    description:
      "3rd Edition of ETH Rio. ETH Rio 2024 will bring regulators, builders and businesses to discuss the future of the Brazilian Tokenized Economy based on EVM.",
  },
  {
    title: "DappConn",
    startDate: "2024-05-21",
    endDate: "2024-05-23",
    to: "https://www.dappcon.io/",
    location: "Berlin, Germany",
    description:
      "A 3-day Developer Conference for Ethereum Infrastructure and dApps that would bring together over 900 builders together, hosted by Gnosis since 2018.",
  },
  {
    title: "ETHBerlin04",
    to: "https://www.ethberlin.org",
    location: "Berlin, Germany",
    description:
      "ETHBerlin is a hackathon, a cultural festival, an educational event, a platform for hacktivism, and a community initiative to push the decentralized ecosystem forward.",
    startDate: "2024-05-24",
    endDate: "2024-05-26",
  },
  {
    title: "BlockSplit",
    startDate: "2024-05-27",
    endDate: "2024-05-30",
    to: "https://blocksplit.net",
    location: "Split, Croatia",
    description: "Web3 Conference in the heart of the Mediterranean.",
  },
  {
    title: "Non Fungible Conference",
    startDate: "2024-05-28",
    endDate: "2024-05-30",
    to: "https://nonfungibleconference.com/",
    location: "Lisbon, PRT",
    description:
      "NFC is an experimental Web3 event that brings the global NFT community together",
  },
  {
    title: "Consensus2024",
    startDate: "2024-05-29",
    endDate: "2024-05-31",
    to: "https://coindesk.com/consensus/",
    location: "Austin, TX, USA",
    description:
      "Consensus 2024 is your chance to be a part of important conversation in crypto and Web3.",
  },
  {
    title: "ETHPrague",
    startDate: "2024-05-31",
    endDate: "2024-06-02",
    to: "https://ethprague.com",
    location: "Prague, CZ",
    description:
      "An event focused on the future of Ethereum and potential concepts or applications that don't yet exist",
  },
  {
    title: "ETHDublin",
    startDate: "2024-05-31",
    endDate: "2024-06-02",
    to: "https://ethdublin.io",
    location: "Dublin, IRL",
    description:
      "ETHDublin brings together like-minded investors, builders and designers from all over the world to solve industry problems, harnessing the power of Web3",
  },
  {
    title: "ETH Belgrade",
    to: "https://ethbelgrade.rs/",
    location: "Belgrade, Serbia",
    description:
      "ETH Belgrade is a playground for exploring Ethereum possibilities. As part of Belgrade Blockchain Week, this three-day conference gathers extraordinary minds and Ethereum enthusiasts to share knowledge and spark ideas that will ignite the whole ecosystem.",
    startDate: "2024-06-03",
    endDate: "2024-06-05",
  },
  {
    title: "Belgrade Blockchain Week",
    startDate: "2024-06-01",
    endDate: "2024-06-09",
    to: "https://belgradeblockchainweek.com/",
    location: "Belgrade, SRB",
    description:
      "Belgrade Blockchain Week is a week-long in-person gathering of the greatest Web3 minds and professionals. It features independent events organized by top-tier companies and communities throughout the week.",
  },
  {
    title: "ETHKyiv",
    startDate: "2024-06-01",
    endDate: "2024-06-01",
    to: "https://ethkyiv.org",
    location: "Kyiv, UKR",
    description:
      "Through Hackathon, Conference, side events, discussions, collaborations, and vast networking, we aim to further establish Kyiv as an innovation and infrastructure development leader",
  },
  {
    title: "EthCC",
    to: "https://ethcc.io",
    location: "Brussels, Belgium",
    description:
      "The Ethereum Community Conference (EthCC) is the largest annual European Ethereum event focused on technology and community. Four intense days of conferences, networking and learning.",
    startDate: "2024-7-08",
    endDate: "2024-7-11",
  },
  {
    title: "Pragma Brussels",
    to: "https://ethglobal.com/events/pragma-brussels",
    location: "Brussels, Belgium",
    description:
      "Pragma is a one-day, single-track, in-person summit hosted by ETHGlobal. With a focus on intimacy, Pragma serves as a hub for high-quality talks and as a forum of discussion for builders and leaders from Ethereum ecosystem and beyond.",
    startDate: "2024-7-11",
    endDate: "2024-7-11",
  },
  {
    title: "ETHGlobal Brussels",
    to: "https://ethglobal.com/events/brussels",
    location: "Brussels, Belgium",
    description:
      "ETHGlobal Brussels is going to be an event full of hacking, networking, side events and fun activities. This marks our first event in Belgium and our 3rd hackathon alongside EthCC.",
    startDate: "2024-7-12",
    endDate: "2024-7-14",
  },
  {
    title: "EDCON",
    startDate: "2024-07-26",
    endDate: "2024-07-30",
    to: "https://edcon.io/",
    location: "Tokyo, JPN",
    description:
      "EDCON is committed to serving the Ethereum ecosystem by boosting communication and engagement between Ethereum communities worldwide",
  },
  {
    title: "ETHOnline 2024",
    to: "https://ethglobal.com/events/ethonline2024",
    location: "Remote",
    description:
      "Our community favorite and flagship event is back once again. Join thousands of developers and creatives online next August for ETHOnline 2024!",
    startDate: "2024-8-23",
    endDate: "2024-9-13",
  },
  {
    title: "Web3 Lagos Conference",
    startDate: "2024-09-05",
    endDate: "2024-09-07",
    to: "https://event.web3bridge.com/",
    location: "Lagos, NGA",
    description:
      "This conference will bring together Web3 enthusiasts from all over Nigeria and beyond. Here, community meets technology for three days of intensive Networking and Learning experiences.",
  },
  {
    title: "ETHSafari",
    startDate: "2024-09-09",
    endDate: "2024-09-15",
    to: "https://ethsafari.xyz/",
    location: "Nairobi & Kilifi, Kenya",
    description:
      "Welcome to the largest Ethereum event happening in Africa! Join the BlockTrain from Nairobi to celebrate an ETH-festival held underneath ancient Boabab trees in Kilifi.",
  },
  {
    title: "TOKEN2049",
    startDate: "2024-09-18",
    endDate: "2024-09-19",
    to: "https://token2049.com",
    location: "Singapore, SG",
    description:
      "TOKEN2049 is organized annually in Dubai and Singapore, where founders and executives in the web3 industry share their view on the industry",
  },
  {
    title: "ETHGlobal Singapore",
    to: "https://ethglobal.com/events/singapore2024",
    location: "Singapore, Singapore",
    description:
      "ETHGlobal Singapore is going to be an event full of hacking, networking, side events and fun activities. We cannot wait to at long last return to Singapore. Since our last ETHSingapore in 2018, so much has changed.",
    startDate: "2024-9-20",
    endDate: "2024-9-22",
  },
  {
    title: "Pragma San Francisco",
    to: "https://ethglobal.com/events/pragma-sanfrancisco",
    location: "San Francisco, California",
    description:
      "Pragma is a single-track, in-person summit hosted by ETHGlobal. With a focus on intimacy, Pragma serves as a hub for high-quality talks and as a forum of discussion for builders and leaders from Ethereum ecosystem and beyond. For the first time, we’re excited to introduce a multi-day format to cover an even wider range for all things happening in web3",
    startDate: "2024-10-15",
    endDate: "2024-10-17",
  },
  {
    title: "ETHSofia",
    to: "https://ethsofia.com",
    location: "Sofia, Bulgaria",
    description:
      "ETHSofia is a 3-day conference and hackathon event that brings together the Ethereum community in Bulgaria and beyond. It is a place for developers, researchers, and enthusiasts to come together and share knowledge and ideas.",
    startDate: "2024-10-17",
    endDate: "2024-10-19",
  },
  {
    title: "ETHGlobal San Francisco",
    to: "https://ethglobal.com/events/sanfrancisco2024",
    location: "San Francisco, California",
    description:
      "ETHGlobal Singapore is going to be an event full of hacking, networking, side events and fun activities. In our third iteration of ETHGlobal San Francisco, we're going bigger than ever.",
    startDate: "2024-10-18",
    endDate: "2024-10-20",
  },
  {
    title: "Devcon 7 - Southeast Asia",
    to: "https://devcon.org/",
    location: "Bangkok, Thailand",
    description:
      "Discover Ethereum and its community at Devcon, the conference for developers, thinkers, and makers and a place for learning, knowledge sharing, and fun.",
    startDate: "2024-11-12",
    endDate: "2024-11-15",
  },
  {
    title: "ETHGlobal Devcon 2024",
    to: "https://ethglobal.com/events/devcon2024",
    location: "TBD",
    description:
      "Whenever Devcon happens, we’ll be running a large hackathon right alongside it. Don’t miss the biggest web3 developer meetup of the year in South East Asia.",
    startDate: "TBD",
    endDate: "TBD",
  },
  {
    title: "ETHBratislava",
    to: "http://www.ethbratislava.com/",
    location: "Bratislava, Slovakia",
    description:
      "With this pioneering event in Slovakia we are finally uniting a passionate community engaged in the Ethereum ecosystem's economics, governance, and technology.",
    startDate: "2024-05-10",
    endDate: "2024-05-11",
  },
  {
    title: "NapulETH Open Village",
    to: "https://napul.eth.limo",
    location: "Naples, Italy",
    description: "The Biggest ETH Event in Southern Italy",
    startDate: "2024-09-12",
    endDate: "2024-09-14",
  },
]

export default communityConferences
