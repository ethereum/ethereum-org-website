---
title: Elixir डेवलपर्स के लिए इथेरियम
description: Elixir-आधारित प्रोजेक्ट्स और टूलिंग का उपयोग करके इथेरियम के लिए विकास करना सीखें।
lang: hi
incomplete: false
---

<FeaturedText>Elixir-आधारित प्रोजेक्ट्स और टूलिंग का उपयोग करके इथेरियम के लिए विकास करना सीखें।</FeaturedText>

क्रिप्टोकरेंसी और ब्लॉकचेन तकनीक के लाभों का उपयोग करने वाले विकेंद्रीकृत एप्लिकेशन (dapp) बनाने के लिए इथेरियम का उपयोग करें। ये dapp विश्वासहीन हो सकते हैं, जिसका अर्थ है कि एक बार जब वे इथेरियम पर तैनात हो जाते हैं, तो वे हमेशा प्रोग्राम किए गए अनुसार ही चलेंगे। वे नए प्रकार के वित्तीय एप्लिकेशन बनाने के लिए डिजिटल संपत्तियों को नियंत्रित कर सकते हैं। वे विकेंद्रीकृत हो सकते हैं, जिसका अर्थ है कि कोई भी एकल संस्था या व्यक्ति उन्हें नियंत्रित नहीं करता है और उन्हें सेंसर करना लगभग असंभव है।

## स्मार्ट अनुबंध और Solidity भाषा के साथ शुरुआत करना {#getting-started-with-smart-contracts-and-solidity}

**Elixir को इथेरियम के साथ एकीकृत करने के लिए अपने पहले कदम उठाएं**

क्या पहले अधिक बुनियादी जानकारी की आवश्यकता है? [ethereum.org/learn](/learn/) या [ethereum.org/developers](/developers/) देखें।

- [ब्लॉकचेन की व्याख्या](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट अनुबंधों को समझना](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [अपना पहला स्मार्ट अनुबंध लिखें](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity को संकलित और तैनात करना सीखें](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## शुरुआती लेख {#beginner-articles}

- [अंततः इथेरियम खातों को समझना](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [Ethers — Elixir के लिए एक प्रथम श्रेणी की इथेरियम Web3 लाइब्रेरी](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## मध्यवर्ती लेख {#intermediate-articles}

- [Elixir के साथ कच्चे इथेरियम अनुबंध लेनदेन पर हस्ताक्षर कैसे करें](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [इथेरियम स्मार्ट अनुबंध और Elixir](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## Elixir प्रोजेक्ट्स और टूल्स {#elixir-projects-and-tools}

### सक्रिय {#active}

- [block_keys](https://github.com/ExWeb3/block_keys) - _Elixir में BIP32 और BIP44 कार्यान्वयन (नियतात्मक वॉलेट्स के लिए बहु-खाता पदानुक्रम)_
- [ethereumex](https://github.com/mana-ethereum/ethereumex) - _इथेरियम ब्लॉकचेन के लिए Elixir जेसन-आरपीसी क्लाइंट_
- [ethers](https://github.com/ExWeb3/elixir_ethers) - _Elixir का उपयोग करके इथेरियम पर स्मार्ट अनुबंधों के साथ बातचीत करने के लिए एक व्यापक Web3 लाइब्रेरी_
- [ethers_kms](https://github.com/ExWeb3/elixir_ethers_kms) - _Ethers के लिए एक KMS हस्ताक्षरकर्ता लाइब्रेरी (AWS KMS के साथ लेनदेन पर हस्ताक्षर करें)_
- [ex_abi](https://github.com/poanetwork/ex_abi) - _Elixir में इथेरियम ABI पार्सर/डिकोडर/एनकोडर कार्यान्वयन_
- [ex_keccak](https://github.com/ExWeb3/ex_keccak) - _NIF निर्मित tiny-keccak Rust क्रेट का उपयोग करके Keccak SHA3-256 हैश की गणना करने के लिए Elixir लाइब्रेरी_
- [ex_rlp](https://github.com/mana-ethereum/ex_rlp) - _इथेरियम की RLP (रिकर्सिव लेंथ प्रीफिक्स) एन्कोडिंग का Elixir कार्यान्वयन_

### संग्रहीत / अब अनुरक्षित नहीं {#archived--no-longer-maintained}

- [eth](https://hex.pm/packages/eth) - _Elixir के लिए इथेरियम उपयोगिताएँ_
- [exw3](https://github.com/hswick/exw3) - _Elixir के लिए उच्च स्तरीय इथेरियम RPC क्लाइंट_
- [mana](https://github.com/mana-ethereum/mana) - _Elixir में लिखा गया इथेरियम पूर्ण नोड कार्यान्वयन_

क्या आप और अधिक संसाधनों की तलाश में हैं? [हमारा डेवलपर होम](/developers/) देखें।

## Elixir समुदाय के योगदानकर्ता {#elixir-community-contributors}

[Elixir का Slack #ethereum चैनल](https://elixir-lang.slack.com/archives/C5RPZ3RJL) तेजी से बढ़ते समुदाय का मेजबान है और उपरोक्त किसी भी प्रोजेक्ट और संबंधित विषयों पर चर्चा के लिए एक समर्पित संसाधन है।