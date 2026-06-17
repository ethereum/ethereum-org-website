---
title: JavaScript నుండి స్మార్ట్ కాంట్రాక్ట్‌ను కాల్ చేయడం
description: Dai టోకెన్ ఉదాహరణను ఉపయోగించి JavaScript నుండి స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్‌ను ఎలా కాల్ చేయాలి
author: jdourlens
tags: ["లావాదేవీలు", "ఫ్రంటెండ్", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: JS నుండి కాంట్రాక్ట్‌లను కాల్ చేయండి
lang: te
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

ఈ ట్యుటోరియల్‌లో JavaScript నుండి [స్మార్ట్ కాంట్రాక్ట్](/developers/docs/smart-contracts/) ఫంక్షన్‌ను ఎలా కాల్ చేయాలో చూద్దాం. ముందుగా స్మార్ట్ కాంట్రాక్ట్ యొక్క స్థితిని చదవడం (ఉదాహరణకు, ERC-20 హోల్డర్ యొక్క బ్యాలెన్స్), ఆపై టోకెన్ బదిలీ చేయడం ద్వారా బ్లాక్‌చైన్ యొక్క స్థితిని సవరిస్తాము. [బ్లాక్‌చైన్‌తో ఇంటరాక్ట్ అవ్వడానికి JS వాతావరణాన్ని సెటప్ చేయడం](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) గురించి మీకు ఇప్పటికే తెలిసి ఉండాలి.

ఈ ఉదాహరణ కోసం మనం DAI టోకెన్‌తో ప్రయోగాలు చేస్తాము, టెస్టింగ్ ప్రయోజనం కోసం ganache-cli ని ఉపయోగించి బ్లాక్‌చైన్‌ను ఫోర్క్ చేస్తాము మరియు ఇప్పటికే చాలా DAI ఉన్న చిరునామాను అన్‌లాక్ చేస్తాము:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

స్మార్ట్ కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వడానికి మనకు దాని చిరునామా మరియు ABI అవసరం:

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

ఈ ప్రాజెక్ట్ కోసం మేము కేవలం `balanceOf` మరియు `transfer` ఫంక్షన్‌లను మాత్రమే ఉంచడానికి పూర్తి ERC-20 ABI ని కుదించాము, కానీ మీరు [పూర్తి ERC-20 ABI ని ఇక్కడ](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) కనుగొనవచ్చు.

ఆ తర్వాత మనం మన స్మార్ట్ కాంట్రాక్ట్‌ను ఇన్‌స్టాన్షియేట్ చేయాలి:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

మనం రెండు చిరునామాలను కూడా సెటప్ చేస్తాము:

- బదిలీని స్వీకరించే వారు మరియు
- దానిని పంపడానికి మనం ఇప్పటికే అన్‌లాక్ చేసిన వారు:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

తదుపరి భాగంలో రెండు చిరునామాలు కలిగి ఉన్న ప్రస్తుత టోకెన్ల మొత్తాన్ని తిరిగి పొందడానికి మనం `balanceOf` ఫంక్షన్‌ను కాల్ చేస్తాము.

## కాల్: స్మార్ట్ కాంట్రాక్ట్ నుండి విలువను చదవడం {#call-reading-value-from-a-smart-contract}

మొదటి ఉదాహరణ "constant" పద్ధతిని కాల్ చేస్తుంది మరియు ఎలాంటి లావాదేవీని పంపకుండా EVM లో దాని స్మార్ట్ కాంట్రాక్ట్ పద్ధతిని అమలు చేస్తుంది. దీని కోసం మనం ఒక చిరునామా యొక్క ERC-20 బ్యాలెన్స్‌ను చదువుతాము. [ERC-20 టోకెన్ల గురించి మా కథనాన్ని చదవండి](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

మీరు ABI ని అందించిన ఇన్‌స్టాన్షియేట్ చేయబడిన స్మార్ట్ కాంట్రాక్ట్ పద్ధతులను ఈ క్రింది విధంగా యాక్సెస్ చేయవచ్చు: `yourContract.methods.methodname`. `call` ఫంక్షన్‌ను ఉపయోగించడం ద్వారా మీరు ఫంక్షన్‌ను అమలు చేసిన ఫలితాన్ని పొందుతారు.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

DAI ERC-20 కి 18 దశాంశాలు ఉన్నాయని గుర్తుంచుకోండి, అంటే సరైన మొత్తాన్ని పొందడానికి మీరు 18 సున్నాలను తీసివేయాలి. JavaScript పెద్ద సంఖ్యా విలువలను నిర్వహించదు కాబట్టి uint256 స్ట్రింగ్‌లుగా తిరిగి ఇవ్వబడతాయి. మీకు ఖచ్చితంగా తెలియకపోతే [JS లో పెద్ద సంఖ్యలతో ఎలా వ్యవహరించాలో bignumber.js గురించి మా ట్యుటోరియల్‌ని తనిఖీ చేయండి](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## పంపండి: స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్‌కు లావాదేవీని పంపడం {#send-sending-a-transaction-to-a-smart-contract-function}

రెండవ ఉదాహరణ కోసం మనం మన రెండవ చిరునామాకు 10 DAI ని పంపడానికి DAI స్మార్ట్ కాంట్రాక్ట్ యొక్క బదిలీ ఫంక్షన్‌ను కాల్ చేస్తాము. బదిలీ ఫంక్షన్ రెండు పారామితులను అంగీకరిస్తుంది: గ్రహీత చిరునామా మరియు బదిలీ చేయాల్సిన టోకెన్ మొత్తం:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

కాల్ ఫంక్షన్ బ్లాక్‌చైన్‌లోకి మైన్ చేయబడే లావాదేవీ యొక్క హాష్‌ను తిరిగి ఇస్తుంది. ఎథీరియంపై, లావాదేవీ హాష్‌లను అంచనా వేయవచ్చు - ఆ విధంగా లావాదేవీ అమలు కావడానికి ముందే మనం దాని హాష్‌ను పొందవచ్చు ([హాష్‌లు ఎలా లెక్కించబడతాయో ఇక్కడ తెలుసుకోండి](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

ఫంక్షన్ లావాదేవీని బ్లాక్‌చైన్‌కు మాత్రమే సమర్పిస్తుంది కాబట్టి, అది ఎప్పుడు మైన్ చేయబడి బ్లాక్‌చైన్‌లో చేర్చబడుతుందో తెలిసే వరకు మనం ఫలితాన్ని చూడలేము. తదుపరి ట్యుటోరియల్‌లో [లావాదేవీ యొక్క హాష్‌ను తెలుసుకోవడం ద్వారా బ్లాక్‌చైన్‌లో అది అమలు అయ్యే వరకు ఎలా వేచి ఉండాలో](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) మనం నేర్చుకుంటాము.