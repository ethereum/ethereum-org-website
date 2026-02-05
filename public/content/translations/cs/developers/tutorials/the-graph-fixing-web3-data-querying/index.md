---
title: "The Graph: Oprava dotazování dat ve Web3"
description: Blockchain je jako databáze, ale bez SQL. Všechna data tam jsou, ale neexistuje způsob, jak se k nim dostat. Ukážu vám, jak to opravit pomocí The Graph a GraphQL.
author: Markus Waas
lang: cs
tags:
  [
    "solidity",
    "smart kontrakt účty",
    "dotazování",
    "the graph",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Tentokrát se podíváme blíže na The Graph, který se v podstatě stal součástí standardní sady nástrojů pro vývoj dapps v posledním roce. Nejprve se podívejme, jak bychom to dělali tradičním způsobem...

## Bez The Graph... {#without-the-graph}

Pro názornost si tedy uveďme jednoduchý příklad. Všichni máme rádi hry, takže si představte jednoduchou hru, ve které uživatelé sázejí:

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

Řekněme, že v naší dapp chceme zobrazit celkový počet sázek, celkový počet prohraných/vyhraných her a také jej aktualizovat, kdykoli někdo hraje znovu. Přístup by byl následující:

1. Načíst `totalGamesPlayerWon`.
2. Načíst `totalGamesPlayerLost`.
3. Přihlásit se k odběru událostí `BetPlaced`.

Můžeme naslouchat [události ve Web3](https://docs.web3js.org/api/web3/class/Contract#events), jak je znázorněno vpravo, ale vyžaduje to řešení několika případů.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // událost spuštěna
})
.on('changed', function(event) {
    // událost byla znovu odstraněna
})
.on('error', function(error, receipt) {
    // tx zamítnuta
});
```

Pro náš jednoduchý příklad je to stále jakž takž v pořádku. Ale řekněme, že nyní chceme zobrazit výši prohraných/vyhraných sázek pouze pro aktuálního hráče. No, máme smůlu, raději nasaďte nový kontrakt, který tyto hodnoty uloží a načte. A teď si představte mnohem složitější chytrý kontrakt a dapp, věci se mohou rychle zkomplikovat.

![Jen tak se prostě nedotazuje](./one-does-not-simply-query.jpg)

Vidíte, že to není optimální:

- Nefunguje pro již nasazené kontrakty.
- Dodatečné náklady na palivo pro uložení těchto hodnot.
- Vyžaduje další volání k načtení dat pro uzel Etherea.

![To není dost dobré](./not-good-enough.jpg)

Nyní se podívejme na lepší řešení.

## Dovolte mi, abych vám představil GraphQL {#let-me-introduce-to-you-graphql}

Nejprve si povíme něco o GraphQL, původně navrženém a implementovaném společností Facebook. Možná jste obeznámeni s tradičním modelem REST API. Nyní si představte, že byste místo toho mohli napsat dotaz na přesně ta data, která jste chtěli:

![GraphQL API vs. REST API](./graphql.jpg)

![](./graphql-query.gif)

Tyto dva obrázky v podstatě vystihují podstatu GraphQL. S dotazem vpravo můžeme definovat přesně, jaká data chceme, takže získáme vše v jednom požadavku a nic víc, než přesně to, co potřebujeme. GraphQL server se stará o načítání všech požadovaných dat, takže je pro spotřebitelskou stranu frontendu neuvěřitelně snadno použitelný. [Zde je pěkné vysvětlení](https://www.apollographql.com/blog/graphql-explained), jak přesně server zpracovává dotaz, pokud vás to zajímá.

S těmito znalostmi se konečně vrhněme do světa blockchainu a The Graph.

## Co je The Graph? {#what-is-the-graph}

Blockchain je decentralizovaná databáze, ale na rozdíl od toho, co je obvyklé, pro tuto databázi nemáme dotazovací jazyk. Řešení pro získávání dat jsou bolestivá nebo zcela nemožná. The Graph je decentralizovaný protokol pro indexování a dotazování dat na blockchainu. A možná jste to uhodli, jako dotazovací jazyk používá GraphQL.

![The Graph](./thegraph.png)

Příklady jsou vždy nejlepší pro pochopení, takže použijme The Graph pro náš příklad GameContract.

## Jak vytvořit Subgraph {#how-to-create-a-subgraph}

Definice způsobu indexování dat se nazývá subgraph. Vyžaduje tři komponenty:

1. Manifest (`subgraph.yaml`)
2. Schéma (`schema.graphql`)
3. Mapování (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Manifest je náš konfigurační soubor a definuje:

- které chytré kontrakty indexovat (adresa, síť, ABI...)
- kterým událostem naslouchat
- další věci, kterým naslouchat, jako jsou volání funkcí nebo bloky
- volané mapovací funkce (viz `mapping.ts` níže)

Zde můžete definovat více kontraktů a handlerů. Typické nastavení by mělo složku subgraph uvnitř projektu Hardhat s vlastním repozitářem. Potom můžete snadno odkazovat na ABI.

Z důvodu pohodlí můžete také chtít použít nástroj pro šablony, jako je mustache. Potom vytvoříte `subgraph.template.yaml` a vložíte adresy na základě nejnovějších nasazení. Pro pokročilejší příklad nastavení se podívejte například na [repozitář subgraphu Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

A kompletní dokumentaci si můžete prohlédnout [zde](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```yaml
specVersion: 0.0.1
description: Sázení na Ethereu
repository: - odkaz na GitHub -
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

- Bajty
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Můžete také použít entity jako typ k definování vztahů. V našem příkladu definujeme vztah 1 ku mnoha od hráče k sázkám. Znak ! znamená, že hodnota nemůže být prázdná. Kompletní dokumentaci si můžete prohlédnout [zde](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

Mapovací soubor v The Graph definuje naše funkce, které transformují příchozí události na entity. Je napsán v AssemblyScript, což je podmnožina Typescriptu. To znamená, že jej lze zkompilovat do WASM (WebAssembly) pro efektivnější a přenositelnější provádění mapování.

Budete muset definovat každou funkci pojmenovanou v souboru `subgraph.yaml`, takže v našem případě potřebujeme pouze jednu: `handleNewBet`. Nejprve se pokusíme načíst entitu Player z adresy odesílatele jako id. Pokud neexistuje, vytvoříme novou entitu a naplníme ji počátečními hodnotami.

Potom vytvoříme novou entitu Bet. ID pro ni bude `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`, což zajišťuje vždy jedinečnou hodnotu. Použití pouze haše nestačí, protože by někdo mohl volat funkci placeBet několikrát v jedné transakci prostřednictvím chytrého kontraktu.

Nakonec můžeme aktualizovat entitu Player se všemi daty. Pole nelze přímo doplňovat (push), ale je třeba je aktualizovat, jak je zde ukázáno. Používáme id k odkazování na sázku. A `.save()` je na konci vyžadováno k uložení entity.

Kompletní dokumentaci si můžete prohlédnout zde: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Můžete také přidat výstup protokolování do mapovacího souboru, viz [zde](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

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

  // aktualizovat pole tímto způsobem
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Použití ve frontendu {#using-it-in-the-frontend}

Pomocí něčeho jako Apollo Boost můžete snadno integrovat The Graph do své React dapp (nebo Apollo-Vue). Zejména při použití React hooks a Apollo je načítání dat tak jednoduché jako napsání jediného GraphQL dotazu ve vaší komponentě. Typické nastavení může vypadat takto:

```javascript
// Zobrazit všechny subgraphy: https://thegraph.com/explorer/
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

A nyní můžeme napsat například takovýto dotaz. Tímto se nám načte

- kolikrát aktuální uživatel vyhrál
- kolikrát aktuální uživatel prohrál
- seznam časových razítek se všemi jeho předchozími sázkami

Vše v jediném požadavku na server GraphQL.

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

![Kouzlo](./magic.jpg)

Ale chybí nám poslední dílek skládačky, a to je server. Můžete si ho buď spustit sami, nebo použít hostovanou službu.

## Server The Graph {#the-graph-server}

### Graph Explorer: Hostovaná služba {#graph-explorer-the-hosted-service}

Nejjednodušší způsob je použít hostovanou službu. Postupujte podle pokynů [zde](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) a nasaďte subgraph. Pro mnoho projektů můžete skutečně najít existující subgraphy v [průzkumníkovi](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Provozování vlastního uzlu {#running-your-own-node}

Alternativně si můžete spustit vlastní uzel. Dokumentace [zde](https://github.com/graphprotocol/graph-node#quick-start). Jedním z důvodů může být použití sítě, která není podporována hostovanou službou. Aktuálně podporované sítě [naleznete zde](https://thegraph.com/docs/en/developing/supported-networks/).

## Decentralizovaná budoucnost {#the-decentralized-future}

GraphQL podporuje také streamy pro nově příchozí události. Ty jsou na grafu podporovány prostřednictvím [Substreams](https://thegraph.com/docs/en/substreams/), které jsou v současné době v otevřené beta verzi.

V [roce 2021](https://thegraph.com/blog/mainnet-migration/) začal The Graph přecházet na decentralizovanou indexovací síť. Více o architektuře této decentralizované indexovací sítě si můžete přečíst [zde](https://thegraph.com/docs/en/network/explorer/).

Dva klíčové aspekty jsou:

1. Uživatelé platí indexerům za dotazy.
2. Indexeři stakují tokeny Graph (GRT).
