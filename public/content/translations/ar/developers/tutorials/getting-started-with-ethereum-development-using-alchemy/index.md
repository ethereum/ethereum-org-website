---
title: "البدء في تطوير إيثيريوم"
description: "هذا دليل للمبتدئين للبدء في تطوير إيثيريوم. سنأخذك من إعداد نقطة نهاية ⁦API⁩، إلى إجراء طلب من سطر الأوامر، وصولاً إلى كتابة أول برنامج نصي لـ ⁦Web3⁩! لا يلزم وجود خبرة سابقة في تطوير سلسلة الكتل!"
author: "إيلان هالبرن"
tags: ["JavaScript", "ethers.js", "العقد", "الاستعلام", "Alchemy"]
skill: beginner
breadcrumb: "البدء"
lang: ar
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

هذا دليل للمبتدئين للبدء في تطوير إيثيريوم. في هذا البرنامج التعليمي، سنستخدم [Alchemy](https://www.alchemy.com/)، وهي منصة تطوير سلسلة الكتل الرائدة التي تدعم ملايين المستخدمين من <span dir="ltr">70%</span> من أفضل تطبيقات سلسلة الكتل، بما في ذلك Maker و <span dir="ltr">0x</span> و MyEtherWallet و Dharma و Kyber. ستمنحنا Alchemy إمكانية الوصول إلى نقطة نهاية API على سلسلة إيثيريوم حتى نتمكن من قراءة المعاملات وكتابتها.

سنأخذك من التسجيل في Alchemy إلى كتابة أول برنامج نصي لـ Web3! لا يلزم وجود خبرة سابقة في تطوير سلسلة الكتل!

## 1. التسجيل للحصول على حساب Alchemy مجاني {#sign-up-for-a-free-alchemy-account}

إنشاء حساب في Alchemy أمر سهل، [سجل مجانًا هنا](https://auth.alchemy.com/).

## 2. إنشاء تطبيق Alchemy {#create-an-alchemy-app}

للتواصل مع سلسلة إيثيريوم واستخدام منتجات Alchemy، ستحتاج إلى مفتاح API لمصادقة طلباتك.

يمكنك [إنشاء مفاتيح API من لوحة التحكم](https://dashboard.alchemy.com/). لإنشاء مفتاح جديد، انتقل إلى "Create App" (إنشاء تطبيق) كما هو موضح أدناه:

شكر خاص لـ [_ShapeShift_](https://shapeshift.com/) _لسماحهم لنا بعرض لوحة التحكم الخاصة بهم!_

![Alchemy dashboard](./alchemy-dashboard.png)

املأ التفاصيل ضمن "Create App" (إنشاء تطبيق) للحصول على مفتاحك الجديد. يمكنك أيضًا رؤية التطبيقات التي قمت بإنشائها سابقًا وتلك التي أنشأها فريقك هنا. اسحب المفاتيح الحالية بالنقر فوق "View Key" (عرض المفتاح) لأي تطبيق.

![Create app with Alchemy screenshot](./create-app.png)

يمكنك أيضًا سحب مفاتيح API الحالية عن طريق التمرير فوق "Apps" (التطبيقات) وتحديد أحدها. يمكنك "View Key" (عرض المفتاح) هنا، بالإضافة إلى "Edit App" (تعديل التطبيق) لإدراج نطاقات معينة في القائمة البيضاء، ورؤية العديد من أدوات المطورين، وعرض التحليلات.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. إجراء طلب من سطر الأوامر

تفاعل مع سلسلة كتل إيثيريوم من خلال Alchemy باستخدام JSON-RPC و curl.

بالنسبة للطلبات اليدوية، نوصي بالتفاعل مع `JSON-RPC` عبر طلبات `POST`. ما عليك سوى تمرير ترويسة `Content-Type: application/json` واستعلامك كجسم `POST` مع الحقول التالية:

- `jsonrpc`: إصدار JSON-RPC — حاليًا، الإصدار <span dir="ltr">2.0</span> فقط هو المدعوم.
- `method`: طريقة API الخاصة بـ ETH. [راجع مرجع API.](/developers/docs/apis/json-rpc/)
- `params`: قائمة بالمعلمات لتمريرها إلى الطريقة.
- `id`: مُعرّف طلبك. سيتم إرجاعه بواسطة الاستجابة حتى تتمكن من تتبع الطلب الذي تنتمي إليه الاستجابة.

إليك مثال يمكنك تشغيله من سطر الأوامر لاسترداد سعر الغاز الحالي:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**ملاحظة:** استبدل `https://eth-mainnet.alchemyapi.io/v2/demo` بمفتاح API الخاص بك `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**النتائج:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```
## 4. إعداد عميل Web3 الخاص بك

**إذا كان لديك عميل حالي،** فقم بتغيير عنوان URL لمزود العقدة الحالي إلى عنوان URL الخاص بـ Alchemy مع مفتاح API الخاص بك: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_ملاحظة:_** يجب تشغيل البرامج النصية أدناه في **سياق عقدة (node context)** أو **حفظها في ملف**، وليس تشغيلها من سطر الأوامر. إذا لم يكن لديك Node أو npm مثبتين بالفعل، فاتبع [إرشادات تثبيت Node.js](https://nodejs.org/en/download/).

هناك الكثير من [مكتبات Web3](/developers/docs/apis/javascript/) التي يمكنك دمجها مع Alchemy، ومع ذلك، نوصي باستخدام [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)، وهو بديل جاهز لـ Web3.js، تم إنشاؤه وتكوينه للعمل بسلاسة مع Alchemy. يوفر هذا مزايا متعددة مثل إعادة المحاولة التلقائية ودعم WebSocket القوي.

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
## 5. كتابة أول برنامج نصي لـ Web3!

الآن للبدء في العمل العملي مع القليل من برمجة Web3، سنكتب برنامجًا نصيًا بسيطًا يطبع أحدث رقم كتلة من شبكة إيثيريوم الرئيسية.

**1. إذا لم تكن قد فعلت ذلك بالفعل، فقم بإنشاء دليل مشروع جديد في جهازك الطرفي (terminal) وانتقل إليه باستخدام cd:**

```
mkdir web3-example
cd web3-example
```

**2. قم بتثبيت تبعية Alchemy Web3 (أو أي Web3) في مشروعك إذا لم تكن قد قمت بذلك بالفعل:**

```
npm install @alch/alchemy-web3
```

**3. قم بإنشاء ملف باسم `index.js` وأضف المحتويات التالية:**

> يجب عليك في النهاية استبدال `demo` بمفتاح HTTP API الخاص بـ Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

لست على دراية بالأمور غير المتزامنة (async)؟ تحقق من [منشور Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) هذا.

**4. قم بتشغيله في جهازك الطرفي باستخدام node**

```
node index.js
```

**5. يجب أن ترى الآن أحدث رقم كتلة معروضًا في وحدة التحكم الخاصة بك!**

```
The latest block number is 11043912
```

**رائع! تهانينا! لقد كتبت للتو أول برنامج نصي لـ Web3 باستخدام Alchemy 🎉**

لست متأكدًا مما يجب فعله بعد ذلك؟ جرب نشر أول عقد ذكي لك وابدأ العمل العملي مع بعض برمجة Solidity في [دليل العقد الذكي Hello World](/developers/tutorials/hello-world-smart-contract/) الخاص بنا، أو استمر في استكشاف [مستندات Alchemy](https://www.alchemy.com/docs/) لمزيد من الأمثلة.

_[سجل مع Alchemy مجانًا](https://auth.alchemy.com/)، وتحقق من [وثائقنا](https://www.alchemy.com/docs/)، وللحصول على أحدث الأخبار، تابعنا على [Twitter](https://twitter.com/AlchemyPlatform)_.
