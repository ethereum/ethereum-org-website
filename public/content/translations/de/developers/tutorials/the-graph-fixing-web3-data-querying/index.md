---
title: "The Graph: Web3-Datenabfragen reparieren"
description: "Die Blockchain ist wie eine Datenbank, aber ohne SQL. Alle Daten sind vorhanden, aber es gibt keine Möglichkeit, darauf zuzugreifen. Lass mich dir zeigen, wie du das mit The Graph und GraphQL beheben kannst."
author: Markus Waas
lang: de
tags: ["Solidity", "Smart Contracts", "Abfragen", "the graph", "React"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Dieses Mal werfen wir einen genaueren Blick auf The Graph, das im letzten Jahr im Wesentlichen Teil des Standard-Stacks für die Entwicklung von Dapps geworden ist. Schauen wir uns zunächst an, wie wir die Dinge auf traditionelle Weise angehen würden...

## Ohne The Graph... {#without-the-graph}

Nehmen wir also ein einfaches Beispiel zur Veranschaulichung. Wir alle mögen Spiele, stell dir also ein einfaches Spiel vor, bei dem Benutzer Wetten platzieren:

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
            require(success, "Transfer failed");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Nehmen wir nun an, wir möchten in unserer Dapp die Gesamtzahl der Wetten sowie die insgesamt verlorenen/gewonnenen Spiele anzeigen und diese auch aktualisieren, wenn jemand erneut spielt. Der Ansatz wäre:

1. `totalGamesPlayerWon` abrufen.
2. `totalGamesPlayerLost` abrufen.
3. `BetPlaced`-Ereignisse abonnieren.

Wir können auf das [Ereignis in Web3](https://docs.web3js.org/api/web3/class/Contract#events) hören, wie rechts gezeigt, aber das erfordert die Behandlung ziemlich vieler Fälle.

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

Für unser einfaches Beispiel ist das noch einigermaßen in Ordnung. Aber nehmen wir an, wir möchten nun die Anzahl der verlorenen/gewonnenen Wetten nur für den aktuellen Spieler anzeigen. Da haben wir Pech gehabt, du solltest besser einen neuen Smart Contract bereitstellen, der diese Werte speichert, und sie dann abrufen. Und nun stell dir einen viel komplizierteren Smart Contract und eine komplexere Dapp vor, da kann es schnell unübersichtlich werden.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

Du siehst, dass dies nicht optimal ist:

- Funktioniert nicht für bereits bereitgestellte Smart Contracts.
- Zusätzliche Gaskosten für die Speicherung dieser Werte.
- Erfordert einen weiteren Aufruf, um die Daten für einen Ethereum-Blockchain-Knoten abzurufen.

![Thats not good enough](./not-good-enough.jpg)

Schauen wir uns nun eine bessere Lösung an.

## Darf ich vorstellen: GraphQL {#let-me-introduce-to-you-graphql}

Lass uns zunächst über GraphQL sprechen, das ursprünglich von Facebook entworfen und implementiert wurde. Vielleicht bist du mit dem traditionellen REST-API-Modell vertraut. Stell dir nun vor, du könntest stattdessen eine Abfrage für genau die Daten schreiben, die du haben möchtest:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

Die beiden Bilder erfassen ziemlich genau die Essenz von GraphQL. Mit der Abfrage auf der rechten Seite können wir genau definieren, welche Daten wir wollen, sodass wir alles in einer einzigen Anfrage erhalten und nicht mehr als genau das, was wir brauchen. Ein GraphQL-Server übernimmt das Abrufen aller erforderlichen Daten, sodass es für die Frontend-Verbraucherseite unglaublich einfach zu bedienen ist. [Hier ist eine schöne Erklärung](https://www.apollographql.com/blog/graphql-explained), wie genau der Server eine Abfrage verarbeitet, falls du interessiert bist.

Mit diesem Wissen wollen wir nun endlich in den Blockchain-Bereich und zu The Graph springen.

## Was ist The Graph? {#what-is-the-graph}

Eine Blockchain ist eine dezentralisierte Datenbank, aber im Gegensatz zum Normalfall haben wir keine Abfragesprache für diese Datenbank. Lösungen zum Abrufen von Daten sind mühsam oder völlig unmöglich. The Graph ist ein dezentralisiertes Protokoll zur Indizierung und Abfrage von Blockchain-Daten. Und du hast es vielleicht schon erraten, es verwendet GraphQL als Abfragesprache.

![The Graph](./thegraph.png)

Beispiele sind immer am besten, um etwas zu verstehen, also verwenden wir The Graph für unser GameContract-Beispiel.

## Wie man einen Subgraph erstellt {#how-to-create-a-subgraph}

Die Definition, wie Daten indiziert werden sollen, wird Subgraph genannt. Er erfordert drei Komponenten:

1. Manifest (`subgraph.yaml`)
2. Schema (`schema.graphql`)
3. Mapping (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Das Manifest ist unsere Konfigurationsdatei und definiert:

- welche Smart Contracts indiziert werden sollen (Adresse, Netzwerk, ABI...)
- auf welche Ereignisse gehört werden soll
- andere Dinge, auf die gehört werden soll, wie Funktionsaufrufe oder Blöcke
- die aufgerufenen Mapping-Funktionen (siehe `mapping.ts` unten)

Du kannst hier mehrere Smart Contracts und Handler definieren. Ein typisches Setup hätte einen Subgraph-Ordner innerhalb des Hardhat-Projekts mit einem eigenen Repository. Dann kannst du leicht auf die ABI verweisen.

Aus Bequemlichkeitsgründen möchtest du vielleicht auch ein Vorlagen-Tool wie Mustache verwenden. Dann erstellst du eine `subgraph.template.yaml` und fügst die Adressen basierend auf den neuesten Bereitstellungen ein. Für ein fortgeschritteneres Beispiel-Setup siehe zum Beispiel das [Aave-Subgraph-Repo](https://github.com/aave/aave-protocol/tree/master/thegraph).

Und die vollständige Dokumentation findest du [hier](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```yaml
specVersion: 0.0.1
description: Placing Bets on Ethereum
repository: - GitHub link -
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

Das Schema ist die GraphQL-Datendefinition. Es ermöglicht dir zu definieren, welche Entitäten existieren und welche Typen sie haben. Unterstützte Typen von The Graph sind

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Du kannst auch Entitäten als Typ verwenden, um Beziehungen zu definieren. In unserem Beispiel definieren wir eine 1-zu-n-Beziehung vom Spieler zu den Wetten. Das ! bedeutet, dass der Wert nicht leer sein darf. Die vollständige Dokumentation findest du [hier](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

Die Mapping-Datei in The Graph definiert unsere Funktionen, die eingehende Ereignisse in Entitäten umwandeln. Sie ist in AssemblyScript geschrieben, einer Teilmenge von TypeScript. Das bedeutet, dass sie in WASM (WebAssembly) kompiliert werden kann, um eine effizientere und portablere Ausführung des Mappings zu ermöglichen.

Du musst jede in der Datei `subgraph.yaml` benannte Funktion definieren, in unserem Fall benötigen wir also nur eine: `handleNewBet`. Wir versuchen zunächst, die Player-Entität von der Absenderadresse als ID zu laden. Wenn sie nicht existiert, erstellen wir eine neue Entität und füllen sie mit Startwerten.

Dann erstellen wir eine neue Bet-Entität. Die ID dafür wird `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` sein, was immer einen eindeutigen Wert gewährleistet. Nur den Hash zu verwenden, reicht nicht aus, da jemand die Funktion placeBet mehrmals in einer Transaktion über einen Smart Contract aufrufen könnte.

Zuletzt können wir die Player-Entität mit allen Daten aktualisieren. Arrays können nicht direkt mit Push erweitert werden, sondern müssen wie hier gezeigt aktualisiert werden. Wir verwenden die ID, um auf die Wette zu verweisen. Und `.save()` ist am Ende erforderlich, um eine Entität zu speichern.

Die vollständige Dokumentation findest du hier: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Du kannst der Mapping-Datei auch Protokollausgaben hinzufügen, siehe [hier](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // erstellen, falls noch nicht vorhanden
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

## Verwendung im Frontend {#using-it-in-the-frontend}

Mit etwas wie Apollo Boost kannst du The Graph ganz einfach in deine React-Dapp (oder Apollo-Vue) integrieren. Besonders bei der Verwendung von React Hooks und Apollo ist das Abrufen von Daten so einfach wie das Schreiben einer einzigen GraphQL-Abfrage in deiner Komponente. Ein typisches Setup könnte so aussehen:

```javascript
// Siehe alle Subgraphen: https://thegraph.com/explorer/
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

Und nun können wir zum Beispiel eine Abfrage wie diese schreiben. Das wird uns Folgendes abrufen:

- wie oft der aktuelle Benutzer gewonnen hat
- wie oft der aktuelle Benutzer verloren hat
- eine Liste von Zeitstempeln mit all seinen vorherigen Wetten

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

![Magic](./magic.jpg)

Aber uns fehlt noch ein letztes Puzzleteil, und das ist der Server. Du kannst ihn entweder selbst betreiben oder den gehosteten Dienst nutzen.

## Der The Graph-Server {#the-graph-server}

### Graph Explorer: Der gehostete Dienst {#graph-explorer-the-hosted-service}

Der einfachste Weg ist die Nutzung des gehosteten Dienstes. Folge den Anweisungen [hier](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/), um einen Subgraph bereitzustellen. Für viele Projekte kannst du tatsächlich bestehende Subgraphen im [Explorer](https://thegraph.com/explorer/) finden.

![The Graph-Explorer](./thegraph-explorer.png)

### Einen eigenen Blockchain-Knoten betreiben {#running-your-own-node}

Alternativ kannst du deinen eigenen Blockchain-Knoten betreiben. Die Dokumentation findest du [hier](https://github.com/graphprotocol/graph-node#quick-start). Ein Grund dafür könnte die Nutzung eines Netzwerks sein, das vom gehosteten Dienst nicht unterstützt wird. Die derzeit unterstützten Netzwerke [sind hier zu finden](https://thegraph.com/docs/en/developing/supported-networks/).

## Die dezentralisierte Zukunft {#the-decentralized-future}

GraphQL unterstützt auch Streams für neu eingehende Ereignisse. Diese werden auf The Graph durch [Substreams](https://thegraph.com/docs/en/substreams/) unterstützt, die sich derzeit in der offenen Beta-Phase befinden.

Im Jahr [2021](https://thegraph.com/blog/mainnet-migration/) begann The Graph mit dem Übergang zu einem dezentralisierten Indizierungsnetzwerk. Du kannst mehr über die Architektur dieses dezentralisierten Indizierungsnetzwerks [hier](https://thegraph.com/docs/en/network/explorer/) lesen.

Zwei Schlüsselaspekte sind:

1. Benutzer bezahlen die Indexer für Abfragen.
2. Indexer hinterlegen Graph-Token (GRT) als Einsatz.