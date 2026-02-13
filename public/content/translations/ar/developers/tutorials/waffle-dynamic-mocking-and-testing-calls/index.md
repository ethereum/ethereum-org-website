---
title: "Waffle: المحاكاة الديناميكية واختبار استدعاءات العقود"
description: "تعليمات استخدام Waffle المتقدمة لاستخدام المحاكاة الديناميكية واختبار استدعاءات العقود"
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "العقود الذكيه ",
    "الصلابة",
    "الاختبار",
    "mocking"
  ]
skill: intermediate
lang: ar
published: 2020-11-14
---

## عن ماذا تدور تعليمات الاستخدام هذه؟ {#what-is-this-tutorial-about}

في تعليمات الاستخدام هذه سوف تتعلم كيفية:

- استخدام المحاكاة الديناميكية
- اختبار التفاعلات بين العقود الذكية

الافتراضات:

- تعرف بالفعل كيفية كتابة عقد ذكي بسيط بـ`Solidity`
- لديك معرفة بـ `JavaScript` و `TypeScript`
- أكملت تعليمات استخدام `Waffle` أخرى أو تعرف شيئاً أو اثنين عنه

## المحاكاة الديناميكية {#dynamic-mocking}

لماذا تُعد المحاكاة الديناميكية مفيدة؟ حسنًا، إنها تسمح لنا بكتابة اختبارات الوحدة بدلاً من اختبارات التكامل. ماذا يعني ذلك؟ هذا يعني أننا لا داعي للقلق بشأن تبعيات العقود الذكية، وبالتالي يمكننا اختبارها جميعًا بشكل منفصل تمامًا. دعني أريك كيف يمكنك فعل ذلك بالضبط.

### **1. المشروع** {#1-project}

قبل أن نبدأ، نحتاج إلى إعداد مشروع node.js بسيط:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# أو إذا كنت تستخدم npm
npm init
```

لنبدأ بإضافة تبعيات typescript والاختبار - mocha & chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# أو إذا كنت تستخدم npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

الآن لنضف `Waffle` و `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# أو إذا كنت تستخدم npm
npm install ethereum-waffle ethers --save-dev
```

يجب أن تبدو بنية مشروعك هكذا الآن:

```
.
├── contracts
├── package.json
└── test
```

### **2. العقد الذكي** {#2-smart-contract}

لبدء المحاكاة الديناميكية، نحتاج إلى عقد ذكي مع تبعيات. لا تقلق، لقد جهزت لك كل شيء!

إليك عقد ذكي بسيط مكتوب بلغة `Solidity`، غرضه الوحيد هو التحقق مما إذا كنا أغنياء. يستخدم رمز ERC20 للتحقق مما إذا كان لدينا ما يكفي من الرموز. ضعه في `./contracts/AmIRichAlready.sol`.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

نظرًا لأننا نريد استخدام المحاكاة الديناميكية، فنحن لا نحتاج إلى ERC20 بالكامل، لهذا السبب نستخدم واجهة IERC20 بوظيفة واحدة فقط.

حان الوقت لبناء هذا العقد! لذلك، سنستخدم `Waffle`. أولاً، سنقوم بإنشاء ملف تكوين `waffle.json` بسيط يحدد خيارات التحويل البرمجي.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

نحن الآن جاهزون لبناء العقد باستخدام Waffle:

```bash
npx waffle
```

سهل، أليس كذلك؟ في مجلد `build/`، ظهر ملفان يتوافقان مع العقد والواجهة. سنستخدمها لاحقًا للاختبار.

### **3. الاختبار** {#3-testing}

لنقم بإنشاء ملف يسمى `AmIRichAlready.test.ts` للاختبار الفعلي. أولاً وقبل كل شيء، علينا التعامل مع عمليات الاستيراد. سنحتاج إليها لاحقًا:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

باستثناء تبعيات JS، نحتاج إلى استيراد العقد والواجهة اللذين قمنا ببنائهما:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

يستخدم Waffle `chai` للاختبار. ومع ذلك، قبل أن نتمكن من استخدامه، علينا إدخال أدوات المطابقة الخاصة بـ Waffle في chai نفسه:

```typescript
use(solidity)
```

نحتاج إلى تنفيذ دالة `beforeEach()` التي ستعيد تعيين حالة العقد قبل كل اختبار. لنفكر أولاً فيما نحتاجه هناك. لنشر عقد نحتاج إلى شيئين: محفظة وعقد ERC20 منشور لتمريره كوسيط لعقد `AmIRichAlready`.

أولاً، نقوم بإنشاء محفظة:

```typescript
const [wallet] = new MockProvider().getWallets()
```

ثم نحتاج إلى نشر عقد ERC20. هنا الجزء الصعب - لدينا واجهة فقط. هذا هو الجزء الذي يأتي فيه Waffle لإنقاذنا. لدى Waffle دالة `deployMockContract()` سحرية تنشئ عقدًا باستخدام _abi_ الخاص بالواجهة فقط:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

الآن مع وجود المحفظة و ERC20 المنشور، يمكننا المضي قدمًا ونشر عقد `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

مع كل ذلك، اكتملت دالة `beforeEach()` الخاصة بنا. حتى الآن يجب أن يبدو ملف `AmIRichAlready.test.ts` الخاص بك هكذا:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("هل أنا غني بالفعل", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

لنكتب الاختبار الأول لعقد `AmIRichAlready`. برأيك، عن ماذا يجب أن يكون اختبارنا؟ نعم، أنت على حق! يجب أن نتحقق مما إذا كنا أغنياء بالفعل :)

ولكن انتظر لحظة. كيف سيعرف عقدنا المحاكى ما هي القيم التي يجب إرجاعها؟ لم ننفذ أي منطق لدالة `balanceOf()`. مرة أخرى، يمكن لـ Waffle المساعدة هنا. يحتوي عقدنا المحاكى الآن على بعض الأشياء الجديدة الرائعة:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

بهذه المعرفة يمكننا أخيرًا كتابة اختبارنا الأول:

```typescript
it("ترجع false إذا كانت المحفظة تحتوي على أقل من 1000000 رمز", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

لنقسم هذا الاختبار إلى أجزاء:

1. لقد قمنا بتعيين عقد ERC20 المحاكى الخاص بنا لإرجاع رصيد 999999 رمز دائمًا.
2. تحقق مما إذا كانت طريقة `contract.check()` ترجع `false`.

نحن جاهزون للانطلاق:

![اختبار واحد ناجح](./test-one.png)

إذًا الاختبار يعمل، لكن... لا يزال هناك مجال للتحسين. سترجع دالة `balanceOf()` دائمًا 99999. يمكننا تحسينه عن طريق تحديد محفظة يجب أن ترجع الدالة شيئًا لها - تمامًا مثل العقد الحقيقي:

```typescript
it("ترجع false إذا كانت المحفظة تحتوي على أقل من 1000001 رمز", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

حتى الآن، اختبرنا فقط الحالة التي لا نكون فيها أغنياء بما فيه الكفاية. دعنا نختبر العكس بدلاً من ذلك:

```typescript
it("ترجع true إذا كانت المحفظة تحتوي على 1000001 رمز على الأقل", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

تقوم بتشغيل الاختبارات...

![اختباران ناجحان](test-two.png)

...وها أنت ذا! يبدو أن عقدنا يعمل على النحو المنشود :)

## اختبار استدعاءات العقد {#testing-contract-calls}

دعونا نلخص ما قمنا به حتى الآن. لقد اختبرنا وظائف عقد `AmIRichAlready` الخاص بنا ويبدو أنه يعمل بشكل صحيح. هذا يعني أننا انتهينا، أليس كذلك؟ ليس تماما! يسمح لنا Waffle باختبار عقدنا بشكل أكبر. ولكن كيف بالضبط؟ حسنًا، في ترسانة Waffle توجد أدوات المطابقة `calledOnContract()` و `calledOnContractWith()`. ستسمح لنا بالتحقق مما إذا كان عقدنا قد استدعى عقد ERC20 المحاكى. إليك اختبار أساسي مع أحد أدوات المطابقة هذه:

```typescript
it("يتحقق مما إذا كان العقد قد استدعى balanceOf على رمز ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

يمكننا المضي قدمًا وتحسين هذا الاختبار باستخدام أداة المطابقة الأخرى التي أخبرتك عنها:

```typescript
it("يتحقق مما إذا كان العقد قد استدعى balanceOf مع محفظة معينة على رمز ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

دعنا نتحقق مما إذا كانت الاختبارات صحيحة:

![ثلاثة اختبارات ناجحة](test-three.png)

رائع، كل الاختبارات باللون الأخضر.

اختبار استدعاءات العقود باستخدام Waffle سهل للغاية. وهذا هو الجزء الأفضل. تعمل أدوات المطابقة هذه مع كل من العقود العادية والمحاكاة! ذلك لأن Waffle يسجل ويصفي استدعاءات EVM بدلاً من إدخال النص البرمجي، كما هو الحال في مكتبات الاختبار الشائعة للتقنيات الأخرى.

## خط النهاية {#the-finish-line}

تهانينا! أنت تعرف الآن كيفية استخدام Waffle لاختبار استدعاءات العقود ومحاكاة العقود ديناميكيًا. هناك الكثير من الميزات المثيرة للاهتمام لاكتشافها. أوصي بالاطلاع على توثيق Waffle.

توثيق Waffle متاح [هنا](https://ethereum-waffle.readthedocs.io/).

يمكن العثور على النص البرمجي المصدر لتعليمات الاستخدام هذه [هنا](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

تعليمات استخدام قد تهمك أيضًا:

- [اختبار العقود الذكية باستخدام Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
