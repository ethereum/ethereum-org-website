---
title: "The Graph: Web3 தரவு வினவலைச் சரிசெய்தல்"
description: "பிளாக்செயின் என்பது SQL இல்லாத தரவுத்தளத்தைப் போன்றது. எல்லா தரவும் அங்கு உள்ளது, ஆனால் அதை அணுக வழி இல்லை. The Graph மற்றும் GraphQL மூலம் இதை எவ்வாறு சரிசெய்வது என்பதை நான் உங்களுக்குக் காட்டுகிறேன்."
author: "மார்கஸ் வாஸ்"
lang: ta
tags: ["Solidity", "ஸ்மார்ட் ஒப்பந்தங்கள்", "வினவல்", "the graph", "React"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

இந்த முறை நாம் The Graph-ஐப் பற்றி விரிவாகப் பார்ப்போம், இது கடந்த ஆண்டில் dapps-ஐ உருவாக்குவதற்கான நிலையான அடுக்கின் ஒரு பகுதியாக மாறியுள்ளது. முதலில் பாரம்பரிய முறையில் நாம் எவ்வாறு விஷயங்களைச் செய்வோம் என்பதைப் பார்ப்போம்...

## The Graph இல்லாமல்... {#without-the-graph}

விளக்கத்திற்காக ஒரு எளிய உதாரணத்தைப் பார்ப்போம். நாம் அனைவரும் விளையாட்டுகளை விரும்புகிறோம், எனவே பயனர்கள் பந்தயம் கட்டும் ஒரு எளிய விளையாட்டைக் கற்பனை செய்து பாருங்கள்:

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

இப்போது நமது dapp-இல், மொத்த பந்தயங்கள், தோற்ற/வென்ற மொத்த விளையாட்டுகளைக் காட்ட விரும்புகிறோம், மேலும் யாராவது மீண்டும் விளையாடும்போதெல்லாம் அதைப் புதுப்பிக்க விரும்புகிறோம் என்று வைத்துக்கொள்வோம். அதற்கான அணுகுமுறை இதுவாக இருக்கும்:

1. `totalGamesPlayerWon`-ஐப் பெறவும்.
2. `totalGamesPlayerLost`-ஐப் பெறவும்.
3. `BetPlaced` நிகழ்வுகளுக்கு குழுசேரவும் (Subscribe).

வலதுபுறத்தில் காட்டப்பட்டுள்ளபடி [Web3-இல் உள்ள நிகழ்வை](https://docs.web3js.org/api/web3/class/Contract#events) நாம் கவனிக்கலாம், ஆனால் இதற்குச் சில நிகழ்வுகளைக் கையாள வேண்டியிருக்கும்.

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
    // பரிவர்த்தனை நிராகரிக்கப்பட்டது
});
```

நமது எளிய உதாரணத்திற்கு இது ஓரளவுக்குச் சரியாக இருக்கும். ஆனால் இப்போது தற்போதைய ஆட்டக்காரருக்கு மட்டும் தோற்ற/வென்ற பந்தயங்களின் தொகையைக் காட்ட விரும்புகிறோம் என்று வைத்துக்கொள்வோம். நமக்கு அதிர்ஷ்டம் இல்லை, அந்த மதிப்புகளைச் சேமித்து அவற்றைப் பெறும் புதிய ஒப்பந்தத்தைப் பயன்படுத்துவது (deploy) நல்லது. இப்போது மிகவும் சிக்கலான ஸ்மார்ட் ஒப்பந்தம் மற்றும் dapp-ஐக் கற்பனை செய்து பாருங்கள், விஷயங்கள் விரைவாகக் குழப்பமடையக்கூடும்.

![ஒருவர் எளிதாக வினவ முடியாது](./one-does-not-simply-query.jpg)

இது எவ்வாறு உகந்தது அல்ல என்பதை நீங்கள் பார்க்கலாம்:

- ஏற்கனவே பயன்படுத்தப்பட்ட (deployed) ஒப்பந்தங்களுக்கு வேலை செய்யாது.
- அந்த மதிப்புகளைச் சேமிப்பதற்கான கூடுதல் எரிவாயு (gas) செலவுகள்.
- Ethereum முனையத்திற்கான (node) தரவைப் பெற மற்றொரு அழைப்பு தேவைப்படுகிறது.

![அது போதுமானதாக இல்லை](./not-good-enough.jpg)

இப்போது ஒரு சிறந்த தீர்வைப் பார்ப்போம்.

## GraphQL-ஐ உங்களுக்கு அறிமுகப்படுத்துகிறேன் {#let-me-introduce-to-you-graphql}

முதலில் Facebook-ஆல் வடிவமைக்கப்பட்டு செயல்படுத்தப்பட்ட GraphQL பற்றிப் பேசுவோம். பாரம்பரிய REST API மாதிரி உங்களுக்குத் தெரிந்திருக்கலாம். இப்போது அதற்குப் பதிலாக உங்களுக்குத் தேவையான தரவுகளுக்குச் சரியாக ஒரு வினவலை (query) எழுத முடியும் என்று கற்பனை செய்து பாருங்கள்:

![GraphQL API vs. REST API](./graphql.jpg)

![The Graph பிளேகிரவுண்டில் GraphQL வினவலின் அனிமேஷன் விளக்கம்](./graphql-query.gif)

இந்த இரண்டு படங்களும் GraphQL-இன் சாராம்சத்தை அழகாகப் படம்பிடித்துக் காட்டுகின்றன. வலதுபுறத்தில் உள்ள வினவலின் மூலம் நமக்கு என்ன தரவு வேண்டும் என்பதைச் சரியாக வரையறுக்க முடியும், எனவே ஒரே கோரிக்கையில் அனைத்தையும் பெறுகிறோம், நமக்குத் தேவையானதைத் தவிர வேறு எதுவும் இல்லை. தேவையான அனைத்துத் தரவையும் பெறுவதை GraphQL சேவையகம் கையாளுகிறது, எனவே முன்பக்க (frontend) நுகர்வோர் தரப்பைப் பயன்படுத்துவது நம்பமுடியாத அளவிற்கு எளிதானது. உங்களுக்கு ஆர்வமிருந்தால், சேவையகம் ஒரு வினவலை எவ்வாறு சரியாகக் கையாளுகிறது என்பதற்கான [ஒரு நல்ல விளக்கம் இங்கே உள்ளது](https://www.apollographql.com/blog/graphql-explained).

இப்போது அந்த அறிவுடன், இறுதியாக பிளாக்செயின் வெளி மற்றும் The Graph-க்குள் நுழைவோம்.

## The Graph என்றால் என்ன? {#what-is-the-graph}

பிளாக்செயின் என்பது ஒரு பரவலாக்கப்பட்ட தரவுத்தளமாகும், ஆனால் வழக்கமாக இருப்பதற்கு மாறாக, இந்தத் தரவுத்தளத்திற்கு வினவல் மொழி (query language) நம்மிடம் இல்லை. தரவை மீட்டெடுப்பதற்கான தீர்வுகள் கடினமானவை அல்லது முற்றிலும் சாத்தியமற்றவை. The Graph என்பது பிளாக்செயின் தரவை அட்டவணைப்படுத்துவதற்கும் (indexing) வினவுவதற்கும் (querying) ஒரு பரவலாக்கப்பட்ட நெறிமுறையாகும். நீங்கள் யூகித்திருக்கலாம், இது GraphQL-ஐ வினவல் மொழியாகப் பயன்படுத்துகிறது.

![The Graph](./thegraph.png)

எதையாவது புரிந்துகொள்ள உதாரணங்கள் எப்போதும் சிறந்தவை, எனவே நமது GameContract உதாரணத்திற்கு The Graph-ஐப் பயன்படுத்துவோம்.

## சப்-கிராஃபை (Subgraph) எவ்வாறு உருவாக்குவது {#how-to-create-a-subgraph}

தரவை எவ்வாறு அட்டவணைப்படுத்துவது என்பதற்கான வரையறை சப்-கிராஃப் (subgraph) என்று அழைக்கப்படுகிறது. இதற்கு மூன்று கூறுகள் தேவை:

1. மேனிஃபெஸ்ட் (`subgraph.yaml`)
2. ஸ்கீமா (`schema.graphql`)
3. மேப்பிங் (`mapping.ts`)

### மேனிஃபெஸ்ட் (`subgraph.yaml`) {#manifest}

மேனிஃபெஸ்ட் என்பது நமது உள்ளமைவு (configuration) கோப்பாகும், மேலும் இது பின்வருவனவற்றை வரையறுக்கிறது:

- எந்த ஸ்மார்ட் ஒப்பந்தங்களை அட்டவணைப்படுத்த வேண்டும் (முகவரி, நெட்வொர்க், ABI...)
- எந்த நிகழ்வுகளைக் கவனிக்க வேண்டும்
- செயல்பாட்டு அழைப்புகள் (function calls) அல்லது தொகுதிகள் (blocks) போன்ற கவனிக்க வேண்டிய பிற விஷயங்கள்
- அழைக்கப்படும் மேப்பிங் செயல்பாடுகள் (கீழே உள்ள `mapping.ts`-ஐப் பார்க்கவும்)

நீங்கள் இங்கே பல ஒப்பந்தங்கள் மற்றும் கையாளுபவர்களை (handlers) வரையறுக்கலாம். ஒரு பொதுவான அமைப்பானது Hardhat திட்டத்திற்குள் அதன் சொந்த களஞ்சியத்துடன் (repository) ஒரு சப்-கிராஃப் கோப்புறையைக் கொண்டிருக்கும். பின்னர் நீங்கள் ABI-ஐ எளிதாகக் குறிப்பிடலாம்.

வசதிக்காக நீங்கள் mustache போன்ற டெம்ப்ளேட் கருவியைப் பயன்படுத்த விரும்பலாம். பின்னர் நீங்கள் ஒரு `subgraph.template.yaml`-ஐ உருவாக்கி, சமீபத்திய வரிசைப்படுத்தல்களின் (deployments) அடிப்படையில் முகவரிகளைச் செருகலாம். மிகவும் மேம்பட்ட உதாரண அமைப்பிற்கு, [Aave சப்-கிராஃப் களஞ்சியத்தைப்](https://github.com/aave/aave-protocol/tree/master/thegraph) பார்க்கவும்.

முழுமையான ஆவணங்களை [இங்கே](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) காணலாம்.

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

ஸ்கீமா என்பது GraphQL தரவு வரையறையாகும். எந்தெந்த உருப்படிகள் (entities) உள்ளன மற்றும் அவற்றின் வகைகளை வரையறுக்க இது உங்களை அனுமதிக்கும். The Graph-ஆல் ஆதரிக்கப்படும் வகைகள்:

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

உறவுகளை வரையறுக்க நீங்கள் உருப்படிகளை (entities) வகையாகவும் பயன்படுத்தலாம். நமது எடுத்துக்காட்டில், ஆட்டக்காரருக்கும் பந்தயங்களுக்கும் இடையே 1-க்கு-பல (1-to-many) உறவை வரையறுக்கிறோம். ! என்றால் மதிப்பு காலியாக இருக்க முடியாது என்று அர்த்தம். முழுமையான ஆவணங்களை [இங்கே](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) காணலாம்.

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

The Graph-இல் உள்ள மேப்பிங் கோப்பு, உள்வரும் நிகழ்வுகளை உருப்படிகளாக (entities) மாற்றும் நமது செயல்பாடுகளை வரையறுக்கிறது. இது Typescript-இன் துணைக்குழுவான AssemblyScript-இல் எழுதப்பட்டுள்ளது. இதன் பொருள், மேப்பிங்கை மிகவும் திறமையாகவும் கையடக்கமாகவும் செயல்படுத்துவதற்காக இதை WASM (WebAssembly)-ஆகத் தொகுக்க (compile) முடியும்.

`subgraph.yaml` கோப்பில் பெயரிடப்பட்ட ஒவ்வொரு செயல்பாட்டையும் நீங்கள் வரையறுக்க வேண்டும், எனவே நமது விஷயத்தில் நமக்கு ஒன்று மட்டுமே தேவை: `handleNewBet`. அனுப்புநரின் முகவரியை id-ஆகக் கொண்டு Player உருப்படியை ஏற்ற முதலில் முயற்சிக்கிறோம். அது இல்லையென்றால், புதிய உருப்படியை உருவாக்கி அதைத் தொடக்க மதிப்புகளுடன் நிரப்புகிறோம்.

பின்னர் நாம் ஒரு புதிய Bet உருப்படியை உருவாக்குகிறோம். இதற்கான id `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` ஆக இருக்கும், இது எப்போதும் தனித்துவமான மதிப்பை உறுதி செய்கிறது. ஸ்மார்ட் ஒப்பந்தம் மூலம் ஒரே பரிவர்த்தனையில் யாராவது placeBet செயல்பாட்டைப் பல முறை அழைக்கலாம் என்பதால், ஹாஷை (hash) மட்டும் பயன்படுத்துவது போதாது.

இறுதியாக நாம் அனைத்துத் தரவுகளுடனும் Player உருப்படியைப் புதுப்பிக்கலாம். வரிசைகளை (Arrays) நேரடியாகத் தள்ள (push) முடியாது, ஆனால் இங்கே காட்டப்பட்டுள்ளபடி புதுப்பிக்கப்பட வேண்டும். பந்தயத்தைக் குறிப்பிட id-ஐப் பயன்படுத்துகிறோம். மேலும் ஒரு உருப்படியைச் சேமிக்க இறுதியில் `.save()` தேவைப்படுகிறது.

முழுமையான ஆவணங்களை இங்கே காணலாம்: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. மேப்பிங் கோப்பில் லாக்கிங் வெளியீட்டையும் (logging output) நீங்கள் சேர்க்கலாம், [இங்கே](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) பார்க்கவும்.

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // இதுவரை இல்லை என்றால் உருவாக்கவும்
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

  // வரிசையை இவ்வாறு புதுப்பிக்கவும்
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## முன்பக்கத்தில் (Frontend) இதைப் பயன்படுத்துதல் {#using-it-in-the-frontend}

Apollo Boost போன்ற ஒன்றைப் பயன்படுத்தி, உங்கள் React dapp-இல் (அல்லது Apollo-Vue) The Graph-ஐ எளிதாக ஒருங்கிணைக்கலாம். குறிப்பாக React hooks மற்றும் Apollo-ஐப் பயன்படுத்தும் போது, தரவைப் பெறுவது உங்கள் கூறில் (component) ஒரு GraphQL வினவலை எழுதுவது போல எளிமையானது. ஒரு பொதுவான அமைப்பு இதுபோன்று இருக்கும்:

```javascript
// அனைத்து துணை வரைபடங்களையும் பார்க்க: https://thegraph.com/explorer/
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

இப்போது நாம் உதாரணமாக இது போன்ற ஒரு வினவலை எழுதலாம். இது நமக்குப் பின்வருவனவற்றைப் பெற்றுத் தரும்

- தற்போதைய பயனர் எத்தனை முறை வென்றுள்ளார்
- தற்போதைய பயனர் எத்தனை முறை தோற்றுள்ளார்
- அவரது முந்தைய அனைத்துப் பந்தயங்களுடனான நேர முத்திரைகளின் (timestamps) பட்டியல்

அனைத்தும் GraphQL சேவையகத்திற்கான ஒரே கோரிக்கையில்.

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

![மேஜிக்](./magic.jpg)

ஆனால் புதிரின் கடைசிப் பகுதியை நாம் தவறவிடுகிறோம், அதுதான் சேவையகம். நீங்கள் அதை நீங்களே இயக்கலாம் அல்லது ஹோஸ்ட் செய்யப்பட்ட சேவையைப் பயன்படுத்தலாம்.

## The Graph சேவையகம் {#the-graph-server}

### Graph எக்ஸ்ப்ளோரர்: ஹோஸ்ட் செய்யப்பட்ட சேவை {#graph-explorer-the-hosted-service}

ஹோஸ்ட் செய்யப்பட்ட சேவையைப் பயன்படுத்துவதே எளிதான வழியாகும். சப்-கிராஃபைப் பயன்படுத்த (deploy) [இங்கே](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) உள்ள வழிமுறைகளைப் பின்பற்றவும். பல திட்டங்களுக்கு நீங்கள் [எக்ஸ்ப்ளோரரில்](https://thegraph.com/explorer/) ஏற்கனவே உள்ள சப்-கிராஃப்களைக் கண்டறியலாம்.

![The Graph-Explorer](./thegraph-explorer.png)

### உங்கள் சொந்த முனையத்தை (node) இயக்குதல் {#running-your-own-node}

மாற்றாக நீங்கள் உங்கள் சொந்த முனையத்தை (node) இயக்கலாம். ஆவணங்கள் [இங்கே](https://github.com/graphprotocol/graph-node#quick-start). ஹோஸ்ட் செய்யப்பட்ட சேவையால் ஆதரிக்கப்படாத நெட்வொர்க்கைப் பயன்படுத்துவது இதைச் செய்வதற்கான ஒரு காரணமாக இருக்கலாம். தற்போது ஆதரிக்கப்படும் நெட்வொர்க்குகளை [இங்கே காணலாம்](https://thegraph.com/docs/en/developing/supported-networks/).

## பரவலாக்கப்பட்ட எதிர்காலம் {#the-decentralized-future}

புதிதாக வரும் நிகழ்வுகளுக்கான ஸ்ட்ரீம்களையும் (streams) GraphQL ஆதரிக்கிறது. இவை தற்போது திறந்த பீட்டாவில் (open beta) உள்ள [Substreams](https://thegraph.com/docs/en/substreams/) மூலம் கிராஃபில் ஆதரிக்கப்படுகின்றன.

[2021](https://thegraph.com/blog/mainnet-migration/)-இல் The Graph ஒரு பரவலாக்கப்பட்ட அட்டவணைப்படுத்தல் நெட்வொர்க்கிற்கான மாற்றத்தைத் தொடங்கியது. இந்தப் பரவலாக்கப்பட்ட அட்டவணைப்படுத்தல் நெட்வொர்க்கின் கட்டமைப்பைப் பற்றி [இங்கே](https://thegraph.com/docs/en/network/explorer/) மேலும் படிக்கலாம்.

இரண்டு முக்கிய அம்சங்கள்:

1. பயனர்கள் வினவல்களுக்கு அட்டவணைப்படுத்துபவர்களுக்கு (indexers) பணம் செலுத்துகிறார்கள்.
2. அட்டவணைப்படுத்துபவர்கள் Graph டோக்கன்களை (GRT) பணயம் (stake) வைக்கிறார்கள்.