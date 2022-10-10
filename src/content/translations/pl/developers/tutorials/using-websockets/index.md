---
title: Używanie WebSockets
description: Przewodnik korzystania z WebSockets i Alchemy do wysyłania żądań JSON-RPC i subskrybowania zdarzeń.
author: "Elan Halpern"
lang: pl
tags:
  - "alchemy"
  - "websockets"
  - "zapytania"
  - "pierwsze kroki"
  - "subskrypcja"
  - "JavaScript"
skill: beginner
source: Dokumentacja Alchemy
sourceUrl: https://docs.alchemyapi.io/guides/using-websockets
published: 2020-12-01
---

Jest to przewodnik na poziomie podstawowym do korzystania z WebSockets i Alchemy do wykonywania żądań do blockchainu Ethereum.

## WebSockets vs. HTTP {#websockets-vs-http}

W odróżnieniu od HTTP, z WebSockets, nie musisz ciągle wysyłać żądań, gdy chcesz uzyskać konkretne informacje. WebSockets utrzymuje dla Ciebie połączenie sieciowe (jeżeli zostało nawiązane) i nasłuchuje zmian.

Podobnie jak w przypadku jakiegokolwiek połączenia sieciowego, nie należy zakładać, że WebSocket pozostanie otwarty na zawsze bez przerwy, ale właściwa obsługa zerwanego połączenia i ponowne nawiązanie połączenie może zapewnić ciągłość jego prawidłowego działania. Następną niedogodnością WebSocketów jest to, że nie otrzymujesz kodów statusu HTTP w odpowiedzi, ale tylko komunikat o błędzie.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) automatycznie dodaje obsługę awarii WebSocket i ponawiania prób bez konieczności konfiguracji.

## Wypróbuj {#try-it-out}

Najprostszym sposobem na przetestowanie WebSockets jest zainstalowanie narzędzia wiersza poleceń do tworzenia żądań WebSocket, takich jak [wscat](https://github.com/websockets/wscat). Używając wscat, możesz wysyłać następujące żądania:

_Uwaga: jeśli posiadasz konto Alchemy, możesz zastąpić `demo` własnym kluczem API. [Sign up for a free Alchemy account here!](https://auth.alchemyapi.io/signup)_

```
$ wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo
>  {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}
<  {"jsonrpc": "2.0", "result": "0xb2d05e00", "id": 0}

```

## Jak korzystać z WebSockets {#how-to-use-websockets}

Aby rozpocząć, otwórz WebSocket za pomocą adresu URL WebSocket dla swojej aplikacji. Możesz znaleźć adres URL swojej aplikacji WebSocket, otwierając stronę aplikacji w [pulpicie nawigacyjnym](https://dashboard.alchemyapi.io/) i klikając przycisk „Wyświetl klucz”. Pamiętaj, że adres URL Twojej aplikacji dla WebSocketów różni się od adresu URL dla żądań HTTP, ale oba można znaleźć klikając „Wyświetl klucz”.

![Gdzie znaleźć twój adres URL WebSocket w panelu Alchemy](../../../../../developers/tutorials/using-websockets/use-websockets.gif)

Każdy z API wymienionych w [alchemy API](https://docs.alchemyapi.io/documentation/alchemy-api-reference/) może być używany przez WebSocket. Aby to zrobić, użyj tego samego ładunku, który zostałby wysłany jako treść żądania HTTP POST, ale zamiast tego wyślij ten ładunek za pośrednictwem protokołu WebSocket.

## Z Web3 {#with-web3}

Przejście na WebSockets podczas korzystania z biblioteki klienckiej, takiej jak Web3, jest proste. Po prostu przekaż adres URL WebSocket zamiast HTTP podczas tworzenia instancji klienta Web3. Na przykład:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## Subskrypcja API {#subscription-api}

Po połączeniu przez WebSocket, możesz użyć dwóch dodatkowych metod: `eth_subscribe` i `eth_unsubscribe`. Te metody pozwolą Ci na wysłuchanie konkretnych wydarzeń i natychmiastowe powiadomienie.

### `eth_subscribe` {#eth-subscribe}

Tworzy nową subskrypcję dla określonych zdarzeń. [Dowiedz się więcej o `eth_subscribe`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_subscribe).

#### Parametry {#parameters}

1. Rodzaj subskrypcji
2. Parametry opcjonalne

Pierwszy argument określa rodzaj wydarzenia, którego należy nasłuchiwać. Drugi argument zawiera dodatkowe opcje, które zależą od pierwszego argumentu. Poniżej opisano różne rodzaje opisów, ich opcje i obciążenia zdarzeniami.

#### Zwraca {#returns}

ID subskrypcji: Ten identyfikator zostanie dołączony do wszystkich otrzymanych wydarzeń, i może być również używany do anulowania subskrypcji za pomocą `eth_unsubscribe`.

#### Zdarzenia subskrypcji {#subscription-events}

Podczas gdy subskrypcja jest aktywna, otrzymasz zdarzenia, które są obiektami z następującymi polami:

- `jsonrpc`: Zawsze "2.0"
- `method`: Zawsze "eth_subscription"
- `params`: Obiekt z następującymi polami:
  - `subscription`: ID subskrypcji zwrócony przez połączenie `eth_subscription`, które utworzyło tę subskrypcję.
  - `result`: Obiekt, którego zawartość różni się w zależności od rodzaju subskrypcji.

#### Rodzaj subskrypcji {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Zwraca informacje o transakcji dla wszystkich transakcji, które są dodane do stanu oczekującego. Ten typ subskrypcji subskrybuje oczekujące transakcje, podobne do standardowego połączenia Web3 `web3.eth. ubscribe("oczekujące transakcje")`, ale różni się w tym, że emituje _pełnych informacji o transakcjach_ zamiast tylko hashów transakcji.

Przykład:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["alchemy_newFullPendingTransactions"]}

<  {"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}
<  {
      "jsonrpc":"2.0",
      "method":"eth_subscription",
      "params":{
          "result":{
          "blockHash":null,
          "blockNumber":null,
          "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
          "gas":"0x1adb0",
          "gasPrice":"0x7735c4d40",
          "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
          "nonce":"0x0",
          "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
          "transactionIndex":null,
          "value":"0x0",
          "v":"0x26",
          "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
          "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
          "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
      }
  }

```

2. `newHeads`

Emituje wydarzenie w dowolnym momencie, gdy nowy nagłówek zostanie dodany do łańcucha, w tym podczas reorganizacji łańcucha.

Gdy nastąpi reorganizacja łańcucha, ta subskrypcja będzie emitować wydarzenie zawierające wszystkie nowe nagłówki dla nowego łańcucha. Oznacza to w szczególności, że można widzieć wiele emitowanych nagłówków z tą samą wysokością, i kiedy to nastąpi, późniejszy nagłówek powinien być uznany za prawidłowy po reorganizacji.

Przykład:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "difficulty":  "0x15d9223a23aa",
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "miner":  "0xf8b483dba2c3b7176a3da549ad41a48bb3121069",
          "nonce":  "0x084149998194cc5f",
          "number":  "0x1348c9",
          "parentHash":  "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
          "receiptRoot":  "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
          "sha3Uncles":  "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "stateRoot":  "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
          "timestamp":  "0x56ffeff8",
          "transactionsRoot":  "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
      },
  "subscription":  "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}

```

3. `logs`

Emituje logi będące częścią nowo dodanych bloków, które spełniają określone kryteria filtrów.

Gdy nastąpi reorganizacja łańcucha, logi będące częścią bloków starego łańcucha będą ponownie emitowane z właściwością `removed` ustawioną na `true`. Ponadto emitowane są dzienniki będące częścią bloków w nowym łańcuchu, co oznacza, że ​​w przypadku reorganizacji możliwe jest wielokrotne wyświetlanie dzienników dla tej samej transakcji.

Parametry

1. Obiekt z następującymi opcjonalnymi kluczami:
   - `adddress` (opcjonalnie): ciąg znaków reprezentujący adres lub tablica takich ciągów.
     - Tylko logi utworzone z jednego z tych adresów zostaną wysłane.
   - `topics`: tablica specyfikatorów tematów.
     - Każdy specyfikator tematu jest albo `null`, ciągiem reprezentującym temat, albo tablicą ciągów.
     - Każda pozycja w tablicy, która nie jest `null` ogranicza emitowane logi tylko do tych, którzy mają jeden z podanych tematów w tej pozycji.

Przykłady specyfikacji tematu:

- `[]`: Wszystkie dozwolone tematy.
- `[A]`: Pierwsza pozycja (i cokolwiek po).
- `[null, B]`: wszystko w pierwszej pozycji i B w drugiej pozycji (i cokolwiek po).
- `[null, B]`: wszystko w pierwszej pozycji i B w drugiej pozycji (i cokolwiek po).
- `[[A, B], [A, B]]`: (A lub B) w pierwszej pozycji i (A lub B) w drugiej pozycji (i cokolwiek po).

Przykład:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "subscription":  "0x4a8a4c0517381924f9838102c5a4dcb7",
      "result":  {
          "address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
          "blockHash":  "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
          "blockNumber":  "0x29e87",
          "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
          "logIndex":"0x0",
          "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
          "transactionHash":  "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
          "transactionIndex":  "0x0"
      }
  }
}

```

### `eth_unsubscribe` {#eth-unsubscribe}

Anuluje istniejącą subskrypcję, aby nie wysyłano żadnych kolejnych wydarzeń.

Parametry

1. ID subskrypcji, jakie zostało wcześniej zwrócone z połączenia `eth_subscribe`.

Zwraca

`true` jeśli subskrypcja została pomyślnie anulowana lub `false` jeśli nie istnieje subskrypcja z podanym identyfikatorem.

Przykład:

**Zapytanie**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'


```

**Wynik**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[Zarejestruj się w Alchemy](https://auth.alchemyapi.io/signup) za darmo, sprawdź [naszą dokumentację](https://docs.alchemyapi.io/) aby uzyskać najnowsze wiadomości, obserwuj nas na [Twitterze](https://twitter.com/AlchemyPlatform).
