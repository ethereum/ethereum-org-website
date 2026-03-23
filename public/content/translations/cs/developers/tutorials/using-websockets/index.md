---
title: "Použití WebSocketů"
description: "Průvodce používáním WebSocketů a Alchemy k provádění požadavků JSON-RPC a přihlašování k odběru událostí."
author: "Elan Halpern"
lang: cs
tags: [ "alchemy", "websockety", "dotazování", "javascript" ]
skill: beginner
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Toto je úvodní průvodce používáním WebSocketů a Alchemy k zadávání požadavků na blockchain Ethereum.

## WebSockets vs. HTTP {#websockets-vs-http}

Na rozdíl od protokolu HTTP s WebSockety nemusíte neustále zadávat požadavky, když chcete získat konkrétní informace. WebSockety za vás udržují síťové připojení (pokud jsou správně nastaveny) a naslouchají změnám.

Stejně jako u jakéhokoli síťového připojení byste neměli předpokládat, že WebSocket zůstane otevřený navždy bez přerušení, ale správné ruční řešení přerušených připojení a opětovné připojení může být náročné. Další nevýhodou WebSocketů je, že v odpovědi nedostáváte stavové kódy HTTP, ale pouze chybovou zprávu.

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) automaticky přidává zpracování selhání WebSocketu a opakované pokusy bez nutnosti konfigurace.

## Vyzkoušejte si to {#try-it-out}

Nejjednodušší způsob, jak otestovat WebSockety, je nainstalovat si nástroj pro příkazový řádek pro vytváření požadavků WebSocket, jako je [wscat](https://github.com/websockets/wscat). Pomocí wscat můžete odesílat požadavky následovně:

_Poznámka: pokud máte účet Alchemy, můžete nahradit `demo` svým vlastním klíčem API._ [Zaregistrujte si zde bezplatný účet Alchemy!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## Jak používat WebSockety {#how-to-use-websockets}

Pro začátek otevřete WebSocket pomocí adresy URL WebSocketu pro vaši aplikaci. URL WebSocketu pro vaši aplikaci najdete tak, že otevřete stránku aplikace ve [svém ovládacím panelu](https://dashboard.alchemy.com/) a kliknete na „View Key“. Všimněte si, že adresa URL vaší aplikace pro WebSockety se liší od její adresy URL pro požadavky HTTP, ale obě najdete kliknutím na „View Key“.

![Kde najít URL adresu svého WebSocketu na ovládacím panelu Alchemy](./use-websockets.gif)

Jakékoli z API uvedených v [referenční příručce Alchemy API](https://www.alchemy.com/docs/reference/api-overview) lze použít přes WebSocket. K tomu použijte stejný payload, který by byl odeslán jako tělo požadavku HTTP POST, ale místo toho jej odešlete prostřednictvím WebSocketu.

## S Web3 {#with-web3}

Přechod na WebSockety při použití klientské knihovny, jako je Web3, je jednoduchý. Při vytváření instance klienta Web3 jednoduše předejte URL WebSocketu místo URL protokolu HTTP. Například:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/vas-api-klic")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API pro přihlášení k odběru {#subscription-api}

Po připojení přes WebSocket můžete použít dvě další metody: `eth_subscribe` a `eth_unsubscribe`. Tyto metody vám umožní naslouchat konkrétním událostem a být o nich okamžitě informováni.

### `eth_subscribe` {#eth-subscribe}

Vytvoří nové přihlášení k odběru pro zadané události. [Zjistěte více o `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### Parametry {#parameters}

1. Typy přihlášení k odběru
2. Volitelné parametry

První argument určuje typ události, které se má naslouchat. Druhý argument obsahuje další možnosti, které závisí na prvním argumentu. Různé typy popisů, jejich možnosti a payloady událostí jsou popsány níže.

#### Návratové hodnoty {#returns}

ID přihlášení k odběru: Toto ID bude připojeno ke všem přijatým událostem a lze ho také použít ke zrušení přihlášení k odběru pomocí `eth_unsubscribe`.

#### Události přihlášení k odběru {#subscription-events}

Zatímco je přihlášení k odběru aktivní, budete dostávat události, které jsou objekty s následujícími poli:

- `jsonrpc`: Vždy "2.0"
- `method`: Vždy "eth_subscription"
- `params`: Objekt s následujícími poli:
  - `subscription`: ID přihlášení k odběru vrácené voláním `eth_subscribe`, které toto přihlášení k odběru vytvořilo.
  - `result`: Objekt, jehož obsah se liší v závislosti na typu přihlášení k odběru.

#### Typy přihlášení k odběru {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Vrací informace o transakcích pro všechny transakce, které jsou přidány do nevyřízeného stavu. Tento typ přihlášení k odběru se přihlásí k odběru nevyřízených transakcí, podobně jako standardní volání Web3 `web3.eth.subscribe("pendingTransactions")`, ale liší se v tom, že emituje _úplné informace o transakci_, nikoli pouze haše transakcí.

Např.:

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

Emituje událost vždy, když je do řetězce přidána nová hlavička, a to i během reorganizace řetězce.

Když dojde k reorganizaci řetězce, toto přihlášení k odběru bude emitovat událost obsahující všechny nové hlavičky pro nový řetězec. Zejména to znamená, že se může stát, že uvidíte více hlaviček emitovaných se stejnou výškou, a když k tomu dojde, měla by být pozdější hlavička po reorganizaci považována za tu správnou.

Např.:

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

Emituje záznamy, které jsou součástí nově přidaných bloků, které odpovídají zadaným kritériím filtru.

Když dojde k reorganizaci řetězce, záznamy, které jsou součástí bloků ve starém řetězci, budou znovu emitovány s vlastností `removed` nastavenou na `true`. Dále se emitují záznamy, které jsou součástí bloků v novém řetězci, což znamená, že v případě reorganizace je možné vidět záznamy pro stejnou transakci vícekrát.

Parametry

1. Objekt s následujícími poli:
   - `address` (volitelné): buď řetězec představující adresu, nebo pole takových řetězců.
     - Budou emitovány pouze záznamy vytvořené z jedné z těchto adres.
   - `topics`: pole specifikátorů témat.
     - Každý specifikátor tématu je buď `null`, řetězec představující téma, nebo pole řetězců.
     - Každá pozice v poli, která není `null`, omezuje emitované záznamy pouze na ty, které mají na dané pozici jedno z daných témat.

Některé příklady specifikací témat:

- `[]`: Všechna témata jsou povolena.
- `[A]`: A na první pozici (a cokoliv dalšího).
- `[null, B]`: Cokoliv na první pozici a B na druhé pozici (a cokoliv dalšího).
- `[A, B]`: A na první pozici a B na druhé pozici (a cokoliv dalšího).
- `[[A, B], [A, B]]`: (A nebo B) na první pozici a (A nebo B) na druhé pozici (a cokoliv dalšího).

Např.:

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

Zruší existující přihlášení k odběru, takže nebudou odesílány žádné další události.

Parametry

1. ID přihlášení k odběru, jak bylo dříve vráceno z volání `eth_subscribe`.

Návratová hodnota

`true`, pokud bylo přihlášení k odběru úspěšně zrušeno, nebo `false`, pokud s daným ID žádné přihlášení k odběru neexistovalo.

Např.:

**Požadavek**

```
curl https://eth-mainnet.alchemyapi.io/v2/vas-api-klic
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

Zaregistrujte se zdarma u [Alchemy](https://auth.alchemy.com), podívejte se na naši [dokumentaci](https://www.alchemy.com/docs/) a pro nejnovější zprávy nás sledujte na [Twitteru](https://x.com/AlchemyPlatform).
