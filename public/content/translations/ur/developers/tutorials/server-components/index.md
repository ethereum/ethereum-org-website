---
title: "web3 ایپس کے لیے سرور اجزاء اور ایجنٹس"
description: "اس ٹیوٹوریل کو پڑھنے کے بعد، آپ TypeScript سرورز لکھنے کے قابل ہو جائیں گے جو ایک بلاک چین پر ایونٹس کو سنتے ہیں اور اسی کے مطابق اپنے ٹرانزیکشنز کے ساتھ جواب دیتے ہیں۔ یہ آپ کو مرکزی ایپلی کیشنز (کیونکہ سرور ناکامی کا ایک نقطہ ہے) لکھنے کے قابل بنائے گا، لیکن آپ web3 اداروں کے ساتھ تعامل کر سکتے ہیں۔ یہی تکنیک ایک ایسا ایجنٹ لکھنے کے لیے بھی استعمال کی جا سکتی ہیں جو لوپ میں انسان کے بغیر آن چین ایونٹس کا جواب دیتا ہے۔"

author: Ori Pomerantz
lang: ur-in
tags: [ "ایجنٹ", "سرور", "آف چین" ]
skill: beginner
published: 2024-07-15
---

## تعارف {#introduction}

زیادہ تر معاملات میں، ایک غیر مرکزی ایپ سافٹ ویئر تقسیم کرنے کے لیے ایک سرور کا استعمال کرتی ہے، لیکن تمام حقیقی تعامل کلائنٹ (عام طور پر، ویب براؤزر) اور بلاک چین کے درمیان ہوتا ہے۔

![ویب سرور، کلائنٹ، اور بلاک چین کے درمیان عام تعامل](./fig-1.svg)

تاہم، کچھ ایسے معاملات ہیں جہاں ایک ایپلی کیشن کو آزادانہ طور پر چلنے والے سرور جزو سے فائدہ ہوگا۔ ایسا سرور ٹرانزیکشنز جاری کرکے ایونٹس، اور دیگر ذرائع، جیسے API سے آنے والی درخواستوں کا جواب دینے کے قابل ہوگا۔

![سرور کے اضافے کے ساتھ تعامل](./fig-2.svg)

ایسے کئی ممکنہ کام ہیں جو ایسا سرور پورا کر سکتا ہے۔

- خفیہ اسٹیٹ کا ہولڈر۔ گیمنگ میں یہ اکثر مفید ہوتا ہے کہ گیم کو معلوم تمام معلومات کھلاڑیوں کو دستیاب نہ ہوں۔ تاہم، _بلاک چین پر کوئی راز نہیں ہیں_، بلاک چین میں موجود کوئی بھی معلومات کسی کے لیے بھی معلوم کرنا آسان ہے۔ لہذا، اگر گیم اسٹیٹ کے کچھ حصے کو خفیہ رکھنا ہے، تو اسے کہیں اور ذخیرہ کرنا ہوگا (اور ممکنہ طور پر اس اسٹیٹ کے اثرات کی تصدیق [zero-knowledge proofs](/zero-knowledge-proofs) کا استعمال کرتے ہوئے کی جائے)۔

- مرکزی اوریکل۔ اگر داؤ کافی کم ہے، تو ایک بیرونی سرور جو آن لائن کچھ معلومات پڑھتا ہے اور پھر اسے چین پر پوسٹ کرتا ہے، [oracle](/developers/docs/oracles/) کے طور پر استعمال کرنے کے لیے کافی اچھا ہو سکتا ہے۔

- ایجنٹ۔ بلاک چین پر بغیر کسی ٹرانزیکشن کے اسے فعال کرنے کے لیے کچھ نہیں ہوتا ہے۔ ایک سرور صارف کی جانب سے [arbitrage](/developers/docs/mev/#mev-examples-dex-arbitrage) جیسے اعمال انجام دینے کے لیے کام کر سکتا ہے جب موقع ملے۔

## نمونہ پروگرام {#sample-program}

آپ [github](https://github.com/qbzzt/20240715-server-component) پر ایک نمونہ سرور دیکھ سکتے ہیں۔ یہ سرور [اس کنٹریکٹ](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) سے آنے والے ایونٹس کو سنتا ہے، جو Hardhat کے Greeter کا ایک ترمیم شدہ ورژن ہے۔ جب گریٹنگ تبدیل کی جاتی ہے، تو یہ اسے واپس تبدیل کر دیتا ہے۔

اسے چلانے کے لئے:

1. ریپوزٹری کو کلون کریں۔

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. ضروری پیکجز انسٹال کریں۔ اگر آپ کے پاس یہ پہلے سے نہیں ہے، تو [پہلے Node انسٹال کریں](https://nodejs.org/en/download/package-manager)۔

   ```sh copy
   npm install
   ```

3. Holesky ٹیسٹ نیٹ پر ETH رکھنے والے اکاؤنٹ کی پرائیویٹ کی کی وضاحت کے لیے `.env` میں ترمیم کریں۔ اگر آپ کے پاس Holesky پر ETH نہیں ہے، تو آپ [یہ faucet استعمال کر سکتے ہیں](https://holesky-faucet.pk910.de/)۔

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. سرور شروع کریں۔

   ```sh copy
   npm start
   ```

5. [بلاک ایکسپلورر](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) پر جائیں، اور پرائیویٹ کی والے ایڈریس سے مختلف ایڈریس کا استعمال کرتے ہوئے گریٹنگ میں ترمیم کریں۔ دیکھیں کہ گریٹنگ خود بخود واپس تبدیل ہو جاتی ہے۔

### یہ کیسے کام کرتا ہے؟ {#how-it-works}

سرور جزو لکھنے کا طریقہ سمجھنے کا سب سے آسان طریقہ یہ ہے کہ نمونے کو لائن بہ لائن پڑھا جائے۔

#### `src/app.ts` {#src-app-ts}

پروگرام کا بڑا حصہ [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) میں موجود ہے۔

##### پیشگی مطلوبہ اشیاء بنانا

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

یہ وہ [Viem](https://viem.sh/) ادارے ہیں جن کی ہمیں ضرورت ہے، فنکشنز اور [`Address` قسم](https://viem.sh/docs/glossary/types#address)۔ یہ سرور [TypeScript](https://www.typescriptlang.org/) میں لکھا گیا ہے، جو JavaScript کی ایک توسیع ہے جو اسے [مضبوطی سے ٹائپ شدہ](https://en.wikipedia.org/wiki/Strong_and_weak_typing) بناتی ہے۔

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[یہ فنکشن](https://viem.sh/docs/accounts/privateKey) ہمیں ایک پرائیویٹ کی کے مطابق والیٹ کی معلومات، بشمول ایڈریس، بنانے دیتا ہے۔

```typescript
import { holesky } from "viem/chains"
```

Viem میں بلاک چین استعمال کرنے کے لیے آپ کو اس کی تعریف درآمد کرنے کی ضرورت ہے۔ اس معاملے میں، ہم [Holesky](https://github.com/eth-clients/holesky) ٹیسٹ بلاک چین سے جڑنا چاہتے ہیں۔

```typescript
// This is how we add the definitions in .env to process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

یہ ہے کہ ہم `.env` کو ماحول میں کیسے پڑھتے ہیں۔ ہمیں پرائیویٹ کی کے لیے اس کی ضرورت ہے (بعد میں دیکھیں)۔

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

کنٹریکٹ استعمال کرنے کے لیے ہمیں اس کے ایڈریس اور اس کے لیے [ABI](/glossary/#abi) کی ضرورت ہے۔ ہم یہاں دونوں فراہم کرتے ہیں۔

JavaScript (اور اس لیے TypeScript) میں آپ کسی مستقل کو نئی قدر تفویض نہیں کر سکتے، لیکن آپ اس میں ذخیرہ شدہ آبجیکٹ میں ترمیم _کر سکتے_ ہیں۔ `as const` لاحقہ کا استعمال کرکے ہم TypeScript کو بتا رہے ہیں کہ فہرست خود مستقل ہے اور اسے تبدیل نہیں کیا جا سکتا۔

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

ایک Viem [پبلک کلائنٹ](https://viem.sh/docs/clients/public.html) بنائیں۔ پبلک کلائنٹس کے پاس منسلک پرائیویٹ کی نہیں ہوتی، اور اس لیے وہ ٹرانزیکشنز نہیں بھیج سکتے۔ وہ [`view` فنکشنز](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) کو کال کر سکتے ہیں، اکاؤنٹ بیلنس پڑھ سکتے ہیں، وغیرہ۔

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

ماحولیاتی متغیرات [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) میں دستیاب ہیں۔ تاہم، TypeScript مضبوطی سے ٹائپ شدہ ہے۔ ایک ماحولیاتی متغیر کوئی بھی سٹرنگ، یا خالی ہو سکتا ہے، لہذا ایک ماحولیاتی متغیر کی قسم `string | undefined` ہے۔ تاہم، Viem میں ایک کی کو `0x${string}` (`0x` کے بعد ایک سٹرنگ) کے طور پر بیان کیا گیا ہے۔ یہاں ہم TypeScript کو بتاتے ہیں کہ `PRIVATE_KEY` ماحولیاتی متغیر اس قسم کا ہوگا۔ اگر ایسا نہیں ہے، تو ہمیں ایک رن ٹائم ایرر ملے گا۔

[`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) فنکشن پھر اس پرائیویٹ کی کا استعمال کرکے ایک مکمل اکاؤنٹ آبجیکٹ بناتا ہے۔

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

اگلا، ہم اکاؤنٹ آبجیکٹ کا استعمال کرکے ایک [والیٹ کلائنٹ](https://viem.sh/docs/clients/wallet) بناتے ہیں۔ اس کلائنٹ کے پاس ایک پرائیویٹ کی اور ایک ایڈریس ہے، لہذا اسے ٹرانزیکشنز بھیجنے کے لیے استعمال کیا جا سکتا ہے۔

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

اب جب کہ ہمارے پاس تمام پیشگی شرائط ہیں، ہم آخر کار ایک [کنٹریکٹ انسٹنس](https://viem.sh/docs/contract/getContract) بنا سکتے ہیں۔ ہم اس کنٹریکٹ انسٹنس کا استعمال آن چین کنٹریکٹ کے ساتھ بات چیت کرنے کے لیے کریں گے۔

##### بلاک چین سے پڑھنا

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

کنٹریکٹ کے فنکشنز جو صرف پڑھنے کے لیے ہیں ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) اور [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) `read` کے تحت دستیاب ہیں۔ اس معاملے میں، ہم اسے [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) فنکشن تک رسائی حاصل کرنے کے لیے استعمال کرتے ہیں، جو گریٹنگ واپس کرتا ہے۔

JavaScript سنگل تھریڈڈ ہے، لہذا جب ہم ایک طویل چلنے والے عمل کو شروع کرتے ہیں تو ہمیں [یہ بتانا ہوگا کہ ہم اسے غیر مطابقت پذیر طریقے سے کرتے ہیں](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)۔ بلاک چین کو کال کرنا، یہاں تک کہ صرف پڑھنے کے آپریشن کے لیے، کمپیوٹر اور بلاک چین نوڈ کے درمیان راؤنڈ ٹرپ کی ضرورت ہوتی ہے۔ یہی وجہ ہے کہ ہم یہاں بتاتے ہیں کہ کوڈ کو نتیجے کے لیے `await` کرنے کی ضرورت ہے۔

اگر آپ اس میں دلچسپی رکھتے ہیں کہ یہ کیسے کام کرتا ہے تو آپ [یہاں اس کے بارے میں پڑھ سکتے ہیں](https://www.w3schools.com/js/js_promise.asp)، لیکن عملی طور پر آپ کو صرف یہ جاننے کی ضرورت ہے کہ اگر آپ کوئی ایسا آپریشن شروع کرتے ہیں جس میں زیادہ وقت لگتا ہے تو آپ نتائج کا `await` کریں، اور یہ کہ کوئی بھی فنکشن جو ایسا کرتا ہے اسے `async` کے طور پر اعلان کرنا ہوگا۔

##### ٹرانزیکشنز جاری کرنا

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

یہ وہ فنکشن ہے جسے آپ گریٹنگ کو تبدیل کرنے والے ٹرانزیکشن کو جاری کرنے کے لیے کال کرتے ہیں۔ چونکہ یہ ایک طویل آپریشن ہے، اس لیے فنکشن کو `async` کے طور پر اعلان کیا گیا ہے۔ اندرونی نفاذ کی وجہ سے، کسی بھی `async` فنکشن کو `Promise` آبجیکٹ واپس کرنے کی ضرورت ہے۔ اس معاملے میں، `Promise<any>` کا مطلب ہے کہ ہم یہ نہیں بتاتے کہ `Promise` میں بالکل کیا واپس کیا جائے گا۔

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

کنٹریکٹ انسٹنس کے `write` فیلڈ میں وہ تمام فنکشنز ہیں جو بلاک چین اسٹیٹ پر لکھتے ہیں (وہ جن کے لیے ٹرانزیکشن بھیجنے کی ضرورت ہوتی ہے)، جیسے کہ [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862)۔ پیرامیٹرز، اگر کوئی ہیں، تو ایک فہرست کے طور پر فراہم کیے جاتے ہیں، اور فنکشن ٹرانزیکشن کا ہیش واپس کرتا ہے۔

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

ٹرانزیکشن کے ہیش کی اطلاع دیں (اسے دیکھنے کے لیے بلاک ایکسپلورر کے یو آر ایل کے حصے کے طور پر) اور اسے واپس کریں۔

##### ایونٹس کا جواب دینا

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` فنکشن](https://viem.sh/docs/actions/public/watchEvent) آپ کو یہ بتانے دیتا ہے کہ جب کوئی ایونٹ خارج ہوتا ہے تو ایک فنکشن چلنا ہے۔ اگر آپ صرف ایک قسم کے ایونٹ کا خیال رکھتے ہیں (اس معاملے میں، `SetGreeting`)، تو آپ اپنے آپ کو اس ایونٹ کی قسم تک محدود رکھنے کے لیے اس نحو کا استعمال کر سکتے ہیں۔

```typescript
    onLogs: logs => {
```

`onLogs` فنکشن کو اس وقت کال کیا جاتا ہے جب لاگ اندراجات ہوں۔ Ethereum میں "لاگ" اور "ایونٹ" عام طور پر قابل تبادلہ ہیں۔

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

متعدد ایونٹس ہو سکتے ہیں، لیکن سادگی کے لیے ہم صرف پہلے والے کا خیال رکھتے ہیں۔ `logs[0].args` ایونٹ کے دلائل ہیں، اس معاملے میں `sender` اور `greeting`۔

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

اگر بھیجنے والا یہ سرور _نہیں_ ہے، تو گریٹنگ کو تبدیل کرنے کے لیے `setGreeting` کا استعمال کریں۔

#### `package.json` {#package-json}

[یہ فائل](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) [Node.js](https://nodejs.org/en) کنفیگریشن کو کنٹرول کرتی ہے۔ یہ مضمون صرف اہم تعریفوں کی وضاحت کرتا ہے۔

```json
{
  "main": "dist/index.js",
```

یہ تعریف بتاتی ہے کہ کون سی JavaScript فائل چلانی ہے۔

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

اسکرپٹس مختلف ایپلی کیشن ایکشنز ہیں۔ اس معاملے میں، ہمارے پاس صرف `start` ہے، جو سرور کو کمپائل کرتا ہے اور پھر چلاتا ہے۔ `tsc` کمانڈ `typescript` پیکیج کا حصہ ہے اور TypeScript کو JavaScript میں کمپائل کرتا ہے۔ اگر آپ اسے دستی طور پر چلانا چاہتے ہیں، تو یہ `node_modules/.bin` میں واقع ہے۔ دوسرا کمانڈ سرور کو چلاتا ہے۔

```json
  "type": "module",
```

JavaScript نوڈ ایپلی کیشنز کی متعدد اقسام ہیں۔ `module` قسم ہمیں ٹاپ لیول کوڈ میں `await` رکھنے دیتی ہے، جو اس وقت اہم ہے جب آپ سست (اور وہاں غیر مطابقت پذیر) آپریشن کرتے ہیں۔

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

یہ وہ پیکیجز ہیں جن کی صرف ڈیولپمنٹ کے لیے ضرورت ہے۔ یہاں ہمیں `typescript` کی ضرورت ہے اور چونکہ ہم اسے Node.js کے ساتھ استعمال کر رہے ہیں، اس لیے ہم نوڈ متغیرات اور آبجیکٹس، جیسے `process` کے لیے بھی اقسام حاصل کر رہے ہیں۔ [`^<version>` نوٹیشن](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) کا مطلب ہے کہ ورژن یا ایک اعلیٰ ورژن جس میں بریکنگ تبدیلیاں نہ ہوں۔ ورژن نمبروں کے معنی کے بارے میں مزید معلومات کے لیے [یہاں](https://semver.org) دیکھیں۔

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

یہ وہ پیکیجز ہیں جن کی رن ٹائم پر ضرورت ہوتی ہے، جب `dist/app.js` چل رہا ہو۔

## نتیجہ {#conclusion}

مرکزی سرور جو ہم نے یہاں بنایا ہے وہ اپنا کام کرتا ہے، جو ایک صارف کے لیے ایک ایجنٹ کے طور پر کام کرنا ہے۔ کوئی بھی دوسرا شخص جو چاہتا ہے کہ ڈیپ کام کرتا رہے اور گیس خرچ کرنے کو تیار ہے، وہ اپنے ایڈریس کے ساتھ سرور کا ایک نیا انسٹنس چلا سکتا ہے۔

تاہم، یہ صرف اس وقت کام کرتا ہے جب مرکزی سرور کے اعمال کی آسانی سے تصدیق کی جا سکے۔ اگر مرکزی سرور کے پاس کوئی خفیہ اسٹیٹ کی معلومات ہے، یا مشکل حسابات چلاتا ہے، تو یہ ایک مرکزی ادارہ ہے جس پر آپ کو ایپلی کیشن استعمال کرنے کے لیے بھروسہ کرنے کی ضرورت ہے، جو بالکل وہی ہے جس سے بلاک چینز بچنے کی کوشش کرتے ہیں۔ مستقبل کے ایک مضمون میں میں یہ دکھانے کا ارادہ رکھتا ہوں کہ اس مسئلے سے نمٹنے کے لیے [zero-knowledge proofs](/zero-knowledge-proofs) کا استعمال کیسے کیا جائے۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔
