---
title: "عقد ذكي ⁦Hello World⁩ للمبتدئين - ⁦Fullstack⁩"
description: "برنامج تعليمي تمهيدي حول كتابة ونشر عقد ذكي بسيط على إيثيريوم."
author: "nstrike2"
breadcrumb: "⁦Hello World fullstack⁩"
tags:
  [
    "solidity",
    "hardhat",
    "alchemy",
    "العقود الذكية",
    "النشر",
    "مستكشف الكتل",
    "الواجهة الأمامية",
    "المعاملات",
    "إطار العمل",
  ]
skill: beginner
lang: ar
published: 2021-10-25
---

هذا الدليل مخصص لك إذا كنت جديدًا في مجال تطوير سلسلة الكتل ولا تعرف من أين تبدأ أو كيف تقوم بنشر العقود الذكية والتفاعل معها. سنستعرض معًا كيفية إنشاء ونشر عقد ذكي بسيط على شبكة اختبار غويرلي باستخدام [ميتاماسك](https://metamask.io)، و[Solidity](https://docs.soliditylang.org/en/v0.8.0/)، و[Hardhat](https://hardhat.org)، و[Alchemy](https://alchemy.com/eth).

ستحتاج إلى حساب Alchemy لإكمال هذا البرنامج التعليمي. [سجل للحصول على حساب مجاني](https://www.alchemy.com/).

إذا كانت لديك أسئلة في أي وقت، فلا تتردد في التواصل معنا في [ديسكورد Alchemy](https://discord.gg/gWuC7zB)!

## الجزء الأول - إنشاء ونشر عقدك الذكي باستخدام <span dir="ltr">Hardhat</span> {#part-1}

### الاتصال بشبكة إيثيريوم {#connect-to-the-ethereum-network}

هناك العديد من الطرق لإجراء طلبات إلى سلسلة إيثيريوم. للتبسيط، سنستخدم حسابًا مجانيًا على <span dir="ltr">Alchemy</span>، وهي منصة لمطوري سلسلة الكتل و<span dir="ltr">API</span> تتيح لنا التواصل مع سلسلة إيثيريوم دون تشغيل عقدة بأنفسنا. تمتلك <span dir="ltr">Alchemy</span> أيضًا أدوات مطورين للمراقبة والتحليلات؛ وسنستفيد منها في هذا البرنامج التعليمي لفهم ما يحدث داخليًا عند نشر عقدنا الذكي.

### إنشاء تطبيقك ومفتاح <span dir="ltr">API</span> {#create-your-app-and-api-key}

بمجرد إنشاء حساب <span dir="ltr">Alchemy</span>، يمكنك إنشاء مفتاح <span dir="ltr">API</span> عن طريق إنشاء تطبيق. سيسمح لك هذا بإجراء طلبات إلى شبكة اختبار غويرلي. إذا لم تكن على دراية بشبكات الاختبار، يمكنك [قراءة دليل <span dir="ltr">Alchemy</span> لاختيار شبكة](https://www.alchemy.com/docs/choosing-a-web3-network).

في لوحة تحكم <span dir="ltr">Alchemy</span>، ابحث عن القائمة المنسدلة **Apps** (التطبيقات) في شريط التنقل وانقر على **Create App** (إنشاء تطبيق).

![Hello world create app](./hello-world-create-app.png)

امنح تطبيقك الاسم '_Hello World_' واكتب وصفًا قصيرًا. حدد **Staging** كبيئتك و**غويرلي** كشبكتك.

![create app view hello world](./create-app-view-hello-world.png)

_ملاحظة: تأكد من تحديد **غويرلي**، وإلا فلن ينجح هذا البرنامج التعليمي._

انقر على **Create app** (إنشاء تطبيق). سيظهر تطبيقك في الجدول أدناه.

### إنشاء حساب إيثيريوم {#create-an-ethereum-account}

تحتاج إلى حساب إيثيريوم لإرسال واستقبال المعاملات. سنستخدم ميتاماسك، وهي محفظة افتراضية في المتصفح تتيح للمستخدمين إدارة عنوان حساب إيثيريوم الخاص بهم.

يمكنك تنزيل وإنشاء حساب ميتاماسك مجانًا [هنا](https://metamask.io/download). عند إنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى "Goerli Test Network" (شبكة اختبار غويرلي) في الجزء العلوي الأيمن (حتى لا نتعامل بأموال حقيقية).

### الخطوة 4: إضافة إيثر من صنبور {#step-4-add-ether-from-a-faucet}

لنشر عقدك الذكي على شبكة الاختبار، ستحتاج إلى بعض <span dir="ltr">ETH</span> الوهمي. للحصول على <span dir="ltr">ETH</span> على شبكة غويرلي، انتقل إلى صنبور غويرلي وأدخل عنوان حساب غويرلي الخاص بك. لاحظ أن صنابير غويرلي قد تكون غير موثوقة بعض الشيء مؤخرًا - راجع [صفحة شبكات الاختبار](/developers/docs/networks/#goerli) للحصول على قائمة بالخيارات التي يمكنك تجربتها:

_ملاحظة: بسبب ازدحام الشبكة، قد يستغرق هذا بعض الوقت._
``

### الخطوة 5: التحقق من رصيدك {#step-5-check-your-balance}

للتحقق مرة أخرى من وجود <span dir="ltr">ETH</span> في محفظتك، دعنا نجري طلب [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) باستخدام [أداة الملحن (composer) الخاصة بـ <span dir="ltr">Alchemy</span>](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). سيؤدي هذا إلى إرجاع مقدار <span dir="ltr">ETH</span> في محفظتنا. لمعرفة المزيد، تحقق من [البرنامج التعليمي القصير لـ <span dir="ltr">Alchemy</span> حول كيفية استخدام أداة الملحن](https://youtu.be/r6sjRxBZJuU).

أدخل عنوان حساب ميتاماسك الخاص بك وانقر على **Send Request** (إرسال طلب). سترى استجابة تبدو مثل مقتطف الكود أدناه.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _ملاحظة: هذه النتيجة بوحدة <span dir="ltr">wei</span>، وليس <span dir="ltr">ETH</span>. تُستخدم <span dir="ltr">wei</span> كأصغر فئة من الإيثر._

يا للراحة! أموالنا الوهمية كلها موجودة.

### الخطوة 6: تهيئة مشروعنا {#step-6-initialize-our-project}

أولاً، سنحتاج إلى إنشاء مجلد لمشروعنا. انتقل إلى سطر الأوامر الخاص بك وأدخل ما يلي.

```
mkdir hello-world
cd hello-world
```

الآن بعد أن أصبحنا داخل مجلد مشروعنا، سنستخدم `npm init` لتهيئة المشروع.

> إذا لم يكن لديك <span dir="ltr">npm</span> مثبتًا بعد، فاتبع [هذه التعليمات لتثبيت <span dir="ltr">Node.js</span> و<span dir="ltr">npm</span>](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

لأغراض هذا البرنامج التعليمي، لا يهم كيف تجيب على أسئلة التهيئة. إليك كيف فعلنا ذلك كمرجع:

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

وافق على <span dir="ltr">package.json</span> ونحن جاهزون للبدء!

### الخطوة 7: تنزيل <span dir="ltr">Hardhat</span> {#step-7-download-hardhat}

<span dir="ltr">Hardhat</span> هي بيئة تطوير لتجميع برمجيات إيثيريوم الخاصة بك ونشرها واختبارها وتصحيح أخطائها. إنها تساعد المطورين عند بناء العقود الذكية والتطبيقات اللامركزية (dapps) محليًا قبل النشر على السلسلة الحية.

داخل مشروع `hello-world` الخاص بنا، قم بتشغيل:

```
npm install --save-dev hardhat
```

تحقق من هذه الصفحة لمزيد من التفاصيل حول [تعليمات التثبيت](https://hardhat.org/getting-started/#overview).

### الخطوة 8: إنشاء مشروع <span dir="ltr">Hardhat</span> {#step-8-create-hardhat-project}

داخل مجلد مشروع `hello-world` الخاص بنا، قم بتشغيل:

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

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

سيؤدي هذا إلى إنشاء ملف `hardhat.config.js` في المشروع. سنستخدم هذا لاحقًا في البرنامج التعليمي لتحديد إعداد مشروعنا.

### الخطوة 9: إضافة مجلدات المشروع {#step-9-add-project-folders}

للحفاظ على تنظيم المشروع، دعنا ننشئ مجلدين جديدين. في سطر الأوامر، انتقل إلى الدليل الجذر لمشروع `hello-world` الخاص بك واكتب:

```
mkdir contracts
mkdir scripts
```

- `contracts/` هو المكان الذي سنحتفظ فيه بملف كود العقد الذكي hello world الخاص بنا
- `scripts/` هو المكان الذي سنحتفظ فيه بالبرامج النصية لنشر عقدنا والتفاعل معه

### الخطوة 10: كتابة عقدنا {#step-10-write-our-contract}

ربما تسأل نفسك، متى سنكتب الكود؟ لقد حان الوقت!

افتح مشروع hello-world في محرر الأكواد المفضل لديك. تُكتب العقود الذكية في الغالب بلغة <span dir="ltr">Solidity</span>، والتي سنستخدمها لكتابة عقدنا الذكي.‌

1. انتقل إلى مجلد `contracts` وأنشئ ملفًا جديدًا يسمى `HelloWorld.sol`
2. يوجد أدناه نموذج لعقد ذكي Hello World سنستخدمه في هذا البرنامج التعليمي. انسخ المحتويات أدناه إلى ملف `HelloWorld.sol`.

_ملاحظة: تأكد من قراءة التعليقات لفهم ما يفعله هذا العقد._

```
// يحدد إصدار Solidity، باستخدام الإصدار الدلالي.
// لمعرفة المزيد: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// يحدد عقدًا باسم `HelloWorld`.
// العقد هو مجموعة من الدوال والبيانات (حالته). بمجرد نشره، يتواجد العقد في عنوان محدد على سلسلة كتل إيثيريوم. لمعرفة المزيد: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // ينبعث عند استدعاء دالة التحديث
   // أحداث العقد الذكي هي طريقة لعقدك للإبلاغ عن حدوث شيء ما على سلسلة الكتل إلى الواجهة الأمامية لتطبيقك، والتي يمكن أن تكون "تستمع" لأحداث معينة وتتخذ إجراءً عند حدوثها.
   event UpdatedMessages(string oldStr, string newStr);

   // يعلن عن متغير حالة `message` من النوع `string`.
   // متغيرات الحالة هي متغيرات يتم تخزين قيمها بشكل دائم في تخزين العقد. الكلمة المفتاحية `public` تجعل المتغيرات قابلة للوصول من خارج العقد وتنشئ دالة يمكن للعقود أو العملاء الآخرين استدعاؤها للوصول إلى القيمة.
   string public message;

   // على غرار العديد من اللغات كائنية التوجه القائمة على الفئات، فإن المُنشئ (constructor) هو دالة خاصة يتم تنفيذها فقط عند إنشاء العقد.
   // تُستخدم المُنشئات لتهيئة بيانات العقد. لمعرفة المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // يقبل وسيطة نصية `initMessage` ويعين القيمة في متغير التخزين `message` الخاص بالعقد).
      message = initMessage;
   }

   // دالة عامة تقبل وسيطة نصية وتقوم بتحديث متغير التخزين `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

هذا عقد ذكي أساسي يخزن رسالة عند إنشائه. يمكن تحديثه عن طريق استدعاء دالة `update`.

### الخطوة 11: ربط ميتاماسك و<span dir="ltr">Alchemy</span> بمشروعك {#step-11-connect-metamask-alchemy-to-your-project}

لقد أنشأنا محفظة ميتاماسك، وحساب <span dir="ltr">Alchemy</span>، وكتبنا عقدنا الذكي، والآن حان الوقت لربط الثلاثة معًا.

تتطلب كل معاملة يتم إرسالها من محفظتك توقيعًا باستخدام مفتاحك الخاص الفريد. لتزويد برنامجنا بهذا الإذن، يمكننا تخزين مفتاحنا الخاص بأمان في ملف بيئة. سنقوم أيضًا بتخزين مفتاح <span dir="ltr">API</span> لـ <span dir="ltr">Alchemy</span> هنا.

> لمعرفة المزيد حول إرسال المعاملات، تحقق من [هذا البرنامج التعليمي](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) حول إرسال المعاملات باستخدام <span dir="ltr">Web3</span>.

أولاً، قم بتثبيت حزمة <span dir="ltr">dotenv</span> في دليل مشروعك:

```
npm install dotenv --save
```

ثم، أنشئ ملف `.env` في الدليل الجذر للمشروع. أضف مفتاح ميتاماسك الخاص بك وعنوان <span dir="ltr">URL</span> الخاص بـ <span dir="ltr">HTTP Alchemy API</span> إليه.

يجب أن يُسمى ملف البيئة الخاص بك `.env` وإلا فلن يتم التعرف عليه كملف بيئة.

لا تسمه `process.env` أو `.env-custom` أو أي شيء آخر.

- اتبع [هذه التعليمات](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) لتصدير مفتاحك الخاص
- انظر أدناه للحصول على عنوان <span dir="ltr">URL</span> الخاص بـ <span dir="ltr">HTTP Alchemy API</span>

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

يجب أن يبدو ملف `.env` الخاص بك هكذا:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

لربط هذه المتغيرات فعليًا بالكود الخاص بنا، سنشير إليها في ملف `hardhat.config.js` الخاص بنا في الخطوة 13.

### الخطوة 12: تثبيت <span dir="ltr">Ethers.js</span> {#step-12-install-ethersjs}

<span dir="ltr">Ethers.js</span> هي مكتبة تسهل التفاعل وإجراء الطلبات إلى إيثيريوم عن طريق تغليف [طرق <span dir="ltr">JSON-RPC</span> القياسية](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) بطرق أكثر سهولة في الاستخدام.

يسمح لنا <span dir="ltr">Hardhat</span> بدمج [المكونات الإضافية](https://hardhat.org/plugins/) للحصول على أدوات إضافية ووظائف موسعة. سنستفيد من [مكون Ethers الإضافي](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) لنشر العقد.

في دليل مشروعك اكتب:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### الخطوة 13: تحديث hardhat.config.js {#step-13-update-hardhat-configjs}

لقد أضفنا العديد من التبعيات والمكونات الإضافية حتى الآن، والآن نحتاج إلى تحديث `hardhat.config.js` حتى يتعرف مشروعنا عليها جميعًا.

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

للتأكد من أن كل شيء يعمل حتى الآن، دعنا نجمع عقدنا. مهمة `compile` هي إحدى مهام <span dir="ltr">Hardhat</span> المدمجة.

من سطر الأوامر قم بتشغيل:

```bash
npx hardhat compile
```

قد تتلقى تحذيرًا بشأن `SPDX license identifier not provided in source file`، ولكن لا داعي للقلق حيال ذلك — نأمل أن يبدو كل شيء آخر جيدًا! إذا لم يكن الأمر كذلك، يمكنك دائمًا إرسال رسالة في [ديسكورد <span dir="ltr">Alchemy</span>](https://discord.gg/u72VCg3).

### الخطوة 15: كتابة البرنامج النصي للنشر {#step-15-write-our-deploy-script}

الآن بعد أن تمت كتابة عقدنا وملف التكوين الخاص بنا جاهز للعمل، حان الوقت لكتابة البرنامج النصي لنشر العقد.

انتقل إلى مجلد `scripts/` وأنشئ ملفًا جديدًا يسمى `deploy.js` ، مع إضافة المحتويات التالية إليه:

```javascript
async function main() {
  const HelloWorld = await ethers.getعقدFactory("HelloWorld")

  // بدء النشر، وإرجاع وعد يحل إلى كائن عقد
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

يقوم <span dir="ltr">Hardhat</span> بعمل رائع في شرح ما يفعله كل سطر من أسطر الكود هذه في [البرنامج التعليمي للعقود](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) الخاص بهم، وقد اعتمدنا شروحاتهم هنا.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

إن `ContractFactory` في <span dir="ltr">ethers.js</span> هو تجريد يُستخدم لنشر عقود ذكية جديدة، لذا فإن `HelloWorld` هنا هو [مصنع (factory)](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) لمثيلات عقد hello world الخاص بنا. عند استخدام المكون الإضافي `hardhat-ethers` مع `ContractFactory` و`Contract`، يتم توصيل المثيلات بالمُوقّع الأول (المالك) افتراضيًا.

```javascript
const hello_world = await HelloWorld.deploy()
```

سيؤدي استدعاء `deploy()` على `ContractFactory` إلى بدء النشر، وإرجاع `Promise` الذي يُحل إلى كائن `Contract`. هذا هو الكائن الذي يحتوي على طريقة (method) لكل دالة من دوال عقدنا الذكي.

### الخطوة 16: نشر عقدنا {#step-16-deploy-our-contract}

نحن مستعدون أخيرًا لنشر عقدنا الذكي! انتقل إلى سطر الأوامر وقم بتشغيل:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

يجب أن ترى بعد ذلك شيئًا مثل:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**يرجى حفظ هذا العنوان**. سنستخدمه لاحقًا في البرنامج التعليمي.

إذا ذهبنا إلى [Etherscan غويرلي](https://goerli.etherscan.io) وبحثنا عن عنوان عقدنا، يجب أن نتمكن من رؤية أنه قد تم نشره بنجاح. ستبدو المعاملة كالتالي:

![](./etherscan-contract.png)

يجب أن يتطابق عنوان `From` مع عنوان حساب ميتاماسك الخاص بك وسيشير عنوان `To` إلى **Contract Creation** (إنشاء عقد). إذا نقرنا على المعاملة، فسنرى عنوان عقدنا في حقل `To`.

![](./etherscan-transaction.png)

تهانينا! لقد قمت للتو بنشر عقد ذكي على شبكة اختبار إيثيريوم.

لفهم ما يحدث داخليًا، دعنا ننتقل إلى علامة التبويب Explorer (المستكشف) في [لوحة تحكم <span dir="ltr">Alchemy</span>](https://dashboard.alchemy.com/explorer) الخاصة بنا. إذا كان لديك تطبيقات <span dir="ltr">Alchemy</span> متعددة، فتأكد من التصفية حسب التطبيق وحدد **Hello World**.

![](./hello-world-explorer.png)

هنا سترى مجموعة من طرق <span dir="ltr">JSON-RPC</span> التي قام بها <span dir="ltr">Hardhat/Ethers</span> داخليًا من أجلنا عندما استدعينا دالة `.deploy()`. هناك طريقتان مهمتان هنا هما [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction)، وهو طلب كتابة عقدنا على سلسلة غويرلي، و[`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash)، وهو طلب لقراءة معلومات حول معاملتنا بناءً على التجزئة (hash). لمعرفة المزيد حول إرسال المعاملات، تحقق من [برنامجنا التعليمي حول إرسال المعاملات باستخدام <span dir="ltr">Web3</span>](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## الجزء 2: التفاعل مع عقدك الذكي {#part-2-interact-with-your-smart-contract}

الآن بعد أن نجحنا في نشر عقد ذكي على شبكة غويرلي، دعونا نتعلم كيفية التفاعل معه.

### إنشاء ملف <span dir="ltr">interact.js</span> {#create-a-interactjs-file}

هذا هو الملف الذي سنكتب فيه نص التفاعل الخاص بنا. سنستخدم مكتبة <span dir="ltr">Ethers.js</span> التي قمت بتثبيتها مسبقًا في الجزء 1.

داخل مجلد `scripts/`، قم بإنشاء ملف جديد باسم `interact.js` وأضف الكود التالي:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### تحديث ملف <span dir="ltr">.env</span> الخاص بك {#update-your-env-file}

سنستخدم متغيرات بيئة جديدة، لذا نحتاج إلى تعريفها في ملف `.env` الذي [أنشأناه سابقًا](#step-11-connect-metamask-alchemy-to-your-project).

سنحتاج إلى إضافة تعريف لـ `API_KEY` الخاص بـ Alchemy و `CONTRACT_ADDRESS` حيث تم نشر عقدك الذكي.

يجب أن يبدو ملف `.env` الخاص بك هكذا:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### الحصول على ABI الخاص بعقدك {#grab-your-contract-abi}

إن [ABI (واجهة التطبيق الثنائية)](/glossary/#abi) لعقدنا هي الواجهة للتفاعل مع عقدنا الذكي. يقوم Hardhat تلقائيًا بإنشاء ABI ويحفظه في `HelloWorld.json`. لاستخدام ABI، سنحتاج إلى تحليل المحتويات عن طريق إضافة أسطر الكود التالية إلى ملف `interact.js` الخاص بنا:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

إذا كنت ترغب في رؤية ABI، يمكنك طباعته في وحدة التحكم الخاصة بك:

```javascript
console.log(JSON.stringify(contract.abi))
```

لرؤية ABI الخاص بك مطبوعًا في وحدة التحكم، انتقل إلى الطرفية (terminal) وقم بتشغيل:

```bash
npx hardhat run scripts/interact.js
```

### إنشاء نسخة من عقدك {#create-an-instance-of-your-contract}

للتفاعل مع عقدنا، نحتاج إلى إنشاء نسخة من العقد في الكود الخاص بنا. للقيام بذلك باستخدام <span dir="ltr">Ethers.js</span>، سنحتاج إلى العمل مع ثلاثة مفاهيم:

1. المزود (مزود) - مزود عقدة يمنحك حق الوصول للقراءة والكتابة على سلسلة الكتل
2. المُوقّع (موقع) - يمثل حساب إيثيريوم يمكنه توقيع المعاملات
3. العقد (Contract) - كائن <span dir="ltr">Ethers.js</span> يمثل عقدًا محددًا تم نشره على السلسلة

سنستخدم ABI الخاص بالعقد من الخطوة السابقة لإنشاء نسختنا من العقد:

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

تعرف على المزيد حول المزودين (Providers) والمُوقّعين (Signers) والعقود (Contracts) في [وثائق <span dir="ltr">ethers.js</span>](https://docs.ethers.io/v5/).

### قراءة رسالة التهيئة (init) {#read-the-init-message}

هل تتذكر عندما قمنا بنشر عقدنا باستخدام `initMessage = "Hello world!"`؟ سنقوم الآن بقراءة تلك الرسالة المخزنة في عقدنا الذكي وطباعتها في وحدة التحكم.

في JavaScript، يتم استخدام الدوال غير المتزامنة (asynchronous functions) عند التفاعل مع الشبكات. لمعرفة المزيد حول الدوال غير المتزامنة، [اقرأ هذا المقال على Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

استخدم الكود أدناه لاستدعاء دالة `message` في عقدنا الذكي وقراءة رسالة التهيئة:

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
الرسالة هي: مرحبًا بالعالم!
```

تهانينا! لقد نجحت للتو في قراءة بيانات العقد الذكي من سلسلة كتل إيثيريوم، عمل رائع!

### تحديث الرسالة {#update-the-message}

بدلاً من مجرد قراءة الرسالة، يمكننا أيضًا تحديث الرسالة المحفوظة في عقدنا الذكي باستخدام دالة `update`! رائع جدًا، أليس كذلك؟

لتحديث الرسالة، يمكننا استدعاء دالة `update` مباشرة على كائن العقد (Contract) الذي أنشأناه:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

لاحظ أنه في السطر 11، نقوم باستدعاء `.wait()` على كائن المعاملة المُرجع. يضمن هذا أن البرنامج النصي الخاص بنا ينتظر حتى يتم تعدين المعاملة على سلسلة الكتل قبل الخروج من الدالة. إذا لم يتم تضمين استدعاء `.wait()`، فقد لا يرى البرنامج النصي قيمة `message` المحدثة في العقد.

### قراءة الرسالة الجديدة {#read-the-new-message}

يجب أن تكون قادرًا على تكرار [الخطوة السابقة](#read-the-init-message) لقراءة قيمة `message` المحدثة. خذ لحظة وانظر ما إذا كان يمكنك إجراء التغييرات اللازمة لطباعة تلك القيمة الجديدة!

إذا كنت بحاجة إلى تلميح، فإليك كيف يجب أن يبدو ملف `interact.js` الخاص بك في هذه المرحلة:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// المزود - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// الموقع - أنت
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// نسخة العقد
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

الآن فقط قم بتشغيل البرنامج النصي ويجب أن تكون قادرًا على رؤية الرسالة القديمة، وحالة التحديث، والرسالة الجديدة مطبوعة في الطرفية الخاصة بك!

`npx hardhat run scripts/interact.js --network goerli`

```
الرسالة هي: مرحبًا بالعالم!
جاري تحديث الرسالة...
الرسالة الجديدة هي: هذه هي الرسالة الجديدة.
```

أثناء تشغيل هذا البرنامج النصي، قد تلاحظ أن خطوة `Updating the message...` تستغرق بعض الوقت للتحميل قبل تحميل الرسالة الجديدة. ويرجع ذلك إلى عملية التعدين؛ إذا كنت مهتمًا بتتبع المعاملات أثناء تعدينها، فقم بزيارة [مجمع ذاكرة Alchemy (mempool)](https://dashboard.alchemyapi.io/mempool) لمعرفة حالة المعاملة. إذا تم إسقاط المعاملة، فمن المفيد أيضًا التحقق من [Etherscan لشبكة غويرلي](https://goerli.etherscan.io) والبحث عن تجزئة المعاملة الخاصة بك.

## الجزء 3: نشر عقدك الذكي على Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

لقد قمت بكل العمل الشاق لإحياء عقدك الذكي؛ حان الوقت الآن لمشاركته مع العالم!

من خلال التحقق من عقدك الذكي على Etherscan، يمكن لأي شخص عرض الكود المصدري الخاص بك والتفاعل مع عقدك الذكي. لنبدأ!

### الخطوة 1: إنشاء مفتاح API على حساب Etherscan الخاص بك {#step-1-generate-an-api-key-on-your-etherscan-account}

يعد مفتاح API الخاص بـ Etherscan ضروريًا للتحقق من أنك تمتلك العقد الذكي الذي تحاول نشره.

إذا لم يكن لديك حساب Etherscan بالفعل، [قم بالتسجيل للحصول على حساب](https://etherscan.io/register).

بمجرد تسجيل الدخول، ابحث عن اسم المستخدم الخاص بك في شريط التنقل، ومرر الماوس فوقه وحدد زر **My profile**.

في صفحة ملفك الشخصي، يجب أن ترى شريط تنقل جانبي. من شريط التنقل الجانبي، حدد **API Keys**. بعد ذلك، اضغط على زر "Add" لإنشاء مفتاح API جديد، وقم بتسمية تطبيقك **<span dir="ltr">hello-world</span>** واضغط على زر **Create New API Key**.

يجب أن يظهر مفتاح API الجديد الخاص بك في جدول مفاتيح API. انسخ مفتاح API إلى الحافظة الخاصة بك.

بعد ذلك، نحتاج إلى إضافة مفتاح API الخاص بـ Etherscan إلى ملف `.env` الخاص بنا.

بعد إضافته، يجب أن يبدو ملف `.env` الخاص بك هكذا:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### العقود الذكية المنشورة باستخدام Hardhat {#hardhat-deployed-smart-contracts}

#### تثبيت <span dir="ltr">hardhat-etherscan</span> {#install-hardhat-etherscan}

يعد نشر عقدك على Etherscan باستخدام Hardhat أمرًا بسيطًا. ستحتاج أولاً إلى تثبيت المكون الإضافي `hardhat-etherscan` للبدء. سيقوم `hardhat-etherscan` تلقائيًا بالتحقق من الكود المصدري للعقد الذكي و ABI على Etherscan. لإضافة هذا، قم بتشغيل ما يلي في دليل `hello-world`:

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

تأكد من أن `DEPLOYED_CONTRACT_ADDRESS` هو عنوان عقدك الذكي المنشور على شبكة اختبار غويرلي. أيضًا، يجب أن تكون الوسيطة الأخيرة (`'Hello World!'`) هي نفس القيمة النصية المستخدمة [أثناء خطوة النشر في الجزء 1](#step-15-write-our-deploy-script).

إذا سارت الأمور على ما يرام، فسترى الرسالة التالية في الطرفية الخاصة بك:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

تهانينا! كود عقدك الذكي موجود الآن على Etherscan!

### تحقق من عقدك الذكي على Etherscan! {#check-out-your-smart-contract-on-etherscan}

عند الانتقال إلى الرابط المقدم في الطرفية الخاصة بك، يجب أن تكون قادرًا على رؤية كود عقدك الذكي و ABI المنشورين على Etherscan!

**مرحى - لقد فعلتها يا بطل! الآن يمكن لأي شخص استدعاء عقدك الذكي أو الكتابة إليه! لا يسعنا الانتظار لرؤية ما ستبنيه بعد ذلك!**

## الجزء الرابع - دمج عقدك الذكي مع الواجهة الأمامية {#part-4-integrating-your-smart-contract-with-the-frontend}

بحلول نهاية هذا البرنامج التعليمي، ستعرف كيفية:

- ربط محفظة ميتاماسك بتطبيقك اللامركزي (dapp)
- قراءة البيانات من عقدك الذكي باستخدام [API الخاص بـ Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- توقيع معاملات إيثيريوم باستخدام ميتاماسك

بالنسبة لهذا التطبيق اللامركزي (dapp)، سنستخدم [React](https://react.dev/) كإطار عمل للواجهة الأمامية؛ ومع ذلك، من المهم ملاحظة أننا لن نقضي الكثير من الوقت في تفصيل أساسياته، حيث سنركز في الغالب على جلب وظائف Web3 إلى مشروعنا.

كمتطلب أساسي، يجب أن يكون لديك فهم بمستوى المبتدئين لـ React. إذا لم يكن الأمر كذلك، نوصي بإكمال [البرنامج التعليمي الرسمي لمقدمة React](https://react.dev/learn).

### استنساخ ملفات البداية {#clone-the-starter-files}

أولاً، انتقل إلى [مستودع GitHub الخاص بـ hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) للحصول على ملفات البداية لهذا المشروع واستنساخ هذا المستودع إلى جهازك المحلي.

افتح المستودع المستنسخ محليًا. لاحظ أنه يحتوي على مجلدين: `starter-files` و `completed`.

- `starter-files`- **سنعمل في هذا الدليل**، وسنقوم بربط واجهة المستخدم بمحفظة إيثيريوم الخاصة بك والعقد الذكي الذي نشرناه على Etherscan في [الجزء الثالث](#part-3-publish-your-smart-contract-to-etherscan).
- `completed` يحتوي على البرنامج التعليمي المكتمل بالكامل ويجب استخدامه كمرجع فقط إذا واجهت صعوبة.

بعد ذلك، افتح نسختك من `starter-files` في محرر التعليمات البرمجية المفضل لديك، ثم انتقل إلى مجلد `src`.

ستكون جميع التعليمات البرمجية التي سنكتبها موجودة ضمن مجلد `src`. سنقوم بتعديل مكون `HelloWorld.js` وملفات JavaScript `util/interact.js` لمنح مشروعنا وظائف Web3.

### التحقق من ملفات البداية {#check-out-the-starter-files}

قبل أن نبدأ في كتابة التعليمات البرمجية، دعنا نستكشف ما تم توفيره لنا في ملفات البداية.

#### تشغيل مشروع React الخاص بك {#get-your-react-project-running}

دعنا نبدأ بتشغيل مشروع React في متصفحنا. جمال React هو أنه بمجرد تشغيل مشروعنا في متصفحنا، سيتم تحديث أي تغييرات نحفظها مباشرة في متصفحنا.

لتشغيل المشروع، انتقل إلى الدليل الجذر لمجلد `starter-files`، وقم بتشغيل `npm install` في جهازك الطرفي لتثبيت تبعيات المشروع:

```bash
cd starter-files
npm install
```

بمجرد الانتهاء من التثبيت، قم بتشغيل `npm start` في جهازك الطرفي:

```bash
npm start
```

القيام بذلك يجب أن يفتح [<span dir="ltr">http://localhost:3000/</span>](http://localhost:3000/) في متصفحك، حيث سترى الواجهة الأمامية لمشروعنا. يجب أن تتكون من حقل واحد (مكان لتحديث الرسالة المخزنة في عقدك الذكي)، وزر "Connect Wallet" (ربط المحفظة)، وزر "Update" (تحديث).

إذا حاولت النقر على أي من الزرين، ستلاحظ أنهما لا يعملان—وذلك لأننا لا نزال بحاجة إلى برمجة وظائفهما.

#### مكون `HelloWorld.js` {#the-helloworld-js-component}

دعنا نعود إلى مجلد `src` في محررنا ونفتح ملف `HelloWorld.js`. من المهم جدًا أن نفهم كل شيء في هذا الملف، لأنه مكون React الأساسي الذي سنعمل عليه.

في الجزء العلوي من هذا الملف، ستلاحظ أن لدينا العديد من عبارات الاستيراد الضرورية لتشغيل مشروعنا، بما في ذلك مكتبة React، وخطافات useEffect و useState، وبعض العناصر من `./util/interact.js` (سنصفها بمزيد من التفصيل قريبًا!)، وشعار Alchemy.

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

بعد ذلك، لدينا متغيرات الحالة الخاصة بنا والتي سنقوم بتحديثها بعد أحداث معينة.

```javascript
// HelloWorld.js

//متغيرات الحالة
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

إليك ما يمثله كل من المتغيرات:

- `walletAddress` - سلسلة نصية تخزن عنوان محفظة المستخدم
- `status`- سلسلة نصية تخزن رسالة مفيدة ترشد المستخدم حول كيفية التفاعل مع التطبيق اللامركزي (dapp)
- `message` - سلسلة نصية تخزن الرسالة الحالية في العقد الذكي
- `newMessage` - سلسلة نصية تخزن الرسالة الجديدة التي ستتم كتابتها في العقد الذكي

بعد متغيرات الحالة، سترى خمس دوال غير منفذة: `useEffect`، و `addSmartContractListener`، و `addWalletListener`، و `connectWalletPressed`، و `onUpdatePressed`. سنشرح ما تفعله أدناه:

```javascript
// HelloWorld.js

//يُستدعى مرة واحدة فقط
useEffect(async () => {
  //TODO: تنفيذ
}, [])

function addSmartContractListener() {
  //TODO: تنفيذ
}

function addWalletListener() {
  //TODO: تنفيذ
}

const connectWalletPressed = async () => {
  //TODO: تنفيذ
}

const onUpdatePressed = async () => {
  //TODO: تنفيذ
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- هذا خطاف React يتم استدعاؤه بعد تصيير المكون الخاص بك. نظرًا لأنه يحتوي على مصفوفة فارغة `[]` تم تمريرها إليه (انظر السطر 4)، فسيتم استدعاؤه فقط في التصيير _الأول_ للمكون. هنا سنقوم بتحميل الرسالة الحالية المخزنة في عقدنا الذكي، واستدعاء مستمعي العقد الذكي والمحفظة، وتحديث واجهة المستخدم الخاصة بنا لتعكس ما إذا كانت المحفظة متصلة بالفعل.
- `addSmartContractListener`- تقوم هذه الدالة بإعداد مستمع سيراقب حدث `UpdatedMessages` الخاص بعقد HelloWorld وتحديث واجهة المستخدم الخاصة بنا عند تغيير الرسالة في عقدنا الذكي.
- `addWalletListener`- تقوم هذه الدالة بإعداد مستمع يكتشف التغييرات في حالة محفظة ميتاماسك الخاصة بالمستخدم، مثل عندما يقوم المستخدم بقطع اتصال محفظته أو تبديل العناوين.
- `connectWalletPressed`- سيتم استدعاء هذه الدالة لربط محفظة ميتاماسك الخاصة بالمستخدم بتطبيقنا اللامركزي (dapp).
- `onUpdatePressed` - سيتم استدعاء هذه الدالة عندما يريد المستخدم تحديث الرسالة المخزنة في العقد الذكي.

بالقرب من نهاية هذا الملف، لدينا واجهة المستخدم الخاصة بمكوننا.

```javascript
// HelloWorld.js

//واجهة المستخدم للمكون الخاص بنا
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
    </div>
  </div>
)
```

إذا قمت بفحص هذه التعليمات البرمجية بعناية، ستلاحظ أين نستخدم متغيرات الحالة المختلفة في واجهة المستخدم الخاصة بنا:

- في الأسطر 6-12، إذا كانت محفظة المستخدم متصلة (أي `walletAddress.length > 0`)، فإننا نعرض نسخة مقتطعة من `walletAddress` الخاص بالمستخدم في الزر الذي يحمل المعرف "walletButton"؛ وإلا فإنه يقول ببساطة "Connect Wallet".
- في السطر 17، نعرض الرسالة الحالية المخزنة في العقد الذكي، والتي يتم التقاطها في السلسلة النصية `message`.
- في الأسطر 23-26، نستخدم [مكونًا متحكمًا به](https://legacy.reactjs.org/docs/forms.html#controlled-components) لتحديث متغير الحالة `newMessage` الخاص بنا عندما يتغير الإدخال في حقل النص.

بالإضافة إلى متغيرات الحالة الخاصة بنا، سترى أيضًا أنه يتم استدعاء دالتي `connectWalletPressed` و `onUpdatePressed` عند النقر فوق الأزرار التي تحمل المعرفات `publishButton` و `walletButton` على التوالي.

أخيرًا، دعنا نتناول أين تمت إضافة مكون `HelloWorld.js` هذا.

إذا ذهبت إلى ملف `App.js`، وهو المكون الرئيسي في React الذي يعمل كحاوية لجميع المكونات الأخرى، سترى أن مكون `HelloWorld.js` الخاص بنا يتم حقنه في السطر 7.

أخيرًا وليس آخرًا، دعنا نتحقق من ملف آخر تم توفيره لك، وهو ملف `interact.js`.

#### ملف `interact.js` {#the-interact-js-file}

نظرًا لأننا نريد الالتزام بنموذج [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)، سنحتاج إلى ملف منفصل يحتوي على جميع دوالنا لإدارة المنطق والبيانات والقواعد الخاصة بتطبيقنا اللامركزي (dapp)، ثم نتمكن من تصدير تلك الدوال إلى واجهتنا الأمامية (مكون `HelloWorld.js` الخاص بنا).

👆🏽هذا هو الغرض الدقيق لملف `interact.js` الخاص بنا!

انتقل إلى مجلد `util` في دليل `src` الخاص بك، وستلاحظ أننا قمنا بتضمين ملف يسمى `interact.js` والذي سيحتوي على جميع دوال ومتغيرات التفاعل مع العقد الذكي والمحفظة.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

ستلاحظ في الجزء العلوي من الملف أننا قمنا بتعليق كائن `helloWorldContract`. لاحقًا في هذا البرنامج التعليمي، سنقوم بإلغاء تعليق هذا الكائن وإنشاء مثيل لعقدنا الذكي في هذا المتغير، والذي سنقوم بعد ذلك بتصديره إلى مكون `HelloWorld.js` الخاص بنا.

تقوم الدوال الأربع غير المنفذة بعد كائن `helloWorldContract` الخاص بنا بما يلي:

- `loadCurrentMessage` - تتعامل هذه الدالة مع منطق تحميل الرسالة الحالية المخزنة في العقد الذكي. ستقوم بإجراء استدعاء _قراءة_ لعقد Hello World الذكي باستخدام [API الخاص بـ Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - ستقوم هذه الدالة بربط ميتاماسك الخاص بالمستخدم بتطبيقنا اللامركزي (dapp).
- `getCurrentWalletConnected` - ستقوم هذه الدالة بالتحقق مما إذا كان حساب إيثيريوم متصلاً بالفعل بتطبيقنا اللامركزي (dapp) عند تحميل الصفحة وتحديث واجهة المستخدم الخاصة بنا وفقًا لذلك.
- `updateMessage` - ستقوم هذه الدالة بتحديث الرسالة المخزنة في العقد الذكي. ستقوم بإجراء استدعاء _كتابة_ لعقد Hello World الذكي، لذلك سيتعين على محفظة ميتاماسك الخاصة بالمستخدم توقيع معاملة إيثيريوم لتحديث الرسالة.

الآن بعد أن فهمنا ما نعمل عليه، دعنا نكتشف كيفية القراءة من عقدنا الذكي!

### الخطوة 3: القراءة من عقدك الذكي {#step-3-read-from-your-smart-contract}

للقراءة من عقدك الذكي، ستحتاج إلى إعداد ما يلي بنجاح:

- اتصال API بسلسلة إيثيريوم
- مثيل محمل لعقدك الذكي
- دالة لاستدعاء دالة عقدك الذكي
- مستمع لمراقبة التحديثات عندما تتغير البيانات التي تقرأها من العقد الذكي

قد يبدو هذا كالكثير من الخطوات، لكن لا تقلق! سنرشدك خلال كيفية القيام بكل منها خطوة بخطوة! :)

#### إنشاء اتصال API بسلسلة إيثيريوم {#establish-an-api-connection-to-the-ethereum-chain}

هل تتذكر كيف استخدمنا في الجزء الثاني من هذا البرنامج التعليمي [مفتاح Alchemy Web3 الخاص بنا للقراءة من عقدنا الذكي](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)؟ ستحتاج أيضًا إلى مفتاح Alchemy Web3 في تطبيقك اللامركزي (dapp) للقراءة من السلسلة.

إذا لم يكن لديك بالفعل، قم أولاً بتثبيت [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) عن طريق الانتقال إلى الدليل الجذر لـ `starter-files` الخاص بك وتشغيل ما يلي في جهازك الطرفي:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) هو غلاف حول [Web3.js](https://docs.web3js.org/)، يوفر طرق API محسنة وفوائد حاسمة أخرى لجعل حياتك كمطور Web3 أسهل. تم تصميمه ليتطلب الحد الأدنى من التكوين حتى تتمكن من البدء في استخدامه في تطبيقك على الفور!

بعد ذلك، قم بتثبيت حزمة [dotenv](https://www.npmjs.com/package/dotenv) في دليل مشروعك، حتى يكون لدينا مكان آمن لتخزين مفتاح API الخاص بنا بعد جلبه.

```text
npm install dotenv --save
```

بالنسبة لتطبيقنا اللامركزي (dapp)، **سنستخدم مفتاح API الخاص بـ Websockets** بدلاً من مفتاح API الخاص بـ HTTP، حيث سيسمح لنا بإعداد مستمع يكتشف متى تتغير الرسالة المخزنة في العقد الذكي.

بمجرد حصولك على مفتاح API الخاص بك، قم بإنشاء ملف `.env` في دليلك الجذر وأضف عنوان URL الخاص بـ Alchemy Websockets إليه. بعد ذلك، يجب أن يبدو ملف `.env` الخاص بك هكذا:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

الآن، نحن مستعدون لإعداد نقطة نهاية Alchemy Web3 في تطبيقنا اللامركزي (dapp)! دعنا نعود إلى `interact.js` الخاص بنا، والموجود داخل مجلد `util` ونضيف التعليمات البرمجية التالية في الجزء العلوي من الملف:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

أعلاه، قمنا أولاً باستيراد مفتاح Alchemy من ملف `.env` الخاص بنا ثم مررنا `alchemyKey` إلى `createAlchemyWeb3` لإنشاء نقطة نهاية Alchemy Web3 الخاصة بنا.

مع جاهزية نقطة النهاية هذه، حان الوقت لتحميل عقدنا الذكي!

#### تحميل عقد Hello World الذكي الخاص بك {#loading-your-hello-world-smart-contract}

لتحميل عقد Hello World الذكي الخاص بك، ستحتاج إلى عنوان العقد و ABI الخاص به، وكلاهما يمكن العثور عليهما على Etherscan إذا أكملت [الجزء الثالث من هذا البرنامج التعليمي.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### كيفية الحصول على ABI الخاص بعقدك من Etherscan {#how-to-get-your-contract-abi-from-etherscan}

إذا تخطيت الجزء الثالث من هذا البرنامج التعليمي، يمكنك استخدام عقد HelloWorld بالعنوان [<span dir="ltr">0x6f3f635A9762B47954229Ea479b4541eAF402A6A</span>](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). يمكن العثور على ABI الخاص به [هنا](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

يعد ABI الخاص بالعقد ضروريًا لتحديد الدالة التي سيستدعيها العقد بالإضافة إلى ضمان أن الدالة ستعيد البيانات بالتنسيق الذي تتوقعه. بمجرد نسخ ABI الخاص بعقدنا، دعنا نحفظه كملف JSON يسمى `contract-abi.json` في دليل `src` الخاص بك.

يجب تخزين contract-abi.json الخاص بك في مجلد src الخاص بك.

مسلحين بعنوان عقدنا، و ABI، ونقطة نهاية Alchemy Web3، يمكننا استخدام [طريقة العقد](https://docs.web3js.org/api/web3-eth-contract/class/Contract) لتحميل مثيل لعقدنا الذكي. قم باستيراد ABI الخاص بعقدك إلى ملف `interact.js` وأضف عنوان عقدك.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

يمكننا الآن أخيرًا إلغاء تعليق متغير `helloWorldContract` الخاص بنا، وتحميل العقد الذكي باستخدام نقطة نهاية AlchemyWeb3 الخاصة بنا:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

للتلخيص، يجب أن تبدو الأسطر الـ 12 الأولى من `interact.js` الخاص بك الآن هكذا:

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

#### تنفيذ `loadCurrentMessage` في ملف `interact.js` الخاص بك {#implementing-loadcurrentmessage-in-your-interact-js-file}

هذه الدالة بسيطة للغاية. سنقوم بإجراء استدعاء web3 غير متزامن بسيط للقراءة من عقدنا. ستعيد دالتنا الرسالة المخزنة في العقد الذكي:

قم بتحديث `loadCurrentMessage` في ملف `interact.js` الخاص بك إلى ما يلي:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

نظرًا لأننا نريد عرض هذا العقد الذكي في واجهة المستخدم الخاصة بنا، دعنا نحدث دالة `useEffect` في مكون `HelloWorld.js` الخاص بنا إلى ما يلي:

```javascript
// HelloWorld.js

//يُستدعى مرة واحدة فقط
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

ملاحظة، نريد فقط استدعاء `loadCurrentMessage` الخاص بنا مرة واحدة أثناء التصيير الأول للمكون. سنقوم قريبًا بتنفيذ `addSmartContractListener` لتحديث واجهة المستخدم تلقائيًا بعد تغير الرسالة في العقد الذكي.

قبل أن نتعمق في المستمع الخاص بنا، دعنا نتحقق مما لدينا حتى الآن! احفظ ملفي `HelloWorld.js` و `interact.js`، ثم انتقل إلى [<span dir="ltr">http://localhost:3000/</span>](http://localhost:3000/)

ستلاحظ أن الرسالة الحالية لم تعد تقول "لا يوجد اتصال بالشبكة". بدلاً من ذلك، تعكس الرسالة المخزنة في العقد الذكي. رائع!

#### يجب أن تعكس واجهة المستخدم الخاصة بك الآن الرسالة المخزنة في العقد الذكي {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

الآن بالحديث عن ذلك المستمع...

#### تنفيذ `addSmartContractListener` {#implement-addsmartcontractlistener}

إذا تذكرت ملف `HelloWorld.sol` الذي كتبناه في [الجزء الأول من سلسلة البرامج التعليمية هذه](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract)، ستتذكر أن هناك حدث عقد ذكي يسمى `UpdatedMessages` يتم إصداره بعد استدعاء دالة `update` الخاصة بعقدنا الذكي (انظر الأسطر 9 و 27):

```javascript
// HelloWorld.sol

// يحدد إصدار Solidity، باستخدام الإصدارات الدلالية.
// تعلم المزيد: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// يحدد عقد باسم `HelloWorld`.
// العقد هو مجموعة من الدوال والبيانات (حالته). بمجرد نشره، يتواجد العقد في عنوان محدد على سلسلة الكتل لإيثيريوم. تعلم المزيد: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //يُبث عند استدعاء دالة التحديث
   //أحداث العقد الذكي هي طريقة لعقدك للتواصل بأن شيئًا ما قد حدث على سلسلة الكتل إلى الواجهة الأمامية لتطبيقك، والتي يمكن أن تكون 'تستمع' لأحداث معينة وتتخذ إجراءً عند حدوثها.
   event UpdatedMessages(string oldStr, string newStr);

   // يصرح عن متغير حالة `message` من النوع `string`.
   // متغيرات الحالة هي متغيرات تُخزن قيمها بشكل دائم في مساحة تخزين العقد. الكلمة المفتاحية `public` تجعل المتغيرات قابلة للوصول من خارج العقد وتنشئ دالة يمكن للعقود أو العملاء الآخرين استدعاؤها للوصول إلى القيمة.
   string public message;

   // على غرار العديد من اللغات كائنية التوجه القائمة على الفئات، فإن المُنشئ (constructor) هو دالة خاصة تُنفذ فقط عند إنشاء العقد.
   // تُستخدم المُنشئات لتهيئة بيانات العقد. تعلم المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // يقبل وسيطة نصية `initMessage` ويعين القيمة في متغير التخزين `message` الخاص بالعقد).
      message = initMessage;
   }

   // دالة عامة تقبل وسيطة نصية وتُحدث متغير التخزين `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

أحداث العقد الذكي هي طريقة لعقدك للتواصل بأن شيئًا ما قد حدث (أي كان هناك _حدث_) على سلسلة الكتل إلى تطبيق الواجهة الأمامية الخاص بك، والذي يمكن أن يكون "يستمع" لأحداث معينة ويتخذ إجراءً عند حدوثها.

ستستمع دالة `addSmartContractListener` بشكل خاص لحدث `UpdatedMessages` الخاص بعقد Hello World الذكي، وتحدث واجهة المستخدم الخاصة بنا لعرض الرسالة الجديدة.

قم بتعديل `addSmartContractListener` إلى ما يلي:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

دعنا نفصل ما يحدث عندما يكتشف المستمع حدثًا:

- إذا حدث خطأ عند إصدار الحدث، فسينعكس ذلك في واجهة المستخدم عبر متغير الحالة `status` الخاص بنا.
- بخلاف ذلك، سنستخدم كائن `data` المُعاد. `data.returnValues` عبارة عن مصفوفة مفهرسة عند الصفر حيث يخزن العنصر الأول في المصفوفة الرسالة السابقة ويخزن العنصر الثاني الرسالة المحدثة. إجمالاً، عند نجاح الحدث، سنقوم بتعيين السلسلة النصية `message` الخاصة بنا إلى الرسالة المحدثة، ومسح السلسلة النصية `newMessage`، وتحديث متغير الحالة `status` الخاص بنا ليعكس أنه تم نشر رسالة جديدة على عقدنا الذكي.

أخيرًا، دعنا نستدعي المستمع الخاص بنا في دالة `useEffect` الخاصة بنا بحيث يتم تهيئته في التصيير الأول لمكون `HelloWorld.js`. إجمالاً، يجب أن تبدو دالة `useEffect` الخاصة بك هكذا:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

الآن بعد أن أصبحنا قادرين على القراءة من عقدنا الذكي، سيكون من الرائع معرفة كيفية الكتابة إليه أيضًا! ومع ذلك، للكتابة إلى تطبيقنا اللامركزي (dapp)، يجب أن يكون لدينا أولاً محفظة إيثيريوم متصلة به.

لذا، سنتناول بعد ذلك إعداد محفظة إيثيريوم الخاصة بنا (ميتاماسك) ثم ربطها بتطبيقنا اللامركزي (dapp)!

### الخطوة 4: إعداد محفظة إيثيريوم الخاصة بك {#step-4-set-up-your-ethereum-wallet}

لكتابة أي شيء إلى سلسلة إيثيريوم، يجب على المستخدمين توقيع المعاملات باستخدام المفاتيح الخاصة لمحفظتهم الافتراضية. في هذا البرنامج التعليمي، سنستخدم [ميتاماسك](https://metamask.io/)، وهي محفظة افتراضية في المتصفح تُستخدم لإدارة عنوان حساب إيثيريوم الخاص بك، حيث تجعل توقيع المعاملة هذا سهلاً للغاية للمستخدم النهائي.

إذا كنت ترغب في فهم المزيد حول كيفية عمل المعاملات على إيثيريوم، فتحقق من [هذه الصفحة](/developers/docs/transactions/) من مؤسسة إيثيريوم.

#### تنزيل ميتاماسك {#download-metamask}

يمكنك تنزيل وإنشاء حساب ميتاماسك مجانًا [هنا](https://metamask.io/download). عند إنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى "شبكة اختبار غويرلي" في أعلى اليمين (حتى لا نتعامل بأموال حقيقية).

#### إضافة إيثر من صنبور {#add-ether-from-a-faucet}

لتوقيع معاملة على سلسلة كتل إيثيريوم، سنحتاج إلى بعض ETH الوهمي. للحصول على ETH، يمكنك الذهاب إلى [FaucETH](https://fauceth.komputing.org) وإدخال عنوان حساب غويرلي الخاص بك، والنقر على "Request funds" (طلب أموال)، ثم تحديد "Ethereum Testnet Goerli" في القائمة المنسدلة وأخيرًا النقر على زر "Request funds" مرة أخرى. يجب أن ترى ETH في حساب ميتاماسك الخاص بك بعد فترة وجيزة!

#### التحقق من رصيدك {#check-your-balance}

للتحقق مرة أخرى من وجود رصيدنا، دعنا نجري طلب [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) باستخدام [أداة الملحن الخاصة بـ Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). سيعيد هذا مقدار ETH في محفظتنا. بعد إدخال عنوان حساب ميتاماسك الخاص بك والنقر على "Send Request" (إرسال طلب)، يجب أن ترى استجابة كهذه:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ملاحظة:** هذه النتيجة بوحدة wei وليس eth. تُستخدم wei كأصغر فئة من الإيثر. التحويل من wei إلى eth هو: <span dir="ltr">1 eth = 10¹⁸ wei</span>. لذا إذا قمنا بتحويل <span dir="ltr">0xde0b6b3a7640000</span> إلى النظام العشري نحصل على <span dir="ltr">1\*10¹⁸</span> والذي يساوي <span dir="ltr">1 eth</span>.

يا للعجب! أموالنا الوهمية كلها موجودة! 🤑

### الخطوة 5: ربط ميتاماسك بواجهة المستخدم الخاصة بك {#step-5-connect-metamask-to-your-ui}

الآن بعد إعداد محفظة ميتاماسك الخاصة بنا، دعنا نربط تطبيقنا اللامركزي (dapp) بها!

#### دالة `connectWallet` {#the-connectwallet-function}

في ملف `interact.js` الخاص بنا، دعنا ننفذ دالة `connectWallet`، والتي يمكننا بعد ذلك استدعاؤها في مكون `HelloWorld.js` الخاص بنا.

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
        status: "👆🏽 Write a message in the text-field above.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

إذن ماذا تفعل هذه الكتلة العملاقة من التعليمات البرمجية بالضبط؟

حسنًا، أولاً، تتحقق مما إذا كان `window.ethereum` ممكّنًا في متصفحك.

`window.ethereum` هو API عالمي يتم حقنه بواسطة ميتاماسك وموفري المحافظ الآخرين والذي يسمح لمواقع الويب بطلب حسابات إيثيريوم الخاصة بالمستخدمين. إذا تمت الموافقة عليه، يمكنه قراءة البيانات من سلاسل الكتل التي يتصل بها المستخدم، واقتراح أن يقوم المستخدم بتوقيع الرسائل والمعاملات. تحقق من [مستندات ميتاماسك](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) لمزيد من المعلومات!

إذا كان `window.ethereum` _غير_ موجود، فهذا يعني أن ميتاماسك غير مثبت. ينتج عن هذا إرجاع كائن JSON، حيث يكون `address` المُعاد عبارة عن سلسلة نصية فارغة، وينقل كائن JSX `status` أنه يجب على المستخدم تثبيت ميتاماسك.

الآن إذا كان `window.ethereum` _موجودًا_، فهذا هو الوقت الذي تصبح فيه الأمور مثيرة للاهتمام.

باستخدام حلقة try/catch، سنحاول الاتصال بميتاماسك عن طريق استدعاء [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). سيؤدي استدعاء هذه الدالة إلى فتح ميتاماسك في المتصفح، حيث سيُطلب من المستخدم ربط محفظته بتطبيقك اللامركزي (dapp).

- إذا اختار المستخدم الاتصال، سيعيد `method: "eth_requestAccounts"` مصفوفة تحتوي على جميع عناوين حساب المستخدم التي اتصلت بالتطبيق اللامركزي (dapp). إجمالاً، ستعيد دالة `connectWallet` الخاصة بنا كائن JSON يحتوي على _أول_ `address` في هذه المصفوفة (انظر السطر 9) ورسالة `status` تطالب المستخدم بكتابة رسالة إلى العقد الذكي.
- إذا رفض المستخدم الاتصال، فسيحتوي كائن JSON على سلسلة نصية فارغة لـ `address` المُعاد ورسالة `status` تعكس أن المستخدم رفض الاتصال.

الآن بعد أن كتبنا دالة `connectWallet` هذه، الخطوة التالية هي استدعاؤها في مكون `HelloWorld.js` الخاص بنا.

#### إضافة دالة `connectWallet` إلى مكون واجهة المستخدم `HelloWorld.js` الخاص بك {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

انتقل إلى دالة `connectWalletPressed` في `HelloWorld.js`، وقم بتحديثها إلى ما يلي:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

هل تلاحظ كيف يتم تجريد معظم وظائفنا بعيدًا عن مكون `HelloWorld.js` الخاص بنا من ملف `interact.js`؟ هذا لكي نمتثل لنموذج M-V-C!

في `connectWalletPressed`، نقوم ببساطة بإجراء استدعاء await لدالة `connectWallet` المستوردة الخاصة بنا، وباستخدام استجابتها، نقوم بتحديث متغيري `status` و `walletAddress` عبر خطافات الحالة الخاصة بهما.

الآن، دعنا نحفظ كلا الملفين (`HelloWorld.js` و `interact.js`) ونختبر واجهة المستخدم الخاصة بنا حتى الآن.

افتح متصفحك على صفحة [<span dir="ltr">http://localhost:3000/</span>](http://localhost:3000/)، واضغط على زر "Connect Wallet" (ربط المحفظة) في أعلى يمين الصفحة.

إذا كان لديك ميتاماسك مثبتًا، فسيُطلب منك ربط محفظتك بتطبيقك اللامركزي (dapp). اقبل الدعوة للاتصال.

يجب أن ترى أن زر المحفظة يعكس الآن أن عنوانك متصل! نعم 🔥

بعد ذلك، حاول تحديث الصفحة... هذا غريب. يطالبنا زر المحفظة الخاص بنا بربط ميتاماسك، على الرغم من أنه متصل بالفعل...

ومع ذلك، لا تخف! يمكننا بسهولة معالجة ذلك من خلال تنفيذ `getCurrentWalletConnected`، والذي سيتحقق مما إذا كان العنوان متصلاً بالفعل بتطبيقنا اللامركزي (dapp) وتحديث واجهة المستخدم الخاصة بنا وفقًا لذلك!

#### دالة `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

قم بتحديث دالة `getCurrentWalletConnected` الخاصة بك في ملف `interact.js` إلى ما يلي:

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
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

هذه التعليمات البرمجية مشابهة _جدًا_ لدالة `connectWallet` التي كتبناها للتو في الخطوة السابقة.

الفرق الرئيسي هو أنه بدلاً من استدعاء طريقة `eth_requestAccounts`، والتي تفتح ميتاماسك للمستخدم لربط محفظته، هنا نستدعي طريقة `eth_accounts`، والتي تعيد ببساطة مصفوفة تحتوي على عناوين ميتاماسك المتصلة حاليًا بتطبيقنا اللامركزي (dapp).

لرؤية هذه الدالة قيد العمل، دعنا نستدعيها في دالة `useEffect` الخاصة بمكون `HelloWorld.js` الخاص بنا:

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

لاحظ، نستخدم استجابة استدعائنا لـ `getCurrentWalletConnected` لتحديث متغيري الحالة `walletAddress` و `status` الخاصين بنا.

الآن بعد أن أضفت هذه التعليمات البرمجية، دعنا نحاول تحديث نافذة المتصفح الخاصة بنا.

رائع! يجب أن يقول الزر أنك متصل، ويعرض معاينة لعنوان محفظتك المتصلة - حتى بعد التحديث!

#### تنفيذ `addWalletListener` {#implement-addwalletlistener}

الخطوة الأخيرة في إعداد محفظة التطبيق اللامركزي (dapp) الخاص بنا هي تنفيذ مستمع المحفظة بحيث يتم تحديث واجهة المستخدم الخاصة بنا عندما تتغير حالة محفظتنا، مثل عندما يقوم المستخدم بقطع الاتصال أو تبديل الحسابات.

في ملف `HelloWorld.js` الخاص بك، قم بتعديل دالة `addWalletListener` الخاصة بك على النحو التالي:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

أراهن أنك لا تحتاج حتى إلى مساعدتنا لفهم ما يجري هنا في هذه المرحلة، ولكن لأغراض الشمولية، دعنا نفصله بسرعة:

- أولاً، تتحقق دالتنا مما إذا كان `window.ethereum` ممكّنًا (أي أن ميتاماسك مثبت).
  - إذا لم يكن كذلك، فإننا ببساطة نعيّن متغير الحالة `status` الخاص بنا إلى سلسلة JSX تطالب المستخدم بتثبيت ميتاماسك.
  - إذا كان ممكّنًا، فإننا نعد المستمع `window.ethereum.on("accountsChanged")` في السطر 3 والذي يستمع لتغييرات الحالة في محفظة ميتاماسك، والتي تشمل عندما يقوم المستخدم بربط حساب إضافي بالتطبيق اللامركزي (dapp)، أو تبديل الحسابات، أو قطع اتصال حساب. إذا كان هناك حساب واحد على الأقل متصلاً، يتم تحديث متغير الحالة `walletAddress` كأول حساب في مصفوفة `accounts` المعادة بواسطة المستمع. بخلاف ذلك، يتم تعيين `walletAddress` كسلسلة نصية فارغة.

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

### الخطوة 6: تنفيذ دالة `updateMessage` {#step-6-implement-the-updatemessage-function}

حسنًا يا رفاق، لقد وصلنا إلى المرحلة الأخيرة! في `updateMessage` من ملف `interact.js` الخاص بك، سنقوم بما يلي:

1. التأكد من أن الرسالة التي نرغب في نشرها في عقدنا الذكي صالحة
2. توقيع معاملتنا باستخدام ميتاماسك
3. استدعاء هذه الدالة من مكون الواجهة الأمامية `HelloWorld.js` الخاص بنا

لن يستغرق هذا وقتًا طويلاً؛ دعنا ننهي هذا التطبيق اللامركزي (dapp)!

#### معالجة أخطاء الإدخال {#input-error-handling}

بطبيعة الحال، من المنطقي أن يكون هناك نوع من معالجة أخطاء الإدخال في بداية الدالة.

سنريد أن تعود دالتنا مبكرًا إذا لم يكن هناك امتداد ميتاماسك مثبتًا، أو لم تكن هناك محفظة متصلة (أي أن `address` الممرر عبارة عن سلسلة نصية فارغة)، أو أن `message` عبارة عن سلسلة نصية فارغة. دعنا نضيف معالجة الأخطاء التالية إلى `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

الآن بعد أن أصبح لديها معالجة مناسبة لأخطاء الإدخال، حان الوقت لتوقيع المعاملة عبر ميتاماسك!

#### توقيع معاملتنا {#signing-our-transaction}

إذا كنت مرتاحًا بالفعل مع معاملات إيثيريوم Web3 التقليدية، فستكون التعليمات البرمجية التي سنكتبها بعد ذلك مألوفة جدًا. أسفل التعليمات البرمجية لمعالجة أخطاء الإدخال، أضف ما يلي إلى `updateMessage`:

```javascript
// interact.js

//إعداد معلمات المعاملة
const transactionParameters = {
  to: contractAddress, // مطلوب باستثناء أثناء عمليات نشر العقد.
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
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

دعنا نفصل ما يحدث. أولاً، نقوم بإعداد معلمات معاملاتنا، حيث:

- يحدد `to` عنوان المستلم (عقدنا الذكي)
- يحدد `from` موقع المعاملة، وهو متغير `address` الذي مررناه إلى دالتنا
- يحتوي `data` على استدعاء لطريقة `update` الخاصة بعقد Hello World الذكي، ويتلقى متغير السلسلة النصية `message` الخاص بنا كإدخال

بعد ذلك، نقوم بإجراء استدعاء await، `window.ethereum.request`، حيث نطلب من ميتاماسك توقيع المعاملة. لاحظ، في الأسطر 11 و 12، أننا نحدد طريقة eth الخاصة بنا، `eth_sendTransaction` ونمرر `transactionParameters` الخاص بنا.

في هذه المرحلة، سيتم فتح ميتاماسك في المتصفح، ويطالب المستخدم بتوقيع المعاملة أو رفضها.

- إذا نجحت المعاملة، ستعيد الدالة كائن JSON حيث تطالب سلسلة JSX `status` المستخدم بالتحقق من Etherscan لمزيد من المعلومات حول معاملته.
- إذا فشلت المعاملة، ستعيد الدالة كائن JSON حيث تنقل السلسلة النصية `status` رسالة الخطأ.

إجمالاً، يجب أن تبدو دالة `updateMessage` الخاصة بنا هكذا:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //معالجة أخطاء الإدخال
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //إعداد معلمات المعاملة
  const transactionParameters = {
    to: contractAddress, // مطلوب باستثناء أثناء عمليات نشر العقد.
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
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
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

أخيرًا وليس آخرًا، نحتاج إلى ربط دالة `updateMessage` الخاصة بنا بمكون `HelloWorld.js` الخاص بنا.

#### ربط `updateMessage` بالواجهة الأمامية `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

يجب أن تقوم دالة `onUpdatePressed` الخاصة بنا بإجراء استدعاء await لدالة `updateMessage` المستوردة وتعديل متغير الحالة `status` ليعكس ما إذا كانت معاملتنا قد نجحت أم فشلت:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

إنها نظيفة وبسيطة للغاية. وخمن ماذا... تطبيقك اللامركزي (dapp) مكتمل!!!

انطلق واختبر زر **Update** (تحديث)!

### اصنع تطبيقك اللامركزي (dapp) المخصص {#make-your-own-custom-dapp}

رائع، لقد وصلت إلى نهاية البرنامج التعليمي! للتلخيص، لقد تعلمت كيفية:

- ربط محفظة ميتاماسك بمشروع تطبيقك اللامركزي (dapp)
- قراءة البيانات من عقدك الذكي باستخدام [API الخاص بـ Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- توقيع معاملات إيثيريوم باستخدام ميتاماسك

الآن أنت مجهز بالكامل لتطبيق المهارات من هذا البرنامج التعليمي لبناء مشروع تطبيقك اللامركزي (dapp) المخصص! كما هو الحال دائمًا، إذا كان لديك أي أسئلة، فلا تتردد في التواصل معنا للحصول على المساعدة في [ديسكورد Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

بمجرد إكمال هذا البرنامج التعليمي، أخبرنا كيف كانت تجربتك أو إذا كان لديك أي ملاحظات عن طريق الإشارة إلينا على تويتر [@alchemyplatform](https://twitter.com/AlchemyPlatform)!