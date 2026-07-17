---
title: Korzystanie z WebSockets
description: "Przewodnik po korzystaniu z WebSockets i Alchemy do wykonywania żądań JSON-RPC i subskrybowania zdarzeń."
author: "Elan Halpern"
lang: pl
tags: ["Alchemy", "websockets", "zapytania", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

To jest przewodnik dla początkujących dotyczący korzystania z WebSockets i Alchemy do wysyłania żądań do blockchaina Ethereum.

## WebSockets a HTTP {#websockets-vs-http}

W przeciwieństwie do HTTP, w przypadku WebSockets nie musisz ciągle wysyłać żądań, gdy chcesz uzyskać konkretne informacje. WebSockets utrzymują dla Ciebie połączenie sieciowe (jeśli są zaimplementowane prawidłowo) i nasłuchują zmian.

Podobnie jak w przypadku każdego połączenia sieciowego, nie należy zakładać, że WebSocket pozostanie otwarty na zawsze bez przerw, ale prawidłowa ręczna obsługa zerwanych połączeń i ponownego łączenia może być trudna do poprawnego zaimplementowania. Kolejną wadą WebSockets jest to, że w odpowiedzi nie otrzymujesz kodów statusu HTTP, a jedynie wiadomość o błędzie.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) automatycznie dodaje obsługę awarii WebSockets i ponownych prób bez konieczności konfiguracji.

## Wypróbuj {#try-it-out}

Najprostszym sposobem na przetestowanie WebSockets jest zainstalowanie narzędzia wiersza poleceń do wysyłania żądań WebSocket, takiego jak [wscat](https://github.com/websockets/wscat). Używając wscat, możesz wysyłać żądania w następujący sposób:

_Uwaga: jeśli masz konto Alchemy, możesz zastąpić `demo` własnym kluczem API. [Zarejestruj darmowe konto Alchemy tutaj!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## Jak korzystać z WebSockets {#how-to-use-websockets}

Aby rozpocząć, otwórz WebSocket, używając adresu URL WebSocket dla swojej aplikacji. Adres URL WebSocket swojej aplikacji znajdziesz, otwierając stronę aplikacji w [swoim panelu](https://dashboard.alchemy.com/) i klikając „View Key”. Zauważ, że adres URL Twojej aplikacji dla WebSockets różni się od adresu URL dla żądań HTTP, ale oba można znaleźć, klikając „View Key”.

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

Każde z API wymienionych w [Dokumentacji API Alchemy](https://www.alchemy.com/docs/reference/api-overview) może być używane przez WebSocket. Aby to zrobić, użyj tego samego ładunku (payload), który zostałby wysłany jako treść żądania HTTP POST, ale zamiast tego wyślij ten ładunek przez WebSocket.

## Z Web3 {#with-web3}

Przejście na WebSockets podczas korzystania z biblioteki klienta, takiej jak Web3, jest proste. Wystarczy przekazać adres URL WebSocket zamiast adresu HTTP podczas tworzenia instancji klienta Web3. Na przykład:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API subskrypcji {#subscription-api}

Po połączeniu przez WebSocket możesz użyć dwóch dodatkowych metod: `eth_subscribe` oraz `eth_unsubscribe`. Metody te pozwolą Ci nasłuchiwać określonych zdarzeń i otrzymywać natychmiastowe powiadomienia.

### `eth_subscribe` {#eth-subscribe}

Tworzy nową subskrypcję dla określonych zdarzeń. [Dowiedz się więcej o `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### Parametry {#parameters}

1. Typy subskrypcji
2. Opcjonalne parametry

Pierwszy argument określa typ zdarzenia, którego należy nasłuchiwać. Drugi argument zawiera dodatkowe opcje, które zależą od pierwszego argumentu. Różne typy subskrypcji, ich opcje i ładunki zdarzeń opisano poniżej.

#### Zwraca {#returns}

ID subskrypcji: To ID będzie dołączone do wszystkich odebranych zdarzeń i może być również użyte do anulowania subskrypcji za pomocą `eth_unsubscribe`.

#### Zdarzenia subskrypcji {#subscription-events}

Dopóki subskrypcja jest aktywna, będziesz otrzymywać zdarzenia, które są obiektami z następującymi polami:

- `jsonrpc`: Zawsze "2.0"
- `method`: Zawsze "eth_subscription"
- `params`: Obiekt z następującymi polami:
  - `subscription`: ID subskrypcji zwrócone przez wywołanie `eth_subscribe`, które utworzyło tę subskrypcję.
  - `result`: Obiekt, którego zawartość różni się w zależności od typu subskrypcji.

#### Typy subskrypcji {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Zwraca informacje o transakcji dla wszystkich transakcji, które zostały dodane do stanu oczekującego. Ten typ subskrypcji subskrybuje oczekujące transakcje, podobnie jak standardowe wywołanie Web3 `web3.eth.subscribe("pendingTransactions")`, ale różni się tym, że emituje _pełne informacje o transakcji_, a nie tylko hashe transakcji.

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

Emituje zdarzenie za każdym razem, gdy do łańcucha dodawany jest nowy nagłówek, w tym podczas reorganizacji łańcucha.

Gdy nastąpi reorganizacja łańcucha, ta subskrypcja wyemituje zdarzenie zawierające wszystkie nowe nagłówki dla nowego łańcucha. W szczególności oznacza to, że możesz zobaczyć wiele nagłówków wyemitowanych z tą samą wysokością, a gdy to nastąpi, późniejszy nagłówek powinien zostać uznany za prawidłowy po reorganizacji.

Przykład:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
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

Emituje logi, które są częścią nowo dodanych bloków i pasują do określonych kryteriów filtrowania.

Gdy nastąpi reorganizacja łańcucha, logi będące częścią bloków w starym łańcuchu zostaną wyemitowane ponownie z właściwością `removed` ustawioną na `true`. Ponadto emitowane są logi będące częścią bloków w nowym łańcuchu, co oznacza, że w przypadku reorganizacji możliwe jest wielokrotne zobaczenie logów dla tej samej transakcji.

Parametry

1. Obiekt z następującymi polami:
   - `address` (opcjonalnie): ciąg znaków reprezentujący adres lub tablica takich ciągów.
     - Emitowane będą tylko logi utworzone z jednego z tych adresów.
   - `topics`: tablica specyfikatorów tematów (topics).
     - Każdy specyfikator tematu to `null`, ciąg znaków reprezentujący temat lub tablica ciągów znaków.
     - Każda pozycja w tablicy, która nie jest `null`, ogranicza emitowane logi tylko do tych, które mają jeden z podanych tematów na tej pozycji.

Kilka przykładów specyfikacji tematów:

- `[]`: Dozwolone dowolne tematy.
- `[A]`: A na pierwszej pozycji (i cokolwiek po nim).
- `[null, B]`: Cokolwiek na pierwszej pozycji i B na drugiej pozycji (i cokolwiek po nim).
- `[A, B]`: A na pierwszej pozycji i B na drugiej pozycji (i cokolwiek po nim).
- `[[A, B], [A, B]]`: (A lub B) na pierwszej pozycji i (A lub B) na drugiej pozycji (i cokolwiek po nim).

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

Anuluje istniejącą subskrypcję, dzięki czemu nie są wysyłane żadne kolejne zdarzenia.

Parametry

1. ID subskrypcji, wcześniej zwrócone z wywołania `eth_subscribe`.

Zwraca

`true`, jeśli subskrypcja została pomyślnie anulowana, lub `false`, jeśli nie istniała subskrypcja o podanym ID.

Przykład:

**Żądanie**

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

[Zarejestruj się w Alchemy](https://auth.alchemy.com) za darmo, sprawdź [naszą dokumentację](https://www.alchemy.com/docs/), a po najnowsze wiadomości śledź nas na [Twitterze](https://x.com/AlchemyPlatform).