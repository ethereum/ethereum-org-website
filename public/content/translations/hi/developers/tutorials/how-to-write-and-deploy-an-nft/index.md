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

NFTs द्वारा ब्लॉकचेन को जनता की नज़र में लाने के साथ, अब इथेरियम ब्लॉकचेन पर अपना खुद का NFT अनुबंध (ERC-721 टोकन) प्रकाशित करके इस उत्साह को खुद समझने का एक शानदार अवसर है!

Alchemy को NFT स्पेस में सबसे बड़े नामों को शक्ति प्रदान करने पर बेहद गर्व है, जिनमें Makersplace (हाल ही में Christie’s में $69 मिलियन में डिजिटल आर्टवर्क की बिक्री का रिकॉर्ड बनाया), Dapper Labs (NBA Top Shot और Crypto Kitties के निर्माता), ओपनसी (दुनिया का सबसे बड़ा NFT मार्केटप्लेस), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable और अन्य शामिल हैं।

इस ट्यूटोरियल में, हम [मेटामास्क](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) और [Alchemy](https://alchemy.com/signup/eth) का उपयोग करके Sepolia टेस्ट नेटवर्क पर एक ERC-721 स्मार्ट अनुबंध बनाने और तैनात करने के बारे में जानेंगे (अगर आप अभी तक इसका मतलब नहीं समझते हैं तो चिंता न करें — हम इसे समझाएंगे!)।

इस ट्यूटोरियल के भाग 2 में हम जानेंगे कि हम NFT मिंट करने के लिए अपने स्मार्ट अनुबंध का उपयोग कैसे कर सकते हैं, और भाग 3 में हम समझाएंगे कि मेटामास्क पर अपना NFT कैसे देखें।

और निश्चित रूप से, यदि आपके पास किसी भी बिंदु पर प्रश्न हैं, तो [Alchemy डिस्कॉर्ड](https://discord.gg/gWuC7zB) में संपर्क करने में संकोच न करें या [Alchemy के NFT API डॉक्स](https://www.alchemy.com/docs/reference/nft-api-quickstart) पर जाएं!

## चरण 1: इथेरियम नेटवर्क से जुड़ें {#connect-to-ethereum}

इथेरियम ब्लॉकचेन पर अनुरोध करने के कई तरीके हैं, लेकिन चीजों को आसान बनाने के लिए, हम [Alchemy](https://alchemy.com/signup/eth) पर एक मुफ्त खाते का उपयोग करेंगे, जो एक ब्लॉकचेन डेवलपर प्लेटफॉर्म और API है जो हमें अपने स्वयं के नोड चलाए बिना इथेरियम चेन के साथ संवाद करने की अनुमति देता है।

इस ट्यूटोरियल में, हम अपनी स्मार्ट अनुबंध तैनाती में आंतरिक रूप से क्या हो रहा है, यह समझने के लिए निगरानी और एनालिटिक्स के लिए Alchemy के डेवलपर टूल का भी लाभ उठाएंगे। यदि आपके पास पहले से Alchemy खाता नहीं है, तो आप [यहां](https://alchemy.com/signup/eth) मुफ्त में साइन अप कर सकते हैं।

## चरण 2: अपना ऐप (और API कुंजी) बनाएं {#make-api-key}

एक बार जब आप Alchemy खाता बना लेते हैं, तो आप एक ऐप बनाकर API कुंजी उत्पन्न कर सकते हैं। यह हमें Sepolia टेस्ट नेटवर्क पर अनुरोध करने की अनुमति देगा। यदि आप टेस्ट नेटवर्क के बारे में अधिक जानने के लिए उत्सुक हैं तो [इस गाइड](https://www.alchemy.com/docs/choosing-a-web3-network) को देखें।

1. नेव बार में "Apps" पर होवर करके और "Create App" पर क्लिक करके अपने Alchemy डैशबोर्ड में "Create App" पेज पर जाएं

![Create your app](./create-your-app.png)

2. अपने ऐप को नाम दें (हमने "My First NFT!" चुना है), एक संक्षिप्त विवरण दें, चेन के लिए "Ethereum" चुनें, और अपने नेटवर्क के लिए "Sepolia" चुनें। द मर्ज के बाद से अन्य टेस्टनेट को हटा दिया गया है।

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. "Create app" पर क्लिक करें और बस हो गया! आपका ऐप नीचे दी गई तालिका में दिखाई देना चाहिए।

## चरण 3: एक इथेरियम खाता (पता) बनाएं {#create-eth-address}

लेन-देन भेजने और प्राप्त करने के लिए हमें एक इथेरियम खाते की आवश्यकता है। इस ट्यूटोरियल के लिए, हम मेटामास्क का उपयोग करेंगे, जो ब्राउज़र में एक वर्चुअल वॉलेट है जिसका उपयोग आपके इथेरियम खाता पते को प्रबंधित करने के लिए किया जाता है। यदि आप इस बारे में अधिक समझना चाहते हैं कि इथेरियम पर लेन-देन कैसे काम करते हैं, तो एथेरियम फाउंडेशन के [इस पेज](/developers/docs/transactions/) को देखें।

आप [यहां](https://metamask.io/download) मुफ्त में मेटामास्क खाता डाउनलोड कर सकते हैं और बना सकते हैं। जब आप एक खाता बना रहे हों, या यदि आपके पास पहले से ही एक खाता है, तो सुनिश्चित करें कि ऊपर दाईं ओर "Sepolia Test Network" पर स्विच करें (ताकि हम असली पैसे से लेन-देन न कर रहे हों)।

![Set Sepolia as your network](./metamask-goerli.png)

## चरण 4: फॉसेट से ईथर जोड़ें {#step-4-add-ether-from-a-faucet}

टेस्ट नेटवर्क पर अपना स्मार्ट अनुबंध तैनात करने के लिए, हमें कुछ नकली ETH की आवश्यकता होगी। ETH प्राप्त करने के लिए आप Alchemy द्वारा होस्ट किए गए [Sepolia फॉसेट](https://sepoliafaucet.com/) पर जा सकते हैं, लॉग इन करें और अपना खाता पता दर्ज करें, "Send Me ETH" पर क्लिक करें। आपको जल्द ही अपने मेटामास्क खाते में ETH दिखाई देना चाहिए!

## चरण 5: अपना बैलेंस जांचें {#check-balance}

यह दोबारा जांचने के लिए कि हमारा बैलेंस वहां मौजूद है, आइए [Alchemy के सैंडबॉक्स टूल](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) का उपयोग करके एक [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) अनुरोध करें। यह हमारे वॉलेट में ETH की मात्रा लौटाएगा। अपना मेटामास्क खाता पता दर्ज करने और “Send Request” पर क्लिक करने के बाद, आपको इस तरह की प्रतिक्रिया दिखाई देनी चाहिए:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **नोट** यह परिणाम Wei में है, ETH में नहीं। Wei का उपयोग ईथर के सबसे छोटे मूल्यवर्ग के रूप में किया जाता है। Wei से ETH में रूपांतरण 1 eth = 10<sup>18</sup> wei है। इसलिए यदि हम 0xde0b6b3a7640000 को दशमलव में बदलते हैं तो हमें 1\*10<sup>18</sup> wei मिलता है, जो 1 ETH के बराबर है।

राहत की बात है! हमारा सारा नकली पैसा वहां मौजूद है।
## चरण 6: अपना प्रोजेक्ट इनिशियलाइज़ करें {#initialize-project}

सबसे पहले, हमें अपने प्रोजेक्ट के लिए एक फ़ोल्डर बनाना होगा। अपनी कमांड लाइन पर जाएं और टाइप करें:

    mkdir my-nft
    cd my-nft

अब जब हम अपने प्रोजेक्ट फ़ोल्डर के अंदर हैं, तो हम प्रोजेक्ट को इनिशियलाइज़ करने के लिए npm init का उपयोग करेंगे। यदि आपके पास पहले से npm स्थापित नहीं है, तो [Node.js स्थापना निर्देशों](https://nodejs.org/en/download/) का पालन करें (हमें इस ट्यूटोरियल के लिए Node.js और npm की आवश्यकता होगी)।

    npm init

इससे कोई खास फर्क नहीं पड़ता कि आप स्थापना से जुड़े सवालों के जवाब कैसे देते हैं; संदर्भ के लिए हमने इसे इस तरह किया है:

```json
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

package.json को स्वीकृति दें, और हम आगे बढ़ने के लिए तैयार हैं!
## चरण 7: [Hardhat](https://hardhat.org/getting-started/#overview) स्थापित करें {#install-hardhat}

Hardhat आपके इथेरियम सॉफ़्टवेयर को संकलित, तैनात, परीक्षण और डीबग करने के लिए एक विकास वातावरण है। यह लाइव चेन पर तैनात करने से पहले स्थानीय रूप से स्मार्ट अनुबंध और विकेंद्रीकृत एप्लिकेशन (dapp) बनाते समय डेवलपर्स की मदद करता है।

हमारे my-nft प्रोजेक्ट के अंदर चलाएं:

    npm install --save-dev hardhat

[स्थापना निर्देशों](https://hardhat.org/getting-started/#overview) पर अधिक जानकारी के लिए इस पेज को देखें।

## चरण 8: Hardhat प्रोजेक्ट बनाएं {#create-hardhat-project}

हमारे प्रोजेक्ट फ़ोल्डर के अंदर चलाएं:

    npx hardhat

फिर आपको एक स्वागत संदेश और यह चुनने का विकल्प दिखाई देना चाहिए कि आप क्या करना चाहते हैं। "create an empty hardhat.config.js" चुनें:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

यह हमारे लिए एक hardhat.config.js फ़ाइल उत्पन्न करेगा जहाँ हम अपने प्रोजेक्ट के लिए सभी सेटअप निर्दिष्ट करेंगे (चरण 13 पर)।

## चरण 9: प्रोजेक्ट फ़ोल्डर जोड़ें {#add-project-folders}

अपने प्रोजेक्ट को व्यवस्थित रखने के लिए, हम दो नए फ़ोल्डर बनाएंगे। अपनी कमांड लाइन में अपने प्रोजेक्ट की रूट डायरेक्टरी पर जाएं और टाइप करें:

    mkdir contracts
    mkdir scripts

- contracts/ वह जगह है जहाँ हम अपना NFT स्मार्ट अनुबंध कोड रखेंगे

- scripts/ वह जगह है जहाँ हम अपने स्मार्ट अनुबंध को तैनात करने और उसके साथ इंटरैक्ट करने के लिए स्क्रिप्ट रखेंगे

## चरण 10: अपना अनुबंध लिखें {#write-contract}

अब जब हमारा वातावरण सेट हो गया है, तो अधिक रोमांचक चीज़ों की ओर बढ़ते हैं: _अपना स्मार्ट अनुबंध कोड लिखना!_

अपने पसंदीदा संपादक (हमें [VSCode](https://code.visualstudio.com/) पसंद है) में my-nft प्रोजेक्ट खोलें। स्मार्ट अनुबंध Solidity नामक भाषा में लिखे जाते हैं जिसका उपयोग हम अपना MyNFT.sol स्मार्ट अनुबंध लिखने के लिए करेंगे।‌

1. `contracts` फ़ोल्डर में जाएं और MyNFT.sol नामक एक नई फ़ाइल बनाएं

2. नीचे हमारा NFT स्मार्ट अनुबंध कोड है, जिसे हमने [ओपनजेपेलिन](https://docs.openzeppelin.com/contracts/3.x/erc721) लाइब्रेरी के ERC-721 कार्यान्वयन पर आधारित किया है। नीचे दी गई सामग्री को अपनी MyNFT.sol फ़ाइल में कॉपी और पेस्ट करें।

   ```solidity
   //[https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721) पर आधारित अनुबंध
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. क्योंकि हम ओपनजेपेलिन अनुबंध लाइब्रेरी से क्लास इनहेरिट कर रहे हैं, इसलिए लाइब्रेरी को हमारे फ़ोल्डर में स्थापित करने के लिए अपनी कमांड लाइन में `npm install @openzeppelin/contracts^4.0.0` चलाएं।

तो, यह कोड वास्तव में _क्या_ करता है? आइए इसे लाइन-दर-लाइन समझते हैं।

अपने स्मार्ट अनुबंध के शीर्ष पर, हम तीन [ओपनजेपेलिन](https://openzeppelin.com/) स्मार्ट अनुबंध क्लास आयात करते हैं:

- @openzeppelin/contracts/token/ERC721/ERC721.sol में ERC-721 मानक का कार्यान्वयन शामिल है, जिसे हमारा NFT स्मार्ट अनुबंध इनहेरिट करेगा। (एक वैध NFT होने के लिए, आपके स्मार्ट अनुबंध को ERC-721 मानक के सभी तरीकों को लागू करना होगा।) इनहेरिट किए गए ERC-721 फ़ंक्शंस के बारे में अधिक जानने के लिए, इंटरफ़ेस परिभाषा [यहां](https://eips.ethereum.org/EIPS/eip-721) देखें।

- @openzeppelin/contracts/utils/Counters.sol ऐसे काउंटर प्रदान करता है जिन्हें केवल एक से बढ़ाया या घटाया जा सकता है। हमारा स्मार्ट अनुबंध मिंट किए गए NFTs की कुल संख्या पर नज़र रखने और हमारे नए NFT पर अद्वितीय ID सेट करने के लिए एक काउंटर का उपयोग करता है। (स्मार्ट अनुबंध का उपयोग करके मिंट किए गए प्रत्येक NFT को एक अद्वितीय ID असाइन किया जाना चाहिए—यहां हमारी अद्वितीय ID केवल अस्तित्व में मौजूद NFTs की कुल संख्या द्वारा निर्धारित की जाती है। उदाहरण के लिए, हमारे स्मार्ट अनुबंध के साथ मिंट किए गए पहले NFT की ID "1" है, हमारे दूसरे NFT की ID "2" है, आदि।)

- @openzeppelin/contracts/access/Ownable.sol हमारे स्मार्ट अनुबंध पर [एक्सेस कंट्रोल](https://docs.openzeppelin.com/contracts/3.x/access-control) सेट करता है, ताकि केवल स्मार्ट अनुबंध का मालिक (आप) ही NFTs मिंट कर सके। (ध्यान दें, एक्सेस कंट्रोल शामिल करना पूरी तरह से एक प्राथमिकता है। यदि आप चाहते हैं कि कोई भी आपके स्मार्ट अनुबंध का उपयोग करके NFT मिंट कर सके, तो लाइन 10 पर Ownable और लाइन 17 पर onlyOwner शब्द हटा दें।)

हमारे आयात कथनों के बाद, हमारे पास अपना कस्टम NFT स्मार्ट अनुबंध है, जो आश्चर्यजनक रूप से छोटा है — इसमें केवल एक काउंटर, एक कंस्ट्रक्टर और एक फ़ंक्शन है! यह हमारे इनहेरिट किए गए ओपनजेपेलिन अनुबंधों के कारण है, जो NFT बनाने के लिए आवश्यक अधिकांश तरीकों को लागू करते हैं, जैसे कि `ownerOf` जो NFT के मालिक को लौटाता है, और `transferFrom`, जो NFT के स्वामित्व को एक खाते से दूसरे खाते में स्थानांतरित करता है।

हमारे ERC-721 कंस्ट्रक्टर में, आप देखेंगे कि हम 2 स्ट्रिंग, "MyNFT" और "NFT" पास करते हैं। पहला वेरिएबल स्मार्ट अनुबंध का नाम है, और दूसरा इसका प्रतीक है। आप इनमें से प्रत्येक वेरिएबल को जो चाहें नाम दे सकते हैं!

अंत में, हमारे पास अपना फ़ंक्शन `mintNFT(address recipient, string memory tokenURI)` है जो हमें NFT मिंट करने की अनुमति देता है! आप देखेंगे कि यह फ़ंक्शन दो वेरिएबल लेता है:

- `address recipient` उस पते को निर्दिष्ट करता है जो आपका ताज़ा मिंट किया गया NFT प्राप्त करेगा

- `string memory tokenURI` एक स्ट्रिंग है जिसे एक JSON दस्तावेज़ में रिज़ॉल्व होना चाहिए जो NFT के मेटाडेटा का वर्णन करता है। एक NFT का मेटाडेटा वास्तव में वह है जो इसे जीवंत बनाता है, जिससे इसमें कॉन्फ़िगर करने योग्य गुण होते हैं, जैसे कि नाम, विवरण, छवि और अन्य विशेषताएँ। इस ट्यूटोरियल के भाग 2 में, हम वर्णन करेंगे कि इस मेटाडेटा को कैसे कॉन्फ़िगर किया जाए।

`mintNFT` इनहेरिट की गई ERC-721 लाइब्रेरी से कुछ तरीकों को कॉल करता है, और अंततः एक संख्या लौटाता है जो ताज़ा मिंट किए गए NFT की ID का प्रतिनिधित्व करती है।

## चरण 11: मेटामास्क और Alchemy को अपने प्रोजेक्ट से कनेक्ट करें {#connect-metamask-and-alchemy}

अब जब हमने एक मेटामास्क वॉलेट, Alchemy खाता बना लिया है, और अपना स्मार्ट अनुबंध लिख लिया है, तो इन तीनों को जोड़ने का समय आ गया है।

आपके वर्चुअल वॉलेट से भेजे गए प्रत्येक लेन-देन के लिए आपकी अद्वितीय निजी कुंजी का उपयोग करके एक हस्ताक्षर की आवश्यकता होती है। हमारे प्रोग्राम को यह अनुमति प्रदान करने के लिए, हम अपनी निजी कुंजी (और Alchemy API कुंजी) को एक पर्यावरण फ़ाइल में सुरक्षित रूप से संग्रहीत कर सकते हैं।

लेन-देन भेजने के बारे में अधिक जानने के लिए, Web3 का उपयोग करके लेन-देन भेजने पर [इस ट्यूटोरियल](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) को देखें।

सबसे पहले, अपनी प्रोजेक्ट डायरेक्टरी में dotenv पैकेज स्थापित करें:

    npm install dotenv --save

फिर, हमारे प्रोजेक्ट की रूट डायरेक्टरी में एक `.env` फ़ाइल बनाएं, और इसमें अपनी मेटामास्क निजी कुंजी और HTTP Alchemy API URL जोड़ें।

- मेटामास्क से अपनी निजी कुंजी निर्यात करने के लिए [इन निर्देशों](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) का पालन करें

- HTTP Alchemy API URL प्राप्त करने के लिए नीचे देखें और इसे अपने क्लिपबोर्ड पर कॉपी करें

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

आपका `.env` अब इस तरह दिखना चाहिए:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

वास्तव में इन्हें हमारे कोड से जोड़ने के लिए, हम चरण 13 में अपनी hardhat.config.js फ़ाइल में इन वेरिएबल्स का संदर्भ देंगे।

<EnvWarningBanner />

## चरण 12: Ethers.js स्थापित करें {#install-ethers}

Ethers.js एक लाइब्रेरी है जो [मानक जेसन-आरपीसी विधियों](/developers/docs/apis/json-rpc/) को अधिक उपयोगकर्ता के अनुकूल विधियों के साथ लपेटकर इथेरियम के साथ इंटरैक्ट करना और अनुरोध करना आसान बनाती है।

Hardhat अतिरिक्त टूलिंग और विस्तारित कार्यक्षमता के लिए [प्लगइन्स](https://hardhat.org/plugins/) को एकीकृत करना बहुत आसान बनाता है। हम अनुबंध तैनाती के लिए [Ethers प्लगइन](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) का लाभ उठाएंगे ([Ethers.js](https://github.com/ethers-io/ethers.js/) में कुछ बहुत ही स्पष्ट अनुबंध तैनाती विधियां हैं)।

अपनी प्रोजेक्ट डायरेक्टरी में टाइप करें:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

हमें अगले चरण में अपने hardhat.config.js में भी ethers की आवश्यकता होगी।

## चरण 13: hardhat.config.js अपडेट करें {#update-hardhat-config}

हमने अब तक कई निर्भरताएँ और प्लगइन्स जोड़े हैं, अब हमें hardhat.config.js को अपडेट करने की आवश्यकता है ताकि हमारे प्रोजेक्ट को उन सभी के बारे में पता चल सके।

अपने hardhat.config.js को इस तरह दिखने के लिए अपडेट करें:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "sepolia",
       networks: {
          hardhat: {},
          sepolia: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }
```

## चरण 14: अपना अनुबंध संकलित करें {#compile-contract}

यह सुनिश्चित करने के लिए कि अब तक सब कुछ काम कर रहा है, आइए अपने अनुबंध को संकलित करें। संकलन कार्य अंतर्निहित hardhat कार्यों में से एक है।

कमांड लाइन से चलाएं:

    npx hardhat compile

आपको स्रोत फ़ाइल में SPDX लाइसेंस पहचानकर्ता प्रदान नहीं किए जाने के बारे में एक चेतावनी मिल सकती है, लेकिन इसके बारे में चिंता करने की कोई आवश्यकता नहीं है — उम्मीद है कि बाकी सब कुछ अच्छा लग रहा है! यदि नहीं, तो आप हमेशा [Alchemy डिस्कॉर्ड](https://discord.gg/u72VCg3) में संदेश भेज सकते हैं।

## चरण 15: अपनी तैनाती स्क्रिप्ट लिखें {#write-deploy}

अब जब हमारा अनुबंध लिखा जा चुका है और हमारी कॉन्फ़िगरेशन फ़ाइल तैयार है, तो हमारी अनुबंध तैनाती स्क्रिप्ट लिखने का समय आ गया है।

`scripts/` फ़ोल्डर में जाएं और `deploy.js` नामक एक नई फ़ाइल बनाएं, जिसमें निम्नलिखित सामग्री जोड़ें:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // तैनाती शुरू करें, जो एक प्रॉमिस लौटाता है जो एक अनुबंध ऑब्जेक्ट में रिज़ॉल्व होता है
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat अपने [अनुबंध ट्यूटोरियल](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) में यह समझाने का एक अद्भुत काम करता है कि कोड की इनमें से प्रत्येक पंक्ति क्या करती है, हमने उनके स्पष्टीकरण को यहां अपनाया है।

    const MyNFT = await ethers.getContractFactory("MyNFT");

ethers.js में एक ContractFactory नए स्मार्ट अनुबंधों को तैनात करने के लिए उपयोग किया जाने वाला एक एब्स्ट्रैक्शन है, इसलिए MyNFT यहां हमारे NFT अनुबंध के उदाहरणों के लिए एक फ़ैक्टरी है। hardhat-ethers प्लगइन का उपयोग करते समय ContractFactory और Contract उदाहरण डिफ़ॉल्ट रूप से पहले हस्ताक्षरकर्ता से जुड़े होते हैं।

    const myNFT = await MyNFT.deploy();

ContractFactory पर deploy() को कॉल करने से तैनाती शुरू हो जाएगी, और एक Promise वापस आएगा जो एक Contract में रिज़ॉल्व होता है। यह वह ऑब्जेक्ट है जिसमें हमारे प्रत्येक स्मार्ट अनुबंध फ़ंक्शन के लिए एक विधि है।

## चरण 16: अपना अनुबंध तैनात करें {#deploy-contract}

हम अंततः अपना स्मार्ट अनुबंध तैनात करने के लिए तैयार हैं! अपनी प्रोजेक्ट डायरेक्टरी के रूट पर वापस जाएं, और कमांड लाइन में चलाएं:

    npx hardhat --network sepolia run scripts/deploy.js

फिर आपको कुछ ऐसा दिखाई देना चाहिए:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

यदि हम [Sepolia Etherscan](https://sepolia.etherscan.io/) पर जाते हैं और अपने अनुबंध पते की खोज करते हैं तो हमें यह देखने में सक्षम होना चाहिए कि इसे सफलतापूर्वक तैनात किया गया है। यदि आप इसे तुरंत नहीं देख सकते हैं, तो कृपया थोड़ी देर प्रतीक्षा करें क्योंकि इसमें कुछ समय लग सकता है। लेन-देन कुछ इस तरह दिखेगा:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

From पता आपके मेटामास्क खाता पते से मेल खाना चाहिए और To पते में "Contract Creation" लिखा होगा। यदि हम लेन-देन पर क्लिक करते हैं, तो हम To फ़ील्ड में अपना अनुबंध पता देखेंगे:

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

बहुत बढ़िया! आपने अभी-अभी अपना NFT स्मार्ट अनुबंध इथेरियम (टेस्टनेट) चेन पर तैनात किया है!

आंतरिक रूप से क्या हो रहा है, यह समझने के लिए, आइए अपने [Alchemy डैशबोर्ड](https://dashboard.alchemy.com/explorer) में एक्सप्लोरर टैब पर जाएं। यदि आपके पास कई Alchemy ऐप हैं तो ऐप द्वारा फ़िल्टर करना सुनिश्चित करें और "MyNFT" चुनें।

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

यहां आपको कुछ जेसन-आरपीसी कॉल दिखाई देंगे जो Hardhat/Ethers ने हमारे लिए आंतरिक रूप से किए थे जब हमने .deploy() फ़ंक्शन को कॉल किया था। यहां ध्यान देने योग्य दो महत्वपूर्ण कॉल [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction) हैं, जो वास्तव में हमारे स्मार्ट अनुबंध को Sepolia चेन पर लिखने का अनुरोध है, और [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) जो हैश दिए जाने पर हमारे लेन-देन के बारे में जानकारी पढ़ने का अनुरोध है (लेन-देन भेजते समय एक विशिष्ट पैटर्न)। लेन-देन भेजने के बारे में अधिक जानने के लिए, [Web3 का उपयोग करके लेन-देन भेजने](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) पर इस ट्यूटोरियल को देखें।

इस ट्यूटोरियल के भाग 1 के लिए बस इतना ही। [भाग 2 में, हम वास्तव में एक NFT मिंट करके अपने स्मार्ट अनुबंध के साथ इंटरैक्ट करेंगे](/developers/tutorials/how-to-mint-an-nft/), और [भाग 3 में हम आपको दिखाएंगे कि अपने इथेरियम वॉलेट में अपना NFT कैसे देखें](/developers/tutorials/how-to-view-nft-in-metamask/)!
