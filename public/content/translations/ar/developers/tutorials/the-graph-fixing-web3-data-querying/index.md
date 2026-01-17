---
title: "The Graph: إصلاح استعلام بيانات Web3"
description: البلوكتشين تشبه قاعدة البيانات ولكن بدون SQL. جميع البيانات موجودة، ولكن لا توجد طريقة للوصول إليها. دعني أريك كيفية إصلاح هذا باستخدام The Graph و GraphQL.
author: Markus Waas
lang: ar
tags:
  [
    "الصلابة",
    "العقود الذكيه ",
    "استفسار",
    "the graph",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

هذه المرة سنلقي نظرة فاحصة على The Graph الذي أصبح بشكل أساسي جزءًا من الحزمة القياسية لتطوير التطبيقات اللامركزية في العام الماضي. دعنا نرى أولاً كيف سنقوم بالأشياء بالطريقة التقليدية...

## بدون The Graph... {#without-the-graph}

لذا دعنا نستخدم مثالًا بسيطًا لأغراض التوضيح. كلنا نحب الألعاب، لذا تخيل لعبة بسيطة يضع فيها المستخدمون رهانات:

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

الآن لنفترض أننا في تطبيقنا اللامركزي، نريد عرض إجمالي الرهانات، وإجمالي الألعاب الخاسرة/الرابحة وكذلك تحديثها كلما لعب شخص ما مرة أخرى. سيكون النهج:

1. جلب `totalGamesPlayerWon`.
2. جلب `totalGamesPlayerLost`.
3. الاشتراك في أحداث `BetPlaced`.

يمكننا الاستماع إلى [الحدث في Web3](https://docs.web3js.org/api/web3/class/Contract#events) كما هو موضح على اليمين، ولكنه يتطلب معالجة عدد غير قليل من الحالات.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // تم إطلاق الحدث
})
.on('changed', function(event) {
    // تمت إزالة الحدث مرة أخرى
})
.on('error', function(error, receipt) {
    // تم رفض المعاملة
});
```

الآن هذا لا يزال جيدًا إلى حد ما لمثالنا البسيط. ولكن لنفترض أننا نريد الآن عرض مبالغ الرهانات الخاسرة/الرابحة فقط للاعب الحالي. حسنًا، حظنا سيئ، من الأفضل لك نشر عقد جديد يخزن هذه القيم ويجلبها. والآن تخيل عقدًا ذكيًا وتطبيقًا لامركزيًا أكثر تعقيدًا، يمكن أن تصبح الأمور فوضوية بسرعة.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

يمكنك أن ترى كيف أن هذا ليس الأمثل:

- لا يعمل مع العقود المنشورة بالفعل.
- تكاليف غاز إضافية لتخزين هذه القيم.
- يتطلب استدعاء آخر لجلب البيانات من عقدة إيثريوم.

![Thats not good enough](./not-good-enough.jpg)

الآن دعونا نلقي نظرة على حل أفضل.

## دعني أقدم لكم GraphQL {#let-me-introduce-to-you-graphql}

أولاً، دعنا نتحدث عن GraphQL، الذي صممته ونفذته شركة Facebook في الأصل. قد تكون على دراية بنموذج واجهة برمجة التطبيقات REST التقليدية. تخيل الآن أنه يمكنك بدلاً من ذلك كتابة استعلام للبيانات التي تريدها بالضبط:

![GraphQL API vs. REST API](./graphql.jpg)

![](./graphql-query.gif)

تلتقط الصورتان جوهر GraphQL إلى حد كبير. باستخدام الاستعلام الموجود على اليمين، يمكننا تحديد البيانات التي نريدها بالضبط، لذلك نحصل على كل شيء في طلب واحد ولا شيء أكثر مما نحتاجه بالضبط. يتعامل خادم GraphQL مع جلب جميع البيانات المطلوبة، لذلك من السهل جدًا على جانب المستهلك في واجهة التطبيق استخدامه. [هذا شرح لطيف](https://www.apollographql.com/blog/graphql-explained) لكيفية تعامل الخادم مع استعلام بالضبط إذا كنت مهتمًا.

الآن مع هذه المعرفة، دعنا ننتقل أخيرًا إلى فضاء البلوكتشين وThe Graph.

## ما هو The Graph؟ {#what-is-the-graph}

البلوكتشين هي قاعدة بيانات لامركزية، ولكن على عكس ما هو معتاد، ليس لدينا لغة استعلام لقاعدة البيانات هذه. حلول استرجاع البيانات مؤلمة أو مستحيلة تمامًا. The Graph هو بروتوكول لامركزي لفهرسة بيانات البلوكتشين والاستعلام عنها. وربما خمنت ذلك، إنه يستخدم GraphQL كلغة استعلام.

![The Graph](./thegraph.png)

الأمثلة هي دائمًا الأفضل لفهم شيء ما، لذلك دعونا نستخدم The Graph لمثال GameContract الخاص بنا.

## كيفية إنشاء Subgraph {#how-to-create-a-subgraph}

يُطلق على تعريف كيفية فهرسة البيانات اسم subgraph. يتطلب ثلاثة مكونات:

1. البيان (Manifest) (`subgraph.yaml`)
2. المخطط (Schema) (`schema.graphql`)
3. الربط (Mapping) (`mapping.ts`)

### البيان (Manifest) (`subgraph.yaml`) {#manifest}

البيان هو ملف التكوين الخاص بنا ويحدد:

- أي العقود الذكية يجب فهرستها (العنوان، الشبكة، واجهة التطبيق الثنائية...)
- أي الأحداث التي يجب الاستماع إليها
- أشياء أخرى للاستماع إليها مثل استدعاءات الوظائف أو الكتل
- دوال الربط التي يتم استدعاؤها (انظر `mapping.ts` أدناه)

يمكنك تحديد عقود ومعالجات متعددة هنا. سيكون الإعداد النموذجي هو وجود مجلد subgraph داخل مشروع Hardhat مع مستودعه الخاص. ثم يمكنك بسهولة الرجوع إلى واجهة التطبيق الثنائية.

لأسباب تتعلق بالراحة، قد ترغب أيضًا في استخدام أداة قوالب مثل mustache. ثم تقوم بإنشاء `subgraph.template.yaml` وإدراج العناوين بناءً على أحدث عمليات النشر. لإعداد مثال أكثر تقدمًا، انظر على سبيل المثال [مستودع Aave subgraph](https://github.com/aave/aave-protocol/tree/master/thegraph).

ويمكن الاطلاع على التوثيق الكامل [هنا](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### المخطط (Schema) (`schema.graphql`) {#schema}

المخطط هو تعريف بيانات GraphQL. سيسمح لك بتحديد الكيانات الموجودة وأنواعها. الأنواع المدعومة من The Graph هي

- بايت
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

يمكنك أيضًا استخدام الكيانات كنوع لتعريف العلاقات. في مثالنا، نحدد علاقة 1 إلى متعدد من اللاعب إلى الرهانات. الرمز ! يعني أن القيمة لا يمكن أن تكون فارغة. يمكن الاطلاع على التوثيق الكامل [هنا](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### الربط (Mapping) (`mapping.ts`) {#mapping}

يحدد ملف الربط في The Graph وظائفنا التي تحول الأحداث الواردة إلى كيانات. إنه مكتوب بلغة AssemblyScript، وهي مجموعة فرعية من Typescript. وهذا يعني أنه يمكن تجميعه في WASM (WebAssembly) لتنفيذ الربط بشكل أكثر كفاءة وسهولة.

ستحتاج إلى تحديد كل دالة مسماة في ملف `subgraph.yaml`، لذا في حالتنا نحتاج فقط إلى دالة واحدة: `handleNewBet`. نحاول أولاً تحميل كيان اللاعب من عنوان المرسل كمعرّف. إذا لم يكن موجودًا، فإننا ننشئ كيانًا جديدًا ونملأه بالقيم الأولية.

ثم ننشئ كيان Bet جديد. سيكون المعرّف لهذا هو `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` مما يضمن دائمًا قيمة فريدة. استخدام التجزئة (هاش) فقط لا يكفي حيث قد يقوم شخص ما باستدعاء دالة placeBet عدة مرات في معاملة واحدة عبر عقد ذكي.

أخيرًا، يمكننا تحديث كيان اللاعب بجميع البيانات. لا يمكن إلحاق العناصر بالمصفوفات مباشرةً، ولكن يجب تحديثها كما هو موضح هنا. نستخدم المعرّف للإشارة إلى الرهان. و `.save()` مطلوب في النهاية لتخزين كيان.

يمكن الاطلاع على التوثيق الكامل هنا: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. يمكنك أيضًا إضافة مخرجات التسجيل إلى ملف الربط، انظر [هنا](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // أنشئ إذا لم يكن موجودًا بعد
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

  // حدّث المصفوفة هكذا
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## استخدامه في واجهة التطبيق {#using-it-in-the-frontend}

باستخدام شيء مثل Apollo Boost، يمكنك بسهولة دمج The Graph في تطبيق React اللامركزي (أو Apollo-Vue). خاصة عند استخدام React hooks وApollo، فإن جلب البيانات بسيط مثل كتابة استعلام GraphQL واحد في المكون الخاص بك. قد يبدو الإعداد النموذجي كما يلي:

```javascript
// انظر جميع الرسوم البيانية الفرعية: https://thegraph.com/explorer/
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

والآن يمكننا كتابة استعلام مثل هذا على سبيل المثال. سيؤدي هذا إلى جلب

- كم مرة فاز المستخدم الحالي
- كم مرة خسر المستخدم الحالي
- قائمة من الطوابع الزمنية مع جميع رهاناته السابقة

كل ذلك في طلب واحد إلى خادم GraphQL.

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

لكننا نفتقد قطعة أخيرة من اللغز وهي الخادم. يمكنك إما تشغيله بنفسك أو استخدام الخدمة المستضافة.

## خادم The Graph {#the-graph-server}

### مستكشف The Graph: الخدمة المستضافة {#graph-explorer-the-hosted-service}

أسهل طريقة هي استخدام الخدمة المستضافة. اتبع التعليمات [هنا](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) لنشر subgraph. بالنسبة للعديد من المشاريع، يمكنك في الواقع العثور على subgraphs موجودة في [المستكشف](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### تشغيل عقدتك الخاصة {#running-your-own-node}

بدلاً من ذلك، يمكنك تشغيل عقدتك الخاصة. المستندات [هنا](https://github.com/graphprotocol/graph-node#quick-start). أحد أسباب القيام بذلك قد يكون استخدام شبكة غير مدعومة من قبل الخدمة المستضافة. يمكن العثور على الشبكات المدعومة حاليًا [هنا](https://thegraph.com/docs/en/developing/supported-networks/).

## المستقبل اللامركزي {#the-decentralized-future}

يدعم GraphQL التدفقات أيضًا للأحداث الواردة حديثًا. هذه مدعومة على the graph من خلال [Substreams](https://thegraph.com/docs/en/substreams/) وهي حاليًا في إصدار تجريبي مفتوح.

في [2021](https://thegraph.com/blog/mainnet-migration/) بدأ The Graph انتقاله إلى شبكة فهرسة لامركزية. يمكنك قراءة المزيد حول بنية شبكة الفهرسة اللامركزية هذه [هنا](https://thegraph.com/docs/en/network/explorer/).

هناك جانبان رئيسيان هما:

1. يدفع المستخدمون للمفهرسين مقابل الاستعلامات.
2. يقوم المفهرسون بتخزين حصص رموز The Graph (GRT).
