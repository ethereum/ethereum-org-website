---
title: "तुमच्या गॅस-मुक्त वापरकर्त्यांना टोकन्स बाळगण्याची आणि कॉन्ट्रॅक्ट्स कॉल करण्याची अनुमती देणे"
description: "खाते अमूर्तीकरण वापरून, आपण असे स्मार्ट कॉन्ट्रॅक्ट वॉलेट्स तयार करू शकतो जे विशिष्ट EOA द्वारे पाठवलेले किंवा त्या EOA द्वारे स्वाक्षरी केलेले व्यवहार स्वीकारतात. हे स्मार्ट कॉन्ट्रॅक्ट्स नंतर टोकन्स बाळगू शकतात, जे EOA च्या नियंत्रणाखाली असतात."
author: ओरी पोमेरँट्झ
tags: ["गॅस-मुक्त", "ERC-20", "खाते अमूर्तीकरण"]
skill: intermediate
breadcrumb: गॅस-मुक्त टोकन
lang: mr
published: 2026-04-01
---

## परिचय {#introduction}

[मागील लेखात](/developers/tutorials/gasless/) EIP-712 स्वाक्षऱ्या वापरून तुमच्या स्वतःच्या ॲप्लिकेशनमध्ये गॅस-मुक्त प्रवेश वापरण्यावर चर्चा केली होती, परंतु ते केवळ तुमच्या स्वतःच्या स्मार्ट कॉन्ट्रॅक्ट्सपुरते मर्यादित आहे. [खाते अमूर्तीकरण](/roadmap/account-abstraction/) वापरून, आपण असे स्मार्ट कॉन्ट्रॅक्ट वॉलेट्स तयार करू शकतो जे दोन प्रकारचे व्यवहार स्वीकारतात आणि त्यांना विनंती केलेल्या गंतव्यस्थानावर पाठवतात:

- विशिष्ट EOA द्वारे पाठवलेले व्यवहार (ज्यासाठी त्या EOA कडे ETH असणे आवश्यक आहे)
- कुठूनही पाठवलेले, परंतु त्याच EOA द्वारे स्वाक्षरी केलेले व्यवहार.

अशा प्रकारे, आपण एखाद्या खात्याला मालमत्ता (टोकन्स इ.) बाळगण्यासाठी आणि गॅस असलेल्या EOA प्रमाणे सर्व कार्ये करण्यासाठी गॅस-मुक्त मार्ग प्रदान करू शकतो.

### आपण फक्त विनंती का पाठवू शकत नाही? {#why-no-tx-origin}

ERC-20 आणि संबंधित मानकांमध्ये, खाते मालक [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties) असतो, जो टोकन कॉन्ट्रॅक्टला कॉल करणारा पत्ता असतो, जो नेहमीच व्यवहाराचा मूळ प्रेषक, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties) नसतो. हे [सुरक्षा कारणांसाठी](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin) आवश्यक आहे. याचा अर्थ असा की जर आपण टोकन हस्तांतरण विनंत्या रिले केल्या, तर ते वापरकर्त्याद्वारे नियंत्रित पत्त्याऐवजी रिलेअरच्या पत्त्यावरून टोकन्स हस्तांतरित करण्याचा प्रयत्न करतील.

यावर एक उपाय आहे जो तुम्हाला [EIP-7702](https://eip7702.io/) द्वारे EOA पत्ता वापरू देतो, परंतु यासाठी संभाव्य धोकादायक अधिकारप्रदानावर स्वाक्षरी करणे आवश्यक आहे, त्यामुळे तुम्ही याचा वापर फक्त अशा स्मार्ट कॉन्ट्रॅक्टला अधिकार प्रदान करण्यासाठी करू शकता ज्याला वॉलेट प्रदाता मंजूर करतो. या ट्युटोरिअलसाठी मी वापरकर्त्याचा प्रॉक्सी म्हणून स्मार्ट कॉन्ट्रॅक्ट तयार करण्याच्या अधिक सोप्या पद्धतीला प्राधान्य देतो.

## हे प्रत्यक्षात पाहणे {#in-action}

1. तुमच्याकडे [Node](https://nodejs.org/en/download) आणि [Foundry](https://www.getfoundry.sh/introduction/installation) दोन्ही असल्याची खात्री करा.

2. ॲप्लिकेशन क्लोन करा आणि आवश्यक सॉफ्टवेअर इन्स्टॉल करा.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Sepolia वर ETH असलेल्या वॉलेटवर `SEPOLIA_PRIVATE_KEY` सेट करण्यासाठी `.env` संपादित करा. जर तुम्हाला Sepolia ETH ची आवश्यकता असेल, तर ते मिळवण्यासाठी [फॉसेट वापरा](/developers/docs/networks/#sepolia). आदर्शपणे, ही खाजगी की तुमच्या ब्राउझर वॉलेटमध्ये असलेल्या की पेक्षा वेगळी असावी.

4. सर्व्हर सुरू करा.

   ```sh
   npm run dev
   ```

5. [`http://localhost:5173`](http://localhost:5173) या URL वर ॲप्लिकेशन ब्राउझ करा.

6. वॉलेटशी कनेक्ट करण्यासाठी **Connect with Injected** वर क्लिक करा. वॉलेटमध्ये मंजूर करा आणि आवश्यक असल्यास Sepolia मधील बदल मंजूर करा.

7. खाली स्क्रोल करा आणि **Deploy UserProxy (slow process)** वर क्लिक करा.

8. जेव्हा वापरकर्ता प्रॉक्सी प्रस्थापित केला जातो तेव्हा तुम्ही पाहू शकता कारण **UserProxy access** च्या पुढे एक पत्ता असतो. जर तुम्ही 24 सेकंद (2 ब्लॉक्स) वाट पाहिली आणि तरीही ते झाले नाही, तर बदल शोधण्यात काही समस्या असू शकते.

   जर असे असेल, तर [Sepolia Explorer](https://eth-sepolia.blockscout.com/) वर जा आणि `npm run dev` वरील सर्व्हर आउटपुटमध्ये दिसणारा प्रस्थापना व्यवहार हॅश प्रविष्ट करा. तयार केलेल्या कॉन्ट्रॅक्टचा पत्ता पाहण्यासाठी त्यावर क्लिक करा, नंतर तो कॉपी करा. _Or enter existing proxy address_ फील्डमध्ये पत्ता पेस्ट करा, नंतर **Set proxy address** वर क्लिक करा.

9. टोकन्स मिळवण्यासाठी ERC-20 कॉन्ट्रॅक्टच्या [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) फंक्शनला कॉल सबमिट करण्यासाठी **Request more tokens for proxy** वर क्लिक करा. वॉलेटमध्ये स्वाक्षरी **Confirm** करा. अर्थात, टोकन्स वापरकर्त्याच्या नाही तर प्रॉक्सीच्या पत्त्यावर पोहोचतात.

10. खाली स्क्रोल करा आणि _Last transaction:_ खालील लिंकवर क्लिक करा. हे तुम्हाला `faucet` व्यवहार दाखवण्यासाठी ब्राउझर उघडेल.

11. _amount to transfer_ मध्ये, एक ते एक हजार दरम्यानची संख्या प्रविष्ट करा. तुमच्या स्वतःच्या पत्त्यावर टोकन्स हस्तांतरित करण्यासाठी **Transfer** वर क्लिक करा. विनंतीसाठी **Confirm** वर क्लिक करण्यापूर्वी, स्वाक्षरी केला जाणारा डेटा अपारदर्शक आहे हे पहा. वापरकर्त्यांना ते कशावर स्वाक्षरी करत आहेत हे समजणे कठीण जाईल. लक्षात ठेवा की आपण यावर [खाली](#vulnerabilities) चर्चा करू.

12. व्यवहार निश्चित झाल्यानंतर, _your balance_ आणि _proxy balance_ दोन्हीमधील बदल पाहण्यासाठी प्रतीक्षा करा. लक्षात घ्या की यास देखील थोडा वेळ लागेल, कारण Sepolia ची ब्लॉक वेळ 12 सेकंद आहे.

## हे कसे कार्य करते {#how-work}

गॅस-मुक्त अनुभवासाठी, आपल्याला वापरकर्त्यासाठी एक युजर इंटरफेस, युजर इंटरफेसमधून चेनवर संदेश पाठवण्यासाठी एक सर्व्हर आणि ते प्राप्त करण्यासाठी आणि सत्यापित करण्यासाठी एक स्मार्ट कॉन्ट्रॅक्ट आवश्यक आहे.

### वॉलेट स्मार्ट कॉन्ट्रॅक्ट {#wallet-smart-contract}

हे [स्मार्ट कॉन्ट्रॅक्ट](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol) आहे. याचा उद्देश खरा मालक जे काही विनंती करेल ते करणे हा आहे, विनंती करण्यासाठी वापरलेल्या चॅनेलची पर्वा न करता, आणि इतर सर्व गोष्टींकडे दुर्लक्ष करणे. हे करण्यासाठी, त्याच्या फंक्शन्सना कॉल करण्यासाठी एक लक्ष्य पत्ता आणि कॉल करण्यासाठी वापरला जाणारा डेटा प्राप्त होतो.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

मालकाची ओळख आणि संदेशांची पुनरावृत्ती टाळण्यासाठी एक [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce). नॉन्स हे `public` व्हेरिएबल असल्यामुळे, Solidity कंपायलर एक व्ह्यू फंक्शन, [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0) देखील तयार करतो, जे साखळीबाह्य कोडला त्याचे मूल्य वाचण्याची अनुमती देते.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

[EIP-712 स्वाक्षऱ्या](https://eips.ethereum.org/EIPS/eip-712) सत्यापित करण्यासाठी आवश्यक माहिती.

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

एक `UserProxy` एकाच मालकाच्या पत्त्याशी जोडलेला असतो. हे आवश्यक आहे कारण तो मालमत्ता (ERC-20 टोकन्स, NFTs इ.) बाळगू शकतो. आपल्याला वेगवेगळ्या मालकांच्या मालमत्ता एकमेकांत मिसळायच्या नाहीत.

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

[डोमेन सेपरेटर](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). हे कंपाइल वेळेत मोजले जाऊ शकत नाही, कारण ते चेन आयडी आणि कॉन्ट्रॅक्ट पत्त्यावर अवलंबून असते. यामुळे UserProxy ला दुसऱ्यासाठी तयार केलेल्या संदेशाद्वारे फसवणे अशक्य होते.

```solidity
    event CallResult(address target, bytes returnData);
```

कॉलच्या परिणामांची नोंद करा.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

हे फंक्शन मालकाद्वारे थेट कॉल केले जाऊ शकते. जर कोणतेही रिलेज उपलब्ध नसतील, तरीही मालक थेट ब्लॉकचेनवर मालमत्तेत प्रवेश करू शकतो (जर वापरकर्त्याकडे ETH असेल).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

जर आपल्याला मालकाद्वारे _थेट_ कॉल केले गेले, तर प्रदान केलेल्या कॉल डेटासह लक्ष्याला कॉल करा.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

हे `UserProxy` चे मुख्य फंक्शन आहे. याला `target` आणि `data`, तसेच एक स्वाक्षरी मिळते.

```solidity
    external returns (bytes memory) {
        // EIP-712 डायजेस्टची गणना करा
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

डायजेस्टमध्ये नॉन्सचा देखील समावेश असतो, परंतु आपल्याला तो व्यवहारातून प्राप्त करण्याची आवश्यकता नाही; आपल्याला आधीच योग्य मूल्य माहित आहे. चुकीच्या नॉन्ससह असलेली स्वाक्षरी नाकारली जाईल.

```solidity

    // स्वाक्षरीकर्ता पुनर्प्राप्त करा
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

जर स्वाक्षरी अवैध असेल, तर `ecrecover` सहसा वेगळा पत्ता परत करेल, आणि तो स्वीकारला जाणार नाही.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

वापरकर्त्याने आपल्याला ज्या कॉन्ट्रॅक्टला कॉल करण्यास सांगितले आहे त्याला कॉल करा, आणि यशस्वी न झाल्यास पूर्ववत करा.

```solidity
    emit CallResult(target, returnData);

    nonce++; // रिप्ले टाळण्यासाठी नॉन्स वाढवा

    return returnData;
}
```

यशस्वी झाल्यास, एक लॉग घटना उत्सर्जित करा आणि नॉन्स वाढवा.

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

हे जवळजवळ एकसारखे प्रकार आहेत जे तुम्हाला कॉन्ट्रॅक्टमधून ETH हस्तांतरित करण्याची देखील अनुमती देतात.

### रिलेअर {#relayer}

रिलेअर हा एक [सर्व्हर घटक](/developers/tutorials/server-components/) आहे. तो JavaScript मध्ये लिहिला आहे; तुम्ही सोर्स कोड [येथे](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js) पाहू शकता.

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

आपल्याला आवश्यक असलेल्या लायब्ररीज. हा एक [Express](https://expressjs.com/) सर्व्हर आहे, जो युजर इंटरफेस कोड सर्व्ह करण्यासाठी [Vite](https://vite.dev/) वापरतो. आपण ब्लॉकचेनशी संवाद साधण्यासाठी [Viem](https://viem.sh/) वापरतो, आणि व्यवहार पाठवणाऱ्या पत्त्यासाठी खाजगी की वाचण्यासाठी [dotenv](https://www.dotenv.org/) वापरतो.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

कंपाइल केलेले `UserProxy` वाचण्याचा हा एक सोपा मार्ग आहे. आपल्याला `UserProxy` ला कॉल करण्यासाठी ABI ची आवश्यकता आहे, आणि वापरकर्त्यासाठी ते प्रस्थापित करण्यासाठी कंपाइल केलेल्या कोडची आवश्यकता आहे.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

`.env` फाईल वाचा, पत्ता काढा आणि तो कन्सोलवर प्रिंट करा.

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

ब्लॉकचेनशी बोलणारे Viem क्लायंट्स.

```js
const start = async () => {
  const app = express()
```

Express सर्व्हर चालवा.

```js
  app.use(express.json())
```

Express ला विनंतीचा मुख्य भाग वाचण्यास सांगा, आणि जर तो JSON असेल तर तो पार्स करण्यास सांगा.

```js
  app.post("/server/deploy", async (req, res) => {
```

हा तो कोड आहे जो प्रॉक्सी प्रस्थापित करण्याच्या विनंत्या हाताळतो. लक्षात घ्या की आपण येथे [डिनायल-ऑफ-सर्व्हिस](https://en.wikipedia.org/wiki/Denial-of-service_attack) हल्ल्यांना बळी पडू शकतो कारण एखादा हल्लेखोर आपला ETH संपेपर्यंत प्रॉक्सी प्रस्थापित करण्याच्या विनंत्यांसह आपल्याला स्पॅम करू शकतो. उत्पादन प्रणालीवर, आपण कदाचित प्रॉक्सी प्रस्थापित करण्याच्या विनंतीवर स्वाक्षरी केलेली असणे आणि स्वाक्षरीकर्ता विद्यमान ग्राहक असणे आवश्यक करू.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

विनंतीवरून मालकाचा पत्ता मिळवा.

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

[कॉन्ट्रॅक्ट प्रस्थापित करा](https://viem.sh/docs/contract/deployContract#deploycontract) आणि [ते प्रस्थापित होईपर्यंत प्रतीक्षा करा](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

जर सर्व काही ठीक असेल, तर युजर इंटरफेसला प्रॉक्सी पत्ता परत करा.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

जर काही समस्या असेल, तर त्याची नोंद करा.

```js
  app.post("/server/message", async (req, res) => {
```

हा तो कोड आहे जो `UserProxy` कॉन्ट्रॅक्टसाठी वापरकर्ता संदेशांवर प्रक्रिया करतो. हा आणखी एक मुद्दा आहे जो डिनायल-ऑफ-सर्व्हिस हल्ल्यास बळी पडू शकतो.

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

विनंती डेटा मिळवा आणि प्रॉक्सीवर `signedAccess` ला कॉल करण्यासाठी त्याचा वापर करा.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

व्यवहार हॅश परत नोंदवा. हे UI ला वापरकर्त्याला व्यवहार तपासण्यासाठी URL प्रदर्शित करू देते.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

पुन्हा, जर काही समस्या असेल, तर त्याची नोंद करा.

```js
  // बाकी सर्व काही Vite ला हाताळू द्या
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

इतर सर्व गोष्टींसाठी, Vite वापरा, जे आपल्यासाठी युजर इंटरफेस सर्व्ह करण्याचे काम हाताळते.

### युजर इंटरफेस {#user-interface}

[हा युजर इंटरफेस कोड आहे](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) चा अपवाद वगळता, बहुतेक कोड [या लेखात](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through) दस्तऐवजीकरण केलेल्या कोडसारखाच आहे.

[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) चे काही भाग [या लेखातील](/developers/tutorials/gasless/#ui-changes) [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) सारखेच आहेत. येथे नवीन भाग आहेत.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[हे फंक्शन](https://viem.sh/docs/contract/encodeFunctionData) EVM फंक्शन कॉलसाठी कॉल डेटा तयार करते. हे आवश्यक आहे जेणेकरून वापरकर्ता कॉल डेटावर स्वाक्षरी करू शकेल.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`, वर स्पष्ट केले आहे.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[हे कॉन्ट्रॅक्ट](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) बहुतांशी एक सामान्य ERC-20 कॉन्ट्रॅक्ट आहे, ज्यामध्ये `faucet()` या एका महत्त्वाच्या फंक्शनची भर घातली आहे. हे फंक्शन चाचणीच्या उद्देशाने टोकन्स मागणार्‍या कोणालाही ते प्रदान करते.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

`FaucetToken` साठी पत्ता.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

हा घटक ब्लॉक एक्सप्लोररवरील कॉन्ट्रॅक्टच्या लिंकसह एक पत्ता आउटपुट करतो.

```js
const Token = () => {
    ...
```

हा मुख्य घटक आहे जो बहुतेक काम करतो.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

वापरकर्त्याच्या पत्त्याची टोकन शिल्लक.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

वापरकर्त्याच्या मालकीच्या प्रॉक्सीचा पत्ता.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

प्रॉक्सीची टोकन शिल्लक.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

जेव्हा वापरकर्ता मॅन्युअली प्रॉक्सी पत्ता सेट करतो तेव्हा हे फील्ड वापरले जाते. प्रॉक्सी पत्ता मॅन्युअली सेट करण्याची क्षमता असल्यामुळे वापरकर्त्याला प्रत्येक वेळी नवीन प्रस्थापित करण्याऐवजी (आणि जुन्या प्रॉक्सीच्या मालकीचे सर्व टोकन्स गमावण्याऐवजी) विद्यमान प्रॉक्सी वापरता येतो.

```js
  const [ txHash, setTxHash ] = useState(null)
```

शेवटच्या व्यवहाराचा हॅश, एक्सप्लोररची लिंक दाखवण्यासाठी वापरला जातो जेणेकरून वापरकर्ता तो व्यवहार तपासू शकेल.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

ही सर्व फील्ड्स ERC-20 कॉन्ट्रॅक्टला टोकन हस्तांतरण कमांड्स पाठवण्यासाठी वापरली जातात. हे `FaucetToken` असू शकते, परंतु तसे असणे आवश्यक नाही. [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) फंक्शन हे ERC-20 मानकाचा भाग आहे.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

आपल्याला स्वारस्य असलेल्या दोन टोकन शिल्लक वाचा, वापरकर्त्याच्या मालकीचे किती आहे आणि प्रॉक्सीच्या मालकीचे किती आहे.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

रिप्ले हल्ले टाळण्यासाठी (उदाहरणार्थ, एखादा विक्रेता त्यांना पैसे देणारा व्यवहार रिप्ले करतो), आपण [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) वापरतो. आपण स्वाक्षरी करत असलेल्या डेटामध्ये जोडण्यासाठी आपल्याला वर्तमान मूल्य माहित असणे आवश्यक आहे.

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

जेव्हा ब्लॉकचेनवरून वाचलेली माहिती बदलते तेव्हा वापरकर्त्याला प्रदर्शित केलेली शिल्लक अपडेट करण्यासाठी [`useEffect`](https://react.dev/reference/react/useEffect) वापरा.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

वापरकर्त्याच्या स्वतःच्या खात्यात `FaucetToken` टोकन्स हस्तांतरित करणे हे डीफॉल्ट आहे. येथे जेव्हा आपल्याला ते Viem कडून प्राप्त होतात तेव्हा आपण ही मूल्ये सेट करतो.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

जेव्हा मजकूर फील्ड्स बदलतात तेव्हासाठी इव्हेंट हँडलर्स.

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

या वापरकर्त्यासाठी प्रॉक्सी प्रस्थापित करण्यासाठी सर्व्हरला सांगा.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

ऑनचेन `UserProxy` ला पाठवण्यासाठी सर्व्हरला पाठवण्यापूर्वी संदेशावर स्वाक्षरी करा. हे [येथे](/developers/tutorials/gasless/#ui-changes) स्पष्ट केले आहे. आपल्याला लक्ष्य पत्ता (आपण कॉल करत असलेल्या टोकनचा पत्ता) आणि पाठवायचा कॉल डेटा या दोन्हीसह संदेशावर स्वाक्षरी करणे आवश्यक आहे.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

`UserProxy` ला स्वाक्षरी केलेला संदेश पाठवा, जो स्वाक्षरी सत्यापित करेल आणि नंतर तो `target` ला पाठवेल.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // दोन्ही पत्ते
          data,           // लक्ष्याला पाठवण्यासाठी कॉल डेटा
          v, r, s         // स्वाक्षरी
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

सर्व्हरला विनंती पाठवा, आणि जेव्हा तुम्हाला प्रतिसाद मिळेल, तेव्हा व्यवहार हॅश मिळवा.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

`faucet` फंक्शनला कॉल करण्याचे अनुकरण करा. जर हे यशस्वी झाले तरच आपण फॉसेट बटण सक्षम करतो.

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

सर्व्हर आणि `UserProxy` द्वारे फंक्शनला कॉल करण्यासाठी, आपण तीन पायऱ्या फॉलो करतो:

1. [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData) वापरून स्वाक्षरी करण्यासाठी आणि पाठवण्यासाठी कॉल डेटा तयार करा.

2. संदेशावर स्वाक्षरी करा (लक्ष्य पत्ता, कॉल डेटा आणि नॉन्स).

3. सर्व्हरला संदेश पाठवा.

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

घटकाचा हा भाग तुम्हाला थेट ब्राउझरमधून `FaucetToken` वापरू देतो. याचा मुख्य उद्देश डीबगिंग सुलभ करणे हा आहे.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

वापरकर्त्याला नवीन `UserProxy` प्रस्थापित करू द्या.

```js
         <br /><br />
         <input type="text" placeholder="किंवा विद्यमान प्रॉक्सी पत्ता प्रविष्ट करा" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

जेव्हा वापरकर्ते कायदेशीर पत्ता प्रविष्ट करतात तेव्हाच त्यांना **Set proxy address** वर क्लिक करू द्या. लक्षात घ्या की हे सुनिश्चित करत नाही की प्रश्नातील पत्ता खरोखरच `UserProxy` कॉन्ट्रॅक्ट आहे. अशी तपासणी जोडणे शक्य आहे, परंतु ते खूपच संथ असेल (खराब वापरकर्ता अनुभव) आणि सुरक्षा सुधारणार नाही (हल्लेखोर नेहमी युजर इंटरफेससाठी त्यांचा स्वतःचा कोड वापरू शकतात).

```js
         <br /><br />
         { proxyAddr && (
```

जर कायदेशीर प्रॉक्सी पत्ता असेल _तरच_ उर्वरित भाग दाखवा.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

वापरकर्त्याला नॉन्स माहित असण्याची आवश्यकता नाही; हे फक्त डीबगिंगच्या उद्देशाने आहे.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

आपण प्रॉक्सीद्वारे `faucet()` ला कॉल करण्याचे अनुकरण करू शकत नाही. तथापि, आपण किमान हे सुनिश्चित करू शकतो की आपल्याकडे प्रॉक्सी आहे आणि प्रॉक्सीने आपल्याला नॉन्स नोंदवला आहे.

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

वापरकर्त्याला ERC-20 हस्तांतरण व्यवहार जारी करू द्या.

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

जर शेवटचा व्यवहार हॅश असेल, तर एक लिंक दाखवा जेणेकरून वापरकर्ता तो ब्लॉक एक्सप्लोररमध्ये पाहू शकेल.

```js
      </div>
    </>
  )
}

export {Token}
```

हे फक्त React बॉयलरप्लेट आहे.

## असुरक्षा {#vulnerabilities}

आपला सर्व्हर डिनायल-ऑफ-सर्व्हिस हल्ल्यांना बळी पडू शकतो. हा हल्ला [मालिकेच्या मागील लेखात](/developers/tutorials/gasless/#dos-on-server) स्पष्ट केला आहे.

याव्यतिरिक्त, आपण वापरकर्त्याच्या वाईट वर्तनाला प्रोत्साहन देत आहोत. आपण वापरकर्त्याला यावर स्वाक्षरी करण्यास सांगतो:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_आपल्याला_ माहित आहे की वापरकर्त्याला जे टोकन, रक्कम आणि गंतव्य पत्ता हस्तांतरित करायचा आहे त्यासाठी हे एक कायदेशीर ERC-20 हस्तांतरण आहे. परंतु बहुतेक वापरकर्त्यांना कॉल डेटाचा अर्थ कसा लावायचा हे माहित नसते आणि ते कशावर स्वाक्षरी करत आहेत याची त्यांना कल्पना नसते. हे खराब डिझाइन आहे, दोन कारणांसाठी:

- काही वापरकर्ते आपला वापर करणार नाहीत कारण आपण त्यांना ज्या डेटावर स्वाक्षरी करण्यास सांगतो त्यावर त्यांचा विश्वास नसतो.
- इतर वापरकर्ते आपल्यावर विश्वास _ठेवतील_ आणि शिकतील की त्यांनी कॉल डेटा काय आहे हे समजून न घेता त्यावर फक्त स्वाक्षरी करावी. याचा अर्थ असा की जर ॲडम अटॅकर त्यांना त्याच्या वेबसाइटवर पुनर्निर्देशित करण्यात यशस्वी झाला, तर तो त्यांच्याकडून अशा व्यवहारावर स्वाक्षरी करून घेऊ शकतो जो त्याला वापरकर्त्याच्या मालकीचे सर्व USDC (किंवा DAI, किंवा इतर कोणतेही ERC-20) प्रदान करतो.

यावर उपाय म्हणजे `UserProxy` मध्ये हस्तांतरणासारख्या सामान्यतः वापरल्या जाणाऱ्या फंक्शन्ससाठी स्वतंत्र फंक्शन्स असणे. मग वापरकर्ते त्यांना समजणाऱ्या गोष्टीवर स्वाक्षरी करू शकतात.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**टीप:** वापरकर्ते त्यांना हवे असलेले कोणतेही वॉलेट वापरू शकत असले तरी, EIP-712 वापरणाऱ्या ॲप्लिकेशन्सनी त्यांना [संपूर्ण स्वाक्षरी डेटा दाखवणारे](https://rabby.io/) वॉलेट वापरण्यास प्रोत्साहित करावे अशी अत्यंत शिफारस केली जाते. काही वॉलेट्स पत्ता ट्रंकेट करतात (कापतात), जे असुरक्षित आहे. हल्लेखोर असा पत्ता तयार करू शकतो ज्याची सुरुवातीची आणि शेवटची अक्षरे समान असतात, परंतु मध्यभागी भिन्न असतात.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## निष्कर्ष {#conclusion}

वरील असुरक्षांव्यतिरिक्त, या ट्युटोरिअलमधील उपायामध्ये अनेक त्रुटी आहेत ज्यांचे निराकरण करण्यासाठी इथेरियम आपल्याला मदत करू शकते.

- _सेन्सॉरशिप प्रतिकार_. सध्या, वापरकर्ते तुमचा सर्व्हर, दुसऱ्या कोणीतरी सेट केलेला प्रतिस्पर्धी सर्व्हर वापरू शकतात किंवा थेट इथेरियमशी कनेक्ट होऊ शकतात, ज्यासाठी गॅस खर्च येतो. [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) वापरल्याने वापरकर्त्यांना त्यांचा व्यवहार सर्व्हरच्या मोठ्या समूहाला ऑफर करण्याची अनुमती मिळते, ज्यामुळे त्यांचे व्यवहार सेन्सॉर होण्याची शक्यता कमी होते.
- _EOA च्या मालकीची मालमत्ता_. वर नमूद केल्याप्रमाणे, EOA पत्त्याच्या मालकीच्या मालमत्तेचे व्यवस्थापन करण्यासाठी [EIP-7702](https://eip7702.io/) वापरले जाऊ शकते. यात काही अडचणी आहेत, परंतु काहीवेळा ते आवश्यक असते.

मला नजीकच्या भविष्यात ही वैशिष्ट्ये जोडण्याबद्दल ट्युटोरिअल्स प्रकाशित करण्याची आशा आहे.

[माझ्या अधिक कामासाठी येथे पहा](https://cryptodocguy.pro/).