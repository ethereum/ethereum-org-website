---
title: "NFT कैसे मिंट करें (NFT ट्यूटोरियल सीरीज़ का भाग 2/3)"
description: "यह ट्यूटोरियल बताता है कि हमारे स्मार्ट अनुबंध, Hardhat और ethers.js का उपयोग करके इथेरियम ब्लॉकचेन पर एक नॉन-फंजिबल टोकन (NFT) कैसे मिंट करें।"
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

“एक NFT मिंट करना” ब्लॉकचेन पर आपके ERC-721 टोकन का एक अनूठा इंस्टेंस प्रकाशित करने की क्रिया है। [इस NFT ट्यूटोरियल सीरीज़ के भाग 1](/developers/tutorials/how-to-write-and-deploy-an-nft/) से हमारे स्मार्ट अनुबंध का उपयोग करते हुए, आइए अपने Web3 कौशल का प्रदर्शन करें और एक NFT मिंट करें। इस ट्यूटोरियल के अंत में, आप उतने NFT मिंट कर पाएंगे जितने आपका दिल (और वॉलेट) चाहेगा!

चलिए शुरू करते हैं!

## चरण 1: अपना सेटअप जांचें {#install-web3}

यदि आपने अपना NFT स्मार्ट अनुबंध बनाने के पहले ट्यूटोरियल का पालन किया है, तो आपके पास पहले से ही वह सब कुछ है जो आपको चाहिए: [Ethers प्लगइन](https://hardhat.org/docs/plugins/hardhat-ethers) और [ethers.js](https://docs.ethers.org/v6/) के साथ एक Hardhat 3 प्रोजेक्ट, जो एक लाइब्रेरी है जिसका उपयोग [इथेरियम](/) ब्लॉकचेन पर अनुरोध बनाने को आसान बनाने के लिए किया जाता है। हम अपना मिंटिंग कोड एक Hardhat स्क्रिप्ट के रूप में लिखेंगे, ताकि यह Sepolia नेटवर्क सेटिंग्स और भाग 1 से `API_URL` और `PRIVATE_KEY` मानों का पुन: उपयोग करे — इंस्टॉल करने के लिए कुछ भी नया नहीं है।

## चरण 2: एक `mint-nft.js` फ़ाइल बनाएं {#create-mintnftjs}

अपनी scripts डायरेक्टरी के अंदर, एक `mint-nft.js` फ़ाइल बनाएं और कोड की निम्नलिखित पंक्तियाँ जोड़ें:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

हमारी डिप्लॉय स्क्रिप्ट की तरह, `network.create()` उस नेटवर्क से जुड़ता है जिसे आप स्क्रिप्ट चलाते समय `--network` के साथ चुनते हैं, और हमें इसके लिए एक `ethers` ऑब्जेक्ट देता है।

## चरण 3: अपना अनुबंध ABI प्राप्त करें {#contract-abi}

हमारा अनुबंध ABI (एप्लिकेशन बाइनरी इंटरफ़ेस) हमारे स्मार्ट अनुबंध के साथ इंटरैक्ट करने का इंटरफ़ेस है। आप [अनुबंध ABI](/glossary/#abi) के बारे में अधिक जान सकते हैं। जब Hardhat अनुबंध को संकलित करता है तो यह स्वचालित रूप से हमारे लिए एक ABI उत्पन्न करता है और इसे `artifacts/contracts/MyNFT.sol/MyNFT.json` फ़ाइल में सहेजता है। जब हम चरण 5 में अपना अनुबंध इंस्टेंस बनाते हैं तो Hardhat Ethers प्लगइन इसे हमारे लिए वहां से पढ़ता है, इसलिए हमें इसे स्वयं लोड करने की आवश्यकता नहीं है।

यदि आप ABI देखना चाहते हैं तो आप इसे अपने कंसोल पर प्रिंट कर सकते हैं। अपने प्रोजेक्ट की रूट डायरेक्टरी से, यह चलाएं:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## चरण 4: IPFS का उपयोग करके अपने NFT के लिए मेटाडेटा कॉन्फ़िगर करें {#config-meta}

यदि आपको भाग 1 में हमारे ट्यूटोरियल से याद है, तो हमारा `mintNFT` स्मार्ट अनुबंध फ़ंक्शन एक tokenURI पैरामीटर लेता है जिसे NFT के मेटाडेटा का वर्णन करने वाले JSON दस्तावेज़ में रिज़ॉल्व होना चाहिए— जो वास्तव में NFT को जीवंत बनाता है, जिससे इसमें नाम, विवरण, छवि और अन्य विशेषताओं जैसे कॉन्फ़िगर करने योग्य गुण हो सकते हैं।

> _इंटरप्लैनेटरी फ़ाइल सिस्टम (IPFS) एक वितरित फ़ाइल सिस्टम में डेटा संग्रहीत और साझा करने के लिए एक विकेंद्रीकृत प्रोटोकॉल और पीयर-टू-पीयर नेटवर्क है।_

हम अपने NFT एसेट और मेटाडेटा को संग्रहीत करने के लिए एक सुविधाजनक IPFS API और टूलकिट, Pinata का उपयोग करेंगे ताकि यह सुनिश्चित हो सके कि हमारा NFT वास्तव में विकेंद्रीकृत है। यदि आपके पास Pinata खाता नहीं है, तो [यहां](https://app.pinata.cloud) एक मुफ़्त खाते के लिए साइन अप करें और अपना ईमेल सत्यापित करने के लिए चरणों को पूरा करें।

एक बार जब आप खाता बना लेते हैं:

- [Files पेज](https://app.pinata.cloud/ipfs/files) पर नेविगेट करें और पेज के ऊपरी दाएं कोने में "Add" बटन पर क्लिक करें।

- Pinata पर एक छवि अपलोड करें — यह आपके NFT के लिए छवि एसेट होगी। आप एसेट को जो चाहें नाम दे सकते हैं। सुनिश्चित करें कि आप इसे सार्वजनिक IPFS पर अपलोड करते हैं: [निजी IPFS](https://docs.pinata.cloud/files/private-ipfs) पर मौजूद फ़ाइलों को उन वॉलेट और मार्केटप्लेस द्वारा प्राप्त नहीं किया जा सकता है जो आपका NFT प्रदर्शित करते हैं।

- अपलोड करने के बाद, आप फ़ाइल को उसके CID (कंटेंट आइडेंटिफ़ायर) के साथ Files पेज पर सूचीबद्ध देखेंगे। CID को कॉपी करें। आप अपना अपलोड यहां देख सकते हैं: `https://gateway.pinata.cloud/ipfs/<CID>`, या Pinata साइडबार में "Gateways" के अंतर्गत सूचीबद्ध समर्पित गेटवे के माध्यम से। उदाहरण के लिए, आप IPFS पर हमारे द्वारा उपयोग की गई छवि [यहां](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) पा सकते हैं।

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

json में डेटा बदलने के लिए स्वतंत्र महसूस करें। आप attributes अनुभाग को हटा सकते हैं या उसमें जोड़ सकते हैं। सबसे महत्वपूर्ण बात, सुनिश्चित करें कि image फ़ील्ड आपकी IPFS छवि के स्थान को `ipfs://<image-CID>` के रूप में इंगित करता है — अन्यथा, आपके NFT में एक (बहुत प्यारे!) कुत्ते की तस्वीर शामिल होगी।

एक बार जब आप JSON फ़ाइल का संपादन पूरा कर लें, तो इसे सहेजें और छवि अपलोड करने के लिए हमारे द्वारा किए गए समान चरणों का पालन करते हुए इसे Pinata पर अपलोड करें। `nft-metadata.json` का CID भी कॉपी करें; हमें चरण 9 में इसकी आवश्यकता होगी।

## चरण 5: अपने अनुबंध का एक इंस्टेंस बनाएं {#instance-contract}

अब, अपने अनुबंध के साथ इंटरैक्ट करने के लिए, हमें अपने कोड में इसका एक इंस्टेंस बनाना होगा। ऐसा करने के लिए हमें अपने अनुबंध पते की आवश्यकता होगी, जिसे हमारी डिप्लॉय स्क्रिप्ट ने भाग 1 में प्रिंट किया था। आप अनुबंध को तैनात करने के लिए उपयोग किए गए पते को खोजकर इसे [Etherscan](https://sepolia.etherscan.io/) या [Blockscout](https://eth-sepolia.blockscout.com/) पर भी पा सकते हैं।

![Etherscan पर अपना अनुबंध पता देखें](./view-contract-etherscan.png)

उपरोक्त उदाहरण में, हमारा अनुबंध पता 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778 है।

इसके बाद हम अपने अनुबंध को उसके नाम (जो इसे बताता है कि किस ABI का उपयोग करना है) और उसके पते का उपयोग करके बनाने के लिए Hardhat Ethers प्लगइन की `getContractAt` विधि का उपयोग करेंगे। अपनी `mint-nft.js` फ़ाइल में, पते को अपने पते से बदलते हुए, निम्नलिखित जोड़ें:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## चरण 6: `.env` फ़ाइल जांचें {#update-env}

हमारे द्वारा भेजे जाने वाले प्रत्येक लेन-देन को आपके खाते की निजी कुंजी के साथ हस्ताक्षरित किया जाना चाहिए। यदि आपने ट्यूटोरियल का भाग 1 पूरा कर लिया है, तो हमारी `.env` फ़ाइल पहले से ही इस तरह दिखनी चाहिए:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

अपना सार्वजनिक पता जोड़ने की कोई आवश्यकता नहीं है: ethers इसे निजी कुंजी से निकाल लेता है।

## चरण 7: अपना लेन-देन बनाएं {#create-txn}

सबसे पहले, आइए `mintNFT(tokenURI)` नामक एक फ़ंक्शन को परिभाषित करें और निम्नलिखित कार्य करके अपना लेन-देन बनाएं:

1. वह खाता प्राप्त करें जिससे हम लेन-देन भेजते हैं। `ethers.getSigners()` नेटवर्क के लिए कॉन्फ़िगर किए गए खाते लौटाता है, जो Sepolia पर वह खाता है जिसकी निजी कुंजी `.env` में है। चूंकि `mintNFT` `onlyOwner` है, इसलिए यह वही खाता होना चाहिए जिसने अनुबंध को तैनात किया था।

1. प्राप्तकर्ता के रूप में हमारे अपने पते और मेटाडेटा URI के साथ, हमारे अनुबंध इंस्टेंस पर `mintNFT` फ़ंक्शन को कॉल करें। यह वह गणना है जिसे हम इस लेन-देन में करना चाहते हैं — जो इस मामले में एक NFT मिंट करना है।

आपको स्वयं नॉन्स (आपके पते से भेजे गए लेन-देन की संख्या, जो रीप्ले हमलों को रोकता है), गैस सीमा, या शुल्क की गणना करने की आवश्यकता नहीं है: ethers लेन-देन भेजने से पहले उन्हें प्राप्त करता है या उनका अनुमान लगाता है।

आपकी `mint-nft.js` फ़ाइल अब इस तरह दिखनी चाहिए:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // लेन-देन भेजें। ethers हमारे लिए नॉन्स, गैस लिमिट और फीस भर देता है।
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## चरण 8: लेन-देन पर हस्ताक्षर करें {#sign-txn}

चूंकि नेटवर्क हमारी निजी कुंजी के साथ कॉन्फ़िगर किया गया है, इसलिए ethers इसे भेजने से पहले स्वचालित रूप से इसके साथ लेन-देन पर हस्ताक्षर करता है।

`mintNFT` को कॉल करने पर लेन-देन भेजे जाने के बाद यह वापस आता है, और हमें लेनदेन हैश देता है, जिसका उपयोग हम यह सुनिश्चित करने के लिए कर सकते हैं कि हमारा लेन-देन माइन किया गया था और नेटवर्क द्वारा ड्रॉप नहीं किया गया था। `tx.wait()` फिर तब तक प्रतीक्षा करता है जब तक कि लेन-देन एक ब्लॉक में शामिल न हो जाए। हमने कुछ त्रुटि जाँच भी जोड़ी है ताकि हमें पता चल सके कि हमारा लेन-देन सफलतापूर्वक पूरा हुआ या नहीं।

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // लेन-देन भेजें। ethers हमारे लिए नॉन्स, गैस लिमिट और फीस भर देता है।
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // लेन-देन के एक ब्लॉक में शामिल होने की प्रतीक्षा करें।
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## चरण 9: `mintNFT` को कॉल करें और `mint-nft.js` चलाएं {#call-mintnft-fn}

क्या आपको वह `nft-metadata.json` याद है जिसे आपने Pinata पर अपलोड किया था? Pinata से इसका CID प्राप्त करें और `ipfs://<metadata-CID>` को `mintNFT` फ़ंक्शन के पैरामीटर के रूप में पास करें। वॉलेट और मार्केटप्लेस अपनी पसंद के IPFS गेटवे के माध्यम से `ipfs://` URI को रिज़ॉल्व करते हैं, इसलिए आपका NFT किसी एक गेटवे पर निर्भर नहीं करता है।

> एक अलग विंडो में `https://gateway.pinata.cloud/ipfs/<metadata-CID>` लोड करके दोबारा जांचें कि आपके द्वारा कॉपी किया गया CID आपके **nft-metadata.json** से लिंक है। पेज नीचे दिए गए स्क्रीनशॉट के समान दिखना चाहिए:

![आपके पेज को json मेटाडेटा प्रदर्शित करना चाहिए](./metadataJSON.png)_आपके पेज को json मेटाडेटा प्रदर्शित करना चाहिए_

कुल मिलाकर, आपका कोड कुछ इस तरह दिखना चाहिए:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // लेन-देन भेजें। ethers हमारे लिए नॉन्स, गैस लिमिट और फीस भर देता है।
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // लेन-देन के एक ब्लॉक में शामिल होने की प्रतीक्षा करें।
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

अब, अपना NFT मिंट करने के लिए Sepolia के विरुद्ध स्क्रिप्ट चलाएं:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

कुछ सेकंड के बाद, आपको अपने टर्मिनल में इस तरह की प्रतिक्रिया दिखाई देनी चाहिए:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

अपने लेन-देन का विवरण देखने के लिए, [Etherscan](https://sepolia.etherscan.io/) या [Blockscout](https://eth-sepolia.blockscout.com/) पर इसके हैश को खोजें।

![Etherscan पर अपना NFT लेनदेन हैश देखें](./view-nft-etherscan.png)_Etherscan पर अपना NFT लेनदेन हैश देखें_

और बस इतना ही! अब आपने इथेरियम ब्लॉकचेन पर एक NFT तैनात और मिंट कर लिया है <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` का उपयोग करके आप उतने NFT मिंट कर सकते हैं जितने आपका दिल (और वॉलेट) चाहेगा! बस NFT के मेटाडेटा का वर्णन करने वाला एक नया tokenURI पास करना सुनिश्चित करें (अन्यथा, आप केवल अलग-अलग ID वाले एक जैसे कई NFT बना लेंगे)।

संभवतः, आप अपने वॉलेट में अपना NFT दिखाना चाहेंगे — इसलिए [भाग 3: अपने वॉलेट में अपना NFT कैसे देखें](/developers/tutorials/how-to-view-nft-in-metamask/) को देखना सुनिश्चित करें!
