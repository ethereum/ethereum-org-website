---
title: Kutumia WebSockets
description: Mwongozo wa kutumia WebSockets kufanya maombi ya JSON-RPC na kujiandikisha kwenye matukio, na mtoa huduma yeyote wa nodi ya Ethereum.
author: "Elan Halpern"
lang: sw
tags: ["Alchemy", "websockets", "kudadisi", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Huu ni mwongozo wa kiwango cha kuanzia wa kutumia WebSockets kufanya maombi kwenye mnyororo wa vitalu wa Ethereum. Mifano inatumia mbinu za kawaida za JSON-RPC, kwa hivyo zinafanya kazi na nodi yoyote au mtoa huduma wa nodi anayetoa kituo cha mwisho cha WebSocket, ikiwa ni pamoja na Alchemy.

## WebSockets dhidi ya HTTP {#websockets-vs-http}

Tofauti na HTTP, ukiwa na WebSockets, huhitaji kufanya maombi mfululizo unapotaka taarifa mahususi. WebSockets hudumisha muunganisho wa mtandao kwa ajili yako (kama ikifanywa kwa usahihi) na kusikiliza mabadiliko.

Kama ilivyo kwa muunganisho wowote wa mtandao, hupaswi kudhani kuwa WebSocket itasalia wazi milele bila kukatizwa, lakini kushughulikia kwa usahihi miunganisho iliyokatika na kuunganisha upya kwa mikono kunaweza kuwa changamoto kupata usahihi. Hasara nyingine ya WebSockets ni kwamba hupati misimbo ya hali ya HTTP katika majibu, bali unapata tu ujumbe wa hitilafu.

Maktaba za mteja zinaweza kukushughulikia hili. Kwa mfano, [usafirishaji wa WebSocket wa Viem](https://viem.sh/docs/clients/transports/websocket) huunganisha upya soketi inaposhindwa na kutuma ping za kuweka hai kwa chaguomsingi.

## Ijaribu {#try-it-out}

Unahitaji URL ya WebSocket kwa ajili ya nodi ya Ethereum. Watoa huduma wa nodi hukupa moja unapotengeneza ufunguo wa Kiolesura cha Kupanga Programu Tumizi (API), kwa kawaida katika muundo wa `wss://<provider-host>/<your-api-key>`. Kwa mfano, URL ya Mtandao Mkuu wa Ethereum ya Alchemy inaonekana kama `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([jisajili kwa akaunti ya bure ya Alchemy](https://auth.alchemy.com/signup)). Tazama [nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service/) kwa watoa huduma wengine, au tumia kituo cha mwisho cha WebSocket cha [nodi yako mwenyewe](/developers/docs/nodes-and-clients/run-a-node/). Vituo vya mwisho vya umma kama vile `wss://ethereum-rpc.publicnode.com` pia hufanya kazi kwa majaribio ya haraka, lakini vimewekewa kikomo cha kasi na huenda visiauni kila aina ya usajili.

Njia rahisi zaidi ya kujaribu WebSockets ni kusakinisha zana ya mstari wa amri ya kufanya maombi ya WebSocket kama vile [wscat](https://github.com/websockets/wscat). Kwa kutumia wscat, unaweza kutuma maombi kama ifuatavyo:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Mistari inayoanza na `>` ndiyo unayoandika, na mistari inayoanza na `<` ndiyo ambayo nodi hutuma nyuma.

## Jinsi ya kutumia WebSockets {#how-to-use-websockets}

Ili kuanza, fungua WebSocket ukitumia URL ya WebSocket ya mtoa huduma wako. Ukiwa na Alchemy, unaweza kuipata kwa kufungua programu yako katika [dashibodi](https://dashboard.alchemy.com/) na kutazama ufunguo wake wa Kiolesura cha Kupanga Programu Tumizi (API). Kumbuka kwamba URL ya WebSockets (`wss://`) ni tofauti na URL ya maombi ya HTTP (`https://`), ingawa watoa huduma wengi hutumia ufunguo sawa wa API kwa zote mbili.

![Mahali pa kupata URL yako ya WebSocket katika dashibodi yako ya Alchemy](./use-websockets.mp4#602x280)

Mbinu yoyote ya [JSON-RPC](/developers/docs/apis/json-rpc/) inayoungwa mkono na mtoa huduma wako inaweza kutumika kupitia WebSocket. Ili kufanya hivyo, tumia mzigo uleule ambao ungetumwa kama kiini cha ombi la HTTP POST, lakini badala yake tuma mzigo huo kupitia WebSocket.

## Ukiwa na Web3 {#with-web3}

Kubadilika kwenda kwenye WebSockets unapotumia maktaba ya mteja kama [Viem](https://viem.sh/) ni rahisi. Tumia usafirishaji wa `webSocket` na URL yako ya WebSocket badala ya usafirishaji wa `http`. Kwa mfano, baada ya `npm install viem`, hifadhi hii kama `index.mjs` na uendeshe `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Jisajili kupata vitalu vipya kupitia WebSocket hiyo hiyo
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## API ya Usajili {#subscription-api}

Unapounganishwa kupitia WebSocket, unaweza kutumia mbinu mbili za ziada: `eth_subscribe` na `eth_unsubscribe`. Mbinu hizi zitakuruhusu kusikiliza matukio mahususi na kujulishwa mara moja.

### `eth_subscribe` {#eth-subscribe}

Hutengeneza usajili mpya kwa matukio yaliyobainishwa. [Jifunze zaidi kuhusu `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

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

1. `newHeads`

Hutoa tukio kila wakati kichwa kipya kinapoongezwa kwenye mnyororo, ikiwa ni pamoja na wakati wa mpangilio upya wa mnyororo.

Wakati mpangilio upya wa mnyororo unapotokea, usajili huu utatoa tukio lenye vichwa vyote vipya kwa ajili ya mnyororo mpya. Hasa, hii inamaanisha kuwa unaweza kuona vichwa vingi vikitolewa vikiwa na urefu sawa, na hili linapotokea kichwa cha baadaye kinapaswa kuchukuliwa kama kile sahihi baada ya mpangilio upya.

Mfano:

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

Hutoa kumbukumbu ambazo ni sehemu ya vitalu vilivyoongezwa hivi karibuni vinavyolingana na vigezo maalum vya kichujio.

Wakati mpangilio upya wa mnyororo unapotokea, kumbukumbu ambazo ni sehemu ya vitalu kwenye mnyororo wa zamani zitatolewa tena huku sifa ya `removed` ikiwekwa kuwa `true`. Zaidi ya hayo, kumbukumbu ambazo ni sehemu ya vitalu kwenye mnyororo mpya hutolewa, ikimaanisha kuwa inawezekana kuona kumbukumbu za muamala uleule mara nyingi katika hali ya mpangilio upya.

Vigezo

1. Kipengee chenye nyanja zifuatazo:
   - `address` (hiari): ama mfuatano unaowakilisha anwani au safu ya mifuatano kama hiyo.
     - Ni kumbukumbu tu zilizoundwa kutoka kwa mojawapo ya anwani hizi ndizo zitatolewa.
   - `topics`: safu ya vibainishi vya mada.
     - Kila kibainishi cha mada ni ama `null`, mfuatano unaowakilisha mada, au safu ya mifuatano.
     - Kila nafasi katika safu ambayo si `null` huzuia kumbukumbu zinazotolewa kwa zile tu ambazo zina mojawapo ya mada zilizotolewa katika nafasi hiyo.

Baadhi ya mifano ya vipimo vya mada:

- `[]`: Mada zozote zinaruhusiwa.
- `[A]`: A katika nafasi ya kwanza (na chochote baada ya hapo).
- `[null, B]`: Chochote katika nafasi ya kwanza na B katika nafasi ya pili (na chochote baada ya hapo).
- `[A, B]`: A katika nafasi ya kwanza na B katika nafasi ya pili (na chochote baada ya hapo).
- `[[A, B], [A, B]]`: (A au B) katika nafasi ya kwanza na (A au B) katika nafasi ya pili (na chochote baada ya hapo).

Mfano:

Mfano huu husikiliza matukio ya `Deposit` kutoka kwenye [mkataba wa ether iliyofungwa (weth)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) kwenye Mtandao Mkuu wa Ethereum:

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

Hutoa heshi ya kila muamala unaoongezwa kwenye hali inayosubiri ya nodi (mempool yake).

Mfano:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Baadhi ya watoa huduma pia hutoa aina zao wenyewe za usajili. Kwa mfano, [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) ya Alchemy hutoa _vipengee kamili vya muamala_ badala ya heshi pekee, na inakubali vichujio vya hiari vya `fromAddress`, `toAddress` na `hashesOnly`. Hizi si sehemu ya Kiolesura cha Kupanga Programu Tumizi (API) cha kawaida cha JSON-RPC, kwa hivyo zinafanya kazi na mtoa huduma huyo pekee.

### `eth_unsubscribe` {#eth-unsubscribe}

Hufuta usajili uliopo ili hakuna matukio zaidi yatakayotumwa.

Vigezo

1. Kitambulisho cha Usajili, kama kilivyorejeshwa hapo awali kutoka kwa wito wa `eth_subscribe`.

Hurejesha

`true` ikiwa usajili ulifutwa kwa ufanisi, au `false` ikiwa hakuna usajili uliokuwepo wenye kitambulisho kilichotolewa.

Usajili upo tu kwenye muunganisho wa WebSocket uliouunda, kwa hivyo `eth_unsubscribe` lazima itumwe kupitia muunganisho huohuo. Haiwezi kutumwa kama ombi tofauti la HTTP. Kufunga muunganisho pia hufuta usajili wake wote.

Mfano:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Jisajili na Alchemy](https://auth.alchemy.com) bila malipo, angalia [nyaraka za Alchemy](https://www.alchemy.com/docs/), na kwa habari za hivi punde, fuatilia Alchemy kwenye [Twitter](https://x.com/Alchemy).
