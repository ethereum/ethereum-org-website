---
title: Chiamare un contratto intelligente da JavaScript
description: Come chiamare la funzione di un contratto intelligente da JavaScript usando un esempio di token Dai
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

In questo tutorial vedremo come chiamare la funzione di un [Contratto Intelligente](/developers/docs/smart-contracts/) da JavaScript. Prima, bisogna leggere lo stato di un contratto intelligente (es. il saldo di un titolare di ERC20), poi modificheremo lo stato della blockchain effettuando un trasferimento di token. Dovresti esser già familiare con la [configurazione di un ambiente JS per interagire con la blockchain](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Per questo esempio, avremo a che fare con il token DAI e, per scopi di testing biforcheremo la blockchain usando ganache-cli e sbloccheremo un indirizzo che contiene già molti DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Per interagire con un contratto intelligente, avremo bisogno del suo indirizzo e ABI:

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

Per questo progetto abbiamo ridotto l'ABI completa dell'ERC20 per mantenere solo la funzione `balancecOf` e `transfer`, ma puoi trovare l'[ABI completa dell'ERC20 qui](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Poi dobbiamo istanziare il nostro contratto intelligente:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Inoltre, configureremo due indirizzi:

- quello che riceverà il trasferimento e
- quello che abbiamo già sbloccato che lo invierà:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Nella prossima parte, chiameremo la funzione `balanceOf` per recuperare l'importo corrente dei token posseduti da entrambi gli indirizzi.

## Chiamata: Leggere il valore da un contratto intelligente {#call-reading-value-from-a-smart-contract}

Il primo esempio chiamerà un metodo "constant" ed eseguirà il metodo del suo contratto intelligente nell'EVM, senza inviare alcuna transazione. Per questo leggeremo il saldo di ERC20 di un indirizzo. [Leggi il nostro articolo sui token ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Puoi accedere ai metodi di un contratto intelligente istanziato per cui hai fornito l'ABI come segue: `yourContract.methods.methodname`. Usando la funzione `call` riceverai il risultato dell'esecuzione della funzione.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occured", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Ricorda che l'ERC20 di DAI contiene 18 cifre decimali, il che significa che devi rimuovere 18 zeri per ottenere l'importo corretto. I valori uint256 sono restituiti come stringhe, poiché JavaScript non gestisce i grandi valori numerici. Se non sai [come gestire i grandi numeri in JS consulta il nostro tutorial su bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Invio: Inviare una transazione alla funzione di un contratto intelligente {#send-sending-a-transaction-to-a-smart-contract-function}

Per il secondo esempio, chiameremo la funzione di trasferimento del contratto intelligente di DAI per inviare 10 DAI al nostro secondo indirizzo. La funzione di trasferimento accetta due parametri: l'indirizzo del destinatario e l'importo di token da trasferire:

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

La funzione di chiamata restituiscec l'hash dedlla transazione che sarà minato nella blockchain. Su Ethereum, gli hash della transazione sono prevedibili, così possiamo ottenere l'hash della transazione prima che sia eseguita ([scopri qui come sono calcolati gli hash](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Poiché la funzione invia soltanto la transazione alla blockchain, non possiamo vedere il risultato finché non sappiamo quando è minato e incluso nella blockchain. Nel prossimo tutorial, impareremo [come attendedre l'esecuzione di una transazione, conoscendone l'hash](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
