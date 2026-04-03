---
title: "خفیہ اسٹیٹ کے لیے زیرو-نالج کا استعمال"
description: "آن چین گیمز محدود ہیں کیونکہ وہ کوئی بھی پوشیدہ معلومات نہیں رکھ سکتیں۔ اس ٹیوٹوریل کو پڑھنے کے بعد، قاری زیرو-نالج پروفز اور سرور کے اجزاء کو ملا کر ایک خفیہ اسٹیٹ، آف چین، جزو کے ساتھ قابل تصدیق گیمز بنانے کے قابل ہو جائے گا۔ ایسا کرنے کی تکنیک کو مائن سویپر گیم بنا کر دکھایا جائے گا۔"
author: "اوری پومرانٹز"
tags: ["سرور", "آف چین", "مرکزی", "زیرو-نالج", "zokrates", "mud", "پرائیویسی"]
skill: advanced
breadcrumb: "ZK خفیہ اسٹیٹ"
lang: ur
published: 2025-03-15
---

_بلاک چین پر کوئی راز نہیں ہوتے_۔ بلاک چین پر پوسٹ کی گئی ہر چیز ہر کسی کے پڑھنے کے لیے کھلی ہوتی ہے۔ یہ ضروری ہے، کیونکہ بلاک چین کی بنیاد اس بات پر ہے کہ کوئی بھی اس کی تصدیق کر سکے۔ تاہم، گیمز اکثر خفیہ اسٹیٹ پر انحصار کرتی ہیں۔ مثال کے طور پر، [minesweeper](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) گیم کا بالکل کوئی مطلب نہیں بنتا اگر آپ صرف بلاک چین ایکسپلورر پر جا کر نقشہ دیکھ سکیں۔

سب سے آسان حل یہ ہے کہ خفیہ اسٹیٹ کو رکھنے کے لیے ایک [سرور جزو](/developers/tutorials/server-components/) کا استعمال کیا جائے۔ تاہم، ہم بلاک چین کا استعمال اس لیے کرتے ہیں تاکہ گیم ڈیولپر کی طرف سے دھوکہ دہی کو روکا جا سکے۔ ہمیں سرور کے جزو کی ایمانداری کو یقینی بنانے کی ضرورت ہے۔ سرور اسٹیٹ کا ہیش فراہم کر سکتا ہے، اور [زیرو-نالج پروفز](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) کا استعمال کر کے یہ ثابت کر سکتا ہے کہ کسی اقدام کے نتیجے کا حساب لگانے کے لیے استعمال ہونے والی اسٹیٹ درست ہے۔

اس مضمون کو پڑھنے کے بعد آپ جان جائیں گے کہ اس قسم کا خفیہ اسٹیٹ رکھنے والا سرور، اسٹیٹ دکھانے کے لیے ایک کلائنٹ، اور ان دونوں کے درمیان رابطے کے لیے ایک آن چین جزو کیسے بنایا جائے۔ ہم جو اہم ٹولز استعمال کریں گے وہ یہ ہوں گے:

| ٹول                                           | مقصد                                                    | تصدیق شدہ ورژن |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | زیرو-نالج پروفز اور ان کی تصدیق                         |               1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | سرور اور کلائنٹ دونوں کے لیے پروگرامنگ زبان             |               5.4.2 |
| [Node](https://nodejs.org/en)                 | سرور چلانا                                              |             20.18.2 |
| [Viem](https://viem.sh/)                      | بلاک چین کے ساتھ رابطہ                                  |              2.9.20 |
| [MUD](https://mud.dev/)                       | آن چین ڈیٹا مینجمنٹ                                     |              2.0.12 |
| [React](https://react.dev/)                   | کلائنٹ یوزر انٹرفیس                                     |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | کلائنٹ کوڈ پیش کرنا                                     |               4.2.1 |

## مائن سویپر کی مثال {#minesweeper}

[Minesweeper](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) ایک ایسی گیم ہے جس میں مائن فیلڈ کے ساتھ ایک خفیہ نقشہ شامل ہوتا ہے۔ کھلاڑی کسی مخصوص جگہ پر کھدائی کرنے کا انتخاب کرتا ہے۔ اگر اس جگہ پر کوئی مائن (بارودی سرنگ) ہو، تو گیم ختم ہو جاتی ہے۔ بصورت دیگر، کھلاڑی کو اس جگہ کے ارد گرد آٹھ چوکور خانوں میں موجود مائنز کی تعداد مل جاتی ہے۔

یہ ایپلیکیشن [MUD](https://mud.dev/) کا استعمال کرتے ہوئے لکھی گئی ہے، جو ایک ایسا فریم ورک ہے جو ہمیں [کی-ویلیو ڈیٹا بیس](https://aws.amazon.com/nosql/key-value/) کا استعمال کرتے ہوئے آن چین ڈیٹا اسٹور کرنے اور اس ڈیٹا کو آف چین اجزاء کے ساتھ خود بخود ہم آہنگ کرنے کی سہولت دیتا ہے۔ ہم آہنگی کے علاوہ، MUD رسائی کنٹرول فراہم کرنا آسان بناتا ہے، اور دوسرے صارفین کے لیے ہماری ایپلیکیشن کو بغیر اجازت کے [توسیع](https://mud.dev/guides/extending-a-world) دینا آسان بناتا ہے۔

### مائن سویپر کی مثال چلانا {#running-minesweeper-example}

مائن سویپر کی مثال چلانے کے لیے:

1. یقینی بنائیں کہ آپ نے [ضروریات انسٹال کر لی ہیں](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites)، [Foundry](https://book.getfoundry.sh/getting-started/installation)، [`git`](https://git-scm.com/downloads)، [`pnpm`](https://git-scm.com/downloads)، اور [`mprocs`](https://github.com/pvolok/mprocs)۔

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

   اگر Foundry کو `pnpm install` کے حصے کے طور پر انسٹال کیا گیا تھا، تو آپ کو کمانڈ لائن شیل کو دوبارہ شروع کرنے کی ضرورت ہے۔

4. کنٹریکٹس کو مرتب (کمپائل) کریں

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. پروگرام شروع کریں (بشمول ایک [anvil](https://book.getfoundry.sh/anvil/) بلاک چین) اور انتظار کریں۔

   ```sh copy
   mprocs
   ```

   نوٹ کریں کہ اسٹارٹ اپ میں کافی وقت لگتا ہے۔ پیش رفت دیکھنے کے لیے، پہلے نیچے والے تیر کا استعمال کرتے ہوئے _contracts_ ٹیب پر اسکرول کریں تاکہ MUD کنٹریکٹس کو تعینات ہوتے ہوئے دیکھ سکیں۔ جب آپ کو _Waiting for file changes…_ کا پیغام ملے، تو کنٹریکٹس تعینات ہو چکے ہیں اور مزید پیش رفت _server_ ٹیب میں ہوگی۔ وہاں، آپ اس وقت تک انتظار کریں جب تک کہ آپ کو _Verifier address: 0x...._ کا پیغام نہ مل جائے۔

   اگر یہ مرحلہ کامیاب ہو جاتا ہے، تو آپ کو `mprocs` اسکرین نظر آئے گی، جس کے بائیں جانب مختلف پروسیسز اور دائیں جانب فی الحال منتخب کردہ پروسیس کا کنسول آؤٹ پٹ ہوگا۔

   ![The mprocs screen](./mprocs.png)

   اگر `mprocs` کے ساتھ کوئی مسئلہ ہے، تو آپ چاروں پروسیسز کو دستی طور پر چلا سکتے ہیں، ہر ایک کو اس کی اپنی کمانڈ لائن ونڈو میں:

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

6. اب آپ [کلائنٹ](http://localhost:3000) پر براؤز کر سکتے ہیں، **New Game** پر کلک کریں، اور کھیلنا شروع کریں۔

### ٹیبلز {#tables}

ہمیں آن چین [کئی ٹیبلز](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) کی ضرورت ہے۔

- `Configuration`: یہ ٹیبل ایک سنگلٹن ہے، اس کی کوئی کلید نہیں ہے اور اس میں ایک ہی ریکارڈ ہے۔ یہ گیم کنفیگریشن کی معلومات رکھنے کے لیے استعمال ہوتا ہے:
  - `height`: مائن فیلڈ کی اونچائی
  - `width`: مائن فیلڈ کی چوڑائی
  - `numberOfBombs`: ہر مائن فیلڈ میں بموں کی تعداد
- `VerifierAddress`: یہ ٹیبل بھی ایک سنگلٹن ہے۔ یہ کنفیگریشن کا ایک حصہ، تصدیق کنندہ کنٹریکٹ (`verifier`) کا ایڈریس رکھنے کے لیے استعمال ہوتا ہے۔ ہم یہ معلومات `Configuration` ٹیبل میں رکھ سکتے تھے، لیکن یہ ایک مختلف جزو، سرور کے ذریعے سیٹ کی جاتی ہے، اس لیے اسے الگ ٹیبل میں رکھنا آسان ہے۔

- `PlayerGame`: کلید کھلاڑی کا ایڈریس ہے۔ ڈیٹا یہ ہے:

  - `gameId`: 32-بائٹ ویلیو جو اس نقشے کا ہیش ہے جس پر کھلاڑی کھیل رہا ہے (گیم شناخت کنندہ)۔
  - `win`: ایک بولین جو بتاتا ہے کہ آیا کھلاڑی نے گیم جیت لی ہے۔
  - `lose`: ایک بولین جو بتاتا ہے کہ آیا کھلاڑی گیم ہار گیا ہے۔
  - `digNumber`: گیم میں کامیاب کھدائیوں کی تعداد۔

- `GamePlayer`: یہ ٹیبل ریورس میپنگ رکھتا ہے، `gameId` سے کھلاڑی کے ایڈریس تک۔

- `Map`: کلید تین اقدار کا ایک ٹپل ہے:

  - `gameId`: 32-بائٹ ویلیو جو اس نقشے کا ہیش ہے جس پر کھلاڑی کھیل رہا ہے (گیم شناخت کنندہ)۔
  - `x` کوآرڈینیٹ
  - `y` کوآرڈینیٹ

  ویلیو ایک واحد نمبر ہے۔ اگر بم کا پتہ چل جائے تو یہ 255 ہے۔ بصورت دیگر، یہ اس جگہ کے ارد گرد بموں کی تعداد جمع ایک ہے۔ ہم صرف بموں کی تعداد استعمال نہیں کر سکتے، کیونکہ پہلے سے طے شدہ طور پر EVM میں تمام اسٹوریج اور MUD میں تمام قطاروں کی اقدار صفر ہوتی ہیں۔ ہمیں "کھلاڑی نے ابھی تک یہاں کھدائی نہیں کی ہے" اور "کھلاڑی نے یہاں کھدائی کی، اور پایا کہ ارد گرد صفر بم ہیں" کے درمیان فرق کرنے کی ضرورت ہے۔

اس کے علاوہ، کلائنٹ اور سرور کے درمیان رابطہ آن چین جزو کے ذریعے ہوتا ہے۔ اسے بھی ٹیبلز کا استعمال کرتے ہوئے لاگو کیا گیا ہے۔

- `PendingGame`: نئی گیم شروع کرنے کی غیر حل شدہ درخواستیں۔
- `PendingDig`: کسی مخصوص گیم میں مخصوص جگہ پر کھدائی کرنے کی غیر حل شدہ درخواستیں۔ یہ ایک [آف چین ٹیبل](https://mud.dev/store/tables#types-of-tables) ہے، جس کا مطلب ہے کہ یہ EVM اسٹوریج میں نہیں لکھی جاتی، یہ صرف ایونٹس کا استعمال کرتے ہوئے آف چین پڑھنے کے قابل ہے۔

### ایگزیکیوشن اور ڈیٹا فلو {#execution-data-flows}

یہ فلوز کلائنٹ، آن چین جزو، اور سرور کے درمیان ایگزیکیوشن کو مربوط کرتے ہیں۔

#### ابتدا (Initialization) {#initialization-flow}

جب آپ `mprocs` چلاتے ہیں، تو یہ اقدامات ہوتے ہیں:

1. [`mprocs`](https://github.com/pvolok/mprocs) چار اجزاء چلاتا ہے:

   - [Anvil](https://book.getfoundry.sh/anvil/)، جو ایک مقامی بلاک چین چلاتا ہے
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)، جو MUD کے لیے کنٹریکٹس کو مرتب (اگر ضرورت ہو) اور تعینات کرتا ہے
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client)، جو ویب براؤزرز کو UI اور کلائنٹ کوڈ پیش کرنے کے لیے [Vite](https://vitejs.dev/) چلاتا ہے۔
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)، جو سرور کے افعال انجام دیتا ہے

2. `contracts` پیکج MUD کنٹریکٹس کو تعینات کرتا ہے اور پھر [`PostDeploy.s.sol` اسکرپٹ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) چلاتا ہے۔ یہ اسکرپٹ کنفیگریشن سیٹ کرتا ہے۔ گٹ ہب کا کوڈ [ایک 10x5 مائن فیلڈ کی وضاحت کرتا ہے جس میں آٹھ مائنز ہیں](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23)۔

3. [سرور](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD سیٹ اپ کرنے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) سے شروع ہوتا ہے۔ دیگر چیزوں کے علاوہ، یہ ڈیٹا کی ہم آہنگی کو فعال کرتا ہے، تاکہ متعلقہ ٹیبلز کی ایک کاپی سرور کی میموری میں موجود ہو۔

4. سرور ایک فنکشن کو سبسکرائب کرتا ہے جسے [جب `Configuration` ٹیبل تبدیل ہو](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) تو عمل میں لایا جائے۔ [یہ فنکشن](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) `PostDeploy.s.sol` کے چلنے اور ٹیبل میں ترمیم کرنے کے بعد کال کیا جاتا ہے۔

5. جب سرور انیشلائزیشن فنکشن کے پاس کنفیگریشن آ جاتی ہے، تو یہ [سرور کے زیرو-نالج حصے](#using-zokrates-from-typescript) کو شروع کرنے کے لیے [`zkFunctions` کو کال کرتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35)۔ یہ اس وقت تک نہیں ہو سکتا جب تک ہمیں کنفیگریشن نہ مل جائے کیونکہ زیرو-نالج فنکشنز میں مائن فیلڈ کی چوڑائی اور اونچائی کو مستقل (constants) کے طور پر رکھنا ہوتا ہے۔

6. سرور کا زیرو-نالج حصہ شروع ہونے کے بعد، اگلا قدم [زیرو-نالج تصدیقی کنٹریکٹ کو بلاک چین پر تعینات کرنا](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) اور MUD میں تصدیق کنندہ کا ایڈریس سیٹ کرنا ہے۔

7. آخر میں، ہم اپ ڈیٹس کو سبسکرائب کرتے ہیں تاکہ ہم دیکھ سکیں کہ کب کوئی کھلاڑی [نئی گیم شروع کرنے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) یا [موجودہ گیم میں کھدائی کرنے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) کی درخواست کرتا ہے۔

#### نئی گیم {#new-game-flow}

جب کھلاڑی نئی گیم کی درخواست کرتا ہے تو یہ ہوتا ہے۔

1. اگر اس کھلاڑی کے لیے کوئی گیم جاری نہیں ہے، یا کوئی گیم ہے لیکن اس کی gameId صفر ہے، تو کلائنٹ ایک [نئی گیم کا بٹن](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) دکھاتا ہے۔ جب صارف اس بٹن کو دباتا ہے، تو [React `newGame` فنکشن چلاتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)۔

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) ایک `System` کال ہے۔ MUD میں تمام کالز `World` کنٹریکٹ کے ذریعے روٹ کی جاتی ہیں، اور زیادہ تر معاملات میں آپ `<namespace>__<function name>` کو کال کرتے ہیں۔ اس صورت میں، کال `app__newGame` کو کی جاتی ہے، جسے MUD پھر [`GameSystem` میں `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) پر روٹ کر دیتا ہے۔

3. آن چین فنکشن چیک کرتا ہے کہ کھلاڑی کی کوئی گیم جاری تو نہیں ہے، اور اگر نہیں ہے تو [درخواست کو `PendingGame` ٹیبل میں شامل کر دیتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)۔

4. سرور `PendingGame` میں تبدیلی کا پتہ لگاتا ہے اور [سبسکرائب شدہ فنکشن چلاتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)۔ یہ فنکشن [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) کو کال کرتا ہے، جو بدلے میں [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) کو کال کرتا ہے۔

5. `createGame` سب سے پہلا کام یہ کرتا ہے کہ [مناسب تعداد میں مائنز کے ساتھ ایک بے ترتیب نقشہ بناتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)۔ پھر، یہ خالی بارڈرز کے ساتھ نقشہ بنانے کے لیے [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) کو کال کرتا ہے، جو Zokrates کے لیے ضروری ہے۔ آخر میں، `createGame` نقشے کا ہیش حاصل کرنے کے لیے [`calculateMapHash`](#calculateMapHash) کو کال کرتا ہے، جسے گیم ID کے طور پر استعمال کیا جاتا ہے۔

6. `newGame` فنکشن نئی گیم کو `gamesInProgress` میں شامل کرتا ہے۔

7. سرور آخری کام یہ کرتا ہے کہ [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) کو کال کرتا ہے، جو آن چین ہے۔ یہ فنکشن رسائی کنٹرول کو فعال کرنے کے لیے ایک مختلف `System`، [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) میں ہے۔ رسائی کنٹرول کی وضاحت [MUD کنفیگریشن فائل](https://mud.dev/config)، [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) میں کی گئی ہے۔

   رسائی کی فہرست صرف ایک ہی ایڈریس کو `System` کو کال کرنے کی اجازت دیتی ہے۔ یہ سرور کے فنکشنز تک رسائی کو ایک ہی ایڈریس تک محدود کر دیتا ہے، تاکہ کوئی بھی سرور کا روپ نہ دھار سکے۔

8. آن چین جزو متعلقہ ٹیبلز کو اپ ڈیٹ کرتا ہے:

   - `PlayerGame` میں گیم بنائیں۔
   - `GamePlayer` میں ریورس میپنگ سیٹ کریں۔
   - `PendingGame` سے درخواست ہٹا دیں۔

9. سرور `PendingGame` میں تبدیلی کی نشاندہی کرتا ہے، لیکن کچھ نہیں کرتا کیونکہ [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) غلط (false) ہے۔

10. کلائنٹ پر [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) کو کھلاڑی کے ایڈریس کے لیے `PlayerGame` اندراج پر سیٹ کیا جاتا ہے۔ جب `PlayerGame` تبدیل ہوتا ہے، تو `gameRecord` بھی تبدیل ہو جاتا ہے۔

11. اگر `gameRecord` میں کوئی ویلیو ہے، اور گیم جیتی یا ہاری نہیں گئی ہے، تو کلائنٹ [نقشہ دکھاتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)۔

#### کھدائی (Dig) {#dig-flow}

1. کھلاڑی [نقشے کے سیل کے بٹن پر کلک کرتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188)، جو [`dig` فنکشن](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) کو کال کرتا ہے۔ یہ فنکشن [آن چین `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32) کو کال کرتا ہے۔

2. آن چین جزو [کئی سینیٹی چیکس انجام دیتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30)، اور اگر کامیاب ہو جائے تو کھدائی کی درخواست کو [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) میں شامل کر دیتا ہے۔

3. سرور [`PendingDig` میں تبدیلی کا پتہ لگاتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)۔ [اگر یہ درست ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84)، تو یہ نتیجہ اور اس کے درست ہونے کا ثبوت دونوں تیار کرنے کے لیے [زیرو-نالج کوڈ کو کال کرتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (جس کی وضاحت نیچے کی گئی ہے)۔

4. [سرور](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) آن چین [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) کو کال کرتا ہے۔

5. `digResponse` دو کام کرتا ہے۔ سب سے پہلے، یہ [زیرو نالج پروف](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) چیک کرتا ہے۔ پھر، اگر ثبوت درست ثابت ہوتا ہے، تو یہ دراصل نتیجے پر کارروائی کرنے کے لیے [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) کو کال کرتا ہے۔

6. `processDigResult` چیک کرتا ہے کہ آیا گیم [ہاری](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) یا [جیتی](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) گئی ہے، اور [آن چین نقشہ، `Map` کو اپ ڈیٹ کرتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)۔

7. کلائنٹ خود بخود اپ ڈیٹس اٹھا لیتا ہے اور [کھلاڑی کو دکھائے گئے نقشے کو اپ ڈیٹ کرتا ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)، اور اگر قابل اطلاق ہو تو کھلاڑی کو بتاتا ہے کہ یہ جیت ہے یا ہار۔

## Zokrates کا استعمال {#using-zokrates}

اوپر بیان کیے گئے فلوز میں ہم نے زیرو-نالج حصوں کو چھوڑ دیا تھا، انہیں ایک بلیک باکس کے طور پر سمجھتے ہوئے۔ اب آئیے اسے کھولتے ہیں اور دیکھتے ہیں کہ وہ کوڈ کیسے لکھا گیا ہے۔

### نقشے کی ہیشنگ {#hashing-map}

ہم [Poseidon](https://www.poseidon-hash.info) کو لاگو کرنے کے لیے [یہ جاوا اسکرپٹ کوڈ](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) استعمال کر سکتے ہیں، جو کہ Zokrates ہیش فنکشن ہے جسے ہم استعمال کرتے ہیں۔ تاہم، اگرچہ یہ تیز تر ہوگا، لیکن یہ صرف Zokrates ہیش فنکشن استعمال کرنے سے زیادہ پیچیدہ بھی ہوگا۔ یہ ایک ٹیوٹوریل ہے، اور اس لیے کوڈ کو سادگی کے لیے بہتر بنایا گیا ہے، کارکردگی کے لیے نہیں۔ لہذا، ہمیں دو مختلف Zokrates پروگراموں کی ضرورت ہے، ایک صرف نقشے کا ہیش (`hash`) شمار کرنے کے لیے اور دوسرا دراصل نقشے پر کسی جگہ کھدائی کے نتیجے کا زیرو-نالج پروف (`dig`) بنانے کے لیے۔

### ہیش فنکشن {#hash-function}

یہ وہ فنکشن ہے جو نقشے کا ہیش شمار کرتا ہے۔ ہم اس کوڈ کا لائن بہ لائن جائزہ لیں گے۔

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

یہ دو لائنیں [Zokrates معیاری لائبریری](https://zokrates.github.io/toolbox/stdlib.html) سے دو فنکشنز درآمد کرتی ہیں۔ [پہلا فنکشن](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) ایک [Poseidon ہیش](https://www.poseidon-hash.info/) ہے۔ یہ [`field` عناصر](https://zokrates.github.io/language/types.html#field) کی ایک سرنی (array) لیتا ہے اور ایک `field` واپس کرتا ہے۔

Zokrates میں فیلڈ عنصر عام طور پر 256 بٹس سے کم لمبا ہوتا ہے، لیکن زیادہ نہیں۔ کوڈ کو آسان بنانے کے لیے، ہم نقشے کو 512 بٹس تک محدود کرتے ہیں، اور چار فیلڈز کی ایک سرنی کو ہیش کرتے ہیں، اور ہر فیلڈ میں ہم صرف 128 بٹس استعمال کرتے ہیں۔ [`pack128` فنکشن](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) اس مقصد کے لیے 128 بٹس کی سرنی کو `field` میں تبدیل کرتا ہے۔

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

یہ لائن فنکشن کی تعریف شروع کرتی ہے۔ `hashMap` کو `map` نامی ایک واحد پیرامیٹر ملتا ہے، جو ایک دو جہتی `bool`(ean) سرنی ہے۔ نقشے کا سائز `width+2` بائی `height+2` ہے ان وجوہات کی بنا پر جن کی [وضاحت نیچے کی گئی ہے](#why-map-border)۔

ہم `${width+2}` اور `${height+2}` استعمال کر سکتے ہیں کیونکہ Zokrates پروگرام اس ایپلیکیشن میں [ٹیمپلیٹ اسٹرنگز](https://www.w3schools.com/js/js_string_templates.asp) کے طور پر محفوظ کیے گئے ہیں۔ `${` اور `}` کے درمیان موجود کوڈ کا جائزہ جاوا اسکرپٹ کے ذریعے لیا جاتا ہے، اور اس طرح پروگرام کو مختلف نقشے کے سائز کے لیے استعمال کیا جا سکتا ہے۔ نقشے کے پیرامیٹر کے چاروں طرف ایک لوکیشن چوڑا بارڈر ہوتا ہے جس میں کوئی بم نہیں ہوتا، یہی وجہ ہے کہ ہمیں چوڑائی اور اونچائی میں دو کا اضافہ کرنے کی ضرورت ہے۔

واپسی کی ویلیو ایک `field` ہے جس میں ہیش ہوتا ہے۔

```
   bool[512] mut map1d = [false; 512];
```

نقشہ دو جہتی ہے۔ تاہم، `pack128` فنکشن دو جہتی سرنیوں کے ساتھ کام نہیں کرتا ہے۔ اس لیے ہم پہلے `map1d` کا استعمال کرتے ہوئے نقشے کو 512-بائٹ سرنی میں فلیٹ کرتے ہیں۔ پہلے سے طے شدہ طور پر Zokrates متغیرات مستقل (constants) ہوتے ہیں، لیکن ہمیں ایک لوپ میں اس سرنی کو اقدار تفویض کرنے کی ضرورت ہے، اس لیے ہم اسے [`mut`](https://zokrates.github.io/language/variables.html#mutability) کے طور پر بیان کرتے ہیں۔

ہمیں سرنی کو شروع کرنے کی ضرورت ہے کیونکہ Zokrates میں `undefined` نہیں ہوتا ہے۔ `[false; 512]` اظہار کا مطلب ہے [512 `false` اقدار کی ایک سرنی](https://zokrates.github.io/language/types.html#declaration-and-initialization)۔

```
   u32 mut counter = 0;
```

ہمیں ان بٹس کے درمیان فرق کرنے کے لیے ایک کاؤنٹر کی بھی ضرورت ہے جو ہم نے پہلے ہی `map1d` میں بھر دی ہیں اور جو ہم نے نہیں بھری ہیں۔

```
   for u32 x in 0..${width+2} {
```

اس طرح آپ Zokrates میں ایک [`for` لوپ](https://zokrates.github.io/language/control_flow.html#for-loops) کا اعلان کرتے ہیں۔ Zokrates `for` لوپ کی حدود مقرر ہونی چاہئیں، کیونکہ اگرچہ یہ ایک لوپ معلوم ہوتا ہے، لیکن کمپائلر دراصل اسے "انرول" کرتا ہے۔ اظہار `${width+2}` ایک کمپائل ٹائم مستقل ہے کیونکہ `width` کو ٹائپ اسکرپٹ کوڈ کے ذریعے کمپائلر کو کال کرنے سے پہلے سیٹ کیا جاتا ہے۔

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

نقشے میں ہر مقام کے لیے، اس ویلیو کو `map1d` سرنی میں رکھیں اور کاؤنٹر میں اضافہ کریں۔

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`map1d` سے چار `field` اقدار کی ایک سرنی بنانے کے لیے `pack128`۔ Zokrates میں `array[a..b]` کا مطلب سرنی کا وہ حصہ ہے جو `a` سے شروع ہوتا ہے اور `b-1` پر ختم ہوتا ہے۔

```
    return poseidon(hashMe);
}
```

اس سرنی کو ہیش میں تبدیل کرنے کے لیے `poseidon` کا استعمال کریں۔

### ہیش پروگرام {#hash-program}

سرور کو گیم شناخت کنندگان بنانے کے لیے براہ راست `hashMap` کو کال کرنے کی ضرورت ہے۔ تاہم، Zokrates شروع کرنے کے لیے صرف ایک پروگرام پر `main` فنکشن کو کال کر سکتا ہے، اس لیے ہم ایک ایسا پروگرام بناتے ہیں جس میں ایک `main` ہو جو ہیش فنکشن کو کال کرے۔

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### کھدائی کا پروگرام {#dig-program}

یہ ایپلیکیشن کے زیرو-نالج حصے کا دل ہے، جہاں ہم وہ ثبوت تیار کرتے ہیں جو کھدائی کے نتائج کی تصدیق کے لیے استعمال ہوتے ہیں۔

```
${hashFragment}

// The number of mines in location (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### نقشے کا بارڈر کیوں {#why-map-border}

زیرو-نالج پروفز [ریاضیاتی سرکٹس](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) کا استعمال کرتے ہیں، جن میں `if` اسٹیٹمنٹ کا کوئی آسان متبادل نہیں ہوتا ہے۔ اس کے بجائے، وہ [مشروط آپریٹر](https://en.wikipedia.org/wiki/Ternary_conditional_operator) کا متبادل استعمال کرتے ہیں۔ اگر `a` صفر یا ایک ہو سکتا ہے، تو آپ `if a { b } else { c }` کا حساب `ab+(1-a)c` کے طور پر لگا سکتے ہیں۔

اس کی وجہ سے، Zokrates کی `if` اسٹیٹمنٹ ہمیشہ دونوں شاخوں کا جائزہ لیتی ہے۔ مثال کے طور پر، اگر آپ کے پاس یہ کوڈ ہے:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

یہ ایرر دے گا، کیونکہ اسے `arr[10]` کا حساب لگانے کی ضرورت ہے، حالانکہ اس ویلیو کو بعد میں صفر سے ضرب دیا جائے گا۔

یہی وجہ ہے کہ ہمیں نقشے کے چاروں طرف ایک لوکیشن چوڑا بارڈر درکار ہے۔ ہمیں کسی مقام کے ارد گرد مائنز کی کل تعداد کا حساب لگانے کی ضرورت ہے، اور اس کا مطلب ہے کہ ہمیں اس مقام کے ایک قطار اوپر اور نیچے، بائیں اور دائیں دیکھنا ہوگا جہاں ہم کھدائی کر رہے ہیں۔ جس کا مطلب ہے کہ وہ مقامات اس نقشے کی سرنی میں موجود ہونے چاہئیں جو Zokrates کو فراہم کی گئی ہے۔

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

پہلے سے طے شدہ طور پر Zokrates پروفز میں ان کے ان پٹس شامل ہوتے ہیں۔ یہ جاننے کا کوئی فائدہ نہیں کہ کسی جگہ کے ارد گرد پانچ مائنز ہیں جب تک کہ آپ کو حقیقت میں یہ معلوم نہ ہو کہ وہ کون سی جگہ ہے (اور آپ اسے صرف اپنی درخواست سے نہیں ملا سکتے، کیونکہ تب ثابت کرنے والا مختلف اقدار استعمال کر سکتا ہے اور آپ کو اس کے بارے میں نہیں بتائے گا)۔ تاہم، ہمیں Zokrates کو فراہم کرتے ہوئے نقشے کو خفیہ رکھنے کی ضرورت ہے۔ اس کا حل ایک `private` پیرامیٹر استعمال کرنا ہے، جو ثبوت کے ذریعے ظاہر _نہیں_ ہوتا ہے۔

اس سے غلط استعمال کا ایک اور راستہ کھلتا ہے۔ ثابت کرنے والا درست کوآرڈینیٹس استعمال کر سکتا ہے، لیکن اس مقام کے ارد گرد، اور ممکنہ طور پر خود اس مقام پر کسی بھی تعداد میں مائنز کے ساتھ ایک نقشہ بنا سکتا ہے۔ اس غلط استعمال کو روکنے کے لیے، ہم زیرو نالج پروف میں نقشے کا ہیش شامل کرتے ہیں، جو کہ گیم شناخت کنندہ ہے۔

```
   return (hashMap(map),
```

یہاں واپسی کی ویلیو ایک ٹپل ہے جس میں نقشے کی ہیش سرنی کے ساتھ ساتھ کھدائی کا نتیجہ بھی شامل ہے۔

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

ہم 255 کو ایک خاص ویلیو کے طور پر استعمال کرتے ہیں اگر اس مقام پر خود کوئی بم ہو۔

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

اگر کھلاڑی کسی مائن سے نہیں ٹکرایا ہے، تو اس مقام کے ارد گرد کے علاقے کے لیے مائن کی گنتی شامل کریں اور اسے واپس کریں۔

### TypeScript سے Zokrates کا استعمال {#using-zokrates-from-typescript}

Zokrates کا ایک کمانڈ لائن انٹرفیس ہے، لیکن اس پروگرام میں ہم اسے [TypeScript کوڈ](https://zokrates.github.io/toolbox/zokrates_js.html) میں استعمال کرتے ہیں۔

وہ لائبریری جس میں Zokrates کی تعریفیں شامل ہیں اسے [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) کہا جاتا ہے۔

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript بائنڈنگز](https://zokrates.github.io/toolbox/zokrates_js.html) درآمد کریں۔ ہمیں صرف [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) فنکشن کی ضرورت ہے کیونکہ یہ ایک پرامس (promise) واپس کرتا ہے جو تمام Zokrates تعریفوں کو حل کرتا ہے۔

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

خود Zokrates کی طرح، ہم بھی صرف ایک فنکشن برآمد کرتے ہیں، جو کہ [asynchronous](https://www.w3schools.com/js/js_async.asp) بھی ہے۔ جب یہ بالآخر واپس آتا ہے، تو یہ کئی فنکشنز فراہم کرتا ہے جیسا کہ ہم نیچے دیکھیں گے۔

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates کو شروع کریں، لائبریری سے وہ سب کچھ حاصل کریں جس کی ہمیں ضرورت ہے۔

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

اس کے بعد ہمارے پاس ہیش فنکشن اور دو Zokrates پروگرام ہیں جو ہم نے اوپر دیکھے ہیں۔

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

یہاں ہم ان پروگراموں کو مرتب (کمپائل) کرتے ہیں۔

```typescript
// زیرو نالج ویریفکیشن کے لیے کیز بنائیں۔
// پروڈکشن سسٹم پر آپ سیٹ اپ سیریمونی استعمال کرنا چاہیں گے۔
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

پروڈکشن سسٹم پر ہم ایک زیادہ پیچیدہ [سیٹ اپ تقریب](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) استعمال کر سکتے ہیں، لیکن یہ مظاہرے کے لیے کافی ہے۔ یہ کوئی مسئلہ نہیں ہے کہ صارفین پروور کی (prover key) جان سکتے ہیں - وہ اب بھی اسے چیزوں کو ثابت کرنے کے لیے استعمال نہیں کر سکتے جب تک کہ وہ سچ نہ ہوں۔ چونکہ ہم اینٹروپی (دوسرا پیرامیٹر، `""`) کی وضاحت کرتے ہیں، اس لیے نتائج ہمیشہ ایک جیسے ہی ہوں گے۔

**نوٹ:** Zokrates پروگراموں کی تالیف (compilation) اور کلید کی تخلیق سست عمل ہیں۔ انہیں ہر بار دہرانے کی ضرورت نہیں ہے، صرف اس وقت جب نقشے کا سائز تبدیل ہو۔ پروڈکشن سسٹم پر آپ انہیں ایک بار کریں گے، اور پھر آؤٹ پٹ کو محفوظ کر لیں گے۔ یہاں ایسا نہ کرنے کی واحد وجہ سادگی ہے۔

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) فنکشن دراصل Zokrates پروگرام چلاتا ہے۔ یہ دو فیلڈز کے ساتھ ایک اسٹرکچر واپس کرتا ہے: `output`، جو کہ JSON اسٹرنگ کے طور پر پروگرام کا آؤٹ پٹ ہے، اور `witness`، جو کہ نتیجے کا زیرو نالج پروف بنانے کے لیے درکار معلومات ہے۔ یہاں ہمیں صرف آؤٹ پٹ کی ضرورت ہے۔

آؤٹ پٹ `"31337"` کی شکل میں ایک اسٹرنگ ہے، جو کوٹیشن مارکس میں بند ایک اعشاریہ نمبر ہے۔ لیکن `viem` کے لیے ہمیں جو آؤٹ پٹ درکار ہے وہ `0x60A7` کی شکل میں ایک ہیکسا ڈیسیمل نمبر ہے۔ اس لیے ہم کوٹیشن مارکس ہٹانے کے لیے `.slice(1,-1)` استعمال کرتے ہیں اور پھر باقی اسٹرنگ، جو کہ ایک اعشاریہ نمبر ہے، کو [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) میں چلانے کے لیے `BigInt` استعمال کرتے ہیں۔ `.toString(16)` اس `BigInt` کو ہیکسا ڈیسیمل اسٹرنگ میں تبدیل کرتا ہے، اور `"0x"+` ہیکسا ڈیسیمل نمبرز کے لیے مارکر کا اضافہ کرتا ہے۔

```typescript
// کھودیں اور نتیجے کا زیرو نالج پروف واپس کریں۔
// (سرور سائیڈ کوڈ)
```

زیرو نالج پروف میں عوامی ان پٹس (`x` اور `y`) اور نتائج (نقشے کا ہیش اور بموں کی تعداد) شامل ہیں۔

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates میں یہ چیک کرنا ایک مسئلہ ہے کہ آیا کوئی انڈیکس حد سے باہر ہے، اس لیے ہم اسے یہاں کرتے ہیں۔

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

کھدائی کا پروگرام چلائیں۔

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) استعمال کریں اور ثبوت واپس کریں۔

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

ایک Solidity تصدیق کنندہ، ایک اسمارٹ کنٹریکٹ جسے ہم بلاک چین پر تعینات کر سکتے ہیں اور `digCompiled.program` کے ذریعے تیار کردہ ثبوتوں کی تصدیق کے لیے استعمال کر سکتے ہیں۔

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

آخر میں، وہ سب کچھ واپس کریں جس کی دوسرے کوڈ کو ضرورت ہو سکتی ہے۔

## سیکیورٹی ٹیسٹس {#security-tests}

سیکیورٹی ٹیسٹس اہم ہیں کیونکہ فعالیت کا بگ بالآخر خود کو ظاہر کر دے گا۔ لیکن اگر ایپلیکیشن غیر محفوظ ہے، تو اس کے طویل عرصے تک پوشیدہ رہنے کا امکان ہے اس سے پہلے کہ یہ کسی کے دھوکہ دہی کرنے اور دوسروں کے وسائل لے کر فرار ہونے سے ظاہر ہو۔

### اجازتیں (Permissions) {#permissions}

اس گیم میں ایک مراعات یافتہ ہستی ہے، سرور۔ یہ واحد صارف ہے جسے [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) میں فنکشنز کو کال کرنے کی اجازت ہے۔ ہم یہ تصدیق کرنے کے لیے [`cast`](https://book.getfoundry.sh/cast/) کا استعمال کر سکتے ہیں کہ اجازت یافتہ فنکشنز کو کالز کی اجازت صرف سرور اکاؤنٹ کے طور پر ہے۔

[سرور کی پرائیویٹ کی `setupNetwork.ts` میں ہے](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)۔

1. اس کمپیوٹر پر جو `anvil` (بلاک چین) چلاتا ہے، یہ ماحولیاتی متغیرات (environment variables) سیٹ کریں۔

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. تصدیق کنندہ کا ایڈریس غیر مجاز ایڈریس کے طور پر سیٹ کرنے کی کوشش کرنے کے لیے `cast` کا استعمال کریں۔

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   نہ صرف `cast` ناکامی کی اطلاع دیتا ہے، بلکہ آپ براؤزر پر گیم میں **MUD Dev Tools** کھول سکتے ہیں، **Tables** پر کلک کر سکتے ہیں، اور **app\_\_VerifierAddress** کو منتخب کر سکتے ہیں۔ دیکھیں کہ ایڈریس صفر نہیں ہے۔

3. تصدیق کنندہ کا ایڈریس سرور کے ایڈریس کے طور پر سیٹ کریں۔

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** میں ایڈریس اب صفر ہونا چاہیے۔

ایک ہی `System` میں تمام MUD فنکشنز ایک ہی رسائی کنٹرول سے گزرتے ہیں، اس لیے میں اس ٹیسٹ کو کافی سمجھتا ہوں۔ اگر آپ نہیں سمجھتے، تو آپ [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) میں دیگر فنکشنز چیک کر سکتے ہیں۔

### زیرو-نالج کے غلط استعمال {#zero-knowledge-abuses}

Zokrates کی تصدیق کرنے کے لیے ریاضی اس ٹیوٹوریل (اور میری صلاحیتوں) کے دائرہ کار سے باہر ہے۔ تاہم، ہم زیرو-نالج کوڈ پر مختلف چیکس چلا سکتے ہیں تاکہ یہ تصدیق کی جا سکے کہ اگر یہ صحیح طریقے سے نہیں کیا گیا ہے تو یہ ناکام ہو جاتا ہے۔ ان تمام ٹیسٹوں کے لیے ہمیں [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) کو تبدیل کرنے اور پوری ایپلیکیشن کو دوبارہ شروع کرنے کی ضرورت ہوگی۔ سرور کے عمل کو دوبارہ شروع کرنا کافی نہیں ہے، کیونکہ یہ ایپلیکیشن کو ایک ناممکن حالت میں ڈال دیتا ہے (کھلاڑی کی ایک گیم جاری ہے، لیکن گیم اب سرور کو دستیاب نہیں ہے)۔

#### غلط جواب {#wrong-answer}

سب سے آسان امکان زیرو-نالج پروف میں غلط جواب فراہم کرنا ہے۔ ایسا کرنے کے لیے، ہم `zkDig` کے اندر جاتے ہیں اور [لائن 91 میں ترمیم کرتے ہیں](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

اس کا مطلب ہے کہ ہم ہمیشہ دعویٰ کریں گے کہ ایک بم ہے، قطع نظر اس کے کہ صحیح جواب کیا ہے۔ اس ورژن کے ساتھ کھیلنے کی کوشش کریں، اور آپ کو `pnpm dev` اسکرین کے **server** ٹیب میں یہ ایرر نظر آئے گا:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

تو اس قسم کا دھوکہ ناکام ہو جاتا ہے۔

#### غلط ثبوت {#wrong-proof}

کیا ہوگا اگر ہم صحیح معلومات فراہم کریں، لیکن صرف ثبوت کا ڈیٹا غلط ہو؟ اب، لائن 91 کو اس سے تبدیل کریں:

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

یہ اب بھی ناکام ہوتا ہے، لیکن اب یہ بغیر کسی وجہ کے ناکام ہوتا ہے کیونکہ یہ تصدیق کنندہ کی کال کے دوران ہوتا ہے۔

### صارف زیرو ٹرسٹ کوڈ کی تصدیق کیسے کر سکتا ہے؟ {#user-verify-zero-trust}

اسمارٹ کنٹریکٹس کی تصدیق کرنا نسبتاً آسان ہے۔ عام طور پر، ڈیولپر سورس کوڈ کو بلاک ایکسپلورر پر شائع کرتا ہے، اور بلاک ایکسپلورر اس بات کی تصدیق کرتا ہے کہ سورس کوڈ [کنٹریکٹ کی تعیناتی کی ٹرانزیکشن](/developers/docs/smart-contracts/deploying/) میں موجود کوڈ میں مرتب (کمپائل) ہوتا ہے۔ MUD `System`s کے معاملے میں یہ [تھوڑا زیادہ پیچیدہ](https://mud.dev/cli/verify) ہے، لیکن زیادہ نہیں۔

زیرو-نالج کے ساتھ یہ مشکل ہے۔ تصدیق کنندہ میں کچھ مستقل (constants) شامل ہوتے ہیں اور ان پر کچھ حساب کتاب چلاتا ہے۔ اس سے آپ کو یہ نہیں پتہ چلتا کہ کیا ثابت کیا جا رہا ہے۔

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

اس کا حل، کم از کم اس وقت تک جب تک کہ بلاک ایکسپلوررز اپنے یوزر انٹرفیس میں Zokrates کی تصدیق شامل نہ کر لیں، یہ ہے کہ ایپلیکیشن ڈیولپرز Zokrates پروگرامز کو دستیاب کرائیں، اور کم از کم کچھ صارفین انہیں مناسب تصدیقی کلید کے ساتھ خود مرتب کریں۔

ایسا کرنے کے لیے:

1. [Zokrates انسٹال کریں](https://zokrates.github.io/gettingstarted.html)۔
2. Zokrates پروگرام کے ساتھ ایک فائل، `dig.zok` بنائیں۔ نیچے دیا گیا کوڈ یہ فرض کرتا ہے کہ آپ نے نقشے کا اصل سائز، 10x5 رکھا ہے۔

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


    // مقام (x,y) پر مائنز کی تعداد
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

3. Zokrates کوڈ کو مرتب کریں اور تصدیقی کلید بنائیں۔ تصدیقی کلید کو اسی اینٹروپی کے ساتھ بنانا ہوگا جو اصل سرور میں استعمال ہوئی تھی، [اس صورت میں ایک خالی اسٹرنگ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)۔

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. خود سے Solidity تصدیق کنندہ بنائیں، اور تصدیق کریں کہ یہ عملی طور پر بلاک چین پر موجود تصدیق کنندہ سے مماثل ہے (سرور ایک تبصرہ شامل کرتا ہے، لیکن یہ اہم نہیں ہے)۔

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## ڈیزائن کے فیصلے {#design}

کسی بھی کافی پیچیدہ ایپلیکیشن میں مسابقتی ڈیزائن کے اہداف ہوتے ہیں جن کے لیے سمجھوتہ (trade-offs) کی ضرورت ہوتی ہے۔ آئیے کچھ سمجھوتوں پر نظر ڈالتے ہیں اور دیکھتے ہیں کہ موجودہ حل دیگر اختیارات پر کیوں ترجیح رکھتا ہے۔

### زیرو-نالج کیوں {#why-zero-knowledge}

مائن سویپر کے لیے آپ کو واقعی زیرو-نالج کی ضرورت نہیں ہے۔ سرور ہمیشہ نقشہ رکھ سکتا ہے، اور پھر گیم ختم ہونے پر اسے مکمل طور پر ظاہر کر سکتا ہے۔ پھر، گیم کے اختتام پر، اسمارٹ کنٹریکٹ نقشے کے ہیش کا حساب لگا سکتا ہے، تصدیق کر سکتا ہے کہ یہ مماثل ہے، اور اگر ایسا نہیں ہوتا ہے تو سرور کو جرمانہ کر سکتا ہے یا گیم کو مکمل طور پر نظر انداز کر سکتا ہے۔

میں نے یہ آسان حل استعمال نہیں کیا کیونکہ یہ صرف ان مختصر گیمز کے لیے کام کرتا ہے جن کی اختتامی حالت (end state) واضح طور پر متعین ہو۔ جب کوئی گیم ممکنہ طور پر لامحدود ہو (جیسا کہ [خود مختار دنیاؤں](https://0xparc.org/blog/autonomous-worlds) کے معاملے میں)، تو آپ کو ایک ایسے حل کی ضرورت ہوتی ہے جو اسٹیٹ کو ظاہر کیے _بغیر_ اسے ثابت کرے۔

ایک ٹیوٹوریل کے طور پر اس مضمون کو ایک مختصر گیم کی ضرورت تھی جسے سمجھنا آسان ہو، لیکن یہ تکنیک طویل گیمز کے لیے سب سے زیادہ مفید ہے۔

### Zokrates کیوں؟ {#why-zokrates}

[Zokrates](https://zokrates.github.io/) دستیاب واحد زیرو-نالج لائبریری نہیں ہے، لیکن یہ ایک عام، [امپیریٹو (imperative)](https://en.wikipedia.org/wiki/Imperative_programming) پروگرامنگ زبان سے ملتی جلتی ہے اور بولین متغیرات کو سپورٹ کرتی ہے۔

اپنی ایپلیکیشن کے لیے، مختلف ضروریات کے ساتھ، آپ [Circum](https://docs.circom.io/getting-started/installation/) یا [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) استعمال کرنے کو ترجیح دے سکتے ہیں۔

### Zokrates کو کب مرتب (کمپائل) کیا جائے {#when-compile-zokrates}

اس پروگرام میں ہم Zokrates پروگراموں کو [ہر بار سرور شروع ہونے پر](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) مرتب کرتے ہیں۔ یہ واضح طور پر وسائل کا ضیاع ہے، لیکن یہ ایک ٹیوٹوریل ہے، جسے سادگی کے لیے بہتر بنایا گیا ہے۔

اگر میں پروڈکشن لیول کی ایپلیکیشن لکھ رہا ہوتا، تو میں چیک کرتا کہ آیا میرے پاس اس مائن فیلڈ سائز پر مرتب شدہ Zokrates پروگراموں والی کوئی فائل ہے، اور اگر ایسا ہے تو اسے استعمال کرتا۔ آن چین تصدیق کنندہ کنٹریکٹ تعینات کرنے کے لیے بھی یہی بات درست ہے۔

### تصدیق کنندہ اور پروور کیز بنانا {#key-creation}

[کلید کی تخلیق](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) ایک اور خالص حساب کتاب ہے جسے دیے گئے مائن فیلڈ سائز کے لیے ایک سے زیادہ بار کرنے کی ضرورت نہیں ہے۔ ایک بار پھر، یہ سادگی کی خاطر صرف ایک بار کیا جاتا ہے۔

اس کے علاوہ، ہم [ایک سیٹ اپ تقریب](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) استعمال کر سکتے ہیں۔ سیٹ اپ تقریب کا فائدہ یہ ہے کہ آپ کو زیرو-نالج پروف پر دھوکہ دینے کے لیے ہر شریک سے اینٹروپی یا کچھ درمیانی نتیجہ درکار ہوتا ہے۔ اگر کم از کم ایک تقریب کا شریک ایماندار ہے اور اس معلومات کو حذف کر دیتا ہے، تو زیرو-نالج پروفز بعض حملوں سے محفوظ رہتے ہیں۔ تاہم، اس بات کی تصدیق کرنے کا _کوئی طریقہ کار نہیں_ ہے کہ معلومات کو ہر جگہ سے حذف کر دیا گیا ہے۔ اگر زیرو-نالج پروفز انتہائی اہم ہیں، تو آپ سیٹ اپ تقریب میں حصہ لینا چاہیں گے۔

یہاں ہم [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) پر انحصار کرتے ہیں، جس میں درجنوں شرکاء تھے۔ یہ شاید کافی محفوظ ہے، اور بہت آسان ہے۔ ہم کلید کی تخلیق کے دوران اینٹروپی بھی شامل نہیں کرتے ہیں، جس سے صارفین کے لیے [زیرو-نالج کنفیگریشن کی تصدیق کرنا](#user-verify-zero-trust) آسان ہو جاتا ہے۔

### تصدیق کہاں کی جائے {#where-verification}

ہم زیرو-نالج پروفز کی تصدیق یا تو آن چین (جس پر گیس خرچ ہوتی ہے) یا کلائنٹ میں ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) کا استعمال کرتے ہوئے) کر سکتے ہیں۔ میں نے پہلے کا انتخاب کیا، کیونکہ یہ آپ کو ایک بار [تصدیق کنندہ کی تصدیق کرنے](#user-verify-zero-trust) دیتا ہے اور پھر اس بات پر بھروسہ کرنے دیتا ہے کہ جب تک اس کا کنٹریکٹ ایڈریس یکساں رہتا ہے یہ تبدیل نہیں ہوتا۔ اگر تصدیق کلائنٹ پر کی گئی ہوتی، تو آپ کو ہر بار کلائنٹ ڈاؤن لوڈ کرنے پر موصول ہونے والے کوڈ کی تصدیق کرنی پڑتی۔

اس کے علاوہ، اگرچہ یہ گیم سنگل پلیئر ہے، لیکن بہت سی بلاک چین گیمز ملٹی پلیئر ہوتی ہیں۔ آن چین تصدیق کا مطلب ہے کہ آپ زیرو-نالج پروف کی تصدیق صرف ایک بار کرتے ہیں۔ اسے کلائنٹ میں کرنے کے لیے ہر کلائنٹ کو آزادانہ طور پر تصدیق کرنے کی ضرورت ہوگی۔

### نقشے کو TypeScript میں فلیٹ کریں یا Zokrates میں؟ {#where-flatten}

عام طور پر، جب پروسیسنگ TypeScript یا Zokrates دونوں میں کی جا سکتی ہے، تو اسے TypeScript میں کرنا بہتر ہے، جو بہت تیز ہے، اور اس کے لیے زیرو-نالج پروفز کی ضرورت نہیں ہوتی ہے۔ مثال کے طور پر، یہی وجہ ہے کہ ہم Zokrates کو ہیش فراہم نہیں کرتے اور اس سے یہ تصدیق نہیں کرواتے کہ یہ درست ہے۔ ہیشنگ Zokrates کے اندر کی جانی چاہیے، لیکن واپس کیے گئے ہیش اور آن چین ہیش کے درمیان مماثلت اس کے باہر ہو سکتی ہے۔

تاہم، ہم اب بھی [Zokrates میں نقشے کو فلیٹ کرتے ہیں](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20)، جبکہ ہم اسے TypeScript میں کر سکتے تھے۔ اس کی وجہ یہ ہے کہ میری رائے میں، دوسرے اختیارات بدتر ہیں۔

- Zokrates کوڈ کو بولین کی ایک جہتی سرنی فراہم کریں، اور دو جہتی نقشہ حاصل کرنے کے لیے `x*(height+2)+y` جیسا اظہار استعمال کریں۔ اس سے [کوڈ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) کچھ زیادہ پیچیدہ ہو جائے گا، اس لیے میں نے فیصلہ کیا کہ ٹیوٹوریل کے لیے کارکردگی کا فائدہ اس کے قابل نہیں ہے۔

- Zokrates کو ایک جہتی سرنی اور دو جہتی سرنی دونوں بھیجیں۔ تاہم، اس حل سے ہمیں کچھ حاصل نہیں ہوتا۔ Zokrates کوڈ کو اس بات کی تصدیق کرنی ہوگی کہ اسے فراہم کی گئی ایک جہتی سرنی واقعی دو جہتی سرنی کی درست نمائندگی ہے۔ اس لیے کارکردگی میں کوئی فائدہ نہیں ہوگا۔

- Zokrates میں دو جہتی سرنی کو فلیٹ کریں۔ یہ سب سے آسان آپشن ہے، اس لیے میں نے اسے منتخب کیا۔

### نقشے کہاں محفوظ کیے جائیں {#where-store-maps}

اس ایپلیکیشن میں [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) میموری میں محض ایک متغیر ہے۔ اس کا مطلب ہے کہ اگر آپ کا سرور بند ہو جاتا ہے اور اسے دوبارہ شروع کرنے کی ضرورت ہوتی ہے، تو اس کی محفوظ کردہ تمام معلومات ضائع ہو جاتی ہیں۔ نہ صرف کھلاڑی اپنی گیم جاری رکھنے سے قاصر رہتے ہیں، بلکہ وہ نئی گیم بھی شروع نہیں کر سکتے کیونکہ آن چین جزو سمجھتا ہے کہ ان کی گیم ابھی بھی جاری ہے۔

یہ واضح طور پر پروڈکشن سسٹم کے لیے برا ڈیزائن ہے، جس میں آپ اس معلومات کو ڈیٹا بیس میں محفوظ کریں گے۔ یہاں متغیر استعمال کرنے کی واحد وجہ یہ ہے کہ یہ ایک ٹیوٹوریل ہے اور سادگی بنیادی غور طلب بات ہے۔

## نتیجہ: کن حالات میں یہ مناسب تکنیک ہے؟ {#conclusion}

تو، اب آپ جانتے ہیں کہ ایک ایسے سرور کے ساتھ گیم کیسے لکھی جائے جو خفیہ اسٹیٹ کو محفوظ کرتا ہے جس کا تعلق آن چین سے نہیں ہے۔ لیکن آپ کو کن صورتوں میں ایسا کرنا چاہیے؟ دو اہم غور طلب باتیں ہیں۔

- _طویل چلنے والی گیم_: [جیسا کہ اوپر ذکر کیا گیا ہے](#why-zero-knowledge)، ایک مختصر گیم میں آپ گیم ختم ہونے کے بعد اسٹیٹ کو شائع کر سکتے ہیں اور پھر ہر چیز کی تصدیق کروا سکتے ہیں۔ لیکن یہ اس وقت کوئی آپشن نہیں ہوتا جب گیم طویل یا غیر معینہ وقت لیتی ہو، اور اسٹیٹ کو خفیہ رکھنے کی ضرورت ہو۔

- _کچھ مرکزیت قابل قبول ہے_: زیرو-نالج پروفز سالمیت کی تصدیق کر سکتے ہیں، کہ کوئی ہستی نتائج کو جعلی نہیں بنا رہی ہے۔ وہ جو نہیں کر سکتے وہ یہ یقینی بنانا ہے کہ ہستی اب بھی دستیاب ہوگی اور پیغامات کا جواب دے گی۔ ایسی صورتحال میں جہاں دستیابی کو بھی غیر مرکزی بنانے کی ضرورت ہو، زیرو-نالج پروفز کافی حل نہیں ہیں، اور آپ کو [ملٹی پارٹی کمپیوٹیشن](https://en.wikipedia.org/wiki/Secure_multi-party_computation) کی ضرورت ہوتی ہے۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔

### اعترافات {#acknowledgements}

- الوارو الونسو نے اس مضمون کا مسودہ پڑھا اور Zokrates کے بارے میں میری کچھ غلط فہمیوں کو دور کیا۔

باقی ماندہ کوئی بھی غلطی میری ذمہ داری ہے۔