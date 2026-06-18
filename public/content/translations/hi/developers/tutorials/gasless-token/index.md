---
title: "अपने गैस-रहित उपयोगकर्ताओं को टोकन रखने और अनुबंधों को कॉल करने की अनुमति देना"
description: "खाता अमूर्तन (account abstraction) का उपयोग करके, हम ऐसे स्मार्ट अनुबंध वॉलेट बना सकते हैं जो किसी विशिष्ट EOA द्वारा भेजे गए या उस EOA द्वारा हस्ताक्षरित लेन-देन स्वीकार करते हैं। ये स्मार्ट अनुबंध फिर टोकन के मालिक हो सकते हैं, जो EOA के नियंत्रण में होते हैं।"
author: "ओरी पोमेरेंट्ज़"
tags:
  - गैस-रहित
  - ERC-20
  - खाता अमूर्तन
skill: intermediate
breadcrumb: "गैस-रहित टोकन"
lang: hi
published: 2026-04-01
---

## परिचय {#introduction}

एक [पिछले लेख](/developers/tutorials/gasless/) में EIP-712 हस्ताक्षरों का उपयोग करके आपके स्वयं के एप्लिकेशन में गैस-रहित एक्सेस का उपयोग करने पर चर्चा की गई थी, लेकिन यह आपके स्वयं के स्मार्ट अनुबंधों तक सीमित है। [खाता अमूर्तन](/roadmap/account-abstraction/) का उपयोग करके, हम ऐसे स्मार्ट अनुबंध वॉलेट बना सकते हैं जो दो प्रकार के लेन-देन स्वीकार करते हैं और उन्हें अनुरोधित गंतव्य तक रिले करते हैं:

- किसी विशिष्ट EOA द्वारा भेजे गए लेन-देन (जिसके लिए उस EOA के पास ETH होना आवश्यक है)
- कहीं से भी भेजे गए लेन-देन, लेकिन उसी EOA द्वारा हस्ताक्षरित।

इस तरह, हम किसी खाते को संपत्ति (टोकन, आदि) रखने और गैस वाले EOA के सभी कार्य करने के लिए एक गैस-रहित तरीका प्रदान कर सकते हैं।

### हम केवल अनुरोध को रिले क्यों नहीं कर सकते? {#why-no-tx-origin}

ERC-20 और संबंधित मानकों में, खाता स्वामी [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties) होता है, वह पता जिसने टोकन अनुबंध को कॉल किया था, जो जरूरी नहीं कि लेन-देन का प्रवर्तक (originator) हो, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties)। यह [सुरक्षा कारणों](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin) से आवश्यक है। इसका मतलब यह है कि यदि हम टोकन ट्रांसफर अनुरोधों को रिले करते हैं, तो वे उपयोगकर्ता द्वारा नियंत्रित पते के बजाय रिलेयर के पते से टोकन ट्रांसफर करने का प्रयास करेंगे।

एक समाधान है जो आपको [EIP-7702](https://eip7702.io/) के माध्यम से EOA पते का उपयोग करने देता है, लेकिन इसके लिए संभावित रूप से खतरनाक प्रत्यायोजन पर हस्ताक्षर करने की आवश्यकता होती है, इसलिए आप इसका उपयोग केवल उस स्मार्ट अनुबंध को प्रत्यायोजित करने के लिए कर सकते हैं जिसे वॉलेट प्रदाता स्वीकृति देता है। इस ट्यूटोरियल के लिए मैं उपयोगकर्ता के लिए प्रॉक्सी के रूप में एक स्मार्ट अनुबंध बनाने की बहुत सरल विधि पसंद करता हूँ।

## इसे कार्य करते हुए देखना {#in-action}

1. सुनिश्चित करें कि आपके पास [Node](https://nodejs.org/en/download) और [Foundry](https://www.getfoundry.sh/introduction/installation) दोनों हैं।

2. एप्लिकेशन को क्लोन करें और आवश्यक सॉफ़्टवेयर इंस्टॉल करें।

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. `SEPOLIA_PRIVATE_KEY` को ऐसे वॉलेट पर सेट करने के लिए `.env` को संपादित करें जिसके पास Sepolia पर ETH हो। यदि आपको Sepolia ETH की आवश्यकता है, तो इसे प्राप्त करने के लिए [फॉसेट का उपयोग करें](/developers/docs/networks/#sepolia)। आदर्श रूप से, यह निजी कुंजी आपके ब्राउज़र वॉलेट में मौजूद कुंजी से भिन्न होनी चाहिए।

4. सर्वर प्रारंभ करें।

   ```sh
   npm run dev
   ```

5. URL [`http://localhost:5173`](http://localhost:5173) पर एप्लिकेशन ब्राउज़ करें।

6. वॉलेट से कनेक्ट करने के लिए **Connect with Injected** पर क्लिक करें। वॉलेट में स्वीकृति दें, और यदि आवश्यक हो तो Sepolia में बदलाव को स्वीकृति दें।

7. नीचे स्क्रॉल करें और **Deploy UserProxy (slow process)** पर क्लिक करें।

8. आप देख सकते हैं कि उपयोगकर्ता प्रॉक्सी कब तैनात की जाती है क्योंकि **UserProxy access** के आगे एक पता होता है। यदि आपने 24 सेकंड (2 ब्लॉक) प्रतीक्षा की और यह अभी भी नहीं हुआ है, तो परिवर्तनों का पता लगाने में कोई समस्या हो सकती है।

   यदि ऐसा है, तो [Sepolia एक्सप्लोरर](https://eth-sepolia.blockscout.com/) पर जाएं और `npm run dev` पर सर्वर आउटपुट में दिखाई देने वाला तैनाती लेनदेन हैश दर्ज करें। इसका पता देखने के लिए बनाए गए अनुबंध पर क्लिक करें, फिर इसे कॉपी करें। पते को _Or enter existing proxy address_ फ़ील्ड में पेस्ट करें, फिर **Set proxy address** पर क्लिक करें।

9. टोकन प्राप्त करने के लिए ERC-20 अनुबंध के [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) फ़ंक्शन पर कॉल सबमिट करने के लिए **Request more tokens for proxy** पर क्लिक करें। वॉलेट में हस्ताक्षर की **पुष्टि करें (Confirm)**। बेशक, टोकन प्रॉक्सी के पते पर पहुंचते हैं, उपयोगकर्ता के नहीं।

10. नीचे स्क्रॉल करें और _Last transaction:_ के अंतर्गत लिंक पर क्लिक करें। यह आपको `faucet` लेन-देन दिखाने के लिए ब्राउज़र खोलेगा।

11. _amount to transfer_ में, एक और एक हजार के बीच की संख्या दर्ज करें। टोकन को अपने पते पर ट्रांसफर करने के लिए **Transfer** पर क्लिक करें। अनुरोध के लिए **पुष्टि करें (Confirm)** पर क्लिक करने से पहले, देखें कि जिस डेटा पर हस्ताक्षर किए जा रहे हैं वह अपारदर्शी (opaque) है। उपयोगकर्ताओं को यह समझने में कठिनाई होगी कि वे किस पर हस्ताक्षर कर रहे हैं। याद रखें कि हम [नीचे](#vulnerabilities) इस पर चर्चा करेंगे।

12. लेन-देन की पुष्टि होने के बाद, _your balance_ और _proxy balance_ दोनों में बदलाव देखने के लिए प्रतीक्षा करें। ध्यान दें कि इसमें भी कुछ समय लगेगा, क्योंकि Sepolia का ब्लॉक समय 12 सेकंड है।

## यह कैसे काम करता है {#how-work}

गैस-रहित अनुभव के लिए, हमें उपयोगकर्ता के लिए एक यूजर इंटरफेस, यूजर इंटरफेस से चेन तक संदेशों को रूट करने के लिए एक सर्वर, और उन्हें प्राप्त करने और सत्यापित करने के लिए एक स्मार्ट अनुबंध की आवश्यकता होती है।

### वॉलेट स्मार्ट अनुबंध {#wallet-smart-contract}

यह [स्मार्ट अनुबंध](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol) है। इसका उद्देश्य वह सब कुछ करना है जो वास्तविक स्वामी अनुरोध करता है, चाहे अनुरोध करने के लिए किसी भी चैनल का उपयोग किया गया हो, और बाकी सब कुछ अनदेखा करना है। ऐसा करने के लिए, इसके फ़ंक्शन कॉल करने के लिए एक लक्ष्य पता और इसे कॉल करने के लिए उपयोग किए जाने वाले डेटा को प्राप्त करते हैं।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

स्वामी की पहचान और संदेशों को दोहराए जाने से रोकने के लिए एक [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce)। क्योंकि नॉन्स एक `public` चर (variable) है, Solidity कंपाइलर एक व्यू फ़ंक्शन, [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0) भी बनाता है, जो ऑफचेन कोड को इसके मान को पढ़ने की अनुमति देता है।

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

[EIP-712 हस्ताक्षरों](https://eips.ethereum.org/EIPS/eip-712) को सत्यापित करने के लिए आवश्यक जानकारी।

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

एक `UserProxy` एक ही स्वामी के पते से जुड़ा होता है। यह आवश्यक है क्योंकि यह संपत्ति (ERC-20 टोकन, NFT, आदि) का मालिक हो सकता है। हम विभिन्न स्वामियों की संपत्तियों को आपस में मिलाना नहीं चाहते हैं।

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[डोमेन सेपरेटर](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)। इसकी गणना कंपाइल समय पर नहीं की जा सकती, क्योंकि यह चेन ID और अनुबंध पते पर निर्भर करता है। यह UserProxy के लिए किसी अन्य के लिए तैयार किए गए संदेश द्वारा मूर्ख बनना असंभव बना देता है।

```solidity
    event CallResult(address target, bytes returnData);
```

कॉल के परिणामों को लॉग करें।

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

इस फ़ंक्शन को सीधे स्वामी द्वारा कॉल किया जा सकता है। यदि कोई रिले उपलब्ध नहीं है, तो भी स्वामी सीधे ब्लॉकचेन पर संपत्तियों तक पहुंच सकता है (यदि उपयोगकर्ता के पास ETH है)।

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

यदि हमें स्वामी द्वारा _सीधे_ कॉल किया जाता है, तो प्रदान किए गए कॉल डेटा के साथ लक्ष्य को कॉल करें।

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

यह `UserProxy` का मुख्य फ़ंक्शन है। यह `target` और `data`, साथ ही एक हस्ताक्षर प्राप्त करता है।

```solidity
    external returns (bytes memory) {
        // EIP-712 डाइजेस्ट की गणना करें
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

डाइजेस्ट में नॉन्स भी शामिल है, लेकिन हमें इसे लेन-देन से प्राप्त करने की आवश्यकता नहीं है; हम पहले से ही सही मान जानते हैं। गलत नॉन्स वाले हस्ताक्षर को अस्वीकार कर दिया जाएगा।

```solidity

    // हस्ताक्षरकर्ता को पुनर्प्राप्त करें
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

यदि हस्ताक्षर अमान्य है, तो `ecrecover` आमतौर पर एक अलग पता लौटाएगा, और इसे स्वीकार नहीं किया जाएगा।

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

उस अनुबंध को कॉल करें जिसे उपयोगकर्ता ने हमें कॉल करने के लिए कहा था, और यदि सफल नहीं होता है तो रिवर्ट करें।

```solidity
    emit CallResult(target, returnData);

    nonce++; // रीप्ले को रोकने के लिए नॉन्स बढ़ाएं

    return returnData;
}
```

यदि सफल होता है, तो एक लॉग घटना (event) उत्सर्जित करें और नॉन्स को बढ़ाएं।

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

ये लगभग समान प्रकार हैं जो आपको अनुबंध से ETH को ट्रांसफर करने की भी अनुमति देते हैं।

### रिलेयर {#relayer}

रिलेयर एक [सर्वर घटक](/developers/tutorials/server-components/) है। यह JavaScript में लिखा गया है; आप स्रोत कोड [यहाँ](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js) देख सकते हैं।

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

हमें जिन लाइब्रेरी की आवश्यकता है। यह एक [Express](https://expressjs.com/) सर्वर है, जो यूजर इंटरफेस कोड को सर्व करने के लिए [Vite](https://vite.dev/) का उपयोग करता है। हम ब्लॉकचेन के साथ संचार करने के लिए [Viem](https://viem.sh/) का उपयोग करते हैं, और लेन-देन भेजने वाले पते के लिए निजी कुंजी पढ़ने के लिए [dotenv](https://www.dotenv.org/) का उपयोग करते हैं।

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

यह संकलित (compiled) `UserProxy` को पढ़ने का एक सरल तरीका है। हमें `UserProxy` को कॉल करने में सक्षम होने के लिए ABI की आवश्यकता है, और इसे उपयोगकर्ता के लिए तैनात करने में सक्षम होने के लिए संकलित कोड की आवश्यकता है।

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

`.env` फ़ाइल पढ़ें, पता निकालें, और इसे कंसोल पर प्रिंट करें।

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Viem क्लाइंट जो ब्लॉकचेन से बात करते हैं।

```js
const start = async () => {
  const app = express()
```

एक Express सर्वर चलाएँ।

```js
  app.use(express.json())
```

Express को अनुरोध बॉडी पढ़ने के लिए कहें, और यदि यह JSON है तो इसे पार्स करें।

```js
  app.post("/server/deploy", async (req, res) => {
```

यह वह कोड है जो प्रॉक्सी को तैनात करने के अनुरोधों को संभालता है। ध्यान दें कि हम यहाँ [सेवा से इनकार (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) हमलों के प्रति संवेदनशील हैं क्योंकि एक हमलावर हमें प्रॉक्सी तैनात करने के अनुरोधों के साथ तब तक स्पैम कर सकता है जब तक कि हमारा ETH समाप्त न हो जाए। एक उत्पादन प्रणाली (production system) पर, हम संभवतः यह अपेक्षा करेंगे कि प्रॉक्सी तैनात करने के अनुरोध पर हस्ताक्षर किए जाएं और हस्ताक्षरकर्ता एक मौजूदा ग्राहक हो।

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

अनुरोध से स्वामी का पता प्राप्त करें।

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[अनुबंध तैनात करें](https://viem.sh/docs/contract/deployContract#deploycontract) और [इसके तैनात होने तक प्रतीक्षा करें](https://viem.sh/docs/actions/public/waitForTransactionReceipt)।

```js
      res.json({ contractAddress: receipt.contractAddress })
```

यदि सब कुछ ठीक है, तो यूजर इंटरफेस पर प्रॉक्सी पता लौटाएं।

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

यदि कोई समस्या है, तो इसकी रिपोर्ट करें।

```js
  app.post("/server/message", async (req, res) => {
```

यह वह कोड है जो `UserProxy` अनुबंध के लिए उपयोगकर्ता संदेशों को संसाधित करता है। यह सेवा से इनकार (denial-of-service) हमले के प्रति संवेदनशील एक और बिंदु है।

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

अनुरोध डेटा प्राप्त करें और प्रॉक्सी पर `signedAccess` को कॉल करने के लिए इसका उपयोग करें।

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

लेनदेन हैश वापस रिपोर्ट करें। यह UI को उपयोगकर्ता के लिए लेन-देन की जांच करने के लिए एक URL प्रदर्शित करने देता है।

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

फिर से, यदि कोई समस्या है, तो इसकी रिपोर्ट करें।

```js
  // बाकी सब कुछ Vite को संभालने दें
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

बाकी सभी चीज़ों के लिए, Vite का उपयोग करें, जो हमारे लिए यूजर इंटरफेस सर्व करने का काम संभालता है।

### यूजर इंटरफेस {#user-interface}

[यह यूजर इंटरफेस कोड है](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src)। अधिकांश कोड [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) के अपवाद के साथ, [इस लेख](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through) में प्रलेखित कोड के लगभग समान है।

[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) के कुछ हिस्से [इस लेख](/developers/tutorials/gasless/#ui-changes) में [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) के समान हैं। यहाँ नए भाग दिए गए हैं।

```js
import {
   encodeFunctionData
       } from 'viem'
```

[यह फ़ंक्शन](https://viem.sh/docs/contract/encodeFunctionData) EVM फ़ंक्शन कॉल के लिए कॉल डेटा बनाता है। यह आवश्यक है ताकि उपयोगकर्ता कॉल डेटा पर हस्ताक्षर कर सके।

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`, जिसे ऊपर समझाया गया है।

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[यह अनुबंध](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) ज्यादातर एक सामान्य ERC-20 अनुबंध है, जिसमें एक महत्वपूर्ण फ़ंक्शन, `faucet()` जोड़ा गया है। यह फ़ंक्शन परीक्षण उद्देश्यों के लिए उन्हें मांगने वाले किसी भी व्यक्ति को टोकन प्रदान करता है।

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

`FaucetToken` के लिए पता।

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

यह घटक ब्लॉक एक्सप्लोरर पर अनुबंध के लिंक के साथ एक पता आउटपुट करता है।

```js
const Token = () => {
    ...
```

यह मुख्य घटक है जो अधिकांश कार्य करता है।

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

उपयोगकर्ता पते का टोकन बैलेंस।

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

उपयोगकर्ता के स्वामित्व वाली प्रॉक्सी का पता।

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

प्रॉक्सी का टोकन बैलेंस।

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

इस फ़ील्ड का उपयोग तब किया जाता है जब उपयोगकर्ता मैन्युअल रूप से प्रॉक्सी पता सेट करता है। प्रॉक्सी पते को मैन्युअल रूप से सेट करने की क्षमता होने से उपयोगकर्ता हर बार एक नया तैनात करने (और पुरानी प्रॉक्सी के स्वामित्व वाले सभी टोकन खोने) के बजाय मौजूदा प्रॉक्सी का उपयोग कर सकता है।

```js
  const [ txHash, setTxHash ] = useState(null)
```

अंतिम लेन-देन का हैश, जिसका उपयोग एक्सप्लोरर को एक लिंक दिखाने के लिए किया जाता है ताकि उपयोगकर्ता उस लेन-देन की जांच कर सके।

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

इन सभी फ़ील्ड का उपयोग ERC-20 अनुबंध में टोकन ट्रांसफर कमांड भेजने के लिए किया जाता है। यह `FaucetToken` हो सकता है, लेकिन ऐसा होना आवश्यक नहीं है। [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) फ़ंक्शन ERC-20 मानक का हिस्सा है।

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

उन दो टोकन बैलेंस को पढ़ें जिनमें हमारी रुचि है, उपयोगकर्ता के पास कितना है, और प्रॉक्सी के पास कितना है।

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

रीप्ले हमलों (उदाहरण के लिए, एक विक्रेता जो उन्हें पैसे देने वाले लेन-देन को फिर से चलाता है) को रोकने के लिए, हम एक [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) का उपयोग करते हैं। हमें उस डेटा में जोड़ने के लिए वर्तमान मान जानने की आवश्यकता है जिस पर हम हस्ताक्षर करते हैं।

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

ब्लॉकचेन से पढ़ी गई जानकारी बदलने पर उपयोगकर्ता को प्रदर्शित बैलेंस को अपडेट करने के लिए [`useEffect`](https://react.dev/reference/react/useEffect) का उपयोग करें।

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

डिफ़ॉल्ट रूप से `FaucetToken` टोकन को उपयोगकर्ता के स्वयं के खाते में ट्रांसफर करना है। यहाँ हम इन मानों को तब सेट करते हैं जब हम उन्हें Viem से प्राप्त करते हैं।

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

टेक्स्ट फ़ील्ड बदलने पर इवेंट हैंडलर।

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

सर्वर को इस उपयोगकर्ता के लिए एक प्रॉक्सी तैनात करने के लिए कहें।

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

ऑनचेन `UserProxy` को भेजने के लिए सर्वर को भेजने से पहले एक संदेश पर हस्ताक्षर करें। इसे [यहाँ](/developers/tutorials/gasless/#ui-changes) समझाया गया है। हमें लक्ष्य पते (उस टोकन का पता जिसे हम कॉल कर रहे हैं) और भेजे जाने वाले कॉल डेटा दोनों के साथ एक संदेश पर हस्ताक्षर करने की आवश्यकता है।

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

`UserProxy` को एक हस्ताक्षरित संदेश भेजें, जो हस्ताक्षर को सत्यापित करेगा और फिर इसे `target` को भेजेगा।

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // दोनों पते
          data,           // लक्ष्य को भेजने के लिए कॉल डेटा
          v, r, s         // हस्ताक्षर
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

सर्वर को एक अनुरोध भेजें, और जब आपको प्रतिक्रिया मिले, तो लेनदेन हैश प्राप्त करें।

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

`faucet` फ़ंक्शन को कॉल करने का अनुकरण (simulate) करें। हम फॉसेट बटन को तभी सक्षम करते हैं जब यह सफल होता है।

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

सर्वर और `UserProxy` के माध्यम से किसी फ़ंक्शन को कॉल करने के लिए, हम तीन चरणों का पालन करते हैं:

1. [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData) का उपयोग करके हस्ताक्षर करने और भेजने के लिए कॉल डेटा बनाएं।

2. संदेश (लक्ष्य पता, कॉल डेटा और नॉन्स) पर हस्ताक्षर करें।

3. सर्वर को संदेश भेजें।

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

घटक का यह भाग आपको सीधे ब्राउज़र से `FaucetToken` का उपयोग करने देता है। इसका मुख्य उद्देश्य डिबगिंग को सुविधाजनक बनाना है।

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

उपयोगकर्ता को एक नया `UserProxy` तैनात करने दें।

```js
         <br /><br />
         <input type="text" placeholder="या मौजूदा प्रॉक्सी पता दर्ज करें" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

उपयोगकर्ताओं को **Set proxy address** पर तभी क्लिक करने दें जब वे एक वैध पता दर्ज करें। ध्यान दें कि यह सुनिश्चित नहीं करता है कि विचाराधीन पता वास्तव में एक `UserProxy` अनुबंध है। ऐसी जांच जोड़ना संभव है, लेकिन यह बहुत धीमा होगा (खराब उपयोगकर्ता अनुभव) और सुरक्षा में सुधार नहीं करेगा (हमलावर हमेशा यूजर इंटरफेस के लिए अपने स्वयं के कोड का उपयोग कर सकते हैं)।

```js
         <br /><br />
         { proxyAddr && (
```

बाकी _केवल_ तभी दिखाएं जब कोई वैध प्रॉक्सी पता हो।

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

उपयोगकर्ता को नॉन्स जानने की आवश्यकता नहीं है; यह केवल डिबगिंग उद्देश्यों के लिए है।

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

हम प्रॉक्सी के माध्यम से `faucet()` पर कॉल का अनुकरण नहीं कर सकते। हालाँकि, हम कम से कम यह सुनिश्चित कर सकते हैं कि हमारे पास एक प्रॉक्सी है और प्रॉक्सी ने हमें एक नॉन्स की सूचना दी है।

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

उपयोगकर्ता को ERC-20 ट्रांसफर लेन-देन जारी करने दें।

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

यदि कोई अंतिम लेनदेन हैश है, तो एक लिंक दिखाएं ताकि उपयोगकर्ता इसे ब्लॉक एक्सप्लोरर में देख सके।

```js
 
</div>
    </>
  )
}

export {Token}
```

यह सिर्फ React बॉयलरप्लेट है।

## कमजोरियां {#vulnerabilities}

हमारा सर्वर सेवा से इनकार (denial-of-service) हमलों के प्रति संवेदनशील है। इस हमले को [श्रृंखला के पिछले लेख में](/developers/tutorials/gasless/#dos-on-server) समझाया गया है।

इसके अतिरिक्त, हम खराब उपयोगकर्ता व्यवहार को प्रोत्साहित कर रहे हैं। हम उपयोगकर्ता से इस पर हस्ताक्षर करने के लिए कहते हैं:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_हम_ जानते हैं कि यह उस टोकन, राशि और गंतव्य पते के लिए एक वैध ERC-20 ट्रांसफर है जिसे उपयोगकर्ता ट्रांसफर करना चाहता है। लेकिन अधिकांश उपयोगकर्ता यह नहीं जानते कि कॉल डेटा की व्याख्या कैसे की जाए, और उन्हें इस बात का कोई अंदाज़ा नहीं है कि वे किस पर हस्ताक्षर कर रहे हैं। यह खराब डिज़ाइन है, दो कारणों से:

- कुछ उपयोगकर्ता हमारा उपयोग नहीं करेंगे क्योंकि वे उस डेटा पर भरोसा नहीं करते हैं जिस पर हम उन्हें हस्ताक्षर करने के लिए कहते हैं।
- अन्य उपयोगकर्ता हम पर भरोसा _करेंगे_ और सीखेंगे कि उन्हें यह समझे बिना कि यह क्या है, बस कॉल डेटा पर हस्ताक्षर कर देना चाहिए। इसका मतलब यह है कि यदि एडम अटैकर (Adam Attacker) उन्हें अपनी वेबसाइट पर रीडायरेक्ट करने का प्रबंधन करता है, तो वह उनसे एक ऐसे लेन-देन पर हस्ताक्षर करवा सकता है जो उसे उपयोगकर्ता के स्वामित्व वाले सभी USDC (या DAI, या कोई अन्य ERC-20) प्रदान करता है।

इसका समाधान यह है कि आमतौर पर उपयोग किए जाने वाले फ़ंक्शन, जैसे कि ट्रांसफर, के लिए `UserProxy` में अलग-अलग फ़ंक्शन हों। तब उपयोगकर्ता किसी ऐसी चीज़ पर हस्ताक्षर कर सकते हैं जिसे वे समझते हैं।

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**नोट:** हालाँकि उपयोगकर्ता अपनी इच्छानुसार किसी भी वॉलेट का उपयोग कर सकते हैं, यह अत्यधिक अनुशंसित है कि EIP-712 का उपयोग करने वाले एप्लिकेशन उन्हें ऐसे वॉलेट का उपयोग करने के लिए प्रोत्साहित करें जो [संपूर्ण हस्ताक्षर डेटा दिखाता है](https://rabby.io/)। कुछ वॉलेट पते को छोटा (truncate) कर देते हैं, जो असुरक्षित है। एक हमलावर ऐसा पता बना सकता है जिसके शुरुआत और अंत के अक्षर समान हों, लेकिन बीच में भिन्न हों।

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## निष्कर्ष {#conclusion}

उपरोक्त कमजोरियों के अलावा, इस ट्यूटोरियल के समाधान में कई कमियां हैं जिन्हें दूर करने में इथेरियम हमारी मदद कर सकता है।

- _सेंसरशिप प्रतिरोध (Censorship resistance)_। वर्तमान में, उपयोगकर्ता आपके सर्वर, किसी अन्य द्वारा स्थापित प्रतिस्पर्धी सर्वर का उपयोग कर सकते हैं, या सीधे इथेरियम से जुड़ सकते हैं, जिसमें गैस की लागत आती है। [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) का उपयोग करने से उपयोगकर्ता अपने लेन-देन को सर्वरों के एक बड़े पूल में पेश कर सकते हैं, जिससे उनके लेन-देन के सेंसर होने की संभावना कम हो जाती है।
- _EOA के स्वामित्व वाली संपत्तियां_। जैसा कि ऊपर उल्लेख किया गया है, [EIP-7702](https://eip7702.io/) का उपयोग EOA पते के स्वामित्व वाली संपत्तियों को प्रबंधित करने के लिए किया जा सकता है। इसमें कठिनाइयाँ हैं, लेकिन कभी-कभी यह आवश्यक होता है।

मुझे निकट भविष्य में इन सुविधाओं को जोड़ने के बारे में ट्यूटोरियल प्रकाशित करने की उम्मीद है।

[मेरे और अधिक काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।