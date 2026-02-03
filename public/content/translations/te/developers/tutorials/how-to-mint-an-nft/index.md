---
title: "NFTని ఎలా ముద్రించాలి (NFT ట్యుటోరియల్ సిరీస్లో 2/3వ భాగం)"
description: "ఈ ట్యుటోరియల్ మా స్మార్ట్ కాంట్రాక్ట్ మరియు Web3ని ఉపయోగించి ఇతీరియము బ్లాక్ చైనులో NFTని ఎలా ముద్రించాలో వివరిస్తుంది."
author: "సుమి ముద్గిల్"
tags:
  [
    "ERC-721",
    "alchemy",
    "దృఢత్వం",
    "స్మార్ట్ కాంట్రాక్టులు"
  ]
skill: "ఆరంభకులు"
lang: te
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 మిలియన్
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 మిలియన్
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 మిలియన్

వారందరూ Alchemy యొక్క శక్తివంతమైన APIని ఉపయోగించి వారి NFTలను ముద్రించారు. ఈ ట్యుటోరియల్లో, \<10 నిమిషాల్లో అదే విధంగా ఎలా చేయాలో మేము మీకు నేర్పిస్తాము.

“NFTని ముద్రించడం” అనేది మీ ERC-721 టోకెన్ యొక్క ఒక ప్రత్యేక ఉదాహరణను బ్లాక్ చైనులో ప్రచురించే చర్య. [ఈ NFT ట్యుటోరియల్ సిరీస్లోని 1వ భాగం](/developers/tutorials/how-to-write-and-deploy-an-nft/) నుండి మా స్మార్ట్ కాంట్రాక్ట్ను ఉపయోగించి, మన Web3 నైపుణ్యాలను ప్రదర్శిస్తూ ఒక NFTని ముద్రిద్దాం. ఈ ట్యుటోరియల్ ముగిసేసరికి, మీ హృదయం (మరియు వాలెట్) కోరుకున్నన్ని NFTలను మీరు ముద్రించగలుగుతారు!

మొదలు పెడదాము!

## దశ 1: Web3ని ఇన్స్టాల్ చేయండి {#install-web3}

మీరు మీ NFT స్మార్ట్ కాంట్రాక్ట్ను సృష్టించడంపై మొదటి ట్యుటోరియల్ని అనుసరించి ఉంటే, మీకు ఇప్పటికే Ethers.jsను ఉపయోగించడంలో అనుభవం ఉంటుంది. Web3 కూడా Ethers లాంటిదే, ఎందుకంటే ఇది ఇతీరియము బ్లాక్ చైనుకు అభ్యర్థనలను సృష్టించడాన్ని సులభతరం చేయడానికి ఉపయోగించే ఒక లైబ్రరీ. ఈ ట్యుటోరియల్లో మనం [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)ని ఉపయోగిస్తాము, ఇది ఆటోమేటిక్ రీట్రైలు మరియు బలమైన WebSocket మద్దతును అందించే ఒక మెరుగైన Web3 లైబ్రరీ.

మీ ప్రాజెక్ట్ హోమ్ డైరెక్టరీలో రన్ చేయండి:

```
npm install @alch/alchemy-web3
```

## దశ 2: `mint-nft.js` ఫైల్ను సృష్టించండి {#create-mintnftjs}

మీ స్క్రిప్ట్స్ డైరెక్టరీ లోపల, `mint-nft.js` ఫైల్ను సృష్టించి, కింది కోడ్ లైన్లను జోడించండి:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## దశ 3: మీ కాంట్రాక్ట్ ABIని తీసుకోండి {#contract-abi}

మన కాంట్రాక్ట్ ABI (అప్లికేషన్ బైనరీ ఇంటర్ఫేస్) అనేది మన స్మార్ట్ కాంట్రాక్ట్తో ఇంటరాక్ట్ అవ్వడానికి ఉపయోగపడే ఇంటర్ఫేస్. మీరు కాంట్రాక్ట్ ABIల గురించి మరింత [ఇక్కడ](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) తెలుసుకోవచ్చు. Hardhat మన కోసం స్వయంచాలకంగా ఒక ABIని ఉత్పత్తి చేసి, దాన్ని `MyNFT.json` ఫైల్లో సేవ్ చేస్తుంది. దీన్ని ఉపయోగించడానికి, మన `mint-nft.js` ఫైల్కు కింది కోడ్ లైన్లను జోడించి, కంటెంట్లను పార్స్ చేయాలి:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

మీరు ABIని చూడాలనుకుంటే, దాన్ని మీ కన్సోల్లో ప్రింట్ చేయవచ్చు:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js`ని రన్ చేసి, మీ ABI కన్సోల్లో ప్రింట్ అవడాన్ని చూడటానికి, మీ టెర్మినల్కి నావిగేట్ చేసి, ఇలా రన్ చేయండి:

```js
node scripts/mint-nft.js
```

## దశ 4: IPFSని ఉపయోగించి మీ NFT కోసం మెటాడేటాను కాన్ఫిగర్ చేయండి {#config-meta}

1వ భాగంలోని మన ట్యుటోరియల్ నుండి మీకు గుర్తున్నట్లయితే, మన `mintNFT` స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్ ఒక tokenURI పారామీటర్ను తీసుకుంటుంది. అది NFT యొక్క మెటాడేటాను వివరించే ఒక JSON డాక్యుమెంట్కి రిసాల్వ్ అవ్వాలి — ఇది నిజానికి NFTకి జీవం పోస్తుంది, దీనికి పేరు, వివరణ, చిత్రం మరియు ఇతర లక్షణాల వంటి కాన్ఫిగర్ చేయగల ప్రాపర్టీలు ఉండేలా అనుమతిస్తుంది.

> _ఇంటర్‌ప్లానెటరీ ఫైల్ సిస్టమ్ (IPFS) అనేది ఒక డిస్ట్రిబ్యూటెడ్ ఫైల్ సిస్టమ్లో డేటాను నిల్వ చేయడానికి మరియు పంచుకోవడానికి ఉపయోగించే ఒక వికేంద్రీకృత ప్రోటోకాల్ మరియు పీర్-టు-పీర్ నెట్వర్క్._

మన NFT ఆస్తిని మరియు మెటాడేటాను నిల్వ చేయడానికి, మన NFT నిజంగా వికేంద్రీకృతంగా ఉందని నిర్ధారించుకోవడానికి, మనం Pinata, ఒక సౌకర్యవంతమైన IPFS API మరియు టూల్కిట్ను ఉపయోగిస్తాము. మీకు Pinata ఖాతా లేకపోతే, [ఇక్కడ](https://app.pinata.cloud) ఉచిత ఖాతా కోసం సైన్ అప్ చేసి, మీ ఇమెయిల్ను ధృవీకరించడానికి దశలను పూర్తి చేయండి.

మీరు ఖాతాను సృష్టించిన తర్వాత:

- “Files” పేజీకి నావిగేట్ చేసి, పేజీ యొక్క ఎగువ-ఎడమ వైపున ఉన్న నీలం రంగు "Upload" బటన్ను క్లిక్ చేయండి.

- Pinataకు ఒక చిత్రాన్ని అప్లోడ్ చేయండి — ఇది మీ NFT కోసం చిత్ర ఆస్తి అవుతుంది. మీకు నచ్చిన పేరును ఆస్తికి పెట్టడానికి సంకోచించకండి

- మీరు అప్లోడ్ చేసిన తర్వాత, "Files" పేజీలోని పట్టికలో మీరు ఫైల్ సమాచారాన్ని చూస్తారు. మీరు ఒక CID కాలమ్ను కూడా చూస్తారు. దాని పక్కన ఉన్న కాపీ బటన్ను క్లిక్ చేయడం ద్వారా మీరు CIDని కాపీ చేయవచ్చు. మీరు మీ అప్లోడ్ను ఇక్కడ చూడవచ్చు: `https://gateway.pinata.cloud/ipfs/<CID>`. ఉదాహరణకు, మేము IPFSలో ఉపయోగించిన చిత్రాన్ని మీరు [ఇక్కడ](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) కనుగొనవచ్చు.

దృశ్యపరంగా నేర్చుకునేవారి కోసం, పై దశలు ఇక్కడ సంగ్రహించబడ్డాయి:

![Pinataకు మీ చిత్రాన్ని ఎలా అప్లోడ్ చేయాలి](./instructionsPinata.gif)

ఇప్పుడు, మనం Pinataకు ఇంకొక డాక్యుమెంట్ను అప్లోడ్ చేయాలి. కానీ అలా చేసే ముందు, మనం దాన్ని సృష్టించాలి!

మీ రూట్ డైరెక్టరీలో, `nft-metadata.json` అనే కొత్త ఫైల్ను తయారు చేసి, కింది json కోడ్ను జోడించండి:

```json
{
  "attributes": [
    {
      "trait_type": "జాతి",
      "value": "మాల్టిపూ"
    },
    {
      "trait_type": "కంటి రంగు",
      "value": "మోచా"
    }
  ],
  "description": "ప్రపంచంలోనే అత్యంత పూజ్యమైన మరియు సున్నితమైన కుక్కపిల్ల.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "రామ్సెస్"
}
```

jsonలోని డేటాను మార్చడానికి సంకోచించకండి. మీరు గుణాల విభాగానికి తీసివేయవచ్చు లేదా జోడించవచ్చు. అన్నింటికన్నా ముఖ్యంగా, చిత్ర ఫీల్డ్ మీ IPFS చిత్రం యొక్క స్థానాన్ని సూచిస్తుందని నిర్ధారించుకోండి — లేకపోతే, మీ NFTలో ఒక (చాలా అందమైన!) ఫోటో ఉంటుంది కుక్క.

మీరు JSON ఫైల్ను సవరించడం పూర్తి చేసిన తర్వాత, దాన్ని సేవ్ చేసి, చిత్రాన్ని అప్లోడ్ చేయడానికి మనం చేసిన అవే దశలను అనుసరిస్తూ Pinataకు అప్లోడ్ చేయండి.

![మీ nft-metadata.jsonను Pinataకు ఎలా అప్లోడ్ చేయాలి](./uploadPinata.gif)

## దశ 5: మీ కాంట్రాక్ట్ యొక్క ఉదాహరణను సృష్టించండి {#instance-contract}

ఇప్పుడు, మన కాంట్రాక్ట్తో ఇంటరాక్ట్ అవ్వడానికి, మనం మన కోడ్లో దాని యొక్క ఒక ఉదాహరణను సృష్టించాలి. అలా చేయడానికి మనకు మన కాంట్రాక్ట్ చిరునామా అవసరం, దాన్ని మనం కాంట్రాక్ట్ను డిప్లాయ్ చేయడానికి ఉపయోగించిన చిరునామాను డిప్లాయ్మెంట్ నుండి లేదా [Blockscout](https://eth-sepolia.blockscout.com/) లో వెతకడం ద్వారా పొందవచ్చు.

![Etherscanలో మీ కాంట్రాక్ట్ చిరునామాను వీక్షించండి](./view-contract-etherscan.png)

పై ఉదాహరణలో, మన కాంట్రాక్ట్ చిరునామా 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

తరువాత మనం ABI మరియు చిరునామాను ఉపయోగించి మన కాంట్రాక్ట్ను సృష్టించడానికి Web3 [కాంట్రాక్ట్ మెథడ్](https://docs.web3js.org/api/web3-eth-contract/class/Contract)ని ఉపయోగిస్తాము. మీ `mint-nft.js` ఫైల్లో, కింది వాటిని జోడించండి:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## దశ 6: `.env` ఫైల్ను అప్డేట్ చేయండి {#update-env}

ఇప్పుడు, ఇతీరియము చైన్కు లావాదేవీలను సృష్టించి, పంపడానికి, ఖాతా నాన్స్ను పొందడానికి మనం మీ పబ్లిక్ ఇతీరియము ఖాతా చిరునామాను ఉపయోగిస్తాము (కింద వివరిస్తాము).

మీ పబ్లిక్ కీని మీ `.env` ఫైల్కు జోడించండి — మీరు ట్యుటోరియల్ యొక్క 1వ భాగాన్ని పూర్తి చేసి ఉంటే, మన `.env` ఫైల్ ఇప్పుడు ఇలా కనిపించాలి:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/మీ-ఎపిఐ-కీ"
PRIVATE_KEY = "మీ-ప్రైవేట్-ఖాతా-చిరునామా"
PUBLIC_KEY = "మీ-పబ్లిక్-ఖాతా-చిరునామా"
```

## దశ 7: మీ లావాదేవీని సృష్టించండి {#create-txn}

మొదట, `mintNFT(tokenData)` అనే ఫంక్షన్ను నిర్వచించి, కింది వాటిని చేయడం ద్వారా మన లావాదేవీని సృష్టిద్దాం:

1. `.env` ఫైల్ నుండి మీ _PRIVATE_KEY_ మరియు _PUBLIC_KEY_లను తీసుకోండి.

2. తరువాత, మనం ఖాతా నాన్స్ను కనుక్కోవాలి. మీ చిరునామా నుండి పంపిన లావాదేవీల సంఖ్యను ట్రాక్ చేయడానికి నాన్స్ స్పెసిఫికేషన్ ఉపయోగించబడుతుంది — ఇది మనకు భద్రతా ప్రయోజనాల కోసం మరియు [రీప్లే దాడులను](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) నివారించడానికి అవసరం. మీ చిరునామా నుండి పంపిన లావాదేవీల సంఖ్యను పొందడానికి, మనం [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)ని ఉపయోగిస్తాము.

3. చివరగా మనం మన లావాదేవీని కింది సమాచారంతో సెటప్ చేస్తాము:

- `'from': PUBLIC_KEY` — మన లావాదేవీ యొక్క మూలం మన పబ్లిక్ చిరునామా

- `'to': contractAddress` — మనం ఇంటరాక్ట్ అవ్వాలనుకుంటున్న మరియు లావాదేవీని పంపాలనుకుంటున్న కాంట్రాక్ట్

- `'nonce': nonce` — మన చిరునామా నుండి పంపిన లావాదేవీల సంఖ్యతో కూడిన ఖాతా నాన్స్

- `'gas': estimatedGas` — లావాదేవీని పూర్తి చేయడానికి అవసరమైన అంచనా గ్యాస్

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — ఈ లావాదేవీలో మనం చేయాలనుకుంటున్న కంప్యూటేషన్ — ఈ సందర్భంలో ఇది ఒక NFTని ముద్రించడం

మీ `mint-nft.js` ఫైల్ ఇప్పుడు ఇలా కనిపించాలి:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //తాజా నాన్స్ను పొందండి

   //లావాదేవీ
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## దశ 8: లావాదేవీపై సంతకం చేయండి {#sign-txn}

ఇప్పుడు మనం మన లావాదేవీని సృష్టించాము కాబట్టి, దాన్ని పంపడానికి మనం దానిపై సంతకం చేయాలి. ఇక్కడే మనం మన ప్రైవేట్ కీని ఉపయోగిస్తాము.

`web3.eth.sendSignedTransaction` మనకు లావాదేవీ హాష్ను ఇస్తుంది, దాన్ని మనం మన లావాదేవీ మైన్ చేయబడిందని మరియు నెట్వర్క్ ద్వారా డ్రాప్ అవ్వలేదని నిర్ధారించుకోవడానికి ఉపయోగించవచ్చు. లావాదేవీ సంతకం విభాగంలో, మన లావాదేవీ విజయవంతంగా జరిగిందో లేదో తెలుసుకోవడానికి మనం కొన్ని ఎర్రర్ చెకింగ్ను జోడించామని మీరు గమనిస్తారు.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //తాజా నాన్స్ను పొందండి

  //లావాదేవీ
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "మీ లావాదేవీ యొక్క హాష్: ",
              hash,
              "\nమీ లావాదేవీ యొక్క స్థితిని వీక్షించడానికి Alchemy యొక్క Mempoolని తనిఖీ చేయండి!"
            )
          } else {
            console.log(
              "మీ లావాదేవీని సమర్పించేటప్పుడు ఏదో తప్పు జరిగింది:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" ప్రామిస్ విఫలమైంది:", err)
    })
}
```

## దశ 9: `mintNFT`ని కాల్ చేసి, నోడ్ `mint-nft.js`ని రన్ చేయండి {#call-mintnft-fn}

మీరు Pinataకు అప్లోడ్ చేసిన `metadata.json` గుర్తుందా? Pinata నుండి దాని హాష్కోడ్ను పొంది, కింది వాటిని `mintNFT` ఫంక్షన్కు పారామీటర్గా పాస్ చేయండి: `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

హాష్కోడ్ను ఎలా పొందాలో ఇక్కడ ఉంది:

![Pinataలో మీ nft మెటాడేటా హాష్కోడ్ను ఎలా పొందాలి](./metadataPinata.gif)_Pinataలో మీ nft మెటాడేటా హాష్కోడ్ను ఎలా పొందాలి_

> `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` ను ఒక ప్రత్యేక విండోలో లోడ్ చేయడం ద్వారా మీరు కాపీ చేసిన హాష్కోడ్ మీ **metadata.json**కు లింక్ అవుతుందో లేదో డబుల్ చెక్ చేసుకోండి. పేజీ కింది స్క్రీన్షాట్ లాగా కనిపించాలి:

![మీ పేజీ json మెటాడేటాను ప్రదర్శించాలి](./metadataJSON.png)_మీ పేజీ json మెటాడేటాను ప్రదర్శించాలి_

మొత్తం మీద, మీ కోడ్ ఇలా కనిపించాలి:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //తాజా నాన్స్ను పొందండి

  //లావాదేవీ
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "మీ లావాదేవీ యొక్క హాష్: ",
              hash,
              "\nమీ లావాదేవీ యొక్క స్థితిని వీక్షించడానికి Alchemy యొక్క Mempoolని తనిఖీ చేయండి!"
            )
          } else {
            console.log(
              "మీ లావాదేవీని సమర్పించేటప్పుడు ఏదో తప్పు జరిగింది:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("ప్రామిస్ విఫలమైంది:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

ఇప్పుడు, మీ NFTని డిప్లాయ్ చేయడానికి `node scripts/mint-nft.js`ని రన్ చేయండి. కొన్ని సెకన్ల తర్వాత, మీ టెర్మినల్లో మీరు ఇలాంటి స్పందనను చూడాలి:

    ```
    మీ లావాదేవీ యొక్క హాష్: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    మీ లావాదేవీ యొక్క స్థితిని వీక్షించడానికి Alchemy యొక్క Mempoolని తనిఖీ చేయండి!
    ```

తరువాత, మీ లావాదేవీ యొక్క స్థితిని చూడటానికి (అది పెండింగ్లో ఉందా, మైన్ చేయబడిందా, లేదా నెట్వర్క్ ద్వారా డ్రాప్ చేయబడిందా అని) మీ [Alchemy mempool](https://dashboard.alchemyapi.io/mempool)ని సందర్శించండి. మీ లావాదేవీ డ్రాప్ అయితే, [Blockscout](https://eth-sepolia.blockscout.com/)ని తనిఖీ చేసి, మీ లావాదేవీ హాష్ కోసం శోధించడం కూడా సహాయపడుతుంది.

![Etherscanలో మీ NFT లావాదేవీ హాష్ను వీక్షించండి](./view-nft-etherscan.png)_Etherscanలో మీ NFT లావాదేవీ హాష్ను వీక్షించండి_

అంతే! మీరు ఇప్పుడు ఇతీరియము బ్లాక్ చైనులో ఒక NFTని డిప్లాయ్ చేసి, ముద్రించారు <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js`ను ఉపయోగించి మీ హృదయం (మరియు వాలెట్) కోరుకున్నన్ని NFTలను మీరు ముద్రించవచ్చు! NFT యొక్క మెటాడేటాను వివరించే కొత్త tokenURIని పాస్ చేయాలని నిర్ధారించుకోండి (లేకపోతే, మీరు వేర్వేరు IDలతో ఒకేలాంటి వాటిని చాలా తయారు చేస్తారు).

బహుశా, మీరు మీ వాలెట్లో మీ NFTని ప్రదర్శించాలనుకుంటారు — కాబట్టి [3వ భాగం: మీ వాలెట్లో మీ NFTని ఎలా చూడాలి](/developers/tutorials/how-to-view-nft-in-metamask/)ని తప్పకుండా చూడండి!
