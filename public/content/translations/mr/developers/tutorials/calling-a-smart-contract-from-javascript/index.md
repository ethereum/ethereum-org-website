---
title: "JavaScript मधून स्मार्ट कॉन्ट्रॅक्ट कॉल करणे"
description: "Dai टोकनचे उदाहरण वापरून JavaScript मधून स्मार्ट कॉन्ट्रॅक्ट फंक्शन कसे कॉल करावे"
author: jdourlens
tags:
  - व्यवहार
  - फ्रंटएंड
  - JavaScript
  - web3.js
skill: beginner
breadcrumb: "JS मधून कॉन्ट्रॅक्ट्स कॉल करा"
lang: mr
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

या ट्युटोरिअलमध्ये आपण JavaScript मधून [स्मार्ट कॉन्ट्रॅक्ट](/developers/docs/smart-contracts/) फंक्शन कसे कॉल करायचे ते पाहू. प्रथम स्मार्ट कॉन्ट्रॅक्टची स्थिती वाचणे (उदा., ERC-20 धारकाची शिल्लक), त्यानंतर आपण टोकन हस्तांतरण करून ब्लॉकचेनची स्थिती बदलू. तुम्हाला [ब्लॉकचेनशी संवाद साधण्यासाठी JS वातावरण सेट करण्याची](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) आधीच माहिती असावी.

या उदाहरणासाठी आपण DAI टोकन वापरू, चाचणीच्या उद्देशाने आपण ganache-cli वापरून ब्लॉकचेन फोर्क करू आणि ज्या पत्त्यावर आधीपासूनच भरपूर DAI आहेत असा पत्ता अनलॉक करू:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

स्मार्ट कॉन्ट्रॅक्टशी संवाद साधण्यासाठी आपल्याला त्याचा पत्ता आणि ABI आवश्यक असेल:

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

या प्रोजेक्टसाठी आम्ही संपूर्ण ERC-20 ABI काढून टाकून फक्त `balanceOf` आणि `transfer` फंक्शन ठेवले आहे, परंतु तुम्हाला [संपूर्ण ERC-20 ABI येथे मिळू शकेल](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

त्यानंतर आपल्याला आपले स्मार्ट कॉन्ट्रॅक्ट इन्स्टन्शिएट (instantiate) करावे लागेल:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

आपण दोन पत्ते देखील सेट करू:

- ज्याला हस्तांतरण प्राप्त होईल आणि
- जो आपण आधीच अनलॉक केला आहे आणि जो ते पाठवेल:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

पुढील भागात आपण दोन्ही पत्त्यांवर असलेल्या टोकन्सची वर्तमान रक्कम मिळवण्यासाठी `balanceOf` फंक्शन कॉल करू.

## कॉल: स्मार्ट कॉन्ट्रॅक्टमधून मूल्य वाचणे {#call-reading-value-from-a-smart-contract}

पहिले उदाहरण "constant" पद्धत कॉल करेल आणि कोणताही व्यवहार न पाठवता EVM मध्ये त्याची स्मार्ट कॉन्ट्रॅक्ट पद्धत कार्यान्वित करेल. यासाठी आपण एका पत्त्याची ERC-20 शिल्लक वाचू. [ERC-20 टोकन्सबद्दलचा आमचा लेख वाचा](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

ज्यासाठी तुम्ही ABI प्रदान केला आहे अशा इन्स्टन्शिएट केलेल्या स्मार्ट कॉन्ट्रॅक्ट पद्धतींमध्ये तुम्ही खालीलप्रमाणे प्रवेश करू शकता: `yourContract.methods.methodname`. `call` फंक्शन वापरून तुम्हाला फंक्शन कार्यान्वित केल्याचा परिणाम मिळेल.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

लक्षात ठेवा की DAI ERC-20 मध्ये 18 दशांश (decimals) आहेत, याचा अर्थ योग्य रक्कम मिळवण्यासाठी तुम्हाला 18 शून्य काढावे लागतील. JavaScript मोठ्या अंकीय मूल्यांना हाताळत नसल्यामुळे uint256 स्ट्रिंग म्हणून परत केले जातात. जर तुम्हाला खात्री नसेल की [JS मध्ये मोठ्या संख्या कशा हाताळायच्या, तर bignumber.js बद्दलचे आमचे ट्युटोरिअल तपासा](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## सेंड: स्मार्ट कॉन्ट्रॅक्ट फंक्शनला व्यवहार पाठवणे {#send-sending-a-transaction-to-a-smart-contract-function}

दुसऱ्या उदाहरणासाठी आपण आपल्या दुसऱ्या पत्त्यावर 10 DAI पाठवण्यासाठी DAI स्मार्ट कॉन्ट्रॅक्टचे हस्तांतरण (transfer) फंक्शन कॉल करू. हस्तांतरण फंक्शन दोन पॅरामीटर्स स्वीकारते: प्राप्तकर्त्याचा पत्ता आणि हस्तांतरित करायच्या टोकनची रक्कम:

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

कॉल फंक्शन ब्लॉकचेनमध्ये माइन केल्या जाणाऱ्या व्यवहाराचा हॅश परत करते. इथेरियमवर, व्यवहाराचे हॅशेस अंदाजित करण्यायोग्य असतात - अशा प्रकारे आपण व्यवहार कार्यान्वित होण्यापूर्वी त्याचा हॅश मिळवू शकतो ([हॅशेस कसे मोजले जातात ते येथे जाणून घ्या](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

हे फंक्शन केवळ ब्लॉकचेनवर व्यवहार सबमिट करत असल्याने, जोपर्यंत तो माइन होऊन ब्लॉकचेनमध्ये समाविष्ट होत नाही तोपर्यंत आपण त्याचा परिणाम पाहू शकत नाही. पुढील ट्युटोरिअलमध्ये आपण [व्यवहाराचा हॅश जाणून घेऊन तो ब्लॉकचेनवर कार्यान्वित होण्याची प्रतीक्षा कशी करावी](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) हे शिकू.