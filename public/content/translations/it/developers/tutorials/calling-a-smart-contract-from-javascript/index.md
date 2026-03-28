---
title: Chiamare un contratto intelligente da JavaScript
description: Come chiamare una funzione di un contratto intelligente da JavaScript usando un esempio con il token Dai
author: jdourlens
tags: ["transazioni", "frontend", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: Chiamare contratti da JS
lang: it
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In questo tutorial vedremo come chiamare una funzione di un [contratto intelligente](/developers/docs/smart-contracts/) da JavaScript. Prima leggeremo lo stato di un contratto intelligente (ad es., il saldo di un possessore di ERC20), poi modificheremo lo stato della blockchain effettuando un trasferimento di token. Dovresti avere già familiarità con la [configurazione di un ambiente JS per interagire con la blockchain](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Per questo esempio giocheremo con il token DAI, a scopo di test effettueremo una biforcazione della blockchain usando ganache-cli e sbloccheremo un indirizzo che ha già molti DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Per interagire con un contratto intelligente avremo bisogno del suo indirizzo e dell'ABI:

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

Per questo progetto abbiamo ridotto l'ABI completa dell'ERC20 per mantenere solo le funzioni `balanceOf` e `transfer`, ma puoi trovare [l'ABI completa dell'ERC20 qui](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Dobbiamo quindi istanziare il nostro contratto intelligente:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Imposteremo anche due indirizzi:

- quello che riceverà il trasferimento e
- quello che abbiamo già sbloccato che lo invierà:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Nella prossima parte chiameremo la funzione `balanceOf` per recuperare la quantità attuale di token posseduta da entrambi gli indirizzi.

## Call: Leggere un valore da un contratto intelligente {#call-reading-value-from-a-smart-contract}

Il primo esempio chiamerà un metodo "costante" ed eseguirà il suo metodo del contratto intelligente nella EVM senza inviare alcuna transazione. Per questo leggeremo il saldo ERC20 di un indirizzo. [Leggi il nostro articolo sui token ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Puoi accedere ai metodi di un contratto intelligente istanziato per cui hai fornito l'ABI nel modo seguente: `yourContract.methods.methodname`. Usando la funzione `call` riceverai il risultato dell'esecuzione della funzione.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Ricorda che il DAI ERC20 ha 18 decimali, il che significa che devi rimuovere 18 zeri per ottenere l'importo corretto. Gli uint256 vengono restituiti come stringhe poiché JavaScript non gestisce valori numerici grandi. Se non sei sicuro di [come gestire i grandi numeri in JS, dai un'occhiata al nostro tutorial su bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Send: Inviare una transazione a una funzione di un contratto intelligente {#send-sending-a-transaction-to-a-smart-contract-function}

Per il secondo esempio chiameremo la funzione di trasferimento del contratto intelligente DAI per inviare 10 DAI al nostro secondo indirizzo. La funzione di trasferimento accetta due parametri: l'indirizzo del destinatario e la quantità di token da trasferire:

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

La funzione call restituisce l'hash della transazione che verrà minata nella blockchain. Su Ethereum, gli hash delle transazioni sono prevedibili: ecco come possiamo ottenere l'hash della transazione prima che venga eseguita ([scopri come vengono calcolati gli hash qui](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Poiché la funzione invia solo la transazione alla blockchain, non possiamo vedere il risultato finché non sappiamo quando viene minata e inclusa nella blockchain. Nel prossimo tutorial impareremo [come attendere che una transazione venga eseguita sulla blockchain conoscendone l'hash](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).