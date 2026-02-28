---
title: "The Graph: Kurekebisha uulizaji wa data wa Web3"
description: Mnyororo wa bloku ni kama hifadhidata lakini bila SQL. Data yote ipo, lakini hakuna njia ya kuipata. Acha nikuonyeshe jinsi ya kurekebisha hili kwa kutumia The Graph na GraphQL.
author: Markus Waas
lang: sw
tags:
  [
    "uimara",
    "mikataba erevu",
    "kuuliza",
    "the graph",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Wakati huu tutaangalia kwa undani zaidi The Graph ambayo kimsingi imekuwa sehemu ya rundo la kawaida la kuendeleza mfumo mtawanyo wa kimamlaka katika mwaka uliopita. Hebu kwanza tuone jinsi tungefanya mambo kwa njia ya jadi...

## Bila The Graph... {#without-the-graph}

Kwa hivyo, hebu tuchukue mfano rahisi kwa madhumuni ya kielelezo. Sote tunapenda michezo, kwa hivyo fikiria mchezo rahisi ambapo watumiaji wanaweka dau:

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
            require(success, "Uhamisho umeshindikana");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Sasa tuseme katika mfumo wetu uliotawanywa, tunataka kuonyesha jumla ya dau, jumla ya michezo iliyopotea/kushinda na pia kuisasisha kila wakati mtu anapocheza tena. Njia itakuwa:

1. Leta `totalGamesPlayerWon`.
2. Leta `totalGamesPlayerLost`.
3. Jisajili kwa matukio ya `BetPlaced`.

Tunaweza kusikiliza [tukio katika Web3](https://docs.web3js.org/api/web3/class/Contract#events) kama inavyoonyeshwa upande wa kulia, lakini inahitaji kushughulikia visa kadhaa.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // tukio limetokea
})
.on('changed', function(event) {
    // tukio limeondolewa tena
})
.on('error', function(error, receipt) {
    // tx imekataliwa
});
```

Sasa hii bado ni sawa kwa mfano wetu rahisi. Lakini tuseme sasa tunataka kuonyesha kiasi cha dau zilizopotea/kushinda kwa mchezaji wa sasa pekee. Basi hatuna bahati, ni bora upeleke mkataba mpya unaohifadhi thamani hizo na kuzileta. Na sasa fikiria mkataba-erevu na mfumo uliotawanywa ulio mgumu zaidi, mambo yanaweza kuwa magumu haraka.

![Mtu Haulizi Hivi Hivi](./one-does-not-simply-query.jpg)

Unaweza kuona jinsi hii si bora zaidi:

- Haifanyi kazi kwa mikataba iliyokwisha pelekwa.
- Gharama za ziada za gesi kwa kuhifadhi thamani hizo.
- Inahitaji wito mwingine ili kuleta data kwa nodi ya Ethereum.

![Hiyo haitoshi](./not-good-enough.jpg)

Sasa hebu tuangalie suluhisho bora zaidi.

## Acha nikutambulishe kwa GraphQL {#let-me-introduce-to-you-graphql}

Kwanza hebu tuzungumzie GraphQL, iliyobuniwa na kutekelezwa awali na Facebook. Huenda unaifahamu muundo wa jadi wa REST API. Sasa fikiria badala yake unaweza kuandika hoja ya kuulizia data unayoitaka hasa:

![GraphQL API dhidi ya REST API](./graphql.jpg)

![](./graphql-query.gif)

Picha hizi mbili zinaonyesha kiini cha GraphQL. Kwa hoja ya kuulizia upande wa kulia tunaweza kufafanua hasa data tunayoitaka, kwa hivyo hapo tunapata kila kitu katika ombi moja na si zaidi ya kile tunachohitaji hasa. Seva ya GraphQL hushughulikia upataji wa data yote inayohitajika, kwa hivyo ni rahisi sana kwa upande wa mtumiaji wa frontend kutumia. [Haya ni maelezo mazuri](https://www.apollographql.com/blog/graphql-explained) ya jinsi seva inavyoshughulikia hoja ya kuulizia ikiwa una nia.

Sasa tukiwa na maarifa hayo, hatimaye tuingie katika ulimwengu wa mnyororo wa bloku na The Graph.

## The Graph ni nini? {#what-is-the-graph}

Mnyororo wa bloku ni hifadhidata iliyogatuliwa, lakini kinyume na ilivyo kawaida, hatuna lugha ya kuulizia kwa hifadhidata hii. Mbinu za kupata data ni ngumu au haziwezekani kabisa. The Graph ni itifaki iliyogatuliwa ya kuorodhesha na kuuliza data ya mnyororo wa bloku. Na huenda umekisia, inatumia GraphQL kama lugha ya kuulizia.

![The Graph](./thegraph.png)

Mifano daima ndiyo njia bora ya kuelewa kitu, kwa hivyo hebu tutumie The Graph kwa mfano wetu wa GameContract.

## Jinsi ya kuunda Subgraph {#how-to-create-a-subgraph}

Ufafanuzi wa jinsi ya kuorodhesha data unaitwa subgraph. Inahitaji vipengele vitatu:

1. Manifest (`subgraph.yaml`)
2. Schema (`schema.graphql`)
3. Mapping (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Manifest ni faili letu la usanidi na linafafanua:

- ni mikataba-erevu ipi ya kuorodhesha (anwani, mtandao, ABI...)
- ni matukio yapi ya kusikiliza
- mambo mengine ya kusikiliza kama miito ya kukokotoa au bloku
- kazi za ramani zinazoitwa (tazama `mapping.ts` hapa chini)

Unaweza kufafanua mikataba na vidhibiti vingi hapa. Mpangilio wa kawaida ungekuwa na folda ya subgraph ndani ya mradi wa Hardhat na hifadhi yake yenyewe. Kisha unaweza kurejelea ABI kwa urahisi.

Kwa sababu za urahisi unaweza pia kutaka kutumia zana ya violezo kama mustache. Kisha unaunda `subgraph.template.yaml` na kuingiza anwani kulingana na upekuzi wa hivi karibuni. Kwa mfano wa usanidi wa hali ya juu zaidi, angalia kwa mfano [repo ya Aave subgraph](https://github.com/aave/aave-protocol/tree/master/thegraph).

Na nyaraka kamili zinaweza kuonekana [hapa](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```yaml
specVersion: 0.0.1
description: Kuweka Dau kwenye Ethereum
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

Schema ni ufafanuzi wa data wa GraphQL. Itakuruhusu kufafanua ni vyombo vipi vipo na aina zake. Aina zinazotumika kutoka kwa The Graph ni

- Baiti
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Unaweza pia kutumia vyombo kama aina kufafanua mahusiano. Katika mfano wetu tunafafanua uhusiano wa 1-kwa-wengi kutoka kwa mchezaji kwenda kwa dau. ! inamaanisha thamani haiwezi kuwa tupu. Nyaraka kamili zinaweza kuonekana [hapa](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

Faili la ramani katika The Graph linafafanua kazi zetu zinazobadilisha matukio yanayoingia kuwa vyombo. Imeandikwa katika AssemblyScript, ambayo ni sehemu ndogo ya Typescript. Hii inamaanisha inaweza kuandaliwa kuwa WASM (WebAssembly) kwa utekelezaji bora zaidi na unaobebeka wa ramani.

Utahihaji kufafanua kila kazi iliyotajwa kwenye faili ya `subgraph.yaml`, kwa hivyo kwa upande wetu tunahitaji moja tu: `handleNewBet`. Kwanza tunajaribu kupakia chombo cha Mchezaji kutoka kwa anwani ya mtumaji kama kitambulisho. Ikiwa haipo, tunaunda chombo kipya na kukijaza na thamani za kuanzia.

Kisha tunaunda chombo kipya cha Dau. Kitambulisho cha hili kitakuwa `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` kuhakikisha daima kuna thamani ya kipekee. Kutumia hashi pekee haitoshi kwani mtu anaweza kuwa anaita kazi ya placeBet mara kadhaa katika muamala mmoja kupitia mkataba-erevu.

Mwisho, tunaweza kusasisha chombo cha Mchezaji na data yote. Safu haziwezi kusukumwa moja kwa moja, lakini zinahitaji kusasishwa kama inavyoonyeshwa hapa. Tunatumia kitambulisho kurejelea dau. Na `.save()` inahitajika mwishoni kuhifadhi chombo.

Nyaraka kamili zinaweza kuonekana hapa: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Unaweza pia kuongeza matokeo ya kumbukumbu kwenye faili la ramani, tazama [hapa](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // unda ikiwa bado haipo
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

## Kuitumia katika Frontend {#using-it-in-the-frontend}

Kwa kutumia kitu kama Apollo Boost, unaweza kuunganisha kwa urahisi The Graph katika mfumo wako uliotawanywa wa React (au Apollo-Vue). Hasa unapotumia React hooks na Apollo, kupata data ni rahisi kama kuandika hoja moja ya GraphQL katika kijenzi chako. Mpangilio wa kawaida unaweza kuonekana hivi:

```javascript
// Tazama subgraphs zote: https://thegraph.com/explorer/
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

Na sasa tunaweza kuandika kwa mfano hoja ya kuulizia kama hii. Hii itatuletea

- mtumiaji wa sasa ameshinda mara ngapi
- mtumiaji wa sasa amepoteza mara ngapi
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

![Uchawi](./magic.jpg)

Lakini tunakosa kipande kimoja cha mwisho cha fumbo na hiyo ni seva. Unaweza kuiendesha mwenyewe au kutumia huduma iliyohifadhiwa.

## Seva ya The Graph {#the-graph-server}

### Graph Explorer: Huduma iliyohifadhiwa {#graph-explorer-the-hosted-service}

Njia rahisi zaidi ni kutumia huduma iliyohifadhiwa. Fuata maagizo [hapa](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) ili kupeleka subgraph. Kwa miradi mingi unaweza kupata subgraphs zilizopo kwenye [explorer](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Kuendesha nodi yako mwenyewe {#running-your-own-node}

Vinginevyo unaweza kuendesha nodi yako mwenyewe. Nyaraka [hapa](https://github.com/graphprotocol/graph-node#quick-start). Sababu moja ya kufanya hivi inaweza kuwa ni kutumia mtandao ambao hautumiki na huduma iliyohifadhiwa. Mitandao inayotumika sasa hivi [inaweza kupatikana hapa](https://thegraph.com/docs/en/developing/supported-networks/).

## Mustakabali uliogatuliwa {#the-decentralized-future}

GraphQL inasaidia mitiririko pia kwa matukio mapya yanayoingia. Hizi zinatumika kwenye grafu kupitia [Substreams](https://thegraph.com/docs/en/substreams/) ambazo kwa sasa ziko katika beta ya wazi.

Mnamo [2021](https://thegraph.com/blog/mainnet-migration/) The Graph ilianza mabadiliko yake kuelekea mtandao wa uorodheshaji uliogatuliwa. Unaweza kusoma zaidi kuhusu usanifu wa mtandao huu wa uorodheshaji uliogatuliwa [hapa](https://thegraph.com/docs/en/network/explorer/).

Vipengele viwili muhimu ni:

1. Watumiaji huwalipa waorodheshaji kwa ajili ya hoja za kuulizia.
2. Waorodheshaji huweka dau Tokeni za Grafu (GRT).
