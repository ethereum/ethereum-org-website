---
title: Go டெவலப்பர்களுக்கான எத்திரியம்
description: Go-அடிப்படையிலான திட்டங்கள் மற்றும் கருவிகளைப் பயன்படுத்தி எத்திரியத்திற்கு எவ்வாறு உருவாக்குவது என்பதை அறிக
lang: ta
incomplete: true
---

<FeaturedText>Go-அடிப்படையிலான திட்டங்கள் மற்றும் கருவிகளைப் பயன்படுத்தி எத்திரியத்திற்கு எவ்வாறு உருவாக்குவது என்பதை அறிக</FeaturedText>

பரவலாக்கப்பட்ட செயலிகளை (dapps) உருவாக்க எத்திரியத்தைப் பயன்படுத்தவும். இந்த dapps நம்பகமானவையாக இருக்கலாம், அதாவது அவை எத்திரியத்தில் நிலைநிறுத்தப்பட்டவுடன், அவை எப்போதும் நிரல்படுத்தப்பட்டபடியே இயங்கும். அவை பரவலாக்கப்பட்டவை, அதாவது அவை சக-முனைய பிணையத்தில் இயங்குகின்றன மற்றும் தோல்விக்கான ஒற்றை புள்ளி எதுவும் இல்லை. எந்தவொரு தனி நிறுவனமோ அல்லது நபரோ அவற்றைக் கட்டுப்படுத்துவதில்லை, மேலும் அவற்றைத் தணிக்கை செய்வது கிட்டத்தட்ட சாத்தியமற்றது. புதிய வகையான பயன்பாடுகளை உருவாக்க அவை டிஜிட்டல் சொத்துக்களைக் கட்டுப்படுத்த முடியும்.

## திறன் ஒப்பந்தங்கள் மற்றும் Solidity மொழியுடன் தொடங்குதல் {#getting-started-with-smart-contracts-and-solidity}

**எத்திரியத்துடன் Go-ஐ ஒருங்கிணைப்பதற்கான உங்கள் முதல் படிகளை எடுங்கள்**

முதலில் இன்னும் அடிப்படையான அறிமுகம் தேவையா? [ethereum.org/learn](/learn/) அல்லது [ethereum.org/developers](/developers/) ஐப் பார்க்கவும்.

- [தொகுதிச்சங்கிலி விளக்கம்](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [திறன் ஒப்பந்தங்களைப் புரிந்துகொள்ளுதல்](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [உங்கள் முதல் திறன் ஒப்பந்தத்தை எழுதுங்கள்](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity-ஐ எவ்வாறு தொகுப்பது மற்றும் நிலைநிறுத்துவது என்பதை அறிக](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [ஒப்பந்தப் பயிற்சி](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## தொடக்கநிலை கட்டுரைகள் மற்றும் புத்தகங்கள் {#beginner-articles-and-books}

- [கெத் (Geth) உடன் தொடங்குதல்](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [எத்திரியத்துடன் இணைக்க Golang-ஐப் பயன்படுத்தவும்](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang-ஐப் பயன்படுத்தி எத்திரியம் திறன் ஒப்பந்தங்களை நிலைநிறுத்துங்கள்](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go-வில் எத்திரியம் திறன் ஒப்பந்தங்களைச் சோதித்து நிலைநிறுத்துவதற்கான படிப்படியான வழிகாட்டி](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [மின்புத்தகம்: Go உடன் எத்திரியம் மேம்பாடு](https://goethereumbook.org/) - _Go உடன் எத்திரியம் பயன்பாடுகளை உருவாக்குங்கள்_

## இடைநிலை கட்டுரைகள் மற்றும் ஆவணங்கள் {#intermediate-articles-and-docs}

- [கோ எத்திரியம் ஆவணங்கள்](https://geth.ethereum.org/docs) - _அதிகாரப்பூர்வ எத்திரியம் Golang-க்கான ஆவணங்கள்_
- [எரிகான் புரோகிராமர் வழிகாட்டி](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _நிலை மரம், பல-சான்றுகள் மற்றும் பரிவர்த்தனை செயலாக்கம் உள்ளிட்ட விளக்கப்பட வழிகாட்டி_
- [எரிகான் மற்றும் நிலையற்ற எத்திரியம்](https://youtu.be/3-Mn7OckSus?t=394) - _2020 எத்திரியம் சமூக மாநாடு (EthCC 3)_
- [எரிகான்: எத்திரியம் கிளையண்டுகளை மேம்படுத்துதல்](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [கோ எத்திரியம் GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [கெத் (Geth) உடன் Go-வில் ஒரு dapp-ஐ உருவாக்குதல்](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang மற்றும் கெத் (Geth) உடன் எத்திரியம் தனிப்பட்ட பிணையத்தில் வேலை செய்யுங்கள்](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go உடன் எத்திரியத்தில் Solidity ஒப்பந்தங்களை யூனிட் சோதனை செய்தல்](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [கெத் (Geth)-ஐ ஒரு நிரலகமாகப் பயன்படுத்துவதற்கான விரைவான குறிப்பு](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## மேம்பட்ட பயன்பாட்டு முறைகள் {#advanced-use-patterns}

- [கெத் (GETH) உருவகப்படுத்தப்பட்ட பின்தளம்](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [எத்திரியம் மற்றும் Quorum-ஐப் பயன்படுத்தும் சேவையாக-தொகுதிச்சங்கிலி பயன்பாடுகள்](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [எத்திரியம் தொகுதிச்சங்கிலி பயன்பாடுகளில் விநியோகிக்கப்பட்ட சேமிப்பகம் IPFS மற்றும் திரள்](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [மொபைல் கிளையண்டுகள்: நிரலகங்கள் மற்றும் Inproc எத்திரியம் முனைகள்](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [நேட்டிவ் dapps: எத்திரியம் ஒப்பந்தங்களுக்கான Go பிணைப்புகள்](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go திட்டங்கள் மற்றும் கருவிகள் {#go-projects-and-tools}

- [கெத் / கோ எத்திரியம்](https://github.com/ethereum/go-ethereum) - _எத்திரியம் நெறிமுறையின் அதிகாரப்பூர்வ Go செயலாக்கம்_
- [கோ எத்திரியம் குறியீடு பகுப்பாய்வு](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _கோ எத்திரியம் மூலக் குறியீட்டின் மதிப்பாய்வு மற்றும் பகுப்பாய்வு_
- [எரிகான்](https://github.com/ledgerwatch/erigon) - _காப்பக முனைகளில் கவனம் செலுத்தும் கோ எத்திரியத்தின் வேகமான வழித்தோன்றல்_
- [Golem](https://github.com/golemfactory/golem) - _Golem கணினி ஆற்றலுக்கான உலகளாவிய சந்தையை உருவாக்குகிறது_
- [Quorum](https://github.com/jpmorganchase/quorum) - _தரவு தனியுரிமையை ஆதரிக்கும் எத்திரியத்தின் அனுமதிக்குட்பட்ட செயலாக்கம்_
- [ப்ரிஸ்ம்](https://github.com/prysmaticlabs/prysm) - _எத்திரியம் 'Serenity' 2.0 Go செயலாக்கம்_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _பரவலாக்கப்பட்ட ட்விட்டர்: எத்திரியம் தொகுதிச்சங்கிலியில் இயங்கும் ஒரு மைக்ரோபிளாக்கிங் சேவை_
- [பிளாஸ்மா MVP Golang](https://github.com/kyokan/plasma) — _குறைந்தபட்ச சாத்தியமான பிளாஸ்மா விவரக்குறிப்பின் Golang செயலாக்கம் மற்றும் நீட்டிப்பு_
- [திறந்த எத்திரியம் சுரங்கப்பணி குளம்](https://github.com/sammy007/open-ethereum-pool) - _ஒரு திறந்த மூல எத்திரியம் சுரங்கப்பணி குளம்_
- [எத்திரியம் HD பணப்பை](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go-வில் எத்திரியம் HD பணப்பை வழித்தோன்றல்கள்_
- [மல்டி கெத்](https://github.com/multi-geth/multi-geth) - _பல வகையான எத்திரியம் பிணையங்களுக்கான ஆதரவு_
- [கெத் இலகுரக கிளையண்ட்](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _இலகுரக எத்திரியம் துணை நெறிமுறையின் கெத் செயலாக்கம்_
- [எத்திரியம் Golang SDK](https://github.com/everFinance/goether) - _Golang-ல் ஒரு எளிய எத்திரியம் பணப்பை செயலாக்கம் மற்றும் பயன்பாடுகள்_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200+ தொகுதிச்சங்கிலிகளுக்கான Go SDK மூலம் திறமையான தொகுதிச்சங்கிலி தரவு அணுகல்_

மேலும் ஆதாரங்களைத் தேடுகிறீர்களா? [ethereum.org/developers](/developers/) ஐப் பார்க்கவும்

## Go சமூகப் பங்களிப்பாளர்கள் {#go-community-contributors}

- [கெத் டிஸ்கார்ட்](https://discordapp.com/invite/nthXNEv)
- [கெத் Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum சேனல்](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - எத்திரியம்](https://ethereum.stackexchange.com/)
- [மல்டி கெத் Gitter](https://gitter.im/ethoxy/multi-geth)
- [எத்திரியம் Gitter](https://gitter.im/ethereum/home)
- [கெத் இலகுரக கிளையண்ட் Gitter](https://gitter.im/ethereum/light-client)

## பிற தொகுக்கப்பட்ட பட்டியல்கள் {#other-aggregated-lists}

- [அருமையான எத்திரியம்](https://github.com/btomashvili/awesome-ethereum)
- [கன்சென்சிஸ்: எத்திரியம் டெவலப்பர் கருவிகளின் உறுதியான பட்டியல்](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub மூலம்](https://github.com/ConsenSys/ethereum-developer-tools-list)