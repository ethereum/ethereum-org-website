---
title: "NFT कसे मिंट करावे (NFT ट्युटोरियल मालिकेचा भाग 2/3)"
description: "हे ट्युटोरियल आमचा स्मार्ट कॉन्ट्रॅक्ट आणि Web3 वापरून Ethereum ब्लॉकचेनवर NFT कसे मिंट करायचे याचे वर्णन करते."
author: "Sumi Mudgil"
tags:
  [
    "ERC-721",
    "alchemy",
    "सॉलिडिटी",
    "स्मार्ट कॉन्ट्रॅक्ट"
  ]
skill: beginner
lang: mr
published: 2021-04-22
---

[बीपल](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 दशलक्ष
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 दशलक्ष
[ग्राइम्स](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 दशलक्ष

त्या सर्वांनी Alchemy च्या शक्तिशाली API चा वापर करून त्यांचे NFTs मिंट केले. या ट्युटोरियलमध्ये, आम्ही तुम्हाला \<10 मिनिटांत तेच कसे करायचे हे शिकवू.

"NFT मिंट करणे" म्हणजे ब्लॉकचेनवर तुमच्या ERC-721 टोकनची एक अद्वितीय प्रत प्रकाशित करण्याची क्रिया. [या NFT ट्युटोरियल मालिकेच्या भाग १](/developers/tutorials/how-to-write-and-deploy-an-nft/) मधील आमचा स्मार्ट कॉन्ट्रॅक्ट वापरून, चला आपले Web3 कौशल्य दाखवूया आणि एक NFT मिंट करूया. या ट्युटोरियलच्या शेवटी, तुम्ही तुमच्या मनाला (आणि वॉलेटला) हवे तितके NFTs मिंट करू शकाल!

चला सुरू करूया!

## पायरी १: Web3 इंस्टॉल करा {#install-web3}

जर तुम्ही तुमचा NFT स्मार्ट कॉन्ट्रॅक्ट तयार करण्यावरील पहिले ट्युटोरियल फॉलो केले असेल, तर तुम्हाला Ethers.js वापरण्याचा अनुभव आधीच आहे. Web3 हे Ethers सारखेच आहे, कारण ही एक लायब्ररी आहे जी Ethereum ब्लॉकचेनला विनंत्या करणे सोपे करण्यासाठी वापरली जाते. या ट्युटोरियलमध्ये आपण [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) वापरणार आहोत, जी एक वर्धित Web3 लायब्ररी आहे जी स्वयंचलित पुनर्प्रयत्न आणि मजबूत WebSocket सपोर्ट देते.

तुमच्या प्रोजेक्ट होम डिरेक्टरीमध्ये चालवा:

```
npm install @alch/alchemy-web3
```

## पायरी २: `mint-nft.js` फाईल तयार करा {#create-mintnftjs}

तुमच्या स्क्रिप्ट्स डिरेक्टरीमध्ये, `mint-nft.js` फाईल तयार करा आणि कोडच्या खालील ओळी जोडा:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## पायरी ३: तुमचा कॉन्ट्रॅक्ट ABI मिळवा {#contract-abi}

आमचा कॉन्ट्रॅक्ट ABI (ऍप्लिकेशन बायनरी इंटरफेस) हा आमच्या स्मार्ट कॉन्ट्रॅक्टशी संवाद साधण्यासाठी इंटरफेस आहे. तुम्ही कॉन्ट्रॅक्ट ABI बद्दल अधिक माहिती [येथे](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) मिळवू शकता. Hardhat आमच्यासाठी आपोआप एक ABI तयार करते आणि ते `MyNFT.json` फाईलमध्ये सेव्ह करते. हे वापरण्यासाठी, आपल्याला आपल्या `mint-nft.js` फाईलमध्ये कोडच्या खालील ओळी जोडून मजकूर पार्स करणे आवश्यक आहे:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

जर तुम्हाला ABI पाहायचा असेल तर तुम्ही ते तुमच्या कन्सोलवर प्रिंट करू शकता:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` चालवण्यासाठी आणि तुमचा ABI कन्सोलवर प्रिंट झालेला पाहण्यासाठी तुमच्या टर्मिनलवर नेव्हिगेट करा आणि चालवा:

```js
node scripts/mint-nft.js
```

## पायरी ४: IPFS वापरून तुमच्या NFT साठी मेटाडेटा कॉन्फिगर करा {#config-meta}

तुम्हाला भाग 1 मधील आमच्या ट्युटोरियलमधून आठवत असेल तर, आमचे `mintNFT` स्मार्ट कॉन्ट्रॅक्ट फंक्शन एक tokenURI पॅरामीटर घेते जे NFT च्या मेटाडेटाचे वर्णन करणाऱ्या JSON डॉक्युमेंटमध्ये रिझॉल्व्ह झाले पाहिजे — जे खरोखर NFT ला जिवंत करते, त्याला नाव, वर्णन, प्रतिमा आणि इतर गुणधर्मांसारखे कॉन्फिगर करण्यायोग्य गुणधर्म ठेवण्याची परवानगी देते.

> _इंटरप्लॅनेटरी फाईल सिस्टम (IPFS) हा एक विकेंद्रित प्रोटोकॉल आणि पीअर-टू-पीअर नेटवर्क आहे, जो वितरित फाईल सिस्टममध्ये डेटा संग्रहित आणि शेअर करण्यासाठी आहे._

आपला NFT खरोखर विकेंद्रित आहे याची खात्री करण्यासाठी, आपण आपली NFT मालमत्ता आणि मेटाडेटा संग्रहित करण्यासाठी Pinata, एक सोयीस्कर IPFS API आणि टूलकिट वापरणार आहोत. तुमचे Pinata खाते नसल्यास, [येथे](https://app.pinata.cloud) विनामूल्य खात्यासाठी साइन अप करा आणि तुमचा ईमेल सत्यापित करण्यासाठी पायऱ्या पूर्ण करा.

एकदा तुम्ही खाते तयार केल्यानंतर:

- "फाईल्स" पेजवर नेव्हिगेट करा आणि पेजच्या वरच्या-डाव्या कोपऱ्यात असलेल्या निळ्या "अपलोड" बटणावर क्लिक करा.

- Pinata वर एक प्रतिमा अपलोड करा — ही तुमच्या NFT साठी प्रतिमा मालमत्ता असेल. मालमत्तेला तुम्हाला हवे ते नाव देण्यास मोकळे आहात

- तुम्ही अपलोड केल्यानंतर, तुम्हाला "फाईल्स" पेजवरील टेबलमध्ये फाईलची माहिती दिसेल. तुम्हाला एक CID स्तंभ देखील दिसेल. तुम्ही त्याच्या पुढील कॉपी बटणावर क्लिक करून CID कॉपी करू शकता. तुम्ही तुमचे अपलोड येथे पाहू शकता: `https://gateway.pinata.cloud/ipfs/<CID>`. उदाहरणार्थ, आम्ही IPFS वर वापरलेली प्रतिमा तुम्ही [येथे](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) शोधू शकता.

अधिक दृष्य शिकणाऱ्यांसाठी, वरील पायऱ्या येथे सारांशित केल्या आहेत:

![तुमची प्रतिमा Pinata वर कशी अपलोड करावी](./instructionsPinata.gif)

आता, आम्हाला Pinata वर आणखी एक दस्तऐवज अपलोड करायचा आहे. पण ते करण्यापूर्वी, आपल्याला ते तयार करणे आवश्यक आहे!

तुमच्या रूट डिरेक्टरीमध्ये, `nft-metadata.json` नावाची एक नवीन फाईल बनवा आणि खालील json कोड जोडा:

```json
{
  "attributes": [
    {
      "trait_type": "जात",
      "value": "Maltipoo"
    },
    {
      "trait_type": "डोळ्यांचा रंग",
      "value": "Mocha"
    }
  ],
  "description": "जगातील सर्वात मोहक आणि संवेदनशील पिल्लू.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

json मधील डेटा बदलण्यास मोकळे आहात. तुम्ही ऍट्रिब्युट्स विभागातून काढू किंवा त्यात भर घालू शकता. सर्वात महत्त्वाचे म्हणजे, इमेज फील्ड तुमच्या IPFS प्रतिमेच्या स्थानाकडे निर्देश करते याची खात्री करा — अन्यथा, तुमच्या NFT मध्ये एका (खूप गोंडस!) कुत्र्याचा फोटो समाविष्ट असेल.

एकदा तुम्ही JSON फाईल संपादित करणे पूर्ण केले की, ती सेव्ह करा आणि प्रतिमा अपलोड करण्यासाठी आम्ही केलेल्या त्याच पायऱ्यांचे अनुसरण करून Pinata वर अपलोड करा.

![तुमचे nft-metadata.json Pinata वर कसे अपलोड करायचे](./uploadPinata.gif)

## पायरी ५: तुमच्या कॉन्ट्रॅक्टची एक प्रत तयार करा {#instance-contract}

आता, आमच्या कॉन्ट्रॅक्टशी संवाद साधण्यासाठी, आपल्याला आमच्या कोडमध्ये त्याची एक प्रत तयार करणे आवश्यक आहे. असे करण्यासाठी आम्हाला आमच्या कॉन्ट्रॅक्ट ॲड्रेसची आवश्यकता असेल, जो आपण डिप्लॉयमेंटमधून किंवा [Blockscout](https://eth-sepolia.blockscout.com/) वरून तुम्ही कॉन्ट्रॅक्ट डिप्लॉय करण्यासाठी वापरलेला ॲड्रेस शोधून मिळवू शकतो.

![Etherscan वर तुमचा कॉन्ट्रॅक्ट ॲड्रेस पहा](./view-contract-etherscan.png)

वरील उदाहरणात, आमचा कॉन्ट्रॅक्ट ॲड्रेस 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778 आहे.

पुढे आपण ABI आणि ॲड्रेस वापरून आपला कॉन्ट्रॅक्ट तयार करण्यासाठी Web3 [कॉन्ट्रॅक्ट पद्धत](https://docs.web3js.org/api/web3-eth-contract/class/Contract) वापरू. तुमच्या `mint-nft.js` फाईलमध्ये, खालील गोष्टी जोडा:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## पायरी ६: `.env` फाईल अपडेट करा {#update-env}

आता, Ethereum चेनवर व्यवहार तयार करण्यासाठी आणि पाठवण्यासाठी, आम्ही खाते नॉन्स (खाली स्पष्ट करू) मिळवण्यासाठी तुमचा सार्वजनिक Ethereum खाते ॲड्रेस वापरू.

तुमची सार्वजनिक की तुमच्या `.env` फाईलमध्ये जोडा — जर तुम्ही ट्युटोरियलचा भाग १ पूर्ण केला असेल, तर आमची `.env` फाईल आता अशी दिसेल:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/तुमची-api-की"
PRIVATE_KEY = "तुमचा-खाजगी-खाते-ॲड्रेस"
PUBLIC_KEY = "तुमचा-सार्वजनिक-खाते-ॲड्रेस"
```

## पायरी ७: तुमचा व्यवहार तयार करा {#create-txn}

प्रथम, `mintNFT(tokenData)` नावाचे एक फंक्शन परिभाषित करूया आणि खालील गोष्टी करून आपला व्यवहार तयार करूया:

1. `.env` फाईलमधून तुमची _PRIVATE_KEY_ आणि _PUBLIC_KEY_ मिळवा.

2. पुढे, आपल्याला खाते नॉन्स शोधण्याची आवश्यकता असेल. नॉन्स स्पेसिफिकेशनचा वापर तुमच्या ॲड्रेसवरून पाठवलेल्या व्यवहारांच्या संख्येचा मागोवा ठेवण्यासाठी केला जातो — ज्याची आम्हाला सुरक्षिततेच्या उद्देशाने आणि [रिप्ले हल्ले](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) टाळण्यासाठी आवश्यकता आहे. तुमच्या ॲड्रेसवरून पाठवलेल्या व्यवहारांची संख्या मिळवण्यासाठी, आम्ही [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) वापरतो.

3. शेवटी आम्ही खालील माहितीसह आमचा व्यवहार सेट करू:

- `'from': PUBLIC_KEY` — आमच्या व्यवहाराचा उगम आमचा सार्वजनिक ॲड्रेस आहे

- `'to': contractAddress` — ज्या कॉन्ट्रॅक्टशी आम्ही संवाद साधू आणि व्यवहार पाठवू इच्छितो

- `'nonce': nonce` — आमच्या ॲड्रेसवरून पाठवलेल्या व्यवहारांच्या संख्येसह खाते नॉन्स

- `'gas': estimatedGas` — व्यवहार पूर्ण करण्यासाठी लागणारा अंदाजित गॅस

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — या व्यवहारामध्ये आपण जी गणना करू इच्छितो — जी या प्रकरणात NFT मिंट करणे आहे

तुमची `mint-nft.js` फाईल आता अशी दिसेल:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //नवीनतम नॉन्स मिळवा

   //व्यवहार
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## पायरी ८: व्यवहारावर सही करा {#sign-txn}

आता आपण आपला व्यवहार तयार केला आहे, तो पाठवण्यासाठी आपल्याला त्यावर सही करणे आवश्यक आहे. येथे आपण आपली खाजगी की वापरू.

`web3.eth.sendSignedTransaction` आपल्याला व्यवहाराचा हॅश देईल, ज्याचा वापर आपण आपला व्यवहार माइन झाला आहे आणि नेटवर्कद्वारे तो ड्रॉप झाला नाही याची खात्री करण्यासाठी करू शकतो. तुमच्या लक्षात येईल की व्यवहार स्वाक्षरी विभागात, आम्ही काही त्रुटी तपासणी जोडली आहे जेणेकरून आपला व्यवहार यशस्वीरित्या पार पडला की नाही हे आपल्याला कळेल.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //नवीनतम नॉन्स मिळवा

  //व्यवहार
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "तुमच्या व्यवहाराचा हॅश आहे: ",
              hash,
              "\nतुमच्या व्यवहाराची स्थिती पाहण्यासाठी Alchemy's Mempool तपासा!"
            )
          } else {
            console.log(
              "तुमचा व्यवहार सबमिट करताना काहीतरी चूक झाली:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise अयशस्वी झाले:", err)
    })
}
```

## पायरी ९: `mintNFT` ला कॉल करा आणि नोड `mint-nft.js` चालवा {#call-mintnft-fn}

तुम्ही Pinata वर अपलोड केलेली `metadata.json` आठवते का? Pinata वरून त्याचा हॅशकोड मिळवा आणि `mintNFT` फंक्शनला पॅरामीटर म्हणून `https://gateway.pinata.cloud/ipfs/<मेटाडेटा-हॅश-कोड>` पास करा

हॅशकोड कसा मिळवायचा ते येथे आहे:

![Pinata वर तुमच्या nft मेटाडेटाचा हॅशकोड कसा मिळवायचा](./metadataPinata.gif)_Pinata वर तुमच्या nft मेटाडेटाचा हॅशकोड कसा मिळवायचा_

> स्वतंत्र विंडोमध्ये `https://gateway.pinata.cloud/ipfs/<मेटाडेटा-हॅश-कोड>` लोड करून तुम्ही कॉपी केलेला हॅशकोड तुमच्या **metadata.json** शी लिंक आहे का हे पुन्हा तपासा. हे पेज खालील स्क्रीनशॉटसारखे दिसावे:

![तुमच्या पेजवर json मेटाडेटा प्रदर्शित झाला पाहिजे](./metadataJSON.png)_तुमच्या पेजवर json मेटाडेटा प्रदर्शित झाला पाहिजे_

एकूण, तुमचा कोड काहीसा असा दिसेल:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //नवीनतम नॉन्स मिळवा

  //व्यवहार
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "तुमच्या व्यवहाराचा हॅश आहे: ",
              hash,
              "\nतुमच्या व्यवहाराची स्थिती पाहण्यासाठी Alchemy's Mempool तपासा!"
            )
          } else {
            console.log(
              "तुमचा व्यवहार सबमिट करताना काहीतरी चूक झाली:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise अयशस्वी झाले:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

आता, तुमचा NFT डिप्लॉय करण्यासाठी `node scripts/mint-nft.js` चालवा. काही सेकंदांनंतर, तुम्हाला तुमच्या टर्मिनलमध्ये असा प्रतिसाद दिसेल:

    ```
    तुमच्या व्यवहाराचा हॅश आहे: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    तुमच्या व्यवहाराची स्थिती पाहण्यासाठी Alchemy's Mempool तपासा!
    ```

पुढे, तुमच्या व्यवहाराची स्थिती (तो प्रलंबित आहे, माइन झाला आहे, किंवा नेटवर्कद्वारे ड्रॉप झाला आहे) पाहण्यासाठी तुमच्या [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) ला भेट द्या. तुमचा व्यवहार ड्रॉप झाला असल्यास, [Blockscout](https://eth-sepolia.blockscout.com/) तपासणे आणि तुमच्या व्यवहाराचा हॅश शोधणे देखील उपयुक्त आहे.

![Etherscan वर तुमचा NFT व्यवहाराचा हॅश पहा](./view-nft-etherscan.png)_Etherscan वर तुमचा NFT व्यवहाराचा हॅश पहा_

आणि बस्स! तुम्ही आता Ethereum ब्लॉकचेनवर एक NFT डिप्लॉय आणि मिंट केला आहे <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` वापरून तुम्ही तुमच्या मनाला (आणि वॉलेटला) हवे तितके NFTs मिंट करू शकता! फक्त NFT च्या मेटाडेटाचे वर्णन करणारा एक नवीन tokenURI पास करण्याची खात्री करा (अन्यथा, तुम्ही फक्त वेगवेगळ्या आयडीसह सारख्याच अनेक प्रती तयार कराल).

साहजिकच, तुम्हाला तुमच्या वॉलेटमध्ये तुमचा NFT दाखवायला आवडेल — म्हणून [भाग ३: तुमच्या वॉलेटमध्ये तुमचा NFT कसा पाहावा](/developers/tutorials/how-to-view-nft-in-metamask/) नक्की पहा!
