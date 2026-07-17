---
title: "The Graph: Web3 ডেটা কোয়েরিং ঠিক করা"
description: "ব্লকচেইন হলো SQL ছাড়া একটি ডেটাবেসের মতো। সব ডেটা সেখানে আছে, কিন্তু অ্যাক্সেস করার কোনো উপায় নেই। চলুন দেখি কীভাবে The Graph এবং GraphQL দিয়ে এটি ঠিক করা যায়।"
author: "মার্কাস ওয়াস"
lang: bn
tags: ["Solidity", "স্মার্ট কন্ট্রাক্ট", "কোয়েরিং", "the graph", "React"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

এবার আমরা The Graph সম্পর্কে আরও বিস্তারিত জানব, যা গত বছরে বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) ডেভেলপ করার জন্য স্ট্যান্ডার্ড স্ট্যাকের একটি অপরিহার্য অংশে পরিণত হয়েছে। চলুন প্রথমে দেখি কীভাবে আমরা ঐতিহ্যবাহী উপায়ে কাজগুলো করতাম...

## The Graph ছাড়া... {#without-the-graph}

বোঝার সুবিধার্থে চলুন একটি সহজ উদাহরণ দিয়ে শুরু করি। আমরা সবাই গেম পছন্দ করি, তাই কল্পনা করুন এমন একটি সাধারণ গেম যেখানে ব্যবহারকারীরা বাজি ধরছেন:

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

এখন ধরুন আমাদের dapp-এ, আমরা মোট বাজি, মোট হারা/জেতা গেমের সংখ্যা দেখাতে চাই এবং যখনই কেউ আবার খেলবে তখন এটি আপডেট করতে চাই। এর পদ্ধতিটি হবে:

1. `totalGamesPlayerWon` ফেচ করা।
2. `totalGamesPlayerLost` ফেচ করা।
3. `BetPlaced` ইভেন্ট-এ সাবস্ক্রাইব করা।

আমরা ডানদিকে দেখানো অনুযায়ী [Web3-তে ইভেন্ট](https://docs.web3js.org/api/web3/class/Contract#events) শুনতে পারি, তবে এর জন্য বেশ কয়েকটি বিষয় পরিচালনা করতে হয়।

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // ইভেন্ট ফায়ার হয়েছে
})
.on('changed', function(event) {
    // ইভেন্ট আবার সরানো হয়েছে
})
.on('error', function(error, receipt) {
    // ট্রানজ্যাকশন প্রত্যাখ্যাত হয়েছে
});
```

আমাদের সাধারণ উদাহরণের জন্য এটি এখনও কিছুটা ঠিক আছে। কিন্তু ধরুন আমরা এখন শুধুমাত্র বর্তমান খেলোয়াড়ের জন্য হারা/জেতা বাজির পরিমাণ দেখাতে চাই। এক্ষেত্রে আমাদের ভাগ্য খারাপ, আপনাকে এমন একটি নতুন কন্ট্রাক্ট ডিপ্লয় করা উচিত যা এই মানগুলো সংরক্ষণ করে এবং সেগুলো ফেচ করে। আর এখন আরও জটিল একটি স্মার্ট কন্ট্রাক্ট এবং dapp-এর কথা কল্পনা করুন, পরিস্থিতি খুব দ্রুতই বিশৃঙ্খল হয়ে যেতে পারে।

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

আপনি দেখতে পাচ্ছেন কেন এটি সর্বোত্তম নয়:

- ইতিমধ্যে ডিপ্লয় করা কন্ট্রাক্টগুলোর জন্য কাজ করে না।
- এই মানগুলো সংরক্ষণ করার জন্য অতিরিক্ত গ্যাস খরচ হয়।
- একটি ইথেরিয়াম নোড থেকে ডেটা ফেচ করার জন্য আরেকটি কলের প্রয়োজন হয়।

![Thats not good enough](./not-good-enough.jpg)

এখন চলুন একটি ভালো সমাধান দেখি।

## চলুন GraphQL-এর সাথে পরিচিত হই {#let-me-introduce-to-you-graphql}

প্রথমে চলুন GraphQL সম্পর্কে কথা বলি, যা মূলত ফেসবুক দ্বারা ডিজাইন এবং বাস্তবায়িত হয়েছিল। আপনি হয়তো ঐতিহ্যবাহী REST API মডেলের সাথে পরিচিত। এখন কল্পনা করুন এর পরিবর্তে আপনি ঠিক যে ডেটাটি চান তার জন্য একটি কোয়েরি লিখতে পারেন:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

ছবি দুটি মূলত GraphQL-এর মূল বিষয়বস্তু তুলে ধরে। ডানদিকের কোয়েরি দিয়ে আমরা ঠিক কী ডেটা চাই তা নির্ধারণ করতে পারি, তাই সেখানে আমরা একটি রিকোয়েস্টেই সবকিছু পেয়ে যাই এবং আমাদের যা প্রয়োজন তার চেয়ে বেশি কিছু পাই না। একটি GraphQL সার্ভার প্রয়োজনীয় সমস্ত ডেটা ফেচ করার কাজ পরিচালনা করে, তাই ফ্রন্টএন্ড ব্যবহারকারীদের জন্য এটি ব্যবহার করা অবিশ্বাস্যভাবে সহজ। আপনি যদি আগ্রহী হন, তবে সার্ভার কীভাবে একটি কোয়েরি পরিচালনা করে তার [একটি চমৎকার ব্যাখ্যা এখানে রয়েছে](https://www.apollographql.com/blog/graphql-explained)।

এখন এই জ্ঞান নিয়ে, চলুন অবশেষে ব্লকচেইন স্পেস এবং The Graph-এ প্রবেশ করি।

## The Graph কী? {#what-is-the-graph}

ব্লকচেইন হলো একটি বিকেন্দ্রীকৃত ডেটাবেস, কিন্তু সাধারণত যা হয় তার বিপরীতে, এই ডেটাবেসের জন্য আমাদের কোনো কোয়েরি ল্যাঙ্গুয়েজ নেই। ডেটা পুনরুদ্ধার করার সমাধানগুলো কষ্টদায়ক বা সম্পূর্ণ অসম্ভব। The Graph হলো ব্লকচেইন ডেটা সূচক এবং কোয়েরি করার জন্য একটি বিকেন্দ্রীকৃত প্রোটোকল। এবং আপনি হয়তো অনুমান করতে পেরেছেন, এটি কোয়েরি ল্যাঙ্গুয়েজ হিসেবে GraphQL ব্যবহার করে।

![The Graph](./thegraph.png)

কোনো কিছু বোঝার জন্য উদাহরণ সবসময়ই সেরা, তাই চলুন আমাদের GameContract উদাহরণের জন্য The Graph ব্যবহার করি।

## কীভাবে একটি সাবগ্রাফ তৈরি করবেন {#how-to-create-a-subgraph}

কীভাবে ডেটা সূচক করতে হবে তার সংজ্ঞাকে সাবগ্রাফ বলা হয়। এর জন্য তিনটি উপাদানের প্রয়োজন:

1. ম্যানিফেস্ট (`subgraph.yaml`)
2. স্কিমা (`schema.graphql`)
3. ম্যাপিং (`mapping.ts`)

### ম্যানিফেস্ট (`subgraph.yaml`) {#manifest}

ম্যানিফেস্ট হলো আমাদের কনফিগারেশন ফাইল এবং এটি নির্ধারণ করে:

- কোন স্মার্ট কন্ট্রাক্টগুলো সূচক করতে হবে (ঠিকানা, নেটওয়ার্ক, ABI...)
- কোন ইভেন্টগুলো শুনতে হবে
- ফাংশন কল বা ব্লকের মতো অন্যান্য যেসব বিষয় শুনতে হবে
- কল করা ম্যাপিং ফাংশনগুলো (নিচে `mapping.ts` দেখুন)

আপনি এখানে একাধিক কন্ট্রাক্ট এবং হ্যান্ডলার সংজ্ঞায়িত করতে পারেন। একটি সাধারণ সেটআপে Hardhat প্রজেক্টের ভেতরে নিজস্ব রিপোজিটরি সহ একটি সাবগ্রাফ ফোল্ডার থাকবে। তারপর আপনি সহজেই ABI রেফারেন্স করতে পারবেন।

সুবিধার জন্য আপনি mustache-এর মতো একটি টেমপ্লেট টুলও ব্যবহার করতে চাইতে পারেন। তারপর আপনি একটি `subgraph.template.yaml` তৈরি করবেন এবং সর্বশেষ ডিপ্লয়মেন্টের ওপর ভিত্তি করে ঠিকানাগুলো সন্নিবেশ করবেন। আরও উন্নত উদাহরণ সেটআপের জন্য, উদাহরণস্বরূপ [Aave সাবগ্রাফ রিপো](https://github.com/aave/aave-protocol/tree/master/thegraph) দেখতে পারেন।

এবং সম্পূর্ণ ডকুমেন্টেশন [এখানে](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) দেখা যেতে পারে।

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

### স্কিমা (`schema.graphql`) {#schema}

স্কিমা হলো GraphQL ডেটা সংজ্ঞা। এটি আপনাকে কোন এনটিটিগুলো বিদ্যমান এবং তাদের ধরন সংজ্ঞায়িত করার অনুমতি দেবে। The Graph থেকে সমর্থিত ধরনগুলো হলো

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

সম্পর্ক সংজ্ঞায়িত করতে আপনি এনটিটিগুলোকে টাইপ হিসেবেও ব্যবহার করতে পারেন। আমাদের উদাহরণে আমরা প্লেয়ার থেকে বাজির মধ্যে একটি 1-to-many সম্পর্ক সংজ্ঞায়িত করেছি। ! মানে হলো মানটি খালি হতে পারবে না। সম্পূর্ণ ডকুমেন্টেশন [এখানে](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) দেখা যেতে পারে।

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

The Graph-এ ম্যাপিং ফাইলটি আমাদের সেই ফাংশনগুলোকে সংজ্ঞায়িত করে যা আগত ইভেন্টগুলোকে এনটিটিতে রূপান্তরিত করে। এটি AssemblyScript-এ লেখা হয়, যা TypeScript-এর একটি সাবসেট। এর মানে হলো ম্যাপিংয়ের আরও দক্ষ এবং পোর্টেবল এক্সিকিউশনের জন্য এটিকে WASM (WebAssembly)-এ কম্পাইল করা যেতে পারে।

আপনাকে `subgraph.yaml` ফাইলে নাম দেওয়া প্রতিটি ফাংশন সংজ্ঞায়িত করতে হবে, তাই আমাদের ক্ষেত্রে শুধুমাত্র একটি প্রয়োজন: `handleNewBet`। আমরা প্রথমে প্রেরকের ঠিকানা থেকে id হিসেবে Player এনটিটি লোড করার চেষ্টা করি। যদি এটি বিদ্যমান না থাকে, তবে আমরা একটি নতুন এনটিটি তৈরি করি এবং প্রারম্ভিক মান দিয়ে এটি পূরণ করি।

তারপর আমরা একটি নতুন Bet এনটিটি তৈরি করি। এর জন্য id হবে `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` যা সর্বদা একটি অনন্য মান নিশ্চিত করে। শুধুমাত্র হ্যাশ ব্যবহার করা যথেষ্ট নয় কারণ কেউ হয়তো একটি স্মার্ট কন্ট্রাক্ট-এর মাধ্যমে একটি ট্রানজ্যাকশন-এ placeBet ফাংশনটি কয়েকবার কল করতে পারে।

সবশেষে আমরা সমস্ত ডেটা দিয়ে Player এনটিটি আপডেট করতে পারি। অ্যারেগুলোতে সরাসরি পুশ করা যায় না, তবে এখানে দেখানো অনুযায়ী আপডেট করতে হয়। আমরা বাজিটি রেফারেন্স করতে id ব্যবহার করি। এবং একটি এনটিটি সংরক্ষণ করার জন্য শেষে `.save()` প্রয়োজন।

সম্পূর্ণ ডকুমেন্টেশন এখানে দেখা যেতে পারে: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings। আপনি ম্যাপিং ফাইলে লগিং আউটপুটও যোগ করতে পারেন, [এখানে](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) দেখুন।

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

  // এভাবে অ্যারে আপডেট করুন
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## ফ্রন্টএন্ডে এটি ব্যবহার করা {#using-it-in-the-frontend}

Apollo Boost-এর মতো কিছু ব্যবহার করে, আপনি সহজেই আপনার React dapp-এ (বা Apollo-Vue) The Graph ইন্টিগ্রেট করতে পারেন। বিশেষ করে যখন React হুক এবং Apollo ব্যবহার করা হয়, তখন ডেটা ফেচ করা আপনার কম্পোনেন্টে একটি একক GraphQL কোয়েরি লেখার মতোই সহজ। একটি সাধারণ সেটআপ দেখতে এরকম হতে পারে:

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

এবং এখন আমরা উদাহরণস্বরূপ এরকম একটি কোয়েরি লিখতে পারি। এটি আমাদের জন্য ফেচ করবে

- বর্তমান ব্যবহারকারী কতবার জিতেছে
- বর্তমান ব্যবহারকারী কতবার হেরেছে
- তার আগের সমস্ত বাজির টাইমস্ট্যাম্পের একটি তালিকা

সবকিছু GraphQL সার্ভারে একটি মাত্র রিকোয়েস্টের মাধ্যমে।

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

তবে আমাদের পাজলের শেষ একটি অংশ বাকি আছে আর তা হলো সার্ভার। আপনি চাইলে এটি নিজে চালাতে পারেন অথবা হোস্টেড সার্ভিস ব্যবহার করতে পারেন।

## The Graph সার্ভার {#the-graph-server}

### Graph Explorer: হোস্টেড সার্ভিস {#graph-explorer-the-hosted-service}

সবচেয়ে সহজ উপায় হলো হোস্টেড সার্ভিস ব্যবহার করা। একটি সাবগ্রাফ ডিপ্লয় করতে [এখানে](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) দেওয়া নির্দেশাবলী অনুসরণ করুন। অনেক প্রজেক্টের জন্য আপনি আসলে [এক্সপ্লোরার](https://thegraph.com/explorer/)-এ বিদ্যমান সাবগ্রাফগুলো খুঁজে পেতে পারেন।

![The Graph-Explorer](./thegraph-explorer.png)

### নিজের নোড চালানো {#running-your-own-node}

বিকল্প হিসেবে আপনি নিজের নোড চালাতে পারেন। ডক্স [এখানে](https://github.com/graphprotocol/graph-node#quick-start) রয়েছে। এটি করার একটি কারণ হতে পারে এমন একটি নেটওয়ার্ক ব্যবহার করা যা হোস্টেড সার্ভিস দ্বারা সমর্থিত নয়। বর্তমানে সমর্থিত নেটওয়ার্কগুলো [এখানে পাওয়া যাবে](https://thegraph.com/docs/en/developing/supported-networks/)।

## বিকেন্দ্রীকৃত ভবিষ্যৎ {#the-decentralized-future}

নতুন আসা ইভেন্টগুলোর জন্য GraphQL স্ট্রিমও সমর্থন করে। এগুলো গ্রাফে [Substreams](https://thegraph.com/docs/en/substreams/)-এর মাধ্যমে সমর্থিত যা বর্তমানে ওপেন বিটাতে রয়েছে।

[2021](https://thegraph.com/blog/mainnet-migration/) সালে The Graph একটি বিকেন্দ্রীকৃত ইনডেক্সিং নেটওয়ার্ক-এ রূপান্তরিত হওয়া শুরু করে। আপনি এই বিকেন্দ্রীকৃত ইনডেক্সিং নেটওয়ার্ক-এর আর্কিটেকচার সম্পর্কে আরও পড়তে পারেন [এখানে](https://thegraph.com/docs/en/network/explorer/)।

দুটি মূল দিক হলো:

1. ব্যবহারকারীরা কোয়েরির জন্য ইনডেক্সারদের অর্থ প্রদান করে।
2. ইনডেক্সাররা Graph Tokens (GRT) স্টেক করে।