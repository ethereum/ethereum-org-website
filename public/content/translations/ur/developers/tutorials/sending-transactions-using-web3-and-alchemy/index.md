---
title: "⁦viem⁩ کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنا"
description: "یہ ⁦viem⁩ لائبریری کا استعمال کرتے ہوئے ایتھیریم ٹرانزیکشنز بھیجنے کے لیے ایک ابتدائی رہنما ہے۔ ایتھیریم بلاک چین پر ٹرانزیکشن بھیجنے کے لیے تین اہم اقدامات ہیں: بنانا، دستخط کرنا، اور نشر کرنا۔ ہم ان تینوں کا جائزہ لیں گے۔"
author: "ایلان ہیلپرن"
tags:
  - "ٹرانزیکشنز"
  - "viem"
  - "alchemy"
skill: beginner
breadcrumb: "ٹرانزیکشنز بھیجیں"
lang: ur
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

یہ [viem](https://viem.sh/) لائبریری کا استعمال کرتے ہوئے ایتھیریم ٹرانزیکشنز بھیجنے کے لیے ایک ابتدائی رہنما ہے۔ ایتھیریم بلاک چین پر ٹرانزیکشن بھیجنے کے لیے تین اہم اقدامات ہیں: بنانا، دستخط کرنا، اور نشر کرنا۔ ہم ان تینوں کا جائزہ لیں گے، اور امید ہے کہ آپ کے ذہن میں موجود کسی بھی سوال کا جواب دیں گے! اس ٹیوٹوریل میں، ہم اپنی ٹرانزیکشنز کو ایتھیریم چین پر بھیجنے کے لیے [Alchemy](https://www.alchemy.com/) کا استعمال کریں گے۔ آپ [یہاں ایک مفت Alchemy اکاؤنٹ بنا سکتے ہیں](https://auth.alchemy.com/signup)۔

**نوٹ:** یہ گائیڈ آپ کی ایپ کے _بیک اینڈ_ پر آپ کی ٹرانزیکشنز پر دستخط کرنے کے لیے ہے۔ اگر آپ فرنٹ اینڈ پر اپنی ٹرانزیکشنز پر دستخط کرنے کو مربوط کرنا چاہتے ہیں، تو [میٹاماسک پرووائیڈر ایپلیکیشن پروگرامنگ انٹرفیس (API)](https://docs.metamask.io/wallet/reference/provider-api/) دیکھیں۔

## بنیادی باتیں {#the-basics}

زیادہ تر بلاک چین ڈیولپرز کی طرح جب وہ پہلی بار شروعات کرتے ہیں، تو آپ نے بھی ٹرانزیکشن بھیجنے کے طریقے پر کچھ تحقیق کی ہوگی (جو کہ کافی آسان ہونا چاہیے) اور آپ کو بہت سی گائیڈز ملی ہوں گی، جن میں سے ہر ایک مختلف باتیں کہہ رہی ہوگی اور آپ کو تھوڑا سا پریشان اور الجھن میں ڈال دیا ہوگا۔ اگر آپ بھی اسی صورتحال سے دوچار ہیں، تو فکر نہ کریں؛ ہم سب کسی نہ کسی وقت اسی مقام پر تھے! لہذا، شروع کرنے سے پہلے، آئیے کچھ چیزیں واضح کر لیں:

### <span dir="ltr">1.</span> Alchemy آپ کی نجی کلیدیں محفوظ نہیں کرتا ہے {#alchemy-does-not-store-your-private-keys}

- اس کا مطلب ہے کہ Alchemy آپ کی جانب سے ٹرانزیکشنز پر دستخط کر کے انہیں بھیج نہیں سکتا۔ اس کی وجہ سیکیورٹی مقاصد ہیں۔ Alchemy آپ سے کبھی بھی اپنی نجی کلید شیئر کرنے کا نہیں کہے گا، اور آپ کو کبھی بھی اپنی نجی کلید کسی ہوسٹڈ نوڈ (یا کسی اور کے ساتھ) شیئر نہیں کرنی چاہیے۔
- آپ Alchemy کے بنیادی API کا استعمال کرتے ہوئے بلاک چین سے پڑھ سکتے ہیں، لیکن اس پر لکھنے کے لیے آپ کو Alchemy کے ذریعے بھیجنے سے پہلے اپنی ٹرانزیکشنز پر دستخط کرنے کے لیے کسی اور چیز کا استعمال کرنا ہوگا (یہ کسی بھی دوسری [نوڈ سروس](/developers/docs/nodes-and-clients/nodes-as-a-service/) کے لیے بھی یکساں ہے)۔

### <span dir="ltr">2.</span> "سائنر" (signer) کیا ہے؟ {#what-is-a-signer}

- سائنرز آپ کی نجی کلید کا استعمال کرتے ہوئے آپ کے لیے ٹرانزیکشنز پر دستخط کریں گے۔ اس ٹیوٹوریل میں ہم اپنی ٹرانزیکشن پر دستخط کرنے کے لیے [viem](https://viem.sh/) کا استعمال کریں گے، لیکن آپ کوئی بھی دوسری Web3 لائبریری بھی استعمال کر سکتے ہیں۔
- فرنٹ اینڈ پر، سائنر کی ایک اچھی مثال [میٹاماسک](https://metamask.io/) ہوگی، جو آپ کی جانب سے ٹرانزیکشنز پر دستخط کرے گا اور انہیں بھیجے گا۔

### <span dir="ltr">3.</span> مجھے اپنی ٹرانزیکشنز پر دستخط کرنے کی ضرورت کیوں ہے؟ {#why-do-i-need-to-sign-my-transactions}

- ہر صارف جو ایتھیریم نیٹ ورک پر ٹرانزیکشن بھیجنا چاہتا ہے، اسے ٹرانزیکشن پر دستخط کرنا لازمی ہے (اپنی نجی کلید کا استعمال کرتے ہوئے)، تاکہ یہ تصدیق کی جا سکے کہ ٹرانزیکشن کا آغاز کرنے والا وہی ہے جو وہ دعویٰ کر رہا ہے۔
- اس نجی کلید کی حفاظت کرنا انتہائی اہم ہے، کیونکہ اس تک رسائی حاصل ہونے سے آپ کے ایتھیریم اکاؤنٹ پر مکمل کنٹرول مل جاتا ہے، جس سے آپ (یا رسائی رکھنے والا کوئی بھی شخص) آپ کی جانب سے ٹرانزیکشنز انجام دے سکتا ہے۔

### <span dir="ltr">4.</span> میں اپنی نجی کلید کی حفاظت کیسے کروں؟ {#how-do-i-protect-my-private-key}

- آپ کی نجی کلید کی حفاظت کرنے اور اسے ٹرانزیکشنز بھیجنے کے لیے استعمال کرنے کے کئی طریقے ہیں۔ اس ٹیوٹوریل میں ہم ایک `.env` فائل کا استعمال کریں گے۔ تاہم، آپ ایک الگ پرووائیڈر بھی استعمال کر سکتے ہیں جو نجی کلیدیں محفوظ کرتا ہو، کی اسٹور فائل استعمال کر سکتے ہیں، یا دیگر آپشنز آزما سکتے ہیں۔

### <span dir="ltr">5.</span> `eth_sendTransaction` اور `eth_sendRawTransaction` کے درمیان کیا فرق ہے؟ {#difference-between-send-and-send-raw}

`eth_sendTransaction` اور `eth_sendRawTransaction` دونوں ایتھیریم API فنکشنز ہیں جو ایتھیریم نیٹ ورک پر ٹرانزیکشن نشر کرتے ہیں تاکہ اسے مستقبل کے بلاک میں شامل کیا جا سکے۔ ان میں فرق اس بات میں ہے کہ وہ ٹرانزیکشنز پر دستخط کرنے کے عمل کو کیسے سنبھالتے ہیں۔

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) کا استعمال _بغیر دستخط شدہ_ ٹرانزیکشنز بھیجنے کے لیے کیا جاتا ہے، جس کا مطلب ہے کہ جس نوڈ کو آپ بھیج رہے ہیں اسے آپ کی نجی کلید کا انتظام کرنا ہوگا تاکہ وہ ٹرانزیکشن کو چین پر نشر کرنے سے پہلے اس پر دستخط کر سکے۔ چونکہ Alchemy صارفین کی نجی کلیدیں نہیں رکھتا، اس لیے وہ اس طریقے کو سپورٹ نہیں کرتے۔
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) کا استعمال ان ٹرانزیکشنز کو نشر کرنے کے لیے کیا جاتا ہے جن پر پہلے ہی دستخط ہو چکے ہوں۔ اس کا مطلب ہے کہ آپ کو پہلے اپنی نجی کلید کے ساتھ ٹرانزیکشن پر دستخط کرنا ہوگا (viem میں، [مقامی اکاؤنٹ](https://viem.sh/docs/accounts/local/privateKeyToAccount) کے ساتھ [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) کا استعمال کرتے ہوئے)، پھر اس کے نتیجے کو `eth_sendRawTransaction` میں پاس کرنا ہوگا۔

viem کا استعمال کرتے وقت، [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction) فنکشن کو کال کر کے `eth_sendRawTransaction` تک رسائی حاصل کی جاتی ہے۔

اس ٹیوٹوریل میں ہم یہی استعمال کریں گے۔

### <span dir="ltr">6.</span> Web3 لائبریری کیا ہے؟ {#what-is-the-web3-library}

- Web3 لائبریری معیاری [جے سن آر پی سی کالز](/developers/docs/apis/json-rpc/) کے گرد ایک ریپر (wrapper) ہے جس کا استعمال ایتھیریم ڈیولپمنٹ میں کافی عام ہے۔
- مختلف زبانوں کے لیے کئی Web3 لائبریریاں موجود ہیں۔ اس ٹیوٹوریل میں ہم [viem](https://viem.sh/) کا استعمال کریں گے، جو TypeScript میں لکھی گئی ہے اور کسی بھی JavaScript پروجیکٹ میں کام کرتی ہے۔ آپ [یہاں](/developers/docs/apis/javascript/) دیگر آپشنز جیسے [ethers.js](https://docs.ethers.org/v6/) دیکھ سکتے ہیں۔

ٹھیک ہے، اب جب کہ ہم نے ان میں سے کچھ سوالات کو حل کر لیا ہے، آئیے ٹیوٹوریل کی طرف بڑھتے ہیں۔ Alchemy کے [ڈسکارڈ](https://discord.gg/gWuC7zB) میں کسی بھی وقت بلا جھجھک سوالات پوچھیں!

### <span dir="ltr">7.</span> محفوظ، گیس کے لحاظ سے بہتر، اور نجی ٹرانزیکشنز کیسے بھیجیں؟ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy کے پاس ٹرانزیکشن وسائل کا ایک مجموعہ ہے](https://www.alchemy.com/docs/sending-transactions)۔ آپ ان کا استعمال ٹرانزیکشنز بھیجنے، ٹرانزیکشنز کے ہونے سے پہلے ان کی نقل (simulate) کرنے، نجی ٹرانزیکشنز بھیجنے، اور گیس کے لحاظ سے بہتر ٹرانزیکشنز بھیجنے کے لیے کر سکتے ہیں۔
- آپ [Alchemy ویب ہکس](https://www.alchemy.com/docs/reference/webhooks-overview) کا استعمال بھی کر سکتے ہیں تاکہ جب آپ کی ٹرانزیکشن کو میم پول سے نکال کر چین میں شامل کیا جائے تو آپ کو الرٹ مل سکے۔

**نوٹ:** اس گائیڈ کے لیے ایک Alchemy اکاؤنٹ، ایک ایتھیریم پتہ یا میٹاماسک والیٹ، Node.js، اور npm کا انسٹال ہونا ضروری ہے۔ اگر نہیں، تو ان اقدامات پر عمل کریں:

1.  [ایک مفت Alchemy اکاؤنٹ بنائیں](https://auth.alchemy.com/signup)
2.  [میٹاماسک اکاؤنٹ بنائیں](https://metamask.io/) (یا ایک ایتھیریم پتہ حاصل کریں)
3.  [Node.js اور npm انسٹال کریں](https://nodejs.org/en/download/)

## اپنی ٹرانزیکشن بھیجنے کے اقدامات {#steps-to-sending-your-transaction}

### <span dir="ltr">1.</span> Sepolia آزمائشی نیٹ ورک پر ایک Alchemy ایپ بنائیں {#create-an-alchemy-app-on-the-sepolia-testnet}

اپنے [Alchemy ڈیش بورڈ](https://dashboard.alchemy.com/) پر جائیں اور اپنے نیٹ ورک کے لیے Sepolia (یا کوئی اور آزمائشی نیٹ ورک) کا انتخاب کرتے ہوئے ایک نئی ایپ بنائیں۔

### <span dir="ltr">2.</span> Sepolia فوسٹ سے ETH کی درخواست کریں {#request-eth-from-sepolia-faucet}

ETH حاصل کرنے کے لیے [Alchemy Sepolia فوسٹ](https://www.alchemy.com/faucets/ethereum-sepolia) پر دی گئی ہدایات پر عمل کریں، یا دیگر [Sepolia فوسٹس](/developers/docs/networks/#sepolia) میں سے کسی ایک کا استعمال کریں۔ فوسٹس چھوٹی مقداریں دیتے ہیں (Alchemy فوسٹ روزانہ <span dir="ltr">0.1 ETH</span> دیتا ہے)، جو اس ٹیوٹوریل کے لیے کافی ہے۔ یقینی بنائیں کہ آپ اپنا **Sepolia** ایتھیریم پتہ (میٹاماسک سے) شامل کریں نہ کہ کسی دوسرے نیٹ ورک کا۔ ہدایات پر عمل کرنے کے بعد، دوبارہ چیک کریں کہ آپ کو اپنے والیٹ میں ETH موصول ہو گیا ہے۔

### <span dir="ltr">3.</span> ایک نئی پروجیکٹ ڈائریکٹری بنائیں اور اس میں `cd` کریں {#create-a-new-project-direction}

کمانڈ لائن (میک کے لیے ٹرمینل) سے ایک نئی پروجیکٹ ڈائریکٹری بنائیں اور اس میں جائیں:

```sh
mkdir sendtx-example
cd sendtx-example
```

### <span dir="ltr">4.</span> viem (یا کوئی بھی Web3 لائبریری) انسٹال کریں {#install-alchemy-web3}

[viem](https://viem.sh/) انسٹال کرنے کے لیے اپنی پروجیکٹ ڈائریکٹری میں درج ذیل کمانڈ چلائیں:

نوٹ، اگر آپ ethers.js لائبریری استعمال کرنا چاہتے ہیں، تو [یہاں دی گئی ہدایات پر عمل کریں](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum)۔

```sh
npm init -y
npm install viem
```

### <span dir="ltr">5.</span> dotenv انسٹال کریں {#install-dotenv}

ہم اپنی API کلید اور نجی کلید کو محفوظ طریقے سے اسٹور کرنے کے لیے ایک `.env` فائل کا استعمال کریں گے۔

```sh
npm install dotenv
```

### <span dir="ltr">6.</span> `.env` فائل بنائیں {#create-the-dotenv-file}

اپنی پروجیکٹ ڈائریکٹری میں ایک `.env` فائل بنائیں اور درج ذیل شامل کریں ("`your-api-url`" اور "`your-private-key`" کو تبدیل کرتے ہوئے)

- اپنا Alchemy API URL تلاش کرنے کے لیے، اپنے ڈیش بورڈ پر ابھی بنائی گئی ایپ کے ایپ ڈیٹیلز پیج پر جائیں، اوپری دائیں کونے میں "View Key" پر کلک کریں، اور HTTP URL حاصل کریں۔
- میٹاماسک کا استعمال کرتے ہوئے اپنی نجی کلید تلاش کرنے کے لیے، یہ [گائیڈ](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) دیکھیں۔ ایسا اکاؤنٹ استعمال کریں جس میں صرف آزمائشی نیٹ ورک کا ETH ہو۔

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> کو کمٹ (commit) نہ کریں! براہ کرم یقینی بنائیں کہ آپ کبھی بھی اپنی <code>.env</code> فائل کو کسی کے ساتھ شیئر یا ظاہر نہ کریں، کیونکہ ایسا کرنے سے آپ اپنے رازوں کو خطرے میں ڈال رہے ہیں۔ اگر آپ ورژن کنٹرول استعمال کر رہے ہیں، تو اپنی <code>.env</code> کو ایک <a href="https://git-scm.com/docs/gitignore">gitignore</a> فائل میں شامل کریں۔
</AlertDescription>
</AlertContent>
</Alert>

### <span dir="ltr">7.</span> `sendTx.js` فائل بنائیں {#create-sendtx-js}

بہت خوب، اب جب کہ ہم نے اپنا حساس ڈیٹا ایک `.env` فائل میں محفوظ کر لیا ہے، آئیے کوڈنگ شروع کرتے ہیں۔ ہماری ٹرانزیکشن بھیجنے کی مثال کے لیے، ہم آپ کے کنٹرول میں موجود کسی دوسرے پتے پر <span dir="ltr">0.001 ETH</span> بھیجیں گے، جیسے کہ میٹاماسک میں دوسرا اکاؤنٹ۔

ایک `sendTx.js` فائل بنائیں، جہاں ہم اپنی مثالی ٹرانزیکشن کو کنفیگر کریں گے اور بھیجیں گے، اور اس میں کوڈ کی درج ذیل لائنیں شامل کریں:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // نانس کی گنتی 0 سے شروع ہوتی ہے

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: اس پتہ سے تبدیل کریں جس پر آپ ETH بھیجنا چاہتے ہیں
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // پیغام بھیجنے یا سمارٹ کنٹریکٹ چلانے کے لیے اختیاری ڈیٹا فیلڈ
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

یقینی بنائیں کہ آپ `0xYourSecondAddress` کو اس پتے سے تبدیل کریں جس پر آپ ETH بھیجنا چاہتے ہیں۔ اسکرپٹ آپ کا اپنا (بھیجنے والا) پتہ `PRIVATE_KEY` سے اخذ کرتا ہے، اس لیے آپ کو اسے درج کرنے کی ضرورت نہیں ہے۔

اب، اس کوڈ کو چلانے سے پہلے، آئیے یہاں موجود کچھ اجزاء کے بارے میں بات کرتے ہیں۔

- `account`: [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) کے ساتھ آپ کی نجی کلید سے بنایا گیا ایک مقامی اکاؤنٹ۔ دستخط کرنے کا عمل آپ کی مشین پر ہوتا ہے، اور نجی کلید کبھی بھی Alchemy کو نہیں بھیجی جاتی۔
- `publicClient` اور `walletClient`: viem کلائنٹس جو آپ کے Alchemy URL پر جے سن آر پی سی درخواستیں بھیجتے ہیں۔ پبلک کلائنٹ چین سے پڑھتا ہے، اور والیٹ کلائنٹ آپ کے اکاؤنٹ کے لیے ٹرانزیکشنز تیار کرتا ہے اور ان پر دستخط کرتا ہے۔
- `nonce` : نانس کی تخصیص کا استعمال آپ کے پتے سے بھیجی گئی ٹرانزیکشنز کی تعداد کا ٹریک رکھنے کے لیے کیا جاتا ہے۔ ہمیں سیکیورٹی مقاصد اور ری پلے حملوں (replay attacks) کو روکنے کے لیے اس کی ضرورت ہوتی ہے۔ آپ کے پتے سے بھیجی گئی ٹرانزیکشنز کی تعداد حاصل کرنے کے لیے ہم [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count) کا استعمال کرتے ہیں۔ viem بھی اسے آپ کے لیے پُر کر دے گا، لیکن ہم اسے یہاں واضح طور پر حاصل کرتے ہیں تاکہ یہ دکھایا جا سکے کہ یہ کہاں سے آتا ہے۔
- `transaction`: ٹرانزیکشن آبجیکٹ کے کچھ پہلو ہیں جن کی ہمیں وضاحت کرنے کی ضرورت ہے۔ [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) موجودہ نیٹ ورک کے حالات کی بنیاد پر ہمارے لیے باقی چیزیں پُر کرتا ہے، بشمول `chainId` اور [<span dir="ltr">EIP-1559</span>](/developers/docs/gas/) فیس فیلڈز `maxFeePerGas` اور `maxPriorityFeePerGas`۔
  - `to`: یہ وہ پتہ ہے جس پر ہم ETH بھیجنا چاہتے ہیں۔
  - `value`: یہ وہ رقم ہے جو ہم بھیجنا چاہتے ہیں، جسے Wei میں بیان کیا گیا ہے جہاں <span dir="ltr">10^18 Wei = 1 ETH</span> ہے۔ [`parseEther`](https://viem.sh/docs/utilities/parseEther) ہمارے لیے ETH کی رقم کو Wei میں تبدیل کرتا ہے۔ آپ کے اکاؤنٹ کو اس سے تھوڑی زیادہ رقم کی ضرورت ہوتی ہے، کیونکہ یہ گیس کی ادائیگی بھی کرتا ہے۔
  - `gas`: آپ کی ٹرانزیکشن کے ساتھ شامل کرنے کے لیے گیس کی صحیح مقدار کا تعین کرنے کے کئی طریقے ہیں۔ Alchemy [ویب ہکس](https://www.alchemy.com/docs/reference/webhooks-overview) کو سپورٹ کرتا ہے جو آپ کو آن چین سرگرمی کے بارے میں مطلع کر سکتے ہیں۔ مین نیٹ ٹرانزیکشنز کے لیے، شامل کرنے کے لیے گیس کی صحیح مقدار کا تعین کرنے کے لیے موجودہ گیس کے حالات کو چیک کرنا ایک اچھی پریکٹس ہے۔ ایک عام پتے پر سادہ ETH منتقلی ہمیشہ بالکل <span dir="ltr">21000</span> گیس استعمال کرتی ہے، جو کسی بھی ٹرانزیکشن کے لیے کم از کم ہے، اس لیے ہم یہاں <span dir="ltr">21000</span> ڈالتے ہیں۔ اگر آپ `gas` کو چھوڑ دیتے ہیں، تو viem آپ کے لیے اس کا تخمینہ لگاتا ہے۔
  - `nonce`: اوپر نانس کی تعریف دیکھیں۔ نانس کی گنتی صفر سے شروع ہوتی ہے۔
  - [اختیاری] ڈیٹا: آپ کی منتقلی کے ساتھ اضافی معلومات بھیجنے، یا سمارٹ کنٹریکٹ کو کال کرنے کے لیے استعمال کیا جاتا ہے، بیلنس کی منتقلی کے لیے اس کی ضرورت نہیں ہے، نیچے دیا گیا نوٹ دیکھیں۔
- `signedTx`: اپنے ٹرانزیکشن آبجیکٹ پر دستخط کرنے کے لیے ہم `signTransaction` طریقہ استعمال کریں گے، جو ہمارے `PRIVATE_KEY` سے بنائے گئے اکاؤنٹ کے ساتھ مقامی طور پر اس پر دستخط کرتا ہے۔
- `sendRawTransaction`: ایک بار جب ہمارے پاس دستخط شدہ ٹرانزیکشن ہو جائے، تو ہم اسے `sendRawTransaction` کا استعمال کرتے ہوئے بعد کے بلاک میں شامل کرنے کے لیے بھیج سکتے ہیں، جو `eth_sendRawTransaction` کو کال کرتا ہے۔
- `waitForTransactionReceipt`: ٹرانزیکشن کے بلاک میں شامل ہونے تک انتظار کرتا ہے اور اس کی رسید واپس کرتا ہے۔

**ڈیٹا پر ایک نوٹ**
ایتھیریم میں دو اہم اقسام کی ٹرانزیکشنز بھیجی جا سکتی ہیں۔

- بیلنس کی منتقلی: ایک پتے سے دوسرے پتے پر ETH بھیجیں۔ کسی ڈیٹا فیلڈ کی ضرورت نہیں ہے، تاہم، اگر آپ اپنی ٹرانزیکشن کے ساتھ اضافی معلومات بھیجنا چاہتے ہیں، تو آپ اس فیلڈ میں HEX فارمیٹ میں وہ معلومات شامل کر سکتے ہیں۔
  - مثال کے طور پر، فرض کریں کہ ہم ایک IPFS دستاویز کا ہیش ایتھیریم چین پر لکھنا چاہتے ہیں تاکہ اسے ایک ناقابلِ تبدیلی ٹائم اسٹیمپ دیا جا سکے۔ تب ہمارا ڈیٹا فیلڈ viem کے [`toHex`](https://viem.sh/docs/utilities/toHex) کا استعمال کرتے ہوئے `data: toHex("IPFS hash")` جیسا نظر آنا چاہیے۔ اور اب کوئی بھی چین سے استفسار (query) کر سکتا ہے اور دیکھ سکتا ہے کہ وہ دستاویز کب شامل کی گئی تھی۔
- سمارٹ کنٹریکٹ ٹرانزیکشن: چین پر کچھ سمارٹ کنٹریکٹ کوڈ پر عمل درآمد کریں۔ اس صورت میں، ڈیٹا فیلڈ میں وہ سمارٹ فنکشن ہونا چاہیے جسے آپ کسی بھی پیرامیٹرز کے ساتھ عمل میں لانا چاہتے ہیں۔
  - ایک عملی مثال کے لیے، [ہیلو ورلڈ سمارٹ کنٹریکٹ ٹیوٹوریل](/developers/tutorials/hello-world-smart-contract/) دیکھیں۔

### <span dir="ltr">8.</span> `node sendTx.js` کا استعمال کرتے ہوئے کوڈ چلائیں {#run-the-code-using-node-sendtx-js}

اپنے ٹرمینل یا کمانڈ لائن پر واپس جائیں اور چلائیں:

```sh
node sendTx.js
```

### <span dir="ltr">9.</span> بلاک ایکسپلورر پر اپنی ٹرانزیکشن دیکھیں {#see-your-transaction-in-the-mempool}

جیسے ہی نوڈ ٹرانزیکشن کو قبول کرتا ہے، اسکرپٹ ٹرانزیکشن ہیش پرنٹ کرتا ہے، پھر اس کے بلاک میں شامل ہونے تک انتظار کرتا ہے (عام طور پر چند سیکنڈ کے اندر) اور نتیجہ پرنٹ کرتا ہے۔ تفصیلات دیکھنے کے لیے، ہیش کو Sepolia بلاک ایکسپلورر جیسے [Sepolia Etherscan](https://sepolia.etherscan.io/) یا [Blockscout](https://eth-sepolia.blockscout.com/) میں پیسٹ کریں۔ وہاں آپ ٹرانزیکشن کو زیر التواء (pending) سے شامل ہونے تک دیکھ سکتے ہیں، اور وہ رقم، فیس اور بلاک دیکھ سکتے ہیں جس میں یہ شامل ہوئی ہے۔

اگر آپ کو اس کے بجائے `insufficient funds` ایرر نظر آتا ہے، تو آپ کے اکاؤنٹ میں ویلیو اور گیس کو پورا کرنے کے لیے کافی Sepolia ETH نہیں ہے۔ مرحلہ 2 پر واپس جائیں اور فوسٹ سے مزید درخواست کریں۔

**زبردست! آپ نے ابھی Alchemy کا استعمال کرتے ہوئے اپنی پہلی ایتھیریم ٹرانزیکشن بھیجی ہے 🎉**

_اس گائیڈ کے بارے میں تاثرات اور تجاویز کے لیے، براہ کرم Alchemy کے [ڈسکارڈ](https://discord.gg/gWuC7zB) پر ایلان کو پیغام بھیجیں!_

_اصل میں Alchemy کی طرف سے شائع کیا گیا ہے۔_
