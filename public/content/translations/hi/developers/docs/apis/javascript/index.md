---
title: JavaScript API लाइब्रेरी
description: JavaScript क्लाइंट लाइब्रेरी का परिचय जो आपको अपने एप्लिकेशन से ब्लॉकचेन के साथ इंटरैक्ट करने की अनुमति देती हैं।
lang: hi
---

किसी वेब ऐप को इथेरियम ब्लॉकचेन के साथ इंटरैक्ट करने (यानी, ब्लॉकचेन डेटा पढ़ने और/या नेटवर्क पर लेन-देन भेजने) के लिए, उसे एक इथेरियम नोड से कनेक्ट होना चाहिए।

इस उद्देश्य के लिए, प्रत्येक इथेरियम क्लाइंट [जेसन-आरपीसी](/developers/docs/apis/json-rpc/) विनिर्देश को लागू करता है, इसलिए [तरीकों (methods)](/developers/docs/apis/json-rpc/#json-rpc-methods) का एक समान सेट है जिस पर एप्लिकेशन भरोसा कर सकते हैं।

यदि आप इथेरियम नोड से जुड़ने के लिए JavaScript का उपयोग करना चाहते हैं, तो वैनिला JavaScript का उपयोग करना संभव है, लेकिन इकोसिस्टम के भीतर कई सुविधाजनक लाइब्रेरी मौजूद हैं जो इसे बहुत आसान बनाती हैं। इन लाइब्रेरी के साथ, डेवलपर्स इथेरियम के साथ इंटरैक्ट करने वाले जेसन-आरपीसी अनुरोधों को (आंतरिक रूप से) आरंभ करने के लिए सहज, एक-पंक्ति वाले तरीके लिख सकते हैं।

कृपया ध्यान दें कि [द मर्ज](/roadmap/merge/) के बाद से, एक नोड चलाने के लिए इथेरियम सॉफ़्टवेयर के दो जुड़े हुए हिस्सों - एक निष्पादन क्लाइंट और एक सर्वसम्मति क्लाइंट - की आवश्यकता होती है। कृपया सुनिश्चित करें कि आपके नोड में निष्पादन और सर्वसम्मति क्लाइंट दोनों शामिल हैं। यदि आपका नोड आपकी स्थानीय मशीन पर नहीं है (उदा., आपका नोड AWS इंस्टेंस पर चल रहा है) तो ट्यूटोरियल में IP पतों को तदनुसार अपडेट करें। अधिक जानकारी के लिए कृपया [नोड चलाने](/developers/docs/nodes-and-clients/run-a-node/) पर हमारा पेज देखें।

## पूर्वापेक्षाएँ {#prerequisites}

JavaScript को समझने के साथ-साथ, [इथेरियम स्टैक](/developers/docs/ethereum-stack/) और [इथेरियम क्लाइंट](/developers/docs/nodes-and-clients/) को समझना मददगार हो सकता है।

## लाइब्रेरी का उपयोग क्यों करें? {#why-use-a-library}

ये लाइब्रेरी सीधे इथेरियम नोड के साथ इंटरैक्ट करने की अधिकांश जटिलता को दूर करती हैं। वे उपयोगिता फ़ंक्शन (उदा., ETH को Gwei में बदलना) भी प्रदान करती हैं ताकि एक डेवलपर के रूप में आप इथेरियम क्लाइंट की पेचीदगियों से निपटने में कम समय बिता सकें और अपने एप्लिकेशन की अनूठी कार्यक्षमता पर अधिक ध्यान केंद्रित कर सकें।

## लाइब्रेरी की विशेषताएँ {#library-features}

### इथेरियम नोड से जुड़ें {#connect-to-ethereum-nodes}

प्रदाताओं (providers) का उपयोग करके, ये लाइब्रेरी आपको इथेरियम से जुड़ने और उसका डेटा पढ़ने की अनुमति देती हैं, चाहे वह जेसन-आरपीसी, Infura, Etherscan, Alchemy या मेटामास्क के माध्यम से हो।

> **चेतावनी:** Web3.js को 4 मार्च, 2025 को संग्रहीत (archived) कर दिया गया था। [घोषणा पढ़ें](https://blog.chainsafe.io/web3-js-sunset/)। नए प्रोजेक्ट्स के लिए [ethers.js](https://ethers.याg) या [viem](https://viem.sh) जैसी वैकल्पिक लाइब्रेरी का उपयोग करने पर विचार करें।

**Ethers का उदाहरण**

```js
// एक BrowserProvider एक मानक Web3 प्रदाता को रैप करता है, जो कि
// मेटामास्क प्रत्येक पेज में window.ethereum के रूप में इंजेक्ट करता है
const provider = new ethers.BrowserProvider(window.ethereum)

// मेटामास्क प्लगइन लेनदेन पर हस्ताक्षर करने की भी अनुमति देता है ताकि
// ईथर भेजा जा सके और ब्लॉकचेन के भीतर स्थिति बदलने के लिए भुगतान किया जा सके।
// इसके लिए, हमें अकाउंट हस्ताक्षरकर्ता की आवश्यकता है...
const signer = provider.getSigner()
```

**Web3js का उदाहरण**

```js
var web3 = new Web3("http://localhost:8545")
// या
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// प्रदाता बदलें
web3.setProvider("ws://localhost:8546")
// या
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// नोड.js में IPC प्रदाता का उपयोग करना
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os पथ
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os पथ
// windows पर पथ है: "\\\\.\\pipe\\geth.ipc"
// linux पर पथ है: "/users/myuser/.ethereum/geth.ipc"
```

एक बार सेट अप हो जाने के बाद आप ब्लॉकचेन से निम्नलिखित के लिए क्वेरी कर सकेंगे:

- ब्लॉक नंबर
- गैस अनुमान
- स्मार्ट अनुबंध घटनाएँ
- नेटवर्क आईडी
- और भी बहुत कुछ...

### वॉलेट कार्यक्षमता {#wallet-functionality}

ये लाइब्रेरी आपको वॉलेट बनाने, कुंजियों (keys) को प्रबंधित करने और लेन-देन पर हस्ताक्षर करने की कार्यक्षमता देती हैं।

यहाँ Ethers का एक उदाहरण दिया गया है

```js
// निमोनिक से एक वॉलेट इंस्टेंस बनाएँ...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...या एक निजी कुंजी से
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Signer API के अनुसार एक Promise के रूप में पता
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// एक वॉलेट पता समकालिक रूप से भी उपलब्ध है
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// आंतरिक क्रिप्टोग्राफ़िक घटक
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

// नोट: निजी कुंजी के साथ बनाए गए वॉलेट में
//       निमोनिक नहीं होता है (व्युत्पत्ति इसे रोकती है)
walletPrivateKey.mnemonic
// null

// एक संदेश पर हस्ताक्षर करना
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// एक लेनदेन पर हस्ताक्षर करना
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// connect विधि एक नया इंस्टेंस लौटाती है
// एक प्रदाता से जुड़े वॉलेट का
wallet = walletMnemonic.connect(provider)

// नेटवर्क को क्वेरी करना
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ईथर भेजना
wallet.sendTransaction(tx)
```

[पूरे दस्तावेज़ पढ़ें](https://docs.ethers.io/v5/api/signer/#Wallet)

एक बार सेट अप हो जाने के बाद आप यह कर सकेंगे:

- खाते बनाना
- लेन-देन भेजना
- लेन-देन पर हस्ताक्षर करना
- और भी बहुत कुछ...

### स्मार्ट अनुबंध फ़ंक्शन के साथ इंटरैक्ट करें {#interact-with-smart-contract-functions}

JavaScript क्लाइंट लाइब्रेरी आपके एप्लिकेशन को संकलित (compiled) अनुबंध के एप्लिकेशन बाइनरी इंटरफ़ेस (ABI) को पढ़कर स्मार्ट अनुबंध फ़ंक्शन को कॉल करने की अनुमति देती हैं।

ABI अनिवार्य रूप से JSON प्रारूप में अनुबंध के फ़ंक्शन की व्याख्या करता है और आपको इसे एक सामान्य JavaScript ऑब्जेक्ट की तरह उपयोग करने की अनुमति देता है।

तो निम्नलिखित Solidity अनुबंध:

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

निम्नलिखित JSON में परिणत होगा:

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

इसका मतलब है कि आप यह कर सकते हैं:

- स्मार्ट अनुबंध में लेन-देन भेजें और इसके तरीके (method) को निष्पादित करें
- EVM में निष्पादित होने पर किसी तरीके के निष्पादन में लगने वाली गैस का अनुमान लगाने के लिए कॉल करें
- एक अनुबंध तैनात करना
- और भी बहुत कुछ...

### उपयोगिता फ़ंक्शन {#utility-functions}

उपयोगिता फ़ंक्शन आपको आसान शॉर्टकट देते हैं जो इथेरियम के साथ निर्माण को थोड़ा आसान बनाते हैं।

ETH मान डिफ़ॉल्ट रूप से Wei में होते हैं। 1 ETH = 1,000,000,000,000,000,000 WEI – इसका मतलब है कि आप बहुत सारी संख्याओं से निपट रहे हैं! `web3.utils.toWei` आपके लिए ईथर को Wei में बदल देता है।

और ethers में यह इस तरह दिखता है:

```js
// किसी अकाउंट का बैलेंस प्राप्त करें (पते या ENS नाम द्वारा)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// अक्सर आपको उपयोगकर्ता के लिए आउटपुट को फ़ॉर्मेट करने की आवश्यकता होगी
// जो मानों को ईथर में देखना पसंद करते हैं (Wei के बजाय)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js उपयोगिता फ़ंक्शन](https://docs.web3js.org/api/web3-utils)
- [Ethers उपयोगिता फ़ंक्शन](https://docs.ethers.org/v6/api/utils/)

## उपलब्ध लाइब्रेरी {#available-libraries}

**Web3.js -** **_इथेरियम JavaScript API._**

- [दस्तावेज़ीकरण](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_JavaScript और TypeScript में पूर्ण इथेरियम वॉलेट कार्यान्वयन और उपयोगिताएँ।_**

- [Ethers.js होम](https://ethers.org/)
- [दस्तावेज़ीकरण](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_इथेरियम और IPFS डेटा को अनुक्रमित (indexing) करने और GraphQL का उपयोग करके इसे क्वेरी करने के लिए एक प्रोटोकॉल।_**

- [The Graph](https://thegraph.com)
- [Graph एक्सप्लोरर](https://thegraph.com/explorer)
- [दस्तावेज़ीकरण](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [डिस्कॉर्ड](https://thegraph.com/discord)

**Alchemy SDK -** **_उन्नत API के साथ Ethers.js के चारों ओर रैपर।_**

- [दस्तावेज़ीकरण](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_इथेरियम के लिए TypeScript इंटरफ़ेस।_**

- [दस्तावेज़ीकरण](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_दर्जनों चेन में रीयल-टाइम, समृद्ध ब्लॉकचेन डेटा API।_**

- [दस्तावेज़ीकरण](https://docs.codex.io)
- [एक्सप्लोरर](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [डिस्कॉर्ड](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_अंतर्निहित कैशिंग, हुक और टेस्ट मॉक्स के साथ TypeScript मेटा-लाइब्रेरी।_**

- [दस्तावेज़ीकरण](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## आगे की पढ़ाई {#further-reading}

_क्या आप किसी ऐसे सामुदायिक संसाधन के बारे में जानते हैं जिसने आपकी मदद की? इस पेज को संपादित करें और इसे जोड़ें!_

## संबंधित विषय {#related-topics}

- [नोड और क्लाइंट](/developers/docs/nodes-and-clients/)
- [डेवलपमेंट फ्रेमवर्क](/developers/docs/frameworks/)

## संबंधित ट्यूटोरियल {#related-tutorials}

- [JavaScript में इथेरियम ब्लॉकचेन का उपयोग करने के लिए Web3js सेट अप करें](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– अपने प्रोजेक्ट में web3.js सेट अप करने के निर्देश।_
- [JavaScript से स्मार्ट अनुबंध को कॉल करना](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI टोकन का उपयोग करके, देखें कि JavaScript का उपयोग करके अनुबंध फ़ंक्शन को कैसे कॉल किया जाए।_
- [web3 और Alchemy का उपयोग करके लेन-देन भेजना](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– बैकएंड से लेन-देन भेजने के लिए चरण-दर-चरण वॉकथ्रू।_

## ट्यूटोरियल: इथेरियम पर JavaScript API और WebSockets {#tutorials}

- [WebSockets का उपयोग करना](/developers/tutorials/using-websockets/) _– इथेरियम घटनाओं की सदस्यता लेने और रीयल-टाइम जेसन-आरपीसी अनुरोध करने के लिए Alchemy के साथ WebSockets का उपयोग कैसे करें।_