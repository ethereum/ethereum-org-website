---
title: Volání chytrého kontraktu z JavaScriptu
description: Jak volat funkci chytrého kontraktu z JavaScriptu na příkladu tokenu Dai
author: jdourlens
tags: [ "transakce", "frontend", "JavaScript", "web3.js" ]
skill: beginner
lang: cs
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V tomto návodu si ukážeme, jak zavolat funkci [chytrého kontraktu](/developers/docs/smart-contracts/) z JavaScriptu. Nejprve si přečteme stav chytrého kontraktu (např. zůstatek držitele ERC20), poté změníme stav blockchainu provedením převodu tokenu. Měli byste již být obeznámeni s [nastavením prostředí JS pro interakci s blockchainem](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

V tomto příkladu budeme pracovat s tokenem DAI. Pro účely testování vytvoříme větev blockchainu pomocí ganache-cli a odemkneme adresu, která již má hodně DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[VÁŠ INFURA KLÍČ] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
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

Pro tento projekt jsme z kompletního ERC20 ABI ponechali pouze funkce `balanceOf` a `transfer`, ale [celé ERC20 ABI naleznete zde](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Poté musíme náš chytrý kontrakt instanciovat:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Také si nastavíme dvě adresy:

- tu, která obdrží převod, a
- tu, kterou jsme již odemkli a která ho odešle:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

V další části zavoláme funkci `balanceOf`, abychom zjistili aktuální množství tokenů, které obě adresy drží.

## Volání: Čtení hodnoty z chytrého kontraktu {#call-reading-value-from-a-smart-contract}

První příklad zavolá „konstantní“ metodu a spustí metodu chytrého kontraktu v EVM bez odeslání jakékoli transakce. Za tímto účelem si přečteme zůstatek ERC20 na adrese. [Přečtěte si náš článek o ERC20 tokenech](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

K metodám instanciovaného chytrého kontraktu, pro který jste poskytli ABI, můžete přistupovat následovně: `yourContract.methods.methodname`. Použitím funkce `call` obdržíte výsledek jejího spuštění.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("Došlo k chybě", err)
    return
  }
  console.log("Zůstatek je: ", res)
})
```

Pamatujte, že DAI ERC20 má 18 desetinných míst, což znamená, že pro získání správné částky musíte odstranit 18 nul. Hodnoty uint256 se vrací jako řetězce, protože JavaScript nezvládá velká číselné hodnoty. Pokud si nejste jisti, [jak zacházet s velkými čísly v JS, podívejte se na náš návod o bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Odeslání: Odeslání transakce do funkce chytrého kontraktu {#send-sending-a-transaction-to-a-smart-contract-function}

Ve druhém příkladu zavoláme funkci `transfer` chytrého kontraktu DAI, abychom odeslali 10 DAI na naši druhou adresu. Funkce `transfer` přijímá dva parametry: adresu příjemce a množství tokenů k převodu:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("Došlo k chybě", err)
      return
    }
    console.log("Haš transakce: " + res)
  })
```

Volání funkce vrátí haš transakce, která bude vytěžena v blockchainu. Na Ethereu jsou haše transakcí předvídatelné - tak můžeme získat haš transakce ještě před jejím spuštěním ([zde se dozvíte, jak se haše počítají](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Protože funkce pouze odešle transakci do blockchainu, neuvidíme výsledek, dokud nebudeme vědět, kdy bude vytěžena a zahrnuta do blockchainu. V příštím návodu se dozvíme, [jak počkat na provedení transakce na blockchainu, když známe její haš](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
