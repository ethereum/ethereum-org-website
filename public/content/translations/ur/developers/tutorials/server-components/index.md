---
title: "ویب 3 ایپس کے لیے سرور کے اجزاء اور ایجنٹس"
description: "اس ٹیوٹوریل کو پڑھنے کے بعد، آپ ٹائپ اسکرپٹ (TypeScript) سرورز لکھنے کے قابل ہو جائیں گے جو بلاک چین پر ہونے والے ایونٹس کو سنتے ہیں اور اپنی ٹرانزیکشنز کے ساتھ اس کے مطابق جواب دیتے ہیں۔ یہ آپ کو سینٹرلائزڈ ایپلی کیشنز لکھنے کے قابل بنائے گا (کیونکہ سرور ناکامی کا ایک نقطہ ہے)، لیکن ویب 3 اینٹیٹیز کے ساتھ تعامل کر سکتا ہے۔ انہی تکنیکوں کو ایک ایسا ایجنٹ لکھنے کے لیے بھی استعمال کیا جا سکتا ہے جو انسانی مداخلت کے بغیر آن چین ایونٹس کا جواب دیتا ہے۔"
author: "اوری پومرانٹز"
lang: ur
tags: ["ایجنٹ", "سرور", "آف چین", "ڈی ایپس"]
skill: beginner
breadcrumb: "سرور کے اجزاء"
published: 2024-07-15
---

## تعارف {#introduction}

زیادہ تر معاملات میں، ایک ڈی سینٹرلائزڈ ایپ سافٹ ویئر تقسیم کرنے کے لیے سرور کا استعمال کرتی ہے، لیکن تمام اصل تعامل کلائنٹ (عام طور پر، ویب براؤزر) اور بلاک چین کے درمیان ہوتا ہے۔

![ویب سرور، کلائنٹ، اور بلاک چین کے درمیان عام تعامل](./fig-1.svg)

تاہم، کچھ ایسے معاملات ہیں جہاں ایک ایپلی کیشن کو آزادانہ طور پر چلنے والے سرور کے جزو سے فائدہ ہوگا۔ ایسا سرور ایونٹس، اور دیگر ذرائع، جیسے کہ API سے آنے والی درخواستوں کا ٹرانزیکشنز جاری کر کے جواب دینے کے قابل ہوگا۔

![سرور کے اضافے کے ساتھ تعامل](./fig-2.svg)

ایسے سرور کے لیے کئی ممکنہ کام ہو سکتے ہیں جو وہ انجام دے سکتا ہے۔

- خفیہ اسٹیٹ کا حامل۔ گیمنگ میں اکثر یہ مفید ہوتا ہے کہ گیم کی تمام معلومات کھلاڑیوں کو دستیاب نہ ہوں۔ تاہم، _بلاک چین پر کوئی راز نہیں ہوتے_، بلاک چین میں موجود کسی بھی معلومات کا پتہ لگانا کسی کے لیے بھی آسان ہے۔ لہذا، اگر گیم کی اسٹیٹ کے کسی حصے کو خفیہ رکھنا ہے، تو اسے کہیں اور اسٹور کرنا ہوگا (اور ممکنہ طور پر اس اسٹیٹ کے اثرات کی تصدیق [زیرو نالج پروفز](/zero-knowledge-proofs) کا استعمال کرتے ہوئے کی جا سکتی ہے)۔

- سینٹرلائزڈ اوریکل۔ اگر داؤ پر لگی رقم کافی کم ہے، تو ایک بیرونی سرور جو آن لائن کچھ معلومات پڑھتا ہے اور پھر اسے چین پر پوسٹ کرتا ہے، اسے ایک [اوریکل](/developers/docs/oracles/) کے طور پر استعمال کرنا کافی ہو سکتا ہے۔

- ایجنٹ۔ بلاک چین پر اسے فعال کرنے کے لیے کسی ٹرانزیکشن کے بغیر کچھ نہیں ہوتا۔ ایک سرور صارف کی جانب سے کام کر سکتا ہے تاکہ موقع ملنے پر [آربٹریج](/developers/docs/mev/#mev-examples-dex-arbitrage) جیسے افعال انجام دے سکے۔

## نمونہ پروگرام {#sample-program}

آپ [github پر](https://github.com/qbzzt/20240715-server-component) ایک نمونہ سرور دیکھ سکتے ہیں۔ یہ سرور [اس کنٹریکٹ](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) سے آنے والے ایونٹس کو سنتا ہے، جو Hardhat کے Greeter کا ایک ترمیم شدہ ورژن ہے۔ جب گریٹنگ (greeting) کو تبدیل کیا جاتا ہے، تو یہ اسے واپس تبدیل کر دیتا ہے۔

اسے چلانے کے لیے:

1. ریپوزٹری کو کلون کریں۔

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. ضروری پیکجز انسٹال کریں۔ اگر آپ کے پاس یہ پہلے سے نہیں ہے، تو [پہلے Node انسٹال کریں](https://nodejs.org/en/download/package-manager)۔

   ```sh copy
   npm install
   ```

3. ایک ایسے اکاؤنٹ کی پرائیویٹ کی (private key) کی وضاحت کرنے کے لیے `.env` میں ترمیم کریں جس کے پاس Holesky ٹیسٹ نیٹ پر ETH ہو۔ اگر آپ کے پاس Holesky پر ETH نہیں ہے، تو آپ [یہ فوسٹ استعمال کر سکتے ہیں](https://holesky-faucet.pk910.de/)۔

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. سرور شروع کریں۔

   ```sh copy
   npm start
   ```

5. [ایک بلاک ایکسپلورر](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) پر جائیں، اور اس ایڈریس سے مختلف ایڈریس استعمال کرتے ہوئے جس کے پاس پرائیویٹ کی ہے، گریٹنگ میں ترمیم کریں۔ دیکھیں کہ گریٹنگ خود بخود واپس تبدیل ہو جاتی ہے۔

### یہ کیسے کام کرتا ہے؟ {#how-it-works}

سرور کا جزو لکھنے کا طریقہ سمجھنے کا سب سے آسان طریقہ یہ ہے کہ نمونے کا لائن بہ لائن جائزہ لیا جائے۔

#### `src/app.ts` {#src-app-ts}

پروگرام کی اکثریت [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) میں موجود ہے۔

##### ضروری آبجیکٹس بنانا

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

یہ وہ [Viem](https://viem.sh/) اینٹیٹیز ہیں جن کی ہمیں ضرورت ہے، فنکشنز اور [`Address` ٹائپ](https://viem.sh/docs/glossary/types#address)۔ یہ سرور [TypeScript](https://www.typescriptlang.org/) میں لکھا گیا ہے، جو JavaScript کی ایک ایکسٹینشن ہے جو اسے [اسٹرونگلی ٹائپڈ (strongly typed)](https://en.wikipedia.org/wiki/Strong_and_weak_typing) بناتی ہے۔

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[یہ فنکشن](https://viem.sh/docs/accounts/privateKey) ہمیں پرائیویٹ کی کے مطابق والیٹ کی معلومات، بشمول ایڈریس، تیار کرنے دیتا ہے۔

```typescript
import { holesky } from "viem/chains"
```

Viem میں بلاک چین استعمال کرنے کے لیے آپ کو اس کی تعریف (definition) امپورٹ کرنے کی ضرورت ہے۔ اس صورت میں، ہم [Holesky](https://github.com/eth-clients/holesky) ٹیسٹ بلاک چین سے جڑنا چاہتے ہیں۔

```typescript
// اس طرح ہم .env میں موجود تعریفات کو process.env میں شامل کرتے ہیں۔
import * as dotenv from "dotenv"
dotenv.config()
```

اس طرح ہم `.env` کو انوائرنمنٹ میں پڑھتے ہیں۔ ہمیں پرائیویٹ کی کے لیے اس کی ضرورت ہے (بعد میں دیکھیں)۔

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

کسی کنٹریکٹ کو استعمال کرنے کے لیے ہمیں اس کے ایڈریس اور اس کے لیے [ABI](/glossary/#abi) کی ضرورت ہوتی ہے۔ ہم یہاں دونوں فراہم کرتے ہیں۔

JavaScript (اور اس وجہ سے TypeScript) میں آپ کسی کونسٹنٹ (constant) کو نئی ویلیو تفویض نہیں کر سکتے، لیکن آپ اس میں اسٹور کیے گئے آبجیکٹ میں ترمیم _کر سکتے ہیں_۔ `as const` لاحقہ استعمال کر کے ہم TypeScript کو بتا رہے ہیں کہ فہرست بذات خود کونسٹنٹ ہے اور اسے تبدیل نہیں کیا جا سکتا۔

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

ایک Viem [پبلک کلائنٹ](https://viem.sh/docs/clients/public.html) بنائیں۔ پبلک کلائنٹس کے ساتھ کوئی پرائیویٹ کی منسلک نہیں ہوتی، اور اس لیے وہ ٹرانزیکشنز نہیں بھیج سکتے۔ وہ [`view` فنکشنز](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) کو کال کر سکتے ہیں، اکاؤنٹ بیلنس پڑھ سکتے ہیں، وغیرہ۔

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

انوائرنمنٹ ویری ایبلز [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) میں دستیاب ہیں۔ تاہم، TypeScript اسٹرونگلی ٹائپڈ ہے۔ ایک انوائرنمنٹ ویری ایبل کوئی بھی اسٹرنگ (string)، یا خالی ہو سکتا ہے، لہذا انوائرنمنٹ ویری ایبل کی ٹائپ `string | undefined` ہے۔ تاہم، Viem میں ایک کی (key) کو `0x${string}` (یعنی `0x` کے بعد ایک اسٹرنگ) کے طور پر بیان کیا گیا ہے۔ یہاں ہم TypeScript کو بتاتے ہیں کہ `PRIVATE_KEY` انوائرنمنٹ ویری ایبل اس ٹائپ کا ہوگا۔ اگر ایسا نہیں ہے، تو ہمیں رن ٹائم ایرر ملے گا۔

پھر [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) فنکشن اس پرائیویٹ کی کا استعمال کرتے ہوئے ایک مکمل اکاؤنٹ آبجیکٹ بناتا ہے۔

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

اس کے بعد، ہم اکاؤنٹ آبجیکٹ کا استعمال کرتے ہوئے ایک [والیٹ کلائنٹ](https://viem.sh/docs/clients/wallet) بناتے ہیں۔ اس کلائنٹ کے پاس ایک پرائیویٹ کی اور ایک ایڈریس ہوتا ہے، لہذا اسے ٹرانزیکشنز بھیجنے کے لیے استعمال کیا جا سکتا ہے۔

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

اب چونکہ ہمارے پاس تمام ضروری چیزیں موجود ہیں، ہم آخر کار ایک [کنٹریکٹ انسٹینس (contract instance)](https://viem.sh/docs/contract/getContract) بنا سکتے ہیں۔ ہم اس کنٹریکٹ انسٹینس کا استعمال آن چین کنٹریکٹ کے ساتھ بات چیت کرنے کے لیے کریں گے۔

##### بلاک چین سے پڑھنا

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

کنٹریکٹ کے وہ فنکشنز جو صرف پڑھنے کے لیے ہیں ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) اور [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) وہ `read` کے تحت دستیاب ہیں۔ اس صورت میں، ہم اسے [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) فنکشن تک رسائی حاصل کرنے کے لیے استعمال کرتے ہیں، جو گریٹنگ واپس کرتا ہے۔

JavaScript سنگل تھریڈڈ (single-threaded) ہے، لہذا جب ہم کوئی طویل چلنے والا عمل شروع کرتے ہیں تو ہمیں [یہ بتانے کی ضرورت ہوتی ہے کہ ہم اسے غیر ہم آہنگ (asynchronously) طور پر کرتے ہیں](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)۔ بلاک چین کو کال کرنے کے لیے، یہاں تک کہ صرف پڑھنے کے آپریشن کے لیے بھی، کمپیوٹر اور بلاک چین نوڈ کے درمیان ایک راؤنڈ ٹرپ کی ضرورت ہوتی ہے۔ یہی وجہ ہے کہ ہم یہاں بتاتے ہیں کہ کوڈ کو نتیجے کے لیے `await` کرنے کی ضرورت ہے۔

اگر آپ اس میں دلچسپی رکھتے ہیں کہ یہ کیسے کام کرتا ہے تو آپ [اس کے بارے میں یہاں پڑھ سکتے ہیں](https://www.w3schools.com/js/js_promise.asp)، لیکن عملی لحاظ سے آپ کو صرف یہ جاننے کی ضرورت ہے کہ اگر آپ کوئی ایسا آپریشن شروع کرتے ہیں جس میں طویل وقت لگتا ہے تو آپ نتائج کا `await` کرتے ہیں، اور یہ کہ ایسا کرنے والے کسی بھی فنکشن کو `async` کے طور پر ڈکلیئر کرنا ضروری ہے۔

##### ٹرانزیکشنز جاری کرنا

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

یہ وہ فنکشن ہے جسے آپ گریٹنگ کو تبدیل کرنے والی ٹرانزیکشن جاری کرنے کے لیے کال کرتے ہیں۔ چونکہ یہ ایک طویل آپریشن ہے، اس لیے فنکشن کو `async` کے طور پر ڈکلیئر کیا گیا ہے۔ اندرونی نفاذ کی وجہ سے، کسی بھی `async` فنکشن کو ایک `Promise` آبجیکٹ واپس کرنے کی ضرورت ہوتی ہے۔ اس صورت میں، `Promise<any>` کا مطلب ہے کہ ہم یہ واضح نہیں کرتے کہ `Promise` میں بالکل کیا واپس کیا جائے گا۔

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

کنٹریکٹ انسٹینس کے `write` فیلڈ میں وہ تمام فنکشنز ہوتے ہیں جو بلاک چین کی اسٹیٹ پر لکھتے ہیں (وہ جن کے لیے ٹرانزیکشن بھیجنے کی ضرورت ہوتی ہے)، جیسے کہ [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862)۔ پیرامیٹرز، اگر کوئی ہوں، ایک فہرست کے طور پر فراہم کیے جاتے ہیں، اور فنکشن ٹرانزیکشن کا ہیش واپس کرتا ہے۔

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

ٹرانزیکشن کے ہیش کی اطلاع دیں (اسے دیکھنے کے لیے بلاک ایکسپلورر کے URL کے حصے کے طور پر) اور اسے واپس کریں۔

##### ایونٹس کا جواب دینا

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` فنکشن](https://viem.sh/docs/actions/public/watchEvent) آپ کو یہ بتانے دیتا ہے کہ جب کوئی ایونٹ خارج (emit) ہو تو کون سا فنکشن چلنا چاہیے۔ اگر آپ کو صرف ایک قسم کے ایونٹ کی پرواہ ہے (اس صورت میں، `SetGreeting`)، تو آپ خود کو اس ایونٹ کی قسم تک محدود رکھنے کے لیے یہ سنٹیکس (syntax) استعمال کر سکتے ہیں۔

```typescript
    onLogs: logs => {
```

جب لاگ (log) اندراجات ہوتے ہیں تو `onLogs` فنکشن کو کال کیا جاتا ہے۔ ایتھیریم میں "لاگ" اور "ایونٹ" عام طور پر ایک دوسرے کی جگہ استعمال ہوتے ہیں۔

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

متعدد ایونٹس ہو سکتے ہیں، لیکن سادگی کے لیے ہم صرف پہلے والے کی پرواہ کرتے ہیں۔ `logs[0].args` ایونٹ کے دلائل (arguments) ہیں، اس صورت میں `sender` اور `greeting`۔

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

اسکرپٹس مختلف ایپلی کیشن ایکشنز ہیں۔ اس صورت میں، ہمارے پاس صرف ایک `start` ہے، جو سرور کو مرتب (compile) کرتا ہے اور پھر چلاتا ہے۔ `tsc` کمانڈ `typescript` پیکج کا حصہ ہے اور TypeScript کو JavaScript میں مرتب کرتی ہے۔ اگر آپ اسے دستی طور پر چلانا چاہتے ہیں، تو یہ `node_modules/.bin` میں واقع ہے۔ دوسری کمانڈ سرور کو چلاتی ہے۔

```json
  "type": "module",
```

JavaScript نوڈ ایپلی کیشنز کی متعدد اقسام ہیں۔ `module` ٹائپ ہمیں ٹاپ لیول کوڈ میں `await` رکھنے کی اجازت دیتی ہے، جو اس وقت اہم ہوتا ہے جب آپ سست (اور اس لیے غیر ہم آہنگ) آپریشنز کرتے ہیں۔

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

یہ وہ پیکجز ہیں جو صرف ڈیولپمنٹ کے لیے درکار ہیں۔ یہاں ہمیں `typescript` کی ضرورت ہے اور چونکہ ہم اسے Node.js کے ساتھ استعمال کر رہے ہیں، اس لیے ہم نوڈ ویری ایبلز اور آبجیکٹس، جیسے کہ `process` کے لیے ٹائپس بھی حاصل کر رہے ہیں۔ [`^<version>` نوٹیشن](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) کا مطلب ہے وہ ورژن یا اس سے اعلیٰ ورژن جس میں بریکنگ تبدیلیاں (breaking changes) نہ ہوں۔ ورژن نمبرز کے معنی کے بارے میں مزید معلومات کے لیے [یہاں](https://semver.org) دیکھیں۔

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

یہ وہ پیکجز ہیں جو رن ٹائم پر درکار ہوتے ہیں، جب `dist/app.js` چلایا جاتا ہے۔

## نتیجہ {#conclusion}

ہم نے یہاں جو سینٹرلائزڈ سرور بنایا ہے وہ اپنا کام کرتا ہے، جو کہ صارف کے لیے ایک ایجنٹ کے طور پر کام کرنا ہے۔ کوئی بھی دوسرا شخص جو چاہتا ہے کہ ڈی ایپ (dapp) کام کرتی رہے اور گیس خرچ کرنے کو تیار ہے، وہ اپنے ایڈریس کے ساتھ سرور کا ایک نیا انسٹینس چلا سکتا ہے۔

تاہم، یہ صرف اس وقت کام کرتا ہے جب سینٹرلائزڈ سرور کے افعال کی آسانی سے تصدیق کی جا سکے۔ اگر سینٹرلائزڈ سرور کے پاس کوئی خفیہ اسٹیٹ کی معلومات ہیں، یا وہ مشکل حساب کتاب چلاتا ہے، تو یہ ایک سینٹرلائزڈ اینٹیٹی ہے جس پر آپ کو ایپلی کیشن استعمال کرنے کے لیے بھروسہ کرنے کی ضرورت ہے، اور بلاک چینز بالکل اسی چیز سے بچنے کی کوشش کرتی ہیں۔ ایک مستقبل کے مضمون میں، میں یہ دکھانے کا ارادہ رکھتا ہوں کہ اس مسئلے سے نمٹنے کے لیے [زیرو نالج پروفز](/zero-knowledge-proofs) کا استعمال کیسے کیا جائے۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔