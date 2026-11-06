---
title: "गोपनीयता जपणारा ॲप-विशिष्ट प्लाझ्मा लिहा"
description: "या ट्युटोरियलमध्ये, आम्ही ठेवींसाठी एक निम-गुप्त बँक तयार करतो. बँक हा एक केंद्रीकृत घटक आहे; तिला प्रत्येक वापरकर्त्याची शिल्लक माहीत असते. तथापि, ही माहिती ऑनचेन साठवली जात नाही. त्याऐवजी, बँक स्थितीचा हॅश पोस्ट करते. प्रत्येक वेळी जेव्हा एखादा व्यवहार होतो, तेव्हा बँक नवीन हॅश पोस्ट करते, सोबतच एक शून्य-ज्ञान पुरावा देते की तिच्याकडे एक स्वाक्षरी केलेला व्यवहार आहे जो हॅश स्थितीला नवीन स्थितीत बदलतो. हे ट्युटोरियल वाचल्यानंतर, तुम्हाला केवळ शून्य-ज्ञान पुरावे कसे वापरायचे हेच समजणार नाही, तर ते का वापरायचे आणि ते सुरक्षितपणे कसे करायचे हे देखील समजेल."
author: "ओरी पोमेरँट्झ"
tags: ["झिरो-नॉलेज", "सर्व्हर", "साखळीबाह्य", "गोपनीयता"]
skill: advanced
breadcrumb: "ॲप-विशिष्ट प्लाझ्मा"
lang: mr
published: 2025-10-15
---

## परिचय {#introduction}

[रोलअप्स](/developers/docs/scaling/zk-rollups/) च्या विपरीत, [प्लाझ्मा](/developers/docs/scaling/plasma) अखंडतेसाठी इथरियम मेननेट वापरतात, परंतु उपलब्धतेसाठी नाही. या लेखात, आम्ही एक ॲप्लिकेशन लिहितो जे प्लाझ्मासारखे वागते, ज्यामध्ये इथेरियम अखंडतेची हमी देते (कोणतेही अनधिकृत बदल नाहीत) परंतु उपलब्धतेची नाही (एक केंद्रीकृत घटक बंद पडू शकतो आणि संपूर्ण प्रणाली अक्षम करू शकतो).

आम्ही येथे लिहित असलेले ॲप्लिकेशन एक गोपनीयता जपणारी बँक आहे. वेगवेगळ्या पत्त्यांवर शिल्लक असलेली खाती असतात आणि ते इतर खात्यांमध्ये पैसे (ETH) पाठवू शकतात. बँक स्थितीचे (खाती आणि त्यांची शिल्लक) आणि व्यवहारांचे हॅश पोस्ट करते, परंतु प्रत्यक्ष शिल्लक साखळीबाह्य ठेवते जिथे ते खाजगी राहू शकतात.

## डिझाइन {#design}

ही उत्पादन-सज्ज प्रणाली नाही, तर एक शिकवण्याचे साधन आहे. त्यामुळे, ती अनेक सोप्या गृहितकांसह लिहिली गेली आहे.

- निश्चित खाते पूल. खात्यांची एक विशिष्ट संख्या आहे आणि प्रत्येक खाते पूर्व-निर्धारित पत्त्याशी संबंधित आहे. यामुळे प्रणाली खूप सोपी होते कारण शून्य-ज्ञान पुराव्यांमध्ये बदलत्या आकाराच्या डेटा स्ट्रक्चर्स हाताळणे कठीण असते. उत्पादन-सज्ज प्रणालीसाठी, आम्ही स्थिती हॅश म्हणून [मर्कल रूट](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) वापरू शकतो आणि आवश्यक शिल्लक रकमेसाठी मर्कल पुरावे देऊ शकतो.

- मेमरी स्टोरेज. उत्पादन प्रणालीवर, रीस्टार्ट झाल्यास ते जतन करण्यासाठी आम्हाला सर्व खात्यातील शिल्लक डिस्कवर लिहावी लागते. येथे, माहिती गमावली तरी चालेल.

- केवळ हस्तांतरण. उत्पादन प्रणालीला बँकेत मालमत्ता जमा करण्याचा आणि ती काढण्याचा मार्ग आवश्यक असेल. परंतु येथील उद्देश केवळ संकल्पना स्पष्ट करणे हा आहे, त्यामुळे ही बँक हस्तांतरणापुरती मर्यादित आहे.

### शून्य-ज्ञान पुरावे {#zero-knowledge-proofs}

मूलभूत स्तरावर, एक शून्य-ज्ञान पुरावा हे दर्शवितो की सिद्धकर्त्याला काही डेटा, _Data<sub>private</sub>_ माहीत आहे जेणेकरून काही सार्वजनिक डेटा, _Data<sub>public</sub>_ आणि _Data<sub>private</sub>_ यांच्यात एक संबंध _Relationship_ आहे. पडताळणीकर्त्याला _Relationship_ आणि _Data<sub>public</sub>_ माहीत असते.

गोपनीयता जपण्यासाठी, आम्हाला स्थिती आणि व्यवहार खाजगी असणे आवश्यक आहे. परंतु अखंडता सुनिश्चित करण्यासाठी, आम्हाला स्थितींचा [क्रिप्टोग्राफिक हॅश](https://en.wikipedia.org/wiki/Cryptographic_hash_function) सार्वजनिक असणे आवश्यक आहे. जे लोक व्यवहार सबमिट करतात त्यांना ते व्यवहार खरोखरच झाले आहेत हे सिद्ध करण्यासाठी, आम्हाला व्यवहार हॅश देखील पोस्ट करणे आवश्यक आहे.

बहुतांश प्रकरणांमध्ये, _Data<sub>private</sub>_ हे शून्य-ज्ञान पुरावा प्रोग्रामचे इनपुट असते आणि _Data<sub>public</sub>_ हे आउटपुट असते.

_Data<sub>private</sub>_ मधील ही क्षेत्रे:

- _State<sub>n</sub>_, जुनी स्थिती
- _State<sub>n+1</sub>_, नवीन स्थिती
- _Transaction_, एक व्यवहार जो जुन्या स्थितीवरून नवीन स्थितीत बदलतो. या व्यवहारामध्ये ही क्षेत्रे समाविष्ट असणे आवश्यक आहे:
  - _Destination address_ जो हस्तांतरण प्राप्त करतो
  - _Amount_ जी हस्तांतरित केली जात आहे
  - _Nonce_ हे सुनिश्चित करण्यासाठी की प्रत्येक व्यवहार केवळ एकदाच प्रक्रिया केला जाऊ शकतो.
    स्रोत पत्ता व्यवहारामध्ये असण्याची आवश्यकता नाही, कारण तो स्वाक्षरीवरून मिळवला जाऊ शकतो.
- _Signature_, एक स्वाक्षरी जी व्यवहार करण्यासाठी अधिकृत आहे. आमच्या बाबतीत, व्यवहार करण्यासाठी अधिकृत असलेला एकमेव पत्ता म्हणजे स्रोत पत्ता. आमची झिरो-नॉलेज प्रणाली ज्या प्रकारे कार्य करते त्यामुळे, आम्हाला इथेरियम स्वाक्षरी व्यतिरिक्त खात्याची सार्वजनिक की देखील आवश्यक आहे.

_Data<sub>public</sub>_ मधील ही क्षेत्रे आहेत:

- _Hash(State<sub>n</sub>)_ जुन्या स्थितीचा हॅश
- _Hash(State<sub>n+1</sub>)_ नवीन स्थितीचा हॅश
- _Hash(Transaction)_ त्या व्यवहाराचा हॅश जो स्थितीला _State<sub>n</sub>_ वरून _State<sub>n+1</sub>_ मध्ये बदलतो.

हा संबंध अनेक अटी तपासतो:

- सार्वजनिक हॅश हे खरोखरच खाजगी क्षेत्रांसाठी योग्य हॅश आहेत.
- व्यवहार, जेव्हा जुन्या स्थितीवर लागू केला जातो, तेव्हा त्याचा परिणाम नवीन स्थितीत होतो.
- स्वाक्षरी व्यवहाराच्या स्रोत पत्त्यावरून येते.

क्रिप्टोग्राफिक हॅश फंक्शन्सच्या गुणधर्मांमुळे, अखंडता सुनिश्चित करण्यासाठी या अटी सिद्ध करणे पुरेसे आहे.

### डेटा स्ट्रक्चर्स {#data-structures}

प्राथमिक डेटा स्ट्रक्चर ही सर्व्हरद्वारे धारण केलेली स्थिती आहे. प्रत्येक खात्यासाठी, सर्व्हर खात्यातील शिल्लक आणि [रिप्ले हल्ले](https://en.wikipedia.org/wiki/Replay_attack) टाळण्यासाठी वापरल्या जाणाऱ्या [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) चा मागोवा ठेवतो.

### घटक {#components}

या प्रणालीसाठी दोन घटक आवश्यक आहेत:

- _सर्व्हर_ जो व्यवहार प्राप्त करतो, त्यांच्यावर प्रक्रिया करतो आणि शून्य-ज्ञान पुराव्यांसह चेनवर हॅश पोस्ट करतो.
- एक _स्मार्ट कॉन्ट्रॅक्ट_ जे हॅश साठवते आणि स्थितीतील बदल कायदेशीर आहेत हे सुनिश्चित करण्यासाठी शून्य-ज्ञान पुराव्यांची पडताळणी करते.

### डेटा आणि नियंत्रण प्रवाह {#flows}

एका खात्यातून दुसऱ्या खात्यात हस्तांतरण करण्यासाठी विविध घटक ज्या प्रकारे संवाद साधतात ते हे आहेत.

1. वेब ब्राउझर स्वाक्षरीकर्त्याच्या खात्यातून वेगळ्या खात्यात हस्तांतरण करण्याची विनंती करणारा स्वाक्षरी केलेला व्यवहार सबमिट करतो.

2. सर्व्हर व्यवहार वैध असल्याची पडताळणी करतो:

   - स्वाक्षरीकर्त्याचे बँकेत पुरेसे शिल्लक असलेले खाते आहे.
   - प्राप्तकर्त्याचे बँकेत खाते आहे.

3. सर्व्हर स्वाक्षरीकर्त्याच्या शिल्लकमधून हस्तांतरित केलेली रक्कम वजा करून आणि ती प्राप्तकर्त्याच्या शिल्लकमध्ये जोडून नवीन स्थितीची गणना करतो.

4. सर्व्हर एक शून्य-ज्ञान पुरावा मोजतो की स्थितीतील बदल वैध आहे.

5. सर्व्हर इथेरियमला एक व्यवहार सबमिट करतो ज्यामध्ये हे समाविष्ट असते:

   - नवीन स्थितीचा हॅश
   - व्यवहार हॅश (जेणेकरून व्यवहार पाठवणाऱ्याला कळू शकेल की त्यावर प्रक्रिया झाली आहे)
   - शून्य-ज्ञान पुरावा जो सिद्ध करतो की नवीन स्थितीतील बदल वैध आहे

6. स्मार्ट कॉन्ट्रॅक्ट शून्य-ज्ञान पुराव्याची पडताळणी करते.

7. जर शून्य-ज्ञान पुरावा योग्य ठरला, तर स्मार्ट कॉन्ट्रॅक्ट या क्रिया करते:
   - वर्तमान स्थितीचा हॅश नवीन स्थितीच्या हॅशवर अपडेट करा
   - नवीन स्थितीचा हॅश आणि व्यवहार हॅशसह एक नोंद (log) उत्सर्जित करा

### साधने {#tools}

क्लायंट-साइड कोडसाठी, आम्ही [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), आणि [Wagmi](https://wagmi.sh/) वापरणार आहोत. ही उद्योग-मानक साधने आहेत; जर तुम्हाला त्यांची माहिती नसेल, तर तुम्ही [हे ट्युटोरियल](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) वापरू शकता.

सर्व्हरचा बहुतांश भाग [Node](https://nodejs.org/en) वापरून JavaScript मध्ये लिहिला आहे. झिरो-नॉलेज भाग [Noir](https://noir-lang.org/) मध्ये लिहिला आहे. आम्हाला `1.0.0-beta.10` आवृत्ती आवश्यक आहे, त्यामुळे तुम्ही [सूचनेनुसार Noir इन्स्टॉल केल्यानंतर](https://noir-lang.org/docs/getting_started/quick_start), हे रन करा:

```
noirup -v 1.0.0-beta.10
```

आम्ही वापरत असलेली ब्लॉकचेन `anvil` आहे, जी एक स्थानिक चाचणी ब्लॉकचेन आहे आणि [Foundry](https://getfoundry.sh/introduction/installation) चा भाग आहे.

## अंमलबजावणी {#implementation}

कारण ही एक गुंतागुंतीची प्रणाली आहे, आम्ही तिची टप्प्याटप्प्याने अंमलबजावणी करू.

### टप्पा 1 - मॅन्युअल झिरो-नॉलेज {#stage-1}

पहिल्या टप्प्यासाठी, आम्ही ब्राउझरमध्ये एका व्यवहारावर स्वाक्षरी करू आणि नंतर शून्य-ज्ञान पुराव्याला मॅन्युअली माहिती देऊ. झिरो-नॉलेज कोडला ती माहिती `server/noir/Prover.toml` मध्ये मिळण्याची अपेक्षा असते (ज्याचे दस्तऐवजीकरण [येथे](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) केले आहे).

हे कृतीत पाहण्यासाठी:

1. तुमच्याकडे [Node](https://nodejs.org/en/download) आणि [Noir](https://noir-lang.org/docs/installation) इन्स्टॉल केलेले असल्याची खात्री करा. शक्यतो, त्यांना macOS, Linux, किंवा [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) सारख्या UNIX प्रणालीवर इन्स्टॉल करा.

2. टप्पा 1 चा कोड डाउनलोड करा आणि क्लायंट कोड सर्व्ह करण्यासाठी वेब सर्व्हर सुरू करा.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   तुम्हाला येथे वेब सर्व्हरची आवश्यकता असण्याचे कारण हे आहे की, विशिष्ट प्रकारची फसवणूक टाळण्यासाठी, अनेक वॉलेट्स (जसे की मेटामास्क) थेट डिस्कवरून सर्व्ह केलेल्या फाइल्स स्वीकारत नाहीत.

3. वॉलेटसह ब्राउझर उघडा.

4. वॉलेटमध्ये, नवीन पासफ्रेज प्रविष्ट करा. लक्षात घ्या की यामुळे तुमचा विद्यमान पासफ्रेज हटवला जाईल, त्यामुळे _तुमच्याकडे बॅकअप असल्याची खात्री करा_.

   पासफ्रेज `test test test test test test test test test test test junk` आहे, जो anvil साठी डीफॉल्ट चाचणी पासफ्रेज आहे.

5. [क्लायंट-साइड कोड](http://localhost:5173/) वर ब्राउझ करा.

6. वॉलेटशी कनेक्ट करा आणि तुमचे गंतव्य खाते आणि रक्कम निवडा.

7. **Sign** वर क्लिक करा आणि व्यवहारावर स्वाक्षरी करा.

8. **Prover.toml** शीर्षकाखाली, तुम्हाला मजकूर दिसेल. `server/noir/Prover.toml` ला त्या मजकुराने बदला.

9. शून्य-ज्ञान पुरावा कार्यान्वित करा.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   आउटपुट यासारखे असावे

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. संदेश योग्यरित्या हॅश केला आहे की नाही हे पाहण्यासाठी शेवटच्या दोन मूल्यांची वेब ब्राउझरवर दिसणाऱ्या हॅशशी तुलना करा.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[ही फाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir ला अपेक्षित असलेला माहितीचा फॉरमॅट दर्शवते.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

संदेश मजकूर फॉरमॅटमध्ये आहे, ज्यामुळे वापरकर्त्याला समजणे सोपे होते (जे स्वाक्षरी करताना आवश्यक असते) आणि Noir कोडला पार्स करणे सोपे होते. रक्कम फिनी मध्ये उद्धृत केली आहे जेणेकरून एका बाजूला आंशिक हस्तांतरण शक्य होईल आणि दुसऱ्या बाजूला ते सहज वाचता येईल. शेवटचा क्रमांक [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) आहे.

स्ट्रिंग 100 अक्षरे लांब आहे. शून्य-ज्ञान पुरावे बदलत्या आकाराचा डेटा चांगल्या प्रकारे हाताळत नाहीत, त्यामुळे अनेकदा डेटा पॅड करणे आवश्यक असते.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

हे तीन पॅरामीटर्स निश्चित-आकाराचे बाइट ॲरे आहेत.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

स्ट्रक्चर्सचा ॲरे निर्दिष्ट करण्याचा हा मार्ग आहे. प्रत्येक एंट्रीसाठी, आम्ही पत्ता, शिल्लक (milliETH म्हणजेच [फिनी](https://cryptovalleyjournal.com/glossary/finney/) मध्ये), आणि पुढील नॉन्स मूल्य निर्दिष्ट करतो.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[ही फाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) क्लायंट-साइड प्रक्रियेची अंमलबजावणी करते आणि `server/noir/Prover.toml` फाइल (ज्यामध्ये झिरो-नॉलेज पॅरामीटर्स समाविष्ट आहेत) व्युत्पन्न करते.

येथे अधिक मनोरंजक भागांचे स्पष्टीकरण दिले आहे.

```tsx
export default attrs =>  {
```

हे फंक्शन `Transfer` React घटक तयार करते, जे इतर फाइल्स इंपोर्ट करू शकतात.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

हे खाते पत्ते आहेत, जे `test ... test junk` पासफ्रेजद्वारे तयार केलेले पत्ते आहेत. जर तुम्हाला तुमचे स्वतःचे पत्ते वापरायचे असतील, तर फक्त ही व्याख्या बदला.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

हे [Wagmi हुक्स](https://wagmi.sh/react/api/hooks) आम्हाला [viem](https://viem.sh/) लायब्ररी आणि वॉलेटमध्ये प्रवेश करू देतात.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

हा संदेश आहे, जो स्पेसने पॅड केलेला आहे. प्रत्येक वेळी जेव्हा [`useState`](https://react.dev/reference/react/useState) व्हेरिएबल्सपैकी एक बदलतो, तेव्हा घटक पुन्हा काढला जातो आणि `message` अपडेट केला जातो.

```tsx
  const sign = async () => {
```

जेव्हा वापरकर्ता **Sign** बटणावर क्लिक करतो तेव्हा हे फंक्शन कॉल केले जाते. संदेश स्वयंचलितपणे अपडेट केला जातो, परंतु स्वाक्षरीसाठी वॉलेटमध्ये वापरकर्त्याच्या मंजुरीची आवश्यकता असते आणि जोपर्यंत आवश्यक नसेल तोपर्यंत आम्हाला ती मागायची नाही.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

वॉलेटला [संदेशावर स्वाक्षरी करण्यास](https://viem.sh/docs/accounts/local/signMessage) सांगा. 

```tsx
    const hash = hashMessage(message)
```

संदेश हॅश मिळवा. डीबगिंगसाठी (Noir कोडच्या) ते वापरकर्त्याला प्रदान करणे उपयुक्त ठरते. 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[सार्वजनिक की मिळवा](https://viem.sh/docs/utilities/recoverPublicKey). हे [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) फंक्शनसाठी आवश्यक आहे.

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

स्थिती व्हेरिएबल्स सेट करा. असे केल्याने घटक पुन्हा काढला जातो (`sign` फंक्शन बाहेर पडल्यानंतर) आणि वापरकर्त्याला अपडेट केलेली मूल्ये दर्शवितो.

```tsx
    let proverToml = `
```

`Prover.toml` साठी मजकूर.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem आम्हाला सार्वजनिक की 65-बाइट हेक्साडेसिमल स्ट्रिंग म्हणून प्रदान करते. पहिला बाइट `0x04` आहे, जो एक आवृत्ती मार्कर आहे. यानंतर सार्वजनिक की च्या `x` साठी 32 बाइट्स आणि नंतर सार्वजनिक की च्या `y` साठी 32 बाइट्स असतात.

तथापि, Noir ला ही माहिती दोन-बाइट ॲरे म्हणून मिळण्याची अपेक्षा असते, एक `x` साठी आणि एक `y` साठी. शून्य-ज्ञान पुराव्याचा भाग म्हणून पार्स करण्यापेक्षा ते येथे क्लायंटवर पार्स करणे सोपे आहे.

लक्षात घ्या की सर्वसाधारणपणे झिरो-नॉलेजमध्ये ही एक चांगली पद्धत आहे. शून्य-ज्ञान पुराव्याच्या आतील कोड महाग असतो, त्यामुळे शून्य-ज्ञान पुराव्याच्या बाहेर करता येणारी कोणतीही प्रक्रिया शून्य-ज्ञान पुराव्याच्या बाहेरच केली _पाहिजे_.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

स्वाक्षरी देखील 65-बाइट हेक्साडेसिमल स्ट्रिंग म्हणून प्रदान केली जाते. तथापि, शेवटचा बाइट केवळ सार्वजनिक की मिळवण्यासाठी आवश्यक असतो. सार्वजनिक की आधीच Noir कोडला प्रदान केली जाणार असल्याने, आम्हाला स्वाक्षरीची पडताळणी करण्यासाठी तिची आवश्यकता नाही आणि Noir कोडला तिची आवश्यकता नाही.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

खाती प्रदान करा.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

हा घटकाचा HTML (अधिक अचूकपणे, [JSX](https://react.dev/learn/writing-markup-with-jsx)) फॉरमॅट आहे.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[ही फाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) प्रत्यक्ष झिरो-नॉलेज कोड आहे.

```
use std::hash::pedersen_hash;
```

[पेडरसन हॅश](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) [Noir स्टँडर्ड लायब्ररी](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) सोबत प्रदान केला जातो. शून्य-ज्ञान पुरावे सामान्यतः हे हॅश फंक्शन वापरतात. मानक हॅश फंक्शन्सच्या तुलनेत [अंकगणितीय सर्किट्स](https://rareskills.io/post/arithmetic-circuit) मध्ये याची गणना करणे खूप सोपे आहे.

```
use keccak256::keccak256;
use dep::ecrecover;
```

ही दोन फंक्शन्स बाह्य लायब्ररी आहेत, जी [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) मध्ये परिभाषित केली आहेत. त्यांच्या नावाप्रमाणेच ते तंतोतंत कार्य करतात, एक फंक्शन जे [keccak256 हॅश](https://emn178.github.io/online-tools/keccak_256.html) ची गणना करते आणि एक फंक्शन जे इथेरियम स्वाक्षऱ्यांची पडताळणी करते आणि स्वाक्षरीकर्त्याचा इथेरियम पत्ता मिळवते.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir हे [Rust](https://www.rust-lang.org/) पासून प्रेरित आहे. व्हेरिएबल्स, डीफॉल्टनुसार, स्थिरांक (constants) असतात. अशा प्रकारे आम्ही ग्लोबल कॉन्फिगरेशन स्थिरांक परिभाषित करतो. विशेषतः, `ACCOUNT_NUMBER` ही आम्ही साठवत असलेल्या खात्यांची संख्या आहे.

`u<number>` नावाचे डेटा प्रकार हे तेवढ्या बिट्सचे, अनसाइन्ड (unsigned) असतात. केवळ `u8`, `u16`, `u32`, `u64`, आणि `u128` हे प्रकार समर्थित आहेत.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

हे व्हेरिएबल खात्यांच्या पेडरसन हॅशसाठी वापरले जाते, जसे खाली स्पष्ट केले आहे.

```
global MESSAGE_LENGTH : u32 = 100;
```

वर स्पष्ट केल्याप्रमाणे, संदेशाची लांबी निश्चित आहे. ती येथे निर्दिष्ट केली आहे.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 स्वाक्षऱ्यांसाठी](https://eips.ethereum.org/EIPS/eip-191) 26-बाइट प्रीफिक्स असलेला बफर आवश्यक असतो, त्यानंतर ASCII मध्ये संदेशाची लांबी आणि शेवटी स्वतः संदेश असतो.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

आम्ही खात्याबद्दल साठवत असलेली माहिती. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) ही एक संख्या आहे, जी सामान्यतः 253 बिट्सपर्यंत असते, जी थेट [अंकगणितीय सर्किटमध्ये](https://rareskills.io/post/arithmetic-circuit) वापरली जाऊ शकते जी शून्य-ज्ञान पुराव्याची अंमलबजावणी करते. येथे आम्ही 160-बिट इथेरियम पत्ता साठवण्यासाठी `Field` वापरतो.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

हस्तांतरण व्यवहारासाठी आम्ही साठवत असलेली माहिती.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

एक फंक्शन व्याख्या. पॅरामीटर `Account` माहिती आहे. परिणाम हा `Field` व्हेरिएबल्सचा ॲरे आहे, ज्याची लांबी `FLAT_ACCOUNT_FIELDS` आहे.

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

ॲरेमधील पहिले मूल्य खाते पत्ता आहे. दुसऱ्यामध्ये शिल्लक आणि नॉन्स दोन्ही समाविष्ट आहेत. `.into()` कॉल्स एका संख्येला आवश्यक असलेल्या डेटा प्रकारात बदलतात. `account.nonce` हे `u32` मूल्य आहे, परंतु ते `account.balance << 32` मध्ये जोडण्यासाठी, जे `u128` मूल्य आहे, ते `u128` असणे आवश्यक आहे. तो पहिला `.into()` आहे. दुसरा `u128` परिणामाला `Field` मध्ये रूपांतरित करतो जेणेकरून तो ॲरेमध्ये बसेल.

```
    flat
}
```

Noir मध्ये, फंक्शन्स केवळ शेवटी मूल्य परत करू शकतात (कोणतेही लवकर रिटर्न नाही). रिटर्न मूल्य निर्दिष्ट करण्यासाठी, तुम्ही फंक्शनच्या क्लोजिंग ब्रॅकेटच्या अगदी आधी त्याचे मूल्यांकन करता.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

हे फंक्शन खात्यांच्या ॲरेला `Field` ॲरेमध्ये बदलते, जे पेडरसन हॅशसाठी इनपुट म्हणून वापरले जाऊ शकते.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

अशा प्रकारे तुम्ही म्युटेबल व्हेरिएबल निर्दिष्ट करता, म्हणजेच, जे स्थिरांक _नाही_. Noir मधील व्हेरिएबल्सना नेहमी मूल्य असणे आवश्यक असते, त्यामुळे आम्ही हे व्हेरिएबल सर्व शून्यांवर इनिशियलाइज करतो.

```
    for i in 0..ACCOUNT_NUMBER {
```

हे एक `for` लूप आहे. लक्षात घ्या की सीमा स्थिरांक आहेत. Noir लूप्सच्या सीमा कंपाईल वेळेस ज्ञात असणे आवश्यक आहे. याचे कारण असे की अंकगणितीय सर्किट्स फ्लो कंट्रोलला समर्थन देत नाहीत. `for` लूपवर प्रक्रिया करताना, कंपायलर फक्त त्यातील कोड अनेक वेळा ठेवतो, प्रत्येक इटरेशनसाठी एक.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

शेवटी, आम्ही त्या फंक्शनवर पोहोचलो जे खात्यांच्या ॲरेला हॅश करते.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

हे फंक्शन विशिष्ट पत्त्यासह खाते शोधते. हे फंक्शन मानक कोडमध्ये अत्यंत अकार्यक्षम असेल कारण ते पत्ता सापडल्यानंतरही सर्व खात्यांवरून इटरेट करते.

तथापि, शून्य-ज्ञान पुराव्यांमध्ये, कोणतेही फ्लो कंट्रोल नसते. जर आम्हाला कधीही एखादी अट तपासायची असेल, तर आम्हाला ती प्रत्येक वेळी तपासावी लागते.

`if` स्टेटमेंट्सच्या बाबतीतही असेच घडते. वरील लूपमधील `if` स्टेटमेंट या गणितीय स्टेटमेंट्समध्ये अनुवादित केले जाते.

_condition<sub>result</sub> = accounts[i].address == address_ // जर ते समान असतील तर एक, अन्यथा शून्य

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

जर विधान खोटे असेल तर [`assert`](https://noir-lang.org/docs/language/assert) फंक्शन शून्य-ज्ञान पुरावा क्रॅश करते. या प्रकरणात, जर आम्हाला संबंधित पत्त्यासह खाते सापडले नाही. पत्ता नोंदवण्यासाठी, आम्ही [फॉरमॅट स्ट्रिंग](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) वापरतो.

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

हे फंक्शन हस्तांतरण व्यवहार लागू करते आणि नवीन खात्यांचा ॲरे परत करते.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

आम्ही Noir मधील फॉरमॅट स्ट्रिंगच्या आत स्ट्रक्चर घटकांमध्ये प्रवेश करू शकत नाही, त्यामुळे आम्ही एक वापरण्यायोग्य प्रत तयार करतो.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

या दोन अटी आहेत ज्या व्यवहार अवैध ठरवू शकतात.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

नवीन खात्यांचा ॲरे तयार करा आणि नंतर तो परत करा.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

हे फंक्शन संदेशामधून पत्ता वाचते. 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

पत्ता नेहमी 20 बाइट्स (म्हणजेच 40 हेक्साडेसिमल अंक) लांब असतो आणि अक्षर #7 पासून सुरू होतो.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

संदेशामधून रक्कम आणि नॉन्स वाचा. 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

संदेशामध्ये, पत्त्यानंतरची पहिली संख्या हस्तांतरित करण्यासाठी फिनीची (म्हणजेच ETH चा हजारावा भाग) रक्कम आहे. दुसरी संख्या नॉन्स आहे. त्यांच्यामधील कोणत्याही मजकुराकडे दुर्लक्ष केले जाते.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // आम्हाला ते नुकतेच सापडले
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

[ट्यूपल](https://noir-lang.org/docs/noir/concepts/data_types/tuples) परत करणे हा फंक्शनमधून अनेक मूल्ये परत करण्याचा Noir चा मार्ग आहे.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

हे फंक्शन संदेशाला बाइट्समध्ये रूपांतरित करते, नंतर रकमांना `TransferTxn` मध्ये रूपांतरित करते.

```rust
// Viem च्या hashMessage च्या समतुल्य
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

आम्ही खात्यांसाठी पेडरसन हॅश वापरू शकलो कारण ते केवळ शून्य-ज्ञान पुराव्याच्या आत हॅश केले जातात. तथापि, या कोडमध्ये आम्हाला संदेशाची स्वाक्षरी तपासण्याची आवश्यकता आहे, जी ब्राउझरद्वारे व्युत्पन्न केली जाते. त्यासाठी, आम्हाला [EIP-191](https://eips.ethereum.org/EIPS/eip-191) मधील इथेरियम स्वाक्षरी फॉरमॅटचे अनुसरण करणे आवश्यक आहे. याचा अर्थ आम्हाला मानक प्रीफिक्स, ASCII मध्ये संदेशाची लांबी आणि स्वतः संदेश असलेला एक एकत्रित बफर तयार करणे आवश्यक आहे आणि त्याला हॅश करण्यासाठी इथेरियम मानक keccak256 वापरणे आवश्यक आहे.

```rust
    // ASCII प्रीफिक्स
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

ॲप्लिकेशन वापरकर्त्याला अशा संदेशावर स्वाक्षरी करण्यास सांगते जो व्यवहार म्हणून किंवा इतर काही उद्देशासाठी वापरला जाऊ शकतो अशी प्रकरणे टाळण्यासाठी, EIP-191 निर्दिष्ट करते की सर्व स्वाक्षरी केलेले संदेश 0x19 अक्षराने (वैध ASCII अक्षर नाही) सुरू होतात आणि त्यानंतर `Ethereum Signed Message:` आणि एक नवीन ओळ असते.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

999 पर्यंतच्या संदेशाच्या लांबी हाताळा आणि जर ती जास्त असेल तर अयशस्वी व्हा. संदेशाची लांबी स्थिर असली तरीही मी हा कोड जोडला आहे, कारण यामुळे तो बदलणे सोपे होते. उत्पादन प्रणालीवर, चांगल्या कामगिरीसाठी तुम्ही कदाचित असे गृहीत धराल की `MESSAGE_LENGTH` बदलत नाही.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

इथेरियम मानक `keccak256` फंक्शन वापरा.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // पत्ता, हॅश चे पहिले 16 बाइट्स, हॅश चे शेवटचे 16 बाइट्स        
{
```

हे फंक्शन स्वाक्षरीची पडताळणी करते, ज्यासाठी संदेश हॅश आवश्यक असतो. त्यानंतर ते आम्हाला स्वाक्षरी केलेला पत्ता आणि संदेश हॅश प्रदान करते. संदेश हॅश दोन `Field` मूल्यांमध्ये पुरवला जातो कारण ते बाइट ॲरेपेक्षा उर्वरित प्रोग्राममध्ये वापरण्यास सोपे असतात.

आम्हाला दोन `Field` मूल्ये वापरण्याची आवश्यकता आहे कारण फील्ड गणना मोठ्या संख्येच्या [मॉड्युलो](https://en.wikipedia.org/wiki/Modulo) केली जाते, परंतु ती संख्या सामान्यतः 256 बिट्सपेक्षा कमी असते (अन्यथा EVM मध्ये त्या गणना करणे कठीण होईल).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` आणि `hash2` म्युटेबल व्हेरिएबल्स म्हणून निर्दिष्ट करा आणि त्यांच्यामध्ये बाइट बाय बाइट हॅश लिहा.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
हे [Solidity च्या `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) सारखेच आहे, ज्यामध्ये दोन महत्त्वाचे फरक आहेत:

- जर स्वाक्षरी वैध नसेल, तर कॉल `assert` मध्ये अयशस्वी होतो आणि प्रोग्राम रद्द केला जातो.
- सार्वजनिक की स्वाक्षरी आणि हॅशवरून मिळवता येत असली तरी, ही प्रक्रिया बाह्यरित्या केली जाऊ शकते आणि त्यामुळे, शून्य-ज्ञान पुराव्याच्या आत करणे योग्य नाही. जर कोणी येथे आपली फसवणूक करण्याचा प्रयत्न केला, तर स्वाक्षरी पडताळणी अयशस्वी होईल.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // जुन्या खाते अ‍ॅरेचा हॅश
        Field,  // नवीन खाते अ‍ॅरेचा हॅश
        Field,  // संदेश हॅश चे पहिले 16 बाइट्स
        Field,  // संदेश हॅश चे शेवटचे 16 बाइट्स
    )
```

शेवटी, आम्ही `main` फंक्शनवर पोहोचतो. आम्हाला हे सिद्ध करणे आवश्यक आहे की आमच्याकडे एक व्यवहार आहे जो खात्यांचा हॅश जुन्या मूल्यावरून नवीन मूल्यामध्ये वैधपणे बदलतो. आम्हाला हे देखील सिद्ध करणे आवश्यक आहे की त्यात हा विशिष्ट व्यवहार हॅश आहे जेणेकरून ज्या व्यक्तीने तो पाठवला आहे त्याला कळेल की त्यांच्या व्यवहारावर प्रक्रिया झाली आहे.

```rust
{
    let mut txn = readTransferTxn(message);
```

आम्हाला `txn` म्युटेबल असणे आवश्यक आहे कारण आम्ही संदेशामधून प्रेषक पत्ता वाचत नाही, आम्ही तो स्वाक्षरीवरून वाचतो. 

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### टप्पा 2 - सर्व्हर जोडणे {#stage-2}

दुसऱ्या टप्प्यात, आम्ही एक सर्व्हर जोडतो जो ब्राउझरवरून हस्तांतरण व्यवहार प्राप्त करतो आणि त्यांची अंमलबजावणी करतो.

हे कृतीत पाहण्यासाठी:

1. जर Vite चालू असेल तर ते थांबवा.

2. सर्व्हर समाविष्ट असलेली शाखा डाउनलोड करा आणि तुमच्याकडे सर्व आवश्यक मॉड्यूल्स असल्याची खात्री करा.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir कोड कंपाईल करण्याची आवश्यकता नाही, तो तुम्ही टप्पा 1 साठी वापरलेल्या कोडसारखाच आहे.

3. सर्व्हर सुरू करा.

   ```sh
   npm run start
   ```

4. वेगळ्या कमांड-लाइन विंडोमध्ये, ब्राउझर कोड सर्व्ह करण्यासाठी Vite रन करा.

   ```sh
   cd client
   npm run dev
   ```

5. [http://localhost:5173](http://localhost:5173) वर क्लायंट कोड ब्राउझ करा

6. तुम्ही व्यवहार जारी करण्यापूर्वी, तुम्हाला नॉन्स, तसेच तुम्ही पाठवू शकणारी रक्कम माहीत असणे आवश्यक आहे. ही माहिती मिळवण्यासाठी, **Update account data** वर क्लिक करा आणि संदेशावर स्वाक्षरी करा.

   आमच्यासमोर येथे एक पेच आहे. एका बाजूला, आम्हाला अशा संदेशावर स्वाक्षरी करायची नाही जो पुन्हा वापरला जाऊ शकतो ([रिप्ले हल्ला](https://en.wikipedia.org/wiki/Replay_attack)), म्हणूनच आम्हाला प्रथम नॉन्स हवा आहे. तथापि, आमच्याकडे अद्याप नॉन्स नाही. यावर उपाय म्हणजे असा नॉन्स निवडणे जो केवळ एकदाच वापरला जाऊ शकतो आणि जो आमच्याकडे आधीपासूनच दोन्ही बाजूंना आहे, जसे की वर्तमान वेळ.

   या उपायातील समस्या अशी आहे की वेळ पूर्णपणे समक्रमित (synchronized) नसू शकते. त्यामुळे त्याऐवजी, आम्ही दर मिनिटाला बदलणाऱ्या मूल्यावर स्वाक्षरी करतो. याचा अर्थ असा की रिप्ले हल्ल्यांसाठी आमची असुरक्षिततेची विंडो जास्तीत जास्त एक मिनिटाची आहे. उत्पादनात स्वाक्षरी केलेली विनंती TLS द्वारे संरक्षित केली जाईल आणि बोगद्याची दुसरी बाजू---सर्व्हर---आधीच शिल्लक आणि नॉन्स उघड करू शकते (कार्य करण्यासाठी त्याला ते माहीत असणे आवश्यक आहे) हे लक्षात घेता, हा एक स्वीकार्य धोका आहे.

7. एकदा ब्राउझरला शिल्लक आणि नॉन्स परत मिळाल्यावर, तो हस्तांतरण फॉर्म दर्शवितो. गंतव्य पत्ता आणि रक्कम निवडा आणि **Transfer** वर क्लिक करा. या विनंतीवर स्वाक्षरी करा.

8. हस्तांतरण पाहण्यासाठी, एकतर **Update account data** करा किंवा तुम्ही जिथे सर्व्हर चालवता त्या विंडोमध्ये पहा. प्रत्येक वेळी स्थिती बदलल्यावर सर्व्हर त्याची नोंद (log) ठेवतो.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[या फाइलमध्ये](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) सर्व्हर प्रक्रिया समाविष्ट आहे आणि ती [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) वरील Noir कोडशी संवाद साधते. येथे मनोरंजक भागांचे स्पष्टीकरण दिले आहे.

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) लायब्ररी JavaScript कोड आणि Noir कोड यांच्यात इंटरफेस करते.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

अंकगणितीय सर्किट लोड करा---आम्ही मागील टप्प्यात तयार केलेला कंपाईल केलेला Noir प्रोग्राम---आणि तो कार्यान्वित करण्याची तयारी करा.

```js
// आम्ही फक्त स्वाक्षरी केलेल्या विनंतीच्या बदल्यात खाते माहिती प्रदान करतो
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

खात्याची माहिती प्रदान करण्यासाठी, आम्हाला केवळ स्वाक्षरीची आवश्यकता आहे. याचे कारण असे की संदेश काय असणार आहे हे आम्हाला आधीच माहीत आहे आणि त्यामुळे संदेश हॅश देखील माहीत आहे.

```js
const processMessage = async (message, signature) => {
```

संदेशावर प्रक्रिया करा आणि तो एन्कोड करत असलेला व्यवहार कार्यान्वित करा.

```js
    // सार्वजनिक की मिळवा
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

आता आम्ही सर्व्हरवर JavaScript चालवत असल्याने, आम्ही क्लायंटऐवजी तिथे सार्वजनिक की मिळवू शकतो.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` Noir प्रोग्राम चालवतो. पॅरामीटर्स [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) मध्ये प्रदान केलेल्या पॅरामीटर्सच्या समतुल्य आहेत. लक्षात घ्या की लांब मूल्ये हेक्साडेसिमल स्ट्रिंगचा ॲरे (`["0x60", "0xA7"]`) म्हणून प्रदान केली जातात, Viem ज्या प्रकारे करते तसे एकल हेक्साडेसिमल मूल्य (`0x60A7`) म्हणून नाही.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

जर एखादी त्रुटी असेल, तर ती पकडा आणि नंतर क्लायंटला एक सोपी आवृत्ती पाठवा.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

व्यवहार लागू करा. आम्ही ते आधीच Noir कोडमध्ये केले आहे, परंतु तिथून परिणाम काढण्यापेक्षा ते येथे पुन्हा करणे सोपे आहे.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

प्रारंभिक `Accounts` स्ट्रक्चर.

### टप्पा 3 - इथेरियम स्मार्ट कॉन्ट्रॅक्ट्स {#stage-3}

1. सर्व्हर आणि क्लायंट प्रक्रिया थांबवा.

2. स्मार्ट कॉन्ट्रॅक्ट्स असलेली शाखा डाउनलोड करा आणि तुमच्याकडे सर्व आवश्यक मॉड्यूल्स असल्याची खात्री करा.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. वेगळ्या कमांड-लाइन विंडोमध्ये `anvil` रन करा.

4. पडताळणी की आणि सॉलिडिटी पडताळणीकर्ता व्युत्पन्न करा, नंतर पडताळणीकर्ता कोड Solidity प्रोजेक्टमध्ये कॉपी करा.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. स्मार्ट कॉन्ट्रॅक्ट्सवर जा आणि `anvil` ब्लॉकचेन वापरण्यासाठी पर्यावरण व्हेरिएबल्स सेट करा.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol` प्रस्थापित करा आणि पत्ता पर्यावरण व्हेरिएबलमध्ये साठवा.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` कॉन्ट्रॅक्ट प्रस्थापित करा.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` मूल्य हे `Accounts` च्या प्रारंभिक स्थितीचा पेडरसन हॅश आहे. जर तुम्ही ही प्रारंभिक स्थिती `server/index.mjs` मध्ये बदलली, तर तुम्ही शून्य-ज्ञान पुराव्याद्वारे नोंदवलेला प्रारंभिक हॅश पाहण्यासाठी व्यवहार चालवू शकता.

8. सर्व्हर रन करा.

   ```sh
   cd ../server
   npm run start
   ```

9. वेगळ्या कमांड-लाइन विंडोमध्ये क्लायंट रन करा.

   ```sh
   cd client
   npm run dev
   ```

10. काही व्यवहार रन करा.

11. ऑनचेन स्थिती बदलली आहे याची पडताळणी करण्यासाठी, सर्व्हर प्रक्रिया रीस्टार्ट करा. पहा की `ZkBank` आता व्यवहार स्वीकारत नाही, कारण व्यवहारांमधील मूळ हॅश मूल्य ऑनचेन साठवलेल्या हॅश मूल्यापेक्षा वेगळे आहे.

    हा अपेक्षित त्रुटीचा प्रकार आहे.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

या फाइलमधील बदल प्रामुख्याने प्रत्यक्ष पुरावा तयार करणे आणि तो ऑनचेन सबमिट करणे याच्याशी संबंधित आहेत.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

ऑनचेन पाठवण्यासाठी प्रत्यक्ष पुरावा तयार करण्यासाठी आम्हाला [Barretenberg पॅकेज](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) वापरण्याची आवश्यकता आहे. आम्ही हे पॅकेज एकतर कमांड-लाइन इंटरफेस (`bb`) चालवून किंवा [JavaScript लायब्ररी, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) वापरून वापरू शकतो. JavaScript लायब्ररी नेटिव्हली कोड चालवण्यापेक्षा खूपच संथ आहे, त्यामुळे आम्ही कमांड-लाइन वापरण्यासाठी येथे [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) वापरतो.

लक्षात घ्या की जर तुम्ही `bb.js` वापरण्याचे ठरवले, तर तुम्हाला अशी आवृत्ती वापरण्याची आवश्यकता आहे जी तुम्ही वापरत असलेल्या Noir च्या आवृत्तीशी सुसंगत असेल. हे लिहिताना, वर्तमान Noir आवृत्ती (1.0.0-beta.11) `bb.js` आवृत्ती 0.87 वापरते.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

येथील पत्ता तो आहे जो तुम्हाला मिळतो जेव्हा तुम्ही स्वच्छ `anvil` ने सुरुवात करता आणि वरील निर्देशांचे पालन करता.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

ही खाजगी की `anvil` मधील डीफॉल्ट प्री-फंडेड खात्यांपैकी एक आहे. 

```js
const generateProof = async (witness, fileID) => {
```

`bb` एक्झिक्युटेबल वापरून पुरावा व्युत्पन्न करा.

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

साक्ष एका फाइलमध्ये लिहा.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

प्रत्यक्षात पुरावा तयार करा. ही पायरी सार्वजनिक व्हेरिएबल्ससह एक फाइल देखील तयार करते, परंतु आम्हाला त्याची आवश्यकता नाही. आम्हाला ते व्हेरिएबल्स आधीच `noir.execute` कडून मिळाले आहेत.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

पुरावा हा `Field` मूल्यांचा JSON ॲरे आहे, ज्यापैकी प्रत्येक हेक्साडेसिमल मूल्य म्हणून दर्शविला जातो. तथापि, आम्हाला तो व्यवहारामध्ये एकल `bytes` मूल्य म्हणून पाठवणे आवश्यक आहे, जे Viem एका मोठ्या हेक्साडेसिमल स्ट्रिंगद्वारे दर्शविते. येथे आम्ही सर्व मूल्ये जोडून, सर्व `0x` काढून टाकून आणि नंतर शेवटी एक जोडून फॉरमॅट बदलतो.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

क्लीनअप करा आणि पुरावा परत करा.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

सार्वजनिक फील्ड्स 32-बाइट मूल्यांचा ॲरे असणे आवश्यक आहे. तथापि, आम्हाला व्यवहार हॅश दोन `Field` मूल्यांमध्ये विभागण्याची आवश्यकता असल्याने, तो 16-बाइट मूल्य म्हणून दिसतो. येथे आम्ही शून्य जोडतो जेणेकरून Viem ला समजेल की ते प्रत्यक्षात 32 बाइट्स आहे.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

प्रत्येक पत्ता प्रत्येक नॉन्स केवळ एकदाच वापरतो जेणेकरून आम्ही साक्ष फाइल आणि आउटपुट डिरेक्टरीसाठी एक अद्वितीय ओळखकर्ता म्हणून `fromAddress` आणि `nonce` चे संयोजन वापरू शकू.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

चेनवर व्यवहार पाठवा.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

हा ऑनचेन कोड आहे जो व्यवहार प्राप्त करतो.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

ऑनचेन कोडला दोन व्हेरिएबल्सचा मागोवा ठेवण्याची आवश्यकता आहे: पडताळणीकर्ता (एक वेगळे कॉन्ट्रॅक्ट जे `nargo` द्वारे तयार केले जाते) आणि वर्तमान स्थिती हॅश.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

प्रत्येक वेळी स्थिती बदलल्यावर, आम्ही एक `TransactionProcessed` घटना उत्सर्जित करतो.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

हे फंक्शन व्यवहारांवर प्रक्रिया करते. ते पुरावा (`bytes` म्हणून) आणि सार्वजनिक इनपुट्स (`bytes32` ॲरे म्हणून) मिळवते, ज्या फॉरमॅटमध्ये पडताळणीकर्त्याला आवश्यक असते (ऑनचेन प्रक्रिया आणि त्यामुळे गॅस खर्च कमी करण्यासाठी).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

शून्य-ज्ञान पुरावा असा असणे आवश्यक आहे की व्यवहार आमच्या वर्तमान हॅशवरून नवीन हॅशमध्ये बदलतो.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

शून्य-ज्ञान पुराव्याची पडताळणी करण्यासाठी पडताळणीकर्ता कॉन्ट्रॅक्टला कॉल करा. जर शून्य-ज्ञान पुरावा चुकीचा असेल तर ही पायरी व्यवहार पूर्ववत करते.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

जर सर्वकाही योग्य असेल, तर स्थिती हॅश नवीन मूल्यावर अपडेट करा आणि एक `TransactionProcessed` घटना उत्सर्जित करा.

## केंद्रीकृत घटकाद्वारे गैरवापर {#abuses}

माहिती सुरक्षेमध्ये तीन गुणधर्म असतात:

- _गोपनीयता_, वापरकर्ते अशी माहिती वाचू शकत नाहीत जी वाचण्यासाठी ते अधिकृत नाहीत.
- _अखंडता_, अधिकृत वापरकर्त्यांद्वारे अधिकृत मार्गाशिवाय माहिती बदलली जाऊ शकत नाही.
- _उपलब्धता_, अधिकृत वापरकर्ते प्रणाली वापरू शकतात.

या प्रणालीवर, शून्य-ज्ञान पुराव्यांद्वारे अखंडता प्रदान केली जाते. उपलब्धतेची हमी देणे खूप कठीण आहे आणि गोपनीयता अशक्य आहे, कारण बँकेला प्रत्येक खात्याची शिल्लक आणि सर्व व्यवहार माहीत असणे आवश्यक आहे. ज्या घटकाकडे माहिती आहे त्याला ती माहिती सामायिक करण्यापासून रोखण्याचा कोणताही मार्ग नाही.

[स्टेल्थ पत्ते](https://vitalik.eth.limo/general/2023/01/20/stealth.html) वापरून खरोखरच गोपनीय बँक तयार करणे शक्य असू शकते, परंतु ते या लेखाच्या व्याप्तीच्या बाहेर आहे.

### खोटी माहिती {#false-info}

सर्व्हर अखंडतेचे उल्लंघन करू शकतो असा एक मार्ग म्हणजे जेव्हा [डेटाची विनंती केली जाते](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) तेव्हा खोटी माहिती प्रदान करणे.

हे सोडवण्यासाठी, आम्ही दुसरा Noir प्रोग्राम लिहू शकतो जो खाती खाजगी इनपुट म्हणून प्राप्त करतो आणि ज्या पत्त्यासाठी माहितीची विनंती केली आहे तो सार्वजनिक इनपुट म्हणून प्राप्त करतो. आउटपुट त्या पत्त्याची शिल्लक आणि नॉन्स आणि खात्यांचा हॅश आहे.

अर्थात, हा पुरावा ऑनचेन पडताळला जाऊ शकत नाही, कारण आम्हाला नॉन्स आणि शिल्लक ऑनचेन पोस्ट करायचे नाहीत. तथापि, ब्राउझरमध्ये चालणाऱ्या क्लायंट कोडद्वारे त्याची पडताळणी केली जाऊ शकते.

### सक्तीचे व्यवहार {#forced-txns}

L2s वर उपलब्धता सुनिश्चित करण्यासाठी आणि सेन्सॉरशिप टाळण्यासाठी नेहमीची यंत्रणा म्हणजे [सक्तीचे व्यवहार](https://docs.optimism.io/stack/transactions/forced-transaction). परंतु सक्तीचे व्यवहार शून्य-ज्ञान पुराव्यांशी जोडले जात नाहीत. सर्व्हर हा एकमेव घटक आहे जो व्यवहारांची पडताळणी करू शकतो.

आम्ही सक्तीचे व्यवहार स्वीकारण्यासाठी `smart-contracts/src/ZkBank.sol` मध्ये बदल करू शकतो आणि सर्व्हरला त्यांच्यावर प्रक्रिया होईपर्यंत स्थिती बदलण्यापासून रोखू शकतो. तथापि, यामुळे आपण एका साध्या डिनायल-ऑफ-सर्व्हिस हल्ल्याला बळी पडू शकतो. जर एखादा सक्तीचा व्यवहार अवैध असेल आणि त्यामुळे त्यावर प्रक्रिया करणे अशक्य असेल तर काय?

यावर उपाय म्हणजे सक्तीचा व्यवहार अवैध असल्याचा शून्य-ज्ञान पुरावा असणे. हे सर्व्हरला तीन पर्याय देते:

- सक्तीच्या व्यवहारावर प्रक्रिया करा, त्यावर प्रक्रिया झाली असल्याचा शून्य-ज्ञान पुरावा आणि नवीन स्थिती हॅश प्रदान करा.
- सक्तीचा व्यवहार नाकारा आणि कॉन्ट्रॅक्टला शून्य-ज्ञान पुरावा द्या की व्यवहार अवैध आहे (अज्ञात पत्ता, चुकीचा नॉन्स किंवा अपुरी शिल्लक).
- सक्तीच्या व्यवहाराकडे दुर्लक्ष करा. सर्व्हरला प्रत्यक्षात व्यवहारावर प्रक्रिया करण्यास भाग पाडण्याचा कोणताही मार्ग नाही, परंतु याचा अर्थ संपूर्ण प्रणाली अनुपलब्ध आहे.

#### उपलब्धता बाँड्स {#avail-bonds}

वास्तविक जीवनातील अंमलबजावणीमध्ये, सर्व्हर चालू ठेवण्यासाठी कदाचित काही प्रकारचा नफ्याचा हेतू असेल. आम्ही सर्व्हरला एक उपलब्धता बाँड पोस्ट करायला लावून हे प्रोत्साहन मजबूत करू शकतो जो कोणीही जाळू शकतो जर सक्तीच्या व्यवहारावर ठराविक कालावधीत प्रक्रिया झाली नाही.

### खराब Noir कोड {#bad-noir-code}

सामान्यतः, लोकांना स्मार्ट कॉन्ट्रॅक्टवर विश्वास ठेवण्यासाठी आम्ही सोर्स कोड [ब्लॉक एक्सप्लोरर](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) वर अपलोड करतो. तथापि, शून्य-ज्ञान पुराव्यांच्या बाबतीत, ते अपुरे आहे.

`Verifier.sol` मध्ये पडताळणी की असते, जी Noir प्रोग्रामचे एक फंक्शन आहे. तथापि, ती की आम्हाला Noir प्रोग्राम काय होता हे सांगत नाही. खरोखरच एक विश्वासार्ह उपाय मिळवण्यासाठी, तुम्हाला Noir प्रोग्राम (आणि तो तयार करणारी आवृत्ती) अपलोड करणे आवश्यक आहे. अन्यथा, शून्य-ज्ञान पुरावे वेगळा प्रोग्राम दर्शवू शकतात, ज्यामध्ये बॅक डोअर (back door) असू शकतो.

जोपर्यंत ब्लॉक एक्सप्लोरर्स आम्हाला Noir प्रोग्राम्स अपलोड आणि पडताळणी करण्याची परवानगी देत नाहीत, तोपर्यंत तुम्ही ते स्वतः केले पाहिजे (शक्यतो [IPFS](/developers/tutorials/ipfs-decentralized-ui/) वर). त्यानंतर प्रगत वापरकर्ते सोर्स कोड डाउनलोड करू शकतील, तो स्वतः कंपाईल करू शकतील, `Verifier.sol` तयार करू शकतील आणि तो ऑनचेन असलेल्या कोडसारखाच आहे याची पडताळणी करू शकतील.

## निष्कर्ष {#conclusion}

प्लाझ्मा-प्रकारच्या ॲप्लिकेशन्सना माहिती साठवणूक म्हणून केंद्रीकृत घटकाची आवश्यकता असते. यामुळे संभाव्य असुरक्षा निर्माण होतात परंतु, त्या बदल्यात, आम्हाला अशा प्रकारे गोपनीयता जपण्याची परवानगी मिळते जी स्वतः ब्लॉकचेनवर उपलब्ध नाही. शून्य-ज्ञान पुराव्यांसह आम्ही अखंडता सुनिश्चित करू शकतो आणि जो कोणी केंद्रीकृत घटक चालवत आहे त्याच्यासाठी उपलब्धता राखणे आर्थिकदृष्ट्या फायदेशीर बनवू शकतो.

[माझ्या अधिक कामासाठी येथे पहा](https://cryptodocguy.pro/).

## कृतज्ञता {#acknowledgements}

- जोश क्राइट्स यांनी या लेखाचा मसुदा वाचला आणि मला एका कठीण Noir समस्येमध्ये मदत केली.

उर्वरित कोणत्याही चुकांसाठी मी जबाबदार आहे.
