---
title: JavaScript-லிருந்து ஒரு திறன் ஒப்பந்தத்தை அழைப்பது
description: Dai வில்லை உதாரணத்தைப் பயன்படுத்தி JavaScript-லிருந்து ஒரு திறன் ஒப்பந்தச் சார்பை (function) எவ்வாறு அழைப்பது
author: jdourlens
tags:
  - பரிவர்த்தனைகள்
  - முன்பக்கம்
  - JavaScript
  - web3.js
skill: beginner
breadcrumb: JS-லிருந்து ஒப்பந்தங்களை அழைப்பது
lang: ta
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

இந்த வழிகாட்டியில் JavaScript-லிருந்து ஒரு [திறன் ஒப்பந்தச்](/developers/docs/smart-contracts/) சார்பை (function) எவ்வாறு அழைப்பது என்பதைப் பார்ப்போம். முதலில் ஒரு திறன் ஒப்பந்தத்தின் நிலையைப் படிப்பது (உதாரணமாக, ஒரு ERC-20 வைத்திருப்பவரின் இருப்பு), பின்னர் ஒரு வில்லைப் பரிமாற்றத்தைச் செய்வதன் மூலம் தொகுதிச்சங்கிலியின் நிலையை மாற்றுவோம். [தொகுதிச்சங்கிலியுடன் தொடர்புகொள்ள ஒரு JS சூழலை அமைப்பது](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) பற்றி நீங்கள் ஏற்கனவே அறிந்திருக்க வேண்டும்.

இந்த உதாரணத்திற்காக நாம் DAI வில்லையைப் பயன்படுத்துவோம், சோதனை நோக்கத்திற்காக ganache-cli-ஐப் பயன்படுத்தி தொகுதிச்சங்கிலியைக் கவை (fork) செய்து, ஏற்கனவே நிறைய DAI உள்ள ஒரு முகவரியைத் திறப்போம் (unlock):

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

ஒரு திறன் ஒப்பந்தத்துடன் தொடர்புகொள்ள அதன் முகவரி மற்றும் ABI நமக்குத் தேவைப்படும்:

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

இந்தத் திட்டத்திற்காக, முழுமையான ERC-20 ABI-ஐச் சுருக்கி `balanceOf` மற்றும் `transfer` சார்புகளை (functions) மட்டுமே வைத்துள்ளோம், ஆனால் நீங்கள் [முழுமையான ERC-20 ABI-ஐ இங்கே காணலாம்](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

பின்னர் நமது திறன் ஒப்பந்தத்தை நாம் தொடங்க (instantiate) வேண்டும்:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

நாம் இரண்டு முகவரிகளையும் அமைப்போம்:

- பரிமாற்றத்தைப் பெறுபவர் மற்றும்
- அதை அனுப்பும், நாம் ஏற்கனவே திறந்த முகவரி:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

அடுத்த பகுதியில், இரண்டு முகவரிகளும் வைத்திருக்கும் தற்போதைய வில்லைகளின் அளவைப் பெற `balanceOf` சார்பை அழைப்போம்.

## அழைப்பு (Call): ஒரு திறன் ஒப்பந்தத்திலிருந்து மதிப்பைப் படிப்பது {#call-reading-value-from-a-smart-contract}

முதல் உதாரணம் ஒரு "மாறிலி" (constant) முறையை அழைக்கும் மற்றும் எந்தப் பரிவர்த்தனையையும் அனுப்பாமல் EVM-இல் அதன் திறன் ஒப்பந்த முறையைச் செயல்படுத்தும். இதற்காக ஒரு முகவரியின் ERC-20 இருப்பைப் படிப்போம். [ERC-20 வில்லைகள் பற்றிய எங்கள் கட்டுரையைப் படியுங்கள்](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

நீங்கள் ABI-ஐ வழங்கிய, தொடங்கப்பட்ட திறன் ஒப்பந்த முறைகளை பின்வருமாறு அணுகலாம்: `yourContract.methods.methodname`. `call` சார்பைப் பயன்படுத்துவதன் மூலம், சார்பைச் செயல்படுத்தியதன் முடிவைப் பெறுவீர்கள்.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

DAI ERC-20 18 தசமங்களைக் கொண்டுள்ளது என்பதை நினைவில் கொள்ளுங்கள், அதாவது சரியான அளவைப் பெற நீங்கள் 18 பூஜ்ஜியங்களை அகற்ற வேண்டும். JavaScript பெரிய எண் மதிப்புகளைக் கையாளாததால், uint256 சரங்களாக (strings) வழங்கப்படுகின்றன. [JS-இல் பெரிய எண்களை எப்படிக் கையாள்வது](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/) என்று உங்களுக்குத் தெரியாவிட்டால், bignumber.js பற்றிய எங்கள் வழிகாட்டியப் பார்க்கவும்.

## அனுப்புதல் (Send): ஒரு திறன் ஒப்பந்தச் சார்புக்குப் பரிவர்த்தனையை அனுப்புதல் {#send-sending-a-transaction-to-a-smart-contract-function}

இரண்டாவது உதாரணத்திற்கு, நமது இரண்டாவது முகவரிக்கு 10 DAI-ஐ அனுப்ப DAI திறன் ஒப்பந்தத்தின் பரிமாற்றச் (transfer) சார்பை அழைப்போம். பரிமாற்றச் சார்பு இரண்டு அளவுருக்களை (parameters) ஏற்றுக்கொள்கிறது: பெறுநரின் முகவரி மற்றும் பரிமாற்றம் செய்ய வேண்டிய வில்லைகளின் அளவு:

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

அழைப்புச் சார்பு (call function) தொகுதிச்சங்கிலியில் வெட்டியெடுக்கப்படும் (mined) பரிவர்த்தனையின் ஹாஷை வழங்குகிறது. எத்திரியத்தில், பரிவர்த்தனை ஹாஷ்களை கணிக்க முடியும் - அப்படித்தான் பரிவர்த்தனை செயல்படுத்தப்படுவதற்கு முன்பே அதன் ஹாஷை நாம் பெற முடியும் ([ஹாஷ்கள் எப்படிக் கணக்கிடப்படுகின்றன என்பதை இங்கே தெரிந்துகொள்ளுங்கள்](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

இந்தச் சார்பு பரிவர்த்தனையைத் தொகுதிச்சங்கிலியில் சமர்ப்பிப்பதால் மட்டுமே, அது எப்போது வெட்டியெடுக்கப்பட்டுத் தொகுதிச்சங்கிலியில் சேர்க்கப்படுகிறது என்பதை அறியும் வரை நம்மால் முடிவைப் பார்க்க முடியாது. அடுத்த வழிகாட்டியில், [ஒரு பரிவர்த்தனையின் ஹாஷை அறிந்துகொள்வதன் மூலம் அது தொகுதிச்சங்கிலியில் செயல்படுத்தப்படும் வரை எப்படிக் காத்திருப்பது](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) என்பதைக் கற்றுக்கொள்வோம்.