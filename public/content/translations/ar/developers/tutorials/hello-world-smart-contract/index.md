---
title: "عقد Hello World الذكي للمبتدئين"
description: "درس تعليمي تمهيدي حول كتابة ونشر عقد ذكي بسيط على إيثريوم."
author: "elanh"
tags:
  [
    "الصلابة",
    "hardhat",
    "alchemy",
    "العقود الذكيه ",
    "نشر"
  ]
skill: beginner
lang: ar
published: 2021-03-31
---

إذا كنت جديدًا في تطوير البلوكتشين ولا تعرف من أين تبدأ، أو إذا كنت ترغب فقط في فهم كيفية نشر العقود الذكية والتفاعل معها، فهذا الدليل لك. سوف نستعرض عملية إنشاء ونشر عقد ذكي بسيط على شبكة الاختبار Sepolia باستخدام محفظة افتراضية [MetaMask](https://metamask.io/)، و[Solidity](https://docs.soliditylang.org/en/v0.8.0/)، و[Hardhat](https://hardhat.org/)، و[Alchemy](https://www.alchemy.com/eth) (لا تقلق إذا كنت لا تفهم ما يعنيه أي من هذا بعد، فسنشرحه).

في [الجزء الثاني](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) من هذا الدرس التعليمي، سوف نستعرض كيفية التفاعل مع عقدنا الذكي بمجرد نشره هنا، وفي [الجزء الثالث](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) سنتناول كيفية نشره على Etherscan.

إذا كانت لديك أسئلة في أي وقت، فلا تتردد في التواصل معنا في [Alchemy Discord](https://discord.gg/gWuC7zB)!

## الخطوة 1: الاتصال بشبكة إيثريوم {#step-1}

هناك طرق عديدة لتقديم طلبات إلى سلسلة إيثريوم. من أجل البساطة، سنستخدم حسابًا مجانيًا على Alchemy، وهي منصة مطوري بلوكتشين وواجهة برمجة تطبيقات (API) تتيح لنا التواصل مع سلسلة إيثريوم دون الحاجة إلى تشغيل العُقَد الخاصة بنا. تحتوي المنصة أيضًا على أدوات للمطورين للمراقبة والتحليلات التي سنستفيد منها في هذا الدرس التعليمي لفهم ما يحدث تحت الغطاء في عملية نشر عقدنا الذكي. إذا لم يكن لديك حساب Alchemy بالفعل، [يمكنك التسجيل مجانًا هنا](https://dashboard.alchemy.com/signup).

## الخطوة 2: أنشئ تطبيقك (ومفتاح API) {#step-2}

Once you’ve created an Alchemy account, you can generate an API key by creating an app. سيسمح لنا هذا بتقديم طلبات إلى شبكة اختبار Sepolia. إذا لم تكن على دراية بشبكات الاختبار، فتفقد [هذه الصفحة](/developers/docs/networks/).

1. انتقل إلى صفحة "Create new app" في لوحة تحكم Alchemy الخاصة بك عن طريق تحديد "Select an app" في شريط التنقل والنقر على "Create new app".

![إنشاء تطبيق Hello world](./hello-world-create-app.png)

2. قم بتسمية تطبيقك "Hello World"، وقدم وصفًا موجزًا، واختر حالة استخدام، على سبيل المثال، "Infra & Tooling". بعد ذلك، ابحث عن "Ethereum" وحدد الشبكة.

![عرض إنشاء تطبيق hello world](./create-app-view-hello-world.png)

3. انقر على "Next" للمتابعة، ثم "Create app" وهذا كل شيء! يجب أن يظهر تطبيقك في القائمة المنسدلة لشريط التنقل، مع وجود مفتاح API متاح للنسخ.

## الخطوة 3: إنشاء حساب إيثريوم (عنوان) {#step-3}

We need an Ethereum account to send and receive transactions. For this tutorial, we’ll use MetaMask, a virtual wallet in the browser used to manage your Ethereum account address. المزيد عن [المعاملات](/developers/docs/transactions/).

يمكنك تنزيل MetaMask وإنشاء حساب إيثريوم مجانًا [هنا](https://metamask.io/download). عند إنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى شبكة الاختبار "Sepolia" باستخدام القائمة المنسدلة للشبكة (حتى لا نتعامل بأموال حقيقية).

إذا لم تجد Sepolia مدرجة، فانتقل إلى القائمة، ثم Advanced ومرر لأسفل لتبديل "Show test networks" إلى وضع التشغيل. في قائمة اختيار الشبكة، اختر علامة التبويب "Custom" للعثور على قائمة بشبكات الاختبار وحدد "Sepolia".

![مثال على MetaMask sepolia](./metamask-sepolia-example.png)

## الخطوة 4: إضافة إيثر من سبيل {#step-4}

من أجل نشر عقدنا الذكي على شبكة الاختبار، سنحتاج إلى بعض من ETH المزيف. للحصول على Sepolia ETH، يمكنك الانتقال إلى [تفاصيل شبكة Sepolia](/developers/docs/networks/#sepolia) لعرض قائمة بمختلف الأسبلة. إذا لم يعمل أحدها، فجرب آخر حيث يمكن أن ينفد رصيدها أحيانًا. قد يستغرق الأمر بعض الوقت لتلقي ETH المزيف بسبب حركة مرور الشبكة. من المفترض أن ترى ETH في حساب MetaMask الخاص بك بعد ذلك بوقت قصير!

## الخطوة 5: التحقق من رصيدك {#step-5}

للتأكد من وجود رصيدنا، لنجري طلبًا لـ [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) باستخدام [أداة الإنشاء الخاصة بـ Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). This will return the amount of ETH in our wallet. After you input your MetaMask account address and click “Send Request”, you should see a response like this:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **ملاحظة:** هذه النتيجة بوحدة wei وليس ETH. Wei is used as the smallest denomination of ether. التحويل من wei إلى ETH هو: 1 eth = 10<sup>18</sup> wei. لذلك إذا قمنا بتحويل 0x2B5E3AF16B1880000 إلى النظام العشري، فسنحصل على 5\*10¹⁸ وهو ما يعادل 5 ETH.
>
> Phew! أموالنا المزيفة كلها موجودة <Emoji text=":money_mouth_face:" size={1} />.

## الخطوة 6: تهيئة مشروعنا {#step-6}

First, we’ll need to create a folder for our project. Navigate to your command line and type:

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
description: عقد hello world الذكي
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
  "description": "عقد hello world الذكي",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

وافق على package.json ونحن على استعداد للبدء!

## الخطوة 7: تنزيل [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software. It helps developers when building smart contracts and dapps locally before deploying to the live chain.

داخل مشروعنا `hello-world`، قم بتشغيل:

```
npm install --save-dev hardhat
```

راجع هذه الصفحة لمزيد من التفاصيل حول [إرشادات التثبيت](https://hardhat.org/getting-started/#overview).

## الخطوة 8: إنشاء مشروع Hardhat {#step-8}

Inside our project folder run:

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

سيؤدي هذا إلى إنشاء ملف `hardhat.config.js` لنا وهو المكان الذي سنحدد فيه كل إعدادات مشروعنا (في الخطوة 13).

## الخطوة 9: إضافة مجلدات المشروع {#step-9}

للحفاظ على تنظيم مشروعنا، سننشئ مجلدين جديدين. Navigate to the root directory of your project in your command line and type:

```
mkdir contracts
mkdir scripts
```

- `contracts/` هو المكان الذي سنحتفظ فيه بملف كود عقد Hello World الذكي الخاص بنا
- `scripts/` هو المكان الذي سنحتفظ فيه بالبرامج النصية لنشر عقدنا والتفاعل معه

## الخطوة 10: كتابة عقدنا {#step-10}

قد تسأل نفسك، متى سنكتب الكود؟؟ حسنًا، ها نحن ذا، في الخطوة 10.

افتح مشروع hello-world في المحرر المفضل لديك (نحن نحب [VSCode](https://code.visualstudio.com/)). تُكتب العقود الذكية بلغة تسمى Solidity وهي ما سنستخدمه لكتابة عقدنا الذكي HelloWorld.sol.

1. انتقل إلى مجلد "contracts" وأنشئ ملفًا جديدًا باسم HelloWorld.sol
2. يوجد أدناه نموذج لعقد Hello World الذكي من مؤسسة إيثريوم والذي سنستخدمه في هذا الدرس التعليمي. انسخ المحتويات أدناه والصقها في ملف HelloWorld.sol الخاص بك، وتأكد من قراءة التعليقات لفهم ما يفعله هذا العقد:

```solidity
// يحدد إصدار Solidity، باستخدام الإصدار الدلالي.
// اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// يُعرّف عقدًا باسم `HelloWorld`.
// العقد هو مجموعة من الوظائف والبيانات (حالته). بمجرد النشر، يقيم العقد في عنوان محدد على بلوكتشين إيثريوم. اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // يصرح عن متغير حالة `message` من النوع `string`.
   // متغيرات الحالة هي متغيرات يتم تخزين قيمها بشكل دائم في تخزين العقد. الكلمة الأساسية `public` تجعل المتغيرات قابلة للوصول إليها من خارج العقد وتنشئ دالة يمكن للعقود أو العملاء الآخرين استدعاؤها للوصول إلى القيمة.
   string public message;

   // على غرار العديد من اللغات الكائنية التوجه القائمة على الفئات، المُنشئ هو دالة خاصة يتم تنفيذها فقط عند إنشاء العقد.
   // تُستخدم المُنشئات لتهيئة بيانات العقد. اعرف المزيد:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // يقبل وسيطة سلسلة `initMessage` ويضبط القيمة في متغير التخزين `message` الخاص بالعقد).
      message = initMessage;
   }

   // دالة عامة تقبل وسيطة سلسلة وتقوم بتحديث متغير التخزين `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

هذا عقد ذكي بسيط للغاية يخزن رسالة عند الإنشاء ويمكن تحديثه عن طريق استدعاء دالة `update`.

## الخطوة 11: ربط MetaMask و Alchemy بمشروعك {#step-11}

لقد أنشأنا محفظة MetaMask وحساب Alchemy وكتبنا عقدنا الذكي، والآن حان وقت ربط الثلاثة.

Every transaction sent from your virtual wallet requires a signature using your unique private key. To provide our program with this permission, we can safely store our private key (and Alchemy API key) in an environment file.

> لمعرفة المزيد حول إرسال المعاملات، راجع [هذا الدرس التعليمي](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) حول إرسال المعاملات باستخدام web3.

First, install the dotenv package in your project directory:

```
npm install dotenv --save
```

بعد ذلك، قم بإنشاء ملف `.env` في الدليل الجذر لمشروعنا، وأضف مفتاح MetaMask الخاص بك وعنوان URL لواجهة برمجة تطبيقات Alchemy HTTP إليه.

- اتبع [هذه التعليمات](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) لتصدير مفتاحك الخاص
- انظر أدناه للحصول على عنوان URL لـ HTTP Alchemy API

![الحصول على مفتاح alchemy api](./get-alchemy-api-key.png)

نسخ عنوان URL الخاص بـ Alchemy API

يجب أن يبدو ملف `.env` الخاص بك هكذا:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

لربط هذه الأشياء بالكود الخاص بنا، سنشير إلى هذه المتغيرات في ملف `hardhat.config.js` الخاص بنا في الخطوة 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
لا تلتزم بـ <code>.env</code>! يرجى التأكد من عدم مشاركة ملف <code>.env</code> الخاص بك أو كشفه لأي شخص، حيث أنك بذلك تعرض أسرارك للخطر. إذا كنت تستخدم التحكم في الإصدار، فأضف <code>.env</code> إلى ملف <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## الخطوة 12: تثبيت Ethers.js {#step-12-install-ethersjs}

Ethers.js هي مكتبة تسهل التفاعل وتقديم الطلبات إلى إيثريوم عن طريق تغليف [طرق JSON-RPC القياسية](/developers/docs/apis/json-rpc/) بطرق أكثر سهولة في الاستخدام.

يجعل Hardhat من السهل جدًا دمج [الإضافات (Plugins)](https://hardhat.org/plugins/) للحصول على أدوات إضافية ووظائف موسعة. سنستفيد من [ملحق Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) لنشر العقد ([Ethers.js](https://github.com/ethers-io/ethers.js/) لديه بعض طرق نشر العقود النظيفة للغاية).

In your project directory type:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

سنحتاج أيضًا إلى ethers في `hardhat.config.js` الخاص بنا في الخطوة التالية.

## الخطوة 13: تحديث hardhat.config.js {#step-13-update-hardhatconfigjs}

لقد أضفنا العديد من التبعيات والإضافات حتى الآن، والآن نحن بحاجة إلى تحديث `hardhat.config.js` حتى يتعرف مشروعنا عليها جميعًا.

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

To make sure everything is working so far, let’s compile our contract. مهمة `compile` هي إحدى مهام hardhat المضمنة.

From the command line run:

```
npx hardhat compile
```

قد تتلقى تحذيرًا حول `SPDX license identifier not provided in source file`، ولكن لا داعي للقلق بشأن ذلك — نأمل أن يبدو كل شيء آخر على ما يرام! إذا لم يكن الأمر كذلك، يمكنك دائمًا إرسال رسالة في [Alchemy discord](https://discord.gg/u72VCg3).

## الخطوة 15: كتابة برنامج النشر النصي الخاص بنا {#step-15-write-our-deploy-scripts}

Now that our contract is written and our configuration file is good to go, it’s time to write our contract deploy script.

انتقل إلى مجلد `scripts/` وأنشئ ملفًا جديدًا باسم `deploy.js`، مع إضافة المحتويات التالية إليه:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // ابدأ النشر، مع إرجاع وعد يتم حله إلى كائن عقد
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("تم نشر العقد على العنوان:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

يقوم Hardhat بعمل رائع في شرح ما يفعله كل من هذه الأسطر من الكود في [درس العقود التعليمي](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)، وقد اعتمدنا شروحاتهم هنا.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

`ContractFactory` في ethers.js هو تجريد يُستخدم لنشر عقود ذكية جديدة، لذا فإن `HelloWorld` هنا هو مصنع لمثيلات من عقد hello world الخاص بنا. عند استخدام ملحق `hardhat-ethers`، يتم توصيل مثيلات `ContractFactory` و `Contract` بأول موقّع افتراضيًا.

```
const hello_world = await HelloWorld.deploy();
```

استدعاء `deploy()` على `ContractFactory` سيبدأ النشر، ويعيد `Promise` يتم حله إلى `Contract`. This is the object that has a method for each of our smart contract functions.

## الخطوة 16: نشر عقدنا {#step-16-deploy-our-contract}

We’re finally ready to deploy our smart contract! انتقل إلى سطر الأوامر وقم بتشغيل:

```
npx hardhat run scripts/deploy.js --network sepolia
```

You should then see something like:

```
تم نشر العقد على العنوان: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

إذا ذهبنا إلى [Sepolia etherscan](https://sepolia.etherscan.io/) وبحثنا عن عنوان عقدنا، فمن المفترض أن نتمكن من رؤية أنه تم نشره بنجاح. The transaction will look something like this:

![عقد etherscan](./etherscan-contract.png)

يجب أن يتطابق عنوان `From` مع عنوان حساب MetaMask الخاص بك وسيشير عنوان To إلى "Contract Creation" ولكن إذا نقرنا على المعاملة، فسنرى عنوان عقدنا في حقل `To`:

![معاملة etherscan](./etherscan-transaction.png)

تهانينا! لقد نشرت للتو عقدًا ذكيًا على سلسلة إيثريوم 🎉

لفهم ما يحدث "تحت الغطاء"، دعنا ننتقل إلى علامة التبويب "المستكشف" (Explorer) في [لوحة تحكم Alchemy](https://dashboard.alchemyapi.io/explorer). إذا كان لديك العديد من تطبيقات Alchemy، فتأكد من التصفية حسب التطبيق وتحديد “Hello World”.
![مستكشف hello world](./hello-world-explorer.png)

هنا سترى مجموعة من استدعاءات JSON-RPC التي أجراها Hardhat/Ethers تحت الغطاء لنا عندما قمنا باستدعاء دالة `.deploy()`. اثنان من أهم الاستدعاءات التي يجب الإشارة إليها هنا هما [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction)، وهو طلب كتابة عقدنا فعليًا على سلسلة Sepolia، و [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) وهو طلب لقراءة معلومات حول معاملتنا بالنظر إلى التجزئة (هاش) (نمط نموذجي عند
المعاملات). لمعرفة المزيد حول إرسال المعاملات، تحقق من هذا الدرس التعليمي حول [إرسال المعاملات باستخدام Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

هذا كل شيء للجزء الأول من هذا الدرس التعليمي، في الجزء الثاني سوف [نتفاعل فعليًا مع عقدنا الذكي](https://www.alchemy.com/docs/interacting-with-a-smart-contract) عن طريق تحديث رسالتنا الأولية، وفي الجزء الثالث سنقوم [بنشر عقدنا الذكي على Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) حتى يعرف الجميع كيفية التفاعل معه.

**هل تريد معرفة المزيد عن Alchemy؟** تحقق من [موقعنا الإلكتروني](https://www.alchemy.com/eth). هل تريد ألا يفوتك أي تحديث؟ اشترك في نشرتنا الإخبارية [هنا](https://www.alchemy.com/newsletter)! تأكد أيضًا من الانضمام إلى [Discord](https://discord.gg/u72VCg3) الخاص بنا.\*\*.
