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

[ Lesen Sie die vollständige JSON-RPC-API-Spezifikation auf GitHub](https://github.com/ethereum/execution-apis). Diese API ist auf der [Execution API-Webseite](https://ethereum.github.io/execution-apis/api-documentation/) dokumentiert und enthält einen Inspector, mit dem Sie alle verfügbaren Methoden ausprobieren können.

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
- 0x004200 (Größe 3, „0B0“)
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
- `String "latest"` – für den neuesten vorgeschlagenen Block
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

## JSON-RPC-API-Playground

Sie können das [Playground-Tool](https://ethereum-json-rpc.com) verwenden, um die API-Methoden zu entdecken und auszuprobieren. Es zeigt Ihnen auch, welche Methoden und Netzwerke von verschiedenen Knotenanbietern unterstützt werden.

## JSON-RPC API-Methoden {#json-rpc-methods}

### web3_ClientVersion {#web3_clientversion}

Gibt die aktuelle Client-Version zurück.

**Parameter**

Keine

**Rückgaben**

`String` - Die aktuelle Client-Version

**Beispiel**

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

Gibt Keccak-256 (_nicht_ der standardisierte SHA3-256) von den gegebenen Daten zurück.

**Parameter**

1. `DATA` – die Daten, die in einen SHA3-Hash konvertiert werden sollen

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

Die genauen Rückgabedaten variieren je nach Client-Implementierung. Alle Clients geben `False` zurück, wenn der Knoten nicht synchronisiert wird, und alle Clients geben die nachfolgenden Felder zurück.

`Object|Boolean` – ein Objekt mit Synchronisierungsstatus-Daten oder `FALSE`, wenn nicht synchronisiert wird:

- `startingBlock`: `QUANTITY` - Der Block, bei dem der Import begonnen hat (wird nur zurückgesetzt, nachdem die Synchronisierung ihren Kopf erreicht hat)
- `currentBlock`: `QUANTITY` - Der aktuelle Block, identisch zu eth_blockNumber
- `highestBlock`: `QUANTITY` - Der geschätzte höchste Block

Die einzelnen Clients können jedoch auch zusätzliche Daten liefern. Beispielsweise gibt Geth Folgendes zurück:

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

Besu gibt hingegen Folgendes zurückgibt:

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

Weitere Einzelheiten finden Sie in der Dokumentation zu Ihrem jeweiligen Client.

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

Keine (None)

**Rückgaben**

`DATA`, 20 Byte – die aktuelle Coinbase-Adresse.

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

Gibt die Ketten-ID zurück, die für das Unterzeichnen der Replay-geschützten Transaktionen verwendet wird.

**Parameter**

Keine (None)

**Rückgaben**

`chainId` – Hexadezimalwert als String, der die Ganzzahl der aktuellen Ketten-ID repräsentiert.

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

Gibt `true` zurück, wenn der Client aktiv neue Blöcke mint. Dies kann für Proof-of-Work-Netzwerke nur `true` zurückgeben und ist möglicherweise seit [der Zusammenführung](/roadmap/merge/) in einigen Clients nicht mehr verfügbar.

**Parameter**

Keine (None)

**Rückgaben**

`Boolean` – gibt `true` zurück, wenn der Client aktiv mint, andernfalls `false`.

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

Gibt die Anzahl der Hashes pro Sekunde zurück, mit der der Knoten mint. Dies kann für Proof-of-Work-Netzwerke nur `true` zurückgeben und ist möglicherweise seit [der Zusammenführung](/roadmap/merge/) in einigen Clients nicht mehr verfügbar.

**Parameter**

Keine (None)

**Rückgaben**

`QUANTITY` – Anzahl der Hashes pro Sekunde.

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

Gibt eine Schätzung des aktuellen Preises pro Gas in Wei zurück. Der Besu-Client prüft beispielsweise die letzten 100 Blöcke und gibt standardmäßig den mittleren Preis pro Gas-Einheit zurück.

**Parameter**

Keine (None)

**Rückgaben**

`QUANTITY` – Ganzzahl des aktuellen Gas-Preises in Wei.

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

Keine (None)

**Rückgaben**

`Array of DATA`, 20 Byte – Adressen, die dem Client gehören.

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

Gibt die Zahl des aktuellsten Blocks zurück.

**Parameter**

Keine (None)

**Rückgaben**

`QUANTITY` – Ganzzahl der Blocknummer, auf der sich der Client derzeit befindet.

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

Gibt das Guthaben des Kontos einer bestimmten Adresse zurück.

**Parameter**

1. `DATA`, 20 Bytes - Adresse, deren Guthaben überprüft werden soll.
2. `QUANTITY|TAG` – ganzzahlige Blocknummer oder der String `"latest"`, `"earliest"`, `"pending"`, `"safe"` oder `"finalized"`, siehe [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Rückgaben**

`QUANTITY` – Ganzzahl für den aktuellen Saldo in Wei.

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

Gibt den Wert aus einer Speicherposition an einer angegebenen Adresse zurück.

**Parameter**

1. `DATA`, 20 Bytes - Adresse des Speichers.
2. `QUANTITY` - Ganzzahlwert der Position im Speicher.
3. `QUANTITY|TAG` – ganzzahlige Blocknummer oder der String `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, siehe [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block)

**Rückgaben**

`DATA` – der Wert an dieser Speicherposition.

**Beispiel:** Die Berechnung der richtigen Position hängt vom abzurufenden Speicher ab. Betrachten Sie den folgenden Contract, der unter `0x295a70b2de5e3953354a6a8344e616ed314d7251` von der Adresse `0x391694e7e0b0cce554cb130d723a9d27458f9298` bereitgestellt wurde.

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

Das Abrufen des Wertes von pos0 ist simpel:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Das Abrufen eines Elements der Karte ist schwieriger. Die Position eines Elements in der Karte wird folgendermaßen berechnet:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Das bedeutet, um den Speicher auf pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] abzurufen, müssen wir die Position folgendermaßen berechnen:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Die Geth-Konsole, die mit der Web3-Bibliothek bereitgestellt wird, kann verwendet werden, um die Berechnung durchzuführen:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Um den Speicher nun abzurufen:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Gibt die Anzahl der von einer Adresse _gesendeten_ Transaktionen zurück.

**Parameter**

1. `DATA`, 20 Bytes - Adresse.
2. `QUANTITY|TAG` – ganzzahlige Blocknummer oder der String `"latest"`, `"earliest"`, `"pending"`, `"safe"` oder `"finalized"`, siehe [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**Rückgaben**

`QUANTITY` – Ganzzahl der Anzahl der von dieser Adresse gesendeten Transaktionen.

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

Gibt die Anzahl der Transaktionen in einem Block zurück, von einem Block, der dem angegebenen Block-Hash entspricht.

**Parameter**

1. `DATA`, 32 Bytes - Hash eines Blocks

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Rückgaben**

`QUANTITY` – Ganzzahl der Anzahl der Transaktionen in diesem Block.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Gibt die Anzahl der Transaktionen in einem Block zurück, der der angegebenen Blocknummer entsprechen.

**Parameter**

1. `QUANTITY|TAG` – Ganzzahl einer Blocknummer oder der String `"earliest"`, `"latest"`, `"pending"`, `"safe"` oder `"finalized"`, wie im [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Rückgaben**

`QUANTITY` – Ganzzahl der Anzahl der Transaktionen in diesem Block.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Gibt die Anzahl der Onkel in einem Block zurück, der dem angegebenen Block-Hash entspricht.

**Parameter**

1. `DATA`, 32 Bytes - Hash eines Blocks

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Rückgaben**

`QUANTITY` – Ganzzahl für die Anzahl der Onkel in diesem Block.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Gibt die Anzahl der Onkel in einem Block zurück, der der angegebenen Blocknummer entspricht.

**Parameter**

1. `QUANTITY|TAG` – Ganzzahl einer Blocknummer oder der String `"latest"`, `"earliest"`, `"pending"`, `"safe"` oder `"finalized"`, siehe [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xe8", // 232
]
```

**Rückgaben**

`QUANTITY` – Ganzzahl für die Anzahl der Onkel in diesem Block.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Gibt den Code an einer angegebenen Adresse zurück.

**Parameter**

1. `DATA`, 20 Bytes - Adresse
2. `QUANTITY|TAG` – ganzzahlige Blocknummer oder der String `"latest"`, `"earliest"`, `"pending"`, `"safe"` oder `"finalized"`, siehe [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Rückgaben**

`DATA` – der Code von der angegebenen Adresse.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

Die Unterzeichnungsmethode berechnet eine Ethereum-spezifische Signatur mit: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Durch das Hinzufügen eines Präfixes zur Nachricht wird die berechnete Signatur als Ethereum-spezifische Signatur erkennbar. Das verhindert Missbrauch, bei dem eine bösartige dApp beliebige Daten (z. B. Transaktionen) signieren und die Signatur nutzen kann, um sich als das Opfer auszugeben.

Hinweis: Die zum Signieren verwendete Adresse muss entsperrt sein.

**Parameter**

1. `DATA`, 20 Bytes - Adresse
2. `DATA`, N Bytes - Nachricht zum Signieren

**Rückgaben**

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

- `type`:
- `from`: `DATA`, 20 Bytes - Die Adresse, von der die Transaktion gesendet wird.
- `to`: `DATA`, 20 Bytes - (Optional beim Erstellen eines neuen Vertrags) Die Adresse, an die die Transaktion gerichtet ist.
- `gas`: `MENGE` - (Optional, Standard: 90000) Ganzzahlwert des Gases, das für die Transaktionsausführung bereitgestellt wurde. Es wird ungenutztes Gas zurückgegeben.
- `gasPrice`: `QUANTITY` – (optional, Standard: noch zu bestimmen) Ganzzahl von gasPrice, die für jedes bezahlte Gas verwendet wird, in Wei.
- `value`: `QUANTITY` – (optional) Ganzzahl des Werts, der mit dieser Transaktion gesendet wird, in Wei.
- `data`: `DATA` - Der kompilierte Code eines Vertrags ODER der Hash der aufgerufenen Methode Signatur und kodierter Parameter.
- `nonce`: `QUANTITY` - (Optional) Ganzzahlwert einer Nonce. Dies ermöglicht es, eigene ausstehende Transaktionen mit der gleichen Nonce zu überschreiben.

**Rückgaben**

`DATA` – das RLP-codierte Transaktionsobjekt, das vom angegebenen Konto signiert wurde.

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

Erstellt eine neue Nachrichtenanruftransaktion oder eine Contract-Erstellung, wenn das Datenfeld Code enthält, und signiert sie mit dem im `from`-Feld angegebenen Konto.

**Parameter**

1. `Objekt` - Das Transaktionsobjekt

- `from`: `DATA`, 20 Bytes - Die Adresse, von der die Transaktion gesendet wird.
- `to`: `DATA`, 20 Bytes - (Optional beim Erstellen eines neuen Vertrags) Die Adresse, an die die Transaktion gerichtet ist.
- `gas`: `MENGE` - (Optional, Standard: 90000) Ganzzahlwert des Gases, das für die Transaktionsausführung bereitgestellt wurde. Es wird ungenutztes Gas zurückgegeben.
- `gasprice`: `QUANTITY` – (Optional, Standard: Noch zu bestimmen) Ganzzahlwert des Gaspreises, der für jedes bezahlte Gas verwendet wird.
- `Value`: `QUANTITY` - (Optional) Ganzzahlwert des mit dieser Transaktion gesendeten Werts.
- `input`: `DATA` – der kompilierte Code eines Contracts ODER der Hash der aufgerufenen Methodensignatur und der codierten Parameter.
- `nonce`: `QUANTITY` - (Optional) Ganzzahlwert einer Nonce. Dies ermöglicht es, eigene ausstehende Transaktionen mit der gleichen Nonce zu überschreiben.

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

**Rückgaben**

`DATA`, 32 Byte – der Transaktions-Hash oder der Null-Hash, wenn die Transaktion noch nicht verfügbar ist.

Verwenden Sie [eth_getTransactionReceipt](#eth_gettransactionreceipt), um die Contract-Adresse zu erhalten, nachdem die Transaktion in einem Block vorgeschlagen wurde, wenn Sie einen Contract erstellt haben.

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

Erstellt eine neue Nachrichtenaufruftransaktion oder eine Contract-Erstellung für signierte Transaktionen.

**Parameter**

1. `DATA`, Die signierten Transaktionsdaten.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Rückgaben**

`DATA`, 32 Byte – der Transaktions-Hash oder der Null-Hash, wenn die Transaktion noch nicht verfügbar ist.

Verwenden Sie [eth_getTransactionReceipt](#eth_gettransactionreceipt), um die Contract-Adresse zu erhalten, nachdem die Transaktion in einem Block vorgeschlagen wurde, wenn Sie einen Contract erstellt haben.

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

Führt sofort einen neuen Nachrichtenaufruf aus, ohne eine Transaktion auf der Blockchain zu erstellen. Wird häufig für die Ausführung von Smart-Contract-Funktionen mit Leseberechtigung verwendet, zum Beispiel `balanceOf` für einen ERC-20-Contract.

**Parameter**

1. `Object` - Das Transaktionsaufrufobjekt

- `from`: `DATA`, 20 Bytes - (Optional) Die Adresse, von der die Transaktion gesendet wird.
- `to`: `DATA`, 20 Bytes – Die Adresse, an die die Transaktion gerichtet ist.
- `gas`: `QUANTITY` - (Optional) Ganzzahlwert des für die Transaktionsausführung bereitgestellten Gases. eth_call verbraucht kein Gas, aber dieser Parameter kann von einigen Ausführungen benötigt werden.
- `gasprice`: `QUANTITY` - (Optional) Ganzzahlwert des Gaspreises, der für jedes bezahlte Gas verwendet wird
- `value`: `QUANTITY` - (Optional) Ganzzahlwert des mit dieser Transaktion gesendeten Werts
- `input`: `DATA` – (optional) Hash der Methodensignatur und der codierten Parameter. Einzelheiten finden Sie unter [Ethereum-Contract-ABI in der Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` – ganzzahlige Blocknummer oder der String `"latest"`, `"earliest"`, `"pending"`, `"safe"` oder `"finalized"`, siehe [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block)

**Rückgaben**

`DATA` – der Rückgabewert des ausgeführten Vertrages.

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

Generiert und gibt eine Schätzung zurück, wie viel Gas erforderlich ist, damit die Transaktion abgeschlossen werden kann. Die Transaktion wird nicht zur Blockchain hinzugefügt. Beachten Sie, dass die Schätzung aus verschiedenen Gründen, einschließlich der EVM-Mechanik und der Leistung des Knotens, erheblich höher sein kann als die tatsächlich von der Transaktion verbrauchte Gas-Menge.

**Parameter**

Siehe [eth_call](#eth_call)-Parameter – mit der Ausnahme, dass alle Eigenschaften optional sind. Wenn kein Gas-Limit angegeben ist, verwendet Geth das Block-Gas-Limit aus dem anstehenden Block als Obergrenze. Infolgedessen reicht die zurückgegebene Schätzung möglicherweise nicht aus, um die Abfrage/Transaktion auszuführen, wenn die Gas-Menge höher als das ausstehende Block-Gas-Limit ist.

**Rückgaben**

`QUANTITY` – die verbrauchte Gas-Menge.

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

**Rückgaben**

`Object` – ein Blockobjekt oder `null`, wenn kein Block gefunden wurde:

- `number`: `QUANTITY` - Die Blocknummer. `null`, wenn es ein ausstehender Block ist.
- `hash`: `DATA`, 32 Bytes - Hash des Blocks. `null`, wenn es ein ausstehender Block ist.
- `parentHash`: `DATA`, 32 Bytes - Hash des übergeordneten Blocks.
- `nonce`: `DATA`, 8 Bytes - Hash des generierten Proof-of-Work. `null`, wenn es ein ausstehender Block ist.
- `sha3Uncles`: `DATA`, 32 Bytes - SHA3 der Onkeldaten im Block.
- `logsBloom`: `DATA`, 256 Bytes - Der Bloom-Filter für die Protokolle des Blocks. `null`, wenn es ein ausstehender Block ist.
- `TransaktionsRoot`: `DATA`, 32 Bytes - Das Stammverzeichnis der Transaktions-Trie des Blocks.
- `stateRoot`: `DATA`, 32 Bytes – Die Wurzel des endgültigen Zustands-Trie des Blocks.
- `receiptsRoot`: `DATA`, 32 Bytes - Die Wurzel des Quittungstries des Blocks.
- `miner`: `DATA`, 20 Byte – die Adresse des Begünstigten, dem die Mining-Belohnungen gegeben wurden.
- `difficulty`: `QUANTITY` - Ganzzahlwert der Schwierigkeit für diesen Block.
- `totalDifficulty`: `QUANTITY` - Ganzzahlwert der Gesamtschwierigkeit der Blockchain bis zu diesem Block.
- `extraData`: `DATA` - Das Feld „zusätzliche Daten“ dieses Blocks.
- `size`: `QUANTITY` - Ganzzahlwert der Größe dieses Blocks in Bytes.
- `gasLimit`: `QUANTITY` - Das maximal zulässige Gas in diesem Block.
- `gasUsed`: `QUANTITY` - Das insgesamt von allen Transaktionen in diesem Block verbrauchte Gas.
- `timestamp`: `QUANTITY` - Der Unix-Zeitstempel für den Zeitpunkt, zu dem der Block sortiert wurde.
- `transactions`: `Array` – Array von Transaktionsobjekten oder 32-Byte-Transaktions-Hashes, abhängig vom zuletzt angegebenen Parameter.
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

1. `QUANTITY|TAG` – Ganzzahl einer Blocknummer oder der String `"earliest"`, `"latest"`, `"pending"`, `"safe"` oder `"finalized"`, wie im [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block).
2. `Boolean` - Bei `true` werden die vollständigen Transaktionsobjekte zurückgegeben, bei `false` nur die Hashes der Transaktionen.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Rückgaben** Siehe [eth_getBlockByHash](#eth_getblockbyhash)

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

**Rückgaben**

`Object` – ein Transaktionsobjekt oder `null`, wenn keine Transaktion gefunden wurde:

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

Gibt Informationen über eine Transaktion nach dem Block-Hash und der Transaktionsindexposition zurück.

**Parameter**

1. `DATA`, 32 Bytes - Hash eines Blocks.
2. `QUANTITY` - Ganzzahlwert der Transaktionsindexposition.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Rückgaben** Siehe [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Ergebnis siehe [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Gibt Informationen über eine Transaktion nach der Blocknummer und der Transaktionsindexposition zurück.

**Parameter**

1. `QUANTITY|TAG` – eine Blocknummer oder der String `"earliest"`, `"latest"`, `"pending"`, `"safe"` oder `"finalized"`, wie im [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY` - Die Transaktionsindexposition.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Rückgaben** Siehe [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Ergebnis siehe [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Gibt den Beleg einer Transaktion nach dem Transaktions-Hash zurück.

**Hinweis:** Der Beleg ist für ausstehende Transaktionen nicht verfügbar.

**Parameter**

1. `DATA`, 32 Bytes - Hash einer Transaktion

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Rückgaben** `Object` – ein Transaktionsbeleg-Objekt oder `null`, wenn kein Beleg gefunden wurde:

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

Es gibt auch _eines davon_ zurück:

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

Gibt Informationen über einen Onkel eines Blocks nach Hash und Onkel-Indexposition zurück.

**Parameter**

1. `DATA`, 32 Bytes - Der Hash eines Blocks.
2. `QUANTITY` - Die Indexposition des Onkels.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Rückgaben** Siehe [eth_getBlockByHash](#eth_getblockbyhash)

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Ergebnis siehe [eth_getBlockByHash](#eth_getblockbyhash)

**Hinweis**: Ein Onkel enthält keine einzelnen Transaktionen.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Gibt Informationen über einen Onkel eines Blocks nach Nummer und Onkel-Indexposition zurück.

**Parameter**

1. `QUANTITY|TAG` – eine Blocknummer oder der String `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, wie im [Standardblockparameter](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY` - Die Indexposition des Onkels.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Rückgaben** Siehe [eth_getBlockByHash](#eth_getblockbyhash)

**Hinweis**: Ein Onkel enthält keine einzelnen Transaktionen.

**Beispiel**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Ergebnis siehe [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Erstellt auf Basis von Filteroptionen ein Filterobjekt, um eine Benachrichtigung auszugeben, wenn sich der Status ändert (Protokolle). Um zu überprüfen, ob sich der Status geändert hat, rufen Sie [eth_getFilterChanges](#eth_getfilterchanges) auf.

**Hinweis zum Festlegen von Themenfiltern:** Themen sind auftragsabhängig. Eine Transaktion mit einem Protokoll mit den Themen [A, B] wird mit den folgenden Themenfiltern abgeglichen:

- `[]` „alles“
- `[A]` „A an erster Stelle (und alles danach)“
- `[null, B]` „Alles an erster Stelle UND B an zweiter Stelle (und alles danach)“
- `[A, B]` „A an erster Stelle UND B an zweiter Stelle (und alles danach)“
- `[[A, B], [A, B]]` „(A ODER B) an erster Stelle UND (A ODER B) an zweiter Stelle (und alles danach)“
- **Parameter**

1. `Object` – die Filteroptionen:

- `fromBlock`: `QUANTITY|TAG` – (optional, standardmäßig: `"latest"`) ganzzahlige Blocknummer oder `"latest"` für den letzten vorgeschlagenen Block, `"safe"` für den letzten sicheren Block, `"finalized"` für den letzten abgeschlossenen Block oder `"pending"`, `"earliest"` für Transaktionen, die noch nicht in einem Block sind.
- `toBlock`: `QUANTITY|TAG` – (optional, standardmäßig: `"latest"`) ganzzahlige Blocknummer oder `"latest"` für den letzten vorgeschlagenen Block, `"safe"` für den letzten sicheren Block, `"finalized"` für den letzten abgeschlossenen Block oder `"pending"`, `"earliest"` für Transaktionen, die noch nicht in einem Block sind.
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

**Rückgaben** `QUANTITY` – eine Filter-ID.

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

Erstellt einen Filter im Knoten, um eine Benachrichtigung auszugeben, wenn ein neuer Block eintrifft. Um zu überprüfen, ob sich der Status geändert hat, rufen Sie [eth_getFilterChanges](#eth_getfilterchanges) auf.

**Parameter** Keine

**Rückgaben** `QUANTITY` – eine Filter-ID.

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

Erstellt einen Filter im Knoten, um eine Benachrichtigung auszugeben, wenn eine neue ausstehende Transaktionen eintrifft. Um zu überprüfen, ob sich der Status geändert hat, rufen Sie [eth_getFilterChanges](#eth_getfilterchanges) auf.

**Parameter** Keine

**Rückgaben** `QUANTITY` – eine Filter-ID.

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

Deinstalliert einen Filter mit angegebener ID. Sollte immer aufgerufen werden, wenn die Uhr nicht mehr benötigt wird. Zusätzlich Timeout für Filter, wenn sie für einen bestimmten Zeitraum nicht mit [eth_getFilterChanges](#eth_getfilterchanges) angefordert werden.

**Parameter**

1. `QUANTITY` – die Filter-ID.

```js
params: [
  "0xb", // 11
]
```

**Rückgabewerte** `Boolean` – `true`, wenn der Filter erfolgreich deinstalliert wurde, andernfalls `false`.

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

Umfragemethode für einen Filter, die ein Array von Protokollen zurückgibt, die seit der letzten Umfrage aufgetreten sind.

**Parameter**

1. `QUANTITY` – die Filter-ID.

```js
params: [
  "0x16", // 22
]
```

**Rückgabewerte** `Array` – Array von Protokollobjekten oder ein leeres Array, wenn sich seit der letzten Umfrage nichts geändert hat.

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
  - `data`: `DATA` – enthält null oder mehr 32 Byte nicht indizierte Argumente des Protokolls.
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

1. `QUANTITY` – die Filter-ID.

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

Gibt ein Array aller Protokolle zurück, die einem angegebenen Filterobjekt entsprechen.

**Parameter**

1. `Object` – die Filteroptionen:

- `fromBlock`: `QUANTITY|TAG` – (optional, standardmäßig: `"latest"`) ganzzahlige Blocknummer oder `"latest"` für den letzten vorgeschlagenen Block, `"safe"` für den letzten sicheren Block, `"finalized"` für den letzten abgeschlossenen Block oder `"pending"`, `"earliest"` für Transaktionen, die noch nicht in einem Block sind.
- `toBlock`: `QUANTITY|TAG` – (optional, standardmäßig: `"latest"`) ganzzahlige Blocknummer oder `"latest"` für den letzten vorgeschlagenen Block, `"safe"` für den letzten sicheren Block, `"finalized"` für den letzten abgeschlossenen Block oder `"pending"`, `"earliest"` für Transaktionen, die noch nicht in einem Block sind.
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

## Anwendungsbeispiel {#usage-example}

### Einen Contract mit JSON_RPC bereitstellen {#deploying-contract}

Dieser Abschnitt enthält eine Demonstration, wie ein Contract nur mithilfe der RPC-Schnittstelle bereitgestellt wird. Es gibt alternative Wege zur Bereitstellung von Contracts, bei denen diese Komplexität abstrahiert wird – zum Beispiel die Verwendung von Bibliotheken, die auf der RPC-Schnittstelle wie [web3.js](https://web3js.readthedocs.io/) und [web3.py](https://github.com/ethereum/web3.py) aufbauen. Diese Abstraktionen sind im Allgemeinen leichter zu verstehen und weniger fehleranfällig, es ist dennoch hilfreich, zu verstehen, was im Hintergrund passiert.

Das Folgende ist ein unkomplizierter Smart Contract namens `Multiply7`, der über die JSON-RPC-Schnittstelle auf einem Ethereum-Knoten bereitgestellt wird. Dieses Tutorial geht davon aus, dass der Reader bereits einen Geth-Knoten ausführt. Weitere Informationen zu Nodes und Clients finden Sie [hier](/developers/docs/nodes-and-clients/run-a-node). Bitte sehen Sie in der jeweiligen [Client](/developers/docs/nodes-and-clients/)-Dokumentation nach, wie Sie den HTTP-JSON-RPC für Nicht-Geth-Clients starten. Die meisten Clients werden standardmäßig auf `localhost:8545` ausgeführt.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Stellen Sie zunächst sicher, dass die HTTP-RPC-Schnittstelle aktiviert ist. Das bedeutet, dass wir Geth beim Start mit dem `--http`-Flag versehen. In diesem Beispiel verwenden wir den Geth-Knoten in einer privaten Entwicklungs-Blockchain. Mit diesem Ansatz benötigen wir kein Ether im echten Netzwerk.

```bash
geth --http --dev console 2>>geth.log
```

Dadurch wird die HTTP-RPC-Schnittstelle auf `http://localhost:8545` gestartet.

Wir können überprüfen, ob die Schnittstelle läuft, indem wir die Coinbase-Adresse und den Saldo mit [curl](https://curl.se) abrufen. Bitte beachten Sie, dass sich die Daten in diesen Beispielen auf Ihrem lokalen Knoten unterscheiden. Wenn Sie diese Befehle ausprobieren möchten, ersetzen Sie die Anfrageparameter in der zweiten Curl-Anfrage durch das Ergebnis, das von der ersten zurückgegeben wird.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_coinbase", "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Da Zahlen hexadezimal codiert sind, wird der Saldo in Wei als hexadezimaler String zurückgegeben. Wenn wir das Guthaben in Ether als Zahl haben möchten, können wir web3 von der Geth-Konsole verwenden.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Jetzt, da es etwas Ether in unserer privaten Entwicklungs-Kette gibt, können wir den Contract bereitstellen. Der erste Schritt besteht darin, den Multiply7-Contract in Bytecode zu kompilieren, der an die EVM gesendet werden kann. Um Solc, den Solidity-Compiler, zu installieren, folgen Sie der [Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Möglicherweise möchten Sie eine ältere `solc`-Version verwenden, um der [Version des verwendeten Compilers für unser Beispiel zu entsprechen](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Der nächste Schritt besteht darin, den Multiply7-Contract in Bytecode zu kompilieren, der an die EVM gesendet werden kann.

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

Und schließlich stellen Sie den Contract bereit.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Die Transaktion wird von dem Knoten akzeptiert und ein Transaktions-Hash wird zurückgegeben. Dieser Hash kann verwendet werden, um die Transaktion zu verfolgen. Der nächste Schritt besteht darin, die Adresse zu ermitteln, an der unser Contract bereitgestellt wird. Jede ausgeführte Transaktion erstellt einen Beleg. Dieser Beleg enthält verschiedene Informationen über die Transaktion, wie z. B. in welchem Block die Transaktion enthalten war und wie viel Gas von der EVM verbraucht wurde. Wenn eine Transaktion einen Contract erstellt, enthält sie auch die Contract-Adresse. Wir können den Beleg mit der RPC-Methode `eth_getTransactionReceipt` abrufen.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Unser Contract wurde am `0x4d03d617d700cf81935d7f797f4e2ae719648262` erstellt. Ein Nullergebnis anstelle eines Belegs bedeutet, dass die Transaktion noch nicht in einen Block aufgenommen wurde. Warten Sie einen Moment, prüfen Sie, ob Ihr Konsens-Client ausgeführt wird, und versuchen Sie es erneut.

#### Interaktion mit Smart Contracts {#interacting-with-smart-contract}

In diesem Beispiel senden wir eine Transaktion mit `eth_sendTransaction` an die Methode `multiply` des Contracts.

`eth_sendTransaction` erfordert mehrere Argumente, speziell `from`, `to` und `data`. `From` ist die öffentliche Adresse unseres Kontos und `to` ist die Contract-Adresse. Das Argument `data` enthält eine Nutzlast, die definiert, welche Methode mit welchen Argumenten aufgerufen werden muss. An dieser Stelle kommt die [ABI (Application Binary Interface – binäre Anwendungsschnittstelle)](https://docs.soliditylang.org/en/latest/abi-spec.html) ins Spiel. Die ABI ist eine JSON-Datei, die festlegt, wie Daten für die EVM definiert und kodiert werden.

Die Byte der Nutzlast definieren, welche Methode im Contract aufgerufen wird. Das sind die ersten 4 Byte aus dem Keccak-Hash über den Funktionsnamen und seine Argumenttypen, Hex-codiert. Die Multiplizieren-Funktion akzeptiert ein uint, welches ein Alias für uint256 ist. Damit bleibt uns:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Der nächste Schritt besteht darin, die Argumente zu codieren. Es gibt nur einen uint256, beispielsweise den Wert 6. Die ABI hat einen Abschnitt, der angibt, wie uint256-Typen codiert werden.

`int<M>: enc(X)` ist die Big-Endian-Zweierkomplementcodierung von X, aufgefüllt auf der Seite höherer Ordnung (links) mit 0xff für negatives X und mit null > Byte für positives X, sodass die Länge ein Vielfaches von 32 Byte ist.

Dies wird zu `0000000000000000000000000000000000000000000000000000000000006` codiert.

Durch die Kombination des Funktionsselektors und des codierten Arguments werden unsere Daten zu `0xc6888fa10000000000000000000000000000000000000000000000000000000000006`.

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

Der Beleg enthält ein Protokoll. Dieses Protokoll wurde von der EVM bei der Transaktionsausführung generiert und in den Beleg aufgenommen. Die Funktion `multiply` zeigt, dass das Ereignis `Print` mit der Eingabe mal 7 ausgelöst wurde. Da das Argument für das Ereignis `Print` ein uint256 war, können wir es gemäß den ABI-Regeln dekodieren, was zu der erwarteten Dezimalzahl 42 führt. Abgesehen von den Daten ist es erwähnenswert, dass Themen verwendet werden können, um festzustellen, welches Ereignis das Protokoll erstellt hat:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Das war nur eine kurze Einführung in einige der häufigsten Aufgaben, die die direkte Verwendung von JSON-RPC demonstrieren.

## Verwandte Themen {#related-topics}

- [JSON-RPC-Spezifikation](http://www.jsonrpc.org/specification)
- [Knotenpunkte und Clients](/developers/docs/nodes-and-clients/)
- [JavaScript-APIs](/developers/docs/apis/javascript/)
- [Backend-APIs](/developers/docs/apis/backend/)
- [Ausführende Clients](/developers/docs/nodes-and-clients/#execution-clients)
