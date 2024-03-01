---
title: Wywołanie inteligentnego kontraktu z JavaScript
description: Jak wywołać funkcję inteligentnego kontraktu z JavaScript za pomocą tokena Dai — przykład
author: jdourlens
tags:
  - "transakcje"
  - "frontend"
  - "JavaScript"
  - "web3.js"
skill: beginner
lang: pl
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W tym samouczku zobaczymy, jak wywołać funkcję [inteligentnego kontraktu](/developers/docs/smart-contracts/) za pomocą JavaScript. Najpierw odczytam stan inteligentnego kontraktu (np. saldo posiadacza ERC20), a następnie zmodyfikujemy stan blockchain poprzez transfer tokenów. Powinieneś być już zaznajomiony z [konfiguracją środowiska JS, aby wchodzić w interakcje z blockchainem](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

W tych przykładach pobawimy się tokenem DAI, w celach testowych rozwidlimy blockchain za pomocą ganache-cli i odblokujemy adres, który ma już dużo DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Aby wchodzić w interakcje z inteligentnym kontraktem, potrzebujemy jego adresu i ABI:

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

W przypadku tego projektu usunęliśmy kompletny ABI ERC2, aby zachować tylko funkcje `balanceOf` i `transfer`, ale znajdziesz [pełny ABI ERC20 tutaj](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Następnie musimy utworzyć instancję inteligentnego kontraktu:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Ustawimy też dwa adresy:

- ten, który otrzyma transfer i
- ten, który już odblokowaliśmy, który go wyśle:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

W następnej części wywołamy funkcję `balanceOf`, aby pobrać aktualną ilość tokenów z obu posiadanych adresów.

## Call: Odczyt wartości z inteligentnego kontraktu {#call-reading-value-from-a-smart-contract}

Pierwszy przykład wywoła metodę „stałą” i wykona metodę inteligentnego kontraktu w EVM bez wysyłania żadnej transakcji. W tym celu odczytamy saldo adresu ERC20. [Przeczytaj nasz artykuł o tokenach ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Możesz uzyskać dostęp do metod utworzonej instancji kontraktu inteligentnego, dla którego podano ABI, w następujący sposób: `yourContract.methods.methodname`. Używając funkcji `call`, otrzymasz wynik wykonania funkcji.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {  if (err) {    console.log("An error occured", err)    return  }  console.log("The balance is: ", res)})
```

Pamiętaj, że DAI ERC20 ma 18 miejsc po przecinku, co oznacza, że ​​musisz usunąć 18 zer, aby uzyskać prawidłową kwotę. uint256 są zwracane jako ciągi, ponieważ JavaScript nie obsługuje dużych wartości numerycznych. Jeśli nie masz pewności, [jak radzić sobie z dużymi liczbami w JS, sprawdź nasz samouczek na temat bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Send: Wysyłanie transakcji do funkcji inteligentnych kontraktów {#send-sending-a-transaction-to-a-smart-contract-function}

W drugim przykładzie wywołamy funkcję transferu inteligentnego kontraktu DAI, aby wysłać 10 DAI na nasz drugi adres. Funkcja trasferu przyjmuje dwa parametry: adres odbiorcy oraz ilość tokenu do transferu:

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

Funkcja wywołania zwraca skrót transakcji, która zostanie wykopana w blockchain. W Ethereum skróty transakcji są przewidywalne — w ten sposób możemy uzyskać skrót transakcji przed jej wykonaniem ([dowiedz się, jak obliczane są skróty](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Ponieważ funkcja przesyła transakcję tylko do łańcucha bloków, nie możemy zobaczyć wyniku, dopóki nie wiemy, kiedy został wydobyty i włączony do łańcucha bloków. W następnym samouczku nauczymy się, [jak poczekać aż transakcja zostanie wykonana na blockchainie, wiedząc, że jest skrótem](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
