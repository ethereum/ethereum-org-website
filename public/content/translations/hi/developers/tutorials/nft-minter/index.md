---
title: "NFT मिंटर ट्यूटोरियल"
description: "इस ट्यूटोरियल में, आप एक NFT मिंटर बनाएंगे और सीखेंगे कि मेटामास्क (MetaMask) और Web3 टूल का उपयोग करके अपने स्मार्ट अनुबंध को React फ्रंटएंड से जोड़कर एक फुल स्टैक विकेंद्रीकृत एप्लिकेशन (dapp) कैसे बनाया जाए।"
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "स्मार्ट अनुबंध", "फ्रंटएंड", "Pinata", "ERC-721"]
skill: intermediate
breadcrumb: "NFT मिंटर dapp"
lang: hi
published: 2021-10-06
---

वेब2 (Web2) बैकग्राउंड से आने वाले डेवलपर्स के लिए सबसे बड़ी चुनौतियों में से एक यह पता लगाना है कि अपने स्मार्ट अनुबंध को फ्रंटएंड प्रोजेक्ट से कैसे जोड़ा जाए और इसके साथ कैसे इंटरैक्ट किया जाए।

एक NFT मिंटर बनाकर — एक सरल UI जहां आप अपनी डिजिटल संपत्ति का लिंक, एक शीर्षक और एक विवरण दर्ज कर सकते हैं — आप सीखेंगे कि:

- अपने फ्रंटएंड प्रोजेक्ट के माध्यम से मेटामास्क (MetaMask) से कैसे जुड़ें
- अपने फ्रंटएंड से स्मार्ट अनुबंध विधियों (methods) को कैसे कॉल करें
- मेटामास्क का उपयोग करके लेन-देन पर हस्ताक्षर कैसे करें

इस ट्यूटोरियल में, हम अपने फ्रंटएंड फ्रेमवर्क के रूप में [React](https://react.dev/) का उपयोग करेंगे। क्योंकि यह ट्यूटोरियल मुख्य रूप से Web3 विकास पर केंद्रित है, हम React के बुनियादी सिद्धांतों को समझाने में ज्यादा समय नहीं बिताएंगे। इसके बजाय, हम अपने प्रोजेक्ट में कार्यक्षमता लाने पर ध्यान केंद्रित करेंगे।

पूर्वापेक्षा के रूप में, आपको React की शुरुआती स्तर की समझ होनी चाहिए—यह जानना चाहिए कि कंपोनेंट्स, प्रॉप्स, useState/useEffect और बुनियादी फंक्शन कॉलिंग कैसे काम करती है। यदि आपने पहले कभी इनमें से किसी भी शब्द के बारे में नहीं सुना है, तो आप इस [Intro to React ट्यूटोरियल](https://react.dev/learn/tutorial-tic-tac-toe) को देख सकते हैं। अधिक विज़ुअल रूप से सीखने वालों के लिए, हम Net Ninja की इस बेहतरीन [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) वीडियो सीरीज़ की अत्यधिक अनुशंसा करते हैं।

और यदि आपने पहले से ऐसा नहीं किया है, तो आपको इस ट्यूटोरियल को पूरा करने के साथ-साथ ब्लॉकचेन पर कुछ भी बनाने के लिए निश्चित रूप से एक Alchemy खाते की आवश्यकता होगी। मुफ़्त खाते के लिए [यहाँ](https://alchemy.com/) साइन अप करें।

बिना किसी देरी के, चलिए शुरू करते हैं!

## NFT बनाना 101 {#making-nfts-101}

इससे पहले कि हम किसी भी कोड को देखना शुरू करें, यह समझना महत्वपूर्ण है कि NFT बनाना कैसे काम करता है। इसमें दो चरण शामिल हैं:

### इथेरियम ब्लॉकचेन पर एक NFT स्मार्ट अनुबंध प्रकाशित करें {#publish-nft}

दो NFT स्मार्ट अनुबंध मानकों के बीच सबसे बड़ा अंतर यह है कि ERC-1155 एक मल्टी-टोकन मानक है और इसमें बैच कार्यक्षमता शामिल है, जबकि ERC-721 एक सिंगल-टोकन मानक है और इसलिए एक समय में केवल एक टोकन स्थानांतरित करने का समर्थन करता है।

### मिंटिंग फ़ंक्शन को कॉल करें {#minting-function}

आमतौर पर, इस मिंटिंग फ़ंक्शन के लिए आपको पैरामीटर के रूप में दो वेरिएबल पास करने की आवश्यकता होती है, पहला `recipient`, जो उस पते को निर्दिष्ट करता है जो आपका ताज़ा मिंट किया गया NFT प्राप्त करेगा, और दूसरा NFT का `tokenURI`, एक स्ट्रिंग जो NFT के मेटाडेटा का वर्णन करने वाले JSON दस्तावेज़ को रिज़ॉल्व करती है।

एक NFT का मेटाडेटा वास्तव में वह है जो इसे जीवंत बनाता है, जिससे इसमें नाम, विवरण, छवि (या विभिन्न डिजिटल संपत्ति), और अन्य विशेषताओं जैसे गुण हो सकते हैं। यहाँ [tokenURI का एक उदाहरण](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2) दिया गया है, जिसमें एक NFT का मेटाडेटा होता है।

इस ट्यूटोरियल में, हम भाग 2 पर ध्यान केंद्रित करने जा रहे हैं, जो हमारे React UI का उपयोग करके NFT स्मार्ट अनुबंध मिंटिंग फ़ंक्शन को कॉल करना है।

आपको Sepolia जैसे समर्थित टेस्टनेट पर तैनात एक ERC-721 NFT स्मार्ट अनुबंध की आवश्यकता होगी। यदि आप स्वयं एक तैनात करना चाहते हैं, तो हम Alchemy की [Sepolia पर स्मार्ट अनुबंध तैनात करने](https://www.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet) की मार्गदर्शिका की अनुशंसा करते हैं।

बढ़िया, अब जब हम समझ गए हैं कि NFT बनाना कैसे काम करता है, तो चलिए अपनी स्टार्टर फ़ाइलों को क्लोन करते हैं!
## स्टार्टर फ़ाइलों को क्लोन करें {#clone-the-starter-files}

सबसे पहले, इस प्रोजेक्ट के लिए स्टार्टर फ़ाइलें प्राप्त करने के लिए [nft-minter-tutorial GitHub रिपॉजिटरी](https://github.com/alchemyplatform/nft-minter-tutorial) पर जाएँ। इस रिपॉजिटरी को अपने स्थानीय वातावरण में क्लोन करें।

जब आप इस क्लोन की गई `nft-minter-tutorial` रिपॉजिटरी को खोलते हैं, तो आप देखेंगे कि इसमें दो फ़ोल्डर हैं: `minter-starter-files` और `nft-minter`।

- `minter-starter-files` में इस प्रोजेक्ट के लिए स्टार्टर फ़ाइलें (अनिवार्य रूप से React UI) हैं। इस ट्यूटोरियल में, **हम इसी डायरेक्टरी में काम करेंगे**, क्योंकि आप सीखेंगे कि इस UI को अपने इथेरियम वॉलेट और एक NFT स्मार्ट अनुबंध से जोड़कर कैसे जीवंत बनाया जाए।
- `nft-minter` में पूरा किया गया ट्यूटोरियल है और यह आपके लिए एक **संदर्भ** के रूप में है **यदि आप कहीं फंस जाते हैं।**

इसके बाद, अपने कोड एडिटर में `minter-starter-files` की अपनी कॉपी खोलें, और फिर अपने `src` फ़ोल्डर में नेविगेट करें।

हम जो भी कोड लिखेंगे वह `src` फ़ोल्डर के अंतर्गत रहेगा। हम `Minter.js` कंपोनेंट को संपादित करेंगे और अपने प्रोजेक्ट को Web3 कार्यक्षमता देने के लिए अतिरिक्त जावास्क्रिप्ट (JavaScript) फ़ाइलें लिखेंगे।

## चरण 2: हमारी स्टार्टर फ़ाइलों की जाँच करें {#step-2-check-out-our-starter-files}

इससे पहले कि हम कोडिंग शुरू करें, यह जाँचना महत्वपूर्ण है कि स्टार्टर फ़ाइलों में हमारे लिए पहले से क्या प्रदान किया गया है।

### अपना React प्रोजेक्ट चलाएँ {#get-your-react-project-running}

आइए अपने ब्राउज़र में React प्रोजेक्ट चलाकर शुरुआत करें। React की खूबी यह है कि एक बार जब हमारा प्रोजेक्ट हमारे ब्राउज़र में चलने लगता है, तो हमारे द्वारा सहेजे गए कोई भी बदलाव हमारे ब्राउज़र में लाइव अपडेट हो जाएंगे।

प्रोजेक्ट को चलाने के लिए, `minter-starter-files` फ़ोल्डर की रूट डायरेक्टरी में नेविगेट करें, और प्रोजेक्ट की निर्भरताओं (dependencies) को स्थापित करने के लिए अपने टर्मिनल में `npm install` चलाएँ:

```bash
cd minter-starter-files
npm install
```

एक बार जब वे स्थापित हो जाएं, तो अपने टर्मिनल में `npm start` चलाएँ:

```bash
npm start
```

ऐसा करने से आपके ब्राउज़र में http://localhost:3000/ खुलना चाहिए, जहाँ आप हमारे प्रोजेक्ट का फ्रंटएंड देखेंगे। इसमें 3 फ़ील्ड होने चाहिए: आपके NFT की संपत्ति का लिंक इनपुट करने की जगह, आपके NFT का नाम दर्ज करने की जगह, और विवरण प्रदान करने की जगह।

यदि आप "Connect Wallet" या "Mint NFT" बटन पर क्लिक करने का प्रयास करते हैं, तो आप देखेंगे कि वे काम नहीं करते हैं—ऐसा इसलिए है क्योंकि हमें अभी भी उनकी कार्यक्षमता को प्रोग्राम करना है! :\)

### Minter.js कंपोनेंट {#minter-js}

**नोट:** सुनिश्चित करें कि आप `minter-starter-files` फ़ोल्डर में हैं न कि `nft-minter` फ़ोल्डर में!

आइए अपने एडिटर में `src` फ़ोल्डर में वापस जाएँ और `Minter.js` फ़ाइल खोलें। यह बहुत महत्वपूर्ण है कि हम इस फ़ाइल में सब कुछ समझें, क्योंकि यह प्राथमिक React कंपोनेंट है जिस पर हम काम करेंगे।

हमारी इस फ़ाइल के शीर्ष पर, हमारे पास हमारे स्थिति (state) वेरिएबल हैं जिन्हें हम विशिष्ट घटनाओं के बाद अपडेट करेंगे।

```javascript
//स्थिति चर
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React स्थिति वेरिएबल या स्थिति हुक के बारे में कभी नहीं सुना? [इन](https://legacy.reactjs.org/docs/hooks-state.html) दस्तावेज़ों को देखें।

यहाँ बताया गया है कि प्रत्येक वेरिएबल क्या दर्शाता है:

- `walletAddress` - एक स्ट्रिंग जो उपयोगकर्ता के वॉलेट पते को संग्रहीत करती है
- `status` - एक स्ट्रिंग जिसमें UI के निचले भाग में प्रदर्शित करने के लिए एक संदेश होता है
- `name` - एक स्ट्रिंग जो NFT का नाम संग्रहीत करती है
- `description` - एक स्ट्रिंग जो NFT का विवरण संग्रहीत करती है
- `url` - एक स्ट्रिंग जो NFT की डिजिटल संपत्ति का लिंक है

स्थिति वेरिएबल के बाद, आप तीन गैर-कार्यान्वित (un-implemented) फ़ंक्शन देखेंगे: `useEffect`, `connectWalletPressed`, और `onMintPressed`। आप देखेंगे कि ये सभी फ़ंक्शन `async` हैं, ऐसा इसलिए है क्योंकि हम उनमें एसिंक्रोनस API कॉल करेंगे! उनके नाम उनकी कार्यक्षमता के अनुरूप हैं:

```javascript
useEffect(async () => {
  //TODO: लागू करें
}, [])

const connectWalletPressed = async () => {
  //TODO: लागू करें
}

const onMintPressed = async () => {
  //TODO: लागू करें
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - यह एक React हुक है जिसे आपके कंपोनेंट के रेंडर होने के बाद कॉल किया जाता है। क्योंकि इसमें एक खाली ऐरे `[]` प्रॉप पास किया गया है (लाइन 3 देखें), इसे केवल कंपोनेंट के _पहले_ रेंडर पर कॉल किया जाएगा। यहाँ हम अपने वॉलेट लिसनर और एक अन्य वॉलेट फ़ंक्शन को कॉल करेंगे ताकि हमारे UI को अपडेट किया जा सके और यह दर्शाया जा सके कि क्या कोई वॉलेट पहले से जुड़ा हुआ है।
- `connectWalletPressed` - इस फ़ंक्शन को उपयोगकर्ता के मेटामास्क वॉलेट को हमारे विकेंद्रीकृत एप्लिकेशन (dapp) से जोड़ने के लिए कॉल किया जाएगा।
- `onMintPressed` - इस फ़ंक्शन को उपयोगकर्ता के NFT को मिंट करने के लिए कॉल किया जाएगा।

इस फ़ाइल के अंत के करीब, हमारे पास हमारे कंपोनेंट का UI है। यदि आप इस कोड को ध्यान से स्कैन करते हैं, तो आप देखेंगे कि जब उनके संबंधित टेक्स्ट फ़ील्ड में इनपुट बदलता है तो हम अपने `url`, `name`, और `description` स्थिति वेरिएबल को अपडेट करते हैं।

आप यह भी देखेंगे कि `connectWalletPressed` और `onMintPressed` को तब कॉल किया जाता है जब क्रमशः `mintButton` और `walletButton` ID वाले बटन पर क्लिक किया जाता है।

```javascript
//हमारे घटक का UI
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

अंत में, आइए देखें कि यह Minter कंपोनेंट कहाँ जोड़ा गया है।

यदि आप `App.js` फ़ाइल पर जाते हैं, जो React में मुख्य कंपोनेंट है जो अन्य सभी कंपोनेंट्स के लिए एक कंटेनर के रूप में कार्य करता है, तो आप देखेंगे कि हमारा Minter कंपोनेंट लाइन 7 पर इंजेक्ट किया गया है।

**इस ट्यूटोरियल में, हम केवल `Minter.js file` को संपादित करेंगे और अपने `src` फ़ोल्डर में फ़ाइलें जोड़ेंगे।**

अब जब हम समझ गए हैं कि हम किसके साथ काम कर रहे हैं, तो चलिए अपना इथेरियम वॉलेट सेट करते हैं!

## अपना इथेरियम वॉलेट सेट करें {#set-up-your-ethereum-wallet}

उपयोगकर्ताओं को आपके स्मार्ट अनुबंध के साथ इंटरैक्ट करने में सक्षम होने के लिए उन्हें अपने इथेरियम वॉलेट को आपके विकेंद्रीकृत एप्लिकेशन (dapp) से जोड़ना होगा।

### मेटामास्क डाउनलोड करें {#download-metamask}

इस ट्यूटोरियल के लिए, हम मेटामास्क का उपयोग करेंगे, जो ब्राउज़र में एक वर्चुअल वॉलेट है जिसका उपयोग आपके इथेरियम खाता पते को प्रबंधित करने के लिए किया जाता है। यदि आप इस बारे में अधिक समझना चाहते हैं कि इथेरियम पर लेन-देन कैसे काम करते हैं, तो [इस पेज](/developers/docs/transactions/) को देखें।

आप [यहाँ](https://metamask.io/download) मुफ़्त में मेटामास्क डाउनलोड कर सकते हैं और खाता बना सकते हैं। जब आप एक खाता बना रहे हों, या यदि आपके पास पहले से ही एक खाता है, तो सुनिश्चित करें कि आप Sepolia जैसे समर्थित टेस्ट नेटवर्क पर स्विच करें \(ताकि हम असली पैसे से लेन-देन न कर रहे हों\)।
### फॉसेट से ईथर जोड़ें {#add-ether-from-faucet}

अपने NFT को मिंट करने (या इथेरियम ब्लॉकचेन पर किसी भी लेन-देन पर हस्ताक्षर करने) के लिए, हमें कुछ नकली ETH की आवश्यकता होगी। टेस्टनेट ETH प्राप्त करने के लिए, [Alchemy Sepolia फॉसेट](https://www.alchemy.com/faucets/ethereum-sepolia) जैसे किसी मेंटेन किए गए फॉसेट का उपयोग करें और अपना Sepolia खाता पता दर्ज करें। इसके तुरंत बाद आपको अपने मेटामास्क खाते में ETH दिखाई देना चाहिए!
### अपना बैलेंस जांचें {#check-your-balance}

यह दोबारा जांचने के लिए कि हमारा बैलेंस वहां मौजूद है, आइए [Alchemy के सैंडबॉक्स टूल](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) का उपयोग करके एक [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) अनुरोध करें। यह हमारे वॉलेट में ETH की मात्रा लौटाएगा। अपना मेटामास्क खाता पता दर्ज करने और “Send Request” पर क्लिक करने के बाद, आपको इस तरह की प्रतिक्रिया देखनी चाहिए:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**नोट:** यह परिणाम Wei में है, ETH में नहीं। Wei का उपयोग ईथर के सबसे छोटे मूल्यवर्ग के रूप में किया जाता है। Wei से ETH में रूपांतरण है: 1 ETH = 10¹⁸ Wei। इसलिए यदि हम 0xde0b6b3a7640000 को दशमलव में बदलते हैं तो हमें 1\*10¹⁸ मिलता है जो 1 ETH के बराबर है।

शुक्र है! हमारा सारा नकली पैसा वहीं है! <Emoji text=":money_mouth_face:" size={1} />
## मेटामास्क को अपने UI से जोड़ें {#connect-metamask-to-your-ui}

अब जब हमारा मेटामास्क वॉलेट सेट हो गया है, तो चलिए अपने विकेंद्रीकृत एप्लिकेशन (dapp) को इससे जोड़ते हैं!

चूंकि हम [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) प्रतिमान (paradigm) का पालन करना चाहते हैं, इसलिए हम एक अलग फ़ाइल बनाने जा रहे हैं जिसमें हमारे विकेंद्रीकृत एप्लिकेशन (dapp) के तर्क, डेटा और नियमों को प्रबंधित करने के लिए हमारे फ़ंक्शन शामिल होंगे, और फिर उन फ़ंक्शंस को हमारे फ्रंटएंड (हमारे Minter.js कंपोनेंट) में पास करेंगे।

### `connectWallet` फ़ंक्शन {#connect-wallet-function}

ऐसा करने के लिए, आइए अपनी `src` डायरेक्टरी में `utils` नामक एक नया फ़ोल्डर बनाएँ और इसके अंदर `interact.js` नामक एक फ़ाइल जोड़ें, जिसमें हमारे सभी वॉलेट और स्मार्ट अनुबंध इंटरैक्शन फ़ंक्शन शामिल होंगे।

अपनी `interact.js` फ़ाइल में, हम एक `connectWallet` फ़ंक्शन लिखेंगे, जिसे हम फिर अपने `Minter.js` कंपोनेंट में आयात (import) और कॉल करेंगे।

अपनी `interact.js` फ़ाइल में, निम्नलिखित जोड़ें

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

आइए समझते हैं कि यह कोड क्या करता है:

सबसे पहले, हमारा फ़ंक्शन यह जांचता है कि क्या आपके ब्राउज़र में `window.ethereum` सक्षम है।

`window.ethereum` मेटामास्क और अन्य वॉलेट प्रदाताओं द्वारा इंजेक्ट किया गया एक वैश्विक API है जो वेबसाइटों को उपयोगकर्ताओं के इथेरियम खातों का अनुरोध करने की अनुमति देता है। यदि स्वीकृत हो जाता है, तो यह उन ब्लॉकचेन से डेटा पढ़ सकता है जिनसे उपयोगकर्ता जुड़ा हुआ है, और सुझाव दे सकता है कि उपयोगकर्ता संदेशों और लेन-देन पर हस्ताक्षर करे। अधिक जानकारी के लिए [मेटामास्क दस्तावेज़](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) देखें!

यदि `window.ethereum` मौजूद _नहीं_ है, तो इसका मतलब है कि मेटामास्क स्थापित नहीं है। इसके परिणामस्वरूप एक JSON ऑब्जेक्ट लौटाया जाता है, जहाँ लौटाया गया `address` एक खाली स्ट्रिंग है, और `status` JSX ऑब्जेक्ट यह संदेश देता है कि उपयोगकर्ता को मेटामास्क स्थापित करना चाहिए।

**हमारे द्वारा लिखे गए अधिकांश फ़ंक्शन JSON ऑब्जेक्ट लौटाएंगे जिनका उपयोग हम अपने स्थिति वेरिएबल और UI को अपडेट करने के लिए कर सकते हैं।**

अब यदि `window.ethereum` मौजूद _है_, तो चीजें दिलचस्प हो जाती हैं।

try/catch लूप का उपयोग करके, हम [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) को कॉल करके मेटामास्क से जुड़ने का प्रयास करेंगे। इस फ़ंक्शन को कॉल करने से ब्राउज़र में मेटामास्क खुल जाएगा, जिससे उपयोगकर्ता को अपने वॉलेट को आपके विकेंद्रीकृत एप्लिकेशन (dapp) से जोड़ने के लिए कहा जाएगा।

- यदि उपयोगकर्ता जुड़ना चुनता है, तो `method: "eth_requestAccounts"` एक ऐरे लौटाएगा जिसमें उपयोगकर्ता के वे सभी खाता पते होंगे जो विकेंद्रीकृत एप्लिकेशन (dapp) से जुड़े हैं। कुल मिलाकर, हमारा `connectWallet` फ़ंक्शन एक JSON ऑब्जेक्ट लौटाएगा जिसमें इस ऐरे में _पहला_ `address` \(लाइन 9 देखें\) और एक `status` संदेश होगा जो उपयोगकर्ता को स्मार्ट अनुबंध पर एक संदेश लिखने के लिए प्रेरित करता है।
- यदि उपयोगकर्ता कनेक्शन को अस्वीकार करता है, तो JSON ऑब्जेक्ट में लौटाए गए `address` के लिए एक खाली स्ट्रिंग होगी और एक `status` संदेश होगा जो यह दर्शाता है कि उपयोगकर्ता ने कनेक्शन को अस्वीकार कर दिया है।

### अपने Minter.js UI कंपोनेंट में connectWallet फ़ंक्शन जोड़ें {#add-connect-wallet}

अब जब हमने यह `connectWallet` फ़ंक्शन लिख लिया है, तो चलिए इसे अपने `Minter.js.` कंपोनेंट से जोड़ते हैं।

सबसे पहले, हमें `Minter.js` फ़ाइल के शीर्ष पर `import { connectWallet } from "./utils/interact.js";` जोड़कर अपने फ़ंक्शन को अपनी `Minter.js` फ़ाइल में आयात करना होगा। `Minter.js` की आपकी पहली 11 लाइनें अब इस तरह दिखनी चाहिए:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //स्थिति चर
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

फिर, अपने `connectWalletPressed` फ़ंक्शन के अंदर, हम अपने आयातित `connectWallet` फ़ंक्शन को इस तरह कॉल करेंगे:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

ध्यान दें कि हमारी अधिकांश कार्यक्षमता `interact.js` फ़ाइल से हमारे `Minter.js` कंपोनेंट से कैसे अलग (abstracted) की गई है? ऐसा इसलिए है ताकि हम M-V-C प्रतिमान का अनुपालन कर सकें!

`connectWalletPressed` में, हम बस अपने आयातित `connectWallet` फ़ंक्शन के लिए एक await कॉल करते हैं, और इसकी प्रतिक्रिया का उपयोग करके, हम अपने `status` और `walletAddress` वेरिएबल को उनके स्थिति हुक के माध्यम से अपडेट करते हैं।

अब, आइए दोनों फ़ाइलों `Minter.js` और `interact.js` को सहेजें और अब तक अपने UI का परीक्षण करें।

अपने ब्राउज़र को localhost:3000 पर खोलें, और पेज के ऊपर दाईं ओर "Connect Wallet" बटन दबाएँ।

यदि आपके पास मेटामास्क स्थापित है, तो आपको अपने वॉलेट को अपने विकेंद्रीकृत एप्लिकेशन (dapp) से जोड़ने के लिए कहा जाना चाहिए। जुड़ने के निमंत्रण को स्वीकार करें।

आपको देखना चाहिए कि वॉलेट बटन अब यह दर्शाता है कि आपका पता जुड़ा हुआ है।

इसके बाद, पेज को रीफ्रेश करने का प्रयास करें... यह अजीब है। हमारा वॉलेट बटन हमें मेटामास्क को जोड़ने के लिए प्रेरित कर रहा है, भले ही यह पहले से जुड़ा हुआ है...

हालाँकि चिंता न करें! हम `getCurrentWalletConnected` नामक एक फ़ंक्शन को लागू करके इसे आसानी से ठीक कर सकते हैं, जो यह जांचेगा कि क्या कोई पता पहले से ही हमारे विकेंद्रीकृत एप्लिकेशन (dapp) से जुड़ा हुआ है और तदनुसार हमारे UI को अपडेट करेगा!

### getCurrentWalletConnected फ़ंक्शन {#get-current-wallet}

अपनी `interact.js` फ़ाइल में, निम्नलिखित `getCurrentWalletConnected` फ़ंक्शन जोड़ें:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

यह कोड उस `connectWallet` फ़ंक्शन के _बहुत_ समान है जिसे हमने अभी पहले लिखा था।

मुख्य अंतर यह है कि `eth_requestAccounts` विधि को कॉल करने के बजाय, जो उपयोगकर्ता के लिए अपना वॉलेट जोड़ने के लिए मेटामास्क खोलता है, यहाँ हम `eth_accounts` विधि को कॉल करते हैं, जो बस एक ऐरे लौटाता है जिसमें वर्तमान में हमारे विकेंद्रीकृत एप्लिकेशन (dapp) से जुड़े मेटामास्क पते होते हैं।

इस फ़ंक्शन को काम करते हुए देखने के लिए, आइए इसे अपने `Minter.js` कंपोनेंट के `useEffect` फ़ंक्शन में कॉल करें।

जैसे हमने `connectWallet` के लिए किया था, हमें इस फ़ंक्शन को अपनी `interact.js` फ़ाइल से अपनी `Minter.js` फ़ाइल में इस तरह आयात करना होगा:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //यहाँ आयात करें
} from "./utils/interact.js"
```

अब, हम बस इसे अपने `useEffect` फ़ंक्शन में कॉल करते हैं:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

ध्यान दें, हम अपने `walletAddress` और `status` स्थिति वेरिएबल को अपडेट करने के लिए `getCurrentWalletConnected` पर अपने कॉल की प्रतिक्रिया का उपयोग करते हैं।

एक बार जब आप यह कोड जोड़ लेते हैं, तो हमारी ब्राउज़र विंडो को रीफ्रेश करने का प्रयास करें। बटन को यह कहना चाहिए कि आप जुड़े हुए हैं, और आपके जुड़े हुए वॉलेट के पते का पूर्वावलोकन दिखाना चाहिए - आपके रीफ्रेश करने के बाद भी!

### addWalletListener लागू करें {#implement-add-wallet-listener}

हमारे विकेंद्रीकृत एप्लिकेशन (dapp) वॉलेट सेटअप में अंतिम चरण वॉलेट लिसनर को लागू करना है ताकि जब हमारे वॉलेट की स्थिति बदलती है, जैसे कि जब उपयोगकर्ता डिस्कनेक्ट करता है या खाते बदलता है, तो हमारा UI अपडेट हो जाए।

अपनी `Minter.js` फ़ाइल में, एक फ़ंक्शन `addWalletListener` जोड़ें जो निम्नलिखित जैसा दिखता है:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

आइए जल्दी से समझें कि यहाँ क्या हो रहा है:

- सबसे पहले, हमारा फ़ंक्शन यह जांचता है कि क्या `window.ethereum` सक्षम है \(यानी, मेटामास्क स्थापित है\)।
  - यदि यह नहीं है, तो हम बस अपने `status` स्थिति वेरिएबल को एक JSX स्ट्रिंग पर सेट करते हैं जो उपयोगकर्ता को मेटामास्क स्थापित करने के लिए प्रेरित करता है।
  - यदि यह सक्षम है, तो हम लाइन 3 पर लिसनर `window.ethereum.on("accountsChanged")` सेट करते हैं जो मेटामास्क वॉलेट में स्थिति परिवर्तनों को सुनता है, जिसमें तब शामिल होता है जब उपयोगकर्ता विकेंद्रीकृत एप्लिकेशन (dapp) से एक अतिरिक्त खाता जोड़ता है, खाते बदलता है, या किसी खाते को डिस्कनेक्ट करता है। यदि कम से कम एक खाता जुड़ा हुआ है, तो `walletAddress` स्थिति वेरिएबल को लिसनर द्वारा लौटाए गए `accounts` ऐरे में पहले खाते के रूप में अपडेट किया जाता है। अन्यथा, `walletAddress` को एक खाली स्ट्रिंग के रूप में सेट किया जाता है।

अंत में, हमें इसे अपने `useEffect` फ़ंक्शन में कॉल करना होगा:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

और लीजिए! हमने अपने वॉलेट की सभी कार्यक्षमता की प्रोग्रामिंग पूरी कर ली है! अब जब हमारा वॉलेट सेट हो गया है, तो चलिए पता लगाते हैं कि अपना NFT कैसे मिंट करें!

## NFT मेटाडेटा 101 {#nft-metadata-101}

तो याद रखें कि हमने इस ट्यूटोरियल के चरण 0 में जिस NFT मेटाडेटा के बारे में बात की थी—यह एक NFT को जीवंत बनाता है, जिससे इसमें डिजिटल संपत्ति, नाम, विवरण और अन्य विशेषताओं जैसे गुण हो सकते हैं।

हमें इस मेटाडेटा को JSON ऑब्जेक्ट के रूप में कॉन्फ़िगर करने और इसे संग्रहीत करने की आवश्यकता होगी, ताकि हम अपने स्मार्ट अनुबंध के `mintNFT` फ़ंक्शन को कॉल करते समय इसे `tokenURI` पैरामीटर के रूप में पास कर सकें।

"Link to Asset", "Name", "Description" फ़ील्ड में टेक्स्ट हमारे NFT के मेटाडेटा के विभिन्न गुणों को शामिल करेगा। हम इस मेटाडेटा को JSON ऑब्जेक्ट के रूप में स्वरूपित करेंगे, लेकिन हम इस JSON ऑब्जेक्ट को कहाँ संग्रहीत कर सकते हैं, इसके लिए कुछ विकल्प हैं:

- हम इसे इथेरियम ब्लॉकचेन पर संग्रहीत कर सकते हैं; हालाँकि, ऐसा करना बहुत महंगा होगा।
- हम इसे AWS या Firebase जैसे केंद्रीकृत सर्वर पर संग्रहीत कर सकते हैं। लेकिन यह हमारे विकेंद्रीकरण के लोकाचार को हरा देगा।
- हम IPFS का उपयोग कर सकते हैं, जो एक वितरित फ़ाइल सिस्टम में डेटा संग्रहीत करने और साझा करने के लिए एक विकेंद्रीकृत प्रोटोकॉल और पीयर-टू-पीयर नेटवर्क है। चूंकि यह प्रोटोकॉल विकेंद्रीकृत और मुफ़्त है, इसलिए यह हमारा सबसे अच्छा विकल्प है!

अपने मेटाडेटा को IPFS पर संग्रहीत करने के लिए, हम [Pinata](https://pinata.cloud/) का उपयोग करेंगे, जो एक सुविधाजनक IPFS API और टूलकिट है। अगले चरण में, हम बताएंगे कि इसे कैसे करना है!

## अपने मेटाडेटा को IPFS पर पिन करने के लिए Pinata का उपयोग करें {#use-pinata-to-pin-your-metadata-to-ipfs}

यदि आपके पास [Pinata](https://pinata.cloud/) खाता नहीं है, तो [यहाँ](https://app.pinata.cloud/auth/signup) मुफ़्त खाते के लिए साइन अप करें और अपने ईमेल और खाते को सत्यापित करने के चरणों को पूरा करें।

### अपनी Pinata API कुंजी बनाएँ {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) पेज पर नेविगेट करें, फिर शीर्ष पर "New Key" बटन चुनें, Admin विजेट को सक्षम के रूप में सेट करें, और अपनी कुंजी को नाम दें।

फिर आपको अपनी API जानकारी के साथ एक पॉपअप दिखाया जाएगा। इसे किसी सुरक्षित स्थान पर रखना सुनिश्चित करें।

अब जब हमारी कुंजी सेट हो गई है, तो चलिए इसे अपने प्रोजेक्ट में जोड़ते हैं ताकि हम इसका उपयोग कर सकें।

### एक .env फ़ाइल बनाएँ {#create-a-env}

हम अपनी Pinata कुंजी और गुप्त (secret) को पर्यावरण (environment) फ़ाइल में सुरक्षित रूप से संग्रहीत कर सकते हैं। आइए आपकी प्रोजेक्ट डायरेक्टरी में [dotenv पैकेज](https://www.npmjs.com/package/dotenv) स्थापित करें।

अपने टर्मिनल में एक नया टैब खोलें \(लोकल होस्ट चलाने वाले टैब से अलग\) और सुनिश्चित करें कि आप `minter-starter-files` फ़ोल्डर में हैं, फिर अपने टर्मिनल में निम्नलिखित कमांड चलाएँ:

```text
npm install dotenv --save
```

इसके बाद, अपनी कमांड लाइन पर निम्नलिखित दर्ज करके अपने `minter-starter-files` की रूट डायरेक्टरी में एक `.env` फ़ाइल बनाएँ:

```javascript
vim.env
```

यह vim \(एक टेक्स्ट एडिटर\) में आपकी `.env` फ़ाइल खोल देगा। इसे सहेजने के लिए अपने कीबोर्ड पर उसी क्रम में "esc" + ":" + "q" दबाएँ।

इसके बाद, VSCode में, अपनी `.env` फ़ाइल पर नेविगेट करें और इसमें अपनी Pinata API कुंजी और API गुप्त (secret) जोड़ें, इस तरह:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

फ़ाइल सहेजें, और फिर आप अपने JSON मेटाडेटा को IPFS पर अपलोड करने के लिए फ़ंक्शन लिखना शुरू करने के लिए तैयार हैं!

### pinJSONToIPFS लागू करें {#pin-json-to-ipfs}

हमारे लिए सौभाग्य से, Pinata के पास [विशेष रूप से JSON डेटा को IPFS पर अपलोड करने के लिए एक API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) है और axios के साथ एक सुविधाजनक JavaScript उदाहरण है जिसका हम कुछ मामूली संशोधनों के साथ उपयोग कर सकते हैं।

अपने `utils` फ़ोल्डर में, आइए `pinata.js` नामक एक और फ़ाइल बनाएँ और फिर .env फ़ाइल से अपनी Pinata गुप्त (secret) और कुंजी को इस तरह आयात करें:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

इसके बाद, नीचे दिए गए अतिरिक्त कोड को अपनी `pinata.js` फ़ाइल में पेस्ट करें। चिंता न करें, हम समझाएंगे कि हर चीज़ का क्या मतलब है!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //Pinata को axios POST अनुरोध कर रहे हैं ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

तो यह कोड वास्तव में क्या करता है?

सबसे पहले, यह [axios](https://www.npmjs.com/package/axios) आयात करता है, जो ब्राउज़र और node.js के लिए एक प्रॉमिस आधारित HTTP क्लाइंट है, जिसका उपयोग हम Pinata से अनुरोध करने के लिए करेंगे।

फिर हमारे पास हमारा एसिंक्रोनस फ़ंक्शन `pinJSONToIPFS` है, जो अपने इनपुट के रूप में `JSONBody` लेता है और इसके हेडर में Pinata API कुंजी और गुप्त (secret) लेता है, यह सब उनके `pinJSONToIPFS` API पर एक POST अनुरोध करने के लिए है।

- यदि यह POST अनुरोध सफल होता है, तो हमारा फ़ंक्शन एक JSON ऑब्जेक्ट लौटाता है जिसमें `success` बूलियन सत्य (true) के रूप में होता है और `pinataUrl` जहाँ हमारा मेटाडेटा पिन किया गया था। हम इस लौटाए गए `pinataUrl` का उपयोग अपने स्मार्ट अनुबंध के मिंट फ़ंक्शन में `tokenURI` इनपुट के रूप में करेंगे।
- यदि यह POST अनुरोध विफल हो जाता है, तो हमारा फ़ंक्शन एक JSON ऑब्जेक्ट लौटाता है जिसमें `success` बूलियन असत्य (false) के रूप में होता है और एक `message` स्ट्रिंग होती है जो हमारी त्रुटि को रिले करती है।

हमारे `connectWallet` फ़ंक्शन रिटर्न प्रकारों की तरह, हम JSON ऑब्जेक्ट लौटा रहे हैं ताकि हम अपने स्थिति वेरिएबल और UI को अपडेट करने के लिए उनके पैरामीटर का उपयोग कर सकें।

## अपना स्मार्ट अनुबंध लोड करें {#load-your-smart-contract}

अब जब हमारे पास अपने `pinJSONToIPFS` फ़ंक्शन के माध्यम से अपने NFT मेटाडेटा को IPFS पर अपलोड करने का एक तरीका है, तो हमें अपने स्मार्ट अनुबंध का एक उदाहरण (instance) लोड करने के तरीके की आवश्यकता होगी ताकि हम इसके `mintNFT` फ़ंक्शन को कॉल कर सकें।

जैसा कि हमने पहले उल्लेख किया है, इस ट्यूटोरियल में हम [इस मौजूदा NFT स्मार्ट अनुबंध](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) का उपयोग करेंगे; हालाँकि, यदि आप यह सीखना चाहते हैं कि हमने इसे कैसे बनाया, या खुद एक बनाना चाहते हैं, तो हम अत्यधिक अनुशंसा करते हैं कि आप हमारा दूसरा ट्यूटोरियल, ["How to Create an NFT"](https://www.alchemy.com/docs/how-to-create-an-nft) देखें।

### अनुबंध ABI {#contract-abi}

यदि आपने हमारी फ़ाइलों की बारीकी से जाँच की है, तो आपने देखा होगा कि हमारी `src` डायरेक्टरी में, एक `contract-abi.json` फ़ाइल है। एक ABI यह निर्दिष्ट करने के लिए आवश्यक है कि कोई अनुबंध किस फ़ंक्शन को लागू करेगा और साथ ही यह सुनिश्चित करेगा कि फ़ंक्शन उस प्रारूप में डेटा लौटाएगा जिसकी आप अपेक्षा कर रहे हैं।

हमें इथेरियम ब्लॉकचेन से जुड़ने और अपने स्मार्ट अनुबंध को लोड करने के लिए एक Alchemy API कुंजी और Alchemy Web3 API की भी आवश्यकता होगी।

### अपनी Alchemy API कुंजी बनाएँ {#create-alchemy-api}

यदि आपके पास पहले से Alchemy खाता नहीं है, तो [यहाँ मुफ़्त में साइन अप करें।](https://alchemy.com/?a=eth-org-nft-minter)

एक बार जब आप Alchemy खाता बना लेते हैं, तो आप एक ऐप बनाकर API कुंजी उत्पन्न कर सकते हैं। यह हमें Sepolia टेस्ट नेटवर्क पर अनुरोध करने की अनुमति देगा।

नेव बार में “Apps” पर होवर करके और “Create App” पर क्लिक करके अपने Alchemy डैशबोर्ड में “Create App” पेज पर नेविगेट करें।

अपने ऐप को नाम दें (हमने "My First NFT!" चुना है), एक संक्षिप्त विवरण दें, अपने ऐप की बुककीपिंग के लिए उपयोग किए जाने वाले Environment के लिए “Staging” चुनें, और अपने नेटवर्क के लिए “Sepolia” चुनें।

“Create app” पर क्लिक करें और बस हो गया! आपका ऐप नीचे दी गई तालिका में दिखाई देना चाहिए।

बहुत बढ़िया, तो अब जब हमने अपना HTTP Alchemy API URL बना लिया है, तो इसे अपने क्लिपबोर्ड पर कॉपी करें...

…और फिर चलिए इसे अपनी `.env` फ़ाइल में जोड़ते हैं। कुल मिलाकर, आपकी .env फ़ाइल इस तरह दिखनी चाहिए:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-sepolia.g.alchemy.com/v2/<alchemy-key>
```

अब जब हमारे पास अपना अनुबंध ABI और अपनी Alchemy API कुंजी है, तो हम [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) का उपयोग करके अपने स्मार्ट अनुबंध को लोड करने के लिए तैयार हैं।
### अपना Alchemy Web3 एंडपॉइंट और अनुबंध सेट करें {#setup-alchemy-endpoint}

सबसे पहले, यदि आपके पास यह पहले से नहीं है, तो आपको टर्मिनल में होम डायरेक्टरी: `nft-minter-tutorial` पर नेविगेट करके [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) स्थापित करना होगा:

```text
cd ..
npm install @alch/alchemy-web3
```

इसके बाद चलिए अपनी `interact.js` फ़ाइल पर वापस चलते हैं। फ़ाइल के शीर्ष पर, अपनी .env फ़ाइल से अपनी Alchemy कुंजी आयात करने और अपना Alchemy Web3 एंडपॉइंट सेट करने के लिए निम्नलिखित कोड जोड़ें:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), [Web3.js](https://docs.web3js.org/) के चारों ओर एक रैपर है, जो एक Web3 डेवलपर के रूप में आपके जीवन को आसान बनाने के लिए उन्नत API विधियाँ और अन्य महत्वपूर्ण लाभ प्रदान करता है। इसे न्यूनतम कॉन्फ़िगरेशन की आवश्यकता के लिए डिज़ाइन किया गया है ताकि आप इसे तुरंत अपने ऐप में उपयोग करना शुरू कर सकें!

इसके बाद, चलिए अपनी फ़ाइल में अपना अनुबंध ABI और अनुबंध पता जोड़ते हैं।

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

एक बार जब हमारे पास वे दोनों हो जाते हैं, तो हम अपने मिंट फ़ंक्शन की कोडिंग शुरू करने के लिए तैयार हैं!

## mintNFT फ़ंक्शन लागू करें {#implement-the-mintnft-function}

अपनी `interact.js` फ़ाइल के अंदर, आइए अपने फ़ंक्शन, `mintNFT` को परिभाषित करें, जो नाम के अनुसार हमारे NFT को मिंट करेगा।

चूंकि हम कई एसिंक्रोनस कॉल करेंगे \(हमारे मेटाडेटा को IPFS पर पिन करने के लिए Pinata को, हमारे स्मार्ट अनुबंध को लोड करने के लिए Alchemy Web3 को, और हमारे लेन-देन पर हस्ताक्षर करने के लिए मेटामास्क को\), हमारा फ़ंक्शन भी एसिंक्रोनस होगा।

हमारे फ़ंक्शन के तीन इनपुट हमारी डिजिटल संपत्ति का `url`, `name`, और `description` होंगे। `connectWallet` फ़ंक्शन के नीचे निम्नलिखित फ़ंक्शन हस्ताक्षर जोड़ें:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### इनपुट त्रुटि हैंडलिंग {#input-error-handling}

स्वाभाविक रूप से, फ़ंक्शन की शुरुआत में किसी प्रकार की इनपुट त्रुटि हैंडलिंग होना समझ में आता है, इसलिए यदि हमारे इनपुट पैरामीटर सही नहीं हैं तो हम इस फ़ंक्शन से बाहर निकल जाते हैं। अपने फ़ंक्शन के अंदर, आइए निम्नलिखित कोड जोड़ें:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटि प्रबंधन
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

अनिवार्य रूप से, यदि कोई भी इनपुट पैरामीटर एक खाली स्ट्रिंग है, तो हम एक JSON ऑब्जेक्ट लौटाते हैं जहाँ `success` बूलियन असत्य (false) है, और `status` स्ट्रिंग यह संदेश देती है कि हमारे UI में सभी फ़ील्ड पूर्ण होने चाहिए।

### मेटाडेटा को IPFS पर अपलोड करें {#upload-metadata-to-ipfs}

एक बार जब हम जान जाते हैं कि हमारा मेटाडेटा ठीक से स्वरूपित है, तो अगला कदम इसे JSON ऑब्जेक्ट में लपेटना और हमारे द्वारा लिखे गए `pinJSONToIPFS` के माध्यम से इसे IPFS पर अपलोड करना है!

ऐसा करने के लिए, हमें सबसे पहले `pinJSONToIPFS` फ़ंक्शन को अपनी `interact.js` फ़ाइल में आयात करना होगा। `interact.js` के बिल्कुल शीर्ष पर, आइए जोड़ें:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

याद करें कि `pinJSONToIPFS` एक JSON बॉडी लेता है। इसलिए इससे पहले कि हम इसे कॉल करें, हमें अपने `url`, `name`, और `description` पैरामीटर को JSON ऑब्जेक्ट में स्वरूपित करना होगा।

आइए `metadata` नामक एक JSON ऑब्जेक्ट बनाने के लिए अपने कोड को अपडेट करें और फिर इस `metadata` पैरामीटर के साथ `pinJSONToIPFS` को कॉल करें:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटि प्रबंधन
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //मेटाडेटा बनाएं
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata कॉल करें
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

ध्यान दें, हम `pinJSONToIPFS(metadata)` पर अपने कॉल की प्रतिक्रिया को `pinataResponse` ऑब्जेक्ट में संग्रहीत करते हैं। फिर, हम किसी भी त्रुटि के लिए इस ऑब्जेक्ट को पार्स करते हैं।

यदि कोई त्रुटि है, तो हम एक JSON ऑब्जेक्ट लौटाते हैं जहाँ `success` बूलियन असत्य (false) है और हमारी `status` स्ट्रिंग यह संदेश देती है कि हमारा कॉल विफल हो गया। अन्यथा, हम `pinataResponse` से `pinataURL` निकालते हैं और इसे अपने `tokenURI` वेरिएबल के रूप में संग्रहीत करते हैं।

अब हमारी फ़ाइल के शीर्ष पर हमारे द्वारा प्रारंभ किए गए Alchemy Web3 API का उपयोग करके अपने स्मार्ट अनुबंध को लोड करने का समय आ गया है। `window.contract` वैश्विक वेरिएबल पर अनुबंध सेट करने के लिए `mintNFT` फ़ंक्शन के निचले भाग में कोड की निम्नलिखित लाइन जोड़ें:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

हमारे `mintNFT` फ़ंक्शन में जोड़ने वाली अंतिम चीज़ हमारा इथेरियम लेन-देन है:

```javascript
//अपना इथेरियम लेन-देन सेट अप करें
const transactionParameters = {
  to: contractAddress, // अनुबंध प्रकाशन के दौरान छोड़कर आवश्यक है।
  from: window.ethereum.selectedAddress, // उपयोगकर्ता के सक्रिय पते से मेल खाना चाहिए।
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFT स्मार्ट अनुबंध को कॉल करें
}

//मेटामास्क के माध्यम से लेन-देन पर हस्ताक्षर करें
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

यदि आप पहले से ही इथेरियम लेन-देन से परिचित हैं, तो आप देखेंगे कि संरचना काफी हद तक वैसी ही है जैसी आपने देखी है।

- सबसे पहले, हम अपने लेन-देन पैरामीटर सेट करते हैं।
  - `to` प्राप्तकर्ता का पता \(हमारा स्मार्ट अनुबंध\) निर्दिष्ट करता है
  - `from` लेन-देन के हस्ताक्षरकर्ता को निर्दिष्ट करता है \(मेटामास्क से जुड़ा उपयोगकर्ता का पता: `window.ethereum.selectedAddress`\)
  - `data` में हमारे स्मार्ट अनुबंध `mintNFT` विधि का कॉल होता है, जो हमारे `tokenURI` और उपयोगकर्ता के वॉलेट पते, `window.ethereum.selectedAddress` को इनपुट के रूप में प्राप्त करता है
- फिर, हम एक await कॉल करते हैं, `window.ethereum.request,` जहाँ हम मेटामास्क को लेन-देन पर हस्ताक्षर करने के लिए कहते हैं। ध्यान दें, इस अनुरोध में, हम अपनी eth विधि \(eth_SentTransaction\) निर्दिष्ट कर रहे हैं और अपना `transactionParameters` पास कर रहे हैं। इस बिंदु पर, मेटामास्क ब्राउज़र में खुल जाएगा, और उपयोगकर्ता को लेन-देन पर हस्ताक्षर करने या अस्वीकार करने के लिए प्रेरित करेगा।
  - यदि लेन-देन सफल होता है, तो फ़ंक्शन एक JSON ऑब्जेक्ट लौटाएगा जहाँ बूलियन `success` सत्य (true) पर सेट है और `status` स्ट्रिंग उपयोगकर्ता को उनके लेन-देन के बारे में अधिक जानकारी के लिए Etherscan की जाँच करने के लिए प्रेरित करती है।
  - यदि लेन-देन विफल हो जाता है, तो फ़ंक्शन एक JSON ऑब्जेक्ट लौटाएगा जहाँ `success` बूलियन असत्य (false) पर सेट है, और `status` स्ट्रिंग त्रुटि संदेश को रिले करती है।

कुल मिलाकर, हमारा `mintNFT` फ़ंक्शन इस तरह दिखना चाहिए:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटि प्रबंधन
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //मेटाडेटा बनाएं
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata पिन अनुरोध
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //स्मार्ट अनुबंध लोड करें
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //अपना इथेरियम लेन-देन सेट अप करें
  const transactionParameters = {
    to: contractAddress, // अनुबंध प्रकाशन के दौरान छोड़कर आवश्यक है।
    from: window.ethereum.selectedAddress, // उपयोगकर्ता के सक्रिय पते से मेल खाना चाहिए।
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //NFT स्मार्ट अनुबंध को कॉल करें
  }

  //मेटामास्क के माध्यम से लेन-देन पर हस्ताक्षर करें
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

यह एक बहुत बड़ा फ़ंक्शन है! अब, हमें बस अपने `mintNFT` फ़ंक्शन को अपने `Minter.js` कंपोनेंट से जोड़ना है...

## mintNFT को हमारे Minter.js फ्रंटएंड से जोड़ें {#connect-our-frontend}

अपनी `Minter.js` फ़ाइल खोलें और शीर्ष पर `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` लाइन को इस प्रकार अपडेट करें:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

अंत में, अपने आयातित `mintNFT` फ़ंक्शन को await कॉल करने के लिए `onMintPressed` फ़ंक्शन लागू करें और यह दर्शाने के लिए `status` स्थिति वेरिएबल को अपडेट करें कि हमारा लेन-देन सफल हुआ या विफल:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## अपने NFT को एक लाइव वेबसाइट पर तैनात करें {#deploy-your-nft}

क्या आप अपने प्रोजेक्ट को लाइव करने के लिए तैयार हैं ताकि उपयोगकर्ता इसके साथ इंटरैक्ट कर सकें? अपने Minter को एक लाइव वेबसाइट पर तैनात करने के लिए [React तैनाती दस्तावेज़](https://create-react-app.dev/docs/deployment/) देखें।

एक आखिरी कदम...
## ब्लॉकचेन की दुनिया में तहलका मचाएं {#take-the-blockchain-world-by-storm}

मज़ाक कर रहा हूँ, आप ट्यूटोरियल के अंत तक पहुँच गए हैं!

संक्षेप में, एक NFT मिंटर बनाकर, आपने सफलतापूर्वक सीखा कि:

- अपने फ्रंटएंड प्रोजेक्ट के माध्यम से मेटामास्क से कैसे जुड़ें
- अपने फ्रंटएंड से स्मार्ट अनुबंध विधियों को कैसे कॉल करें
- मेटामास्क का उपयोग करके लेन-देन पर हस्ताक्षर कैसे करें

संभवतः, आप अपने वॉलेट में अपने विकेंद्रीकृत एप्लिकेशन (dapp) के माध्यम से मिंट किए गए NFT को दिखाना चाहेंगे — इसलिए हमारा त्वरित ट्यूटोरियल [How to View Your NFT in Your Wallet](/developers/tutorials/how-to-view-nft-in-metamask/) देखना सुनिश्चित करें!

और, हमेशा की तरह, यदि आपके कोई प्रश्न हैं, तो हम [Alchemy डिस्कॉर्ड](https://discord.gg/gWuC7zB) में मदद करने के लिए यहाँ हैं। हम यह देखने के लिए इंतज़ार नहीं कर सकते कि आप इस ट्यूटोरियल की अवधारणाओं को अपने भविष्य के प्रोजेक्ट्स में कैसे लागू करते हैं!
