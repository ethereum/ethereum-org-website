---
title: "جاوا اسکرپٹ API لائبریریاں"
description: "جاوا اسکرپٹ کلائنٹ لائبریریوں کا تعارف جو آپ کو اپنی ایپلیکیشن سے بلاک چین کے ساتھ تعامل کرنے کی سہولت دیتی ہیں۔"
lang: ur
---

کسی ویب ایپ کو ایتھیریم بلاک چین کے ساتھ تعامل کرنے (یعنی بلاک چین کا ڈیٹا پڑھنے اور/یا نیٹ ورک پر ٹرانزیکشنز بھیجنے) کے لیے، اسے ایک ایتھیریم نوڈ سے منسلک ہونا ضروری ہے۔

اس مقصد کے لیے، ہر ایتھیریم کلائنٹ [JSON-RPC](/developers/docs/apis/json-rpc/) کی تخصیص (specification) کو نافذ کرتا ہے، لہذا [طریقہ کار (methods)](/developers/docs/apis/json-rpc/#json-rpc-methods) کا ایک یکساں مجموعہ موجود ہے جس پر ایپلیکیشنز انحصار کر سکتی ہیں۔

اگر آپ ایتھیریم نوڈ سے منسلک ہونے کے لیے جاوا اسکرپٹ کا استعمال کرنا چاہتے ہیں، تو وینیلا (vanilla) جاوا اسکرپٹ کا استعمال ممکن ہے لیکن ایکو سسٹم میں کئی سہولت بخش لائبریریاں موجود ہیں جو اسے بہت آسان بنا دیتی ہیں۔ ان لائبریریوں کے ساتھ، ڈیولپرز JSON-RPC درخواستوں کو (پس پردہ) شروع کرنے کے لیے بدیہی، ایک سطری طریقہ کار لکھ سکتے ہیں جو ایتھیریم کے ساتھ تعامل کرتے ہیں۔

براہ کرم نوٹ کریں کہ [دی مرج (The Merge)](/roadmap/merge/) کے بعد سے، ایک نوڈ چلانے کے لیے ایتھیریم سافٹ ویئر کے دو منسلک حصوں - ایک ایگزیکیوشن کلائنٹ اور ایک کنسینسس کلائنٹ - کی ضرورت ہوتی ہے۔ براہ کرم یقینی بنائیں کہ آپ کے نوڈ میں ایگزیکیوشن اور کنسینسس کلائنٹ دونوں شامل ہیں۔ اگر آپ کا نوڈ آپ کی مقامی مشین پر نہیں ہے (مثلاً، آپ کا نوڈ AWS انسٹینس پر چل رہا ہے) تو ٹیوٹوریل میں IP ایڈریسز کو اسی کے مطابق اپ ڈیٹ کریں۔ مزید معلومات کے لیے براہ کرم [نوڈ چلانے](/developers/docs/nodes-and-clients/run-a-node/) پر ہمارا صفحہ دیکھیں۔

## پیشگی شرائط {#prerequisites}

جاوا اسکرپٹ کو سمجھنے کے ساتھ ساتھ، [ایتھیریم اسٹیک](/developers/docs/ethereum-stack/) اور [ایتھیریم کلائنٹس](/developers/docs/nodes-and-clients/) کو سمجھنا بھی مددگار ثابت ہو سکتا ہے۔

## لائبریری کا استعمال کیوں کریں؟ {#why-use-a-library}

یہ لائبریریاں براہ راست ایتھیریم نوڈ کے ساتھ تعامل کی زیادہ تر پیچیدگی کو دور کر دیتی ہیں۔ یہ یوٹیلیٹی فنکشنز بھی فراہم کرتی ہیں (مثلاً، ETH کو Gwei میں تبدیل کرنا) تاکہ ایک ڈیولپر کے طور پر آپ ایتھیریم کلائنٹس کی پیچیدگیوں سے نمٹنے میں کم وقت صرف کریں اور اپنی ایپلیکیشن کی منفرد فعالیت پر زیادہ توجہ مرکوز کر سکیں۔

## لائبریری کی خصوصیات {#library-features}

### ایتھیریم نوڈز سے جڑیں {#connect-to-ethereum-nodes}

پرووائیڈرز کا استعمال کرتے ہوئے، یہ لائبریریاں آپ کو ایتھیریم سے جڑنے اور اس کا ڈیٹا پڑھنے کی اجازت دیتی ہیں، چاہے وہ JSON-RPC، INFURA، Etherscan، Alchemy یا MetaMask کے ذریعے ہو۔

> **انتباہ:** Web3.js کو ۴ مارچ ۲۰۲۵ کو آرکائیو کر دیا گیا تھا۔ [اعلان پڑھیں](https://blog.chainsafe.io/web3-js-sunset/)۔ نئے پروجیکٹس کے لیے متبادل لائبریریوں جیسے [ethers.js](https://ethers.org) یا [viem](https://viem.sh) کے استعمال پر غور کریں۔

**Ethers کی مثال**

```js
// ایک BrowserProvider ایک معیاری Web3 پرووائیڈر کو ریپ (wrap) کرتا ہے، جو کہ
// وہ ہے جسے MetaMask ہر صفحے میں window.ethereum کے طور پر انجیکٹ (inject) کرتا ہے
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMask پلگ ان ٹرانزیکشنز کو سائن کرنے کی بھی اجازت دیتا ہے تاکہ
// ایتھر (ether) بھیجا جا سکے اور بلاک چین کے اندر اسٹیٹ (state) تبدیل کرنے کے لیے ادائیگی کی جا سکے۔
// اس کے لیے، ہمیں اکاؤنٹ سائنر (signer) کی ضرورت ہے...
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
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os کا پاتھ
// یا
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os کا پاتھ
// ونڈوز پر پاتھ یہ ہے: "\\\\.\\pipe\\geth.ipc"
// لینکس پر پاتھ یہ ہے: "/users/myuser/.ethereum/geth.ipc"
```

ایک بار سیٹ اپ ہونے کے بعد آپ بلاک چین سے درج ذیل کے لیے استفسار (query) کر سکیں گے:

- بلاک نمبرز
- گیس کے تخمینے
- اسمارٹ کانٹریکٹ ایونٹس
- نیٹ ورک آئی ڈی
- اور مزید...

### والیٹ کی فعالیت {#wallet-functionality}

یہ لائبریریاں آپ کو والیٹس بنانے، کیز (keys) کا نظم کرنے اور ٹرانزیکشنز پر دستخط کرنے کی فعالیت فراہم کرتی ہیں۔

یہاں Ethers کی ایک مثال ہے

```js
// ایک یادداشت (mnemonic) سے والیٹ (wallet) کا انسٹنس (instance) بنائیں...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...یا ایک پرائیویٹ کی (private key) سے
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Signer API کے مطابق ایڈریس ایک Promise کے طور پر
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// ایک والیٹ ایڈریس ہم وقت (synchronously) بھی دستیاب ہوتا ہے
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// اندرونی کرپٹوگرافک (cryptographic) اجزاء
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// والیٹ کا mnemonic (یادداشت)
walletMnemonic.mnemonic
// {
// locale: 'en',
// path: 'm/44\'/60\'/0\'/0/0',
// phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// نوٹ: پرائیویٹ کی (private key) کے ساتھ بنائے گئے والیٹ میں
// کوئی mnemonic نہیں ہوتا (ڈیریویشن اسے روکتی ہے)
walletPrivateKey.mnemonic
// null

// ایک پیغام کو سائن کرنا
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// ایک ٹرانزیکشن کو سائن کرنا
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// connect میتھڈ ایک نیا انسٹنس (instance) لوٹاتا ہے
// جو ایک پرووائیڈر سے منسلک والیٹ کا ہوتا ہے
wallet = walletMnemonic.connect(provider)

// نیٹ ورک سے کیوری (query) کرنا
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ایتھر (ether) بھیجنا
wallet.sendTransaction(tx)
```

[مکمل دستاویزات پڑھیں](https://docs.ethers.io/v5/api/signer/#Wallet)

ایک بار سیٹ اپ ہونے کے بعد آپ اس قابل ہو جائیں گے:

- اکاؤنٹس بنائیں
- ٹرانزیکشنز بھیجیں
- ٹرانزیکشنز پر دستخط کریں
- اور مزید...

### اسمارٹ کانٹریکٹ فنکشنز کے ساتھ تعامل کریں {#interact-with-smart-contract-functions}

جاوا اسکرپٹ کلائنٹ لائبریریاں آپ کی ایپلیکیشن کو مرتب شدہ (compiled) کانٹریکٹ کے ایپلیکیشن بائنری انٹرفیس (ABI) کو پڑھ کر اسمارٹ کانٹریکٹ فنکشنز کو کال کرنے کی اجازت دیتی ہیں۔

ABI بنیادی طور پر JSON فارمیٹ میں کانٹریکٹ کے فنکشنز کی وضاحت کرتا ہے اور آپ کو اسے ایک عام جاوا اسکرپٹ آبجیکٹ کی طرح استعمال کرنے کی اجازت دیتا ہے۔

لہذا درج ذیل Solidity کانٹریکٹ:

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

کا نتیجہ درج ذیل JSON کی صورت میں نکلے گا:

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

اس کا مطلب ہے کہ آپ کر سکتے ہیں:

- اسمارٹ کانٹریکٹ کو ٹرانزیکشن بھیجیں اور اس کا طریقہ کار (method) نافذ کریں
- EVM میں نافذ ہونے پر کسی طریقہ کار کے نفاذ میں لگنے والی گیس کا تخمینہ لگانے کے لیے کال کریں
- کانٹریکٹ ڈیپلائے کریں
- اور مزید...

### یوٹیلیٹی فنکشنز {#utility-functions}

یوٹیلیٹی فنکشنز آپ کو کارآمد شارٹ کٹس دیتے ہیں جو ایتھیریم کے ساتھ تعمیر کو قدرے آسان بناتے ہیں۔

ETH کی قدریں پہلے سے طے شدہ طور پر Wei میں ہوتی ہیں۔ 1 ETH = 1,000,000,000,000,000,000 WEI – اس کا مطلب ہے کہ آپ بہت سارے نمبروں سے نمٹ رہے ہیں! `web3.utils.toWei` آپ کے لیے ایتھر کو Wei میں تبدیل کرتا ہے۔

اور ethers میں یہ اس طرح لگتا ہے:

```js
// کسی اکاؤنٹ کا بیلنس حاصل کریں (ایڈریس یا ENS نام کے ذریعے)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// اکثر آپ کو صارف کے لیے آؤٹ پٹ کو فارمیٹ کرنے کی ضرورت ہوگی
// جو wei کے بجائے ایتھر (ether) میں ویلیوز دیکھنا پسند کرتے ہیں
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js یوٹیلیٹی فنکشنز](https://docs.web3js.org/api/web3-utils)
- [Ethers یوٹیلیٹی فنکشنز](https://docs.ethers.org/v6/api/utils/)

## دستیاب لائبریریاں {#available-libraries}

**Web3.js -** **_ایتھیریم جاوا اسکرپٹ API۔_**

- [دستاویزات](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_جاوا اسکرپٹ اور ٹائپ اسکرپٹ میں مکمل ایتھیریم والیٹ کا نفاذ اور یوٹیلیٹیز۔_**

- [Ethers.js ہوم](https://ethers.org/)
- [دستاویزات](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_ایتھیریم اور IPFS ڈیٹا کو انڈیکس کرنے اور GraphQL کا استعمال کرتے ہوئے اس سے استفسار کرنے کا ایک پروٹوکول۔_**

- [The Graph](https://thegraph.com)
- [Graph ایکسپلورر](https://thegraph.com/explorer)
- [دستاویزات](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_بہتر APIs کے ساتھ Ethers.js کے گرد ریپر (Wrapper)۔_**

- [دستاویزات](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_ایتھیریم کے لیے ٹائپ اسکرپٹ انٹرفیس۔_**

- [دستاویزات](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_درجنوں چینز پر ریئل ٹائم، افزودہ بلاک چین ڈیٹا API۔_**

- [دستاویزات](https://docs.codex.io)
- [ایکسپلورر](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_بلٹ ان کیشنگ، ہکس، اور ٹیسٹ موکس کے ساتھ ٹائپ اسکرپٹ میٹا لائبریری۔_**

- [دستاویزات](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## مزید مطالعہ {#further-reading}

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحے میں ترمیم کریں اور اسے شامل کریں!_

## متعلقہ موضوعات {#related-topics}

- [نوڈز اور کلائنٹس](/developers/docs/nodes-and-clients/)
- [ڈیولپمنٹ فریم ورکس](/developers/docs/frameworks/)

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [جاوا اسکرپٹ میں ایتھیریم بلاک چین استعمال کرنے کے لیے Web3js سیٹ اپ کریں](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– اپنے پروجیکٹ میں web3.js سیٹ اپ کرنے کی ہدایات۔_
- [جاوا اسکرپٹ سے اسمارٹ کانٹریکٹ کو کال کرنا](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI ٹوکن کا استعمال کرتے ہوئے، دیکھیں کہ جاوا اسکرپٹ کا استعمال کرتے ہوئے کانٹریکٹس فنکشن کو کیسے کال کیا جائے۔_
- [web3 اور Alchemy کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنا](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– بیک اینڈ سے ٹرانزیکشنز بھیجنے کے لیے مرحلہ وار رہنمائی۔_

## ٹیوٹوریلز: ایتھیریم پر جاوا اسکرپٹ APIs اور WebSockets {#tutorials}

- [WebSockets کا استعمال](/developers/tutorials/using-websockets/) _– ایتھیریم ایونٹس کو سبسکرائب کرنے اور ریئل ٹائم JSON-RPC درخواستیں کرنے کے لیے Alchemy کے ساتھ WebSockets کا استعمال کیسے کریں۔_