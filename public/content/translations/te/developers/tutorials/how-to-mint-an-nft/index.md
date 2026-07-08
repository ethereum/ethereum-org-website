---
title: "NFTని ఎలా ముద్రించాలి (NFT ట్యుటోరియల్ సిరీస్‌లో పార్ట్ 2/3)"
description: "మా స్మార్ట్ కాంట్రాక్ట్ మరియు Web3ని ఉపయోగించి ఎథీరియం బ్లాక్‌చైన్‌లో NFTని ఎలా ముద్రించాలో ఈ ట్యుటోరియల్ వివరిస్తుంది."
author: "సుమి ముద్గిల్"
tags: ["ERC-721", "Alchemy", "Solidity", "స్మార్ట్ కాంట్రాక్ట్‌లు"]
skill: beginner
breadcrumb: "NFTని ముద్రించు"
lang: te
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 మిలియన్లు
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 మిలియన్లు
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 మిలియన్లు

వీరంతా Alchemy యొక్క శక్తివంతమైన APIని ఉపయోగించి తమ NFTలను ముద్రించారు. ఈ ట్యుటోరియల్‌లో, \<10 నిమిషాల్లో మీరు కూడా అదే విధంగా ఎలా చేయాలో మేము నేర్పుతాము.

“NFTని ముద్రించడం” అంటే బ్లాక్‌చైన్‌లో మీ ERC-721 టోకెన్ యొక్క ప్రత్యేకమైన ఉదాహరణను ప్రచురించడం. [ఈ NFT ట్యుటోరియల్ సిరీస్‌లోని పార్ట్ 1](/developers/tutorials/how-to-write-and-deploy-an-nft/) నుండి మా స్మార్ట్ కాంట్రాక్ట్‌ను ఉపయోగించి, మన Web3 నైపుణ్యాలను ప్రదర్శిద్దాం మరియు ఒక NFTని ముద్రిద్దాం. ఈ ట్యుటోరియల్ ముగిసే సమయానికి, మీ మనస్సుకు (మరియు వాలెట్‌కు) కావలసినన్ని NFTలను మీరు ముద్రించగలుగుతారు!

ప్రారంభిద్దాం!

## దశ 1: Web3ని ఇన్‌స్టాల్ చేయండి {#install-web3}

మీరు మీ NFT స్మార్ట్ కాంట్రాక్ట్‌ను సృష్టించడంపై మొదటి ట్యుటోరియల్‌ను అనుసరించినట్లయితే, మీకు ఇప్పటికే Ethers.jsని ఉపయోగించిన అనుభవం ఉంటుంది. Web3 అనేది Ethers లాగానే ఉంటుంది, ఎందుకంటే ఇది [ఎథీరియం](/) బ్లాక్‌చైన్‌కు అభ్యర్థనలను సృష్టించడాన్ని సులభతరం చేయడానికి ఉపయోగించే లైబ్రరీ. ఈ ట్యుటోరియల్‌లో మనం [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)ని ఉపయోగిస్తాము, ఇది ఆటోమేటిక్ రీట్రైలు మరియు బలమైన WebSocket మద్దతును అందించే మెరుగైన Web3 లైబ్రరీ.

మీ ప్రాజెక్ట్ హోమ్ డైరెక్టరీలో దీన్ని రన్ చేయండి:

```
npm install @alch/alchemy-web3
```

## దశ 2: `mint-nft.js` ఫైల్‌ను సృష్టించండి {#create-mintnftjs}

మీ స్క్రిప్ట్‌ల డైరెక్టరీ లోపల, `mint-nft.js` ఫైల్‌ను సృష్టించి, కింది కోడ్ పంక్తులను జోడించండి:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## దశ 3: మీ కాంట్రాక్ట్ ABIని పొందండి {#contract-abi}

మా కాంట్రాక్ట్ ABI (అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్) అనేది మా స్మార్ట్ కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వడానికి ఇంటర్‌ఫేస్. మీరు [కాంట్రాక్ట్ ABIల](/glossary/#abi) గురించి మరింత తెలుసుకోవచ్చు. Hardhat మా కోసం స్వయంచాలకంగా ఒక ABIని రూపొందిస్తుంది మరియు దానిని `MyNFT.json` ఫైల్‌లో సేవ్ చేస్తుంది. దీన్ని ఉపయోగించడానికి, మా `mint-nft.js` ఫైల్‌కు కింది కోడ్ పంక్తులను జోడించడం ద్వారా మేము కంటెంట్‌లను అన్వయించాల్సి ఉంటుంది:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

మీరు ABIని చూడాలనుకుంటే, మీరు దానిని మీ కన్సోల్‌కు ప్రింట్ చేయవచ్చు:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js`ని రన్ చేయడానికి మరియు మీ ABI కన్సోల్‌కు ప్రింట్ చేయబడటాన్ని చూడటానికి మీ టెర్మినల్‌కు నావిగేట్ చేసి, దీన్ని రన్ చేయండి:

```js
node scripts/mint-nft.js
```
## దశ 4: IPFSని ఉపయోగించి మీ NFT కోసం మెటాడేటాను కాన్ఫిగర్ చేయండి {#config-meta}

పార్ట్ 1లోని మా ట్యుటోరియల్ నుండి మీకు గుర్తున్నట్లయితే, మా `mintNFT` స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్ tokenURI పారామీటర్‌ను తీసుకుంటుంది, ఇది NFT యొక్క మెటాడేటాను వివరించే JSON డాక్యుమెంట్‌కు రిజాల్వ్ అవ్వాలి— ఇది నిజంగా NFTకి జీవం పోస్తుంది, పేరు, వివరణ, చిత్రం మరియు ఇతర లక్షణాల వంటి కాన్ఫిగర్ చేయగల ప్రాపర్టీలను కలిగి ఉండటానికి అనుమతిస్తుంది.

> _ఇంటర్‌ప్లానెటరీ ఫైల్ సిస్టమ్ (IPFS) అనేది పంపిణీ చేయబడిన ఫైల్ సిస్టమ్‌లో డేటాను నిల్వ చేయడానికి మరియు భాగస్వామ్యం చేయడానికి ఒక వికేంద్రీకృత ప్రోటోకాల్ మరియు పీర్-టు-పీర్ నెట్‌వర్క్._

మా NFT నిజంగా వికేంద్రీకృతమైందని నిర్ధారించుకోవడానికి మా NFT ఆస్తి మరియు మెటాడేటాను నిల్వ చేయడానికి మేము అనుకూలమైన IPFS API మరియు టూల్‌కిట్ అయిన Pinataని ఉపయోగిస్తాము. మీకు Pinata ఖాతా లేకపోతే, [ఇక్కడ](https://app.pinata.cloud) ఉచిత ఖాతా కోసం సైన్ అప్ చేయండి మరియు మీ ఇమెయిల్‌ను ధృవీకరించడానికి దశలను పూర్తి చేయండి.

మీరు ఖాతాను సృష్టించిన తర్వాత:

- “Files” పేజీకి నావిగేట్ చేసి, పేజీ ఎగువ-ఎడమవైపు ఉన్న నీలిరంగు "Upload" బటన్‌ను క్లిక్ చేయండి.

- Pinataకి ఒక చిత్రాన్ని అప్‌లోడ్ చేయండి — ఇది మీ NFT కోసం ఇమేజ్ అసెట్ అవుతుంది. ఆస్తికి మీకు నచ్చిన పేరు పెట్టుకోవచ్చు

- మీరు అప్‌లోడ్ చేసిన తర్వాత, "Files" పేజీలోని పట్టికలో ఫైల్ సమాచారాన్ని చూస్తారు. మీరు CID నిలువు వరుసను కూడా చూస్తారు. దాని పక్కన ఉన్న కాపీ బటన్‌ను క్లిక్ చేయడం ద్వారా మీరు CIDని కాపీ చేయవచ్చు. మీరు మీ అప్‌లోడ్‌ను ఇక్కడ చూడవచ్చు: `https://gateway.pinata.cloud/ipfs/<CID>`. ఉదాహరణకు, మేము IPFSలో ఉపయోగించిన చిత్రాన్ని మీరు [ఇక్కడ](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) కనుగొనవచ్చు.

మరింత దృశ్యమానంగా నేర్చుకునే వారి కోసం, పై దశలు ఇక్కడ సంగ్రహించబడ్డాయి:

![How to upload your image to Pinata](./instructionsPinata.gif)

ఇప్పుడు, మేము Pinataకి మరొక పత్రాన్ని అప్‌లోడ్ చేయాలనుకుంటున్నాము. కానీ అలా చేయడానికి ముందు, మనం దానిని సృష్టించాలి!

మీ రూట్ డైరెక్టరీలో, `nft-metadata.json` అనే కొత్త ఫైల్‌ను సృష్టించి, కింది json కోడ్‌ను జోడించండి:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

jsonలోని డేటాను మార్చడానికి సంకోచించకండి. మీరు లక్షణాల విభాగాన్ని తీసివేయవచ్చు లేదా దానికి జోడించవచ్చు. మరీ ముఖ్యంగా, ఇమేజ్ ఫీల్డ్ మీ IPFS ఇమేజ్ స్థానాన్ని సూచిస్తుందని నిర్ధారించుకోండి — లేకపోతే, మీ NFTలో (చాలా అందమైన!) కుక్క ఫోటో ఉంటుంది.

మీరు JSON ఫైల్‌ను సవరించడం పూర్తి చేసిన తర్వాత, దాన్ని సేవ్ చేయండి మరియు చిత్రాన్ని అప్‌లోడ్ చేయడానికి మేము చేసిన అదే దశలను అనుసరించి దాన్ని Pinataకి అప్‌లోడ్ చేయండి.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## దశ 5: మీ కాంట్రాక్ట్ యొక్క ఉదాహరణను సృష్టించండి {#instance-contract}

ఇప్పుడు, మా కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వడానికి, మేము మా కోడ్‌లో దాని ఉదాహరణను సృష్టించాలి. అలా చేయడానికి మాకు మా కాంట్రాక్ట్ చిరునామా అవసరం, కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడానికి మీరు ఉపయోగించిన చిరునామాను వెతకడం ద్వారా డిప్లాయ్‌మెంట్ లేదా [Blockscout](https://eth-sepolia.blockscout.com/) నుండి పొందవచ్చు.

![View your contract address on Etherscan](./view-contract-etherscan.png)

పై ఉదాహరణలో, మా కాంట్రాక్ట్ చిరునామా 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

తర్వాత మేము ABI మరియు చిరునామాను ఉపయోగించి మా కాంట్రాక్ట్‌ను సృష్టించడానికి Web3 [కాంట్రాక్ట్ పద్ధతిని](https://docs.web3js.org/api/web3-eth-contract/class/Contract) ఉపయోగిస్తాము. మీ `mint-nft.js` ఫైల్‌లో, కింది వాటిని జోడించండి:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## దశ 6: `.env` ఫైల్‌ను అప్‌డేట్ చేయండి {#update-env}

ఇప్పుడు, ఎథీరియం చైన్‌కు లావాదేవీలను సృష్టించడానికి మరియు పంపడానికి, ఖాతా నాన్స్‌ను పొందడానికి మేము మీ పబ్లిక్ ఎథీరియం ఖాతా చిరునామాను ఉపయోగిస్తాము (క్రింద వివరిస్తాము).

మీ పబ్లిక్ కీని మీ `.env` ఫైల్‌కు జోడించండి — మీరు ట్యుటోరియల్‌లోని పార్ట్ 1ని పూర్తి చేసినట్లయితే, మా `.env` ఫైల్ ఇప్పుడు ఇలా ఉండాలి:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## దశ 7: మీ లావాదేవీని సృష్టించండి {#create-txn}

ముందుగా, `mintNFT(tokenData)` అనే ఫంక్షన్‌ను నిర్వచిద్దాం మరియు కింది వాటిని చేయడం ద్వారా మా లావాదేవీని సృష్టిద్దాం:

1. `.env` ఫైల్ నుండి మీ _PRIVATE_KEY_ మరియు _PUBLIC_KEY_ని పొందండి.

1. తర్వాత, మేము ఖాతా నాన్స్‌ను కనుగొనాలి. మీ చిరునామా నుండి పంపబడిన లావాదేవీల సంఖ్యను ట్రాక్ చేయడానికి నాన్స్ స్పెసిఫికేషన్ ఉపయోగించబడుతుంది — ఇది భద్రతా ప్రయోజనాల కోసం మరియు రీప్లే దాడులను నిరోధించడానికి మాకు అవసరం. మీ చిరునామా నుండి పంపబడిన లావాదేవీల సంఖ్యను పొందడానికి, మేము [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count)ని ఉపయోగిస్తాము.

1. చివరగా మేము కింది సమాచారంతో మా లావాదేవీని సెటప్ చేస్తాము:

- `'from': PUBLIC_KEY` — మా లావాదేవీ యొక్క మూలం మా పబ్లిక్ చిరునామా

- `'to': contractAddress` — మేము ఇంటరాక్ట్ అవ్వాలనుకుంటున్న మరియు లావాదేవీని పంపాలనుకుంటున్న కాంట్రాక్ట్

- `'nonce': nonce` — మా చిరునామా నుండి పంపబడిన లావాదేవీల సంఖ్యతో ఖాతా నాన్స్

- `'gas': estimatedGas` — లావాదేవీని పూర్తి చేయడానికి అవసరమైన అంచనా వేయబడిన గ్యాస్

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — ఈ లావాదేవీలో మేము చేయాలనుకుంటున్న గణన — ఈ సందర్భంలో ఇది NFTని ముద్రించడం

మీ `mint-nft.js` ఫైల్ ఇప్పుడు ఇలా ఉండాలి:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //తాజా నాన్స్ పొందండి

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
## దశ 8: లావాదేవీపై సంతకం చేయడం {#sign-txn}

ఇప్పుడు మనం మన లావాదేవీని సృష్టించాము కాబట్టి, దాన్ని పంపడానికి మనం దానిపై సంతకం చేయాలి. ఇక్కడే మనం మన ప్రైవేట్ కీని ఉపయోగిస్తాము.

`web3.eth.sendSignedTransaction` మాకు లావాదేవీ హాష్‌ను ఇస్తుంది, మా లావాదేవీ మైన్ చేయబడిందని మరియు నెట్‌వర్క్ ద్వారా డ్రాప్ చేయబడలేదని నిర్ధారించుకోవడానికి మేము దీన్ని ఉపయోగించవచ్చు. లావాదేవీపై సంతకం చేసే విభాగంలో, మా లావాదేవీ విజయవంతంగా జరిగిందో లేదో తెలుసుకోవడానికి మేము కొన్ని ఎర్రర్ చెకింగ్‌లను జోడించామని మీరు గమనించవచ్చు.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //తాజా నాన్స్ పొందండి

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
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## దశ 9: `mintNFT`ని కాల్ చేయండి మరియు నోడ్ `mint-nft.js`ని రన్ చేయండి {#call-mintnft-fn}

మీరు Pinataకి అప్‌లోడ్ చేసిన `metadata.json` గుర్తుంది కదా? Pinata నుండి దాని హాష్‌కోడ్‌ను పొందండి మరియు కింది వాటిని `mintNFT` ఫంక్షన్‌కు పారామీటర్‌గా పాస్ చేయండి `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

హాష్‌కోడ్‌ను ఎలా పొందాలో ఇక్కడ ఉంది:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Pinataలో మీ nft మెటాడేటా హాష్‌కోడ్‌ను ఎలా పొందాలి_

> ప్రత్యేక విండోలో `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`ని లోడ్ చేయడం ద్వారా మీరు కాపీ చేసిన హాష్‌కోడ్ మీ **metadata.json**కి లింక్ చేయబడిందో లేదో ఒకటికి రెండుసార్లు తనిఖీ చేయండి. పేజీ కింది స్క్రీన్‌షాట్ లాగా ఉండాలి:

![Your page should display the json metadata](./metadataJSON.png)_మీ పేజీ json మెటాడేటాను ప్రదర్శించాలి_

మొత్తం మీద, మీ కోడ్ ఇలా ఉండాలి:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //తాజా నాన్స్ పొందండి

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
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

ఇప్పుడు, మీ NFTని డిప్లాయ్ చేయడానికి `node scripts/mint-nft.js`ని రన్ చేయండి. కొన్ని సెకన్ల తర్వాత, మీరు మీ టెర్మినల్‌లో ఇలాంటి ప్రతిస్పందనను చూడాలి:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

తర్వాత, మీ లావాదేవీ స్థితిని (అది పెండింగ్‌లో ఉందా, మైన్ చేయబడిందా లేదా నెట్‌వర్క్ ద్వారా డ్రాప్ చేయబడిందా) చూడటానికి మీ [Alchemy మెంపూల్](https://dashboard.alchemy.com/mempool)ని సందర్శించండి. మీ లావాదేవీ డ్రాప్ చేయబడితే, [Blockscout](https://eth-sepolia.blockscout.com/)ని తనిఖీ చేయడం మరియు మీ లావాదేవీ హాష్ కోసం వెతకడం కూడా సహాయకరంగా ఉంటుంది.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Etherscanలో మీ NFT లావాదేవీ హాష్‌ను వీక్షించండి_

అంతే! మీరు ఇప్పుడు ఎథీరియం బ్లాక్‌చైన్‌లో NFTతో డిప్లాయ్ చేసారు మరియు ముద్రించారు <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js`ని ఉపయోగించి మీరు మీ మనస్సుకు (మరియు వాలెట్‌కు) కావలసినన్ని NFTలను ముద్రించవచ్చు! NFT యొక్క మెటాడేటాను వివరించే కొత్త tokenURIని పాస్ చేశారని నిర్ధారించుకోండి (లేకపోతే, మీరు వేర్వేరు IDలతో ఒకేలాంటి వాటిని చాలా తయారు చేస్తారు).

బహుశా, మీరు మీ వాలెట్‌లో మీ NFTని ప్రదర్శించాలనుకుంటున్నారు — కాబట్టి [పార్ట్ 3: మీ వాలెట్‌లో మీ NFTని ఎలా చూడాలి](/developers/tutorials/how-to-view-nft-in-metamask/)ని తప్పకుండా తనిఖీ చేయండి!
