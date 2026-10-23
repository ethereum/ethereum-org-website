---
title: "गोपनीयता को सुरक्षित रखने वाला ऐप-विशिष्ट प्लाज्मा लिखें"
description: "इस ट्यूटोरियल में, हम जमा के लिए एक अर्ध-गुप्त (semi-secret) बैंक बनाते हैं। बैंक एक केंद्रीकृत घटक है; यह प्रत्येक उपयोगकर्ता का बैलेंस जानता है। हालाँकि, यह जानकारी ऑनचेन स्टोर नहीं की जाती है। इसके बजाय, बैंक स्थिति (state) का एक हैश पोस्ट करता है। हर बार जब कोई लेन-देन होता है, तो बैंक नया हैश पोस्ट करता है, साथ ही एक शून्य-ज्ञान प्रमाण (zero-knowledge proof) भी देता है कि उसके पास एक हस्ताक्षरित लेन-देन है जो हैश स्थिति को नई स्थिति में बदल देता है। इस ट्यूटोरियल को पढ़ने के बाद, आप न केवल यह समझेंगे कि शून्य-ज्ञान प्रमाणों का उपयोग कैसे किया जाता है, बल्कि यह भी कि आप उनका उपयोग क्यों करते हैं और ऐसा सुरक्षित रूप से कैसे करें।"
author: "ओरी पोमेरेंट्ज़"
tags:
  - शून्य-ज्ञान
  - सर्वर
  - ऑफचेन
  - गोपनीयता
skill: advanced
breadcrumb: "ऐप-विशिष्ट प्लाज्मा"
lang: hi
published: 2025-10-15
---

## परिचय {#introduction}

[रोलअप्स](/developers/docs/scaling/zk-rollups/) के विपरीत, [प्लाज्मा](/developers/docs/scaling/plasma) अखंडता (integrity) के लिए इथेरियम मेननेट का उपयोग करते हैं, लेकिन उपलब्धता (availability) के लिए नहीं। इस लेख में, हम एक ऐसा एप्लिकेशन लिखते हैं जो प्लाज्मा की तरह व्यवहार करता है, जिसमें इथेरियम अखंडता (बिना अनुमति के कोई बदलाव नहीं) की गारंटी देता है, लेकिन उपलब्धता (एक केंद्रीकृत घटक खराब हो सकता है और पूरे सिस्टम को अक्षम कर सकता है) की नहीं।

हम यहाँ जो एप्लिकेशन लिख रहे हैं वह एक गोपनीयता-संरक्षित बैंक है। विभिन्न पतों (addresses) के बैलेंस वाले खाते होते हैं, और वे अन्य खातों में पैसे (ETH) भेज सकते हैं। बैंक स्थिति (खाते और उनके बैलेंस) और लेन-देन के हैश को पोस्ट करता है, लेकिन वास्तविक बैलेंस को ऑफचेन रखता है जहां वे निजी रह सकते हैं।

## डिज़ाइन {#design}

यह उत्पादन के लिए तैयार (production-ready) सिस्टम नहीं है, बल्कि एक शिक्षण उपकरण है। इसलिए, इसे कई सरल मान्यताओं के साथ लिखा गया है।

- निश्चित खाता पूल। खातों की एक विशिष्ट संख्या है, और प्रत्येक खाता एक पूर्व निर्धारित पते से संबंधित है। यह एक बहुत ही सरल सिस्टम बनाता है क्योंकि शून्य-ज्ञान प्रमाणों में परिवर्तनीय-आकार (variable-sized) की डेटा संरचनाओं को संभालना मुश्किल होता है। उत्पादन के लिए तैयार सिस्टम के लिए, हम स्थिति हैश के रूप में [मर्कल रूट](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) का उपयोग कर सकते हैं और आवश्यक बैलेंस के लिए मर्कल प्रमाण प्रदान कर सकते हैं।

- मेमोरी स्टोरेज। उत्पादन सिस्टम पर, हमें पुनरारंभ (restart) होने की स्थिति में उन्हें संरक्षित करने के लिए डिस्क पर सभी खाते के बैलेंस लिखने की आवश्यकता होती है। यहाँ, यह ठीक है यदि जानकारी आसानी से खो जाती है।

- केवल ट्रांसफर। एक उत्पादन सिस्टम को बैंक में संपत्ति जमा करने और उन्हें निकालने के तरीके की आवश्यकता होगी। लेकिन यहाँ उद्देश्य केवल अवधारणा को स्पष्ट करना है, इसलिए यह बैंक केवल ट्रांसफर तक ही सीमित है।

### शून्य-ज्ञान प्रमाण {#zero-knowledge-proofs}

बुनियादी स्तर पर, एक शून्य-ज्ञान प्रमाण यह दर्शाता है कि प्रमाणक कुछ डेटा, _Data<sub>private</sub>_ जानता है, जिससे कुछ सार्वजनिक डेटा, _Data<sub>public</sub>_, और _Data<sub>private</sub>_ के बीच एक संबंध _Relationship_ है। सत्यापनकर्ता _Relationship_ और _Data<sub>public</sub>_ को जानता है।

गोपनीयता को बनाए रखने के लिए, हमें स्थितियों और लेन-देन को निजी रखने की आवश्यकता है। लेकिन अखंडता सुनिश्चित करने के लिए, हमें स्थितियों के [क्रिप्टोग्राफिक हैश](https://en.wikipedia.org/wiki/Cryptographic_hash_function) को सार्वजनिक करने की आवश्यकता है। जो लोग लेन-देन सबमिट करते हैं उन्हें यह साबित करने के लिए कि वे लेन-देन वास्तव में हुए थे, हमें लेनदेन हैश भी पोस्ट करने की आवश्यकता है।

ज्यादातर मामलों में, _Data<sub>private</sub>_ शून्य-ज्ञान प्रमाण प्रोग्राम का इनपुट है, और _Data<sub>public</sub>_ आउटपुट है।

_Data<sub>private</sub>_ में ये फ़ील्ड हैं:

- _State<sub>n</sub>_, पुरानी स्थिति
- _State<sub>n+1</sub>_, नई स्थिति
- _Transaction_, एक लेन-देन जो पुरानी स्थिति से नई स्थिति में बदलता है। इस लेन-देन में ये फ़ील्ड शामिल होने चाहिए:
  - _Destination address_ जो ट्रांसफर प्राप्त करता है
  - _Amount_ जिसे ट्रांसफर किया जा रहा है
  - _Nonce_ यह सुनिश्चित करने के लिए कि प्रत्येक लेन-देन को केवल एक बार प्रोसेस किया जा सके।
    लेन-देन में स्रोत पते का होना आवश्यक नहीं है, क्योंकि इसे हस्ताक्षर से प्राप्त किया जा सकता है।
- _Signature_, एक हस्ताक्षर जो लेन-देन करने के लिए अधिकृत है। हमारे मामले में, लेन-देन करने के लिए अधिकृत एकमात्र पता स्रोत पता है। क्योंकि हमारा शून्य-ज्ञान सिस्टम जिस तरह से काम करता है, हमें इथेरियम हस्ताक्षर के अलावा, खाते की सार्वजनिक कुंजी की भी आवश्यकता होती है।

_Data<sub>public</sub>_ में ये फ़ील्ड हैं:

- _Hash(State<sub>n</sub>)_ पुरानी स्थिति का हैश
- _Hash(State<sub>n+1</sub>)_ नई स्थिति का हैश
- _Hash(Transaction)_ उस लेन-देन का हैश जो स्थिति को _State<sub>n</sub>_ से _State<sub>n+1</sub>_ में बदलता है।

संबंध कई शर्तों की जाँच करता है:

- सार्वजनिक हैश वास्तव में निजी फ़ील्ड के लिए सही हैश हैं।
- लेन-देन, जब पुरानी स्थिति पर लागू होता है, तो नई स्थिति में परिणाम देता है।
- हस्ताक्षर लेन-देन के स्रोत पते से आता है।

क्रिप्टोग्राफिक हैश फ़ंक्शंस के गुणों के कारण, इन शर्तों को साबित करना अखंडता सुनिश्चित करने के लिए पर्याप्त है।

### डेटा संरचनाएं {#data-structures}

प्राथमिक डेटा संरचना सर्वर द्वारा रखी गई स्थिति है। प्रत्येक खाते के लिए, सर्वर खाते के बैलेंस और एक [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) का ट्रैक रखता है, जिसका उपयोग [रिप्ले हमलों](https://en.wikipedia.org/wiki/Replay_attack) को रोकने के लिए किया जाता है।

### घटक {#components}

इस सिस्टम को दो घटकों की आवश्यकता है:

- _सर्वर_ जो लेन-देन प्राप्त करता है, उन्हें प्रोसेस करता है, और शून्य-ज्ञान प्रमाणों के साथ चेन पर हैश पोस्ट करता है।
- एक _स्मार्ट अनुबंध_ जो हैश को स्टोर करता है और शून्य-ज्ञान प्रमाणों का सत्यापन करता है ताकि यह सुनिश्चित हो सके कि स्थिति संक्रमण (state transitions) वैध हैं।

### डेटा और नियंत्रण प्रवाह {#flows}

ये वे तरीके हैं जिनसे विभिन्न घटक एक खाते से दूसरे खाते में ट्रांसफर करने के लिए संवाद करते हैं।

1. एक वेब ब्राउज़र एक हस्ताक्षरित लेन-देन सबमिट करता है जिसमें हस्ताक्षरकर्ता के खाते से एक अलग खाते में ट्रांसफर करने का अनुरोध किया जाता है।

2. सर्वर यह सत्यापित करता है कि लेन-देन वैध है:

   - हस्ताक्षरकर्ता का बैंक में पर्याप्त बैलेंस वाला एक खाता है।
   - प्राप्तकर्ता का बैंक में खाता है।

3. सर्वर हस्ताक्षरकर्ता के बैलेंस से ट्रांसफर की गई राशि को घटाकर और प्राप्तकर्ता के बैलेंस में जोड़कर नई स्थिति की गणना करता है।

4. सर्वर एक शून्य-ज्ञान प्रमाण की गणना करता है कि स्थिति परिवर्तन एक वैध परिवर्तन है।

5. सर्वर इथेरियम पर एक लेन-देन सबमिट करता है जिसमें शामिल हैं:

   - नई स्थिति हैश
   - लेनदेन हैश (ताकि लेन-देन प्रेषक जान सके कि इसे प्रोसेस कर लिया गया है)
   - शून्य-ज्ञान प्रमाण जो साबित करता है कि नई स्थिति में संक्रमण वैध है

6. स्मार्ट अनुबंध शून्य-ज्ञान प्रमाण का सत्यापन करता है।

7. यदि शून्य-ज्ञान प्रमाण सही साबित होता है, तो स्मार्ट अनुबंध ये क्रियाएं करता है:
   - वर्तमान स्थिति हैश को नई स्थिति हैश में अपडेट करें
   - नई स्थिति हैश और लेनदेन हैश के साथ एक लॉग प्रविष्टि (log entry) उत्सर्जित करें

### उपकरण {#tools}

क्लाइंट-साइड कोड के लिए, हम [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), और [Wagmi](https://wagmi.sh/) का उपयोग करने जा रहे हैं। ये उद्योग-मानक उपकरण हैं; यदि आप उनसे परिचित नहीं हैं, तो आप [इस ट्यूटोरियल](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) का उपयोग कर सकते हैं।

सर्वर का अधिकांश भाग [Node](https://nodejs.org/en) का उपयोग करके JavaScript में लिखा गया है। शून्य-ज्ञान वाला भाग [Noir](https://noir-lang.org/) में लिखा गया है। हमें संस्करण `1.0.0-beta.10` की आवश्यकता है, इसलिए [निर्देशानुसार Noir स्थापित करने](https://noir-lang.org/docs/getting_started/quick_start) के बाद, यह चलाएं:

```
noirup -v 1.0.0-beta.10
```

हम जिस ब्लॉकचेन का उपयोग करते हैं वह `anvil` है, जो एक स्थानीय परीक्षण ब्लॉकचेन है और [Foundry](https://getfoundry.sh/introduction/installation) का हिस्सा है।

## कार्यान्वयन {#implementation}

चूंकि यह एक जटिल सिस्टम है, हम इसे चरणों में लागू करेंगे।

### चरण 1 - मैन्युअल शून्य ज्ञान {#stage-1}

पहले चरण के लिए, हम ब्राउज़र में एक लेन-देन पर हस्ताक्षर करेंगे और फिर मैन्युअल रूप से शून्य-ज्ञान प्रमाण को जानकारी प्रदान करेंगे। शून्य-ज्ञान कोड को वह जानकारी `server/noir/Prover.toml` में प्राप्त होने की अपेक्षा होती है (जो [यहाँ](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) प्रलेखित है)।

इसे काम करते हुए देखने के लिए:

1. सुनिश्चित करें कि आपके पास [Node](https://nodejs.org/en/download) और [Noir](https://noir-lang.org/docs/installation) स्थापित है। अधिमानतः, उन्हें macOS, Linux, या [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) जैसे UNIX सिस्टम पर स्थापित करें।

2. चरण 1 कोड डाउनलोड करें और क्लाइंट कोड को सर्व करने के लिए वेब सर्वर शुरू करें।

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   यहां आपको वेब सर्वर की आवश्यकता इसलिए है क्योंकि, कुछ प्रकार की धोखाधड़ी को रोकने के लिए, कई वॉलेट (जैसे मेटामास्क) सीधे डिस्क से सर्व की गई फ़ाइलों को स्वीकार नहीं करते हैं।

3. वॉलेट के साथ एक ब्राउज़र खोलें।

4. वॉलेट में, एक नया पासफ्रेज़ दर्ज करें। ध्यान दें कि यह आपके मौजूदा पासफ्रेज़ को हटा देगा, इसलिए _सुनिश्चित करें कि आपके पास बैकअप है_।

   पासफ्रेज़ `test test test test test test test test test test test junk` है, जो anvil के लिए डिफ़ॉल्ट परीक्षण पासफ्रेज़ है।

5. [क्लाइंट-साइड कोड](http://localhost:5173/) पर जाएं।

6. वॉलेट से कनेक्ट करें और अपना गंतव्य खाता और राशि चुनें।

7. **Sign** पर क्लिक करें और लेन-देन पर हस्ताक्षर करें।

8. **Prover.toml** हेडिंग के तहत, आपको टेक्स्ट मिलेगा। `server/noir/Prover.toml` को उस टेक्स्ट से बदलें।

9. शून्य-ज्ञान प्रमाण को निष्पादित करें।

   ```sh
   cd ../server/noir
   nargo execute
   ```

   आउटपुट इसके समान होना चाहिए

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. वेब ब्राउज़र पर दिखाई देने वाले हैश के साथ अंतिम दो मानों की तुलना करके देखें कि क्या संदेश को सही ढंग से हैश किया गया है।

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[यह फ़ाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir द्वारा अपेक्षित जानकारी का प्रारूप दिखाती है।

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

संदेश टेक्स्ट प्रारूप में है, जिससे उपयोगकर्ता के लिए इसे समझना आसान हो जाता है (जो हस्ताक्षर करते समय आवश्यक है) और Noir कोड के लिए पार्स करना आसान होता है। राशि को फ़िनी में उद्धृत किया गया है ताकि एक ओर आंशिक ट्रांसफर को सक्षम किया जा सके और दूसरी ओर आसानी से पढ़ा जा सके। अंतिम संख्या [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) है।

स्ट्रिंग 100 अक्षरों लंबी है। शून्य-ज्ञान प्रमाण परिवर्तनीय-आकार के डेटा को अच्छी तरह से नहीं संभालते हैं, इसलिए डेटा को पैड (pad) करना अक्सर आवश्यक होता है।

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

यह संरचनाओं के एक ऐरे को निर्दिष्ट करने का तरीका है। प्रत्येक प्रविष्टि के लिए, हम पता, बैलेंस (milliETH में, जिसे [फ़िनी](https://cryptovalleyjournal.com/glossary/finney/) भी कहा जाता है), और अगले नॉन्स मान को निर्दिष्ट करते हैं।

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[यह फ़ाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) क्लाइंट-साइड प्रोसेसिंग को लागू करती है और `server/noir/Prover.toml` फ़ाइल जनरेट करती है (जिसमें शून्य-ज्ञान पैरामीटर शामिल हैं)।

यहाँ अधिक दिलचस्प भागों का स्पष्टीकरण दिया गया है।

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

ये खाता पते हैं, जो `test ... test junk` पासफ्रेज़ द्वारा बनाए गए पते हैं। यदि आप अपने स्वयं के पतों का उपयोग करना चाहते हैं, तो बस इस परिभाषा को संशोधित करें।

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

ये [Wagmi हुक](https://wagmi.sh/react/api/hooks) हमें [viem](https://viem.sh/) लाइब्रेरी और वॉलेट तक पहुँचने देते हैं।

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

यह संदेश है, जो रिक्त स्थान के साथ पैड किया गया है। हर बार जब [`useState`](https://react.dev/reference/react/useState) चरों में से एक बदलता है, तो घटक को फिर से तैयार (redraw) किया जाता है और `message` को अपडेट किया जाता है।

```tsx
  const sign = async () => {
```

यह फ़ंक्शन तब कॉल किया जाता है जब उपयोगकर्ता **Sign** बटन पर क्लिक करता है। संदेश अपने आप अपडेट हो जाता है, लेकिन हस्ताक्षर के लिए वॉलेट में उपयोगकर्ता की स्वीकृति की आवश्यकता होती है, और हम इसके लिए तब तक नहीं पूछना चाहते जब तक कि इसकी आवश्यकता न हो।

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

संदेश हैश प्राप्त करें। यह Noir कोड को डीबग करने के लिए उपयोगकर्ता को प्रदान करने में सहायक है। 

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

स्थिति चर (state variables) सेट करें। ऐसा करने से घटक फिर से तैयार होता है (`sign` फ़ंक्शन के बाहर निकलने के बाद) और उपयोगकर्ता को अद्यतन मान दिखाता है।

```tsx
    let proverToml = `
```

`Prover.toml` के लिए टेक्स्ट।

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem हमें सार्वजनिक कुंजी 65-बाइट हेक्साडेसिमल स्ट्रिंग के रूप में प्रदान करता है। पहला बाइट `0x04` है, जो एक संस्करण मार्कर है। इसके बाद सार्वजनिक कुंजी के `x` के लिए 32 बाइट्स और फिर सार्वजनिक कुंजी के `y` के लिए 32 बाइट्स होते हैं।

हालाँकि, Noir को यह जानकारी दो-बाइट ऐरे के रूप में प्राप्त होने की अपेक्षा होती है, एक `x` के लिए और एक `y` के लिए। इसे शून्य-ज्ञान प्रमाण के हिस्से के बजाय यहां क्लाइंट पर पार्स करना आसान है।

ध्यान दें कि सामान्य तौर पर शून्य-ज्ञान में यह एक अच्छा अभ्यास है। शून्य-ज्ञान प्रमाण के अंदर कोड महंगा होता है, इसलिए कोई भी प्रोसेसिंग जो शून्य-ज्ञान प्रमाण के बाहर की जा सकती है, उसे शून्य-ज्ञान प्रमाण के _बाहर_ किया जाना चाहिए।

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

हस्ताक्षर भी 65-बाइट हेक्साडेसिमल स्ट्रिंग के रूप में प्रदान किया जाता है। हालाँकि, सार्वजनिक कुंजी को पुनर्प्राप्त करने के लिए केवल अंतिम बाइट आवश्यक है। चूँकि सार्वजनिक कुंजी पहले ही Noir कोड को प्रदान की जा चुकी होगी, हमें हस्ताक्षर को सत्यापित करने के लिए इसकी आवश्यकता नहीं है, और Noir कोड को इसकी आवश्यकता नहीं है।

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

[यह फ़ाइल](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) वास्तविक शून्य-ज्ञान कोड है।

```
use std::hash::pedersen_hash;
```

[पेडरसन हैश](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) को [Noir मानक लाइब्रेरी](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) के साथ प्रदान किया गया है। शून्य-ज्ञान प्रमाण आमतौर पर इस हैश फ़ंक्शन का उपयोग करते हैं। मानक हैश फ़ंक्शंस की तुलना में [अंकगणितीय सर्किट](https://rareskills.io/post/arithmetic-circuit) के अंदर गणना करना बहुत आसान है।

```
use keccak256::keccak256;
use dep::ecrecover;
```

ये दो फ़ंक्शन बाहरी लाइब्रेरी हैं, जिन्हें [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) में परिभाषित किया गया है। उन्हें ठीक उसी लिए नाम दिया गया है जो वे करते हैं, एक फ़ंक्शन जो [keccak256 हैश](https://emn178.github.io/online-tools/keccak_256.html) की गणना करता है और एक फ़ंक्शन जो इथेरियम हस्ताक्षरों को सत्यापित करता है और हस्ताक्षरकर्ता के इथेरियम पते को पुनर्प्राप्त करता है।

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir [Rust](https://www.rust-lang.org/) से प्रेरित है। चर (Variables), डिफ़ॉल्ट रूप से, स्थिरांक (constants) होते हैं। इस तरह हम वैश्विक कॉन्फ़िगरेशन स्थिरांक परिभाषित करते हैं। विशेष रूप से, `ACCOUNT_NUMBER` उन खातों की संख्या है जिन्हें हम स्टोर करते हैं।

`u<number>` नामक डेटा प्रकार बिट्स की वह संख्या है, जो अहस्ताक्षरित (unsigned) है। केवल समर्थित प्रकार `u8`, `u16`, `u32`, `u64`, और `u128` हैं।

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

इस चर का उपयोग खातों के पेडरसन हैश के लिए किया जाता है, जैसा कि नीचे बताया गया है।

```
global MESSAGE_LENGTH : u32 = 100;
```

जैसा कि ऊपर बताया गया है, संदेश की लंबाई निश्चित है। इसे यहाँ निर्दिष्ट किया गया है।

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 हस्ताक्षरों](https://eips.ethereum.org/EIPS/eip-191) के लिए 26-बाइट उपसर्ग (prefix) वाले बफर की आवश्यकता होती है, जिसके बाद ASCII में संदेश की लंबाई, और अंत में संदेश स्वयं होता है।

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

किसी खाते के बारे में हम जो जानकारी स्टोर करते हैं। [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) एक संख्या है, आमतौर पर 253 बिट तक, जिसे सीधे [अंकगणितीय सर्किट](https://rareskills.io/post/arithmetic-circuit) में उपयोग किया जा सकता है जो शून्य-ज्ञान प्रमाण को लागू करता है। यहाँ हम 160-बिट इथेरियम पता स्टोर करने के लिए `Field` का उपयोग करते हैं।

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

स्थानांतरण (transfer) लेन-देन के लिए हम जो जानकारी स्टोर करते हैं।

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

एक फ़ंक्शन परिभाषा। पैरामीटर `Account` जानकारी है। परिणाम `Field` चरों का एक ऐरे है, जिसकी लंबाई `FLAT_ACCOUNT_FIELDS` है।

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

ऐरे में पहला मान खाते का पता है। दूसरे में बैलेंस और नॉन्स दोनों शामिल हैं। `.into()` कॉल एक संख्या को उस डेटा प्रकार में बदल देती हैं जो उसे होना चाहिए। `account.nonce` एक `u32` मान है, लेकिन इसे `account.balance << 32` में जोड़ने के लिए, जो एक `u128` मान है, इसे `u128` होना चाहिए। यह पहला `.into()` है। दूसरा वाला `u128` परिणाम को `Field` में परिवर्तित करता है ताकि यह ऐरे में फिट हो जाए।

```
    flat
}
```

Noir में, फ़ंक्शन केवल अंत में एक मान लौटा सकते हैं (कोई प्रारंभिक वापसी (early return) नहीं है)। रिटर्न मान निर्दिष्ट करने के लिए, आप इसे फ़ंक्शन के समापन ब्रैकेट से ठीक पहले मूल्यांकन करते हैं।

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

यह फ़ंक्शन खातों के ऐरे को `Field` ऐरे में बदल देता है, जिसे पीटरसन हैश के इनपुट के रूप में उपयोग किया जा सकता है।

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

इस तरह आप एक परिवर्तनशील (mutable) चर निर्दिष्ट करते हैं, अर्थात जो स्थिरांक _नहीं_ है। Noir में चरों का हमेशा एक मान होना चाहिए, इसलिए हम इस चर को सभी शून्यों में इनिशियलाइज़ करते हैं।

```
    for i in 0..ACCOUNT_NUMBER {
```

यह एक `for` लूप है। ध्यान दें कि सीमाएँ स्थिरांक हैं। Noir लूप की सीमाएँ कंपाइल समय पर ज्ञात होनी चाहिए। इसका कारण यह है कि अंकगणितीय सर्किट प्रवाह नियंत्रण (flow control) का समर्थन नहीं करते हैं। `for` लूप को प्रोसेस करते समय, कंपाइलर बस इसके अंदर कोड को कई बार डालता है, प्रत्येक इटरेशन के लिए एक बार।

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

अंत में, हम उस फ़ंक्शन तक पहुँच गए जो खातों के ऐरे को हैश करता है।

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

यह फ़ंक्शन विशिष्ट पते वाले खाते को ढूंढता है। यह फ़ंक्शन मानक कोड में अत्यधिक अक्षम होगा क्योंकि यह सभी खातों पर इटरेशन करता है, यहाँ तक कि पता मिलने के बाद भी।

हालाँकि, शून्य-ज्ञान प्रमाणों में, कोई प्रवाह नियंत्रण नहीं होता है। यदि हमें कभी किसी शर्त की जाँच करनी है, तो हमें हर बार इसकी जाँच करनी होगी।

यही बात `if` कथनों (statements) के साथ भी होती है। उपरोक्त लूप में `if` कथन को इन गणितीय कथनों में अनुवादित किया गया है।

_condition<sub>result</sub> = accounts[i].address == address_ // एक यदि वे समान हैं, अन्यथा शून्य

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/language/assert) फ़ंक्शन यदि दावा (assertion) गलत है तो शून्य-ज्ञान प्रमाण को क्रैश कर देता है। इस मामले में, यदि हमें संबंधित पते वाला कोई खाता नहीं मिल पाता है। पते की रिपोर्ट करने के लिए, हम एक [प्रारूप स्ट्रिंग (format string)](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) का उपयोग करते हैं।

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

यह फ़ंक्शन एक ट्रांसफर लेन-देन लागू करता है और नए खातों का ऐरे लौटाता है।

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

हम Noir में किसी प्रारूप स्ट्रिंग के अंदर संरचना तत्वों तक नहीं पहुँच सकते हैं, इसलिए हम एक प्रयोग करने योग्य कॉपी बनाते हैं।

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

ये दो शर्तें हैं जो किसी लेन-देन को अमान्य कर सकती हैं।

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

नए खातों का ऐरे बनाएं और फिर उसे वापस करें।

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

यह फ़ंक्शन संदेश से पता पढ़ता है। 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

पता हमेशा 20 बाइट्स (उर्फ 40 हेक्साडेसिमल अंक) लंबा होता है, और वर्ण (character) #7 से शुरू होता है।

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

संदेश में, पते के बाद पहली संख्या ट्रांसफर की जाने वाली फ़िनी (उर्फ ETH का हजारवां हिस्सा) की राशि है। दूसरी संख्या नॉन्स है। उनके बीच किसी भी टेक्स्ट को नज़रअंदाज़ किया जाता है।

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // हमें यह अभी मिला
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

एक [टपल (tuple)](https://noir-lang.org/docs/noir/concepts/data_types/tuples) लौटाना फ़ंक्शन से कई मान लौटाने का Noir तरीका है।

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

हम खातों के लिए पेडरसन हैश का उपयोग करने में सक्षम थे क्योंकि उन्हें केवल शून्य-ज्ञान प्रमाण के अंदर हैश किया जाता है। हालाँकि, इस कोड में हमें संदेश के हस्ताक्षर की जाँच करने की आवश्यकता है, जो ब्राउज़र द्वारा उत्पन्न होता है। उसके लिए, हमें [EIP 191](https://eips.ethereum.org/EIPS/eip-191) में इथेरियम हस्ताक्षर प्रारूप का पालन करने की आवश्यकता है। इसका मतलब है कि हमें एक मानक उपसर्ग, ASCII में संदेश की लंबाई, और स्वयं संदेश के साथ एक संयुक्त बफर बनाने की आवश्यकता है, और इसे हैश करने के लिए इथेरियम मानक keccak256 का उपयोग करना होगा।

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

उन मामलों से बचने के लिए जहाँ कोई एप्लिकेशन उपयोगकर्ता से ऐसे संदेश पर हस्ताक्षर करने के लिए कहता है जिसका उपयोग लेन-देन या किसी अन्य उद्देश्य के लिए किया जा सकता है, EIP 191 यह निर्दिष्ट करता है कि सभी हस्ताक्षरित संदेश वर्ण 0x19 (मान्य ASCII वर्ण नहीं) से शुरू होते हैं और उसके बाद `Ethereum Signed Message:` और एक नई पंक्ति (newline) आती है।

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

999 तक की संदेश लंबाई को संभालें और यदि यह उससे अधिक है तो विफल हो जाएं। मैंने यह कोड जोड़ा है, भले ही संदेश की लंबाई एक स्थिरांक है, क्योंकि इसे बदलना आसान हो जाता है। उत्पादन सिस्टम पर, बेहतर प्रदर्शन की खातिर आप संभवतः यह मान लेंगे कि `MESSAGE_LENGTH` नहीं बदलता है।

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

इथेरियम मानक `keccak256` फ़ंक्शन का उपयोग करें।

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // पता, हैश के पहले 16 बाइट्स, हैश के अंतिम 16 बाइट्स        
{
```

यह फ़ंक्शन हस्ताक्षर की पुष्टि करता है, जिसके लिए संदेश हैश की आवश्यकता होती है। यह तब हमें वह पता प्रदान करता है जिसने इस पर हस्ताक्षर किए हैं और संदेश हैश भी। संदेश हैश दो `Field` मानों में प्रदान किया जाता है क्योंकि वे प्रोग्राम के बाकी हिस्सों में बाइट ऐरे की तुलना में उपयोग करने में आसान होते हैं।

हमें दो `Field` मानों का उपयोग करने की आवश्यकता है क्योंकि फ़ील्ड गणनाएँ बड़ी संख्या के [मॉड्यूलो (modulo)](https://en.wikipedia.org/wiki/Modulo) में की जाती हैं, लेकिन वह संख्या आमतौर पर 256 बिट्स से कम होती है (अन्यथा ईवीएम में उन गणनाओं को करना कठिन होगा)।

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` और `hash2` को परिवर्तनशील (mutable) चर के रूप में निर्दिष्ट करें, और बाइट-दर-बाइट हैश उनमें लिखें।

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
यह Solidity के [`ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) के समान है, जिसमें दो महत्वपूर्ण अंतर हैं:

- यदि हस्ताक्षर मान्य नहीं है, तो कॉल `assert` विफल हो जाती है और प्रोग्राम रद्द कर दिया जाता है।
- हालांकि सार्वजनिक कुंजी को हस्ताक्षर और हैश से पुनर्प्राप्त किया जा सकता है, यह ऐसी प्रोसेसिंग है जिसे बाहरी रूप से किया जा सकता है और इसलिए इसे शून्य-ज्ञान प्रमाण के अंदर करने लायक नहीं है। यदि कोई हमें यहाँ धोखा देने की कोशिश करता है, तो हस्ताक्षर सत्यापन विफल हो जाएगा।

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
        Field,  // पुराने खाता ऐरे का हैश
        Field,  // नए खाता ऐरे का हैश
        Field,  // संदेश हैश के पहले 16 बाइट्स
        Field,  // संदेश हैश के अंतिम 16 बाइट्स
    )
```

अंत में, हम `main` फ़ंक्शन तक पहुँचते हैं। हमें यह साबित करने की आवश्यकता है कि हमारे पास एक लेन-देन है जो खातों के हैश को पुराने मान से नए मान में वैध रूप से बदलता है। हमें यह भी साबित करने की आवश्यकता है कि इसमें यह विशिष्ट लेनदेन हैश है ताकि इसे भेजने वाले व्यक्ति को पता चले कि उनका लेन-देन प्रोसेस हो गया है।

```rust
{
    let mut txn = readTransferTxn(message);
```

हमें `txn` को परिवर्तनशील होने की आवश्यकता है क्योंकि हम संदेश से भेजने वाले का पता (from address) नहीं पढ़ते हैं, हम इसे हस्ताक्षर से पढ़ते हैं। 

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

### चरण 2 - सर्वर जोड़ना {#stage-2}

दूसरे चरण में, हम एक सर्वर जोड़ते हैं जो ब्राउज़र से ट्रांसफर लेन-देन प्राप्त करता है और उन्हें लागू करता है।

इसे काम करते हुए देखने के लिए:

1. यदि Vite चल रहा है तो उसे रोकें।

2. वह ब्रांच डाउनलोड करें जिसमें सर्वर शामिल है और सुनिश्चित करें कि आपके पास सभी आवश्यक मॉड्यूल हैं।

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

4. एक अलग कमांड-लाइन विंडो में, ब्राउज़र कोड को सर्व करने के लिए Vite चलाएं।

   ```sh
   cd client
   npm run dev
   ```

5. [http://localhost:5173](http://localhost:5173) पर क्लाइंट कोड पर ब्राउज़ करें

6. इससे पहले कि आप कोई लेन-देन जारी कर सकें, आपको नॉन्स के साथ-साथ वह राशि भी जाननी होगी जिसे आप भेज सकते हैं। यह जानकारी प्राप्त करने के लिए, **Update account data** पर क्लिक करें और संदेश पर हस्ताक्षर करें।

   यहाँ हमारे सामने एक दुविधा है। एक ओर, हम ऐसे संदेश पर हस्ताक्षर नहीं करना चाहते हैं जिसका पुन: उपयोग किया जा सके (एक [रिप्ले हमला](https://en.wikipedia.org/wiki/Replay_attack)), यही कारण है कि हम पहली बार में एक नॉन्स चाहते हैं। हालाँकि, हमारे पास अभी तक नॉन्स नहीं है। इसका समाधान एक ऐसे नॉन्स को चुनना है जिसका उपयोग केवल एक बार किया जा सकता है और जो हमारे पास पहले से ही दोनों तरफ है, जैसे कि वर्तमान समय।

   इस समाधान के साथ समस्या यह है कि समय पूरी तरह से सिंक्रनाइज़ नहीं हो सकता है। इसलिए इसके बजाय, हम एक ऐसे मान पर हस्ताक्षर करते हैं जो हर मिनट बदलता है। इसका मतलब है कि रिप्ले हमलों के प्रति हमारी भेद्यता की विंडो अधिकतम एक मिनट है। यह देखते हुए कि उत्पादन में हस्ताक्षरित अनुरोध TLS द्वारा सुरक्षित होगा, और यह कि टनल के दूसरी ओर मौजूद सर्वर पहले से ही बैलेंस और नॉन्स का खुलासा कर सकता है (काम करने के लिए उसे उन्हें जानना होगा), यह एक स्वीकार्य जोखिम है।

7. एक बार जब ब्राउज़र को बैलेंस और नॉन्स वापस मिल जाता है, तो यह ट्रांसफर फॉर्म दिखाता है। गंतव्य पता और राशि चुनें और **Transfer** पर क्लिक करें। इस अनुरोध पर हस्ताक्षर करें।

8. ट्रांसफर देखने के लिए, या तो **Update account data** करें या उस विंडो को देखें जहाँ आप सर्वर चलाते हैं। जब भी स्थिति बदलती है तो सर्वर इसे लॉग करता है।

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

[इस फ़ाइल](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) में सर्वर प्रक्रिया शामिल है, और यह [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) पर Noir कोड के साथ इंटरैक्ट करती है। यहाँ दिलचस्प भागों का स्पष्टीकरण दिया गया है।

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) लाइब्रेरी JavaScript कोड और Noir कोड के बीच इंटरफेस करती है।

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

अंकगणितीय सर्किट---वह संकलित Noir प्रोग्राम जिसे हमने पिछले चरण में बनाया था---लोड करें और इसे निष्पादित करने की तैयारी करें।

```js
// हम केवल एक हस्ताक्षरित अनुरोध के जवाब में खाता जानकारी प्रदान करते हैं
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

खाते की जानकारी प्रदान करने के लिए, हमें केवल हस्ताक्षर की आवश्यकता है। इसका कारण यह है कि हम पहले से ही जानते हैं कि संदेश क्या होने वाला है, और इसलिए संदेश हैश भी।

```js
const processMessage = async (message, signature) => {
```

संदेश को प्रोसेस करें और इसके द्वारा एनकोड किए गए लेन-देन को निष्पादित करें।

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

`noir.execute` Noir प्रोग्राम को चलाता है। पैरामीटर [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) में प्रदान किए गए पैरामीटर के बराबर हैं। ध्यान दें कि लंबे मान हेक्साडेसिमल स्ट्रिंग्स (`["0x60", "0xA7"]`) के ऐरे के रूप में प्रदान किए जाते हैं, न कि एकल हेक्साडेसिमल मान (`0x60A7`) के रूप में, जिस तरह से Viem करता है।

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

यदि कोई त्रुटि है, तो उसे पकड़ें और फिर क्लाइंट को एक सरलीकृत संस्करण रिले करें।

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

लेन-देन लागू करें। हमने पहले ही इसे Noir कोड में कर लिया है, लेकिन वहां से परिणाम निकालने के बजाय इसे फिर से यहां करना आसान है।

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

प्रारंभिक `Accounts` संरचना।

### चरण 3 - इथेरियम स्मार्ट अनुबंध {#stage-3}

1. सर्वर और क्लाइंट प्रक्रियाओं को रोकें।

2. स्मार्ट अनुबंधों वाली ब्रांच डाउनलोड करें और सुनिश्चित करें कि आपके पास सभी आवश्यक मॉड्यूल हैं।

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. एक अलग कमांड-लाइन विंडो में `anvil` चलाएँ।

4. सत्यापन कुंजी और Solidity सत्यापनकर्ता जनरेट करें, फिर सत्यापनकर्ता कोड को Solidity प्रोजेक्ट में कॉपी करें।

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. स्मार्ट अनुबंधों पर जाएं और `anvil` ब्लॉकचेन का उपयोग करने के लिए पर्यावरण चर (environment variables) सेट करें।

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol` तैनात करें और पते को एक पर्यावरण चर में स्टोर करें।

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` अनुबंध तैनात करें।

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` मान `Accounts` की प्रारंभिक स्थिति का पेडरसन हैश है। यदि आप इस प्रारंभिक स्थिति को `server/index.mjs` में संशोधित करते हैं, तो आप शून्य-ज्ञान प्रमाण द्वारा रिपोर्ट किए गए प्रारंभिक हैश को देखने के लिए लेन-देन चला सकते हैं।

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

10. कुछ लेन-देन चलाएँ।

11. यह सत्यापित करने के लिए कि ऑनचेन स्थिति बदल गई है, सर्वर प्रक्रिया को पुनरारंभ करें। देखें कि `ZkBank` अब लेन-देन स्वीकार नहीं करता है, क्योंकि लेन-देन में मूल हैश मान ऑनचेन संग्रहीत हैश मान से भिन्न है।

    यह उसी प्रकार की त्रुटि है जिसकी अपेक्षा की गई थी।

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

इस फ़ाइल में बदलाव मुख्य रूप से वास्तविक प्रमाण बनाने और इसे ऑनचेन सबमिट करने से संबंधित हैं।

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

हमें ऑनचेन भेजने के लिए वास्तविक प्रमाण बनाने हेतु [Barretenberg पैकेज](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) का उपयोग करने की आवश्यकता है। हम इस पैकेज का उपयोग या तो कमांड-लाइन इंटरफ़ेस (`bb`) चलाकर या [JavaScript लाइब्रेरी, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) का उपयोग करके कर सकते हैं। JavaScript लाइब्रेरी मूल रूप से कोड चलाने की तुलना में बहुत धीमी है, इसलिए हम कमांड-लाइन का उपयोग करने के लिए यहाँ [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) का उपयोग करते हैं।

ध्यान दें कि यदि आप `bb.js` का उपयोग करने का निर्णय लेते हैं, तो आपको उस संस्करण का उपयोग करने की आवश्यकता है जो आपके द्वारा उपयोग किए जा रहे Noir संस्करण के अनुकूल हो। लिखते समय, वर्तमान Noir संस्करण (1.0.0-beta.11) `bb.js` संस्करण 0.87 का उपयोग करता है।

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

यहाँ पता वह है जो आपको एक साफ `anvil` के साथ शुरू करने और ऊपर दिए गए निर्देशों का पालन करने पर मिलता है।

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

यह निजी कुंजी `anvil` में डिफ़ॉल्ट रूप से पूर्व-वित्त पोषित खातों (pre-funded accounts) में से एक है। 

```js
const generateProof = async (witness, fileID) => {
```

`bb` एक्ज़ीक्यूटेबल का उपयोग करके एक प्रमाण उत्पन्न करें।

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

साक्षी (witness) को एक फ़ाइल में लिखें।

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

वास्तव में प्रमाण बनाएँ। यह चरण सार्वजनिक चर वाली एक फ़ाइल भी बनाता है, लेकिन हमें उसकी आवश्यकता नहीं है। हमें वे चर पहले ही `noir.execute` से मिल चुके हैं।

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

प्रमाण `Field` मानों का एक JSON ऐरे है, जिनमें से प्रत्येक को हेक्साडेसिमल मान के रूप में दर्शाया गया है। हालाँकि, हमें इसे लेन-देन में एक एकल `bytes` मान के रूप में भेजने की आवश्यकता है, जिसे Viem एक बड़ी हेक्साडेसिमल स्ट्रिंग द्वारा दर्शाता है। यहाँ हम सभी मानों को जोड़कर, सभी `0x` को हटाकर, और फिर अंत में एक जोड़कर प्रारूप बदलते हैं।

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

सफाई करें (Cleanup) और प्रमाण लौटाएं।

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

सार्वजनिक फ़ील्ड्स को 32-बाइट मानों का एक ऐरे होना चाहिए। हालाँकि, चूँकि हमें लेनदेन हैश को दो `Field` मानों के बीच विभाजित करने की आवश्यकता थी, यह 16-बाइट मान के रूप में दिखाई देता है। यहाँ हम शून्य जोड़ते हैं ताकि Viem समझ सके कि यह वास्तव में 32 बाइट्स है।

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

प्रत्येक पता प्रत्येक नॉन्स का केवल एक बार उपयोग करता है ताकि हम साक्षी फ़ाइल और आउटपुट निर्देशिका (directory) के लिए एक अद्वितीय पहचानकर्ता के रूप में `fromAddress` और `nonce` के संयोजन का उपयोग कर सकें।

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

लेन-देन को चेन पर भेजें।

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

यह ऑनचेन कोड है जो लेन-देन प्राप्त करता है।

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

ऑनचेन कोड को दो चरों का ट्रैक रखने की आवश्यकता होती है: सत्यापनकर्ता (एक अलग अनुबंध जो `nargo` द्वारा बनाया जाता है) और वर्तमान स्थिति हैश।

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

हर बार जब स्थिति बदलती है, तो हम एक `TransactionProcessed` इवेंट उत्सर्जित करते हैं।

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

यह फ़ंक्शन लेन-देन प्रोसेस करता है। यह उस प्रारूप में प्रमाण (`bytes` के रूप में) और सार्वजनिक इनपुट (एक `bytes32` ऐरे के रूप में) प्राप्त करता है जिसकी सत्यापनकर्ता को आवश्यकता होती है (ऑनचेन प्रोसेसिंग और इसलिए गैस लागत को कम करने के लिए)।

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

शून्य-ज्ञान प्रमाण यह होना चाहिए कि लेन-देन हमारे वर्तमान हैश को एक नए हैश में बदलता है।

```solidity
        myVerifier.verify(_proof, _publicFields);
```

शून्य-ज्ञान प्रमाण का सत्यापन करने के लिए सत्यापनकर्ता अनुबंध को कॉल करें। यदि शून्य-ज्ञान प्रमाण गलत है तो यह चरण लेन-देन को रिवर्ट (revert) कर देता है।

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

यदि सब कुछ सही पाया जाता है, तो स्थिति हैश को नए मान पर अपडेट करें और एक `TransactionProcessed` इवेंट उत्सर्जित करें।

## केंद्रीकृत घटक द्वारा दुरुपयोग {#abuses}

सूचना सुरक्षा में तीन विशेषताएं होती हैं:

- _गोपनीयता (Confidentiality)_, उपयोगकर्ता उस जानकारी को नहीं पढ़ सकते हैं जिसे पढ़ने के लिए वे अधिकृत नहीं हैं।
- _अखंडता (Integrity)_, अधिकृत उपयोगकर्ताओं द्वारा अधिकृत तरीके के अलावा जानकारी को बदला नहीं जा सकता है।
- _उपलब्धता (Availability)_, अधिकृत उपयोगकर्ता सिस्टम का उपयोग कर सकते हैं।

इस सिस्टम पर, शून्य-ज्ञान प्रमाणों के माध्यम से अखंडता प्रदान की जाती है। उपलब्धता की गारंटी देना बहुत कठिन है, और गोपनीयता असंभव है, क्योंकि बैंक को प्रत्येक खाते का बैलेंस और सभी लेन-देन जानने होंगे। जिस संस्था के पास जानकारी है, उसे उस जानकारी को साझा करने से रोकने का कोई तरीका नहीं है।

[स्टेल्थ पते (stealth addresses)](https://vitalik.eth.limo/general/2023/01/20/stealth.html) का उपयोग करके वास्तव में गोपनीय बैंक बनाना संभव हो सकता है, लेकिन यह इस लेख के दायरे से बाहर है।

### गलत जानकारी {#false-info}

सर्वर द्वारा अखंडता का उल्लंघन करने का एक तरीका यह है कि [डेटा का अनुरोध किए जाने पर](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) गलत जानकारी प्रदान करना।

इसे हल करने के लिए, हम एक दूसरा Noir प्रोग्राम लिख सकते हैं जो निजी इनपुट के रूप में खातों को और सार्वजनिक इनपुट के रूप में उस पते को प्राप्त करता है जिसके लिए जानकारी का अनुरोध किया गया है। आउटपुट उस पते का बैलेंस और नॉन्स, और खातों का हैश होता है।

बेशक, इस प्रमाण को ऑनचेन सत्यापित नहीं किया जा सकता है, क्योंकि हम ऑनचेन नॉन्स और बैलेंस पोस्ट नहीं करना चाहते हैं। हालाँकि, इसे ब्राउज़र में चल रहे क्लाइंट कोड द्वारा सत्यापित किया जा सकता है।

### जबरन लेन-देन {#forced-txns}

L2s पर उपलब्धता सुनिश्चित करने और सेंसरशिप को रोकने का सामान्य तंत्र [जबरन लेन-देन (forced transactions)](https://docs.optimism.io/stack/transactions/forced-transaction) है। लेकिन जबरन लेन-देन शून्य-ज्ञान प्रमाणों के साथ नहीं जुड़ते हैं। सर्वर एकमात्र ऐसी संस्था है जो लेन-देन को सत्यापित कर सकती है।

हम जबरन लेन-देन स्वीकार करने और सर्वर को स्थिति बदलने से रोकने के लिए `smart-contracts/src/ZkBank.sol` को तब तक संशोधित कर सकते हैं जब तक कि वे प्रोसेस न हो जाएं। हालाँकि, यह हमें सेवा-से-इनकार (denial-of-service) हमले के प्रति संवेदनशील बनाता है। क्या होगा यदि एक जबरन लेन-देन अमान्य है और इसलिए इसे प्रोसेस करना असंभव है?

समाधान यह है कि शून्य-ज्ञान प्रमाण हो कि कोई जबरन लेन-देन अमान्य है। यह सर्वर को तीन विकल्प देता है:

- जबरन लेन-देन को प्रोसेस करें, एक शून्य-ज्ञान प्रमाण प्रदान करें कि इसे प्रोसेस कर लिया गया है और नई स्थिति हैश दें।
- जबरन लेन-देन को अस्वीकार करें, और अनुबंध को एक शून्य-ज्ञान प्रमाण प्रदान करें कि लेन-देन अमान्य है (अज्ञात पता, खराब नॉन्स, या अपर्याप्त बैलेंस)।
- जबरन लेन-देन को नज़रअंदाज़ करें। सर्वर को वास्तव में लेन-देन को प्रोसेस करने के लिए मजबूर करने का कोई तरीका नहीं है, लेकिन इसका मतलब है कि पूरा सिस्टम अनुपलब्ध है।

#### उपलब्धता बांड (Availability bonds) {#avail-bonds}

वास्तविक जीवन के कार्यान्वयन में, संभवतः सर्वर को चालू रखने के लिए किसी प्रकार का लाभ का उद्देश्य होगा। हम सर्वर को एक उपलब्धता बांड पोस्ट करवाकर इस प्रोत्साहन को मजबूत कर सकते हैं जिसे कोई भी व्यक्ति बर्न कर सकता है यदि एक निश्चित अवधि के भीतर जबरन लेन-देन को प्रोसेस नहीं किया जाता है।

### खराब Noir कोड {#bad-noir-code}

आमतौर पर, लोगों को स्मार्ट अनुबंध पर भरोसा दिलाने के लिए हम [ब्लॉक एक्सप्लोरर](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) पर स्रोत कोड अपलोड करते हैं। हालाँकि, शून्य-ज्ञान प्रमाणों के मामले में, वह अपर्याप्त है।

`Verifier.sol` में सत्यापन कुंजी होती है, जो Noir प्रोग्राम का एक फ़ंक्शन है। हालाँकि, वह कुंजी हमें यह नहीं बताती कि Noir प्रोग्राम क्या था। वास्तव में एक विश्वसनीय समाधान प्राप्त करने के लिए, आपको Noir प्रोग्राम (और वह संस्करण जिसने इसे बनाया था) अपलोड करने की आवश्यकता है। अन्यथा, शून्य-ज्ञान प्रमाण एक अलग प्रोग्राम को दर्शा सकते हैं, जिसमें एक बैकडोर (back door) हो।

जब तक ब्लॉक एक्सप्लोरर हमें Noir प्रोग्राम अपलोड और सत्यापित करने की अनुमति देना शुरू नहीं करते, आपको यह स्वयं करना चाहिए (अधिमानतः [IPFS](/developers/tutorials/ipfs-decentralized-ui/) पर)। तब परिष्कृत उपयोगकर्ता स्रोत कोड डाउनलोड करने, इसे स्वयं संकलित करने, `Verifier.sol` बनाने और यह सत्यापित करने में सक्षम होंगे कि यह ऑनचेन वाले के समान है।

## निष्कर्ष {#conclusion}

प्लाज्मा-प्रकार के एप्लिकेशन को जानकारी के भंडारण के लिए एक केंद्रीकृत घटक की आवश्यकता होती है। यह संभावित कमजोरियों को खोलता है लेकिन, बदले में, हमें उन तरीकों से गोपनीयता बनाए रखने की अनुमति देता है जो स्वयं ब्लॉकचेन पर उपलब्ध नहीं हैं। शून्य-ज्ञान प्रमाणों के साथ हम अखंडता सुनिश्चित कर सकते हैं और संभवतः जो कोई भी केंद्रीकृत घटक चला रहा है, उसके लिए उपलब्धता बनाए रखना आर्थिक रूप से फायदेमंद बना सकते हैं।

[मेरे अन्य काम यहाँ देखें](https://cryptodocguy.pro/)।

## आभार {#acknowledgements}

- जॉश क्राइट्स ने इस लेख का एक ड्राफ्ट पढ़ा और एक जटिल Noir समस्या में मेरी मदद की।

कोई भी बची हुई त्रुटि मेरी जिम्मेदारी है।
