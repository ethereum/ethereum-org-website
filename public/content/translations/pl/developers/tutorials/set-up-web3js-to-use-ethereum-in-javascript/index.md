---
title: "Skonfiguruj Web3.js, aby korzystać z blockchaina Ethereum w JavaScript"
description: "Dowiedz się, jak zainstalować i skonfigurować bibliotekę Web3.js do interakcji z blockchainem Ethereum z poziomu aplikacji JavaScript."
author: "jdourlens"
tags: ["web3.js", "JavaScript"]
skill: beginner
breadcrumb: Konfiguracja Web3.js
lang: pl
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W tym samouczku zobaczymy, jak zacząć pracę z [Web3.js](https://web3js.readthedocs.io/), aby wchodzić w interakcje z blockchainem Ethereum. Web3.js może być używane zarówno we frontendzie, jak i backendzie do odczytywania danych z blockchaina, wykonywania transakcji, a nawet wdrażania inteligentnych kontraktów.

Pierwszym krokiem jest dołączenie Web3.js do Twojego projektu. Aby użyć go na stronie internetowej, możesz zaimportować bibliotekę bezpośrednio za pomocą CDN, takiego jak JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Jeśli wolisz zainstalować bibliotekę, aby używać jej w backendzie lub projekcie frontendowym wykorzystującym proces budowania (build), możesz zainstalować ją za pomocą npm:

```bash
npm install web3 --save
```

Następnie, aby zaimportować Web3.js do skryptu Node.js lub projektu frontendowego Browserify, możesz użyć następującej linijki w JavaScript:

```js
const Web3 = require("web3")
```

Teraz, gdy dołączyliśmy bibliotekę do projektu, musimy ją zainicjować. Twój projekt musi być w stanie komunikować się z blockchainem. Większość bibliotek Ethereum komunikuje się z [węzłem](/developers/docs/nodes-and-clients/) poprzez wywołania RPC. Aby zainicjować naszego dostawcę Web3, utworzymy instancję Web3, przekazując jako konstruktor adres URL dostawcy. Jeśli masz węzeł lub [instancję ganache uruchomioną na swoim komputerze](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), będzie to wyglądać tak:

```js
const web3 = new Web3("http://localhost:8545")
```

Jeśli chcesz uzyskać bezpośredni dostęp do hostowanego węzła, możesz znaleźć opcje w sekcji [węzły jako usługa (nodes as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Aby sprawdzić, czy poprawnie skonfigurowaliśmy naszą instancję Web3, spróbujemy pobrać numer najnowszego bloku za pomocą funkcji `getBlockNumber`. Funkcja ta przyjmuje wywołanie zwrotne (callback) jako parametr i zwraca numer bloku jako liczbę całkowitą.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Jeśli wykonasz ten program, po prostu wydrukuje on numer najnowszego bloku: szczyt blockchaina. Możesz również użyć wywołań funkcji `await/async`, aby uniknąć zagnieżdżania wywołań zwrotnych w swoim kodzie:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Wszystkie funkcje dostępne w instancji Web3 można znaleźć w [oficjalnej dokumentacji Web3.js](https://docs.web3js.org/).

Większość bibliotek Web3 jest asynchroniczna, ponieważ w tle biblioteka wykonuje wywołania JSON-RPC do węzła, który odsyła wynik.

<Divider />

Jeśli pracujesz w przeglądarce, niektóre portfele bezpośrednio wstrzykują instancję Web3 i powinieneś starać się jej używać, gdy tylko jest to możliwe, zwłaszcza jeśli planujesz wchodzić w interakcje z adresem Ethereum użytkownika w celu wykonywania transakcji.

Oto fragment kodu pozwalający wykryć, czy portfel MetaMask jest dostępny, i spróbować go włączyć, jeśli tak. Pozwoli to później na odczytanie salda użytkownika i umożliwi mu zatwierdzanie transakcji, które chciałbyś, aby wykonał na blockchainie Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Poproś o dostęp do konta w razie potrzeby
    await window.ethereum.enable()
    // Konta są teraz udostępnione
  } catch (error) {
    // Użytkownik odmówił dostępu do konta...
  }
}
```

Istnieją również alternatywy dla Web3.js, takie jak [Ethers.js](https://docs.ethers.io/), które są powszechnie używane. W następnym samouczku zobaczymy, [jak łatwo nasłuchiwać nowych przychodzących bloków na blockchainie i sprawdzać, co zawierają](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).