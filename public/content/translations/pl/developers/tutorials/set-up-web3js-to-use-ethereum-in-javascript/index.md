---
title: Skonfiguruj web3.js do używania blockchainu Ethereum w JavaScript
description: Dowiedz się, jak skonfigurować bibliotekę web3.js do interakcji z blockchainem Ethereum z aplikacji JavaScript.
author: "jdourlens"
tags: [ "web3.js", "JavaScript" ]
skill: beginner
lang: pl
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W tym samouczku zobaczymy, jak zacząć z [web3.js](https://web3js.readthedocs.io/), aby wejść w interakcję z blockchainem Ethereum. Web3.js może być używany zarówno we frontendach, jak i backendach do odczytywania danych z blockchaina, dokonywania transakcji, a nawet wdrażania smart kontraktów.

Pierwszym krokiem jest dołączenie web3.js do Twojego projektu. Aby użyć go na stronie internetowej, możesz zaimportować bibliotekę bezpośrednio za pomocą CDN, takiego jak JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Jeśli wolisz zainstalować bibliotekę do użycia w backendzie lub w projekcie frontendowym, który używa kompilacji, możesz ją zainstalować za pomocą npm:

```bash
npm install web3 --save
```

Następnie, aby zaimportować Web3.js do skryptu Node.js lub projektu frontendowego Browserify, możesz użyć następującej linii JavaScriptu:

```js
const Web3 = require("web3")
```

Teraz, gdy dołączyliśmy bibliotekę do projektu, musimy ją zainicjować. Twój projekt musi być w stanie komunikować się z blockchainem. Większość bibliotek Ethereum komunikuje się z [węzłem](/developers/docs/nodes-and-clients/) poprzez wywołania RPC. Aby zainicjować naszego dostawcę Web3, utworzymy instancję Web3, przekazując jako konstruktor adres URL dostawcy. Jeśli masz węzeł lub [instancję ganache działającą na twoim komputerze](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), będzie to wyglądać tak:

```js
const web3 = new Web3("http://localhost:8545")
```

Jeśli chcesz uzyskać bezpośredni dostęp do hostowanego węzła, możesz znaleźć opcje w [węzłach jako usłudze](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Aby przetestować, czy poprawnie skonfigurowaliśmy naszą instancję Web3, spróbujemy pobrać najnowszy numer bloku za pomocą funkcji `getBlockNumber`. Ta funkcja akceptuje callback jako parametr i zwraca numer bloku jako liczbę całkowitą.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Jeśli wykonasz ten program, po prostu wydrukuje on najnowszy numer bloku: szczyt blockchainu. Możesz również użyć wywołań funkcji `await/async`, aby uniknąć zagnieżdżania wywołań zwrotnych w swoim kodzie:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Możesz zobaczyć wszystkie dostępne funkcje w instancji Web3 w [oficjalnej dokumentacji web3.js](https://docs.web3js.org/).

Większość bibliotek Web3 jest asynchroniczna, ponieważ w tle biblioteka wykonuje wywołania JSON-RPC do węzła, który odsyła wynik.

<Divider />

Jeśli pracujesz w przeglądarce, niektóre portfele bezpośrednio wstrzykują instancję Web3 i powinieneś starać się jej używać, gdy tylko jest to możliwe, zwłaszcza jeśli planujesz wchodzić w interakcję z adresem Ethereum użytkownika w celu dokonywania transakcji.

Oto fragment kodu do wykrywania, czy portfel MetaMask jest dostępny, i próby jego włączenia, jeśli tak. Pozwoli to później na odczytanie salda użytkownika i umożliwi mu zatwierdzanie transakcji, które chcesz, aby wykonał na blockchainie Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // W razie potrzeby poproś o dostęp do konta
    await window.ethereum.enable()
    // Konta są teraz ujawnione
  } catch (error) {
    // Użytkownik odmówił dostępu do konta...
  }
}
```

Istnieją alternatywy dla web3.js, takie jak [Ethers.js](https://docs.ethers.io/), i są one również powszechnie stosowane. W następnym samouczku zobaczymy, [jak łatwo nasłuchiwać nowych bloków przychodzących na blockchainie i zobaczyć, co zawierają](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
