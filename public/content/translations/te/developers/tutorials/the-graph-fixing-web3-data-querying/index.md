---
title: "The Graph: Web3 డేటా క్వెరీయింగ్‌ను పరిష్కరించడం"
description: బ్లాక్‌చైన్ అనేది SQL లేని డేటాబేస్ లాంటిది. మొత్తం డేటా అక్కడే ఉంటుంది, కానీ దాన్ని యాక్సెస్ చేయడానికి మార్గం లేదు. The Graph మరియు GraphQLతో దీన్ని ఎలా పరిష్కరించాలో నేను మీకు చూపుతాను.
author: మార్కస్ వాస్
lang: te
tags: ["solidity", "స్మార్ట్ కాంట్రాక్ట్‌లు", "క్వెరీయింగ్", "the graph", "react"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

ఈసారి మనం The Graph గురించి మరింత వివరంగా చూద్దాం, ఇది గత సంవత్సరంలో వికేంద్రీకృత అప్లికేషన్ (dapp)లను అభివృద్ధి చేయడానికి ప్రామాణిక స్టాక్‌లో ముఖ్యమైన భాగంగా మారింది. ముందుగా మనం సాంప్రదాయ పద్ధతిలో పనులను ఎలా చేస్తామో చూద్దాం...

## The Graph లేకుండా... {#without-the-graph}

కాబట్టి ఉదాహరణ కోసం ఒక సాధారణ ఉదాహరణను తీసుకుందాం. మనందరికీ ఆటలు ఇష్టం, కాబట్టి వినియోగదారులు పందెం వేసే ఒక సాధారణ గేమ్‌ను ఊహించుకోండి:

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

ఇప్పుడు మన dappలో, మొత్తం పందాలను, ఓడిపోయిన/గెలిచిన మొత్తం ఆటలను ప్రదర్శించాలనుకుంటున్నాము మరియు ఎవరైనా మళ్లీ ఆడినప్పుడల్లా దాన్ని అప్‌డేట్ చేయాలనుకుంటున్నాము అనుకుందాం. దీనికి విధానం ఇలా ఉంటుంది:

1. `totalGamesPlayerWon`ని పొందండి.
2. `totalGamesPlayerLost`ని పొందండి.
3. `BetPlaced` ఈవెంట్‌లకు సబ్‌స్క్రైబ్ చేయండి.

కుడివైపు చూపిన విధంగా మనం [Web3లోని ఈవెంట్‌](https://docs.web3js.org/api/web3/class/Contract#events)ను వినవచ్చు, కానీ దీనికి చాలా కేసులను నిర్వహించాల్సి ఉంటుంది.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // ఈవెంట్ ఫైర్ చేయబడింది
})
.on('changed', function(event) {
    // ఈవెంట్ మళ్లీ తీసివేయబడింది
})
.on('error', function(error, receipt) {
    // లావాదేవీ తిరస్కరించబడింది
});
```

ఇప్పుడు మన సాధారణ ఉదాహరణకు ఇది కొంతవరకు బాగానే ఉంది. కానీ ఇప్పుడు మనం ప్రస్తుత ఆటగాడికి మాత్రమే ఓడిపోయిన/గెలిచిన పందాల మొత్తాలను ప్రదర్శించాలనుకుంటున్నాము అనుకుందాం. దురదృష్టవశాత్తూ అది సాధ్యం కాదు, ఆ విలువలను నిల్వ చేసే కొత్త కాంట్రాక్ట్‌ను డిప్లాయ్ చేసి, వాటిని పొందడం మంచిది. ఇప్పుడు మరింత సంక్లిష్టమైన స్మార్ట్ కాంట్రాక్ట్ మరియు dappని ఊహించుకోండి, పనులు త్వరగా గందరగోళంగా మారవచ్చు.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

ఇది ఎందుకు సరైనది కాదో మీరు చూడవచ్చు:

- ఇప్పటికే డిప్లాయ్ చేసిన కాంట్రాక్ట్‌లకు పని చేయదు.
- ఆ విలువలను నిల్వ చేయడానికి అదనపు గ్యాస్ ఖర్చులు అవుతాయి.
- ఎథీరియం నోడ్ కోసం డేటాను పొందడానికి మరొక కాల్ అవసరం.

![Thats not good enough](./not-good-enough.jpg)

ఇప్పుడు మెరుగైన పరిష్కారాన్ని చూద్దాం.

## నేను మీకు GraphQLను పరిచయం చేస్తాను {#let-me-introduce-to-you-graphql}

ముందుగా ఫేస్‌బుక్ ద్వారా రూపొందించబడి, అమలు చేయబడిన GraphQL గురించి మాట్లాడుకుందాం. మీకు సాంప్రదాయ REST API మోడల్ గురించి తెలిసి ఉండవచ్చు. ఇప్పుడు దానికి బదులుగా మీకు కావాల్సిన ఖచ్చితమైన డేటా కోసం మీరు ఒక క్వెరీని వ్రాయగలరని ఊహించుకోండి:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

ఈ రెండు చిత్రాలు GraphQL యొక్క సారాంశాన్ని చాలా వరకు సంగ్రహిస్తాయి. కుడివైపున ఉన్న క్వెరీతో మనకు ఖచ్చితంగా ఏ డేటా కావాలో నిర్వచించవచ్చు, కాబట్టి అక్కడ మనం ఒకే అభ్యర్థనలో ప్రతిదీ పొందుతాము మరియు మనకు అవసరమైన దానికంటే ఎక్కువ ఏమీ ఉండదు. అవసరమైన మొత్తం డేటాను పొందే పనిని GraphQL సర్వర్ నిర్వహిస్తుంది, కాబట్టి ఫ్రంటెండ్ వినియోగదారు వైపు ఉపయోగించడం చాలా సులభం. మీకు ఆసక్తి ఉంటే, సర్వర్ క్వెరీని ఖచ్చితంగా ఎలా నిర్వహిస్తుందో చెప్పడానికి [ఇది ఒక మంచి వివరణ](https://www.apollographql.com/blog/graphql-explained).

ఇప్పుడు ఆ జ్ఞానంతో, చివరగా బ్లాక్‌చైన్ స్పేస్ మరియు The Graphలోకి వెళ్దాం.

## The Graph అంటే ఏమిటి? {#what-is-the-graph}

బ్లాక్‌చైన్ అనేది ఒక వికేంద్రీకృత డేటాబేస్, కానీ సాధారణంగా జరిగే దానికి భిన్నంగా, ఈ డేటాబేస్ కోసం మనకు క్వెరీ లాంగ్వేజ్ లేదు. డేటాను తిరిగి పొందే పరిష్కారాలు కష్టంగా ఉంటాయి లేదా పూర్తిగా అసాధ్యం. The Graph అనేది బ్లాక్‌చైన్ డేటాను సూచిక చేయడానికి మరియు క్వెరీ చేయడానికి ఒక వికేంద్రీకృత ప్రోటోకాల్. మరియు మీరు ఊహించినట్లుగానే, ఇది GraphQLను క్వెరీ లాంగ్వేజ్‌గా ఉపయోగిస్తోంది.

![The Graph](./thegraph.png)

ఏదైనా అర్థం చేసుకోవడానికి ఉదాహరణలు ఎల్లప్పుడూ ఉత్తమమైనవి, కాబట్టి మన GameContract ఉదాహరణ కోసం The Graphను ఉపయోగిద్దాం.

## ఉపగ్రాఫ్‌ను ఎలా సృష్టించాలి {#how-to-create-a-subgraph}

డేటాను ఎలా సూచిక చేయాలో తెలిపే నిర్వచనాన్ని ఉపగ్రాఫ్ అంటారు. దీనికి మూడు భాగాలు అవసరం:

1. మానిఫెస్ట్ (`subgraph.yaml`)
2. స్కీమా (`schema.graphql`)
3. మ్యాపింగ్ (`mapping.ts`)

### మానిఫెస్ట్ (`subgraph.yaml`) {#manifest}

మానిఫెస్ట్ అనేది మన కాన్ఫిగరేషన్ ఫైల్ మరియు ఇది వీటిని నిర్వచిస్తుంది:

- ఏ స్మార్ట్ కాంట్రాక్ట్‌లను సూచిక చేయాలి (చిరునామా, నెట్‌వర్క్, ABI...)
- ఏ ఈవెంట్‌లను వినాలి
- ఫంక్షన్ కాల్స్ లేదా బ్లాక్‌ల వంటి వినాల్సిన ఇతర విషయాలు
- కాల్ చేయబడుతున్న మ్యాపింగ్ ఫంక్షన్‌లు (క్రింద ఉన్న `mapping.ts` చూడండి)

మీరు ఇక్కడ బహుళ కాంట్రాక్ట్‌లు మరియు హ్యాండ్లర్‌లను నిర్వచించవచ్చు. ఒక సాధారణ సెటప్‌లో Hardhat ప్రాజెక్ట్ లోపల దాని స్వంత రిపోజిటరీతో ఒక ఉపగ్రాఫ్ ఫోల్డర్ ఉంటుంది. అప్పుడు మీరు ABIని సులభంగా సూచించవచ్చు.

సౌలభ్యం కోసం మీరు mustache లాంటి టెంప్లేట్ టూల్‌ను కూడా ఉపయోగించాలనుకోవచ్చు. అప్పుడు మీరు `subgraph.template.yaml`ని సృష్టించి, తాజా డిప్లాయ్‌మెంట్‌ల ఆధారంగా చిరునామాలను చొప్పించవచ్చు. మరింత అధునాతన ఉదాహరణ సెటప్ కోసం, ఉదాహరణకు [Aave ఉపగ్రాఫ్ రిపో](https://github.com/aave/aave-protocol/tree/master/thegraph)ని చూడండి.

మరియు పూర్తి డాక్యుమెంటేషన్‌ను [ఇక్కడ](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) చూడవచ్చు.

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

### స్కీమా (`schema.graphql`) {#schema}

స్కీమా అనేది GraphQL డేటా నిర్వచనం. ఏ ఎంటిటీలు ఉన్నాయి మరియు వాటి రకాలను నిర్వచించడానికి ఇది మిమ్మల్ని అనుమతిస్తుంది. The Graph నుండి మద్దతు ఉన్న రకాలు

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

సంబంధాలను నిర్వచించడానికి మీరు ఎంటిటీలను రకంగా కూడా ఉపయోగించవచ్చు. మన ఉదాహరణలో మనం ప్లేయర్ నుండి పందాలకు 1-టు-మెనీ (1-to-many) సంబంధాన్ని నిర్వచిస్తాము. ! అంటే విలువ ఖాళీగా ఉండకూడదు అని అర్థం. పూర్తి డాక్యుమెంటేషన్‌ను [ఇక్కడ](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) చూడవచ్చు.

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

### మ్యాపింగ్ (`mapping.ts`) {#mapping}

The Graphలోని మ్యాపింగ్ ఫైల్ ఇన్‌కమింగ్ ఈవెంట్‌లను ఎంటిటీలుగా మార్చే మన ఫంక్షన్‌లను నిర్వచిస్తుంది. ఇది TypeScript యొక్క ఉపసమితి అయిన AssemblyScriptలో వ్రాయబడింది. అంటే మ్యాపింగ్ యొక్క మరింత సమర్థవంతమైన మరియు పోర్టబుల్ అమలు కోసం దీనిని WASM (WebAssembly)లోకి కంపైల్ చేయవచ్చు.

మీరు `subgraph.yaml` ఫైల్‌లో పేరున్న ప్రతి ఫంక్షన్‌ను నిర్వచించాల్సి ఉంటుంది, కాబట్టి మన విషయంలో మనకు ఒకటి మాత్రమే అవసరం: `handleNewBet`. మనం ముందుగా పంపినవారి చిరునామాను idగా ఉపయోగించి Player ఎంటిటీని లోడ్ చేయడానికి ప్రయత్నిస్తాము. అది లేకపోతే, మనం కొత్త ఎంటిటీని సృష్టించి, దాన్ని ప్రారంభ విలువలతో నింపుతాము.

తర్వాత మనం కొత్త Bet ఎంటిటీని సృష్టిస్తాము. దీనికి id `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` అవుతుంది, ఇది ఎల్లప్పుడూ ప్రత్యేకమైన విలువను నిర్ధారిస్తుంది. కేవలం హాష్‌ను ఉపయోగించడం సరిపోదు ఎందుకంటే ఎవరైనా స్మార్ట్ కాంట్రాక్ట్ ద్వారా ఒకే లావాదేవీలో placeBet ఫంక్షన్‌ను చాలాసార్లు కాల్ చేయవచ్చు.

చివరగా మనం మొత్తం డేటాతో Player ఎంటిటీని అప్‌డేట్ చేయవచ్చు. అర్రేలను నేరుగా పుష్ చేయలేము, కానీ ఇక్కడ చూపిన విధంగా అప్‌డేట్ చేయాలి. పందెంను సూచించడానికి మనం idని ఉపయోగిస్తాము. మరియు ఎంటిటీని నిల్వ చేయడానికి చివరలో `.save()` అవసరం.

పూర్తి డాక్యుమెంటేషన్‌ను ఇక్కడ చూడవచ్చు: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. మీరు మ్యాపింగ్ ఫైల్‌కు లాగింగ్ అవుట్‌పుట్‌ను కూడా జోడించవచ్చు, [ఇక్కడ](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) చూడండి.

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // ఇంకా లేకపోతే సృష్టించండి
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

  // అరేని ఈ విధంగా అప్‌డేట్ చేయండి
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## ఫ్రంటెండ్‌లో దీన్ని ఉపయోగించడం {#using-it-in-the-frontend}

Apollo Boost లాంటి దాన్ని ఉపయోగించి, మీరు మీ React dapp (లేదా Apollo-Vue)లో The Graphను సులభంగా ఇంటిగ్రేట్ చేయవచ్చు. ముఖ్యంగా React హుక్స్ మరియు Apolloని ఉపయోగిస్తున్నప్పుడు, డేటాను పొందడం అనేది మీ కాంపోనెంట్‌లో ఒకే GraphQL క్వెరీని వ్రాసినంత సులభం. ఒక సాధారణ సెటప్ ఇలా ఉండవచ్చు:

```javascript
// అన్ని ఉపగ్రాఫ్‌లను చూడండి: https://thegraph.com/explorer/
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

మరియు ఇప్పుడు మనం ఉదాహరణకు ఇలాంటి క్వెరీని వ్రాయవచ్చు. ఇది మనకు వీటిని తీసుకువస్తుంది

- ప్రస్తుత వినియోగదారు ఎన్నిసార్లు గెలిచారు
- ప్రస్తుత వినియోగదారు ఎన్నిసార్లు ఓడిపోయారు
- అతని మునుపటి పందాలన్నింటితో కూడిన టైమ్‌స్టాంప్‌ల జాబితా

అన్నీ GraphQL సర్వర్‌కు ఒకే అభ్యర్థనలో.

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

కానీ మనం పజిల్‌లోని చివరి భాగాన్ని కోల్పోతున్నాము మరియు అదే సర్వర్. మీరు దీన్ని మీరే రన్ చేయవచ్చు లేదా హోస్ట్ చేసిన సేవను ఉపయోగించవచ్చు.

## The Graph సర్వర్ {#the-graph-server}

### Graph Explorer: హోస్ట్ చేసిన సేవ {#graph-explorer-the-hosted-service}

హోస్ట్ చేసిన సేవను ఉపయోగించడం సులభమైన మార్గం. ఉపగ్రాఫ్‌ను డిప్లాయ్ చేయడానికి [ఇక్కడ](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) ఉన్న సూచనలను అనుసరించండి. అనేక ప్రాజెక్ట్‌ల కోసం మీరు వాస్తవానికి [ఎక్స్‌ప్లోరర్‌](https://thegraph.com/explorer/)లో ఇప్పటికే ఉన్న ఉపగ్రాఫ్‌లను కనుగొనవచ్చు.

![The Graph-Explorer](./thegraph-explorer.png)

### మీ స్వంత నోడ్‌ను రన్ చేయడం {#running-your-own-node}

ప్రత్యామ్నాయంగా మీరు మీ స్వంత నోడ్‌ను రన్ చేయవచ్చు. డాక్స్ [ఇక్కడ](https://github.com/graphprotocol/graph-node#quick-start) ఉన్నాయి. ఇలా చేయడానికి ఒక కారణం హోస్ట్ చేసిన సేవ ద్వారా మద్దతు లేని నెట్‌వర్క్‌ను ఉపయోగించడం కావచ్చు. ప్రస్తుతం మద్దతు ఉన్న నెట్‌వర్క్‌లను [ఇక్కడ కనుగొనవచ్చు](https://thegraph.com/docs/en/developing/supported-networks/).

## వికేంద్రీకృత భవిష్యత్తు {#the-decentralized-future}

కొత్తగా వచ్చే ఈవెంట్‌ల కోసం GraphQL స్ట్రీమ్‌లకు కూడా మద్దతు ఇస్తుంది. ఇవి ప్రస్తుతం ఓపెన్ బీటాలో ఉన్న [Substreams](https://thegraph.com/docs/en/substreams/) ద్వారా గ్రాఫ్‌లో మద్దతు ఇవ్వబడతాయి.

[2021](https://thegraph.com/blog/mainnet-migration/)లో The Graph వికేంద్రీకృత ఇండెక్సింగ్ నెట్‌వర్క్‌గా మారడం ప్రారంభించింది. ఈ వికేంద్రీకృత ఇండెక్సింగ్ నెట్‌వర్క్ యొక్క ఆర్కిటెక్చర్ గురించి మీరు [ఇక్కడ](https://thegraph.com/docs/en/network/explorer/) మరింత చదవవచ్చు.

రెండు ముఖ్యమైన అంశాలు:

1. క్వెరీల కోసం వినియోగదారులు ఇండెక్సర్‌లకు చెల్లిస్తారు.
2. ఇండెక్సర్‌లు Graph టోకెన్‌లను (GRT) స్టేక్ చేస్తారు.