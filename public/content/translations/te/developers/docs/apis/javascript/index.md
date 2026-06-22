---
title: "JavaScript API లైబ్రరీలు"
description: "మీ అప్లికేషన్ నుండి బ్లాక్‌చైన్‌తో ఇంటరాక్ట్ అవ్వడానికి మిమ్మల్ని అనుమతించే JavaScript క్లయింట్ లైబ్రరీల పరిచయం."
lang: te
---

ఒక వెబ్ యాప్ ఎథీరియం బ్లాక్‌చైన్‌తో ఇంటరాక్ట్ అవ్వాలంటే (అంటే, బ్లాక్‌చైన్ డేటాను చదవడం మరియు/లేదా నెట్‌వర్క్‌కు లావాదేవీలను పంపడం), అది తప్పనిసరిగా ఎథీరియం నోడ్‌కి కనెక్ట్ అవ్వాలి.

ఈ ప్రయోజనం కోసం, ప్రతి ఎథీరియం క్లయింట్ [జేసన్-ఆర్‌పీసీ](/developers/docs/apis/json-rpc/) స్పెసిఫికేషన్‌ను అమలు చేస్తుంది, కాబట్టి అప్లికేషన్‌లు ఆధారపడగల ఏకరీతి [పద్ధతుల](/developers/docs/apis/json-rpc/#json-rpc-methods) సమితి ఉంటుంది.

మీరు ఎథీరియం నోడ్‌తో కనెక్ట్ అవ్వడానికి JavaScriptను ఉపయోగించాలనుకుంటే, వనిల్లా JavaScriptను ఉపయోగించడం సాధ్యమే కానీ పర్యావరణ వ్యవస్థలో దీన్ని మరింత సులభతరం చేసే అనేక అనుకూలమైన లైబ్రరీలు ఉన్నాయి. ఈ లైబ్రరీలతో, డెవలపర్‌లు ఎథీరియంతో ఇంటరాక్ట్ అయ్యే జేసన్-ఆర్‌పీసీ అభ్యర్థనలను (అంతర్గతంగా) ప్రారంభించడానికి సహజమైన, ఒక-లైన్ పద్ధతులను వ్రాయగలరు.

దయచేసి గమనించండి, [ది మెర్జ్](/roadmap/merge/) నుండి, నోడ్‌ను రన్ చేయడానికి రెండు కనెక్ట్ చేయబడిన ఎథీరియం సాఫ్ట్‌వేర్ భాగాలు - ఒక అమలు క్లయింట్ మరియు ఒక ఏకాభిప్రాయ క్లయింట్ - అవసరం. దయచేసి మీ నోడ్‌లో అమలు మరియు ఏకాభిప్రాయ క్లయింట్ రెండూ ఉన్నాయని నిర్ధారించుకోండి. మీ నోడ్ మీ స్థానిక మెషీన్‌లో లేకుంటే (ఉదాహరణకు, మీ నోడ్ AWS ఇన్‌స్టాన్స్‌లో రన్ అవుతుంటే) ట్యుటోరియల్‌లోని IP చిరునామాలను తదనుగుణంగా అప్‌డేట్ చేయండి. మరింత సమాచారం కోసం దయచేసి [నోడ్‌ను రన్ చేయడం](/developers/docs/nodes-and-clients/run-a-node/)పై మా పేజీని చూడండి.

## ముందస్తు అవసరాలు {#prerequisites}

JavaScriptను అర్థం చేసుకోవడంతో పాటు, [ఎథీరియం స్టాక్](/developers/docs/ethereum-stack/) మరియు [ఎథీరియం క్లయింట్‌లను](/developers/docs/nodes-and-clients/) అర్థం చేసుకోవడం సహాయకరంగా ఉండవచ్చు.

## లైబ్రరీని ఎందుకు ఉపయోగించాలి? {#why-use-a-library}

ఈ లైబ్రరీలు ఎథీరియం నోడ్‌తో నేరుగా ఇంటరాక్ట్ అయ్యే సంక్లిష్టతను చాలా వరకు తగ్గిస్తాయి. అవి యుటిలిటీ ఫంక్షన్‌లను కూడా అందిస్తాయి (ఉదా., ETHని Gweiకి మార్చడం) కాబట్టి డెవలపర్‌గా మీరు ఎథీరియం క్లయింట్‌ల చిక్కులతో వ్యవహరించడానికి తక్కువ సమయాన్ని వెచ్చించవచ్చు మరియు మీ అప్లికేషన్ యొక్క ప్రత్యేక కార్యాచరణపై ఎక్కువ సమయం దృష్టి పెట్టవచ్చు.

## లైబ్రరీ ఫీచర్లు {#library-features}

### ఎథీరియం నోడ్‌లకు కనెక్ట్ అవ్వండి {#connect-to-ethereum-nodes}

ప్రొవైడర్‌లను ఉపయోగించి, ఈ లైబ్రరీలు ఎథీరియంతో కనెక్ట్ అవ్వడానికి మరియు దాని డేటాను చదవడానికి మిమ్మల్ని అనుమతిస్తాయి, అది జేసన్-ఆర్‌పీసీ, Infura, Etherscan, Alchemy లేదా మెటామాస్క్ ద్వారా అయినా సరే.

> **హెచ్చరిక:** Web3.js మార్చి 4, 2025న ఆర్కైవ్ చేయబడింది. [ప్రకటనను చదవండి](https://blog.chainsafe.io/web3-js-sunset/). కొత్త ప్రాజెక్ట్‌ల కోసం [ethers.js](https://ethers.org) లేదా [viem](https://viem.sh) వంటి ప్రత్యామ్నాయ లైబ్రరీలను ఉపయోగించడాన్ని పరిగణించండి.

**Ethers ఉదాహరణ**

```js
// BrowserProvider ఒక ప్రామాణిక Web3 ప్రొవైడర్‌ను వ్రాప్ చేస్తుంది, ఇది
// మెటామాస్క్ ప్రతి పేజీలోకి window.ethereum గా ఇంజెక్ట్ చేసేది
const provider = new ethers.BrowserProvider(window.ethereum)

// మెటామాస్క్ ప్లగిన్ లావాదేవీలపై సంతకం చేయడానికి కూడా అనుమతిస్తుంది
// ఈథర్‌ను పంపడానికి మరియు బ్లాక్‌చైన్ లోపల స్థితిని మార్చడానికి చెల్లించడానికి.
// దీని కోసం, మనకు ఖాతా సైనర్ అవసరం...
const signer = provider.getSigner()
```

**Web3js ఉదాహరణ**

```js
var web3 = new Web3("http://localhost:8545")
// లేదా
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// ప్రొవైడర్‌ను మార్చండి
web3.setProvider("ws://localhost:8546")
// లేదా
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js లో IPC ప్రొవైడర్‌ను ఉపయోగించడం
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os పాత్
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os పాత్
// windows లో పాత్: "\\\\.\\pipe\\geth.ipc"
// linux లో పాత్: "/users/myuser/.ethereum/geth.ipc"
```

సెటప్ చేసిన తర్వాత మీరు బ్లాక్‌చైన్‌ను వీటి కోసం క్వెరీ చేయగలరు:

- బ్లాక్ నంబర్‌లు
- గ్యాస్ అంచనాలు
- స్మార్ట్ కాంట్రాక్ట్ ఈవెంట్‌లు
- నెట్‌వర్క్ id
- మరియు మరిన్ని...

### వాలెట్ కార్యాచరణ {#wallet-functionality}

ఈ లైబ్రరీలు వాలెట్‌లను సృష్టించడానికి, కీలను నిర్వహించడానికి మరియు లావాదేవీలపై సంతకం చేయడానికి మీకు కార్యాచరణను అందిస్తాయి.

Ethers నుండి ఇక్కడ ఒక ఉదాహరణ ఉంది

```js
// నెమోనిక్ నుండి వాలెట్ ఇన్‌స్టాన్స్‌ను సృష్టించండి...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...లేదా ప్రైవేట్ కీ నుండి
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// సైనర్ API ప్రకారం ప్రామిస్‌గా చిరునామా
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// వాలెట్ చిరునామా సింక్రోనస్‌గా కూడా అందుబాటులో ఉంటుంది
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// అంతర్గత క్రిప్టోగ్రాఫిక్ భాగాలు
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// వాలెట్ నెమోనిక్
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// గమనిక: ప్రైవేట్ కీతో సృష్టించబడిన వాలెట్ కలిగి ఉండదు
//       నెమోనిక్‌ను (డెరివేషన్ దానిని నిరోధిస్తుంది)
walletPrivateKey.mnemonic
// null

// సందేశంపై సంతకం చేయడం
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// లావాదేవీపై సంతకం చేయడం
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// కనెక్ట్ పద్ధతి దీని యొక్క కొత్త ఇన్‌స్టాన్స్‌ను అందిస్తుంది
// ప్రొవైడర్‌కు కనెక్ట్ చేయబడిన వాలెట్
wallet = walletMnemonic.connect(provider)

// నెట్‌వర్క్‌ను క్వెరీ చేయడం
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ఈథర్‌ను పంపడం
wallet.sendTransaction(tx)
```

[పూర్తి డాక్యుమెంటేషన్‌ను చదవండి](https://docs.ethers.io/v5/api/signer/#Wallet)

సెటప్ చేసిన తర్వాత మీరు వీటిని చేయగలరు:

- ఖాతాలను సృష్టించడం
- లావాదేవీలను పంపడం
- లావాదేవీలపై సంతకం చేయడం
- మరియు మరిన్ని...

### స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్‌లతో ఇంటరాక్ట్ అవ్వండి {#interact-with-smart-contract-functions}

కంపైల్ చేయబడిన కాంట్రాక్ట్ యొక్క అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI)ని చదవడం ద్వారా స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్‌లను కాల్ చేయడానికి JavaScript క్లయింట్ లైబ్రరీలు మీ అప్లికేషన్‌ను అనుమతిస్తాయి.

ABI ముఖ్యంగా కాంట్రాక్ట్ యొక్క ఫంక్షన్‌లను JSON ఫార్మాట్‌లో వివరిస్తుంది మరియు దానిని సాధారణ JavaScript ఆబ్జెక్ట్ లాగా ఉపయోగించడానికి మిమ్మల్ని అనుమతిస్తుంది.

కాబట్టి కింది Solidity కాంట్రాక్ట్:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

కింది JSONకి దారి తీస్తుంది:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

దీని అర్థం మీరు వీటిని చేయవచ్చు:

- స్మార్ట్ కాంట్రాక్ట్‌కు లావాదేవీని పంపడం మరియు దాని పద్ధతిని అమలు చేయడం
- EVMలో అమలు చేసినప్పుడు ఒక పద్ధతి అమలుకు ఎంత గ్యాస్ పడుతుందో అంచనా వేయడానికి కాల్ చేయడం
- కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడం
- మరియు మరిన్ని...

### యుటిలిటీ ఫంక్షన్‌లు {#utility-functions}

యుటిలిటీ ఫంక్షన్‌లు మీకు సులభమైన షార్ట్‌కట్‌లను అందిస్తాయి, ఇవి ఎథీరియంతో నిర్మించడాన్ని కొంచెం సులభతరం చేస్తాయి.

ETH విలువలు డిఫాల్ట్‌గా Weiలో ఉంటాయి. 1 ETH = 1,000,000,000,000,000,000 WEI – అంటే మీరు చాలా సంఖ్యలతో వ్యవహరిస్తున్నారని అర్థం! `web3.utils.toWei` మీ కోసం ఈథర్‌ను Weiకి మారుస్తుంది.

మరియు ethersలో ఇది ఇలా కనిపిస్తుంది:

```js
// ఖాతా బ్యాలెన్స్‌ను పొందండి (చిరునామా లేదా ENS పేరు ద్వారా)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// తరచుగా మీరు వినియోగదారు కోసం అవుట్‌పుట్‌ను ఫార్మాట్ చేయాల్సి ఉంటుంది
// వారు విలువలని (Wei కి బదులుగా) ఈథర్‌లో చూడటానికి ఇష్టపడతారు
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js యుటిలిటీ ఫంక్షన్‌లు](https://docs.web3js.org/api/web3-utils)
- [Ethers యుటిలిటీ ఫంక్షన్‌లు](https://docs.ethers.org/v6/api/utils/)

## అందుబాటులో ఉన్న లైబ్రరీలు {#available-libraries}

**Web3.js -** **_ఎథీరియం JavaScript API._**

- [డాక్యుమెంటేషన్](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_JavaScript మరియు TypeScriptలో పూర్తి ఎథీరియం వాలెట్ అమలు మరియు యుటిలిటీలు._**

- [Ethers.js హోమ్](https://ethers.org/)
- [డాక్యుమెంటేషన్](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_ఎథీరియం మరియు IPFS డేటాను ఇండెక్స్ చేయడానికి మరియు GraphQLని ఉపయోగించి దాన్ని క్వెరీ చేయడానికి ఒక ప్రోటోకాల్._**

- [The Graph](https://thegraph.com)
- [గ్రాఫ్ ఎక్స్‌ప్లోరర్](https://thegraph.com/explorer)
- [డాక్యుమెంటేషన్](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [డిస్కార్డ్](https://thegraph.com/discord)

**Alchemy SDK -** **_మెరుగైన APIలతో Ethers.js చుట్టూ ఉన్న వ్రాపర్._**

- [డాక్యుమెంటేషన్](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_ఎథీరియం కోసం TypeScript ఇంటర్‌ఫేస్._**

- [డాక్యుమెంటేషన్](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_డజన్ల కొద్దీ చైన్‌లలో రియల్-టైమ్, సుసంపన్నమైన బ్లాక్‌చైన్ డేటా API._**

- [డాక్యుమెంటేషన్](https://docs.codex.io)
- [ఎక్స్‌ప్లోరర్](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [డిస్కార్డ్](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_అంతర్నిర్మిత కాషింగ్, హుక్స్ మరియు టెస్ట్ మాక్స్‌తో కూడిన TypeScript మెటా-లైబ్రరీ._**

- [డాక్యుమెంటేషన్](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## తదుపరి పఠనం {#further-reading}

_మీకు సహాయపడిన కమ్యూనిటీ వనరు గురించి తెలుసా? ఈ పేజీని సవరించి, దాన్ని జోడించండి!_

## సంబంధిత అంశాలు {#related-topics}

- [నోడ్‌లు మరియు క్లయింట్‌లు](/developers/docs/nodes-and-clients/)
- [డెవలప్‌మెంట్ ఫ్రేమ్‌వర్క్‌లు](/developers/docs/frameworks/)

## సంబంధిత ట్యుటోరియల్స్ {#related-tutorials}

- [JavaScriptలో ఎథీరియం బ్లాక్‌చైన్‌ను ఉపయోగించడానికి Web3jsని సెటప్ చేయండి](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– మీ ప్రాజెక్ట్‌లో web3.jsని సెటప్ చేయడానికి సూచనలు._
- [JavaScript నుండి స్మార్ట్ కాంట్రాక్ట్‌ను కాల్ చేయడం](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI టోకెన్‌ను ఉపయోగించి, JavaScriptని ఉపయోగించి కాంట్రాక్ట్‌ల ఫంక్షన్‌ను ఎలా కాల్ చేయాలో చూడండి._
- [web3 మరియు Alchemyని ఉపయోగించి లావాదేవీలను పంపడం](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– బ్యాకెండ్ నుండి లావాదేవీలను పంపడానికి దశల వారీ మార్గదర్శి._

## ట్యుటోరియల్స్: ఎథీరియంపై JavaScript APIలు & WebSockets {#tutorials}

- [WebSockets ఉపయోగించడం](/developers/tutorials/using-websockets/) _– ఎథీరియం ఈవెంట్‌లకు సబ్‌స్క్రైబ్ చేయడానికి మరియు రియల్-టైమ్ జేసన్-ఆర్‌పీసీ అభ్యర్థనలను చేయడానికి Alchemyతో WebSocketsని ఎలా ఉపయోగించాలి._