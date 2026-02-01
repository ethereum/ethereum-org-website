---
title: "Waffle: متحرک نقالی اور کانٹریکٹ کالز کی جانچ"
description: متحرک نقالی اور کانٹریکٹ کالز کی جانچ کے استعمال کے لیے ایک اعلی درجے کا Waffle ٹیوٹوریل
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "اسمارٹ معاہدات",
    "solidity",
    "testing",
    "mocking"
  ]
skill: intermediate
lang: ur-in
published: 2020-11-14
---

## یہ ٹیوٹوریل کس بارے میں ہے؟ {#what-is-this-tutorial-about}

اس ٹیوٹوریل میں آپ سیکھیں گے کہ کیسے:

- متحرک نقالی کا استعمال
- اسمارٹ کانٹریکٹس کے درمیان تعاملات کی جانچ کریں

مفروضے:

- آپ پہلے ہی جانتے ہیں کہ `Solidity` میں ایک سادہ اسمارٹ کانٹریکٹ کیسے لکھنا ہے
- آپ `JavaScript` اور `TypeScript` سے واقف ہیں
- آپ نے دوسرے `Waffle` ٹیوٹوریلز کیے ہیں یا اس کے بارے میں کچھ جانتے ہیں

## متحرک نقالی {#dynamic-mocking}

متحرک نقالی کیوں مفید ہے؟ خیر، یہ ہمیں انٹیگریشن ٹیسٹ کے بجائے یونٹ ٹیسٹ لکھنے کی اجازت دیتا ہے۔ اس کا کیا مطلب ہے؟ اس کا مطلب ہے کہ ہمیں اسمارٹ کانٹریکٹس کے انحصار کے بارے میں فکر کرنے کی ضرورت نہیں ہے، اس طرح ہم ان سب کو مکمل تنہائی میں جانچ سکتے ہیں۔ آئیے میں آپ کو دکھاتا ہوں کہ آپ اسے ٹھیک ٹھیک کیسے کر سکتے ہیں۔

### **1.** پروجیکٹ\*\* {#1-project}

شروع کرنے سے پہلے ہمیں ایک سادہ node.js پروجیکٹ تیار کرنے کی ضرورت ہے:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# یا اگر آپ npm استعمال کر رہے ہیں
npm init
```

آئیے ٹائپ اسکرپٹ اور ٹیسٹ ڈیپینڈنسیز - mocha اور chai شامل کرنے کے ساتھ شروع کرتے ہیں:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# یا اگر آپ npm استعمال کر رہے ہیں
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

اب آئیے `Waffle` اور `ethers` شامل کریں:

```bash
yarn add --dev ethereum-waffle ethers
# یا اگر آپ npm استعمال کر رہے ہیں
npm install ethereum-waffle ethers --save-dev
```

آپ کے پروجیکٹ کی ساخت اب اس طرح نظر آنی چاہئے:

```
.
├── contracts
├── package.json
└── test
```

### **2.** اسمارٹ کانٹریکٹ\*\* {#2-smart-contract}

متحرک نقالی شروع کرنے کے لیے، ہمیں انحصار کے ساتھ ایک اسمارٹ کانٹریکٹ کی ضرورت ہے۔ فکر نہ کریں، میں نے آپ کا کام آسان کر دیا ہے!

یہاں `Solidity` میں لکھا گیا ایک سادہ اسمارٹ کانٹریکٹ ہے جس کا واحد مقصد یہ جانچنا ہے کہ کیا ہم امیر ہیں۔ یہ جانچنے کے لیے ERC20 ٹوکن کا استعمال کرتا ہے کہ آیا ہمارے پاس کافی ٹوکن ہیں۔ اسے `./contracts/AmIRichAlready.sol` میں ڈالیں۔

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

چونکہ ہم متحرک نقالی کا استعمال کرنا چاہتے ہیں اس لیے ہمیں پورے ERC20 کی ضرورت نہیں ہے، یہی وجہ ہے کہ ہم صرف ایک فنکشن کے ساتھ IERC20 انٹرفیس کا استعمال کر رہے ہیں۔

اب اس کانٹریکٹ کو بنانے کا وقت ہے! اس کے لیے ہم `Waffle` کا استعمال کریں گے۔ سب سے پہلے، ہم ایک سادہ `waffle.json` کنفگ فائل بنانے جا رہے ہیں جو کمپائلیشن کے اختیارات کی وضاحت کرتی ہے۔

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

اب ہم Waffle کے ساتھ کانٹریکٹ بنانے کے لیے تیار ہیں:

```bash
npx waffle
```

آسان ہے، ہے نا؟ `build/` فولڈر میں کانٹریکٹ اور انٹرفیس سے مطابقت رکھنے والی دو فائلیں ظاہر ہوئیں۔ ہم انہیں بعد میں جانچ کے لیے استعمال کریں گے۔

### **3.** جانچ\*\* {#3-testing}

آئیے اصل جانچ کے لیے `AmIRichAlready.test.ts` نامی ایک فائل بنائیں۔ سب سے پہلے، ہمیں امپورٹس کو سنبھالنا ہوگا۔ ہمیں بعد میں ان کی ضرورت ہوگی:

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

JS ڈیپینڈنسیز کے علاوہ، ہمیں اپنے بنائے ہوئے کانٹریکٹ اور انٹرفیس کو امپورٹ کرنے کی ضرورت ہے:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle جانچ کے لیے `chai` کا استعمال کرتا ہے۔ تاہم، اس کا استعمال کرنے سے پہلے، ہمیں Waffle کے میچرز کو خود chai میں انجیکٹ کرنا ہوگا:

```typescript
use(solidity)
```

ہمیں `beforeEach()` فنکشن کو لاگو کرنے کی ضرورت ہے جو ہر ٹیسٹ سے پہلے کانٹریکٹ کی حالت کو ری سیٹ کرے گا۔ آئیے پہلے سوچیں کہ ہمیں وہاں کیا ضرورت ہے۔ ایک کانٹریکٹ کو تعینات کرنے کے لیے ہمیں دو چیزوں کی ضرورت ہے: ایک والیٹ اور ایک تعینات شدہ ERC20 کانٹریکٹ تاکہ اسے `AmIRichAlready` کانٹریکٹ کے لیے ایک دلیل کے طور پر پاس کیا جا سکے۔

سب سے پہلے ہم ایک والیٹ بناتے ہیں:

```typescript
const [wallet] = new MockProvider().getWallets()
```

پھر ہمیں ایک ERC20 کانٹریکٹ تعینات کرنے کی ضرورت ہے۔ یہاں مشکل حصہ ہے - ہمارے پاس صرف ایک انٹرفیس ہے۔ یہ وہ حصہ ہے جہاں Waffle ہمیں بچانے کے لیے آتا ہے۔ Waffle میں ایک جادوئی `deployMockContract()` فنکشن ہے جو صرف انٹرفیس کے _abi_ کا استعمال کرتے ہوئے ایک کانٹریکٹ بناتا ہے:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

اب والیٹ اور تعینات شدہ ERC20 دونوں کے ساتھ، ہم آگے بڑھ کر `AmIRichAlready` کانٹریکٹ تعینات کر سکتے ہیں:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

ان سب کے ساتھ، ہمارا `beforeEach()` فنکشن ختم ہو گیا ہے۔ اب تک آپ کی `AmIRichAlready.test.ts` فائل اس طرح نظر آنی چاہیے:

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

describe("Am I Rich Already", () => {
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

آئیے `AmIRichAlready` کانٹریکٹ کے لیے پہلا ٹیسٹ لکھیں۔ آپ کے خیال میں ہمارا ٹیسٹ کس بارے میں ہونا چاہئے؟ ہاں، آپ صحیح ہیں! ہمیں یہ جانچنا چاہئے کہ کیا ہم پہلے ہی امیر ہیں :)

لیکن ایک سیکنڈ رکیں۔ ہمارا نقلی کانٹریکٹ کیسے جانے گا کہ کون سی قدریں واپس کرنی ہیں؟ ہم نے `balanceOf()` فنکشن کے لیے کوئی منطق نافذ نہیں کی ہے۔ ایک بار پھر، Waffle یہاں مدد کر سکتا ہے۔ ہمارے نقلی کانٹریکٹ میں اب کچھ نئی فینسی چیزیں ہیں:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

اس علم کے ساتھ ہم آخر کار اپنا پہلا ٹیسٹ لکھ سکتے ہیں:

```typescript
it("اگر والیٹ میں 1000000 سے کم ٹوکن ہوں تو غلط واپس کرتا ہے", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

آئیے اس ٹیسٹ کو حصوں میں تقسیم کرتے ہیں:

1. ہم نے اپنے نقلی ERC20 کانٹریکٹ کو ہمیشہ 999999 ٹوکنز کا بیلنس واپس کرنے کے لیے سیٹ کیا ہے۔
2. جانچیں کہ کیا `contract.check()` طریقہ `false` واپس کرتا ہے۔

ہم اسے چلانے کے لیے تیار ہیں:

![ایک ٹیسٹ پاس ہو رہا ہے](./test-one.png)

تو ٹیسٹ کام کرتا ہے، لیکن... اب بھی بہتری کی گنجائش ہے۔ `balanceOf()` فنکشن ہمیشہ 999999 واپس کرے گا۔ ہم ایک والیٹ کی وضاحت کرکے اسے بہتر بنا سکتے ہیں جس کے لئے فنکشن کو کچھ واپس کرنا چاہئے - بالکل ایک حقیقی کانٹریکٹ کی طرح:

```typescript
it("اگر والیٹ میں 1000001 سے کم ٹوکن ہوں تو غلط واپس کرتا ہے", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

اب تک، ہم نے صرف اس معاملے کی جانچ کی ہے جہاں ہم کافی امیر نہیں ہیں۔ اس کے بجائے آئیے اس کے برعکس جانچتے ہیں:

```typescript
it("اگر والیٹ میں کم از کم 1000001 ٹوکن ہوں تو صحیح واپس کرتا ہے", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

آپ ٹیسٹ چلاتے ہیں...

![دو ٹیسٹ پاس ہو رہے ہیں](test-two.png)

... اور یہ ہو گیا! ہمارا کانٹریکٹ ارادے کے مطابق کام کرتا نظر آتا ہے :)

## کانٹریکٹ کالز کی جانچ {#testing-contract-calls}

آئیے اس کا خلاصہ کریں جو ہم نے اب تک کیا ہے۔ ہم نے اپنے `AmIRichAlready` کانٹریکٹ کی فعالیت کی جانچ کی ہے اور یہ ٹھیک سے کام کرتا نظر آتا ہے۔ اس کا مطلب ہے کہ ہمارا کام ہو گیا، ٹھیک ہے؟ بالکل نہیں! Waffle ہمیں اپنے کانٹریکٹ کو مزید جانچنے کی اجازت دیتا ہے۔ لیکن ٹھیک ٹھیک کیسے؟ خیر، Waffle کے آرسینل میں `calledOnContract()` اور `calledOnContractWith()` میچرز ہیں۔ وہ ہمیں یہ جانچنے کی اجازت دیں گے کہ آیا ہمارے کانٹریکٹ نے ERC20 نقلی کانٹریکٹ کو کال کیا ہے۔ ان میچرز میں سے ایک کے ساتھ ایک بنیادی ٹیسٹ یہ ہے:

```typescript
it("جانچتا ہے کہ کیا کانٹریکٹ نے ERC20 ٹوکن پر balanceOf کو کال کیا ہے", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

ہم مزید آگے جا سکتے ہیں اور اس ٹیسٹ کو دوسرے میچر کے ساتھ بہتر بنا سکتے ہیں جس کے بارے میں میں نے آپ کو بتایا تھا:

```typescript
it("جانچتا ہے کہ کیا کانٹریکٹ نے ERC20 ٹوکن پر مخصوص والیٹ کے ساتھ balanceOf کو کال کیا ہے", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

آئیے جانچتے ہیں کہ کیا ٹیسٹ درست ہیں:

![تین ٹیسٹ پاس ہو رہے ہیں](test-three.png)

بہت اچھا، تمام ٹیسٹ پاس ہو گئے ہیں۔

Waffle کے ساتھ کانٹریکٹ کالز کی جانچ بہت آسان ہے۔ اور یہاں بہترین حصہ ہے۔ یہ میچرز عام اور نقلی دونوں کانٹریکٹس کے ساتھ کام کرتے ہیں! یہ اس لیے ہے کہ Waffle کوڈ انجیکٹ کرنے کے بجائے EVM کالز کو ریکارڈ اور فلٹر کرتا ہے، جیسا کہ دیگر ٹیکنالوجیز کے لیے مقبول ٹیسٹنگ لائبریریوں کا معاملہ ہے۔

## اختتامی لکیر {#the-finish-line}

مبارک ہو! اب آپ جانتے ہیں کہ کانٹریکٹ کالز کی جانچ کرنے اور کانٹریکٹس کو متحرک طور پر نقل کرنے کے لیے Waffle کا استعمال کیسے کرنا ہے۔ دریافت کرنے کے لیے اور بھی بہت سی دلچسپ خصوصیات ہیں۔ میں Waffle کی دستاویزات میں گہرائی سے جانے کی تجویز کرتا ہوں۔

Waffle کی دستاویزات [یہاں](https://ethereum-waffle.readthedocs.io/) دستیاب ہے۔

اس ٹیوٹوریل کا سورس کوڈ [یہاں](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls) پایا جا سکتا ہے۔

ٹیوٹوریلز جن میں آپ کو بھی دلچسپی ہو سکتی ہے:

- [Waffle کے ساتھ اسمارٹ کانٹریکٹس کی جانچ](/developers/tutorials/waffle-test-simple-smart-contract/)
