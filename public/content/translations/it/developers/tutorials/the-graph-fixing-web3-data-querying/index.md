---
title: "The Graph: Risolvere l'interrogazione dei dati Web3"
description: "La blockchain è come un database ma senza SQL. Tutti i dati sono lì, ma non c'è modo di accedervi. Lascia che ti mostri come risolvere questo problema con The Graph e GraphQL."
author: Markus Waas
lang: it
tags: ["Solidity", "contratti intelligenti", "interrogazione", "the graph", "React"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Questa volta daremo un'occhiata più da vicino a The Graph, che nell'ultimo anno è diventato essenzialmente parte dello stack standard per lo sviluppo di dApp. Vediamo prima come faremmo le cose nel modo tradizionale...

## Senza The Graph... {#without-the-graph}

Quindi procediamo con un semplice esempio a scopo illustrativo. A tutti piacciono i giochi, quindi immagina un semplice gioco con utenti che piazzano scommesse:

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

Ora supponiamo che nella nostra dApp vogliamo mostrare le scommesse totali, il totale delle partite perse/vinte e anche aggiornarlo ogni volta che qualcuno gioca di nuovo. L'approccio sarebbe:

1. Recuperare `totalGamesPlayerWon`.
2. Recuperare `totalGamesPlayerLost`.
3. Iscriversi agli eventi `BetPlaced`.

Possiamo ascoltare l'[evento in Web3](https://docs.web3js.org/api/web3/class/Contract#events) come mostrato a destra, ma richiede la gestione di un bel po' di casi.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // evento emesso
})
.on('changed', function(event) {
    // evento rimosso di nuovo
})
.on('error', function(error, receipt) {
    // tx rifiutata
});
```

Ora, questo va ancora in qualche modo bene per il nostro semplice esempio. Ma supponiamo di voler mostrare ora gli importi delle scommesse perse/vinte solo per il giocatore corrente. Beh, siamo sfortunati, faresti meglio a distribuire un nuovo contratto intelligente che memorizzi quei valori e li recuperi. E ora immagina un contratto intelligente e una dApp molto più complicati, le cose possono diventare rapidamente disordinate.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

Puoi vedere come questo non sia ottimale:

- Non funziona per i contratti già distribuiti.
- Costi del gas extra per memorizzare quei valori.
- Richiede un'altra chiamata per recuperare i dati per un nodo di Ethereum.

![Thats not good enough](./not-good-enough.jpg)

Ora diamo un'occhiata a una soluzione migliore.

## Lascia che ti presenti GraphQL {#let-me-introduce-to-you-graphql}

Prima parliamo di GraphQL, originariamente progettato e implementato da Facebook. Potresti avere familiarità con il modello tradizionale delle API REST. Ora immagina invece di poter scrivere un'interrogazione esattamente per i dati che desideri:

![GraphQL API vs. REST API](./graphql.jpg)

![Dimostrazione animata di un'interrogazione GraphQL nel playground di The Graph](./graphql-query.gif)

Le due immagini catturano praticamente l'essenza di GraphQL. Con l'interrogazione a destra possiamo definire esattamente quali dati vogliamo, in modo da ottenere tutto in una singola richiesta e niente di più di ciò di cui abbiamo esattamente bisogno. Un server GraphQL gestisce il recupero di tutti i dati richiesti, quindi è incredibilmente facile da usare per il lato consumatore del frontend. [Questa è una bella spiegazione](https://www.apollographql.com/blog/graphql-explained) di come esattamente il server gestisce un'interrogazione, se sei interessato.

Ora, con questa conoscenza, tuffiamoci finalmente nello spazio della blockchain e in The Graph.

## Cos'è The Graph? {#what-is-the-graph}

Una blockchain è un database decentralizzato, ma contrariamente a quanto accade di solito, non abbiamo un linguaggio di interrogazione per questo database. Le soluzioni per il recupero dei dati sono dolorose o completamente impossibili. The Graph è un protocollo decentralizzato per l'indicizzazione e l'interrogazione dei dati della blockchain. E come potresti aver intuito, utilizza GraphQL come linguaggio di interrogazione.

![The Graph](./thegraph.png)

Gli esempi sono sempre il modo migliore per capire qualcosa, quindi usiamo The Graph per il nostro esempio GameContract.

## Come creare un Subgraph {#how-to-create-a-subgraph}

La definizione di come indicizzare i dati è chiamata subgraph (sottografo). Richiede tre componenti:

1. Manifesto (`subgraph.yaml`)
2. Schema (`schema.graphql`)
3. Mappatura (`mapping.ts`)

### Manifesto (`subgraph.yaml`) {#manifest}

Il manifesto è il nostro file di configurazione e definisce:

- quali contratti intelligenti indicizzare (indirizzo, rete, ABI...)
- quali eventi ascoltare
- altre cose da ascoltare come chiamate di funzione o blocchi
- le funzioni di mappatura che vengono chiamate (vedi `mapping.ts` di seguito)

Puoi definire più contratti e gestori qui. Una configurazione tipica avrebbe una cartella subgraph all'interno del progetto Hardhat con il proprio repository. Quindi puoi facilmente fare riferimento all'ABI.

Per motivi di comodità potresti anche voler usare uno strumento di template come mustache. Quindi crei un `subgraph.template.yaml` e inserisci gli indirizzi in base alle ultime distribuzioni. Per un esempio di configurazione più avanzato, vedi ad esempio il [repository del subgraph di Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

E la documentazione completa può essere consultata [qui](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

Lo schema è la definizione dei dati GraphQL. Ti permetterà di definire quali entità esistono e i loro tipi. I tipi supportati da The Graph sono

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Puoi anche usare le entità come tipo per definire le relazioni. Nel nostro esempio definiamo una relazione 1-a-molti dal giocatore alle scommesse. Il ! significa che il valore non può essere vuoto. La documentazione completa può essere consultata [qui](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

Il file di mappatura in The Graph definisce le nostre funzioni che trasformano gli eventi in arrivo in entità. È scritto in AssemblyScript, un sottoinsieme di TypeScript. Questo significa che può essere compilato in WASM (WebAssembly) per un'esecuzione più efficiente e portabile della mappatura.

Dovrai definire ogni funzione nominata nel file `subgraph.yaml`, quindi nel nostro caso ne serve solo una: `handleNewBet`. Per prima cosa cerchiamo di caricare l'entità Player dall'indirizzo del mittente come id. Se non esiste, creiamo una nuova entità e la riempiamo con i valori iniziali.

Quindi creiamo una nuova entità Bet. L'id per questa sarà `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` garantendo sempre un valore univoco. Usare solo l'hash non è sufficiente poiché qualcuno potrebbe chiamare la funzione placeBet più volte in una singola transazione tramite un contratto intelligente.

Infine possiamo aggiornare l'entità Player con tutti i dati. Gli array non possono essere inseriti direttamente, ma devono essere aggiornati come mostrato qui. Usiamo l'id per fare riferimento alla scommessa. E `.save()` è richiesto alla fine per memorizzare un'entità.

La documentazione completa può essere consultata qui: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Puoi anche aggiungere l'output di registrazione al file di mappatura, vedi [qui](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // crea se non esiste ancora
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

  // aggiorna l'array in questo modo
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Usarlo nel Frontend {#using-it-in-the-frontend}

Usando qualcosa come Apollo Boost, puoi facilmente integrare The Graph nella tua dApp React (o Apollo-Vue). Specialmente quando si usano gli hook di React e Apollo, recuperare i dati è semplice come scrivere una singola interrogazione GraphQL nel tuo componente. Una configurazione tipica potrebbe apparire così:

```javascript
// Vedi tutti i sottografi: https://thegraph.com/explorer/
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

E ora possiamo scrivere ad esempio un'interrogazione come questa. Questo ci recupererà

- quante volte l'utente corrente ha vinto
- quante volte l'utente corrente ha perso
- un elenco di timestamp con tutte le sue scommesse precedenti

Tutto in una singola richiesta al server GraphQL.

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

Ma ci manca un ultimo pezzo del puzzle e questo è il server. Puoi eseguirlo tu stesso o usare il servizio ospitato.

## Il server The Graph {#the-graph-server}

### Graph Explorer: Il servizio ospitato {#graph-explorer-the-hosted-service}

Il modo più semplice è usare il servizio ospitato. Segui le istruzioni [qui](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) per distribuire un subgraph. Per molti progetti puoi effettivamente trovare subgraph esistenti nell'[esploratore](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Eseguire il proprio nodo {#running-your-own-node}

In alternativa puoi eseguire il tuo nodo. Documentazione [qui](https://github.com/graphprotocol/graph-node#quick-start). Un motivo per farlo potrebbe essere l'utilizzo di una rete che non è supportata dal servizio ospitato. Le reti attualmente supportate [possono essere trovate qui](https://thegraph.com/docs/en/developing/supported-networks/).

## Il futuro decentralizzato {#the-decentralized-future}

GraphQL supporta anche i flussi (stream) per i nuovi eventi in arrivo. Questi sono supportati su The Graph tramite i [Substreams](https://thegraph.com/docs/en/substreams/) che sono attualmente in open beta.

Nel [2021](https://thegraph.com/blog/mainnet-migration/) The Graph ha iniziato la sua transizione verso una rete di indicizzazione decentralizzata. Puoi leggere di più sull'architettura di questa rete di indicizzazione decentralizzata [qui](https://thegraph.com/docs/en/network/explorer/).

Due aspetti chiave sono:

1. Gli utenti pagano gli indicizzatori per le interrogazioni.
2. Gli indicizzatori mettono in stake i Graph Token (GRT).