---
title: జావాస్క్రిప్ట్ API లైబ్రరీలు
description: మీ అప్లికేషన్ నుండి బ్లాక్‌చెయిన్‌తో సంభాషించడానికి మిమ్మల్ని అనుమతించే జావాస్క్రిప్ట్ క్లయింట్ లైబ్రరీలకు ఒక పరిచయం.
lang: te
---

ఒక వెబ్ యాప్ ఇతీరియము బ్లాక్‌చెయిన్‌తో సంభాషించడానికి (అనగా, బ్లాక్‌చెయిన్ డేటాను చదవడం మరియు/లేదా నెట్‌వర్క్‌కు లావాదేవీలను పంపడం), అది తప్పనిసరిగా ఒక ఇతీరియము నోడ్‌కు కనెక్ట్ అవ్వాలి.

ఈ ప్రయోజనం కోసం, ప్రతి ఇతీరియము క్లయింట్ [JSON-RPC](/developers/docs/apis/json-rpc/) స్పెసిఫికేషన్‌ను అమలు చేస్తుంది, కాబట్టి అప్లికేషన్‌లు ఆధారపడగల ఏకరూప [పద్ధతుల](/developers/docs/apis/json-rpc/#json-rpc-methods) సమితి ఉంది.

మీరు ఒక ఇతీరియము నోడ్‌కు కనెక్ట్ అవ్వడానికి జావాస్క్రిప్ట్ ఉపయోగించాలనుకుంటే, వనిల్లా జావాస్క్రిప్ట్‌ను ఉపయోగించడం సాధ్యమే, కానీ పర్యావరణ వ్యవస్థలో దీన్ని చాలా సులభతరం చేసే అనేక సౌలభ్య లైబ్రరీలు ఉన్నాయి. ఈ లైబ్రరీలతో, డెవలపర్లు ఇతీరియముతో సంభాషించే JSON-RPC అభ్యర్థనలను (తెరవెనుక) ప్రారంభించడానికి, స్పష్టమైన, ఒక-వరుస పద్ధతులను వ్రాయగలరు.

దయచేసి గమనించండి, [ది మెర్జ్](/roadmap/merge/) నుండి, ఒక నోడ్‌ను అమలు చేయడానికి రెండు అనుసంధానించబడిన ఇతీరియము సాఫ్ట్‌వేర్ భాగాలు - ఒక ఎగ్జిక్యూషన్ క్లయింట్ మరియు ఒక ఏకాభిప్రాయం క్లయింట్ - అవసరం. దయచేసి మీ నోడ్‌లో ఎగ్జిక్యూషన్ మరియు ఏకాభిప్రాయం క్లయింట్లు రెండూ ఉన్నాయని నిర్ధారించుకోండి. మీ నోడ్ మీ స్థానిక మెషీన్‌లో లేకపోతే (ఉదాహరణకు, మీ నోడ్ ఒక AWS ఇన్‌స్టాన్స్‌లో నడుస్తుంటే), ట్యుటోరియల్‌లోని IP చిరునామాలను తదనుగుణంగా అప్‌డేట్ చేయండి. మరింత సమాచారం కోసం, దయచేసి [ఒక నోడ్‌ను అమలు చేయడం](/developers/docs/nodes-and-clients/run-a-node/)పై మా పేజీని చూడండి.

## అవసరాలు {#prerequisites}

జావాస్క్రిప్ట్‌ను అర్థం చేసుకోవడంతో పాటు, [ఇతీరియము స్టాక్](/developers/docs/ethereum-stack/) మరియు [ఇతీరియము క్లయింట్లు](/developers/docs/nodes-and-clients/)ను అర్థం చేసుకోవడం సహాయకరంగా ఉంటుంది.

## ఒక లైబ్రరీని ఎందుకు ఉపయోగించాలి? {#why-use-a-library}

ఈ లైబ్రరీలు ఇతీరియము నోడ్‌తో నేరుగా సంభాషించడంలో ఉన్న సంక్లిష్టతను చాలా వరకు సంగ్రహిస్తాయి. అవి యుటిలిటీ ఫంక్షన్‌లను (ఉదా., ETHని Gweiకి మార్చడం) కూడా అందిస్తాయి, కాబట్టి డెవలపర్‌గా మీరు ఇతీరియము క్లయింట్‌ల చిక్కులతో తక్కువ సమయం గడపవచ్చు మరియు మీ అప్లికేషన్ యొక్క ప్రత్యేకమైన కార్యాచరణపై ఎక్కువ దృష్టి పెట్టవచ్చు.

## లైబ్రరీ ఫీచర్లు {#library-features}

### ఇతీరియము నోడ్‌లకు కనెక్ట్ అవ్వండి {#connect-to-ethereum-nodes}

ప్రొవైడర్లను ఉపయోగించి, ఈ లైబ్రరీలు మిమ్మల్ని ఇతీరియముకు కనెక్ట్ చేయడానికి మరియు దాని డేటాను చదవడానికి అనుమతిస్తాయి, అది JSON-RPC, INFURA, Etherscan, Alchemy లేదా MetaMask ద్వారా అయినా.

> **హెచ్చరిక:** Web3.js మార్చి 4, 2025న ఆర్కైవ్ చేయబడింది. [ప్రకటనను చదవండి](https://blog.chainsafe.io/web3-js-sunset/). కొత్త ప్రాజెక్ట్‌ల కోసం [ethers.js](https://ethers.org) లేదా [viem](https://viem.sh) వంటి ప్రత్యామ్నాయ లైబ్రరీలను ఉపయోగించడాన్ని పరిగణించండి.

**Ethers ఉదాహరణ**

```js
// ఒక బ్రౌజర్‌ప్రొవైడర్ ఒక ప్రామాణిక Web3 ప్రొవైడర్‌ను చుట్టి ఉంటుంది, ఇది
// MetaMask ప్రతి పేజీలోకి window.ethereumగా ఇంజెక్ట్ చేస్తుంది
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMask ప్లగిన్ లావాదేవీలపై సంతకం చేయడానికి కూడా అనుమతిస్తుంది
// ఈథర్ పంపడానికి మరియు బ్లాక్‌చెయిన్‌లో స్థితిని మార్చడానికి చెల్లించడానికి.
// దీని కోసం, మనకు ఖాతా సంతకం చేసేవారు అవసరం...
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

// node.jsలో IPC ప్రొవైడర్‌ను ఉపయోగించడం
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os పాత్
// లేదా
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os పాత్
// windowsలో పాత్: "\\\\.\\pipe\\geth.ipc"
// linuxలో పాత్: "/users/myuser/.ethereum/geth.ipc"
```

ఒకసారి సెటప్ చేసిన తర్వాత మీరు బ్లాక్‌చెయిన్‌ను వీటి కోసం ప్రశ్నించగలరు:

- బ్లాక్ నంబర్లు
- గ్యాస్ అంచనాలు
- స్మార్ట్ కాంట్రాక్ట్ ఈవెంట్‌లు
- నెట్‌వర్క్ ఐడి
- ఇంకా మరిన్ని...

### వాలెట్ ఫంక్షనాలిటీ {#wallet-functionality}

ఈ లైబ్రరీలు మీకు వాలెట్‌లను సృష్టించడానికి, కీలను నిర్వహించడానికి మరియు లావాదేవీలపై సంతకం చేయడానికి ఫంక్షనాలిటీని అందిస్తాయి.

Ethers నుండి ఒక ఉదాహరణ ఇక్కడ ఉంది

```js
// ఒక నిమోనిక్ నుండి వాలెట్ ఉదాహరణను సృష్టించండి...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...లేదా ఒక ప్రైవేట్ కీ నుండి
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// నిజం

// సైனர் API ప్రకారం ఒక ప్రామిస్‌గా చిరునామా
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// ఒక వాలెట్ చిరునామా సింక్రొనస్‌గా కూడా అందుబాటులో ఉంది
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// అంతర్గత క్రిప్టోగ్రాఫిక్ భాగాలు
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// వాలెట్ నిమోనిక్
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// గమనిక: ఒక ప్రైవేట్ కీతో సృష్టించబడిన వాలెట్‌కు
//       నిమోనిక్ ఉండదు (ఉత్పన్నం దానిని నిరోధిస్తుంది)
walletPrivateKey.mnemonic
// null

// ఒక సందేశంపై సంతకం చేయడం
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// ఒక లావాదేవీపై సంతకం చేయడం
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// కనెక్ట్ పద్ధతి ఒక కొత్త ఉదాహరణను అందిస్తుంది
// ఒక ప్రొవైడర్‌కు కనెక్ట్ చేయబడిన వాలెట్
wallet = walletMnemonic.connect(provider)

// నెట్‌వర్క్‌ను ప్రశ్నించడం
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ఈథర్‌ను పంపడం
wallet.sendTransaction(tx)
```

[పూర్తి డాక్స్‌ను చదవండి](https://docs.ethers.io/v5/api/signer/#Wallet)

ఒకసారి సెటప్ చేసిన తర్వాత మీరు వీటిని చేయగలరు:

- ఖాతాలను సృష్టించండి
- లావాదేవీలను పంపండి
- లావాదేవీలపై సంతకం చేయండి
- ఇంకా మరిన్ని...

### స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్‌లతో సంభాషించండి {#interact-with-smart-contract-functions}

జావాస్క్రిప్ట్ క్లయింట్ లైబ్రరీలు, కంపైల్ చేయబడిన కాంట్రాక్ట్ యొక్క అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI)ని చదవడం ద్వారా, స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్‌లను పిలవడానికి మీ అప్లికేషన్‌ను అనుమతిస్తాయి.

ABI ముఖ్యంగా కాంట్రాక్ట్ యొక్క ఫంక్షన్‌లను JSON ఫార్మాట్‌లో వివరిస్తుంది మరియు దానిని ఒక సాధారణ జావాస్క్రిప్ట్ ఆబ్జెక్ట్ లాగా ఉపయోగించడానికి మిమ్మల్ని అనుమతిస్తుంది.

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

కింది JSON ఫలితంగా వస్తుంది:

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

దీని అర్థం మీరు వీటిని చేయగలరు:

- స్మార్ట్ కాంట్రాక్ట్‌కు లావాదేవీని పంపి, దాని పద్ధతిని అమలు చేయండి
- EVMలో అమలు చేసినప్పుడు ఒక పద్ధతి అమలుకు ఎంత గ్యాస్ పడుతుందో అంచనా వేయడానికి కాల్ చేయండి
- ఒక కాంట్రాక్ట్‌ను అమలు చేయండి
- ఇంకా మరిన్ని...

### యుటిలిటీ ఫంక్షన్‌లు {#utility-functions}

యుటిలిటీ ఫంక్షన్‌లు మీకు సులభమైన సత్వరమార్గాలను అందిస్తాయి, ఇవి ఇతీరియముతో నిర్మించడాన్ని కొంచెం సులభతరం చేస్తాయి.

ETH విలువలు డిఫాల్ట్‌గా Weiలో ఉంటాయి. 1 ETH = 1,000,000,000,000,000,000 WEI – దీని అర్థం మీరు చాలా సంఖ్యలతో వ్యవహరిస్తున్నారు! `web3.utils.toWei` మీ కోసం ఈథర్‌ను Weiకి మారుస్తుంది.

మరియు ethersలో ఇది ఇలా కనిపిస్తుంది:

```js
// ఒక ఖాతా బ్యాలెన్స్‌ను పొందండి (చిరునామా లేదా ENS పేరు ద్వారా)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// తరచుగా మీరు వినియోగదారు కోసం అవుట్‌పుట్‌ను ఫార్మాట్ చేయవలసి ఉంటుంది
// వారు విలువలను ఈథర్‌లో (weiకి బదులుగా) చూడటానికి ఇష్టపడతారు
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js యుటిలిటీ ఫంక్షన్‌లు](https://docs.web3js.org/api/web3-utils)
- [Ethers యుటిలిటీ ఫంక్షన్‌లు](https://docs.ethers.org/v6/api/utils/)

## అందుబాటులో ఉన్న లైబ్రరీలు {#available-libraries}

**Web3.js -** **_ఇతీరియము జావాస్క్రిప్ట్ API._**

- [డాక్యుమెంటేషన్](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_జావాస్క్రిప్ట్ మరియు టైప్‌స్క్రిప్ట్‌లో పూర్తి ఇతీరియము వాలెట్ అమలు మరియు యుటిలిటీలు._**

- [Ethers.js హోమ్](https://ethers.org/)
- [డాక్యుమెంటేషన్](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_ఇతీరియము మరియు IPFS డేటాను ఇండెక్స్ చేయడానికి మరియు దానిని GraphQL ఉపయోగించి ప్రశ్నించడానికి ఒక ప్రోటోకాల్._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [డాక్యుమెంటేషన్](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_మెరుగుపరచబడిన APIలతో Ethers.js చుట్టూ ఉన్న వ్రాపర్._**

- [డాక్యుమెంటేషన్](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_ఇతీరియము కోసం టైప్‌స్క్రిప్ట్ ఇంటర్‌ఫేస్._**

- [డాక్యుమెంటేషన్](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_అంతర్నిర్మిత కాషింగ్, హుక్స్ మరియు టెస్ట్ మాక్స్‌తో కూడిన టైప్‌స్క్రిప్ట్ మెటా-లైబ్రరీ._**

- [డాక్యుమెంటేషన్](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## మరింత సమాచారం {#further-reading}

_మీకు సహాయపడిన కమ్యూనిటీ వనరు గురించి తెలుసా? ఈ పేజీని సవరించి, దాన్ని జోడించండి!_

## సంబంధిత అంశాలు {#related-topics}

- [నోడ్‌లు మరియు క్లయింట్లు](/developers/docs/nodes-and-clients/)
- [అభివృద్ధి ఫ్రేమ్‌వర్క్‌లు](/developers/docs/frameworks/)

## సంబంధిత ట్యుటోరియల్స్ {#related-tutorials}

- [జావాస్క్రిప్ట్‌లో ఇతీరియము బ్లాక్ చైనును ఉపయోగించడానికి Web3js ను సెటప్ చేయండి](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– మీ ప్రాజెక్ట్‌లో web3.js ను సెటప్ చేయడానికి సూచనలు._
- [జావాస్క్రిప్ట్ నుండి ఒక స్మార్ట్ కాంట్రాక్ట్‌ను పిలవడం](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI టోకెన్‌ను ఉపయోగించి, జావాస్క్రిప్ట్‌ను ఉపయోగించి కాంట్రాక్ట్‌ల ఫంక్షన్‌ను ఎలా పిలవాలో చూడండి._
- [web3 మరియు Alchemy ఉపయోగించి లావాదేవీలను పంపడం](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– బ్యాకెండ్ నుండి లావాదేవీలను పంపడం కోసం దశల వారీ వివరణ._
