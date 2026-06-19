---
title: Kutumia WebSockets
description: Mwongozo wa kutumia WebSockets na Alchemy kufanya maombi ya JSON-RPC na kujiandikisha kwa matukio.
author: "Elan Halpern"
lang: sw
tags: ["alchemy", "websockets", "kudadisi", "javascript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Huu ni mwongozo wa kiwango cha kuanzia wa kutumia WebSockets na Alchemy kufanya maombi kwenye mnyororo wa vitalu wa Ethereum.

## WebSockets dhidi ya HTTP {#websockets-vs-http}

Tofauti na HTTP, ukiwa na WebSockets, huhitaji kufanya maombi mfululizo unapohitaji taarifa maalum. WebSockets hudumisha muunganisho wa mtandao kwa ajili yako (kama ikifanywa kwa usahihi) na kusikiliza mabadiliko.

Kama ilivyo kwa muunganisho wowote wa mtandao, hupaswi kudhani kuwa WebSocket itabaki wazi milele bila kukatizwa, lakini kushughulikia kwa usahihi miunganisho iliyokatika na kuunganisha tena kwa mikono inaweza kuwa changamoto kupata usahihi. Hasara nyingine ya WebSockets ni kwamba hupati misimbo ya hali ya HTTP katika majibu, bali unapata tu ujumbe wa hitilafu.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) huongeza kiotomatiki ushughulikiaji wa hitilafu za WebSocket na kujaribu tena bila usanidi wowote unaohitajika.

## Ijaribu {#try-it-out}

Njia rahisi zaidi ya kujaribu WebSockets ni kusakinisha zana ya mstari wa amri kwa ajili ya kufanya maombi ya WebSocket kama vile [wscat](https://github.com/websockets/wscat). Kwa kutumia wscat, unaweza kutuma maombi kama ifuatavyo:

_Kumbuka: ikiwa una akaunti ya Alchemy unaweza kubadilisha `demo` na ufunguo wako wa API. [Jisajili kwa akaunti ya bure ya Alchemy hapa!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## Jinsi ya kutumia WebSockets {#how-to-use-websockets}

Ili kuanza, fungua WebSocket ukitumia URL ya WebSocket kwa programu yako. Unaweza kupata URL ya WebSocket ya programu yako kwa kufungua ukurasa wa programu katika [dashibodi yako](https://dashboard.alchemy.com/) na kubofya "View Key". Kumbuka kwamba URL ya programu yako kwa WebSockets ni tofauti na URL yake kwa maombi ya HTTP, lakini zote zinaweza kupatikana kwa kubofya "View Key".

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

API yoyote iliyoorodheshwa katika [Rejeleo la API ya Alchemy](https://www.alchemy.com/docs/reference/api-overview) inaweza kutumika kupitia WebSocket. Ili kufanya hivyo, tumia mzigo (payload) uleule ambao ungetumwa kama kiini cha ombi la HTTP POST, lakini badala yake tuma mzigo huo kupitia WebSocket.

## Pamoja na Web3 {#with-web3}

Kubadilika kwenda kwenye WebSockets unapotumia maktaba ya mteja kama Web3 ni rahisi. Pitisha tu URL ya WebSocket badala ya ile ya HTTP unapounda mteja wako wa Web3. Kwa mfano:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API ya Usajili {#subscription-api}

Unapounganishwa kupitia WebSocket, unaweza kutumia mbinu mbili za ziada: `eth_subscribe` na `eth_unsubscribe`. Mbinu hizi zitakuruhusu kusikiliza matukio mahususi na kujulishwa mara moja.

### `eth_subscribe` {#eth-subscribe}

Hutengeneza usajili mpya kwa matukio yaliyobainishwa. [Jifunze zaidi kuhusu `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### Vigezo {#parameters}

1. Aina za usajili
2. Vigezo vya hiari

Hoja ya kwanza inabainisha aina ya tukio la kusikiliza. Hoja ya pili ina chaguo za ziada ambazo zinategemea hoja ya kwanza. Aina tofauti za maelezo, chaguo zake, na mizigo ya matukio yake yameelezwa hapa chini.

#### Hurejesha {#returns}

Kitambulisho cha usajili: Kitambulisho hiki kitaambatishwa kwenye matukio yoyote yaliyopokelewa, na kinaweza pia kutumika kughairi usajili kwa kutumia `eth_unsubscribe`.

#### Matukio ya usajili {#subscription-events}

Wakati usajili unaendelea, utapokea matukio ambayo ni vipengee (objects) vyenye nyanja zifuatazo:

- `jsonrpc`: Kila wakati "2.0"
- `method`: Kila wakati "eth_subscription"
- `params`: Kipengee chenye nyanja zifuatazo:
  - `subscription`: Kitambulisho cha usajili kilichorejeshwa na wito wa `eth_subscribe` uliotengeneza usajili huu.
  - `result`: Kipengee ambacho yaliyomo yake hutofautiana kulingana na aina ya usajili.

#### Aina za usajili {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Hurejesha taarifa za muamala kwa miamala yote inayoongezwa kwenye hali inayosubiri. Aina hii ya usajili hujiandikisha kwa miamala inayosubiri, sawa na wito wa kawaida wa Web3 `web3.eth.subscribe("pendingTransactions")`, lakini inatofautiana kwa kuwa inatoa _taarifa kamili za muamala_ badala ya heshi za muamala pekee.

Mfano:

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

Hutoa tukio wakati wowote kichwa kipya kinapoongezwa kwenye mnyororo, ikiwa ni pamoja na wakati wa upangaji upya wa mnyororo.

Wakati upangaji upya wa mnyororo unapotokea, usajili huu utatoa tukio lenye vichwa vyote vipya kwa mnyororo mpya. Hasa, hii inamaanisha kuwa unaweza kuona vichwa vingi vikitolewa vikiwa na urefu sawa, na hili linapotokea kichwa cha baadaye kinapaswa kuchukuliwa kama kile sahihi baada ya upangaji upya.

Mfano:

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

Hutoa kumbukumbu (logs) ambazo ni sehemu ya vitalu vilivyoongezwa hivi karibuni vinavyolingana na vigezo maalum vya kuchuja.

Wakati upangaji upya wa mnyororo unapotokea, kumbukumbu ambazo ni sehemu ya vitalu kwenye mnyororo wa zamani zitatolewa tena huku sifa ya `removed` ikiwekwa kuwa `true`. Zaidi ya hayo, kumbukumbu ambazo ni sehemu ya vitalu kwenye mnyororo mpya hutolewa, ikimaanisha kuwa inawezekana kuona kumbukumbu za muamala uleule mara nyingi katika hali ya upangaji upya.

Vigezo

1. Kipengee chenye nyanja zifuatazo:
   - `address` (hiari): ama mfuatano (string) unaowakilisha anwani au safu (array) ya mifuatano kama hiyo.
     - Ni kumbukumbu tu zilizoundwa kutoka kwa mojawapo ya anwani hizi ndizo zitatolewa.
   - `topics`: safu ya vibainishi vya mada.
     - Kila kibainishi cha mada ni ama `null`, mfuatano unaowakilisha mada, au safu ya mifuatano.
     - Kila nafasi katika safu ambayo si `null` huzuia kumbukumbu zinazotolewa kwa zile tu zilizo na mojawapo ya mada zilizotolewa katika nafasi hiyo.

Baadhi ya mifano ya vipimo vya mada:

- `[]`: Mada zozote zinaruhusiwa.
- `[A]`: A katika nafasi ya kwanza (na chochote kinachofuata).
- `[null, B]`: Chochote katika nafasi ya kwanza na B katika nafasi ya pili (na chochote kinachofuata).
- `[A, B]`: A katika nafasi ya kwanza na B katika nafasi ya pili (na chochote kinachofuata).
- `[[A, B], [A, B]]`: (A au B) katika nafasi ya kwanza na (A au B) katika nafasi ya pili (na chochote kinachofuata).

Mfano:

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

Hufuta usajili uliopo ili hakuna matukio zaidi yatakayotumwa.

Vigezo

1. Kitambulisho cha Usajili, kama kilivyorejeshwa hapo awali kutoka kwa wito wa `eth_subscribe`.

Hurejesha

`true` ikiwa usajili ulighairiwa kwa ufanisi, au `false` ikiwa hakuna usajili uliokuwepo wenye kitambulisho kilichotolewa.

Mfano:

**Ombi**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```

**Matokeo**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[Jisajili na Alchemy](https://auth.alchemy.com) bila malipo, angalia [nyaraka zetu](https://www.alchemy.com/docs/), na kwa habari za hivi punde, tufuate kwenye [Twitter](https://x.com/AlchemyPlatform).