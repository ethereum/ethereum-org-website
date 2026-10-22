---
title: "عقد ذكي ⁦Hello World⁩ للمبتدئين"
description: "برنامج تعليمي تمهيدي حول كتابة ونشر عقد ذكي بسيط على إيثيريوم."
author: "إيلانه"
tags: ["Solidity", "Hardhat", "Alchemy", "عقود ذكية", "نشر"]
skill: beginner
breadcrumb: "عقد ⁦Hello World⁩"
lang: ar
published: 2021-03-31
---

إذا كنت جديدًا في تطوير سلسلة الكتل ولا تعرف من أين تبدأ، أو إذا كنت ترغب فقط في فهم كيفية نشر العقود الذكية والتفاعل معها، فهذا الدليل مناسب لك. سنستعرض كيفية إنشاء ونشر عقد ذكي بسيط على شبكة اختبار Sepolia باستخدام محفظة افتراضية [ميتاماسك](https://metamask.io/)، و[Solidity](https://docs.soliditylang.org/)، و[Hardhat](https://hardhat.org/)، و[Alchemy](https://www.alchemy.com/eth) (لا تقلق إذا كنت لا تفهم معنى أي من هذا بعد، فسنشرحه).

بمجرد نشر عقدك، يمكنك [بناء واجهة مستخدم له](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

إذا كانت لديك أسئلة في أي وقت، فلا تتردد في التواصل معنا في [ديسكورد Alchemy](https://discord.gg/gWuC7zB)!

## الخطوة 1: الاتصال بشبكة إيثيريوم {#step-1}

هناك العديد من الطرق لتقديم طلبات إلى سلسلة إيثيريوم. للتبسيط، سنستخدم حسابًا مجانيًا على Alchemy، وهي منصة لمطوري سلسلة الكتل وAPI تتيح لنا التواصل مع سلسلة إيثيريوم دون الحاجة إلى تشغيل عقدنا الخاصة. تحتوي المنصة أيضًا على أدوات مطورين للمراقبة والتحليلات سنستفيد منها في هذا البرنامج التعليمي لفهم ما يحدث داخليًا في نشر عقدنا الذكي. إذا لم يكن لديك حساب Alchemy بالفعل، [يمكنك التسجيل مجانًا من هنا](https://dashboard.alchemy.com/signup).

## الخطوة 2: إنشاء تطبيقك (ومفتاح API) {#step-2}

بمجرد إنشاء حساب Alchemy، يمكنك إنشاء مفتاح API عن طريق إنشاء تطبيق. سيسمح لنا ذلك بتقديم طلبات إلى شبكة اختبار Sepolia. إذا لم تكن على دراية بشبكات الاختبار، فراجع [هذه الصفحة](/developers/docs/networks/).

1.  انتقل إلى صفحة "Create new app" (إنشاء تطبيق جديد) في لوحة تحكم Alchemy الخاصة بك عن طريق تحديد "Select an app" (تحديد تطبيق) في شريط التنقل والنقر على "Create new app"

![Hello world create app](./hello-world-create-app.png)

2. قم بتسمية تطبيقك "Hello World"، وقدم وصفًا قصيرًا، واختر حالة استخدام، على سبيل المثال، "Infra & Tooling". بعد ذلك، ابحث عن "Ethereum" وحدد الشبكة.

![create app view hello world](./create-app-view-hello-world.png)

3. انقر على "Next" (التالي) للمتابعة، ثم "Create app" (إنشاء تطبيق) وهذا كل شيء! يجب أن يظهر تطبيقك في القائمة المنسدلة لشريط التنقل، مع توفر مفتاح API للنسخ.

## الخطوة 3: إنشاء حساب إيثيريوم (عنوان) {#step-3}

نحتاج إلى حساب إيثيريوم لإرسال واستقبال المعاملات. في هذا البرنامج التعليمي، سنستخدم ميتاماسك، وهي محفظة افتراضية في المتصفح تُستخدم لإدارة عنوان حساب إيثيريوم الخاص بك. المزيد حول [المعاملات](/developers/docs/transactions/).

يمكنك تنزيل ميتاماسك وإنشاء حساب إيثيريوم مجانًا [من هنا](https://metamask.io/download). عند إنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى شبكة اختبار "Sepolia" باستخدام القائمة المنسدلة للشبكة (حتى لا نتعامل بأموال حقيقية).

إذا لم ترَ Sepolia مدرجة، فافتح القائمة في الزاوية العلوية اليمنى، وحدد "Networks" (الشبكات)، وقم بتشغيل "Show test networks" (إظهار شبكات الاختبار) في أسفل قائمة الشبكات (راجع [دليل ميتاماسك لعرض شبكات الاختبار](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)). ثم حدد "Sepolia" في قائمة اختيار الشبكة.

![مثال على ميتاماسك Sepolia](./metamask-sepolia-example.png)

## الخطوة 4: إضافة إيثر من صنبور {#step-4}

من أجل نشر عقدنا الذكي على شبكة الاختبار، سنحتاج إلى بعض الإيثر الوهمي. للحصول على ETH على Sepolia، يمكنك الانتقال إلى [تفاصيل شبكة Sepolia](/developers/docs/networks/#sepolia) لعرض قائمة بالصنابير المختلفة. إذا لم يعمل أحدها، فجرب آخر لأنها قد تنفد أحيانًا. تحتوي بعض الصنابير على قواعد أهلية؛ على سبيل المثال، يتطلب صنبور Sepolia الخاص بـ Alchemy أن يحتفظ العنوان المستلم بما لا يقل عن <span dir="ltr">0.001 ETH</span> على شبكة إيثيريوم الرئيسية. قد يستغرق الأمر بعض الوقت لتلقي ETH الوهمي الخاص بك بسبب حركة مرور الشبكة. يجب أن ترى ETH في حساب ميتاماسك الخاص بك بعد فترة وجيزة!

## الخطوة 5: التحقق من رصيدك {#step-5}

للتحقق مرة أخرى من وجود رصيدنا، دعنا نجري طلب [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) باستخدام [أداة الملحن الخاصة بـ Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). سيعيد هذا مقدار ETH في محفظتنا. بعد إدخال عنوان حساب ميتاماسك الخاص بك والنقر على "Send Request" (إرسال طلب)، يجب أن ترى استجابة مثل هذه:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **ملاحظة:** هذه النتيجة بوحدة Wei وليس ETH. تُستخدم Wei كأصغر فئة من الإيثر. التحويل من Wei إلى ETH هو: <span dir="ltr">1 eth = 10<sup>18</sup> wei</span>. لذا إذا قمنا بتحويل <span dir="ltr">0x2B5E3AF16B1880000</span> إلى النظام العشري نحصل على <span dir="ltr">5\*10¹⁸</span> والذي يساوي <span dir="ltr">5 ETH</span>.
>
> أوف! أموالنا الوهمية كلها موجودة <Emoji text=":money_mouth_face:" size={1} />.

## الخطوة 6: تهيئة مشروعنا {#step-6}

أولاً، سنحتاج إلى إنشاء مجلد لمشروعنا. انتقل إلى سطر الأوامر واكتب:

```sh
mkdir hello-world
cd hello-world
```

الآن بعد أن أصبحنا داخل مجلد مشروعنا، سنستخدم `npm init` لتهيئة المشروع. إذا لم يكن لديك npm مثبتًا بالفعل، فاتبع [إرشادات تثبيت Node.js](https://nodejs.org/en/download/) (سنحتاج إلى Node.js وnpm لهذا البرنامج التعليمي).

```sh
npm init
```

لا يهم حقًا كيف تجيب على أسئلة التثبيت، إليك كيف فعلنا ذلك كمرجع:

```text
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

وافق على package.json. يدعم Hardhat 3، الذي سنقوم بتثبيته بعد ذلك، مشاريع وحدات ES فقط، لذا حدد المشروع كواحد منها:

```sh
npm pkg set type=module
```

ونحن جاهزون للبدء!

## الخطوة 7: تنزيل [Hardhat](https://hardhat.org/docs/getting-started) {#step-7}

Hardhat هي بيئة تطوير لتجميع برامج إيثيريوم الخاصة بك ونشرها واختبارها وتصحيح أخطائها. إنها تساعد المطورين عند بناء العقود الذكية والتطبيقات اللامركزية (dapps) محليًا قبل النشر على السلسلة المباشرة.

يتطلب Hardhat 3 إصدار <span dir="ltr">Node.js v22.13.0</span> أو أحدث. داخل مشروع `hello-world` الخاص بنا، قم بتشغيل:

```sh
npm install --save-dev hardhat
```

تحقق من هذه الصفحة لمزيد من التفاصيل حول [إرشادات التثبيت](https://hardhat.org/docs/getting-started).

## الخطوة 8: إنشاء مشروع Hardhat {#step-8}

سيؤدي تشغيل `npx hardhat --init` إلى إنشاء مشروع نموذج كامل، ولكن في هذا البرنامج التعليمي سنقوم بإعداد الأشياء يدويًا حتى تتمكن من رؤية كل جزء. في الدليل الجذر لمجلد مشروعك، قم بإنشاء ملف يسمى `hardhat.config.js` بالمحتويات التالية:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

هذا هو المكان الذي سنحدد فيه كل الإعدادات لمشروعنا (في الخطوة 13). في الوقت الحالي، يخبر Hardhat فقط بإصدار مترجم Solidity الذي يجب استخدامه.

## الخطوة 9: إضافة مجلدات المشروع {#step-9}

للحفاظ على تنظيم مشروعنا، سنقوم بإنشاء مجلدين جديدين. انتقل إلى الدليل الجذر لمشروعك في سطر الأوامر واكتب:

```sh
mkdir contracts
mkdir scripts
```

- `contracts/` هو المكان الذي سنحتفظ فيه بملف كود العقد الذكي hello world الخاص بنا
- `scripts/` هو المكان الذي سنحتفظ فيه بالبرامج النصية لنشر عقدنا والتفاعل معه

## الخطوة 10: كتابة عقدنا {#step-10}

قد تسأل نفسك، متى بحق الجحيم سنكتب الكود؟؟ حسنًا، ها نحن ذا، في الخطوة 10.

افتح مشروع hello-world في محرر النصوص المفضل لديك (نحن نفضل [VSCode](https://code.visualstudio.com/)). تُكتب العقود الذكية بلغة تسمى Solidity وهي ما سنستخدمه لكتابة العقد الذكي HelloWorld.sol الخاص بنا.‌

1.  انتقل إلى مجلد "contracts" وقم بإنشاء ملف جديد يسمى HelloWorld.sol
2.  يوجد أدناه نموذج لعقد ذكي Hello World من مؤسسة إيثيريوم سنستخدمه في هذا البرنامج التعليمي. انسخ والصق المحتويات أدناه في ملف HelloWorld.sol الخاص بك، وتأكد من قراءة التعليقات لفهم ما يفعله هذا العقد:

```solidity
// SPDX-License-Identifier: MIT
// يحدد إصدار Solidity، باستخدام تحديد الإصدار الدلالي.
// لمعرفة المزيد: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// يحدد عقداً باسم `HelloWorld`.
// العقد هو مجموعة من الدوال والبيانات (حالته). بمجرد نشره، يتواجد العقد في عنوان محدد على سلسلة الكتل لإيثيريوم. لمعرفة المزيد: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // يعلن عن متغير حالة `message` من النوع `string`.
   // متغيرات الحالة هي متغيرات يتم تخزين قيمها بشكل دائم في مساحة تخزين العقد. الكلمة المفتاحية `public` تجعل المتغيرات قابلة للوصول من خارج العقد وتنشئ دالة يمكن للعقود أو العملاء الآخرين استدعاؤها للوصول إلى القيمة.
   string public message;

   // على غرار العديد من اللغات كائنية التوجه القائمة على الفئات، فإن المُنشئ هو دالة خاصة يتم تنفيذها فقط عند إنشاء العقد.
   // تُستخدم المُنشئات لتهيئة بيانات العقد. لمعرفة المزيد: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // يقبل وسيطة نصية `initMessage` ويعين القيمة في متغير التخزين `message` الخاص بالعقد).
      message = initMessage;
   }

   // دالة عامة تقبل وسيطة نصية وتحدث متغير التخزين `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

هذا عقد ذكي بسيط للغاية يخزن رسالة عند الإنشاء ويمكن تحديثه عن طريق استدعاء دالة `update`.

## الخطوة 11: ربط ميتاماسك وAlchemy بمشروعك {#step-11}

لقد أنشأنا محفظة ميتاماسك، وحساب Alchemy، وكتبنا عقدنا الذكي، والآن حان الوقت لربط الثلاثة.

تتطلب كل معاملة يتم إرسالها من محفظتك الافتراضية توقيعًا باستخدام مفتاحك الخاص الفريد. لتزويد برنامجنا بهذا الإذن، يمكننا تخزين مفتاحنا الخاص (ومفتاح واجهة برمجة التطبيقات (API) الخاص بـ Alchemy) بأمان في ملف بيئة.

> لمعرفة المزيد حول إرسال المعاملات، تحقق من [وثائق المعاملات](/developers/docs/transactions/).

قم بإنشاء ملف `.env` في الدليل الجذر لمشروعنا، وأضف إليه مفتاحك الخاص في ميتاماسك وعنوان URL الخاص بـ HTTP Alchemy API.

- اتبع [هذه الإرشادات](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) لتصدير مفتاحك الخاص
- انظر أدناه للحصول على عنوان URL الخاص بـ HTTP Alchemy API

![الحصول على مفتاح Alchemy API](./get-alchemy-api-key.png)

انسخ عنوان URL الخاص بـ Alchemy API

يجب أن يبدو ملف `.env` الخاص بك هكذا:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

لربط هذه المتغيرات فعليًا بالكود الخاص بنا، سنشير إليها في ملف `hardhat.config.js` الخاص بنا في الخطوة 13. يمكن لـ Node.js قراءة ملفات `.env` بمفرده، لذلك لا توجد حزمة إضافية لتثبيتها.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
لا تقم بإيداع (commit) ملف <code>.env</code>! يرجى التأكد من عدم مشاركة أو كشف ملف <code>.env</code> الخاص بك لأي شخص، لأنك بذلك تعرض أسرارك للخطر. إذا كنت تستخدم نظام التحكم في الإصدار، فأضف ملف <code>.env</code> الخاص بك إلى ملف <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## الخطوة 12: تثبيت Ethers.js {#step-12-install-ethersjs}

Ethers.js هي مكتبة تسهل التفاعل وتقديم الطلبات إلى إيثيريوم عن طريق تغليف [طرق JSON-RPC القياسية](/developers/docs/apis/json-rpc/) بطرق أكثر سهولة في الاستخدام.

يجعل Hardhat من السهل جدًا دمج [المكونات الإضافية (Plugins)](https://hardhat.org/docs/plugins/official-plugins) للحصول على أدوات إضافية ووظائف موسعة. سنستفيد من [المكون الإضافي Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) لنشر العقد (يحتوي [Ethers.js](https://docs.ethers.org/v6/) على بعض طرق نشر العقود النظيفة للغاية).

في دليل مشروعك اكتب:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

سنضيف أيضًا المكون الإضافي إلى `hardhat.config.js` الخاص بنا في الخطوة التالية.

## الخطوة 13: تحديث hardhat.config.js {#step-13-update-hardhatconfigjs}

لقد أضفنا العديد من التبعيات والمكونات الإضافية حتى الآن، والآن نحتاج إلى تحديث `hardhat.config.js` حتى يعرف مشروعنا عنها جميعًا.

قم بتحديث `hardhat.config.js` الخاص بك ليبدو هكذا:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// تحميل API_URL و PRIVATE_KEY من ملف .env إلى process.env، إذا كان موجوداً
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

يخبر `configVariable` Hardhat بقراءة كل قيمة من متغير بيئة فقط عند الحاجة إليها، لذلك تعمل الأوامر مثل `compile` حتى قبل تعيين القيم. إذا كنت تفضل عدم الاحتفاظ بمفتاحك الخاص في ملف نصي عادي، فيمكن لـ Hardhat أيضًا قراءة [متغيرات التكوين من مخزن المفاتيح المشفر](https://hardhat.org/docs/guides/configuration-variables).

## الخطوة 14: تجميع عقدنا {#step-14-compile-our-contracts}

للتأكد من أن كل شيء يعمل حتى الآن، دعنا نجمع عقدنا. مهمة `compile` هي إحدى مهام Hardhat المدمجة.

من سطر الأوامر قم بتشغيل:

```sh
npx hardhat compile
```

في المرة الأولى التي تقوم فيها بالتجميع، يقوم Hardhat بتنزيل مترجم Solidity. يجب أن ترى بعد ذلك شيئًا مثل `Compiled 1 Solidity file with solc 0.8.34`. إذا لم يكن الأمر كذلك، يمكنك دائمًا إرسال رسالة في [ديسكورد Alchemy](https://discord.gg/gWuC7zB).

## الخطوة 15: كتابة برنامج النشر النصي الخاص بنا {#step-15-write-our-deploy-scripts}

الآن بعد أن تمت كتابة عقدنا وأصبح ملف التكوين الخاص بنا جاهزًا، حان الوقت لكتابة البرنامج النصي لنشر العقد.

انتقل إلى مجلد `scripts/` وقم بإنشاء ملف جديد يسمى `deploy.js`، مع إضافة المحتويات التالية إليه:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// بدء النشر، وإرجاع وعد يحل إلى كائن عقد
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

دعنا نستعرض ما يفعله كل سطر من أسطر الكود هذه.

```js
const { ethers } = await network.create()
```

في Hardhat 3، يفتح البرنامج النصي اتصالاً بشبكة بشكل صريح. يتصل `network.create()` بالشبكة التي تختارها باستخدام خيار `--network` عند تشغيل البرنامج النصي، ويضيف المكون الإضافي `hardhat-ethers` كائن `ethers` إلى هذا الاتصال.

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` في ethers.js هو تجريد يُستخدم لنشر عقود ذكية جديدة، لذا فإن `HelloWorld` هنا هو مصنع لمثيلات عقد hello world الخاص بنا. عند استخدام المكون الإضافي `hardhat-ethers`، يتم توصيل مثيلات `ContractFactory` و`Contract` بالموقّع الأول افتراضيًا.

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

سيؤدي استدعاء `deploy()` على `ContractFactory` إلى بدء النشر، وإرجاع `Promise` الذي يتم حله إلى `Contract`. هذا هو الكائن الذي يحتوي على طريقة لكل دالة من دوال العقد الذكي الخاص بنا. تذهب الوسائط التي تمررها إلى `deploy()` إلى مُنشئ العقد، وهنا الرسالة الأولية.

ينتظر `waitForDeployment()` حتى يتم تضمين معاملة النشر في كتلة، ويعيد `getAddress()` عنوان العقد الجديد. راجع [وثائق عقد ethers.js](https://docs.ethers.org/v6/api/contract/) لمزيد من التفاصيل.

## الخطوة 16: نشر عقدنا {#step-16-deploy-our-contract}

نحن مستعدون أخيرًا لنشر عقدنا الذكي! انتقل إلى سطر الأوامر وقم بتشغيل:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

يجب أن ترى بعد ذلك شيئًا مثل:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

إذا ذهبنا إلى [Etherscan الخاص بـ Sepolia](https://sepolia.etherscan.io/) وبحثنا عن عنوان عقدنا، فيجب أن نتمكن من رؤية أنه قد تم نشره بنجاح. ستبدو المعاملة كالتالي:

![عقد etherscan](./etherscan-contract.png)

يجب أن يتطابق عنوان `From` (من) مع عنوان حساب ميتاماسك الخاص بك وسيشير عنوان `To` (إلى) إلى "Contract Creation" (إنشاء عقد) ولكن إذا نقرنا على المعاملة فسنرى عنوان عقدنا في حقل `To`:

![معاملة etherscan](./etherscan-transaction.png)

تهانينا! لقد قمت للتو بنشر عقد ذكي على سلسلة إيثيريوم 🎉

لفهم ما يحدث داخليًا، يمكنك إلقاء نظرة على الطلبات التي تلقاها تطبيق "Hello World" الخاص بك في [لوحة تحكم Alchemy](https://dashboard.alchemy.com/).

هناك سترى مجموعة من استدعاءات JSON-RPC التي أجراها Hardhat/Ethers داخليًا نيابة عنا عندما استدعينا دالة `.deploy()`. هناك استدعاءان مهمان يجب الإشارة إليهما هنا وهما [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction)، وهو طلب كتابة عقدنا فعليًا على سلسلة Sepolia، و[`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) وهو طلب لقراءة معلومات حول معاملتنا بناءً على التجزئة (نمط نموذجي عند إرسال المعاملات). لمعرفة المزيد حول إرسال المعاملات، تحقق من [وثائق المعاملات](/developers/docs/transactions/).

هذا كل شيء في هذا البرنامج التعليمي. بعد ذلك، يمكنك [بناء واجهة مستخدم لعقدك](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).
