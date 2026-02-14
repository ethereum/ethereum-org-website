---
title: "सर्व Ethereum फोर्क्सची टाइमलाइन (2014 ते आतापर्यंत)"
description: "प्रमुख टप्पे, रिलीझ आणि फोर्क्ससह Ethereum ब्लॉकचेनचा इतिहास."
lang: mr
sidebarDepth: 1
---

# सर्व Ethereum फोर्क्सची टाइमलाइन (2014 ते आतापर्यंत) {#the-history-of-ethereum}

Ethereum ब्लॉकचेनचे सर्व प्रमुख टप्पे, फोर्क्स आणि अपडेट्सची टाइमलाइन.

<ExpandableCard title="फोर्क्स म्हणजे काय?" contentPreview="Ethereum प्रोटोकॉलच्या नियमांमध्ये बदल, ज्यात नियोजित तांत्रिक अपग्रेडचा समावेश असतो.">

जेव्हा नेटवर्कमध्ये मोठे तांत्रिक अपग्रेड किंवा बदल करणे आवश्यक असते तेव्हा फोर्क्स होतात - ते सामान्यतः [Ethereum सुधारणा प्रस्ताव (EIPs)](/eips/) मधून येतात आणि प्रोटोकॉलचे "नियम" बदलतात.

पारंपारिक, केंद्रीय-नियंत्रित सॉफ्टवेअरमध्ये अपग्रेडची आवश्यकता असते, तेव्हा कंपनी अंतिम-वापरकर्त्यासाठी फक्त एक नवीन आवृत्ती प्रकाशित करते. ब्लॉकचेन्स वेगळ्या पद्धतीने काम करतात कारण तेथे कोणतीही केंद्रीय मालकी नाही. [Ethereum क्लायंट्सनी](/developers/docs/nodes-and-clients/) नवीन फोर्क नियम लागू करण्यासाठी त्यांचे सॉफ्टवेअर अपडेट करणे आवश्यक आहे. याशिवाय ब्लॉक निर्माते (प्रूफ-ऑफ-वर्क जगात मायनर्स, प्रूफ-ऑफ-स्टेक जगात व्हॅलिडेटर्स) आणि नोड्सनी नवीन नियमांनुसार ब्लॉक्स तयार केले पाहिजेत आणि प्रमाणित केले पाहिजेत. [कन्सेंसस यंत्रणांबद्दल अधिक](/developers/docs/consensus-mechanisms/)

हे नियम बदल नेटवर्कमध्ये तात्पुरते विभाजन निर्माण करू शकतात. नवीन ब्लॉक्स नवीन नियमांनुसार किंवा जुन्या नियमांनुसार तयार केले जाऊ शकतात. फोर्क्सवर सहसा आधीच सहमती दर्शविली जाते जेणेकरून क्लायंट एकमताने बदल स्वीकारतील आणि अपग्रेडसह फोर्क मुख्य चेन बनेल. तथापि, क्वचित प्रसंगी, फोर्क्सवरील मतभेद नेटवर्कमध्ये कायमचे विभाजन घडवून आणू शकतात – विशेषतः <a href="#dao-fork">DAO फोर्क</a> सह Ethereum क्लासिकची निर्मिती.
</ExpandableCard>

<ExpandableCard title="काही अपग्रेड्सना अनेक नावे का असतात?" contentPreview="अपग्रेडच्या नावांची एक विशिष्ट पद्धत असते.">

Ethereum च्या मुळाशी असलेले सॉफ्टवेअर दोन भागांनी बनलेले आहे, जे [एक्सिक्यूशन लेअर](/glossary/#execution-layer) आणि [कन्सेंसस लेअर](/glossary/#consensus-layer) म्हणून ओळखले जातात.

**एक्सिक्यूशन अपग्रेडचे नावकरण**

2021 पासून, **एक्सिक्यूशन लेअर** मधील अपग्रेड्सना कालक्रमानुसार [मागील Devcon स्थानांच्या](https://devcon.org/en/past-events/) शहरांच्या नावांवरून नाव दिले जाते:

| अपग्रेडचे नाव | Devcon वर्ष | Devcon क्रमांक | अपग्रेडची तारीख |
| ------------- | ----------- | -------------- | --------------- |
| बर्लिन        | 2014        | 0              | 15 एप्रिल, 2021 |
| लंडन          | 2015        | I              | 5 ऑगस्ट, 2021   |
| शांघाय        | 2016        | II             | 12 एप्रिल, 2023 |
| कँकून         | 2017        | III            | 13 मार्च, 2024  |
| **प्राग**     | 2018        | IV             | TBD - पुढील     |
| _ओसाका_       | 2019        | V              | TBD             |
| _बोगोटा_      | 2022        | VI             | TBD             |
| _बँगकॉक_      | 2024        | VII            | TBD             |

**कन्सेंसस अपग्रेड नामकरण**

[बीकन चेन](/glossary/#beacon-chain) लाँच झाल्यापासून, **कन्सेंसस लेअर** मधील अपग्रेड्सना वर्णानुक्रमे पुढे जाणाऱ्या अक्षरांनी सुरू होणाऱ्या खगोलीय ताऱ्यांवरून नावे दिली जातात:

| अपग्रेडचे नाव                                                 | अपग्रेडची तारीख  |
| ------------------------------------------------------------- | ---------------- |
| बीकन चेन जेनेसिस                                              | 1 डिसेंबर, 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 27 ऑक्टोबर, 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 6 सप्टेंबर, 2022 |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 12 एप्रिल, 2023  |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 13 मार्च, 2024   |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | TBD - पुढील      |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | TBD              |

**एकत्रित नामकरण**

एक्सिक्यूशन आणि कन्सेंसस अपग्रेड्स सुरुवातीला वेगवेगळ्या वेळी लागू केले गेले होते, परंतु 2022 मध्ये [द मर्ज](/roadmap/merge/) नंतर ते एकाच वेळी तैनात केले गेले आहेत. त्यामुळे, या अपग्रेड्सचा संदर्भ एकाच जोडलेल्या शब्दाचा वापर करून सोपा करण्यासाठी बोलचालीतील शब्द उदयास आले आहेत. याची सुरुवात _Shanghai-Capella_ अपग्रेडने झाली, ज्याला सामान्यतः "**Shapella**" म्हटले जाते आणि _Cancun-Deneb_ (**Dencun**) आणि _Prague-Electra_ (**Pectra**) अपग्रेडसह ते पुढे चालू आहे.

| एक्सिक्यूशन अपग्रेड | कन्सेंसस अपग्रेड | लहान नाव   |
| ------------------- | ---------------- | ---------- |
| शांघाय              | Capella          | "Shapella" |
| कँकून               | Deneb            | "Dencun"   |
| प्राग               | Electra          | "Pectra"   |
| ओसाका               | Fulu             | "Fusaka"   |
</ExpandableCard>

काही विशेष महत्त्वाच्या मागील अपग्रेड्सबद्दल थेट माहितीवर जा: [द बीकन चेन](/roadmap/beacon-chain/); [द मर्ज](/roadmap/merge/); आणि [EIP-1559](#london)

भविष्यातील प्रोटोकॉल अपग्रेड शोधत आहात? [Ethereum रोडमॅपवर आगामी अपग्रेड्सबद्दल जाणून घ्या](/roadmap/).

<Divider />

## 2025 {#2025}

### फुलू-ओसाका ("फुसाका") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[फुसाकाबद्दल अधिक](/roadmap/fusaka/)

### प्राग-इलेक्ट्रा ("पेक्ट्रा") {#pectra}

<NetworkUpgradeSummary name="pectra" />

प्राग-इलेक्ट्रा ("पेक्ट्रा") अपग्रेडमध्ये Ethereum प्रोटोकॉलमध्ये अनेक सुधारणांचा समावेश होता, ज्याचा उद्देश सर्व वापरकर्ते, लेअर 2 नेटवर्क्स, स्टेकर्स आणि नोड ऑपरेटर्ससाठी अनुभव वाढवणे हा होता.

स्टेकिंगला कंपाऊंडिंग व्हॅलिडेटर खात्यांसह एक अपग्रेड मिळाला, आणि एक्सिक्यूशन विथड्रॉवल ॲड्रेस वापरून स्टेक केलेल्या फंडांवर सुधारित नियंत्रण मिळाले. EIP-7251 ने एका व्हॅलिडेटरसाठी कमाल प्रभावी शिल्लक 2048 पर्यंत वाढवली, ज्यामुळे स्टेकर्ससाठी भांडवली कार्यक्षमता सुधारली. EIP-7002 ने एका एक्सिक्यूशन खात्याला व्हॅलिडेटर क्रिया सुरक्षितपणे ट्रिगर करण्यास सक्षम केले, ज्यात बाहेर पडणे, किंवा निधीचा काही भाग काढून घेणे समाविष्ट आहे, ज्यामुळे ETH स्टेकर्सचा अनुभव सुधारला, आणि नोड ऑपरेटर्ससाठी जबाबदारी मजबूत करण्यास मदत झाली.

अपग्रेडच्या इतर भागांमध्ये सामान्य वापरकर्त्यांसाठी अनुभव सुधारण्यावर लक्ष केंद्रित केले गेले. EIP-7702 ने सामान्य नॉन-स्मार्ट-कॉन्ट्रॅक्ट खाते ([EOA](/glossary/#eoa)) ला स्मार्ट कॉन्ट्रॅक्टसारखा कोड एक्सिक्यूट करण्याची क्षमता आणली. याने पारंपारिक Ethereum खात्यांसाठी अमर्याद नवीन कार्यक्षमता अनलॉक केली, जसे की व्यवहार बॅचिंग, गॅस प्रायोजकत्व, पर्यायी प्रमाणीकरण, प्रोग्राम करण्यायोग्य खर्च नियंत्रणे, खाते पुनर्प्राप्ती यंत्रणा आणि बरेच काही.

<ExpandableCard title="पेक्ट्रा EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट अधिकृत सुधारणा.">

चांगला वापरकर्ता अनुभव:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOA खाते कोड सेट करा</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>ब्लॉब थ्रुपुट वाढ</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>कॉलडेटा खर्च वाढवा</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>EL कॉन्फिगरेशन फाइल्समध्ये ब्लॉब शेड्यूल जोडा</em></li>
</ul>

उत्तम स्टेकिंग अनुभव:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em><code>MAX_EFFECTIVE_BALANCE</code> वाढवा</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>एक्सिक्यूशन लेअर ट्रिगर करण्यायोग्य एक्सिट्स</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>सामान्य उद्देश एक्सिक्यूशन लेअर विनंत्या</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>चेनवर व्हॅलिडेटर ठेवी पुरवा</em></li>
</ul>

प्रोटोकॉल कार्यक्षमता आणि सुरक्षा सुधारणा:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381 कर्व ऑपरेशन्ससाठी प्रीकंपाइल</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>स्टेटमध्ये ऐतिहासिक ब्लॉक हॅशेस सेव्ह करा</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>समिती इंडेक्स ॲटेस्टेशनच्या बाहेर हलवा</em></li>
</ul>
</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [पेक्ट्रा स्टेकिंगचा अनुभव कसा वाढवेल](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [इलेक्ट्रा अपग्रेड स्पेसिफिकेशन्स वाचा](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [प्राग-इलेक्ट्रा ("पेक्ट्रा") FAQ](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### कँकून-डेनेब ("डेनकून") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### कँकून सारांश {#cancun-summary}

कँकून अपग्रेडमध्ये डेनेब कन्सेंसस अपग्रेड्ससह स्केलेबिलिटी सुधारण्याच्या उद्देशाने Ethereum च्या _एक्सिक्यूशन_ मध्ये सुधारणांचा संच आहे.

विशेष म्हणजे यामध्ये EIP-4844 समाविष्ट आहे, जे **प्रोटो-डँकशार्डिंग** म्हणून ओळखले जाते, ज्यामुळे लेअर 2 रोलअपसाठी डेटा स्टोरेजचा खर्च लक्षणीयरीत्या कमी होतो. हे डेटा "ब्लॉब्स" च्या परिचयाने साधले जाते जे रोलअप्सना थोड्या कालावधीसाठी मेननेटवर डेटा पोस्ट करण्यास सक्षम करते. यामुळे लेअर 2 रोलअप्सच्या वापरकर्त्यांसाठी व्यवहाराचे शुल्क लक्षणीयरीत्या कमी होते.

<ExpandableCard title="कॅनकुन EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>तात्पुरते स्टोरेज ऑपकोड्स</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM मधील बीकन ब्लॉक रूट</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>शार्ड ब्लॉब व्यवहार (प्रोटो-डँकशार्डिंग)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - मेमरी कॉपी करण्याची सूचना</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> फक्त त्याच व्यवहारात</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> ऑपकोड</em></li>
</ul>
</ExpandableCard>

- [लेअर 2 रोलअप्स](/layer-2/)
- [प्रोटो-डँकशार्डिंग](/roadmap/scaling/#proto-danksharding)
- [डँकशार्डिंग](/roadmap/danksharding/)
- [कँकून अपग्रेड स्पेसिफिकेशन वाचा](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### डेनेब सारांश {#deneb-summary}

डेनेब अपग्रेडमध्ये Ethereum च्या _कन्सेंसस_ मध्ये स्केलेबिलिटी सुधारण्याच्या उद्देशाने सुधारणांचा संच आहे. हे अपग्रेड प्रोटो-डँकशार्डिंग (EIP-4844) सक्षम करण्यासाठी कँकून एक्सिक्यूशन अपग्रेड्ससोबत येते, तसेच बीकन चेनमध्ये इतर सुधारणांसह येते.

आधीपासून तयार केलेले स्वाक्षरी केलेले "स्वैच्छिक एक्सिट संदेश" यापुढे कालबाह्य होत नाहीत, त्यामुळे तृतीय-पक्ष नोड ऑपरेटरकडे आपले फंड स्टेक करणाऱ्या वापरकर्त्यांना अधिक नियंत्रण मिळते. या स्वाक्षरी केलेल्या एक्सिट संदेशासह, स्टेकर्स नोड ऑपरेशन डेलीगेट करू शकतात आणि कोणाकडूनही परवानगी न मागता कधीही सुरक्षितपणे बाहेर पडण्याची आणि त्यांचे फंड काढून घेण्याची क्षमता राखू शकतात.

EIP-7514 व्हॅलिडेटर्स नेटवर्कमध्ये सामील होण्याच्या "चर्न" दराला प्रति इपॉक आठ (8) पर्यंत मर्यादित करून ETH च्या इश्युअन्सला कडक करते. ETH इश्युअन्स एकूण स्टेक केलेल्या ETH च्या प्रमाणात असल्याने, सामील होणाऱ्या व्हॅलिडेटर्सची संख्या मर्यादित केल्याने नवीन जारी केलेल्या ETH च्या _वाढीचा दर_ मर्यादित होतो, तसेच नोड ऑपरेटर्ससाठी हार्डवेअर आवश्यकता कमी होतात, ज्यामुळे विकेंद्रीकरणाला मदत होते.

<ExpandableCard title="डेनेब EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट अधिकृत सुधारणा">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM मधील बीकन ब्लॉक रूट</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>शार्ड ब्लॉब व्यवहार</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>कायमस्वरूपी वैध स्वाक्षरी केलेले स्वैच्छिक एक्सिट्स</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>कमाल ॲटेस्टेशन इन्क्लूजन स्लॉट वाढवा</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>कमाल इपॉक चर्न मर्यादा जोडा</em></li>
</ul>
</ExpandableCard>

- [डेनेब अपग्रेड स्पेसिफिकेशन्स वाचा](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [कँकून-डेनेब ("डेनकून") FAQ](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### शांघाय-कॅपेलॅ ("शेपेलॅ") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### शांघाय सारांश {#shanghai-summary}

शांघाय अपग्रेडने एक्सिक्यूशन लेअरवर स्टेकिंग विथड्रॉवल आणले. कॅपेलॅ अपग्रेडसोबत, यामुळे ब्लॉक्सना विथड्रॉवल ऑपरेशन्स स्वीकारण्याची परवानगी मिळाली, ज्यामुळे स्टेकर्सना त्यांचे ETH बीकन चेनवरून एक्सिक्यूशन लेअरवर काढता येतात.

<ExpandableCard title="शांघाय EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code> ॲड्रेस वॉर्म सुरू करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>नवीन <code>PUSH0</code> सूचना</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>initcode मर्यादित करा आणि मोजा</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>बीकन चेन पुश विथड्रॉवल्स ऑपरेशन्स म्हणून</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code> डेप्रिकेट करा</em></li>
</ul>
</ExpandableCard>

- [शांघाय अपग्रेड स्पेसिफिकेशन वाचा](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### कॅपेलॅ सारांश {#capella-summary}

कॅपेलॅ अपग्रेड हा कन्सेंसस लेअर (बीकन चेन) चा तिसरा मोठा अपग्रेड होता आणि त्याने स्टेकिंग विथड्रॉवल सक्षम केले. कॅपेलॅ एक्सिक्यूशन लेअर अपग्रेड, शांघायसोबत समकालिकपणे झाले आणि त्याने स्टेकिंग विथड्रॉवल कार्यक्षमता सक्षम केली.

या कन्सेंसस लेअर अपग्रेडमुळे ज्या स्टेकर्सनी त्यांच्या सुरुवातीच्या ठेवीसह विथड्रॉवल क्रेडेन्शियल दिले नव्हते त्यांना ते देण्याची क्षमता मिळाली, ज्यामुळे विथड्रॉवल सक्षम झाले.

अपग्रेडने स्वयंचलित खाते स्वीपिंग कार्यक्षमता देखील प्रदान केली, जी कोणत्याही उपलब्ध रिवॉर्ड पेमेंट्स किंवा पूर्ण विथड्रॉवलसाठी व्हॅलिडेटर खात्यांवर सतत प्रक्रिया करते.

- [स्टेकिंग विथड्रॉवल्सबद्दल अधिक](/staking/withdrawals/).
- [कॅपेलॅ अपग्रेड स्पेसिफिकेशन्स वाचा](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### पॅरिस (द मर्ज) {#paris}

<NetworkUpgradeSummary name="paris" />

#### सारांश {#paris-summary}

पॅरिस अपग्रेड 58750000000000000000000 च्या [टर्मिनल टोटल डिफिकल्टी](/glossary/#terminal-total-difficulty) पार केल्यावर प्रूफ-ऑफ-वर्क ब्लॉकचेनद्वारे ट्रिगर झाले. हे 15 सप्टेंबर 2022 रोजी ब्लॉक 15537393 वर झाले, ज्यामुळे पुढील ब्लॉकवर पॅरिस अपग्रेड ट्रिगर झाला. पॅरिस हे [द मर्ज](/roadmap/merge/) संक्रमण होते - त्याचे प्रमुख वैशिष्ट्य म्हणजे [प्रूफ-ऑफ-वर्क](/developers/docs/consensus-mechanisms/pow) मायनिंग अल्गोरिदम आणि संबंधित कन्सेंसस लॉजिक बंद करणे आणि त्याऐवजी [प्रूफ-ऑफ-स्टेक](/developers/docs/consensus-mechanisms/pos) चालू करणे होते. पॅरिस स्वतः [एक्सिक्यूशन क्लायंट्स](/developers/docs/nodes-and-clients/#execution-clients) (कन्सेंसस लेअरवरील बेलॅट्रिक्सच्या समतुल्य) साठी एक अपग्रेड होता ज्यामुळे त्यांना त्यांच्या कनेक्ट केलेल्या [कन्सेंसस क्लायंट्स](/developers/docs/nodes-and-clients/#consensus-clients) कडून सूचना घेता आली. यासाठी अंतर्गत API पद्धतींचा एक नवीन संच आवश्यक होता, जो एकत्रितपणे [इंजिन API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) म्हणून ओळखला जातो, जो सक्रिय करणे आवश्यक होते. [होमस्टेड](#homestead) नंतर Ethereum च्या इतिहासातील हा कदाचित सर्वात महत्त्वपूर्ण अपग्रेड होता!

- [पॅरिस अपग्रेड स्पेसिफिकेशन वाचा](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="पॅरिस EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>कन्सेंसस प्रूफ-ऑफ-स्टेकवर अपग्रेड करा</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>DIFFICULTY ऑपकोडला PREVRANDAO ने बदला</em></li>
</ul>
</ExpandableCard>

---

### बेलॅट्रिक्स {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### बेलॅट्रिक्स सारांश {#bellatrix-summary}

बेलॅट्रिक्स अपग्रेड हा [बीकन चेन](/roadmap/beacon-chain) साठी दुसरा नियोजित अपग्रेड होता, जो चेनला [द मर्ज](/roadmap/merge/) साठी तयार करत होता. हे निष्क्रियता आणि स्लॅशेबल गुन्ह्यांसाठी व्हॅलिडेटर दंडांना त्यांच्या पूर्ण मूल्यांपर्यंत आणते. बेलॅट्रिक्समध्ये द मर्जसाठी चेन तयार करण्यासाठी आणि शेवटच्या प्रूफ-ऑफ-वर्क ब्लॉकपासून पहिल्या प्रूफ-ऑफ-स्टेक ब्लॉकपर्यंतच्या संक्रमणासाठी फोर्क निवड नियमांमध्ये एक अपडेट देखील समाविष्ट आहे. यात कन्सेंसस क्लायंट्सना 58750000000000000000000 च्या [टर्मिनल टोटल डिफिकल्टी](/glossary/#terminal-total-difficulty) बद्दल जागरूक करणे समाविष्ट आहे.

- [बेलॅट्रिक्स अपग्रेड स्पेसिफिकेशन वाचा](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### ग्रे ग्लेशियर {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### ग्रे ग्लेशियर सारांश {#gray-glacier-summary}

ग्रे ग्लेशियर नेटवर्क अपग्रेडने [डिफिकल्टी बॉम्ब](/glossary/#difficulty-bomb) तीन महिन्यांनी पुढे ढकलला. या अपग्रेडमध्ये सादर केलेला हा एकमेव बदल आहे आणि तो [ॲरो ग्लेशियर](#arrow-glacier) आणि [म्युर ग्लेशियर](#muir-glacier) अपग्रेड्ससारखाच आहे. असेच बदल [बायझँटियम](#byzantium), [कॉन्स्टँटिनोपल](#constantinople) आणि [लंडन](#london) नेटवर्क अपग्रेड्सवर केले गेले आहेत.

- [EF ब्लॉग - ग्रे ग्लेशियर अपग्रेड घोषणा](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="ग्रे ग्लेशियर EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>डिफिकल्टी बॉम्ब सप्टेंबर 2022 पर्यंत पुढे ढकलते</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2021 {#2021}

### ॲरो ग्लेशियर {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### ॲरो ग्लेशियर सारांश {#arrow-glacier-summary}

ॲरो ग्लेशियर नेटवर्क अपग्रेडने [डिफिकल्टी बॉम्ब](/glossary/#difficulty-bomb) अनेक महिन्यांनी पुढे ढकलला. या अपग्रेडमध्ये सादर केलेला हा एकमेव बदल आहे आणि तो [म्युर ग्लेशियर](#muir-glacier) अपग्रेड्ससारखाच आहे. असेच बदल [बायझँटियम](#byzantium), [कॉन्स्टँटिनोपल](#constantinople) आणि [लंडन](#london) नेटवर्क अपग्रेड्सवर केले गेले आहेत.

- [EF ब्लॉग - ॲरो ग्लेशियर अपग्रेड घोषणा](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum कॅट हर्डर्स - Ethereum ॲरो ग्लेशियर अपग्रेड](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="ॲरो ग्लेशियर EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>डिफिकल्टी बॉम्ब जून 2022 पर्यंत पुढे ढकलते</em></li>
</ul>
</ExpandableCard>

---

### अल्टेअर {#altair}

<NetworkUpgradeSummary name="altair" />

#### अल्टेअर सारांश {#altair-summary}

अल्टेअर अपग्रेड हा [बीकन चेन](/roadmap/beacon-chain) साठी पहिला नियोजित अपग्रेड होता. त्याने "सिंक कमिटी" साठी समर्थन जोडले—लाइट क्लायंट्स सक्षम करणे, आणि द मर्जच्या दिशेने विकास प्रगती करत असताना व्हॅलिडेटर निष्क्रियता आणि स्लॅशिंग दंड वाढवले.

- [अल्टेअर अपग्रेड स्पेसिफिकेशन वाचा](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />मजेदार तथ्य! {#altair-fun-fact}

अल्टेअर हा पहिला मोठा नेटवर्क अपग्रेड होता ज्याची रोलआउट वेळ निश्चित होती. यापूर्वीचे प्रत्येक अपग्रेड प्रूफ-ऑफ-वर्क चेनवरील घोषित ब्लॉक क्रमांकावर आधारित होते, जिथे ब्लॉक वेळ बदलते. बीकन चेनला प्रूफ-ऑफ-वर्कसाठी सोडवण्याची आवश्यकता नाही, आणि त्याऐवजी वेळे-आधारित इपॉक प्रणालीवर काम करते ज्यात 32 बारा-सेकंदांचे "स्लॉट्स" असतात ज्यात व्हॅलिडेटर्स ब्लॉक्स प्रस्तावित करू शकतात. म्हणूनच आम्हाला नक्की माहित होते की आपण इपॉक 74,240 वर पोहोचू आणि अल्टेअर लाईव्ह होईल!

- [ब्लॉक वेळ](/developers/docs/blocks/#block-time)

---

### लंडन {#london}

<NetworkUpgradeSummary name="london" />

#### लंडन सारांश {#london-summary}

लंडन अपग्रेडने [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) सादर केले, ज्याने व्यवहार शुल्क बाजारात सुधारणा केली, तसेच गॅस रिफंड कसे हाताळले जातात आणि [आईस एज](/glossary/#ice-age) शेड्यूलमध्ये बदल केले.

#### लंडन अपग्रेड / EIP-1559 काय होते? {#eip-1559}

लंडन अपग्रेडपूर्वी, Ethereum मध्ये निश्चित-आकाराचे ब्लॉक्स होते. उच्च नेटवर्क मागणीच्या काळात, हे ब्लॉक्स पूर्ण क्षमतेने चालत होते. परिणामी, वापरकर्त्यांना अनेकदा ब्लॉकमध्ये समाविष्ट होण्यासाठी मागणी कमी होण्याची प्रतीक्षा करावी लागत असे, ज्यामुळे वापरकर्त्याचा अनुभव खराब होत असे. लंडन अपग्रेडने Ethereum मध्ये बदलत्या-आकाराचे ब्लॉक्स सादर केले.

ऑगस्ट २०२१ च्या [लंडन अपग्रेड](/ethereum-forks/#london) सह Ethereum नेटवर्कवरील व्यवहार शुल्काची गणना करण्याची पद्धत बदलली. लंडन अपग्रेडपूर्वी, शुल्काची गणना `base` आणि `priority` शुल्क वेगळे न करता, खालीलप्रमाणे केली जात असे:

समजा ॲलिसला बॉबला 1 ETH द्यावे लागले. व्यवहारात, गॅस मर्यादा २१,००० युनिट्स आहे, आणि गॅसची किंमत २०० gwei आहे.

एकूण शुल्क असेल: `गॅस युनिट्स (मर्यादा) * प्रति युनिट गॅसची किंमत` म्हणजे `21,000 * 200 = 4,200,000 gwei` किंवा 0.0042 ETH

लंडन अपग्रेडमध्ये [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) च्या अंमलबजावणीने व्यवहार शुल्क यंत्रणा अधिक गुंतागुंतीची केली, परंतु गॅस शुल्क अधिक अंदाजित केले, ज्यामुळे अधिक कार्यक्षम व्यवहार शुल्क बाजार निर्माण झाला. वापरकर्ते `maxFeePerGas` सह व्यवहार सादर करू शकतात, जे ते व्यवहारासाठी किती पैसे देण्यास इच्छुक आहेत याच्याशी संबंधित आहे, हे जाणून की ते गॅसच्या बाजारभावापेक्षा (`baseFeePerGas`) जास्त पैसे देणार नाहीत, आणि त्यांना अतिरिक्त रक्कम, त्यांच्या टीपमधून वजा करून, परत मिळेल.

हा व्हिडिओ EIP-1559 आणि त्यामुळे होणारे फायदे स्पष्ट करतो: [EIP-1559 स्पष्टीकरण](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [तुम्ही एक डॅप डेव्हलपर आहात का? तुमच्या लायब्ररी आणि टूलिंग अपग्रेड करण्याचे सुनिश्चित करा.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Ethereum कॅट हर्डरचे स्पष्टीकरण वाचा](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="लंडन EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>व्यवहार शुल्क बाजार सुधारतो</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>एका ब्लॉकमधून <code>BASEFEE</code> परत करतो</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>EVM ऑपरेशन्ससाठी गॅस रिफंड कमी करतो</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code> ने सुरू होणारे करार तैनात करण्यास प्रतिबंध करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>आईस एज डिसेंबर 2021 पर्यंत पुढे ढकलते</em></li>
</ul>
</ExpandableCard>

---

### बर्लिन {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### बर्लिन सारांश {#berlin-summary}

बर्लिन अपग्रेडने काही EVM क्रियांसाठी गॅस खर्च ऑप्टिमाइझ केला आणि अनेक व्यवहार प्रकारांसाठी समर्थन वाढवले.

- [Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Ethereum कॅट हर्डरचे स्पष्टीकरण वाचा](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="बर्लिन EIPs" contentPreview="या अपग्रेडमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>ModExp गॅस खर्च कमी करतो</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>अनेक व्यवहार प्रकारांसाठी सोपे समर्थन सक्षम करते</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>स्टेट ॲक्सेस ऑपकोड्ससाठी गॅस खर्च वाढतो</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>पर्यायी ॲक्सेस याद्या जोडतो</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2020 {#2020}

### बीकन चेन जेनेसिस {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### बीकन चेन जेनेसिस सारांश {#beacon-chain-genesis-summary}

[बीकन चेन](/roadmap/beacon-chain/) ला सुरक्षितपणे पाठवण्यासाठी 32 स्टेक केलेल्या ETH च्या 16384 ठेवींची आवश्यकता होती. हे २७ नोव्हेंबर रोजी घडले, आणि बीकन चेनने १ डिसेंबर २०२० रोजी ब्लॉक्स तयार करण्यास सुरुवात केली.

[Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  बीकन चेन
</DocLink>

---

### स्टेकिंग डिपॉझिट करार तैनात केला गेला {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### डिपॉझिट करार सारांश {#deposit-contract-summary}

स्टेकिंग डिपॉझिट कराराने Ethereum इकोसिस्टममध्ये [स्टेकिंग](/glossary/#staking) सादर केले. जरी हा एक [मेननेट](/glossary/#mainnet) करार असला तरी, त्याचा [बीकन चेन](/roadmap/beacon-chain/) लाँच करण्याच्या टाइमलाइनवर थेट परिणाम झाला, जो एक महत्त्वाचा [Ethereum अपग्रेड](/roadmap/) आहे.

[Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  स्टेकिंग
</DocLink>

---

### म्युर ग्लेशियर {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### म्युर ग्लेशियर सारांश {#muir-glacier-summary}

म्युर ग्लेशियर फोर्कने [डिफिकल्टी बॉम्ब](/glossary/#difficulty-bomb) ला विलंब लावला. [प्रूफ-ऑफ-वर्क](/developers/docs/consensus-mechanisms/pow/) कन्सेंसस यंत्रणेच्या ब्लॉक डिफिकल्टीमधील वाढीमुळे व्यवहार पाठवण्यासाठी आणि डॅप्स वापरण्यासाठी लागणारा प्रतीक्षा वेळ वाढवून Ethereum च्या वापरण्यायोग्यतेत घट होण्याची भीती होती.

- [Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Ethereum कॅट हर्डरचे स्पष्टीकरण वाचा](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="म्युर ग्लेशियर EIPs" contentPreview="या फोर्कमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>डिफिकल्टी बॉम्बला आणखी ४,०००,००० ब्लॉक्स किंवा ~६११ दिवसांसाठी विलंब लावते.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2019 {#2019}

### इस्तंबूल {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### इस्तंबूल सारांश {#istanbul-summary}

इस्तंबूल फोर्क:

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) मधील काही क्रियांसाठी [गॅस](/glossary/#gas) खर्च ऑप्टिमाइझ केला.
- डिनायल-ऑफ-सर्व्हिस हल्ल्याची लवचिकता सुधारली.
- SNARKs आणि STARKs वर आधारित [लेअर 2 स्केलिंग](/developers/docs/scaling/#layer-2-scaling) सोल्यूशन्स अधिक कार्यक्षम केले.
- Ethereum आणि Zcash ला इंटरऑपरेट करण्याची परवानगी दिली.
- करारांना अधिक सर्जनशील फंक्शन्स सादर करण्याची परवानगी दिली.

[Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="इस्तंबूल EIPs" contentPreview="या फोर्कमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>Zcash सारख्या गोपनीयता-संरक्षक चलनासह Ethereum ला काम करण्याची परवानगी देते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>[गॅस](/glossary/#gas) खर्च सुधारण्यासाठी स्वस्त क्रिप्टोग्राफी.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><code>CHAINID</code> [ऑपकोड](/developers/docs/ethereum-stack/#ethereum-virtual-machine) जोडून Ethereum ला रिप्ले हल्ल्यांपासून वाचवते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>वापराच्या आधारावर ऑपकोड गॅस किंमती ऑप्टिमाइझ करणे.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>ब्लॉक्समध्ये अधिक डेटा सामावून घेण्यासाठी CallData चा खर्च कमी करते – [लेअर 2 स्केलिंग](/developers/docs/scaling/#layer-2-scaling) साठी चांगले आहे.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>इतर ऑपकोड गॅस किंमतीतील बदल.</em></li>
</ul>
</ExpandableCard>

---

### कॉन्स्टँटिनोपल {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### कॉन्स्टँटिनोपल सारांश {#constantinople-summary}

कॉन्स्टँटिनोपल फोर्क:

- ब्लॉक [मायनिंग](/developers/docs/consensus-mechanisms/pow/mining/) रिवॉर्ड ३ वरून २ ETH पर्यंत कमी केले.
- [प्रूफ-ऑफ-स्टेक लागू होण्यापूर्वी](#beacon-chain-genesis) ब्लॉकचेन फ्रीज होणार नाही याची खात्री केली.
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) मधील काही क्रियांसाठी [गॅस](/glossary/#gas) खर्च ऑप्टिमाइझ केला.
- अद्याप तयार न केलेल्या पत्त्यांशी संवाद साधण्याची क्षमता जोडली.

[Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="कॉन्स्टँटिनोपल EIPs" contentPreview="या फोर्कमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>काही ऑनचेन क्रियांचा खर्च ऑप्टिमाइझ करते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>अद्याप तयार न झालेल्या पत्त्यांशी संवाद साधण्याची परवानगी देते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>दुसऱ्या कराराच्या कोडचा हॅश पुनर्प्राप्त करण्यासाठी <code>EXTCODEHASH</code> सूचना सादर करते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>प्रूफ-ऑफ-स्टेक होण्यापूर्वी ब्लॉकचेन फ्रीज होणार नाही याची खात्री करते आणि ब्लॉक रिवॉर्ड ३ वरून २ ETH पर्यंत कमी करते.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2017 {#2017}

### बायझँटियम {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### बायझँटियम सारांश {#byzantium-summary}

बायझँटियम फोर्क:

- ब्लॉक [मायनिंग](/developers/docs/consensus-mechanisms/pow/mining/) रिवॉर्ड ५ वरून ३ ETH पर्यंत कमी केले.
- [डिफिकल्टी बॉम्ब](/glossary/#difficulty-bomb) एका वर्षाने पुढे ढकलला.
- इतर करारांना नॉन-स्टेट-चेंजिंग कॉल्स करण्याची क्षमता जोडली.
- [लेअर 2 स्केलिंग](/developers/docs/scaling/#layer-2-scaling) साठी विशिष्ट क्रिप्टोग्राफी पद्धती जोडल्या.

[Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="बायझँटियम EIPs" contentPreview="या फोर्कमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em><code>REVERT</code> ऑपकोड जोडतो.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>यश किंवा अपयश दर्शविण्यासाठी व्यवहार पावतींमध्ये स्टेटस फील्ड जोडले गेले.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/) ला परवानगी देण्यासाठी इलिप्टिक कर्व आणि स्केलर गुणाकार जोडते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/) ला परवानगी देण्यासाठी इलिप्टिक कर्व आणि स्केलर गुणाकार जोडते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA स्वाक्षरी पडताळणी सक्षम करते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>व्हेरिएबल लांबीच्या रिटर्न मूल्यांसाठी समर्थन जोडते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em><code>STATICCALL</code> ऑपकोड जोडते, ज्यामुळे इतर करारांना नॉन-स्टेट-चेंजिंग कॉल्स करता येतात.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>डिफिकल्टी ॲडजस्टमेंट फॉर्म्युला बदलतो.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>[डिफिकल्टी बॉम्ब](/glossary/#difficulty-bomb) ला १ वर्षाने पुढे ढकलते आणि ब्लॉक रिवॉर्ड ५ वरून ३ ETH पर्यंत कमी करते.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2016 {#2016}

### स्प्युरियस ड्रॅगन {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### स्प्युरियस ड्रॅगन सारांश {#spurious-dragon-summary}

स्प्युरियस ड्रॅगन फोर्क हा नेटवर्कवरील डिनायल ऑफ सर्व्हिस (DoS) हल्ल्यांना (सप्टेंबर/ऑक्टोबर २०१६) दुसरा प्रतिसाद होता, ज्यात समाविष्ट आहे:

- नेटवर्कवरील भविष्यातील हल्ले रोखण्यासाठी ऑपकोड किंमती समायोजित करणे.
- ब्लॉकचेन स्टेटचे “डिब्लोट” सक्षम करणे.
- रिप्ले हल्ल्यापासून संरक्षण जोडणे.

[Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="स्प्युरियस ड्रॅगन EIPs" contentPreview="या फोर्कमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>एका Ethereum चेनवरील व्यवहारांना पर्यायी चेनवर पुन्हा प्रसारित होण्यापासून प्रतिबंधित करते, उदाहरणार्थ, टेस्टनेट व्यवहाराला मुख्य Ethereum चेनवर पुन्हा प्ले केले जाणे.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em><code>EXP</code> ऑपकोडच्या किंमती समायोजित करते – संगणकीयदृष्ट्या महागड्या करार क्रियांमुळे नेटवर्कला धीमे करणे अधिक कठीण बनवते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS हल्ल्यांद्वारे जोडलेली रिकामी खाती काढून टाकण्याची परवानगी देते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>ब्लॉकचेनवरील कराराच्या कमाल कोड आकाराला बदलते – २४५७६ बाइट्सपर्यंत.</em></li>
</ul>
</ExpandableCard>

---

### टँजेरिन व्हिसल {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### टँजेरिन व्हिसल सारांश {#tangerine-whistle-summary}

टँजेरिन व्हिसल फोर्क हा नेटवर्कवरील डिनायल ऑफ सर्व्हिस (DoS) हल्ल्यांना (सप्टेंबर/ऑक्टोबर २०१६) पहिला प्रतिसाद होता, ज्यात समाविष्ट आहे:

- कमी किमतीच्या ऑपरेशन कोड्सशी संबंधित तातडीच्या नेटवर्क आरोग्य समस्यांचे निराकरण करणे.

[Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="टँजेरिन व्हिसल EIPs" contentPreview="या फोर्कमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>स्पॅम हल्ल्यांमध्ये वापरल्या जाऊ शकणाऱ्या ऑपकोड्सचे गॅस खर्च वाढवते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>Ethereum प्रोटोकॉलच्या पूर्वीच्या आवृत्त्यांमधील त्रुटींमुळे खूप कमी खर्चात स्टेटमध्ये टाकलेल्या मोठ्या संख्येने रिकाम्या खात्यांना काढून टाकून स्टेटचा आकार कमी करते.</em></li>
</ul>
</ExpandableCard>

---

### DAO फोर्क {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### DAO फोर्क सारांश {#dao-fork-summary}

DAO फोर्क हा [2016 च्या DAO हल्ल्याला](https://www.coindesk.com/learn/understanding-the-dao-attack/) प्रतिसाद म्हणून होता, जिथे एका असुरक्षित [DAO](/glossary/#dao) करारातून एका हॅकमध्ये 3.6 दशलक्ष पेक्षा जास्त ETH काढून टाकले गेले. फोर्कने सदोष करारातून निधी एका [नवीन करारात](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) हलवला ज्यामध्ये फक्त एकच कार्य होते: काढणे. ज्यांनी निधी गमावला होता ते त्यांच्या वॉलेटमधील प्रत्येक १०० DAO टोकन्ससाठी १ ETH काढू शकत होते.

कृतीच्या या मार्गावर इथरियम समुदायाने मतदान केले. कोणताही ETH धारक [एका मतदान प्लॅटफॉर्मवर](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) व्यवहाराद्वारे मतदान करू शकत होता. काटा काढण्याचा निर्णय 85% पेक्षा जास्त मतांपर्यंत पोहोचला.

काही मायनर्सनी फोर्क करण्यास नकार दिला कारण DAO घटना प्रोटोकॉलमधील दोष नव्हता. त्यांनी पुढे जाऊन [Ethereum Classic](https://ethereumclassic.org/) तयार केले.

[Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### होमस्टेड {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### होमस्टेड सारांश {#homestead-summary}

होमस्टेड फोर्क जो भविष्याकडे पाहत होता. यात अनेक प्रोटोकॉल बदल आणि एक नेटवर्किंग बदल समाविष्ट होता ज्यामुळे Ethereum ला पुढील नेटवर्क अपग्रेड करण्याची क्षमता मिळाली.

[Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="होमस्टेड EIPs" contentPreview="या फोर्कमध्ये समाविष्ट अधिकृत सुधारणा.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>करार निर्मिती प्रक्रियेत संपादन करते.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>नवीन ऑपकोड जोडते: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p फॉरवर्ड कंपॅटिबिलिटी आवश्यकता सादर करते</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2015 {#2015}

### फ्रंटियर थॉईंग {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### फ्रंटियर थॉईंग सारांश {#frontier-thawing-summary}

फ्रंटियर थॉईंग फोर्कने प्रति [ब्लॉक](/glossary/#block) ५,००० [गॅस](/glossary/#gas) मर्यादा उचलली आणि डिफॉल्ट गॅसची किंमत ५१ [gwei](/glossary/#gwei) वर सेट केली. यामुळे व्यवहारांना परवानगी मिळाली – व्यवहारांना २१,००० गॅसची आवश्यकता असते. [प्रूफ-ऑफ-स्टेक](/glossary/#pos) वर भविष्यातील हार्ड-फोर्क सुनिश्चित करण्यासाठी [डिफिकल्टी बॉम्ब](/glossary/#difficulty-bomb) सादर करण्यात आला.

- [Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Ethereum प्रोटोकॉल अपडेट १ वाचा](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### फ्रंटियर {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### फ्रंटियर सारांश {#frontier-summary}

फ्रंटियर हा Ethereum प्रकल्पाची एक थेट, पण मूलभूत अंमलबजावणी होती. हे यशस्वी ऑलिम्पिक चाचणी टप्प्यानंतर आले. हे तांत्रिक वापरकर्त्यांसाठी, विशेषतः डेव्हलपर्ससाठी होते. [ब्लॉक्स](/glossary/#block) ची [गॅस](/glossary/#gas) मर्यादा ५,००० होती. या ‘थॉईंग’ कालावधीमुळे मायनर्सना त्यांचे ऑपरेशन्स सुरू करण्याची आणि सुरुवातीच्या वापरकर्त्यांना ‘घाई’ न करता त्यांचे क्लायंट स्थापित करण्याची परवानगी मिळाली.

[Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### ईथर विक्री {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

ईथर अधिकृतपणे ४२ दिवसांसाठी विक्रीवर गेले. तुम्ही ते BTC ने खरेदी करू शकत होता.

[Ethereum फाउंडेशनची घोषणा वाचा](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### येलोपेपर प्रसिद्ध झाले {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

डॉ. गॅविन वुड यांनी लिहिलेले यलो पेपर, Ethereum प्रोटोकॉलची तांत्रिक व्याख्या आहे.

[यलो पेपर पहा](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### व्हाइटपेपर प्रसिद्ध झाले {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

२०१३ मध्ये Ethereum चे संस्थापक विटालिक बुटेरिन यांनी प्रकाशित केलेला परिचयात्मक पेपर, २०१५ मध्ये प्रकल्पाच्या लाँचपूर्वी.

<DocLink href="/whitepaper/">
  व्हाइटपेपर
</DocLink>
