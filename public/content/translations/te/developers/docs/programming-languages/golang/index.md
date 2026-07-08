---
title: "Go డెవలపర్‌ల కోసం ఎథీరియం"
description: "Go-ఆధారిత ప్రాజెక్ట్‌లు మరియు టూలింగ్‌ని ఉపయోగించి ఎథీరియం కోసం ఎలా డెవలప్ చేయాలో తెలుసుకోండి"
lang: te
incomplete: true
---

<FeaturedText>Go-ఆధారిత ప్రాజెక్ట్‌లు మరియు టూలింగ్‌ని ఉపయోగించి ఎథీరియం కోసం ఎలా డెవలప్ చేయాలో తెలుసుకోండి</FeaturedText>

వికేంద్రీకృత అప్లికేషన్‌లను (లేదా "dapps") సృష్టించడానికి ఎథీరియంను ఉపయోగించండి. ఈ dapps నమ్మదగినవిగా ఉంటాయి, అంటే అవి ఎథీరియంకు డిప్లాయ్ చేయబడిన తర్వాత, అవి ఎల్లప్పుడూ ప్రోగ్రామ్ చేయబడిన విధంగానే రన్ అవుతాయి. అవి వికేంద్రీకృతమైనవి, అంటే అవి పీర్-టు-పీర్ నెట్‌వర్క్‌లో రన్ అవుతాయి మరియు వైఫల్యానికి ఒకే పాయింట్ ఉండదు. ఏ ఒక్క సంస్థ లేదా వ్యక్తి వాటిని నియంత్రించలేరు మరియు వాటిని సెన్సార్ చేయడం దాదాపు అసాధ్యం. కొత్త రకాల అప్లికేషన్‌లను సృష్టించడానికి అవి డిజిటల్ ఆస్తులను నియంత్రించగలవు.

## స్మార్ట్ కాంట్రాక్ట్‌లు మరియు Solidity భాషతో ప్రారంభించడం {#getting-started-with-smart-contracts-and-solidity}

**ఎథీరియంతో Goని ఏకీకృతం చేయడానికి మీ మొదటి అడుగులు వేయండి**

ముందుగా మరింత ప్రాథమిక ప్రైమర్ కావాలా? [ethereum.org/learn](/learn/) లేదా [ethereum.org/developers](/developers/)ని చూడండి.

- [బ్లాక్‌చైన్ వివరణ](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [స్మార్ట్ కాంట్రాక్ట్‌లను అర్థం చేసుకోవడం](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [మీ మొదటి స్మార్ట్ కాంట్రాక్ట్‌ను రాయండి](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidityని ఎలా కంపైల్ మరియు డిప్లాయ్ చేయాలో తెలుసుకోండి](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [కాంట్రాక్ట్ ట్యుటోరియల్](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## ప్రారంభకుల కథనాలు మరియు పుస్తకాలు {#beginner-articles-and-books}

- [గెత్‌తో ప్రారంభించడం](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [ఎథీరియంకు కనెక్ట్ చేయడానికి Golangని ఉపయోగించండి](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golangని ఉపయోగించి ఎథీరియం స్మార్ట్ కాంట్రాక్ట్‌లను డిప్లాయ్ చేయండి](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Goలో ఎథీరియం స్మార్ట్ కాంట్రాక్ట్‌లను పరీక్షించడం మరియు డిప్లాయ్ చేయడం కోసం దశల వారీ గైడ్](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [ఈబుక్: Goతో ఎథీరియం డెవలప్‌మెంట్](https://goethereumbook.org/) - _Goతో ఎథీరియం అప్లికేషన్‌లను డెవలప్ చేయండి_

## ఇంటర్మీడియట్ కథనాలు మరియు డాక్స్ {#intermediate-articles-and-docs}

- [గో ఇథీరియం డాక్యుమెంటేషన్](https://geth.ethereum.org/docs) - _అధికారిక ఎథీరియం Golang కోసం డాక్యుమెంటేషన్_
- [ఎరిగోన్ ప్రోగ్రామర్స్ గైడ్](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _స్థితి ట్రీ, బహుళ-ప్రూఫ్‌లు మరియు లావాదేవీ ప్రాసెసింగ్‌తో సహా ఇలస్ట్రేటెడ్ గైడ్_
- [ఎరిగోన్ మరియు స్టేట్‌లెస్ ఎథీరియం](https://youtu.be/3-Mn7OckSus?t=394) - _2020 ఎథీరియం కమ్యూనిటీ కాన్ఫరెన్స్ (EthCC 3)_
- [ఎరిగోన్: ఎథీరియం క్లయింట్‌లను ఆప్టిమైజ్ చేయడం](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [గో ఇథీరియం GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [గెత్‌తో Goలో dappని సృష్టించడం](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang మరియు గెత్‌తో ఎథీరియం ప్రైవేట్ నెట్‌వర్క్‌తో పని చేయండి](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Goతో ఎథీరియంలో Solidity కాంట్రాక్ట్‌లను యూనిట్ టెస్టింగ్ చేయడం](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [గెత్‌ను లైబ్రరీగా ఉపయోగించడం కోసం త్వరిత సూచన](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## అధునాతన వినియోగ నమూనాలు {#advanced-use-patterns}

- [గెత్ సిమ్యులేటెడ్ బ్యాకెండ్](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [ఎథీరియం మరియు Quorumని ఉపయోగించి బ్లాక్‌చైన్-యాజ్-ఎ-సర్వీస్ యాప్‌లు](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [ఎథీరియం బ్లాక్‌చైన్ అప్లికేషన్‌లలో డిస్ట్రిబ్యూటెడ్ స్టోరేజ్ IPFS మరియు స్వార్మ్](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [మొబైల్ క్లయింట్‌లు: లైబ్రరీలు మరియు ఇన్‌ప్రాక్ ఎథీరియం నోడ్‌లు](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [నేటివ్ dapps: ఎథీరియం కాంట్రాక్ట్‌లకు Go బైండింగ్‌లు](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go ప్రాజెక్ట్‌లు మరియు సాధనాలు {#go-projects-and-tools}

- [గెత్ / గో ఇథీరియం](https://github.com/ethereum/go-ethereum) - _ఎథీరియం ప్రోటోకాల్ యొక్క అధికారిక Go అమలు_
- [గో ఇథీరియం కోడ్ విశ్లేషణ](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _గో ఇథీరియం సోర్స్ కోడ్ యొక్క సమీక్ష మరియు విశ్లేషణ_
- [ఎరిగోన్](https://github.com/ledgerwatch/erigon) - _ఆర్కైవ్ నోడ్‌లపై దృష్టి సారించిన గో ఇథీరియం యొక్క వేగవంతమైన డెరివేటివ్_
- [Golem](https://github.com/golemfactory/golem) - _కంప్యూటింగ్ పవర్ కోసం Golem గ్లోబల్ మార్కెట్‌ను సృష్టిస్తోంది_
- [Quorum](https://github.com/jpmorganchase/quorum) - _డేటా గోప్యతకు మద్దతు ఇచ్చే ఎథీరియం యొక్క అనుమతిగల అమలు_
- [ప్రిజమ్](https://github.com/prysmaticlabs/prysm) - _ఎథీరియం 'Serenity' 2.0 Go అమలు_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _వికేంద్రీకృత ట్విట్టర్: ఎథీరియం బ్లాక్‌చైన్‌లో రన్ అవుతున్న మైక్రోబ్లాగింగ్ సేవ_
- [ప్లాస్మా MVP Golang](https://github.com/kyokan/plasma) — _కనీస ఆచరణీయ ప్లాస్మా స్పెసిఫికేషన్ యొక్క Golang అమలు మరియు పొడిగింపు_
- [ఓపెన్ ఎథీరియం మైనింగ్ పూల్](https://github.com/sammy007/open-ethereum-pool) - _ఓపెన్ సోర్స్ ఎథీరియం మైనింగ్ పూల్_
- [ఎథీరియం HD వాలెట్](https://github.com/miguelmota/go-ethereum-hdwallet) - _Goలో ఎథీరియం HD వాలెట్ డెరివేషన్స్_
- [మల్టీ గెత్](https://github.com/multi-geth/multi-geth) - _అనేక రకాల ఎథీరియం నెట్‌వర్క్‌లకు మద్దతు_
- [గెత్ తేలికపాటి క్లయింట్](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _లైట్ ఎథీరియం సబ్‌ప్రోటోకాల్ యొక్క గెత్ అమలు_
- [ఎథీరియం Golang SDK](https://github.com/everFinance/goether) - _Golangలో ఒక సాధారణ ఎథీరియం వాలెట్ అమలు మరియు యుటిలిటీలు_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200+ బ్లాక్‌చైన్‌ల కోసం Go SDK ద్వారా సమర్థవంతమైన బ్లాక్‌చైన్ డేటా యాక్సెస్_

మరిన్ని వనరుల కోసం చూస్తున్నారా? [ethereum.org/developers](/developers/)ని చూడండి

## Go కమ్యూనిటీ కంట్రిబ్యూటర్లు {#go-community-contributors}

- [గెత్ డిస్కార్డ్](https://discordapp.com/invite/nthXNEv)
- [గెత్ Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum ఛానెల్](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - ఎథీరియం](https://ethereum.stackexchange.com/)
- [మల్టీ గెత్ Gitter](https://gitter.im/ethoxy/multi-geth)
- [ఎథీరియం Gitter](https://gitter.im/ethereum/home)
- [గెత్ తేలికపాటి క్లయింట్ Gitter](https://gitter.im/ethereum/light-client)

## ఇతర సమగ్ర జాబితాలు {#other-aggregated-lists}

- [అద్భుతమైన ఎథీరియం](https://github.com/btomashvili/awesome-ethereum)
- [ConsenSys: ఎథీరియం డెవలపర్ సాధనాల యొక్క ఖచ్చితమైన జాబితా](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub మూలం](https://github.com/ConsenSys/ethereum-developer-tools-list)