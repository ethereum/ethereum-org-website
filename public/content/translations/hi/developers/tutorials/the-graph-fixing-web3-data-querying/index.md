---
title: "The Graph: Web3 डेटा क्वेरी करने की समस्या को ठीक करना"
description: "ब्लॉकचेन एक डेटाबेस की तरह है लेकिन SQL के बिना। सारा डेटा वहां है, लेकिन इसे एक्सेस करने का कोई तरीका नहीं है। आइए मैं आपको दिखाता हूं कि The Graph और GraphQL के साथ इसे कैसे ठीक किया जाए।"
author: "मार्कस वास"
lang: hi
tags: ["Solidity", "स्मार्ट अनुबंध", "क्वेरी करना", "the graph", "React"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

इस बार हम The Graph पर करीब से नज़र डालेंगे जो अनिवार्य रूप से पिछले साल विकेंद्रीकृत एप्लिकेशन (dapp) विकसित करने के लिए मानक स्टैक का हिस्सा बन गया है। आइए पहले देखें कि हम पारंपरिक तरीके से चीजों को कैसे करेंगे...

## The Graph के बिना... {#without-the-graph}

तो आइए उदाहरण के लिए एक सरल उदाहरण लेते हैं। हम सभी को गेम पसंद हैं, इसलिए एक ऐसे सरल गेम की कल्पना करें जिसमें उपयोगकर्ता दांव लगाते हैं:

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

अब मान लीजिए कि हमारे dapp में, हम कुल दांव, हारे/जीते गए कुल गेम प्रदर्शित करना चाहते हैं और जब भी कोई फिर से खेलता है तो इसे अपडेट भी करना चाहते हैं। इसका तरीका यह होगा:

1. `totalGamesPlayerWon` प्राप्त करें।
2. `totalGamesPlayerLost` प्राप्त करें।
3. `BetPlaced` घटनाओं की सदस्यता लें।

हम दाईं ओर दिखाए गए अनुसार [Web3 में घटना](https://docs.web3js.org/api/web3/class/Contract#events) को सुन सकते हैं, लेकिन इसके लिए काफी कुछ मामलों को संभालने की आवश्यकता होती है।

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // घटना ट्रिगर हुई
})
.on('changed', function(event) {
    // घटना फिर से हटा दी गई
})
.on('error', function(error, receipt) {
    // लेन-देन अस्वीकार कर दिया गया
});
```

अब यह हमारे सरल उदाहरण के लिए अभी भी कुछ हद तक ठीक है। लेकिन मान लीजिए कि अब हम केवल वर्तमान खिलाड़ी के लिए हारे/जीते गए दांव की राशि प्रदर्शित करना चाहते हैं। खैर, हमारी किस्मत खराब है, बेहतर होगा कि आप एक नया अनुबंध तैनात करें जो उन मानों को संग्रहीत करता हो और उन्हें प्राप्त करता हो। और अब एक बहुत अधिक जटिल स्मार्ट अनुबंध और dapp की कल्पना करें, चीजें जल्दी ही अस्त-व्यस्त हो सकती हैं।

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

आप देख सकते हैं कि यह सबसे अच्छा तरीका क्यों नहीं है:

- पहले से तैनात अनुबंधों के लिए काम नहीं करता है।
- उन मानों को संग्रहीत करने के लिए अतिरिक्त गैस की लागत।
- इथेरियम नोड के लिए डेटा प्राप्त करने के लिए एक और कॉल की आवश्यकता होती है।

![Thats not good enough](./not-good-enough.jpg)

अब आइए एक बेहतर समाधान देखें।

## आइए मैं आपको GraphQL से परिचित कराता हूँ {#let-me-introduce-to-you-graphql}

सबसे पहले आइए GraphQL के बारे में बात करते हैं, जिसे मूल रूप से फेसबुक द्वारा डिज़ाइन और कार्यान्वित किया गया था। आप पारंपरिक REST API मॉडल से परिचित हो सकते हैं। अब कल्पना करें कि इसके बजाय आप ठीक उसी डेटा के लिए एक क्वेरी लिख सकते हैं जो आप चाहते थे:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

ये दोनों चित्र काफी हद तक GraphQL के सार को पकड़ते हैं। दाईं ओर की क्वेरी के साथ हम ठीक से परिभाषित कर सकते हैं कि हमें कौन सा डेटा चाहिए, इसलिए वहां हमें एक ही अनुरोध में सब कुछ मिल जाता है और हमें जो चाहिए उससे अधिक कुछ नहीं मिलता। एक GraphQL सर्वर आवश्यक सभी डेटा प्राप्त करने का काम संभालता है, इसलिए फ्रंटएंड उपभोक्ता पक्ष के लिए इसका उपयोग करना अविश्वसनीय रूप से आसान है। यदि आप रुचि रखते हैं तो [यह एक अच्छी व्याख्या है](https://www.apollographql.com/blog/graphql-explained) कि सर्वर वास्तव में किसी क्वेरी को कैसे संभालता है।

अब उस ज्ञान के साथ, आइए अंततः ब्लॉकचेन स्पेस और The Graph में कूदें।

## The Graph क्या है? {#what-is-the-graph}

ब्लॉकचेन एक विकेंद्रीकृत डेटाबेस है, लेकिन आमतौर पर जो होता है उसके विपरीत, हमारे पास इस डेटाबेस के लिए कोई क्वेरी भाषा नहीं है। डेटा प्राप्त करने के समाधान दर्दनाक या पूरी तरह से असंभव हैं। The Graph ब्लॉकचेन डेटा को इंडेक्स करने और क्वेरी करने के लिए एक विकेंद्रीकृत प्रोटोकॉल है। और जैसा कि आपने अनुमान लगाया होगा, यह क्वेरी भाषा के रूप में GraphQL का उपयोग कर रहा है।

![The Graph](./thegraph.png)

किसी चीज़ को समझने के लिए उदाहरण हमेशा सबसे अच्छे होते हैं, इसलिए आइए अपने GameContract उदाहरण के लिए The Graph का उपयोग करें।

## सबग्राफ कैसे बनाएं {#how-to-create-a-subgraph}

डेटा को कैसे इंडेक्स करना है, इसकी परिभाषा को सबग्राफ कहा जाता है। इसके लिए तीन घटकों की आवश्यकता होती है:

1. मेनिफेस्ट (`subgraph.yaml`)
2. स्कीमा (`schema.graphql`)
3. मैपिंग (`mapping.ts`)

### मेनिफेस्ट (`subgraph.yaml`) {#manifest}

मेनिफेस्ट हमारी कॉन्फ़िगरेशन फ़ाइल है और यह परिभाषित करती है:

- किन स्मार्ट अनुबंधों को इंडेक्स करना है (पता, नेटवर्क, ABI...)
- किन घटनाओं को सुनना है
- सुनने के लिए अन्य चीजें जैसे फ़ंक्शन कॉल या ब्लॉक
- कॉल किए जा रहे मैपिंग फ़ंक्शन (नीचे `mapping.ts` देखें)

आप यहां कई अनुबंधों और हैंडलर को परिभाषित कर सकते हैं। एक विशिष्ट सेटअप में Hardhat प्रोजेक्ट के अंदर अपनी स्वयं की रिपॉजिटरी के साथ एक सबग्राफ फ़ोल्डर होगा। फिर आप आसानी से ABI का संदर्भ दे सकते हैं।

सुविधा के कारणों से आप mustache जैसे टेम्प्लेट टूल का भी उपयोग करना चाह सकते हैं। फिर आप एक `subgraph.template.yaml` बनाते हैं और नवीनतम तैनाती के आधार पर पते सम्मिलित करते हैं। अधिक उन्नत उदाहरण सेटअप के लिए, उदाहरण के लिए [आवे सबग्राफ रेपो](https://github.com/aave/aave-protocol/tree/master/thegraph) देखें।

और संपूर्ण दस्तावेज़ [यहाँ](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) देखे जा सकते हैं।

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

स्कीमा GraphQL डेटा परिभाषा है। यह आपको यह परिभाषित करने की अनुमति देगा कि कौन सी संस्थाएं (entities) मौजूद हैं और उनके प्रकार क्या हैं। The Graph द्वारा समर्थित प्रकार हैं:

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

आप संबंधों को परिभाषित करने के लिए संस्थाओं (entities) का उपयोग प्रकार (type) के रूप में भी कर सकते हैं। हमारे उदाहरण में हम खिलाड़ी से दांव तक 1-से-अनेक (1-to-many) संबंध परिभाषित करते हैं। ! का अर्थ है कि मान खाली नहीं हो सकता। संपूर्ण दस्तावेज़ [यहाँ](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) देखे जा सकते हैं।

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

### मैपिंग (`mapping.ts`) {#mapping}

The Graph में मैपिंग फ़ाइल हमारे उन फ़ंक्शंस को परिभाषित करती है जो आने वाली घटनाओं को संस्थाओं (entities) में बदलते हैं। यह AssemblyScript में लिखा गया है, जो TypeScript का एक सबसेट है। इसका मतलब है कि मैपिंग के अधिक कुशल और पोर्टेबल निष्पादन के लिए इसे WASM (WebAssembly) में संकलित किया जा सकता है।

आपको `subgraph.yaml` फ़ाइल में नामित प्रत्येक फ़ंक्शन को परिभाषित करने की आवश्यकता होगी, इसलिए हमारे मामले में हमें केवल एक की आवश्यकता है: `handleNewBet`। हम सबसे पहले प्रेषक के पते से id के रूप में Player संस्था को लोड करने का प्रयास करते हैं। यदि यह मौजूद नहीं है, तो हम एक नई संस्था बनाते हैं और इसे शुरुआती मानों से भरते हैं।

फिर हम एक नई Bet संस्था बनाते हैं। इसके लिए id `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` होगी जो हमेशा एक अद्वितीय मान सुनिश्चित करती है। केवल हैश का उपयोग करना पर्याप्त नहीं है क्योंकि कोई व्यक्ति स्मार्ट अनुबंध के माध्यम से एक ही लेन-देन में कई बार placeBet फ़ंक्शन को कॉल कर सकता है।

अंत में हम सभी डेटा के साथ Player संस्था को अपडेट कर सकते हैं। एरे (Arrays) को सीधे पुश नहीं किया जा सकता है, बल्कि उन्हें यहां दिखाए गए अनुसार अपडेट करने की आवश्यकता है। हम दांव को संदर्भित करने के लिए id का उपयोग करते हैं। और किसी संस्था को संग्रहीत करने के लिए अंत में `.save()` की आवश्यकता होती है।

संपूर्ण दस्तावेज़ यहाँ देखे जा सकते हैं: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings। आप मैपिंग फ़ाइल में लॉगिंग आउटपुट भी जोड़ सकते हैं, [यहाँ](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) देखें।

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // यदि अभी तक मौजूद नहीं है तो बनाएं
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

  // ऐरे को इस तरह अपडेट करें
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## फ्रंटएंड में इसका उपयोग करना {#using-it-in-the-frontend}

Apollo Boost जैसी किसी चीज़ का उपयोग करके, आप आसानी से अपने React dapp (या Apollo-Vue) में The Graph को एकीकृत कर सकते हैं। विशेष रूप से React हुक्स और Apollo का उपयोग करते समय, डेटा प्राप्त करना उतना ही सरल है जितना कि आपके घटक (component) में एक एकल GraphQL क्वेरी लिखना। एक विशिष्ट सेटअप कुछ इस तरह दिख सकता है:

```javascript
// सभी सबग्राफ देखें: https://thegraph.com/explorer/
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

और अब हम उदाहरण के लिए इस तरह की एक क्वेरी लिख सकते हैं। यह हमारे लिए प्राप्त करेगा:

- वर्तमान उपयोगकर्ता कितनी बार जीता है
- वर्तमान उपयोगकर्ता कितनी बार हारा है
- उसके सभी पिछले दांवों के साथ टाइमस्टैम्प की एक सूची

GraphQL सर्वर से एक ही अनुरोध में यह सब।

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

लेकिन हम पहेली का एक आखिरी टुकड़ा भूल रहे हैं और वह है सर्वर। आप या तो इसे स्वयं चला सकते हैं या होस्ट की गई सेवा का उपयोग कर सकते हैं।

## The Graph सर्वर {#the-graph-server}

### Graph Explorer: होस्ट की गई सेवा {#graph-explorer-the-hosted-service}

सबसे आसान तरीका होस्ट की गई सेवा का उपयोग करना है। सबग्राफ तैनात करने के लिए [यहाँ](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) दिए गए निर्देशों का पालन करें। कई प्रोजेक्ट्स के लिए आप वास्तव में [एक्सप्लोरर](https://thegraph.com/explorer/) में मौजूदा सबग्राफ पा सकते हैं।

![The Graph-Explorer](./thegraph-explorer.png)

### अपना स्वयं का नोड चलाना {#running-your-own-node}

वैकल्पिक रूप से आप अपना स्वयं का नोड चला सकते हैं। दस्तावेज़ [यहाँ](https://github.com/graphprotocol/graph-node#quick-start) हैं। ऐसा करने का एक कारण ऐसे नेटवर्क का उपयोग करना हो सकता है जो होस्ट की गई सेवा द्वारा समर्थित नहीं है। वर्तमान में समर्थित नेटवर्क [यहाँ पाए जा सकते हैं](https://thegraph.com/docs/en/developing/supported-networks/)।

## विकेंद्रीकृत भविष्य {#the-decentralized-future}

GraphQL नई आने वाली घटनाओं के लिए स्ट्रीम का भी समर्थन करता है। ये ग्राफ़ पर [Substreams](https://thegraph.com/docs/en/substreams/) के माध्यम से समर्थित हैं जो वर्तमान में ओपन बीटा में हैं।

[2021](https://thegraph.com/blog/mainnet-migration/) में The Graph ने विकेंद्रीकृत इंडेक्सिंग नेटवर्क में अपना संक्रमण शुरू किया। आप इस विकेंद्रीकृत इंडेक्सिंग नेटवर्क की वास्तुकला के बारे में [यहाँ](https://thegraph.com/docs/en/network/explorer/) अधिक पढ़ सकते हैं।

दो प्रमुख पहलू हैं:

1. उपयोगकर्ता क्वेरी के लिए इंडेक्सर को भुगतान करते हैं।
2. इंडेक्सर Graph Tokens (GRT) को स्टेक करते हैं।