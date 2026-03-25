---
title: "NFT منٹر ٹیوٹوریل"
description: "اس ٹیوٹوریل میں، آپ ایک NFT منٹر بنائیں گے اور سیکھیں گے کہ MetaMask اور Web3 ٹولز کا استعمال کرتے ہوئے اپنے اسمارٹ کانٹریکٹ کو React فرنٹ اینڈ سے جوڑ کر ایک فل اسٹیک ڈیپ (dapp) کیسے بنائی جائے۔"
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "اسمارٹ کانٹریکٹس", "فرنٹ اینڈ", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: "NFT منٹر ڈیپ"
lang: ur
published: 2021-10-06
---

Web2 پس منظر سے آنے والے ڈیولپرز کے لیے سب سے بڑے چیلنجز میں سے ایک یہ جاننا ہے کہ اپنے اسمارٹ کانٹریکٹ کو فرنٹ اینڈ پروجیکٹ سے کیسے جوڑا جائے اور اس کے ساتھ کیسے تعامل (interact) کیا جائے۔

ایک NFT منٹر بنا کر — ایک سادہ UI جہاں آپ اپنے ڈیجیٹل اثاثے کا لنک، ایک عنوان، اور ایک تفصیل درج کر سکتے ہیں — آپ سیکھیں گے کہ:

- اپنے فرنٹ اینڈ پروجیکٹ کے ذریعے MetaMask سے کیسے جڑیں
- اپنے فرنٹ اینڈ سے اسمارٹ کانٹریکٹ کے میتھڈز کو کیسے کال کریں
- MetaMask کا استعمال کرتے ہوئے ٹرانزیکشنز پر کیسے دستخط کریں

اس ٹیوٹوریل میں، ہم [React](https://react.dev/) کو اپنے فرنٹ اینڈ فریم ورک کے طور پر استعمال کریں گے۔ چونکہ یہ ٹیوٹوریل بنیادی طور پر Web3 ڈیولپمنٹ پر مرکوز ہے، اس لیے ہم React کی بنیادی باتوں کو سمجھانے میں زیادہ وقت صرف نہیں کریں گے۔ اس کے بجائے، ہم اپنے پروجیکٹ میں فعالیت (functionality) لانے پر توجہ مرکوز کریں گے۔

ایک شرط کے طور پر، آپ کو React کی ابتدائی سطح کی سمجھ ہونی چاہیے—یہ جاننا چاہیے کہ components، props، useState/useEffect، اور بنیادی فنکشن کالنگ کیسے کام کرتی ہے۔ اگر آپ نے پہلے کبھی ان اصطلاحات کے بارے میں نہیں سنا ہے، تو آپ یہ [Intro to React tutorial](https://react.dev/learn/tutorial-tic-tac-toe) دیکھ سکتے ہیں۔ زیادہ بصری (visual) سیکھنے والوں کے لیے، ہم Net Ninja کی اس بہترین [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) ویڈیو سیریز کی انتہائی سفارش کرتے ہیں۔

اور اگر آپ نے پہلے سے ایسا نہیں کیا ہے، تو آپ کو اس ٹیوٹوریل کو مکمل کرنے کے ساتھ ساتھ بلاک چین پر کچھ بھی بنانے کے لیے یقینی طور پر ایک Alchemy اکاؤنٹ کی ضرورت ہوگی۔ ایک مفت اکاؤنٹ کے لیے [یہاں](https://alchemy.com/) سائن اپ کریں۔

مزید تاخیر کے بغیر، آئیے شروع کرتے ہیں!

## NFTs بنانا 101 {#making-nfts-101}

اس سے پہلے کہ ہم کسی کوڈ کو دیکھنا شروع کریں، یہ سمجھنا ضروری ہے کہ NFT بنانا کیسے کام کرتا ہے۔ اس میں دو مراحل شامل ہیں:

### Ethereum بلاک چین پر ایک NFT اسمارٹ کانٹریکٹ شائع کریں {#publish-nft}

دو NFT اسمارٹ کانٹریکٹ معیارات کے درمیان سب سے بڑا فرق یہ ہے کہ ERC-1155 ایک ملٹی ٹوکن معیار ہے اور اس میں بیچ (batch) فعالیت شامل ہے، جبکہ ERC-721 ایک سنگل ٹوکن معیار ہے اور اس لیے ایک وقت میں صرف ایک ٹوکن کی منتقلی کو سپورٹ کرتا ہے۔

### منٹنگ فنکشن کو کال کریں {#minting-function}

عام طور پر، اس منٹنگ فنکشن کے لیے آپ کو دو متغیرات (variables) کو پیرامیٹرز کے طور پر پاس کرنے کی ضرورت ہوتی ہے، پہلا `recipient`، جو اس ایڈریس کی وضاحت کرتا ہے جو آپ کا تازہ ترین منٹ کیا گیا NFT وصول کرے گا، اور دوسرا NFT کا `tokenURI`، ایک اسٹرنگ جو ایک JSON دستاویز کو حل کرتی ہے جو NFT کے میٹا ڈیٹا کو بیان کرتی ہے۔

ایک NFT کا میٹا ڈیٹا واقعی وہ چیز ہے جو اسے زندہ کرتا ہے، جس سے اس میں خصوصیات شامل ہوتی ہیں، جیسے کہ نام، تفصیل، تصویر (یا مختلف ڈیجیٹل اثاثہ)، اور دیگر اوصاف۔ یہاں [tokenURI کی ایک مثال](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2) ہے، جس میں ایک NFT کا میٹا ڈیٹا شامل ہے۔

اس ٹیوٹوریل میں، ہم حصہ 2 پر توجہ مرکوز کرنے جا رہے ہیں، جو کہ ہمارے React UI کا استعمال کرتے ہوئے ایک موجودہ NFT کے اسمارٹ کانٹریکٹ منٹنگ فنکشن کو کال کرنا ہے۔

[یہاں ایک لنک ہے](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) اس ERC-721 NFT اسمارٹ کانٹریکٹ کا جسے ہم اس ٹیوٹوریل میں کال کریں گے۔ اگر آپ یہ سیکھنا چاہتے ہیں کہ ہم نے اسے کیسے بنایا، تو ہم انتہائی سفارش کرتے ہیں کہ آپ ہمارا دوسرا ٹیوٹوریل، ["How to Create an NFT"](https://www.alchemy.com/docs/how-to-create-an-nft) دیکھیں۔

زبردست، اب جب کہ ہم سمجھ گئے ہیں کہ NFT بنانا کیسے کام کرتا ہے، آئیے اپنی اسٹارٹر فائلوں کو کلون کریں!

## اسٹارٹر فائلوں کو کلون کریں {#clone-the-starter-files}

سب سے پہلے، اس پروجیکٹ کے لیے اسٹارٹر فائلیں حاصل کرنے کے لیے [nft-minter-tutorial GitHub repository](https://github.com/alchemyplatform/nft-minter-tutorial) پر جائیں۔ اس ریپوزٹری کو اپنے مقامی ماحول (local environment) میں کلون کریں۔

جب آپ اس کلون شدہ `nft-minter-tutorial` ریپوزٹری کو کھولیں گے، تو آپ دیکھیں گے کہ اس میں دو فولڈرز ہیں: `minter-starter-files` اور `nft-minter`۔

- `minter-starter-files` میں اس پروجیکٹ کے لیے اسٹارٹر فائلیں (بنیادی طور پر React UI) شامل ہیں۔ اس ٹیوٹوریل میں، **ہم اس ڈائرکٹری میں کام کریں گے**، کیونکہ آپ سیکھیں گے کہ اس UI کو اپنے Ethereum والیٹ اور ایک NFT اسمارٹ کانٹریکٹ سے جوڑ کر کیسے زندہ کیا جائے۔
- `nft-minter` میں مکمل شدہ ٹیوٹوریل شامل ہے اور یہ آپ کے لیے ایک **حوالہ (reference)** کے طور پر موجود ہے **اگر آپ کہیں پھنس جائیں۔**

اس کے بعد، اپنے کوڈ ایڈیٹر میں `minter-starter-files` کی اپنی کاپی کھولیں، اور پھر اپنے `src` فولڈر میں جائیں۔

ہم جو بھی کوڈ لکھیں گے وہ `src` فولڈر کے اندر ہوگا۔ ہم `Minter.js` جزو (component) میں ترمیم کریں گے اور اپنے پروجیکٹ کو Web3 فعالیت دینے کے لیے اضافی جاوا اسکرپٹ فائلیں لکھیں گے۔

## مرحلہ 2: ہماری اسٹارٹر فائلوں کو چیک کریں {#step-2-check-out-our-starter-files}

اس سے پہلے کہ ہم کوڈنگ شروع کریں، یہ چیک کرنا ضروری ہے کہ اسٹارٹر فائلوں میں ہمارے لیے پہلے سے کیا فراہم کیا گیا ہے۔

### اپنے react پروجیکٹ کو چلائیں {#get-your-react-project-running}

آئیے اپنے براؤزر میں React پروجیکٹ کو چلا کر شروع کریں۔ React کی خوبصورتی یہ ہے کہ ایک بار جب ہمارا پروجیکٹ ہمارے براؤزر میں چل رہا ہوتا ہے، تو ہم جو بھی تبدیلیاں محفوظ کرتے ہیں وہ ہمارے براؤزر میں لائیو اپ ڈیٹ ہو جائیں گی۔

پروجیکٹ کو چلانے کے لیے، `minter-starter-files` فولڈر کی روٹ ڈائرکٹری میں جائیں، اور پروجیکٹ کی انحصار (dependencies) کو انسٹال کرنے کے لیے اپنے ٹرمینل میں `npm install` چلائیں:

```bash
cd minter-starter-files
npm install
```

ایک بار جب وہ انسٹال ہو جائیں، تو اپنے ٹرمینل میں `npm start` چلائیں:

```bash
npm start
```

ایسا کرنے سے آپ کے براؤزر میں http://localhost:3000/ کھلنا چاہیے، جہاں آپ کو ہمارے پروجیکٹ کا فرنٹ اینڈ نظر آئے گا۔ اس میں 3 فیلڈز ہونی چاہئیں: آپ کے NFT کے اثاثے کا لنک درج کرنے کی جگہ، اپنے NFT کا نام درج کریں، اور ایک تفصیل فراہم کریں۔

اگر آپ "Connect Wallet" یا "Mint NFT" بٹنوں پر کلک کرنے کی کوشش کرتے ہیں، تو آپ دیکھیں گے کہ وہ کام نہیں کرتے—ایسا اس لیے ہے کیونکہ ہمیں ابھی بھی ان کی فعالیت کو پروگرام کرنے کی ضرورت ہے! :\)

### Minter.js جزو (component) {#minter-js}

**نوٹ:** یقینی بنائیں کہ آپ `minter-starter-files` فولڈر میں ہیں نہ کہ `nft-minter` فولڈر میں!

آئیے اپنے ایڈیٹر میں `src` فولڈر میں واپس جائیں اور `Minter.js` فائل کھولیں۔ یہ بہت اہم ہے کہ ہم اس فائل میں موجود ہر چیز کو سمجھیں، کیونکہ یہ وہ بنیادی React جزو ہے جس پر ہم کام کریں گے۔

اس فائل کے اوپری حصے میں، ہمارے پاس ہمارے اسٹیٹ (state) متغیرات ہیں جنہیں ہم مخصوص واقعات کے بعد اپ ڈیٹ کریں گے۔

```javascript
// سٹیٹ ویری ایبلز
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React اسٹیٹ متغیرات یا اسٹیٹ ہکس کے بارے میں کبھی نہیں سنا؟ [یہ](https://legacy.reactjs.org/docs/hooks-state.html) دستاویزات دیکھیں۔

یہاں بتایا گیا ہے کہ ہر متغیر کس چیز کی نمائندگی کرتا ہے:

- `walletAddress` - ایک اسٹرنگ جو صارف کے والیٹ کا ایڈریس اسٹور کرتی ہے
- `status` - ایک اسٹرنگ جس میں UI کے نچلے حصے میں دکھانے کے لیے ایک پیغام ہوتا ہے
- `name` - ایک اسٹرنگ جو NFT کا نام اسٹور کرتی ہے
- `description` - ایک اسٹرنگ جو NFT کی تفصیل اسٹور کرتی ہے
- `url` - ایک اسٹرنگ جو NFT کے ڈیجیٹل اثاثے کا لنک ہے

اسٹیٹ متغیرات کے بعد، آپ کو تین غیر نافذ شدہ (un-implemented) فنکشنز نظر آئیں گے: `useEffect`، `connectWalletPressed`، اور `onMintPressed`۔ آپ دیکھیں گے کہ یہ تمام فنکشنز `async` ہیں، ایسا اس لیے ہے کیونکہ ہم ان میں غیر مطابقت پذیر (asynchronous) API کالز کریں گے! ان کے نام ان کی فعالیت کے مطابق ہیں:

```javascript
useEffect(async () => {
  // TODO: لاگو کریں
}, [])

const connectWalletPressed = async () => {
  // TODO: لاگو کریں
}

const onMintPressed = async () => {
  // TODO: لاگو کریں
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - یہ ایک React ہک ہے جسے آپ کے جزو کے رینڈر ہونے کے بعد کال کیا جاتا ہے۔ چونکہ اس میں ایک خالی سرنی (array) `[]` پروپ پاس کیا گیا ہے (لائن 3 دیکھیں)، اس لیے اسے صرف جزو کے _پہلے_ رینڈر پر کال کیا جائے گا۔ یہاں ہم اپنے والیٹ لسنر اور ایک اور والیٹ فنکشن کو کال کریں گے تاکہ ہمارے UI کو اپ ڈیٹ کیا جا سکے تاکہ یہ ظاہر ہو سکے کہ آیا کوئی والیٹ پہلے سے جڑا ہوا ہے۔
- `connectWalletPressed` - اس فنکشن کو صارف کے MetaMask والیٹ کو ہماری ڈیپ سے جوڑنے کے لیے کال کیا جائے گا۔
- `onMintPressed` - اس فنکشن کو صارف کا NFT منٹ کرنے کے لیے کال کیا جائے گا۔

اس فائل کے اختتام کے قریب، ہمارے پاس اپنے جزو کا UI ہے۔ اگر آپ اس کوڈ کو بغور دیکھیں، تو آپ دیکھیں گے کہ ہم اپنے `url`، `name`، اور `description` اسٹیٹ متغیرات کو اپ ڈیٹ کرتے ہیں جب ان کے متعلقہ ٹیکسٹ فیلڈز میں ان پٹ تبدیل ہوتا ہے۔

آپ یہ بھی دیکھیں گے کہ `connectWalletPressed` اور `onMintPressed` کو اس وقت کال کیا جاتا ہے جب بالترتیب `mintButton` اور `walletButton` IDs والے بٹنوں پر کلک کیا جاتا ہے۔

```javascript
// ہمارے کمپوننٹ کا UI
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

آخر میں، آئیے اس بات پر توجہ دیں کہ یہ Minter جزو کہاں شامل کیا گیا ہے۔

اگر آپ `App.js` فائل پر جاتے ہیں، جو کہ React میں مرکزی جزو ہے جو دیگر تمام اجزاء کے لیے ایک کنٹینر کے طور پر کام کرتا ہے، تو آپ دیکھیں گے کہ ہمارا Minter جزو لائن 7 پر شامل کیا گیا ہے۔

**اس ٹیوٹوریل میں، ہم صرف `Minter.js file` میں ترمیم کریں گے اور اپنے `src` فولڈر میں فائلیں شامل کریں گے۔**

اب جب کہ ہم سمجھ گئے ہیں کہ ہم کس چیز کے ساتھ کام کر رہے ہیں، آئیے اپنا Ethereum والیٹ سیٹ اپ کریں!

## اپنا Ethereum والیٹ سیٹ اپ کریں {#set-up-your-ethereum-wallet}

صارفین کو آپ کے اسمارٹ کانٹریکٹ کے ساتھ تعامل کرنے کے قابل ہونے کے لیے انہیں اپنے Ethereum والیٹ کو آپ کی ڈیپ سے جوڑنے کی ضرورت ہوگی۔

### MetaMask ڈاؤن لوڈ کریں {#download-metamask}

اس ٹیوٹوریل کے لیے، ہم MetaMask کا استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جسے آپ کے Ethereum اکاؤنٹ کے ایڈریس کو منظم کرنے کے لیے استعمال کیا جاتا ہے۔ اگر آپ اس بارے میں مزید سمجھنا چاہتے ہیں کہ Ethereum پر ٹرانزیکشنز کیسے کام کرتی ہیں، تو [یہ صفحہ](/developers/docs/transactions/) دیکھیں۔

آپ [یہاں](https://metamask.io/download) مفت میں MetaMask اکاؤنٹ ڈاؤن لوڈ اور بنا سکتے ہیں۔ جب آپ اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے اکاؤنٹ ہے، تو یقینی بنائیں کہ اوپری دائیں جانب "Ropsten Test Network" پر سوئچ کریں \(تاکہ ہم حقیقی رقم کے ساتھ کام نہ کر رہے ہوں\)۔

### Faucet سے ایتھر شامل کریں {#add-ether-from-faucet}

اپنے NFTs کو منٹ کرنے (یا Ethereum بلاک چین پر کسی بھی ٹرانزیکشن پر دستخط کرنے) کے لیے، ہمیں کچھ نقلی Eth کی ضرورت ہوگی۔ Eth حاصل کرنے کے لیے آپ [Ropsten faucet](https://faucet.ropsten.be/) پر جا سکتے ہیں اور اپنا Ropsten اکاؤنٹ ایڈریس درج کر سکتے ہیں، پھر "Send Ropsten Eth" پر کلک کریں۔ آپ کو جلد ہی اپنے MetaMask اکاؤنٹ میں Eth نظر آنا چاہیے!

### اپنا بیلنس چیک کریں {#check-your-balance}

یہ دوہری جانچ کرنے کے لیے کہ ہمارا بیلنس موجود ہے، آئیے [Alchemy’s composer tool](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) کا استعمال کرتے ہوئے ایک [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) درخواست کریں۔ یہ ہمارے والیٹ میں Eth کی مقدار واپس کرے گا۔ اپنا MetaMask اکاؤنٹ ایڈریس درج کرنے اور "Send Request" پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**نوٹ:** یہ نتیجہ wei میں ہے eth میں نہیں۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ wei سے eth میں تبدیلی یہ ہے: <span dir="ltr">1 eth = 10¹⁸ wei</span>۔ لہذا اگر ہم 0xde0b6b3a7640000 کو اعشاریہ (decimal) میں تبدیل کرتے ہیں تو ہمیں <span dir="ltr">1*10¹⁸</span> ملتا ہے جو 1 eth کے برابر ہے۔

شکر ہے! ہماری نقلی رقم پوری طرح موجود ہے! <Emoji text=":money_mouth_face:" size={1} />

## MetaMask کو اپنے UI سے جوڑیں {#connect-metamask-to-your-UI}

اب جب کہ ہمارا MetaMask والیٹ سیٹ اپ ہو گیا ہے، آئیے اپنی ڈیپ کو اس سے جوڑیں!

چونکہ ہم [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) پیراڈائم کی پیروی کرنا چاہتے ہیں، اس لیے ہم ایک الگ فائل بنانے جا رہے ہیں جس میں ہماری ڈیپ کی منطق (logic)، ڈیٹا، اور قواعد کو منظم کرنے کے لیے ہمارے فنکشنز شامل ہوں گے، اور پھر ان فنکشنز کو اپنے فرنٹ اینڈ (ہمارے Minter.js جزو) میں پاس کریں گے۔

### `connectWallet` فنکشن {#connect-wallet-function}

ایسا کرنے کے لیے، آئیے اپنی `src` ڈائرکٹری میں `utils` نام کا ایک نیا فولڈر بنائیں اور اس کے اندر `interact.js` نام کی ایک فائل شامل کریں، جس میں ہمارے تمام والیٹ اور اسمارٹ کانٹریکٹ کے تعامل کے فنکشنز شامل ہوں گے۔

اپنی `interact.js` فائل میں، ہم ایک `connectWallet` فنکشن لکھیں گے، جسے ہم پھر اپنے `Minter.js` جزو میں امپورٹ اور کال کریں گے۔

اپنی `interact.js` فائل میں، درج ذیل شامل کریں

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

آئیے تجزیہ کرتے ہیں کہ یہ کوڈ کیا کرتا ہے:

سب سے پہلے، ہمارا فنکشن چیک کرتا ہے کہ آیا آپ کے براؤزر میں `window.ethereum` فعال ہے۔

`window.ethereum` ایک عالمی API ہے جسے MetaMask اور دیگر والیٹ فراہم کنندگان کے ذریعے شامل کیا گیا ہے جو ویب سائٹس کو صارفین کے Ethereum اکاؤنٹس کی درخواست کرنے کی اجازت دیتا ہے۔ اگر منظور ہو جائے، تو یہ ان بلاک چینز سے ڈیٹا پڑھ سکتا ہے جن سے صارف جڑا ہوا ہے، اور تجویز کر سکتا ہے کہ صارف پیغامات اور ٹرانزیکشنز پر دستخط کرے۔ مزید معلومات کے لیے [MetaMask docs](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) دیکھیں!

اگر `window.ethereum` موجود _نہیں_ ہے، تو اس کا مطلب ہے کہ MetaMask انسٹال نہیں ہے۔ اس کے نتیجے میں ایک JSON آبجیکٹ واپس کیا جاتا ہے، جہاں واپس کیا گیا `address` ایک خالی اسٹرنگ ہوتا ہے، اور `status` JSX آبجیکٹ یہ پیغام دیتا ہے کہ صارف کو MetaMask انسٹال کرنا چاہیے۔

**ہم جو زیادہ تر فنکشنز لکھیں گے وہ JSON آبجیکٹس واپس کر رہے ہوں گے جنہیں ہم اپنے اسٹیٹ متغیرات اور UI کو اپ ڈیٹ کرنے کے لیے استعمال کر سکتے ہیں۔**

اب اگر `window.ethereum` موجود _ہے_، تو تب چیزیں دلچسپ ہو جاتی ہیں۔

try/catch لوپ کا استعمال کرتے ہوئے، ہم [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) کو کال کر کے MetaMask سے جڑنے کی کوشش کریں گے۔ اس فنکشن کو کال کرنے سے براؤزر میں MetaMask کھل جائے گا، جس کے ذریعے صارف کو اپنے والیٹ کو آپ کی ڈیپ سے جوڑنے کا اشارہ کیا جائے گا۔

- اگر صارف جڑنے کا انتخاب کرتا ہے، تو `method: "eth_requestAccounts"` ایک سرنی (array) واپس کرے گا جس میں صارف کے وہ تمام اکاؤنٹ ایڈریسز شامل ہوں گے جو ڈیپ سے جڑے ہوئے ہیں۔ مجموعی طور پر، ہمارا `connectWallet` فنکشن ایک JSON آبجیکٹ واپس کرے گا جس میں اس سرنی کا _پہلا_ `address` شامل ہوگا \(لائن 9 دیکھیں\) اور ایک `status` پیغام جو صارف کو اسمارٹ کانٹریکٹ پر ایک پیغام لکھنے کا اشارہ کرتا ہے۔
- اگر صارف کنکشن کو مسترد کرتا ہے، تو JSON آبجیکٹ میں واپس کیے گئے `address` کے لیے ایک خالی اسٹرنگ اور ایک `status` پیغام شامل ہوگا جو یہ ظاہر کرتا ہے کہ صارف نے کنکشن کو مسترد کر دیا ہے۔

### اپنے Minter.js UI جزو میں connectWallet فنکشن شامل کریں {#add-connect-wallet}

اب جب کہ ہم نے یہ `connectWallet` فنکشن لکھ لیا ہے، آئیے اسے اپنے `Minter.js.` جزو سے جوڑتے ہیں۔

سب سے پہلے، ہمیں `Minter.js` فائل کے اوپری حصے میں `import { connectWallet } from "./utils/interact.js";` شامل کر کے اپنے فنکشن کو اپنی `Minter.js` فائل میں امپورٹ کرنا ہوگا۔ آپ کی `Minter.js` کی پہلی 11 لائنیں اب اس طرح دکھنی چاہئیں:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  // سٹیٹ ویری ایبلز
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

پھر، اپنے `connectWalletPressed` فنکشن کے اندر، ہم اپنے امپورٹ کردہ `connectWallet` فنکشن کو اس طرح کال کریں گے:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

غور کریں کہ ہماری زیادہ تر فعالیت کو `interact.js` فائل سے ہمارے `Minter.js` جزو سے کیسے الگ (abstract) کیا گیا ہے؟ یہ اس لیے ہے تاکہ ہم M-V-C پیراڈائم کی تعمیل کریں!

`connectWalletPressed` میں، ہم بس اپنے امپورٹ کردہ `connectWallet` فنکشن کو ایک await کال کرتے ہیں، اور اس کے جواب کا استعمال کرتے ہوئے، ہم اپنے `status` اور `walletAddress` متغیرات کو ان کے اسٹیٹ ہکس کے ذریعے اپ ڈیٹ کرتے ہیں۔

اب، آئیے دونوں فائلوں `Minter.js` اور `interact.js` کو محفوظ کریں اور اب تک کے اپنے UI کی جانچ کریں۔

اپنے براؤزر کو localhost:3000 پر کھولیں، اور صفحے کے اوپری دائیں جانب "Connect Wallet" بٹن دبائیں۔

اگر آپ کے پاس MetaMask انسٹال ہے، تو آپ کو اپنے والیٹ کو اپنی ڈیپ سے جوڑنے کا اشارہ کیا جانا چاہیے۔ جڑنے کی دعوت قبول کریں۔

آپ کو دیکھنا چاہیے کہ والیٹ بٹن اب ظاہر کرتا ہے کہ آپ کا ایڈریس جڑا ہوا ہے۔

اس کے بعد، صفحہ کو ریفریش کرنے کی کوشش کریں... یہ عجیب ہے۔ ہمارا والیٹ بٹن ہمیں MetaMask کو جوڑنے کا اشارہ کر رہا ہے، حالانکہ یہ پہلے سے جڑا ہوا ہے...

تاہم پریشان نہ ہوں! ہم `getCurrentWalletConnected` نامی ایک فنکشن کو نافذ کر کے اسے آسانی سے ٹھیک کر سکتے ہیں، جو یہ چیک کرے گا کہ آیا کوئی ایڈریس پہلے سے ہماری ڈیپ سے جڑا ہوا ہے اور اس کے مطابق ہمارے UI کو اپ ڈیٹ کرے گا!

### getCurrentWalletConnected فنکشن {#get-current-wallet}

اپنی `interact.js` فائل میں، درج ذیل `getCurrentWalletConnected` فنکشن شامل کریں:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

یہ کوڈ اس `connectWallet` فنکشن سے _بہت_ ملتا جلتا ہے جو ہم نے ابھی پہلے لکھا تھا۔

بنیادی فرق یہ ہے کہ `eth_requestAccounts` میتھڈ کو کال کرنے کے بجائے، جو صارف کے لیے اپنا والیٹ جوڑنے کے لیے MetaMask کھولتا ہے، یہاں ہم `eth_accounts` میتھڈ کو کال کرتے ہیں، جو بس ایک سرنی واپس کرتا ہے جس میں فی الحال ہماری ڈیپ سے جڑے ہوئے MetaMask ایڈریسز شامل ہوتے ہیں۔

اس فنکشن کو عمل میں دیکھنے کے لیے، آئیے اسے اپنے `Minter.js` جزو کے `useEffect` فنکشن میں کال کریں۔

جیسا کہ ہم نے `connectWallet` کے لیے کیا تھا، ہمیں اس فنکشن کو اپنی `interact.js` فائل سے اپنی `Minter.js` فائل میں اس طرح امپورٹ کرنا ہوگا:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, // یہاں امپورٹ کریں
} from "./utils/interact.js"
```

اب، ہم بس اسے اپنے `useEffect` فنکشن میں کال کرتے ہیں:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

غور کریں، ہم `getCurrentWalletConnected` کی اپنی کال کے جواب کا استعمال اپنے `walletAddress` اور `status` اسٹیٹ متغیرات کو اپ ڈیٹ کرنے کے لیے کرتے ہیں۔

ایک بار جب آپ یہ کوڈ شامل کر لیں، تو ہماری براؤزر ونڈو کو ریفریش کرنے کی کوشش کریں۔ بٹن کو یہ کہنا چاہیے کہ آپ جڑے ہوئے ہیں، اور آپ کے جڑے ہوئے والیٹ کے ایڈریس کا پیش نظارہ (preview) دکھانا چاہیے - یہاں تک کہ آپ کے ریفریش کرنے کے بعد بھی!

### addWalletListener کو نافذ کریں {#implement-add-wallet-listener}

ہمارے ڈیپ والیٹ سیٹ اپ کا آخری مرحلہ والیٹ لسنر کو نافذ کرنا ہے تاکہ ہمارا UI اس وقت اپ ڈیٹ ہو جب ہمارے والیٹ کی اسٹیٹ تبدیل ہو، جیسے کہ جب صارف منقطع (disconnect) ہوتا ہے یا اکاؤنٹس تبدیل کرتا ہے۔

اپنی `Minter.js` فائل میں، ایک فنکشن `addWalletListener` شامل کریں جو درج ذیل کی طرح لگتا ہے:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

آئیے جلدی سے تجزیہ کرتے ہیں کہ یہاں کیا ہو رہا ہے:

- سب سے پہلے، ہمارا فنکشن چیک کرتا ہے کہ آیا `window.ethereum` فعال ہے \(یعنی، MetaMask انسٹال ہے\)۔
  - اگر یہ نہیں ہے، تو ہم بس اپنے `status` اسٹیٹ متغیر کو ایک JSX اسٹرنگ پر سیٹ کرتے ہیں جو صارف کو MetaMask انسٹال کرنے کا اشارہ کرتی ہے۔
  - اگر یہ فعال ہے، تو ہم لائن 3 پر لسنر `window.ethereum.on("accountsChanged")` سیٹ اپ کرتے ہیں جو MetaMask والیٹ میں اسٹیٹ کی تبدیلیوں کو سنتا ہے، جس میں وہ وقت شامل ہے جب صارف ڈیپ سے ایک اضافی اکاؤنٹ جوڑتا ہے، اکاؤنٹس تبدیل کرتا ہے، یا کسی اکاؤنٹ کو منقطع کرتا ہے۔ اگر کم از کم ایک اکاؤنٹ جڑا ہوا ہے، تو `walletAddress` اسٹیٹ متغیر کو لسنر کے ذریعے واپس کی گئی `accounts` سرنی میں پہلے اکاؤنٹ کے طور پر اپ ڈیٹ کیا جاتا ہے۔ بصورت دیگر، `walletAddress` کو ایک خالی اسٹرنگ کے طور پر سیٹ کیا جاتا ہے۔

آخر میں، ہمیں اسے اپنے `useEffect` فنکشن میں کال کرنا ہوگا:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

اور لیجیے! ہم نے اپنی تمام والیٹ فعالیت کی پروگرامنگ مکمل کر لی ہے! اب جب کہ ہمارا والیٹ سیٹ اپ ہو گیا ہے، آئیے معلوم کرتے ہیں کہ اپنا NFT کیسے منٹ کیا جائے!

## NFT میٹا ڈیٹا 101 {#nft-metadata-101}

تو یاد رکھیں وہ NFT میٹا ڈیٹا جس کے بارے میں ہم نے ابھی اس ٹیوٹوریل کے مرحلہ 0 میں بات کی تھی—یہ ایک NFT کو زندہ کرتا ہے، جس سے اس میں خصوصیات شامل ہوتی ہیں، جیسے کہ ایک ڈیجیٹل اثاثہ، نام، تفصیل، اور دیگر اوصاف۔

ہمیں اس میٹا ڈیٹا کو ایک JSON آبجیکٹ کے طور پر کنفیگر کرنے اور اسے اسٹور کرنے کی ضرورت ہوگی، تاکہ ہم اپنے اسمارٹ کانٹریکٹ کے `mintNFT` فنکشن کو کال کرتے وقت اسے `tokenURI` پیرامیٹر کے طور پر پاس کر سکیں۔

"Link to Asset"، "Name"، "Description" فیلڈز میں موجود متن ہمارے NFT کے میٹا ڈیٹا کی مختلف خصوصیات پر مشتمل ہوگا۔ ہم اس میٹا ڈیٹا کو ایک JSON آبجیکٹ کے طور پر فارمیٹ کریں گے، لیکن اس JSON آبجیکٹ کو ہم کہاں اسٹور کر سکتے ہیں اس کے لیے کچھ اختیارات ہیں:

- ہم اسے Ethereum بلاک چین پر اسٹور کر سکتے ہیں؛ تاہم، ایسا کرنا بہت مہنگا ہوگا۔
- ہم اسے ایک مرکزی (centralized) سرور پر اسٹور کر سکتے ہیں، جیسے AWS یا Firebase۔ لیکن یہ ہمارے غیر مرکزیت (decentralization) کے اصول کو شکست دے گا۔
- ہم IPFS کا استعمال کر سکتے ہیں، جو ایک تقسیم شدہ فائل سسٹم میں ڈیٹا کو اسٹور کرنے اور شیئر کرنے کے لیے ایک غیر مرکزی پروٹوکول اور پیئر ٹو پیئر نیٹ ورک ہے۔ چونکہ یہ پروٹوکول غیر مرکزی اور مفت ہے، اس لیے یہ ہمارا بہترین آپشن ہے!

اپنے میٹا ڈیٹا کو IPFS پر اسٹور کرنے کے لیے، ہم [Pinata](https://pinata.cloud/) کا استعمال کریں گے، جو ایک آسان IPFS API اور ٹول کٹ ہے۔ اگلے مرحلے میں، ہم بالکل وضاحت کریں گے کہ یہ کیسے کرنا ہے!

## اپنے میٹا ڈیٹا کو IPFS پر پن کرنے کے لیے Pinata کا استعمال کریں {#use-pinata-to-pin-your-metadata-to-IPFS}

اگر آپ کے پاس [Pinata](https://pinata.cloud/) اکاؤنٹ نہیں ہے، تو [یہاں](https://app.pinata.cloud/auth/signup) ایک مفت اکاؤنٹ کے لیے سائن اپ کریں اور اپنے ای میل اور اکاؤنٹ کی تصدیق کے لیے مراحل مکمل کریں۔

### اپنی Pinata API کلید بنائیں {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) صفحہ پر جائیں، پھر سب سے اوپر "New Key" بٹن منتخب کریں، Admin وجیٹ کو فعال کے طور پر سیٹ کریں، اور اپنی کلید کا نام رکھیں۔

پھر آپ کو آپ کی API معلومات کے ساتھ ایک پاپ اپ دکھایا جائے گا۔ اسے کسی محفوظ جگہ پر رکھنا یقینی بنائیں۔

اب جب کہ ہماری کلید سیٹ اپ ہو گئی ہے، آئیے اسے اپنے پروجیکٹ میں شامل کریں تاکہ ہم اسے استعمال کر سکیں۔

### ایک .env فائل بنائیں {#create-a-env}

ہم اپنی Pinata کلید اور خفیہ (secret) کو ایک ماحولیاتی (environment) فائل میں محفوظ طریقے سے اسٹور کر سکتے ہیں۔ آئیے آپ کی پروجیکٹ ڈائرکٹری میں [dotenv package](https://www.npmjs.com/package/dotenv) انسٹال کریں۔

اپنے ٹرمینل میں ایک نیا ٹیب کھولیں \(لوکل ہوسٹ چلانے والے سے الگ\) اور یقینی بنائیں کہ آپ `minter-starter-files` فولڈر میں ہیں، پھر اپنے ٹرمینل میں درج ذیل کمانڈ چلائیں:

```text
npm install dotenv --save
```

اس کے بعد، اپنی کمانڈ لائن پر درج ذیل درج کر کے اپنے `minter-starter-files` کی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں:

```javascript
vim.env
```

یہ آپ کی `.env` فائل کو vim \(ایک ٹیکسٹ ایڈیٹر\) میں کھول دے گا۔ اسے محفوظ کرنے کے لیے اپنے کی بورڈ پر اسی ترتیب میں "esc" + ":" + "q" دبائیں۔

اس کے بعد، VSCode میں، اپنی `.env` فائل پر جائیں اور اس میں اپنی Pinata API کلید اور API خفیہ شامل کریں، اس طرح:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

فائل کو محفوظ کریں، اور پھر آپ اپنے JSON میٹا ڈیٹا کو IPFS پر اپ لوڈ کرنے کے لیے فنکشن لکھنا شروع کرنے کے لیے تیار ہیں!

### pinJSONToIPFS کو نافذ کریں {#pin-json-to-ipfs}

خوش قسمتی سے ہمارے لیے، Pinata کے پاس ایک [API specifically for uploading JSON data to IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) ہے اور axios کے ساتھ ایک آسان JavaScript مثال ہے جسے ہم کچھ معمولی ترامیم کے ساتھ استعمال کر سکتے ہیں۔

اپنے `utils` فولڈر میں، آئیے `pinata.js` نام کی ایک اور فائل بنائیں اور پھر .env فائل سے اپنا Pinata خفیہ اور کلید اس طرح امپورٹ کریں:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

اس کے بعد، نیچے سے اضافی کوڈ کو اپنی `pinata.js` فائل میں پیسٹ کریں۔ پریشان نہ ہوں، ہم تجزیہ کریں گے کہ ہر چیز کا کیا مطلب ہے!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  // Pinata کو axios POST ریکویسٹ بھیج رہے ہیں ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

تو یہ کوڈ بالکل کیا کرتا ہے؟

سب سے پہلے، یہ [axios](https://www.npmjs.com/package/axios) کو امپورٹ کرتا ہے، جو براؤزر اور node.js کے لیے ایک پرامس (promise) پر مبنی HTTP کلائنٹ ہے، جسے ہم Pinata سے درخواست کرنے کے لیے استعمال کریں گے۔

پھر ہمارے پاس اپنا غیر مطابقت پذیر فنکشن `pinJSONToIPFS` ہے، جو ایک `JSONBody` کو اپنے ان پٹ کے طور پر لیتا ہے اور اس کے ہیڈر میں Pinata api کلید اور خفیہ لیتا ہے، یہ سب ان کے `pinJSONToIPFS` API پر ایک POST درخواست کرنے کے لیے ہے۔

- اگر یہ POST درخواست کامیاب ہو جاتی ہے، تو ہمارا فنکشن ایک JSON آبجیکٹ واپس کرتا ہے جس میں `success` بولین (boolean) true کے طور پر اور وہ `pinataUrl` ہوتا ہے جہاں ہمارا میٹا ڈیٹا پن کیا گیا تھا۔ ہم اس واپس کیے گئے `pinataUrl` کو اپنے اسمارٹ کانٹریکٹ کے منٹ فنکشن میں `tokenURI` ان پٹ کے طور پر استعمال کریں گے۔
- اگر یہ پوسٹ درخواست ناکام ہو جاتی ہے، تو ہمارا فنکشن ایک JSON آبجیکٹ واپس کرتا ہے جس میں `success` بولین false کے طور پر اور ایک `message` اسٹرنگ ہوتی ہے جو ہماری خرابی (error) کو بتاتی ہے۔

ہمارے `connectWallet` فنکشن کی واپسی کی اقسام کی طرح، ہم JSON آبجیکٹس واپس کر رہے ہیں تاکہ ہم ان کے پیرامیٹرز کا استعمال اپنے اسٹیٹ متغیرات اور UI کو اپ ڈیٹ کرنے کے لیے کر سکیں۔

## اپنا اسمارٹ کانٹریکٹ لوڈ کریں {#load-your-smart-contract}

اب جب کہ ہمارے پاس اپنے `pinJSONToIPFS` فنکشن کے ذریعے اپنے NFT میٹا ڈیٹا کو IPFS پر اپ لوڈ کرنے کا ایک طریقہ ہے، ہمیں اپنے اسمارٹ کانٹریکٹ کی ایک مثال (instance) لوڈ کرنے کے طریقے کی ضرورت ہوگی تاکہ ہم اس کے `mintNFT` فنکشن کو کال کر سکیں۔

جیسا کہ ہم نے پہلے ذکر کیا، اس ٹیوٹوریل میں ہم [this existing NFT smart contract](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) کا استعمال کریں گے؛ تاہم، اگر آپ یہ سیکھنا چاہتے ہیں کہ ہم نے اسے کیسے بنایا، یا خود ایک بنانا چاہتے ہیں، تو ہم انتہائی سفارش کرتے ہیں کہ آپ ہمارا دوسرا ٹیوٹوریل، ["How to Create an NFT."](https://www.alchemy.com/docs/how-to-create-an-nft) دیکھیں۔

### کانٹریکٹ ABI {#contract-abi}

اگر آپ نے ہماری فائلوں کا بغور جائزہ لیا ہے، تو آپ نے دیکھا ہوگا کہ ہماری `src` ڈائرکٹری میں، ایک `contract-abi.json` فائل ہے۔ ایک ABI اس بات کی وضاحت کرنے کے لیے ضروری ہے کہ کوئی کانٹریکٹ کس فنکشن کو طلب (invoke) کرے گا اور ساتھ ہی یہ یقینی بنانے کے لیے کہ فنکشن اس فارمیٹ میں ڈیٹا واپس کرے گا جس کی آپ توقع کر رہے ہیں۔

ہمیں Ethereum بلاک چین سے جڑنے اور اپنے اسمارٹ کانٹریکٹ کو لوڈ کرنے کے لیے ایک Alchemy API کلید اور Alchemy Web3 API کی بھی ضرورت ہوگی۔

### اپنی Alchemy API کلید بنائیں {#create-alchemy-api}

اگر آپ کے پاس پہلے سے Alchemy اکاؤنٹ نہیں ہے، تو [یہاں مفت میں سائن اپ کریں۔](https://alchemy.com/?a=eth-org-nft-minter)

ایک بار جب آپ Alchemy اکاؤنٹ بنا لیتے ہیں، تو آپ ایک ایپ بنا کر ایک API کلید تیار کر سکتے ہیں۔ یہ ہمیں Ropsten ٹیسٹ نیٹ ورک پر درخواستیں کرنے کی اجازت دے گا۔

نیویگیشن بار میں "Apps" پر ہوور (hover) کر کے اور "Create App" پر کلک کر کے اپنے Alchemy ڈیش بورڈ میں "Create App" صفحہ پر جائیں۔

اپنی ایپ کا نام رکھیں ہم نے "My First NFT!" کا انتخاب کیا، ایک مختصر تفصیل پیش کریں، اپنی ایپ کی بک کیپنگ کے لیے استعمال ہونے والے ماحول (Environment) کے لیے "Staging" منتخب کریں، اور اپنے نیٹ ورک کے لیے "Ropsten" کا انتخاب کریں۔

"Create app" پر کلک کریں اور بس! آپ کی ایپ نیچے دیے گئے ٹیبل میں ظاہر ہونی چاہیے۔

زبردست تو اب جب کہ ہم نے اپنا HTTP Alchemy API URL بنا لیا ہے، اسے اپنے کلپ بورڈ پر کاپی کریں...

…اور پھر آئیے اسے اپنی `.env` فائل میں شامل کریں۔ مجموعی طور پر، آپ کی .env فائل اس طرح دکھنی چاہیے:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https: // eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

اب جب کہ ہمارے پاس اپنا کانٹریکٹ ABI اور ہماری Alchemy API کلید ہے، ہم [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) کا استعمال کرتے ہوئے اپنا اسمارٹ کانٹریکٹ لوڈ کرنے کے لیے تیار ہیں۔

### اپنا Alchemy Web3 اینڈ پوائنٹ اور کانٹریکٹ سیٹ اپ کریں {#setup-alchemy-endpoint}

سب سے پہلے، اگر آپ کے پاس یہ پہلے سے نہیں ہے، تو آپ کو ٹرمینل میں ہوم ڈائرکٹری: `nft-minter-tutorial` پر جا کر [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) انسٹال کرنے کی ضرورت ہوگی:

```text
cd ..
npm install @alch/alchemy-web3
```

اس کے بعد آئیے اپنی `interact.js` فائل پر واپس چلتے ہیں۔ فائل کے اوپری حصے میں، اپنی .env فائل سے اپنی Alchemy کلید امپورٹ کرنے اور اپنا Alchemy Web3 اینڈ پوائنٹ سیٹ اپ کرنے کے لیے درج ذیل کوڈ شامل کریں:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) [Web3.js](https://docs.web3js.org/) کے گرد ایک ریپر (wrapper) ہے، جو ایک web3 ڈیولپر کے طور پر آپ کی زندگی کو آسان بنانے کے لیے بہتر API میتھڈز اور دیگر اہم فوائد فراہم کرتا ہے۔ اسے اس طرح ڈیزائن کیا گیا ہے کہ کم سے کم کنفیگریشن کی ضرورت ہو تاکہ آپ اسے فوراً اپنی ایپ میں استعمال کرنا شروع کر سکیں!

اس کے بعد، آئیے اپنی فائل میں اپنا کانٹریکٹ ABI اور کانٹریکٹ ایڈریس شامل کریں۔

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

ایک بار جب ہمارے پاس یہ دونوں ہو جائیں، تو ہم اپنے منٹ فنکشن کی کوڈنگ شروع کرنے کے لیے تیار ہیں!

## mintNFT فنکشن کو نافذ کریں {#implement-the-mintnft-function}

اپنی `interact.js` فائل کے اندر، آئیے اپنے فنکشن، `mintNFT` کی وضاحت کریں، جو اپنے نام کے مطابق ہمارا NFT منٹ کرے گا۔

چونکہ ہم متعدد غیر مطابقت پذیر کالز کریں گے \(اپنے میٹا ڈیٹا کو IPFS پر پن کرنے کے لیے Pinata کو، اپنے اسمارٹ کانٹریکٹ کو لوڈ کرنے کے لیے Alchemy Web3 کو، اور اپنی ٹرانزیکشنز پر دستخط کرنے کے لیے MetaMask کو\)، اس لیے ہمارا فنکشن بھی غیر مطابقت پذیر ہوگا۔

ہمارے فنکشن کے تین ان پٹس ہمارے ڈیجیٹل اثاثے کا `url`، `name`، اور `description` ہوں گے۔ `connectWallet` فنکشن کے نیچے درج ذیل فنکشن سگنیچر شامل کریں:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### ان پٹ ایرر ہینڈلنگ {#input-error-handling}

قدرتی طور پر، فنکشن کے آغاز میں کسی قسم کی ان پٹ ایرر ہینڈلنگ کا ہونا سمجھ میں آتا ہے، تاکہ اگر ہمارے ان پٹ پیرامیٹرز درست نہ ہوں تو ہم اس فنکشن سے باہر نکل جائیں۔ اپنے فنکشن کے اندر، آئیے درج ذیل کوڈ شامل کریں:

```javascript
export const mintNFT = async (url, name, description) => {
  // ایرر ہینڈلنگ
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

بنیادی طور پر، اگر ان پٹ پیرامیٹرز میں سے کوئی بھی ایک خالی اسٹرنگ ہے، تو ہم ایک JSON آبجیکٹ واپس کرتے ہیں جہاں `success` بولین false ہے، اور `status` اسٹرنگ یہ پیغام دیتی ہے کہ ہمارے UI میں تمام فیلڈز مکمل ہونی چاہئیں۔

### میٹا ڈیٹا کو IPFS پر اپ لوڈ کریں {#upload-metadata-to-ipfs}

ایک بار جب ہمیں معلوم ہو جائے کہ ہمارا میٹا ڈیٹا مناسب طریقے سے فارمیٹ کیا گیا ہے، تو اگلا مرحلہ اسے ایک JSON آبجیکٹ میں لپیٹنا اور ہمارے لکھے ہوئے `pinJSONToIPFS` کے ذریعے اسے IPFS پر اپ لوڈ کرنا ہے!

ایسا کرنے کے لیے، ہمیں سب سے پہلے `pinJSONToIPFS` فنکشن کو اپنی `interact.js` فائل میں امپورٹ کرنے کی ضرورت ہے۔ `interact.js` کے بالکل اوپری حصے میں، آئیے شامل کریں:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

یاد کریں کہ `pinJSONToIPFS` ایک JSON باڈی لیتا ہے۔ لہذا اس سے پہلے کہ ہم اسے کال کریں، ہمیں اپنے `url`، `name`، اور `description` پیرامیٹرز کو ایک JSON آبجیکٹ میں فارمیٹ کرنے کی ضرورت ہوگی۔

آئیے `metadata` نامی ایک JSON آبجیکٹ بنانے کے لیے اپنے کوڈ کو اپ ڈیٹ کریں اور پھر اس `metadata` پیرامیٹر کے ساتھ `pinJSONToIPFS` کو کال کریں:

```javascript
export const mintNFT = async (url, name, description) => {
  // ایرر ہینڈلنگ
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  // میٹا ڈیٹا بنائیں
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  // Pinata کو کال کریں
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

غور کریں، ہم `pinJSONToIPFS(metadata)` کی اپنی کال کے جواب کو `pinataResponse` آبجیکٹ میں اسٹور کرتے ہیں۔ پھر، ہم کسی بھی خرابی کے لیے اس آبجیکٹ کو پارس (parse) کرتے ہیں۔

اگر کوئی خرابی ہے، تو ہم ایک JSON آبجیکٹ واپس کرتے ہیں جہاں `success` بولین false ہے اور ہماری `status` اسٹرنگ یہ پیغام دیتی ہے کہ ہماری کال ناکام ہو گئی۔ بصورت دیگر، ہم `pinataResponse` سے `pinataURL` نکالتے ہیں اور اسے اپنے `tokenURI` متغیر کے طور پر اسٹور کرتے ہیں۔

اب وقت آگیا ہے کہ ہم اس Alchemy Web3 API کا استعمال کرتے ہوئے اپنا اسمارٹ کانٹریکٹ لوڈ کریں جسے ہم نے اپنی فائل کے اوپری حصے میں شروع (initialize) کیا تھا۔ `window.contract` عالمی متغیر پر کانٹریکٹ سیٹ کرنے کے لیے `mintNFT` فنکشن کے نچلے حصے میں کوڈ کی درج ذیل لائن شامل کریں:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

ہمارے `mintNFT` فنکشن میں شامل کرنے والی آخری چیز ہماری Ethereum ٹرانزیکشن ہے:

```javascript
// اپنی ایتھیریم ٹرانزیکشن سیٹ اپ کریں
const transactionParameters = {
  to: contractAddress, // کنٹریکٹ کی اشاعت کے علاوہ ضروری ہے۔
  from: window.ethereum.selectedAddress, // صارف کے فعال ایڈریس سے مماثل ہونا چاہیے۔
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), // NFT سمارٹ کنٹریکٹ کو کال کریں
}

// MetaMask کے ذریعے ٹرانزیکشن سائن کریں
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

اگر آپ پہلے سے ہی Ethereum ٹرانزیکشنز سے واقف ہیں، تو آپ دیکھیں گے کہ اس کی ساخت اس سے کافی ملتی جلتی ہے جو آپ نے دیکھی ہے۔

- سب سے پہلے، ہم اپنے ٹرانزیکشنز کے پیرامیٹرز سیٹ اپ کرتے ہیں۔
  - `to` وصول کنندہ کے ایڈریس \(ہمارا اسمارٹ کانٹریکٹ\) کی وضاحت کرتا ہے
  - `from` ٹرانزیکشن پر دستخط کرنے والے کی وضاحت کرتا ہے \(صارف کا MetaMask سے جڑا ہوا ایڈریس: `window.ethereum.selectedAddress`\)
  - `data` میں ہمارے اسمارٹ کانٹریکٹ کے `mintNFT` میتھڈ کی کال شامل ہوتی ہے، جو ہمارے `tokenURI` اور صارف کے والیٹ ایڈریس، `window.ethereum.selectedAddress` کو ان پٹس کے طور پر وصول کرتا ہے
- پھر، ہم ایک await کال، `window.ethereum.request,` کرتے ہیں جہاں ہم MetaMask سے ٹرانزیکشن پر دستخط کرنے کو کہتے ہیں۔ غور کریں، اس درخواست میں، ہم اپنے eth میتھڈ \(eth_SentTransaction\) کی وضاحت کر رہے ہیں اور اپنے `transactionParameters` پاس کر رہے ہیں۔ اس مقام پر، MetaMask براؤزر میں کھل جائے گا، اور صارف کو ٹرانزیکشن پر دستخط کرنے یا اسے مسترد کرنے کا اشارہ کرے گا۔
  - اگر ٹرانزیکشن کامیاب ہو جاتی ہے، تو فنکشن ایک JSON آبجیکٹ واپس کرے گا جہاں بولین `success` کو true پر سیٹ کیا گیا ہے اور `status` اسٹرنگ صارف کو ان کی ٹرانزیکشن کے بارے میں مزید معلومات کے لیے Etherscan چیک کرنے کا اشارہ کرتی ہے۔
  - اگر ٹرانزیکشن ناکام ہو جاتی ہے، تو فنکشن ایک JSON آبجیکٹ واپس کرے گا جہاں `success` بولین کو false پر سیٹ کیا گیا ہے، اور `status` اسٹرنگ خرابی کا پیغام دیتی ہے۔

مجموعی طور پر، ہمارا `mintNFT` فنکشن اس طرح دکھنا چاہیے:

```javascript
export const mintNFT = async (url, name, description) => {
  // ایرر ہینڈلنگ
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  // میٹا ڈیٹا بنائیں
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  // Pinata پن ریکویسٹ
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  // سمارٹ کنٹریکٹ لوڈ کریں
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) // loadContract();

  // اپنی ایتھیریم ٹرانزیکشن سیٹ اپ کریں
  const transactionParameters = {
    to: contractAddress, // کنٹریکٹ کی اشاعت کے علاوہ ضروری ہے۔
    from: window.ethereum.selectedAddress, // صارف کے فعال ایڈریس سے مماثل ہونا چاہیے۔
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), // NFT سمارٹ کنٹریکٹ کو کال کریں
  }

  // MetaMask کے ذریعے ٹرانزیکشن سائن کریں
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

یہ ایک بہت بڑا فنکشن ہے! اب، ہمیں بس اپنے `mintNFT` فنکشن کو اپنے `Minter.js` جزو سے جوڑنے کی ضرورت ہے...

## mintNFT کو ہمارے Minter.js فرنٹ اینڈ سے جوڑیں {#connect-our-frontend}

اپنی `Minter.js` فائل کھولیں اور سب سے اوپر `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` لائن کو اس طرح اپ ڈیٹ کریں:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

آخر میں، اپنے امپورٹ کردہ `mintNFT` فنکشن کو await کال کرنے کے لیے `onMintPressed` فنکشن کو نافذ کریں اور `status` اسٹیٹ متغیر کو اپ ڈیٹ کریں تاکہ یہ ظاہر ہو سکے کہ آیا ہماری ٹرانزیکشن کامیاب ہوئی یا ناکام:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## اپنے NFT کو ایک لائیو ویب سائٹ پر ڈیپلائے کریں {#deploy-your-NFT}

کیا آپ اپنے پروجیکٹ کو صارفین کے تعامل کے لیے لائیو کرنے کے لیے تیار ہیں؟ اپنے Minter کو ایک لائیو ویب سائٹ پر ڈیپلائے کرنے کے لیے [یہ ٹیوٹوریل](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) دیکھیں۔

ایک آخری مرحلہ...

## بلاک چین کی دنیا میں تہلکہ مچا دیں {#take-the-blockchain-world-by-storm}

مذاق کر رہا ہوں، آپ ٹیوٹوریل کے اختتام تک پہنچ گئے ہیں!

خلاصہ کرنے کے لیے، ایک NFT منٹر بنا کر، آپ نے کامیابی سے سیکھا کہ:

- اپنے فرنٹ اینڈ پروجیکٹ کے ذریعے MetaMask سے کیسے جڑیں
- اپنے فرنٹ اینڈ سے اسمارٹ کانٹریکٹ کے میتھڈز کو کیسے کال کریں
- MetaMask کا استعمال کرتے ہوئے ٹرانزیکشنز پر کیسے دستخط کریں

غالباً، آپ اپنے والیٹ میں اپنی ڈیپ کے ذریعے منٹ کیے گئے NFTs کو دکھانا چاہیں گے — لہذا ہمارا فوری ٹیوٹوریل [How to View Your NFT in Your Wallet](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) ضرور دیکھیں!

اور، ہمیشہ کی طرح، اگر آپ کے کوئی سوالات ہیں، تو ہم [Alchemy Discord](https://discord.gg/gWuC7zB) میں مدد کے لیے موجود ہیں۔ ہم یہ دیکھنے کے لیے بے تاب ہیں کہ آپ اس ٹیوٹوریل کے تصورات کو اپنے مستقبل کے پروجیکٹس میں کیسے لاگو کرتے ہیں!