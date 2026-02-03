---
title: "தி கிராஃப்: Web3 தரவு வினவலைச் சரிசெய்தல்"
description: பிளாக்செயின் என்பது SQL இல்லாத ஒரு தரவுத்தளம் போன்றது. எல்லா தரவுகளும் உள்ளன, ஆனால் அதை அணுக வழி இல்லை. The Graph மற்றும் GraphQL மூலம் இதை எப்படி சரிசெய்வது என்பதை நான் உங்களுக்குக் காட்டுகிறேன்.
author: Markus Waas
lang: ta
tags:
  [
    "திட்பம்",
    "ஸ்மார்ட் ஒப்பந்தங்கள்",
    "வினவுதல்",
    "தி கிராஃப்",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

இந்த முறை, கடந்த ஆண்டில் dapps-களை உருவாக்குவதற்கான நிலையான அடுக்கின் ஒரு பகுதியாக மாறிய The Graph-ஐ இன்னும் கூர்ந்து கவனிப்போம். முதலில் பாரம்பரிய வழியில் நாம் எப்படி விஷயங்களைச் செய்வோம் என்று பார்ப்போம்...

## The Graph இல்லாமல்... {#without-the-graph}

எனவே விளக்க நோக்கங்களுக்காக ஒரு எளிய உதாரணத்துடன் செல்வோம். நாம் அனைவரும் கேம்களை விரும்புகிறோம், எனவே பயனர்கள் பந்தயம் கட்டும் ஒரு எளிய விளையாட்டை கற்பனை செய்து பாருங்கள்:

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

இப்போது நமது dapp இல், மொத்த பந்தயங்கள், மொத்தமாக தோற்ற/வென்ற விளையாட்டுகளைக் காட்டவும், யாராவது மீண்டும் விளையாடும்போதெல்லாம் அதைப் புதுப்பிக்கவும் விரும்புகிறோம் என்று வைத்துக்கொள்வோம். அதற்கான அணுகுமுறை:

1. `totalGamesPlayerWon`-ஐப் பெறுங்கள்.
2. `totalGamesPlayerLost`-ஐப் பெறுங்கள்.
3. `BetPlaced` நிகழ்வுகளுக்கு குழுசேரவும்.

வலதுபுறத்தில் காட்டப்பட்டுள்ளபடி [Web3 இல் உள்ள நிகழ்வை](https://docs.web3js.org/api/web3/class/Contract#events) நாம் கேட்கலாம், ஆனால் இதற்கு சில நிகழ்வுகளைக் கையாள வேண்டும்.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // நிகழ்வு தூண்டப்பட்டது
})
.on('changed', function(event) {
    // நிகழ்வு மீண்டும் நீக்கப்பட்டது
})
.on('error', function(error, receipt) {
    // tx நிராகரிக்கப்பட்டது
});
```

இப்போது இது நமது எளிய உதாரணத்திற்கு ஓரளவு நன்றாக இருக்கிறது. ஆனால் தற்போதைய வீரருக்கு மட்டும் தோற்ற/வென்ற பந்தயங்களின் தொகையைக் காட்ட விரும்புகிறோம் என்று வைத்துக்கொள்வோம். சரி, நமக்கு அதிர்ஷ்டம் இல்லை, அந்த மதிப்புகளைச் சேமித்து அவற்றை மீட்டெடுக்கும் ஒரு புதிய ஒப்பந்தத்தை நீங்கள் பயன்படுத்தினால் நல்லது. இப்போது மிகவும் சிக்கலான ஸ்மார்ட் ஒப்பந்தம் மற்றும் dapp-ஐ கற்பனை செய்து பாருங்கள், விஷயங்கள் விரைவாக குழப்பமடையக்கூடும்.

![ஒருவர் எளிதாக வினவ முடியாது](./one-does-not-simply-query.jpg)

இது எவ்வாறு உகந்ததாக இல்லை என்பதை நீங்கள் பார்க்கலாம்:

- ஏற்கனவே பயன்படுத்தப்பட்ட ஒப்பந்தங்களுக்கு வேலை செய்யாது.
- அந்த மதிப்புகளைச் சேமிக்க கூடுதல் எரிவாயு செலவுகள்.
- ஒரு Ethereum முனைக்கான தரவைப் பெற மற்றொரு அழைப்பு தேவைப்படுகிறது.

![அது போதாது](./not-good-enough.jpg)

இப்போது ஒரு சிறந்த தீர்வைப் பார்ப்போம்.

## நான் உங்களுக்கு GraphQL-ஐ அறிமுகப்படுத்துகிறேன் {#let-me-introduce-to-you-graphql}

முதலில் GraphQL பற்றி பேசலாம், இது முதலில் Facebook ஆல் வடிவமைக்கப்பட்டு செயல்படுத்தப்பட்டது. பாரம்பரிய REST API மாதிரியுடன் நீங்கள் பரிச்சயமானவராக இருக்கலாம். அதற்கு பதிலாக, நீங்கள் விரும்பிய தரவிற்கான ஒரு வினவலை எழுத முடியும் என்று கற்பனை செய்து பாருங்கள்:

![GraphQL API vs. REST API](./graphql.jpg)

![](./graphql-query.gif)

இரண்டு படங்களும் GraphQL-இன் சாராம்சத்தைப் படம்பிடிக்கின்றன. வலதுபுறத்தில் உள்ள வினவல் மூலம், நமக்கு என்ன தரவு வேண்டும் என்பதை நாம் துல்லியமாக வரையறுக்க முடியும், எனவே ஒரே கோரிக்கையில் நமக்குத் தேவையான அனைத்தையும், நமக்குத் தேவையானதை விட அதிகமாக எதையும் பெறமாட்டோம். ஒரு GraphQL சேவையகம் தேவையான எல்லா தரவுகளையும் மீட்டெடுப்பதைக் கையாளுகிறது, எனவே இது frontend நுகர்வோர் தரப்பிற்குப் பயன்படுத்த நம்பமுடியாத அளவிற்கு எளிதானது. நீங்கள் ஆர்வமாக இருந்தால், சேவையகம் ஒரு வினவலை எவ்வாறு கையாளுகிறது என்பது பற்றிய [இது ஒரு நல்ல விளக்கம்](https://www.apollographql.com/blog/graphql-explained).

இப்போது அந்த அறிவுடன், இறுதியாக பிளாக்செயின் பகுதி மற்றும் The Graph-க்குள் நுழைவோம்.

## The Graph என்றால் என்ன? {#what-is-the-graph}

ஒரு பிளாக்செயின் என்பது ஒரு பரவலாக்கப்பட்ட தரவுத்தளமாகும், ஆனால் வழக்கமாக இருப்பதை போலல்லாமல், இந்த தரவுத்தளத்திற்கு நம்மிடம் வினவல் மொழி இல்லை. தரவுகளை மீட்டெடுப்பதற்கான தீர்வுகள் வேதனையானவை அல்லது முற்றிலும் சாத்தியமற்றவை. The Graph என்பது பிளாக்செயின் தரவைக் குறியிடுவதற்கும் வினவுவதற்கும் ஒரு பரவலாக்கப்பட்ட நெறிமுறையாகும். நீங்கள் யூகித்திருக்கலாம், அது GraphQL-ஐ வினவல் மொழியாகப் பயன்படுத்துகிறது.

![The Graph](./thegraph.png)

எதையாவது புரிந்துகொள்வதற்கு உதாரணங்கள் எப்போதும் சிறந்தவை, எனவே நமது GameContract உதாரணத்திற்கு The Graph-ஐப் பயன்படுத்துவோம்.

## ஒரு Subgraph-ஐ உருவாக்குவது எப்படி {#how-to-create-a-subgraph}

தரவைக் குறியிடுவதற்கான வரையறை subgraph என்று அழைக்கப்படுகிறது. அதற்கு மூன்று கூறுகள் தேவை:

1. மேனிஃபெஸ்ட் (`subgraph.yaml`)
2. ஸ்கீமா (`schema.graphql`)
3. மேப்பிங் (`mapping.ts`)

### மேனிஃபெஸ்ட் (`subgraph.yaml`) {#manifest}

மேனிஃபெஸ்ட் என்பது நமது உள்ளமைவுக் கோப்பு மற்றும் வரையறுக்கிறது:

- எந்த ஸ்மார்ட் ஒப்பந்தங்களைக் குறியிட வேண்டும் (முகவரி, நெட்வொர்க், ABI...)
- எந்த நிகழ்வுகளைக் கவனிக்க வேண்டும்
- செயல்பாட்டு அழைப்புகள் அல்லது தொகுதிகள் போன்ற பிறவற்றைக் கவனிக்க வேண்டும்
- அழைக்கப்படும் மேப்பிங் செயல்பாடுகள் (கீழே உள்ள `mapping.ts`-ஐப் பார்க்கவும்)

நீங்கள் இங்கே பல ஒப்பந்தங்கள் மற்றும் கையாளுபவர்களை வரையறுக்கலாம். ஒரு பொதுவான அமைப்பில் Hardhat திட்டத்திற்குள் அதன் சொந்த களஞ்சியத்துடன் ஒரு subgraph கோப்புறை இருக்கும். பின்னர் நீங்கள் எளிதாக ABI-ஐக் குறிப்பிடலாம்.

வசதிக்காக நீங்கள் mustache போன்ற ஒரு டெம்ப்ளேட் கருவியையும் பயன்படுத்த விரும்பலாம். பின்னர் நீங்கள் ஒரு `subgraph.template.yaml`-ஐ உருவாக்கி, சமீபத்திய பயன்பாடுகளின் அடிப்படையில் முகவரிகளைச் செருகவும். மேலும் மேம்பட்ட எடுத்துக்காட்டு அமைப்பிற்கு, உதாரணமாக [Aave subgraph repo](https://github.com/aave/aave-protocol/tree/master/thegraph)-வைப் பார்க்கவும்.

முழு ஆவணத்தையும் [இங்கே](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) பார்க்கலாம்.

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

### ஸ்கீமா (`schema.graphql`) {#schema}

ஸ்கீமா என்பது GraphQL தரவு வரையறை. இது எந்த நிறுவனங்கள் உள்ளன மற்றும் அவற்றின் வகைகளை வரையறுக்க உங்களை அனுமதிக்கும். The Graph இலிருந்து ஆதரிக்கப்படும் வகைகள்

- பைட்டுகள்
- ID
- சரம்
- பூலியன்
- Int
- BigInt
- BigDecimal

உறவுகளை வரையறுக்க நீங்கள் நிறுவனங்களை வகையாகவும் பயன்படுத்தலாம். நமது எடுத்துக்காட்டில், வீரரிடமிருந்து பந்தயங்களுக்கு 1-க்கு-பல உறவை வரையறுக்கிறோம். ! என்பது மதிப்பு காலியாக இருக்க முடியாது என்பதாகும். முழு ஆவணத்தையும் [இங்கே](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) பார்க்கலாம்.

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

### மேப்பிங் (`mapping.ts`) {#mapping}

The Graph-இல் உள்ள மேப்பிங் கோப்பு, உள்வரும் நிகழ்வுகளை நிறுவனங்களாக மாற்றும் நமது செயல்பாடுகளை வரையறுக்கிறது. இது Typescript-இன் துணைக்குழுவான AssemblyScript-இல் எழுதப்பட்டுள்ளது. மேப்பிங்கின் திறமையான மற்றும் போர்ட்டபிள் செயல்பாட்டிற்காக இது WASM (WebAssembly) ஆக தொகுக்கப்படலாம் என்பதே இதன் பொருள்.

`subgraph.yaml` கோப்பில் பெயரிடப்பட்ட ஒவ்வொரு செயல்பாட்டையும் நீங்கள் வரையறுக்க வேண்டும், எனவே நமது விஷயத்தில் நமக்கு ஒன்று மட்டுமே தேவை: `handleNewBet`. முதலில் அனுப்புநர் முகவரியிலிருந்து Player நிறுவனத்தை id ஆக ஏற்ற முயற்சிக்கிறோம். அது இல்லை என்றால், நாம் ஒரு புதிய நிறுவனத்தை உருவாக்கி அதை தொடக்க மதிப்புகளுடன் நிரப்புகிறோம்.

பிறகு நாம் ஒரு புதிய Bet நிறுவனத்தை உருவாக்குகிறோம். இதற்கான id ஆனது `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` ஆக இருக்கும், இது எப்போதும் ஒரு தனித்துவமான மதிப்பை உறுதி செய்கிறது. ஹாஷை மட்டும் பயன்படுத்துவது போதாது, ஏனெனில் யாராவது ஒரு ஸ்மார்ட் ஒப்பந்தத்தின் மூலம் ஒரு பரிவர்த்தனையில் பலமுறை placeBet செயல்பாட்டை அழைக்கலாம்.

கடைசியாக, நாம் Player நிறுவனத்தை எல்லா தரவுகளுடன் புதுப்பிக்கலாம். வரிசைகளை நேரடியாகத் தள்ள முடியாது, ஆனால் இங்கே காட்டப்பட்டுள்ளபடி புதுப்பிக்கப்பட வேண்டும். பந்தயத்தைக் குறிப்பிட நாம் id-ஐப் பயன்படுத்துகிறோம். ஒரு நிறுவனத்தைச் சேமிக்க இறுதியில் `.save()` தேவைப்படுகிறது.

முழு ஆவணத்தையும் இங்கே காணலாம்: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. மேப்பிங் கோப்பில் பதிவு வெளியீட்டையும் நீங்கள் சேர்க்கலாம், [இங்கே](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) பார்க்கவும்.

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // இன்னும் இல்லை என்றால் உருவாக்கவும்
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

  // இது போன்ற வரிசையை புதுப்பிக்கவும்
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Frontend-இல் இதைப் பயன்படுத்துதல் {#using-it-in-the-frontend}

Apollo Boost போன்ற ஒன்றைப் பயன்படுத்தி, உங்கள் React dapp (அல்லது Apollo-Vue) இல் The Graph-ஐ எளிதாக ஒருங்கிணைக்கலாம். குறிப்பாக React hooks மற்றும் Apollo-வைப் பயன்படுத்தும் போது, ​​தரவைப் பெறுவது உங்கள் பாகத்தில் ஒரு GraphQL வினவலை எழுதுவது போல எளிது. ஒரு பொதுவான அமைப்பு இப்படி இருக்கலாம்:

```javascript
// அனைத்து subgraph-களையும் பார்க்கவும்: https://thegraph.com/explorer/
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

இப்போது நாம் உதாரணமாக இது போன்ற ஒரு வினவலை எழுதலாம். இது நமக்கு பெற்றுத் தரும்

- தற்போதைய பயனர் எத்தனை முறை வென்றுள்ளார்
- தற்போதைய பயனர் எத்தனை முறை தோற்றுள்ளார்
- அவரது முந்தைய அனைத்து பந்தயங்களுடன் கூடிய நேரமுத்திரைகளின் பட்டியல்

அனைத்தும் GraphQL சேவையகத்திற்கு ஒரே கோரிக்கையில்.

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

![மாயம்](./magic.jpg)

ஆனால் புதிரின் ஒரு கடைசி பகுதியை நாம் காணவில்லை, அதுதான் சேவையகம். நீங்கள் அதை நீங்களே இயக்கலாம் அல்லது ஹோஸ்ட் செய்யப்பட்ட சேவையைப் பயன்படுத்தலாம்.

## The Graph சேவையகம் {#the-graph-server}

### கிராஃப் எக்ஸ்ப்ளோரர்: ஹோஸ்ட் செய்யப்பட்ட சேவை {#graph-explorer-the-hosted-service}

ஹோஸ்ட் செய்யப்பட்ட சேவையைப் பயன்படுத்துவதே எளிதான வழி. ஒரு subgraph-ஐப் பயன்படுத்த [இங்கே](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) உள்ள வழிமுறைகளைப் பின்பற்றவும். பல திட்டங்களுக்கு நீங்கள் ஏற்கனவே உள்ள subgraph-களை [எக்ஸ்ப்ளோரரில்](https://thegraph.com/explorer/) காணலாம்.

![The Graph-Explorer](./thegraph-explorer.png)

### உங்கள் சொந்த முனையை இயக்குதல் {#running-your-own-node}

மாற்றாக நீங்கள் உங்கள் சொந்த முனையை இயக்கலாம். ஆவணங்கள் [இங்கே](https://github.com/graphprotocol/graph-node#quick-start). ஹோஸ்ட் செய்யப்பட்ட சேவையால் ஆதரிக்கப்படாத நெட்வொர்க்கைப் பயன்படுத்துவது இதைச் செய்வதற்கான ஒரு காரணமாக இருக்கலாம். தற்போது ஆதரிக்கப்படும் நெட்வொர்க்குகளை [இங்கே காணலாம்](https://thegraph.com/docs/en/developing/supported-networks/).

## பரவலாக்கப்பட்ட எதிர்காலம் {#the-decentralized-future}

புதிதாக வரும் நிகழ்வுகளுக்கு GraphQL ஸ்ட்ரீம்களையும் ஆதரிக்கிறது. இவை தற்போது திறந்த பீட்டாவில் உள்ள [Substreams](https://thegraph.com/docs/en/substreams/) மூலம் வரைபடத்தில் ஆதரிக்கப்படுகின்றன.

[2021](https://thegraph.com/blog/mainnet-migration/) இல் The Graph ஒரு பரவலாக்கப்பட்ட குறியீட்டு நெட்வொர்க்கிற்கு அதன் மாற்றத்தைத் தொடங்கியது. இந்த பரவலாக்கப்பட்ட குறியீட்டு நெட்வொர்க்கின் கட்டமைப்பு பற்றி [இங்கே](https://thegraph.com/docs/en/network/explorer/) மேலும் படிக்கலாம்.

இரண்டு முக்கிய அம்சங்கள்:

1. பயனர்கள் வினவல்களுக்காக குறியீட்டாளர்களுக்கு பணம் செலுத்துகிறார்கள்.
2. குறியீட்டாளர்கள் Graph டோக்கன்களை (GRT) பங்கு வைக்கிறார்கள்.
