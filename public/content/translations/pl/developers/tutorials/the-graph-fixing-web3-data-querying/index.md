---
title: "The Graph: Usprawnianie zapytań o dane Web3"
description: Blockchain jest jak baza danych, ale bez SQL. Wszystkie dane tam są, ale nie ma do nich dostępu. Pokażę ci, jak to naprawić za pomocą The Graph i GraphQL.
author: Markus Waas
lang: pl
tags:
  [
    "solidity",
    "smart kontrakty",
    "zapytania",
    "the graph",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Tym razem przyjrzymy się bliżej The Graph, który w zeszłym roku stał się zasadniczo częścią standardowego stosu do tworzenia dapek. Zobaczmy najpierw, jak zrobilibyśmy rzeczy w tradycyjny sposób...

## Bez The Graph... {#without-the-graph}

Przejdźmy więc do prostego przykładu w celach ilustracyjnych. Wszyscy lubimy gry, więc wyobraźmy sobie prostą grę, w której użytkownicy obstawiają zakłady:

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
            require(success, "Transfer nie powiódł się");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Powiedzmy, że w naszej dapce chcemy wyświetlać całkowitą liczbę zakładów, łączną liczbę przegranych/wygranych gier, a także aktualizować ją za każdym razem, gdy ktoś ponownie zagra. Podejście byłoby następujące:

1. Pobierz `totalGamesPlayerWon`.
2. Pobierz `totalGamesPlayerLost`.
3. Subskrybuj zdarzenia `BetPlaced`.

Możemy nasłuchiwać [zdarzenia w Web3](https://docs.web3js.org/api/web3/class/Contract#events), jak pokazano po prawej stronie, ale wymaga to obsługi sporej liczby przypadków.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // zdarzenie zostało wywołane
})
.on('changed', function(event) {
    // zdarzenie zostało ponownie usunięte
})
.on('error', function(error, receipt) {
    // transakcja odrzucona
});
```

W naszym prostym przykładzie jest to nadal w miarę w porządku. Ale powiedzmy, że chcemy teraz wyświetlać kwoty przegranych/wygranych zakładów tylko dla aktualnego gracza. Cóż, nie mamy szczęścia, lepiej wdrożyć nowy kontrakt, który przechowuje te wartości i je pobiera. A teraz wyobraź sobie znacznie bardziej skomplikowany inteligentny kontrakt i dapkę, sprawy mogą się bardzo szybko skomplikować.

![Nie da się tak po prostu robić zapytań](./one-does-not-simply-query.jpg)

Widać, że nie jest to optymalne:

- Nie działa dla już wdrożonych kontraktów.
- Dodatkowe koszty gazu za przechowywanie tych wartości.
- Wymaga kolejnego wywołania w celu pobrania danych dla węzła Ethereum.

![To nie jest wystarczająco dobre](./not-good-enough.jpg)

Spójrzmy teraz na lepsze rozwiązanie.

## Pozwól, że przedstawię Ci GraphQL {#let-me-introduce-to-you-graphql}

Najpierw porozmawiajmy o GraphQL, pierwotnie zaprojektowanym i zaimplementowanym przez Facebooka. Być może znasz tradycyjny model API REST. A teraz wyobraź sobie, że zamiast tego możesz napisać zapytanie dokładnie o te dane, które chcesz:

![GraphQL API kontra REST API](./graphql.jpg)

![](./graphql-query.gif)

Te dwa obrazy w dużej mierze oddają istotę GraphQL. Za pomocą zapytania po prawej stronie możemy dokładnie zdefiniować, jakich danych chcemy, dzięki czemu otrzymujemy wszystko w jednym żądaniu i nic ponad to, czego potrzebujemy. Serwer GraphQL obsługuje pobieranie wszystkich wymaganych danych, dzięki czemu jest niezwykle łatwy w użyciu dla klienta frontendowego. [To jest dobre wyjaśnienie](https://www.apollographql.com/blog/graphql-explained), jak dokładnie serwer obsługuje zapytanie, jeśli jesteś zainteresowany.

Mając tę wiedzę, przejdźmy w końcu do przestrzeni blockchain i The Graph.

## Czym jest The Graph? {#what-is-the-graph}

Blockchain to zdecentralizowana baza danych, ale w przeciwieństwie do tego, co zwykle ma miejsce, nie mamy języka zapytań dla tej bazy danych. Rozwiązania do pobierania danych są uciążliwe lub całkowicie niemożliwe. The Graph to zdecentralizowany protokół do indeksowania i wykonywania zapytań o dane blockchain. I jak można się domyślić, używa GraphQL jako języka zapytań.

![The Graph](./thegraph.png)

Przykłady są zawsze najlepszym sposobem na zrozumienie czegoś, więc użyjmy The Graph w naszym przykładzie GameContract.

## Jak stworzyć podgraf {#how-to-create-a-subgraph}

Definicja sposobu indeksowania danych nazywana jest podgrafem. Wymaga trzech komponentów:

1. Manifest (`subgraph.yaml`)
2. Schemat (`schema.graphql`)
3. Mapowanie (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Manifest jest naszym plikiem konfiguracyjnym i definiuje:

- które inteligentne kontrakty indeksować (adres, sieć, ABI...)
- jakich zdarzeń nasłuchiwać
- inne elementy do nasłuchiwania, takie jak wywołania funkcji lub bloki
- wywoływane funkcje mapowania (patrz `mapping.ts` poniżej)

Można tu zdefiniować wiele kontraktów i handlerów. Typowa konfiguracja to folder podgrafu w projekcie Hardhat z własnym repozytorium. Wtedy można łatwo odwołać się do ABI.

Dla wygody można również użyć narzędzia do szablonów, takiego jak mustache. Następnie tworzy się `subgraph.template.yaml` i wstawia adresy na podstawie najnowszych wdrożeń. Bardziej zaawansowany przykład konfiguracji można znaleźć na przykład w [repozytorium podgrafu Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Pełną dokumentację można zobaczyć [tutaj](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```yaml
specVersion: 0.0.1
description: Obstawianie zakładów na Ethereum
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

### Schemat (`schema.graphql`) {#schema}

Schemat to definicja danych GraphQL. Pozwala on zdefiniować, jakie encje istnieją i jakie są ich typy. Obsługiwane typy z The Graph to

- Bajty
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Można również używać encji jako typów do definiowania relacji. W naszym przykładzie definiujemy relację jeden-do-wielu od gracza do zakładów. Znak ! oznacza, że wartość nie może być pusta. Pełną dokumentację można zobaczyć [tutaj](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Mapowanie (`mapping.ts`) {#mapping}

Plik mapowania w The Graph definiuje nasze funkcje, które przekształcają przychodzące zdarzenia w encje. Jest napisany w AssemblyScript, podzbiorze Typescript. Oznacza to, że może być skompilowany do WASM (WebAssembly) w celu wydajniejszego i bardziej przenośnego wykonywania mapowania.

Należy zdefiniować każdą funkcję nazwaną w pliku `subgraph.yaml`, więc w naszym przypadku potrzebujemy tylko jednej: `handleNewBet`. Najpierw próbujemy załadować encję Player z adresu nadawcy jako id. Jeśli nie istnieje, tworzymy nową encję i wypełniamy ją wartościami początkowymi.

Następnie tworzymy nową encję Bet. Identyfikator dla tego będzie `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`, co zapewnia unikalną wartość. Użycie samego haszu nie wystarczy, ponieważ ktoś może wywołać funkcję placeBet kilka razy w jednej transakcji za pośrednictwem inteligentnego kontraktu.

Na koniec możemy zaktualizować encję Player, podając wszystkie dane. Tablice nie mogą być bezpośrednio zasilane (push), ale muszą być aktualizowane w pokazany tutaj sposób. Używamy identyfikatora do odniesienia się do zakładu. I `.save()` jest wymagane na końcu do zapisania encji.

Pełną dokumentację można zobaczyć tutaj: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Można również dodać dane wyjściowe rejestrowania do pliku mapowania, patrz [tutaj](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // utwórz, jeśli jeszcze nie istnieje
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

  // zaktualizuj tablicę w ten sposób
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Użycie na frontendzie {#using-it-in-the-frontend}

Używając czegoś takiego jak Apollo Boost, można łatwo zintegrować The Graph w swojej dapce React (lub Apollo-Vue). Szczególnie w przypadku korzystania z hooków React i Apollo, pobieranie danych jest tak proste, jak napisanie pojedynczego zapytania GraphQL w komponencie. Typowa konfiguracja może wyglądać następująco:

```javascript
// Zobacz wszystkie podgrafy: https://thegraph.com/explorer/
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

A teraz możemy napisać na przykład takie zapytanie. Spowoduje to pobranie

- ile razy bieżący użytkownik wygrał
- ile razy bieżący użytkownik przegrał
- listy sygnatur czasowych ze wszystkimi jego poprzednimi zakładami

Wszystko w jednym żądaniu do serwera GraphQL.

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

![Magia](./magic.jpg)

Ale brakuje nam ostatniego elementu układanki, którym jest serwer. Można go uruchomić samodzielnie lub skorzystać z usługi hostowanej.

## Serwer The Graph {#the-graph-server}

### Graph Explorer: Usługa hostowana {#graph-explorer-the-hosted-service}

Najprostszym sposobem jest skorzystanie z usługi hostowanej. Postępuj zgodnie z instrukcjami [tutaj](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/), aby wdrożyć podgraf. Dla wielu projektów można znaleźć istniejące podgrafy w [eksploratorze](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Uruchamianie własnego węzła {#running-your-own-node}

Alternatywnie można uruchomić własny węzeł. Dokumentacja [tutaj](https://github.com/graphprotocol/graph-node#quick-start). Jednym z powodów może być korzystanie z sieci, która nie jest obsługiwana przez usługę hostowaną. Obecnie obsługiwane sieci [można znaleźć tutaj](https://thegraph.com/docs/en/developing/supported-networks/).

## Zdecentralizowana przyszłość {#the-decentralized-future}

GraphQL obsługuje również strumienie dla nowo przychodzących zdarzeń. Są one obsługiwane w The Graph za pomocą [Substreams](https://thegraph.com/docs/en/substreams/), które są obecnie w otwartej wersji beta.

W [2021](https://thegraph.com/blog/mainnet-migration/) The Graph rozpoczął przejście na zdecentralizowaną sieć indeksującą. Więcej o architekturze tej zdecentralizowanej sieci indeksującej można przeczytać [tutaj](https://thegraph.com/docs/en/network/explorer/).

Dwa kluczowe aspekty to:

1. Użytkownicy płacą indekserom za zapytania.
2. Indekserzy stakują tokeny Graph (GRT).
