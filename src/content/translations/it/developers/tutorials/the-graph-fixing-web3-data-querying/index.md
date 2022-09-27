---
title: "The Graph: query di dati in Web3"
description: La blockchain è come un database ma senza SQL. Contiene tutti i dati, ma non c'è modo di accedervi. Vediamo come risolvere la situazione con The Graph e GraphQL.
author: Markus Waas
lang: it
tags:
  - "Solidity"
  - "Smart Contract"
  - "query"
  - "the graph"
  - "create-eth-app"
  - "react"
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Questa volta daremo un'occhiata più da vicino a The Graph, che essenzialmente è diventato parte integrante dello stack standard per lo sviluppo di dapp nell'ultimo anno. Prima però vediamo come ci comporteremmo tradizionalmente...

## Senza The Graph... {#without-the-graph}

Procediamo con un semplice esempio a scopo illustrativo. A chi non piacciono i giochi? Immaginiamo quindi un gioco semplice, dove gli utenti fanno scommesse:

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

Ora diciamo che vogliamo mostrare nella nostra dapp il totale delle partite perse/vinte, e aggiornarle ogni volta che qualcuno gioca. L'approccio sarebbe:

1. Recuperare `totalGamesPlayerWon`.
2. Recuperare `totalGamesPlayerLost`.
3. Iscriversi agli eventi `BetPlaced`.

Possiamo attendere l'[evento in Web3](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#contract-events) come mostrato sulla destra, ma richiederebbe la gestione di alcuni casi.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // evento generato
})
.on('changed', function(event) {
    // evento rimosso nuovamente
})
.on('error', function(error, receipt) {
    // tx rifiutata
});
```

Questo va comunque bene per il nostro esempio semplice. Diciamo però che adesso vogliamo mostrare le quantità di scommesse perse/vinte solo per il giocatore corrente. In questo caso siamo sfortunati, è meglio distribuire un nuovo contratto che memorizzi questi valori e li recuperi. E ora immaginiamo uno Smart Contract e una dapp molto più complicati. Le cose si complicano in fretta.

![Non basta eseguire Query](./one-does-not-simply-query.jpg)

È facile capire perché questo non sia ottimale:

- Non funziona per i contratti già distribuiti.
- Serve carburante extra per memorizzare questi valori.
- Serve un'altra chiamata per recuperare i dati per un nodo Ethereum.

![Non è sufficiente](./not-good-enough.jpg)

Cerchiamo allora una soluzione migliore.

## Ti presento GraphQL {#let-me-introduce-to-you-graphql}

Parliamo prima di GraphQL, originariamente progettato e implementato da Facebook. Potresti conoscere il modello API Rest tradizionale. Ora immagina di poter scrivere invece una query proprio per i dati che volevi:

![API GraphQL API e API REST](./graphql.jpg)

<img src="https://cdn0.scrvt.com/b095ee27d37b3d7b6b150adba9ac6ec8/42226f4816a77656/bc5c8b270798/graphql-querygif.gif" width="100%" />

Le due immagini catturano quasi perfettamente l'essenza di GraphQL. Con la query sulla destra possiamo definire esattamente i dati che vogliamo, così otteniamo tutto in un'unica richiesta e niente di più di quanto necessario. Un server GraphQL gestisce il recupero di tutti i dati necessari, quindi è incredibilmente facile da usare dal lato frontend client. [Questa è una spiegazione efficace](https://www.apollographql.com/blog/graphql-explained-5844742f195e/) e accurata di come il server gestisce una query.

Con queste informazioni, passiamo finalmente allo spazio della blockchain e a The Graph.

## Cos'è The Graph? {#what-is-the-graph}

Una blockchain è un database decentralizzato, ma a differenza di quanto avviene normalmente, in questo caso non abbiamo un linguaggio per interrogare il database. Le soluzioni per recuperare i dati sono complicate o assolutamente impraticabili. The Graph è un protocollo decentralizzato per indicizzare e interrogare i dati della blockchain. E, come forse avrai capito, usa GraphQL come linguaggio di query.

![The Graph](./thegraph.png)

Gli esempi sono sempre la strategia migliore per comprendere qualcosa, quindi usiamo The Graph per il nostro esempio GameContract.

## Come creare un Subgraph {#how-to-create-a-subgraph}

La definizione di come indicizzare i dati è detta subgraph. Richiede tre componenti:

1. Manifesto (`subgraph.yaml`)
2. Schema (`schema.graphql`)
3. Mappatura (`mapping.ts`)

### Manifesto (`subgraph.yaml`) {#manifest}

Il manifest è il nostro file di configurazione e definisce:

- quali Smart Contract indicizzare (indirizzo, rete, ABI...)
- quali eventi attendere
- altri elementi da attendere, come chiamate a funzioni o blocchi
- le funzioni di mapping chiamate (vedi `mapping.ts` sotto)

Qui puoi definire più contratti e gestori. Una configurazione tipica avrebbe una cartella subgraph nel progetto Truffle/Hardhat con un proprio repository. A questo punto puoi facilmente fare riferimento all'ABI.

Per motivi di comodità potresti anche usare uno strumento di modelli come mustache. Poi crei un ` subgraph.template.yaml` e inserisci gli indirizzi in base alle distribuzioni più recenti. Per una configurazione più avanzata, vedi ad esempio il [repo del subgraph Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Al seguente link puoi trovare la documentazione completa: https://thegraph.com/docs/define-a-subgraph#the-subgraph-manifest.

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

Lo schema è la definizione dei dati di GraphQL. Ti consentirà di definire quali entità esistono e i loro tipi. I tipi supportati da The Graph sono

- Byte
- ID
- Stringa
- Booleano
- Int
- BigInt
- BigDecimal

Puoi anche usare le entità come tipo per definire le relazioni. Nel nostro esempio definiamo una relazione 1 a tanti dal giocatore alle scommesse. Il punto esclamativo ! significa che il valore non può essere vuoto. La documentazione completa è consultabile qui: https://thegraph.com/docs/define-a-subgraph#the-graphql-schema.

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

### Mappatura (`mapping.ts`) {#mapping}

Il file di mapping in The Graph definisce le nostre funzioni che trasformano gli eventi in ingresso in entità. È scritto in AssemblyScript, un subset di Typescript. Significa che è compilabile in WASM (WebAssembly) per un'esecuzione più portatile ed efficace del mapping.

Devi definire ogni funzione nominata nel file `subgraph-yaml`, quindi nel nostro caso ne occorrerà una sola: `handleNewBet`. Prima proviamo a caricare l'entità Player dall'indirizzo del mittente come id. Se non esiste, creiamo una nuova entità e la compiliamo con i valori iniziali.

Poi creiamo una nuova entità Bet. L'id sarà `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` che assicura sempre un valore unico. Usare solo l'hash non è abbastanza poiché qualcuno potrebbe chiamare la funzione placeBet diverse volte in una transazione tramite uno smart contract.

Infine possiamo aggiornare l'entità Player con tutti i dati. Non è possibile eseguire direttamente il push degli array, bensì devono essere aggiornati come indicato qui. Usiamo l'id per fare riferimento alla scommessa. E occorre aggiungere `.save()` alla fine per memorizzare un'entità.

La documentazione completa è consultabile qui: https://thegraph.com/docs/define-a-subgraph#writing-mappings. Puoi anche aggiungere l'output di registrazione al file di mapping, vedi [qui](https://thegraph.com/docs/assemblyscript-api#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // create if doesn't exist yet
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

  // update array like this
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Uso nel frontend {#using-it-in-the-frontend}

Tramite uno strumento come Apollo Boost, puoi facilmente integrare The Graph in una dApp React (o Appolo-Vue). Specialmente se si utilizzano hook React e Apollo, per recuperare i dati basta scrivere una sola query GraphQI nel componente. Una configurazione tipica potrebbe somigliare a:

```javascript
// Vedi tutti i sotto-grafici: https://thegraph.com/explorer/
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

E ora possiamo scrivere per esempio una query come questa. Otterremo una serie di informazioni:

- quante volte l'utente corrente ha vinto
- quante volte l'utente corrente ha perso
- un elenco di indicatori data/ora con tutte le scommesse precedenti dell'utente corrente

Tutto con una sola richiesta al server GraphQL.

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

Ma ci manca l'ultimo pezzo del puzzle: il server. Puoi eseguirlo personalmente o tramite un servizio di hosting.

## Il server The Graph {#the-graph-server}

### Graph Explorer: il servizio ospitato {#graph-explorer-the-hosted-service}

Il modo più semplice è usare il servizio di hosting. Segui le istruzioni [qui](https://thegraph.com/docs/deploy-a-subgraph) per distribuire un subgraph. Per molti progetti, puoi trovare i subgraph esistenti nell'esploratore all'indirizzo https://thegraph.com/explorer/.

![Explorer di The Graph](./thegraph-explorer.png)

### Esecuzione di un nodo personalizzato {#running-your-own-node}

In alternativa puoi eseguire un nodo personalizzato: https://github.com/graphprotocol/graph-node#quick-start. Un motivo per farlo potrebbe essere l'uso di una rete non supportata dal servizio di hosting. Sono correntemente supportate Mainnet, Kovan, Rinkeby, Ropsten, Goerli, PoA-Core, xDAI e Sokol.

## Il futuro decentralizzato {#the-decentralized-future}

GraphQL supporta i flussi e anche nuovi eventi in ingresso che non sono ancora supportati completamente da The Graph, ma saranno presto rilasciati.

Un aspetto ancora mancante è la decentralizzazione. The Graph ha piani futuri per diventare un protocollo completamente decentralizzato. Di seguito sono elencati due ottimi articoli che spiegano il piano in modo più dettagliato:

- https://thegraph.com/blog/the-graph-network-in-depth-part-1
- https://thegraph.com/blog/the-graph-network-in-depth-part-2

Due aspetti chiave sono:

1. Gli utenti pagheranno gli indicizzatori per le query.
2. Gli indicizzatori saranno token di Graph (GRT) in staking.
