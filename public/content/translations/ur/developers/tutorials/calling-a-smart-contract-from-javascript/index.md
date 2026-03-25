---
title: "جاوا اسکرپٹ سے اسمارٹ کانٹریکٹ کو کال کرنا"
description: "ڈائی (DAI) ٹوکن کی مثال استعمال کرتے ہوئے جاوا اسکرپٹ سے اسمارٹ کانٹریکٹ فنکشن کو کال کرنے کا طریقہ"
author: jdourlens
tags: ["ٹرانزیکشنز", "فرنٹ اینڈ", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: "JS سے کانٹریکٹس کال کریں"
lang: ur
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

اس ٹیوٹوریل میں ہم دیکھیں گے کہ JavaScript سے [اسمارٹ کانٹریکٹ](/developers/docs/smart-contracts/) فنکشن کو کیسے کال کیا جاتا ہے۔ سب سے پہلے اسمارٹ کانٹریکٹ کی اسٹیٹ کو پڑھنا ہے (مثلاً، ERC20 ہولڈر کا بیلنس)، پھر ہم ٹوکن ٹرانسفر کر کے بلاک چین کی اسٹیٹ کو تبدیل کریں گے۔ آپ کو پہلے ہی [بلاک چین کے ساتھ تعامل کے لیے JS ماحول ترتیب دینے](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) سے واقف ہونا چاہیے۔

اس مثال کے لیے ہم DAI ٹوکن کے ساتھ کام کریں گے، ٹیسٹنگ کے مقصد کے لیے ہم ganache-cli کا استعمال کرتے ہوئے بلاک چین کو فورک کریں گے اور ایک ایسے ایڈریس کو ان لاک کریں گے جس میں پہلے سے ہی بہت سارے DAI موجود ہیں:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

کسی اسمارٹ کانٹریکٹ کے ساتھ تعامل کرنے کے لیے ہمیں اس کے ایڈریس اور ABI کی ضرورت ہوگی:

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

اس پروجیکٹ کے لیے ہم نے مکمل ERC20 ABI کو مختصر کر دیا ہے تاکہ صرف `balanceOf` اور `transfer` فنکشن کو رکھا جا سکے لیکن آپ [مکمل ERC20 ABI یہاں](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) تلاش کر سکتے ہیں۔

پھر ہمیں اپنے اسمارٹ کانٹریکٹ کو انسٹینشی ایٹ (instantiate) کرنے کی ضرورت ہے:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

ہم دو ایڈریسز بھی ترتیب دیں گے:

- وہ جو ٹرانسفر وصول کرے گا اور
- وہ جسے ہم نے پہلے ہی ان لاک کر دیا ہے جو اسے بھیجے گا:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

اگلے حصے میں ہم دونوں ایڈریسز کے پاس موجود ٹوکنز کی موجودہ مقدار حاصل کرنے کے لیے `balanceOf` فنکشن کو کال کریں گے۔

## کال: اسمارٹ کانٹریکٹ سے ویلیو پڑھنا {#call-reading-value-from-a-smart-contract}

پہلی مثال ایک "constant" میتھڈ کو کال کرے گی اور کوئی ٹرانزیکشن بھیجے بغیر EVM میں اس کے اسمارٹ کانٹریکٹ میتھڈ کو ایگزیکیوٹ کرے گی۔ اس کے لیے ہم کسی ایڈریس کا ERC20 بیلنس پڑھیں گے۔ [ERC20 ٹوکنز کے بارے میں ہمارا مضمون پڑھیں](/developers/tutorials/understand-the-erc-20-token-smart-contract/)۔

آپ ایک انسٹینشی ایٹڈ اسمارٹ کانٹریکٹ کے میتھڈز تک رسائی حاصل کر سکتے ہیں جس کے لیے آپ نے ABI فراہم کیا ہے، کچھ اس طرح: `yourContract.methods.methodname`۔ `call` فنکشن کا استعمال کر کے آپ کو فنکشن کے ایگزیکیوٹ ہونے کا نتیجہ موصول ہوگا۔

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

یاد رکھیں کہ DAI ERC20 میں ۱۸ ڈیسیملز ہوتے ہیں جس کا مطلب ہے کہ درست مقدار حاصل کرنے کے لیے آپ کو ۱۸ صفر ہٹانے ہوں گے۔ uint256 اسٹرنگز کے طور پر واپس کیے جاتے ہیں کیونکہ JavaScript بڑی عددی ویلیوز کو ہینڈل نہیں کرتا ہے۔ اگر آپ کو یقین نہیں ہے کہ [JS میں بڑے نمبرز سے کیسے نمٹا جائے تو bignumber.js کے بارے میں ہمارا ٹیوٹوریل دیکھیں](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)۔

## سینڈ: اسمارٹ کانٹریکٹ فنکشن کو ٹرانزیکشن بھیجنا {#send-sending-a-transaction-to-a-smart-contract-function}

دوسری مثال کے لیے ہم اپنے دوسرے ایڈریس پر 10 DAI بھیجنے کے لیے DAI اسمارٹ کانٹریکٹ کے ٹرانسفر فنکشن کو کال کریں گے۔ ٹرانسفر فنکشن دو پیرامیٹرز قبول کرتا ہے: وصول کنندہ کا ایڈریس اور ٹرانسفر کیے جانے والے ٹوکن کی مقدار:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

کال فنکشن اس ٹرانزیکشن کا ہیش واپس کرتا ہے جسے بلاک چین میں مائن کیا جائے گا۔ ایتھیریم پر، ٹرانزیکشن ہیشز قابلِ پیشین گوئی ہوتے ہیں - اسی طرح ہم ٹرانزیکشن کے ایگزیکیوٹ ہونے سے پہلے اس کا ہیش حاصل کر سکتے ہیں ([یہاں جانیں کہ ہیشز کا حساب کیسے لگایا جاتا ہے](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction))۔

چونکہ فنکشن صرف ٹرانزیکشن کو بلاک چین پر جمع کراتا ہے، ہم اس وقت تک نتیجہ نہیں دیکھ سکتے جب تک ہمیں یہ معلوم نہ ہو جائے کہ اسے کب مائن کیا گیا ہے اور بلاک چین میں شامل کیا گیا ہے۔ اگلے ٹیوٹوریل میں ہم سیکھیں گے کہ [کسی ٹرانزیکشن کا ہیش جان کر بلاک چین پر اس کے ایگزیکیوٹ ہونے کا انتظار کیسے کیا جائے](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)۔