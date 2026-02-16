---
title: "Waffle لائبریری کے ساتھ سادہ اسمارٹ کنٹریکٹ کی جانچ"
description: "ابتدائی افراد کے لیے ٹیوٹوریل"
author: Ewa Kowalska
tags: [ "اسمارٹ معاہدات", "solidity", "Waffle", "testing" ]
skill: beginner
lang: ur-in
published: 2021-02-26
---

## اس ٹیوٹوریل میں آپ سیکھیں گے کہ کیسے {#in-this-tutorial-youll-learn-how-to}

- والیٹ بیلنس کی تبدیلیوں کی جانچ کریں
- مخصوص دلائل کے ساتھ ایونٹس کے اخراج کی جانچ کریں
- اس بات کی تصدیق کریں کہ ٹرانزیکشن کو واپس کر دیا گیا تھا

## مفروضات {#assumptions}

- آپ ایک نیا JavaScript یا TypeScript پروجیکٹ بنا سکتے ہیں
- آپ کو JavaScript میں ٹیسٹ کا کچھ بنیادی تجربہ ہے
- آپ نے کچھ پیکیج مینیجرز جیسے yarn یا npm کا استعمال کیا ہے
- آپ کو اسمارٹ کنٹریکٹس اور Solidity کا بہت بنیادی علم ہے

## شروعات کرنا {#getting-started}

یہ ٹیوٹوریل yarn کا استعمال کرتے ہوئے ٹیسٹ سیٹ اپ اور رن کا مظاہرہ کرتا ہے، لیکن اگر آپ npm کو ترجیح دیتے ہیں تو کوئی مسئلہ نہیں ہے - میں سرکاری Waffle [ڈاکیومینٹیشن](https://ethereum-waffle.readthedocs.io/en/latest/index.html) کے مناسب حوالے فراہم کروں گا۔

## ڈیپینڈینسیز انسٹال کریں {#install-dependencies}

اپنے پروجیکٹ کی ڈیو ڈیپینڈینسیز میں ethereum-waffle اور typescript ڈیپینڈینسیز کو [شامل کریں](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation)۔

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## مثالی اسمارٹ کنٹریکٹ {#example-smart-contract}

ٹیوٹوریل کے دوران ہم ایک سادہ اسمارٹ کنٹریکٹ کی مثال - EtherSplitter پر کام کریں گے۔ یہ کسی کو کچھ wei بھیجنے اور اسے دو پہلے سے طے شدہ ریسیورز کے درمیان برابر تقسیم کرنے کی اجازت دینے کے علاوہ زیادہ کچھ نہیں کرتا ہے۔
اسپلٹ فنکشن کے لیے wei کی تعداد کا جفت ہونا ضروری ہے، ورنہ یہ واپس ہو جائے گا۔ دونوں ریسیورز کے لیے یہ ایک wei ٹرانسفر کرتا ہے جس کے بعد Transfer ایونٹ کا اخراج ہوتا ہے۔

EtherSplitter کوڈ کے اسنیپٹ کو `src/EtherSplitter.sol` میں رکھیں۔

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'غیر مساوی wei رقم کی اجازت نہیں ہے');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## کنٹریکٹ کو کمپائل کریں {#compile-the-contract}

کنٹریکٹ کو [کمپائل](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) کرنے کے لیے، package.json فائل میں درج ذیل اندراج شامل کریں:

```json
"scripts": {
    "build": "waffle"
  }
```

اگلا، پروجیکٹ روٹ ڈائرکٹری میں Waffle کنفیگریشن فائل - `waffle.json` - بنائیں اور پھر وہاں درج ذیل کنفیگریشن پیسٹ کریں:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

`yarn build` چلائیں۔ نتیجے کے طور پر، `build` ڈائرکٹری JSON فارمیٹ میں EtherSplitter کمپائلڈ کنٹریکٹ کے ساتھ ظاہر ہوگی۔

## ٹیسٹ سیٹ اپ {#test-setup}

Waffle کے ساتھ ٹیسٹنگ کے لیے Chai matchers اور Mocha کا استعمال ضروری ہے، لہذا آپ کو انہیں اپنے پروجیکٹ میں [شامل](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) کرنے کی ضرورت ہے۔ اپنی package.json فائل کو اپ ڈیٹ کریں اور اسکرپٹس حصے میں `test` اندراج شامل کریں:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

اگر آپ اپنے ٹیسٹ [ایگزیکیوٹ](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) کرنا چاہتے ہیں تو صرف `yarn test` چلائیں۔

## جانچ {#testing}

اب `test` ڈائرکٹری بنائیں اور نئی فائل `test\EtherSplitter.test.ts` بنائیں۔
نیچے دیے گئے اسنیپٹ کو کاپی کریں اور اسے ہماری ٹیسٹ فائل میں پیسٹ کریں۔

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether اسپلٹر", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // یہاں ٹیسٹ شامل کریں
})
```

شروع کرنے سے پہلے چند باتیں۔
`MockProvider` بلاک چین کا ایک موک ورژن فراہم کرتا ہے۔ یہ موک والیٹس بھی فراہم کرتا ہے جو EtherSplitter کنٹریکٹ کی جانچ کے لیے ہماری خدمت کریں گے۔ ہم پرووائڈر پر `getWallets()` میتھڈ کو کال کرکے دس والیٹس تک حاصل کرسکتے ہیں۔ مثال میں، ہم تین والیٹس حاصل کرتے ہیں - بھیجنے والے (sender) کے لیے اور دو وصول کنندگان (receivers) کے لیے۔

اگلا، ہم 'splitter' نامی ایک متغیر کا اعلان کرتے ہیں - یہ ہمارا موک EtherSplitter کنٹریکٹ ہے۔ یہ `deployContract` میتھڈ کے ذریعہ ہر ایک ٹیسٹ کے ایگزیکیوشن سے پہلے بنایا جاتا ہے۔ یہ میتھڈ پہلے پیرامیٹر کے طور پر پاس کیے گئے والیٹ (ہمارے معاملے میں بھیجنے والے کا والیٹ) سے ایک کنٹریکٹ کی تعیناتی کی نقل کرتا ہے۔ دوسرا پیرامیٹر ٹیسٹ شدہ کنٹریکٹ کا ABI اور بائٹ کوڈ ہے - ہم وہاں `build` ڈائرکٹری سے کمپائل شدہ EtherSplitter کنٹریکٹ کی json فائل پاس کرتے ہیں۔ تیسرا پیرامیٹر کنٹریکٹ کے کنسٹرکٹر دلائل کے ساتھ ایک ارے ہے، جو ہمارے معاملے میں، دو وصول کنندگان کے ایڈریس ہیں۔

## changeBalances {#changebalances}

سب سے پہلے، ہم یہ چیک کریں گے کہ آیا اسپلٹ میتھڈ واقعی وصول کنندگان کے والیٹس کے بیلنس کو تبدیل کرتا ہے۔ اگر ہم بھیجنے والے کے اکاؤنٹ سے 50 wei کو اسپلٹ کرتے ہیں، تو ہم توقع کریں گے کہ دونوں وصول کنندگان کے بیلنس میں 25 wei کا اضافہ ہوگا۔ ہم Waffle کا `changeBalances` میچر استعمال کریں گے:

```ts
it("اکاؤنٹس بیلنس کو تبدیل کرتا ہے", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

میچر کے پہلے پیرامیٹر کے طور پر، ہم وصول کنندگان کے والیٹس کا ایک ارے پاس کرتے ہیں، اور دوسرے کے طور پر - متعلقہ اکاؤنٹس پر متوقع اضافے کا ایک ارے۔
اگر ہم کسی ایک مخصوص والیٹ کا بیلنس چیک کرنا چاہتے ہیں، تو ہم `changeBalance` میچر بھی استعمال کر سکتے ہیں، جس کے لیے ارے پاس کرنے کی ضرورت نہیں ہے، جیسا کہ نیچے دی گئی مثال میں ہے:

```ts
it("اکاؤنٹ بیلنس کو تبدیل کرتا ہے", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

نوٹ کریں کہ `changeBalance` اور `changeBalances` دونوں صورتوں میں ہم اسپلٹ فنکشن کو کال بیک کے طور پر پاس کرتے ہیں کیونکہ میچر کو کال سے پہلے اور بعد میں بیلنس کی حالت تک رسائی کی ضرورت ہوتی ہے۔

اگلا، ہم جانچیں گے کہ کیا Transfer ایونٹ ہر wei کی منتقلی کے بعد خارج ہوا تھا۔ ہم Waffle سے ایک اور میچر کی طرف رجوع کریں گے:

## Emit {#emit}

```ts
it("پہلے وصول کنندہ کو منتقلی پر ایونٹ خارج کرتا ہے", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("دوسرے وصول کنندہ کو منتقلی پر ایونٹ خارج کرتا ہے", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit` میچر ہمیں یہ چیک کرنے کی اجازت دیتا ہے کہ آیا کسی کنٹریکٹ نے میتھڈ کال کرنے پر کوئی ایونٹ خارج کیا ہے۔ `emit` میچر کے پیرامیٹرز کے طور پر، ہم وہ موک کنٹریکٹ فراہم کرتے ہیں جس کے بارے میں ہم پیش گوئی کرتے ہیں کہ وہ ایونٹ خارج کرے گا، اس ایونٹ کے نام کے ساتھ۔ ہمارے معاملے میں، موک کنٹریکٹ `splitter` ہے اور ایونٹ کا نام - `Transfer` ہے۔ ہم ان دلائل کی درست قدروں کی بھی تصدیق کر سکتے ہیں جن کے ساتھ ایونٹ خارج کیا گیا تھا - ہم `withArgs` میچر کو اتنے ہی دلائل پاس کرتے ہیں، جتنے ہمارے ایونٹ کے اعلان کی توقع ہے۔ EtherSplitter کنٹریکٹ کے معاملے میں، ہم بھیجنے والے اور وصول کنندہ کے ایڈریس کے ساتھ منتقل شدہ wei رقم کو پاس کرتے ہیں۔

## revertedWith {#revertedwith}

آخری مثال کے طور پر، ہم یہ چیک کریں گے کہ آیا wei کی غیر مساوی تعداد کی صورت میں ٹرانزیکشن کو واپس کر دیا گیا تھا۔ ہم `revertedWith` میچر استعمال کریں گے:

```ts
it("جب wei کی رقم غیر مساوی ہو تو واپس کرتا ہے", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "غیر مساوی wei رقم کی اجازت نہیں ہے"
  )
})
```

یہ ٹیسٹ، اگر پاس ہو جاتا ہے، تو ہمیں یقین دلائے گا کہ ٹرانزیکشن واقعی واپس کر دی گئی تھی۔ تاہم، `require` اسٹیٹمنٹ میں ہمارے پاس کیے گئے پیغامات اور `revertedWith` میں ہماری توقع کے پیغام کے درمیان ایک عین مطابق مماثلت بھی ہونی چاہیے۔ اگر ہم EtherSplitter کنٹریکٹ کے کوڈ پر واپس جائیں، تو wei رقم کے لیے `require` اسٹیٹمنٹ میں، ہم یہ پیغام فراہم کرتے ہیں: 'Uneven wei amount not allowed'۔ یہ اس پیغام سے میل کھاتا ہے جس کی ہم اپنے ٹیسٹ میں توقع کرتے ہیں۔ اگر وہ برابر نہ ہوتے تو ٹیسٹ فیل ہو جاتا۔

## مبارک ہو! {#congratulations}

آپ نے Waffle کے ساتھ اسمارٹ کنٹریکٹس کی جانچ کی طرف اپنا پہلا بڑا قدم اٹھایا ہے!
