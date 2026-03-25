---
title: "SQL کے ساتھ ایتھیریم کے بنیادی موضوعات سیکھیں"
description: "یہ ٹیوٹوریل قارئین کو اسٹرکچرڈ کیوری لینگویج (SQL) کے ساتھ آن چین ڈیٹا کی کیوری کر کے ٹرانزیکشنز، بلاکس اور گیس سمیت ایتھیریم کے بنیادی تصورات کو سمجھنے میں مدد کرتا ہے۔"
author: "پول ایپیوت"
tags: ["SQL", "کیوری کرنا", "ٹرانزیکشنز", "data-and-analytics"]
skill: beginner
breadcrumb: "SQL کے ساتھ ایتھیریم"
lang: ur
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

بہت سے ایتھیریم ٹیوٹوریلز ڈیولپرز کو ہدف بناتے ہیں، لیکن ڈیٹا اینالسٹس یا ان لوگوں کے لیے تعلیمی وسائل کی کمی ہے جو کلائنٹ یا نوڈ چلائے بغیر آن چین ڈیٹا دیکھنا چاہتے ہیں۔

یہ ٹیوٹوریل قارئین کو [Dune Analytics](https://dune.com/) کے فراہم کردہ انٹرفیس کے ذریعے اسٹرکچرڈ کیوری لینگویج (SQL) کے ساتھ آن چین ڈیٹا کی کیوری کر کے ٹرانزیکشنز، بلاکس اور گیس سمیت ایتھیریم کے بنیادی تصورات کو سمجھنے میں مدد کرتا ہے۔

آن چین ڈیٹا ہمیں ایتھیریم، نیٹ ورک، اور کمپیوٹنگ پاور کے لیے ایک معیشت کے طور پر سمجھنے میں مدد کر سکتا ہے اور اسے آج ایتھیریم کو درپیش چیلنجز (جیسے، گیس کی بڑھتی ہوئی قیمتوں) اور، اس سے بھی اہم بات، اسکیلنگ سلوشنز کے بارے میں بات چیت کو سمجھنے کے لیے ایک بنیاد کے طور پر کام کرنا چاہیے۔

### ٹرانزیکشنز {#transactions}

ایتھیریم پر صارف کا سفر صارف کے زیر کنٹرول اکاؤنٹ یا ETH بیلنس والی اینٹیٹی کو شروع کرنے سے شروع ہوتا ہے۔ اکاؤنٹ کی دو اقسام ہیں - صارف کے زیر کنٹرول یا اسمارٹ کانٹریکٹ (دیکھیں [ethereum.org](/developers/docs/accounts/))۔

کسی بھی اکاؤنٹ کو بلاک ایکسپلورر جیسے [Etherscan](https://etherscan.io/) یا [Blockscout](https://eth.blockscout.com/) پر دیکھا جا سکتا ہے۔ بلاک ایکسپلوررز ایتھیریم کے ڈیٹا کا ایک پورٹل ہیں۔ وہ ریئل ٹائم میں بلاکس، ٹرانزیکشنز، مائنرز، اکاؤنٹس اور دیگر آن چین سرگرمیوں کا ڈیٹا دکھاتے ہیں (دیکھیں [یہاں](/developers/docs/data-and-analytics/block-explorers/))۔

تاہم، ایک صارف بیرونی بلاک ایکسپلوررز کی طرف سے فراہم کردہ معلومات کو ہم آہنگ کرنے کے لیے براہ راست ڈیٹا کی کیوری کرنا چاہ سکتا ہے۔ [Dune Analytics](https://dune.com/) یہ صلاحیت ہر اس شخص کو فراہم کرتا ہے جسے SQL کا کچھ علم ہو۔

حوالہ کے لیے، ایتھیریم فاؤنڈیشن (EF) کا اسمارٹ کانٹریکٹ اکاؤنٹ [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) پر دیکھا جا سکتا ہے۔

ایک بات نوٹ کرنے کی ہے کہ تمام اکاؤنٹس، بشمول EF کے، کا ایک پبلک ایڈریس ہوتا ہے جسے ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے استعمال کیا جا سکتا ہے۔

Etherscan پر اکاؤنٹ بیلنس باقاعدہ ٹرانزیکشنز اور اندرونی ٹرانزیکشنز پر مشتمل ہوتا ہے۔ اندرونی ٹرانزیکشنز، نام کے باوجود، _اصل_ ٹرانزیکشنز نہیں ہیں جو چین کی اسٹیٹ کو تبدیل کرتی ہیں۔ وہ کانٹریکٹ کو ایگزیکیوٹ کر کے شروع کی گئی ویلیو ٹرانسفرز ہیں ([ذریعہ](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions))۔ چونکہ اندرونی ٹرانزیکشنز کے کوئی دستخط نہیں ہوتے، اس لیے وہ بلاک چین پر شامل **نہیں** ہوتیں اور Dune Analytics کے ساتھ ان کی کیوری نہیں کی جا سکتی۔

لہذا، یہ ٹیوٹوریل باقاعدہ ٹرانزیکشنز پر توجہ مرکوز کرے گا۔ اس کی کیوری اس طرح کی جا سکتی ہے:

```sql
WITH temp_table AS (
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    value / 1e18 AS ether,
    gas_used,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
)
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    ether,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

اس سے وہی معلومات حاصل ہوں گی جو Etherscan کے ٹرانزیکشن پیج پر فراہم کی گئی ہیں۔ موازنہ کے لیے، یہاں دو ذرائع ہیں:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Blockscout پر EF کا کانٹریکٹ پیج۔](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

آپ ڈیش بورڈ [یہاں](https://dune.com/paulapivat/Learn-Ethereum) تلاش کر سکتے ہیں۔ کیوری دیکھنے کے لیے ٹیبل پر کلک کریں (اوپر بھی دیکھیں)۔

### ٹرانزیکشنز کی تفصیل {#breaking_down_transactions}

جمع کرائی گئی ٹرانزیکشن میں کئی معلومات شامل ہوتی ہیں جن میں شامل ہیں ([ذریعہ](/developers/docs/transactions/)):

- **وصول کنندہ (Recipient)**: وصول کرنے والا ایڈریس ("to" کے طور پر کیوری کیا گیا)
- **دستخط (Signature)**: اگرچہ بھیجنے والے کی پرائیویٹ کیز ٹرانزیکشن پر دستخط کرتی ہیں، لیکن ہم SQL کے ساتھ بھیجنے والے کے پبلک ایڈریس ("from") کی کیوری کر سکتے ہیں۔
- **ویلیو (Value)**: یہ منتقل کردہ ETH کی رقم ہے (`ether` کالم دیکھیں)۔
- **ڈیٹا (Data)**: یہ صوابدیدی ڈیٹا ہے جسے ہیش کیا گیا ہے (`data` کالم دیکھیں)
- **gasLimit** – گیس یونٹس کی زیادہ سے زیادہ مقدار جو ٹرانزیکشن کے ذریعے استعمال کی جا سکتی ہے۔ گیس کے یونٹس کمپیوٹیشنل مراحل کی نمائندگی کرتے ہیں
- **maxPriorityFeePerGas** - مائنر کو ٹپ کے طور پر شامل کی جانے والی گیس کی زیادہ سے زیادہ مقدار
- **maxFeePerGas** - ٹرانزیکشن کے لیے ادا کی جانے والی گیس کی زیادہ سے زیادہ مقدار (بشمول baseFeePerGas اور maxPriorityFeePerGas)

ہم ایتھیریم فاؤنڈیشن کے پبلک ایڈریس پر ہونے والی ٹرانزیکشنز کے لیے ان مخصوص معلومات کی کیوری کر سکتے ہیں:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### بلاکس {#blocks}

ہر ٹرانزیکشن ایتھیریم ورچوئل مشین ([EVM](/developers/docs/evm/)) کی اسٹیٹ کو تبدیل کر دے گی ([ذریعہ](/developers/docs/transactions/))۔ ٹرانزیکشنز کو نیٹ ورک پر نشر کیا جاتا ہے تاکہ ان کی تصدیق کی جا سکے اور انہیں ایک بلاک میں شامل کیا جا سکے۔ ہر ٹرانزیکشن ایک بلاک نمبر سے وابستہ ہوتی ہے۔ ڈیٹا دیکھنے کے لیے، ہم ایک مخصوص بلاک نمبر کی کیوری کر سکتے ہیں: 12396854 (اس تحریر کے وقت، <span dir="ltr">11/5/21</span> تک ایتھیریم فاؤنڈیشن کی ٹرانزیکشنز میں سب سے حالیہ بلاک)۔

مزید برآں، جب ہم اگلے دو بلاکس کی کیوری کرتے ہیں، تو ہم دیکھ سکتے ہیں کہ ہر بلاک میں پچھلے بلاک کا ہیش (یعنی پیرنٹ ہیش) ہوتا ہے، جو یہ واضح کرتا ہے کہ بلاک چین کیسے بنتی ہے۔

ہر بلاک میں اس کے پیرنٹ بلاک کا حوالہ ہوتا ہے۔ یہ نیچے `hash` اور `parent_hash` کالمز کے درمیان دکھایا گیا ہے ([ذریعہ](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Dune Analytics پر [کیوری](https://dune.com/queries/44856/88292) یہ ہے:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

ہم وقت، بلاک نمبر، مشکل (difficulty)، ہیش، پیرنٹ ہیش، اور نانس (nonce) کی کیوری کر کے ایک بلاک کا جائزہ لے سکتے ہیں۔

واحد چیز جو یہ کیوری کور نہیں کرتی وہ _ٹرانزیکشنز کی فہرست_ ہے جس کے لیے نیچے ایک الگ کیوری کی ضرورت ہے اور _اسٹیٹ روٹ_۔ ایک فل یا آرکائیول نوڈ تمام ٹرانزیکشنز اور اسٹیٹ ٹرانزیشنز کو اسٹور کرے گا، جس سے کلائنٹس کسی بھی وقت چین کی اسٹیٹ کی کیوری کر سکیں گے۔ چونکہ اس کے لیے بڑی اسٹوریج اسپیس کی ضرورت ہوتی ہے، اس لیے ہم چین ڈیٹا کو اسٹیٹ ڈیٹا سے الگ کر سکتے ہیں:

- چین ڈیٹا (بلاکس، ٹرانزیکشنز کی فہرست)
- اسٹیٹ ڈیٹا (ہر ٹرانزیکشن کی اسٹیٹ ٹرانزیشن کا نتیجہ)

اسٹیٹ روٹ مؤخر الذکر میں آتا ہے اور یہ _پوشیدہ (implicit)_ ڈیٹا ہے (آن چین اسٹور نہیں ہوتا)، جبکہ چین ڈیٹا واضح (explicit) ہوتا ہے اور خود چین پر اسٹور ہوتا ہے ([ذریعہ](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored))۔

اس ٹیوٹوریل کے لیے، ہم آن چین ڈیٹا پر توجہ مرکوز کریں گے جس کی Dune Analytics کے ذریعے SQL کے ساتھ کیوری کی جا _سکتی_ ہے۔

جیسا کہ اوپر بیان کیا گیا ہے، ہر بلاک میں ٹرانزیکشنز کی ایک فہرست ہوتی ہے، ہم ایک مخصوص بلاک کو فلٹر کر کے اس کی کیوری کر سکتے ہیں۔ ہم سب سے حالیہ بلاک، 12396854 کو آزمائیں گے:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Dune پر SQL آؤٹ پٹ یہ ہے:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

چین میں شامل ہونے والا یہ واحد بلاک ایتھیریم ورچوئل مشین ([EVM](/developers/docs/evm/)) کی اسٹیٹ کو تبدیل کر دیتا ہے۔ درجنوں اور بعض اوقات، سینکڑوں ٹرانزیکشنز کی ایک ساتھ تصدیق کی جاتی ہے۔ اس مخصوص معاملے میں، 222 ٹرانزیکشنز شامل کی گئی تھیں۔

یہ دیکھنے کے لیے کہ کتنی دراصل کامیاب ہوئیں، ہم کامیاب ٹرانزیکشنز کو گننے کے لیے ایک اور فلٹر شامل کریں گے:

```sql
WITH temp_table AS (
    SELECT * FROM ethereum."transactions"
    WHERE block_number = 12396854 AND success = true
    ORDER BY block_time DESC
)
SELECT
    COUNT(success) AS num_successful_txn
FROM temp_table
```

بلاک 12396854 کے لیے، کل 222 ٹرانزیکشنز میں سے، 204 کامیابی کے ساتھ تصدیق شدہ تھیں:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

ٹرانزیکشنز کی درخواستیں فی سیکنڈ درجنوں بار ہوتی ہیں، لیکن بلاکس تقریباً ہر 15 سیکنڈ میں ایک بار کمٹ کیے جاتے ہیں ([ذریعہ](/developers/docs/blocks/))۔

یہ دیکھنے کے لیے کہ تقریباً ہر 15 سیکنڈ میں ایک بلاک تیار ہوتا ہے، ہم ایک دن میں سیکنڈز کی تعداد (86400) کو 15 سے تقسیم کر سکتے ہیں تاکہ روزانہ بلاکس کی تخمینی اوسط تعداد (~ 5760) حاصل کی جا سکے۔

روزانہ تیار ہونے والے ایتھیریم بلاکس (2016 - حال) کا چارٹ یہ ہے:

![Chart showing daily Ethereum block production](./daily_blocks.png)

اس وقت کے دوران روزانہ تیار ہونے والے بلاکس کی اوسط تعداد ~5,874 ہے:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

کیوریز یہ ہیں:

```sql
# query to visualize number of blocks produced daily since 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# average number of blocks produced per day

WITH temp_table AS (
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
)
SELECT
    AVG(block_count) AS avg_block_count
FROM temp_table
```

2016 سے روزانہ تیار ہونے والے بلاکس کی اوسط تعداد اس تعداد سے قدرے زیادہ 5,874 ہے۔ متبادل طور پر، 86400 سیکنڈز کو 5874 اوسط بلاکس سے تقسیم کرنے پر 14.7 سیکنڈز یا تقریباً ہر 15 سیکنڈ میں ایک بلاک آتا ہے۔

### گیس {#gas}

بلاکس سائز میں محدود ہوتے ہیں۔ زیادہ سے زیادہ بلاک سائز ڈائنامک ہوتا ہے اور نیٹ ورک کی طلب کے مطابق 12,500,000 اور 25,000,000 یونٹس کے درمیان مختلف ہوتا ہے۔ صوابدیدی طور پر بڑے بلاک سائزز کو ڈسک اسپیس اور رفتار کی ضروریات کے لحاظ سے فل نوڈز پر دباؤ ڈالنے سے روکنے کے لیے حدود درکار ہیں ([ذریعہ](/developers/docs/blocks/))۔

بلاک گیس کی حد کو تصور کرنے کا ایک طریقہ یہ ہے کہ اسے دستیاب بلاک اسپیس کی **سپلائی** کے طور پر سوچا جائے جس میں ٹرانزیکشنز کو بیچ (batch) کیا جاتا ہے۔ بلاک گیس کی حد کی 2016 سے آج تک کیوری اور تصور کیا جا سکتا ہے:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

پھر روزانہ استعمال ہونے والی اصل گیس ہے جو ایتھیریم چین پر کی جانے والی کمپیوٹنگ (یعنی ٹرانزیکشن بھیجنا، اسمارٹ کانٹریکٹ کو کال کرنا، NFT منٹ کرنا) کی ادائیگی کے لیے استعمال ہوتی ہے۔ یہ دستیاب ایتھیریم بلاک اسپیس کی **طلب (demand)** ہے:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

ہم ان دونوں چارٹس کو ایک ساتھ رکھ کر یہ بھی دیکھ سکتے ہیں کہ **طلب اور رسد (demand and supply)** کیسے ہم آہنگ ہوتے ہیں:

![gas_demand_supply](./gas_demand_supply.png)

لہذا ہم دستیاب سپلائی کو دیکھتے ہوئے، ایتھیریم بلاک اسپیس کی طلب کے فنکشن کے طور پر گیس کی قیمتوں کو سمجھ سکتے ہیں۔

آخر میں، ہم ایتھیریم چین کے لیے اوسط روزانہ گیس کی قیمتوں کی کیوری کرنا چاہ سکتے ہیں، تاہم، ایسا کرنے کے نتیجے میں کیوری کا وقت خاص طور پر طویل ہو جائے گا، اس لیے ہم اپنی کیوری کو ایتھیریم فاؤنڈیشن کی جانب سے فی ٹرانزیکشن ادا کی جانے والی گیس کی اوسط مقدار تک فلٹر کریں گے۔

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

ہم سالوں کے دوران ایتھیریم فاؤنڈیشن کے ایڈریس پر کی گئی تمام ٹرانزیکشنز کے لیے ادا کی گئی گیس کی قیمتیں دیکھ سکتے ہیں۔ کیوری یہ ہے:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### خلاصہ {#summary}

اس ٹیوٹوریل کے ساتھ، ہم ایتھیریم کے بنیادی تصورات کو سمجھتے ہیں اور یہ کہ ایتھیریم بلاک چین آن چین ڈیٹا کی کیوری کر کے اور اسے محسوس کر کے کیسے کام کرتی ہے۔

وہ ڈیش بورڈ جس میں اس ٹیوٹوریل میں استعمال ہونے والا تمام کوڈ موجود ہے [یہاں](https://dune.com/paulapivat/Learn-Ethereum) پایا جا سکتا ہے۔

ویب 3 کو دریافت کرنے کے لیے ڈیٹا کے مزید استعمال کے لیے [مجھے ٹوئٹر پر تلاش کریں](https://twitter.com/paulapivat)۔