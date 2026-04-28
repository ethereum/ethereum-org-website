---
title: "درس وافل التعليمي لـ hello world باستخدام hardhat و ethers"
description: "أنشئ أول مشروع وافل لك باستخدام hardhat و ethers.js"
author: "MiZiet"
tags:
  [
    "waffle",
    "العقود الذكيه ",
    "سوليديتي",
    "الاختبار",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: ar
published: 2020-10-16
---

في هذا الدرس التعليمي لـ [وافل](https://ethereum-waffle.readthedocs.io)، سنتعلم كيفية إعداد مشروع عقد ذكي بسيط من نوع "Hello world"، باستخدام [hardhat](https://hardhat.org/) و[ethers.js](https://docs.ethers.io/v5/). ثم سنتعلم كيفية إضافة وظيفة جديدة إلى عقدنا الذكي وكيفية اختباره باستخدام وافل.

لنبدأ بإنشاء مشروع جديد:

```bash
yarn init
```

أو

```bash
npm init
```

وتثبيت الحزم المطلوبة:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

أو

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

الخطوة التالية هي إنشاء مشروع hardhat نموذجي عن طريق تشغيل `npx hardhat`.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 مرحبًا بك في Hardhat v2.0.3 👷‍

? ماذا تريد أن تفعل؟ …
❯ إنشاء مشروع نموذجي
إنشاء ملف hardhat.config.js فارغ
إنهاء
```

حدد `إنشاء مشروع نموذجي`

يجب أن تبدو بنية مشروعنا بهذا الشكل:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributes
├── .gitignore
├── hardhat.config.js
└── package.json
```

### الآن دعونا نتحدث عن بعض هذه الملفات: {#now-lets-talk}

- Greeter.sol - عقدنا الذكي المكتوب بلغة سوليديتي؛

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("نشر Greeter مع تحية:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("تغيير التحية من '%s' إلى '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

يمكن تقسيم عقدنا الذكي إلى ثلاثة أجزاء:

1. المنشئ (constructor) - حيث نعلن عن متغير من نوع سلسلة نصية (string) يسمى `greeting`،
2. الدالة greet - وهي دالة ستعيد `greeting` عند استدعائها،
3. الدالة setGreeting - وهي دالة تسمح لنا بتغيير قيمة `greeting`.

- sample-test.js - ملف الاختبارات الخاص بنا

```js
describe("Greeter", function () {
  it("يجب أن يعيد التحية الجديدة بمجرد تغييرها", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### تتكون الخطوة التالية من تجميع عقدنا وتشغيل الاختبارات: {#compiling-and-testing}

تستخدم اختبارات وافل إطار عمل Mocha (إطار عمل للاختبار) مع Chai (مكتبة تأكيد). كل ما عليك فعله هو تشغيل `npx hardhat test` والانتظار حتى تظهر الرسالة التالية.

```bash
✓ يجب أن يعيد التحية الجديدة بمجرد تغييرها
```

### كل شيء يبدو رائعًا حتى الآن، دعنا نضيف بعض التعقيد إلى مشروعنا <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

تخيل موقفًا يضيف فيه شخص ما سلسلة فارغة كتحية. لن تكون تحية حارة، أليس كذلك؟  
دعنا نتأكد من أن هذا لا يحدث:

نريد استخدام `revert` من سوليديتي عندما يمرر شخص ما سلسلة فارغة. الشيء الجيد هو أنه يمكننا بسهولة اختبار هذه الوظيفة باستخدام مُطابِق chai الخاص بـ وافل وهو `to.be.revertedWith()`.

```js
it("يجب أن يتم التراجع عند تمرير سلسلة فارغة", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "يجب ألا تكون التحية فارغة"
  )
})
```

يبدو أن اختبارنا الجديد لم ينجح:

```bash
نشر Greeter مع التحية: Hello, world!
تغيير التحية من 'Hello, world!' إلى 'Hola, mundo!'
    ✓ يجب أن يعيد التحية الجديدة بمجرد تغييرها (1514ms)
نشر Greeter مع التحية: Hello, world!
تغيير التحية من 'Hello, world!' إلى ''
    1) يجب أن يتم التراجع عند تمرير سلسلة فارغة


  1 ناجح (2 ثانية)
  1 فاشل
```

دعنا نطبق هذه الوظيفة في عقدنا الذكي:

```solidity
require(bytes(_greeting).length > 0, "يجب ألا تكون التحية فارغة");
```

الآن، تبدو دالة setGreeting الخاصة بنا بهذا الشكل:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "يجب ألا تكون التحية فارغة");
console.log("تغيير التحية من '%s' إلى '%s'", greeting, _greeting);
greeting = _greeting;
}
```

دعنا نجري الاختبارات مرة أخرى:

```bash
✓ يجب أن يعيد التحية الجديدة بمجرد تغييرها (1467ms)
✓ يجب أن يتم التراجع عند تمرير سلسلة فارغة (276ms)

2 ناجحان (2 ثانية)
```

تهانينا! لقد فعلتها :)

### الخلاصة {#conclusion}

لقد أنشأنا مشروعًا بسيطًا باستخدام وافل و هارد هات و ethers.js. لقد تعلمنا كيفية إعداد مشروع وإضافة اختبار وتطبيق وظيفة جديدة.

لمزيد من مُطابِقات chai الرائعة لاختبار عقودك الذكية، تحقق من [وثائق وافل الرسمية](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
