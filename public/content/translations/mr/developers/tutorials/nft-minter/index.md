---
title: "NFT मिंटर ट्यूटोरियल"
description: "या ट्युटोरियलमध्ये, तुम्ही एक NFT मिंटर तयार कराल आणि MetaMask व Web3 टूल्स वापरून तुमच्या स्मार्ट कॉन्ट्रॅक्टला React फ्रंटएंडशी कसे जोडायचे हे शिकून एक संपूर्ण स्टॅक dapp तयार कराल."
author: "smudgil"
tags:
  [
    "सॉलिडिटी",
    "NFT",
    "alchemy",
    "स्मार्ट कॉन्ट्रॅक्ट",
    "frontend",
    "Pinata"
  ]
skill: intermediate
breadcrumb: "NFT मिंटर dapp"
lang: mr
published: 2021-10-06
---

Web2 पार्श्वभूमीतून येणाऱ्या डेव्हलपर्ससाठी सर्वात मोठे आव्हान म्हणजे तुमच्या स्मार्ट कॉन्ट्रॅक्टला फ्रंटएंड प्रोजेक्टशी कसे जोडायचे आणि त्याच्याशी कसे संवाद साधायचा हे शोधणे.

एक NFT मिंटर तयार करून — एक सोपा UI जिथे तुम्ही तुमच्या डिजिटल मालमत्तेची लिंक, एक शीर्षक आणि वर्णन टाकू शकता — तुम्ही शिकाल:

- तुमच्या फ्रंटएंड प्रोजेक्टद्वारे MetaMask शी कनेक्ट करा
- तुमच्या फ्रंटएंडवरून स्मार्ट कॉन्ट्रॅक्ट पद्धती कॉल करा
- MetaMask वापरून व्यवहारांवर सही करा

या ट्युटोरियलमध्ये, आपण आपल्या फ्रंटएंड फ्रेमवर्क म्हणून [React](https://react.dev/) वापरणार आहोत. हे ट्युटोरियल प्रामुख्याने Web3 डेव्हलपमेंटवर केंद्रित असल्यामुळे, आपण React च्या मूलभूत गोष्टींचे विश्लेषण करण्यात जास्त वेळ घालवणार नाही. त्याऐवजी, आपण आपल्या प्रोजेक्टमध्ये कार्यक्षमता आणण्यावर लक्ष केंद्रित करणार आहोत.

एक पूर्वअट म्हणून, तुम्हाला React ची नवशिक्या-स्तरावरील समज असणे आवश्यक आहे—घटक, प्रॉप्स, useState/useEffect आणि मूलभूत फंक्शन कॉलिंग कसे कार्य करते हे माहित असले पाहिजे. जर तुम्ही यापैकी कोणत्याही संज्ञा यापूर्वी ऐकल्या नसतील, तर तुम्ही हे [React ट्युटोरियलची ओळख](https://react.dev/learn/tutorial-tic-tac-toe) पाहू शकता. अधिक दृकश्राव्य शिकणाऱ्यांसाठी, आम्ही नेट निंजा द्वारे या उत्कृष्ट [संपूर्ण आधुनिक React ट्युटोरियल](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) व्हिडिओ मालिकेची शिफारस करतो.

आणि जर तुम्ही आधीच केले नसेल, तर हे ट्युटोरियल पूर्ण करण्यासाठी तसेच ब्लॉकचेनवर काहीही तयार करण्यासाठी तुम्हाला नक्कीच Alchemy खात्याची आवश्यकता असेल. [येथे](https://alchemy.com/) विनामूल्य खात्यासाठी साइन अप करा.

चला तर मग, अधिक वेळ न घालवता सुरुवात करूया!

## NFTs बनवणे 101 {#making-nfts-101}

आपण कोणताही कोड पाहण्यास सुरुवात करण्यापूर्वी, NFT बनवणे कसे कार्य करते हे समजून घेणे महत्त्वाचे आहे. यात दोन पायऱ्या आहेत:

### Ethereum ब्लॉकचेनवर एक NFT स्मार्ट कॉन्ट्रॅक्ट प्रकाशित करा {#publish-nft}

दोन NFT स्मार्ट कॉन्ट्रॅक्ट मानकांमधील सर्वात मोठा फरक हा आहे की ERC-1155 हे एक मल्टी-टोकन मानक आहे आणि त्यात बॅच कार्यक्षमता समाविष्ट आहे, तर ERC-721 हे सिंगल-टोकन मानक आहे आणि त्यामुळे एका वेळी फक्त एक टोकन हस्तांतरित करण्यास समर्थन देते.

### मिंटिंग फंक्शन कॉल करा {#minting-function}

सहसा, या मिंटिंग फंक्शनसाठी तुम्हाला पॅरामीटर्स म्हणून दोन व्हेरिएबल्स पास करणे आवश्यक असते, पहिले `recipient`, जे तुमचा नवीन मिंट केलेला NFT प्राप्त करणारा ॲड्रेस निर्दिष्ट करते आणि दुसरे NFT चा `tokenURI`, एक स्ट्रिंग जी NFT च्या मेटाडेटाचे वर्णन करणाऱ्या JSON डॉक्युमेंटमध्ये रूपांतरित होते.

एका NFT चा मेटाडेटाच त्याला जिवंत करतो, ज्यामुळे त्याला नाव, वर्णन, प्रतिमा (किंवा वेगळी डिजिटल मालमत्ता) आणि इतर गुणधर्म यांसारखे गुणधर्म मिळतात. येथे [tokenURI चे एक उदाहरण](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2) आहे, ज्यामध्ये NFT चा मेटाडेटा आहे.

या ट्युटोरियलमध्ये, आम्ही भाग 2 वर लक्ष केंद्रित करणार आहोत, आमच्या React UI वापरून विद्यमान NFT च्या स्मार्ट कॉन्ट्रॅक्ट मिंटिंग फंक्शनला कॉल करणे.

[येथे](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) ERC-721 NFT स्मार्ट कॉन्ट्रॅक्टची लिंक आहे ज्याला आपण या ट्युटोरियलमध्ये कॉल करणार आहोत. जर तुम्हाला हे कसे बनवले हे शिकायचे असेल, तर आम्ही तुम्हाला आमचे दुसरे ट्युटोरियल, ["NFT कसे तयार करावे"](https://www.alchemy.com/docs/how-to-create-an-nft) पाहण्याची शिफारस करतो.

छान, आता आपल्याला NFT बनवणे कसे कार्य करते हे समजले आहे, चला आपल्या स्टार्टर फाइल्स क्लोन करूया!

## स्टार्टर फाइल्स क्लोन करा {#clone-the-starter-files}

प्रथम, या प्रोजेक्टसाठी स्टार्टर फाइल्स मिळवण्यासाठी [nft-minter-tutorial GitHub रिपॉझिटरी](https://github.com/alchemyplatform/nft-minter-tutorial) वर जा. ही रिपॉझिटरी तुमच्या स्थानिक वातावरणात क्लोन करा.

जेव्हा तुम्ही ही क्लोन केलेली `nft-minter-tutorial` रिपॉझिटरी उघडता, तेव्हा तुम्हाला दिसेल की त्यात दोन फोल्डर्स आहेत: `minter-starter-files` आणि `nft-minter`.

- `minter-starter-files` मध्ये या प्रोजेक्टसाठी स्टार्टर फाइल्स (मूलतः React UI) आहेत. या ट्युटोरियलमध्ये, **आपण या डिरेक्टरीमध्ये काम करणार आहोत**, कारण तुम्ही हे UI तुमच्या Ethereum वॉलेट आणि NFT स्मार्ट कॉन्ट्रॅक्टशी जोडून त्याला जिवंत करायला शिकाल.
- `nft-minter` मध्ये संपूर्ण पूर्ण झालेले ट्युटोरियल आहे आणि **जर तुम्ही कुठे अडकलात तर** तुमच्यासाठी **संदर्भ** म्हणून आहे.

पुढे, तुमच्या कोड एडिटरमध्ये `minter-starter-files` ची तुमची प्रत उघडा, आणि नंतर तुमच्या `src` फोल्डरमध्ये नेव्हिगेट करा.

आपण लिहिणार असलेला सर्व कोड `src` फोल्डरखाली असेल. आपण `Minter.js` घटक संपादित करू आणि आपल्या प्रोजेक्टला Web3 कार्यक्षमता देण्यासाठी अतिरिक्त javascript फाइल्स लिहू.

## पायरी 2: आमच्या स्टार्टर फाइल्स तपासा {#step-2-check-out-our-starter-files}

कोडिंग सुरू करण्यापूर्वी, स्टार्टर फाइल्समध्ये आधीच काय दिले आहे हे तपासणे महत्त्वाचे आहे.

### तुमचा react प्रोजेक्ट चालू करा {#get-your-react-project-running}

चला आपल्या ब्राउझरमध्ये React प्रोजेक्ट चालवून सुरुवात करूया. React चे सौंदर्य हे आहे की एकदा आपला प्रोजेक्ट आपल्या ब्राउझरमध्ये चालू झाला की, आपण केलेले कोणतेही बदल आपल्या ब्राउझरमध्ये थेट अपडेट केले जातील.

प्रोजेक्ट चालू करण्यासाठी, `minter-starter-files` फोल्डरच्या रूट डिरेक्टरीवर नेव्हिगेट करा, आणि प्रोजेक्टच्या अवलंबित्व स्थापित करण्यासाठी तुमच्या टर्मिनलमध्ये `npm install` चालवा:

```bash
cd minter-starter-files
npm install
```

एकदा ते इन्स्टॉल झाल्यावर, तुमच्या टर्मिनलमध्ये `npm start` चालवा:

```bash
npm start
```

असे केल्याने तुमच्या ब्राउझरमध्ये http://localhost:3000/ उघडले पाहिजे, जिथे तुम्हाला आमच्या प्रोजेक्टचे फ्रंटएंड दिसेल. यात 3 फील्ड्स असाव्यात: तुमच्या NFT च्या मालमत्तेची लिंक टाकण्याची जागा, तुमच्या NFT चे नाव प्रविष्ट करण्याची जागा आणि वर्णन देण्याची जागा.

तुम्ही "Connect Wallet" किंवा "Mint NFT" बटणे क्लिक करण्याचा प्रयत्न केल्यास, तुम्हाला दिसेल की ते काम करत नाहीत—कारण आपल्याला अजूनही त्यांची कार्यक्षमता प्रोग्राम करायची आहे! :\)

### Minter.js घटक {#minter-js}

**सूचना:** तुम्ही `nft-minter` फोल्डरमध्ये नसून `minter-starter-files` फोल्डरमध्ये आहात याची खात्री करा!

चला आपल्या एडिटरमधील `src` फोल्डरमध्ये परत जाऊ आणि `Minter.js` फाइल उघडू. या फाईलमधील सर्व काही समजून घेणे खूप महत्त्वाचे आहे, कारण हा प्राथमिक React घटक आहे ज्यावर आपण काम करणार आहोत.

या फाइलच्या शीर्षस्थानी, आमच्याकडे आमचे स्टेट व्हेरिएबल्स आहेत जे आम्ही विशिष्ट इव्हेंट्सनंतर अपडेट करू.

```javascript
//स्टेट व्हेरिएबल्स
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React स्टेट व्हेरिएबल्स किंवा स्टेट हुक्सबद्दल कधी ऐकले नाही? [हे](https://legacy.reactjs.org/docs/hooks-state.html) डॉक्स तपासा.

प्रत्येक व्हेरिएबल काय दर्शवते ते येथे आहे:

- `walletAddress` - वापरकर्त्याचा वॉलेट ॲड्रेस साठवणारी एक स्ट्रिंग
- `status` - UI च्या तळाशी प्रदर्शित करण्यासाठी संदेश असलेली एक स्ट्रिंग
- `name` - NFT चे नाव साठवणारी एक स्ट्रिंग
- `description` - NFT चे वर्णन साठवणारी एक स्ट्रिंग
- `url` - NFT च्या डिजिटल मालमत्तेची लिंक असलेली एक स्ट्रिंग

स्टेट व्हेरिएबल्सनंतर, तुम्हाला तीन अमलात न आणलेली फंक्शन्स दिसतील: `useEffect`, `connectWalletPressed` आणि `onMintPressed`. तुम्हाला दिसेल की ही सर्व फंक्शन्स `async` आहेत, कारण आपण त्यांच्यात असिंक्रोनस API कॉल्स करणार आहोत! त्यांची नावे त्यांच्या कार्यक्षमतेनुसार आहेत:

```javascript
useEffect(async () => {
  //TODO: अंमलबजावणी करा
}, [])

const connectWalletPressed = async () => {
  //TODO: अंमलबजावणी करा
}

const onMintPressed = async () => {
  //TODO: अंमलबजावणी करा
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - हा एक React हुक आहे जो तुमचा घटक रेंडर झाल्यानंतर कॉल केला जातो. कारण त्यात एक रिकामा अरे `[]` प्रॉप पास केला आहे (ओळ 3 पहा), तो फक्त घटकाच्या _पहिल्या_ रेंडरवर कॉल केला जाईल. येथे आपण आपला वॉलेट लिसनर आणि दुसरे वॉलेट फंक्शन कॉल करू जेणेकरून वॉलेट आधीच कनेक्ट केलेले आहे की नाही हे दर्शवण्यासाठी आपले UI अपडेट होईल.
- `connectWalletPressed` - हे फंक्शन वापरकर्त्याचे MetaMask वॉलेट आमच्या dapp शी जोडण्यासाठी कॉल केले जाईल.
- `onMintPressed` - हे फंक्शन वापरकर्त्याचा NFT मिंट करण्यासाठी कॉल केले जाईल.

या फाइलच्या शेवटी, आमच्याकडे आमच्या घटकाचा UI आहे. तुम्ही हा कोड काळजीपूर्वक स्कॅन केल्यास, तुम्हाला दिसेल की जेव्हा त्यांच्या संबंधित टेक्स्ट फील्डमधील इनपुट बदलते तेव्हा आम्ही आमचे `url`, `name` आणि `description` स्टेट व्हेरिएबल्स अपडेट करतो.

तुम्हाला हे देखील दिसेल की `connectWalletPressed` आणि `onMintPressed` अनुक्रमे `mintButton` आणि `walletButton` आयडी असलेल्या बटणांवर क्लिक केल्यावर कॉल केले जातात.

```javascript
//आमच्या घटकाचे UI
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
      फक्त तुमच्या मालमत्तेची लिंक, नाव आणि वर्णन जोडा, नंतर "Mint." दाबा
    </p>
    <form>
      <h2>🖼 मालमत्तेची लिंक: </h2>
      <input
        type="text"
        placeholder="उदा., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 नाव: </h2>
      <input
        type="text"
        placeholder="उदा., माझे पहिले NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ वर्णन: </h2>
      <input
        type="text"
        placeholder="उदा., क्रिप्टोकरन्सीपेक्षाही छान ;)"
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

शेवटी, हा Minter घटक कोठे जोडला आहे हे पाहूया.

तुम्ही `App.js` फाइलवर गेल्यास, जो React मधील मुख्य घटक आहे आणि इतर सर्व घटकांसाठी कंटेनर म्हणून काम करतो, तुम्हाला दिसेल की आमचा Minter घटक ओळ 7 वर इंजेक्ट केलेला आहे.

**या ट्युटोरियलमध्ये, आपण फक्त `Minter.js` फाइल संपादित करणार आहोत आणि आपल्या `src` फोल्डरमध्ये फाइल्स जोडणार आहोत.**

आता आपल्याला समजले आहे की आपण कशावर काम करत आहोत, चला आपले Ethereum वॉलेट सेट करूया!

## तुमचे Ethereum वॉलेट सेट करा {#set-up-your-ethereum-wallet}

वापरकर्त्यांना तुमच्या स्मार्ट कॉन्ट्रॅक्टशी संवाद साधता यावा यासाठी त्यांना त्यांचे Ethereum वॉलेट तुमच्या dapp शी कनेक्ट करणे आवश्यक असेल.

### MetaMask डाउनलोड करा {#download-metamask}

या ट्यूटोरियलसाठी, आम्ही MetaMask वापरू, जे ब्राउझरमधील एक व्हर्च्युअल वॉलेट आहे, जे तुमचा Ethereum खाते पत्ता व्यवस्थापित करण्यासाठी वापरले जाते. तुम्हाला Ethereum वरील व्यवहार कसे कार्य करतात याबद्दल अधिक समजून घ्यायचे असल्यास, [हे पृष्ठ](/developers/docs/transactions/) तपासा.

तुम्ही [येथे](https://metamask.io/download) विनामूल्य MetaMask खाते डाउनलोड आणि तयार करू शकता. तुम्ही खाते तयार करत असताना, किंवा तुमच्याकडे आधीपासूनच खाते असल्यास, वरच्या उजवीकडे असलेल्या “Ropsten Test Network” वर स्विच करण्याचे सुनिश्चित करा (जेणेकरून आपण खऱ्या पैशांशी व्यवहार करणार नाही).

### एका Faucet मधून इथर जोडा {#add-ether-from-faucet}

आमचे NFTs मिंट करण्यासाठी (किंवा Ethereum ब्लॉकचेनवरील कोणत्याही व्यवहारांवर सही करण्यासाठी), आम्हाला काही बनावट Eth लागेल. Eth मिळवण्यासाठी तुम्ही [Ropsten faucet](https://faucet.ropsten.be/) वर जाऊन तुमचा Ropsten खाते ॲड्रेस टाकू शकता, आणि नंतर “Send Ropsten Eth” वर क्लिक करू शकता. त्यानंतर लगेचच तुम्हाला तुमच्या MetaMask खात्यात Eth दिसेल!

### तुमची शिल्लक तपासा {#check-your-balance}

आमची शिल्लक आहे की नाही हे पुन्हा तपासण्यासाठी, चला [Alchemy’s composer tool](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) वापरून एक [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) विनंती करूया. हे आमच्या वॉलेटमधील Eth ची रक्कम परत करेल. तुम्ही तुमच्या MetaMask खात्याचा पत्ता इनपुट केल्यानंतर आणि “Send Request” वर क्लिक केल्यानंतर, तुम्हाला असा प्रतिसाद दिसेल:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**सूचना:** हा निकाल eth मध्ये नसून wei मध्ये आहे. Wei हे इथरचे सर्वात लहान एकक म्हणून वापरले जाते. wei चे eth मध्ये रूपांतर: 1 eth = 10¹⁸ wei. म्हणून जर आपण 0xde0b6b3a7640000 ला दशांश मध्ये रूपांतरित केले तर आपल्याला 1\*10¹⁸ मिळते, जे 1 eth च्या बरोबर आहे.

हुश्श! आपले बनावट पैसे तिथेच आहेत! <Emoji text=":money_mouth_face:" size={1} />

## MetaMask ला तुमच्या UI शी कनेक्ट करा {#connect-metamask-to-your-UI}

आता आपले MetaMask वॉलेट सेट झाले आहे, चला आपला dapp त्याच्याशी कनेक्ट करूया!

कारण आम्ही [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) पॅराडाइमचे पालन करू इच्छितो, आम्ही एक स्वतंत्र फाईल तयार करणार आहोत ज्यात आमच्या dapp चे लॉजिक, डेटा आणि नियम व्यवस्थापित करण्यासाठी आमची फंक्शन्स असतील आणि नंतर ती फंक्शन्स आमच्या फ्रंटएंडला (आमच्या Minter.js घटकाला) पास करू.

### `connectWallet` फंक्शन {#connect-wallet-function}

असे करण्यासाठी, तुमच्या `src` डिरेक्टरीमध्ये `utils` नावाचा एक नवीन फोल्डर तयार करूया आणि त्यात `interact.js` नावाची एक फाईल जोडू, ज्यामध्ये आमची सर्व वॉलेट आणि स्मार्ट कॉन्ट्रॅक्ट संवाद फंक्शन्स असतील.

आमच्या `interact.js` फाइलमध्ये, आम्ही एक `connectWallet` फंक्शन लिहू, जे आम्ही नंतर आमच्या `Minter.js` घटकामध्ये इम्पोर्ट आणि कॉल करू.

तुमच्या `interact.js` फाइलमध्ये, खालील गोष्टी जोडा

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 वरील टेक्स्ट-फील्डमध्ये एक संदेश लिहा.",
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
              तुम्हाला तुमच्या ब्राउझरमध्ये MetaMask, एक आभासी Ethereum वॉलेट, स्थापित करणे आवश्यक आहे.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

चला हा कोड काय करतो ते पाहूया:

प्रथम, आमचे फंक्शन तपासते की तुमच्या ब्राउझरमध्ये `window.ethereum` सक्षम आहे का.

`window.ethereum` हे MetaMask आणि इतर वॉलेट प्रदात्यांद्वारे इंजेक्ट केलेले एक ग्लोबल API आहे जे वेबसाइट्सना वापरकर्त्यांच्या Ethereum खात्यांची विनंती करण्याची परवानगी देते. मंजूर झाल्यास, ते वापरकर्ता ज्या ब्लॉकचेनशी कनेक्ट आहे त्यावरील डेटा वाचू शकते आणि वापरकर्त्याला संदेश आणि व्यवहारांवर स्वाक्षरी करण्यास सुचवू शकते. अधिक माहितीसाठी [MetaMask डॉक्स](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) तपासा!

जर `window.ethereum` उपस्थित _नसेल_, तर याचा अर्थ MetaMask स्थापित नाही. यामुळे एक JSON ऑब्जेक्ट परत येतो, जिथे परत केलेला `address` एक रिकामा स्ट्रिंग असतो आणि `status` JSX ऑब्जेक्ट वापरकर्त्याला MetaMask स्थापित करणे आवश्यक असल्याचे सांगतो.

**आपण लिहित असलेली बहुतेक फंक्शन्स JSON ऑब्जेक्ट्स परत करतील ज्याचा वापर आपण आपले स्टेट व्हेरिएबल्स आणि UI अपडेट करण्यासाठी करू शकतो.**

आता जर `window.ethereum` उपस्थित _असेल_, तर गोष्टी मनोरंजक होतात.

try/catch लूप वापरून, आम्ही [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) कॉल करून MetaMask शी कनेक्ट करण्याचा प्रयत्न करू. हे फंक्शन कॉल केल्याने ब्राउझरमध्ये MetaMask उघडेल, जिथे वापरकर्त्याला त्यांचे वॉलेट तुमच्या dapp शी कनेक्ट करण्यास सांगितले जाईल.

- जर वापरकर्त्याने कनेक्ट करणे निवडले, तर `method: "eth_requestAccounts"` एक ॲरे परत करेल ज्यामध्ये dapp शी कनेक्ट केलेल्या वापरकर्त्याच्या सर्व खात्यांचे ॲड्रेस असतील. एकूणच, आमचे `connectWallet` फंक्शन एक JSON ऑब्जेक्ट परत करेल ज्यात या ॲरेमधील _पहिला_ `address` (ओळ 9 पहा) आणि एक `status` संदेश असेल जो वापरकर्त्याला स्मार्ट कॉन्ट्रॅक्टला संदेश लिहिण्यास सांगेल.
- जर वापरकर्त्याने कनेक्शन नाकारले, तर JSON ऑब्जेक्टमध्ये परत केलेल्या `address` साठी एक रिकामा स्ट्रिंग आणि एक `status` संदेश असेल जो वापरकर्त्याने कनेक्शन नाकारले असल्याचे दर्शवेल.

### connectWallet फंक्शन तुमच्या Minter.js UI घटकामध्ये जोडा {#add-connect-wallet}

आता आपण हे `connectWallet` फंक्शन लिहिले आहे, चला ते आमच्या `Minter.js` घटकाशी जोडूया.

प्रथम, आपल्याला `Minter.js` फाइलच्या शीर्षस्थानी `import { connectWallet } from "./utils/interact.js";` जोडून आमचे फंक्शन आमच्या `Minter.js` फाइलमध्ये इम्पोर्ट करावे लागेल. तुमच्या `Minter.js` च्या पहिल्या 11 ओळी आता अशा दिसल्या पाहिजेत:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //स्टेट व्हेरिएबल्स
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

नंतर, आमच्या `connectWalletPressed` फंक्शनमध्ये, आम्ही आमचे इम्पोर्ट केलेले `connectWallet` फंक्शन कॉल करू, जसे की:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

आमच्या `Minter.js` घटकामधून `interact.js` फाइलमधून आमची बहुतेक कार्यक्षमता कशी दूर केली आहे हे लक्षात घ्या? हे असे आहे की आम्ही M-V-C पॅराडाइमचे पालन करतो!

`connectWalletPressed` मध्ये, आम्ही फक्त आमच्या आयात केलेल्या `connectWallet` फंक्शनला एक await कॉल करतो आणि त्याच्या प्रतिसादाचा वापर करून, आम्ही आमचे `status` आणि `walletAddress` व्हेरिएबल्स त्यांच्या स्टेट हुक्सद्वारे अपडेट करतो.

आता, चला `Minter.js` आणि `interact.js` या दोन्ही फाईल्स सेव्ह करू आणि आतापर्यंतच्या आमच्या UI ची चाचणी घेऊया.

तुमच्या ब्राउझरमध्ये localhost:3000 उघडा आणि पृष्ठाच्या वरच्या उजव्या बाजूला असलेल्या "Connect Wallet" बटणावर दाबा.

तुमच्याकडे MetaMask स्थापित असल्यास, तुम्हाला तुमचे वॉलेट तुमच्या dapp शी जोडण्यास सांगितले जाईल. कनेक्ट करण्याची आमंत्रणे स्वीकारा.

तुम्हाला दिसेल की वॉलेट बटण आता तुमचा ॲड्रेस कनेक्ट झाल्याचे दर्शवत आहे.

पुढे, पृष्ठ रिफ्रेश करण्याचा प्रयत्न करा... हे विचित्र आहे. आमचे वॉलेट बटण आम्हाला MetaMask कनेक्ट करण्यास सांगत आहे, जरी ते आधीच कनेक्ट केलेले असले तरी...

पण काळजी करू नका! आम्ही `getCurrentWalletConnected` नावाचे फंक्शन लागू करून हे सहजपणे दुरुस्त करू शकतो, जे आमच्या dapp शी एखादा ॲड्रेस आधीच कनेक्ट केलेला आहे का हे तपासेल आणि त्यानुसार आमचे UI अपडेट करेल!

### getCurrentWalletConnected फंक्शन {#get-current-wallet}

तुमच्या `interact.js` फाइलमध्ये, खालील `getCurrentWalletConnected` फंक्शन जोडा:

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
          status: "👆🏽 वरील टेक्स्ट-फील्डमध्ये एक संदेश लिहा.",
        }
      } else {
        return {
          address: "",
          status: "🦊 वरच्या उजव्या बटणाचा वापर करून MetaMask शी कनेक्ट करा.",
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
              तुम्हाला तुमच्या ब्राउझरमध्ये MetaMask, एक आभासी Ethereum वॉलेट, स्थापित करणे आवश्यक आहे.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

हा कोड आपण नुकत्याच लिहिलेल्या `connectWallet` फंक्शनसारखाच आहे.

मुख्य फरक असा आहे की `eth_requestAccounts` या पद्धतीला कॉल करण्याऐवजी, जे वापरकर्त्याला त्यांचे वॉलेट कनेक्ट करण्यासाठी MetaMask उघडते, येथे आपण `eth_accounts` ही पद्धत कॉल करतो, जी सध्या आपल्या dapp शी कनेक्ट केलेल्या MetaMask ॲड्रेसची एक ॲरे परत करते.

हे फंक्शन कृतीत पाहण्यासाठी, चला ते आमच्या `Minter.js` घटकाच्या `useEffect` फंक्शनमध्ये कॉल करूया.

जसे आपण `connectWallet` साठी केले, तसेच आपल्याला हे फंक्शन आमच्या `interact.js` फाइलमधून आमच्या `Minter.js` फाइलमध्ये इम्पोर्ट करावे लागेल, जसे की:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //येथे इम्पोर्ट करा
} from "./utils/interact.js"
```

आता, आपण फक्त ते आमच्या `useEffect` फंक्शनमध्ये कॉल करू:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

लक्षात घ्या, आम्ही आमच्या `getCurrentWalletConnected` च्या कॉलच्या प्रतिसादाचा वापर आमचे `walletAddress` आणि `status` स्टेट व्हेरिएबल्स अपडेट करण्यासाठी करतो.

एकदा तुम्ही हा कोड जोडला की, आमचे ब्राउझर विंडो रिफ्रेश करून पहा. बटण तुम्हाला कनेक्ट झाल्याचे सांगेल आणि तुमच्या कनेक्ट केलेल्या वॉलेटच्या ॲड्रेसचे पूर्वावलोकन दाखवेल - जरी तुम्ही रिफ्रेश केले तरी!

### addWalletListener लागू करा {#implement-add-wallet-listener}

आमच्या dapp वॉलेट सेटअपमधील शेवटची पायरी म्हणजे वॉलेट लिसनर लागू करणे जेणेकरून आमच्या वॉलेटची स्थिती बदलल्यावर आमचे UI अपडेट होईल, जसे की वापरकर्ता डिस्कनेक्ट झाल्यावर किंवा खाती बदलल्यावर.

तुमच्या `Minter.js` फाइलमध्ये, `addWalletListener` नावाचे फंक्शन जोडा जे खालीलप्रमाणे दिसेल:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 वरील टेक्स्ट-फील्डमध्ये एक संदेश लिहा.")
      } else {
        setWallet("")
        setStatus("🦊 वरच्या उजव्या बटणाचा वापर करून MetaMask शी कनेक्ट करा.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          तुम्हाला तुमच्या ब्राउझरमध्ये MetaMask, एक आभासी Ethereum वॉलेट, स्थापित करणे आवश्यक आहे.
        </a>
      </p>
    )
  }
}
```

चला येथे काय होत आहे ते पटकन पाहूया:

- प्रथम, आमचे फंक्शन तपासते की `window.ethereum` सक्षम आहे का (म्हणजे MetaMask स्थापित आहे का).
  - जर ते नसेल, तर आम्ही फक्त आमचे `status` स्टेट व्हेरिएबल एका JSX स्ट्रिंगवर सेट करतो जे वापरकर्त्याला MetaMask स्थापित करण्यास सांगते.
  - जर ते सक्षम असेल, तर आम्ही ओळ 3 वर `window.ethereum.on("accountsChanged")` हा लिसनर सेट करतो जो MetaMask वॉलेटमधील स्टेट बदलांसाठी ऐकतो, ज्यात वापरकर्ता dapp शी अतिरिक्त खाते जोडतो, खाती बदलतो किंवा खाते डिस्कनेक्ट करतो. जर किमान एक खाते कनेक्ट केलेले असेल, तर `walletAddress` स्टेट व्हेरिएबल लिसनरद्वारे परत केलेल्या `accounts` ॲरेमधील पहिले खाते म्हणून अपडेट केले जाते. अन्यथा, `walletAddress` एक रिकामा स्ट्रिंग म्हणून सेट केला जातो.

शेवटी, आपण ते आमच्या `useEffect` फंक्शनमध्ये कॉल करणे आवश्यक आहे:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

आणि झालेच! आपण आपल्या वॉलेटची सर्व कार्यक्षमता प्रोग्रामिंग पूर्ण केली आहे! आता आपले वॉलेट सेट झाले आहे, चला आपला NFT कसा मिंट करायचा ते शोधूया!

## NFT मेटाडेटा 101 {#nft-metadata-101}

तर, या ट्युटोरियलच्या पायरी 0 मध्ये आपण ज्या NFT मेटाडेटाबद्दल बोललो होतो ते आठवते का - ते NFT ला जिवंत करते, ज्यामुळे त्याला डिजिटल मालमत्ता, नाव, वर्णन आणि इतर गुणधर्म यासारखे गुणधर्म मिळतात.

आम्हाला हा मेटाडेटा JSON ऑब्जेक्ट म्हणून कॉन्फिगर करून साठवावा लागेल, जेणेकरून आम्ही तो आमच्या स्मार्ट कॉन्ट्रॅक्टच्या `mintNFT` फंक्शनला कॉल करताना `tokenURI` पॅरामीटर म्हणून पास करू शकू.

"Link to Asset", "Name", "Description" फील्डमधील मजकूर आमच्या NFT च्या मेटाडेटाचे वेगवेगळे गुणधर्म तयार करेल. आम्ही हा मेटाडेटा JSON ऑब्जेक्ट म्हणून फॉरमॅट करू, परंतु आम्ही हा JSON ऑब्जेक्ट कुठे साठवू शकतो यासाठी काही पर्याय आहेत:

- आपण ते Ethereum ब्लॉकचेनवर साठवू शकतो; तथापि, असे करणे खूप महाग होईल.
- आपण ते AWS किंवा Firebase सारख्या केंद्रीकृत सर्व्हरवर साठवू शकतो. परंतु ते आमच्या विकेंद्रीकरणाच्या सिद्धांताला हरवेल.
- आपण IPFS वापरू शकतो, जो वितरित फाईल सिस्टममध्ये डेटा साठवण्यासाठी आणि शेअर करण्यासाठी एक विकेंद्रीकृत प्रोटोकॉल आणि पीअर-टू-पीअर नेटवर्क आहे. हा प्रोटोकॉल विकेंद्रीकृत आणि विनामूल्य असल्याने, हा आपला सर्वोत्तम पर्याय आहे!

आपला मेटाडेटा IPFS वर साठवण्यासाठी, आपण [Pinata](https://pinata.cloud/) वापरू, जो एक सोयीस्कर IPFS API आणि टूलकिट आहे. पुढील पायरीमध्ये, आम्ही हे नक्की कसे करायचे ते स्पष्ट करू!

## तुमचा मेटाडेटा IPFS वर पिन करण्यासाठी Pinata वापरा {#use-pinata-to-pin-your-metadata-to-IPFS}

तुमच्याकडे [Pinata](https://pinata.cloud/) खाते नसल्यास, [येथे](https://app.pinata.cloud/auth/signup) विनामूल्य खात्यासाठी साइन अप करा आणि तुमचा ईमेल आणि खाते सत्यापित करण्यासाठीच्या पायऱ्या पूर्ण करा.

### तुमची Pinata API की तयार करा {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) पृष्ठावर नेव्हिगेट करा, नंतर शीर्षस्थानी असलेले "New Key" बटण निवडा, Admin विजेट सक्षम म्हणून सेट करा आणि तुमच्या की ला नाव द्या.

त्यानंतर तुम्हाला तुमच्या API माहितीसह एक पॉपअप दाखवला जाईल. हे कुठेतरी सुरक्षित ठिकाणी ठेवण्याची खात्री करा.

आता आपली की सेट झाली आहे, चला ती आपल्या प्रोजेक्टमध्ये जोडूया जेणेकरून आपण ती वापरू शकू.

### एक .env फाइल तयार करा {#create-a-env}

आपण आपली Pinata की आणि सिक्रेट एका एनव्हायरमेंट फाईलमध्ये सुरक्षितपणे साठवू शकतो. चला तुमच्या प्रोजेक्ट डिरेक्टरीमध्ये [dotenv पॅकेज](https://www.npmjs.com/package/dotenv) स्थापित करूया.

तुमच्या टर्मिनलमध्ये एक नवीन टॅब उघडा (जो लोकल होस्ट चालवत आहे त्यापासून वेगळा) आणि तुम्ही `minter-starter-files` फोल्डरमध्ये आहात याची खात्री करा, नंतर तुमच्या टर्मिनलमध्ये खालील कमांड चालवा:

```text
npm install dotenv --save
```

पुढे, तुमच्या कमांड लाइनवर खालीलप्रमाणे टाकून तुमच्या `minter-starter-files` च्या रूट डिरेक्टरीमध्ये एक `.env` फाइल तयार करा:

```javascript
vim.env
```

हे तुमची `.env` फाइल vim (एक टेक्स्ट एडिटर) मध्ये उघडेल. ते सेव्ह करण्यासाठी तुमच्या कीबोर्डवर "esc" + ":" + "q" या क्रमाने दाबा.

पुढे, VSCode मध्ये, तुमच्या `.env` फाइलवर नेव्हिगेट करा आणि त्यात तुमची Pinata API की आणि API सिक्रेट जोडा, जसे की:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

फाईल सेव्ह करा, आणि मग तुम्ही तुमचा JSON मेटाडेटा IPFS वर अपलोड करण्यासाठी फंक्शन लिहिण्यास तयार आहात!

### pinJSONToIPFS लागू करा {#pin-json-to-ipfs}

सुदैवाने, Pinata कडे [JSON डेटा IPFS वर अपलोड करण्यासाठी एक विशेष API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) आणि axios सह एक सोयीस्कर JavaScript उदाहरण आहे जे आपण काही किरकोळ बदलांसह वापरू शकतो.

तुमच्या `utils` फोल्डरमध्ये, चला `pinata.js` नावाची दुसरी फाईल तयार करू आणि नंतर .env फाईलमधून आमची Pinata सिक्रेट आणि की इम्पोर्ट करू, जसे की:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

पुढे, खालील अतिरिक्त कोड तुमच्या `pinata.js` फाईलमध्ये पेस्ट करा. काळजी करू नका, आम्ही सर्वकाही काय आहे ते समजावून सांगू!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //axios POST विनंती Pinata ला करणे ⬇️
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

तर हा कोड नक्की काय करतो?

प्रथम, ते [axios](https://www.npmjs.com/package/axios) आयात करते, जे ब्राउझर आणि node.js साठी एक वचन-आधारित HTTP क्लायंट आहे, ज्याचा वापर आपण Pinata ला विनंती करण्यासाठी करू.

त्यानंतर आमच्याकडे आमचे असिंक्रोनस फंक्शन `pinJSONToIPFS` आहे, जे इनपुट म्हणून `JSONBody` घेते आणि त्याच्या हेडरमध्ये Pinata api की आणि सिक्रेट घेते, हे सर्व त्यांच्या `pinJSONToIPFS` API ला POST विनंती करण्यासाठी.

- जर ही POST विनंती यशस्वी झाली, तर आमचे फंक्शन एक JSON ऑब्जेक्ट परत करते ज्यामध्ये `success` बूलियन सत्य असते आणि `pinataUrl` जेथे आमचा मेटाडेटा पिन केला गेला होता. आम्ही परत केलेला हा `pinataUrl` आमच्या स्मार्ट कॉन्ट्रॅक्टच्या मिंट फंक्शनला `tokenURI` इनपुट म्हणून वापरू.
- जर ही पोस्ट विनंती अयशस्वी झाली, तर आमचे फंक्शन एक JSON ऑब्जेक्ट परत करते ज्यामध्ये `success` बूलियन असत्य असते आणि एक `message` स्ट्रिंग जी आमची त्रुटी सांगते.

आमच्या `connectWallet` फंक्शन रिटर्न प्रकारांप्रमाणेच, आम्ही JSON ऑब्जेक्ट्स परत करत आहोत जेणेकरून आम्ही त्यांचे पॅरामीटर्स आमचे स्टेट व्हेरिएबल्स आणि UI अपडेट करण्यासाठी वापरू शकू.

## तुमचा स्मार्ट कॉन्ट्रॅक्ट लोड करा {#load-your-smart-contract}

आता आपल्याकडे `pinJSONToIPFS` फंक्शनद्वारे आपला NFT मेटाडेटा IPFS वर अपलोड करण्याचा एक मार्ग आहे, आपल्याला आपला स्मार्ट कॉन्ट्रॅक्टचा एक इन्स्टन्स लोड करण्याचा एक मार्ग लागेल जेणेकरून आपण त्याचे `mintNFT` फंक्शन कॉल करू शकू.

जसे आम्ही आधी नमूद केले आहे, या ट्युटोरियलमध्ये आम्ही [या विद्यमान NFT स्मार्ट कॉन्ट्रॅक्टचा](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) वापर करणार आहोत; तथापि, जर तुम्हाला हे कसे बनवले हे शिकायचे असेल, किंवा स्वतः एक बनवायचे असेल, तर आम्ही तुम्हाला आमचे दुसरे ट्युटोरियल, ["NFT कसे तयार करावे"](https://www.alchemy.com/docs/how-to-create-an-nft) पाहण्याची शिफारस करतो.

### कॉन्ट्रॅक्ट ABI {#contract-abi}

जर तुम्ही आमच्या फाइल्सचे बारकाईने परीक्षण केले असेल, तर तुम्हाला लक्षात आले असेल की आमच्या `src` डिरेक्टरीमध्ये, `contract-abi.json` नावाची एक फाइल आहे. एक कॉन्ट्रॅक्ट कोणते फंक्शन कॉल करेल हे निर्दिष्ट करण्यासाठी तसेच फंक्शन तुमच्या अपेक्षित फॉरमॅटमध्ये डेटा परत करेल याची खात्री करण्यासाठी ABI आवश्यक आहे.

Ethereum ब्लॉकचेनशी कनेक्ट होण्यासाठी आणि आमचा स्मार्ट कॉन्ट्रॅक्ट लोड करण्यासाठी आम्हाला Alchemy API की आणि Alchemy Web3 API ची देखील आवश्यकता असेल.

### तुमची Alchemy API की तयार करा {#create-alchemy-api}

तुमच्याकडे आधीपासूनच Alchemy खाते नसल्यास, [येथे विनामूल्य साइन अप करा.](https://alchemy.com/?a=eth-org-nft-minter)

एकदा तुम्ही Alchemy खाते तयार केल्यावर, तुम्ही ॲप तयार करून API की तयार करू शकता. हे आम्हाला Ropsten चाचणी नेटवर्कला विनंत्या करण्याची परवानगी देईल.

तुमच्या Alchemy डॅशबोर्डमधील “Create App” पृष्ठावर नेव्हिगेट करण्यासाठी nav बारमधील “Apps” वर फिरवून “Create App” वर क्लिक करा.

तुमच्या ॲपला नाव द्या, आम्ही "My First NFT!" निवडले, एक लहान वर्णन द्या, तुमच्या ॲपच्या बुककीपिंगसाठी वापरल्या जाणार्‍या वातावरणासाठी “Staging” निवडा आणि तुमच्या नेटवर्कसाठी “Ropsten” निवडा.

“ॲप तयार करा” वर क्लिक करा आणि झाले! तुमचे ॲप खालील टेबलमध्ये दिसावे.

छान, तर आता आपण आपला HTTP Alchemy API URL तयार केला आहे, तो तुमच्या क्लिपबोर्डवर कॉपी करा...

…आणि मग चला ते आमच्या `.env` फाइलमध्ये जोडूया. एकूणच, तुमची .env फाईल अशी दिसली पाहिजे:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

आता आपल्याकडे आमचा कॉन्ट्रॅक्ट ABI आणि आमची Alchemy API की आहे, आम्ही [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) वापरून आमचा स्मार्ट कॉन्ट्रॅक्ट लोड करण्यास तयार आहोत.

### तुमचा Alchemy Web3 एंडपॉईंट आणि कॉन्ट्रॅक्ट सेट करा {#setup-alchemy-endpoint}

प्रथम, तुमच्याकडे आधीपासून नसल्यास, तुम्हाला [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) स्थापित करणे आवश्यक आहे, यासाठी टर्मिनलमध्ये होम डिरेक्टरी: `nft-minter-tutorial` वर नेव्हिगेट करा:

```text
cd ..
npm install @alch/alchemy-web3
```

पुढे चला आपल्या `interact.js` फाइलवर परत जाऊया. फाईलच्या शीर्षस्थानी, तुमच्या .env फाईलमधून तुमची Alchemy की आयात करण्यासाठी आणि तुमचा Alchemy Web3 एंडपॉईंट सेट करण्यासाठी खालील कोड जोडा:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) हे [Web3.js](https://docs.web3js.org/) च्या सभोवतालचे एक रॅपर आहे, जे एक वेब3 डेव्हलपर म्हणून तुमचे जीवन सोपे करण्यासाठी वर्धित API पद्धती आणि इतर महत्त्वपूर्ण फायदे प्रदान करते. हे कमीत कमी कॉन्फिगरेशन आवश्यक करण्यासाठी डिझाइन केलेले आहे जेणेकरून आपण आपल्या ॲपमध्ये लगेचच त्याचा वापर सुरू करू शकता!

पुढे, चला आपला कॉन्ट्रॅक्ट ABI आणि कॉन्ट्रॅक्ट ॲड्रेस आपल्या फाईलमध्ये जोडूया.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

एकदा आपल्याकडे हे दोन्ही असले की, आपण आपले मिंट फंक्शन कोडिंग सुरू करण्यास तयार आहोत!

## मिंटएनएफटी (mintNFT) फंक्शनची अंमलबजावणी करा {#implement-the-mintnft-function}

तुमच्या `interact.js` फाईलच्या आत, चला आपले फंक्शन, `mintNFT` परिभाषित करू, जे त्याच्या नावानुसारच आपले NFT मिंट करेल.

कारण आपण अनेक असिंक्रोनस कॉल्स करणार आहोत (आपला मेटाडेटा IPFS वर पिन करण्यासाठी Pinata ला, आपला स्मार्ट कॉन्ट्रॅक्ट लोड करण्यासाठी Alchemy Web3 ला आणि आपले व्यवहार साइन करण्यासाठी MetaMask ला), आपले फंक्शन देखील असिंक्रोनस असेल.

आमच्या फंक्शनसाठी तीन इनपुट्स असतील: आपल्या डिजिटल मालमत्तेचा `url`, `name` आणि `description`. `connectWallet` फंक्शनखाली खालील फंक्शन सिग्नेचर जोडा:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### इनपुट एरर हाताळणी {#input-error-handling}

नैसर्गिकरित्या, फंक्शनच्या सुरुवातीला काहीतरी इनपुट एरर हाताळणी असणे अर्थपूर्ण आहे, जेणेकरून आपले इनपुट पॅरामीटर्स योग्य नसल्यास आपण या फंक्शनमधून बाहेर पडू. आमच्या फंक्शनच्या आत, चला खालील कोड जोडूया:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटी हाताळणी
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗मिंट करण्यापूर्वी कृपया सर्व फील्ड्स पूर्ण झाल्याची खात्री करा.",
    }
  }
}
```

मूलतः, जर कोणतेही इनपुट पॅरामीटर एक रिकामा स्ट्रिंग असेल, तर आम्ही एक JSON ऑब्जेक्ट परत करतो जिथे `success` बूलियन असत्य असते आणि `status` स्ट्रिंग सांगते की आमच्या UI मधील सर्व फील्ड पूर्ण असणे आवश्यक आहे.

### मेटाडेटा IPFS वर अपलोड करा {#upload-metadata-to-ipfs}

एकदा आम्हाला माहित झाले की आमचा मेटाडेटा योग्यरित्या फॉरमॅट झाला आहे, तर पुढची पायरी म्हणजे त्याला JSON ऑब्जेक्टमध्ये गुंडाळणे आणि आपण लिहिलेल्या `pinJSONToIPFS` द्वारे ते IPFS वर अपलोड करणे!

असे करण्यासाठी, आम्हाला प्रथम `pinJSONToIPFS` फंक्शन आमच्या `interact.js` फाईलमध्ये इम्पोर्ट करावे लागेल. `interact.js` च्या अगदी सुरुवातीला, चला जोडूया:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

आठवा की `pinJSONToIPFS` एक JSON बॉडी घेते. म्हणून आपण त्याला कॉल करण्यापूर्वी, आम्हाला आपले `url`, `name` आणि `description` पॅरामीटर्स एका JSON ऑब्जेक्टमध्ये फॉरमॅट करावे लागतील.

चला `metadata` नावाचा एक JSON ऑब्जेक्ट तयार करण्यासाठी आपला कोड अपडेट करूया आणि नंतर या `metadata` पॅरामीटरसह `pinJSONToIPFS` ला कॉल करूया:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटी हाताळणी
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗मिंट करण्यापूर्वी कृपया सर्व फील्ड्स पूर्ण झाल्याची खात्री करा.",
    }
  }

  //मेटाडेटा बनवा
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata कॉल करा
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 तुमचा tokenURI अपलोड करताना काहीतरी चूक झाली.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

लक्षात घ्या, आम्ही `pinJSONToIPFS(metadata)` च्या कॉलचा प्रतिसाद `pinataResponse` ऑब्जेक्टमध्ये साठवतो. त्यानंतर, आम्ही कोणत्याही त्रुटींसाठी या ऑब्जेक्टचे पार्सिंग करतो.

जर एखादी त्रुटी असेल, तर आम्ही एक JSON ऑब्जेक्ट परत करतो जिथे `success` बूलियन असत्य असते आणि आमची `status` स्ट्रिंग सांगते की आमचा कॉल अयशस्वी झाला. अन्यथा, आम्ही `pinataResponse` मधून `pinataURL` काढतो आणि तो आमचा `tokenURI` व्हेरिएबल म्हणून साठवतो.

आता आमच्या फाईलच्या शीर्षस्थानी आपण सुरू केलेल्या Alchemy Web3 API चा वापर करून आमचा स्मार्ट कॉन्ट्रॅक्ट लोड करण्याची वेळ आली आहे. `mintNFT` फंक्शनच्या तळाशी `window.contract` ग्लोबल व्हेरिएबलवर कॉन्ट्रॅक्ट सेट करण्यासाठी खालील कोडची ओळ जोडा:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

आमच्या `mintNFT` फंक्शनमध्ये जोडण्याची शेवटची गोष्ट म्हणजे आमचा Ethereum व्यवहार:

```javascript
//तुमचा Ethereum व्यवहार सेट करा
const transactionParameters = {
  to: contractAddress, // कॉन्ट्रॅक्ट प्रकाशनाव्यतिरिक्त आवश्यक.
  from: window.ethereum.selectedAddress, // वापरकर्त्याच्या सक्रिय ॲड्रेसशी जुळले पाहिजे.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFT स्मार्ट कॉन्ट्रॅक्टला कॉल करा
}

//MetaMask द्वारे व्यवहारावर सही करा
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Etherscan वर तुमचा व्यवहार तपासा: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 काहीतरी चूक झाली: " + error.message,
  }
}
```

जर तुम्ही आधीच Ethereum व्यवहारांशी परिचित असाल, तर तुम्हाला लक्षात येईल की रचना तुम्ही पाहिलेल्या गोष्टींसारखीच आहे.

- प्रथम, आम्ही आमचे व्यवहार पॅरामीटर्स सेट करतो.
  - `to` प्राप्तकर्ता ॲड्रेस (आमचा स्मार्ट कॉन्ट्रॅक्ट) निर्दिष्ट करतो
  - `from` व्यवहारावर सही करणाऱ्याला निर्दिष्ट करतो (वापरकर्त्याचा MetaMask शी कनेक्ट केलेला ॲड्रेस: `window.ethereum.selectedAddress`)
  - `data` मध्ये आमच्या स्मार्ट कॉन्ट्रॅक्ट `mintNFT` पद्धतीचा कॉल असतो, जो आमचा `tokenURI` आणि वापरकर्त्याचा वॉलेट ॲड्रेस, `window.ethereum.selectedAddress`, इनपुट म्हणून प्राप्त करतो
- त्यानंतर, आम्ही एक await कॉल करतो, `window.ethereum.request,` जिथे आम्ही MetaMask ला व्यवहारावर सही करण्यास सांगतो. लक्षात घ्या, या विनंतीमध्ये, आम्ही आमची eth पद्धत (eth_SentTransaction) निर्दिष्ट करत आहोत आणि आमचे `transactionParameters` पास करत आहोत. या टप्प्यावर, MetaMask ब्राउझरमध्ये उघडेल आणि वापरकर्त्याला व्यवहारावर सही करण्यास किंवा नाकारण्यास सांगेल.
  - जर व्यवहार यशस्वी झाला, तर फंक्शन एक JSON ऑब्जेक्ट परत करेल जिथे `success` बूलियन सत्य सेट केले आहे आणि `status` स्ट्रिंग वापरकर्त्याला त्यांच्या व्यवहाराबद्दल अधिक माहितीसाठी Etherscan तपासण्यास सांगते.
  - जर व्यवहार अयशस्वी झाला, तर फंक्शन एक JSON ऑब्जेक्ट परत करेल जिथे `success` बूलियन असत्य सेट केले आहे आणि `status` स्ट्रिंग त्रुटीचा संदेश सांगते.

एकूणच, आमचे `mintNFT` फंक्शन असे दिसले पाहिजे:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटी हाताळणी
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗मिंट करण्यापूर्वी कृपया सर्व फील्ड्स पूर्ण झाल्याची खात्री करा.",
    }
  }

  //मेटाडेटा बनवा
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata पिन विनंती
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 तुमचा tokenURI अपलोड करताना काहीतरी चूक झाली.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //स्मार्ट कॉन्ट्रॅक्ट लोड करा
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //तुमचा Ethereum व्यवहार सेट करा
  const transactionParameters = {
    to: contractAddress, // कॉन्ट्रॅक्ट प्रकाशनाव्यतिरिक्त आवश्यक.
    from: window.ethereum.selectedAddress, // वापरकर्त्याच्या सक्रिय ॲड्रेसशी जुळले पाहिजे.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //NFT स्मार्ट कॉन्ट्रॅक्टला कॉल करा
  }

  //MetaMask द्वारे व्यवहारावर सही करा
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Etherscan वर तुमचा व्यवहार तपासा: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 काहीतरी चूक झाली: " + error.message,
    }
  }
}
```

हे एक मोठे फंक्शन आहे! आता, आपल्याला फक्त आमचे `mintNFT` फंक्शन आमच्या `Minter.js` घटकाशी जोडायचे आहे...

## mintNFT ला आमच्या Minter.js फ्रंटएंडशी कनेक्ट करा {#connect-our-frontend}

तुमची `Minter.js` फाईल उघडा आणि शीर्षस्थानी असलेली `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` ही ओळ अपडेट करा:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

शेवटी, `onMintPressed` फंक्शनची अंमलबजावणी करा जेणेकरून तुमच्या आयात केलेल्या `mintNFT` फंक्शनला एक await कॉल केला जाईल आणि आपला व्यवहार यशस्वी झाला की अयशस्वी हे दर्शवण्यासाठी `status` स्टेट व्हेरिएबल अपडेट केले जाईल:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## तुमचे NFT एका लाईव्ह वेबसाइटवर तैनात करा {#deploy-your-NFT}

वापरकर्त्यांना संवाद साधण्यासाठी तुमचा प्रोजेक्ट लाईव्ह नेण्यास तयार आहात? तुमचा मिंटर एका लाईव्ह वेबसाइटवर तैनात करण्यासाठी [हे ट्युटोरियल](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) तपासा.

एक शेवटची पायरी...

## ब्लॉकचेनच्या जगात धुमाकूळ घाला {#take-the-blockchain-world-by-storm}

मस्करी करत होतो, तुम्ही ट्युटोरियलच्या शेवटापर्यंत पोहोचलात!

पुनरावलोकन करण्यासाठी, एक NFT मिंटर तयार करून, तुम्ही यशस्वीरित्या शिकलात की:

- तुमच्या फ्रंटएंड प्रोजेक्टद्वारे MetaMask शी कनेक्ट करा
- तुमच्या फ्रंटएंडवरून स्मार्ट कॉन्ट्रॅक्ट पद्धती कॉल करा
- MetaMask वापरून व्यवहारांवर सही करा

संभाव्यतः, तुम्हाला तुमच्या dapp द्वारे मिंट केलेले NFTs तुमच्या वॉलेटमध्ये दाखवायला आवडेल — त्यामुळे आमचे छोटे ट्युटोरियल [तुमचे NFT तुमच्या वॉलेटमध्ये कसे पहावे](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) नक्की तपासा!

आणि, नेहमीप्रमाणे, जर तुम्हाला काही प्रश्न असतील, तर आम्ही [Alchemy Discord](https://discord.gg/gWuC7zB) मध्ये मदत करण्यासाठी आहोत. तुम्ही या ट्युटोरियलमधील संकल्पना तुमच्या भविष्यातील प्रोजेक्ट्समध्ये कशा लागू करता हे पाहण्यासाठी आम्ही उत्सुक आहोत!
