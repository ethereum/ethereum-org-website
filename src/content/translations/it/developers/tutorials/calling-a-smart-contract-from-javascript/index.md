---
title: Chiamare uno Smart Contract da JavaScript
description: Come chiamare una funzione di Smart Contract da JavaScript utilizzando un esempio di token Dai
author: jdourlens
tags:
  - "transazioni"
  - "frontend"
  - "JavaScript"
  - "web3.js"
skill: beginner
lang: it
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In questo tutorial vedremo come chiamare una funzione di [Smart Contract](/developers/docs/smart-contracts/) da JavaScript. Prima viene letto lo stato di uno Smart Contract (ad esempio il saldo di un titolare ERC20), poi modificheremo lo stato della blockchain effettuando un trasferimento di token. Dovresti avere già famigliarità con la [configurazione di un ambiente JS per interagire con la blockchain](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Per questi esempi utilizzeremo il token DAI, a scopo di test creeremo una diramazione della blockchain usando ganache-cli e sbloccheremo un indirizzo che ha già molti DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Per interagire con uno Smart Contract ci servirà il suo indirizzo e l'ABI:

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

Per questo progetto abbiamo ridotto l'ABI completa di ERC20 tenendo solo le funzioni `balanceOf` e `transfer`, ma potete trovare [qui l'ABI di ERC20 completa](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Poi dobbiamo istanziare il nostro Smart Contract:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Configuriamo inoltre due indirizzi:

- quello che riceverà il trasferimento e
- quello che abbiamo già sbloccato che lo invierà:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Nella prossima parte chiameremo la funzione `balanceOf` per recuperare l'importo corrente di token posseduto da entrambi gli indirizzi.

## Call: lettura del valore da uno Smart Contract {#call-reading-value-from-a-smart-contract}

Il primo esempio chiamerà un metodo di una "costante" e ne eseguirà il metodo dello Smart Contract nell'EVM senza inviare alcuna transazione. Per questo leggeremo il saldo di ERC20 di un indirizzo. [Leggi il nostro articolo sui token ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Puoi accedere ai metodi di uno smart contract istanziato per cui hai fornito l'ABI come segue: `yourContract.methods.methodname`. Usando la funzione `call` riceverai il risultato dell'esecuzione della funzione.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occured", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Ricorda che il ERC20 DAI ha 18 cifre decimali, che significa che devi rimuovere 18 zeri per ottenere l'importo corretto. I valori uint256 sono restituiti come stringhe, poiché JavaScript non gestisce i grandi valori numerici. Se non sai [come gestire i grandi numeri in JS consulta il nostro tutorial su bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Send: invio di una transazione a una funzione di Smart Contract {#send-sending-a-transaction-to-a-smart-contract-function}

Per il secondo esempio chiamiamo la funzione di trasferimento dello Smart Contract DAI per inviare 10 DAI al nostro secondo indirizzo. La funzione di trasferimento accetta due parametri: l'indirizzo del destinatario e l'importo di token da trasferire:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occured", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

La funzione di chiamata restituisce l'hash della transazione di cui verrà eseguito il mining nella blockchain. Su Ethereum, gli hash delle transazioni sono prevedibili; è così che possiamo ottenere l'hash della transazione prima che questa venga eseguita ([vedi qui come sono calcolati gli hash](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Poiché la funzione non fa altro che inviare la transazione alla blockchain, non possiamo vedere il risultato finché non sappiamo quando ne viene eseguito il mining e quando viene inclusa nella blockchain. Nel prossimo tutorial impareremo [come attendere l'esecuzione di una transazione sulla blockchain conoscendone l'hash](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
