---
title: Chiamare un contratto intelligente da JavaScript
description: Come chiamare la funzione di un contratto intelligente da JavaScript usando un esempio di token Dai
author: jdourlens
tags: [ "transazioni", "frontend", "JavaScript", "web3.js" ]
skill: beginner
lang: it
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In questa guida vedremo come chiamare una funzione di un [contratto intelligente](/developers/docs/smart-contracts/) da JavaScript. Per prima cosa, leggeremo lo stato di un contratto intelligente (ad es. il saldo di un detentore di ERC20), dopodiché modificheremo lo stato della blockchain effettuando un trasferimento di token. Dovresti già avere familiarità con la [configurazione di un ambiente JS per interagire con la blockchain](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Per questo esempio, utilizzeremo il token DAI; a scopo di test, effettueremo una biforcazione della blockchain utilizzando ganache-cli e sbloccheremo un indirizzo che possiede già molti DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[LA TUA CHIAVE INFURA] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Per interagire con un contratto intelligente, avremo bisogno del suo indirizzo e della sua ABI:

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

Per questo progetto abbiamo ridotto l'ABI ERC20 completa per mantenere solo le funzioni `balanceOf` e `transfer`, ma puoi trovare [l'ABI ERC20 completa qui](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

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

Nella parte successiva, chiameremo la funzione `balanceOf` per recuperare l'importo corrente di token posseduti da entrambi gli indirizzi.

## Chiamata: leggere il valore da un contratto intelligente {#call-reading-value-from-a-smart-contract}

Il primo esempio chiamerà un metodo "constant" ed eseguirà il suo metodo del contratto intelligente nell'EVM senza inviare alcuna transazione. Per questo, leggeremo il saldo ERC20 di un indirizzo. [Leggi il nostro articolo sui token ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Puoi accedere ai metodi di un contratto intelligente istanziato per il quale hai fornito l'ABI come segue: `yourContract.methods.methodname`. Utilizzando la funzione `call` riceverai il risultato dell'esecuzione della funzione.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("Si è verificato un errore", err)
    return
  }
  console.log("Il saldo è: ", res)
})
```

Ricorda che DAI ERC20 ha 18 decimali, il che significa che devi rimuovere 18 zeri per ottenere l'importo corretto. I valori uint256 vengono restituiti come stringhe, poiché JavaScript non gestisce valori numerici grandi. Se non sei sicuro di [come gestire i numeri grandi in JS, consulta la nostra guida su bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Inviare: inviare una transazione a una funzione di un contratto intelligente {#send-sending-a-transaction-to-a-smart-contract-function}

Per il secondo esempio, chiameremo la funzione di trasferimento del contratto intelligente DAI per inviare 10 DAI al nostro secondo indirizzo. La funzione di trasferimento accetta due parametri: l'indirizzo del destinatario e l'importo di token da trasferire:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("Si è verificato un errore", err)
      return
    }
    console.log("Hash della transazione: " + res)
  })
```

La funzione di chiamata restituisce l'hash della transazione che sarà minata nella blockchain. Su Ethereum, gli hash delle transazioni sono prevedibili: è così che possiamo ottenere l'hash della transazione prima che venga eseguita ([scopri qui come vengono calcolati gli hash](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Poiché la funzione invia solo la transazione alla blockchain, non possiamo vederne il risultato finché non viene minata e inclusa nella blockchain. Nella prossima guida impareremo [come attendere che una transazione venga eseguita sulla blockchain conoscendone l'hash](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
