---
title: स्मार्ट अनुबंधों को परिनियोजित करना
description: जानें कि एथेरियम नेटवर्क पर स्मार्ट अनुबंध कैसे परिनियोजित करें, जिसमें पूर्वापेक्षाएँ, उपकरण और परिनियोजन चरण शामिल हैं।
lang: hi
---

एथेरियम नेटवर्क के यूज़र के लिए उपलब्ध होने के लिए आपको अपने स्मार्ट अनुबंध को परिनियोजित करने की आवश्यकता है।

एक स्मार्ट अनुबंध को परिनियोजित करने के लिए, आप केवल एक एथेरियम लेनदेन भेजते हैं जिसमें किसी भी प्राप्तकर्ता को निर्दिष्ट किए बिना स्मार्ट अनुबंध का संकलित कोड होता है।

## पूर्वापेक्षाएं {#prerequisites}

स्मार्ट अनुबंधों को परिनियोजित करने से पहले आपको [एथेरियम नेटवर्क](/developers/docs/networks/), [लेनदेन](/developers/docs/transactions/) और [स्मार्ट अनुबंधों की संरचना](/developers/docs/smart-contracts/anatomy/) को समझना चाहिए।

एक अनुबंध को परिनियोजित करने में ईथर (ETH) भी खर्च होता है क्योंकि वे ब्लॉकचेन पर संग्रहीत होते हैं, इसलिए आपको एथेरियम पर [गैस और शुल्क](/developers/docs/gas/) से परिचित होना चाहिए।

अंत में, आपको इसे परिनियोजित करने से पहले अपने अनुबंध को संकलित करने की आवश्यकता होगी, इसलिए सुनिश्चित करें कि आपने [स्मार्ट अनुबंधों को संकलित करने](/developers/docs/smart-contracts/compiling/) के बारे में पढ़ा है।

## स्मार्ट अनुबंध कैसे परिनियोजित करें {#how-to-deploy-a-smart-contract}

### आपको क्या चाहिए होगा {#what-youll-need}

- आपके अनुबंध का बाइटकोड – यह [संकलन](/developers/docs/smart-contracts/compiling/) के माध्यम से उत्पन्न होता है
- गैस के लिए ETH – आप अन्य लेनदेन की तरह अपनी गैस सीमा निर्धारित करेंगे, इसलिए ध्यान रखें कि अनुबंध परिनियोजन को एक साधारण ETH हस्तांतरण की तुलना में बहुत अधिक गैस की आवश्यकता होती है
- एक परिनियोजन स्क्रिप्ट या प्लगइन
- [एथेरियम नोड](/developers/docs/nodes-and-clients/) तक पहुंच, या तो अपना खुद का चलाकर, किसी सार्वजनिक नोड से जुड़कर, या [नोड सेवा](/developers/docs/nodes-and-clients/nodes-as-a-service/) का उपयोग करके एपीआई कुंजी के माध्यम से।

### स्मार्ट अनुबंध परिनियोजित करने के चरण {#steps-to-deploy}

इसमें शामिल विशिष्ट चरण प्रश्नगत विकास ढांचे पर निर्भर करेंगे। उदाहरण के लिए, आप [अपने अनुबंधों को परिनियोजित करने पर Hardhat का प्रलेखन](https://hardhat.org/docs/tutorial/deploying) या [एक स्मार्ट अनुबंध को परिनियोजित करने और सत्यापित करने पर Foundry का प्रलेखन](https://book.getfoundry.sh/forge/deploying) देख सकते हैं। एक बार परिनियोजित होने के बाद, आपके अनुबंध का अन्य [खातों](/developers/docs/accounts/) की तरह एक एथेरियम पता होगा और इसे [स्रोत कोड सत्यापन उपकरणों](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) का उपयोग करके सत्यापित किया जा सकता है।

## संबंधित उपकरण {#related-tools}

**Remix - _Remix IDE एथेरियम जैसी ब्लॉकचेन के लिए स्मार्ट अनुबंधों को विकसित करने, परिनियोजित करने और प्रशासित करने की अनुमति देता है_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 विकास प्लेटफ़ॉर्म जो स्मार्ट अनुबंधों के विकास, परीक्षण, निगरानी और संचालन के लिए डीबगिंग, अवलोकन क्षमता और बुनियादी ढांचे के बिल्डिंग ब्लॉक प्रदान करता है_**

- [tenderly.co](https://tenderly.co/)
- [दस्तावेज़](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _आपके एथेरियम सॉफ्टवेयर को संकलित करने, परिनियोजित करने, परीक्षण करने और डीबग करने के लिए एक विकास परिवेश_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [अपने अनुबंधों को परिनियोजित करने पर दस्तावेज़](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _एकल कमांड का उपयोग करके किसी भी EVM संगत श्रृंखला में किसी भी अनुबंध को आसानी से परिनियोजित करें_**

- [प्रलेखन](https://portal.thirdweb.com/deploy/)

**Crossmint - _स्मार्ट अनुबंधों को परिनियोजित करने, क्रेडिट-कार्ड और क्रॉस-चेन भुगतानों को सक्षम करने, और एनएफटी बनाने, वितरित करने, बेचने, स्टोर करने और संपादित करने के लिए एपीआई का उपयोग करने के लिए एंटरप्राइज-ग्रेड वेब3 विकास प्लेटफॉर्म।_**

- [crossmint.com](https://www.crossmint.com)
- [प्रलेखन](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [ब्लॉग](https://blog.crossmint.com)

## संबंधित ट्यूटोरियल {#related-tutorials}

- [अपना पहला स्मार्ट अनुबंध परिनियोजित करना](/developers/tutorials/deploying-your-first-smart-contract/) _– एथेरियम टेस्टनेट पर अपना पहला स्मार्ट अनुबंध परिनियोजित करने का परिचय।_
- [हैलो वर्ल्ड | स्मार्ट अनुबंध ट्यूटोरियल](/developers/tutorials/hello-world-smart-contract/) _– एथेरियम पर एक बुनियादी स्मार्ट अनुबंध बनाने और परिनियोजित करने के लिए एक आसान ट्यूटोरियल।_
- [Solidity से अन्य अनुबंधों के साथ इंटरैक्ट करें](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– मौजूदा अनुबंध से स्मार्ट अनुबंध कैसे परिनियोजित करें और इसके साथ इंटरैक्ट करें।_
- [अपने अनुबंध का आकार कैसे कम करें](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- गैस पर बचत करने और इसे सीमा के भीतर रखने के लिए अपने अनुबंध का आकार कैसे कम करें_

## आगे की रीडिंग {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat के साथ अपने अनुबंधों को परिनियोजित करना](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_क्या आप किसी सामुदायिक संसाधन के बारे में जानते हैं जिसने आपकी मदद की हो? इस पृष्ठ को संपादित करें और इसे जोड़ें!_

## संबंधित विषय {#related-topics}

- [डेवलपमेंट फ्रेमवर्क](/developers/docs/frameworks/)
- [एक एथेरियम नोड चलाएं](/developers/docs/nodes-and-clients/run-a-node/)
- [नोड्स-एज़-ए-सर्विस](/developers/docs/nodes-and-clients/nodes-as-a-service)
