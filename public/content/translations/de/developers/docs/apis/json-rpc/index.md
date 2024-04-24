---
title: JSON-RPC-API
description: Ein zustandsloses, leichtgewichtiges Remote Procedure Call (RPC)-Protokoll für Ethereum-Clients
lang: de
---

Damit eine Software-Anwendung mit der Ethereum-Blockchain interagieren kann – entweder um Blockchain-Daten zu lesen oder Transaktionen an das Netzwerk zu senden – muss sie mit einem Ethereum-Knoten verbunden werden.

Zu diesem Zweck implementiert jeder [Ethereum-Client](/developers/docs/nodes-and-clients/#execution-clients) eine [JSON-RPC-Spezifikation](https://github.com/ethereum/execution-apis), sodass eine einheitliche Methode vorliegt, auf die sich Anwendungen verlassen können, unabhängig von der spezifischen Nodes oder Client Implementierung.

[JSON-RPC](https://www.jsonrpc.org/specification) ist ein zustandsloses, leichtgewichtiges Remote-Prozeduraufruf-(RPC)-Protokoll. Es definiert mehrere Datenstrukturen und die Regeln für deren Verarbeitung. Sie ist transportunabhängig, da die Konzepte innerhalb eines Prozesses, über Sockets, über HTTP oder in vielen verschiedenen Nachrichtenübermittlungsumgebungen verwendet werden können. Verwendet wird dabei das Datenformat JSON (RFC 4627).

## Client-Implementierungen {#client-implementations}

Ethereum-Clients können bei der Implementierung der JSON-RPC-Spezifikation jeweils unterschiedliche Programmiersprachen verwenden. Weitere Details zu den einzelnen Programmiersprachen finden Sie in der [Client-Dokumentation](/developers/docs/nodes-and-clients/#execution-clients). Es wird empfohlen, dass Sie sich mit den neuesten Informationen zur API-Unterstützung in der Dokumentation des jeweiligen Clients vertraut machen.

## Komfortable Bibliotheken {#convenience-libraries}

Es ist möglich, über die JSAON-RPC-API direkt mit Ethereum-Clients zu interagieren, doch für dApp-Entwickler gibt es häufig einfachere Optionen. Es gibt viele [JavaScript-](/developers/docs/apis/javascript/#available-libraries) und [Backend-API-](/developers/docs/apis/backend/#available-libraries) Bibliotheken, die Wrapper für die JSON-RPC-API bereitstellen. Mithilfe dieser Bibliotheken können Entwickler intuitive, einzeilige Methoden in der Programmiersprache ihrer Wahl schreiben, um JSON-RPC-Anforderungen (unter der Haube) zu initialisieren, die mit Ethereum interagieren.

## Konsensclient-APIs {#consensus-clients}

Diese Seite befasst sich hauptsächlich mit der JSON-RPC-API, die von Ethereum-Ausführungsclients verwendet wird. Konsensclients haben jedoch auch eine RPC-API, mit der Benutzer Informationen über den Knoten abfragen sowie Beacon-Blöcke, Beacon-Zustand und andere konsensbezogene Informationen direkt von einem Knoten anfordern können. Diese API ist auf der Webseite [Beacon API](https://ethereum.github.io/beacon-APIs/#/) dokumentiert.

Es wird auch eine interne API für die Kommunikation zwischen Clients innerhalb eines Knotens verwendet, d. h. sie ermöglicht es dem Konsensclient und dem Ausführungsclient, Daten auszutauschen. Dies wird als „Engine API“ bezeichnet und die Spezifikationen sind auf [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) verfügbar.

## Spezifikationen des Ausführungsclients {#spec}

[ Lesen Sie die vollständige JSON-RPC-API-Spezifikation auf GitHub](https://github.com/ethereum/execution-apis).

## Konventionen {#conventions}

### Hexadezimalwert-Kodierung {#hex-encoding}

In JSON werden zwei Schlüssel-Datentypen übertragen: Roh-Byte-Arrays und Mengen. Beide werden mit einer Hex-Kodierung übertragen, haben jedoch unterschiedliche Anforderungen an das Format.

#### Mengen {#quantities-encoding}

Wenn Mengen (Ganzzahlen, Kommazahlen) kodiert werden: Als Hexadezimalwert kodieren, ein „0x“ als Präfix hinzufügen und die kompakteste Darstellung verwenden (kleine Ausnahme: Null sollte als „0x0“ dargestellt werden).

Hier sind einige Beispiele:

- 0x41 (entspricht Dezimalwert 65)
- 0x41 (entspricht Dezimalwert 1024)
- RICHTIG: „0x“ (sollte immer mindestens eine Ziffer enthalten - Null ist „0x0“)
- RICHTIG: „0x400“ (führende Nullen sind nicht zulässig)
- RICHTIG: „0xff“ (muss mit „0x“ prefixiert werden)

### Unformatierte Daten {#unformatted-data-encoding}

Wenn unformatierte Daten kodiert werden (Byte-Arrays, Kontoadressen, Hashes, Bytecode-Arrays): Als Hex kodieren, „0x“ als Präfix hinzufügen, zwei Hex-Ziffern pro Byte.

Hier sind einige Beispiele:

- 0x41 (Größe 1, „A“)
- 0x004200 (Größe 3, „\0B\0“)
- 0x (Größe 0, "")
- FALSCH: 0xf0f0f (muss eine gerade Anzahl von Ziffern haben)
- FALSCH: 004200 (muss 0x als Präfix hinzufügen)

### Der Standardblockparameter {#default-block}

Die folgenden Methoden haben einen zusätzlichen Standardblockparameter:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Wenn Anfragen gestellt werden, die den Zustand von Ethereum beeinflussen, bestimmt der letzte Standardblockparameter die Höhe des Blocks.

Folgende Optionen sind für den Standardblockparameter möglich:

- `HEX String` - eine ganzzahlige Blocknummer
- `String „frühestes“` für den frühesten/Genesis-Block
- `String „neueste“` - für den neuesten abgebauten Block
- `String „sicher“` - für den neuesten sicheren Block
- `String „finalisiert“` - für den neuesten finalisierten Block
- `String „ausstehend“` - für den ausstehenden Zustand/Transaktionen

## Beispiele

Auf dieser Seite stellen wir Beispiele dafür bereit, wie man einzelne JSON_RPC API-Endpunkte mit dem Befehlszeilenwerkzeug [curl](https://curl.se) verwendet. Diese Beispiele für einzelne Endpunkte finden sich im Abschnitt [Curl-Beispiele](#curl-examples) unten. Weiter unten auf der Seite stellen wir auch ein [End-to-End-Beispiel](#usage-example) bereit, wie man mithilfe eines Geth-Nodes, der JSON_RPC API und curl einen Smart Contract kompiliert und bereitstellt.

## Curl-Beispiele {#curl-examples}

Beispiele zur Verwendung der JSON_RPC-API durch Ausführen von [curl](https://curl.se)-Anfragen an einem Ethereum-Knoten werden unten bereitgestellt. Jedes Beispiel enthält eine Beschreibung des spezifischen Endpunkts, seiner Parameter, seines Rückgabetyps und ein Beispiel dafür, wie es verwendet werden sollte.

Es kann sein, dass die curl-Anfragen eine Fehlermeldung im Zusammenhang mit dem Inhaltstyp zurückgeben. Das liegt daran, dass die Option `--data` den Inhaltstyp auf `application/x-www-form-urlencoded` festlegt. Wenn Ihr Knoten sich darüber beschwert, setzen Sie den Header manuell, indem Sie am Anfang des Aufrufs `-H "Content-Type: application/json"` platzieren. In den Beispielen ist auch die URL/IP & Port-Kombination nicht enthalten, die als letztes Argument an curl übergeben werden muss (z. B. `127.0.0.1:8545`). Ein vollständiger curl-Aufruf, der diese zusätzlichen Daten enthält, hat folgende Form:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Kommunikation, Zustand, Verlauf {#gossip-state-history}

Eine Handvoll Kernmethoden von JSON-RPC erfordern Daten aus dem Ethereum-Netzwerk und gehören in drei Hauptkategorien: _Kommunikation, Zustand, Verlauf_. Verwenden Sie die Links in diesen Abschnitten, um zu jeder Methode zu springen, oder verwenden Sie das Inhaltsverzeichnis, um die gesamte Liste der Methoden zu durchsuchen.

### Kommunikationsmethoden {#gossip-methods}

> Diese Methoden verfolgen die Spitze der Blockchain. Das ist der Weg, wie Transaktionen sich im Netzwerk verbreiten, in Blöcke aufgenommen werden und wie Clients von neuen Blöcken erfahren.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Zustandsmethoden {#state_methods}

> Methoden, die den aktuellen Zustand aller gespeicherten Daten melden. Der „Zustand“ ist wie ein großes gemeinsames Stück RAM und enthält Kontostände, Vertragsdaten und Gasabschätzungen.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Verlaufsmethoden {#history_methods}

> Abrufen historischer Aufzeichnungen jedes Blocks bis zum Genesis-Block. Dies ist wie eine große Nur-hinzufügen-Datei, die alle Blockheaders, Blockinhalte, Onkelblöcke und Transaktionsbelege enthält.

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

## JSON-RPC API-Methoden {#json-rpc-methods}

### web3_ClientVersion {#web3_clientversion}

Gibt die aktuelle Client-Version zurück.

**Parameter**

Keine

**Rückgabewert**

`String` - Die aktuelle Client-Version

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Mist/v0.9.3/darwin/go1.4.1"
}
```

### web3_sha3 {#web3_sha3}

Gibt Keccak-256 (_nicht_ der standardisierte SHA3-256) von den gegebenen Daten zurück.

**Parameter**

1. `DATA` - Die Daten, die in einen SHA3-Hash konvertiert werden sollen

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Rückgabewert**

`DATA` - Das SHA3-Ergebnis des gegebenen Strings.

**Beispiel**

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

Gibt die aktuelle Netzwerk-ID zurück.

**Parameter**

Keine

**Rückgabewert**

`String` - Die aktuelle Netzwerk-ID.

Die vollständige Liste der aktuellen Netzwerk-IDs ist verfügbar unter [chainlist.org](https://chainlist.org). Einige häufige sind:

- `1`: Ethereum Mainnet
- `5`: Goerli Testnetz
- `11155111`: Sepolia Testnetz

**Beispiel**

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

Gibt `true` zurück, wenn der Client aktiv auf Netzwerkverbindungen hört.

**Parameter**

Keine

**Rückgabewert**

`Boolean` - `true`, wenn zuhörend, ansonsten `false`.

**Beispiel**

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

Gibt die Anzahl der aktuell mit dem Client verbundenen Peers zurück.

**Parameter**

Keine

**Rückgabewert**

`QUANTITY` - Ganzzahlwert, der die Anzahl der verbundenen Peers repräsentiert.

**Beispiel**

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

Gibt die aktuelle Ethereum-Protokollversion zurück. Beachten Sie, dass diese Methode [nicht in Geth verfügbar](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924) ist.

**Parameter**

Keine

**Rückgabewert**

`String` - Die aktuelle Ethereum-Protokollversion

**Beispiel**

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

Gibt ein Objekt mit Daten zum Synchronisierungsstatus oder `false` zurück.

**Parameter**

Keine

**Rückgabewert**

`Objekt|Boolean`, Ein Objekt mit Synchronisierungsstatus-Daten oder `FALSE`, wenn nicht synchronisiert wird:

- `startingBlock`: `QUANTITY` - Der Block, bei dem der Import begonnen hat (wird nur zurückgesetzt, nachdem die Synchronisierung ihren Kopf erreicht hat)
- `currentBlock`: `QUANTITY` - Der aktuelle Block, identisch zu eth_blockNumber
- `highestBlock`: `QUANTITY` - Der geschätzte höchste Block

**Beispiel**

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

Gibt die Coinbase-Adresse des Clients zurück.

**Parameter**

Keine

**Rückgabewert**

`DATA`, 20 Bytes - die aktuelle Coinbase-Adresse.

**Beispiel**

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

Gibt die Blockchain-ID zurück, die für das Signieren der Replay-geschützten Transaktionen verwendet wird.

**Parameter**

Keine

**Rückgabewert**

`chainId`, Hexadezimalwert als String, der den Ganzzahlwert der aktuellen Chain-ID repräsentiert.

**Beispiel**

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

Gibt `true` zurück, wenn der Client aktiv neue Blöcke schürft.

**Parameter**

Keine

**Rückgabewert**

`Boolean` - Gibt `true` zurück, wenn der Client aktiv mint, andernfalls `false`.

**Beispiel**

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

Gibt die Anzahl der Hashes pro Sekunde zurück, mit der die Node mint.

**Parameter**

Keine

**Rückgabewert**

`QUANTITY` - Anzahl der Hashes pro Sekunde.

**Beispiel**

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

Gibt den aktuellen Preis pro Gas in Wei zurück.

**Parameter**

Keine

**Rückgabewert**

`QUANTITY` - Ganzzahl des aktuellen Gaspreises in Wei.

**Beispiel**

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

Gibt eine Liste von Adressen zurück, die dem Client gehören.

**Parameter**

Keine

**Rückgabewert**

`Array von DATEN`, 20 Bytes - Adressen, die dem Client gehören.

**Beispiel**

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

Gibt die Anzahl des aktuellsten Blocks zurück.

**Parameter**

Keine (None)

**Rückgabewert**

`QUANTITY` - Ganzzahliger Wert der Blocknummer, auf der sich der Client derzeit befindet.

**Beispiel**

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

Gibt das Guthaben des Kontos der angegebenen Adresse zurück.

**Parameter**

1. `DATA`, 20 Bytes - Adresse, deren Guthaben überprüft werden soll.
2. `QUANTITY|TAG` – Ganzzahlige Blocknummer oder der String `"latest"`, `"earliest"` oder `"pending"`, siehe [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Rückgabewert**

`QUANTITY` ist ein Ganzzahlwert, der das aktuelle Gleichgewicht in Wei darstellt.

**Beispiel**

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

Gibt den Wert aus einer Speicherposition an einer gegebenen Adresse zurück.

**Parameter**

1. `DATA`, 20 Bytes - Adresse des Speichers.
2. `QUANTITY` - Ganzzahlwert der Position im Speicher.
3. `QUANTITY|TAG` – Ganzzahlige Blocknummer oder der String `"latest"`, `"earliest"` oder `"pending"`, siehe [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block)

**Rückgabewert**

`DATA` - Der Wert an dieser Speicherposition.

**Beispiel:** Die Berechnung der richtigen Position hängt vom abzurufenden Speicher ab. Betrachten Sie den folgenden Vertrag, der unter `0x295a70b2de5e3953354a6a8344e616ed314d7251` von der Adresse `0x391694e7e0b0cce554cb130d723a9d27458f9298` bereitgestellt wurde.

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

Das Abrufen des Wertes von pos0 ist einfach:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Das Abrufen eines Elements aus der Karte ist schwieriger. Die Position eines Elements in der Karte wird berechnet mit:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Das bedeutet, um den Speicher auf pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] abzurufen, müssen wir die Position berechnen mit:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Die Geth-Konsole, die mit der Web3-Bibliothek geliefert wird, kann verwendet werden, um die Berechnung durchzuführen:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Nun, um den Speicher abzurufen:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Gibt die Anzahl der _gesendeten_ Transaktionen von einer Adresse zurück.

**Parameter**

1. `DATA`, 20 Bytes - Adresse.
2. `QUANTITY|TAG` – Ganzzahlige Blocknummer oder der String `"latest"`, `"earliest"` oder `"pending"`, siehe [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**Rückgabewert**

`QUANTITY` - Ganzzahlwert der Anzahl der von dieser Adresse gesendeten Transaktionen.

**Beispiel**

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

Gibt die Anzahl der Transaktionen in einem Block zurück, der dem angegebenen Block-Hash entspricht.

**Parameter**

1. `DATA`, 32 Bytes - Hash eines Blocks

```js
params: ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"]
```

**Rückgabewert**

`QUANTITY` - Ganzzahlwert der Anzahl der Transaktionen in diesem Block.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xb" // 11
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Gibt die Anzahl der Transaktionen in einem Block zurück, die der gegebenen Blocknummer entsprechen.

**Parameter**

1. `QUANTITY|TAG` - Ganzzahlwert einer Blocknummer oder der String `"earliest"`, `"latest"` or `"pending"`, wie im [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block) beschrieben.

```js
params: [
  "0xe8", // 232
]
```

**Rückgabewert**

`QUANTITY` - Ganzzahlwert der Anzahl der Transaktionen in diesem Block.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa" // 10
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Gibt die Anzahl der Onkel in einem Block zurück, der der gegebenen Blockhash entspricht.

**Parameter**

1. `DATA`, 32 Bytes - Hash eines Blocks

```js
params: ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"]
```

**Rückgabewert**

`QUANTITY` - Ganzzahlwert für die Anzahl der Onkel in diesem Block.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Gibt die Anzahl der Onkel in einem Block zurück, der der gegebenen Blocknummer entspricht.

**Parameter**

1. `QUANTITY|TAG` - Ganzzahlwert einer Blocknummer oder der String „latest“, „earliest“ oder „pending“, wie im [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block) beschrieben

```js
params: [
  "0xe8", // 232
]
```

**Rückgabewert**

`QUANTITY` - Ganzzahlwert für die Anzahl der Onkel in diesem Block.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getCode {#eth_getcode}

Gibt den Code an einer gegebenen Adresse zurück.

**Parameter**

1. `DATA`, 20 Bytes - Adresse
2. `QUANTITY|TAG` – Ganzzahlige Blocknummer oder der String `"latest"`, `"earliest"` oder `"pending"`, siehe [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
  "0x2", // 2
]
```

**Rückgabewert**

`DATA` - Der Code von der angegebenen Adresse.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```

### eth_sign {#eth_sign}

Die Methode Unterschrift berechnet eine Ethereum-spezifische Signatur mit: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Durch das Hinzufügen eines Präfixes zur Nachricht wird die berechnete Signatur als Ethereum-spezifische Signatur erkennbar. Dies verhindert Missbrauch, bei dem eine bösartige dApp beliebige Daten (z. B. Transaktionen) signieren und die Signatur nutzen kann, um sich als Opfer auszugeben.

Hinweis: Die zum Signieren verwendete Adresse muss entsperrt sein.

**Parameter**

1. `DATA`, 20 Bytes - Adresse
2. `DATA`, N Bytes - Nachricht zum Signieren

**Rückgabewert**

`DATA`: Signatur

**Beispiel**

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

Signiert eine Transaktion, die zu einem späteren Zeitpunkt an das Netzwerk gesendet werden kann, indem sie mit [eth_sendRawTransaction](#eth_sendrawtransaction) verwendet wird.

**Parameter**

1. `Objekt` - Das Transaktionsobjekt

- `from`: `DATA`, 20 Bytes - Die Adresse, von der die Transaktion gesendet wird.
- `to`: `DATA`, 20 Bytes - (Optional beim Erstellen eines neuen Vertrags) Die Adresse, an die die Transaktion gerichtet ist.
- `gas`: `MENGE` - (Optional, Standard: 90000) Ganzzahl des Gases, das für die Transaktionsausführung bereitgestellt wurde. Es wird ungenutztes Gas zurückgegeben.
- `gasprice`: `QUANTITY` - (Optional, Standard: Noch zu bestimmen) Ganzzahlwert des Gaspreises, der für jedes bezahlte Gas in Wei verwendet wird.
- `value`: `QUANTITY` - (Optional) Ganzzahlwert, der mit dieser Transaktion in Wei gesendet wird.
- `data`: `DATA` - Der kompilierte Code eines Vertrags ODER der Hash der aufgerufenen Methode Signatur und codierter Parameter.
- `nonce`: `QUANTITY` - (Optional) Ganzzahl einer Nonce. Dies ermöglicht es, eigene ausstehende Transaktionen mit der gleichen Nonce zu überschreiben.

**Rückgabewert**

`DATA`, Das signierte Transaktionsobjekt.

**Beispiel**

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

Erzeugt eine neue Transaktion für einen Nachrichtenaufruf oder eine Vertragserstellung, wenn das Datenfeld einen Code enthält.

**Parameter**

1. `Objekt` - Das Transaktionsobjekt

- `from`: `DATA`, 20 Bytes - Die Adresse, von der die Transaktion gesendet wird.
- `to`: `DATA`, 20 Bytes - (Optional beim Erstellen eines neuen Vertrags) Die Adresse, an die die Transaktion gerichtet ist.
- `gas`: `MENGE` - (Optional, Standard: 90000) Ganzzahlwert des Gases, das für die Transaktionsausführung bereitgestellt wurde. Es wird ungenutztes Gas zurückgegeben.
- `gasprice`: `QUANTITY` – (Optional, Standard: Noch zu bestimmen) Ganzzahlwert des Gaspreises, der für jedes bezahlte Gas verwendet wird.
- `Value`: `QUANTITY` - (Optional) Ganzzahlwert des mit dieser Transaktion gesendeten Werts.
- `data`: `DATA` - Der kompilierte Code eines Vertrags ODER der Hash der aufgerufenen Methode Signatur und kodierter Parameter.
- `nonce`: `QUANTITY` - (Optional) Ganzzahlwert einer Nonce. Dies ermöglicht es, eigene ausstehende Transaktionen mit der gleichen Nonce zu überschreiben.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Rückgabewert**

`DATA`, 32 Bytes – Der Transaktions-Hash oder der Null-Hash, wenn die Transaktion noch nicht verfügbar ist.

Verwenden Sie [eth_getTransactionReceipt](#eth_gettransactionreceipt), um die Vertragsadresse zu erhalten, nachdem die Transaktion gemint wurde, als Sie einen Vertrag erstellt haben.

**Beispiel**

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

Erstellt eine neue Nachrichtenaufruftransaktion oder eine Vertragserstellung für signierte Transaktionen.

**Parameter**

1. `DATA`, Die signierten Transaktionsdaten.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Rückgabewert**

`DATA`, 32 Bytes – Der Transaktions-Hash oder der Null-Hash, wenn die Transaktion noch nicht verfügbar ist.

Verwenden Sie [eth_getTransactionReceipt](#eth_gettransactionreceipt), um die Vertragsadresse zu erhalten, nachdem die Transaktion gemint wurde, als Sie einen Vertrag erstellt haben.

**Beispiel**

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

Führt sofort einen neuen Nachrichtenaufruf aus, ohne eine Transaktion auf der Blockchain zu erstellen.

**Parameter**

1. `Object` - Das Transaktionsaufrufobjekt

- `from`: `DATA`, 20 Bytes - (Optional) Die Adresse, von der die Transaktion gesendet wird.
- `to`: `DATA`, 20 Bytes – Die Adresse, an die die Transaktion gerichtet ist.
- `gas`: `QUANTITY` - (Optional) Ganzzahlwert des für die Transaktionsausführung bereitgestellten Gases. eth_call verbraucht kein Gas, aber dieser Parameter kann von einigen Ausführungen benötigt werden.
- `gasprice`: `QUANTITY` - (Optional) Ganzzahlwert des Gaspreises, der für jedes bezahlte Gas verwendet wird
- `value`: `QUANTITY` - (Optional) Ganzzahlwert des mit dieser Transaktion gesendeten Werts
- `data`: `DATA` - (optional) Hash der Methode Unterschrift und der kodierten Parameter. Einzelheiten finden Sie unter [Ethereum Contract ABI in der Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/abi-spec.html)

2. `QUANTITY|TAG` – Ganzzahlige Blocknummer oder der String `"latest"`, `"earliest"` oder `"pending"`, siehe [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block)

**Rückgabewert**

`DATA` - Der Rückgabewert des ausgeführten Vertrages.

**Beispiel**

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

Generiert und gibt eine Schätzung zurück, wie viel Gas erforderlich ist, damit die Transaktion abgeschlossen werden kann. Die Transaktion wird nicht zur Blockchain hinzugefügt. Beachten Sie, dass die Schätzung aus verschiedenen Gründen, einschließlich der EVM-Mechanik und der Leistung des Knotens, erheblich höher sein kann als die tatsächlich von der Transaktion verbrauchte Gasmenge.

**Parameter**

Siehe [eth_call](#eth_call)-Parameter, mit Ausnahme, dass alle Eigenschaften optional sind. Wenn kein Gaslimit angegeben ist, verwendet Geth das Blockgaslimit aus dem anstehenden Block als Obergrenze. Infolgedessen reicht die zurückgegebene Schätzung möglicherweise nicht aus, um die Abfrage/Transaktion auszuführen, wenn die Gasmenge höher als das ausstehende Blockgaslimit ist.

**Rückgabewert**

`QUANTITY` - Die verbrauchte Gasmenge.

**Beispiel**

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

Gibt Informationen zu einem Block per Hash zurück.

**Parameter**

1. `DATA`, 32 Bytes - Hash eines Blocks.
2. `Boolean` - Bei `true` werden die vollständigen Transaktionsobjekte zurückgegeben, bei `false` nur die Hashes der Transaktionen.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Rückgabewert**

`Object` - Ein Blockobjekt oder `null`, wenn kein Block gefunden wurde:

- `number`: `QUANTITY` - Die Blocknummer. `null`, wenn es ein ausstehender Block ist.
- `hash`: `DATA`, 32 Bytes - Hash des Blocks. `null`, wenn es ein ausstehender Block ist.
- `parentHash`: `DATA`, 32 Bytes - Hash des übergeordneten Blocks.
- `nonce`: `DATA`, 8 Bytes - Hash des generierten Proof-of-Work. `null`, wenn es ein ausstehender Block ist.
- `sha3Uncles`: `DATA`, 32 Bytes - SHA3 der Onkeldaten im Block.
- `logsBloom`: `DATA`, 256 Bytes - Der Bloom-Filter für die Protokolle des Blocks. `null`, wenn es ein ausstehender Block ist.
- `TransaktionsRoot`: `DATA`, 32 Bytes - Das Stammverzeichnis der Transaktions-Trie des Blocks.
- `stateRoot`: `DATA`, 32 Bytes – Die Wurzel des endgültigen Zustands-Trie des Blocks.
- `receiptsRoot`: `DATA`, 32 Bytes - Die Wurzel des Quittungstries des Blocks.
- `miner`: `DATA`, 20 Bytes - Die Adresse des Begünstigten, dem die Mining-Belohnungen gegeben wurden.
- `difficulty`: `QUANTITY` - Ganzzahlwert der Schwierigkeit für diesen Block.
- `totalDifficulty`: `QUANTITY` - Ganzzahlwert der Gesamtschwierigkeit der Blockchain bis zu diesem Block.
- `extraData`: `DATA` - Das Feld „zusätzliche Daten“ dieses Blocks.
- `size`: `QUANTITY` - Ganzzahlwert der Größe dieses Blocks in Bytes.
- `gasLimit`: `QUANTITY` - Das maximal zulässige Gas in diesem Block.
- `gasUsed`: `QUANTITY` - Das insgesamt von allen Transaktionen in diesem Block verbrauchte Gas.
- `timestamp`: `QUANTITY` - Der Unix-Zeitstempel für den Zeitpunkt, zu dem der Block sortiert wurde.
- `transactions`: `Array` - Array von Transaktionsobjekten oder 32-Byte-Transaktions-Hashes, abhängig vom zuletzt angegebenen Parameter.
- `uncles`: `Array` - Array von Onkel-Hashes.

**Beispiel**

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

Gibt Informationen über eine Block-für-Block-Nummer zurück.

**Parameter**

1. `QUANTITY|TAG` - Ganzzahlwert einer Blocknummer oder der String `"earliest"`, `"latest"` or `"pending"`, wie im [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block) beschrieben.
2. `Boolean` - Bei `true` werden die vollständigen Transaktionsobjekte zurückgegeben, bei `false` nur die Hashes der Transaktionen.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Rückgabewerte** Siehe [eth_getBlockByHash](#eth_getblockbyhash)

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Ergebnis siehe [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Gibt die Informationen über eine Transaktion zurück, die anhand des Transaktions-Hashs angefordert wurde.

**Parameter**

1. `DATA`, 32 Bytes - Hash einer Transaktion

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Rückgabewert**

`Object` - Ein Transaktionsobjekt oder `null`, wenn keine Transaktion gefunden wurde:

- `blockHash`: `DATA`, 32 Bytes - Hash des Blocks, in dem sich diese Transaktion befand. `null`, wenn es aussteht.
- `blockNumber`: `QUANTITY` - Blocknummer, in der sich diese Transaktion befand. `null`, wenn es aussteht.
- `from`: `DATA`, 20 Bytes - Adresse des Senders.
- `gas`: `QUANTITY` - Vom Sender bereitgestelltes Gas.
- `gasPrice`: `QUANTITY` - Vom Sender bereitgestellter Gaspreis in Wei.
- `hash`: `DATA`, 32 Bytes - Hash der Transaktion.
- `input`: `DATA` - Die mit der Transaktion gesendeten Daten.
- `nonce`: `QUANTITY` - Die Anzahl der von dem Sender vor dieser Transaktion durchgeführten Transaktionen.
- `to`: `DATA`, 20 Bytes - Adresse des Empfängers. `null` wenn es sich um eine Vertragserstellungstransaktion handelt.
- `transactionIndex`: `QUANTITY` - Ganzzahlwert der Transaktionsindexposition im Block. `null`, wenn es aussteht.
- `value`: `QUANTITY` - Der übertragene Wert in Wei.
- `v`: `QUANTITY` - ECDSA Wiederherstellungs-ID
- `r`: `QUANTITY` - ECDSA Signatur r
- `s`: `QUANTITY` - ECDSA Signatur s

**Beispiel**

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

Gibt Informationen über eine Transaktion anhand des Block-Hashs und der Transaktionsindexposition zurück.

**Parameter**

1. `DATA`, 32 Bytes - Hash eines Blocks.
2. `QUANTITY` - Ganzzahlwert der Transaktionsindexposition.

```js
params: [
  "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
  "0x0", // 0
]
```

**Rückgabewert** Siehe [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b", "0x0"],"id":1}'
```

Ergebnis siehe [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Gibt Informationen über eine Transaktion anhand der Blocknummer und der Transaktionsindexposition zurück.

**Parameter**

1. `QUANTITY|TAG` - Eine Blocknummer oder die Zeichenfolge `"earliest"`, `"latest"` oder `"pending"`, wie im [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY` - Die Transaktionsindexposition.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Rückgabewert** Siehe [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Ergebnis siehe [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Gibt den Beleg einer Transaktion anhand des Transaktions-Hashs zurück.

**Hinweis** Der Beleg ist für ausstehende Transaktionen nicht verfügbar.

**Parameter**

1. `DATA`, 32 Bytes - Hash einer Transaktion

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Rückgabewert** `Object` - Ein Transaktionsbeleg-Objekt oder `null`, wenn kein Beleg gefunden wurde:

- `transactionHash`: `DATA`, 32 Bytes - Hash der Transaktion.
- `transactionIndex`: `QUANTITY` - Ganzzahlwert der Transaktionsindexposition im Block.
- `blockHash`: `DATA`, 32 Bytes - Hash des Blocks, in dem sich diese Transaktion befand.
- `blockNumber`: `QUANTITY` - Blocknummer, in der sich diese Transaktion befand.
- `from`: `DATA`, 20 Bytes - Adresse des Senders.
- `to`: `DATA`, 20 Bytes - Adresse des Empfängers. null, wenn es sich um eine Vertragserstellungstransaktion handelt.
- `cumulativeGasUsed` : `QUANTITY` - Die Gesamtmenge an Gas, die bei Ausführung dieser Transaktion im Block verwendet wurde.
- `effectiveGasPrice` : `QUANTITY` - Die Summe der Grundgebühr und der Tipp, die pro Einheit Gas bezahlt wurde.
- `gasUsed`: `QUANTITY` - Die Menge an Gas, die von dieser bestimmten Transaktion allein verwendet wurde.
- `contractAddress`: `DATA`, 20 Bytes - Die Vertragsadresse, die erstellt wurde, falls die Transaktion eine Vertragserstellung war, andernfalls `null`.
- `logs`: `Array` - Array von Log-Objekten, die diese Transaktion generiert hat.
- `logsBloom`: `DATA`, 256 Bytes - Bloom-Filter für leichte Clients, um schnell verwandte Logs abzurufen.
- `type`: `QUANTITY` - Ganzzahlwert des Transaktionstyps, `0x0` für veraltete Transaktionen, `0x1` für Zugriffslistentypen, `0x2` für dynamische Gebühren.

Es gibt auch _entweder_ zurück:

- `root` : `DATA` 32 Bytes des vorherigen Transaktions-Stateroots (vor Byzantium)
- `status`: `QUANTITY` entweder `1` (Erfolg) or `0` (Fehler)

**Beispiel**

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

Gibt Informationen über einen Onkel eines Blocks anhand von Hash und Onkel-Indexposition zurück.

**Parameter**

1. `DATA`, 32 Bytes - Der Hash eines Blocks.
2. `QUANTITY` - Die Indexposition des Onkels.

```js
params: [
  "0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b",
  "0x0", // 0
]
```

**Rückgabewerte** Siehe [eth_getBlockByHash](#eth_getblockbyhash)

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b", "0x0"],"id":1}'
```

Ergebnis siehe [eth_getBlockByHash](#eth_getblockbyhash)

**Hinweis**: Ein Onkel enthält keine einzelnen Transaktionen.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Gibt Informationen über einen Onkel eines Blocks nach Nummer und Indexposition des Onkels zurück.

**Parameter**

1. `QUANTITY|TAG` - Eine Blocknummer oder die Zeichenfolge `"earliest"`, `"latest"` oder `"pending"`, wie im [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY` - Die Indexposition des Onkels.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Rückgabewerte** Siehe [eth_getBlockByHash](#eth_getblockbyhash)

**Hinweis**: Ein Onkel enthält keine einzelnen Transaktionen.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Ergebnis siehe [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getCompilers {#eth_getcompilers}

Gibt eine Liste der verfügbaren Compiler im Client zurück.

**Parameter** Keine

**Rückgabewerte** `Array` – Array der verfügbaren Compiler.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCompilers","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["solidity", "lll", "serpent"]
}
```

### eth_compileSolidity {#eth_compile_solidity}

Gibt kompilierten Solidity Code zurück.

**Parameter**

1. `String` - Der Quellcode.

```js
params: [
  "contract test { function multiply(uint a) returns(uint d) {   return a * 7;   } }",
]
```

**Rückgabewerte** `DATA` - Der kompilierte Quellcode.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_compileSolidity","params":["contract test { function multiply(uint a) returns(uint d) {   return a * 7;   } }"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
      "code": "0x605880600c6000396000f3006000357c010000000000000000000000000000000000000000000000000000000090048063c6888fa114602e57005b603d6004803590602001506047565b8060005260206000f35b60006007820290506053565b91905056",
      "info": {
        "source": "contract test {\n   function multiply(uint a) constant returns(uint d) {\n       return a * 7;\n   }\n}\n",
        "language": "Solidity",
        "languageVersion": "0",
        "compilerVersion": "0.9.19",
        "abiDefinition": [
          {
            "constant": true,
            "inputs": [
              {
                "name": "a",
                "type": "uint256"
              }
            ],
            "name": "multiply",
            "outputs": [
              {
                "name": "d",
                "type": "uint256"
              }
            ],
            "type": "function"
          }
        ],
        "userDoc": {
          "methods": {}
        },
        "developerDoc": {
          "methods": {}
        }
      }
}
```

### eth_compileLLL {#eth_compileLLL}

Gibt kompilierten LLL Code zurück.

**Parameter**

1. `String` - Der Quellcode.

```js
params: ["(returnlll (suicide (caller)))"]
```

**Rückgabewerte** `DATA` - Der kompilierte Quellcode.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_compileLLL","params":["(returnlll (suicide (caller)))"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x603880600c6000396000f3006001600060e060020a600035048063c6888fa114601857005b6021600435602b565b8060005260206000f35b600081600702905091905056" // the compiled source code
}
```

### eth_compileSerpent {#eth_compileserpent}

Gibt kompilierten Serpent Code zurück.

**Parameter**

1. `String` - Der Quellcode.

```js
params: ["/* some serpent */"]
```

**Rückgabewerte** `DATA` - Der kompilierte Quellcode.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_compileSerpent","params":["/* some serpent */"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x603880600c6000396000f3006001600060e060020a600035048063c6888fa114601857005b6021600435602b565b8060005260206000f35b600081600702905091905056" // the compiled source code
}
```

### eth_newFilter {#eth_newfilter}

Erstellt, basierend auf den Filteroptionen, ein Filterobjekt. Wenn sich der Status ändert, erfolgt eine Benachrichtung (Protokolle). Um zu überprüfen, ob sich der Status geändert hat, rufen Sie [eth_getFilterChanges](#eth_getfilterchanges) auf.

**Hinweis zum Festlegen von Themenfiltern:** Themen sind auftragsabhängig. Eine Transaktion mit einem Protokoll mit den Themen [A, B] wird mit den folgenden Themenfiltern abgeglichen:

- `[]` „alles“
- `[A]` „A an erster Stelle (und alles danach)“
- `[null, B]` „Alles an erster Stelle UND B an zweiter Stelle (und alles danach)“
- `[A, B]` „A an erster Stelle UND B an zweiter Stelle (und alles danach)“
- `[[A, B], [A, B]]` „(A ODER B) an erster Stelle UND (A ODER B) an zweiter Stelle (und alles danach)“
- **Parameter**

1. `Objekt` - Die Filteroptionen:

- `fromBlock`: `QUANTITY|TAG` - (optional, Standard: `"latest"`) Ganzzahlige Blocknummer oder `"latest"` für den letzten geminten Block oder `"pending"`, `"earliest"` für noch nicht geminte Transaktionen.
- `toBlock`: `QUANTITY|TAG` - (Optional, Standard: `"latest"`) Ganzzahlige Blocknummer oder `"latest"` für den letzten geminten Block oder `"pending"`, `"earliest"` für noch nicht geminte Transaktionen.
- `Adresse`: `DATA|Array`, 20 Bytes - (Optional) Vertragsadresse oder eine Liste von Adressen, von denen Protokolle stammen sollen.
- `topics`: `Array of DATA`, - (Optional) Array von 32 Bytes `DATA`-Themen. Themen sind auftragsabhängig. Jedes Thema kann auch ein Array von DATEN mit „oder“-Optionen sein.

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

**Rückgabewerte** `QUANTITY` - Eine Filter-ID.

**Beispiel**

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

Erstellt einen Filter im Knoten, um Sie zu benachrichtigen, wenn ein neuer Block ankommt. Um zu überprüfen, ob sich der Status geändert hat, rufen Sie [eth_getFilterChanges](#eth_getfilterchanges) auf.

**Parameter** Keine

**Rückgabewerte** `QUANTITY` - Eine Filter-ID.

**Beispiel**

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

Erstellt einen Filter im Knoten, um Sie zu benachrichtigen, wenn eine neue ausstehende Transaktionen eintrifft. Um zu überprüfen, ob sich der Status geändert hat, rufen Sie [eth_getFilterChanges](#eth_getfilterchanges) auf.

**Parameter** Keine

**Rückgabewerte** `QUANTITY` - Eine Filter-ID.

**Beispiel**

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

Deinstalliert einen Filter mit gegebener ID. Sollte immer aufgerufen werden, wenn die Uhr nicht mehr benötigt wird. Zusätzlich Timeout für Filter, wenn sie für einen bestimmten Zeitraum nicht mit [eth_getFilterChanges](#eth_getfilterchanges) angefordert werden.

**Parameter**

1. `QUANTITY` – Die Filter-ID.

```js
params: [
  "0xb", // 11
]
```

**Rückgabewerte** `Boolean` - `true`, wenn der Filter erfolgreich deinstalliert wurde, andernfalls `false`.

**Beispiel**

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

Abfragemethode für einen Filter, der ein Array von Protokollen zurückgibt, die seit der letzten Abfrage aufgetreten sind.

**Parameter**

1. `QUANTITY` – Die Filter-ID.

```js
params: [
  "0x16", // 22
]
```

**Rückgabewerte** `Array` - Array von Protokollobjekten oder ein leeres Array, wenn sich seit der letzten Abfrage nichts geändert hat.

- Für mit `eth_newBlockFilter` erstellte Filter sind die Rückgabewerte Block-Hashes (`DATA`, 32 Bytes), z. `["0x3454645634534..."]`.
- Für Filter, die mit `eth_newPendingTransactionFilter` erstellt wurden, sind die Rückgabewerte Transaktions-Hashes (`DATA`, 32 Bytes), z. `["0x6345343454645..."]`.
- Für mit `eth_newFilter` erstellte Filter sind Protokolle Objekte mit folgenden Parametern:
  - `removed`: `TAG` - `true`, als das Protokoll aufgrund einer Neustrukturierung der Blockchain entfernt wurde. `false`, wenn es sich um ein gültiges Protokoll handelt.
  - `logIndex`: `QUANTITY` – Ganzzahlwert der Protokollindexposition im Block. `null`, wenn es sich um ein ausstehendes Protokoll handelt.
  - `transactionIndex`: `QUANTITY` - Ganzzahlwert der Transaktionsindexposition, aus der das Protokoll erstellt wurde. `null`, wenn es sich um ein ausstehendes Protokoll handelt.
  - `transactionHash`: `DATA`, 32 Bytes - Hash der Transaktionen, aus denen dieses Protokoll erstellt wurde. `null`, wenn es sich um ein ausstehendes Protokoll handelt.
  - `blockHash`: `DATA`, 32 Bytes - Hash des Blocks, in dem sich dieses Protokoll befand. `null`, wenn es aussteht. `null`, wenn es sich um ein ausstehendes Protokoll handelt.
  - `blockNumber`: `QUANTITY` - Die Blocknummer, in der sich dieses Protokoll befand. `null`, wenn es aussteht. `null`, wenn es sich um ein ausstehendes Protokoll handelt.
  - `Adresse`: `DATA`, 20 Bytes - Adresse, von der dieses Protokoll stammt.
  - `data`: `DATA` - Enthält ein oder mehrere nicht indizierte 32 Byte Argumente des Protokolls.
  - `topics`: `Array of DATA` - Array von 0 bis 4 32 Bytes `DATA` von indizierten Protokollargumenten. (In _Solidity_: Das erste Thema ist der _Hash_ der Signatur des Ereignisses (z. B. `Deposit (address,bytes32,uint256)`), es sei denn, Sie haben das Ereignis mit dem `anonymous`-Spezifizierer deklariert.)
- **Beispiel**

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

Gibt ein Array aller Protokolle zurück, die dem Filter mit der angegebenen ID entsprechen.

**Parameter**

1. `QUANTITY` – Die Filter-ID.

```js
params: [
  "0x16", // 22
]
```

**Rückgabewerte** Siehe [eth_getFilterChanges](#eth_getfilterchanges)

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Ergebnis siehe [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Gibt ein Array aller Protokolle zurück, die mit einem bestimmten Filterobjekt übereinstimmen.

**Parameter**

1. `Object` - Die Filteroptionen:

- `fromBlock`: `QUANTITY|TAG` - (optional, Standard: `"latest"`) Ganzzahlige Blocknummer oder `"latest"` für den letzten geminten Block oder `"pending"`, `"earliest"` für noch nicht geminte Transaktionen.
- `toBlock`: `QUANTITY|TAG` - (Optional, Standard: `"latest"`) Ganzzahlige Blocknummer oder `"latest"` für den letzten geminten Block oder `"pending"`, `"earliest"` für noch nicht geminte Transaktionen.
- `Adresse`: `DATA|Array`, 20 Bytes - (Optional) Vertragsadresse oder eine Liste von Adressen, von denen Protokolle stammen sollen.
- `topics`: `Array of DATA`, - (Optional) Array von 32 Bytes `DATA`-Themen. Themen sind auftragsabhängig. Jedes Thema kann auch ein Array von DATEN mit „oder“-Optionen sein.
- `blockhash`: `DATA`, 32 Bytes - (optional, **future**) Mit dem Hinzufügen von EIP-234 wird `blockHash` eine neue Filteroption sein, die die zurückgegebenen Protokolle auf den einzelnen Block mit dem 32-Byte-Hash `blockHash` beschränkt. Die Verwendung von `blockHash` entspricht `fromBlock` = `toBlock` = die Blocknummer mit Hash `blockHash`. Wenn `blockHash` in den Filterkriterien vorhanden ist, sind weder `fromBlock` noch `toBlock` zulässig.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Rückgabewerte** Siehe [eth_getFilterChanges](#eth_getfilterchanges)

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Ergebnis siehe [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getWork {#eth_getwork}

Gibt den Hash des aktuellen Blocks, den SeedHash und die zu erfüllende Randbedingung („Ziel“) zurück.

**Parameter** Keine

**Rückgabewerte** `Array` - Array mit den folgenden Eigenschaften:

1. `DATA`, 32 Bytes - Pow-Hash des aktuellen Block-Headers
2. `DATA`, 32 Bytes – Der Seed-Hash, der für den DAG verwendet wird.
3. `DATA`, 32 Bytes - die Randbedingung („Ziel“), 2^256 / Schwierigkeitsgrad.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getWork","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "0x5EED00000000000000000000000000005EED0000000000000000000000000000",
      "0xd1ff1c01710000000000000000000000d1ff1c01710000000000000000000000"
    ]
}
```

### eth_submitWork {#eth_submitwork}

Wird zum Einreichen einer Proof-of-Work-Lösung verwendet.

**Parameter**

1. `DATA`, 8 Bytes - Die gefundene Nonce (64 Bit)
2. `DATA`, 32 Bytes - Der Pow-Hash des Headers (256 Bit)
3. `DATA`, 32 Bytes - Der Mix Digest (256 Bit)

```js
params: [
  "0x0000000000000001",
  "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000",
]
```

**Rückgabewerte** `Boolean` - gibt `true` zurück, wenn die bereitgestellte Lösung gültig ist, andernfalls `false`.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0", "method":"eth_submitWork", "params":["0x0000000000000001", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "0xD1GE5700000000000000000000000000D1GE5700000000000000000000000000"],"id":73}'
// Result
{
  "id":73,
  "jsonrpc":"2.0",
  "result": true
}
```

### eth_submitHashrate {#eth_submithashrate}

Wird zum Senden der Mining-Hashrate verwendet.

**Parameter**

1. `Hashrate`, eine hexadezimale String-Darstellung (32 Byte) der Hashrate
2. `ID`, String – Eine zufällige hexadezimale (32 Byte) ID, die den Client identifiziert

```js
params: [
  "0x0000000000000000000000000000000000000000000000000000000000500000",
  "0x59daa26581d0acd1fce254fb7e85952f4c09d0915afd33d3886cd914bc7d283c",
]
```

**Rückgabewerte** `Boolean` - gibt `true` zurück, wenn die Übermittlung erfolgreich war, andernfalls `false`.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0", "method":"eth_submitHashrate", "params":["0x0000000000000000000000000000000000000000000000000000000000500000", "0x59daa26581d0acd1fce254fb7e85952f4c09d0915afd33d3886cd914bc7d283c"],"id":73}'
// Result
{
  "id":73,
  "jsonrpc":"2.0",
  "result": true
}
```

### db_putString (veraltet) {#db_putstring}

Speichert einen String in der lokalen Datenbank.

**Hinweis** diese Funktion ist veraltet.

**Parameter**

1. `String` - Name der Datenbank.
2. `String` - Name des Schlüssels.
3. `String` - Zu speichernder String.

```js
params: ["testDB", "myKey", "myString"]
```

**Rückgabewerte** `Boolean` - gibt `true` zurück, wenn der Wert gespeichert wurde, andernfalls `false`.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"db_putString","params":["testDB","myKey","myString"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

### db_getString (veraltet) {#db_getstring}

Gibt String aus der lokalen Datenbank zurück. **Hinweis** diese Funktion ist veraltet.

**Parameter**

1. `String` - Name der Datenbank.
2. `String` - Name des Schlüssels.

```js
params: ["testDB", "myKey"]
```

**Rückgabewerte** `String` - Der zuvor gespeicherte String.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"db_getString","params":["testDB","myKey"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": "myString"
}
```

### db_putHex (veraltet) {#db_puthex}

Speichert Binärdaten in der lokalen Datenbank. **Hinweis** diese Funktion ist veraltet.

**Parameter**

1. `String` - Name der Datenbank.
2. `String` - Name des Schlüssels.
3. `DATA` - Die zu speichernden Daten.

```js
params: ["testDB", "myKey", "0x68656c6c6f20776f726c64"]
```

**Rückgabewerte** `Boolean` - gibt `true` zurück, wenn der Wert gespeichert wurde, andernfalls `false`.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"db_putHex","params":["testDB","myKey","0x68656c6c6f20776f726c64"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

### db_getHex (veraltet) {#db_gethex}

Gibt Binärdaten aus der lokalen Datenbank zurück. **Hinweis** diese Funktion ist veraltet.

**Parameter**

1. `String` - Name der Datenbank.
2. `String` - Name des Schlüssels.

```js
params: ["testDB", "myKey"]
```

**Rückgabewerte** `DATA` - Die zuvor gespeicherten Daten.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"db_getHex","params":["testDB","myKey"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": "0x68656c6c6f20776f726c64"
}
```

### shh_version (veraltet) {#shh_post}

Gibt die aktuelle Whisper-Protokollversion zurück.

**Hinweis** diese Funktion ist veraltet.

**Parameter** Keine

**Rückgabewerte** `String` - Die aktuelle Version des Whisper-Protokolls

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "2"
}
```

### shh_post (veraltet) {#shh_version}

Sendet eine Flüsternachricht.

**Hinweis** diese Funktion ist veraltet.

**Parameter**

1. `Object` - Das Flüsterpost-Objekt:

- `from`: `DATA`, 60 Bytes - (Optional) Die Identität des Absenders.
- `to`: `DATA`, 60 Bytes - (Optional) Die Identität des Empfängers. Wenn vorhanden, wird Flüstern die Nachricht verschlüsseln, so dass nur der Empfänger sie entschlüsseln kann.
- `topics`: `Array of DATA` - Array von `DATA`-Themen, damit der Empfänger Nachrichten identifizieren kann.
- `Payload`: `DATA` - Die Nutzlast der Nachricht.
- `Priorität`: `QUANTITY` - Der Ganzzahlwert der Priorität in einem Bereich von ... (?).
- `ttl`: `QUANTITY` - Ganzzahlwert der verbleibenden Zeit in Sekunden.

```js
params: [
  {
    from: "0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1",
    to: "0x3e245533f97284d442460f2998cd41858798ddf04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a0d4d661997d3940272b717b1",
    topics: [
      "0x776869737065722d636861742d636c69656e74",
      "0x4d5a695276454c39425154466b61693532",
    ],
    payload: "0x7b2274797065223a226d6",
    priority: "0x64",
    ttl: "0x64",
  },
]
```

**Rückgabewerte** `Boolean` - gibt `true` zurück, wenn die Nachricht gesendet wurde, andernfalls `false`.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_post","params":[{"from":"0xc931d93e97ab07fe42d923478ba2465f2..","topics": ["0x68656c6c6f20776f726c64"],"payload":"0x68656c6c6f20776f726c64","ttl":0x64,"priority":0x64}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

### shh_newIdentity (veraltet){#shh_newidentity}

Erstellt eine neue Flüsteridentität im Client.

**Hinweis** diese Funktion ist veraltet.

**Parameter** Keine

**Rückgabewerte** `DATA`, 60 Bytes - Die Adresse der neuen Identität.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_newIdentity","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xc931d93e97ab07fe42d923478ba2465f283f440fd6cabea4dd7a2c807108f651b7135d1d6ca9007d5b68aa497e4619ac10aa3b27726e1863c1fd9b570d99bbaf"
}
```

### shh_hasIdentity (veraltet){#shh_hasidentity}

Überprüft, ob der Client die privaten Schlüssel für eine bestimmte Identität besitzt.

**Hinweis** diese Funktion ist veraltet.

**Parameter**

1. `DATA`, 60 Bytes - Die zu überprüfende Identitätsadresse.

```js
params: [
  "0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1",
]
```

**Rückgabewerte** `Boolean` - gibt `true` zurück, wenn der Client den privaten Schlüssel für diese Identität besitzt, andernfalls `false`.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_hasIdentity","params":["0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### shh_newGroup (veraltet){#shh_newgroup}

**Hinweis** diese Funktion ist veraltet.

**Parameter** Keine

**Rückgabewerte** `DATA`, 60 Bytes - Die Adresse der neuen Gruppe. (?)

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_newGroup","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xc65f283f440fd6cabea4dd7a2c807108f651b7135d1d6ca90931d93e97ab07fe42d923478ba2407d5b68aa497e4619ac10aa3b27726e1863c1fd9b570d99bbaf"
}
```

### shh_addToGroup (veraltet){#shh_addtogroup}

**Hinweis** diese Funktion ist veraltet.

**Parameter**

1. `DATA`, 60 Bytes – Die Identitätsadresse, die einer Gruppe hinzugefügt werden soll (?).

```js
params: [
  "0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1",
]
```

**Rückgabewerte** `Boolean` - Gibt `true` zurück, wenn die Identität erfolgreich zur Gruppe hinzugefügt wurde, andernfalls `false` (?).

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_addToGroup","params":["0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### shh_newFilter (veraltet){#shh_newfilter}

Erstellt einen Filter, um Benachrichtigungen bei Empfang einer Flüsternachricht zu erhalten, die den Filteroptionen entspricht. **Hinweis** diese Funktion ist veraltet.

**Parameter**

1. `Object` - Die Filteroptionen:

- `to`: `DATA`, 60 Bytes - (Optional) Die Identität des Empfängers. _Wenn vorhanden, wird es versuchen, eingehende Nachrichten zu entschlüsseln, wenn der Client den privaten Schlüssel für diese Identität besitzt._
- `topics`: `Array of DATA` - Array von `DATA`-Themen, die den Themen der eingehenden Nachricht entsprechen sollen. Sie können folgende Kombinationen verwenden:
  - `[A, B] = A && B`
  - `[A, [B, C]] = A && (B || C)`
  - `[null, A, B] = ALLES && A && B` `null` funktioniert als Joker
  -

```js
params: [
  {
    topics: ["0x12341234bf4b564f"],
    to: "0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1",
  },
]
```

**Rückgabewerte** `QUANTITY` - Der neu erstellte Filter.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_newFilter","params":[{"topics": ['0x12341234bf4b564f'],"to": "0x2341234bf4b2341234bf4b564f..."}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": "0x7" // 7
}
```

### shh_uninstallFilter (veraltet){#shh_uninstallfilter}

Deinstalliert einen Filter mit gegebener ID. Sollte immer aufgerufen werden, wenn die Uhr nicht mehr benötigt wird. Zusätzlich Timeout für Filter, wenn sie für einen bestimmten Zeitraum nicht mit [shh_getFilterChanges](#shh_getfilterchanges) angefordert werden. **Hinweis** diese Funktion ist veraltet.

**Parameter**

1. `QUANTITY` – Die Filter-ID.

```js
params: [
  "0x7", // 7
]
```

**Rückgabewerte** `Boolean` - `true`, wenn der Filter erfolgreich deinstalliert wurde, andernfalls `false`.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_uninstallFilter","params":["0x7"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

### shh_getFilterChanges (veraltet){#shh_getfilterchanges}

Abfrageverfahren für Flüsterfilter. Gibt neue Nachrichten seit dem letzten Aufruf dieser Methode zurück. **Hinweis** Der Aufruf der Methode [shh_getMessages](#shh_getmessages) setzt den Puffer für diese Methode zurück, sodass Sie keine doppelten Nachrichten erhalten. **Hinweis** diese Funktion ist veraltet.

**Parameter**

1. `QUANTITY` – Die Filter-ID.

```js
params: [
  "0x7", // 7
]
```

**Rückgabewerte** `Array` - Array von Nachrichten, die seit der letzten Abfrage empfangen wurden:

- `Hash`: `DATA`, 32 Bytes (?) - Der Hash der Nachricht.
- `from`: `DATA`, 60 Bytes - Der Absender der Nachricht, falls ein Absender angegeben wurde.
- `to`: `DATA`, 60 Bytes - Der Empfänger der Nachricht, falls ein Empfänger angegeben wurde.
- `expiry`: `QUANTITY` - Ganzzahlwert der Zeit in Sekunden, wann diese Nachricht ablaufen soll (?).
- `ttl`: `QUANTITY` - Ganzzahlwert der Zeit, die die Nachricht im System schweben soll, in Sekunden (?).
- `sent`: `QUANTITY` - Ganzzahlwert des Unix-Zeitstempels, als die Nachricht gesendet wurde.
- `topics`: `Array of DATA` - Array von `DATA`-Themen, die die Nachricht enthielt.
- `Payload`: `DATA` - Die Nutzlast der Nachricht.
- `workProved`: `QUANTITY` - Ganzzahlwert der Arbeit, die diese Nachricht erforderte, bevor sie gesendet wurde (?).

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_getFilterChanges","params":["0x7"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "hash": "0x33eb2da77bf3527e28f8bf493650b1879b08c4f2a362beae4ba2f71bafcd91f9",
    "from": "0x3ec052fc33..",
    "to": "0x87gdf76g8d7fgdfg...",
    "expiry": "0x54caa50a", // 1422566666
    "sent": "0x54ca9ea2", // 1422565026
    "ttl": "0x64", // 100
    "topics": ["0x6578616d"],
    "payload": "0x7b2274797065223a226d657373616765222c2263686...",
    "workProved": "0x0"
    }]
}
```

### shh_getMessages (veraltet) {#shh_getmessages}

Erhalten Sie alle Nachrichten, die einem Filter entsprechen. Im Gegensatz zu `shh_getFilterChanges` gibt dies alle Nachrichten zurück.

**Hinweis** diese Funktion ist veraltet.

**Parameter**

1. `QUANTITY` – Die Filter-ID.

```js
params: [
  "0x7", // 7
]
```

**Rückgabewerte** Siehe [shh_getFilterChanges](#shh_getfilterchanges)

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_getMessages","params":["0x7"
],"id":73}'
```

Ergebnis siehe [shh_getFilterChanges](#shh_getfilterchanges)

## Anwendungsbeispiel {#usage-example}

### Bereitstellen eines Vertrags mit JSON_RPC {#deploying-contract}

Dieser Abschnitt enthält eine Demonstration, wie ein Vertrag nur mithilfe der RPC-Schnittstelle bereitgestellt wird. Es gibt alternative Wege zur Bereitstellung von Verträgen, bei denen diese Komplexität abstrahiert wird – zum Beispiel die Verwendung von Bibliotheken, die auf der RPC-Schnittstelle wie [web3.js](https://web3js.readthedocs.io/) und [web3.py](https://github.com/ethereum/web3.py) aufbauen. Diese Abstraktionen sind im Allgemeinen leichter zu verstehen und weniger fehleranfällig, es ist dennoch hilfreich zu verstehen, was im Hintergrund passiert.

Das Folgende ist ein unkomplizierter Smart Contract namens `Multiply7`, der über die JSON-RPC-Schnittstelle auf einem Ethereum-Knoten bereitgestellt wird. Dieses Tutorial geht davon aus, dass der Reader bereits einen Geth-Knoten ausführt. Weitere Informationen zu Nodes und Clients finden Sie [hier](/developers/docs/nodes-and-clients/run-a-node). Bitte sehen Sie in der jeweiligen [Client-Dokumentation](/developers/docs/nodes-and-clients/) nach, wie Sie den HTTP-JSON-RPC für Nicht-Geth-Clients starten. Die meisten Clients werden standardmäßig auf `localhost:8545` bereitgestellt.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Stellen Sie zunächst sicher, dass die HTTP-RPC-Schnittstelle aktiviert ist. Das bedeutet, dass wir Geth beim Start mit dem `--http`-Flag versehen. In diesem Beispiel verwenden wir den Geth-Knoten in einer privaten Entwicklungs-Blockchain. Mit diesem Ansatz benötigen wir keine Ether im echten Netzwerk.

```bash
geth --http --dev console 2>>geth.log
```

Dadurch wird die HTTP-RPC-Schnittstelle auf `http://localhost:8545` gestartet.

Wir können überprüfen, ob die Schnittstelle läuft, indem wir die Coinbase-Adresse und den Kontostand mit [curl](https://curl.se) abrufen. Bitte beachten Sie, dass sich die Daten in diesen Beispielen auf Ihrem lokalen Knoten unterscheiden. Wenn Sie diese Befehle ausprobieren möchten, ersetzen Sie die Anfrageparameter in der zweiten Curl-Anfrage durch das Ergebnis, das von der ersten zurückgegeben wird.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_coinbase", "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Da Zahlen hexadezimal kodiert sind, wird der Saldo in Wei als hexadezimaler String zurückgegeben. Wenn wir das Guthaben in Ether als Zahl haben möchten, können wir web3 von der Geth-Konsole verwenden.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Jetzt, da es etwas Ether in unserer privaten Entwicklungs-Blockchain gibt, können wir den Vertrag bereitstellen. Der erste Schritt besteht darin, den Multiply7-Vertrag in Bytecode zu kompilieren, der an die EVM gesendet werden kann. Um Solc, den Solidity-Compiler, zu installieren, folgen Sie der [Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Möglicherweise möchten Sie eine ältere `solc`-Version verwenden, um der [Version des verwendeten Compilers für unser Beispiel zu entsprechen](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Der nächste Schritt besteht darin, den Multiply7-Vertrag in Bytecode zu kompilieren, der an die EVM gesendet werden kann.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Jetzt, da wir den kompilierten Code haben, müssen wir bestimmen, wie viel Gas es kostet, ihn einzusetzen. Die RPC-Schnittstelle hat eine `eth_estimateGas`-Methode, die uns eine Schätzung bereitstellt.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Und schließlich stellen Sie den Vertrag bereit.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Die Transaktion wird von dem Knoten akzeptiert und ein Transaktions-Hash wird zurückgegeben. Dieser Hash kann verwendet werden, um die Transaktion zu verfolgen. Der nächste Schritt besteht darin, die Adresse zu ermitteln, an der unser Vertrag bereitgestellt wird. Jede ausgeführte Transaktion erstellt einen Beleg. Dieser Beleg enthält verschiedene Informationen über die Transaktion, wie z. B. in welchem Block die Transaktion enthalten war und wie viel Gas von der EVM verbraucht wurde. Wenn eine Transaktion einen Vertrag erstellt, enthält sie auch die Vertragsadresse. Wir können den Beleg mit der RPC-Methode `eth_getTransactionReceipt` abrufen.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Unser Vertrag wurde am `0x4d03d617d700cf81935d7f797f4e2ae719648262` erstellt. Ein Nullergebnis anstelle eines Belegs bedeutet, dass die Transaktion stattgefunden hat und noch nicht in einen Block aufgenommen wurde. Warten Sie einen Moment und überprüfen Sie, ob Ihr Miner ausgeführt wird, und versuchen Sie es erneut.

#### Interaktion mit Smart Contracts {#interacting-with-smart-contract}

In diesem Beispiel senden wir eine Transaktion mit `eth_sendTransaction` an die Methode `multiply` des Vertrags.

`eth_sendTransaction` erfordert mehrere Argumente, insbesondere `from`, `to` und `data`. `From` ist die öffentliche Adresse unseres Kontos und `to` ist die Vertragsadresse. Das Argument `data` enthält eine Nutzlast, die definiert, welche Methode aufgerufen werden muss und mit welchen Argumenten. Hier kommt die [ABI (Application Binary Interface)](https://docs.soliditylang.org/en/latest/abi-spec.html) ins Spiel. Die ABI ist eine JSON-Datei, die festlegt, wie Daten für die EVM definiert und kodiert werden.

Die Bytes der Nutzlast definieren, welche Methode im Vertrag aufgerufen wird. Dies sind die ersten 4 Bytes aus dem Keccak-Hash über den Funktionsnamen und seine Argumenttypen, kodiert in hex. Die Multiplizieren-Funktion akzeptiert ein uint, welches ein Alias für uint256 ist. Damit bleibt uns:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Der nächste Schritt besteht darin, die Argumente zu kodieren. Es gibt nur einen uint256, sagen wir den Wert 6. Die ABI hat einen Abschnitt, der angibt, wie uint256-Typen kodiert werden.

`int<M>: enc(X)` ist die Big-Endian-Zweierkomplementkodierung von X, aufgefüllt auf der Seite höherer Ordnung (links) mit 0xff für negatives X und mit Null > Bytes für positives X, sodass die Länge ein Vielfaches von 32 Bytes ist.

Dies wird zu `0000000000000000000000000000000000000000000000000000000000006` kodiert.

Durch die Kombination des Funktionsselektors und des kodierten Arguments werden unsere Daten zu `0xc6888fa10000000000000000000000000000000000000000000000000000000000006`.

Dies kann nun an den Knoten gesendet werden:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Da eine Transaktion gesendet wurde, wurde ein Transaktions-Hash zurückgegeben. Das Abrufen des Belegs ergibt:

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

Der Beleg enthält ein Protokoll. Dieses Protokoll wurde von der EVM bei der Transaktionsausführung generiert und in den Beleg aufgenommen. Die Funktion `multiply` zeigt, dass das Ereignis `Print` mit der Eingabe mal 7 ausgelöst wurde. Da das Argument für das Ereignis `Print` ein uint256 war, können wir es gemäß den ABI-Regeln dekodieren, was uns die erwartete Dezimalzahl 42 zurücklässt. Abgesehen von den Daten ist es erwähnenswert, dass Themen verwendet werden können, um festzustellen, welches Ereignis das Protokoll erstellt hat:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Dies war nur eine kurze Einführung in einige der häufigsten Aufgaben, die die direkte Verwendung von JSON-RPC demonstrieren.

## Verwandte Themen {#related-topics}

- [JSON-RPC-Spezifikation](http://www.jsonrpc.org/specification)
- [Knotenpunkte und Clients](/developers/docs/nodes-and-clients/)
- [JavaScript-APIs](/developers/docs/apis/javascript/)
- [Backend-APIs](/developers/docs/apis/backend/)
- [Ausführende Clients](/developers/docs/nodes-and-clients/#execution-clients)
