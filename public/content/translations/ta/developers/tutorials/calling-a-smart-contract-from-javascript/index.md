---
title: "ஜாவாஸ்கிரிப்டிலிருந்து ஒரு ஸ்மார்ட் ஒப்பந்தத்தை அழைத்தல்"
description: "ஒரு Dai டோக்கன் உதாரணத்தைப் பயன்படுத்தி ஜாவாஸ்கிரிப்டிலிருந்து ஒரு ஸ்மார்ட் ஒப்பந்தச் செயல்பாட்டை அழைப்பது எப்படி"
author: jdourlens
tags:
  [
    "பரிவர்த்தனைகள்",
    "frontend",
    "ஜாவாஸ்கிரிப்ட்",
    "web3.js"
  ]
skill: beginner
lang: ta
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

இந்த டுடோரியலில், ஜாவாஸ்கிரிப்டிலிருந்து ஒரு [ஸ்மார்ட் ஒப்பந்தச்](/developers/docs/smart-contracts/) செயல்பாட்டை எப்படி அழைப்பது என்று பார்ப்போம். முதலில் ஒரு ஸ்மார்ட் ஒப்பந்தத்தின் நிலையைப் படிப்பது (எ.கா., ஒரு ERC20 வைத்திருப்பவரின் இருப்பு), பின்னர் ஒரு டோக்கன் பரிமாற்றம் செய்வதன் மூலம் பிளாக்செயினின் நிலையை மாற்றுவோம். [பிளாக்செயினுடன் தொடர்பு கொள்ள ஒரு JS சூழலை அமைப்பது](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) பற்றி நீங்கள் ஏற்கனவே அறிந்திருக்க வேண்டும்.

இந்த உதாரணத்திற்கு நாம் DAI டோக்கனுடன் விளையாடுவோம், சோதனை நோக்கத்திற்காக ganache-cli ஐப் பயன்படுத்தி பிளாக்செயினை ஃபோர்க் செய்து, ஏற்கனவே நிறைய DAI வைத்திருக்கும் ஒரு முகவரியைத் திறப்போம்:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[உங்கள் இன்ஃப்யூரா சாவி] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

ஒரு ஸ்மார்ட் ஒப்பந்தத்துடன் தொடர்பு கொள்ள, அதன் முகவரி மற்றும் ABI தேவைப்படும்:

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

இந்தத் திட்டத்திற்காக, `balanceOf` மற்றும் `transfer` செயல்பாடுகளை மட்டும் வைத்திருக்க முழுமையான ERC20 ABI-ஐ நாங்கள் சுருக்கினோம். ஆனால் நீங்கள் [முழு ERC20 ABI-ஐ இங்கே காணலாம்](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

பிறகு நாம் நமது ஸ்மார்ட் ஒப்பந்தத்தைத் தொடங்கி வைக்க வேண்டும்:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

நாம் மேலும் இரண்டு முகவரிகளை அமைப்போம்:

- பரிமாற்றத்தைப் பெறுபவர் மற்றும்
- அதை அனுப்பும், நாம் ஏற்கனவே திறந்த முகவரி:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

அடுத்த பகுதியில், இரு முகவரிகளும் வைத்திருக்கும் டோக்கன்களின் தற்போதைய அளவைப் பெற `balanceOf` செயல்பாட்டை அழைப்போம்.

## அழைப்பு: ஒரு ஸ்மார்ட் ஒப்பந்தத்திலிருந்து மதிப்பை வாசித்தல் {#call-reading-value-from-a-smart-contract}

முதல் உதாரணம் ஒரு “நிலையான” முறையை அழைத்து, எந்தவொரு பரிவர்த்தனையையும் அனுப்பாமல் அதன் ஸ்மார்ட் ஒப்பந்த முறையை EVM-ல் செயல்படுத்தும். இதற்காக நாம் ஒரு முகவரியின் ERC20 இருப்பை வாசிப்போம். [ERC20 டோக்கன்கள் பற்றிய எங்கள் கட்டுரையைப் படியுங்கள்](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

நீங்கள் ABI வழங்கிய ஒரு தொடக்கிவைக்கப்பட்ட ஸ்மார்ட் ஒப்பந்த முறைகளை பின்வருமாறு அணுகலாம்: `yourContract.methods.methodname`. `call` செயல்பாட்டைப் பயன்படுத்துவதன் மூலம், செயல்பாட்டைச் செயல்படுத்துவதன் முடிவைப் பெறுவீர்கள்.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("ஒரு பிழை ஏற்பட்டது", err)
    return
  }
  console.log("இருப்பு: ", res)
})
```

DAI ERC20, 18 தசமங்களைக் கொண்டுள்ளது என்பதை நினைவில் கொள்ளுங்கள், அதாவது சரியான தொகையைப் பெற நீங்கள் 18 பூஜ்ஜியங்களை அகற்ற வேண்டும். uint256 மதிப்புகள் சரங்களாகத் திருப்பியளிக்கப்படுகின்றன, ஏனெனில் ஜாவாஸ்கிரிப்ட் பெரிய எண் மதிப்புகளைக் கையாளாது. [JS-ல் பெரிய எண்களைக் கையாள்வது எப்படி என்று உங்களுக்குத் தெரியாவிட்டால், bignumber.js பற்றிய எங்கள் டுடோரியலைப் பார்க்கவும்](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## அனுப்பு: ஒரு ஸ்மார்ட் ஒப்பந்தச் செயல்பாட்டிற்கு ஒரு பரிவர்த்தனையை அனுப்புதல் {#send-sending-a-transaction-to-a-smart-contract-function}

இரண்டாவது உதாரணத்திற்கு, நமது இரண்டாவது முகவரிக்கு 10 DAI அனுப்ப DAI ஸ்மார்ட் ஒப்பந்தத்தின் பரிமாற்றச் செயல்பாட்டை அழைப்போம். பரிமாற்றச் செயல்பாடு இரண்டு அளவுருக்களை ஏற்றுக்கொள்கிறது: பெறுநரின் முகவரி மற்றும் பரிமாற்றத்திற்கான டோக்கனின் அளவு:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("ஒரு பிழை ஏற்பட்டது", err)
      return
    }
    console.log("பரிவர்த்தனையின் ஹாஷ்: " + res)
  })
```

அழைப்புச் செயல்பாடு பிளாக்செயினில் மைன் செய்யப்படும் பரிவர்த்தனையின் ஹாஷைத் திருப்பித் தருகிறது. எத்தேரியத்தில், பரிவர்த்தனை ஹாஷ்கள் கணிக்கக்கூடியவை - அதனால்தான் ஒரு பரிவர்த்தனை செயல்படுத்தப்படுவதற்கு முன்பு அதன் ஹாஷை நம்மால் பெற முடிகிறது ([ஹாஷ்கள் எவ்வாறு கணக்கிடப்படுகின்றன என்பதை இங்கே அறிக](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

இந்தச் செயல்பாடு பரிவர்த்தனையை பிளாக்செயினுக்கு மட்டுமே சமர்ப்பிப்பதால், அது எப்போது மைன் செய்யப்பட்டு பிளாக்செயினில் சேர்க்கப்படுகிறது என்பதை அறியும் வரை நம்மால் முடிவைப் பார்க்க முடியாது. அடுத்த டுடோரியலில், [ஒரு பரிவர்த்தனையின் ஹாஷை அறிந்து, அது பிளாக்செயினில் செயல்படுத்தப்படும் வரை எப்படி காத்திருப்பது என்பதை நாம் கற்றுக்கொள்வோம்](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
