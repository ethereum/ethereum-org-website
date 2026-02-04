---
title: JavaScript API लायब्ररी
description: JavaScript क्लायंट लायब्ररीचा परिचय जे तुम्हाला तुमच्या ॲप्लिकेशनमधून ब्लॉकचेनशी संवाद साधू देतात.
lang: mr
---

वेब ॲपला Ethereum ब्लॉकचेनशी संवाद साधण्यासाठी (म्हणजे, ब्लॉकचेन डेटा वाचणे आणि/किंवा नेटवर्कवर व्यवहार पाठवणे), ते Ethereum नोडशी कनेक्ट करणे आवश्यक आहे.

या उद्देशासाठी, प्रत्येक Ethereum क्लायंट [JSON-RPC](/developers/docs/apis/json-rpc/) तपशील लागू करतो, त्यामुळे [पद्धतींचा](/developers/docs/apis/json-rpc/#json-rpc-methods) एकसमान संच आहे ज्यावर ॲप्लिकेशन्स अवलंबून राहू शकतात.

तुम्हाला Ethereum नोडशी कनेक्ट करण्यासाठी JavaScript वापरायचे असल्यास, व्हॅनिला JavaScript वापरणे शक्य आहे परंतु इकोसिस्टममध्ये अनेक सोयीस्कर लायब्ररी अस्तित्वात आहेत ज्यामुळे हे बरेच सोपे होते. या लायब्ररीजच्या मदतीने, डेव्हलपर इथेरियमशी संवाद साधणाऱ्या JSON-RPC विनंत्या (पडद्याआड) सुरू करण्यासाठी सहज, एका ओळीच्या पद्धती लिहू शकतात.

कृपया लक्षात घ्या की [द मर्ज](/roadmap/merge/) पासून, Ethereum सॉफ्टवेअरचे दोन जोडलेले भाग - एक एक्झिक्युशन क्लायंट आणि एक कन्सेंसस क्लायंट - नोड चालवण्यासाठी आवश्यक आहेत. कृपया खात्री करा की तुमच्या नोडमध्ये एक्झिक्युशन आणि कन्सेंसस क्लायंट दोन्ही समाविष्ट आहेत. जर तुमचा नोड तुमच्या स्थानिक मशीनवर नसेल (उदा. तुमचा नोड AWS इंस्टन्सवर चालत असेल) तर ट्यूटोरियलमधील IP पत्ते त्यानुसार अपडेट करा. [नोड चालवण्यावर](/developers/docs/nodes-and-clients/run-a-node/) अधिक माहितीसाठी कृपया आमचे पेज पहा.

## पूर्वतयारी {#prerequisites}

JavaScript समजून घेण्याबरोबरच, [Ethereum स्टॅक](/developers/docs/ethereum-stack/) आणि [Ethereum क्लायंट](/developers/docs/nodes-and-clients/) समजून घेणे उपयुक्त ठरू शकते.

## लायब्ररी का वापरावी? {#why-use-a-library}

या लायब्ररीज इथेरियम नोडशी थेट संवाद साधण्यातील बरीचशी गुंतागुंत दूर करतात. त्या उपयुक्तता कार्ये (utility functions) देखील प्रदान करतात (उदा. ETH चे Gwei मध्ये रूपांतर करणे), त्यामुळे एक डेव्हलपर म्हणून तुम्ही इथेरियम क्लायंटच्या गुंतागुंतीमध्ये कमी वेळ घालवून तुमच्या ॲप्लिकेशनच्या अद्वितीय कार्यक्षमतेवर अधिक लक्ष केंद्रित करू शकता.

## लायब्ररी वैशिष्ट्ये {#library-features}

### Ethereum नोड्सशी कनेक्ट करा {#connect-to-ethereum-nodes}

प्रोव्हायडर वापरून, या लायब्ररी तुम्हाला JSON-RPC, INFURA, Etherscan, Alchemy किंवा MetaMask द्वारे Ethereum शी कनेक्ट करण्याची आणि त्याचा डेटा वाचण्याची परवानगी देतात.

> **चेतावणी:** Web3.js 4 मार्च 2025 रोजी संग्रहित केले गेले. [घोषणा वाचा](https://blog.chainsafe.io/web3-js-sunset/). नवीन प्रकल्पांसाठी [ethers.js](https://ethers.org) किंवा [viem](https://viem.sh) सारख्या पर्यायी लायब्ररी वापरण्याचा विचार करा.

**Ethers उदाहरण**

```js
// ब्राउझरप्रोव्हायडर एक मानक Web3 प्रोव्हायडरला रॅप करतो, जो आहे
// जे MetaMask प्रत्येक पेजमध्ये window.ethereum म्हणून इंजेक्ट करते
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMask प्लगइन देखील व्यवहार साइन करण्याची परवानगी देतो
// ब्लॉकचेनमध्ये इथर पाठवण्यासाठी आणि स्थिती बदलण्यासाठी पैसे देण्यासाठी.
// यासाठी, आम्हाला खाते साइनरची आवश्यकता आहे...
const signer = provider.getSigner()
```

**Web3js उदाहरण**

```js
var web3 = new Web3("http://localhost:8545")
// किंवा
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// प्रोव्हायडर बदला
web3.setProvider("ws://localhost:8546")
// किंवा
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js मध्ये IPC प्रोव्हायडर वापरणे
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os पाथ
// किंवा
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os पाथ
// विंडोजवर पाथ आहे: "\\\\.\\pipe\\geth.ipc"
// लिनक्सवर पाथ आहे: "/users/myuser/.ethereum/geth.ipc"
```

एकदा सेट झाल्यावर तुम्ही ब्लॉकचेनला यासाठी क्वेरी करू शकाल:

- ब्लॉक क्रमांक
- गॅस अंदाज
- स्मार्ट कॉन्ट्रॅक्ट इव्हेंट्स
- नेटवर्क आयडी
- आणि बरेच काही...

### वॉलेट कार्यक्षमता {#wallet-functionality}

या लायब्ररी तुम्हाला वॉलेट तयार करण्यासाठी, की व्यवस्थापित करण्यासाठी आणि व्यवहार साइन करण्यासाठी कार्यक्षमता देतात.

येथे Ethers मधील एक उदाहरण आहे

```js
// मेमोनिकमधून वॉलेट इंस्टन्स तयार करा...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...किंवा खासगी की मधून
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// खरे

// साइनर API नुसार पत्ता प्रॉमिस म्हणून
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// वॉलेटचा पत्ता समकालिकपणे देखील उपलब्ध आहे
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// अंतर्गत क्रिप्टोग्राफिक घटक
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// वॉलेट मेमोनिक
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// टीप: खासगी की सह तयार केलेल्या वॉलेटमध्ये
//       मेमोनिक नसते (व्युत्पन्नता ते प्रतिबंधित करते)
walletPrivateKey.mnemonic
// null

// संदेश साइन करणे
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// व्यवहार साइन करणे
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// कनेक्ट पद्धत नवीन इंस्टन्स परत करते
// प्रोव्हायडरशी कनेक्ट केलेले वॉलेट
wallet = walletMnemonic.connect(provider)

// नेटवर्कला क्वेरी करणे
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// इथर पाठवणे
wallet.sendTransaction(tx)
```

[संपूर्ण दस्तऐवज वाचा](https://docs.ethers.io/v5/api/signer/#Wallet)

एकदा सेट झाल्यावर तुम्ही हे करू शकाल:

- खाती तयार करा
- व्यवहार पाठवा
- व्यवहारांवर सही करा
- आणि बरेच काही...

### स्मार्ट कॉन्ट्रॅक्ट फंक्शन्सशी संवाद साधा {#interact-with-smart-contract-functions}

JavaScript क्लायंट लायब्ररी तुमच्या ॲप्लिकेशनला संकलित कॉन्ट्रॅक्टचा ॲप्लिकेशन बायनरी इंटरफेस (ABI) वाचून स्मार्ट कॉन्ट्रॅक्ट फंक्शन्स कॉल करण्याची परवानगी देतात.

ABI मूलत: कॉन्ट्रॅक्टची फंक्शन्स JSON स्वरूपात स्पष्ट करते आणि तुम्हाला ते सामान्य JavaScript ऑब्जेक्टप्रमाणे वापरण्याची परवानगी देते.

म्हणून खालील Solidity कॉन्ट्रॅक्ट:

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

याचा परिणाम खालील JSON मध्ये होईल:

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

- स्मार्ट कॉन्ट्रॅक्टला व्यवहार पाठवा आणि त्याची पद्धत कार्यान्वित करा
- EVM मध्ये कार्यान्वित केल्यावर पद्धतीच्या अंमलबजावणीसाठी किती गॅस लागेल याचा अंदाज घेण्यासाठी कॉल करा
- कॉन्ट्रॅक्ट तैनात करा
- आणि बरेच काही...

### उपयुक्तता फंक्शन्स {#utility-functions}

युटिलिटी फंक्शन्स तुम्हाला सुलभ शॉर्टकट देतात ज्यामुळे Ethereum सह बिल्डिंग थोडे सोपे होते.

ETH मूल्ये डीफॉल्टनुसार Wei मध्ये असतात. १ ETH = १,०००,०००,०००,०००,०००,००० WEI – याचा अर्थ तुम्ही खूप मोठ्या संख्यांशी व्यवहार करत आहात! `web3.utils.toWei` तुमच्यासाठी इथरला Wei मध्ये रूपांतरित करते.

आणि ethers मध्ये ते असे दिसते:

```js
// खात्याची शिल्लक मिळवा (पत्त्याद्वारे किंवा ENS नावाद्वारे)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// अनेकदा तुम्हाला वापरकर्त्यासाठी आउटपुट स्वरूपित करण्याची आवश्यकता असेल
// जे (wei ऐवजी) इथरमध्ये मूल्ये पाहणे पसंत करतात
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js उपयुक्तता फंक्शन्स](https://docs.web3js.org/api/web3-utils)
- [Ethers उपयुक्तता फंक्शन्स](https://docs.ethers.org/v6/api/utils/)

## उपलब्ध लायब्ररीज {#available-libraries}

**Web3.js -** **_Ethereum JavaScript API._**

- [दस्तऐवजीकरण](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_JavaScript आणि TypeScript मध्ये संपूर्ण Ethereum वॉलेट अंमलबजावणी आणि उपयुक्तता._**

- [Ethers.js होम](https://ethers.org/)
- [दस्तऐवजीकरण](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**द ग्राफ -** **_Ethereum आणि IPFS डेटा अनुक्रमित करण्यासाठी आणि GraphQL वापरून क्वेरी करण्यासाठी एक प्रोटोकॉल._**

- [द ग्राफ](https://thegraph.com)
- [ग्राफ एक्सप्लोरर](https://thegraph.com/explorer)
- [दस्तऐवजीकरण](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [डिस्कॉर्ड](https://thegraph.com/discord)

**Alchemy SDK -** **_वर्धित apis सह Ethers.js भोवती रॅपर._**

- [दस्तऐवजीकरण](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Ethereum साठी TypeScript इंटरफेस._**

- [दस्तऐवजीकरण](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_अंगभूत कॅशिंग, हुक आणि चाचणी मॉक्ससह TypeScript मेटा-लायब्ररी._**

- [दस्तऐवजीकरण](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## पुढील वाचन {#further-reading}

_तुम्हाला मदत केलेल्या सामुदायिक संसाधनाबद्दल माहिती आहे का?_ हे पृष्ठ संपादित करा आणि ते जोडा!_

## संबंधित विषय {#related-topics}

- [नोड्स आणि क्लायंट](/developers/docs/nodes-and-clients/)
- [डेव्हलपमेंट फ्रेमवर्क्स](/developers/docs/frameworks/)

## संबंधित ट्युटोरियल्स {#related-tutorials}

- [JavaScript मध्ये इथेरियम ब्लॉकचेन वापरण्यासाठी Web3js सेट अप करा](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– तुमच्या प्रोजेक्टमध्ये web3.js सेट अप करण्याच्या सूचना._
- [JavaScript मधून स्मार्ट कराराला कॉल करणे](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI टोकन वापरून, JavaScript वापरून कॉन्ट्रॅक्ट्स फंक्शन कसे कॉल करायचे ते पहा._
- [web3 आणि Alchemy वापरून व्यवहार पाठवणे](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– बॅकएंडमधून व्यवहार पाठवण्यासाठी चरण-दर-चरण मार्गदर्शन._
