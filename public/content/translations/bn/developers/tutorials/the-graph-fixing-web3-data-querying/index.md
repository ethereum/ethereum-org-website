---
title: "দ্য গ্রাফ: Web3 ডেটা কোয়েরি করা ঠিক করা"
description: ব্লকচেইন একটি ডেটাবেসের মতো কিন্তু SQL ছাড়া। সমস্ত ডেটা সেখানে আছে, কিন্তু এটি অ্যাক্সেস করার কোনো উপায় নেই। আমাকে দেখাতে দিন যে কিভাবে The Graph এবং GraphQL দিয়ে এটি ঠিক করতে হয়।
author: Markus Waas
lang: bn
tags:
  [
    "সলিডিটি",
    "স্মার্ট কন্ট্র্যাক্ট",
    "querying",
    "দ্য গ্রাফ",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

এইবার আমরা The Graph-কে আরও কাছ থেকে দেখব যা মূলত গত বছরে ডিএ্যাপস ডেভেলপ করার জন্য স্ট্যান্ডার্ড স্ট্যাকের একটি অংশ হয়ে উঠেছে। আসুন প্রথমে দেখি আমরা কিভাবে ঐতিহ্যগত উপায়ে কাজগুলো করব...

## The Graph ছাড়া... {#without-the-graph}

সুতরাং আসুন উদাহরণের উদ্দেশ্যে একটি সহজ উদাহরণ দিয়ে শুরু করি। আমরা সবাই গেম পছন্দ করি, তাই ব্যবহারকারীদের বাজি রাখার সাথে একটি সহজ গেম কল্পনা করুন:

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

এখন ধরা যাক আমাদের ডিএ্যাপে, আমরা মোট বাজি, মোট হারানো/জেতা গেমগুলি প্রদর্শন করতে চাই এবং যখনই কেউ আবার খেলে তখন এটি আপডেট করতে চাই। পন্থাটি হবে:

1. `totalGamesPlayerWon` আনুন।
2. `totalGamesPlayerLost` আনুন।
3. `BetPlaced` ইভেন্টগুলিতে সাবস্ক্রাইব করুন।

ডানদিকে দেখানো হিসাবে আমরা [Web3-তে ইভেন্টটি](https://docs.web3js.org/api/web3/class/Contract#events) শুনতে পারি, কিন্তু এর জন্য বেশ কয়েকটি কেস পরিচালনা করা প্রয়োজন।

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // ইভেন্ট ফায়ার হয়েছে
})
.on('changed', function(event) {
    // ইভেন্ট আবার সরানো হয়েছে
})
.on('error', function(error, receipt) {
    // tx প্রত্যাখ্যাত হয়েছে
});
```

এখন আমাদের সহজ উদাহরণের জন্য এটি এখনও কিছুটা ঠিক আছে। কিন্তু ধরা যাক আমরা এখন শুধুমাত্র বর্তমান প্লেয়ারের জন্য হারানো/জেতা বাজির পরিমাণ প্রদর্শন করতে চাই। আচ্ছা আমাদের ভাগ্য খারাপ, আপনার বরং একটি নতুন কন্ট্র্যাক্ট স্থাপন করা উচিত যা সেই মানগুলি সঞ্চয় করে এবং সেগুলি নিয়ে আসে। এবং এখন একটি অনেক বেশি জটিল স্মার্ট কন্ট্র্যাক্ট এবং ডিএ্যাপ কল্পনা করুন, জিনিসগুলি দ্রুত অগোছালো হয়ে যেতে পারে।

![সহজে কেউ কোয়েরি করে না](./one-does-not-simply-query.jpg)

আপনি দেখতে পাচ্ছেন কিভাবে এটি সর্বোত্তম নয়:

- ইতিমধ্যে স্থাপন করা কন্ট্র্যাক্টের জন্য কাজ করে না।
- সেই মানগুলি সংরক্ষণ করার জন্য অতিরিক্ত গ্যাস খরচ।
- একটি Ethereum নোডের জন্য ডেটা আনতে অন্য একটি কল প্রয়োজন।

![এটা যথেষ্ট ভালো নয়](./not-good-enough.jpg)

এখন একটি ভালো সমাধানের দিকে নজর দেওয়া যাক।

## আপনাদের সাথে GraphQL-এর পরিচয় করিয়ে দিই {#let-me-introduce-to-you-graphql}

প্রথমে GraphQL সম্পর্কে কথা বলা যাক, যা মূলত Facebook দ্বারা ডিজাইন এবং প্রয়োগ করা হয়েছিল। আপনি হয়তো ঐতিহ্যবাহী REST API মডেলের সাথে পরিচিত। এখন কল্পনা করুন পরিবর্তে আপনি ঠিক যে ডেটা চেয়েছিলেন তার জন্য একটি কোয়েরি লিখতে পারেন:

![GraphQL API বনাম REST API](./graphql.jpg)

![](./graphql-query.gif)

দুটি ছবি GraphQL-এর সারমর্মকে বেশ ভালোভাবে তুলে ধরেছে। ডানদিকের কোয়েরিটির সাহায্যে আমরা ঠিক কোন ডেটা চাই তা নির্ধারণ করতে পারি, তাই সেখানে আমরা একটি অনুরোধে সবকিছু পাই এবং আমাদের যা প্রয়োজন তার থেকে বেশি কিছু নয়। একটি GraphQL সার্ভার প্রয়োজনীয় সমস্ত ডেটা আনার কাজ পরিচালনা করে, তাই এটি ফ্রন্টএন্ড গ্রাহক পক্ষের জন্য ব্যবহার করা অবিশ্বাস্যভাবে সহজ। আপনি যদি আগ্রহী হন তবে সার্ভারটি ঠিক কিভাবে একটি কোয়েরি পরিচালনা করে তার [এটি একটি চমৎকার ব্যাখ্যা](https://www.apollographql.com/blog/graphql-explained)।

এখন সেই জ্ঞানের সাথে, আসুন অবশেষে ব্লকচেইন স্পেস এবং The Graph-এ প্রবেশ করি।

## The Graph কি? {#what-is-the-graph}

একটি ব্লকচেইন একটি বিকেন্দ্রীভূত ডেটাবেস, কিন্তু সাধারণত যা হয় তার বিপরীতে, আমাদের এই ডেটাবেসের জন্য কোনো কোয়েরি ল্যাঙ্গুয়েজ নেই। ডেটা পুনরুদ্ধারের সমাধানগুলি বেদনাদায়ক বা সম্পূর্ণ অসম্ভব। The Graph হল ব্লকচেইন ডেটা ইন্ডেক্সিং এবং কোয়েরি করার জন্য একটি বিকেন্দ্রীভূত প্রোটোকল। এবং আপনি হয়তো অনুমান করেছেন, এটি কোয়েরি ল্যাঙ্গুয়েজ হিসাবে GraphQL ব্যবহার করছে।

![দ্য গ্রাফ](./thegraph.png)

উদাহরণগুলি সবসময় কিছু বোঝার জন্য সেরা, তাই আসুন আমাদের GameContract উদাহরণের জন্য The Graph ব্যবহার করি।

## কিভাবে একটি সাবগ্রাফ তৈরি করবেন {#how-to-create-a-subgraph}

কিভাবে ডেটা ইন্ডেক্স করতে হয় তার সংজ্ঞাকে সাবগ্রাফ বলা হয়। এর জন্য তিনটি উপাদান প্রয়োজন:

1. ম্যানিফেস্ট (`subgraph.yaml`)
2. স্কিমা (`schema.graphql`)
3. ম্যাপিং (`mapping.ts`)

### ম্যানিফেস্ট (`subgraph.yaml`) {#manifest}

ম্যানিফেস্ট হল আমাদের কনফিগারেশন ফাইল এবং এটি নির্ধারণ করে:

- কোন স্মার্ট কন্ট্র্যাক্টগুলি ইন্ডেক্স করতে হবে (অ্যাড্রেস, নেটওয়ার্ক, ABI...)
- কোন ইভেন্টগুলি শুনতে হবে
- অন্যান্য জিনিস যা শুনতে হবে যেমন ফাংশন কল বা ব্লক
- যে ম্যাপিং ফাংশনগুলিকে কল করা হচ্ছে (নিচে `mapping.ts` দেখুন)

আপনি এখানে একাধিক কন্ট্র্যাক্ট এবং হ্যান্ডলার সংজ্ঞায়িত করতে পারেন। একটি সাধারণ সেটআপে Hardhat প্রকল্পের ভিতরে তার নিজস্ব সংগ্রহস্থল সহ একটি সাবগ্রাফ ফোল্ডার থাকবে। তাহলে আপনি সহজেই ABI-কে রেফারেন্স করতে পারেন।

সুবিধার কারণে আপনি mustache-এর মতো একটি টেমপ্লেট টুলও ব্যবহার করতে চাইতে পারেন। তারপর আপনি একটি `subgraph.template.yaml` তৈরি করুন এবং সর্বশেষ স্থাপনার উপর ভিত্তি করে অ্যাড্রেসগুলি সন্নিবেশ করান। আরও উন্নত উদাহরণ সেটআপের জন্য, উদাহরণস্বরূপ [Aave সাবগ্রাফ রেপো](https://github.com/aave/aave-protocol/tree/master/thegraph) দেখুন।

এবং সম্পূর্ণ ডকুমেন্টেশন [এখানে](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) দেখা যাবে।

```yaml
specVersion: 0.0.1
description: Ethereum-এ বাজি ধরা
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

### স্কিমা (`schema.graphql`) {#schema}

স্কিমা হল GraphQL ডেটা সংজ্ঞা। এটি আপনাকে কোন সত্তা বিদ্যমান এবং তাদের প্রকারগুলি সংজ্ঞায়িত করার অনুমতি দেবে। The Graph থেকে সমর্থিত প্রকারগুলি হল

- বাইট
- ID
- স্ট্রিং
- বুলিয়ান
- Int
- BigInt
- BigDecimal

আপনি সম্পর্ক সংজ্ঞায়িত করতে প্রকার হিসাবে সত্তা ব্যবহার করতে পারেন। আমাদের উদাহরণে আমরা প্লেয়ার থেকে বাজি পর্যন্ত একটি ১-থেকে-অনেক সম্পর্ক সংজ্ঞায়িত করি। ! মানে মান খালি হতে পারে না। সম্পূর্ণ ডকুমেন্টেশন [এখানে](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) দেখা যাবে।

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

### ম্যাপিং (`mapping.ts`) {#mapping}

The Graph-এর ম্যাপিং ফাইল আমাদের ফাংশনগুলিকে সংজ্ঞায়িত করে যা ইনকামিং ইভেন্টগুলিকে সত্তায় রূপান্তরিত করে। এটি AssemblyScript-এ লেখা, যা Typescript-এর একটি উপসেট। এর মানে হল ম্যাপিংয়ের আরও দক্ষ এবং পোর্টেবল এক্সিকিউশনের জন্য এটি WASM (WebAssembly)-এ কম্পাইল করা যেতে পারে।

আপনাকে `subgraph.yaml` ফাইলে নাম দেওয়া প্রতিটি ফাংশন সংজ্ঞায়িত করতে হবে, তাই আমাদের ক্ষেত্রে আমাদের কেবল একটি প্রয়োজন: `handleNewBet`। আমরা প্রথমে প্রেরকের অ্যাড্রেস থেকে প্লেয়ার সত্তাকে আইডি হিসাবে লোড করার চেষ্টা করি। যদি এটি বিদ্যমান না থাকে, আমরা একটি নতুন সত্তা তৈরি করি এবং এটিকে প্রারম্ভিক মান দিয়ে পূরণ করি।

তারপর আমরা একটি নতুন বেট সত্তা তৈরি করি। এর জন্য আইডি হবে `event.transaction.hash.toHex() + \"-\" + event.logIndex.toString()` যা সর্বদা একটি অনন্য মান নিশ্চিত করে। শুধুমাত্র হ্যাশ ব্যবহার করা যথেষ্ট নয় কারণ কেউ স্মার্ট কন্ট্র্যাক্টের মাধ্যমে একটি লেনদেনে একাধিকবার placeBet ফাংশন কল করতে পারে।

সবশেষে আমরা সমস্ত ডেটা দিয়ে প্লেয়ার সত্তা আপডেট করতে পারি। অ্যারেগুলি সরাসরি পুশ করা যায় না, তবে এখানে দেখানো হিসাবে আপডেট করা প্রয়োজন। আমরা বাজি রেফারেন্স করতে আইডি ব্যবহার করি। এবং একটি সত্তা সংরক্ষণ করার জন্য শেষে `.save()` প্রয়োজন।

সম্পূর্ণ ডকুমেন্টেশন এখানে দেখা যাবে: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings। আপনি ম্যাপিং ফাইলে লগিং আউটপুটও যোগ করতে পারেন, [এখানে](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) দেখুন।

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // যদি এখনও বিদ্যমান না থাকে তবে তৈরি করুন
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

  // এইভাবে অ্যারে আপডেট করুন
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## ফ্রন্টএন্ডে এটি ব্যবহার করা {#using-it-in-the-frontend}

Apollo Boost-এর মতো কিছু ব্যবহার করে, আপনি সহজেই আপনার React ডিএ্যাপে (বা Apollo-Vue) The Graph সংহত করতে পারেন। বিশেষ করে যখন React হুক এবং Apollo ব্যবহার করা হয়, তখন ডেটা আনা আপনার কম্পোনেন্টে একটি একক GraphQL কোয়েরি লেখার মতোই সহজ। একটি সাধারণ সেটআপ এইরকম দেখতে হতে পারে:

```javascript
// সমস্ত সাবগ্রাফ দেখুন: https://thegraph.com/explorer/
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

এবং এখন আমরা উদাহরণস্বরূপ এইরকম একটি কোয়েরি লিখতে পারি। এটি আমাদের জন্য আনবে

- বর্তমান ব্যবহারকারী কতবার জিতেছে
- বর্তমান ব্যবহারকারী কতবার হেরেছে
- তার সমস্ত পূর্ববর্তী বাজিগুলির সাথে টাইমস্ট্যাম্পগুলির একটি তালিকা

সবকিছু GraphQL সার্ভারে একটি মাত্র অনুরোধে।

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

![যাদু](./magic.jpg)

কিন্তু আমরা ধাঁধার শেষ অংশটি মিস করছি এবং তা হল সার্ভার। আপনি হয় নিজে এটি চালাতে পারেন অথবা হোস্টেড পরিষেবা ব্যবহার করতে পারেন।

## দ্য গ্রাফ সার্ভার {#the-graph-server}

### গ্রাফ এক্সপ্লোরার: হোস্টেড পরিষেবা {#graph-explorer-the-hosted-service}

সবচেয়ে সহজ উপায় হল হোস্টেড পরিষেবা ব্যবহার করা। একটি সাবগ্রাফ স্থাপন করতে [এখানে](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) নির্দেশাবলী অনুসরণ করুন। অনেক প্রকল্পের জন্য আপনি আসলে [এক্সপ্লোরারে](https://thegraph.com/explorer/) বিদ্যমান সাবগ্রাফগুলি খুঁজে পেতে পারেন।

![দ্য গ্রাফ-এক্সপ্লোরার](./thegraph-explorer.png)

### আপনার নিজের নোড চালানো {#running-your-own-node}

বিকল্পভাবে আপনি আপনার নিজের নোড চালাতে পারেন। ডকুমেন্ট [এখানে](https://github.com/graphprotocol/graph-node#quick-start)। এটি করার একটি কারণ হতে পারে এমন একটি নেটওয়ার্ক ব্যবহার করা যা হোস্টেড পরিষেবা দ্বারা সমর্থিত নয়। বর্তমানে সমর্থিত নেটওয়ার্কগুলি [এখানে পাওয়া যাবে](https://thegraph.com/docs/en/developing/supported-networks/)।

## বিকেন্দ্রীভূত ভবিষ্যৎ {#the-decentralized-future}

GraphQL নতুন ইনকামিং ইভেন্টগুলির জন্য স্ট্রীমগুলিও সমর্থন করে। এগুলি [সাবস্ট্রীম](https://thegraph.com/docs/en/substreams/)-এর মাধ্যমে গ্রাফে সমর্থিত যা বর্তমানে ওপেন বিটাতে রয়েছে।

[2021](https://thegraph.com/blog/mainnet-migration/)-এ The Graph একটি বিকেন্দ্রীভূত ইন্ডেক্সিং নেটওয়ার্কে তার রূপান্তর শুরু করে। আপনি এই বিকেন্দ্রীভূত ইন্ডেক্সিং নেটওয়ার্কের আর্কিটেকচার সম্পর্কে আরও পড়তে পারেন [এখানে](https://thegraph.com/docs/en/network/explorer/)।

দুটি মূল দিক হল:

1. ব্যবহারকারীরা কোয়েরির জন্য ইন্ডেক্সারদের অর্থ প্রদান করে।
2. ইন্ডেক্সাররা গ্রাফ টোকেন (GRT) স্টেক করে।
