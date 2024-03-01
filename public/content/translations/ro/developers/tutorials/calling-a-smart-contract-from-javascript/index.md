---
title: Apelarea unui contract inteligent din JavaScript
description: Cum să apelaţi o funcție a unui contract inteligent din JavaScript folosind ca exemplu un token Dai
author: jdourlens
tags:
  - "tranzacții"
  - "frontend"
  - "javascript"
  - "web3.js"
skill: beginner
lang: ro
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

În acest tutorial vom afla cum să apelăm o funcție a unui [contract inteligent](/developers/docs/smart-contracts/) din JavaScript. Mai întâi citim starea unui contract inteligent (de exemplu, soldul unui titular ERC20), apoi modificăm starea blockchain-ului efectuând un transfer de tokenuri. Ar trebui să fiţi deja familiarizat cu [configurarea unui mediu JS pentru a interacționa cu blockchain-ul](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Pentru aceste exemple, o să jucăm cu tokenul DAI, în scopul testării vom bifurca blockchain-ul folosind ganache-cli și vom debloca o adresă care are deja o mulțime de DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Pentru a interacționa cu un contract inteligent, vom avea nevoie de adresa sa și de ABI:

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

Pentru acest proiect am eliminat complet ABI-ul ERC20 pentru a păstra doar funcția `balanceOf` și `transfer`, dar puteţi găsi [ABI-ul ERC20 complet aici](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Apoi trebuie să creăm o instanță a contractului nostru inteligent:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

De asemenea, vom configura două adrese:

- cea care va primi transferul și
- cea pe care am deblocat-o deja, care îl va trimite:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

În partea următoare vom apela funcția `balanceOf` pentru a prelua suma curentă de tokenuri deținute de ambele adrese.

## Apel: citirea valorii dintr-un contract inteligent {#call-reading-value-from-a-smart-contract}

Primul exemplu va apela o metodă „constantă” și va executa metoda sa de contract inteligent în EVM fără a trimite nicio tranzacție. Pentru aceasta vom citi soldul ERC20 al unei adrese. [Citiţi articolul nostru despre tokenuri ERC20](/developers/tutorials/understand-the-erc20-token-smart-contract/).

Puteți accesa metodele instanțiate ale unui contract inteligent pentru care ați furnizat ABI-ul, după cum urmează: `contractul tău.methods.methodname`. Prin utilizarea funcției `call`, veţi primi rezultatul executării funcției.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("A apărut o eroare", err)
    return
  }
  console.log("Soldul este: ", res)
})
```

Rețineţi că DAI ERC20 are 18 zecimale, ceea ce înseamnă că trebuie să eliminaţi 18 zerouri pentru a obține suma corectă. uint256 sunt returnate ca şiruri, deoarece JavaScript nu operează cu valori numerice mari. Dacă nu ştiţi sigur [cum să vă ocupaţi de numerelor mari în JS, consultaţi tutorialul nostru despre bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Trimitere: trimiterea unei tranzacții către o funcție contract inteligent {#send-sending-a-transaction-to-a-smart-contract-function}

Pentru al doilea exemplu, vom apela funcția „transfer” a contractului inteligent DAI pentru a trimite 10 DAI la a doua noastră adresă. Funcția „transfer” acceptă doi parametri: adresa destinatarului și cantitatea de tokenuri pentru transferuri:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("A apărut o eroare", err)
      return
    }
    console.log("Hash-ul tranzacției: " + res)
  })
```

Funcția apel returnează hash-ul tranzacției care va fi minată în blockchain. Pe Ethereum, hash-urile tranzacțiilor sunt previzibile - de aceea putem obține hash-ul tranzacției înainte de a o executa ([aflaţi cum sunt calculate hash-urile aici)](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction).

Deoarece funcția doar trimite tranzacția către blockchain, nu putem vedea rezultatul până când nu știm când este minată și inclusă în blockchain. În tutorialul următor vom învăța [cum să așteptăm ca o tranzacție să fie executată pe blockchain prin cunoașterea hash-ului acesteia](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
