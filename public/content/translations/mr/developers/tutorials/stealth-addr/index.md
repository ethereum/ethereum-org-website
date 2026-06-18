---
title: "छुपे पत्ते वापरणे"
description: "छुपे पत्ते वापरकर्त्यांना निनावीपणे मालमत्ता हस्तांतरित करण्याची परवानगी देतात. हा लेख वाचल्यानंतर, तुम्ही हे करू शकाल: छुपे पत्ते काय आहेत आणि ते कसे कार्य करतात हे स्पष्ट करणे, निनावीपणा जपणार्‍या मार्गाने छुपे पत्ते कसे वापरावे हे समजून घेणे आणि छुपे पत्ते वापरणारे वेब-आधारित ॲप्लिकेशन लिहिणे."
author: ओरी पोमेरँट्झ
tags:
  - "छुपा पत्ता"
  - "गोपनीयता"
  - "गूढलेखन"
  - "Rust"
  - "wasm"
skill: intermediate
breadcrumb: "छुपे पत्ते"
published: 2025-11-30
lang: mr
sidebarDepth: 3
---

तुम्ही बिल आहात. ज्या कारणांबद्दल आपण बोलणार नाही, त्यासाठी तुम्हाला "ॲलिस फॉर क्वीन ऑफ द वर्ल्ड" मोहिमेला देणगी द्यायची आहे आणि ॲलिसला हे कळावे अशी तुमची इच्छा आहे की तुम्ही देणगी दिली आहे जेणेकरून ती जिंकल्यास तुम्हाला बक्षीस देईल. दुर्दैवाने, तिचा विजय निश्चित नाही. "कॅरोल फॉर एम्प्रेस ऑफ द सोलर सिस्टीम" नावाची एक प्रतिस्पर्धी मोहीम आहे. जर कॅरोल जिंकली आणि तिला समजले की तुम्ही ॲलिसला देणगी दिली आहे, तर तुम्ही अडचणीत याल. त्यामुळे तुम्ही तुमच्या खात्यातून ॲलिसच्या खात्यात फक्त 200 ETH चे हस्तांतरण करू शकत नाही.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) कडे यावर उपाय आहे. हा ERC निनावी हस्तांतरणासाठी [छुपे पत्ते](https://nerolation.github.io/stealth-utils) कसे वापरायचे हे स्पष्ट करतो.

**चेतावणी**: छुपे पत्ते यामागील गूढलेखन, आम्हाला माहित असल्याप्रमाणे, सुरक्षित आहे. तथापि, संभाव्य साइड-चॅनेल हल्ले होऊ शकतात. हा धोका कमी करण्यासाठी तुम्ही काय करू शकता हे तुम्हाला [खाली](#go-wrong) दिसेल.

## छुपे पत्ते कसे कार्य करतात {#how}

हा लेख छुपे पत्ते दोन प्रकारे स्पष्ट करण्याचा प्रयत्न करेल. पहिला म्हणजे [ते कसे वापरायचे](#how-use). उर्वरित लेख समजून घेण्यासाठी हा भाग पुरेसा आहे. त्यानंतर, [त्यामागील गणिताचे स्पष्टीकरण](#how-math) आहे. जर तुम्हाला गूढलेखन मध्ये स्वारस्य असेल, तर हा भाग देखील वाचा. 

### सोपी आवृत्ती (छुपे पत्ते कसे वापरावे) {#how-use}

ॲलिस दोन खाजगी की तयार करते आणि संबंधित सार्वजनिक की प्रकाशित करते (ज्या एकाच दुप्पट-लांबीच्या मेटा-पत्त्यामध्ये एकत्रित केल्या जाऊ शकतात). बिल देखील एक खाजगी की तयार करतो आणि संबंधित सार्वजनिक की प्रकाशित करतो.

एका पक्षाची सार्वजनिक की आणि दुसऱ्याची खाजगी की वापरून, तुम्ही फक्त ॲलिस आणि बिल यांना माहीत असलेले एक सामायिक रहस्य मिळवू शकता (ते केवळ सार्वजनिक की वरून मिळवता येत नाही). हे सामायिक रहस्य वापरून, बिलला छुपा पत्ता मिळतो आणि तो त्यावर मालमत्ता पाठवू शकतो.

ॲलिसला सामायिक रहस्यावरून पत्ता देखील मिळतो, परंतु तिने प्रकाशित केलेल्या सार्वजनिक की च्या खाजगी की तिला माहीत असल्यामुळे, तिला ती खाजगी की देखील मिळू शकते जी तिला त्या पत्त्यावरून पैसे काढण्याची परवानगी देते.

### गणित (छुपे पत्ते असे का कार्य करतात) {#how-math}

प्रमाणित छुपे पत्ते समान पातळीची सुरक्षा राखून कमी की बिट्ससह चांगली कामगिरी मिळवण्यासाठी [elliptic-curve cryptography (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) वापरतात. परंतु बहुतांश भागासाठी आपण त्याकडे दुर्लक्ष करू शकतो आणि आपण नियमित अंकगणित वापरत आहोत असे मानू शकतो.

एक संख्या आहे जी सर्वांना माहीत आहे, *G*. तुम्ही *G* ने गुणाकार करू शकता. परंतु ECC च्या स्वरूपामुळे, *G* ने भागणे व्यावहारिकदृष्ट्या अशक्य आहे. इथेरियम मध्ये सार्वजनिक की गूढलेखन सामान्यतः ज्या प्रकारे कार्य करते ते म्हणजे तुम्ही व्यवहारांवर स्वाक्षरी करण्यासाठी खाजगी की, *P<sub>priv</sub>*, वापरू शकता जे नंतर सार्वजनिक की, *P<sub>pub</sub> = GP<sub>priv</sub>* द्वारे सत्यापित केले जातात. 

ॲलिस दोन खाजगी की तयार करते, *K<sub>priv</sub>* आणि *V<sub>priv</sub>*. *K<sub>priv</sub>* चा वापर छुप्या पत्त्यावरून पैसे खर्च करण्यासाठी केला जाईल आणि *V<sub>priv</sub>* चा वापर ॲलिसच्या मालकीचे पत्ते पाहण्यासाठी केला जाईल. ॲलिस नंतर सार्वजनिक की प्रकाशित करते: *K<sub>pub</sub> = GK<sub>priv</sub>* आणि *V<sub>pub</sub> = GV<sub>priv</sub>*

बिल एक तिसरी खाजगी की, *R<sub>priv</sub>* तयार करतो आणि मध्यवर्ती नोंदणीमध्ये *R<sub>pub</sub> = GR<sub>priv</sub>* प्रकाशित करतो (बिलने ती ॲलिसला देखील पाठवली असती, परंतु आपण असे गृहीत धरू की कॅरोल ऐकत आहे).

बिल *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* ची गणना करतो, जे ॲलिसला देखील माहीत असेल अशी त्याची अपेक्षा असते (खाली स्पष्ट केले आहे). या मूल्याला *S*, सामायिक रहस्य म्हटले जाते. यामुळे बिलला एक सार्वजनिक की मिळते, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. या सार्वजनिक की वरून, तो एका पत्त्याची गणना करू शकतो आणि त्याला हवे असलेले कोणतेही संसाधन त्यावर पाठवू शकतो. भविष्यात, जर ॲलिस जिंकली, तर संसाधने त्याच्याकडून आली आहेत हे सिद्ध करण्यासाठी बिल तिला *R<sub>priv</sub>* सांगू शकतो.

ॲलिस *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* ची गणना करते. यामुळे तिला तेच सामायिक रहस्य, *S* मिळते. तिला खाजगी की, *K<sub>priv</sub>* माहीत असल्यामुळे, ती *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* ची गणना करू शकते. ही की तिला *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)* मधून मिळणाऱ्या पत्त्यावरील मालमत्तेत प्रवेश करू देते.

ॲलिसला डेव्हच्या वर्ल्ड डॉमिनेशन कॅम्पेन सर्व्हिसेसला उपकंत्राट देण्याची परवानगी देण्यासाठी आमच्याकडे एक वेगळी पाहण्याची की (viewing key) आहे. ॲलिस डेव्हला सार्वजनिक पत्ते कळू देण्यास आणि अधिक पैसे उपलब्ध झाल्यावर तिला कळवण्यास तयार आहे, परंतु त्याने तिच्या मोहिमेचे पैसे खर्च करावेत अशी तिची इच्छा नाही.

पाहण्यासाठी आणि खर्च करण्यासाठी वेगवेगळ्या की वापरल्या जात असल्यामुळे, ॲलिस डेव्हला *V<sub>priv</sub>* देऊ शकते. त्यानंतर डेव्ह *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* ची गणना करू शकतो आणि त्याद्वारे सार्वजनिक की (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*) मिळवू शकतो. परंतु *K<sub>priv</sub>* शिवाय डेव्हला खाजगी की मिळू शकत नाही.

थोडक्यात सांगायचे तर, विविध सहभागींना माहीत असलेली ही मूल्ये आहेत.

| ॲलिस | प्रकाशित | बिल | डेव्ह |
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

## जेव्हा छुपे पत्ते चुकीचे ठरतात {#go-wrong}

*ब्लॉकचेनवर कोणतीही गुपिते नसतात*. छुपे पत्ते तुम्हाला गोपनीयता प्रदान करू शकतात, तरीही ती गोपनीयता ट्रॅफिक विश्लेषणास बळी पडू शकते. एक क्षुल्लक उदाहरण घ्यायचे झाल्यास, कल्पना करा की बिल एका पत्त्यावर निधी देतो आणि *R<sub>pub</sub>* मूल्य प्रकाशित करण्यासाठी त्वरित एक व्यवहार पाठवतो. ॲलिसच्या *V<sub>priv</sub>* शिवाय, हा छुपा पत्ता आहे याची आपण खात्री देऊ शकत नाही, परंतु तसा अंदाज लावता येतो. त्यानंतर, आपण दुसरा व्यवहार पाहतो जो त्या पत्त्यावरून सर्व ETH ॲलिसच्या मोहीम निधी पत्त्यावर हस्तांतरित करतो. आपण ते सिद्ध करू शकणार नाही, परंतु बिलने ॲलिसच्या मोहिमेला देणगी दिली असण्याची शक्यता आहे. कॅरोल नक्कीच असा विचार करेल.

बिलसाठी *R<sub>pub</sub>* चे प्रकाशन छुप्या पत्त्याच्या निधीपासून वेगळे करणे सोपे आहे (ते वेगवेगळ्या वेळी, वेगवेगळ्या पत्त्यांवरून करा). तथापि, ते अपुरे आहे. कॅरोल जो पॅटर्न शोधत आहे तो असा आहे की बिल एका पत्त्यावर निधी देतो आणि नंतर ॲलिसचा मोहीम निधी त्यातून पैसे काढतो. 

यावर एक उपाय म्हणजे ॲलिसच्या मोहिमेने थेट पैसे न काढता, ते तृतीय पक्षाला पैसे देण्यासाठी वापरणे. जर ॲलिसच्या मोहिमेने डेव्हच्या वर्ल्ड डॉमिनेशन कॅम्पेन सर्व्हिसेसला 10 ETH पाठवले, तर कॅरोलला फक्त एवढेच माहीत असते की बिलने डेव्हच्या एका ग्राहकाला देणगी दिली आहे. जर डेव्हकडे पुरेसे ग्राहक असतील, तर कॅरोलला हे कळू शकणार नाही की बिलने तिच्याशी स्पर्धा करणाऱ्या ॲलिसला देणगी दिली आहे, की ॲडम, अल्बर्ट किंवा ॲबिगेलला ज्यांची कॅरोलला पर्वा नाही. ॲलिस पेमेंटसह हॅश केलेले मूल्य समाविष्ट करू शकते आणि नंतर ती तिची देणगी होती हे सिद्ध करण्यासाठी डेव्हला प्रीइमेज प्रदान करू शकते. वैकल्पिकरित्या, वर नमूद केल्याप्रमाणे, जर ॲलिसने डेव्हला तिची *V<sub>priv</sub>* दिली, तर त्याला आधीच माहीत असते की पेमेंट कोणाकडून आले आहे.

या उपायातील मुख्य समस्या ही आहे की जेव्हा त्या गोपनीयतेचा बिलला फायदा होतो तेव्हा ॲलिसने गोपनीयतेची काळजी घेणे आवश्यक असते. ॲलिसला तिची प्रतिष्ठा राखायची असू शकते जेणेकरून बिलचा मित्र बॉब देखील तिला देणगी देईल. परंतु हे देखील शक्य आहे की तिला बिलला उघड करण्यात काहीच अडचण नसेल, कारण मग कॅरोल जिंकल्यास काय होईल याची त्याला भीती वाटेल. बिल शेवटी ॲलिसला आणखी जास्त पाठिंबा देऊ शकतो.

### एकाधिक छुपे स्तर वापरणे {#multi-layer}

बिलची गोपनीयता जपण्यासाठी ॲलिसवर अवलंबून राहण्याऐवजी, बिल ते स्वतः करू शकतो. तो बॉब आणि बेला या काल्पनिक लोकांसाठी एकाधिक मेटा-पत्ते तयार करू शकतो. बिल नंतर बॉबला ETH पाठवतो आणि "बॉब" (जो प्रत्यक्षात बिल आहे) ते बेलाला पाठवतो. "बेला" (ती देखील बिल आहे) ते ॲलिसला पाठवते.

कॅरोल अजूनही ट्रॅफिक विश्लेषण करू शकते आणि बिल-ते-बॉब-ते-बेला-ते-ॲलिस पाइपलाइन पाहू शकते. तथापि, जर "बॉब" आणि "बेला" इतर कारणांसाठी देखील ETH वापरत असतील, तर ॲलिसने छुप्या पत्त्यावरून तिच्या ज्ञात मोहीम पत्त्यावर त्वरित पैसे काढले तरीही, बिलने ॲलिसला काहीही हस्तांतरित केले आहे असे दिसणार नाही.

## छुपा-पत्ता ॲप्लिकेशन लिहिणे {#write-app}

हा लेख [GitHub वर उपलब्ध](https://github.com/qbzzt/251022-stealth-addresses.git) असलेले छुपा-पत्ता ॲप्लिकेशन स्पष्ट करतो. 

### साधने {#tools}

आपण वापरू शकू अशी [एक TypeScript छुपा पत्ता लायब्ररी](https://github.com/ScopeLift/stealth-address-sdk) आहे. तथापि, गूढलेखन ऑपरेशन्स CPU-केंद्रित असू शकतात. मी त्यांना [Rust](https://rust-lang.org/) सारख्या संकलित भाषेत लागू करणे आणि ब्राउझरमध्ये कोड चालवण्यासाठी [WASM](https://webassembly.org/) वापरणे पसंत करतो.

आपण [Vite](https://vite.dev/) आणि [React](https://react.dev/) वापरणार आहोत. ही उद्योग-मानक साधने आहेत; जर तुम्हाला त्यांची माहिती नसेल, तर तुम्ही [हे ट्युटोरियल](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) वापरू शकता. Vite वापरण्यासाठी, आपल्याला Node ची आवश्यकता आहे.

### छुपे पत्ते कृतीत पहा {#in-action}

1. आवश्यक साधने स्थापित करा: [Rust](https://rust-lang.org/tools/install/) आणि [Node](https://nodejs.org/en/download).

2. GitHub रिपॉझिटरी क्लोन करा.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. पूर्वअटी स्थापित करा आणि Rust कोड संकलित करा.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. वेब सर्व्हर सुरू करा.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. [ॲप्लिकेशन](http://localhost:5173/) ब्राउझ करा. या ॲप्लिकेशन पेजवर दोन फ्रेम्स आहेत: एक ॲलिसच्या युजर इंटरफेससाठी आणि दुसरी बिलच्या. या दोन फ्रेम्स एकमेकांशी संवाद साधत नाहीत; त्या केवळ सोयीसाठी एकाच पेजवर आहेत.

6. ॲलिस म्हणून, **Generate a Stealth Meta-Address** वर क्लिक करा. हे नवीन छुपा पत्ता आणि संबंधित खाजगी की प्रदर्शित करेल. छुपा मेटा-पत्ता क्लिपबोर्डवर कॉपी करा.

7. बिल म्हणून, नवीन छुपा मेटा-पत्ता पेस्ट करा आणि **Generate an address** वर क्लिक करा. हे तुम्हाला ॲलिससाठी निधी देण्यासाठी पत्ता देते. 

8. पत्ता आणि बिलची सार्वजनिक की कॉपी करा आणि त्यांना ॲलिसच्या युजर इंटरफेसच्या "Private key for address generated by Bill" क्षेत्रात पेस्ट करा. एकदा ती फील्ड्स भरली की, तुम्हाला त्या पत्त्यावरील मालमत्तेत प्रवेश करण्यासाठी खाजगी की दिसेल.

9. खाजगी की पत्त्याशी संबंधित असल्याची खात्री करण्यासाठी तुम्ही [ऑनलाइन कॅल्क्युलेटर](https://iancoleman.net/ethereum-private-key-to-address/) वापरू शकता.

### प्रोग्राम कसा कार्य करतो {#how-the-program-works}

#### WASM घटक {#wasm}

WASM मध्ये संकलित होणारा सोर्स कोड [Rust](https://rust-lang.org/) मध्ये लिहिला आहे. तुम्ही तो [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) मध्ये पाहू शकता. हा कोड प्रामुख्याने JavaScript कोड आणि [`eth-stealth-addresses` लायब्ररी](https://github.com/kassandraoftroy/eth-stealth-addresses) यांच्यातील एक इंटरफेस आहे.

**`Cargo.toml`**

Rust मधील [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) हे JavaScript मधील [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) च्या समान आहे. यात पॅकेज माहिती, अवलंबित्व घोषणा (dependency declarations) इत्यादी असतात.

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

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) पॅकेजला यादृच्छिक (random) मूल्ये तयार करण्याची आवश्यकता असते. ते केवळ अल्गोरिदमिक मार्गांनी केले जाऊ शकत नाही; त्यासाठी एंट्रॉपीचा स्रोत म्हणून भौतिक प्रक्रियेत प्रवेश आवश्यक आहे. ही व्याख्या निर्दिष्ट करते की आपण ज्या ब्राउझरमध्ये चालवत आहोत त्याला विचारून आपण ती एंट्रॉपी मिळवू.

```toml
console_error_panic_hook = "0.1.7"
```

जेव्हा WASM कोड पॅनिक होतो आणि पुढे चालू शकत नाही तेव्हा [ही लायब्ररी](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) आपल्याला अधिक अर्थपूर्ण त्रुटी संदेश देते.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

WASM कोड तयार करण्यासाठी आवश्यक असलेला आउटपुट प्रकार.

**`lib.rs`**

हा प्रत्यक्ष Rust कोड आहे.

```rust
use wasm_bindgen::prelude::*;
```

Rust मधून WASM पॅकेज तयार करण्यासाठीच्या व्याख्या. त्या [येथे](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html) दस्तऐवजीकरण केलेल्या आहेत.

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

आपल्याला [`eth-stealth-addresses` लायब्ररी](https://github.com/kassandraoftroy/eth-stealth-addresses) मधून आवश्यक असलेली फंक्शन्स.

```rust
use hex::{decode,encode};
```

Rust सामान्यतः मूल्यांसाठी बाइट [ॲरे](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) वापरते. परंतु JavaScript मध्ये, आपण सामान्यतः हेक्साडेसिमल स्ट्रिंग्स वापरतो. [`hex` लायब्ररी](https://docs.rs/hex/latest/hex/) आपल्यासाठी एका सादरीकरणातून दुसऱ्या सादरीकरणात भाषांतर करते.

```rust
#[wasm_bindgen]
```

JavaScript मधून हे फंक्शन कॉल करण्यास सक्षम होण्यासाठी WASM बाइंडिंग्ज तयार करा.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

एकाधिक फील्ड्ससह ऑब्जेक्ट परत करण्याचा सर्वात सोपा मार्ग म्हणजे JSON स्ट्रिंग परत करणे. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) तीन फील्ड्स परत करते:

- मेटा-पत्ता (*K<sub>pub</sub>* आणि *V<sub>pub</sub>*)
- पाहण्याची खाजगी की (*V<sub>priv</sub>*)
- खर्च करण्याची खाजगी की (*K<sub>priv</sub>*)

[ट्यूपल (tuple)](https://doc.rust-lang.org/std/primitive.tuple.html) सिंटॅक्स आपल्याला ती मूल्ये पुन्हा वेगळी करू देतो.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

JSON-एनकोडेड स्ट्रिंग तयार करण्यासाठी [`format!`](https://doc.rust-lang.org/std/fmt/index.html) मॅक्रो वापरा. ॲरेला हेक्स स्ट्रिंग्समध्ये बदलण्यासाठी [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) वापरा.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

हे फंक्शन (JavaScript द्वारे प्रदान केलेल्या) हेक्स स्ट्रिंगला बाइट ॲरेमध्ये बदलते. JavaScript कोडद्वारे प्रदान केलेली मूल्ये पार्स करण्यासाठी आपण याचा वापर करतो. Rust ॲरे आणि वेक्टर्स कसे हाताळते यामुळे हे फंक्शन गुंतागुंतीचे आहे.

`<const N: usize>` एक्स्प्रेशनला [जेनेरिक (generic)](https://doc.rust-lang.org/book/ch10-01-syntax.html) म्हटले जाते. `N` हा एक पॅरामीटर आहे जो परत केलेल्या ॲरेची लांबी नियंत्रित करतो. फंक्शनला प्रत्यक्षात `str_to_array::<n>` म्हटले जाते, जिथे `n` ही ॲरेची लांबी असते.

रिटर्न व्हॅल्यू `Option<[u8; N]>` आहे, ज्याचा अर्थ परत केलेला ॲरे [पर्यायी (optional)](https://doc.rust-lang.org/std/option/) आहे. अयशस्वी होऊ शकणाऱ्या फंक्शन्ससाठी Rust मधील हा एक सामान्य पॅटर्न आहे.

उदाहरणार्थ, जर आपण `str_to_array::10("bad060a7")` कॉल केले, तर फंक्शनने दहा-मूल्यांचा ॲरे परत करणे अपेक्षित आहे, परंतु इनपुट फक्त चार बाइट्स आहे. फंक्शन अयशस्वी होणे आवश्यक आहे, आणि ते `None` परत करून तसे करते. `str_to_array::4("bad060a7")` साठी रिटर्न व्हॅल्यू `Some<[0xba, 0xd0, 0x60, 0xa7]>` असेल.

```rust
    // decode हे Result<Vec<u8>, _> परत करते
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) फंक्शन `Result<Vec<u8>, FromHexError>` परत करते. [`Result`](https://doc.rust-lang.org/std/result/) प्रकारात एकतर यशस्वी परिणाम (`Ok(value)`) किंवा त्रुटी (`Err(error)`) असू शकते.

`.ok()` पद्धत `Result` ला `Option` मध्ये बदलते, ज्याचे मूल्य यशस्वी झाल्यास `Ok()` मूल्य असते किंवा नसल्यास `None` असते. शेवटी, जर `Option` रिक्त असेल तर [प्रश्नचिन्ह ऑपरेटर](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) वर्तमान फंक्शन्स रद्द करतो आणि `None` परत करतो. अन्यथा, तो मूल्य अनरॅप करतो आणि ते परत करतो (या प्रकरणात, `vec` ला मूल्य नियुक्त करण्यासाठी).

त्रुटी हाताळण्याची ही एक विचित्रपणे गुंतागुंतीची पद्धत वाटते, परंतु `Result` आणि `Option` हे सुनिश्चित करतात की सर्व त्रुटी एका किंवा दुसऱ्या मार्गाने हाताळल्या जातात.

```rust
    if vec.len() != N { return None; }
```

जर बाइट्सची संख्या चुकीची असेल, तर ते अपयश आहे आणि आपण `None` परत करतो.

```rust
    // try_into हे vec वापरते आणि [u8; N] बनवण्याचा प्रयत्न करते
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust मध्ये दोन ॲरे प्रकार आहेत. [ॲरे](https://doc.rust-lang.org/std/primitive.array.html) चा आकार निश्चित असतो. [वेक्टर्स](https://doc.rust-lang.org/std/vec/index.html) वाढू आणि कमी होऊ शकतात. `hex::decode` वेक्टर परत करते, परंतु `eth_stealth_addresses` लायब्ररीला ॲरे प्राप्त करायचे असतात. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) मूल्याला दुसऱ्या प्रकारात रूपांतरित करते, उदाहरणार्थ, वेक्टरला ॲरेमध्ये.

```rust
    Some(array)
}
```

फंक्शनच्या शेवटी मूल्य परत करताना Rust ला तुम्ही [`return`](https://doc.rust-lang.org/std/keyword.return.html) कीवर्ड वापरण्याची आवश्यकता नसते.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

या फंक्शनला एक सार्वजनिक मेटा-पत्ता प्राप्त होतो, ज्यामध्ये *V<sub>pub</sub>* आणि *K<sub>pub</sub>* दोन्ही समाविष्ट असतात. हे छुपा पत्ता, प्रकाशित करण्यासाठी सार्वजनिक की (*R<sub>pub</sub>*), आणि एक-बाइट स्कॅन मूल्य परत करते जे कोणते प्रकाशित पत्ते ॲलिसचे असू शकतात हे ओळखण्यास गती देते.

स्कॅन मूल्य हे सामायिक रहस्याचा (*S = GR<sub>priv</sub>V<sub>priv</sub>*) भाग आहे. हे मूल्य ॲलिससाठी उपलब्ध आहे, आणि *f(K<sub>pub</sub>+G\*hash(S))* प्रकाशित पत्त्याच्या समान आहे की नाही हे तपासण्यापेक्षा ते तपासणे खूप जलद आहे.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

आपण लायब्ररीचे [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) वापरतो.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

JSON-एनकोडेड आउटपुट स्ट्रिंग तयार करा.

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

हे फंक्शन पत्त्यावरून पैसे काढण्यासाठी खाजगी की (*R<sub>priv</sub>*) ची गणना करण्यासाठी लायब्ररीचे [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) वापरते. या गणनेसाठी या मूल्यांची आवश्यकता आहे:

- पत्ता (*Address=f(P<sub>pub</sub>)*)
- बिलने तयार केलेली सार्वजनिक की (*R<sub>pub</sub>*)
- पाहण्याची खाजगी की (*V<sub>priv</sub>*)
- खर्च करण्याची खाजगी की (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) निर्दिष्ट करते की जेव्हा WASM कोड सुरू केला जातो तेव्हा फंक्शन कार्यान्वित केले जाते.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

हा कोड निर्दिष्ट करतो की पॅनिक आउटपुट JavaScript कन्सोलवर पाठवले जावे. ते कृतीत पाहण्यासाठी, ॲप्लिकेशन वापरा आणि बिलला एक अवैध मेटा-पत्ता द्या (फक्त एक हेक्साडेसिमल अंक बदला). तुम्हाला JavaScript कन्सोलमध्ये ही त्रुटी दिसेल:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

त्यानंतर स्टॅक ट्रेस असेल. नंतर बिलला वैध मेटा-पत्ता द्या, आणि ॲलिसला एकतर अवैध पत्ता किंवा अवैध सार्वजनिक की द्या. तुम्हाला ही त्रुटी दिसेल:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

पुन्हा, त्यानंतर स्टॅक ट्रेस असेल.

#### युजर इंटरफेस {#ui}

युजर इंटरफेस [React](https://react.dev/) वापरून लिहिला आहे आणि [Vite](https://vite.dev/) द्वारे सर्व्ह केला जातो. तुम्ही [हे ट्युटोरियल](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) वापरून त्यांच्याबद्दल जाणून घेऊ शकता. येथे [Wagmi](https://wagmi.sh/) ची आवश्यकता नाही कारण आपण थेट ब्लॉकचेन किंवा वॉलेटशी संवाद साधत नाही.

युजर इंटरफेसमधील एकमेव स्पष्ट नसलेला भाग म्हणजे WASM कनेक्टिव्हिटी. ती कशी कार्य करते ते येथे दिले आहे.

**`vite.config.js`**

या फाईलमध्ये [Vite कॉन्फिगरेशन](https://vite.dev/config/) आहे.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

आपल्याला दोन Vite प्लगइन्सची आवश्यकता आहे: [react](https://www.npmjs.com/package/@vitejs/plugin-react) आणि [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

ही फाईल ॲप्लिकेशनचा मुख्य घटक आहे. हे एक कंटेनर आहे ज्यामध्ये दोन घटक समाविष्ट आहेत: `Alice` आणि `Bill`, त्या वापरकर्त्यांसाठी युजर इंटरफेस. WASM साठी संबंधित भाग म्हणजे इनिशिएलायझेशन कोड.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

जेव्हा आपण [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) वापरतो, तेव्हा ते आपण येथे वापरत असलेल्या दोन फाईल्स तयार करते: प्रत्यक्ष कोड असलेली wasm फाईल (येथे, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) आणि ती वापरण्यासाठी व्याख्या असलेली JavaScript फाईल (येथे, `src/rust_wasm/pkg/rust_wasm.js`). त्या JavaScript फाईलची डीफॉल्ट एक्सपोर्ट हा असा कोड आहे जो WASM सुरू करण्यासाठी चालवणे आवश्यक आहे.

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

[`useEffect` हूक](https://react.dev/reference/react/useEffect) तुम्हाला असे फंक्शन निर्दिष्ट करू देते जे स्थिती (state) व्हेरिएबल्स बदलल्यावर कार्यान्वित होते. येथे, स्थिती व्हेरिएबल्सची सूची रिक्त आहे (`[]`), त्यामुळे हे फंक्शन पेज लोड झाल्यावर फक्त एकदाच कार्यान्वित होते.

इफेक्ट फंक्शनने त्वरित परत येणे आवश्यक आहे. असिंक्रोनस कोड वापरण्यासाठी, जसे की WASM `init` (ज्याला `.wasm` फाईल लोड करावी लागते आणि त्यामुळे वेळ लागतो) आपण एक अंतर्गत [`async`](https://en.wikipedia.org/wiki/Async/await) फंक्शन परिभाषित करतो आणि ते `await` शिवाय चालवतो.

**`Bill.jsx`**

हा बिलसाठी युजर इंटरफेस आहे. यात एकच कृती आहे, ॲलिसने प्रदान केलेल्या छुप्या मेटा-पत्त्यावर आधारित पत्ता तयार करणे.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

डीफॉल्ट एक्सपोर्ट व्यतिरिक्त, `wasm-pack` द्वारे व्युत्पन्न केलेला JavaScript कोड WASM कोडमधील प्रत्येक फंक्शनसाठी एक फंक्शन एक्सपोर्ट करतो.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

WASM फंक्शन्स कॉल करण्यासाठी, आपण फक्त `wasm-pack` द्वारे तयार केलेल्या JavaScript फाईलने एक्सपोर्ट केलेले फंक्शन कॉल करतो.

**`Alice.jsx`**

`Alice.jsx` मधील कोड समान आहे, फक्त ॲलिसकडे दोन कृती आहेत:

- मेटा-पत्ता तयार करणे
- बिलने प्रकाशित केलेल्या पत्त्यासाठी खाजगी की मिळवणे

## निष्कर्ष {#conclusion}

छुपे पत्ते हा रामबाण उपाय नाही; ते [योग्यरित्या वापरले](#go-wrong) गेले पाहिजेत. परंतु योग्यरित्या वापरल्यास, ते सार्वजनिक ब्लॉकचेनवर गोपनीयता सक्षम करू शकतात.

[माझ्या अधिक कामासाठी येथे पहा](https://cryptodocguy.pro/).