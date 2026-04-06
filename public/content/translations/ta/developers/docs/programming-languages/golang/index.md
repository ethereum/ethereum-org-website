---
title: "Go டெவலப்பர்களுக்கான எத்தேரியம்"
description: "Go-அடிப்படையிலான திட்டங்கள் மற்றும் கருவிகளைப் பயன்படுத்தி எத்தேரியத்திற்கு எவ்வாறு உருவாக்குவது என்பதை அறிக"
lang: ta
incomplete: true
---

<FeaturedText>Go-அடிப்படையிலான திட்டங்கள் மற்றும் கருவிகளைப் பயன்படுத்தி எத்தேரியத்திற்கு எவ்வாறு உருவாக்குவது என்பதை அறிக</FeaturedText>

பரவலாக்கப்பட்ட பயன்பாடுகளை (அல்லது "dapps") உருவாக்க எத்தேரியத்தைப் பயன்படுத்தவும். இந்த dapps நம்பகமானவையாக இருக்கலாம், அதாவது அவை எத்தேரியத்தில் பயன்படுத்தப்பட்டவுடன், அவை எப்போதும் நிரல்படுத்தப்பட்டபடியே இயங்கும். அவை பரவலாக்கப்பட்டவை, அதாவது அவை பியர்-டு-பியர் (peer-to-peer) நெட்வொர்க்கில் இயங்குகின்றன மற்றும் தோல்விக்கான ஒற்றை புள்ளி எதுவும் இல்லை. எந்தவொரு தனி நிறுவனமோ அல்லது நபரோ அவற்றைக் கட்டுப்படுத்துவதில்லை, மேலும் அவற்றைத் தணிக்கை செய்வது கிட்டத்தட்ட சாத்தியமற்றது. புதிய வகையான பயன்பாடுகளை உருவாக்க அவை டிஜிட்டல் சொத்துக்களைக் கட்டுப்படுத்தலாம்.

## ஸ்மார்ட் ஒப்பந்தங்கள் மற்றும் Solidity மொழியுடன் தொடங்குதல் {#getting-started-with-smart-contracts-and-solidity}

**எத்தேரியத்துடன் Go-ஐ ஒருங்கிணைப்பதற்கான உங்கள் முதல் படிகளை எடுங்கள்**

முதலில் இன்னும் அடிப்படையான அறிமுகம் தேவையா? [ethereum.org/learn](/learn/) அல்லது [ethereum.org/developers](/developers/) ஐப் பார்க்கவும்.

- [பிளாக்செயின் விளக்கம்](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [ஸ்மார்ட் ஒப்பந்தங்களைப் புரிந்துகொள்வது](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [உங்கள் முதல் ஸ்மார்ட் ஒப்பந்தத்தை எழுதுங்கள்](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity-ஐ எவ்வாறு தொகுப்பது மற்றும் பயன்படுத்துவது என்பதை அறிக](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [ஒப்பந்தப் பயிற்சி](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## தொடக்கநிலை கட்டுரைகள் மற்றும் புத்தகங்கள் {#beginner-articles-and-books}

- [Geth உடன் தொடங்குதல்](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [எத்தேரியத்துடன் இணைக்க Golang-ஐப் பயன்படுத்தவும்](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang-ஐப் பயன்படுத்தி எத்தேரியம் ஸ்மார்ட் ஒப்பந்தங்களைப் பயன்படுத்துங்கள்](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go-வில் எத்தேரியம் ஸ்மார்ட் ஒப்பந்தங்களைச் சோதித்து பயன்படுத்துவதற்கான படிப்படியான வழிகாட்டி](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [மின்புத்தகம்: Go உடன் எத்தேரியம் மேம்பாடு](https://goethereumbook.org/) - _Go உடன் எத்தேரியம் பயன்பாடுகளை உருவாக்குங்கள்_

## இடைநிலை கட்டுரைகள் மற்றும் ஆவணங்கள் {#intermediate-articles-and-docs}

- [Go எத்தேரியம் ஆவணங்கள்](https://geth.ethereum.org/docs) - _அதிகாரப்பூர்வ எத்தேரியம் Golang-க்கான ஆவணங்கள்_
- [Erigon புரோகிராமர் வழிகாட்டி](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _நிலை மரம் (state tree), பல-சான்றுகள் (multi-proofs) மற்றும் பரிவர்த்தனை செயலாக்கம் உள்ளிட்ட விளக்கப்பட வழிகாட்டி_
- [Erigon மற்றும் நிலையற்ற எத்தேரியம்](https://youtu.be/3-Mn7OckSus?t=394) - _2020 எத்தேரியம் சமூக மாநாடு (EthCC 3)_
- [Erigon: எத்தேரியம் கிளையண்டுகளை மேம்படுத்துதல்](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go எத்தேரியம் GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Geth உடன் Go-வில் ஒரு dapp-ஐ உருவாக்குதல்](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang மற்றும் Geth உடன் எத்தேரியம் தனியார் நெட்வொர்க்கில் வேலை செய்யுங்கள்](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go உடன் எத்தேரியத்தில் Solidity ஒப்பந்தங்களை யூனிட் சோதனை செய்தல்](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Geth-ஐ ஒரு நூலகமாகப் பயன்படுத்துவதற்கான விரைவான குறிப்பு](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## மேம்பட்ட பயன்பாட்டு முறைகள் {#advanced-use-patterns}

- [GETH உருவகப்படுத்தப்பட்ட பின்தளம் (Simulated Backend)](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [எத்தேரியம் மற்றும் Quorum-ஐப் பயன்படுத்தும் பிளாக்செயின்-ஆஸ்-எ-சர்வீஸ் (Blockchain-as-a-Service) பயன்பாடுகள்](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [எத்தேரியம் பிளாக்செயின் பயன்பாடுகளில் விநியோகிக்கப்பட்ட சேமிப்பகம் IPFS மற்றும் Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [மொபைல் கிளையண்டுகள்: நூலகங்கள் மற்றும் Inproc எத்தேரியம் முனைகள்](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [நேட்டிவ் dapps: எத்தேரியம் ஒப்பந்தங்களுக்கான Go பிணைப்புகள்](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go திட்டங்கள் மற்றும் கருவிகள் {#go-projects-and-tools}

- [Geth / Go எத்தேரியம்](https://github.com/ethereum/go-ethereum) - _எத்தேரியம் நெறிமுறையின் அதிகாரப்பூர்வ Go செயலாக்கம்_
- [Go எத்தேரியம் குறியீடு பகுப்பாய்வு](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go எத்தேரியம் மூலக் குறியீட்டின் மதிப்பாய்வு மற்றும் பகுப்பாய்வு_
- [Erigon](https://github.com/ledgerwatch/erigon) - _காப்பக முனைகளில் (archive nodes) கவனம் செலுத்தும் Go எத்தேரியத்தின் வேகமான வழித்தோன்றல்_
- [Golem](https://github.com/golemfactory/golem) - _கணினி ஆற்றலுக்கான உலகளாவிய சந்தையை Golem உருவாக்குகிறது_
- [Quorum](https://github.com/jpmorganchase/quorum) - _தரவு தனியுரிமையை ஆதரிக்கும் எத்தேரியத்தின் அனுமதிக்கப்பட்ட செயலாக்கம்_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _எத்தேரியம் 'Serenity' 2.0 Go செயலாக்கம்_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _பரவலாக்கப்பட்ட ட்விட்டர்: எத்தேரியம் பிளாக்செயினில் இயங்கும் ஒரு மைக்ரோ பிளாக்கிங் சேவை_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _குறைந்தபட்ச சாத்தியமான பிளாஸ்மா (Minimum Viable Plasma) விவரக்குறிப்பின் Golang செயலாக்கம் மற்றும் நீட்டிப்பு_
- [திறந்த எத்தேரியம் மைனிங் பூல்](https://github.com/sammy007/open-ethereum-pool) - _ஒரு திறந்த மூல எத்தேரியம் மைனிங் பூல்_
- [எத்தேரியம் HD வாலட்](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go-வில் எத்தேரியம் HD வாலட் வழித்தோன்றல்கள்_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _பல வகையான எத்தேரியம் நெட்வொர்க்குகளுக்கான ஆதரவு_
- [Geth லைட் கிளையண்ட்](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _லைட் எத்தேரியம் துணை நெறிமுறையின் (Light Ethereum Subprotocol) Geth செயலாக்கம்_
- [எத்தேரியம் Golang SDK](https://github.com/everFinance/goether) - _Golang-ல் ஒரு எளிய எத்தேரியம் வாலட் செயலாக்கம் மற்றும் பயன்பாடுகள்_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200+ பிளாக்செயின்களுக்கான Go SDK மூலம் திறமையான பிளாக்செயின் தரவு அணுகல்_

மேலும் ஆதாரங்களைத் தேடுகிறீர்களா? [ethereum.org/developers](/developers/) ஐப் பார்க்கவும்

## Go சமூகப் பங்களிப்பாளர்கள் {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum சேனல்](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - எத்தேரியம்](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [எத்தேரியம் Gitter](https://gitter.im/ethereum/home)
- [Geth லைட் கிளையண்ட் Gitter](https://gitter.im/ethereum/light-client)

## பிற தொகுக்கப்பட்ட பட்டியல்கள் {#other-aggregated-lists}

- [Awesome எத்தேரியம்](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: எத்தேரியம் டெவலப்பர் கருவிகளின் உறுதியான பட்டியல்](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub மூலம்](https://github.com/ConsenSys/ethereum-developer-tools-list)