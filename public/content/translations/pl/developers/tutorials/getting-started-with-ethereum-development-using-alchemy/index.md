---
title: Wprowadzenie do programowania w Ethereum
description: "To jest przewodnik dla początkujących, jak zacząć programować w Ethereum. Przeprowadzimy Cię od uruchomienia punktu końcowego API, przez wykonanie żądania z wiersza poleceń, aż po napisanie pierwszego skryptu Web3! Doświadczenie w programowaniu blockchain nie jest wymagane!"
author: "Elan Halpern"
tags: ["JavaScript", "ethers.js", "węzły", "zapytania", "Alchemy"]
skill: beginner
breadcrumb: Wprowadzenie
lang: pl
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

Oto przewodnik dla początkujących, jak rozpocząć programowanie w Ethereum. W tym samouczku będziemy używać [Alchemy](https://www.alchemy.com/), wiodącej platformy dla programistów blockchain, która obsługuje miliony użytkowników z 70% najlepszych aplikacji blockchain, w tym Maker, 0x, MyEtherWallet, Dharma i Kyber. Alchemy zapewni nam dostęp do punktu końcowego API w łańcuchu Ethereum, dzięki czemu będziemy mogli odczytywać i zapisywać transakcje.

Przeprowadzimy Cię od rejestracji w Alchemy do napisania Twojego pierwszego skryptu Web3! Doświadczenie w programowaniu blockchain nie jest wymagane!

## 1. Zarejestruj darmowe konto Alchemy {#sign-up-for-a-free-alchemy-account}

Utworzenie konta w Alchemy jest proste, [zarejestruj się za darmo tutaj](https://auth.alchemy.com/).

## 2. Utwórz aplikację Alchemy {#create-an-alchemy-app}

Aby komunikować się z łańcuchem Ethereum i korzystać z produktów Alchemy, potrzebujesz klucza API do uwierzytelniania swoich żądań.

Możesz [utworzyć klucze API z poziomu pulpitu nawigacyjnego](https://dashboard.alchemy.com/). Aby utworzyć nowy klucz, przejdź do „Create App” (Utwórz aplikację), jak pokazano poniżej:

Specjalne podziękowania dla [_ShapeShift_](https://shapeshift.com/) _za pozwolenie na pokazanie ich pulpitu nawigacyjnego!_

![Alchemy dashboard](./alchemy-dashboard.png)

Wypełnij szczegóły w sekcji „Create App”, aby uzyskać nowy klucz. Możesz tu również zobaczyć aplikacje utworzone wcześniej przez Ciebie i Twój zespół. Pobierz istniejące klucze, klikając „View Key” (Wyświetl klucz) dla dowolnej aplikacji.

![Create app with Alchemy screenshot](./create-app.png)

Możesz również pobrać istniejące klucze API, najeżdżając kursorem na „Apps” (Aplikacje) i wybierając jedną z nich. Możesz tutaj kliknąć „View Key”, a także „Edit App” (Edytuj aplikację), aby dodać określone domeny do białej listy, zobaczyć kilka narzędzi dla programistów i wyświetlić analitykę.

![Gif showing a user how to pull API keys](./pull-api-keys.mp4#600x340)

## 3. Wykonaj żądanie z wiersza poleceń

Wejdź w interakcję z blockchainem Ethereum za pośrednictwem Alchemy, używając JSON-RPC i curl.

W przypadku żądań ręcznych zalecamy interakcję z `JSON-RPC` za pośrednictwem żądań `POST`. Po prostu przekaż nagłówek `Content-Type: application/json` i swoje zapytanie jako treść `POST` z następującymi polami:

- `jsonrpc`: Wersja JSON-RPC — obecnie obsługiwana jest tylko wersja `2.0`.
- `method`: Metoda API ETH. [Zobacz dokumentację API.](/developers/docs/apis/json-rpc/)
- `params`: Lista parametrów do przekazania do metody.
- `id`: Identyfikator Twojego żądania. Zostanie zwrócony w odpowiedzi, dzięki czemu będziesz mógł śledzić, do którego żądania należy odpowiedź.

Oto przykład, który możesz uruchomić z wiersza poleceń, aby pobrać aktualną cenę gazu:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**UWAGA:** Zamień `https://eth-mainnet.alchemyapi.io/v2/demo` na swój własny klucz API `https://eth-mainnet.alchemyapi.io/v2/**twoj-klucz-api`._

**Wyniki:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```
## 4. Skonfiguruj swojego klienta Web3

**Jeśli masz już klienta,** zmień obecny adres URL dostawcy węzła na adres URL Alchemy ze swoim kluczem API: `“https://eth-mainnet.alchemyapi.io/v2/twoj-klucz-api"`

**_UWAGA:_** Poniższe skrypty muszą być uruchamiane w **kontekście węzła** (node) lub **zapisane w pliku**, a nie uruchamiane z wiersza poleceń. Jeśli nie masz jeszcze zainstalowanego Node lub npm, postępuj zgodnie z [instrukcjami instalacji Node.js](https://nodejs.org/en/download/).

Istnieje mnóstwo [bibliotek Web3](/developers/docs/apis/javascript/), które można zintegrować z Alchemy, jednak zalecamy użycie [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), bezpośredniego zamiennika dla Web3.js, zbudowanego i skonfigurowanego do bezproblemowej współpracy z Alchemy. Zapewnia to wiele korzyści, takich jak automatyczne ponawianie prób i solidna obsługa WebSocket.

Aby zainstalować AlchemyWeb3.js, **przejdź do katalogu swojego projektu** i uruchom:

**Z Yarn:**

```
yarn add @alch/alchemy-web3
```

**Z NPM:**

```
npm install @alch/alchemy-web3
```

Aby wejść w interakcję z infrastrukturą węzłów Alchemy, uruchom w NodeJS lub dodaj to do pliku JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```
## 5. Napisz swój pierwszy skrypt Web3!

Teraz, aby przejść do praktyki i zająć się programowaniem Web3, napiszemy prosty skrypt, który wypisze najnowszy numer bloku z sieci głównej Ethereum.

**1. Jeśli jeszcze tego nie zrobiłeś, w swoim terminalu utwórz nowy katalog projektu i przejdź do niego (cd):**

```
mkdir web3-example
cd web3-example
```

**2. Zainstaluj zależność Alchemy Web3 (lub dowolną inną Web3) w swoim projekcie, jeśli jeszcze tego nie zrobiłeś:**

```
npm install @alch/alchemy-web3
```

**3. Utwórz plik o nazwie `index.js` i dodaj następującą zawartość:**

> Ostatecznie powinieneś zamienić `demo` na swój klucz API HTTP Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Nie znasz zagadnień związanych z asynchronicznością (async)? Sprawdź ten [wpis na Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Uruchom go w swoim terminalu za pomocą node**

```
node index.js
```

**5. Powinieneś teraz zobaczyć najnowszy numer bloku w swojej konsoli!**

```
The latest block number is 11043912
```

**Super! Gratulacje! Właśnie napisałeś swój pierwszy skrypt Web3 przy użyciu Alchemy 🎉**

Nie wiesz, co zrobić dalej? Spróbuj wdrożyć swój pierwszy inteligentny kontrakt i spróbuj swoich sił w programowaniu w Solidity w naszym [Przewodniku po inteligentnych kontraktach Hello World](/developers/tutorials/hello-world-smart-contract/) lub kontynuuj eksplorację [dokumentacji Alchemy](https://www.alchemy.com/docs/), aby znaleźć więcej przykładów.

_[Zarejestruj się w Alchemy za darmo](https://auth.alchemy.com/), sprawdź naszą [dokumentację](https://www.alchemy.com/docs/) i śledź nas na [Twitterze](https://twitter.com/AlchemyPlatform), aby być na bieżąco z najnowszymi wiadomościami_.
