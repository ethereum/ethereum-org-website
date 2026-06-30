---
title: "Rust డెవలపర్‌ల కోసం ఎథీరియం"
description: "Rust-ఆధారిత ప్రాజెక్ట్‌లు మరియు టూలింగ్‌ని ఉపయోగించి ఎథీరియం కోసం ఎలా డెవలప్ చేయాలో తెలుసుకోండి"
lang: te
incomplete: true
---

<FeaturedText>Rust-ఆధారిత ప్రాజెక్ట్‌లు మరియు టూలింగ్‌ని ఉపయోగించి ఎథీరియం కోసం ఎలా డెవలప్ చేయాలో తెలుసుకోండి</FeaturedText>

క్రిప్టోకరెన్సీ మరియు బ్లాక్‌చైన్ టెక్నాలజీ ప్రయోజనాలను ఉపయోగించుకునే వికేంద్రీకృత అప్లికేషన్ (dapp)లను సృష్టించడానికి ఎథీరియంను ఉపయోగించండి. ఈ dappలు నమ్మదగినవిగా ఉంటాయి, అంటే అవి ఎథీరియంకు డిప్లాయ్ చేయబడిన తర్వాత, అవి ఎల్లప్పుడూ ప్రోగ్రామ్ చేయబడిన విధంగానే రన్ అవుతాయి. కొత్త రకాల ఆర్థిక అప్లికేషన్‌లను సృష్టించడానికి అవి డిజిటల్ ఆస్తులను నియంత్రించగలవు. అవి వికేంద్రీకృతమై ఉంటాయి, అంటే ఏ ఒక్క సంస్థ లేదా వ్యక్తి వాటిని నియంత్రించలేరు మరియు వాటిని సెన్సార్ చేయడం దాదాపు అసాధ్యం.

## స్మార్ట్ కాంట్రాక్ట్‌లు మరియు Solidity భాషతో ప్రారంభించడం {#getting-started-with-smart-contracts-and-solidity}

**ఎథీరియంతో Rustను అనుసంధానించడానికి మీ మొదటి అడుగులు వేయండి**

ముందుగా మరింత ప్రాథమిక ప్రైమర్ కావాలా? [ethereum.org/learn](/learn/) లేదా [ethereum.org/developers](/developers/)ని చూడండి.

- [బ్లాక్‌చైన్ వివరణ](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [స్మార్ట్ కాంట్రాక్ట్‌లను అర్థం చేసుకోవడం](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [మీ మొదటి స్మార్ట్ కాంట్రాక్ట్‌ను రాయండి](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidityని కంపైల్ చేయడం మరియు డిప్లాయ్ చేయడం ఎలాగో తెలుసుకోండి](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## ప్రారంభకుల కథనాలు {#beginner-articles}

- [Rust ఎథీరియం క్లయింట్](https://openethereum.github.io/) \* **OpenEthereum [నిలిపివేయబడింది](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) మరియు ఇకపై నిర్వహించబడటం లేదని గమనించండి.** దీన్ని జాగ్రత్తగా ఉపయోగించండి మరియు ప్రాధాన్యంగా మరొక క్లయింట్ అమలుకు మారండి.
- [Rust ఉపయోగించి ఎథీరియంకు లావాదేవీని పంపడం](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan కోసం Rust Wasmలో కాంట్రాక్ట్‌లను ఎలా రాయాలో దశలవారీ ట్యుటోరియల్](https://github.com/paritytech/pwasm-tutorial)

## మధ్యస్థ కథనాలు {#intermediate-articles}

## అధునాతన వినియోగ నమూనాలు {#advanced-use-patterns}

- [ఎథీరియం లాంటి నెట్‌వర్క్‌తో ఇంటరాక్ట్ అవ్వడానికి pwasm_ethereum ఎక్స్‌టర్న్స్ లైబ్రరీ](https://github.com/openethereum/pwasm-ethereum)
- [JavaScript మరియు Rust ఉపయోగించి వికేంద్రీకృత చాట్‌ను నిర్మించండి](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js & Rust ఉపయోగించి వికేంద్రీకృత Todo యాప్‌ను నిర్మించండి](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Rustలో బ్లాక్‌చైన్‌ను నిర్మించండి](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust ప్రాజెక్ట్‌లు మరియు సాధనాలు {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _ఎథీరియం లాంటి నెట్‌వర్క్‌తో ఇంటరాక్ట్ అవ్వడానికి ఎక్స్‌టర్న్‌ల సేకరణ_
- [లైట్‌హౌస్](https://github.com/sigp/lighthouse) - _వేగవంతమైన ఎథీరియం ఏకాభిప్రాయ పొర క్లయింట్_
- [ఎథీరియం WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly యొక్క నిర్ణయాత్మక ఉపసమితిని ఉపయోగించి ఎథీరియం స్మార్ట్ కాంట్రాక్ట్ అమలు పొర యొక్క ప్రతిపాదిత పునఃరూపకల్పన_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API సూచన_
- [Solaris](https://github.com/paritytech/sol-rs) - _స్థానిక Parity క్లయింట్ EVMని ఉపయోగించి Solidity స్మార్ట్ కాంట్రాక్ట్‌ల యూనిట్ టెస్ట్ హార్నెస్._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rust ఎథీరియం వర్చువల్ మెషిన్ అమలు_
- [Wavelet](https://github.com/perlin-network/smart-contract-rs) - _Rustలో Wavelet స్మార్ట్ కాంట్రాక్ట్_
- [Foundry](https://github.com/foundry-rs/foundry) - _ఎథీరియం అప్లికేషన్ డెవలప్‌మెంట్ కోసం టూల్‌కిట్_
- [Alloy](https://alloy.rs) - _ఎథీరియం మరియు ఇతర EVM-ఆధారిత చైన్‌లతో ఇంటరాక్ట్ అవ్వడానికి అధిక-పనితీరు గల, బాగా పరీక్షించబడిన & డాక్యుమెంట్ చేయబడిన లైబ్రరీలు._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _ఎథీరియం లైబ్రరీ మరియు వాలెట్ అమలు_
- [SewUp](https://github.com/second-state/SewUp) - _Rustతో మీ ఎథీరియం webassembly కాంట్రాక్ట్‌ను నిర్మించడంలో మరియు సాధారణ బ్యాకెండ్‌లో డెవలప్ చేసినట్లుగా చేయడంలో మీకు సహాయపడే లైబ్రరీ_
- [Substreams](https://github.com/streamingfast/substreams) - _సమాంతర బ్లాక్‌చైన్ డేటా ఇండెక్సింగ్ టెక్నాలజీ_
- [రెత్](https://github.com/paradigmxyz/reth) రెత్ (Rust ఎథీరియంకు సంక్షిప్త రూపం) అనేది ఒక కొత్త ఎథీరియం పూర్తి-నోడ్ అమలు
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Rustలో వ్రాయబడిన ఎథీరియం ఎకోసిస్టమ్‌లోని ప్రాజెక్ట్‌ల క్యూరేటెడ్ సేకరణ_
- [Stylus](https://github.com/OffchainLabs/stylus) - _Arbitrumలో స్మార్ట్ కాంట్రాక్ట్‌లను నిర్మించడానికి Rust SDK_

మరిన్ని వనరుల కోసం చూస్తున్నారా? [ethereum.org/developers.](/developers/) చూడండి.

## Rust కమ్యూనిటీ కంట్రిబ్యూటర్లు {#rust-community-contributors}

- [ఎథీరియం WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
