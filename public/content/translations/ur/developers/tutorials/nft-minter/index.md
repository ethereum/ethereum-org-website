---
title: "NFT منٹر ٹیوٹوریل"
description: "اس ٹیوٹوریل میں، آپ ایک NFT منٹر بنائیں گے اور MetaMask اور Web3 ٹولز کا استعمال کرتے ہوئے اپنے اسمارٹ کنٹریکٹ کو React فرنٹ اینڈ سے جوڑ کر ایک فل اسٹیک dApp بنانا سیکھیں گے۔"
author: "smudgil"
tags:
  [
    "solidity",
    "NFT",
    "alchemy",
    "اسمارٹ معاہدات",
    "فرنٹ اینڈ",
    "Pinata"
  ]
skill: intermediate
breadcrumb: "NFT منٹر dapp"
lang: ur-in
published: 2021-10-06
---

Web2 پس منظر سے آنے والے ڈیولپرز کے لیے سب سے بڑے چیلنجوں میں سے ایک یہ ہے کہ وہ اپنے اسمارٹ کنٹریکٹ کو فرنٹ اینڈ پروجیکٹ سے کیسے جوڑیں اور اس کے ساتھ تعامل کریں۔

ایک NFT منٹر بنا کر — ایک سادہ UI جہاں آپ اپنے ڈیجیٹل اثاثے کا لنک، ایک عنوان، اور ایک تفصیل درج کر سکتے ہیں — آپ سیکھیں گے کہ کیسے:

- اپنے فرنٹ اینڈ پروجیکٹ کے ذریعے MetaMask سے جڑیں
- اپنے فرنٹ اینڈ سے اسمارٹ کنٹریکٹ طریقوں کو کال کریں
- MetaMask کا استعمال کرتے ہوئے ٹرانزیکشنز پر دستخط کریں

اس ٹیوٹوریل میں، ہم اپنے فرنٹ اینڈ فریم ورک کے طور پر [React](https://react.dev/) کا استعمال کریں گے۔ چونکہ یہ ٹیوٹوریل بنیادی طور پر Web3 ڈیولپمنٹ پر مرکوز ہے، ہم React کے بنیادی اصولوں کو سمجھنے میں زیادہ وقت نہیں گزاریں گے۔ اس کے بجائے، ہم اپنے پروجیکٹ میں فعالیت (functionality) لانے پر توجہ مرکوز کریں گے۔

ایک شرط کے طور پر، آپ کو React کی ابتدائی سطح کی سمجھ ہونی چاہیے— یہ جاننا کہ کمپونینٹس، پروپس، useState/useEffect، اور بنیادی فنکشن کالنگ کیسے کام کرتی ہے۔ اگر آپ نے پہلے ان میں سے کسی بھی اصطلاح کے بارے میں نہیں سنا ہے، تو آپ یہ [Intro to React tutorial](https://react.dev/learn/tutorial-tic-tac-toe) دیکھنا چاہیں گے۔ بصری طور پر سیکھنے والوں کے لیے، ہم Net Ninja کی طرف سے اس بہترین [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) ویڈیو سیریز کی پرزور سفارش کرتے ہیں۔

اور اگر آپ نے پہلے سے ایسا نہیں کیا ہے، تو آپ کو اس ٹیوٹوریل کو مکمل کرنے کے ساتھ ساتھ بلاک چین پر کچھ بھی بنانے کے لیے یقینی طور پر ایک Alchemy اکاؤنٹ کی ضرورت ہوگی۔ [یہاں](https://alchemy.com/) ایک مفت اکاؤنٹ کے لیے سائن اپ کریں۔

مزید تاخیر کے بغیر، آئیے شروع کریں!

## NFTs بنانا 101 {#making-nfts-101}

کسی بھی کوڈ کو دیکھنے سے پہلے، یہ سمجھنا ضروری ہے کہ NFT بنانا کیسے کام کرتا ہے۔ اس میں دو مراحل شامل ہیں:

### Ethereum بلاک چین پر ایک NFT اسمارٹ کنٹریکٹ شائع کریں {#publish-nft}

دو NFT اسمارٹ کنٹریکٹ معیارات کے درمیان سب سے بڑا فرق یہ ہے کہ ERC-1155 ایک ملٹی ٹوکن معیار ہے اور اس میں بیچ کی فعالیت شامل ہے، جبکہ ERC-721 ایک سنگل ٹوکن معیار ہے اور اس لیے ایک وقت میں صرف ایک ٹوکن کی منتقلی کی حمایت کرتا ہے۔

### منٹنگ فنکشن کو کال کریں {#minting-function}

عام طور پر، اس منٹنگ فنکشن کے لیے آپ کو پیرامیٹرز کے طور پر دو متغیرات (variables) پاس کرنے کی ضرورت ہوتی ہے، پہلا `recipient`، جو اس پتے کی وضاحت کرتا ہے جو آپ کا تازہ منٹ کیا ہوا NFT وصول کرے گا، اور دوسرا NFT کا `tokenURI`، ایک اسٹرنگ جو NFT کے میٹا ڈیٹا کو بیان کرنے والے JSON دستاویز میں حل ہوتا ہے۔

ایک NFT کا میٹا ڈیٹا ہی دراصل اسے زندگی بخشتا ہے، جو اسے نام، تفصیل، تصویر (یا مختلف ڈیجیٹل اثاثہ)، اور دیگر صفات جیسی خصوصیات رکھنے کی اجازت دیتا ہے۔ یہاں [tokenURI کی ایک مثال](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2) ہے، جس میں ایک NFT کا میٹا ڈیٹا ہوتا ہے۔

اس ٹیوٹوریل میں، ہم حصہ 2 پر توجہ مرکوز کرنے جا رہے ہیں، یعنی ہمارے React UI کا استعمال کرتے ہوئے ایک موجودہ NFT کے اسمارٹ کنٹریکٹ منٹنگ فنکشن کو کال کرنا۔

اس ٹیوٹوریل میں ہم جس ERC-721 NFT اسمارٹ کنٹریکٹ کو کال کریں گے اس کا [لنک یہاں ہے](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)۔ اگر آپ یہ جاننا چاہتے ہیں کہ ہم نے اسے کیسے بنایا، تو ہم پرزور سفارش کرتے ہیں کہ آپ ہمارا دوسرا ٹیوٹوریل، ["How to Create an NFT"](https://www.alchemy.com/docs/how-to-create-an-nft) دیکھیں۔

بہت خوب، اب جب کہ ہم سمجھ گئے ہیں کہ NFT بنانا کیسے کام کرتا ہے، آئیے اپنی اسٹارٹر فائلیں کلون کریں!

## اسٹارٹر فائلیں کلون کریں {#clone-the-starter-files}

سب سے پہلے، اس پروجیکٹ کے لیے اسٹارٹر فائلیں حاصل کرنے کے لیے [nft-minter-tutorial GitHub repository](https://github.com/alchemyplatform/nft-minter-tutorial) پر جائیں۔ اس ریپوزٹری کو اپنے مقامی ماحول میں کلون کریں۔

جب آپ اس کلون کی ہوئی `nft-minter-tutorial` ریپوزٹری کو کھولیں گے، تو آپ دیکھیں گے کہ اس میں دو فولڈرز ہیں: `minter-starter-files` اور `nft-minter`۔

- `minter-starter-files` میں اس پروجیکٹ کے لیے اسٹارٹر فائلیں (بنیادی طور پر React UI) ہیں۔ اس ٹیوٹوریل میں، **ہم اس ڈائریکٹری میں کام کریں گے**، جہاں آپ سیکھیں گے کہ اس UI کو اپنے Ethereum والیٹ اور ایک NFT اسمارٹ کنٹریکٹ سے جوڑ کر اسے کیسے فعال بنایا جائے۔
- `nft-minter` میں پورا مکمل ٹیوٹوریل ہے اور اگر آپ کہیں پھنس جاتے ہیں تو یہ آپ کے لیے ایک **حوالے** کے طور پر موجود ہے۔

اس کے بعد، اپنے کوڈ ایڈیٹر میں `minter-starter-files` کی اپنی کاپی کھولیں، اور پھر اپنے `src` فولڈر میں جائیں۔

ہمارا لکھا ہوا سارا کوڈ `src` فولڈر کے تحت رہے گا۔ ہم `Minter.js` کمپونینٹ میں ترمیم کریں گے اور اپنے پروجیکٹ کو Web3 کی فعالیت دینے کے لیے اضافی javascript فائلیں لکھیں گے۔

## مرحلہ 2: ہماری اسٹارٹر فائلیں دیکھیں {#step-2-check-out-our-starter-files}

کوڈنگ شروع کرنے سے پہلے، یہ دیکھنا ضروری ہے کہ اسٹارٹر فائلوں میں ہمارے لیے پہلے سے کیا فراہم کیا گیا ہے۔

### اپنا react پروجیکٹ چلائیں {#get-your-react-project-running}

آئیے اپنے براؤزر میں React پروجیکٹ چلا کر شروع کریں۔ React کی خوبصورتی یہ ہے کہ ایک بار جب ہمارا پروجیکٹ ہمارے براؤزر میں چل رہا ہو، تو ہمارے ذریعے محفوظ کی گئی کوئی بھی تبدیلی ہمارے براؤزر میں لائیو اپ ڈیٹ ہو جائے گی۔

پروجیکٹ کو چلانے کے لیے، `minter-starter-files` فولڈر کی روٹ ڈائرکٹری میں جائیں، اور پروجیکٹ کی ڈیپینڈینسیز (dependencies) کو انسٹال کرنے کے لیے اپنے ٹرمینل میں `npm install` چلائیں:

```bash
cd minter-starter-files
npm install
```

ان کے انسٹال ہونے کے بعد، اپنے ٹرمینل میں `npm start` چلائیں:

```bash
npm start
```

ایسا کرنے سے آپ کے براؤزر میں http://localhost:3000/ کھل جائے گا، جہاں آپ کو ہمارے پروجیکٹ کا فرنٹ اینڈ نظر آئے گا۔ اس میں 3 فیلڈز ہونے چاہئیں: آپ کے NFT کے اثاثے کا لنک داخل کرنے کی جگہ، اپنے NFT کا نام درج کرنے کی جگہ، اور تفصیل فراہم کرنے کی جگہ۔

اگر آپ "Connect Wallet" یا "Mint NFT" بٹنوں پر کلک کرنے کی کوشش کرتے ہیں، تو آپ دیکھیں گے کہ وہ کام نہیں کرتے—اس کی وجہ یہ ہے کہ ہمیں ابھی بھی ان کی فعالیت کو پروگرام کرنے کی ضرورت ہے! :\)

### Minter.js کمپونینٹ {#minter-js}

**نوٹ:** یقینی بنائیں کہ آپ `minter-starter-files` فولڈر میں ہیں نہ کہ `nft-minter` فولڈر میں!

آئیے اپنے ایڈیٹر میں `src` فولڈر میں واپس جائیں اور `Minter.js` فائل کھولیں۔ یہ بہت ضروری ہے کہ ہم اس فائل میں ہر چیز کو سمجھیں، کیونکہ یہ بنیادی React کمپونینٹ ہے جس پر ہم کام کریں گے۔

اس فائل کے اوپری حصے میں، ہمارے پاس ہمارے اسٹیٹ متغیرات (state variables) ہیں جنہیں ہم مخصوص ایونٹس کے بعد اپ ڈیٹ کریں گے۔

```javascript
//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React اسٹیٹ متغیرات (state variables) یا اسٹیٹ ہکس (state hooks) کے بارے میں کبھی نہیں سنا؟ [ان](https://legacy.reactjs.org/docs/hooks-state.html) دستاویزات کو دیکھیں۔

یہاں ہر متغیر کی نمائندگی دی گئی ہے:

- `walletAddress` - ایک اسٹرنگ جو صارف کے والیٹ کا پتہ محفوظ کرتا ہے
- `status` - ایک اسٹرنگ جس میں UI کے نیچے دکھانے کے لیے ایک پیغام ہوتا ہے
- `name` - ایک اسٹرنگ جو NFT کا نام محفوظ کرتا ہے
- `description` - ایک اسٹرنگ جو NFT کی تفصیل محفوظ کرتا ہے
- `url` - ایک اسٹرنگ جو NFT کے ڈیجیٹل اثاثے کا لنک ہے

اسٹیٹ متغیرات کے بعد، آپ کو تین غیر نافذ شدہ فنکشنز نظر آئیں گے: `useEffect`، `connectWalletPressed`، اور `onMintPressed`۔ آپ دیکھیں گے کہ یہ تمام فنکشنز `async` ہیں، اس کی وجہ یہ ہے کہ ہم ان میں غیر مطابقت پذیر (asynchronous) API کالز کریں گے! ان کے نام ان کی فعالیتوں کے ہم نام ہیں:

```javascript
useEffect(async () => {
  //TODO: implement
}, [])

const connectWalletPressed = async () => {
  //TODO: implement
}

const onMintPressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - یہ ایک React ہک ہے جسے آپ کے کمپونینٹ کے رینڈر ہونے کے بعد کال کیا جاتا ہے۔ چونکہ اس میں ایک خالی اری `[]` پروپ پاس کیا گیا ہے (لائن 3 دیکھیں)، اسے صرف کمپونینٹ کے _پہلے_ رینڈر پر کال کیا جائے گا۔ یہاں ہم اپنے والیٹ لسنر اور ایک اور والیٹ فنکشن کو کال کریں گے تاکہ ہمارے UI کو اپ ڈیٹ کیا جا سکے تاکہ یہ ظاہر ہو سکے کہ آیا کوئی والیٹ پہلے سے جڑا ہوا ہے۔
- `connectWalletPressed` - اس فنکشن کو صارف کے MetaMask والیٹ کو ہمارے dApp سے جوڑنے کے لیے کال کیا جائے گا۔
- `onMintPressed` - اس فنکشن کو صارف کے NFT کو منٹ کرنے کے لیے کال کیا جائے گا۔

اس فائل کے آخر کے قریب، ہمارے پاس ہمارے کمپونینٹ کا UI ہے۔ اگر آپ اس کوڈ کو غور سے اسکین کرتے ہیں، تو آپ دیکھیں گے کہ جب ان کے متعلقہ ٹیکسٹ فیلڈز میں ان پٹ تبدیل ہوتا ہے تو ہم اپنے `url`، `name`، اور `description` اسٹیٹ متغیرات کو اپ ڈیٹ کرتے ہیں۔

آپ یہ بھی دیکھیں گے کہ جب بالترتیب `mintButton` اور `walletButton` IDs والے بٹنوں پر کلک کیا جاتا ہے تو `connectWalletPressed` اور `onMintPressed` کو کال کیا جاتا ہے۔

```javascript
//the UI of our component
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

آخر میں، آئیے اس بات پر غور کریں کہ یہ Minter کمپونینٹ کہاں شامل کیا گیا ہے۔

اگر آپ `App.js` فائل پر جاتے ہیں، جو React کا مرکزی کمپونینٹ ہے جو دیگر تمام کمپونینٹس کے لیے کنٹینر کے طور پر کام کرتا ہے، تو آپ دیکھیں گے کہ ہمارا Minter کمپونینٹ لائن 7 پر انجیکٹ کیا گیا ہے۔

**اس ٹیوٹوریل میں، ہم صرف `Minter.js` فائل میں ترمیم کریں گے اور اپنے `src` فولڈر میں فائلیں شامل کریں گے۔**

اب جب کہ ہم سمجھ گئے ہیں کہ ہم کس چیز کے ساتھ کام کر رہے ہیں، آئیے اپنا Ethereum والیٹ سیٹ اپ کریں!

## اپنا Ethereum والیٹ سیٹ اپ کریں {#set-up-your-ethereum-wallet}

صارفین کو آپ کے اسمارٹ کنٹریکٹ کے ساتھ تعامل کرنے کے قابل ہونے کے لیے، انہیں اپنے Ethereum والیٹ کو آپ کے dApp سے جوڑنے کی ضرورت ہوگی۔

### MetaMask ڈاؤن لوڈ کریں {#download-metamask}

اس ٹیوٹوریل کے لیے، ہم MetaMask استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جو آپ کے Ethereum اکاؤنٹ ایڈریس کو منظم کرنے کے لیے استعمال ہوتا ہے۔ اگر آپ Ethereum پر ٹرانزیکشنز کے کام کرنے کے بارے میں مزید سمجھنا چاہتے ہیں، تو [یہ صفحہ](/developers/docs/transactions/) دیکھیں۔

آپ [یہاں](https://metamask.io/download) مفت میں MetaMask اکاؤنٹ ڈاؤن لوڈ اور بنا سکتے ہیں۔ جب آپ ایک اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے ہی ایک اکاؤنٹ ہے، تو یقینی بنائیں کہ اوپر دائیں جانب "Ropsten Test Network" پر سوئچ کریں (تاکہ ہم اصلی پیسے سے نمٹ نہ رہے ہوں)۔

### ایک Faucet سے ether شامل کریں {#add-ether-from-faucet}

اپنے NFTs کو منٹ کرنے (یا Ethereum بلاک چین پر کسی بھی ٹرانزیکشن پر دستخط کرنے) کے لیے، ہمیں کچھ جعلی Eth کی ضرورت ہوگی۔ Eth حاصل کرنے کے لیے آپ [Ropsten faucet](https://faucet.ropsten.be/) پر جا سکتے ہیں اور اپنا Ropsten اکاؤنٹ کا پتہ درج کر سکتے ہیں، پھر "Send Ropsten Eth" پر کلک کریں۔ اس کے فوراً بعد آپ کو اپنے MetaMask اکاؤنٹ میں Eth نظر آنا چاہیے!

### اپنا بیلنس چیک کریں {#check-your-balance}

ہمارا بیلنس موجود ہے یا نہیں اس کی دوبارہ جانچ کرنے کے لیے، آئیے [Alchemy کے کمپوزر ٹول](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) کا استعمال کرتے ہوئے ایک [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) کی درخواست کریں۔ یہ ہمارے والیٹ میں Eth کی رقم واپس کرے گا۔ اپنے MetaMask اکاؤنٹ کا ایڈریس درج کرنے اور "Send Request" پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**نوٹ:** یہ نتیجہ wei میں ہے eth میں نہیں۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ wei سے eth میں تبدیلی یہ ہے: 1 eth = 10¹⁸ wei۔ تو اگر ہم 0xde0b6b3a7640000 کو اعشاریہ میں تبدیل کرتے ہیں تو ہمیں 1\*10¹⁸ ملتا ہے جو 1 eth کے برابر ہے۔

اف! ہمارا جعلی پیسہ سب وہیں ہے! <Emoji text=":money_mouth_face:" size={1} />

## MetaMask کو اپنے UI سے جوڑیں {#connect-metamask-to-your-UI}

اب جب کہ ہمارا MetaMask والیٹ سیٹ اپ ہو گیا ہے، آئیے اپنے dApp کو اس سے جوڑتے ہیں!

چونکہ ہم [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) پیراڈائم کی پابندی کرنا چاہتے ہیں، ہم ایک الگ فائل بنائیں گے جس میں ہمارے dApp کی منطق، ڈیٹا اور قواعد کو منظم کرنے کے لیے ہمارے فنکشنز ہوں گے، اور پھر ان فنکشنز کو اپنے فرنٹ اینڈ (ہمارے Minter.js کمپونینٹ) میں پاس کریں گے۔

### `connectWallet` فنکشن {#connect-wallet-function}

ایسا کرنے کے لیے، آئیے اپنی `src` ڈائریکٹری میں `utils` نام کا ایک نیا فولڈر بنائیں اور اس کے اندر `interact.js` نام کی ایک فائل شامل کریں، جس میں ہمارے تمام والیٹ اور اسمارٹ کنٹریکٹ کے تعامل کے فنکشنز ہوں گے۔

ہماری `interact.js` فائل میں، ہم ایک `connectWallet` فنکشن لکھیں گے، جسے ہم پھر اپنے `Minter.js` کمپونینٹ میں امپورٹ اور کال کریں گے۔

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

آئیے دیکھتے ہیں کہ یہ کوڈ کیا کرتا ہے:

سب سے پہلے، ہمارا فنکشن چیک کرتا ہے کہ آیا آپ کے براؤزر میں `window.ethereum` فعال ہے یا نہیں۔

`window.ethereum` MetaMask اور دیگر والیٹ فراہم کنندگان کے ذریعے انجیکٹ کردہ ایک عالمی API ہے جو ویب سائٹس کو صارفین کے Ethereum اکاؤنٹس کی درخواست کرنے کی اجازت دیتا ہے۔ اگر منظوری مل جاتی ہے، تو یہ ان بلاک چینز سے ڈیٹا پڑھ سکتا ہے جن سے صارف جڑا ہوا ہے، اور صارف کو پیغامات اور ٹرانزیکشنز پر دستخط کرنے کا مشورہ دے سکتا ہے۔ مزید معلومات کے لیے [MetaMask دستاویزات](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) دیکھیں!

اگر `window.ethereum` موجود _نہیں_ ہے، تو اس کا مطلب ہے کہ MetaMask انسٹال نہیں ہے۔ اس کے نتیجے میں ایک JSON آبجیکٹ واپس کیا جاتا ہے، جہاں واپس کیا گیا `address` ایک خالی اسٹرنگ ہوتا ہے، اور `status` JSX آبجیکٹ یہ بتاتا ہے کہ صارف کو MetaMask انسٹال کرنا ہوگا۔

**ہمارے لکھے ہوئے زیادہ تر فنکشنز JSON آبجیکٹ واپس کریں گے جن کا استعمال ہم اپنے اسٹیٹ متغیرات اور UI کو اپ ڈیٹ کرنے کے لیے کر سکتے ہیں۔**

اب اگر `window.ethereum` موجود _ہے_، تو یہ وہ جگہ ہے جہاں چیزیں دلچسپ ہو جاتی ہیں۔

ایک try/catch لوپ کا استعمال کرتے ہوئے، ہم [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) کو کال کرکے MetaMask سے جڑنے کی کوشش کریں گے۔ اس فنکشن کو کال کرنے سے براؤزر میں MetaMask کھل جائے گا، جس کے تحت صارف سے اپنے والیٹ کو آپ کے dApp سے جوڑنے کا کہا جائے گا۔

- اگر صارف جڑنے کا انتخاب کرتا ہے، تو `method: "eth_requestAccounts"` ایک اری واپس کرے گا جس میں صارف کے تمام اکاؤنٹ پتے ہوں گے جو dApp سے جڑے ہوئے ہیں۔ مجموعی طور پر، ہمارا `connectWallet` فنکشن ایک JSON آبجیکٹ واپس کرے گا جس میں اس اری کا _پہلا_ `address` (لائن 9 دیکھیں) اور ایک `status` پیغام ہوگا جو صارف کو اسمارٹ کنٹریکٹ کے لیے ایک پیغام لکھنے کا کہے گا۔
- اگر صارف کنکشن کو مسترد کر دیتا ہے، تو JSON آبجیکٹ میں واپس کیے گئے `address` کے لیے ایک خالی اسٹرنگ اور ایک `status` پیغام ہوگا جو یہ ظاہر کرے گا کہ صارف نے کنکشن کو مسترد کر دیا ہے۔

### اپنے Minter.js UI کمپونینٹ میں connectWallet فنکشن شامل کریں {#add-connect-wallet}

اب جب کہ ہم نے یہ `connectWallet` فنکشن لکھ لیا ہے، آئیے اسے اپنے `Minter.js` کمپونینٹ سے جوڑتے ہیں۔

سب سے پہلے، ہمیں `Minter.js` فائل کے اوپری حصے میں `import { connectWallet } from "./utils/interact.js";` شامل کرکے اپنے فنکشن کو اپنی `Minter.js` فائل میں امپورٹ کرنا ہوگا۔ آپ کی `Minter.js` کی پہلی 11 لائنیں اب اس طرح نظر آنی چاہئیں:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
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

دیکھیں کہ ہماری زیادہ تر فعالیت `interact.js` فائل سے ہمارے `Minter.js` کمپونینٹ سے کیسے الگ کی گئی ہے؟ یہ اس لیے ہے تاکہ ہم M-V-C پیراڈائم کی تعمیل کریں!

`connectWalletPressed` میں، ہم صرف اپنے امپورٹ کردہ `connectWallet` فنکشن پر ایک await کال کرتے ہیں، اور اس کے جواب کا استعمال کرتے ہوئے، ہم اپنے `status` اور `walletAddress` متغیرات کو ان کے اسٹیٹ ہکس کے ذریعے اپ ڈیٹ کرتے ہیں۔

اب، آئیے دونوں فائلوں `Minter.js` اور `interact.js` کو محفوظ کریں اور اب تک اپنے UI کی جانچ کریں۔

اپنے براؤزر کو localhost:3000 پر کھولیں، اور صفحہ کے اوپر دائیں جانب "Connect Wallet" بٹن دبائیں۔

اگر آپ نے MetaMask انسٹال کیا ہوا ہے، تو آپ سے اپنے والیٹ کو اپنے dApp سے جوڑنے کا کہا جائے گا۔ جڑنے کی دعوت قبول کریں۔

آپ کو دیکھنا چاہیے کہ والیٹ بٹن اب یہ ظاہر کرتا ہے کہ آپ کا پتہ جڑ گیا ہے۔

اگلا، صفحہ کو ریفریش کرنے کی کوشش کریں... یہ عجیب ہے۔ ہمارا والیٹ بٹن ہمیں MetaMask سے جڑنے کا کہہ رہا ہے، حالانکہ یہ پہلے سے ہی جڑا ہوا ہے...

لیکن فکر نہ کریں! ہم اسے `getCurrentWalletConnected` نامی فنکشن کو نافذ کرکے آسانی سے ٹھیک کر سکتے ہیں، جو یہ چیک کرے گا کہ آیا کوئی پتہ پہلے سے ہی ہمارے dApp سے جڑا ہوا ہے اور اسی کے مطابق ہمارے UI کو اپ ڈیٹ کرے گا!

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

یہ کوڈ ہمارے پہلے لکھے گئے `connectWallet` فنکشن سے _بہت_ ملتا جلتا ہے۔

بنیادی فرق یہ ہے کہ `eth_requestAccounts` میتھڈ کو کال کرنے کے بجائے، جو صارف کے لیے اپنے والیٹ کو جوڑنے کے لیے MetaMask کھولتا ہے، یہاں ہم `eth_accounts` میتھڈ کو کال کرتے ہیں، جو صرف ایک اری واپس کرتا ہے جس میں فی الحال ہمارے dApp سے جڑے ہوئے MetaMask پتے ہوتے ہیں۔

اس فنکشن کو عملی طور پر دیکھنے کے لیے، آئیے اسے اپنے `Minter.js` کمپونینٹ کے `useEffect` فنکشن میں کال کریں۔

جیسا کہ ہم نے `connectWallet` کے لیے کیا تھا، ہمیں اس فنکشن کو اپنی `interact.js` فائل سے اپنی `Minter.js` فائل میں اس طرح امپورٹ کرنا ہوگا:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //import here
} from "./utils/interact.js"
```

اب، ہم اسے صرف اپنے `useEffect` فنکشن میں کال کرتے ہیں:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

نوٹ کریں، ہم اپنے `walletAddress` اور `status` اسٹیٹ متغیرات کو اپ ڈیٹ کرنے کے لیے `getCurrentWalletConnected` پر اپنی کال کے جواب کا استعمال کرتے ہیں۔

ایک بار جب آپ یہ کوڈ شامل کر لیں، تو اپنے براؤزر ونڈو کو ریفریش کرنے کی کوشش کریں۔ بٹن کو کہنا چاہیے کہ آپ جڑے ہوئے ہیں، اور آپ کے جڑے ہوئے والیٹ کے پتے کا ایک پیش نظارہ دکھانا چاہیے - یہاں تک کہ آپ کے ریفریش کرنے کے بعد بھی!

### addWalletListener نافذ کریں {#implement-add-wallet-listener}

ہمارے dApp والیٹ سیٹ اپ کا آخری مرحلہ والیٹ لسنر کو نافذ کرنا ہے تاکہ جب ہمارے والیٹ کی حالت تبدیل ہو تو ہمارا UI اپ ڈیٹ ہو، جیسے جب صارف منقطع ہوتا ہے یا اکاؤنٹس تبدیل کرتا ہے۔

اپنی `Minter.js` فائل میں، `addWalletListener` نامی ایک فنکشن شامل کریں جو درج ذیل کی طرح نظر آتا ہے:

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

آئیے جلدی سے دیکھتے ہیں کہ یہاں کیا ہو رہا ہے:

- سب سے پہلے، ہمارا فنکشن چیک کرتا ہے کہ آیا `window.ethereum` فعال ہے (یعنی، MetaMask انسٹال ہے)۔
  - اگر ایسا نہیں ہے، تو ہم صرف اپنے `status` اسٹیٹ متغیر کو ایک JSX اسٹرنگ پر سیٹ کرتے ہیں جو صارف کو MetaMask انسٹال کرنے کا کہتا ہے۔
  - اگر یہ فعال ہے، تو ہم لائن 3 پر لسنر `window.ethereum.on("accountsChanged")` سیٹ اپ کرتے ہیں جو MetaMask والیٹ میں اسٹیٹ تبدیلیوں کو سنتا ہے، جس میں یہ شامل ہے کہ جب صارف dApp سے ایک اضافی اکاؤنٹ جوڑتا ہے، اکاؤنٹس تبدیل کرتا ہے، یا ایک اکاؤنٹ منقطع کرتا ہے۔ اگر کم از کم ایک اکاؤنٹ جڑا ہوا ہے، تو `walletAddress` اسٹیٹ متغیر کو لسنر کے ذریعے واپس کیے گئے `accounts` اری میں پہلے اکاؤنٹ کے طور پر اپ ڈیٹ کیا جاتا ہے۔ ورنہ، `walletAddress` کو ایک خالی اسٹرنگ کے طور پر سیٹ کیا جاتا ہے۔

آخر میں، ہمیں اسے اپنے `useEffect` فنکشن میں کال کرنا ہوگا:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

اور voila! ہم نے اپنی تمام والیٹ کی فعالیت کی پروگرامنگ مکمل کر لی ہے! اب جب کہ ہمارا والیٹ سیٹ اپ ہو گیا ہے، آئیے معلوم کریں کہ اپنا NFT کیسے منٹ کیا جائے!

## NFT میٹا ڈیٹا 101 {#nft-metadata-101}

تو یاد ہے اس ٹیوٹوریل کے مرحلہ 0 میں ہم نے جس NFT میٹا ڈیٹا کے بارے میں بات کی تھی — یہ ایک NFT کو زندگی بخشتا ہے، جس سے اسے ڈیجیٹل اثاثہ، نام، تفصیل، اور دیگر صفات جیسی خصوصیات رکھنے کی اجازت ملتی ہے۔

ہمیں اس میٹا ڈیٹا کو JSON آبجیکٹ کے طور پر کنفیگر کرنے اور اسے ذخیرہ کرنے کی ضرورت ہوگی، تاکہ ہم اسے اپنے اسمارٹ کنٹریکٹ کے `mintNFT` فنکشن کو کال کرتے وقت `tokenURI` پیرامیٹر کے طور پر پاس کر سکیں۔

"Link to Asset"، "Name"، "Description" فیلڈز میں موجود متن ہمارے NFT کے میٹا ڈیٹا کی مختلف خصوصیات پر مشتمل ہوگا۔ ہم اس میٹا ڈیٹا کو JSON آبجیکٹ کے طور پر فارمیٹ کریں گے، لیکن ہمارے پاس کچھ اختیارات ہیں کہ ہم اس JSON آبجیکٹ کو کہاں ذخیرہ کر سکتے ہیں:

- ہم اسے Ethereum بلاک چین پر ذخیرہ کر سکتے ہیں؛ تاہم، ایسا کرنا بہت مہنگا ہوگا۔
- ہم اسے ایک مرکزی سرور پر ذخیرہ کر سکتے ہیں، جیسے AWS یا Firebase۔ لیکن یہ ہمارے وکندریقرت کے اصول کو شکست دے گا۔
- ہم IPFS، ایک وکندریقرت پروٹوکول اور پیئر ٹو پیئر نیٹ ورک کا استعمال کر سکتے ہیں جو ایک تقسیم شدہ فائل سسٹم میں ڈیٹا کو ذخیرہ کرنے اور شیئر کرنے کے لیے ہے۔ چونکہ یہ پروٹوکول وکندریقرت اور مفت ہے، یہ ہمارا بہترین آپشن ہے!

IPFS پر اپنے میٹا ڈیٹا کو ذخیرہ کرنے کے لیے، ہم [Pinata](https://pinata.cloud/) کا استعمال کریں گے، جو ایک آسان IPFS API اور ٹول کٹ ہے۔ اگلے مرحلے میں، ہم بالکل وضاحت کریں گے کہ یہ کیسے کرنا ہے!

## اپنے میٹا ڈیٹا کو IPFS پر پن کرنے کے لیے Pinata کا استعمال کریں {#use-pinata-to-pin-your-metadata-to-IPFS}

اگر آپ کے پاس [Pinata](https://pinata.cloud/) اکاؤنٹ نہیں ہے، تو [یہاں](https://app.pinata.cloud/auth/signup) ایک مفت اکاؤنٹ کے لیے سائن اپ کریں اور اپنے ای میل اور اکاؤنٹ کی تصدیق کے لیے مراحل مکمل کریں۔

### اپنی Pinata API کی (key) بنائیں {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) صفحہ پر جائیں، پھر سب سے اوپر "New Key" بٹن کو منتخب کریں، ایڈمن ویجیٹ کو فعال کے طور پر سیٹ کریں، اور اپنی کی (key) کو نام دیں۔

پھر آپ کو اپنی API کی معلومات کے ساتھ ایک پاپ اپ دکھایا جائے گا۔ اسے کسی محفوظ جگہ پر رکھنا یقینی بنائیں۔

اب جب کہ ہماری کی (key) سیٹ اپ ہو گئی ہے، آئیے اسے اپنے پروجیکٹ میں شامل کریں تاکہ ہم اسے استعمال کر سکیں۔

### ایک .env فائل بنائیں {#create-a-env}

ہم اپنی Pinata کی (key) اور سیکرٹ کو ایک انوائرمنٹ فائل میں محفوظ طریقے سے ذخیرہ کر سکتے ہیں۔ آئیے اپنی پروجیکٹ ڈائرکٹری میں [dotenv package](https://www.npmjs.com/package/dotenv) انسٹال کریں۔

اپنے ٹرمینل میں ایک نیا ٹیب کھولیں (مقامی ہوسٹ چلانے والے سے الگ) اور یقینی بنائیں کہ آپ `minter-starter-files` فولڈر میں ہیں، پھر اپنے ٹرمینل میں درج ذیل کمانڈ چلائیں:

```text
npm install dotenv --save
```

اس کے بعد، اپنی کمانڈ لائن پر درج ذیل درج کرکے اپنی `minter-starter-files` کی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں:

```javascript
vim.env
```

یہ آپ کی `.env` فائل کو vim (ایک ٹیکسٹ ایڈیٹر) میں کھول دے گا۔ اسے محفوظ کرنے کے لیے اپنے کی بورڈ پر "esc" + ":" + "q" اسی ترتیب میں دبائیں۔

اس کے بعد، VSCode میں، اپنی `.env` فائل پر جائیں اور اپنی Pinata API کی (key) اور API سیکرٹ کو اس میں شامل کریں، اس طرح:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

فائل کو محفوظ کریں، اور پھر آپ اپنے JSON میٹا ڈیٹا کو IPFS پر اپ لوڈ کرنے کے لیے فنکشن لکھنا شروع کرنے کے لیے تیار ہیں!

### pinJSONToIPFS نافذ کریں {#pin-json-to-ipfs}

خوش قسمتی سے ہمارے لیے، Pinata کے پاس [خاص طور پر JSON ڈیٹا کو IPFS پر اپ لوڈ کرنے کے لیے ایک API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) ہے اور axios کے ساتھ ایک آسان JavaScript مثال ہے جسے ہم کچھ معمولی ترمیم کے ساتھ استعمال کر سکتے ہیں۔

اپنے `utils` فولڈر میں، آئیے `pinata.js` نام کی ایک اور فائل بنائیں اور پھر .env فائل سے اپنی Pinata سیکرٹ اور کی (key) کو اس طرح امپورٹ کریں:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

اس کے بعد، نیچے سے اضافی کوڈ کو اپنی `pinata.js` فائل میں پیسٹ کریں۔ فکر نہ کریں، ہم ہر چیز کا مطلب سمجھائیں گے!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //making axios POST request to Pinata ⬇️
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

سب سے پہلے، یہ [axios](https://www.npmjs.com/package/axios) امپورٹ کرتا ہے، جو براؤزر اور node.js کے لیے ایک پرامس پر مبنی HTTP کلائنٹ ہے، جسے ہم Pinata سے درخواست کرنے کے لیے استعمال کریں گے۔

پھر ہمارے پاس ہمارا غیر مطابقت پذیر فنکشن `pinJSONToIPFS` ہے، جو اپنے ان پٹ کے طور پر `JSONBody` لیتا ہے اور اپنے ہیڈر میں Pinata api کی (key) اور سیکرٹ لیتا ہے، یہ سب ان کے `pinJSONToIPFS` API پر POST کی درخواست کرنے کے لیے ہے۔

- اگر یہ POST درخواست کامیاب ہوتی ہے، تو ہمارا فنکشن ایک JSON آبجیکٹ واپس کرتا ہے جس میں `success` بولین true ہوتا ہے اور `pinataUrl` ہوتا ہے جہاں ہمارا میٹا ڈیٹا پن کیا گیا تھا۔ ہم اس `pinataUrl` کو اپنے اسمارٹ کنٹریکٹ کے منٹ فنکشن میں `tokenURI` ان پٹ کے طور پر استعمال کریں گے۔
- اگر یہ پوسٹ درخواست ناکام ہو جاتی ہے، تو ہمارا فنکشن ایک JSON آبجیکٹ واپس کرتا ہے جس میں `success` بولین false ہوتا ہے اور ایک `message` اسٹرنگ ہوتی ہے جو ہماری غلطی کو بتاتی ہے۔

ہمارے `connectWallet` فنکشن کی واپسی کی اقسام کی طرح، ہم JSON آبجیکٹ واپس کر رہے ہیں تاکہ ہم ان کے پیرامیٹرز کا استعمال اپنے اسٹیٹ متغیرات اور UI کو اپ ڈیٹ کرنے کے لیے کر سکیں۔

## اپنا اسمارٹ کنٹریکٹ لوڈ کریں {#load-your-smart-contract}

اب جب کہ ہمارے پاس اپنے `pinJSONToIPFS` فنکشن کے ذریعے اپنے NFT میٹا ڈیٹا کو IPFS پر اپ لوڈ کرنے کا ایک طریقہ ہے، ہمیں اپنے اسمارٹ کنٹریکٹ کا ایک نمونہ لوڈ کرنے کا ایک طریقہ درکار ہوگا تاکہ ہم اس کے `mintNFT` فنکشن کو کال کر سکیں۔

جیسا کہ ہم نے پہلے ذکر کیا، اس ٹیوٹوریل میں ہم [یہ موجودہ NFT اسمارٹ کنٹریکٹ](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) استعمال کریں گے؛ تاہم، اگر آپ یہ جاننا چاہتے ہیں کہ ہم نے اسے کیسے بنایا، یا خود ایک بنانا چاہتے ہیں، تو ہم پرزور سفارش کرتے ہیں کہ آپ ہمارا دوسرا ٹیوٹوریل، ["How to Create an NFT"](https://www.alchemy.com/docs/how-to-create-an-nft) دیکھیں۔

### کنٹریکٹ ABI {#contract-abi}

اگر آپ نے ہماری فائلوں کا بغور جائزہ لیا ہے، تو آپ نے دیکھا ہوگا کہ ہماری `src` ڈائرکٹری میں، ایک `contract-abi.json` فائل ہے۔ ایک ABI یہ بتانے کے لیے ضروری ہے کہ ایک کنٹریکٹ کس فنکشن کو طلب کرے گا اور یہ بھی یقینی بنانے کے لیے کہ فنکشن آپ کی متوقع شکل میں ڈیٹا واپس کرے گا۔

Ethereum بلاک چین سے جڑنے اور اپنا اسمارٹ کنٹریکٹ لوڈ کرنے کے لیے ہمیں ایک Alchemy API کی (key) اور Alchemy Web3 API کی بھی ضرورت ہوگی۔

### اپنی Alchemy API کی (key) بنائیں {#create-alchemy-api}

اگر آپ کے پاس پہلے سے Alchemy اکاؤنٹ نہیں ہے، تو [یہاں مفت میں سائن اپ کریں۔](https://alchemy.com/?a=eth-org-nft-minter)

ایک بار جب آپ Alchemy اکاؤنٹ بنا لیں، تو آپ ایک ایپ بنا کر API کلید تیار کر سکتے ہیں۔ یہ ہمیں Ropsten ٹیسٹ نیٹ ورک سے درخواستیں کرنے کی اجازت دے گا۔

نیو بار میں "Apps" پر ہوور کرکے اور "Create App" پر کلک کرکے اپنے Alchemy ڈیش بورڈ میں "Create App" صفحہ پر جائیں۔

اپنی ایپ کو نام دیں ہم نے "My First NFT!" کا انتخاب کیا، ایک مختصر تفصیل پیش کریں، اپنی ایپ کی بک کیپنگ کے لیے استعمال ہونے والے ماحول کے لیے "Staging" کو منتخب کریں، اور اپنے نیٹ ورک کے لیے "Ropsten" کا انتخاب کریں۔

“Create app” پر کلک کریں اور بس! آپ کی ایپ نیچے دی گئی ٹیبل میں ظاہر ہونی چاہیے۔

بہت خوب تو اب جب کہ ہم نے اپنا HTTP Alchemy API URL بنا لیا ہے، اسے اپنے کلپ بورڈ پر کاپی کریں...

... اور پھر آئیے اسے اپنی `.env` فائل میں شامل کریں۔ مجموعی طور پر، آپ کی .env فائل اس طرح نظر آنی چاہیے:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

اب جب کہ ہمارے پاس ہمارا کنٹریکٹ ABI اور ہماری Alchemy API کی (key) ہے، ہم [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) کا استعمال کرتے ہوئے اپنا اسمارٹ کنٹریکٹ لوڈ کرنے کے لیے تیار ہیں۔

### اپنا Alchemy Web3 اینڈ پوائنٹ اور کنٹریکٹ سیٹ اپ کریں {#setup-alchemy-endpoint}

سب سے پہلے، اگر آپ کے پاس پہلے سے نہیں ہے، تو آپ کو ٹرمینل میں ہوم ڈائرکٹری: `nft-minter-tutorial` پر جا کر [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) انسٹال کرنے کی ضرورت ہوگی:

```text
cd ..
npm install @alch/alchemy-web3
```

اس کے بعد آئیے اپنی `interact.js` فائل پر واپس چلتے ہیں۔ فائل کے اوپری حصے میں، اپنی .env فائل سے اپنی Alchemy کی (key) امپورٹ کرنے اور اپنا Alchemy Web3 اینڈ پوائنٹ سیٹ اپ کرنے کے لیے درج ذیل کوڈ شامل کریں:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) [Web3.js](https://docs.web3js.org/) کے ارد گرد ایک ریپر ہے، جو بہتر API طریقے اور دیگر اہم فوائد فراہم کرتا ہے تاکہ آپ کی زندگی کو ایک web3 ڈیولپر کے طور پر آسان بنایا جا سکے۔ یہ کم سے کم کنفیگریشن کی ضرورت کے لیے ڈیزائن کیا گیا ہے تاکہ آپ اسے اپنی ایپ میں فوراً استعمال کرنا شروع کر سکیں!

اگلا، آئیے اپنی فائل میں اپنا کنٹریکٹ ABI اور کنٹریکٹ کا پتہ شامل کریں۔

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

ایک بار جب ہمارے پاس یہ دونوں ہو جائیں، تو ہم اپنا منٹ فنکشن کوڈ کرنا شروع کرنے کے لیے تیار ہیں!

## mintNFT فنکشن نافذ کریں {#implement-the-mintnft-function}

اپنی `interact.js` فائل کے اندر، آئیے اپنے فنکشن، `mintNFT` کی وضاحت کریں، جو ہم نامی طور پر ہمارا NFT منٹ کرے گا۔

چونکہ ہم متعدد غیر مطابقت پذیر کالز کریں گے (Pinata سے اپنے میٹا ڈیٹا کو IPFS پر پن کرنے کے لیے، Alchemy Web3 سے اپنا اسمارٹ کنٹریکٹ لوڈ کرنے کے لیے، اور MetaMask سے اپنے ٹرانزیکشنز پر دستخط کرنے کے لیے)، ہمارا فنکشن بھی غیر مطابقت پذیر ہوگا۔

ہمارے فنکشن میں تین ان پٹ ہمارے ڈیجیٹل اثاثے کا `url`، `name`، اور `description` ہوں گے۔ `connectWallet` فنکشن کے نیچے درج ذیل فنکشن کا دستخط شامل کریں:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### ان پٹ کی خرابی کو ہینڈل کرنا {#input-error-handling}

فطرتاً، فنکشن کے آغاز میں کسی قسم کی ان پٹ کی خرابی کو ہینڈل کرنا سمجھ میں آتا ہے، تاکہ اگر ہمارے ان پٹ پیرامیٹرز درست نہ ہوں تو ہم اس فنکشن سے باہر نکل جائیں۔ اپنے فنکشن کے اندر، آئیے درج ذیل کوڈ شامل کریں:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

بنیادی طور پر، اگر کوئی بھی ان پٹ پیرامیٹر ایک خالی اسٹرنگ ہے، تو ہم ایک JSON آبجیکٹ واپس کرتے ہیں جہاں `success` بولین false ہوتا ہے، اور `status` اسٹرنگ یہ بتاتی ہے کہ ہمارے UI میں تمام فیلڈز مکمل ہونے چاہئیں۔

### میٹا ڈیٹا کو IPFS پر اپ لوڈ کریں {#upload-metadata-to-ipfs}

ایک بار جب ہم جان لیں کہ ہمارا میٹا ڈیٹا مناسب طریقے سے فارمیٹ کیا گیا ہے، تو اگلا مرحلہ اسے JSON آبجیکٹ میں لپیٹنا اور اسے اپنے لکھے ہوئے `pinJSONToIPFS` کے ذریعے IPFS پر اپ لوڈ کرنا ہے!

ایسا کرنے کے لیے، ہمیں پہلے اپنی `interact.js` فائل میں `pinJSONToIPFS` فنکشن کو امپورٹ کرنا ہوگا۔ `interact.js` کے بالکل اوپر، آئیے شامل کریں:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

یاد رہے کہ `pinJSONToIPFS` ایک JSON باڈی لیتا ہے۔ تو اس پر کال کرنے سے پہلے، ہمیں اپنے `url`، `name`، اور `description` پیرامیٹرز کو JSON آبجیکٹ میں فارمیٹ کرنے کی ضرورت ہوگی۔

آئیے اپنے کوڈ کو `metadata` نامی ایک JSON آبجیکٹ بنانے کے لیے اپ ڈیٹ کریں اور پھر اس `metadata` پیرامیٹر کے ساتھ `pinJSONToIPFS` پر کال کریں:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //make pinata call
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

نوٹ کریں، ہم `pinJSONToIPFS(metadata)` پر اپنی کال کا جواب `pinataResponse` آبجیکٹ میں محفوظ کرتے ہیں۔ پھر، ہم اس آبجیکٹ کو کسی بھی خرابی کے لیے پارس کرتے ہیں۔

اگر کوئی خرابی ہوتی ہے، تو ہم ایک JSON آبجیکٹ واپس کرتے ہیں جہاں `success` بولین false ہوتا ہے اور ہماری `status` اسٹرنگ بتاتی ہے کہ ہماری کال ناکام ہوگئی۔ ورنہ، ہم `pinataResponse` سے `pinataURL` نکالتے ہیں اور اسے اپنے `tokenURI` متغیر کے طور پر محفوظ کرتے ہیں۔

اب وقت آگیا ہے کہ ہم اپنے اسمارٹ کنٹریکٹ کو Alchemy Web3 API کا استعمال کرتے ہوئے لوڈ کریں جسے ہم نے اپنی فائل کے اوپری حصے میں شروع کیا تھا۔ کنٹریکٹ کو `window.contract` عالمی متغیر پر سیٹ کرنے کے لیے `mintNFT` فنکشن کے نیچے کوڈ کی درج ذیل لائن شامل کریں:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

ہمارے `mintNFT` فنکشن میں شامل کرنے والی آخری چیز ہمارا Ethereum ٹرانزیکشن ہے:

```javascript
//set up your Ethereum transaction
const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: window.ethereum.selectedAddress, // must match user's active address.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //make call to NFT smart contract
}

//sign the transaction via MetaMask
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

اگر آپ پہلے سے ہی Ethereum ٹرانزیکشنز سے واقف ہیں، تو آپ دیکھیں گے کہ ساخت آپ نے جو دیکھا ہے اس سے کافی ملتی جلتی ہے۔

- سب سے پہلے، ہم اپنے ٹرانزیکشنز پیرامیٹرز سیٹ اپ کرتے ہیں۔
  - `to` وصول کنندہ کا پتہ (ہمارا اسمارٹ کنٹریکٹ) بتاتا ہے
  - `from` ٹرانزیکشن کے دستخط کنندہ (صارف کا MetaMask سے جڑا ہوا پتہ: `window.ethereum.selectedAddress`) کی وضاحت کرتا ہے
  - `data` میں ہمارے اسمارٹ کنٹریکٹ `mintNFT` میتھڈ پر کال شامل ہے، جو ہمارے `tokenURI` اور صارف کے والیٹ پتے، `window.ethereum.selectedAddress`، کو ان پٹ کے طور پر وصول کرتا ہے۔
- پھر، ہم ایک await کال، `window.ethereum.request` کرتے ہیں، جہاں ہم MetaMask سے ٹرانزیکشن پر دستخط کرنے کو کہتے ہیں۔ نوٹ کریں، اس درخواست میں، ہم اپنے eth میتھڈ (eth_SentTransaction) کی وضاحت کر رہے ہیں اور اپنے `transactionParameters` پاس کر رہے ہیں۔ اس مقام پر، MetaMask براؤزر میں کھل جائے گا، اور صارف سے ٹرانزیکشن پر دستخط کرنے یا مسترد کرنے کا کہے گا۔
  - اگر ٹرانزیکشن کامیاب ہو جاتا ہے، تو فنکشن ایک JSON آبجیکٹ واپس کرے گا جہاں بولین `success` کو true پر سیٹ کیا گیا ہے اور `status` اسٹرنگ صارف کو اپنے ٹرانزیکشن کے بارے میں مزید معلومات کے لیے Etherscan چیک کرنے کا کہتی ہے۔
  - اگر ٹرانزیکشن ناکام ہو جاتا ہے، تو فنکشن ایک JSON آبجیکٹ واپس کرے گا جہاں `success` بولین کو false پر سیٹ کیا گیا ہے، اور `status` اسٹرنگ غلطی کا پیغام بتاتی ہے۔

مجموعی طور پر، ہمارا `mintNFT` فنکشن اس طرح نظر آنا چاہیے:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata pin request
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //make call to NFT smart contract
  }

  //sign transaction via MetaMask
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

یہ ایک بہت بڑا فنکشن ہے! اب، ہمیں صرف اپنے `mintNFT` فنکشن کو اپنے `Minter.js` کمپونینٹ سے جوڑنے کی ضرورت ہے...

## mintNFT کو ہمارے Minter.js فرنٹ اینڈ سے جوڑیں {#connect-our-frontend}

اپنی `Minter.js` فائل کھولیں اور اوپر کی `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` لائن کو اپ ڈیٹ کرکے یہ کریں:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

آخر میں، اپنے امپورٹ کردہ `mintNFT` فنکشن پر await کال کرنے کے لیے `onMintPressed` فنکشن کو نافذ کریں اور `status` اسٹیٹ متغیر کو اپ ڈیٹ کریں تاکہ یہ ظاہر ہو سکے کہ ہمارا ٹرانزیکشن کامیاب ہوا یا ناکام:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## اپنا NFT ایک لائیو ویب سائٹ پر تعینات کریں {#deploy-your-NFT}

صارفین کے ساتھ تعامل کے لیے اپنے پروجیکٹ کو لائیو کرنے کے لیے تیار ہیں؟ اپنے منٹر کو ایک لائیو ویب سائٹ پر تعینات کرنے کے لیے [یہ ٹیوٹوریل](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) دیکھیں۔

ایک آخری قدم...

## بلاک چین کی دنیا میں طوفان برپا کریں {#take-the-blockchain-world-by-storm}

مذاق کر رہا ہوں، آپ ٹیوٹوریل کے آخر تک پہنچ گئے ہیں!

خلاصہ یہ کہ، ایک NFT منٹر بنا کر، آپ نے کامیابی سے سیکھا کہ:

- اپنے فرنٹ اینڈ پروجیکٹ کے ذریعے MetaMask سے جڑیں
- اپنے فرنٹ اینڈ سے اسمارٹ کنٹریکٹ طریقوں کو کال کریں
- MetaMask کا استعمال کرتے ہوئے ٹرانزیکشنز پر دستخط کریں

یقیناً، آپ اپنے والیٹ میں اپنے dApp کے ذریعے منٹ کیے گئے NFTs کو دکھانا چاہیں گے — تو ہمارا فوری ٹیوٹوریل [اپنے NFT کو اپنے والیٹ میں کیسے دیکھیں](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) ضرور دیکھیں۔

اور، ہمیشہ کی طرح، اگر آپ کے کوئی سوالات ہیں، تو ہم [Alchemy Discord](https://discord.gg/gWuC7zB) میں مدد کے لیے موجود ہیں۔ ہم یہ دیکھنے کے لیے انتظار نہیں کر سکتے کہ آپ اس ٹیوٹوریل کے تصورات کو اپنے مستقبل کے پروجیکٹس پر کیسے لاگو کرتے ہیں!
