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

إذا كنت جديدًا في مجال تطوير سلسلة الكتل ولا تعرف من أين تبدأ، أو إذا كنت ترغب فقط في فهم كيفية نشر العقود الذكية والتفاعل معها، فهذا الدليل مناسب لك. سنستعرض خطوات إنشاء ونشر عقد ذكي بسيط على شبكة اختبار Sepolia باستخدام محفظة افتراضية [ميتاماسك](https://metamask.io/)، و[Solidity](https://docs.soliditylang.org/en/v0.8.0/)، و[Hardhat](https://hardhat.org/)، و[Alchemy](https://www.alchemy.com/eth) (لا تقلق إذا كنت لا تفهم معنى أي من هذا بعد، فسنقوم بشرحه).

في [الجزء الثاني](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) من هذا البرنامج التعليمي، سنستعرض كيفية التفاعل مع عقدنا الذكي بمجرد نشره هنا، وفي [الجزء الثالث](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) سنغطي كيفية نشره على Etherscan.

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

يمكنك تنزيل ميتاماسك وإنشاء حساب إيثيريوم مجانًا [هنا](https://metamask.io/download). عند إنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى شبكة اختبار "Sepolia" باستخدام القائمة المنسدلة للشبكة (حتى لا نتعامل بأموال حقيقية).

إذا لم ترَ Sepolia مدرجة، فانتقل إلى القائمة، ثم Advanced (متقدم) وقم بالتمرير لأسفل لتبديل "Show test networks" (إظهار شبكات الاختبار) إلى وضع التشغيل. في قائمة تحديد الشبكة، اختر علامة التبويب "Custom" (مخصص) للعثور على قائمة بشبكات الاختبار وحدد "Sepolia".

![metamask sepolia example](./metamask-sepolia-example.png)

## الخطوة 4: إضافة إيثر من صنبور {#step-4}

من أجل نشر عقدنا الذكي على شبكة الاختبار، سنحتاج إلى بعض الـ ETH الوهمي. للحصول على <span dir="ltr">Sepolia ETH</span> يمكنك الذهاب إلى [تفاصيل شبكة Sepolia](/developers/docs/networks/#sepolia) لعرض قائمة بالصنابير المختلفة. إذا لم يعمل أحدها، جرب آخر لأنها قد تنفد أحيانًا. قد يستغرق الأمر بعض الوقت لتلقي الـ ETH الوهمي الخاص بك بسبب حركة مرور الشبكة. يجب أن ترى ETH في حساب ميتاماسك الخاص بك بعد فترة وجيزة!

## الخطوة 5: التحقق من رصيدك {#step-5}

للتحقق مرة أخرى من وجود رصيدنا، دعنا نجري طلب [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) باستخدام [أداة الملحن الخاصة بـ Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). سيعيد هذا مقدار ETH في محفظتنا. بعد إدخال عنوان حساب ميتاماسك الخاص بك والنقر على "Send Request" (إرسال طلب)، يجب أن ترى استجابة مثل هذه:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **ملاحظة:** هذه النتيجة بوحدة Wei وليس ETH. تُستخدم Wei كأصغر فئة من الإيثر. التحويل من Wei إلى ETH هو: <span dir="ltr">1 eth = 10<sup>18</sup> wei</span>. لذا إذا قمنا بتحويل <span dir="ltr">0x2B5E3AF16B1880000</span> إلى النظام العشري نحصل على <span dir="ltr">5\*10¹⁸</span> والذي يساوي <span dir="ltr">5 ETH</span>.
>
> أوف! أموالنا الوهمية كلها موجودة <Emoji text=":money_mouth_face:" size={1} />.

## الخطوة 6: تهيئة مشروعنا {#step-6}

أولاً، سنحتاج إلى إنشاء مجلد لمشروعنا. انتقل إلى سطر الأوامر واكتب:

```
mkdir hello-world
cd hello-world
```

الآن بعد أن أصبحنا داخل مجلد مشروعنا، سنستخدم `npm init` لتهيئة المشروع. إذا لم يكن لديك npm مثبتًا بالفعل، فاتبع [هذه التعليمات](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (سنحتاج أيضًا إلى Node.js لذا قم بتنزيله أيضًا!).

```
npm init
```

لا يهم حقًا كيف تجيب على أسئلة التثبيت، إليك كيف فعلنا ذلك كمرجع:

```
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

وافق على package.json ونحن جاهزون للبدء!

## الخطوة 7: تنزيل [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat هي بيئة تطوير لتجميع برمجيات إيثيريوم الخاصة بك ونشرها واختبارها وتصحيح أخطائها. إنها تساعد المطورين عند بناء العقود الذكية والتطبيقات اللامركزية (dapps) محليًا قبل النشر على السلسلة الحية.

داخل مشروع `hello-world` الخاص بنا، قم بتشغيل:

```
npm install --save-dev hardhat
```

راجع هذه الصفحة لمزيد من التفاصيل حول [تعليمات التثبيت](https://hardhat.org/getting-started/#overview).

## الخطوة 8: إنشاء مشروع Hardhat {#step-8}

داخل مجلد مشروعنا، قم بتشغيل:

```
npx hardhat
```

يجب أن ترى بعد ذلك رسالة ترحيب وخيارًا لتحديد ما تريد القيام به. حدد "create an empty hardhat.config.js":

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

سيؤدي هذا إلى إنشاء ملف `hardhat.config.js` لنا حيث سنحدد جميع إعدادات مشروعنا (في الخطوة 13).

## الخطوة 9: إضافة مجلدات المشروع {#step-9}

للحفاظ على تنظيم مشروعنا، سنقوم بإنشاء مجلدين جديدين. انتقل إلى الدليل الجذر لمشروعك في سطر الأوامر واكتب:

```
mkdir contracts
mkdir scripts
```

- `contracts/` هو المكان الذي سنحتفظ فيه بملف كود العقد الذكي hello world الخاص بنا
- `scripts/` هو المكان الذي سنحتفظ فيه بالبرامج النصية لنشر عقدنا والتفاعل معه

## الخطوة 10: كتابة عقدنا {#step-10}

قد تسأل نفسك، متى بالضبط سنكتب الكود؟؟ حسنًا، ها نحن ذا، في الخطوة 10.

افتح مشروع hello-world في محرر النصوص المفضل لديك (نحن نفضل [VSCode](https://code.visualstudio.com/)). تُكتب العقود الذكية بلغة تسمى Solidity وهي ما سنستخدمه لكتابة العقد الذكي HelloWorld.sol الخاص بنا.‌

1.  انتقل إلى مجلد "contracts" وأنشئ ملفًا جديدًا يسمى HelloWorld.sol
2.  يوجد أدناه نموذج لعقد ذكي Hello World من مؤسسة إيثيريوم سنستخدمه في هذا البرنامج التعليمي. انسخ والصق المحتويات أدناه في ملف HelloWorld.sol الخاص بك، وتأكد من قراءة التعليقات لفهم ما يفعله هذا العقد:

```solidity
// يحدد إصدار Solidity، باستخدام الإصدار الدلالي.
// لمعرفة المزيد: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// يُعرّف عقداً باسم `HelloWorld`.
// العقد هو مجموعة من الدوال والبيانات (حالته). بمجرد نشره، يتواجد العقد في عنوان محدد على سلسلة الكتل إيثيريوم. لمعرفة المزيد: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // يُصرّح عن متغير حالة `message` من النوع `string`.
   // متغيرات الحالة هي متغيرات تُخزن قيمها بشكل دائم في مساحة تخزين العقد. الكلمة المفتاحية `public` تجعل المتغيرات قابلة للوصول من خارج العقد وتُنشئ دالة يمكن للعقود أو العملاء الآخرين استدعاؤها للوصول إلى القيمة.
   string public message;

   // على غرار العديد من اللغات كائنية التوجه المعتمدة على الفئات، يُعد المُنشئ دالة خاصة تُنفذ فقط عند إنشاء العقد.
   // تُستخدم المُنشئات لتهيئة بيانات العقد. لمعرفة المزيد:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // يقبل وسيطة نصية `initMessage` ويُعين القيمة في متغير التخزين `message` الخاص بالعقد).
      message = initMessage;
   }

   // دالة عامة تقبل وسيطة نصية وتُحدث متغير التخزين `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

هذا عقد ذكي بسيط للغاية يخزن رسالة عند إنشائه ويمكن تحديثه عن طريق استدعاء دالة `update`.

## الخطوة 11: ربط ميتاماسك وAlchemy بمشروعك {#step-11}

لقد أنشأنا محفظة ميتاماسك، وحساب Alchemy، وكتبنا عقدنا الذكي، والآن حان الوقت لربط الثلاثة.

تتطلب كل معاملة يتم إرسالها من محفظتك الافتراضية توقيعًا باستخدام مفتاحك الخاص الفريد. لتزويد برنامجنا بهذا الإذن، يمكننا تخزين مفتاحنا الخاص (ومفتاح API الخاص بـ Alchemy) بأمان في ملف بيئة.

> لمعرفة المزيد حول إرسال المعاملات، راجع [هذا البرنامج التعليمي](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) حول إرسال المعاملات باستخدام Web3.

أولاً، قم بتثبيت حزمة dotenv في دليل مشروعك:

```
npm install dotenv --save
```

ثم، أنشئ ملف `.env` في الدليل الجذر لمشروعنا، وأضف مفتاح ميتاماسك الخاص بك وعنوان URL الخاص بـ HTTP Alchemy API إليه.

- اتبع [هذه التعليمات](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) لتصدير مفتاحك الخاص
- انظر أدناه للحصول على عنوان URL الخاص بـ HTTP Alchemy API

![get alchemy api key](./get-alchemy-api-key.png)

نسخ عنوان URL الخاص بـ Alchemy API

يجب أن يبدو ملف `.env` الخاص بك هكذا:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

لربط هذه المتغيرات فعليًا بالكود الخاص بنا، سنشير إليها في ملف `hardhat.config.js` الخاص بنا في الخطوة 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
لا تقم بإيداع (commit) ملف <code>.env</code>! يرجى التأكد من عدم مشاركة أو كشف ملف <code>.env</code> الخاص بك لأي شخص، لأنك بذلك تعرض أسرارك للخطر. إذا كنت تستخدم نظام التحكم في الإصدارات، فأضف ملف <code>.env</code> الخاص بك إلى ملف <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## الخطوة 12: تثبيت Ethers.js {#step-12-install-ethersjs}

Ethers.js هي مكتبة تسهل التفاعل وتقديم الطلبات إلى إيثيريوم عن طريق تغليف [طرق JSON-RPC القياسية](/developers/docs/apis/json-rpc/) بطرق أكثر سهولة في الاستخدام.

يجعل Hardhat من السهل جدًا دمج [الإضافات (Plugins)](https://hardhat.org/plugins/) للحصول على أدوات إضافية ووظائف موسعة. سنستفيد من [إضافة Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) لنشر العقد (تحتوي [Ethers.js](https://github.com/ethers-io/ethers.js/) على بعض طرق نشر العقود الواضحة والممتازة).

في دليل مشروعك اكتب:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

سنحتاج أيضًا إلى ethers في ملف `hardhat.config.js` الخاص بنا في الخطوة التالية.

## الخطوة 13: تحديث hardhat.config.js {#step-13-update-hardhatconfigjs}

لقد أضفنا العديد من التبعيات والإضافات حتى الآن، والآن نحتاج إلى تحديث `hardhat.config.js` حتى يتعرف مشروعنا عليها جميعًا.

قم بتحديث `hardhat.config.js` الخاص بك ليبدو هكذا:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## الخطوة 14: تجميع عقدنا {#step-14-compile-our-contracts}

للتأكد من أن كل شيء يعمل حتى الآن، دعنا نجمع عقدنا. مهمة `compile` هي إحدى مهام Hardhat المدمجة.

من سطر الأوامر قم بتشغيل:

```
npx hardhat compile
```

قد تتلقى تحذيرًا بشأن `SPDX license identifier not provided in source file` ، ولكن لا داعي للقلق حيال ذلك — نأمل أن يبدو كل شيء آخر جيدًا! إذا لم يكن الأمر كذلك، يمكنك دائمًا إرسال رسالة في [ديسكورد Alchemy](https://discord.gg/u72VCg3).

## الخطوة 15: كتابة برنامج النشر النصي الخاص بنا {#step-15-write-our-deploy-scripts}

الآن بعد أن تمت كتابة عقدنا وملف التكوين الخاص بنا جاهز للعمل، حان الوقت لكتابة البرنامج النصي لنشر العقد.

انتقل إلى مجلد `scripts/` وأنشئ ملفًا جديدًا يسمى `deploy.js` ، مع إضافة المحتويات التالية إليه:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // بدء النشر، وإرجاع وعد (promise) يحل إلى كائن عقد
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

يقوم Hardhat بعمل رائع في شرح ما يفعله كل سطر من أسطر الكود هذه في [البرنامج التعليمي للعقود](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) الخاص بهم، وقد اعتمدنا تفسيراتهم هنا.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

إن `ContractFactory` في Ethers.js هو تجريد يُستخدم لنشر عقود ذكية جديدة، لذا فإن `HelloWorld` هنا هو مصنع لمثيلات عقد hello world الخاص بنا. عند استخدام إضافة `hardhat-ethers`، يتم توصيل مثيلات `ContractFactory` و`Contract` بالموقّع الأول افتراضيًا.

```
const hello_world = await HelloWorld.deploy();
```

سيؤدي استدعاء `deploy()` على `ContractFactory` إلى بدء النشر، وإرجاع `Promise` يحل إلى `Contract`. هذا هو الكائن الذي يحتوي على طريقة (method) لكل دالة من دوال العقد الذكي الخاص بنا.

## الخطوة 16: نشر عقدنا {#step-16-deploy-our-contract}

نحن مستعدون أخيرًا لنشر عقدنا الذكي! انتقل إلى سطر الأوامر وقم بتشغيل:

```
npx hardhat run scripts/deploy.js --network sepolia
```

يجب أن ترى بعد ذلك شيئًا مثل:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

إذا ذهبنا إلى [Etherscan الخاص بـ Sepolia](https://sepolia.etherscan.io/) وبحثنا عن عنوان عقدنا، فيجب أن نتمكن من رؤية أنه قد تم نشره بنجاح. ستبدو المعاملة كالتالي:

![etherscan contract](./etherscan-contract.png)

يجب أن يتطابق عنوان `From` مع عنوان حساب ميتاماسك الخاص بك وسيشير عنوان "To" (إلى) إلى "Contract Creation" (إنشاء عقد) ولكن إذا نقرنا على المعاملة فسنرى عنوان عقدنا في حقل `To`:

![etherscan transaction](./etherscan-transaction.png)

تهانينا! لقد قمت للتو بنشر عقد ذكي على سلسلة إيثيريوم 🎉

لفهم ما يحدث داخليًا، دعنا ننتقل إلى علامة التبويب Explorer (المستكشف) في [لوحة تحكم Alchemy](https://dashboard.alchemyapi.io/explorer) الخاصة بنا. إذا كان لديك تطبيقات Alchemy متعددة، فتأكد من التصفية حسب التطبيق وحدد "Hello World".
![hello world explorer](./hello-world-explorer.png)

هنا سترى مجموعة من استدعاءات JSON-RPC التي أجراها Hardhat/Ethers داخليًا نيابة عنا عندما استدعينا دالة `.deploy()`. هناك استدعاءان مهمان يجب الإشارة إليهما هنا وهما [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction)، وهو طلب كتابة عقدنا فعليًا على سلسلة Sepolia، و[`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) وهو طلب لقراءة معلومات حول معاملتنا بناءً على التجزئة (نمط نموذجي عند إجراء المعاملات). لمعرفة المزيد حول إرسال المعاملات، راجع هذا البرنامج التعليمي حول [إرسال المعاملات باستخدام Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

هذا كل شيء بالنسبة للجزء الأول من هذا البرنامج التعليمي، في الجزء الثاني سنقوم فعليًا بـ [التفاعل مع عقدنا الذكي](https://www.alchemy.com/docs/interacting-with-a-smart-contract) عن طريق تحديث رسالتنا الأولية، وفي الجزء الثالث سنقوم بـ [نشر عقدنا الذكي على Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) حتى يعرف الجميع كيفية التفاعل معه.

**هل تريد معرفة المزيد عن Alchemy؟ راجع [موقعنا الإلكتروني](https://www.alchemy.com/eth). ألا تريد أن تفوتك أي تحديثات؟ اشترك في نشرتنا الإخبارية [هنا](https://www.alchemy.com/newsletter)! تأكد أيضًا من الانضمام إلى [ديسكورد](https://discord.gg/u72VCg3) الخاص بنا.**.