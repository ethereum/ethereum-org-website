---
title: "⁦The Graph⁩: إصلاح الاستعلام عن بيانات ⁦Web3⁩"
description: "سلسلة الكتل تشبه قاعدة البيانات ولكن بدون ⁦SQL⁩. جميع البيانات موجودة، ولكن لا توجد طريقة للوصول إليها. دعني أوضح لك كيفية إصلاح ذلك باستخدام ⁦The Graph⁩ و⁦GraphQL⁩."
author: ماركوس واس
lang: ar
tags: ["solidity", "العقود الذكية", "الاستعلام", "the graph", "react"]
skill: intermediate
breadcrumb: "⁦The Graph⁩"
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

هذه المرة سنلقي نظرة فاحصة على `<span dir="ltr">The Graph</span>` والذي أصبح بشكل أساسي جزءًا من الحزمة القياسية لتطوير التطبيقات اللامركزية (dapps) في العام الماضي. دعونا نرى أولاً كيف كنا سنفعل الأشياء بالطريقة التقليدية...

## بدون `<span dir="ltr">The Graph</span>`... {#without-the-graph}

لذا دعونا نأخذ مثالاً بسيطاً لأغراض التوضيح. كلنا نحب الألعاب، لذا تخيل لعبة بسيطة يضع فيها المستخدمون الرهانات:

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

الآن لنفترض أننا في تطبيقنا اللامركزي (dapp)، نريد عرض إجمالي الرهانات، وإجمالي الألعاب التي خسرها/فاز بها، وتحديثها أيضاً كلما لعب شخص ما مرة أخرى. سيكون النهج كالتالي:

1. جلب `totalGamesPlayerWon`.
2. جلب `totalGamesPlayerLost`.
3. الاشتراك في أحداث `BetPlaced`.

يمكننا الاستماع إلى [الحدث في `<span dir="ltr">Web3</span>`](https://docs.web3js.org/api/web3/class/Contract#events) كما هو موضح على اليمين، ولكنه يتطلب التعامل مع عدد غير قليل من الحالات.

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

الآن لا يزال هذا جيداً إلى حد ما لمثالنا البسيط. ولكن لنفترض أننا نريد الآن عرض مبالغ الرهانات التي خسرها/فاز بها اللاعب الحالي فقط. حسناً، لم يحالفنا الحظ، من الأفضل لك نشر عقد جديد يخزن تلك القيم وجلبها. والآن تخيل عقداً ذكياً وتطبيقاً لامركزياً (dapp) أكثر تعقيداً، يمكن أن تصبح الأمور فوضوية بسرعة.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

يمكنك أن ترى كيف أن هذا ليس مثالياً:

- لا يعمل مع العقود المنشورة بالفعل.
- تكاليف غاز إضافية لتخزين تلك القيم.
- يتطلب استدعاءً آخر لجلب البيانات لعقدة إيثيريوم.

![Thats not good enough](./not-good-enough.jpg)

الآن دعونا نلقي نظرة على حل أفضل.

## دعني أقدم لك `<span dir="ltr">GraphQL</span>` {#let-me-introduce-to-you-graphql}

أولاً لنتحدث عن `<span dir="ltr">GraphQL</span>`، الذي تم تصميمه وتنفيذه في الأصل بواسطة فيسبوك. قد تكون على دراية بنموذج `<span dir="ltr">REST API</span>` التقليدي. الآن تخيل بدلاً من ذلك أنه يمكنك كتابة استعلام للحصول على البيانات التي تريدها بالضبط:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

تلتقط الصورتان إلى حد كبير جوهر `<span dir="ltr">GraphQL</span>`. باستخدام الاستعلام الموجود على اليمين، يمكننا تحديد البيانات التي نريدها بالضبط، لذلك نحصل على كل شيء في طلب واحد ولا شيء أكثر مما نحتاجه بالضبط. يتعامل خادم `<span dir="ltr">GraphQL</span>` مع جلب جميع البيانات المطلوبة، لذلك من السهل جداً على جانب المستهلك في الواجهة الأمامية استخدامه. [هذا شرح رائع](https://www.apollographql.com/blog/graphql-explained) لكيفية تعامل الخادم بالضبط مع الاستعلام إذا كنت مهتماً.

الآن مع هذه المعرفة، دعونا نقفز أخيراً إلى مساحة سلسلة الكتل و `<span dir="ltr">The Graph</span>`.

## ما هو `<span dir="ltr">The Graph</span>`؟ {#what-is-the-graph}

سلسلة الكتل هي قاعدة بيانات لامركزية، ولكن على عكس ما هو معتاد، ليس لدينا لغة استعلام لقاعدة البيانات هذه. حلول استرداد البيانات مؤلمة أو مستحيلة تماماً. `<span dir="ltr">The Graph</span>` هو بروتوكول لامركزي لفهرسة بيانات سلسلة الكتل والاستعلام عنها. وكما خمنت على الأرجح، فإنه يستخدم `<span dir="ltr">GraphQL</span>` كلغة استعلام.

![The Graph](./thegraph.png)

الأمثلة هي دائماً أفضل طريقة لفهم شيء ما، لذا دعونا نستخدم `<span dir="ltr">The Graph</span>` لمثال `<span dir="ltr">GameContract</span>` الخاص بنا.

## كيفية إنشاء رسم بياني فرعي {#how-to-create-a-subgraph}

يُطلق على تعريف كيفية فهرسة البيانات اسم رسم بياني فرعي. ويتطلب ثلاثة مكونات:

1. البيان (`subgraph.yaml`)
2. المخطط (`schema.graphql`)
3. التعيين (`mapping.ts`)

### البيان (`subgraph.yaml`) {#manifest}

البيان هو ملف التكوين الخاص بنا ويحدد:

- العقود الذكية التي يجب فهرستها (العنوان، الشبكة، `<span dir="ltr">ABI</span>`...)
- الأحداث التي يجب الاستماع إليها
- أشياء أخرى يجب الاستماع إليها مثل استدعاءات الدوال أو الكتل
- دوال التعيين التي يتم استدعاؤها (انظر `mapping.ts` أدناه)

يمكنك تحديد عقود ومعالجات متعددة هنا. سيحتوي الإعداد النموذجي على مجلد رسم بياني فرعي داخل مشروع `<span dir="ltr">Hardhat</span>` مع مستودعه الخاص. ثم يمكنك بسهولة الإشارة إلى `<span dir="ltr">ABI</span>`.

لأسباب تتعلق بالراحة، قد ترغب أيضاً في استخدام أداة قوالب مثل `<span dir="ltr">mustache</span>`. ثم تقوم بإنشاء `subgraph.template.yaml` وإدراج العناوين بناءً على أحدث عمليات النشر. للحصول على مثال إعداد أكثر تقدماً، راجع على سبيل المثال [مستودع الرسم البياني الفرعي لآفي](https://github.com/aave/aave-protocol/tree/master/thegraph).

ويمكن الاطلاع على الوثائق الكاملة [هنا](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### المخطط (`schema.graphql`) {#schema}

المخطط هو تعريف بيانات `<span dir="ltr">GraphQL</span>`. سيسمح لك بتحديد الكيانات الموجودة وأنواعها. الأنواع المدعومة من `<span dir="ltr">The Graph</span>` هي

- `<span dir="ltr">Bytes</span>`
- `<span dir="ltr">ID</span>`
- `<span dir="ltr">String</span>`
- `<span dir="ltr">Boolean</span>`
- `<span dir="ltr">Int</span>`
- `<span dir="ltr">BigInt</span>`
- `<span dir="ltr">BigDecimal</span>`

يمكنك أيضاً استخدام الكيانات كنوع لتحديد العلاقات. في مثالنا، نحدد علاقة واحد إلى متعدد (1-to-many) من اللاعب إلى الرهانات. تعني علامة `!` أن القيمة لا يمكن أن تكون فارغة. يمكن الاطلاع على الوثائق الكاملة [هنا](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### التعيين (`mapping.ts`) {#mapping}

يحدد ملف التعيين في `<span dir="ltr">The Graph</span>` دوالنا التي تحول الأحداث الواردة إلى كيانات. تمت كتابته بلغة `<span dir="ltr">AssemblyScript</span>`، وهي مجموعة فرعية من `<span dir="ltr">TypeScript</span>`. هذا يعني أنه يمكن تجميعه في `<span dir="ltr">WASM</span>` (`<span dir="ltr">WebAssembly</span>`) لتنفيذ التعيين بشكل أكثر كفاءة وقابلية للنقل.

ستحتاج إلى تحديد كل دالة مسماة في ملف `subgraph.yaml`، لذلك في حالتنا نحتاج إلى دالة واحدة فقط: `handleNewBet`. نحاول أولاً تحميل كيان اللاعب (`<span dir="ltr">Player</span>`) من عنوان المرسل كمعرف (`<span dir="ltr">id</span>`). إذا لم يكن موجوداً، نقوم بإنشاء كيان جديد ونملأه بقيم البداية.

ثم نقوم بإنشاء كيان رهان (`<span dir="ltr">Bet</span>`) جديد. سيكون المعرف (`<span dir="ltr">id</span>`) لهذا هو `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` مما يضمن دائماً قيمة فريدة. استخدام التجزئة فقط ليس كافياً لأن شخصاً ما قد يستدعي دالة `placeBet` عدة مرات في معاملة واحدة عبر عقد ذكي.

أخيراً يمكننا تحديث كيان اللاعب (`<span dir="ltr">Player</span>`) بجميع البيانات. لا يمكن الدفع إلى المصفوفات مباشرة، ولكن يجب تحديثها كما هو موضح هنا. نستخدم المعرف (`<span dir="ltr">id</span>`) للإشارة إلى الرهان. و `.save()` مطلوب في النهاية لتخزين كيان.

يمكن الاطلاع على الوثائق الكاملة هنا: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. يمكنك أيضاً إضافة مخرجات التسجيل إلى ملف التعيين، انظر [هنا](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // إنشاء إذا لم يكن موجوداً بعد
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

  // تحديث المصفوفة بهذا الشكل
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## استخدامه في الواجهة الأمامية {#using-it-in-the-frontend}

باستخدام شيء مثل `<span dir="ltr">Apollo Boost</span>`، يمكنك بسهولة دمج `<span dir="ltr">The Graph</span>` في تطبيق `<span dir="ltr">React</span>` اللامركزي الخاص بك (أو `<span dir="ltr">Apollo-Vue</span>`). خاصة عند استخدام خطافات `<span dir="ltr">React</span>` و `<span dir="ltr">Apollo</span>`، فإن جلب البيانات بسيط مثل كتابة استعلام `<span dir="ltr">GraphQL</span>` واحد في المكون الخاص بك. قد يبدو الإعداد النموذجي هكذا:

```javascript
// عرض جميع الرسوم البيانية الفرعية: https://thegraph.com/explorer/
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

والآن يمكننا كتابة استعلام مثل هذا على سبيل المثال. هذا سيجلب لنا

- كم مرة فاز المستخدم الحالي
- كم مرة خسر المستخدم الحالي
- قائمة بالطوابع الزمنية مع جميع رهاناته السابقة

كل ذلك في طلب واحد لخادم `<span dir="ltr">GraphQL</span>`.

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

## خادم `<span dir="ltr">The Graph</span>` {#the-graph-server}

### مستكشف `<span dir="ltr">Graph</span>`: الخدمة المستضافة {#graph-explorer-the-hosted-service}

أسهل طريقة هي استخدام الخدمة المستضافة. اتبع التعليمات [هنا](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) لنشر رسم بياني فرعي. بالنسبة للعديد من المشاريع، يمكنك في الواقع العثور على رسوم بيانية فرعية موجودة في [المستكشف](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### تشغيل العقدة الخاصة بك {#running-your-own-node}

بدلاً من ذلك، يمكنك تشغيل العقدة الخاصة بك. الوثائق [هنا](https://github.com/graphprotocol/graph-node#quick-start). أحد أسباب القيام بذلك قد يكون استخدام شبكة غير مدعومة من قبل الخدمة المستضافة. الشبكات المدعومة حالياً [يمكن العثور عليها هنا](https://thegraph.com/docs/en/developing/supported-networks/).

## المستقبل اللامركزي {#the-decentralized-future}

يدعم `<span dir="ltr">GraphQL</span>` التدفقات أيضاً للأحداث الواردة حديثاً. هذه مدعومة على `<span dir="ltr">The Graph</span>` من خلال [التدفقات الفرعية (`<span dir="ltr">Substreams</span>`)](https://thegraph.com/docs/en/substreams/) والتي هي حالياً في مرحلة تجريبية مفتوحة.

في عام [2021](https://thegraph.com/blog/mainnet-migration/) بدأ `<span dir="ltr">The Graph</span>` انتقاله إلى شبكة فهرسة لامركزية. يمكنك قراءة المزيد عن بنية شبكة الفهرسة اللامركزية هذه [هنا](https://thegraph.com/docs/en/network/explorer/).

هناك جانبان رئيسيان هما:

1. يدفع المستخدمون للمفهرسين مقابل الاستعلامات.
2. يقوم المفهرسون بتخزين حصة من رموز `<span dir="ltr">Graph</span>` (`<span dir="ltr">GRT</span>`).