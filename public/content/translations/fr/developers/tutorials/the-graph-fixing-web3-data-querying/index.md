---
title: "The Graph : Résoudre le problème des requêtes de données du Web3"
description: La blockchain est comme une base de données mais sans SQL. Toutes les données y sont présentes mais aucun moyen d'y accéder. Laissez-moi vous montrer comment résoudre cela avec The Graph et GraphQL.
author: Markus Waas
lang: fr
tags:
  - "solidity"
  - "contrats intelligents"
  - "requêtes"
  - "the graph"
  - "create-eth-app"
  - "react"
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Nous allons nous intéresser de plus près à The Graph qui, depuis l'année dernière, fait essentiellement partie intégrante du stack standard pour le développement de dApps. Voyons d'abord comment nous ferions les choses de façon traditionnelle...

## Sans The Graph... {#without-the-graph}

Prenons donc un exemple simple à titre d'illustration. Nous aimons tous les jeux, alors imaginez un jeu simple avec des utilisateurs qui placent des paris :

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

Maintenant, disons que dans notre dApp, nous voulons afficher le total des mises, le total des parties perdues/gagnées et également le mettre à jour chaque fois que quelqu'un joue à nouveau. L'approche serait :

1. Récupérer `totalGamesPlayerWon`.
2. Récupérer `totalGamesPlayerLost`.
3. S'abonner aux événements `BetPlaced`.

Nous pouvons considérer [l'événement sur Web3](https://docs.web3js.org/api/web3/class/Contract#events) comme indiqué sur la droite, mais cela nécessite de traiter pas mal de cas.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // event fired
})
.on('changed', function(event) {
    // event was removed again
})
.on('error', function(error, receipt) {
    // tx rejected
});
```

C'est plutôt bien pour notre simple exemple. Mais disons que nous voulons maintenant afficher les quantités de paris perdus / gagnés uniquement pour le joueur actuel. Eh bien, pas de chance, vous devriez déployer un nouveau contrat qui stocke ces valeurs et les récupère. Et maintenant, imaginez un contrat intelligent et une dApp beaucoup plus complexes, les choses peuvent se gâter rapidement.

![On ne se contente pas d'émettrer une requête](./one-does-not-simply-query.jpg)

Vous pouvez voir pourquoi ce n'est pas optimal :

- Ne fonctionne pas pour les contrats déjà déployés.
- Frais supplémentaires (gaz) pour le stockage de ces valeurs.
- Nécessite un autre appel pour récupérer les données d'un nœud Ethereum.

![Ce n'est pas assez bon](./not-good-enough.jpg)

Voyons maintenant une meilleure solution.

## Laissez-moi vous présenter GraphQL {#let-me-introduce-to-you-graphql}

Commençons par parler de GraphQL, initialement conçu et implémenté par Facebook. Vous connaissez peut-être le modèle d'API REST traditionnel. Imaginez maintenant que vous puissiez écrire une requête pour obtenir exactement les données que vous voulez :

![API GraphQL vs. API REST](./graphql.jpg)

<img src="https://cdn0.scrvt.com/b095ee27d37b3d7b6b150adba9ac6ec8/42226f4816a77656/bc5c8b270798/graphql-querygif.gif" width="100%" />

Ces deux images illustrent bien l'essence de GraphQL. Avec la requête de droite, nous pouvons définir exactement les données que nous voulons. Ainsi, nous récupérons tout en une seule requête et rien de plus que ce dont nous avons exactement besoin. Un serveur GraphQL gère la récupération de toutes les données requises, il est ainsi incroyablement facile à utiliser côté consommateur. [Voici une bonne explication](https://www.apollographql.com/blog/graphql-explained-5844742f195e/) de la façon dont le serveur gère exactement une requête si vous êtes intéressé.

Maintenant, avec cette connaissance, parlons enfin de blockchain et de The Graph.

## Qu'est-ce que The Graph ? {#what-is-the-graph}

Une blockchain est une base de données décentralisée, mais contrairement à ce qui est généralement le cas, nous n'avons pas de langage de requête pour cette base de données. Les solutions pour récupérer les données sont pénibles ou totalement impossibles. The Graph est un protocole décentralisé pour l'indexation et la requête de données blockchain. Et vous l'aurez peut-être deviné, il utilise GraphQL comme langue de requête.

![The Graph](./thegraph.png)

Rien de tel que quelques exemples pour comprendre une chose, alors utilisons The Graph pour notre exemple de GameContract.

## Comment créer un Subgraph {#how-to-create-a-subgraph}

La définition de comment indexer les données est appelée subgraph. Il nécessite trois composants :

1. Manifeste (`subgraph.yaml`)
2. Schéma (`schema.graphql`)
3. Mapping (`mapping.ts`)

### Manifeste (`subgraph.yaml`) {#manifest}

Le manifeste est notre fichier de configuration et définit :

- quels contrats intelligents indexer (adresse, réseau, ABI...)
- quels évènements écouter
- d'autres éléments à prendre en compte comme des appels de fonction ou des blocs
- les fonctions de mapping étant appelées (voir `mapping.ts` ci-dessous)

Ici, vous pouvez définir plusieurs contrats et handlers. Une configuration typique a un dossier de sous-graphes à l'intérieur du projet Hardhat avec son propre dépôt. Ensuite, vous pouvez facilement référencer l'ABI.

Pour des raisons de commodité, vous pouvez également utiliser un outil de template comme Mustache. Ensuite, vous allez créer un template `subgraph.template.yaml` et y insérez les adresses basées sur les derniers déploiements. Pour un exemple plus avancé, vous pouvez consulter le [répertoire de subgraphs Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Et la documentation complète peut être consultée [ici](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Schéma (`schema.graphql`) {#schema}

Le schéma est la définition des données GraphQL. Il vous permettra de définir quelles entités existent et leurs types. Les types pris en charge par The Graph sont :

- Bytes
- ID
- String (Chaîne de caractères)
- Boolean
- Int
- BigInt
- BigDecimal

Vous pouvez également utiliser des entités comme type pour définir des relations. Dans notre exemple, nous définissons une relation « un à plusieurs » pour les paris d'un joueur. Le ! signifie que la valeur ne peut pas être vide. La documentation complète peut être consultée [ici](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Mappage (`mapping.ts`) {#mapping}

Le fichier de mapping dans The Graph définit nos fonctions qui transforment les événements entrants en entités. Il est écrit en AssemblyScript, un sous-ensemble de Typescript. Cela signifie qu'il peut être compilé en WASM (WebAssembly) pour une exécution plus efficace et portable du mapping.

Vous devrez définir chaque fonction nommée dans le fichier `subgraph.yaml`. Ainsi dans notre cas, nous n'avons besoin que d'une seule : `handleNewBet`. Nous essayons d'abord de charger l'entité Player depuis l'adresse de l'expéditeur en tant qu'identifiant. Si elle n'existe pas, nous créons une nouvelle entité et la remplissons avec des valeurs de départ.

Puis nous créons une nouvelle entité Bet. L'ID pour cela sera `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` assurant toujours une valeur unique. Utiliser uniquement le hachage n'est pas suffisant, car quelqu'un peut appeler la fonction placeBet plusieurs fois dans une transaction via un contrat intelligent.

Enfin, nous pouvons mettre à jour l'entité du Player avec toutes les données. Les tableaux ne peuvent pas être poussés directement, mais doivent être mis à jour comme indiqué ici. Nous utilisons l'ID pour référencer le pari. Et `.save()` est requis à la fin pour stocker une entité.

La documentation complète est disponible ici : https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Vous pouvez également ajouter une sortie de journalisation au fichier de mapping, voir [ici](https://thegraph.com/docs/assemblyscript-api#api-reference).

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

## L'utiliser dans le Frontend {#using-it-in-the-frontend}

En utilisant quelque chose comme Apollo Boost, vous pouvez facilement intégrer The Graph dans votre dApp React (ou Apollo-Vue). Surtout lorsque vous utilisez des hooks React et Apollo, récupérer des données est aussi simple que d'écrire une requête GraphQL dans votre composant. Une configuration type pourrait ressembler à ceci :

```javascript
// See all subgraphs: https://thegraph.com/explorer/
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

Et maintenant, nous pouvons écrire par exemple une requête comme celle-ci. Elle nous retournera :

- combien de fois l'utilisateur actuel a gagné
- combien de fois l'utilisateur actuel a perdu
- une liste horodatée de tous ses paris précédents

Le tout en une seule requête au serveur GraphQL.

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

![Magique](./magic.jpg)

Mais il nous manque une dernière pièce du puzzle et c'est le serveur. Vous pouvez soit l'exécuter vous-même, soit utiliser le service hébergé.

## Serveur The Graph {#the-graph-server}

### Graph Explorer : le service hébergé {#graph-explorer-the-hosted-service}

Le moyen le plus simple est d'utiliser le service hébergé. Suivez les instructions [ici](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) pour déployer un subgraph. Pour de nombreux projets, vous pouvez trouver des subgraphs existants dans [l'explorateur](https://thegraph.com/explorer/).

![Le Graph-Explorer](./thegraph-explorer.png)

### Exécuter votre propre nœud {#running-your-own-node}

Sinon, vous pouvez faire tourner votre propre nœud. Documentation [ici](https://github.com/graphprotocol/graph-node#quick-start). Une raison d'agir de la sorte peut être d'utiliser un réseau qui n'est pas pris en charge par le service hébergé. Les réseaux actuellement pris en charge [sont disponibles ici](https://thegraph.com/docs/en/developing/supported-networks/).

## Un avenir décentralisé {#the-decentralized-future}

GraphQL prend également en charge les flux pour les nouveaux événements à venir. Ceux-ci sont pris en charge par The Graph par le biais de [Substreams](https://thegraph.com/docs/en/substreams/) qui est actuellement en version bêta ouverte.

En [2021](https://thegraph.com/blog/mainnet-migration/), The Graph a commencé sa transition vers un réseau d'indexation décentralisé. Vous pouvez en savoir plus sur l'architecture de ce réseau d'indexation décentralisé [ici](https://thegraph.com/docs/en/network/explorer/).

Les deux aspects clés sont :

1. Les utilisateurs paient les indexeurs pour les requêtes.
2. Les indexeurs mettront en jeu des jetons The Graph (GRT).
