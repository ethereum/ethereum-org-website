---
title: "Elixir डेवलपर्स के लिए Ethereum"
description: "Elixir-आधारित परियोजनाओं और टूलिंग का उपयोग करके Ethereum के लिए विकसित करना सीखें।"
lang: hi
incomplete: false
---

<FeaturedText>Elixir-आधारित परियोजनाओं और टूलिंग का उपयोग करके Ethereum के लिए विकसित करना सीखें।</FeaturedText>

विकेन्द्रीकृत अनुप्रयोगों (या "डैप्स") बनाने के लिए इथिरीयम का उपयोग करें जो क्रिप्टोक्यूरेंसी और ब्लॉकचैन तकनीक के लाभों का उपयोग करते हैं। ये डैप्स भरोसेमंद हो सकते हैं, जिसका अर्थ है कि एक बार जब वे एथेरियम में तैनात हो जाते हैं, तो वे हमेशा प्रोग्राम किए गए अनुसार चलेंगे। वे नए प्रकार के वित्तीय अनुप्रयोग बनाने के लिए डिजिटल संपत्ति को नियंत्रित कर सकते हैं। उन्हें विकेंद्रीकृत किया जा सकता है, जिसका अर्थ है कि कोई एकल इकाई या व्यक्ति उन्हें नियंत्रित नहीं करता है और सेंसर के लिए लगभग असंभव है।

## स्मार्ट अनुबंधों और सॉलिडिटी भाषा के साथ आरंभ करना {#getting-started-with-smart-contracts-and-solidity}

**Elixir को Ethereum के साथ एकीकृत करने के लिए अपने पहले कदम उठाएँ**

पहले एक और बुनियादी प्राइमर की आवश्यकता है? [ethereum.org/learn](/learn/) या [ethereum.org/developers](/developers/) देखें।

- [ब्लॉकचेन समझाया गया](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट अनुबंधों को समझना](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [अपना पहला स्मार्ट अनुबंध लिखें](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [सॉलिडिटी को कंपाइल और डिप्लॉय करना सीखें](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## शुरुआती लेख {#beginner-articles}

- [Ethereum खातों को आखिरकार समझना](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [Ethers — Elixir के लिए एक प्रथम श्रेणी की Ethereum Web3 लाइब्रेरी](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## मध्यवर्ती लेख {#intermediate-articles}

- [Elixir के साथ रॉ Ethereum अनुबंध लेनदेन पर हस्ताक्षर कैसे करें](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [Ethereum स्मार्ट अनुबंध और Elixir](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## Elixir परियोजनाएँ और उपकरण {#elixir-projects-and-tools}

### सक्रिय {#active}

- [block_keys](https://github.com/ExWeb3/block_keys) - _Elixir में BIP32 और BIP44 कार्यान्वयन (डिटर्मिनिस्टिक वॉलेट्स के लिए मल्टी-अकाउंट पदानुक्रम)_
- [ethereumex](https://github.com/mana-ethereum/ethereumex) - _Ethereum ब्लॉकचेन के लिए Elixir JSON-RPC क्लाइंट_
- [ethers](https://github.com/ExWeb3/elixir_ethers) - _Elixir का उपयोग करके Ethereum पर स्मार्ट अनुबंधों के साथ इंटरैक्ट करने के लिए एक व्यापक Web3 लाइब्रेरी_
- [ethers_kms](https://github.com/ExWeb3/elixir_ethers_kms) - _Ethers के लिए एक KMS साइनर लाइब्रेरी (AWS KMS के साथ लेनदेन पर हस्ताक्षर करें)_
- [ex_abi](https://github.com/poanetwork/ex_abi) - _Elixir में Ethereum ABI पार्सर/डिकोडर/एनकोडर कार्यान्वयन_
- [ex_keccak](https://github.com/ExWeb3/ex_keccak) - _एक NIF निर्मित tiny-keccak Rust क्रेट का उपयोग करके Keccak SHA3-256 हैश की गणना के लिए Elixir लाइब्रेरी_
- [ex_rlp](https://github.com/mana-ethereum/ex_rlp) - _Ethereum के RLP (रिकर्सिव लेंथ प्रीफ़िक्स) एन्कोडिंग का Elixir कार्यान्वयन_

### संग्रहीत / अब रखरखाव नहीं किया जाता {#archived--no-longer-maintained}

- [eth](https://hex.pm/packages/eth) - _Elixir के लिए Ethereum यूटिलिटीज_
- [exw3](https://github.com/hswick/exw3) - _Elixir के लिए उच्च-स्तरीय Ethereum RPC क्लाइंट_
- [mana](https://github.com/mana-ethereum/mana) - _Elixir में लिखा गया Ethereum फुल नोड कार्यान्वयन_

अधिक संसाधनों की तलाश है? हमारे [डेवलपर का होम पेज](/developers/) देखें।

## Elixir समुदाय के योगदानकर्ता {#elixir-community-contributors}

[Elixir का स्लैक #ethereum चैनल](https://elixir-lang.slack.com/archives/C5RPZ3RJL) एक तेजी से बढ़ते समुदाय का मेजबान है और उपरोक्त किसी भी परियोजना और संबंधित विषयों पर चर्चा के लिए समर्पित संसाधन है।
