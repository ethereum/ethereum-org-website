---
title: "द ग्राफ़: Web3 डेटा क्वेरी को ठीक करना"
description: "ब्लॉकचेन एक डेटाबेस की तरह है लेकिन SQL के बिना। सारा डेटा वहीं है, लेकिन इसे एक्सेस करने का कोई तरीका नहीं है। आइए मैं आपको दिखाता हूं कि द ग्राफ़ और GraphQL के साथ इसे कैसे ठीक किया जाए।"
author: Markus Waas
lang: hi
tags:
  [
    "सोलिडीटी",
    "स्मार्ट अनुबंध",
    "क्वेरी करना",
    "द ग्राफ़",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

इस बार हम द ग्राफ़ पर करीब से नज़र डालेंगे जो अनिवार्य रूप से पिछले साल डैप्स विकसित करने के लिए मानक स्टैक का हिस्सा बन गया। आइए पहले देखें कि हम पारंपरिक तरीके से चीजें कैसे करेंगे...

## द ग्राफ़ के बिना... {#without-the-graph}

तो चलिए उदाहरण के लिए एक सरल उदाहरण लेते हैं। हम सभी को गेम पसंद हैं, इसलिए यूज़र्स द्वारा दांव लगाने वाले एक सरल गेम की कल्पना करें:

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

अब मान लीजिए कि हमारे डैप में, हम कुल दांव, हारे/जीते गए कुल गेम दिखाना चाहते हैं और जब भी कोई फिर से खेलता है तो इसे अपडेट भी करना चाहते हैं। दृष्टिकोण यह होगा:

1. `totalGamesPlayerWon` फ़ेच करें।
2. `totalGamesPlayerLost` फ़ेच करें।
3. `BetPlaced` इवेंट्स के लिए सब्सक्राइब करें।

हम दाईं ओर दिखाए गए अनुसार [Web3 में इवेंट](https://docs.web3js.org/api/web3/class/Contract#events) को सुन सकते हैं, लेकिन इसके लिए कुछ मामलों को संभालने की आवश्यकता होती है।

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // इवेंट फायर हुआ
})
.on('changed', function(event) {
    // इवेंट फिर से हटा दिया गया था
})
.on('error', function(error, receipt) {
    // tx अस्वीकृत
});
```

अब यह हमारे सरल उदाहरण के लिए कुछ हद तक ठीक है। लेकिन मान लीजिए कि हम अब केवल मौजूदा खिलाड़ी के लिए हारे/जीते गए दांव की राशि प्रदर्शित करना चाहते हैं। खैर, हमारी किस्मत खराब है, बेहतर होगा कि आप एक नया कॉन्ट्रैक्ट डिप्लॉय करें जो उन मानों को संग्रहीत करता है और उन्हें फ़ेच करता है। और अब एक बहुत अधिक जटिल स्मार्ट अनुबंध और डैप की कल्पना करें, चीजें जल्दी से गड़बड़ हो सकती हैं।

![कोई बस यूं ही क्वेरी नहीं करता](./one-does-not-simply-query.jpg)

आप देख सकते हैं कि यह इष्टतम क्यों नहीं है:

- पहले से डिप्लॉय किए गए अनुबंधों के लिए काम नहीं करता।
- उन मानों को संग्रहीत करने के लिए अतिरिक्त गैस लागत।
- एथेरियम नोड के लिए डेटा फ़ेच करने के लिए एक और कॉल की आवश्यकता है।

![यह काफी अच्छा नहीं है](./not-good-enough.jpg)

अब आइए एक बेहतर समाधान देखें।

## मैं आपको GraphQL से परिचित कराता हूँ {#let-me-introduce-to-you-graphql}

सबसे पहले GraphQL के बारे में बात करते हैं, जिसे मूल रूप से Facebook द्वारा डिज़ाइन और कार्यान्वित किया गया था। आप पारंपरिक REST API मॉडल से परिचित हो सकते हैं। अब कल्पना कीजिए कि इसके बजाय आप ठीक उसी डेटा के लिए एक क्वेरी लिख सकते हैं जो आप चाहते थे:

![GraphQL API बनाम REST API](./graphql.jpg)

![](./graphql-query.gif)

दो छवियां काफी हद तक GraphQL के सार को दर्शाती हैं। दाईं ओर की क्वेरी के साथ हम ठीक से परिभाषित कर सकते हैं कि हमें कौन सा डेटा चाहिए, इसलिए वहां हम एक ही अनुरोध में सब कुछ प्राप्त करते हैं और ठीक वही जो हमें चाहिए उससे ज्यादा कुछ नहीं। एक GraphQL सर्वर सभी आवश्यक डेटा को फ़ेच करने का काम करता है, इसलिए फ्रंटएंड उपभोक्ता पक्ष के लिए इसका उपयोग करना अविश्वसनीय रूप से आसान है। [यह एक अच्छी व्याख्या है](https://www.apollographql.com/blog/graphql-explained) कि यदि आप रुचि रखते हैं तो सर्वर वास्तव में क्वेरी को कैसे संभालता है।

अब उस ज्ञान के साथ, आइए अंत में ब्लॉकचेन स्पेस और द ग्राफ़ में कूदें।

## द ग्राफ़ क्या है? {#what-is-the-graph}

एक ब्लॉकचेन एक विकेन्द्रीकृत डेटाबेस है, लेकिन जो आमतौर पर होता है, उसके विपरीत, हमारे पास इस डेटाबेस के लिए कोई क्वेरी भाषा नहीं है। डेटा पुनर्प्राप्त करने के समाधान दर्दनाक या पूरी तरह से असंभव हैं। द ग्राफ़ ब्लॉकचेन डेटा को इंडेक्स करने और क्वेरी करने के लिए एक विकेन्द्रीकृत प्रोटोकॉल है। और आपने इसका अनुमान लगा लिया होगा, यह क्वेरी भाषा के रूप में GraphQL का उपयोग कर रहा है।

![द ग्राफ़](./thegraph.png)

किसी चीज़ को समझने के लिए उदाहरण हमेशा सबसे अच्छे होते हैं, तो चलिए हमारे GameContract उदाहरण के लिए द ग्राफ़ का उपयोग करते हैं।

## सबग्राफ़ कैसे बनाएं {#how-to-create-a-subgraph}

डेटा को कैसे इंडेक्स किया जाए इसकी परिभाषा को सबग्राफ़ कहा जाता है। इसके लिए तीन घटकों की आवश्यकता है:

1. मैनीफेस्ट (`subgraph.yaml`)
2. स्कीमा (`schema.graphql`)
3. मैपिंग (`mapping.ts`)

### मैनीफेस्ट (`subgraph.yaml`) {#manifest}

मैनीफेस्ट हमारी कॉन्फ़िगरेशन फ़ाइल है और परिभाषित करती है:

- किन स्मार्ट अनुबंधों को इंडेक्स करना है (पता, नेटवर्क, ABI...)
- कौन से इवेंट्स सुनने हैं
- सुनने के लिए अन्य चीजें जैसे फ़ंक्शन कॉल या ब्लॉक
- कॉल किए जा रहे मैपिंग फ़ंक्शन (नीचे `mapping.ts` देखें)

आप यहां कई अनुबंध और हैंडलर परिभाषित कर सकते हैं। एक विशिष्ट सेटअप में Hardhat प्रोजेक्ट के अंदर एक सबग्राफ़ फ़ोल्डर होगा जिसकी अपनी रिपॉजिटरी होगी। फिर आप आसानी से ABI को संदर्भित कर सकते हैं।

सुविधा के कारणों से आप मूंछ जैसे टेम्पलेट टूल का भी उपयोग करना चाह सकते हैं। फिर आप एक `subgraph.template.yaml` बनाते हैं और नवीनतम परिनियोजनों के आधार पर पते डालते हैं। एक अधिक उन्नत उदाहरण सेटअप के लिए, उदाहरण के लिए [Aave सबग्राफ रेपो](https://github.com/aave/aave-protocol/tree/master/thegraph) देखें।

और पूरा प्रलेखन [यहां](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) देखा जा सकता है।

```yaml
specVersion: 0.0.1
description: एथेरियम पर दांव लगाना
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

स्कीमा GraphQL डेटा परिभाषा है। यह आपको यह परिभाषित करने की अनुमति देगा कि कौन सी इकाइयां मौजूद हैं और उनके प्रकार। द ग्राफ़ से समर्थित प्रकार हैं

- बाइट्स
- ID
- स्ट्रिंग
- बूलियन
- Int
- BigInt
- BigDecimal

आप संबंधों को परिभाषित करने के लिए प्रकार के रूप में संस्थाओं का भी उपयोग कर सकते हैं। हमारे उदाहरण में हम खिलाड़ी से दांव तक 1-से-कई संबंध परिभाषित करते हैं। ! का मतलब है कि मान खाली नहीं हो सकता। पूरा प्रलेखन [यहां](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) देखा जा सकता है।

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

द ग्राफ़ में मैपिंग फ़ाइल हमारे कार्यों को परिभाषित करती है जो आने वाले इवेंट्स को संस्थाओं में बदल देती है। यह AssemblyScript में लिखा गया है, जो Typescript का एक सबसेट है। इसका मतलब है कि मैपिंग के अधिक कुशल और पोर्टेबल निष्पादन के लिए इसे WASM (WebAssembly) में संकलित किया जा सकता है।

आपको `subgraph.yaml` फ़ाइल में नामित प्रत्येक फ़ंक्शन को परिभाषित करने की आवश्यकता होगी, इसलिए हमारे मामले में हमें केवल एक की आवश्यकता है: `handleNewBet`। हम पहले आईडी के रूप में प्रेषक पते से प्लेयर इकाई को लोड करने का प्रयास करते हैं। यदि यह मौजूद नहीं है, तो हम एक नई इकाई बनाते हैं और इसे शुरुआती मानों से भरते हैं।

फिर हम एक नई दांव इकाई बनाते हैं। इसके लिए आईडी `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` होगी जो हमेशा एक अद्वितीय मान सुनिश्चित करती है। केवल हैश का उपयोग करना पर्याप्त नहीं है क्योंकि कोई स्मार्ट अनुबंध के माध्यम से एक लेनदेन में कई बार placeBet फ़ंक्शन को कॉल कर सकता है।

अंत में हम सभी डेटा के साथ प्लेयर इकाई को अपडेट कर सकते हैं। एरे को सीधे पुश नहीं किया जा सकता है, लेकिन यहां दिखाए गए अनुसार अपडेट करने की आवश्यकता है। हम दांव को संदर्भित करने के लिए आईडी का उपयोग करते हैं। और एक इकाई को संग्रहीत करने के लिए अंत में `.save()` की आवश्यकता होती है।

पूरा प्रलेखन यहां देखा जा सकता है: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings। आप मैपिंग फ़ाइल में लॉगिंग आउटपुट भी जोड़ सकते हैं, [यहां](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) देखें।

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // यदि पहले से मौजूद नहीं है तो बनाएं
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

  // इस तरह एरे को अपडेट करें
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## इसे फ्रंटएंड में उपयोग करना {#using-it-in-the-frontend}

Apollo Boost जैसी किसी चीज़ का उपयोग करके, आप आसानी से अपने React डैप (या Apollo-Vue) में द ग्राफ़ को एकीकृत कर सकते हैं। विशेष रूप से जब React हुक और Apollo का उपयोग करते हैं, तो डेटा फ़ेच करना उतना ही सरल है जितना कि आपके घटक में एक एकल GraphQL क्वेरी लिखना। एक विशिष्ट सेटअप इस तरह दिख सकता है:

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

और अब हम उदाहरण के लिए इस तरह की क्वेरी लिख सकते हैं। यह हमें फ़ेच करेगा

- वर्तमान यूज़र कितनी बार जीता है
- वर्तमान यूज़र कितनी बार हारा है
- उसके सभी पिछले दांव के साथ टाइमस्टैम्प की एक सूची

सभी एक ही अनुरोध में GraphQL सर्वर को।

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

लेकिन हम पहेली का एक आखिरी टुकड़ा खो रहे हैं और वह है सर्वर। आप या तो इसे स्वयं चला सकते हैं या होस्टेड सेवा का उपयोग कर सकते हैं।

## द ग्राफ़ सर्वर {#the-graph-server}

### ग्राफ़ एक्सप्लोरर: होस्ट की गई सेवा {#graph-explorer-the-hosted-service}

सबसे आसान तरीका होस्ट की गई सेवा का उपयोग करना है। सबग्राफ को डिप्लॉय करने के लिए [यहां](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) दिए गए निर्देशों का पालन करें। कई परियोजनाओं के लिए आप वास्तव में [एक्सप्लोरर](https://thegraph.com/explorer/) में मौजूदा सबग्राफ पा सकते हैं।

![द ग्राफ़-एक्सप्लोरर](./thegraph-explorer.png)

### अपना खुद का नोड चलाना {#running-your-own-node}

वैकल्पिक रूप से आप अपना खुद का नोड चला सकते हैं। डॉक्स [यहां](https://github.com/graphprotocol/graph-node#quick-start) हैं। ऐसा करने का एक कारण यह हो सकता है कि आप एक ऐसे नेटवर्क का उपयोग कर रहे हैं जो होस्ट की गई सेवा द्वारा समर्थित नहीं है। वर्तमान में समर्थित नेटवर्क [यहां मिल सकते हैं](https://thegraph.com/docs/en/developing/supported-networks/)।

## विकेंद्रीकृत भविष्य {#the-decentralized-future}

GraphQL नए आने वाले इवेंट्स के लिए भी स्ट्रीम का समर्थन करता है। ये ग्राफ पर [सबस्ट्रीम](https://thegraph.com/docs/en/substreams/) के माध्यम से समर्थित हैं जो वर्तमान में ओपन बीटा में हैं।

[2021](https://thegraph.com/blog/mainnet-migration/) में द ग्राफ़ ने एक विकेन्द्रीकृत इंडेक्सिंग नेटवर्क में अपना संक्रमण शुरू किया। आप इस विकेन्द्रीकृत इंडेक्सिंग नेटवर्क की वास्तुकला के बारे में [यहां](https://thegraph.com/docs/en/network/explorer/) और अधिक पढ़ सकते हैं।

दो प्रमुख पहलू हैं:

1. यूज़र्स प्रश्नों के लिए इंडेक्सर्स को भुगतान करते हैं।
2. इंडेक्सर्स ग्राफ़ टोकन (GRT) को स्टेक करते हैं।
