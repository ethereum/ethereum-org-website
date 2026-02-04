---
title: स्मार्ट कॉन्ट्रॅक्ट्स डिप्लॉय करणे
description: Ethereum नेटवर्क्सवर स्मार्ट कॉन्ट्रॅक्ट्स कसे डिप्लॉय करायचे ते शिका, ज्यामध्ये पूर्वआवश्यकता, साधने आणि डिप्लॉयमेंटच्या पायऱ्या समाविष्ट आहेत.
lang: mr
---

Ethereum नेटवर्कच्या वापरकर्त्यांसाठी तुमचा स्मार्ट कॉन्ट्रॅक्ट उपलब्ध होण्यासाठी तुम्हाला तो डिप्लॉय करणे आवश्यक आहे.

स्मार्ट कॉन्ट्रॅक्ट डिप्लॉय करण्यासाठी, तुम्ही कोणताही प्राप्तकर्ता निर्दिष्ट न करता स्मार्ट कॉन्ट्रॅक्टचा संकलित कोड असलेला Ethereum व्यवहार पाठवता.

## पूर्वतयारी {#prerequisites}

स्मार्ट कॉन्ट्रॅक्ट्स डिप्लॉय करण्यापूर्वी तुम्हाला [Ethereum नेटवर्क्स](/developers/docs/networks/), [व्यवहार](/developers/docs/transactions/) आणि [स्मार्ट कॉन्ट्रॅक्ट्सची रचना](/developers/docs/smart-contracts/anatomy/) समजून घेणे आवश्यक आहे.

कॉन्ट्रॅक्ट डिप्लॉय करण्यासाठी इथर (ETH) देखील खर्च होतो कारण ते ब्लॉकचेनवर साठवले जातात, त्यामुळे तुम्हाला Ethereum वरील [गॅस आणि शुल्क](/developers/docs/gas/) बद्दल माहिती असणे आवश्यक आहे.

शेवटी, तुम्हाला तुमचा कॉन्ट्रॅक्ट डिप्लॉय करण्यापूर्वी तो संकलित करणे आवश्यक आहे, म्हणून तुम्ही [स्मार्ट कॉन्ट्रॅक्ट्स संकलित करणे](/developers/docs/smart-contracts/compiling/) बद्दल वाचले असल्याची खात्री करा.

## स्मार्ट कॉन्ट्रॅक्ट कसा डिप्लॉय करायचा {#how-to-deploy-a-smart-contract}

### तुम्हाला काय लागेल {#what-youll-need}

- तुमच्या कॉन्ट्रॅक्टचा बायकोड – हे [संकलन](/developers/docs/smart-contracts/compiling/) द्वारे तयार केले जाते
- गॅससाठी ETH – तुम्ही इतर व्यवहारांप्रमाणे तुमची गॅस मर्यादा सेट कराल, त्यामुळे लक्षात ठेवा की कॉन्ट्रॅक्ट डिप्लॉयमेंटसाठी साध्या ETH हस्तांतरणापेक्षा खूप जास्त गॅसची आवश्यकता असते
- एक डिप्लॉयमेंट स्क्रिप्ट किंवा प्लगइन
- [Ethereum नोड](/developers/docs/nodes-and-clients/) मध्ये प्रवेश, एकतर तुमचा स्वतःचा चालवून, सार्वजनिक नोडशी कनेक्ट करून, किंवा [नोड सेवा](/developers/docs/nodes-and-clients/nodes-as-a-service/) वापरून API की द्वारे

### स्मार्ट कॉन्ट्रॅक्ट डिप्लॉय करण्याच्या पायऱ्या {#steps-to-deploy}

यात समाविष्ट असलेल्या विशिष्ट पायऱ्या प्रश्नातील डेव्हलपमेंट फ्रेमवर्कवर अवलंबून असतील. उदाहरणार्थ, तुम्ही [तुमचे कॉन्ट्रॅक्ट्स डिप्लॉय करण्यावर Hardhat चे डॉक्युमेंटेशन](https://hardhat.org/docs/tutorial/deploying) किंवा [स्मार्ट कॉन्ट्रॅक्ट डिप्लॉय आणि सत्यापित करण्यावर Foundry चे डॉक्युमेंटेशन](https://book.getfoundry.sh/forge/deploying) पाहू शकता. एकदा डिप्लॉय झाल्यावर, तुमच्या कॉन्ट्रॅक्टला इतर [खात्यांप्रमाणेच](/developers/docs/accounts/) एक Ethereum पत्ता मिळेल आणि [सोर्स कोड व्हेरिफिकेशन टूल्स](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) वापरून ते सत्यापित केले जाऊ शकते.

## संबंधित साधने {#related-tools}

**Remix - _Remix IDE Ethereum सारख्या ब्लॉकचेनसाठी स्मार्ट कॉन्ट्रॅक्ट्स विकसित, डिप्लॉय आणि व्यवस्थापित करण्याची परवानगी देतो_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 डेव्हलपमेंट प्लॅटफॉर्म जो स्मार्ट कॉन्ट्रॅक्ट्स विकसित करणे, चाचणी करणे, निरीक्षण करणे आणि ऑपरेट करण्यासाठी डीबगिंग, निरीक्षणक्षमता आणि पायाभूत सुविधा बिल्डिंग ब्लॉक्स प्रदान करतो_**

- [tenderly.co](https://tenderly.co/)
- [Docs](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _तुमचे Ethereum सॉफ्टवेअर संकलित करणे, डिप्लॉय करणे, चाचणी करणे आणि डीबग करण्यासाठी एक डेव्हलपमेंट वातावरण_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [तुमचे कॉन्ट्रॅक्ट्स डिप्लॉय करण्यावरील डॉक्स](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _एकाच कमांडचा वापर करून, कोणताही कॉन्ट्रॅक्ट कोणत्याही EVM सुसंगत चेनवर सहजपणे डिप्लॉय करा_**

- [डॉक्युमेंटेशन](https://portal.thirdweb.com/deploy/)

**Crossmint - _स्मार्ट कॉन्ट्रॅक्ट्स डिप्लॉय करण्यासाठी, क्रेडिट-कार्ड आणि क्रॉस-चेन पेमेंट सक्षम करण्यासाठी आणि NFTs तयार करण्यासाठी, वितरित करण्यासाठी, विकण्यासाठी, संग्रहित करण्यासाठी आणि संपादित करण्यासाठी APIs वापरण्याकरिता एंटरप्राइझ-ग्रेड वेब3 डेव्हलपमेंट प्लॅटफॉर्म._**

- [crossmint.com](https://www.crossmint.com)
- [दस्तऐवजीकरण](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## संबंधित ट्युटोरियल्स {#related-tutorials}

- [तुमचा पहिला स्मार्ट कॉन्ट्रॅक्ट डिप्लॉय करणे](/developers/tutorials/deploying-your-first-smart-contract/) _– Ethereum चाचणी नेटवर्कवर तुमचा पहिला स्मार्ट कॉन्ट्रॅक्ट डिप्लॉय करण्याची ओळख._
- [हॅलो वर्ल्ड | स्मार्ट कॉन्ट्रॅक्ट ट्यूटोरियल](/developers/tutorials/hello-world-smart-contract/) _– Ethereum वर एक मूलभूत स्मार्ट कॉन्ट्रॅक्ट तयार करण्यासाठी आणि डिप्लॉय करण्यासाठी सोपे ट्यूटोरियल._
- [Solidity वरून इतर करारांशी संवाद साधा](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– विद्यमान करारातून स्मार्ट करार कसा तैनात करायचा आणि त्याच्याशी संवाद कसा साधायचा._
- [तुमच्या कॉन्ट्रॅक्टचा आकार कसा कमी करायचा](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- तुमच्या कॉन्ट्रॅक्टचा आकार मर्यादेत ठेवण्यासाठी आणि गॅसवर बचत करण्यासाठी तो कसा कमी करावा_

## पुढील वाचन {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat सह तुमचे कॉन्ट्रॅक्ट्स डिप्लॉय करणे](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_तुम्हाला मदत केलेल्या सामुदायिक संसाधनाबद्दल माहिती आहे का?_ हे पृष्ठ संपादित करा आणि ते जोडा!_

## संबंधित विषय {#related-topics}

- [डेव्हलपमेंट फ्रेमवर्क्स](/developers/docs/frameworks/)
- [एक Ethereum नोड चालवा](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodes-as-a-service](/developers/docs/nodes-and-clients/nodes-as-a-service)
