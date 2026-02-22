---
title: API ya JSON-RPC
description: Itifaki isiyo na hali, nyepesi ya wito wa utaratibu wa mbali (RPC) kwa wateja wa Ethereum.
lang: sw
---

Ili programu ya programu kuingiliana na blockchain ya Ethereum - ama kwa kusoma data ya blockchain au kutuma shughuli kwenye mtandao lazima iunganishe kwenye node ya Ethereum.

Kwa kusudi hili, kila [mteja wa Ethereum](/developers/docs/nodes-and-clients/#execution-clients) hutekeleza [vipimo vya JSON-RPC](https://github.com/ethereum/execution-apis), kwa hivyo kuna seti sare ya mbinu ambazo programu zinaweza kutegemea bila kujali nodi maalum au utekelezaji wa mteja.

[JSON-RPC](https://www.jsonrpc.org/specification) ni itifaki isiyo na hali, nyepesi ya wito wa utaratibu wa mbali (RPC). Inafafanua miundo kadhaa ya data na sheria zinazohusu usindikaji wao. Ni usafiri usioaminika kwa kuwa dhana zinaweza kutumika ndani ya mchakato sawa, juu ya soketi, juu ya HTTP, au katika mazingira mengi ya kupitisha ujumbe. Inatumia JSON (RFC 4627) kama umbizo la data.

## Utekelezaji wa mteja {#client-implementations}

Wateja wa Ethereum kila mmoja anaweza kutumia lugha tofauti za kupanga wakati wa kutekeleza vipimo vya JSON-RPC. Angalia [nyaraka za mteja](/developers/docs/nodes-and-clients/#execution-clients) binafsi kwa maelezo zaidi yanayohusiana na lugha maalum za programu. Tunapendekeza uangalie nyaraka za kila mteja kwa taarifa za hivi karibuni za usaidizi wa API.

## Maktaba za Urahisi {#convenience-libraries}

Ingawa unaweza kuchagua kuingiliana moja kwa moja na wateja wa Ethereum kupitia API ya JSON-RPC, mara nyingi kuna chaguo rahisi kwa wasanidi wa dapp. Maktaba nyingi za [JavaScript](/developers/docs/apis/javascript/#available-libraries) na [API za backend](/developers/docs/apis/backend/#available-libraries) zipo ili kutoa vifuniko juu ya API ya JSON-RPC. Kwa kutumia maktaba hizi, watengenezaji wanaweza kuandika mbinu angavu, za mstari mmoja katika lugha ya programu wanayochagua ili kuanzisha maombi ya JSON-RPC (chini ya kifuniko) ambayo yanaingiliana na Ethereum.

## API za mteja wa makubaliano {#consensus-clients}

Ukurasa huu unahusika hasa na API ya JSON-RPC inayotumiwa na wateja wa utekelezaji wa Ethereum. Hata hivyo, wateja wa makubaliano pia wana API ya RPC ambayo inaruhusu watumiaji kuuliza maelezo kuhusu nodi, kuomba vizuizi vya Beacon, hali ya Beacon, na maelezo mengine yanayohusiana na makubaliano moja kwa moja kutoka kwa nodi. API hii imeandikwa kwenye [ukurasa wa wavuti wa Beacon API](https://ethereum.github.io/beacon-APIs/#/).

API ya ndani pia inatumika kwa mawasiliano kati ya mteja ndani ya nodi - yaani, inawezesha mteja wa makubaliano na mteja wa utekelezaji kubadilishana data. Hii inaitwa 'Engine API' na vipimo vinapatikana kwenye [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Vipimo vya mteja wa utekelezaji {#spec}

[Soma vipimo kamili vya API ya JSON-RPC kwenye GitHub](https://github.com/ethereum/execution-apis). API hii imeandikwa kwenye [ukurasa wa wavuti wa Execution API](https://ethereum.github.io/execution-apis/) na inajumuisha Mkaguzi ili kujaribu mbinu zote zinazopatikana.

## Mikataba {#conventions}

### Usimbaji wa thamani ya hex {#hex-encoding}

Aina mbili kuu za data hupitishwa kupitia JSON: safu za baiti zisizo na umbizo na idadi. Zote mbili hupitishwa kwa usimbaji wa hex lakini na mahitaji tofauti ya uumbizaji.

#### Idadi {#quantities-encoding}

Wakati wa kusimba idadi (nambari kamili, nambari): simba kama hex, kiambishi awali chenye "0x", kiwakilishi chanya zaidi (isipokuwa kidogo: sufuri inapaswa kuwakilishwa kama "0x0").

Hapa kuna baadhi ya mifano:

- 0x41 (65 katika desimali)
- 0x400 (1024 katika desimali)
- SI SAHIHI: 0x (inapaswa kuwa na angalau tarakimu moja - sifuri ni "0x0")
- SI SAHIHI: 0x0400 (sifuri zinazoongoza haziruhusiwi)
- SI SAHIHI: ff (lazima iwe na kiambishi awali 0x)

### Data isiyo na umbizo {#unformatted-data-encoding}

Wakati wa kusimba data ambayo haijaumbizwa (safu za baiti, anwani za akaunti, heshi, safu za msimbo wa baiti): simba kama hex, kiambishi awali na "0x", tarakimu mbili za heksi kwa kila baiti.

Hapa kuna baadhi ya mifano:

- 0x41 (ukubwa 1, "A")
- 0x004200 (ukubwa 3, "0B0")
- 0x (ukubwa 0, "")
- SI SAHIHI: 0xf0f0f (lazima iwe nambari sawa ya tarakimu)
- SI SAHIHI: 004200 (lazima iwe na kiambishi awali 0x)

### Kigezo cha kizuizi {#block-parameter}

Mbinu zifuatazo zina kigezo cha kizuizi:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Wakati maombi yanafanywa kwamba swala hali ya Ethereum, parameter ya kuzuia iliyotolewa huamua urefu wa kizuizi.

Chaguo zifuatazo zinawezekana kwa kigezo cha kizuizi:

- `HEX String` - nambari kamili ya kizuizi
- `String "earliest"` kwa kizuizi cha mwanzo kabisa/cha mwanzo
- `String "latest"` - kwa kizuizi cha hivi karibuni kilichopendekezwa
- `String "safe"` - kwa kizuizi cha hivi karibuni salama cha kichwa
- `String "finalized"` - kwa kizuizi cha hivi karibuni kilichokamilishwa
- `String "pending"` - kwa hali/miamala inayosubiri

## Mifano

Katika ukurasa huu tunatoa mifano ya jinsi ya kutumia ncha za mwisho za API za JSON_RPC kwa kutumia zana ya mstari wa amri, [curl](https://curl.se). Mifano hii ya ncha za mwisho za kibinafsi inapatikana hapa chini katika sehemu ya [Mifano ya Curl](#curl-examples). Zaidi chini ya ukurasa, tunatoa pia [mfano wa mwanzo hadi mwisho](#usage-example) wa kuandaa na kupeleka mkataba-erevu kwa kutumia nodi ya Geth, API ya JSON_RPC na curl.

## Mifano ya Curl {#curl-examples}

Mifano ya kutumia API ya JSON_RPC kwa kufanya maombi ya [curl](https://curl.se) kwa nodi ya Ethereum imetolewa hapa chini. Kila mfano
unajumuisha maelezo ya ncha maalum ya mwisho, vigezo vyake, aina ya urejeshaji, na mfano uliofanyiwa kazi wa jinsi inapaswa kutumika.

Maombi ya curl yanaweza kurudisha ujumbe wa hitilafu unaohusiana na aina ya maudhui. Hii ni kwa sababu chaguo la `--data` huweka aina ya maudhui kuwa `application/x-www-form-urlencoded`. Ikiwa nodi yako inalalamika kuhusu hili, weka kichwa kwa mikono kwa kuweka `-H "Content-Type: application/json"` mwanzoni mwa wito. Mifano pia haijumuishi mchanganyiko wa URL/IP & mlango ambao lazima uwe hoja ya mwisho iliyotolewa kwa curl (k.m., `127.0.0.1:8545`). Ombi kamili la curl linalojumuisha data hizi za ziada huchukua fomu ifuatayo:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Uvumi, Hali, Historia {#gossip-state-history}

Mbinu chache za msingi za JSON-RPC zinahitaji data kutoka kwa mtandao wa Ethereum, na ziko katika kategoria tatu kuu: _Uvumi, Hali, na Historia_. Tumia viungo katika sehemu hizi kurukia kila mbinu, au tumia jedwali la yaliyomo kuchunguza orodha nzima ya mbinu.

### Mbinu za Uvumi {#gossip-methods}

> Mbinu hizi hufuatilia kichwa cha mnyororo. Hivi ndivyo miamala inavyozunguka mtandao, kutafuta njia kwenye vizuizi, na jinsi wateja wanavyojua kuhusu vizuizi vipya.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Mbinu za Hali {#state_methods}

> Mbinu zinazoripoti hali ya sasa ya data zote zilizohifadhiwa. "Jimbo" ni kama sehemu kubwa ya RAM iliyoshirikiwa, na inajumuisha salio la akaunti, data ya mkataba na makadirio ya gharama ya muamala.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Mbinu za Historia {#history_methods}

> Hupata rekodi za kihistoria za kila kizuizi kurudi hadi mwanzo. Hii ni kama faili moja kubwa ya kiambatisho pekee, na inajumuisha vichwa vyote vya block, vikundi vya kuzuia, vizuizi vya ukaribu, na risiti za muamala.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## Uwanja wa Michezo wa API ya JSON-RPC

Unaweza kutumia [zana ya uwanja wa michezo](https://ethereum-json-rpc.com) kugundua na kujaribu mbinu za API. Pia inakuonyesha ni mbinu na mitandao gani inasaidiwa na watoa huduma mbalimbali wa nodi.

## Mbinu za API za JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Inarudisha toleo la sasa la mteja.

**Vigezo**

Hakuna

**Inarudisha**

`String` - Toleo la sasa la mteja

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Matokeo
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Inarudisha Keccak-256 (_sio_ SHA3-256 iliyosanifishwa) ya data iliyotolewa.

**Vigezo**

1. `DATA` - Data ya kubadilisha kuwa hashi ya SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Inarudisha**

`DATA` - Matokeo ya SHA3 ya mfuatano uliotolewa.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Matokeo
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

Inarudisha kitambulisho cha sasa cha mtandao.

**Vigezo**

Hakuna

**Inarudisha**

`String` - Kitambulisho cha sasa cha mtandao.

Orodha kamili ya vitambulisho vya sasa vya mtandao inapatikana kwenye [chainlist.org](https://chainlist.org). Baadhi ya za kawaida ni:

- `1`: Mtandao Mkuu wa Ethereum
- `11155111`: Testnet ya Sepolia
- `560048` : Testnet ya Hoodi

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Matokeo
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

Inarudisha `true` ikiwa mteja anasikiliza kikamilifu miunganisho ya mtandao.

**Vigezo**

Hakuna

**Inarudisha**

`Boolean` - `true` inaposikiliza, vinginevyo `false`.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Matokeo
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

Inarudisha idadi ya rika zilizounganishwa kwa sasa na mteja.

**Vigezo**

Hakuna

**Inarudisha**

`QUANTITY` - nambari kamili ya idadi ya rika zilizounganishwa.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Matokeo
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

Inarudisha toleo la sasa la itifaki ya Ethereum. Kumbuka kuwa mbinu hii [haipatikani katika Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Vigezo**

Hakuna

**Inarudisha**

`String` - Toleo la sasa la itifaki ya Ethereum

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Matokeo
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

Inarudisha kitu chenye data kuhusu hali ya usawazishaji au `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

Hakuna

**Inarudisha**

Data kamili ya urejeshaji hutofautiana kati ya utekelezaji wa mteja. Wateja wote hurudisha `False` wakati nodi haisawazishi, na wateja wote hurudisha sehemu zifuatazo.

`Object|Boolean`, Kitu chenye data ya hali ya usawazishaji au `FALSE`, wakati haisawazishi:

- `startingBlock`: `QUANTITY` - Kizuizi ambapo uingizaji ulianza (itawekwa upya tu, baada ya usawazishaji kufikia kichwa chake)
- `currentBlock`: `QUANTITY` - Kizuizi cha sasa, sawa na eth_blockNumber
- `highestBlock`: `QUANTITY` - Kizuizi cha juu zaidi kinachokadiriwa

Hata hivyo, wateja binafsi wanaweza pia kutoa data ya ziada. Kwa mfano, Geth inarudisha yafuatayo:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Wakati Besu inarudisha:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

Rejelea nyaraka za mteja wako maalum kwa maelezo zaidi.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Au wakati haisawazishi
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Inarudisha anwani ya coinbase ya mteja.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

> **Kumbuka:** Mbinu hii imeacha kutumika kuanzia **v1.14.0** na haitumiki tena. Kujaribu kutumia mbinu hii kutasababisha hitilafu ya "Mbinu haitumiki".

**Vigezo**

Hakuna

**Inarudisha**

`DATA`, baiti 20 - anwani ya sasa ya coinbase.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Matokeo
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Inarudisha kitambulisho cha mnyororo kinachotumiwa kutia saini miamala iliyolindwa dhidi ya uchezaji tena.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

Hakuna

**Inarudisha**

`chainId`, thamani ya heksadesimali kama mfuatano unaowakilisha nambari kamili ya kitambulisho cha sasa cha mnyororo.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Matokeo
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

Inarudisha `true` ikiwa mteja anachimba kikamilifu vizuizi vipya. Hii inaweza tu kurudisha `true` kwa mitandao ya uthibitishaji-wa-kazi na huenda isipatikane kwa baadhi ya wateja tangu [Muungano](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

Hakuna

**Inarudisha**

`Boolean` - inarudisha `true` ikiwa mteja anachimba, vinginevyo `false`.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Inarudisha idadi ya hashi kwa sekunde ambayo nodi inachimba nayo. Hii inaweza tu kurudisha `true` kwa mitandao ya uthibitishaji-wa-kazi na huenda isipatikane kwa baadhi ya wateja tangu [Muungano](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

Hakuna

**Inarudisha**

`QUANTITY` - idadi ya hashi kwa sekunde.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Matokeo
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Inarudisha makadirio ya bei ya sasa kwa kila gesi katika wei. Kwa mfano, mteja wa Besu huchunguza vitalu 100 vya mwisho na kurejesha bei ya wastani ya kitengo cha gesi kwa chaguo-msingi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

Hakuna

**Inarudisha**

`QUANTITY` - nambari kamili ya bei ya sasa ya gesi katika wei.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Matokeo
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

Inarudisha orodha ya anwani zinazomilikiwa na mteja.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

Hakuna

**Inarudisha**

`Array of DATA`, Baiti 20 - anwani zinazomilikiwa na mteja.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

Hurudisha nambari ya bloku ya hivi karibuni zaidi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

Hakuna

**Inarudisha**

`QUANTITY` - nambari kamili ya nambari ya sasa ya kizuizi ambayo mteja yuko.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Matokeo
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Hurudisha salio la akaunti kwenye anwani fulani.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 20 - anwani ya kuangalia salio.
2. `QUANTITY|TAG` - nambari kamili ya kizuizi, au mfuatano `"latest"`, `"earliest"`, `"pending"`, `"safe"`, au `"finalized"`, angalia [kigezo cha kizuizi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Inarudisha**

`QUANTITY` - nambari kamili ya salio la sasa katika wei.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Inarudisha thamani kutoka kwa nafasi ya hifadhi katika anwani fulani.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 20 - anwani ya hifadhi.
2. `QUANTITY` - nambari kamili ya nafasi katika hifadhi.
3. `QUANTITY|TAG` - nambari kamili ya kizuizi, au mfuatano `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, angalia [kigezo cha kizuizi](/developers/docs/apis/json-rpc/#block-parameter)

**Inarudisha**

`DATA` - thamani katika nafasi hii ya hifadhi.

**Mfano**
Kukokotoa nafasi sahihi kunategemea hifadhi ya kupata. Fikiria mkataba ufuatao uliotumwa katika `0x295a70b2de5e3953354a6a8344e616ed314d7251` kwa anwani `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Kupata thamani ya pos0 ni rahisi.

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Kupata kipengele cha ramani ni ngumu zaidi. Nafasi ya kipengele katika ramani inakokotolewa na:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Hii inamaanisha kupata hifadhi kwenye pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] tunahitaji kukokotoa nafasi na:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Koni ya geth ambayo inakuja na maktaba ya web3 inaweza kutumika kufanya hesabu:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Sasa ili kupata hifadhi:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Inarudisha idadi ya miamala _iliyotumwa_ kutoka kwa anwani.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 20 - anwani.
2. `QUANTITY|TAG` - nambari kamili ya kizuizi, au mfuatano `"latest"`, `"earliest"`, `"pending"`, `"safe"` au `"finalized"`, angalia [kigezo cha kizuizi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // hali kwenye kizuizi cha hivi karibuni
]
```

**Inarudisha**

`QUANTITY` - nambari kamili ya idadi ya miamala iliyotumwa kutoka kwa anwani hii.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Inarudisha idadi ya miamala katika kizuizi kutoka kwa kizuizi kinacholingana na hashi ya kizuizi iliyotolewa.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - hashi ya kizuizi

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Inarudisha**

`QUANTITY` - nambari kamili ya idadi ya miamala katika kizuizi hiki.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Inarudisha idadi ya miamala katika kizuizi kinacholingana na nambari ya kizuizi iliyotolewa.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `QUANTITY|TAG` - nambari kamili ya nambari ya kizuizi, au mfuatano `"earliest"`, `"latest"`, `"pending"`, `"safe"` au `"finalized"`, kama ilivyo katika [kigezo cha kizuizi](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Inarudisha**

`QUANTITY` - nambari kamili ya idadi ya miamala katika kizuizi hiki.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Inarudisha idadi ya wajomba katika kizuizi kutoka kwa kizuizi kinacholingana na hashi ya kizuizi iliyotolewa.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - hashi ya kizuizi

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Inarudisha**

`QUANTITY` - nambari kamili ya idadi ya wajomba katika kizuizi hiki.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Inarudisha idadi ya wajomba katika kizuizi kutoka kwa kizuizi kinacholingana na nambari ya kizuizi iliyotolewa.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `QUANTITY|TAG` - nambari kamili ya nambari ya kizuizi, au mfuatano `"latest"`, `"earliest"`, `"pending"`, `"safe"` au `"finalized"`, angalia [kigezo cha kizuizi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Inarudisha**

`QUANTITY` - nambari kamili ya idadi ya wajomba katika kizuizi hiki.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Inarudisha msimbo katika anwani fulani.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 20 - anwani
2. `QUANTITY|TAG` - nambari kamili ya kizuizi, au mfuatano `"latest"`, `"earliest"`, `"pending"`, `"safe"` au `"finalized"`, angalia [kigezo cha kizuizi](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Inarudisha**

`DATA` - msimbo kutoka kwa anwani iliyotolewa.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

Mbinu ya kutia saini inakokotoa saini maalum ya Ethereum na: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Kwa kuongeza kiambishi awali kwenye ujumbe hufanya saini iliyokokotolewa itambulike kama saini maalum ya Ethereum. Hii inazuia matumizi mabaya ambapo mfumo mtawanyo wa kimamlaka hasidi unaweza kusaini data holela (k.m., muamala) na kutumia saini kumwiga mwathiriwa.

Kumbuka: anwani ya kutia saini nayo lazima ifunguliwe.

**Vigezo**

1. `DATA`, Baiti 20 - anwani
2. `DATA`, Baiti N - ujumbe wa kutia saini

**Inarudisha**

`DATA`: Sahihi

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

Inatia saini muamala ambao unaweza kuwasilishwa kwenye mtandao baadaye kwa kutumia [eth_sendRawTransaction](#eth_sendrawtransaction).

**Vigezo**

1. `Object` - Kitu cha muamala

- `type`:
- `from`: `DATA`, Baiti 20 - Anwani ambayo muamala unatumwa kutoka.
- `to`: `DATA`, Baiti 20 - (si lazima unapounda mkataba mpya) Anwani ambayo muamala unaelekezwa.
- `gas`: `QUANTITY` - (si lazima, chaguo-msingi: 90000) Nambari kamili ya gesi iliyotolewa kwa ajili ya utekelezaji wa muamala. Itarudisha gesi isiyotumika.
- `gasPrice`: `QUANTITY` - (si lazima, chaguo-msingi: Itaamuliwa) Nambari kamili ya gasPrice inayotumika kwa kila gesi inayolipwa, katika Wei.
- `value`: `QUANTITY` - (si lazima) Nambari kamili ya thamani iliyotumwa na muamala huu, katika Wei.
- `data`: `DATA` - Msimbo uliokusanywa wa mkataba AU hashi ya saini ya mbinu iliyoitwa na vigezo vilivyosimbwa.
- `nonce`: `QUANTITY` - (si lazima) Nambari kamili ya nonce. Hii inaruhusu kubatilisha miamala yako mwenyewe inayosubiri inayotumia nonce sawa.

**Inarudisha**

`DATA`, Kitu cha muamala kilichosimbwa na RLP kilichotiwa saini na akaunti maalum.

**Mfano**

```js
// Ombi
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Matokeo
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Huunda muamala mpya wa wito wa ujumbe au uundaji wa mkataba, ikiwa sehemu ya data ina msimbo, na inautia saini kwa kutumia akaunti maalum katika `from`.

**Vigezo**

1. `Object` - Kitu cha muamala

- `from`: `DATA`, Baiti 20 - Anwani ambayo muamala unatumwa kutoka.
- `to`: `DATA`, Baiti 20 - (si lazima unapounda mkataba mpya) Anwani ambayo muamala unaelekezwa.
- `gas`: `QUANTITY` - (si lazima, chaguo-msingi: 90000) Nambari kamili ya gesi iliyotolewa kwa ajili ya utekelezaji wa muamala. Itarudisha gesi isiyotumika.
- `gasPrice`: `QUANTITY` - (si lazima, chaguo-msingi: Itaamuliwa) Nambari kamili ya gasPrice inayotumika kwa kila gesi inayolipwa.
- `value`: `QUANTITY` - (si lazima) Nambari kamili ya thamani iliyotumwa na muamala huu.
- `input`: `DATA` - Msimbo uliokusanywa wa mkataba AU hashi ya saini ya mbinu iliyoitwa na vigezo vilivyosimbwa.
- `nonce`: `QUANTITY` - (si lazima) Nambari kamili ya nonce. Hii inaruhusu kubatilisha miamala yako mwenyewe inayosubiri inayotumia nonce sawa.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Inarudisha**

`DATA`, Baiti 32 - hashi ya muamala, au hashi sifuri ikiwa muamala bado haupatikani.

Tumia [eth_getTransactionReceipt](#eth_gettransactionreceipt) kupata anwani ya mkataba, baada ya muamala kupendekezwa katika kizuizi, ulipounda mkataba.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Huunda muamala mpya wa wito wa ujumbe au uundaji wa mkataba kwa miamala iliyotiwa saini.

**Vigezo**

1. `DATA`, Data ya muamala iliyotiwa saini.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Inarudisha**

`DATA`, Baiti 32 - hashi ya muamala, au hashi sifuri ikiwa muamala bado haupatikani.

Tumia [eth_getTransactionReceipt](#eth_gettransactionreceipt) kupata anwani ya mkataba, baada ya muamala kupendekezwa katika kizuizi, ulipounda mkataba.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Hutekeleza wito mpya wa ujumbe mara moja bila kuunda muamala kwenye mnyororo wa bloku. Mara nyingi hutumika kutekeleza kazi za mkataba-erevu za kusoma tu, kwa mfano `balanceOf` kwa mkataba wa ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `Object` - Kitu cha wito wa muamala

- `from`: `DATA`, Baiti 20 - (si lazima) Anwani ambayo muamala unatumwa kutoka.
- `to`: `DATA`, Baiti 20 - Anwani ambayo muamala unaelekezwa.
- `gas`: `QUANTITY` - (si lazima) Nambari kamili ya gesi iliyotolewa kwa ajili ya utekelezaji wa muamala. eth_call hutumia gesi sifuri, lakini kigezo hiki kinaweza kuhitajika na baadhi ya utekelezaji.
- `gasPrice`: `QUANTITY` - (si lazima) Nambari kamili ya gasPrice inayotumika kwa kila gesi inayolipwa
- `value`: `QUANTITY` - (si lazima) Nambari kamili ya thamani iliyotumwa na muamala huu
- `input`: `DATA` - (si lazima) Hashi ya saini ya mbinu na vigezo vilivyosimbwa. Kwa maelezo angalia [ABI ya Mkataba wa Ethereum katika nyaraka za Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - nambari kamili ya kizuizi, au mfuatano `"latest"`, `"earliest"`, `"pending"`, `"safe"` au `"finalized"`, angalia [kigezo cha kizuizi](/developers/docs/apis/json-rpc/#block-parameter)

**Inarudisha**

`DATA` - thamani ya urejeshaji ya mkataba uliotekelezwa.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

Huzalisha na kurudisha makadirio ya gesi kiasi gani inahitajika kuruhusu muamala kukamilika. Muamala hautaongezwa kwenye mnyororo wa bloku. Kumbuka kwamba makadirio yanaweza kuwa zaidi ya kiasi cha gesi inayotumiwa na shughuli ya ununuzi, kwa sababu mbalimbali ikiwa ni pamoja na mechanics ya EVM na utendaji wa nodi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

Angalia vigezo vya [eth_call](#eth_call), isipokuwa kwamba sifa zote ni za hiari. Ikiwa hakuna kikomo cha gesi kilichobainishwa, geth hutumia kikomo cha gesi ya block kutoka kwa kizuizi kinachosubiri kama njia ya juu. Matokeo yake, makadirio yaliyorejeshwa yanaweza yasitoshe kutekeleza wito/muamala wakati kiasi cha gesi ni cha juu kuliko kikomo cha gesi cha bloku inayosubiri.

**Inarudisha**

`QUANTITY` - kiasi cha gesi iliyotumika.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Inarudisha taarifa kuhusu kizuizi kwa hashi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - Hashi ya kizuizi.
2. `Boolean` - Ikiwa `true` inarudisha vitu kamili vya muamala, ikiwa `false` ni hashi tu za miamala.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Inarudisha**

`Object` - Kitu cha kizuizi, au `null` wakati hakuna kizuizi kilichopatikana:

- `number`: `QUANTITY` - nambari ya kizuizi. `null` wakati ni kizuizi kinachosubiri.
- `hash`: `DATA`, Baiti 32 - hashi ya kizuizi. `null` wakati ni kizuizi kinachosubiri.
- `parentHash`: `DATA`, Baiti 32 - hashi ya kizuizi cha mzazi.
- `nonce`: `DATA`, Baiti 8 - hashi ya uthibitishaji-wa-kazi uliotengenezwa. `null` wakati ni kizuizi kinachosubiri, `0x0` kwa vizuizi vya uthibitishaji-wa-hisa (tangu Muungano)
- `sha3Uncles`: `DATA`, Baiti 32 - SHA3 ya data ya wajomba katika kizuizi.
- `logsBloom`: `DATA`, Baiti 256 - kichujio cha bloom kwa kumbukumbu za kizuizi. `null` wakati ni kizuizi kinachosubiri.
- `transactionsRoot`: `DATA`, Baiti 32 - mzizi wa trie ya muamala wa kizuizi.
- `stateRoot`: `DATA`, Baiti 32 - mzizi wa trie ya hali ya mwisho ya kizuizi.
- `receiptsRoot`: `DATA`, Baiti 32 - mzizi wa trie ya risiti za kizuizi.
- `miner`: `DATA`, Baiti 20 - anwani ya mnufaika ambaye zawadi za kizuizi zilipewa.
- `difficulty`: `QUANTITY` - nambari kamili ya ugumu kwa kizuizi hiki.
- `totalDifficulty`: `QUANTITY` - nambari kamili ya ugumu jumla wa mnyororo hadi kizuizi hiki.
- `extraData`: `DATA` - sehemu ya "data ya ziada" ya kizuizi hiki.
- `size`: `QUANTITY` - nambari kamili ya ukubwa wa kizuizi hiki katika baiti.
- `gasLimit`: `QUANTITY` - gesi ya juu inayoruhusiwa katika kizuizi hiki.
- `gasUsed`: `QUANTITY` - jumla ya gesi iliyotumika na miamala yote katika kizuizi hiki.
- `timestamp`: `QUANTITY` - muhuri wa muda wa unix wa wakati kizuizi kilikusanywa.
- `transactions`: `Array` - Safu ya vitu vya muamala, au hashi za muamala za Baiti 32 kulingana na kigezo cha mwisho kilichotolewa.
- `uncles`: `Array` - Safu ya hashi za wajomba.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

Inarudisha taarifa kuhusu kizuizi kwa nambari ya kizuizi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `QUANTITY|TAG` - nambari kamili ya nambari ya kizuizi, au mfuatano `"earliest"`, `"latest"`, `"pending"`, `"safe"` au `"finalized"`, kama ilivyo katika [kigezo cha kizuizi](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - Ikiwa `true` inarudisha vitu kamili vya muamala, ikiwa `false` ni hashi tu za miamala.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Inarudisha**
Angalia [eth_getBlockByHash](#eth_getblockbyhash)

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Matokeo angalia [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Inarudisha taarifa kuhusu muamala ulioombwa kwa hashi ya muamala.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - hashi ya muamala

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Inarudisha**

`Object` - Kitu cha muamala, au `null` wakati hakuna muamala uliopatikana:

- `blockHash`: `DATA`, Baiti 32 - hashi ya kizuizi ambapo muamala huu ulikuwa. `null` wakati inasubiri.
- `blockNumber`: `QUANTITY` - nambari ya kizuizi ambapo muamala huu ulikuwa. `null` wakati inasubiri.
- `from`: `DATA`, Baiti 20 - anwani ya mtumaji.
- `gas`: `QUANTITY` - gesi iliyotolewa na mtumaji.
- `gasPrice`: `QUANTITY` - bei ya gesi iliyotolewa na mtumaji katika Wei.
- `hash`: `DATA`, Baiti 32 - hashi ya muamala.
- `input`: `DATA` - data iliyotumwa pamoja na muamala.
- `nonce`: `QUANTITY` - idadi ya miamala iliyofanywa na mtumaji kabla ya hii.
- `to`: `DATA`, Baiti 20 - anwani ya mpokeaji. `null` wakati ni muamala wa uundaji wa mkataba.
- `transactionIndex`: `QUANTITY` - nambari kamili ya nafasi ya faharasa ya miamala katika kizuizi. `null` wakati inasubiri.
- `value`: `QUANTITY` - thamani iliyohamishwa katika Wei.
- `v`: `QUANTITY` - kitambulisho cha urejeshaji cha ECDSA
- `r`: `QUANTITY` - saini ya ECDSA r
- `s`: `QUANTITY` - saini ya ECDSA s

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Matokeo
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Inarudisha taarifa kuhusu muamala kwa hashi ya kizuizi na nafasi ya faharasa ya muamala.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - hashi ya kizuizi.
2. `QUANTITY` - nambari kamili ya nafasi ya faharasa ya muamala.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Inarudisha**
Angalia [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Matokeo angalia [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Inarudisha taarifa kuhusu muamala kwa nambari ya kizuizi na nafasi ya faharasa ya muamala.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `QUANTITY|TAG` - nambari ya kizuizi, au mfuatano `"earliest"`, `"latest"`, `"pending"`, `"safe"` au `"finalized"`, kama ilivyo katika [kigezo cha kizuizi](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - nafasi ya faharasa ya muamala.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Inarudisha**
Angalia [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Matokeo angalia [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Inarudisha risiti ya muamala kwa hashi ya muamala.

**Kumbuka** Kwamba risiti haipatikani kwa miamala inayosubiri.

**Vigezo**

1. `DATA`, Baiti 32 - hashi ya muamala

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Inarudisha**
`Object` - Kitu cha risiti ya muamala, au `null` wakati hakuna risiti iliyopatikana:

- `transactionHash `: `DATA`, Baiti 32 - hashi ya muamala.
- `transactionIndex`: `QUANTITY` - nambari kamili ya nafasi ya faharasa ya miamala katika kizuizi.
- `blockHash`: `DATA`, Baiti 32 - hashi ya kizuizi ambapo muamala huu ulikuwa.
- `blockNumber`: `QUANTITY` - nambari ya kizuizi ambapo muamala huu ulikuwa.
- `from`: `DATA`, Baiti 20 - anwani ya mtumaji.
- `to`: `DATA`, Baiti 20 - anwani ya mpokeaji. `null` wakati ni muamala wa uundaji wa mkataba.
- `cumulativeGasUsed` : `QUANTITY ` - Jumla ya kiasi cha gesi iliyotumika wakati muamala huu ulitekelezwa katika kizuizi.
- `effectiveGasPrice` : `QUANTITY` - Jumla ya ada ya msingi na ncha iliyolipwa kwa kila kitengo cha gesi.
- `gasUsed `: `QUANTITY ` - Kiasi cha gesi kilichotumiwa na muamala huu maalum pekee.
- `contractAddress `: `DATA`, Baiti 20 - Anwani ya mkataba iliyoundwa, ikiwa muamala ulikuwa uundaji wa mkataba, vinginevyo `null`.
- `logs`: `Array` - Safu ya vitu vya kumbukumbu, ambavyo muamala huu ulizalisha.
- `logsBloom`: `DATA`, Baiti 256 - Kichujio cha Bloom kwa wateja wepesi kupata kumbukumbu zinazohusiana haraka.
- `type`: `QUANTITY` - nambari kamili ya aina ya muamala, `0x0` kwa miamala ya zamani, `0x1` kwa aina za orodha ya ufikiaji, `0x2` kwa ada za nguvu.

Pia inarudisha _ama_ :

- `root` : `DATA` baiti 32 za mzizi wa hali baada ya muamala (kabla ya Byzantium).
- `status`: `QUANTITY` ama `1` (mafanikio) au `0` (kushindwa)

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Matokeo
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // mfuatano wa anwani ikiwa iliundwa
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // kumbukumbu kama zilivyorudishwa na getFilterLogs, n.k.
    }],
    "logsBloom": "0x00...0", // kichujio cha bloom cha baiti 256
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Hurejesha taarifa kuhusu uncle wa bloku kwa hashi na nafasi ya faharasa ya uncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - Hashi ya kizuizi.
2. `QUANTITY` - Nafasi ya faharasa ya mjomba.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Inarudisha**
Angalia [eth_getBlockByHash](#eth_getblockbyhash)

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Matokeo angalia [eth_getBlockByHash](#eth_getblockbyhash)

**Kumbuka**: Mjomba hana miamala ya kibinafsi.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Hurejesha taarifa kuhusu uncle wa bloku kwa nambari na nafasi ya faharasa ya uncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Jaribu ncha ya mwisho katika uwanja wa michezo
</ButtonLink>

**Vigezo**

1. `QUANTITY|TAG` - nambari ya kizuizi, au mfuatano `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, kama ilivyo katika [kigezo cha kizuizi](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - nafasi ya faharasa ya mjomba.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Inarudisha**
Angalia [eth_getBlockByHash](#eth_getblockbyhash)

**Kumbuka**: Mjomba hana miamala ya kibinafsi.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Matokeo angalia [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Huunda kitu cha kichujio, kulingana na chaguzi za kichujio, ili kuarifu wakati hali inabadilika (kumbukumbu).
Ili kuangalia kama hali imebadilika, piga simu [eth_getFilterChanges](#eth_getfilterchanges).

**Kumbuka kuhusu kubainisha vichujio vya mada:**
Mada zinategemea mpangilio. Muamala wenye kumbukumbu na mada [A, B] utalinganishwa na vichujio vifuatavyo vya mada:

- `[]` "chochote"
- `[A]` "A katika nafasi ya kwanza (na chochote baada)"
- `[null, B]` "chochote katika nafasi ya kwanza NA B katika nafasi ya pili (na chochote baada)"
- `[A, B]` "A katika nafasi ya kwanza NA B katika nafasi ya pili (na chochote baada)"
- `[[A, B], [A, B]]` "(A AU B) katika nafasi ya kwanza NA (A AU B) katika nafasi ya pili (na chochote baada)"
- **Vigezo**

1. `Object` - Chaguzi za kichujio:

- `fromBlock`: `QUANTITY|TAG` - (si lazima, chaguo-msingi: `"latest"`) Nambari kamili ya kizuizi, au `"latest"` kwa kizuizi cha mwisho kilichopendekezwa, `"safe"` kwa kizuizi cha mwisho salama, `"finalized"` kwa kizuizi cha mwisho kilichokamilishwa, au `"pending"`, `"earliest"` kwa miamala ambayo bado haiko kwenye kizuizi.
- `toBlock`: `QUANTITY|TAG` - (si lazima, chaguo-msingi: `"latest"`) Nambari kamili ya kizuizi, au `"latest"` kwa kizuizi cha mwisho kilichopendekezwa, `"safe"` kwa kizuizi cha mwisho salama, `"finalized"` kwa kizuizi cha mwisho kilichokamilishwa, au `"pending"`, `"earliest"` kwa miamala ambayo bado haiko kwenye kizuizi.
- `address`: `DATA|Array`, Baiti 20 - (si lazima) Anwani ya mkataba au orodha ya anwani ambazo kumbukumbu zinapaswa kutoka.
- `topics`: `Array of DATA`, - (si lazima) Safu ya mada za `DATA` za Baiti 32. Mada zinategemea mpangilio. Kila mada inaweza pia kuwa safu ya DATA na chaguzi za "au".

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Inarudisha**
`QUANTITY` - Kitambulisho cha kichujio.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Huunda kichujio katika nodi, ili kuarifu wakati kizuizi kipya kinafika.
Ili kuangalia kama hali imebadilika, piga simu [eth_getFilterChanges](#eth_getfilterchanges).

**Vigezo**
Hakuna

**Inarudisha**
`QUANTITY` - Kitambulisho cha kichujio.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Matokeo
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Huunda kichujio katika nodi, ili kuarifu wakati miamala mipya inayosubiri inafika.
Ili kuangalia kama hali imebadilika, piga simu [eth_getFilterChanges](#eth_getfilterchanges).

**Vigezo**
Hakuna

**Inarudisha**
`QUANTITY` - Kitambulisho cha kichujio.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Matokeo
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Huondoa kichujio chenye kitambulisho fulani. Inapaswa kuitwa kila wakati ufuatiliaji hauhitajiki tena.
Zaidi ya hayo, Vichujio huisha muda wake wakati havijaombwa na [eth_getFilterChanges](#eth_getfilterchanges) kwa kipindi fulani.

**Vigezo**

1. `QUANTITY` - Kitambulisho cha kichujio.

```js
params: [
  "0xb", // 11
]
```

**Inarudisha**
`Boolean` - `true` ikiwa kichujio kimeondolewa kwa mafanikio, vinginevyo `false`.

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Matokeo
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Mbinu ya kupiga kura kwa kichujio, ambayo inarudisha safu ya kumbukumbu zilizotokea tangu upigaji kura wa mwisho.

**Vigezo**

1. `QUANTITY` - kitambulisho cha kichujio.

```js
params: [
  "0x16", // 22
]
```

**Inarudisha**
`Array` - Safu ya vitu vya kumbukumbu, au safu tupu ikiwa hakuna kitu kilichobadilika tangu upigaji kura wa mwisho.

- Kwa vichujio vilivyoundwa na `eth_newBlockFilter` marejesho ni hashi za bloku (`DATA`, Baiti 32), k.m., `["0x3454645634534..."]`.

- Kwa vichujio vilivyoundwa na `eth_newPendingTransactionFilter ` marejesho ni hashi za muamala (`DATA`, Baiti 32), k.m., `["0x6345343454645..."]`.

- Kwa vichujio vilivyoundwa na `eth_newFilter` kumbukumbu ni vitu vyenye vigezo vifuatavyo:
  - `removed`: `TAG` - `true` wakati kumbukumbu iliondolewa, kutokana na upangaji upya wa mnyororo. `false` ikiwa ni kumbukumbu halali.
  - `logIndex`: `QUANTITY` - nambari kamili ya nafasi ya faharasa ya kumbukumbu katika kizuizi. `null` wakati ni kumbukumbu inayosubiri.
  - `transactionIndex`: `QUANTITY` - nambari kamili ya nafasi ya faharasa ya miamala ambayo kumbukumbu ilitengenezwa kutoka. `null` wakati ni kumbukumbu inayosubiri.
  - `transactionHash`: `DATA`, Baiti 32 - hashi ya miamala ambayo kumbukumbu hii ilitengenezwa kutoka. `null` wakati ni kumbukumbu inayosubiri.
  - `blockHash`: `DATA`, Baiti 32 - hashi ya kizuizi ambapo kumbukumbu hii ilikuwa. `null` wakati inasubiri. `null` wakati ni kumbukumbu inayosubiri.
  - `blockNumber`: `QUANTITY` - nambari ya kizuizi ambapo kumbukumbu hii ilikuwa. `null` wakati inasubiri. `null` wakati ni kumbukumbu inayosubiri.
  - `address`: `DATA`, Baiti 20 - anwani ambayo kumbukumbu hii ilitoka.
  - `data`: `DATA` - data ya kumbukumbu isiyo na faharasa ya urefu-tofauti. (Katika _solidity_: hoja sifuri au zaidi za kumbukumbu zisizo na faharasa za Baiti 32.)
  - `topics`: `Array of DATA` - Safu ya hoja za kumbukumbu zilizoorodheshwa za Baiti 0 hadi 4 32 za `DATA`. (Katika _solidity_: Mada ya kwanza ni _hashi_ ya saini ya tukio (k.m., `Deposit(address,bytes32,uint256)`), isipokuwa umetangaza tukio hilo na kibainishi `anonymous`.)

- **Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Matokeo
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

Inarudisha safu ya kumbukumbu zote zinazolingana na kichujio chenye kitambulisho fulani.

**Vigezo**

1. `QUANTITY` - Kitambulisho cha kichujio.

```js
params: [
  "0x16", // 22
]
```

**Inarudisha**
Angalia [eth_getFilterChanges](#eth_getfilterchanges)

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Matokeo angalia [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Inarudisha safu ya kumbukumbu zote zinazolingana na kitu fulani cha kichujio.

**Vigezo**

1. `Object` - Chaguzi za kichujio:

- `fromBlock`: `QUANTITY|TAG` - (si lazima, chaguo-msingi: `"latest"`) Nambari kamili ya kizuizi, au `"latest"` kwa kizuizi cha mwisho kilichopendekezwa, `"safe"` kwa kizuizi cha mwisho salama, `"finalized"` kwa kizuizi cha mwisho kilichokamilishwa, au `"pending"`, `"earliest"` kwa miamala ambayo bado haiko kwenye kizuizi.
- `toBlock`: `QUANTITY|TAG` - (si lazima, chaguo-msingi: `"latest"`) Nambari kamili ya kizuizi, au `"latest"` kwa kizuizi cha mwisho kilichopendekezwa, `"safe"` kwa kizuizi cha mwisho salama, `"finalized"` kwa kizuizi cha mwisho kilichokamilishwa, au `"pending"`, `"earliest"` kwa miamala ambayo bado haiko kwenye kizuizi.
- `address`: `DATA|Array`, Baiti 20 - (si lazima) Anwani ya mkataba au orodha ya anwani ambazo kumbukumbu zinapaswa kutoka.
- `topics`: `Array of DATA`, - (si lazima) Safu ya mada za `DATA` za Baiti 32. Mada zinategemea mpangilio. Kila mada inaweza pia kuwa safu ya DATA na chaguzi za "au".
- `blockHash`: `DATA`, Baiti 32 - (si lazima, **baadaye**) Kwa kuongezwa kwa EIP-234, `blockHash` itakuwa chaguo jipya la kichujio ambalo linazuia kumbukumbu zilizorudishwa kwa kizuizi kimoja na hashi ya baiti 32 `blockHash`. Kutumia `blockHash` ni sawa na `fromBlock` = `toBlock` = nambari ya kizuizi na hashi `blockHash`. Ikiwa `blockHash` ipo katika vigezo vya kichujio, basi `fromBlock` wala `toBlock` haziruhusiwi.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Inarudisha**
Angalia [eth_getFilterChanges](#eth_getfilterchanges)

**Mfano**

```js
// Ombi
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Matokeo angalia [eth_getFilterChanges](#eth_getfilterchanges)

## Mfano wa Matumizi {#usage-example}

### Kupeleka mkataba kwa kutumia JSON_RPC {#deploying-contract}

Sehemu hii inajumuisha onyesho la jinsi ya kupeleka mkataba kwa kutumia kiolesura cha RPC pekee. Kuna njia mbadala za kupeleka mikataba ambapo utata huu unaondolewa—kwa mfano, kutumia maktaba zilizojengwa juu ya kiolesura cha RPC kama vile [web3.js](https://web3js.readthedocs.io/) na [web3.py](https://github.com/ethereum/web3.py). Uondoaji huu kwa ujumla ni rahisi kuelewa na una makosa machache, lakini bado ni muhimu kuelewa kinachoendelea chini ya kofia.

Ifuatayo ni mkataba-erevu ulio wazi unaoitwa `Multiply7` ambao utapelekwa kwa kutumia kiolesura cha JSON-RPC kwa nodi ya Ethereum. Mafunzo haya yanadhania msomaji tayari anaendesha nodi ya Geth. Maelezo zaidi kuhusu nodi na wateja yanapatikana [hapa](/developers/docs/nodes-and-clients/run-a-node). Tafadhali rejelea nyaraka za [mteja](/developers/docs/nodes-and-clients/) binafsi ili kuona jinsi ya kuanza HTTP JSON-RPC kwa wateja wasio wa Geth. Wateja wengi hutoa huduma kwa chaguo-msingi kwenye `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Jambo la kwanza kufanya ni kuhakikisha kiolesura cha HTTP RPC kimewashwa. Hii inamaanisha tunatoa Geth na bendera ya `--http` wakati wa kuanza. Katika mfano huu tunatumia nodi ya Geth kwenye mnyororo wa kibinafsi wa maendeleo. Kwa kutumia mbinu hii hatuhitaji ether kwenye mtandao halisi.

```bash
geth --http --dev console 2>>geth.log
```

Hii itaanza kiolesura cha HTTP RPC kwenye `http://localhost:8545`.

Tunaweza kuthibitisha kuwa kiolesura kinafanya kazi kwa kupata anwani ya coinbase (kwa kupata anwani ya kwanza kutoka kwenye safu ya akaunti) na salio kwa kutumia [curl](https://curl.se). Tafadhali kumbuka kuwa data katika mifano hii itatofautiana kwenye nodi yako ya ndani. Ikiwa unataka kujaribu amri hizi, badilisha vigezo vya ombi katika ombi la pili la curl na matokeo yaliyorudishwa kutoka kwa la kwanza.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Kwa sababu nambari zimesimbwa kwa hex, salio hurudishwa katika wei kama mfuatano wa hex. Ikiwa tunataka kuwa na salio katika ether kama nambari tunaweza kutumia web3 kutoka kwa koni ya Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Sasa kwa kuwa kuna ether fulani kwenye mnyororo wetu wa kibinafsi wa maendeleo, tunaweza kupeleka mkataba. Hatua ya kwanza ni kuandaa mkataba wa Multiply7 kuwa msimbo wa baiti ambao unaweza kutumwa kwa EVM. Ili kusakinisha solc, mkusanyaji wa Solidity, fuata [nyaraka za Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Unaweza kutaka kutumia toleo la zamani la `solc` ili kuendana na [toleo la mkusanyaji lililotumika kwa mfano wetu](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Hatua inayofuata ni kuandaa mkataba wa Multiply7 kuwa msimbo wa baiti unaoweza kutumwa kwa EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Sasa kwa kuwa tuna msimbo uliokusanywa tunahitaji kuamua ni kiasi gani cha gesi kinagharimu kuupeleka. Kiolesura cha RPC kina mbinu ya `eth_estimateGas` ambayo itatupa makadirio.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Na hatimaye peleka mkataba.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Muamala unakubaliwa na nodi na hashi ya muamala inarudishwa. Hashi hii inaweza kutumika kufuatilia muamala. Hatua inayofuata ni kuamua anwani ambapo mkataba wetu umepelekwa. Kila muamala uliotekelezwa utaunda risiti. Risiti hii ina taarifa mbalimbali kuhusu muamala kama vile ni katika kizuizi gani muamala ulijumuishwa na ni kiasi gani cha gesi kilitumika na EVM. Ikiwa muamala
unaunda mkataba pia utakuwa na anwani ya mkataba. Tunaweza kupata risiti kwa kutumia mbinu ya `eth_getTransactionReceipt` ya RPC.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Mkataba wetu uliundwa kwenye `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Matokeo ya null badala ya risiti inamaanisha muamala bado haujajumuishwa kwenye kizuizi. Subiri kwa muda na uangalie ikiwa mteja wako wa makubaliano anafanya kazi na ujaribu tena.

#### Kuwasiliana na mikataba-erevu {#interacting-with-smart-contract}

Katika mfano huu tutakuwa tunatuma muamala kwa kutumia `eth_sendTransaction` kwa mbinu ya `multiply` ya mkataba.

`eth_sendTransaction` inahitaji hoja kadhaa, hasa `from`, `to` na `data`. `Kutoka` ni anwani ya umma ya akaunti yetu, na `kwenda` ni anwani ya mkataba. Hoja ya `data` ina mzigo unaobainisha ni mbinu gani lazima itumike na kwa hoja gani. Hapa ndipo [ABI (application binary interface)](https://docs.soliditylang.org/en/latest/abi-spec.html) inapoingia. ABI ni faili ya JSON inayobainisha jinsi ya kubainisha na kusimba data kwa ajili ya EVM.

Baiti za mzigo hubainisha ni mbinu gani katika mkataba inayoitwa. Hizi ni baiti 4 za kwanza kutoka kwenye hashi ya Keccak juu ya jina la utendakazi na aina zake za hoja, zilizosimbwa kwa hex. Kazi ya kuzidisha inakubali uint ambayo ni jina lingine la uint256. Hii inatuacha na:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Hatua inayofuata ni kusimba hoja. Kuna uint256 moja tu, tuseme, thamani 6. ABI ina sehemu inayobainisha jinsi ya kusimba aina za uint256.

`int<M>: enc(X)` ni usimbaji wa kikamilisho cha mbili-kubwa-mwisho cha X, kilichopachikwa kwenye upande wa juu (kushoto) na 0xff kwa X hasi na baiti > sifuri kwa X chanya ili urefu uwe zidisho la baiti 32.

Hii inasimba hadi `0000000000000000000000000000000000000000000000000000000000000006`.

Kuchanganya kiteuzi cha kazi na hoja iliyosimbwa, data yetu itakuwa `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Hii sasa inaweza kutumwa kwa nodi:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Kwa kuwa muamala ulitumwa, hashi ya muamala ilirejeshwa. Kupata risiti kunatoa:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

Risiti ina kumbukumbu. Kumbukumbu hii ilitolewa na EVM kwenye utekelezaji wa muamala na kujumuishwa kwenye risiti. Kazi ya `multiply` inaonyesha kuwa tukio la `Print` liliibuliwa na ingizo mara 7. Kwa kuwa hoja ya tukio la `Print` ilikuwa uint256 tunaweza kuisimbua kulingana na sheria za ABI ambazo zitatuacha na desimali inayotarajiwa 42. Kando na data inafaa kuzingatia kwamba mada zinaweza kutumika kubainisha ni tukio gani lililounda kumbukumbu:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Huu ulikuwa utangulizi mfupi tu wa baadhi ya kazi za kawaida, ukionyesha matumizi ya moja kwa moja ya JSON-RPC.

## Mada zinazohusiana {#related-topics}

- [Ufafanuzi wa JSON-RPC](http://www.jsonrpc.org/specification)
- [Nodi na wateja](/developers/docs/nodes-and-clients/)
- [API za JavaScript](/developers/docs/apis/javascript/)
- [API za Backend](/developers/docs/apis/backend/)
- [Wateja wa utekelezaji](/developers/docs/nodes-and-clients/#execution-clients)
