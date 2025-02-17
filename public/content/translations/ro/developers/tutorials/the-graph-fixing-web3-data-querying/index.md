---
title: "The Graph: Remedierea interogării datelor Web3"
description: Blockchain este ca o bază de date, dar fără SQL. Toate datele sunt acolo, dar nu există nicio modalitate de a le accesa. O să-ți arăt cum să reparăm acest lucru cu Graph și GraphQL.
author: Markus Waas
lang: ro
tags:
  - "solidity"
  - "contracte inteligente"
  - "interogarea"
  - "the graph"
  - "create-eth-app"
  - "react"
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

De data aceasta vom arunca o privire mai atentă la „The Graph” care, în esență, a devenit parte din stiva standard pentru dezvoltarea aplicațiilor dapp în ultimul an. Să vedem mai întâi cum am face lucrurile în mod tradițional...

## Fără „The Graph”... {#without-the-graph}

Vom folosi un exemplu simplu în scopul de ilustrare. Tuturor ne plac jocurile, deci să ne imaginăm un joc simplu, cu utilizatori care plasează pariuri:

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
            require(success, "Transferul nu a reușit");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Now let's say in our Dapp, we want to display total bets, the total games lost/won and also update it whenever someone plays again. Abordarea ar fi:

1. Preia `totalGamesPlayerWon`.
2. Preia `totalGamesPlayerLost`.
3. Abonează-te la `evenimente BetPlaced`.

Putem asculta [evenimentul în Web3](https://docs.web3js.org/api/web3/class/Contract#events) așa cum se arată în dreapta, dar necesită manipularea destul de multor cazuri.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // eveniment declanșat
})
.on('changed', function(event) {
    // evenimentul a fost eliminat din nou
})
.on('error', function(error, receipt) {
    // tx respins
});
```

Acum, acest lucru este încă destul de bun pentru exemplul nostru simplu. Dar să presupunem că vrem să afișăm numai câte pariuri a pierdut/câștigat doar jucătorul actual. Ei bine, nu avem noroc, ar fi bine să implementezi un nou contract care stochează valorile respective și să le afișeze. Și acum să ne imaginăm un contract inteligent și o aplicație dapp mult mai complicate, lucrurile pot deveni repede foarte confuze.

![Nu faci interogări pur și simplu](./one-does-not-simply-query.jpg)

Putem vedea de ce acest lucru nu este optim:

- Nu funcționează pentru contracte deja implementate.
- Costuri suplimentare de gaz pentru stocarea acestor valori.
- Necesită un alt apel pentru a prelua datele pentru un nod Ethereum.

![Asta nu e suficient de bine](./not-good-enough.jpg)

Acum să analizăm o soluție mai bună.

## Permite-mi să-ți prezint GraphQL {#let-me-introduce-to-you-graphql}

În primul rând, să vorbim despre GraphQL, inițial proiectat și implementat de Facebook. Este posibil să fii familiarizat cu modelul tradițional API Rest. Acum imaginează-ți că ai putea scrie o interogare pentru exact datele pe care le-ai dorit:

![GraphQL API față de REST API](./graphql.jpg)

<img src="https://cdn0.scrvt.com/b095ee27d37b3d7b6b150adba9ac6ec8/42226f4816a77656/bc5c8b270798/graphql-querygif.gif" width="100%" />

Cele două imagini surprind destul de bine esența GraphQL. Cu ajutorul interogării din dreapta putem defini exact ce date vrem și astfel obținem totul printr-o singură cerere, exact ce avem nevoie și nimic mai mult. Un server GraphQL se ocupă de preluarea tuturor datelor necesare, utilizarea fiind deci incredibil de ușoară de către consumatorul din frontend. [Se explică frumos prin aceasta](https://www.apollographql.com/blog/graphql-explained-5844742f195e/) cum anume gestionează serverul o interogare, dacă sunteți interesat.

Cunoscând acum aceste lucruri, să ne avântăm în sfârșit în spațiul blockchain și în „The Graph”.

## Ce este „The Graph”? {#what-is-the-graph}

Un blockchain este o bază de date descentralizată, dar, spre deosebire de ceea ce se întâmplă de obicei, nu avem un limbaj de interogare pentru această bază de date. Soluțiile pentru obținerea datelor sunt chinuitoare sau absolut imposibile. „The Graph” este un protocol descentralizat pentru indexarea și interogarea datelor de pe blockchain. Și poate ați ghicit, utilizează GraphQL ca limbaj de interogare.

![The Graph](./thegraph.png)

Cel mai bine se înțeleg lucrurile din exemple, așa că haideți să folosim „The Graph” în exemplul nostru „GameContract”.

## Cum să creăm un Subgraph {#how-to-create-a-subgraph}

Definiția modului de indexare a datelor se numește „subgraph”. Acesta necesită trei componente:

1. Manifest (`subgraph.yaml`)
2. Schema (`schema.graphql`)
3. Mapping (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Manifestul este fișierul nostru de configurare și definește:

- ce contracte inteligente să indexeze (adresa, rețea, ABI...)
- ce evenimente să asculte
- alte lucruri de ascultat, cum ar fi apeluri de funcții sau blocuri
- the mapping functions being called (see `mapping.ts` below)

Aici puteți defini mai multe contracte și manipulatoare. O configurare tipică ar fi cu un folder subgraph în proiectul Hardhat, cu propriul depozitar. Puteți apoi face referire la ABI cu ușurință.

Din comoditate, ați dori probabil să utilizați un instrument șablon, cum ar fi „mustache”. Then you create a `subgraph.template.yaml` and insert the addresses based on the latest deployments. Pentru a vedea un exemplu de configurare mai avansată, puteți consulta, de exemplu, [depozitarul subgraph-ului Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Iar aici puteți vedea documentația completă: https://thegraph.com/docs/define-a-subgraph#the-subgraph-manifest.

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

Schema este definiția datelor GraphQL. Aceasta vă va permite să definiți ce entități există și tipurile acestora. Tipurile acceptate din „The Graph” sunt

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

De asemenea, puteți utiliza entitățile ca „tip” pentru a defini relațiile. În exemplul nostru definim o relație între 1-și-mai-mulți a unui jucător la pariuri. Semnul „!” ne spune că valoarea nu poate fi goală. Puteți vedea aici documentația completă: https://thegraph.com/docs/define-a-subgraph#the-graphql-schema.

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

Fișierul de mapare din „The Graph” definește funcțiile noastre care transformă evenimentele primite în entități. Este scris în AssemblyScript, un subset al Typescript. Deci poate fi compilat în WASM (WebAssembly) pentru executarea mai eficientă și portabilă a mapării.

You will need to define each function named in the `subgraph.yaml` file, so in our case we need only one: `handleNewBet`. Mai întâi încercăm să încărcăm entitatea Player utilizând adresa expeditorului drept cod de identificare (id). Dacă nu există, creăm o entitate nouă și o completăm cu valorile inițiale.

Apoi vom crea o nouă entitate Bet. The id for this will be `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` ensuring always a unique value. Dacă utilizăm numai hash-ul, acest lucru nu este suficient, pentru că cineva poate apela funcția „placeBet” de mai multe ori într-o singură tranzacție printr-un contract inteligent.

Lastly we can update the Player entity with all the data. Matricele nu pot fi împinse direct, dar trebuie actualizate așa cum se arată aici. Folosim id-ul pentru a face referire la pariu. And `.save()` is required at the end to store an entity.

Puteți vedea aici documentația completă: https://thegraph.com/docs/define-a-subgraph#writing-mappings. Puteți și adăuga rezultatele jurnalizării în fișierul de mapare; pentru aceasta, uitați-vă [aici](https://thegraph.com/docs/assemblyscript-api#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // creare dacă nu există încă
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

  // actualizează matrice ca aceasta
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Folosindu-l în Front-end {#using-it-in-the-frontend}

Folosind ceva de genul Apollo Boost, puteți integra cu ușurință „The Graph” în aplicația dvs. React Dapp (sau Apollo Vue). În special când utilizați hooks React și Apollo, este tot atât de simplu să preluați datele cât să scrieți o singură interogare GrafQl în componenta dvs. O configurare tipică ar putea arăta astfel:

```javascript
// Vezi toate subgraph-urile: https://thegraph.com/explorer/
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

Și acum putem scrie, de exemplu, o interogare de genul. Prin aceasta vom obține ca rezultat

- de câte ori a câștigat utilizatorul curent
- de câte ori a pierdut utilizatorul curent
- o listă a marcajelor temporale cu toate pariurile sale anterioare

Toate într-o singură cerere către serverul GraphQL.

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

Dar ne lipsește o ultimă piesă din puzzle, și anume serverul. Puteți fie să îl rulați singur, fie să utilizați serviciul găzduit.

## Serverul „The Graph” {#the-graph-server}

### Exploratorul Graph: Serviciul găzduit {#graph-explorer-the-hosted-service}

Cel mai simplu mod de a utiliza serviciul găzduit. Pentru a implementa un subgraf, urmați instrucțiunile de [aici](https://thegraph.com/docs/deploy-a-subgraph). Pentru multe proiecte, puteți găsi subgraph-urile existente în explorator la https://thegraph.com/explorer/.

![Exploratorul - The Graph](./thegraph-explorer.png)

### Rularea propriului tău nod {#running-your-own-node}

Altfel, vă puteți rula propriul nod: https://github.com/graphprotocol/graph-node#quick-start. Poate faceți acest lucru pentru că utilizați o rețea care nu este acceptată de serviciul găzduit. Sunt actualmente acceptate Mainnet, Kovan, Rinkeby, Ropsten, Goerli, PoA-Core, xDAI și Sokol.

## Viitorul descentralizat {#the-decentralized-future}

GraphQL acceptă și fluxuri pentru evenimente nou primite. „The Graph” nu acceptă încă aceasta, dar compatibilitatea se va lansa în curând.

Rămâne însă un aspect lipsă, și anume descentralizarea. Pentru viitor se are în vedere ca „The Graph” să devină în cele din urmă un protocol complet descentralizat. Iată două articole excelente care explică în detaliu care este planul:

- https://thegraph.com/blog/the-graph-network-in-depth-part-1
- https://thegraph.com/blog/the-graph-network-in-depth-part-2

Iată două aspecte esențiale:

1. Utilizatorii vor plăti indexurile pentru interogări.
2. Indexurile vor miza tokenuri Graph (GRT).
