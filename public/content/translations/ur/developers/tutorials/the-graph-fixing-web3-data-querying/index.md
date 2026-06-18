---
title: "⁦The Graph⁩: ⁦Web3⁩ ڈیٹا کیوری کو ٹھیک کرنا"
description: "بلاک چین ایک ڈیٹا بیس کی طرح ہے لیکن ⁦SQL⁩ کے بغیر۔ تمام ڈیٹا وہاں موجود ہے، لیکن اس تک رسائی کا کوئی طریقہ نہیں ہے۔ آئیے میں آپ کو دکھاتا ہوں کہ اسے ⁦The Graph⁩ اور ⁦GraphQL⁩ کے ساتھ کیسے ٹھیک کیا جائے۔"
author: مارکس واس
lang: ur
tags: ["solidity", "سمارٹ کنٹریکٹس", "کیوری کرنا", "the graph", "react"]
skill: intermediate
breadcrumb: "⁦The Graph⁩"
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

اس بار ہم <span dir="ltr">The Graph</span> کا گہرائی سے جائزہ لیں گے جو پچھلے سال غیر مرکزی ایپلی کیشنز (dapps) تیار کرنے کے لیے معیاری اسٹیک کا حصہ بن گیا ہے۔ آئیے پہلے دیکھتے ہیں کہ ہم روایتی طریقے سے چیزیں کیسے کریں گے...

## <span dir="ltr">The Graph</span> کے بغیر... {#without-the-graph}

تو آئیے وضاحت کے مقاصد کے لیے ایک سادہ سی مثال لیتے ہیں۔ ہم سب کو گیمز پسند ہیں، لہذا ایک سادہ گیم کا تصور کریں جس میں صارفین شرط لگاتے ہیں:

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

اب فرض کریں کہ ہم اپنی غیر مرکزی ایپلی کیشن (dapp) میں کل شرطیں، ہاری/جیتی گئی کل گیمز دکھانا چاہتے ہیں اور جب بھی کوئی دوبارہ کھیلے تو اسے اپ ڈیٹ بھی کرنا چاہتے ہیں۔ اس کا طریقہ کار یہ ہوگا:

1. `totalGamesPlayerWon` بازیافت کریں۔
2. `totalGamesPlayerLost` بازیافت کریں۔
3. `BetPlaced` ایونٹس کو سبسکرائب کریں۔

ہم [<span dir="ltr">Web3</span> میں ایونٹ](https://docs.web3js.org/api/web3/class/Contract#events) کو سن سکتے ہیں جیسا کہ دائیں طرف دکھایا گیا ہے، لیکن اس کے لیے کافی سارے معاملات کو سنبھالنے کی ضرورت ہوتی ہے۔

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
    // ٹرانزیکشن مسترد ہو گئی
});
```

اب یہ ہماری سادہ مثال کے لیے کسی حد تک ٹھیک ہے۔ لیکن فرض کریں کہ اب ہم صرف موجودہ کھلاڑی کے لیے ہاری/جیتی گئی شرطوں کی رقم دکھانا چاہتے ہیں۔ تو ہماری قسمت خراب ہے، بہتر ہوگا کہ آپ ایک نیا کنٹریکٹ تعینات کریں جو ان اقدار کو اسٹور کرے اور انہیں بازیافت کرے۔ اور اب ایک بہت زیادہ پیچیدہ سمارٹ کنٹریکٹ اور dapp کا تصور کریں، چیزیں تیزی سے الجھ سکتی ہیں۔

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

آپ دیکھ سکتے ہیں کہ یہ کس طرح بہترین نہیں ہے:

- پہلے سے تعینات کردہ کنٹریکٹس کے لیے کام نہیں کرتا۔
- ان اقدار کو اسٹور کرنے کے لیے اضافی گیس کی لاگت۔
- ایتھیریم نوڈ کے لیے ڈیٹا بازیافت کرنے کے لیے ایک اور کال کی ضرورت ہوتی ہے۔

![Thats not good enough](./not-good-enough.jpg)

اب آئیے ایک بہتر حل پر نظر ڈالتے ہیں۔

## آئیے میں آپ کا <span dir="ltr">GraphQL</span> سے تعارف کرواتا ہوں {#let-me-introduce-to-you-graphql}

پہلے آئیے <span dir="ltr">GraphQL</span> کے بارے میں بات کرتے ہیں، جسے اصل میں فیس بک نے ڈیزائن اور نافذ کیا تھا۔ آپ شاید روایتی <span dir="ltr">REST API</span> ماڈل سے واقف ہوں گے۔ اب تصور کریں کہ اس کے بجائے آپ بالکل اسی ڈیٹا کے لیے کیوری لکھ سکتے ہیں جو آپ چاہتے تھے:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

یہ دونوں تصاویر کافی حد تک <span dir="ltr">GraphQL</span> کے جوہر کو پکڑتی ہیں۔ دائیں طرف کی کیوری کے ساتھ ہم بالکل واضح کر سکتے ہیں کہ ہمیں کون سا ڈیٹا چاہیے، لہذا وہاں ہمیں ایک ہی درخواست میں سب کچھ مل جاتا ہے اور بالکل اسی سے زیادہ کچھ نہیں جس کی ہمیں ضرورت ہے۔ ایک <span dir="ltr">GraphQL</span> سرور درکار تمام ڈیٹا کی بازیافت کو سنبھالتا ہے، لہذا فرنٹ اینڈ صارف کے لیے اسے استعمال کرنا ناقابل یقین حد تک آسان ہے۔ اگر آپ دلچسپی رکھتے ہیں تو [یہ ایک اچھی وضاحت ہے](https://www.apollographql.com/blog/graphql-explained) کہ سرور بالکل کس طرح کیوری کو سنبھالتا ہے۔

اب اس علم کے ساتھ، آئیے آخر کار بلاک چین کی دنیا اور <span dir="ltr">The Graph</span> میں قدم رکھتے ہیں۔

## <span dir="ltr">The Graph</span> کیا ہے؟ {#what-is-the-graph}

بلاک چین ایک لامركزی ڈیٹا بیس ہے، لیکن عام طور پر جو ہوتا ہے اس کے برعکس، ہمارے پاس اس ڈیٹا بیس کے لیے کوئی کیوری لینگویج نہیں ہے۔ ڈیٹا بازیافت کرنے کے حل تکلیف دہ یا مکمل طور پر ناممکن ہیں۔ <span dir="ltr">The Graph</span> بلاک چین ڈیٹا کا اشاریہ بنانے اور کیوری کرنے کے لیے ایک لامركزی پروٹوکول ہے۔ اور آپ نے شاید اندازہ لگا لیا ہوگا، یہ <span dir="ltr">GraphQL</span> کو کیوری لینگویج کے طور پر استعمال کر رہا ہے۔

![The Graph](./thegraph.png)

کسی چیز کو سمجھنے کے لیے مثالیں ہمیشہ بہترین ہوتی ہیں، لہذا آئیے اپنی <span dir="ltr">GameContract</span> مثال کے لیے <span dir="ltr">The Graph</span> کا استعمال کریں۔

## سب گراف کیسے بنائیں {#how-to-create-a-subgraph}

ڈیٹا کا اشاریہ کیسے بنایا جائے اس کی تعریف کو سب گراف کہا جاتا ہے۔ اس کے لیے تین اجزاء کی ضرورت ہوتی ہے:

1. مینی فیسٹ (`subgraph.yaml`)
2. اسکیما (`schema.graphql`)
3. میپنگ (`mapping.ts`)

### مینی فیسٹ (`subgraph.yaml`) {#manifest}

مینی فیسٹ ہماری کنفیگریشن فائل ہے اور یہ واضح کرتی ہے:

- کن سمارٹ کنٹریکٹس کا اشاریہ بنانا ہے (پتہ، نیٹ ورک، <span dir="ltr">ABI</span>...)
- کن ایونٹس کو سننا ہے
- دیگر چیزیں جنہیں سننا ہے جیسے فنکشن کالز یا بلاکس
- کال کیے جانے والے میپنگ فنکشنز (نیچے `mapping.ts` دیکھیں)

آپ یہاں متعدد کنٹریکٹس اور ہینڈلرز کی وضاحت کر سکتے ہیں۔ ایک عام سیٹ اپ میں <span dir="ltr">Hardhat</span> پروجیکٹ کے اندر اس کی اپنی ریپوزٹری کے ساتھ ایک سب گراف فولڈر ہوگا۔ پھر آپ آسانی سے <span dir="ltr">ABI</span> کا حوالہ دے سکتے ہیں۔

سہولت کی وجوہات کی بناء پر آپ <span dir="ltr">mustache</span> جیسا ٹیمپلیٹ ٹول بھی استعمال کرنا چاہیں گے۔ پھر آپ ایک `subgraph.template.yaml` بناتے ہیں اور تازہ ترین تعیناتیوں کی بنیاد پر پتے داخل کرتے ہیں۔ مزید جدید مثال کے سیٹ اپ کے لیے، مثال کے طور پر [آوے سب گراف ریپو](https://github.com/aave/aave-protocol/tree/master/thegraph) دیکھیں۔

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

اسکیما <span dir="ltr">GraphQL</span> ڈیٹا کی تعریف ہے۔ یہ آپ کو یہ واضح کرنے کی اجازت دے گا کہ کون سی اینٹیٹیز موجود ہیں اور ان کی اقسام کیا ہیں۔ <span dir="ltr">The Graph</span> کی طرف سے تعاون یافتہ اقسام یہ ہیں

- <span dir="ltr">Bytes</span>
- <span dir="ltr">ID</span>
- <span dir="ltr">String</span>
- <span dir="ltr">Boolean</span>
- <span dir="ltr">Int</span>
- <span dir="ltr">BigInt</span>
- <span dir="ltr">BigDecimal</span>

آپ تعلقات کی وضاحت کرنے کے لیے اینٹیٹیز کو بطور قسم بھی استعمال کر سکتے ہیں۔ ہماری مثال میں ہم کھلاڑی سے شرطوں تک <span dir="ltr">1-to-many</span> تعلق کی وضاحت کرتے ہیں۔ ! کا مطلب ہے کہ قدر خالی نہیں ہو سکتی۔ مکمل دستاویزات [یہاں](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest) دیکھی جا سکتی ہیں۔

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

<span dir="ltr">The Graph</span> میں میپنگ فائل ہمارے ان فنکشنز کی وضاحت کرتی ہے جو آنے والے ایونٹس کو اینٹیٹیز میں تبدیل کرتے ہیں۔ یہ <span dir="ltr">AssemblyScript</span> میں لکھی گئی ہے، جو <span dir="ltr">TypeScript</span> کا ایک ذیلی سیٹ ہے۔ اس کا مطلب ہے کہ اسے میپنگ کے زیادہ موثر اور پورٹیبل نفاذ کے لیے <span dir="ltr">WASM</span> (<span dir="ltr">WebAssembly</span>) میں مرتب کیا جا سکتا ہے۔

آپ کو `subgraph.yaml` فائل میں نامزد ہر فنکشن کی وضاحت کرنے کی ضرورت ہوگی، لہذا ہمارے معاملے میں ہمیں صرف ایک کی ضرورت ہے: `handleNewBet`۔ ہم سب سے پہلے بھیجنے والے کے پتے سے <span dir="ltr">Player</span> اینٹیٹی کو بطور <span dir="ltr">id</span> لوڈ کرنے کی کوشش کرتے ہیں۔ اگر یہ موجود نہیں ہے، تو ہم ایک نئی اینٹیٹی بناتے ہیں اور اسے ابتدائی اقدار سے بھرتے ہیں۔

پھر ہم ایک نئی <span dir="ltr">Bet</span> اینٹیٹی بناتے ہیں۔ اس کے لیے <span dir="ltr">id</span> `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` ہوگی جو ہمیشہ ایک منفرد قدر کو یقینی بناتی ہے۔ صرف ہیش کا استعمال کافی نہیں ہے کیونکہ کوئی شخص سمارٹ کنٹریکٹ کے ذریعے ایک ٹرانزیکشن میں کئی بار <span dir="ltr">placeBet</span> فنکشن کو کال کر سکتا ہے۔

آخر میں ہم تمام ڈیٹا کے ساتھ <span dir="ltr">Player</span> اینٹیٹی کو اپ ڈیٹ کر سکتے ہیں۔ اریز (Arrays) کو براہ راست پش نہیں کیا جا سکتا، بلکہ انہیں اپ ڈیٹ کرنے کی ضرورت ہوتی ہے جیسا کہ یہاں دکھایا گیا ہے۔ ہم شرط کا حوالہ دینے کے لیے <span dir="ltr">id</span> کا استعمال کرتے ہیں۔ اور ایک اینٹیٹی کو اسٹور کرنے کے لیے آخر میں `.save()` درکار ہے۔

مکمل دستاویزات یہاں دیکھی جا سکتی ہیں: <span dir="ltr">https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings</span>۔ آپ میپنگ فائل میں لاگنگ آؤٹ پٹ بھی شامل کر سکتے ہیں، [یہاں](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference) دیکھیں۔

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

  // ارے کو اس طرح اپ ڈیٹ کریں
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## اسے فرنٹ اینڈ میں استعمال کرنا {#using-it-in-the-frontend}

<span dir="ltr">Apollo Boost</span> جیسی کسی چیز کا استعمال کرتے ہوئے، آپ آسانی سے اپنی <span dir="ltr">React</span> dapp (یا <span dir="ltr">Apollo-Vue</span>) میں <span dir="ltr">The Graph</span> کو ضم کر سکتے ہیں۔ خاص طور پر جب <span dir="ltr">React hooks</span> اور <span dir="ltr">Apollo</span> کا استعمال کیا جائے، تو ڈیٹا بازیافت کرنا اتنا ہی آسان ہے جتنا کہ آپ کے جزو (component) میں ایک واحد <span dir="ltr">GraphQL</span> کیوری لکھنا۔ ایک عام سیٹ اپ کچھ اس طرح نظر آ سکتا ہے:

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

اور اب ہم مثال کے طور پر اس طرح کی ایک کیوری لکھ سکتے ہیں۔ یہ ہمارے لیے بازیافت کرے گا

- موجودہ صارف کتنی بار جیتا ہے
- موجودہ صارف کتنی بار ہارا ہے
- اس کی تمام پچھلی شرطوں کے ساتھ ٹائم اسٹامپس کی ایک فہرست

یہ سب <span dir="ltr">GraphQL</span> سرور کو ایک ہی درخواست میں۔

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

لیکن ہم پہیلی کا ایک آخری حصہ کھو رہے ہیں اور وہ سرور ہے۔ آپ یا تو اسے خود چلا سکتے ہیں یا ہوسٹڈ سروس استعمال کر سکتے ہیں۔

## <span dir="ltr">The Graph</span> سرور {#the-graph-server}

### گراف ایکسپلورر: ہوسٹڈ سروس {#graph-explorer-the-hosted-service}

سب سے آسان طریقہ ہوسٹڈ سروس کا استعمال کرنا ہے۔ سب گراف تعینات کرنے کے لیے [یہاں](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) دی گئی ہدایات پر عمل کریں۔ بہت سے پروجیکٹس کے لیے آپ دراصل [ایکسپلورر](https://thegraph.com/explorer/) میں موجودہ سب گرافس تلاش کر سکتے ہیں۔

![The Graph-Explorer](./thegraph-explorer.png)

### اپنا نوڈ چلانا {#running-your-own-node}

متبادل کے طور پر آپ اپنا نوڈ چلا سکتے ہیں۔ دستاویزات [یہاں](https://github.com/graphprotocol/graph-node#quick-start) ہیں۔ ایسا کرنے کی ایک وجہ ایسے نیٹ ورک کا استعمال ہو سکتی ہے جو ہوسٹڈ سروس کے ذریعے تعاون یافتہ نہیں ہے۔ فی الحال تعاون یافتہ نیٹ ورکس [یہاں مل سکتے ہیں](https://thegraph.com/docs/en/developing/supported-networks/)۔

## لامركزی مستقبل {#the-decentralized-future}

<span dir="ltr">GraphQL</span> نئے آنے والے ایونٹس کے لیے اسٹریمز کو بھی سپورٹ کرتا ہے۔ یہ گراف پر [سب اسٹریمز (Substreams)](https://thegraph.com/docs/en/substreams/) کے ذریعے تعاون یافتہ ہیں جو فی الحال اوپن بیٹا میں ہیں۔

[<span dir="ltr">2021</span>](https://thegraph.com/blog/mainnet-migration/) میں <span dir="ltr">The Graph</span> نے ایک لامركزی اشاریہ سازی نیٹ ورک کی طرف اپنی منتقلی شروع کی۔ آپ اس لامركزی اشاریہ سازی نیٹ ورک کے فن تعمیر کے بارے میں مزید [یہاں](https://thegraph.com/docs/en/network/explorer/) پڑھ سکتے ہیں۔

دو اہم پہلو یہ ہیں:

1. صارفین کیوریز کے لیے انڈیکسرز کو ادائیگی کرتے ہیں۔
2. انڈیکسرز گراف ٹوکنز (<span dir="ltr">GRT</span>) کو اسٹیک کرتے ہیں۔