---
title: सत्यापन
description: '''हिस्सेदारी का सबूत'' एथेरियम पर साक्षी का विवरण।'
lang: hi
---

एक सत्यापनकर्ता से प्रत्येक युग के दौरान एक साक्षी बनाने, हस्ताक्षर करने और प्रसारित करने की उम्मीद की जाती है। यह पेज बताता है कि ये साक्षी कैसे दिखते हैं और सहमति ग्राहकों के बीच उन्हें कैसे संसाधित और संप्रेषित किया जाता है।

## कोई साक्षी क्या होता है? {#what-is-an-attestation}

प्रत्येक [युग](/glossary/#epoch) (6.4 मिनट) एक सत्यापनकर्ता नेटवर्क के लिए एक साक्षी का प्रस्ताव करता है। साक्षी, युग में एक विशिष्ट स्लॉट के लिए है। साक्षी का उद्देश्य चेन के सत्यापनकर्ता के दृष्टिकोण के पक्ष में मतदान करना है, विशेष रूप से सबसे हालिया उचित ब्लॉक और वर्तमान युग में पहला ब्लॉक (`source` और `target` जांचबिंदुओं के रूप में जाना जाता है)। यह जानकारी सभी भाग लेने वाले सत्यापनकर्ताओं के लिए संयुक्त है, जिससे नेटवर्क ब्लॉकचेन की स्थिति के बारे में आम सहमति तक पहुंच सकता है।

साक्षी में निम्नलिखित घटक होते हैं:

- `aggregation_bits`: सत्यापनकर्ताओं की एक बिटलिस्ट जहां स्थिति उनकी समिति में सत्यापनकर्ता सूचकांक के लिए मैप करती है; मान (0/1) इंगित करता है कि क्या सत्यापनकर्ता ने `data` पर हस्ताक्षर किए हैं (यानी क्या वे सक्रिय हैं और ब्लॉक प्रस्तावक से सहमत हैं)
- `data`: साक्षी से संबंधित विवरण, जैसा कि नीचे परिभाषित किया गया है
- `signature`: एक BLS हस्ताक्षर जो व्यक्तिगत सत्यापनकर्ताओं के हस्ताक्षर एकत्र करता है

सत्यापनकर्ता को प्रमाणित करने के लिए पहला कार्य `data` का निर्माण करना है। `data` में निम्न जानकारी है:

- `slot`: वह स्लॉट नंबर जिसे साक्षी संदर्भित करता है
- `index`: एक संख्या जो पहचानती है कि किसी दिए गए स्लॉट में सत्यापनकर्ता किस समिति से संबंधित है
- `beacon_block_root`: ब्लॉक का रूट हैश सत्यापनकर्ता चेन के शीर्ष पर देखता है (कांटा-विकल्प एल्गोरिथम लागू करने का परिणाम)
- `source`: अन्तिम स्थिति वोट का हिस्सा यह दर्शाता है कि सत्यापनकर्ता सबसे हालिया उचित ब्लॉक के रूप में क्या देखते हैं
- `target`: अन्तिम स्थिति वोट का हिस्सा यह दर्शाता है कि सत्यापनकर्ता वर्तमान युग में पहले ब्लॉक के रूप में क्या देखते हैं

एक बार `data` बन जाने के बाद, सत्यापनकर्ता अपने स्वयं के सत्यापनकर्ता सूचकांक के अनुरूप `aggregation_bits` में बिट को 0 से 1 तक फ्लिप कर सकता है ताकि यह दिखाया जा सके कि उन्होंने भाग लिया है।

अंत में, सत्यापनकर्ता साक्षी पर हस्ताक्षर करता है और इसे नेटवर्क पर प्रसारित करता है।

### कुल जोड़ गए साक्षी {#aggregated-attestation}

प्रत्येक सत्यापनकर्ता के लिए नेटवर्क के चारों ओर इस डेटा को पारित करने से जुड़ा एक पर्याप्त ओवरहेड है। इसलिए, व्यक्तिगत सत्यापनकर्ताओं के सत्यापन को अधिक व्यापक रूप से प्रसारित होने से पहले सबनेट के भीतर एकत्रित किया जाता है। इसमें हस्ताक्षरों को एक साथ एकत्र करना शामिल है ताकि प्रसारित होने वाले साक्षी में आम सहमति `data` और उस `data` से सहमत सभी सत्यापनकर्ताओं के हस्ताक्षरों को मिलाकर गठित एक एकल हस्ताक्षर शामिल हो। इसका उपयोग करके कुल `aggregation_bits` की जांच की जा सकती हैं, क्योंकि यह उनकी समिति में प्रत्येक सत्यापनकर्ता का सूचकांक प्रदान करता है (जिसकी ID `data` में प्रदान की जाती है) जिसका उपयोग व्यक्तिगत हस्ताक्षरों को क्वेरी करने के लिए किया जा सकता है।

प्रत्येक युग में प्रत्येक सबनेट में 16 सत्यापनकर्ताओं को `aggregators` के रूप में चुना जाता है। एग्रीगेटर उन सभी प्रमाणों को इकट्ठा करते हैं जिनके बारे में वे गपशप नेटवर्क पर सुनते हैं जिनके पास अपने स्वयं के बराबर `data` होता है। मेल खाने वाले प्रत्येक साक्षी का प्रेषक `aggregation_bits` में रिकॉर्ड किया जाता है। एग्रीगेटर तब साक्षी समुच्चय को व्यापक नेटवर्क पर प्रसारित करते हैं।

जब एक सत्यापनकर्ता को ब्लॉक प्रस्तावक के रूप में चुना जाता है, तो वे सबनेट से नए ब्लॉक में नवीनतम स्लॉट तक कुल सत्यापन पैकेज करते हैं।

### साक्षी समावेशन जीवनचक्र {#attestation-inclusion-lifecycle}

1. जनरेशन
2. प्रचारण
3. कुल जोड़कर
4. प्रचारण
5. समावेशन

साक्षी जीवनचक्र नीचे योजनाबद्ध में उल्लिखित है:

![साक्षी जीवनचक्र](./attestation_schematic.png)

## पुरस्कार {#rewards}

सत्यापनकर्ताओं को सत्यापन जमा करने के लिए पुरस्कृत किया जाता है। साक्षी इनाम भागीदारी फ्लैग (स्रोत, लक्ष्य और शीर्ष), आधार इनाम और भागीदारी दर पर निर्भर करता है।

प्रत्येक भागीदारी फ्लैग या तो सही या गलत हो सकता है, जो प्रस्तुत साक्षी और इसके समावेशन में देरी पर निर्भर करता है।

सबसे अच्छा परिदृश्य तब होता है जब सभी तीन फ्लैग सत्य होते हैं, जिस स्थिति में एक सत्यापनकर्ता अर्जित करेगा (प्रति सही फ्लैग):

`इनाम += आधार इनाम * फ्लैग का भार * ध्वज सत्यापन दर / 64`

फ्लैग सत्यापन दर को कुल सक्रिय प्रभावी शेष राशि की तुलना में दिए गए फ्लैग के लिए सभी सत्यापनकर्ताओं के प्रभावी शेष राशि के योग का उपयोग करके मापा जाता है।

### आधार इनाम {#base-reward}

आधार इनाम की गणना सत्यापनकर्ताओं की संख्या और उनके प्रभावी दांव पर लगे ईथर बैलेंस के अनुसार की जाती है:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### समावेशन में देरी {#inclusion-delay}

उस समय जब सत्यापनकर्ताओं ने श्रृंखला (`block n`) के शीर्ष पर मतदान किया था, `block n+1` अभी तक प्रस्तावित नहीं था। इसलिए सत्यापन स्वाभाविक रूप से **एक ब्लॉक बाद** में शामिल हो जाते हैं, इसलिए `block n` पर मतदान करने वाले सभी सत्यापन चेन हेड होने के कारण `block n+1` में शामिल हो गए और, **समावेशन देरी** 1 है। यदि समावेशन में देरी दो स्लॉट तक दोगुनी हो जाती है, तो साक्षी इनाम आधा हो जाता है, क्योंकि साक्षी इनाम की गणना करने के लिए आधार इनाम को समावेशन देरी के पारस्परिक से गुणा किया जाता है।

### साक्षी परिदृश्य {#attestation-scenarios}

#### मिसिंग वोटिंग सत्यापनकर्ता {#missing-voting-validator}

सत्यापनकर्ताओं के पास अपना साक्षी जमा करने के लिए अधिकतम 1 युग होता है। यदि साक्षी, युग 0 में चूक गया था, तो वे इसे युग 1 में शामिल किए जाने में देरी के साथ सबमिट कर सकते हैं।

#### गुम एग्रीगेटर {#missing-aggregator}

कुल मिलाकर प्रति युग 16 एग्रीगेटर हैं। इसके अलावा, रेंडम सत्यापनकर्ता **256 युगों के लिए दो सबनेट** की सदस्यता लेते हैं और एग्रीगेटर गायब होने की स्थिति में बैकअप के रूप में काम करते हैं।

#### अनुपलब्ध ब्लॉक प्रस्तावक {#missing-block-proposer}

ध्यान दें कि कुछ मामलों में एक भाग्यशाली एग्रीगेटर ब्लॉक प्रस्तावक भी बन सकता है। यदि साक्षी शामिल नहीं किया गया था, क्योंकि ब्लॉक प्रस्तावक गायब हो गया है, तो अगला ब्लॉक प्रस्तावक एकत्रित सत्यापन को उठाएगा और इसे अगले ब्लॉक में शामिल करेगा। हालांकि, **समावेशन देरी** एक से बढ़ जाएगी।

## अतिरिक्त पाठ्यसामग्री {#further-reading}

- [विटालिक के एनोटेट सर्वसम्मति विनिर्देश में सत्यापन](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [eth2book.info में सत्यापन](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_एक सामुदायिक संसाधन के बारे में जानें जिसने आपकी मदद की? इस पृष्ठ को संपादित करें और इसे जोड़ें!_
