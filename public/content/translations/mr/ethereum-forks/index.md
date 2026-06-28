---
title: सर्व इथेरियम फोर्क्सची टाइमलाइन (2014 ते आजपर्यंत)
description: इथेरियम ब्लॉकचेनचा इतिहास ज्यामध्ये प्रमुख टप्पे, रिलीझ आणि फोर्क्स समाविष्ट आहेत.
lang: mr
sidebarDepth: 1
authors: ["निक्सो"]
---

[इथेरियम](/) ब्लॉकचेनच्या सर्व प्रमुख टप्पे, फोर्क्स आणि अपडेट्सची टाइमलाइन.

<ExpandableCard title="फोर्क्स म्हणजे काय?" contentPreview="इथेरियम प्रोटोकॉलच्या नियमांमधील बदल ज्यामध्ये अनेकदा नियोजित तांत्रिक अपग्रेड्स समाविष्ट असतात.">

जेव्हा नेटवर्कमध्ये प्रमुख तांत्रिक अपग्रेड किंवा बदल करण्याची आवश्यकता असते तेव्हा फोर्क्स होतात – ते सहसा [इथेरियम सुधारणा प्रस्ताव (EIPs)](/eips/) मधून उद्भवतात आणि प्रोटोकॉलचे "नियम" बदलतात.

जेव्हा पारंपारिक, मध्यवर्ती-नियंत्रित सॉफ्टवेअरमध्ये अपग्रेडची आवश्यकता असते, तेव्हा कंपनी अंतिम वापरकर्त्यासाठी फक्त एक नवीन आवृत्ती प्रकाशित करते. ब्लॉकचेन वेगळ्या प्रकारे कार्य करतात कारण त्यात कोणतीही मध्यवर्ती मालकी नसते. नवीन फोर्क नियमांची अंमलबजावणी करण्यासाठी [इथेरियम क्लायंट्सनी](/developers/docs/nodes-and-clients/) त्यांचे सॉफ्टवेअर अपडेट करणे आवश्यक आहे. तसेच ब्लॉक निर्माते (प्रूफ-ऑफ-वर्क (PoW) जगात मायनर्स, प्रूफ-ऑफ-स्टेक (PoS) जगात प्रमाणक) आणि नोड्सनी नवीन नियमांनुसार ब्लॉक्स तयार करणे आणि प्रमाणित करणे आवश्यक आहे. [सहमती यंत्रणांबद्दल अधिक](/developers/docs/consensus-mechanisms/)

या नियमांमधील बदलांमुळे नेटवर्कमध्ये तात्पुरती फूट पडू शकते. नवीन किंवा जुन्या नियमांनुसार नवीन ब्लॉक्स तयार केले जाऊ शकतात. फोर्क्सवर सहसा वेळेपूर्वीच एकमत होते जेणेकरून क्लायंट्स एकमताने बदल स्वीकारतात आणि अपग्रेड्ससह असलेला फोर्क मुख्य चेन बनतो. तथापि, दुर्मिळ प्रकरणांमध्ये, फोर्क्सवरील मतभेदांमुळे नेटवर्क कायमचे विभागले जाऊ शकते – विशेषतः <a href="#dao-fork">DAO फोर्कसह</a> इथेरियम क्लासिकची निर्मिती.

</ExpandableCard>

<ExpandableCard title="काही अपग्रेड्सची अनेक नावे का असतात?" contentPreview="अपग्रेड्सच्या नावांचा एक पॅटर्न असतो">

इथेरियमचा आधार असलेले सॉफ्टवेअर दोन भागांनी बनलेले आहे, ज्यांना [अंमलबजावणी स्तर](/glossary/#execution-layer) आणि [सहमती स्तर](/glossary/#consensus-layer) म्हणून ओळखले जाते.

**अंमलबजावणी अपग्रेडचे नामकरण**

2021 पासून, **अंमलबजावणी स्तर** अपग्रेड्सना कालक्रमानुसार [मागील Devcon आणि Devconnect ठिकाणांच्या](https://devcon.org/en/past-events/) शहरांच्या नावांनुसार नावे दिली जातात:

| अपग्रेडचे नाव | Devcon(nect) वर्ष | Devcon क्रमांक | अपग्रेडची तारीख |
| -------------- | ----------------- | ------------- | ------------ |
| बर्लिन         | 2014              | 0             | 15 एप्रिल 2021 |
| लंडन         | 2015              | I             | 5 ऑगस्ट 2021  |
| शांघाय       | 2016              | II            | 12 एप्रिल 2023 |
| कान्कुन         | 2017              | III           | 13 मार्च 2024 |
| प्राग         | 2018              | IV            | 7 मे 2025  |
| ओसाका          | 2019              | V             | 3 डिसेंबर 2025  |
| **अ‍ॅमस्टरडॅम**  | 2022              | Devconnect    | TBD - पुढील   |
| _बोगोटा_       | 2022              | VI            | TBD          |
| _इस्तंबूल_     | 2023              | Devconnect    | TBD          |
| _बँकॉक_      | 2024              | VII           | TBD          |
| _ब्युनोस आयर्स_ | 2025              | Devconnect    | TBD          |
| _मुंबई_       | 2026              | VIII          | TBD          |

**सहमती अपग्रेडचे नामकरण**

[बीकन साखळी](/glossary/#beacon-chain) सुरू झाल्यापासून, **सहमती स्तर** अपग्रेड्सना वर्णक्रमानुसार सुरू होणाऱ्या अक्षरांसह खगोलीय ताऱ्यांची नावे दिली जातात:

| अपग्रेडचे नाव                                              | अपग्रेडची तारीख |
| --------------------------------------------------------- | ------------ |
| बीकन साखळी जेनेसिस                                      | 1 डिसेंबर 2020  |
| [अल्टेअर](https://en.wikipedia.org/wiki/Altair)            | 27 ऑक्टोबर 2021 |
| [बेलाट्रिक्स](https://en.wikipedia.org/wiki/Bellatrix)      | 6 सप्टेंबर 2022  |
| [कपेला](https://en.wikipedia.org/wiki/Capella)          | 12 एप्रिल 2023 |
| [डेनेब](https://en.wikipedia.org/wiki/Deneb)              | 13 मार्च 2024 |
| [इलेक्ट्रा](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 मे 2025  |
| [फुलू](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 डिसेंबर 2025  |
| [**ग्लोआस**](https://en.wikipedia.org/wiki/WASP-13)        | TBD - पुढील   |
| [_हेझे_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | TBD          |

**एकत्रित नामकरण**

अंमलबजावणी आणि सहमती अपग्रेड्स सुरुवातीला वेगवेगळ्या वेळी आणले गेले होते, परंतु 2022 मध्ये [द मर्ज](/roadmap/merge/) नंतर ते एकाच वेळी तैनात केले गेले आहेत. त्यामुळे, या अपग्रेड्सचा संदर्भ सोपा करण्यासाठी एकाच जोडलेल्या शब्दाचा वापर करून बोलचालीतील शब्द उदयास आले आहेत. याची सुरुवात _शांघाय-कपेला_ अपग्रेडपासून झाली, ज्याला सामान्यतः "**शापेला**" म्हटले जाते, आणि पुढील अपग्रेड्ससह हे चालू आहे.

| अंमलबजावणी अपग्रेड | सहमती अपग्रेड | छोटे नाव    |
| ----------------- | ----------------- | ------------- |
| शांघाय          | कपेला           | "शापेला"    |
| कान्कुन            | डेनेब             | "डेन्कन्"      |
| प्राग            | इलेक्ट्रा           | "पेक्ट्रा"      |
| ओसाका             | फुलू              | "फुसाका"      |
| अ‍ॅमस्टरडॅम         | ग्लोआस             | "ग्लॅमस्टरडॅम" |
| बोगोटा            | हेझे              | "हेगोटा"      |

</ExpandableCard>

काही विशेषतः महत्त्वाच्या मागील अपग्रेड्सबद्दलच्या माहितीवर थेट जा: [बीकन साखळी](/roadmap/beacon-chain/); [द मर्ज](/roadmap/merge/); आणि [EIP-1559](#london)

भविष्यातील प्रोटोकॉल अपग्रेड्स शोधत आहात? [इथेरियम रोडमॅपवरील आगामी अपग्रेड्सबद्दल जाणून घ्या](/roadmap/).

<Divider />

## 2025 {#2025}

### फुलू-ओसाका ("फुसाका") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[फुसाका बद्दल अधिक](/roadmap/fusaka/)

### प्राग-इलेक्ट्रा ("पेक्ट्रा") {#pectra}

<NetworkUpgradeSummary name="pectra" />

प्राग-इलेक्ट्रा ("पेक्ट्रा") अपग्रेडमध्ये इथेरियम प्रोटोकॉलमधील अनेक सुधारणांचा समावेश होता, ज्याचा उद्देश सर्व वापरकर्ते, स्तर 2 (l2) नेटवर्क, स्टेकर आणि नोड ऑपरेटरसाठी अनुभव अधिक चांगला करणे हा होता.

चक्रवाढ प्रमाणक खात्यांसह स्टेकिंगला अपग्रेड मिळाले, आणि अंमलबजावणी रक्कम काढणे पत्ता वापरून स्टेक केलेल्या निधीवर सुधारित नियंत्रण मिळाले. EIP-7251 ने एकाच प्रमाणकासाठी कमाल प्रभावी शिल्लक 2048 पर्यंत वाढवली, ज्यामुळे स्टेकर्ससाठी भांडवली कार्यक्षमता सुधारली. EIP-7002 ने अंमलबजावणी खात्याला प्रमाणक क्रिया सुरक्षितपणे ट्रिगर करण्यास सक्षम केले, ज्यामध्ये निर्गमन करणे किंवा निधीचा काही भाग काढणे समाविष्ट आहे, ज्यामुळे ETH स्टेकर्सचा अनुभव सुधारला आणि नोड ऑपरेटर्सचे उत्तरदायित्व मजबूत करण्यात मदत झाली.

अपग्रेडचे इतर भाग नियमित वापरकर्त्यांसाठी अनुभव सुधारण्यावर केंद्रित होते. EIP-7702 ने नियमित नॉन-स्मार्ट-कॉन्ट्रॅक्ट खात्याला ([EOA](/glossary/#eoa)) स्मार्ट कॉन्ट्रॅक्ट प्रमाणेच कोड कार्यान्वित करण्याची क्षमता दिली. यामुळे पारंपारिक इथेरियम खात्यांसाठी अमर्याद नवीन कार्यक्षमता खुली झाली, जसे की व्यवहार बॅचिंग, गॅस प्रायोजकत्व, पर्यायी प्रमाणीकरण, प्रोग्राम करण्यायोग्य खर्च नियंत्रणे, खाते पुनर्प्राप्ती यंत्रणा आणि बरेच काही.

<ExpandableCard title="पेक्ट्रा EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

उत्तम वापरकर्ता अनुभव:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOA खाते कोड सेट करणे</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>ब्लॉब प्रक्रिया क्षमता वाढवणे</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>कॉल डेटा किंमत वाढवणे</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>EL कॉन्फिगरेशन फाइल्समध्ये ब्लॉब वेळापत्रक जोडणे</em></li>
</ul>

उत्तम स्टेकिंग अनुभव:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em><code>MAX_EFFECTIVE_BALANCE</code> वाढवणे</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>अंमलबजावणी स्तर ट्रिगर करण्यायोग्य निर्गमन</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>सामान्य हेतू अंमलबजावणी स्तर विनंत्या</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>ऑनचेन प्रमाणक ठेवी पुरवणे</em></li>
</ul>

प्रोटोकॉल कार्यक्षमता आणि सुरक्षा सुधारणा:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381 वक्र ऑपरेशन्ससाठी प्रीकंपाइल</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>ऐतिहासिक ब्लॉक हॅश स्थितीत जतन करणे</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>समिती निर्देशांक साक्षांकनाच्या बाहेर हलवणे</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [पेक्ट्रा स्टेकिंगचा अनुभव कसा वाढवेल](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [इलेक्ट्रा अपग्रेड तपशील वाचा](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [प्राग-इलेक्ट्रा ("पेक्ट्रा") वारंवार विचारले जाणारे प्रश्न (FAQ)](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### कान्कुन-डेनेब ("डेन्कन्") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### कान्कुन सारांश {#cancun-summary}

कान्कुन अपग्रेडमध्ये इथेरियमच्या _अंमलबजावणी_ स्तरावर सुधारणांचा एक संच समाविष्ट आहे, ज्याचा उद्देश डेनेब सहमती अपग्रेडच्या बरोबरीने स्केलेबिलिटी सुधारणे हा आहे.

विशेषतः यामध्ये EIP-4844 समाविष्ट आहे, ज्याला **प्रोटो-डँकशार्डिंग** म्हणून ओळखले जाते, जे स्तर २ (l2) रोलअप्ससाठी डेटा स्टोरेजचा खर्च लक्षणीयरीत्या कमी करते. हे डेटा "ब्लॉब्स" च्या परिचयाद्वारे साध्य केले जाते जे रोलअप्सना अल्प काळासाठी मुख्यनेटवर डेटा पोस्ट करण्यास सक्षम करते. याचा परिणाम स्तर २ (l2) रोलअप्सच्या वापरकर्त्यांसाठी लक्षणीयरीत्या कमी व्यवहार शुल्कात होतो.

<ExpandableCard title="कान्कुन EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>अस्थायी स्टोरेज ऑपकोड्स</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM मध्ये बीकन ब्लॉक रूट</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>शार्ड ब्लॉब व्यवहार (प्रोटो-डँकशार्डिंग)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - मेमरी कॉपी करण्याची सूचना</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> फक्त त्याच व्यवहारात</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> ऑपकोड</em></li>
</ul>

</ExpandableCard>

- [स्तर २ (l2) रोलअप्स](/layer-2/)
- [प्रोटो-डँकशार्डिंग](/roadmap/scaling/#proto-danksharding)
- [डँकशार्डिंग](/roadmap/danksharding/)
- [कान्कुन अपग्रेड तपशील वाचा](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### डेनेब सारांश {#deneb-summary}

डेनेब अपग्रेडमध्ये इथेरियमच्या _सहमती_ मध्ये सुधारणांचा एक संच आहे ज्याचा उद्देश स्केलेबिलिटी सुधारणे हा आहे. हे अपग्रेड प्रोटो-डँकशार्डिंग (EIP-4844) सक्षम करण्यासाठी कान्कुन अंमलबजावणी अपग्रेड्सच्या बरोबरीने येते, तसेच बीकन साखळीमधील इतर सुधारणांसह.

पूर्व-व्युत्पन्न स्वाक्षरी केलेले "ऐच्छिक निर्गमन संदेश" आता कालबाह्य होत नाहीत, ज्यामुळे तृतीय-पक्ष नोड ऑपरेटरकडे त्यांचा निधी स्टेक करणाऱ्या वापरकर्त्यांना अधिक नियंत्रण मिळते. या स्वाक्षरी केलेल्या निर्गमन संदेशासह, स्टेकर्स कोणाचीही परवानगी न घेता कोणत्याही वेळी सुरक्षितपणे निर्गमन करण्याची आणि त्यांची रक्कम काढण्याची क्षमता राखून नोड ऑपरेशन प्रतिनिधीकडे सोपवू शकतात.

EIP-7514 नेटवर्कमध्ये सामील होऊ शकणाऱ्या प्रमाणकांचा "फेरबदल मर्यादा" दर प्रति पर्व 8 पर्यंत मर्यादित करून ETH च्या निर्गमनावर कडक निर्बंध आणते. ETH चे निर्गमन एकूण स्टेक केलेल्या ETH च्या प्रमाणात असल्याने, सामील होणाऱ्या प्रमाणकांची संख्या मर्यादित केल्याने नव्याने निर्गमित होणाऱ्या ETH च्या _वाढीचा दर_ मर्यादित होतो, तसेच नोड ऑपरेटर्ससाठी हार्डवेअर आवश्यकता कमी करून विकेंद्रीकरणास मदत होते.

<ExpandableCard title="डेनेब EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM मध्ये बीकन ब्लॉक रूट</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>शार्ड ब्लॉब व्यवहार</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>कायमस्वरूपी वैध स्वाक्षरी केलेले ऐच्छिक निर्गमन</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>कमाल साक्षांकन समावेशन स्लॉट वाढवणे</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>कमाल पर्व फेरबदल मर्यादा जोडणे</em></li>
</ul>

</ExpandableCard>

- [डेनेब अपग्रेड तपशील वाचा](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [कान्कुन-डेनेब ("डेन्कन्") वारंवार विचारले जाणारे प्रश्न](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### शांघाय-कॅपेला ("शापेला") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### शांघाय सारांश {#shanghai-summary}

शांघाय अपग्रेडने अंमलबजावणी स्तरावर स्टेकिंग रक्कम काढण्याची सुविधा आणली. कॅपेला अपग्रेडच्या जोडीने, यामुळे ब्लॉक्सना रक्कम काढण्याच्या ऑपरेशन्स स्वीकारण्यास सक्षम केले, ज्यामुळे स्टेकर्सना त्यांचे ETH बीकन साखळीमधून अंमलबजावणी स्तरावर काढता येते.

<ExpandableCard title="शांघाय EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code> पत्ता वॉर्म (warm) सुरू करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>नवीन <code>PUSH0</code> सूचना</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>initcode मर्यादित आणि मीटर करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>बीकन साखळी ऑपरेशन्स म्हणून रक्कम काढणे पुश करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code> नापसंत (Deprecate) करते</em></li>
</ul>

</ExpandableCard>

- [शांघाय अपग्रेड तपशील वाचा](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### कॅपेला सारांश {#capella-summary}

कॅपेला अपग्रेड हे सहमती स्तरावरील (बीकन साखळी) तिसरे मोठे अपग्रेड होते आणि त्याने स्टेकिंग रक्कम काढण्याची सुविधा सक्षम केली. कॅपेला हे अंमलबजावणी स्तर अपग्रेड, शांघाय, सोबत एकाच वेळी घडले आणि त्याने स्टेकिंग रक्कम काढण्याची कार्यक्षमता सक्षम केली.

या सहमती स्तर अपग्रेडने ज्या स्टेकर्सनी त्यांच्या सुरुवातीच्या ठेवीसोबत पैसे काढण्याची अधिकारपत्रे दिली नव्हती त्यांना ती देण्याची क्षमता आणली, ज्यामुळे रक्कम काढणे सक्षम झाले.

या अपग्रेडने स्वयंचलित खाते स्वीपिंग (account sweeping) कार्यक्षमता देखील प्रदान केली, जी कोणत्याही उपलब्ध बक्षीस देयकांसाठी किंवा पूर्ण रक्कम काढण्यासाठी प्रमाणक खात्यांवर सतत प्रक्रिया करते.

- [स्टेकिंग रक्कम काढण्याबद्दल अधिक माहिती](/staking/withdrawals/).
- [कॅपेला अपग्रेड तपशील वाचा](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### पॅरिस (द मर्ज) {#paris}

<NetworkUpgradeSummary name="paris" />

#### सारांश {#paris-summary}

पॅरिस अपग्रेडची सुरुवात प्रूफ-ऑफ-वर्क (PoW) ब्लॉकचेनने 58750000000000000000000 चे [अंतिम एकूण काठिण्य](/glossary/#terminal-total-difficulty) ओलांडल्यामुळे झाली. हे 15 सप्टेंबर 2022 रोजी 15537393 व्या ब्लॉकवर घडले, ज्यामुळे पुढील ब्लॉकवर पॅरिस अपग्रेड सुरू झाले. पॅरिस हे [द मर्ज](/roadmap/merge/) संक्रमण होते - त्याचे प्रमुख वैशिष्ट्य म्हणजे [प्रूफ-ऑफ-वर्क (PoW)](/developers/docs/consensus-mechanisms/pow) खनन अल्गोरिदम आणि संबंधित एकमत लॉजिक बंद करणे आणि त्याऐवजी [प्रूफ-ऑफ-स्टेक (PoS)](/developers/docs/consensus-mechanisms/pos) सुरू करणे हे होते. पॅरिस हे स्वतः [अंमलबजावणी क्लायंट्स](/developers/docs/nodes-and-clients/#execution-clients) मधील एक अपग्रेड होते (सहमती स्तरावरील बेलाट्रिक्सच्या समतुल्य) ज्याने त्यांना त्यांच्या कनेक्ट केलेल्या [सहमती क्लायंट्सकडून](/developers/docs/nodes-and-clients/#consensus-clients) सूचना घेण्यास सक्षम केले. यासाठी अंतर्गत API पद्धतींचा एक नवीन संच सक्रिय करणे आवश्यक होते, ज्याला एकत्रितपणे [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) म्हणून ओळखले जाते. [होमस्टेड](#homestead) नंतर इथेरियमच्या इतिहासातील हे निःसंशयपणे सर्वात लक्षणीय अपग्रेड होते!

- [पॅरिस अपग्रेडचे तपशील वाचा](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="पॅरिस EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>सहमती प्रूफ-ऑफ-स्टेक (PoS) मध्ये अपग्रेड करा</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>DIFFICULTY ऑपकोडच्या जागी PREVRANDAO वापरा</em></li>
</ul>

</ExpandableCard>

---

### बेलाट्रिक्स {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### सारांश {#bellatrix-summary}

बेलाट्रिक्स अपग्रेड हे [बीकन साखळी](/roadmap/beacon-chain) साठी दुसरे नियोजित अपग्रेड होते, जे चेनला [द मर्ज](/roadmap/merge/) साठी तयार करत होते. हे निष्क्रियता आणि स्लॅशिंग करण्यायोग्य गुन्ह्यांसाठी प्रमाणक दंडांना त्यांच्या पूर्ण मूल्यांवर आणते. बेलाट्रिक्समध्ये चेनला द मर्जसाठी तयार करण्यासाठी आणि शेवटच्या प्रूफ-ऑफ-वर्क (PoW) ब्लॉकवरून पहिल्या प्रूफ-ऑफ-स्टेक (PoS) ब्लॉकवर संक्रमण करण्यासाठी फोर्क निवड नियमांचे अपडेट देखील समाविष्ट आहे. यामध्ये सहमती क्लायंट्सना 58750000000000000000000 च्या [अंतिम एकूण काठिण्य](/glossary/#terminal-total-difficulty) बद्दल जागरूक करणे समाविष्ट आहे.

- [बेलाट्रिक्स अपग्रेडचे तपशील वाचा](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### ग्रे ग्लेशियर {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### सारांश {#gray-glacier-summary}

ग्रे ग्लेशियर नेटवर्क अपग्रेडने [काठिण्य बॉम्ब](/glossary/#difficulty-bomb) तीन महिन्यांनी पुढे ढकलला. या अपग्रेडमध्ये सादर केलेला हा एकमेव बदल आहे आणि तो स्वरूपाने [अ‍ॅरो ग्लेशियर](#arrow-glacier) आणि [मुइर ग्लेशियर](#muir-glacier) अपग्रेड्ससारखाच आहे. असेच बदल [बायझँटियम](#byzantium), [कॉन्स्टँटिनोपल](#constantinople) आणि [लंडन](#london) नेटवर्क अपग्रेड्सवर केले गेले आहेत.

- [EF ब्लॉग - ग्रे ग्लेशियर अपग्रेडची घोषणा](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="ग्रे ग्लेशियर EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>सप्टेंबर 2022 पर्यंत काठिण्य बॉम्बला विलंब करते</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### ॲरो ग्लेशियर {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### सारांश {#arrow-glacier-summary}

ॲरो ग्लेशियर नेटवर्क अपग्रेडने [काठिण्य बॉम्ब](/glossary/#difficulty-bomb) अनेक महिन्यांनी पुढे ढकलला. या अपग्रेडमध्ये सादर केलेला हा एकमेव बदल आहे आणि तो [मुइर ग्लेशियर](#muir-glacier) अपग्रेडसारखाच आहे. [बायझँटियम](#byzantium), [कॉन्स्टँटिनोपल](#constantinople) आणि [लंडन](#london) नेटवर्क अपग्रेड्सवर असेच बदल करण्यात आले आहेत.

- [EF ब्लॉग - ॲरो ग्लेशियर अपग्रेडची घोषणा](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - इथेरियम ॲरो ग्लेशियर अपग्रेड](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="अ‍ॅरो ग्लेशियर EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>काठिण्य बॉम्ब जून 2022 पर्यंत पुढे ढकलतो</em></li>
</ul>

</ExpandableCard>

---

### अल्टेअर {#altair}

<NetworkUpgradeSummary name="altair" />

#### सारांश {#altair-summary}

अल्टेअर अपग्रेड हे [बीकन साखळी](/roadmap/beacon-chain)साठी पहिले नियोजित अपग्रेड होते. याने "सिंक कमिटी" (sync committees) साठी समर्थन जोडले—ज्यामुळे लाइट क्लायंट्स सक्षम झाले, आणि द मर्जच्या दिशेने विकास प्रगती करत असताना प्रमाणक निष्क्रियता आणि स्लॅशिंग दंड वाढवले.

- [अल्टेअर अपग्रेडचे तपशील वाचा](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> रंजक तथ्य! {#altair-fun-fact}

अल्टेअर हे पहिले मोठे नेटवर्क अपग्रेड होते ज्याची अचूक रोलआउट वेळ होती. यापूर्वीचे प्रत्येक अपग्रेड प्रूफ-ऑफ-वर्क चेनवरील घोषित ब्लॉक नंबरवर आधारित होते, जिथे ब्लॉक वेळा बदलत असतात. बीकन साखळीला प्रूफ-ऑफ-वर्क सोडवण्याची आवश्यकता नसते, आणि त्याऐवजी ती वेळ-आधारित पर्व प्रणालीवर कार्य करते ज्यामध्ये 32 बारा-सेकंदांचे "स्लॉट" असतात जिथे प्रमाणक ब्लॉक्स प्रस्तावित करू शकतात. म्हणूनच आम्हाला नक्की माहित होते की आम्ही 74,240 व्या पर्वावर कधी पोहोचू आणि अल्टेअर कधी लाइव्ह होईल!

- [ब्लॉक वेळ](/developers/docs/blocks/#block-time)

---

### लंडन {#london}

<NetworkUpgradeSummary name="london" />

#### सारांश {#london-summary}

लंडन अपग्रेडने [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) सादर केले, ज्याने व्यवहार शुल्क बाजारपेठेत सुधारणा केली, तसेच गॅस परतावा कसा हाताळला जातो आणि [आइस एज](/glossary/#ice-age) वेळापत्रकात बदल केले.

#### लंडन अपग्रेड / EIP-1559 काय होते? {#eip-1559}

लंडन अपग्रेडपूर्वी, इथेरियममध्ये निश्चित आकाराचे ब्लॉक्स होते. नेटवर्कची मागणी जास्त असताना, हे ब्लॉक्स पूर्ण क्षमतेने चालत असत. परिणामी, वापरकर्त्यांना ब्लॉकमध्ये समाविष्ट होण्यासाठी मागणी कमी होण्याची अनेकदा वाट पाहावी लागत असे, ज्यामुळे वापरकर्त्याचा अनुभव खराब होत असे. लंडन अपग्रेडने इथेरियममध्ये बदलत्या आकाराचे ब्लॉक्स सादर केले.

ऑगस्ट 2021 च्या [लंडन अपग्रेड](/ethereum-forks/#london)सह इथेरियम नेटवर्कवरील व्यवहार शुल्क मोजण्याची पद्धत बदलली. लंडन अपग्रेडपूर्वी, `base` आणि `priority` शुल्क वेगळे न करता शुल्क खालीलप्रमाणे मोजले जात असे:

समजा ॲलिसला बॉबला 1 ETH द्यायचे आहेत. या व्यवहारामध्ये, गॅस मर्यादा 21,000 युनिट्स आहे आणि गॅसची किंमत 200 Gwei आहे.

एकूण शुल्क असे झाले असते: `Gas units (limit) * Gas price per unit` म्हणजेच `21,000 * 200 = 4,200,000 gwei` किंवा 0.0042 ETH

लंडन अपग्रेडमध्ये [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) च्या अंमलबजावणीमुळे व्यवहार शुल्क यंत्रणा अधिक गुंतागुंतीची झाली, परंतु गॅस शुल्क अधिक अंदाजित करण्यायोग्य बनले, ज्यामुळे व्यवहार शुल्क बाजारपेठ अधिक कार्यक्षम झाली. वापरकर्ते व्यवहार पूर्ण करण्यासाठी ते किती पैसे देण्यास तयार आहेत यानुसार `maxFeePerGas` सह व्यवहार सबमिट करू शकतात, हे जाणून की ते गॅसच्या बाजारभावापेक्षा (`baseFeePerGas`) जास्त पैसे देणार नाहीत, आणि त्यांची टिप वजा करून उर्वरित अतिरिक्त रक्कम परत मिळवू शकतात.

हा व्हिडिओ EIP-1559 आणि त्याचे फायदे स्पष्ट करतो: [EIP-1559 स्पष्टीकरण](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [तुम्ही विकेंद्रित ॲप्लिकेशन (dapp) डेव्हलपर आहात का? तुमच्या लायब्ररी आणि टूल्स अपग्रेड करण्याची खात्री करा.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Ethereum Cat Herders चे स्पष्टीकरण वाचा](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="लंडन EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>व्यवहार शुल्क बाजारपेठेत सुधारणा करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>ब्लॉकमधून <code>BASEFEE</code> परत करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>EVM ऑपरेशन्ससाठी गॅस परतावा कमी करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code> ने सुरू होणारे कॉन्ट्रॅक्ट्स तैनात करण्यास प्रतिबंध करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>आइस एज डिसेंबर 2021 पर्यंत पुढे ढकलते</em></li>
</ul>

</ExpandableCard>

---

### बर्लिन {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### सारांश {#berlin-summary}

बर्लिन अपग्रेडने काही EVM क्रियांसाठी गॅस खर्चाला अनुकूल केले आणि एकाधिक व्यवहार प्रकारांसाठी समर्थन वाढवले.

- [इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Ethereum Cat Herders चे स्पष्टीकरण वाचा](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="बर्लिन EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>MODEXP गॅस खर्च कमी करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>एकाधिक व्यवहार प्रकारांसाठी सोपे समर्थन सक्षम करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>स्थिती ॲक्सेस ऑपकोड्ससाठी गॅस खर्च वाढवते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>पर्यायी ॲक्सेस याद्या जोडते</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### बीकन साखळी निर्मिती {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### सारांश {#beacon-chain-genesis-summary}

[बीकन साखळी](/roadmap/beacon-chain/) सुरक्षितपणे सुरू करण्यासाठी 32 स्टेक केलेल्या ETH च्या 16384 ठेवींची आवश्यकता होती. हे 27 नोव्हेंबर रोजी घडले आणि बीकन साखळीने 1 डिसेंबर 2020 रोजी ब्लॉक्स तयार करण्यास सुरुवात केली.

[इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  बीकन साखळी
</DocLink>

---

### स्टेकिंग ठेव कॉन्ट्रॅक्ट तैनात केले {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### सारांश {#deposit-contract-summary}

स्टेकिंग ठेव कॉन्ट्रॅक्टने इथेरियम इकोसिस्टममध्ये [स्टेकिंग](/glossary/#staking) सादर केले. जरी हे [मुख्यनेट](/glossary/#mainnet) कॉन्ट्रॅक्ट असले तरी, त्याचा [बीकन साखळी](/roadmap/beacon-chain/) सुरू करण्याच्या टाइमलाइनवर थेट परिणाम झाला, जे एक महत्त्वाचे [इथेरियम अपग्रेड](/roadmap/) आहे.

[इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  स्टेकिंग
</DocLink>

---

### मुइर ग्लेशियर {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### सारांश {#muir-glacier-summary}

मुइर ग्लेशियर फोर्कने [काठिण्य बॉम्ब](/glossary/#difficulty-bomb) मध्ये विलंब आणला. [प्रूफ-ऑफ-वर्क (PoW)](/developers/docs/consensus-mechanisms/pow/) सहमती यंत्रणेच्या ब्लॉक काठिण्य वाढीमुळे व्यवहार पाठवण्यासाठी आणि विकेंद्रित ॲप्लिकेशन्स (dapps) वापरण्यासाठी प्रतीक्षा वेळ वाढून इथेरियमची उपयोगिता कमी होण्याचा धोका निर्माण झाला होता.

- [इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Ethereum Cat Herders चे स्पष्टीकरण वाचा](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="मुइर ग्लेशियर EIPs" contentPreview="या फोर्कमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>काठिण्य बॉम्बला आणखी 4,000,000 ब्लॉक्स किंवा ~611 दिवसांसाठी विलंबित करते.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### इस्तंबूल {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### सारांश {#istanbul-summary}

इस्तंबूल फोर्क:

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) मधील काही विशिष्ट कृतींचा [गॅस](/glossary/#gas) खर्च अनुकूल केला.
- डिनायल-ऑफ-सर्व्हिस (denial-of-service) हल्ल्यांविरूद्धची प्रतिकारक्षमता सुधारली.
- SNARKs आणि STARKs वर आधारित [स्तर २ (L2) स्केलिंग](/developers/docs/scaling/#layer-2-scaling) सोल्यूशन्स अधिक कार्यक्षम बनवले.
- इथेरियम आणि Zcash ला एकमेकांशी संवाद साधण्यास (interoperate) सक्षम केले.
- कॉन्ट्रॅक्ट्सना अधिक सर्जनशील कार्ये (functions) सादर करण्याची अनुमती दिली.

[इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="इस्तंबूल EIPs" contentPreview="या फोर्कमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>इथेरियमला Zcash सारख्या गोपनीयता-जपणार्‍या चलनासोबत काम करण्याची अनुमती देते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>[गॅस](/glossary/#gas) खर्च सुधारण्यासाठी स्वस्त गूढलेखन (cryptography).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><code>CHAINID</code> [ऑपकोड](/developers/docs/ethereum-stack/#ethereum-virtual-machine) जोडून इथेरियमचे रिप्ले (replay) हल्ल्यांपासून संरक्षण करते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>वापरानुसार ऑपकोड गॅसच्या किमती अनुकूल करते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>ब्लॉकमध्ये अधिक डेटा सामावून घेण्यासाठी CallData चा खर्च कमी करते – [स्तर २ (L2) स्केलिंग](/developers/docs/scaling/#layer-2-scaling)साठी उपयुक्त.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>इतर ऑपकोड गॅस किमतीतील बदल.</em></li>
</ul>

</ExpandableCard>

---

### कॉन्स्टँटिनोपल {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### सारांश {#constantinople-summary}

कॉन्स्टँटिनोपल फोर्क:

- ब्लॉक [खनन](/developers/docs/consensus-mechanisms/pow/mining/) बक्षीस 3 वरून 2 ETH पर्यंत कमी केले.
- [प्रूफ-ऑफ-स्टेक (PoS) लागू होण्या](#beacon-chain-genesis)पूर्वी ब्लॉकचेन गोठणार नाही याची खात्री केली.
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) मधील काही विशिष्ट कृतींचा [गॅस](/glossary/#gas) खर्च अनुकूल केला.
- अद्याप तयार न झालेल्या पत्त्यांशी संवाद साधण्याची क्षमता जोडली.

[इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="कॉन्स्टँटिनोपल EIPs" contentPreview="या फोर्कमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>काही विशिष्ट ऑनचेन कृतींचा खर्च अनुकूल करते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>अद्याप तयार न झालेल्या पत्त्यांशी संवाद साधण्याची तुम्हाला अनुमती देते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>दुसऱ्या कॉन्ट्रॅक्टच्या कोडचा हॅश मिळवण्यासाठी <code>EXTCODEHASH</code> सूचना (instruction) सादर करते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>प्रूफ-ऑफ-स्टेक (PoS) पूर्वी ब्लॉकचेन गोठणार नाही याची खात्री करते आणि ब्लॉक बक्षीस 3 वरून 2 ETH पर्यंत कमी करते.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### बायझँटियम {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### सारांश {#byzantium-summary}

बायझँटियम फोर्क:

- ब्लॉक [खनन](/developers/docs/consensus-mechanisms/pow/mining/) बक्षिसे 5 वरून 3 ETH पर्यंत कमी केली.
- [काठिण्य बॉम्ब](/glossary/#difficulty-bomb) एका वर्षाने पुढे ढकलला.
- इतर कॉन्ट्रॅक्ट्सना स्थिती न बदलणारे कॉल्स करण्याची क्षमता जोडली.
- [स्तर २ (l2) स्केलिंगला](/developers/docs/scaling/#layer-2-scaling) अनुमती देण्यासाठी काही विशिष्ट गूढलेखन पद्धती जोडल्या.

[इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="बायझँटियम EIPs" contentPreview="या फोर्कमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em><code>REVERT</code> ऑपकोड जोडते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>यश किंवा अपयश दर्शवण्यासाठी व्यवहार पावत्यांमध्ये स्थिती फील्ड जोडले.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/) ला अनुमती देण्यासाठी लंबवर्तुळाकार वक्र आणि स्केलर गुणाकार जोडते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/) ला अनुमती देण्यासाठी लंबवर्तुळाकार वक्र आणि स्केलर गुणाकार जोडते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA स्वाक्षरी पडताळणी सक्षम करते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>व्हेरिएबल लांबीच्या रिटर्न मूल्यांसाठी समर्थन जोडते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em><code>STATICCALL</code> ऑपकोड जोडते, ज्यामुळे इतर कॉन्ट्रॅक्ट्सना स्थिती न बदलणारे कॉल्स करण्याची अनुमती मिळते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>काठिण्य समायोजन सूत्र बदलते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>[काठिण्य बॉम्ब](/glossary/#difficulty-bomb) 1 वर्षाने पुढे ढकलते आणि ब्लॉक बक्षीस 5 वरून 3 ETH पर्यंत कमी करते.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### स्प्युरियस ड्रॅगन {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### सारांश {#spurious-dragon-summary}

स्प्युरियस ड्रॅगन फोर्क हा नेटवर्कवरील (सप्टेंबर/ऑक्टोबर 2016) डिनायल ऑफ सर्व्हिस (DoS) हल्ल्यांना दिलेला दुसरा प्रतिसाद होता, ज्यामध्ये खालील गोष्टींचा समावेश होता:

- नेटवर्कवरील भविष्यातील हल्ले टाळण्यासाठी ऑपकोडच्या किंमतीत बदल करणे.
- ब्लॉकचेन स्थितीचे "डीब्लोट" (आकार कमी करणे) सक्षम करणे.
- रिप्ले अटॅक संरक्षण जोडणे.

[इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="स्प्युरियस ड्रॅगन EIPs" contentPreview="या फोर्कमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>एका इथेरियम चेनवरील व्यवहार पर्यायी चेनवर पुन्हा प्रसारित होण्यापासून प्रतिबंधित करते, उदाहरणार्थ टेस्टनेट व्यवहार मुख्य इथेरियम चेनवर पुन्हा प्ले होण्यापासून रोखते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em><code>EXP</code> ऑपकोडच्या किंमती समायोजित करते – संगणकीयदृष्ट्या महागड्या कॉन्ट्रॅक्ट ऑपरेशन्सद्वारे नेटवर्कचा वेग कमी करणे अधिक कठीण बनवते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS हल्ल्यांद्वारे जोडलेली रिकामी खाती काढून टाकण्याची परवानगी देते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>ब्लॉकचेनवरील कॉन्ट्रॅक्टचा जास्तीत जास्त कोड आकार बदलून 24576 बाइट्स करते.</em></li>
</ul>

</ExpandableCard>

---

### टँजेरिन व्हिसल {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### सारांश {#tangerine-whistle-summary}

टँजेरिन व्हिसल फोर्क हा नेटवर्कवरील (सप्टेंबर/ऑक्टोबर 2016) डिनायल ऑफ सर्व्हिस (DoS) हल्ल्यांना दिलेला पहिला प्रतिसाद होता, ज्यामध्ये खालील गोष्टींचा समावेश होता:

- कमी किंमत असलेल्या ऑपरेशन कोड्सशी संबंधित नेटवर्कच्या आरोग्याच्या तातडीच्या समस्या सोडवणे.

[इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="टँजेरिन व्हिसल EIPs" contentPreview="या फोर्कमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>स्पॅम हल्ल्यांमध्ये वापरल्या जाणाऱ्या ऑपकोड्सची गॅसची किंमत वाढवते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>इथेरियम प्रोटोकॉलच्या पूर्वीच्या आवृत्त्यांमधील त्रुटींमुळे अतिशय कमी खर्चात स्थितीत ठेवलेली मोठ्या संख्येने रिकामी खाती काढून टाकून स्थितीचा आकार कमी करते.</em></li>
</ul>

</ExpandableCard>

---

### DAO फोर्क {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### सारांश {#dao-fork-summary}

DAO फोर्क हा [2016 च्या DAO हल्ल्याला](https://www.coindesk.com/learn/understanding-the-dao-attack/) दिलेला प्रतिसाद होता, ज्यामध्ये एका असुरक्षित [DAO](/glossary/#dao) कॉन्ट्रॅक्टमधून हॅकिंगद्वारे 3.6 दशलक्षाहून अधिक ETH काढले गेले होते. या फोर्कने सदोष कॉन्ट्रॅक्टमधून निधी एका [नवीन कॉन्ट्रॅक्टमध्ये](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) हलवला ज्यामध्ये फक्त एकच कार्य होते: withdraw (पैसे काढणे). ज्यांचे पैसे बुडाले होते ते त्यांच्या वॉलेटमधील प्रत्येक 100 DAO टोकन्ससाठी 1 ETH काढू शकत होते.

या कृतीवर इथेरियम समुदायाने मतदान केले होते. कोणताही ETH धारक [मतदान प्लॅटफॉर्मवर](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) व्यवहाराद्वारे मतदान करू शकत होता. फोर्क करण्याच्या निर्णयाला 85% पेक्षा जास्त मते मिळाली.

काही खनिकांनी फोर्क करण्यास नकार दिला कारण DAO ची घटना ही प्रोटोकॉलमधील त्रुटी नव्हती. त्यांनी पुढे जाऊन [इथेरियम क्लासिक](https://ethereumclassic.org/) ची स्थापना केली.

[इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### होमस्टेड {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### सारांश {#homestead-summary}

होमस्टेड फोर्कने भविष्याकडे पाहिले. यामध्ये अनेक प्रोटोकॉल बदल आणि एक नेटवर्किंग बदल समाविष्ट होता ज्यामुळे इथेरियमला पुढील नेटवर्क अपग्रेड्स करण्याची क्षमता मिळाली.

[इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="होमस्टेड EIPs" contentPreview="या फोर्कमध्ये समाविष्ट असलेल्या अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>कॉन्ट्रॅक्ट तयार करण्याच्या प्रक्रियेत बदल करते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>नवीन ऑपकोड जोडते: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p फॉरवर्ड कंपॅटिबिलिटी आवश्यकता सादर करते</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### फ्रंटियर थॉइंग {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### सारांश {#frontier-thawing-summary}

फ्रंटियर थॉइंग फोर्कने प्रति [ब्लॉक](/glossary/#block) 5,000 [गॅस](/glossary/#gas) मर्यादा काढून टाकली आणि डीफॉल्ट गॅसची किंमत 51 [Gwei](/glossary/#gwei) वर सेट केली. यामुळे व्यवहारांना परवानगी मिळाली – व्यवहारांसाठी 21,000 गॅस आवश्यक असतो. भविष्यात [प्रूफ-ऑफ-स्टेक (PoS)](/glossary/#pos) मध्ये हार्ड-फोर्क निश्चित करण्यासाठी [काठिण्य बॉम्ब](/glossary/#difficulty-bomb) सादर करण्यात आला.

- [इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [इथेरियम प्रोटोकॉल अपडेट 1 वाचा](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### फ्रंटियर {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### सारांश {#frontier-summary}

फ्रंटियर ही इथेरियम प्रोजेक्टची एक लाईव्ह, परंतु अगदी प्राथमिक अंमलबजावणी होती. ती यशस्वी ऑलिम्पिक चाचणी टप्प्यानंतर आली. ती तांत्रिक वापरकर्त्यांसाठी, विशेषतः डेव्हलपर्ससाठी तयार करण्यात आली होती. [ब्लॉक्सची](/glossary/#block) [गॅस](/glossary/#gas) मर्यादा 5,000 होती. या 'थॉइंग' कालावधीमुळे मायनर्स त्यांचे कार्य सुरू करू शकले आणि सुरुवातीच्या वापरकर्त्यांना कोणतीही 'घाई' न करता त्यांचे क्लायंट्स इन्स्टॉल करण्याची संधी मिळाली.

[इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### इथर विक्री {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

इथर अधिकृतपणे 42 दिवसांसाठी विक्रीसाठी उपलब्ध झाले. तुम्ही ते BTC वापरून खरेदी करू शकत होता.

[इथेरियम फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### येलो पेपर प्रकाशित {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

डॉ. गॅव्हिन् वूड् यांनी लिहिलेला येलो पेपर, हा इथेरियम प्रोटोकॉलची तांत्रिक व्याख्या आहे.

[येलो पेपर पहा](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### श्वेतपत्रिका प्रकाशित {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

इथेरियमचे संस्थापक विटालिक् बुटेरिन् यांनी 2015 मध्ये प्रकल्प सुरू होण्यापूर्वी, 2013 मध्ये प्रकाशित केलेला प्रास्ताविक पेपर.

<DocLink href="/whitepaper/">
  श्वेतपत्रिका
</DocLink>