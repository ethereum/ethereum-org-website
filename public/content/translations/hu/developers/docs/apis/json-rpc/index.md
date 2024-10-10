---
title: JSON-RPC API
description: Egy státuszmentes, könnyű remote procedure call (RPC) protokoll az Ethereum-kliensekhez.
lang: hu
---

Ahhoz, hogy egy szoftveralkalmazás interakcióba lépjen az Ethereum blokklánccal –a blokkláncadatokat olvasva vagy tranzakciókat küldve a hálózatra –, rá kell csatlakoznia egy Ethereum-csomópontra.

Ebből a célból minden [Ethereum-kliens](/developers/docs/nodes-and-clients/#execution-clients) implementálja a [JSON-RPC specifikációt](https://github.com/ethereum/execution-apis), így az alkalmazások egységesen egyféle metóduscsomagra támaszkodhatnak, függetlenül az adott csomópont vagy kliens fajtájától.

A [JSON-RPC](https://www.jsonrpc.org/specification) egy státuszmentes, könnyű remote procedure call (RPC) protokoll. Számos adatstruktúrát, valamint ezek feldolgozásának szabályait is meghatározza. Ez a megoldás nem függ az átadási módoktól, mivel a koncepciókat használni lehet ugyanabban a folyamatban, socketeknél, HTTP-vel és számos más üzenetküldő környezetben. Az adatformátum JSON (RFC 4627).

## Kliensimplementációk {#client-implementations}

Az Ethereum-kliensek mindegyike használhat különböző programozási nyelveket, amikor a JSON-RPC specifikációt implementálja. Tekintse meg az egyéni [kliensdokumentációt](/developers/docs/nodes-and-clients/#execution-clients) további részletekért a specifikus programozási nyelvekről. Érdemes megnézni a kliensdokumentációt a legutóbbi API-támogatási információ miatt is.

## Kényelmi könyvtárak {#convenience-libraries}

Választhatja, hogy az Ethereum-kliensekkel közvetlenül kapcsolódik a JSON-RPC API révén, de az alkalmazásfejlesztők rendelkezésére állnak egyszerűbb opciók is. Számos [JavaScript](/developers/docs/apis/javascript/#available-libraries) és [backend API](/developers/docs/apis/backend/#available-libraries) könyvtár létezik, hogy a JSON-RPC API tetejére egy wrappert (burkoló réteget) adjon. Ezekkel a könyvtárakkal a fejlesztők intuitív, egysoros metódusokat írhatnak, hogy JSON-RPC-kérést kezdeményezzenek (a háttérben), amely interakcióba lép az Ethereummal.

## Konszenzusos kliens API-k {#consensus-clients}

Ez az írás főleg a JSON-RPC API-val foglalkozik, melyet az Ethereum végrehajtási kliensei használnak. Ugyanakkor a konszenzusos klienseknek is van egy RPC API-ja, amellyel a felhasználók lekérhetnek információkat a csomópontról, Beacon-blokkokról, Beacon-státuszokról és más konszenzussal kapcsolatos adatokról közvetlenül a csomópontról. Ez az API a [Beacon API honlapon](https://ethereum.github.io/beacon-APIs/#/) van dokumentálva.

Egy belső API-t használnak a kliensek közötti kommunikációra a csomóponton belül, így a konszenzusos kliens és a végrehajtási kliens képes adatot cserélni. Ezt nevezik Motor API-nak, amelynek specifikációja a [GitHubon](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) érhető el.

## Végrehajtási kliens specifikációi {#spec}

[Tekintse meg a teljes JSON-RPC API specifikációt a GitHubon](https://github.com/ethereum/execution-apis). Ez az API a [Végrehajtási API oldalon](https://ethereum.github.io/execution-apis/api-documentation/) van dokumentálva, és tartalmaz egy ellenőrt, hogy a rendelkezésre álló metódusokat ki lehessen próbálni.

## Egyezmények {#conventions}

### Hexadecimális értékű kódolás {#hex-encoding}

Két fontos adattípus megy át a JSON-ön: formázatlan bájttömbök és mennyiségek. Mindkettő hexadecimális kódolásban van elküldve, de más a formázási követelmény.

#### Mennyiségek {#quantities-encoding}

A mennyiségek (egész számok, számok) kódolásánál: hexadecimálisban, „0x” előtaggal, a legtömörebb kifejeződésben kell kódolni (kivéve a nullát, mert az „0x0” lesz).

Néhány példa:

- 0x41 (65 decimálisban)
- 0x400 (1024 decimálisban)
- HELYTELEN: 0x (legalább egy számjegy még szükséges, a nulla írása „0x0”)
- HELYTELEN: 0x0400 (nem kezdődhet nullával a szám)
- HELYTELEN: ff (a 0x előtagot ki kell tenni)

### Formázatlan adat {#unformatted-data-encoding}

Amikor formázatlan adatot (bájtsorok, számlacímek, hashek, bájtkódtömbök) kell kódolni: hexadecimálisban, „0x” előtaggal, két hex számjegy bájtonként.

Néhány példa:

- 0x41 (1-es méret, „A”)
- 0x004200 (3-as méret, „0B0”)
- 0x (size 0, "")
- HELYTELEN: 0xf0f0f (páros számú kell legyen)
- HELYTELEN: 004200 (a 0x előtagot ki kell tenni)

### Az alapértelmezett blokkparaméter {#default-block}

A következő metódusok egy extra alapértelmezett blokkparaméterrel rendelkeznek:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Amikor az Ethereum státuszát érintő kérések érkeznek, akkor a legutolsó alapértelmezett blokkparaméter határozza meg a blokk méretét.

A defaultBlock paraméter a következők lehetnek:

- `HEX String` – egy egész szám mint blokkszám
- `String "earliest"` – a legkorábbi/genezis blokk
- `String "latest"` – a legutóbb javasolt blokk
- `String "safe"` – a blokk legutóbbi biztonságos feje
- `String "finalized"` – a legutóbbi véglegesedett blokk
- `String "pending"` – a függőben lévő státusz/tranzakciók esetében

## Példák

Ebben a leírásban példákat mutatunk be, hogyan lehet használni az egyéni JSON_RPC API végpontokat a parancssoreszközzel, ami a [curl](https://curl.se). Ezek az egyéni végpontpéldák a [Curl példák](#curl-examples) szekciókban találhatók alább. Ezek után bemutatunk egy [példát az elejétől a végéig](#usage-example) egy okosszerződés átfordítására és telepítésére egy Geth csomópont, a JSON_RPC API és a curl használatával.

## Példák a curlre {#curl-examples}

Alább láthatók azok a példák, amikor a JSON_RPC API-t használjuk egy [curl](https://curl.se) kérést létrehozva egy Ethereum-csomópontnak. Minden példa tartalmazza az adott végpont specifikációit, paramétereit, visszatérési típusát és egy működő példát arról, hogyan kell használni.

A curl-kérések hibát adhatnak vissza a tartalom típusa miatt. Ennek az az oka, hogy a `--data` opció beállítja a tartalomtípust `application/x-www-form-urlencoded` értékre. Ha az Ön által használt csomópontnak ez nem tetszik, akkor manuálisa állítsa át a fejlécet, hogy a `-H "Content-Type: application/json"` a hívás elején legyen. A példák nem tartalmazzák az URL/IP és port kombinációját, amit a curl utolsó változójaként kell megadni (például `127.0.0.1:8545`). Egy komplett curl-kérés, amely ezeket a plusz adatokat is tartalmazza, így néz ki:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Pletyka, státusz, előzményadatok {#gossip-state-history}

Néhány központi JSON-RPC metódushoz szükség van az Ethereum hálózati adataira, amelyek általában háromfélék lehetnek: _Pletyka, státusz és előzményadatok_. Az ebben a részben található hivatkozások segítségével az adott metódusra tud lépni, de a tartalomjegyzéket is használhatja a metódusok teljes listájának megtekintéséhez.

### Pletyka metódusok {#gossip-methods}

> Ezek a metódusok a lánc fejét követik nyomon. Így kerülnek be tranzakciók a hálózatra, találják meg az útjukat a blokkokba, és az, a kliensek így szereznek tudomást az új blokkokról.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Státusz metódusok {#state_methods}

> Olyan metódusok, melyek az összes tárolt adat jelenlegi státuszát riportálják. A „státusz” olyan, akár egy nagy, megosztott RAM rész, ami számlaegyenlegeket, szerződésadatokat és gázbecsléseket tartalmaz.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Előzményadatok metódusok {#history_methods}

> Minden egyes blokkból képes előzményadatokat lekérni egészen a genezisig. Olyan mint egy hatalmas, egyre bővülő fájl, amely tartalmazza az összes blokkfejlécet, blokkadatot, a szülőblokk testvérblokkjait (ommer/uncle) és a tranzakció-visszaigazolásokat.

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

## JSON-RPC API próbafelület

Az API-módszerek felfedezéséhez és kipróbálásához használhatja a [próbaeszközt](https://ethereum-json-rpc.com). Azt is megmutatja, hogy a különböző csomópontszolgáltatók milyen metódusokat és hálózatokat támogatnak.

## JSON-RPC API metódusok {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Visszaadja a jelenlegi kliensverziót.

**Paraméterek**

Egyik sem

**Visszaad**

`String` – A jelenlegi kliensverzió

**Példa**

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

### web3_sha3 {#web3_sha3}

Visszaadja az adott adat keccak-256 szerinti értékét (_nem_ a szabványosított SHA3-256 szerintit).

**Paraméterek**

1. `DATA` – Az adatok átkonvertálva SHA3 hash formátumba

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Visszaad**

`DATA` – Az adott sztring SHA3-eredménye.

**Példa**

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

### net_version {#net_version}

Visszaadja a jelenlegi hálózati azonosítót.

**Paraméterek**

Egyik sem

**Visszaad**

`String` – Jelenlegi hálózati azonosító.

A jelenlegi hálózati azonosítók teljes listája a [chainlist.org](https://chainlist.org) oldalon érhető el. Néhány jellemző példa:

- `1`: Ethereum főhálózata
- `5`: Goerli teszthálózat
- `11155111`: Sepolia teszthálózat

**Példa**

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

### net_listening {#net_listening}

A `true` értéket adja vissza, ha a kliens aktívan hallgatja a hálózati kapcsolatokat.

**Paraméterek**

Egyik sem

**Visszaad**

`Boolean` – `true`, amikor hallgatja, máskülönben `false`.

**Példa**

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

### net_peerCount {#net_peercount}

Visszaadja a társak számát, amelyek jelenleg a klienshez kapcsolódnak.

**Paraméterek**

Egyik sem

**Visszaad**

`QUANTITY` – a kapcsolódó társak száma egész számként.

**Példa**

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

### eth_protocolVersion {#eth_protocolversion}

A jelenlegi Ethereum-protokollverziót adja vissza. Vegye figyelembe, hogy ez a metódus [a Geth-ben nem érhető el](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Paraméterek**

Egyik sem

**Visszaad**

`String` – Az Ethereum jelenlegi protokollverziója

**Példa**

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

### eth_syncing {#eth_syncing}

Egy objektumot ad vissza a szinkronizálási státuszról szóló adattal vagy `false`.

**Paraméterek**

Egyik sem

**Visszaad**

A pontos visszakapott adat a kliensimplementációk szerint változik. Minden kliens `false` értéket küld, amikor a csomópont nem szinkronizál, és mindegyik elküldi a következő mezőket.

`Object|Boolean`, egy objektum a szinkronizálási státuszról szóló adattal vagy `false`, amikor nem szinkronizál:

- `startingBlock`: `QUANTITY` – Az a blokk, amelynél az importálása kezdődött (csak akkor lesz visszaállítva, miután a szinkronizálás elérte a fejet)
- `currentBlock`: `QUANTITY` – A jelenlegi blokk, azonos az eth_blockNumber mezővel
- `highestBlock`: `QUANTITY` – A becsült legnagyobb számú blokk

Ugyanakkor az egyéni kliensek további adatokat is adhatnak. A Geth például ezt küldi vissza:

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

Amíg a Besu ezt küldi vissza:

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

Tekintse meg az adott kliens dokumentációját a további adatokért.

**Példa**

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

### eth_coinbase {#eth_coinbase}

A kliens coinbase-címét adja vissza.

**Paraméterek**

Egyik sem

**Visszaad**

`DATA`, 20 bájt – a jelenlegi coinbase címe.

**Példa**

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

### eth_chainId {#eth_chainId}

Visszaadja a láncazonosítót, amellyel az újrajátszástól védett tranzakciókat írják alá.

**Paraméterek**

Egyik sem

**Visszaad**

`chainId`, hexadecimális érték mint sztring, amely a jelenlegi láncazonosítót mutatja egész számként.

**Példa**

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

### eth_mining {#eth_mining}

A visszaadott érték `true`, ha a kliens aktívan bányászik új blokkokat. Ez csak proof-of-work hálózatok esetén küld vissza `true` értéket, és talán a [egyesítés (Merge)](/roadmap/merge/) óta nincs is benne minden kliensben.

**Paraméterek**

Egyik sem

**Visszaad**

`Boolean` – `true` értéket ad vissza, ha a kliens bányászik, különben `false`.

**Példa**

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

### eth_hashrate {#eth_hashrate}

Visszaadja a hashek számát másodpercenként, amellyel a csomópont a bányászatot végzi. Ez csak proof-of-work hálózatok esetén küld vissza `true` értéket, és talán a [egyesítés (Merge)](/roadmap/merge/) óta nincs is benne minden kliensben.

**Paraméterek**

Egyik sem

**Visszaad**

`QUANTITY` – hashek száma másodpercenként.

**Példa**

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

### eth_gasPrice {#eth_gasprice}

Visszaadja a jelenlegi becsült gázárat wei-ben. Például a Besu kliens megvizsgálja az utolsó 100 blokkot, és a gáz egységárának mediánját küldi vissza alapból.

**Paraméterek**

Egyik sem

**Visszaad**

`QUANTITY` – a jelenlegi gázár wei-ben egész számként.

**Példa**

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

### eth_accounts {#eth_accounts}

A kliens által birtokolt címek listáját adja vissza.

**Paraméterek**

Egyik sem

**Visszaad**

`Array of DATA`, 20 bájt – a kliens által birtokolt címek.

**Példa**

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

### eth_blockNumber {#eth_blocknumber}

A legutóbbi blokk számát adja vissza.

**Paraméterek**

Egyik sem

**Visszaad**

`QUANTITY` – a legutóbbi blokk száma egész számként, amelynél a kliens tart.

**Példa**

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

### eth_getBalance {#eth_getbalance}

Az adott cím számlaegyenlegét adja vissza.

**Paraméterek**

1. `DATA`, 20 bájt – cím, melynek az egyenlegét ellenőrizzük.
2. `QUANTITY|TAG` – a blokk száma egész számként, vagy a `„latest”`, `„earliest”`, `„pending”`, `„safe”` vagy `„finalized”` sztringek – nézze meg az [alapértelmezett blokkparamétereket](/developers/docs/apis/json-rpc/#default-block)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Visszaad**

`QUANTITY` – a jelenlegi egyenleg wei-ben egész számként.

**Példa**

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

### eth_getStorageAt {#eth_getstorageat}

Egy adott címen lévő tárhely pozícióját adja vissza.

**Paraméterek**

1. `DATA`, 20 bájt – a tárhely címe.
2. `QUANTITY` – a tárhelyben lévő pozíció egész számként.
3. `QUANTITY|TAG` – a blokk száma egész számként, vagy a `„latest”`, `„earliest”`, `„pending”`, `„safe”` vagy `„finalized”` sztringek – nézze meg az [alapértelmezett blokkparamétereket](/developers/docs/apis/json-rpc/#default-block)

**Visszaad**

`DATA` – az adott tárhelypozíció értéke.

**Példa** Kiszámolja a pontos pozíciót, a visszakapott tárhely függvényében. Vegyük a következő szerződést, ami itt van telepítve: `0x295a70b2de5e3953354a6a8344e616ed314d7251`, ezzel a címmel:`0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

A pos0 érték megszerzése egyértelmű:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

A térkép egyik elemének megszerzése már nehezebb. A térképen egy elem pozícióját így kalkuláljuk:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Ahhoz, hogy megszerezzük a tárhelyet a pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] tekintetében, a pozíciót így kell kalkulálni:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

A web3-könyvtárban található Geth konzolt lehet használni a kalkulációhoz:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Most pedig a tárhely megszerzése:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Visszaadja a tranzakciók számát, amelyeket egy adott címről _küldtek_.

**Paraméterek**

1. `DATA`, 20 bájt – cím.
2. `QUANTITY|TAG` – a blokk száma egész számként, vagy a `„latest”`, `„earliest”`, `„pending”`, `„safe”` vagy `„finalized”` sztringek – nézze meg az [alapértelmezett blokkparamétereket](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**Visszaad**

`QUANTITY` – a tranzakciók száma egész számként, amit erről a címről küldtek.

**Példa**

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

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Visszaadja a tranzakciók számát egy blokkban, egy olyan blokkból, mely egyezik a megadott blokkhashsel.

**Paraméterek**

1. `DATA`, 32 bájt – blokkhash

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Visszaad**

`QUANTITY` – ebben a blokkban lévő tranzakciók száma egész számként.

**Példa**

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

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Visszaadja a tranzakciók számát egy blokkban, amely az adott blokkszámnak felel meg.

**Paraméterek**

1. `QUANTITY|TAG` – a blokk száma egész számként, vagy a `„latest”`, `„earliest”`, `„pending”`, `„safe”` vagy `„finalized”` sztringek az [alapértelmezett blokkparaméterek](/developers/docs/apis/json-rpc/#default-block) szerint.

```js
params: [
  "0x13738ca", // 20396234
]
```

**Visszaad**

`QUANTITY` – ebben a blokkban lévő tranzakciók száma egész számként.

**Példa**

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

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Visszaadja az uncle-blokkok számát egy olyan blokkból, ami a blokkhashnek megfelel.

**Paraméterek**

1. `DATA`, 32 bájt – blokkhash

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Visszaad**

`QUANTITY` – ebben a blokkban az uncle-blokkok száma egész számként.

**Példa**

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

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Visszaadja az uncle-blokkok számát egy olyan blokkból, ami egy adott blokkszámnak megfelel.

**Paraméterek**

1. `QUANTITY|TAG` – a blokk száma egész számként, vagy a `„latest”`, `„earliest”`, `„pending”`, `„safe”` vagy `„finalized”` sztringek – nézze meg az [alapértelmezett blokkparamétereket](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xe8", // 232
]
```

**Visszaad**

`QUANTITY` – ebben a blokkban az uncle-blokkok száma egész számként.

**Példa**

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

### eth_getCode {#eth_getcode}

Visszaadja az adott címen lévő kódot.

**Paraméterek**

1. `DATA`, 20 bájt – cím
2. `QUANTITY|TAG` – a blokk száma egész számként, vagy a `„latest”`, `„earliest”`, `„pending”`, `„safe”` vagy `„finalized”` sztringek – nézze meg az [alapértelmezett blokkparamétereket](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Visszaad**

`DATA` – a kód az adott címről.

**Példa**

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

### eth_sign {#eth_sign}

Az aláírás metódus kikalkulál egy Ethereum-specifikus aláírást a következővel: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Ha az üzenethez egy előtagot adunk, akkor a kikalkulált aláírást úgy ismeri fel, mint Ethereum-specifikus aláírás. Ez megakadályozza a rosszhiszemű felhasználást, amikor egy támadó alkalmazás tetszőleges adatokat (például tranzakciókat) ír alá, és arra használja az aláírást, hogy megszemélyesítse áldozatát.

Megjegyzés: az aláíráshoz olyan cím kell, amely nincs zárolva.

**Paraméterek**

1. `DATA`, 20 bájt – cím
2. `DATA`, N bájt – az aláírandó üzenet

**Visszaad**

`DATA`: Aláírás

**Példa**

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

### eth_signTransaction {#eth_signtransaction}

Aláír egy olyan tranzakciót, amelyet egy későbbi időpontban be lehet küldeni a hálózatra az [eth_sendRawTransaction](#eth_sendrawtransaction) segítségével.

**Paraméterek**

1. `Object` – A tranzakcióobjektum

- `type`:
- `from`: `DATA`, 20 bájt – A cím, amelyről a tranzakció érkezett.
- `to`: `DATA`, 20 bájt – (opcionális új szerződés létrehozásakor) A tranzakció címzettjének címe.
- `gas`: `QUANTITY` – (opcionális, alapértelmezett: 90 000) A tranzakció végrehajtásához biztosított gáz egész számban megadva. Visszaküldi a fel nem használt gázt.
- `gasPrice`: `QUANTITY` – (opcionális, alapértelmezett: To-Be-Determined) a gasPrice (gázár) egész számként, ami a wei-ben fizetendő gázra vonatkozik.
- `value`: `QUANTITY` – (opcionális) a tranzakcióban küldött érték egész számként, wei-ben.
- `data`: `DATA` – A szerződés kódjának átfordítása VAGY a meghívott metódus aláírásának és kódolt paramétereinek a hashe.
- `nonce`: `QUANTITY` – (opcionális) A nonce egész számmal megadva. Ez lehetővé teszi a saját függőben lévő tranzakciók felülírását, amelyek ugyanazt a nonce-t használják.

**Visszaad**

`DATA`, Az RLP-kódolású tranzakcióobjektum, melyet a specifikus számla aláírt.

**Példa**

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

### eth_sendTransaction {#eth_sendtransaction}

Készít egy új üzenetküldési tranzakciót vagy szerződéslétrehozást, ha az adatmezőben kód van, és aláírja a `from` mezőben definiált számlával.

**Paraméterek**

1. `Object` – A tranzakcióobjektum

- `from`: `DATA`, 20 bájt – A cím, amelyről a tranzakció érkezett.
- `to`: `DATA`, 20 bájt – (opcionális új szerződés létrehozásakor) A tranzakció címzettjének címe.
- `gas`: `QUANTITY` – (opcionális, alapértelmezett: 90 000) A tranzakció végrehajtásához biztosított gáz egész számban megadva. Visszaküldi a fel nem használt gázt.
- `gasPrice`: `QUANTITY` – (opcionális, alapértelmezett: To-Be-Determined) a gasPrice (gázár) egész számként, ami a fizetendő gázra vonatkozik.
- `value`: `QUANTITY` – (opcionális) a tranzakcióban küldött érték egész számként.
- `input`: `DATA` – A szerződés kódjának átfordítása VAGY a meghívott metódus aláírásának és kódolt paramétereinek a hashe.
- `nonce`: `QUANTITY` – (opcionális) A nonce egész számmal megadva. Ez lehetővé teszi a saját függőben lévő tranzakciók felülírását, amelyek ugyanazt a nonce-t használják.

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

**Visszaad**

`DATA`, 32 bájt – a tranzakció hashe vagy a nulla hash, ha a tranzakció még nem elérhető.

Használja az [eth_getTransactionReceipt](#eth_gettransactionreceipt) parancsot, hogy megszerezze a szerződéscímet, miután a tranzakciót egy blokkban előterjesztették, és amikor létrehozta a szerződést.

**Példa**

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

### eth_sendRawTransaction {#eth_sendrawtransaction}

Egy új üzenetküldési tranzakciót vagy szerződéslétrehozást hoz létre az aláírt tranzakciókhoz.

**Paraméterek**

1. `DATA`, az aláírt tranzakciós adatok.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Visszaad**

`DATA`, 32 bájt – a tranzakció hashe vagy a nulla hash, ha a tranzakció még nem elérhető.

Használja az [eth_getTransactionReceipt](#eth_gettransactionreceipt) parancsot, hogy megszerezze a szerződéscímet, miután a tranzakciót egy blokkban előterjesztették, és amikor létrehozta a szerződést.

**Példa**

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

### eth_call {#eth_call}

Azonnal végrehajt egy új üzenethívást anélkül, hogy létrehozna egy tranzakciót a blokkláncon. Gyakran használják arra, hogy csak olvasási (read-only) okosszerződés-függvényeket hajtsanak végre, például a `balanceOf` kód egy ERC-20-as szerződésnél.

**Paraméterek**

1. `Object` – A tranzakcióhívás objektuma

- `from`: `DATA`, 20 bájt – (opcionális) A tranzakció küldőjének címe.
- `to`: `DATA`, 20 bájt – A tranzakció címzettjének címe.
- `gas`: `QUANTITY` – (opcionális) A tranzakció végrehajtásához adott gáz egész számként. Az eth_call nulla gázt fogyaszt, de néhány végrehajtásnak szüksége lehet rá.
- `gasPrice`: `QUANTITY` – (opcionális) a gasPrice (gázár) egész számként, ami a fizetendő gázra vonatkozik
- `value`: `QUANTITY` – (opcionális) a tranzakcióban küldött érték egész számként
- `input`: `DATA` – (opcionális) a metódus aláírásának és kódolt paramétereinek a hashe. A részletekért tekintse meg az [Ethereum-szerződés ABI-ját a Solidity dokumentációban](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` – a blokk száma egész számként, vagy a `„latest”`, `„earliest”`, `„pending”`, `„safe”` vagy `„finalized”` sztringek – nézze meg az [alapértelmezett blokkparamétereket](/developers/docs/apis/json-rpc/#default-block)

**Visszaad**

`DATA` – a végrehajtott szerződés visszatérési értéke.

**Példa**

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

### eth_estimateGas {#eth_estimategas}

Megbecsüli, hogy egy tranzakció végrehajtásához mennyi gázra lesz szükség. A tranzakció nem kerül hozzáadásra a blokklánchoz. Vegye figyelembe, hogy a becslés szignifikánsan több is lehet, mint amennyit elhasznál a tranzakció, melynek számos oka van, beleértve az EVM működési módját és a csomópontok teljesítményét.

**Paraméterek**

Nézze meg az [eth_call](#eth_call) paramétereit az összes opcionális paraméter kivételével. Ha nincs megadva gázkorlátozás, akkor a Geth a függőben lévő blokk gázkorlátozását használja felső értékként. Ennek eredményeként a visszakapott becslés talán nem elég a hívás/tranzakció végrehajtásához, amikor a gáz mennyisége magasabb, mint a függőben lévő blokk gázkorlátozása.

**Visszaad**

`QUANTITY` – a felhasznált gáz mennyisége.

**Példa**

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

### eth_getBlockByHash {#eth_getblockbyhash}

Egy blokkról ad információt hash alapján.

**Paraméterek**

1. `DATA`, 32 bájt – egy blokk hashe.
2. `Boolean` – Ha `true`, akkor visszaadja a teljes tranzakcióobjektumot, ha `false`, akkor csak a tranzakciók hashét.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Visszaad**

`Object` – Egy blokkobjektum, vagy `null`, amikor nem talál blokkot:

- `number`: `QUANTITY` – a blokkszám. `null`, amikor a blokk függőben van.
- `hash`: `DATA`, 32 bájt – a blokk hashe. `null`, amikor a blokk függőben van.
- `parentHash`: `DATA`, 32 bájt – a szülőblokk hashe.
- `nonce`: `DATA`, 8 bájt – a létrehozott proof-of-work hashe. `null`, amikor a blokk függőben van.
- `sha3Uncles`: `DATA`, 32 bájt – a blokkban lévő uncle blokkok SHA3-ja.
- `logsBloom`: `DATA`, 256 bájt – a bloom-szűrés a blokkok naplózására. `null`, amikor a blokk függőben van.
- `transactionsRoot`: `DATA`, 32 bájt – a blokk tranzakciós fájának a gyökere.
- `stateRoot`: `DATA`, 32 bájt – a blokk végső státuszfájának a gyökere.
- `receiptsRoot`: `DATA`, 32 bájt – a blokk visszaigazolás-fájának a gyökere.
- `miner`: `DATA`, 20 bájt – annak a címe, akinek a bányászati jutalom jár.
- `difficulty`: `QUANTITY` – erre a blokkra vonatkozó nehézség egész számként.
- `totalDifficulty`: `QUANTITY` – a lánc teljes nehézsége eddig a blokkig, egész számként.
- `extraData`: `DATA` – ennek a blokknak a „további adatok” mezője.
- `size`: `QUANTITY` – a blokk mérete bájtban, egész számként.
- `gasLimit`: `QUANTITY` – a maximálisan megengedett gáz ebben a blokkban.
- `gasUsed`: `QUANTITY` – a tranzakciók által elhasznált összes gáz ebben a blokkban.
- `timestamp`: `QUANTITY` – a unix időbélyege, amikor a blokkot összeállították.
- `transactions`: `Array` – Tranzakcióobjektumok tömbje, vagy 32 bájtos tranzakcióhashek az utolsó megadott paraméter alapján.
- `uncles`: `Array` – Az uncle hashek sora.

**Példa**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result
{
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

Egy blokkról ad információt a blokkszám alapján.

**Paraméterek**

1. `QUANTITY|TAG` – a blokk száma egész számként, vagy a `„latest”`, `„earliest”`, `„pending”`, `„safe”` vagy `„finalized”` sztringek az [alapértelmezett blokkparaméterek](/developers/docs/apis/json-rpc/#default-block) szerint.
2. `Boolean` – Ha `true`, akkor visszaadja a teljes tranzakcióobjektumot, ha `false`, akkor csak a tranzakciók hashét.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Visszaküldött információk** Nézze meg az [eth_getBlockByHash](#eth_getblockbyhash) résznél

**Példa**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Az eredményeket nézze meg az [eth_getBlockByHash](#eth_getblockbyhash) résznél

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Információt ad egy tranzakcióról a tranzakció hashe alapján.

**Paraméterek**

1. `DATA`, 32 bájt – tranzakció-hash

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Visszaad**

`Object` – Egy tranzakcióobjektum, vagy `null`, amikor nem talál tranzakciót:

- `blockHash`: `DATA`, 32 bájt – a blokk-hash, amelyben ez a tranzakció volt. `null`, amikor függőben van.
- `blockNumber`: `QUANTITY` – a blokkszám, amelyben ez a tranzakció volt. `null`, amikor függőben van.
- `from`: `DATA`, 20 bájt – a küldő címe.
- `gas`: `QUANTITY` – a küldő által adott gáz.
- `gasPrice`: `QUANTITY` – a küldő által megadott gázár wei-ben.
- `hash`: `DATA`, 32 bájt – a tranzakció hashe.
- `input`: `DATA` – a tranzakcióval együtt küldött adatok.
- `nonce`: `QUANTITY` – a tranzakciók száma, melyet a küldő az adott tranzakció előtt végzett.
- `to`: `DATA`, 20 bájt – a fogadó címe. `null`, amikor ez egy szerződéslétrehozó tranzakció.
- `transactionIndex`: `QUANTITY` – a tranzakcióindex pozíciója a blokkban, egész számként. `null`, amikor függőben van.
- `value`: `QUANTITY` – a küldött érték wei-ben.
- `v`: `QUANTITY` – ECDSA visszaállítási azonosító
- `r`: `QUANTITY` – ECDSA aláírás r
- `s`: `QUANTITY` – ECDSA aláírás s

**Példa**

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

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Egy tranzakcióról ad információt a blokk-hash és a tranzakcióindex pozíciója alapján.

**Paraméterek**

1. `DATA`, 32 bájt – egy blokk hashe.
2. `QUANTITY` – a tranzakcióindex pozíciója egész számként.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Visszaküldött információk** Nézze meg az [eth_getTransactionByHash](#eth_gettransactionbyhash) résznél

**Példa**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Az eredményeket nézze meg az [eth_getTransactionByHash](#eth_gettransactionbyhash) résznél

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Egy tranzakcióról ad információt a blokkszám és a tranzakcióindex pozíciója alapján.

**Paraméterek**

1. `QUANTITY|TAG` – a blokk száma egész számként, vagy a `„latest”`, `„earliest”`, `„pending”`, `„safe”` vagy `„finalized”` sztringek az [alapértelmezett blokkparaméterek](/developers/docs/apis/json-rpc/#default-block) szerint.
2. `QUANTITY` – a tranzakcióindex pozíciója.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Visszaküldött információk** Nézze meg az [eth_getTransactionByHash](#eth_gettransactionbyhash) résznél

**Példa**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Az eredményeket nézze meg az [eth_getTransactionByHash](#eth_gettransactionbyhash) résznél

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Egy tranzakció visszaigazolását adja meg a tranzakció-hash alapján.

**Megjegyzés:** A visszaigazolás nem érthető el függőben lévő tranzakciók esetében.

**Paraméterek**

1. `DATA`, 32 bájt – tranzakció-hash

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Visszaküldött információk** `Object` – Egy tranzakció visszaigazolási objektuma, vagy `null`, amikor a visszaigazolást nem találja:

- `transactionHash`: `DATA`, 32 bájt – a tranzakció hashe.
- `transactionIndex`: `QUANTITY` – a tranzakcióindex pozíciója a blokkban, egész számként.
- `blockHash`: `DATA`, 32 bájt – a blokk-hash, amelyben ez a tranzakció volt.
- `blockNumber`: `QUANTITY` – a blokkszám, amelyben ez a tranzakció volt.
- `from`: `DATA`, 20 bájt – a küldő címe.
- `to`: `DATA`, 20 bájt – a fogadó címe. null, amikor ez egy szerződéslétrehozó tranzakció.
- `cumulativeGasUsed` : `QUANTITY` – A gáz teljes mennyisége, amikor ez a tranzakció végrehajtásra került a blokkban.
- `effectiveGasPrice` : `QUANTITY` – Az alapdíj és a borravaló összege a gáz egységére vonatkozóan.
- `gasUsed`: `QUANTITY` – A felhasznált gáz mennyisége erre az adott tranzakcióra vonatkozóan.
- `contractAddress`: `DATA`, 20 bájt – A létrehozott szerződéscím, ha ez a tranzakció szerződéslétrehozásról szól, máskülönben `null`.
- `logs`: `Array` – A naplózási objektumok tömbje, amelyet ez a tranzakció generált.
- `logsBloom`: `DATA`, 256 bájt – Bloom-szűrés a könnyű kliensekhez, hogy gyorsan elérjék a kapcsolódó naplóbejegyzéseket.
- `type`: `QUANTITY` – a tranzakciótípus egész számként, `0x0` a korábbi tranzakciókért, `0x1` a hozzáférési lista típusért, `0x2` a dinamikus díjakért.

Emellett megadja _a kettő közül az egyiket_ :

- `root` : `DATA` 32 bájt tranzakció utáni státuszgyökér (pre Byzantium)
- `status`: `QUANTITY` vagy `1` (sikeres), vagy `0` (sikertelen)

**Példa**

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

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Egy blokk uncle-blokkjáról ad információt a hash és az uncle-index pozíciója alapján.

**Paraméterek**

1. `DATA`, 32 bájt – egy blokk hashe.
2. `QUANTITY` – az uncle-index pozíciója.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Visszaküldött információk** Nézze meg az [eth_getBlockByHash](#eth_getblockbyhash) résznél

**Példa**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Az eredményeket nézze meg az [eth_getBlockByHash](#eth_getblockbyhash) résznél

**Megjegyzés**: A nagybácsi nem tartalmaz egyedi tranzakciókat.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Egy blokk uncle-blokkjáról ad információt a blokkszám és az uncle-index pozíciója alapján.

**Paraméterek**

1. `QUANTITY|TAG` – a blokk száma egész számként, vagy az `„earliest”`, `„latest”`, `„pending”`, `„safe”`, `„finalized”` sztringek az [alapértelmezett blokkparaméterek](/developers/docs/apis/json-rpc/#default-block) szerint.
2. `QUANTITY` – az uncle-index pozíciója.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Visszaküldött információk** Nézze meg az [eth_getBlockByHash](#eth_getblockbyhash) résznél

**Megjegyzés**: A nagybácsi nem tartalmaz egyedi tranzakciókat.

**Példa**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Az eredményeket nézze meg az [eth_getBlockByHash](#eth_getblockbyhash) résznél

### eth_newFilter {#eth_newfilter}

Egy szűrőobjektumot hoz létre a szűrőopciók alapján, hogy értesítsen, amikor a státusz változik (a naplóban). A státusz megváltozásának ellenőrzéséhez az [eth_getFilterChanges](#eth_getfilterchanges) metódust kell meghívni.

**Megjegyzés a témaszűrők meghatározásához:** A témák sorrendfüggők. Egy tranzakció egy olyan naplóval, melyben [A, B] téma (topic) van, a következő témaszűrőkhöz lesz hozzáillesztve:

- `[]` „bármi”
- `[A]` „A az első helyen (utána bármi)”
- `[null, B]` „bármi az első helyen ÉS B a második helyen (és utána bármi)”
- `[A, B]` „A az első helyen ÉS B a második helyen (és utána bármi)”
- `[[A, B], [A, B]]` „(A VAGY B) az első helyen ÉS (A VAGY B) a második helyen (és utána bármi)”
- **Paraméterek**

1. `Object` – A szűrőopciók:

- `fromBlock`: `QUANTITY|TAG` – (opcionális, alapértelmezett: `„latest”`) blokkszám egész számként, vagy `„latest”` az utolsó előterjesztett blokkra, `„safe”` az utolsó biztosított blokkra, `„finalized”` az utolsó véglegesített blokkra, vagy `„pending”`, `„earliest”` a még blokkba nem került tranzakciókra.
- `toBlock`: `QUANTITY|TAG` – (opcionális, alapértelmezett: `„latest”`) blokkszám egész számként, vagy `„latest”` az utolsó előterjesztett blokkra,`„safe”` az utolsó biztosított blokkra, `„finalized”` az utolsó véglegesített blokkra, vagy `„pending”`, `„earliest”` a még blokkba nem került tranzakciókra.
- `address`: `DATA|Array`, 20 bájt – (opcionális) A szerződéscím vagy címek listája, amelyekről a naplók származnak.
- `topics`: `Array of DATA`, – (opcionális) a `DATA` témák (topics) 32 bájtos tömbje. A témák sorrendfüggők. Minden téma egy DATA tömb lehet „vagy” opciókkal.

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

**Visszaküldött információk** `QUANTITY` – Egy szűrő id.

**Példa**

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

### eth_newBlockFilter {#eth_newblockfilter}

Létrehoz egy szűrőt a csomópontban, hogy értesítsen az új blokk érkezéséről. A státusz megváltozásának ellenőrzéséhez az [eth_getFilterChanges](#eth_getfilterchanges) metódust kell meghívni.

**Paraméterek** Egyik sem

**Visszaküldött információk** `QUANTITY` – Egy szűrő id.

**Példa**

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

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Létrehoz egy szűrőt a csomópontban, hogy értesítsen új függőben lévő tranzakciók érkezéséről. A státusz megváltozásának ellenőrzéséhez az [eth_getFilterChanges](#eth_getfilterchanges) metódust kell meghívni.

**Paraméterek** Egyik sem

**Visszaküldött információk** `QUANTITY` – Egy szűrő id.

**Példa**

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

### eth_uninstallFilter {#eth_uninstallfilter}

Egy adott azonosító alatti szűrő eltávolítása. Mindig érdemes meghívni, ha már nincs szükség az adott ellenőrzésre. Emellett a szűrőket ideiglenesen leállíthatja, amikor egy időszakban nincs azokra szükség az [eth_getFilterChanges](#eth_getfilterchanges) metódussal.

**Paraméterek**

1. `QUANTITY` – A szűrő azonosítója.

```js
params: [
  "0xb", // 11
]
```

**Visszaküldött információk** `Boolean` – `true`, ha a szűrőt sikeresen eltávolította, máskülönben `false`.

**Példa**

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

### eth_getFilterChanges {#eth_getfilterchanges}

Egy szűrőre vonatkozó szelektív hívás, ami a naplótömböt adja vissza, amely az utolsó szelektív hívás óta történteket foglalja magában.

**Paraméterek**

1. `QUANTITY` – A szűrő azonosítója.

```js
params: [
  "0x16", // 22
]
```

**Visszaküldött információk** `Array` – Naplóobjektumok tömbje, vagy egy üres tömb, ha semmi sem változott a legutóbbi szelektív hívás óta.

- Az `eth_newBlockFilter` által létrehozott szűrőkre a visszakapott értékek a blokkhashek (`DATA`, 32 bájt), például `["0x3454645634534..."]`.
- Az `eth_newPendingTransactionFilter` által létrehozott szűrőkre a visszakapott értékek a tranzakcióhashek (`DATA`, 32 bájt), például `["0x6345343454645..."]`.
- Az `eth_newFilter` által készített szűrőkre a naplók olyan objektumok lesznek, melyek a következő paraméterekkel rendelkeznek:
  - `removed`: `TAG` – `true`, amikor a naplót törölték a lánc újrarendezése miatt. `false`, ha ez egy érvényes napló.
  - `logIndex`: `QUANTITY` – a naplóindex pozíciója a blokkban, egész számként. `null`, amikor a napló függőben van.
  - `transactionIndex`: `QUANTITY` – a tranzakcióindex pozíciója, amelyből a napló készült, egész számként. `null`, amikor a napló függőben van.
  - `transactionHash`: `DATA`, 32 bájt – a tranzakció hashe, amelyből ez a napló készült. `null`, amikor a napló függőben van.
  - `blockHash`: `DATA`, 32 bájt – a blokk-hash, amelyben ez a napló volt. `null`, amikor függőben van. `null`, amikor a napló függőben van.
  - `blockNumber`: `QUANTITY` – a blokkszám, ahol ez a napló volt. `null`, amikor függőben van. `null`, amikor a napló függőben van.
  - `address`: `DATA`, 20 bájt – a cím, ahonnan ez a napló származik.
  - `data`: `DATA` – nullát vagy a napló több 32 bájtos nem indexált argumentumát tartalmazza.
  - `topics`: `Array of DATA` – 0-tól 4-ig tartó tömbje a 32 bájtos, indexált naplóargumentumok `DATA` részleteinek. (A _Solidity-ben_: Az első téma (topic) az esemény aláírásának a _hashe_ (például `Deposit(address,bytes32,uint256)`), kivéve ha az eseményt az `anonymous` specifikációval deklarálták.)
- **Példa**

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

### eth_getFilterLogs {#eth_getfilterlogs}

Visszaadja a megadott azonosítóval rendelkező szűrőnek megfelelő összes napló tömbjét.

**Paraméterek**

1. `QUANTITY` – A szűrő azonosítója.

```js
params: [
  "0x16", // 22
]
```

**Visszaküldött információk** Nézze meg az [eth_getFilterChanges](#eth_getfilterchanges) résznél

**Példa**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Az eredményeket nézze meg az [eth_getFilterChanges](#eth_getfilterchanges) résznél

### eth_getLogs {#eth_getlogs}

Visszaadja az adott szűrőobjektumnak megfelelő összes naplótömböt.

**Paraméterek**

1. `Object` – A szűrőopciók:

- `fromBlock`: `QUANTITY|TAG` – (opcionális, alapértelmezett: `„latest”`) blokkszám egész számként, vagy `„latest”` az utolsó előterjesztett blokkra, `„safe”` az utolsó biztosított blokkra, `„finalized”` az utolsó véglegesített blokkra, vagy `„pending”`, `„earliest”` a még blokkba nem került tranzakciókra.
- `toBlock`: `QUANTITY|TAG` – (opcionális, alapértelmezett: `„latest”`) blokkszám egész számként, vagy `„latest”` az utolsó előterjesztett blokkra,`„safe”` az utolsó biztosított blokkra, `„finalized”` az utolsó véglegesített blokkra, vagy `„pending”`, `„earliest”` a még blokkba nem került tranzakciókra.
- `address`: `DATA|Array`, 20 bájt – (opcionális) A szerződéscím vagy címek listája, amelyekről a naplók származnak.
- `topics`: `Array of DATA`, – (opcionális) a `DATA` témák (topics) 32 bájtos tömbje. A témák sorrendfüggők. Minden téma egy DATA tömb lehet „vagy” opciókkal.
- `blockhash`: `DATA`, 32 bájt – (opcionális, **jövő**) Az EIP-234 bevezetésével a `blockHash` egy új szűrőopció lesz, amely egyetlen blokkra redukálja a visszakapott naplókat egy 32-bájtos hashsel rendelkező `blockHash` segítségével. A `blockHash` használata azonos a `fromBlock` = `toBlock` = blokkszám hashsel (`blockHash`). Ha a `blockHash` benne van a szűrőkritériumban, akkor nem engedélyezett se a `fromBlock`, se a `toBlock`.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Visszaküldött információk** Nézze meg az [eth_getFilterChanges](#eth_getfilterchanges) résznél

**Példa**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Az eredményeket nézze meg az [eth_getFilterChanges](#eth_getfilterchanges) résznél

## Használati példa {#usage-example}

### Egy szerződés telepítése JSON_RPC-vel {#deploying-contract}

Ez a rész azt mutatja be, hogyan lehet egy szerződést telepíteni kizárólag az RPC-interfésszel. Alternatív utak állnak rendelkezésre a szerződéstelepítéshez, ahol ez a komplexitás csökken, például az RPC-interfészre épített könyvtárak segítségével, mint amilyen a [web3.js](https://web3js.readthedocs.io/) és a [web3.py](https://github.com/ethereum/web3.py). Ezek az absztrakciók általában könnyebben érthetők és nem annyira hajlamosak a hibára, de akkor is érdemes megérteni, hogy mi is zajlik a háttérben.

A következő egy egyszerű, `Multiply7` nevű okosszerződés, amelyet a JSON-RPC-interfésszel telepítünk egy Ethereum-csomópontra. Ez az útmutató azt feltételezi, hogy Ön már futtat egy Geth-csomópontot. A csomópontokról és a kliensekről bővebben [itt](/developers/docs/nodes-and-clients/run-a-node) olvashat. Tekintse meg az egyéni [kliensdokumentációt](/developers/docs/nodes-and-clients/), hogy hogyan lehet HTTP JSON-RPC-t indítani nem Geth-klienseken. A legtöbb kliens alapértelmezés szerint a `localhost:8545` kódon működik.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Az első dolog, hogy a HTTP RPC-interfész engedélyezve legyen. Ez azt jelenti, hogy a Geth-nek a beállításkor megadjuk a `--http` jelölőt (flag). Ebben a példában egy Geth-csomópontot használunk egy privát fejlesztési láncon. Ehhez a megközelítéshez nincs szükség etherre, mint egy valódi hálózaton.

```bash
geth --http --dev console 2>>geth.log
```

Ez elindítja a HTTP RPC interfészt a `http://localhost:8545` kódon.

A [curl](https://curl.se) segítségével a Coinbase-címet és egyenleget lekérve ellenőrizhetjük, hogy az interfész fut-e. Vegye figyelembe, hogy e példában az adatok mások, mint az Ön lokális csomópontján. Ha ki szeretné próbálni ezeket a parancsokat, akkor a lekérdezés paramétereit a második curl kérésben cserélje le az első kérésre kapott eredményekre.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_coinbase", "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Mivel a számok hexadecimálisan vannak kódolva, ezért a visszakapott egyenleg wei-ben egy hexadecimális sztring. Ha az egyenleget etherben, számként szeretnénk megkapni, akkor használhatjuk a web3-at a Geth-konzolból.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Most, hogy ethert tettünk a privát fejlesztési láncra, telepíthetjük a szerződést. Az első lépés, hogy a Multiply7 szerződést át kell fordítani bájtkódra, hogy el lehessen küldeni az EVM-nek. A solc, a Solidity átfordító telepítéséhez kövesse a [Solidity dokumentációt](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Előfordulhat, hogy egy régebbi `solc` kiadást szeretne használni, hogy az illeszkedjen [a példában szereplő átfordító verziójához](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Most tehát átfordíthatjuk a Multiply7 szerződést bájtkódra, hogy el lehessen küldeni az EVM-nek.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Megvan az átfordított kód, úgyhogy most meghatározzunk, mennyi gázköltséget igényel a telepítése. Az RPC-interfésznek van egy `eth_estimateGas` metódusa, ami megadja a becsült értéket.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Végül telepítjük a szerződést.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

A tranzakciót elfogadta a csomópont, és visszaküldte a tranzakcióhasht. Ezzel a hashsel lehet nyomon követni a tranzakciót. A következő lépés, hogy meghatározzuk a címet, ahová a szerződés telepítésre került. Minden végrehajtott tranzakció egy visszaigazolást ad. Ez a visszaigazolás számos információt tartalmaz a tranzakcióról, például melyik blokkba került be és mennyi gázt használt fel az EVM. Ha egy tranzakció létrehoz egy szerződést, akkor a szerződés címe is benne lesz a visszaigazolásban. A visszaigazolást megszerezhetjük az `eth_getTransactionReceipt` RPC metódussal.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

A szerződést a `0x4d03d617d700cf81935d7f797f4e2ae719648262` címen hozta létre. Ha nullát kapunk eredményül, akkor a tranzakció még nem került be a blokkba. Várjon egy kicsit, ellenőrizze, hogy a konszenzuskliens fut-e, és próbálja meg újra.

#### Interakció okosszerződésekkel {#interacting-with-smart-contract}

Ebben a példában elküldünk egy tranzakciót az `eth_sendTransaction` metódussal a szerződés `multiply` metódusának.

Az `eth_sendTransaction` számos argumentumot igényel, mint a `from`, `to` és `data`. `From` a számla nyilvános címe, a `to` pedig a szerződés címe. A `data` tartalmazza a csomagot, hogy melyik metódust milyen argumentumokkal kell meghívni. Itt jön képbe az [ABI (application binary interface)](https://docs.soliditylang.org/en/latest/abi-spec.html). Az ABI egy JSON-fájl, amely meghatározza, hogyan kell az EVM számára megadni és kódolni az adatokat.

Az adattörzs bájtjai határozzák meg, hogy a szerződés melyik metódusát hívják meg. Ez a Kessak-hash első 4 bájtja a függvénynév és az argumentumtípusok felett, hexadecimálisan kódolva. A szorzás függvény uint-et fogad el, ami azonos az uint256-tal. Ez a következőt jelenti:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

A következő lépés az argumentumok kódolása. Egyetlen uint256 van csak, amelynek értéke legyen 6. Az ABI egyik része azt mutatja be, hogy miként kell kódolni az uint256 típusokat.

`int<M>: enc(X)` az X két kiegészítős big-endian kódolása, a magasabb rendű (bal) oldalon 0xff-el feltöltve negatív X esetén és nulla > bájttal pozitív X esetén úgy, hogy a hossza a 32 bájt többszöröse legyen.

Ennek a kódolása a következő: `0000000000000000000000000000000000000000000000000000000000000006`.

A függvényválasztót és a kódolt argumentumot kombinálva az adatunk a következő: `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Ezt el lehet küldeni a csomópontnak:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Mivel egy tranzakciót küldtünk, ezért egy hasht kapunk vissza. A visszaigazolás megérkezésekor a következőt látjuk:

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

A visszaigazolás tartalmaz egy naplót. Ezt a naplót az EVM generálta a tranzakció-végrehajtáskor és beletette a visszaigazolásba. A `multiply` függvény azt mutatja, hogy a `Print` eseményt a bemeneti érték 7-szeresével indította el. Mivel a `Print` eseményre az argumentum egy uint256 volt, kódolhatjuk az ABI szabályai szerint, ami a várt 42-es decimális értéket adja. Az adat mellett érdemes megjegyezni, hogy a témák (topics) révén meghatározható, hogy melyik esemény hozta létre a naplót:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Ez csak egy rövid bevezető volt a leggyakoribb feladatokba, a JSON-RPC közvetlen használatát demonstrálandó.

## Kapcsolódó témák {#related-topics}

- [JSON-RPC specifikáció](http://www.jsonrpc.org/specification)
- [ Csomópontok és kliensek](/developers/docs/nodes-and-clients/)
- [JavaScript API-ok](/developers/docs/apis/javascript/)
- [Backend API-ok](/developers/docs/apis/backend/)
- [Végrehajtási kliensek](/developers/docs/nodes-and-clients/#execution-clients)
