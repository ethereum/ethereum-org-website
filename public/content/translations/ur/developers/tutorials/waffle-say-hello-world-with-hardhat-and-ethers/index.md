---
title: "ہارڈ ہیٹ اور ایتھرس کے ساتھ وافل کا ہیلو ورلڈ ٹیوٹوریل"
description: ہارڈ ہیٹ اور ethers.js کے ساتھ اپنا پہلا وافل پروجیکٹ بنائیں
author: "MiZiet"
tags:
  [
    "waffle",
    "اسمارٹ معاہدات",
    "solidity",
    "testing",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: ur-in
published: 2020-10-16
---

اس [Waffle](https://ethereum-waffle.readthedocs.io) ٹیوٹوریل میں، ہم [hardhat](https://hardhat.org/) اور [ethers.js](https://docs.ethers.io/v5/) کا استعمال کرتے ہوئے ایک سادہ "ہیلو ورلڈ" اسمارٹ کنٹریکٹ پروجیکٹ سیٹ اپ کرنے کا طریقہ سیکھیں گے۔ پھر ہم سیکھیں گے کہ اپنے اسمارٹ کنٹریکٹ میں ایک نئی فنکشنلٹی کیسے شامل کی جائے اور وافل کے ساتھ اس کی جانچ کیسے کی جائے۔

آئیے ایک نیا پروجیکٹ بنا کر شروعات کریں:

```bash
yarn init
```

یا

```bash
npm init
```

اور مطلوبہ پیکیجز انسٹال کریں:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

یا

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

اگلا مرحلہ `npx hardhat` چلا کر ایک نمونہ ہارڈ ہیٹ پروجیکٹ بنانا ہے۔

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.3 👷‍

? What do you want to do? …
❯ Create a sample project
Create an empty hardhat.config.js
Quit
```

`Create a sample project` کو منتخب کریں

ہمارے پروجیکٹ کی ساخت کچھ اس طرح نظر آنی چاہیے:

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

### اب ان میں سے کچھ فائلوں کے بارے میں بات کرتے ہیں: {#now-lets-talk}

- Greeter.sol - ہمارا اسمارٹ کنٹریکٹ جو سولڈیٹی میں لکھا گیا ہے؛

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("Deploying a Greeter with greeting:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

ہمارے اسمارٹ کنٹریکٹ کو تین حصوں میں تقسیم کیا جا سکتا ہے:

1. کنسٹرکٹر - جہاں ہم `greeting` نامی ایک سٹرنگ ٹائپ متغیر کا اعلان کرتے ہیں،
2. فنکشن greet - ایک فنکشن جو کال کیے جانے پر `greeting` واپس کرے گا،
3. فنکشن setGreeting - ایک فنکشن جو ہمیں `greeting` کی قدر کو تبدیل کرنے کی اجازت دیتا ہے۔

- sample-test.js - ہماری ٹیسٹ فائل

```js
describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### اگلا مرحلہ ہمارے کنٹریکٹ کو کمپائل کرنے اور ٹیسٹ چلانے پر مشتمل ہے: {#compiling-and-testing}

وافل ٹیسٹ موچا (ایک ٹیسٹ فریم ورک) کے ساتھ چائی (ایک دعویٰ لائبریری) کا استعمال کرتے ہیں۔ آپ کو بس `npx hardhat test` چلانا ہے اور درج ذیل پیغام کے ظاہر ہونے کا انتظار کرنا ہے۔

```bash
✓ Should return the new greeting once it's changed
```

### اب تک سب کچھ بہت اچھا لگ رہا ہے، آئیے اپنے پروجیکٹ میں کچھ اور پیچیدگی شامل کریں <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

ایسی صورتحال کا تصور کریں جہاں کوئی شخص بطور گریٹنگ ایک خالی سٹرنگ شامل کرتا ہے۔ یہ ایک پرجوش گریٹنگ نہیں ہوگی، ہے نا؟  
آئیے اس بات کو یقینی بنائیں کہ ایسا نہ ہو:

جب کوئی خالی سٹرنگ پاس کرتا ہے تو ہم سولڈیٹی کے `revert` کا استعمال کرنا چاہتے ہیں۔ اچھی بات یہ ہے کہ ہم اس فنکشنلٹی کو وافل کے چائی میچر `to.be.revertedWith()` کے ساتھ آسانی سے ٹیسٹ کر سکتے ہیں۔

```js
it("Should revert when passing an empty string", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Greeting should not be empty"
  )
})
```

ایسا لگتا ہے کہ ہمارا نیا ٹیسٹ پاس نہیں ہوا:

```bash
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    ✓ Should return the new greeting once it's changed (1514ms)
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to ''
    1) Should revert when passing an empty string


  1 passing (2s)
  1 failing
```

آئیے اس فنکشنلٹی کو اپنے اسمارٹ کنٹریکٹ میں نافذ کریں:

```solidity
require(bytes(_greeting).length > 0, "Greeting should not be empty");
```

اب، ہمارا setGreeting فنکشن اس طرح لگتا ہے:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

آئیے دوبارہ ٹیسٹ چلائیں:

```bash
✓ Should return the new greeting once it's changed (1467ms)
✓ Should revert when passing an empty string (276ms)

2 passing (2s)
```

مبارک ہو! آپ نے کر دکھایا :)

### نتیجہ {#conclusion}

ہم نے وافل، ہارڈ ہیٹ اور ethers.js کے ساتھ ایک سادہ پروجیکٹ بنایا۔ ہم نے ایک پروجیکٹ سیٹ اپ کرنے، ایک ٹیسٹ شامل کرنے اور نئی فنکشنلٹی کو نافذ کرنے کا طریقہ سیکھا۔

اپنے اسمارٹ کنٹریکٹس کی جانچ کے لیے مزید بہترین چائی میچرز کے لیے، [آفیشل وافل کے دستاویزات](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html) دیکھیں۔
