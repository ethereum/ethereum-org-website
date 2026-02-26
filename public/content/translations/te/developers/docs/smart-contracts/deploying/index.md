---
title: "స్మార్ట్ కాంట్రాక్టులను అమలు చేయడం"
description: "అవసరాలు, ఉపకరణాలు, మరియు అమరిక దశలతో సహా Ethereum నెట్‌వర్క్‌లకు స్మార్ట్ కాంట్రాక్టులను ఎలా అమర్చాలో తెలుసుకోండి."
lang: te
---

ఇతీరియం నెట్‌వర్క్ వినియోగదారులకు అందుబాటులో ఉండటానికి మీ స్మార్ట్ కాంట్రాక్టును మీరు అమర్చాలి.

ఒక స్మార్ట్ కాంట్రాక్టును అమర్చడానికి, మీరు ఏ గ్రహీతను పేర్కొనకుండా ఆ స్మార్ట్ కాంట్రాక్టు యొక్క కంపైల్ చేసిన కోడ్‌ని కలిగి ఉన్న ఒక ఇతీరియం లావాదేవీని పంపితే చాలు.

## అవసరాలు {#prerequisites}

స్మార్ట్ కాంట్రాక్టులను అమర్చడానికి ముందు మీరు [ఇతీరియం నెట్‌వర్క్‌లు](/developers/docs/networks/), [లావాదేవీలు](/developers/docs/transactions/) మరియు [స్మార్ట్ కాంట్రాక్టుల అనాటమీ](/developers/docs/smart-contracts/anatomy/)ని అర్థం చేసుకోవాలి.

ఒక కాంట్రాక్టును అమర్చడానికి ఈథర్ (ETH) కూడా ఖర్చవుతుంది, ఎందుకంటే అవి బ్లాక్‌చైన్‌లో నిల్వ చేయబడతాయి, కాబట్టి మీరు ఇతీరియంపై [గ్యాస్ మరియు ఫీజులు](/developers/docs/gas/) గురించి తెలిసి ఉండాలి.

చివరగా, మీ కాంట్రాక్టును అమర్చడానికి ముందు దాన్ని కంపైల్ చేయాలి, కాబట్టి మీరు [స్మార్ట్ కాంట్రాక్టులను కంపైల్ చేయడం](/developers/docs/smart-contracts/compiling/) గురించి చదివారని నిర్ధారించుకోండి.

## ఒక స్మార్ట్ కాంట్రాక్టును ఎలా అమర్చాలి {#how-to-deploy-a-smart-contract}

### మీకు ఏమి అవసరం {#what-youll-need}

- మీ కాంట్రాక్ట్ బైట్‌కోడ్ – ఇది [కంపైలేషన్](/developers/docs/smart-contracts/compiling/) ద్వారా ఉత్పత్తి చేయబడుతుంది
- గ్యాస్ కోసం ETH – మీరు ఇతర లావాదేవీల వలె మీ గ్యాస్ పరిమితిని సెట్ చేస్తారు, కాబట్టి ఒక సాధారణ ETH బదిలీ కంటే కాంట్రాక్ట్ అమరికకు చాలా ఎక్కువ గ్యాస్ అవసరమని గుర్తుంచుకోండి
- ఒక అమరిక స్క్రిప్ట్ లేదా ప్లగిన్
- [ఇతీరియం నోడ్](/developers/docs/nodes-and-clients/)‌కు యాక్సెస్, మీ స్వంత దానిని నడపడం ద్వారా, పబ్లిక్ నోడ్‌కు కనెక్ట్ చేయడం ద్వారా లేదా [నోడ్ సర్వీస్](/developers/docs/nodes-and-clients/nodes-as-a-service/)ని ఉపయోగించి API కీ ద్వారా

### ఒక స్మార్ట్ కాంట్రాక్టును అమర్చే దశలు {#steps-to-deploy}

సంబంధిత డెవలప్‌మెంట్ ఫ్రేమ్‌వర్క్‌ను బట్టి నిర్దిష్ట దశలు ఉంటాయి. ఉదాహరణకు, మీరు మీ కాంట్రాక్టులను అమర్చడంపై [Hardhat డాక్యుమెంటేషన్‌ను](https://hardhat.org/docs/tutorial/deploying) లేదా ఒక స్మార్ట్ కాంట్రాక్టును అమర్చడం మరియు ధృవీకరించడంపై [Foundry డాక్యుమెంటేషన్‌ను](https://book.getfoundry.sh/forge/deploying) చూడవచ్చు. అమర్చిన తర్వాత, మీ కాంట్రాక్టుకు ఇతర [ఖాతాల](/developers/docs/accounts/) వలె ఒక ఇతీరియం చిరునామా ఉంటుంది మరియు [సోర్స్ కోడ్ ధృవీకరణ ఉపకరణాలను](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) ఉపయోగించి ధృవీకరించవచ్చు.

## సంబంధిత ఉపకరణాలు {#related-tools}

**Remix - _Remix IDE ఇతీరియం వంటి బ్లాక్‌చైన్‌ల కోసం స్మార్ట్ కాంట్రాక్టులను అభివృద్ధి చేయడానికి, అమర్చడానికి మరియు నిర్వహించడానికి అనుమతిస్తుంది_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _స్మార్ట్ కాంట్రాక్టులను అభివృద్ధి చేయడం, పరీక్షించడం, పర్యవేక్షించడం మరియు నిర్వహించడం కోసం డీబగ్గింగ్, అబ్జర్విబిలిటీ మరియు ఇన్‌ఫ్రాస్ట్రక్చర్ బిల్డింగ్ బ్లాక్‌లను అందించే ఒక Web3 డెవలప్‌మెంట్ ప్లాట్‌ఫారమ్_**

- [tenderly.co](https://tenderly.co/)
- [డాక్స్](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _మీ ఇతీరియం సాఫ్ట్‌వేర్‌ను కంపైల్ చేయడానికి, అమర్చడానికి, పరీక్షించడానికి, మరియు డీబగ్ చేయడానికి ఒక డెవలప్‌మెంట్ ఎన్విరాన్‌మెంట్_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [మీ కాంట్రాక్టులను అమర్చడంపై డాక్స్](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _ఒకే కమాండ్ ఉపయోగించి, ఏదైనా EVM అనుకూల చైన్‌కు ఏదైనా కాంట్రాక్టును సులభంగా అమర్చండి_**

- [డాక్యుమెంటేషన్](https://portal.thirdweb.com/deploy/)

**Crossmint - _స్మార్ట్ కాంట్రాక్టులను అమర్చడానికి, క్రెడిట్-కార్డ్ మరియు క్రాస్ చైన్ చెల్లింపులను ప్రారంభించడానికి, మరియు NFTలను సృష్టించడానికి, పంపిణీ చేయడానికి, విక్రయించడానికి, నిల్వ చేయడానికి మరియు సవరించడానికి APIలను ఉపయోగించే ఎంటర్‌ప్రైజ్-గ్రేడ్ web3 డెవలప్‌మెంట్ ప్లాట్‌ఫారమ్._**

- [crossmint.com](https://www.crossmint.com)
- [డాక్యుమెంటేషన్](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [బ్లాగ్](https://blog.crossmint.com)

## సంబంధిత ట్యుటోరియల్స్ {#related-tutorials}

- [మీ మొదటి స్మార్ట్ కాంట్రాక్టును అమర్చడం](/developers/tutorials/deploying-your-first-smart-contract/) _– ఒక ఇతీరియం టెస్ట్ నెట్‌వర్క్‌లో మీ మొదటి స్మార్ట్ కాంట్రాక్టును అమర్చడానికి ఒక పరిచయం._
- [హలో వరల్డ్ | స్మార్ట్ కాంట్రాక్ట్ ట్యుటోరియల్](/developers/tutorials/hello-world-smart-contract/) _– ఇతీరియంపై ఒక ప్రాథమిక స్మార్ట్ కాంట్రాక్టును సృష్టించడానికి & అమర్చడానికి సులభంగా అనుసరించగల ట్యుటోరియల్._
- [సొలిడిటీ నుండి ఇతర కాంట్రాక్టులతో ఇంటరాక్ట్ అవ్వండి](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– ఇప్పటికే ఉన్న కాంట్రాక్ట్ నుండి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలి మరియు దానితో ఎలా ఇంటరాక్ట్ అవ్వాలి._
- [మీ కాంట్రాక్ట్ పరిమాణాన్ని ఎలా తగ్గించుకోవాలి](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- మీ కాంట్రాక్ట్ పరిమాణాన్ని పరిమితిలోపు ఉంచడానికి మరియు గ్యాస్‌పై ఆదా చేయడానికి ఎలా తగ్గించాలి_

## మరింత సమాచారం {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhatతో మీ కాంట్రాక్టులను అమర్చడం](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_మీకు సహాయపడిన కమ్యూనిటీ వనరు గురించి తెలుసా? ఈ పేజీని సవరించి, దాన్ని జోడించండి!_

## సంబంధిత అంశాలు {#related-topics}

- [అభివృద్ధి ఫ్రేమ్‌వర్క్‌లు](/developers/docs/frameworks/)
- [ఒక ఇతీరియం నోడ్‌ను నడపండి](/developers/docs/nodes-and-clients/run-a-node/)
- [నోడ్స్-యాజ్-ఎ-సర్వీస్](/developers/docs/nodes-and-clients/nodes-as-a-service)
