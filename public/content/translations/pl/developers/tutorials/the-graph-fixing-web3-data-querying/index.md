---
title: "The Graph: Naprawa zapytań o dane w Web3"
description: "Blockchain jest jak baza danych, ale bez SQL. Wszystkie dane tam są, ale nie ma do nich dostępu. Pozwól, że pokażę Ci, jak to naprawić za pomocą The Graph i GraphQL."
author: Markus Waas
lang: pl
tags: ["Solidity", "inteligentne kontrakty", "zapytania", "the graph", "React"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Tym razem przyjrzymy się bliżej The Graph, który w zeszłym roku stał się w zasadzie częścią standardowego stosu technologicznego do tworzenia zdecentralizowanych aplikacji (dapp). Zobaczmy najpierw, jak zrobilibyśmy to w tradycyjny sposób...

## Bez The Graph... {#without-the-graph}

Posłużmy się więc prostym przykładem w celach ilustracyjnych. Wszyscy lubimy gry, więc wyobraźmy sobie prostą grę, w której użytkownicy obstawiają zakłady:

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

Załóżmy teraz, że w naszej zdecentralizowanej aplikacji (dapp) chcemy wyświetlać łączną liczbę zakładów, łączną liczbę przegranych/wygranych gier, a także aktualizować te dane za każdym razem, gdy ktoś ponownie zagra. Podejście wyglądałoby następująco:

1. Pobranie `totalGamesPlayerWon`.
2. Pobranie `totalGamesPlayerLost`.
3. Subskrypcja zdarzeń `BetPlaced`.

Możemy nasłuchiwać [zdarzenia w Web3](https://docs.web3js.org/api/web3/class/Contract#events), jak pokazano po prawej stronie, ale wymaga to obsłużenia całkiem sporej liczby przypadków.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // zdarzenie wywołane
})
.on('changed', function(event) {
    // zdarzenie zostało ponownie usunięte
})
.on('error', function(error, receipt) {
    // transakcja odrzucona
});
```

To wciąż jest w miarę w porządku dla naszego prostego przykładu. Ale powiedzmy, że chcemy teraz wyświetlać kwoty przegranych/wygranych zakładów tylko dla obecnego gracza. Cóż, mamy pecha, lepiej wdrożyć nowy kontrakt, który przechowuje te wartości i je pobiera. A teraz wyobraź sobie znacznie bardziej skomplikowany inteligentny kontrakt i dapp – sprawy mogą się szybko skomplikować.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

Widać, że nie jest to optymalne:

- Nie działa dla już wdrożonych kontraktów.
- Dodatkowe koszty gazu za przechowywanie tych wartości.
- Wymaga kolejnego wywołania w celu pobrania danych z węzła Ethereum.

![Thats not good enough](./not-good-enough.jpg)

Spójrzmy teraz na lepsze rozwiązanie.

## Pozwól, że przedstawię Ci GraphQL {#let-me-introduce-to-you-graphql}

Najpierw porozmawiajmy o GraphQL, pierwotnie zaprojektowanym i zaimplementowanym przez Facebook. Być może znasz tradycyjny model REST API. Wyobraź sobie teraz, że zamiast tego możesz napisać zapytanie o dokładnie te dane, których potrzebujesz:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

Te dwa obrazy w zasadzie oddają istotę GraphQL. Za pomocą zapytania po prawej stronie możemy dokładnie zdefiniować, jakich danych chcemy, więc otrzymujemy wszystko w jednym żądaniu i nic więcej poza tym, czego dokładnie potrzebujemy. Serwer GraphQL zajmuje się pobieraniem wszystkich wymaganych danych, więc jest to niezwykle łatwe w użyciu dla strony konsumenckiej (frontendu). [Oto fajne wyjaśnienie](https://www.apollographql.com/blog/graphql-explained) tego, jak dokładnie serwer obsługuje zapytanie, jeśli jesteś zainteresowany.

Mając tę wiedzę, przejdźmy wreszcie do przestrzeni blockchain i The Graph.

## Czym jest The Graph? {#what-is-the-graph}

Blockchain to zdecentralizowana baza danych, ale w przeciwieństwie do tego, z czym zazwyczaj mamy do czynienia, nie mamy języka zapytań dla tej bazy danych. Rozwiązania do pobierania danych są uciążliwe lub całkowicie niemożliwe. The Graph to zdecentralizowany protokół do indeksowania i odpytywania danych z blockchaina. I jak można się domyślić, używa GraphQL jako języka zapytań.

![The Graph](./thegraph.png)

Przykłady są zawsze najlepsze do zrozumienia czegoś, więc użyjmy The Graph dla naszego przykładu GameContract.

## Jak utworzyć podgraf {#how-to-create-a-subgraph}

Definicja sposobu indeksowania danych nazywa się podgrafem. Wymaga on trzech komponentów:

1. Manifest (`subgraph.yaml`)
2. Schemat (`schema.graphql`)
3. Mapowanie (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Manifest to nasz plik konfiguracyjny, który definiuje:

- które inteligentne kontrakty indeksować (adres, sieć, ABI...)
- jakich zdarzeń nasłuchiwać
- inne rzeczy do nasłuchiwania, takie jak wywołania funkcji lub bloki
- wywoływane funkcje mapujące (zobacz `mapping.ts` poniżej)

Możesz tu zdefiniować wiele kontraktów i handlerów. Typowa konfiguracja miałaby folder podgrafu wewnątrz projektu Hardhat z własnym repozytorium. Wtedy możesz łatwo odwołać się do ABI.

Dla wygody możesz również chcieć użyć narzędzia do szablonów, takiego jak mustache. Wtedy tworzysz `subgraph.template.yaml` i wstawiasz adresy na podstawie najnowszych wdrożeń. Bardziej zaawansowany przykład konfiguracji można znaleźć na przykład w [repozytorium podgrafu Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Pełną dokumentację można znaleźć [tutaj](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Schemat (`schema.graphql`) {#schema}

Schemat to definicja danych GraphQL. Pozwoli Ci zdefiniować, jakie encje istnieją i jakie są ich typy. Obsługiwane typy przez The Graph to:

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Możesz również używać encji jako typu do definiowania relacji. W naszym przykładzie definiujemy relację jeden-do-wielu od gracza do zakładów. Znak ! oznacza, że wartość nie może być pusta. Pełną dokumentację można znaleźć [tutaj](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

Plik mapowania w The Graph definiuje nasze funkcje, które przekształcają przychodzące zdarzenia w encje. Jest napisany w AssemblyScript, podzbiorze TypeScript. Oznacza to, że może zostać skompilowany do WASM (WebAssembly) w celu bardziej wydajnego i przenośnego wykonywania mapowania.

Będziesz musiał zdefiniować każdą funkcję nazwaną w pliku `subgraph.yaml`, więc w naszym przypadku potrzebujemy tylko jednej: `handleNewBet`. Najpierw próbujemy załadować encję Player z adresu nadawcy jako id. Jeśli nie istnieje, tworzymy nową encję i wypełniamy ją wartościami początkowymi.

Następnie tworzymy nową encję Bet. Identyfikatorem dla niej będzie `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`, co zapewnia zawsze unikalną wartość. Użycie samego hasha nie wystarczy, ponieważ ktoś może wywołać funkcję placeBet kilka razy w jednej transakcji za pośrednictwem inteligentnego kontraktu.

Na koniec możemy zaktualizować encję Player wszystkimi danymi. Tablice nie mogą być bezpośrednio modyfikowane przez push, ale muszą być aktualizowane w sposób pokazany tutaj. Używamy id, aby odwołać się do zakładu. A `.save()` jest wymagane na końcu, aby zapisać encję.

Pełną dokumentację można znaleźć tutaj: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Możesz również dodać logowanie do pliku mapowania, zobacz [tutaj](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

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

## Użycie we frontendzie {#using-it-in-the-frontend}

Używając czegoś takiego jak Apollo Boost, możesz łatwo zintegrować The Graph w swojej zdecentralizowanej aplikacji (dapp) w React (lub Apollo-Vue). Zwłaszcza przy użyciu hooków React i Apollo, pobieranie danych jest tak proste, jak napisanie pojedynczego zapytania GraphQL w komponencie. Typowa konfiguracja może wyglądać tak:

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

A teraz możemy napisać na przykład takie zapytanie. Pobierze ono dla nas:

- ile razy obecny użytkownik wygrał
- ile razy obecny użytkownik przegrał
- listę znaczników czasu ze wszystkimi jego poprzednimi zakładami

Wszystko to w jednym żądaniu do serwera GraphQL.

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

Brakuje nam jednak ostatniego elementu układanki, czyli serwera. Możesz go uruchomić samodzielnie lub skorzystać z usługi hostowanej.

## Serwer The Graph {#the-graph-server}

### Graph Explorer: Usługa hostowana {#graph-explorer-the-hosted-service}

Najprostszym sposobem jest skorzystanie z usługi hostowanej. Postępuj zgodnie z instrukcjami [tutaj](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/), aby wdrożyć podgraf. Dla wielu projektów można znaleźć już istniejące podgrafy w [eksploratorze](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Uruchomienie własnego węzła {#running-your-own-node}

Alternatywnie możesz uruchomić własny węzeł. Dokumentacja znajduje się [tutaj](https://github.com/graphprotocol/graph-node#quick-start). Jednym z powodów, dla których warto to zrobić, może być korzystanie z sieci, która nie jest obsługiwana przez usługę hostowaną. Obecnie obsługiwane sieci [można znaleźć tutaj](https://thegraph.com/docs/en/developing/supported-networks/).

## Zdecentralizowana przyszłość {#the-decentralized-future}

GraphQL obsługuje również strumienie dla nowo przychodzących zdarzeń. Są one obsługiwane w The Graph poprzez [Substreams](https://thegraph.com/docs/en/substreams/), które są obecnie w fazie otwartej bety.

W [2021 roku](https://thegraph.com/blog/mainnet-migration/) The Graph rozpoczął przejście na zdecentralizowaną sieć indeksującą. Więcej o architekturze tej zdecentralizowanej sieci indeksującej możesz przeczytać [tutaj](https://thegraph.com/docs/en/network/explorer/).

Dwa kluczowe aspekty to:

1. Użytkownicy płacą indeksatorom za zapytania.
2. Indeksatorzy stakują tokeny Graph (GRT).