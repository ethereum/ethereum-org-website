---
title: "ఎథీరియం డెవలప్‌మెంట్‌ను ప్రారంభించడం"
description: "ఎథీరియం డెవలప్‌మెంట్‌ను ప్రారంభించడానికి ఇది ఒక బిగినర్స్ గైడ్. API ఎండ్‌పాయింట్‌ను సెటప్ చేయడం నుండి, కమాండ్ లైన్ అభ్యర్థన చేయడం, మీ మొదటి Web3 స్క్రిప్ట్‌ను రాయడం వరకు మేము మీకు మార్గనిర్దేశం చేస్తాము! బ్లాక్‌చైన్ డెవలప్‌మెంట్ అనుభవం అవసరం లేదు!"
author: "ఎలాన్ హాల్పెర్న్"
tags: ["JavaScript", "ethers.js", "నోడ్స్", "క్వెరీయింగ్", "Alchemy"]
skill: beginner
breadcrumb: "ప్రారంభించడం"
lang: te
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

ఎథీరియం డెవలప్‌మెంట్‌ను ప్రారంభించడానికి ఇది ఒక బిగినర్స్ గైడ్. ఈ ట్యుటోరియల్ కోసం మేము [Alchemy](https://alchemyapi.io/)ని ఉపయోగిస్తాము, ఇది Maker, 0x, MyEtherWallet, Dharma మరియు Kyber వంటి టాప్ బ్లాక్‌చైన్ యాప్‌లలో 70% నుండి మిలియన్ల కొద్దీ వినియోగదారులకు శక్తినిచ్చే ప్రముఖ బ్లాక్‌చైన్ డెవలపర్ ప్లాట్‌ఫారమ్. Alchemy మనకు ఎథీరియం చైన్‌లోని API ఎండ్‌పాయింట్‌కు యాక్సెస్‌ను ఇస్తుంది, తద్వారా మనం లావాదేవీలను చదవవచ్చు మరియు వ్రాయవచ్చు.

Alchemyలో సైన్ అప్ చేయడం నుండి మీ మొదటి Web3 స్క్రిప్ట్‌ను రాయడం వరకు మేము మీకు మార్గనిర్దేశం చేస్తాము! బ్లాక్‌చైన్ డెవలప్‌మెంట్ అనుభవం అవసరం లేదు!

## 1. ఉచిత Alchemy ఖాతా కోసం సైన్ అప్ చేయండి {#sign-up-for-a-free-alchemy-account}

Alchemyలో ఖాతాను సృష్టించడం సులభం, [ఇక్కడ ఉచితంగా సైన్ అప్ చేయండి](https://auth.alchemy.com/).

## 2. Alchemy యాప్‌ను సృష్టించండి {#create-an-alchemy-app}

ఎథీరియం చైన్‌తో కమ్యూనికేట్ చేయడానికి మరియు Alchemy ఉత్పత్తులను ఉపయోగించడానికి, మీ అభ్యర్థనలను ప్రామాణీకరించడానికి మీకు ఒక API కీ అవసరం.

మీరు [డ్యాష్‌బోర్డ్ నుండి API కీలను సృష్టించవచ్చు](https://dashboard.alchemy.com/). కొత్త కీని రూపొందించడానికి, క్రింద చూపిన విధంగా “Create App”కి నావిగేట్ చేయండి:

_వారి డ్యాష్‌బోర్డ్‌ను చూపించడానికి మమ్మల్ని అనుమతించినందుకు_ [_ShapeShift_](https://shapeshift.com/) _కి ప్రత్యేక కృతజ్ఞతలు!_

![Alchemy dashboard](./alchemy-dashboard.png)

మీ కొత్త కీని పొందడానికి “Create App” క్రింద వివరాలను పూరించండి. మీరు ఇంతకు ముందు చేసిన యాప్‌లను మరియు మీ బృందం చేసిన వాటిని కూడా ఇక్కడ చూడవచ్చు. ఏదైనా యాప్ కోసం “View Key”పై క్లిక్ చేయడం ద్వారా ఇప్పటికే ఉన్న కీలను పొందండి.

![Create app with Alchemy screenshot](./create-app.png)

మీరు “Apps”పై హోవర్ చేసి, ఒకదాన్ని ఎంచుకోవడం ద్వారా ఇప్పటికే ఉన్న API కీలను కూడా పొందవచ్చు. నిర్దిష్ట డొమైన్‌లను వైట్‌లిస్ట్ చేయడానికి, అనేక డెవలపర్ సాధనాలను చూడటానికి మరియు విశ్లేషణలను వీక్షించడానికి మీరు ఇక్కడ “View Key”తో పాటు “Edit App”ని కూడా చేయవచ్చు.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. కమాండ్ లైన్ నుండి అభ్యర్థన చేయండి {#make-a-request-from-the-command-line}

జేసన్-ఆర్‌పీసీ మరియు curl ఉపయోగించి Alchemy ద్వారా ఎథీరియం బ్లాక్‌చైన్‌తో ఇంటరాక్ట్ అవ్వండి.

మాన్యువల్ అభ్యర్థనల కోసం, `POST` అభ్యర్థనల ద్వారా `JSON-RPC`తో ఇంటరాక్ట్ అవ్వాలని మేము సిఫార్సు చేస్తున్నాము. కేవలం `Content-Type: application/json` హెడర్‌ను మరియు మీ క్వెరీని `POST` బాడీగా ఈ క్రింది ఫీల్డ్‌లతో పాస్ చేయండి:

- `jsonrpc`: జేసన్-ఆర్‌పీసీ వెర్షన్—ప్రస్తుతం, `2.0` మాత్రమే మద్దతు ఇస్తుంది.
- `method`: ETH API పద్ధతి. [API రిఫరెన్స్ చూడండి.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: పద్ధతికి పాస్ చేయడానికి పారామితుల జాబితా.
- `id`: మీ అభ్యర్థన యొక్క ID. ప్రతిస్పందన ద్వారా ఇది తిరిగి ఇవ్వబడుతుంది, తద్వారా ప్రతిస్పందన ఏ అభ్యర్థనకు చెందినదో మీరు ట్రాక్ చేయవచ్చు.

ప్రస్తుత గ్యాస్ ధరను తిరిగి పొందడానికి మీరు కమాండ్ లైన్ నుండి రన్ చేయగల ఉదాహరణ ఇక్కడ ఉంది:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**గమనిక:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo)ని మీ స్వంత API కీ `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`తో భర్తీ చేయండి._

**ఫలితాలు:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. మీ Web3 క్లయింట్‌ను సెటప్ చేయండి {#set-up-your-web3-client}

**మీకు ఇప్పటికే క్లయింట్ ఉంటే,** మీ ప్రస్తుత నోడ్ ప్రొవైడర్ URLని మీ API కీతో కూడిన Alchemy URLకి మార్చండి: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_గమనిక:_** దిగువ స్క్రిప్ట్‌లు **నోడ్ కాంటెక్స్ట్‌లో** రన్ చేయబడాలి లేదా **ఫైల్‌లో సేవ్ చేయబడాలి**, కమాండ్ లైన్ నుండి రన్ చేయకూడదు. మీరు ఇప్పటికే Node లేదా npm ఇన్‌స్టాల్ చేయకపోతే, ఈ శీఘ్ర [macs కోసం సెటప్ గైడ్](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs)ని చూడండి.

మీరు Alchemyతో అనుసంధానించగల అనేక [Web3 లైబ్రరీలు](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) ఉన్నాయి, అయితే, Alchemyతో సజావుగా పనిచేయడానికి నిర్మించబడిన మరియు కాన్ఫిగర్ చేయబడిన Web3.jsకి డ్రాప్-ఇన్ ప్రత్యామ్నాయమైన [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)ని ఉపయోగించమని మేము సిఫార్సు చేస్తున్నాము. ఇది ఆటోమేటిక్ రీట్రైలు మరియు బలమైన WebSocket మద్దతు వంటి బహుళ ప్రయోజనాలను అందిస్తుంది.

AlchemyWeb3.jsని ఇన్‌స్టాల్ చేయడానికి, **మీ ప్రాజెక్ట్ డైరెక్టరీకి నావిగేట్ చేయండి** మరియు రన్ చేయండి:

**Yarnతో:**

```
yarn add @alch/alchemy-web3
```

**NPMతో:**

```
npm install @alch/alchemy-web3
```

Alchemy యొక్క నోడ్ ఇన్‌ఫ్రాస్ట్రక్చర్‌తో ఇంటరాక్ట్ అవ్వడానికి, NodeJSలో రన్ చేయండి లేదా దీన్ని JavaScript ఫైల్‌కి జోడించండి:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. మీ మొదటి Web3 స్క్రిప్ట్‌ను రాయండి! {#write-your-first-web3-script}

ఇప్పుడు కొంచెం Web3 ప్రోగ్రామింగ్‌తో ప్రాక్టికల్ అనుభవం పొందడానికి, ఎథీరియం మెయిన్‌నెట్ నుండి తాజా బ్లాక్ నంబర్‌ను ప్రింట్ చేసే ఒక సాధారణ స్క్రిప్ట్‌ను రాద్దాం.

**1. మీరు ఇప్పటికే చేయకపోతే, మీ టెర్మినల్‌లో కొత్త ప్రాజెక్ట్ డైరెక్టరీని సృష్టించి, దానిలోకి cd చేయండి:**

```
mkdir web3-example
cd web3-example
```

**2. మీరు ఇప్పటికే ఇన్‌స్టాల్ చేయకపోతే, మీ ప్రాజెక్ట్‌లోకి Alchemy Web3 (లేదా ఏదైనా Web3) డిపెండెన్సీని ఇన్‌స్టాల్ చేయండి:**

```
npm install @alch/alchemy-web3
```

**3. `index.js` పేరుతో ఒక ఫైల్‌ను సృష్టించి, కింది కంటెంట్‌లను జోడించండి:**

> మీరు చివరకు `demo`ని మీ Alchemy HTTP API కీతో భర్తీ చేయాలి.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

async విషయాల గురించి తెలియదా? ఈ [Medium పోస్ట్‌](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c)ను చూడండి.

**4. node ఉపయోగించి మీ టెర్మినల్‌లో దీన్ని రన్ చేయండి**

```
node index.js
```

**5. మీరు ఇప్పుడు మీ కన్సోల్‌లో తాజా బ్లాక్ నంబర్ అవుట్‌పుట్‌ను చూడాలి!**

```
The latest block number is 11043912
```

**వావ్! అభినందనలు! మీరు Alchemy ఉపయోగించి మీ మొదటి Web3 స్క్రిప్ట్‌ను రాశారు 🎉**

తర్వాత ఏమి చేయాలో ఖచ్చితంగా తెలియదా? మీ మొదటి స్మార్ట్ కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడానికి ప్రయత్నించండి మరియు మా [హలో వరల్డ్ స్మార్ట్ కాంట్రాక్ట్ గైడ్](https://www.alchemy.com/docs/hello-world-smart-contract)లో కొంత Solidity ప్రోగ్రామింగ్‌తో ప్రాక్టికల్ అనుభవం పొందండి లేదా [డ్యాష్‌బోర్డ్ డెమో యాప్](https://docs.alchemyapi.io/tutorials/demo-app)తో మీ డ్యాష్‌బోర్డ్ పరిజ్ఞానాన్ని పరీక్షించుకోండి!

_[ఉచితంగా Alchemyలో సైన్ అప్ చేయండి](https://auth.alchemy.com/), మా [డాక్యుమెంటేషన్‌](https://www.alchemy.com/docs/)ను చూడండి మరియు తాజా వార్తల కోసం, [Twitter](https://twitter.com/AlchemyPlatform)లో మమ్మల్ని అనుసరించండి_.