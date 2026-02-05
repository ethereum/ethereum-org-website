---
title: JSON-RPC API
description: Bezstavový, lehký protokol pro vzdálené volání procedur (RPC) pro klienty na Ethereu.
lang: cs
---

Aby mohla softwarová aplikace interagovat s blockchainem Ethereum - ať už čtením dat z blockchainu nebo odesíláním transakcí do sítě - musí se připojit k síťovému uzlu.

Za tímto účelem každý [klient Etherea](/developers/docs/nodes-and-clients/#execution-clients) implementuje [specifikaci JSON-RPC](https://github.com/ethereum/execution-apis), takže existuje jednotná sada metod, na které se aplikace mohou spolehnout bez ohledu na konkrétní implementaci uzlu nebo klienta.

[JSON-RPC](https://www.jsonrpc.org/specification) je bezstavový, odlehčený protokol pro vzdálené volání procedur (RPC). Definuje několik datových struktur a pravidla pro jejich zpracování. Je transportně agnostický, což znamená, že koncepty lze použít v rámci stejného procesu, přes sokety, přes HTTP nebo v mnoha různých prostředích pro předávání zpráv. Jako datový formát používá JSON (RFC 4627).

## Implementace klienta {#client-implementations}

Ethereovští klienti mohou při implementaci specifikace JSON-RPC používat různé programovací jazyky. Další podrobnosti týkající se konkrétních programovacích jazyků naleznete v dokumentaci jednotlivých [klientů](/developers/docs/nodes-and-clients/#execution-clients). Doporučujeme vám projít si dokumentaci každého klienta pro nejnovější informace o podpoře API.

## Knihovny usnadňující práci {#convenience-libraries}

I když se můžete rozhodnout přímo komunikovat s ethereovskými klienty přes JSON-RPC API, pro vývojáře dappek existují často jednodušší možnosti. Existuje mnoho knihoven pro [JavaScript](/developers/docs/apis/javascript/#available-libraries) a [backendové API](/developers/docs/apis/backend/#available-libraries), které poskytují obálky nad rozhraním JSON-RPC API. S těmito knihovnami mohou vývojáři psát intuitivní, jednorázové metody ve zvoleném programovacím jazyce, které (pod kapotou) inicializují JSON-RPC požadavky a interagují s Ethereem.

## API konsensuálních klientů {#consensus-clients}

Tato stránka se zabývá především JSON-RPC API používaným exekučními klienty Etherea. Nicméně, konsensuální klienti také mají RPC API, které umožňuje uživatelům dotazovat se na informace o síťovém uzlu, žádat Beacon bloky, stav Beaconu a další informace související s konsensem přímo ze síťového uzlu. Toto API je zdokumentováno na [webové stránce Beacon API](https://ethereum.github.io/beacon-APIs/#/).

Interní API se také používá pro komunikaci mezi klienty v rámci síťového uzlu - tedy umožňuje konsensuálnímu klientovi a exekučnímu klientovi vyměňovat si data. Tomuto se říká „Engine API“ a specifikace jsou dostupné na [GitHubu](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Specifikace exekučního klienta {#spec}

[Přečtěte si celou specifikaci JSON-RPC API na GitHubu](https://github.com/ethereum/execution-apis). Toto API je zdokumentováno na [webové stránce Execution API](https://ethereum.github.io/execution-apis/) a obsahuje inspektor, který vám umožní vyzkoušet si všechny dostupné metody.

## Konvence {#conventions}

### Kódování šestnáctkových hodnot {#hex-encoding}

Přes JSON jsou přenášeny dva klíčové datové typy: neformátovaná pole bajtů a množství. Oba jsou přenášeny s hex kódováním, ale s různými požadavky na formátování.

#### Množství {#quantities-encoding}

Pokud kódujete množství (integery, čísla): Kódujte jako hex, předpona "0x", nejkompaktnější reprezentace (mírná výjimka: nula by měla být reprezentována jako "0x0").

Zde je několik příkladů:

- 0x41 (65 v desítkové soustavě)
- 0x400 (1024 v desítkové soustavě)
- ŠPATNĚ: 0x (vždy by mělo být alespoň jedno číslo - nula je "0x0")
- ŠPATNĚ: 0x0400 (nejsou povoleny žádné nuly na začátku)
- ŠPATNĚ: ff (musí mít předponu 0x)

### Neformátovaná data {#unformatted-data-encoding}

Při kódování neformátovaných dat (pole bajtů, adresy účtů, hashe, pole bytecode): Kódujte jako hex, předpona "0x", dva hexadecimální znaky na bajt.

Zde je několik příkladů:

- 0x41 (velikost 1, "A")
- 0x004200 (velikost 3, "0B0")
- 0x (velikost 0, "")
- ŠPATNĚ: 0xf0f0f (musí být sudý počet znaků)
- ŠPATNĚ: 004200 (musí mít předponu 0x)

### Parametr bloku {#block-parameter}

Následující metody mají parametr bloku:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Když jsou podány požadavky, které se dotazují na stav Etherea, zadaný parametr bloku určuje jeho výšku.

Pro parametr bloku jsou možné následující možnosti:

- `HEX String` – celé číslo bloku
- `String "earliest"` pro nejstarší/genesis blok
- `String "latest"` – pro poslední navržený blok
- `String "safe"` – pro poslední bezpečný hlavní blok
- `String "finalized"` – pro poslední finalizovaný blok
- `String "pending"` – pro nevyřízený stav/transakce

## Příklady

Na této stránce poskytujeme příklady použití jednotlivých koncových bodů JSON_RPC API pomocí nástroje příkazového řádku [curl](https://curl.se). Tyto jednotlivé příklady koncových bodů naleznete níže v sekci [Příklady s curl](#curl-examples). Dále na stránce také poskytujeme [kompletní příklad](#usage-example) kompilace a nasazení chytrého kontraktu pomocí uzlu Geth, rozhraní JSON_RPC API a curl.

## Příklady s curl {#curl-examples}

Níže jsou uvedeny příklady použití rozhraní JSON_RPC API prostřednictvím požadavků [curl](https://curl.se) na uzel Ethereum. Každý příklad
obsahuje popis konkrétního endpointu, jeho parametrů, návratového typu a konkrétní příklad, jak by měl být použit.

Požadavky curl mohou vrátit chybovou zprávu týkající se typu obsahu. Důvodem je to, že volba `--data` nastavuje typ obsahu na `application/x-www-form-urlencoded`. Pokud si váš uzel na toto stěžuje, nastavte hlavičku ručně umístěním `-H "Content-Type: application/json"` na začátek volání. Příklady také nezahrnují kombinaci URL/IP adresy a portu, která musí být posledním argumentem předaným příkazu curl (např. `127.0.0.1:8545`). Kompletní požadavek curl včetně těchto údajů má následující podobu:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Šíření informací, stav, historie {#gossip-state-history}

Několik základních metod JSON-RPC vyžaduje data ze sítě Ethereum a přehledně se dělí do tří hlavních kategorií: _šíření informací, stav a historie_. Pomocí odkazů v těchto sekcích můžete přejít na jednotlivé metody, nebo použít obsah pro prozkoumání kompletního seznamu metod.

### Metody šíření informací {#gossip-methods}

> Tyto metody sledují hlavičku řetězce. Takto se transakce šíří po síti, dostávají se do bloků a takto se také klienti dozvídají o nových blocích.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Metody stavu {#state_methods}

> Metody, které informují o aktuálním stavu všech uložených dat. "Stav" je jako jeden velký sdílený kus RAM a zahrnuje zůstatky účtů, data kontraktů a odhady spotřeby paliva.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Metody historie {#history_methods}

> Získávají historické záznamy o každém bloku až po genesis. Představte si je jako jeden velký soubor pouze pro přidávání, který obsahuje všechny hlavičky bloků, těla bloků, uncle bloky a stvrzenky transakcí.

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

## JSON-RPC API Playground

K prozkoumání a vyzkoušení metod API můžete použít [nástroj playground](https://ethereum-json-rpc.com). Ukazuje vám také, které metody a sítě jsou podporovány různými poskytovateli síťových uzlů.

## Metody rozhraní JSON-RPC API {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Vrací aktuální verzi klienta.

**Parametry**

Žádná

**Návratová hodnota**

`String` – aktuální verze klienta

**Příklad**

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

Vrátí haš Keccak-256 (nikoli standardizovaný SHA3-256) z daných dat.

**Parametry**

1. `DATA` – data, která mají být převedena na haš SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Návratová hodnota**

`DATA` – výsledek haše SHA3 daného řetězce.

**Příklad**

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

Vrací ID aktuální sítě.

**Parametry**

Žádná

**Návratová hodnota**

`String` – ID aktuální sítě.

Úplný seznam aktuálních ID sítí je k dispozici na [chainlist.org](https://chainlist.org). Některé běžné jsou:

- `1`: Ethereum Mainnet
- `11155111`: testnet Sepolia
- `560048` : Hoodi Testnet

**Příklad**

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

Vrátí `true`, pokud klient aktivně naslouchá síťovým připojením.

**Parametry**

Žádná

**Návratová hodnota**

`Boolean` – `true`, když naslouchá, jinak `false`.

**Příklad**

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

Vrací počet peerů, kteří jsou aktuálně připojeni ke klientovi.

**Parametry**

Žádná

**Návratová hodnota**

`QUANTITY` – celé číslo počtu připojených peerů.

**Příklad**

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

Vrátí aktuální verzi protokolu Ethereum. Upozorňujeme, že tato metoda [není v Gethu dostupná](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Parametry**

Žádná

**Návratová hodnota**

`String` – aktuální verze protokolu Ethereum

**Příklad**

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

Vrátí objekt s daty o stavu synchronizace nebo `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

Žádná

**Návratová hodnota**

Přesná návratová data se liší mezi implementacemi klientů. Všichni klienti vracejí `False`, když se uzel nesynchronizuje, a všichni klienti vracejí následující pole.

`Object|Boolean`, Objekt s daty o stavu synchronizace nebo `FALSE`, když nesynchronizuje:

- `startingBlock`: `QUANTITY` – blok, u kterého import začal (resetuje se pouze po dosažení hlavičky synchronizace)
- `currentBlock`: `QUANTITY` – aktuální blok, stejné jako eth_blockNumber
- `highestBlock`: `QUANTITY` – odhadovaný nejvyšší blok

Individuální klienti mohou také poskytovat další data. Například Geth vrací následující:

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

Zatímco Besu vrací:

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

Další podrobnosti naleznete v dokumentaci pro vašeho konkrétního klienta.

**Příklad**

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

Vrátí klientskou adresu coinbase.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

> **Poznámka:** Tato metoda je od verze **v1.14.0** zastaralá a již není podporována. Pokus o použití této metody bude mít za následek chybu „Metoda není podporována“.

**Parametry**

Žádná

**Návratová hodnota**

`DATA`, 20 bajtů – aktuální coinbase adresa.

**Příklad**

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

Vrátí ID řetězce používané pro podepisování transakcí chráněných proti opakování.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

Žádná

**Návratová hodnota**

`chainId`, šestnáctková hodnota jako řetězec představující celé číslo ID aktuálního řetězce.

**Příklad**

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

Vrátí `true`, pokud klient aktivně těží nové bloky. Toto může vrátit `true` pouze pro sítě proof-of-work a v některých klientech nemusí být po [sloučení](/roadmap/merge/) k dispozici.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

Žádná

**Návratová hodnota**

`Boolean` – vrátí `true`, pokud klient těží, jinak `false`.

**Příklad**

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

Vrátí počet hashů za sekundu, se kterými uzel těží. Toto může vrátit `true` pouze pro sítě proof-of-work a v některých klientech nemusí být po [sloučení](/roadmap/merge/) k dispozici.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

Žádná

**Návratová hodnota**

`QUANTITY` – počet hašů za sekundu.

**Příklad**

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

Vrací odhad aktuální ceny za palivo v jednotkách wei. Například klient Besu zkoumá posledních 100 bloků a vrací mediánovou cenu za jednotku paliva ve výchozím nastavení.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

Žádná

**Návratová hodnota**

`QUANTITY` – celé číslo aktuální ceny gasu ve wei.

**Příklad**

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

Vrátí seznam adres, které klient vlastní.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

Žádná

**Návratová hodnota**

`Pole DATA`, 20 bajtů – adresy vlastněné klientem.

**Příklad**

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

Vrací číslo nejnovějšího bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

Žádná

**Návratová hodnota**

`QUANTITY` – celé číslo aktuálního čísla bloku, na kterém se klient nachází.

**Příklad**

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

Vrací zůstatek účtu na dané adrese.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtů – adresa pro kontrolu zůstatku.
2. `QUANTITY|TAG` – celé číslo bloku nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"` nebo `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Návratová hodnota**

`QUANTITY` – celé číslo aktuálního zůstatku ve wei.

**Příklad**

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

Vrátí hodnotu z pozice v úložišti na dané adrese.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtů – adresa úložiště.
2. `QUANTITY` – celé číslo pozice v úložišti.
3. `QUANTITY|TAG` – celé číslo bloku nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

**Návratová hodnota**

`DATA` – hodnota na této pozici v úložišti.

**Příklad**
Výpočet správné pozice závisí na úložišti, které se má načíst. Zvažte následující kontrakt nasazený na adrese `0x295a70b2de5e3953354a6a8344e616ed314d7251` adresou `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

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

Získání hodnoty pos0 je přímočaré:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Načtení prvku mapy je obtížnější. Pozice prvku v mapě se vypočítá pomocí:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

To znamená, že pro načtení úložiště na pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] musíme vypočítat pozici pomocí:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Konzole Geth, která je dodávána s knihovnou web3, může být použita k provedení výpočtu:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Nyní načteme úložiště:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Vrátí počet transakcí _odeslaných_ z adresy.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtů – adresa.
2. `QUANTITY|TAG` – celé číslo bloku nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"` nebo `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // stav v posledním bloku
]
```

**Návratová hodnota**

`QUANTITY` - celé číslo udávající počet transakcí odeslaných z této adresy.

**Příklad**

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

Vrátí počet transakcí v bloku, který odpovídá danému haši bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů – haš bloku

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Návratová hodnota**

`QUANTITY` – celé číslo počtu transakcí v tomto bloku.

**Příklad**

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

Vrátí počet transakcí v bloku odpovídajícím danému číslu bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` – celé číslo čísla bloku nebo řetězec `"earliest"`, `"latest"`, `"pending"`, `"safe"` nebo `"finalized"`, jako v [parametru bloku](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Návratová hodnota**

`QUANTITY` – celé číslo počtu transakcí v tomto bloku.

**Příklad**

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

Vrátí počet strýčkovských bloků v bloku odpovídajícím danému haši bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů – haš bloku

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Návratová hodnota**

`QUANTITY` – celé číslo počtu strýčkovských bloků v tomto bloku.

**Příklad**

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

Vrátí počet strýčkovských bloků v bloku odpovídajícím danému číslu bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` – celé číslo čísla bloku nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"` nebo `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Návratová hodnota**

`QUANTITY` – celé číslo počtu strýčkovských bloků v tomto bloku.

**Příklad**

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

Vrátí kód na dané adrese.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtů – adresa
2. `QUANTITY|TAG` – celé číslo bloku nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"` nebo `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Návratová hodnota**

`DATA` – kód z dané adresy.

**Příklad**

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

Metoda podpisu vypočítá specifický podpis Etherea pomocí: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Přidáním předpony ke zprávě je vypočtený podpis rozpoznatelný jako specifický podpis Etherea. Tím se zabrání zneužití, kdy může škodlivá dapp podepsat libovolná data (např. transakci) a použít podpis k tomu, aby se vydávala za oběť.

Poznámka: adresa, kterou se má podepsat, musí být odemčena.

**Parametry**

1. `DATA`, 20 bajtů – adresa
2. `DATA`, N bajtů – zpráva k podepsání

**Návratová hodnota**

`DATA`: Podpis

**Příklad**

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

Podepíše transakci, kterou lze později odeslat do sítě pomocí [eth_sendRawTransaction](#eth_sendrawtransaction).

**Parametry**

1. `Object` – objekt transakce

- `type`:
- `from`: `DATA`, 20 bajtů – adresa, ze které je transakce odeslána.
- `to`: `DATA`, 20 bajtů – (volitelné při vytváření nového kontraktu) adresa, na kterou je transakce směrována.
- `gas`: `QUANTITY` – (volitelné, výchozí: 90000) celé číslo gasu poskytnutého pro provedení transakce. Vrátí nevyužitý gas.
- `gasPrice`: `QUANTITY` – (volitelné, výchozí: bude určeno) celé číslo ceny gasPrice použité pro každý zaplacený gas, ve Wei.
- `value`: `QUANTITY` – (volitelné) celé číslo hodnoty odeslané s touto transakcí, ve Wei.
- `data`: `DATA` – zkompilovaný kód kontraktu NEBO haš podpisu vyvolané metody a zakódovaných parametrů.
- `nonce`: `QUANTITY` – (volitelné) celé číslo nonce. To umožňuje přepsat vlastní nevyřízené transakce, které používají stejný nonce.

**Návratová hodnota**

`DATA`, objekt transakce kódovaný pomocí RLP podepsaný zadaným účtem.

**Příklad**

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

Vytvoří novou transakci volání zprávy nebo vytvoření kontraktu, pokud pole data obsahuje kód, a podepíše ji pomocí účtu uvedeného v `from`.

**Parametry**

1. `Object` – objekt transakce

- `from`: `DATA`, 20 bajtů – adresa, ze které je transakce odeslána.
- `to`: `DATA`, 20 bajtů – (volitelné při vytváření nového kontraktu) adresa, na kterou je transakce směrována.
- `gas`: `QUANTITY` – (volitelné, výchozí: 90000) celé číslo gasu poskytnutého pro provedení transakce. Vrátí nevyužitý gas.
- `gasPrice`: `QUANTITY` – (volitelné, výchozí: bude určeno) celé číslo ceny gasPrice použité pro každý zaplacený gas.
- `value`: `QUANTITY` – (volitelné) celé číslo hodnoty odeslané s touto transakcí.
- `input`: `DATA` – zkompilovaný kód kontraktu NEBO haš podpisu vyvolané metody a zakódovaných parametrů.
- `nonce`: `QUANTITY` – (volitelné) celé číslo nonce. To umožňuje přepsat vlastní nevyřízené transakce, které používají stejný nonce.

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

**Návratová hodnota**

`DATA`, 32 bajtů – haš transakce, nebo nulový haš, pokud transakce ještě není k dispozici.

Použijte [eth_getTransactionReceipt](#eth_gettransactionreceipt) pro získání adresy kontraktu poté, co byla transakce navržena v bloku, když jste vytvořili kontrakt.

**Příklad**

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

Vytvoří novou transakci volání zprávy nebo vytvoření kontraktu pro podepsané transakce.

**Parametry**

1. `DATA`, podepsaná data transakce.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Návratová hodnota**

`DATA`, 32 bajtů – haš transakce, nebo nulový haš, pokud transakce ještě není k dispozici.

Použijte [eth_getTransactionReceipt](#eth_gettransactionreceipt) pro získání adresy kontraktu poté, co byla transakce navržena v bloku, když jste vytvořili kontrakt.

**Příklad**

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

Okamžitě provede nové volání zprávy bez vytvoření transakce na blockchainu. Často se používá pro provádění funkcí chytrých kontraktů pouze pro čtení, například `balanceOf` pro kontrakt ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `Object` – objekt volání transakce

- `from`: `DATA`, 20 bajtů – (volitelné) adresa, ze které je transakce odeslána.
- `to`: `DATA`, 20 bajtů – adresa, na kterou je transakce směrována.
- `gas`: `QUANTITY` – (volitelné) celé číslo gasu poskytnutého pro provedení transakce. eth_call spotřebovává nulový gas, ale tento parametr může být potřebný pro některá provedení.
- `gasPrice`: `QUANTITY` – (volitelné) celé číslo ceny gasu (gasPrice) použité pro každý zaplacený gas
- `value`: `QUANTITY` – (volitelné) celé číslo hodnoty odeslané s touto transakcí
- `input`: `DATA` – (volitelné) haš podpisu metody a zakódovaných parametrů. Podrobnosti naleznete v [dokumentaci Solidity o ABI kontraktu Etherea](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` – celé číslo bloku nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"` nebo `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

**Návratová hodnota**

`DATA` – návratová hodnota provedeného kontraktu.

**Příklad**

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

Generuje a vrací odhad, kolik gasu je nutné k dokončení transakce. Transakce nebude přidána do blockchainu. Všimněte si, že odhad může být výrazně vyšší než množství gasu skutečně spotřebovaného transakcí, a to z různých důvodů, včetně mechaniky EVM a výkonu uzlu.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

Viz parametry [eth_call](#eth_call) s tím rozdílem, že všechny vlastnosti jsou volitelné. Pokud není zadán žádný limit transakčních poplatků, Geth použije jako horní hranici limit transakčních poplatků bloku z nevyřízeného bloku. V důsledku toho vrácený odhad nemusí být dostatečný k provedení volání/transakce, pokud je množství paliva vyšší než limit transakčních poplatků nevyřízeného bloku.

**Návratová hodnota**

`QUANTITY` – množství spotřebovaného gasu.

**Příklad**

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

Vrátí informace o bloku podle haše.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů – haš bloku.
2. `Boolean` – pokud `true`, vrátí celé objekty transakcí, pokud `false`, vrátí pouze haše transakcí.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Návratová hodnota**

`Object` – objekt bloku, nebo `null`, pokud nebyl nalezen žádný blok:

- `number`: `QUANTITY` – číslo bloku. `null`, pokud se jedná o nevyřízený blok.
- `hash`: `DATA`, 32 bajtů – haš bloku. `null`, pokud se jedná o nevyřízený blok.
- `parentHash`: `DATA`, 32 bajtů – haš rodičovského bloku.
- `nonce`: `DATA`, 8 bajtů – haš vygenerovaného proof-of-work. `null` pro nevyřízený blok, `0x0` pro bloky proof-of-stake (od sloučení)
- `sha3Uncles`: `DATA`, 32 bajtů – SHA3 dat strýčkovských bloků v bloku.
- `logsBloom`: `DATA`, 256 bajtů – bloom filtr pro záznamy bloku. `null`, pokud se jedná o nevyřízený blok.
- `transactionsRoot`: `DATA`, 32 bajtů – kořen trie transakcí bloku.
- `stateRoot`: `DATA`, 32 bajtů – kořen konečného stavového trie bloku.
- `receiptsRoot`: `DATA`, 32 bajtů – kořen trie potvrzení bloku.
- `miner`: `DATA`, 20 bajtů – adresa příjemce, kterému byly uděleny odměny za blok.
- `difficulty`: `QUANTITY` – celé číslo obtížnosti tohoto bloku.
- `totalDifficulty`: `QUANTITY` – celé číslo celkové obtížnosti řetězce až do tohoto bloku.
- `extraData`: `DATA` – pole „extra data“ tohoto bloku.
- `size`: `QUANTITY` – celé číslo velikosti tohoto bloku v bajtech.
- `gasLimit`: `QUANTITY` – maximální povolený gas v tomto bloku.
- `gasUsed`: `QUANTITY` – celkový spotřebovaný gas všemi transakcemi v tomto bloku.
- `timestamp`: `QUANTITY` – časové razítko unixu pro okamžik, kdy byl blok seřazen.
- `transactions`: `Pole` – pole objektů transakcí nebo 32bajtových hašů transakcí v závislosti na posledním zadaném parametru.
- `uncles`: `Pole` – pole hašů strýčkovských bloků.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Výsledek
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

Vrátí informace o bloku podle čísla bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` – celé číslo čísla bloku nebo řetězec `"earliest"`, `"latest"`, `"pending"`, `"safe"` nebo `"finalized"`, jako v [parametru bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` – pokud `true`, vrátí celé objekty transakcí, pokud `false`, vrátí pouze haše transakcí.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Návratová hodnota**
Viz [eth_getBlockByHash](#eth_getblockbyhash)

**Příklad**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Výsledek viz [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Vrátí informace o transakci požadované podle haše transakce.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů – haš transakce

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Návratová hodnota**

`Object` – objekt transakce nebo `null`, pokud nebyla nalezena žádná transakce:

- `blockHash`: `DATA`, 32 bajtů – haš bloku, ve kterém se tato transakce nacházela. `null`, když je nevyřízená.
- `blockNumber`: `QUANTITY` – číslo bloku, ve kterém se tato transakce nacházela. `null`, když je nevyřízená.
- `from`: `DATA`, 20 bajtů – adresa odesílatele.
- `gas`: `QUANTITY` – gas poskytnutý odesílatelem.
- `gasPrice`: `QUANTITY` – cena gasu poskytnutá odesílatelem ve Wei.
- `hash`: `DATA`, 32 bajtů – haš transakce.
- `input`: `DATA` – data odeslaná spolu s transakcí.
- `nonce`: `QUANTITY` – počet transakcí provedených odesílatelem před touto.
- `to`: `DATA`, 20 bajtů – adresa příjemce. `null`, pokud se jedná o transakci vytvoření kontraktu.
- `transactionIndex`: `QUANTITY` – celé číslo pozice indexu transakcí v bloku. `null`, když je nevyřízená.
- `value`: `QUANTITY` – převedená hodnota ve Wei.
- `v`: `QUANTITY` – ID pro obnovení ECDSA
- `r`: `QUANTITY` – ECDSA podpis r
- `s`: `QUANTITY` – ECDSA podpis s

**Příklad**

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

Vrátí informace o transakci podle haše bloku a pozice indexu transakce.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů – haš bloku.
2. `QUANTITY` – celé číslo pozice indexu transakce.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Návratová hodnota**
Viz [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Příklad**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Výsledek viz [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Vrátí informace o transakci podle čísla bloku a pozice indexu transakce.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` – číslo bloku nebo řetězec `"earliest"`, `"latest"`, `"pending"`, `"safe"` nebo `"finalized"`, jako v [parametru bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` – pozice indexu transakce.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Návratová hodnota**
Viz [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Příklad**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Výsledek viz [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Vrátí potvrzení o transakci podle haše transakce.

**Poznámka:** Potvrzení není k dispozici pro nevyřízené transakce.

**Parametry**

1. `DATA`, 32 bajtů – haš transakce

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Návratová hodnota**
`Object` – objekt potvrzení transakce, nebo `null`, pokud nebylo nalezeno žádné potvrzení:

- `transactionHash `: `DATA`, 32 bajtů – haš transakce.
- `transactionIndex`: `QUANTITY` – celé číslo pozice indexu transakcí v bloku.
- `blockHash`: `DATA`, 32 bajtů – haš bloku, ve kterém se tato transakce nacházela.
- `blockNumber`: `QUANTITY` – číslo bloku, ve kterém se tato transakce nacházela.
- `from`: `DATA`, 20 bajtů – adresa odesílatele.
- `to`: `DATA`, 20 bajtů – adresa příjemce. `null`, pokud se jedná o transakci vytvoření kontraktu.
- `cumulativeGasUsed` : `QUANTITY ` – celkové množství gasu spotřebovaného při provedení této transakce v bloku.
- `effectiveGasPrice` : `QUANTITY` – součet základního poplatku a spropitného zaplaceného za jednotku gasu.
- `gasUsed `: `QUANTITY ` – množství gasu spotřebovaného pouze touto konkrétní transakcí.
- `contractAddress `: `DATA`, 20 bajtů – adresa vytvořeného kontraktu, pokud se jednalo o transakci vytvoření kontraktu, jinak `null`.
- `logs`: `Pole` – pole objektů logu, které tato transakce vygenerovala.
- `logsBloom`: `DATA`, 256 bajtů – bloom filtr pro lehké klienty k rychlému načtení souvisejících záznamů.
- `type`: `QUANTITY` – celé číslo typu transakce, `0x0` pro starší transakce, `0x1` pro typy se seznamem přístupů, `0x2` pro dynamické poplatky.

Vrátí také _buď_:

- `root`: `DATA` 32 bajtů kořene stavu po transakci (před Byzantium)
- `status`: `QUANTITY` buď `1` (úspěch), nebo `0` (selhání)

**Příklad**

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
    "contractAddress": null, // řetězec adresy, pokud byla vytvořena
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logy vrácené pomocí getFilterLogs atd.
    }],
    "logsBloom": "0x00...0", // 256bajtový bloom filtr
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

Vrací informace o „uncle“ bloku podle haše a pozice indexu „uncle“.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů – haš bloku.
2. `QUANTITY` – pozice indexu strýčkovského bloku.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Návratová hodnota**
Viz [eth_getBlockByHash](#eth_getblockbyhash)

**Příklad**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Výsledek viz [eth_getBlockByHash](#eth_getblockbyhash)

**Poznámka**: Strýčkovský blok neobsahuje jednotlivé transakce.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Vrací informace o „uncle“ bloku podle čísla a pozice indexu „uncle“.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Vyzkoušejte koncový bod na playgroundu
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` – číslo bloku nebo řetězec `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, jako v [parametru bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` – pozice indexu strýčkovského bloku.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Návratová hodnota**
Viz [eth_getBlockByHash](#eth_getblockbyhash)

**Poznámka**: Strýčkovský blok neobsahuje jednotlivé transakce.

**Příklad**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Výsledek viz [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Vytvoří objekt filtru na základě možností filtru, který upozorní na změnu stavu (záznamy).
Chcete-li zkontrolovat, zda se stav změnil, zavolejte [eth_getFilterChanges](#eth_getfilterchanges).

**Poznámka k zadávání filtrů témat:**
Témata jsou závislá na pořadí. Transakce s logem s tématy [A, B] bude odpovídat následujícím filtrům témat:

- `[]` „cokoliv“
- `[A]` „A na první pozici (a cokoliv dalšího)“
- `[null, B]` „cokoliv na první pozici A B na druhé pozici (a cokoliv dalšího)“
- `[A, B]` „A na první pozici A B na druhé pozici (a cokoliv dalšího)“
- `[[A, B], [A, B]]` „(A NEBO B) na první pozici A (A NEBO B) na druhé pozici (a cokoliv dalšího)“
- **Parametry**

1. `Object` – možnosti filtru:

- `fromBlock`: `QUANTITY|TAG` – (volitelné, výchozí: `"latest"`) celé číslo bloku, nebo `"latest"` pro poslední navržený blok, `"safe"` pro poslední bezpečný blok, `"finalized"` pro poslední finalizovaný blok nebo `"pending"`, `"earliest"` pro transakce, které ještě nejsou v bloku.
- `toBlock`: `QUANTITY|TAG` – (volitelné, výchozí: `"latest"`) celé číslo bloku, nebo `"latest"` pro poslední navržený blok, `"safe"` pro poslední bezpečný blok, `"finalized"` pro poslední finalizovaný blok nebo `"pending"`, `"earliest"` pro transakce, které ještě nejsou v bloku.
- `address`: `DATA|Pole`, 20 bajtů – (volitelné) adresa kontraktu nebo seznam adres, ze kterých by měly logy pocházet.
- `topics`: `Pole DATA`, – (volitelné) pole 32bajtových témat `DATA`. Témata jsou závislá na pořadí. Každé téma může být také polem DATA s možnostmi „nebo“.

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

**Návratová hodnota**
`QUANTITY` – ID filtru.

**Příklad**

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

Vytvoří v uzlu filtr, který upozorní na příchod nového bloku.
Chcete-li zkontrolovat, zda se stav změnil, zavolejte [eth_getFilterChanges](#eth_getfilterchanges).

**Parametry**
Žádné

**Návratová hodnota**
`QUANTITY` – ID filtru.

**Příklad**

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

Vytvoří v uzlu filtr, který upozorní na příchod nových nevyřízených transakcí.
Chcete-li zkontrolovat, zda se stav změnil, zavolejte [eth_getFilterChanges](#eth_getfilterchanges).

**Parametry**
Žádné

**Návratová hodnota**
`QUANTITY` – ID filtru.

**Příklad**

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

Odinstaluje filtr s daným ID. Mělo by být vždy voláno, když již není potřeba sledování.
Filtry navíc vyprší, pokud nejsou po určitou dobu požadovány pomocí [eth_getFilterChanges](#eth_getfilterchanges).

**Parametry**

1. `QUANTITY` – ID filtru.

```js
params: [
  "0xb", // 11
]
```

**Návratová hodnota**
`Boolean` – `true`, pokud byl filtr úspěšně odinstalován, jinak `false`.

**Příklad**

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

Dotazovací metoda pro filtr, která vrací pole záznamů, které se objevily od posledního dotazu.

**Parametry**

1. `QUANTITY` – ID filtru.

```js
params: [
  "0x16", // 22
]
```

**Návratová hodnota**
`Pole` – pole objektů logů, nebo prázdné pole, pokud se od posledního dotazu nic nezměnilo.

- Pro filtry vytvořené pomocí `eth_newBlockFilter` jsou návratovou hodnotou haše bloků (`DATA`, 32 bajtů), např. `[\"0x3454645634534...\"]`.

- Pro filtry vytvořené pomocí `eth_newPendingTransactionFilter` jsou návratovou hodnotou haše transakcí (`DATA`, 32 bajtů), např. `[\"0x6345343454645...\"]`.

- Pro filtry vytvořené pomocí `eth_newFilter` jsou logy objekty s následujícími parametry:
  - `removed`: `TAG` – `true`, když byl log odstraněn kvůli reorganizaci řetězce. `false`, pokud se jedná o platný log.
  - `logIndex`: `QUANTITY` – celé číslo pozice indexu logu v bloku. `null`, pokud se jedná o nevyřízený log.
  - `transactionIndex`: `QUANTITY` – celé číslo pozice indexu transakcí, ze kterého byl log vytvořen. `null`, pokud se jedná o nevyřízený log.
  - `transactionHash`: `DATA`, 32 bajtů – haš transakcí, ze kterých byl tento log vytvořen. `null`, pokud se jedná o nevyřízený log.
  - `blockHash`: `DATA`, 32 bajtů – haš bloku, ve kterém se tento log nacházel. `null`, když je nevyřízená. `null`, pokud se jedná o nevyřízený log.
  - `blockNumber`: `QUANTITY` – číslo bloku, ve kterém se tento log nacházel. `null`, když je nevyřízená. `null`, pokud se jedná o nevyřízený log.
  - `address`: `DATA`, 20 bajtů – adresa, ze které tento log pochází.
  - `data`: `DATA` – neindexovaná data protokolu s proměnnou délkou. (V _solidity_: nula nebo více 32bajtových neindexovaných argumentů protokolu.)
  - `topics`: `Pole DATA` – pole 0 až 4 32bajtových `DATA` indexovaných argumentů logu. (V _solidity_: První téma je _haš_ podpisu události (např. `Deposit(address,bytes32,uint256)`), pokud jste událost nedeklarovali se specifikátorem `anonymous`.)

- **Příklad**

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

Vrátí pole všech logů odpovídajících filtru s daným ID.

**Parametry**

1. `QUANTITY` – ID filtru.

```js
params: [
  "0x16", // 22
]
```

**Návratová hodnota**
Viz [eth_getFilterChanges](#eth_getfilterchanges)

**Příklad**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Výsledek viz [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Vrátí pole všech logů odpovídajících danému objektu filtru.

**Parametry**

1. `Object` – možnosti filtru:

- `fromBlock`: `QUANTITY|TAG` – (volitelné, výchozí: `"latest"`) celé číslo bloku, nebo `"latest"` pro poslední navržený blok, `"safe"` pro poslední bezpečný blok, `"finalized"` pro poslední finalizovaný blok nebo `"pending"`, `"earliest"` pro transakce, které ještě nejsou v bloku.
- `toBlock`: `QUANTITY|TAG` – (volitelné, výchozí: `"latest"`) celé číslo bloku, nebo `"latest"` pro poslední navržený blok, `"safe"` pro poslední bezpečný blok, `"finalized"` pro poslední finalizovaný blok nebo `"pending"`, `"earliest"` pro transakce, které ještě nejsou v bloku.
- `address`: `DATA|Pole`, 20 bajtů – (volitelné) adresa kontraktu nebo seznam adres, ze kterých by měly logy pocházet.
- `topics`: `Pole DATA`, – (volitelné) pole 32bajtových témat `DATA`. Témata jsou závislá na pořadí. Každé téma může být také polem DATA s možnostmi „nebo“.
- `blockHash`: `DATA`, 32 bajtů – (volitelné, **v budoucnu**) S přidáním EIP-234 bude `blockHash` novou možností filtru, která omezuje vrácené logy na jediný blok s 32bajtovým hašem `blockHash`. Použití `blockHash` je ekvivalentní `fromBlock` = `toBlock` = číslo bloku s hašem `blockHash`. Pokud je v kritériích filtru přítomen `blockHash`, pak nejsou povoleny ani `fromBlock`, ani `toBlock`.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Návratová hodnota**
Viz [eth_getFilterChanges](#eth_getfilterchanges)

**Příklad**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Výsledek viz [eth_getFilterChanges](#eth_getfilterchanges)

## Příklad použití {#usage-example}

### Nasazení kontraktu pomocí JSON_RPC {#deploying-contract}

Tato část obsahuje ukázku, jak nasadit kontrakt pouze pomocí rozhraní RPC. Existují alternativní cesty k nasazení kontraktů, kde je tato složitost abstrahována – například pomocí knihoven postavených na rozhraní RPC, jako jsou [web3.js](https://web3js.readthedocs.io/) a [web3.py](https://github.com/ethereum/web3.py). Tyto abstrakce jsou obecně snáze pochopitelné a méně náchylné k chybám, ale stále je užitečné pochopit, co se děje pod pokličkou.

Následuje jednoduchý chytrý kontrakt s názvem `Multiply7`, který bude nasazen pomocí rozhraní JSON-RPC na uzel Ethereum. Tento tutoriál předpokládá, že čtenář již provozuje uzel Geth. Více informací o uzlech a klientech je k dispozici [zde](/developers/docs/nodes-and-clients/run-a-node). Informace o tom, jak spustit HTTP JSON-RPC pro klienty jiné než Geth, naleznete v dokumentaci jednotlivých [klientů](/developers/docs/nodes-and-clients/). Většina klientů má jako výchozí nastavení poskytování služeb na `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

První věc, kterou je třeba udělat, je ujistit se, že je povoleno rozhraní HTTP RPC. To znamená, že při spuštění poskytneme Gethu příznak `--http`. V tomto příkladu používáme uzel Geth na soukromém vývojovém řetězci. Při tomto přístupu nepotřebujeme ether na skutečné síti.

```bash
geth --http --dev console 2>>geth.log
```

Tím se spustí rozhraní HTTP RPC na `http://localhost:8545`.

Ověřit, že rozhraní běží, můžeme načtením coinbase adresy (získáním první adresy z pole účtů) a zůstatku pomocí [curl](https://curl.se). Upozorňujeme, že data v těchto příkladech se na vašem lokálním uzlu budou lišit. Pokud chcete tyto příkazy vyzkoušet, nahraďte parametry požadavku v druhém požadavku curl výsledkem vráceným z prvního.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Protože čísla jsou kódována šestnáctkově, zůstatek je vrácen ve wei jako šestnáctkový řetězec. Pokud chceme mít zůstatek v etheru jako číslo, můžeme použít web3 z konzole Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Nyní, když máme na našem soukromém vývojovém řetězci nějaký ether, můžeme nasadit kontrakt. Prvním krokem je zkompilovat kontrakt Multiply7 do bajtkódu, který lze odeslat do EVM. Pro instalaci solc, kompilátoru Solidity, postupujte podle [dokumentace Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Možná budete chtít použít starší vydání `solc`, aby odpovídalo [verzi kompilátoru použitého pro náš příklad](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Dalším krokem je zkompilovat kontrakt Multiply7 do bajtového kódu, který lze odeslat do EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Nyní, když máme zkompilovaný kód, musíme určit, kolik gasu stojí jeho nasazení. Rozhraní RPC má metodu `eth_estimateGas`, která nám poskytne odhad.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

A nakonec nasaďte kontrakt.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Transakce je přijata uzlem a vrátí se haš transakce. Tento haš může být použit ke sledování transakce. Dalším krokem je určení adresy, na které je náš kontrakt nasazen. Každá provedená transakce vytvoří potvrzení. Toto potvrzení obsahuje různé informace o transakci, například do kterého bloku byla transakce zahrnuta a kolik gasu spotřeboval EVM. Pokud transakce
vytváří kontrakt, bude také obsahovat adresu kontraktu. Potvrzení můžeme získat pomocí RPC metody `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Náš kontrakt byl vytvořen na adrese `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Výsledek null namísto potvrzení znamená, že transakce ještě nebyla zahrnuta do bloku. Chvíli počkejte, zkontrolujte, zda běží váš konsensuální klient, a zkuste to znovu.

#### Interakce s chytrými kontrakty {#interacting-with-smart-contract}

V tomto příkladu odešleme transakci pomocí `eth_sendTransaction` na metodu `multiply` daného kontraktu.

`eth_sendTransaction` vyžaduje několik argumentů, konkrétně `from`, `to` a `data`. `From` je veřejná adresa našeho účtu a `to` je adresa kontraktu. Argument `data` obsahuje datovou část (payload), která definuje, jaká metoda se má zavolat a s jakými argumenty. Zde přichází na řadu [ABI (application binary interface)](https://docs.soliditylang.org/en/latest/abi-spec.html). ABI je soubor JSON, který definuje, jak definovat a kódovat data pro EVM.

Bajty datové části (payload) definují, která metoda v kontraktu je volána. Jedná se o první 4 bajty z haše Keccak přes název funkce a typy jejích argumentů, kódované v šestnáctkové soustavě. Funkce multiply přijímá uint, což je alias pro uint256. Zůstane nám tedy:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Dalším krokem je zakódování argumentů. Je zde pouze jeden uint256, řekněme hodnota 6. ABI má sekci, která specifikuje, jak kódovat typy uint256.

`int<M>: enc(X)` je kódování X v doplňkovém kódu big-endian, doplněné na straně vyššího řádu (vlevo) o 0xff pro záporné X a o nulové bajty pro kladné X tak, aby délka byla násobkem 32 bajtů.

To se zakóduje na `0000000000000000000000000000000000000000000000000000000000000006`.

Kombinací selektoru funkce a zakódovaného argumentu budou naše data `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Toto lze nyní odeslat do uzlu:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Jelikož byla odeslána transakce, vrátil se její haš. Získání potvrzení vrátí:

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

Potvrzení obsahuje log. Tento log byl vygenerován EVM při provedení transakce a zahrnut do potvrzení. Funkce `multiply` ukazuje, že událost `Print` byla vyvolána se vstupem vynásobeným 7. Vzhledem k tomu, že argument pro událost `Print` byl uint256, můžeme jej dekódovat podle pravidel ABI, což nám zanechá očekávanou desetinnou hodnotu 42. Kromě dat stojí za zmínku, že témata lze použít k určení, která událost vytvořila záznam:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Toto byl jen stručný úvod do některých z nejběžnějších úkolů, demonstrující přímé použití JSON-RPC.

## Související témata {#related-topics}

- [Specifikace JSON-RPC](http://www.jsonrpc.org/specification)
- [Uzly a klienti](/developers/docs/nodes-and-clients/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [Backend API](/developers/docs/apis/backend/)
- [Exekuční klienti](/developers/docs/nodes-and-clients/#execution-clients)
