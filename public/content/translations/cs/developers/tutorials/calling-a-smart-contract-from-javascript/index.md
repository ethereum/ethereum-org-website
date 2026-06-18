---
title: "Volání chytrého kontraktu z JavaScriptu"
description: "Jak zavolat funkci chytrého kontraktu z JavaScriptu na příkladu tokenu DAI"
author: jdourlens
tags:
  - transakce
  - frontend
  - JavaScript
  - web3.js
skill: beginner
breadcrumb: "Volání kontraktů z JS"
lang: cs
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V tomto tutoriálu si ukážeme, jak zavolat funkci [chytrého kontraktu](/developers/docs/smart-contracts/) z JavaScriptu. Nejprve si přečteme stav chytrého kontraktu (např. zůstatek držitele ERC-20), poté upravíme stav blockchainu provedením převodu tokenů. Měli byste již být obeznámeni s [nastavením JS prostředí pro interakci s blockchainem](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Pro tento příklad si budeme hrát s tokenem DAI. Pro účely testování provedeme fork blockchainu pomocí ganache-cli a odemkneme adresu, která již má velké množství DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Pro interakci s chytrým kontraktem budeme potřebovat jeho adresu a ABI:

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

Pro tento projekt jsme osekali kompletní ABI ERC-20 a ponechali pouze funkce `balanceOf` a `transfer`, ale [kompletní ABI ERC-20 najdete zde](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Následně musíme vytvořit instanci našeho chytrého kontraktu:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Také si nastavíme dvě adresy:

- tu, která převod přijme, a
- tu, kterou jsme již odemkli a která jej odešle:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

V další části zavoláme funkci `balanceOf`, abychom získali aktuální množství tokenů, které obě adresy drží.

## Call: Čtení hodnoty z chytrého kontraktu {#call-reading-value-from-a-smart-contract}

První příklad zavolá „konstantní“ metodu a provede metodu chytrého kontraktu v EVM bez odeslání jakékoli transakce. Za tímto účelem přečteme zůstatek ERC-20 na dané adrese. [Přečtěte si náš článek o tokenech ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

K metodám instance chytrého kontraktu, pro které jste poskytli ABI, můžete přistupovat následovně: `yourContract.methods.methodname`. Použitím funkce `call` získáte výsledek provedení této funkce.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Pamatujte, že DAI ERC-20 má 18 desetinných míst, což znamená, že pro získání správné částky musíte odstranit 18 nul. Hodnoty uint256 jsou vraceny jako řetězce (strings), protože JavaScript si s velkými číselnými hodnotami neporadí. Pokud si nejste jisti, [jak pracovat s velkými čísly v JS, podívejte se na náš tutoriál o bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Send: Odeslání transakce do funkce chytrého kontraktu {#send-sending-a-transaction-to-a-smart-contract-function}

Ve druhém příkladu zavoláme funkci transfer chytrého kontraktu DAI, abychom odeslali 10 DAI na naši druhou adresu. Funkce transfer přijímá dva parametry: adresu příjemce a množství tokenů k převodu:

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

Funkce call vrací hash transakce, která bude vytěžena do blockchainu. Na Ethereu jsou hashe transakcí předvídatelné – díky tomu můžeme získat hash transakce ještě před jejím provedením ([zde se dozvíte, jak se hashe počítají](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Jelikož tato funkce pouze odesílá transakci do blockchainu, neuvidíme výsledek, dokud nezjistíme, kdy je vytěžena a zahrnuta do blockchainu. V dalším tutoriálu se naučíme, [jak počkat na provedení transakce na blockchainu na základě znalosti jejího hashe](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).