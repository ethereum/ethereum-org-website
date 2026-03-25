---
title: Pierwsze kroki w programowaniu w Ethereum
description: "To jest przewodnik dla początkujących, jak zacząć programować w Ethereum. Przeprowadzimy Cię od uruchomienia punktu końcowego API, przez wysłanie żądania z wiersza poleceń, aż po napisanie Twojego pierwszego skryptu web3! Doświadczenie w programowaniu blockchain nie jest wymagane!"
author: "Elan Halpern"
tags:
  [
    "JavaScript",
    "ethers.js",
    "węzły",
    "zapytania",
    "Alchemy"
  ]
skill: beginner
breadcrumb: "Pierwsze kroki"
lang: pl
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Loga Ethereum i Alchemy](./ethereum-alchemy.png)

To jest przewodnik dla początkujących, jak zacząć programować w Ethereum. W tym samouczku będziemy używać [Alchemy](https://alchemyapi.io/), wiodącej platformy dla deweloperów blockchain, która obsługuje miliony użytkowników z 70% najlepszych aplikacji blockchain, w tym Maker, 0x, MyEtherWallet, Dharma i Kyber. Alchemy da nam dostęp do punktu końcowego API w łańcuchu Ethereum, dzięki czemu będziemy mogli odczytywać i zapisywać transakcje.

Przeprowadzimy Cię od rejestracji w Alchemy do napisania pierwszego skryptu web3! Doświadczenie w programowaniu blockchain nie jest wymagane!

## 1. Zarejestruj darmowe konto Alchemy {#sign-up-for-a-free-alchemy-account}

Utworzenie konta w Alchemy jest proste, [zarejestruj się za darmo tutaj](https://auth.alchemy.com/).

## 2. Utwórz aplikację Alchemy {#create-an-alchemy-app}

Aby komunikować się z łańcuchem Ethereum i korzystać z produktów Alchemy, potrzebujesz klucza API do uwierzytelniania swoich żądań.

Możesz [utworzyć klucze API z pulpitu nawigacyjnego](https://dashboard.alchemy.com/). Aby utworzyć nowy klucz, przejdź do „Utwórz aplikację”, jak pokazano poniżej:

Specjalne podziękowania dla [_ShapeShift_](https://shapeshift.com/) _za umożliwienie nam pokazania ich pulpitu nawigacyjnego!_

![Pulpit nawigacyjny Alchemy](./alchemy-dashboard.png)

Wypełnij dane w sekcji „Utwórz aplikację”, aby otrzymać nowy klucz. Możesz tu również zobaczyć aplikacje utworzone wcześniej przez Ciebie i przez Twój zespół. Pobierz istniejące klucze, klikając „Wyświetl klucz” dla dowolnej aplikacji.

![Zrzut ekranu tworzenia aplikacji za pomocą Alchemy](./create-app.png)

Możesz także pobrać istniejące klucze API, najeżdżając kursorem na „Aplikacje” i wybierając jedną z nich. Możesz tu „Wyświetlić klucz”, a także „Edytować aplikację”, aby dodać określone domeny do białej listy, zobaczyć kilka narzędzi dla deweloperów i wyświetlić analitykę.

![Gif pokazujący, jak użytkownik może pobrać klucze API](./pull-api-keys.gif)

## 3. Wyślij żądanie z wiersza poleceń {#make-a-request-from-the-command-line}

Wchodź w interakcje z blockchainem Ethereum za pośrednictwem Alchemy za pomocą JSON-RPC i curl.

W przypadku żądań ręcznych zalecamy interakcję z `JSON-RPC` za pośrednictwem żądań `POST`. Po prostu przekaż nagłówek `Content-Type: application/json` i swoje zapytanie jako treść `POST` z następującymi polami:

- `jsonrpc`: Wersja JSON-RPC — obecnie obsługiwana jest tylko wersja `2.0`.
- `method`: Metoda API ETH. [Zobacz dokumentację API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Lista parametrów do przekazania do metody.
- `id`: ID Twojego żądania. Zostanie zwrócone w odpowiedzi, dzięki czemu możesz śledzić, do którego żądania należy dana odpowiedź.

Oto przykład, który możesz uruchomić z wiersza poleceń, aby pobrać aktualną cenę gazu:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**UWAGA:** Zastąp [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) własnym kluczem API `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Wyniki:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Skonfiguruj swojego klienta Web3 {#set-up-your-web3-client}

**Jeśli masz już istniejącego klienta,** zmień adres URL swojego obecnego dostawcy węzła na adres URL Alchemy z Twoim kluczem API: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key\"`

**_UWAGA:_** Poniższe skrypty muszą być uruchamiane w **kontekście node** lub **zapisane w pliku**, a nie z wiersza poleceń. Jeśli nie masz jeszcze zainstalowanego Node lub npm, zapoznaj się z tym krótkim [przewodnikiem konfiguracji dla komputerów Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Istnieje mnóstwo [bibliotek Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), które można zintegrować z Alchemy, jednak zalecamy użycie [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), zamiennika dla web3.js, stworzonego i skonfigurowanego do bezproblemowej pracy z Alchemy. Zapewnia to wiele korzyści, takich jak automatyczne ponawianie prób i solidne wsparcie dla WebSocket.

Aby zainstalować AlchemyWeb3.js, **przejdź do katalogu swojego projektu** i uruchom:

**Za pomocą Yarn:**

```
yarn add @alch/alchemy-web3
```

**Za pomocą NPM:**

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

## 5. Napisz swój pierwszy skrypt Web3! {#write-your-first-web3-script}

Teraz, aby trochę pobrudzić sobie ręce programowaniem w web3, napiszemy prosty skrypt, który wyświetla numer ostatniego bloku z sieci głównej Ethereum.

**1. Jeśli jeszcze tego nie zrobiłeś, utwórz w terminalu nowy katalog projektu i przejdź do niego:**

```
mkdir web3-example
cd web3-example
```

**2. Zainstaluj w swoim projekcie zależność Alchemy web3 (lub dowolną web3), jeśli jeszcze tego nie zrobiłeś:**

```
npm install @alch/alchemy-web3
```

**3. Utwórz plik o nazwie `index.js` i dodaj następującą zawartość:**

> Docelowo należy zastąpić `demo` swoim kluczem API HTTP Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("Najnowszy numer bloku to " + blockNumber)
}
main()
```

Nie znasz rozwiązań asynchronicznych? Sprawdź ten [wpis na Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Uruchom to w terminalu za pomocą node**

```
node index.js
```

**5. Powinieneś teraz zobaczyć w konsoli wynik z najnowszym numerem bloku!**

```
Najnowszy numer bloku to 11043912
```

**Woo! Gratulacje! Właśnie napisałeś swój pierwszy skrypt web3 przy użyciu Alchemy 🎉**

Nie wiesz, co robić dalej? Spróbuj wdrożyć swój pierwszy smart kontrakt i pobrudź sobie ręce programowaniem w Solidity w naszym [przewodniku po smart kontraktach „Hello World”](https://www.alchemy.com/docs/hello-world-smart-contract) lub sprawdź swoją wiedzę o pulpicie nawigacyjnym za pomocą [aplikacji demonstracyjnej pulpitu nawigacyjnego](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Zarejestruj się w Alchemy za darmo](https://auth.alchemy.com/), sprawdź naszą [dokumentację](https://www.alchemy.com/docs/), a aby być na bieżąco z najnowszymi wiadomościami, obserwuj nas na [Twitterze](https://twitter.com/AlchemyPlatform)_.
