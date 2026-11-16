---
title: Korzystanie z WebSockets
description: "Przewodnik po korzystaniu z WebSockets do wykonywania żądań JSON-RPC i subskrybowania zdarzeń u dowolnego dostawcy węzłów Ethereum."
author: "Elan Halpern"
lang: pl
tags: ["Alchemy", "websockets", "zapytania", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

To jest przewodnik dla początkujących dotyczący korzystania z WebSockets do wysyłania żądań do blockchaina Ethereum. Przykłady wykorzystują standardowe metody JSON-RPC, więc działają z każdym węzłem lub dostawcą węzłów, który oferuje punkt końcowy WebSocket, w tym z Alchemy.

## WebSockets a HTTP {#websockets-vs-http}

W przeciwieństwie do HTTP, w przypadku WebSockets nie musisz ciągle wysyłać żądań, gdy chcesz uzyskać określone informacje. WebSockets utrzymują dla Ciebie połączenie sieciowe (jeśli są zaimplementowane poprawnie) i nasłuchują zmian.

Podobnie jak w przypadku każdego połączenia sieciowego, nie należy zakładać, że WebSocket pozostanie otwarty na zawsze bez przerw, ale prawidłowe ręczne obsługiwanie zerwanych połączeń i ponownego łączenia może być trudne do poprawnego wykonania. Kolejną wadą WebSockets jest to, że nie otrzymujesz kodów statusu HTTP w odpowiedzi, a jedynie wiadomość o błędzie.

Biblioteki klienckie mogą to obsłużyć za Ciebie. Na przykład [transport WebSocket biblioteki Viem](https://viem.sh/docs/clients/transports/websocket) domyślnie łączy się ponownie w przypadku awarii gniazda i wysyła pingi podtrzymujące połączenie (keep-alive).

## Wypróbuj {#try-it-out}

Potrzebujesz adresu URL WebSocket dla węzła Ethereum. Dostawcy węzłów udostępniają go podczas tworzenia klucza interfejsu programowania aplikacji (API), zazwyczaj w postaci `wss://<provider-host>/<your-api-key>`. Na przykład adres URL sieci głównej Ethereum w Alchemy wygląda tak: `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([zarejestruj darmowe konto Alchemy](https://auth.alchemy.com/signup)). Zobacz [węzły jako usługa](/developers/docs/nodes-and-clients/nodes-as-a-service/), aby znaleźć innych dostawców, lub użyj punktu końcowego WebSocket [własnego węzła](/developers/docs/nodes-and-clients/run-a-node/). Publiczne punkty końcowe, takie jak `wss://ethereum-rpc.publicnode.com`, również sprawdzają się w szybkich eksperymentach, ale mają ograniczenia przepustowości (rate-limited) i mogą nie obsługiwać każdego typu subskrypcji.

Najprostszym sposobem na przetestowanie WebSockets jest zainstalowanie narzędzia wiersza poleceń do wysyłania żądań WebSocket, takiego jak [wscat](https://github.com/websockets/wscat). Używając wscat, możesz wysyłać żądania w następujący sposób:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Linie zaczynające się od `>` to to, co wpisujesz, a linie zaczynające się od `<` to to, co odsyła węzeł.

## Jak korzystać z WebSockets {#how-to-use-websockets}

Aby rozpocząć, otwórz WebSocket, używając adresu URL WebSocket swojego dostawcy. W przypadku Alchemy możesz go znaleźć, otwierając swoją aplikację w [panelu sterowania](https://dashboard.alchemy.com/) i wyświetlając jej klucz interfejsu programowania aplikacji (API). Zauważ, że adres URL dla WebSockets (`wss://`) różni się od adresu URL dla żądań HTTP (`https://`), chociaż większość dostawców używa tego samego klucza API dla obu.

![Gdzie znaleźć adres URL WebSocket w panelu Alchemy](./use-websockets.mp4#602x280)

Każda z [metod JSON-RPC](/developers/docs/apis/json-rpc/), którą obsługuje Twój dostawca, może być używana przez WebSocket. Aby to zrobić, użyj tego samego ładunku (payload), który zostałby wysłany jako treść żądania HTTP POST, ale zamiast tego wyślij ten ładunek przez WebSocket.

## Z Web3 {#with-web3}

Przejście na WebSockets podczas korzystania z biblioteki klienckiej, takiej jak [Viem](https://viem.sh/), jest proste. Użyj transportu `webSocket` ze swoim adresem URL WebSocket zamiast transportu `http`. Na przykład, po wykonaniu `npm install viem`, zapisz to jako `index.mjs` i uruchom `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Subskrybuj nowe bloki przez ten sam WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## API subskrypcji {#subscription-api}

Po połączeniu przez WebSocket możesz użyć dwóch dodatkowych metod: `eth_subscribe` oraz `eth_unsubscribe`. Metody te pozwolą Ci nasłuchiwać określonych zdarzeń i otrzymywać natychmiastowe powiadomienia.

### `eth_subscribe` {#eth-subscribe}

Tworzy nową subskrypcję dla określonych zdarzeń. [Dowiedz się więcej o `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

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

1. `newHeads`

Emituje zdarzenie za każdym razem, gdy do łańcucha dodawany jest nowy nagłówek, w tym podczas reorganizacji łańcucha.

Gdy nastąpi reorganizacja łańcucha, ta subskrypcja wyemituje zdarzenie zawierające wszystkie nowe nagłówki dla nowego łańcucha. W szczególności oznacza to, że możesz zobaczyć wiele nagłówków wyemitowanych z tą samą wysokością, a gdy to nastąpi, późniejszy nagłówek powinien zostać uznany za prawidłowy po reorganizacji.

Przykład:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

Emituje logi, które są częścią nowo dodanych bloków i pasują do określonych kryteriów filtrowania.

Gdy nastąpi reorganizacja łańcucha, logi będące częścią bloków w starym łańcuchu zostaną wyemitowane ponownie z właściwością `removed` ustawioną na `true`. Ponadto emitowane są logi będące częścią bloków w nowym łańcuchu, co oznacza, że w przypadku reorganizacji możliwe jest wielokrotne zobaczenie logów dla tej samej transakcji.

Parametry

1. Obiekt z następującymi polami:
   - `address` (opcjonalnie): ciąg znaków reprezentujący adres lub tablica takich ciągów.
     - Emitowane będą tylko logi utworzone z jednego z tych adresów.
   - `topics`: tablica specyfikatorów tematów.
     - Każdy specyfikator tematu to `null`, ciąg znaków reprezentujący temat lub tablica ciągów znaków.
     - Każda pozycja w tablicy, która nie jest `null`, ogranicza emitowane logi tylko do tych, które mają jeden z podanych tematów na tej pozycji.

Kilka przykładów specyfikacji tematów:

- `[]`: Dozwolone dowolne tematy.
- `[A]`: A na pierwszej pozycji (i cokolwiek po nim).
- `[null, B]`: Cokolwiek na pierwszej pozycji i B na drugiej pozycji (i cokolwiek po nim).
- `[A, B]`: A na pierwszej pozycji i B na drugiej pozycji (i cokolwiek po nim).
- `[[A, B], [A, B]]`: (A lub B) na pierwszej pozycji i (A lub B) na drugiej pozycji (i cokolwiek po nim).

Przykład:

Ten przykład nasłuchuje zdarzeń `Deposit` z [kontraktu WETH](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) w sieci głównej Ethereum:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

Emituje hash każdej transakcji, która jest dodawana do oczekującego stanu węzła (jego mempool).

Przykład:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Niektórzy dostawcy oferują również własne typy subskrypcji. Na przykład [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) od Alchemy emituje _pełne obiekty transakcji_ zamiast tylko hashów i akceptuje opcjonalne filtry `fromAddress`, `toAddress` oraz `hashesOnly`. Nie są one częścią standardowego interfejsu programowania aplikacji (API) JSON-RPC, więc działają tylko z tym dostawcą.

### `eth_unsubscribe` {#eth-unsubscribe}

Anuluje istniejącą subskrypcję, dzięki czemu nie są wysyłane żadne kolejne zdarzenia.

Parametry

1. ID subskrypcji, zwrócone wcześniej z wywołania `eth_subscribe`.

Zwraca

`true`, jeśli subskrypcja została pomyślnie anulowana, lub `false`, jeśli nie istniała subskrypcja o podanym ID.

Subskrypcja istnieje tylko w połączeniu WebSocket, które ją utworzyło, więc `eth_unsubscribe` musi zostać wysłane przez to samo połączenie. Nie można go wysłać jako oddzielnego żądania HTTP. Zamknięcie połączenia anuluje również wszystkie jego subskrypcje.

Przykład:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Zarejestruj się w Alchemy](https://auth.alchemy.com) za darmo, sprawdź [dokumentację Alchemy](https://www.alchemy.com/docs/) i śledź Alchemy na [Twitterze](https://x.com/Alchemy), aby być na bieżąco z najnowszymi wiadomościami.
