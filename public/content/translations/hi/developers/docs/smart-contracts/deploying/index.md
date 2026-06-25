---
title: "स्मार्ट अनुबंध तैनात करना"
description: "इथेरियम नेटवर्क पर स्मार्ट अनुबंध तैनात करना सीखें, जिसमें पूर्वापेक्षाएँ, टूल और तैनाती के चरण शामिल हैं।"
lang: hi
---

आपको अपने स्मार्ट अनुबंध को इथेरियम नेटवर्क के उपयोगकर्ताओं के लिए उपलब्ध कराने के लिए इसे तैनात करने की आवश्यकता है।

एक स्मार्ट अनुबंध को तैनात करने के लिए, आप बिना किसी प्राप्तकर्ता को निर्दिष्ट किए स्मार्ट अनुबंध के संकलित कोड वाला एक इथेरियम लेन-देन भेजते हैं।

## पूर्वापेक्षाएँ {#prerequisites}

स्मार्ट अनुबंधों को तैनात करने से पहले आपको [इथेरियम नेटवर्क](/developers/docs/networks/), [लेन-देन](/developers/docs/transactions/) और [स्मार्ट अनुबंधों की संरचना](/developers/docs/smart-contracts/anatomy/) को समझना चाहिए।

एक अनुबंध को तैनात करने में ईथर (ETH) भी खर्च होता है क्योंकि वे ब्लॉकचेन पर संग्रहीत होते हैं, इसलिए आपको इथेरियम पर [गैस और शुल्क](/developers/docs/gas/) से परिचित होना चाहिए।

अंत में, आपको अपने अनुबंध को तैनात करने से पहले उसका संकलन करना होगा, इसलिए सुनिश्चित करें कि आपने [स्मार्ट अनुबंधों के संकलन](/developers/docs/smart-contracts/compiling/) के बारे में पढ़ लिया है।

## स्मार्ट अनुबंध कैसे तैनात करें {#how-to-deploy-a-smart-contract}

### आपको क्या चाहिए {#what-youll-need}

- आपके अनुबंध का बाइटकोड – यह [संकलन](/developers/docs/smart-contracts/compiling/) के माध्यम से उत्पन्न होता है
- गैस के लिए ETH – आप अन्य लेन-देन की तरह अपनी गैस सीमा निर्धारित करेंगे, इसलिए ध्यान रखें कि अनुबंध की तैनाती के लिए एक साधारण ETH ट्रांसफर की तुलना में बहुत अधिक गैस की आवश्यकता होती है
- एक तैनाती स्क्रिप्ट या प्लगइन
- एक [इथेरियम नोड](/developers/docs/nodes-and-clients/) तक पहुंच, या तो अपना खुद का चलाकर, किसी सार्वजनिक नोड से जुड़कर, या [नोड सेवा](/developers/docs/nodes-and-clients/nodes-as-a-service/) का उपयोग करके API कुंजी के माध्यम से

### स्मार्ट अनुबंध तैनात करने के चरण {#steps-to-deploy}

इसमें शामिल विशिष्ट चरण संबंधित विकास फ्रेमवर्क पर निर्भर करेंगे। उदाहरण के लिए, आप [अपने अनुबंधों को तैनात करने पर Hardhat के दस्तावेज़](https://hardhat.org/docs/tutorial/deploying) या [स्मार्ट अनुबंध को तैनात करने और सत्यापित करने पर Foundry के दस्तावेज़](https://book.getfoundry.sh/forge/deploying) देख सकते हैं। एक बार तैनात होने के बाद, आपके अनुबंध का अन्य [खातों](/developers/docs/accounts/) की तरह एक इथेरियम पता होगा और इसे [सोर्स कोड सत्यापन टूल](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) का उपयोग करके सत्यापित किया जा सकता है।

## संबंधित टूल {#related-tools}

**Remix - _Remix IDE इथेरियम जैसे ब्लॉकचेन के लिए स्मार्ट अनुबंधों को विकसित करने, तैनात करने और प्रबंधित करने की अनुमति देता है_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 विकास प्लेटफ़ॉर्म जो स्मार्ट अनुबंधों को विकसित करने, परीक्षण करने, निगरानी करने और संचालित करने के लिए डिबगिंग, अवलोकन क्षमता और बुनियादी ढांचा निर्माण ब्लॉक प्रदान करता है_**

- [tenderly.co](https://tenderly.co/)
- [दस्तावेज़](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [डिस्कॉर्ड](https://discord.gg/eCWjuvt)

**Hardhat - _आपके इथेरियम सॉफ़्टवेयर को संकलित करने, तैनात करने, परीक्षण करने और डिबग करने के लिए एक विकास वातावरण_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [अपने अनुबंधों को तैनात करने पर दस्तावेज़](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [डिस्कॉर्ड](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _एक ही कमांड का उपयोग करके किसी भी EVM संगत चेन पर आसानी से कोई भी अनुबंध तैनात करें_**

- [दस्तावेज़ीकरण](https://portal.thirdweb.com/deploy/)

**Crossmint - _स्मार्ट अनुबंधों को तैनात करने, क्रेडिट-कार्ड और क्रॉस चेन भुगतान सक्षम करने, और NFT बनाने, वितरित करने, बेचने, संग्रहीत करने और संपादित करने के लिए API का उपयोग करने के लिए एंटरप्राइज़-ग्रेड Web3 विकास प्लेटफ़ॉर्म।_**

- [crossmint.com](https://www.crossmint.com)
- [दस्तावेज़ीकरण](https://docs.crossmint.com)
- [डिस्कॉर्ड](https://discord.com/invite/crossmint)
- [ब्लॉग](https://blog.crossmint.com)

## संबंधित ट्यूटोरियल {#related-tutorials}

- [अपना पहला स्मार्ट अनुबंध तैनात करना](/developers/tutorials/deploying-your-first-smart-contract/) _– इथेरियम टेस्ट नेटवर्क पर अपना पहला स्मार्ट अनुबंध तैनात करने का परिचय।_
- [हैलो वर्ल्ड | स्मार्ट अनुबंध ट्यूटोरियल](/developers/tutorials/hello-world-smart-contract/) _– इथेरियम पर एक बुनियादी स्मार्ट अनुबंध बनाने और तैनात करने के लिए एक आसान ट्यूटोरियल।_
- [Solidity से अन्य अनुबंधों के साथ इंटरैक्ट करें](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– मौजूदा अनुबंध से स्मार्ट अनुबंध कैसे तैनात करें और उसके साथ कैसे इंटरैक्ट करें।_
- [अपने अनुबंध का आकार कैसे कम करें](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- अपने अनुबंध के आकार को सीमा के भीतर रखने और गैस बचाने के लिए इसे कैसे कम करें_

## आगे की पढ़ाई {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _ओपनजेपेलिन_
- [Hardhat के साथ अपने अनुबंधों को तैनात करना](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_क्या आप किसी ऐसे सामुदायिक संसाधन के बारे में जानते हैं जिसने आपकी मदद की? इस पृष्ठ को संपादित करें और इसे जोड़ें!_

## संबंधित विषय {#related-topics}

- [विकास फ्रेमवर्क](/developers/docs/frameworks/)
- [इथेरियम नोड चलाएं](/developers/docs/nodes-and-clients/run-a-node/)
- [नोड्स-एज़-ए-सर्विस](/developers/docs/nodes-and-clients/nodes-as-a-service)