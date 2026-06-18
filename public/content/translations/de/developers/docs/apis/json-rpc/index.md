---
title: JSON-RPC API
description: "Ein zustandsloses, leichtgewichtiges Remote-Procedure-Call-Protokoll (RPC) für Ethereum-Clients."
lang: de
---

Damit eine Softwareanwendung mit der [Ethereum](/)-Blockchain interagieren kann – sei es durch das Lesen von Blockchain-Daten oder das Senden von Transaktionen an das Netzwerk –, muss sie sich mit einem Ethereum-Knoten verbinden.

Zu diesem Zweck implementiert jeder [Ethereum-Client](/developers/docs/nodes-and-clients/#execution-clients) eine [JSON-RPC-Spezifikation](https://github.com/ethereum/execution-apis), sodass es eine einheitliche Reihe von Methoden gibt, auf die sich Anwendungen unabhängig von der spezifischen Knoten- oder Client-Implementierung verlassen können.

[JSON-RPC](https://www.jsonrpc.org/specification) ist ein zustandsloses, leichtgewichtiges Remote-Procedure-Call-Protokoll (RPC). Es definiert mehrere Datenstrukturen und die Regeln für deren Verarbeitung. Es ist transportunabhängig, da die Konzepte innerhalb desselben Prozesses, über Sockets, über HTTP oder in vielen verschiedenen Message-Passing-Umgebungen verwendet werden können. Es verwendet JSON (RFC 4627) als Datenformat.

## Client-Implementierungen {#client-implementations}

Ethereum-Clients können bei der Implementierung der JSON-RPC-Spezifikation jeweils unterschiedliche Programmiersprachen verwenden. Weitere Details zu bestimmten Programmiersprachen finden Sie in der jeweiligen [Client-Dokumentation](/developers/docs/nodes-and-clients/#execution-clients). Wir empfehlen, die Dokumentation jedes Clients auf die neuesten Informationen zur API-Unterstützung zu prüfen.

## Hilfsbibliotheken {#convenience-libraries}

Obwohl Sie direkt über die JSON-RPC-API mit Ethereum-Clients interagieren können, gibt es für Entwickler von dezentralen Anwendungen (Dapps) oft einfachere Optionen. Es gibt viele [JavaScript](/developers/docs/apis/javascript/#available-libraries)- und [Backend-API](/developers/docs/apis/backend/#available-libraries)-Bibliotheken, die Wrapper für die JSON-RPC-API bereitstellen. Mit diesen Bibliotheken können Entwickler intuitive, einzeilige Methoden in der Programmiersprache ihrer Wahl schreiben, um (im Hintergrund) JSON-RPC-Anfragen zu initialisieren, die mit Ethereum interagieren.

## Konsens-Client-APIs {#consensus-clients}

Diese Seite befasst sich hauptsächlich mit der JSON-RPC-API, die von Ethereum-Ausführungsclients verwendet wird. Allerdings verfügen auch Konsens-Clients über eine RPC-API, die es Benutzern ermöglicht, Informationen über den Knoten abzufragen, Beacon-Blöcke, den Beacon-Zustand und andere konsensbezogene Informationen direkt von einem Knoten anzufordern. Diese API ist auf der [Webseite zur Beacon-API](https://ethereum.github.io/beacon-APIs/#/) dokumentiert.

Eine interne API wird auch für die Kommunikation zwischen Clients innerhalb eines Knotens verwendet – das heißt, sie ermöglicht es dem Konsens-Client und dem Ausführungsclient, Daten auszutauschen. Diese wird als 'Engine API' bezeichnet und die Spezifikationen sind auf [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) verfügbar.

## Ausführungsclient-Spezifikation {#spec}

[Lesen Sie die vollständige JSON-RPC-API-Spezifikation auf GitHub](https://github.com/ethereum/execution-apis). Diese API ist auf der [Webseite der Ausführungs-API](https://ethereum.github.io/execution-apis/) dokumentiert und enthält einen Inspektor, um alle verfügbaren Methoden auszuprobieren.

## Konventionen {#conventions}

### Hex-Wert-Codierung {#hex-encoding}

Zwei wichtige Datentypen werden über JSON übergeben: unformatierte Byte-Arrays und Mengen (Quantities). Beide werden mit einer Hex-Codierung übergeben, haben jedoch unterschiedliche Anforderungen an die Formatierung.

#### Mengen {#quantities-encoding}

Beim Codieren von Mengen (Ganzzahlen, Zahlen): als Hex codieren, mit "0x" präfixieren, die kompakteste Darstellung verwenden (kleine Ausnahme: Null sollte als "0x0" dargestellt werden).

Hier sind einige Beispiele:

- 0x41 (65 dezimal)
- 0x400 (1024 dezimal)
- FALSCH: 0x (sollte immer mindestens eine Ziffer haben - Null ist "0x0")
- FALSCH: 0x0400 (keine führenden Nullen erlaubt)
- FALSCH: ff (muss mit 0x präfixiert sein)

### Unformatierte Daten {#unformatted-data-encoding}

Beim Codieren unformatierter Daten (Byte-Arrays, Kontoadressen, Hashes, Bytecode-Arrays): als Hex codieren, mit "0x" präfixieren, zwei Hex-Ziffern pro Byte.

Hier sind einige Beispiele:

- 0x41 (Größe 1, "A")
- 0x004200 (Größe 3, "0B0")
- 0x (Größe 0, "")
- FALSCH: 0xf0f0f (muss eine gerade Anzahl von Ziffern sein)
- FALSCH: 004200 (muss mit 0x präfixiert sein)

### Der Block-Parameter {#block-parameter}

Die folgenden Methoden haben einen Block-Parameter:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

Wenn Anfragen gestellt werden, die den Zustand von Ethereum abfragen, bestimmt der angegebene Block-Parameter die Höhe des Blocks.

Die folgenden Optionen sind für den Block-Parameter möglich:

- `HEX String` - eine ganzzahlige Blocknummer
- `String "earliest"` für den frühesten/Genesis-Block
- `String "latest"` - für den neuesten vorgeschlagenen Block
- `String "safe"` - für den neuesten sicheren Head-Block
- `String "finalized"` - für den neuesten endgültigen Block
- `String "pending"` - für den ausstehenden Zustand/Transaktionen

## Beispiele {#examples}

Auf dieser Seite stellen wir Beispiele dafür bereit, wie man einzelne JSON_RPC-API-Endpunkte mit dem Befehlszeilentool [curl](https://curl.se) verwendet. Diese Beispiele für einzelne Endpunkte finden sich unten im Abschnitt [Curl-Beispiele](#curl-examples). Weiter unten auf der Seite bieten wir auch ein [End-to-End-Beispiel](#usage-example) für das Kompilieren und Bereitstellen eines Smart Contracts unter Verwendung eines Geth-Knotens, der JSON_RPC-API und curl.

## Curl-Beispiele {#curl-examples}

Im Folgenden finden Sie Beispiele für die Verwendung der JSON-RPC-API durch [curl](https://curl.se)-Anfragen an einen Ethereum-Knoten. Jedes Beispiel enthält eine Beschreibung des spezifischen Endpunkts, seiner Parameter, des Rückgabetyps und ein ausgearbeitetes Beispiel für seine Verwendung.

Die curl-Anfragen geben möglicherweise eine Fehlermeldung bezüglich des Inhaltstyps (Content-Type) zurück. Das liegt daran, dass die Option `--data` den Inhaltstyp auf `application/x-www-form-urlencoded` setzt. Wenn Ihr Knoten dies beanstandet, setzen Sie den Header manuell, indem Sie `-H "Content-Type: application/json"` an den Anfang des Aufrufs setzen. Die Beispiele enthalten auch nicht die Kombination aus URL/IP und Port, die das letzte Argument für curl sein muss (z. B. `127.0.0.1:8545`). Eine vollständige curl-Anfrage, die diese zusätzlichen Daten enthält, hat die folgende Form:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, Zustand, Historie {#gossip-state-history}

Eine Handvoll zentraler JSON-RPC-Methoden benötigt Daten aus dem Ethereum-Netzwerk und lässt sich gut in drei Hauptkategorien einteilen: _Gossip, Zustand und Historie_. Nutzen Sie die Links in diesen Abschnitten, um zu den einzelnen Methoden zu springen, oder verwenden Sie das Inhaltsverzeichnis, um die gesamte Liste der Methoden zu erkunden.

### Gossip-Methoden {#gossip-methods}

> Diese Methoden verfolgen die Spitze der Chain. Auf diese Weise verbreiten sich Transaktionen im Netzwerk, finden ihren Weg in Blöcke und Clients erfahren von neuen Blöcken.

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### Zustandsmethoden {#state-methods}

> Methoden, die den aktuellen Zustand aller gespeicherten Daten melden. Der „Zustand“ ist wie ein großer, gemeinsam genutzter Arbeitsspeicher (RAM) und umfasst Kontostände, Vertragsdaten und Gasschätzungen.

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### Historienmethoden {#history-methods}

> Ruft historische Aufzeichnungen jedes Blocks bis zurück zum Genesis-Block ab. Dies ist wie eine große Datei, an die nur angehängt werden kann (append-only), und umfasst alle Block-Header, Block-Körper, Uncle-Blöcke und Transaktionsbelege.

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

Du kannst das [Playground-Tool](https://ethereum-json-rpc.com) verwenden, um die API-Methoden zu entdecken und auszuprobieren. Es zeigt dir auch, welche Methoden und Netzwerke von verschiedenen Knoten-Anbietern unterstützt werden.

## JSON-RPC-API-Methoden {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

Gibt die aktuelle Client-Version zurück.

**Parameter**

Keine

**Rückgabe**

`String` - Die aktuelle Client-Version

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Ergebnis
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

Gibt Keccak-256 (_nicht_ das standardisierte SHA3-256) der angegebenen Daten zurück.

**Parameter**

1. `DATA` - Die Daten, die in einen SHA3-Hash konvertiert werden sollen

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Rückgabe**

`DATA` - Das SHA3-Ergebnis der angegebenen Zeichenfolge.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Ergebnis
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

Gibt die aktuelle Netzwerk-ID zurück.

**Parameter**

Keine

**Rückgabe**

`String` - Die aktuelle Netzwerk-ID.

Die vollständige Liste der aktuellen Netzwerk-IDs ist unter [chainlist.org](https://chainlist.org) verfügbar. Einige der gängigsten sind:

- `1`: Ethereum Mainnet
- `11155111`: Sepolia Testnetz
- `560048` : Hoodi Testnetz

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Ergebnis
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

Gibt `true` zurück, wenn der Client aktiv auf Netzwerkverbindungen lauscht.

**Parameter**

Keine

**Rückgabe**

`Boolean` - `true`, wenn er lauscht, andernfalls `false`.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Ergebnis
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

Gibt die Anzahl der Peers zurück, die derzeit mit dem Client verbunden sind.

**Parameter**

Keine

**Rückgabe**

`QUANTITY` - Ganzzahl der Anzahl der verbundenen Peers.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Ergebnis
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

Gibt die aktuelle Ethereum-Protokollversion zurück. Beachten Sie, dass diese Methode [in Geth nicht verfügbar ist](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Parameter**

Keine

**Rückgabe**

`String` - Die aktuelle Ethereum-Protokollversion

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Ergebnis
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

Gibt ein Objekt mit Daten zum Synchronisierungsstatus oder `false` zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

Keine

**Rückgabe**

Die genauen Rückgabedaten variieren zwischen den Client-Implementierungen. Alle Clients geben `False` zurück, wenn der Knoten nicht synchronisiert, und alle Clients geben die folgenden Felder zurück.

`Object|Boolean`, Ein Objekt mit Daten zum Synchronisierungsstatus oder `FALSE`, wenn nicht synchronisiert wird:

- `startingBlock`: `QUANTITY` - Der Block, bei dem der Import gestartet wurde (wird erst zurückgesetzt, nachdem die Synchronisierung ihren Head erreicht hat)
- `currentBlock`: `QUANTITY` - Der aktuelle Block, identisch mit eth_blockNumber
- `highestBlock`: `QUANTITY` - Der geschätzte höchste Block

Die einzelnen Clients können jedoch auch zusätzliche Daten bereitstellen. Geth gibt beispielsweise Folgendes zurück:

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

Wohingegen Besu Folgendes zurückgibt:

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

Weitere Details finden Sie in der Dokumentation Ihres spezifischen Clients.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Oder wenn keine Synchronisierung stattfindet
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

Gibt die Coinbase-Adresse des Clients zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Endpunkt im Playground ausprobieren
</ButtonLink>

> **Hinweis:** Diese Methode ist seit **v1.14.0** veraltet und wird nicht mehr unterstützt. Der Versuch, diese Methode zu verwenden, führt zu dem Fehler „Method not supported“.

**Parameter**

Keine

**Rückgabe**

`DATA`, 20 Bytes - die aktuelle Coinbase-Adresse.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Ergebnis
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

Gibt die Chain-ID zurück, die zum Signieren von Replay-geschützten Transaktionen verwendet wird.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Endpunkt im Playground testen
</ButtonLink>

**Parameter**

Keine

**Rückgabe**

`chainId`, hexadezimaler Wert als String, der den Integer-Wert der aktuellen Chain-ID darstellt.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Ergebnis
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

Gibt `true` zurück, wenn der Client aktiv neue Blöcke durch Mining erstellt. Dies kann nur für Proof-of-Work-Netzwerke `true` zurückgeben und ist in einigen Clients seit [dem Merge](/roadmap/merge/) möglicherweise nicht mehr verfügbar.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

Keine

**Rückgabe**

`Boolean` - gibt `true` zurück, wenn der Client Mining betreibt, andernfalls `false`.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

Gibt die Anzahl der Hashes pro Sekunde zurück, mit denen der Knoten Mining betreibt. Dies kann nur für Proof-of-Work-Netzwerke `true` zurückgeben und ist in einigen Clients seit [dem Merge](/roadmap/merge/) möglicherweise nicht mehr verfügbar.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

Keine

**Rückgabe**

`QUANTITY` - Anzahl der Hashes pro Sekunde.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Ergebnis
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

Gibt eine Schätzung des aktuellen Preises pro Gas in Wei zurück. Beispielsweise untersucht der Besu-Client standardmäßig die letzten 100 Blöcke und gibt den Median des Preises pro Gaseinheit zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

Keine

**Rückgabe**

`QUANTITY` - Ganzzahl des aktuellen Gaspreises in Wei.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Ergebnis
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

Gibt eine Liste von Adressen zurück, die dem Client gehören.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

Keine

**Rückgabe**

`Array of DATA`, 20 Bytes - Adressen, die dem Client gehören.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

Gibt die Nummer des aktuellsten Blocks zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

Keine

**Rückgabe**

`QUANTITY` - Ganzzahl der aktuellen Blocknummer, auf der sich der Client befindet.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Ergebnis
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

Gibt das Guthaben des Kontos an einer bestimmten Adresse zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `DATA`, 20 Bytes - Adresse, deren Guthaben überprüft werden soll.
2. `QUANTITY|TAG` - ganzzahlige Blocknummer oder die Zeichenfolge `"latest"`, `"earliest"`, `"pending"`, `"safe"` oder `"finalized"`, siehe [Block-Parameter](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Rückgabe**

`QUANTITY` - Ganzzahl des aktuellen Guthabens in Wei.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

Gibt den Wert von einer Speicherposition an einer bestimmten Adresse zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Endpunkt im Playground testen
</ButtonLink>

**Parameter**

1. `DATA`, 20 Bytes - Adresse des Speichers.
2. `QUANTITY` - Ganzzahl der Position im Speicher.
3. `QUANTITY|TAG` - ganzzahlige Blocknummer oder die Zeichenfolge `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, siehe [Block-Parameter](/developers/docs/apis/json-rpc/#block-parameter)

**Rückgabe**

`DATA` - der Wert an dieser Speicherposition.

**Beispiel**
Die Berechnung der korrekten Position hängt von dem abzurufenden Speicher ab. Betrachten Sie den folgenden Vertrag, der unter `0x295a70b2de5e3953354a6a8344e616ed314d7251` von der Adresse `0x391694e7e0b0cce554cb130d723a9d27458f9298` bereitgestellt wurde.

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

Das Abrufen des Wertes von pos0 ist unkompliziert:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Das Abrufen eines Elements der Map ist schwieriger. Die Position eines Elements in der Map wird wie folgt berechnet:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Das bedeutet, um den Speicher auf pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] abzurufen, müssen wir die Position wie folgt berechnen:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Die Geth-Konsole, die mit der Web3-Bibliothek geliefert wird, kann für die Berechnung verwendet werden:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Nun zum Abrufen des Speichers:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

Gibt die Anzahl der Transaktionen zurück, die von einer Adresse _gesendet_ wurden.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `DATA`, 20 Bytes - Adresse.
2. `QUANTITY|TAG` - ganzzahlige Blocknummer oder die Zeichenfolge `"latest"`, `"earliest"`, `"pending"`, `"safe"` oder `"finalized"`, siehe [Block-Parameter](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // Zustand beim neuesten Block
]
```

**Rückgabe**

`QUANTITY` - Ganzzahl der Anzahl der von dieser Adresse gesendeten Transaktionen.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

Gibt die Anzahl der Transaktionen in einem Block zurück, der dem angegebenen Block-Hash entspricht.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bytes - Hash eines Blocks

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Rückgabe**

`QUANTITY` - Ganzzahl, die die Anzahl der Transaktionen in diesem Block angibt.

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

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

Gibt die Anzahl der Transaktionen in einem Block zurück, der der angegebenen Blocknummer entspricht.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `QUANTITY|TAG` - Ganzzahl einer Blocknummer oder der String `"earliest"`, `"latest"`, `"pending"`, `"safe"` oder `"finalized"`, wie im [Block-Parameter](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Rückgabe**

`QUANTITY` - Ganzzahl der Anzahl der Transaktionen in diesem Block.

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

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

Gibt die Anzahl der Uncles in einem Block zurück, der dem angegebenen Block-Hash entspricht.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bytes - Hash eines Blocks

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Rückgabe**

`QUANTITY` - Ganzzahl mit der Anzahl der Uncles in diesem Block.

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

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

Gibt die Anzahl der Uncles in einem Block zurück, der der angegebenen Blocknummer entspricht.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `QUANTITY|TAG` - Ganzzahl einer Blocknummer oder die Zeichenfolge `"latest"`, `"earliest"`, `"pending"`, `"safe"` oder `"finalized"`, siehe [Block-Parameter](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Rückgabe**

`QUANTITY` - Ganzzahl der Anzahl der Uncles in diesem Block.

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

### eth_getCode {#eth-getcode}

Gibt den Code an einer bestimmten Adresse zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `DATA`, 20 Bytes - Adresse
2. `QUANTITY|TAG` - ganzzahlige Blocknummer oder der String `"latest"`, `"earliest"`, `"pending"`, `"safe"` oder `"finalized"`, siehe den [Block-Parameter](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Rückgabe**

`DATA` - der Code von der angegebenen Adresse.

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

### eth_sign {#eth-sign}

Die sign-Methode berechnet eine Ethereum-spezifische Signatur mit: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Durch das Hinzufügen eines Präfixes zur Nachricht wird die berechnete Signatur als Ethereum-spezifische Signatur erkennbar. Dies verhindert Missbrauch, bei dem eine bösartige dezentrale Anwendung (Dapp) beliebige Daten (z. B. eine Transaktion) signieren und die Signatur verwenden kann, um sich als das Opfer auszugeben.

Hinweis: Die Adresse, mit der signiert wird, muss entsperrt sein.

**Parameter**

1. `DATA`, 20 Bytes - Adresse
2. `DATA`, N Bytes - zu signierende Nachricht

**Rückgabe**

`DATA`: Signatur

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

Signiert eine Transaktion, die zu einem späteren Zeitpunkt mit [eth_sendRawTransaction](#eth-sendrawtransaction) an das Netzwerk übermittelt werden kann.

**Parameter**

1. `Object` - Das Transaktionsobjekt

- `type`:
- `from`: `DATA`, 20 Bytes - Die Adresse, von der die Transaktion gesendet wird.
- `to`: `DATA`, 20 Bytes - (optional bei der Erstellung eines neuen Vertrags) Die Adresse, an die die Transaktion gerichtet ist.
- `gas`: `QUANTITY` - (optional, Standardwert: 90000) Ganzzahl des für die Transaktionsausführung bereitgestellten Gases. Nicht verbrauchtes Gas wird zurückgegeben.
- `gasPrice`: `QUANTITY` - (optional, Standardwert: noch festzulegen) Ganzzahl des Gaspreises, der für jedes bezahlte Gas verwendet wird, in Wei.
- `value`: `QUANTITY` - (optional) Ganzzahl des mit dieser Transaktion gesendeten Wertes, in Wei.
- `data`: `DATA` - Der kompilierte Code eines Vertrags ODER der Hash der aufgerufenen Methodensignatur und der codierten Parameter.
- `nonce`: `QUANTITY` - (optional) Ganzzahl einer Nonce. Dies ermöglicht es, eigene ausstehende Transaktionen zu überschreiben, die dieselbe Nonce verwenden.

**Rückgabe**

`DATA`, Das RLP-codierte Transaktionsobjekt, das von dem angegebenen Konto signiert wurde.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Ergebnis
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

Erstellt eine neue Nachrichtenaufruf-Transaktion oder eine Vertragserstellung, falls das Datenfeld Code enthält, und signiert diese mit dem in `from` angegebenen Konto.

**Parameter**

1. `Object` - Das Transaktionsobjekt

- `from`: `DATA`, 20 Bytes - Die Adresse, von der die Transaktion gesendet wird.
- `to`: `DATA`, 20 Bytes - (optional bei der Erstellung eines neuen Vertrags) Die Adresse, an die die Transaktion gerichtet ist.
- `gas`: `QUANTITY` - (optional, Standardwert: 90000) Ganzzahl des für die Transaktionsausführung bereitgestellten Gases. Nicht verbrauchtes Gas wird zurückgegeben.
- `gasPrice`: `QUANTITY` - (optional, Standardwert: noch festzulegen) Ganzzahl des Gaspreises, der für jedes bezahlte Gas verwendet wird.
- `value`: `QUANTITY` - (optional) Ganzzahl des mit dieser Transaktion gesendeten Wertes.
- `input`: `DATA` - Der kompilierte Code eines Vertrags ODER der Hash der aufgerufenen Methodensignatur und der codierten Parameter.
- `nonce`: `QUANTITY` - (optional) Ganzzahl einer Nonce. Dies ermöglicht es, eigene ausstehende Transaktionen zu überschreiben, die dieselbe Nonce verwenden.

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

**Rückgabe**

`DATA`, 32 Bytes - der Transaktions-Hash oder der Null-Hash, wenn die Transaktion noch nicht verfügbar ist.

Verwenden Sie [eth_getTransactionReceipt](#eth-gettransactionreceipt), um die Vertragsadresse zu erhalten, nachdem die Transaktion in einem Block vorgeschlagen wurde, wenn Sie einen Vertrag erstellt haben.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

Erstellt eine neue Nachrichtenaufruf-Transaktion oder eine Vertragserstellung für signierte Transaktionen.

**Parameter**

1. `DATA`, Die signierten Transaktionsdaten.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Rückgabe**

`DATA`, 32 Bytes - der Transaktions-Hash, oder der Null-Hash, falls die Transaktion noch nicht verfügbar ist.

Verwenden Sie [eth_getTransactionReceipt](#eth-gettransactionreceipt), um die Vertragsadresse zu erhalten, nachdem die Transaktion in einem Block vorgeschlagen wurde, falls Sie einen Vertrag erstellt haben.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

Führt sofort einen neuen Nachrichtenaufruf aus, ohne eine Transaktion auf der Blockchain zu erstellen. Wird oft für die Ausführung von schreibgeschützten Smart-Contract-Funktionen verwendet, zum Beispiel `balanceOf` für einen ERC-20-Vertrag.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `Object` - Das Transaktionsaufruf-Objekt

- `from`: `DATA`, 20 Bytes - (optional) Die Adresse, von der die Transaktion gesendet wird.
- `to`: `DATA`, 20 Bytes - Die Adresse, an die die Transaktion gerichtet ist.
- `gas`: `QUANTITY` - (optional) Ganzzahl des für die Transaktionsausführung bereitgestellten Gases. eth_call verbraucht kein Gas, aber dieser Parameter wird möglicherweise von einigen Ausführungen benötigt.
- `gasPrice`: `QUANTITY` - (optional) Ganzzahl des Gaspreises, der für jedes bezahlte Gas verwendet wird
- `value`: `QUANTITY` - (optional) Ganzzahl des mit dieser Transaktion gesendeten Wertes
- `input`: `DATA` - (optional) Hash der Methodensignatur und der kodierten Parameter. Weitere Details finden Sie unter [Ethereum Contract ABI in der Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - Ganzzahl der Blocknummer oder die Zeichenfolge `"latest"`, `"earliest"`, `"pending"`, `"safe"` oder `"finalized"`, siehe [Block-Parameter](/developers/docs/apis/json-rpc/#block-parameter)

**Rückgabe**

`DATA` - der Rückgabewert des ausgeführten Vertrags.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

Generiert und gibt eine Schätzung zurück, wie viel Gas erforderlich ist, damit die Transaktion abgeschlossen werden kann. Die Transaktion wird nicht zur Blockchain hinzugefügt. Beachten Sie, dass die Schätzung aus verschiedenen Gründen, einschließlich EVM-Mechanik und Knotenleistung, deutlich höher sein kann als die tatsächlich von der Transaktion verbrauchte Gasmenge.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

Siehe [eth_call](#eth-call)-Parameter, mit der Ausnahme, dass alle Eigenschaften optional sind. Wenn kein Gaslimit angegeben ist, verwendet Geth das Block-Gaslimit des ausstehenden Blocks als Obergrenze. Infolgedessen reicht die zurückgegebene Schätzung möglicherweise nicht aus, um den Aufruf/die Transaktion auszuführen, wenn die Gasmenge höher ist als das Gaslimit des ausstehenden Blocks.

**Rückgabe**

`QUANTITY` - die verbrauchte Gasmenge.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

Gibt Informationen über einen Block anhand seines Hashes zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bytes - Hash eines Blocks.
2. `Boolean` - Wenn `true`, werden die vollständigen Transaktionsobjekte zurückgegeben, wenn `false`, nur die Hashes der Transaktionen.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Rückgabe**

`Object` - Ein Block-Objekt, oder `null`, wenn kein Block gefunden wurde:

- `number`: `QUANTITY` - die Blocknummer. `null`, wenn es sich um einen ausstehenden Block handelt.
- `hash`: `DATA`, 32 Bytes - Hash des Blocks. `null`, wenn es sich um einen ausstehenden Block handelt.
- `parentHash`: `DATA`, 32 Bytes - Hash des übergeordneten Blocks.
- `nonce`: `DATA`, 8 Bytes - Hash des generierten Proof-of-Work. `null`, wenn es sich um einen ausstehenden Block handelt, `0x0` für Proof-of-Stake-Blöcke (seit dem Merge)
- `sha3Uncles`: `DATA`, 32 Bytes - SHA3 der Uncles-Daten im Block.
- `logsBloom`: `DATA`, 256 Bytes - der Bloom-Filter für die Logs des Blocks. `null`, wenn es sich um einen ausstehenden Block handelt.
- `transactionsRoot`: `DATA`, 32 Bytes - die Wurzel des Transaktions-Tries des Blocks.
- `stateRoot`: `DATA`, 32 Bytes - die Wurzel des endgültigen Zustands-Tries des Blocks.
- `receiptsRoot`: `DATA`, 32 Bytes - die Wurzel des Transaktionsbeleg-Tries des Blocks.
- `miner`: `DATA`, 20 Bytes - die Adresse des Begünstigten, an den die Blockbelohnungen vergeben wurden.
- `difficulty`: `QUANTITY` - Integer der Schwierigkeit für diesen Block.
- `totalDifficulty`: `QUANTITY` - Integer der Gesamtschwierigkeit der Chain bis zu diesem Block.
- `extraData`: `DATA` - das "Extra Data"-Feld dieses Blocks.
- `size`: `QUANTITY` - Integer der Größe dieses Blocks in Bytes.
- `gasLimit`: `QUANTITY` - das maximal zulässige Gas in diesem Block.
- `gasUsed`: `QUANTITY` - das gesamte verbrauchte Gas aller Transaktionen in diesem Block.
- `timestamp`: `QUANTITY` - der Unix-Zeitstempel für den Zeitpunkt, an dem der Block erstellt wurde.
- `transactions`: `Array` - Array von Transaktionsobjekten oder 32-Byte-Transaktions-Hashes, abhängig vom zuletzt übergebenen Parameter.
- `uncles`: `Array` - Array von Uncle-Hashes.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Ergebnis
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

Gibt Informationen über einen Block anhand der Blocknummer zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `QUANTITY|TAG` - Ganzzahl einer Blocknummer oder der String `"earliest"`, `"latest"`, `"pending"`, `"safe"` oder `"finalized"`, wie im [Block-Parameter](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - Wenn `true`, werden die vollständigen Transaktionsobjekte zurückgegeben, wenn `false`, nur die Hashes der Transaktionen.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Rückgabe**
Siehe [eth_getBlockByHash](#eth-getblockbyhash)

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Ergebnis siehe [eth_getBlockByHash](#eth-getblockbyhash)

### eth_getTransactionByHash {#eth-gettransactionbyhash}

Gibt die Informationen zu einer Transaktion zurück, die über den Transaktions-Hash angefordert wurde.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bytes - Hash einer Transaktion

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Rückgabe**

`Object` - Ein Transaktionsobjekt, oder `null`, wenn keine Transaktion gefunden wurde:

- `blockHash`: `DATA`, 32 Bytes - Hash des Blocks, in dem sich diese Transaktion befand. `null`, wenn sie ausstehend ist.
- `blockNumber`: `QUANTITY` - Blocknummer, in der sich diese Transaktion befand. `null`, wenn sie ausstehend ist.
- `from`: `DATA`, 20 Bytes - Adresse des Absenders.
- `gas`: `QUANTITY` - Vom Absender bereitgestelltes Gas.
- `gasPrice`: `QUANTITY` - Vom Absender bereitgestellter Gaspreis in Wei.
- `hash`: `DATA`, 32 Bytes - Hash der Transaktion.
- `input`: `DATA` - Die mit der Transaktion gesendeten Daten.
- `nonce`: `QUANTITY` - Die Anzahl der Transaktionen, die der Absender vor dieser getätigt hat.
- `to`: `DATA`, 20 Bytes - Adresse des Empfängers. `null`, wenn es sich um eine Vertragserstellungstransaktion handelt.
- `transactionIndex`: `QUANTITY` - Integer der Indexposition der Transaktion im Block. `null`, wenn sie ausstehend ist.
- `value`: `QUANTITY` - Übertragener Wert in Wei.
- `v`: `QUANTITY` - ECDSA-Recovery-ID
- `r`: `QUANTITY` - ECDSA-Signatur r
- `s`: `QUANTITY` - ECDSA-Signatur s

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Ergebnis
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

Gibt Informationen über eine Transaktion anhand des Block-Hashs und der Transaktions-Indexposition zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bytes - Hash eines Blocks.
2. `QUANTITY` - Ganzzahl der Transaktions-Indexposition.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Rückgabe**
Siehe [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Ergebnis siehe [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

Gibt Informationen über eine Transaktion anhand der Blocknummer und der Transaktionsindexposition zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `QUANTITY|TAG` - eine Blocknummer oder die Zeichenfolge `"earliest"`, `"latest"`, `"pending"`, `"safe"` oder `"finalized"`, wie im [Block-Parameter](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - die Transaktionsindexposition.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Rückgabe**
Siehe [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Ergebnis siehe [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

Gibt den Transaktionsbeleg einer Transaktion anhand des Transaktions-Hashs zurück.

**Hinweis:** Der Transaktionsbeleg ist für ausstehende Transaktionen nicht verfügbar.

**Parameter**

1. `DATA`, 32 Bytes - Hash einer Transaktion

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Rückgabe**
`Object` - Ein Transaktionsbeleg-Objekt, oder `null`, wenn kein Beleg gefunden wurde:

- `transactionHash `: `DATA`, 32 Bytes - Hash der Transaktion.
- `transactionIndex`: `QUANTITY` - Integer der Indexposition der Transaktion im Block.
- `blockHash`: `DATA`, 32 Bytes - Hash des Blocks, in dem sich diese Transaktion befand.
- `blockNumber`: `QUANTITY` - Blocknummer, in der sich diese Transaktion befand.
- `from`: `DATA`, 20 Bytes - Adresse des Absenders.
- `to`: `DATA`, 20 Bytes - Adresse des Empfängers. null, wenn es sich um eine Vertragserstellungstransaktion handelt.
- `cumulativeGasUsed` : `QUANTITY ` - Die Gesamtmenge an Gas, die bei der Ausführung dieser Transaktion im Block verbraucht wurde.
- `effectiveGasPrice` : `QUANTITY` - Die Summe aus Grundgebühr und Prioritätsgebühr, die pro Gaseinheit gezahlt wurde.
- `gasUsed `: `QUANTITY ` - Die Menge an Gas, die allein von dieser spezifischen Transaktion verbraucht wurde.
- `contractAddress `: `DATA`, 20 Bytes - Die erstellte Vertragsadresse, falls die Transaktion eine Vertragserstellung war, andernfalls `null`.
- `logs`: `Array` - Array von Log-Objekten, die diese Transaktion generiert hat.
- `logsBloom`: `DATA`, 256 Bytes - Bloom-Filter für Light-Clients, um zugehörige Logs schnell abzurufen.
- `type`: `QUANTITY` - Integer des Transaktionstyps, `0x0` für Legacy-Transaktionen, `0x1` für Zugriffslistentypen, `0x2` für dynamische Gebühren.

Es wird außerdem _entweder_ Folgendes zurückgegeben:

- `root` : `DATA` 32 Bytes der Post-Transaktions-Zustands-Root (vor Byzantium)
- `status`: `QUANTITY` entweder `1` (Erfolg) oder `0` (Fehlschlag)

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Ergebnis
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // String der Adresse, falls sie erstellt wurde
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // Logs, wie sie von getFilterLogs usw. zurückgegeben werden
    }],
    "logsBloom": "0x00...0", // 256-Byte-Bloom-Filter
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

Gibt Informationen über einen Uncle eines Blocks anhand des Hashes und der Uncle-Indexposition zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Endpunkt im Playground ausprobieren
</ButtonLink>

**Parameter**

1. `DATA`, 32 Bytes - Der Hash eines Blocks.
2. `QUANTITY` - Die Indexposition des Uncles.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Rückgabe**
Siehe [eth_getBlockByHash](#eth-getblockbyhash)

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Ergebnis siehe [eth_getBlockByHash](#eth-getblockbyhash)

**Hinweis**: Ein Uncle enthält keine einzelnen Transaktionen.

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

Gibt Informationen über einen Uncle eines Blocks anhand der Nummer und der Uncle-Indexposition zurück.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Endpunkt im Playground testen
</ButtonLink>

**Parameter**

1. `QUANTITY|TAG` - eine Blocknummer oder der String `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, wie beim [Block-Parameter](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - die Indexposition des Uncles.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Rückgabe**
Siehe [eth_getBlockByHash](#eth-getblockbyhash)

**Hinweis**: Ein Uncle enthält keine einzelnen Transaktionen.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Ergebnis siehe [eth_getBlockByHash](#eth-getblockbyhash)

### eth_newFilter {#eth-newfilter}

Erstellt ein Filterobjekt basierend auf Filteroptionen, um bei Zustandsänderungen (Logs) zu benachrichtigen.
Um zu prüfen, ob sich der Zustand geändert hat, rufen Sie [eth_getFilterChanges](#eth-getfilterchanges) auf.

**Ein Hinweis zur Angabe von Topic-Filtern:**
Topics sind reihenfolgeabhängig. Eine Transaktion mit einem Log mit den Topics [A, B] stimmt mit den folgenden Topic-Filtern überein:

- `[]` "beliebig"
- `[A]` "A an erster Stelle (und danach beliebig)"
- `[null, B]` "beliebig an erster Stelle UND B an zweiter Stelle (und danach beliebig)"
- `[A, B]` "A an erster Stelle UND B an zweiter Stelle (und danach beliebig)"
- `[[A, B], [A, B]]` "(A ODER B) an erster Stelle UND (A ODER B) an zweiter Stelle (und danach beliebig)"
- **Parameter**

1. `Object` - Die Filteroptionen:

- `fromBlock`: `QUANTITY|TAG` - (optional, Standardwert: `"latest"`) Ganzzahlige Blocknummer, oder `"latest"` für den zuletzt vorgeschlagenen Block, `"safe"` für den neuesten sicheren Block, `"finalized"` für den neuesten endgültigen Block, oder `"pending"`, `"earliest"` für Transaktionen, die noch nicht in einem Block sind.
- `toBlock`: `QUANTITY|TAG` - (optional, Standardwert: `"latest"`) Ganzzahlige Blocknummer, oder `"latest"` für den zuletzt vorgeschlagenen Block, `"safe"` für den neuesten sicheren Block, `"finalized"` für den neuesten endgültigen Block, oder `"pending"`, `"earliest"` für Transaktionen, die noch nicht in einem Block sind.
- `address`: `DATA|Array`, 20 Bytes - (optional) Vertragsadresse oder eine Liste von Adressen, von denen Logs stammen sollen.
- `topics`: `Array of DATA`, - (optional) Array von 32-Byte-`DATA`-Topics. Topics sind reihenfolgeabhängig. Jedes Topic kann auch ein Array von DATA mit „Oder“-Optionen sein.

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

**Rückgabe**
`QUANTITY` - Eine Filter-ID.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

Erstellt einen Filter im Knoten, um zu benachrichtigen, wenn ein neuer Block eintrifft.
Um zu überprüfen, ob sich der Zustand geändert hat, rufen Sie [eth_getFilterChanges](#eth-getfilterchanges) auf.

**Parameter**
Keine

**Rückgabe**
`QUANTITY` - Eine Filter-ID.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Ergebnis
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

Erstellt einen Filter im Knoten, um zu benachrichtigen, wenn neue ausstehende Transaktionen eintreffen.
Um zu überprüfen, ob sich der Zustand geändert hat, rufen Sie [eth_getFilterChanges](#eth-getfilterchanges) auf.

**Parameter**
Keine

**Rückgabe**
`QUANTITY` - Eine Filter-ID.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Ergebnis
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

Deinstalliert einen Filter mit der angegebenen ID. Sollte immer aufgerufen werden, wenn die Überwachung nicht mehr benötigt wird.
Zusätzlich laufen Filter nach einer gewissen Zeit ab (Timeout), wenn sie nicht mit [eth_getFilterChanges](#eth-getfilterchanges) abgefragt werden.

**Parameter**

1. `QUANTITY` - Die Filter-ID.

```js
params: [
  "0xb", // 11
]
```

**Rückgabe**
`Boolean` - `true`, wenn der Filter erfolgreich deinstalliert wurde, andernfalls `false`.

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Ergebnis
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

Polling-Methode für einen Filter, die ein Array von Logs zurückgibt, die seit dem letzten Abruf aufgetreten sind.

**Parameter**

1. `QUANTITY` - die Filter-ID.

```js
params: [
  "0x16", // 22
]
```

**Rückgabe**
`Array` - Array von Log-Objekten oder ein leeres Array, wenn sich seit dem letzten Abruf nichts geändert hat.

- Für Filter, die mit `eth_newBlockFilter` erstellt wurden, sind die Rückgabewerte Block-Hashes (`DATA`, 32 Bytes), z. B. `["0x3454645634534..."]`.
- Für Filter, die mit `eth_newPendingTransactionFilter ` erstellt wurden, sind die Rückgabewerte Transaktions-Hashes (`DATA`, 32 Bytes), z. B. `["0x6345343454645..."]`.
- Für Filter, die mit `eth_newFilter` erstellt wurden, sind Logs Objekte mit folgenden Parametern:
  - `removed`: `TAG` - `true`, wenn das Log aufgrund eines Chain-Reorgs entfernt wurde. `false`, wenn es ein gültiges Log ist.
  - `logIndex`: `QUANTITY` - Integer der Log-Index-Position im Block. `null`, wenn es ein ausstehendes Log ist.
  - `transactionIndex`: `QUANTITY` - Integer der Transaktions-Index-Position, aus der das Log erstellt wurde. `null`, wenn es ein ausstehendes Log ist.
  - `transactionHash`: `DATA`, 32 Bytes - Hash der Transaktionen, aus denen dieses Log erstellt wurde. `null`, wenn es ein ausstehendes Log ist.
  - `blockHash`: `DATA`, 32 Bytes - Hash des Blocks, in dem sich dieses Log befand. `null`, wenn es ausstehend ist. `null`, wenn es ein ausstehendes Log ist.
  - `blockNumber`: `QUANTITY` - die Blocknummer, in der sich dieses Log befand. `null`, wenn es ausstehend ist. `null`, wenn es ein ausstehendes Log ist.
  - `address`: `DATA`, 20 Bytes - Adresse, von der dieses Log stammt.
  - `data`: `DATA` - nicht indizierte Log-Daten variabler Länge. (In _Solidity_: null oder mehr nicht indizierte 32-Byte-Log-Argumente.)
  - `topics`: `Array of DATA` - Array von 0 bis 4 indizierten 32-Byte-`DATA`-Log-Argumenten. (In _Solidity_: Das erste Topic ist der _Hash_ der Signatur des Ereignisses (z. B. `Deposit(address,bytes32,uint256)`), es sei denn, Sie haben das Ereignis mit dem Spezifizierer `anonymous` deklariert.)

- **Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Ergebnis
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

Gibt ein Array aller Logs zurück, die dem Filter mit der angegebenen ID entsprechen.

**Parameter**

1. `QUANTITY` - Die Filter-ID.

```js
params: [
  "0x16", // 22
]
```

**Rückgabe**
Siehe [eth_getFilterChanges](#eth-getfilterchanges)

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Ergebnis siehe [eth_getFilterChanges](#eth-getfilterchanges)

### eth_getLogs {#eth-getlogs}

Gibt ein Array aller Logs zurück, die einem bestimmten Filterobjekt entsprechen.

**Parameter**

1. `Object` - Die Filteroptionen:

- `fromBlock`: `QUANTITY|TAG` - (optional, Standard: `"latest"`) Ganzzahlige Blocknummer oder `"latest"` für den zuletzt vorgeschlagenen Block, `"safe"` für den neuesten sicheren Block, `"finalized"` für den neuesten endgültigen Block oder `"pending"`, `"earliest"` für Transaktionen, die sich noch nicht in einem Block befinden.
- `toBlock`: `QUANTITY|TAG` - (optional, Standard: `"latest"`) Ganzzahlige Blocknummer oder `"latest"` für den zuletzt vorgeschlagenen Block, `"safe"` für den neuesten sicheren Block, `"finalized"` für den neuesten endgültigen Block oder `"pending"`, `"earliest"` für Transaktionen, die sich noch nicht in einem Block befinden.
- `address`: `DATA|Array`, 20 Bytes - (optional) Vertragsadresse oder eine Liste von Adressen, von denen Logs stammen sollen.
- `topics`: `Array of DATA`, - (optional) Array von 32 Bytes `DATA` Topics. Topics sind reihenfolgeabhängig. Jedes Topic kann auch ein Array von DATA mit „Oder“-Optionen sein.
- `blockHash`: `DATA`, 32 Bytes - (optional, **zukünftig**) Mit der Einführung von EIP-234 wird `blockHash` eine neue Filteroption sein, die die zurückgegebenen Logs auf den einzelnen Block mit dem 32-Byte-Hash `blockHash` beschränkt. Die Verwendung von `blockHash` ist gleichbedeutend mit `fromBlock` = `toBlock` = der Blocknummer mit dem Hash `blockHash`. Wenn `blockHash` in den Filterkriterien vorhanden ist, sind weder `fromBlock` noch `toBlock` zulässig.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Rückgabe**
Siehe [eth_getFilterChanges](#eth-getfilterchanges)

**Beispiel**

```js
// Anfrage
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Ergebnis siehe [eth_getFilterChanges](#eth-getfilterchanges)

## Anwendungsbeispiel {#usage-example}

### Bereitstellen eines Vertrags über JSON-RPC {#deploying-contract}

Dieser Abschnitt enthält eine Demonstration, wie man einen Vertrag nur über die RPC-Schnittstelle bereitstellt. Es gibt alternative Wege zur Bereitstellung von Verträgen, bei denen diese Komplexität abstrahiert wird – zum Beispiel durch die Verwendung von Bibliotheken, die auf der RPC-Schnittstelle aufbauen, wie [Web3.js](https://web3js.readthedocs.io/) und [Web3.py](https://github.com/ethereum/web3.py). Diese Abstraktionen sind im Allgemeinen leichter zu verstehen und weniger fehleranfällig, aber es ist dennoch hilfreich zu verstehen, was intern abläuft.

Das Folgende ist ein einfacher Smart Contract namens `Multiply7`, der über die JSON-RPC-Schnittstelle auf einem Ethereum-Knoten bereitgestellt wird. Dieses Tutorial setzt voraus, dass der Leser bereits einen Geth-Knoten ausführt. Weitere Informationen zu Knoten und Clients finden Sie [hier](/developers/docs/nodes-and-clients/run-a-node). Bitte lesen Sie die Dokumentation der einzelnen [Clients](/developers/docs/nodes-and-clients/), um zu erfahren, wie Sie den HTTP-JSON-RPC für Nicht-Geth-Clients starten. Die meisten Clients stellen den Dienst standardmäßig unter `localhost:8545` bereit.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Als Erstes muss sichergestellt werden, dass die HTTP-RPC-Schnittstelle aktiviert ist. Das bedeutet, dass wir Geth beim Start das Flag `--http` übergeben. In diesem Beispiel verwenden wir den Geth-Knoten auf einer privaten Entwicklungs-Chain. Mit diesem Ansatz benötigen wir keinen Ether im echten Netzwerk.

```bash
geth --http --dev console 2>>geth.log
```

Dadurch wird die HTTP-RPC-Schnittstelle unter `http://localhost:8545` gestartet.

Wir können überprüfen, ob die Schnittstelle läuft, indem wir die Coinbase-Adresse (indem wir die erste Adresse aus dem Array der Konten abrufen) und den Kontostand mit [curl](https://curl.se) abfragen. Bitte beachten Sie, dass die Daten in diesen Beispielen auf Ihrem lokalen Knoten abweichen werden. Wenn Sie diese Befehle ausprobieren möchten, ersetzen Sie die Anfrageparameter in der zweiten curl-Anfrage durch das Ergebnis der ersten.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Da Zahlen hexadezimal kodiert sind, wird der Kontostand in Wei als Hex-String zurückgegeben. Wenn wir den Kontostand in Ether als Zahl haben möchten, können wir Web3 aus der Geth-Konsole verwenden.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Da sich nun etwas Ether auf unserer privaten Entwicklungs-Chain befindet, können wir den Vertrag bereitstellen. Der erste Schritt besteht darin, den Multiply7-Vertrag in Bytecode zu kompilieren, der an die EVM gesendet werden kann. Um solc, den Solidity-Compiler, zu installieren, folgen Sie der [Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Möglicherweise möchten Sie eine ältere `solc`-Version verwenden, die [der in unserem Beispiel verwendeten Compiler-Version](https://github.com/ethereum/solidity/releases/tag/v0.4.20) entspricht.)

Der nächste Schritt ist die Kompilierung des Multiply7-Vertrags in Bytecode, der an die EVM gesendet werden kann.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Da wir nun den kompilierten Code haben, müssen wir ermitteln, wie viel Gas die Bereitstellung kostet. Die RPC-Schnittstelle verfügt über eine `eth_estimateGas`-Methode, die uns eine Schätzung liefert.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Und schließlich stellen wir den Vertrag bereit.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Die Transaktion wird vom Knoten akzeptiert und ein Transaktions-Hash wird zurückgegeben. Dieser Hash kann verwendet werden, um die Transaktion zu verfolgen. Der nächste Schritt besteht darin, die Adresse zu ermitteln, unter der unser Vertrag bereitgestellt wurde. Jede ausgeführte Transaktion erstellt einen Transaktionsbeleg. Dieser Transaktionsbeleg enthält verschiedene Informationen über die Transaktion, z. B. in welchen Block die Transaktion aufgenommen wurde und wie viel Gas von der EVM verbraucht wurde. Wenn eine Transaktion einen Vertrag erstellt, enthält er auch die Vertragsadresse. Wir können den Transaktionsbeleg mit der RPC-Methode `eth_getTransactionReceipt` abrufen.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Unser Vertrag wurde unter `0x4d03d617d700cf81935d7f797f4e2ae719648262` erstellt. Ein Null-Ergebnis anstelle eines Transaktionsbelegs bedeutet, dass die Transaktion noch nicht in einen Block aufgenommen wurde. Warten Sie einen Moment, überprüfen Sie, ob Ihr Konsens-Client läuft, und versuchen Sie es erneut.

#### Interaktion mit Smart Contracts {#interacting-with-smart-contract}

In diesem Beispiel senden wir eine Transaktion mit `eth_sendTransaction` an die Methode `multiply` des Vertrags.

`eth_sendTransaction` erfordert mehrere Argumente, insbesondere `from`, `to` und `data`. `From` ist die öffentliche Adresse unseres Kontos und `to` ist die Vertragsadresse. Das Argument `data` enthält eine Payload, die definiert, welche Methode mit welchen Argumenten aufgerufen werden muss. Hier kommt das [ABI (Application Binary Interface)](https://docs.soliditylang.org/en/latest/abi-spec.html) ins Spiel. Das ABI ist eine JSON-Datei, die definiert, wie Daten für die EVM definiert und kodiert werden.

Die Bytes der Payload definieren, welche Methode im Vertrag aufgerufen wird. Dies sind die ersten 4 Bytes des Keccak-Hashes über den Funktionsnamen und seine Argumenttypen, hexadezimal kodiert. Die Multiply-Funktion akzeptiert ein uint, was ein Alias für uint256 ist. Das ergibt für uns:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Der nächste Schritt ist die Kodierung der Argumente. Es gibt nur ein uint256, sagen wir, den Wert 6. Das ABI hat einen Abschnitt, der spezifiziert, wie uint256-Typen kodiert werden.

`int<M>: enc(X)` ist die Big-Endian-Zweierkomplement-Kodierung von X, die auf der höherwertigen (linken) Seite mit 0xff für ein negatives X und mit Null-Bytes für ein positives X aufgefüllt wird, sodass die Länge ein Vielfaches von 32 Bytes beträgt.

Dies wird zu `0000000000000000000000000000000000000000000000000000000000000006` kodiert.

Kombiniert man den Funktionsselektor und das kodierte Argument, lauten unsere Daten `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Dies kann nun an den Knoten gesendet werden:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Da eine Transaktion gesendet wurde, wurde ein Transaktions-Hash zurückgegeben. Das Abrufen des Transaktionsbelegs ergibt:

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

Der Transaktionsbeleg enthält ein Log. Dieses Log wurde von der EVM bei der Ausführung der Transaktion generiert und in den Transaktionsbeleg aufgenommen. Die Funktion `multiply` zeigt, dass das Ereignis `Print` mit der Eingabe mal 7 ausgelöst wurde. Da das Argument für das Ereignis `Print` ein uint256 war, können wir es gemäß den ABI-Regeln dekodieren, was uns die erwartete Dezimalzahl 42 liefert. Abgesehen von den Daten ist es erwähnenswert, dass Topics verwendet werden können, um zu bestimmen, welches Ereignis das Log erstellt hat:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Dies war nur eine kurze Einführung in einige der häufigsten Aufgaben, die die direkte Nutzung des JSON-RPC demonstriert.

## Verwandte Themen {#related-topics}

- [JSON-RPC-Spezifikation](http://www.jsonrpc.org/specification)
- [Knoten und Clients](/developers/docs/nodes-and-clients/)
- [JavaScript-APIs](/developers/docs/apis/javascript/)
- [Backend-APIs](/developers/docs/apis/backend/)
- [Ausführungsclients](/developers/docs/nodes-and-clients/#execution-clients)