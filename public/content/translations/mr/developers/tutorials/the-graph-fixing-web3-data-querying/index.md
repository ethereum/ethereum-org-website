---
title: "The Graph: Web3 डेटा क्वेरींग दुरुस्त करणे"
description: ब्लॉकचेन हे SQL नसलेल्या डेटाबेससारखे आहे. सर्व डेटा तिथे असतो, पण त्यात प्रवेश करण्याचा कोणताही मार्ग नसतो. The Graph आणि GraphQL वापरून हे कसे दुरुस्त करायचे ते मी तुम्हाला दाखवतो.
author: मार्कस वास
lang: mr
tags: ["solidity", "स्मार्ट कॉन्ट्रॅक्ट्स", "क्वेरींग", "the graph", "react"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

यावेळी आपण The Graph वर अधिक बारकाईने नजर टाकू, जे गेल्या वर्षभरात विकेंद्रित ॲप्लिकेशन्स (dapps) विकसित करण्यासाठी मानक स्टॅकचा एक आवश्यक भाग बनले आहे. प्रथम आपण पारंपारिक पद्धतीने गोष्टी कशा करू ते पाहूया...

## The Graph शिवाय... {#without-the-graph}

तर स्पष्टीकरणासाठी आपण एका साध्या उदाहरणासह सुरुवात करूया. आपल्या सर्वांना खेळ आवडतात, त्यामुळे वापरकर्ते पैज लावत असलेल्या एका साध्या खेळाची कल्पना करा:

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

आता समजा आपल्या dapp मध्ये, आपल्याला एकूण पैजा, हरलेले/जिंकलेले एकूण खेळ प्रदर्शित करायचे आहेत आणि जेव्हा कोणी पुन्हा खेळेल तेव्हा ते अपडेट करायचे आहे. यासाठीचा दृष्टिकोन असा असेल:

1. `totalGamesPlayerWon` मिळवा.
2. `totalGamesPlayerLost` मिळवा.
3. `BetPlaced` घटना सबस्क्राईब करा.

उजवीकडे दाखवल्याप्रमाणे आपण [Web3 मधील घटना](https://docs.web3js.org/api/web3/class/Contract#events) ऐकू शकतो, परंतु यासाठी बऱ्याच केसेस हाताळण्याची आवश्यकता असते.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // घटना घडली
})
.on('changed', function(event) {
    // घटना पुन्हा काढून टाकण्यात आली
})
.on('error', function(error, receipt) {
    // व्यवहार नाकारला
});
```

आता आपल्या साध्या उदाहरणासाठी हे अजूनही काहीसे ठीक आहे. पण समजा आता आपल्याला फक्त सध्याच्या खेळाडूसाठी हरलेल्या/जिंकलेल्या पैजांची रक्कम प्रदर्शित करायची आहे. तर आपले नशीब खराब आहे, तुम्हाला एक नवीन कॉन्ट्रॅक्ट प्रस्थापित करणे (deploy) चांगले राहील जे ती मूल्ये साठवेल आणि ती मिळवेल. आणि आता एका अधिक गुंतागुंतीच्या स्मार्ट कॉन्ट्रॅक्ट आणि dapp ची कल्पना करा, गोष्टी लवकरच गोंधळाच्या होऊ शकतात.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

हे कसे इष्टतम नाही हे तुम्ही पाहू शकता:

- आधीच प्रस्थापित केलेल्या कॉन्ट्रॅक्ट्ससाठी काम करत नाही.
- ती मूल्ये साठवण्यासाठी अतिरिक्त गॅस खर्च.
- इथेरियम नोडसाठी डेटा मिळवण्यासाठी आणखी एका कॉलची आवश्यकता असते.

![Thats not good enough](./not-good-enough.jpg)

आता एका चांगल्या उपायाकडे पाहूया.

## मी तुम्हाला GraphQL ची ओळख करून देतो {#let-me-introduce-to-you-graphql}

प्रथम आपण GraphQL बद्दल बोलूया, जे मूळतः फेसबुक् द्वारे डिझाइन आणि लागू केले गेले होते. तुम्हाला पारंपारिक REST API मॉडेलची माहिती असेल. आता कल्पना करा की त्याऐवजी तुम्हाला नेमका जो डेटा हवा आहे त्यासाठी तुम्ही क्वेरी लिहू शकता:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

या दोन प्रतिमा GraphQL चे सार बऱ्यापैकी स्पष्ट करतात. उजवीकडील क्वेरीसह आपण आपल्याला नेमका कोणता डेटा हवा आहे हे परिभाषित करू शकतो, त्यामुळे तिथे आपल्याला एकाच विनंतीमध्ये सर्वकाही मिळते आणि आपल्याला जे हवे आहे त्यापेक्षा जास्त काहीही मिळत नाही. GraphQL सर्व्हर आवश्यक असलेला सर्व डेटा मिळवण्याचे काम हाताळतो, त्यामुळे फ्रंटएंड ग्राहक बाजूसाठी ते वापरणे अत्यंत सोपे होते. तुम्हाला स्वारस्य असल्यास सर्व्हर क्वेरी नेमकी कशी हाताळतो [याचे हे एक छान स्पष्टीकरण आहे](https://www.apollographql.com/blog/graphql-explained).

आता त्या ज्ञानासह, आपण शेवटी ब्लॉकचेन क्षेत्रात आणि The Graph मध्ये प्रवेश करूया.

## The Graph काय आहे? {#what-is-the-graph}

ब्लॉकचेन हा एक विकेंद्रित डेटाबेस आहे, परंतु सहसा जे घडते त्याच्या उलट, आपल्याकडे या डेटाबेससाठी कोणतीही क्वेरी भाषा नाही. डेटा मिळवण्याचे उपाय त्रासदायक किंवा पूर्णपणे अशक्य आहेत. The Graph हा ब्लॉकचेन डेटाचा निर्देशांक करण्यासाठी आणि क्वेरी करण्यासाठी एक विकेंद्रित प्रोटोकॉल आहे. आणि तुम्ही कदाचित अंदाज लावला असेल, तो क्वेरी भाषा म्हणून GraphQL वापरत आहे.

![The Graph](./thegraph.png)

एखादी गोष्ट समजून घेण्यासाठी उदाहरणे नेहमीच सर्वोत्तम असतात, त्यामुळे आपण आपल्या GameContract उदाहरणासाठी The Graph वापरूया.

## सबग्राफ कसा तयार करायचा {#how-to-create-a-subgraph}

डेटाचा निर्देशांक कसा करायचा याच्या व्याख्येला सबग्राफ म्हणतात. यासाठी तीन घटकांची आवश्यकता असते:

1. मॅनिफेस्ट (`subgraph.yaml`)
2. स्कीमा (`schema.graphql`)
3. मॅपिंग (`mapping.ts`)

### मॅनिफेस्ट (`subgraph.yaml`) {#manifest}

मॅनिफेस्ट ही आपली कॉन्फिगरेशन फाईल आहे आणि ती खालील गोष्टी परिभाषित करते:

- कोणत्या स्मार्ट कॉन्ट्रॅक्ट्सचा निर्देशांक करायचा (पत्ता, नेटवर्क, ABI...)
- कोणत्या घटना ऐकायच्या
- फंक्शन कॉल्स किंवा ब्लॉक्ससारख्या ऐकण्यासाठीच्या इतर गोष्टी
- कॉल केली जाणारी मॅपिंग फंक्शन्स (खाली `mapping.ts` पहा)

तुम्ही येथे अनेक कॉन्ट्रॅक्ट्स आणि हँडलर्स परिभाषित करू शकता. एका ठराविक सेटअपमध्ये Hardhat प्रोजेक्टच्या आत स्वतःच्या रिपॉझिटरीसह एक सबग्राफ फोल्डर असेल. त्यानंतर तुम्ही सहजपणे ABI चा संदर्भ देऊ शकता.

सोयीसाठी तुम्हाला mustache सारखे टेम्पलेट टूल देखील वापरायचे असेल. त्यानंतर तुम्ही `subgraph.template.yaml` तयार करता आणि नवीनतम प्रस्थापनांवर आधारित पत्ते समाविष्ट करता. अधिक प्रगत उदाहरण सेटअपसाठी, उदाहरणार्थ [आवे सबग्राफ रेपो](https://github.com/aave/aave-protocol/tree/master/thegraph) पहा.

आणि संपूर्ण दस्तऐवजीकरण [येथे](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) पाहिले जाऊ शकते.

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

### स्कीमा (`schema.graphql`) {#schema}

स्कीमा ही GraphQL डेटा व्याख्या आहे. हे तुम्हाला कोणत्या एंटिटीज अस्तित्वात आहेत आणि त्यांचे प्रकार परिभाषित करण्याची अनुमती देईल. The Graph द्वारे समर्थित प्रकार खालीलप्रमाणे आहेत

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

संबंध परिभाषित करण्यासाठी तुम्ही एंटिटीजचा प्रकार म्हणून देखील वापर करू शकता. आपल्या उदाहरणामध्ये आपण खेळाडूपासून पैजांपर्यंत 1-ते-अनेक संबंध परिभाषित करतो. ! चा अर्थ असा आहे की मूल्य रिक्त असू शकत नाही. संपूर्ण दस्तऐवजीकरण [येथे](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) पाहिले जाऊ शकते.

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

### मॅपिंग (`mapping.ts`) {#mapping}

The Graph मधील मॅपिंग फाईल आपली फंक्शन्स परिभाषित करते जी येणाऱ्या घटनांचे एंटिटीजमध्ये रूपांतर करतात. हे AssemblyScript मध्ये लिहिले आहे, जे TypeScript चा एक उपसंच आहे. याचा अर्थ मॅपिंगच्या अधिक कार्यक्षम आणि पोर्टेबल अंमलबजावणीसाठी ते WASM (WebAssembly) मध्ये संकलित केले जाऊ शकते.

तुम्हाला `subgraph.yaml` फाईलमध्ये नाव दिलेले प्रत्येक फंक्शन परिभाषित करावे लागेल, त्यामुळे आपल्या बाबतीत आपल्याला फक्त एकाची आवश्यकता आहे: `handleNewBet`. आपण प्रथम प्रेषकाच्या पत्त्यावरून id म्हणून Player एंटिटी लोड करण्याचा प्रयत्न करतो. जर ती अस्तित्वात नसेल, तर आपण एक नवीन एंटिटी तयार करतो आणि ती सुरुवातीच्या मूल्यांसह भरतो.

त्यानंतर आपण एक नवीन Bet एंटिटी तयार करतो. यासाठीचा id `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` असेल जो नेहमी एक अद्वितीय मूल्य सुनिश्चित करेल. फक्त हॅश वापरणे पुरेसे नाही कारण कोणीतरी स्मार्ट कॉन्ट्रॅक्टद्वारे एकाच व्यवहारामध्ये placeBet फंक्शनला अनेक वेळा कॉल करत असू शकते.

शेवटी आपण सर्व डेटासह Player एंटिटी अपडेट करू शकतो. ॲरेज थेट पुश केले जाऊ शकत नाहीत, परंतु येथे दाखवल्याप्रमाणे अपडेट करणे आवश्यक आहे. आपण पैजेचा संदर्भ देण्यासाठी id वापरतो. आणि एंटिटी साठवण्यासाठी शेवटी `.save()` आवश्यक आहे.

संपूर्ण दस्तऐवजीकरण येथे पाहिले जाऊ शकते: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. तुम्ही मॅपिंग फाईलमध्ये लॉगिंग आउटपुट देखील जोडू शकता, [येथे](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) पहा.

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // अद्याप अस्तित्वात नसल्यास तयार करा
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

  // अ‍ॅरे याप्रमाणे अपडेट करा
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## फ्रंटएंडमध्ये याचा वापर करणे {#using-it-in-the-frontend}

Apollo Boost सारखे काहीतरी वापरून, तुम्ही तुमच्या React dapp (किंवा Apollo-Vue) मध्ये The Graph सहजपणे समाकलित करू शकता. विशेषतः React हुक्स आणि Apollo वापरताना, डेटा मिळवणे हे तुमच्या घटकामध्ये एकच GraphQL क्वेरी लिहिण्याइतके सोपे आहे. एक ठराविक सेटअप असा दिसू शकतो:

```javascript
// सर्व सबग्राफ पहा: https://thegraph.com/explorer/
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

आणि आता आपण उदाहरणार्थ अशी क्वेरी लिहू शकतो. हे आपल्याला मिळवून देईल

- सध्याचा वापरकर्ता किती वेळा जिंकला आहे
- सध्याचा वापरकर्ता किती वेळा हरला आहे
- त्याच्या सर्व मागील पैजांसह टाइमस्टॅम्पची सूची

हे सर्व GraphQL सर्व्हरला केलेल्या एकाच विनंतीमध्ये.

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

पण आपण कोड्याचा एक शेवटचा भाग विसरत आहोत आणि तो म्हणजे सर्व्हर. तुम्ही एकतर तो स्वतः चालवू शकता किंवा होस्ट केलेल्या सेवेचा वापर करू शकता.

## The Graph सर्व्हर {#the-graph-server}

### Graph Explorer: होस्ट केलेली सेवा {#graph-explorer-the-hosted-service}

सर्वात सोपा मार्ग म्हणजे होस्ट केलेली सेवा वापरणे. सबग्राफ प्रस्थापित करण्यासाठी [येथील](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) सूचनांचे अनुसरण करा. बऱ्याच प्रोजेक्ट्ससाठी तुम्हाला [एक्सप्लोररमध्ये](https://thegraph.com/explorer/) आधीच अस्तित्वात असलेले सबग्राफ्स मिळू शकतात.

![The Graph-Explorer](./thegraph-explorer.png)

### स्वतःचा नोड चालवणे {#running-your-own-node}

पर्यायाने तुम्ही तुमचा स्वतःचा नोड चालवू शकता. दस्तऐवज [येथे](https://github.com/graphprotocol/graph-node#quick-start) आहेत. असे करण्याचे एक कारण असे नेटवर्क वापरणे असू शकते जे होस्ट केलेल्या सेवेद्वारे समर्थित नाही. सध्या समर्थित नेटवर्क्स [येथे आढळू शकतात](https://thegraph.com/docs/en/developing/supported-networks/).

## विकेंद्रित भविष्य {#the-decentralized-future}

GraphQL नव्याने येणाऱ्या घटनांसाठी स्ट्रीम्सना देखील समर्थन देते. हे ग्राफवर [Substreams](https://thegraph.com/docs/en/substreams/) द्वारे समर्थित आहेत जे सध्या ओपन बीटामध्ये आहेत.

[2021](https://thegraph.com/blog/mainnet-migration/) मध्ये The Graph ने विकेंद्रित इंडेक्सिंग नेटवर्ककडे आपले संक्रमण सुरू केले. या विकेंद्रित इंडेक्सिंग नेटवर्कच्या आर्किटेक्चरबद्दल तुम्ही [येथे](https://thegraph.com/docs/en/network/explorer/) अधिक वाचू शकता.

दोन प्रमुख पैलू आहेत:

1. वापरकर्ते क्वेरींसाठी इंडेक्सर्सना पैसे देतात.
2. इंडेक्सर्स Graph Tokens (GRT) स्टेक करतात.