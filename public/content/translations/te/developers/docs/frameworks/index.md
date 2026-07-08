---
title: "Dapp డెవలప్‌మెంట్ ఫ్రేమ్‌వర్క్‌లు"
description: "ఫ్రేమ్‌వర్క్‌ల ప్రయోజనాలను అన్వేషించండి మరియు అందుబాటులో ఉన్న ఎంపికలను సరిపోల్చండి."
lang: te
---

## ఫ్రేమ్‌వర్క్‌ల పరిచయం {#introduction-to-frameworks}

పూర్తి స్థాయి వికేంద్రీకృత అప్లికేషన్ (dapp)ను నిర్మించడానికి వివిధ రకాల సాంకేతికతలు అవసరం. సాఫ్ట్‌వేర్ ఫ్రేమ్‌వర్క్‌లు అవసరమైన అనేక ఫీచర్లను కలిగి ఉంటాయి లేదా మీకు కావలసిన సాధనాలను ఎంచుకోవడానికి సులభమైన ప్లగిన్ సిస్టమ్‌లను అందిస్తాయి.

ఫ్రేమ్‌వర్క్‌లు డిఫాల్ట్‌గా (out-of-the-box) అనేక ఫంక్షనాలిటీలతో వస్తాయి, అవి:

- స్థానిక బ్లాక్‌చైన్ ఇన్‌స్టాన్స్‌ను ప్రారంభించడానికి ఫీచర్లు.
- మీ స్మార్ట్ కాంట్రాక్ట్‌లను కంపైల్ చేయడానికి మరియు పరీక్షించడానికి యుటిలిటీలు.
- ఒకే ప్రాజెక్ట్/రిపోజిటరీలో మీ యూజర్-ఫేసింగ్ అప్లికేషన్‌ను నిర్మించడానికి క్లయింట్ డెవలప్‌మెంట్ యాడ్-ఆన్‌లు.
- ఎథీరియం నెట్‌వర్క్‌లకు కనెక్ట్ అవ్వడానికి మరియు కాంట్రాక్ట్‌లను డిప్లాయ్ చేయడానికి కాన్ఫిగరేషన్, అది స్థానికంగా రన్ అవుతున్న ఇన్‌స్టాన్స్ అయినా లేదా ఎథీరియం పబ్లిక్ నెట్‌వర్క్‌లలో ఒకటైనా.
- వికేంద్రీకృత యాప్ పంపిణీ - IPFS వంటి స్టోరేజ్ ఎంపికలతో ఇంటిగ్రేషన్‌లు.

## ముందస్తు అవసరాలు {#prerequisites}

ఫ్రేమ్‌వర్క్‌లలోకి ప్రవేశించే ముందు, మీరు ముందుగా [dapps](/developers/docs/dapps/) మరియు [ఎథీరియం స్టాక్](/developers/docs/ethereum-stack/) గురించిన మా పరిచయాన్ని చదవాలని మేము సిఫార్సు చేస్తున్నాము.

## అందుబాటులో ఉన్న ఫ్రేమ్‌వర్క్‌లు {#available-frameworks}

**Foundry** - **_Foundry అనేది ఎథీరియం అప్లికేషన్ డెవలప్‌మెంట్ కోసం అత్యంత వేగవంతమైన, పోర్టబుల్ మరియు మాడ్యులర్ టూల్‌కిట్_**

- [Foundryని ఇన్‌స్టాల్ చేయండి](https://book.getfoundry.sh/)
- [Foundry పుస్తకం](https://book.getfoundry.sh/)
- [టెలిగ్రామ్‌లో Foundry కమ్యూనిటీ చాట్](https://t.me/foundry_support)
- [ఆసమ్ Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_ప్రొఫెషనల్స్ కోసం ఎథీరియం డెవలప్‌మెంట్ వాతావరణం._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Python డెవలపర్లు, డేటా సైంటిస్ట్‌లు మరియు సెక్యూరిటీ ప్రొఫెషనల్స్ కోసం స్మార్ట్ కాంట్రాక్ట్ డెవలప్‌మెంట్ టూల్._**

- [డాక్యుమెంటేషన్](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVMలో బ్లాక్‌చైన్ అప్లికేషన్‌లను డెవలప్ చేయడానికి ఒక ప్లాట్‌ఫారమ్._**

- [హోమ్‌పేజీ](https://www.web3labs.com/web3j-sdk)
- [డాక్యుమెంటేషన్](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVM-ఆధారిత బ్లాక్‌చైన్‌ల కోసం అసమాన (Async), అధిక-పనితీరు గల Kotlin/Java/Android లైబ్రరీ._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [ఉదాహరణలు](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [డిస్కార్డ్](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_ఒకే కమాండ్‌తో ఎథీరియం-ఆధారిత యాప్‌లను సృష్టించండి. ఎంచుకోవడానికి విస్తృతమైన UI ఫ్రేమ్‌వర్క్‌లు మరియు వికేంద్రీకృత ఫైనాన్స్ (DeFi) టెంప్లేట్‌లతో వస్తుంది._**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [టెంప్లేట్‌లు](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Web3 కోసం Ethers.js + Hardhat + React కాంపోనెంట్‌లు మరియు హుక్స్: స్మార్ట్ కాంట్రాక్ట్‌ల ద్వారా ఆధారితమైన వికేంద్రీకృత అప్లికేషన్‌లను నిర్మించడం ప్రారంభించడానికి మీకు కావలసినవన్నీ._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_బ్లాక్‌చైన్ డెవలపర్‌లు స్మార్ట్ కాంట్రాక్ట్‌లను నిర్మించడానికి, పరీక్షించడానికి, డీబగ్ చేయడానికి, పర్యవేక్షించడానికి మరియు ఆపరేట్ చేయడానికి మరియు dapp UXని మెరుగుపరచడానికి వీలు కల్పించే Web3 డెవలప్‌మెంట్ ప్లాట్‌ఫారమ్._**

- [వెబ్‌సైట్](https://tenderly.co/)
- [డాక్యుమెంటేషన్](https://docs.tenderly.co/)

**The Graph -** **_బ్లాక్‌చైన్ డేటాను సమర్థవంతంగా క్వెరీ చేయడానికి The Graph._**

- [వెబ్‌సైట్](https://thegraph.com/)
- [ట్యుటోరియల్](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_ఎథీరియం డెవలప్‌మెంట్ ప్లాట్‌ఫారమ్._**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [డిస్కార్డ్](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_ఎథీరియం డెవలప్‌మెంట్ ప్లాట్‌ఫారమ్._**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [డిస్కార్డ్](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_మా శక్తివంతమైన SDKలు మరియు CLIని ఉపయోగించి మీ స్మార్ట్ కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వగల Web3 అప్లికేషన్‌లను నిర్మించండి._**

- [డాక్యుమెంటేషన్](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (ఎథీరియం మరియు ఇతర) డెవలప్‌మెంట్ ప్లాట్‌ఫారమ్._**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [డిస్కార్డ్](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_ఎంటర్‌ప్రైజ్-గ్రేడ్ Web3 డెవలప్‌మెంట్ ప్లాట్‌ఫారమ్, ఇది అన్ని ప్రధాన చైన్‌లు EVM చైన్‌లు (మరియు ఇతర వాటిపై) NFT అప్లికేషన్‌లను నిర్మించడానికి మిమ్మల్ని అనుమతిస్తుంది._**

- [వెబ్‌సైట్](https://www.crossmint.com)
- [డాక్యుమెంటేషన్](https://docs.crossmint.com)
- [డిస్కార్డ్](https://discord.com/invite/crossmint)

**Brownie -** **_Python-ఆధారిత డెవలప్‌మెంట్ వాతావరణం మరియు టెస్టింగ్ ఫ్రేమ్‌వర్క్._**

- [డాక్యుమెంటేషన్](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie ప్రస్తుతం నిర్వహించబడటం లేదు**

**ఓపెన్‌జెప్పెలిన్ SDK -** **_అల్టిమేట్ స్మార్ట్ కాంట్రాక్ట్ టూల్‌కిట్: స్మార్ట్ కాంట్రాక్ట్‌లను డెవలప్ చేయడానికి, కంపైల్ చేయడానికి, అప్‌గ్రేడ్ చేయడానికి, డిప్లాయ్ చేయడానికి మరియు వాటితో ఇంటరాక్ట్ అవ్వడానికి మీకు సహాయపడే సాధనాల సూట్._**

- [ఓపెన్‌జెప్పెలిన్ డిఫెండర్ SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [కమ్యూనిటీ ఫోరమ్](https://forum.openzeppelin.com/c/support/17)
- **ఓపెన్‌జెప్పెలిన్ SDK డెవలప్‌మెంట్ ముగిసింది**

**Catapulta -** **_మల్టీ-చైన్ స్మార్ట్ కాంట్రాక్ట్‌ల డిప్లాయ్‌మెంట్ టూల్, బ్లాక్ ఎక్స్‌ప్లోరర్‌లలో వెరిఫికేషన్‌లను ఆటోమేట్ చేస్తుంది, డిప్లాయ్ చేయబడిన స్మార్ట్ కాంట్రాక్ట్‌లను ట్రాక్ చేస్తుంది మరియు డిప్లాయ్‌మెంట్ నివేదికలను షేర్ చేస్తుంది, Foundry మరియు Hardhat ప్రాజెక్ట్‌ల కోసం ప్లగ్-ఎన్-ప్లే._**

- [GitHub](https://github.com/catapulta-sh)

**GoldRush (Covalent ద్వారా ఆధారితం) -** **_GoldRush డెవలపర్‌లు, విశ్లేషకులు మరియు ఎంటర్‌ప్రైజ్‌ల కోసం అత్యంత సమగ్రమైన బ్లాక్‌చైన్ డేటా API సూట్‌ను అందిస్తుంది. మీరు వికేంద్రీకృత ఫైనాన్స్ (DeFi) డ్యాష్‌బోర్డ్, వాలెట్, ట్రేడింగ్ బాట్, కృత్రిమ మేధ ఏజెంట్ లేదా కంప్లయన్స్ ప్లాట్‌ఫారమ్‌ను నిర్మిస్తున్నా, డేటా APIలు మీకు అవసరమైన ముఖ్యమైన ఆన్‌చైన్ డేటాకు వేగవంతమైన, ఖచ్చితమైన మరియు డెవలపర్-స్నేహపూర్వక యాక్సెస్‌ను అందిస్తాయి_**

- [వెబ్‌సైట్](https://goldrush.dev/)
- [డాక్యుమెంటేషన్](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [డిస్కార్డ్](https://www.covalenthq.com/discord/)

**Wake -** **_కాంట్రాక్ట్‌ల టెస్టింగ్, ఫజ్జింగ్, డిప్లాయ్‌మెంట్, వల్నరబిలిటీ స్కానింగ్ మరియు కోడ్ నావిగేషన్ కోసం ఆల్-ఇన్-వన్ Python ఫ్రేమ్‌వర్క్._**

- [హోమ్‌పేజీ](https://getwake.io/)
- [డాక్యుమెంటేషన్](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code ఎక్స్‌టెన్షన్](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_వికేంద్రీకృత అప్లికేషన్ డెవలపర్‌లు తమ అప్లికేషన్‌లలో వికేంద్రీకృత గుర్తింపులు మరియు ధృవీకరించదగిన ఆధారాలను (verifiable credentials) నిర్మించడాన్ని సులభతరం చేసే ఓపెన్ సోర్స్, మాడ్యులర్ మరియు అజ్ఞేయ (agnostic) ఫ్రేమ్‌వర్క్._**

- [హోమ్‌పేజీ](https://veramo.io/)
- [డాక్యుమెంటేషన్](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [డిస్కార్డ్](https://discord.com/invite/FRRBdjemHV)
- [NPM ప్యాకేజీ](https://www.npmjs.com/package/@veramo/core)

## మరింత చదవడానికి {#further-reading}

_మీకు సహాయపడిన కమ్యూనిటీ వనరు గురించి తెలుసా? ఈ పేజీని సవరించి, దాన్ని జోడించండి!_

## సంబంధిత అంశాలు {#related-topics}

- [స్థానిక డెవలప్‌మెంట్ వాతావరణాన్ని సెటప్ చేయండి](/developers/local-environment/)

## ట్యుటోరియల్స్: ఎథీరియంలో డెవలప్‌మెంట్ ఫ్రేమ్‌వర్క్‌లు {#tutorials}

- [ప్రారంభకుల కోసం హలో వరల్డ్ స్మార్ట్ కాంట్రాక్ట్ – ఫుల్‌స్టాక్](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Hardhatని ఉపయోగించి హలో వరల్డ్ స్మార్ట్ కాంట్రాక్ట్‌ను నిర్మించి, డిప్లాయ్ చేయండి, ఆపై దాన్ని ఫ్రంటెండ్‌కి కనెక్ట్ చేయండి._