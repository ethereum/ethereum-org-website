---
title: JavaScript API लायब्ररीज्
description: तुमच्या ॲप्लिकेशनमधून ब्लॉकचेनशी संवाद साधू देणाऱ्या JavaScript क्लायंट लायब्ररीजची ओळख.
lang: mr
---

वेब ॲपला इथेरियम ब्लॉकचेनशी संवाद साधण्यासाठी (म्हणजेच, ब्लॉकचेन डेटा वाचण्यासाठी आणि/किंवा नेटवर्कवर व्यवहार पाठवण्यासाठी), ते इथेरियम नोडशी कनेक्ट केलेले असणे आवश्यक आहे.

या उद्देशासाठी, प्रत्येक इथेरियम क्लायंट [जेसॉन-आरपीसी](/developers/docs/apis/json-rpc/) स्पेसिफिकेशन लागू करतो, त्यामुळे ॲप्लिकेशन्स अवलंबून राहू शकतील अशा [पद्धतींचा (methods)](/developers/docs/apis/json-rpc/#json-rpc-methods) एक समान संच उपलब्ध आहे.

जर तुम्हाला इथेरियम नोडशी कनेक्ट करण्यासाठी JavaScript वापरायचे असेल, तर व्हॅनिला JavaScript वापरणे शक्य आहे परंतु इकोसिस्टममध्ये अनेक सोयीस्कर लायब्ररीज् अस्तित्वात आहेत ज्या हे काम खूप सोपे करतात. या लायब्ररीजच्या मदतीने, डेव्हलपर्स इथेरियमशी संवाद साधणाऱ्या जेसॉन-आरपीसी विनंत्या (अंतर्गतपणे) सुरू करण्यासाठी अंतर्ज्ञानी, एका ओळीच्या पद्धती लिहू शकतात.

कृपया नोंद घ्या की [द मर्ज](/roadmap/merge/) पासून, नोड चालवण्यासाठी इथेरियम सॉफ्टवेअरचे दोन जोडलेले भाग - एक अंमलबजावणी क्लायंट आणि एक सहमती क्लायंट - आवश्यक आहेत. कृपया खात्री करा की तुमच्या नोडमध्ये अंमलबजावणी आणि सहमती क्लायंट दोन्ही समाविष्ट आहेत. जर तुमचा नोड तुमच्या स्थानिक मशीनवर नसेल (उदा. तुमचा नोड AWS इन्स्टन्सवर चालत असेल) तर ट्युटोरियलमधील IP पत्ते त्यानुसार अपडेट करा. अधिक माहितीसाठी कृपया [नोड चालवणे](/developers/docs/nodes-and-clients/run-a-node/) वरील आमचे पेज पहा.

## पूर्वअटी {#prerequisites}

JavaScript समजून घेण्यासोबतच, [इथेरियम स्टॅक](/developers/docs/ethereum-stack/) आणि [इथेरियम क्लायंट्स](/developers/docs/nodes-and-clients/) समजून घेणे उपयुक्त ठरू शकते.

## लायब्ररी का वापरावी? {#why-use-a-library}

या लायब्ररीज् थेट इथेरियम नोडशी संवाद साधण्याची बरीचशी गुंतागुंत दूर करतात. त्या युटिलिटी फंक्शन्स देखील प्रदान करतात (उदा. ETH चे Gwei मध्ये रूपांतर करणे) जेणेकरून एक डेव्हलपर म्हणून तुम्ही इथेरियम क्लायंट्सच्या गुंतागुंती हाताळण्यात कमी वेळ घालवू शकता आणि तुमच्या ॲप्लिकेशनच्या अद्वितीय कार्यक्षमतेवर अधिक लक्ष केंद्रित करू शकता.

## लायब्ररीची वैशिष्ट्ये {#library-features}

### इथेरियम नोड्सशी कनेक्ट करा {#connect-to-ethereum-nodes}

प्रोव्हायडर्सचा वापर करून, या लायब्ररीज् तुम्हाला इथेरियमशी कनेक्ट करण्याची आणि त्याचा डेटा वाचण्याची परवानगी देतात, मग ते जेसॉन-आरपीसी, Infura, Etherscan, Alchemy किंवा मेटामास्क द्वारे असो.

> **चेतावणी:** Web3.js 4 मार्च 2025 रोजी संग्रहित (archived) केले गेले. [घोषणा वाचा](https://blog.chainsafe.io/web3-js-sunset/). नवीन प्रकल्पांसाठी [ethers.js](https://ethers.किंवाg) किंवा [viem](https://viem.sh) सारख्या पर्यायी लायब्ररीज् वापरण्याचा विचार करा.

**Ethers चे उदाहरण**

```js
// BrowserProvider एका मानक Web3 प्रोव्हायडरला रॅप करतो, जे
// मेटामास्क प्रत्येक पेजमध्ये window.ethereum म्हणून इंजेक्ट करते
const provider = new ethers.BrowserProvider(window.ethereum)

// मेटामास्क प्लगइन ट्रान्झॅक्शन्स साईन करण्याची देखील परवानगी देते जेणेकरून
// इथर पाठवता येईल आणि ब्लॉकचेनमध्ये स्टेट बदलण्यासाठी पैसे देता येतील.
// यासाठी, आपल्याला अकाउंट सायनरची आवश्यकता आहे...
const signer = provider.getSigner()
```

**Web3js चे उदाहरण**

```js
var web3 = new Web3("http://localhost:8545")
// किंवा
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// प्रोव्हायडर बदला
web3.setProvider("ws://localhost:8546")
// किंवा
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// नोड.js मध्ये IPC प्रोव्हायडर वापरणे
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os पाथ
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os पाथ
// windows वर पाथ आहे: "\\\\.\\pipe\\geth.ipc"
// linux वर पाथ आहे: "/users/myuser/.ethereum/geth.ipc"
```

एकदा सेट अप केल्यानंतर तुम्ही ब्लॉकचेनला खालील गोष्टींसाठी क्वेरी करू शकाल:

- ब्लॉक क्रमांक
- गॅसचे अंदाज
- स्मार्ट कॉन्ट्रॅक्ट घटना
- नेटवर्क आयडी
- आणि बरेच काही...

### वॉलेट कार्यक्षमता {#wallet-functionality}

या लायब्ररीज् तुम्हाला वॉलेट्स तयार करण्याची, कीज (keys) व्यवस्थापित करण्याची आणि व्यवहारांवर स्वाक्षरी करण्याची कार्यक्षमता देतात.

येथे Ethers मधील एक उदाहरण आहे

```js
// निमोनिकवरून वॉलेट इन्स्टन्स तयार करा...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...किंवा प्रायव्हेट की वरून
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// सायनर API नुसार प्रॉमिस म्हणून ॲड्रेस
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// वॉलेट ॲड्रेस सिंक्रोनसपणे देखील उपलब्ध आहे
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// अंतर्गत क्रिप्टोग्राफिक घटक
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// वॉलेट निमोनिक
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// टीप: प्रायव्हेट की ने तयार केलेल्या वॉलेटमध्ये
//       निमोनिक नसते (डेरिव्हेशन यास प्रतिबंधित करते)
walletPrivateKey.mnemonic
// null

// मेसेज साईन करणे
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// ट्रान्झॅक्शन साईन करणे
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// कनेक्ट मेथड याचा नवीन इन्स्टन्स रिटर्न करते
// प्रोव्हायडरशी कनेक्ट केलेले वॉलेट
wallet = walletMnemonic.connect(provider)

// नेटवर्क क्वेरी करणे
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// इथर पाठवणे
wallet.sendTransaction(tx)
```

[संपूर्ण डॉक्स वाचा](https://docs.ethers.io/v5/api/signer/#Wallet)

एकदा सेट अप केल्यानंतर तुम्ही हे करू शकाल:

- खाती तयार करणे
- व्यवहार पाठवणे
- व्यवहारांवर स्वाक्षरी करणे
- आणि बरेच काही...

### स्मार्ट कॉन्ट्रॅक्ट फंक्शन्सशी संवाद साधा {#interact-with-smart-contract-functions}

JavaScript क्लायंट लायब्ररीज् तुमच्या ॲप्लिकेशनला संकलित (compiled) कॉन्ट्रॅक्टचा ॲप्लिकेशन बायनरी इंटरफेस (ABI) वाचून स्मार्ट कॉन्ट्रॅक्ट फंक्शन्स कॉल करण्याची परवानगी देतात.

ABI मुळात कॉन्ट्रॅक्टची फंक्शन्स JSON फॉरमॅटमध्ये स्पष्ट करतो आणि तुम्हाला ते सामान्य JavaScript ऑब्जेक्टप्रमाणे वापरण्याची परवानगी देतो.

त्यामुळे खालील Solidity कॉन्ट्रॅक्ट:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

खालील JSON मध्ये परिणामित होईल:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

याचा अर्थ तुम्ही हे करू शकता:

- स्मार्ट कॉन्ट्रॅक्टला व्यवहार पाठवणे आणि त्याची पद्धत (method) कार्यान्वित करणे
- EVM मध्ये कार्यान्वित केल्यावर एखाद्या पद्धतीच्या अंमलबजावणीसाठी किती गॅस लागेल याचा अंदाज घेण्यासाठी कॉल करणे
- कॉन्ट्रॅक्ट प्रस्थापित करणे
- आणि बरेच काही...

### युटिलिटी फंक्शन्स {#utility-functions}

युटिलिटी फंक्शन्स तुम्हाला उपयुक्त शॉर्टकट्स देतात जे इथेरियमसोबत बिल्डिंग करणे थोडे सोपे करतात.

ETH मूल्ये डीफॉल्टनुसार Wei मध्ये असतात. 1 ETH = 1,000,000,000,000,000,000 WEI – याचा अर्थ तुम्ही खूप मोठ्या संख्या हाताळत आहात! `web3.utils.toWei` तुमच्यासाठी इथरचे Wei मध्ये रूपांतर करते.

आणि ethers मध्ये ते असे दिसते:

```js
// अकाउंटचा बॅलन्स मिळवा (ॲड्रेस किंवा ENS नावाद्वारे)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// अनेकदा तुम्हाला युजरसाठी आउटपुट फॉरमॅट करावे लागेल
// ज्यांना व्हॅल्यूज Wei ऐवजी इथरमध्ये पाहणे आवडते
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js युटिलिटी फंक्शन्स](https://docs.web3js.org/api/web3-utils)
- [Ethers युटिलिटी फंक्शन्स](https://docs.ethers.org/v6/api/utils/)

## उपलब्ध लायब्ररीज् {#available-libraries}

**Web3.js -** **_इथेरियम JavaScript API._**

- [डॉक्युमेंटेशन](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_JavaScript आणि TypeScript मध्ये संपूर्ण इथेरियम वॉलेट अंमलबजावणी आणि युटिलिटीज._**

- [Ethers.js होम](https://ethers.org/)
- [डॉक्युमेंटेशन](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_इथेरियम आणि IPFS डेटा इंडेक्स करण्यासाठी आणि GraphQL वापरून त्याची क्वेरी करण्यासाठी एक प्रोटोकॉल._**

- [The Graph](https://thegraph.com)
- [Graph एक्सप्लोरर](https://thegraph.com/explorer)
- [डॉक्युमेंटेशन](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [डिस्कॉर्ड्](https://thegraph.com/discord)

**Alchemy SDK -** **_वर्धित APIs सह Ethers.js भोवती रॅपर._**

- [डॉक्युमेंटेशन](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_इथेरियमसाठी TypeScript इंटरफेस._**

- [डॉक्युमेंटेशन](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_अनेक चेन्सवरील रिअल-टाइम, समृद्ध ब्लॉकचेन डेटा API._**

- [डॉक्युमेंटेशन](https://docs.codex.io)
- [एक्सप्लोरर](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [डिस्कॉर्ड्](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_अंगभूत कॅशिंग, हुक्स आणि टेस्ट मॉक्ससह TypeScript मेटा-लायब्ररी._**

- [डॉक्युमेंटेशन](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## पुढील वाचन {#further-reading}

_तुम्हाला मदत केलेल्या एखाद्या कम्युनिटी रिसोर्सबद्दल माहिती आहे का? हे पेज संपादित करा आणि ते जोडा!_

## संबंधित विषय {#related-topics}

- [नोड्स आणि क्लायंट्स](/developers/docs/nodes-and-clients/)
- [डेव्हलपमेंट फ्रेमवर्क्स](/developers/docs/frameworks/)

## संबंधित ट्युटोरियल्स {#related-tutorials}

- [JavaScript मध्ये इथेरियम ब्लॉकचेन वापरण्यासाठी Web3js सेट अप करा](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– तुमच्या प्रोजेक्टमध्ये web3.js सेट अप करण्यासाठी सूचना._
- [JavaScript मधून स्मार्ट कॉन्ट्रॅक्ट कॉल करणे](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI टोकन वापरून, JavaScript वापरून कॉन्ट्रॅक्ट्स फंक्शन कसे कॉल करायचे ते पहा._
- [web3 आणि Alchemy वापरून व्यवहार पाठवणे](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– बॅकएंडवरून व्यवहार पाठवण्यासाठी टप्प्याटप्प्याने मार्गदर्शन._

## ट्युटोरियल्स: इथेरियमवरील JavaScript APIs आणि WebSockets {#tutorials}

- [WebSockets वापरणे](/developers/tutorials/using-websockets/) _– इथेरियम घटना सबस्क्राइब करण्यासाठी आणि रिअल-टाइम जेसॉन-आरपीसी विनंत्या करण्यासाठी Alchemy सोबत WebSockets कसे वापरावे._