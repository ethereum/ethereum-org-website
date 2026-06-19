---
title: "Rust डेव्हलपर्ससाठी इथेरियम"
description: "Rust-आधारित प्रोजेक्ट्स आणि टूल्स वापरून इथेरियमसाठी डेव्हलपमेंट कसे करायचे ते शिका"
lang: mr
incomplete: true
---

<FeaturedText>Rust-आधारित प्रोजेक्ट्स आणि टूल्स वापरून इथेरियमसाठी डेव्हलपमेंट कसे करायचे ते शिका</FeaturedText>

क्रिप्टोकरन्सी आणि ब्लॉकचेन तंत्रज्ञानाच्या फायद्यांचा वापर करणारे विकेंद्रित ॲप्लिकेशन्स (किंवा "dapps") तयार करण्यासाठी इथेरियमचा वापर करा. हे dapps विश्वासार्ह असू शकतात, याचा अर्थ असा की एकदा ते इथेरियमवर प्रस्थापित केले की, ते नेहमी प्रोग्राम केल्याप्रमाणेच चालतील. नवीन प्रकारचे आर्थिक ॲप्लिकेशन्स तयार करण्यासाठी ते डिजिटल मालमत्ता नियंत्रित करू शकतात. ते विकेंद्रित असू शकतात, याचा अर्थ असा की कोणतीही एक संस्था किंवा व्यक्ती त्यांना नियंत्रित करत नाही आणि त्यांना सेन्सॉर करणे जवळजवळ अशक्य आहे.

## स्मार्ट कॉन्ट्रॅक्ट्स आणि Solidity भाषेसह सुरुवात करणे {#getting-started-with-smart-contracts-and-solidity}

**Rust ला इथेरियमसोबत इंटिग्रेट करण्यासाठी तुमची पहिली पावले उचला**

आधी अधिक मूलभूत माहिती हवी आहे का? [ethereum.org/learn](/learn/) किंवा [ethereum.org/developers](/developers/) तपासा.

- [ब्लॉकचेनचे स्पष्टीकरण](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट कॉन्ट्रॅक्ट्स समजून घेणे](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [तुमचे पहिले स्मार्ट कॉन्ट्रॅक्ट लिहा](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity कंपाईल आणि प्रस्थापित कसे करायचे ते शिका](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## नवशिक्यांसाठी लेख {#beginner-articles}

- [Rust इथेरियम क्लायंट](https://openethereum.github.io/) \* **लक्षात घ्या की OpenEthereum [कालबाह्य झाले आहे](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) आणि आता त्याची देखभाल केली जात नाही.** ते काळजीपूर्वक वापरा आणि शक्यतो दुसऱ्या क्लायंट अंमलबजावणीवर स्विच करा.
- [Rust वापरून इथेरियमवर व्यवहार पाठवणे](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan साठी Rust Wasm मध्ये कॉन्ट्रॅक्ट्स कसे लिहायचे यावरील टप्प्याटप्प्याने ट्युटोरियल](https://github.com/paritytech/pwasm-tutorial)

## मध्यम स्तरावरील लेख {#intermediate-articles}

## प्रगत वापर पद्धती {#advanced-use-patterns}

- [इथेरियम-सारख्या नेटवर्कशी संवाद साधण्यासाठी pwasm_ethereum externs लायब्ररी](https://github.com/openethereum/pwasm-ethereum)
- [JavaScript आणि Rust वापरून विकेंद्रित चॅट तयार करा](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js आणि Rust वापरून विकेंद्रित Todo ॲप तयार करा](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Rust मध्ये ब्लॉकचेन तयार करा](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust प्रोजेक्ट्स आणि टूल्स {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _इथेरियम-सारख्या नेटवर्कशी संवाद साधण्यासाठी externs चा संग्रह_
- [लाइटहाऊस](https://github.com/sigp/lighthouse) - _जलद इथेरियम सहमती स्तर क्लायंट_
- [इथेरियम WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly च्या डिटरमिनिस्टिक सबसेटचा वापर करून इथेरियम स्मार्ट कॉन्ट्रॅक्ट अंमलबजावणी स्तराचे प्रस्तावित पुनर्निर्मिती_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API संदर्भ_
- [Solaris](https://github.com/paritytech/sol-rs) - _नेटिव्ह Parity क्लायंट EVM वापरून Solidity स्मार्ट कॉन्ट्रॅक्ट्स युनिट टेस्ट हार्नेस._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rust इथेरियम व्हर्च्युअल मशीन अंमलबजावणी_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Rust मधील Wavelet स्मार्ट कॉन्ट्रॅक्ट_
- [Foundry](https://github.com/foundry-rs/foundry) - _इथेरियम ॲप्लिकेशन डेव्हलपमेंटसाठी टूलकिट_
- [Alloy](https://alloy.rs) - _इथेरियम आणि इतर EVM-आधारित चेन्सशी संवाद साधण्यासाठी उच्च-कार्यक्षमता, चांगल्या प्रकारे तपासलेल्या आणि दस्तऐवजीकरण केलेल्या लायब्ररी._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _इथेरियम लायब्ररी आणि वॉलेट अंमलबजावणी_
- [SewUp](https://github.com/second-state/SewUp) - _Rust सह तुमचे इथेरियम WebAssembly कॉन्ट्रॅक्ट तयार करण्यात आणि सामान्य बॅकएंडमध्ये डेव्हलप करण्यासारखे मदत करणारी एक लायब्ररी_
- [Substreams](https://github.com/streamingfast/substreams) - _पॅरललाईज्ड ब्लॉकचेन डेटा इंडेक्सिंग तंत्रज्ञान_
- [रेथ](https://github.com/paradigmxyz/reth) रेथ (Rust इथेरियमचे संक्षिप्त रूप) ही एक नवीन इथेरियम फुल-नोड अंमलबजावणी आहे
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Rust मध्ये लिहिलेल्या इथेरियम इकोसिस्टममधील प्रोजेक्ट्सचा क्युरेटेड संग्रह_
- [Stylus](https://github.com/OffchainLabs/stylus) - _Arbitrum वर स्मार्ट कॉन्ट्रॅक्ट्स तयार करण्यासाठी Rust SDK_

आणखी संसाधने शोधत आहात? [ethereum.org/developers.](/developers/)

## Rust कम्युनिटी योगदानकर्ते {#rust-community-contributors}

- [इथेरियम WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)