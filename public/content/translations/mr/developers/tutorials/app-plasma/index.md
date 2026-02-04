---
title: गोपनीयतेचे संरक्षण करणारा ॲप-विशिष्ट प्लाझ्मा लिहा
description: या ट्युटोरिअलमध्ये, आम्ही ठेवींसाठी एक अर्ध-गुप्त बँक तयार करतो. बँक एक केंद्रीकृत घटक आहे; तिला प्रत्येक वापरकर्त्याची शिल्लक माहीत असते. तथापि, ही माहिती ऑनचेन साठवली जात नाही. त्याऐवजी, बँक स्टेटचा हॅश पोस्ट करते. प्रत्येक वेळी व्यवहार होतो तेव्हा, बँक नवीन हॅश पोस्ट करते, यासोबतच एक शून्य-ज्ञान पुरावा देखील देते की तिच्याकडे एक स्वाक्षरी केलेला व्यवहार आहे जो हॅश स्टेटला नवीन स्टेटमध्ये बदलतो. हे ट्युटोरिअल वाचल्यानंतर, तुम्हाला शून्य-ज्ञान पुरावे कसे वापरायचे हे तर समजेलच, पण ते का वापरायचे आणि सुरक्षितपणे कसे वापरायचे हे देखील समजेल.
author: ओरी पोमेरँट्झ
tags: [ "शून्य-ज्ञान", "सर्व्हर", "ऑफचेन", "गोपनीयता" ]
skill: advanced
lang: mr
published: 2025-10-15
---

## प्रस्तावना {#introduction}

[रोलअप्स](/developers/docs/scaling/zk-rollups/) च्या तुलनेत, [प्लाझ्मा](/developers/docs/scaling/plasma) अखंडतेसाठी Ethereum मेननेट वापरतात, परंतु उपलब्धतेसाठी नाही. या लेखात, आम्ही एक ॲप्लिकेशन लिहितो जे प्लाझ्मासारखे वागते, ज्यात Ethereum अखंडतेची (अनधिकृत बदल नाहीत) हमी देतो परंतु उपलब्धतेची नाही (एक केंद्रीकृत घटक बंद होऊ शकतो आणि संपूर्ण प्रणाली अक्षम करू शकतो).

आम्ही येथे जे ॲप्लिकेशन लिहित आहोत ते एक गोपनीयता-संरक्षक बँक आहे. वेगवेगळ्या ॲड्रेसवर शिल्लक असलेली खाती आहेत, आणि ते इतर खात्यांमध्ये पैसे (ETH) पाठवू शकतात. बँक स्टेट (खाती आणि त्यांची शिल्लक) आणि व्यवहारांचे हॅश पोस्ट करते, परंतु वास्तविक शिल्लक ऑफचेन ठेवते जिथे ते खाजगी राहू शकतात.

## डिझाइन {#design}

ही प्रोडक्शन-रेडी प्रणाली नाही, तर एक शिकवण्याचे साधन आहे. त्यामुळे, ते अनेक सरलीकरण गृहितकांसह लिहिलेले आहे.

- निश्चित खाते पूल. खात्यांची एक विशिष्ट संख्या आहे, आणि प्रत्येक खाते एका पूर्वनिश्चित ॲड्रेसचे आहे. यामुळे एक अधिक सोपी प्रणाली तयार होते कारण शून्य-ज्ञान पुराव्यांमध्ये व्हेरिएबल-आकाराच्या डेटा स्ट्रक्चर्स हाताळणे कठीण आहे. प्रोडक्शन-रेडी प्रणालीसाठी, आपण [मर्कल रूट](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) स्टेट हॅश म्हणून वापरू शकतो आणि आवश्यक शिलकेसाठी मर्कल पुरावे देऊ शकतो.

- मेमरी स्टोरेज. प्रोडक्शन प्रणालीवर, रीस्टार्ट झाल्यास सर्व खात्यांमधील शिल्लक जपून ठेवण्यासाठी आम्हाला त्या डिस्कवर लिहिण्याची आवश्यकता आहे. येथे, माहिती सहज गमावली तरी चालेल.

- फक्त ट्रान्सफर. प्रोडक्शन प्रणालीला बँकेत मालमत्ता जमा करण्याचा आणि त्या काढण्याचा मार्ग आवश्यक असतो. परंतु येथे उद्देश केवळ संकल्पना स्पष्ट करणे आहे, म्हणून ही बँक केवळ ट्रान्सफरपुरती मर्यादित आहे.

### शून्य-ज्ञान पुरावे {#zero-knowledge-proofs}

मूलभूत स्तरावर, एक शून्य-ज्ञान पुरावा दर्शवितो की प्रोव्हरला काही डेटा, _Data<sub>private</sub>_ माहित आहे, जसे की काही सार्वजनिक डेटा, _Data<sub>public</sub>_, आणि _Data<sub>private</sub>_ यांच्यात एक संबंध _Relationship_ आहे. व्हेरिफायरला _Relationship_ आणि _Data<sub>public</sub>_ माहीत असते.

गोपनीयता जपण्यासाठी, आपल्याला स्टेट्स आणि व्यवहार खाजगी ठेवण्याची गरज आहे. पण अखंडता सुनिश्चित करण्यासाठी, आम्हाला स्टेट्सचा [क्रिप्टोग्राफिक हॅश](https://en.wikipedia.org/wiki/Cryptographic_hash_function) सार्वजनिक ठेवण्याची गरज आहे. व्यवहार सबमिट करणाऱ्या लोकांना ते व्यवहार खरोखरच झाले आहेत हे सिद्ध करण्यासाठी, आम्हाला व्यवहार हॅश देखील पोस्ट करण्याची आवश्यकता आहे.

बहुतेक प्रकरणांमध्ये, _Data<sub>private</sub>_ हे शून्य-ज्ञान पुरावा प्रोग्रामसाठी इनपुट असते आणि _Data<sub>public</sub>_ हे आउटपुट असते.

_Data<sub>private</sub>_ मधील ही फील्ड्स:

- _State<sub>n</sub>_, जुनी स्टेट
- _State<sub>n+1</sub>_, नवीन स्टेट
- _Transaction_, एक व्यवहार जो जुन्या स्टेटमधून नवीन स्टेटमध्ये बदलतो. या व्यवहारामध्ये ही फील्ड्स समाविष्ट असणे आवश्यक आहे:
  - _गंतव्य ॲड्रेस_ जो ट्रान्सफर प्राप्त करतो
  - ट्रान्सफर केली जाणारी _रक्कम_
  - प्रत्येक व्यवहारावर एकदाच प्रक्रिया केली जाऊ शकते हे सुनिश्चित करण्यासाठी _नॉन्स_.
    स्त्रोत ॲड्रेस व्यवहारामध्ये असण्याची गरज नाही, कारण तो स्वाक्षरीतून परत मिळवता येतो.
- _स्वाक्षरी_, व्यवहार करण्यासाठी अधिकृत असलेली स्वाक्षरी. आमच्या बाबतीत, व्यवहार करण्यासाठी अधिकृत असलेला एकमेव ॲड्रेस स्त्रोत ॲड्रेस आहे. कारण आमची शून्य-ज्ञान प्रणाली ज्या प्रकारे काम करते, आम्हाला Ethereum स्वाक्षरी व्यतिरिक्त, खात्याची सार्वजनिक की देखील आवश्यक आहे.

ही _Data<sub>public</sub>_ मधील फील्ड्स आहेत:

- _Hash(State<sub>n</sub>)_ जुन्या स्टेटचा हॅश
- _Hash(State<sub>n+1</sub>)_ नवीन स्टेटचा हॅश
- _Hash(Transaction)_ त्या व्यवहाराचा हॅश जो स्टेटला _State<sub>n</sub>_ मधून _State<sub>n+1</sub>_ मध्ये बदलतो.

संबंध अनेक अटी तपासतो:

- सार्वजनिक हॅश खरोखरच खाजगी फील्ड्ससाठी योग्य हॅश आहेत.
- व्यवहार, जुन्या स्टेटवर लागू केल्यावर, नवीन स्टेटमध्ये परिणाम करतो.
- स्वाक्षरी व्यवहाराच्या स्त्रोत ॲड्रेसवरून येते.

क्रिप्टोग्राफिक हॅश फंक्शन्सच्या गुणधर्मांमुळे, या अटी सिद्ध करणे अखंडता सुनिश्चित करण्यासाठी पुरेसे आहे.

### डेटा स्ट्रक्चर्स {#data-structures}

प्राथमिक डेटा स्ट्रक्चर सर्व्हरद्वारे धारण केलेली स्टेट आहे. प्रत्येक खात्यासाठी, सर्व्हर खात्याची शिल्लक आणि एक [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) चा मागोवा ठेवतो, जो [रिप्ले अटॅक](https://en.wikipedia.org/wiki/Replay_attack) रोखण्यासाठी वापरला जातो.

### घटक {#components}

या प्रणालीला दोन घटक आवश्यक आहेत:

- _सर्व्हर_ जो व्यवहार स्वीकारतो, त्यावर प्रक्रिया करतो, आणि शून्य-ज्ञान पुराव्यांसह हॅश चेनवर पोस्ट करतो.
- एक _स्मार्ट कॉन्ट्रॅक्ट_ जो हॅश साठवतो आणि स्टेट संक्रमण वैध असल्याची खात्री करण्यासाठी शून्य-ज्ञान पुरावे सत्यापित करतो.

### डेटा आणि नियंत्रण प्रवाह {#flows}

एका खात्यातून दुसऱ्या खात्यात हस्तांतरण करण्यासाठी विविध घटक ज्या प्रकारे संवाद साधतात ते खालीलप्रमाणे आहेत.

1. एक वेब ब्राउझर स्वाक्षरी केलेला व्यवहार सबमिट करतो जो स्वाक्षरीकर्त्याच्या खात्यातून वेगळ्या खात्यात हस्तांतरण करण्याची विनंती करतो.

2. सर्व्हर सत्यापित करतो की व्यवहार वैध आहे:

   - स्वाक्षरीकर्त्याचे बँकेत पुरेशी शिल्लक असलेले खाते आहे.
   - प्राप्तकर्त्याचे बँकेत एक खाते आहे.

3. सर्व्हर स्वाक्षरीकर्त्याच्या शिलकेतून हस्तांतरित केलेली रक्कम वजा करून आणि ती प्राप्तकर्त्याच्या शिलकेत जोडून नवीन स्टेटची गणना करतो.

4. सर्व्हर एक शून्य-ज्ञान पुरावा तयार करतो की स्टेट बदल वैध आहे.

5. सर्व्हर Ethereum ला एक व्यवहार सबमिट करतो ज्यात समाविष्ट आहे:

   - नवीन स्टेट हॅश
   - व्यवहार हॅश (जेणेकरून व्यवहार पाठवणाऱ्याला कळेल की त्यावर प्रक्रिया झाली आहे)
   - शून्य-ज्ञान पुरावा जो नवीन स्टेटमध्ये संक्रमण वैध असल्याचे सिद्ध करतो

6. स्मार्ट कॉन्ट्रॅक्ट शून्य-ज्ञान पुरावा सत्यापित करतो.

7. जर शून्य-ज्ञान पुरावा तपासला गेला, तर स्मार्ट कॉन्ट्रॅक्ट या क्रिया करतो:
   - सध्याचा स्टेट हॅश नवीन स्टेट हॅशमध्ये अपडेट करणे
   - नवीन स्टेट हॅश आणि व्यवहार हॅशसह एक लॉग नोंदणी प्रसारित करणे

### साधने {#tools}

क्लायंट-साइड कोडसाठी, आम्ही [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), आणि [Wagmi](https://wagmi.sh/) वापरणार आहोत. ही उद्योग-मानक साधने आहेत; जर तुम्हाला त्यांच्याशी परिचय नसेल, तर तुम्ही [हे ट्यूटोरियल](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) वापरू शकता.

सर्व्हरचा बहुतांश भाग [Node](https://nodejs.org/en) वापरून JavaScript मध्ये लिहिलेला आहे. शून्य-ज्ञान भाग [Noir](https://noir-lang.org/) मध्ये लिहिलेला आहे. आम्हाला आवृत्ती `1.0.0-beta.10` आवश्यक आहे, म्हणून तुम्ही [निर्देशानुसार Noir इन्स्टॉल](https://noir-lang.org/docs/getting_started/quick_start) केल्यानंतर, चालवा:

```
noirup -v 1.0.0-beta.10
```

आपण जो ब्लॉकचेन वापरतो तो `anvil` आहे, एक स्थानिक चाचणी ब्लॉकचेन जो [Foundry](https://getfoundry.sh/introduction/installation) चा भाग आहे.

## अंमलबजावणी {#implementation}

कारण ही एक गुंतागुंतीची प्रणाली आहे, आम्ही ती टप्प्याटप्प्याने लागू करू.

### टप्पा १ - मॅन्युअल शून्य ज्ञान {#stage-1}

पहिल्या टप्प्यासाठी, आम्ही ब्राउझरमध्ये एका व्यवहारावर स्वाक्षरी करू आणि नंतर मॅन्युअली शून्य-ज्ञान पुराव्याला माहिती देऊ. शून्य-ज्ञान कोडला ती माहिती `server/noir/Prover.toml` मध्ये मिळण्याची अपेक्षा असते ([येथे](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) दस्तऐवजीकरण केलेले).

ते कृतीत पाहण्यासाठी:

1. तुम्ही [Node](https://nodejs.org/en/download) आणि [Noir](https://noir-lang.org/install) इन्स्टॉल केले असल्याची खात्री करा. शक्यतो, ते macOS, Linux, किंवा [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) सारख्या UNIX प्रणालीवर इन्स्टॉल करा.

2. स्टेज 1 कोड डाउनलोड करा आणि क्लायंट कोड सर्व्ह करण्यासाठी वेब सर्व्हर सुरू करा.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   येथे वेब सर्व्हरची गरज असण्याचे कारण म्हणजे, काही प्रकारची फसवणूक टाळण्यासाठी, अनेक वॉलेट्स (जसे की MetaMask) थेट डिस्कवरून सर्व्ह केलेल्या फाइल्स स्वीकारत नाहीत

3. वॉलेटसह ब्राउझर उघडा.

4. वॉलेटमध्ये, एक नवीन पासफ्रेज टाका. लक्षात घ्या की यामुळे तुमचा सध्याचा पासफ्रेज हटवला जाईल, म्हणून _तुमच्याकडे बॅकअप असल्याची खात्री करा_.

   पासफ्रेज `test test test test test test test test test test test junk` आहे, जो anvil साठी डीफॉल्ट चाचणी पासफ्रेज आहे.

5. [क्लायंट-साइड कोड](http://localhost:5173/) वर ब्राउझ करा.

6. वॉलेटशी कनेक्ट व्हा आणि तुमचे गंतव्य खाते आणि रक्कम निवडा.

7. **स्वाक्षरी करा** वर क्लिक करा आणि व्यवहारावर स्वाक्षरी करा.

8. **Prover.toml** शीर्षकाखाली तुम्हाला मजकूर मिळेल. `server/noir/Prover.toml` त्या मजकूराने बदला.

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

10. संदेश योग्यरित्या हॅश झाला आहे की नाही हे पाहण्यासाठी वेब ब्राउझरवर दिसणाऱ्या हॅशशी शेवटच्या दोन मूल्यांची तुलना करा.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[ही फाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir द्वारे अपेक्षित माहितीचे स्वरूप दर्शवते.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

संदेश मजकूर स्वरूपात आहे, ज्यामुळे वापरकर्त्याला समजणे सोपे होते (जे स्वाक्षरी करताना आवश्यक आहे) आणि Noir कोडला पार्स करणे सोपे होते. रक्कम फिनीमध्ये उद्धृत केली आहे जेणेकरून एकीकडे अंशात्मक हस्तांतरण सक्षम होईल आणि दुसरीकडे ते सहज वाचता येईल. शेवटची संख्या [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) आहे.

स्ट्रिंग १०० अक्षरांची आहे. शून्य-ज्ञान पुरावे व्हेरिएबल-आकाराचा डेटा चांगल्या प्रकारे हाताळत नाहीत, त्यामुळे डेटा पॅड करणे अनेकदा आवश्यक असते.

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

स्ट्रक्चर्सचा ॲरे निर्दिष्ट करण्याचा हा मार्ग आहे. प्रत्येक नोंदीसाठी, आम्ही ॲड्रेस, शिल्लक (milliETH उर्फ [फिनी](https://cryptovalleyjournal.com/glossary/finney/)), आणि पुढील नॉन्स मूल्य निर्दिष्ट करतो.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[ही फाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) क्लायंट-साइड प्रोसेसिंग लागू करते आणि `server/noir/Prover.toml` फाइल तयार करते (ज्यामध्ये शून्य-ज्ञान पॅरामीटर्स समाविष्ट आहेत).

येथे अधिक मनोरंजक भागांचे स्पष्टीकरण दिले आहे.

```tsx
export default attrs =>  {
```

हे फंक्शन `Transfer` React घटक तयार करते, जे इतर फाइल्स आयात करू शकतात.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

हे खाते ॲड्रेस आहेत, जे `test ...` test junk\` पासफ्रेजने तयार केलेले ॲड्रेस. तुम्हाला तुमचे स्वतःचे ॲड्रेस वापरायचे असल्यास, फक्त ही व्याख्या सुधारा.

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

हा संदेश आहे, जागांनी पॅड केलेला. प्रत्येक वेळी [`useState`](https://react.dev/reference/react/useState) व्हेरिएबल्सपैकी एक बदलतो, घटक पुन्हा काढला जातो आणि `message` अपडेट होतो.

```tsx
  const sign = async () => {
```

जेव्हा वापरकर्ता **स्वाक्षरी** बटणावर क्लिक करतो तेव्हा हे फंक्शन कॉल केले जाते. संदेश आपोआप अपडेट होतो, परंतु स्वाक्षरीसाठी वॉलेटमध्ये वापरकर्त्याच्या मंजुरीची आवश्यकता असते आणि गरज नसल्यास आम्ही ती विचारू इच्छित नाही.

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

संदेश हॅश मिळवा. डीबगिंगसाठी (Noir कोडच्या) वापरकर्त्याला ते प्रदान करणे उपयुक्त आहे.

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[सार्वजनिक की मिळवा](https://viem.sh/docs/utilities/recoverPublicKey). [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) फंक्शनसाठी हे आवश्यक आहे.

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

स्टेट व्हेरिएबल्स सेट करा. हे केल्याने घटक पुन्हा काढला जातो (`sign` फंक्शन बाहेर पडल्यानंतर) आणि वापरकर्त्याला अपडेट केलेली मूल्ये दर्शवितो.

```tsx
    let proverToml = `
```

`Prover.toml` साठी मजकूर.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem आम्हाला 65-बाइट हेक्साडेसिमल स्ट्रिंग म्हणून सार्वजनिक की प्रदान करते. पहिला बाइट `0x04` आहे, एक आवृत्ती मार्कर. यानंतर सार्वजनिक कीच्या `x` साठी 32 बाइट्स आणि नंतर सार्वजनिक कीच्या `y` साठी 32 बाइट्स येतात.

तथापि, Noir ला ही माहिती दोन-बाइट ॲरे म्हणून मिळण्याची अपेक्षा आहे, एक `x` साठी आणि एक `y` साठी. शून्य-ज्ञान पुराव्याचा भाग म्हणून पार्स करण्यापेक्षा येथे क्लायंटवर पार्स करणे सोपे आहे.

लक्षात घ्या की ही सर्वसाधारणपणे शून्य-ज्ञानामध्ये एक चांगली प्रथा आहे. शून्य-ज्ञान पुराव्याच्या आतील कोड महाग असतो, त्यामुळे शून्य-ज्ञान पुराव्याच्या बाहेर करता येणारे कोणतेही प्रोसेसिंग शून्य-ज्ञान पुराव्याच्या बाहेरच _केले पाहिजे_.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

स्वाक्षरी देखील 65-बाइट हेक्साडेसिमल स्ट्रिंग म्हणून प्रदान केली जाते. तथापि, शेवटचा बाइट फक्त सार्वजनिक की पुनर्प्राप्त करण्यासाठी आवश्यक आहे. सार्वजनिक की आधीच Noir कोडला प्रदान केली जाईल, त्यामुळे आम्हाला स्वाक्षरी सत्यापित करण्यासाठी त्याची आवश्यकता नाही आणि Noir कोडला त्याची आवश्यकता नाही.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

खाते प्रदान करा.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

हे घटकाचे HTML (अधिक अचूकपणे, [JSX](https://react.dev/learn/writing-markup-with-jsx)) स्वरूप आहे.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[ही फाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) वास्तविक शून्य-ज्ञान कोड आहे.

```
use std::hash::pedersen_hash;
```

[पेडरसेन हॅश](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) [Noir मानक लायब्ररी](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) सह प्रदान केले आहे. शून्य-ज्ञान पुरावे सामान्यतः हे हॅश फंक्शन वापरतात. मानक हॅश फंक्शन्सच्या तुलनेत [अंकगणित सर्किट्स](https://rareskills.io/post/arithmetic-circuit) मध्ये गणना करणे खूप सोपे आहे.

```
use keccak256::keccak256;
use dep::ecrecover;
```

ही दोन फंक्शन्स बाह्य लायब्ररी आहेत, जी [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) मध्ये परिभाषित आहेत. त्यांची नावे जशी आहेत तशीच त्यांची कार्ये आहेत, एक फंक्शन जे [keccak256 हॅश](https://emn178.github.io/online-tools/keccak_256.html) ची गणना करते आणि एक फंक्शन जे Ethereum स्वाक्षरी सत्यापित करते आणि स्वाक्षरीकर्त्याचा Ethereum ॲड्रेस पुनर्प्राप्त करते.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir [Rust](https://www.rust-lang.org/) पासून प्रेरित आहे. व्हेरिएबल्स, डीफॉल्टनुसार, स्थिर असतात. अशाप्रकारे आम्ही जागतिक कॉन्फिगरेशन स्थिरांक परिभाषित करतो. विशेषतः, `ACCOUNT_NUMBER` ही आम्ही संग्रहित करत असलेल्या खात्यांची संख्या आहे.

`u<number>` नावाचे डेटा प्रकार त्या संख्येचे बिट्स, अनसाईन्ड आहेत. समर्थित प्रकार फक्त `u8`, `u16`, `u32`, `u64`, आणि `u128` आहेत.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

हे व्हेरिएबल खात्यांच्या पेडरसेन हॅशसाठी वापरले जाते, जसे खाली स्पष्ट केले आहे.

```
global MESSAGE_LENGTH : u32 = 100;
```

वर स्पष्ट केल्याप्रमाणे, संदेशाची लांबी निश्चित आहे. ते येथे निर्दिष्ट केले आहे.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 स्वाक्षऱ्यां](https://eips.ethereum.org/EIPS/eip-191)ना 26-बाइटच्या प्रिफिक्ससह बफर आवश्यक आहे, त्यानंतर ASCII मध्ये संदेशाची लांबी, आणि शेवटी संदेश स्वतः.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

आम्ही एका खात्याबद्दल जी माहिती संग्रहित करतो. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) ही एक संख्या आहे, जी साधारणपणे 253 बिट्सपर्यंत असते, जी थेट [अंकगणित सर्किट](https://rareskills.io/post/arithmetic-circuit) मध्ये वापरली जाऊ शकते जे शून्य-ज्ञान पुरावा लागू करते. येथे आपण 160-बिट Ethereum ॲड्रेस संग्रहित करण्यासाठी `Field` वापरतो.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

हस्तांतरण व्यवहारासाठी आम्ही संग्रहित करत असलेली माहिती.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

एक फंक्शनची व्याख्या. पॅरामीटर `Account` माहिती आहे. परिणाम `Field` व्हेरिएबल्सचा ॲरे आहे, ज्याची लांबी `FLAT_ACCOUNT_FIELDS` आहे.

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

ॲरेमधील पहिले मूल्य खाते ॲड्रेस आहे. दुसऱ्यामध्ये शिल्लक आणि नॉन्स दोन्ही समाविष्ट आहेत. `.into()` कॉल एका संख्येला तिच्या आवश्यक डेटा प्रकारात बदलतात. `account.nonce` हे `u32` मूल्य आहे, परंतु `account.balance << 32`, जे `u128` मूल्य आहे, त्यात जोडण्यासाठी ते `u128` असणे आवश्यक आहे. ते पहिले `.into()` आहे. दुसरे `u128` परिणामाला `Field` मध्ये रूपांतरित करते जेणेकरून ते ॲरेमध्ये बसेल.

```
    flat
}
```

Noir मध्ये, फंक्शन्स फक्त शेवटी एक मूल्य परत करू शकतात (लवकर परतीचा पर्याय नाही). परतीचे मूल्य निर्दिष्ट करण्यासाठी, आपण ते फंक्शनच्या बंद कंसाच्या अगदी आधी मूल्यांकित करता.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

हे फंक्शन खात्यांच्या ॲरेला `Field` ॲरेमध्ये बदलते, जे पीटरसन हॅशच्या इनपुट म्हणून वापरले जाऊ शकते.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

अशाप्रकारे आपण एक म्युटेबल व्हेरिएबल निर्दिष्ट करतो, म्हणजे, _स्थिर नाही_. Noir मधील व्हेरिएबल्सचे मूल्य नेहमीच असणे आवश्यक आहे, म्हणून आम्ही या व्हेरिएबलला सर्व शून्यांनी सुरू करतो.

```
    for i in 0..ACCOUNT_NUMBER {
```

हे एक `for` लूप आहे. लक्षात घ्या की सीमा स्थिर आहेत. Noir लूप्सच्या सीमा संकलनाच्या वेळी ज्ञात असणे आवश्यक आहे. याचे कारण म्हणजे अंकगणित सर्किट्स फ्लो कंट्रोलला समर्थन देत नाहीत. `for` लूपची प्रक्रिया करताना, कंपाइलर त्यातील कोडला अनेक वेळा ठेवतो, प्रत्येक पुनरावृत्तीसाठी एकदा.

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

शेवटी, आम्ही खात्यांच्या ॲरेला हॅश करणाऱ्या फंक्शनवर पोहोचलो.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }

```

हे फंक्शन विशिष्ट ॲड्रेस असलेले खाते शोधते. हे फंक्शन मानक कोडमध्ये अत्यंत अकार्यक्षम असेल कारण ते ॲड्रेस सापडल्यानंतरही सर्व खात्यांवर पुनरावृत्ती करते.

तथापि, शून्य-ज्ञान पुराव्यांमध्ये कोणतेही प्रवाह नियंत्रण नसते. जर आपल्याला एखादी अट तपासायची असेल, तर ती प्रत्येक वेळी तपासावी लागेल.

`if` विधानांसोबतही असेच काहीसे घडते. वरील लूपमधील `if` विधानाचे या गणितीय विधानांमध्ये भाषांतर केले जाते.

_condition<sub>result</sub> = accounts[i].address == address_ // समान असल्यास एक, अन्यथा शून्य

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) फंक्शनमुळे दावा खोटा असल्यास शून्य-ज्ञान पुरावा क्रॅश होतो. या प्रकरणात, जर आपल्याला संबंधित ॲड्रेस असलेले खाते सापडले नाही तर. ॲड्रेसची तक्रार करण्यासाठी, आम्ही [फॉर्मॅट स्ट्रिंग](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) वापरतो.

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

आम्ही Noir मध्ये स्वरूप स्ट्रिंगमध्ये संरचना घटकांमध्ये प्रवेश करू शकत नाही, म्हणून आम्ही एक वापरण्यायोग्य प्रत तयार करतो.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

या दोन अटी आहेत ज्या व्यवहार अवैध करू शकतात.

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

हे फंक्शन संदेशातून ॲड्रेस वाचते.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

ॲड्रेस नेहमी 20 बाइट्स (उर्फ 40 हेक्साडेसिमल अंक) लांब असतो आणि वर्ण #7 पासून सुरू होतो.

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

संदेशातून रक्कम आणि नॉन्स वाचा.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

संदेशात, ॲड्रेस नंतरची पहिली संख्या फिनीची रक्कम आहे (उर्फ हस्तांतरण करण्यासाठी ETH चा हजारावा भाग). दुसरी संख्या नॉन्स आहे. त्यांच्यामधील कोणत्याही मजकूराकडे दुर्लक्ष केले जाते.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
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

[ट्यूपल](https://noir-lang.org/docs/noir/concepts/data_types/tuples) परत करणे हा Noir मध्ये फंक्शनमधून अनेक मूल्ये परत करण्याचा मार्ग आहे.

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

आम्ही खात्यांसाठी पेडरसेन हॅश वापरू शकलो कारण ते फक्त शून्य-ज्ञान पुराव्याच्या आत हॅश केले जातात. तथापि, या कोडमध्ये आपल्याला संदेशाची स्वाक्षरी तपासावी लागेल, जी ब्राउझरद्वारे तयार केली जाते. त्यासाठी, आम्हाला [EIP 191](https://eips.ethereum.org/EIPS/eip-191) मधील Ethereum स्वाक्षरी स्वरूपाचे पालन करणे आवश्यक आहे. याचा अर्थ असा की आम्हाला एका मानक प्रिफिक्ससह एक संयुक्त बफर तयार करणे आवश्यक आहे, ASCII मध्ये संदेशाची लांबी, आणि संदेश स्वतः, आणि ते हॅश करण्यासाठी Ethereum मानक keccak256 वापरणे.

```rust
    // ASCII प्रिफिक्स
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

जेव्हा एखादे ॲप्लिकेशन वापरकर्त्याला असा संदेश स्वाक्षरी करण्यास सांगते जो व्यवहार म्हणून किंवा इतर कोणत्याही हेतूसाठी वापरला जाऊ शकतो अशा प्रकरणांना टाळण्यासाठी, EIP 191 निर्दिष्ट करते की सर्व स्वाक्षरी केलेले संदेश वर्ण 0x19 (वैध ASCII वर्ण नाही) ने सुरू होतात, त्यानंतर `Ethereum Signed Message:` आणि एक नवीन ओळ येते.

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

संदेश लांबी 999 पर्यंत हाताळा आणि जर ती जास्त असेल तर अयशस्वी व्हा. मी हा कोड जोडला आहे, जरी संदेशाची लांबी स्थिर असली तरी, कारण तो बदलणे सोपे करते. उत्पादन प्रणालीवर, तुम्ही कदाचित चांगल्या कामगिरीसाठी `MESSAGE_LENGTH` बदलत नाही असे गृहीत धराल.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Ethereum मानक `keccak256` फंक्शन वापरा.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // ॲड्रेस, हॅशचे पहिले 16 बाइट्स, हॅशचे शेवटचे 16 बाइट्स        
{
```

हे फंक्शन स्वाक्षरी सत्यापित करते, ज्यासाठी संदेश हॅश आवश्यक आहे. नंतर ते आपल्याला स्वाक्षरी केलेला ॲड्रेस आणि संदेश हॅश प्रदान करते. संदेश हॅश दोन `Field` मूल्यांमध्ये पुरवला जातो कारण बाइट ॲरेपेक्षा कार्यक्रमाच्या उर्वरित भागात वापरणे सोपे आहे.

आम्हाला दोन `Field` मूल्ये वापरण्याची आवश्यकता आहे कारण फील्डची गणना मोठ्या संख्येने [मॉड्युलो](https://en.wikipedia.org/wiki/Modulo) केली जाते, परंतु ती संख्या सामान्यतः 256 बिटपेक्षा कमी असते (अन्यथा EVM मध्ये ती गणना करणे कठीण होईल).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` आणि `hash2` ला बदलण्यायोग्य व्हेरिएबल्स म्हणून निर्दिष्ट करा आणि त्यांच्यामध्ये हॅश बाइट बाय बाइट लिहा.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

हे [Solidity च्या `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) सारखेच आहे, पण त्यात दोन महत्त्वाचे फरक आहेत:

- जर स्वाक्षरी वैध नसेल, तर कॉल `assert` अयशस्वी करतो आणि प्रोग्राम रद्द केला जातो.
- जरी स्वाक्षरी आणि हॅशमधून सार्वजनिक की पुनर्प्राप्त केली जाऊ शकते, तरीही ही प्रक्रिया बाह्यरित्या केली जाऊ शकते आणि म्हणूनच, शून्य-ज्ञान पुराव्याच्या आत करणे योग्य नाही. जर कोणी येथे आम्हाला फसवण्याचा प्रयत्न केला, तर स्वाक्षरी पडताळणी अयशस्वी होईल.

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
        Field,  // जुन्या खात्यांच्या ॲरेचा हॅश
        Field,  // नवीन खात्यांच्या ॲरेचा हॅश
        Field,  // संदेश हॅशचे पहिले 16 बाइट्स
        Field,  // संदेश हॅशचे शेवटचे 16 बाइट्स
    )
```

शेवटी, आपण `main` फंक्शनवर पोहोचतो. आम्हाला हे सिद्ध करावे लागेल की आमच्याकडे असा व्यवहार आहे जो खात्यांच्या हॅशला जुन्या मूल्यातून नवीन मूल्यात वैधपणे बदलतो. आम्हाला हे देखील सिद्ध करावे लागेल की त्याचा हा विशिष्ट व्यवहार हॅश आहे जेणेकरून पाठवणाऱ्याला कळेल की त्यांच्या व्यवहारावर प्रक्रिया झाली आहे.

```rust
{
    let mut txn = readTransferTxn(message);
```

आम्हाला `txn` बदलण्यायोग्य असणे आवश्यक आहे कारण आम्ही संदेशातून ॲड्रेस वाचत नाही, आम्ही ते स्वाक्षरीतून वाचतो.

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

### टप्पा 2 - एक सर्व्हर जोडणे {#stage-2}

दुसऱ्या टप्प्यात, आम्ही एक सर्व्हर जोडतो जो ब्राउझरकडून हस्तांतरण व्यवहार प्राप्त करतो आणि अंमलात आणतो.

ते कृतीत पाहण्यासाठी:

1. Vite चालू असल्यास थांबवा.

2. सर्व्हर समाविष्ट असलेली शाखा डाउनलोड करा आणि तुमच्याकडे सर्व आवश्यक मॉड्यूल्स असल्याची खात्री करा.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir कोड संकलित करण्याची गरज नाही, तो तुम्ही टप्पा 1 साठी वापरलेल्या कोडसारखाच आहे.

3. सर्व्हर सुरू करा.

   ```sh
   npm run start
   ```

4. एका वेगळ्या कमांड-लाइन विंडोमध्ये, ब्राउझर कोड सर्व्ह करण्यासाठी Vite चालवा.

   ```sh
   cd client
   npm run dev
   ```

5. [http://localhost:5173](http://localhost:5173) वर क्लायंट कोडवर ब्राउझ करा

6. तुम्ही व्यवहार जारी करण्यापूर्वी, तुम्हाला नॉन्स, तसेच तुम्ही पाठवू शकणारी रक्कम माहित असणे आवश्यक आहे. ही माहिती मिळवण्यासाठी, **खाते डेटा अपडेट करा** वर क्लिक करा आणि संदेशावर स्वाक्षरी करा.

   येथे आपल्यासमोर एक द्विधा मनःस्थिती आहे. एकीकडे, आम्ही असा संदेश स्वाक्षरी करू इच्छित नाही जो पुन्हा वापरला जाऊ शकतो ([रिप्ले अटॅक](https://en.wikipedia.org/wiki/Replay_attack)), म्हणूनच आम्हाला प्रथम नॉन्स हवा आहे. तथापि, आमच्याकडे अद्याप नॉन्स नाही. यावरील उपाय म्हणजे असा नॉन्स निवडणे जो एकदाच वापरला जाऊ शकतो आणि जो आपल्याकडे दोन्ही बाजूंनी आधीच आहे, जसे की सध्याची वेळ.

   या उपायामधील समस्या ही आहे की वेळ कदाचित पूर्णपणे समक्रमित नसेल. त्याऐवजी, आम्ही दर मिनिटाला बदलणाऱ्या मूल्यावर स्वाक्षरी करतो. याचा अर्थ असा की रिप्ले हल्ल्यांना आपली असुरक्षिततेची खिडकी जास्तीत जास्त एक मिनिटाची आहे. उत्पादनामध्ये स्वाक्षरी केलेली विनंती TLS द्वारे संरक्षित केली जाईल, आणि बोगद्याच्या दुसऱ्या बाजूला---सर्व्हर---आधीच शिल्लक आणि नॉन्स उघड करू शकतो (त्याला काम करण्यासाठी ते माहित असणे आवश्यक आहे) हे लक्षात घेता, हा एक स्वीकार्य धोका आहे.

7. एकदा ब्राउझरला शिल्लक आणि नॉन्स परत मिळाल्यावर, ते हस्तांतरण फॉर्म दर्शवते. गंतव्य ॲड्रेस आणि रक्कम निवडा आणि **हस्तांतरण करा** वर क्लिक करा. या विनंतीवर स्वाक्षरी करा.

8. हस्तांतरण पाहण्यासाठी, एकतर **खाते डेटा अपडेट करा** किंवा तुम्ही सर्व्हर चालवत असलेल्या विंडोमध्ये पहा. सर्व्हर प्रत्येक वेळी बदलल्यावर स्थिती लॉग करतो.

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

[ही फाइल](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) मध्ये सर्व्हर प्रक्रिया आहे, आणि ती [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) येथील Noir कोडसह संवाद साधते. येथे मनोरंजक भागांचे स्पष्टीकरण आहे.

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) लायब्ररी JavaScript कोड आणि Noir कोड दरम्यान संवाद साधते.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

अंकगणित सर्किट लोड करा---मागील टप्प्यात आपण तयार केलेला संकलित Noir प्रोग्राम---आणि ते कार्यान्वित करण्याची तयारी करा.

```js
// आम्ही फक्त स्वाक्षरी केलेल्या विनंतीच्या बदल्यात खाते माहिती प्रदान करतो
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

खाते माहिती प्रदान करण्यासाठी, आम्हाला फक्त स्वाक्षरीची आवश्यकता आहे. कारण संदेश काय असणार आहे हे आम्हाला आधीच माहित आहे, आणि म्हणून संदेश हॅश देखील.

```js
const processMessage = async (message, signature) => {
```

एका संदेशावर प्रक्रिया करा आणि त्यात एन्कोड केलेला व्यवहार कार्यान्वित करा.

```js
    // Get the public key
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

आता आम्ही सर्व्हरवर JavaScript चालवत असल्याने, आम्ही सार्वजनिक की क्लायंटऐवजी तेथे पुनर्प्राप्त करू शकतो.

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

`noir.execute` Noir प्रोग्राम चालवते. पॅरामीटर्स [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) मध्ये प्रदान केलेल्या पॅरामीटर्सच्या समतुल्य आहेत. लक्षात घ्या की लांब मूल्ये हेक्साडेसिमल स्ट्रिंगच्या ॲरे म्हणून (`["0x60", "0xA7"]`) प्रदान केली जातात, एकल हेक्साडेसिमल मूल्य (`0x60A7`) म्हणून नाही, जसे Viem करते.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

जर काही त्रुटी असेल, तर ती पकडा आणि नंतर क्लायंटला एक सरलीकृत आवृत्ती रिले करा.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

व्यवहार लागू करा. आम्ही ते Noir कोडमध्ये आधीच केले आहे, परंतु तेथून परिणाम काढण्याऐवजी येथे पुन्हा करणे सोपे आहे.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

प्रारंभिक `Accounts` रचना.

### टप्पा 3 - Ethereum स्मार्ट कॉन्ट्रॅक्ट्स {#stage-3}

1. सर्व्हर आणि क्लायंट प्रक्रिया थांबवा.

2. स्मार्ट कॉन्ट्रॅक्ट्स असलेली शाखा डाउनलोड करा आणि तुमच्याकडे सर्व आवश्यक मॉड्यूल्स असल्याची खात्री करा.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. एका वेगळ्या कमांड-लाइन विंडोमध्ये `anvil` चालवा.

4. पडताळणी की आणि सॉलिडिटी व्हेरिफायर तयार करा, नंतर व्हेरिफायर कोड सॉलिडिटी प्रोजेक्टमध्ये कॉपी करा.

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

6. `Verifier.sol` तैनात करा आणि ॲड्रेस एका पर्यावरण व्हेरिएबलमध्ये संग्रहित करा.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` कॉन्ट्रॅक्ट तैनात करा.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` मूल्य `Accounts` च्या प्रारंभिक स्थितीचा पेडरसन हॅश आहे. जर तुम्ही `server/index.mjs` मध्ये ही प्रारंभिक स्थिती बदलली, तर तुम्ही शून्य-ज्ञान पुराव्याद्वारे नोंदवलेला प्रारंभिक हॅश पाहण्यासाठी व्यवहार चालवू शकता.

8. सर्व्हर चालवा.

   ```sh
   cd ../server
   npm run start
   ```

9. एका वेगळ्या कमांड-लाइन विंडोमध्ये क्लायंट चालवा.

   ```sh
   cd client
   npm run dev
   ```

10. काही व्यवहार चालवा.

11. स्थिती ऑनचेन बदलली आहे हे सत्यापित करण्यासाठी, सर्व्हर प्रक्रिया पुन्हा सुरू करा. पहा की `ZkBank` आता व्यवहार स्वीकारत नाही, कारण व्यवहारांमधील मूळ हॅश मूल्य ऑनचेन संग्रहित हॅश मूल्यापेक्षा वेगळे आहे.

    ही अपेक्षित प्रकारची त्रुटी आहे.

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

या फाइलमधील बदल बहुतेक करून वास्तविक पुरावा तयार करणे आणि तो ऑनचेन सबमिट करणे यासंबंधी आहेत.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

ऑनचेन पाठवण्यासाठी वास्तविक पुरावा तयार करण्यासाठी आम्हाला [बॅरेटेंबर्ग पॅकेज](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) वापरण्याची आवश्यकता आहे. आम्ही हे पॅकेज कमांड-लाइन इंटरफेस (`bb`) चालवून किंवा [JavaScript लायब्ररी, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) वापरून वापरू शकतो. JavaScript लायब्ररी मूळ कोड चालवण्यापेक्षा खूपच मंद आहे, म्हणून आम्ही कमांड-लाइन वापरण्यासाठी येथे [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) वापरतो.

लक्षात घ्या की जर तुम्ही `bb.js` वापरण्याचा निर्णय घेतला, तर तुम्हाला Noir च्या आवृत्तीशी सुसंगत असलेली आवृत्ती वापरणे आवश्यक आहे. लेखनाच्या वेळी, सध्याची Noir आवृत्ती (1.0.0-beta.11) `bb.js` आवृत्ती 0.87 वापरते.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

येथील ॲड्रेस तो आहे जो तुम्हाला स्वच्छ `anvil` सह सुरुवात केल्यावर आणि वरील निर्देशांचे पालन केल्यावर मिळतो.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

ही खाजगी की `anvil` मधील डीफॉल्ट पूर्व-अनुदानित खात्यांपैकी एक आहे.

```js
const generateProof = async (witness, fileID) => {
```

`bb` एक्झिक्युटेबल वापरून पुरावा तयार करा.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

साक्षीदार एका फाईलमध्ये लिहा.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

प्रत्यक्षात पुरावा तयार करा. या पायरीमुळे सार्वजनिक व्हेरिएबल्ससह एक फाईल देखील तयार होते, परंतु आम्हाला त्याची आवश्यकता नाही. आम्हाला ते व्हेरिएबल्स `noir.execute` मधून आधीच मिळाले आहेत.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

पुरावा हा `Field` मूल्यांचा एक JSON ॲरे आहे, प्रत्येक हेक्साडेसिमल मूल्य म्हणून दर्शविला जातो. तथापि, आम्हाला ते व्यवहारात एकल `bytes` मूल्य म्हणून पाठवणे आवश्यक आहे, जे Viem मोठ्या हेक्साडेसिमल स्ट्रिंगद्वारे दर्शवते. येथे आम्ही सर्व मूल्यांना एकत्र जोडून, सर्व `0x` काढून टाकून, आणि शेवटी एक जोडून स्वरूप बदलतो.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

स्वच्छता करा आणि पुरावा परत करा.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

सार्वजनिक फील्ड 32-बाइट मूल्यांचा ॲरे असणे आवश्यक आहे. तथापि, आम्हाला व्यवहार हॅश दोन `Field` मूल्यांमध्ये विभागण्याची आवश्यकता असल्याने, ते 16-बाइट मूल्य म्हणून दिसते. येथे आम्ही शून्य जोडतो जेणेकरून Viem ला समजेल की ते प्रत्यक्षात 32 बाइट्स आहे.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

प्रत्येक ॲड्रेस प्रत्येक नॉन्स एकदाच वापरतो जेणेकरून आपण साक्षीदार फाईल आणि आउटपुट डिरेक्टरीसाठी एक अद्वितीय ओळखकर्ता म्हणून `fromAddress` आणि `nonce` यांचे संयोजन वापरू शकू.

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

व्यवहार चेनवर पाठवा.

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

ऑनचेन कोडला दोन व्हेरिएबल्सचा मागोवा ठेवण्याची आवश्यकता आहे: व्हेरिफायर (`nargo` द्वारे तयार केलेला एक वेगळा कॉन्ट्रॅक्ट) आणि वर्तमान स्टेट हॅश.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

प्रत्येक वेळी स्थिती बदलल्यावर, आम्ही `TransactionProcessed` इव्हेंट प्रसारित करतो.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

हे फंक्शन व्यवहारांवर प्रक्रिया करते. हे पुरावा (`bytes` म्हणून) आणि सार्वजनिक इनपुट (`bytes32` ॲरे म्हणून) व्हेरिफायरला आवश्यक असलेल्या स्वरूपात मिळवते (ऑनचेन प्रक्रिया आणि त्यामुळे गॅस खर्च कमी करण्यासाठी).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

शून्य-ज्ञान पुरावा असा असावा की व्यवहार आमच्या वर्तमान हॅशमधून नवीन हॅशमध्ये बदलतो.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

शून्य-ज्ञान पुरावा सत्यापित करण्यासाठी व्हेरिफायर कॉन्ट्रॅक्टला कॉल करा. ही पायरी शून्य-ज्ञान पुरावा चुकीचा असल्यास व्यवहार उलटवते.

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

जर सर्वकाही ठीक झाले, तर स्टेट हॅशला नवीन मूल्यावर अपडेट करा आणि `TransactionProcessed` इव्हेंट प्रसारित करा.

## केंद्रीकृत घटकाद्वारे होणारे गैरवापर {#abuses}

माहिती सुरक्षेमध्ये तीन गुणधर्म आहेत:

- _गोपनीयता_, वापरकर्ते ज्या माहितीला वाचण्यासाठी अधिकृत नाहीत ती वाचू शकत नाहीत.
- _अखंडता_, अधिकृत वापरकर्त्यांद्वारे अधिकृत पद्धतीनेच माहिती बदलली जाऊ शकते.
- _उपलब्धता_, अधिकृत वापरकर्ते प्रणाली वापरू शकतात.

या प्रणालीवर, अखंडता शून्य-ज्ञान पुराव्यांद्वारे प्रदान केली जाते. उपलब्धतेची हमी देणे खूपच कठीण आहे, आणि गोपनीयता अशक्य आहे, कारण बँकेला प्रत्येक खात्याची शिल्लक आणि सर्व व्यवहार माहित असणे आवश्यक आहे. माहिती असलेल्या घटकाला ती माहिती शेअर करण्यापासून रोखण्याचा कोणताही मार्ग नाही.

[स्टेल्थ ॲड्रेस](https://vitalik.eth.limo/general/2023/01/20/stealth.html) वापरून खऱ्या अर्थाने गोपनीय बँक तयार करणे शक्य आहे, परंतु ते या लेखाच्या व्याप्तीबाहेर आहे.

### खोटी माहिती {#false-info}

सर्व्हर ज्या प्रकारे अखंडतेचे उल्लंघन करू शकतो त्यापैकी एक म्हणजे [डेटाची विनंती केल्यावर](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) खोटी माहिती प्रदान करणे.

यावर उपाय म्हणून, आपण एक दुसरा Noir प्रोग्राम लिहू शकतो जो खात्यांना खाजगी इनपुट म्हणून आणि माहितीसाठी विनंती केलेल्या ॲड्रेसला सार्वजनिक इनपुट म्हणून प्राप्त करतो. आउटपुट त्या ॲड्रेसची शिल्लक आणि नॉन्स, आणि खात्यांचा हॅश आहे.

अर्थात, हा पुरावा ऑनचेन सत्यापित केला जाऊ शकत नाही, कारण आम्हाला ऑनचेन नॉन्स आणि शिल्लक पोस्ट करायची नाही. तथापि, तो ब्राउझरमध्ये चालणाऱ्या क्लायंट कोडद्वारे सत्यापित केला जाऊ शकतो.

### सक्तीचे व्यवहार {#forced-txns}

L2s वर उपलब्धता सुनिश्चित करण्यासाठी आणि सेन्सॉरशिप रोखण्यासाठी सामान्य यंत्रणा [सक्तीचे व्यवहार](https://docs.optimism.io/stack/transactions/forced-transaction) आहे. परंतु सक्तीचे व्यवहार शून्य-ज्ञान पुराव्यांसह एकत्रित होत नाहीत. सर्व्हर हा एकमेव घटक आहे जो व्यवहार सत्यापित करू शकतो.

आम्ही `smart-contracts/src/ZkBank.sol` मध्ये बदल करून सक्तीचे व्यवहार स्वीकारू शकतो आणि सर्व्हरला स्थिती बदलण्यापासून रोखू शकतो जोपर्यंत त्यावर प्रक्रिया होत नाही. तथापि, यामुळे आपल्याला एका सोप्या डिनायल-ऑफ-सर्व्हिस हल्ल्यासाठी उघडे पडते. जर सक्तीचा व्यवहार अवैध असेल आणि त्यामुळे त्यावर प्रक्रिया करणे अशक्य असेल तर काय?

यावरील उपाय म्हणजे सक्तीचा व्यवहार अवैध असल्याचा शून्य-ज्ञान पुरावा असणे. हे सर्व्हरला तीन पर्याय देते:

- सक्तीच्या व्यवहारावर प्रक्रिया करणे, त्यावर प्रक्रिया झाल्याचा शून्य-ज्ञान पुरावा आणि नवीन स्थिती हॅश प्रदान करणे.
- सक्तीचा व्यवहार नाकारणे, आणि कॉन्ट्रॅक्टला शून्य-ज्ञान पुरावा प्रदान करणे की व्यवहार अवैध आहे (अज्ञात ॲड्रेस, चुकीचा नॉन्स, किंवा अपुरी शिल्लक).
- सक्तीच्या व्यवहाराकडे दुर्लक्ष करणे. सर्व्हरला प्रत्यक्षात व्यवहारावर प्रक्रिया करण्यास भाग पाडण्याचा कोणताही मार्ग नाही, परंतु याचा अर्थ संपूर्ण प्रणाली अनुपलब्ध आहे.

#### उपलब्धता बाँड्स {#avail-bonds}

वास्तविक जीवनातील अंमलबजावणीमध्ये, सर्व्हर चालू ठेवण्यासाठी कदाचित काही प्रकारचा नफ्याचा हेतू असेल. आम्ही या प्रोत्साहनाला बळकट करण्यासाठी सर्व्हरला एक उपलब्धता बाँड पोस्ट करायला लावू शकतो जो कोणीही जाळू शकतो जर सक्तीचा व्यवहार एका विशिष्ट कालावधीत प्रक्रिया केला गेला नाही.

### खराब Noir कोड {#bad-noir-code}

सामान्यतः, लोकांना स्मार्ट कॉन्ट्रॅक्टवर विश्वास ठेवण्यासाठी आम्ही स्त्रोत कोड एका [ब्लॉक एक्सप्लोरर](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) वर अपलोड करतो. तथापि, शून्य-ज्ञान पुराव्यांच्या बाबतीत, ते अपुरे आहे.

`Verifier.sol` मध्ये पडताळणी की असते, जी Noir प्रोग्रामचे एक फंक्शन आहे. तथापि, ती की आपल्याला Noir प्रोग्राम काय होता हे सांगत नाही. खऱ्या अर्थाने विश्वसनीय उपाययोजना करण्यासाठी, तुम्हाला Noir प्रोग्राम (आणि ज्या आवृत्तीने तो तयार केला आहे) अपलोड करणे आवश्यक आहे. अन्यथा, शून्य-ज्ञान पुरावे एका वेगळ्या प्रोग्रामला प्रतिबिंबित करू शकतात, ज्यामध्ये एक बॅक डोअर असेल.

जोपर्यंत ब्लॉक एक्सप्लोरर्स आम्हाला Noir प्रोग्राम्स अपलोड आणि सत्यापित करण्याची परवानगी देत नाहीत, तोपर्यंत तुम्ही ते स्वतः करावे (शक्यतो [IPFS](/developers/tutorials/ipfs-decentralized-ui/) वर). मग प्रगत वापरकर्ते स्त्रोत कोड डाउनलोड करू शकतील, तो स्वतः संकलित करू शकतील, `Verifier.sol` तयार करू शकतील, आणि तो ऑनचेन असलेल्या कोडसारखाच आहे हे सत्यापित करू शकतील.

## निष्कर्ष {#conclusion}

प्लाझ्मा-प्रकारच्या ॲप्लिकेशन्सना माहिती साठवणुकीसाठी एका केंद्रीकृत घटकाची आवश्यकता असते. यामुळे संभाव्य असुरक्षितता निर्माण होते परंतु, बदल्यात, आम्हाला ब्लॉकचेनवरच उपलब्ध नसलेल्या मार्गांनी गोपनीयतेचे संरक्षण करण्यास अनुमती देते. शून्य-ज्ञान पुराव्यांसह आम्ही अखंडता सुनिश्चित करू शकतो आणि शक्यतो केंद्रीकृत घटक चालवणाऱ्या कोणालाही उपलब्धतेची देखभाल करणे आर्थिकदृष्ट्या फायदेशीर बनवू शकतो.

[माझ्या कामाबद्दल अधिक माहितीसाठी येथे पहा](https://cryptodocguy.pro/).

## पोचपावती {#acknowledgements}

- जोश क्राइट्सने या लेखाचा मसुदा वाचला आणि मला एका काटेरी Noir समस्येवर मदत केली.

कोणत्याही उर्वरित चुका माझ्या जबाबदारी आहेत.
