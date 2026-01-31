---
title: "जावास्क्रिप्ट एपीआई पुस्तकालयों"
description: "जावास्क्रिप्ट क्लाइंट लाइब्रेरी का परिचय जो आपको अपने एप्लिकेशन से ब्लॉकचेन के साथ इंटरैक्ट करने देता है।"
lang: hi
---

किसी वेब ऐप को एथेरियम ब्लॉकचेन के साथ इंटरैक्ट करने के लिए (यानी, ब्लॉकचेन डेटा पढ़ना और/या नेटवर्क पर लेनदेन भेजना), उसे एथेरियम नोड से कनेक्ट होना चाहिए।

इस उद्देश्य के लिए, हर एथेरियम क्लाइंट [JSON-RPC](/developers/docs/apis/json-rpc/) विनिर्देश को लागू करता है, इसलिए [विधियों](/developers/docs/apis/json-rpc/#json-rpc-methods) का एक समान सेट है जिस पर एप्लिकेशन भरोसा कर सकते हैं।

यदि आप एथेरियम नोड से जुड़ने के लिए जावास्क्रिप्ट का उपयोग करना चाहते हैं, तो वेनिला जावास्क्रिप्ट का उपयोग करना संभव है लेकिन पारिस्थितिकी तंत्र के भीतर कई सुविधा पुस्तकालय मौजूद हैं जो इसे बहुत आसान बनाते हैं। इन पुस्तकालयों के साथ, डेवलपर्स एथेरियम के साथ बातचीत करने वाले JSON-RPC अनुरोधों (हुड के नीचे) को प्रारंभ करने के लिए सहज, एक-पंक्ति विधियां लिख सकते हैं।

कृपया ध्यान दें कि [द मर्ज](/roadmap/merge/) के बाद से, एथेरियम सॉफ्टवेयर के दो जुड़े हुए टुकड़े - एक निष्पादन क्लाइंट और एक सहमति क्लाइंट - को एक नोड चलाने के लिए आवश्यक हैं। कृपया सुनिश्चित करें कि आपके नोड में निष्पादन और सर्वसम्मति क्लाइंट दोनों शामिल हैं। यदि आपका नोड आपकी स्थानीय मशीन पर नहीं है (उदाहरण के लिए आपका नोड एडब्ल्यूएस इंस्टेंस पर चल रहा है) तो तदनुसार ट्यूटोरियल में आईपी पते अपडेट करें। अधिक जानकारी के लिए कृपया [नोड चलाने](/developers/docs/nodes-and-clients/run-a-node/) पर हमारा पेज देखें।

## पूर्वापेक्षाएं {#prerequisites}

जावास्क्रिप्ट को समझने के साथ-साथ, [एथेरियम स्टैक](/developers/docs/ethereum-stack/) और [एथेरियम क्लाइंट्स](/developers/docs/nodes-and-clients/) को समझना भी सहायक हो सकता है।

## पुस्तकालय का उपयोग क्यों करें? {#why-use-a-library}

ये पुस्तकालय एथेरियम नोड के साथ सीधे बातचीत करने की जटिलता को दूर करते हैं। वे यूटिलिटी फ़ंक्शन भी प्रदान करते हैं (जैसे, ETH को Gwei में बदलना) ताकि एक डेवलपर के रूप में आप Ethereum क्लाइंट की जटिलताओं से निपटने में कम समय बिता सकें और अपने एप्लिकेशन की अनूठी कार्यक्षमता पर अधिक समय केंद्रित कर सकें।

## लाइब्रेरी सुविधाएँ {#library-features}

### एथेरियम नोड्स से कनेक्ट करें {#connect-to-ethereum-nodes}

प्रदाताओं का उपयोग करके, ये पुस्तकालय आपको एथेरियम से जुड़ने और इसके डेटा को पढ़ने की अनुमति देते हैं, चाहे वह JSON-RPC, INFURA, ETHERSCAN, कीमिया या मेटामास्क पर हो।

> **चेतावनी:** Web3.js को 4 मार्च, 2025 को संग्रहीत किया गया था। [घोषणा पढ़ें](https://blog.chainsafe.io/web3-js-sunset/)। नई परियोजनाओं के लिए [ethers.js](https://ethers.org) या [viem](https://viem.sh) जैसी वैकल्पिक लाइब्रेरी का उपयोग करने पर विचार करें।

**ईथर उदाहरण**

```js
// एक BrowserProvider एक मानक Web3 प्रदाता को रैप करता है, जो है
// जो MetaMask हर पेज में window.ethereum के रूप में इंजेक्ट करता है
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMask प्लगइन लेनदेन पर हस्ताक्षर करने की भी अनुमति देता है
// ईथर भेजने और ब्लॉकचेन के भीतर स्थिति बदलने के लिए भुगतान करने की।
// इसके लिए, हमें खाता हस्ताक्षरकर्ता की आवश्यकता है...
const signer = provider.getSigner()
```

**Web3js example**

```js
var web3 = new Web3("http://localhost:8545")
// या
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// प्रदाता बदलें
web3.setProvider("ws://localhost:8546")
// या
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js में IPC प्रदाता का उपयोग करना
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os पाथ
// या
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os पाथ
// विंडोज़ पर पाथ है: "\\\\.\\pipe\\geth.ipc"
// लिनक्स पर पाथ है: "/users/myuser/.ethereum/geth.ipc"
```

एक बार सेट अप करने के बाद आप ब्लॉकचेन को इसके लिए क्वेरी कर पाएंगे:

- ब्लॉक नंबर
- गैस का अनुमान
- स्मार्ट अनुबंध कार्यक्रम
- नेटवर्क Id
- और अधिक...

### वॉलेट कार्यक्षमता {#wallet-functionality}

ये पुस्तकालय आपको वॉलेट बनाने, चाबियों का प्रबंधन करने और लेनदेन पर हस्ताक्षर करने की कार्यक्षमता प्रदान करते हैं।

यहाँ ईथर से एक उदाहरण है

```js
// एक स्मरक से एक वॉलेट इंस्टेंस बनाएं...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...या एक निजी कुंजी से
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// सही

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

// वॉलेट स्मरक
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// ध्यान दें: एक निजी कुंजी के साथ बनाया गया वॉलेट नहीं होता
//       एक स्मरक है (व्युत्पत्ति इसे रोकती है)
walletPrivateKey.mnemonic
// शून्य

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

// कनेक्ट विधि का एक नया इंस्टेंस लौटाता है
// प्रदाता से जुड़ा वॉलेट
wallet = walletMnemonic.connect(provider)

// नेटवर्क से पूछताछ
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ईथर भेजना
wallet.sendTransaction(tx)
```

[पूरे डॉक्स पढ़ें](https://docs.ethers.io/v5/api/signer/#Wallet)

एक बार सेट अप करने के बाद आप निम्न में सक्षम होंगे:

- खाते बनाएँ
- लेन-देन भेजें
- लेन-देन पर हस्ताक्षर करें
- और अधिक...

### स्मार्ट अनुबंध कार्यों के साथ इंटरैक्ट करें {#interact-with-smart-contract-functions}

जावास्क्रिप्ट क्लाइंट लाइब्रेरी आपके एप्लिकेशन को संकलित अनुबंध के एप्लिकेशन बाइनरी इंटरफ़ेस (एबीआई) को पढ़कर स्मार्ट अनुबंध फ़ंक्शन को कॉल करने की अनुमति देती है।

ABI अनिवार्य रूप से JSON प्रारूप में अनुबंध के कार्यों की व्याख्या करता है और आपको इसे सामान्य जावास्क्रिप्ट ऑब्जेक्ट की तरह उपयोग करने की अनुमति देता है।

तो निम्नलिखित सॉलिडिटी अनुबंध:

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

निम्नलिखित JSON में परिणाम होगा:

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

इसका मतलब है कि आप कर सकते हैं:

- स्मार्ट अनुबंध के लिए एक लेनदेन भेजें और इसकी विधि निष्पादित करें
- ईवीएम में निष्पादित होने पर गैस का अनुमान लगाने के लिए कॉल करें
- एक अनुबंध परिनियोजित करें
- और अधिक...

### उपयोगिता फ़ंक्शंस {#utility-functions}

यूटिलिटी फ़ंक्शंस आपको आसान शॉर्टकट देते हैं जो एथेरियम के साथ निर्माण को थोड़ा आसान बनाते हैं।

ETH मान डिफ़ॉल्ट रूप से Wei में होते हैं. 1 ETH = 1,000,000,000,000,000,000 WEI - इसका मतलब है कि आप बहुत सारी संख्याओं के साथ काम कर रहे हैं! `web3.utils.toWei` आपके लिए ईथर को वेई में परिवर्तित करता है।

और ईथर में यह इस तरह दिखता है:

```js
// किसी खाते का बैलेंस प्राप्त करें (पते या ENS नाम से)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// अक्सर आपको उपयोगकर्ता के लिए आउटपुट को प्रारूपित करने की आवश्यकता होगी
// जो वेई (wei) के बजाय ईथर में मान देखना पसंद करते हैं
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js उपयोगिता फ़ंक्शंस](https://docs.web3js.org/api/web3-utils)
- [Ethers उपयोगिता फ़ंक्शंस](https://docs.ethers.org/v6/api/utils/)

## उपलब्ध लाइब्रेरीज़ {#available-libraries}

**Web3.js -** **_एथेरियम जावास्क्रिप्ट एपीआई._**

- [प्रलेखन](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_जावास्क्रिप्ट और टाइपस्क्रिप्ट में पूर्ण एथेरियम वॉलेट कार्यान्वयन और उपयोगिताएँ।_**

- [Ethers.js होम](https://ethers.org/)
- [प्रलेखन](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_एथेरियम और IPFS डेटा को इंडेक्स करने और GraphQL का उपयोग करके इसे क्वेरी करने के लिए एक प्रोटोकॉल।_**

- [The Graph](https://thegraph.com)
- [ग्राफ एक्सप्लोरर](https://thegraph.com/explorer)
- [प्रलेखन](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_उन्नत एपीआई के साथ Ethers.js के चारों ओर रैपर।_**

- [प्रलेखन](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_एथेरियम के लिए टाइपस्क्रिप्ट इंटरफ़ेस।_**

- [प्रलेखन](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_अंतर्निहित कैशिंग, हुक और परीक्षण मॉक्स के साथ टाइपस्क्रिप्ट मेटा-लाइब्रेरी।_**

- [प्रलेखन](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## आगे की रीडिंग {#further-reading}

_क्या आप किसी सामुदायिक संसाधन के बारे में जानते हैं जिसने आपकी मदद की हो? इस पृष्ठ को संपादित करें और इसे जोड़ें!_

## संबंधित विषय {#related-topics}

- [नोड्स और क्लाइंट्स](/developers/docs/nodes-and-clients/)
- [डेवलपमेंट फ्रेमवर्क](/developers/docs/frameworks/)

## संबंधित ट्यूटोरियल {#related-tutorials}

- [जावास्क्रिप्ट में Ethereum ब्लॉकचेन का उपयोग करने के लिए Web3js सेट अप करें](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– अपने प्रोजेक्ट में web3.js को सेट अप करने के निर्देश।_
- [जावास्क्रिप्ट से स्मार्ट अनुबंध को कॉल करना](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI टोकन का उपयोग करके, देखें कि जावास्क्रिप्ट का उपयोग करके अनुबंध फ़ंक्शन को कैसे कॉल किया जाए।_
- [web3 और Alchemy का उपयोग करके लेनदेन भेजना](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– बैकएंड से लेनदेन भेजने के लिए चरण-दर-चरण पूर्वाभ्यास।_
