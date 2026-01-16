---
title: एक ऐप-विशिष्ट प्लाज्मा लिखें जो गोपनीयता को संरक्षित रखता है
description: इस ट्यूटोरियल में, हम जमा के लिए एक अर्ध-गुप्त बैंक बनाते हैं। बैंक एक केंद्रीकृत घटक है; यह प्रत्येक उपयोगकर्ता की शेष राशि जानता है। हालाँकि, यह जानकारी ऑन-चेन संग्रहीत नहीं है। इसके बजाय, बैंक स्टेट का एक हैश पोस्ट करता है। हर बार जब कोई लेनदेन होता है, तो बैंक नया हैश पोस्ट करता है, साथ ही एक ज़ीरो-नॉलेज प्रमाण के साथ कि उसके पास एक हस्ताक्षरित लेनदेन है जो हैश स्टेट को नए में बदल देता है। इस ट्यूटोरियल को पढ़ने के बाद, आप न केवल यह समझेंगे कि ज़ीरो-नॉलेज प्रमाणों का उपयोग कैसे करें, बल्कि यह भी समझेंगे कि आप उनका उपयोग क्यों करते हैं और सुरक्षित रूप से ऐसा कैसे करें।
author: ओरी पोमेरेन्ट्ज़
tags: [ "ज़ीरो-नॉलेज", "सर्वर", "ऑफ-चेन", "गोपनीयता" ]
skill: advanced
lang: hi
published: 2025-10-15
---

## परिचय {#introduction}

[रोलअप](/developers/docs/scaling/zk-rollups/) के विपरीत, [प्लाज्मा](/developers/docs/scaling/plasma) अखंडता के लिए एथेरियम मेननेट का उपयोग करते हैं, लेकिन उपलब्धता के लिए नहीं। इस लेख में, हम एक ऐसा एप्लिकेशन लिखते हैं जो प्लाज्मा की तरह व्यवहार करता है, जिसमें एथेरियम अखंडता (कोई अनधिकृत परिवर्तन नहीं) की गारंटी देता है, लेकिन उपलब्धता की नहीं (एक केंद्रीकृत घटक डाउन हो सकता है और पूरे सिस्टम को अक्षम कर सकता है)।

हम यहां जो एप्लिकेशन लिखते हैं वह एक गोपनीयता-संरक्षण बैंक है। विभिन्न पतों में शेष राशि वाले खाते होते हैं, और वे अन्य खातों में पैसे (ETH) भेज सकते हैं। बैंक स्टेट (खाते और उनकी शेष राशि) और लेनदेन के हैश पोस्ट करता है, लेकिन वास्तविक शेष राशि को ऑफ-चेन रखता है जहां वे निजी रह सकते हैं।

## डिज़ाइन {#design}

यह एक उत्पादन-तैयार प्रणाली नहीं है, बल्कि एक शिक्षण उपकरण है। जैसे, यह कई सरलीकरण मान्यताओं के साथ लिखा गया है।

- निश्चित खाता पूल। खातों की एक विशिष्ट संख्या है, और प्रत्येक खाता एक पूर्व निर्धारित पते से संबंधित है। यह एक बहुत ही सरल प्रणाली बनाता है क्योंकि ज़ीरो-नॉलेज प्रमाणों में चर-आकार की डेटा संरचनाओं को संभालना मुश्किल है। एक उत्पादन-तैयार प्रणाली के लिए, हम [मर्कल रूट](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) का उपयोग स्टेट हैश के रूप में कर सकते हैं और आवश्यक शेष राशि के लिए मर्कल प्रमाण प्रदान कर सकते हैं।

- मेमोरी भंडारण। एक उत्पादन प्रणाली पर, हमें पुनरारंभ की स्थिति में उन्हें संरक्षित करने के लिए सभी खाता शेषों को डिस्क पर लिखने की आवश्यकता है। यहां, यह ठीक है अगर जानकारी बस खो जाती है।

- केवल स्थानांतरण। एक उत्पादन प्रणाली को बैंक में संपत्ति जमा करने और उन्हें निकालने के तरीके की आवश्यकता होगी। लेकिन यहां उद्देश्य केवल अवधारणा को स्पष्ट करना है, इसलिए यह बैंक केवल स्थानांतरण तक ही सीमित है।

### ज़ीरो-नॉलेज प्रमाण {#zero-knowledge-proofs}

एक मौलिक स्तर पर, एक ज़ीरो-नॉलेज प्रमाण यह दर्शाता है कि सिद्ध करने वाला कुछ डेटा, _Data<sub>private</sub>_ जानता है, जैसे कि कुछ सार्वजनिक डेटा, _Data<sub>public</sub>_, और _Data<sub>private</sub>_ के बीच एक संबंध _Relationship_ है। सत्यापनकर्ता _Relationship_ और _Data<sub>public</sub>_ जानता है।

गोपनीयता बनाए रखने के लिए, हमें स्टेट्स और लेनदेन को निजी रखने की आवश्यकता है। लेकिन अखंडता सुनिश्चित करने के लिए, हमें स्टेट्स के [क्रिप्टोग्राफिक हैश](https://en.wikipedia.org/wiki/Cryptographic_hash_function) को सार्वजनिक करने की आवश्यकता है। लेनदेन सबमिट करने वाले लोगों को यह साबित करने के लिए कि वे लेनदेन वास्तव में हुए हैं, हमें लेनदेन हैश भी पोस्ट करने की आवश्यकता है।

अधिकांश मामलों में, _Data<sub>private</sub>_ ज़ीरो-नॉलेज प्रमाण प्रोग्राम के लिए इनपुट है, और _Data<sub>public</sub>_ आउटपुट है।

_Data<sub>private</sub>_ में ये फ़ील्ड:

- _State<sub>n</sub>_, पुराना स्टेट
- _State<sub>n+1</sub>_, नया स्टेट
- _Transaction_, एक लेनदेन जो पुराने स्टेट से नए में बदलता है। इस लेनदेन में इन फ़ील्ड को शामिल करने की आवश्यकता है:
  - _गंतव्य पता_ जो स्थानांतरण प्राप्त करता है
  - _राशि_ जो स्थानांतरित की जा रही है
  - _नॉन्स_ यह सुनिश्चित करने के लिए कि प्रत्येक लेनदेन केवल एक बार संसाधित किया जा सकता है।
    स्रोत पता लेनदेन में होने की आवश्यकता नहीं है, क्योंकि इसे हस्ताक्षर से पुनर्प्राप्त किया जा सकता है।
- _हस्ताक्षर_, एक हस्ताक्षर जो लेनदेन करने के लिए अधिकृत है। हमारे मामले में, लेनदेन करने के लिए अधिकृत एकमात्र पता स्रोत पता है। क्योंकि हमारी ज़ीरो-नॉलेज प्रणाली जिस तरह से काम करती है, हमें एथेरियम हस्ताक्षर के अलावा, खाते की सार्वजनिक कुंजी की भी आवश्यकता है।

_Data<sub>public</sub>_ में ये फ़ील्ड हैं:

- _Hash(State<sub>n</sub>)_ पुराने स्टेट का हैश
- _Hash(State<sub>n+1</sub>)_ नए स्टेट का हैश
- _Hash(Transaction)_ उस लेनदेन का हैश जो स्टेट को _State<sub>n</sub>_ से _State<sub>n+1</sub>_ में बदलता है।

यह संबंध कई शर्तों की जाँच करता है:

- सार्वजनिक हैश वास्तव में निजी फ़ील्ड के लिए सही हैश हैं।
- लेनदेन, जब पुराने स्टेट पर लागू होता है, तो नए स्टेट में परिणामित होता है।
- हस्ताक्षर लेनदेन के स्रोत पते से आता है।

क्रिप्टोग्राफिक हैश कार्यों के गुणों के कारण, इन शर्तों को साबित करना अखंडता सुनिश्चित करने के लिए पर्याप्त है।

### डेटा संरचनाएं {#data-structures}

प्राथमिक डेटा संरचना सर्वर द्वारा धारित स्टेट है। प्रत्येक खाते के लिए, सर्वर खाता शेष और एक [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) का ट्रैक रखता है, जिसका उपयोग [रीप्ले हमलों](https://en.wikipedia.org/wiki/Replay_attack) को रोकने के लिए किया जाता है।

### घटक {#components}

इस प्रणाली को दो घटकों की आवश्यकता है:

- _सर्वर_ जो लेनदेन प्राप्त करता है, उन्हें संसाधित करता है, और ज़ीरो-नॉलेज प्रमाणों के साथ श्रृंखला में हैश पोस्ट करता है।
- एक _स्मार्ट अनुबंध_ जो हैश संग्रहीत करता है और यह सुनिश्चित करने के लिए ज़ीरो-नॉलेज प्रमाणों को सत्यापित करता है कि स्टेट संक्रमण वैध हैं।

### डेटा और नियंत्रण प्रवाह {#flows}

ये वे तरीके हैं जिनसे विभिन्न घटक एक खाते से दूसरे खाते में स्थानांतरित करने के लिए संवाद करते हैं।

1. एक वेब ब्राउज़र एक हस्ताक्षरित लेनदेन सबमिट करता है जो हस्ताक्षरकर्ता के खाते से एक अलग खाते में स्थानांतरण के लिए कहता है।

2. सर्वर यह सत्यापित करता है कि लेनदेन वैध है:

   - हस्ताक्षरकर्ता के पास बैंक में पर्याप्त शेष राशि वाला एक खाता है।
   - प्राप्तकर्ता के पास बैंक में एक खाता है।

3. सर्वर हस्ताक्षरकर्ता की शेष राशि से स्थानांतरित राशि घटाकर और इसे प्राप्तकर्ता की शेष राशि में जोड़कर नए स्टेट की गणना करता है।

4. सर्वर एक ज़ीरो-नॉलेज प्रमाण की गणना करता है कि स्टेट परिवर्तन एक वैध है।

5. सर्वर एथेरियम को एक लेनदेन सबमिट करता है जिसमें शामिल है:

   - नया स्टेट हैश
   - लेनदेन हैश (ताकि लेनदेन भेजने वाला जान सके कि इसे संसाधित किया गया है)
   - ज़ीरो-नॉलेज प्रमाण जो यह साबित करता है कि नए स्टेट में संक्रमण वैध है

6. स्मार्ट अनुबंध ज़ीरो-नॉलेज प्रमाण को सत्यापित करता है।

7. यदि ज़ीरो-नॉलेज प्रमाण सही निकलता है, तो स्मार्ट अनुबंध इन क्रियाओं को करता है:
   - वर्तमान स्टेट हैश को नए स्टेट हैश में अपडेट करें
   - नए स्टेट हैश और लेनदेन हैश के साथ एक लॉग प्रविष्टि उत्सर्जित करें

### उपकरण {#tools}

क्लाइंट-साइड कोड के लिए, हम [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), और [Wagmi](https://wagmi.sh/) का उपयोग करने जा रहे हैं। ये उद्योग-मानक उपकरण हैं; यदि आप इनसे परिचित नहीं हैं, तो आप [इस ट्यूटोरियल](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) का उपयोग कर सकते हैं।

सर्वर का अधिकांश भाग [Node](https://nodejs.org/en) का उपयोग करके JavaScript में लिखा गया है। ज़ीरो-नॉलेज भाग [Noir](https://noir-lang.org/) में लिखा गया है। हमें संस्करण `1.0.0-beta.10` की आवश्यकता है, इसलिए [निर्देशानुसार Noir इंस्टॉल करने](https://noir-lang.org/docs/getting_started/quick_start) के बाद, चलाएँ:

```
noirup -v 1.0.0-beta.10
```

हम जिस ब्लॉकचेन का उपयोग करते हैं वह `anvil` है, जो एक स्थानीय परीक्षण ब्लॉकचेन है जो [Foundry](https://getfoundry.sh/introduction/installation) का हिस्सा है।

## कार्यान्वयन {#implementation}

क्योंकि यह एक जटिल प्रणाली है, हम इसे चरणों में लागू करेंगे।

### चरण 1 - मैनुअल ज़ीरो-नॉलेज {#stage-1}

पहले चरण के लिए, हम ब्राउज़र में एक लेनदेन पर हस्ताक्षर करेंगे और फिर ज़ीरो-नॉलेज प्रमाण को मैन्युअल रूप से जानकारी प्रदान करेंगे। ज़ीरो-नॉलेज कोड को यह जानकारी `server/noir/Prover.toml` में प्राप्त होने की उम्मीद है ([यहां](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) प्रलेखित)।

इसे क्रियान्वित देखने के लिए:

1. सुनिश्चित करें कि आपके पास [Node](https://nodejs.org/en/download) और [Noir](https://noir-lang.org/install) इंस्टॉल हैं। अधिमानतः, उन्हें macOS, Linux, या [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) जैसे UNIX सिस्टम पर इंस्टॉल करें।

2. चरण 1 कोड डाउनलोड करें और क्लाइंट कोड की सेवा के लिए वेब सर्वर शुरू करें।

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   यहां आपको एक वेब सर्वर की आवश्यकता का कारण यह है कि, कुछ प्रकार की धोखाधड़ी को रोकने के लिए, कई वॉलेट (जैसे MetaMask) सीधे डिस्क से परोसी गई फ़ाइलों को स्वीकार नहीं करते हैं

3. वॉलेट के साथ एक ब्राउज़र खोलें।

4. वॉलेट में, एक नया पासफ़्रेज़ दर्ज करें। ध्यान दें कि यह आपके मौजूदा पासफ़्रेज़ को हटा देगा, इसलिए _सुनिश्चित करें कि आपके पास एक बैकअप है_।

   पासफ़्रेज़ `test test test test test test test test test test test junk` है, जो anvil के लिए डिफ़ॉल्ट परीक्षण पासफ़्रेज़ है।

5. [क्लाइंट-साइड कोड](http://localhost:5173/) पर ब्राउज़ करें।

6. वॉलेट से कनेक्ट करें और अपने गंतव्य खाते और राशि का चयन करें।

7. **Sign** पर क्लिक करें और लेनदेन पर हस्ताक्षर करें।

8. **Prover.toml** शीर्षक के अंतर्गत, आपको टेक्स्ट मिलेगा। `server/noir/Prover.toml` को उस टेक्स्ट से बदलें।

9. ज़ीरो-नॉलेज प्रमाण निष्पादित करें।

   ```sh
   cd ../server/noir
   nargo execute
   ```

   आउटपुट इसके समान होना चाहिए

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] सर्किट विटनेस सफलतापूर्वक हल किया गया
   [zkBank] विटनेस को target/zkBank.gz में सहेजा गया
   [zkBank] सर्किट आउटपुट: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. अंतिम दो मानों की तुलना वेब ब्राउज़र पर देखे गए हैश से करें ताकि यह देखा जा सके कि संदेश सही ढंग से हैश किया गया है या नहीं।

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[यह फ़ाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir द्वारा अपेक्षित सूचना प्रारूप दिखाती है।

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

संदेश टेक्स्ट प्रारूप में है, जो उपयोगकर्ता के लिए समझना आसान बनाता है (जो हस्ताक्षर करते समय आवश्यक है) और Noir कोड को पार्स करने के लिए। एक ओर भिन्नात्मक स्थानांतरण को सक्षम करने के लिए, और दूसरी ओर आसानी से पठनीय होने के लिए, राशि को फिनी में उद्धृत किया गया है। अंतिम संख्या [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) है।

स्ट्रिंग 100 वर्ण लंबी है। ज़ीरो-नॉलेज प्रमाण चर-आकार के डेटा को अच्छी तरह से नहीं संभालते हैं, इसलिए अक्सर डेटा को पैड करना आवश्यक होता है।

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

ये तीन पैरामीटर निश्चित आकार के बाइट ऐरे हैं।

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

यह संरचनाओं की एक सरणी निर्दिष्ट करने का तरीका है। प्रत्येक प्रविष्टि के लिए, हम पता, शेष राशि (milliETH a.k.a. में) निर्दिष्ट करते हैं। [फिनी](https://cryptovalleyjournal.com/glossary/finney/)), और अगला नॉन्स मान।

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[यह फ़ाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) क्लाइंट-साइड प्रोसेसिंग को लागू करती है और `server/noir/Prover.toml` फ़ाइल उत्पन्न करती है (वह जिसमें ज़ीरो-नॉलेज पैरामीटर शामिल हैं)।

यहाँ और अधिक दिलचस्प भागों की व्याख्या है।

```tsx
export default attrs =>  {
```

यह फ़ंक्शन `Transfer` React घटक बनाता है, जिसे अन्य फ़ाइलें आयात कर सकती हैं।

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

ये खाता पते हैं, जो `test ...` द्वारा बनाए गए पते हैं। test junk\` पासफ़्रेज़। यदि आप अपने स्वयं के पतों का उपयोग करना चाहते हैं, तो बस इस परिभाषा को संशोधित करें।

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

ये [Wagmi हुक](https://wagmi.sh/react/api/hooks) हमें [viem](https://viem.sh/) लाइब्रेरी और वॉलेट तक पहुंचने देते हैं।

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

यह संदेश है, जिसे रिक्त स्थान से भरा गया है। हर बार जब कोई [`useState`](https://react.dev/reference/react/useState) वेरिएबल बदलता है, तो कंपोनेंट फिर से खींचा जाता है और `message` अपडेट हो जाता है।

```tsx
  const sign = async () => {
```

यह फ़ंक्शन तब कॉल किया जाता है जब उपयोगकर्ता **Sign** बटन पर क्लिक करता है। संदेश स्वचालित रूप से अपडेट हो जाता है, लेकिन हस्ताक्षर के लिए वॉलेट में उपयोगकर्ता की मंजूरी की आवश्यकता होती है, और हम तब तक इसके लिए नहीं पूछना चाहते जब तक कि आवश्यक न हो।

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

वॉलेट से [संदेश पर हस्ताक्षर करने](https://viem.sh/docs/accounts/local/signMessage) के लिए कहें।

```tsx
    const hash = hashMessage(message)
```

संदेश हैश प्राप्त करें। उपयोगकर्ता को डिबगिंग (Noir कोड का) के लिए इसे प्रदान करना सहायक होता है।

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[सार्वजनिक कुंजी प्राप्त करें](https://viem.sh/docs/utilities/recoverPublicKey)। यह [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) फ़ंक्शन के लिए आवश्यक है।

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

स्टेट वेरिएबल्स सेट करें। ऐसा करने से (`sign` फ़ंक्शन से बाहर निकलने के बाद) घटक फिर से खींचा जाता है और उपयोगकर्ता को अद्यतन मान दिखाता है।

```tsx
    let proverToml = `
```

`Prover.toml` के लिए टेक्स्ट।

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem हमें 65-बाइट हेक्साडेसिमल स्ट्रिंग के रूप में सार्वजनिक कुंजी प्रदान करता है। पहला बाइट `0x04` है, जो एक संस्करण मार्कर है। इसके बाद सार्वजनिक कुंजी के `x` के लिए 32 बाइट और फिर सार्वजनिक कुंजी के `y` के लिए 32 बाइट्स हैं।

हालाँकि, Noir को यह जानकारी दो बाइट ऐरे के रूप में प्राप्त करने की उम्मीद है, एक `x` के लिए और एक `y` के लिए। ज़ीरो-नॉलेज प्रमाण के हिस्से के रूप में पार्स करने के बजाय क्लाइंट पर इसे पार्स करना आसान है।

ध्यान दें कि यह सामान्य रूप से ज़ीरो-नॉलेज में एक अच्छा अभ्यास है। ज़ीरो-नॉलेज प्रमाण के अंदर कोड महंगा होता है, इसलिए कोई भी प्रोसेसिंग जो ज़ीरो-नॉलेज प्रमाण के बाहर की जा सकती है, उसे ज़ीरो-नॉलेज प्रमाण के बाहर ही किया जाना चाहिए।

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

हस्ताक्षर भी 65-बाइट हेक्साडेसिमल स्ट्रिंग के रूप में प्रदान किया जाता है। हालाँकि, सार्वजनिक कुंजी को पुनर्प्राप्त करने के लिए अंतिम बाइट केवल आवश्यक है। चूंकि सार्वजनिक कुंजी पहले से ही Noir कोड को प्रदान की जाएगी, इसलिए हमें हस्ताक्षर को सत्यापित करने के लिए इसकी आवश्यकता नहीं है, और Noir कोड को इसकी आवश्यकता नहीं है।

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

खाते प्रदान करें।

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

यह घटक का HTML (अधिक सटीक रूप से, [JSX](https://react.dev/learn/writing-markup-with-jsx)) प्रारूप है।

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[यह फ़ाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) वास्तविक ज़ीरो-नॉलेज कोड है।

```
use std::hash::pedersen_hash;
```

[Pedersen हैश](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) [Noir मानक लाइब्रेरी](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) के साथ प्रदान किया गया है। ज़ीरो-नॉलेज प्रमाण आमतौर पर इस हैश फ़ंक्शन का उपयोग करते हैं। मानक हैश कार्यों की तुलना में [अरिथमैटिक सर्किट](https://rareskills.io/post/arithmetic-circuit) के अंदर गणना करना बहुत आसान है।

```
use keccak256::keccak256;
use dep::ecrecover;
```

ये दो फ़ंक्शन बाहरी लाइब्रेरी हैं, जो [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) में परिभाषित हैं। वे ठीक वही हैं जिसके लिए उनका नाम रखा गया है, एक फ़ंक्शन जो [keccak256 हैश](https://emn178.github.io/online-tools/keccak_256.html) की गणना करता है और एक फ़ंक्शन जो एथेरियम हस्ताक्षर सत्यापित करता है और हस्ताक्षरकर्ता का एथेरियम पता पुनर्प्राप्त करता है।

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir [Rust](https://www.rust-lang.org/) से प्रेरित है। वेरिएबल, डिफ़ॉल्ट रूप से, स्थिरांक होते हैं। इस तरह हम वैश्विक कॉन्फ़िगरेशन स्थिरांक को परिभाषित करते हैं। विशेष रूप से, `ACCOUNT_NUMBER` हमारे द्वारा संग्रहीत खातों की संख्या है।

`u<number>` नामक डेटा प्रकार उस संख्या के बिट्स, अहस्ताक्षरित होते हैं। केवल समर्थित प्रकार `u8`, `u16`, `u32`, `u64`, और `u128` हैं।

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

इस वेरिएबल का उपयोग खातों के पेडरसन हैश के लिए किया जाता है, जैसा कि नीचे बताया गया है।

```
global MESSAGE_LENGTH : u32 = 100;
```

जैसा कि ऊपर बताया गया है, संदेश की लंबाई निश्चित है। यह यहां निर्दिष्ट है।

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 हस्ताक्षर](https://eips.ethereum.org/EIPS/eip-191) के लिए 26-बाइट उपसर्ग वाले बफर की आवश्यकता होती है, जिसके बाद ASCII में संदेश की लंबाई और अंत में संदेश होता है।

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

हम एक खाते के बारे में जो जानकारी संग्रहीत करते हैं। [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) एक संख्या है, जो आमतौर पर 253 बिट तक होती है, जिसका उपयोग सीधे [अरिथमैटिक सर्किट](https://rareskills.io/post/arithmetic-circuit) में किया जा सकता है जो ज़ीरो-नॉलेज प्रमाण को लागू करता है। यहां हम 160-बिट एथेरियम पते को संग्रहीत करने के लिए `Field` का उपयोग करते हैं।

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

स्थानांतरण लेनदेन के लिए हम जो जानकारी संग्रहीत करते हैं।

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

एक फ़ंक्शन परिभाषा। पैरामीटर `Account` जानकारी है। परिणाम `Field` चर की एक सरणी है, जिसकी लंबाई `FLAT_ACCOUNT_FIELDS` है

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

सरणी में पहला मान खाता पता है। दूसरे में शेष राशि और नॉन्स दोनों शामिल हैं। `.into()` कॉल एक संख्या को उस डेटा प्रकार में बदल देती है जो उसे होना चाहिए। `account.nonce` एक `u32` मान है, लेकिन इसे `account.balance << 32`, एक `u128` मान, में जोड़ने के लिए, इसे `u128` होना चाहिए। वह पहला `.into()` है। दूसरा `u128` परिणाम को `Field` में परिवर्तित करता है ताकि यह सरणी में फिट हो जाए।

```
    flat
}
```

Noir में, फ़ंक्शन केवल अंत में एक मान लौटा सकते हैं (कोई जल्दी वापसी नहीं है)। रिटर्न मान निर्दिष्ट करने के लिए, आप इसे फ़ंक्शन के समापन ब्रैकेट से ठीक पहले मूल्यांकन करते हैं।

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

यह फ़ंक्शन खाता सरणी को `Field` सरणी में बदल देता है, जिसे पीटरसन हैश के इनपुट के रूप में उपयोग किया जा सकता है।

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

यह एक परिवर्तनीय चर निर्दिष्ट करने का तरीका है, अर्थात, _नहीं_ एक स्थिरांक। Noir में चरों का हमेशा एक मान होना चाहिए, इसलिए हम इस चर को सभी शून्यों पर आरम्भ करते हैं।

```
    for i in 0..ACCOUNT_NUMBER {
```

यह एक `for` लूप है। ध्यान दें कि सीमाएँ स्थिरांक हैं। Noir लूपों की सीमाएँ संकलन समय पर ज्ञात होनी चाहिए। इसका कारण यह है कि अंकगणितीय परिपथ प्रवाह नियंत्रण का समर्थन नहीं करते हैं। `for` लूप को संसाधित करते समय, कंपाइलर बस इसके अंदर के कोड को कई बार रखता है, प्रत्येक पुनरावृत्ति के लिए एक।

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

अंत में, हम उस फ़ंक्शन पर पहुँचे जो खाता सरणी को हैश करता है।

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

यह फ़ंक्शन एक विशिष्ट पते के साथ खाता ढूंढता है। यह फ़ंक्शन मानक कोड में बहुत अक्षम होगा क्योंकि यह सभी खातों पर पुनरावृति करता है, भले ही उसने पता ढूंढ लिया हो।

हालाँकि, ज़ीरो-नॉलेज प्रमाणों में, कोई प्रवाह नियंत्रण नहीं होता है। अगर हमें कभी कोई शर्त जाँचने की ज़रूरत पड़ती है, तो हमें उसे हर बार जाँचना पड़ता है।

`if` कथनों के साथ भी कुछ ऐसा ही होता है। ऊपर दिए गए लूप में `if` कथन को इन गणितीय कथनों में अनुवादित किया गया है।

_condition<sub>result</sub> = accounts[i].address == address_ // एक यदि वे बराबर हैं, अन्यथा शून्य

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) फ़ंक्शन ज़ीरो-नॉलेज प्रमाण को क्रैश कर देता है यदि अभिकथन झूठा है। इस मामले में, यदि हमें संबंधित पते के साथ कोई खाता नहीं मिल पाता है। पते की रिपोर्ट करने के लिए, हम एक [प्रारूप स्ट्रिंग](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) का उपयोग करते हैं।

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

यह फ़ंक्शन एक स्थानांतरण लेनदेन लागू करता है और नई खाता सरणी लौटाता है।

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

हम Noir में एक प्रारूप स्ट्रिंग के अंदर संरचना तत्वों तक नहीं पहुंच सकते हैं, इसलिए हम एक प्रयोग करने योग्य प्रतिलिपि बनाते हैं।

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

ये दो शर्तें हैं जो एक लेनदेन को अमान्य कर सकती हैं।

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

नई खाता सरणी बनाएँ और फिर उसे लौटाएँ।

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

यह फ़ंक्शन संदेश से पता पढ़ता है।

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

पता हमेशा 20 बाइट (a.k.a.) लंबा होता है। 40 हेक्साडेसिमल अंक) लंबा, और वर्ण #7 से शुरू होता है।

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

संदेश से राशि और नॉन्स पढ़ें।

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

संदेश में, पते के बाद पहली संख्या फिनी की राशि है (a.k.a.) स्थानांतरित करने के लिए ETH का हज़ारवां हिस्सा)। दूसरी संख्या नॉन्स है। उनके बीच के किसी भी पाठ को अनदेखा कर दिया जाता है।

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // हम बस इसे पा चुके हैं
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

[टपल](https://noir-lang.org/docs/noir/concepts/data_types/tuples) लौटाना एक फ़ंक्शन से कई मान लौटाने का Noir तरीका है।

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

यह फ़ंक्शन संदेश को बाइट्स में परिवर्तित करता है, फिर राशियों को `TransferTxn` में परिवर्तित करता है।

```rust
// Viem के hashMessage के समतुल्य
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

हम खातों के लिए पेडरसन हैश का उपयोग करने में सक्षम थे क्योंकि वे केवल ज़ीरो-नॉलेज प्रमाण के अंदर हैश किए जाते हैं। हालाँकि, इस कोड में हमें संदेश के हस्ताक्षर की जाँच करने की आवश्यकता है, जो ब्राउज़र द्वारा उत्पन्न होता है। इसके लिए, हमें [EIP 191](https://eips.ethereum.org/EIPS/eip-191) में एथेरियम हस्ताक्षर प्रारूप का पालन करना होगा। इसका मतलब है कि हमें एक मानक उपसर्ग, ASCII में संदेश की लंबाई और स्वयं संदेश के साथ एक संयुक्त बफर बनाने की आवश्यकता है, और इसे हैश करने के लिए एथेरियम मानक keccak256 का उपयोग करना होगा।

```rust
    // ASCII उपसर्ग
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

ऐसे मामलों से बचने के लिए जहां कोई एप्लिकेशन उपयोगकर्ता से ऐसे संदेश पर हस्ताक्षर करने के लिए कहता है जिसका उपयोग लेनदेन के रूप में या किसी अन्य उद्देश्य के लिए किया जा सकता है, EIP 191 निर्दिष्ट करता है कि सभी हस्ताक्षरित संदेश वर्ण 0x19 (एक मान्य ASCII वर्ण नहीं) से शुरू होते हैं, जिसके बाद `Ethereum Signed Message:` और एक नई पंक्ति आती है।

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

    assert(MESSAGE_LENGTH < 1000, "तीन अंकों से अधिक लंबाई वाले संदेश समर्थित नहीं हैं");
```

999 तक संदेश की लंबाई को संभालें और यदि यह अधिक है तो विफल हो जाएं। मैंने यह कोड जोड़ा है, भले ही संदेश की लंबाई एक स्थिरांक है, क्योंकि इससे इसे बदलना आसान हो जाता है। एक उत्पादन प्रणाली पर, आप बेहतर प्रदर्शन के लिए शायद यह मान लेंगे कि `MESSAGE_LENGTH` नहीं बदलता है।

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

एथेरियम मानक `keccak256` फ़ंक्शन का उपयोग करें।

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // पता, हैश का पहला 16 बाइट, हैश का अंतिम 16 बाइट        
{
```

यह फ़ंक्शन हस्ताक्षर को सत्यापित करता है, जिसके लिए संदेश हैश की आवश्यकता होती है। फिर यह हमें वह पता प्रदान करता है जिसने इस पर हस्ताक्षर किया है और संदेश हैश। संदेश हैश को दो `Field` मानों में प्रदान किया जाता है क्योंकि वे बाइट सरणी की तुलना में प्रोग्राम के बाकी हिस्सों में उपयोग करना आसान होते हैं।

हमें दो `Field` मानों का उपयोग करने की आवश्यकता है क्योंकि फ़ील्ड गणना एक बड़ी संख्या के [मॉड्यूलो](https://en.wikipedia.org/wiki/Modulo) की जाती है, लेकिन वह संख्या आमतौर पर 256 बिट से कम होती है (अन्यथा EVM में उन गणनाओं को करना मुश्किल होगा)।

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` और `hash2` को परिवर्तनीय चर के रूप में निर्दिष्ट करें, और बाइट दर बाइट उनमें हैश लिखें।

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

यह [Solidity के `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) के समान है, जिसमें दो महत्वपूर्ण अंतर हैं:

- यदि हस्ताक्षर मान्य नहीं है, तो कॉल एक `assert` विफल कर देता है और प्रोग्राम निरस्त हो जाता है।
- हालांकि सार्वजनिक कुंजी को हस्ताक्षर और हैश से पुनर्प्राप्त किया जा सकता है, यह प्रसंस्करण बाह्य रूप से किया जा सकता है और, इसलिए, ज़ीरो-नॉलेज प्रमाण के अंदर करने लायक नहीं है। यदि कोई हमें यहां धोखा देने की कोशिश करता है, तो हस्ताक्षर सत्यापन विफल हो जाएगा।

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
        Field,  // पुराने खाता सरणी का हैश
        Field,  // नए खाता सरणी का हैश
        Field,  // संदेश हैश का पहला 16 बाइट
        Field,  // संदेश हैश का अंतिम 16 बाइट
    )
```

अंत में, हम `main` फ़ंक्शन पर पहुँचते हैं। हमें यह साबित करने की आवश्यकता है कि हमारे पास एक लेनदेन है जो खातों के हैश को पुराने मान से नए में वैध रूप से बदलता है। हमें यह भी साबित करने की आवश्यकता है कि इसका यह विशिष्ट लेनदेन हैश है ताकि जिसने इसे भेजा है वह जान सके कि उनके लेनदेन को संसाधित कर लिया गया है।

```rust
{
    let mut txn = readTransferTxn(message);
```

हमें `txn` को परिवर्तनीय होने की आवश्यकता है क्योंकि हम संदेश से से पता नहीं पढ़ते हैं, हम इसे हस्ताक्षर से पढ़ते हैं।

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

### चरण 2 - एक सर्वर जोड़ना {#stage-2}

दूसरे चरण में, हम एक सर्वर जोड़ते हैं जो ब्राउज़र से स्थानांतरण लेनदेन प्राप्त करता है और लागू करता है।

इसे क्रियान्वित देखने के लिए:

1. Vite को रोकें यदि यह चल रहा है।

2. सर्वर वाली शाखा डाउनलोड करें और सुनिश्चित करें कि आपके पास सभी आवश्यक मॉड्यूल हैं।

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir कोड को संकलित करने की कोई आवश्यकता नहीं है, यह वही कोड है जिसका उपयोग आपने चरण 1 के लिए किया था।

3. सर्वर शुरू करें।

   ```sh
   npm run start
   ```

4. एक अलग कमांड-लाइन विंडो में, ब्राउज़र कोड की सेवा के लिए Vite चलाएँ।

   ```sh
   cd client
   npm run dev
   ```

5. क्लाइंट कोड को [http://localhost:5173](http://localhost:5173) पर ब्राउज़ करें

6. लेनदेन जारी करने से पहले, आपको नॉन्स के साथ-साथ वह राशि भी जाननी होगी जो आप भेज सकते हैं। यह जानकारी प्राप्त करने के लिए, **Update account data** पर क्लिक करें और संदेश पर हस्ताक्षर करें।

   यहाँ हमारे सामने एक दुविधा है। एक ओर, हम ऐसे संदेश पर हस्ताक्षर नहीं करना चाहते हैं जिसका पुन: उपयोग किया जा सके ([रीप्ले हमला](https://en.wikipedia.org/wiki/Replay_attack)), यही कारण है कि हम पहली बार में एक नॉन्स चाहते हैं। हालाँकि, हमारे पास अभी तक कोई नॉन्स नहीं है। इसका समाधान एक ऐसा नॉन्स चुनना है जिसका उपयोग केवल एक बार किया जा सके और जो हमारे पास दोनों तरफ पहले से ही है, जैसे कि वर्तमान समय।

   इस समाधान के साथ समस्या यह है कि समय पूरी तरह से सिंक्रनाइज़ नहीं हो सकता है। तो इसके बजाय, हम एक ऐसे मान पर हस्ताक्षर करते हैं जो हर मिनट बदलता है। इसका मतलब है कि रीप्ले हमलों के प्रति हमारी भेद्यता की खिड़की अधिकतम एक मिनट है। यह देखते हुए कि उत्पादन में हस्ताक्षरित अनुरोध TLS द्वारा संरक्षित होगा, और सुरंग के दूसरी तरफ - सर्वर - पहले से ही शेष राशि और नॉन्स का खुलासा कर सकता है (उसे काम करने के लिए उन्हें जानना होगा), यह एक स्वीकार्य जोखिम है।

7. एक बार जब ब्राउज़र को शेष राशि और नॉन्स वापस मिल जाते हैं, तो यह स्थानांतरण फ़ॉर्म दिखाता है। गंतव्य पता और राशि चुनें और **Transfer** पर क्लिक करें। इस अनुरोध पर हस्ताक्षर करें।

8. स्थानांतरण देखने के लिए, या तो **Update account data** या उस विंडो में देखें जहां आप सर्वर चलाते हैं। सर्वर हर बार बदलने पर स्टेट को लॉग करता है।

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    पोर्ट 3000 पर सुनना
    Txn भेजें 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 फ़िन्नी (milliEth) 0 संसाधित
    नई स्टेट:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 के पास 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 के पास 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC के पास 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 के पास 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 के पास 100000 (0)
    Txn भेजें 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 फ़िन्नी (milliEth) 1 संसाधित
    नई स्टेट:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 के पास 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 के पास 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC के पास 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 के पास 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 के पास 100000 (0)
    Txn भेजें 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 फ़िन्नी (milliEth) 2 संसाधित
    नई स्टेट:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 के पास 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 के पास 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC के पास 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 के पास 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 के पास 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[यह फ़ाइल](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) में सर्वर प्रक्रिया शामिल है, और [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) पर Noir कोड के साथ इंटरैक्ट करती है। यहाँ दिलचस्प भागों की व्याख्या है।

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) लाइब्रेरी JavaScript कोड और Noir कोड के बीच इंटरफ़ेस करती है।

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

अरिथमैटिक सर्किट लोड करें—संकलित Noir प्रोग्राम जिसे हमने पिछले चरण में बनाया था—और इसे निष्पादित करने की तैयारी करें।

```js
// हम केवल एक हस्ताक्षरित अनुरोध के जवाब में खाता जानकारी प्रदान करते हैं
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("खाता डेटा प्राप्त करें " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

खाता जानकारी प्रदान करने के लिए, हमें केवल हस्ताक्षर की आवश्यकता है। कारण यह है कि हम पहले से ही जानते हैं कि संदेश क्या होने वाला है, और इसलिए संदेश हैश।

```js
const processMessage = async (message, signature) => {
```

एक संदेश को संसाधित करें और उस लेनदेन को निष्पादित करें जिसे वह एन्कोड करता है।

```js
    // सार्वजनिक कुंजी प्राप्त करें
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

अब जब हम सर्वर पर JavaScript चलाते हैं, तो हम क्लाइंट के बजाय वहां सार्वजनिक कुंजी पुनर्प्राप्त कर सकते हैं।

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

`noir.execute` Noir प्रोग्राम चलाता है। पैरामीटर [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) में प्रदान किए गए लोगों के बराबर हैं। ध्यान दें कि लंबे मान हेक्साडेसिमल स्ट्रिंग्स (`["0x60", "0xA7"]`) की एक सरणी के रूप में प्रदान किए जाते हैं, न कि एकल हेक्साडेसिमल मान (`0x60A7`) के रूप में, जिस तरह से Viem इसे करता है।

```js
    } catch (err) {
        console.log(`Noir त्रुटि: ${err}`)
        throw Error("अमान्य लेनदेन, संसाधित नहीं हुआ")
    }
```

यदि कोई त्रुटि है, तो उसे पकड़ें और फिर क्लाइंट को एक सरलीकृत संस्करण रिले करें।

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

लेनदेन लागू करें। हमने इसे पहले ही Noir कोड में कर लिया है, लेकिन परिणाम को वहां से निकालने के बजाय इसे यहां फिर से करना आसान है।

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

प्रारंभिक `Accounts` संरचना।

### चरण 3 - एथेरियम स्मार्ट अनुबंध {#stage-3}

1. सर्वर और क्लाइंट प्रक्रियाओं को रोकें।

2. स्मार्ट अनुबंधों के साथ शाखा डाउनलोड करें और सुनिश्चित करें कि आपके पास सभी आवश्यक मॉड्यूल हैं।

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. एक अलग कमांड-लाइन विंडो में `anvil` चलाएँ।

4. सत्यापन कुंजी और सॉलिडिटी सत्यापनकर्ता उत्पन्न करें, फिर सत्यापनकर्ता कोड को सॉलिडिटी परियोजना में कॉपी करें।

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. स्मार्ट अनुबंधों पर जाएं और `anvil` ब्लॉकचेन का उपयोग करने के लिए पर्यावरण चर सेट करें।

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol` को परिनियोजित करें और पते को एक पर्यावरण चर में संग्रहीत करें।

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` अनुबंध को परिनियोजित करें।

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` मान `Accounts` की प्रारंभिक स्टेट का पेडरसन हैश है। यदि आप `server/index.mjs` में इस प्रारंभिक स्टेट को संशोधित करते हैं, तो आप ज़ीरो-नॉलेज प्रमाण द्वारा रिपोर्ट किए गए प्रारंभिक हैश को देखने के लिए एक लेनदेन चला सकते हैं।

8. सर्वर चलाएँ।

   ```sh
   cd ../server
   npm run start
   ```

9. क्लाइंट को एक अलग कमांड-लाइन विंडो में चलाएँ।

   ```sh
   cd client
   npm run dev
   ```

10. कुछ लेनदेन चलाएँ।

11. यह सत्यापित करने के लिए कि स्टेट ऑन-चेन बदल गया है, सर्वर प्रक्रिया को पुनरारंभ करें। देखें कि `ZkBank` अब लेनदेन स्वीकार नहीं करता है, क्योंकि लेनदेन में मूल हैश मान ऑन-चेन संग्रहीत हैश मान से भिन्न होता है।

    यह अपेक्षित प्रकार की त्रुटि है।

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    पोर्ट 3000 पर सुनना
    सत्यापन त्रुटि: ContractFunctionExecutionError: अनुबंध फ़ंक्शन "processTransaction" निम्नलिखित कारण से वापस आ गया:
    गलत पुराना स्टेट हैश

    अनुबंध कॉल:
        पता:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        फ़ंक्शन:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        आर्ग्स:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

इस फ़ाइल में परिवर्तन ज्यादातर वास्तविक प्रमाण बनाने और इसे ऑन-चेन जमा करने से संबंधित हैं।

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

हमें वास्तविक प्रमाण बनाने के लिए [बैरटेनबर्ग पैकेज](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) का उपयोग करने की आवश्यकता है जिसे ऑन-चेन भेजना है। हम इस पैकेज का उपयोग या तो कमांड-लाइन इंटरफ़ेस (`bb`) चलाकर या [JavaScript लाइब्रेरी, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) का उपयोग करके कर सकते हैं। JavaScript लाइब्रेरी मूल रूप से कोड चलाने की तुलना में बहुत धीमी है, इसलिए हम कमांड-लाइन का उपयोग करने के लिए यहां [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) का उपयोग करते हैं।

ध्यान दें कि यदि आप `bb.js` का उपयोग करने का निर्णय लेते हैं, तो आपको एक ऐसे संस्करण का उपयोग करने की आवश्यकता है जो आपके द्वारा उपयोग किए जा रहे Noir के संस्करण के साथ संगत हो। लिखने के समय, वर्तमान Noir संस्करण (1.0.0-beta.11) `bb.js` संस्करण 0.87 का उपयोग करता है।

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

यहां का पता वह है जो आपको तब मिलता है जब आप एक साफ `anvil` से शुरू करते हैं और उपरोक्त निर्देशों का पालन करते हैं।

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

यह निजी कुंजी `anvil` में डिफ़ॉल्ट पूर्व-वित्तपोषित खातों में से एक है।

```js
const generateProof = async (witness, fileID) => {
```

`bb` निष्पादन योग्य का उपयोग करके एक प्रमाण उत्पन्न करें।

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

साक्षी को एक फ़ाइल में लिखें।

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

वास्तव में प्रमाण बनाएँ। यह चरण सार्वजनिक चर वाली एक फ़ाइल भी बनाता है, लेकिन हमें इसकी आवश्यकता नहीं है। हमें वे चर `noir.execute` से पहले ही मिल गए थे।

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

प्रमाण `Field` मानों का एक JSON सरणी है, जिनमें से प्रत्येक को एक हेक्साडेसिमल मान के रूप में दर्शाया गया है। हालाँकि, हमें इसे लेनदेन में एकल `bytes` मान के रूप में भेजने की आवश्यकता है, जिसे Viem एक बड़ी हेक्साडेसिमल स्ट्रिंग द्वारा दर्शाता है। यहां हम सभी मानों को जोड़कर, सभी `0x` को हटाकर और फिर अंत में एक जोड़कर प्रारूप बदलते हैं।

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

सफाई करें और प्रमाण लौटाएं।

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

सार्वजनिक फ़ील्ड को 32-बाइट मानों की एक सरणी होनी चाहिए। हालाँकि, चूँकि हमें लेन-देन हैश को दो `Field` मानों के बीच विभाजित करने की आवश्यकता थी, यह 16-बाइट मान के रूप में दिखाई देता है। यहां हम शून्य जोड़ते हैं ताकि Viem समझ सके कि यह वास्तव में 32 बाइट है।

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

प्रत्येक पता प्रत्येक नॉन्स का उपयोग केवल एक बार करता है ताकि हम साक्षी फ़ाइल और आउटपुट निर्देशिका के लिए एक अद्वितीय पहचानकर्ता के रूप में `fromAddress` और `nonce` के संयोजन का उपयोग कर सकें।

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`सत्यापन त्रुटि: ${err}`)
        throw Error("लेनदेन को ऑनचेन सत्यापित नहीं कर सकते")
    }
    .
    .
    .
}
```

श्रृंखला में लेनदेन भेजें।

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

यह ऑन-चेन कोड है जो लेनदेन प्राप्त करता है।

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

ऑन-चेन कोड को दो चरों का ट्रैक रखने की आवश्यकता है: सत्यापनकर्ता (एक अलग अनुबंध जो `nargo` द्वारा बनाया गया है) और वर्तमान स्टेट हैश।

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

हर बार जब स्टेट बदलता है, तो हम एक `TransactionProcessed` इवेंट उत्सर्जित करते हैं।

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

यह फ़ंक्शन लेनदेन को संसाधित करता है। यह प्रमाण ( `बाइट्स` के रूप में) और सार्वजनिक इनपुट (`बाइट्स32` सरणी के रूप में) प्राप्त करता है, उस प्रारूप में जो सत्यापनकर्ता की आवश्यकता होती है (ऑन-चेन प्रसंस्करण को कम करने और इसलिए गैस लागत को कम करने के लिए)।

```solidity
        require(_publicInputs[0] == currentStateHash,
            "गलत पुराना स्टेट हैश");
```

ज़ीरो-नॉलेज प्रमाण यह होना चाहिए कि लेनदेन हमारे वर्तमान हैश से एक नए में बदल जाता है।

```solidity
        myVerifier.verify(_proof, _publicFields);
```

ज़ीरो-नॉलेज प्रमाण को सत्यापित करने के लिए सत्यापनकर्ता अनुबंध को कॉल करें। यह चरण लेनदेन को वापस कर देता है यदि ज़ीरो-नॉलेज प्रमाण गलत है।

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

यदि सब कुछ सही हो जाता है, तो स्टेट हैश को नए मान में अपडेट करें और `TransactionProcessed` इवेंट उत्सर्जित करें।

## केंद्रीकृत घटक द्वारा दुरुपयोग {#abuses}

सूचना सुरक्षा में तीन विशेषताएँ होती हैं:

- _गोपनीयता_, उपयोगकर्ता उस जानकारी को नहीं पढ़ सकते हैं जिसे पढ़ने के लिए वे अधिकृत नहीं हैं।
- _अखंडता_, जानकारी को अधिकृत उपयोगकर्ताओं द्वारा अधिकृत तरीके से छोड़कर नहीं बदला जा सकता है।
- _उपलब्धता_, अधिकृत उपयोगकर्ता प्रणाली का उपयोग कर सकते हैं।

इस प्रणाली पर, ज़ीरो-नॉलेज प्रमाणों के माध्यम से अखंडता प्रदान की जाती है। उपलब्धता की गारंटी देना बहुत कठिन है, और गोपनीयता असंभव है, क्योंकि बैंक को प्रत्येक खाते की शेष राशि और सभी लेनदेन जानने होंगे। ऐसी किसी इकाई को जो जानकारी रखती है, उसे उस जानकारी को साझा करने से रोकने का कोई तरीका नहीं है।

हो सकता है कि [स्टील्थ एड्रेस](https://vitalik.eth.limo/general/2023/01/20/stealth.html) का उपयोग करके वास्तव में गोपनीय बैंक बनाना संभव हो, लेकिन यह इस लेख के दायरे से बाहर है।

### गलत जानकारी {#false-info}

एक तरीका जिससे सर्वर अखंडता का उल्लंघन कर सकता है, वह है जब [डेटा का अनुरोध किया जाता है](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) तो गलत जानकारी प्रदान करना।

इसे हल करने के लिए, हम एक दूसरा Noir प्रोग्राम लिख सकते हैं जो खातों को एक निजी इनपुट के रूप में और उस पते को जिसके लिए जानकारी का अनुरोध किया गया है, एक सार्वजनिक इनपुट के रूप में प्राप्त करता है। आउटपुट उस पते की शेष राशि और नॉन्स है, और खातों का हैश है।

बेशक, इस प्रमाण को ऑन-चेन सत्यापित नहीं किया जा सकता है, क्योंकि हम ऑन-चेन नॉन्स और शेष राशि पोस्ट नहीं करना चाहते हैं। हालाँकि, इसे ब्राउज़र में चलने वाले क्लाइंट कोड द्वारा सत्यापित किया जा सकता है।

### जबरन लेनदेन {#forced-txns}

L2s पर उपलब्धता सुनिश्चित करने और सेंसरशिप को रोकने का सामान्य तंत्र [जबरन लेनदेन](https://docs.optimism.io/stack/transactions/forced-transaction) है। लेकिन जबरन लेनदेन ज़ीरो-नॉलेज प्रमाणों के साथ संयुक्त नहीं होते हैं। सर्वर ही एकमात्र इकाई है जो लेनदेन को सत्यापित कर सकती है।

हम जबरन लेनदेन स्वीकार करने के लिए `smart-contracts/src/ZkBank.sol` को संशोधित कर सकते हैं और सर्वर को स्टेट बदलने से रोक सकते हैं जब तक कि वे संसाधित न हो जाएं। हालाँकि, यह हमें एक सरल सेवा-से-इनकार हमले के लिए खोलता है। क्या होगा यदि एक जबरन लेनदेन अमान्य है और इसलिए संसाधित करना असंभव है?

इसका समाधान यह है कि एक ज़ीरो-नॉलेज प्रमाण हो कि एक जबरन लेनदेन अमान्य है। यह सर्वर को तीन विकल्प देता है:

- जबरन लेनदेन को संसाधित करें, यह साबित करते हुए एक ज़ीरो-नॉलेज प्रमाण प्रदान करें कि इसे संसाधित किया गया है और नया स्टेट हैश।
- जबरन लेनदेन को अस्वीकार करें, और अनुबंध को एक ज़ीरो-नॉलेज प्रमाण प्रदान करें कि लेनदेन अमान्य है (अज्ञात पता, खराब नॉन्स, या अपर्याप्त शेष राशि)।
- जबरन लेनदेन को अनदेखा करें। सर्वर को वास्तव में लेनदेन को संसाधित करने के लिए मजबूर करने का कोई तरीका नहीं है, लेकिन इसका मतलब है कि पूरी प्रणाली अनुपलब्ध है।

#### उपलब्धता बॉन्ड {#avail-bonds}

वास्तविक जीवन के कार्यान्वयन में, सर्वर को चालू रखने के लिए शायद किसी प्रकार का लाभ का मकसद होगा। हम इस प्रोत्साहन को सर्वर द्वारा एक उपलब्धता बॉन्ड पोस्ट करके मजबूत कर सकते हैं जिसे कोई भी जला सकता है यदि एक निश्चित अवधि के भीतर एक जबरन लेनदेन संसाधित नहीं होता है।

### खराब Noir कोड {#bad-noir-code}

आम तौर पर, लोगों को एक स्मार्ट अनुबंध पर भरोसा करने के लिए हम स्रोत कोड को [ब्लॉक एक्सप्लोरर](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) पर अपलोड करते हैं। हालाँकि, ज़ीरो-नॉलेज प्रमाणों के मामले में, यह अपर्याप्त है।

`Verifier.sol` में सत्यापन कुंजी होती है, जो Noir प्रोग्राम का एक फ़ंक्शन है। हालाँकि, वह कुंजी हमें यह नहीं बताती कि Noir प्रोग्राम क्या था। वास्तव में एक विश्वसनीय समाधान के लिए, आपको Noir प्रोग्राम (और वह संस्करण जिसने इसे बनाया है) अपलोड करना होगा। अन्यथा, ज़ीरो-नॉलेज प्रमाण एक अलग प्रोग्राम को प्रतिबिंबित कर सकते हैं, जिसमें एक बैक डोर हो।

जब तक ब्लॉक एक्सप्लोरर हमें Noir प्रोग्राम अपलोड और सत्यापित करने की अनुमति देना शुरू नहीं करते, तब तक आपको इसे स्वयं करना चाहिए (अधिमानतः [IPFS](/developers/tutorials/ipfs-decentralized-ui/) पर)। फिर परिष्कृत उपयोगकर्ता स्रोत कोड डाउनलोड करने, इसे स्वयं संकलित करने, `Verifier.sol` बनाने और यह सत्यापित करने में सक्षम होंगे कि यह ऑन-चेन वाले के समान है।

## निष्कर्ष {#conclusion}

प्लाज्मा-प्रकार के अनुप्रयोगों को सूचना भंडारण के रूप में एक केंद्रीकृत घटक की आवश्यकता होती है। यह संभावित कमजोरियों को खोलता है, लेकिन बदले में, हमें उन तरीकों से गोपनीयता बनाए रखने की अनुमति देता है जो स्वयं ब्लॉकचेन पर उपलब्ध नहीं हैं। ज़ीरो-नॉलेज प्रमाणों के साथ हम अखंडता सुनिश्चित कर सकते हैं और संभवतः केंद्रीकृत घटक को चलाने वाले किसी भी व्यक्ति के लिए उपलब्धता बनाए रखने के लिए इसे आर्थिक रूप से लाभप्रद बना सकते हैं।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।

## आभार {#acknowledgements}

- जोश क्राइट्स ने इस लेख का एक मसौदा पढ़ा और एक कांटेदार Noir मुद्दे पर मेरी मदद की।

कोई भी शेष त्रुटि मेरी जिम्मेदारी है।
