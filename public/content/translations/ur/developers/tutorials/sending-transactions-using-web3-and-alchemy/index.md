---
title: "Web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنا"
description: "یہ Web3 کا استعمال کرتے ہوئے ایتھریم ٹرانزیکشنز بھیجنے کے لیے ایک ابتدائیوں کے لیے سازگار گائیڈ ہے۔ ایتھریم بلاک چین پر ٹرانزیکشن بھیجنے کے لیے تین اہم اقدامات ہیں: تخلیق کریں، دستخط کریں، اور براڈکاسٹ کریں۔ ہم ان تینوں کا جائزہ لیں گے۔"
author: "ایلان ہیلپرن"
tags: ["ٹرانزیکشنز", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: "ٹرانزیکشنز بھیجیں"
lang: ur
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

یہ Web3 کا استعمال کرتے ہوئے ایتھریم ٹرانزیکشنز بھیجنے کے لیے ایک ابتدائیوں کے لیے سازگار گائیڈ ہے۔ ایتھریم بلاک چین پر ٹرانزیکشن بھیجنے کے لیے تین اہم اقدامات ہیں: تخلیق کریں، دستخط کریں، اور براڈکاسٹ کریں۔ ہم ان تینوں کا جائزہ لیں گے، اور امید ہے کہ آپ کے ذہن میں موجود کسی بھی سوال کا جواب دیں گے! اس ٹیوٹوریل میں، ہم اپنی ٹرانزیکشنز کو ایتھریم چین پر بھیجنے کے لیے [Alchemy](https://www.alchemy.com/) کا استعمال کریں گے۔ آپ [یہاں ایک مفت Alchemy اکاؤنٹ بنا سکتے ہیں](https://auth.alchemyapi.io/signup)۔

**نوٹ:** یہ گائیڈ آپ کی ایپ کے _بیک اینڈ_ پر آپ کی ٹرانزیکشنز پر دستخط کرنے کے لیے ہے۔ اگر آپ فرنٹ اینڈ پر اپنی ٹرانزیکشنز پر دستخط کرنے کو مربوط کرنا چاہتے ہیں، تو [Web3 کو براؤزر پرووائیڈر کے ساتھ](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider) مربوط کرنے کا طریقہ دیکھیں۔

## بنیادی باتیں {#the-basics}

زیادہ تر بلاک چین ڈیولپرز کی طرح جب وہ پہلی بار شروعات کرتے ہیں، تو آپ نے بھی اس بات پر کچھ تحقیق کی ہوگی کہ ٹرانزیکشن کیسے بھیجی جائے (جو کہ کافی آسان ہونا چاہیے) اور آپ کو بہت سی گائیڈز ملی ہوں گی، جن میں سے ہر ایک مختلف باتیں کہہ رہی ہوگی اور آپ کو تھوڑا سا پریشان اور الجھن میں ڈال دیا ہوگا۔ اگر آپ بھی اسی صورتحال سے دوچار ہیں، تو فکر نہ کریں؛ ہم سب کسی نہ کسی وقت اسی مقام پر تھے! لہذا، شروع کرنے سے پہلے، آئیے کچھ چیزیں واضح کر لیں:

### 1\. Alchemy آپ کی پرائیویٹ کیز کو اسٹور نہیں کرتا ہے {#alchemy-does-not-store-your-private-keys}

- اس کا مطلب ہے کہ Alchemy آپ کی جانب سے ٹرانزیکشنز پر دستخط اور انہیں بھیج نہیں سکتا۔ اس کی وجہ سیکیورٹی مقاصد ہیں۔ Alchemy کبھی بھی آپ سے اپنی پرائیویٹ کی شیئر کرنے کا نہیں کہے گا، اور آپ کو کبھی بھی اپنی پرائیویٹ کی کسی ہوسٹڈ نوڈ (یا کسی بھی شخص) کے ساتھ شیئر نہیں کرنی چاہیے۔
- آپ Alchemy کی بنیادی API کا استعمال کرتے ہوئے بلاک چین سے پڑھ سکتے ہیں، لیکن اس پر لکھنے کے لیے آپ کو Alchemy کے ذریعے بھیجنے سے پہلے اپنی ٹرانزیکشنز پر دستخط کرنے کے لیے کسی اور چیز کا استعمال کرنا ہوگا (یہ کسی بھی دوسری [نوڈ سروس](/developers/docs/nodes-and-clients/nodes-as-a-service/) کے لیے بھی یکساں ہے)۔

### 2\. "سائنر" (signer) کیا ہے؟ {#what-is-a-signer}

- سائنرز آپ کی پرائیویٹ کی کا استعمال کرتے ہوئے آپ کے لیے ٹرانزیکشنز پر دستخط کریں گے۔ اس ٹیوٹوریل میں ہم اپنی ٹرانزیکشن پر دستخط کرنے کے لیے [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) کا استعمال کریں گے، لیکن آپ کوئی بھی دوسری web3 لائبریری بھی استعمال کر سکتے ہیں۔
- فرنٹ اینڈ پر، سائنر کی ایک اچھی مثال [MetaMask](https://metamask.io/) ہوگی، جو آپ کی جانب سے ٹرانزیکشنز پر دستخط کرے گا اور انہیں بھیجے گا۔

### 3\. مجھے اپنی ٹرانزیکشنز پر دستخط کرنے کی ضرورت کیوں ہے؟ {#why-do-i-need-to-sign-my-transactions}

- ہر وہ صارف جو ایتھریم نیٹ ورک پر ٹرانزیکشن بھیجنا چاہتا ہے، اسے ٹرانزیکشن پر دستخط کرنا لازمی ہے (اپنی پرائیویٹ کی کا استعمال کرتے ہوئے)، تاکہ یہ تصدیق کی جا سکے کہ ٹرانزیکشن کا ماخذ وہی ہے جو وہ دعویٰ کرتا ہے۔
- اس پرائیویٹ کی کی حفاظت کرنا انتہائی اہم ہے، کیونکہ اس تک رسائی حاصل کرنے سے آپ کے ایتھریم اکاؤنٹ پر مکمل کنٹرول مل جاتا ہے، جس سے آپ (یا رسائی رکھنے والا کوئی بھی شخص) آپ کی جانب سے ٹرانزیکشنز انجام دے سکتا ہے۔

### 4\. میں اپنی پرائیویٹ کی کی حفاظت کیسے کروں؟ {#how-do-i-protect-my-private-key}

- آپ کی پرائیویٹ کی کی حفاظت کرنے اور اسے ٹرانزیکشنز بھیجنے کے لیے استعمال کرنے کے کئی طریقے ہیں۔ اس ٹیوٹوریل میں ہم ایک `.env` فائل کا استعمال کریں گے۔ تاہم، آپ ایک الگ پرووائیڈر بھی استعمال کر سکتے ہیں جو پرائیویٹ کیز کو اسٹور کرتا ہے، کی اسٹور (keystore) فائل استعمال کر سکتے ہیں، یا دیگر آپشنز بھی موجود ہیں۔

### 5\. `eth_sendTransaction` اور `eth_sendRawTransaction` کے درمیان کیا فرق ہے؟ {#difference-between-send-and-send-raw}

`eth_sendTransaction` اور `eth_sendRawTransaction` دونوں ایتھریم API فنکشنز ہیں جو ایتھریم نیٹ ورک پر ایک ٹرانزیکشن کو براڈکاسٹ کرتے ہیں تاکہ اسے مستقبل کے بلاک میں شامل کیا جا سکے۔ ان میں فرق اس بات میں ہے کہ وہ ٹرانزیکشنز پر دستخط کرنے کے عمل کو کیسے سنبھالتے ہیں۔

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) کا استعمال _بغیر دستخط شدہ_ ٹرانزیکشنز بھیجنے کے لیے کیا جاتا ہے، جس کا مطلب ہے کہ جس نوڈ کو آپ بھیج رہے ہیں اسے آپ کی پرائیویٹ کی کا انتظام کرنا ہوگا تاکہ وہ چین پر براڈکاسٹ کرنے سے پہلے ٹرانزیکشن پر دستخط کر سکے۔ چونکہ Alchemy صارفین کی پرائیویٹ کیز نہیں رکھتا، اس لیے وہ اس طریقہ کار کو سپورٹ نہیں کرتے۔
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) کا استعمال ان ٹرانزیکشنز کو براڈکاسٹ کرنے کے لیے کیا جاتا ہے جن پر پہلے ہی دستخط ہو چکے ہیں۔ اس کا مطلب ہے کہ آپ کو پہلے [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction) کا استعمال کرنا ہوگا، پھر اس کے نتیجے کو `eth_sendRawTransaction` میں پاس کرنا ہوگا۔

web3 کا استعمال کرتے وقت، `eth_sendRawTransaction` تک رسائی [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) فنکشن کو کال کر کے حاصل کی جاتی ہے۔

اس ٹیوٹوریل میں ہم یہی استعمال کریں گے۔

### 6\. web3 لائبریری کیا ہے؟ {#what-is-the-web3-library}

- Web3.js معیاری JSON-RPC کالز کے گرد ایک ریپر (wrapper) لائبریری ہے جس کا استعمال ایتھریم ڈیولپمنٹ میں کافی عام ہے۔
- مختلف زبانوں کے لیے بہت سی web3 لائبریریاں موجود ہیں۔ اس ٹیوٹوریل میں ہم [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) کا استعمال کریں گے جو JavaScript میں لکھی گئی ہے۔ آپ [یہاں](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) دیگر آپشنز جیسے [ethers.js](https://docs.ethers.org/v5/) بھی دیکھ سکتے ہیں۔

ٹھیک ہے، اب جب کہ ہم نے ان میں سے کچھ سوالات کو حل کر لیا ہے، تو آئیے ٹیوٹوریل کی طرف بڑھتے ہیں۔ Alchemy کے [discord](https://discord.gg/gWuC7zB) میں کسی بھی وقت سوالات پوچھنے میں ہچکچاہٹ محسوس نہ کریں!

### 7\. محفوظ، گیس کے لحاظ سے بہتر (gas-optimized)، اور پرائیویٹ ٹرانزیکشنز کیسے بھیجیں؟ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy کے پاس Transact APIs کا ایک مجموعہ ہے](https://docs.alchemy.com/reference/transact-api-quickstart)۔ آپ ان کا استعمال مضبوط ٹرانزیکشنز بھیجنے، ٹرانزیکشنز کے ہونے سے پہلے ان کی نقل (simulate) کرنے، پرائیویٹ ٹرانزیکشنز بھیجنے، اور گیس کے لحاظ سے بہتر ٹرانزیکشنز بھیجنے کے لیے کر سکتے ہیں۔
- آپ [Notify API](https://docs.alchemy.com/docs/alchemy-notify) کا استعمال بھی کر سکتے ہیں تاکہ جب آپ کی ٹرانزیکشن میم پول (mempool) سے نکالی جائے اور چین میں شامل کی جائے تو آپ کو الرٹ کیا جا سکے۔

**نوٹ:** اس گائیڈ کے لیے ایک Alchemy اکاؤنٹ، ایک ایتھریم ایڈریس یا MetaMask والیٹ، NodeJs، اور npm کا انسٹال ہونا ضروری ہے۔ اگر نہیں، تو ان اقدامات پر عمل کریں:

1.  [ایک مفت Alchemy اکاؤنٹ بنائیں](https://auth.alchemyapi.io/signup)
2.  [MetaMask اکاؤنٹ بنائیں](https://metamask.io/) (یا ایک ایتھریم ایڈریس حاصل کریں)
3.  [NodeJs اور NPM انسٹال کرنے کے لیے ان اقدامات پر عمل کریں](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## اپنی ٹرانزیکشن بھیجنے کے اقدامات {#steps-to-sending-your-transaction}

### 1\. Sepolia ٹیسٹ نیٹ پر ایک Alchemy ایپ بنائیں {#create-an-alchemy-app-on-the-sepolia-testnet}

اپنے [Alchemy ڈیش بورڈ](https://dashboard.alchemyapi.io/) پر جائیں اور اپنے نیٹ ورک کے لیے Sepolia (یا کوئی اور ٹیسٹ نیٹ) کا انتخاب کرتے ہوئے ایک نئی ایپ بنائیں۔

### 2\. Sepolia فوسٹ (faucet) سے ETH کی درخواست کریں {#request-eth-from-sepolia-faucet}

ETH حاصل کرنے کے لیے [Alchemy Sepolia فوسٹ](https://www.sepoliafaucet.com/) پر دی گئی ہدایات پر عمل کریں۔ اس بات کو یقینی بنائیں کہ آپ اپنا **Sepolia** ایتھریم ایڈریس (MetaMask سے) شامل کریں نہ کہ کسی اور نیٹ ورک کا۔ ہدایات پر عمل کرنے کے بعد، دوبارہ چیک کریں کہ آپ کو اپنے والیٹ میں ETH موصول ہو گیا ہے۔

### 3\. ایک نئی پروجیکٹ ڈائرکٹری بنائیں اور اس میں `cd` کریں {#create-a-new-project-direction}

کمانڈ لائن (میک کے لیے ٹرمینل) سے ایک نئی پروجیکٹ ڈائرکٹری بنائیں اور اس میں جائیں:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Alchemy Web3 (یا کوئی بھی web3 لائبریری) انسٹال کریں {#install-alchemy-web3}

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) کو انسٹال کرنے کے لیے اپنی پروجیکٹ ڈائرکٹری میں درج ذیل کمانڈ چلائیں:

نوٹ کریں، اگر آپ ethers.js لائبریری استعمال کرنا چاہتے ہیں، تو [یہاں دی گئی ہدایات پر عمل کریں](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum)۔

```
npm install @alch/alchemy-web3
```

### 5\. dotenv انسٹال کریں {#install-dotenv}

ہم اپنی API کی اور پرائیویٹ کی کو محفوظ طریقے سے اسٹور کرنے کے لیے ایک `.env` فائل کا استعمال کریں گے۔

```
npm install dotenv --save
```

### 6\. `.env` فائل بنائیں {#create-the-dotenv-file}

اپنی پروجیکٹ ڈائرکٹری میں ایک `.env` فائل بنائیں اور درج ذیل کو شامل کریں ("`your-api-url`" اور "`your-private-key`" کو تبدیل کرتے ہوئے)

- اپنا Alchemy API URL تلاش کرنے کے لیے، اپنے ڈیش بورڈ پر ابھی بنائی گئی ایپ کے ایپ ڈیٹیلز پیج پر جائیں، اوپری دائیں کونے میں "View Key" پر کلک کریں، اور HTTP URL کاپی کریں۔
- MetaMask کا استعمال کرتے ہوئے اپنی پرائیویٹ کی تلاش کرنے کے لیے، اس [گائیڈ](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) کو دیکھیں۔

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> کو کمٹ (commit) نہ کریں! براہ کرم اس بات کو یقینی بنائیں کہ اپنی <code>.env</code> فائل کو کبھی بھی کسی کے ساتھ شیئر یا ظاہر نہ کریں، کیونکہ ایسا کرنے سے آپ اپنے رازوں کو خطرے میں ڈال رہے ہیں۔ اگر آپ ورژن کنٹرول استعمال کر رہے ہیں، تو اپنی <code>.env</code> کو ایک <a href="https://git-scm.com/docs/gitignore">gitignore</a> فائل میں شامل کریں۔
</AlertDescription>
</AlertContent>
</Alert>

### 7\. `sendTx.js` فائل بنائیں {#create-sendtx-js}

زبردست، اب جب کہ ہم نے اپنا حساس ڈیٹا ایک `.env` فائل میں محفوظ کر لیا ہے، تو آئیے کوڈنگ شروع کرتے ہیں۔ ہماری ٹرانزیکشن بھیجنے کی مثال کے لیے، ہم ETH کو واپس Sepolia فوسٹ پر بھیجیں گے۔

ایک `sendTx.js` فائل بنائیں، جہاں ہم اپنی مثالی ٹرانزیکشن کو کنفیگر کریں گے اور بھیجیں گے، اور اس میں کوڈ کی درج ذیل لائنیں شامل کریں:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: replace this address with your own public address

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // faucet address to return eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

**لائن 6** پر موجود ایڈریس کو اپنے پبلک ایڈریس سے تبدیل کرنا یقینی بنائیں۔

اب، اس سے پہلے کہ ہم اس کوڈ کو چلانے کی طرف بڑھیں، آئیے یہاں موجود کچھ اجزاء کے بارے میں بات کرتے ہیں۔

- `nonce` : نانس (nonce) کی تخصیص کا استعمال آپ کے ایڈریس سے بھیجی گئی ٹرانزیکشنز کی تعداد کا ٹریک رکھنے کے لیے کیا جاتا ہے۔ ہمیں سیکیورٹی مقاصد اور [ری پلے حملوں (replay attacks)](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) کو روکنے کے لیے اس کی ضرورت ہوتی ہے۔ آپ کے ایڈریس سے بھیجی گئی ٹرانزیکشنز کی تعداد حاصل کرنے کے لیے ہم [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) کا استعمال کرتے ہیں۔
- `transaction`: ٹرانزیکشن آبجیکٹ کے کچھ پہلو ہیں جن کی ہمیں وضاحت کرنے کی ضرورت ہے
  - `to`: یہ وہ ایڈریس ہے جس پر ہم ETH بھیجنا چاہتے ہیں۔ اس صورت میں، ہم ETH کو واپس اسی [Sepolia فوسٹ](https://sepoliafaucet.com/) پر بھیج رہے ہیں جس سے ہم نے ابتدائی طور پر درخواست کی تھی۔
  - `value`: یہ وہ رقم ہے جو ہم بھیجنا چاہتے ہیں، جسے Wei میں بیان کیا گیا ہے جہاں <span dir="ltr">10^18 Wei = 1 ETH</span>
  - `gas`: آپ کی ٹرانزیکشن کے ساتھ شامل کرنے کے لیے گیس کی صحیح مقدار کا تعین کرنے کے کئی طریقے ہیں۔ Alchemy کے پاس ایک [گیس پرائس ویب ہک (gas price webhook)](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) بھی ہے جو آپ کو مطلع کرتا ہے جب گیس کی قیمت ایک خاص حد کے اندر گر جاتی ہے۔ مین نیٹ (Mainnet) ٹرانزیکشنز کے لیے، یہ ایک اچھی پریکٹس ہے کہ شامل کرنے کے لیے گیس کی صحیح مقدار کا تعین کرنے کے لیے [ETH Gas Station](https://ethgasstation.info/) جیسے گیس ایسٹیمیٹر کو چیک کریں۔ 21000 گیس کی وہ کم از کم مقدار ہے جو ایتھریم پر ایک آپریشن استعمال کرے گا، لہذا یہ یقینی بنانے کے لیے کہ ہماری ٹرانزیکشن پر عمل درآمد ہو جائے گا، ہم یہاں 30000 ڈالتے ہیں۔
  - `nonce`: اوپر نانس کی تعریف دیکھیں۔ نانس کی گنتی صفر سے شروع ہوتی ہے۔
  - [اختیاری] data: آپ کے ٹرانسفر کے ساتھ اضافی معلومات بھیجنے، یا اسمارٹ کانٹریکٹ کو کال کرنے کے لیے استعمال کیا جاتا ہے، بیلنس ٹرانسفر کے لیے اس کی ضرورت نہیں ہے، نیچے دیا گیا نوٹ دیکھیں۔
- `signedTx`: اپنے ٹرانزیکشن آبجیکٹ پر دستخط کرنے کے لیے ہم اپنی `PRIVATE_KEY` کے ساتھ `signTransaction` طریقہ کار استعمال کریں گے
- `sendSignedTransaction`: ایک بار جب ہمارے پاس دستخط شدہ ٹرانزیکشن ہو جائے، تو ہم اسے `sendSignedTransaction` کا استعمال کرتے ہوئے بعد کے بلاک میں شامل کرنے کے لیے بھیج سکتے ہیں

**ڈیٹا پر ایک نوٹ**
ایتھریم میں دو اہم اقسام کی ٹرانزیکشنز بھیجی جا سکتی ہیں۔

- بیلنس ٹرانسفر: ایک ایڈریس سے دوسرے ایڈریس پر ETH بھیجیں۔ کسی ڈیٹا فیلڈ کی ضرورت نہیں ہے، تاہم، اگر آپ اپنی ٹرانزیکشن کے ساتھ اضافی معلومات بھیجنا چاہتے ہیں، تو آپ اس فیلڈ میں وہ معلومات HEX فارمیٹ میں شامل کر سکتے ہیں۔
  - مثال کے طور پر، فرض کریں کہ ہم ایک IPFS دستاویز کا ہیش ایتھریم چین پر لکھنا چاہتے ہیں تاکہ اسے ایک ناقابل تغیر ٹائم اسٹیمپ دیا جا سکے۔ تب ہماری ڈیٹا فیلڈ کچھ اس طرح دکھنی چاہیے: `web3.utils.toHex(‘IPFS hash‘)`۔ اور اب کوئی بھی چین سے استفسار (query) کر سکتا ہے اور دیکھ سکتا ہے کہ وہ دستاویز کب شامل کی گئی تھی۔
- اسمارٹ کانٹریکٹ ٹرانزیکشن: چین پر کچھ اسمارٹ کانٹریکٹ کوڈ پر عمل درآمد کریں۔ اس صورت میں، ڈیٹا فیلڈ میں وہ اسمارٹ فنکشن ہونا چاہیے جسے آپ چلانا چاہتے ہیں، ساتھ ہی کوئی بھی پیرامیٹرز۔
  - ایک عملی مثال کے لیے، اس [ہیلو ورلڈ ٹیوٹوریل (Hello World Tutorial)](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction) میں مرحلہ 8 دیکھیں۔

### 8\. `node sendTx.js` کا استعمال کرتے ہوئے کوڈ چلائیں {#run-the-code-using-node-sendtx-js}

اپنے ٹرمینل یا کمانڈ لائن پر واپس جائیں اور چلائیں:

```
node sendTx.js
```

### 9\. میم پول (Mempool) میں اپنی ٹرانزیکشن دیکھیں {#see-your-transaction-in-the-mempool}

اپنے Alchemy ڈیش بورڈ میں [میم پول پیج (Mempool page)](https://dashboard.alchemyapi.io/mempool) کھولیں اور اپنی ٹرانزیکشن تلاش کرنے کے لیے اپنی بنائی گئی ایپ کے ذریعے فلٹر کریں۔ یہ وہ جگہ ہے جہاں ہم اپنی ٹرانزیکشن کو زیر التواء (pending) اسٹیٹ سے مائنڈ (mined) اسٹیٹ (اگر کامیاب ہو) یا ڈراپڈ (dropped) اسٹیٹ (اگر ناکام ہو) میں منتقل ہوتے ہوئے دیکھ سکتے ہیں۔ اسے "All" پر رکھنا یقینی بنائیں تاکہ آپ "mined"، "pending"، اور "dropped" ٹرانزیکشنز کو کیپچر کر سکیں۔ آپ ایڈریس `0x31b98d14007bdee637298086988a0bbd31184523` پر بھیجی گئی ٹرانزیکشنز کو تلاش کر کے بھی اپنی ٹرانزیکشن تلاش کر سکتے ہیں۔

ایک بار جب آپ کو اپنی ٹرانزیکشن مل جائے تو اس کی تفصیلات دیکھنے کے لیے، tx ہیش کو منتخب کریں، جو آپ کو ایک ایسے منظر پر لے جائے گا جو کچھ اس طرح دکھتا ہے:

![Mempool watcher screenshot](./mempool.png)

وہاں سے آپ سرخ دائرے والے آئیکن پر کلک کر کے Etherscan پر اپنی ٹرانزیکشن دیکھ سکتے ہیں!

**زبردست! آپ نے ابھی Alchemy کا استعمال کرتے ہوئے اپنی پہلی ایتھریم ٹرانزیکشن بھیجی ہے 🎉**

_اس گائیڈ کے بارے میں آراء اور تجاویز کے لیے، براہ کرم Alchemy کے [Discord](https://discord.gg/A39JVCM) پر ایلان کو میسج کریں!_

_اصل میں [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy) پر شائع ہوا_