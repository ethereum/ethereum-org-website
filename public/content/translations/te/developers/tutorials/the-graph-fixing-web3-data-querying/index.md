---
title: "ది గ్రాఫ్: వెబ్3 డేటా క్వేరింగ్ ను సరిచేయడం"
description: బ్లాక్ చైను ఒక డేటాబేస్ లాంటిది కానీ SQL లేకుండా. డేటా అంతా అక్కడే ఉంది, కానీ దాన్ని యాక్సెస్ చేయడానికి మార్గం లేదు. ది గ్రాఫ్ మరియు గ్రాఫ్ క్యూఎల్ తో దీనిని ఎలా పరిష్కరించాలో నేను మీకు చూపిస్తాను.
author: మార్కస్ వాస్
lang: te
tags:
  [
    "దృఢత్వం",
    "స్మార్ట్ కాంట్రాక్టులు",
    "ప్రశ్నించడం",
    "ది గ్రాఫ్",
    "react"
  ]
skill: మధ్యస్థ
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

ఈసారి మనం ది గ్రాఫ్‌ను నిశితంగా పరిశీలిద్దాం, ఇది గత సంవత్సరంలో డాప్స్‌ను అభివృద్ధి చేయడానికి ప్రామాణిక స్టాక్‌లో ముఖ్యమైన భాగంగా మారింది. ముందుగా మనం సాంప్రదాయ పద్ధతిలో పనులను ఎలా చేస్తామో చూద్దాం...

## ది గ్రాఫ్ లేకుండా... {#without-the-graph}

కాబట్టి దృష్టాంత ప్రయోజనాల కోసం ఒక సాధారణ ఉదాహరణతో వెళ్దాం. మనందరికీ ఆటలు ఇష్టం, కాబట్టి వినియోగదారులు పందెం కాసే ఒక సాధారణ ఆటను ఊహించుకోండి:

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

ఇప్పుడు మన డాప్‌లో, మొత్తం పందాలను, ఓడిపోయిన/గెలిచిన మొత్తం ఆటలను ప్రదర్శించాలని మరియు ఎవరైనా మళ్లీ ఆడినప్పుడల్లా దాన్ని అప్‌డేట్ చేయాలని అనుకుందాం. విధానం ఇలా ఉంటుంది:

1. `totalGamesPlayerWon`ను పొందండి.
2. `totalGamesPlayerLost`ను పొందండి.
3. `BetPlaced` ఈవెంట్‌లకు సబ్స్క్రయిబ్ అవ్వండి.

కుడి వైపు చూపిన విధంగా మనం [వెబ్3లో ఈవెంట్](https://docs.web3js.org/api/web3/class/Contract#events) ను వినవచ్చు, కానీ దీనికి చాలా కేసులను నిర్వహించడం అవసరం.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // ఈవెంట్ ఫైర్ చేయబడింది
})
.on('changed', function(event) {
    // ఈవెంట్ మళ్ళీ తీసివేయబడింది
})
.on('error', function(error, receipt) {
    // tx తిరస్కరించబడింది
});
```

ఇప్పుడు ఇది మన సాధారణ ఉదాహరణకు కొంతవరకు బాగానే ఉంది. కానీ ఇప్పుడు మనం ప్రస్తుత ఆటగాడికి మాత్రమే ఓడిపోయిన/గెలిచిన పందాల మొత్తాలను ప్రదర్శించాలని అనుకుందాం. మనకు అదృష్టం లేదు, మీరు ఆ విలువలను నిల్వ చేసే కొత్త కాంట్రాక్ట్‌ను డిప్లాయ్ చేసి వాటిని పొందడం మంచిది. ఇప్పుడు చాలా సంక్లిష్టమైన స్మార్ట్ కాంట్రాక్ట్ మరియు డాప్‌ను ఊహించుకోండి, విషయాలు త్వరగా గందరగోళంగా మారవచ్చు.

![కేవలం ప్రశ్నించడం సరిపోదు](./one-does-not-simply-query.jpg)

ఇది ఎలా సరైనది కాదో మీరు చూడవచ్చు:

- ఇప్పటికే డిప్లాయ్ చేసిన కాంట్రాక్టులకు పనిచేయదు.
- ఆ విలువలను నిల్వ చేయడానికి అదనపు గ్యాస్ ఖర్చులు.
- ఇతీరియము నోడ్ కోసం డేటాను పొందేందుకు మరొక కాల్ అవసరం.

![అది సరిపోదు](./not-good-enough.jpg)

ఇప్పుడు ఒక మంచి పరిష్కారాన్ని చూద్దాం.

## మిమ్మల్ని GraphQLకు పరిచయం చేయనివ్వండి {#let-me-introduce-to-you-graphql}

ముందుగా మనం GraphQL గురించి మాట్లాడుకుందాం, ఇది మొదట ఫేస్బుక్ చే రూపొందించబడింది మరియు అమలు చేయబడింది. మీకు సాంప్రదాయ రెస్ట్ ఎపిఐ మోడల్ గురించి తెలిసి ఉండవచ్చు. ఇప్పుడు దానికి బదులుగా మీకు కావలసిన డేటా కోసం కచ్చితంగా మీరు ఒక క్వెరీ వ్రాయగలరని ఊహించుకోండి:

![గ్రాఫ్ క్యూఎల్ ఎపిఐ వర్సెస్ రెస్ట్ ఎపిఐ](./graphql.jpg)

![](./graphql-query.gif)

ఈ రెండు చిత్రాలు చాలా వరకు GraphQL సారాన్ని సంగ్రహిస్తాయి. కుడివైపున ఉన్న క్వెరీతో మనకు ఏ డేటా కావాలో కచ్చితంగా నిర్వచించవచ్చు, కాబట్టి అక్కడ మనం ఒకే అభ్యర్థనలో ప్రతిదీ పొందుతాము మరియు మనకు అవసరమైన దాని కంటే ఎక్కువ ఏమీ పొందము. ఒక GraphQL సర్వర్ అవసరమైన మొత్తం డేటాను పొందడాన్ని నిర్వహిస్తుంది, కాబట్టి ఫ్రంటెండ్ వినియోగదారు వైపు ఉపయోగించడం చాలా సులభం. [ఇది ఒక మంచి వివరణ](https://www.apollographql.com/blog/graphql-explained) మీకు ఆసక్తి ఉంటే సర్వర్ ఒక క్వెరీని కచ్చితంగా ఎలా నిర్వహిస్తుందో వివరిస్తుంది.

ఇప్పుడు ఆ జ్ఞానంతో, చివరకు బ్లాక్ చైను స్పేస్ మరియు ది గ్రాఫ్‌లోకి ప్రవేశిద్దాం.

## ది గ్రాఫ్ అంటే ఏమిటి? {#what-is-the-graph}

బ్లాక్ చైను ఒక వికేంద్రీకృత డేటాబేస్, కానీ సాధారణంగా జరిగే దానికి భిన్నంగా, ఈ డేటాబేస్ కోసం మనకు క్వెరీ భాష లేదు. డేటాను తిరిగి పొందేందుకు పరిష్కారాలు బాధాకరంగా లేదా పూర్తిగా అసాధ్యంగా ఉంటాయి. ది గ్రాఫ్ అనేది బ్లాక్ చైను డేటాను ఇండెక్సింగ్ మరియు క్వెరీ చేయడం కోసం ఒక వికేంద్రీకృత ప్రోటోకాల్. మరియు మీరు ఊహించినట్లుగానే, ఇది క్వెరీ భాషగా GraphQLని ఉపయోగిస్తుంది.

![ది గ్రాఫ్](./thegraph.png)

ఏదైనా అర్థం చేసుకోవడానికి ఉదాహరణలు ఎల్లప్పుడూ ఉత్తమమైనవి, కాబట్టి మన GameContract ఉదాహరణ కోసం ది గ్రాఫ్‌ను ఉపయోగిద్దాం.

## సబ్‌గ్రాఫ్‌ను ఎలా సృష్టించాలి {#how-to-create-a-subgraph}

డేటాను ఎలా ఇండెక్స్ చేయాలో అనే నిర్వచనాన్ని సబ్‌గ్రాఫ్ అంటారు. దీనికి మూడు భాగాలు అవసరం:

1. మ్యానిఫెస్ట్ (`subgraph.yaml`)
2. స్కీమా (`schema.graphql`)
3. మ్యాపింగ్ (`mapping.ts`)

### మ్యానిఫెస్ట్ (`subgraph.yaml`) {#manifest}

మ్యానిఫెస్ట్ మన కాన్ఫిగరేషన్ ఫైల్ మరియు నిర్వచిస్తుంది:

- ఏ స్మార్ట్ కాంట్రాక్ట్‌లను ఇండెక్స్ చేయాలి (చిరునామా, నెట్‌వర్క్, ఎబిఐ...)
- ఏ ఈవెంట్‌లను వినాలి
- ఫంక్షన్ కాల్స్ లేదా బ్లాక్‌ల వంటి ఇతర విషయాలను వినడం
- కాల్ చేయబడుతున్న మ్యాపింగ్ ఫంక్షన్‌లు (క్రింద `mapping.ts` చూడండి)

మీరు ఇక్కడ బహుళ కాంట్రాక్టులను మరియు హ్యాండ్లర్లను నిర్వచించవచ్చు. ఒక సాధారణ సెటప్‌లో హార్డ్‌హాట్ ప్రాజెక్ట్ లోపల దాని స్వంత రిపోజిటరీతో ఒక సబ్‌గ్రాఫ్ ఫోల్డర్ ఉంటుంది. అప్పుడు మీరు ఎబిఐను సులభంగా సూచించవచ్చు.

సౌలభ్యం కోసం మీరు మస్టాచ్ వంటి టెంప్లేట్ సాధనాన్ని కూడా ఉపయోగించాలనుకోవచ్చు. అప్పుడు మీరు ఒక `subgraph.template.yaml` సృష్టించి, తాజా డిప్లాయ్‌మెంట్ల ఆధారంగా చిరునామాలను చేర్చండి. మరింత అధునాతన ఉదాహరణ సెటప్ కోసం, ఉదాహరణకు [Aave సబ్ గ్రాఫ్ రెపో](https://github.com/aave/aave-protocol/tree/master/thegraph) చూడండి.

మరియు పూర్తి డాక్యుమెంటేషన్ [ఇక్కడ](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) చూడవచ్చు.

```yaml
specVersion: 0.0.1
description: ఇతీరియముపై పందెం వేయడం
repository: - GitHub లింక్ -
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

స్కీమా అనేది GraphQL డేటా నిర్వచనం. ఇది ఏ ఎంటిటీలు ఉన్నాయి మరియు వాటి రకాలను నిర్వచించడానికి మిమ్మల్ని అనుమతిస్తుంది. ది గ్రాఫ్ నుండి మద్దతు ఉన్న రకాలు

- బైట్‌లు
- ID
- స్ట్రింగ్
- బూలియన్
- ఇంట్
- బిగ్ ఇంట్
- బిగ్ డెసిమల్

సంబంధాలను నిర్వచించడానికి మీరు ఎంటిటీలను రకంగా కూడా ఉపయోగించవచ్చు. మా ఉదాహరణలో మేము ఆటగాడి నుండి పందాలకు 1-నుండి-చాలా సంబంధాన్ని నిర్వచిస్తాము. !  అంటే విలువ ఖాళీగా ఉండకూడదు. పూర్తి డాక్యుమెంటేషన్ [ఇక్కడ](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) చూడవచ్చు.

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

ది గ్రాఫ్‌లోని మ్యాపింగ్ ఫైల్ ఇన్‌కమింగ్ ఈవెంట్‌లను ఎంటిటీలుగా మార్చే మన ఫంక్షన్‌లను నిర్వచిస్తుంది. ఇది టైప్‌స్క్రిప్ట్ యొక్క ఉపసమితి అయిన అసెంబ్లీస్క్రిప్ట్‌లో వ్రాయబడింది. దీని అర్థం మ్యాపింగ్ యొక్క మరింత సమర్థవంతమైన మరియు పోర్టబుల్ అమలు కోసం దీనిని వాసం (వెబ్ అసెంబ్లీ) లోకి కంపైల్ చేయవచ్చు.

మీరు `subgraph.yaml` ఫైల్‌లో పేరు పెట్టబడిన ప్రతి ఫంక్షన్‌ను నిర్వచించవలసి ఉంటుంది, కాబట్టి మన విషయంలో మనకు ఒకటి మాత్రమే అవసరం: `handleNewBet`. మనం మొదట పంపినవారి చిరునామా నుండి ప్లేయర్ ఎంటిటీని ఐడిగా లోడ్ చేయడానికి ప్రయత్నిస్తాము. అది ఉనికిలో లేకపోతే, మేము ఒక కొత్త ఎంటిటీని సృష్టించి దానిని ప్రారంభ విలువలతో నింపుతాము.

అప్పుడు మనం ఒక కొత్త బెట్ ఎంటిటీని సృష్టిస్తాము. దీనికి ఐడి `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`గా ఉంటుంది, ఇది ఎల్లప్పుడూ ప్రత్యేకమైన విలువను నిర్ధారిస్తుంది. ఒక స్మార్ట్ కాంట్రాక్ట్ ద్వారా ఒకే లావాదేవీలో ఎవరైనా ప్లేస్‌బెట్ ఫంక్షన్‌ను చాలాసార్లు కాల్ చేయవచ్చు కాబట్టి కేవలం హాష్‌ను ఉపయోగించడం సరిపోదు.

చివరగా మనం ప్లేయర్ ఎంటిటీని మొత్తం డేటాతో అప్‌డేట్ చేయవచ్చు. శ్రేణులను నేరుగా పుష్ చేయలేము, కానీ ఇక్కడ చూపిన విధంగా నవీకరించబడాలి. పందెంను సూచించడానికి మనం ఐడిని ఉపయోగిస్తాము. మరియు ఒక ఎంటిటీని నిల్వ చేయడానికి చివరలో `.save()` అవసరం.

పూర్తి డాక్యుమెంటేషన్ ఇక్కడ చూడవచ్చు: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. మీరు మ్యాపింగ్ ఫైల్‌కు లాగింగ్ అవుట్‌పుట్‌ను కూడా జోడించవచ్చు, [ఇక్కడ](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) చూడండి.

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

  // శ్రేణిని ఇలా నవీకరించండి
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## ఫ్రంటెండ్‌లో దీనిని ఉపయోగించడం {#using-it-in-the-frontend}

అపోలో బూస్ట్ వంటి వాటిని ఉపయోగించి, మీరు మీ రియాక్ట్ డాప్‌లో (లేదా అపోలో-వ్యూ) ది గ్రాఫ్‌ను సులభంగా ఇంటిగ్రేట్ చేయవచ్చు. ముఖ్యంగా రియాక్ట్ హుక్స్ మరియు అపోలోను ఉపయోగిస్తున్నప్పుడు, మీ కాంపోనెంట్‌లో ఒకే GraphQL క్వెరీని వ్రాయడం అంత సులభం డేటాను పొందడం. ఒక సాధారణ సెటప్ ఇలా ఉండవచ్చు:

```javascript
// అన్ని సబ్‌గ్రాఫ్‌లను చూడండి: https://thegraph.com/explorer/
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

మరియు ఇప్పుడు మనం ఉదాహరణకు ఇలాంటి క్వెరీని వ్రాయవచ్చు. ఇది మనకు అందిస్తుంది

- ప్రస్తుత వినియోగదారు ఎన్నిసార్లు గెలిచారు
- ప్రస్తుత వినియోగదారు ఎన్నిసార్లు ఓడిపోయారు
- వారి మునుపటి అన్ని పందాలతో కూడిన టైమ్‌స్టాంప్‌ల జాబితా

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

![మాయ](./magic.jpg)

కానీ మనం ఈ పజిల్ యొక్క చివరి భాగాన్ని కోల్పోతున్నాము మరియు అది సర్వర్. మీరు దానిని మీరే అమలు చేయవచ్చు లేదా హోస్ట్ చేసిన సేవను ఉపయోగించవచ్చు.

## ది గ్రాఫ్ సర్వర్ {#the-graph-server}

### గ్రాఫ్ ఎక్స్‌ప్లోరర్: హోస్ట్ చేసిన సేవ {#graph-explorer-the-hosted-service}

సులభమైన మార్గం హోస్ట్ చేసిన సేవను ఉపయోగించడం. సబ్‌గ్రాఫ్‌ను డిప్లాయ్ చేయడానికి [ఇక్కడ](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) సూచనలను అనుసరించండి. అనేక ప్రాజెక్టుల కోసం మీరు వాస్తవానికి [ఎక్స్‌ప్లోరర్‌లో](https://thegraph.com/explorer/) ఇప్పటికే ఉన్న సబ్‌గ్రాఫ్‌లను కనుగొనవచ్చు.

![ది గ్రాఫ్-ఎక్స్‌ప్లోరర్](./thegraph-explorer.png)

### మీ స్వంత నోడ్‌ను నడపడం {#running-your-own-node}

ప్రత్యామ్నాయంగా మీరు మీ స్వంత నోడ్‌ను అమలు చేయవచ్చు. డాక్స్ [ఇక్కడ](https://github.com/graphprotocol/graph-node#quick-start). దీనిని చేయడానికి ఒక కారణం హోస్ట్ చేసిన సేవ మద్దతు ఇవ్వని నెట్‌వర్క్‌ను ఉపయోగించడం కావచ్చు. ప్రస్తుతం మద్దతు ఉన్న నెట్‌వర్క్‌లను [ఇక్కడ కనుగొనవచ్చు](https://thegraph.com/docs/en/developing/supported-networks/).

## వికేంద్రీకృత భవిష్యత్తు {#the-decentralized-future}

GraphQL కొత్తగా వచ్చే ఈవెంట్‌ల కోసం స్ట్రీమ్‌లకు కూడా మద్దతు ఇస్తుంది. ఇవి గ్రాఫ్‌లో [సబ్‌స్ట్రీమ్‌ల](https://thegraph.com/docs/en/substreams/) ద్వారా మద్దతివ్వబడతాయి, ఇవి ప్రస్తుతం ఓపెన్ బీటాలో ఉన్నాయి.

[2021](https://thegraph.com/blog/mainnet-migration/)లో ది గ్రాఫ్ వికేంద్రీకృత ఇండెక్సింగ్ నెట్‌వర్క్‌కు తన పరివర్తనను ప్రారంభించింది. ఈ వికేంద్రీకృత ఇండెక్సింగ్ నెట్‌వర్క్ యొక్క ఆర్కిటెక్చర్ గురించి మీరు మరింతగా [ఇక్కడ](https://thegraph.com/docs/en/network/explorer/) చదవవచ్చు.

రెండు ముఖ్యమైన అంశాలు:

1. వినియోగదారులు క్వెరీల కోసం ఇండెక్సర్లకు చెల్లిస్తారు.
2. ఇండెక్సర్లు గ్రాఫ్ టోకెన్లను (జిఆర్టి) స్టేక్ చేస్తారు.
