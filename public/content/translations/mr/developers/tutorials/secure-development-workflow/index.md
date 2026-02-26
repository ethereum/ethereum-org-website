---
title: "Smart contract सुरक्षा तपासणीसूची"
description: "सुरक्षित smart contracts लिहिण्यासाठी एक सुचवलेला कार्यप्रवाह"
author: "Trailofbits"
tags: [ "स्मार्ट कॉन्ट्रॅक्ट", "सुरक्षा", "सॉलिडिटी" ]
skill: intermediate
lang: mr
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Smart contract विकास तपासणीसूची {#smart-contract-development-checklist}

तुम्ही तुमचे smart contracts लिहित असताना आम्ही खालील उच्च-स्तरीय प्रक्रियेचे पालन करण्याची शिफारस करतो.

ज्ञात सुरक्षा समस्यांसाठी तपासा:

- [Slither](https://github.com/crytic/slither) सह तुमच्या contracts चे पुनरावलोकन करा. त्यात सामान्य असुरक्षिततांसाठी 40 पेक्षा जास्त अंगभूत डिटेक्टर्स आहेत. नवीन code सह प्रत्येक चेक-इनवर ते चालवा आणि खात्री करा की त्याला स्वच्छ अहवाल मिळेल (किंवा विशिष्ट समस्या शांत करण्यासाठी ट्रायज मोड वापरा).
- [Crytic](https://crytic.io/) सह तुमच्या contracts चे पुनरावलोकन करा. हे अशा 50 समस्या तपासते ज्या Slither तपासत नाही. GitHub वरील Pull Requests मध्ये सुरक्षा समस्या सहजपणे समोर आणून, Crytic तुमच्या टीमला एकमेकांच्या कामावर लक्ष ठेवण्यास देखील मदत करू शकते.

तुमच्या contract च्या विशेष वैशिष्ट्यांचा विचार करा:

- तुमचे contracts अपग्रेड करण्यायोग्य आहेत का? [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) किंवा [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/) सह तुमच्या अपग्रेडेबिलिटी code मधील त्रुटींचे पुनरावलोकन करा. आम्ही 17 मार्ग दस्तऐवजीकरण केले आहेत ज्यामुळे अपग्रेड्समध्ये समस्या येऊ शकतात.
- तुमचे contracts ERCs चे पालन करण्याचा दावा करतात का? [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) सह ते तपासा. हे टूल सहा सामान्य स्पेसिफिकेशन्समधील विचलन त्वरित ओळखते.
- तुम्ही थर्ड पार्टी tokens सह इंटिग्रेट करता का? बाह्य contracts वर अवलंबून राहण्यापूर्वी आमची [token इंटिग्रेशन तपासणीसूची](/developers/tutorials/token-integration-checklist/) तपासा.

तुमच्या code ची महत्त्वपूर्ण सुरक्षा वैशिष्ट्ये दृष्यदृष्ट्या तपासा:

- Slither च्या [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) प्रिंटरचे पुनरावलोकन करा. अनावधानाने होणारे शॅडोइंग आणि C3 लिनियरायझेशन समस्या टाळा.
- Slither च्या [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) प्रिंटरचे पुनरावलोकन करा. ते फंक्शन व्हिजिबिलिटी आणि ऍक्सेस कंट्रोल्सचा अहवाल देते.
- Slither च्या [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) प्रिंटरचे पुनरावलोकन करा. ते स्टेट व्हेरिएबल्सवरील ऍक्सेस कंट्रोल्सचा अहवाल देते.

महत्वपूर्ण सुरक्षा गुणधर्मांचे दस्तऐवजीकरण करा आणि त्यांचे मूल्यांकन करण्यासाठी स्वयंचलित चाचणी जनरेटर वापरा:

- [तुमच्या code साठी सुरक्षा गुणधर्म कसे दस्तऐवजीकरण करायचे ते शिका](/developers/tutorials/guide-to-smart-contract-security-tools/). सुरुवातीला ते कठीण आहे, परंतु चांगले परिणाम मिळवण्यासाठी ही सर्वात महत्त्वाची क्रिया आहे. या ट्युटोरियलमधील कोणतेही प्रगत तंत्र वापरण्यासाठी ही एक पूर्वअट देखील आहे.
- [Echidna](https://github.com/crytic/echidna) आणि [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html) सह वापरण्यासाठी Solidity मध्ये सुरक्षा गुणधर्म परिभाषित करा. तुमच्या स्टेट मशीन, ऍक्सेस कंट्रोल्स, अंकगणितीय ऑपरेशन्स, बाह्य इंटरॅक्शन्स आणि मानकांच्या पालनावर लक्ष केंद्रित करा.
- [Slither च्या Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) सह सुरक्षा गुणधर्म परिभाषित करा. इनहेरिटन्स, व्हेरिएबल डिपेंडेंसीज, ऍक्सेस कंट्रोल्स आणि इतर संरचनात्मक समस्यांवर लक्ष केंद्रित करा.
- प्रत्येक कमिटवर तुमच्या प्रॉपर्टी चाचण्या [Crytic](https://crytic.io) सह चालवा. Crytic सुरक्षा प्रॉपर्टी चाचण्या घेऊ शकते आणि त्यांचे मूल्यांकन करू शकते, जेणेकरून तुमच्या टीममधील प्रत्येकजण सहजपणे पाहू शकेल की त्या GitHub वर पास होतात. अयशस्वी चाचण्या कमिट्स ब्लॉक करू शकतात.

शेवटी, अशा समस्यांबद्दल जागरूक रहा ज्या स्वयंचलित टूल्स सहजपणे शोधू शकत नाहीत:

- गोपनीयतेचा अभाव: जेव्हा तुमचे व्यवहार पूलमध्ये रांगेत असतात तेव्हा इतर प्रत्येकजण ते पाहू शकतो
- फ्रंट रनिंग व्यवहार
- क्रिप्टोग्राफिक ऑपरेशन्स
- बाह्य DeFi घटकांसह जोखमीचे इंटरॅक्शन्स

## मदतीसाठी विचारा {#ask-for-help}

[Ethereum ऑफिस अवर्स](https://calendly.com/dan-trailofbits/office-hours) दर मंगळवारी दुपारी चालतात. ही 1-तासाची, 1-ऑन-1 सत्रे तुम्हाला सुरक्षेबद्दल असलेले कोणतेही प्रश्न विचारण्याची, आमची टूल्स वापरून समस्यांचे निवारण करण्याची, आणि तुमच्या सध्याच्या दृष्टिकोनाबद्दल तज्ञांकडून अभिप्राय मिळवण्याची संधी आहे. आम्ही तुम्हाला या मार्गदर्शिकेवर काम करण्यास मदत करू.

आमच्या Slack मध्ये सामील व्हा: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). जर तुम्हाला काही प्रश्न असतील तर आम्ही #crytic आणि #ethereum चॅनेलमध्ये नेहमी उपलब्ध असतो.
