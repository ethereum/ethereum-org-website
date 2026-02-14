---
title: "دی گراف: Web3 ڈیٹا کی دریافت کو درست کرنا"
description: "بلاک چین ایک ڈیٹا بیس کی طرح ہے لیکن SQL کے بغیر۔ تمام ڈیٹا وہاں موجود ہے، لیکن اس تک رسائی کا کوئی راستہ نہیں۔ آئیے میں آپ کو دکھاتا ہوں کہ دی گراف اور GraphQL کے ساتھ اسے کیسے ٹھیک کیا جائے۔"
author: Markus Waas
lang: ur-in
tags:
  [
    "solidity",
    "اسمارٹ معاہدات",
    "querying",
    "دی گراف",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

اس بار ہم دی گراف پر گہری نظر ڈالیں گے جو پچھلے سال میں dapps تیار کرنے کے لیے بنیادی طور پر معیاری اسٹیک کا حصہ بن گیا ہے۔ آئیے پہلے دیکھتے ہیں کہ ہم روایتی طریقے سے چیزیں کیسے کریں گے...

## دی گراف کے بغیر... {#without-the-graph}

تو آئیے مثال کے مقاصد کے لیے ایک سادہ مثال کے ساتھ چلتے ہیں۔ ہم سب کو گیمز پسند ہیں، تو ایک سادہ گیم کا تصور کریں جس میں صارفین شرط لگاتے ہیں:

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
            require(success, "منتقلی ناکام");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

اب فرض کریں کہ ہمارے dapp میں، ہم کل شرطیں، کل ہارے/جیتے ہوئے گیمز دکھانا چاہتے ہیں اور جب بھی کوئی دوبارہ کھیلتا ہے تو اسے اپ ڈیٹ بھی کرنا چاہتے ہیں۔ طریقہ کار یہ ہوگا:

1. `totalGamesPlayerWon` حاصل کریں۔
2. `totalGamesPlayerLost` حاصل کریں۔
3. `BetPlaced` ایونٹس کو سبسکرائب کریں۔

ہم [Web3 میں ایونٹ](https://docs.web3js.org/api/web3/class/Contract#events) کو سن سکتے ہیں جیسا کہ دائیں طرف دکھایا گیا ہے، لیکن اس کے لیے کافی کچھ معاملات کو سنبھالنے کی ضرورت ہوتی ہے۔

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // ایونٹ فائر ہوا
})
.on('changed', function(event) {
    // ایونٹ دوبارہ ہٹا دیا گیا
})
.on('error', function(error, receipt) {
    // tx مسترد کر دیا گیا
});
```

اب یہ ہماری سادہ مثال کے لیے اب بھی کسی حد تک ٹھیک ہے۔ لیکن فرض کریں کہ اب ہم صرف موجودہ کھلاڑی کے لیے ہاری/جیتی ہوئی شرطوں کی رقم دکھانا چاہتے ہیں۔ خیر ہماری قسمت خراب ہے، بہتر ہے کہ آپ ایک نیا کنٹریکٹ تعینات کریں جو ان اقدار کو ذخیرہ کرتا ہے اور انہیں حاصل کرتا ہے۔ اور اب ایک بہت زیادہ پیچیدہ سمارٹ کنٹریکٹ اور dapp کا تصور کریں، چیزیں جلدی سے گڑبڑ ہو سکتی ہیں۔

![کوئی آسانی سے دریافت نہیں کرتا](./one-does-not-simply-query.jpg)

آپ دیکھ سکتے ہیں کہ یہ کس طرح بہترین نہیں ہے:

- پہلے سے تعینات کردہ کنٹریکٹس کے لیے کام نہیں کرتا۔
- ان اقدار کو ذخیرہ کرنے کے لیے اضافی گیس کی لاگت۔
- ایتھریم نوڈ کے لیے ڈیٹا حاصل کرنے کے لیے ایک اور کال کی ضرورت ہے۔

![یہ کافی اچھا نہیں ہے](./not-good-enough.jpg)

اب آئیے ایک بہتر حل پر نظر ڈالتے ہیں۔

## میں آپ کو GraphQL سے متعارف کراتا ہوں {#let-me-introduce-to-you-graphql}

سب سے پہلے GraphQL کے بارے میں بات کرتے ہیں، جسے اصل میں فیس بک نے ڈیزائن اور نافذ کیا تھا۔ آپ روایتی REST API ماڈل سے واقف ہوں گے۔ اب اس کے بجائے تصور کریں کہ آپ بالکل اسی ڈیٹا کے لیے ایک استفسار لکھ سکتے ہیں جو آپ چاہتے تھے:

![GraphQL API بمقابلہ REST API](./graphql.jpg)

![](./graphql-query.gif)

دو تصاویر GraphQL کے جوہر کو بہت حد تک بیان کرتی ہیں۔ دائیں طرف کے استفسار کے ساتھ ہم بالکل وہی بیان کر سکتے ہیں کہ ہم کیا ڈیٹا چاہتے ہیں، لہذا وہاں ہم ایک ہی درخواست میں سب کچھ حاصل کرتے ہیں اور اس سے زیادہ کچھ نہیں جو ہمیں درکار ہے۔ ایک GraphQL سرور تمام مطلوبہ ڈیٹا حاصل کرنے کو سنبھالتا ہے، لہذا فرنٹ اینڈ صارف کی طرف سے استعمال کرنا ناقابل یقین حد تک آسان ہے۔ اگر آپ دلچسپی رکھتے ہیں تو [یہ ایک اچھی وضاحت ہے](https://www.apollographql.com/blog/graphql-explained) کہ سرور بالکل ایک استفسار کو کیسے ہینڈل کرتا ہے۔

اب اس علم کے ساتھ، آئیے آخر کار بلاک چین کی دنیا اور دی گراف میں داخل ہوں۔

## دی گراف کیا ہے؟ {#what-is-the-graph}

بلاک چین ایک غیر مرکزی ڈیٹا بیس ہے، لیکن عام طور پر جو ہوتا ہے اس کے برعکس، ہمارے پاس اس ڈیٹا بیس کے لیے کوئی استفسار کی زبان نہیں ہے۔ ڈیٹا کی بازیافت کے حل تکلیف دہ یا مکمل طور پر ناممکن ہیں۔ دی گراف بلاک چین ڈیٹا کو انڈیکس کرنے اور استفسار کرنے کے لیے ایک غیر مرکزی پروٹوکول ہے۔ اور آپ نے اندازہ لگا لیا ہوگا، یہ استفسار کی زبان کے طور پر GraphQL کا استعمال کر رہا ہے۔

![دی گراف](./thegraph.png)

مثالیں ہمیشہ کسی چیز کو سمجھنے کے لیے بہترین ہوتی ہیں، لہذا آئیے اپنی GameContract مثال کے لیے دی گراف کا استعمال کریں۔

## سب گراف کیسے بنائیں {#how-to-create-a-subgraph}

ڈیٹا کو انڈیکس کرنے کی تعریف کو سب گراف کہا جاتا ہے۔ اس کے لیے تین اجزاء کی ضرورت ہے:

1. مینی فیسٹ (`subgraph.yaml`)
2. اسکیما (`schema.graphql`)
3. میپنگ (`mapping.ts`)

### مینی فیسٹ (`subgraph.yaml`) {#manifest}

مینی فیسٹ ہماری کنفیگریشن فائل ہے اور یہ بیان کرتی ہے:

- کون سے سمارٹ کنٹریکٹس کو انڈیکس کرنا ہے (ایڈریس، نیٹ ورک، ABI...)
- کون سے ایونٹس کو سننا ہے
- سننے کے لیے دیگر چیزیں جیسے فنکشن کالز یا بلاکس
- میپنگ فنکشنز کو کال کیا جا رہا ہے (نیچے `mapping.ts` دیکھیں)

آپ یہاں متعدد کنٹریکٹس اور ہینڈلرز کی وضاحت کر سکتے ہیں۔ ایک عام سیٹ اپ میں Hardhat پروجیکٹ کے اندر اس کی اپنی ریپوزٹری کے ساتھ ایک سب گراف فولڈر ہوگا۔ پھر آپ آسانی سے ABI کا حوالہ دے سکتے ہیں۔

سہولت کے لیے آپ mustache جیسے ٹیمپلیٹ ٹول کا بھی استعمال کرنا چاہیں گے۔ پھر آپ ایک `subgraph.template.yaml` بناتے ہیں اور تازہ ترین تعیناتیوں کی بنیاد پر ایڈریسز داخل کرتے ہیں۔ مزید جدید مثال کے سیٹ اپ کے لیے، مثال کے طور پر [Aave سب گراف ریپو](https://github.com/aave/aave-protocol/tree/master/thegraph) دیکھیں۔

اور مکمل دستاویزات [یہاں](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) دیکھی جا سکتی ہیں۔

```yaml
specVersion: 0.0.1
description: ایتھریم پر شرط لگانا
repository: - GitHub لنک -
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

### اسکیما (`schema.graphql`) {#schema}

اسکیما GraphQL ڈیٹا کی تعریف ہے۔ یہ آپ کو یہ بیان کرنے کی اجازت دے گا کہ کون سی اینٹیٹیز موجود ہیں اور ان کی اقسام کیا ہیں۔ دی گراف سے معاون اقسام ہیں

- بائٹس
- ID
- اسٹرنگ
- بولین
- Int
- BigInt
- BigDecimal

آپ تعلقات کی وضاحت کے لیے اینٹیٹیز کو قسم کے طور پر بھی استعمال کر سکتے ہیں۔ ہماری مثال میں ہم کھلاڑی سے شرطوں تک 1-سے-کئی تعلقات کی وضاحت کرتے ہیں۔ ! کا مطلب ہے کہ قدر خالی نہیں ہو سکتی۔ مکمل دستاویزات [یہاں](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) دیکھی جا سکتی ہیں۔

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

### میپنگ (`mapping.ts`) {#mapping}

دی گراف میں میپنگ فائل ہمارے فنکشنز کی وضاحت کرتی ہے جو آنے والے ایونٹس کو اینٹیٹیز میں تبدیل کرتی ہے۔ یہ AssemblyScript میں لکھی گئی ہے، جو Typescript کا ایک سب سیٹ ہے۔ اس کا مطلب ہے کہ اسے میپنگ کی زیادہ موثر اور پورٹیبل عمل درآمد کے لیے WASM (WebAssembly) میں کمپائل کیا جا سکتا ہے۔

آپ کو `subgraph.yaml` فائل میں نامزد ہر فنکشن کی وضاحت کرنے کی ضرورت ہوگی، لہذا ہمارے معاملے میں ہمیں صرف ایک کی ضرورت ہے: `handleNewBet`۔ ہم پہلے بھیجنے والے کے ایڈریس سے پلیئر اینٹیٹی کو id کے طور پر لوڈ کرنے کی کوشش کرتے ہیں۔ اگر یہ موجود نہیں ہے، تو ہم ایک نئی اینٹیٹی بناتے ہیں اور اسے ابتدائی اقدار سے بھرتے ہیں۔

پھر ہم ایک نئی Bet اینٹیٹی بناتے ہیں۔ اس کے لیے id `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` ہوگی جو ہمیشہ ایک منفرد قدر کو یقینی بناتی ہے۔ صرف ہیش کا استعمال کافی نہیں ہے کیونکہ کوئی شخص سمارٹ کنٹریکٹ کے ذریعے ایک ہی ٹرانزیکشن میں کئی بار placeBet فنکشن کو کال کر سکتا ہے۔

آخر میں ہم تمام ڈیٹا کے ساتھ پلیئر اینٹیٹی کو اپ ڈیٹ کر سکتے ہیں۔ ایریز کو براہ راست پش نہیں کیا جا سکتا، بلکہ انہیں یہاں دکھائے گئے طریقے سے اپ ڈیٹ کرنے کی ضرورت ہے۔ ہم شرط کا حوالہ دینے کے لیے id کا استعمال کرتے ہیں۔ اور ایک اینٹیٹی کو ذخیرہ کرنے کے لیے آخر میں `.save()` کی ضرورت ہوتی ہے۔

مکمل دستاویزات یہاں دیکھی جا سکتی ہیں: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings۔ آپ میپنگ فائل میں لاگنگ آؤٹ پٹ بھی شامل کر سکتے ہیں، [یہاں](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) دیکھیں۔

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // اگر پہلے سے موجود نہیں ہے تو بنائیں
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

  // اس طرح ایرے کو اپ ڈیٹ کریں
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## اسے فرنٹ اینڈ میں استعمال کرنا {#using-it-in-the-frontend}

Apollo Boost جیسی چیز کا استعمال کرتے ہوئے، آپ آسانی سے اپنے React dapp (یا Apollo-Vue) میں دی گراف کو ضم کر سکتے ہیں۔ خاص طور پر جب React hooks اور Apollo کا استعمال کرتے ہیں، تو ڈیٹا حاصل کرنا اتنا ہی آسان ہے جتنا کہ اپنے جزو میں ایک واحد GraphQL استفسار لکھنا۔ ایک عام سیٹ اپ کچھ اس طرح نظر آ سکتا ہے:

```javascript
// تمام سب گراف دیکھیں: https://thegraph.com/explorer/
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

اور اب ہم مثال کے طور پر اس طرح کا ایک استفسار لکھ سکتے ہیں۔ یہ ہمیں حاصل کرے گا

- موجودہ صارف کتنی بار جیتا ہے
- موجودہ صارف کتنی بار ہارا ہے
- اس کی تمام پچھلی شرطوں کے ساتھ ٹائم اسٹیمپس کی ایک فہرست

سب کچھ GraphQL سرور کو ایک ہی درخواست میں۔

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

![جادو](./magic.jpg)

لیکن ہم پہیلی کا ایک آخری ٹکڑا کھو رہے ہیں اور وہ ہے سرور۔ آپ یا تو اسے خود چلا سکتے ہیں یا میزبان سروس استعمال کر سکتے ہیں۔

## دی گراف سرور {#the-graph-server}

### گراف ایکسپلورر: میزبان سروس {#graph-explorer-the-hosted-service}

سب سے آسان طریقہ میزبان سروس کا استعمال کرنا ہے۔ سب گراف تعینات کرنے کے لیے [یہاں](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) دی گئی ہدایات پر عمل کریں۔ بہت سے پروجیکٹس کے لیے آپ اصل میں [ایکسپلورر](https://thegraph.com/explorer/) میں موجودہ سب گراف تلاش کر سکتے ہیں۔

![دی گراف-ایکسپلورر](./thegraph-explorer.png)

### اپنا نوڈ چلانا {#running-your-own-node}

متبادل کے طور پر آپ اپنا نوڈ چلا سکتے ہیں۔ دستاویزات [یہاں](https://github.com/graphprotocol/graph-node#quick-start) ہیں۔ ایسا کرنے کی ایک وجہ یہ ہو سکتی ہے کہ آپ ایک ایسے نیٹ ورک کا استعمال کر رہے ہیں جو میزبان سروس کے ذریعے تعاون یافتہ نہیں ہے۔ فی الحال تعاون یافتہ نیٹ ورکس [یہاں مل سکتے ہیں](https://thegraph.com/docs/en/developing/supported-networks/)۔

## غیر مرکزی مستقبل {#the-decentralized-future}

GraphQL نئے آنے والے ایونٹس کے لیے اسٹریمز کو بھی سپورٹ کرتا ہے۔ یہ گراف پر [سب اسٹریمز](https://thegraph.com/docs/en/substreams/) کے ذریعے تعاون یافتہ ہیں جو فی الحال اوپن بیٹا میں ہیں۔

[2021](https://thegraph.com/blog/mainnet-migration/) میں دی گراف نے ایک غیر مرکزی انڈیکسنگ نیٹ ورک میں اپنی منتقلی شروع کی۔ آپ اس غیر مرکزی انڈیکسنگ نیٹ ورک کے فن تعمیر کے بارے میں مزید [یہاں](https://thegraph.com/docs/en/network/explorer/) پڑھ سکتے ہیں۔

دو اہم پہلو ہیں:

1. صارفین استفسارات کے لیے انڈیکسرز کو ادائیگی کرتے ہیں۔
2. انڈیکسرز گراف ٹوکنز (GRT) کو اسٹیک کرتے ہیں۔
