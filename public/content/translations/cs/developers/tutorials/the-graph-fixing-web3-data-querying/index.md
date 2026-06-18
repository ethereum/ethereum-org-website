---
title: "The Graph: Oprava dotazování na data ve Web3"
description: Blockchain je jako databáze, ale bez SQL. Všechna data tam jsou, ale není k nim přístup. Ukážu vám, jak to vyřešit pomocí The Graph a GraphQL.
author: Markus Waas
lang: cs
tags: ["solidity", "chytré kontrakty", "dotazování", "the graph", "react"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Tentokrát se podíváme blíže na The Graph, který se v posledním roce v podstatě stal součástí standardního stacku pro vývoj decentralizovaných aplikací (dapp). Pojďme se nejprve podívat, jak bychom to dělali tradičním způsobem...

## Bez The Graph... {#without-the-graph}

Pro ilustraci si tedy vezměme jednoduchý příklad. Všichni máme rádi hry, takže si představte jednoduchou hru, kde uživatelé uzavírají sázky:

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

Řekněme, že v naší decentralizované aplikaci (dapp) chceme zobrazit celkové sázky, celkový počet prohraných/vyhraných her a také to aktualizovat, kdykoli někdo hraje znovu. Postup by byl následující:

1. Načíst `totalGamesPlayerWon`.
2. Načíst `totalGamesPlayerLost`.
3. Přihlásit se k odběru událostí `BetPlaced`.

Můžeme naslouchat [události ve Web3](https://docs.web3js.org/api/web3/class/Contract#events), jak je znázorněno vpravo, ale vyžaduje to ošetření poměrně velkého množství případů.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // událost vyvolána
})
.on('changed', function(event) {
    // událost byla znovu odstraněna
})
.on('error', function(error, receipt) {
    // transakce zamítnuta
});
```

Pro náš jednoduchý příklad je to stále ještě docela v pořádku. Ale řekněme, že nyní chceme zobrazit částky prohraných/vyhraných sázek pouze pro aktuálního hráče. Máme smůlu, raději byste měli nasadit nový kontrakt, který tyto hodnoty ukládá, a načítat je z něj. A teď si představte mnohem složitější chytrý kontrakt a dapp, věci se mohou rychle zkomplikovat.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

Sami vidíte, že to není optimální:

- Nefunguje pro již nasazené kontrakty.
- Dodatečné náklady na gas za ukládání těchto hodnot.
- Vyžaduje další volání pro načtení dat z uzlu Etherea.

![Thats not good enough](./not-good-enough.jpg)

Nyní se podívejme na lepší řešení.

## Dovolte mi představit vám GraphQL {#let-me-introduce-to-you-graphql}

Nejprve si promluvme o GraphQL, které původně navrhl a implementoval Facebook. Možná znáte tradiční model REST API. Nyní si místo toho představte, že byste mohli napsat dotaz přesně na ta data, která chcete:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

Tyto dva obrázky v podstatě vystihují podstatu GraphQL. Pomocí dotazu vpravo můžeme přesně definovat, jaká data chceme, takže získáme vše v jednom požadavku a nic víc než to, co přesně potřebujeme. Server GraphQL se stará o načtení všech požadovaných dat, takže je pro frontendového konzumenta neuvěřitelně snadné jej používat. Pokud vás to zajímá, [zde je pěkné vysvětlení](https://www.apollographql.com/blog/graphql-explained) toho, jak přesně server zpracovává dotaz.

S těmito znalostmi se konečně vrhněme do prostoru blockchainu a The Graph.

## Co je The Graph? {#what-is-the-graph}

Blockchain je decentralizovaná databáze, ale na rozdíl od toho, co je obvyklé, pro tuto databázi nemáme dotazovací jazyk. Řešení pro získávání dat jsou bolestivá nebo zcela nemožná. The Graph je decentralizovaný protokol pro indexování a dotazování na data z blockchainu. A jak jste už asi uhodli, jako dotazovací jazyk používá GraphQL.

![The Graph](./thegraph.png)

Příklady jsou vždy nejlepší pro pochopení čehokoli, takže použijme The Graph pro náš příklad s GameContract.

## Jak vytvořit podgraf {#how-to-create-a-subgraph}

Definice toho, jak indexovat data, se nazývá podgraf. Vyžaduje tři komponenty:

1. Manifest (`subgraph.yaml`)
2. Schéma (`schema.graphql`)
3. Mapování (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Manifest je náš konfigurační soubor a definuje:

- které chytré kontrakty se mají indexovat (adresa, síť, ABI...)
- kterým událostem se má naslouchat
- další věci k naslouchání, jako jsou volání funkcí nebo bloky
- volané mapovací funkce (viz `mapping.ts` níže)

Zde můžete definovat více kontraktů a handlerů. Typické nastavení by mělo složku podgrafu uvnitř projektu Hardhat s vlastním repozitářem. Pak můžete snadno odkazovat na ABI.

Z důvodu pohodlí možná budete chtít použít také šablonovací nástroj, jako je mustache. Pak vytvoříte `subgraph.template.yaml` a vložíte adresy na základě nejnovějších nasazení. Pro pokročilejší příklad nastavení se podívejte například na [repozitář podgrafu Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

A celou dokumentaci si můžete prohlédnout [zde](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

Schéma je definice dat GraphQL. Umožní vám definovat, které entity existují a jaké jsou jejich typy. Podporované typy z The Graph jsou

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Entity můžete také použít jako typ k definování vztahů. V našem příkladu definujeme vztah 1:N (jeden k mnoha) od hráče k sázkám. Znak ! znamená, že hodnota nesmí být prázdná. Celou dokumentaci si můžete prohlédnout [zde](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Mapování (`mapping.ts`) {#mapping}

Soubor mapování v The Graph definuje naše funkce, které transformují příchozí události na entity. Je napsán v AssemblyScriptu, což je podmnožina TypeScriptu. To znamená, že jej lze zkompilovat do WASM (WebAssembly) pro efektivnější a přenositelnější provádění mapování.

Budete muset definovat každou funkci pojmenovanou v souboru `subgraph.yaml`, takže v našem případě potřebujeme pouze jednu: `handleNewBet`. Nejprve se pokusíme načíst entitu Player z adresy odesílatele jako id. Pokud neexistuje, vytvoříme novou entitu a naplníme ji počátečními hodnotami.

Poté vytvoříme novou entitu Bet. Její id bude `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`, což zajistí vždy jedinečnou hodnotu. Použití pouze hashe nestačí, protože někdo může volat funkci placeBet několikrát v jedné transakci prostřednictvím chytrého kontraktu.

Nakonec můžeme aktualizovat entitu Player všemi daty. Do polí nelze přidávat prvky přímo (push), ale musí se aktualizovat tak, jak je ukázáno zde. K odkazování na sázku používáme id. A na konci je vyžadováno `.save()` pro uložení entity.

Celou dokumentaci si můžete prohlédnout zde: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Do souboru mapování můžete také přidat výstup protokolování (logging), viz [zde](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // vytvořit, pokud ještě neexistuje
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

  // aktualizovat pole takto
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Použití ve frontendu {#using-it-in-the-frontend}

Pomocí něčeho jako Apollo Boost můžete The Graph snadno integrovat do své decentralizované aplikace (dapp) v Reactu (nebo Apollo-Vue). Zejména při použití React hooks a Apolla je načítání dat tak jednoduché jako napsání jediného dotazu GraphQL ve vaší komponentě. Typické nastavení může vypadat takto:

```javascript
// Zobrazit všechny podgrafy: https://thegraph.com/explorer/
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

A nyní můžeme napsat například takovýto dotaz. Ten nám načte

- kolikrát aktuální uživatel vyhrál
- kolikrát aktuální uživatel prohrál
- seznam časových razítek se všemi jeho předchozími sázkami

Vše v jednom jediném požadavku na server GraphQL.

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

Chybí nám ale poslední kousek skládačky, a tím je server. Můžete jej buď provozovat sami, nebo využít hostovanou službu.

## Server The Graph {#the-graph-server}

### Graph Explorer: Hostovaná služba {#graph-explorer-the-hosted-service}

Nejjednodušší způsob je použít hostovanou službu. Pro nasazení podgrafu postupujte podle pokynů [zde](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/). Pro mnoho projektů můžete ve skutečnosti najít existující podgrafy v [exploreru](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Provozování vlastního uzlu {#running-your-own-node}

Případně můžete provozovat svůj vlastní uzel. Dokumentace je [zde](https://github.com/graphprotocol/graph-node#quick-start). Jedním z důvodů, proč to udělat, může být použití sítě, která není podporována hostovanou službou. Aktuálně podporované sítě [najdete zde](https://thegraph.com/docs/en/developing/supported-networks/).

## Decentralizovaná budoucnost {#the-decentralized-future}

GraphQL podporuje také streamy pro nově příchozí události. Ty jsou na The Graph podporovány prostřednictvím [Substreams](https://thegraph.com/docs/en/substreams/), které jsou v současné době v otevřené beta verzi.

V roce [2021](https://thegraph.com/blog/mainnet-migration/) zahájil The Graph přechod na decentralizovanou indexovací síť. Více o architektuře této decentralizované indexovací sítě si můžete přečíst [zde](https://thegraph.com/docs/en/network/explorer/).

Dva klíčové aspekty jsou:

1. Uživatelé platí indexerům za dotazy.
2. Indexeři stakují tokeny Graph (GRT).