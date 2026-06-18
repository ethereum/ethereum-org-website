---
title: ప్రారంభకుల కోసం హలో వరల్డ్ స్మార్ట్ కాంట్రాక్ట్ - ఫుల్‌స్టాక్
description: ఎథీరియంపై ఒక సాధారణ స్మార్ట్ కాంట్రాక్ట్‌ను రాయడం మరియు డిప్లాయ్ చేయడంపై పరిచయ ట్యుటోరియల్.
author: "nstrike2"
breadcrumb: హలో వరల్డ్ ఫుల్‌స్టాక్
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "స్మార్ట్ కాంట్రాక్ట్‌లు",
    "డిప్లాయ్ చేయడం",
    "బ్లాక్ ఎక్స్‌ప్లోరర్",
    "ఫ్రంటెండ్",
    "లావాదేవీలు",
    "ఫ్రేమ్‌వర్క్",
  ]
skill: beginner
lang: te
published: 2021-10-25
---

మీరు బ్లాక్‌చైన్ డెవలప్‌మెంట్‌కు కొత్త అయితే మరియు ఎక్కడ ప్రారంభించాలో లేదా స్మార్ట్ కాంట్రాక్ట్‌లను ఎలా డిప్లాయ్ చేయాలో మరియు వాటితో ఎలా ఇంటరాక్ట్ అవ్వాలో తెలియకపోతే, ఈ గైడ్ మీ కోసమే. [మెటామాస్క్](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) మరియు [Alchemy](https://alchemy.com/eth) ఉపయోగించి Goerli టెస్ట్ నెట్‌వర్క్‌లో ఒక సాధారణ స్మార్ట్ కాంట్రాక్ట్‌ను సృష్టించడం మరియు డిప్లాయ్ చేయడం ద్వారా మేము మీకు మార్గనిర్దేశం చేస్తాము.

ఈ ట్యుటోరియల్‌ను పూర్తి చేయడానికి మీకు Alchemy ఖాతా అవసరం. [ఉచిత ఖాతా కోసం సైన్ అప్ చేయండి](https://www.alchemy.com/).

మీకు ఏ సమయంలోనైనా ప్రశ్నలు ఉంటే, [Alchemy డిస్కార్డ్](https://discord.gg/gWuC7zB)లో సంప్రదించడానికి సంకోచించకండి!

## పార్ట్ 1 - Hardhat ఉపయోగించి మీ స్మార్ట్ కాంట్రాక్ట్‌ను క్రియేట్ చేసి డిప్లాయ్ చేయండి {#part-1}

### ఎథీరియం నెట్‌వర్క్‌కి కనెక్ట్ అవ్వండి {#connect-to-the-ethereum-network}

ఎథీరియం చైన్‌కు అభ్యర్థనలు చేయడానికి అనేక మార్గాలు ఉన్నాయి. సులభంగా ఉండటం కోసం, మనం Alchemyలో ఉచిత ఖాతాను ఉపయోగిస్తాము, ఇది ఒక బ్లాక్‌చైన్ డెవలపర్ ప్లాట్‌ఫారమ్ మరియు API, ఇది మనమే స్వయంగా నోడ్‌ను రన్ చేయకుండా ఎథీరియం చైన్‌తో కమ్యూనికేట్ చేయడానికి అనుమతిస్తుంది. Alchemyలో పర్యవేక్షణ మరియు విశ్లేషణల కోసం డెవలపర్ టూల్స్ కూడా ఉన్నాయి; మన స్మార్ట్ కాంట్రాక్ట్ డిప్లాయ్‌మెంట్‌లో అంతర్గతంగా (under the hood) ఏమి జరుగుతుందో అర్థం చేసుకోవడానికి ఈ ట్యుటోరియల్‌లో మనం వీటిని సద్వినియోగం చేసుకుంటాము.

### మీ యాప్ మరియు API కీని క్రియేట్ చేయండి {#create-your-app-and-api-key}

మీరు Alchemy ఖాతాను క్రియేట్ చేసిన తర్వాత, యాప్‌ను క్రియేట్ చేయడం ద్వారా మీరు API కీని జనరేట్ చేయవచ్చు. ఇది Goerli టెస్ట్‌నెట్‌కు అభ్యర్థనలు చేయడానికి మిమ్మల్ని అనుమతిస్తుంది. మీకు టెస్ట్‌నెట్‌ల గురించి తెలియకపోతే, మీరు [నెట్‌వర్క్‌ను ఎంచుకోవడంపై Alchemy గైడ్‌ను చదవవచ్చు](https://www.alchemy.com/docs/choosing-a-web3-network).

Alchemy డ్యాష్‌బోర్డ్‌లో, నావిగేషన్ బార్‌లోని **Apps** డ్రాప్‌డౌన్‌ను కనుగొని, **Create App**పై క్లిక్ చేయండి.

![Hello world create app](./hello-world-create-app.png)

మీ యాప్‌కు '_Hello World_' అని పేరు పెట్టి, చిన్న వివరణ రాయండి. మీ పర్యావరణంగా (environment) **Staging**ని మరియు మీ నెట్‌వర్క్‌గా **Goerli**ని ఎంచుకోండి.

![create app view hello world](./create-app-view-hello-world.png)

_గమనిక: ఖచ్చితంగా **Goerli**ని ఎంచుకోండి, లేకపోతే ఈ ట్యుటోరియల్ పనిచేయదు._

**Create app**పై క్లిక్ చేయండి. మీ యాప్ దిగువ పట్టికలో కనిపిస్తుంది.

### ఎథీరియం ఖాతాను క్రియేట్ చేయండి {#create-an-ethereum-account}

లావాదేవీలను పంపడానికి మరియు స్వీకరించడానికి మీకు ఎథీరియం ఖాతా అవసరం. మనం మెటామాస్క్‌ను ఉపయోగిస్తాము, ఇది బ్రౌజర్‌లోని వర్చువల్ వాలెట్, ఇది వినియోగదారులు తమ ఎథీరియం ఖాతా చిరునామాను నిర్వహించడానికి అనుమతిస్తుంది.

మీరు మెటామాస్క్ ఖాతాను ఉచితంగా [ఇక్కడ](https://metamask.io/download) డౌన్‌లోడ్ చేసి క్రియేట్ చేయవచ్చు. మీరు ఖాతాను క్రియేట్ చేస్తున్నప్పుడు లేదా మీకు ఇప్పటికే ఖాతా ఉంటే, ఎగువ కుడివైపున ఉన్న “Goerli Test Network”కి మారేలా చూసుకోండి (తద్వారా మనం నిజమైన డబ్బుతో వ్యవహరించము).

### దశ 4: ఫాసెట్ నుండి ఈథర్‌ను జోడించండి {#step-4-add-ether-from-a-faucet}

మీ స్మార్ట్ కాంట్రాక్ట్‌ను టెస్ట్ నెట్‌వర్క్‌కు డిప్లాయ్ చేయడానికి, మీకు కొంత నకిలీ ETH అవసరం. Goerli నెట్‌వర్క్‌లో ETH పొందడానికి, Goerli ఫాసెట్‌కి వెళ్లి మీ Goerli ఖాతా చిరునామాను నమోదు చేయండి. ఇటీవల Goerli ఫాసెట్‌లు కొంచెం నమ్మదగనివిగా ఉండవచ్చని గమనించండి - ప్రయత్నించడానికి ఎంపికల జాబితా కోసం [టెస్ట్ నెట్‌వర్క్‌ల పేజీని](/developers/docs/networks/#goerli) చూడండి:

_గమనిక: నెట్‌వర్క్ రద్దీ కారణంగా, దీనికి కొంత సమయం పట్టవచ్చు._
``

### దశ 5: మీ బ్యాలెన్స్‌ని తనిఖీ చేయండి {#step-5-check-your-balance}

మీ వాలెట్‌లో ETH ఉందో లేదో ఒకటికి రెండుసార్లు తనిఖీ చేయడానికి, [Alchemy కంపోజర్ టూల్](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) ఉపయోగించి [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) అభ్యర్థన చేద్దాం. ఇది మన వాలెట్‌లోని ETH మొత్తాన్ని తిరిగి ఇస్తుంది. మరింత తెలుసుకోవడానికి [కంపోజర్ టూల్‌ను ఎలా ఉపయోగించాలో తెలిపే Alchemy చిన్న ట్యుటోరియల్‌ని](https://youtu.be/r6sjRxBZJuU) చూడండి.

మీ మెటామాస్క్ ఖాతా చిరునామాను నమోదు చేసి, **Send Request**పై క్లిక్ చేయండి. దిగువ కోడ్ స్నిప్పెట్ లాగా కనిపించే ప్రతిస్పందనను మీరు చూస్తారు.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _గమనిక: ఈ ఫలితం weiలో ఉంది, ETHలో కాదు. ఈథర్ యొక్క అతిచిన్న విలువగా Wei ఉపయోగించబడుతుంది._

హమ్మయ్య! మన నకిలీ డబ్బు అంతా అక్కడే ఉంది.

### దశ 6: మన ప్రాజెక్ట్‌ను ప్రారంభించండి {#step-6-initialize-our-project}

ముందుగా, మనం మన ప్రాజెక్ట్ కోసం ఒక ఫోల్డర్‌ను క్రియేట్ చేయాలి. మీ కమాండ్ లైన్‌కి వెళ్లి కింది వాటిని నమోదు చేయండి.

```
mkdir hello-world
cd hello-world
```

ఇప్పుడు మనం మన ప్రాజెక్ట్ ఫోల్డర్ లోపల ఉన్నాము కాబట్టి, ప్రాజెక్ట్‌ను ప్రారంభించడానికి మనం `npm init`ని ఉపయోగిస్తాము.

> మీరు ఇంకా npmని ఇన్‌స్టాల్ చేయకపోతే, [Node.js మరియు npmని ఇన్‌స్టాల్ చేయడానికి ఈ సూచనలను](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) అనుసరించండి.

ఈ ట్యుటోరియల్ ప్రయోజనం కోసం, మీరు ప్రారంభ ప్రశ్నలకు ఎలా సమాధానం ఇస్తారనేది ముఖ్యం కాదు. సూచన కోసం మేము దీన్ని ఎలా చేశామో ఇక్కడ ఉంది:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

package.jsonని ఆమోదించండి మరియు మనం ముందుకు వెళ్లడానికి సిద్ధంగా ఉన్నాము!

### దశ 7: Hardhatని డౌన్‌లోడ్ చేయండి {#step-7-download-hardhat}

Hardhat అనేది మీ ఎథీరియం సాఫ్ట్‌వేర్‌ను కంపైల్ చేయడానికి, డిప్లాయ్ చేయడానికి, పరీక్షించడానికి మరియు డీబగ్ చేయడానికి ఒక డెవలప్‌మెంట్ పర్యావరణం. లైవ్ చైన్‌కు డిప్లాయ్ చేయడానికి ముందు స్థానికంగా స్మార్ట్ కాంట్రాక్ట్‌లు మరియు వికేంద్రీకృత అప్లికేషన్‌లను (dapps) నిర్మించేటప్పుడు ఇది డెవలపర్‌లకు సహాయపడుతుంది.

మన `hello-world` ప్రాజెక్ట్ లోపల దీన్ని రన్ చేయండి:

```
npm install --save-dev hardhat
```

[ఇన్‌స్టాలేషన్ సూచనల](https://hardhat.org/getting-started/#overview) గురించి మరిన్ని వివరాల కోసం ఈ పేజీని చూడండి.

### దశ 8: Hardhat ప్రాజెక్ట్‌ను క్రియేట్ చేయండి {#step-8-create-hardhat-project}

మన `hello-world` ప్రాజెక్ట్ ఫోల్డర్ లోపల, దీన్ని రన్ చేయండి:

```
npx hardhat
```

ఆ తర్వాత మీరు స్వాగత సందేశాన్ని మరియు మీరు ఏమి చేయాలనుకుంటున్నారో ఎంచుకోవడానికి ఒక ఎంపికను చూడాలి. “create an empty hardhat.config.js”ని ఎంచుకోండి:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

ఇది ప్రాజెక్ట్‌లో `hardhat.config.js` ఫైల్‌ను జనరేట్ చేస్తుంది. మన ప్రాజెక్ట్ కోసం సెటప్‌ను పేర్కొనడానికి ట్యుటోరియల్‌లో తర్వాత దీన్ని ఉపయోగిస్తాము.

### దశ 9: ప్రాజెక్ట్ ఫోల్డర్‌లను జోడించండి {#step-9-add-project-folders}

ప్రాజెక్ట్‌ను క్రమబద్ధంగా ఉంచడానికి, రెండు కొత్త ఫోల్డర్‌లను క్రియేట్ చేద్దాం. కమాండ్ లైన్‌లో, మీ `hello-world` ప్రాజెక్ట్ యొక్క రూట్ డైరెక్టరీకి వెళ్లి ఇలా టైప్ చేయండి:

```
mkdir contracts
mkdir scripts
```

- `contracts/` అనేది మన హలో వరల్డ్ స్మార్ట్ కాంట్రాక్ట్ కోడ్ ఫైల్‌ను ఉంచే ప్రదేశం
- `scripts/` అనేది మన కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడానికి మరియు ఇంటరాక్ట్ అవ్వడానికి స్క్రిప్ట్‌లను ఉంచే ప్రదేశం

### దశ 10: మన కాంట్రాక్ట్‌ను రాయండి {#step-10-write-our-contract}

మనం కోడ్ ఎప్పుడు రాస్తాము అని మీరు ఆలోచిస్తూ ఉండవచ్చు? దానికి ఇదే సమయం!

మీకు ఇష్టమైన ఎడిటర్‌లో hello-world ప్రాజెక్ట్‌ను తెరవండి. స్మార్ట్ కాంట్రాక్ట్‌లు సాధారణంగా Solidityలో రాయబడతాయి, మన స్మార్ట్ కాంట్రాక్ట్‌ను రాయడానికి మనం దీన్నే ఉపయోగిస్తాము.‌

1. `contracts` ఫోల్డర్‌కి వెళ్లి `HelloWorld.sol` అనే కొత్త ఫైల్‌ను క్రియేట్ చేయండి
2. ఈ ట్యుటోరియల్ కోసం మనం ఉపయోగించే నమూనా హలో వరల్డ్ స్మార్ట్ కాంట్రాక్ట్ దిగువన ఉంది. దిగువ కంటెంట్‌ను `HelloWorld.sol` ఫైల్‌లోకి కాపీ చేయండి.

_గమనిక: ఈ కాంట్రాక్ట్ ఏమి చేస్తుందో అర్థం చేసుకోవడానికి కామెంట్‌లను తప్పకుండా చదవండి._

```
// సెమాంటిక్ వెర్షనింగ్‌ని ఉపయోగించి, Solidity వెర్షన్‌ను నిర్దేశిస్తుంది.
// మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// `HelloWorld` పేరుతో ఒక కాంట్రాక్ట్‌ను నిర్వచిస్తుంది.
// కాంట్రాక్ట్ అనేది ఫంక్షన్‌లు మరియు డేటా (దాని స్థితి) యొక్క సమాహారం. డిప్లాయ్ చేసిన తర్వాత, కాంట్రాక్ట్ ఎథీరియం బ్లాక్‌చైన్‌లోని నిర్దిష్ట చిరునామాలో ఉంటుంది. మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // అప్‌డేట్ ఫంక్షన్‌ను కాల్ చేసినప్పుడు ఎమిట్ చేయబడుతుంది
   // స్మార్ట్ కాంట్రాక్ట్ ఈవెంట్‌లు అనేవి బ్లాక్‌చైన్‌లో ఏదో జరిగిందని మీ యాప్ ఫ్రంట్-ఎండ్‌కు కమ్యూనికేట్ చేయడానికి మీ కాంట్రాక్ట్‌కు ఒక మార్గం, ఇది నిర్దిష్ట ఈవెంట్‌ల కోసం 'వింటూ' ఉండవచ్చు మరియు అవి జరిగినప్పుడు చర్య తీసుకోవచ్చు.
   event UpdatedMessages(string oldStr, string newStr);

   // `string` రకానికి చెందిన `message` అనే స్టేట్ వేరియబుల్‌ను ప్రకటిస్తుంది.
   // స్టేట్ వేరియబుల్స్ అనేవి కాంట్రాక్ట్ స్టోరేజ్‌లో శాశ్వతంగా నిల్వ చేయబడే విలువలను కలిగి ఉండే వేరియబుల్స్. `public` కీవర్డ్ వేరియబుల్స్‌ను కాంట్రాక్ట్ వెలుపల నుండి యాక్సెస్ చేయడానికి వీలు కల్పిస్తుంది మరియు విలువను యాక్సెస్ చేయడానికి ఇతర కాంట్రాక్ట్‌లు లేదా క్లయింట్‌లు కాల్ చేయగల ఫంక్షన్‌ను క్రియేట్ చేస్తుంది.
   string public message;

   // అనేక క్లాస్-ఆధారిత ఆబ్జెక్ట్-ఓరియెంటెడ్ భాషల మాదిరిగానే, కన్‌స్ట్రక్టర్ అనేది కాంట్రాక్ట్ క్రియేట్ చేసినప్పుడు మాత్రమే అమలు చేయబడే ఒక ప్రత్యేక ఫంక్షన్.
   // కాంట్రాక్ట్ డేటాను ప్రారంభించడానికి కన్‌స్ట్రక్టర్‌లు ఉపయోగించబడతాయి. మరింత తెలుసుకోండి:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // `initMessage` అనే స్ట్రింగ్ ఆర్గ్యుమెంట్‌ను అంగీకరిస్తుంది మరియు విలువను కాంట్రాక్ట్ యొక్క `message` స్టోరేజ్ వేరియబుల్‌లో సెట్ చేస్తుంది).
      message = initMessage;
   }

   // స్ట్రింగ్ ఆర్గ్యుమెంట్‌ను అంగీకరించి, `message` స్టోరేజ్ వేరియబుల్‌ను అప్‌డేట్ చేసే పబ్లిక్ ఫంక్షన్.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

ఇది క్రియేట్ చేసినప్పుడు సందేశాన్ని నిల్వ చేసే ప్రాథమిక స్మార్ట్ కాంట్రాక్ట్. `update` ఫంక్షన్‌ను కాల్ చేయడం ద్వారా దీన్ని అప్‌డేట్ చేయవచ్చు.

### దశ 11: మీ ప్రాజెక్ట్‌కి మెటామాస్క్ & Alchemyని కనెక్ట్ చేయండి {#step-11-connect-metamask-alchemy-to-your-project}

మనం మెటామాస్క్ వాలెట్, Alchemy ఖాతాను క్రియేట్ చేసాము మరియు మన స్మార్ట్ కాంట్రాక్ట్‌ను రాశాము, ఇప్పుడు ఈ మూడింటినీ కనెక్ట్ చేయడానికి సమయం ఆసన్నమైంది.

మీ వాలెట్ నుండి పంపబడే ప్రతి లావాదేవీకి మీ ప్రత్యేకమైన ప్రైవేట్ కీని ఉపయోగించి సంతకం అవసరం. మన ప్రోగ్రామ్‌కు ఈ అనుమతిని అందించడానికి, మనం మన ప్రైవేట్ కీని ఎన్విరాన్‌మెంట్ ఫైల్‌లో సురక్షితంగా నిల్వ చేయవచ్చు. మనం ఇక్కడ Alchemy కోసం API కీని కూడా నిల్వ చేస్తాము.

> లావాదేవీలను పంపడం గురించి మరింత తెలుసుకోవడానికి, Web3 ఉపయోగించి లావాదేవీలను పంపడంపై [ఈ ట్యుటోరియల్‌ని](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) చూడండి.

ముందుగా, మీ ప్రాజెక్ట్ డైరెక్టరీలో dotenv ప్యాకేజీని ఇన్‌స్టాల్ చేయండి:

```
npm install dotenv --save
```

ఆపై, ప్రాజెక్ట్ యొక్క రూట్ డైరెక్టరీలో `.env` ఫైల్‌ను క్రియేట్ చేయండి. దానికి మీ మెటామాస్క్ ప్రైవేట్ కీ మరియు HTTP Alchemy API URLని జోడించండి.

మీ ఎన్విరాన్‌మెంట్ ఫైల్‌కు తప్పనిసరిగా `.env` అని పేరు పెట్టాలి, లేకపోతే అది ఎన్విరాన్‌మెంట్ ఫైల్‌గా గుర్తించబడదు.

దానికి `process.env` లేదా `.env-custom` లేదా మరే ఇతర పేరు పెట్టవద్దు.

- మీ ప్రైవేట్ కీని ఎగుమతి చేయడానికి [ఈ సూచనలను](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) అనుసరించండి
- HTTP Alchemy API URLని పొందడానికి దిగువ చూడండి

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

మీ `.env` ఇలా ఉండాలి:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

వీటిని వాస్తవానికి మన కోడ్‌కి కనెక్ట్ చేయడానికి, మనం దశ 13లో మన `hardhat.config.js` ఫైల్‌లో ఈ వేరియబుల్స్‌ను సూచిస్తాము.

### దశ 12: Ethers.jsని ఇన్‌స్టాల్ చేయండి {#step-12-install-ethersjs}

Ethers.js అనేది [ప్రామాణిక JSON-RPC పద్ధతులను](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) మరింత యూజర్ ఫ్రెండ్లీ పద్ధతులతో ర్యాప్ చేయడం ద్వారా ఎథీరియంతో ఇంటరాక్ట్ అవ్వడాన్ని మరియు అభ్యర్థనలు చేయడాన్ని సులభతరం చేసే లైబ్రరీ.

అదనపు టూలింగ్ మరియు విస్తరించిన కార్యాచరణ కోసం [ప్లగిన్‌లను](https://hardhat.org/plugins/) ఏకీకృతం చేయడానికి Hardhat మనల్ని అనుమతిస్తుంది. కాంట్రాక్ట్ డిప్లాయ్‌మెంట్ కోసం మనం [Ethers ప్లగిన్‌ను](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) సద్వినియోగం చేసుకుంటాము.

మీ ప్రాజెక్ట్ డైరెక్టరీలో ఇలా టైప్ చేయండి:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### దశ 13: hardhat.config.jsని అప్‌డేట్ చేయండి {#step-13-update-hardhat-configjs}

మనం ఇప్పటివరకు అనేక డిపెండెన్సీలు మరియు ప్లగిన్‌లను జోడించాము, ఇప్పుడు మన ప్రాజెక్ట్‌కు వాటన్నింటి గురించి తెలిసేలా మనం `hardhat.config.js`ని అప్‌డేట్ చేయాలి.

మీ `hardhat.config.js` ఇలా కనిపించేలా అప్‌డేట్ చేయండి:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### దశ 14: మన కాంట్రాక్ట్‌ను కంపైల్ చేయండి {#step-14-compile-our-contract}

ఇప్పటివరకు అంతా సరిగ్గా పనిచేస్తుందో లేదో నిర్ధారించుకోవడానికి, మన కాంట్రాక్ట్‌ను కంపైల్ చేద్దాం. `compile` టాస్క్ అనేది అంతర్నిర్మిత hardhat టాస్క్‌లలో ఒకటి.

కమాండ్ లైన్ నుండి దీన్ని రన్ చేయండి:

```bash
npx hardhat compile
```

మీకు `SPDX license identifier not provided in source file` గురించి హెచ్చరిక రావచ్చు, కానీ దాని గురించి ఆందోళన చెందాల్సిన అవసరం లేదు — మిగతావన్నీ బాగానే ఉన్నాయని ఆశిస్తున్నాము! లేకపోతే, మీరు ఎల్లప్పుడూ [Alchemy డిస్కార్డ్](https://discord.gg/u72VCg3)లో సందేశం పంపవచ్చు.

### దశ 15: మన డిప్లాయ్ స్క్రిప్ట్‌ను రాయండి {#step-15-write-our-deploy-script}

ఇప్పుడు మన కాంట్రాక్ట్ రాయబడింది మరియు మన కాన్ఫిగరేషన్ ఫైల్ సిద్ధంగా ఉంది కాబట్టి, మన కాంట్రాక్ట్ డిప్లాయ్ స్క్రిప్ట్‌ను రాయడానికి ఇది సమయం.

`scripts/` ఫోల్డర్‌కి వెళ్లి `deploy.js` అనే కొత్త ఫైల్‌ను క్రియేట్ చేసి, దానికి కింది కంటెంట్‌లను జోడించండి:

```javascript
async function main() {
  const HelloWorld = await ethers.getకాంట్రాక్ట్Factory("HelloWorld")

  // డిప్లాయ్‌మెంట్ ప్రారంభించండి, కాంట్రాక్ట్ ఆబ్జెక్ట్‌కు రిజాల్వ్ అయ్యే ప్రామిస్‌ను తిరిగి ఇస్తుంది
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat వారి [కాంట్రాక్ట్‌ల ట్యుటోరియల్](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)లో ఈ కోడ్ లైన్‌లు ఒక్కొక్కటి ఏమి చేస్తాయో అద్భుతంగా వివరిస్తుంది, మేము వారి వివరణలను ఇక్కడ స్వీకరించాము.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.jsలోని `ContractFactory` అనేది కొత్త స్మార్ట్ కాంట్రాక్ట్‌లను డిప్లాయ్ చేయడానికి ఉపయోగించే ఒక అబ్‌స్ట్రాక్షన్, కాబట్టి ఇక్కడ `HelloWorld` అనేది మన హలో వరల్డ్ కాంట్రాక్ట్ ఇన్‌స్టాన్స్‌ల కోసం ఒక [ఫ్యాక్టరీ](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>). `hardhat-ethers` ప్లగిన్ `ContractFactory` మరియు `Contract`ని ఉపయోగిస్తున్నప్పుడు, ఇన్‌స్టాన్స్‌లు డిఫాల్ట్‌గా మొదటి సంతకందారుకు (యజమాని) కనెక్ట్ చేయబడతాయి.

```javascript
const hello_world = await HelloWorld.deploy()
```

`ContractFactory`పై `deploy()`ని కాల్ చేయడం ద్వారా డిప్లాయ్‌మెంట్ ప్రారంభమవుతుంది మరియు `Contract` ఆబ్జెక్ట్‌కి రిజాల్వ్ అయ్యే `Promise`ని తిరిగి ఇస్తుంది. ఇది మన ప్రతి స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్‌కు ఒక పద్ధతిని కలిగి ఉండే ఆబ్జెక్ట్.

### దశ 16: మన కాంట్రాక్ట్‌ను డిప్లాయ్ చేయండి {#step-16-deploy-our-contract}

మనం చివరకు మన స్మార్ట్ కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడానికి సిద్ధంగా ఉన్నాము! కమాండ్ లైన్‌కి వెళ్లి దీన్ని రన్ చేయండి:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

ఆ తర్వాత మీరు ఇలాంటిది చూడాలి:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**దయచేసి ఈ చిరునామాను సేవ్ చేయండి**. ట్యుటోరియల్‌లో తర్వాత మనం దీన్ని ఉపయోగిస్తాము.

మనం [Goerli Etherscan](https://goerli.etherscan.io)కి వెళ్లి మన కాంట్రాక్ట్ చిరునామా కోసం వెతికితే, అది విజయవంతంగా డిప్లాయ్ చేయబడిందని మనం చూడగలగాలి. లావాదేవీ ఇలా కనిపిస్తుంది:

![](./etherscan-contract.png)

`From` చిరునామా మీ మెటామాస్క్ ఖాతా చిరునామాతో సరిపోలాలి మరియు `To` చిరునామా **Contract Creation** అని చెబుతుంది. మనం లావాదేవీపై క్లిక్ చేస్తే, `To` ఫీల్డ్‌లో మన కాంట్రాక్ట్ చిరునామాను చూస్తాము.

![](./etherscan-transaction.png)

అభినందనలు! మీరు ఇప్పుడే ఎథీరియం టెస్ట్‌నెట్‌కు స్మార్ట్ కాంట్రాక్ట్‌ను డిప్లాయ్ చేసారు.

అంతర్గతంగా (under the hood) ఏమి జరుగుతుందో అర్థం చేసుకోవడానికి, మన [Alchemy డ్యాష్‌బోర్డ్](https://dashboard.alchemy.com/explorer)లోని ఎక్స్‌ప్లోరర్ ట్యాబ్‌కి వెళ్దాం. మీకు బహుళ Alchemy యాప్‌లు ఉంటే, యాప్ ద్వారా ఫిల్టర్ చేసి **Hello World**ని ఎంచుకునేలా చూసుకోండి.

![](./hello-world-explorer.png)

మనం `.deploy()` ఫంక్షన్‌ను కాల్ చేసినప్పుడు Hardhat/Ethers మన కోసం అంతర్గతంగా చేసిన కొన్ని JSON-RPC పద్ధతులను ఇక్కడ మీరు చూస్తారు. ఇక్కడ రెండు ముఖ్యమైన పద్ధతులు [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), ఇది మన కాంట్రాక్ట్‌ను Goerli చైన్‌లో రాయడానికి చేసే అభ్యర్థన, మరియు [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), ఇది హ్యాష్ ఇవ్వబడిన మన లావాదేవీ గురించిన సమాచారాన్ని చదవడానికి చేసే అభ్యర్థన. లావాదేవీలను పంపడం గురించి మరింత తెలుసుకోవడానికి, [Web3 ఉపయోగించి లావాదేవీలను పంపడంపై మా ట్యుటోరియల్‌ని](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) చూడండి.

## పార్ట్ 2: మీ స్మార్ట్ కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వండి {#part-2-interact-with-your-smart-contract}

ఇప్పుడు మనం Goerli నెట్‌వర్క్‌లో స్మార్ట్ కాంట్రాక్ట్‌ను విజయవంతంగా డిప్లాయ్ చేసాము కాబట్టి, దానితో ఎలా ఇంటరాక్ట్ అవ్వాలో నేర్చుకుందాం.

### interact.js ఫైల్‌ను సృష్టించండి {#create-a-interactjs-file}

ఇక్కడే మనం మన ఇంటరాక్షన్ స్క్రిప్ట్‌ను రాస్తాము. పార్ట్ 1లో మీరు ముందే ఇన్‌స్టాల్ చేసిన Ethers.js లైబ్రరీని మనం ఉపయోగిస్తాము.

`scripts/` ఫోల్డర్ లోపల, `interact.js` పేరుతో కొత్త ఫైల్‌ను సృష్టించి, కింది కోడ్‌ను జోడించండి:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### మీ .env ఫైల్‌ను అప్‌డేట్ చేయండి {#update-your-env-file}

మనం కొత్త ఎన్విరాన్‌మెంట్ వేరియబుల్స్‌ను ఉపయోగిస్తాము, కాబట్టి [మనం ఇంతకు ముందు సృష్టించిన](#step-11-connect-metamask-alchemy-to-your-project) `.env` ఫైల్‌లో వాటిని నిర్వచించాలి.

మన Alchemy `API_KEY` మరియు మీ స్మార్ట్ కాంట్రాక్ట్ డిప్లాయ్ చేయబడిన `CONTRACT_ADDRESS` కోసం మనం ఒక నిర్వచనాన్ని జోడించాల్సి ఉంటుంది.

మీ `.env` ఫైల్ ఈ విధంగా ఉండాలి:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### మీ కాంట్రాక్ట్ ABIని పొందండి {#grab-your-contract-abi}

మన కాంట్రాక్ట్ [ABI (అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్)](/glossary/#abi) అనేది మన స్మార్ట్ కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వడానికి ఉపయోగించే ఇంటర్‌ఫేస్. Hardhat ఆటోమేటిక్‌గా ఒక ABIని రూపొందించి, దానిని `HelloWorld.json` లో సేవ్ చేస్తుంది. ABIని ఉపయోగించడానికి, మన `interact.js` ఫైల్‌కి కింది కోడ్ లైన్‌లను జోడించడం ద్వారా మనం కంటెంట్‌ను పార్స్ చేయాల్సి ఉంటుంది:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

మీరు ABIని చూడాలనుకుంటే, దాన్ని మీ కన్సోల్‌లో ప్రింట్ చేయవచ్చు:

```javascript
console.log(JSON.stringify(contract.abi))
```

మీ ABI కన్సోల్‌లో ప్రింట్ అవ్వడం చూడటానికి, మీ టెర్మినల్‌కి వెళ్లి దీన్ని రన్ చేయండి:

```bash
npx hardhat run scripts/interact.js
```

### మీ కాంట్రాక్ట్ యొక్క ఇన్‌స్టాన్స్‌ను సృష్టించండి {#create-an-instance-of-your-contract}

మన కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వడానికి, మనం మన కోడ్‌లో ఒక కాంట్రాక్ట్ ఇన్‌స్టాన్స్‌ను సృష్టించాలి. Ethers.jsతో అలా చేయడానికి, మనం మూడు కాన్సెప్ట్‌లతో పని చేయాల్సి ఉంటుంది:

1. ప్రొవైడర్ (ప్రొవైడర్) - బ్లాక్‌చైన్‌కి రీడ్ మరియు రైట్ యాక్సెస్‌ను అందించే నోడ్ ప్రొవైడర్
2. సైనర్ (సైనర్) - లావాదేవీలపై సంతకం చేయగల ఎథీరియం ఖాతాను సూచిస్తుంది
3. కాంట్రాక్ట్ (Contract) - ఆన్‌చైన్‌లో డిప్లాయ్ చేయబడిన నిర్దిష్ట కాంట్రాక్ట్‌ను సూచించే Ethers.js ఆబ్జెక్ట్

మన కాంట్రాక్ట్ ఇన్‌స్టాన్స్‌ను సృష్టించడానికి మనం మునుపటి దశలోని కాంట్రాక్ట్ ABIని ఉపయోగిస్తాము:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

ప్రొవైడర్లు, సైనర్లు మరియు కాంట్రాక్ట్‌ల గురించి మరింత సమాచారాన్ని [ethers.js డాక్యుమెంటేషన్](https://docs.ethers.io/v5/)లో తెలుసుకోండి.

### init సందేశాన్ని చదవండి {#read-the-init-message}

మనం `initMessage = "Hello world!"` తో మన కాంట్రాక్ట్‌ను డిప్లాయ్ చేసినప్పుడు గుర్తుందా? మనం ఇప్పుడు మన స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన ఆ సందేశాన్ని చదివి, కన్సోల్‌లో ప్రింట్ చేయబోతున్నాము.

జావాస్క్రిప్ట్‌లో, నెట్‌వర్క్‌లతో ఇంటరాక్ట్ అవుతున్నప్పుడు అసింక్రోనస్ ఫంక్షన్‌లు ఉపయోగించబడతాయి. అసింక్రోనస్ ఫంక్షన్‌ల గురించి మరింత తెలుసుకోవడానికి, [ఈ మీడియం ఆర్టికల్‌ను చదవండి](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

మన స్మార్ట్ కాంట్రాక్ట్‌లోని `message` ఫంక్షన్‌ను కాల్ చేయడానికి మరియు init సందేశాన్ని చదవడానికి కింది కోడ్‌ను ఉపయోగించండి:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

టెర్మినల్‌లో `npx hardhat run scripts/interact.js` ఉపయోగించి ఫైల్‌ను రన్ చేసిన తర్వాత మనం ఈ ప్రతిస్పందనను చూడాలి:

```
సందేశం: Hello world!
```

అభినందనలు! మీరు ఎథీరియం బ్లాక్‌చైన్ నుండి స్మార్ట్ కాంట్రాక్ట్ డేటాను విజయవంతంగా చదివారు, చాలా అద్భుతం!

### సందేశాన్ని అప్‌డేట్ చేయండి {#update-the-message}

కేవలం సందేశాన్ని చదవడమే కాకుండా, `update` ఫంక్షన్‌ను ఉపయోగించి మన స్మార్ట్ కాంట్రాక్ట్‌లో సేవ్ చేయబడిన సందేశాన్ని కూడా మనం అప్‌డేట్ చేయవచ్చు! చాలా బాగుంది కదా?

సందేశాన్ని అప్‌డేట్ చేయడానికి, మనం ఇన్‌స్టాన్షియేట్ చేసిన కాంట్రాక్ట్ ఆబ్జెక్ట్‌పై నేరుగా `update` ఫంక్షన్‌ను కాల్ చేయవచ్చు:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

గమనించండి, లైన్ 11లో, మనం తిరిగి వచ్చిన లావాదేవీ ఆబ్జెక్ట్‌పై `.wait()` కి కాల్ చేస్తాము. ఫంక్షన్ నుండి నిష్క్రమించే ముందు బ్లాక్‌చైన్‌లో లావాదేవీ మైన్ అయ్యే వరకు మన స్క్రిప్ట్ వేచి ఉండేలా ఇది నిర్ధారిస్తుంది. ఒకవేళ `.wait()` కాల్ చేర్చబడకపోతే, స్క్రిప్ట్ కాంట్రాక్ట్‌లోని అప్‌డేట్ చేయబడిన `message` విలువను చూడలేకపోవచ్చు.

### కొత్త సందేశాన్ని చదవండి {#read-the-new-message}

అప్‌డేట్ చేయబడిన `message` విలువను చదవడానికి మీరు [మునుపటి దశను](#read-the-init-message) పునరావృతం చేయగలగాలి. ఆ కొత్త విలువను ప్రింట్ చేయడానికి అవసరమైన మార్పులను మీరు చేయగలరో లేదో ఒక క్షణం ఆలోచించి చూడండి!

మీకు ఏదైనా హింట్ కావాలంటే, ఈ సమయంలో మీ `interact.js` ఫైల్ ఎలా ఉండాలో ఇక్కడ ఉంది:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// ప్రొవైడర్ - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// సైనర్ - మీరు
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// కాంట్రాక్ట్ ఇన్‌స్టాన్స్
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

ఇప్పుడు స్క్రిప్ట్‌ను రన్ చేయండి మరియు మీరు పాత సందేశం, అప్‌డేట్ అవుతున్న స్థితి మరియు కొత్త సందేశం మీ టెర్మినల్‌లో ప్రింట్ అవ్వడాన్ని చూడగలరు!

`npx hardhat run scripts/interact.js --network goerli`

```
సందేశం: Hello World!
సందేశాన్ని అప్‌డేట్ చేస్తోంది...
కొత్త సందేశం: This is the new message.
```

ఆ స్క్రిప్ట్‌ను రన్ చేస్తున్నప్పుడు, కొత్త సందేశం లోడ్ అయ్యే ముందు `Updating the message...` దశ లోడ్ అవ్వడానికి కొంత సమయం పడుతుందని మీరు గమనించవచ్చు. దానికి కారణం మైనింగ్ ప్రక్రియ; లావాదేవీలు మైన్ అవుతున్నప్పుడు వాటిని ట్రాక్ చేయడం గురించి మీకు ఆసక్తి ఉంటే, లావాదేవీ స్థితిని చూడటానికి [Alchemy మెమ్‌పూల్](https://dashboard.alchemyapi.io/mempool)ని సందర్శించండి. ఒకవేళ లావాదేవీ డ్రాప్ అయితే, [Goerli Etherscan](https://goerli.etherscan.io)ని తనిఖీ చేసి, మీ లావాదేవీ హ్యాష్ కోసం వెతకడం కూడా సహాయకరంగా ఉంటుంది.

## పార్ట్ 3: మీ స్మార్ట్ కాంట్రాక్ట్‌ను Etherscanలో పబ్లిష్ చేయండి {#part-3-publish-your-smart-contract-to-etherscan}

మీ స్మార్ట్ కాంట్రాక్ట్‌కు ప్రాణం పోయడానికి మీరు ఎంతో కష్టపడ్డారు; ఇప్పుడు దాన్ని ప్రపంచంతో పంచుకోవాల్సిన సమయం ఆసన్నమైంది!

Etherscanలో మీ స్మార్ట్ కాంట్రాక్ట్‌ను ధృవీకరించడం ద్వారా, ఎవరైనా మీ సోర్స్ కోడ్‌ను చూడవచ్చు మరియు మీ స్మార్ట్ కాంట్రాక్ట్‌తో ఇంటరాక్ట్ అవ్వవచ్చు. ఇక ప్రారంభిద్దాం!

### దశ 1: మీ Etherscan ఖాతాలో API కీని రూపొందించండి {#step-1-generate-an-api-key-on-your-etherscan-account}

మీరు పబ్లిష్ చేయడానికి ప్రయత్నిస్తున్న స్మార్ట్ కాంట్రాక్ట్ మీదేనని ధృవీకరించడానికి Etherscan API కీ అవసరం.

మీకు ఇప్పటికే Etherscan ఖాతా లేకపోతే, [ఖాతా కోసం సైన్ అప్ చేయండి](https://etherscan.io/register).

లాగిన్ అయిన తర్వాత, నావిగేషన్ బార్‌లో మీ యూజర్‌నేమ్‌ను కనుగొని, దానిపై హోవర్ చేసి, **My profile** బటన్‌ను ఎంచుకోండి.

మీ ప్రొఫైల్ పేజీలో, మీరు సైడ్ నావిగేషన్ బార్‌ను చూడాలి. సైడ్ నావిగేషన్ బార్ నుండి, **API Keys** ఎంచుకోండి. తర్వాత, కొత్త API కీని సృష్టించడానికి "Add" బటన్‌ను నొక్కండి, మీ యాప్‌కు **hello-world** అని పేరు పెట్టి, **Create New API Key** బటన్‌ను నొక్కండి.

మీ కొత్త API కీ, API కీ పట్టికలో కనిపించాలి. API కీని మీ క్లిప్‌బోర్డ్‌కు కాపీ చేయండి.

తర్వాత, మనం Etherscan API కీని మన `.env` ఫైల్‌కు జోడించాలి.

దాన్ని జోడించిన తర్వాత, మీ `.env` ఫైల్ ఇలా ఉండాలి:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat-డిప్లాయ్ చేయబడిన స్మార్ట్ కాంట్రాక్ట్‌లు {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan ఇన్‌స్టాల్ చేయండి {#install-hardhat-etherscan}

Hardhat ఉపయోగించి మీ కాంట్రాక్ట్‌ను Etherscanలో పబ్లిష్ చేయడం చాలా సులభం. ప్రారంభించడానికి మీరు ముందుగా `hardhat-etherscan` ప్లగిన్‌ను ఇన్‌స్టాల్ చేయాలి. `hardhat-etherscan` ఆటోమేటిక్‌గా Etherscanలో స్మార్ట్ కాంట్రాక్ట్ యొక్క సోర్స్ కోడ్ మరియు ABIని ధృవీకరిస్తుంది. దీన్ని జోడించడానికి, `hello-world` డైరెక్టరీలో దీన్ని రన్ చేయండి:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

ఇన్‌స్టాల్ చేసిన తర్వాత, మీ `hardhat.config.js` ఎగువన కింది స్టేట్‌మెంట్‌ను చేర్చండి మరియు Etherscan కాన్ఫిగ్ ఎంపికలను జోడించండి:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Etherscan కోసం మీ API కీ
    // https://etherscan.io/ వద్ద ఒకదాన్ని పొందండి
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscanలో మీ స్మార్ట్ కాంట్రాక్ట్‌ను ధృవీకరించండి {#verify-your-smart-contract-on-etherscan}

అన్ని ఫైల్‌లు సేవ్ చేయబడ్డాయని మరియు అన్ని `.env` వేరియబుల్స్ సరిగ్గా కాన్ఫిగర్ చేయబడ్డాయని నిర్ధారించుకోండి.

కాంట్రాక్ట్ చిరునామాను మరియు అది డిప్లాయ్ చేయబడిన నెట్‌వర్క్‌ను పాస్ చేస్తూ, `verify` టాస్క్‌ను రన్ చేయండి:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

`DEPLOYED_CONTRACT_ADDRESS` అనేది Goerli టెస్ట్‌నెట్‌లో డిప్లాయ్ చేయబడిన మీ స్మార్ట్ కాంట్రాక్ట్ చిరునామా అని నిర్ధారించుకోండి. అలాగే, చివరి ఆర్గ్యుమెంట్ (`'Hello World!'`) తప్పనిసరిగా [పార్ట్ 1లోని డిప్లాయ్ దశలో](#step-15-write-our-deploy-script) ఉపయోగించిన అదే స్ట్రింగ్ విలువ అయి ఉండాలి.

అంతా సవ్యంగా జరిగితే, మీరు మీ టెర్మినల్‌లో కింది సందేశాన్ని చూస్తారు:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

అభినందనలు! మీ స్మార్ట్ కాంట్రాక్ట్ కోడ్ Etherscanలో ఉంది!

### Etherscanలో మీ స్మార్ట్ కాంట్రాక్ట్‌ను చూడండి! {#check-out-your-smart-contract-on-etherscan}

మీ టెర్మినల్‌లో అందించిన లింక్‌కి మీరు నావిగేట్ చేసినప్పుడు, Etherscanలో పబ్లిష్ చేయబడిన మీ స్మార్ట్ కాంట్రాక్ట్ కోడ్ మరియు ABIని మీరు చూడగలరు!

**వాహూ - మీరు సాధించారు ఛాంప్! ఇప్పుడు ఎవరైనా మీ స్మార్ట్ కాంట్రాక్ట్‌కు కాల్ చేయవచ్చు లేదా వ్రాయవచ్చు! మీరు తర్వాత ఏమి నిర్మిస్తారో చూడటానికి మేము ఆసక్తిగా ఎదురుచూస్తున్నాము!**

## పార్ట్ 4 - మీ స్మార్ట్ కాంట్రాక్ట్‌ను ఫ్రంటెండ్‌తో అనుసంధానించడం {#part-4-integrating-your-smart-contract-with-the-frontend}

ఈ ట్యుటోరియల్ ముగిసే సమయానికి, మీరు వీటిని ఎలా చేయాలో తెలుసుకుంటారు:

- మీ వికేంద్రీకృత అప్లికేషన్ (dapp)కి మెటామాస్క్ వాలెట్‌ను కనెక్ట్ చేయడం
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) APIని ఉపయోగించి మీ స్మార్ట్ కాంట్రాక్ట్ నుండి డేటాను చదవడం
- మెటామాస్క్ ఉపయోగించి ఎథీరియం లావాదేవీలపై సంతకం చేయడం

ఈ dapp కోసం, మేము మా ఫ్రంటెండ్ ఫ్రేమ్‌వర్క్‌గా [React](https://react.dev/)ని ఉపయోగిస్తాము; అయితే, మేము మా ప్రాజెక్ట్‌కి Web3 కార్యాచరణను తీసుకురావడంపైనే ఎక్కువగా దృష్టి సారిస్తాము కాబట్టి, దాని ప్రాథమికాలను విచ్ఛిన్నం చేయడానికి మేము ఎక్కువ సమయం వెచ్చించబోమని గమనించడం ముఖ్యం.

ముందస్తు అవసరంగా, మీకు React గురించి ప్రాథమిక స్థాయి అవగాహన ఉండాలి. లేకపోతే, అధికారిక [Intro to React tutorial](https://react.dev/learn)ని పూర్తి చేయాలని మేము సిఫార్సు చేస్తున్నాము.

### స్టార్టర్ ఫైల్‌లను క్లోన్ చేయండి {#clone-the-starter-files}

ముందుగా, ఈ ప్రాజెక్ట్ కోసం స్టార్టర్ ఫైల్‌లను పొందడానికి [hello-world-part-four GitHub repository](https://github.com/alchemyplatform/hello-world-part-four-tutorial)కి వెళ్లి, ఈ రిపోజిటరీని మీ స్థానిక మెషీన్‌కు క్లోన్ చేయండి.

క్లోన్ చేసిన రిపోజిటరీని స్థానికంగా తెరవండి. ఇది రెండు ఫోల్డర్‌లను కలిగి ఉందని గమనించండి: `starter-files` మరియు `completed`.

- `starter-files`- **మేము ఈ డైరెక్టరీలో పని చేస్తాము**, మేము UIని మీ ఎథీరియం వాలెట్‌కి మరియు [పార్ట్ 3](#part-3-publish-your-smart-contract-to-etherscan)లో Etherscanలో మేము పబ్లిష్ చేసిన స్మార్ట్ కాంట్రాక్ట్‌కి కనెక్ట్ చేస్తాము.
- `completed` పూర్తయిన మొత్తం ట్యుటోరియల్‌ని కలిగి ఉంటుంది మరియు మీరు ఎక్కడైనా ఇరుక్కుపోతే మాత్రమే దీనిని సూచనగా ఉపయోగించాలి.

తర్వాత, మీకు ఇష్టమైన కోడ్ ఎడిటర్‌లో మీ `starter-files` కాపీని తెరిచి, ఆపై `src` ఫోల్డర్‌లోకి నావిగేట్ చేయండి.

మేము వ్రాసే కోడ్ అంతా `src` ఫోల్డర్ క్రింద ఉంటుంది. మా ప్రాజెక్ట్‌కి Web3 కార్యాచరణను అందించడానికి మేము `HelloWorld.js` కాంపోనెంట్ మరియు `util/interact.js` జావాస్క్రిప్ట్ ఫైల్‌లను సవరిస్తాము.

### స్టార్టర్ ఫైల్‌లను తనిఖీ చేయండి {#check-out-the-starter-files}

మేము కోడింగ్ ప్రారంభించడానికి ముందు, స్టార్టర్ ఫైల్‌లలో మాకు ఏమి అందించబడిందో అన్వేషిద్దాం.

#### మీ react ప్రాజెక్ట్‌ను రన్ చేయండి {#get-your-react-project-running}

మా బ్రౌజర్‌లో React ప్రాజెక్ట్‌ను రన్ చేయడం ద్వారా ప్రారంభిద్దాం. React యొక్క అందం ఏమిటంటే, మా ప్రాజెక్ట్ మా బ్రౌజర్‌లో రన్ అయిన తర్వాత, మేము సేవ్ చేసే ఏవైనా మార్పులు మా బ్రౌజర్‌లో ప్రత్యక్షంగా అప్‌డేట్ చేయబడతాయి.

ప్రాజెక్ట్‌ను రన్ చేయడానికి, `starter-files` ఫోల్డర్ యొక్క రూట్ డైరెక్టరీకి నావిగేట్ చేయండి మరియు ప్రాజెక్ట్ యొక్క డిపెండెన్సీలను ఇన్‌స్టాల్ చేయడానికి మీ టెర్మినల్‌లో `npm install`ని రన్ చేయండి:

```bash
cd starter-files
npm install
```

వాటి ఇన్‌స్టాలేషన్ పూర్తయిన తర్వాత, మీ టెర్మినల్‌లో `npm start`ని రన్ చేయండి:

```bash
npm start
```

అలా చేయడం వల్ల మీ బ్రౌజర్‌లో [http://localhost:3000/](http://localhost:3000/) తెరవబడుతుంది, ఇక్కడ మీరు మా ప్రాజెక్ట్ కోసం ఫ్రంటెండ్‌ను చూస్తారు. ఇది ఒక ఫీల్డ్ (మీ స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన సందేశాన్ని అప్‌డేట్ చేసే స్థలం), "Connect Wallet" బటన్ మరియు "Update" బటన్‌ను కలిగి ఉండాలి.

మీరు ఏదైనా బటన్‌ను క్లిక్ చేయడానికి ప్రయత్నిస్తే, అవి పని చేయవని మీరు గమనించవచ్చు—ఎందుకంటే మేము ఇంకా వాటి కార్యాచరణను ప్రోగ్రామ్ చేయాల్సి ఉంది.

#### `HelloWorld.js` కాంపోనెంట్ {#the-helloworld-js-component}

మా ఎడిటర్‌లోని `src` ఫోల్డర్‌కి తిరిగి వెళ్లి `HelloWorld.js` ఫైల్‌ను తెరుద్దాం. ఈ ఫైల్‌లోని ప్రతిదీ మనం అర్థం చేసుకోవడం చాలా ముఖ్యం, ఎందుకంటే ఇది మనం పని చేసే ప్రాథమిక React కాంపోనెంట్.

ఈ ఫైల్ ఎగువన, మా ప్రాజెక్ట్‌ను రన్ చేయడానికి అవసరమైన అనేక దిగుమతి (import) స్టేట్‌మెంట్‌లు ఉన్నాయని మీరు గమనించవచ్చు, వీటిలో React లైబ్రరీ, useEffect మరియు useState హుక్స్, `./util/interact.js` నుండి కొన్ని అంశాలు (మేము వాటిని త్వరలో మరింత వివరంగా వివరిస్తాము!) మరియు Alchemy లోగో ఉన్నాయి.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

తర్వాత, నిర్దిష్ట ఈవెంట్‌ల తర్వాత మేము అప్‌డేట్ చేసే మా స్థితి (state) వేరియబుల్స్ ఉన్నాయి.

```javascript
// HelloWorld.js

//స్థితి వేరియబుల్స్
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

ప్రతి వేరియబుల్ దేనిని సూచిస్తుందో ఇక్కడ ఉంది:

- `walletAddress` - వినియోగదారు వాలెట్ చిరునామాను నిల్వ చేసే స్ట్రింగ్
- `status`- dappతో ఎలా ఇంటరాక్ట్ అవ్వాలో వినియోగదారుకు మార్గనిర్దేశం చేసే సహాయక సందేశాన్ని నిల్వ చేసే స్ట్రింగ్
- `message` - స్మార్ట్ కాంట్రాక్ట్‌లో ప్రస్తుత సందేశాన్ని నిల్వ చేసే స్ట్రింగ్
- `newMessage` - స్మార్ట్ కాంట్రాక్ట్‌కు వ్రాయబడే కొత్త సందేశాన్ని నిల్వ చేసే స్ట్రింగ్

స్థితి వేరియబుల్స్ తర్వాత, మీరు అమలు చేయని ఐదు ఫంక్షన్‌లను చూస్తారు: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, మరియు `onUpdatePressed`. అవి ఏమి చేస్తాయో మేము క్రింద వివరిస్తాము:

```javascript
// HelloWorld.js

//ఒక్కసారి మాత్రమే కాల్ చేయబడుతుంది
useEffect(async () => {
  //TODO: అమలు చేయండి
}, [])

function addSmartContractListener() {
  //TODO: అమలు చేయండి
}

function addWalletListener() {
  //TODO: అమలు చేయండి
}

const connectWalletPressed = async () => {
  //TODO: అమలు చేయండి
}

const onUpdatePressed = async () => {
  //TODO: అమలు చేయండి
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- ఇది మీ కాంపోనెంట్ రెండర్ అయిన తర్వాత కాల్ చేయబడే React హుక్. దీనికి ఖాళీ శ్రేణి (array) `[]` ప్రాప్ పంపబడినందున (లైన్ 4 చూడండి), ఇది కాంపోనెంట్ యొక్క _మొదటి_ రెండర్‌లో మాత్రమే కాల్ చేయబడుతుంది. ఇక్కడ మేము మా స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన ప్రస్తుత సందేశాన్ని లోడ్ చేస్తాము, మా స్మార్ట్ కాంట్రాక్ట్ మరియు వాలెట్ లిజనర్‌లను కాల్ చేస్తాము మరియు వాలెట్ ఇప్పటికే కనెక్ట్ చేయబడిందో లేదో ప్రతిబింబించేలా మా UIని అప్‌డేట్ చేస్తాము.
- `addSmartContractListener`- ఈ ఫంక్షన్ మా HelloWorld కాంట్రాక్ట్ యొక్క `UpdatedMessages` ఈవెంట్ కోసం చూసే లిజనర్‌ను సెటప్ చేస్తుంది మరియు మా స్మార్ట్ కాంట్రాక్ట్‌లో సందేశం మార్చబడినప్పుడు మా UIని అప్‌డేట్ చేస్తుంది.
- `addWalletListener`- ఈ ఫంక్షన్ వినియోగదారు మెటామాస్క్ వాలెట్ స్థితిలో మార్పులను గుర్తించే లిజనర్‌ను సెటప్ చేస్తుంది, అంటే వినియోగదారు వారి వాలెట్‌ను డిస్‌కనెక్ట్ చేసినప్పుడు లేదా చిరునామాలను మార్చినప్పుడు.
- `connectWalletPressed`- వినియోగదారు మెటామాస్క్ వాలెట్‌ను మా dappకి కనెక్ట్ చేయడానికి ఈ ఫంక్షన్ కాల్ చేయబడుతుంది.
- `onUpdatePressed` - వినియోగదారు స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన సందేశాన్ని అప్‌డేట్ చేయాలనుకున్నప్పుడు ఈ ఫంక్షన్ కాల్ చేయబడుతుంది.

ఈ ఫైల్ ముగింపుకు సమీపంలో, మా కాంపోనెంట్ యొక్క UI ఉంది.

```javascript
// HelloWorld.js

//మా కాంపోనెంట్ యొక్క UI
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
    </div>
  </div>
)
```

మీరు ఈ కోడ్‌ను జాగ్రత్తగా స్కాన్ చేస్తే, మా UIలో మా వివిధ స్థితి వేరియబుల్స్‌ను ఎక్కడ ఉపయోగిస్తామో మీరు గమనించవచ్చు:

- 6-12 లైన్లలో, వినియోగదారు వాలెట్ కనెక్ట్ చేయబడి ఉంటే (అంటే, `walletAddress.length > 0`), మేము "walletButton" ID ఉన్న బటన్‌లో వినియోగదారు `walletAddress` యొక్క కుదించబడిన సంస్కరణను ప్రదర్శిస్తాము; లేకపోతే అది కేవలం "Connect Wallet" అని చెబుతుంది.
- లైన్ 17లో, మేము స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన ప్రస్తుత సందేశాన్ని ప్రదర్శిస్తాము, ఇది `message` స్ట్రింగ్‌లో క్యాప్చర్ చేయబడింది.
- 23-26 లైన్లలో, టెక్స్ట్ ఫీల్డ్‌లోని ఇన్‌పుట్ మారినప్పుడు మా `newMessage` స్థితి వేరియబుల్‌ను అప్‌డేట్ చేయడానికి మేము [నియంత్రిత కాంపోనెంట్](https://legacy.reactjs.org/docs/forms.html#controlled-components)ని ఉపయోగిస్తాము.

మా స్థితి వేరియబుల్స్‌తో పాటు, `publishButton` మరియు `walletButton` IDలు ఉన్న బటన్‌లను క్లిక్ చేసినప్పుడు వరుసగా `connectWalletPressed` మరియు `onUpdatePressed` ఫంక్షన్‌లు కాల్ చేయబడతాయని కూడా మీరు చూస్తారు.

చివరగా, ఈ `HelloWorld.js` కాంపోనెంట్ ఎక్కడ జోడించబడిందో చూద్దాం.

మీరు `App.js` ఫైల్‌కి వెళితే, ఇది అన్ని ఇతర కాంపోనెంట్‌లకు కంటైనర్‌గా పనిచేసే Reactలోని ప్రధాన కాంపోనెంట్, మా `HelloWorld.js` కాంపోనెంట్ లైన్ 7లో ఇంజెక్ట్ చేయబడిందని మీరు చూస్తారు.

చివరిది కానీ, మీ కోసం అందించబడిన మరొక ఫైల్, `interact.js` ఫైల్‌ను తనిఖీ చేద్దాం.

#### `interact.js` ఫైల్ {#the-interact-js-file}

మేము [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) నమూనాను అనుసరించాలనుకుంటున్నందున, మా dapp యొక్క లాజిక్, డేటా మరియు నియమాలను నిర్వహించడానికి మా అన్ని ఫంక్షన్‌లను కలిగి ఉన్న ప్రత్యేక ఫైల్ మాకు కావాలి, ఆపై ఆ ఫంక్షన్‌లను మా ఫ్రంటెండ్‌కు (మా `HelloWorld.js` కాంపోనెంట్) ఎగుమతి చేయగలగాలి.

👆🏽మా `interact.js` ఫైల్ యొక్క ఖచ్చితమైన ఉద్దేశ్యం ఇదే!

మీ `src` డైరెక్టరీలోని `util` ఫోల్డర్‌కి నావిగేట్ చేయండి మరియు మా స్మార్ట్ కాంట్రాక్ట్ ఇంటరాక్షన్ మరియు వాలెట్ ఫంక్షన్‌లు మరియు వేరియబుల్స్ అన్నింటినీ కలిగి ఉండే `interact.js` అనే ఫైల్‌ను మేము చేర్చామని మీరు గమనించవచ్చు.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

ఫైల్ ఎగువన మేము `helloWorldContract` ఆబ్జెక్ట్‌ను కామెంట్ చేశామని మీరు గమనించవచ్చు. ఈ ట్యుటోరియల్‌లో తర్వాత, మేము ఈ ఆబ్జెక్ట్‌ను అన్‌కామెంట్ చేస్తాము మరియు ఈ వేరియబుల్‌లో మా స్మార్ట్ కాంట్రాక్ట్‌ను ఇన్‌స్టాన్షియేట్ చేస్తాము, ఆపై మేము దానిని మా `HelloWorld.js` కాంపోనెంట్‌లోకి ఎగుమతి చేస్తాము.

మా `helloWorldContract` ఆబ్జెక్ట్ తర్వాత అమలు చేయని నాలుగు ఫంక్షన్‌లు ఈ క్రింది వాటిని చేస్తాయి:

- `loadCurrentMessage` - ఈ ఫంక్షన్ స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన ప్రస్తుత సందేశాన్ని లోడ్ చేసే లాజిక్‌ను నిర్వహిస్తుంది. ఇది [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3)ని ఉపయోగించి Hello World స్మార్ట్ కాంట్రాక్ట్‌కి _read_ కాల్ చేస్తుంది.
- `connectWallet` - ఈ ఫంక్షన్ వినియోగదారు మెటామాస్క్‌ను మా dappకి కనెక్ట్ చేస్తుంది.
- `getCurrentWalletConnected` - పేజీ లోడ్ అయినప్పుడు ఎథీరియం ఖాతా ఇప్పటికే మా dappకి కనెక్ట్ చేయబడిందో లేదో ఈ ఫంక్షన్ తనిఖీ చేస్తుంది మరియు తదనుగుణంగా మా UIని అప్‌డేట్ చేస్తుంది.
- `updateMessage` - ఈ ఫంక్షన్ స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన సందేశాన్ని అప్‌డేట్ చేస్తుంది. ఇది Hello World స్మార్ట్ కాంట్రాక్ట్‌కి _write_ కాల్ చేస్తుంది, కాబట్టి సందేశాన్ని అప్‌డేట్ చేయడానికి వినియోగదారు మెటామాస్క్ వాలెట్ ఎథీరియం లావాదేవీపై సంతకం చేయాల్సి ఉంటుంది.

ఇప్పుడు మనం దేనితో పని చేస్తున్నామో అర్థం చేసుకున్నాము కాబట్టి, మా స్మార్ట్ కాంట్రాక్ట్ నుండి ఎలా చదవాలో తెలుసుకుందాం!

### దశ 3: మీ స్మార్ట్ కాంట్రాక్ట్ నుండి చదవండి {#step-3-read-from-your-smart-contract}

మీ స్మార్ట్ కాంట్రాక్ట్ నుండి చదవడానికి, మీరు వీటిని విజయవంతంగా సెటప్ చేయాలి:

- ఎథీరియం చైన్‌కి API కనెక్షన్
- మీ స్మార్ట్ కాంట్రాక్ట్ యొక్క లోడ్ చేయబడిన ఇన్‌స్టాన్స్
- మీ స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్‌కి కాల్ చేయడానికి ఒక ఫంక్షన్
- మీరు స్మార్ట్ కాంట్రాక్ట్ నుండి చదువుతున్న డేటా మారినప్పుడు అప్‌డేట్‌ల కోసం చూడటానికి ఒక లిజనర్

ఇది చాలా దశల వలె అనిపించవచ్చు, కానీ చింతించకండి! వాటిలో ప్రతిదాన్ని దశలవారీగా ఎలా చేయాలో మేము మీకు మార్గనిర్దేశం చేస్తాము! :\)

#### ఎథీరియం చైన్‌కి API కనెక్షన్‌ని ఏర్పాటు చేయండి {#establish-an-api-connection-to-the-ethereum-chain}

ఈ ట్యుటోరియల్ యొక్క పార్ట్ 2లో, [మా స్మార్ట్ కాంట్రాక్ట్ నుండి చదవడానికి మా Alchemy Web3 కీని](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library) ఎలా ఉపయోగించామో గుర్తుందా? చైన్ నుండి చదవడానికి మీ dappలో మీకు Alchemy Web3 కీ కూడా అవసరం.

మీకు ఇది ఇప్పటికే లేకపోతే, ముందుగా మీ `starter-files` యొక్క రూట్ డైరెక్టరీకి నావిగేట్ చేయడం ద్వారా మరియు మీ టెర్మినల్‌లో ఈ క్రింది వాటిని రన్ చేయడం ద్వారా [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)ని ఇన్‌స్టాల్ చేయండి:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) అనేది [Web3.js](https://docs.web3js.org/) చుట్టూ ఉన్న ఒక రాపర్, ఇది మెరుగైన API పద్ధతులను మరియు Web3 డెవలపర్‌గా మీ జీవితాన్ని సులభతరం చేయడానికి ఇతర కీలక ప్రయోజనాలను అందిస్తుంది. ఇది కనీస కాన్ఫిగరేషన్ అవసరమయ్యేలా రూపొందించబడింది, కాబట్టి మీరు దీన్ని వెంటనే మీ యాప్‌లో ఉపయోగించడం ప్రారంభించవచ్చు!

తర్వాత, మీ ప్రాజెక్ట్ డైరెక్టరీలో [dotenv](https://www.npmjs.com/package/dotenv) ప్యాకేజీని ఇన్‌స్టాల్ చేయండి, తద్వారా మా API కీని పొందిన తర్వాత దాన్ని నిల్వ చేయడానికి మాకు సురక్షితమైన స్థలం ఉంటుంది.

```text
npm install dotenv --save
```

మా dapp కోసం, **మేము మా HTTP API కీకి బదులుగా మా Websockets API కీని ఉపయోగిస్తాము**, ఎందుకంటే స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన సందేశం మారినప్పుడు గుర్తించే లిజనర్‌ను సెటప్ చేయడానికి ఇది మమ్మల్ని అనుమతిస్తుంది.

మీరు మీ API కీని పొందిన తర్వాత, మీ రూట్ డైరెక్టరీలో `.env` ఫైల్‌ను సృష్టించండి మరియు దానికి మీ Alchemy Websockets urlని జోడించండి. ఆ తర్వాత, మీ `.env` ఫైల్ ఇలా ఉండాలి:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

ఇప్పుడు, మా dappలో మా Alchemy Web3 ఎండ్‌పాయింట్‌ను సెటప్ చేయడానికి మేము సిద్ధంగా ఉన్నాము! మా `util` ఫోల్డర్ లోపల ఉన్న మా `interact.js`కి తిరిగి వెళ్లి, ఫైల్ ఎగువన ఈ క్రింది కోడ్‌ను జోడిద్దాం:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

పైన, మేము ముందుగా మా `.env` ఫైల్ నుండి Alchemy కీని దిగుమతి చేసాము మరియు మా Alchemy Web3 ఎండ్‌పాయింట్‌ను ఏర్పాటు చేయడానికి మా `alchemyKey`ని `createAlchemyWeb3`కి పంపాము.

ఈ ఎండ్‌పాయింట్ సిద్ధంగా ఉన్నందున, మా స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయడానికి ఇది సమయం!

#### మీ Hello World స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేస్తోంది {#loading-your-hello-world-smart-contract}

మీ Hello World స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయడానికి, మీకు దాని కాంట్రాక్ట్ చిరునామా మరియు ABI అవసరం, మీరు [ఈ ట్యుటోరియల్ యొక్క పార్ట్ 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)ని పూర్తి చేసి ఉంటే ఈ రెండూ Etherscanలో కనుగొనబడతాయి.

#### Etherscan నుండి మీ కాంట్రాక్ట్ ABIని ఎలా పొందాలి {#how-to-get-your-contract-abi-from-etherscan}

మీరు ఈ ట్యుటోరియల్ యొక్క పార్ట్ 3ని దాటవేసినట్లయితే, మీరు [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) చిరునామాతో HelloWorld కాంట్రాక్ట్‌ను ఉపయోగించవచ్చు. దాని ABIని [ఇక్కడ](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) కనుగొనవచ్చు.

కాంట్రాక్ట్ ఏ ఫంక్షన్‌ను ఇన్వోక్ చేస్తుందో పేర్కొనడానికి మరియు ఫంక్షన్ మీరు ఆశించే ఆకృతిలో డేటాను తిరిగి ఇస్తుందని నిర్ధారించడానికి కాంట్రాక్ట్ ABI అవసరం. మేము మా కాంట్రాక్ట్ ABIని కాపీ చేసిన తర్వాత, దాన్ని మీ `src` డైరెక్టరీలో `contract-abi.json` అనే JSON ఫైల్‌గా సేవ్ చేద్దాం.

మీ contract-abi.json మీ src ఫోల్డర్‌లో నిల్వ చేయబడాలి.

మా కాంట్రాక్ట్ చిరునామా, ABI మరియు Alchemy Web3 ఎండ్‌పాయింట్‌తో సన్నద్ధమై, మా స్మార్ట్ కాంట్రాక్ట్ యొక్క ఇన్‌స్టాన్స్‌ను లోడ్ చేయడానికి మేము [కాంట్రాక్ట్ పద్ధతిని](https://docs.web3js.org/api/web3-eth-contract/class/Contract) ఉపయోగించవచ్చు. మీ కాంట్రాక్ట్ ABIని `interact.js` ఫైల్‌లోకి దిగుమతి చేయండి మరియు మీ కాంట్రాక్ట్ చిరునామాను జోడించండి.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

మేము ఇప్పుడు చివరగా మా `helloWorldContract` వేరియబుల్‌ను అన్‌కామెంట్ చేయవచ్చు మరియు మా AlchemyWeb3 ఎండ్‌పాయింట్‌ని ఉపయోగించి స్మార్ట్ కాంట్రాక్ట్‌ను లోడ్ చేయవచ్చు:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

సంగ్రహంగా చెప్పాలంటే, మీ `interact.js` యొక్క మొదటి 12 లైన్‌లు ఇప్పుడు ఇలా ఉండాలి:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

ఇప్పుడు మా కాంట్రాక్ట్ లోడ్ చేయబడినందున, మేము మా `loadCurrentMessage` ఫంక్షన్‌ను అమలు చేయవచ్చు!

#### మీ `interact.js` ఫైల్‌లో `loadCurrentMessage`ని అమలు చేయడం {#implementing-loadcurrentmessage-in-your-interact-js-file}

ఈ ఫంక్షన్ చాలా సులభం. మా కాంట్రాక్ట్ నుండి చదవడానికి మేము ఒక సాధారణ async web3 కాల్ చేయబోతున్నాము. మా ఫంక్షన్ స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన సందేశాన్ని తిరిగి ఇస్తుంది:

మీ `interact.js` ఫైల్‌లోని `loadCurrentMessage`ని ఈ క్రింది వాటికి అప్‌డేట్ చేయండి:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

మేము ఈ స్మార్ట్ కాంట్రాక్ట్‌ను మా UIలో ప్రదర్శించాలనుకుంటున్నందున, మా `HelloWorld.js` కాంపోనెంట్‌లోని `useEffect` ఫంక్షన్‌ను ఈ క్రింది వాటికి అప్‌డేట్ చేద్దాం:

```javascript
// HelloWorld.js

//ఒక్కసారి మాత్రమే కాల్ చేయబడుతుంది
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

గమనిక, కాంపోనెంట్ యొక్క మొదటి రెండర్ సమయంలో మా `loadCurrentMessage` ఒకసారి మాత్రమే కాల్ చేయబడాలని మేము కోరుకుంటున్నాము. స్మార్ట్ కాంట్రాక్ట్‌లోని సందేశం మారిన తర్వాత UIని స్వయంచాలకంగా అప్‌డేట్ చేయడానికి మేము త్వరలో `addSmartContractListener`ని అమలు చేస్తాము.

మేము మా లిజనర్‌లోకి ప్రవేశించే ముందు, ఇప్పటివరకు మన వద్ద ఉన్నవాటిని తనిఖీ చేద్దాం! మీ `HelloWorld.js` మరియు `interact.js` ఫైల్‌లను సేవ్ చేయండి, ఆపై [http://localhost:3000/](http://localhost:3000/)కి వెళ్లండి

ప్రస్తుత సందేశం ఇకపై "No connection to the network" అని చెప్పదని మీరు గమనించవచ్చు. బదులుగా ఇది స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన సందేశాన్ని ప్రతిబింబిస్తుంది. అద్భుతం!

#### మీ UI ఇప్పుడు స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన సందేశాన్ని ప్రతిబింబించాలి {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

ఇప్పుడు ఆ లిజనర్ గురించి మాట్లాడుకుంటే...

#### `addSmartContractListener`ని అమలు చేయండి {#implement-addsmartcontractlistener}

మేము [ఈ ట్యుటోరియల్ సిరీస్ యొక్క పార్ట్ 1](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract)లో వ్రాసిన `HelloWorld.sol` ఫైల్ గురించి మీరు ఆలోచిస్తే, మా స్మార్ట్ కాంట్రాక్ట్ యొక్క `update` ఫంక్షన్ ఇన్వోక్ చేయబడిన తర్వాత ఎమిట్ చేయబడే `UpdatedMessages` అనే స్మార్ట్ కాంట్రాక్ట్ ఈవెంట్ ఉందని మీకు గుర్తుంటుంది (లైన్లు 9 మరియు 27 చూడండి):

```javascript
// HelloWorld.sol

// సెమాంటిక్ వెర్షనింగ్‌ని ఉపయోగించి, Solidity యొక్క వెర్షన్‌ను నిర్దేశిస్తుంది.
// మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` పేరుతో ఒక కాంట్రాక్ట్‌ను నిర్వచిస్తుంది.
// కాంట్రాక్ట్ అనేది ఫంక్షన్‌లు మరియు డేటా (దాని స్థితి) యొక్క సమాహారం. డిప్లాయ్ చేసిన తర్వాత, కాంట్రాక్ట్ ఎథీరియం బ్లాక్‌చైన్‌లోని ఒక నిర్దిష్ట చిరునామా వద్ద ఉంటుంది. మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //అప్‌డేట్ ఫంక్షన్‌ను కాల్ చేసినప్పుడు ఎమిట్ చేయబడుతుంది
   //స్మార్ట్ కాంట్రాక్ట్ ఈవెంట్‌లు అనేవి బ్లాక్‌చైన్‌లో ఏదో జరిగిందని మీ యాప్ ఫ్రంట్-ఎండ్‌కు మీ కాంట్రాక్ట్ కమ్యూనికేట్ చేయడానికి ఒక మార్గం, ఇది నిర్దిష్ట ఈవెంట్‌ల కోసం 'వింటూ' ఉండవచ్చు మరియు అవి జరిగినప్పుడు చర్య తీసుకోవచ్చు.
   event UpdatedMessages(string oldStr, string newStr);

   // `string` రకానికి చెందిన `message` అనే స్థితి వేరియబుల్‌ను ప్రకటిస్తుంది.
   // స్థితి వేరియబుల్స్ అనేవి కాంట్రాక్ట్ స్టోరేజ్‌లో శాశ్వతంగా నిల్వ చేయబడే విలువలను కలిగి ఉండే వేరియబుల్స్. `public` కీవర్డ్ వేరియబుల్స్‌ను కాంట్రాక్ట్ వెలుపల నుండి యాక్సెస్ చేయడానికి వీలు కల్పిస్తుంది మరియు విలువను యాక్సెస్ చేయడానికి ఇతర కాంట్రాక్ట్‌లు లేదా క్లయింట్‌లు కాల్ చేయగల ఫంక్షన్‌ను సృష్టిస్తుంది.
   string public message;

   // అనేక క్లాస్-ఆధారిత ఆబ్జెక్ట్-ఓరియెంటెడ్ భాషల మాదిరిగానే, కన్‌స్ట్రక్టర్ అనేది కాంట్రాక్ట్ సృష్టి సమయంలో మాత్రమే అమలు చేయబడే ఒక ప్రత్యేక ఫంక్షన్.
   // కాంట్రాక్ట్ డేటాను ప్రారంభించడానికి కన్‌స్ట్రక్టర్‌లు ఉపయోగించబడతాయి. మరింత తెలుసుకోండి:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // స్ట్రింగ్ ఆర్గ్యుమెంట్ `initMessage`ని అంగీకరిస్తుంది మరియు విలువను కాంట్రాక్ట్ యొక్క `message` స్టోరేజ్ వేరియబుల్‌లో సెట్ చేస్తుంది).
      message = initMessage;
   }

   // స్ట్రింగ్ ఆర్గ్యుమెంట్‌ను అంగీకరించి, `message` స్టోరేజ్ వేరియబుల్‌ను అప్‌డేట్ చేసే పబ్లిక్ ఫంక్షన్.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

స్మార్ట్ కాంట్రాక్ట్ ఈవెంట్‌లు అనేవి బ్లాక్‌చైన్‌లో ఏదో జరిగిందని (అంటే, ఒక _ఈవెంట్_ జరిగిందని) మీ ఫ్రంట్-ఎండ్ అప్లికేషన్‌కు కమ్యూనికేట్ చేయడానికి మీ కాంట్రాక్ట్‌కు ఒక మార్గం, ఇది నిర్దిష్ట ఈవెంట్‌ల కోసం 'వింటూ' ఉండవచ్చు మరియు అవి జరిగినప్పుడు చర్య తీసుకోవచ్చు.

`addSmartContractListener` ఫంక్షన్ ప్రత్యేకంగా మా Hello World స్మార్ట్ కాంట్రాక్ట్ యొక్క `UpdatedMessages` ఈవెంట్ కోసం వింటుంది మరియు కొత్త సందేశాన్ని ప్రదర్శించడానికి మా UIని అప్‌డేట్ చేస్తుంది.

`addSmartContractListener`ని ఈ క్రింది వాటికి సవరించండి:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

లిజనర్ ఈవెంట్‌ను గుర్తించినప్పుడు ఏమి జరుగుతుందో విచ్ఛిన్నం చేద్దాం:

- ఈవెంట్ ఎమిట్ అయినప్పుడు లోపం సంభవిస్తే, అది మా `status` స్థితి వేరియబుల్ ద్వారా UIలో ప్రతిబింబిస్తుంది.
- లేకపోతే, మేము తిరిగి వచ్చిన `data` ఆబ్జెక్ట్‌ను ఉపయోగిస్తాము. `data.returnValues` అనేది సున్నా వద్ద ఇండెక్స్ చేయబడిన శ్రేణి, ఇక్కడ శ్రేణిలోని మొదటి మూలకం మునుపటి సందేశాన్ని నిల్వ చేస్తుంది మరియు రెండవ మూలకం అప్‌డేట్ చేయబడిన దాన్ని నిల్వ చేస్తుంది. మొత్తంగా, విజయవంతమైన ఈవెంట్‌లో మేము మా `message` స్ట్రింగ్‌ను అప్‌డేట్ చేయబడిన సందేశానికి సెట్ చేస్తాము, `newMessage` స్ట్రింగ్‌ను క్లియర్ చేస్తాము మరియు మా స్మార్ట్ కాంట్రాక్ట్‌లో కొత్త సందేశం ప్రచురించబడిందని ప్రతిబింబించేలా మా `status` స్థితి వేరియబుల్‌ను అప్‌డేట్ చేస్తాము.

చివరగా, మా `useEffect` ఫంక్షన్‌లో మా లిజనర్‌ను కాల్ చేద్దాం, తద్వారా ఇది `HelloWorld.js` కాంపోనెంట్ యొక్క మొదటి రెండర్‌లో ప్రారంభించబడుతుంది. మొత్తంగా, మీ `useEffect` ఫంక్షన్ ఇలా ఉండాలి:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

ఇప్పుడు మనం మా స్మార్ట్ కాంట్రాక్ట్ నుండి చదవగలుగుతున్నాము కాబట్టి, దానికి ఎలా వ్రాయాలో కూడా తెలుసుకోవడం చాలా బాగుంటుంది! అయితే, మా dappకి వ్రాయడానికి, మేము ముందుగా దానికి ఎథీరియం వాలెట్‌ను కనెక్ట్ చేసి ఉండాలి.

కాబట్టి, తర్వాత మేము మా ఎథీరియం వాలెట్‌ను (మెటామాస్క్) సెటప్ చేయడం మరియు దానిని మా dappకి కనెక్ట్ చేయడం గురించి చర్చిస్తాము!

### దశ 4: మీ ఎథీరియం వాలెట్‌ను సెటప్ చేయండి {#step-4-set-up-your-ethereum-wallet}

ఎథీరియం చైన్‌కి ఏదైనా వ్రాయడానికి, వినియోగదారులు వారి వర్చువల్ వాలెట్ యొక్క ప్రైవేట్ కీలను ఉపయోగించి లావాదేవీలపై సంతకం చేయాలి. ఈ ట్యుటోరియల్ కోసం, మేము [మెటామాస్క్](https://metamask.io/)ని ఉపయోగిస్తాము, ఇది మీ ఎథీరియం ఖాతా చిరునామాను నిర్వహించడానికి ఉపయోగించే బ్రౌజర్‌లోని వర్చువల్ వాలెట్, ఎందుకంటే ఇది తుది వినియోగదారుకు ఈ లావాదేవీ సంతకాన్ని చాలా సులభం చేస్తుంది.

ఎథీరియంలో లావాదేవీలు ఎలా పని చేస్తాయనే దాని గురించి మీరు మరింత అర్థం చేసుకోవాలనుకుంటే, ఎథీరియం ఫౌండేషన్ నుండి [ఈ పేజీని](/developers/docs/transactions/) తనిఖీ చేయండి.

#### మెటామాస్క్‌ను డౌన్‌లోడ్ చేయండి {#download-metamask}

మీరు [ఇక్కడ](https://metamask.io/download) ఉచితంగా మెటామాస్క్ ఖాతాను డౌన్‌లోడ్ చేసుకోవచ్చు మరియు సృష్టించవచ్చు. మీరు ఖాతాను సృష్టిస్తున్నప్పుడు లేదా మీకు ఇప్పటికే ఖాతా ఉంటే, ఎగువ కుడివైపున ఉన్న “Goerli Test Network”కి మారాలని నిర్ధారించుకోండి (తద్వారా మేము నిజమైన డబ్బుతో వ్యవహరించము).

#### ఫాసెట్ నుండి ఈథర్‌ను జోడించండి {#add-ether-from-a-faucet}

ఎథీరియం బ్లాక్‌చైన్‌లో లావాదేవీపై సంతకం చేయడానికి, మాకు కొంత నకిలీ Eth అవసరం. Ethని పొందడానికి మీరు [FaucETH](https://fauceth.komputing.org)కి వెళ్లి మీ Goerli ఖాతా చిరునామాను నమోదు చేయవచ్చు, “Request funds” క్లిక్ చేయండి, ఆపై డ్రాప్‌డౌన్‌లో “Ethereum Testnet Goerli”ని ఎంచుకుని, చివరగా మళ్లీ “Request funds” బటన్‌ను క్లిక్ చేయండి. ఆ తర్వాత కొద్దిసేపటికే మీరు మీ మెటామాస్క్ ఖాతాలో Ethని చూడాలి!

#### మీ బ్యాలెన్స్‌ని తనిఖీ చేయండి {#check-your-balance}

మా బ్యాలెన్స్ అక్కడ ఉందో లేదో ఒకటికి రెండుసార్లు తనిఖీ చేయడానికి, [Alchemy యొక్క కంపోజర్ టూల్](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)ని ఉపయోగించి [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) అభ్యర్థనను చేద్దాం. ఇది మా వాలెట్‌లోని Eth మొత్తాన్ని తిరిగి ఇస్తుంది. మీరు మీ మెటామాస్క్ ఖాతా చిరునామాను ఇన్‌పుట్ చేసి, “Send Request” క్లిక్ చేసిన తర్వాత, మీరు ఇలాంటి ప్రతిస్పందనను చూడాలి:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**గమనిక:** ఈ ఫలితం weiలో ఉంది ethలో కాదు. Wei అనేది ఈథర్ యొక్క అతిచిన్న డినామినేషన్‌గా ఉపయోగించబడుతుంది. wei నుండి ethకి మార్పిడి: 1 eth = 10¹⁸ wei. కాబట్టి మనం 0xde0b6b3a7640000ని దశాంశానికి (decimal) మార్చినట్లయితే మనకు 1\*10¹⁸ వస్తుంది, ఇది 1 ethకి సమానం.

అమ్మయ్య! మా నకిలీ డబ్బు అంతా అక్కడే ఉంది! 🤑

### దశ 5: మీ UIకి మెటామాస్క్‌ను కనెక్ట్ చేయండి {#step-5-connect-metamask-to-your-ui}

ఇప్పుడు మా మెటామాస్క్ వాలెట్ సెటప్ చేయబడినందున, మా dappని దానికి కనెక్ట్ చేద్దాం!

#### `connectWallet` ఫంక్షన్ {#the-connectwallet-function}

మా `interact.js` ఫైల్‌లో, `connectWallet` ఫంక్షన్‌ను అమలు చేద్దాం, ఆపై దాన్ని మా `HelloWorld.js` కాంపోనెంట్‌లో కాల్ చేయవచ్చు.

`connectWallet`ని ఈ క్రింది వాటికి సవరిద్దాం:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

కాబట్టి ఈ పెద్ద కోడ్ బ్లాక్ ఖచ్చితంగా ఏమి చేస్తుంది?

సరే, ముందుగా, ఇది మీ బ్రౌజర్‌లో `window.ethereum` ప్రారంభించబడిందో లేదో తనిఖీ చేస్తుంది.

`window.ethereum` అనేది మెటామాస్క్ మరియు ఇతర వాలెట్ ప్రొవైడర్ల ద్వారా ఇంజెక్ట్ చేయబడిన గ్లోబల్ API, ఇది వినియోగదారుల ఎథీరియం ఖాతాలను అభ్యర్థించడానికి వెబ్‌సైట్‌లను అనుమతిస్తుంది. ఆమోదించబడితే, ఇది వినియోగదారు కనెక్ట్ చేయబడిన బ్లాక్‌చైన్‌ల నుండి డేటాను చదవగలదు మరియు సందేశాలు మరియు లావాదేవీలపై సంతకం చేయమని వినియోగదారుకు సూచించగలదు. మరింత సమాచారం కోసం [మెటామాస్క్ డాక్స్](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)ని తనిఖీ చేయండి!

`window.ethereum` _లేకపోతే_, మెటామాస్క్ ఇన్‌స్టాల్ చేయబడలేదని అర్థం. దీని ఫలితంగా JSON ఆబ్జెక్ట్ తిరిగి వస్తుంది, ఇక్కడ తిరిగి వచ్చిన `address` ఖాళీ స్ట్రింగ్, మరియు `status` JSX ఆబ్జెక్ట్ వినియోగదారు తప్పనిసరిగా మెటామాస్క్‌ను ఇన్‌స్టాల్ చేయాలని తెలియజేస్తుంది.

ఇప్పుడు `window.ethereum` _ఉంటే_, అప్పుడే విషయాలు ఆసక్తికరంగా మారుతాయి.

try/catch లూప్‌ని ఉపయోగించి, మేము [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)ని కాల్ చేయడం ద్వారా మెటామాస్క్‌కి కనెక్ట్ చేయడానికి ప్రయత్నిస్తాము. ఈ ఫంక్షన్‌ను కాల్ చేయడం వల్ల బ్రౌజర్‌లో మెటామాస్క్ తెరవబడుతుంది, తద్వారా వినియోగదారు వారి వాలెట్‌ను మీ dappకి కనెక్ట్ చేయమని ప్రాంప్ట్ చేయబడతారు.

- వినియోగదారు కనెక్ట్ చేయడానికి ఎంచుకుంటే, `method: "eth_requestAccounts"` dappకి కనెక్ట్ చేయబడిన వినియోగదారు ఖాతా చిరునామాలన్నింటినీ కలిగి ఉన్న శ్రేణిని తిరిగి ఇస్తుంది. మొత్తంగా, మా `connectWallet` ఫంక్షన్ ఈ శ్రేణిలోని _మొదటి_ `address` (లైన్ 9 చూడండి) మరియు స్మార్ట్ కాంట్రాక్ట్‌కు సందేశాన్ని వ్రాయమని వినియోగదారుని ప్రాంప్ట్ చేసే `status` సందేశాన్ని కలిగి ఉన్న JSON ఆబ్జెక్ట్‌ను తిరిగి ఇస్తుంది.
- వినియోగదారు కనెక్షన్‌ను తిరస్కరిస్తే, JSON ఆబ్జెక్ట్ తిరిగి వచ్చిన `address` కోసం ఖాళీ స్ట్రింగ్‌ను మరియు వినియోగదారు కనెక్షన్‌ను తిరస్కరించారని ప్రతిబింబించే `status` సందేశాన్ని కలిగి ఉంటుంది.

ఇప్పుడు మేము ఈ `connectWallet` ఫంక్షన్‌ను వ్రాసాము కాబట్టి, తదుపరి దశ దానిని మా `HelloWorld.js` కాంపోనెంట్‌కి కాల్ చేయడం.

#### మీ `HelloWorld.js` UI కాంపోనెంట్‌కి `connectWallet` ఫంక్షన్‌ను జోడించండి {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

`HelloWorld.js`లోని `connectWalletPressed` ఫంక్షన్‌కి నావిగేట్ చేయండి మరియు దాన్ని ఈ క్రింది వాటికి అప్‌డేట్ చేయండి:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

మా కార్యాచరణలో ఎక్కువ భాగం `interact.js` ఫైల్ నుండి మా `HelloWorld.js` కాంపోనెంట్ నుండి ఎలా సంగ్రహించబడిందో గమనించారా? మేము M-V-C నమూనాకు కట్టుబడి ఉండటమే దీనికి కారణం!

`connectWalletPressed`లో, మేము మా దిగుమతి చేయబడిన `connectWallet` ఫంక్షన్‌కి కేవలం await కాల్ చేస్తాము మరియు దాని ప్రతిస్పందనను ఉపయోగించి, మేము మా `status` మరియు `walletAddress` వేరియబుల్స్‌ను వాటి స్థితి హుక్స్ ద్వారా అప్‌డేట్ చేస్తాము.

ఇప్పుడు, రెండు ఫైల్‌లను (`HelloWorld.js` మరియు `interact.js`) సేవ్ చేద్దాం మరియు ఇప్పటివరకు మా UIని పరీక్షిద్దాం.

[http://localhost:3000/](http://localhost:3000/) పేజీలో మీ బ్రౌజర్‌ను తెరవండి మరియు పేజీ ఎగువ కుడివైపున ఉన్న "Connect Wallet" బటన్‌ను నొక్కండి.

మీరు మెటామాస్క్‌ను ఇన్‌స్టాల్ చేసి ఉంటే, మీ వాలెట్‌ను మీ dappకి కనెక్ట్ చేయమని మిమ్మల్ని ప్రాంప్ట్ చేయాలి. కనెక్ట్ చేయడానికి ఆహ్వానాన్ని అంగీకరించండి.

వాలెట్ బటన్ ఇప్పుడు మీ చిరునామా కనెక్ట్ చేయబడిందని ప్రతిబింబించడాన్ని మీరు చూడాలి! అద్భుతం 🔥

తర్వాత, పేజీని రిఫ్రెష్ చేయడానికి ప్రయత్నించండి... ఇది వింతగా ఉంది. మా వాలెట్ బటన్ ఇప్పటికే కనెక్ట్ చేయబడినప్పటికీ, మెటామాస్క్‌ను కనెక్ట్ చేయమని మమ్మల్ని ప్రాంప్ట్ చేస్తోంది...

అయితే, భయపడవద్దు! `getCurrentWalletConnected`ని అమలు చేయడం ద్వారా మేము దానిని సులభంగా పరిష్కరించగలము, ఇది చిరునామా ఇప్పటికే మా dappకి కనెక్ట్ చేయబడిందో లేదో తనిఖీ చేస్తుంది మరియు తదనుగుణంగా మా UIని అప్‌డేట్ చేస్తుంది!

#### `getCurrentWalletConnected` ఫంక్షన్ {#the-getcurrentwalletconnected-function}

`interact.js` ఫైల్‌లోని మీ `getCurrentWalletConnected` ఫంక్షన్‌ను ఈ క్రింది వాటికి అప్‌డేట్ చేయండి:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

ఈ కోడ్ మునుపటి దశలో మనం వ్రాసిన `connectWallet` ఫంక్షన్‌కి _చాలా_ పోలి ఉంటుంది.

ప్రధాన వ్యత్యాసం ఏమిటంటే, వినియోగదారు వారి వాలెట్‌ను కనెక్ట్ చేయడానికి మెటామాస్క్‌ను తెరిచే `eth_requestAccounts` పద్ధతిని కాల్ చేయడానికి బదులుగా, ఇక్కడ మేము `eth_accounts` పద్ధతిని కాల్ చేస్తాము, ఇది ప్రస్తుతం మా dappకి కనెక్ట్ చేయబడిన మెటామాస్క్ చిరునామాలను కలిగి ఉన్న శ్రేణిని తిరిగి ఇస్తుంది.

ఈ ఫంక్షన్ చర్యలో చూడటానికి, మా `HelloWorld.js` కాంపోనెంట్ యొక్క మా `useEffect` ఫంక్షన్‌లో దాన్ని కాల్ చేద్దాం:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

గమనించండి, మా `walletAddress` మరియు `status` స్థితి వేరియబుల్స్‌ను అప్‌డేట్ చేయడానికి మేము `getCurrentWalletConnected`కి మా కాల్ యొక్క ప్రతిస్పందనను ఉపయోగిస్తాము.

ఇప్పుడు మీరు ఈ కోడ్‌ని జోడించారు కాబట్టి, మా బ్రౌజర్ విండోను రిఫ్రెష్ చేయడానికి ప్రయత్నిద్దాం.

అద్భుతం! బటన్ మీరు కనెక్ట్ చేయబడ్డారని చెప్పాలి మరియు మీరు రిఫ్రెష్ చేసిన తర్వాత కూడా - మీ కనెక్ట్ చేయబడిన వాలెట్ చిరునామా యొక్క ప్రివ్యూను చూపాలి!

#### `addWalletListener`ని అమలు చేయండి {#implement-addwalletlistener}

మా dapp వాలెట్ సెటప్‌లో చివరి దశ వాలెట్ లిజనర్‌ను అమలు చేయడం, తద్వారా వినియోగదారు డిస్‌కనెక్ట్ చేసినప్పుడు లేదా ఖాతాలను మార్చినప్పుడు వంటి మా వాలెట్ స్థితి మారినప్పుడు మా UI అప్‌డేట్ అవుతుంది.

మీ `HelloWorld.js` ఫైల్‌లో, మీ `addWalletListener` ఫంక్షన్‌ను ఈ క్రింది విధంగా సవరించండి:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

ఈ సమయంలో ఇక్కడ ఏమి జరుగుతుందో అర్థం చేసుకోవడానికి మీకు మా సహాయం కూడా అవసరం లేదని నేను పందెం వేస్తున్నాను, కానీ సమగ్రత ప్రయోజనాల కోసం, దాన్ని త్వరగా విచ్ఛిన్నం చేద్దాం:

- ముందుగా, మా ఫంక్షన్ `window.ethereum` ప్రారంభించబడిందో లేదో తనిఖీ చేస్తుంది (అంటే, మెటామాస్క్ ఇన్‌స్టాల్ చేయబడింది).
  - అది లేకపోతే, మేము మా `status` స్థితి వేరియబుల్‌ను మెటామాస్క్‌ను ఇన్‌స్టాల్ చేయమని వినియోగదారుని ప్రాంప్ట్ చేసే JSX స్ట్రింగ్‌కి సెట్ చేస్తాము.
  - ఇది ప్రారంభించబడితే, మేము లైన్ 3లో `window.ethereum.on("accountsChanged")` లిజనర్‌ను సెటప్ చేస్తాము, ఇది మెటామాస్క్ వాలెట్‌లోని స్థితి మార్పుల కోసం వింటుంది, ఇందులో వినియోగదారు dappకి అదనపు ఖాతాను కనెక్ట్ చేసినప్పుడు, ఖాతాలను మార్చినప్పుడు లేదా ఖాతాను డిస్‌కనెక్ట్ చేసినప్పుడు ఉంటాయి. కనీసం ఒక ఖాతా కనెక్ట్ చేయబడి ఉంటే, `walletAddress` స్థితి వేరియబుల్ లిజనర్ ద్వారా తిరిగి వచ్చిన `accounts` శ్రేణిలోని మొదటి ఖాతాగా అప్‌డేట్ చేయబడుతుంది. లేకపోతే, `walletAddress` ఖాళీ స్ట్రింగ్‌గా సెట్ చేయబడుతుంది.

చివరిది కానీ, మేము దానిని మా `useEffect` ఫంక్షన్‌లో కాల్ చేయాలి:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

అంతే! మేము మా వాలెట్ కార్యాచరణ అంతటినీ విజయవంతంగా ప్రోగ్రామింగ్ పూర్తి చేసాము! ఇప్పుడు మా చివరి పనికి: మా స్మార్ట్ కాంట్రాక్ట్‌లో నిల్వ చేయబడిన సందేశాన్ని అప్‌డేట్ చేయడం!

### దశ 6: `updateMessage` ఫంక్షన్‌ను అమలు చేయండి {#step-6-implement-the-updatemessage-function}

సరే మిత్రులారా, మేము చివరి దశకు చేరుకున్నాము! మీ `interact.js` ఫైల్ యొక్క `updateMessage`లో, మేము ఈ క్రింది వాటిని చేయబోతున్నాము:

1. మా స్మార్ట్ కాంట్రాక్ట్‌లో మేము ప్రచురించాలనుకుంటున్న సందేశం చెల్లుబాటు అయ్యేలా చూసుకోండి
2. మెటామాస్క్ ఉపయోగించి మా లావాదేవీపై సంతకం చేయండి
3. మా `HelloWorld.js` ఫ్రంటెండ్ కాంపోనెంట్ నుండి ఈ ఫంక్షన్‌ను కాల్ చేయండి

దీనికి ఎక్కువ సమయం పట్టదు; ఈ dappని పూర్తి చేద్దాం!

#### ఇన్‌పుట్ ఎర్రర్ హ్యాండ్లింగ్ {#input-error-handling}

సహజంగానే, ఫంక్షన్ ప్రారంభంలో ఒక రకమైన ఇన్‌పుట్ ఎర్రర్ హ్యాండ్లింగ్ ఉండటం సమంజసం.

మెటామాస్క్ ఎక్స్‌టెన్షన్ ఇన్‌స్టాల్ చేయబడకపోతే, వాలెట్ కనెక్ట్ చేయబడకపోతే (అంటే, పంపబడిన `address` ఖాళీ స్ట్రింగ్), లేదా `message` ఖాళీ స్ట్రింగ్ అయితే మా ఫంక్షన్ ముందుగానే తిరిగి రావాలని మేము కోరుకుంటున్నాము. `updateMessage`కి ఈ క్రింది ఎర్రర్ హ్యాండ్లింగ్‌ని జోడిద్దాం:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

ఇప్పుడు దానికి సరైన ఇన్‌పుట్ ఎర్రర్ హ్యాండ్లింగ్ ఉన్నందున, మెటామాస్క్ ద్వారా లావాదేవీపై సంతకం చేయడానికి ఇది సమయం!

#### మా లావాదేవీపై సంతకం చేయడం {#signing-our-transaction}

మీరు ఇప్పటికే సాంప్రదాయ web3 ఎథీరియం లావాదేవీలతో సౌకర్యవంతంగా ఉంటే, మేము తర్వాత వ్రాసే కోడ్ చాలా సుపరిచితం. మీ ఇన్‌పుట్ ఎర్రర్ హ్యాండ్లింగ్ కోడ్ క్రింద, `updateMessage`కి ఈ క్రింది వాటిని జోడించండి:

```javascript
// interact.js

//లావాదేవీ పారామితులను సెటప్ చేయండి
const transactionParameters = {
  to: contractAddress, // కాంట్రాక్ట్ పబ్లికేషన్స్ సమయంలో మినహా అవసరం.
  from: address, // వినియోగదారు యొక్క క్రియాశీల చిరునామాతో సరిపోలాలి.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//లావాదేవీపై సంతకం చేయండి
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

ఏమి జరుగుతుందో విచ్ఛిన్నం చేద్దాం. ముందుగా, మేము మా లావాదేవీల పారామితులను సెటప్ చేస్తాము, ఇక్కడ:

- `to` గ్రహీత చిరునామాను (మా స్మార్ట్ కాంట్రాక్ట్) నిర్దేశిస్తుంది
- `from` లావాదేవీపై సంతకం చేసేవారిని నిర్దేశిస్తుంది, మేము మా ఫంక్షన్‌లోకి పంపిన `address` వేరియబుల్
- `data` మా Hello World స్మార్ట్ కాంట్రాక్ట్ యొక్క `update` పద్ధతికి కాల్‌ను కలిగి ఉంటుంది, మా `message` స్ట్రింగ్ వేరియబుల్‌ను ఇన్‌పుట్‌గా స్వీకరిస్తుంది

తర్వాత, మేము `window.ethereum.request` అనే await కాల్ చేస్తాము, ఇక్కడ లావాదేవీపై సంతకం చేయమని మేము మెటామాస్క్‌ని అడుగుతాము. గమనించండి, 11 మరియు 12 లైన్లలో, మేము మా eth పద్ధతిని, `eth_sendTransaction`ని నిర్దేశిస్తున్నాము మరియు మా `transactionParameters`ని పంపుతున్నాము.

ఈ సమయంలో, బ్రౌజర్‌లో మెటామాస్క్ తెరవబడుతుంది మరియు లావాదేవీపై సంతకం చేయడానికి లేదా తిరస్కరించడానికి వినియోగదారుని ప్రాంప్ట్ చేస్తుంది.

- లావాదేవీ విజయవంతమైతే, ఫంక్షన్ JSON ఆబ్జెక్ట్‌ను తిరిగి ఇస్తుంది, ఇక్కడ `status` JSX స్ట్రింగ్ వినియోగదారుని వారి లావాదేవీ గురించి మరింత సమాచారం కోసం Etherscanని తనిఖీ చేయమని ప్రాంప్ట్ చేస్తుంది.
- లావాదేవీ విఫలమైతే, ఫంక్షన్ JSON ఆబ్జెక్ట్‌ను తిరిగి ఇస్తుంది, ఇక్కడ `status` స్ట్రింగ్ ఎర్రర్ సందేశాన్ని తెలియజేస్తుంది.

మొత్తంగా, మా `updateMessage` ఫంక్షన్ ఇలా ఉండాలి:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //ఇన్‌పుట్ ఎర్రర్ హ్యాండ్లింగ్
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //లావాదేవీ పారామితులను సెటప్ చేయండి
  const transactionParameters = {
    to: contractAddress, // కాంట్రాక్ట్ పబ్లికేషన్స్ సమయంలో మినహా అవసరం.
    from: address, // వినియోగదారు యొక్క క్రియాశీల చిరునామాతో సరిపోలాలి.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //లావాదేవీపై సంతకం చేయండి
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

చివరిది కానీ, మేము మా `updateMessage` ఫంక్షన్‌ను మా `HelloWorld.js` కాంపోనెంట్‌కి కనెక్ట్ చేయాలి.

#### `updateMessage`ని `HelloWorld.js` ఫ్రంటెండ్‌కి కనెక్ట్ చేయండి {#connect-updatemessage-to-the-helloworld-js-frontend}

మా `onUpdatePressed` ఫంక్షన్ దిగుమతి చేయబడిన `updateMessage` ఫంక్షన్‌కి await కాల్ చేయాలి మరియు మా లావాదేవీ విజయవంతమైందా లేదా విఫలమైందా అని ప్రతిబింబించేలా `status` స్థితి వేరియబుల్‌ను సవరించాలి:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

ఇది చాలా శుభ్రంగా మరియు సరళంగా ఉంటుంది. మరియు ఊహించండి... మీ DAPP పూర్తయింది!!!

ముందుకు సాగండి మరియు **Update** బటన్‌ను పరీక్షించండి!

### మీ స్వంత కస్టమ్ dappని తయారు చేయండి {#make-your-own-custom-dapp}

వావ్, మీరు ట్యుటోరియల్ ముగింపుకు చేరుకున్నారు! సంగ్రహంగా చెప్పాలంటే, మీరు వీటిని ఎలా చేయాలో నేర్చుకున్నారు:

- మీ dapp ప్రాజెక్ట్‌కి మెటామాస్క్ వాలెట్‌ను కనెక్ట్ చేయడం
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) APIని ఉపయోగించి మీ స్మార్ట్ కాంట్రాక్ట్ నుండి డేటాను చదవడం
- మెటామాస్క్ ఉపయోగించి ఎథీరియం లావాదేవీలపై సంతకం చేయడం

ఇప్పుడు మీరు మీ స్వంత కస్టమ్ dapp ప్రాజెక్ట్‌ను రూపొందించడానికి ఈ ట్యుటోరియల్ నుండి నైపుణ్యాలను వర్తింపజేయడానికి పూర్తిగా సన్నద్ధమయ్యారు! ఎప్పటిలాగే, మీకు ఏవైనా ప్రశ్నలు ఉంటే, [Alchemy డిస్కార్డ్](https://discord.gg/gWuC7zB)లో సహాయం కోసం మమ్మల్ని సంప్రదించడానికి వెనుకాడకండి. 🧙‍♂️

మీరు ఈ ట్యుటోరియల్‌ని పూర్తి చేసిన తర్వాత, ట్విట్టర్ [@alchemyplatform](https://twitter.com/AlchemyPlatform)లో మమ్మల్ని ట్యాగ్ చేయడం ద్వారా మీ అనుభవం ఎలా ఉందో లేదా మీకు ఏదైనా ఫీడ్‌బ్యాక్ ఉంటే మాకు తెలియజేయండి!