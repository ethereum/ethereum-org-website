// Import data types
import { QuestionBank } from "../../types"

// Declare hash map of question bank
const questionBank: QuestionBank = {
  // TODO: Use hash of English prompt to generate this key
  // What is Ethereum?
  a001: {
    prompt: "The biggest difference between Ethereum and Bitcoin is:",
    answers: [
      {
        id: "a001-a", // TODO: Use hash of English question label to generate this id
        label: "Ethereum doesn’t let you make payments to other people",
        explanation:
          "Both Bitcoin and Ethereum let you make payments to other people.",
      },
      {
        id: "a001-b",
        label: "You can run computer programs on Ethereum",
        explanation:
          "Ethereum is programmable. This means you can put any computer program on the Ethereum blockchain.",
      },
      {
        id: "a001-c",
        label: "You can run computer programs on Bitcoin",
        explanation:
          "Unlike Ethereum, Bitcoin isn’t programmable and cannot run arbitrary computer programs.",
      },
      {
        id: "a001-d",
        label: "They have different logos",
        explanation:
          "They do have different logos! But this isn’t the biggest difference between them.",
      },
    ],
    correctAnswerId: "a001-b",
  },
  a002: {
    prompt: "Ethereum’s native cryptocurrency is called:",
    answers: [
      {
        id: "a002-a",
        label: "Ether",
        explanation:
          "Ether is the cryptocurrency native to the Ethereum network.",
      },
      {
        id: "a002-b",
        label: "Ethereum",
        explanation:
          "Ethereum is the blockchain, but its native currency is not called Ethereum. This is a common misconception.",
      },
      {
        id: "a002-c",
        label: "Ethercoin",
        explanation:
          "Unlike many other cryptocurrencies, Ethereum’s native cryptocurrency doesn’t contain the word ‘coin’.",
      },
      {
        id: "a002-d",
        label: "Bitcoin",
        explanation:
          "Bitcoin (uppercase B) was the first blockchain created, bitcoin (lowercase B) is it’s native cryptocurrency.",
      },
    ],
    correctAnswerId: "a002-a",
  },
  a003: {
    prompt: "Who runs Ethereum?",
    answers: [
      {
        id: "a003-a",
        label: "Stakers",
        explanation:
          "Stakers are an important piece in the running of Ethereum, but stakers are duty-bound by the node operators to behave honestly.",
      },
      {
        id: "a003-b",
        label: "Miners",
        explanation:
          "Mining hasn’t been possible since The Merge. There are no longer ‘miners’ on Ethereum.",
      },
      {
        id: "a003-c",
        label: "The Ethereum Foundation",
        explanation:
          "The Ethereum Foundation does not play any significant role in the day-to-day running of Ethereum nodes. ",
      },
      {
        id: "a003-d",
        label: "Anyone running a node",
        explanation:
          "Anyone running a node is a crucial part of Ethereum’s infrastructure. If you haven’t already, consider running an Ethereum node.",
      },
    ],
    correctAnswerId: "a003-d",
  },
  a004: {
    prompt: "What is Ethereum’s uptime?",
    answers: [
      {
        id: "a004-a",
        label: "95%",
        explanation:
          "Ethereum runs on thousands of servers called nodes. Individual nodes go down, but as long as some nodes are up Ethereum will stay online.",
      },
      {
        id: "a004-b",
        label: "99.99%",
        explanation:
          "Ethereum runs on thousands of servers called nodes. Individual nodes go down, but as long as some nodes are up Ethereum will stay online.",
      },
      {
        id: "a004-c",
        label: "99.99999%",
        explanation:
          "Ethereum runs on thousands of servers called nodes. Individual nodes go down, but as long as some nodes are up Ethereum will stay online.",
      },
      {
        id: "a004-d",
        label: "100%",
        explanation:
          "Ethereum runs on thousands of servers called nodes. Individual nodes go down, but as long as some nodes are up Ethereum will stay online.",
      },
    ],
    correctAnswerId: "a004-d",
  },
  a005: {
    prompt: "Ethereum consumes more electricity than:",
    answers: [
      {
        id: "a005-a",
        label: "YouTube",
        explanation:
          "YouTube uses ~244 Terawatts per year. Ethereum uses 0.01 Terawatts per year.",
      },
      {
        id: "a005-b",
        label: "Netflix",
        explanation:
          "Netflix uses ~94 Terawatts per year. Ethereum uses 0.01 Terawatts per year.",
      },
      {
        id: "a005-c",
        label: "PayPal",
        explanation:
          "Paypal uses ~0.26 Terawatts per year. Ethereum uses 0.01 Terawatts per year.",
      },
      {
        id: "a005-d",
        label: "None of the above",
        explanation:
          "Ethereum uses 0.01 Terawatts per year. Less than YouTube (~244 TW/yr), Netflix (~94 TW/yr), and Paypal (~0.26 TW/yr).",
      },
    ],
    correctAnswerId: "a005-d",
  },
  // What is ether?
  b001: {
    prompt: "Ether is also known as:",
    answers: [
      {
        id: "b001-a",
        label: "ETC",
        explanation: "ETC is the ticker for ether on Ethereum Classic.",
      },
      {
        id: "b001-b",
        label: "ETR",
        explanation:
          "ETR is not a ticker for ether or any significant cryptocurrency.",
      },
      {
        id: "b001-c",
        label: "ETH",
        explanation: "ETH is the ticker for ether on Ethereum.",
      },
      {
        id: "b001-d",
        label: "BTC",
        explanation: "BTC is the ticker for bitcoin on the Bitcoin network.",
      },
    ],
    correctAnswerId: "b001-c",
  },
  b002: {
    prompt: "On Ethereum, network fees are paid in:",
    answers: [
      {
        id: "b002-a",
        label: "bitcoin",
        explanation:
          "Lowercase “bitcoin” is the native cryptocurrency of the Bitcoin network.",
      },
      {
        id: "b002-b",
        label: "ETH",
        explanation:
          "Ether (ETH) is native cryptocurrency of Ethereum. All network fees on Ethereum are paid in ETH.",
      },
      {
        id: "b002-c",
        label: "USD",
        explanation:
          "It is not possible to pay network fees on Ethereum in USD (US Dollars), or any other FIAT currency.",
      },
      {
        id: "b002-d",
        label: "Ethereum",
        explanation:
          "Ethereum is the network, but Ethereum’s network fees are paid in the different.",
      },
    ],
    correctAnswerId: "b002-b",
  },
  b003: {
    prompt: "Staking on Ethereum helps secure the network because:",
    answers: [
      {
        id: "b003-a",
        label: "Stakers can ban people if they don’t like what they are doing",
        explanation: "Stakers are not able to arbitrarily censor users.",
      },
      {
        id: "b003-b",
        label:
          "If a staker tries to cheat the network, they risk losing their ETH",
        explanation:
          "Stakers risk losing a significant amount of their ETH if they are shown to be behaving maliciously against the network. This is known as slashing.",
      },
      {
        id: "b003-c",
        label: "Stakers run powerful computers to demonstrate proof-of-work",
        explanation:
          "Stakers do not need powerful hardware to stake their ETH. Ethereum stopped using proof-of-work at The Merge.",
      },
      {
        id: "b003-d",
        label: "Stakers undergo KYC before being accepted as a validator",
        explanation:
          "Staking on Ethereum is permissionless and does not require KYC.",
      },
    ],
    correctAnswerId: "b003-b",
  },
  b004: {
    prompt: "ETH is valuable because:",
    answers: [
      {
        id: "b004-a",
        label: "ETH is needed to do anything on Ethereum",
        explanation:
          "This answer is correct, but there are also other correct answers.",
      },
      {
        id: "b004-b",
        label: "ETH is an un-censorable peer-to-peer money",
        explanation:
          "This answer is correct, but there are also other correct answers.",
      },
      {
        id: "b004-c",
        label: "ETH is used as collateral for crypto loans",
        explanation:
          "This answer is correct, but there are also other correct answers.",
      },
      {
        id: "b004-d",
        label: "All of the above",
        explanation:
          "Ethereum transactions cannot be censored, ETH is required to make any transaction on Ethereum, and it is crucial to the stability of the DeFi ecosystem.",
      },
    ],
    correctAnswerId: "b004-d",
  },
  // Web3
  c001: {
    prompt: "Web3 allows users to own digital assets directly through:",
    answers: [
      {
        id: "c001-a",
        label: "DAOs",
        explanation:
          "DAOs (Decentralized autonomous organizations) are member-owned communities without centralized leadership.",
      },
      {
        id: "c001-b",
        label: "NFTs",
        explanation:
          "NFTs (Non-fungible tokens) provide a way to represent anything unique as an Ethereum-based asset.",
      },
      {
        id: "c001-c",
        label: "ENS",
        explanation:
          "ENS (Ethereum Name Service) is a decentralized naming service for the Ethereum blockchain.",
      },
      {
        id: "c001-d",
        label: "GitHub",
        explanation:
          "GitHub is a centralized platform, primarily for storing code using distributed version control. GitHub does not allow ownership of your data or digital assets.",
      },
    ],
    correctAnswerId: "c001-b",
  },
  c002: {
    prompt:
      "Web1 was read-only, Web2 is read-write, Web3 has been described as:",
    answers: [
      {
        id: "c002-a",
        label: "read-write-sell",
        explanation: "Web3 has not been described in this way.",
      },
      {
        id: "c002-b",
        label: "read-write-store",
        explanation: "Web3 has not been described in this way.",
      },
      {
        id: "c002-c",
        label: "read-write-own",
        explanation:
          "Web3 allows users to own their data and has therefore been described as ‘read-write-own’, any improvement on Web2’s, which is only ‘read-write’.",
      },
      {
        id: "c002-d",
        label: "read-write-buy",
        explanation: "Web3 has not been described in this way.",
      },
    ],
    correctAnswerId: "c002-c",
  },
  c003: {
    prompt:
      "Which iteration of the web has native payments built into its infrastructure?",
    answers: [
      {
        id: "c003-a",
        label: "Web1",
        explanation: "Web1 didn’t native, built-in payments.",
      },
      {
        id: "c003-b",
        label: "Web2",
        explanation: "Web2 does not have native, built-in payments.",
      },
      {
        id: "c003-c",
        label: "Web3",
        explanation:
          "Web3 has native, built-in payments with cryptocurrencies, such as ETH.",
      },
      {
        id: "c003-d",
        label: "All of the above",
        explanation: "Web1 and Web2 do not have native, built-in payments.",
      },
    ],
    correctAnswerId: "c003-c",
  },
  c004: {
    prompt: "The term ‘Web3’ was first coined by:",
    answers: [
      {
        id: "c004-a",
        label: "Gavin Wood",
        explanation:
          "Gavin Wood, a co-founder of Ethereum, is credited with coining the term Web3 shortly after Ethereum launched in 2014.",
      },
      {
        id: "c004-b",
        label: "Steve Jobs",
        explanation: "Steve Jobs did not coin the phrase ‘Web3’.",
      },
      {
        id: "c004-c",
        label: "Vitalik Buterin",
        explanation:
          "Vitalik Buterin, although the original founder of Ethereum, did not coin the phrase ‘Web3’.",
      },
      {
        id: "c004-d",
        label: "Elon Musk",
        explanation: "Elon Musk did not coin the phrase ‘Web3’.",
      },
    ],
    correctAnswerId: "c004-a",
  },
  c005: {
    prompt:
      "You could use a single login across all of the web through the use of:",
    answers: [
      {
        id: "c005-a",
        label: "digital identity",
        explanation:
          "Digital identity is a high-level concept, not a specific idea that would allow a single login to be used across the web.",
      },
      {
        id: "c005-b",
        label: "centralized identity",
        explanation:
          "It would not be possible to use a centralized identity provider across all of the web.",
      },
      {
        id: "c005-c",
        label: "proof-of-identity",
        explanation:
          "Proof-of-identity is a high-level concept, not a specific idea that would allow a single login to be used across the web.",
      },
      {
        id: "c005-d",
        label: "decentralized identity",
        explanation:
          "Decentralized identity authentication services, such as Sign-in-with-Ethereum, would allow the use of a single login across all of the web.",
      },
    ],
    correctAnswerId: "c005-d",
  },
  // Wallets
  d001: {
    prompt: "The most secure type of wallet is:",
    answers: [
      {
        id: "d001-a",
        label: "A mobile wallet",
        explanation:
          "Mobile wallets hold private keys on a mobile device, which typically has connections to the internet, and potentially compromised by other software.",
      },
      {
        id: "d001-b",
        label: "A hardware wallet",
        explanation:
          "A hardware wallet’s private keys are stored on a dedicated device that can be kept off of the internet and are isolated from other applications on your devices.",
      },
      {
        id: "d001-c",
        label: "A web wallet",
        explanation:
          "Web wallets have less security than hardware wallets because the private keys are stored on an internet-connected device.",
      },
      {
        id: "d001-d",
        label: "A desktop wallet",
        explanation:
          "Desktop wallets hold private keys on a computer hard drive, which typically has connections to the internet, and potentially compromised by other software.",
      },
    ],
    correctAnswerId: "d001-b",
  },
  d002: {
    prompt: "Which of the following is the best way to store your seed phrase?",
    answers: [
      {
        id: "d002-a",
        label: "In a photo on your phone",
        explanation:
          "This is not secure. If this photo is uploaded to cloud storage then a hacker gets this image and gains access to your account.",
      },
      {
        id: "d002-b",
        label: "In a file on your computer",
        explanation:
          "This is not secure. A hacker could get this file and gain access to your account.",
      },
      {
        id: "d002-c",
        label: "Written down on paper",
        explanation:
          "Of the available options, writing down your seed phrase on paper is the most secure.",
      },
      {
        id: "d002-d",
        label: "In a text message to a trusted family member",
        explanation:
          "You should never text your seed phrase to anyone. The message could be intercepted by a third party, and even if you trust this person absolutely, you do not know who may be able to access their phone.",
      },
    ],
    correctAnswerId: "d002-c",
  },
  d003: {
    prompt: "Who should you give your seed phrase / private keys to:",
    answers: [
      {
        id: "d003-a",
        label: "Someone you’re paying",
        explanation:
          "You should never give your seed phrase or private keys to anyone. Instead, send tokens to their wallet address via a transaction.",
      },
      {
        id: "d003-b",
        label: "To login to a dapp or wallet",
        explanation:
          "You should never give your seed phrase / private keys to login to your wallet or dapp.",
      },
      {
        id: "d003-c",
        label: "Support staff",
        explanation:
          "You should never give your seed phrase / private keys to anyone claiming to be support staff. Anyone asking you for this is a scammer.",
      },
      {
        id: "d003-d",
        label: "No one",
        explanation:
          "Ideally, you should never give your seed phrase or private keys to anyone. If you trust someone completely with absolute access to your funds (such as a spouse), then you may decide to share this information with them.",
      },
    ],
    correctAnswerId: "d003-d",
  },
  d004: {
    prompt: "A wallet and an account on Ethereum are the same thing.",
    answers: [
      {
        id: "d004-a",
        label: "True",
        explanation:
          "A wallet is a visual interface used to interact with an Ethereum account.",
      },
      {
        id: "d004-b",
        label: "False",
        explanation:
          "A wallet is a visual interface used to interact with an Ethereum account.",
      },
    ],
    correctAnswerId: "d004-b",
  },
  // Security
  e001: {
    prompt: "Why should you use unique passwords for all of your accounts?",
    answers: [
      {
        id: "e001-a",
        label: "In case one of the platforms has a data breach",
        explanation:
          "This answer is correct, but there are also other correct answers.",
      },
      {
        id: "e001-b",
        label:
          "In case someone looking over your shoulder works out your password",
        explanation:
          "This answer is correct, but there are also other correct answers.",
      },
      {
        id: "e001-c",
        label: "In case malware, such as a key-logger, steals your password",
        explanation:
          "This answer is correct, but there are also other correct answers.",
      },
      {
        id: "e001-d",
        label: "All of the above",
        explanation:
          "All answers are correct. Using unique passwords is the best way to prevent anyone else from accessing your account.",
      },
    ],
    correctAnswerId: "e001-d",
  },
  // Question ID d003 as well
  e002: {
    prompt: "Following The Merge, ETH must be upgraded to ETH2.",
    answers: [
      {
        id: "e002-a",
        label: "True",
        explanation:
          "You do not need to upgrade your ETH to ETH2. There is no ETH2 and this is a common narrative used by scammers.",
      },
      {
        id: "e002-b",
        label: "False",
        explanation:
          "You do not need to upgrade your ETH to ETH2. There is no ETH2 and this is a common narrative used by scammers.",
      },
    ],
    correctAnswerId: "e002-b",
  },
  e003: {
    prompt: "ETH giveaways are:",
    answers: [
      {
        id: "e003-a",
        label: "a good way to get more ETH",
        explanation:
          "ETH giveaways are scams designed to steal your ETH and other tokens. They are never a good way to get more ETH.",
      },
      {
        id: "e003-b",
        label: "always genuine",
        explanation: "ETH giveaways are never genuine.",
      },
      {
        id: "e003-c",
        label: "commonly performed by prominent members of the community",
        explanation:
          "Prominent community members do not do ETH giveaways. Scammers pretend well-know individuals, such as Elon Musk, are doing giveaways to give them the scam a sense of legitimacy.",
      },
      {
        id: "e003-d",
        label: "always a scam",
        explanation:
          "ETH giveaways are always scams. Reporting and ignoring scammers is best.",
      },
    ],
    correctAnswerId: "e003-d",
  },
  e004: {
    prompt: "Ethereum transaction are reversible.",
    answers: [
      {
        id: "e004-a",
        label: "True",
        explanation:
          "Ethereum transactions cannot be reversed. Anyone who tells you otherwise might be trying to scam you.",
      },
      {
        id: "e004-b",
        label: "False",
        explanation:
          "Ethereum transactions cannot be reversed. Anyone who tells you otherwise might be trying to scam you.",
      },
    ],
    correctAnswerId: "e004-b",
  },
  // NFTs
  f001: {
    prompt: "NFTs are most comprehensively defined as:",
    answers: [
      {
        id: "f001-a",
        label: "unique digital assets",
        explanation: "NFTs represent a unique digital asset.", // with an owner
      },
      {
        id: "f001-b",
        label: "digital artwork",
        explanation:
          "NFTs represent a unique digital asset, this is commonly digital artwork, but it isn’t limited to art.",
      },
      {
        id: "f001-c",
        label: "tickets to exclusive events",
        explanation:
          "NFTs represent a unique digital asset, this is commonly digital artwork, but it isn’t limited to tickets to exclusive events.",
      },
      {
        id: "f001-d",
        label: "legally binding contracts",
        explanation:
          "Although a legal contract could be represented as an NFT, NFTs are not exclusive to legally binding contracts.",
      },
    ],
    correctAnswerId: "f001-a",
  },
  f002: {
    prompt: "Two NFTs representing the same artwork are the same thing.",
    answers: [
      {
        id: "f002-a",
        label: "True",
        explanation:
          "NFTs are non-fungible, even if they represent the same thing, they are still unique digital assets.",
      },
      {
        id: "f002-b",
        label: "False",
        explanation:
          "NFTs are non-fungible, even if they represent the same thing, they are still unique digital assets.",
      },
    ],
    correctAnswerId: "f002-b",
  },
  f003: {
    prompt: "NFTs most commonly represent:",
    answers: [
      {
        id: "f003-a",
        label: "The password to your wallet",
        explanation: "This is a security risk and generally a bad idea!",
      },
      {
        id: "f003-b",
        label: "Ownership of a unique digital item",
        explanation:
          "NFTs commonly represent ownership of a unique digital item.",
      },
      {
        id: "f003-c",
        label: "Your current ETH balance",
        explanation: "NFTs cannot represent your ETH balance arbitrarily.",
      },
      {
        id: "f003-d",
        label: "All of the above",
        explanation:
          "NFTs commonly represent ownership of a unique digital item, not ETH balances or wallet passwords.",
      },
    ],
    correctAnswerId: "f003-b",
  },
  f004: {
    prompt: "NFTs have helped create a new:",
    answers: [
      {
        id: "f004-a",
        label: "curator economy",
        explanation:
          "NFTs helped create a new economy for creators, not curators.",
      },
      {
        id: "f004-b",
        label: "carbon economy",
        explanation:
          "NFTs helped create a new economy for creators, not carbon.",
      },
      {
        id: "f004-c",
        label: "creator economy",
        explanation: "NFTs helped create the creator economy.",
      },
      {
        id: "f004-d",
        label: "ownership economy",
        explanation:
          "NFTs helped create a new economy for creators, not ownership.",
      },
    ],
    correctAnswerId: "f004-c",
  },
  f005: {
    prompt: "NFTs on Ethereum are harmful to the environment",
    answers: [
      {
        id: "f005-a",
        label: "True",
        explanation:
          "Since The Merge (transition to proof-of-stake), any transaction has been a negligible impact on the environment.",
      },
      {
        id: "f005-b",
        label: "False",
        explanation:
          "Since The Merge (transition to proof-of-stake), any transaction has been a negligible impact on the environment.",
      },
    ],
    correctAnswerId: "f005-b",
  },
}

export default questionBank
