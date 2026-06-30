---
title: "NFT कसे मिंट करावे (NFT ट्युटोरियल सिरीजचा भाग 2/3)"
description: "हे ट्युटोरियल आमचे स्मार्ट कॉन्ट्रॅक्ट आणि Web3 वापरून इथेरियम ब्लॉकचेनवर NFT कसे मिंट करावे याचे वर्णन करते."
author: "सुमी मुदगील"
tags: ["ERC-721", "Alchemy", "Solidity", "स्मार्ट कॉन्ट्रॅक्ट्स"]
skill: beginner
breadcrumb: "NFT मिंट करा"
lang: mr
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 दशलक्ष
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 दशलक्ष
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 दशलक्ष

या सर्वांनी Alchemy च्या शक्तिशाली API चा वापर करून त्यांचे NFTs मिंट केले. या ट्युटोरियलमध्ये, आम्ही तुम्हाला 10 मिनिटांपेक्षा कमी वेळेत हे कसे करायचे ते शिकवू.

"NFT मिंट करणे" म्हणजे ब्लॉकचेनवर तुमच्या ERC-721 टोकनचा एक अद्वितीय नमुना प्रकाशित करण्याची कृती होय. [या NFT ट्युटोरियल सिरीजच्या भाग 1](/developers/tutorials/how-to-write-and-deploy-an-nft/) मधील आमचे स्मार्ट कॉन्ट्रॅक्ट वापरून, चला आपली Web3 कौशल्ये वापरूया आणि एक NFT मिंट करूया. या ट्युटोरियलच्या शेवटी, तुम्ही तुमच्या मनाला (आणि वॉलेटला) वाटेल तितके NFTs मिंट करू शकाल!

चला सुरुवात करूया!

## पायरी 1: Web3 इन्स्टॉल करा {#install-web3}

जर तुम्ही तुमचे NFT स्मार्ट कॉन्ट्रॅक्ट तयार करण्यावरील पहिल्या ट्युटोरियलचे अनुसरण केले असेल, तर तुम्हाला Ethers.js वापरण्याचा अनुभव आधीच असेल. Web3 हे Ethers सारखेच आहे, कारण ही एक लायब्ररी आहे जी [इथेरियम](/) ब्लॉकचेनवर विनंत्या तयार करणे सोपे करण्यासाठी वापरली जाते. या ट्युटोरियलमध्ये आम्ही [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) वापरणार आहोत, जी एक प्रगत Web3 लायब्ररी आहे जी स्वयंचलित रिट्राय (automatic retries) आणि मजबूत WebSocket सपोर्ट देते.

तुमच्या प्रोजेक्ट होम डिरेक्टरीमध्ये रन करा:

```
npm install @alch/alchemy-web3
```

## पायरी 2: एक `mint-nft.js` फाईल तयार करा {#create-mintnftjs}

तुमच्या scripts डिरेक्टरीमध्ये, एक `mint-nft.js` फाईल तयार करा आणि खालील कोडच्या ओळी जोडा:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## पायरी 3: तुमचा कॉन्ट्रॅक्ट ABI मिळवा

आमचा कॉन्ट्रॅक्ट ABI (Application Binary Interface) हा आमच्या स्मार्ट कॉन्ट्रॅक्टशी संवाद साधण्यासाठीचा इंटरफेस आहे. तुम्ही [कॉन्ट्रॅक्ट ABIs](/glossary/#abi) बद्दल अधिक जाणून घेऊ शकता. Hardhat आमच्यासाठी आपोआप एक ABI जनरेट करते आणि तो `MyNFT.json` फाईलमध्ये सेव्ह करते. याचा वापर करण्यासाठी आम्हाला आमच्या `mint-nft.js` फाईलमध्ये खालील कोडच्या ओळी जोडून त्यातील मजकूर पार्स (parse) करावा लागेल:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

जर तुम्हाला ABI पाहायचा असेल, तर तुम्ही तो तुमच्या कन्सोलवर प्रिंट करू शकता:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` रन करण्यासाठी आणि तुमचा ABI कन्सोलवर प्रिंट झालेला पाहण्यासाठी तुमच्या टर्मिनलवर जा आणि रन करा:

```js
node scripts/mint-nft.js
```
## पायरी 4: IPFS वापरून तुमच्या NFT साठी मेटाडेटा कॉन्फिगर करा {#config-meta}

जर तुम्हाला भाग 1 मधील आमच्या ट्युटोरियलवरून आठवत असेल, तर आमचे `mintNFT` स्मार्ट कॉन्ट्रॅक्ट फंक्शन एक tokenURI पॅरामीटर घेते जे NFT च्या मेटाडेटाचे वर्णन करणाऱ्या JSON डॉक्युमेंटमध्ये रिझॉल्व्ह झाले पाहिजे— जे खऱ्या अर्थाने NFT ला जिवंत करते, ज्यामुळे त्याला नाव, वर्णन, इमेज आणि इतर गुणधर्मांसारख्या कॉन्फिगर करण्यायोग्य प्रॉपर्टीज मिळतात.

> _Interplanetary File System (IPFS) हा वितरित फाईल सिस्टीममध्ये डेटा स्टोअर आणि शेअर करण्यासाठी एक विकेंद्रित प्रोटोकॉल आणि पीअर-टू-पीअर नेटवर्क आहे._

आमचा NFT खरोखरच विकेंद्रित आहे याची खात्री करण्यासाठी आम्ही आमची NFT ॲसेट आणि मेटाडेटा स्टोअर करण्यासाठी Pinata, एक सोयीस्कर IPFS API आणि टूलकिट वापरू. जर तुमच्याकडे Pinata खाते नसेल, तर [येथे](https://app.pinata.cloud) मोफत खात्यासाठी साइन अप करा आणि तुमचा ईमेल व्हेरिफाय करण्यासाठीच्या पायऱ्या पूर्ण करा.

एकदा तुम्ही खाते तयार केले की:

- "Files" पेजवर जा आणि पेजच्या वरच्या-डाव्या बाजूला असलेल्या निळ्या "Upload" बटणावर क्लिक करा.

- Pinata वर एक इमेज अपलोड करा — ही तुमच्या NFT साठी इमेज ॲसेट असेल. तुम्हाला हवे ते नाव या ॲसेटला देण्यास तुम्ही मोकळे आहात.

- तुम्ही अपलोड केल्यानंतर, तुम्हाला "Files" पेजवरील टेबलमध्ये फाईलची माहिती दिसेल. तुम्हाला एक CID कॉलम देखील दिसेल. तुम्ही त्याच्या शेजारील कॉपी बटणावर क्लिक करून CID कॉपी करू शकता. तुम्ही तुमचे अपलोड येथे पाहू शकता: `https://gateway.pinata.cloud/ipfs/<CID>`. उदाहरणार्थ, आम्ही IPFS वर वापरलेली इमेज तुम्ही [येथे](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) शोधू शकता.

अधिक व्हिज्युअल शिकणाऱ्यांसाठी, वरील पायऱ्यांचा सारांश येथे दिला आहे:

![How to upload your image to Pinata](./instructionsPinata.gif)

आता, आम्हाला Pinata वर आणखी एक डॉक्युमेंट अपलोड करायचे आहे. पण ते करण्यापूर्वी, आम्हाला ते तयार करावे लागेल!

तुमच्या रूट डिरेक्टरीमध्ये, `nft-metadata.json` नावाची एक नवीन फाईल तयार करा आणि खालील json कोड जोडा:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

json मधील डेटा बदलण्यास तुम्ही मोकळे आहात. तुम्ही attributes सेक्शनमध्ये काढून टाकू शकता किंवा जोडू शकता. सर्वात महत्त्वाचे म्हणजे, image फील्ड तुमच्या IPFS इमेजच्या लोकेशनकडे निर्देशित करत असल्याची खात्री करा — अन्यथा, तुमच्या NFT मध्ये एका (खूप गोंडस!) कुत्र्याचा फोटो समाविष्ट होईल.

एकदा तुम्ही JSON फाईल एडिट करणे पूर्ण केले की, ती सेव्ह करा आणि इमेज अपलोड करण्यासाठी आम्ही ज्या पायऱ्या फॉलो केल्या त्याच पायऱ्या फॉलो करून ती Pinata वर अपलोड करा.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## पायरी 5: तुमच्या कॉन्ट्रॅक्टचा एक इन्स्टन्स तयार करा {#instance-contract}

आता, आमच्या कॉन्ट्रॅक्टशी संवाद साधण्यासाठी, आम्हाला आमच्या कोडमध्ये त्याचा एक इन्स्टन्स तयार करणे आवश्यक आहे. असे करण्यासाठी आम्हाला आमच्या कॉन्ट्रॅक्टचा पत्ता लागेल जो आम्ही प्रस्थापना (deployment) मधून किंवा कॉन्ट्रॅक्ट प्रस्थापित करण्यासाठी तुम्ही वापरलेला पत्ता शोधून [Blockscout](https://eth-sepolia.blockscout.com/) वरून मिळवू शकतो.

![View your contract address on Etherscan](./view-contract-etherscan.png)

वरील उदाहरणात, आमचा कॉन्ट्रॅक्ट पत्ता 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778 आहे.

पुढे आम्ही ABI आणि पत्ता वापरून आमचे कॉन्ट्रॅक्ट तयार करण्यासाठी Web3 [contract method](https://docs.web3js.org/api/web3-eth-contract/class/Contract) वापरू. तुमच्या `mint-nft.js` फाईलमध्ये, खालील गोष्टी जोडा:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## पायरी 6: `.env` फाईल अपडेट करा {#update-env}

आता, इथेरियम चेनवर व्यवहार तयार करण्यासाठी आणि पाठवण्यासाठी, आम्ही खाते नॉन्स मिळवण्यासाठी तुमचा सार्वजनिक इथेरियम खाते पत्ता वापरू (खाली स्पष्ट करू).

तुमची सार्वजनिक की तुमच्या `.env` फाईलमध्ये जोडा — जर तुम्ही ट्युटोरियलचा भाग 1 पूर्ण केला असेल, तर आमची `.env` फाईल आता अशी दिसायला हवी:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## पायरी 7: तुमचा व्यवहार तयार करा

प्रथम, आपण `mintNFT(tokenData)` नावाचे एक फंक्शन परिभाषित करूया आणि खालील गोष्टी करून आपला व्यवहार तयार करूया:

1. `.env` फाईलमधून तुमची _PRIVATE_KEY_ आणि _PUBLIC_KEY_ मिळवा.

1. पुढे, आम्हाला खाते नॉन्स शोधून काढावा लागेल. तुमच्या पत्त्यावरून पाठवलेल्या व्यवहारांच्या संख्येचा मागोवा ठेवण्यासाठी नॉन्स स्पेसिफिकेशन वापरले जाते — जे आम्हाला सुरक्षिततेच्या उद्देशाने आणि रिप्ले अटॅक (replay attacks) टाळण्यासाठी आवश्यक आहे. तुमच्या पत्त्यावरून पाठवलेल्या व्यवहारांची संख्या मिळवण्यासाठी, आम्ही [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count) वापरतो.

1. शेवटी आम्ही खालील माहितीसह आमचा व्यवहार सेट करू:

- `'from': PUBLIC_KEY` — आमच्या व्यवहाराचा उगम आमचा सार्वजनिक पत्ता आहे

- `'to': contractAddress` — ज्या कॉन्ट्रॅक्टशी आम्हाला संवाद साधायचा आहे आणि व्यवहार पाठवायचा आहे

- `'nonce': nonce` — आमच्या पत्त्यावरून पाठवलेल्या व्यवहारांच्या संख्येसह खाते नॉन्स

- `'gas': estimatedGas` — व्यवहार पूर्ण करण्यासाठी आवश्यक असलेला अंदाजित गॅस

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — या व्यवहारामध्ये आम्हाला जे कॉम्प्युटेशन (computation) करायचे आहे — जे या प्रकरणात एक NFT मिंट करणे आहे

तुमची `mint-nft.js` फाईल आता अशी दिसायला हवी:

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
## पायरी 8: व्यवहारावर स्वाक्षरी करा {#sign-txn}

आता आम्ही आमचा व्यवहार तयार केला आहे, तो पाठवण्यासाठी आम्हाला त्यावर स्वाक्षरी करणे आवश्यक आहे. येथे आम्ही आमची खाजगी की वापरू.

`web3.eth.sendSignedTransaction` आम्हाला व्यवहार हॅश देईल, ज्याचा वापर करून आम्ही आमचा व्यवहार माईन झाला आहे आणि नेटवर्कद्वारे ड्रॉप झाला नाही याची खात्री करू शकतो. तुमच्या लक्षात येईल की व्यवहार स्वाक्षरी करण्याच्या सेक्शनमध्ये, आम्ही काही एरर चेकिंग जोडले आहे जेणेकरून आमचा व्यवहार यशस्वीरित्या पूर्ण झाला की नाही हे आम्हाला समजेल.

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
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## पायरी 9: `mintNFT` कॉल करा आणि node `mint-nft.js` रन करा {#call-mintnft-fn}

तुम्ही Pinata वर अपलोड केलेला `metadata.json` आठवतोय का? Pinata वरून त्याचा हॅशकोड मिळवा आणि `mintNFT` फंक्शनला पॅरामीटर म्हणून खालील गोष्टी पास करा `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

हॅशकोड कसा मिळवायचा ते येथे आहे:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Pinata वर तुमच्या nft मेटाडेटाचा हॅशकोड कसा मिळवायचा_

> तुम्ही कॉपी केलेला हॅशकोड तुमच्या **metadata.json** शी लिंक करतोय का हे `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` एका वेगळ्या विंडोमध्ये लोड करून पुन्हा तपासा. पेज खालील स्क्रीनशॉटसारखे दिसायला हवे:

![Your page should display the json metadata](./metadataJSON.png)_तुमच्या पेजवर json मेटाडेटा दिसायला हवा_

एकूणच, तुमचा कोड काहीसा असा दिसायला हवा:

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
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

आता, तुमचा NFT प्रस्थापित करण्यासाठी `node scripts/mint-nft.js` रन करा. काही सेकंदांनंतर, तुम्हाला तुमच्या टर्मिनलमध्ये असा प्रतिसाद दिसेल:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

पुढे, तुमच्या व्यवहाराची स्थिती पाहण्यासाठी (तो प्रलंबित आहे, माईन झाला आहे की नेटवर्कद्वारे ड्रॉप झाला आहे) तुमच्या [Alchemy मेमपूल](https://dashboard.alchemy.com/mempool) ला भेट द्या. जर तुमचा व्यवहार ड्रॉप झाला असेल, तर [Blockscout](https://eth-sepolia.blockscout.com/) तपासणे आणि तुमचा व्यवहार हॅश शोधणे देखील उपयुक्त ठरते.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Etherscan वर तुमचा NFT व्यवहार हॅश पहा_

आणि झाले! तुम्ही आता इथेरियम ब्लॉकचेनवर एक NFT प्रस्थापित आणि मिंट केला आहे <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` वापरून तुम्ही तुमच्या मनाला (आणि वॉलेटला) वाटेल तितके NFTs मिंट करू शकता! फक्त NFT च्या मेटाडेटाचे वर्णन करणारा एक नवीन tokenURI पास करण्याची खात्री करा (अन्यथा, तुम्ही फक्त वेगवेगळ्या IDs सह अनेक एकसारखे NFTs बनवाल).

कदाचित, तुम्हाला तुमचा NFT तुमच्या वॉलेटमध्ये दाखवायला आवडेल — त्यामुळे [भाग 3: तुमच्या वॉलेटमध्ये तुमचा NFT कसा पाहायचा](/developers/tutorials/how-to-view-nft-in-metamask/) नक्की तपासा!
