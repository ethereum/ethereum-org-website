---
title: JavaScript डेव्हलपर्ससाठी Ethereum
description: JavaScript-आधारित प्रकल्प आणि टूलिंग वापरून Ethereum साठी कसे डेव्हलप करावे ते शिका.
lang: mr
---

Ethereum इकोसिस्टममधील सर्वात लोकप्रिय भाषांपैकी JavaScript ही एक आहे. खरं तर, शक्य तितके Ethereum JavaScript वर आणण्यासाठी समर्पित एक [टीम](https://github.com/ethereumjs) आहे.

[स्टॅकच्या सर्व स्तरांवर](/developers/docs/ethereum-stack/) JavaScript (किंवा तत्सम काही) लिहिण्याच्या संधी आहेत.

## Ethereum सह संवाद साधा {#interact-with-ethereum}

### JavaScript API लायब्ररीज {#javascript-api-libraries}

तुम्हाला ब्लॉकचेनची क्वेरी करण्यासाठी, व्यवहार पाठवण्यासाठी आणि बरेच काही करण्यासाठी JavaScript लिहायचे असल्यास, हे करण्याचा सर्वात सोयीस्कर मार्ग म्हणजे [JavaScript API लायब्ररी](/developers/docs/apis/javascript/) वापरणे. हे APIs डेव्हलपर्सना [Ethereum नेटवर्कमधील नोड्ससोबत](/developers/docs/nodes-and-clients/) सहजपणे संवाद साधण्याची परवानगी देतात.

तुम्ही Ethereum वरील स्मार्ट कॉन्ट्रॅक्ट्सशी संवाद साधण्यासाठी या लायब्ररींचा वापर करू शकता, त्यामुळे असे dapp तयार करणे शक्य आहे जिथे तुम्ही आधीपासून अस्तित्वात असलेल्या कॉन्ट्रॅक्ट्सशी संवाद साधण्यासाठी फक्त JavaScript वापरता.

**पहा**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _यामध्ये JavaScript आणि TypeScript मधील Ethereum वॉलेट अंमलबजावणी आणि युटिलिटीजचा समावेश आहे._
- [viem](https://viem.sh) – _Ethereum साठी एक TypeScript इंटरफेस जो Ethereum सह संवाद साधण्यासाठी लो-लेव्हल स्टेटलेस प्रिमिटीव्ह प्रदान करतो._
- [Drift](https://ryangoree.github.io/drift/) – _बिल्ट-इन कॅशिंग, हुक्स आणि टेस्ट मॉक्स असलेली एक TypeScript मेटा-लायब्ररी जी वेब3 लायब्ररीजमध्ये सहज Ethereum डेव्हलपमेंटसाठी आहे._

### स्मार्ट कॉन्ट्रॅक्ट्स {#smart-contracts}

तुम्ही JavaScript डेव्हलपर असाल आणि तुम्हाला तुमचा स्वतःचा स्मार्ट कॉन्ट्रॅक्ट लिहायचा असेल, तर तुम्ही [Solidity](https://solidity.readthedocs.io) शी परिचित होऊ शकता. ही सर्वात लोकप्रिय स्मार्ट कॉन्ट्रॅक्ट भाषा आहे आणि ती सिंटॅक्टिकली JavaScript सारखी आहे, ज्यामुळे ती शिकायला सोपी जाऊ शकते.

[स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/) बद्दल अधिक.

## प्रोटोकॉल समजून घ्या {#understand-the-protocol}

### Ethereum व्हर्च्युअल मशीन {#the-ethereum-virtual-machine}

[Ethereum च्या व्हर्च्युअल मशीनची](/developers/docs/evm/) एक JavaScript अंमलबजावणी आहे. हे नवीनतम फोर्क नियमांना समर्थन देते. फोर्क नियम म्हणजे नियोजित अपग्रेड्सच्या परिणामी EVM मध्ये केलेले बदल.

हे विविध JavaScript पॅकेजेसमध्ये विभागलेले आहे जे तुम्ही अधिक चांगल्या प्रकारे समजून घेण्यासाठी तपासू शकता:

- खाती
- ब्लॉक
- ब्लॉकचेन स्वतः
- व्यवहार
- आणि बरेच काही...

यामुळे तुम्हाला "एखाद्या अकाउंटची डेटा स्ट्रक्चर काय आहे?" यासारख्या गोष्टी समजायला मदत होईल.

तुम्हाला कोड वाचायला आवडत असेल, तर आमचे डॉक्स वाचण्याऐवजी हे JavaScript एक उत्तम पर्याय असू शकते.

**EVM पहा**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### नोड्स आणि क्लायंट्स {#nodes-and-clients}

एक Ethereumjs क्लायंट सक्रिय डेव्हलपमेंटमध्ये आहे जो तुम्हाला Ethereum क्लायंट कसे काम करतात हे तुम्हाला समजणाऱ्या भाषेत; JavaScript मध्ये खोलवर पाहू देतो!

**क्लायंट पहा**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## इतर प्रकल्प {#other-projects}

Ethereum JavaScript च्या जगात अजूनही बऱ्याच गोष्टी चालू आहेत, ज्यात खालील गोष्टींचा समावेश आहे:

- वॉलेट युटिलिटीजच्या लायब्ररीज.
- Ethereum कीज उत्पन्न करण्यासाठी, आयात करण्यासाठी आणि निर्यात करण्यासाठी साधने.
- `merkle-patricia-tree` ची एक अंमलबजावणी – Ethereum यलो पेपरमध्ये वर्णन केलेली एक डेटा स्ट्रक्चर.

[EthereumJS रेपो](https://github.com/ethereumjs) वर तुम्हाला सर्वात जास्त आवड असलेल्या गोष्टीत खोलवर जा

## पुढील वाचन {#further-reading}

_तुम्हाला मदत केलेल्या सामुदायिक संसाधनाबद्दल माहिती आहे का?_ हे पृष्ठ संपादित करा आणि ते जोडा!_
