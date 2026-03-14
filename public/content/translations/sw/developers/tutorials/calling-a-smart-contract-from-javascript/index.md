---
title: Kuita mkataba-erevu kutoka kwa JavaScript
description: Jinsi ya kuita utendakazi wa mkataba-erevu kutoka kwa JavaScript kwa kutumia mfano wa tokeni ya Dai
author: jdourlens
tags: [ "miamala", "frontend", "JavaScript", "web3.js" ]
skill: beginner
lang: sw
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika mafunzo haya tutaona jinsi ya kuita utendakazi wa [mkataba-erevu](/developers/docs/smart-contracts/) kutoka kwa JavaScript. Kwanza ni kusoma hali ya mkataba-erevu (k.m., salio la mwenye ERC20), kisha tutarekebisha hali ya mnyororo wa bloku kwa kufanya uhamisho wa tokeni. Unapaswa kuwa tayari unafahamu kuhusu [kuweka mazingira ya JS ili kuingiliana na mnyororo wa bloku](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Kwa mfano huu tutacheza na tokeni ya DAI, kwa madhumuni ya majaribio tutagawa mnyororo wa bloku kwa kutumia ganache-cli na kufungua anwani ambayo tayari ina DAI nyingi:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[UFUNGUO WAKO WA INFURA] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Ili kuingiliana na mkataba-erevu tutahitaji anwani yake na ABI:

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

Kwa mradi huu, tuliondoa ABI kamili ya ERC20 ili kuweka tu utendakazi wa `balanceOf` na `transfer` lakini unaweza kupata [ABI kamili ya ERC20 hapa](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Kisha tunahitaji kuanzisha mkataba wetu-erevu:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Pia tutaweka anwani mbili:

- anayepokea uhamisho na
- ambayo tayari tumeifungua ambayo itatuma:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Katika sehemu inayofuata tutaita utendakazi wa `balanceOf` ili kupata kiasi cha sasa cha tokeni ambazo anwani zote mbili zinashikilia.

## Wito: Kusoma thamani kutoka kwa mkataba-erevu {#call-reading-value-from-a-smart-contract}

Mfano wa kwanza utaita mbinu ya "kudumu" na kutekeleza mbinu yake ya mkataba-erevu katika EVM bila kutuma muamala wowote. Kwa hili tutasoma salio la ERC20 la anwani. [Soma makala yetu kuhusu tokeni za ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Unaweza kufikia mbinu za mkataba-erevu ulioanzishwa ambao umetoa ABI yake kama ifuatavyo: `yourContract.methods.methodname`. Kwa kutumia utendakazi wa `call` utapokea matokeo ya kutekeleza utendakazi.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("Kosa limetokea", err)
    return
  }
  console.log("Salio ni: ", res)
})
```

Kumbuka kuwa DAI ERC20 ina desimali 18, kumaanisha unahitaji kuondoa sufuri 18 ili kupata kiasi sahihi. `uint256` hurejeshwa kama mifuatano kwa kuwa JavaScript haishughulikii thamani kubwa za nambari. Ikiwa huna uhakika [jinsi ya kushughulikia nambari kubwa katika JS angalia mafunzo yetu kuhusu bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Tuma: Kutuma muamala kwa utendakazi wa mkataba-erevu {#send-sending-a-transaction-to-a-smart-contract-function}

Kwa mfano wa pili tutaita utendakazi wa uhamisho wa mkataba-erevu wa DAI ili kutuma DAI 10 kwa anwani yetu ya pili. Utendakazi wa uhamisho unakubali vigezo viwili: anwani ya mpokeaji na kiasi cha tokeni za kuhamisha:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("Kosa limetokea", err)
      return
    }
    console.log("Hashi ya muamala: " + res)
  })
```

Utendakazi wa `call` hurejesha hashi ya muamala ambayo itachimbwa kwenye mnyororo wa bloku. Kwenye Ethereum, hashi za miamala zinatabirika - hivyo ndivyo tunavyoweza kupata hashi ya muamala kabla haujatekelezwa ([jifunze jinsi hashi zinavyokokotolewa hapa](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Kwa kuwa utendakazi huwasilisha tu muamala kwenye mnyororo wa bloku, hatuwezi kuona matokeo hadi tujue ni lini utachimbwa na kujumuishwa kwenye mnyororo wa bloku. Katika mafunzo yanayofuata tutajifunza [jinsi ya kusubiri muamala utekelezwe kwenye mnyororo wa bloku kwa kujua hashi yake](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
