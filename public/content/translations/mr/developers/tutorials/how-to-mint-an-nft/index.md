---
title: "NFT कसे मिंट करावे (NFT ट्युटोरियल सिरीजचा भाग 2/3)"
description: "हे ट्युटोरियल आमचे स्मार्ट कॉन्ट्रॅक्ट, Hardhat आणि ethers.js वापरून इथेरियम ब्लॉकचेनवर NFT कसे मिंट करावे याचे वर्णन करते."
author: "सुमी मुदगील"
tags: ["ERC-721", "Alchemy", "Solidity", "स्मार्ट कॉन्ट्रॅक्ट्स"]
skill: beginner
breadcrumb: "NFT मिंट करा"
lang: mr
published: 2021-04-22
---

"NFT मिंट करणे" म्हणजे ब्लॉकचेनवर तुमच्या ERC-721 टोकनचे एक अद्वितीय उदाहरण प्रकाशित करण्याची कृती होय. [या NFT ट्युटोरियल सिरीजच्या भाग 1](/developers/tutorials/how-to-write-and-deploy-an-nft/) मधील आमचे स्मार्ट कॉन्ट्रॅक्ट वापरून, चला आपली Web3 कौशल्ये वापरूया आणि एक NFT मिंट करूया. या ट्युटोरियलच्या शेवटी, तुम्ही तुमच्या मनाला (आणि वॉलेटला) वाटेल तितके NFTs मिंट करू शकाल!

चला सुरुवात करूया!

## पायरी 1: तुमचा सेटअप तपासा {#install-web3}

जर तुम्ही तुमचे NFT स्मार्ट कॉन्ट्रॅक्ट तयार करण्यावरील पहिल्या ट्युटोरियलचे अनुसरण केले असेल, तर तुमच्याकडे आधीपासूनच आवश्यक असलेले सर्व काही आहे: [Ethers प्लगइन](https://hardhat.org/docs/plugins/hardhat-ethers) आणि [ethers.js](https://docs.ethers.org/v6/) सह एक Hardhat 3 प्रोजेक्ट, जी [इथेरियम](/) ब्लॉकचेनवर विनंत्या तयार करणे सोपे करण्यासाठी वापरली जाणारी एक लायब्ररी आहे. आम्ही आमचा मिंटिंग कोड Hardhat स्क्रिप्ट म्हणून लिहू, जेणेकरून ते Sepolia नेटवर्क सेटिंग्ज आणि भाग 1 मधील `API_URL` आणि `PRIVATE_KEY` मूल्यांचा पुनर्वापर करेल — स्थापित करण्यासाठी काहीही नवीन नाही.

## पायरी 2: `mint-nft.js` फाईल तयार करा {#create-mintnftjs}

तुमच्या scripts डिरेक्टरीमध्ये, `mint-nft.js` फाईल तयार करा आणि खालील कोडच्या ओळी जोडा:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

आमच्या प्रस्थापित करण्याच्या स्क्रिप्टप्रमाणेच, जेव्हा तुम्ही स्क्रिप्ट चालवता तेव्हा `network.create()` तुम्ही `--network` सह निवडलेल्या नेटवर्कशी कनेक्ट होते आणि त्यासाठी आम्हाला एक `ethers` ऑब्जेक्ट देते.

## पायरी 3: तुमचा कॉन्ट्रॅक्ट ABI मिळवा {#contract-abi}

आमचा कॉन्ट्रॅक्ट ॲप्लिकेशन बायनरी इंटरफेस (ABI) हा आमच्या स्मार्ट कॉन्ट्रॅक्टशी संवाद साधण्यासाठीचा इंटरफेस आहे. तुम्ही [कॉन्ट्रॅक्ट ABIs](/glossary/#abi) बद्दल अधिक जाणून घेऊ शकता. जेव्हा Hardhat कॉन्ट्रॅक्ट संकलित करते तेव्हा ते आमच्यासाठी स्वयंचलितपणे एक ABI व्युत्पन्न करते आणि ते `artifacts/contracts/MyNFT.sol/MyNFT.json` फाईलमध्ये सेव्ह करते. जेव्हा आम्ही पायरी 5 मध्ये आमचे कॉन्ट्रॅक्ट उदाहरण तयार करतो तेव्हा Hardhat Ethers प्लगइन ते तिथून आमच्यासाठी वाचते, त्यामुळे आम्हाला ते स्वतः लोड करण्याची आवश्यकता नाही.

जर तुम्हाला ABI पाहायचा असेल तर तुम्ही तो तुमच्या कन्सोलवर प्रिंट करू शकता. तुमच्या प्रोजेक्टच्या रूट डिरेक्टरीमधून, हे रन करा:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## पायरी 4: IPFS वापरून तुमच्या NFT साठी मेटाडेटा कॉन्फिगर करा {#config-meta}

जर तुम्हाला भाग 1 मधील आमच्या ट्युटोरियलवरून आठवत असेल, तर आमचे `mintNFT` स्मार्ट कॉन्ट्रॅक्ट फंक्शन एक tokenURI पॅरामीटर घेते जे NFT च्या मेटाडेटाचे वर्णन करणाऱ्या JSON दस्तऐवजाचे निराकरण केले पाहिजे— जे खरोखरच NFT ला जिवंत करते, त्याला नाव, वर्णन, प्रतिमा आणि इतर गुणधर्मांसारखे कॉन्फिगर करण्यायोग्य गुणधर्म असण्याची अनुमती देते.

> _इंटरप्लॅनेटरी फाईल सिस्टीम (IPFS) हा वितरित फाईल सिस्टीममध्ये डेटा संचयित आणि सामायिक करण्यासाठी एक विकेंद्रित प्रोटोकॉल आणि पीअर-टू-पीअर नेटवर्क आहे._

आमचा NFT खरोखरच विकेंद्रित आहे याची खात्री करण्यासाठी आम्ही आमची NFT मालमत्ता आणि मेटाडेटा संचयित करण्यासाठी Pinata, एक सोयीस्कर IPFS ॲप्लिकेशन प्रोग्रामिंग इंटरफेस (API) आणि टूलकिट वापरू. जर तुमच्याकडे Pinata खाते नसेल, तर [येथे](https://app.pinata.cloud) मोफत खात्यासाठी साइन अप करा आणि तुमचा ईमेल सत्यापित करण्यासाठी पायऱ्या पूर्ण करा.

एकदा तुम्ही खाते तयार केल्यानंतर:

- [Files page](https://app.pinata.cloud/ipfs/files) वर नेव्हिगेट करा आणि पेजच्या वरच्या उजव्या कोपऱ्यातील "Add" बटणावर क्लिक करा.

- Pinata वर एक प्रतिमा अपलोड करा — ही तुमच्या NFT साठी प्रतिमा मालमत्ता असेल. मालमत्तेला तुम्हाला हवे ते नाव देण्यास मोकळे व्हा. तुम्ही ते सार्वजनिक IPFS वर अपलोड करत असल्याची खात्री करा: [Private IPFS](https://docs.pinata.cloud/files/private-ipfs) वरील फाईल्स तुमचे NFT प्रदर्शित करणाऱ्या वॉलेट्स आणि मार्केटप्लेसेसद्वारे मिळवता येत नाहीत.

- तुम्ही अपलोड केल्यानंतर, तुम्हाला फाईल्स पेजवर त्याच्या CID (कंटेंट आयडेंटिफायर) सह सूचीबद्ध केलेली फाईल दिसेल. CID कॉपी करा. तुम्ही तुमचे अपलोड येथे पाहू शकता: `https://gateway.pinata.cloud/ipfs/<CID>`, किंवा Pinata साइडबारमध्ये "Gateways" अंतर्गत सूचीबद्ध केलेल्या समर्पित गेटवेद्वारे. उदाहरणार्थ, आम्ही IPFS वर वापरलेली प्रतिमा तुम्ही [येथे](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) शोधू शकता.

आता, आम्हाला Pinata वर आणखी एक दस्तऐवज अपलोड करायचा आहे. पण ते करण्यापूर्वी, आम्हाला ते तयार करावे लागेल!

तुमच्या रूट डिरेक्टरीमध्ये, `nft-metadata.json` नावाची नवीन फाईल बनवा आणि खालील json कोड जोडा:

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

json मधील डेटा बदलण्यास मोकळे व्हा. तुम्ही attributes विभागात काढू किंवा जोडू शकता. सर्वात महत्त्वाचे म्हणजे, image फील्ड तुमच्या IPFS प्रतिमेच्या स्थानाकडे, `ipfs://<image-CID>` या स्वरूपात निर्देशित करत असल्याची खात्री करा — अन्यथा, तुमच्या NFT मध्ये एका (खूप गोंडस!) कुत्र्याचा फोटो समाविष्ट असेल.

एकदा तुम्ही JSON फाईल संपादित करणे पूर्ण केल्यानंतर, ती सेव्ह करा आणि प्रतिमा अपलोड करण्यासाठी आम्ही केलेल्या त्याच पायऱ्यांचे अनुसरण करून ती Pinata वर अपलोड करा. `nft-metadata.json` चा CID देखील कॉपी करा; आम्हाला पायरी 9 मध्ये त्याची आवश्यकता असेल.

## पायरी 5: तुमच्या कॉन्ट्रॅक्टचे उदाहरण तयार करा {#instance-contract}

आता, आमच्या कॉन्ट्रॅक्टशी संवाद साधण्यासाठी, आम्हाला आमच्या कोडमध्ये त्याचे एक उदाहरण तयार करावे लागेल. असे करण्यासाठी आम्हाला आमच्या कॉन्ट्रॅक्ट पत्त्याची आवश्यकता असेल, जो आमच्या प्रस्थापित करण्याच्या स्क्रिप्टने भाग 1 मध्ये प्रिंट केला होता. तुम्ही कॉन्ट्रॅक्ट प्रस्थापित करण्यासाठी वापरलेला पत्ता शोधून तो [Etherscan](https://sepolia.etherscan.io/) किंवा [Blockscout](https://eth-sepolia.blockscout.com/) वर देखील शोधू शकता.

![View your contract address on Etherscan](./view-contract-etherscan.png)

वरील उदाहरणात, आमचा कॉन्ट्रॅक्ट पत्ता 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778 आहे.

पुढे आम्ही आमचे कॉन्ट्रॅक्ट त्याचे नाव (जे त्याला कोणता ABI वापरायचा ते सांगते) आणि त्याचा पत्ता वापरून तयार करण्यासाठी Hardhat Ethers प्लगइनची `getContractAt` पद्धत वापरू. तुमच्या `mint-nft.js` फाईलमध्ये, पत्ता तुमच्या स्वतःच्या पत्त्याने बदलून खालील जोडा:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## पायरी 6: `.env` फाईल तपासा {#update-env}

आम्ही पाठवलेला प्रत्येक व्यवहार तुमच्या खात्याच्या खाजगी की सह स्वाक्षरी केलेला असणे आवश्यक आहे. जर तुम्ही ट्युटोरियलचा भाग 1 पूर्ण केला असेल, तर आमची `.env` फाईल आधीपासूनच यासारखी दिसली पाहिजे:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

तुमचा सार्वजनिक पत्ता जोडण्याची गरज नाही: ethers ते खाजगी की वरून शोधून काढते.

## पायरी 7: तुमचा व्यवहार तयार करा {#create-txn}

प्रथम, चला `mintNFT(tokenURI)` नावाचे फंक्शन परिभाषित करूया आणि खालील गोष्टी करून आमचा व्यवहार तयार करूया:

1. ज्या खात्यावरून आम्ही व्यवहार पाठवतो ते खाते मिळवा. `ethers.getSigners()` नेटवर्कसाठी कॉन्फिगर केलेली खाती परत करते, जे Sepolia वर ते खाते आहे ज्याची खाजगी की `.env` मध्ये आहे. `mintNFT` हे `onlyOwner` असल्यामुळे, हे तेच खाते असले पाहिजे ज्याने कॉन्ट्रॅक्ट प्रस्थापित केले आहे.

1. प्राप्तकर्ता म्हणून आमचा स्वतःचा पत्ता आणि मेटाडेटा URI सह, आमच्या कॉन्ट्रॅक्ट उदाहरणावरील `mintNFT` फंक्शनला कॉल करा. हे ते संगणन आहे जे आम्हाला या व्यवहारामध्ये करायचे आहे — जे या प्रकरणात NFT मिंट करणे आहे.

तुम्हाला स्वतः नॉन्स (तुमच्या पत्त्यावरून पाठवलेल्या व्यवहारांची संख्या, जे रिप्ले हल्ल्यांना प्रतिबंधित करते), गॅस मर्यादा, किंवा फी काढण्याची गरज नाही: ethers व्यवहार पाठवण्यापूर्वी ते मिळवते किंवा त्यांचा अंदाज लावते.

तुमची `mint-nft.js` फाईल आता यासारखी दिसली पाहिजे:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // व्यवहार पाठवा. ethers आपल्यासाठी नॉन्स, गॅस लिमिट आणि फी भरते.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## पायरी 8: व्यवहारावर स्वाक्षरी करा {#sign-txn}

कारण नेटवर्क आमच्या खाजगी की सह कॉन्फिगर केलेले आहे, ethers पाठवण्यापूर्वी स्वयंचलितपणे त्यासह व्यवहारावर स्वाक्षरी करते.

एकदा व्यवहार पाठवला गेला की `mintNFT` ला कॉल करणे परत येते, आणि आम्हाला व्यवहार हॅश देते, ज्याचा वापर आम्ही आमचा व्यवहार माइन झाला आहे आणि नेटवर्कद्वारे वगळला गेला नाही याची खात्री करण्यासाठी करू शकतो. `tx.wait()` नंतर व्यवहार ब्लॉकमध्ये समाविष्ट होईपर्यंत प्रतीक्षा करते. आम्ही काही त्रुटी तपासणी देखील जोडली आहे जेणेकरून आमचा व्यवहार यशस्वीरित्या पार पडला की नाही हे आम्हाला कळेल.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // व्यवहार पाठवा. ethers आपल्यासाठी नॉन्स, गॅस लिमिट आणि फी भरते.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // व्यवहार ब्लॉकमध्ये समाविष्ट होण्याची वाट पाहा.
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## पायरी 9: `mintNFT` ला कॉल करा आणि `mint-nft.js` रन करा {#call-mintnft-fn}

तुम्ही Pinata वर अपलोड केलेले `nft-metadata.json` आठवते का? Pinata वरून त्याचा CID मिळवा आणि `mintNFT` फंक्शनला पॅरामीटर म्हणून `ipfs://<metadata-CID>` पास करा. वॉलेट्स आणि मार्केटप्लेसेस त्यांच्या पसंतीच्या IPFS गेटवेद्वारे `ipfs://` URIs चे निराकरण करतात, त्यामुळे तुमचा NFT कोणत्याही एका गेटवेवर अवलंबून नाही.

> तुम्ही कॉपी केलेला CID तुमच्या **nft-metadata.json** शी लिंक करत असल्याची खात्री करण्यासाठी `https://gateway.pinata.cloud/ipfs/<metadata-CID>` एका वेगळ्या विंडोमध्ये लोड करून पुन्हा तपासा. पेज खालील स्क्रीनशॉटसारखे दिसले पाहिजे:

![Your page should display the json metadata](./metadataJSON.png)_तुमचे पेज json मेटाडेटा प्रदर्शित केले पाहिजे_

एकंदरीत, तुमचा कोड यासारखा दिसला पाहिजे:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // व्यवहार पाठवा. ethers आपल्यासाठी नॉन्स, गॅस लिमिट आणि फी भरते.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // व्यवहार ब्लॉकमध्ये समाविष्ट होण्याची वाट पाहा.
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

आता, तुमचा NFT मिंट करण्यासाठी Sepolia विरुद्ध स्क्रिप्ट रन करा:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

काही सेकंदांनंतर, तुम्हाला तुमच्या टर्मिनलमध्ये असा प्रतिसाद दिसेल:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

तुमच्या व्यवहाराचे तपशील पाहण्यासाठी, त्याचा हॅश [Etherscan](https://sepolia.etherscan.io/) किंवा [Blockscout](https://eth-sepolia.blockscout.com/) वर शोधा.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Etherscan वर तुमचा NFT व्यवहार हॅश पहा_

आणि एवढेच! तुम्ही आता इथेरियम ब्लॉकचेनवर NFT प्रस्थापित आणि मिंट केले आहे <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` वापरून तुम्ही तुमच्या मनाला (आणि वॉलेटला) वाटेल तितके NFTs मिंट करू शकता! फक्त NFT च्या मेटाडेटाचे वर्णन करणारा नवीन tokenURI पास करण्याची खात्री करा (अन्यथा, तुम्ही फक्त भिन्न IDs सह अनेक एकसारखे बनवाल).

कदाचित, तुम्हाला तुमच्या वॉलेटमध्ये तुमचा NFT दाखवायला आवडेल — त्यामुळे [भाग 3: तुमच्या वॉलेटमध्ये तुमचा NFT कसा पाहायचा](/developers/tutorials/how-to-view-nft-in-metamask/) नक्की तपासा!
