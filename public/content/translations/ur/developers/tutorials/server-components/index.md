---
title: "⁦web3⁩ ایپس کے لیے سرور کے اجزاء اور ایجنٹس"
description: "اس ٹیوٹوریل کو پڑھنے کے بعد، آپ ⁦TypeScript⁩ سرورز لکھنے کے قابل ہو جائیں گے جو بلاک چین پر ایونٹس کو سنتے ہیں اور اپنی ٹرانزیکشنز کے ساتھ اس کے مطابق جواب دیتے ہیں۔ یہ آپ کو مرکزی ایپلی کیشنز لکھنے کے قابل بنائے گا (کیونکہ سرور ناکامی کا ایک نقطہ ہے)، لیکن ⁦web3⁩ اینٹیٹیز کے ساتھ تعامل کر سکتا ہے۔ انہی تکنیکوں کو ایک ایسا ایجنٹ لکھنے کے لیے بھی استعمال کیا جا سکتا ہے جو انسانی مداخلت کے بغیر آن چین ایونٹس کا جواب دیتا ہے۔"
author: "اوری پومرانٹز"
lang: ur
tags: ["ایجنٹ", "سرور", "آف چین", "dapps"]
skill: beginner
breadcrumb: "سرور کے اجزاء"
published: 2024-07-15
---

## تعارف {#introduction}

زیادہ تر معاملات میں، ایک غیر مرکزی ایپلی کیشن (dapp) سافٹ ویئر تقسیم کرنے کے لیے سرور کا استعمال کرتی ہے، لیکن تمام اصل تعامل کلائنٹ (عام طور پر، ویب براؤزر) اور بلاک چین کے درمیان ہوتا ہے۔

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

تاہم، کچھ ایسے معاملات ہیں جہاں ایک ایپلی کیشن کو آزادانہ طور پر چلنے والے سرور کے جزو سے فائدہ ہوگا۔ ایسا سرور ایونٹس، اور دیگر ذرائع، جیسے کہ <span dir="ltr">API</span> سے آنے والی درخواستوں کا ٹرانزیکشنز جاری کر کے جواب دینے کے قابل ہوگا۔

![The interaction with the addition of a server](./fig-2.svg)

ایسے سرور کے لیے کئی ممکنہ کام ہو سکتے ہیں جو وہ انجام دے سکتا ہے۔

- خفیہ حالت کا حامل۔ گیمنگ میں اکثر یہ مفید ہوتا ہے کہ گیم کی تمام معلومات کھلاڑیوں کو دستیاب نہ ہوں۔ تاہم، _بلاک چین پر کوئی راز نہیں ہوتے_، بلاک چین میں موجود کسی بھی معلومات کا پتہ لگانا کسی کے لیے بھی آسان ہے۔ لہذا، اگر گیم کی حالت کے کسی حصے کو خفیہ رکھنا ہے، تو اسے کہیں اور محفوظ کرنا ہوگا (اور ممکنہ طور پر اس حالت کے اثرات کی تصدیق [صفر علم کے ثبوت](/zero-knowledge-proofs) کا استعمال کرتے ہوئے کی جا سکتی ہے)۔

- مرکزی اوریکل۔ اگر داؤ پر لگی رقم کافی کم ہے، تو ایک بیرونی سرور جو آن لائن کچھ معلومات پڑھتا ہے اور پھر اسے چین پر پوسٹ کرتا ہے، اسے ایک [اوریکل](/developers/docs/oracles/) کے طور پر استعمال کرنے کے لیے کافی اچھا ہو سکتا ہے۔

- ایجنٹ۔ بلاک چین پر اسے فعال کرنے کے لیے ٹرانزیکشن کے بغیر کچھ نہیں ہوتا۔ ایک سرور صارف کی جانب سے کام کر سکتا ہے تاکہ موقع ملنے پر [آربٹریج (arbitrage)](/developers/docs/mev/#mev-examples-dex-arbitrage) جیسے اقدامات انجام دے سکے۔

## نمونہ پروگرام {#sample-program}

آپ [GitHub پر](https://github.com/qbzzt/20240715-server-component) ایک نمونہ سرور دیکھ سکتے ہیں۔ یہ سرور Sepolia آزمائشی نیٹ ورک پر [اس کنٹریکٹ](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) سے آنے والے ایونٹس کو سنتا ہے، جو Hardhat کے Greeter کا ایک ترمیم شدہ ورژن ہے۔ جب سلام (greeting) کو تبدیل کیا جاتا ہے، تو یہ اسے واپس تبدیل کر دیتا ہے۔

یہ کنٹریکٹ دیگر ٹیوٹوریلز کے ساتھ شیئر کیا گیا ہے، لہذا جب آپ کا سرور چل رہا ہو تو دوسرے لوگ (اور ان کے سرورز) سلام کو تبدیل کر سکتے ہیں۔ جب آپ کا کام مکمل ہو جائے تو اپنے سرور کو روک دیں تاکہ آپ کا آزمائشی ETH خرچ ہونے سے بچ سکے۔

اسے چلانے کے لیے:

1. ریپوزٹری کو کلون کریں۔

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. نمونہ ریپوزٹری ہولسکی آزمائشی نیٹ ورک کے لیے لکھی گئی تھی، جسے اب بند کر دیا گیا ہے۔ اسے Sepolia اور Sepolia کنٹریکٹ کا پتہ استعمال کرنے کے لیے اپ ڈیٹ کریں۔

   ```sh copy
   sed -i.bak -e 's/holesky/sepolia/g' -e 's/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA/' src/app.ts
   ```

3. ضروری پیکجز انسٹال کریں۔ اگر آپ کے پاس یہ پہلے سے نہیں ہے، تو [پہلے Node انسٹال کریں](https://nodejs.org/en/download/package-manager)۔

   ```sh copy
   npm install
   ```

4. Sepolia آزمائشی نیٹ ورک پر ETH رکھنے والے اکاؤنٹ کی نجی کلید بتانے کے لیے `.env` میں ترمیم کریں۔ اگر آپ کے پاس Sepolia پر ETH نہیں ہے، تو آپ [یہ فوسٹ استعمال کر سکتے ہیں](https://sepolia-faucet.pk910.de/)۔ ایک نیا اکاؤنٹ استعمال کریں جسے آپ صرف ٹیسٹنگ کے لیے استعمال کرتے ہیں، کبھی بھی ایسا اکاؤنٹ استعمال نہ کریں جس میں حقیقی اثاثے ہوں۔

   ```sh filename=".env" copy
   PRIVATE_KEY=0x<private key goes here>
   ```

5. سرور شروع کریں۔

   ```sh copy
   npm start
   ```

6. [ایک بلاک ایکسپلورر](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=write_contract) پر جائیں، اور اس پتے سے مختلف پتہ استعمال کرتے ہوئے جس کی نجی کلید آپ کے پاس ہے، سلام میں ترمیم کریں۔ دیکھیں کہ سلام خود بخود واپس تبدیل ہو جاتا ہے۔

### یہ کیسے کام کرتا ہے؟ {#how-it-works}

سرور کا جزو لکھنے کا طریقہ سمجھنے کا سب سے آسان طریقہ یہ ہے کہ نمونے کا لائن بہ لائن جائزہ لیا جائے۔

#### `src/app.ts` {#src-app-ts}

پروگرام کی اکثریت [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) میں موجود ہے۔

##### ضروری اشیاء بنانا

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

یہ وہ [Viem](https://viem.sh/) اینٹیٹیز ہیں جن کی ہمیں ضرورت ہے، فنکشنز اور [`Address` قسم](https://viem.sh/docs/glossary/types#address)۔ یہ سرور [TypeScript](https://www.typescriptlang.org/) میں لکھا گیا ہے، جو JavaScript کی ایک توسیع ہے جو اسے [مضبوطی سے ٹائپ شدہ (strongly typed)](https://en.wikipedia.org/wiki/Strong_and_weak_typing) بناتی ہے۔

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[یہ فنکشن](https://viem.sh/docs/accounts/privateKey) ہمیں نجی کلید کے مطابق والیٹ کی معلومات، بشمول پتہ، تیار کرنے کی سہولت دیتا ہے۔

```typescript
import { sepolia } from "viem/chains"
```

Viem میں بلاک چین استعمال کرنے کے لیے آپ کو اس کی تعریف (definition) درآمد کرنے کی ضرورت ہے۔ اس صورت میں، ہم [Sepolia](/developers/docs/networks/#sepolia) آزمائشی بلاک چین سے جڑنا چاہتے ہیں۔

```typescript
// اس طرح ہم .env میں موجود ڈیفینیشنز کو process.env میں شامل کرتے ہیں۔
import * as dotenv from "dotenv"
dotenv.config()
```

اس طرح ہم `.env` کو ماحول (environment) میں پڑھتے ہیں۔ ہمیں نجی کلید کے لیے اس کی ضرورت ہے (بعد میں دیکھیں)۔

```typescript
const greeterAddress : Address = "0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA"
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

کسی کنٹریکٹ کو استعمال کرنے کے لیے ہمیں اس کا پتہ اور اس کے لیے [ABI](/glossary/#abi) درکار ہے۔ ہم یہاں دونوں فراہم کرتے ہیں۔

JavaScript (اور اس وجہ سے TypeScript) میں آپ کسی مستقل (constant) کو نئی قدر (value) تفویض نہیں کر سکتے، لیکن آپ اس میں محفوظ کردہ آبجیکٹ میں ترمیم _کر سکتے ہیں_۔ لاحقہ `as const` استعمال کر کے ہم TypeScript کو بتا رہے ہیں کہ فہرست بذات خود مستقل ہے اور اسے تبدیل نہیں کیا جا سکتا۔

```typescript
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

ایک Viem [پبلک کلائنٹ](https://viem.sh/docs/clients/public) بنائیں۔ پبلک کلائنٹس کے ساتھ کوئی نجی کلید منسلک نہیں ہوتی، اور اس لیے وہ ٹرانزیکشنز نہیں بھیج سکتے۔ وہ [`view` فنکشنز](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) کو کال کر سکتے ہیں، اکاؤنٹ کے بیلنس پڑھ سکتے ہیں، وغیرہ۔

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

ماحولیاتی متغیرات (environment variables) [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) میں دستیاب ہیں۔ تاہم، TypeScript مضبوطی سے ٹائپ شدہ ہے۔ ایک ماحولیاتی متغیر کوئی بھی سٹرنگ، یا خالی ہو سکتا ہے، لہذا ماحولیاتی متغیر کی قسم `string | undefined` ہے۔ تاہم، Viem میں ایک کلید کو `0x${string}` کے طور پر بیان کیا گیا ہے (`0x` کے بعد ایک سٹرنگ)۔ یہاں ہم TypeScript کو بتاتے ہیں کہ `PRIVATE_KEY` ماحولیاتی متغیر اس قسم کا ہوگا۔ اگر ایسا نہیں ہے، تو ہمیں رن ٹائم ایرر ملے گا۔

پھر [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) فنکشن اس نجی کلید کا استعمال کرتے ہوئے ایک مکمل اکاؤنٹ آبجیکٹ بناتا ہے۔

```typescript
const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(),
})
```

اس کے بعد، ہم اکاؤنٹ آبجیکٹ کا استعمال کرتے ہوئے ایک [والیٹ کلائنٹ](https://viem.sh/docs/clients/wallet) بناتے ہیں۔ اس کلائنٹ کے پاس ایک نجی کلید اور ایک پتہ ہوتا ہے، لہذا اسے ٹرانزیکشنز بھیجنے کے لیے استعمال کیا جا سکتا ہے۔

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

اب جب کہ ہمارے پاس تمام ضروری چیزیں موجود ہیں، ہم بالآخر ایک [کنٹریکٹ انسٹینس (contract instance)](https://viem.sh/docs/contract/getContract) بنا سکتے ہیں۔ ہم اس کنٹریکٹ انسٹینس کو آن چین کنٹریکٹ کے ساتھ بات چیت کرنے کے لیے استعمال کریں گے۔

##### بلاک چین سے پڑھنا

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

کنٹریکٹ کے وہ فنکشنز جو صرف پڑھنے کے لیے ہیں ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) اور [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) `read` کے تحت دستیاب ہیں۔ اس صورت میں، ہم اسے [`greet`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_contract) فنکشن تک رسائی حاصل کرنے کے لیے استعمال کرتے ہیں، جو سلام واپس کرتا ہے۔

JavaScript سنگل تھریڈڈ ہے، لہذا جب ہم کوئی طویل چلنے والا عمل شروع کرتے ہیں تو ہمیں [یہ بتانے کی ضرورت ہوتی ہے کہ ہم اسے غیر ہم وقتی (asynchronously) طور پر کرتے ہیں](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)۔ بلاک چین کو کال کرنے کے لیے، یہاں تک کہ صرف پڑھنے کے آپریشن کے لیے بھی، کمپیوٹر اور بلاک چین نوڈ کے درمیان ایک راؤنڈ ٹرپ کی ضرورت ہوتی ہے۔ یہی وجہ ہے کہ ہم یہاں بتاتے ہیں کہ کوڈ کو نتیجے کے لیے `await` کرنے کی ضرورت ہے۔

اگر آپ اس میں دلچسپی رکھتے ہیں کہ یہ کیسے کام کرتا ہے تو آپ [اس کے بارے میں یہاں پڑھ سکتے ہیں](https://www.w3schools.com/js/js_promise.asp)، لیکن عملی لحاظ سے آپ کو صرف یہ جاننے کی ضرورت ہے کہ اگر آپ کوئی ایسا آپریشن شروع کرتے ہیں جس میں زیادہ وقت لگتا ہے تو آپ نتائج کا `await` کرتے ہیں، اور ایسا کرنے والے کسی بھی فنکشن کو `async` کے طور پر ڈکلیئر کرنا ضروری ہے۔

##### ٹرانزیکشنز جاری کرنا

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

یہ وہ فنکشن ہے جسے آپ سلام کو تبدیل کرنے والی ٹرانزیکشن جاری کرنے کے لیے کال کرتے ہیں۔ چونکہ یہ ایک طویل آپریشن ہے، اس لیے فنکشن کو `async` کے طور پر ڈکلیئر کیا گیا ہے۔ اندرونی نفاذ (implementation) کی وجہ سے، کسی بھی `async` فنکشن کو `Promise` آبجیکٹ واپس کرنے کی ضرورت ہوتی ہے۔ اس صورت میں، `Promise<any>` کا مطلب ہے کہ ہم یہ متعین نہیں کرتے کہ `Promise` میں بالکل کیا واپس کیا جائے گا۔

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

کنٹریکٹ انسٹینس کے `write` فیلڈ میں وہ تمام فنکشنز ہوتے ہیں جو بلاک چین کی حالت میں لکھتے ہیں (جن کے لیے ٹرانزیکشن بھیجنے کی ضرورت ہوتی ہے)، جیسے کہ [`setGreeting`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=write_contract)۔ پیرامیٹرز، اگر کوئی ہوں، ایک فہرست کے طور پر فراہم کیے جاتے ہیں، اور فنکشن ٹرانزیکشن کا ہیش واپس کرتا ہے۔

```typescript
    console.log(`Working on a fix, see https://eth-sepolia.blockscout.com/tx/${txHash}`)

    return txHash
}
```

ٹرانزیکشن کے ہیش کی اطلاع دیں (اسے دیکھنے کے لیے بلاک ایکسپلورر کے URL کے حصے کے طور پر) اور اسے واپس کریں۔

##### ایونٹس کا جواب دینا

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` فنکشن](https://viem.sh/docs/actions/public/watchEvent) آپ کو یہ بتانے کی سہولت دیتا ہے کہ جب کوئی ایونٹ خارج (emit) ہو تو ایک فنکشن چلنا چاہیے۔ اگر آپ کو صرف ایک قسم کے ایونٹ کی پرواہ ہے (اس صورت میں، `SetGreeting`)، تو آپ خود کو اس ایونٹ کی قسم تک محدود رکھنے کے لیے یہ نحو (syntax) استعمال کر سکتے ہیں۔

```typescript
    onLogs: logs => {
```

جب لاگ اندراجات (log entries) ہوتے ہیں تو `onLogs` فنکشن کو کال کیا جاتا ہے۔ ایتھیریم میں "لاگ" اور "ایونٹ" عام طور پر ایک دوسرے کی جگہ استعمال ہوتے ہیں۔

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

اگر بھیجنے والا یہ سرور _نہیں_ ہے، تو سلام کو تبدیل کرنے کے لیے `setGreeting` استعمال کریں۔

#### `package.json` {#package-json}

[یہ فائل](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) [Node.js](https://nodejs.org/en) کنفیگریشن کو کنٹرول کرتی ہے۔ یہ مضمون صرف اہم تعریفوں کی وضاحت کرتا ہے۔

```json
{
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

سکرپٹس مختلف ایپلیکیشن ایکشنز ہیں۔ اس صورت میں، ہمارے پاس صرف ایک `start` ہے، جو سرور کو مرتب (compile) کرتا ہے اور پھر چلاتا ہے۔ `tsc` کمانڈ `typescript` پیکج کا حصہ ہے اور TypeScript کو JavaScript میں مرتب کرتی ہے۔ اگر آپ اسے دستی طور پر چلانا چاہتے ہیں، تو یہ `node_modules/.bin` میں واقع ہے۔ دوسری کمانڈ سرور کو چلاتی ہے۔

```json
  "type": "module",
```

JavaScript نوڈ ایپلیکیشنز کی متعدد اقسام ہیں۔ `module` قسم ہمیں ٹاپ لیول کوڈ میں `await` رکھنے کی سہولت دیتی ہے، جو اس وقت اہم ہوتا ہے جب آپ سست (اور اس لیے غیر ہم وقتی) آپریشنز کرتے ہیں۔

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

یہ وہ پیکجز ہیں جو صرف ڈیولپمنٹ کے لیے درکار ہیں۔ یہاں ہمیں `typescript` کی ضرورت ہے اور چونکہ ہم اسے Node.js کے ساتھ استعمال کر رہے ہیں، اس لیے ہم نوڈ متغیرات اور اشیاء کے لیے اقسام بھی حاصل کر رہے ہیں، جیسے کہ `process`۔ [`^<version>` اشارے (notation)](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) کا مطلب ہے وہ ورژن یا اس سے اعلیٰ ورژن جس میں بریکنگ تبدیلیاں (breaking changes) نہ ہوں۔ ورژن نمبرز کے معنی کے بارے میں مزید معلومات کے لیے [یہاں](https://semver.org) دیکھیں۔

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

یہ وہ پیکجز ہیں جو رن ٹائم پر درکار ہوتے ہیں، جب `dist/app.js` چلایا جاتا ہے۔

## نتیجہ {#conclusion}

ہم نے یہاں جو مرکزی سرور بنایا ہے وہ اپنا کام کرتا ہے، جو کہ صارف کے لیے ایک ایجنٹ کے طور پر کام کرنا ہے۔ کوئی بھی دوسرا شخص جو چاہتا ہے کہ غیر مرکزی ایپلی کیشن (dapp) کام کرتی رہے اور گیس خرچ کرنے کے لیے تیار ہے، وہ اپنے پتے کے ساتھ سرور کی ایک نئی مثال چلا سکتا ہے۔

تاہم، یہ صرف اس وقت کام کرتا ہے جب مرکزی سرور کے اعمال کی آسانی سے تصدیق کی جا سکے۔ اگر مرکزی سرور کے پاس کوئی خفیہ حالت کی معلومات ہے، یا وہ مشکل حساب کتاب چلاتا ہے، تو یہ ایک مرکزی ہستی ہے جس پر آپ کو ایپلی کیشن استعمال کرنے کے لیے بھروسہ کرنے کی ضرورت ہے، جو بالکل وہی ہے جس سے بلاک چینز بچنے کی کوشش کرتی ہیں۔ مستقبل کے ایک مضمون میں، میں یہ دکھانے کا ارادہ رکھتا ہوں کہ اس مسئلے سے نمٹنے کے لیے [صفر علم کے ثبوت](/zero-knowledge-proofs) کا استعمال کیسے کیا جائے۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔
