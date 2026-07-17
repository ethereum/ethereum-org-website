---
title: "⁦JavaScript⁩ سے سمارٹ کنٹریکٹ کو کال کرنا"
description: "⁦Dai⁩ ٹوکن کی مثال استعمال کرتے ہوئے ⁦JavaScript⁩ سے سمارٹ کنٹریکٹ فنکشن کو کال کرنے کا طریقہ"
author: jdourlens
tags: ["ٹرانزیکشنز", "فرنٹ اینڈ", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: "⁦JS⁩ سے کنٹریکٹس کو کال کریں"
lang: ur
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

اس ٹیوٹوریل میں ہم دیکھیں گے کہ <span dir="ltr">JavaScript</span> سے [سمارٹ کنٹریکٹ](/developers/docs/smart-contracts/) فنکشن کو کیسے کال کیا جائے۔ سب سے پہلے سمارٹ کنٹریکٹ کی حالت کو پڑھنا ہے (مثال کے طور پر، ایک <span dir="ltr">ERC20</span> ہولڈر کا بیلنس)، پھر ہم ٹوکن کی منتقلی کر کے بلاک چین کی حالت کو تبدیل کریں گے۔ آپ کو پہلے ہی [بلاک چین کے ساتھ تعامل کے لیے <span dir="ltr">JS</span> ماحول ترتیب دینے](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) سے واقف ہونا چاہیے۔

اس مثال کے لیے ہم <span dir="ltr">DAI</span> ٹوکن کے ساتھ کام کریں گے، ٹیسٹنگ کے مقصد کے لیے ہم <span dir="ltr">ganache-cli</span> کا استعمال کرتے ہوئے بلاک چین کو فورک کریں گے اور ایک ایسا پتہ ان لاک کریں گے جس میں پہلے سے ہی کافی <span dir="ltr">DAI</span> موجود ہے:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

کسی سمارٹ کنٹریکٹ کے ساتھ تعامل کرنے کے لیے ہمیں اس کا پتہ اور <span dir="ltr">ABI</span> درکار ہوگا:

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

اس پروجیکٹ کے لیے ہم نے مکمل <span dir="ltr">ERC20 ABI</span> کو مختصر کر دیا ہے تاکہ صرف `balanceOf` اور `transfer` فنکشن کو رکھا جا سکے لیکن آپ [مکمل <span dir="ltr">ERC20 ABI</span> یہاں](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) تلاش کر سکتے ہیں۔

پھر ہمیں اپنے سمارٹ کنٹریکٹ کو انسٹینشیٹ (instantiate) کرنے کی ضرورت ہے:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

ہم دو پتے بھی ترتیب دیں گے:

- وہ جو منتقلی وصول کرے گا اور
- وہ جسے ہم نے پہلے ہی ان لاک کر دیا ہے جو اسے بھیجے گا:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

اگلے حصے میں ہم دونوں پتوں کے پاس موجود ٹوکنز کی موجودہ مقدار حاصل کرنے کے لیے `balanceOf` فنکشن کو کال کریں گے۔

## کال: سمارٹ کنٹریکٹ سے ویلیو پڑھنا {#call-reading-value-from-a-smart-contract}

پہلی مثال ایک "constant" طریقہ کار کو کال کرے گی اور کوئی ٹرانزیکشن بھیجے بغیر <span dir="ltr">EVM</span> میں اس کا سمارٹ کنٹریکٹ طریقہ کار نافذ کرے گی۔ اس کے لیے ہم کسی پتے کا <span dir="ltr">ERC20</span> بیلنس پڑھیں گے۔ [<span dir="ltr">ERC20</span> ٹوکنز کے بارے میں ہمارا مضمون پڑھیں](/developers/tutorials/understand-the-erc-20-token-smart-contract/)۔

آپ ایک انسٹینشیٹڈ سمارٹ کنٹریکٹ کے طریقہ کار تک رسائی حاصل کر سکتے ہیں جس کے لیے آپ نے <span dir="ltr">ABI</span> فراہم کیا ہے، کچھ اس طرح: `yourContract.methods.methodname`۔ `call` فنکشن کا استعمال کر کے آپ کو فنکشن کے نفاذ کا نتیجہ موصول ہوگا۔

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

یاد رکھیں کہ <span dir="ltr">DAI ERC20</span> میں <span dir="ltr">18</span> اعشاریہ (decimals) ہوتے ہیں جس کا مطلب ہے کہ درست مقدار حاصل کرنے کے لیے آپ کو <span dir="ltr">18</span> صفر ہٹانے ہوں گے۔ <span dir="ltr">uint256</span> کو سٹرنگز کے طور پر واپس کیا جاتا ہے کیونکہ <span dir="ltr">JavaScript</span> بڑی عددی قدروں کو ہینڈل نہیں کرتا ہے۔ اگر آپ کو یقین نہیں ہے کہ [<span dir="ltr">JS</span> میں بڑے نمبروں سے کیسے نمٹا جائے تو <span dir="ltr">bignumber.js</span> کے بارے میں ہمارا ٹیوٹوریل دیکھیں](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)۔

## بھیجیں: سمارٹ کنٹریکٹ فنکشن کو ٹرانزیکشن بھیجنا {#send-sending-a-transaction-to-a-smart-contract-function}

دوسری مثال کے لیے ہم اپنے دوسرے پتے پر <span dir="ltr">10 DAI</span> بھیجنے کے لیے <span dir="ltr">DAI</span> سمارٹ کنٹریکٹ کے منتقلی (transfer) فنکشن کو کال کریں گے۔ منتقلی کا فنکشن دو پیرامیٹرز قبول کرتا ہے: وصول کنندہ کا پتہ اور منتقل کیے جانے والے ٹوکن کی مقدار:

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

کال فنکشن اس ٹرانزیکشن کا ہیش واپس کرتا ہے جسے بلاک چین میں مائن کیا جائے گا۔ ایتھیریم پر، ٹرانزیکشن ہیشز قابلِ پیشین گوئی ہوتے ہیں - اسی طرح ہم ٹرانزیکشن کے نافذ ہونے سے پہلے اس کا ہیش حاصل کر سکتے ہیں ([یہاں جانیں کہ ہیشز کا حساب کیسے لگایا جاتا ہے](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction))۔

چونکہ فنکشن صرف ٹرانزیکشن کو بلاک چین میں جمع کراتا ہے، ہم اس وقت تک نتیجہ نہیں دیکھ سکتے جب تک ہمیں یہ معلوم نہ ہو جائے کہ اسے کب مائن کیا گیا ہے اور بلاک چین میں شامل کیا گیا ہے۔ اگلے ٹیوٹوریل میں ہم سیکھیں گے کہ [کسی ٹرانزیکشن کا ہیش جان کر بلاک چین پر اس کے نافذ ہونے کا انتظار کیسے کیا جائے](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)۔