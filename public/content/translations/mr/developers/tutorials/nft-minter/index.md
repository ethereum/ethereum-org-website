---
title: "NFT मिंटर ट्युटोरिअल"
description: "या ट्युटोरिअलमध्ये, तुम्ही एक NFT मिंटर तयार कराल आणि मेटामास्क आणि Web3 टूल्स वापरून तुमच्या स्मार्ट कॉन्ट्रॅक्टला React फ्रंटएंडशी जोडून फुल स्टॅक विकेंद्रित ॲप्लिकेशन (dapp) कसे तयार करायचे ते शिकाल."
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "स्मार्ट कॉन्ट्रॅक्ट्स", "फ्रंटएंड", "Pinata", "ERC-721"]
skill: intermediate
breadcrumb: "NFT मिंटर dapp"
lang: mr
published: 2021-10-06
---

Web2 पार्श्वभूमीतून येणाऱ्या डेव्हलपर्ससमोरील सर्वात मोठे आव्हान म्हणजे तुमचे स्मार्ट कॉन्ट्रॅक्ट फ्रंटएंड प्रोजेक्टशी कसे जोडायचे आणि त्याच्याशी संवाद कसा साधायचा हे शोधून काढणे.

एक NFT मिंटर तयार करून — एक सोपा UI जिथे तुम्ही तुमच्या डिजिटल मालमत्तेची लिंक, शीर्षक आणि वर्णन टाकू शकता — तुम्ही खालील गोष्टी शिकाल:

- तुमच्या फ्रंटएंड प्रोजेक्टद्वारे मेटामास्कशी कनेक्ट करणे
- तुमच्या फ्रंटएंडवरून स्मार्ट कॉन्ट्रॅक्ट पद्धती कॉल करणे
- मेटामास्क वापरून व्यवहारांवर स्वाक्षरी करणे

या ट्युटोरिअलमध्ये, आम्ही आमचे फ्रंटएंड फ्रेमवर्क म्हणून [React](https://react.dev/) वापरणार आहोत. हे ट्युटोरिअल प्रामुख्याने Web3 डेव्हलपमेंटवर केंद्रित असल्यामुळे, आम्ही React च्या मूलभूत गोष्टी समजावून सांगण्यात जास्त वेळ घालवणार नाही. त्याऐवजी, आम्ही आमच्या प्रोजेक्टमध्ये कार्यक्षमता आणण्यावर लक्ष केंद्रित करू.

पूर्वापेक्षित म्हणून, तुम्हाला React ची नवशिक्या-स्तरावरील समज असावी—कंपोनेंट्स, प्रॉप्स, useState/useEffect आणि बेसिक फंक्शन कॉलिंग कसे काम करते हे माहित असावे. जर तुम्ही यापैकी कोणतीही संज्ञा यापूर्वी कधीही ऐकली नसेल, तर तुम्ही हे [Intro to React ट्युटोरिअल](https://react.dev/learn/tutorial-tic-tac-toe) पाहू शकता. अधिक व्हिज्युअल शिकणाऱ्यांसाठी, आम्ही Net Ninja ची ही उत्कृष्ट [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) व्हिडिओ सिरीज पाहण्याची शिफारस करतो.

आणि जर तुम्ही अद्याप तसे केले नसेल, तर हे ट्युटोरिअल पूर्ण करण्यासाठी तसेच ब्लॉकचेनवर काहीही तयार करण्यासाठी तुम्हाला नक्कीच Alchemy खात्याची आवश्यकता असेल. मोफत खात्यासाठी [येथे](https://alchemy.com/) साइन अप करा.

अधिक वेळ न घालवता, चला सुरुवात करूया!

## NFTs बनवणे 101 {#making-nfts-101}

कोणताही कोड पाहण्यास सुरुवात करण्यापूर्वी, NFT बनवणे कसे काम करते हे समजून घेणे महत्त्वाचे आहे. यामध्ये दोन टप्पे समाविष्ट आहेत:

### इथेरियम ब्लॉकचेनवर NFT स्मार्ट कॉन्ट्रॅक्ट प्रस्थापित करणे {#publish-nft}

दोन NFT स्मार्ट कॉन्ट्रॅक्ट मानकांमधील सर्वात मोठा फरक हा आहे की ERC-1155 हे मल्टी-टोकन मानक आहे आणि त्यात बॅच कार्यक्षमता समाविष्ट आहे, तर ERC-721 हे सिंगल-टोकन मानक आहे आणि त्यामुळे एका वेळी फक्त एक टोकन ट्रान्सफर करण्यास सपोर्ट करते.

### मिंटिंग फंक्शन कॉल करणे {#minting-function}

सामान्यतः, या मिंटिंग फंक्शनमध्ये तुम्हाला पॅरामीटर्स म्हणून दोन व्हेरिएबल्स पास करणे आवश्यक असते, पहिले `recipient`, जे तुमचा नव्याने मिंट केलेला NFT प्राप्त करणारा पत्ता निर्दिष्ट करते आणि दुसरे NFT चे `tokenURI`, एक स्ट्रिंग जी NFT च्या मेटाडेटाचे वर्णन करणाऱ्या JSON डॉक्युमेंटचे निराकरण करते.

NFT चा मेटाडेटा खरोखरच त्याला जिवंत करतो, ज्यामुळे त्याला नाव, वर्णन, इमेज (किंवा भिन्न डिजिटल मालमत्ता) आणि इतर गुणधर्म असू शकतात. येथे [tokenURI चे एक उदाहरण](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2) आहे, ज्यामध्ये NFT चा मेटाडेटा असतो.

या ट्युटोरिअलमध्ये, आम्ही भाग 2 वर लक्ष केंद्रित करणार आहोत, आमच्या React UI चा वापर करून विद्यमान NFT चे स्मार्ट कॉन्ट्रॅक्ट मिंटिंग फंक्शन कॉल करणे.

या ट्युटोरिअलमध्ये आम्ही कॉल करणार असलेल्या ERC-721 NFT स्मार्ट कॉन्ट्रॅक्टची [लिंक येथे आहे](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE). आम्ही ते कसे बनवले हे तुम्हाला शिकायचे असल्यास, आम्ही शिफारस करतो की तुम्ही आमचे दुसरे ट्युटोरिअल, ["NFT कसे तयार करावे"](https://www.alchemy.com/docs/how-to-create-an-nft) पहा.

छान, आता आपल्याला NFT बनवणे कसे काम करते हे समजले आहे, चला आपल्या स्टार्टर फाइल्स क्लोन करूया!

## स्टार्टर फाइल्स क्लोन करा {#clone-the-starter-files}

प्रथम, या प्रोजेक्टसाठी स्टार्टर फाइल्स मिळवण्यासाठी [nft-minter-tutorial GitHub रिपॉझिटरी](https://github.com/alchemyplatform/nft-minter-tutorial) वर जा. ही रिपॉझिटरी तुमच्या लोकल एन्वायरमेंटमध्ये क्लोन करा.

जेव्हा तुम्ही ही क्लोन केलेली `nft-minter-tutorial` रिपॉझिटरी उघडता, तेव्हा तुमच्या लक्षात येईल की त्यात दोन फोल्डर्स आहेत: `minter-starter-files` आणि `nft-minter`.

- `minter-starter-files` मध्ये या प्रोजेक्टसाठी स्टार्टर फाइल्स (प्रामुख्याने React UI) आहेत. या ट्युटोरिअलमध्ये, **आम्ही या डिरेक्टरीमध्ये काम करणार आहोत**, कारण तुम्ही हा UI तुमच्या इथेरियम वॉलेट आणि NFT स्मार्ट कॉन्ट्रॅक्टशी जोडून तो कसा जिवंत करायचा हे शिकाल.
- `nft-minter` मध्ये संपूर्ण पूर्ण झालेले ट्युटोरिअल आहे आणि **जर तुम्ही अडकलात तर संदर्भासाठी** तेथे आहे.

पुढे, तुमच्या कोड एडिटरमध्ये `minter-starter-files` ची तुमची कॉपी उघडा आणि नंतर तुमच्या `src` फोल्डरमध्ये नेव्हिगेट करा.

आम्ही लिहिलेला सर्व कोड `src` फोल्डरच्या अंतर्गत असेल. आम्ही `Minter.js` कंपोनेंट संपादित करू आणि आमच्या प्रोजेक्टला Web3 कार्यक्षमता देण्यासाठी अतिरिक्त JavaScript फाइल्स लिहू.

## पायरी 2: आमच्या स्टार्टर फाइल्स तपासा {#step-2-check-out-our-starter-files}

आम्ही कोडिंग सुरू करण्यापूर्वी, स्टार्टर फाइल्समध्ये आम्हाला आधीच काय दिले आहे हे तपासणे महत्त्वाचे आहे.

### तुमचा React प्रोजेक्ट रन करा {#get-your-react-project-running}

आमच्या ब्राउझरमध्ये React प्रोजेक्ट रन करून सुरुवात करूया. React चे सौंदर्य हे आहे की एकदा आमचा प्रोजेक्ट आमच्या ब्राउझरमध्ये रन झाला की, आम्ही सेव्ह केलेले कोणतेही बदल आमच्या ब्राउझरमध्ये लाइव्ह अपडेट केले जातील.

प्रोजेक्ट रन करण्यासाठी, `minter-starter-files` फोल्डरच्या रूट डिरेक्टरीमध्ये नेव्हिगेट करा आणि प्रोजेक्टच्या डिपेंडन्सीज इन्स्टॉल करण्यासाठी तुमच्या टर्मिनलमध्ये `npm install` रन करा:

```bash
cd minter-starter-files
npm install
```

एकदा ते इन्स्टॉल झाल्यानंतर, तुमच्या टर्मिनलमध्ये `npm start` रन करा:

```bash
npm start
```

असे केल्याने तुमच्या ब्राउझरमध्ये http://localhost:3000/ उघडले पाहिजे, जिथे तुम्हाला आमच्या प्रोजेक्टचे फ्रंटएंड दिसेल. यात 3 फील्ड्स असावेत: तुमच्या NFT च्या मालमत्तेची लिंक टाकण्यासाठी जागा, तुमच्या NFT चे नाव एंटर करा आणि वर्णन द्या.

जर तुम्ही "Connect Wallet" किंवा "Mint NFT" बटणांवर क्लिक करण्याचा प्रयत्न केला, तर तुमच्या लक्षात येईल की ते काम करत नाहीत—कारण आम्हाला अद्याप त्यांची कार्यक्षमता प्रोग्राम करणे आवश्यक आहे! :\)

### Minter.js कंपोनेंट {#minter-js}

**टीप:** तुम्ही `minter-starter-files` फोल्डरमध्ये आहात आणि `nft-minter` फोल्डरमध्ये नाही याची खात्री करा!

चला आमच्या एडिटरमधील `src` फोल्डरमध्ये परत जाऊया आणि `Minter.js` फाइल उघडूया. या फाइलमधील सर्व काही समजून घेणे अत्यंत महत्त्वाचे आहे, कारण हा प्राथमिक React कंपोनेंट आहे ज्यावर आम्ही काम करणार आहोत.

आमच्या या फाइलच्या शीर्षस्थानी, आमचे स्थिती (state) व्हेरिएबल्स आहेत जे आम्ही विशिष्ट घटनांनंतर अपडेट करू.

```javascript
//स्थिती व्हेरिएबल्स
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React स्थिती व्हेरिएबल्स किंवा स्थिती हुक्सबद्दल कधीही ऐकले नाही? [हे](https://legacy.reactjs.org/docs/hooks-state.html) डॉक्स तपासा.

प्रत्येक व्हेरिएबल काय दर्शवतो ते येथे आहे:

- `walletAddress` - एक स्ट्रिंग जी वापरकर्त्याचा वॉलेट पत्ता स्टोअर करते
- `status` - एक स्ट्रिंग ज्यामध्ये UI च्या तळाशी प्रदर्शित करण्यासाठी संदेश असतो
- `name` - एक स्ट्रिंग जी NFT चे नाव स्टोअर करते
- `description` - एक स्ट्रिंग जी NFT चे वर्णन स्टोअर करते
- `url` - एक स्ट्रिंग जी NFT च्या डिजिटल मालमत्तेची लिंक आहे

स्थिती व्हेरिएबल्सनंतर, तुम्हाला तीन लागू न केलेली फंक्शन्स दिसतील: `useEffect`, `connectWalletPressed`, आणि `onMintPressed`. तुमच्या लक्षात येईल की ही सर्व फंक्शन्स `async` आहेत, कारण आम्ही त्यांच्यामध्ये असिंक्रोनस API कॉल्स करणार आहोत! त्यांची नावे त्यांच्या कार्यक्षमतेशी मिळतीजुळती आहेत:

```javascript
useEffect(async () => {
  //TODO: लागू करा
}, [])

const connectWalletPressed = async () => {
  //TODO: लागू करा
}

const onMintPressed = async () => {
  //TODO: लागू करा
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - हा एक React हुक आहे जो तुमचा कंपोनेंट रेंडर झाल्यानंतर कॉल केला जातो. कारण त्यात एक रिकामा ॲरे `[]` प्रॉप पास केला आहे (ओळ 3 पहा), तो फक्त कंपोनेंटच्या _पहिल्या_ रेंडरवर कॉल केला जाईल. येथे आम्ही आमचा वॉलेट लिसनर आणि दुसरे वॉलेट फंक्शन कॉल करू जेणेकरून वॉलेट आधीच कनेक्ट केलेले आहे की नाही हे दर्शवण्यासाठी आमचा UI अपडेट होईल.
- `connectWalletPressed` - हे फंक्शन वापरकर्त्याचे मेटामास्क वॉलेट आमच्या dapp शी कनेक्ट करण्यासाठी कॉल केले जाईल.
- `onMintPressed` - हे फंक्शन वापरकर्त्याचा NFT मिंट करण्यासाठी कॉल केले जाईल.

या फाइलच्या शेवटी, आमच्याकडे आमच्या कंपोनेंटचा UI आहे. जर तुम्ही हा कोड काळजीपूर्वक स्कॅन केला, तर तुमच्या लक्षात येईल की जेव्हा त्यांच्या संबंधित टेक्स्ट फील्ड्समधील इनपुट बदलते तेव्हा आम्ही आमचे `url`, `name`, आणि `description` स्थिती व्हेरिएबल्स अपडेट करतो.

तुम्हाला हे देखील दिसेल की जेव्हा अनुक्रमे `mintButton` आणि `walletButton` IDs असलेली बटणे क्लिक केली जातात तेव्हा `connectWalletPressed` आणि `onMintPressed` कॉल केले जातात.

```javascript
//आपल्या घटकाचा UI
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

शेवटी, हा Minter कंपोनेंट कुठे जोडला आहे ते पाहूया.

जर तुम्ही `App.js` फाइलवर गेलात, जो React मधील मुख्य कंपोनेंट आहे जो इतर सर्व कंपोनेंट्ससाठी कंटेनर म्हणून काम करतो, तर तुम्हाला दिसेल की आमचा Minter कंपोनेंट ओळ 7 वर इंजेक्ट केला आहे.

**या ट्युटोरिअलमध्ये, आम्ही फक्त `Minter.js file` संपादित करू आणि आमच्या `src` फोल्डरमध्ये फाइल्स जोडू.**

आता आम्हाला समजले आहे की आम्ही कशावर काम करत आहोत, चला आमचे इथेरियम वॉलेट सेट करूया!

## तुमचे इथेरियम वॉलेट सेट करा {#set-up-your-ethereum-wallet}

वापरकर्त्यांना तुमच्या स्मार्ट कॉन्ट्रॅक्टशी संवाद साधता यावा यासाठी त्यांना त्यांचे इथेरियम वॉलेट तुमच्या dapp शी कनेक्ट करावे लागेल.

### मेटामास्क डाउनलोड करा {#download-metamask}

या ट्युटोरिअलसाठी, आम्ही मेटामास्क वापरू, जो ब्राउझरमधील एक व्हर्च्युअल वॉलेट आहे जो तुमचा इथेरियम खाते पत्ता व्यवस्थापित करण्यासाठी वापरला जातो. इथेरियमवरील व्यवहार कसे काम करतात याबद्दल तुम्हाला अधिक समजून घ्यायचे असल्यास, [हे पेज](/developers/docs/transactions/) तपासा.

तुम्ही [येथे](https://metamask.io/download) मोफत मेटामास्क खाते डाउनलोड आणि तयार करू शकता. जेव्हा तुम्ही खाते तयार करत असाल, किंवा तुमचे आधीच खाते असेल, तेव्हा वरच्या उजव्या बाजूला “Ropsten Test Network” वर स्विच करण्याची खात्री करा \(जेणेकरून आम्ही खऱ्या पैशांशी व्यवहार करत नाही\).

### फॉसेटमधून इथर जोडा {#add-ether-from-faucet}

आमचे NFTs मिंट करण्यासाठी (किंवा इथेरियम ब्लॉकचेनवरील कोणत्याही व्यवहारांवर स्वाक्षरी करण्यासाठी), आम्हाला काही बनावट Eth ची आवश्यकता असेल. Eth मिळवण्यासाठी तुम्ही [रॉप्स्टन् फॉसेट](https://faucet.ropsten.be/) वर जाऊ शकता आणि तुमचा रॉप्स्टन् खाते पत्ता एंटर करू शकता, त्यानंतर “Send Ropsten Eth” वर क्लिक करा. तुम्हाला लवकरच तुमच्या मेटामास्क खात्यात Eth दिसेल!

### तुमचा बॅलन्स तपासा {#check-your-balance}

आमचा बॅलन्स तिथे आहे हे पुन्हा तपासण्यासाठी, [Alchemy च्या कंपोझर टूल](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) चा वापर करून [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) विनंती करूया. हे आमच्या वॉलेटमधील Eth ची रक्कम परत करेल. तुम्ही तुमचा मेटामास्क खाते पत्ता टाकल्यानंतर आणि “Send Request” वर क्लिक केल्यानंतर, तुम्हाला असा प्रतिसाद दिसेल:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**टीप:** हा निकाल Wei मध्ये आहे eth मध्ये नाही. Wei हे इथरचे सर्वात लहान मूल्य म्हणून वापरले जाते. Wei मधून eth मध्ये रूपांतरण असे आहे: 1 eth = 10¹⁸ Wei. त्यामुळे जर आपण 0xde0b6b3a7640000 चे दशांश मध्ये रूपांतर केले तर आपल्याला 1\*10¹⁸ मिळते जे 1 eth च्या बरोबरीचे आहे.

अरे वा! आमचे बनावट पैसे तिथे आहेत! <Emoji text=":money_mouth_face:" size={1} />

## मेटामास्क तुमच्या UI शी कनेक्ट करा {#connect-metamask-to-your-ui}

आता आमचे मेटामास्क वॉलेट सेट झाले आहे, चला आमचे dapp त्याच्याशी कनेक्ट करूया!

कारण आम्हाला [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) पॅराडाइमचे पालन करायचे आहे, आम्ही एक वेगळी फाइल तयार करणार आहोत ज्यामध्ये आमच्या dapp चे लॉजिक, डेटा आणि नियम व्यवस्थापित करण्यासाठी आमची फंक्शन्स असतील आणि नंतर ती फंक्शन्स आमच्या फ्रंटएंडला (आमचा Minter.js कंपोनेंट) पास करू.

### `connectWallet` फंक्शन {#connect-wallet-function}

असे करण्यासाठी, तुमच्या `src` डिरेक्टरीमध्ये `utils` नावाचे एक नवीन फोल्डर तयार करूया आणि त्यामध्ये `interact.js` नावाची फाइल जोडूया, ज्यामध्ये आमची सर्व वॉलेट आणि स्मार्ट कॉन्ट्रॅक्ट संवाद फंक्शन्स असतील.

आमच्या `interact.js` फाइलमध्ये, आम्ही एक `connectWallet` फंक्शन लिहू, जे आम्ही नंतर आमच्या `Minter.js` कंपोनेंटमध्ये इम्पोर्ट आणि कॉल करू.

तुमच्या `interact.js` फाइलमध्ये, खालील जोडा

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

हा कोड काय करतो ते समजून घेऊया:

प्रथम, आमचे फंक्शन तुमच्या ब्राउझरमध्ये `window.ethereum` सक्षम आहे की नाही हे तपासते.

`window.ethereum` हा मेटामास्क आणि इतर वॉलेट प्रदात्यांद्वारे इंजेक्ट केलेला एक ग्लोबल API आहे जो वेबसाइट्सना वापरकर्त्यांच्या इथेरियम खात्यांची विनंती करण्याची परवानगी देतो. मंजूर झाल्यास, तो वापरकर्ता कनेक्ट असलेल्या ब्लॉकचेन्समधून डेटा वाचू शकतो आणि वापरकर्त्याला संदेश आणि व्यवहारांवर स्वाक्षरी करण्याचे सुचवू शकतो. अधिक माहितीसाठी [मेटामास्क डॉक्स](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) तपासा!

जर `window.ethereum` उपस्थित _नसेल_, तर याचा अर्थ मेटामास्क इन्स्टॉल केलेले नाही. याचा परिणाम म्हणून एक JSON ऑब्जेक्ट परत केला जातो, जिथे परत केलेला `address` एक रिकामी स्ट्रिंग असते आणि `status` JSX ऑब्जेक्ट वापरकर्त्याने मेटामास्क इन्स्टॉल करणे आवश्यक आहे असा संदेश देतो.

**आम्ही लिहिलेली बहुतांश फंक्शन्स JSON ऑब्जेक्ट्स परत करतील ज्यांचा वापर आम्ही आमचे स्थिती व्हेरिएबल्स आणि UI अपडेट करण्यासाठी करू शकतो.**

आता जर `window.ethereum` उपस्थित _असेल_, तर तेव्हा गोष्टी मनोरंजक होतात.

try/catch लूप वापरून, आम्ही [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) कॉल करून मेटामास्कशी कनेक्ट करण्याचा प्रयत्न करू. हे फंक्शन कॉल केल्याने ब्राउझरमध्ये मेटामास्क उघडेल, ज्याद्वारे वापरकर्त्याला त्यांचे वॉलेट तुमच्या dapp शी कनेक्ट करण्यास सांगितले जाईल.

- जर वापरकर्त्याने कनेक्ट करणे निवडले, तर `method: "eth_requestAccounts"` एक ॲरे परत करेल ज्यामध्ये dapp शी कनेक्ट असलेल्या वापरकर्त्याच्या सर्व खात्यांचे पत्ते असतील. एकूणच, आमचे `connectWallet` फंक्शन एक JSON ऑब्जेक्ट परत करेल ज्यामध्ये या ॲरेमधील _पहिला_ `address` असेल \(ओळ 9 पहा\) आणि एक `status` संदेश असेल जो वापरकर्त्याला स्मार्ट कॉन्ट्रॅक्टला संदेश लिहिण्यास प्रवृत्त करेल.
- जर वापरकर्त्याने कनेक्शन नाकारले, तर JSON ऑब्जेक्टमध्ये परत केलेल्या `address` साठी एक रिकामी स्ट्रिंग असेल आणि एक `status` संदेश असेल जो दर्शवतो की वापरकर्त्याने कनेक्शन नाकारले आहे.

### तुमच्या Minter.js UI कंपोनेंटमध्ये connectWallet फंक्शन जोडा {#add-connect-wallet}

आता आम्ही हे `connectWallet` फंक्शन लिहिले आहे, चला ते आमच्या `Minter.js.` कंपोनेंटशी कनेक्ट करूया.

प्रथम, आम्हाला `Minter.js` फाइलच्या शीर्षस्थानी `import { connectWallet } from "./utils/interact.js";` जोडून आमचे फंक्शन आमच्या `Minter.js` फाइलमध्ये इम्पोर्ट करावे लागेल. तुमच्या `Minter.js` च्या पहिल्या 11 ओळी आता अशा दिसल्या पाहिजेत:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //स्थिती व्हेरिएबल्स
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

त्यानंतर, आमच्या `connectWalletPressed` फंक्शनच्या आत, आम्ही आमचे इम्पोर्ट केलेले `connectWallet` फंक्शन कॉल करू, जसे की:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

लक्षात घ्या की आमची बहुतांश कार्यक्षमता `interact.js` फाइलमधून आमच्या `Minter.js` कंपोनेंटपासून कशी वेगळी केली आहे? हे यासाठी आहे जेणेकरून आम्ही M-V-C पॅराडाइमचे पालन करू शकू!

`connectWalletPressed` मध्ये, आम्ही फक्त आमच्या इम्पोर्ट केलेल्या `connectWallet` फंक्शनला एक await कॉल करतो आणि त्याचा प्रतिसाद वापरून, आम्ही आमचे `status` आणि `walletAddress` व्हेरिएबल्स त्यांच्या स्थिती हुक्सद्वारे अपडेट करतो.

आता, `Minter.js` आणि `interact.js` या दोन्ही फाइल्स सेव्ह करूया आणि आतापर्यंतचा आमचा UI टेस्ट करूया.

तुमचा ब्राउझर localhost:3000 वर उघडा आणि पेजच्या वरच्या उजव्या बाजूला असलेल्या "Connect Wallet" बटणावर दाबा.

जर तुमच्याकडे मेटामास्क इन्स्टॉल केलेले असेल, तर तुम्हाला तुमचे वॉलेट तुमच्या dapp शी कनेक्ट करण्यास सांगितले जाईल. कनेक्ट करण्याचे आमंत्रण स्वीकारा.

तुम्हाला दिसेल की वॉलेट बटण आता तुमचा पत्ता कनेक्ट केलेला आहे हे दर्शवते.

पुढे, पेज रिफ्रेश करण्याचा प्रयत्न करा... हे विचित्र आहे. आमचे वॉलेट बटण आम्हाला मेटामास्क कनेक्ट करण्यास सांगत आहे, जरी ते आधीच कनेक्ट केलेले असले तरीही...

तरीही काळजी करू नका! आम्ही `getCurrentWalletConnected` नावाचे फंक्शन लागू करून ते सहजपणे दुरुस्त करू शकतो, जे एखादा पत्ता आधीच आमच्या dapp शी कनेक्ट केलेला आहे की नाही हे तपासेल आणि त्यानुसार आमचा UI अपडेट करेल!

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

हा कोड आम्ही आधी लिहिलेल्या `connectWallet` फंक्शनसारखाच _खूप_ आहे.

मुख्य फरक हा आहे की `eth_requestAccounts` पद्धत कॉल करण्याऐवजी, जी वापरकर्त्याला त्यांचे वॉलेट कनेक्ट करण्यासाठी मेटामास्क उघडते, येथे आम्ही `eth_accounts` पद्धत कॉल करतो, जी फक्त सध्या आमच्या dapp शी कनेक्ट असलेल्या मेटामास्क पत्त्यांचा समावेश असलेला ॲरे परत करते.

हे फंक्शन कृतीत पाहण्यासाठी, चला ते आमच्या `Minter.js` कंपोनेंटच्या `useEffect` फंक्शनमध्ये कॉल करूया.

जसे आम्ही `connectWallet` साठी केले, तसे आम्ही हे फंक्शन आमच्या `interact.js` फाइलमधून आमच्या `Minter.js` फाइलमध्ये असे इम्पोर्ट केले पाहिजे:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //येथे आयात करा
} from "./utils/interact.js"
```

आता, आम्ही ते फक्त आमच्या `useEffect` फंक्शनमध्ये कॉल करतो:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

लक्षात घ्या, आम्ही आमचे `walletAddress` आणि `status` स्थिती व्हेरिएबल्स अपडेट करण्यासाठी `getCurrentWalletConnected` ला केलेल्या कॉलचा प्रतिसाद वापरतो.

एकदा तुम्ही हा कोड जोडल्यानंतर, आमची ब्राउझर विंडो रिफ्रेश करण्याचा प्रयत्न करा. बटणाने तुम्ही कनेक्ट आहात असे म्हटले पाहिजे आणि तुमच्या कनेक्ट केलेल्या वॉलेटच्या पत्त्याचे पूर्वावलोकन दाखवले पाहिजे - तुम्ही रिफ्रेश केल्यानंतरही!

### addWalletListener लागू करा {#implement-add-wallet-listener}

आमच्या dapp वॉलेट सेटअपमधील अंतिम टप्पा म्हणजे वॉलेट लिसनर लागू करणे जेणेकरून जेव्हा आमच्या वॉलेटची स्थिती बदलते, जसे की जेव्हा वापरकर्ता डिस्कनेक्ट करतो किंवा खाती बदलतो तेव्हा आमचा UI अपडेट होतो.

तुमच्या `Minter.js` फाइलमध्ये, `addWalletListener` हे फंक्शन जोडा जे खालीलप्रमाणे दिसते:

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

येथे काय होत आहे ते पटकन समजून घेऊया:

- प्रथम, आमचे फंक्शन `window.ethereum` सक्षम आहे की नाही हे तपासते \(म्हणजेच, मेटामास्क इन्स्टॉल केलेले आहे\).
  - जर ते नसेल, तर आम्ही फक्त आमचे `status` स्थिती व्हेरिएबल एका JSX स्ट्रिंगवर सेट करतो जे वापरकर्त्याला मेटामास्क इन्स्टॉल करण्यास प्रवृत्त करते.
  - जर ते सक्षम असेल, तर आम्ही ओळ 3 वर लिसनर `window.ethereum.on("accountsChanged")` सेट करतो जो मेटामास्क वॉलेटमधील स्थिती बदलांसाठी ऐकतो, ज्यामध्ये वापरकर्ता dapp शी अतिरिक्त खाते कनेक्ट करतो, खाती बदलतो किंवा खाते डिस्कनेक्ट करतो याचा समावेश होतो. जर किमान एक खाते कनेक्ट केलेले असेल, तर `walletAddress` स्थिती व्हेरिएबल लिसनरद्वारे परत केलेल्या `accounts` ॲरेमधील पहिले खाते म्हणून अपडेट केले जाते. अन्यथा, `walletAddress` एक रिकामी स्ट्रिंग म्हणून सेट केले जाते.

शेवटी, आम्ही ते आमच्या `useEffect` फंक्शनमध्ये कॉल केले पाहिजे:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

आणि बघा! आम्ही आमच्या सर्व वॉलेट कार्यक्षमतेचे प्रोग्रामिंग पूर्ण केले आहे! आता आमचे वॉलेट सेट झाले आहे, चला आमचा NFT कसा मिंट करायचा ते शोधूया!

## NFT मेटाडेटा 101 {#nft-metadata-101}

तर या ट्युटोरिअलच्या पायरी 0 मध्ये आपण ज्या NFT मेटाडेटाबद्दल बोललो ते लक्षात ठेवा—तो NFT ला जिवंत करतो, ज्यामुळे त्याला डिजिटल मालमत्ता, नाव, वर्णन आणि इतर गुणधर्म असू शकतात.

आम्हाला हा मेटाडेटा JSON ऑब्जेक्ट म्हणून कॉन्फिगर करावा लागेल आणि तो स्टोअर करावा लागेल, जेणेकरून आम्ही आमच्या स्मार्ट कॉन्ट्रॅक्टचे `mintNFT` फंक्शन कॉल करताना तो `tokenURI` पॅरामीटर म्हणून पास करू शकू.

"Link to Asset", "Name", "Description" फील्ड्समधील मजकूर आमच्या NFT च्या मेटाडेटाचे भिन्न गुणधर्म समाविष्ट करेल. आम्ही हा मेटाडेटा JSON ऑब्जेक्ट म्हणून फॉरमॅट करू, परंतु आम्ही हा JSON ऑब्जेक्ट कुठे स्टोअर करू शकतो यासाठी काही पर्याय आहेत:

- आम्ही तो इथेरियम ब्लॉकचेनवर स्टोअर करू शकतो; तथापि, असे करणे खूप महाग होईल.
- आम्ही तो AWS किंवा Firebase सारख्या केंद्रीकृत सर्व्हरवर स्टोअर करू शकतो. परंतु ते आमच्या विकेंद्रीकरण तत्त्वाचा पराभव करेल.
- आम्ही IPFS वापरू शकतो, जो वितरित फाइल सिस्टममध्ये डेटा स्टोअर आणि शेअर करण्यासाठी एक विकेंद्रित प्रोटोकॉल आणि पीअर-टू-पीअर नेटवर्क आहे. हा प्रोटोकॉल विकेंद्रित आणि मोफत असल्याने, हा आमचा सर्वोत्तम पर्याय आहे!

आमचा मेटाडेटा IPFS वर स्टोअर करण्यासाठी, आम्ही [Pinata](https://pinata.cloud/) वापरू, जो एक सोयीस्कर IPFS API आणि टूलकिट आहे. पुढील पायरीमध्ये, आम्ही हे नेमके कसे करायचे ते स्पष्ट करू!

## तुमचा मेटाडेटा IPFS वर पिन करण्यासाठी Pinata वापरा {#use-pinata-to-pin-your-metadata-to-ipfs}

जर तुमच्याकडे [Pinata](https://pinata.cloud/) खाते नसेल, तर [येथे](https://app.pinata.cloud/auth/signup) मोफत खात्यासाठी साइन अप करा आणि तुमचा ईमेल आणि खाते पडताळणी करण्यासाठी पायऱ्या पूर्ण करा.

### तुमची Pinata API की तयार करा {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) पेजवर नेव्हिगेट करा, नंतर शीर्षस्थानी असलेले "New Key" बटण निवडा, Admin विजेट सक्षम म्हणून सेट करा आणि तुमच्या की ला नाव द्या.

त्यानंतर तुम्हाला तुमच्या API माहितीसह एक पॉपअप दाखवला जाईल. हे कुठेतरी सुरक्षित ठेवण्याची खात्री करा.

आता आमची की सेट झाली आहे, चला ती आमच्या प्रोजेक्टमध्ये जोडूया जेणेकरून आम्ही ती वापरू शकू.

### .env फाइल तयार करा {#create-a-env}

आम्ही आमची Pinata की आणि सिक्रेट एका एन्वायरमेंट फाइलमध्ये सुरक्षितपणे स्टोअर करू शकतो. चला तुमच्या प्रोजेक्ट डिरेक्टरीमध्ये [dotenv पॅकेज](https://www.npmjs.com/package/dotenv) इन्स्टॉल करूया.

तुमच्या टर्मिनलमध्ये एक नवीन टॅब उघडा \(लोकल होस्ट रन करत असलेल्या टॅबपेक्षा वेगळा\) आणि तुम्ही `minter-starter-files` फोल्डरमध्ये आहात याची खात्री करा, नंतर तुमच्या टर्मिनलमध्ये खालील कमांड रन करा:

```text
npm install dotenv --save
```

पुढे, तुमच्या कमांड लाइनवर खालील एंटर करून तुमच्या `minter-starter-files` च्या रूट डिरेक्टरीमध्ये एक `.env` फाइल तयार करा:

```javascript
vim.env
```

हे तुमची `.env` फाइल vim \(एक टेक्स्ट एडिटर\) मध्ये उघडेल. ती सेव्ह करण्यासाठी तुमच्या कीबोर्डवर त्याच क्रमाने "esc" + ":" + "q" दाबा.

पुढे, VSCode मध्ये, तुमच्या `.env` फाइलवर नेव्हिगेट करा आणि त्यात तुमची Pinata API की आणि API सिक्रेट जोडा, जसे की:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

फाइल सेव्ह करा, आणि नंतर तुम्ही तुमचा JSON मेटाडेटा IPFS वर अपलोड करण्यासाठी फंक्शन लिहिण्यास तयार आहात!

### pinJSONToIPFS लागू करा {#pin-json-to-ipfs}

सुदैवाने आमच्यासाठी, Pinata कडे [विशेषतः JSON डेटा IPFS वर अपलोड करण्यासाठी एक API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) आहे आणि axios सह एक सोयीस्कर JavaScript उदाहरण आहे जे आम्ही काही किरकोळ बदलांसह वापरू शकतो.

तुमच्या `utils` फोल्डरमध्ये, चला `pinata.js` नावाची दुसरी फाइल तयार करूया आणि नंतर .env फाइलमधून आमचे Pinata सिक्रेट आणि की असे इम्पोर्ट करूया:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

पुढे, खालील अतिरिक्त कोड तुमच्या `pinata.js` फाइलमध्ये पेस्ट करा. काळजी करू नका, आम्ही प्रत्येक गोष्टीचा अर्थ काय आहे ते समजून घेऊ!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //Pinata ला axios POST विनंती करत आहे ⬇️
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

प्रथम, तो [axios](https://www.npmjs.com/package/axios) इम्पोर्ट करतो, जो ब्राउझर आणि Node.js साठी प्रॉमिस आधारित HTTP क्लायंट आहे, ज्याचा वापर आम्ही Pinata ला विनंती करण्यासाठी करू.

त्यानंतर आमचे असिंक्रोनस फंक्शन `pinJSONToIPFS` आहे, जे `JSONBody` ला त्याचे इनपुट म्हणून घेते आणि त्याच्या हेडरमध्ये Pinata API की आणि सिक्रेट घेते, हे सर्व त्यांच्या `pinJSONToIPFS` API ला POST विनंती करण्यासाठी.

- जर ही POST विनंती यशस्वी झाली, तर आमचे फंक्शन एक JSON ऑब्जेक्ट परत करते ज्यामध्ये `success` बुलियन true म्हणून आणि `pinataUrl` जिथे आमचा मेटाडेटा पिन केला गेला होता. आम्ही हा परत केलेला `pinataUrl` आमच्या स्मार्ट कॉन्ट्रॅक्टच्या मिंट फंक्शनसाठी `tokenURI` इनपुट म्हणून वापरू.
- जर ही POST विनंती अयशस्वी झाली, तर आमचे फंक्शन एक JSON ऑब्जेक्ट परत करते ज्यामध्ये `success` बुलियन false म्हणून आणि एक `message` स्ट्रिंग जी आमची त्रुटी दर्शवते.

आमच्या `connectWallet` फंक्शन रिटर्न प्रकारांप्रमाणेच, आम्ही JSON ऑब्जेक्ट्स परत करत आहोत जेणेकरून आम्ही आमचे स्थिती व्हेरिएबल्स आणि UI अपडेट करण्यासाठी त्यांचे पॅरामीटर्स वापरू शकू.

## तुमचे स्मार्ट कॉन्ट्रॅक्ट लोड करा {#load-your-smart-contract}

आता आमच्याकडे आमच्या `pinJSONToIPFS` फंक्शनद्वारे आमचा NFT मेटाडेटा IPFS वर अपलोड करण्याचा मार्ग आहे, आम्हाला आमच्या स्मार्ट कॉन्ट्रॅक्टचा इन्स्टन्स लोड करण्याचा मार्ग आवश्यक असेल जेणेकरून आम्ही त्याचे `mintNFT` फंक्शन कॉल करू शकू.

आम्ही आधी सांगितल्याप्रमाणे, या ट्युटोरिअलमध्ये आम्ही [हे विद्यमान NFT स्मार्ट कॉन्ट्रॅक्ट](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) वापरणार आहोत; तथापि, जर तुम्हाला आम्ही ते कसे बनवले हे शिकायचे असेल, किंवा स्वतः एक बनवायचे असेल, तर आम्ही शिफारस करतो की तुम्ही आमचे दुसरे ट्युटोरिअल, ["NFT कसे तयार करावे"](https://www.alchemy.com/docs/how-to-create-an-nft) पहा.

### कॉन्ट्रॅक्ट ABI {#contract-abi}

जर तुम्ही आमच्या फाइल्स काळजीपूर्वक तपासल्या असतील, तर तुमच्या लक्षात आले असेल की आमच्या `src` डिरेक्टरीमध्ये, एक `contract-abi.json` फाइल आहे. कॉन्ट्रॅक्ट कोणते फंक्शन इनव्होक करेल हे निर्दिष्ट करण्यासाठी तसेच फंक्शन तुम्ही अपेक्षित असलेल्या फॉरमॅटमध्ये डेटा परत करेल याची खात्री करण्यासाठी ABI आवश्यक आहे.

आम्हाला इथेरियम ब्लॉकचेनशी कनेक्ट करण्यासाठी आणि आमचे स्मार्ट कॉन्ट्रॅक्ट लोड करण्यासाठी Alchemy API की आणि Alchemy Web3 API ची देखील आवश्यकता असेल.

### तुमची Alchemy API की तयार करा {#create-alchemy-api}

जर तुमच्याकडे आधीपासून Alchemy खाते नसेल, तर [येथे मोफत साइन अप करा.](https://alchemy.com/?a=eth-org-nft-minter)

एकदा तुम्ही Alchemy खाते तयार केल्यानंतर, तुम्ही ॲप तयार करून API की जनरेट करू शकता. हे आम्हाला रॉप्स्टन् टेस्ट नेटवर्कला विनंत्या करण्याची अनुमती देईल.

नॅव्ह बारमधील “Apps” वर होव्हर करून आणि “Create App” वर क्लिक करून तुमच्या Alchemy डॅशबोर्डमधील “Create App” पेजवर नेव्हिगेट करा.

तुमच्या ॲपला नाव द्या आम्ही "My First NFT!" निवडले, एक छोटे वर्णन द्या, तुमच्या ॲप बुककीपिंगसाठी वापरल्या जाणाऱ्या एन्वायरमेंटसाठी “Staging” निवडा आणि तुमच्या नेटवर्कसाठी “Ropsten” निवडा.

“Create app” वर क्लिक करा आणि झाले! तुमचे ॲप खालील टेबलमध्ये दिसले पाहिजे.

उत्तम, तर आता आम्ही आमची HTTP Alchemy API URL तयार केली आहे, ती तुमच्या क्लिपबोर्डवर कॉपी करा...

…आणि नंतर ती आमच्या `.env` फाइलमध्ये जोडूया. एकूणच, तुमची .env फाइल अशी दिसली पाहिजे:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

आता आमच्याकडे आमचा कॉन्ट्रॅक्ट ABI आणि आमची Alchemy API की आहे, आम्ही [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) वापरून आमचे स्मार्ट कॉन्ट्रॅक्ट लोड करण्यास तयार आहोत.

### तुमचा Alchemy Web3 एंडपॉइंट आणि कॉन्ट्रॅक्ट सेट करा {#setup-alchemy-endpoint}

प्रथम, जर तुमच्याकडे ते आधीपासून नसेल, तर तुम्हाला टर्मिनलमध्ये होम डिरेक्टरी: `nft-minter-tutorial` वर नेव्हिगेट करून [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) इन्स्टॉल करावे लागेल:

```text
cd ..
npm install @alch/alchemy-web3
```

पुढे चला आमच्या `interact.js` फाइलवर परत जाऊया. फाइलच्या शीर्षस्थानी, तुमच्या .env फाइलमधून तुमची Alchemy की इम्पोर्ट करण्यासाठी आणि तुमचा Alchemy Web3 एंडपॉइंट सेट करण्यासाठी खालील कोड जोडा:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) हे [Web3.js](https://docs.web3js.org/) भोवती एक रॅपर आहे, जे वर्धित API पद्धती आणि Web3 डेव्हलपर म्हणून तुमचे जीवन सोपे करण्यासाठी इतर महत्त्वपूर्ण फायदे प्रदान करते. हे कमीतकमी कॉन्फिगरेशन आवश्यक असण्यासाठी डिझाइन केले आहे जेणेकरून तुम्ही ते तुमच्या ॲपमध्ये लगेच वापरण्यास सुरुवात करू शकता!

पुढे, चला आमचा कॉन्ट्रॅक्ट ABI आणि कॉन्ट्रॅक्ट पत्ता आमच्या फाइलमध्ये जोडूया.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

एकदा आमच्याकडे ते दोन्ही आले की, आम्ही आमचे मिंट फंक्शन कोडिंग सुरू करण्यास तयार आहोत!

## mintNFT फंक्शन लागू करा {#implement-the-mintnft-function}

तुमच्या `interact.js` फाइलच्या आत, चला आमचे फंक्शन, `mintNFT` परिभाषित करूया, जे नावाप्रमाणेच आमचा NFT मिंट करेल.

कारण आम्ही अनेक असिंक्रोनस कॉल्स करणार आहोत \(आमचा मेटाडेटा IPFS वर पिन करण्यासाठी Pinata ला, आमचे स्मार्ट कॉन्ट्रॅक्ट लोड करण्यासाठी Alchemy Web3 ला आणि आमच्या व्यवहारांवर स्वाक्षरी करण्यासाठी मेटामास्कला\), आमचे फंक्शन देखील असिंक्रोनस असेल.

आमच्या फंक्शनचे तीन इनपुट्स आमच्या डिजिटल मालमत्तेची `url`, `name`, आणि `description` असतील. `connectWallet` फंक्शनच्या खाली खालील फंक्शन सिग्नेचर जोडा:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### इनपुट त्रुटी हाताळणी {#input-error-handling}

साहजिकच, फंक्शनच्या सुरुवातीला काही प्रकारची इनपुट त्रुटी हाताळणी असणे अर्थपूर्ण आहे, जेणेकरून आमचे इनपुट पॅरामीटर्स योग्य नसल्यास आम्ही या फंक्शनमधून बाहेर पडू. आमच्या फंक्शनच्या आत, खालील कोड जोडूया:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटी हाताळणी
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

थोडक्यात, जर कोणतेही इनपुट पॅरामीटर्स रिकामी स्ट्रिंग असतील, तर आम्ही एक JSON ऑब्जेक्ट परत करतो जिथे `success` बुलियन false असते आणि `status` स्ट्रिंग असा संदेश देते की आमच्या UI मधील सर्व फील्ड्स पूर्ण असणे आवश्यक आहे.

### मेटाडेटा IPFS वर अपलोड करा {#upload-metadata-to-ipfs}

एकदा आम्हाला माहित झाले की आमचा मेटाडेटा योग्यरित्या फॉरमॅट केला आहे, पुढील पायरी म्हणजे तो JSON ऑब्जेक्टमध्ये रॅप करणे आणि आम्ही लिहिलेल्या `pinJSONToIPFS` द्वारे तो IPFS वर अपलोड करणे!

असे करण्यासाठी, आम्हाला प्रथम `pinJSONToIPFS` फंक्शन आमच्या `interact.js` फाइलमध्ये इम्पोर्ट करावे लागेल. `interact.js` च्या अगदी शीर्षस्थानी, चला जोडूया:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

लक्षात ठेवा की `pinJSONToIPFS` एक JSON बॉडी घेते. त्यामुळे आम्ही त्याला कॉल करण्यापूर्वी, आम्हाला आमचे `url`, `name`, आणि `description` पॅरामीटर्स JSON ऑब्जेक्टमध्ये फॉरमॅट करावे लागतील.

चला `metadata` नावाचा JSON ऑब्जेक्ट तयार करण्यासाठी आमचा कोड अपडेट करूया आणि नंतर या `metadata` पॅरामीटरसह `pinJSONToIPFS` ला कॉल करूया:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटी हाताळणी
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //मेटाडेटा तयार करा
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata कॉल करा
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

लक्षात घ्या, आम्ही `pinJSONToIPFS(metadata)` ला केलेल्या कॉलचा प्रतिसाद `pinataResponse` ऑब्जेक्टमध्ये स्टोअर करतो. त्यानंतर, आम्ही कोणत्याही त्रुटींसाठी हा ऑब्जेक्ट पार्स करतो.

जर एखादी त्रुटी असेल, तर आम्ही एक JSON ऑब्जेक्ट परत करतो जिथे `success` बुलियन false असते आणि आमची `status` स्ट्रिंग आमचा कॉल अयशस्वी झाल्याचा संदेश देते. अन्यथा, आम्ही `pinataResponse` मधून `pinataURL` एक्सट्रॅक्ट करतो आणि तो आमचा `tokenURI` व्हेरिएबल म्हणून स्टोअर करतो.

आता आम्ही आमच्या फाइलच्या शीर्षस्थानी इनिशियलाइज केलेल्या Alchemy Web3 API चा वापर करून आमचे स्मार्ट कॉन्ट्रॅक्ट लोड करण्याची वेळ आली आहे. `window.contract` ग्लोबल व्हेरिएबलवर कॉन्ट्रॅक्ट सेट करण्यासाठी `mintNFT` फंक्शनच्या तळाशी खालील कोडची ओळ जोडा:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

आमच्या `mintNFT` फंक्शनमध्ये जोडण्याची शेवटची गोष्ट म्हणजे आमचा इथेरियम व्यवहार:

```javascript
//तुमचा इथेरियम व्यवहार सेट अप करा
const transactionParameters = {
  to: contractAddress, // कॉन्ट्रॅक्ट प्रकाशनांशिवाय आवश्यक.
  from: window.ethereum.selectedAddress, // वापरकर्त्याच्या सक्रिय पत्त्याशी जुळला पाहिजे.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFT स्मार्ट कॉन्ट्रॅक्टला कॉल करा
}

//मेटामास्क द्वारे व्यवहारावर स्वाक्षरी करा
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

जर तुम्ही इथेरियम व्यवहारांशी आधीच परिचित असाल, तर तुमच्या लक्षात येईल की रचना तुम्ही पाहिलेल्या रचनेसारखीच आहे.

- प्रथम, आम्ही आमचे व्यवहार पॅरामीटर्स सेट करतो.
  - `to` प्राप्तकर्ता पत्ता निर्दिष्ट करते \(आमचे स्मार्ट कॉन्ट्रॅक्ट\)
  - `from` व्यवहाराच्या स्वाक्षरीकर्त्याला निर्दिष्ट करते \(वापरकर्त्याचा मेटामास्कशी कनेक्ट केलेला पत्ता: `window.ethereum.selectedAddress`\)
  - `data` मध्ये आमच्या स्मार्ट कॉन्ट्रॅक्ट `mintNFT` पद्धतीचा कॉल असतो, जो आमचा `tokenURI` आणि वापरकर्त्याचा वॉलेट पत्ता, `window.ethereum.selectedAddress`, इनपुट्स म्हणून प्राप्त करतो
- त्यानंतर, आम्ही एक await कॉल करतो, `window.ethereum.request,` जिथे आम्ही मेटामास्कला व्यवहारावर स्वाक्षरी करण्यास सांगतो. लक्षात घ्या, या विनंतीमध्ये, आम्ही आमची eth पद्धत \(eth_SentTransaction\) निर्दिष्ट करत आहोत आणि आमचा `transactionParameters` पास करत आहोत. या टप्प्यावर, ब्राउझरमध्ये मेटामास्क उघडेल आणि वापरकर्त्याला व्यवहारावर स्वाक्षरी करण्यास किंवा तो नाकारण्यास प्रवृत्त करेल.
  - जर व्यवहार यशस्वी झाला, तर फंक्शन एक JSON ऑब्जेक्ट परत करेल जिथे बुलियन `success` true वर सेट केले जाते आणि `status` स्ट्रिंग वापरकर्त्याला त्यांच्या व्यवहाराबद्दल अधिक माहितीसाठी Etherscan तपासण्यास प्रवृत्त करते.
  - जर व्यवहार अयशस्वी झाला, तर फंक्शन एक JSON ऑब्जेक्ट परत करेल जिथे `success` बुलियन false वर सेट केले जाते आणि `status` स्ट्रिंग त्रुटी संदेश देते.

एकूणच, आमचे `mintNFT` फंक्शन असे दिसले पाहिजे:

```javascript
export const mintNFT = async (url, name, description) => {
  //त्रुटी हाताळणी
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //मेटाडेटा तयार करा
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata पिन विनंती
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //स्मार्ट कॉन्ट्रॅक्ट लोड करा
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //तुमचा इथेरियम व्यवहार सेट अप करा
  const transactionParameters = {
    to: contractAddress, // कॉन्ट्रॅक्ट प्रकाशनांशिवाय आवश्यक.
    from: window.ethereum.selectedAddress, // वापरकर्त्याच्या सक्रिय पत्त्याशी जुळला पाहिजे.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //NFT स्मार्ट कॉन्ट्रॅक्टला कॉल करा
  }

  //मेटामास्क द्वारे व्यवहारावर स्वाक्षरी करा
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

हे एक मोठे फंक्शन आहे! आता, आम्हाला फक्त आमचे `mintNFT` फंक्शन आमच्या `Minter.js` कंपोनेंटशी कनेक्ट करण्याची आवश्यकता आहे...

## mintNFT आमच्या Minter.js फ्रंटएंडशी कनेक्ट करा {#connect-our-frontend}

तुमची `Minter.js` फाइल उघडा आणि शीर्षस्थानी असलेली `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` ओळ अशी अपडेट करा:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

शेवटी, तुमच्या इम्पोर्ट केलेल्या `mintNFT` फंक्शनला await कॉल करण्यासाठी `onMintPressed` फंक्शन लागू करा आणि आमचा व्यवहार यशस्वी झाला की अयशस्वी हे दर्शवण्यासाठी `status` स्थिती व्हेरिएबल अपडेट करा:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## तुमचा NFT लाइव्ह वेबसाइटवर प्रस्थापित करा {#deploy-your-nft}

वापरकर्त्यांना संवाद साधण्यासाठी तुमचा प्रोजेक्ट लाइव्ह नेण्यास तयार आहात? तुमचा मिंटर लाइव्ह वेबसाइटवर प्रस्थापित करण्यासाठी [हे ट्युटोरिअल](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) तपासा.

एक शेवटची पायरी...

## ब्लॉकचेन जगावर राज्य करा {#take-the-blockchain-world-by-storm}

फक्त मस्करी करत आहे, तुम्ही ट्युटोरिअलच्या शेवटी पोहोचला आहात!

थोडक्यात सांगायचे तर, NFT मिंटर तयार करून, तुम्ही यशस्वीरित्या खालील गोष्टी शिकलात:

- तुमच्या फ्रंटएंड प्रोजेक्टद्वारे मेटामास्कशी कनेक्ट करणे
- तुमच्या फ्रंटएंडवरून स्मार्ट कॉन्ट्रॅक्ट पद्धती कॉल करणे
- मेटामास्क वापरून व्यवहारांवर स्वाक्षरी करणे

कदाचित, तुम्हाला तुमच्या dapp द्वारे मिंट केलेले NFTs तुमच्या वॉलेटमध्ये दाखवायला आवडेल — त्यामुळे आमचे छोटे ट्युटोरिअल [तुमच्या वॉलेटमध्ये तुमचा NFT कसा पाहायचा](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) नक्की तपासा!

आणि, नेहमीप्रमाणे, जर तुम्हाला काही प्रश्न असतील, तर आम्ही [Alchemy डिस्कॉर्ड्](https://discord.gg/gWuC7zB) मध्ये मदत करण्यासाठी येथे आहोत. तुम्ही या ट्युटोरिअलमधील संकल्पना तुमच्या भविष्यातील प्रोजेक्ट्समध्ये कशा लागू करता हे पाहण्यासाठी आम्ही उत्सुक आहोत!