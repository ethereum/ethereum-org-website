---
title: Einen Smart Contract aus JavaScript aufrufen
description: Wie man eine Smart-Contract-Funktion aus JavaScript am Beispiel eines Dai-Tokens aufruft
author: jdourlens
tags: ["Transaktionen", "Frontend", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: Smart Contracts aus JS aufrufen
lang: de
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In diesem Tutorial werden wir sehen, wie man eine [Smart Contract](/developers/docs/smart-contracts/)-Funktion aus JavaScript aufruft. Zuerst lesen wir den Zustand eines Smart Contracts (z. B. das Guthaben eines ERC20-Inhabers), dann ändern wir den Zustand der Blockchain, indem wir eine Token-Überweisung durchführen. Sie sollten bereits damit vertraut sein, [eine JS-Umgebung für die Interaktion mit der Blockchain einzurichten](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Für dieses Beispiel werden wir mit dem DAI-Token spielen. Zu Testzwecken werden wir die Blockchain mit ganache-cli forken und eine Adresse entsperren, die bereits über viele DAI verfügt:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Um mit einem Smart Contract zu interagieren, benötigen wir dessen Adresse und ABI:

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

Für dieses Projekt haben wir die komplette ERC20-ABI auf die Funktionen `balanceOf` und `transfer` reduziert, aber Sie können [die vollständige ERC20-ABI hier finden](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Anschließend müssen wir unseren Smart Contract instanziieren:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Wir werden auch zwei Adressen einrichten:

- diejenige, die die Überweisung empfängt, und
- diejenige, die wir bereits entsperrt haben und die sie senden wird:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Im nächsten Teil rufen wir die Funktion `balanceOf` auf, um die aktuelle Menge an Token abzurufen, die beide Adressen halten.

## Call: Einen Wert aus einem Smart Contract lesen {#call-reading-value-from-a-smart-contract}

Das erste Beispiel ruft eine „konstante“ Methode auf und führt deren Smart-Contract-Methode in der EVM aus, ohne eine Transaktion zu senden. Dafür lesen wir das ERC20-Guthaben einer Adresse aus. [Lesen Sie unseren Artikel über ERC20-Token](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Sie können auf die Methoden eines instanziierten Smart Contracts, für den Sie die ABI bereitgestellt haben, wie folgt zugreifen: `yourContract.methods.methodname`. Durch die Verwendung der Funktion `call` erhalten Sie das Ergebnis der Ausführung der Funktion.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Denken Sie daran, dass DAI ERC20 18 Dezimalstellen hat, was bedeutet, dass Sie 18 Nullen entfernen müssen, um den korrekten Betrag zu erhalten. uint256 werden als Strings zurückgegeben, da JavaScript keine großen numerischen Werte verarbeitet. Wenn Sie sich nicht sicher sind, [wie Sie mit großen Zahlen in JS umgehen sollen, lesen Sie unser Tutorial über bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Send: Eine Transaktion an eine Smart-Contract-Funktion senden {#send-sending-a-transaction-to-a-smart-contract-function}

Für das zweite Beispiel rufen wir die Transfer-Funktion des DAI-Smart-Contracts auf, um 10 DAI an unsere zweite Adresse zu senden. Die Transfer-Funktion akzeptiert zwei Parameter: die Empfängeradresse und die Menge der zu überweisenden Token:

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

Die Call-Funktion gibt den Hash der Transaktion zurück, die in die Blockchain gemint wird. Auf Ethereum sind Transaktions-Hashes vorhersehbar – so können wir den Hash der Transaktion erhalten, bevor sie ausgeführt wird ([erfahren Sie hier, wie Hashes berechnet werden](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Da die Funktion die Transaktion nur an die Blockchain übermittelt, können wir das Ergebnis erst sehen, wenn wir wissen, wann sie gemint und in die Blockchain aufgenommen wurde. Im nächsten Tutorial werden wir lernen, [wie man auf die Ausführung einer Transaktion auf der Blockchain wartet, indem man ihren Hash kennt](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).