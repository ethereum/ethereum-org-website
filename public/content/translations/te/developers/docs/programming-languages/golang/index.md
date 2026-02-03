---
title: Go డెవలపర్‌ల కోసం Ethereum
description: Go-ఆధారిత ప్రాజెక్ట్‌లు మరియు టూలింగ్ ఉపయోగించి Ethereum కోసం ఎలా డెవలప్ చేయాలో తెలుసుకోండి
lang: te
incomplete: true
---

<FeaturedText>Go-ఆధారిత ప్రాజెక్ట్‌లు మరియు టూలింగ్ ఉపయోగించి Ethereum కోసం ఎలా డెవలప్ చేయాలో తెలుసుకోండి</FeaturedText>

వికేంద్రీకృత అప్లికేషన్లను (లేదా "డాప్స్") సృష్టించడానికి Ethereumను ఉపయోగించండి. ఈ డ్డాప్స్ అప్లికేషన్స్ విశ్వసనీయమైనవి, దాని అర్థం వాటిని ఒకసారి ఏతీరియంకి డెప్లోయ్ చేసాక ఎప్పటికి ప్రోగ్రాం చేసిన విధంగానే పని చేస్తాయి. అవి వికేంద్రీకృతమైనవి, అంటే అవి పీర్-టు-పీర్ నెట్‌వర్క్‌లో రన్ అవుతాయి మరియు వైఫల్యానికి ఒక్క పాయింట్ కూడా లేదు. ఏ ఒక్క సంస్థ లేదా వ్యక్తి వాటిని నియంత్రించరు మరియు వాటిని సెన్సార్ చేయడం దాదాపు అసాధ్యం. కొత్త రకాల అప్లికేషన్లను సృష్టించడానికి అవి డిజిటల్ ఆస్తులను నియంత్రించగలవు.

## స్మార్ట్ కాంట్రాక్టులు మరియు సాలిడిటీ భాషతో ప్రారంభించడం {#getting-started-with-smart-contracts-and-solidity}

**Goను Ethereumతో ఏకీకృతం చేయడానికి మీ మొదటి అడుగులు వేయండి**

ఇంకా స్పష్టమైన వివరాలు కావాలి? [ethereum.org/learn](/learn/) లేదా [ethereum.org/developers](/developers/)ని చూడండి.

- [బ్లాక్ చైను వివరణ](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [స్మార్ట్ కాంట్రాక్టులను అర్థం చేసుకోవడం](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [మీ మొదటి స్మార్ట్ కాంట్రాక్టును వ్రాయండి](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [సాలిడిటీని కంపైల్ చేయడం మరియు డిప్లాయ్ చేయడం ఎలాగో తెలుసుకోండి](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [కాంట్రాక్ట్ ట్యుటోరియల్](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## ప్రారంభకుల కోసం కథనాలు మరియు పుస్తకాలు {#beginner-articles-and-books}

- [Gethతో ప్రారంభించడం](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Ethereumకు కనెక్ట్ అవ్వడానికి Golang ఉపయోగించండి](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang ఉపయోగించి Ethereum స్మార్ట్ కాంట్రాక్టులను డిప్లాయ్ చేయండి](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Goలో Ethereum స్మార్ట్ కాంట్రాక్టులను టెస్టింగ్ మరియు డిప్లాయ్ చేయడానికి ఒక దశలవారీ గైడ్](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [ఇ-పుస్తకం: Goతో Ethereum డెవలప్‌మెంట్](https://goethereumbook.org/) - _Goతో Ethereum అప్లికేషన్లను డెవలప్ చేయండి_

## మధ్యంతర కథనాలు మరియు డాక్స్ {#intermediate-articles-and-docs}

- [Go Ethereum డాక్యుమెంటేషన్](https://geth.ethereum.org/docs/) - _అధికారిక Ethereum Golang కోసం డాక్యుమెంటేషన్_
- [Erigon ప్రోగ్రామర్ గైడ్](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _స్టేట్ ట్రీ, మల్టీ-ప్రూఫ్స్, మరియు ట్రాన్సాక్షన్ ప్రాసెసింగ్‌తో సహా ఇలస్ట్రేటెడ్ గైడ్_
- [Erigon మరియు స్టేట్‌లెస్ Ethereum](https://youtu.be/3-Mn7OckSus?t=394) - _2020 Ethereum కమ్యూనిటీ కాన్ఫరెన్స్ (EthCC 3)_
- [Erigon: Ethereum క్లయింట్‌లను ఆప్టిమైజ్ చేయడం](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 డెవ్‌కాన్ 4_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Gethతో Goలో ఒక డాప్‌ను సృష్టించడం](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang మరియు Gethతో Ethereum ప్రైవేట్ నెట్‌వర్క్‌తో పని చేయండి](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Goతో Ethereumపై Solidity కాంట్రాక్టుల యూనిట్ టెస్టింగ్](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Gethను లైబ్రరీగా ఉపయోగించడం కోసం త్వరిత రిఫరెన్స్](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## అధునాతన వినియోగ నమూనాలు {#advanced-use-patterns}

- [GETH సిమ్యులేటెడ్ బ్యాకెండ్](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Ethereum మరియు Quorum ఉపయోగించి బ్లాక్‌చెయిన్-యాజ్-ఎ-సర్వీస్ యాప్స్](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Ethereum బ్లాక్‌చెయిన్ అప్లికేషన్‌లలో డిస్ట్రిబ్యూటెడ్ స్టోరేజ్ IPFS మరియు Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [మొబైల్ క్లయింట్లు: లైబ్రరీలు మరియు ఇన్‌ప్రాక్ Ethereum నోడ్స్](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [నేటివ్ డాప్స్: Ethereum కాంట్రాక్టులకు Go బైండింగ్స్](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go ప్రాజెక్ట్‌లు మరియు టూల్స్ {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Ethereum ప్రోటోకాల్ యొక్క అధికారిక Go ఇంప్లిమెంటేషన్_
- [Go Ethereum కోడ్ ఎనాలసిస్](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereum సోర్స్ కోడ్ యొక్క సమీక్ష మరియు విశ్లేషణ_
- [Erigon](https://github.com/ledgerwatch/erigon) - _ఆర్కైవ్ నోడ్స్‌పై దృష్టి సారించి, Go Ethereum యొక్క వేగవంతమైన డెరివేటివ్_
- [Golem](https://github.com/golemfactory/golem) - _Golem కంప్యూటింగ్ పవర్ కోసం గ్లోబల్ మార్కెట్‌ను సృష్టిస్తోంది_
- [Quorum](https://github.com/jpmorganchase/quorum) - _డేటా గోప్యతకు మద్దతు ఇచ్చే Ethereum యొక్క పర్మిషన్డ్ ఇంప్లిమెంటేషన్_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Ethereum 'Serenity' 2.0 Go ఇంప్లిమెంటేషన్_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _వికేంద్రీకృత Twitter: Ethereum బ్లాక్‌చెయిన్‌పై నడుస్తున్న ఒక మైక్రోబ్లాగింగ్ సర్వీస్_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _మినిమమ్ వయబుల్ ప్లాస్మా స్పెసిఫికేషన్ యొక్క Golang ఇంప్లిమెంటేషన్ మరియు ఎక్స్‌టెన్షన్_
- [ఓపెన్ Ethereum మైనింగ్ పూల్](https://github.com/sammy007/open-ethereum-pool) - _ఒక ఓపెన్ సోర్స్ Ethereum మైనింగ్ పూల్_
- [Ethereum HD వాలెట్](https://github.com/miguelmota/go-ethereum-hdwallet) - _Goలో Ethereum HD వాలెట్ డెరివేషన్స్_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _అనేక రకాల Ethereum నెట్‌వర్క్‌లకు మద్దతు_
- [Geth లైట్ క్లయింట్](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _లైట్ Ethereum సబ్‌ప్రోటోకాల్ యొక్క Geth ఇంప్లిమెంటేషన్_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Golangలో ఒక సాధారణ Ethereum వాలెట్ ఇంప్లిమెంటేషన్ మరియు యుటిలిటీస్_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200+ బ్లాక్‌చెయిన్‌ల కోసం Go SDK ద్వారా సమర్థవంతమైన బ్లాక్‌చెయిన్ డేటా యాక్సెస్_

ఇంకొన్ని వనరులు (రిసోర్సెస్) కావాలా? [ethereum.org/developers](/developers/)ని చూడండి

## Go కమ్యూనిటీ కంట్రిబ్యూటర్లు {#go-community-contributors}

- [Geth డిస్కార్డ్](https://discordapp.com/invite/nthXNEv)
- [Geth గిట్టర్](https://gitter.im/ethereum/go-ethereum)
- [Gophers స్లాక్](https://invite.slack.golangbridge.org/) - [#ethereum ఛానెల్](https://gophers.slack.com/messages/C9HP1S9V2)
- [స్టాక్ఎక్స్చేంజ్ - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth గిట్టర్](https://gitter.im/ethoxy/multi-geth)
- [Ethereum గిట్టర్](https://gitter.im/ethereum/home)
- [Geth లైట్ క్లయింట్ గిట్టర్](https://gitter.im/ethereum/light-client)

## ఇతర సమగ్ర జాబితాలు {#other-aggregated-lists}

- [ఆసమ్ Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [కాన్సెన్సిస్: Ethereum డెవలపర్ టూల్స్ యొక్క ఒక నిశ్చయాత్మక జాబితా](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub సోర్స్](https://github.com/ConsenSys/ethereum-developer-tools-list)
