---
title: JavaScript से स्मार्ट अनुबंध को कॉल करना
description: Dai टोकन उदाहरण का उपयोग करके JavaScript से स्मार्ट अनुबंध फ़ंक्शन को कैसे कॉल करें
author: jdourlens
tags:
  - लेन-देन
  - फ्रंटएंड
  - JavaScript
  - web3.js
skill: beginner
breadcrumb: JS से अनुबंधों को कॉल करें
lang: hi
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

इस ट्यूटोरियल में हम देखेंगे कि JavaScript से [स्मार्ट अनुबंध](/developers/docs/smart-contracts/) फ़ंक्शन को कैसे कॉल किया जाए। सबसे पहले एक स्मार्ट अनुबंध की स्थिति को पढ़ना है (उदा., एक ERC-20 धारक का बैलेंस), फिर हम एक टोकन ट्रांसफर करके ब्लॉकचेन की स्थिति को संशोधित करेंगे। आपको पहले से ही [ब्लॉकचेन के साथ इंटरैक्ट करने के लिए JS वातावरण सेट करने](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) से परिचित होना चाहिए।

इस उदाहरण के लिए हम DAI टोकन के साथ काम करेंगे, परीक्षण के उद्देश्य से हम ganache-cli का उपयोग करके ब्लॉकचेन को फ़ोर्क करेंगे और एक ऐसे पते को अनलॉक करेंगे जिसमें पहले से ही बहुत सारे DAI हैं:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

किसी स्मार्ट अनुबंध के साथ इंटरैक्ट करने के लिए हमें उसके पते और ABI की आवश्यकता होगी:

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

इस प्रोजेक्ट के लिए हमने केवल `balanceOf` और `transfer` फ़ंक्शन को रखने के लिए संपूर्ण ERC-20 ABI को छोटा कर दिया है, लेकिन आप [पूरा ERC-20 ABI यहां](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) पा सकते हैं।

फिर हमें अपने स्मार्ट अनुबंध को इंस्टेंटिएट (instantiate) करने की आवश्यकता है:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

हम दो पते भी सेट करेंगे:

- वह जो ट्रांसफर प्राप्त करेगा और
- वह जिसे हमने पहले ही अनलॉक कर दिया है जो इसे भेजेगा:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

अगले भाग में हम दोनों पतों के पास मौजूद टोकन की वर्तमान मात्रा प्राप्त करने के लिए `balanceOf` फ़ंक्शन को कॉल करेंगे।

## कॉल (Call): स्मार्ट अनुबंध से वैल्यू पढ़ना {#call-reading-value-from-a-smart-contract}

पहला उदाहरण एक "constant" (स्थिरांक) विधि को कॉल करेगा और बिना कोई लेन-देन भेजे EVM में अपने स्मार्ट अनुबंध विधि को निष्पादित करेगा। इसके लिए हम एक पते का ERC-20 बैलेंस पढ़ेंगे। [ERC-20 टोकन के बारे में हमारा लेख पढ़ें](/developers/tutorials/understand-the-erc-20-token-smart-contract/)।

आप एक इंस्टेंटिएट किए गए स्मार्ट अनुबंध के तरीकों तक पहुंच सकते हैं जिसके लिए आपने ABI प्रदान किया है, जो इस प्रकार है: `yourContract.methods.methodname`। `call` फ़ंक्शन का उपयोग करके आपको फ़ंक्शन को निष्पादित करने का परिणाम प्राप्त होगा।

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

याद रखें कि DAI ERC-20 में 18 दशमलव (decimals) होते हैं जिसका अर्थ है कि सही मात्रा प्राप्त करने के लिए आपको 18 शून्य हटाने होंगे। uint256 को स्ट्रिंग के रूप में लौटाया जाता है क्योंकि JavaScript बड़े संख्यात्मक मानों को नहीं संभालता है। यदि आप सुनिश्चित नहीं हैं कि [JS में बड़ी संख्याओं से कैसे निपटा जाए, तो bignumber.js के बारे में हमारा ट्यूटोरियल देखें](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)।

## सेंड (Send): स्मार्ट अनुबंध फ़ंक्शन में लेन-देन भेजना {#send-sending-a-transaction-to-a-smart-contract-function}

दूसरे उदाहरण के लिए हम अपने दूसरे पते पर 10 DAI भेजने के लिए DAI स्मार्ट अनुबंध के ट्रांसफर फ़ंक्शन को कॉल करेंगे। ट्रांसफर फ़ंक्शन दो पैरामीटर स्वीकार करता है: प्राप्तकर्ता का पता और ट्रांसफर किए जाने वाले टोकन की मात्रा:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

कॉल फ़ंक्शन उस लेन-देन का हैश लौटाता है जिसे ब्लॉकचेन में माइन किया जाएगा। इथेरियम पर, लेन-देन के हैश का अनुमान लगाया जा सकता है - इस तरह हम लेन-देन के निष्पादित होने से पहले उसका हैश प्राप्त कर सकते हैं ([यहां जानें कि हैश की गणना कैसे की जाती है](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction))।

चूंकि फ़ंक्शन केवल ब्लॉकचेन में लेन-देन सबमिट करता है, हम तब तक परिणाम नहीं देख सकते जब तक कि हमें यह पता न चल जाए कि इसे कब माइन किया गया है और ब्लॉकचेन में शामिल किया गया है। अगले ट्यूटोरियल में हम सीखेंगे कि [किसी लेन-देन के हैश को जानकर ब्लॉकचेन पर उसके निष्पादित होने की प्रतीक्षा कैसे करें](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)।