---
title: "مكونات الخادم والوكلاء لتطبيقات ⁦web3⁩"
description: "بعد قراءة هذا البرنامج التعليمي، ستتمكن من كتابة خوادم ⁦TypeScript⁩ تستمع إلى الأحداث على سلسلة الكتل وتستجيب وفقًا لذلك بمعاملاتها الخاصة. سيمكنك هذا من كتابة تطبيقات مركزية (لأن الخادم يمثل نقطة فشل)، ولكن يمكنها التفاعل مع كيانات ⁦web3⁩. يمكن أيضًا استخدام نفس التقنيات لكتابة وكيل يستجيب للأحداث على السلسلة دون تدخل بشري."
author: "أوري بوميرانتس"
lang: ar
tags: ["وكيل", "خادم", "خارج السلسلة", "dapps"]
skill: beginner
breadcrumb: "مكونات الخادم"
published: 2024-07-15
---

## مقدمة {#introduction}

في معظم الحالات، يستخدم التطبيق اللامركزي (dapp) خادمًا لتوزيع البرنامج، ولكن كل التفاعل الفعلي يحدث بين العميل (عادةً، متصفح الويب) وسلسلة الكتل.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

ومع ذلك، هناك بعض الحالات التي قد يستفيد فيها التطبيق من وجود مكون خادم يعمل بشكل مستقل. سيكون مثل هذا الخادم قادرًا على الاستجابة للأحداث، وللطلبات التي تأتي من مصادر أخرى، مثل <span dir="ltr">API</span>، عن طريق إصدار المعاملات.

![The interaction with the addition of a server](./fig-2.svg)

هناك العديد من المهام المحتملة التي يمكن لمثل هذا الخادم إنجازها.

- حامل الحالة السرية. في الألعاب، غالبًا ما يكون من المفيد ألا تكون كل المعلومات التي تعرفها اللعبة متاحة للاعبين. ومع ذلك، _لا توجد أسرار على سلسلة الكتل_، فأي معلومات موجودة في سلسلة الكتل يسهل على أي شخص اكتشافها. لذلك، إذا كان يجب إبقاء جزء من حالة اللعبة سريًا، فيجب تخزينه في مكان آخر (وربما يتم التحقق من تأثيرات تلك الحالة باستخدام [براهين المعرفة الصفرية](/zero-knowledge-proofs)).

- أوراكل مركزي. إذا كانت المخاطر منخفضة بما فيه الكفاية، فإن الخادم الخارجي الذي يقرأ بعض المعلومات عبر الإنترنت ثم ينشرها على السلسلة قد يكون جيدًا بما يكفي لاستخدامه كـ [أوراكل](/developers/docs/oracles/).

- وكيل. لا يحدث شيء على سلسلة الكتل دون معاملة لتنشيطه. يمكن للخادم أن يتصرف نيابة عن المستخدم لأداء إجراءات مثل [المراجحة](/developers/docs/mev/#mev-examples-dex-arbitrage) عندما تسنح الفرصة.

## برنامج نموذجي {#sample-program}

يمكنك رؤية خادم نموذجي [على GitHub](https://github.com/qbzzt/20240715-server-component). يستمع هذا الخادم إلى الأحداث القادمة من [هذا العقد](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code)، وهو نسخة معدلة من عقد الترحيب الخاص بـ Hardhat. عندما يتم تغيير التحية، فإنه يعيدها إلى ما كانت عليه.

لتشغيله:

1. استنسخ المستودع.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. قم بتثبيت الحزم اللازمة. إذا لم يكن لديك بالفعل، [قم بتثبيت Node أولاً](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. قم بتحرير `.env` لتحديد المفتاح الخاص لحساب يمتلك <span dir="ltr">ETH</span> على شبكة اختبار هوليسكي. إذا لم يكن لديك <span dir="ltr">ETH</span> على هوليسكي، يمكنك [استخدام هذا الصنبور](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. ابدأ تشغيل الخادم.

   ```sh copy
   npm start
   ```

5. انتقل إلى [مستكشف الكتل](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract)، وباستخدام عنوان مختلف عن العنوان الذي يمتلك المفتاح الخاص، قم بتعديل التحية. لاحظ أن التحية يتم تعديلها تلقائيًا للعودة إلى ما كانت عليه.

### كيف يعمل؟ {#how-it-works}

أسهل طريقة لفهم كيفية كتابة مكون خادم هي مراجعة النموذج سطرًا بسطر.

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

هذه هي كيانات [Viem](https://viem.sh/) التي نحتاجها، الدوال و[النوع `Address`](https://viem.sh/docs/glossary/types#address). هذا الخادم مكتوب بلغة [TypeScript](https://www.typescriptlang.org/)، وهي امتداد للغة JavaScript يجعلها [قوية النوع](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

تتيح لنا [هذه الدالة](https://viem.sh/docs/accounts/privateKey) إنشاء معلومات المحفظة، بما في ذلك العنوان، المقابلة لمفتاح خاص.

```typescript
import { holesky } from "viem/chains"
```

لاستخدام سلسلة الكتل في Viem، تحتاج إلى استيراد تعريفها. في هذه الحالة، نريد الاتصال بسلسلة كتل الاختبار [هوليسكي](https://github.com/eth-clients/holesky).

```typescript
// هكذا نضيف التعريفات في .env إلى process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

هذه هي الطريقة التي نقرأ بها `.env` في البيئة. نحتاجه من أجل المفتاح الخاص (انظر لاحقًا).

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

لاستخدام عقد، نحتاج إلى عنوانه و[<span dir="ltr">ABI</span>](/glossary/#abi) الخاص به. نحن نقدم كليهما هنا.

في JavaScript (وبالتالي TypeScript) لا يمكنك تعيين قيمة جديدة لثابت، ولكن _يمكنك_ تعديل الكائن المخزن فيه. باستخدام اللاحقة `as const`، فإننا نخبر TypeScript أن القائمة نفسها ثابتة ولا يجوز تغييرها.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

قم بإنشاء [عميل عام](https://viem.sh/docs/clients/public.html) في Viem. العملاء العامون ليس لديهم مفتاح خاص مرفق، وبالتالي لا يمكنهم إرسال المعاملات. يمكنهم استدعاء [دوال `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm)، وقراءة أرصدة الحسابات، وما إلى ذلك.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

متغيرات البيئة متاحة في [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). ومع ذلك، فإن TypeScript قوية النوع. يمكن أن يكون متغير البيئة أي سلسلة نصية، أو فارغًا، لذا فإن نوع متغير البيئة هو `string | undefined`. ومع ذلك، يتم تعريف المفتاح في Viem على أنه `0x${string}` (`0x` متبوعًا بسلسلة نصية). هنا نخبر TypeScript أن متغير البيئة `PRIVATE_KEY` سيكون من هذا النوع. إذا لم يكن كذلك، فسنحصل على خطأ في وقت التشغيل.

تستخدم الدالة [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) بعد ذلك هذا المفتاح الخاص لإنشاء كائن حساب كامل.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

بعد ذلك، نستخدم كائن الحساب لإنشاء [عميل محفظة](https://viem.sh/docs/clients/wallet). يحتوي هذا العميل على مفتاح خاص وعنوان، لذا يمكن استخدامه لإرسال المعاملات.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

الآن بعد أن أصبح لدينا جميع المتطلبات الأساسية، يمكننا أخيرًا إنشاء [نسخة عقد](https://viem.sh/docs/contract/getContract). سنستخدم نسخة العقد هذه للتواصل مع العقد على السلسلة.

##### القراءة من سلسلة الكتل

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

دوال العقد المخصصة للقراءة فقط ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) و[`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) متاحة ضمن `read`. في هذه الحالة، نستخدمها للوصول إلى الدالة [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217)، والتي تُرجع التحية.

لغة JavaScript أحادية المسار (single-threaded)، لذلك عندما نطلق عملية طويلة الأمد، نحتاج إلى [تحديد أننا نقوم بذلك بشكل غير متزامن](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). يتطلب استدعاء سلسلة الكتل، حتى بالنسبة لعملية القراءة فقط، رحلة ذهاب وإياب بين الكمبيوتر وعقدة سلسلة الكتل. هذا هو السبب في أننا نحدد هنا أن الكود يحتاج إلى `await` (انتظار) النتيجة.

إذا كنت مهتمًا بكيفية عمل ذلك، يمكنك [القراءة عنه هنا](https://www.w3schools.com/js/js_promise.asp)، ولكن من الناحية العملية، كل ما تحتاج إلى معرفته هو أنك تستخدم `await` للنتائج إذا بدأت عملية تستغرق وقتًا طويلاً، وأن أي دالة تقوم بذلك يجب الإعلان عنها كـ `async`.

##### إصدار المعاملات

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

هذه هي الدالة التي تستدعيها لإصدار معاملة تغير التحية. نظرًا لأن هذه عملية طويلة، يتم الإعلان عن الدالة كـ `async`. بسبب التنفيذ الداخلي، تحتاج أي دالة `async` إلى إرجاع كائن `Promise`. في هذه الحالة، يعني `Promise<any>` أننا لا نحدد بالضبط ما سيتم إرجاعه في `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

يحتوي الحقل `write` في نسخة العقد على جميع الدوال التي تكتب في حالة سلسلة الكتل (تلك التي تتطلب إرسال معاملة)، مثل [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). يتم توفير المعلمات، إن وجدت، كقائمة، وتُرجع الدالة تجزئة المعاملة.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

أبلغ عن تجزئة المعاملة (كجزء من عنوان URL لمستكشف الكتل لعرضها) وقم بإرجاعها.

##### الاستجابة للأحداث

```typescript
greeter.watchEvent.SetGreeting({
```

تتيح لك [الدالة `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) تحديد دالة ليتم تشغيلها عند إصدار حدث. إذا كنت تهتم فقط بنوع واحد من الأحداث (في هذه الحالة، `SetGreeting`)، يمكنك استخدام بناء الجملة هذا لقصر نفسك على نوع الحدث هذا.

```typescript
    onLogs: logs => {
```

يتم استدعاء الدالة `onLogs` عندما تكون هناك إدخالات سجل. في إيثيريوم، عادةً ما يكون المصطلحان "سجل" و"حدث" قابلين للتبادل.

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

إذا _لم_ يكن المرسل هو هذا الخادم، فاستخدم `setGreeting` لتغيير التحية.

#### `package.json` {#package-json}

يتحكم [هذا الملف](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) في تكوين [Node.js](https://nodejs.org/en). تشرح هذه المقالة التعريفات المهمة فقط.

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

البرامج النصية هي إجراءات تطبيق مختلفة. في هذه الحالة، الإجراء الوحيد الذي لدينا هو `start`، والذي يقوم بتجميع الخادم ثم تشغيله. الأمر `tsc` هو جزء من حزمة `typescript` ويقوم بتجميع TypeScript إلى JavaScript. إذا كنت ترغب في تشغيله يدويًا، فهو موجود في `node_modules/.bin`. الأمر الثاني يقوم بتشغيل الخادم.

```json
  "type": "module",
```

هناك أنواع متعددة من تطبيقات عقدة JavaScript. يتيح لنا النوع `module` استخدام `await` في كود المستوى الأعلى، وهو أمر مهم عندما تقوم بعمليات بطيئة (وبالتالي غير متزامنة).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

هذه هي الحزم المطلوبة فقط للتطوير. هنا نحتاج إلى `typescript` ولأننا نستخدمه مع Node.js، فإننا نحصل أيضًا على الأنواع لمتغيرات وكائنات العقدة، مثل `process`. يعني [الترميز `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) هذا الإصدار أو إصدارًا أعلى لا يحتوي على تغييرات جذرية. راجع [هنا](https://semver.org) لمزيد من المعلومات حول معنى أرقام الإصدارات.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

هذه هي الحزم المطلوبة في وقت التشغيل، عند تشغيل `dist/app.js`.

## الخاتمة {#conclusion}

الخادم المركزي الذي أنشأناه هنا يقوم بعمله، وهو العمل كوكيل للمستخدم. يمكن لأي شخص آخر يريد أن يستمر التطبيق اللامركزي (dapp) في العمل ومستعد لإنفاق الغاز تشغيل نسخة جديدة من الخادم بعنوانه الخاص.

ومع ذلك، لا ينجح هذا إلا عندما يمكن التحقق من إجراءات الخادم المركزي بسهولة. إذا كان الخادم المركزي يحتوي على أي معلومات حالة سرية، أو يقوم بإجراء حسابات صعبة، فهو كيان مركزي تحتاج إلى الوثوق به لاستخدام التطبيق، وهو بالضبط ما تحاول سلاسل الكتل تجنبه. في مقال مستقبلي، أخطط لإظهار كيفية استخدام [براهين المعرفة الصفرية](/zero-knowledge-proofs) للتغلب على هذه المشكلة.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).