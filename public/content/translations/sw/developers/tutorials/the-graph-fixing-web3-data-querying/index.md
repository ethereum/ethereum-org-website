---
title: "The Graph: Kurekebisha uuliziaji wa data wa Web3"
description: Mnyororo wa vitalu ni kama hifadhidata lakini bila SQL. Data yote ipo, lakini hakuna njia ya kuifikia. Hebu nikuonyeshe jinsi ya kurekebisha hili kwa The Graph na GraphQL.
author: Markus Waas
lang: sw
tags: ["solidity", "mikataba mahiri", "kuulizia", "the graph", "react"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Wakati huu tutaangalia kwa undani The Graph ambayo kimsingi imekuwa sehemu ya mkusanyiko wa kawaida wa kutengeneza programu tumizi zilizogatuliwa (dapps) katika mwaka uliopita. Hebu kwanza tuone jinsi tungefanya mambo kwa njia ya kitamaduni...

## Bila The Graph... {#without-the-graph}

Kwa hivyo hebu tuende na mfano rahisi kwa madhumuni ya kielelezo. Sote tunapenda michezo, kwa hivyo fikiria mchezo rahisi ambapo watumiaji wanaweka dau:

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

Sasa tuseme katika programu tumizi iliyogatuliwa (dapp) yetu, tunataka kuonyesha jumla ya dau, jumla ya michezo iliyopotezwa/iliyoshindwa na pia kuisasisha kila wakati mtu anapocheza tena. Njia itakuwa:

1. Leta `totalGamesPlayerWon`.
2. Leta `totalGamesPlayerLost`.
3. Jisajili kwenye matukio ya `BetPlaced`.

Tunaweza kusikiliza [tukio katika Web3](https://docs.web3js.org/api/web3/class/Contract#events) kama inavyoonyeshwa upande wa kulia, lakini inahitaji kushughulikia matukio machache.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // tukio limeanzishwa
})
.on('changed', function(event) {
    // tukio liliondolewa tena
})
.on('error', function(error, receipt) {
    // muamala umekataliwa
});
```

Sasa hii bado ni sawa kwa mfano wetu rahisi. Lakini tuseme sasa tunataka kuonyesha kiasi cha dau zilizopotezwa/zilizoshindwa kwa mchezaji wa sasa pekee. Kweli hatuna bahati, ni afadhali usambaze mkataba mpya unaohifadhi thamani hizo na kuzileta. Na sasa fikiria mkataba mahiri na programu tumizi iliyogatuliwa (dapp) ngumu zaidi, mambo yanaweza kuwa magumu haraka.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

Unaweza kuona jinsi hii sio bora:

- Haifanyi kazi kwa mikataba ambayo tayari imesambazwa.
- Gharama za ziada za gesi kwa kuhifadhi thamani hizo.
- Inahitaji wito mwingine ili kuleta data kwa nodi ya Ethereum.

![Thats not good enough](./not-good-enough.jpg)

Sasa hebu tuangalie suluhisho bora.

## Hebu nikutambulishe kwa GraphQL {#let-me-introduce-to-you-graphql}

Kwanza hebu tuzungumze kuhusu GraphQL, iliyoundwa na kutekelezwa awali na Facebook. Unaweza kuwa unajua muundo wa kitamaduni wa REST API. Sasa fikiria badala yake ungeweza kuandika swali kwa data haswa uliyotaka:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

Picha hizo mbili zinachukua kiini cha GraphQL. Kwa swali lililo upande wa kulia tunaweza kufafanua haswa data tunayotaka, kwa hivyo hapo tunapata kila kitu katika ombi moja na hakuna zaidi ya kile tunachohitaji. Seva ya GraphQL inashughulikia uletaji wa data yote inayohitajika, kwa hivyo ni rahisi sana kwa upande wa mtumiaji wa mbele kuitumia. [Haya ni maelezo mazuri](https://www.apollographql.com/blog/graphql-explained) ya jinsi haswa seva inashughulikia swali ikiwa una nia.

Sasa kwa ujuzi huo, hebu hatimaye tuingie kwenye nafasi ya mnyororo wa vitalu na The Graph.

## The Graph ni nini? {#what-is-the-graph}

Mnyororo wa vitalu ni hifadhidata iliyogatuliwa, lakini tofauti na kile ambacho huwa kawaida, hatuna lugha ya kuulizia kwa hifadhidata hii. Suluhu za kurejesha data ni ngumu au haziwezekani kabisa. The Graph ni itifaki iliyogatuliwa ya kufaharisi na kuulizia data ya mnyororo wa vitalu. Na unaweza kuwa umekisia, inatumia GraphQL kama lugha ya kuulizia.

![The Graph](./thegraph.png)

Mifano daima ni bora kuelewa kitu, kwa hivyo hebu tutumie The Graph kwa mfano wetu wa GameContract.

## Jinsi ya kuunda Grafu ndogo {#how-to-create-a-subgraph}

Ufafanuzi wa jinsi ya kufaharisi data unaitwa grafu ndogo. Inahitaji vipengele vitatu:

1. Dhihirisho (`subgraph.yaml`)
2. Skema (`schema.graphql`)
3. Uchoraji wa ramani (`mapping.ts`)

### Dhihirisho (`subgraph.yaml`) {#manifest}

Dhihirisho ni faili yetu ya usanidi na inafafanua:

- ni mikataba mahiri ipi ya kufaharisi (anwani, mtandao, ABI...)
- ni matukio yapi ya kusikiliza
- mambo mengine ya kusikiliza kama vile wito wa utendakazi au vitalu
- vitendaji vya uchoraji wa ramani vinavyoitwa (tazama `mapping.ts` hapa chini)

Unaweza kufafanua mikataba na vidhibiti vingi hapa. Usanidi wa kawaida ungekuwa na folda ya grafu ndogo ndani ya mradi wa Hardhat na hazina yake yenyewe. Kisha unaweza kurejelea ABI kwa urahisi.

Kwa sababu za urahisi unaweza pia kutaka kutumia zana ya kiolezo kama mustache. Kisha unaunda `subgraph.template.yaml` na kuingiza anwani kulingana na usambazaji wa hivi punde. Kwa usanidi wa mfano wa hali ya juu zaidi, tazama kwa mfano [hazina ya grafu ndogo ya Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Na nyaraka kamili zinaweza kuonekana [hapa](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Skema (`schema.graphql`) {#schema}

Skema ni ufafanuzi wa data wa GraphQL. Itakuruhusu kufafanua ni huluki zipi zilizopo na aina zake. Aina zinazotumika kutoka The Graph ni

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Unaweza pia kutumia huluki kama aina ili kufafanua mahusiano. Katika mfano wetu tunafafanua uhusiano wa 1-kwa-wengi kutoka kwa mchezaji hadi dau. Alama ya ! inamaanisha thamani haiwezi kuwa tupu. Nyaraka kamili zinaweza kuonekana [hapa](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Uchoraji wa ramani (`mapping.ts`) {#mapping}

Faili ya uchoraji wa ramani katika The Graph inafafanua vitendaji vyetu vinavyobadilisha matukio yanayoingia kuwa huluki. Imeandikwa katika AssemblyScript, kitengo kidogo cha TypeScript. Hii inamaanisha inaweza kukusanywa kuwa WASM (WebAssembly) kwa utekelezaji bora zaidi na unaobebeka wa uchoraji wa ramani.

Utahitaji kufafanua kila kitendaji kilichotajwa katika faili ya `subgraph.yaml`, kwa hivyo katika kesi yetu tunahitaji moja tu: `handleNewBet`. Kwanza tunajaribu kupakia huluki ya Mchezaji kutoka kwa anwani ya mtumaji kama kitambulisho (id). Ikiwa haipo, tunaunda huluki mpya na kuijaza na thamani za kuanzia.

Kisha tunaunda huluki mpya ya Dau. Kitambulisho (id) cha hii kitakuwa `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` kuhakikisha thamani ya kipekee kila wakati. Kutumia heshi pekee haitoshi kwani mtu anaweza kuwa anaita kitendaji cha placeBet mara kadhaa katika muamala mmoja kupitia mkataba mahiri.

Mwishowe tunaweza kusasisha huluki ya Mchezaji na data yote. Mipangilio (Arrays) haiwezi kusukumwa moja kwa moja, lakini inahitaji kusasishwa kama inavyoonyeshwa hapa. Tunatumia kitambulisho (id) kurejelea dau. Na `.save()` inahitajika mwishoni ili kuhifadhi huluki.

Nyaraka kamili zinaweza kuonekana hapa: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Unaweza pia kuongeza pato la ukataji miti (logging) kwenye faili ya uchoraji wa ramani, tazama [hapa](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // unda kama bado haipo
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

  // sasisha safu kama hivi
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Kuitumia katika Upande wa Mbele (Frontend) {#using-it-in-the-frontend}

Kwa kutumia kitu kama Apollo Boost, unaweza kuunganisha The Graph kwa urahisi katika programu tumizi iliyogatuliwa (dapp) yako ya React (au Apollo-Vue). Hasa unapotumia ndoano za React (React hooks) na Apollo, kuleta data ni rahisi kama kuandika swali moja la GraphQL katika kipengele chako. Usanidi wa kawaida unaweza kuonekana kama hii:

```javascript
// Tazama grafu ndogo zote: https://thegraph.com/explorer/
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

Na sasa tunaweza kuandika kwa mfano swali kama hili. Hili litatuletea

- ni mara ngapi mtumiaji wa sasa ameshinda
- ni mara ngapi mtumiaji wa sasa amepoteza
- orodha ya mihuri ya muda na dau zake zote za awali

Yote katika ombi moja kwa seva ya GraphQL.

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

Lakini tunakosa kipande kimoja cha mwisho cha fumbo na hiyo ni seva. Unaweza kuiendesha mwenyewe au kutumia huduma iliyopangishwa.

## Seva ya The Graph {#the-graph-server}

### Kichunguzi cha Graph: Huduma iliyopangishwa {#graph-explorer-the-hosted-service}

Njia rahisi zaidi ni kutumia huduma iliyopangishwa. Fuata maagizo [hapa](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) ili kusambaza grafu ndogo. Kwa miradi mingi unaweza kupata grafu ndogo zilizopo katika [kichunguzi](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Kuendesha nodi yako mwenyewe {#running-your-own-node}

Vinginevyo unaweza kuendesha nodi yako mwenyewe. Nyaraka [hapa](https://github.com/graphprotocol/graph-node#quick-start). Sababu moja ya kufanya hivi inaweza kuwa kutumia mtandao ambao hautumiki na huduma iliyopangishwa. Mitandao inayotumika kwa sasa [inaweza kupatikana hapa](https://thegraph.com/docs/en/developing/supported-networks/).

## Mustakabali uliogatuliwa {#the-decentralized-future}

GraphQL inasaidia mitiririko pia kwa matukio mapya yanayoingia. Hizi zinatumika kwenye grafu kupitia [Substreams](https://thegraph.com/docs/en/substreams/) ambazo kwa sasa ziko katika beta wazi.

Mnamo [2021](https://thegraph.com/blog/mainnet-migration/) The Graph ilianza mpito wake kuelekea mtandao wa kufaharisi uliogatuliwa. Unaweza kusoma zaidi kuhusu usanifu wa mtandao huu wa kufaharisi uliogatuliwa [hapa](https://thegraph.com/docs/en/network/explorer/).

Vipengele viwili muhimu ni:

1. Watumiaji huwalipa wafaharisi kwa maswali.
2. Wafaharisi huweka dhamana ya Tokeni za Graph (GRT).