---
title: जंग डेवलपर्स के लिए इथिरीयम
description: रस्ट आधारित प्रोग्राम भाषा परियोजनाओं और टूलिंग का उपयोग करके एथेरियम के लिए विकसित करना सीखें
lang: hi
incomplete: true
---

<FeaturedText>रस्ट-आधारित परियोजनाओं और टूलिंग का उपयोग करके एथेरियम के लिए विकसित करना सीखें</FeaturedText>

विकेन्द्रीकृत अनुप्रयोगों (या "डैप्स") बनाने के लिए इथिरीयम का उपयोग करें जो क्रिप्टोक्यूरेंसी और ब्लॉकचैन तकनीक के लाभों का उपयोग करते हैं। ये डैप भरोसेमंद हो सकते हैं, जिसका अर्थ है कि एक बार इथिरीयम में तैनात होने के बाद, वे हमेशा प्रोग्राम किए गए अनुसार चलेंगे। नए प्रकार के वित्तीय अनुप्रयोग बनाने के लिए वे डिजिटल परिसंपत्तियों को नियंत्रित कर सकते हैं। उन्हें विकेंद्रीकृत किया जा सकता है, जिसका अर्थ है कि कोई एकल इकाई या व्यक्ति उन्हें नियंत्रित नहीं करता है और सेंसर के लिए लगभग असंभव है।

## स्मार्ट अनुबंधों और सॉलिडिटी भाषा के साथ आरंभ करना {#getting-started-with-smart-contracts-and-solidity}

**रस्ट को एथेरियम के साथ एकीकृत करने के लिए अपने पहले कदम उठाएं**

पहले एक और बुनियादी प्राइमर की आवश्यकता है? [ethereum.org/learn](/learn/) या [ethereum.org/developers](/developers/) देखें।

- [ब्लॉकचेन समझाया गया](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट अनुबंधों को समझना](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [अपना पहला स्मार्ट अनुबंध लिखें](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [सॉलिडिटी को कंपाइल और डिप्लॉय करना सीखें](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## शुरुआती लेख {#beginner-articles}

- [The Rust Ethereum Client](https://openethereum.github.io/) \* **ध्यान दें कि OpenEthereum को [पदावनत कर दिया गया है](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) और अब इसे बनाए नहीं रखा जा रहा है।** इसका उपयोग सावधानी से करें और बेहतर होगा कि किसी अन्य क्लाइंट कार्यान्वयन पर स्विच करें।
- [रस्ट का उपयोग करके एथेरियम को लेनदेन भेजना](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan के लिए Rust Wasm में अनुबंध कैसे लिखें, इस पर एक चरण-दर-चरण ट्यूटोरियल](https://github.com/paritytech/pwasm-tutorial)

## मध्यवर्ती लेख {#intermediate-articles}

## उन्नत उपयोग पैटर्न {#advanced-use-patterns}

- [एथेरियम-जैसे नेटवर्क के साथ इंटरैक्ट करने के लिए pwasm_ethereum एक्सटर्न लाइब्रेरी](https://github.com/openethereum/pwasm-ethereum)

- [JavaScript और Rust का उपयोग करके एक विकेंद्रीकृत चैट बनाएं](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)

- [Vue.js और Rust का उपयोग करके एक विकेंद्रीकृत टूडू ऐप बनाएं](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Rust में एक ब्लॉकचेन बनाएं](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## रस्ट परियोजनाएं और उपकरण {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _एथेरियम-जैसे नेटवर्क के साथ इंटरैक्ट करने के लिए एक्सटर्न का संग्रह_
- [Lighthouse](https://github.com/sigp/lighthouse) - _तेज एथेरियम सहमति परत क्लाइंट_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly के एक नियतात्मक सबसेट का उपयोग करके एथेरियम स्मार्ट अनुबंध निष्पादन परत का प्रस्तावित नया स्वरूप_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API संदर्भ_
- [Solaris](https://github.com/paritytech/sol-rs) - _नेटिव Parity क्लाइंट EVM का उपयोग करके सॉलिडिटी स्मार्ट अनुबंध यूनिट परीक्षण हार्नेस।_
- [SputnikVM](https://github.com/rust-blockchain/evm) - _रस्ट एथेरियम वर्चुअल मशीन कार्यान्वयन_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Rust में Wavelet स्मार्ट अनुबंध_
- [Foundry](https://github.com/foundry-rs/foundry) - _एथेरियम एप्लिकेशन विकास के लिए टूलकिट_
- [Alloy](https://alloy.rs) - _एथेरियम और अन्य EVM-आधारित श्रृंखलाओं के साथ इंटरैक्ट करने के लिए उच्च-प्रदर्शन, अच्छी तरह से परीक्षित और प्रलेखित लाइब्रेरीज़।_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _एथेरियम लाइब्रेरी और वॉलेट कार्यान्वयन_
- [SewUp](https://github.com/second-state/SewUp) - _एक लाइब्रेरी जो आपको रस्ट के साथ अपना एथेरियम वेबअसेंबली अनुबंध बनाने में मदद करती है, ठीक वैसे ही जैसे एक सामान्य बैकएंड में विकसित किया जाता है_
- [Substreams](https://github.com/streamingfast/substreams) - _समानांतर ब्लॉकचेन डेटा अनुक्रमण तकनीक_
- [Reth](https://github.com/paradigmxyz/reth) Reth (रस्ट एथेरियम का संक्षिप्त रूप) एक नया एथेरियम फुल-नोड कार्यान्वयन है
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Rust में लिखे गए एथेरियम इकोसिस्टम में परियोजनाओं का एक क्यूरेटेड संग्रह_

अधिक संसाधनों की तलाश है? [ethereum.org/developers.](/developers/) देखें।

## रस्ट समुदाय के योगदानकर्ता {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
