---
title: "The Graph: Die Behebung der Datenabfrage in Web3"
description: "Eine Blockchain ist wie eine Datenbank, aber ohne SQL. Alle Daten sind vorhanden, aber es gibt keine Möglichkeit, auf sie zuzugreifen. Ich zeige Ihnen, wie Sie dies mit The Graph und GraphQL beheben können."
author: Markus Waas
lang: de
tags:
  [
    "solidity",
    "intelligente Verträge",
    "Abfragen",
    "the graph",
    "react"
  ]
skill: intermediate
published: 06.09.2020
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Dieses Mal werden wir uns The Graph genauer ansehen, das im letzten Jahr im Wesentlichen zu einem Teil des Standard-Stacks für die Entwicklung von Dapps geworden ist. Schauen wir uns zunächst an, wie wir die Dinge auf die traditionelle Weise machen würden ...

## Ohne The Graph ... {#without-the-graph}

Nehmen wir also ein einfaches Beispiel zur Veranschaulichung. Wir alle mögen Spiele, also stellen Sie sich ein einfaches Spiel vor, bei dem Benutzer Wetten platzieren:

```solidity
pragma solidity 0.7.1;

contract Game {
    uint256 totalGamesPlayerWon = 0;
    uint256 totalGamesPlayerLost = 0;
    event BetPlaced(address player, uint256 value, bool hasWon);

    function placeBet() external payable {
        bool hasWon = evaluateBetForPlayer(msg.sender);

        if (hasWon) {
            (bool success, ) = msg.sender.call{ value: msg.value * 2 }('');
            require(success, "Übertragung fehlgeschlagen");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Nehmen wir nun an, wir möchten in unserer Dapp die Gesamtzahl der Wetten, die Gesamtzahl der verlorenen/gewonnenen Spiele anzeigen und diese auch aktualisieren, wann immer jemand erneut spielt. Der Ansatz wäre:

1. `totalGamesPlayerWon` abrufen.
2. `totalGamesPlayerLost` abrufen.
3. `BetPlaced`-Ereignisse abonnieren.

Wir können das [Ereignis in Web3](https://docs.web3js.org/api/web3/class/Contract#events) wie rechts gezeigt abhören, aber es erfordert die Behandlung einiger Fälle.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // Ereignis ausgelöst
})
.on('changed', function(event) {
    // Ereignis wurde wieder entfernt
})
.on('error', function(error, receipt) {
    // tx abgelehnt
});
```

Für unser einfaches Beispiel ist das noch einigermaßen in Ordnung. Aber nehmen wir an, wir möchten jetzt die Anzahl der verlorenen/gewonnenen Wetten nur für den aktuellen Spieler anzeigen. Nun, da haben wir Pech, Sie sollten besser einen neuen Vertrag bereitstellen, der diese Werte speichert und abruft. Und stellen Sie sich jetzt einen viel komplizierteren Smart Contract und eine Dapp vor, da kann es schnell unübersichtlich werden.

![Man kann nicht einfach so abfragen](./one-does-not-simply-query.jpg)

Sie können sehen, dass dies nicht optimal ist:

- Funktioniert nicht für bereits bereitgestellte Verträge.
- Zusätzliche Gas-Kosten für die Speicherung dieser Werte.
- Erfordert einen weiteren Aufruf, um die Daten für einen Ethereum-Node abzurufen.

![Das ist nicht gut genug](./not-good-enough.jpg)

Schauen wir uns nun eine bessere Lösung an.

## Lassen Sie mich Ihnen GraphQL vorstellen {#let-me-introduce-to-you-graphql}

Lassen Sie uns zunächst über GraphQL sprechen, das ursprünglich von Facebook entwickelt und implementiert wurde. Vielleicht sind Sie mit dem traditionellen REST-API-Modell vertraut. Stellen Sie sich nun vor, Sie könnten stattdessen eine Abfrage für genau die Daten schreiben, die Sie wollten:

![GraphQL-API vs. REST-API](./graphql.jpg)

![](./graphql-query.gif)

Die beiden Bilder erfassen so ziemlich die Essenz von GraphQL. Mit der Abfrage auf der rechten Seite können wir genau definieren, welche Daten wir wollen. So erhalten wir alles in einer einzigen Anfrage und nicht mehr als das, was wir wirklich benötigen. Ein GraphQL-Server kümmert sich um das Abrufen aller erforderlichen Daten, sodass er für die Frontend-Konsumentenseite unglaublich einfach zu bedienen ist. [Dies ist eine gute Erklärung](https://www.apollographql.com/blog/graphql-explained), wie genau der Server eine Anfrage bearbeitet, falls Sie daran interessiert sind.

Mit diesem Wissen wollen wir nun endlich in den Blockchain-Bereich und zu The Graph springen.

## Was ist The Graph? {#what-is-the-graph}

Eine Blockchain ist eine dezentralisierte Datenbank, aber im Gegensatz zu dem, was normalerweise der Fall ist, haben wir keine Abfragesprache für diese Datenbank. Lösungen zum Abrufen von Daten sind mühsam oder völlig unmöglich. The Graph ist ein dezentralisiertes Protokoll zur Indizierung und Abfrage von Blockchain-Daten. Und Sie haben es vielleicht schon erraten, es verwendet GraphQL als Abfragesprache.

![The Graph](./thegraph.png)

Beispiele sind immer am besten, um etwas zu verstehen, also lassen Sie uns The Graph für unser GameContract-Beispiel verwenden.

## Wie man einen Subgraph erstellt {#how-to-create-a-subgraph}

Die Definition, wie Daten indiziert werden, wird als Subgraph bezeichnet. Es erfordert drei Komponenten:

1. Manifest (`subgraph.yaml`)
2. Schema (`schema.graphql`)
3. Mapping (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Das Manifest ist unsere Konfigurationsdatei und definiert:

- welche Smart Contracts indiziert werden sollen (Adresse, Netzwerk, ABI ...)
- welche Ereignisse abgehört werden sollen
- andere Dinge, die abgehört werden sollen, wie Funktionsaufrufe oder Blöcke
- die aufgerufenen Mapping-Funktionen (siehe `mapping.ts` unten)

Sie können hier mehrere Verträge und Handler definieren. Ein typisches Setup hätte einen Subgraph-Ordner innerhalb des Hardhat-Projekts mit einem eigenen Repository. Dann können Sie einfach auf das ABI verweisen.

Aus Bequemlichkeitsgründen möchten Sie vielleicht auch ein Vorlagen-Tool wie Mustache verwenden. Dann erstellen Sie eine `subgraph.template.yaml` und fügen die Adressen basierend auf den neuesten Bereitstellungen ein. Ein fortgeschritteneres Beispiel-Setup finden Sie zum Beispiel im [Aave-Subgraph-Repo](https://github.com/aave/aave-protocol/tree/master/thegraph).

Und die vollständige Dokumentation kann [hier](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) eingesehen werden.

```yaml
specVersion: 0.0.1
description: Wetten auf Ethereum platzieren
repository: - GitHub-Link -
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: GameContract
    network: mainnet
    source:
      address: '0x2E6454...cf77eC'
      abi: GameContract
      startBlock: 6175244
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.1
      language: wasm/assemblyscript
      entities:
        - GameContract
      abis:
        - name: GameContract
          file: ../build/contracts/GameContract.json
      eventHandlers:
        - event: PlacedBet(address,uint256,bool)
          handler: handleNewBet
      file: ./src/mapping.ts
```

### Schema (`schema.graphql`) {#schema}

Das Schema ist die GraphQL-Datendefinition. Es ermöglicht Ihnen, zu definieren, welche Entitäten existieren und welche Typen sie haben. Unterstützte Typen von The Graph sind

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Sie können Entitäten auch als Typ verwenden, um Beziehungen zu definieren. In unserem Beispiel definieren wir eine 1-zu-viele-Beziehung vom Spieler zu den Wetten. Das ! bedeutet, dass der Wert nicht leer sein darf. Die vollständige Dokumentation kann [hier](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) eingesehen werden.

```graphql
type Bet @entity {
  id: ID!
  player: Player!
  playerHasWon: Boolean!
  time: Int!
}

type Player @entity {
  id: ID!
  totalPlayedCount: Int
  hasWonCount: Int
  hasLostCount: Int
  bets: [Bet]!
}
```

### Mapping (`mapping.ts`) {#mapping}

Die Mapping-Datei in The Graph definiert unsere Funktionen, die eingehende Ereignisse in Entitäten umwandeln. Sie ist in AssemblyScript geschrieben, einer Teilmenge von Typescript. Das bedeutet, dass sie zu WASM (WebAssembly) kompiliert werden kann, um eine effizientere und portablere Ausführung des Mappings zu ermöglichen.

Sie müssen jede in der `subgraph.yaml`-Datei benannte Funktion definieren, in unserem Fall benötigen wir also nur eine: `handleNewBet`. Wir versuchen zuerst, die Player-Entität aus der Absenderadresse als ID zu laden. Wenn sie nicht existiert, erstellen wir eine neue Entität und füllen sie mit Startwerten.

Dann erstellen wir eine neue Bet-Entität. Die ID dafür wird `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` sein, was immer einen eindeutigen Wert gewährleistet. Nur den Hash zu verwenden, ist nicht genug, da jemand die placeBet-Funktion mehrmals in einer Transaktion über einen Smart Contract aufrufen könnte.

Zuletzt können wir die Player-Entität mit allen Daten aktualisieren. Arrays können nicht direkt gepusht werden, sondern müssen wie hier gezeigt aktualisiert werden. Wir verwenden die ID, um auf die Wette zu verweisen. Und `.save()` ist am Ende erforderlich, um eine Entität zu speichern.

Die vollständige Dokumentation finden Sie hier: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Sie können auch eine Protokollausgabe zur Mapping-Datei hinzufügen, siehe [hier](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // erstellen, falls es noch nicht existiert
    player = new Player(event.transaction.from.toHex())
    player.bets = new Array<string>(0)
    player.totalPlayedCount = 0
    player.hasWonCount = 0
    player.hasLostCount = 0
  }

  let bet = new Bet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  bet.player = player.id
  bet.playerHasWon = event.params.hasWon
  bet.time = event.block.timestamp
  bet.save()

  player.totalPlayedCount++
  if (event.params.hasWon) {
    player.hasWonCount++
  } else {
    player.hasLostCount++
  }

  // Array so aktualisieren
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Die Verwendung im Frontend {#using-it-in-the-frontend}

Mit etwas wie Apollo Boost können Sie The Graph einfach in Ihre React-Dapp (oder Apollo-Vue) integrieren. Besonders bei der Verwendung von React Hooks und Apollo ist das Abrufen von Daten so einfach wie das Schreiben einer einzigen GraphQL-Abfrage in Ihrer Komponente. Ein typisches Setup könnte so aussehen:

```javascript
// Alle Subgraphen ansehen: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "{{ subgraphUrl }}",
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
```

Und jetzt können wir zum Beispiel eine Abfrage wie diese schreiben. Dies wird uns abrufen

- wie oft der aktuelle Benutzer gewonnen hat
- wie oft der aktuelle Benutzer verloren hat
- eine Liste von Zeitstempeln mit allen bisherigen Wetten

Alles in einer einzigen Anfrage an den GraphQL-Server.

```javascript
const myGraphQlQuery = gql`
    players(where: { id: $currentUser }) {
      totalPlayedCount
      hasWonCount
      hasLostCount
      bets {
        time
      }
    }
`

const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

![Magie](./magic.jpg)

Aber uns fehlt noch ein letztes Puzzleteil, und das ist der Server. Sie können ihn entweder selbst betreiben oder den gehosteten Dienst nutzen.

## Der The-Graph-Server {#the-graph-server}

### Graph Explorer: Der gehostete Dienst {#graph-explorer-the-hosted-service}

Der einfachste Weg ist die Nutzung des gehosteten Dienstes. Folgen Sie den Anweisungen [hier](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/), um einen Subgraphen bereitzustellen. Für viele Projekte finden Sie tatsächlich bereits vorhandene Subgraphen im [Explorer](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Eigene Node betreiben {#running-your-own-node}

Alternativ können Sie Ihren eigenen Node betreiben. Dokumentation [hier](https://github.com/graphprotocol/graph-node#quick-start). Ein Grund dafür könnte die Verwendung eines Netzwerks sein, das vom gehosteten Dienst nicht unterstützt wird. Die derzeit unterstützten Netzwerke [finden Sie hier](https://thegraph.com/docs/en/developing/supported-networks/).

## Die dezentralisierte Zukunft {#the-decentralized-future}

GraphQL unterstützt auch Streams für neu eingehende Ereignisse. Diese werden auf dem Graphen durch [Substreams](https://thegraph.com/docs/en/substreams/) unterstützt, die sich derzeit in der offenen Beta befinden.

Im Jahr [2021](https://thegraph.com/blog/mainnet-migration/) begann The Graph mit der Umstellung auf ein dezentralisiertes Indizierungsnetzwerk. Mehr über die Architektur dieses dezentralisierten Indizierungsnetzwerks können Sie [hier](https://thegraph.com/docs/en/network/explorer/) lesen.

Zwei Schlüsselaspekte sind:

1. Benutzer bezahlen die Indexer für Abfragen.
2. Indexer staken Graph Tokens (GRT).
