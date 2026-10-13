---
title: స్మార్ట్ కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వడం
description: ఎథీరియంపై ఇప్పటికే డిప్లాయ్ చేయబడిన స్మార్ట్ కాంట్రాక్ట్‌ల నుండి ఎలా చదవాలో మరియు వాటికి ఎలా వ్రాయాలో తెలుసుకోండి.
lang: te
---

మీరు ఎల్లప్పుడూ మీ స్వంత స్మార్ట్ కాంట్రాక్ట్‌ను వ్రాసి డిప్లాయ్ చేయాల్సిన అవసరం లేదు. డెవలపర్‌గా చాలా సమయాల్లో, ఇతరులు ఇప్పటికే ఎథీరియం నెట్‌వర్క్‌లో డిప్లాయ్ చేసిన స్మార్ట్ కాంట్రాక్ట్‌లతో మీరు ఇంటరాక్ట్ అవ్వాలనుకుంటారు.

ఈ పేజీ స్మార్ట్ కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వడానికి రెండు ప్రాథమిక మార్గాలను కవర్ చేస్తుంది—డేటాను **చదవడం** మరియు డేటాను **వ్రాయడం**—మరియు ఈ రెండింటినీ చేయడానికి మీకు అవసరమైన సాధనాలను వివరిస్తుంది.

## ముందస్తు అవసరాలు {#prerequisites}

మీరు వీటిని అర్థం చేసుకోవాలి:

- [స్మార్ట్ కాంట్రాక్ట్‌లు ఎలా పనిచేస్తాయి](/developers/docs/smart-contracts/)
- [ఎథీరియం ఖాతాలు మరియు అవి లావాదేవీలపై ఎలా సంతకం చేస్తాయి](/developers/docs/accounts/)
- [లావాదేవీ అంటే ఏమిటి](/developers/docs/transactions/)

## స్మార్ట్ కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వడానికి రెండు మార్గాలు {#two-ways}

స్మార్ట్ కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వడం రెండు వర్గాలుగా విభజించబడింది:

### కాంట్రాక్ట్ నుండి చదవడం {#reading-from-a-contract}

చదవడం అనేది ఒక **ఉచిత** ఆపరేషన్, ఇది లావాదేవీని సృష్టించదు మరియు బ్లాక్‌చైన్‌లోని ఏ స్థితిని మార్చదు.

మీరు కాంట్రాక్ట్ నుండి చదివినప్పుడు, మీరు ఇప్పటికే ఉన్న డేటాను కేవలం క్వెరీ చేస్తున్నారు. ఉదాహరణకు:

- ERC-20 టోకెన్ బ్యాలెన్స్‌ని తనిఖీ చేయడం
- వికేంద్రీకృత ఎక్స్ఛేంజ్ నుండి ప్రస్తుత ధరను చదవడం
- NFT యజమానిని పొందడం

చదవడం అనేది స్థితిని సవరించదు కాబట్టి, వాటికి [గ్యాస్](/developers/docs/gas/) ఖర్చు ఉండదు మరియు ETH అవసరం లేకుండా ఎవరైనా చేయవచ్చు.

### కాంట్రాక్ట్‌కు వ్రాయడం {#writing-to-a-contract}

వ్రాయడం అనేది **స్థితిని మార్చే** ఆపరేషన్, దీనికి లావాదేవీ అవసరం మరియు గ్యాస్ ఖర్చు అవుతుంది.

మీరు కాంట్రాక్ట్‌కు వ్రాసినప్పుడు, బ్లాక్‌చైన్ స్థితిని సవరించే ఫంక్షన్‌ను మీరు ట్రిగ్గర్ చేస్తున్నారు. ఉదాహరణకు:

- టోకెన్‌లను బదిలీ చేయడం
- వికేంద్రీకృత ఎక్స్ఛేంజ్‌లో టోకెన్‌లను మార్పిడి చేయడం
- NFTని ముద్రించడం

వ్రాయడానికి ఎల్లప్పుడూ ఇవి అవసరం:

1. గ్యాస్ కోసం తగినంత ETH ఉన్న [బాహ్య యాజమాన్య ఖాతా (EOA)](/developers/docs/accounts/#types-of-account)
2. ఖాతా యొక్క ప్రైవేట్ కీ ద్వారా సంతకం చేయబడిన లావాదేవీ
3. లావాదేవీ మైన్ చేయబడి, బ్లాక్‌లో చేర్చబడాలి

[ఖాతా నైరూప్యత](/roadmap/account-abstraction/)తో, స్మార్ట్ కాంట్రాక్ట్ ఖాతా కూడా వ్రాయడాన్ని ప్రారంభించగలదు మరియు వినియోగదారు తరపున చెల్లింపుదారు గ్యాస్‌ను కవర్ చేయవచ్చు—కాబట్టి ETH ఉన్న EOA ఖచ్చితంగా అవసరం లేదు.

## కాంట్రాక్ట్ ABIలను అర్థం చేసుకోవడం {#understanding-contract-abis}

స్మార్ట్ కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వడానికి, కాంట్రాక్ట్ *ఏమి* చేయగలదో మీ అప్లికేషన్ తెలుసుకోవాలి. ఇక్కడే **అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI)** వస్తుంది.

ABI అనేది ఒక JSON డాక్యుమెంట్, ఇది వీటిని వివరిస్తుంది:

- కాంట్రాక్ట్ బహిర్గతం చేసే ప్రతి ఫంక్షన్ (పేరు, ఇన్‌పుట్‌లు, అవుట్‌పుట్‌లు)
- కాంట్రాక్ట్ విడుదల చేయగల ప్రతి ఈవెంట్
- కాంట్రాక్ట్‌తో మాట్లాడుతున్నప్పుడు డేటాను ఎలా ఎన్‌కోడ్ మరియు డీకోడ్ చేయాలి

ABIని కాంట్రాక్ట్ యొక్క సూచనల మాన్యువల్‌గా భావించండి—ఇది లేకుండా, ఏ ఫంక్షన్‌లు ఉన్నాయో లేదా అవి ఏ పారామితులను ఆశిస్తున్నాయో మీ అప్లికేషన్‌కు తెలియదు.

### కాంట్రాక్ట్ యొక్క ABIని ఎక్కడ కనుగొనాలి {#where-to-find-abis}

- **Etherscanలో ధృవీకరించబడిన కాంట్రాక్ట్‌లు** - ధృవీకరించబడిన సోర్స్ కోడ్ కోసం [Etherscan](https://etherscan.io) స్వయంచాలకంగా ABIని బహిర్గతం చేస్తుంది
- **డెవలపర్ నుండి** - అనేక ప్రాజెక్ట్‌లు తమ డాక్యుమెంటేషన్ లేదా npm ప్యాకేజీలలో తమ ABIలను ప్రచురిస్తాయి
- **సోర్స్ నుండి రూపొందించండి** - మీ వద్ద Solidity సోర్స్ కోడ్ ఉంటే, ABIని ఉత్పత్తి చేయడానికి మీరు దాన్ని [కంపైల్ చేయవచ్చు](/developers/docs/smart-contracts/compiling/)

## కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వడానికి సాధనాలు మరియు లైబ్రరీలు {#tools-and-libraries}

వెబ్ యాప్, బ్యాకెండ్ లేదా స్క్రిప్ట్ నుండి కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వడానికి డెవలపర్‌లు సాధారణంగా JavaScript/TypeScript లైబ్రరీని ఉపయోగిస్తారు.

### క్లయింట్ లైబ్రరీలు (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - ఫస్ట్-క్లాస్ టైప్ సేఫ్టీతో ఎథీరియం కోసం ఆధునిక, తేలికపాటి TypeScript ఇంటర్‌ఫేస్
- **[ethers.js](https://docs.ethers.org/)** - ఎథీరియం బ్లాక్‌చైన్‌తో ఇంటరాక్ట్ అవ్వడానికి విస్తృతంగా పరీక్షించబడిన లైబ్రరీ
- **[web3.js](https://web3js.org/)** - అసలైన ఎథీరియం JavaScript API

### బ్యాకెండ్ లైబ్రరీలు {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - సర్వర్-సైడ్ స్క్రిప్ట్‌లు మరియు బాట్‌ల కోసం Node.jsలో కూడా పనిచేస్తుంది
- **[web3.py](https://web3py.readthedocs.io/)** - ఎథీరియం ఇంటరాక్షన్ కోసం Python లైబ్రరీ
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - గెత్ (Geth) బృందం నుండి అధికారిక Go లైబ్రరీ

### ఉదాహరణ: Viemతో టోకెన్ బ్యాలెన్స్‌ని చదవడం {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC కాంట్రాక్ట్ చిరునామా మరియు ABI (పాక్షికం, balanceOf కోసం)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC 6 దశాంశాలను కలిగి ఉంది
```

### ఉదాహరణ: ethers.jsతో లావాదేవీని పంపడం {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20 బదిలీ ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // లావాదేవీ మైన్ అయ్యే వరకు వేచి ఉండండి
console.log(`Transferred! TX: ${tx.hash}`)
```

## ఈవెంట్‌లు మరియు లాగ్‌లు {#events-and-logs}

ఏదైనా జరిగిందని సూచించడానికి స్మార్ట్ కాంట్రాక్ట్‌లు **ఈవెంట్‌ల**ను విడుదల చేయగలవు. రియల్ టైమ్‌లో ప్రతిస్పందించడానికి మీ అప్లికేషన్ ఈ ఈవెంట్‌లను వినగలదు.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// USDC బదిలీ ఈవెంట్‌ల కోసం గమనించండి
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## లావాదేవీలను అనుకరించడం (సిమ్యులేట్ చేయడం) {#simulating}

లావాదేవీని పంపే ముందు, గ్యాస్ ఖర్చు చేయకుండా అది విజయవంతమవుతుందో లేదో తనిఖీ చేయడానికి—మరియు దాని రిటర్న్ విలువను చూడటానికి—మీరు దాన్ని **అనుకరించవచ్చు (simulate)**. లోపాలను ముందుగానే పట్టుకోవడానికి మరియు ఫలితాలను ప్రివ్యూ చేయడానికి ఇది ఉపయోగపడుతుంది.

చాలా క్లయింట్ లైబ్రరీలు `eth_call` ద్వారా దీనికి మద్దతు ఇస్తాయి:

```ts
// Viem తో
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## వాలెట్‌లు మరియు సంతకం చేయడం {#wallets-and-signing}

వికేంద్రీకృత అప్లికేషన్ (dapp)లో, వినియోగదారు వాలెట్ (మెటామాస్క్, Rainbow లేదా WalletConnect వంటివి) సంతకం చేయడాన్ని నిర్వహిస్తుంది. మీరు ప్రైవేట్ కీలను నేరుగా నిర్వహించరు.

[వాలెట్ లైబ్రరీలు మరియు కనెక్షన్ సాధనాలు](/developers/docs/apis/javascript/) దీన్ని నైరూప్యపరుస్తాయి, తద్వారా మీరు మీ అప్లికేషన్ లాజిక్‌ను నిర్మించడంపై దృష్టి పెట్టవచ్చు.

## సంబంధిత ట్యుటోరియల్స్ {#related-tutorials}

- [JavaScript నుండి స్మార్ట్ కాంట్రాక్ట్‌ను కాల్ చేయడం](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [web3.js మరియు Alchemy ఉపయోగించి లావాదేవీలను పంపడం](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [మీ వాలెట్‌లో మీ NFTని ఎలా చూడాలి](/developers/tutorials/how-to-view-nft-in-metamask/)

## తదుపరి పఠనం {#further-reading}

- [Viem డాక్యుమెంటేషన్: కాంట్రాక్ట్‌లకు చదవడం మరియు వ్రాయడం](https://viem.sh/docs/contract/readContract)
- [ethers.js డాక్యుమెంటేషన్: కాంట్రాక్ట్‌లు](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI స్పెసిఫికేషన్](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [ABI అంటే ఏమిటి? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## సంబంధిత అంశాలు {#related-topics}

- [స్మార్ట్ కాంట్రాక్ట్‌లను కంపైలింగ్ చేయడం](/developers/docs/smart-contracts/compiling/)
- [స్మార్ట్ కాంట్రాక్ట్‌లను డిప్లాయ్ చేయడం](/developers/docs/smart-contracts/deploying/)
- [JavaScript APIలు](/developers/docs/apis/javascript/)
- [బ్యాకెండ్ APIలు](/developers/docs/apis/backend/)