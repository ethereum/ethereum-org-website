---
title: "JavaScript API لائبریریاں"
description: "JavaScript کلائنٹ لائبریریوں کا ایک تعارف جو آپ کو اپنی ایپلیکیشن سے بلاک چین کے ساتھ تعامل کرنے کی سہولت فراہم کرتی ہیں۔"
lang: ur-in
---

کسی ویب ایپ کو Ethereum بلاک چین کے ساتھ تعامل کرنے کے لیے (یعنی، بلاک چین ڈیٹا پڑھنا اور/یا نیٹ ورک پر لین دین بھیجنا)، اسے ایک Ethereum نوڈ سے جڑنا ضروری ہے۔

اس مقصد کے لیے، ہر Ethereum کلائنٹ [JSON-RPC](/developers/docs/apis/json-rpc/) کی تفصیلات کو نافذ کرتا ہے، لہذا [طریقوں](/developers/docs/apis/json-rpc/#json-rpc-methods) کا ایک یکساں سیٹ موجود ہے جس پر ایپلیکیشنز انحصار کر سکتی ہیں۔

اگر آپ Ethereum نوڈ سے جڑنے کے لیے JavaScript کا استعمال کرنا چاہتے ہیں، تو وینیلا JavaScript کا استعمال ممکن ہے لیکن ایکوسسٹم کے اندر کئی سہولت بخش لائبریریاں موجود ہیں جو اسے بہت آسان بناتی ہیں۔ ان لائبریریوں کے ساتھ، ڈیولپرز JSON-RPC درخواستوں کو شروع کرنے کے لیے بدیہی، ایک لائن والے طریقے لکھ سکتے ہیں (اندرونی طور پر) جو Ethereum کے ساتھ تعامل کرتی ہیں۔

براہ کرم نوٹ کریں کہ [The Merge](/roadmap/merge/) کے بعد سے، Ethereum سافٹ ویئر کے دو جڑے ہوئے ٹکڑے - ایک ایگزیکیوشن کلائنٹ اور ایک کنسینسس کلائنٹ - ایک نوڈ چلانے کے لیے درکار ہیں۔ براہ کرم یقینی بنائیں کہ آپ کے نوڈ میں ایگزیکیوشن اور کنسینسس کلائنٹ دونوں شامل ہیں۔ اگر آپ کا نوڈ آپ کی مقامی مشین پر نہیں ہے (مثال کے طور پر، آپ کا نوڈ AWS انسٹینس پر چل رہا ہے) تو ٹیوٹوریل میں IP پتوں کو اسی کے مطابق اپ ڈیٹ کریں۔ مزید معلومات کے لیے براہ کرم [نوڈ چلانے](/developers/docs/nodes-and-clients/run-a-node/) پر ہمارا صفحہ دیکھیں۔

## شرائط {#prerequisites}

JavaScript کو سمجھنے کے ساتھ ساتھ، [Ethereum اسٹیک](/developers/docs/ethereum-stack/) اور [Ethereum کلائنٹس](/developers/docs/nodes-and-clients/) کو سمجھنا بھی مددگار ثابت ہوسکتا ہے۔

## لائبریری کا استعمال کیوں کریں؟ {#why-use-a-library}

یہ لائبریریاں ایک Ethereum نوڈ کے ساتھ براہ راست تعامل کرنے کی بہت سی پیچیدگیوں کو دور کرتی ہیں۔ وہ یوٹیلیٹی فنکشنز (مثلاً، ETH کو Gwei میں تبدیل کرنا) بھی فراہم کرتی ہیں تاکہ ایک ڈیولپر کے طور پر آپ Ethereum کلائنٹس کی پیچیدگیوں سے نمٹنے میں کم وقت گزار سکیں اور اپنی ایپلیکیشن کی منفرد فعالیت پر زیادہ وقت مرکوز کر سکیں۔

## لائبریری کی خصوصیات {#library-features}

### Ethereum نوڈز سے جڑیں {#connect-to-ethereum-nodes}

پرووائیڈرس کا استعمال کرتے ہوئے، یہ لائبریریاں آپ کو Ethereum سے جڑنے اور اس کا ڈیٹا پڑھنے کی اجازت دیتی ہیں، چاہے وہ JSON-RPC، INFURA، Etherscan، Alchemy یا MetaMask کے ذریعے ہو۔

> **انتباہ:** Web3.js کو 4 مارچ، 2025 کو آرکائیو کر دیا گیا تھا۔ [اعلان پڑھیں](https://blog.chainsafe.io/web3-js-sunset/)۔ نئے پروجیکٹس کے لیے [ethers.js](https://ethers.org) یا [viem](https://viem.sh) جیسی متبادل لائبریریوں کا استعمال کرنے پر غور کریں۔

**Ethers کی مثال**

```js
// ایک BrowserProvider ایک معیاری Web3 پرووائیڈر کو لپیٹتا ہے، جو ہے
// جو MetaMask ہر صفحے میں window.ethereum کے طور پر داخل کرتا ہے
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMask پلگ ان لین دین پر دستخط کرنے کی بھی اجازت دیتا ہے
// ایتھر بھیجنے اور بلاک چین کے اندر اسٹیٹ کو تبدیل کرنے کے لیے ادائیگی کرنے کے لیے۔
// اس کے لیے، ہمیں اکاؤنٹ سائنر کی ضرورت ہے...
const signer = provider.getSigner()
```

**Web3js کی مثال**

```js
var web3 = new Web3("http://localhost:8545")
// یا
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// پرووائیڈر تبدیل کریں
web3.setProvider("ws://localhost:8546")
// یا
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js میں IPC پرووائیڈر کا استعمال
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // میک او ایس پاتھ
// یا
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // میک او ایس پاتھ
// ونڈوز پر پاتھ ہے: "\\\\.\\pipe\\geth.ipc"
// لینکس پر پاتھ ہے: "/users/myuser/.ethereum/geth.ipc"
```

ایک بار سیٹ اپ ہونے کے بعد آپ بلاک چین سے درج ذیل کے لیے استفسار کر سکیں گے:

- بلاک نمبرز
- گیس کا تخمینہ
- اسمارٹ کنٹریکٹ کے ایونٹس
- نیٹ ورک آئی ڈی
- اور مزید...

### والٹ کی فعالیت {#wallet-functionality}

یہ لائبریریاں آپ کو والٹس بنانے، کیز کا انتظام کرنے اور لین دین پر دستخط کرنے کی فعالیت فراہم کرتی ہیں۔

یہاں Ethers کی ایک مثال ہے۔

```js
// ایک یادداشت سے ایک والٹ انسٹینس بنائیں...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...یا ایک پرائیویٹ کی سے
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// درست

// سائنر API کے مطابق ایک پرومس کے طور پر پتہ
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// ایک والٹ کا پتہ ہم وقت سازی سے بھی دستیاب ہے
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// اندرونی کرپٹوگرافک اجزاء
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// والٹ کی یادداشت
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// نوٹ: ایک پرائیویٹ کی سے بنائے گئے والٹ میں
//       یادداشت نہیں ہوتی (ڈیریویشن اسے روکتا ہے)
walletPrivateKey.mnemonic
// null

// ایک پیغام پر دستخط کرنا
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// ایک لین دین پر دستخط کرنا
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// کنیکٹ میتھڈ والٹ کا نیا انسٹینس واپس کرتا ہے
// جو ایک پرووائیڈر سے جڑا ہوا ہے
wallet = walletMnemonic.connect(provider)

// نیٹ ورک سے استفسار کرنا
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ایتھر بھیجنا
wallet.sendTransaction(tx)
```

[مکمل دستاویزات پڑھیں](https://docs.ethers.io/v5/api/signer/#Wallet)

ایک بار سیٹ اپ ہونے کے بعد آپ یہ کر سکیں گے:

- اکاؤنٹس بنانا
- لین دین بھیجنا
- لین دین پر دستخط کرنا
- اور مزید...

### اسمارٹ کنٹریکٹ کے فنکشنز کے ساتھ تعامل کریں {#interact-with-smart-contract-functions}

JavaScript کلائنٹ لائبریریاں آپ کی ایپلیکیشن کو ایک کمپائلڈ کنٹریکٹ کے ایپلیکیشن بائنری انٹرفیس (ABI) کو پڑھ کر اسمارٹ کنٹریکٹ کے فنکشنز کو کال کرنے کی اجازت دیتی ہیں۔

ABI بنیادی طور پر کنٹریکٹ کے فنکشنز کی JSON فارمیٹ میں وضاحت کرتا ہے اور آپ کو اسے ایک عام JavaScript آبجیکٹ کی طرح استعمال کرنے کی اجازت دیتا ہے۔

تو درج ذیل Solidity کنٹریکٹ:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

اس کا نتیجہ درج ذیل JSON ہو گا:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

اس کا مطلب ہے کہ آپ یہ کر سکتے ہیں:

- اسمارٹ کنٹریکٹ کو ایک لین دین بھیجیں اور اس کے میتھڈ پر عمل درآمد کریں
- EVM میں عمل درآمد ہونے پر ایک میتھڈ ایگزیکیوشن میں لگنے والی گیس کا تخمینہ لگانے کے لیے کال کریں
- ایک کنٹریکٹ تعینات کریں
- اور مزید...

### یوٹیلیٹی فنکشنز {#utility-functions}

یوٹیلیٹی فنکشنز آپ کو آسان شارٹ کٹس فراہم کرتے ہیں جو Ethereum کے ساتھ تعمیر کو تھوڑا آسان بنا دیتے ہیں۔

ETH کی قدریں ڈیفالٹ طور پر Wei میں ہوتی ہیں۔ 1 ETH = 1,000,000,000,000,000,000 WEI – اس کا مطلب ہے کہ آپ بہت سارے نمبروں سے نمٹ رہے ہیں! `web3.utils.toWei` آپ کے لیے ایتھر کو Wei میں تبدیل کرتا ہے۔

اور ethers میں یہ اس طرح لگتا ہے:

```js
// ایک اکاؤنٹ کا بیلنس حاصل کریں (پتہ یا ENS نام کے ذریعے)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// اکثر آپ کو صارف کے لیے آؤٹ پٹ کو فارمیٹ کرنے کی ضرورت ہوگی
// جو (wei کے بجائے) ایتھر میں قدریں دیکھنا پسند کرتے ہیں
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js یوٹیلیٹی فنکشنز](https://docs.web3js.org/api/web3-utils)
- [Ethers یوٹیلیٹی فنکشنز](https://docs.ethers.org/v6/api/utils/)

## دستیاب لائبریریاں {#available-libraries}

**Web3.js -** **_Ethereum JavaScript API۔_**

- [دستاویزات](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_JavaScript اور TypeScript میں مکمل Ethereum والٹ کا نفاذ اور یوٹیلیٹیز۔_**

- [Ethers.js ہوم](https://ethers.org/)
- [دستاویزات](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Ethereum اور IPFS ڈیٹا کو انڈیکس کرنے اور GraphQL کا استعمال کرتے ہوئے اس سے استفسار کرنے کا ایک پروٹوکول۔_**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [دستاویزات](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Ethers.js کے ارد گرد ایک ریپر جس میں بہتر APIs ہیں۔_**

- [دستاویزات](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Ethereum کے لیے TypeScript انٹرفیس۔_**

- [دستاویزات](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_بلٹ ان کیشنگ، ہکس، اور ٹیسٹ ماکس کے ساتھ TypeScript میٹا لائبریری۔_**

- [دستاویزات](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## مزید پڑھیں {#further-reading}

_کسی کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحہ میں ترمیم کریں اور اسے شامل کریں!_

## متعلقہ موضوعات {#related-topics}

- [نوڈز اور کلائنٹس](/developers/docs/nodes-and-clients/)
- [ڈیولپمنٹ فریم ورکس](/developers/docs/frameworks/)

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [JavaScript میں Ethereum بلاک چین استعمال کرنے کے لیے Web3js سیٹ اپ کریں](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– آپ کے پروجیکٹ میں web3.js سیٹ اپ کرنے کی ہدایات۔_
- [JavaScript سے ایک اسمارٹ معاہدے کو کال کرنا](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI ٹوکن کا استعمال کرتے ہوئے، دیکھیں کہ JavaScript کا استعمال کرتے ہوئے معاہدے کے فنکشن کو کیسے کال کیا جائے۔_
- [web3 اور Alchemy کا استعمال کرتے ہوئے لین دین بھیجنا](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– بیک اینڈ سے لین دین بھیجنے کے لیے مرحلہ وار واک تھرو۔_
