---
title: "Používání WebSocketů"
description: "Průvodce používáním WebSocketů k provádění JSON-RPC požadavků a odebírání událostí u jakéhokoli poskytovatele uzlů Etherea."
author: "Elan Halpern"
lang: cs
tags: ["Alchemy", "websockets", "dotazování", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Toto je úvodní průvodce používáním WebSocketů k odesílání požadavků na blockchain Etherea. Příklady používají standardní metody JSON-RPC, takže fungují s jakýmkoli uzlem nebo poskytovatelem uzlů, který nabízí koncový bod WebSocket, včetně Alchemy.

## WebSockets vs. HTTP {#websockets-vs-http}

Na rozdíl od HTTP u WebSocketů nemusíte neustále odesílat požadavky, když chcete konkrétní informace. WebSockety pro vás udržují síťové připojení (pokud jsou správně implementovány) a naslouchají změnám.

Stejně jako u jakéhokoli síťového připojení byste neměli předpokládat, že WebSocket zůstane otevřený navždy bez přerušení, ale správné ruční zpracování přerušených připojení a opětovného připojení může být náročné. Další nevýhodou WebSocketů je, že v odpovědi nedostáváte stavové kódy HTTP, ale pouze chybovou zprávu.

Klientské knihovny to mohou vyřešit za vás. Například [WebSocket transport knihovny Viem](https://viem.sh/docs/clients/transports/websocket) se ve výchozím nastavení při selhání socketu znovu připojí a odesílá udržovací (keep-alive) pingy.

## Vyzkoušejte si to {#try-it-out}

Potřebujete WebSocket URL pro uzel Etherea. Poskytovatelé uzlů vám ho dají, když si vytvoříte klíč rozhraní pro programování aplikací (API), obvykle ve formátu `wss://<provider-host>/<your-api-key>`. Například URL pro Ethereum Mainnet od Alchemy vypadá jako `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([zaregistrujte si bezplatný účet Alchemy](https://auth.alchemy.com/signup)). Podívejte se na [uzly jako službu](/developers/docs/nodes-and-clients/nodes-as-a-service/) pro další poskytovatele, nebo použijte koncový bod WebSocket [vašeho vlastního uzlu](/developers/docs/nodes-and-clients/run-a-node/). Veřejné koncové body jako `wss://ethereum-rpc.publicnode.com` také fungují pro rychlé experimenty, ale mají omezenou rychlost (rate-limited) a nemusí podporovat každý typ odběru.

Nejjednodušší způsob, jak otestovat WebSockety, je nainstalovat nástroj příkazového řádku pro odesílání WebSocket požadavků, jako je [wscat](https://github.com/websockets/wscat). Pomocí wscat můžete odesílat požadavky následovně:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Řádky začínající `>` jsou to, co píšete, a řádky začínající `<` jsou to, co uzel posílá zpět.

## Jak používat WebSockety {#how-to-use-websockets}

Chcete-li začít, otevřete WebSocket pomocí WebSocket URL vašeho poskytovatele. U Alchemy ho najdete tak, že otevřete svou aplikaci v [řídicím panelu](https://dashboard.alchemy.com/) a zobrazíte její klíč rozhraní pro programování aplikací (API). Všimněte si, že URL pro WebSockety (`wss://`) se liší od URL pro HTTP požadavky (`https://`), ačkoli většina poskytovatelů používá stejný API klíč pro obojí.

![Kde najít WebSocket URL v řídicím panelu Alchemy](./use-websockets.mp4#602x280)

Jakákoli z [metod JSON-RPC](/developers/docs/apis/json-rpc/), kterou váš poskytovatel podporuje, může být použita přes WebSocket. K tomu použijte stejná data (payload), která by byla odeslána jako tělo HTTP POST požadavku, ale místo toho je odešlete přes WebSocket.

## S Web3 {#with-web3}

Přechod na WebSockety při používání klientské knihovny, jako je [Viem](https://viem.sh/), je jednoduchý. Použijte transport `webSocket` s vaším WebSocket URL místo transportu `http`. Například po `npm install viem` uložte toto jako `index.mjs` a spusťte `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Přihlásit se k odběru nových bloků přes stejný WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## API pro odběry (Subscription API) {#subscription-api}

Při připojení přes WebSocket můžete použít dvě další metody: `eth_subscribe` a `eth_unsubscribe`. Tyto metody vám umožní naslouchat konkrétním událostem a být okamžitě upozorněni.

### `eth_subscribe` {#eth-subscribe}

Vytvoří nový odběr pro zadané události. [Zjistěte více o `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

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

1. `newHeads`

Vyvolá událost pokaždé, když je do řetězce přidána nová hlavička, a to i během reorganizace řetězce.

Když dojde k reorganizaci řetězce, tento odběr vyvolá událost obsahující všechny nové hlavičky pro nový řetězec. Konkrétně to znamená, že můžete vidět více hlaviček vyvolaných se stejnou výškou, a když k tomu dojde, pozdější hlavička by měla být po reorganizaci považována za tu správnou.

Příklad:

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

Vyvolává logy, které jsou součástí nově přidaných bloků a odpovídají zadaným kritériím filtru.

Když dojde k reorganizaci řetězce, logy, které jsou součástí bloků ve starém řetězci, budou znovu vyvolány s vlastností `removed` nastavenou na `true`. Dále jsou vyvolány logy, které jsou součástí bloků v novém řetězci, což znamená, že v případě reorganizace je možné vidět logy pro stejnou transakci vícekrát.

Parametry

1. Objekt s následujícími poli:
   - `address` (volitelné): buď řetězec představující adresu, nebo pole takových řetězců.
     - Budou vyvolány pouze logy vytvořené z jedné z těchto adres.
   - `topics`: pole specifikátorů témat.
     - Každý specifikátor tématu je buď `null`, řetězec představující téma, nebo pole řetězců.
     - Každá pozice v poli, která není `null`, omezuje vyvolané logy pouze na ty, které mají na dané pozici jedno z uvedených témat.

Několik příkladů specifikací témat:

- `[]`: Povolena jakákoli témata.
- `[A]`: A na první pozici (a cokoli za ním).
- `[null, B]`: Cokoli na první pozici a B na druhé pozici (a cokoli za ním).
- `[A, B]`: A na první pozici a B na druhé pozici (a cokoli za ním).
- `[[A, B], [A, B]]`: (A nebo B) na první pozici a (A nebo B) na druhé pozici (a cokoli za ním).

Příklad:

Tento příklad naslouchá událostem `Deposit` z [kontraktu zabaleného etheru (WETH)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) na síti Ethereum Mainnet:

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

Vyvolá hash každé transakce, která je přidána do čekajícího stavu uzlu (jeho mempoolu).

Příklad:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Někteří poskytovatelé nabízejí také své vlastní typy odběrů. Například [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) od Alchemy vyvolává _celé objekty transakcí_ místo pouhých hashů a přijímá volitelné filtry `fromAddress`, `toAddress` a `hashesOnly`. Ty nejsou součástí standardního JSON-RPC rozhraní pro programování aplikací (API), takže fungují pouze s tímto poskytovatelem.

### `eth_unsubscribe` {#eth-unsubscribe}

Zruší existující odběr, takže již nebudou odesílány žádné další události.

Parametry

1. ID odběru, jak bylo dříve vráceno z volání `eth_subscribe`.

Návratové hodnoty

`true`, pokud byl odběr úspěšně zrušen, nebo `false`, pokud neexistoval žádný odběr s daným ID.

Odběr existuje pouze na WebSocket připojení, které jej vytvořilo, takže `eth_unsubscribe` musí být odesláno přes stejné připojení. Nelze jej odeslat jako samostatný HTTP požadavek. Uzavření připojení také zruší všechny jeho odběry.

Příklad:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Zaregistrujte se u Alchemy](https://auth.alchemy.com) zdarma, podívejte se na [dokumentaci Alchemy](https://www.alchemy.com/docs/) a pro nejnovější zprávy sledujte Alchemy na [Twitteru](https://x.com/Alchemy).
