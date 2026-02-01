---
title: "JavaScript سے اسمارٹ کنٹریکٹ کال کرنا"
description: "Dai ٹوکن کی مثال کا استعمال کرتے ہوئے JavaScript سے اسمارٹ کنٹریکٹ فنکشن کو کال کرنے کا طریقہ"
author: jdourlens
tags: [ "لین دین", "فرنٹ اینڈ", "JavaScript", "web3.js" ]
skill: beginner
lang: ur-in
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

اس ٹیوٹوریل میں ہم دیکھیں گے کہ JavaScript سے [اسمارٹ کنٹریکٹ](/developers/docs/smart-contracts/) فنکشن کو کیسے کال کیا جائے۔ پہلے اسمارٹ کنٹریکٹ کی اسٹیٹ (state) کو پڑھنا ہے (مثال کے طور پر، ERC20 ہولڈر کا بیلنس)، پھر ہم ٹوکن کی منتقلی کر کے بلاک چین کی اسٹیٹ (state) میں ترمیم کریں گے۔ آپ کو [بلاک چین کے ساتھ تعامل کرنے کے لیے JS ماحول ترتیب دینے](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) سے پہلے ہی واقف ہونا چاہیے۔

اس مثال کے لیے ہم DAI ٹوکن کے ساتھ کھیلیں گے، جانچ کے مقصد کے لیے ہم ganache-cli کا استعمال کرتے ہوئے بلاک چین کو فورک (fork) کریں گے اور ایک ایسے ایڈریس کو غیر مقفل (unlock) کریں گے جس میں پہلے سے ہی بہت زیادہ DAI موجود ہے:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

اسمارٹ کنٹریکٹ کے ساتھ تعامل کرنے کے لیے ہمیں اس کے ایڈریس اور ABI کی ضرورت ہوگی:

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

اس پروجیکٹ کے لیے ہم نے مکمل ERC20 ABI کو صرف `balanceOf` اور `transfer` فنکشنز رکھنے کے لیے مختصر کر دیا ہے لیکن آپ [مکمل ERC20 ABI یہاں](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) تلاش کر سکتے ہیں۔

پھر ہمیں اپنے اسمارٹ کنٹریکٹ کو انسٹنٹی ایٹ (instantiate) کرنے کی ضرورت ہے:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

ہم دو ایڈریس بھی سیٹ اپ کریں گے:

- وہ جو منتقلی وصول کرے گا اور
- وہ جسے ہم نے پہلے ہی غیر مقفل کر دیا ہے جو اسے بھیجے گا:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

اگلے حصے میں ہم `balanceOf` فنکشن کو کال کریں گے تاکہ دونوں ایڈریسز کے پاس موجود ٹوکنز کی موجودہ رقم حاصل کی جا سکے۔

## کال: اسمارٹ کنٹریکٹ سے ویلیو پڑھنا {#call-reading-value-from-a-smart-contract}

پہلی مثال ایک “کانسٹینٹ” (constant) میتھڈ کو کال کرے گی اور بغیر کوئی ٹرانزیکشن بھیجے EVM میں اس کے اسمارٹ کنٹریکٹ میتھڈ کو ایگزیکیوٹ کرے گی۔ اس کے لیے ہم ایک ایڈریس کا ERC20 بیلنس پڑھیں گے۔ [ERC20 ٹوکنز کے بارے میں ہمارا مضمون پڑھیں](/developers/tutorials/understand-the-erc-20-token-smart-contract/)۔

آپ ایک انسٹنٹی ایٹ (instantiated) کیے گئے اسمارٹ کنٹریکٹ میتھڈز تک رسائی حاصل کر سکتے ہیں جن کے لیے آپ نے ABI فراہم کیا ہے، اس طرح: `yourContract.methods.methodname`۔ `call` فنکشن کا استعمال کر کے آپ فنکشن کو ایگزیکیوٹ کرنے کا نتیجہ وصول کریں گے۔

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("ایک خرابی واقع ہوئی ہے", err)
    return
  }
  console.log("بیلنس یہ ہے: ", res)
})
```

یاد رکھیں کہ DAI ERC20 میں 18 ڈیسیمل (decimals) ہوتے ہیں جس کا مطلب ہے کہ آپ کو صحیح رقم حاصل کرنے کے لیے 18 صفر ہٹانے کی ضرورت ہے۔ uint256 کو سٹرنگز کے طور پر واپس کیا جاتا ہے کیونکہ JavaScript بڑی عددی ویلیوز کو ہینڈل نہیں کرتا ہے۔ اگر آپ کو یقین نہیں ہے کہ [JS میں بڑے نمبروں سے کیسے نمٹا جائے تو bignumber.js کے بارے میں ہمارا ٹیوٹوریل دیکھیں](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)۔

## بھیجیں: اسمارٹ کنٹریکٹ فنکشن میں ٹرانزیکشن بھیجنا {#send-sending-a-transaction-to-a-smart-contract-function}

دوسری مثال کے لیے ہم DAI اسمارٹ کنٹریکٹ کے ٹرانسفر فنکشن کو کال کریں گے تاکہ اپنے دوسرے ایڈریس پر 10 DAI بھیج سکیں۔ ٹرانسفر فنکشن دو پیرامیٹرز قبول کرتا ہے: وصول کنندہ کا ایڈریس اور منتقل کیے جانے والے ٹوکن کی رقم:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("ایک خرابی واقع ہوئی ہے", err)
      return
    }
    console.log("ٹرانزیکشن کا ہیش: " + res)
  })
```

کال فنکشن اس ٹرانزیکشن کا ہیش واپس کرتا ہے جسے بلاک چین میں مائن کیا جائے گا۔ Ethereum پر، ٹرانزیکشن ہیشز قابلِ قیاس ہوتے ہیں - اسی طرح ہم ٹرانزیکشن کو ایگزیکیوٹ کرنے سے پہلے اس کا ہیش حاصل کر سکتے ہیں ([یہاں جانیں کہ ہیشز کا حساب کیسے لگایا جاتا ہے](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction))۔

چونکہ فنکشن صرف ٹرانزیکشن کو بلاک چین میں جمع کرتا ہے، اس لیے ہم نتیجہ اس وقت تک نہیں دیکھ سکتے جب تک کہ ہمیں یہ معلوم نہ ہو جائے کہ اسے کب مائن کیا گیا ہے اور بلاک چین میں شامل کیا گیا ہے۔ اگلے ٹیوٹوریل میں ہم سیکھیں گے کہ [بلاک چین پر کسی ٹرانزیکشن کے ہیش کو جان کر اس کے ایگزیکیوٹ ہونے کا انتظار کیسے کیا جائے](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)۔
