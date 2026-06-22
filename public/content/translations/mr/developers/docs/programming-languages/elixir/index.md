---
title: "Elixir डेव्हलपर्ससाठी इथेरियम"
description: "Elixir-आधारित प्रोजेक्ट्स आणि टूलिंग वापरून इथेरियमसाठी डेव्हलपमेंट कशी करावी हे शिका."
lang: mr
incomplete: false
---

<FeaturedText>Elixir-आधारित प्रोजेक्ट्स आणि टूलिंग वापरून इथेरियमसाठी डेव्हलपमेंट कशी करावी हे शिका.</FeaturedText>

क्रिप्टोकरन्सी आणि ब्लॉकचेन तंत्रज्ञानाच्या फायद्यांचा वापर करणारे विकेंद्रित ॲप्लिकेशन्स (किंवा "dapps") तयार करण्यासाठी इथेरियमचा वापर करा. हे dapps विश्वासरहित असू शकतात, याचा अर्थ असा की एकदा ते इथेरियमवर प्रस्थापित केले की, ते नेहमी प्रोग्राम केल्याप्रमाणेच चालतील. नवीन प्रकारचे आर्थिक ॲप्लिकेशन्स तयार करण्यासाठी ते डिजिटल मालमत्ता नियंत्रित करू शकतात. ते विकेंद्रित असू शकतात, याचा अर्थ असा की कोणतीही एक संस्था किंवा व्यक्ती त्यांना नियंत्रित करत नाही आणि त्यांना सेन्सॉर करणे जवळजवळ अशक्य आहे.

## स्मार्ट कॉन्ट्रॅक्ट्स आणि Solidity भाषेशी सुरुवात करणे {#getting-started-with-smart-contracts-and-solidity}

**Elixir ला इथेरियमसोबत इंटिग्रेट करण्यासाठी तुमची पहिली पावले उचला**

आधी अधिक मूलभूत माहिती हवी आहे का? [ethereum.org/learn](/learn/) किंवा [ethereum.org/developers](/developers/) तपासा.

- [ब्लॉकचेनचे स्पष्टीकरण](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट कॉन्ट्रॅक्ट्स समजून घेणे](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [तुमचा पहिला स्मार्ट कॉन्ट्रॅक्ट लिहा](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity कंपाईल आणि प्रस्थापित कसे करावे ते शिका](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## नवशिक्यांसाठी लेख {#beginner-articles}

- [अखेर इथेरियम खाती समजून घेणे](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [Ethers — Elixir साठी एक फर्स्ट-क्लास इथेरियम Web3 लायब्ररी](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## मध्यम स्तरावरील लेख {#intermediate-articles}

- [Elixir सह रॉ इथेरियम कॉन्ट्रॅक्ट ट्रान्झॅक्शन्स साईन कसे करावे](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [इथेरियम स्मार्ट कॉन्ट्रॅक्ट्स आणि Elixir](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## Elixir प्रोजेक्ट्स आणि टूल्स {#elixir-projects-and-tools}

### सक्रिय {#active}

- [block_keys](https://github.com/ExWeb3/block_keys) - _Elixir मध्ये BIP32 आणि BIP44 ची अंमलबजावणी (डिटरमिनिस्टिक वॉलेट्ससाठी मल्टी-अकाउंट हायरार्की)_
- [ethereumex](https://github.com/mana-ethereum/ethereumex) - _इथेरियम ब्लॉकचेनसाठी Elixir जेसॉन-आरपीसी क्लायंट_
- [ethers](https://github.com/ExWeb3/elixir_ethers) - _Elixir वापरून इथेरियमवरील स्मार्ट कॉन्ट्रॅक्ट्सशी संवाद साधण्यासाठी एक सर्वसमावेशक Web3 लायब्ररी_
- [ethers_kms](https://github.com/ExWeb3/elixir_ethers_kms) - _Ethers साठी एक KMS सायनर लायब्ररी (AWS KMS सह ट्रान्झॅक्शन्स साईन करा)_
- [ex_abi](https://github.com/poanetwork/ex_abi) - _Elixir मध्ये इथेरियम ABI पार्सर/डिकोडर/एनकोडरची अंमलबजावणी_
- [ex_keccak](https://github.com/ExWeb3/ex_keccak) - _NIF बिल्ट tiny-keccak Rust क्रेट वापरून Keccak SHA3-256 हॅशेस मोजण्यासाठी Elixir लायब्ररी_
- [ex_rlp](https://github.com/mana-ethereum/ex_rlp) - _इथेरियमच्या RLP (Recursive Length Prefix) एनकोडिंगची Elixir अंमलबजावणी_

### संग्रहित / आता देखभाल केली जात नाही {#archived--no-longer-maintained}

- [eth](https://hex.pm/packages/eth) - _Elixir साठी इथेरियम युटिलिटीज_
- [exw3](https://github.com/hswick/exw3) - _Elixir साठी हाय लेव्हल इथेरियम RPC क्लायंट_
- [mana](https://github.com/mana-ethereum/mana) - _Elixir मध्ये लिहिलेली इथेरियम पूर्ण नोड अंमलबजावणी_

आणखी संसाधने शोधत आहात? [आमचे डेव्हलपर होम](/developers/) तपासा.

## Elixir कम्युनिटी योगदानकर्ते {#elixir-community-contributors}

[Elixir चे Slack #ethereum चॅनेल](https://elixir-lang.slack.com/archives/C5RPZ3RJL) हे वेगाने वाढणाऱ्या कम्युनिटीचे यजमान आहे आणि वरीलपैकी कोणत्याही प्रोजेक्ट्स आणि संबंधित विषयांवरील चर्चेसाठी एक समर्पित संसाधन आहे.