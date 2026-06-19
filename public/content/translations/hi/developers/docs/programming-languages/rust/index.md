---
title: Rust डेवलपर्स के लिए इथेरियम
description: Rust-आधारित प्रोजेक्ट्स और टूलिंग का उपयोग करके इथेरियम के लिए विकास करना सीखें
lang: hi
incomplete: true
---

<FeaturedText>Rust-आधारित प्रोजेक्ट्स और टूलिंग का उपयोग करके इथेरियम के लिए विकास करना सीखें</FeaturedText>

क्रिप्टोकरेंसी और ब्लॉकचेन तकनीक के लाभों का उपयोग करने वाले विकेंद्रीकृत एप्लिकेशन (dapp) बनाने के लिए इथेरियम का उपयोग करें। ये dapp भरोसेमंद हो सकते हैं, जिसका अर्थ है कि एक बार जब वे इथेरियम पर तैनात हो जाते हैं, तो वे हमेशा प्रोग्राम किए गए अनुसार ही चलेंगे। वे नए प्रकार के वित्तीय एप्लिकेशन बनाने के लिए डिजिटल संपत्तियों को नियंत्रित कर सकते हैं। वे विकेंद्रीकृत हो सकते हैं, जिसका अर्थ है कि कोई भी एकल संस्था या व्यक्ति उन्हें नियंत्रित नहीं करता है और उन्हें सेंसर करना लगभग असंभव है।

## स्मार्ट अनुबंध और Solidity भाषा के साथ शुरुआत करना {#getting-started-with-smart-contracts-and-solidity}

**Rust को इथेरियम के साथ एकीकृत करने के लिए अपने पहले कदम उठाएं**

क्या पहले अधिक बुनियादी जानकारी की आवश्यकता है? [ethereum.org/learn](/learn/) या [ethereum.org/developers](/developers/) देखें।

- [ब्लॉकचेन की व्याख्या](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट अनुबंधों को समझना](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [अपना पहला स्मार्ट अनुबंध लिखें](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity को संकलित और तैनात करना सीखें](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## शुरुआती लेख {#beginner-articles}

- [Rust इथेरियम क्लाइंट](https://openethereum.github.io/) \* **ध्यान दें कि OpenEthereum [को हटा दिया गया है](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) और अब इसका रखरखाव नहीं किया जा रहा है।** इसका उपयोग सावधानी से करें और अधिमानतः किसी अन्य क्लाइंट कार्यान्वयन पर स्विच करें।
- [Rust का उपयोग करके इथेरियम पर लेन-देन भेजना](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan के लिए Rust Wasm में अनुबंध लिखने के तरीके पर एक चरण-दर-चरण ट्यूटोरियल](https://github.com/paritytech/pwasm-tutorial)

## मध्यवर्ती लेख {#intermediate-articles}

## उन्नत उपयोग पैटर्न {#advanced-use-patterns}

- [इथेरियम-जैसे नेटवर्क के साथ इंटरैक्ट करने के लिए pwasm_ethereum एक्सटर्न लाइब्रेरी](https://github.com/openethereum/pwasm-ethereum)
- [JavaScript और Rust का उपयोग करके एक विकेंद्रीकृत चैट बनाएं](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js और Rust का उपयोग करके एक विकेंद्रीकृत Todo ऐप बनाएं](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Rust में एक ब्लॉकचेन बनाएं](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust प्रोजेक्ट्स और टूल्स {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _इथेरियम-जैसे नेटवर्क के साथ इंटरैक्ट करने के लिए एक्सटर्न का संग्रह_
- [लाइटहाउस](https://github.com/sigp/lighthouse) - _तेज़ इथेरियम सर्वसम्मति परत क्लाइंट_
- [इथेरियम WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly के एक नियतात्मक उपसमुच्चय का उपयोग करके इथेरियम स्मार्ट अनुबंध निष्पादन परत का प्रस्तावित पुनर्रचना_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API संदर्भ_
- [Solaris](https://github.com/paritytech/sol-rs) - _नेटिव Parity क्लाइंट EVM का उपयोग करके Solidity स्मार्ट अनुबंध यूनिट टेस्ट हार्नेस।_
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rust इथेरियम वर्चुअल मशीन कार्यान्वयन_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Rust में Wavelet स्मार्ट अनुबंध_
- [Foundry](https://github.com/foundry-rs/foundry) - _इथेरियम एप्लिकेशन विकास के लिए टूलकिट_
- [Alloy](https://alloy.rs) - _इथेरियम और अन्य EVM-आधारित चेन के साथ इंटरैक्ट करने के लिए उच्च-प्रदर्शन, अच्छी तरह से परीक्षण की गई और प्रलेखित लाइब्रेरी।_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _इथेरियम लाइब्रेरी और वॉलेट कार्यान्वयन_
- [SewUp](https://github.com/second-state/SewUp) - _Rust के साथ अपना इथेरियम WebAssembly अनुबंध बनाने और एक सामान्य बैकएंड में विकसित करने में आपकी मदद करने के लिए एक लाइब्रेरी_
- [Substreams](https://github.com/streamingfast/substreams) - _समानांतर ब्लॉकचेन डेटा अनुक्रमण तकनीक_
- [रेथ](https://github.com/paradigmxyz/reth) रेथ (Rust इथेरियम का संक्षिप्त रूप) एक नया इथेरियम फुल-नोड कार्यान्वयन है
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Rust में लिखे गए इथेरियम इकोसिस्टम में प्रोजेक्ट्स का एक क्यूरेटेड संग्रह_
- [Stylus](https://github.com/OffchainLabs/stylus) - _Arbitrum पर स्मार्ट अनुबंध बनाने के लिए Rust SDK_

क्या आप और अधिक संसाधन खोज रहे हैं? [ethereum.org/developers.](/developers/) देखें।

## Rust समुदाय के योगदानकर्ता {#rust-community-contributors}

- [इथेरियम WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)