---
title: Kuita mkataba mahiri kutoka kwenye JavaScript
description: Jinsi ya kuita kipengele cha mkataba mahiri kutoka kwenye JavaScript kwa kutumia mfano wa tokeni ya Dai
author: jdourlens
tags: ["miamala", "frontend", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: Ita mikataba kutoka kwenye JS
lang: sw
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika mafunzo haya tutaona jinsi ya kuita kipengele cha [mkataba mahiri](/developers/docs/smart-contracts/) kutoka kwenye JavaScript. Kwanza ni kusoma hali ya mkataba mahiri (k.m., salio la mmiliki wa ERC-20), kisha tutabadilisha hali ya mnyororo wa vitalu kwa kufanya hamisho la tokeni. Unapaswa kuwa tayari unafahamu [kuweka mazingira ya JS ili kuingiliana na mnyororo wa vitalu](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Kwa mfano huu tutacheza na tokeni ya DAI, kwa madhumuni ya majaribio tutafanya mchepuo wa mnyororo wa vitalu kwa kutumia ganache-cli na kufungua anwani ambayo tayari ina DAI nyingi:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Ili kuingiliana na mkataba mahiri tutahitaji anwani yake na ABI:

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

Kwa mradi huu tuliondoa ABI kamili ya ERC-20 ili kubakiza tu kipengele cha `balanceOf` na `transfer` lakini unaweza kupata [ABI kamili ya ERC-20 hapa](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Kisha tunahitaji kuanzisha mkataba mahiri wetu:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Pia tutaweka anwani mbili:

- ile itakayopokea hamisho na
- ile tuliyokwisha ifungua ambayo itatuma:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Katika sehemu inayofuata tutaita kipengele cha `balanceOf` ili kupata kiasi cha sasa cha tokeni ambacho anwani zote mbili zinashikilia.

## Kuita: Kusoma thamani kutoka kwenye mkataba mahiri {#call-reading-value-from-a-smart-contract}

Mfano wa kwanza utaita mbinu "isiyobadilika" na kutekeleza mbinu yake ya mkataba mahiri katika EVM bila kutuma muamala wowote. Kwa hili tutasoma salio la ERC-20 la anwani. [Soma makala yetu kuhusu tokeni za ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Unaweza kufikia mbinu za mkataba mahiri ulioanzishwa ambao ulitoa ABI yake kama ifuatavyo: `yourContract.methods.methodname`. Kwa kutumia kipengele cha `call` utapokea matokeo ya utekelezaji wa kipengele hicho.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Kumbuka kwamba DAI ERC-20 ina desimali 18 ambayo inamaanisha unahitaji kuondoa sifuri 18 ili kupata kiasi sahihi. uint256 inarejeshwa kama mifuatano kwa kuwa JavaScript haishughulikii thamani kubwa za namba. Ikiwa huna uhakika [jinsi ya kushughulika na namba kubwa katika JS angalia mafunzo yetu kuhusu bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Kutuma: Kutuma muamala kwenye kipengele cha mkataba mahiri {#send-sending-a-transaction-to-a-smart-contract-function}

Kwa mfano wa pili tutaita kipengele cha hamisho cha mkataba mahiri wa DAI ili kutuma DAI 10 kwenye anwani yetu ya pili. Kipengele cha hamisho kinakubali vigezo viwili: anwani ya mpokeaji na kiasi cha tokeni cha kuhamisha:

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

Kipengele cha kuita kinarejesha heshi ya muamala utakaofanyiwa uchimbaji kwenye mnyororo wa vitalu. Kwenye Ethereum, heshi za miamala zinatabirika - ndivyo tunavyoweza kupata heshi ya muamala kabla haujatekelezwa ([jifunze jinsi heshi zinavyohesabiwa hapa](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Kwa kuwa kipengele kinawasilisha tu muamala kwenye mnyororo wa vitalu, hatuwezi kuona matokeo hadi tujue utakapochimbwa na kujumuishwa kwenye mnyororo wa vitalu. Katika mafunzo yanayofuata tutajifunza [jinsi ya kusubiri muamala utekelezwe kwenye mnyororo wa vitalu kwa kujua heshi yake](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).