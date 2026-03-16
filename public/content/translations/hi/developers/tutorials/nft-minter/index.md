---
title: "NFT मिन्टर ट्यूटोरियल"
description: "इस ट्यूटोरियल में, आप एक NFT मिन्टर बनाएँगे और MetaMask व Web3 टूल का उपयोग करके अपने स्मार्ट अनुबंध को React फ्रंटएंड से जोड़कर एक पूर्ण स्टैक डैप बनाना सीखेंगे।"
author: "smudgil"
tags:
  [
    "Solidity",
    "NFT",
    "Alchemy",
    "स्मार्ट अनुबंध",
    "frontend",
    "Pinata"
  ]
skill: intermediate
lang: hi
published: 2021-10-06
---

Web2 बैकग्राउंड से आने वाले डेवलपर्स के लिए सबसे बड़ी चुनौतियों में से एक यह पता लगाना है कि अपने स्मार्ट अनुबंध को फ्रंटएंड प्रोजेक्ट से कैसे जोड़ा जाए और उसके साथ कैसे इंटरैक्ट किया जाए।

एक NFT मिन्टर बनाकर — एक सरल UI जहाँ आप अपनी डिजिटल संपत्ति, एक शीर्षक और एक विवरण के लिए एक लिंक इनपुट कर सकते हैं — आप सीखेंगे कि:

- अपने फ्रंटएंड प्रोजेक्ट के माध्यम से MetaMask से कनेक्ट करें
- अपने फ्रंटएंड से स्मार्ट अनुबंध विधियों को कॉल करें
- MetaMask का उपयोग करके लेनदेन पर हस्ताक्षर करें

इस ट्यूटोरियल में, हम अपने फ्रंटएंड फ्रेमवर्क के रूप में [React](https://react.dev/) का उपयोग करेंगे। क्योंकि यह ट्यूटोरियल मुख्य रूप से Web3 विकास पर केंद्रित है, हम React की बुनियादी बातों को समझने में ज्यादा समय नहीं बिताएँगे। इसके बजाय, हम अपने प्रोजेक्ट में कार्यक्षमता लाने पर ध्यान केंद्रित करेंगे।

एक पूर्वापेक्षा के रूप में, आपको React की शुरुआती स्तर की समझ होनी चाहिए—पता होना चाहिए कि कंपोनेंट्स, प्रॉप्स, useState/useEffect, और बेसिक फंक्शन कॉलिंग कैसे काम करते हैं। यदि आपने पहले इनमें से किसी भी शब्द के बारे में नहीं सुना है, तो आप इस [React ट्यूटोरियल का परिचय](https://react.dev/learn/tutorial-tic-tac-toe) देख सकते हैं। अधिक विज़ुअल शिक्षार्थियों के लिए, हम नेट निंजा द्वारा इस उत्कृष्ट [पूर्ण आधुनिक React ट्यूटोरियल](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) वीडियो श्रृंखला की अत्यधिक अनुशंसा करते हैं।

और अगर आपके पास पहले से नहीं है, तो आपको इस ट्यूटोरियल को पूरा करने और ब्लॉकचेन पर कुछ भी बनाने के लिए निश्चित रूप से एक Alchemy खाते की आवश्यकता होगी। [यहां](https://alchemy.com/) एक निःशुल्क खाते के लिए साइन अप करें।

बिना किसी और देरी के, चलिए शुरू करते हैं!

## NFTs बनाना 101 {#making-nfts-101}

इससे पहले कि हम किसी भी कोड को देखना शुरू करें, यह समझना महत्वपूर्ण है कि NFT बनाना कैसे काम करता है। इसमें दो चरण शामिल हैं:

### एथेरियम ब्लॉकचेन पर एक NFT स्मार्ट अनुबंध प्रकाशित करें {#publish-nft}

दो NFT स्मार्ट अनुबंध मानकों के बीच सबसे बड़ा अंतर यह है कि ERC-1155 एक मल्टी-टोकन मानक है और इसमें बैच कार्यक्षमता शामिल है, जबकि ERC-721 एक एकल-टोकन मानक है और इसलिए एक समय में केवल एक टोकन स्थानांतरित करने का समर्थन करता है।

### मिन्टिंग फ़ंक्शन को कॉल करें {#minting-function}

आमतौर पर, इस मिन्टिंग फ़ंक्शन में आपको पैरामीटर के रूप में दो चर पास करने की आवश्यकता होती है, पहला `recipient`, जो उस पते को निर्दिष्ट करता है जिसे आपका ताज़ा बनाया गया NFT प्राप्त होगा, और दूसरा NFT का `tokenURI`, एक स्ट्रिंग जो NFT के मेटाडेटा का वर्णन करने वाले JSON दस्तावेज़ में हल होती है।

एक NFT का मेटाडेटा वास्तव में वही है जो इसे जीवंत करता है, जिससे इसमें नाम, विवरण, छवि (या अलग डिजिटल संपत्ति), और अन्य विशेषताओं जैसे गुण होते हैं। यहाँ [tokenURI का एक उदाहरण](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2) है, जिसमें NFT का मेटाडेटा है।

इस ट्यूटोरियल में, हम भाग 2 पर ध्यान केंद्रित करने जा रहे हैं, हमारे React UI का उपयोग करके मौजूदा NFT के स्मार्ट अनुबंध मिन्टिंग फ़ंक्शन को कॉल करना।

इस ट्यूटोरियल में हम जिस ERC-721 NFT स्मार्ट अनुबंध को कॉल करेंगे, उसका [लिंक यहाँ है](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)। यदि आप यह जानना चाहते हैं कि हमने इसे कैसे बनाया, तो हम आपको हमारे दूसरे ट्यूटोरियल, [\"एक NFT कैसे बनाएँ\"](https://www.alchemy.com/docs/how-to-create-an-nft) को देखने की अत्यधिक अनुशंसा करते हैं।

बढ़िया, अब जब हम समझ गए हैं कि NFT बनाना कैसे काम करता है, तो चलिए अपनी स्टार्टर फ़ाइलों को क्लोन करते हैं!

## स्टार्टर फ़ाइलों को क्लोन करें {#clone-the-starter-files}

सबसे पहले, इस प्रोजेक्ट के लिए स्टार्टर फाइलें प्राप्त करने के लिए [nft-minter-tutorial GitHub रिपॉजिटरी](https://github.com/alchemyplatform/nft-minter-tutorial) पर जाएं। इस रिपॉजिटरी को अपने स्थानीय परिवेश में क्लोन करें।

जब आप इस क्लोन की गई `nft-minter-tutorial` रिपॉजिटरी को खोलते हैं, तो आप देखेंगे कि इसमें दो फोल्डर हैं: `minter-starter-files` और `nft-minter`।

- `minter-starter-files` में इस प्रोजेक्ट के लिए स्टार्टर फाइलें (अनिवार्य रूप से React UI) होती हैं। इस ट्यूटोरियल में, **हम इस डायरेक्टरी में काम करेंगे**, क्योंकि आप इसे अपने एथेरियम वॉलेट और एक NFT स्मार्ट अनुबंध से जोड़कर इस UI को जीवंत करना सीखेंगे।
- `nft-minter` में पूरा पूरा किया गया ट्यूटोरियल है और यह आपके लिए **संदर्भ** के रूप में है **यदि आप फंस जाते हैं।**

अगला, अपने कोड एडिटर में `minter-starter-files` की अपनी प्रतिलिपि खोलें, और फिर अपने `src` फ़ोल्डर में नेविगेट करें।

हम जो भी कोड लिखेंगे वह `src` फोल्डर के अंतर्गत रहेगा। हम `Minter.js` घटक का संपादन करेंगे और अपने प्रोजेक्ट को Web3 कार्यक्षमता देने के लिए अतिरिक्त जावास्क्रिप्ट फाइलें लिखेंगे।

## चरण 2: हमारी स्टार्टर फाइलों को देखें {#step-2-check-out-our-starter-files}

कोडिंग शुरू करने से पहले, यह जांचना महत्वपूर्ण है कि स्टार्टर फ़ाइलों में हमारे लिए पहले से क्या प्रदान किया गया है।

### अपना react प्रोजेक्ट चलाएँ {#get-your-react-project-running}

आइए अपने ब्राउज़र में React प्रोजेक्ट चलाकर शुरू करें। React की खूबी यह है कि एक बार जब हमारा प्रोजेक्ट हमारे ब्राउज़र में चल रहा होता है, तो हमारे द्वारा सहेजे गए कोई भी परिवर्तन हमारे ब्राउज़र में लाइव अपडेट हो जाएँगे।

प्रोजेक्ट को चलाने के लिए, `minter-starter-files` फ़ोल्डर की रूट डायरेक्टरी में नेविगेट करें, और प्रोजेक्ट की निर्भरताएँ स्थापित करने के लिए अपने टर्मिनल में `npm install` चलाएँ:

```bash
cd minter-starter-files
npm install
```

एक बार वे स्थापित हो जाने के बाद, अपने टर्मिनल में `npm start` चलाएँ:

```bash
npm start
```

ऐसा करने से आपके ब्राउज़र में http://localhost:3000/ खुल जाना चाहिए, जहाँ आप हमारे प्रोजेक्ट के लिए फ्रंटएंड देखेंगे। इसमें 3 फ़ील्ड होने चाहिए: आपके NFT की संपत्ति के लिए एक लिंक इनपुट करने की जगह, आपके NFT का नाम दर्ज करें, और एक विवरण प्रदान करें।

यदि आप \"वॉलेट कनेक्ट करें\" या \"NFT मिंट करें\" बटन पर क्लिक करने का प्रयास करते हैं, तो आप देखेंगे कि वे काम नहीं करते हैं—ऐसा इसलिए है क्योंकि हमें अभी भी उनकी कार्यक्षमता को प्रोग्राम करने की आवश्यकता है! :\)

### Minter.js घटक {#minter-js}

**ध्यान दें:** सुनिश्चित करें कि आप `minter-starter-files` फ़ोल्डर में हैं न कि `nft-minter` फ़ोल्डर में!

चलिए हमारे संपादक में `src` फ़ोल्डर में वापस जाते हैं और `Minter.js` फ़ाइल खोलते हैं। यह बहुत महत्वपूर्ण है कि हम इस फ़ाइल में सब कुछ समझें, क्योंकि यह प्राथमिक React घटक है जिस पर हम काम करेंगे।

इस फ़ाइल के शीर्ष पर, हमारे पास हमारे स्थिति चर हैं जिन्हें हम विशिष्ट घटनाओं के बाद अपडेट करेंगे।

```javascript
//स्थिति चर
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React स्थिति चर या स्थिति हुक के बारे में कभी नहीं सुना? [इन](https://legacy.reactjs.org/docs/hooks-state.html) दस्तावेज़ों को देखें।

यहाँ प्रत्येक चर का प्रतिनिधित्व है:

- `walletAddress` - एक स्ट्रिंग जो यूज़र के वॉलेट पते को संग्रहीत करती है
- `status` - एक स्ट्रिंग जिसमें UI के नीचे प्रदर्शित करने के लिए एक संदेश होता है
- `name` - एक स्ट्रिंग जो NFT के नाम को संग्रहीत करती है
- `description` - एक स्ट्रिंग जो NFT के विवरण को संग्रहीत करती है
- `url` - एक स्ट्रिंग जो NFT की डिजिटल संपत्ति का एक लिंक है

स्थिति चर के बाद, आप तीन गैर-कार्यान्वित फ़ंक्शन देखेंगे: `useEffect`, `connectWalletPressed`, और `onMintPressed`। आप देखेंगे कि ये सभी फ़ंक्शन `async` हैं, ऐसा इसलिए है क्योंकि हम उनमें एसिंक्रोनस API कॉल करेंगे! उनके नाम उनकी कार्यात्मकताओं के साथ समानार्थक हैं:

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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - यह एक React हुक है जिसे आपका घटक रेंडर होने के बाद कॉल किया जाता है। क्योंकि इसमें एक खाली ऐरे `[]` प्रोप पास किया गया है (लाइन 3 देखें), इसे केवल घटक के _पहले_ रेंडर पर कॉल किया जाएगा। यहां हम अपने वॉलेट श्रोता और एक अन्य वॉलेट फ़ंक्शन को अपने UI को अपडेट करने के लिए कॉल करेंगे ताकि यह प्रतिबिंबित हो सके कि वॉलेट पहले से जुड़ा हुआ है या नहीं।
- `connectWalletPressed` - इस फ़ंक्शन को यूज़र के MetaMask वॉलेट को हमारे डैप से जोड़ने के लिए कॉल किया जाएगा।
- `onMintPressed` - यह फ़ंक्शन यूज़र के NFT को मिंट करने के लिए कॉल किया जाएगा।

इस फ़ाइल के अंत के पास, हमारे पास हमारे घटक का UI है। यदि आप इस कोड को ध्यान से स्कैन करते हैं, तो आप देखेंगे कि जब उनके संबंधित टेक्स्ट फ़ील्ड में इनपुट बदलता है तो हम अपने `url`, `name`, और `description` स्थिति चर को अपडेट करते हैं।

आप यह भी देखेंगे कि `connectWalletPressed` और `onMintPressed` को क्रमशः `mintButton` और `walletButton` ID वाले बटन पर क्लिक किए जाने पर कॉल किया जाता है।

```javascript
//हमारे घटक का UI
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "जुड़ा हुआ: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>वॉलेट कनेक्ट करें</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT मिन्टर</h1>
    <p>
      बस अपनी संपत्ति का लिंक, नाम और विवरण जोड़ें, फिर \"मिंट\" दबाएँ।
    </p>
    <form>
      <h2>🖼 संपत्ति का लिंक: </h2>
      <input
        type="text"
        placeholder="उदा., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 नाम: </h2>
      <input
        type="text"
        placeholder="उदा., मेरा पहला NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ विवरण: </h2>
      <input
        type="text"
        placeholder="उदा., क्रिप्टोकिटीज़ से भी ज़्यादा कूल ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      NFT मिंट करें
    </button>
    <p id="status">{status}</p>
</div>
)
```

अंत में, चलिए देखते हैं कि यह मिन्टर घटक कहाँ जोड़ा गया है।

यदि आप `App.js` फ़ाइल पर जाते हैं, जो React में मुख्य घटक है जो अन्य सभी घटकों के लिए एक कंटेनर के रूप में कार्य करता है, तो आप देखेंगे कि हमारा मिन्टर घटक लाइन 7 पर इंजेक्ट किया गया है।

**इस ट्यूटोरियल में, हम केवल `Minter.js फ़ाइल` का संपादन करेंगे और हमारी `src` फ़ोल्डर में फ़ाइलें जोड़ेंगे।**

अब जब हम समझ गए हैं कि हम किसके साथ काम कर रहे हैं, तो चलिए अपना एथेरियम वॉलेट सेट अप करें!

## अपना एथेरियम वॉलेट सेट अप करें {#set-up-your-ethereum-wallet}

यूज़र्स को आपके स्मार्ट अनुबंध के साथ इंटरैक्ट करने में सक्षम होने के लिए, उन्हें अपने एथेरियम वॉलेट को आपके डैप से कनेक्ट करने की आवश्यकता होगी।

### MetaMask डाउनलोड करें {#download-metamask}

इस ट्यूटोरियल के लिए, हम MetaMask का उपयोग करेंगे, जो ब्राउज़र में एक वर्चुअल वॉलेट है जिसका उपयोग आपके एथेरियम खाते के पते को प्रबंधित करने के लिए किया जाता है। यदि आप एथेरियम पर लेनदेन कैसे काम करते हैं, इसके बारे में और समझना चाहते हैं, तो [इस पृष्ठ](/developers/docs/transactions/) को देखें।

आप [यहां](https://metamask.io/download) मुफ्त में MetaMask खाता डाउनलोड और बना सकते हैं। जब आप एक खाता बना रहे हों, या यदि आपके पास पहले से ही एक खाता है, तो ऊपरी दाएँ कोने में “Ropsten टेस्ट नेटवर्क” पर स्विच करना सुनिश्चित करें (ताकि हम वास्तविक धन के साथ काम न करें)।

### एक फोसेट से ईथर जोड़ें {#add-ether-from-faucet}

हमारे NFTs को मिंट करने के लिए (या एथेरियम ब्लॉकचेन पर किसी भी लेनदेन पर हस्ताक्षर करने के लिए), हमें कुछ नकली Eth की आवश्यकता होगी। Eth प्राप्त करने के लिए आप [Ropsten फोसेट](https://faucet.ropsten.be/) पर जा सकते हैं और अपना Ropsten खाता पता दर्ज कर सकते हैं, फिर “Send Ropsten Eth” पर क्लिक करें। आपको जल्द ही अपने MetaMask खाते में Eth दिखना चाहिए!

### अपना बैलेंस जांचें {#check-your-balance}

यह सुनिश्चित करने के लिए कि हमारा बैलेंस वहाँ है, चलिए [Alchemy के कंपोजर टूल](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) का उपयोग करके एक [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) अनुरोध करें। यह हमारे वॉलेट में Eth की मात्रा लौटाएगा। जब आप अपना MetaMask खाता पता इनपुट करते हैं और "Send Request" पर क्लिक करते हैं, तो आपको इस तरह का एक जवाब देखना चाहिए:

```text
{\"jsonrpc\": \"2.0\", \"id\": 0, \"result\": \"0xde0b6b3a7640000\"}
```

**ध्यान दें:** यह परिणाम eth में नहीं, wei में है। Wei का उपयोग ईथर के सबसे छोटे मूल्यवर्ग के रूप में किया जाता है। wei से eth में रूपांतरण है: 1 eth = 10¹⁸ wei। तो अगर हम 0xde0b6b3a7640000 को दशमलव में बदलते हैं तो हमें 1\*10¹⁸ मिलता है जो 1 eth के बराबर है।

उफ्फ! हमारा नकली पैसा सब वहाँ है! <Emoji text=":money_mouth_face:" size={1} />

## MetaMask को अपने UI से कनेक्ट करें {#connect-metamask-to-your-UI}

अब जब हमारा MetaMask वॉलेट सेट हो गया है, तो चलिए अपने डैप को इससे कनेक्ट करते हैं!

क्योंकि हम [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) प्रतिमान का पालन करना चाहते हैं, हम एक अलग फ़ाइल बनाने जा रहे हैं जिसमें हमारे डैप के तर्क, डेटा और नियमों को प्रबंधित करने के लिए हमारे फ़ंक्शन शामिल हैं, और फिर उन फ़ंक्शन को हमारे फ्रंटएंड (हमारे Minter.js घटक) को पास करें।

### `connectWallet` फ़ंक्शन {#connect-wallet-function}

ऐसा करने के लिए, चलिए अपनी `src` डायरेक्टरी में `utils` नामक एक नया फोल्डर बनाते हैं और इसके अंदर `interact.js` नामक एक फाइल जोड़ते हैं, जिसमें हमारे सभी वॉलेट और स्मार्ट अनुबंध इंटरैक्शन फ़ंक्शन होंगे।

हमारी `interact.js` फ़ाइल में, हम एक `connectWallet` फ़ंक्शन लिखेंगे, जिसे हम तब अपने `Minter.js` घटक में आयात और कॉल करेंगे।

अपनी `interact.js` फ़ाइल में, निम्नलिखित जोड़ें

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 ऊपर टेक्स्ट-फील्ड में एक संदेश लिखें।",
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
              आपको अपने ब्राउज़र में MetaMask, एक वर्चुअल एथेरियम वॉलेट, इंस्टॉल करना होगा।
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

चलिए देखते हैं कि यह कोड क्या करता है:

सबसे पहले, हमारा फ़ंक्शन जांचता है कि आपके ब्राउज़र में `window.ethereum` सक्षम है या नहीं।

`window.ethereum` MetaMask और अन्य वॉलेट प्रदाताओं द्वारा इंजेक्ट किया गया एक वैश्विक API है जो वेबसाइटों को यूज़र्स के एथेरियम खातों का अनुरोध करने की अनुमति देता है। यदि अनुमोदित हो, तो यह उन ब्लॉकचेन से डेटा पढ़ सकता है जिनसे यूज़र जुड़ा हुआ है, और यूज़र को संदेशों और लेनदेन पर हस्ताक्षर करने का सुझाव दे सकता है। अधिक जानकारी के लिए [MetaMask दस्तावेज़](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) देखें!

यदि `window.ethereum` मौजूद _नहीं_ है, तो इसका मतलब है कि MetaMask इंस्टॉल नहीं है। इसके परिणामस्वरूप एक JSON ऑब्जेक्ट वापस कर दिया जाता है, जहाँ लौटाया गया `address` एक खाली स्ट्रिंग है, और `status` JSX ऑब्जेक्ट यह बताता है कि यूज़र को MetaMask इंस्टॉल करना होगा।

**हमारे द्वारा लिखे गए अधिकांश फ़ंक्शन JSON ऑब्जेक्ट लौटा रहे होंगे जिनका उपयोग हम अपने स्थिति चर और UI को अपडेट करने के लिए कर सकते हैं।**

अब यदि `window.ethereum` मौजूद _है_, तो चीजें दिलचस्प हो जाती हैं।

एक try/catch लूप का उपयोग करके, हम [`window.ethereum.request({ method: \"eth_requestAccounts\" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) को कॉल करके MetaMask से कनेक्ट करने का प्रयास करेंगे। इस फ़ंक्शन को कॉल करने से ब्राउज़र में MetaMask खुल जाएगा, जिससे यूज़र को अपने वॉलेट को आपके डैप से कनेक्ट करने के लिए प्रेरित किया जाएगा।

- यदि यूज़र कनेक्ट करना चुनता है, तो `method: \"eth_requestAccounts\"` एक ऐरे लौटाएगा जिसमें यूज़र के सभी खाता पते शामिल होंगे जो डैप से जुड़े हैं। कुल मिलाकर, हमारा `connectWallet` फ़ंक्शन एक JSON ऑब्जेक्ट लौटाएगा जिसमें इस ऐरे में _पहला_ `पता` (पंक्ति 9 देखें) और एक `स्थिति` संदेश होगा जो यूज़र को स्मार्ट अनुबंध को एक संदेश लिखने के लिए प्रेरित करता है।
- यदि यूज़र कनेक्शन को अस्वीकार कर देता है, तो JSON ऑब्जेक्ट में लौटाए गए `पते` के लिए एक खाली स्ट्रिंग और एक `स्थिति` संदेश होगा जो यह दर्शाता है कि यूज़र ने कनेक्शन को अस्वीकार कर दिया है।

### अपने Minter.js UI घटक में connectWallet फ़ंक्शन जोड़ें {#add-connect-wallet}

अब जब हमने यह `connectWallet` फ़ंक्शन लिख लिया है, तो चलिए इसे अपने `Minter.js.` घटक से कनेक्ट करते हैं।

सबसे पहले, हमें अपने फ़ंक्शन को अपनी `Minter.js` फ़ाइल में `import { connectWallet } from "./utils/interact.js";` को `Minter.js` फ़ाइल के शीर्ष पर जोड़कर आयात करना होगा। आपकी `Minter.js` की पहली 11 पंक्तियाँ अब इस तरह दिखनी चाहिए:

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

फिर, हमारे `connectWalletPressed` फ़ंक्शन के अंदर, हम अपने आयातित `connectWallet` फ़ंक्शन को कॉल करेंगे, जैसे:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

ध्यान दें कि हमारी अधिकांश कार्यक्षमता `interact.js` फ़ाइल से हमारे `Minter.js` घटक से कैसे अमूर्त है? यह इसलिए है ताकि हम M-V-C प्रतिमान का अनुपालन करें!

`connectWalletPressed` में, हम बस अपने आयातित `connectWallet` फ़ंक्शन को एक await कॉल करते हैं, और इसकी प्रतिक्रिया का उपयोग करके, हम अपने `status` और `walletAddress` चर को उनके स्थिति हुक के माध्यम से अपडेट करते हैं।

अब, चलिए दोनों फाइलों `Minter.js` और `interact.js` को सहेजते हैं और अब तक हमारे UI का परीक्षण करते हैं।

localhost:3000 पर अपना ब्राउज़र खोलें, और पृष्ठ के ऊपरी दाएँ कोने में \"वॉलेट कनेक्ट करें\" बटन दबाएँ।

यदि आपने MetaMask इंस्टॉल किया है, तो आपको अपने वॉलेट को अपने डैप से कनेक्ट करने के लिए प्रेरित किया जाना चाहिए। कनेक्ट करने के लिए निमंत्रण स्वीकार करें।

आपको देखना चाहिए कि वॉलेट बटन अब यह दर्शाता है कि आपका पता जुड़ा हुआ है।

अगला, पृष्ठ को रीफ्रेश करने का प्रयास करें... यह अजीब है। हमारा वॉलेट बटन हमें MetaMask से कनेक्ट करने के लिए कह रहा है, भले ही यह पहले से ही जुड़ा हुआ है...

चिंता न करें! हम इसे आसानी से `getCurrentWalletConnected` नामक एक फ़ंक्शन लागू करके ठीक कर सकते हैं, जो यह जांचेगा कि क्या कोई पता पहले से ही हमारे डैप से जुड़ा हुआ है और तदनुसार हमारे UI को अपडेट करेगा!

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
          status: "👆🏽 ऊपर टेक्स्ट-फील्ड में एक संदेश लिखें।",
        }
      } else {
        return {
          address: "",
          status: "🦊 ऊपरी दाएँ बटन का उपयोग करके MetaMask से कनेक्ट करें।",
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
              आपको अपने ब्राउज़र में MetaMask, एक वर्चुअल एथेरियम वॉलेट, इंस्टॉल करना होगा।
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

यह कोड उस `connectWallet` फ़ंक्शन के _बहुत_ समान है जिसे हमने अभी-अभी लिखा है।

मुख्य अंतर यह है कि `eth_requestAccounts` विधि को कॉल करने के बजाय, जो यूज़र को अपने वॉलेट को कनेक्ट करने के लिए MetaMask खोलता है, यहाँ हम `eth_accounts` विधि को कॉल करते हैं, जो बस एक ऐरे लौटाता है जिसमें वर्तमान में हमारे डैप से जुड़े MetaMask पते होते हैं।

इस फ़ंक्शन को क्रिया में देखने के लिए, चलिए इसे अपने `Minter.js` घटक के `useEffect` फ़ंक्शन में कॉल करते हैं।

जैसे हमने `connectWallet` के लिए किया था, हमें इस फ़ंक्शन को अपनी `interact.js` फ़ाइल से अपनी `Minter.js` फ़ाइल में आयात करना होगा:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //यहां आयात करें
} from "./utils/interact.js"
```

अब, हम इसे बस अपने `useEffect` फ़ंक्शन में कॉल करते हैं:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

ध्यान दें, हम अपने `walletAddress` और `status` स्थिति चर को अपडेट करने के लिए `getCurrentWalletConnected` पर हमारी कॉल की प्रतिक्रिया का उपयोग करते हैं।

एक बार जब आप यह कोड जोड़ लेते हैं, तो हमारी ब्राउज़र विंडो को रीफ्रेश करने का प्रयास करें। बटन को कहना चाहिए कि आप जुड़े हुए हैं, और अपने जुड़े हुए वॉलेट के पते का पूर्वावलोकन दिखाएं - भले ही आप रीफ्रेश करें!

### addWalletListener लागू करें {#implement-add-wallet-listener}

हमारे डैप वॉलेट सेटअप में अंतिम चरण वॉलेट श्रोता को लागू करना है ताकि हमारा UI तब अपडेट हो जब हमारे वॉलेट की स्थिति बदल जाए, जैसे कि जब यूज़र डिस्कनेक्ट हो जाता है या खाते बदलता है।

अपनी `Minter.js` फ़ाइल में, एक फ़ंक्शन `addWalletListener` जोड़ें जो निम्न जैसा दिखता है:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 ऊपर टेक्स्ट-फील्ड में एक संदेश लिखें।")
      } else {
        setWallet("")
        setStatus("🦊 ऊपरी दाएँ बटन का उपयोग करके MetaMask से कनेक्ट करें।")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          आपको अपने ब्राउज़र में MetaMask, एक वर्चुअल एथेरियम वॉलेट, इंस्टॉल करना होगा।
        </a>
      </p>
    )
  }
}
```

आइए जल्दी से देखें कि यहाँ क्या हो रहा है:

- सबसे पहले, हमारा फ़ंक्शन जांचता है कि क्या `window.ethereum` सक्षम है (यानी, MetaMask इंस्टॉल है)।
  - यदि यह नहीं है, तो हम बस अपने `status` स्थिति चर को एक JSX स्ट्रिंग पर सेट करते हैं जो यूज़र को MetaMask इंस्टॉल करने के लिए प्रेरित करता है।
  - यदि यह सक्षम है, तो हम श्रोता `window.ethereum.on("accountsChanged")` को लाइन 3 पर सेट करते हैं जो MetaMask वॉलेट में स्थिति परिवर्तनों को सुनता है, जिसमें जब यूज़र डैप में एक अतिरिक्त खाता जोड़ता है, खाते बदलता है, या एक खाता डिस्कनेक्ट करता है। यदि कम से कम एक खाता जुड़ा हुआ है, तो `walletAddress` स्थिति चर को श्रोता द्वारा लौटाए गए `accounts` ऐरे में पहले खाते के रूप में अपडेट किया जाता है। अन्यथा, `walletAddress` को एक खाली स्ट्रिंग के रूप में सेट किया जाता है।

अंत में, हमें इसे अपने `useEffect` फ़ंक्शन में कॉल करना होगा:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

और वोइला! हमने अपनी सभी वॉलेट कार्यक्षमता को प्रोग्राम करना पूरा कर लिया है! अब जब हमारा वॉलेट सेट हो गया है, तो चलिए पता लगाते हैं कि अपने NFT को कैसे मिंट करें!

## NFT मेटाडेटा 101 {#nft-metadata-101}

तो याद रखें NFT मेटाडेटा जिसके बारे में हमने इस ट्यूटोरियल के चरण 0 में बात की थी—यह एक NFT को जीवंत करता है, जिससे इसमें डिजिटल संपत्ति, नाम, विवरण और अन्य विशेषताओं जैसे गुण होते हैं।

हमें इस मेटाडेटा को एक JSON ऑब्जेक्ट के रूप में कॉन्फ़िगर करने और इसे संग्रहीत करने की आवश्यकता होगी, ताकि हम इसे अपने स्मार्ट अनुबंध के `mintNFT` फ़ंक्शन को कॉल करते समय `tokenURI` पैरामीटर के रूप में पास कर सकें।

\"संपत्ति का लिंक\", \"नाम\", \"विवरण\" फ़ील्ड में पाठ हमारे NFT के मेटाडेटा के विभिन्न गुणों का निर्माण करेगा। हम इस मेटाडेटा को JSON ऑब्जेक्ट के रूप में प्रारूपित करेंगे, लेकिन इस JSON ऑब्जेक्ट को हम कहाँ संग्रहीत कर सकते हैं, इसके लिए कुछ विकल्प हैं:

- हम इसे एथेरियम ब्लॉकचेन पर संग्रहीत कर सकते हैं; हालाँकि, ऐसा करना बहुत महंगा होगा।
- हम इसे एक केंद्रीकृत सर्वर, जैसे AWS या Firebase पर संग्रहीत कर सकते हैं। लेकिन यह हमारे विकेंद्रीकरण लोकाचार को हरा देगा।
- हम IPFS का उपयोग कर सकते हैं, जो एक विकेन्द्रीकृत प्रोटोकॉल और पीयर-टू-पीयर नेटवर्क है जो एक वितरित फ़ाइल सिस्टम में डेटा को संग्रहीत और साझा करने के लिए है। चूंकि यह प्रोटोकॉल विकेन्द्रीकृत और मुफ्त है, यह हमारा सबसे अच्छा विकल्प है!

IPFS पर हमारे मेटाडेटा को संग्रहीत करने के लिए, हम [Pinata](https://pinata.cloud/) का उपयोग करेंगे, जो एक सुविधाजनक IPFS API और टूलकिट है। अगले चरण में, हम ठीक से समझाएंगे कि यह कैसे करना है!

## IPFS पर अपने मेटाडेटा को पिन करने के लिए Pinata का उपयोग करें {#use-pinata-to-pin-your-metadata-to-IPFS}

यदि आपके पास [Pinata](https://pinata.cloud/) खाता नहीं है, तो [यहां](https://app.pinata.cloud/auth/signup) एक निःशुल्क खाते के लिए साइन अप करें और अपने ईमेल और खाते को सत्यापित करने के लिए चरणों को पूरा करें।

### अपनी Pinata API कुंजी बनाएँ {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) पृष्ठ पर नेविगेट करें, फिर शीर्ष पर \"नई कुंजी\" बटन चुनें, व्यवस्थापक विजेट को सक्षम के रूप में सेट करें, और अपनी कुंजी का नाम दें।

आपको तब आपकी API जानकारी के साथ एक पॉपअप दिखाया जाएगा। इसे कहीं सुरक्षित रखना सुनिश्चित करें।

अब जब हमारी कुंजी सेट हो गई है, तो चलिए इसे हमारे प्रोजेक्ट में जोड़ते हैं ताकि हम इसका उपयोग कर सकें।

### .env फ़ाइल बनाएँ {#create-a-env}

हम अपनी पिनाटा कुंजी और रहस्य को एक पर्यावरण फ़ाइल में सुरक्षित रूप से संग्रहीत कर सकते हैं। चलिए आपके प्रोजेक्ट डायरेक्टरी में [dotenv पैकेज](https://www.npmjs.com/package/dotenv) इंस्टॉल करते हैं।

अपने टर्मिनल में एक नया टैब खोलें (लोकल होस्ट चलाने वाले से अलग) और सुनिश्चित करें कि आप `minter-starter-files` फ़ोल्डर में हैं, फिर अपने टर्मिनल में निम्न कमांड चलाएँ:

```text
npm install dotenv --save
```

अगला, अपनी कमांड लाइन पर निम्न दर्ज करके अपनी `minter-starter-files` की रूट डायरेक्टरी में एक `.env` फ़ाइल बनाएँ:

```javascript
vim.env
```

यह आपकी `.env` फ़ाइल को vim (एक टेक्स्ट एडिटर) में खोल देगा। इसे सहेजने के लिए अपने कीबोर्ड पर \"esc\" + \":\" + \"q\" को उस क्रम में दबाएँ।

अगला, VSCode में, अपनी `.env` फ़ाइल पर नेविगेट करें और अपनी पिनाटा API कुंजी और API रहस्य को इसमें जोड़ें, जैसे:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

फ़ाइल सहेजें, और फिर आप अपने JSON मेटाडेटा को IPFS पर अपलोड करने के लिए फ़ंक्शन लिखना शुरू करने के लिए तैयार हैं!

### pinJSONToIPFS लागू करें {#pin-json-to-ipfs}

सौभाग्य से, Pinata के पास [IPFS पर JSON डेटा अपलोड करने के लिए विशेष रूप से एक API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) है और axios के साथ एक सुविधाजनक JavaScript उदाहरण है जिसका हम कुछ मामूली संशोधनों के साथ उपयोग कर सकते हैं।

अपनी `utils` फ़ोल्डर में, चलिए `pinata.js` नामक एक और फ़ाइल बनाते हैं और फिर .env फ़ाइल से अपने Pinata रहस्य और कुंजी को इस तरह आयात करते हैं:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

अगला, नीचे से अतिरिक्त कोड को अपनी `pinata.js` फ़ाइल में पेस्ट करें। चिंता न करें, हम सब कुछ का मतलब समझाएंगे!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //axios पोस्ट अनुरोध को पिनाटा को करना ⬇️
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

सबसे पहले, यह [axios](https://www.npmjs.com/package/axios) को आयात करता है, जो ब्राउज़र और node.js के लिए एक वादा आधारित HTTP क्लाइंट है, जिसका उपयोग हम पिनाटा से अनुरोध करने के लिए करेंगे।

फिर हमारे पास हमारा एसिंक्रोनस फ़ंक्शन `pinJSONToIPFS` है, जो अपने इनपुट के रूप में एक `JSONBody` और अपने हेडर में पिनाटा एपीआई कुंजी और रहस्य लेता है, यह सब उनके `pinJSONToIPFS` API को पोस्ट अनुरोध करने के लिए है।

- यदि यह POST अनुरोध सफल होता है, तो हमारा फ़ंक्शन एक JSON ऑब्जेक्ट लौटाता है जिसमें `success` बूलियन सत्य होता है और `pinataUrl` जहाँ हमारा मेटाडेटा पिन किया गया था। हम इस `pinataUrl` को अपने स्मार्ट अनुबंध के मिंट फ़ंक्शन के लिए `tokenURI` इनपुट के रूप में उपयोग करेंगे।
- यदि यह पोस्ट अनुरोध विफल हो जाता है, तो हमारा फ़ंक्शन एक JSON ऑब्जेक्ट लौटाता है जिसमें `success` बूलियन झूठा होता है और एक `message` स्ट्रिंग जो हमारी त्रुटि को बताती है।

हमारे `connectWallet` फ़ंक्शन रिटर्न प्रकारों की तरह, हम JSON ऑब्जेक्ट लौटा रहे हैं ताकि हम अपने स्थिति चर और UI को अपडेट करने के लिए उनके मापदंडों का उपयोग कर सकें।

## अपना स्मार्ट अनुबंध लोड करें {#load-your-smart-contract}

अब जब हमारे पास हमारे NFT मेटाडेटा को IPFS पर `pinJSONToIPFS` फ़ंक्शन के माध्यम से अपलोड करने का एक तरीका है, तो हमें अपने स्मार्ट अनुबंध का एक उदाहरण लोड करने का एक तरीका चाहिए होगा ताकि हम इसके `mintNFT` फ़ंक्शन को कॉल कर सकें।

जैसा कि हमने पहले उल्लेख किया है, इस ट्यूटोरियल में हम [इस मौजूदा NFT स्मार्ट अनुबंध](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) का उपयोग करेंगे; हालाँकि, यदि आप यह जानना चाहते हैं कि हमने इसे कैसे बनाया, या खुद एक बनाना चाहते हैं, तो हम आपको हमारे दूसरे ट्यूटोरियल, [\"एक NFT कैसे बनाएँ\"](https://www.alchemy.com/docs/how-to-create-an-nft) को देखने की अत्यधिक अनुशंसा करते हैं।

### अनुबंध ABI {#contract-abi}

यदि आपने हमारी फाइलों को ध्यान से देखा है, तो आपने देखा होगा कि हमारी `src` डायरेक्टरी में एक `contract-abi.json` फ़ाइल है। एक ABI यह निर्दिष्ट करने के लिए आवश्यक है कि कोई अनुबंध किस फ़ंक्शन को लागू करेगा और यह भी सुनिश्चित करेगा कि फ़ंक्शन आपके द्वारा अपेक्षित प्रारूप में डेटा लौटाएगा।

हमें एथेरियम ब्लॉकचेन से कनेक्ट करने और हमारे स्मार्ट अनुबंध को लोड करने के लिए एक Alchemy API कुंजी और Alchemy Web3 API की भी आवश्यकता होगी।

### अपनी Alchemy API कुंजी बनाएँ {#create-alchemy-api}

यदि आपके पास पहले से Alchemy खाता नहीं है, तो [यहां निःशुल्क साइन अप करें।](https://alchemy.com/?a=eth-org-nft-minter)

एक बार जब आप एक Alchemy खाता बना लेते हैं, तो आप एक ऐप बनाकर एक API कुंजी उत्पन्न कर सकते हैं। यह हमें Ropsten टेस्ट नेटवर्क पर अनुरोध करने की अनुमति देगा।

अपने Alchemy डैशबोर्ड में “ऐप बनाएँ” पृष्ठ पर जाएँ, नव बार में “ऐप्स” पर होवर करके और “ऐप बनाएँ” पर क्लिक करके।

अपने ऐप को नाम दें, हमने \"मेरा पहला NFT!\" चुना, एक संक्षिप्त विवरण प्रदान करें, अपने ऐप की बहीखाता पद्धति के लिए उपयोग किए जाने वाले पर्यावरण के लिए “स्टेजिंग” चुनें, और अपने नेटवर्क के लिए “Ropsten” चुनें।

“Create app” पर क्लिक करें और बस हो गया! आपका ऐप नीचे दी गई तालिका में दिखाई देना चाहिए।

बहुत बढ़िया, तो अब जब हमने अपना HTTP Alchemy API URL बना लिया है, तो इसे अपने क्लिपबोर्ड पर कॉपी करें...

...और फिर चलिए इसे अपनी `.env` फ़ाइल में जोड़ते हैं। कुल मिलाकर, आपकी .env फ़ाइल इस तरह दिखनी चाहिए:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

अब जब हमारे पास हमारा अनुबंध ABI और हमारी Alchemy API कुंजी है, तो हम [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) का उपयोग करके अपना स्मार्ट अनुबंध लोड करने के लिए तैयार हैं।

### अपना Alchemy Web3 एंडपॉइंट और अनुबंध सेट अप करें {#setup-alchemy-endpoint}

सबसे पहले, यदि आपके पास यह पहले से नहीं है, तो आपको टर्मिनल में होम डायरेक्टरी `nft-minter-tutorial` पर नेविगेट करके [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) इंस्टॉल करना होगा:

```text
cd ..
npm install @alch/alchemy-web3
```

अगला, चलिए हमारी `interact.js` फ़ाइल पर वापस जाते हैं। फ़ाइल के शीर्ष पर, अपनी .env फ़ाइल से अपनी Alchemy कुंजी आयात करने और अपना Alchemy Web3 एंडपॉइंट सेट करने के लिए निम्न कोड जोड़ें:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) [Web3.js](https://docs.web3js.org/) के चारों ओर एक रैपर है, जो उन्नत API विधियों और अन्य महत्वपूर्ण लाभ प्रदान करता है ताकि आपका जीवन एक web3 डेवलपर के रूप में आसान हो सके। इसे न्यूनतम कॉन्फ़िगरेशन की आवश्यकता के लिए डिज़ाइन किया गया है ताकि आप इसे अपने ऐप में तुरंत उपयोग करना शुरू कर सकें!

अगला, चलिए हमारे अनुबंध ABI और अनुबंध पते को हमारी फ़ाइल में जोड़ते हैं।

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

एक बार जब हमारे पास वे दोनों हो जाते हैं, तो हम अपना मिंट फ़ंक्शन कोडिंग शुरू करने के लिए तैयार हैं!

## mintNFT फ़ंक्शन लागू करें {#implement-the-mintnft-function}

अपनी `interact.js` फ़ाइल के अंदर, चलिए हमारे फ़ंक्शन, `mintNFT` को परिभाषित करते हैं, जो समान रूप से हमारे NFT को मिंट करेगा।

क्योंकि हम कई एसिंक्रोनस कॉल करेंगे (पिनाटा को हमारे मेटाडेटा को IPFS पर पिन करने के लिए, Alchemy Web3 को हमारे स्मार्ट अनुबंध को लोड करने के लिए, और MetaMask को हमारे लेनदेन पर हस्ताक्षर करने के लिए), हमारा फ़ंक्शन भी एसिंक्रोनस होगा।

हमारे फ़ंक्शन के तीन इनपुट हमारी डिजिटल संपत्ति का `url`, `नाम` और `विवरण` होंगे। `connectWallet` फ़ंक्शन के नीचे निम्न फ़ंक्शन हस्ताक्षर जोड़ें:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### इनपुट त्रुटि हैंडलिंग {#input-error-handling}

स्वाभाविक रूप से, फ़ंक्शन की शुरुआत में किसी प्रकार का इनपुट त्रुटि हैंडलिंग होना समझ में आता है, इसलिए यदि हमारे इनपुट पैरामीटर सही नहीं हैं तो हम इस फ़ंक्शन से बाहर निकल जाते हैं। हमारे फ़ंक्शन के अंदर, चलिए निम्न कोड जोड़ते हैं:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटि हैंडलिंग
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗कृपया सुनिश्चित करें कि मिंटिंग से पहले सभी फ़ील्ड पूरे हो गए हैं।",
    }
  }
}
```

अनिवार्य रूप से, यदि कोई भी इनपुट पैरामीटर एक खाली स्ट्रिंग है, तो हम एक JSON ऑब्जेक्ट लौटाते हैं जहाँ `success` बूलियन झूठा है, और `status` स्ट्रिंग यह बताती है कि हमारे UI में सभी फ़ील्ड पूरे होने चाहिए।

### मेटाडेटा को IPFS पर अपलोड करें {#upload-metadata-to-ipfs}

एक बार जब हम जान जाते हैं कि हमारा मेटाडेटा ठीक से स्वरूपित है, तो अगला कदम इसे एक JSON ऑब्जेक्ट में लपेटना और इसे IPFS पर `pinJSONToIPFS` के माध्यम से अपलोड करना है जिसे हमने लिखा था!

ऐसा करने के लिए, हमें पहले `pinJSONToIPFS` फ़ंक्शन को अपनी `interact.js` फ़ाइल में आयात करना होगा। `interact.js` के बिल्कुल शीर्ष पर, चलिए जोड़ते हैं:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

याद रखें कि `pinJSONToIPFS` एक JSON बॉडी लेता है। तो इससे पहले कि हम इसे कॉल करें, हमें अपने `url`, `नाम` और `विवरण` मापदंडों को एक JSON ऑब्जेक्ट में प्रारूपित करना होगा।

चलिए हमारे कोड को `metadata` नामक एक JSON ऑब्जेक्ट बनाने के लिए अपडेट करते हैं और फिर इस `metadata` पैरामीटर के साथ `pinJSONToIPFS` को कॉल करते हैं:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटि हैंडलिंग
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗कृपया सुनिश्चित करें कि मिंटिंग से पहले सभी फ़ील्ड पूरे हो गए हैं।",
    }
  }

  //मेटाडेटा बनाएँ
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //पिनाटा कॉल करें
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 आपके tokenURI को अपलोड करते समय कुछ गलत हो गया।",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

ध्यान दें, हम `pinataResponse` ऑब्जेक्ट में `pinJSONToIPFS(metadata)` पर हमारी कॉल की प्रतिक्रिया को संग्रहीत करते हैं। फिर, हम किसी भी त्रुटि के लिए इस ऑब्जेक्ट को पार्स करते हैं।

यदि कोई त्रुटि है, तो हम एक JSON ऑब्जेक्ट लौटाते हैं जहाँ `success` बूलियन झूठा है और हमारी `status` स्ट्रिंग यह बताती है कि हमारी कॉल विफल हो गई है। अन्यथा, हम `pinataResponse` से `pinataURL` निकालते हैं और इसे हमारे `tokenURI` चर के रूप में संग्रहीत करते हैं।

अब हमारे स्मार्ट अनुबंध को Alchemy Web3 API का उपयोग करके लोड करने का समय है जिसे हमने अपनी फ़ाइल के शीर्ष पर प्रारंभ किया था। `window.contract` ग्लोबल वैरिएबल पर अनुबंध को सेट करने के लिए `mintNFT` फ़ंक्शन के नीचे कोड की निम्न पंक्ति जोड़ें:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

हमारे `mintNFT` फ़ंक्शन में जोड़ने वाली आखिरी चीज़ हमारा एथेरियम लेनदेन है:

```javascript
//अपना एथेरियम लेनदेन सेट करें
const transactionParameters = {
  to: contractAddress, // अनुबंध प्रकाशनों के दौरान को छोड़कर आवश्यक।
  from: window.ethereum.selectedAddress, // यूज़र के सक्रिय पते से मेल खाना चाहिए।
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFT स्मार्ट अनुबंध को कॉल करें
}

//MetaMask के माध्यम से लेनदेन पर हस्ताक्षर करें
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Etherscan पर अपने लेनदेन की जाँच करें: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 कुछ गलत हो गया: " + error.message,
  }
}
```

यदि आप पहले से ही एथेरियम लेनदेन से परिचित हैं, तो आप देखेंगे कि संरचना आपके द्वारा देखे गए से काफी मिलती-जुलती है।

- सबसे पहले, हम अपने लेनदेन पैरामीटर सेट करते हैं।
  - `to` प्राप्तकर्ता का पता निर्दिष्ट करता है (हमारा स्मार्ट अनुबंध)
  - `from` लेनदेन के हस्ताक्षरकर्ता को निर्दिष्ट करता है (यूज़र का MetaMask से जुड़ा पता: `window.ethereum.selectedAddress`)
  - `data` में हमारे स्मार्ट अनुबंध `mintNFT` विधि को कॉल करना शामिल है, जो हमारे `tokenURI` और यूज़र के वॉलेट पते, `window.ethereum.selectedAddress` को इनपुट के रूप में प्राप्त करता है
- फिर, हम एक await कॉल करते हैं, `window.ethereum.request,` जहाँ हम MetaMask से लेनदेन पर हस्ताक्षर करने के लिए कहते हैं। ध्यान दें, इस अनुरोध में, हम अपनी eth विधि (eth_SentTransaction) निर्दिष्ट कर रहे हैं और हमारे `transactionParameters` में पास कर रहे हैं। इस बिंदु पर, MetaMask ब्राउज़र में खुल जाएगा, और यूज़र को लेनदेन पर हस्ताक्षर करने या अस्वीकार करने के लिए प्रेरित करेगा।
  - यदि लेनदेन सफल होता है, तो फ़ंक्शन एक JSON ऑब्जेक्ट लौटाएगा जहाँ बूलियन `success` को सत्य पर सेट किया गया है और `status` स्ट्रिंग यूज़र को उनके लेनदेन के बारे में अधिक जानकारी के लिए Etherscan की जाँच करने के लिए प्रेरित करती है।
  - यदि लेनदेन विफल हो जाता है, तो फ़ंक्शन एक JSON ऑब्जेक्ट लौटाएगा जहाँ `success` बूलियन को झूठे पर सेट किया गया है, और `status` स्ट्रिंग त्रुटि संदेश बताती है।

कुल मिलाकर, हमारा `mintNFT` फ़ंक्शन इस तरह दिखना चाहिए:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटि हैंडलिंग
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗कृपया सुनिश्चित करें कि मिंटिंग से पहले सभी फ़ील्ड पूरे हो गए हैं।",
    }
  }

  //मेटाडेटा बनाएँ
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //पिनाटा पिन अनुरोध
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 आपके tokenURI को अपलोड करते समय कुछ गलत हो गया।",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //स्मार्ट अनुबंध लोड करें
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //अपना एथेरियम लेनदेन सेट करें
  const transactionParameters = {
    to: contractAddress, // अनुबंध प्रकाशनों के दौरान को छोड़कर आवश्यक।
    from: window.ethereum.selectedAddress, // यूज़र के सक्रिय पते से मेल खाना चाहिए।
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //NFT स्मार्ट अनुबंध को कॉल करें
  }

  //MetaMask के माध्यम से लेनदेन पर हस्ताक्षर करें
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Etherscan पर अपने लेनदेन की जाँच करें: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 कुछ गलत हो गया: " + error.message,
    }
  }
}
```

यह एक विशाल कार्य है! अब, हमें बस अपने `mintNFT` फ़ंक्शन को हमारे `Minter.js` घटक से कनेक्ट करना है...

## mintNFT को हमारे Minter.js फ्रंटएंड से कनेक्ट करें {#connect-our-frontend}

अपनी `Minter.js` फ़ाइल खोलें और शीर्ष पर `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` लाइन को अपडेट करें:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

अंत में, अपने आयातित `mintNFT` फ़ंक्शन को await कॉल करने के लिए `onMintPressed` फ़ंक्शन को लागू करें और `status` स्थिति चर को यह दर्शाने के लिए अपडेट करें कि हमारा लेनदेन सफल हुआ या विफल:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## अपने NFT को एक लाइव वेबसाइट पर तैनात करें {#deploy-your-NFT}

क्या आप यूज़र्स के साथ इंटरैक्ट करने के लिए अपने प्रोजेक्ट को लाइव करने के लिए तैयार हैं? अपने मिन्टर को लाइव वेबसाइट पर तैनात करने के लिए [इस ट्यूटोरियल](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) को देखें।

एक आखिरी कदम...

## ब्लॉकचेन की दुनिया में तहलका मचा दें {#take-the-blockchain-world-by-storm}

बस मज़ाक कर रहा था, आप ट्यूटोरियल के अंत तक पहुँच गए हैं!

संक्षेप में, एक NFT मिन्टर बनाकर, आपने सफलतापूर्वक सीखा कि:

- अपने फ्रंटएंड प्रोजेक्ट के माध्यम से MetaMask से कनेक्ट करें
- अपने फ्रंटएंड से स्मार्ट अनुबंध विधियों को कॉल करें
- MetaMask का उपयोग करके लेनदेन पर हस्ताक्षर करें

संभवतः, आप अपने वॉलेट में अपने डैप के माध्यम से बनाए गए NFTs को दिखाने में सक्षम होना चाहेंगे - इसलिए हमारे त्वरित ट्यूटोरियल [अपने वॉलेट में अपना NFT कैसे देखें](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) को देखना सुनिश्चित करें!

और, हमेशा की तरह, यदि आपके कोई प्रश्न हैं, तो हम [Alchemy Discord](https://discord.gg/gWuC7zB) में मदद के लिए यहाँ हैं। हम यह देखने के लिए इंतजार नहीं कर सकते कि आप इस ट्यूटोरियल से अवधारणाओं को अपनी भविष्य की परियोजनाओं पर कैसे लागू करते हैं!
