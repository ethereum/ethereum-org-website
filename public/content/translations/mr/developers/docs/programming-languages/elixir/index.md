---
title: इलिक्सिर डेव्हलपर्ससाठी इथेरियम
description: इलिक्सिर-आधारित प्रोजेक्ट्स आणि टूलिंगचा वापर करून इथेरियमसाठी कसे डेव्हलप करायचे ते शिका.
lang: mr
incomplete: false
---

<FeaturedText>इलिक्सिर-आधारित प्रोजेक्ट्स आणि टूलिंगचा वापर करून इथेरियमसाठी डेव्हलप कसे करायचे ते शिका.</FeaturedText>

क्रिप्टोकरन्सी आणि ब्लॉकचेन तंत्रज्ञानाच्या फायद्यांचा उपयोग करणाऱ्या विकेंद्रीकृत ॲप्लिकेशन्स (किंवा "dapps") तयार करण्यासाठी इथेरियम वापरा. हे dapps विश्वासहीन असू शकतात, म्हणजेच एकदा ते इथेरियमवर तैनात झाल्यावर, ते नेहमी प्रोग्राम केल्याप्रमाणे चालतील. ते नवीन प्रकारचे आर्थिक ॲप्लिकेशन्स तयार करण्यासाठी डिजिटल मालमत्तांवर नियंत्रण ठेवू शकतात. ते विकेंद्रित असू शकतात, याचा अर्थ असा की कोणतीही एक संस्था किंवा व्यक्ती त्यांना नियंत्रित करत नाही आणि सेन्सॉर करणे जवळजवळ अशक्य आहे.

## स्मार्ट कॉन्ट्रॅक्ट्स आणि सॉलिडिटी भाषेसह प्रारंभ करणे {#getting-started-with-smart-contracts-and-solidity}

**इलिक्सिरला इथेरियमसोबत समाकलित करण्यासाठी तुमची पहिली पावले उचला**

प्रथम अधिक मूलभूत प्राइमरची आवश्यकता आहे? [ethereum.org/learn](/learn/) किंवा [ethereum.org/developers](/developers/) पहा.

- [ब्लॉकचेन स्पष्टीकरण](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट कॉन्ट्रॅक्ट्स समजून घेणे](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [तुमचा पहिला स्मार्ट कॉन्ट्रॅक्ट लिहा](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [सॉलिडिटी कसे संकलित आणि तैनात करायचे ते शिका](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## नवशिक्यांसाठी लेख {#beginner-articles}

- [अखेरीस इथेरियम खाती समजून घेणे](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [Ethers — इलिक्सिरसाठी एक फर्स्ट-क्लास इथेरियम वेब3 लायब्ररी](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## मध्यम स्तरावरील लेख {#intermediate-articles}

- [इलिक्सिरसह रॉ इथेरियम कॉन्ट्रॅक्ट व्यवहारांवर कसे साइन करावे](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [इथेरियम स्मार्ट कॉन्ट्रॅक्ट्स आणि इलिक्सिर](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## इलिक्सिर प्रोजेक्ट्स आणि टूल्स {#elixir-projects-and-tools}

### सक्रिय {#active}

- [block_keys](https://github.com/ExWeb3/block_keys) - _इलिक्सिरमध्ये BIP32 आणि BIP44 अंमलबजावणी (डिटरमिनिस्टिक वॉलेट्ससाठी मल्टी-अकाउंट हायरार्की)_
- [ethereumex](https://github.com/mana-ethereum/ethereumex) - _इथेरियम ब्लॉकचेनसाठी इलिक्सिर JSON-RPC क्लायंट_
- [ethers](https://github.com/ExWeb3/elixir_ethers) - _इलिक्सिरचा वापर करून इथेरियमवर स्मार्ट कॉन्ट्रॅक्ट्सशी संवाद साधण्यासाठी एक सर्वसमावेशक Web3 लायब्ररी_
- [ethers_kms](https://github.com/ExWeb3/elixir_ethers_kms) - _Ethers साठी एक KMS सायनर लायब्ररी (AWS KMS सह व्यवहारांवर साइन करा)_
- [ex_abi](https://github.com/poanetwork/ex_abi) - _इलिक्सिरमध्ये इथेरियम ABI पार्सर/डीकोडर/एन्कोडर अंमलबजावणी_
- [ex_keccak](https://github.com/ExWeb3/ex_keccak) - _NIF द्वारे तयार केलेल्या tiny-keccak Rust crate चा वापर करून Keccak SHA3-256 हॅशची गणना करण्यासाठी इलिक्सिर लायब्ररी_
- [ex_rlp](https://github.com/mana-ethereum/ex_rlp) - _इथेरियमच्या RLP (रिकर्सिव्ह लेंथ प्रीफिक्स) एन्कोडिंगची इलिक्सिर अंमलबजावणी_

### संग्रहित / आता देखरेख केली जात नाही {#archived--no-longer-maintained}

- [eth](https://hex.pm/packages/eth) - _इलिक्सिरसाठी इथेरियम युटिलिटीज_
- [exw3](https://github.com/hswick/exw3) - _इलिक्सिरसाठी उच्च-स्तरीय इथेरियम RPC क्लायंट_
- [mana](https://github.com/mana-ethereum/mana) - _इलिक्सिरमध्ये लिहिलेली इथेरियम फुल नोड अंमलबजावणी_

अधिक संसाधने शोधत आहात? [आमचे डेव्हलपरचे होम](/developers/) पहा.

## इलिक्सिर समुदाय योगदानकर्ते {#elixir-community-contributors}

[इलिक्सिरचे स्लॅक #ethereum चॅनल](https://elixir-lang.slack.com/archives/C5RPZ3RJL) हे वेगाने वाढणाऱ्या समुदायाचे यजमान आहे आणि वरीलपैकी कोणत्याही प्रोजेक्ट्स आणि संबंधित विषयांवरील चर्चेसाठी समर्पित संसाधन आहे.
