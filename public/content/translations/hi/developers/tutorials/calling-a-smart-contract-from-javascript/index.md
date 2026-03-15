---
title: "जावास्क्रिप्ट से एक स्मार्ट अनुबंध को कॉल करना"
description: "Dai टोकन उदाहरण का उपयोग करके जावास्क्रिप्ट से स्मार्ट अनुबंध फ़ंक्शन को कैसे कॉल करें"
author: jdourlens
tags: [ "लेनदेन", "frontend", "JavaScript", "web3.js" ]
skill: beginner
lang: hi
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

इस ट्यूटोरियल में हम देखेंगे कि जावास्क्रिप्ट से [स्मार्ट अनुबंध](/developers/docs/smart-contracts/) फ़ंक्शन को कैसे कॉल किया जाए। सबसे पहले एक स्मार्ट अनुबंध की स्थिति को पढ़ना है (उदाहरण के लिए, एक ERC20 धारक का शेष), फिर हम टोकन हस्तांतरण करके ब्लॉकचेन की स्थिति को संशोधित करेंगे। आपको [ब्लॉकचेन के साथ इंटरैक्ट करने के लिए एक JS वातावरण स्थापित करने](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) से पहले से ही परिचित होना चाहिए।

इस उदाहरण के लिए हम DAI टोकन के साथ खेलेंगे, परीक्षण के उद्देश्य के लिए हम ganache-cli का उपयोग करके ब्लॉकचेन को फोर्क करेंगे और एक ऐसे पते को अनलॉक करेंगे जिसमें पहले से ही बहुत सारे DAI हैं:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[आपकी इन्फुरा कुंजी] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

एक स्मार्ट अनुबंध के साथ इंटरैक्ट करने के लिए हमें इसके पते और ABI की आवश्यकता होगी:

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

इस प्रोजेक्ट के लिए हमने सिर्फ `balanceOf` और `transfer` फ़ंक्शन को रखने के लिए पूरे ERC20 ABI को हटा दिया है, लेकिन आप [पूरा ERC20 ABI यहां](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) पा सकते हैं।

फिर हमें अपने स्मार्ट अनुबंध को इंस्टेंशिएट करने की आवश्यकता है:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

हम दो पते भी सेट करेंगे:

- वह जो हस्तांतरण प्राप्त करेगा और
- वह जिसे हमने पहले ही अनलॉक कर दिया है जो इसे भेजेगा:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

अगले भाग में हम `balanceOf` फ़ंक्शन को कॉल करेंगे ताकि दोनों पतों पर मौजूद टोकन की वर्तमान राशि को पुनः प्राप्त किया जा सके।

## कॉल: एक स्मार्ट अनुबंध से मान पढ़ना {#call-reading-value-from-a-smart-contract}

पहला उदाहरण एक "स्थिर" विधि को कॉल करेगा और बिना कोई लेनदेन भेजे EVM में इसकी स्मार्ट अनुबंध विधि को निष्पादित करेगा। इसके लिए हम एक पते का ERC20 शेष पढ़ेंगे। [ERC20 टोकन के बारे में हमारा लेख पढ़ें](/developers/tutorials/understand-the-erc-20-token-smart-contract/)।

आप एक इंस्टेंशिएटेड स्मार्ट अनुबंध विधियों तक पहुँच सकते हैं जिसके लिए आपने ABI प्रदान किया है: `yourContract.methods.methodname`। `call` फ़ंक्शन का उपयोग करके आपको फ़ंक्शन को निष्पादित करने का परिणाम प्राप्त होगा।

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("एक त्रुटि हुई", err)
    return
  }
  console.log("शेष है: ", res)
})
```

याद रखें कि DAI ERC20 में 18 दशमलव हैं जिसका अर्थ है कि सही राशि प्राप्त करने के लिए आपको 18 शून्य हटाने होंगे। `uint256` को स्ट्रिंग्स के रूप में लौटाया जाता है क्योंकि जावास्क्रिप्ट बड़े संख्यात्मक मानों को नहीं संभालता है। यदि आप सुनिश्चित नहीं हैं [कि JS में बड़ी संख्याओं से कैसे निपटा जाए, तो bignumber.js के बारे में हमारा ट्यूटोरियल देखें](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)।

## भेजें: एक स्मार्ट अनुबंध फ़ंक्शन को एक लेनदेन भेजना {#send-sending-a-transaction-to-a-smart-contract-function}

दूसरे उदाहरण के लिए हम अपने दूसरे पते पर 10 DAI भेजने के लिए DAI स्मार्ट अनुबंध के हस्तांतरण फ़ंक्शन को कॉल करेंगे। हस्तांतरण फ़ंक्शन दो पैरामीटर स्वीकार करता है: प्राप्तकर्ता का पता और हस्तांतरण करने के लिए टोकन की राशि:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("एक त्रुटि हुई", err)
      return
    }
    console.log("लेनदेन का हैश: " + res)
  })
```

कॉल फ़ंक्शन उस लेनदेन का हैश लौटाता है जिसे ब्लॉकचेन में माइन किया जाएगा। एथेरियम पर, लेनदेन हैश पूर्वानुमानित होते हैं - इस तरह हम लेनदेन के निष्पादित होने से पहले उसका हैश प्राप्त कर सकते हैं ([यहां जानें कि हैश की गणना कैसे की जाती है](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

चूंकि फ़ंक्शन केवल लेनदेन को ब्लॉकचेन में जमा करता है, इसलिए हम तब तक परिणाम नहीं देख सकते जब तक हमें यह पता न चल जाए कि इसे कब माइन किया गया है और ब्लॉकचेन में शामिल किया गया है। अगले ट्यूटोरियल में हम सीखेंगे [कि इसके हैश को जानकर ब्लॉकचेन पर लेनदेन के निष्पादित होने की प्रतीक्षा कैसे करें](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)।
