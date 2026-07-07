---
title: JSON-RPC API
description: "Bezstavový, odlehčený protokol pro vzdálené volání procedur (RPC) pro klienty Etherea."
lang: cs
---

Aby mohla softwarová aplikace komunikovat s blockchainem [Etherea](/) – ať už čtením dat z blockchainu, nebo odesíláním transakcí do sítě – musí se připojit k uzlu Etherea.

Za tímto účelem implementuje každý [klient Etherea](/developers/docs/nodes-and-clients/#execution-clients) [specifikaci JSON-RPC](https://github.com/ethereum/execution-apis), takže existuje jednotná sada metod, na které se mohou aplikace spolehnout bez ohledu na konkrétní implementaci uzlu nebo klienta.

[JSON-RPC](https://www.jsonrpc.org/specification) je bezstavový, odlehčený protokol pro vzdálené volání procedur (RPC). Definuje několik datových struktur a pravidla pro jejich zpracování. Je nezávislý na transportní vrstvě v tom smyslu, že jeho koncepty lze použít v rámci stejného procesu, přes sockety, přes HTTP nebo v mnoha různých prostředích pro předávání zpráv. Jako datový formát používá JSON (RFC 4627).

## Implementace klientů {#client-implementations}

Klienti Etherea mohou při implementaci specifikace JSON-RPC využívat různé programovací jazyky. Další podrobnosti týkající se konkrétních programovacích jazyků najdete v [dokumentaci jednotlivých klientů](/developers/docs/nodes-and-clients/#execution-clients). Doporučujeme zkontrolovat dokumentaci každého klienta, kde najdete nejnovější informace o podpoře API.

## Pomocné knihovny {#convenience-libraries}

Ačkoli se můžete rozhodnout komunikovat s klienty Etherea přímo přes JSON-RPC API, pro vývojáře decentralizovaných aplikací (dapp) často existují jednodušší možnosti. Existuje mnoho knihoven pro [JavaScript](/developers/docs/apis/javascript/#available-libraries) a [backendová API](/developers/docs/apis/backend/#available-libraries), které poskytují obálky nad JSON-RPC API. Díky těmto knihovnám mohou vývojáři psát intuitivní, jednořádkové metody ve svém oblíbeném programovacím jazyce, které (na pozadí) inicializují JSON-RPC požadavky pro interakci s Ethereem.

## API konsensuálních klientů {#consensus-clients}

Tato stránka se zabývá především JSON-RPC API, které používají exekuční klienti Etherea. Nicméně konsensuální klienti mají také RPC API, které uživatelům umožňuje dotazovat se na informace o uzlu, vyžadovat Beacon bloky, Beacon stav a další informace související s konsensem přímo z uzlu. Toto API je zdokumentováno na [webové stránce Beacon API](https://ethereum.github.io/beacon-APIs/#/).

Pro komunikaci mezi klienty v rámci uzlu se používá také interní API – to znamená, že umožňuje konsensuálnímu klientovi a exekučnímu klientovi vyměňovat si data. Nazývá se „Engine API“ a jeho specifikace jsou k dispozici na [GitHubu](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Specifikace exekučního klienta {#spec}

[Přečtěte si úplnou specifikaci JSON-RPC API na GitHubu](https://github.com/ethereum/execution-apis). Toto API je dokumentováno na [webové stránce Execution API](https://ethereum.github.io/execution-apis/) a obsahuje nástroj Inspector pro vyzkoušení všech dostupných metod.

## Konvence {#conventions}

### Kódování hexadecimálních hodnot {#hex-encoding}

Přes JSON se předávají dva klíčové datové typy: neformátovaná pole bajtů a kvantity. Oba se předávají v hexadecimálním kódování, ale s odlišnými požadavky na formátování.

#### Kvantity {#quantities-encoding}

Při kódování kvantit (celá čísla, čísla): kódujte jako hexadecimální hodnotu, přidejte předponu "0x", použijte nejkompaktnější reprezentaci (drobná výjimka: nula by měla být reprezentována jako "0x0").

Zde je několik příkladů:

- 0x41 (65 v desítkové soustavě)
- 0x400 (1024 v desítkové soustavě)
- ŠPATNĚ: 0x (vždy by měla mít alespoň jednu číslici - nula je "0x0")
- ŠPATNĚ: 0x0400 (nejsou povoleny žádné úvodní nuly)
- ŠPATNĚ: ff (musí mít předponu 0x)

### Neformátovaná data {#unformatted-data-encoding}

Při kódování neformátovaných dat (pole bajtů, adresy účtů, hashe, pole bajtkódu): kódujte jako hexadecimální hodnotu, přidejte předponu "0x", dvě hexadecimální číslice na bajt.

Zde je několik příkladů:

- 0x41 (velikost 1, "A")
- 0x004200 (velikost 3, "0B0")
- 0x (velikost 0, "")
- ŠPATNĚ: 0xf0f0f (musí mít sudý počet číslic)
- ŠPATNĚ: 004200 (musí mít předponu 0x)

### Parametr bloku {#block-parameter}

Následující metody mají parametr bloku:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

Když jsou vzneseny požadavky, které dotazují stav Etherea, poskytnutý parametr bloku určuje výšku bloku.

Pro parametr bloku jsou možné následující možnosti:

- `HEX String` - celočíselné číslo bloku
- `String "earliest"` pro nejranější/genesis blok
- `String "latest"` - pro nejnovější navržený blok
- `String "safe"` - pro nejnovější bezpečný vrcholový blok
- `String "finalized"` - pro nejnovější finalizovaný blok
- `String "pending"` - pro čekající stav/transakce

## Příklady {#examples}

Na této stránce uvádíme příklady, jak používat jednotlivé koncové body JSON_RPC API pomocí nástroje příkazového řádku [curl](https://curl.se). Tyto příklady jednotlivých koncových bodů naleznete níže v sekci [Příklady použití curl](#curl-examples). Dále na této stránce také uvádíme [komplexní příklad](#usage-example) pro kompilaci a nasazení chytrého kontraktu pomocí uzlu Geth, JSON_RPC API a nástroje curl.

## Příklady curl {#curl-examples}

Níže jsou uvedeny příklady použití JSON_RPC API pomocí [curl](https://curl.se) požadavků na uzel Etherea. Každý příklad obsahuje popis konkrétního koncového bodu, jeho parametrů, návratového typu a praktický ukázkový příklad jeho použití.

Požadavky curl mohou vrátit chybovou zprávu týkající se typu obsahu. Je to proto, že volba `--data` nastavuje typ obsahu na `application/x-www-form-urlencoded`. Pokud váš uzel hlásí tuto chybu, nastavte hlavičku ručně umístěním `-H "Content-Type: application/json"` na začátek volání. Příklady také nezahrnují kombinaci URL/IP adresy a portu, která musí být posledním argumentem předaným příkazu curl (např. `127.0.0.1:8545`). Kompletní požadavek curl včetně těchto dodatečných dat má následující podobu:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, stav a historie {#gossip-state-history}

Několik základních metod JSON-RPC vyžaduje data ze sítě Ethereum a úhledně spadá do tří hlavních kategorií: _Gossip, stav a historie_. Pomocí odkazů v těchto sekcích můžete přeskočit na jednotlivé metody, nebo použijte obsah k prozkoumání celého seznamu metod.

### Gossip metody {#gossip-methods}

> Tyto metody sledují vrchol řetězce. Tímto způsobem se transakce šíří po síti, dostávají se do bloků a klienti se dozvídají o nových blocích.

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### Stavové metody {#state-methods}

> Metody, které informují o aktuálním stavu všech uložených dat. „Stav“ je jako jedna velká sdílená paměť RAM a zahrnuje zůstatky na účtech, data kontraktů a odhady gasu.

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### Historické metody {#history-methods}

> Získávají historické záznamy každého bloku až po genesis blok. Je to jako jeden velký soubor, do kterého lze pouze přidávat (append-only), a obsahuje všechny hlavičky bloků, těla bloků, uncle bloky a stvrzenky transakcí.

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

## JSON-RPC API Playground {#json-rpc-api-playground}

Můžete použít [nástroj playground](https://ethereum-json-rpc.com) k objevování a vyzkoušení metod API. Také vám ukáže, které metody a sítě jsou podporovány různými poskytovateli uzlů.

## Metody JSON-RPC API {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

Vrací aktuální verzi klienta.

**Parametry**

Žádné

**Vrací**

`String` - Aktuální verze klienta

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Výsledek
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

Vrací Keccak-256 (_nikoli_ standardizovaný SHA3-256) zadaných dat.

**Parametry**

1. `DATA` - Data k převodu na SHA3 hash

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Vrací**

`DATA` - Výsledek SHA3 zadaného řetězce.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Výsledek
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

Vrací aktuální ID sítě.

**Parametry**

Žádné

**Vrací**

`String` - Aktuální ID sítě.

Úplný seznam aktuálních ID sítí je k dispozici na [chainlist.org](https://chainlist.org). Mezi ty běžné patří:

- `1`: Ethereum Mainnet
- `11155111`: Sepolia testnet
- `560048` : Hoodi testnet

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Výsledek
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

Vrací `true`, pokud klient aktivně naslouchá síťovým připojením.

**Parametry**

Žádné

**Vrací**

`Boolean` - `true`, když naslouchá, jinak `false`.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Výsledek
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

Vrací počet peerů aktuálně připojených ke klientovi.

**Parametry**

Žádné

**Vrací**

`QUANTITY` - celé číslo udávající počet připojených peerů.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Výsledek
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

Vrací aktuální verzi protokolu Ethereum. Vezměte na vědomí, že tato metoda [není dostupná v Gethu](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Parametry**

Žádné

**Vrací**

`String` - Aktuální verze protokolu Ethereum

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Výsledek
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

Vrací objekt s daty o stavu synchronizace nebo `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

Žádné

**Vrací**

Přesná návratová data se liší mezi implementacemi klientů. Všichni klienti vrací `False`, když se uzel nesynchronizuje, a všichni klienti vrací následující pole.

`Object|Boolean`, Objekt s daty o stavu synchronizace nebo `FALSE`, když se nesynchronizuje:

- `startingBlock`: `QUANTITY` - Blok, na kterém začal import (bude resetováno pouze poté, co synchronizace dosáhne svého vrcholu)
- `currentBlock`: `QUANTITY` - Aktuální blok, stejné jako eth_blockNumber
- `highestBlock`: `QUANTITY` - Odhadovaný nejvyšší blok

Jednotliví klienti však mohou poskytovat i další data. Například Geth vrací následující:

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

Další podrobnosti naleznete v dokumentaci vašeho konkrétního klienta.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Nebo když neprobíhá synchronizace
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

Vrací adresu coinbase klienta.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

> **Poznámka:** Tato metoda je od verze **v1.14.0** zastaralá a již není podporována. Pokus o její použití povede k chybě „Method not supported“.

**Parametry**

Žádné

**Vrací**

`DATA`, 20 bajtů – aktuální adresa coinbase.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Výsledek
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

Vrací ID řetězce používané pro podepisování transakcí chráněných proti znovupřehrání.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

Žádné

**Vrací**

`chainId`, hexadecimální hodnota jako řetězec představující celé číslo aktuálního ID řetězce.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Výsledek
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

Vrací `true`, pokud klient aktivně těží nové bloky. Toto může vrátit `true` pouze pro sítě s důkazem prací (PoW) a od [Merge](/roadmap/merge/) to v některých klientech nemusí být dostupné.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

Žádné

**Vrací**

`Boolean` - vrací `true`, pokud klient těží, jinak `false`.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

Vrací počet hashů za sekundu, se kterými uzel těží. Toto může vrátit `true` pouze pro sítě využívající důkaz prací (PoW) a v některých klientech to nemusí být dostupné od [Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

Žádné

**Vrací**

`QUANTITY` - počet hashů za sekundu.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Výsledek
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

Vrací odhad aktuální ceny za gas ve Wei. Například klient Besu standardně prozkoumá posledních 100 bloků a vrátí mediánovou cenu za jednotku gasu.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

Žádné

**Vrací**

`QUANTITY` - celé číslo udávající aktuální cenu plynu ve Wei.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Výsledek
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

Vrací seznam adres vlastněných klientem.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

Žádné

**Vrací**

`Array of DATA`, 20 bajtů - adresy vlastněné klientem.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

Vrací číslo nejnovějšího bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

Žádné

**Vrací**

`QUANTITY` - celé číslo aktuálního čísla bloku, na kterém se klient nachází.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Výsledek
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

Vrací zůstatek účtu na dané adrese.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtů - adresa, u které se má zkontrolovat zůstatek.
2. `QUANTITY|TAG` - celé číslo bloku, nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"` nebo `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Vrací**

`QUANTITY` - celé číslo aktuálního zůstatku ve Wei.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

Vrací hodnotu z pozice úložiště na dané adrese.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtů - adresa úložiště.
2. `QUANTITY` - celé číslo pozice v úložišti.
3. `QUANTITY|TAG` - celé číslo bloku, nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

**Vrací**

`DATA` - hodnota na této pozici v úložišti.

**Příklad**
Výpočet správné pozice závisí na úložišti, které se má načíst. Uvažujme následující kontrakt nasazený na `0x295a70b2de5e3953354a6a8344e616ed314d7251` adresou `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

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

Získání prvku z mapy je složitější. Pozice prvku v mapě se vypočítá pomocí:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

To znamená, že pro získání úložiště na pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] musíme vypočítat pozici pomocí:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

K výpočtu lze použít konzoli Geth, která je součástí knihovny Web3:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Nyní k načtení úložiště:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

Vrací počet transakcí _odeslaných_ z dané adresy.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtů - adresa.
2. `QUANTITY|TAG` - celé číslo bloku, nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"` nebo `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // stav v nejnovějším bloku
]
```

**Vrací**

`QUANTITY` - celé číslo udávající počet transakcí odeslaných z této adresy.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

Vrací počet transakcí v bloku, který odpovídá zadanému hashi bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů - hash bloku

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Vrací**

`QUANTITY` - celé číslo udávající počet transakcí v tomto bloku.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

Vrací počet transakcí v bloku odpovídajícím zadanému číslu bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - celé číslo představující číslo bloku, nebo řetězec `"earliest"`, `"latest"`, `"pending"`, `"safe"` nebo `"finalized"`, jako v [parametru bloku](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Vrací**

`QUANTITY` - celé číslo představující počet transakcí v tomto bloku.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

Vrací počet uncle bloků v bloku odpovídajícím zadanému hashi bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů - hash bloku

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Vrací**

`QUANTITY` - celé číslo udávající počet uncle bloků v tomto bloku.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

Vrací počet uncle bloků v bloku odpovídajícím zadanému číslu bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - celé číslo představující číslo bloku, nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"` nebo `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Vrací**

`QUANTITY` - celé číslo představující počet uncle bloků v tomto bloku.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

Vrací kód na dané adrese.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtů - adresa
2. `QUANTITY|TAG` - celočíselné číslo bloku, nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"` nebo `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Vrací**

`DATA` - kód z dané adresy.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

Metoda sign vypočítá specifický podpis pro Ethereum pomocí: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Přidáním předpony ke zprávě se vypočítaný podpis stane rozpoznatelným jako specifický podpis pro Ethereum. To zabraňuje zneužití, kdy by škodlivá decentralizovaná aplikace (dapp) mohla podepsat libovolná data (např. transakci) a použít podpis k vydávání se za oběť.

Poznámka: adresa, kterou se má podepisovat, musí být odemčená.

**Parametry**

1. `DATA`, 20 bajtů - adresa
2. `DATA`, N bajtů - zpráva k podepsání

**Vrací**

`DATA`: Podpis

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

Podepíše transakci, která může být později odeslána do sítě pomocí [eth_sendRawTransaction](#eth-sendrawtransaction).

**Parametry**

1. `Object` - Objekt transakce

- `type`:
- `from`: `DATA`, 20 bajtů - Adresa, ze které je transakce odeslána.
- `to`: `DATA`, 20 bajtů - (volitelné při vytváření nového kontraktu) Adresa, na kterou je transakce směrována.
- `gas`: `QUANTITY` - (volitelné, výchozí: 90000) Celé číslo udávající gas poskytnutý pro provedení transakce. Nevyužitý gas bude vrácen.
- `gasPrice`: `QUANTITY` - (volitelné, výchozí: bude určeno) Celé číslo udávající gasPrice použitou pro každý zaplacený gas, ve Wei.
- `value`: `QUANTITY` - (volitelné) Celé číslo udávající hodnotu odeslanou s touto transakcí, ve Wei.
- `data`: `DATA` - Zkompilovaný kód kontraktu NEBO hash podpisu volané metody a zakódovaných parametrů.
- `nonce`: `QUANTITY` - (volitelné) Celé číslo udávající nonce. To umožňuje přepsat vaše vlastní čekající transakce, které používají stejnou nonce.

**Vrací**

`DATA`, RLP zakódovaný objekt transakce podepsaný zadaným účtem.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Výsledek
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

Vytvoří novou transakci volání zprávy nebo vytvoření kontraktu, pokud datové pole obsahuje kód, a podepíše ji pomocí účtu specifikovaného v `from`.

**Parametry**

1. `Object` - Objekt transakce

- `from`: `DATA`, 20 bajtů - Adresa, ze které je transakce odeslána.
- `to`: `DATA`, 20 bajtů - (volitelné při vytváření nového kontraktu) Adresa, na kterou je transakce směrována.
- `gas`: `QUANTITY` - (volitelné, výchozí: 90000) Celé číslo udávající gas poskytnutý pro provedení transakce. Vrátí nepoužitý gas.
- `gasPrice`: `QUANTITY` - (volitelné, výchozí: bude určeno) Celé číslo udávající cenu plynu použitou pro každý zaplacený gas.
- `value`: `QUANTITY` - (volitelné) Celé číslo udávající hodnotu odeslanou s touto transakcí.
- `input`: `DATA` - Zkompilovaný kód kontraktu NEBO hash podpisu volané metody a zakódovaných parametrů.
- `nonce`: `QUANTITY` - (volitelné) Celé číslo udávající nonce. To umožňuje přepsat vaše vlastní čekající transakce, které používají stejnou nonce.

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

**Vrací**

`DATA`, 32 bajtů - hash transakce, nebo nulový hash, pokud transakce ještě není k dispozici.

Pro získání adresy kontraktu (pokud jste kontrakt vytvořili) použijte [eth_getTransactionReceipt](#eth-gettransactionreceipt) poté, co byla transakce navržena v bloku.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

Vytváří novou transakci volání zprávy nebo vytvoření kontraktu pro podepsané transakce.

**Parametry**

1. `DATA`, Podepsaná data transakce.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Vrací**

`DATA`, 32 bajtů - hash transakce, nebo nulový hash, pokud transakce ještě není k dispozici.

Pokud jste vytvořili kontrakt, použijte [eth_getTransactionReceipt](#eth-gettransactionreceipt) k získání adresy kontraktu poté, co byla transakce navržena v bloku.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

Okamžitě provede nové volání zprávy bez vytvoření transakce na blockchainu. Často se používá k provádění funkcí chytrých kontraktů pouze pro čtení, například `balanceOf` pro kontrakt ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `Object` - Objekt volání transakce

- `from`: `DATA`, 20 bajtů - (volitelné) Adresa, ze které je transakce odeslána.
- `to`: `DATA`, 20 bajtů - Adresa, na kterou je transakce směrována.
- `gas`: `QUANTITY` - (volitelné) Celé číslo udávající gas poskytnutý pro provedení transakce. eth_call nespotřebovává žádný gas, ale tento parametr může být u některých spuštění vyžadován.
- `gasPrice`: `QUANTITY` - (volitelné) Celé číslo udávající gasPrice použitou pro každý zaplacený gas
- `value`: `QUANTITY` - (volitelné) Celé číslo udávající hodnotu odeslanou s touto transakcí
- `input`: `DATA` - (volitelné) Hash podpisu metody a zakódovaných parametrů. Podrobnosti viz [Ethereum Contract ABI v dokumentaci Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - celé číslo bloku, nebo řetězec `"latest"`, `"earliest"`, `"pending"`, `"safe"` nebo `"finalized"`, viz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

**Vrací**

`DATA` - návratová hodnota provedeného kontraktu.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

Generuje a vrací odhad toho, kolik gasu je potřeba k dokončení transakce. Transakce nebude přidána na blockchain. Vezměte na vědomí, že odhad může být z různých důvodů, včetně mechanismů EVM a výkonu uzlu, výrazně vyšší než množství gasu skutečně spotřebovaného transakcí.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

Viz parametry [eth_call](#eth-call) s tím rozdílem, že všechny vlastnosti jsou volitelné. Pokud není specifikován žádný limit plynu, geth použije jako horní hranici limit plynu z čekajícího bloku. V důsledku toho vrácený odhad nemusí stačit k provedení volání/transakce, pokud je množství gasu vyšší než limit plynu čekajícího bloku.

**Vrací**

`QUANTITY` - množství spotřebovaného gasu.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

Vrací informace o bloku podle hashe.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů - Hash bloku.
2. `Boolean` - Pokud je `true`, vrací celé objekty transakcí, pokud je `false`, vrací pouze hashe transakcí.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Vrací**

`Object` - Objekt bloku, nebo `null`, pokud nebyl nalezen žádný blok:

- `number`: `QUANTITY` - číslo bloku. `null`, pokud se jedná o čekající blok.
- `hash`: `DATA`, 32 bajtů - hash bloku. `null`, pokud se jedná o čekající blok.
- `parentHash`: `DATA`, 32 bajtů - hash rodičovského bloku.
- `nonce`: `DATA`, 8 bajtů - hash vygenerovaného důkazu prací (PoW). `null`, pokud se jedná o čekající blok, `0x0` pro bloky s důkazem podílem (PoS) (od Merge).
- `sha3Uncles`: `DATA`, 32 bajtů - SHA3 dat uncle bloků v bloku.
- `logsBloom`: `DATA`, 256 bajtů - bloom filter pro logy bloku. `null`, pokud se jedná o čekající blok.
- `transactionsRoot`: `DATA`, 32 bajtů - kořen transakční trie bloku.
- `stateRoot`: `DATA`, 32 bajtů - kořen finální stavové trie bloku.
- `receiptsRoot`: `DATA`, 32 bajtů - kořen trie stvrzenek bloku.
- `miner`: `DATA`, 20 bajtů - adresa příjemce, kterému byly uděleny odměny za blok.
- `difficulty`: `QUANTITY` - celé číslo představující obtížnost tohoto bloku.
- `totalDifficulty`: `QUANTITY` - celé číslo představující celkovou obtížnost řetězce až po tento blok.
- `extraData`: `DATA` - pole „extra data“ tohoto bloku.
- `size`: `QUANTITY` - celé číslo představující velikost tohoto bloku v bajtech.
- `gasLimit`: `QUANTITY` - maximální povolený gas v tomto bloku.
- `gasUsed`: `QUANTITY` - celkový gas spotřebovaný všemi transakcemi v tomto bloku.
- `timestamp`: `QUANTITY` - unixové časové razítko (timestamp) okamžiku, kdy byl blok sestaven.
- `transactions`: `Array` - Pole objektů transakcí, nebo 32bajtových hashů transakcí v závislosti na posledním zadaném parametru.
- `uncles`: `Array` - Pole hashů uncle bloků.

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

### eth_getBlockByNumber {#eth-getblockbynumber}

Vrací informace o bloku podle čísla bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - celé číslo čísla bloku, nebo řetězec `"earliest"`, `"latest"`, `"pending"`, `"safe"` nebo `"finalized"`, jako v [parametru bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - Pokud je `true`, vrátí celé objekty transakcí, pokud je `false`, vrátí pouze hashe transakcí.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Vrací**
Viz [eth_getBlockByHash](#eth-getblockbyhash)

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Výsledek viz [eth_getBlockByHash](#eth-getblockbyhash)

### eth_getTransactionByHash {#eth-gettransactionbyhash}

Vrací informace o transakci vyžádané pomocí hashe transakce.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů - hash transakce

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Vrací**

`Object` - Objekt transakce, nebo `null`, pokud nebyla nalezena žádná transakce:

- `blockHash`: `DATA`, 32 bajtů - hash bloku, ve kterém se tato transakce nacházela. `null`, pokud čeká na vyřízení.
- `blockNumber`: `QUANTITY` - číslo bloku, ve kterém se tato transakce nacházela. `null`, pokud čeká na vyřízení.
- `from`: `DATA`, 20 bajtů - adresa odesílatele.
- `gas`: `QUANTITY` - gas poskytnutý odesílatelem.
- `gasPrice`: `QUANTITY` - cena plynu poskytnutá odesílatelem ve Wei.
- `hash`: `DATA`, 32 bajtů - hash transakce.
- `input`: `DATA` - data odeslaná spolu s transakcí.
- `nonce`: `QUANTITY` - počet transakcí provedených odesílatelem před touto transakcí.
- `to`: `DATA`, 20 bajtů - adresa příjemce. `null`, pokud se jedná o transakci vytvoření kontraktu.
- `transactionIndex`: `QUANTITY` - celé číslo pozice indexu transakce v bloku. `null`, pokud čeká na vyřízení.
- `value`: `QUANTITY` - převedená hodnota ve Wei.
- `v`: `QUANTITY` - ID obnovy ECDSA
- `r`: `QUANTITY` - podpis ECDSA r
- `s`: `QUANTITY` - podpis ECDSA s

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Výsledek
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

Vrací informace o transakci podle hashe bloku a pozice indexu transakce.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů - hash bloku.
2. `QUANTITY` - celé číslo pozice indexu transakce.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Vrací**
Viz [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Výsledek viz [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

Vrací informace o transakci podle čísla bloku a pozice indexu transakce.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - číslo bloku, nebo řetězec `"earliest"`, `"latest"`, `"pending"`, `"safe"` nebo `"finalized"`, jako v [parametru bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - pozice indexu transakce.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Vrací**
Viz [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Výsledek viz [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

Vrací stvrzenku transakce podle hashe transakce.

**Poznámka:** Stvrzenka není k dispozici pro čekající transakce.

**Parametry**

1. `DATA`, 32 bajtů - hash transakce

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Vrací**
`Object` - Objekt stvrzenky transakce, nebo `null`, pokud nebyla nalezena žádná stvrzenka:

- `transactionHash `: `DATA`, 32 bajtů - hash transakce.
- `transactionIndex`: `QUANTITY` - celé číslo pozice indexu transakce v bloku.
- `blockHash`: `DATA`, 32 bajtů - hash bloku, ve kterém se tato transakce nacházela.
- `blockNumber`: `QUANTITY` - číslo bloku, ve kterém se tato transakce nacházela.
- `from`: `DATA`, 20 bajtů - adresa odesílatele.
- `to`: `DATA`, 20 bajtů - adresa příjemce. null, pokud se jedná o transakci vytvoření kontraktu.
- `cumulativeGasUsed` : `QUANTITY ` - Celkové množství gasu spotřebovaného při provedení této transakce v bloku.
- `effectiveGasPrice` : `QUANTITY` - Součet základního poplatku a prioritního poplatku zaplaceného za jednotku gasu.
- `gasUsed `: `QUANTITY ` - Množství gasu spotřebovaného pouze touto konkrétní transakcí.
- `contractAddress `: `DATA`, 20 bajtů - Adresa vytvořeného kontraktu, pokud se jednalo o transakci vytvoření kontraktu, jinak `null`.
- `logs`: `Array` - Pole objektů logů, které tato transakce vygenerovala.
- `logsBloom`: `DATA`, 256 bajtů - Bloomův filtr pro lehké klienty k rychlému získání souvisejících logů.
- `type`: `QUANTITY` - celé číslo typu transakce, `0x0` pro starší (legacy) transakce, `0x1` pro typy se seznamem přístupů (access list), `0x2` pro dynamické poplatky.

Vrací také _buď_ :

- `root` : `DATA` 32 bajtů kořene stavu po transakci (před aktualizací Byzantium)
- `status`: `QUANTITY` buď `1` (úspěch), nebo `0` (selhání)

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Výsledek
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
      // logy, jak je vrací getFilterLogs atd.
    }],
    "logsBloom": "0x00...0", // 256bajtový Bloomův filtr
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

Vrací informace o strýci bloku podle hashe a pozice indexu strýce.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajtů - Hash bloku.
2. `QUANTITY` - Pozice indexu strýce.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Vrací**
Viz [eth_getBlockByHash](#eth-getblockbyhash)

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Výsledek viz [eth_getBlockByHash](#eth-getblockbyhash)

**Poznámka**: Strýc neobsahuje jednotlivé transakce.

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

Vrací informace o uncle bloku podle čísla bloku a pozice indexu uncle bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Vyzkoušet endpoint v playgroundu
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - číslo bloku, nebo řetězec `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, jako v [parametru bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - pozice indexu uncle bloku.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Vrací**
Viz [eth_getBlockByHash](#eth-getblockbyhash)

**Poznámka**: Uncle blok neobsahuje jednotlivé transakce.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Výsledek viz [eth_getBlockByHash](#eth-getblockbyhash)

### eth_newFilter {#eth-newfilter}

Vytvoří objekt filtru na základě možností filtru, aby upozornil na změnu stavu (logy).
Chcete-li zkontrolovat, zda se stav změnil, zavolejte [eth_getFilterChanges](#eth-getfilterchanges).

**Poznámka k zadávání filtrů témat:**
Témata závisí na pořadí. Transakce s logem s tématy [A, B] bude odpovídat následujícím filtrům témat:

- `[]` "cokoliv"
- `[A]` "A na první pozici (a cokoliv po něm)"
- `[null, B]` "cokoliv na první pozici A ZÁROVEŇ B na druhé pozici (a cokoliv po něm)"
- `[A, B]` "A na první pozici A ZÁROVEŇ B na druhé pozici (a cokoliv po něm)"
- `[[A, B], [A, B]]` "(A NEBO B) na první pozici A ZÁROVEŇ (A NEBO B) na druhé pozici (a cokoliv po něm)"
- **Parametry**

1. `Object` - Možnosti filtru:

- `fromBlock`: `QUANTITY|TAG` - (volitelné, výchozí: `"latest"`) Celočíselné číslo bloku, nebo `"latest"` pro poslední navržený blok, `"safe"` pro nejnovější bezpečný blok, `"finalized"` pro nejnovější finalizovaný blok, nebo `"pending"`, `"earliest"` pro transakce, které ještě nejsou v bloku.
- `toBlock`: `QUANTITY|TAG` - (volitelné, výchozí: `"latest"`) Celočíselné číslo bloku, nebo `"latest"` pro poslední navržený blok, `"safe"` pro nejnovější bezpečný blok, `"finalized"` pro nejnovější finalizovaný blok, nebo `"pending"`, `"earliest"` pro transakce, které ještě nejsou v bloku.
- `address`: `DATA|Array`, 20 bajtů - (volitelné) Adresa kontraktu nebo seznam adres, ze kterých by měly logy pocházet.
- `topics`: `Array of DATA`, - (volitelné) Pole 32bajtových `DATA` témat. Témata závisí na pořadí. Každé téma může být také polem DATA s možnostmi „nebo“ (or).

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

**Vrací**
`QUANTITY` - ID filtru.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

Vytvoří filtr v uzlu, který upozorní na příchod nového bloku.
Chcete-li zkontrolovat, zda se změnil stav, zavolejte [eth_getFilterChanges](#eth-getfilterchanges).

**Parametry**
Žádné

**Vrací**
`QUANTITY` - ID filtru.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Výsledek
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

Vytvoří filtr v uzlu, který upozorní na příchod nových čekajících transakcí.
Chcete-li zkontrolovat, zda se stav změnil, zavolejte [eth_getFilterChanges](#eth-getfilterchanges).

**Parametry**
Žádné

**Vrací**
`QUANTITY` - ID filtru.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Výsledek
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

Odinstaluje filtr se zadaným ID. Mělo by se volat vždy, když už sledování není potřeba.
Navíc platnost filtrů vyprší, pokud nejsou po určitou dobu dotazovány pomocí [eth_getFilterChanges](#eth-getfilterchanges).

**Parametry**

1. `QUANTITY` - ID filtru.

```js
params: [
  "0xb", // 11
]
```

**Vrací**
`Boolean` - `true`, pokud byl filtr úspěšně odinstalován, jinak `false`.

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Výsledek
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

Metoda dotazování pro filtr, která vrací pole logů, které se vyskytly od posledního dotazu.

**Parametry**

1. `QUANTITY` - ID filtru.

```js
params: [
  "0x16", // 22
]
```

**Vrací**
`Array` - Pole objektů logů, nebo prázdné pole, pokud se od posledního dotazu nic nezměnilo.

- Pro filtry vytvořené pomocí `eth_newBlockFilter` jsou návratovou hodnotou hashe bloků (`DATA`, 32 bajtů), např. `["0x3454645634534..."]`.
- Pro filtry vytvořené pomocí `eth_newPendingTransactionFilter ` jsou návratovou hodnotou hashe transakcí (`DATA`, 32 bajtů), např. `["0x6345343454645..."]`.
- Pro filtry vytvořené pomocí `eth_newFilter` jsou logy objekty s následujícími parametry:
  - `removed`: `TAG` - `true`, když byl log odstraněn kvůli reorganizaci řetězce. `false`, pokud se jedná o platný log.
  - `logIndex`: `QUANTITY` - celé číslo pozice indexu logu v bloku. `null`, když se jedná o čekající log.
  - `transactionIndex`: `QUANTITY` - celé číslo pozice indexu transakce, ze které byl log vytvořen. `null`, když se jedná o čekající log.
  - `transactionHash`: `DATA`, 32 bajtů - hash transakce, ze které byl tento log vytvořen. `null`, když se jedná o čekající log.
  - `blockHash`: `DATA`, 32 bajtů - hash bloku, ve kterém se tento log nacházel. `null`, když čeká na vyřízení. `null`, když se jedná o čekající log.
  - `blockNumber`: `QUANTITY` - číslo bloku, ve kterém se tento log nacházel. `null`, když čeká na vyřízení. `null`, když se jedná o čekající log.
  - `address`: `DATA`, 20 bajtů - adresa, ze které tento log pochází.
  - `data`: `DATA` - neindexovaná data logu s proměnnou délkou. (V _Solidity_: nula nebo více 32bajtových neindexovaných argumentů logu.)
  - `topics`: `Array of DATA` - Pole 0 až 4 32bajtových `DATA` indexovaných argumentů logu. (V _Solidity_: Prvním tématem je _hash_ podpisu události (např. `Deposit(address,bytes32,uint256)`), pokud jste událost nedeklarovali pomocí specifikátoru `anonymous`.)

- **Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Výsledek
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

Vrací pole všech logů odpovídajících filtru s daným id.

**Parametry**

1. `QUANTITY` - Id filtru.

```js
params: [
  "0x16", // 22
]
```

**Vrací**
Viz [eth_getFilterChanges](#eth-getfilterchanges)

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Výsledek viz [eth_getFilterChanges](#eth-getfilterchanges)

### eth_getLogs {#eth-getlogs}

Vrací pole všech logů odpovídajících danému objektu filtru.

**Parametry**

1. `Object` - Možnosti filtru:

- `fromBlock`: `QUANTITY|TAG` - (volitelné, výchozí: `"latest"`) Celočíselné číslo bloku, nebo `"latest"` pro poslední navržený blok, `"safe"` pro nejnovější bezpečný blok, `"finalized"` pro nejnovější finalizovaný blok, nebo `"pending"`, `"earliest"` pro transakce, které ještě nejsou v bloku.
- `toBlock`: `QUANTITY|TAG` - (volitelné, výchozí: `"latest"`) Celočíselné číslo bloku, nebo `"latest"` pro poslední navržený blok, `"safe"` pro nejnovější bezpečný blok, `"finalized"` pro nejnovější finalizovaný blok, nebo `"pending"`, `"earliest"` pro transakce, které ještě nejsou v bloku.
- `address`: `DATA|Array`, 20 bajtů - (volitelné) Adresa kontraktu nebo seznam adres, ze kterých by měly logy pocházet.
- `topics`: `Array of DATA`, - (volitelné) Pole 32bajtových `DATA` témat (topics). Témata závisí na pořadí. Každé téma může být také polem DATA s možnostmi „nebo“ (or).
- `blockHash`: `DATA`, 32 bajtů - (volitelné, **budoucí**) S přidáním EIP-234 bude `blockHash` novou možností filtru, která omezí vrácené logy na jediný blok s 32bajtovým hashem `blockHash`. Použití `blockHash` je ekvivalentní `fromBlock` = `toBlock` = číslo bloku s hashem `blockHash`. Pokud je `blockHash` přítomen v kritériích filtru, pak nejsou povoleny ani `fromBlock`, ani `toBlock`.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Vrací**
Viz [eth_getFilterChanges](#eth-getfilterchanges)

**Příklad**

```js
// Požadavek
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Výsledek viz [eth_getFilterChanges](#eth-getfilterchanges)

## Příklad použití {#usage-example}

### Nasazení kontraktu pomocí JSON-RPC {#deploying-contract}

Tato část obsahuje ukázku, jak nasadit kontrakt pouze pomocí RPC rozhraní. Existují i alternativní způsoby nasazení kontraktů, kde je tato složitost abstrahována – například pomocí knihoven postavených nad RPC rozhraním, jako jsou [Web3.js](https://web3js.readthedocs.io/) a [Web3.py](https://github.com/ethereum/web3.py). Tyto abstrakce jsou obecně snáze pochopitelné a méně náchylné k chybám, ale přesto je užitečné pochopit, jak to funguje pod pokličkou.

Následuje jednoduchý chytrý kontrakt s názvem `Multiply7`, který bude nasazen pomocí rozhraní JSON-RPC na uzel Etherea. Tento tutoriál předpokládá, že čtenář již provozuje uzel Geth. Více informací o uzlech a klientech je k dispozici [zde](/developers/docs/nodes-and-clients/run-a-node). Informace o tom, jak spustit HTTP JSON-RPC pro klienty jiné než Geth, naleznete v dokumentaci k jednotlivým [klientům](/developers/docs/nodes-and-clients/). Většina klientů ve výchozím nastavení běží na `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

První věc, kterou musíte udělat, je ujistit se, že je povoleno rozhraní HTTP RPC. To znamená, že při spuštění poskytneme Gethu příznak `--http`. V tomto příkladu používáme uzel Geth v soukromém vývojovém řetězci. Díky tomuto přístupu nepotřebujeme ether ve skutečné síti.

```bash
geth --http --dev console 2>>geth.log
```

Tím se spustí rozhraní HTTP RPC na `http://localhost:8545`.

Můžeme ověřit, že rozhraní běží, načtením adresy Coinbase (získáním první adresy z pole účtů) a zůstatku pomocí [curl](https://curl.se). Upozorňujeme, že data v těchto příkladech se budou na vašem lokálním uzlu lišit. Pokud si chcete tyto příkazy vyzkoušet, nahraďte parametry požadavku ve druhém požadavku curl výsledkem vráceným z prvního.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Protože jsou čísla kódována hexadecimálně, zůstatek se vrací ve Wei jako hexadecimální řetězec. Pokud chceme mít zůstatek v etheru jako číslo, můžeme použít Web3 z konzole Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Nyní, když je v našem soukromém vývojovém řetězci nějaký ether, můžeme nasadit kontrakt. Prvním krokem je kompilace kontraktu Multiply7 do bajtkódu, který lze odeslat do EVM. Pro instalaci solc, kompilátoru Solidity, postupujte podle [dokumentace Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Možná budete chtít použít starší verzi `solc`, aby odpovídala [verzi kompilátoru použité v našem příkladu](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Dalším krokem je kompilace kontraktu Multiply7 do bajtkódu, který lze odeslat do EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Nyní, když máme zkompilovaný kód, musíme určit, kolik gasu bude stát jeho nasazení. Rozhraní RPC má metodu `eth_estimateGas`, která nám poskytne odhad.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

A nakonec kontrakt nasadíme.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Transakce je přijata uzlem a je vrácen hash transakce. Tento hash lze použít ke sledování transakce. Dalším krokem je určení adresy, na které je náš kontrakt nasazen. Každá provedená transakce vytvoří stvrzenku. Tato stvrzenka obsahuje různé informace o transakci, například do kterého bloku byla transakce zahrnuta a kolik gasu EVM spotřeboval. Pokud transakce vytvoří kontrakt, bude obsahovat také adresu kontraktu. Stvrzenku můžeme získat pomocí RPC metody `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Náš kontrakt byl vytvořen na `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Nulový výsledek (null) místo stvrzenky znamená, že transakce ještě nebyla zahrnuta do bloku. Chvíli počkejte, zkontrolujte, zda běží váš konsensuální klient, a zkuste to znovu.

#### Interakce s chytrými kontrakty {#interacting-with-smart-contract}

V tomto příkladu budeme odesílat transakci pomocí `eth_sendTransaction` do metody `multiply` daného kontraktu.

`eth_sendTransaction` vyžaduje několik argumentů, konkrétně `from`, `to` a `data`. `From` je veřejná adresa našeho účtu a `to` je adresa kontraktu. Argument `data` obsahuje payload (užitečné zatížení), který definuje, jaká metoda musí být volána a s jakými argumenty. Zde vstupuje do hry [ABI (aplikační binární rozhraní)](https://docs.soliditylang.org/en/latest/abi-spec.html). ABI je soubor JSON, který definuje, jak definovat a kódovat data pro EVM.

Bajty payloadu definují, která metoda v kontraktu je volána. Jedná se o první 4 bajty z Keccak hashe názvu funkce a typů jejích argumentů, kódované hexadecimálně. Funkce multiply přijímá uint, což je alias pro uint256. To nám dává:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Dalším krokem je zakódování argumentů. Existuje pouze jeden uint256, řekněme hodnota 6. ABI má sekci, která specifikuje, jak kódovat typy uint256.

`int<M>: enc(X)` je big-endian kódování dvojkového doplňku X, doplněné na straně vyššího řádu (vlevo) hodnotou 0xff pro záporné X a nulovými bajty pro kladné X tak, aby délka byla násobkem 32 bajtů.

To se zakóduje jako `0000000000000000000000000000000000000000000000000000000000000006`.

Spojením selektoru funkce a zakódovaného argumentu budou naše data `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Toto lze nyní odeslat do uzlu:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Protože byla odeslána transakce, byl vrácen hash transakce. Načtení stvrzenky poskytne:

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

Stvrzenka obsahuje log. Tento log byl vygenerován EVM při provádění transakce a zahrnut do stvrzenky. Funkce `multiply` ukazuje, že byla vyvolána událost `Print` se vstupem vynásobeným 7. Vzhledem k tomu, že argumentem pro událost `Print` byl uint256, můžeme jej dekódovat podle pravidel ABI, což nám poskytne očekávanou desítkovou hodnotu 42. Kromě dat stojí za zmínku, že témata (topics) lze použít k určení, která událost vytvořila log:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Toto byl jen stručný úvod do některých nejběžnějších úloh, který demonstruje přímé použití JSON-RPC.

## Související témata {#related-topics}

- [Specifikace JSON-RPC](https://www.jsonrpc.org/specification)
- [Uzly a klienti](/developers/docs/nodes-and-clients/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [Backendová API](/developers/docs/apis/backend/)
- [Exekuční klienti](/developers/docs/nodes-and-clients/#execution-clients)
