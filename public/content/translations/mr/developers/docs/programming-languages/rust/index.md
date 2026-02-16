---
title: "रस्ट डेव्हलपर्ससाठी इथेरियम"
description: "रस्ट-आधारित प्रकल्प आणि टूलिंग वापरून इथेरियमसाठी कसे विकसित करायचे ते शिका"
lang: mr
incomplete: true
---

<FeaturedText>रस्ट-आधारित प्रकल्प आणि टूलिंग वापरून इथेरियमसाठी कसे विकसित करायचे ते शिका</FeaturedText>

क्रिप्टोकरन्सी आणि ब्लॉकचेन तंत्रज्ञानाच्या फायद्यांचा उपयोग करणाऱ्या विकेंद्रीकृत ॲप्लिकेशन्स (किंवा "dapps") तयार करण्यासाठी इथेरियम वापरा. हे dapps विश्वासार्ह असू शकतात, याचा अर्थ असा की एकदा ते इथेरियमवर तैनात केले की, ते नेहमी प्रोग्राम केल्याप्रमाणे चालतील. नवीन प्रकारचे आर्थिक ॲप्लिकेशन्स तयार करण्यासाठी ते डिजिटल मालमत्ता नियंत्रित करू शकतात. ते विकेंद्रित असू शकतात, याचा अर्थ असा की कोणतीही एक संस्था किंवा व्यक्ती त्यांना नियंत्रित करत नाही आणि सेन्सॉर करणे जवळजवळ अशक्य आहे.

## स्मार्ट कॉन्ट्रॅक्ट्स आणि Solidity भाषेसह प्रारंभ करणे {#getting-started-with-smart-contracts-and-solidity}

**इथेरियमसह रस्टला एकत्रित करण्यासाठी तुमची पहिली पावले उचला**

प्रथम अधिक मूलभूत प्राइमरची आवश्यकता आहे? [ethereum.org/learn](/learn/) किंवा [ethereum.org/developers](/developers/) पहा.

- [ब्लॉकचेन स्पष्टीकरण](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट कॉन्ट्रॅक्ट्स समजून घेणे](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [तुमचा पहिला स्मार्ट कॉन्ट्रॅक्ट लिहा](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity कसे संकलित आणि तैनात करायचे ते शिका](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## नवशिक्यांसाठी लेख {#beginner-articles}

- [रस्ट इथेरियम क्लायंट](https://openethereum.github.io/) \* **लक्षात घ्या की ओपनइथेरियम [नापसंत केले आहे](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) आणि आता ते देखरेख केले जात नाही.** ते सावधगिरीने वापरा आणि शक्यतो दुसऱ्या क्लायंट अंमलबजावणीवर स्विच करा.
- [रस्ट वापरून इथेरियमला व्यवहार पाठवणे](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [कोवानसाठी रस्ट Wasm मध्ये कॉन्ट्रॅक्ट कसे लिहायचे यावर एक चरण-दर-चरण ट्युटोरियल](https://github.com/paritytech/pwasm-tutorial)

## मध्यम स्तरावरील लेख {#intermediate-articles}

## प्रगत वापर पद्धती {#advanced-use-patterns}

- [इथेरियम-सारख्या नेटवर्कशी संवाद साधण्यासाठी pwasm_ethereum एक्सटर्न्स लायब्ररी](https://github.com/openethereum/pwasm-ethereum)

- [जावास्क्रिप्ट आणि रस्ट वापरून एक विकेंद्रित चॅट तयार करा](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)

- [Vue.js आणि रस्ट वापरून एक विकेंद्रित टूडू ॲप तयार करा](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [रस्टमध्ये एक ब्लॉकचेन तयार करा](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## रस्ट प्रकल्प आणि साधने {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _इथेरियम-सारख्या नेटवर्कशी संवाद साधण्यासाठी एक्सटर्न्सचा संग्रह_
- [Lighthouse](https://github.com/sigp/lighthouse) - _जलद इथेरियम कन्सेन्सस लेयर क्लायंट_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly च्या एका निश्चित उपसंचाचा वापर करून इथेरियम स्मार्ट कॉन्ट्रॅक्ट एक्झिक्यूशन लेयरची प्रस्तावित पुनर्रचना_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API संदर्भ_
- [Solaris](https://github.com/paritytech/sol-rs) - _मूळ Parity Client EVM वापरून Solidity स्मार्ट कॉन्ट्रॅक्ट्स युनिट टेस्ट हार्नेस._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _रस्ट इथेरियम व्हर्च्युअल मशीन अंमलबजावणी_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _रस्टमध्ये वेव्हलेट स्मार्ट कॉन्ट्रॅक्ट_
- [Foundry](https://github.com/foundry-rs/foundry) - _इथेरियम ॲप्लिकेशन विकासासाठी टूलकिट_
- [Alloy](https://alloy.rs) - _इथेरियम आणि इतर EVM-आधारित चेन्सशी संवाद साधण्यासाठी उच्च-कार्यक्षमता, चांगल्या प्रकारे चाचणी केलेल्या आणि दस्तऐवजीकरण केलेल्या लायब्ररीज._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _इथेरियम लायब्ररी आणि वॉलेट अंमलबजावणी_
- [SewUp](https://github.com/second-state/SewUp) - _रस्टसह तुमचा इथेरियम वेबअसेम्बली कॉन्ट्रॅक्ट तयार करण्यात आणि सामान्य बॅकएंडमध्ये विकसित करण्याप्रमाणेच मदत करणारी एक लायब्ररी_
- [Substreams](https://github.com/streamingfast/substreams) - _समांतर ब्लॉकचेन डेटा अनुक्रमणिका तंत्रज्ञान_
- [Reth](https://github.com/paradigmxyz/reth) Reth (रस्ट इथेरियमचे संक्षिप्त रूप) ही एक नवीन इथेरियम फुल-नोड अंमलबजावणी आहे
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _इथेरियम इकोसिस्टममधील रस्टमध्ये लिहिलेल्या प्रकल्पांचा एक निवडक संग्रह_

अधिक संसाधने शोधत आहात? [ethereum.org/developers.](/developers/) तपासा.

## रस्ट समुदाय योगदानकर्ते {#rust-community-contributors}

- [इथेरियम WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
