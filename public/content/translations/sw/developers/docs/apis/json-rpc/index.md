---
title: API ya JSON-RPC
description: Itifaki isiyo na hali, nyepesi ya wito wa utaratibu wa mbali (RPC) kwa viteja vya Ethereum.
lang: sw
---

Ili programu tumizi iweze kuingiliana na mnyororo wa vitalu wa [Ethereum](/) - iwe kwa kusoma data ya mnyororo wa vitalu au kutuma miamala kwenye mtandao - ni lazima iunganishwe kwenye nodi ya Ethereum.

Kwa madhumuni haya, kila [kiteja cha Ethereum](/developers/docs/nodes-and-clients/#execution-clients) hutekeleza [ubainifu wa JSON-RPC](https://github.com/ethereum/execution-apis), kwa hivyo kuna seti sawa ya mbinu ambazo programu tumizi zinaweza kutegemea bila kujali utekelezaji maalum wa nodi au kiteja.

[JSON-RPC](https://www.jsonrpc.org/specification) ni itifaki isiyo na hali, nyepesi ya wito wa utaratibu wa mbali (RPC). Inafafanua miundo kadhaa ya data na sheria zinazohusu uchakataji wake. Haitegemei njia ya usafirishaji kwa kuwa dhana zinaweza kutumika ndani ya mchakato huo huo, kupitia soketi, kupitia HTTP, au katika mazingira mengi mbalimbali ya kupitisha ujumbe. Inatumia JSON (RFC 4627) kama umbizo la data.

## Utekelezaji wa viteja {#client-implementations}

Viteja vya Ethereum kila kimoja kinaweza kutumia lugha tofauti za programu wakati wa kutekeleza ubainifu wa JSON-RPC. Tazama [nyaraka za kiteja](/developers/docs/nodes-and-clients/#execution-clients) binafsi kwa maelezo zaidi kuhusiana na lugha mahususi za programu. Tunapendekeza kuangalia nyaraka za kila kiteja kwa taarifa za hivi punde za usaidizi wa API.

## Maktaba za Urahisishaji {#convenience-libraries}

Ingawa unaweza kuchagua kuingiliana moja kwa moja na viteja vya Ethereum kupitia API ya JSON-RPC, mara nyingi kuna chaguzi rahisi zaidi kwa watengenezaji wa programu tumizi zilizogatuliwa (dapp). Kuna maktaba nyingi za [JavaScript](/developers/docs/apis/javascript/#available-libraries) na [API za mandhari-nyuma](/developers/docs/apis/backend/#available-libraries) ambazo zipo ili kutoa vifuniko juu ya API ya JSON-RPC. Kwa kutumia maktaba hizi, watengenezaji wanaweza kuandika mbinu angavu za mstari mmoja katika lugha ya programu wanayoichagua ili kuanzisha maombi ya JSON-RPC (kiufundi kwa ndani) ambayo huingiliana na Ethereum.

## API za mteja wa mwafaka {#consensus-clients}

Ukurasa huu unahusika zaidi na API ya JSON-RPC inayotumiwa na viteja vya utekelezaji vya Ethereum. Hata hivyo, wateja wa mwafaka pia wana API ya RPC inayoruhusu watumiaji kuuliza taarifa kuhusu nodi, kuomba vitalu vya Beacon, hali ya Beacon, na taarifa nyingine zinazohusiana na mwafaka moja kwa moja kutoka kwenye nodi. API hii imeandikwa kwenye [ukurasa wa wavuti wa API ya Beacon](https://ethereum.github.io/beacon-APIs/#/).

API ya ndani pia inatumika kwa mawasiliano kati ya wateja ndani ya nodi - yaani, inawezesha mteja wa mwafaka na kiteja cha utekelezaji kubadilishana data. Hii inaitwa 'Engine API' na vipimo vyake vinapatikana kwenye [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Maelezo maalum ya kiteja cha utekelezaji {#spec}

[Soma maelezo maalum kamili ya API ya JSON-RPC kwenye GitHub](https://github.com/ethereum/execution-apis). API hii imeandikwa kwenye [ukurasa wa wavuti wa API ya Utekelezaji](https://ethereum.github.io/execution-apis/) na inajumuisha Kikaguzi ili kujaribu mbinu zote zinazopatikana.

## Taratibu {#conventions}

### Usimbaji wa thamani ya heksadesimali {#hex-encoding}

Aina mbili kuu za data hupitishwa kupitia JSON: safu za baiti ambazo hazijapangiliwa na viasi. Zote mbili hupitishwa kwa usimbaji wa heksadesimali lakini zikiwa na mahitaji tofauti ya upangiliaji.

#### Viasi {#quantities-encoding}

Wakati wa kusimba viasi (nambari kamili, nambari): simba kama heksadesimali, anza na "0x", uwakilishi uliofinyana zaidi (ubaguzi mdogo: sifuri inapaswa kuwakilishwa kama "0x0").

Hapa kuna baadhi ya mifano:

- 0x41 (65 katika desimali)
- 0x400 (1024 katika desimali)
- KOSA: 0x (inapaswa kuwa na angalau tarakimu moja kila wakati - sifuri ni "0x0")
- KOSA: 0x0400 (sifuri za kuongoza haziruhusiwi)
- KOSA: ff (lazima ianze na 0x)

### Data isiyopangiliwa {#unformatted-data-encoding}

Wakati wa kusimba data isiyopangiliwa (safu za baiti, anwani za akaunti, heshi, safu za msimbo wa baiti): simba kama heksadesimali, anza na "0x", tarakimu mbili za heksadesimali kwa kila baiti.

Hapa kuna baadhi ya mifano:

- 0x41 (ukubwa 1, "A")
- 0x004200 (ukubwa 3, "0B0")
- 0x (ukubwa 0, "")
- KOSA: 0xf0f0f (lazima iwe nambari shufwa ya tarakimu)
- KOSA: 004200 (lazima ianze na 0x)

### Kigezo cha kitalu {#block-parameter}

Mbinu zifuatazo zina kigezo cha kitalu:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

Wakati maombi yanapofanywa ambayo yanahoji hali ya Ethereum, kigezo cha kitalu kilichotolewa huamua urefu wa kitalu.

Chaguzi zifuatazo zinawezekana kwa kigezo cha kitalu:

- `HEX String` - nambari kamili ya kitalu
- `String "earliest"` kwa kitalu cha mapema zaidi/kitalu cha asili
- `String "latest"` - kwa kitalu cha hivi punde kilichopendekezwa
- `String "safe"` - kwa kitalu cha hivi punde salama cha kichwa
- `String "finalized"` - kwa kitalu cha hivi punde kilichokamilishwa
- `String "pending"` - kwa hali/miamala inayosubiri

## Mifano {#examples}

Katika ukurasa huu tunatoa mifano ya jinsi ya kutumia ncha binafsi za API ya JSON_RPC kwa kutumia zana ya mstari wa amri, [curl](https://curl.se). Mifano hii ya ncha binafsi inapatikana hapa chini katika sehemu ya [Mifano ya Curl](#curl-examples). Zaidi chini ya ukurasa, pia tunatoa [mfano wa mwanzo hadi mwisho](#usage-example) kwa ajili ya kukusanya na kusambaza mkataba mahiri kwa kutumia nodi ya Geth, API ya JSON_RPC na curl.

## Mifano ya Curl {#curl-examples}

Mifano ya kutumia API ya JSON_RPC kwa kufanya maombi ya [curl](https://curl.se) kwenye nodi ya Ethereum imetolewa hapa chini. Kila mfano unajumuisha maelezo ya sehemu ya mwisho maalum, vigezo vyake, aina ya kurejesha, na mfano wa vitendo wa jinsi inavyopaswa kutumika.

Maombi ya curl yanaweza kurejesha ujumbe wa hitilafu unaohusiana na aina ya maudhui. Hii ni kwa sababu chaguo la `--data` huweka aina ya maudhui kuwa `application/x-www-form-urlencoded`. Ikiwa nodi yako inalalamika kuhusu hili, weka kichwa wewe mwenyewe kwa kuweka `-H "Content-Type: application/json"` mwanzoni mwa mwito. Mifano pia haijumuishi mchanganyiko wa URL/IP na lango ambayo lazima iwe hoja ya mwisho inayotolewa kwa curl (k.m., `127.0.0.1:8545`). Ombi kamili la curl linalojumuisha data hizi za ziada huchukua muundo ufuatao:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, Hali, Historia {#gossip-state-history}

Baadhi ya mbinu kuu za JSON-RPC zinahitaji data kutoka kwenye mtandao wa Ethereum, na zinaangukia vizuri katika makundi makuu matatu: _Gossip, Hali, na Historia_. Tumia viungo katika sehemu hizi kuruka hadi kwenye kila mbinu, au tumia yaliyomo kuchunguza orodha nzima ya mbinu.

### Mbinu za Gossip {#gossip-methods}

> Mbinu hizi hufuatilia kichwa cha mnyororo. Hivi ndivyo miamala inavyosambaa kwenye mtandao, inavyoingia kwenye vitalu, na jinsi wateja wanavyopata taarifa kuhusu vitalu vipya.

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### Mbinu za Hali {#state-methods}

> Mbinu zinazoripoti hali ya sasa ya data zote zilizohifadhiwa. "Hali" ni kama kipande kimoja kikubwa cha RAM kinachoshirikiwa, na inajumuisha salio la akaunti, data za mkataba, na makadirio ya gesi.

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### Mbinu za Historia {#history-methods}

> Huchukua rekodi za kihistoria za kila kitalu kurudi nyuma hadi asili. Hili ni kama faili moja kubwa la kuongeza pekee, na linajumuisha vichwa vyote vya vitalu, miili ya vitalu, vitalu vya mjomba, na stakabadhi za miamala.

- [eth_getBlockTransactionCountByHash](#eth-getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth-getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth-getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth-getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth-getblockbyhash)
- [eth_getBlockByNumber](#eth-getblockbynumber)
- [eth_getTransactionByHash](#eth-gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth-gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth-gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth-gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth-getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth-getunclebyblocknumberandindex)

## Uwanja wa Majaribio wa API ya JSON-RPC {#json-rpc-api-playground}

Unaweza kutumia [zana ya uwanja wa majaribio](https://ethereum-json-rpc.com) kugundua na kujaribu mbinu za API. Pia inakuonyesha ni mbinu na mitandao ipi inayoungwa mkono na watoa huduma mbalimbali wa nodi.

## Mbinu za API ya JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

Hurejesha toleo la sasa la kiteja.

**Vigezo**

Hakuna

**Hurejesha**

`String` - Toleo la sasa la kiteja

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

Inarejesha Keccak-256 (_sio_ SHA3-256 iliyosanifiwa) ya data iliyotolewa.

**Vigezo**

1. `DATA` - Data ya kubadilisha kuwa heshi ya SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Inarejesha**

`DATA` - Tokeo la SHA3 la mfuatano uliotolewa.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

Hurejesha kitambulisho cha mtandao cha sasa.

**Vigezo**

Hakuna

**Hurejesha**

`String` - Kitambulisho cha mtandao cha sasa.

Orodha kamili ya vitambulisho vya mtandao vya sasa inapatikana kwenye [chainlist.org](https://chainlist.org). Baadhi ya vile vya kawaida ni:

- `1`: Mtandao Mkuu wa Ethereum
- `11155111`: Mtandao wa majaribio wa Sepolia
- `560048` : Mtandao wa majaribio wa Hoodi

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

Inarudisha `true` ikiwa kiteja kinasikiliza kikamilifu miunganisho ya mtandao.

**Vigezo**

Hakuna

**Inarudisha**

`Boolean` - `true` inaposikiliza, vinginevyo `false`.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

Hurejesha idadi ya rika zilizounganishwa kwa sasa kwenye kiteja.

**Vigezo**

Hakuna

**Hurejesha**

`QUANTITY` - nambari kamili ya idadi ya rika zilizounganishwa.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

Hurejesha toleo la sasa la itifaki ya Ethereum. Kumbuka kwamba mbinu hii [haipatikani katika Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Vigezo**

Hakuna

**Hurejesha**

`String` - Toleo la sasa la itifaki ya Ethereum

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

Hurejesha kipengee chenye data kuhusu hali ya usawazishaji au `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Jaribu endpoint kwenye uwanja wa majaribio
</ButtonLink>

**Vigezo**

Hakuna

**Hurejesha**

Data kamili inayorejeshwa inatofautiana kati ya utekelezaji wa kiteja. Wateja wote hurejesha `False` wakati nodi haisawazishi, na wateja wote hurejesha nyanja zifuatazo.

`Object|Boolean`, Kipengee chenye data ya hali ya usawazishaji au `FALSE`, wakati haisawazishi:

- `startingBlock`: `QUANTITY` - Kitalu ambacho uingizaji ulianzia (itawekwa upya tu, baada ya usawazishaji kufikia kilele chake)
- `currentBlock`: `QUANTITY` - Kitalu cha sasa, sawa na eth_blockNumber
- `highestBlock`: `QUANTITY` - Kitalu cha juu zaidi kinachokadiriwa

Hata hivyo, wateja binafsi wanaweza pia kutoa data ya ziada. Kwa mfano Geth hurejesha yafuatayo:

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

Wakati Besu hurejesha:

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

Rejelea nyaraka za kiteja chako mahususi kwa maelezo zaidi.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

Inarejesha anwani ya coinbase ya kiteja.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Jaribu kifikio kwenye uwanja wa majaribio
</ButtonLink>

> **Kumbuka:** Mbinu hii imeachwa kutumika kuanzia **v1.14.0** na haitumiki tena. Kujaribu kutumia mbinu hii kutasababisha hitilafu ya "Method not supported".

**Vigezo**

Hakuna

**Inarejesha**

`DATA`, baiti 20 - anwani ya sasa ya coinbase.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

Hurejesha kitambulisho cha mnyororo kinachotumika kusaini miamala iliyolindwa dhidi ya marudio.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Jaribu kifikio katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

Hakuna

**Hurejesha**

`chainId`, thamani ya heksadesimali kama tungo inayowakilisha nambari kamili ya kitambulisho cha mnyororo cha sasa.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

Inarudisha `true` ikiwa kiteja kinachimba vitalu vipya kikamilifu. Hii inaweza tu kurudisha `true` kwa mitandao ya Uthibitisho wa Kazi (PoW) na inaweza isipatikane katika baadhi ya viteja tangu [Unganisho](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Jaribu endpoint katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

Hakuna

**Inarudisha**

`Boolean` - inarudisha `true` ikiwa kiteja kinachimba, vinginevyo `false`.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

Inarejesha idadi ya heshi kwa sekunde ambazo nodi inatumia kuchimba. Hii inaweza tu kurejesha `true` kwa mitandao ya Uthibitisho wa Kazi (PoW) na inaweza isipatikane katika baadhi ya viteja tangu [Unganisho](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Jaribu kituo cha mwisho kwenye uwanja wa majaribio
</ButtonLink>

**Vigezo**

Hakuna

**Inarejesha**

`QUANTITY` - idadi ya heshi kwa sekunde.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

Hurejesha makadirio ya bei ya sasa kwa kila gesi katika Wei. Kwa mfano, kiteja cha Besu huchunguza vitalu 100 vya mwisho na kurejesha bei ya wastani ya uniti ya gesi kwa chaguo-msingi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Jaribu endpoint katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

Hakuna

**Hurejesha**

`QUANTITY` - nambari kamili ya bei ya sasa ya gesi katika Wei.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

Hurejesha orodha ya anwani zinazomilikiwa na kiteja.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Jaribu endpoint kwenye uwanja wa majaribio
</ButtonLink>

**Vigezo**

Hakuna

**Hurejesha**

`Array of DATA`, Baiti 20 - anwani zinazomilikiwa na kiteja.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

Inarejesha nambari ya kitalu cha hivi karibuni zaidi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Jaribu kituo kwenye uwanja wa majaribio
</ButtonLink>

**Vigezo**

Hakuna

**Inarejesha**

`QUANTITY` - nambari kamili ya nambari ya kitalu cha sasa ambacho kiteja kipo.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

Inarejesha salio la akaunti kwenye anwani iliyotolewa.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Jaribu endpoint kwenye uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 20 - anwani ya kuangalia salio.
2. `QUANTITY|TAG` - nambari kamili ya kitalu, au mfuatano `"latest"`, `"earliest"`, `"pending"`, `"safe"`, au `"finalized"`, tazama [kigezo cha kitalu](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Inarejesha**

`QUANTITY` - nambari kamili ya salio la sasa katika Wei.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

Inarejesha thamani kutoka kwenye nafasi ya hifadhi katika anwani iliyotolewa.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Jaribu endpoint kwenye uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 20 - anwani ya hifadhi.
2. `QUANTITY` - nambari kamili ya nafasi katika hifadhi.
3. `QUANTITY|TAG` - nambari kamili ya kitalu, au mfuatano `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, tazama [kigezo cha kitalu](/developers/docs/apis/json-rpc/#block-parameter)

**Inarejesha**

`DATA` - thamani katika nafasi hii ya hifadhi.

**Mfano**
Kukokotoa nafasi sahihi kunategemea hifadhi itakayorejeshwa. Fikiria mkataba ufuatao uliosambazwa kwenye `0x295a70b2de5e3953354a6a8344e616ed314d7251` na anwani `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

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

Kurejesha thamani ya pos0 ni rahisi:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Kurejesha kipengele cha ramani ni kugumu zaidi. Nafasi ya kipengele katika ramani inakokotolewa kwa:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Hii inamaanisha ili kurejesha hifadhi kwenye pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] tunahitaji kukokotoa nafasi kwa:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Console ya geth inayokuja na maktaba ya Web3 inaweza kutumika kufanya mkokotoo:

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

### eth_getTransactionCount {#eth-gettransactioncount}

Inarudisha idadi ya miamala _iliyotumwa_ kutoka kwenye anwani.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Jaribu endpoint katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 20 - anwani.
2. `QUANTITY|TAG` - nambari kamili ya kitalu, au mfuatano `"latest"`, `"earliest"`, `"pending"`, `"safe"` au `"finalized"`, tazama [kigezo cha kitalu](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**Inarudisha**

`QUANTITY` - nambari kamili ya idadi ya miamala iliyotumwa kutoka kwenye anwani hii.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

Hurejesha idadi ya miamala katika kitalu kutoka kwenye kitalu kinacholingana na heshi ya kitalu iliyotolewa.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Jaribu endpoint kwenye uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - heshi ya kitalu

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Hurejesha**

`QUANTITY` - nambari kamili ya idadi ya miamala katika kitalu hiki.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

Hurejesha idadi ya miamala katika kitalu kinacholingana na nambari ya kitalu iliyotolewa.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Jaribu kituo katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `QUANTITY|TAG` - nambari kamili ya nambari ya kitalu, au mfuatano `"earliest"`, `"latest"`, `"pending"`, `"safe"` au `"finalized"`, kama ilivyo katika [kigezo cha kitalu](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Hurejesha**

`QUANTITY` - nambari kamili ya idadi ya miamala katika kitalu hiki.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

Hurejesha idadi ya wajomba katika kitalu kutoka kwenye kitalu kinacholingana na heshi ya kitalu iliyotolewa.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Jaribu endpoint katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - heshi ya kitalu

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Hurejesha**

`QUANTITY` - nambari kamili ya idadi ya wajomba katika kitalu hiki.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

Hurejesha idadi ya wajomba katika kitalu kutoka kwenye kitalu kinacholingana na nambari ya kitalu iliyotolewa.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Jaribu kifikio katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `QUANTITY|TAG` - nambari kamili ya nambari ya kitalu, au tungo `"latest"`, `"earliest"`, `"pending"`, `"safe"` au `"finalized"`, tazama [kigezo cha kitalu](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Hurejesha**

`QUANTITY` - nambari kamili ya idadi ya wajomba katika kitalu hiki.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

Hurejesha msimbo kwenye anwani iliyotolewa.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Jaribu kituo cha mwisho katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 20 - anwani
2. `QUANTITY|TAG` - nambari kamili ya kitalu, au mfuatano `"latest"`, `"earliest"`, `"pending"`, `"safe"` au `"finalized"`, tazama [kigezo cha kitalu](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Inayorejeshwa**

`DATA` - msimbo kutoka kwa anwani iliyotolewa.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

Mbinu ya sign hukokotoa sahihi mahususi ya Ethereum kwa kutumia: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Kuongeza kiambishi awali kwenye ujumbe hufanya sahihi iliyokokotolewa itambulike kama sahihi mahususi ya Ethereum. Hii huzuia matumizi mabaya ambapo programu tumizi iliyogatuliwa (dapp) hasidi inaweza kusaini data yoyote (k.m., muamala) na kutumia sahihi hiyo kujifanya kuwa mwathiriwa.

Kumbuka: anwani ya kusaini nayo lazima iwe imefunguliwa.

**Vigezo**

1. `DATA`, Baiti 20 - anwani
2. `DATA`, Baiti N - ujumbe wa kusaini

**Inarejesha**

`DATA`: Sahihi

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

Inasaini muamala unaoweza kuwasilishwa kwenye mtandao baadaye kwa kutumia [eth_sendRawTransaction](#eth-sendrawtransaction).

**Vigezo**

1. `Object` - Kipengee cha muamala

- `type`:
- `from`: `DATA`, Baiti 20 - Anwani ambayo muamala unatoka.
- `to`: `DATA`, Baiti 20 - (si lazima wakati wa kuunda mkataba mpya) Anwani ambayo muamala unaelekezwa.
- `gas`: `QUANTITY` - (si lazima, chaguo-msingi: 90000) Nambari kamili ya gesi iliyotolewa kwa ajili ya utekelezaji wa muamala. Itarejesha gesi ambayo haijatumika.
- `gasPrice`: `QUANTITY` - (si lazima, chaguo-msingi: Itaamuliwa-Baadaye) Nambari kamili ya gasPrice inayotumika kwa kila gesi iliyolipiwa, katika Wei.
- `value`: `QUANTITY` - (si lazima) Nambari kamili ya thamani iliyotumwa na muamala huu, katika Wei.
- `data`: `DATA` - Msimbo uliokusanywa wa mkataba AU heshi ya sahihi ya mbinu iliyoombwa na vigezo vilivyosimbwa.
- `nonce`: `QUANTITY` - (si lazima) Nambari kamili ya nonsi. Hii inaruhusu kufuta na kuandika upya miamala yako inayosubiri inayotumia nonsi sawa.

**Inarejesha**

`DATA`, Kipengee cha muamala kilichosimbwa kwa RLP kilichosainiwa na akaunti iliyobainishwa.

**Mfano**

```js
// Request
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

Hutengeneza muamala mpya wa mwito wa ujumbe au uundaji wa mkataba, ikiwa sehemu ya data ina msimbo, na kuusaini kwa kutumia akaunti iliyobainishwa katika `from`.

**Vigezo**

1. `Object` - Kipengee cha muamala

- `from`: `DATA`, Baiti 20 - Anwani ambayo muamala unatoka.
- `to`: `DATA`, Baiti 20 - (si lazima wakati wa kuunda mkataba mpya) Anwani ambayo muamala unaelekezwa.
- `gas`: `QUANTITY` - (si lazima, chaguo-msingi: 90000) Nambari kamili ya gesi iliyotolewa kwa ajili ya utekelezaji wa muamala. Itarejesha gesi ambayo haijatumika.
- `gasPrice`: `QUANTITY` - (si lazima, chaguo-msingi: Itaamuliwa-Baadaye) Nambari kamili ya bei ya gesi (gasPrice) inayotumika kwa kila gesi iliyolipwa.
- `value`: `QUANTITY` - (si lazima) Nambari kamili ya thamani iliyotumwa na muamala huu.
- `input`: `DATA` - Msimbo uliokusanywa wa mkataba AU heshi ya sahihi ya mbinu iliyoombwa na vigezo vilivyosimbwa.
- `nonce`: `QUANTITY` - (si lazima) Nambari kamili ya nonsi. Hii inaruhusu kufuta na kuandika upya miamala yako inayosubiri ambayo inatumia nonsi sawa.

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

**Inarejesha**

`DATA`, Baiti 32 - heshi ya muamala, au heshi sifuri ikiwa muamala bado haupatikani.

Tumia [eth_getTransactionReceipt](#eth-gettransactionreceipt) kupata anwani ya mkataba, baada ya muamala kupendekezwa katika kitalu, wakati ulipounda mkataba.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

Huunda muamala mpya wa mwito wa ujumbe au uundaji mkataba kwa miamala iliyosainiwa.

**Vigezo**

1. `DATA`, Data ya muamala iliyosainiwa.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Inarejesha**

`DATA`, Baiti 32 - heshi ya muamala, au heshi sifuri ikiwa muamala bado haupatikani.

Tumia [eth_getTransactionReceipt](#eth-gettransactionreceipt) kupata anwani ya mkataba, baada ya muamala kupendekezwa kwenye kitalu, ulipounda mkataba.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

Hutekeleza mwito wa ujumbe mpya mara moja bila kuunda muamala kwenye mnyororo wa vitalu. Mara nyingi hutumika kutekeleza vitendaji vya kusoma tu vya mkataba mahiri, kwa mfano `balanceOf` kwa mkataba wa ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Jaribu kituo cha mwisho kwenye uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `Object` - Kipengee cha mwito wa muamala

- `from`: `DATA`, Baiti 20 - (si lazima) Anwani ambayo muamala unatoka.
- `to`: `DATA`, Baiti 20 - Anwani ambayo muamala unaelekezwa.
- `gas`: `QUANTITY` - (si lazima) Nambari kamili ya gesi iliyotolewa kwa ajili ya utekelezaji wa muamala. eth_call hutumia gesi sifuri, lakini kigezo hiki kinaweza kuhitajika na baadhi ya utekelezaji.
- `gasPrice`: `QUANTITY` - (si lazima) Nambari kamili ya bei ya gesi inayotumika kwa kila gesi iliyolipiwa
- `value`: `QUANTITY` - (si lazima) Nambari kamili ya thamani iliyotumwa na muamala huu
- `input`: `DATA` - (si lazima) Heshi ya sahihi ya mbinu na vigezo vilivyosimbwa. Kwa maelezo zaidi tazama [ABI ya Mkataba wa Ethereum katika nyaraka za Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - nambari kamili ya kitalu, au mfuatano `"latest"`, `"earliest"`, `"pending"`, `"safe"` au `"finalized"`, tazama [kigezo cha kitalu](/developers/docs/apis/json-rpc/#block-parameter)

**Inarejesha**

`DATA` - thamani iliyorejeshwa ya mkataba uliotekelezwa.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

Inazalisha na kurudisha makadirio ya kiasi gani cha gesi kinahitajika ili kuruhusu muamala kukamilika. Muamala hautaongezwa kwenye mnyororo wa vitalu. Kumbuka kwamba makadirio yanaweza kuwa makubwa zaidi kuliko kiasi cha gesi kilichotumiwa hasa na muamala, kwa sababu mbalimbali ikiwa ni pamoja na mitambo ya EVM na utendaji wa nodi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Jaribu endpoint katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

Tazama vigezo vya [eth_call](#eth-call), isipokuwa kwamba sifa zote ni za hiari. Ikiwa hakuna kikomo cha gesi kilichobainishwa geth hutumia kikomo cha gesi cha kitalu kutoka kwenye kitalu kinachosubiri kama kikomo cha juu. Kutokana na hili, makadirio yaliyorejeshwa yanaweza yasiwe ya kutosha kutekeleza mwito/muamala wakati kiasi cha gesi ni kikubwa kuliko kikomo cha gesi cha kitalu kinachosubiri.

**Inarejesha**

`QUANTITY` - kiasi cha gesi kilichotumika.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

Inarudisha taarifa kuhusu kitalu kwa heshi.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Jaribu kituo kwenye uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - Heshi ya kitalu.
2. `Boolean` - Ikiwa `true` inarudisha vipengee kamili vya muamala, ikiwa `false` inarudisha tu heshi za miamala.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Inarudisha**

`Object` - Kipengee cha kitalu, au `null` wakati hakuna kitalu kilichopatikana:

- `number`: `QUANTITY` - nambari ya kitalu. `null` wakati ni kitalu kinachosubiri.
- `hash`: `DATA`, Baiti 32 - heshi ya kitalu. `null` wakati ni kitalu kinachosubiri.
- `parentHash`: `DATA`, Baiti 32 - heshi ya kitalu mzazi.
- `nonce`: `DATA`, Baiti 8 - heshi ya Uthibitisho wa Kazi (PoW) iliyozalishwa. `null` wakati ni kitalu kinachosubiri, `0x0` kwa vitalu vya Uthibitisho wa Dau (PoS) (tangu Unganisho)
- `sha3Uncles`: `DATA`, Baiti 32 - SHA3 ya data za wajomba (uncles) katika kitalu.
- `logsBloom`: `DATA`, Baiti 256 - kichujio cha bloom kwa logi za kitalu. `null` wakati ni kitalu kinachosubiri.
- `transactionsRoot`: `DATA`, Baiti 32 - mzizi wa trie ya muamala ya kitalu.
- `stateRoot`: `DATA`, Baiti 32 - mzizi wa trie ya hali ya mwisho ya kitalu.
- `receiptsRoot`: `DATA`, Baiti 32 - mzizi wa trie ya stakabadhi ya kitalu.
- `miner`: `DATA`, Baiti 20 - anwani ya mnufaika ambaye alipewa tuzo za kitalu.
- `difficulty`: `QUANTITY` - nambari kamili ya ugumu kwa kitalu hiki.
- `totalDifficulty`: `QUANTITY` - nambari kamili ya jumla ya ugumu wa mnyororo hadi kitalu hiki.
- `extraData`: `DATA` - uwanja wa "data ya ziada" wa kitalu hiki.
- `size`: `QUANTITY` - nambari kamili ya ukubwa wa kitalu hiki katika baiti.
- `gasLimit`: `QUANTITY` - kiwango cha juu cha gesi kinachoruhusiwa katika kitalu hiki.
- `gasUsed`: `QUANTITY` - jumla ya gesi iliyotumika na miamala yote katika kitalu hiki.
- `timestamp`: `QUANTITY` - muhuri wa muda wa unix wa wakati kitalu kilipokusanywa.
- `transactions`: `Array` - Safu ya vipengee vya muamala, au heshi za muamala za Baiti 32 kulingana na kigezo cha mwisho kilichotolewa.
- `uncles`: `Array` - Safu ya heshi za wajomba (uncles).

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

### eth_getBlockByNumber {#eth-getblockbynumber}

Hurejesha taarifa kuhusu kitalu kwa nambari ya kitalu.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Jaribu kikomo katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `QUANTITY|TAG` - nambari kamili ya nambari ya kitalu, au tungo `"earliest"`, `"latest"`, `"pending"`, `"safe"` au `"finalized"`, kama ilivyo katika [kigezo cha kitalu](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - Ikiwa ni `true` hurejesha vipengee kamili vya muamala, ikiwa ni `false` hurejesha tu heshi za miamala.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Hurejesha**
Tazama [eth_getBlockByHash](#eth-getblockbyhash)

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Matokeo tazama [eth_getBlockByHash](#eth-getblockbyhash)

### eth_getTransactionByHash {#eth-gettransactionbyhash}

Inarudisha taarifa kuhusu muamala ulioombwa kwa heshi ya muamala.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Jaribu endpoint katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - heshi ya muamala

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Inarudisha**

`Object` - Kipengee cha muamala, au `null` wakati hakuna muamala uliopatikana:

- `blockHash`: `DATA`, Baiti 32 - heshi ya kitalu ambapo muamala huu ulikuwemo. `null` wakati inasubiri.
- `blockNumber`: `QUANTITY` - nambari ya kitalu ambapo muamala huu ulikuwemo. `null` wakati inasubiri.
- `from`: `DATA`, Baiti 20 - anwani ya mtumaji.
- `gas`: `QUANTITY` - gesi iliyotolewa na mtumaji.
- `gasPrice`: `QUANTITY` - bei ya gesi iliyotolewa na mtumaji katika Wei.
- `hash`: `DATA`, Baiti 32 - heshi ya muamala.
- `input`: `DATA` - data iliyotumwa pamoja na muamala.
- `nonce`: `QUANTITY` - idadi ya miamala iliyofanywa na mtumaji kabla ya huu.
- `to`: `DATA`, Baiti 20 - anwani ya mpokeaji. `null` wakati ni muamala wa uundaji mkataba.
- `transactionIndex`: `QUANTITY` - nambari kamili ya nafasi ya faharisi ya miamala katika kitalu. `null` wakati inasubiri.
- `value`: `QUANTITY` - thamani iliyohamishwa katika Wei.
- `v`: `QUANTITY` - kitambulisho cha urejeshaji cha ECDSA
- `r`: `QUANTITY` - sahihi ya ECDSA r
- `s`: `QUANTITY` - sahihi ya ECDSA s

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
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

### eth_getTransactionByBlockHashAndIndex {#eth-gettransactionbyblockhashandindex}

Inarejesha taarifa kuhusu muamala kwa heshi ya kitalu na nafasi ya faharisi ya muamala.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Jaribu endpoint katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - heshi ya kitalu.
2. `QUANTITY` - nambari kamili ya nafasi ya faharisi ya muamala.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Inarejesha**
Tazama [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Matokeo tazama [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

Hurejesha maelezo kuhusu muamala kwa nambari ya kitalu na nafasi ya faharisi ya muamala.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Jaribu kituo cha mwisho katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `QUANTITY|TAG` - nambari ya kitalu, au mfuatano `"earliest"`, `"latest"`, `"pending"`, `"safe"` au `"finalized"`, kama ilivyo katika [kigezo cha kitalu](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - nafasi ya faharisi ya muamala.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Hurejesha**
Tazama [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Matokeo tazama [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

Hurejesha stakabadhi ya muamala kwa heshi ya muamala.

**Kumbuka** Kwamba stakabadhi haipatikani kwa miamala inayosubiri.

**Vigezo**

1. `DATA`, Baiti 32 - heshi ya muamala

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Hurejesha**
`Object` - Kipengee cha stakabadhi ya muamala, au `null` wakati hakuna stakabadhi iliyopatikana:

- `transactionHash `: `DATA`, Baiti 32 - heshi ya muamala.
- `transactionIndex`: `QUANTITY` - nambari kamili ya nafasi ya faharisi ya miamala katika kitalu.
- `blockHash`: `DATA`, Baiti 32 - heshi ya kitalu ambapo muamala huu ulikuwepo.
- `blockNumber`: `QUANTITY` - nambari ya kitalu ambapo muamala huu ulikuwepo.
- `from`: `DATA`, Baiti 20 - anwani ya mtumaji.
- `to`: `DATA`, Baiti 20 - anwani ya mpokeaji. null wakati ni muamala wa uundaji mkataba.
- `cumulativeGasUsed` : `QUANTITY ` - Jumla ya kiasi cha gesi iliyotumika wakati muamala huu ulipotekelezwa katika kitalu.
- `effectiveGasPrice` : `QUANTITY` - Jumla ya ada ya msingi na ada ya kipaumbele iliyolipwa kwa kila uniti ya gesi.
- `gasUsed `: `QUANTITY ` - Kiasi cha gesi iliyotumika na muamala huu mahususi pekee.
- `contractAddress `: `DATA`, Baiti 20 - Anwani ya mkataba iliyoundwa, ikiwa muamala ulikuwa uundaji wa mkataba, vinginevyo `null`.
- `logs`: `Array` - Safu ya vipengee vya logi, ambavyo muamala huu ulizalisha.
- `logsBloom`: `DATA`, Baiti 256 - Kichujio cha Bloom kwa wateja wepesi ili kupata haraka logi zinazohusiana.
- `type`: `QUANTITY` - nambari kamili ya aina ya muamala, `0x0` kwa miamala ya zamani, `0x1` kwa aina za orodha ya ufikiaji, `0x2` kwa ada zinazobadilika.

Pia inarejesha _mojawapo ya_ :

- `root` : `DATA` Baiti 32 za mzizi wa hali ya baada ya muamala (kabla ya Bizantiamu)
- `status`: `QUANTITY` ama `1` (mafanikio) au `0` (kushindwa)

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth-getunclebyblockhashandindex}

Hurejesha taarifa kuhusu mjomba wa kitalu kwa heshi na nafasi ya faharisi ya mjomba.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Jaribu kifikio katika uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `DATA`, Baiti 32 - Heshi ya kitalu.
2. `QUANTITY` - Nafasi ya faharisi ya mjomba.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Hurejesha**
Tazama [eth_getBlockByHash](#eth-getblockbyhash)

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Kwa matokeo tazama [eth_getBlockByHash](#eth-getblockbyhash)

**Kumbuka**: Mjomba hauna miamala mmojammoja.

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

Hurejesha maelezo kuhusu mjomba wa kitalu kwa nambari na nafasi ya faharisi ya mjomba.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Jaribu kifikio kwenye uwanja wa majaribio
</ButtonLink>

**Vigezo**

1. `QUANTITY|TAG` - nambari ya kitalu, au mfuatano `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, kama ilivyo katika [kigezo cha kitalu](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - nafasi ya faharisi ya mjomba.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Hurejesha**
Tazama [eth_getBlockByHash](#eth-getblockbyhash)

**Kumbuka**: Mjomba hana miamala ya kibinafsi.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Kwa matokeo tazama [eth_getBlockByHash](#eth-getblockbyhash)

### eth_newFilter {#eth-newfilter}

Huunda kipengee cha kichujio, kulingana na chaguo za kichujio, ili kuarifu wakati hali inabadilika (logi).
Ili kuangalia ikiwa hali imebadilika, piga [eth_getFilterChanges](#eth-getfilterchanges).

**Dokezo kuhusu kubainisha vichujio vya mada:**
Mada hutegemea mpangilio. Muamala ulio na logi yenye mada [A, B] utalinganishwa na vichujio vifuatavyo vya mada:

- `[]` "chochote"
- `[A]` "A katika nafasi ya kwanza (na chochote kinachofuata)"
- `[null, B]` "chochote katika nafasi ya kwanza NA B katika nafasi ya pili (na chochote kinachofuata)"
- `[A, B]` "A katika nafasi ya kwanza NA B katika nafasi ya pili (na chochote kinachofuata)"
- `[[A, B], [A, B]]` "(A AU B) katika nafasi ya kwanza NA (A AU B) katika nafasi ya pili (na chochote kinachofuata)"
- **Vigezo**

1. `Object` - Chaguo za kichujio:

- `fromBlock`: `QUANTITY|TAG` - (si lazima, chaguo-msingi: `"latest"`) Nambari kamili ya kitalu, au `"latest"` kwa kitalu cha mwisho kilichopendekezwa, `"safe"` kwa kitalu salama cha hivi punde, `"finalized"` kwa kitalu cha hivi punde kilichokamilishwa, au `"pending"`, `"earliest"` kwa miamala ambayo bado haipo kwenye kitalu.
- `toBlock`: `QUANTITY|TAG` - (si lazima, chaguo-msingi: `"latest"`) Nambari kamili ya kitalu, au `"latest"` kwa kitalu cha mwisho kilichopendekezwa, `"safe"` kwa kitalu salama cha hivi punde, `"finalized"` kwa kitalu cha hivi punde kilichokamilishwa, au `"pending"`, `"earliest"` kwa miamala ambayo bado haipo kwenye kitalu.
- `address`: `DATA|Array`, Baiti 20 - (si lazima) Anwani ya mkataba au orodha ya anwani ambazo logi zinapaswa kutoka.
- `topics`: `Array of DATA`, - (si lazima) Safu ya Baiti 32 `DATA` mada. Mada hutegemea mpangilio. Kila mada inaweza pia kuwa safu ya DATA yenye chaguo za "au".

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

**Inarejesha**
`QUANTITY` - Kitambulisho cha kichujio.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

Huunda kichujio katika nodi, ili kutoa arifa wakati kitalu kipya kinapowasili.
Ili kuangalia ikiwa hali imebadilika, ita [eth_getFilterChanges](#eth-getfilterchanges).

**Vigezo**
Hakuna

**Inarejesha**
`QUANTITY` - Kitambulisho cha kichujio.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

Huunda kichujio katika nodi, ili kutoa arifa wakati miamala mipya inayosubiri inapowasili.
Ili kuangalia ikiwa hali imebadilika, ita [eth_getFilterChanges](#eth-getfilterchanges).

**Vigezo**
Hakuna

**Inarejesha**
`QUANTITY` - Kitambulisho cha kichujio.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

Huondoa kichujio chenye kitambulisho kilichotolewa. Inapaswa kuitwa kila wakati uangalizi hauhitajiki tena.
Zaidi ya hayo, Vichujio huisha muda wake visipoombwa na [eth_getFilterChanges](#eth-getfilterchanges) kwa muda fulani.

**Vigezo**

1. `QUANTITY` - Kitambulisho cha kichujio.

```js
params: [
  "0xb", // 11
]
```

**Inarejesha**
`Boolean` - `true` ikiwa kichujio kiliondolewa kikamilifu, vinginevyo `false`.

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

Mbinu ya kuchunguza kichujio, ambayo hurejesha safu ya logi zilizotokea tangu uchunguzi wa mwisho.

**Vigezo**

1. `QUANTITY` - kitambulisho cha kichujio.

```js
params: [
  "0x16", // 22
]
```

**Inarejesha**
`Array` - Safu ya vipengee vya logi, au safu tupu ikiwa hakuna kilichobadilika tangu uchunguzi wa mwisho.

- Kwa vichujio vilivyoundwa na `eth_newBlockFilter` kinachorejeshwa ni heshi za kitalu (`DATA`, Baiti 32), k.m., `["0x3454645634534..."]`.
- Kwa vichujio vilivyoundwa na `eth_newPendingTransactionFilter ` kinachorejeshwa ni heshi za muamala (`DATA`, Baiti 32), k.m., `["0x6345343454645..."]`.
- Kwa vichujio vilivyoundwa na `eth_newFilter` logi ni vipengee vyenye vigezo vifuatavyo:
  - `removed`: `TAG` - `true` wakati logi ilipoondolewa, kutokana na upangaji upya wa mnyororo. `false` ikiwa ni logi halali.
  - `logIndex`: `QUANTITY` - nambari kamili ya nafasi ya faharisi ya logi katika kitalu. `null` wakati ni logi inayosubiri.
  - `transactionIndex`: `QUANTITY` - nambari kamili ya nafasi ya faharisi ya miamala ambapo logi iliundwa. `null` wakati ni logi inayosubiri.
  - `transactionHash`: `DATA`, Baiti 32 - heshi ya miamala ambapo logi hii iliundwa. `null` wakati ni logi inayosubiri.
  - `blockHash`: `DATA`, Baiti 32 - heshi ya kitalu ambapo logi hii ilikuwepo. `null` wakati inasubiri. `null` wakati ni logi inayosubiri.
  - `blockNumber`: `QUANTITY` - nambari ya kitalu ambapo logi hii ilikuwepo. `null` wakati inasubiri. `null` wakati ni logi inayosubiri.
  - `address`: `DATA`, Baiti 20 - anwani ambapo logi hii ilitoka.
  - `data`: `DATA` - data ya logi isiyo na faharisi yenye urefu unaobadilika. (Katika _Solidity_: hoja sifuri au zaidi za logi zisizo na faharisi za Baiti 32.)
  - `topics`: `Array of DATA` - Safu ya 0 hadi 4 ya Baiti 32 `DATA` za hoja za logi zenye faharisi. (Katika _Solidity_: Mada ya kwanza ni _heshi_ ya sahihi ya tukio (k.m., `Deposit(address,bytes32,uint256)`), isipokuwa ulitangaza tukio kwa kibainishi cha `anonymous`.)

- **Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result
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

### eth_getFilterLogs {#eth-getfilterlogs}

Hurejesha safu ya logi zote zinazolingana na kichujio chenye id iliyotolewa.

**Vigezo**

1. `QUANTITY` - Id ya kichujio.

```js
params: [
  "0x16", // 22
]
```

**Hurejesha**
Tazama [eth_getFilterChanges](#eth-getfilterchanges)

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Matokeo tazama [eth_getFilterChanges](#eth-getfilterchanges)

### eth_getLogs {#eth-getlogs}

Hurejesha safu ya logi zote zinazolingana na kipengee cha kichujio kilichotolewa.

**Vigezo**

1. `Object` - Chaguo za kichujio:

- `fromBlock`: `QUANTITY|TAG` - (si lazima, chaguo-msingi: `"latest"`) Nambari kamili ya kitalu, au `"latest"` kwa kitalu cha mwisho kilichopendekezwa, `"safe"` kwa kitalu salama cha hivi punde, `"finalized"` kwa kitalu cha hivi punde kilichokamilishwa, au `"pending"`, `"earliest"` kwa miamala ambayo bado haipo kwenye kitalu.
- `toBlock`: `QUANTITY|TAG` - (si lazima, chaguo-msingi: `"latest"`) Nambari kamili ya kitalu, au `"latest"` kwa kitalu cha mwisho kilichopendekezwa, `"safe"` kwa kitalu salama cha hivi punde, `"finalized"` kwa kitalu cha hivi punde kilichokamilishwa, au `"pending"`, `"earliest"` kwa miamala ambayo bado haipo kwenye kitalu.
- `address`: `DATA|Array`, Baiti 20 - (si lazima) Anwani ya mkataba au orodha ya anwani ambazo logi zinapaswa kutoka.
- `topics`: `Array of DATA`, - (si lazima) Safu ya mada za `DATA` za Baiti 32. Mada zinategemea mpangilio. Kila mada inaweza pia kuwa safu ya DATA yenye chaguo za "au".
- `blockHash`: `DATA`, Baiti 32 - (si lazima, **ya baadaye**) Pamoja na nyongeza ya EIP-234, `blockHash` itakuwa chaguo jipya la kichujio ambalo huzuia logi zinazorejeshwa kwenye kitalu kimoja chenye heshi ya baiti 32 `blockHash`. Kutumia `blockHash` ni sawa na `fromBlock` = `toBlock` = nambari ya kitalu yenye heshi `blockHash`. Ikiwa `blockHash` ipo kwenye vigezo vya kichujio, basi `fromBlock` wala `toBlock` haziruhusiwi.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Hurejesha**
Tazama [eth_getFilterChanges](#eth-getfilterchanges)

**Mfano**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Kwa matokeo tazama [eth_getFilterChanges](#eth-getfilterchanges)

## Mfano wa Matumizi {#usage-example}

### Kusambaza mkataba kwa kutumia JSON_RPC {#deploying-contract}

Sehemu hii inajumuisha onyesho la jinsi ya kusambaza mkataba kwa kutumia kiolesura cha RPC pekee. Kuna njia mbadala za kusambaza mikataba ambapo ugumu huu unafichwa—kwa mfano, kutumia maktaba zilizojengwa juu ya kiolesura cha RPC kama vile [web3.js](https://web3js.readthedocs.io/) na [web3.py](https://github.com/ethereum/web3.py). Ufichaji huu kwa ujumla ni rahisi kueleweka na hauna uwezekano mkubwa wa makosa, lakini bado ni muhimu kuelewa jinsi inavyofanya kazi kiufundi.

Ufuatao ni mkataba mahiri wa moja kwa moja unaoitwa `Multiply7` ambao utasambazwa kwa kutumia kiolesura cha JSON-RPC kwenye nodi ya Ethereum. Mafunzo haya yanachukulia kuwa msomaji tayari anaendesha nodi ya Geth. Maelezo zaidi kuhusu nodi na wateja yanapatikana [hapa](/developers/docs/nodes-and-clients/run-a-node). Tafadhali rejelea nyaraka za kila [kiteja](/developers/docs/nodes-and-clients/) ili kuona jinsi ya kuanzisha HTTP JSON-RPC kwa viteja ambavyo si vya Geth. Viteja vingi kwa chaguo-msingi huhudumia kwenye `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Jambo la kwanza kufanya ni kuhakikisha kiolesura cha HTTP RPC kimewezeshwa. Hii inamaanisha tunaipa Geth alama ya `--http` wakati wa kuanza. Katika mfano huu tunatumia nodi ya Geth kwenye mnyororo wa kibinafsi wa maendeleo. Kwa kutumia mbinu hii hatuhitaji Etha kwenye mtandao halisi.

```bash
geth --http --dev console 2>>geth.log
```

Hii itaanzisha kiolesura cha HTTP RPC kwenye `http://localhost:8545`.

Tunaweza kuthibitisha kuwa kiolesura kinafanya kazi kwa kupata anwani ya Coinbase (kwa kupata anwani ya kwanza kutoka kwenye orodha ya akaunti) na salio kwa kutumia [curl](https://curl.se). Tafadhali kumbuka kuwa data katika mifano hii itatofautiana kwenye nodi yako ya ndani. Ikiwa unataka kujaribu amri hizi, badilisha vigezo vya ombi katika ombi la pili la curl na matokeo yaliyorejeshwa kutoka kwa la kwanza.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Kwa sababu nambari zimesimbwa kwa heksadesimali, salio hurejeshwa katika Wei kama mfuatano wa heksadesimali. Ikiwa tunataka kuwa na salio katika Etha kama nambari tunaweza kutumia web3 kutoka kwenye kiweko cha Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Kwa kuwa sasa kuna Etha kwenye mnyororo wetu wa kibinafsi wa maendeleo, tunaweza kusambaza mkataba. Hatua ya kwanza ni kukusanya mkataba wa Multiply7 kuwa msimbo wa baiti ambao unaweza kutumwa kwa EVM. Ili kusakinisha solc, kikusanyaji cha Solidity, fuata [nyaraka za Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Unaweza kutaka kutumia toleo la zamani la `solc` ili lilingane na [toleo la kikusanyaji lililotumika kwa mfano wetu](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Hatua inayofuata ni kukusanya mkataba wa Multiply7 kuwa msimbo wa baiti ambao unaweza kutumwa kwa EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Kwa kuwa sasa tuna msimbo uliokusanywa tunahitaji kubaini ni kiasi gani cha gesi kinagharimu kuusambaza. Kiolesura cha RPC kina mbinu ya `eth_estimateGas` ambayo itatupa makadirio.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Na hatimaye kusambaza mkataba.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Muamala unakubaliwa na nodi na heshi ya muamala inarejeshwa. Heshi hii inaweza kutumika kufuatilia muamala. Hatua inayofuata ni kubaini anwani ambapo mkataba wetu umesambazwa. Kila muamala uliotekelezwa utaunda stakabadhi. Stakabadhi hii ina taarifa mbalimbali kuhusu muamala kama vile muamala ulijumuishwa katika kitalu kipi na ni kiasi gani cha gesi kilitumiwa na EVM. Ikiwa muamala unaunda mkataba pia utakuwa na anwani ya mkataba. Tunaweza kupata stakabadhi kwa kutumia mbinu ya RPC ya `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Mkataba wetu uliundwa kwenye `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Matokeo tupu badala ya stakabadhi inamaanisha muamala haujajumuishwa kwenye kitalu bado. Subiri kwa muda na uangalie ikiwa mteja wa mwafaka wako unafanya kazi na ujaribu tena.

#### Kuingiliana na mikataba mahiri {#interacting-with-smart-contract}

Katika mfano huu tutakuwa tunatuma muamala kwa kutumia `eth_sendTransaction` kwenye mbinu ya `multiply` ya mkataba.

`eth_sendTransaction` inahitaji hoja kadhaa, haswa `from`, `to` na `data`. `From` ni anwani ya umma ya akaunti yetu, na `to` ni anwani ya mkataba. Hoja ya `data` ina mzigo unaofafanua ni mbinu gani lazima iitwe na kwa hoja zipi. Hapa ndipo [ABI (kiolesura cha mfumo wa jozi cha programu)](https://docs.soliditylang.org/en/latest/abi-spec.html) inapotumika. ABI ni faili la JSON ambalo linafafanua jinsi ya kufafanua na kusimba data kwa ajili ya EVM.

Baiti za mzigo hufafanua ni mbinu gani katika mkataba inaitwa. Hizi ni baiti 4 za kwanza kutoka kwenye heshi ya Keccak juu ya jina la utendakazi na aina zake za hoja, zilizosimbwa kwa heksadesimali. Utendakazi wa kuzidisha unakubali uint ambayo ni jina mbadala la uint256. Hii inatuacha na:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Hatua inayofuata ni kusimba hoja. Kuna uint256 moja tu, tuseme, thamani ya 6. ABI ina sehemu inayobainisha jinsi ya kusimba aina za uint256.

`int<M>: enc(X)` ni usimbaji wa kianzia-kikubwa wa kikamilisho cha mbili cha X, kilichojazwa upande wa mpangilio wa juu (kushoto) na 0xff kwa X hasi na kwa baiti > sifuri kwa X chanya ili urefu uwe kizidisho cha baiti 32.

Hii inasimbwa kuwa `0000000000000000000000000000000000000000000000000000000000000006`.

Kwa kuchanganya kiteuzi cha utendakazi na hoja iliyosimbwa data yetu itakuwa `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Hii sasa inaweza kutumwa kwa nodi:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Kwa kuwa muamala ulitumwa, heshi ya muamala ilirejeshwa. Kupata stakabadhi kunatoa:

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

Stakabadhi ina logi. Logi hii ilizalishwa na EVM wakati wa utekelezaji wa muamala na kujumuishwa kwenye stakabadhi. Utendakazi wa `multiply` unaonyesha kuwa tukio la `Print` liliibuliwa na ingizo mara 7. Kwa kuwa hoja ya tukio la `Print` ilikuwa uint256 tunaweza kuisimbua kulingana na sheria za ABI ambazo zitatupa desimali 42 inayotarajiwa. Mbali na data inafaa kuzingatia kuwa mada zinaweza kutumika kubaini ni tukio gani liliunda logi:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Huu ulikuwa utangulizi mfupi tu wa baadhi ya kazi za kawaida, ukionyesha matumizi ya moja kwa moja ya JSON-RPC.

## Mada zinazohusiana {#related-topics}

- [Uainisho wa JSON-RPC](https://www.jsonrpc.org/specification)
- [Nodi na viteja](/developers/docs/nodes-and-clients/)
- [API za JavaScript](/developers/docs/apis/javascript/)
- [API za Backend](/developers/docs/apis/backend/)
- [Viteja vya utekelezaji](/developers/docs/nodes-and-clients/#execution-clients)
