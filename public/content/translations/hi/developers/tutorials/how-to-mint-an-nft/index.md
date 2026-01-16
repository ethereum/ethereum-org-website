---
title: NFT की टकसाल कैसे करें (NFT ट्यूटोरियल सीरीज़ का भाग 2/3)
description: यह ट्यूटोरियल बताता है कि हमारे स्मार्ट अनुबंध और Web3 का उपयोग करके एथेरियम ब्लॉकचेन पर NFT की टकसाल कैसे करें।
author: "सुमी मुदगिल"
tags: [ "ERC-721", "एल्केमी", "सोलिडीटी", "स्मार्ट अनुबंध" ]
skill: beginner
lang: hi
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 मिलियन
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 मिलियन
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 मिलियन

उन सभी ने Alchemy के शक्तिशाली API का उपयोग करके अपने NFTs की टकसाल की। इस ट्यूटोरियल में, हम आपको सिखाएंगे कि \<10 मिनट में यही कैसे करें।

"NFT की टकसाल करना" ब्लॉकचेन पर आपके ERC-721 टोकन के एक अद्वितीय उदाहरण को प्रकाशित करने की प्रक्रिया है। [इस NFT ट्यूटोरियल सीरीज़ के भाग 1](/developers/tutorials/how-to-write-and-deploy-an-nft/) से हमारे स्मार्ट अनुबंध का उपयोग करके, आइए अपने Web3 कौशल को प्रदर्शित करें और एक NFT की टकसाल करें। इस ट्यूटोरियल के अंत में, आप उतने NFT की टकसाल कर पाएँगे जितने आपका दिल (और वॉलेट) चाहे!

आइए शुरू करते हैं!

## चरण 1: Web3 इंस्टॉल करें {#install-web3}

यदि आपने अपना NFT स्मार्ट अनुबंध बनाने के लिए पहले ट्यूटोरियल का पालन किया है, तो आपके पास पहले से ही Ethers.js का उपयोग करने का अनुभव है। Web3, Ethers के समान है, क्योंकि यह एक लाइब्रेरी है जिसका उपयोग एथेरियम ब्लॉकचेन से अनुरोध करना आसान बनाने के लिए किया जाता है। इस ट्यूटोरियल में हम [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) का उपयोग करेंगे, जो एक उन्नत Web3 लाइब्रेरी है जो स्वचालित री-ट्राई और मजबूत वेबसॉकेट सहायता प्रदान करती है।

अपनी प्रोजेक्ट होम डायरेक्टरी में चलाएँ:

```
npm install @alch/alchemy-web3
```

## चरण 2: एक `mint-nft.js` फ़ाइल बनाएँ {#create-mintnftjs}

अपनी स्क्रिप्ट डायरेक्टरी के अंदर, एक `mint-nft.js` फ़ाइल बनाएँ और कोड की निम्नलिखित पंक्तियाँ जोड़ें:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## चरण 3: अपना अनुबंध ABI प्राप्त करें {#contract-abi}

हमारा अनुबंध ABI (एप्लिकेशन बाइनरी इंटरफ़ेस) हमारे स्मार्ट अनुबंध के साथ इंटरैक्ट करने का इंटरफ़ेस है। आप अनुबंध ABI के बारे में [यहाँ](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) और जान सकते हैं। Hardhat स्वचालित रूप से हमारे लिए एक ABI जेनरेट करता है और इसे `MyNFT.json` फ़ाइल में सेव करता है। इसका उपयोग करने के लिए हमें अपनी `mint-nft.js` फ़ाइल में कोड की निम्नलिखित पंक्तियों को जोड़कर सामग्री को पार्स करने की आवश्यकता होगी:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

यदि आप ABI देखना चाहते हैं तो आप इसे अपने कंसोल पर प्रिंट कर सकते हैं:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` चलाने और अपने ABI को कंसोल पर प्रिंट हुआ देखने के लिए, अपने टर्मिनल पर नेविगेट करें और चलाएँ:

```js
node scripts/mint-nft.js
```

## चरण 4: IPFS का उपयोग करके अपने NFT के लिए मेटाडेटा कॉन्फ़िगर करें {#config-meta}

यदि आपको भाग 1 के हमारे ट्यूटोरियल से याद है, तो हमारा `mintNFT` स्मार्ट अनुबंध फ़ंक्शन एक tokenURI पैरामीटर लेता है जिसे NFT के मेटाडेटा का वर्णन करने वाले JSON दस्तावेज़ में रिज़ाॅल्व होना चाहिए— जो वास्तव में NFT को जीवंत बनाता है, जिससे इसमें नाम, विवरण, छवि और अन्य विशेषताओं जैसे कॉन्फ़िगर करने योग्य गुण होते हैं।

> _इंटरप्लेनेटरी फ़ाइल सिस्टम (IPFS) एक वितरित फ़ाइल सिस्टम में डेटा को संग्रहीत और साझा करने के लिए एक विकेन्द्रीकृत प्रोटोकॉल और पीयर-टू-पीयर नेटवर्क है।_

हम अपने NFT एसेट और मेटाडेटा को स्टोर करने के लिए Pinata, एक सुविधाजनक IPFS API और टूलकिट का उपयोग करेंगे, ताकि यह सुनिश्चित हो सके कि हमारा NFT वास्तव में विकेंद्रीकृत है। यदि आपके पास Pinata खाता नहीं है, तो [यहाँ](https://app.pinata.cloud) एक निःशुल्क खाते के लिए साइन अप करें और अपना ईमेल सत्यापित करने के लिए चरणों को पूरा करें।

एक बार जब आप एक खाता बना लेते हैं:

- "फ़ाइलें" पेज पर जाएँ और पेज के ऊपर-बाईं ओर नीले "अपलोड" बटन पर क्लिक करें।

- Pinata पर एक छवि अपलोड करें — यह आपके NFT के लिए छवि संपत्ति होगी। आप एसेट का जो भी चाहें नाम रख सकते हैं

- अपलोड करने के बाद, आप "फ़ाइलें" पेज पर तालिका में फ़ाइल की जानकारी देखेंगे। आपको एक CID कॉलम भी दिखाई देगा। आप इसके आगे वाले कॉपी बटन पर क्लिक करके CID कॉपी कर सकते हैं। आप अपना अपलोड यहाँ देख सकते हैं: `https://gateway.pinata.cloud/ipfs/<CID>`। उदाहरण के लिए, हमारे द्वारा IPFS पर उपयोग की गई छवि आप [यहाँ](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) देख सकते हैं।

विज़ुअल शिक्षार्थियों के लिए, उपरोक्त चरणों का सारांश यहाँ दिया गया है:

![Pinata पर अपनी छवि कैसे अपलोड करें](./instructionsPinata.gif)

अब, हम Pinata पर एक और दस्तावेज़ अपलोड करेंगे। लेकिन ऐसा करने से पहले, हमें इसे बनाना होगा!

अपनी रूट डायरेक्टरी में, `nft-metadata.json` नामक एक नई फ़ाइल बनाएँ और निम्नलिखित json कोड जोड़ें:

```json
{
  "attributes": [
    {
      "trait_type": "नस्ल",
      "value": "Maltipoo"
    },
    {
      "trait_type": "आंखों का रंग",
      "value": "Mocha"
    }
  ],
  "description": "दुनिया का सबसे प्यारा और संवेदनशील पिल्ला।",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

आप json में डेटा बदलने के लिए स्वतंत्र हैं। आप एट्रिब्यूट सेक्शन को हटा या उसमें जोड़ सकते हैं। सबसे महत्वपूर्ण बात, यह सुनिश्चित करें कि छवि फ़ील्ड आपकी IPFS छवि के स्थान को इंगित करता है — अन्यथा, आपके NFT में एक (बहुत प्यारे!) की तस्वीर शामिल होगी कुत्ते की।

एक बार जब आप JSON फ़ाइल का संपादन कर लें, तो उसे सेव कर लें और छवि अपलोड करने के लिए हमने जो चरण अपनाए थे, उन्हीं का पालन करते हुए उसे Pinata पर अपलोड करें।

![अपनी nft-metadata.json को Pinata पर कैसे अपलोड करें](./uploadPinata.gif)

## चरण 5: अपने अनुबंध का एक उदाहरण बनाएँ {#instance-contract}

अब, हमारे अनुबंध के साथ इंटरैक्ट करने के लिए, हमें अपने कोड में इसका एक उदाहरण बनाने की आवश्यकता है। ऐसा करने के लिए हमें अपने अनुबंध पते की आवश्यकता होगी जिसे हम डिप्लॉयमेंट से या [Blockscout](https://eth-sepolia.blockscout.com/) से अनुबंध डिप्लॉय करने के लिए आपके द्वारा उपयोग किए गए पते को देखकर प्राप्त कर सकते हैं।

![Etherscan पर अपना अनुबंध पता देखें](./view-contract-etherscan.png)

उपरोक्त उदाहरण में, हमारा अनुबंध पता 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778 है।

इसके बाद हम ABI और पते का उपयोग करके अपना अनुबंध बनाने के लिए Web3 [अनुबंध विधि](https://docs.web3js.org/api/web3-eth-contract/class/Contract) का उपयोग करेंगे। अपनी `mint-nft.js` फ़ाइल में, निम्नलिखित जोड़ें:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## चरण 6: `.env` फ़ाइल को अपडेट करें {#update-env}

अब, एथेरियम चेन पर लेनदेन बनाने और भेजने के लिए, हम खाते का नॉन्स (नीचे समझाएँगे) प्राप्त करने के लिए आपके सार्वजनिक एथेरियम खाते के पते का उपयोग करेंगे।

अपनी सार्वजनिक कुंजी को अपनी `.env` फ़ाइल में जोड़ें — यदि आपने ट्यूटोरियल का भाग 1 पूरा कर लिया है, तो हमारी `.env` फ़ाइल अब इस तरह दिखनी चाहिए:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## चरण 7: अपना लेनदेन बनाएँ {#create-txn}

सबसे पहले, आइए `mintNFT(tokenData)` नामक एक फ़ंक्शन को परिभाषित करें और निम्नलिखित करके अपना लेनदेन बनाएँ:

1. `.env` फ़ाइल से अपनी _PRIVATE_KEY_ और _PUBLIC_KEY_ प्राप्त करें।

2. इसके बाद, हमें खाते का नॉन्स पता लगाना होगा। नॉन्स विनिर्देश का उपयोग आपके पते से भेजे गए लेन-देन की संख्या का ट्रैक रखने के लिए किया जाता है — जिसकी हमें सुरक्षा उद्देश्यों के लिए और [रीप्ले हमलों](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) को रोकने के लिए आवश्यकता है। आपके पते से भेजे गए लेन-देनों की संख्या प्राप्त करने के लिए, हम [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) का उपयोग करते हैं।

3. अंत में हम निम्नलिखित जानकारी के साथ अपना लेनदेन स्थापित करेंगे:

- `'from': PUBLIC_KEY` — हमारे लेनदेन का मूल हमारा सार्वजनिक पता है

- `'to': contractAddress` — वह अनुबंध जिसके साथ हम इंटरैक्ट करना और लेनदेन भेजना चाहते हैं

- `'nonce': nonce` — हमारे पते से भेजे गए लेनदेन की संख्या वाला खाता नॉन्स

- `'gas': estimatedGas` — लेनदेन को पूरा करने के लिए आवश्यक अनुमानित गैस

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — वह गणना जो हम इस लेनदेन में करना चाहते हैं — जो इस मामले में एक NFT की टकसाल है

अब आपकी `mint-nft.js` फ़ाइल इस तरह दिखनी चाहिए:

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

   //लेनदेन
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## चरण 8: लेनदेन पर हस्ताक्षर करें {#sign-txn}

अब जब हमने अपना लेनदेन बना लिया है, तो इसे भेजने के लिए हमें इस पर हस्ताक्षर करने की आवश्यकता है। यहाँ हम अपनी निजी कुंजी का उपयोग करेंगे।

`web3.eth.sendSignedTransaction` हमें लेनदेन हैश देगा, जिसका उपयोग हम यह सुनिश्चित करने के लिए कर सकते हैं कि हमारा लेनदेन माइन हो गया था और नेटवर्क द्वारा ड्रॉप नहीं किया गया था। आप देखेंगे कि लेनदेन पर हस्ताक्षर करने वाले सेक्शन में, हमने कुछ त्रुटि जाँच जोड़ी है ताकि हम जान सकें कि हमारा लेनदेन सफलतापूर्वक पूरा हुआ है या नहीं।

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

  //लेनदेन
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
              "आपके लेनदेन का हैश है: ",
              hash,
              "\nअपने लेनदेन की स्थिति देखने के लिए Alchemy के मेमपूल की जाँच करें!"
            )
          } else {
            console.log(
              "आपका लेनदेन सबमिट करते समय कुछ गलत हो गया:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" वादा विफल हुआ:", err)
    })
}
```

## चरण 9: `mintNFT` को कॉल करें और नोड `mint-nft.js` चलाएँ {#call-mintnft-fn}

आपको वह `metadata.json` याद है जिसे आपने Pinata पर अपलोड किया था? Pinata से इसका हैशकोड प्राप्त करें और निम्नलिखित को `mintNFT` फ़ंक्शन में पैरामीटर के रूप में पास करें `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

हैशकोड प्राप्त करने का तरीका यहाँ दिया गया है:

![Pinata पर अपना nft मेटाडेटा हैशकोड कैसे प्राप्त करें](./metadataPinata.gif)_Pinata पर अपना nft मेटाडेटा हैशकोड कैसे प्राप्त करें_

> `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` को एक अलग विंडो में लोड करके दोबारा जाँच लें कि आपके द्वारा कॉपी किया गया हैशकोड आपकी **metadata.json** से लिंक है या नहीं। पेज नीचे दिए गए स्क्रीनशॉट के समान दिखना चाहिए:

![आपके पेज पर json मेटाडेटा प्रदर्शित होना चाहिए](./metadataJSON.png)_आपके पेज पर json मेटाडेटा प्रदर्शित होना चाहिए_

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

  //लेनदेन
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
              "आपके लेनदेन का हैश है: ",
              hash,
              "\nअपने लेनदेन की स्थिति देखने के लिए Alchemy के मेमपूल की जाँच करें!"
            )
          } else {
            console.log(
              "आपका लेनदेन सबमिट करते समय कुछ गलत हो गया:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("वादा विफल हुआ:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

अब, अपना NFT डिप्लॉय करने के लिए `node scripts/mint-nft.js` चलाएँ। कुछ सेकंड के बाद, आपको अपने टर्मिनल में इस तरह की प्रतिक्रिया दिखनी चाहिए:

    ```
    आपके लेनदेन का हैश है: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    अपने लेनदेन की स्थिति देखने के लिए Alchemy के मेमपूल की जाँच करें!
    ```

इसके बाद, अपने लेनदेन की स्थिति देखने के लिए अपने [Alchemy मेमपूल](https://dashboard.alchemyapi.io/mempool) पर जाएँ (चाहे वह लंबित हो, माइन किया गया हो, या नेटवर्क द्वारा ड्रॉप कर दिया गया हो)। यदि आपका लेनदेन ड्रॉप हो गया है, तो [Blockscout](https://eth-sepolia.blockscout.com/) की जाँच करना और अपने लेनदेन हैश को खोजना भी सहायक है।

![Etherscan पर अपना NFT लेनदेन हैश देखें](./view-nft-etherscan.png)_Etherscan पर अपना NFT लेनदेन हैश देखें_

और बस हो गया! अब आपने एथेरियम ब्लॉकचेन पर एक NFT डिप्लॉय और उसकी टकसाल कर ली है <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` का उपयोग करके आप उतने NFT की टकसाल कर सकते हैं जितना आपका दिल (और वॉलेट) चाहे! बस यह सुनिश्चित करें कि आप NFT के मेटाडेटा का वर्णन करते हुए एक नया tokenURI पास करें (अन्यथा, आप बस अलग-अलग आईडी के साथ बहुत सारे एक जैसे NFT बना देंगे)।

संभवतः, आप अपने वॉलेट में अपना NFT दिखाना चाहेंगे — तो [भाग 3: अपने वॉलेट में अपना NFT कैसे देखें](/developers/tutorials/how-to-view-nft-in-metamask/) देखना सुनिश्चित करें!
