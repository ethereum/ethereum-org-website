---
title: "⁦NFT⁩ منٹر ٹیوٹوریل"
description: "اس ٹیوٹوریل میں، آپ ایک ⁦NFT⁩ منٹر بنائیں گے اور سیکھیں گے کہ میٹاماسک اور ⁦Web3⁩ ٹولز کا استعمال کرتے ہوئے اپنے سمارٹ کنٹریکٹ کو ⁦React⁩ فرنٹ اینڈ سے جوڑ کر ایک فل اسٹیک غیر مرکزی ایپلی کیشن (dapp) کیسے بنائی جائے۔"
author: "smudgil"
tags: ["solidity", "NFT", "alchemy", "سمارٹ کنٹریکٹس", "فرنٹ اینڈ", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: "⁦NFT⁩ منٹر ⁦dapp⁩"
lang: ur
published: 2021-10-06
---

ویب۲ کے پس منظر سے آنے والے ڈیولپرز کے لیے سب سے بڑے چیلنجز میں سے ایک یہ جاننا ہے کہ اپنے سمارٹ کنٹریکٹ کو فرنٹ اینڈ پروجیکٹ سے کیسے جوڑا جائے اور اس کے ساتھ کیسے تعامل کیا جائے۔

ایک <span dir="ltr">NFT</span> منٹر بنا کر — ایک سادہ <span dir="ltr">UI</span> جہاں آپ اپنے ڈیجیٹل اثاثہ کا لنک، ایک عنوان، اور ایک تفصیل درج کر سکتے ہیں — آپ سیکھیں گے کہ کیسے:

- اپنے فرنٹ اینڈ پروجیکٹ کے ذریعے میٹاماسک سے جڑیں
- اپنے فرنٹ اینڈ سے سمارٹ کنٹریکٹ کے طریقوں (methods) کو کال کریں
- میٹاماسک کا استعمال کرتے ہوئے ٹرانزیکشنز پر دستخط کریں

اس ٹیوٹوریل میں، ہم [React](https://react.dev/) کو اپنے فرنٹ اینڈ فریم ورک کے طور پر استعمال کریں گے۔ چونکہ یہ ٹیوٹوریل بنیادی طور پر Web3 ڈیولپمنٹ پر مرکوز ہے، اس لیے ہم React کے بنیادی اصولوں کی وضاحت کرنے میں زیادہ وقت صرف نہیں کریں گے۔ اس کے بجائے، ہم اپنے پروجیکٹ میں فعالیت لانے پر توجہ مرکوز کریں گے۔

ایک شرط کے طور پر، آپ کو React کی ابتدائی سطح کی سمجھ ہونی چاہیے—یہ جاننا چاہیے کہ components، props، useState/useEffect، اور بنیادی فنکشن کالنگ کیسے کام کرتی ہے۔ اگر آپ نے پہلے کبھی ان اصطلاحات کے بارے میں نہیں سنا ہے، تو آپ اس [React کے تعارفی ٹیوٹوریل](https://react.dev/learn/tutorial-tic-tac-toe) کو دیکھ سکتے ہیں۔ بصری طور پر سیکھنے والوں کے لیے، ہم Net Ninja کی اس بہترین [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) ویڈیو سیریز کی انتہائی سفارش کرتے ہیں۔

اور اگر آپ نے پہلے سے ایسا نہیں کیا ہے، تو آپ کو اس ٹیوٹوریل کو مکمل کرنے کے ساتھ ساتھ بلاک چین پر کچھ بھی بنانے کے لیے یقینی طور پر ایک Alchemy اکاؤنٹ کی ضرورت ہوگی۔ ایک مفت اکاؤنٹ کے لیے [یہاں](https://alchemy.com/) سائن اپ کریں۔

مزید تاخیر کے بغیر، آئیے شروع کرتے ہیں!

## <span dir="ltr">NFTs</span> بنانا 101 {#making-nfts-101}

اس سے پہلے کہ ہم کسی بھی کوڈ کو دیکھنا شروع کریں، یہ سمجھنا ضروری ہے کہ <span dir="ltr">NFT</span> بنانا کیسے کام کرتا ہے۔ اس میں دو مراحل شامل ہیں:

### ایتھیریم بلاک چین پر ایک <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ شائع کریں {#publish-nft}

دو <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ معیارات کے درمیان سب سے بڑا فرق یہ ہے کہ ERC-1155 ایک ملٹی ٹوکن معیار ہے اور اس میں بیچ (batch) کی فعالیت شامل ہے، جبکہ ERC-721 ایک سنگل ٹوکن معیار ہے اور اس لیے ایک وقت میں صرف ایک ٹوکن کی منتقلی کی حمایت کرتا ہے۔

### ڈھلائی (minting) کے فنکشن کو کال کریں {#minting-function}

عام طور پر، اس ڈھلائی کے فنکشن کا تقاضا ہوتا ہے کہ آپ دو متغیرات کو پیرامیٹرز کے طور پر پاس کریں، پہلا `recipient`، جو اس پتہ کی وضاحت کرتا ہے جو آپ کا تازہ ڈھالا گیا <span dir="ltr">NFT</span> وصول کرے گا، اور دوسرا <span dir="ltr">NFT</span> کا `tokenURI`، ایک سٹرنگ جو ایک <span dir="ltr">JSON</span> دستاویز کو حل کرتی ہے جو <span dir="ltr">NFT</span> کے میٹا ڈیٹا کو بیان کرتی ہے۔

ایک <span dir="ltr">NFT</span> کا میٹا ڈیٹا ہی دراصل اسے زندہ کرتا ہے، جس سے اس میں خصوصیات شامل ہوتی ہیں، جیسے کہ نام، تفصیل، تصویر (یا مختلف ڈیجیٹل اثاثہ)، اور دیگر اوصاف۔ یہاں [tokenURI کی ایک مثال](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2) ہے، جس میں ایک <span dir="ltr">NFT</span> کا میٹا ڈیٹا ہوتا ہے۔

اس ٹیوٹوریل میں، ہم حصہ ۲ پر توجہ مرکوز کرنے جا رہے ہیں، جو کہ ہمارے React <span dir="ltr">UI</span> کا استعمال کرتے ہوئے ایک موجودہ <span dir="ltr">NFT</span> کے سمارٹ کنٹریکٹ کے ڈھلائی کے فنکشن کو کال کرنا ہے۔

[یہاں ایک لنک ہے](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) اس ERC-721 <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ کا جسے ہم اس ٹیوٹوریل میں کال کریں گے۔ اگر آپ یہ جاننا چاہتے ہیں کہ ہم نے اسے کیسے بنایا، تو ہم انتہائی سفارش کرتے ہیں کہ آپ ہمارا دوسرا ٹیوٹوریل، ["ایک NFT کیسے بنائیں"](https://www.alchemy.com/docs/how-to-create-an-nft) دیکھیں۔

زبردست، اب جب کہ ہم سمجھ گئے ہیں کہ <span dir="ltr">NFT</span> بنانا کیسے کام کرتا ہے، آئیے اپنی سٹارٹر فائلوں کو کلون کریں!

## سٹارٹر فائلوں کو کلون کریں {#clone-the-starter-files}

سب سے پہلے، اس پروجیکٹ کے لیے سٹارٹر فائلیں حاصل کرنے کے لیے [nft-minter-tutorial GitHub ریپوزٹری](https://github.com/alchemyplatform/nft-minter-tutorial) پر جائیں۔ اس ریپوزٹری کو اپنے مقامی ماحول میں کلون کریں۔

جب آپ اس کلون شدہ `nft-minter-tutorial` ریپوزٹری کو کھولیں گے، تو آپ دیکھیں گے کہ اس میں دو فولڈرز ہیں: `minter-starter-files` اور `nft-minter`۔

- `minter-starter-files` میں اس پروجیکٹ کے لیے سٹارٹر فائلیں (بنیادی طور پر React <span dir="ltr">UI</span>) شامل ہیں۔ اس ٹیوٹوریل میں، **ہم اس ڈائرکٹری میں کام کریں گے**، کیونکہ آپ سیکھیں گے کہ اس <span dir="ltr">UI</span> کو اپنے ایتھیریم والیٹ اور ایک <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ سے جوڑ کر کیسے زندہ کیا جائے۔
- `nft-minter` میں مکمل شدہ ٹیوٹوریل شامل ہے اور یہ آپ کے لیے ایک **حوالہ** کے طور پر موجود ہے **اگر آپ کہیں پھنس جائیں۔**

اس کے بعد، اپنے کوڈ ایڈیٹر میں `minter-starter-files` کی اپنی کاپی کھولیں، اور پھر اپنے `src` فولڈر میں جائیں۔

ہم جو بھی کوڈ لکھیں گے وہ `src` فولڈر کے اندر ہوگا۔ ہم `Minter.js` جزو (component) میں ترمیم کریں گے اور اپنے پروجیکٹ کو Web3 کی فعالیت دینے کے لیے اضافی جاوا اسکرپٹ فائلیں لکھیں گے۔

## مرحلہ ۲: ہماری سٹارٹر فائلوں کا جائزہ لیں {#step-2-check-out-our-starter-files}

اس سے پہلے کہ ہم کوڈنگ شروع کریں، یہ دیکھنا ضروری ہے کہ سٹارٹر فائلوں میں ہمارے لیے پہلے سے کیا فراہم کیا گیا ہے۔

### اپنے React پروجیکٹ کو چلائیں {#get-your-react-project-running}

آئیے اپنے براؤزر میں React پروجیکٹ کو چلا کر شروع کرتے ہیں۔ React کی خوبصورتی یہ ہے کہ ایک بار جب ہمارا پروجیکٹ ہمارے براؤزر میں چلنے لگتا ہے، تو ہم جو بھی تبدیلیاں محفوظ کرتے ہیں وہ ہمارے براؤزر میں لائیو اپ ڈیٹ ہو جائیں گی۔

پروجیکٹ کو چلانے کے لیے، `minter-starter-files` فولڈر کی روٹ ڈائرکٹری میں جائیں، اور پروجیکٹ کی انحصار (dependencies) کو انسٹال کرنے کے لیے اپنے ٹرمینل میں `npm install` چلائیں:

```bash
cd minter-starter-files
npm install
```

ایک بار جب وہ انسٹال ہو جائیں، تو اپنے ٹرمینل میں `npm start` چلائیں:

```bash
npm start
```

ایسا کرنے سے آپ کے براؤزر میں <span dir="ltr">http://localhost:3000/</span> کھلنا چاہیے، جہاں آپ ہمارے پروجیکٹ کا فرنٹ اینڈ دیکھیں گے۔ یہ ۳ فیلڈز پر مشتمل ہونا چاہیے: آپ کے <span dir="ltr">NFT</span> کے اثاثے کا لنک درج کرنے کی جگہ، اپنے <span dir="ltr">NFT</span> کا نام درج کریں، اور ایک تفصیل فراہم کریں۔

اگر آپ "Connect Wallet" یا "Mint NFT" بٹنوں پر کلک کرنے کی کوشش کرتے ہیں، تو آپ دیکھیں گے کہ وہ کام نہیں کرتے—اس کی وجہ یہ ہے کہ ہمیں ابھی بھی ان کی فعالیت کو پروگرام کرنے کی ضرورت ہے! :)

### <span dir="ltr">Minter.js</span> جزو {#minter-js}

**نوٹ:** یقینی بنائیں کہ آپ `minter-starter-files` فولڈر میں ہیں نہ کہ `nft-minter` فولڈر میں!

آئیے اپنے ایڈیٹر میں واپس `src` فولڈر میں جائیں اور `Minter.js` فائل کھولیں۔ یہ بہت اہم ہے کہ ہم اس فائل میں موجود ہر چیز کو سمجھیں، کیونکہ یہ وہ بنیادی React جزو ہے جس پر ہم کام کریں گے۔

ہماری اس فائل کے اوپری حصے میں، ہمارے پاس ہمارے حالت (state) کے متغیرات ہیں جنہیں ہم مخصوص ایونٹس کے بعد اپ ڈیٹ کریں گے۔

```javascript
//حالت کے متغیرات
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

کبھی React کے state متغیرات یا state ہکس کے بارے میں نہیں سنا؟ [ان](https://legacy.reactjs.org/docs/hooks-state.html) دستاویزات کو دیکھیں۔

یہاں بتایا گیا ہے کہ ہر متغیر کس چیز کی نمائندگی کرتا ہے:

- `walletAddress` - ایک سٹرنگ جو صارف کے والیٹ کا پتہ محفوظ کرتی ہے
- `status` - ایک سٹرنگ جس میں <span dir="ltr">UI</span> کے نچلے حصے میں دکھانے کے لیے ایک پیغام ہوتا ہے
- `name` - ایک سٹرنگ جو <span dir="ltr">NFT</span> کا نام محفوظ کرتی ہے
- `description` - ایک سٹرنگ جو <span dir="ltr">NFT</span> کی تفصیل محفوظ کرتی ہے
- `url` - ایک سٹرنگ جو <span dir="ltr">NFT</span> کے ڈیجیٹل اثاثہ کا لنک ہے

حالت کے متغیرات کے بعد، آپ کو تین غیر نافذ شدہ فنکشنز نظر آئیں گے: `useEffect`، `connectWalletPressed`، اور `onMintPressed`۔ آپ دیکھیں گے کہ یہ تمام فنکشنز `async` ہیں، اس کی وجہ یہ ہے کہ ہم ان میں غیر مطابقت پذیر (asynchronous) API کالز کریں گے! ان کے نام ان کی فعالیت کے عین مطابق ہیں:

```javascript
useEffect(async () => {
  //TODO: نافذ کریں
}, [])

const connectWalletPressed = async () => {
  //TODO: نافذ کریں
}

const onMintPressed = async () => {
  //TODO: نافذ کریں
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - یہ ایک React ہک ہے جسے آپ کے جزو کے رینڈر ہونے کے بعد کال کیا جاتا ہے۔ چونکہ اس میں ایک خالی سرنی (array) `[]` prop پاس کی گئی ہے (لائن 3 دیکھیں)، اس لیے اسے صرف جزو کے _پہلے_ رینڈر پر کال کیا جائے گا۔ یہاں ہم اپنے والیٹ لسنر اور ایک اور والیٹ فنکشن کو کال کریں گے تاکہ ہمارے <span dir="ltr">UI</span> کو اپ ڈیٹ کیا جا سکے تاکہ یہ ظاہر ہو سکے کہ آیا کوئی والیٹ پہلے سے جڑا ہوا ہے۔
- `connectWalletPressed` - اس فنکشن کو صارف کے میٹاماسک والیٹ کو ہماری غیر مرکزی ایپلی کیشن (dapp) سے جوڑنے کے لیے کال کیا جائے گا۔
- `onMintPressed` - اس فنکشن کو صارف کا <span dir="ltr">NFT</span> ڈھالنے کے لیے کال کیا جائے گا۔

اس فائل کے اختتام کے قریب، ہمارے پاس اپنے جزو کا <span dir="ltr">UI</span> ہے۔ اگر آپ اس کوڈ کا بغور جائزہ لیں، تو آپ دیکھیں گے کہ ہم اپنے `url`، `name`، اور `description` حالت کے متغیرات کو اپ ڈیٹ کرتے ہیں جب ان کے متعلقہ ٹیکسٹ فیلڈز میں ان پٹ تبدیل ہوتا ہے۔

آپ یہ بھی دیکھیں گے کہ `connectWalletPressed` اور `onMintPressed` کو اس وقت کال کیا جاتا ہے جب بالترتیب `mintButton` اور `walletButton` IDs والے بٹنوں پر کلک کیا جاتا ہے۔

```javascript
//ہمارے جزو کا UI
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

اب جب کہ ہم سمجھ گئے ہیں کہ ہم کس چیز کے ساتھ کام کر رہے ہیں، آئیے اپنا ایتھیریم والیٹ ترتیب دیں!

## اپنا ایتھیریم والیٹ ترتیب دیں {#set-up-your-ethereum-wallet}

صارفین کو آپ کے سمارٹ کنٹریکٹ کے ساتھ تعامل کرنے کے قابل ہونے کے لیے انہیں اپنے ایتھیریم والیٹ کو آپ کی غیر مرکزی ایپلی کیشن (dapp) سے جوڑنے کی ضرورت ہوگی۔

### میٹاماسک ڈاؤن لوڈ کریں {#download-metamask}

اس ٹیوٹوریل کے لیے، ہم میٹاماسک کا استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جسے آپ کے ایتھیریم اکاؤنٹ کے پتہ کو منظم کرنے کے لیے استعمال کیا جاتا ہے۔ اگر آپ اس بارے میں مزید سمجھنا چاہتے ہیں کہ ایتھیریم پر ٹرانزیکشنز کیسے کام کرتی ہیں، تو [اس صفحہ](/developers/docs/transactions/) کو دیکھیں۔

آپ [یہاں](https://metamask.io/download) مفت میں میٹاماسک ڈاؤن لوڈ کر سکتے ہیں اور ایک اکاؤنٹ بنا سکتے ہیں۔ جب آپ ایک اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے ہی ایک اکاؤنٹ ہے، تو یقینی بنائیں کہ اوپری دائیں جانب "Ropsten Test Network" پر سوئچ کریں (تاکہ ہم حقیقی رقم کے ساتھ کام نہ کر رہے ہوں)۔

### ایک فوسٹ سے ایتھر شامل کریں {#add-ether-from-faucet}

اپنے <span dir="ltr">NFTs</span> کو ڈھالنے (یا ایتھیریم بلاک چین پر کسی بھی ٹرانزیکشنز پر دستخط کرنے) کے لیے، ہمیں کچھ نقلی <span dir="ltr">Eth</span> کی ضرورت ہوگی۔ <span dir="ltr">Eth</span> حاصل کرنے کے لیے آپ [روپسٹن فوسٹ](https://faucet.ropsten.be/) پر جا سکتے ہیں اور اپنا روپسٹن اکاؤنٹ کا پتہ درج کر سکتے ہیں، پھر "Send Ropsten Eth" پر کلک کریں۔ آپ کو جلد ہی اپنے میٹاماسک اکاؤنٹ میں <span dir="ltr">Eth</span> نظر آنا چاہیے!

### اپنا بیلنس چیک کریں {#check-your-balance}

یہ دوبارہ چیک کرنے کے لیے کہ ہمارا بیلنس موجود ہے، آئیے [Alchemy کے کمپوزر ٹول](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) کا استعمال کرتے ہوئے ایک [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) درخواست کریں۔ یہ ہمارے والیٹ میں موجود <span dir="ltr">Eth</span> کی مقدار واپس کرے گا۔ اپنا میٹاماسک اکاؤنٹ کا پتہ درج کرنے اور "Send Request" پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**نوٹ:** یہ نتیجہ Wei میں ہے نہ کہ eth میں۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ Wei سے eth میں تبدیلی یہ ہے: <span dir="ltr">1 eth = 10¹⁸ wei</span>۔ لہذا اگر ہم <span dir="ltr">0xde0b6b3a7640000</span> کو اعشاریہ میں تبدیل کریں تو ہمیں <span dir="ltr">1\*10¹⁸</span> ملتا ہے جو <span dir="ltr">1 eth</span> کے برابر ہے۔

شکر ہے! ہماری نقلی رقم پوری طرح موجود ہے! <Emoji text=":money_mouth_face:" size={1} />

## میٹاماسک کو اپنے <span dir="ltr">UI</span> سے جوڑیں {#connect-metamask-to-your-ui}

اب جب کہ ہمارا میٹاماسک والیٹ ترتیب پا چکا ہے، آئیے اپنی غیر مرکزی ایپلی کیشن (dapp) کو اس سے جوڑیں!

چونکہ ہم [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) پیراڈائم کی پیروی کرنا چاہتے ہیں، اس لیے ہم ایک الگ فائل بنانے جا رہے ہیں جس میں ہماری غیر مرکزی ایپلی کیشن (dapp) کی منطق، ڈیٹا، اور قواعد کو منظم کرنے کے لیے ہمارے فنکشنز شامل ہوں گے، اور پھر ان فنکشنز کو اپنے فرنٹ اینڈ (ہمارے Minter.js جزو) میں پاس کریں گے۔

### `connectWallet` فنکشن {#connect-wallet-function}

ایسا کرنے کے لیے، آئیے آپ کی `src` ڈائرکٹری میں `utils` نام کا ایک نیا فولڈر بنائیں اور اس کے اندر `interact.js` نام کی ایک فائل شامل کریں، جس میں ہمارے تمام والیٹ اور سمارٹ کنٹریکٹ کے تعامل کے فنکشنز شامل ہوں گے۔

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

آئیے جائزہ لیتے ہیں کہ یہ کوڈ کیا کرتا ہے:

سب سے پہلے، ہمارا فنکشن چیک کرتا ہے کہ آیا آپ کے براؤزر میں `window.ethereum` فعال ہے۔

`window.ethereum` ایک عالمی API ہے جسے میٹاماسک اور دیگر والیٹ فراہم کنندگان کے ذریعے شامل کیا گیا ہے جو ویب سائٹس کو صارفین کے ایتھیریم اکاؤنٹس کی درخواست کرنے کی اجازت دیتا ہے۔ اگر منظور ہو جائے، تو یہ ان بلاک چینز سے ڈیٹا پڑھ سکتا ہے جن سے صارف جڑا ہوا ہے، اور تجویز کر سکتا ہے کہ صارف پیغامات اور ٹرانزیکشنز پر دستخط کرے۔ مزید معلومات کے لیے [میٹاماسک کی دستاویزات](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) دیکھیں!

اگر `window.ethereum` موجود _نہیں_ ہے، تو اس کا مطلب ہے کہ میٹاماسک انسٹال نہیں ہے۔ اس کے نتیجے میں ایک <span dir="ltr">JSON</span> آبجیکٹ واپس کیا جاتا ہے، جہاں واپس کیا گیا `address` ایک خالی سٹرنگ ہے، اور `status` JSX آبجیکٹ یہ پیغام دیتا ہے کہ صارف کو میٹاماسک انسٹال کرنا چاہیے۔

**ہمارے لکھے گئے زیادہ تر فنکشنز <span dir="ltr">JSON</span> آبجیکٹس واپس کر رہے ہوں گے جنہیں ہم اپنے حالت کے متغیرات اور <span dir="ltr">UI</span> کو اپ ڈیٹ کرنے کے لیے استعمال کر سکتے ہیں۔**

اب اگر `window.ethereum` موجود _ہے_، تو تب چیزیں دلچسپ ہو جاتی ہیں۔

ایک try/catch لوپ کا استعمال کرتے ہوئے، ہم [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) کو کال کر کے میٹاماسک سے جڑنے کی کوشش کریں گے۔ اس فنکشن کو کال کرنے سے براؤزر میں میٹاماسک کھل جائے گا، جس کے ذریعے صارف کو اپنے والیٹ کو آپ کی غیر مرکزی ایپلی کیشن (dapp) سے جوڑنے کا کہا جائے گا۔

- اگر صارف جڑنے کا انتخاب کرتا ہے، تو `method: "eth_requestAccounts"` ایک سرنی (array) واپس کرے گا جس میں صارف کے اکاؤنٹ کے وہ تمام پتے شامل ہوں گے جو غیر مرکزی ایپلی کیشن (dapp) سے جڑے ہوئے ہیں۔ مجموعی طور پر، ہمارا `connectWallet` فنکشن ایک <span dir="ltr">JSON</span> آبجیکٹ واپس کرے گا جس میں اس سرنی میں _پہلا_ `address` (لائن 9 دیکھیں) اور ایک `status` پیغام شامل ہوگا جو صارف کو سمارٹ کنٹریکٹ کو ایک پیغام لکھنے کی ترغیب دیتا ہے۔
- اگر صارف کنکشن کو مسترد کر دیتا ہے، تو <span dir="ltr">JSON</span> آبجیکٹ میں واپس کیے گئے `address` کے لیے ایک خالی سٹرنگ اور ایک `status` پیغام شامل ہوگا جو یہ ظاہر کرتا ہے کہ صارف نے کنکشن کو مسترد کر دیا ہے۔

### اپنے <span dir="ltr">Minter.js UI</span> جزو میں connectWallet فنکشن شامل کریں {#add-connect-wallet}

اب جب کہ ہم نے یہ `connectWallet` فنکشن لکھ لیا ہے، آئیے اسے اپنے `Minter.js.` جزو سے جوڑتے ہیں۔

سب سے پہلے، ہمیں `Minter.js` فائل کے اوپری حصے میں `import { connectWallet } from "./utils/interact.js";` شامل کر کے اپنے فنکشن کو اپنی `Minter.js` فائل میں امپورٹ کرنا ہوگا۔ آپ کی `Minter.js` کی پہلی 11 لائنیں اب اس طرح نظر آنی چاہئیں:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //حالت کے متغیرات
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

غور کریں کہ ہماری زیادہ تر فعالیت کو `interact.js` فائل سے ہمارے `Minter.js` جزو سے کیسے الگ کیا گیا ہے؟ یہ اس لیے ہے تاکہ ہم M-V-C پیراڈائم کی تعمیل کریں!

`connectWalletPressed` میں، ہم بس اپنے امپورٹ کردہ `connectWallet` فنکشن کو ایک await کال کرتے ہیں، اور اس کے جواب کا استعمال کرتے ہوئے، ہم اپنے `status` اور `walletAddress` متغیرات کو ان کے state ہکس کے ذریعے اپ ڈیٹ کرتے ہیں۔

اب، آئیے دونوں فائلوں `Minter.js` اور `interact.js` کو محفوظ کریں اور اب تک کے اپنے <span dir="ltr">UI</span> کی جانچ کریں۔

اپنے براؤزر کو <span dir="ltr">localhost:3000</span> پر کھولیں، اور صفحہ کے اوپری دائیں جانب "Connect Wallet" بٹن دبائیں۔

اگر آپ کے پاس میٹاماسک انسٹال ہے، تو آپ کو اپنے والیٹ کو اپنی غیر مرکزی ایپلی کیشن (dapp) سے جوڑنے کا کہا جائے گا۔ جڑنے کی دعوت قبول کریں۔

آپ کو دیکھنا چاہیے کہ والیٹ کا بٹن اب ظاہر کرتا ہے کہ آپ کا پتہ جڑا ہوا ہے۔

اس کے بعد، صفحہ کو ریفریش کرنے کی کوشش کریں... یہ عجیب ہے۔ ہمارا والیٹ بٹن ہمیں میٹاماسک کو جوڑنے کا کہہ رہا ہے، حالانکہ یہ پہلے سے ہی جڑا ہوا ہے...

تاہم پریشان نہ ہوں! ہم `getCurrentWalletConnected` نامی ایک فنکشن کو نافذ کر کے اسے آسانی سے ٹھیک کر سکتے ہیں، جو یہ چیک کرے گا کہ آیا کوئی پتہ پہلے سے ہی ہماری غیر مرکزی ایپلی کیشن (dapp) سے جڑا ہوا ہے اور اس کے مطابق ہمارے <span dir="ltr">UI</span> کو اپ ڈیٹ کرے گا!

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

بنیادی فرق یہ ہے کہ `eth_requestAccounts` طریقہ کار کو کال کرنے کے بجائے، جو صارف کے لیے اپنا والیٹ جوڑنے کے لیے میٹاماسک کھولتا ہے، یہاں ہم `eth_accounts` طریقہ کار کو کال کرتے ہیں، جو بس ایک سرنی واپس کرتا ہے جس میں فی الحال ہماری غیر مرکزی ایپلی کیشن (dapp) سے جڑے ہوئے میٹاماسک پتے شامل ہوتے ہیں۔

اس فنکشن کو عمل میں دیکھنے کے لیے، آئیے اسے اپنے `Minter.js` جزو کے `useEffect` فنکشن میں کال کریں۔

جیسا کہ ہم نے `connectWallet` کے لیے کیا تھا، ہمیں اس فنکشن کو اپنی `interact.js` فائل سے اپنی `Minter.js` فائل میں اس طرح امپورٹ کرنا چاہیے:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //یہاں امپورٹ کریں
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

غور کریں، ہم `getCurrentWalletConnected` پر اپنی کال کے جواب کا استعمال اپنے `walletAddress` اور `status` حالت کے متغیرات کو اپ ڈیٹ کرنے کے لیے کرتے ہیں۔

ایک بار جب آپ یہ کوڈ شامل کر لیں، تو ہماری براؤزر ونڈو کو ریفریش کرنے کی کوشش کریں۔ بٹن کو یہ بتانا چاہیے کہ آپ جڑے ہوئے ہیں، اور آپ کے جڑے ہوئے والیٹ کے پتہ کا پیش نظارہ دکھانا چاہیے - یہاں تک کہ آپ کے ریفریش کرنے کے بعد بھی!

### addWalletListener کو نافذ کریں {#implement-add-wallet-listener}

ہماری غیر مرکزی ایپلی کیشن (dapp) والیٹ سیٹ اپ کا آخری مرحلہ والیٹ لسنر کو نافذ کرنا ہے تاکہ جب ہمارے والیٹ کی حالت تبدیل ہو، جیسے کہ جب صارف منقطع ہو جائے یا اکاؤنٹس تبدیل کرے، تو ہمارا <span dir="ltr">UI</span> اپ ڈیٹ ہو جائے۔

اپنی `Minter.js` فائل میں، ایک فنکشن `addWalletListener` شامل کریں جو درج ذیل کی طرح نظر آتا ہے:

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

آئیے جلدی سے جائزہ لیتے ہیں کہ یہاں کیا ہو رہا ہے:

- سب سے پہلے، ہمارا فنکشن چیک کرتا ہے کہ آیا `window.ethereum` فعال ہے (یعنی، میٹاماسک انسٹال ہے)۔
  - اگر ایسا نہیں ہے، تو ہم بس اپنے `status` حالت کے متغیر کو ایک JSX سٹرنگ پر سیٹ کرتے ہیں جو صارف کو میٹاماسک انسٹال کرنے کی ترغیب دیتی ہے۔
  - اگر یہ فعال ہے، تو ہم لائن 3 پر لسنر `window.ethereum.on("accountsChanged")` ترتیب دیتے ہیں جو میٹاماسک والیٹ میں حالت کی تبدیلیوں کو سنتا ہے، جس میں وہ وقت شامل ہے جب صارف غیر مرکزی ایپلی کیشن (dapp) سے ایک اضافی اکاؤنٹ جوڑتا ہے، اکاؤنٹس تبدیل کرتا ہے، یا کسی اکاؤنٹ کو منقطع کرتا ہے۔ اگر کم از کم ایک اکاؤنٹ جڑا ہوا ہے، تو `walletAddress` حالت کا متغیر لسنر کے ذریعے واپس کی گئی `accounts` سرنی میں پہلے اکاؤنٹ کے طور پر اپ ڈیٹ ہو جاتا ہے۔ بصورت دیگر، `walletAddress` کو ایک خالی سٹرنگ کے طور پر سیٹ کیا جاتا ہے۔

آخر میں، ہمیں اسے اپنے `useEffect` فنکشن میں کال کرنا چاہیے:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

اور لیجیے! ہم نے اپنے والیٹ کی تمام فعالیت کی پروگرامنگ مکمل کر لی ہے! اب جب کہ ہمارا والیٹ ترتیب پا چکا ہے، آئیے معلوم کرتے ہیں کہ اپنا <span dir="ltr">NFT</span> کیسے ڈھالنا ہے!

## <span dir="ltr">NFT</span> میٹا ڈیٹا 101 {#nft-metadata-101}

تو یاد رکھیں وہ <span dir="ltr">NFT</span> میٹا ڈیٹا جس کے بارے میں ہم نے ابھی اس ٹیوٹوریل کے مرحلہ 0 میں بات کی تھی—یہ ایک <span dir="ltr">NFT</span> کو زندہ کرتا ہے، جس سے اس میں خصوصیات شامل ہوتی ہیں، جیسے کہ ایک ڈیجیٹل اثاثہ، نام، تفصیل، اور دیگر اوصاف۔

ہمیں اس میٹا ڈیٹا کو ایک <span dir="ltr">JSON</span> آبجیکٹ کے طور پر ترتیب دینے اور اسے محفوظ کرنے کی ضرورت ہوگی، تاکہ ہم اپنے سمارٹ کنٹریکٹ کے `mintNFT` فنکشن کو کال کرتے وقت اسے `tokenURI` پیرامیٹر کے طور پر پاس کر سکیں۔

"Link to Asset"، "Name"، "Description" فیلڈز میں موجود متن ہمارے <span dir="ltr">NFT</span> کے میٹا ڈیٹا کی مختلف خصوصیات پر مشتمل ہوگا۔ ہم اس میٹا ڈیٹا کو ایک <span dir="ltr">JSON</span> آبجیکٹ کے طور پر فارمیٹ کریں گے، لیکن اس بات کے لیے کچھ اختیارات ہیں کہ ہم اس <span dir="ltr">JSON</span> آبجیکٹ کو کہاں محفوظ کر سکتے ہیں:

- ہم اسے ایتھیریم بلاک چین پر محفوظ کر سکتے ہیں؛ تاہم، ایسا کرنا بہت مہنگا ہوگا۔
- ہم اسے ایک مرکزی سرور پر محفوظ کر سکتے ہیں، جیسے AWS یا Firebase۔ لیکن یہ ہمارے لامرکزیت کے اصول کو شکست دے گا۔
- ہم IPFS کا استعمال کر سکتے ہیں، جو ایک تقسیم شدہ فائل سسٹم میں ڈیٹا کو محفوظ کرنے اور شیئر کرنے کے لیے ایک لامركزی پروٹوکول اور پیئر ٹو پیئر نیٹ ورک ہے۔ چونکہ یہ پروٹوکول لامركزی اور مفت ہے، اس لیے یہ ہمارا بہترین آپشن ہے!

اپنے میٹا ڈیٹا کو IPFS پر محفوظ کرنے کے لیے، ہم [Pinata](https://pinata.cloud/) کا استعمال کریں گے، جو ایک آسان IPFS API اور ٹول کٹ ہے۔ اگلے مرحلے میں، ہم بالکل واضح کریں گے کہ یہ کیسے کرنا ہے!

## اپنے میٹا ڈیٹا کو IPFS پر پن کرنے کے لیے Pinata کا استعمال کریں {#use-pinata-to-pin-your-metadata-to-ipfs}

اگر آپ کے پاس [Pinata](https://pinata.cloud/) اکاؤنٹ نہیں ہے، تو ایک مفت اکاؤنٹ کے لیے [یہاں](https://app.pinata.cloud/auth/signup) سائن اپ کریں اور اپنے ای میل اور اکاؤنٹ کی تصدیق کے لیے مراحل مکمل کریں۔

### اپنی Pinata API کلید بنائیں {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) صفحہ پر جائیں، پھر سب سے اوپر "New Key" بٹن کو منتخب کریں، ایڈمن وجیٹ کو فعال کے طور پر سیٹ کریں، اور اپنی کلید کا نام رکھیں۔

پھر آپ کو آپ کی API معلومات کے ساتھ ایک پاپ اپ دکھایا جائے گا۔ اسے کسی محفوظ جگہ پر رکھنا یقینی بنائیں۔

اب جب کہ ہماری کلید ترتیب پا چکی ہے، آئیے اسے اپنے پروجیکٹ میں شامل کریں تاکہ ہم اسے استعمال کر سکیں۔

### ایک .env فائل بنائیں {#create-a-env}

ہم اپنی Pinata کلید اور خفیہ (secret) کو ایک ماحولیاتی (environment) فائل میں محفوظ طریقے سے رکھ سکتے ہیں۔ آئیے آپ کی پروجیکٹ ڈائرکٹری میں [dotenv پیکیج](https://www.npmjs.com/package/dotenv) انسٹال کریں۔

اپنے ٹرمینل میں ایک نیا ٹیب کھولیں (لوکل ہوسٹ چلانے والے سے الگ) اور یقینی بنائیں کہ آپ `minter-starter-files` فولڈر میں ہیں، پھر اپنے ٹرمینل میں درج ذیل کمانڈ چلائیں:

```text
npm install dotenv --save
```

اس کے بعد، اپنی کمانڈ لائن پر درج ذیل درج کر کے اپنے `minter-starter-files` کی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں:

```javascript
vim.env
```

یہ آپ کی `.env` فائل کو vim (ایک ٹیکسٹ ایڈیٹر) میں کھول دے گا۔ اسے محفوظ کرنے کے لیے اپنے کی بورڈ پر اسی ترتیب میں "esc" + ":" + "q" دبائیں۔

اس کے بعد، VSCode میں، اپنی `.env` فائل پر جائیں اور اس میں اپنی Pinata API کلید اور API خفیہ شامل کریں، اس طرح:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

فائل کو محفوظ کریں، اور پھر آپ اپنے <span dir="ltr">JSON</span> میٹا ڈیٹا کو IPFS پر اپ لوڈ کرنے کے لیے فنکشن لکھنا شروع کرنے کے لیے تیار ہیں!

### pinJSONToIPFS کو نافذ کریں {#pin-json-to-ipfs}

خوش قسمتی سے ہمارے لیے، Pinata کے پاس [خاص طور پر JSON ڈیٹا کو IPFS پر اپ لوڈ کرنے کے لیے ایک API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) ہے اور axios کے ساتھ ایک آسان JavaScript مثال ہے جسے ہم کچھ معمولی ترامیم کے ساتھ استعمال کر سکتے ہیں۔

اپنے `utils` فولڈر میں، آئیے `pinata.js` نام کی ایک اور فائل بنائیں اور پھر .env فائل سے اپنی Pinata خفیہ اور کلید کو اس طرح امپورٹ کریں:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

اس کے بعد، نیچے سے اضافی کوڈ کو اپنی `pinata.js` فائل میں پیسٹ کریں۔ پریشان نہ ہوں، ہم جائزہ لیں گے کہ ہر چیز کا کیا مطلب ہے!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //Pinata کو axios POST درخواست بھیج رہے ہیں ⬇️
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

سب سے پہلے، یہ [axios](https://www.npmjs.com/package/axios) کو امپورٹ کرتا ہے، جو براؤزر اور node.js کے لیے ایک promise پر مبنی HTTP کلائنٹ ہے، جسے ہم Pinata سے درخواست کرنے کے لیے استعمال کریں گے۔

پھر ہمارے پاس اپنا غیر مطابقت پذیر (asynchronous) فنکشن `pinJSONToIPFS` ہے، جو ایک `JSONBody` کو اپنے ان پٹ کے طور پر اور Pinata api کلید اور خفیہ کو اپنے ہیڈر میں لیتا ہے، یہ سب ان کے `pinJSONToIPFS` API پر ایک POST درخواست کرنے کے لیے ہے۔

- اگر یہ POST درخواست کامیاب ہو جاتی ہے، تو ہمارا فنکشن ایک <span dir="ltr">JSON</span> آبجیکٹ واپس کرتا ہے جس میں `success` بولین (boolean) true کے طور پر اور وہ `pinataUrl` ہوتا ہے جہاں ہمارا میٹا ڈیٹا پن کیا گیا تھا۔ ہم اس واپس کیے گئے `pinataUrl` کو اپنے سمارٹ کنٹریکٹ کے ڈھلائی کے فنکشن میں `tokenURI` ان پٹ کے طور پر استعمال کریں گے۔
- اگر یہ post درخواست ناکام ہو جاتی ہے، تو ہمارا فنکشن ایک <span dir="ltr">JSON</span> آبجیکٹ واپس کرتا ہے جس میں `success` بولین false کے طور پر اور ایک `message` سٹرنگ ہوتی ہے جو ہماری خرابی کو بیان کرتی ہے۔

ہمارے `connectWallet` فنکشن کی واپسی کی اقسام کی طرح، ہم <span dir="ltr">JSON</span> آبجیکٹس واپس کر رہے ہیں تاکہ ہم ان کے پیرامیٹرز کا استعمال اپنے حالت کے متغیرات اور <span dir="ltr">UI</span> کو اپ ڈیٹ کرنے کے لیے کر سکیں۔

## اپنا سمارٹ کنٹریکٹ لوڈ کریں {#load-your-smart-contract}

اب جب کہ ہمارے پاس اپنے `pinJSONToIPFS` فنکشن کے ذریعے اپنے <span dir="ltr">NFT</span> میٹا ڈیٹا کو IPFS پر اپ لوڈ کرنے کا ایک طریقہ ہے، ہمیں اپنے سمارٹ کنٹریکٹ کی ایک مثال (instance) کو لوڈ کرنے کے طریقے کی ضرورت ہوگی تاکہ ہم اس کے `mintNFT` فنکشن کو کال کر سکیں۔

جیسا کہ ہم نے پہلے ذکر کیا، اس ٹیوٹوریل میں ہم [اس موجودہ NFT سمارٹ کنٹریکٹ](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) کا استعمال کریں گے؛ تاہم، اگر آپ یہ جاننا چاہتے ہیں کہ ہم نے اسے کیسے بنایا، یا خود ایک بنانا چاہتے ہیں، تو ہم انتہائی سفارش کرتے ہیں کہ آپ ہمارا دوسرا ٹیوٹوریل، ["ایک NFT کیسے بنائیں"](https://www.alchemy.com/docs/how-to-create-an-nft) دیکھیں۔

### کنٹریکٹ ABI {#contract-abi}

اگر آپ نے ہماری فائلوں کا بغور جائزہ لیا ہے، تو آپ نے دیکھا ہوگا کہ ہماری `src` ڈائرکٹری میں، ایک `contract-abi.json` فائل ہے۔ ایک ABI اس بات کی وضاحت کرنے کے لیے ضروری ہے کہ کنٹریکٹ کس فنکشن کو طلب کرے گا اور ساتھ ہی یہ یقینی بنانے کے لیے کہ فنکشن اس فارمیٹ میں ڈیٹا واپس کرے گا جس کی آپ توقع کر رہے ہیں۔

ہمیں ایتھیریم بلاک چین سے جڑنے اور اپنے سمارٹ کنٹریکٹ کو لوڈ کرنے کے لیے ایک Alchemy API کلید اور Alchemy Web3 API کی بھی ضرورت ہوگی۔

### اپنی Alchemy API کلید بنائیں {#create-alchemy-api}

اگر آپ کے پاس پہلے سے Alchemy اکاؤنٹ نہیں ہے، تو [یہاں مفت میں سائن اپ کریں۔](https://alchemy.com/?a=eth-org-nft-minter)

ایک بار جب آپ Alchemy اکاؤنٹ بنا لیتے ہیں، تو آپ ایک ایپ بنا کر ایک API کلید تیار کر سکتے ہیں۔ یہ ہمیں روپسٹن ٹیسٹ نیٹ ورک پر درخواستیں کرنے کی اجازت دے گا۔

نیویگیشن بار میں "Apps" پر ہوور کر کے اور "Create App" پر کلک کر کے اپنے Alchemy ڈیش بورڈ میں "Create App" صفحہ پر جائیں۔

اپنی ایپ کا نام رکھیں ہم نے "My First NFT!" کا انتخاب کیا، ایک مختصر تفصیل پیش کریں، اپنی ایپ کی بک کیپنگ کے لیے استعمال ہونے والے ماحول کے لیے "Staging" کو منتخب کریں، اور اپنے نیٹ ورک کے لیے "Ropsten" کا انتخاب کریں۔

"Create app" پر کلک کریں اور بس! آپ کی ایپ نیچے دیے گئے ٹیبل میں ظاہر ہونی چاہیے۔

زبردست تو اب جب کہ ہم نے اپنا HTTP Alchemy API URL بنا لیا ہے، اسے اپنے کلپ بورڈ پر کاپی کریں...

...اور پھر آئیے اسے اپنی `.env` فائل میں شامل کریں۔ مجموعی طور پر، آپ کی .env فائل اس طرح نظر آنی چاہیے:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

اب جب کہ ہمارے پاس اپنا کنٹریکٹ ABI اور ہماری Alchemy API کلید ہے، ہم [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) کا استعمال کرتے ہوئے اپنا سمارٹ کنٹریکٹ لوڈ کرنے کے لیے تیار ہیں۔

### اپنا Alchemy Web3 اینڈ پوائنٹ اور کنٹریکٹ ترتیب دیں {#setup-alchemy-endpoint}

سب سے پہلے، اگر آپ کے پاس یہ پہلے سے نہیں ہے، تو آپ کو ٹرمینل میں ہوم ڈائرکٹری: `nft-minter-tutorial` پر جا کر [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) انسٹال کرنے کی ضرورت ہوگی:

```text
cd ..
npm install @alch/alchemy-web3
```

اس کے بعد آئیے اپنی `interact.js` فائل پر واپس چلتے ہیں۔ فائل کے اوپری حصے میں، اپنی .env فائل سے اپنی Alchemy کلید کو امپورٹ کرنے اور اپنا Alchemy Web3 اینڈ پوائنٹ ترتیب دینے کے لیے درج ذیل کوڈ شامل کریں:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) [Web3.js](https://docs.web3js.org/) کے گرد ایک ریپر (wrapper) ہے، جو ایک web3 ڈیولپر کے طور پر آپ کی زندگی کو آسان بنانے کے لیے بہتر API طریقے اور دیگر اہم فوائد فراہم کرتا ہے۔ اسے اس طرح ڈیزائن کیا گیا ہے کہ کم سے کم کنفیگریشن کی ضرورت ہو تاکہ آپ اسے فوراً اپنی ایپ میں استعمال کرنا شروع کر سکیں!

اس کے بعد، آئیے اپنی فائل میں اپنا کنٹریکٹ ABI اور کنٹریکٹ کا پتہ شامل کریں۔

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

ایک بار جب ہمارے پاس یہ دونوں ہو جائیں، تو ہم اپنے ڈھلائی کے فنکشن کی کوڈنگ شروع کرنے کے لیے تیار ہیں!

## mintNFT فنکشن کو نافذ کریں {#implement-the-mintnft-function}

اپنی `interact.js` فائل کے اندر، آئیے اپنے فنکشن، `mintNFT` کی وضاحت کرتے ہیں، جو اپنے نام کے مطابق ہمارا <span dir="ltr">NFT</span> ڈھالے گا۔

چونکہ ہم متعدد غیر مطابقت پذیر (asynchronous) کالز کریں گے (اپنے میٹا ڈیٹا کو IPFS پر پن کرنے کے لیے Pinata کو، اپنا سمارٹ کنٹریکٹ لوڈ کرنے کے لیے Alchemy Web3 کو، اور اپنی ٹرانزیکشنز پر دستخط کرنے کے لیے میٹاماسک کو)، اس لیے ہمارا فنکشن بھی غیر مطابقت پذیر ہوگا۔

ہمارے فنکشن کے تین ان پٹس ہمارے ڈیجیٹل اثاثہ کا `url`، `name`، اور `description` ہوں گے۔ `connectWallet` فنکشن کے نیچے درج ذیل فنکشن سگنیچر شامل کریں:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### ان پٹ کی خرابی کو سنبھالنا {#input-error-handling}

فطری طور پر، فنکشن کے آغاز میں کسی قسم کی ان پٹ کی خرابی کو سنبھالنے کا طریقہ ہونا سمجھ میں آتا ہے، تاکہ اگر ہمارے ان پٹ پیرامیٹرز درست نہ ہوں تو ہم اس فنکشن سے باہر نکل جائیں۔ اپنے فنکشن کے اندر، آئیے درج ذیل کوڈ شامل کریں:

```javascript
export const mintNFT = async (url, name, description) => {
  //ایرر ہینڈلنگ
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

بنیادی طور پر، اگر ان پٹ پیرامیٹرز میں سے کوئی بھی ایک خالی سٹرنگ ہے، تو ہم ایک <span dir="ltr">JSON</span> آبجیکٹ واپس کرتے ہیں جہاں `success` بولین false ہے، اور `status` سٹرنگ یہ پیغام دیتی ہے کہ ہمارے <span dir="ltr">UI</span> میں تمام فیلڈز مکمل ہونی چاہئیں۔

### میٹا ڈیٹا کو IPFS پر اپ لوڈ کریں {#upload-metadata-to-ipfs}

ایک بار جب ہمیں معلوم ہو جائے کہ ہمارا میٹا ڈیٹا مناسب طریقے سے فارمیٹ کیا گیا ہے، تو اگلا مرحلہ اسے ایک <span dir="ltr">JSON</span> آبجیکٹ میں لپیٹنا اور ہمارے لکھے گئے `pinJSONToIPFS` کے ذریعے اسے IPFS پر اپ لوڈ کرنا ہے!

ایسا کرنے کے لیے، ہمیں سب سے پہلے `pinJSONToIPFS` فنکشن کو اپنی `interact.js` فائل میں امپورٹ کرنے کی ضرورت ہے۔ `interact.js` کے بالکل اوپری حصے میں، آئیے شامل کریں:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

یاد کریں کہ `pinJSONToIPFS` ایک <span dir="ltr">JSON</span> باڈی لیتا ہے۔ لہذا اس سے پہلے کہ ہم اسے کال کریں، ہمیں اپنے `url`، `name`، اور `description` پیرامیٹرز کو ایک <span dir="ltr">JSON</span> آبجیکٹ میں فارمیٹ کرنے کی ضرورت ہوگی۔

آئیے اپنے کوڈ کو اپ ڈیٹ کریں تاکہ `metadata` نامی ایک <span dir="ltr">JSON</span> آبجیکٹ بنایا جا سکے اور پھر اس `metadata` پیرامیٹر کے ساتھ `pinJSONToIPFS` کو کال کریں:

```javascript
export const mintNFT = async (url, name, description) => {
  //ایرر ہینڈلنگ
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //میٹا ڈیٹا بنائیں
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata کال کریں
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

غور کریں، ہم `pinJSONToIPFS(metadata)` پر اپنی کال کے جواب کو `pinataResponse` آبجیکٹ میں محفوظ کرتے ہیں۔ پھر، ہم کسی بھی خرابی کے لیے اس آبجیکٹ کا تجزیہ (parse) کرتے ہیں۔

اگر کوئی خرابی ہے، تو ہم ایک <span dir="ltr">JSON</span> آبجیکٹ واپس کرتے ہیں جہاں `success` بولین false ہے اور ہماری `status` سٹرنگ یہ پیغام دیتی ہے کہ ہماری کال ناکام ہو گئی۔ بصورت دیگر، ہم `pinataResponse` سے `pinataURL` نکالتے ہیں اور اسے اپنے `tokenURI` متغیر کے طور پر محفوظ کرتے ہیں۔

اب وقت آگیا ہے کہ ہم اس Alchemy Web3 API کا استعمال کرتے ہوئے اپنا سمارٹ کنٹریکٹ لوڈ کریں جسے ہم نے اپنی فائل کے اوپری حصے میں شروع کیا تھا۔ کنٹریکٹ کو `window.contract` عالمی متغیر پر سیٹ کرنے کے لیے `mintNFT` فنکشن کے نچلے حصے میں کوڈ کی درج ذیل لائن شامل کریں:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

ہمارے `mintNFT` فنکشن میں شامل کرنے والی آخری چیز ہماری ایتھیریم ٹرانزیکشن ہے:

```javascript
//اپنی ایتھیریم ٹرانزیکشن سیٹ اپ کریں
const transactionParameters = {
  to: contractAddress, // کنٹریکٹ کی اشاعت کے علاوہ درکار ہے۔
  from: window.ethereum.selectedAddress, // صارف کے فعال پتہ سے مماثل ہونا چاہیے۔
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFT سمارٹ کنٹریکٹ کو کال کریں
}

//میٹاماسک کے ذریعے ٹرانزیکشن پر دستخط کریں
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

اگر آپ پہلے سے ہی ایتھیریم ٹرانزیکشنز سے واقف ہیں، تو آپ دیکھیں گے کہ اس کی ساخت اس سے کافی ملتی جلتی ہے جو آپ نے دیکھی ہے۔

- سب سے پہلے، ہم اپنے ٹرانزیکشنز کے پیرامیٹرز ترتیب دیتے ہیں۔
  - `to` وصول کنندہ کے پتہ (ہمارا سمارٹ کنٹریکٹ) کی وضاحت کرتا ہے
  - `from` ٹرانزیکشن پر دستخط کرنے والے کی وضاحت کرتا ہے (صارف کا میٹاماسک سے جڑا ہوا پتہ: `window.ethereum.selectedAddress`)
  - `data` میں ہمارے سمارٹ کنٹریکٹ کے `mintNFT` طریقہ کار کی کال شامل ہے، جو ہمارے `tokenURI` اور صارف کے والیٹ کا پتہ، `window.ethereum.selectedAddress`، ان پٹس کے طور پر وصول کرتا ہے
- پھر، ہم ایک await کال کرتے ہیں، `window.ethereum.request,` جہاں ہم میٹاماسک سے ٹرانزیکشن پر دستخط کرنے کو کہتے ہیں۔ غور کریں، اس درخواست میں، ہم اپنے eth طریقہ کار (eth_SentTransaction) کی وضاحت کر رہے ہیں اور اپنا `transactionParameters` پاس کر رہے ہیں۔ اس مقام پر، میٹاماسک براؤزر میں کھل جائے گا، اور صارف کو ٹرانزیکشن پر دستخط کرنے یا اسے مسترد کرنے کا کہے گا۔
  - اگر ٹرانزیکشن کامیاب ہو جاتی ہے، تو فنکشن ایک <span dir="ltr">JSON</span> آبجیکٹ واپس کرے گا جہاں بولین `success` کو true پر سیٹ کیا گیا ہے اور `status` سٹرنگ صارف کو اپنی ٹرانزیکشن کے بارے میں مزید معلومات کے لیے Etherscan دیکھنے کی ترغیب دیتی ہے۔
  - اگر ٹرانزیکشن ناکام ہو جاتی ہے، تو فنکشن ایک <span dir="ltr">JSON</span> آبجیکٹ واپس کرے گا جہاں `success` بولین کو false پر سیٹ کیا گیا ہے، اور `status` سٹرنگ خرابی کا پیغام دیتی ہے۔

مجموعی طور پر، ہمارا `mintNFT` فنکشن اس طرح نظر آنا چاہیے:

```javascript
export const mintNFT = async (url, name, description) => {
  //ایرر ہینڈلنگ
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //میٹا ڈیٹا بنائیں
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata پن کی درخواست
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //سمارٹ کنٹریکٹ لوڈ کریں
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //اپنی ایتھیریم ٹرانزیکشن سیٹ اپ کریں
  const transactionParameters = {
    to: contractAddress, // کنٹریکٹ کی اشاعت کے علاوہ درکار ہے۔
    from: window.ethereum.selectedAddress, // صارف کے فعال پتہ سے مماثل ہونا چاہیے۔
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //NFT سمارٹ کنٹریکٹ کو کال کریں
  }

  //میٹاماسک کے ذریعے ٹرانزیکشن پر دستخط کریں
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

## mintNFT کو ہمارے <span dir="ltr">Minter.js</span> فرنٹ اینڈ سے جوڑیں {#connect-our-frontend}

اپنی `Minter.js` فائل کھولیں اور سب سے اوپر `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` لائن کو اس طرح اپ ڈیٹ کریں:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

آخر میں، اپنے امپورٹ کردہ `mintNFT` فنکشن کو await کال کرنے کے لیے `onMintPressed` فنکشن کو نافذ کریں اور `status` حالت کے متغیر کو اپ ڈیٹ کریں تاکہ یہ ظاہر ہو سکے کہ آیا ہماری ٹرانزیکشن کامیاب ہوئی یا ناکام:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## اپنے <span dir="ltr">NFT</span> کو ایک لائیو ویب سائٹ پر تعینات کریں {#deploy-your-nft}

کیا آپ اپنے پروجیکٹ کو صارفین کے تعامل کے لیے لائیو کرنے کے لیے تیار ہیں؟ اپنے منٹر کو ایک لائیو ویب سائٹ پر تعینات کرنے کے لیے [یہ ٹیوٹوریل](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) دیکھیں۔

ایک آخری مرحلہ...

## بلاک چین کی دنیا میں تہلکہ مچا دیں {#take-the-blockchain-world-by-storm}

مذاق کر رہا ہوں، آپ ٹیوٹوریل کے اختتام تک پہنچ گئے ہیں!

خلاصہ کرنے کے لیے، ایک <span dir="ltr">NFT</span> منٹر بنا کر، آپ نے کامیابی سے سیکھا کہ کیسے:

- اپنے فرنٹ اینڈ پروجیکٹ کے ذریعے میٹاماسک سے جڑیں
- اپنے فرنٹ اینڈ سے سمارٹ کنٹریکٹ کے طریقوں کو کال کریں
- میٹاماسک کا استعمال کرتے ہوئے ٹرانزیکشنز پر دستخط کریں

غالباً، آپ اپنی غیر مرکزی ایپلی کیشن (dapp) کے ذریعے ڈھالے گئے <span dir="ltr">NFTs</span> کو اپنے والیٹ میں دکھانے کے قابل ہونا چاہیں گے — لہذا ہمارا فوری ٹیوٹوریل [اپنے والیٹ میں اپنا NFT کیسے دیکھیں](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) ضرور دیکھیں!

اور، ہمیشہ کی طرح، اگر آپ کے کوئی سوالات ہیں، تو ہم [Alchemy ڈسکارڈ](https://discord.gg/gWuC7zB) میں مدد کے لیے موجود ہیں۔ ہم یہ دیکھنے کے لیے بے تاب ہیں کہ آپ اس ٹیوٹوریل کے تصورات کو اپنے مستقبل کے پروجیکٹس میں کیسے لاگو کرتے ہیں!