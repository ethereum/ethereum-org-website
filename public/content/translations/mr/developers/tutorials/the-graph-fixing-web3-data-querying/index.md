---
title: "द ग्राफ: Web3 डेटा क्वेरींग दुरुस्त करणे"
description: ब्लॉकचेन एका डेटाबेससारखे आहे पण SQL शिवाय. सर्व डेटा तिथे आहे, पण त्यावर प्रवेश करण्याचा कोणताही मार्ग नाही. मी तुम्हाला दाखवतो की द ग्राफ आणि GraphQL वापरून हे कसे दुरुस्त करायचे.
author: Markus Waas
lang: mr
tags:
  [
    "सॉलिडिटी",
    "स्मार्ट कॉन्ट्रॅक्ट",
    "querying",
    "द ग्राफ",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

यावेळी आपण द ग्राफवर अधिक बारकाईने नजर टाकूया जे गेल्या वर्षात dapps विकसित करण्यासाठी स्टँडर्ड स्टॅकचा एक भाग बनले आहे. चला आधी पाहूया की आपण पारंपारिक पद्धतीने गोष्टी कशा करतो...

## द ग्राफ शिवाय... {#without-the-graph}

तर, उदाहरणासाठी आपण एक सोपे उदाहरण घेऊया. आपल्या सर्वांना गेम्स आवडतात, म्हणून एका साध्या गेमची कल्पना करा जिथे वापरकर्ते बेट लावतात:

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
            require(success, "हस्तांतरण अयशस्वी झाले");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

आता समजा आपल्या dapp मध्ये, आपल्याला एकूण बेट्स, एकूण हरलेले/जिंकलेले गेम्स दाखवायचे आहेत आणि जेव्हा कोणी पुन्हा खेळेल तेव्हा ते अपडेट करायचे आहे. यासाठी दृष्टिकोन असा असेल:

1. `totalGamesPlayerWon` फेच करा.
2. `totalGamesPlayerLost` फेच करा.
3. `BetPlaced` इव्हेंट्सला सबस्क्राइब करा.

आपण उजवीकडे दाखवल्याप्रमाणे [Web3 मधील इव्हेंट](https://docs.web3js.org/api/web3/class/Contract#events) ऐकू शकतो, परंतु यासाठी बरीच प्रकरणे हाताळण्याची आवश्यकता आहे.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // इव्हेंट फायर झाला
})
.on('changed', function(event) {
    // इव्हेंट पुन्हा काढला गेला
})
.on('error', function(error, receipt) {
    // tx नाकारले
});
```

आता हे आपल्या साध्या उदाहरणासाठी काही प्रमाणात ठीक आहे. पण समजा आपल्याला आता फक्त सध्याच्या खेळाडूसाठी हरलेल्या/जिंकलेल्या बेट्सची रक्कम दाखवायची आहे. ठीक आहे, आपले नशीब खराब आहे, तुम्ही एक नवीन कॉन्ट्रॅक्ट तैनात करणे चांगले आहे जे ती मूल्ये संग्रहित करते आणि त्यांना फेच करते. आणि आता एका अधिक गुंतागुंतीच्या स्मार्ट कॉन्ट्रॅक्ट आणि dapp ची कल्पना करा, गोष्टी पटकन गोंधळात टाकू शकतात.

![कोणीही फक्त क्वेरी करू शकत नाही](./one-does-not-simply-query.jpg)

तुम्ही पाहू शकता की हे इष्टतम कसे नाही:

- आधीच तैनात केलेल्या कॉन्ट्रॅक्ट्ससाठी काम करत नाही.
- ती मूल्ये संग्रहित करण्यासाठी अतिरिक्त गॅस खर्च.
- एका Ethereum नोडसाठी डेटा फेच करण्यासाठी दुसऱ्या कॉलची आवश्यकता आहे.

![हे पुरेसे चांगले नाही](./not-good-enough.jpg)

आता एका चांगल्या समाधानाकडे पाहूया.

## मी तुम्हाला GraphQL ची ओळख करून देतो {#let-me-introduce-to-you-graphql}

प्रथम GraphQL बद्दल बोलूया, जे मूळतः फेसबुकद्वारे डिझाइन आणि अंमलात आणले गेले होते. तुम्ही पारंपारिक REST API मॉडेलशी परिचित असाल. आता त्याऐवजी कल्पना करा की तुम्ही तुम्हाला हव्या असलेल्या डेटासाठी एक क्वेरी लिहू शकता:

![GraphQL API विरुद्ध REST API](./graphql.jpg)

![](./graphql-query.gif)

दोन प्रतिमा बऱ्यापैकी GraphQL चे सार दर्शवतात. उजवीकडील क्वेरीसह आपण आपल्याला नक्की कोणता डेटा हवा आहे हे परिभाषित करू शकतो, त्यामुळे तिथे आपल्याला एकाच विनंतीत सर्वकाही मिळते आणि आपल्याला जे हवे आहे त्यापेक्षा जास्त काही नाही. एक GraphQL सर्व्हर आवश्यक असलेला सर्व डेटा फेच करणे हाताळतो, त्यामुळे फ्रंटएंड ग्राहक बाजूसाठी वापरणे अविश्वसनीयपणे सोपे आहे. तुम्हाला स्वारस्य असल्यास, सर्व्हर क्वेरी नक्की कशी हाताळतो याचे [हे एक छान स्पष्टीकरण आहे](https://www.apollographql.com/blog/graphql-explained).

आता त्या ज्ञानासह, चला अखेरीस ब्लॉकचेन क्षेत्रात आणि द ग्राफमध्ये उडी घेऊया.

## द ग्राफ काय आहे? {#what-is-the-graph}

ब्लॉकचेन एक विकेंद्रित डेटाबेस आहे, पण सामान्यतः जे घडते त्याच्या विपरीत, आपल्याकडे या डेटाबेससाठी क्वेरी भाषा नाही. डेटा पुनर्प्राप्त करण्याचे उपाय वेदनादायक किंवा पूर्णपणे अशक्य आहेत. द ग्राफ हा ब्लॉकचेन डेटाची अनुक्रमणिका आणि क्वेरी करण्यासाठी एक विकेंद्रित प्रोटोकॉल आहे. आणि तुम्ही अंदाज लावला असेलच, ते क्वेरी भाषा म्हणून GraphQL वापरत आहे.

![द ग्राफ](./thegraph.png)

काहीतरी समजण्यासाठी उदाहरणे नेहमीच सर्वोत्तम असतात, म्हणून चला आपल्या GameContract उदाहरणासाठी द ग्राफ वापरूया.

## सबग्राफ कसा तयार करावा {#how-to-create-a-subgraph}

डेटाची अनुक्रमणिका कशी करावी याच्या व्याख्येला सबग्राफ म्हणतात. यासाठी तीन घटक आवश्यक आहेत:

1. मॅनिफेस्ट (`subgraph.yaml`)
2. स्कीमा (`schema.graphql`)
3. मॅपिंग (`mapping.ts`)

### मॅनिफेस्ट (`subgraph.yaml`) {#manifest}

मॅनिफेस्ट ही आपली कॉन्फिगरेशन फाईल आहे आणि ती परिभाषित करते:

- कोणत्या स्मार्ट कॉन्ट्रॅक्ट्सची अनुक्रमणिका करायची (पत्ता, नेटवर्क, ABI...)
- कोणते इव्हेंट्स ऐकायचे
- ऐकण्यासाठी इतर गोष्टी जसे की फंक्शन कॉल्स किंवा ब्लॉक्स
- कॉल केली जात असलेली मॅपिंग फंक्शन्स (खाली `mapping.ts` पहा)

तुम्ही येथे अनेक कॉन्ट्रॅक्ट्स आणि हँडलर्स परिभाषित करू शकता. एक सामान्य सेटअप Hardhat प्रोजेक्टच्या आत एक सबग्राफ फोल्डर असेल, त्याच्या स्वतःच्या रेपॉजिटरीसह. मग तुम्ही सहजपणे ABI चा संदर्भ घेऊ शकता.

सोयीसाठी तुम्ही मस्टॅशसारखे टेम्पलेट टूल देखील वापरू शकता. मग तुम्ही एक `subgraph.template.yaml` तयार करता आणि नवीनतम डिप्लॉयमेंट्सवर आधारित पत्ते घालता. अधिक प्रगत उदाहरण सेटअपसाठी, उदाहरणार्थ [Aave सबग्राफ रेपो](https://github.com/aave/aave-protocol/tree/master/thegraph) पहा.

आणि संपूर्ण डॉक्युमेंटेशन [येथे](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) पाहिले जाऊ शकते.

```yaml
specVersion: 0.0.1
description: Ethereum वर बेट्स लावणे
repository: - GitHub लिंक -
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

स्कीमा ही GraphQL डेटाची व्याख्या आहे. हे तुम्हाला कोणत्या एंटिटी अस्तित्वात आहेत आणि त्यांचे प्रकार परिभाषित करण्याची परवानगी देईल. द ग्राफ मधील समर्थित प्रकार आहेत

- बाइट्स
- ID
- स्ट्रिंग
- बूलियन
- इंट
- बिगइंट
- बिगडेसिमल

तुम्ही संबंध परिभाषित करण्यासाठी एंटिटीचा प्रकार म्हणून देखील वापरू शकता. आपल्या उदाहरणात आपण खेळाडूपासून बेट्सपर्यंत 1-ते-अनेक संबंध परिभाषित करतो. ! याचा अर्थ मूल्य रिक्त असू शकत नाही. संपूर्ण डॉक्युमेंटेशन [येथे](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) पाहिले जाऊ शकते.

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

द ग्राफमधील मॅपिंग फाईल येणाऱ्या इव्हेंट्सला एंटिटीमध्ये रूपांतरित करणारी आपली फंक्शन्स परिभाषित करते. हे AssemblyScript मध्ये लिहिलेले आहे, जे Typescript चा उपसंच आहे. याचा अर्थ मॅपिंगच्या अधिक कार्यक्षम आणि पोर्टेबल अंमलबजावणीसाठी ते WASM (WebAssembly) मध्ये संकलित केले जाऊ शकते.

तुम्हाला `subgraph.yaml` फाईलमध्ये नावाच्या प्रत्येक फंक्शनला परिभाषित करणे आवश्यक आहे, त्यामुळे आपल्या बाबतीत आपल्याला फक्त एकाची आवश्यकता आहे: `handleNewBet`. आपण प्रथम प्रेषकाच्या पत्त्यावरून आयडी म्हणून Player एंटिटी लोड करण्याचा प्रयत्न करतो. जर ते अस्तित्वात नसेल, तर आपण एक नवीन एंटिटी तयार करतो आणि ती प्रारंभिक मूल्यांनी भरतो.

मग आपण एक नवीन Bet एंटिटी तयार करतो. यासाठी आयडी `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` असेल, जे नेहमी एक अद्वितीय मूल्य सुनिश्चित करते. फक्त हॅश वापरणे पुरेसे नाही कारण कोणीतरी स्मार्ट कॉन्ट्रॅक्टद्वारे एकाच व्यवहारात placeBet फंक्शनला अनेक वेळा कॉल करू शकते.

शेवटी आपण सर्व डेटासह Player एंटिटी अपडेट करू शकतो. अॅरेमध्ये थेट पुश केले जाऊ शकत नाही, परंतु येथे दाखवल्याप्रमाणे अपडेट करणे आवश्यक आहे. आपण बेटचा संदर्भ देण्यासाठी आयडी वापरतो. आणि एंटिटी संग्रहित करण्यासाठी शेवटी `.save()` आवश्यक आहे.

संपूर्ण डॉक्युमेंटेशन येथे पाहिले जाऊ शकते: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. तुम्ही मॅपिंग फाईलमध्ये लॉगिंग आउटपुट देखील जोडू शकता, [येथे](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) पहा.

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

  // अॅरे अशाप्रकारे अपडेट करा
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## फ्रंटएंडमध्ये वापरणे {#using-it-in-the-frontend}

Apollo Boost सारखे काहीतरी वापरून, तुम्ही तुमच्या React dapp (किंवा Apollo-Vue) मध्ये द ग्राफ सहजपणे समाकलित करू शकता. विशेषतः React हुक्स आणि Apollo वापरताना, तुमच्या कंपोनेंटमध्ये एकच GraphQL क्वेरी लिहिण्याइतके डेटा फेच करणे सोपे आहे. एक सामान्य सेटअप यासारखा दिसू शकतो:

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

आणि आता आपण उदाहरणार्थ अशी क्वेरी लिहू शकतो. हे आपल्याला फेच करून देईल

- सध्याचा वापरकर्ता किती वेळा जिंकला आहे
- सध्याचा वापरकर्ता किती वेळा हरला आहे
- त्यांच्या सर्व मागील बेट्सच्या टाइमस्टॅम्पची यादी

GraphQL सर्व्हरला केलेल्या एकाच विनंतीत सर्वकाही.

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

![जादू](./magic.jpg)

पण आपण कोड्यातील एक शेवटचा तुकडा विसरत आहोत आणि तो म्हणजे सर्व्हर. तुम्ही ते स्वतः चालवू शकता किंवा होस्टेड सेवा वापरू शकता.

## द ग्राफ सर्व्हर {#the-graph-server}

### ग्राफ एक्सप्लोरर: होस्टेड सेवा {#graph-explorer-the-hosted-service}

सर्वात सोपा मार्ग म्हणजे होस्टेड सेवा वापरणे. सबग्राफ तैनात करण्यासाठी [येथील](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) सूचनांचे अनुसरण करा. अनेक प्रकल्पांसाठी तुम्ही प्रत्यक्षात [एक्सप्लोरर](https://thegraph.com/explorer/) मध्ये विद्यमान सबग्राफ शोधू शकता.

![द ग्राफ-एक्सप्लोरर](./thegraph-explorer.png)

### तुमचा स्वतःचा नोड चालवणे {#running-your-own-node}

वैकल्पिकरित्या, तुम्ही तुमचा स्वतःचा नोड चालवू शकता. डॉक्युमेंटेशन [येथे](https://github.com/graphprotocol/graph-node#quick-start). हे करण्याचे एक कारण होस्टेड सेवेद्वारे समर्थित नसलेले नेटवर्क वापरणे असू शकते. सध्या समर्थित नेटवर्क्स [येथे](https://thegraph.com/docs/en/developing/supported-networks/) आढळू शकतात.

## विकेंद्रित भविष्य {#the-decentralized-future}

GraphQL नवीन येणाऱ्या इव्हेंट्ससाठी स्ट्रीम्सला देखील समर्थन देते. हे ग्राफवर [सबस्ट्रीम्स](https://thegraph.com/docs/en/substreams/) द्वारे समर्थित आहेत, जे सध्या ओपन बीटामध्ये आहेत.

[2021](https://thegraph.com/blog/mainnet-migration/) मध्ये द ग्राफने विकेंद्रित अनुक्रमणिका नेटवर्कमध्ये संक्रमणाची सुरुवात केली. तुम्ही या विकेंद्रित अनुक्रमणिका नेटवर्कच्या आर्किटेक्चरबद्दल अधिक [येथे](https://thegraph.com/docs/en/network/explorer/) वाचू शकता.

दोन प्रमुख पैलू आहेत:

1. वापरकर्ते क्वेरीसाठी इंडेक्सर्सना पैसे देतात.
2. इंडेक्सर्स ग्राफ टोकन्स (GRT) स्टेक करतात.
