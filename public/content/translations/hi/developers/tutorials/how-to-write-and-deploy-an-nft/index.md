---
title: "NFT कैसे लिखें और तैनात करें (NFT ट्यूटोरियल सीरीज़ का भाग 1/3)"
description: "यह ट्यूटोरियल NFTs पर एक सीरीज़ का भाग 1 है जो आपको इथेरियम और इंटर प्लैनेटरी फाइल सिस्टम (IPFS) का उपयोग करके नॉन फंजिबल टोकन (ERC-721 टोकन) स्मार्ट अनुबंध लिखने और तैनात करने के तरीके के बारे में चरण-दर-चरण बताएगा।"
author: "सुमी मुदगिल"
tags:
  - ERC-721
  - Alchemy
  - Solidity
  - स्मार्ट अनुबंध
skill: beginner
breadcrumb: "NFT लिखें और तैनात करें"
lang: hi
published: 2021-04-22
---

नॉन-फंजिबल टोकन (NFT) द्वारा ब्लॉकचेन को जनता की नज़र में लाने के साथ, अब इथेरियम ब्लॉकचेन पर अपना स्वयं का NFT अनुबंध (ERC-721 टोकन) प्रकाशित करके इस प्रचार को समझने का एक शानदार अवसर है!

इस ट्यूटोरियल में, हम [मेटामास्क](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) और [Alchemy](https://alchemy.com/signup/eth) का उपयोग करके Sepolia टेस्टनेट (testnet) पर एक ERC-721 स्मार्ट अनुबंध बनाने और तैनात करने के बारे में चरण-दर-चरण जानेंगे (यदि आप अभी तक इसका मतलब नहीं समझते हैं तो चिंता न करें — हम इसे समझाएंगे!)।

इस ट्यूटोरियल के भाग 2 में हम जानेंगे कि हम एक NFT मिंट करने के लिए अपने स्मार्ट अनुबंध का उपयोग कैसे कर सकते हैं, और भाग 3 में हम समझाएंगे कि मेटामास्क पर अपना NFT कैसे देखें।

और निश्चित रूप से, यदि आपके पास किसी भी बिंदु पर प्रश्न हैं, तो [Alchemy डिस्कॉर्ड](https://discord.gg/gWuC7zB) में संपर्क करने में संकोच न करें या [Alchemy के NFT एप्लिकेशन प्रोग्रामिंग इंटरफ़ेस (API) दस्तावेज़](https://www.alchemy.com/docs/reference/nft-api-quickstart) पर जाएं!

## चरण 1: इथेरियम नेटवर्क से जुड़ें {#connect-to-ethereum}

इथेरियम ब्लॉकचेन पर अनुरोध करने के कई तरीके हैं, लेकिन चीजों को आसान बनाने के लिए, हम [Alchemy](https://alchemy.com/signup/eth) पर एक मुफ्त खाते का उपयोग करेंगे, जो एक ब्लॉकचेन डेवलपर प्लेटफॉर्म और API है जो हमें अपने स्वयं के नोड चलाए बिना इथेरियम चेन के साथ संवाद करने की अनुमति देता है।

इस ट्यूटोरियल में, हम अपनी स्मार्ट अनुबंध तैनाती में आंतरिक रूप से क्या हो रहा है, यह समझने के लिए निगरानी और एनालिटिक्स के लिए Alchemy के डेवलपर टूल का भी लाभ उठाएंगे। यदि आपके पास पहले से Alchemy खाता नहीं है, तो आप [यहां](https://alchemy.com/signup/eth) मुफ्त में साइन अप कर सकते हैं।

## चरण 2: अपना ऐप (और API कुंजी) बनाएं {#make-api-key}

एक बार जब आप एक Alchemy खाता बना लेते हैं, तो आप एक ऐप बनाकर एक एप्लिकेशन प्रोग्रामिंग इंटरफ़ेस (API) कुंजी उत्पन्न कर सकते हैं। यह हमें Sepolia टेस्ट नेटवर्क पर अनुरोध करने की अनुमति देगा। यदि आप टेस्ट नेटवर्क के बारे में अधिक जानने के लिए उत्सुक हैं तो [इस गाइड](https://www.alchemy.com/docs/choosing-a-web3-network) को देखें।

1. नेव बार में "Select an app" चुनकर और "Create new app" पर क्लिक करके अपने Alchemy डैशबोर्ड में "Create new app" पृष्ठ पर जाएं।

![अपना ऐप बनाएं](./alchemy-create-new-app.png)

2. अपने ऐप को नाम दें (हमने “My First NFT!” चुना है), एक संक्षिप्त विवरण दें, और एक उपयोग का मामला (use case) चुनें। इसके बाद, "Ethereum" खोजें और नेटवर्क चुनें। हम Sepolia का उपयोग करेंगे, जो एप्लिकेशन विकास के लिए अनुशंसित टेस्टनेट है ([इथेरियम नेटवर्क](/developers/docs/networks/#ethereum-testnets) देखें)।

3. आगे बढ़ने के लिए "Next" पर क्लिक करें, फिर “Create app” और बस हो गया! आपका ऐप नेव बार ड्रॉपडाउन मेनू में दिखाई देना चाहिए, जिसमें कॉपी करने के लिए एक API कुंजी उपलब्ध होगी।

## चरण 3: एक इथेरियम खाता (पता) बनाएं {#create-eth-address}

हमें लेन-देन भेजने और प्राप्त करने के लिए एक इथेरियम खाते की आवश्यकता है। इस ट्यूटोरियल के लिए, हम मेटामास्क का उपयोग करेंगे, जो आपके इथेरियम खाता पते को प्रबंधित करने के लिए ब्राउज़र में उपयोग किया जाने वाला एक वर्चुअल वॉलेट है। यदि आप इस बारे में अधिक समझना चाहते हैं कि इथेरियम पर लेन-देन कैसे काम करता है, तो एथेरियम फाउंडेशन के [इस पृष्ठ](/developers/docs/transactions/) को देखें।

आप [यहां](https://metamask.io/download) मुफ्त में मेटामास्क खाता डाउनलोड कर सकते हैं और बना सकते हैं। जब आप एक खाता बना रहे हों, या यदि आपके पास पहले से कोई खाता है, तो नेटवर्क चयन मेनू का उपयोग करके "Sepolia" टेस्ट नेटवर्क पर स्विच करना सुनिश्चित करें (ताकि हम वास्तविक पैसे से न खेलें)। यदि आपको Sepolia सूचीबद्ध नहीं दिखाई देता है, तो ऊपरी दाएं कोने में मेनू खोलें, "Networks" चुनें, और "Show test networks" को चालू करें ([टेस्टनेट देखने के लिए मेटामास्क की गाइड](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) देखें)।

![Sepolia को अपने नेटवर्क के रूप में सेट करें](./metamask-sepolia.png)

## चरण 4: फॉसेट से ईथर जोड़ें {#step-4-add-ether-from-a-faucet}

अपने स्मार्ट अनुबंध को टेस्ट नेटवर्क पर तैनात करने के लिए, हमें कुछ नकली ETH की आवश्यकता होगी। Sepolia ETH प्राप्त करने के लिए, [Sepolia नेटवर्क विवरण](/developers/docs/networks/#sepolia) में सूचीबद्ध फॉसेट में से एक चुनें और अपना खाता पता दर्ज करें। यदि एक काम नहीं करता है, तो दूसरा प्रयास करें क्योंकि वे कभी-कभी खाली हो सकते हैं, और कुछ के पात्रता नियम होते हैं: उदाहरण के लिए, [Alchemy Sepolia फॉसेट](https://www.alchemy.com/faucets/ethereum-sepolia) के लिए प्राप्तकर्ता पते पर इथेरियम मेननेट पर कम से कम 0.001 ETH होना आवश्यक है। आपको जल्द ही अपने मेटामास्क खाते में ETH दिखाई देना चाहिए!

## चरण 5: अपना बैलेंस जांचें {#check-balance}

यह दोबारा जांचने के लिए कि हमारा बैलेंस वहां मौजूद है, आइए [Alchemy के सैंडबॉक्स टूल](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) का उपयोग करके एक [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) अनुरोध करें। यह हमारे वॉलेट में ETH की मात्रा लौटाएगा। अपना मेटामास्क खाता पता दर्ज करने और “Send Request” पर क्लिक करने के बाद, आपको इस तरह की प्रतिक्रिया दिखाई देनी चाहिए:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **नोट** यह परिणाम Wei में है, ETH में नहीं। Wei का उपयोग ईथर के सबसे छोटे मूल्यवर्ग के रूप में किया जाता है। Wei से ETH में रूपांतरण 1 eth = 10<sup>18</sup> wei है। इसलिए यदि हम 0xde0b6b3a7640000 को दशमलव में बदलते हैं तो हमें 1\*10<sup>18</sup> wei मिलता है, जो 1 ETH के बराबर है।

राहत की बात है! हमारा सारा नकली पैसा वहां मौजूद है।

## चरण 6: हमारे प्रोजेक्ट को इनिशियलाइज़ करें {#initialize-project}

सबसे पहले, हमें अपने प्रोजेक्ट के लिए एक फ़ोल्डर बनाना होगा। अपनी कमांड लाइन पर जाएं और टाइप करें:

```sh
mkdir my-nft
cd my-nft
```

अब जब हम अपने प्रोजेक्ट फ़ोल्डर के अंदर हैं, तो हम प्रोजेक्ट को इनिशियलाइज़ करने के लिए npm init का उपयोग करेंगे। यदि आपके पास पहले से npm स्थापित नहीं है, तो [Node.js स्थापना निर्देशों](https://nodejs.org/en/download/) का पालन करें (हमें इस ट्यूटोरियल के लिए Node.js और npm की आवश्यकता होगी)।

```sh
npm init
```

इससे कोई फर्क नहीं पड़ता कि आप स्थापना प्रश्नों का उत्तर कैसे देते हैं; संदर्भ के लिए हमने इसे इस प्रकार किया है:

```console
package name: (my-nft)
version: (1.0.0)
description: My first NFT!
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

{
  "name": "my-nft",
  "version": "1.0.0",
  "description": "My first NFT!",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json को स्वीकृति दें। Hardhat 3, जिसे हम आगे स्थापित करेंगे, केवल ES मॉड्यूल प्रोजेक्ट्स का समर्थन करता है, इसलिए प्रोजेक्ट को उसी रूप में चिह्नित करें:

```sh
npm pkg set type=module
```

और हम आगे बढ़ने के लिए तैयार हैं!

## चरण 7: [Hardhat](https://hardhat.org/docs/getting-started) स्थापित करें {#install-hardhat}

Hardhat आपके इथेरियम सॉफ़्टवेयर को संकलित करने, तैनात करने, परीक्षण करने और डीबग करने के लिए एक विकास वातावरण है। यह लाइव चेन पर तैनात करने से पहले स्थानीय रूप से स्मार्ट अनुबंध और विकेंद्रीकृत एप्लिकेशन (dapp) बनाते समय डेवलपर्स की मदद करता है।

Hardhat 3 के लिए Node.js v22.13.0 या बाद के संस्करण की आवश्यकता है। हमारे my-nft प्रोजेक्ट के अंदर चलाएं:

```sh
npm install --save-dev hardhat
```

[स्थापना निर्देशों](https://hardhat.org/docs/getting-started) पर अधिक जानकारी के लिए इस पृष्ठ को देखें।

## चरण 8: Hardhat प्रोजेक्ट बनाएं {#create-hardhat-project}

`npx hardhat --init` चलाने से एक संपूर्ण नमूना प्रोजेक्ट उत्पन्न होगा, लेकिन इस ट्यूटोरियल के लिए हम चीजों को मैन्युअल रूप से सेट करेंगे ताकि आप हर हिस्से को देख सकें। अपने प्रोजेक्ट फ़ोल्डर के रूट में, निम्नलिखित सामग्री के साथ `hardhat.config.js` नामक एक फ़ाइल बनाएं:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

यहीं पर हम अपने प्रोजेक्ट के लिए सभी सेटअप निर्दिष्ट करेंगे (चरण 13 पर)। अभी के लिए, यह केवल Hardhat को बताता है कि Solidity कंपाइलर के किस संस्करण का उपयोग करना है।

## चरण 9: प्रोजेक्ट फ़ोल्डर जोड़ें {#add-project-folders}

अपने प्रोजेक्ट को व्यवस्थित रखने के लिए, हम दो नए फ़ोल्डर बनाएंगे। अपनी कमांड लाइन में अपने प्रोजेक्ट की रूट डायरेक्टरी पर जाएं और टाइप करें:

```sh
mkdir contracts
mkdir scripts
```

- contracts/ वह जगह है जहां हम अपना नॉन-फंजिबल टोकन (NFT) स्मार्ट अनुबंध कोड रखेंगे

- scripts/ वह जगह है जहां हम अपने स्मार्ट अनुबंध को तैनात करने और उसके साथ इंटरैक्ट करने के लिए स्क्रिप्ट रखेंगे

## चरण 10: अपना अनुबंध लिखें {#write-contract}

अब जब हमारा वातावरण सेट हो गया है, तो अधिक रोमांचक चीजों की ओर बढ़ते हैं: _अपना स्मार्ट अनुबंध कोड लिखना!_

अपने पसंदीदा संपादक (हमें [VSCode](https://code.visualstudio.com/) पसंद है) में my-nft प्रोजेक्ट खोलें। स्मार्ट अनुबंध Solidity नामक भाषा में लिखे जाते हैं जिसका उपयोग हम अपना MyNFT.sol स्मार्ट अनुबंध लिखने के लिए करेंगे।

1. `contracts` फ़ोल्डर में जाएं और MyNFT.sol नामक एक नई फ़ाइल बनाएं

2. नीचे हमारा NFT स्मार्ट अनुबंध कोड है, जिसे हमने [ओपनजेपेलिन](https://docs.openzeppelin.com/contracts/5.x/erc721) लाइब्रेरी के ERC-721 कार्यान्वयन पर आधारित किया है। नीचे दी गई सामग्री को अपनी MyNFT.sol फ़ाइल में कॉपी और पेस्ट करें।

   ```solidity
   // https://docs.openzeppelin.com/contracts/5.x/erc721 पर आधारित अनुबंध
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. क्योंकि हम ओपनजेपेलिन अनुबंध लाइब्रेरी से क्लास इनहेरिट कर रहे हैं, इसलिए हमारे फ़ोल्डर में लाइब्रेरी स्थापित करने के लिए अपनी कमांड लाइन में `npm install @openzeppelin/contracts` चलाएं। यह ट्यूटोरियल ओपनजेपेलिन अनुबंध 5.x का उपयोग करता है, जिसके लिए Solidity 0.8.24 या बाद के संस्करण की आवश्यकता होती है।

तो, यह कोड वास्तव में _क्या_ करता है? आइए इसे पंक्ति-दर-पंक्ति समझते हैं।

अपने स्मार्ट अनुबंध के शीर्ष पर, हम तीन [ओपनजेपेलिन](https://openzeppelin.com/) स्मार्ट अनुबंध क्लास आयात करते हैं:

- @openzeppelin/contracts/token/ERC721/ERC721.sol में ERC-721 मानक का कार्यान्वयन शामिल है, जिसे हमारा NFT स्मार्ट अनुबंध इनहेरिट करेगा। (एक वैध NFT होने के लिए, आपके स्मार्ट अनुबंध को ERC-721 मानक के सभी तरीकों को लागू करना होगा।) इनहेरिट किए गए ERC-721 फ़ंक्शंस के बारे में अधिक जानने के लिए, [यहां](https://eips.ethereum.org/EIPS/eip-721) इंटरफ़ेस परिभाषा देखें।

- @openzeppelin/contracts/access/Ownable.sol हमारे स्मार्ट अनुबंध पर [एक्सेस कंट्रोल](https://docs.openzeppelin.com/contracts/5.x/access-control) सेट करता है, ताकि केवल स्मार्ट अनुबंध का मालिक (आप) ही NFT मिंट कर सके। मालिक वह `initialOwner` पता है जिसे कंस्ट्रक्टर को पास किया गया है। (ध्यान दें, एक्सेस कंट्रोल शामिल करना पूरी तरह से एक प्राथमिकता है। यदि आप चाहते हैं कि कोई भी आपके स्मार्ट अनुबंध का उपयोग करके NFT मिंट कर सके, तो अनुबंध परिभाषा और कंस्ट्रक्टर से `Ownable` और `Ownable(initialOwner)` को हटा दें, और `mintNFT` फ़ंक्शन से `onlyOwner` को हटा दें।)

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol ERC-721 का विस्तार करता है ताकि प्रत्येक टोकन अपना स्वयं का मेटाडेटा URI संग्रहीत कर सके, जिसे हम मिंटिंग करते समय सेट करते हैं।

हमारे आयात कथनों के बाद, हमारे पास अपना कस्टम NFT स्मार्ट अनुबंध है, जो आश्चर्यजनक रूप से छोटा है — इसमें केवल एक काउंटर, एक कंस्ट्रक्टर और एक फ़ंक्शन है! यह हमारे इनहेरिट किए गए ओपनजेपेलिन अनुबंधों के कारण है, जो एक NFT बनाने के लिए आवश्यक अधिकांश तरीकों को लागू करते हैं, जैसे कि `ownerOf` जो NFT का मालिक लौटाता है, और `transferFrom`, जो NFT का स्वामित्व एक खाते से दूसरे खाते में स्थानांतरित करता है।

काउंटर, `_nextTokenId`, मिंट किए गए NFT की कुल संख्या का ट्रैक रखता है और हमारे नए NFT पर अद्वितीय ID सेट करता है। (स्मार्ट अनुबंध का उपयोग करके मिंट किए गए प्रत्येक NFT को एक अद्वितीय ID असाइन किया जाना चाहिए—यहां हमारी अद्वितीय ID केवल अस्तित्व में मौजूद NFT की कुल संख्या द्वारा निर्धारित की जाती है। `++_nextTokenId` उपयोग किए जाने से पहले काउंटर को बढ़ाता है, इसलिए हमारे स्मार्ट अनुबंध के साथ मिंट किए गए पहले NFT की ID "1" है, हमारे दूसरे NFT की ID "2" है, आदि।)

हमारे ERC-721 कंस्ट्रक्टर में, आप देखेंगे कि हम 2 स्ट्रिंग, “MyNFT” और “NFT” पास करते हैं। पहला चर स्मार्ट अनुबंध का नाम है, और दूसरा इसका प्रतीक है। आप इनमें से प्रत्येक चर को जो चाहें नाम दे सकते हैं!

अंत में, हमारे पास हमारा फ़ंक्शन `mintNFT(address recipient, string memory tokenURI)` है जो हमें एक NFT मिंट करने की अनुमति देता है! आप देखेंगे कि यह फ़ंक्शन दो चर लेता है:

- `address recipient` उस पते को निर्दिष्ट करता है जो आपका ताज़ा मिंट किया गया NFT प्राप्त करेगा

- `string memory tokenURI` एक स्ट्रिंग है जिसे एक JSON दस्तावेज़ में हल होना चाहिए जो NFT के मेटाडेटा का वर्णन करता है। एक NFT का मेटाडेटा वास्तव में वह है जो इसे जीवंत बनाता है, जिससे इसमें कॉन्फ़िगर करने योग्य गुण हो सकते हैं, जैसे कि नाम, विवरण, छवि और अन्य विशेषताएं। इस ट्यूटोरियल के भाग 2 में, हम वर्णन करेंगे कि इस मेटाडेटा को कैसे कॉन्फ़िगर किया जाए।

`mintNFT` इनहेरिट की गई ERC-721 लाइब्रेरी से कुछ तरीकों को कॉल करता है, और अंततः एक संख्या लौटाता है जो ताज़ा मिंट किए गए NFT की ID का प्रतिनिधित्व करती है।

## चरण 11: मेटामास्क और Alchemy को अपने प्रोजेक्ट से कनेक्ट करें {#connect-metamask-and-alchemy}

अब जब हमने एक मेटामास्क वॉलेट, Alchemy खाता बना लिया है, और अपना स्मार्ट अनुबंध लिख लिया है, तो तीनों को जोड़ने का समय आ गया है।

आपके वर्चुअल वॉलेट से भेजे गए प्रत्येक लेन-देन के लिए आपकी अद्वितीय निजी कुंजी का उपयोग करके हस्ताक्षर की आवश्यकता होती है। हमारे प्रोग्राम को यह अनुमति प्रदान करने के लिए, हम अपनी निजी कुंजी (और Alchemy API कुंजी) को एक पर्यावरण (environment) फ़ाइल में सुरक्षित रूप से संग्रहीत कर सकते हैं।

लेन-देन भेजने के बारे में अधिक जानने के लिए, [लेन-देन दस्तावेज़](/developers/docs/transactions/) देखें।

हमारे प्रोजेक्ट की रूट डायरेक्टरी में एक `.env` फ़ाइल बनाएं, और इसमें अपनी मेटामास्क निजी कुंजी और HTTP Alchemy API URL जोड़ें।

- मेटामास्क से अपनी निजी कुंजी निर्यात करने के लिए [इन निर्देशों](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) का पालन करें

- HTTP Alchemy API URL प्राप्त करने के लिए नीचे देखें और इसे अपने क्लिपबोर्ड पर कॉपी करें

![अपना Alchemy API URL कॉपी करें](./copy-alchemy-api-url.mp4#842x480)

आपका `.env` अब इस तरह दिखना चाहिए:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

इन्हें वास्तव में हमारे कोड से जोड़ने के लिए, हम चरण 13 में अपनी hardhat.config.js फ़ाइल में इन चरों का संदर्भ देंगे। Node.js अपने आप `.env` फ़ाइलों को पढ़ सकता है, इसलिए स्थापित करने के लिए कोई अतिरिक्त पैकेज नहीं है।

<EnvWarningBanner />

## चरण 12: Ethers.js स्थापित करें {#install-ethers}

Ethers.js एक लाइब्रेरी है जो [मानक जेसन-आरपीसी (JSON-RPC) विधियों](/developers/docs/apis/json-rpc/) को अधिक उपयोगकर्ता के अनुकूल विधियों के साथ लपेटकर इथेरियम के साथ इंटरैक्ट करना और अनुरोध करना आसान बनाती है।

Hardhat अतिरिक्त टूलिंग और विस्तारित कार्यक्षमता के लिए [प्लगइन्स](https://hardhat.org/docs/plugins/official-plugins) को एकीकृत करना बहुत आसान बनाता है। हम अनुबंध तैनाती के लिए [Ethers प्लगइन](https://hardhat.org/docs/plugins/hardhat-ethers) का लाभ उठाएंगे ([Ethers.js](https://docs.ethers.org/v6/) में कुछ बहुत ही स्पष्ट अनुबंध तैनाती विधियां हैं)।

अपनी प्रोजेक्ट डायरेक्टरी में टाइप करें:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

हम अगले चरण में अपनी hardhat.config.js में प्लगइन भी जोड़ेंगे।

## चरण 13: hardhat.config.js अपडेट करें {#update-hardhat-config}

हमने अब तक कई निर्भरताएं और प्लगइन्स जोड़े हैं, अब हमें hardhat.config.js को अपडेट करने की आवश्यकता है ताकि हमारे प्रोजेक्ट को उन सभी के बारे में पता चल सके।

अपनी hardhat.config.js को इस तरह दिखने के लिए अपडेट करें:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// यदि यह मौजूद है, तो .env फ़ाइल से API_URL और PRIVATE_KEY को process.env में लोड करें
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` Hardhat को केवल आवश्यकता होने पर पर्यावरण चर से प्रत्येक मान पढ़ने के लिए कहता है, इसलिए `compile` जैसे कमांड मान सेट होने से पहले भी काम करते हैं। यदि आप अपनी निजी कुंजी को सादे टेक्स्ट फ़ाइल में नहीं रखना चाहते हैं, तो Hardhat [एन्क्रिप्टेड कीस्टोर से कॉन्फ़िगरेशन चर](https://hardhat.org/docs/guides/configuration-variables) भी पढ़ सकता है।

## चरण 14: अपना अनुबंध संकलित करें {#compile-contract}

यह सुनिश्चित करने के लिए कि अब तक सब कुछ काम कर रहा है, आइए अपने अनुबंध को संकलित करें। संकलन कार्य अंतर्निहित Hardhat कार्यों में से एक है।

कमांड लाइन से चलाएं:

```sh
npx hardhat compile
```

जब आप पहली बार संकलित करते हैं, तो Hardhat Solidity कंपाइलर डाउनलोड करता है। फिर आपको `Compiled 1 Solidity file with solc 0.8.34` जैसा कुछ दिखाई देना चाहिए। यदि नहीं, तो आप हमेशा [Alchemy डिस्कॉर्ड](https://discord.gg/gWuC7zB) में संदेश भेज सकते हैं।

## चरण 15: अपनी तैनाती स्क्रिप्ट लिखें {#write-deploy}

अब जब हमारा अनुबंध लिखा जा चुका है और हमारी कॉन्फ़िगरेशन फ़ाइल तैयार है, तो हमारी अनुबंध तैनाती स्क्रिप्ट लिखने का समय आ गया है।

`scripts/` फ़ोल्डर में जाएं और `deploy.js` नामक एक नई फ़ाइल बनाएं, जिसमें निम्नलिखित सामग्री जोड़ें:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// तैनाती शुरू करें, एक प्रॉमिस लौटाते हुए जो एक अनुबंध ऑब्जेक्ट में रिज़ॉल्व होता है
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

आइए देखें कि कोड की इनमें से प्रत्येक पंक्ति क्या करती है।

```js
const { ethers } = await network.create()
```

Hardhat 3 में, एक स्क्रिप्ट स्पष्ट रूप से नेटवर्क से कनेक्शन खोलती है। `network.create()` उस नेटवर्क से जुड़ता है जिसे आप स्क्रिप्ट चलाते समय `--network` विकल्प के साथ चुनते हैं, और `hardhat-ethers` प्लगइन उस कनेक्शन में एक `ethers` ऑब्जेक्ट जोड़ता है।

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` नेटवर्क के लिए कॉन्फ़िगर किए गए खाते लौटाता है। Sepolia पर, यह वह खाता है जिसकी निजी कुंजी आपने `.env` में रखी है। हम इसका पता कंस्ट्रक्टर को पास करते हैं ताकि आप अनुबंध के मालिक बन जाएं।

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

Ethers.js में एक ContractFactory एक एब्स्ट्रैक्शन है जिसका उपयोग नए स्मार्ट अनुबंधों को तैनात करने के लिए किया जाता है, इसलिए यहां MyNFT हमारे NFT अनुबंध के उदाहरणों के लिए एक फ़ैक्टरी है। hardhat-ethers प्लगइन का उपयोग करते समय ContractFactory और Contract उदाहरण डिफ़ॉल्ट रूप से पहले हस्ताक्षरकर्ता से जुड़े होते हैं।

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

ContractFactory पर deploy() कॉल करने से तैनाती शुरू हो जाएगी, और एक Promise वापस आ जाएगा जो एक Contract में हल हो जाता है। यह वह ऑब्जेक्ट है जिसमें हमारे प्रत्येक स्मार्ट अनुबंध फ़ंक्शन के लिए एक विधि है। जो तर्क आप deploy() को पास करते हैं वे अनुबंध के कंस्ट्रक्टर में जाते हैं, यहां `initialOwner` पता।

`waitForDeployment()` तब तक प्रतीक्षा करता है जब तक कि तैनाती लेन-देन एक ब्लॉक में शामिल नहीं हो जाता, और `getAddress()` नए अनुबंध का पता लौटाता है। अधिक जानकारी के लिए [Ethers.js अनुबंध दस्तावेज़](https://docs.ethers.org/v6/api/contract/) देखें।

## चरण 16: अपना अनुबंध तैनात करें {#deploy-contract}

हम अंततः अपना स्मार्ट अनुबंध तैनात करने के लिए तैयार हैं! अपनी प्रोजेक्ट डायरेक्टरी के रूट पर वापस जाएं, और कमांड लाइन में चलाएं:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

फिर आपको कुछ ऐसा दिखाई देना चाहिए:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

यदि हम [Sepolia Etherscan](https://sepolia.etherscan.io/) पर जाते हैं और अपने अनुबंध पते की खोज करते हैं तो हमें यह देखने में सक्षम होना चाहिए कि इसे सफलतापूर्वक तैनात किया गया है। यदि आप इसे तुरंत नहीं देख सकते हैं, तो कृपया थोड़ी देर प्रतीक्षा करें क्योंकि इसमें कुछ समय लग सकता है। लेन-देन कुछ इस तरह दिखेगा:

![Etherscan पर अपना लेन-देन पता देखें](./etherscan-sepoila-contract-creation.png)

From पता आपके मेटामास्क खाता पते से मेल खाना चाहिए और To पते में “Contract Creation” लिखा होगा। यदि हम लेन-देन पर क्लिक करते हैं, तो हम To फ़ील्ड में अपना अनुबंध पता देखेंगे:

![Etherscan पर अपना अनुबंध पता देखें](./etherscan-sepolia-tx-details.png)

वाह! आपने अभी-अभी अपना NFT स्मार्ट अनुबंध इथेरियम (टेस्टनेट) चेन पर तैनात किया है!

आंतरिक रूप से क्या हो रहा है, यह समझने के लिए, आप अपने [Alchemy डैशबोर्ड](https://dashboard.alchemy.com/) में अपने ऐप को प्राप्त अनुरोधों को देख सकते हैं।

वहां आपको कुछ जेसन-आरपीसी (JSON-RPC) कॉल दिखाई देंगे जो Hardhat/Ethers ने हमारे लिए आंतरिक रूप से किए थे जब हमने .deploy() फ़ंक्शन को कॉल किया था। यहां ध्यान देने योग्य दो महत्वपूर्ण कॉल [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction) हैं, जो वास्तव में हमारे स्मार्ट अनुबंध को Sepolia चेन पर लिखने का अनुरोध है, और [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) जो हैश दिए जाने पर हमारे लेन-देन के बारे में जानकारी पढ़ने का अनुरोध है (लेन-देन भेजते समय एक विशिष्ट पैटर्न)। लेन-देन भेजने के बारे में अधिक जानने के लिए, [लेन-देन दस्तावेज़](/developers/docs/transactions/) देखें।

इस ट्यूटोरियल के भाग 1 के लिए बस इतना ही। [भाग 2 में, हम वास्तव में एक NFT मिंट करके अपने स्मार्ट अनुबंध के साथ इंटरैक्ट करेंगे](/developers/tutorials/how-to-mint-an-nft/), और [भाग 3 में हम आपको दिखाएंगे कि अपने इथेरियम वॉलेट में अपना NFT कैसे देखें](/developers/tutorials/how-to-view-nft-in-metamask/)!
