---
title: Používání WebSocketů
description: Průvodce používáním WebSocketů a Alchemy k provádění JSON-RPC požadavků a odebírání událostí.
author: "Elan Halpern"
lang: cs
tags: ["alchemy", "websockets", "dotazování", "javascript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Toto je úvodní průvodce používáním WebSocketů a Alchemy k provádění požadavků na blockchain Etherea.

## WebSockets vs. HTTP {#websockets-vs-http}

Na rozdíl od HTTP nemusíte u WebSocketů neustále odesílat požadavky, když chcete konkrétní informace. WebSockety pro vás udržují síťové připojení (pokud jsou správně implementovány) a naslouchají změnám.

Jako u každého síťového připojení byste neměli předpokládat, že WebSocket zůstane otevřený navždy bez přerušení, ale správné ruční ošetření výpadků připojení a opětovného připojení může být náročné. Další nevýhodou WebSocketů je, že v odpovědi nedostáváte stavové kódy HTTP, ale pouze chybovou zprávu.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) automaticky přidává zpracování selhání WebSocketů a opakované pokusy bez nutnosti jakékoliv konfigurace.

## Vyzkoušejte si to {#try-it-out}

Nejjednodušší způsob, jak otestovat WebSockety, je nainstalovat si nástroj příkazového řádku pro odesílání WebSocket požadavků, jako je [wscat](https://github.com/websockets/wscat). Pomocí wscat můžete odesílat požadavky následovně:

_Poznámka: pokud máte účet na Alchemy, můžete nahradit `demo` svým vlastním API klíčem. [Zaregistrujte si bezplatný účet na Alchemy zde!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## Jak používat WebSockety {#how-to-use-websockets}

Pro začátek otevřete WebSocket pomocí WebSocket URL vaší aplikace. WebSocket URL vaší aplikace najdete tak, že otevřete stránku aplikace na [vašem panelu (dashboard)](https://dashboard.alchemy.com/) a kliknete na „View Key“. Všimněte si, že URL vaší aplikace pro WebSockety se liší od URL pro HTTP požadavky, ale obě lze najít kliknutím na „View Key“.

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

Jakékoliv z API uvedených v [referenční příručce Alchemy API](https://www.alchemy.com/docs/reference/api-overview) lze použít přes WebSocket. K tomu použijte stejná data (payload), která by byla odeslána jako tělo HTTP POST požadavku, ale místo toho je odešlete přes WebSocket.

## S Web3 {#with-web3}

Přechod na WebSockety při používání klientské knihovny, jako je Web3, je jednoduchý. Při vytváření instance vašeho Web3 klienta jednoduše předejte WebSocket URL místo HTTP URL. Například:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API pro odběry (Subscription API) {#subscription-api}

Při připojení přes WebSocket můžete použít dvě další metody: `eth_subscribe` a `eth_unsubscribe`. Tyto metody vám umožní naslouchat konkrétním událostem a být okamžitě upozorněni.

### `eth_subscribe` {#eth-subscribe}

Vytvoří nový odběr pro zadané události. [Zjistěte více o `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### Parametry {#parameters}

1. Typy odběrů (Subscription types)
2. Volitelné parametry (Optional params)

První argument určuje typ události, které se má naslouchat. Druhý argument obsahuje další možnosti, které závisí na prvním argumentu. Různé typy odběrů, jejich možnosti a data událostí (payloads) jsou popsány níže.

#### Návratové hodnoty {#returns}

ID odběru: Toto ID bude připojeno ke všem přijatým událostem a lze jej také použít ke zrušení odběru pomocí `eth_unsubscribe`.

#### Události odběru {#subscription-events}

Zatímco je odběr aktivní, budete dostávat události, což jsou objekty s následujícími poli:

- `jsonrpc`: Vždy "2.0"
- `method`: Vždy "eth_subscription"
- `params`: Objekt s následujícími poli:
  - `subscription`: ID odběru vrácené voláním `eth_subscribe`, které tento odběr vytvořilo.
  - `result`: Objekt, jehož obsah se liší v závislosti na typu odběru.

#### Typy odběrů {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Vrací informace o transakci pro všechny transakce, které jsou přidány do čekajícího stavu (pending state). Tento typ odběru odebírá čekající transakce, podobně jako standardní volání Web3 `web3.eth.subscribe("pendingTransactions")`, ale liší se tím, že vysílá _úplné informace o transakci_ namísto pouhých hashů transakcí.

Příklad:

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

Vyšle událost pokaždé, když je do řetězce přidána nová hlavička, a to i během reorganizace řetězce.

Když dojde k reorganizaci řetězce, tento odběr vyšle událost obsahující všechny nové hlavičky pro nový řetězec. Konkrétně to znamená, že můžete vidět více vyslaných hlaviček se stejnou výškou bloku, a když k tomu dojde, pozdější hlavička by měla být po reorganizaci považována za tu správnou.

Příklad:

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

Vysílá logy, které jsou součástí nově přidaných bloků a odpovídají zadaným kritériím filtru.

Když dojde k reorganizaci řetězce, logy, které jsou součástí bloků ve starém řetězci, budou znovu vyslány s vlastností `removed` nastavenou na `true`. Dále jsou vyslány logy, které jsou součástí bloků v novém řetězci, což znamená, že v případě reorganizace je možné vidět logy pro stejnou transakci vícekrát.

Parametry

1. Objekt s následujícími poli:
   - `address` (volitelné): buď řetězec představující adresu, nebo pole takových řetězců.
     - Budou vyslány pouze logy vytvořené z jedné z těchto adres.
   - `topics`: pole specifikátorů témat (topics).
     - Každý specifikátor tématu je buď `null`, řetězec představující téma, nebo pole řetězců.
     - Každá pozice v poli, která není `null`, omezuje vysílané logy pouze na ty, které mají na dané pozici jedno z uvedených témat.

Několik příkladů specifikací témat:

- `[]`: Povolena jakákoliv témata.
- `[A]`: A na první pozici (a cokoliv poté).
- `[null, B]`: Cokoliv na první pozici a B na druhé pozici (a cokoliv poté).
- `[A, B]`: A na první pozici a B na druhé pozici (a cokoliv poté).
- `[[A, B], [A, B]]`: (A nebo B) na první pozici a (A nebo B) na druhé pozici (a cokoliv poté).

Příklad:

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

Zruší existující odběr, takže nebudou odesílány žádné další události.

Parametry

1. ID odběru, jak bylo dříve vráceno z volání `eth_subscribe`.

Návratové hodnoty

`true`, pokud byl odběr úspěšně zrušen, nebo `false`, pokud neexistoval žádný odběr s daným ID.

Příklad:

**Požadavek**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```

**Výsledek**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[Zaregistrujte se na Alchemy](https://auth.alchemy.com) zdarma, podívejte se na [naši dokumentaci](https://www.alchemy.com/docs/) a pro nejnovější zprávy nás sledujte na [Twitteru](https://x.com/AlchemyPlatform).