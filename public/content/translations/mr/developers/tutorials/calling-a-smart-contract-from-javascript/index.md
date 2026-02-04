---
title: "JavaScript मधून स्मार्ट कॉन्ट्रॅक्टला कॉल करणे"
description: "Dai टोकनच्या उदाहरणाचा वापर करून JavaScript मधून स्मार्ट कॉन्ट्रॅक्ट फंक्शनला कसे कॉल करावे"
author: jdourlens
tags: [ "व्यवहार", "frontend", "JavaScript", "web3.js" ]
skill: beginner
lang: mr
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

या ट्युटोरियलमध्ये आपण JavaScript मधून [स्मार्ट कॉन्ट्रॅक्ट](/developers/docs/smart-contracts/) फंक्शनला कसे कॉल करायचे ते पाहू. पहिले म्हणजे स्मार्ट कॉन्ट्रॅक्टची स्थिती वाचणे (उदा., ERC20 धारकाची शिल्लक), त्यानंतर आपण टोकन हस्तांतरण करून ब्लॉकचेनची स्थिती सुधारित करू. तुम्ही आधीच [ब्लॉकचेनशी संवाद साधण्यासाठी JS पर्यावरण सेट करण्याशी](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) परिचित असले पाहिजे.

या उदाहरणासाठी आपण DAI टोकन वापरणार आहोत, चाचणीच्या उद्देशाने आपण ganache-cli वापरून ब्लॉकचेन फोर्क करू आणि असा ॲड्रेस अनलॉक करू ज्यात आधीच खूप DAI आहेत:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[तुमची इन्फ्युरा की] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

स्मार्ट कॉन्ट्रॅक्टशी संवाद साधण्यासाठी आपल्याला त्याचा ॲड्रेस आणि ABI लागेल:

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

या प्रोजेक्टसाठी आम्ही फक्त `balanceOf` आणि `transfer` फंक्शन ठेवण्यासाठी संपूर्ण ERC20 ABI मधून अनावश्यक भाग काढला आहे पण तुम्ही [संपूर्ण ERC20 ABI येथे](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) शोधू शकता.

त्यानंतर आपल्याला आपला स्मार्ट कॉन्ट्रॅक्ट सुरू करण्याची गरज आहे:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

आपण दोन ॲड्रेस देखील सेट करू:

- ज्याला हस्तांतरण मिळेल तो आणि
- आपण आधीच अनलॉक केलेला जो ते पाठवेल:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

पुढील भागात आपण दोन्ही ॲड्रेसकडे असलेल्या टोकन्सची सध्याची रक्कम मिळवण्यासाठी `balanceOf` फंक्शनला कॉल करू.

## कॉल: स्मार्ट कॉन्ट्रॅक्टमधून मूल्य वाचणे {#call-reading-value-from-a-smart-contract}

पहिले उदाहरण कोणतेही ट्रान्झॅक्शन न पाठवता एक “कॉन्स्टन्ट” मेथड कॉल करेल आणि EVM मध्ये त्याचे स्मार्ट कॉन्ट्रॅक्ट मेथड कार्यान्वित करेल. यासाठी आपण एका ॲड्रेसची ERC20 शिल्लक वाचू. [ERC20 टोकन्सबद्दल आमचा लेख वाचा](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

तुम्ही `yourContract.methods.methodname` अशाप्रकारे इन्स्टन्शिएट केलेल्या स्मार्ट कॉन्ट्रॅक्टच्या मेथड्समध्ये प्रवेश करू शकता ज्यासाठी तुम्ही ABI प्रदान केले आहे. `call` फंक्शन वापरून तुम्हाला फंक्शन कार्यान्वित केल्याचा परिणाम मिळेल.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("एक त्रुटी आली", err)
    return
  }
  console.log("शिल्लक आहे: ", res)
})
```

लक्षात ठेवा की DAI ERC20 मध्ये 18 दशांश स्थळे आहेत, याचा अर्थ योग्य रक्कम मिळवण्यासाठी तुम्हाला 18 शून्य काढावे लागतील. JavaScript मोठ्या अंकीय मूल्यांना हाताळू शकत नसल्यामुळे uint256 स्ट्रिंग म्हणून परत केले जातात. तुम्हाला खात्री नसेल तर [JS मध्ये मोठ्या संख्या कशा हाताळायच्या याबद्दल आमचे bignumber.js वरील ट्युटोरियल पहा](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## पाठवा: स्मार्ट कॉन्ट्रॅक्ट फंक्शनला ट्रान्झॅक्शन पाठवणे {#send-sending-a-transaction-to-a-smart-contract-function}

दुसऱ्या उदाहरणासाठी, आपण आपल्या दुसऱ्या ॲड्रेसवर 10 DAI पाठवण्यासाठी DAI स्मार्ट कॉन्ट्रॅक्टच्या ट्रान्स्फर फंक्शनला कॉल करू. ट्रान्स्फर फंक्शन दोन पॅरामीटर्स स्वीकारते: प्राप्तकर्त्याचा ॲड्रेस आणि हस्तांतरित करायच्या टोकनची रक्कम:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("एक त्रुटी आली", err)
      return
    }
    console.log("ट्रान्झॅक्शनचा हॅश: " + res)
  })
```

कॉल फंक्शन त्या ट्रान्झॅक्शनचा हॅश परत करतो जे ब्लॉकचेनमध्ये माइन केले जाईल. Ethereum वर, ट्रान्झॅक्शन हॅश अंदाजित असतात - म्हणूनच आपण ट्रान्झॅक्शन कार्यान्वित होण्यापूर्वी त्याचा हॅश मिळवू शकतो ([हॅश कसे मोजले जातात ते येथे शिका](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

हे फंक्शन फक्त ब्लॉकचेनवर ट्रान्झॅक्शन सबमिट करत असल्यामुळे, ते माइन होऊन ब्लॉकचेनमध्ये समाविष्ट होईपर्यंत आपण निकाल पाहू शकत नाही. पुढील ट्युटोरियलमध्ये आपण [ब्लॉकचेनवर ट्रान्झॅक्शन कार्यान्वित होण्याची वाट कशी पाहायची, त्याचा हॅश जाणून घेऊन शिकू](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
