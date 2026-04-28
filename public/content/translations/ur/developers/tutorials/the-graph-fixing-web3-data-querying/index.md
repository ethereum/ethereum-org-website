---
title: "The Graph: ویب 3 ڈیٹا کیوریئنگ کا حل"
description: "بلاک چین ایک ڈیٹا بیس کی طرح ہے لیکن SQL کے بغیر۔ تمام ڈیٹا وہاں موجود ہے، لیکن اس تک رسائی کا کوئی طریقہ نہیں ہے۔ آئیے میں آپ کو دکھاتا ہوں کہ The Graph اور GraphQL کے ساتھ اسے کیسے حل کیا جائے۔"
author: "مارکس واس"
lang: ur
tags: ["Solidity", "اسمارٹ کانٹریکٹس", "کیوریئنگ", "the graph", "React"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

اس بار ہم The Graph کا گہرائی سے جائزہ لیں گے جو پچھلے سال میں dapps تیار کرنے کے لیے معیاری اسٹیک کا لازمی حصہ بن گیا ہے۔ آئیے پہلے دیکھتے ہیں کہ ہم روایتی طریقے سے چیزیں کیسے کریں گے...

## The Graph کے بغیر... {#without-the-graph}

تو آئیے وضاحت کے مقاصد کے لیے ایک سادہ سی مثال لیتے ہیں۔ ہم سب کو گیمز پسند ہیں، لہذا ایک ایسے سادہ گیم کا تصور کریں جس میں صارفین شرط لگاتے ہیں:

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

اب فرض کریں کہ ہم اپنی dapp میں، کل شرطیں، ہارے/جیتے گئے کل گیمز دکھانا چاہتے ہیں اور جب بھی کوئی دوبارہ کھیلے تو اسے اپ ڈیٹ بھی کرنا چاہتے ہیں۔ اس کا طریقہ کار یہ ہوگا:

1. `totalGamesPlayerWon` بازیافت (Fetch) کریں۔
2. `totalGamesPlayerLost` بازیافت کریں۔
3. `BetPlaced` ایونٹس کو سبسکرائب کریں۔

ہم دائیں جانب دکھائے گئے طریقے کے مطابق [Web3 میں ایونٹ](https://docs.web3js.org/api/web3/class/Contract#events) کو سن سکتے ہیں، لیکن اس کے لیے کافی سارے کیسز کو ہینڈل کرنے کی ضرورت ہوتی ہے۔

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // ایونٹ فائر ہو گیا
})
.on('changed', function(event) {
    // ایونٹ دوبارہ ہٹا دیا گیا
})
.on('error', function(error, receipt) {
    // ٹرانزیکشن مسترد کر دی گئی
});
```

اب یہ ہماری سادہ مثال کے لیے کسی حد تک ٹھیک ہے۔ لیکن فرض کریں کہ اب ہم صرف موجودہ کھلاڑی کے لیے ہاری/جیتی گئی شرطوں کی رقم دکھانا چاہتے ہیں۔ تو ہماری قسمت خراب ہے، آپ کے لیے بہتر ہے کہ ایک نیا کانٹریکٹ ڈیپلائے کریں جو ان ویلیوز کو اسٹور کرے اور انہیں بازیافت کرے۔ اور اب ایک بہت زیادہ پیچیدہ اسمارٹ کانٹریکٹ اور dapp کا تصور کریں، چیزیں تیزی سے الجھ سکتی ہیں۔

![کوئی بھی آسانی سے کیوری نہیں کر سکتا](./one-does-not-simply-query.jpg)

آپ دیکھ سکتے ہیں کہ یہ طریقہ کیوں بہترین نہیں ہے:

- پہلے سے ڈیپلائے کیے گئے کانٹریکٹس کے لیے کام نہیں کرتا۔
- ان ویلیوز کو اسٹور کرنے کے لیے اضافی گیس کی لاگت۔
- ایتھیریم نوڈ کے لیے ڈیٹا بازیافت کرنے کے لیے ایک اور کال کی ضرورت ہوتی ہے۔

![یہ کافی نہیں ہے](./not-good-enough.jpg)

اب آئیے ایک بہتر حل کی طرف دیکھتے ہیں۔

## آئیے میں آپ کا تعارف GraphQL سے کرواتا ہوں {#let-me-introduce-to-you-graphql}

پہلے ہم GraphQL کے بارے میں بات کرتے ہیں، جسے اصل میں فیس بک نے ڈیزائن اور نافذ کیا تھا۔ آپ شاید روایتی REST API ماڈل سے واقف ہوں گے۔ اب تصور کریں کہ اس کے بجائے آپ بالکل اسی ڈیٹا کے لیے کیوری لکھ سکتے ہیں جو آپ چاہتے تھے:

![GraphQL API بمقابلہ REST API](./graphql.jpg)

![The Graph پلے گراؤنڈ میں GraphQL کیوری کا متحرک مظاہرہ](./graphql-query.gif)

یہ دونوں تصاویر کافی حد تک GraphQL کے جوہر کو واضح کرتی ہیں۔ دائیں جانب کی کیوری کے ساتھ ہم بالکل واضح کر سکتے ہیں کہ ہمیں کون سا ڈیٹا چاہیے، لہذا وہاں ہمیں ایک ہی درخواست میں سب کچھ مل جاتا ہے اور ہماری ضرورت سے زیادہ کچھ نہیں۔ ایک GraphQL سرور درکار تمام ڈیٹا کو بازیافت کرنے کا کام سنبھالتا ہے، لہذا فرنٹ اینڈ کنزیومر سائیڈ کے لیے اسے استعمال کرنا انتہائی آسان ہے۔ اگر آپ دلچسپی رکھتے ہیں تو [یہ ایک اچھی وضاحت ہے](https://www.apollographql.com/blog/graphql-explained) کہ سرور کس طرح کیوری کو ہینڈل کرتا ہے۔

اب اس علم کے ساتھ، آئیے بالآخر بلاک چین کی دنیا اور The Graph کی طرف چلتے ہیں۔

## The Graph کیا ہے؟ {#what-is-the-graph}

بلاک چین ایک ڈی سینٹرلائزڈ ڈیٹا بیس ہے، لیکن عام صورتحال کے برعکس، ہمارے پاس اس ڈیٹا بیس کے لیے کوئی کیوری لینگویج نہیں ہے۔ ڈیٹا بازیافت کرنے کے حل تکلیف دہ یا مکمل طور پر ناممکن ہیں۔ The Graph بلاک چین ڈیٹا کی انڈیکسنگ اور کیوریئنگ کے لیے ایک ڈی سینٹرلائزڈ پروٹوکول ہے۔ اور جیسا کہ آپ نے اندازہ لگا لیا ہوگا، یہ کیوری لینگویج کے طور پر GraphQL کا استعمال کر رہا ہے۔

![The Graph](./thegraph.png)

کسی چیز کو سمجھنے کے لیے مثالیں ہمیشہ بہترین ہوتی ہیں، لہذا آئیے اپنی GameContract کی مثال کے لیے The Graph کا استعمال کریں۔

## سب گراف (Subgraph) کیسے بنائیں {#how-to-create-a-subgraph}

ڈیٹا کو انڈیکس کرنے کے طریقے کی تعریف کو سب گراف (subgraph) کہا جاتا ہے۔ اس کے لیے تین اجزاء کی ضرورت ہوتی ہے:

1. مینی فیسٹ (`subgraph.yaml`)
2. اسکیما (`schema.graphql`)
3. میپنگ (`mapping.ts`)

### مینی فیسٹ (`subgraph.yaml`) {#manifest}

مینی فیسٹ ہماری کنفیگریشن فائل ہے اور یہ درج ذیل کی وضاحت کرتی ہے:

- کن اسمارٹ کانٹریکٹس کو انڈیکس کرنا ہے (ایڈریس، نیٹ ورک، ABI...)
- کن ایونٹس کو سننا ہے
- سننے کے لیے دیگر چیزیں جیسے فنکشن کالز یا بلاکس
- کال کیے جانے والے میپنگ فنکشنز (نیچے `mapping.ts` دیکھیں)

آپ یہاں متعدد کانٹریکٹس اور ہینڈلرز کی وضاحت کر سکتے ہیں۔ ایک عام سیٹ اپ میں Hardhat پروجیکٹ کے اندر ایک سب گراف فولڈر ہوگا جس کی اپنی ریپوزٹری ہوگی۔ پھر آپ آسانی سے ABI کا حوالہ دے سکتے ہیں۔

سہولت کی وجوہات کی بنا پر آپ mustache جیسے ٹیمپلیٹ ٹول کا استعمال بھی کر سکتے ہیں۔ پھر آپ ایک `subgraph.template.yaml` بناتے ہیں اور تازہ ترین ڈیپلائیمنٹس کی بنیاد پر ایڈریسز داخل کرتے ہیں۔ مزید جدید مثال کے سیٹ اپ کے لیے، مثال کے طور پر [Aave سب گراف ریپو](https://github.com/aave/aave-protocol/tree/master/thegraph) دیکھیں۔

اور مکمل دستاویزات [یہاں](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) دیکھی جا سکتی ہیں۔

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

### اسکیما (`schema.graphql`) {#schema}

اسکیما GraphQL ڈیٹا کی تعریف ہے۔ یہ آپ کو یہ واضح کرنے کی اجازت دے گا کہ کون سی اینٹیٹیز (entities) موجود ہیں اور ان کی اقسام کیا ہیں۔ The Graph کی طرف سے سپورٹ کردہ اقسام یہ ہیں:

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

آپ تعلقات (relationships) کی وضاحت کے لیے اینٹیٹیز کو بطور قسم (type) بھی استعمال کر سکتے ہیں۔ ہماری مثال میں ہم کھلاڑی سے شرطوں تک 1-سے-متعدد (1-to-many) تعلق کی وضاحت کرتے ہیں۔ ! کا مطلب ہے کہ ویلیو خالی نہیں ہو سکتی۔ مکمل دستاویزات [یہاں](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) دیکھی جا سکتی ہیں۔

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

The Graph میں میپنگ فائل ہمارے ان فنکشنز کی وضاحت کرتی ہے جو آنے والے ایونٹس کو اینٹیٹیز میں تبدیل کرتے ہیں۔ یہ AssemblyScript میں لکھی گئی ہے، جو Typescript کا ایک ذیلی سیٹ (subset) ہے۔ اس کا مطلب ہے کہ میپنگ کے زیادہ موثر اور پورٹیبل نفاذ کے لیے اسے WASM (WebAssembly) میں مرتب (compile) کیا جا سکتا ہے۔

آپ کو `subgraph.yaml` فائل میں نامزد ہر فنکشن کی وضاحت کرنے کی ضرورت ہوگی، لہذا ہمارے معاملے میں ہمیں صرف ایک کی ضرورت ہے: `handleNewBet`۔ ہم سب سے پہلے بھیجنے والے کے ایڈریس سے بطور id پلیئر اینٹیٹی کو لوڈ کرنے کی کوشش کرتے ہیں۔ اگر یہ موجود نہیں ہے، تو ہم ایک نئی اینٹیٹی بناتے ہیں اور اسے ابتدائی ویلیوز سے بھرتے ہیں۔

پھر ہم ایک نئی Bet اینٹیٹی بناتے ہیں۔ اس کے لیے id `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` ہوگی جو ہمیشہ ایک منفرد ویلیو کو یقینی بناتی ہے۔ صرف ہیش کا استعمال کافی نہیں ہے کیونکہ کوئی شخص اسمارٹ کانٹریکٹ کے ذریعے ایک ہی ٹرانزیکشن میں کئی بار placeBet فنکشن کو کال کر سکتا ہے۔

آخر میں ہم تمام ڈیٹا کے ساتھ پلیئر اینٹیٹی کو اپ ڈیٹ کر سکتے ہیں۔ ایریز (Arrays) کو براہ راست پش نہیں کیا جا سکتا، بلکہ انہیں یہاں دکھائے گئے طریقے کے مطابق اپ ڈیٹ کرنے کی ضرورت ہوتی ہے۔ ہم شرط کا حوالہ دینے کے لیے id کا استعمال کرتے ہیں۔ اور کسی اینٹیٹی کو اسٹور کرنے کے لیے آخر میں `.save()` درکار ہوتا ہے۔

مکمل دستاویزات یہاں دیکھی جا سکتی ہیں: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings۔ آپ میپنگ فائل میں لاگنگ آؤٹ پٹ بھی شامل کر سکتے ہیں، [یہاں](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) دیکھیں۔

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // اگر ابھی تک موجود نہیں ہے تو بنائیں
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

  // ایرے کو اس طرح اپ ڈیٹ کریں
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## اسے فرنٹ اینڈ میں استعمال کرنا {#using-it-in-the-frontend}

Apollo Boost جیسی کسی چیز کا استعمال کرتے ہوئے، آپ آسانی سے The Graph کو اپنی React dapp (یا Apollo-Vue) میں ضم کر سکتے ہیں۔ خاص طور پر جب React hooks اور Apollo کا استعمال کیا جائے، تو ڈیٹا بازیافت کرنا اتنا ہی آسان ہے جتنا کہ آپ کے جزو (component) میں ایک واحد GraphQL کیوری لکھنا۔ ایک عام سیٹ اپ کچھ اس طرح دکھ سکتا ہے:

```javascript
// تمام سب گرافس دیکھیں: https://thegraph.com/explorer/
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

اور اب ہم مثال کے طور پر اس طرح کی ایک کیوری لکھ سکتے ہیں۔ یہ ہمارے لیے بازیافت کرے گا:

- موجودہ صارف کتنی بار جیتا ہے
- موجودہ صارف کتنی بار ہارا ہے
- اس کی تمام پچھلی شرطوں کے ساتھ ٹائم اسٹیمپس کی ایک فہرست

یہ سب GraphQL سرور کو ایک ہی درخواست میں۔

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

لیکن ہم پہیلی کا ایک آخری حصہ چھوڑ رہے ہیں اور وہ ہے سرور۔ آپ یا تو اسے خود چلا سکتے ہیں یا ہوسٹڈ سروس استعمال کر سکتے ہیں۔

## The Graph سرور {#the-graph-server}

### گراف ایکسپلورر: ہوسٹڈ سروس {#graph-explorer-the-hosted-service}

سب سے آسان طریقہ ہوسٹڈ سروس کا استعمال کرنا ہے۔ سب گراف ڈیپلائے کرنے کے لیے [یہاں](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) دی گئی ہدایات پر عمل کریں۔ بہت سے پروجیکٹس کے لیے آپ دراصل [ایکسپلورر](https://thegraph.com/explorer/) میں موجودہ سب گرافس تلاش کر سکتے ہیں۔

![The Graph-Explorer](./thegraph-explorer.png)

### اپنا نوڈ چلانا {#running-your-own-node}

متبادل کے طور پر آپ اپنا نوڈ چلا سکتے ہیں۔ دستاویزات [یہاں](https://github.com/graphprotocol/graph-node#quick-start) ہیں۔ ایسا کرنے کی ایک وجہ ایسے نیٹ ورک کا استعمال ہو سکتی ہے جو ہوسٹڈ سروس کے ذریعے سپورٹڈ نہیں ہے۔ فی الحال سپورٹڈ نیٹ ورکس [یہاں مل سکتے ہیں](https://thegraph.com/docs/en/developing/supported-networks/)۔

## ڈی سینٹرلائزڈ مستقبل {#the-decentralized-future}

GraphQL نئے آنے والے ایونٹس کے لیے اسٹریمز کو بھی سپورٹ کرتا ہے۔ یہ گراف پر [Substreams](https://thegraph.com/docs/en/substreams/) کے ذریعے سپورٹ کیے جاتے ہیں جو فی الحال اوپن بیٹا میں ہیں۔

<span dir="ltr">2021</span> میں The Graph نے ایک ڈی سینٹرلائزڈ انڈیکسنگ نیٹ ورک کی طرف اپنی منتقلی شروع کی۔ آپ اس ڈی سینٹرلائزڈ انڈیکسنگ نیٹ ورک کے آرکیٹیکچر کے بارے میں مزید [یہاں](https://thegraph.com/docs/en/network/explorer/) پڑھ سکتے ہیں۔

دو اہم پہلو یہ ہیں:

1. صارفین کیوریز کے لیے انڈیکسرز کو ادائیگی کرتے ہیں۔
2. انڈیکسرز Graph Tokens (GRT) اسٹیک کرتے ہیں۔