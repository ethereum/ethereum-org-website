---
title: "خفیہ اسٹیٹ کے لیے زیرو نالج کا استعمال"
description: "آن چین گیمز محدود ہیں کیونکہ وہ کوئی پوشیدہ معلومات نہیں رکھ سکتے۔ اس ٹیوٹوریل کو پڑھنے کے بعد، ایک قاری زیرو نالج پروفز اور سرور کمپونینٹس کو ملا کر ایک خفیہ اسٹیٹ، آف چین، کمپونینٹ کے ساتھ قابل تصدیق گیمز بنا سکے گا۔ اس کو کرنے کی تکنیک کا مظاہرہ ایک مائن سویپر گیم بنا کر کیا جائے گا۔"
author: "اوری پومیرانٹز"
tags:
  [
    "سرور",
    "آف چین",
    "مرکزی",
    "زیرو-نالج",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: ur-in
published: 2025-03-15
---

_بلاک چین پر کوئی راز نہیں ہوتے_۔ بلاک چین پر جو کچھ بھی پوسٹ کیا جاتا ہے وہ سب کے پڑھنے کے لیے کھلا ہے۔ یہ ضروری ہے، کیونکہ بلاک چین اس پر مبنی ہے کہ کوئی بھی اس کی تصدیق کر سکے۔ تاہم، گیمز اکثر خفیہ اسٹیٹ پر انحصار کرتے ہیں۔ مثال کے طور پر، [مائن سویپر](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) کے گیم کا کوئی مطلب نہیں بنتا اگر آپ صرف ایک بلاک چین ایکسپلورر پر جا کر نقشہ دیکھ سکتے ہیں۔

سب سے آسان حل یہ ہے کہ خفیہ اسٹیٹ کو رکھنے کے لیے ایک [سرور کمپونینٹ](/developers/tutorials/server-components/) کا استعمال کیا جائے۔ تاہم، ہم بلاک چین کا استعمال اس لیے کرتے ہیں تاکہ گیم ڈیولپر کی طرف سے دھوکہ دہی کو روکا جا سکے۔ ہمیں سرور کمپونینٹ کی ایمانداری کو یقینی بنانے کی ضرورت ہے۔ سرور اسٹیٹ کا ایک ہیش فراہم کر سکتا ہے، اور [زیرو نالج پروفز](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) کا استعمال کر کے یہ ثابت کر سکتا ہے کہ ایک چال کے نتیجے کا حساب لگانے کے لیے استعمال کیا گیا اسٹیٹ صحیح ہے۔

اس مضمون کو پڑھنے کے بعد آپ جان جائیں گے کہ اس قسم کا خفیہ اسٹیٹ رکھنے والا سرور، اسٹیٹ دکھانے کے لیے ایک کلائنٹ، اور دونوں کے درمیان مواصلات کے لیے ایک آن چین کمپونینٹ کیسے بنایا جائے۔ ہم جو اہم ٹولز استعمال کریں گے وہ یہ ہیں:

| ٹول                                           | مقصد                                        |                       ورژن پر تصدیق شدہ |
| --------------------------------------------- | ------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | زیرو نالج پروفز اور ان کی تصدیق             |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | سرور اور کلائنٹ دونوں کے لیے پروگرامنگ زبان |   5.4.2 |
| [Node](https://nodejs.org/en)                 | سرور چلانا                                  | 20.18.2 |
| [Viem](https://viem.sh/)                      | بلاک چین کے ساتھ مواصلات                    |  2.9.20 |
| [MUD](https://mud.dev/)                       | آن چین ڈیٹا مینجمنٹ                         |  2.0.12 |
| [React](https://react.dev/)                   | کلائنٹ یوزر انٹرفیس                         |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | کلائنٹ کوڈ کی سرونگ                         |   4.2.1 |

## مائن سویپر کی مثال {#minesweeper}

[مائن سویپر](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) ایک ایسا گیم ہے جس میں ایک مائن فیلڈ کے ساتھ ایک خفیہ نقشہ شامل ہے۔ کھلاڑی ایک مخصوص مقام پر کھودنے کا انتخاب کرتا ہے۔ اگر اس مقام پر کوئی مائن ہے، تو گیم ختم ہو جاتا ہے۔ ورنہ، کھلاڑی کو اس مقام کے آس پاس کے آٹھ چوکوروں میں مائنز کی تعداد ملتی ہے۔

یہ ایپلیکیشن [MUD](https://mud.dev/) کا استعمال کرتے ہوئے لکھی گئی ہے، جو ایک ایسا فریم ورک ہے جو ہمیں [کی-ویلیو ڈیٹا بیس](https://aws.amazon.com/nosql/key-value/) کا استعمال کرتے ہوئے آن چین ڈیٹا اسٹور کرنے اور اس ڈیٹا کو خود بخود آف چین کمپونینٹس کے ساتھ سنکرونائز کرنے کی اجازت دیتا ہے۔ سنکرونائزیشن کے علاوہ، MUD رسائی کنٹرول فراہم کرنا آسان بناتا ہے، اور دوسرے صارفین کے لیے ہماری ایپلیکیشن کو بغیر اجازت کے [توسیع](https://mud.dev/guides/extending-a-world) دینا بھی آسان بناتا ہے۔

### مائن سویپر کی مثال چلانا {#running-minesweeper-example}

مائن سویپر کی مثال چلانے کے لیے:

1. یقینی بنائیں کہ آپ نے [پیشگی شرائط انسٹال کر لی ہیں](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), اور [`mprocs`](https://github.com/pvolok/mprocs)۔

2. ریپوزٹری کو کلون کریں۔

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. پیکجز انسٹال کریں۔

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   اگر `pnpm install` کے حصے کے طور پر Foundry انسٹال کیا گیا تھا، تو آپ کو کمانڈ لائن شیل کو دوبارہ شروع کرنے کی ضرورت ہے۔

4. کنٹریکٹس کو کمپائل کریں

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. پروگرام شروع کریں (بشمول ایک [anvil](https://book.getfoundry.sh/anvil/) بلاک چین) اور انتظار کریں۔

   ```sh copy
   mprocs
   ```

   نوٹ کریں کہ اسٹارٹ اپ میں کافی وقت لگتا ہے۔ پیشرفت دیکھنے کے لیے، پہلے نیچے کے تیر کا استعمال کرتے ہوئے _کنٹریکٹس_ ٹیب پر اسکرول کریں تاکہ MUD کنٹریکٹس کو ڈیپلائے ہوتے دیکھیں۔ جب آپ کو _فائل کی تبدیلیوں کا انتظار ہے…_ کا پیغام ملے، تو کنٹریکٹس ڈیپلائے ہو چکے ہیں اور مزید پیشرفت _سرور_ ٹیب میں ہوگی۔ وہاں، آپ اس وقت تک انتظار کریں جب تک آپ کو _ویریفائر ایڈریس: 0x...._ کا پیغام نہ مل جائے۔

   اگر یہ مرحلہ کامیاب ہو جاتا ہے، تو آپ کو `mprocs` اسکرین نظر آئے گی، جس میں بائیں طرف مختلف پروسیسز اور دائیں طرف فی الحال منتخب کردہ پروسیس کے لیے کنسول آؤٹ پٹ ہوگا۔

   ![mprocs اسکرین](./mprocs.png)

   اگر `mprocs` کے ساتھ کوئی مسئلہ ہے، تو آپ چاروں پروسیسز کو دستی طور پر چلا سکتے ہیں، ہر ایک کو اپنی کمانڈ لائن ونڈو میں:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **کنٹریکٹس**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **سرور**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **کلائنٹ**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. اب آپ [کلائنٹ](http://localhost:3000) پر براؤز کر سکتے ہیں، **نیا گیم** پر کلک کریں، اور کھیلنا شروع کر سکتے ہیں۔

### ٹیبلز {#tables}

ہمیں آن چین [کئی ٹیبلز](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) کی ضرورت ہے۔

- `Configuration`: یہ ٹیبل ایک سنگلٹن ہے، اس میں کوئی کلید نہیں ہے اور ایک ہی ریکارڈ ہے۔ اس کا استعمال گیم کی کنفیگریشن کی معلومات کو رکھنے کے لیے کیا جاتا ہے:
  - `height`: ایک مائن فیلڈ کی اونچائی
  - `width`: ایک مائن فیلڈ کی چوڑائی
  - `numberOfBombs`: ہر مائن فیلڈ میں بموں کی تعداد

- `VerifierAddress`: یہ ٹیبل بھی ایک سنگلٹن ہے۔ اس کا استعمال کنفیگریشن کے ایک حصے کو رکھنے کے لیے کیا جاتا ہے، یعنی ویریفائر کنٹریکٹ (`verifier`) کا ایڈریس۔ ہم اس معلومات کو `Configuration` ٹیبل میں رکھ سکتے تھے، لیکن یہ ایک مختلف کمپونینٹ، یعنی سرور کے ذریعہ سیٹ کیا جاتا ہے، لہذا اسے ایک الگ ٹیبل میں رکھنا آسان ہے۔

- `PlayerGame`: کلید کھلاڑی کا ایڈریس ہے۔ ڈیٹا یہ ہے:

  - `gameId`: 32 بائٹ کی ویلیو جو اس نقشے کا ہیش ہے جس پر کھلاڑی کھیل رہا ہے (گیم شناخت کنندہ)۔
  - `win`: ایک بولین جو یہ بتاتا ہے کہ آیا کھلاڑی نے گیم جیت لیا ہے۔
  - `lose`: ایک بولین جو یہ بتاتا ہے کہ آیا کھلاڑی نے گیم ہار دیا ہے۔
  - `digNumber`: گیم میں کامیاب کھدائیوں کی تعداد۔

- `GamePlayer`: یہ ٹیبل الٹی میپنگ رکھتا ہے، `gameId` سے کھلاڑی کے ایڈریس تک۔

- `Map`: کلید تین ویلیوز کا ایک ٹوپل ہے:

  - `gameId`: 32 بائٹ کی ویلیو جو اس نقشے کا ہیش ہے جس پر کھلاڑی کھیل رہا ہے (گیم شناخت کنندہ)۔
  - `x` کوآرڈینیٹ
  - `y` کوآرڈینیٹ

  ویلیو ایک واحد نمبر ہے۔ اگر بم کا پتہ چلا تو یہ 255 ہے۔ ورنہ، یہ اس مقام کے ارد گرد بموں کی تعداد جمع ایک ہے۔ ہم صرف بموں کی تعداد کا استعمال نہیں کر سکتے، کیونکہ ڈیفالٹ طور پر EVM میں تمام اسٹوریج اور MUD میں تمام قطار کی ویلیوز صفر ہوتی ہیں۔ ہمیں "کھلاڑی نے ابھی تک یہاں کھدائی نہیں کی ہے" اور "کھلاڑی نے یہاں کھدائی کی، اور پایا کہ ارد گرد صفر بم ہیں" کے درمیان فرق کرنے کی ضرورت ہے۔

اس کے علاوہ، کلائنٹ اور سرور کے درمیان مواصلات آن چین کمپونینٹ کے ذریعے ہوتی ہے۔ یہ بھی ٹیبلز کا استعمال کرتے ہوئے نافذ کیا گیا ہے۔

- `PendingGame`: نیا گیم شروع کرنے کے لیے غیر خدمتی درخواستیں۔
- `PendingDig`: ایک مخصوص گیم میں ایک مخصوص جگہ پر کھودنے کے لیے غیر خدمتی درخواستیں۔ یہ ایک [آف چین ٹیبل](https://mud.dev/store/tables#types-of-tables) ہے، جس کا مطلب ہے کہ یہ EVM اسٹوریج میں نہیں لکھا جاتا، یہ صرف ایونٹس کا استعمال کرتے ہوئے آف چین پڑھا جا سکتا ہے۔

### ایگزیکیوشن اور ڈیٹا فلو {#execution-data-flows}

یہ فلو کلائنٹ، آن چین کمپونینٹ، اور سرور کے درمیان ایگزیکیوشن کو مربوط کرتے ہیں۔

#### ابتدا {#initialization-flow}

جب آپ `mprocs` چلاتے ہیں، تو یہ اقدامات ہوتے ہیں:

1. [`mprocs`](https://github.com/pvolok/mprocs) چار کمپونینٹس چلاتا ہے:

   - [Anvil](https://book.getfoundry.sh/anvil/)، جو ایک مقامی بلاک چین چلاتا ہے
   - [کنٹریکٹس](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)، جو MUD کے لیے کنٹریکٹس کو کمپائل (اگر ضرورت ہو) اور ڈیپلائے کرتا ہے
   - [کلائنٹ](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client)، جو UI اور کلائنٹ کوڈ کو ویب براؤزرز پر سرو کرنے کے لیے [Vite](https://vitejs.dev/) چلاتا ہے۔
   - [سرور](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)، جو سرور کے اعمال انجام دیتا ہے

2. `contracts` پیکج MUD کنٹریکٹس کو ڈیپلائے کرتا ہے اور پھر [ `PostDeploy.s.sol` اسکرپٹ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) چلاتا ہے۔ یہ اسکرپٹ کنفیگریشن سیٹ کرتا ہے۔ گٹ ہب سے کوڈ [ایک 10x5 مائن فیلڈ کی وضاحت کرتا ہے جس میں آٹھ مائنز ہیں](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23)۔

3. [سرور](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD کو سیٹ اپ کر کے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) شروع ہوتا ہے۔ دیگر چیزوں کے علاوہ، یہ ڈیٹا سنکرونائزیشن کو فعال کرتا ہے، تاکہ متعلقہ ٹیبلز کی ایک کاپی سرور کی میموری میں موجود ہو۔

4. سرور ایک فنکشن کو سبسکرائب کرتا ہے تاکہ [جب `Configuration` ٹیبل تبدیل ہو](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) تو اسے ایگزیکیوٹ کیا جائے۔ [یہ فنکشن](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) `PostDeploy.s.sol` کے ایگزیکیوٹ ہونے اور ٹیبل میں ترمیم کرنے کے بعد کال کیا جاتا ہے۔

5. جب سرور انیشیئلائزیشن فنکشن کے پاس کنفیگریشن ہوتی ہے، تو [یہ `zkFunctions` کو کال کرتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) تاکہ [سرور کے زیرو نالج حصے](#using-zokrates-from-typescript) کو انیشیئلائز کیا جا سکے۔ یہ اس وقت تک نہیں ہو سکتا جب تک کہ ہمیں کنفیگریشن نہ مل جائے کیونکہ زیرو نالج فنکشنز کو مائن فیلڈ کی چوڑائی اور اونچائی کو مستقل کے طور پر رکھنا ہوتا ہے۔

6. سرور کا زیرو نالج حصہ انیشیئلائز ہونے کے بعد، اگلا قدم [زیرو نالج ویریفیکیشن کنٹریکٹ کو بلاک چین پر ڈیپلائے کرنا](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) اور MUD میں ویریفائی ایڈریس سیٹ کرنا ہے۔

7. آخر میں، ہم اپ ڈیٹس کو سبسکرائب کرتے ہیں تاکہ ہم دیکھ سکیں کہ جب کوئی کھلاڑی یا تو [نیا گیم شروع کرنے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) کی درخواست کرتا ہے یا [موجودہ گیم میں کھدائی کرنے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) کی درخواست کرتا ہے۔

#### نیا گیم {#new-game-flow}

جب کھلاڑی نیا گیم کی درخواست کرتا ہے تو یہ ہوتا ہے۔

1. اگر اس کھلاڑی کے لیے کوئی گیم جاری نہیں ہے، یا ایک ہے لیکن اس کا گیم آئی ڈی صفر ہے، تو کلائنٹ ایک [نیا گیم بٹن](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) دکھاتا ہے۔ جب صارف اس بٹن کو دباتا ہے، تو [React `newGame` فنکشن](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96) چلاتا ہے۔

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) ایک `System` کال ہے۔ MUD میں تمام کالز `World` کنٹریکٹ کے ذریعے روٹ کی جاتی ہیں، اور زیادہ تر معاملات میں آپ `<namespace>__<function name>` کو کال کرتے ہیں۔ اس معاملے میں، کال `app__newGame` پر ہوتی ہے، جسے MUD پھر [`GameSystem` میں `newGame` پر](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) روٹ کرتا ہے۔

3. آن چین فنکشن چیک کرتا ہے کہ کھلاڑی کا کوئی گیم جاری نہیں ہے، اور اگر نہیں ہے تو [درخواست کو `PendingGame` ٹیبل میں شامل کر دیتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)۔

4. سرور `PendingGame` میں تبدیلی کا پتہ لگاتا ہے اور [سبسکرائب شدہ فنکشن](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) چلاتا ہے۔ یہ فنکشن [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) کو کال کرتا ہے، جو بدلے میں [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) کو کال کرتا ہے۔

5. سب سے پہلے `createGame` [مناسب تعداد میں مائنز کے ساتھ ایک بے ترتیب نقشہ بناتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)۔ پھر، یہ [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) کو خالی بارڈرز کے ساتھ ایک نقشہ بنانے کے لیے کال کرتا ہے، جو Zokrates کے لیے ضروری ہے۔ آخر میں، `createGame` [`calculateMapHash`](#calculateMapHash) کو کال کرتا ہے، تاکہ نقشے کا ہیش حاصل کیا جا سکے، جسے گیم آئی ڈی کے طور پر استعمال کیا جاتا ہے۔

6. `newGame` فنکشن نئے گیم کو `gamesInProgress` میں شامل کرتا ہے۔

7. سرور جو آخری کام کرتا ہے وہ [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) کو کال کرنا ہے، جو آن چین ہے۔ یہ فنکشن ایک مختلف `System` میں ہے، [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)، تاکہ رسائی کنٹرول کو فعال کیا جا سکے۔ رسائی کنٹرول [MUD کنفیگریشن فائل](https://mud.dev/config) میں بیان کیا گیا ہے، [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72)۔

   رسائی کی فہرست صرف ایک ہی ایڈریس کو `System` کال کرنے کی اجازت دیتی ہے۔ یہ سرور فنکشنز تک رسائی کو ایک ہی ایڈریس تک محدود کرتا ہے، تاکہ کوئی بھی سرور کی نقالی نہ کر سکے۔

8. آن چین کمپونینٹ متعلقہ ٹیبلز کو اپ ڈیٹ کرتا ہے:

   - `PlayerGame` میں گیم بنائیں۔
   - `GamePlayer` میں الٹی میپنگ سیٹ کریں۔
   - `PendingGame` سے درخواست کو ہٹا دیں۔

9. سرور `PendingGame` میں تبدیلی کی نشاندہی کرتا ہے، لیکن کچھ نہیں کرتا کیونکہ [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) غلط ہے۔

10. کلائنٹ پر [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) کو کھلاڑی کے ایڈریس کے لیے `PlayerGame` انٹری پر سیٹ کیا جاتا ہے۔ جب `PlayerGame` تبدیل ہوتا ہے، تو `gameRecord` بھی تبدیل ہوتا ہے۔

11. اگر `gameRecord` میں کوئی ویلیو ہے، اور گیم جیتا یا ہارا نہیں گیا ہے، تو کلائنٹ [نقشہ دکھاتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)۔

#### کھدائی {#dig-flow}

1. کھلاڑی [نقشے کے سیل کے بٹن پر کلک کرتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188)، جو [`dig` فنکشن](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) کو کال کرتا ہے۔ یہ فنکشن [`dig` کو آن چین](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32) کال کرتا ہے۔

2. آن چین کمپونینٹ [کئی سینیٹی چیکس انجام دیتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30)، اور اگر کامیاب ہو جاتا ہے تو کھدائی کی درخواست کو [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) میں شامل کر دیتا ہے۔

3. سرور [`PendingDig` میں تبدیلی کا پتہ لگاتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)۔ [اگر یہ درست ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84)، تو یہ [زیرو نالج کوڈ کو کال کرتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (نیچے بیان کیا گیا ہے) تاکہ نتیجہ اور اس کے درست ہونے کا ثبوت دونوں پیدا کیا جا سکے۔

4. [سرور](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) آن چین [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) کو کال کرتا ہے۔

5. `digResponse` دو کام کرتا ہے۔ سب سے پہلے، یہ [زیرو نالج پروف](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) کو چیک کرتا ہے۔ پھر، اگر پروف چیک ہو جاتا ہے، تو یہ [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) کو کال کرتا ہے تاکہ نتیجے کو دراصل پروسیس کیا جا سکے۔

6. `processDigResult` چیک کرتا ہے کہ آیا گیم [ہار](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) گیا ہے یا [جیت](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) لیا گیا ہے، اور [`Map`، یعنی آن چین نقشے کو اپ ڈیٹ کرتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)۔

7. کلائنٹ خود بخود اپ ڈیٹس اٹھاتا ہے اور [کھلاڑی کو دکھائے گئے نقشے کو اپ ڈیٹ کرتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)، اور اگر قابل اطلاق ہو تو کھلاڑی کو بتاتا ہے کہ یہ جیت ہے یا ہار۔

## Zokrates کا استعمال {#using-zokrates}

اوپر بیان کیے گئے فلو میں ہم نے زیرو نالج حصوں کو نظر انداز کر دیا، انہیں ایک بلیک باکس کے طور پر سمجھا۔ اب آئیے اسے کھول کر دیکھتے ہیں کہ وہ کوڈ کیسے لکھا گیا ہے۔

### نقشے کی ہیشنگ {#hashing-map}

ہم [یہ جاوا اسکرپٹ کوڈ](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) [Poseidon](https://www.poseidon-hash.info) کو نافذ کرنے کے لیے استعمال کر سکتے ہیں، جو ہمارا استعمال کردہ Zokrates ہیش فنکشن ہے۔ تاہم، جبکہ یہ تیز ہوگا، یہ صرف Zokrates ہیش فنکشن کا استعمال کرنے سے زیادہ پیچیدہ بھی ہوگا۔ یہ ایک ٹیوٹوریل ہے، اور اس لیے کوڈ کو سادگی کے لیے بہتر بنایا گیا ہے، نہ کہ کارکردگی کے لیے۔ لہذا، ہمیں دو مختلف Zokrates پروگراموں کی ضرورت ہے، ایک صرف ایک نقشے (`hash`) کے ہیش کا حساب لگانے کے لیے اور دوسرا نقشے (`dig`) پر کسی مقام پر کھدائی کے نتیجے کا زیرو نالج پروف بنانے کے لیے۔

### ہیش فنکشن {#hash-function}

یہ وہ فنکشن ہے جو ایک نقشے کے ہیش کا حساب لگاتا ہے۔ ہم اس کوڈ کا لائن بہ لائن جائزہ لیں گے۔

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

یہ دو لائنیں [Zokrates اسٹینڈرڈ لائبریری](https://zokrates.github.io/toolbox/stdlib.html) سے دو فنکشن درآمد کرتی ہیں۔ [پہلا فنکشن](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) ایک [Poseidon ہیش](https://www.poseidon-hash.info/) ہے۔ یہ [`field` عناصر](https://zokrates.github.io/language/types.html#field) کی ایک صف لیتا ہے اور ایک `field` لوٹاتا ہے۔

Zokrates میں فیلڈ عنصر عام طور پر 256 بٹس سے کم لمبا ہوتا ہے، لیکن زیادہ نہیں۔ کوڈ کو آسان بنانے کے لیے، ہم نقشے کو 512 بٹس تک محدود کرتے ہیں، اور چار فیلڈز کی ایک صف کو ہیش کرتے ہیں، اور ہر فیلڈ میں ہم صرف 128 بٹس استعمال کرتے ہیں۔ [ `pack128` فنکشن](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) اس مقصد کے لیے 128 بٹس کی ایک صف کو `field` میں تبدیل کرتا ہے۔

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

یہ لائن ایک فنکشن کی تعریف شروع کرتی ہے۔ `hashMap` کو `map` نامی ایک ہی پیرامیٹر ملتا ہے، جو ایک دو جہتی `bool`(ean) صف ہے۔ نقشے کا سائز `width+2` ضرب `height+2` ہے ان وجوہات کی بنا پر جو [نیچے بیان کی گئی ہیں](#why-map-border)۔

ہم `${width+2}` اور `${height+2}` استعمال کر سکتے ہیں کیونکہ Zokrates پروگرام اس ایپلیکیشن میں [ٹیمپلیٹ اسٹرنگز](https://www.w3schools.com/js/js_string_templates.asp) کے طور پر محفوظ ہیں۔ `${` اور `}` کے درمیان کوڈ کا جاوا اسکرپٹ کے ذریعے جائزہ لیا جاتا ہے، اور اس طرح پروگرام کو مختلف نقشے کے سائز کے لیے استعمال کیا جا سکتا ہے۔ نقشہ پیرامیٹر میں اس کے چاروں طرف ایک مقام چوڑا بارڈر ہے جس میں کوئی بم نہیں ہے، یہی وجہ ہے کہ ہمیں چوڑائی اور اونچائی میں دو کا اضافہ کرنے کی ضرورت ہے۔

واپسی کی قیمت ایک `field` ہے جس میں ہیش ہوتا ہے۔

```
   bool[512] mut map1d = [false; 512];
```

نقشہ دو جہتی ہے۔ تاہم، `pack128` فنکشن دو جہتی صفوں کے ساتھ کام نہیں کرتا ہے۔ لہذا ہم پہلے نقشے کو 512 بائٹ کی صف میں ہموار کرتے ہیں، `map1d` کا استعمال کرتے ہوئے۔ ڈیفالٹ کے طور پر Zokrates متغیرات مستقل ہوتے ہیں، لیکن ہمیں اس صف کو ایک لوپ میں اقدار تفویض کرنے کی ضرورت ہے، لہذا ہم اسے [`mut`](https://zokrates.github.io/language/variables.html#mutability) کے طور پر بیان کرتے ہیں۔

ہمیں صف کو شروع کرنے کی ضرورت ہے کیونکہ Zokrates میں `undefined` نہیں ہے۔ تاثر `[false; 512]` کا مطلب ہے [512 `false` اقدار کی ایک صف](https://zokrates.github.io/language/types.html#declaration-and-initialization)۔

```
   u32 mut counter = 0;
```

ہمیں ان بٹس کے درمیان فرق کرنے کے لیے ایک کاؤنٹر کی بھی ضرورت ہے جو ہم نے `map1d` میں پہلے ہی بھر دیے ہیں اور جو نہیں بھرے۔

```
   for u32 x in 0..${width+2} {
```

یہ ہے کہ آپ Zokrates میں [`for` لوپ](https://zokrates.github.io/language/control_flow.html#for-loops) کا اعلان کیسے کرتے ہیں۔ ایک Zokrates `for` لوپ کی مقررہ حدود ہونی چاہئیں، کیونکہ جبکہ یہ ایک لوپ کی طرح لگتا ہے، کمپائلر دراصل اسے "کھول" دیتا ہے۔ تاثر `${width+2}` ایک کمپائل ٹائم مستقل ہے کیونکہ `width` ٹائپ اسکرپٹ کوڈ کے ذریعے کمپائلر کو کال کرنے سے پہلے سیٹ کیا جاتا ہے۔

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

نقشے میں ہر مقام کے لیے، اس قدر کو `map1d` صف میں ڈالیں اور کاؤنٹر میں اضافہ کریں۔

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` `map1d` سے چار `field` اقدار کی ایک صف بنانے کے لیے۔ Zokrates میں `array[a..b]` کا مطلب ہے صف کا وہ ٹکڑا جو `a` سے شروع ہوتا ہے اور `b-1` پر ختم ہوتا ہے۔

```
    return poseidon(hashMe);
}
```

اس صف کو ہیش میں تبدیل کرنے کے لیے `poseidon` کا استعمال کریں۔

### ہیش پروگرام {#hash-program}

سرور کو گیم شناخت کنندہ بنانے کے لیے براہ راست `hashMap` کو کال کرنے کی ضرورت ہے۔ تاہم، Zokrates صرف `main` فنکشن کو شروع کرنے کے لیے کال کر سکتا ہے، لہذا ہم ایک `main` کے ساتھ ایک پروگرام بناتے ہیں جو ہیش فنکشن کو کال کرتا ہے۔

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### کھدائی پروگرام {#dig-program}

یہ ایپلیکیشن کا زیرو نالج حصہ کا دل ہے، جہاں ہم وہ ثبوت تیار کرتے ہیں جو کھدائی کے نتائج کی تصدیق کے لیے استعمال ہوتے ہیں۔

```
${hashFragment}

// مقام (x,y) میں مائنز کی تعداد
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### نقشے کا بارڈر کیوں {#why-map-border}

زیرو نالج پروف [حسابی سرکٹس](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) کا استعمال کرتے ہیں، جن میں `if` اسٹیٹمنٹ کا کوئی آسان مساوی نہیں ہوتا ہے۔ اس کے بجائے، وہ [مشروط آپریٹر](https://en.wikipedia.org/wiki/Ternary_conditional_operator) کے مساوی کا استعمال کرتے ہیں۔ اگر `a` صفر یا ایک ہو سکتا ہے، تو آپ `if a { b } else { c }` کا حساب `ab+(1-a)c` کے طور پر کر سکتے ہیں۔

اس کی وجہ سے، ایک Zokrates `if` اسٹیٹمنٹ ہمیشہ دونوں شاخوں کا جائزہ لیتا ہے۔ مثال کے طور پر، اگر آپ کے پاس یہ کوڈ ہے:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

اس میں خرابی ہوگی، کیونکہ اسے `arr[10]` کا حساب لگانے کی ضرورت ہے، چاہے وہ قدر بعد میں صفر سے ضرب دی جائے۔

یہی وجہ ہے کہ ہمیں نقشے کے چاروں طرف ایک مقام چوڑا بارڈر کی ضرورت ہے۔ ہمیں کسی مقام کے ارد گرد مائنز کی کل تعداد کا حساب لگانے کی ضرورت ہے، اور اس کا مطلب ہے کہ ہمیں اس مقام سے ایک قطار اوپر اور نیچے، بائیں اور دائیں کو دیکھنے کی ضرورت ہے، جہاں ہم کھدائی کر رہے ہیں۔ جس کا مطلب ہے کہ وہ مقام Zokrates کو فراہم کردہ نقشے کی صف میں موجود ہونا چاہیے۔

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

ڈیفالٹ کے طور پر Zokrates ثبوتوں میں ان کے ان پٹ شامل ہوتے ہیں۔ یہ جاننا کوئی فائدہ مند نہیں ہے کہ کسی جگہ کے ارد گرد پانچ مائنز ہیں جب تک کہ آپ کو حقیقت میں یہ نہ معلوم ہو کہ وہ کون سی جگہ ہے (اور آپ اسے صرف اپنی درخواست سے نہیں ملا سکتے، کیونکہ تب پروور مختلف اقدار کا استعمال کر سکتا ہے اور آپ کو اس کے بارے میں نہیں بتا سکتا)۔ تاہم، ہمیں نقشے کو خفیہ رکھنے کی ضرورت ہے، جبکہ اسے Zokrates کو فراہم کرتے ہوئے۔ حل یہ ہے کہ ایک `private` پیرامیٹر کا استعمال کیا جائے، ایک ایسا جو ثبوت سے _ظاہر_ نہیں ہوتا ہے۔

اس سے غلط استعمال کا ایک اور راستہ کھلتا ہے۔ پروور صحیح کوآرڈینیٹس کا استعمال کر سکتا ہے، لیکن مقام کے ارد گرد کسی بھی تعداد میں مائنز کے ساتھ ایک نقشہ بنا سکتا ہے، اور ممکنہ طور پر خود مقام پر بھی۔ اس غلط استعمال کو روکنے کے لیے، ہم زیرو نالج پروف کو نقشے کا ہیش شامل کرتے ہیں، جو گیم شناخت کنندہ ہے۔

```
   return (hashMap(map),
```

یہاں واپسی کی قیمت ایک ٹوپل ہے جس میں نقشہ ہیش صف اور کھدائی کا نتیجہ شامل ہے۔

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

اگر خود مقام پر کوئی بم ہو تو ہم 255 کو ایک خاص قدر کے طور پر استعمال کرتے ہیں۔

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

اگر کھلاڑی نے کسی مائن کو نہیں مارا ہے، تو مقام کے ارد گرد کے علاقے کے لیے مائن کاؤنٹ شامل کریں اور اسے واپس کریں۔

### TypeScript سے Zokrates کا استعمال {#using-zokrates-from-typescript}

Zokrates کا ایک کمانڈ لائن انٹرفیس ہے، لیکن اس پروگرام میں ہم اسے [TypeScript کوڈ](https://zokrates.github.io/toolbox/zokrates_js.html) میں استعمال کرتے ہیں۔

Zokrates تعریفوں پر مشتمل لائبریری کو [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) کہا جاتا ہے۔

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates جاوا اسکرپٹ بائنڈنگز](https://zokrates.github.io/toolbox/zokrates_js.html) کو درآمد کریں۔ ہمیں صرف [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) فنکشن کی ضرورت ہے کیونکہ یہ ایک وعدہ لوٹاتا ہے جو تمام Zokrates تعریفوں کو حل کرتا ہے۔

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates کی طرح، ہم بھی صرف ایک فنکشن برآمد کرتے ہیں، جو [غیر ہم آہنگ](https://www.w3schools.com/js/js_async.asp) بھی ہے۔ جب یہ بالآخر واپس آتا ہے، تو یہ کئی فنکشن فراہم کرتا ہے جیسا کہ ہم نیچے دیکھیں گے۔

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates کو شروع کریں، لائبریری سے ہمیں ہر چیز حاصل کریں۔

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

اگلا ہمارے پاس ہیش فنکشن اور دو Zokrates پروگرام ہیں جو ہم نے اوپر دیکھے۔

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

یہاں ہم ان پروگراموں کو کمپائل کرتے ہیں۔

```typescript
// زیرو نالج تصدیق کے لیے کیز بنائیں۔
// ایک پروڈکشن سسٹم پر آپ ایک سیٹ اپ تقریب کا استعمال کرنا چاہیں گے۔
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

ایک پروڈکشن سسٹم پر ہم ایک زیادہ پیچیدہ [سیٹ اپ تقریب](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) کا استعمال کر سکتے ہیں، لیکن یہ ایک مظاہرے کے لیے کافی ہے۔ یہ کوئی مسئلہ نہیں ہے کہ صارفین پروور کی جان سکتے ہیں - وہ پھر بھی اسے چیزوں کو ثابت کرنے کے لیے استعمال نہیں کر سکتے جب تک کہ وہ سچ نہ ہوں۔ کیونکہ ہم اینٹروپی کی وضاحت کرتے ہیں (دوسرا پیرامیٹر، `""`)، نتائج ہمیشہ ایک جیسے ہی ہوں گے۔

**نوٹ:** Zokrates پروگراموں کی تالیف اور کلید کی تخلیق سست عمل ہیں۔ انہیں ہر بار دہرانے کی ضرورت نہیں ہے، صرف اس وقت جب نقشے کا سائز تبدیل ہوتا ہے۔ ایک پروڈکشن سسٹم پر آپ انہیں ایک بار کریں گے، اور پھر آؤٹ پٹ کو اسٹور کریں گے۔ میں یہاں صرف سادگی کی خاطر ایسا نہیں کر رہا ہوں۔

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) فنکشن دراصل Zokrates پروگرام چلاتا ہے۔ یہ دو فیلڈز کے ساتھ ایک ڈھانچہ لوٹاتا ہے: `output`، جو ایک JSON سٹرنگ کے طور پر پروگرام کا آؤٹ پٹ ہے، اور `witness`، جو نتیجے کا زیرو نالج پروف بنانے کے لیے درکار معلومات ہے۔ یہاں ہمیں صرف آؤٹ پٹ کی ضرورت ہے۔

آؤٹ پٹ `"31337"` کی شکل میں ایک سٹرنگ ہے، جو کوٹیشن مارکس میں بند ایک اعشاریہ نمبر ہے۔ لیکن `viem` کے لیے ہمیں جو آؤٹ پٹ چاہیے وہ `0x60A7` کی شکل میں ایک ہیکساڈیسیمل نمبر ہے۔ لہذا ہم کوٹیشن مارکس کو ہٹانے کے لیے `.slice(1,-1)` کا استعمال کرتے ہیں اور پھر باقی سٹرنگ کو، جو ایک اعشاریہ نمبر ہے، ایک [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) میں تبدیل کرنے کے لیے `BigInt` کا استعمال کرتے ہیں۔ `.toString(16)` اس `BigInt` کو ایک ہیکساڈیسیمل سٹرنگ میں تبدیل کرتا ہے، اور `"0x"+` ہیکساڈیسیمل نمبروں کے لیے مارکر شامل کرتا ہے۔

```typescript
// کھودیں اور نتیجے کا زیرو نالج پروف لوٹائیں
// (سرور سائیڈ کوڈ)
```

زیرو نالج پروف میں عوامی ان پٹس (`x` اور `y`) اور نتائج (نقشے کا ہیش اور بموں کی تعداد) شامل ہیں۔

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("نقشے سے باہر کھدائی کی کوشش کی جا رہی ہے")
```

یہ چیک کرنا کہ آیا کوئی انڈیکس Zokrates میں حد سے باہر ہے، ایک مسئلہ ہے، لہذا ہم اسے یہاں کرتے ہیں۔

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

کھدائی پروگرام پر عمل کریں۔

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) کا استعمال کریں اور ثبوت واپس کریں۔

```typescript
const solidityVerifier = `
        // نقشے کا سائز: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

ایک Solidity ویریفائر، ایک سمارٹ کنٹریکٹ جسے ہم بلاک چین پر تعینات کر سکتے ہیں اور `digCompiled.program` کے ذریعے تیار کردہ ثبوتوں کی تصدیق کے لیے استعمال کر سکتے ہیں۔

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

آخر میں، ہر وہ چیز واپس کریں جس کی دوسرے کوڈ کو ضرورت ہو سکتی ہے۔

## سیکیورٹی ٹیسٹ {#security-tests}

سیکیورٹی ٹیسٹ اہم ہیں کیونکہ ایک فنکشنلٹی بگ بالآخر خود کو ظاہر کر دے گا۔ لیکن اگر ایپلیکیشن غیر محفوظ ہے، تو یہ ممکنہ طور پر ایک طویل عرصے تک چھپی رہے گی اس سے پہلے کہ یہ کسی کے دھوکہ دہی اور دوسروں سے تعلق رکھنے والے وسائل سے بچ نکلنے سے ظاہر ہو۔

### اجازتیں {#permissions}

اس گیم میں ایک مراعات یافتہ ادارہ ہے، سرور۔ یہ واحد صارف ہے جسے [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) میں فنکشنز کو کال کرنے کی اجازت ہے۔ ہم [`cast`](https://book.getfoundry.sh/cast/) کا استعمال کر سکتے ہیں تاکہ یہ تصدیق کی جا سکے کہ اجازت یافتہ فنکشنز کی کالز صرف سرور اکاؤنٹ کے طور پر ہی کی جا سکتی ہیں۔

[سرور کی نجی کلید `setupNetwork.ts` میں ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)۔

1. `anvil` (بلاک چین) چلانے والے کمپیوٹر پر، یہ ماحولیاتی متغیرات سیٹ کریں۔

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. `cast` کا استعمال کریں تاکہ تصدیق کنندہ کا پتہ ایک غیر مجاز پتے کے طور پر سیٹ کرنے کی کوشش کی جا سکے۔

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   نہ صرف `cast` ایک ناکامی کی اطلاع دیتا ہے، بلکہ آپ براؤزر پر گیم میں **MUD Dev Tools** کھول سکتے ہیں، **ٹیبلز** پر کلک کر سکتے ہیں، اور **app\_\_VerifierAddress** کو منتخب کر سکتے ہیں۔ دیکھیں کہ پتہ صفر نہیں ہے۔

3. ویریفائر ایڈریس کو سرور کے ایڈریس کے طور پر سیٹ کریں۔

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** میں پتہ اب صفر ہونا چاہیے۔

ایک ہی `System` میں تمام MUD فنکشنز ایک ہی ایکسیس کنٹرول سے گزرتے ہیں، لہذا میں اس ٹیسٹ کو کافی سمجھتا ہوں۔ اگر آپ نہیں کرتے ہیں، تو آپ [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) میں دیگر فنکشنز کو چیک کر سکتے ہیں۔

### زیرو نالج کے غلط استعمال {#zero-knowledge-abuses}

Zokrates کی تصدیق کے لیے ریاضی اس ٹیوٹوریل (اور میری صلاحیتوں) کے دائرہ سے باہر ہے۔ تاہم، ہم زیرو نالج کوڈ پر مختلف چیک چلا سکتے ہیں تاکہ یہ تصدیق کی جا سکے کہ اگر اسے صحیح طریقے سے نہیں کیا گیا تو یہ ناکام ہو جاتا ہے۔ ان تمام ٹیسٹوں کے لیے ہمیں [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) کو تبدیل کرنے اور پوری ایپلیکیشن کو دوبارہ شروع کرنے کی ضرورت ہوگی۔ سرور پروسیس کو دوبارہ شروع کرنا کافی نہیں ہے، کیونکہ یہ ایپلیکیشن کو ایک ناممکن حالت میں ڈال دیتا ہے (کھلاڑی کا ایک گیم جاری ہے، لیکن گیم اب سرور کے لیے دستیاب نہیں ہے)۔

#### غلط جواب {#wrong-answer}

سب سے آسان امکان زیرو نالج پروف میں غلط جواب فراہم کرنا ہے۔ ایسا کرنے کے لیے، ہم `zkDig` کے اندر جاتے ہیں اور [لائن 91 میں ترمیم کرتے ہیں](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

اس کا مطلب ہے کہ ہم ہمیشہ دعویٰ کریں گے کہ ایک بم ہے، چاہے صحیح جواب کچھ بھی ہو۔ اس ورژن کے ساتھ کھیلنے کی کوشش کریں، اور آپ `pnpm dev` اسکرین کے **سرور** ٹیب میں یہ خرابی دیکھیں گے:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
00000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

تو اس قسم کی دھوکہ دہی ناکام ہو جاتی ہے۔

#### غلط ثبوت {#wrong-proof}

کیا ہوتا ہے اگر ہم صحیح معلومات فراہم کریں، لیکن ثبوت کا ڈیٹا غلط ہو؟ اب، لائن 91 کو اس سے بدل دیں:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

یہ اب بھی ناکام رہتا ہے، لیکن اب یہ بغیر کسی وجہ کے ناکام ہوجاتا ہے کیونکہ یہ ویریفائر کال کے دوران ہوتا ہے۔

### ایک صارف زیرو ٹرسٹ کوڈ کی تصدیق کیسے کر سکتا ہے؟ {#user-verify-zero-trust}

اسمارٹ معاہدوں کی تصدیق کرنا نسبتاً آسان ہے۔ عام طور پر، ڈیولپر سورس کوڈ کو ایک بلاک ایکسپلورر پر شائع کرتا ہے، اور بلاک ایکسپلورر اس بات کی تصدیق کرتا ہے کہ سورس کوڈ [معاہدے کی تعیناتی کے لین دین](/developers/docs/smart-contracts/deploying/) میں کوڈ کو کمپائل کرتا ہے۔ MUD `System`s کے معاملے میں یہ [تھوڑا زیادہ پیچیدہ](https://mud.dev/cli/verify) ہے، لیکن زیادہ نہیں۔

یہ زیرو نالج کے ساتھ زیادہ مشکل ہے۔ ویریفائر میں کچھ مستقل شامل ہوتے ہیں اور ان پر کچھ حسابات چلاتے ہیں۔ یہ آپ کو نہیں بتاتا کہ کیا ثابت کیا جا رہا ہے۔

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

حل، کم از کم جب تک بلاک ایکسپلوررز اپنے صارف انٹرفیس میں Zokrates کی تصدیق شامل نہیں کر لیتے، یہ ہے کہ ایپلیکیشن ڈیولپرز Zokrates پروگراموں کو دستیاب کرائیں، اور کم از کم کچھ صارفین انہیں مناسب تصدیقی کلید کے ساتھ خود کمپائل کریں۔

ایسا کرنے کے لیے:

1. [Zokrates انسٹال کریں](https://zokrates.github.io/gettingstarted.html)۔

2. ایک فائل بنائیں، `dig.zok`، Zokrates پروگرام کے ساتھ۔ نیچے دیا گیا کوڈ یہ فرض کرتا ہے کہ آپ نے اصل نقشے کا سائز، 10x5، رکھا ہے۔

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // The number of mines in location (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Zokrates کوڈ کو کمپائل کریں اور تصدیقی کلید بنائیں۔ تصدیقی کلید اسی اینٹروپی کے ساتھ بنانی ہوگی جو اصل سرور میں استعمال کی گئی تھی، [اس معاملے میں ایک خالی سٹرنگ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)۔

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. اپنا Solidity ویریفائر خود بنائیں، اور تصدیق کریں کہ یہ بلاک چین پر موجود ویریفائر سے فنکشنل طور پر یکساں ہے (سرور ایک تبصرہ شامل کرتا ہے، لیکن یہ اہم نہیں ہے)۔

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## ڈیزائن کے فیصلے {#design}

کسی بھی کافی پیچیدہ ایپلیکیشن میں مسابقتی ڈیزائن کے اہداف ہوتے ہیں جن کے لیے سمجھوتہ کی ضرورت ہوتی ہے۔ آئیے کچھ سمجھوتوں کو دیکھتے ہیں اور یہ کہ موجودہ حل دوسرے اختیارات سے کیوں بہتر ہے۔

### زیرو نالج کیوں {#why-zero-knowledge}

مائن سویپر کے لیے آپ کو حقیقت میں زیرو نالج کی ضرورت نہیں ہے۔ سرور ہمیشہ نقشہ رکھ سکتا ہے، اور پھر گیم ختم ہونے پر اس سب کو ظاہر کر سکتا ہے۔ پھر، گیم کے اختتام پر، سمارٹ کنٹریکٹ نقشے کے ہیش کا حساب لگا سکتا ہے، تصدیق کر سکتا ہے کہ یہ میل کھاتا ہے، اور اگر ایسا نہیں ہوتا ہے تو سرور کو سزا دے سکتا ہے یا گیم کو مکمل طور پر نظر انداز کر سکتا ہے۔

میں نے یہ آسان حل استعمال نہیں کیا کیونکہ یہ صرف اچھی طرح سے متعین اختتامی حالت والے مختصر گیمز کے لیے کام کرتا ہے۔ جب ایک گیم ممکنہ طور پر لامحدود ہو (جیسے کہ [خود مختار دنیاؤں](https://0xparc.org/blog/autonomous-worlds) کے معاملے میں)، آپ کو ایک ایسے حل کی ضرورت ہے جو حالت کو _ظاہر کیے بغیر_ ثابت کرے۔

ایک ٹیوٹوریل کے طور پر اس مضمون کو ایک مختصر گیم کی ضرورت تھی جو سمجھنے میں آسان ہو، لیکن یہ تکنیک طویل گیمز کے لیے سب سے زیادہ مفید ہے۔

### Zokrates کیوں؟ {#why-zokrates}

[Zokrates](https://zokrates.github.io/) واحد زیرو نالج لائبریری دستیاب نہیں ہے، لیکن یہ ایک عام، [امپیریٹو](https://en.wikipedia.org/wiki/Imperative_programming) پروگرامنگ زبان کی طرح ہے اور بولین متغیرات کو سپورٹ کرتی ہے۔

آپ کی ایپلیکیشن کے لیے، مختلف ضروریات کے ساتھ، آپ [Circum](https://docs.circom.io/getting-started/installation/) یا [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) کا استعمال کرنا پسند کر سکتے ہیں۔

### Zokrates کو کب کمپائل کریں {#when-compile-zokrates}

اس پروگرام میں ہم Zokrates پروگراموں کو [ہر بار سرور شروع ہونے پر](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) کمپائل کرتے ہیں۔ یہ واضح طور پر وسائل کا ضیاع ہے، لیکن یہ ایک ٹیوٹوریل ہے، جو سادگی کے لیے بہتر بنایا گیا ہے۔

اگر میں پروڈکشن لیول کی ایپلیکیشن لکھ رہا ہوتا، تو میں چیک کرتا کہ آیا میرے پاس اس مائن فیلڈ سائز پر کمپائل شدہ Zokrates پروگراموں کے ساتھ ایک فائل ہے، اور اگر ایسا ہے تو اسے استعمال کرتا۔ یہی بات آن چین پر ویریفائر کنٹریکٹ کی تعیناتی پر بھی لاگو ہوتی ہے۔

### ویریفائر اور پروور کیز بنانا {#key-creation}

[کلید کی تخلیق](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) ایک اور خالص حساب ہے جسے ایک دیے گئے مائن فیلڈ سائز کے لیے ایک سے زیادہ بار کرنے کی ضرورت نہیں ہے۔ ایک بار پھر، یہ صرف سادگی کی خاطر ایک بار کیا جاتا ہے۔

مزید برآں، ہم [ایک سیٹ اپ تقریب](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) کا استعمال کر سکتے ہیں۔ ایک سیٹ اپ تقریب کا فائدہ یہ ہے کہ آپ کو زیرو نالج پروف پر دھوکہ دینے کے لیے یا تو اینٹروپی یا ہر شریک سے کچھ درمیانی نتیجہ کی ضرورت ہوتی ہے۔ اگر کم از کم ایک تقریب کا شریک ایماندار ہے اور اس معلومات کو حذف کر دیتا ہے، تو زیرو نالج پروف کچھ حملوں سے محفوظ ہیں۔ تاہم، یہ تصدیق کرنے کا _کوئی میکانزم_ نہیں ہے کہ معلومات کو ہر جگہ سے حذف کر دیا گیا ہے۔ اگر زیرو نالج پروف انتہائی اہم ہیں، تو آپ سیٹ اپ تقریب میں حصہ لینا چاہتے ہیں۔

یہاں ہم [پرپیچوئل پاورز آف ٹاؤ](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) پر انحصار کرتے ہیں، جس میں درجنوں شرکاء تھے۔ یہ شاید کافی محفوظ ہے، اور بہت آسان ہے۔ ہم کلید کی تخلیق کے دوران اینٹروپی بھی شامل نہیں کرتے ہیں، جس سے صارفین کے لیے [زیرو نالج کنفیگریشن کی تصدیق کرنا](#user-verify-zero-trust) آسان ہو جاتا ہے۔

### کہاں تصدیق کریں {#where-verification}

ہم زیرو نالج پروف کو یا تو آن چین (جس پر گیس خرچ ہوتی ہے) یا کلائنٹ میں ( [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) کا استعمال کرتے ہوئے) تصدیق کر سکتے ہیں۔ میں نے پہلا انتخاب کیا، کیونکہ یہ آپ کو [ویریفائر کی تصدیق کرنے](#user-verify-zero-trust) کی اجازت دیتا ہے اور پھر اس بات پر بھروسہ کرتا ہے کہ جب تک اس کے لیے کنٹریکٹ کا پتہ وہی رہتا ہے، اس میں کوئی تبدیلی نہیں آتی ہے۔ اگر کلائنٹ پر تصدیق کی جاتی، تو آپ کو ہر بار کلائنٹ ڈاؤن لوڈ کرنے پر موصول ہونے والے کوڈ کی تصدیق کرنی پڑتی۔

نیز، جبکہ یہ گیم سنگل پلیئر ہے، بہت سے بلاک چین گیمز ملٹی پلیئر ہیں۔ آن چین تصدیق کا مطلب ہے کہ آپ صرف ایک بار زیرو نالج پروف کی تصدیق کرتے ہیں۔ اسے کلائنٹ میں کرنے کے لیے ہر کلائنٹ کو آزادانہ طور پر تصدیق کرنے کی ضرورت ہوگی۔

### نقشے کو TypeScript یا Zokrates میں فلیٹ کریں؟ {#where-flatten}

عام طور پر، جب پروسیسنگ یا تو TypeScript یا Zokrates میں کی جا سکتی ہے، تو اسے TypeScript میں کرنا بہتر ہے، جو بہت تیز ہے، اور زیرو نالج پروف کی ضرورت نہیں ہے۔ یہی وجہ ہے، مثال کے طور پر، کہ ہم Zokrates کو ہیش فراہم نہیں کرتے ہیں اور اسے یہ تصدیق کرنے کے لیے کہتے ہیں کہ یہ درست ہے۔ ہیشنگ کو Zokrates کے اندر کرنا پڑتا ہے، لیکن واپس کیے گئے ہیش اور آن چین ہیش کے درمیان مماثلت اس کے باہر ہو سکتی ہے۔

تاہم، ہم اب بھی [Zokrates میں نقشے کو فلیٹ کرتے ہیں](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20)، جبکہ ہم اسے TypeScript میں کر سکتے تھے۔ وجہ یہ ہے کہ دوسرے اختیارات، میری رائے میں، بدتر ہیں۔

- Zokrates کوڈ کو بولین کی ایک جہتی صف فراہم کریں، اور دو جہتی نقشہ حاصل کرنے کے لیے `x*(height+2)
  +y` جیسے تاثر کا استعمال کریں۔ یہ [کوڈ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) کو قدرے زیادہ پیچیدہ بنا دے گا، لہذا میں نے فیصلہ کیا کہ کارکردگی کا فائدہ ایک ٹیوٹوریل کے لیے اس کے قابل نہیں ہے۔

- Zokrates کو ایک جہتی صف اور دو جہتی صف دونوں بھیجیں۔ تاہم، اس حل سے ہمیں کچھ حاصل نہیں ہوتا۔ Zokrates کوڈ کو یہ تصدیق کرنی ہوگی کہ اسے فراہم کردہ ایک جہتی صف واقعی دو جہتی صف کی صحیح نمائندگی ہے۔ تو کارکردگی میں کوئی فائدہ نہیں ہوگا۔

- Zokrates میں دو جہتی صف کو فلیٹ کریں۔ یہ سب سے آسان آپشن ہے، لہذا میں نے اسے منتخب کیا۔

### نقشوں کو کہاں اسٹور کریں {#where-store-maps}

اس ایپلیکیشن میں [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) صرف میموری میں ایک متغیر ہے۔ اس کا مطلب ہے کہ اگر آپ کا سرور مر جاتا ہے اور اسے دوبارہ شروع کرنے کی ضرورت ہے، تو اس میں محفوظ تمام معلومات ضائع ہو جاتی ہیں۔ نہ صرف کھلاڑی اپنا کھیل جاری رکھنے سے قاصر ہیں، بلکہ وہ نیا کھیل بھی شروع نہیں کر سکتے کیونکہ آن چین جزو سوچتا ہے کہ ان کا ابھی بھی ایک کھیل جاری ہے۔

یہ واضح طور پر ایک پروڈکشن سسٹم کے لیے خراب ڈیزائن ہے، جس میں آپ اس معلومات کو ایک ڈیٹا بیس میں محفوظ کریں گے۔ میں نے یہاں ایک متغیر کا استعمال صرف اس لیے کیا کیونکہ یہ ایک ٹیوٹوریل ہے اور سادگی سب سے اہم غور ہے۔

## نتیجہ: کن حالات میں یہ مناسب تکنیک ہے؟ {#conclusion}

تو، اب آپ جانتے ہیں کہ ایک سرور کے ساتھ ایک گیم کیسے لکھنا ہے جو خفیہ حالت کو اسٹور کرتا ہے جو آن چین سے تعلق نہیں رکھتا۔ لیکن کن معاملات میں آپ کو ایسا کرنا چاہیے؟ دو اہم غور ہیں۔

- _طویل چلنے والا کھیل_: [جیسا کہ اوپر ذکر کیا گیا ہے](#why-zero-knowledge)، ایک مختصر کھیل میں آپ صرف کھیل ختم ہونے کے بعد حالت کو شائع کر سکتے ہیں اور پھر ہر چیز کی تصدیق کروا سکتے ہیں۔ لیکن یہ ایک آپشن نہیں ہے جب کھیل میں لمبا یا غیر معینہ وقت لگتا ہے، اور حالت کو خفیہ رکھنے کی ضرورت ہے۔

- _کچھ مرکزیت قابل قبول_: زیرو نالج پروف سالمیت کی تصدیق کر سکتے ہیں، کہ کوئی ادارہ نتائج کو جعلی نہیں بنا رہا ہے۔ جو وہ نہیں کر سکتے وہ یہ یقینی بنانا ہے کہ ادارہ اب بھی دستیاب ہوگا اور پیغامات کا جواب دے گا۔ ان حالات میں جہاں دستیابی کو بھی غیر مرکزی کرنے کی ضرورت ہے، زیرو نالج پروف ایک کافی حل نہیں ہیں، اور آپ کو [ملٹی پارٹی کمپیوٹیشن](https://en.wikipedia.org/wiki/Secure_multi-party_computation) کی ضرورت ہے۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔

### اعترافات {#acknowledgements}

- الوارو الونسو نے اس مضمون کا ایک مسودہ پڑھا اور Zokrates کے بارے میں میری کچھ غلط فہمیوں کو دور کیا۔

کوئی بھی باقی غلطیاں میری ذمہ داری ہیں۔
