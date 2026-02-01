---
title: "Web3 کا استعمال کرتے ہوئے لین دین بھیجنا"
description: "یہ Web3 کا استعمال کرتے ہوئے Ethereum لین دین بھیجنے کے لیے ایک ابتدائی دوستانہ گائیڈ ہے۔ Ethereum بلاک چین پر لین دین بھیجنے کے لیے تین اہم مراحل ہیں: تخلیق کریں، دستخط کریں، اور براڈکاسٹ کریں۔ ہم ان تینوں پر عمل کریں گے۔"
author: "ایلن ہالپرن"
tags: [ "لین دین", "web3.js", "alchemy" ]
skill: beginner
lang: ur-in
published: 2020-11-04
source: "Alchemy دستاویزات"
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

یہ Web3 کا استعمال کرتے ہوئے Ethereum لین دین بھیجنے کے لیے ایک ابتدائی دوستانہ گائیڈ ہے۔ Ethereum بلاک چین پر لین دین بھیجنے کے لیے تین اہم مراحل ہیں: تخلیق کریں، دستخط کریں، اور براڈکاسٹ کریں۔ ہم ان تینوں پر عمل کریں گے، امید ہے کہ آپ کے تمام سوالوں کے جواب مل جائیں گے! اس ٹیوٹوریل میں، ہم اپنے لین دین کو Ethereum چین پر بھیجنے کے لیے [Alchemy](https://www.alchemy.com/) کا استعمال کریں گے۔ آپ [یہاں ایک مفت Alchemy اکاؤنٹ بنا سکتے ہیں](https://auth.alchemyapi.io/signup)۔

**نوٹ:** یہ گائیڈ آپ کی ایپ کے لیے _بیک اینڈ_ پر آپ کے لین دین پر دستخط کرنے کے لیے ہے۔ اگر آپ فرنٹ اینڈ پر اپنے لین دین پر دستخط کو مربوط کرنا چاہتے ہیں، تو [براؤزر فراہم کنندہ کے ساتھ Web3 کو مربوط کرنے](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider) کی جانچ کریں۔

## بنیادی باتیں {#the-basics}

زیادہ تر بلاک چین ڈویلپرز کی طرح جب وہ پہلی بار شروع کرتے ہیں، تو ہو سکتا ہے کہ آپ نے لین دین بھیجنے کے طریقے پر کچھ تحقیق کی ہو (ایسی چیز جو بہت آسان ہونی چاہیے) اور بہت سارے گائیڈز کا سامنا کیا ہو، ہر ایک مختلف باتیں کہہ رہا ہو اور آپ کو تھوڑا مغلوب اور الجھن میں ڈال دیا ہو۔ اگر آپ بھی اسی حال میں ہیں، تو فکر نہ کریں؛ ہم سب کبھی نہ کبھی اس حال میں تھے! تو، شروع کرنے سے پہلے، آئیے کچھ چیزوں کو سیدھا کر لیں:

### 1. Alchemy آپ کی نجی کلیدوں کو ذخیرہ نہیں کرتا ہے {#alchemy-does-not-store-your-private-keys}

- اس کا مطلب ہے کہ Alchemy آپ کی طرف سے لین دین پر دستخط اور بھیج نہیں سکتا ہے۔ اس کی وجہ سیکورٹی کے مقاصد ہیں۔ Alchemy کبھی بھی آپ سے اپنی نجی کلید شیئر کرنے کے لیے نہیں کہے گا، اور آپ کو کبھی بھی اپنی نجی کلید کسی میزبان نوڈ (یا اس معاملے میں کسی کے ساتھ) شیئر نہیں کرنی چاہیے۔
- آپ Alchemy کے کور API کا استعمال کرتے ہوئے بلاک چین سے پڑھ سکتے ہیں، لیکن اس پر لکھنے کے لیے آپ کو Alchemy کے ذریعے بھیجنے سے پہلے اپنے لین دین پر دستخط کرنے کے لیے کچھ اور استعمال کرنے کی ضرورت ہوگی (یہ کسی بھی دوسرے [نوڈ سروس](/developers/docs/nodes-and-clients/nodes-as-a-service/) کے لیے بھی ایسا ہی ہے)۔

### 2. ایک “دستخط کنندہ” کیا ہے؟ {#what-is-a-signer}

- دستخط کنندگان آپ کے لیے آپ کی نجی کلید کا استعمال کرتے ہوئے لین دین پر دستخط کریں گے۔ اس ٹیوٹوریل میں ہم اپنے لین دین پر دستخط کرنے کے لیے [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) کا استعمال کریں گے، لیکن آپ کوئی دوسری web3 لائبریری بھی استعمال کر سکتے ہیں۔
- فرنٹ اینڈ پر، دستخط کنندہ کی ایک اچھی مثال [MetaMask](https://metamask.io/) ہوگی، جو آپ کی طرف سے لین دین پر دستخط اور بھیجے گا۔

### 3. مجھے اپنے لین دین پر دستخط کرنے کی ضرورت کیوں ہے؟ {#why-do-i-need-to-sign-my-transactions}

- ہر وہ صارف جو Ethereum نیٹ ورک پر لین دین بھیجنا چاہتا ہے اسے لین دین پر دستخط کرنا ہوگا (اپنی نجی کلید کا استعمال کرتے ہوئے)، تاکہ یہ تصدیق کی جا سکے کہ لین دین کا ماخذ وہی ہے جس کا وہ دعویٰ کرتا ہے۔
- اس نجی کلید کی حفاظت کرنا بہت ضروری ہے، کیونکہ اس تک رسائی آپ کے Ethereum اکاؤنٹ پر مکمل کنٹرول فراہم کرتی ہے، جس سے آپ (یا رسائی رکھنے والے کسی بھی شخص) کو آپ کی طرف سے لین دین کرنے کی اجازت ملتی ہے۔

### 4. میں اپنی نجی کلید کی حفاظت کیسے کروں؟ {#how-do-i-protect-my-private-key}

- اپنی نجی کلید کی حفاظت کرنے اور اسے لین دین بھیجنے کے لیے استعمال کرنے کے بہت سے طریقے ہیں۔ اس ٹیوٹوریل میں ہم ایک `.env` فائل کا استعمال کریں گے۔ تاہم، آپ ایک علیحدہ فراہم کنندہ بھی استعمال کر سکتے ہیں جو نجی کلیدوں کو ذخیرہ کرتا ہے، ایک کیسٹور فائل، یا دیگر اختیارات استعمال کر سکتے ہیں۔

### 5. `eth_sendTransaction` اور `eth_sendRawTransaction` کے درمیان کیا فرق ہے؟ {#difference-between-send-and-send-raw}

`eth_sendTransaction` اور `eth_sendRawTransaction` دونوں Ethereum API فنکشنز ہیں جو Ethereum نیٹ ورک پر لین دین کو براڈکاسٹ کرتے ہیں تاکہ اسے مستقبل کے بلاک میں شامل کیا جا سکے۔ وہ لین دین پر دستخط کو سنبھالنے کے طریقے میں مختلف ہیں۔

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) کا استعمال _بغیر دستخط شدہ_ لین دین بھیجنے کے لیے کیا جاتا ہے، جس کا مطلب ہے کہ جس نوڈ پر آپ بھیج رہے ہیں اسے آپ کی نجی کلید کا انتظام کرنا چاہیے تاکہ وہ اسے چین پر براڈکاسٹ کرنے سے پہلے لین دین پر دستخط کر سکے۔ چونکہ Alchemy صارف کی نجی کلیدوں کو نہیں رکھتا ہے، اس لیے وہ اس طریقے کی حمایت نہیں کرتے ہیں۔
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) کا استعمال ان لین دین کو براڈکاسٹ کرنے کے لیے کیا جاتا ہے جن پر پہلے ہی دستخط ہو چکے ہیں۔ اس کا مطلب ہے کہ آپ کو پہلے [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction) کا استعمال کرنا ہوگا، پھر نتیجہ کو `eth_sendRawTransaction` میں پاس کرنا ہوگا۔

web3 کا استعمال کرتے وقت، `eth_sendRawTransaction` کو فنکشن [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) کو کال کرکے رسائی حاصل کی جاتی ہے۔

اس ٹیوٹوریل میں ہم یہی استعمال کریں گے۔

### 6. web3 لائبریری کیا ہے؟ {#what-is-the-web3-library}

- Web3.js معیاری JSON-RPC کالز کے ارد گرد ایک ریپر لائبریری ہے جو Ethereum کی ڈیولپمنٹ میں استعمال کرنا کافی عام ہے۔
- مختلف زبانوں کے لیے بہت سی web3 لائبریریاں ہیں۔ اس ٹیوٹوریل میں ہم [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) کا استعمال کریں گے جو JavaScript میں لکھی گئی ہے۔ آپ [یہاں](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) دیگر اختیارات جیسے [ethers.js](https://docs.ethers.org/v5/) دیکھ سکتے ہیں۔

ٹھیک ہے، اب جب کہ ہم نے ان میں سے کچھ سوالات کو راستے سے ہٹا دیا ہے، آئیے ٹیوٹوریل کی طرف بڑھتے ہیں۔ Alchemy [discord](https://discord.gg/gWuC7zB) میں کسی بھی وقت سوالات پوچھنے کے لیے آزاد محسوس کریں!

### 7. محفوظ، گیس-آپٹمائزڈ، اور نجی لین دین کیسے بھیجیں؟ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy کے پاس Transact APIs کا ایک مجموعہ ہے](https://docs.alchemy.com/reference/transact-api-quickstart)۔ آپ ان کا استعمال مضبوط لین دین بھیجنے، لین دین ہونے سے پہلے ان کی تقلید کرنے، نجی لین دین بھیجنے، اور گیس-آپٹمائزڈ لین دین بھیجنے کے لیے کر سکتے ہیں۔
- آپ [Notify API](https://docs.alchemy.com/docs/alchemy-notify) کا استعمال بھی کر سکتے ہیں تاکہ آپ کو مطلع کیا جا سکے جب آپ کا لین دین میمپول سے کھینچ کر چین میں شامل کیا جائے۔

**نوٹ:** اس گائیڈ کے لیے Alchemy اکاؤنٹ، ایک Ethereum ایڈریس یا MetaMask والیٹ، NodeJs، اور npm انسٹال ہونا ضروری ہے۔ اگر نہیں، تو ان اقدامات پر عمل کریں:

1. [ایک مفت Alchemy اکاؤنٹ بنائیں](https://auth.alchemyapi.io/signup)
2. [MetaMask اکاؤنٹ بنائیں](https://metamask.io/) (یا ایک Ethereum ایڈریس حاصل کریں)
3. [NodeJs اور NPM انسٹال کرنے کے لیے ان اقدامات پر عمل کریں](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## اپنا لین دین بھیجنے کے اقدامات {#steps-to-sending-your-transaction}

### 1. Sepolia ٹیسٹ نیٹ پر ایک Alchemy ایپ بنائیں {#create-an-alchemy-app-on-the-sepolia-testnet}

اپنے [Alchemy ڈیش بورڈ](https://dashboard.alchemyapi.io/) پر جائیں اور ایک نئی ایپ بنائیں، اپنے نیٹ ورک کے لیے Sepolia (یا کوئی دوسرا ٹیسٹ نیٹ) کا انتخاب کریں۔

### 2. Sepolia فاسیٹ سے ETH کی درخواست کریں {#request-eth-from-sepolia-faucet}

ETH حاصل کرنے کے لیے [Alchemy Sepolia فاسیٹ](https://www.sepoliafaucet.com/) پر دی گئی ہدایات پر عمل کریں۔ یقینی بنائیں کہ آپ اپنا **Sepolia** Ethereum ایڈریس (MetaMask سے) شامل کریں اور کوئی دوسرا نیٹ ورک نہیں۔ ہدایات پر عمل کرنے کے بعد، دوبارہ چیک کریں کہ آپ نے اپنے والیٹ میں ETH وصول کر لیا ہے۔

### 3. ایک نئی پراجیکٹ ڈائرکٹری بنائیں اور اس میں `cd` کریں {#create-a-new-project-direction}

کمانڈ لائن (macs کے لیے ٹرمینل) سے ایک نئی پراجیکٹ ڈائرکٹری بنائیں اور اس میں نیویگیٹ کریں:

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Alchemy Web3 (یا کوئی بھی web3 لائبریری) انسٹال کریں {#install-alchemy-web3}

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) انسٹال کرنے کے لیے اپنی پراجیکٹ ڈائرکٹری میں درج ذیل کمانڈ چلائیں:

نوٹ، اگر آپ ethers.js لائبریری استعمال کرنا چاہتے ہیں، تو [یہاں دی گئی ہدایات پر عمل کریں](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum)۔

```
npm install @alch/alchemy-web3
```

### 5. dotenv انسٹال کریں {#install-dotenv}

ہم اپنی API کلید اور نجی کلید کو محفوظ طریقے سے ذخیرہ کرنے کے لیے ایک `.env` فائل استعمال کریں گے۔

```
npm install dotenv --save
```

### 6. `.env` فائل بنائیں {#create-the-dotenv-file}

اپنی پراجیکٹ ڈائرکٹری میں ایک `.env` فائل بنائیں اور درج ذیل شامل کریں (“`your-api-url`" اور "`your-private-key`" کو تبدیل کرتے ہوئے)

- اپنا Alchemy API URL تلاش کرنے کے لیے، اپنے ڈیش بورڈ پر ابھی بنائی گئی ایپ کے ایپ تفصیلات کے صفحے پر جائیں، اوپر دائیں کونے میں “View Key” پر کلک کریں، اور HTTP URL حاصل کریں۔
- MetaMask کا استعمال کرتے ہوئے اپنی نجی کلید تلاش کرنے کے لیے، یہ [گائیڈ](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) دیکھیں۔

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> کو کمٹ نہ کریں! براہ کرم یقینی بنائیں کہ آپ اپنی <code>.env</code> فائل کسی کے ساتھ شیئر یا ظاہر نہ کریں، کیونکہ ایسا کرنے سے آپ اپنے رازوں پر سمجھوتہ کر رہے ہیں۔ اگر آپ ورژن کنٹرول استعمال کر رہے ہیں، تو اپنی <code>.env</code> کو <a href="https://git-scm.com/docs/gitignore">gitignore</a> فائل میں شامل کریں۔
</AlertDescription>
</AlertContent>
</Alert>

### 7. `sendTx.js` فائل بنائیں {#create-sendtx-js}

بہت اچھا، اب جب کہ ہمارا حساس ڈیٹا ایک `.env` فائل میں محفوظ ہے، آئیے کوڈنگ شروع کرتے ہیں۔ ہمارے بھیجنے والے لین دین کی مثال کے لیے، ہم ETH کو Sepolia فاسیٹ پر واپس بھیجیں گے۔

ایک `sendTx.js` فائل بنائیں، جہاں ہم اپنے مثال کے لین دین کو کنفیگر اور بھیجیں گے، اور اس میں کوڈ کی درج ذیل لائنیں شامل کریں:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: اس ایڈریس کو اپنے عوامی ایڈریس سے تبدیل کریں

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // نونس 0 سے گننا شروع کرتا ہے

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // eth واپس کرنے کے لیے فاسیٹ ایڈریس
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // پیغام بھیجنے یا سمارٹ کنٹریکٹ پر عمل کرنے کے لیے اختیاری ڈیٹا فیلڈ
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 آپ کے لین دین کا ہیش یہ ہے: ", hash, "\n اپنے لین دین کی حیثیت دیکھنے کے لیے Alchemy's Mempool کو چیک کریں!");
    } else {
      console.log("❗آپ کا لین دین جمع کراتے وقت کچھ غلط ہو گیا:", error)
    }
   });
}

main();
```

یقینی بنائیں کہ آپ **لائن 6** پر موجود ایڈریس کو اپنے عوامی ایڈریس سے تبدیل کریں۔

اب، اس کوڈ کو چلانے سے پہلے، آئیے یہاں کچھ اجزاء کے بارے میں بات کرتے ہیں۔

- `nonce`: نونس کی تفصیلات کا استعمال آپ کے ایڈریس سے بھیجے گئے لین دین کی تعداد پر نظر رکھنے کے لیے کیا جاتا ہے۔ ہمیں اس کی ضرورت سیکورٹی کے مقاصد اور [ری پلے حملوں](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) کو روکنے کے لیے ہے۔ اپنے ایڈریس سے بھیجے گئے لین دین کی تعداد حاصل کرنے کے لیے ہم [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) کا استعمال کرتے ہیں۔
- `transaction`: لین دین کی آبجیکٹ کے کچھ پہلو ہیں جن کی ہمیں وضاحت کرنے کی ضرورت ہے۔
  - `to`: یہ وہ ایڈریس ہے جس پر ہم ETH بھیجنا چاہتے ہیں۔ اس معاملے میں، ہم ETH کو [Sepolia فاسیٹ](https://sepoliafaucet.com/) پر واپس بھیج رہے ہیں جس سے ہم نے ابتدائی طور پر درخواست کی تھی۔
  - `value`: یہ وہ رقم ہے جسے ہم بھیجنا چاہتے ہیں، جو Wei میں بیان کی گئی ہے جہاں 10^18 Wei = 1 ETH
  - `gas`: اپنے لین دین میں شامل کرنے کے لیے گیس کی صحیح مقدار کا تعین کرنے کے بہت سے طریقے ہیں۔ Alchemy کے پاس ایک [گیس پرائس ویب ہک](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) بھی ہے جو آپ کو مطلع کرتا ہے جب گیس کی قیمت ایک خاص حد کے اندر آ جاتی ہے۔ Mainnet لین دین کے لیے، گیس کی صحیح مقدار کا تعین کرنے کے لیے [ETH Gas Station](https://ethgasstation.info/) جیسے گیس ایسٹیمیٹر کو چیک کرنا ایک اچھا عمل ہے۔ 21000 گیس کی کم از کم مقدار ہے جو Ethereum پر ایک آپریشن استعمال کرے گا، لہذا اس بات کو یقینی بنانے کے لیے کہ ہمارا لین دین انجام دیا جائے گا ہم یہاں 30000 ڈالتے ہیں۔
  - `nonce`: اوپر نونس کی تعریف دیکھیں۔ نونس صفر سے گننا شروع کرتا ہے۔
  - [اختیاری] ڈیٹا: آپ کی منتقلی کے ساتھ اضافی معلومات بھیجنے، یا اسمارٹ کنٹریکٹ کو کال کرنے کے لیے استعمال کیا جاتا ہے، بیلنس کی منتقلی کے لیے ضروری نہیں، نیچے دیا گیا نوٹ دیکھیں۔
- `signedTx`: اپنے لین دین کی آبجیکٹ پر دستخط کرنے کے لیے ہم `PRIVATE_KEY` کے ساتھ `signTransaction` طریقہ استعمال کریں گے۔
- `sendSignedTransaction`: ایک بار جب ہمارے پاس دستخط شدہ لین دین ہو جاتا ہے، تو ہم اسے `sendSignedTransaction` کا استعمال کرتے ہوئے بعد کے بلاک میں شامل کرنے کے لیے بھیج سکتے ہیں۔

**ڈیٹا پر ایک نوٹ**
Ethereum میں دو اہم قسم کے لین دین بھیجے جا سکتے ہیں۔

- بیلنس کی منتقلی: ایک ایڈریس سے دوسرے ایڈریس پر ETH بھیجیں۔ کوئی ڈیٹا فیلڈ درکار نہیں، تاہم، اگر آپ اپنے لین دین کے ساتھ اضافی معلومات بھیجنا چاہتے ہیں، تو آپ اس فیلڈ میں HEX فارمیٹ میں وہ معلومات شامل کر سکتے ہیں۔
  - مثال کے طور پر، فرض کریں کہ ہم ایک IPFS دستاویز کا ہیش Ethereum چین پر لکھنا چاہتے ہیں تاکہ اسے ایک ناقابل تغیر ٹائم اسٹیمپ دیا جا سکے۔ ہمارا ڈیٹا فیلڈ پھر اس طرح نظر آنا چاہئے: `web3.utils.toHex('IPFS ہیش')`۔ اور اب کوئی بھی چین سے استفسار کر سکتا ہے اور دیکھ سکتا ہے کہ وہ دستاویز کب شامل کی گئی تھی۔
- اسمارٹ کنٹریکٹ لین دین: چین پر کچھ اسمارٹ کنٹریکٹ کوڈ پر عمل کریں۔ اس معاملے میں، ڈیٹا فیلڈ میں وہ اسمارٹ فنکشن ہونا چاہئے جسے آپ کسی بھی پیرامیٹرز کے ساتھ عمل کرنا چاہتے ہیں۔
  - ایک عملی مثال کے لیے، اس [ہیلو ورلڈ ٹیوٹوریل](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction) میں مرحلہ 8 دیکھیں۔

### 8. `node sendTx.js` کا استعمال کرتے ہوئے کوڈ چلائیں {#run-the-code-using-node-sendtx-js}

اپنے ٹرمینل یا کمانڈ لائن پر واپس جائیں اور چلائیں:

```
node sendTx.js
```

### 9. Mempool میں اپنا لین دین دیکھیں {#see-your-transaction-in-the-mempool}

اپنے Alchemy ڈیش بورڈ میں [Mempool صفحہ](https://dashboard.alchemyapi.io/mempool) کھولیں اور اپنا لین دین تلاش کرنے کے لیے بنائی گئی ایپ کے ذریعے فلٹر کریں۔ یہ وہ جگہ ہے جہاں ہم اپنے لین دین کی منتقلی کو زیر التواء حالت سے مائنڈ حالت (اگر کامیاب ہو) یا غیر کامیاب ہونے پر ڈراپڈ حالت میں دیکھ سکتے ہیں۔ یقینی بنائیں کہ اسے "All" پر رکھیں تاکہ آپ "mined"، "pending"، اور "dropped" لین دین کو کیپچر کر سکیں۔ آپ ایڈریس `0x31b98d14007bdee637298086988a0bbd31184523` پر بھیجے گئے لین دین کو تلاش کرکے بھی اپنا لین دین تلاش کر سکتے ہیں۔

ایک بار جب آپ اسے تلاش کر لیں تو اپنے لین دین کی تفصیلات دیکھنے کے لیے، tx ہیش کو منتخب کریں، جو آپ کو اس طرح کے منظر پر لے جائے گا:

![Mempool واچر اسکرین شاٹ](./mempool.png)

وہاں سے آپ سرخ رنگ میں دائرے والے آئیکن پر کلک کرکے Etherscan پر اپنا لین دین دیکھ سکتے ہیں!

**یپییییی!** آپ نے ابھی Alchemy کا استعمال کرتے ہوئے اپنا پہلا Ethereum لین دین بھیجا ہے 🎉\*\*

_اس گائیڈ کے بارے میں رائے اور تجاویز کے لیے، براہ کرم Alchemy's [Discord](https://discord.gg/A39JVCM) پر Elan کو پیغام دیں!_

_اصل میں [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy) پر شائع ہوا_
