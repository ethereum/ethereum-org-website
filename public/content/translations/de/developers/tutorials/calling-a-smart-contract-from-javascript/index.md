---
title: Smart Contract aus JavaScript aufrufen
description: So rufen Sie am Beispiel eines Dai-Tokens eine Smart-Contract-Funktion von JavaScript aus auf
author: jdourlens
tags:
  - "Transaktionen"
  - "Frontend"
  - "JavaScript"
  - "web3.js"
skill: beginner
lang: de
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In diesem Tutorial zeigen wir, wie Sie eine [Smart-Contract](/developers/docs/smart-contracts/)-Funktion von JavaScript aus aufrufen können. Zuerst wird der Zustand eines Smart Contracts ausgelesen (z. B. der Kontostand eines ERC20-Inhabers), dann ändern wir den Zustand der Blockchain, indem wir einen Tokentransfer durchführen. Sie sollten bereits mit dem [Einrichten einer JS-Umgebung zur Interaktion mit der Blockchain](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) vertraut sein.

Für dieses Beispiel wird ein DAI-Token verwendet. Zu Testzwecken werden wir die Blockchain mit ganache-cli forken und eine Adresse freischalten, die bereits viele DAI hat:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Für die Interaktoin mit einem Smart Contract benötigen wir seine Adresse und ABI:

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

Für dieses Projekt haben wir die komplette ERC20 ABI gestrippt, um nur die `balanceOf`- und `transfer`-Funktion zu behalten. Sie können [die komplette ERC20 ABI allerdings hier finden](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Anschließend müssen wir unseren Smart Contract starten:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Außerdem richten wir zwei Adressen ein:

- diejenige, die die Übertragung erhält und
- diejeige, die wir bereits eingerichtet haben, und die die Übertragung senden wird:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Im nächsten Teil rufen wir die Funktion `balanceOf` auf, um die aktuelle Menge an Token abzurufen, die beide Adressen enthalten.

## Aufruf: Wert aus einem Smart Contract lesen {#call-reading-value-from-a-smart-contract}

Das erste Beispiel ruft eine "konstante" Methode auf und führt deren Smart-Contract-Methode im EVM aus, ohne eine Transaktion zu senden. Hierfür lesen wir den ERC20-Saldo einer Adresse aus. [Lesen Sie unseren Artikel über ERC20-Token](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Sie können auf die Methoden eines instanziierten Smart Contracts, für den Sie die ABI bereitgestellt haben, wie folgt zugreifen: `yourContract.methods.methodname`. Durch Verwendung der `Aufruf`-Funktion erhalten Sie das Ergebnis der Ausführung der Funktion.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occured", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Denken Sie daran, dass DAI ERC20 18 Dezimalstellen hat. Das bedeutet, dass Sie 18 Nullen entfernen müssen, um den richtigen Betrag zu erhalten. uint256 werden als Strings zurückgegeben, da JavaScript keine großen numerischen Werte verarbeiten kann. Wenn Sie nicht sicher sind, [wie Sie mit großen Zahlen in JS umgehen sollen, lesen Sie unser Tutorial über bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Senden: Senden einer Transaktion an eine Smart-Contract-Funktion {#send-sending-a-transaction-to-a-smart-contract-function}

Für das zweite Beispiel rufen wir die Transferfunktion des DAI-Smart Contracts auf, um 10 DAI an unsere zweite Adresse zu senden. Die Übertragungsfunktion akzeptiert zwei Parameter: die Empfängeradresse und den Betrag des zu übertragenden Tokens:

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

Die Aufruffunktion gibt den Hash der Transaktion zurück, der in die Blockchain gemined wird. Bei Ethereum sind Transaktions-Hashes vorhersehbar – so können wir den Hash der Transaktion erhalten, bevor sie ausgeführt wird ([lernen Sie hier, wie Hashes berechnet werden](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Da die Funktion die Transaktion nur an die Blockchain sendet, können wir das Ergebnis erst sehen, wenn es gemined und in die Blockchain aufgenommen wurde. Im nächsten Tutorial werden wir lernen, [wie man auf die Ausführung einer Transaktion auf der Blockchain wartet, indem man ihren Hash kennt](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
