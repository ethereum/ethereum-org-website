---
title: "عقد Hello World الذكي للمبتدئين - Fullstack"
description: "درس تعليمي تمهيدي حول كتابة ونشر عقد ذكي بسيط على إيثريوم."
author: "nstrike2"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "العقود الذكيه ",
    "نشر",
    "مستكشف الكتل",
    "واجهة التطبيق",
    "المعاملات"
  ]
skill: beginner
lang: ar
published: 2021-10-25
---

هذا الدليل مخصص لك إذا كنت جديدًا في تطوير البلوكتشين ولا تعرف من أين تبدأ أو كيفية نشر العقود الذكية والتفاعل معها. سوف نستعرض إنشاء ونشر عقد ذكي بسيط على شبكة اختبار Goerli باستخدام [MetaMask](https://metamask.io)، و[Solidity](https://docs.soliditylang.org/en/v0.8.0/)، و[Hardhat](https://hardhat.org)، و[Alchemy](https://alchemy.com/eth).

ستحتاج إلى حساب Alchemy لإكمال هذا الدرس التعليمي. [سجّل للحصول على حساب مجاني](https://www.alchemy.com/).

إذا كانت لديك أسئلة في أي وقت، فلا تتردد في التواصل معنا في [Alchemy Discord](https://discord.gg/gWuC7zB)!

## الجزء 1 - إنشاء ونشر عقدك الذكي باستخدام Hardhat {#part-1}

### الاتصال بشبكة إيثريوم {#connect-to-the-ethereum-network}

هناك طرق عديدة لتقديم طلبات إلى سلسلة إيثريوم. للتبسيط، سنستخدم حسابًا مجانيًا على Alchemy، وهي منصة لمطوري البلوكتشين وواجهة برمجة تطبيقات (API) تسمح لنا بالتواصل مع سلسلة إيثريوم دون تشغيل عقدة بأنفسنا. تحتوي Alchemy أيضًا على أدوات للمطورين للمراقبة والتحليلات؛ وسنستفيد من هذه الأدوات في هذا الدرس التعليمي لفهم ما يحدث خلف الكواليس في نشر عقدنا الذكي.

### إنشاء تطبيقك ومفتاح API الخاص بك {#create-your-app-and-api-key}

بمجرد إنشاء حساب Alchemy، يمكنك إنشاء مفتاح API عن طريق إنشاء تطبيق. سيسمح لك هذا بتقديم طلبات إلى شبكة اختبار Goerli. إذا لم تكن على دراية بشبكات الاختبار، يمكنك [قراءة دليل Alchemy لاختيار شبكة](https://www.alchemy.com/docs/choosing-a-web3-network).

في لوحة تحكم Alchemy، ابحث عن القائمة المنسدلة **التطبيقات** في شريط التنقل وانقر على **إنشاء تطبيق**.

![إنشاء تطبيق Hello world](./hello-world-create-app.png)

أطلق على تطبيقك اسم '_Hello World_' واكتب وصفًا قصيرًا. حدد **مرحلي** كبيئتك و **Goerli** كشبكتك.

![عرض إنشاء تطبيق hello world](./create-app-view-hello-world.png)

_ملاحظة: تأكد من تحديد **Goerli**، وإلا فلن ينجح هذا الدرس التعليمي._

انقر على **إنشاء تطبيق**. سيظهر تطبيقك في الجدول أدناه.

### إنشاء حساب إيثريوم {#create-an-ethereum-account}

أنت بحاجة إلى حساب إيثريوم لإرسال واستقبال المعاملات. سنستخدم MetaMask، وهي محفظة افتراضية في المتصفح تتيح للمستخدمين إدارة عنوان حساب إيثريوم الخاص بهم.

يمكنك تنزيل وإنشاء حساب MetaMask مجانًا [هنا](https://metamask.io/download). عندما تقوم بإنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى "شبكة اختبار Goerli" في الجزء العلوي الأيمن (حتى لا نتعامل بأموال حقيقية).

### الخطوة 4: إضافة إيثر من صنبور (Faucet) {#step-4-add-ether-from-a-faucet}

لنشر عقدك الذكي على شبكة الاختبار، ستحتاج إلى بعض من عملات ETH المزيفة. للحصول على ETH على شبكة Goerli، انتقل إلى سبيل Goerli وأدخل عنوان حساب Goerli الخاص بك. لاحظ أن سُبُل Goerli قد تكون غير موثوقة بعض الشيء في الآونة الأخيرة - راجع [صفحة شبكات الاختبار](/developers/docs/networks/#goerli) للحصول على قائمة بالخيارات التي يمكنك تجربتها:

_ملاحظة: بسبب ازدحام الشبكة، قد يستغرق هذا بعض الوقت._
``

### الخطوة 5: التحقق من رصيدك {#step-5-check-your-balance}

للتأكد من وجود ETH في محفظتك، دعنا نُجرِ طلب [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) باستخدام [أداة الملحن من Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). This will return the amount of ETH in our wallet. لمعرفة المزيد، راجع [الدرس التعليمي القصير من Alchemy حول كيفية استخدام أداة الملحن](https://youtu.be/r6sjRxBZJuU).

أدخل عنوان حساب MetaMask الخاص بك وانقر على **إرسال طلب**. سترى استجابة تشبه مقتطف الشفرة أدناه.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _ملاحظة: هذه النتيجة بـ wei، وليس بـ ETH._ يُستخدم Wei كأصغر فئة من الإيثر._

Phew! Our fake money is all there.

### الخطوة 6: تهيئة مشروعنا {#step-6-initialize-our-project}

أولًا، سنحتاج إلى إنشاء مجلد لمشروعنا. انتقل إلى سطر الأوامر وأدخل ما يلي.

```
mkdir hello-world
cd hello-world
```

الآن بعد أن أصبحنا داخل مجلد مشروعنا، سنستخدم `npm init` لتهيئة المشروع.

> إذا لم يكن لديك npm مثبتًا بعد، فاتبع [هذه الإرشادات لتثبيت Node.js وnpm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

لغرض هذا الدرس التعليمي، لا يهم كيف تجيب على أسئلة التهيئة. إليك كيف فعلنا ذلك كمرجع:

```
اسم الحزمة: (hello-world)
الإصدار: (1.0.0)
الوصف: عقد Hello World الذكي
نقطة الدخول: (index.js)
أمر الاختبار:
مستودع git:
الكلمات المفتاحية:
المؤلف:
الرخصة: (ISC)

على وشك الكتابة إلى /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "عقد Hello World الذكي",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

وافق على package.json ونحن على استعداد للبدء!

### الخطوة 7: تنزيل Hardhat {#step-7-download-hardhat}

Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software. It helps developers when building smart contracts and dapps locally before deploying to the live chain.

داخل مشروعنا `hello-world`، قم بتشغيل:

```
npm install --save-dev hardhat
```

راجع هذه الصفحة لمزيد من التفاصيل حول [إرشادات التثبيت](https://hardhat.org/getting-started/#overview).

### الخطوة 8: إنشاء مشروع Hardhat {#step-8-create-hardhat-project}

داخل مجلد مشروع `hello-world`، قم بتشغيل:

```
npx hardhat
```

You should then see a welcome message and option to select what you want to do. Select “create an empty hardhat.config.js”:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 مرحبًا بك في Hardhat v2.0.11 👷‍

ماذا تريد أن تفعل؟ …
إنشاء مشروع نموذجي
❯ إنشاء ملف hardhat.config.js فارغ
خروج
```

سيؤدي هذا إلى إنشاء ملف `hardhat.config.js` في المشروع. سنستخدم هذا لاحقًا في الدرس التعليمي لتحديد إعداد مشروعنا.

### الخطوة 9: إضافة مجلدات المشروع {#step-9-add-project-folders}

للحفاظ على تنظيم المشروع، لنقم بإنشاء مجلدين جديدين. في سطر الأوامر، انتقل إلى الدليل الجذر لمشروع `hello-world` واكتب:

```
mkdir contracts
mkdir scripts
```

- `contracts/` هو المكان الذي سنحتفظ فيه بملف كود عقد Hello World الذكي الخاص بنا
- `scripts/` هو المكان الذي سنحتفظ فيه بالبرامج النصية لنشر عقدنا والتفاعل معه

### الخطوة 10: كتابة عقدنا {#step-10-write-our-contract}

قد تسأل نفسك، متى سنكتب الكود؟ حان الوقت!

افتح مشروع hello-world في محرر النصوص المفضل لديك. تُكتب العقود الذكية بشكل شائع بلغة Solidity، والتي سنستخدمها لكتابة عقدنا الذكي.‌

1. انتقل إلى مجلد `contracts` وأنشئ ملفًا جديدًا باسم `HelloWorld.sol`
2. أدناه هو عقد Hello World ذكي نموذجي سنستخدمه في هذا الدرس التعليمي. انسخ المحتويات أدناه إلى ملف `HelloWorld.sol`.

_ملاحظة: تأكد من قراءة التعليقات لفهم ما يفعله هذا العقد._

```
// يحدد إصدار Solidity، باستخدام الإصدار الدلالي.
// اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// يُعرّف عقدًا باسم 'HelloWorld'.
// العقد هو مجموعة من الوظائف والبيانات (حالته). بمجرد نشره، يقيم العقد في عنوان محدد على بلوكتشين إيثريوم. اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //يتم إصداره عند استدعاء دالة التحديث
   //تعد أحداث العقود الذكية وسيلة لعقدك لإبلاغ الواجهة الأمامية لتطبيقك بحدوث شيء ما على البلوكتشين، والتي يمكن أن "تستمع" لأحداث معينة وتتخذ إجراءات عند حدوثها.
   event UpdatedMessages(string oldStr, string newStr);

   // يصرح عن متغير حالة 'message' من النوع 'string'.
   // متغيرات الحالة هي متغيرات تُخزن قيمها بشكل دائم في تخزين العقد. الكلمة المفتاحية 'public' تجعل المتغيرات قابلة للوصول من خارج العقد وتنشئ دالة يمكن للعقود أو العملاء الآخرين استدعاؤها للوصول إلى القيمة.
   string public message;

   // على غرار العديد من اللغات الكائنية التوجه القائمة على الأصناف، المُنشئ هو دالة خاصة تُنفذ فقط عند إنشاء العقد.
   // تُستخدم المُنشئات لتهيئة بيانات العقد. اعرف المزيد:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // يقبل وسيط سلسلة 'initMessage' ويضبط القيمة في متغير التخزين 'message' الخاص بالعقد).
      message = initMessage;
   }

   // دالة عامة تقبل وسيط سلسلة وتُحدّث متغير التخزين 'message'.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

هذا عقد ذكي أساسي يخزن رسالة عند الإنشاء. يمكن تحديثه عن طريق استدعاء دالة `update`.

### الخطوة 11: ربط MetaMask وAlchemy بمشروعك {#step-11-connect-metamask-alchemy-to-your-project}

لقد أنشأنا محفظة MetaMask وحساب Alchemy وكتبنا عقدنا الذكي، والآن حان وقت ربط الثلاثة.

كل معاملة تُرسل من محفظتك تتطلب توقيعًا باستخدام مفتاحك الخاص الفريد. لتزويد برنامجنا بهذا الإذن، يمكننا تخزين مفتاحنا الخاص بأمان في ملف بيئة. سنقوم أيضًا بتخزين مفتاح API لـ Alchemy هنا.

> لمعرفة المزيد حول إرسال المعاملات، راجع [هذا الدرس التعليمي](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) حول إرسال المعاملات باستخدام web3.

First, install the dotenv package in your project directory:

```
npm install dotenv --save
```

بعد ذلك، قم بإنشاء ملف `.env` في الدليل الجذر للمشروع. أضف مفتاح MetaMask الخاص بك وعنوان URL لـ HTTP Alchemy API إليه.

يجب تسمية ملف البيئة الخاص بك `.env` وإلا فلن يتم التعرف عليه كملف بيئة.

لا تسميه `process.env` أو `.env-custom` أو أي شيء آخر.

- اتبع [هذه الإرشادات](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) لتصدير مفتاحك الخاص
- انظر أدناه للحصول على عنوان URL لـ HTTP Alchemy API

![](./get-alchemy-api-key.gif)

يجب أن يبدو ملف `.env` الخاص بك هكذا:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

لربط هذه الأشياء بالكود الخاص بنا، سنشير إلى هذه المتغيرات في ملف `hardhat.config.js` الخاص بنا في الخطوة 13.

### الخطوة 12: تثبيت Ethers.js {#step-12-install-ethersjs}

Ethers.js هي مكتبة تسهل التفاعل وإجراء الطلبات إلى إيثريوم عن طريق تغليف [طرق JSON-RPC القياسية](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) بأساليب أكثر سهولة للمستخدم.

يسمح لنا Hardhat بدمج [المكونات الإضافية](https://hardhat.org/plugins/) للحصول على أدوات إضافية ووظائف موسعة. سنستفيد من [مكون Ethers الإضافي](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) لنشر العقد.

In your project directory type:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### الخطوة 13: تحديث hardhat.config.js {#step-13-update-hardhat-configjs}

لقد أضفنا العديد من التبعيات والإضافات حتى الآن، والآن نحن بحاجة إلى تحديث `hardhat.config.js` حتى يتعرف مشروعنا عليها جميعًا.

قم بتحديث `hardhat.config.js` الخاص بك ليبدو هكذا:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### الخطوة 14: تجميع عقدنا {#step-14-compile-our-contract}

To make sure everything is working so far, let’s compile our contract. مهمة `compile` هي إحدى مهام hardhat المضمنة.

From the command line run:

```bash
npx hardhat compile
```

قد تحصل على تحذير حول `SPDX license identifier not provided in source file`، ولكن لا داعي للقلق بشأن ذلك — نأمل أن يبدو كل شيء آخر جيدًا! إذا لم يكن الأمر كذلك، يمكنك دائمًا إرسال رسالة في [Alchemy discord](https://discord.gg/u72VCg3).

### الخطوة 15: كتابة سكريبت النشر الخاص بنا {#step-15-write-our-deploy-script}

Now that our contract is written and our configuration file is good to go, it’s time to write our contract deploy script.

انتقل إلى مجلد `scripts/` وأنشئ ملفًا جديدًا باسم `deploy.js`، مع إضافة المحتويات التالية إليه:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // ابدأ النشر، مع إرجاع وعد يتم حله إلى كائن عقد
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("تم نشر العقد على العنوان:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

يقوم Hardhat بعمل رائع في شرح ما يفعله كل من هذه الأسطر من الكود في [درس العقود التعليمي](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)، وقد اعتمدنا شروحاتهم هنا.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` في ethers.js هو تجريد يستخدم لنشر عقود ذكية جديدة، لذا فإن `HelloWorld` هنا هو [مصنع](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) لمثيلات عقد hello world الخاص بنا. عند استخدام مكون `hardhat-ethers` الإضافي، يتم توصيل مثيلات `ContractFactory` و`Contract` بالموقع الأول (المالك) افتراضيًا.

```javascript
const hello_world = await HelloWorld.deploy()
```

سيؤدي استدعاء `deploy()` على `ContractFactory` إلى بدء النشر، وإرجاع `Promise` يتم حله إلى كائن `Contract`. This is the object that has a method for each of our smart contract functions.

### الخطوة 16: نشر عقدنا {#step-16-deploy-our-contract}

We’re finally ready to deploy our smart contract! انتقل إلى سطر الأوامر وقم بتشغيل:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

You should then see something like:

```bash
تم نشر العقد على العنوان: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**يرجى حفظ هذا العنوان**. سوف نستخدمه لاحقًا في الدرس التعليمي.

إذا انتقلنا إلى [Goerli etherscan](https://goerli.etherscan.io) وبحثنا عن عنوان عقدنا، فسنتمكن من رؤية أنه تم نشره بنجاح. The transaction will look something like this:

![](./etherscan-contract.png)

يجب أن يتطابق عنوان `From` مع عنوان حساب MetaMask الخاص بك، وسيظهر في عنوان `To` عبارة **إنشاء عقد**. إذا نقرنا على المعاملة، فسنرى عنوان عقدنا في حقل `To`.

![](./etherscan-transaction.png)

تهانينا! لقد نشرت للتو عقدًا ذكيًا على شبكة اختبار إيثريوم.

لفهم ما يجري خلف الكواليس، دعنا ننتقل إلى علامة تبويب المستكشف في [لوحة تحكم Alchemy](https://dashboard.alchemy.com/explorer). إذا كان لديك العديد من تطبيقات Alchemy، فتأكد من التصفية حسب التطبيق وتحديد **Hello World**.

![](./hello-world-explorer.png)

هنا سترى عددًا من طرق JSON-RPC التي أنشأتها Hardhat/Ethers لنا خلف الكواليس عندما استدعينا دالة `.deploy()`. هناك طريقتان مهمتان هنا هما [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction)، وهو طلب لكتابة عقدنا على سلسلة Goerli، و[`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash)، وهو طلب لقراءة معلومات حول معاملتنا بالنظر إلى التجزئة (الهاش). لمعرفة المزيد حول إرسال المعاملات، راجع [الدرس التعليمي الخاص بنا حول إرسال المعاملات باستخدام Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## الجزء 2: التفاعل مع عقدك الذكي {#part-2-interact-with-your-smart-contract}

الآن بعد أن نجحنا في نشر عقد ذكي على شبكة Goerli، دعنا نتعلم كيفية التفاعل معه.

### إنشاء ملف interact.js {#create-a-interactjs-file}

هذا هو الملف الذي سنكتب فيه سكريبت التفاعل الخاص بنا. سنستخدم مكتبة Ethers.js التي قمت بتثبيتها مسبقًا في الجزء 1.

داخل مجلد `scripts/`، قم بإنشاء ملف جديد باسم `interact.js` وأضف الكود التالي:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### تحديث ملف .env الخاص بك {#update-your-env-file}

سنستخدم متغيرات بيئة جديدة، لذلك نحتاج إلى تعريفها في ملف `.env` الذي [أنشأناه سابقًا](#step-11-connect-metamask-&-alchemy-to-your-project).

سنحتاج إلى إضافة تعريف لـ `API_KEY` الخاص بـ Alchemy و`CONTRACT_ADDRESS` حيث تم نشر عقدك الذكي.

يجب أن يبدو ملف `.env` الخاص بك كالتالي:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### احصل على واجهة التطبيق الثنائية (ABI) الخاصة بعقدك {#grab-your-contract-ABI}

واجهة التطبيق الثنائية ([ABI](/glossary/#abi)) الخاصة بعقدنا هي الواجهة للتفاعل مع عقدنا الذكي. يقوم Hardhat تلقائيًا بإنشاء واجهة التطبيق الثنائية (ABI) وحفظها في `HelloWorld.json`. لاستخدام واجهة التطبيق الثنائية (ABI)، سنحتاج إلى تحليل المحتويات عن طريق إضافة الأسطر التالية من الكود إلى ملف `interact.js` الخاص بنا:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

إذا كنت تريد رؤية واجهة ABI، فيمكنك طباعتها على وحدة التحكم الخاصة بك:

```javascript
console.log(JSON.stringify(contract.abi))
```

لرؤية واجهة التطبيق الثنائية (ABI) مطبوعة على وحدة التحكم، انتقل إلى الطرفية وقم بتشغيل:

```bash
npx hardhat run scripts/interact.js
```

### إنشاء مثيل من عقدك {#create-an-instance-of-your-contract}

للتفاعل مع عقدنا، نحتاج إلى إنشاء مثيل للعقد في الكود الخاص بنا. للقيام بذلك باستخدام Ethers.js، سنحتاج إلى العمل مع ثلاثة مفاهيم:

1. Provider - مزود عقدة يمنحك حق الوصول للقراءة والكتابة إلى البلوكتشين
2. Signer - يمثل حساب إيثريوم يمكنه توقيع المعاملات
3. Contract - كائن Ethers.js يمثل عقدًا محددًا منشورًا على السلسلة

سنستخدم واجهة التطبيق الثنائية (ABI) الخاصة بالعقد من الخطوة السابقة لإنشاء مثيل العقد الخاص بنا:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

اعرف المزيد عن Providers وSigners وContracts في [توثيق ethers.js](https://docs.ethers.io/v5/).

### قراءة الرسالة الأولية {#read-the-init-message}

هل تتذكر عندما نشرنا عقدنا مع `initMessage = "Hello world!"`؟ سنقوم الآن بقراءة تلك الرسالة المخزنة في عقدنا الذكي وطباعتها على وحدة التحكم.

في JavaScript، تُستخدم الدوال غير المتزامنة عند التفاعل مع الشبكات. لمعرفة المزيد عن الدوال غير المتزامنة، [اقرأ هذا المقال على Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

استخدم الكود أدناه لاستدعاء دالة `message` في عقدنا الذكي وقراءة الرسالة الأولية:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

بعد تشغيل الملف باستخدام `npx hardhat run scripts/interact.js` في الطرفية، يجب أن نرى هذه الاستجابة:

```
الرسالة هي: Hello world!
```

تهانينا! لقد قرأت بنجاح بيانات العقد الذكي من بلوكتشين إيثريوم، أحسنت!

### تحديث الرسالة {#update-the-message}

بدلاً من مجرد قراءة الرسالة، يمكننا أيضًا تحديث الرسالة المحفوظة في عقدنا الذكي باستخدام دالة `update`! رائع، أليس كذلك؟

لتحديث الرسالة، يمكننا استدعاء دالة `update` مباشرة على كائن العقد المنشأ:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("الرسالة هي: " + message)

  console.log("جارٍ تحديث الرسالة...")
  const tx = await helloWorldContract.update("هذه هي الرسالة الجديدة.")
  await tx.wait()
}
main()
```

لاحظ أننا في السطر 11، نقوم باستدعاء `.wait()` على كائن المعاملة المرجع. يضمن هذا أن السكريبت الخاص بنا ينتظر حتى يتم تعدين المعاملة على البلوكتشين قبل الخروج من الدالة. إذا لم يتم تضمين استدعاء `.wait()`، فقد لا يرى السكريبت قيمة `message` المحدثة في العقد.

### قراءة الرسالة الجديدة {#read-the-new-message}

يجب أن تكون قادرًا على تكرار [الخطوة السابقة](#read-the-init-message) لقراءة قيمة `message` المحدثة. خذ لحظة وانظر ما إذا كان بإمكانك إجراء التغييرات اللازمة لطباعة تلك القيمة الجديدة!

إذا كنت بحاجة إلى تلميح، فإليك كيف يجب أن يبدو ملف `interact.js` الخاص بك في هذه المرحلة:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// contract instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("الرسالة هي: " + message)

  console.log("جارٍ تحديث الرسالة...")
  const tx = await helloWorldContract.update("هذه هي الرسالة الجديدة")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("الرسالة الجديدة هي: " + newMessage)
}

main()
```

الآن فقط قم بتشغيل السكريبت وستتمكن من رؤية الرسالة القديمة، وحالة التحديث، والرسالة الجديدة مطبوعة في الطرفية الخاصة بك!

`npx hardhat run scripts/interact.js --network goerli`

```
الرسالة هي: Hello World!
جارٍ تحديث الرسالة...
الرسالة الجديدة هي: هذه هي الرسالة الجديدة.
```

أثناء تشغيل هذا السكريبت، قد تلاحظ أن خطوة `جارٍ تحديث الرسالة...` تستغرق بعض الوقت للتحميل قبل تحميل الرسالة الجديدة. هذا بسبب عملية التعدين؛ إذا كنت مهتمًا بتتبع المعاملات أثناء تعدينها، فقم بزيارة [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) لرؤية حالة المعاملة. إذا تم إسقاط المعاملة، فمن المفيد أيضًا التحقق من [Goerli Etherscan](https://goerli.etherscan.io) والبحث عن تجزئة (هاش) معاملتك.

## الجزء 3: نشر عقدك الذكي على Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

لقد قمت بكل العمل الشاق لإحياء عقدك الذكي؛ الآن حان الوقت لمشاركته مع العالم!

من خلال التحقق من عقدك الذكي على Etherscan، يمكن لأي شخص عرض الكود المصدري الخاص بك والتفاعل مع عقدك الذكي. هيا بنا نبدأ!

### الخطوة 1: إنشاء مفتاح API على حساب Etherscan الخاص بك {#step-1-generate-an-api-key-on-your-etherscan-account}

مفتاح API الخاص بـ Etherscan ضروري للتحقق من أنك تملك العقد الذكي الذي تحاول نشره.

إذا لم يكن لديك حساب Etherscan بالفعل، [سجل للحصول على حساب](https://etherscan.io/register).

بمجرد تسجيل الدخول، ابحث عن اسم المستخدم الخاص بك في شريط التنقل، مرر فوقه وحدد زر **ملفي الشخصي**.

في صفحة ملفك الشخصي، يجب أن ترى شريط تنقل جانبي. من شريط التنقل الجانبي، حدد **مفاتيح API**. بعد ذلك، اضغط على زر "إضافة" لإنشاء مفتاح API جديد، وسمّي تطبيقك **hello-world** واضغط على زر **إنشاء مفتاح API جديد**.

يجب أن يظهر مفتاح API الجديد الخاص بك في جدول مفاتيح API. انسخ مفتاح API إلى الحافظة.

بعد ذلك، نحتاج إلى إضافة مفتاح API الخاص بـ Etherscan إلى ملف `.env` الخاص بنا.

بعد إضافته، يجب أن يبدو ملف `.env` الخاص بك كالتالي:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### العقود الذكية المنشورة بواسطة Hardhat {#hardhat-deployed-smart-contracts}

#### تثبيت hardhat-etherscan {#install-hardhat-etherscan}

نشر عقدك على Etherscan باستخدام Hardhat أمر بسيط. ستحتاج أولاً إلى تثبيت المكون الإضافي `hardhat-etherscan` للبدء. سيقوم `hardhat-etherscan` تلقائيًا بالتحقق من الكود المصدري للعقد الذكي وواجهة التطبيق الثنائية (ABI) على Etherscan. لإضافة هذا، في دليل `hello-world` قم بتشغيل:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

بمجرد التثبيت، قم بتضمين العبارة التالية في الجزء العلوي من `hardhat.config.js` الخاص بك، وأضف خيارات تكوين Etherscan:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // مفتاح API الخاص بك لـ Etherscan
    // احصل على واحد من https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### التحقق من عقدك الذكي على Etherscan {#verify-your-smart-contract-on-etherscan}

تأكد من حفظ جميع الملفات وتكوين جميع متغيرات `.env` بشكل صحيح.

قم بتشغيل مهمة `verify`، مع تمرير عنوان العقد، والشبكة التي تم نشره عليها:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

تأكد من أن `DEPLOYED_CONTRACT_ADDRESS` هو عنوان عقدك الذكي المنشور على شبكة اختبار Goerli. أيضًا، يجب أن يكون الوسيط الأخير (`'Hello World!'`) هو نفس قيمة السلسلة المستخدمة [أثناء خطوة النشر في الجزء 1](#write-our-deploy-script).

إذا سارت الأمور على ما يرام، سترى الرسالة التالية في الطرفية:

```text
تم إرسال الكود المصدري للعقد بنجاح
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
للتحقق على Etherscan. في انتظار نتيجة التحقق...


تم التحقق من العقد HelloWorld بنجاح على Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

تهانينا! الكود المصدري لعقدك الذكي موجود على Etherscan!

### تحقق من عقدك الذكي على Etherscan! {#check-out-your-smart-contract-on-etherscan}

عندما تنتقل إلى الرابط الموجود في الطرفية، يجب أن تكون قادرًا على رؤية الكود المصدري لعقدك الذكي وواجهة التطبيق الثنائية (ABI) منشورة على Etherscan!

**يا للروعة - لقد فعلتها يا بطل! الآن يمكن لأي شخص استدعاء عقدك الذكي أو الكتابة إليه! لا يسعنا الانتظار لرؤية ما ستبنيه بعد ذلك!**

## الجزء 4 - دمج عقدك الذكي مع الواجهة الأمامية {#part-4-integrating-your-smart-contract-with-the-frontend}

بحلول نهاية هذا الدرس التعليمي، ستعرف كيفية:

- توصيل محفظة MetaMask بتطبيقك اللامركزي
- قراءة البيانات من عقدك الذكي باستخدام واجهة برمجة تطبيقات [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- توقيع معاملات إيثريوم باستخدام MetaMask

بالنسبة لهذا التطبيق اللامركزي، سنستخدم [React](https://react.dev/) كإطار عمل للواجهة الأمامية؛ ومع ذلك، من المهم ملاحظة أننا لن نقضي الكثير من الوقت في تحليل أساسياته، حيث سنركز في الغالب على جلب وظائف Web3 إلى مشروعنا.

كمتطلب أساسي، يجب أن يكون لديك فهم على مستوى المبتدئين لـ React. إذا لم يكن الأمر كذلك، نوصي بإكمال [الدرس التعليمي الرسمي للمقدمة إلى React](https://react.dev/learn).

### استنساخ ملفات البداية {#clone-the-starter-files}

أولاً، انتقل إلى [مستودع GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) للحصول على الملفات المبدئية لهذا المشروع وانسخ هذا المستودع إلى جهازك المحلي.

افتح المستودع المنسوخ محليًا. لاحظ أنه يحتوي على مجلدين: `starter-files` و `completed`.

- `starter-files`- **سنعمل في هذا الدليل**، وسنقوم بتوصيل واجهة المستخدم بمحفظة إيثريوم الخاصة بك وبالعقد الذكي الذي نشرناه على Etherscan في [الجزء 3](#part-3).
- يحتوي `completed` على الدرس التعليمي الكامل ويجب استخدامه فقط كمرجع إذا واجهتك مشكلة.

بعد ذلك، افتح نسختك من `starter-files` في محرر الكود المفضل لديك، ثم انتقل إلى مجلد `src`.

ستكون جميع الأكواد التي سنكتبها ضمن مجلد `src`. سنقوم بتحرير مكون `HelloWorld.js` وملفات جافا سكريبت `util/interact.js` لإعطاء مشروعنا وظائف Web3.

### تحقق من الملفات المبدئية {#check-out-the-starter-files}

قبل أن نبدأ في البرمجة، دعنا نستكشف ما هو متاح لنا في الملفات المبدئية.

#### تشغيل مشروع React الخاص بك {#get-your-react-project-running}

Let's start by running the React project in our browser. The beauty of React is that once we have our project running in our browser, any changes we save will be updated live in our browser.

لتشغيل المشروع، انتقل إلى الدليل الجذر لمجلد `starter-files`، ثم قم بتشغيل `npm install` في الطرفية لتثبيت تبعيات المشروع:

```bash
cd starter-files
npm install
```

بمجرد الانتهاء من تثبيتها، قم بتشغيل `npm start` في الطرفية الخاصة بك:

```bash
npm start
```

يجب أن يؤدي ذلك إلى فتح [http://localhost:3000/](http://localhost:3000/) في متصفحك، حيث سترى الواجهة الأمامية لمشروعنا. يجب أن يتكون من حقل واحد (مكان لتحديث الرسالة المخزنة في عقدك الذكي)، وزر "توصيل المحفظة"، وزر "تحديث".

إذا حاولت النقر على أي من الزرين، ستلاحظ أنهما لا يعملان - وهذا لأننا ما زلنا بحاجة إلى برمجة وظائفهما.

#### مكون `HelloWorld.js` {#the-helloworld-js-component}

دعنا نعد إلى مجلد `src` في محررنا ونفتح ملف `HelloWorld.js`. It's super important that we understand everything in this file, as it is the primary React component we will be working on.

في الجزء العلوي من هذا الملف، ستلاحظ أن لدينا العديد من عبارات الاستيراد الضرورية لتشغيل مشروعنا، بما في ذلك مكتبة React، وخطافات useEffect وuseState، وبعض العناصر من `./util/interact.js` (سنصفها بمزيد من التفصيل قريبًا!)، وشعار Alchemy.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

بعد ذلك، لدينا متغيرات الحالة التي سنقوم بتحديثها بعد أحداث معينة.

```javascript
// HelloWorld.js

//متغيرات الحالة
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("لا يوجد اتصال بالشبكة.")
const [newMessage, setNewMessage] = useState("")
```

إليك ما يمثله كل متغير من المتغيرات:

- `walletAddress` - سلسلة نصية تخزن عنوان محفظة المستخدم
- `status`- سلسلة تخزن رسالة مفيدة توجه المستخدم حول كيفية التفاعل مع التطبيق اللامركزي
- `message` - سلسلة تخزن الرسالة الحالية في العقد الذكي
- `newMessage` - سلسلة تخزن الرسالة الجديدة التي سيتم كتابتها في العقد الذكي

بعد متغيرات الحالة، سترى خمس دوال غير منفذة: `useEffect`، `addSmartContractListener`، `addWalletListener`، `connectWalletPressed`، و`onUpdatePressed`. سنشرح ما تفعله أدناه:

```javascript
// HelloWorld.js

//يتم استدعاؤها مرة واحدة فقط
useEffect(async () => {
  //TODO: implement
}, [])

function addSmartContractListener() {
  //TODO: implement
}

function addWalletListener() {
  //TODO: implement
}

const connectWalletPressed = async () => {
  //TODO: implement
}

const onUpdatePressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- هو خطاف React يتم استدعاؤه بعد عرض مكونك. نظرًا لأنه يحتوي على خاصية مصفوفة فارغة `[]` تم تمريرها إليه (انظر السطر 4)، فسيتم استدعاؤه فقط عند العرض _الأول_ للمكون. هنا سنقوم بتحميل الرسالة الحالية المخزنة في عقدنا الذكي، واستدعاء مستمعي العقد الذكي والمحفظة، وتحديث واجهة المستخدم لتعكس ما إذا كانت المحفظة متصلة بالفعل.
- `addSmartContractListener`- تقوم هذه الدالة بإعداد مستمع سيراقب حدث `UpdatedMessages` الخاص بعقد HelloWorld ويقوم بتحديث واجهة المستخدم عند تغيير الرسالة في عقدنا الذكي.
- `addWalletListener`- تقوم هذه الدالة بإعداد مستمع يكتشف التغييرات في حالة محفظة MetaMask للمستخدم، مثل عندما يقوم المستخدم بقطع اتصال محفظته أو تبديل العناوين.
- `connectWalletPressed`- سيتم استدعاء هذه الدالة لتوصيل محفظة MetaMask للمستخدم بتطبيقنا اللامركزي.
- `onUpdatePressed` - سيتم استدعاء هذه الدالة عندما يرغب المستخدم في تحديث الرسالة المخزنة في العقد الذكي.

Near the end of this file, we have the UI of our component.

```javascript
// HelloWorld.js

//واجهة المستخدم الخاصة بمكوننا
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "متصل: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>توصيل المحفظة</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>الرسالة الحالية:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>رسالة جديدة:</h2>

    <div>
      <input
        type="text"
        placeholder="قم بتحديث الرسالة في عقدك الذكي."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        تحديث
      </button>
</div>
 
</div>
)
```

إذا قمت بفحص هذا الكود بعناية، ستلاحظ أين نستخدم متغيرات الحالة المختلفة في واجهة المستخدم لدينا:

- في الأسطر 6-12، إذا كانت محفظة المستخدم متصلة (أي `walletAddress.length > 0`)، فإننا نعرض نسخة مختصرة من `walletAddress` للمستخدم في الزر الذي يحمل المعرف "walletButton"؛ وإلا فإنه يقول ببساطة "توصيل المحفظة".
- في السطر 17، نعرض الرسالة الحالية المخزنة في العقد الذكي، والتي يتم التقاطها في سلسلة `message`.
- في الأسطر 23-26، نستخدم [مكونًا متحكمًا فيه](https://legacy.reactjs.org/docs/forms.html#controlled-components) لتحديث متغير الحالة `newMessage` عند تغير الإدخال في حقل النص.

بالإضافة إلى متغيرات الحالة لدينا، سترى أيضًا أن دوال `connectWalletPressed` و`onUpdatePressed` يتم استدعاؤها عند النقر على الأزرار التي تحمل المعرفات `publishButton` و`walletButton` على التوالي.

أخيرًا، دعنا نتناول أين يتم إضافة مكون `HelloWorld.js` هذا.

إذا انتقلت إلى ملف `App.js`، وهو المكون الرئيسي في React الذي يعمل كحاوية لجميع المكونات الأخرى، فسترى أن مكون `HelloWorld.js` الخاص بنا يتم إدخاله في السطر 7.

أخيرًا وليس آخرًا، دعنا نتحقق من ملف آخر تم توفيره لك، وهو ملف `interact.js`.

#### ملف `interact.js` {#the-interact-js-file}

نظرًا لأننا نريد الالتزام بنموذج [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)، سنحتاج إلى ملف منفصل يحتوي على جميع وظائفنا لإدارة المنطق والبيانات وقواعد تطبيقنا اللامركزي، ثم نكون قادرين على تصدير هذه الوظائف إلى واجهتنا الأمامية (مكون `HelloWorld.js` الخاص بنا).

👆🏽هذا هو الغرض الدقيق من ملف `interact.js` الخاص بنا!

انتقل إلى مجلد `util` في دليل `src` الخاص بك، وستلاحظ أننا قمنا بتضمين ملف يسمى `interact.js` سيحتوي على جميع وظائف ومتغيرات التفاعل مع العقد الذكي والمحفظة.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

ستلاحظ في الجزء العلوي من الملف أننا قمنا بالتعليق على كائن `helloWorldContract`. لاحقًا في هذا الدرس التعليمي، سنقوم بإلغاء التعليق على هذا الكائن وإنشاء مثيل لعقدنا الذكي في هذا المتغير، والذي سنقوم بعد ذلك بتصديره إلى مكون `HelloWorld.js` الخاص بنا.

الدوال الأربع غير المنفذة بعد كائن `helloWorldContract` تقوم بما يلي:

- `loadCurrentMessage` - تعالج هذه الدالة منطق تحميل الرسالة الحالية المخزنة في العقد الذكي. ستقوم بإجراء استدعاء _قراءة_ إلى عقد Hello World الذكي باستخدام واجهة برمجة تطبيقات [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - ستقوم هذه الدالة بتوصيل MetaMask الخاص بالمستخدم بتطبيقنا اللامركزي.
- `getCurrentWalletConnected` - ستتحقق هذه الدالة مما إذا كان حساب إيثريوم متصلاً بالفعل بتطبيقنا اللامركزي عند تحميل الصفحة وتقوم بتحديث واجهة المستخدم لدينا وفقًا لذلك.
- `updateMessage` - ستقوم هذه الدالة بتحديث الرسالة المخزنة في العقد الذكي. ستقوم بإجراء استدعاء _كتابة_ إلى عقد Hello World الذكي، لذلك سيتعين على محفظة MetaMask الخاصة بالمستخدم توقيع معاملة إيثريوم لتحديث الرسالة.

الآن بعد أن فهمنا ما نعمل به، دعنا نكتشف كيفية القراءة من عقدنا الذكي!

### الخطوة 3: القراءة من عقدك الذكي {#step-3-read-from-your-smart-contract}

للقراءة من عقدك الذكي، ستحتاج إلى الإعداد بنجاح:

- اتصال API بسلسلة إيثريوم
- مثيل محمل من عقدك الذكي
- دالة لاستدعاء دالة عقدك الذكي
- مستمع لمراقبة التحديثات عندما تتغير البيانات التي تقرأها من العقد الذكي

قد يبدو هذا كثيرًا من الخطوات، لكن لا تقلق! سوف نرشدك خلال كيفية القيام بكل منها خطوة بخطوة! :\)

#### إنشاء اتصال API بسلسلة إيثريوم {#establish-an-api-connection-to-the-ethereum-chain}

هل تتذكر كيف استخدمنا في الجزء 2 من هذا الدرس التعليمي مفتاح [Alchemy Web3 الخاص بنا للقراءة من عقدنا الذكي](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)؟ ستحتاج أيضًا إلى مفتاح Alchemy Web3 في تطبيقك اللامركزي للقراءة من السلسلة.

إذا لم يكن لديك بالفعل، فقم أولاً بتثبيت [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) عن طريق الانتقال إلى الدليل الجذر لـ `starter-files` وتشغيل ما يلي في الطرفية:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) هو غلاف حول [Web3.js](https://docs.web3js.org/)، يوفر طرق API محسنة ومزايا أخرى حاسمة لجعل حياتك كمطور web3 أسهل. It is designed to require minimal configuration so you can start using it in your app right away!

بعد ذلك، قم بتثبيت حزمة [dotenv](https://www.npmjs.com/package/dotenv) في دليل مشروعك، حتى يكون لدينا مكان آمن لتخزين مفتاح API الخاص بنا بعد جلبه.

```text
npm install dotenv --save
```

بالنسبة لتطبيقنا اللامركزي، **سنستخدم مفتاح API الخاص بـ Websockets** بدلاً من مفتاح API الخاص بـ HTTP، حيث سيسمح لنا بإعداد مستمع يكتشف متى تتغير الرسالة المخزنة في العقد الذكي.

بمجرد حصولك على مفتاح API الخاص بك، قم بإنشاء ملف `.env` في الدليل الجذر الخاص بك وأضف عنوان URL الخاص بـ Alchemy Websockets إليه. بعد ذلك، يجب أن يبدو ملف `.env` الخاص بك كما يلي:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

الآن، نحن جاهزون لإعداد نقطة نهاية Alchemy Web3 في تطبيقنا اللامركزي! دعنا نعد إلى `interact.js` الخاص بنا، الموجود داخل مجلد `util` الخاص بنا ونضيف الكود التالي في الجزء العلوي من الملف:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

أعلاه، قمنا أولاً باستيراد مفتاح Alchemy من ملف `.env` الخاص بنا ثم قمنا بتمرير `alchemyKey` الخاص بنا إلى `createAlchemyWeb3` لإنشاء نقطة نهاية Alchemy Web3 الخاصة بنا.

مع جاهزية نقطة النهاية هذه، حان الوقت لتحميل عقدنا الذكي!

#### تحميل عقد Hello World الذكي الخاص بك {#loading-your-hello-world-smart-contract}

لتحميل عقد Hello World الذكي الخاص بك، ستحتاج إلى عنوان العقد الخاص به وواجهة التطبيق الثنائية (ABI)، وكلاهما يمكن العثور عليهما على Etherscan إذا أكملت [الجزء 3 من هذا الدرس التعليمي.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### كيفية الحصول على واجهة التطبيق الثنائية (ABI) الخاصة بعقدك من Etherscan {#how-to-get-your-contract-abi-from-etherscan}

إذا تخطيت الجزء 3 من هذا الدرس التعليمي، يمكنك استخدام عقد HelloWorld بالعنوان [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). يمكن العثور على واجهة التطبيق الثنائية (ABI) الخاصة به [هنا](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

واجهة التطبيق الثنائية (ABI) للعقد ضرورية لتحديد الدالة التي سيستدعيها العقد وكذلك لضمان أن الدالة ستعيد البيانات بالتنسيق الذي تتوقعه. بمجرد نسخ واجهة التطبيق الثنائية (ABI) الخاصة بعقدنا، دعنا نحفظها كملف JSON يسمى `contract-abi.json` في دليل `src` الخاص بك.

يجب تخزين contract-abi.json في مجلد src الخاص بك.

مسلحين بعنوان عقدنا، وواجهة التطبيق الثنائية (ABI)، ونقطة نهاية Alchemy Web3، يمكننا استخدام [طريقة العقد](https://docs.web3js.org/api/web3-eth-contract/class/Contract) لتحميل مثيل من عقدنا الذكي. استورد واجهة التطبيق الثنائية (ABI) الخاصة بعقدك إلى ملف `interact.js` وأضف عنوان عقدك.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

يمكننا الآن أخيرًا إلغاء التعليق على متغير `helloWorldContract` الخاص بنا، وتحميل العقد الذكي باستخدام نقطة نهاية AlchemyWeb3 الخاصة بنا:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

لتلخيص ذلك، يجب أن تبدو الأسطر الـ 12 الأولى من `interact.js` الخاص بك الآن كما يلي:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

الآن بعد أن قمنا بتحميل عقدنا، يمكننا تنفيذ دالة `loadCurrentMessage` الخاصة بنا!

#### تنفيذ `loadCurrentMessage` في ملف `interact.js` الخاص بك {#implementing-loadCurrentMessage-in-your-interact-js-file}

هذه الدالة بسيطة جدًا. سنقوم بإجراء استدعاء web3 غير متزامن بسيط للقراءة من عقدنا. ستعيد دالتنا الرسالة المخزنة في العقد الذكي:

قم بتحديث `loadCurrentMessage` في ملف `interact.js` الخاص بك إلى ما يلي:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

نظرًا لأننا نريد عرض هذا العقد الذكي في واجهة المستخدم لدينا، فلنقم بتحديث دالة `useEffect` في مكون `HelloWorld.js` الخاص بنا إلى ما يلي:

```javascript
// HelloWorld.js

//يتم استدعاؤها مرة واحدة فقط
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

لاحظ أننا نريد فقط استدعاء `loadCurrentMessage` مرة واحدة أثناء العرض الأول للمكون. سنقوم قريبًا بتنفيذ `addSmartContractListener` لتحديث واجهة المستخدم تلقائيًا بعد تغيير الرسالة في العقد الذكي.

قبل أن نتعمق في المستمع الخاص بنا، دعنا نتحقق مما لدينا حتى الآن! احفظ ملفي `HelloWorld.js` و`interact.js`، ثم انتقل إلى [http://localhost:3000/](http://localhost:3000/)

ستلاحظ أن الرسالة الحالية لم تعد تقول "لا يوجد اتصال بالشبكة." بدلاً من ذلك، تعكس الرسالة المخزنة في العقد الذكي. رائع!

#### يجب أن تعكس واجهة المستخدم الخاصة بك الآن الرسالة المخزنة في العقد الذكي {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

والآن بالحديث عن هذا المستمع...

#### تنفيذ `addSmartContractListener` {#implement-addsmartcontractlistener}

إذا عدت بذاكرتك إلى ملف `HelloWorld.sol` الذي كتبناه في [الجزء 1 من هذه السلسلة التعليمية](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract)، ستتذكر أن هناك حدث عقد ذكي يسمى `UpdatedMessages` يتم إصداره بعد استدعاء دالة `update` في عقدنا الذكي (انظر الأسطر 9 و27):

```javascript
// HelloWorld.sol

// يحدد إصدار Solidity، باستخدام الإصدار الدلالي.
// اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// يُعرّف عقدًا باسم 'HelloWorld'.
// العقد هو مجموعة من الوظائف والبيانات (حالته). بمجرد نشره، يقيم العقد في عنوان محدد على بلوكتشين إيثريوم. اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //يتم إصداره عند استدعاء دالة التحديث
   //تعد أحداث العقود الذكية وسيلة لعقدك لإبلاغ الواجهة الأمامية لتطبيقك بحدوث شيء ما على البلوكتشين، والتي يمكن أن "تستمع" لأحداث معينة وتتخذ إجراءات عند حدوثها.
   event UpdatedMessages(string oldStr, string newStr);

   // يصرح عن متغير حالة 'message' من النوع 'string'.
   // متغيرات الحالة هي متغيرات تُخزن قيمها بشكل دائم في تخزين العقد. الكلمة المفتاحية 'public' تجعل المتغيرات قابلة للوصول من خارج العقد وتنشئ دالة يمكن للعقود أو العملاء الآخرين استدعاؤها للوصول إلى القيمة.
   string public message;

   // على غرار العديد من اللغات الكائنية التوجه القائمة على الأصناف، المُنشئ هو دالة خاصة تُنفذ فقط عند إنشاء العقد.
   // تُستخدم المُنشئات لتهيئة بيانات العقد. اعرف المزيد:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // يقبل وسيط سلسلة 'initMessage' ويضبط القيمة في متغير التخزين 'message' الخاص بالعقد).
      message = initMessage;
   }

   // دالة عامة تقبل وسيط سلسلة وتُحدّث متغير التخزين 'message'.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

تعد أحداث العقود الذكية وسيلة لعقدك لإبلاغ تطبيق الواجهة الأمامية بحدوث شيء ما (أي، كان هناك _حدث_) على البلوكتشين، والذي يمكن أن "يستمع" لأحداث معينة ويتخذ إجراءات عند حدوثها.

ستستمع دالة `addSmartContractListener` بشكل خاص لحدث `UpdatedMessages` الخاص بعقد Hello World الذكي، وستقوم بتحديث واجهة المستخدم لدينا لعرض الرسالة الجديدة.

عدّل `addSmartContractListener` إلى ما يلي:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 تم تحديث رسالتك!")
    }
  })
}
```

دعنا نحلل ما يحدث عندما يكتشف المستمع حدثًا:

- إذا حدث خطأ عند إصدار الحدث، فسينعكس ذلك في واجهة المستخدم عبر متغير الحالة `status` الخاص بنا.
- وإلا، سنستخدم كائن `data` المرجع. `data.returnValues` هي مصفوفة مفهرسة من الصفر حيث يخزن العنصر الأول في المصفوفة الرسالة السابقة ويخزن العنصر الثاني الرسالة المحدثة. بشكل عام، عند وقوع حدث ناجح، سنقوم بتعيين سلسلة `message` الخاصة بنا إلى الرسالة المحدثة، ومسح سلسلة `newMessage`، وتحديث متغير الحالة `status` الخاص بنا ليعكس أنه تم نشر رسالة جديدة على عقدنا الذكي.

أخيرًا، دعنا نستدعي المستمع الخاص بنا في دالة `useEffect` الخاصة بنا حتى يتم تهيئته عند العرض الأول لمكون `HelloWorld.js`. بشكل عام، يجب أن تبدو دالة `useEffect` الخاصة بك كما يلي:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

الآن بعد أن أصبحنا قادرين على القراءة من عقدنا الذكي، سيكون من الرائع معرفة كيفية الكتابة إليه أيضًا! ومع ذلك، للكتابة إلى تطبيقنا اللامركزي، يجب أن تكون لدينا أولاً محفظة إيثريوم متصلة به.

لذا، بعد ذلك، سنتناول إعداد محفظة إيثريوم الخاصة بنا (MetaMask) ثم توصيلها بتطبيقنا اللامركزي!

### الخطوة 4: إعداد محفظة إيثريوم الخاصة بك {#step-4-set-up-your-ethereum-wallet}

لكتابة أي شيء على سلسلة إيثريوم، يجب على المستخدمين توقيع المعاملات باستخدام المفاتيح الخاصة بمحافظهم الافتراضية. في هذا الدرس التعليمي، سنستخدم [MetaMask](https://metamask.io/)، وهي محفظة افتراضية في المتصفح تُستخدم لإدارة عنوان حساب إيثريوم الخاص بك، لأنها تجعل توقيع المعاملات هذا سهلاً للغاية للمستخدم النهائي.

إذا كنت ترغب في فهم المزيد حول كيفية عمل المعاملات على إيثريوم، فراجع [هذه الصفحة](/developers/docs/transactions/) من مؤسسة إيثريوم.

#### تنزيل MetaMask {#download-metamask}

يمكنك تنزيل وإنشاء حساب MetaMask مجانًا [هنا](https://metamask.io/download). عندما تقوم بإنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى "شبكة اختبار Goerli" في الجزء العلوي الأيمن (حتى لا نتعامل بأموال حقيقية).

#### إضافة الإيثر من سبيل {#add-ether-from-a-faucet}

لتوقيع معاملة على بلوكتشين إيثريوم، سنحتاج إلى بعض من عملات الإيثر المزيفة. للحصول على إيثر، يمكنك الذهاب إلى [FaucETH](https://fauceth.komputing.org) وإدخال عنوان حساب Goerli الخاص بك، والنقر على "طلب الأموال"، ثم تحديد "Ethereum Testnet Goerli" في القائمة المنسدلة وأخيرًا النقر على زر "طلب الأموال" مرة أخرى. You should see Eth in your MetaMask account soon after!

#### تحقق من رصيدك {#check-your-balance}

للتأكد مرة أخرى من وجود رصيدنا، لنجري طلب [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) باستخدام [أداة الإنشاء من Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). This will return the amount of Eth in our wallet. After you input your MetaMask account address and click “Send Request”, you should see a response like this:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ملاحظة:** هذه النتيجة بوحدة wei وليست eth. Wei is used as the smallest denomination of ether. The conversion from wei to eth is: 1 eth = 10¹⁸ wei. So if we convert 0xde0b6b3a7640000 to decimal we get 1\*10¹⁸ which equals 1 eth.

Phew! Our fake money is all there! 🤑

### الخطوة 5: توصيل MetaMask بواجهة المستخدم الخاصة بك {#step-5-connect-metamask-to-your-UI}

Now that our MetaMask wallet is set up, let's connect our dapp to it!

#### دالة `connectWallet` {#the-connectWallet-function}

في ملف `interact.js` الخاص بنا، لنقم بتنفيذ دالة `connectWallet`، والتي يمكننا بعد ذلك استدعاؤها في مكون `HelloWorld.js` الخاص بنا.

دعنا نعدل `connectWallet` إلى ما يلي:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 اكتب رسالة في حقل النص أعلاه.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              يجب عليك تثبيت MetaMask، وهي محفظة إيثريوم افتراضية، في متصفحك.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

إذن ما الذي يفعله هذا الكود الضخم بالضبط؟

حسنًا، أولاً، يتحقق مما إذا كان `window.ethereum` ممكّنًا في متصفحك.

`window.ethereum` هو واجهة برمجة تطبيقات (API) عالمية يتم إدراجها بواسطة MetaMask ومقدمي المحافظ الآخرين والتي تسمح لمواقع الويب بطلب حسابات إيثريوم الخاصة بالمستخدمين. في حالة الموافقة، يمكنه قراءة البيانات من البلوكتشين التي يتصل بها المستخدم، واقتراح أن يقوم المستخدم بتوقيع الرسائل والمعاملات . اطلع على [مستندات MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) لمزيد من المعلومات!

إذا كان `window.ethereum` _غير_ موجود، فهذا يعني أن MetaMask غير مثبت. ينتج عن هذا إرجاع كائن JSON، حيث يكون `address` المرجع سلسلة فارغة، وكائن `status` JSX يبلغ بأن المستخدم يجب أن يقوم بتثبيت MetaMask.

الآن إذا كان `window.ethereum` _موجودًا_، فهنا تصبح الأمور مثيرة للاهتمام.

باستخدام حلقة try/catch، سنحاول الاتصال بـ MetaMask عن طريق استدعاء [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Calling this function will open up MetaMask in the browser, whereby the user will be prompted to connect their wallet to your dapp.

- إذا اختار المستخدم الاتصال، فإن `method: "eth_requestAccounts"` ستعيد مصفوفة تحتوي على جميع عناوين حسابات المستخدم المتصلة بالتطبيق اللامركزي. إجمالاً، ستعيد دالة `connectWallet` الخاصة بنا كائن JSON يحتوي على _أول_ `address` في هذه المصفوفة \(انظر السطر 9\) ورسالة `status` تحث المستخدم على كتابة رسالة إلى العقد الذكي.
- إذا رفض المستخدم الاتصال، فسيحتوي كائن JSON على سلسلة فارغة لـ `address` المرجع ورسالة `status` تعكس أن المستخدم رفض الاتصال.

الآن بعد أن كتبنا دالة `connectWallet` هذه، فإن الخطوة التالية هي استدعاؤها في مكون `HelloWorld.js` الخاص بنا.

#### إضافة دالة `connectWallet` إلى مكون واجهة المستخدم HelloWorld.js الخاص بك {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

انتقل إلى دالة `connectWalletPressed` في `HelloWorld.js`، وقم بتحديثها إلى ما يلي:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

هل تلاحظ كيف يتم تجريد معظم وظائفنا بعيدًا عن مكون `HelloWorld.js` من ملف `interact.js`؟ This is so we comply with the M-V-C paradigm!

في `connectWalletPressed`، نقوم ببساطة بإجراء استدعاء await لدالة `connectWallet` المستوردة، وباستخدام استجابتها، نقوم بتحديث متغيري `status` و `walletAddress` عبر خطافات الحالة الخاصة بهما.

الآن، دعنا نحفظ كلا الملفين (`HelloWorld.js` و`interact.js`) ونختبر واجهة المستخدم الخاصة بنا حتى الآن.

افتح متصفحك على صفحة [http://localhost:3000/](http://localhost:3000/)، واضغط على زر "توصيل المحفظة" في الجزء العلوي الأيمن من الصفحة.

If you have MetaMask installed, you should be prompted to connect your wallet to your dapp. Accept the invitation to connect.

يجب أن ترى أن زر المحفظة يعكس الآن أن عنوانك متصل! يا سلام 🔥

بعد ذلك، حاول تحديث الصفحة... هذا غريب. Our wallet button is prompting us to connect MetaMask, even though it is already connected...

لكن لا تخف! يمكننا معالجة ذلك بسهولة (هل فهمت التورية؟) من خلال تنفيذ `getCurrentWalletConnected`، والذي سيتحقق مما إذا كان العنوان متصلاً بالفعل بتطبيقنا اللامركزي وتحديث واجهة المستخدم لدينا وفقًا لذلك!

#### دالة `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

قم بتحديث دالة `getCurrentWalletConnected` في ملف `interact.js` إلى ما يلي:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 اكتب رسالة في حقل النص أعلاه.",
        }
      } else {
        return {
          address: "",
          status: "🦊 اتصل بـ MetaMask باستخدام الزر العلوي الأيمن.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              يجب عليك تثبيت MetaMask، وهي محفظة إيثريوم افتراضية، في متصفحك.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

هذا الكود _مشابه جدًا_ لدالة `connectWallet` التي كتبناها للتو في الخطوة السابقة.

الفرق الرئيسي هو أنه بدلاً من استدعاء الطريقة `eth_requestAccounts`، التي تفتح MetaMask للمستخدم لربط محفظته، هنا نستدعي الطريقة `eth_accounts`، التي تعيد ببساطة مصفوفة تحتوي على عناوين MetaMask المتصلة حاليًا بتطبيقنا اللامركزي (dapp).

لرؤية هذه الدالة قيد التنفيذ، دعنا نستدعيها في دالة `useEffect` الخاصة بمكون `HelloWorld.js` الخاص بنا:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

لاحظ أننا نستخدم استجابة استدعائنا لـ `getCurrentWalletConnected` لتحديث متغيرات الحالة `walletAddress` و `status`.

الآن بعد أن أضفت هذا الكود، دعنا نحاول تحديث نافذة متصفحنا.

جميل! The button should say that you're connected, and show a preview of your connected wallet's address - even after you refresh!

#### تنفيذ `addWalletListener` {#implement-addwalletlistener}

The final step in our dapp wallet setup is implementing the wallet listener so our UI updates when our wallet's state changes, such as when the user disconnects or switches accounts.

في ملف `HelloWorld.js` الخاص بك، قم بتعديل دالة `addWalletListener` الخاصة بك على النحو التالي:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 اكتب رسالة في حقل النص أعلاه.")
      } else {
        setWallet("")
        setStatus("🦊 اتصل بـ MetaMask باستخدام الزر العلوي الأيمن.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          يجب عليك تثبيت MetaMask، وهي محفظة إيثريوم افتراضية، في متصفحك.
        </a>
      </p>
    )
  }
}
```

أراهن أنك لست بحاجة إلى مساعدتنا لفهم ما يحدث هنا في هذه المرحلة، ولكن لأغراض الشمولية، دعنا نحلل الأمر بسرعة:

- أولاً، تتحقق دالتنا مما إذا كان `window.ethereum` ممكّنًا (أي أن MetaMask مثبت).
  - إذا لم يكن كذلك، فإننا ببساطة نضبط متغير الحالة `status` على سلسلة JSX التي تحث المستخدم على تثبيت MetaMask.
  - إذا كان ممكّنًا، فإننا ننشئ المستمع `window.ethereum.on("accountsChanged")` في السطر 3 الذي يستمع لتغيرات الحالة في محفظة MetaMask، والتي تشمل عندما يربط المستخدم حسابًا إضافيًا بالتطبيق اللامركزي (dapp)، أو يبدل الحسابات، أو يفصل حسابًا. إذا كان هناك حساب واحد على الأقل متصل، يتم تحديث متغير الحالة `walletAddress` كأول حساب في مصفوفة `accounts` التي يعيدها المستمع. بخلاف ذلك، يتم تعيين `walletAddress` كسلسلة فارغة.

أخيرًا وليس آخرًا، يجب أن نستدعيها في دالة `useEffect` الخاصة بنا:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

وهذا كل شيء! لقد أكملنا بنجاح برمجة جميع وظائف محفظتنا! الآن إلى مهمتنا الأخيرة: تحديث الرسالة المخزنة في عقدنا الذكي!

### الخطوة 6: تنفيذ دالة `updateMessage` {#step-6-implement-the-updateMessage-function}

حسنًا يا رفاق، لقد وصلنا إلى المرحلة النهائية! في `updateMessage` من ملف `interact.js` الخاص بك، سنقوم بما يلي:

1. تأكد من أن الرسالة التي نرغب في نشرها في عقدنا الذكي صالحة
2. توقيع معاملتنا باستخدام MetaMask
3. استدعاء هذه الدالة من مكون الواجهة الأمامية HelloWorld.js الخاص بنا

لن يستغرق هذا وقتًا طويلاً؛ دعنا ننهي هذا التطبيق اللامركزي!

#### معالجة أخطاء الإدخال {#input-error-handling}

بطبيعة الحال، من المنطقي أن يكون هناك نوع من معالجة أخطاء الإدخال في بداية الدالة.

سنريد أن تعود دالتنا مبكرًا إذا لم يكن هناك امتداد MetaMask مثبت، أو لم تكن هناك محفظة متصلة (أي أن `address` الذي تم تمريره هو سلسلة فارغة)، أو كانت `message` سلسلة فارغة. دعنا نضيف معالجة الأخطاء التالية إلى `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 قم بتوصيل محفظة MetaMask الخاصة بك لتحديث الرسالة على البلوكتشين.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ لا يمكن أن تكون رسالتك سلسلة فارغة.",
    }
  }
}
```

الآن بعد أن أصبحت لديها معالجة مناسبة لأخطاء الإدخال، حان الوقت لتوقيع المعاملة عبر MetaMask!

#### توقيع معاملتنا {#signing-our-transaction}

إذا كنت مرتاحًا بالفعل مع معاملات إيثريوم التقليدية على الويب 3، فإن الكود الذي سنكتبه بعد ذلك سيكون مألوفًا جدًا. أسفل كود معالجة أخطاء الإدخال، أضف ما يلي إلى `updateMessage`:

```javascript
// interact.js

//إعداد معلمات المعاملة
const transactionParameters = {
  to: contractAddress, // مطلوب باستثناء أثناء نشر العقود.
  from: address, // يجب أن يتطابق مع عنوان المستخدم النشط.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//توقيع المعاملة
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          عرض حالة معاملتك على Etherscan!
        </a>
        <br />
        ℹ️ بمجرد التحقق من المعاملة بواسطة الشبكة، سيتم تحديث الرسالة تلقائيًا.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

دعنا نحلل ما يحدث. أولاً، نقوم بإعداد معلمات معاملاتنا، حيث:

- `to` يحدد عنوان المستلم (عقدنا الذكي)
- `from` يحدد موقع المعاملة، وهو متغير `address` الذي مررناه إلى دالتنا
- `data` تحتوي على استدعاء طريقة `update` الخاصة بعقد Hello World الذكي، وتتلقى متغير سلسلة `message` كمدخل

بعد ذلك، نقوم باستدعاء await، `window.ethereum.request`، حيث نطلب من MetaMask توقيع المعاملة. لاحظ، في السطرين 11 و 12، أننا نحدد طريقة eth الخاصة بنا، `eth_sendTransaction` ونمرر `transactionParameters` الخاصة بنا.

At this point, MetaMask will open up in the browser, and prompt the user to sign or reject the transaction.

- إذا كانت المعاملة ناجحة، فستعيد الدالة كائن JSON حيث تحث سلسلة `status` JSX المستخدم على التحقق من Etherscan لمزيد من المعلومات حول معاملتهم.
- إذا فشلت المعاملة، فستعيد الدالة كائن JSON حيث تنقل سلسلة `status` رسالة الخطأ.

بشكل عام، يجب أن تبدو دالة `updateMessage` الخاصة بنا كما يلي:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //معالجة أخطاء الإدخال
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 قم بتوصيل محفظة MetaMask الخاصة بك لتحديث الرسالة على البلوكتشين.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ لا يمكن أن تكون رسالتك سلسلة فارغة.",
    }
  }

  //إعداد معلمات المعاملة
  const transactionParameters = {
    to: contractAddress, // مطلوب باستثناء أثناء نشر العقود.
    from: address, // يجب أن يتطابق مع عنوان المستخدم النشط.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //توقيع المعاملة
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            عرض حالة معاملتك على Etherscan!
          </a>
          <br />
          ℹ️ بمجرد التحقق من المعاملة بواسطة الشبكة، سيتم تحديث الرسالة تلقائيًا.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

أخيرًا وليس آخرًا، نحتاج إلى توصيل دالة `updateMessage` الخاصة بنا بمكون `HelloWorld.js`.

#### توصيل `updateMessage` بالواجهة الأمامية لـ HelloWorld.js {#connect-updatemessage-to-the-helloworld-js-frontend}

يجب أن تقوم دالة `onUpdatePressed` الخاصة بنا باستدعاء await لدالة `updateMessage` المستوردة وتعديل متغير الحالة `status` ليعكس ما إذا كانت معاملتنا قد نجحت أم فشلت:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

إنه نظيف وبسيط للغاية. وخمن ماذا... تطبيقك اللامركزي اكتمل!!!

انطلق واختبر زر **التحديث**!

### أنشئ تطبيقك اللامركزي المخصص {#make-your-own-custom-dapp}

لقد وصلت إلى نهاية الدرس التعليمي! لتلخيص ذلك، تعلمت كيفية:

- توصيل محفظة MetaMask بمشروع تطبيقك اللامركزي
- قراءة البيانات من عقدك الذكي باستخدام واجهة برمجة تطبيقات [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- توقيع معاملات إيثريوم باستخدام MetaMask

أنت الآن مجهز بالكامل لتطبيق المهارات من هذا الدرس التعليمي لبناء مشروع تطبيق لامركزي مخصص خاص بك! كما هو الحال دائمًا، إذا كانت لديك أي أسئلة، فلا تتردد في التواصل معنا للحصول على المساعدة في [Alchemy Discord](https://discord.gg/gWuC7zB). 🧙‍♂️

بمجرد إكمال هذا الدرس التعليمي، أخبرنا كيف كانت تجربتك أو إذا كان لديك أي ملاحظات عن طريق الإشارة إلينا على تويتر [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
