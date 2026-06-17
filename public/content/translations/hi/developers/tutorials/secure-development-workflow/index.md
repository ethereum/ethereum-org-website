---
title: स्मार्ट अनुबंध सुरक्षा चेकलिस्ट
description: सुरक्षित स्मार्ट अनुबंध लिखने के लिए एक सुझाई गई कार्यप्रणाली
author: "Trailofbits"
tags:
  - स्मार्ट अनुबंध
  - सुरक्षा
  - solidity
skill: intermediate
breadcrumb: सुरक्षा चेकलिस्ट
lang: hi
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## स्मार्ट अनुबंध विकास चेकलिस्ट {#smart-contract-development-checklist}

यहाँ एक उच्च-स्तरीय प्रक्रिया दी गई है जिसका पालन करने की हम अनुशंसा करते हैं जब आप अपने स्मार्ट अनुबंध लिखते हैं।

ज्ञात सुरक्षा समस्याओं की जाँच करें:

- [स्लिथर](https://github.com/crytic/slither) के साथ अपने अनुबंधों की समीक्षा करें। इसमें सामान्य कमजोरियों के लिए 40 से अधिक अंतर्निहित डिटेक्टर हैं। नए कोड के साथ हर चेक-इन पर इसे चलाएं और सुनिश्चित करें कि इसे एक स्वच्छ रिपोर्ट मिले (या कुछ समस्याओं को शांत करने के लिए ट्राइएज मोड का उपयोग करें)।
- [Crytic](https://crytic.io/) के साथ अपने अनुबंधों की समीक्षा करें। यह 50 ऐसी समस्याओं की जाँच करता है जो स्लिथर नहीं करता। Crytic आपकी टीम को एक-दूसरे के साथ तालमेल बिठाने में भी मदद कर सकता है, क्योंकि यह GitHub पर पुल रिक्वेस्ट (Pull Requests) में सुरक्षा समस्याओं को आसानी से सामने लाता है।

अपने अनुबंध की विशेष विशेषताओं पर विचार करें:

- क्या आपके अनुबंध अपग्रेड करने योग्य हैं? [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) या [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/) के साथ खामियों के लिए अपने अपग्रेडेबिलिटी कोड की समीक्षा करें। हमने 17 ऐसे तरीकों का दस्तावेजीकरण किया है जिनसे अपग्रेड गलत दिशा में जा सकते हैं।
- क्या आपके अनुबंध ERCs के अनुरूप होने का दावा करते हैं? उन्हें [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) के साथ जांचें। यह टूल तुरंत छह सामान्य विशिष्टताओं (specs) से विचलन की पहचान करता है।
- क्या आप थर्ड-पार्टी टोकन के साथ एकीकृत करते हैं? बाहरी अनुबंधों पर भरोसा करने से पहले हमारी [टोकन एकीकरण चेकलिस्ट](/developers/tutorials/token-integration-checklist/) की समीक्षा करें।

अपने कोड की महत्वपूर्ण सुरक्षा विशेषताओं का दृश्य रूप से निरीक्षण करें:

- स्लिथर के [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) प्रिंटर की समीक्षा करें। अनजाने में होने वाली शैडोइंग (shadowing) और C3 लीनियराइजेशन (linearization) समस्याओं से बचें।
- स्लिथर के [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) प्रिंटर की समीक्षा करें। यह फ़ंक्शन दृश्यता (visibility) और एक्सेस नियंत्रणों की रिपोर्ट करता है।
- स्लिथर के [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) प्रिंटर की समीक्षा करें। यह स्थिति (state) चर (variables) पर एक्सेस नियंत्रणों की रिपोर्ट करता है।

महत्वपूर्ण सुरक्षा गुणों का दस्तावेजीकरण करें और उनका मूल्यांकन करने के लिए स्वचालित परीक्षण जनरेटर का उपयोग करें:

- [अपने कोड के लिए सुरक्षा गुणों का दस्तावेजीकरण करना](/developers/tutorials/guide-to-smart-contract-security-tools/) सीखें। यह शुरुआत में कठिन होता है, लेकिन एक अच्छा परिणाम प्राप्त करने के लिए यह सबसे महत्वपूर्ण गतिविधि है। यह इस ट्यूटोरियल में किसी भी उन्नत तकनीक का उपयोग करने के लिए एक पूर्व शर्त भी है।
- [एकिड्ना](https://github.com/crytic/echidna) और [मैन्टिकोर](https://manticore.readthedocs.io/en/latest/verifier.html) के साथ उपयोग के लिए, Solidity में सुरक्षा गुणों को परिभाषित करें। अपनी स्थिति मशीन (state machine), एक्सेस नियंत्रण, अंकगणितीय संचालन, बाहरी इंटरैक्शन और मानकों के अनुरूपता पर ध्यान केंद्रित करें।
- [स्लिथर के Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) के साथ सुरक्षा गुणों को परिभाषित करें। इनहेरिटेंस, चर (variable) निर्भरता, एक्सेस नियंत्रण और अन्य संरचनात्मक समस्याओं पर ध्यान केंद्रित करें।
- [Crytic](https://crytic.io) के साथ हर कमिट पर अपने प्रॉपर्टी परीक्षण चलाएं। Crytic सुरक्षा प्रॉपर्टी परीक्षणों का उपभोग और मूल्यांकन कर सकता है ताकि आपकी टीम का हर व्यक्ति आसानी से देख सके कि वे GitHub पर पास हो गए हैं। विफल परीक्षण कमिट को रोक सकते हैं।

अंत में, उन समस्याओं के प्रति सचेत रहें जिन्हें स्वचालित टूल आसानी से नहीं खोज सकते:

- गोपनीयता की कमी: जब आपके लेन-देन पूल में कतारबद्ध होते हैं तो हर कोई उन्हें देख सकता है
- फ्रंट रनिंग (Front running) लेन-देन
- क्रिप्टोग्राफ़िक संचालन
- बाहरी विकेंद्रीकृत वित्त (DeFi) घटकों के साथ जोखिम भरे इंटरैक्शन

## मदद मांगें {#ask-for-help}

[इथेरियम ऑफिस आवर्स](https://calendly.com/dan-trailofbits/office-hours) हर मंगलवार दोपहर को चलते हैं। ये 1-घंटे के, 1-ऑन-1 सत्र सुरक्षा के बारे में आपके किसी भी प्रश्न को पूछने, हमारे टूल का उपयोग करके समस्या निवारण करने और आपके वर्तमान दृष्टिकोण के बारे में विशेषज्ञों से प्रतिक्रिया प्राप्त करने का अवसर हैं। हम इस गाइड के माध्यम से काम करने में आपकी मदद करेंगे।

हमारे Slack से जुड़ें: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw)। यदि आपके कोई प्रश्न हैं तो हम हमेशा #crytic और #ethereum चैनलों में उपलब्ध हैं।