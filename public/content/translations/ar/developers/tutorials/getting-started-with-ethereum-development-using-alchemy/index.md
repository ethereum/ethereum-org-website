---
title: "بدء استخدام تطوير إيثريوم"
description: "هذا دليل المبتدئين لبدء استخدام تطوير إيثريوم. سنأخذك من تشغيل نقطة نهاية واجهة برمجة تطبيقات، إلى تقديم طلب سطر أوامر، إلى كتابة أول نص برمجي لك على الويب 3! لا تلزم خبرة في تطوير بلوكتشين!"
author: "Elan Halpern"
tags:
  [
    "JavaScript",
    "ethers.js",
    "العُقَد",
    "استفسار",
    "Alchemy"
  ]
skill: beginner
lang: ar
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![شعارات إيثريوم وAlchemy](./ethereum-alchemy.png)

هذا دليل للمبتدئين لبدء تطوير إيثريوم. في هذا الدرس التعليمي، سنستخدم [Alchemy](https://alchemyapi.io/)، وهي منصة تطوير بلوكتشين رائدة تدعم ملايين المستخدمين من 70% من أفضل تطبيقات بلوكتشين، بما في ذلك Maker، و0x، وMyEtherWallet، وDharma، وKyber. سوف تمنحنا Alchemy إمكانية الوصول إلى نقطة نهاية واجهة برمجة تطبيقات على سلسلة إيثريوم حتى نتمكن من قراءة المعاملات وكتابتها.

سنأخذك من التسجيل مع Alchemy إلى كتابة أول نص برمجي لك على الويب 3! لا تلزم خبرة في تطوير بلوكتشين!

## ١. التسجيل للحصول على حساب Alchemy مجاني {#sign-up-for-a-free-alchemy-account}

إنشاء حساب مع Alchemy أمر سهل، [سجّل مجانًا هنا](https://auth.alchemy.com/).

## ٢. إنشاء تطبيق Alchemy {#create-an-alchemy-app}

للتواصل مع سلسلة إيثريوم واستخدام منتجات Alchemy، تحتاج إلى مفتاح واجهة برمجة تطبيقات (API) لمصادقة طلباتك.

يمكنك [إنشاء مفاتيح واجهة برمجة التطبيقات من لوحة المعلومات](https://dashboard.alchemy.com/). لإنشاء مفتاح جديد، انتقل إلى "إنشاء تطبيق" كما هو موضح أدناه:

شكر خاص لـ [_ShapeShift_](https://shapeshift.com/) _لسماحهم لنا بعرض لوحة معلوماتهم!_

![لوحة معلومات Alchemy](./alchemy-dashboard.png)

املأ التفاصيل تحت قسم "إنشاء تطبيق" للحصول على مفتاحك الجديد. يمكنك أيضًا رؤية التطبيقات التي أنشأتها مسبقًا وتلك التي أنشأها فريقك هنا. اسحب المفاتيح الموجودة بالنقر على "عرض المفتاح" لأي تطبيق.

![لقطة شاشة لإنشاء تطبيق باستخدام Alchemy](./create-app.png)

يمكنك أيضًا سحب مفاتيح واجهة برمجة التطبيقات (API) الموجودة عن طريق التمرير فوق "التطبيقات" وتحديد أحدها. يمكنك "عرض المفتاح" هنا، وكذلك "تعديل التطبيق" لإدراج نطاقات معينة في القائمة البيضاء، والاطلاع على العديد من أدوات المطورين، وعرض التحليلات.

![صورة Gif تُظهر لمستخدم كيفية سحب مفاتيح واجهة برمجة التطبيقات](./pull-api-keys.gif)

## 3. تقديم طلب من سطر الأوامر {#make-a-request-from-the-command-line}

تفاعل مع بلوكتشين إيثريوم من خلال Alchemy باستخدام JSON-RPC وcurl.

للطلبات اليدوية، نوصي بالتفاعل مع `JSON-RPC` عبر طلبات `POST`. ببساطة، مرر رأس `Content-Type: application/json` واستعلامك كجزء `POST` الأساسي مع الحقول التالية:

- `jsonrpc`: إصدار JSON-RPC — حاليًا، يتم دعم `2.0` فقط.
- `method`: طريقة واجهة برمجة تطبيقات ETH. [راجع مرجع واجهة برمجة التطبيقات.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: قائمة بالمعلمات التي يجب تمريرها إلى الطريقة.
- `id`: مُعرّف طلبك. سيتم إرجاعها عن طريق الاستجابة حتى تتمكن من تتبع الطلب الذي تنتمي إليه الاستجابة.

فيما يلي مثال يمكنك تشغيله من سطر الأوامر لاسترداد سعر الغاز الحالي:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**ملاحظة:** استبدل [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) بمفتاح واجهة برمجة التطبيقات الخاص بك `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**النتائج:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. إعداد عميل الويب 3 الخاص بك {#set-up-your-web3-client}

**إذا كان لديك عميل حالي،** فغيّر عنوان URL لمزوّد العقدة الحالي إلى عنوان URL الخاص بـ Alchemy مع مفتاح واجهة برمجة التطبيقات الخاص بك: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_ملاحظة:_** يجب تشغيل البرامج النصية أدناه في **سياق عقدة** أو **حفظها في ملف**، وليس تشغيلها من سطر الأوامر. إذا لم يكن لديك Node أو npm مثبتين بالفعل، فراجع [دليل الإعداد السريع لأجهزة Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) هذا.

هناك الكثير من [مكتبات الويب 3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) التي يمكنك دمجها مع Alchemy، ومع ذلك، نوصي باستخدام [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)، وهو بديل مباشر لـ web3.js، تم إنشاؤه وتهيئته للعمل بسلاسة مع Alchemy. يوفر هذا مزايا متعددة مثل عمليات إعادة المحاولة التلقائية ودعم WebSocket القوي.

لتثبيت AlchemyWeb3.js، **انتقل إلى دليل مشروعك** وقم بتشغيل:

**باستخدام Yarn:**

```
yarn add @alch/alchemy-web3
```

**باستخدام NPM:**

```
npm install @alch/alchemy-web3
```

للتفاعل مع البنية التحتية لعقدة Alchemy، قم بالتشغيل في NodeJS أو أضف هذا إلى ملف JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. اكتب أول نص برمجي لك على الويب 3! {#write-your-first-web3-script}

الآن، لنبدأ التطبيق العملي ببعض البرمجة على الويب 3، سنكتب نصًا برمجيًا بسيطًا يطبع رقم أحدث كتلة من شبكة إيثريوم الرئيسية.

\*\*1. **إذا لم تكن قد فعلت ذلك بالفعل، فأنشئ دليل مشروع جديدًا في الطرفية الخاصة بك وانتقل إليه:**

```
mkdir web3-example
cd web3-example
```

\*\*2. **قم بتثبيت تبعية Alchemy web3 (أو أي تبعية للويب 3) في مشروعك إذا لم تكن قد فعلت ذلك بالفعل:**

```
npm install @alch/alchemy-web3
```

\*\*3. **أنشئ ملفًا باسم `index.js` وأضف المحتويات التالية:**

> يجب عليك في النهاية استبدال `demo` بمفتاح واجهة برمجة تطبيقات HTTP الخاص بـ Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("أحدث رقم كتلة هو " + blockNumber)
}
main()
```

غير معتاد على استخدام async؟ اطلع على [منشور Medium هذا](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

\*\*4. **شغّله في الطرفية باستخدام node**

```
node index.js
```

\*\*5. **يجب أن ترى الآن أحدث رقم للكتلة في وحدة التحكم الخاصة بك!**

```
أحدث رقم للكتلة هو 11043912
```

**يا للروعة!** تهانينا! **لقد كتبت للتو أول نص برمجي لك على الويب 3 باستخدام Alchemy 🎉**

لست متأكداً مما يجب فعله بعد ذلك؟ جرّب نشر أول عقد ذكي لك، وتدرّب على بعض برمجة سوليديتي في [دليل عقد Hello World الذكي](https://www.alchemy.com/docs/hello-world-smart-contract)، أو اختبر معلوماتك في لوحة المعلومات باستخدام [تطبيق العرض التوضيحي للوحة المعلومات](https://docs.alchemyapi.io/tutorials/demo-app)!

_[سجّل مع Alchemy مجانًا](https://auth.alchemy.com/)، واطلع على [وثائقنا](https://www.alchemy.com/docs/)، وللحصول على آخر الأخبار، تابعنا على [Twitter](https://twitter.com/AlchemyPlatform)_.
