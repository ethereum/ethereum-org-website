---
title: "गुप्त पतों का उपयोग करना"
description: "गुप्त पते उपयोगकर्ताओं को गुमनाम रूप से संपत्तियों को ट्रांसफर करने की अनुमति देते हैं। इस लेख को पढ़ने के बाद, आप यह कर सकेंगे: समझाएं कि गुप्त पते क्या हैं और वे कैसे काम करते हैं, समझें कि गुमनामी बनाए रखने वाले तरीके से गुप्त पतों का उपयोग कैसे करें, और एक वेब-आधारित एप्लिकेशन लिखें जो गुप्त पतों का उपयोग करता है।"
author: "ओरी पोमेरेंट्ज़"
tags:
  - गुप्त पता
  - गोपनीयता
  - क्रिप्टोग्राफी
  - Rust
  - wasm
skill: intermediate
breadcrumb: "गुप्त पते"
published: 2025-11-30
lang: hi
sidebarDepth: 3
---

आप बिल हैं। जिन कारणों पर हम चर्चा नहीं करेंगे, उनके लिए आप "ऐलिस फॉर क्वीन ऑफ द वर्ल्ड" अभियान में दान करना चाहते हैं और चाहते हैं कि ऐलिस को पता चले कि आपने दान किया है ताकि यदि वह जीतती है तो वह आपको पुरस्कार दे सके। दुर्भाग्य से, उसकी जीत की गारंटी नहीं है। एक प्रतिस्पर्धी अभियान है, "कैरोल फॉर एम्प्रेस ऑफ द सोलर सिस्टम"। यदि कैरोल जीत जाती है, और उसे पता चलता है कि आपने ऐलिस को दान दिया है, तो आप मुसीबत में पड़ जाएंगे। इसलिए आप अपने खाते से ऐलिस के खाते में सीधे 200 ETH ट्रांसफर नहीं कर सकते।

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) के पास इसका समाधान है। यह ERC बताता है कि गुमनाम ट्रांसफर के लिए [गुप्त पतों](https://nerolation.github.io/stealth-utils) का उपयोग कैसे करें।

**चेतावनी**: गुप्त पतों के पीछे की क्रिप्टोग्राफी, जहाँ तक हम जानते हैं, सुरक्षित है। हालाँकि, संभावित साइड-चैनल हमले हो सकते हैं। [नीचे](#go-wrong), आप देखेंगे कि इस जोखिम को कम करने के लिए आप क्या कर सकते हैं।

## गुप्त पते कैसे काम करते हैं {#how}

यह लेख गुप्त पतों को दो तरीकों से समझाने का प्रयास करेगा। पहला है [उनका उपयोग कैसे करें](#how-use)। यह भाग शेष लेख को समझने के लिए पर्याप्त है। फिर, [इसके पीछे के गणित की व्याख्या](#how-math) है। यदि आपकी रुचि क्रिप्टोग्राफी में है, तो इस भाग को भी पढ़ें।

### सरल संस्करण (गुप्त पतों का उपयोग कैसे करें) {#how-use}

ऐलिस दो निजी कुंजियाँ बनाती है और संबंधित सार्वजनिक कुंजियाँ प्रकाशित करती है (जिन्हें एक एकल डबल-लेंथ मेटा-पते में जोड़ा जा सकता है)। बिल भी एक निजी कुंजी बनाता है और संबंधित सार्वजनिक कुंजी प्रकाशित करता है।

एक पक्ष की सार्वजनिक कुंजी और दूसरे की निजी कुंजी का उपयोग करके, आप एक साझा रहस्य (shared secret) प्राप्त कर सकते हैं जो केवल ऐलिस और बिल को पता होता है (इसे केवल सार्वजनिक कुंजियों से प्राप्त नहीं किया जा सकता है)। इस साझा रहस्य का उपयोग करके, बिल गुप्त पता प्राप्त करता है और उस पर संपत्तियां भेज सकता है।

ऐलिस को भी साझा रहस्य से पता मिल जाता है, लेकिन क्योंकि वह अपने द्वारा प्रकाशित सार्वजनिक कुंजियों की निजी कुंजियों को जानती है, इसलिए वह वह निजी कुंजी भी प्राप्त कर सकती है जो उसे उस पते से निकासी करने देती है।

### गणित (गुप्त पते इस तरह क्यों काम करते हैं) {#how-math}

मानक गुप्त पते समान स्तर की सुरक्षा बनाए रखते हुए कम कुंजी बिट्स के साथ बेहतर प्रदर्शन प्राप्त करने के लिए [एलिप्टिक-कर्व क्रिप्टोग्राफी (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) का उपयोग करते हैं। लेकिन अधिकांश भाग के लिए हम इसे अनदेखा कर सकते हैं और यह मान सकते हैं कि हम नियमित अंकगणित का उपयोग कर रहे हैं।

एक संख्या है जिसे हर कोई जानता है, *G*। आप *G* से गुणा कर सकते हैं। लेकिन ECC की प्रकृति के कारण, *G* से भाग देना व्यावहारिक रूप से असंभव है। इथेरियम में सार्वजनिक कुंजी क्रिप्टोग्राफी आम तौर पर इस तरह काम करती है कि आप लेन-देन पर हस्ताक्षर करने के लिए एक निजी कुंजी, *P<sub>priv</sub>*, का उपयोग कर सकते हैं जिन्हें फिर एक सार्वजनिक कुंजी, *P<sub>pub</sub> = GP<sub>priv</sub>* द्वारा सत्यापित किया जाता है।

ऐलिस दो निजी कुंजियाँ, *K<sub>priv</sub>* और *V<sub>priv</sub>* बनाती है। *K<sub>priv</sub>* का उपयोग गुप्त पते से पैसे खर्च करने के लिए किया जाएगा, और *V<sub>priv</sub>* का उपयोग ऐलिस के पतों को देखने के लिए किया जाएगा। ऐलिस फिर सार्वजनिक कुंजियाँ प्रकाशित करती है: *K<sub>pub</sub> = GK<sub>priv</sub>* और *V<sub>pub</sub> = GV<sub>priv</sub>*

बिल एक तीसरी निजी कुंजी, *R<sub>priv</sub>* बनाता है, और एक केंद्रीय रजिस्ट्री में *R<sub>pub</sub> = GR<sub>priv</sub>* प्रकाशित करता है (बिल इसे ऐलिस को भी भेज सकता था, लेकिन हम मान लेते हैं कि कैरोल सुन रही है)।

बिल *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* की गणना करता है, जिसके बारे में उसे उम्मीद है कि ऐलिस भी जानती होगी (नीचे समझाया गया है)। इस मान को *S*, साझा रहस्य कहा जाता है। यह बिल को एक सार्वजनिक कुंजी, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* देता है। इस सार्वजनिक कुंजी से, वह एक पते की गणना कर सकता है और उस पर जो भी संसाधन चाहे भेज सकता है। भविष्य में, यदि ऐलिस जीतती है, तो बिल उसे *R<sub>priv</sub>* बता सकता है ताकि यह साबित हो सके कि संसाधन उसकी ओर से आए थे।

ऐलिस *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* की गणना करती है। यह उसे वही साझा रहस्य, *S* देता है। क्योंकि वह निजी कुंजी, *K<sub>priv</sub>* जानती है, वह *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* की गणना कर सकती है। यह कुंजी उसे उस पते में संपत्तियों तक पहुंचने देती है जो *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)* से प्राप्त होता है।

हमारे पास एक अलग देखने की कुंजी (viewing key) है ताकि ऐलिस डेव की वर्ल्ड डोमिनेशन कैंपेन सर्विसेज को उपठेका (subcontract) दे सके। ऐलिस डेव को सार्वजनिक पतों के बारे में जानने देने और अधिक पैसा उपलब्ध होने पर उसे सूचित करने के लिए तैयार है, लेकिन वह नहीं चाहती कि वह उसके अभियान का पैसा खर्च करे।

चूंकि देखने और खर्च करने के लिए अलग-अलग कुंजियों का उपयोग किया जाता है, इसलिए ऐलिस डेव को *V<sub>priv</sub>* दे सकती है। फिर डेव *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* की गणना कर सकता है और इस तरह सार्वजनिक कुंजियाँ (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*) प्राप्त कर सकता है। लेकिन *K<sub>priv</sub>* के बिना डेव निजी कुंजी प्राप्त नहीं कर सकता।

संक्षेप में, ये विभिन्न प्रतिभागियों द्वारा ज्ञात मान हैं।

| ऐलिस | प्रकाशित | बिल | डेव |
| - | - | - | - |
| G | G | G | G |
| *K<sub>priv</sub>* | - | - | - | 
| *V<sub>priv</sub>* | - | - | *V<sub>priv</sub>* |
| *K<sub>pub</sub> = GK<sub>priv</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* |
| *V<sub>pub</sub> = GV<sub>priv</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* |
| - | - | *R<sub>priv</sub>* | - |
| *R<sub>pub</sub>* | *R<sub>pub</sub>* | *R<sub>pub</sub> = GR<sub>priv</sub>* | *R<sub>pub</sub>* |
| *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | - | *S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | *S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>* |
| *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | - | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* |
| *Address=f(P<sub>pub</sub>)* | - | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* | - | - | - |

## जब गुप्त पते गलत हो जाते हैं {#go-wrong}

*ब्लॉकचेन पर कोई रहस्य नहीं होते हैं*। हालांकि गुप्त पते आपको गोपनीयता प्रदान कर सकते हैं, वह गोपनीयता ट्रैफ़िक विश्लेषण के प्रति संवेदनशील है। एक मामूली उदाहरण लेने के लिए, कल्पना करें कि बिल एक पते को फंड करता है और तुरंत एक *R<sub>pub</sub>* मान प्रकाशित करने के लिए एक लेन-देन भेजता है। ऐलिस के *V<sub>priv</sub>* के बिना, हम यह सुनिश्चित नहीं कर सकते कि यह एक गुप्त पता है, लेकिन ऐसा होने की पूरी संभावना है। फिर, हम एक और लेन-देन देखते हैं जो उस पते से सभी ETH को ऐलिस के अभियान फंड पते पर ट्रांसफर करता है। हम इसे साबित करने में सक्षम नहीं हो सकते हैं, लेकिन यह संभावना है कि बिल ने अभी ऐलिस के अभियान में दान दिया है। कैरोल निश्चित रूप से ऐसा ही सोचेगी।

बिल के लिए *R<sub>pub</sub>* के प्रकाशन को गुप्त पते की फंडिंग से अलग करना आसान है (उन्हें अलग-अलग समय पर, अलग-अलग पतों से करें)। हालाँकि, यह अपर्याप्त है। कैरोल जिस पैटर्न की तलाश करती है वह यह है कि बिल एक पते को फंड करता है, और फिर ऐलिस का अभियान फंड उससे निकासी करता है।

एक समाधान यह है कि ऐलिस का अभियान सीधे पैसे न निकाले, बल्कि किसी तीसरे पक्ष को भुगतान करने के लिए इसका उपयोग करे। यदि ऐलिस का अभियान डेव की वर्ल्ड डोमिनेशन कैंपेन सर्विसेज को 10 ETH भेजता है, तो कैरोल को केवल यह पता चलता है कि बिल ने डेव के किसी ग्राहक को दान दिया है। यदि डेव के पास पर्याप्त ग्राहक हैं, तो कैरोल यह नहीं जान पाएगी कि बिल ने ऐलिस को दान दिया है जो उसके साथ प्रतिस्पर्धा करती है, या एडम, अल्बर्ट, या अबीगैल को जिससे कैरोल को कोई मतलब नहीं है। ऐलिस भुगतान के साथ एक हैश किया गया मान शामिल कर सकती है, और फिर डेव को प्रीइमेज (preimage) प्रदान कर सकती है, यह साबित करने के लिए कि यह उसका दान था। वैकल्पिक रूप से, जैसा कि ऊपर उल्लेख किया गया है, यदि ऐलिस डेव को अपना *V<sub>priv</sub>* देती है, तो वह पहले से ही जानता है कि भुगतान किसकी ओर से आया है।

इस समाधान के साथ मुख्य समस्या यह है कि इसके लिए ऐलिस को गोपनीयता की परवाह करने की आवश्यकता होती है जब वह गोपनीयता बिल को लाभ पहुंचाती है। ऐलिस अपनी प्रतिष्ठा बनाए रखना चाह सकती है ताकि बिल का दोस्त बॉब भी उसे दान दे। लेकिन यह भी संभव है कि उसे बिल को उजागर करने में कोई आपत्ति न हो, क्योंकि तब वह इस बात से डर जाएगा कि अगर कैरोल जीत गई तो क्या होगा। बिल अंततः ऐलिस को और भी अधिक समर्थन प्रदान कर सकता है।

### कई गुप्त परतों (stealth layers) का उपयोग करना {#multi-layer}

बिल की गोपनीयता बनाए रखने के लिए ऐलिस पर निर्भर रहने के बजाय, बिल इसे स्वयं कर सकता है। वह काल्पनिक लोगों, बॉब और बेला के लिए कई मेटा-पते उत्पन्न कर सकता है। बिल फिर बॉब को ETH भेजता है, और "बॉब" (जो वास्तव में बिल है) इसे बेला को भेजता है। "बेला" (वह भी बिल है) इसे ऐलिस को भेजती है।

कैरोल अभी भी ट्रैफ़िक विश्लेषण कर सकती है और बिल-से-बॉब-से-बेला-से-ऐलिस पाइपलाइन देख सकती है। हालाँकि, यदि "बॉब" और "बेला" अन्य उद्देश्यों के लिए भी ETH का उपयोग करते हैं, तो ऐसा नहीं लगेगा कि बिल ने ऐलिस को कुछ भी ट्रांसफर किया है, भले ही ऐलिस तुरंत गुप्त पते से अपने ज्ञात अभियान पते पर निकासी कर ले।

## एक गुप्त-पता एप्लिकेशन लिखना {#write-app}

यह लेख [GitHub पर उपलब्ध](https://github.com/qbzzt/251022-stealth-addresses.git) एक गुप्त-पता एप्लिकेशन की व्याख्या करता है।

### उपकरण {#tools}

एक [TypeScript गुप्त पता लाइब्रेरी](https://github.com/ScopeLift/stealth-address-sdk) है जिसका हम उपयोग कर सकते हैं। हालाँकि, क्रिप्टोग्राफ़िक संचालन CPU-गहन हो सकते हैं। मैं उन्हें [Rust](https://rust-lang.org/) जैसी संकलित (compiled) भाषा में लागू करना पसंद करता हूँ, और ब्राउज़र में कोड चलाने के लिए [WASM](https://webassembly.org/) का उपयोग करता हूँ।

हम [Vite](https://vite.dev/) और [React](https://react.dev/) का उपयोग करने जा रहे हैं। ये उद्योग-मानक उपकरण हैं; यदि आप उनसे परिचित नहीं हैं, तो आप [इस ट्यूटोरियल](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) का उपयोग कर सकते हैं। Vite का उपयोग करने के लिए, हमें Node की आवश्यकता है।

### गुप्त पतों को काम करते हुए देखें {#in-action}

1. आवश्यक उपकरण स्थापित करें: [Rust](https://rust-lang.org/tools/install/) और [Node](https://nodejs.org/en/download)।

2. GitHub रिपॉजिटरी को क्लोन करें।

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. पूर्वापेक्षाएँ (prerequisites) स्थापित करें और Rust कोड संकलित करें।

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. वेब सर्वर प्रारंभ करें।

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. [एप्लिकेशन](http://localhost:5173/) पर ब्राउज़ करें। इस एप्लिकेशन पेज में दो फ्रेम हैं: एक ऐलिस के यूजर इंटरफेस के लिए और दूसरा बिल के लिए। दोनों फ्रेम संवाद नहीं करते हैं; वे केवल सुविधा के लिए एक ही पेज पर हैं।

6. ऐलिस के रूप में, **Generate a Stealth Meta-Address** पर क्लिक करें। यह नया गुप्त पता और संबंधित निजी कुंजियाँ प्रदर्शित करेगा। गुप्त मेटा-पते को क्लिपबोर्ड पर कॉपी करें।

7. बिल के रूप में, नया गुप्त मेटा-पता पेस्ट करें और **Generate an address** पर क्लिक करें। यह आपको ऐलिस के लिए फंड करने का पता देता है।

8. पते और बिल की सार्वजनिक कुंजी को कॉपी करें और उन्हें ऐलिस के यूजर इंटरफेस के "Private key for address generated by Bill" क्षेत्र में पेस्ट करें। एक बार वे फ़ील्ड भर जाने के बाद, आप उस पते पर संपत्तियों तक पहुँचने के लिए निजी कुंजी देखेंगे।

9. आप यह सुनिश्चित करने के लिए [एक ऑनलाइन कैलकुलेटर](https://iancoleman.net/ethereum-private-key-to-address/) का उपयोग कर सकते हैं कि निजी कुंजी पते से मेल खाती है।

### प्रोग्राम कैसे काम करता है {#how-the-program-works}

#### WASM घटक {#wasm}

WASM में संकलित होने वाला स्रोत कोड [Rust](https://rust-lang.org/) में लिखा गया है। आप इसे [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) में देख सकते हैं। यह कोड मुख्य रूप से JavaScript कोड और [`eth-stealth-addresses` लाइब्रेरी](https://github.com/kassandraoftroy/eth-stealth-addresses) के बीच एक इंटरफ़ेस है।

**`Cargo.toml`**

Rust में [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) JavaScript में [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) के समान है। इसमें पैकेज की जानकारी, निर्भरता घोषणाएं (dependency declarations) आदि शामिल हैं।

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) पैकेज को यादृच्छिक (random) मान उत्पन्न करने की आवश्यकता है। यह शुद्ध एल्गोरिथम साधनों द्वारा नहीं किया जा सकता है; इसके लिए एन्ट्रोपी के स्रोत के रूप में एक भौतिक प्रक्रिया तक पहुंच की आवश्यकता होती है। यह परिभाषा निर्दिष्ट करती है कि हम उस ब्राउज़र से पूछकर वह एन्ट्रोपी प्राप्त करेंगे जिसमें हम चल रहे हैं।

```toml
console_error_panic_hook = "0.1.7"
```

[यह लाइब्रेरी](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) हमें अधिक सार्थक त्रुटि संदेश देती है जब WASM कोड पैनिक (panic) करता है और जारी नहीं रह सकता है।

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

WASM कोड उत्पन्न करने के लिए आवश्यक आउटपुट प्रकार।

**`lib.rs`**

यह वास्तविक Rust कोड है।

```rust
use wasm_bindgen::prelude::*;
```

Rust से WASM पैकेज बनाने की परिभाषाएँ। उन्हें [यहाँ](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html) प्रलेखित किया गया है।

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

वे फ़ंक्शन जिनकी हमें [`eth-stealth-addresses` लाइब्रेरी](https://github.com/kassandraoftroy/eth-stealth-addresses) से आवश्यकता है।

```rust
use hex::{decode,encode};
```

Rust आमतौर पर मानों के लिए बाइट [ऐरे (arrays)](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) का उपयोग करता है। लेकिन JavaScript में, हम आमतौर पर हेक्साडेसिमल स्ट्रिंग्स का उपयोग करते हैं। [`hex` लाइब्रेरी](https://docs.rs/hex/latest/hex/) हमारे लिए एक प्रतिनिधित्व से दूसरे में अनुवाद करती है।

```rust
#[wasm_bindgen]
```

JavaScript से इस फ़ंक्शन को कॉल करने में सक्षम होने के लिए WASM बाइंडिंग उत्पन्न करें।

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

कई फ़ील्ड वाले ऑब्जेक्ट को वापस करने का सबसे आसान तरीका JSON स्ट्रिंग वापस करना है।

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) तीन फ़ील्ड देता है:

- मेटा-पता (*K<sub>pub</sub>* और *V<sub>pub</sub>*)
- देखने की निजी कुंजी (*V<sub>priv</sub>*)
- खर्च करने की निजी कुंजी (*K<sub>priv</sub>*)

[टुपल (tuple)](https://doc.rust-lang.org/std/primitive.tuple.html) सिंटैक्स हमें उन मानों को फिर से अलग करने देता है।

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

JSON-एन्कोडेड स्ट्रिंग उत्पन्न करने के लिए [`format!`](https://doc.rust-lang.org/std/fmt/index.html) मैक्रो का उपयोग करें। ऐरे को हेक्स स्ट्रिंग्स में बदलने के लिए [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) का उपयोग करें।

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

यह फ़ंक्शन (JavaScript द्वारा प्रदान की गई) हेक्स स्ट्रिंग को बाइट ऐरे में बदल देता है। हम इसका उपयोग JavaScript कोड द्वारा प्रदान किए गए मानों को पार्स करने के लिए करते हैं। यह फ़ंक्शन जटिल है क्योंकि Rust ऐरे और वैक्टर को कैसे संभालता है।

`<const N: usize>` अभिव्यक्ति को [जेनेरिक (generic)](https://doc.rust-lang.org/book/ch10-01-syntax.html) कहा जाता है। `N` एक पैरामीटर है जो लौटाए गए ऐरे की लंबाई को नियंत्रित करता है। फ़ंक्शन को वास्तव में `str_to_array::<n>` कहा जाता है, जहाँ `n` ऐरे की लंबाई है।

रिटर्न मान `Option<[u8; N]>` है, जिसका अर्थ है कि लौटाया गया ऐरे [वैकल्पिक (optional)](https://doc.rust-lang.org/std/option/) है। यह उन फ़ंक्शंस के लिए Rust में एक विशिष्ट पैटर्न है जो विफल हो सकते हैं।

उदाहरण के लिए, यदि हम `str_to_array::10("bad060a7")` को कॉल करते हैं, तो फ़ंक्शन को दस-मान वाला ऐरे वापस करना चाहिए, लेकिन इनपुट केवल चार बाइट्स है। फ़ंक्शन को विफल होने की आवश्यकता है, और यह `None` वापस करके ऐसा करता है। `str_to_array::4("bad060a7")` के लिए रिटर्न मान `Some<[0xba, 0xd0, 0x60, 0xa7]>` होगा।

```rust
    // decode Result<Vec<u8>, _> लौटाता है
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) फ़ंक्शन एक `Result<Vec<u8>, FromHexError>` देता है। [`Result`](https://doc.rust-lang.org/std/result/) प्रकार में या तो एक सफल परिणाम (`Ok(value)`) या एक त्रुटि (`Err(error)`) हो सकती है।

`.ok()` विधि `Result` को `Option` में बदल देती है, जिसका मान सफल होने पर `Ok()` मान होता है या नहीं होने पर `None` होता है। अंत में, [प्रश्न चिह्न ऑपरेटर](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) वर्तमान फ़ंक्शंस को निरस्त कर देता है और यदि `Option` खाली है तो `None` देता है। अन्यथा, यह मान को अनरैप (unwrap) करता है और उसे वापस कर देता है (इस मामले में, `vec` को एक मान निर्दिष्ट करने के लिए)।

यह त्रुटियों को संभालने के लिए एक अजीब तरह से जटिल तरीका लगता है, लेकिन `Result` और `Option` यह सुनिश्चित करते हैं कि सभी त्रुटियों को किसी न किसी तरह से संभाला जाए।

```rust
    if vec.len() != N { return None; }
```

यदि बाइट्स की संख्या गलत है, तो यह एक विफलता है, और हम `None` वापस करते हैं।

```rust
    // try_into vec का उपभोग करता है और [u8; N] बनाने का प्रयास करता है
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust में दो ऐरे प्रकार हैं। [ऐरे (Arrays)](https://doc.rust-lang.org/std/primitive.array.html) का आकार निश्चित होता है। [वैक्टर (Vectors)](https://doc.rust-lang.org/std/vec/index.html) बढ़ और सिकुड़ सकते हैं। `hex::decode` एक वेक्टर देता है, लेकिन `eth_stealth_addresses` लाइब्रेरी ऐरे प्राप्त करना चाहती है। [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) एक मान को दूसरे प्रकार में परिवर्तित करता है, उदाहरण के लिए, एक वेक्टर को ऐरे में।

```rust
    Some(array)
}
```

किसी फ़ंक्शन के अंत में मान वापस करते समय Rust को आपको [`return`](https://doc.rust-lang.org/std/keyword.return.html) कीवर्ड का उपयोग करने की आवश्यकता नहीं होती है।

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

यह फ़ंक्शन एक सार्वजनिक मेटा-पता प्राप्त करता है, जिसमें *V<sub>pub</sub>* और *K<sub>pub</sub>* दोनों शामिल हैं। यह गुप्त पता, प्रकाशित करने के लिए सार्वजनिक कुंजी (*R<sub>pub</sub>*), और एक-बाइट स्कैन मान देता है जो यह पहचानने में गति लाता है कि कौन से प्रकाशित पते ऐलिस के हो सकते हैं।

स्कैन मान साझा रहस्य (*S = GR<sub>priv</sub>V<sub>priv</sub>*) का हिस्सा है। यह मान ऐलिस के लिए उपलब्ध है, और इसकी जाँच करना यह जाँचने की तुलना में बहुत तेज़ है कि क्या *f(K<sub>pub</sub>+G\*hash(S))* प्रकाशित पते के बराबर है।

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

हम लाइब्रेरी के [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) का उपयोग करते हैं।

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

JSON-एन्कोडेड आउटपुट स्ट्रिंग तैयार करें।

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

यह फ़ंक्शन पते से निकासी करने के लिए निजी कुंजी (*R<sub>priv</sub>*) की गणना करने के लिए लाइब्रेरी के [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) का उपयोग करता है। इस गणना के लिए इन मानों की आवश्यकता होती है:

- पता (*Address=f(P<sub>pub</sub>)*)
- बिल द्वारा उत्पन्न सार्वजनिक कुंजी (*R<sub>pub</sub>*)
- देखने की निजी कुंजी (*V<sub>priv</sub>*)
- खर्च करने की निजी कुंजी (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) निर्दिष्ट करता है कि WASM कोड प्रारंभ होने पर फ़ंक्शन निष्पादित होता है।

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

यह कोड निर्दिष्ट करता है कि पैनिक आउटपुट JavaScript कंसोल पर भेजा जाए। इसे काम करते हुए देखने के लिए, एप्लिकेशन का उपयोग करें और बिल को एक अमान्य मेटा-पता दें (बस एक हेक्साडेसिमल अंक बदलें)। आप JavaScript कंसोल में यह त्रुटि देखेंगे:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

इसके बाद एक स्टैक ट्रेस (stack trace) होगा। फिर बिल को मान्य मेटा-पता दें, और ऐलिस को या तो एक अमान्य पता या एक अमान्य सार्वजनिक कुंजी दें। आप यह त्रुटि देखेंगे:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

फिर से, इसके बाद एक स्टैक ट्रेस होगा।

#### यूजर इंटरफेस {#ui}

यूजर इंटरफेस [React](https://react.dev/) का उपयोग करके लिखा गया है और [Vite](https://vite.dev/) द्वारा सर्व किया जाता है। आप [इस ट्यूटोरियल](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) का उपयोग करके उनके बारे में जान सकते हैं। यहाँ [Wagmi](https://wagmi.sh/) की कोई आवश्यकता नहीं है क्योंकि हम सीधे ब्लॉकचेन या वॉलेट के साथ इंटरैक्ट नहीं करते हैं।

यूजर इंटरफेस का एकमात्र गैर-स्पष्ट हिस्सा WASM कनेक्टिविटी है। यहाँ बताया गया है कि यह कैसे काम करता है।

**`vite.config.js`**

इस फ़ाइल में [Vite कॉन्फ़िगरेशन](https://vite.dev/config/) शामिल है।

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

हमें दो Vite प्लगइन्स की आवश्यकता है: [react](https://www.npmjs.com/package/@vitejs/plugin-react) और [wasm](https://github.com/Menci/vite-plugin-wasm#readme)।

**`App.jsx`**

यह फ़ाइल एप्लिकेशन का मुख्य घटक है। यह एक कंटेनर है जिसमें दो घटक शामिल हैं: `Alice` और `Bill`, उन उपयोगकर्ताओं के लिए यूजर इंटरफेस। WASM के लिए प्रासंगिक भाग इनिशियलाइज़ेशन कोड है।

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

जब हम [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) का उपयोग करते हैं, तो यह दो फ़ाइलें बनाता है जिनका हम यहाँ उपयोग करते हैं: वास्तविक कोड वाली एक wasm फ़ाइल (यहाँ, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) और इसका उपयोग करने के लिए परिभाषाओं वाली एक JavaScript फ़ाइल (यहाँ, `src/rust_wasm/pkg/rust_wasm.js`)। उस JavaScript फ़ाइल का डिफ़ॉल्ट निर्यात (export) वह कोड है जिसे WASM आरंभ करने के लिए चलाने की आवश्यकता होती है।

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

[`useEffect` हुक](https://react.dev/reference/react/useEffect) आपको एक फ़ंक्शन निर्दिष्ट करने देता है जो स्थिति (state) चर (variables) बदलने पर निष्पादित होता है। यहाँ, स्थिति चरों की सूची खाली है (`[]`), इसलिए यह फ़ंक्शन पेज लोड होने पर केवल एक बार निष्पादित होता है।

इफ़ेक्ट (effect) फ़ंक्शन को तुरंत वापस आना होता है। एसिंक्रोनस (asynchronous) कोड का उपयोग करने के लिए, जैसे कि WASM `init` (जिसे `.wasm` फ़ाइल लोड करनी होती है और इसलिए इसमें समय लगता है) हम एक आंतरिक [`async`](https://en.wikipedia.org/wiki/Async/await) फ़ंक्शन परिभाषित करते हैं और इसे बिना `await` के चलाते हैं।

**`Bill.jsx`**

यह बिल के लिए यूजर इंटरफेस है। इसमें एक ही क्रिया है, ऐलिस द्वारा प्रदान किए गए गुप्त मेटा-पते के आधार पर एक पता बनाना।

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

डिफ़ॉल्ट निर्यात के अलावा, `wasm-pack` द्वारा उत्पन्न JavaScript कोड WASM कोड में प्रत्येक फ़ंक्शन के लिए एक फ़ंक्शन निर्यात करता है।

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

WASM फ़ंक्शंस को कॉल करने के लिए, हम बस `wasm-pack` द्वारा बनाई गई JavaScript फ़ाइल द्वारा निर्यात किए गए फ़ंक्शन को कॉल करते हैं।

**`Alice.jsx`**

`Alice.jsx` में कोड समान है, सिवाय इसके कि ऐलिस के पास दो क्रियाएं हैं:

- एक मेटा-पता उत्पन्न करना
- बिल द्वारा प्रकाशित पते के लिए निजी कुंजी प्राप्त करना

## निष्कर्ष {#conclusion}

गुप्त पते रामबाण नहीं हैं; उन्हें [सही ढंग से उपयोग](#go-wrong) किया जाना चाहिए। लेकिन जब सही ढंग से उपयोग किया जाता है, तो वे एक सार्वजनिक ब्लॉकचेन पर गोपनीयता सक्षम कर सकते हैं।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।