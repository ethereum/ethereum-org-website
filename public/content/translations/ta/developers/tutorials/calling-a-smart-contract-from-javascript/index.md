---
title: "JavaScript-லிருந்து ஒரு ஸ்மார்ட் ஒப்பந்தத்தை அழைப்பது"
description: "Dai டோக்கன் உதாரணத்தைப் பயன்படுத்தி JavaScript-லிருந்து ஒரு ஸ்மார்ட் ஒப்பந்தச் செயல்பாட்டை எவ்வாறு அழைப்பது"
author: jdourlens
tags: ["பரிவர்த்தனைகள்", "முன்பக்கம்", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: "JS-லிருந்து ஒப்பந்தங்களை அழைப்பது"
lang: ta
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

இந்த டுடோரியலில் JavaScript-லிருந்து ஒரு [ஸ்மார்ட் ஒப்பந்தச்](/developers/docs/smart-contracts/) செயல்பாட்டை எவ்வாறு அழைப்பது என்பதைப் பார்ப்போம். முதலில் ஒரு ஸ்மார்ட் ஒப்பந்தத்தின் நிலையைப் படிப்பது (எ.கா., ஒரு ERC20 வைத்திருப்பவரின் இருப்பு), பின்னர் ஒரு டோக்கன் பரிமாற்றத்தைச் செய்வதன் மூலம் பிளாக்செயினின் நிலையை மாற்றுவோம். [பிளாக்செயினுடன் தொடர்புகொள்வதற்கு ஒரு JS சூழலை அமைப்பது](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) குறித்து நீங்கள் ஏற்கனவே அறிந்திருக்க வேண்டும்.

இந்த உதாரணத்திற்கு நாம் DAI டோக்கனுடன் விளையாடுவோம், சோதனை நோக்கத்திற்காக ganache-cli-ஐப் பயன்படுத்தி பிளாக்செயினை ஃபோர்க் (fork) செய்வோம் மற்றும் ஏற்கனவே நிறைய DAI உள்ள ஒரு முகவரியைத் திறப்போம்:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

ஒரு ஸ்மார்ட் ஒப்பந்தத்துடன் தொடர்புகொள்ள நமக்கு அதன் முகவரி மற்றும் ABI தேவைப்படும்:

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

இந்தத் திட்டத்திற்காக, `balanceOf` மற்றும் `transfer` செயல்பாட்டை மட்டும் வைத்திருக்க முழுமையான ERC20 ABI-ஐ நாங்கள் சுருக்கியுள்ளோம், ஆனால் நீங்கள் [முழு ERC20 ABI-ஐ இங்கே காணலாம்](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

பின்னர் நமது ஸ்மார்ட் ஒப்பந்தத்தை இன்ஸ்டான்ஷியேட் (instantiate) செய்ய வேண்டும்:

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

அடுத்த பகுதியில், இரண்டு முகவரிகளும் வைத்திருக்கும் தற்போதைய டோக்கன்களின் அளவைப் பெற `balanceOf` செயல்பாட்டை அழைப்போம்.

## அழைப்பு: ஒரு ஸ்மார்ட் ஒப்பந்தத்திலிருந்து மதிப்பைப் படித்தல் {#call-reading-value-from-a-smart-contract}

முதல் உதாரணம் ஒரு "மாறிலி" (constant) முறையை அழைக்கும் மற்றும் எந்தப் பரிவர்த்தனையையும் அனுப்பாமல் EVM-ல் அதன் ஸ்மார்ட் ஒப்பந்த முறையைச் செயல்படுத்தும். இதற்காக ஒரு முகவரியின் ERC20 இருப்பைப் படிப்போம். [ERC20 டோக்கன்கள் பற்றிய எங்கள் கட்டுரையைப் படியுங்கள்](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

நீங்கள் ABI-ஐ வழங்கிய இன்ஸ்டான்ஷியேட் செய்யப்பட்ட ஸ்மார்ட் ஒப்பந்த முறைகளை பின்வருமாறு அணுகலாம்: `yourContract.methods.methodname`. `call` செயல்பாட்டைப் பயன்படுத்துவதன் மூலம், செயல்பாட்டைச் செயல்படுத்தியதன் முடிவைப் பெறுவீர்கள்.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

DAI ERC20-ல் 18 தசமங்கள் உள்ளன என்பதை நினைவில் கொள்ளுங்கள், அதாவது சரியான தொகையைப் பெற நீங்கள் 18 பூஜ்ஜியங்களை அகற்ற வேண்டும். JavaScript பெரிய எண் மதிப்புகளைக் கையாளாததால் uint256 சரங்களாக (strings) வழங்கப்படுகின்றன. உங்களுக்கு உறுதியாகத் தெரியவில்லை என்றால் [JS-ல் பெரிய எண்களை எப்படிக் கையாள்வது என்பது குறித்து bignumber.js பற்றிய எங்கள் டுடோரியலைப் பார்க்கவும்](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## அனுப்புதல்: ஒரு ஸ்மார்ட் ஒப்பந்தச் செயல்பாட்டிற்குப் பரிவர்த்தனையை அனுப்புதல் {#send-sending-a-transaction-to-a-smart-contract-function}

இரண்டாவது உதாரணத்திற்கு, நமது இரண்டாவது முகவரிக்கு 10 DAI-ஐ அனுப்ப DAI ஸ்மார்ட் ஒப்பந்தத்தின் பரிமாற்றச் (transfer) செயல்பாட்டை அழைப்போம். பரிமாற்றச் செயல்பாடு இரண்டு அளவுருக்களை (parameters) ஏற்றுக்கொள்கிறது: பெறுநரின் முகவரி மற்றும் பரிமாற்றம் செய்ய வேண்டிய டோக்கனின் அளவு:

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

அழைப்புச் செயல்பாடு பிளாக்செயினில் மைன் செய்யப்படவுள்ள பரிவர்த்தனையின் ஹாஷை (hash) வழங்குகிறது. Ethereum-ல், பரிவர்த்தனை ஹாஷ்களை கணிக்க முடியும் - அப்படித்தான் பரிவர்த்தனை செயல்படுத்தப்படுவதற்கு முன்பே அதன் ஹாஷை நாம் பெற முடியும் ([ஹாஷ்கள் எவ்வாறு கணக்கிடப்படுகின்றன என்பதை இங்கே தெரிந்துகொள்ளுங்கள்](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

செயல்பாடு பிளாக்செயினில் பரிவர்த்தனையை மட்டுமே சமர்ப்பிப்பதால், அது எப்போது மைன் செய்யப்பட்டு பிளாக்செயினில் சேர்க்கப்படுகிறது என்பதை அறியும் வரை நம்மால் முடிவைப் பார்க்க முடியாது. அடுத்த டுடோரியலில் [ஒரு பரிவர்த்தனையின் ஹாஷை அறிந்துகொள்வதன் மூலம் அது பிளாக்செயினில் செயல்படுத்தப்படும் வரை எப்படிக் காத்திருப்பது](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) என்பதைக் கற்றுக்கொள்வோம்.