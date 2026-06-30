---
title: "NFT कैसे मिंट करें (NFT ट्यूटोरियल सीरीज़ का भाग 2/3)"
description: "यह ट्यूटोरियल बताता है कि हमारे स्मार्ट अनुबंध और Web3 का उपयोग करके इथेरियम ब्लॉकचेन पर NFT कैसे मिंट करें।"
author: "सुमी मुदगिल"
tags:
  - ERC-721
  - alchemy
  - solidity
  - स्मार्ट अनुबंध
skill: beginner
breadcrumb: "NFT मिंट करें"
lang: hi
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 मिलियन
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 मिलियन
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 मिलियन

इन सभी ने Alchemy के शक्तिशाली API का उपयोग करके अपने NFT मिंट किए। इस ट्यूटोरियल में, हम आपको सिखाएंगे कि \<10 मिनट में ऐसा कैसे करें।

“NFT मिंटिंग” ब्लॉकचेन पर आपके ERC-721 टोकन का एक अनूठा उदाहरण प्रकाशित करने की क्रिया है। [इस NFT ट्यूटोरियल सीरीज़ के भाग 1](/developers/tutorials/how-to-write-and-deploy-an-nft/) से हमारे स्मार्ट अनुबंध का उपयोग करते हुए, आइए अपने Web3 कौशल का प्रदर्शन करें और एक NFT मिंट करें। इस ट्यूटोरियल के अंत में, आप उतने NFT मिंट करने में सक्षम होंगे जितना आपका दिल (और वॉलेट) चाहता है!

चलिए शुरू करते हैं!

## चरण 1: Web3 इंस्टॉल करें {#install-web3}

यदि आपने अपना NFT स्मार्ट अनुबंध बनाने के पहले ट्यूटोरियल का पालन किया है, तो आपके पास पहले से ही Ethers.js का उपयोग करने का अनुभव है। Web3, Ethers के समान है, क्योंकि यह एक लाइब्रेरी है जिसका उपयोग [इथेरियम](/) ब्लॉकचेन पर अनुरोध बनाने को आसान बनाने के लिए किया जाता है। इस ट्यूटोरियल में हम [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) का उपयोग करेंगे, जो एक उन्नत Web3 लाइब्रेरी है जो स्वचालित री-ट्राई और मजबूत WebSocket समर्थन प्रदान करती है।

अपने प्रोजेक्ट की होम डायरेक्टरी में रन करें:

```
npm install @alch/alchemy-web3
```

## चरण 2: एक `mint-nft.js` फ़ाइल बनाएं {#create-mintnftjs}

अपनी scripts डायरेक्टरी के अंदर, एक `mint-nft.js` फ़ाइल बनाएं और कोड की निम्नलिखित पंक्तियाँ जोड़ें:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## चरण 3: अपना अनुबंध ABI प्राप्त करें

हमारा अनुबंध ABI (एप्लिकेशन बाइनरी इंटरफ़ेस) हमारे स्मार्ट अनुबंध के साथ इंटरैक्ट करने का इंटरफ़ेस है। आप [अनुबंध ABI](/glossary/#abi) के बारे में अधिक जान सकते हैं। Hardhat स्वचालित रूप से हमारे लिए एक ABI जनरेट करता है और इसे `MyNFT.json` फ़ाइल में सहेजता है। इसका उपयोग करने के लिए हमें अपनी `mint-nft.js` फ़ाइल में कोड की निम्नलिखित पंक्तियाँ जोड़कर सामग्री को पार्स करना होगा:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

यदि आप ABI देखना चाहते हैं तो आप इसे अपने कंसोल पर प्रिंट कर सकते हैं:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` को रन करने और अपने ABI को कंसोल पर प्रिंट होते देखने के लिए अपने टर्मिनल पर नेविगेट करें और रन करें:

```js
node scripts/mint-nft.js
```
## चरण 4: IPFS का उपयोग करके अपने NFT के लिए मेटाडेटा कॉन्फ़िगर करें {#config-meta}

यदि आपको भाग 1 में हमारे ट्यूटोरियल से याद है, तो हमारा `mintNFT` स्मार्ट अनुबंध फ़ंक्शन एक tokenURI पैरामीटर लेता है जिसे NFT के मेटाडेटा का वर्णन करने वाले JSON दस्तावेज़ में रिज़ॉल्व होना चाहिए— जो वास्तव में NFT को जीवंत बनाता है, जिससे इसमें नाम, विवरण, छवि और अन्य विशेषताओं जैसे कॉन्फ़िगर करने योग्य गुण हो सकते हैं।

> _इंटरप्लैनेटरी फाइल सिस्टम (IPFS) एक वितरित फ़ाइल सिस्टम में डेटा को स्टोर और साझा करने के लिए एक विकेंद्रीकृत प्रोटोकॉल और पीयर-टू-पीयर नेटवर्क है।_

हम अपने NFT एसेट और मेटाडेटा को स्टोर करने के लिए एक सुविधाजनक IPFS API और टूलकिट, Pinata का उपयोग करेंगे ताकि यह सुनिश्चित हो सके कि हमारा NFT वास्तव में विकेंद्रीकृत है। यदि आपके पास Pinata खाता नहीं है, तो [यहाँ](https://app.pinata.cloud) एक मुफ़्त खाते के लिए साइन अप करें और अपना ईमेल सत्यापित करने के चरणों को पूरा करें।

एक बार जब आप खाता बना लेते हैं:

- "Files" पृष्ठ पर नेविगेट करें और पृष्ठ के ऊपर-बाईं ओर नीले "Upload" बटन पर क्लिक करें।

- Pinata पर एक छवि अपलोड करें — यह आपके NFT के लिए छवि एसेट होगी। आप एसेट को जो चाहें नाम दे सकते हैं

- अपलोड करने के बाद, आपको "Files" पृष्ठ पर तालिका में फ़ाइल की जानकारी दिखाई देगी। आपको एक CID कॉलम भी दिखाई देगा। आप इसके बगल में स्थित कॉपी बटन पर क्लिक करके CID को कॉपी कर सकते हैं। आप अपना अपलोड यहाँ देख सकते हैं: `https://gateway.pinata.cloud/ipfs/<CID>`। उदाहरण के लिए, आप IPFS पर हमारे द्वारा उपयोग की गई छवि [यहाँ](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) पा सकते हैं।

अधिक विज़ुअल लर्नर्स के लिए, उपरोक्त चरणों को यहाँ संक्षेप में प्रस्तुत किया गया है:

![How to upload your image to Pinata](./instructionsPinata.gif)

अब, हम Pinata पर एक और दस्तावेज़ अपलोड करना चाहेंगे। लेकिन ऐसा करने से पहले, हमें इसे बनाना होगा!

अपनी रूट डायरेक्टरी में, `nft-metadata.json` नामक एक नई फ़ाइल बनाएं और निम्नलिखित json कोड जोड़ें:

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

json में डेटा बदलने के लिए स्वतंत्र महसूस करें। आप attributes अनुभाग को हटा सकते हैं या उसमें जोड़ सकते हैं। सबसे महत्वपूर्ण बात, सुनिश्चित करें कि image फ़ील्ड आपकी IPFS छवि के स्थान को इंगित करता है — अन्यथा, आपके NFT में एक (बहुत प्यारे!) कुत्ते की तस्वीर शामिल होगी।

एक बार जब आप JSON फ़ाइल का संपादन पूरा कर लें, तो इसे सहेजें और छवि अपलोड करने के लिए हमारे द्वारा किए गए समान चरणों का पालन करते हुए इसे Pinata पर अपलोड करें।

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## चरण 5: अपने अनुबंध का एक उदाहरण (instance) बनाएं {#instance-contract}

अब, अपने अनुबंध के साथ इंटरैक्ट करने के लिए, हमें अपने कोड में इसका एक उदाहरण बनाना होगा। ऐसा करने के लिए हमें अपने अनुबंध पते की आवश्यकता होगी जिसे हम तैनाती से या अनुबंध को तैनात करने के लिए आपके द्वारा उपयोग किए गए पते को देखकर [Blockscout](https://eth-sepolia.blockscout.com/) से प्राप्त कर सकते हैं।

![View your contract address on Etherscan](./view-contract-etherscan.png)

उपरोक्त उदाहरण में, हमारा अनुबंध पता 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778 है।

इसके बाद हम ABI और पते का उपयोग करके अपना अनुबंध बनाने के लिए Web3 [contract method](https://docs.web3js.org/api/web3-eth-contract/class/Contract) का उपयोग करेंगे। अपनी `mint-nft.js` फ़ाइल में, निम्नलिखित जोड़ें:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## चरण 6: `.env` फ़ाइल को अपडेट करें {#update-env}

अब, इथेरियम चेन पर लेन-देन बनाने और भेजने के लिए, हम खाता नॉन्स प्राप्त करने के लिए आपके सार्वजनिक इथेरियम खाता पते का उपयोग करेंगे (नीचे समझाएंगे)।

अपनी सार्वजनिक कुंजी को अपनी `.env` फ़ाइल में जोड़ें — यदि आपने ट्यूटोरियल का भाग 1 पूरा कर लिया है, तो हमारी `.env` फ़ाइल अब इस तरह दिखनी चाहिए:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## चरण 7: अपना लेन-देन बनाएं

सबसे पहले, आइए `mintNFT(tokenData)` नामक एक फ़ंक्शन को परिभाषित करें और निम्नलिखित कार्य करके अपना लेन-देन बनाएं:

1. `.env` फ़ाइल से अपनी _PRIVATE_KEY_ और _PUBLIC_KEY_ प्राप्त करें।

1. इसके बाद, हमें खाता नॉन्स का पता लगाना होगा। नॉन्स विनिर्देश का उपयोग आपके पते से भेजे गए लेन-देन की संख्या पर नज़र रखने के लिए किया जाता है — जिसकी हमें सुरक्षा उद्देश्यों और रीप्ले हमलों (replay attacks) को रोकने के लिए आवश्यकता होती है। आपके पते से भेजे गए लेन-देन की संख्या प्राप्त करने के लिए, हम [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count) का उपयोग करते हैं。

1. अंत में हम निम्नलिखित जानकारी के साथ अपना लेन-देन सेट करेंगे:

- `'from': PUBLIC_KEY` — हमारे लेन-देन का मूल हमारा सार्वजनिक पता है

- `'to': contractAddress` — वह अनुबंध जिसके साथ हम इंटरैक्ट करना चाहते हैं और लेन-देन भेजना चाहते हैं

- `'nonce': nonce` — हमारे पते से भेजे गए लेन-देन की संख्या के साथ खाता नॉन्स

- `'gas': estimatedGas` — लेन-देन को पूरा करने के लिए आवश्यक अनुमानित गैस

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — वह गणना जो हम इस लेन-देन में करना चाहते हैं — जो इस मामले में एक NFT मिंट करना है

आपकी `mint-nft.js` फ़ाइल अब इस तरह दिखनी चाहिए:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //नवीनतम नॉन्स प्राप्त करें

   //लेन-देन
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```
## चरण 8: लेन-देन पर हस्ताक्षर करें {#sign-txn}

अब जब हमने अपना लेन-देन बना लिया है, तो हमें इसे भेजने के लिए इस पर हस्ताक्षर करने की आवश्यकता है। यहीं पर हम अपनी निजी कुंजी का उपयोग करेंगे।

`web3.eth.sendSignedTransaction` हमें लेनदेन हैश देगा, जिसका उपयोग हम यह सुनिश्चित करने के लिए कर सकते हैं कि हमारा लेन-देन माइन किया गया था और नेटवर्क द्वारा ड्रॉप नहीं किया गया था। आप देखेंगे कि लेन-देन पर हस्ताक्षर करने वाले अनुभाग में, हमने कुछ त्रुटि जाँच (error checking) जोड़ी है ताकि हमें पता चल सके कि हमारा लेन-देन सफलतापूर्वक पूरा हुआ या नहीं।

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //नवीनतम नॉन्स प्राप्त करें

  //लेन-देन
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

## चरण 9: `mintNFT` को कॉल करें और नोड `mint-nft.js` रन करें {#call-mintnft-fn}

क्या आपको वह `metadata.json` याद है जिसे आपने Pinata पर अपलोड किया था? Pinata से इसका हैशकोड प्राप्त करें और निम्नलिखित को फ़ंक्शन `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` में पैरामीटर के रूप में पास करें

यहाँ बताया गया है कि हैशकोड कैसे प्राप्त करें:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Pinata पर अपना nft मेटाडेटा हैशकोड कैसे प्राप्त करें_

> एक अलग विंडो में `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` लोड करके दोबारा जांचें कि आपके द्वारा कॉपी किया गया हैशकोड आपके **metadata.json** से लिंक है। पृष्ठ नीचे दिए गए स्क्रीनशॉट के समान दिखना चाहिए:

![Your page should display the json metadata](./metadataJSON.png)_आपके पृष्ठ को json मेटाडेटा प्रदर्शित करना चाहिए_

कुल मिलाकर, आपका कोड कुछ इस तरह दिखना चाहिए:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //नवीनतम नॉन्स प्राप्त करें

  //लेन-देन
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

अब, अपना NFT तैनात करने के लिए `node scripts/mint-nft.js` रन करें। कुछ सेकंड के बाद, आपको अपने टर्मिनल में इस तरह की प्रतिक्रिया दिखाई देनी चाहिए:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

इसके बाद, अपने लेन-देन की स्थिति देखने के लिए अपने [Alchemy मेमपूल](https://dashboard.alchemy.com/mempool) पर जाएं (चाहे वह लंबित हो, माइन किया गया हो, या नेटवर्क द्वारा ड्रॉप कर दिया गया हो)। यदि आपका लेन-देन ड्रॉप हो गया है, तो [Blockscout](https://eth-sepolia.blockscout.com/) की जांच करना और अपने लेनदेन हैश को खोजना भी मददगार होता है।

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Etherscan पर अपना NFT लेनदेन हैश देखें_

और बस इतना ही! अब आपने इथेरियम ब्लॉकचेन पर एक NFT तैनात और मिंट कर लिया है <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` का उपयोग करके आप उतने NFT मिंट कर सकते हैं जितना आपका दिल (और वॉलेट) चाहता है! बस NFT के मेटाडेटा का वर्णन करने वाला एक नया tokenURI पास करना सुनिश्चित करें (अन्यथा, आप केवल अलग-अलग ID वाले समान NFT का एक गुच्छा बना लेंगे)।

संभवतः, आप अपने वॉलेट में अपना NFT दिखाना चाहेंगे — इसलिए [भाग 3: अपने वॉलेट में अपना NFT कैसे देखें](/developers/tutorials/how-to-view-nft-in-metamask/) को देखना सुनिश्चित करें!
