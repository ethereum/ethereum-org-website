---
title: "Wywołanie inteligentnego kontraktu z JavaScript"
description: "Jak wywołać funkcję inteligentnego kontraktu z JavaScript za pomocą tokena Dai — przykład"
author: jdourlens
tags: [ "transakcje", "frontend", "JavaScript", "web3.js" ]
skill: beginner
lang: pl
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W tym samouczku zobaczymy, jak wywołać funkcję [inteligentnego kontraktu](/developers/docs/smart-contracts/) za pomocą JavaScript. Najpierw odczytamy stan inteligentnego kontraktu (np. saldo posiadacza ERC20), a następnie zmodyfikujemy stan blockchaina, dokonując transferu tokena. Powinieneś już znać [konfigurację środowiska JS do interakcji z blockchainem](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

W tym przykładzie pobawimy się tokenem DAI, w celach testowych sforkujemy blockchain za pomocą ganache-cli i odblokujemy adres, który ma już dużo DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Aby wejść w interakcję z inteligentnym kontraktem, będziemy potrzebować jego adresu i ABI:

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

Na potrzeby tego projektu okroiliśmy kompletne ABI ERC20, aby zachować tylko funkcje `balanceOf` i `transfer`, ale pełne ABI ERC20 można znaleźć [tutaj](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Następnie musimy utworzyć instancję naszego inteligentnego kontraktu:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Skonfigurujemy również dwa adresy:

- ten, który otrzyma transfer, oraz
- ten, który już odblokowaliśmy i który go wyśle:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

W następnej części wywołamy funkcję `balanceOf`, aby pobrać aktualną liczbę tokenów posiadanych przez oba adresy.

## Wywołanie: odczytywanie wartości z inteligentnego kontraktu {#call-reading-value-from-a-smart-contract}

W pierwszym przykładzie zostanie wywołana „stała” metoda i jej metoda inteligentnego kontraktu zostanie wykonana w EVM bez wysyłania jakiejkolwiek transakcji. W tym celu odczytamy saldo ERC20 adresu. [Przeczytaj nasz artykuł o tokenach ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Możesz uzyskać dostęp do metod utworzonej instancji inteligentnego kontraktu, dla którego podano ABI, w następujący sposób: `yourContract.methods.methodname`. Używając funkcji `call`, otrzymasz wynik wykonania funkcji.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("Wystąpił błąd", err)
    return
  }
  console.log("Saldo wynosi: ", res)
})
```

Pamiętaj, że DAI ERC20 ma 18 miejsc po przecinku, co oznacza, że musisz usunąć 18 zer, aby uzyskać prawidłową kwotę. Wartości uint256 są zwracane jako ciągi znaków, ponieważ JavaScript nie obsługuje dużych wartości numerycznych. Jeśli nie masz pewności, [jak radzić sobie z dużymi liczbami w JS, sprawdź nasz samouczek o bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Wyślij: wysyłanie transakcji do funkcji inteligentnego kontraktu {#send-sending-a-transaction-to-a-smart-contract-function}

W drugim przykładzie wywołamy funkcję transferu inteligentnego kontraktu DAI, aby wysłać 10 DAI na nasz drugi adres. Funkcja transferu przyjmuje dwa parametry: adres odbiorcy i liczbę tokenów do transferu:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("Wystąpił błąd", err)
      return
    }
    console.log("Hasz transakcji: " + res)
  })
```

Funkcja wywołania zwraca hasz transakcji, która zostanie wydobyta w blockchainie. W Ethereum hasze transakcji są przewidywalne – w ten sposób możemy uzyskać hasz transakcji przed jej wykonaniem ([dowiedz się, jak obliczane są hasze, tutaj](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Ponieważ funkcja jedynie przesyła transakcję do blockchaina, nie możemy zobaczyć wyniku, dopóki nie dowiemy się, kiedy zostanie ona wydobyta i dołączona do blockchaina. W następnym samouczku dowiemy się, [jak czekać na wykonanie transakcji w blockchainie, znając jej hasz](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
