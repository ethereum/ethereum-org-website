---
title: "सभी इथेरियम फ़ोर्क की समयरेखा (2014 से वर्तमान तक)"
description: "इथेरियम ब्लॉकचेन का इतिहास जिसमें प्रमुख मील के पत्थर, रिलीज़ और फ़ोर्क शामिल हैं।"
lang: hi
sidebarDepth: 1
authors: ["निक्सो"]
---

[इथेरियम](/) ब्लॉकचेन के सभी प्रमुख मील के पत्थर, फ़ोर्क और अपडेट की एक समयरेखा।

<ExpandableCard title="फ़ोर्क क्या हैं?" contentPreview="इथेरियम प्रोटोकॉल के नियमों में बदलाव जिनमें अक्सर नियोजित तकनीकी अपग्रेड शामिल होते हैं।">

फ़ोर्क तब होते हैं जब नेटवर्क में प्रमुख तकनीकी अपग्रेड या बदलाव करने की आवश्यकता होती है - वे आमतौर पर [इथेरियम इम्प्रूवमेंट प्रपोज़ल (EIPs)](/eips/) से उत्पन्न होते हैं और प्रोटोकॉल के "नियमों" को बदलते हैं।

जब पारंपरिक, केंद्रीय रूप से नियंत्रित सॉफ़्टवेयर में अपग्रेड की आवश्यकता होती है, तो कंपनी अंतिम-उपयोगकर्ता के लिए बस एक नया संस्करण प्रकाशित करेगी। ब्लॉकचेन अलग तरह से काम करते हैं क्योंकि इसमें कोई केंद्रीय स्वामित्व नहीं होता है। नए फ़ोर्क नियमों को लागू करने के लिए [इथेरियम क्लाइंट्स](/developers/docs/nodes-and-clients/) को अपने सॉफ़्टवेयर को अपडेट करना होगा। इसके अलावा ब्लॉक बनाने वालों (प्रूफ-ऑफ-वर्क (PoW) की दुनिया में खनिक, प्रूफ-ऑफ़-स्टेक (PoS) की दुनिया में सत्यापक) और नोड्स को ब्लॉक बनाने होंगे और नए नियमों के विरुद्ध मान्य करना होगा। [सर्वसम्मति तंत्र पर अधिक जानकारी](/developers/docs/consensus-mechanisms/)

ये नियम परिवर्तन नेटवर्क में एक अस्थायी विभाजन पैदा कर सकते हैं। नए ब्लॉक नए नियमों या पुराने नियमों के अनुसार तैयार किए जा सकते हैं। फ़ोर्क पर आमतौर पर समय से पहले सहमति हो जाती है ताकि क्लाइंट एक साथ बदलावों को अपना लें और अपग्रेड के साथ फ़ोर्क मुख्य चेन बन जाए। हालाँकि, दुर्लभ मामलों में, फ़ोर्क पर असहमति के कारण नेटवर्क स्थायी रूप से विभाजित हो सकता है - विशेष रूप से <a href="#dao-fork">DAO फ़ोर्क</a> के साथ इथेरियम क्लासिक का निर्माण।

</ExpandableCard>

<ExpandableCard title="कुछ अपग्रेड के कई नाम क्यों होते हैं?" contentPreview="अपग्रेड के नाम एक पैटर्न का पालन करते हैं">

इथेरियम का आधार बनने वाला सॉफ़्टवेयर दो हिस्सों से बना है, जिन्हें [निष्पादन परत](/glossary/#execution-layer) और [सर्वसम्मति परत](/glossary/#consensus-layer) के रूप में जाना जाता है।

**निष्पादन अपग्रेड नामकरण**

2021 से, **निष्पादन परत** के अपग्रेड का नाम कालानुक्रमिक क्रम में [पिछले Devcon और Devconnect स्थानों](https://devcon.org/en/past-events/) के शहर के नामों के अनुसार रखा गया है:

| अपग्रेड का नाम | Devcon(nect) वर्ष | Devcon संख्या | अपग्रेड की तिथि |
| -------------- | ----------------- | ------------- | ------------ |
| बर्लिन         | 2014              | 0             | 15 अप्रैल, 2021 |
| लंदन         | 2015              | I             | 5 अगस्त, 2021  |
| शंघाई       | 2016              | II            | 12 अप्रैल, 2023 |
| कानकुन         | 2017              | III           | 13 मार्च, 2024 |
| प्राग         | 2018              | IV            | 7 मई, 2025  |
| ओसाका          | 2019              | V             | 3 दिसंबर, 2025  |
| **एम्स्टर्डम**  | 2022              | Devconnect    | TBD - अगला   |
| _बोगोटा_       | 2022              | VI            | TBD          |
| _इस्तांबुल_     | 2023              | Devconnect    | TBD          |
| _बैंकॉक_      | 2024              | VII           | TBD          |
| _ब्यूनस आयर्स_ | 2025              | Devconnect    | TBD          |
| _मुंबई_       | 2026              | VIII          | TBD          |

**सर्वसम्मति अपग्रेड नामकरण**

[बीकन चेन](/glossary/#beacon-chain) के लॉन्च के बाद से, **सर्वसम्मति परत** के अपग्रेड का नाम वर्णमाला क्रम में आगे बढ़ने वाले अक्षरों से शुरू होने वाले खगोलीय तारों के नाम पर रखा गया है:

| अपग्रेड का नाम                                              | अपग्रेड की तिथि |
| --------------------------------------------------------- | ------------ |
| बीकन चेन उत्पत्ति                                      | 1 दिसंबर, 2020  |
| [अल्टेयर](https://en.wikipedia.org/wiki/Altair)            | 27 अक्टूबर, 2021 |
| [बेलाट्रिक्स](https://en.wikipedia.org/wiki/Bellatrix)      | 6 सितंबर, 2022  |
| [कैपेला](https://en.wikipedia.org/wiki/Capella)          | 12 अप्रैल, 2023 |
| [डेनेब](https://en.wikipedia.org/wiki/Deneb)              | 13 मार्च, 2024 |
| [इलेक्ट्रा](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 मई, 2025  |
| [फुलु](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 दिसंबर, 2025  |
| [**ग्लोआस**](https://en.wikipedia.org/wiki/WASP-13)        | TBD - अगला   |
| [_हेज़_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | TBD          |

**संयुक्त नामकरण**

निष्पादन और सर्वसम्मति अपग्रेड शुरू में अलग-अलग समय पर शुरू किए गए थे, लेकिन 2022 में [द मर्ज](/roadmap/merge/) के बाद इन्हें एक साथ तैनात किया गया है। इस प्रकार, एक ही संयुक्त शब्द का उपयोग करके इन अपग्रेड के संदर्भों को सरल बनाने के लिए बोलचाल के शब्द उभरे हैं। यह _शंघाई-कैपेला_ अपग्रेड के साथ शुरू हुआ, जिसे आमतौर पर "**शपेला**" कहा जाता है, और बाद के अपग्रेड के साथ जारी है।

| निष्पादन अपग्रेड | सर्वसम्मति अपग्रेड | संक्षिप्त नाम    |
| ----------------- | ----------------- | ------------- |
| शंघाई          | कैपेला           | "शपेला"    |
| कानकुन            | डेनेब             | "डेंकुन"      |
| प्राग            | इलेक्ट्रा           | "पेक्ट्रा"      |
| ओसाका             | फुलु              | "फुसाका"      |
| एम्स्टर्डम         | ग्लोआस             | "ग्लैमस्टर्डम" |
| बोगोटा            | हेज़              | "हेगोटा"      |

</ExpandableCard>

कुछ विशेष रूप से महत्वपूर्ण पिछले अपग्रेड के बारे में जानकारी पर सीधे जाएँ: [बीकन चेन](/roadmap/beacon-chain/); [द मर्ज](/roadmap/merge/); और [EIP-1559](#london)

भविष्य के प्रोटोकॉल अपग्रेड की तलाश है? [इथेरियम रोडमैप पर आगामी अपग्रेड के बारे में जानें](/roadmap/)।

<Divider />

## 2025 {#2025}

### फोलू-ओसाका ("फुसाका") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[फुसाका के बारे में अधिक जानकारी](/roadmap/fusaka/)

### प्राग-इलेक्ट्रा ("पेक्ट्रा") {#pectra}

<NetworkUpgradeSummary name="pectra" />

प्राग-इलेक्ट्रा ("पेक्ट्रा") अपग्रेड में इथेरियम प्रोटोकॉल में कई सुधार शामिल थे जिनका उद्देश्य सभी उपयोगकर्ताओं, लेयर 2 (l2) नेटवर्क, स्टेकर्स और नोड ऑपरेटरों के लिए अनुभव को बढ़ाना था।

स्टेकिंग को कंपाउंडिंग सत्यापक खातों के साथ एक अपग्रेड मिला, और निष्पादन निकासी पते का उपयोग करके स्टेक किए गए फंड पर नियंत्रण में सुधार हुआ। EIP-7251 ने एक सत्यापक के लिए अधिकतम प्रभावी शेष को बढ़ाकर 2048 कर दिया, जिससे स्टेकर्स के लिए पूंजी दक्षता में सुधार हुआ। EIP-7002 ने एक निष्पादन खाते को सुरक्षित रूप से सत्यापक क्रियाओं को ट्रिगर करने में सक्षम बनाया, जिसमें निकास करना, या फंड के कुछ हिस्सों की निकासी करना शामिल है, जिससे ETH स्टेकर्स के लिए अनुभव में सुधार हुआ, जबकि नोड ऑपरेटरों के लिए जवाबदेही को मजबूत करने में मदद मिली।

अपग्रेड के अन्य हिस्से नियमित उपयोगकर्ताओं के लिए अनुभव को बेहतर बनाने पर केंद्रित थे। EIP-7702 ने एक नियमित गैर-स्मार्ट-अनुबंध खाते ([EOA](/glossary/#eoa)) के लिए स्मार्ट अनुबंध के समान कोड निष्पादित करने की क्षमता लाई। इसने पारंपरिक इथेरियम खातों के लिए असीमित नई कार्यक्षमता को अनलॉक किया, जैसे कि लेन-देन बैचिंग, गैस प्रायोजन, वैकल्पिक प्रमाणीकरण, प्रोग्राम करने योग्य खर्च नियंत्रण, खाता पुनर्प्राप्ति तंत्र और बहुत कुछ।

<ExpandableCard title="पेक्ट्रा EIPs" contentPreview="इस अपग्रेड में शामिल आधिकारिक सुधार।">

बेहतर उपयोगकर्ता अनुभव:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOA खाता कोड सेट करें</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>ब्लॉब थ्रूपुट में वृद्धि</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>कॉल डेटा लागत बढ़ाएं</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>EL कॉन्फ़िगरेशन फ़ाइलों में ब्लॉब शेड्यूल जोड़ें</em></li>
</ul>

बेहतर स्टेकिंग अनुभव:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em><code>MAX_EFFECTIVE_BALANCE</code> बढ़ाएं</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>निष्पादन परत ट्रिगर करने योग्य निकास</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>सामान्य प्रयोजन निष्पादन परत अनुरोध</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>ऑनचेन सत्यापक जमा की आपूर्ति करें</em></li>
</ul>

प्रोटोकॉल दक्षता और सुरक्षा सुधार:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381 वक्र संचालन के लिए प्रीकंपाइल</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>ऐतिहासिक ब्लॉक हैश को स्थिति में सहेजें</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>समिति सूचकांक को अनुप्रमाणन के बाहर ले जाएं</em></li>
</ul>

</ExpandableCard>

- [पेक्ट्रा स्टेकिंग अनुभव को कैसे बढ़ाएगा](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [इलेक्ट्रा अपग्रेड विनिर्देश पढ़ें](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [प्राग-इलेक्ट्रा ("पेक्ट्रा") सामान्य प्रश्न (FAQ)](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### कानकुन-डेनेब ("डेंकुन") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### कानकुन सारांश {#cancun-summary}

कानकुन अपग्रेड में इथेरियम के _निष्पादन_ में सुधारों का एक सेट शामिल है जिसका उद्देश्य डेनेब सर्वसम्मति अपग्रेड के साथ-साथ स्केलेबिलिटी में सुधार करना है।

विशेष रूप से इसमें EIP-4844 शामिल है, जिसे **प्रोटो-डैंकशार्डिंग** के रूप में जाना जाता है, जो लेयर 2 (l2) रोलअप्स के लिए डेटा स्टोरेज की लागत को काफी कम कर देता है। यह डेटा "ब्लॉब" की शुरुआत के माध्यम से प्राप्त किया जाता है जो रोलअप्स को थोड़े समय के लिए मेननेट पर डेटा पोस्ट करने में सक्षम बनाता है। इसके परिणामस्वरूप लेयर 2 रोलअप्स के उपयोगकर्ताओं के लिए लेन-देन शुल्क काफी कम हो जाता है।

<ExpandableCard title="कानकुन EIPs" contentPreview="इस अपग्रेड में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>अस्थायी स्टोरेज ऑपकोड</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM में बीकन ब्लॉक रूट</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>शार्ड ब्लॉब लेन-देन (प्रोटो-डैंकशार्डिंग)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - मेमोरी कॉपी करने का निर्देश</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> केवल उसी लेन-देन में</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> ऑपकोड</em></li>
</ul>

</ExpandableCard>

- [लेयर 2 रोलअप्स](/layer-2/)
- [प्रोटो-डैंकशार्डिंग](/roadmap/scaling/#proto-danksharding)
- [डैन्कशार्डिंग](/roadmap/danksharding/)
- [कानकुन अपग्रेड विनिर्देश पढ़ें](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### डेनेब सारांश {#deneb-summary}

डेनेब अपग्रेड में इथेरियम की _सर्वसम्मति_ में सुधारों का एक सेट शामिल है जिसका उद्देश्य स्केलेबिलिटी में सुधार करना है। यह अपग्रेड बीकन चेन में अन्य सुधारों के साथ-साथ प्रोटो-डैंकशार्डिंग (EIP-4844) को सक्षम करने के लिए कानकुन निष्पादन अपग्रेड के साथ आता है।

पूर्व-जनरेट किए गए हस्ताक्षरित "स्वैच्छिक निकास संदेश" अब समाप्त नहीं होते हैं, इस प्रकार तीसरे पक्ष के नोड ऑपरेटर के साथ अपने फंड की स्टेकिंग करने वाले उपयोगकर्ताओं को अधिक नियंत्रण मिलता है। इस हस्ताक्षरित निकास संदेश के साथ, स्टेकर्स किसी से अनुमति मांगे बिना किसी भी समय सुरक्षित रूप से निकास करने और अपने फंड की निकासी करने की क्षमता बनाए रखते हुए नोड संचालन को प्रत्यायोजित कर सकते हैं।

EIP-7514 नेटवर्क में शामिल होने वाले सत्यापकों की "मंथन" दर को प्रति एपॉक आठ (8) तक सीमित करके ETH के निर्गमन को सख्त बनाता है। चूंकि ETH निर्गमन कुल स्टेक किए गए ETH के आनुपातिक है, इसलिए शामिल होने वाले सत्यापकों की संख्या को सीमित करने से नए जारी किए गए ETH की _वृद्धि दर_ सीमित हो जाती है, जबकि नोड ऑपरेटरों के लिए हार्डवेयर आवश्यकताओं को भी कम किया जाता है, जिससे विकेंद्रीकरण में मदद मिलती है।

<ExpandableCard title="डेनेब EIPs" contentPreview="इस अपग्रेड में शामिल आधिकारिक सुधार">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM में बीकन ब्लॉक रूट</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>शार्ड ब्लॉब लेन-देन</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>सदा के लिए वैध हस्ताक्षरित स्वैच्छिक निकास</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>अधिकतम अनुप्रमाणन समावेशन स्लॉट बढ़ाएं</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>अधिकतम एपॉक मंथन सीमा जोड़ें</em></li>
</ul>

</ExpandableCard>

- [डेनेब अपग्रेड विनिर्देश पढ़ें](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [कानकुन-डेनेब ("डेंकुन") सामान्य प्रश्न (FAQ)](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### शंघाई-कैपेला ("शपेला") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### शंघाई सारांश {#shanghai-summary}

शंघाई अपग्रेड निष्पादन परत में स्टेकिंग निकासी लाया। कैपेला अपग्रेड के साथ मिलकर, इसने ब्लॉकों को निकासी संचालन स्वीकार करने में सक्षम बनाया, जिससे स्टेकर अपने ETH को बीकन चेन से निष्पादन परत में निकाल सकते हैं।

<ExpandableCard title="शंघाई EIPs" contentPreview="इस अपग्रेड में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code> पते को वार्म (warm) शुरू करता है</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>नया <code>PUSH0</code> निर्देश</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>initcode को सीमित और मीटर करना</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>बीकन चेन पुश निकासी संचालन के रूप में</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code> को अप्रचलित (deprecate) करना</em></li>
</ul>

</ExpandableCard>

- [शंघाई अपग्रेड विनिर्देश पढ़ें](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### कैपेला सारांश {#capella-summary}

कैपेला अपग्रेड सर्वसम्मति परत (बीकन चेन) का तीसरा प्रमुख अपग्रेड था और इसने स्टेकिंग निकासी को सक्षम किया। कैपेला निष्पादन परत अपग्रेड, शंघाई के साथ समकालिक रूप से हुआ, और स्टेकिंग निकासी कार्यक्षमता को सक्षम किया।

यह सर्वसम्मति परत अपग्रेड उन स्टेकर्स के लिए क्षमता लाया, जिन्होंने अपनी प्रारंभिक जमा के साथ निकासी क्रेडेंशियल्स प्रदान नहीं किए थे, ताकि वे ऐसा कर सकें, जिससे निकासी सक्षम हो सके।

अपग्रेड ने स्वचालित खाता स्वीपिंग (sweeping) कार्यक्षमता भी प्रदान की, जो किसी भी उपलब्ध इनाम भुगतान या पूर्ण निकासी के लिए सत्यापक खातों को लगातार संसाधित करती है।

- [स्टेकिंग निकासी के बारे में अधिक जानकारी](/staking/withdrawals/)।
- [कैपेला अपग्रेड विनिर्देश पढ़ें](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### पेरिस (द मर्ज) {#paris}

<NetworkUpgradeSummary name="paris" />

#### सारांश {#paris-summary}

पेरिस अपग्रेड तब ट्रिगर हुआ जब प्रूफ-ऑफ-वर्क (PoW) ब्लॉकचेन ने 58750000000000000000000 की [टर्मिनल कुल कठिनाई](/glossary/#terminal-total-difficulty) को पार कर लिया। यह 15 सितंबर 2022 को ब्लॉक 15537393 पर हुआ, जिससे अगले ब्लॉक में पेरिस अपग्रेड ट्रिगर हो गया। पेरिस [द मर्ज](/roadmap/merge/) ट्रांज़िशन था - इसकी प्रमुख विशेषता [प्रूफ-ऑफ-वर्क](/developers/docs/consensus-mechanisms/pow) खनन एल्गोरिदम और संबंधित सर्वसम्मति लॉजिक को बंद करना और इसके बजाय [प्रूफ-ऑफ़-स्टेक (PoS)](/developers/docs/consensus-mechanisms/pos) को चालू करना था। पेरिस अपने आप में [निष्पादन क्लाइंट](/developers/docs/nodes-and-clients/#execution-clients) (सर्वसम्मति परत पर बेलाट्रिक्स के समकक्ष) के लिए एक अपग्रेड था जिसने उन्हें अपने कनेक्टेड [सर्वसम्मति क्लाइंट](/developers/docs/nodes-and-clients/#consensus-clients) से निर्देश लेने में सक्षम बनाया। इसके लिए आंतरिक API विधियों के एक नए सेट को सक्रिय करने की आवश्यकता थी, जिसे सामूहिक रूप से [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) के रूप में जाना जाता है। यह यकीनन [होमस्टेड](#homestead) के बाद से इथेरियम के इतिहास में सबसे महत्वपूर्ण अपग्रेड था!

- [पेरिस अपग्रेड विनिर्देश पढ़ें](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="पेरिस EIPs" contentPreview="इस अपग्रेड में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>सर्वसम्मति को प्रूफ-ऑफ़-स्टेक में अपग्रेड करें</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>DIFFICULTY ऑपकोड को PREVRANDAO से बदलें</em></li>
</ul>

</ExpandableCard>

---

### बेलाट्रिक्स {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### सारांश {#bellatrix-summary}

बेलाट्रिक्स अपग्रेड [बीकन चेन](/roadmap/beacon-chain) के लिए दूसरा निर्धारित अपग्रेड था, जो चेन को [द मर्ज](/roadmap/merge/) के लिए तैयार कर रहा था। यह निष्क्रियता और कटौती योग्य अपराधों के लिए सत्यापक दंड को उनके पूर्ण मूल्य पर लाता है। बेलाट्रिक्स में चेन को द मर्ज के लिए तैयार करने और अंतिम प्रूफ-ऑफ-वर्क ब्लॉक से पहले प्रूफ-ऑफ़-स्टेक ब्लॉक में संक्रमण के लिए फ़ोर्क विकल्प नियमों में एक अपडेट भी शामिल है। इसमें सर्वसम्मति क्लाइंट को 58750000000000000000000 की [टर्मिनल कुल कठिनाई](/glossary/#terminal-total-difficulty) से अवगत कराना शामिल है।

- [बेलाट्रिक्स अपग्रेड विनिर्देश पढ़ें](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### ग्रे ग्लेशियर {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### सारांश {#gray-glacier-summary}

ग्रे ग्लेशियर नेटवर्क अपग्रेड ने [कठिनाई बम](/glossary/#difficulty-bomb) को तीन महीने पीछे धकेल दिया। इस अपग्रेड में पेश किया गया यह एकमात्र बदलाव है, और यह प्रकृति में [एरो ग्लेशियर](#arrow-glacier) और [मुइर ग्लेशियर](#muir-glacier) अपग्रेड के समान है। [बाइज़ेंटियम](#byzantium), [कॉन्स्टेंटिनोपल](#constantinople) और [लंदन](#london) नेटवर्क अपग्रेड पर भी इसी तरह के बदलाव किए गए हैं।

- [EF ब्लॉग - ग्रे ग्लेशियर अपग्रेड की घोषणा](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="ग्रे ग्लेशियर EIPs" contentPreview="इस अपग्रेड में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>कठिनाई बम को सितंबर 2022 तक टालता है</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### सारांश {#arrow-glacier-summary}

एरो ग्लेशियर (Arrow Glacier) नेटवर्क अपग्रेड ने [कठिनाई बम](/glossary/#difficulty-bomb) को कई महीनों के लिए पीछे धकेल दिया। इस अपग्रेड में पेश किया गया यह एकमात्र बदलाव है, और यह प्रकृति में [मुइर ग्लेशियर (Muir Glacier)](#muir-glacier) अपग्रेड के समान है। इसी तरह के बदलाव [बाइज़ेंटियम](#byzantium), [कॉन्स्टेंटिनोपल](#constantinople) और [लंदन](#london) नेटवर्क अपग्रेड पर किए गए हैं।

- [EF ब्लॉग - एरो ग्लेशियर अपग्रेड की घोषणा](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - इथेरियम एरो ग्लेशियर अपग्रेड](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="एरो ग्लेशियर EIPs" contentPreview="इस अपग्रेड में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>कठिनाई बम को जून 2022 तक टालता है</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### सारांश {#altair-summary}

अल्टेयर (Altair) अपग्रेड [बीकन चेन](/roadmap/beacon-chain) के लिए पहला निर्धारित अपग्रेड था। इसने "सिंक समितियों (sync committees)" के लिए समर्थन जोड़ा—जिससे लाइट क्लाइंट्स सक्षम हुए, और जैसे-जैसे विकास द मर्ज (The Merge) की ओर बढ़ा, इसने सत्यापक (validator) निष्क्रियता और कटौती (slashing) दंड में वृद्धि की।

- [अल्टेयर अपग्रेड विनिर्देश पढ़ें](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> रोचक तथ्य! {#altair-fun-fact}

अल्टेयर पहला प्रमुख नेटवर्क अपग्रेड था जिसका एक सटीक रोलआउट समय था। इससे पहले का हर अपग्रेड प्रूफ-ऑफ-वर्क (PoW) चेन पर घोषित ब्लॉक संख्या पर आधारित था, जहाँ ब्लॉक समय भिन्न होता है। बीकन चेन को प्रूफ-ऑफ-वर्क को हल करने की आवश्यकता नहीं होती है, और इसके बजाय यह एक समय-आधारित एपॉक (epoch) प्रणाली पर काम करती है जिसमें 12-सेकंड के 32 "स्लॉट" होते हैं जहाँ सत्यापक ब्लॉक प्रस्तावित कर सकते हैं। यही कारण है कि हमें ठीक-ठीक पता था कि हम एपॉक 74,240 पर कब पहुँचेंगे और अल्टेयर कब लाइव होगा!

- [ब्लॉक समय](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### सारांश {#london-summary}

लंदन (London) अपग्रेड ने [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) पेश किया, जिसने लेन-देन शुल्क बाज़ार में सुधार किया, साथ ही गैस रिफंड को संभालने के तरीके और [आइस एज (Ice Age)](/glossary/#ice-age) शेड्यूल में बदलाव किए।

#### लंदन अपग्रेड / EIP-1559 क्या था? {#eip-1559}

लंदन अपग्रेड से पहले, इथेरियम में निश्चित आकार के ब्लॉक होते थे। उच्च नेटवर्क मांग के समय, ये ब्लॉक पूरी क्षमता पर काम करते थे। परिणामस्वरूप, उपयोगकर्ताओं को अक्सर ब्लॉक में शामिल होने के लिए मांग कम होने का इंतजार करना पड़ता था, जिससे उपयोगकर्ता अनुभव खराब होता था। लंदन अपग्रेड ने इथेरियम में परिवर्तनीय आकार के ब्लॉक पेश किए।

अगस्त 2021 के [लंदन अपग्रेड](/ethereum-forks/#london) के साथ इथेरियम नेटवर्क पर लेन-देन शुल्क की गणना करने का तरीका बदल गया। लंदन अपग्रेड से पहले, `base` और `priority` शुल्क को अलग किए बिना शुल्क की गणना इस प्रकार की जाती थी:

मान लीजिए कि ऐलिस को बॉब को 1 ETH का भुगतान करना था। लेन-देन में, गैस सीमा 21,000 यूनिट है, और गैस मूल्य 200 Gwei है।

कुल शुल्क यह होता: `Gas units (limit) * Gas price per unit` यानी `21,000 * 200 = 4,200,000 gwei` या 0.0042 ETH

लंदन अपग्रेड में [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) के कार्यान्वयन ने लेन-देन शुल्क तंत्र को अधिक जटिल बना दिया, लेकिन गैस शुल्क को अधिक अनुमानित बना दिया, जिसके परिणामस्वरूप एक अधिक कुशल लेन-देन शुल्क बाज़ार बना। उपयोगकर्ता एक `maxFeePerGas` के साथ लेन-देन सबमिट कर सकते हैं जो इस बात से मेल खाता है कि वे लेन-देन को निष्पादित करने के लिए कितना भुगतान करने को तैयार हैं, यह जानते हुए कि वे गैस के लिए बाज़ार मूल्य (`baseFeePerGas`) से अधिक भुगतान नहीं करेंगे, और अपनी टिप को घटाकर कोई भी अतिरिक्त राशि वापस प्राप्त करेंगे।

यह वीडियो EIP-1559 और इसके द्वारा लाए जाने वाले लाभों की व्याख्या करता है: [EIP-1559 की व्याख्या](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [क्या आप एक विकेंद्रीकृत एप्लिकेशन (dapp) डेवलपर हैं? अपनी लाइब्रेरी और टूलिंग को अपग्रेड करना सुनिश्चित करें।](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Ethereum Cat Herders का व्याख्याता (explainer) पढ़ें](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="लंदन EIPs" contentPreview="इस अपग्रेड में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>लेन-देन शुल्क बाज़ार में सुधार करता है</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>एक ब्लॉक से <code>BASEFEE</code> लौटाता है</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>EVM ऑपरेशन्स के लिए गैस रिफंड कम करता है</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code> से शुरू होने वाले कॉन्ट्रैक्ट्स को डिप्लॉय करने से रोकता है</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>आइस एज को दिसंबर 2021 तक टालता है</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### सारांश {#berlin-summary}

बर्लिन (Berlin) अपग्रेड ने कुछ EVM क्रियाओं के लिए गैस लागत को अनुकूलित किया, और कई लेन-देन प्रकारों के लिए समर्थन बढ़ाया।

- [एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Ethereum Cat Herders का व्याख्याता (explainer) पढ़ें](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="बर्लिन EIPs" contentPreview="इस अपग्रेड में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>MODEXP गैस लागत को कम करता है</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>कई लेन-देन प्रकारों के लिए आसान समर्थन सक्षम करता है</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>स्थिति (state) एक्सेस ऑपकोड के लिए गैस लागत बढ़ाता है</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>वैकल्पिक एक्सेस सूचियाँ जोड़ता है</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### बीकन चेन जेनेसिस {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### सारांश {#beacon-chain-genesis-summary}

[बीकन चेन](/roadmap/beacon-chain/) को सुरक्षित रूप से लॉन्च होने के लिए 32 स्टेक किए गए ETH की 16384 जमाओं की आवश्यकता थी। यह 27 नवंबर को हुआ, और बीकन चेन ने 1 दिसंबर, 2020 को ब्लॉक बनाना शुरू कर दिया।

[एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  बीकन चेन
</DocLink>

---

### स्टेकिंग जमा कॉन्ट्रैक्ट डिप्लॉय किया गया {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### सारांश {#deposit-contract-summary}

स्टेकिंग जमा कॉन्ट्रैक्ट ने इथेरियम इकोसिस्टम में [स्टेकिंग](/glossary/#staking) की शुरुआत की। हालांकि यह एक [मेननेट](/glossary/#mainnet) कॉन्ट्रैक्ट था, लेकिन इसका [बीकन चेन](/roadmap/beacon-chain/) को लॉन्च करने की समयसीमा पर सीधा प्रभाव पड़ा, जो एक महत्वपूर्ण [इथेरियम अपग्रेड](/roadmap/) है।

[एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  स्टेकिंग
</DocLink>

---

### मुइर ग्लेशियर {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### सारांश {#muir-glacier-summary}

मुइर ग्लेशियर फ़ोर्क ने [कठिनाई बम](/glossary/#difficulty-bomb) में देरी की शुरुआत की। [प्रूफ-ऑफ-वर्क (PoW)](/developers/docs/consensus-mechanisms/pow/) सर्वसम्मति तंत्र की ब्लॉक कठिनाई में वृद्धि ने लेन-देन भेजने और विकेंद्रीकृत एप्लिकेशन (dapp) का उपयोग करने के प्रतीक्षा समय को बढ़ाकर इथेरियम की उपयोगिता को कम करने का खतरा पैदा कर दिया था।

- [एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Ethereum Cat Herders का स्पष्टीकरण पढ़ें](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="मुइर ग्लेशियर EIPs" contentPreview="इस फ़ोर्क में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>कठिनाई बम को अगले 4,000,000 ब्लॉक, या ~611 दिनों के लिए टाल देता है।</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### इस्तांबुल {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### सारांश {#istanbul-summary}

इस्तांबुल फ़ोर्क:

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) में कुछ क्रियाओं की [गैस](/glossary/#gas) लागत को अनुकूलित किया।
- डिनायल-ऑफ़-सर्विस (denial-of-service) हमलों के प्रति लचीलेपन में सुधार किया।
- SNARKs और STARKs पर आधारित [लेयर 2 (l2) स्केलिंग](/developers/docs/scaling/#layer-2-scaling) समाधानों को अधिक प्रदर्शनकारी बनाया।
- इथेरियम और Zcash को एक साथ काम करने (interoperate) में सक्षम बनाया।
- कॉन्ट्रैक्ट को अधिक रचनात्मक फ़ंक्शन पेश करने की अनुमति दी।

[एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="इस्तांबुल EIPs" contentPreview="इस फ़ोर्क में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>इथेरियम को Zcash जैसी गोपनीयता-संरक्षण (privacy-preserving) मुद्रा के साथ काम करने की अनुमति देता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>[गैस](/glossary/#gas) लागत में सुधार के लिए सस्ती क्रिप्टोग्राफी।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><code>CHAINID</code> [ऑपकोड](/developers/docs/ethereum-stack/#ethereum-virtual-machine) जोड़कर इथेरियम को रीप्ले हमलों से बचाता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>खपत के आधार पर ऑपकोड गैस मूल्य को अनुकूलित करता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>ब्लॉक में अधिक डेटा की अनुमति देने के लिए कॉल डेटा की लागत को कम करता है – [लेयर 2 (l2) स्केलिंग](/developers/docs/scaling/#layer-2-scaling) के लिए अच्छा है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>अन्य ऑपकोड गैस मूल्य परिवर्तन।</em></li>
</ul>

</ExpandableCard>

---

### कॉन्स्टेंटिनोपल {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### सारांश {#constantinople-summary}

कॉन्स्टेंटिनोपल फ़ोर्क:

- ब्लॉक [खनन](/developers/docs/consensus-mechanisms/pow/mining/) इनाम को 3 से घटाकर 2 ETH कर दिया।
- यह सुनिश्चित किया कि [प्रूफ-ऑफ़-स्टेक (PoS) लागू होने](#beacon-chain-genesis) से पहले ब्लॉकचेन फ़्रीज़ न हो।
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) में कुछ क्रियाओं की [गैस](/glossary/#gas) लागत को अनुकूलित किया।
- उन पतों के साथ इंटरैक्ट करने की क्षमता जोड़ी जो अभी तक बनाए नहीं गए हैं।

[एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="कॉन्स्टेंटिनोपल EIPs" contentPreview="इस फ़ोर्क में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>कुछ ऑनचेन क्रियाओं की लागत को अनुकूलित करता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>आपको उन पतों के साथ इंटरैक्ट करने की अनुमति देता है जो अभी तक बनाए नहीं गए हैं।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>किसी अन्य कॉन्ट्रैक्ट के कोड का हैश प्राप्त करने के लिए <code>EXTCODEHASH</code> निर्देश पेश करता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>यह सुनिश्चित करता है कि प्रूफ-ऑफ़-स्टेक (PoS) से पहले ब्लॉकचेन फ़्रीज़ न हो और ब्लॉक इनाम को 3 से घटाकर 2 ETH कर देता है।</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### बाइज़ेंटियम {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### सारांश {#byzantium-summary}

बायज़ेंटियम फोर्क:

- ब्लॉक [खनन](/developers/docs/consensus-mechanisms/pow/mining/) इनाम को 5 से घटाकर 3 ETH कर दिया गया।
- [कठिनाई बम](/glossary/#difficulty-bomb) को एक साल के लिए टाल दिया गया।
- अन्य कॉन्ट्रैक्ट्स में गैर-स्थिति-परिवर्तनकारी (non-state-changing) कॉल करने की क्षमता जोड़ी गई।
- [लेयर 2 (l2) स्केलिंग](/developers/docs/scaling/#layer-2-scaling) की अनुमति देने के लिए कुछ क्रिप्टोग्राफी विधियों को जोड़ा गया।

[एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="बाइज़ेंटियम EIPs" contentPreview="इस फ़ोर्क में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em><code>REVERT</code> ऑपकोड जोड़ता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>सफलता या विफलता को इंगित करने के लिए लेन-देन रसीदों में स्थिति (status) फ़ील्ड जोड़ा गया।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/) की अनुमति देने के लिए दीर्घवृत्तीय वक्र और अदिश गुणन (scalar multiplication) जोड़ता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/) की अनुमति देने के लिए दीर्घवृत्तीय वक्र और अदिश गुणन जोड़ता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA हस्ताक्षर सत्यापन को सक्षम करता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>परिवर्तनीय लंबाई (variable length) वाले रिटर्न मानों के लिए समर्थन जोड़ता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em><code>STATICCALL</code> ऑपकोड जोड़ता है, जो अन्य कॉन्ट्रैक्ट्स में गैर-स्थिति-परिवर्तनकारी कॉल की अनुमति देता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>कठिनाई समायोजन सूत्र को बदलता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>[कठिनाई बम](/glossary/#difficulty-bomb) को 1 साल के लिए टालता है और ब्लॉक इनाम को 5 से घटाकर 3 ETH करता है।</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### स्प्यूरियस ड्रैगन {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### सारांश {#spurious-dragon-summary}

स्प्यूरियस ड्रैगन फ़ोर्क नेटवर्क पर डिनायल ऑफ़ सर्विस (DoS) हमलों (सितंबर/अक्टूबर 2016) की दूसरी प्रतिक्रिया थी, जिसमें शामिल हैं:

- नेटवर्क पर भविष्य के हमलों को रोकने के लिए ऑपकोड मूल्य निर्धारण को ट्यून करना।
- ब्लॉकचेन स्थिति (state) के "डीब्लोट" को सक्षम करना।
- रीप्ले अटैक सुरक्षा जोड़ना।

[एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="स्प्यूरियस ड्रैगन EIPs" contentPreview="इस फ़ोर्क में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>एक इथेरियम चेन से लेन-देन को किसी वैकल्पिक चेन पर फिर से प्रसारित होने से रोकता है, उदाहरण के लिए मुख्य इथेरियम चेन पर टेस्टनेट लेन-देन का रीप्ले होना।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em><code>EXP</code> ऑपकोड की कीमतों को समायोजित करता है – कम्प्यूटेशनल रूप से महंगे कॉन्ट्रैक्ट संचालन के माध्यम से नेटवर्क को धीमा करना अधिक कठिन बनाता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS हमलों के माध्यम से जोड़े गए खाली खातों को हटाने की अनुमति देता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>ब्लॉकचेन पर किसी कॉन्ट्रैक्ट के अधिकतम कोड आकार को बदलकर 24576 बाइट्स कर देता है।</em></li>
</ul>

</ExpandableCard>

---

### टैंगरीन विसल {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### सारांश {#tangerine-whistle-summary}

टैंगरीन विसल फ़ोर्क नेटवर्क पर डिनायल ऑफ़ सर्विस (DoS) हमलों (सितंबर/अक्टूबर 2016) की पहली प्रतिक्रिया थी, जिसमें शामिल हैं:

- कम कीमत वाले ऑपरेशन कोड (ऑपकोड) से संबंधित तत्काल नेटवर्क स्वास्थ्य समस्याओं का समाधान करना।

[एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="टैंगरीन विसल EIPs" contentPreview="इस फ़ोर्क में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>स्पैम हमलों में उपयोग किए जा सकने वाले ऑपकोड की गैस लागत बढ़ाता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>इथेरियम प्रोटोकॉल के पुराने संस्करणों में खामियों के कारण बहुत कम लागत पर स्थिति (state) में रखे गए बड़ी संख्या में खाली खातों को हटाकर स्थिति का आकार कम करता है।</em></li>
</ul>

</ExpandableCard>

---

### DAO फ़ोर्क {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### सारांश {#dao-fork-summary}

DAO फ़ोर्क [2016 के DAO हमले](https://www.coindesk.com/learn/understanding-the-dao-attack/) की प्रतिक्रिया में था, जहां एक हैक में एक असुरक्षित [DAO](/glossary/#dao) कॉन्ट्रैक्ट से 3.6 मिलियन से अधिक ETH निकाल लिए गए थे। फ़ोर्क ने दोषपूर्ण कॉन्ट्रैक्ट से फंड को एक [नए कॉन्ट्रैक्ट](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) में स्थानांतरित कर दिया, जिसमें केवल एक फ़ंक्शन था: निकासी (withdraw)। जिस किसी का भी फंड खो गया था, वह अपने वॉलेट में मौजूद हर 100 DAO टोकन के लिए 1 ETH निकाल सकता था।

इस कार्रवाई पर इथेरियम समुदाय द्वारा मतदान किया गया था। कोई भी ETH धारक [एक वोटिंग प्लेटफ़ॉर्म](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) पर लेन-देन के माध्यम से वोट करने में सक्षम था। फ़ोर्क करने के निर्णय को 85% से अधिक वोट मिले।

कुछ खनिकों (miners) ने फ़ोर्क करने से इनकार कर दिया क्योंकि DAO की घटना प्रोटोकॉल में कोई खराबी नहीं थी। उन्होंने आगे चलकर [इथेरियम क्लासिक](https://ethereumclassic.org/) बनाया।

[एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### होमस्टेड {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### सारांश {#homestead-summary}

होमस्टेड फ़ोर्क ने भविष्य की ओर देखा। इसमें कई प्रोटोकॉल परिवर्तन और एक नेटवर्किंग परिवर्तन शामिल था जिसने इथेरियम को आगे नेटवर्क अपग्रेड करने की क्षमता दी।

[एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="होमस्टेड EIPs" contentPreview="इस फ़ोर्क में शामिल आधिकारिक सुधार।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>कॉन्ट्रैक्ट निर्माण प्रक्रिया में संपादन करता है।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>नया ऑपकोड जोड़ता है: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p फॉरवर्ड कम्पैटिबिलिटी (forward compatibility) आवश्यकताओं को पेश करता है</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### फ्रंटियर थॉइंग {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### सारांश {#frontier-thawing-summary}

फ्रंटियर थॉइंग फ़ोर्क ने प्रति [ब्लॉक](/glossary/#block) 5,000 [गैस](/glossary/#gas) सीमा को हटा दिया और डिफ़ॉल्ट गैस मूल्य को 51 [Gwei](/glossary/#gwei) पर सेट कर दिया। इससे लेन-देन की अनुमति मिली – लेन-देन के लिए 21,000 गैस की आवश्यकता होती है। भविष्य में [प्रूफ-ऑफ़-स्टेक (PoS)](/glossary/#pos) के लिए हार्ड-फ़ोर्क सुनिश्चित करने के लिए [कठिनाई बम](/glossary/#difficulty-bomb) पेश किया गया था।

- [एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [इथेरियम प्रोटोकॉल अपडेट 1 पढ़ें](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### फ्रंटियर {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### सारांश {#frontier-summary}

फ्रंटियर इथेरियम प्रोजेक्ट का एक लाइव, लेकिन बुनियादी कार्यान्वयन था। यह सफल ओलंपिक परीक्षण चरण के बाद आया था। यह तकनीकी उपयोगकर्ताओं, विशेष रूप से डेवलपर्स के लिए था। [ब्लॉक](/glossary/#block) की [गैस](/glossary/#gas) सीमा 5,000 थी। इस 'थॉइंग' अवधि ने खनिकों को अपना संचालन शुरू करने में सक्षम बनाया और शुरुआती अपनाने वालों को बिना 'जल्दबाजी' किए अपने क्लाइंट इंस्टॉल करने की अनुमति दी।

[एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### ईथर की बिक्री {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

ईथर आधिकारिक तौर पर 42 दिनों के लिए बिक्री पर उपलब्ध था। आप इसे BTC से खरीद सकते थे।

[एथेरियम फाउंडेशन की घोषणा पढ़ें](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### येलो पेपर जारी किया गया {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

डॉ. गैविन वुड द्वारा लिखित येलो पेपर, इथेरियम प्रोटोकॉल की एक तकनीकी परिभाषा है।

[येलो पेपर देखें](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### श्वेतपत्र जारी किया गया {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

2015 में प्रोजेक्ट के लॉन्च से पहले, इथेरियम के संस्थापक विटालिक बुटेरिन द्वारा 2013 में प्रकाशित परिचयात्मक पेपर।

<DocLink href="/whitepaper/">
  श्वेतपत्र
</DocLink>
