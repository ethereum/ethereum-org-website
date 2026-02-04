---
title: इथरियम सुधारणा प्रस्ताव (EIPs)
description: EIPs समजून घेण्यासाठी तुम्हाला आवश्यक असलेली मूलभूत माहिती
lang: mr
---

# इथरियम सुधारणा प्रस्तावांची (EIPs) ओळख {#introduction-to-ethereum-improvement-proposals}

## EIPs म्हणजे काय? {#what-are-eips}

[इथरियम सुधारणा प्रस्ताव (EIPs)](https://eips.ethereum.org/) हे इथेरियमसाठी संभाव्य नवीन वैशिष्ट्ये किंवा प्रक्रिया निर्दिष्ट करणारे मानक आहेत. EIPs मध्ये प्रस्तावित बदलांसाठी तांत्रिक तपशील असतात आणि ते समुदायासाठी “सत्याचा स्रोत” म्हणून काम करतात. Ethereum साठी नेटवर्क अपग्रेड्स आणि ॲप्लिकेशन मानकांवर EIP प्रक्रियेद्वारे चर्चा केली जाते आणि ते विकसित केले जातात.

इथरियम समुदायातील कोणीही EIP तयार करू शकतो. EIPs लिहिण्यासाठीची मार्गदर्शक तत्त्वे [EIP-1](https://eips.ethereum.org/EIPS/eip-1) मध्ये समाविष्ट आहेत. EIP ने प्रामुख्याने थोड्या प्रेरणेसह एक संक्षिप्त तांत्रिक तपशील प्रदान केला पाहिजे. EIP लेखक समुदायामध्ये एकमत साधण्यासाठी आणि पर्यायी मतांचे दस्तऐवजीकरण करण्यासाठी जबाबदार असतो. एक सुव्यवस्थित EIP सादर करण्यासाठी उच्च तांत्रिक अडथळा लक्षात घेता, ऐतिहासिकदृष्ट्या, बहुतेक EIP लेखक सामान्यतः ॲप्लिकेशन किंवा प्रोटोकॉल डेव्हलपर्स असतात.

## EIPs का महत्त्वाचे आहेत? {#why-do-eips-matter}

इथेरियमवर बदल कसे होतात आणि ते कसे दस्तऐवजीकरण केले जातात यात EIPs मध्यवर्ती भूमिका बजावतात. लोकांसाठी बदल प्रस्तावित करण्याचा, त्यावर चर्चा करण्याचा आणि ते स्वीकारण्याचा हा एक मार्ग आहे. [EIPs चे विविध प्रकार](https://eips.ethereum.org/EIPS/eip-1#eip-types) आहेत, ज्यात निम्न-स्तरीय प्रोटोकॉल बदलांसाठी कोअर EIPs समाविष्ट आहेत जे एकमत वर परिणाम करतात आणि ज्यांना [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) सारख्या नेटवर्क अपग्रेडची आवश्यकता असते, आणि [EIP-20](https://eips.ethereum.org/EIPS/eip-20) व [EIP-721](https://eips.ethereum.org/EIPS/eip-721) सारख्या ॲप्लिकेशन मानकांसाठी ERCs समाविष्ट आहेत.

प्रत्येक नेटवर्क अपग्रेडमध्ये EIPs चा एक संच असतो जो नेटवर्कवरील प्रत्येक [इथेरियम क्लायंट](/learn/#clients-and-nodes) द्वारे लागू करणे आवश्यक असते. याचा अर्थ असा की Ethereum Mainnet वरील इतर क्लायंट्ससोबत एकमत मध्ये राहण्यासाठी, क्लायंट डेव्हलपर्सना हे सुनिश्चित करणे आवश्यक आहे की त्यांनी सर्व आवश्यक EIPs लागू केले आहेत.

बदलांसाठी तांत्रिक तपशील प्रदान करण्यासोबतच, EIPs हे एकक आहे ज्याच्याभोवती Ethereum मध्ये शासन होते: कोणीही एक प्रस्ताव देण्यास स्वतंत्र आहे आणि नंतर समुदायातील विविध भागधारक ते मानक म्हणून स्वीकारले जावे की नेटवर्क अपग्रेडमध्ये समाविष्ट केले जावे हे ठरवण्यासाठी चर्चा करतील. कारण नॉन-कोअर EIPs सर्व ॲप्लिकेशन्सद्वारे स्वीकारले जाणे आवश्यक नाही (उदाहरणार्थ, EIP-20 लागू न करणारे फंजिबल टोकन तयार करणे शक्य आहे), परंतु कोअर EIPs मोठ्या प्रमाणावर स्वीकारले जाणे आवश्यक आहे (कारण सर्व नोड्सना एकाच नेटवर्कचा भाग राहण्यासाठी अपग्रेड करणे आवश्यक आहे), त्यामुळे कोअर EIPs ला नॉन-कोअर EIPs पेक्षा समुदायामध्ये व्यापक एकमत आवश्यक आहे.

## EIPs चा इतिहास {#history-of-eips}

[इथेरियम सुधारणा प्रस्ताव (EIPs) GitHub रेपॉजिटरी](https://github.com/ethereum/EIPs) ऑक्टोबर 2015 मध्ये तयार करण्यात आली होती. EIP प्रक्रिया [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips) प्रक्रियेवर आधारित आहे, जी स्वतः [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/) प्रक्रियेवर आधारित आहे.

EIP संपादकांना तांत्रिक सुदृढता, फॉर्मेटिंग समस्या आणि स्पेलिंग, व्याकरण आणि कोड शैली सुधारण्यासाठी EIPs चे पुनरावलोकन करण्याचे काम सोपवले आहे. मार्टिन बेक्झे, विटालिक बुटेरिन, गॅव्हिन वूड, आणि इतर काही जण 2015 ते 2016 च्या अखेरीस मूळ EIP संपादक होते.

सध्याचे EIP संपादक आहेत

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

मानद EIP संपादक आहेत

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

तुम्हाला EIP संपादक व्हायचे असल्यास, कृपया [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069) तपासा.

EIP संपादक ठरवतात की एखादा प्रस्ताव EIP बनण्यासाठी कधी तयार आहे, आणि EIP लेखकांना त्यांचे प्रस्ताव पुढे नेण्यात मदत करतात. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) EIP संपादक आणि समुदाय यांच्यात बैठका आयोजित करण्यास मदत करतात (पहा [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

चार्टसह संपूर्ण मानकीकरण प्रक्रिया [EIP-1](https://eips.ethereum.org/EIPS/eip-1) मध्ये वर्णन केलेली आहे.

## अधिक जाणून घ्या {#learn-more}

तुम्हाला EIPs बद्दल अधिक वाचण्यात स्वारस्य असल्यास, [EIPs वेबसाइट](https://eips.ethereum.org/) आणि [EIP-1](https://eips.ethereum.org/EIPS/eip-1) तपासा. येथे काही उपयुक्त लिंक्स आहेत:

- [प्रत्येक इथेरियम सुधारणा प्रस्तावाची यादी](https://eips.ethereum.org/all)
- [सर्व EIP प्रकारांचे वर्णन](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [सर्व EIP स्थितींचे वर्णन](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### समुदाय शिक्षण प्रकल्प {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP ही एक शैक्षणिक व्हिडिओ मालिका आहे जी इथेरियम सुधारणा प्रस्ताव (EIPs) आणि आगामी अपग्रेडच्या मुख्य वैशिष्ट्यांवर चर्चा करते._
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf इथेरियम सुधारणा प्रस्तावांसाठी (EIPs) अतिरिक्त माहिती प्रदान करते, ज्यात त्यांची स्थिती, अंमलबजावणी तपशील, संबंधित पुल रिक्वेस्ट्स आणि समुदायाचा अभिप्राय समाविष्ट आहे._
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun इथेरियम सुधारणा प्रस्तावां (EIPs) वरील ताज्या बातम्या, EIP बैठकींवरील अपडेट्स आणि बरेच काही प्रदान करते._
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight हे विविध स्त्रोतांकडून गोळा केलेल्या माहितीनुसार इथेरियम सुधारणा प्रस्ताव (EIPs) प्रक्रिया आणि आकडेवारीच्या स्थितीचे प्रतिनिधित्व आहे._

## सहभाग घ्या {#participate}

कोणीही EIP तयार करू शकतो. प्रस्ताव सादर करण्यापूर्वी, व्यक्तीने [EIP-1](https://eips.ethereum.org/EIPS/eip-1) वाचले पाहिजे, ज्यात EIP प्रक्रिया आणि EIP कसे लिहावे हे सांगितले आहे, आणि [Ethereum Magicians](https://ethereum-magicians.org/) वर अभिप्राय मागितला पाहिजे, जिथे मसुदा सादर करण्यापूर्वी प्रस्तावांवर प्रथम समुदायासोबत चर्चा केली जाते.

## संदर्भ {#references}

<cite class="citation">

पृष्ठ सामग्री हडसन जेमसन यांच्या [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) मधून अंशतः प्रदान केलेली आहे.

</cite>
