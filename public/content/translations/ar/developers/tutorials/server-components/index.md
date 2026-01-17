---
title: "مكونات الخادم والوكلاء لتطبيقات Web3"
description: بعد قراءة هذا البرنامج التعليمي، ستتمكن من كتابة خوادم TypeScript التي تستمع إلى الأحداث على البلوكتشين وتستجيب وفقًا لذلك بمعاملاتها الخاصة. سيمكنك هذا من كتابة تطبيقات مركزية (لأن الخادم يمثل نقطة فشل)، ولكن يمكنها التفاعل مع كيانات Web3. يمكن أيضًا استخدام نفس الأساليب لكتابة وكيل يستجيب للأحداث على السلسلة دون تدخل بشري.

author: Ori Pomerantz
lang: ar
tags: [ "وكيل", "خادم", "خارج السلسلة" ]
skill: beginner
published: 2024-07-15
---

## مقدمة {#مقدمة}

في معظم الحالات، يستخدم التطبيق اللامركزي خادمًا لتوزيع البرنامج، ولكن كل التفاعل الفعلي يحدث بين العميل (عادةً، متصفح الويب) والبلوكتشين.

![التفاعل العادي بين خادم الويب والعميل والبلوكتشين](./fig-1.svg)

ومع ذلك، هناك بعض الحالات التي قد يستفيد فيها التطبيق من وجود مكون خادم يعمل بشكل مستقل. سيكون هذا الخادم قادرًا على الاستجابة للأحداث، والطلبات التي تأتي من مصادر أخرى، مثل واجهة برمجة التطبيقات (API)، عن طريق إصدار المعاملات.

![التفاعل مع إضافة خادم](./fig-2.svg)

هناك العديد من المهام المحتملة التي يمكن لمثل هذا الخادم أن يفي بها.

- حامل الحالة السرية. في الألعاب، غالبًا ما يكون من المفيد عدم إتاحة جميع المعلومات التي تعرفها اللعبة للاعبين. ومع ذلك، _لا توجد أسرار على البلوكتشين_، وأي معلومات موجودة في البلوكتشين من السهل على أي شخص معرفتها. لذلك، إذا كان من المقرر الحفاظ على سرية جزء من حالة اللعبة، فيجب تخزينه في مكان آخر (وربما يتم التحقق من تأثيرات تلك الحالة باستخدام [إثباتات المعرفة الصفرية](/zero-knowledge-proofs)).

- أوراكل مركزي. إذا كانت الحصص منخفضة بما فيه الكفاية، فقد يكون الخادم الخارجي الذي يقرأ بعض المعلومات عبر الإنترنت ثم ينشرها على السلسلة جيدًا بما يكفي لاستخدامه كـ [أوراكل](/developers/docs/oracles/).

- وكيل. لا يحدث شيء على البلوكتشين بدون معاملة لتفعيله. يمكن للخادم أن يعمل نيابة عن المستخدم لتنفيذ إجراءات مثل [المراجحة](/developers/docs/mev/#mev-examples-dex-arbitrage) عندما تتاح الفرصة.

## برنامج نموذجي {#sample-program}

يمكنك رؤية خادم نموذجي [على github](https://github.com/qbzzt/20240715-server-component). يستمع هذا الخادم إلى الأحداث الواردة من [هذا العقد](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code)، وهو إصدار معدل من Greeter الخاص بـ Hardhat. عندما يتم تغيير التحية، يقوم بتغييرها مرة أخرى.

لتشغيله:

1. استنسخ المستودع.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. ثبّت الحزم اللازمة. إذا لم يكن لديك بالفعل، [قم بتثبيت Node أولاً](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. حرر `.env` لتحديد المفتاح الخاص لحساب يحتوي على ETH على شبكة اختبار Holesky. إذا لم يكن لديك ETH على Holesky، فيمكنك [استخدام هذا السبيل](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <المفتاح الخاص يوضع هنا>
   ```

4. ابدأ الخادم.

   ```sh copy
   npm start
   ```

5. انتقل إلى [مستكشف الكتل](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract)، وباستخدام عنوان مختلف عن العنوان الذي يحتوي على المفتاح الخاص، قم بتعديل التحية. لاحظ أن التحية يتم تعديلها تلقائيًا مرة أخرى.

### How does it work؟ {#how-it-works}

أسهل طريقة لفهم كيفية كتابة مكون خادم هي مراجعة العينة سطرًا بسطر.

#### `src/app.ts` {#src-app-ts}

الغالبية العظمى من البرنامج موجودة في [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### إنشاء الكائنات الأساسية

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

هذه هي كيانات [Viem](https://viem.sh/) التي نحتاجها، والوظائف ونوع [`العنوان`](https://viem.sh/docs/glossary/types#address). هذا الخادم مكتوب بلغة [TypeScript](https://www.typescriptlang.org/)، وهي امتداد لـ JavaScript يجعلها [مكتوبة بقوة](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

تتيح لنا [هذه الوظيفة](https://viem.sh/docs/accounts/privateKey) إنشاء معلومات المحفظة، بما في ذلك العنوان، المطابق للمفتاح الخاص.

```typescript
import { holesky } from "viem/chains"
```

لاستخدام بلوكتشين في Viem، تحتاج إلى استيراد تعريفه. في هذه الحالة، نريد الاتصال ببلوكتشين اختبار [Holesky](https://github.com/eth-clients/holesky).

```typescript
// هكذا نضيف التعريفات الموجودة في .env إلى process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

هكذا نقرأ `.env` في البيئة. نحن بحاجة إليه من أجل المفتاح الخاص (انظر لاحقًا).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

لاستخدام عقد، نحتاج إلى عنوانه وواجهة التطبيق الثنائية [ABI](/glossary/#abi) الخاصة به. نحن نقدم كليهما هنا.

في JavaScript (وبالتالي TypeScript) لا يمكنك تعيين قيمة جديدة لثابت، ولكن يمكنك _تعديل_ الكائن المخزن فيه. باستخدام اللاحقة `as const`، فإننا نخبر TypeScript بأن القائمة نفسها ثابتة ولا يمكن تغييرها.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

أنشئ [عميلًا عامًا](https://viem.sh/docs/clients/public.html) من Viem. لا تحتوي العملاء العموميون على مفتاح خاص مرفق، وبالتالي لا يمكنهم إرسال معاملات. يمكنهم استدعاء [وظائف `العرض`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm)، وقراءة أرصدة الحسابات، وما إلى ذلك.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

متغيرات البيئة متاحة في [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). ومع ذلك، فإن TypeScript مكتوبة بقوة. يمكن أن يكون متغير البيئة أي سلسلة نصية، أو فارغًا، لذا فإن نوع متغير البيئة هو `string | undefined`. ومع ذلك، يتم تعريف المفتاح في Viem على أنه `0x${string}` (`0x` متبوعًا بسلسلة نصية). هنا نخبر TypeScript بأن متغير البيئة `PRIVATE_KEY` سيكون من هذا النوع. إذا لم يكن كذلك، فسنحصل على خطأ في وقت التشغيل.

تستخدم وظيفة [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) هذا المفتاح الخاص لإنشاء كائن حساب كامل.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

بعد ذلك، نستخدم كائن الحساب لإنشاء [عميل محفظة](https://viem.sh/docs/clients/wallet). يحتوي هذا العميل على مفتاح خاص وعنوان، لذلك يمكن استخدامه لإرسال المعاملات.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

الآن بعد أن أصبح لدينا كل المتطلبات الأساسية، يمكننا أخيرًا إنشاء [مثيل عقد](https://viem.sh/docs/contract/getContract). سنستخدم مثيل العقد هذا للتواصل مع العقد على السلسلة.

##### القراءة من البلوكتشين

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

وظائف العقد المخصصة للقراءة فقط ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) و [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) متاحة ضمن `read`. في هذه الحالة، نستخدمها للوصول إلى وظيفة [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217)، التي تُرجع التحية.

JavaScript هي أحادية الخيط، لذلك عندما نبدأ عملية طويلة الأمد، نحتاج إلى [تحديد أننا نفعل ذلك بشكل غير متزامن](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). يتطلب استدعاء البلوكتشين، حتى لعملية قراءة فقط، رحلة ذهابًا وإيابًا بين الكمبيوتر وعقدة بلوكتشين. هذا هو السبب في أننا نحدد هنا أن النص البرمجي يحتاج إلى `await` للنتيجة.

إذا كنت مهتمًا بكيفية عمل ذلك، يمكنك [القراءة عنه هنا](https://www.w3schools.com/js/js_promise.asp)، ولكن من الناحية العملية كل ما تحتاج إلى معرفته هو أنك `تنتظر` النتائج إذا بدأت عملية تستغرق وقتًا طويلاً، وأن أي وظيفة تقوم بذلك يجب أن تُعلن على أنها `async`.

##### إصدار المعاملات

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

هذه هي الوظيفة التي تستدعيها لإصدار معاملة تغير التحية. نظرًا لأن هذه عملية طويلة، يتم الإعلان عن الوظيفة على أنها `async`. بسبب التنفيذ الداخلي، تحتاج أي وظيفة `async` إلى إرجاع كائن `Promise`. في هذه الحالة، يعني `Promise<any>` أننا لا نحدد بالضبط ما سيتم إرجاعه في `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

يحتوي حقل `write` لمثيل العقد على جميع الوظائف التي تكتب إلى حالة البلوكتشين (تلك التي تتطلب إرسال معاملة)، مثل [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). يتم توفير المعلمات، إن وجدت، كقائمة، وتُرجع الوظيفة تجزئة (هاش) المعاملة.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

أبلغ عن تجزئة (هاش) المعاملة (كجزء من عنوان URL إلى مستكشف الكتل لعرضها) وأعدها.

##### الاستجابة للأحداث

```typescript
greeter.watchEvent.SetGreeting({
```

تتيح لك [وظيفة `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) تحديد تشغيل وظيفة عند إصدار حدث. إذا كنت تهتم فقط بنوع واحد من الأحداث (في هذه الحالة، `SetGreeting`)، فيمكنك استخدام هذه الصيغة لتقييد نفسك بهذا النوع من الأحداث.

```typescript
    onLogs: logs => {
```

يتم استدعاء وظيفة `onLogs` عندما تكون هناك إدخالات سجل. في إيثريوم، عادة ما يكون "السجل" و"الحدث" قابلين للتبادل.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

قد تكون هناك أحداث متعددة، ولكن للتبسيط نحن نهتم فقط بالحدث الأول. `logs[0].args` هي وسيطات الحدث، في هذه الحالة `sender` و`greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

إذا كان المرسل _ليس_ هذا الخادم، فاستخدم `setGreeting` لتغيير التحية.

#### `package.json` {#package-json}

[هذا الملف](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) يتحكم في تكوين [Node.js](https://nodejs.org/en). يشرح هذا المقال التعريفات المهمة فقط.

```json
{
  "main": "dist/index.js",
```

يحدد هذا التعريف ملف JavaScript الذي سيتم تشغيله.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

البرامج النصية هي إجراءات تطبيق مختلفة. في هذه الحالة، الوحيد الذي لدينا هو `start`، الذي يجمع ثم يشغل الخادم. الأمر `tsc` هو جزء من حزمة `typescript` ويجمع TypeScript إلى JavaScript. إذا كنت تريد تشغيله يدويًا، فهو موجود في `node_modules/.bin`. الأمر الثاني يشغل الخادم.

```json
  "type": "module",
```

هناك أنواع متعددة من تطبيقات عقدة JavaScript. يتيح لنا نوع `الوحدة` الحصول على `await` في النص البرمجي ذي المستوى الأعلى، وهو أمر مهم عند القيام بعمليات بطيئة (وهناك غير متزامنة).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

هذه حزم مطلوبة فقط للتطوير. هنا نحتاج إلى `typescript` ولأننا نستخدمه مع Node.js، فإننا نحصل أيضًا على أنواع متغيرات وكائنات العقدة، مثل `process`. يعني [تدوين `^<الإصدار>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) هذا الإصدار أو إصدارًا أعلى لا يحتوي على تغييرات جذرية. انظر [هنا](https://semver.org) لمزيد من المعلومات حول معنى أرقام الإصدارات.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

هذه حزم مطلوبة في وقت التشغيل، عند تشغيل `dist/app.js`.

## الخلاصة {#conclusion}

يقوم الخادم المركزي الذي أنشأناه هنا بعمله، وهو العمل كوكيل للمستخدم. يمكن لأي شخص آخر يريد أن يستمر التطبيق اللامركزي في العمل ومستعد لإنفاق الغاز تشغيل مثيل جديد من الخادم بعنوانه الخاص.

ومع ذلك، لا يعمل هذا إلا عندما يمكن التحقق بسهولة من إجراءات الخادم المركزي. إذا كان الخادم المركزي يحتوي على أي معلومات حالة سرية، أو يجري حسابات صعبة، فهو كيان مركزي تحتاج إلى الثقة به لاستخدام التطبيق، وهو بالضبط ما تحاول شبكات البلوكتشين تجنبه. في مقال مستقبلي، أخطط لإظهار كيفية استخدام [إثباتات المعرفة الصفرية](/zero-knowledge-proofs) للتغلب على هذه المشكلة.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).
