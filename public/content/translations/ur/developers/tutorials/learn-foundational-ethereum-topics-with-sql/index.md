---
title: "⁦SQL⁩ کے ساتھ بنیادی ایتھیریم موضوعات سیکھیں"
description: "یہ ٹیوٹوریل قارئین کو سٹرکچرڈ کوئری لینگویج (⁦SQL⁩) کے ساتھ آن چین ڈیٹا کی کوئری کر کے ٹرانزیکشنز، بلاکس اور گیس سمیت بنیادی ایتھیریم تصورات کو سمجھنے میں مدد کرتا ہے۔"
author: "پال ایپیوت"
tags: ["SQL", "کوئری کرنا", "ٹرانزیکشنز", "ڈیٹا اور تجزیات"]
skill: beginner
breadcrumb: "ایتھیریم ⁦SQL⁩ کے ساتھ"
lang: ur
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

بہت سے ایتھیریم ٹیوٹوریلز ڈیولپرز کو ہدف بناتے ہیں، لیکن ڈیٹا تجزیہ کاروں یا ان لوگوں کے لیے تعلیمی وسائل کی کمی ہے جو کلائنٹ یا نوڈ چلائے بغیر آن چین ڈیٹا دیکھنا چاہتے ہیں۔

یہ ٹیوٹوریل قارئین کو [Dune Analytics](https://dune.com/) کے فراہم کردہ انٹرفیس کے ذریعے سٹرکچرڈ کوئری لینگویج (<span dir="ltr">SQL</span>) کے ساتھ آن چین ڈیٹا کی کوئری کر کے ٹرانزیکشنز، بلاکس اور گیس سمیت بنیادی ایتھیریم تصورات کو سمجھنے میں مدد کرتا ہے۔

آن چین ڈیٹا ہمیں ایتھیریم، نیٹ ورک، اور کمپیوٹنگ پاور کے لیے ایک معیشت کے طور پر سمجھنے میں مدد کر سکتا ہے اور اسے آج ایتھیریم کو درپیش چیلنجز (یعنی گیس کی بڑھتی ہوئی قیمتوں) اور، اس سے بھی اہم بات، اسکیلنگ سلوشنز کے بارے میں بات چیت کو سمجھنے کے لیے ایک بنیاد کے طور پر کام کرنا چاہیے۔

### ٹرانزیکشنز {#transactions}

ایتھیریم پر صارف کا سفر صارف کے زیر کنٹرول اکاؤنٹ یا <span dir="ltr">ETH</span> بیلنس والی ہستی کو شروع کرنے سے شروع ہوتا ہے۔ اکاؤنٹ کی دو اقسام ہیں - صارف کے زیر کنٹرول یا سمارٹ کنٹریکٹ ([ethereum.org](/developers/docs/accounts/) دیکھیں)۔

کسی بھی اکاؤنٹ کو بلاک ایکسپلورر جیسے [Etherscan](https://etherscan.io/) یا [Blockscout](https://eth.blockscout.com/) پر دیکھا جا سکتا ہے۔ بلاک ایکسپلوررز ایتھیریم کے ڈیٹا کا ایک پورٹل ہیں۔ وہ ریئل ٹائم میں بلاکس، ٹرانزیکشنز، کان کنوں، اکاؤنٹس اور دیگر آن چین سرگرمیوں کا ڈیٹا دکھاتے ہیں ([یہاں](/developers/docs/data-and-analytics/block-explorers/) دیکھیں)۔

تاہم، ایک صارف بیرونی بلاک ایکسپلوررز کی طرف سے فراہم کردہ معلومات کو ہم آہنگ کرنے کے لیے براہ راست ڈیٹا کی کوئری کرنا چاہ سکتا ہے۔ [Dune Analytics](https://dune.com/) یہ صلاحیت ہر اس شخص کو فراہم کرتا ہے جسے <span dir="ltr">SQL</span> کا کچھ علم ہو۔

حوالے کے لیے، ایتھیریم فاؤنڈیشن (<span dir="ltr">EF</span>) کا سمارٹ کنٹریکٹ اکاؤنٹ [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) پر دیکھا جا سکتا ہے۔

ایک بات نوٹ کرنے کی ہے کہ تمام اکاؤنٹس، بشمول <span dir="ltr">EF</span> کے، کا ایک عوامی پتہ ہوتا ہے جسے ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے استعمال کیا جا سکتا ہے۔

Etherscan پر اکاؤنٹ کا بیلنس باقاعدہ ٹرانزیکشنز اور اندرونی ٹرانزیکشنز پر مشتمل ہوتا ہے۔ اندرونی ٹرانزیکشنز، نام کے باوجود، _اصل_ ٹرانزیکشنز نہیں ہیں جو چین کی حالت کو تبدیل کرتی ہیں۔ وہ کنٹریکٹ کو نافذ کر کے شروع کی گئی قدر کی منتقلی ہیں ([ذریعہ](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions))۔ چونکہ اندرونی ٹرانزیکشنز کا کوئی دستخط نہیں ہوتا، اس لیے وہ بلاک چین پر شامل **نہیں** ہوتیں اور Dune Analytics کے ساتھ ان کی کوئری نہیں کی جا سکتی۔

لہذا، یہ ٹیوٹوریل باقاعدہ ٹرانزیکشنز پر توجہ مرکوز کرے گا۔ اس کی کوئری اس طرح کی جا سکتی ہے:

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

اس سے وہی معلومات حاصل ہوں گی جو Etherscan کے ٹرانزیکشن صفحہ پر فراہم کی گئی ہیں۔ موازنہ کے لیے، یہاں دو ذرائع ہیں:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Blockscout پر EF کا کنٹریکٹ صفحہ۔](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

آپ ڈیش بورڈ [یہاں](https://dune.com/paulapivat/Learn-Ethereum) تلاش کر سکتے ہیں۔ کوئری دیکھنے کے لیے ٹیبل پر کلک کریں (اوپر بھی دیکھیں)۔

### ٹرانزیکشنز کی تفصیل {#breaking-down-transactions}

جمع کرائی گئی ٹرانزیکشن میں کئی معلومات شامل ہوتی ہیں بشمول ([ذریعہ](/developers/docs/transactions/)):

- **وصول کنندہ**: وصول کرنے والا پتہ ("to" کے طور پر کوئری کیا گیا)
- **دستخط**: اگرچہ بھیجنے والے کی نجی کیز ٹرانزیکشن پر دستخط کرتی ہیں، لیکن ہم <span dir="ltr">SQL</span> کے ساتھ جو کوئری کر سکتے ہیں وہ بھیجنے والے کا عوامی پتہ ("from") ہے۔
- **قدر**: یہ منتقل کی گئی <span dir="ltr">ETH</span> کی رقم ہے (`ether` کالم دیکھیں)۔
- **ڈیٹا**: یہ صوابدیدی ڈیٹا ہے جسے ہیش کیا گیا ہے (`data` کالم دیکھیں)
- **gasLimit** – گیس یونٹس کی زیادہ سے زیادہ مقدار جو ٹرانزیکشن کے ذریعے استعمال کی جا سکتی ہے۔ گیس کے یونٹس کمپیوٹیشنل مراحل کی نمائندگی کرتے ہیں
- **maxPriorityFeePerGas** - کان کن کو ٹپ کے طور پر شامل کی جانے والی گیس کی زیادہ سے زیادہ مقدار
- **maxFeePerGas** - ٹرانزیکشن کے لیے ادا کی جانے والی گیس کی زیادہ سے زیادہ مقدار (بشمول baseFeePerGas اور maxPriorityFeePerGas)

ہم ایتھیریم فاؤنڈیشن کے عوامی پتہ پر ہونے والی ٹرانزیکشنز کے لیے ان مخصوص معلومات کی کوئری کر سکتے ہیں:

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

ہر ٹرانزیکشن ایتھیریم ورچوئل مشین ([EVM](/developers/docs/evm/)) کی حالت کو تبدیل کر دے گی ([ذریعہ](/developers/docs/transactions/))۔ ٹرانزیکشنز کو نیٹ ورک پر نشر کیا جاتا ہے تاکہ ان کی تصدیق کی جا سکے اور انہیں ایک بلاک میں شامل کیا جا سکے۔ ہر ٹرانزیکشن ایک بلاک نمبر سے وابستہ ہوتی ہے۔ ڈیٹا دیکھنے کے لیے، ہم ایک مخصوص بلاک نمبر کی کوئری کر سکتے ہیں: <span dir="ltr">12396854</span> (اس تحریر کے وقت، <span dir="ltr">11/5/21</span> تک ایتھیریم فاؤنڈیشن کی ٹرانزیکشنز میں سب سے حالیہ بلاک)۔

مزید برآں، جب ہم اگلے دو بلاکس کی کوئری کرتے ہیں، تو ہم دیکھ سکتے ہیں کہ ہر بلاک میں پچھلے بلاک کا ہیش (یعنی پیرنٹ ہیش) ہوتا ہے، جو یہ واضح کرتا ہے کہ بلاک چین کیسے بنتی ہے۔

ہر بلاک میں اس کے پیرنٹ بلاک کا حوالہ ہوتا ہے۔ یہ نیچے `hash` اور `parent_hash` کالمز کے درمیان دکھایا گیا ہے ([ذریعہ](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Dune Analytics پر [کوئری](https://dune.com/queries/44856/88292) یہ ہے:

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

ہم وقت، بلاک نمبر، دشواری، ہیش، پیرنٹ ہیش، اور نانس کی کوئری کر کے ایک بلاک کا جائزہ لے سکتے ہیں۔

واحد چیز جو یہ کوئری کور نہیں کرتی وہ _ٹرانزیکشنز کی فہرست_ ہے جس کے لیے نیچے ایک الگ کوئری کی ضرورت ہے اور _سٹیٹ روٹ_۔ ایک مکمل یا آرکائیول نوڈ تمام ٹرانزیکشنز اور حالت کی تبدیلیوں کو محفوظ کرے گا، جس سے کلائنٹس کسی بھی وقت چین کی حالت کی کوئری کر سکیں گے۔ چونکہ اس کے لیے بڑی سٹوریج کی جگہ درکار ہوتی ہے، اس لیے ہم چین کے ڈیٹا کو حالت کے ڈیٹا سے الگ کر سکتے ہیں:

- چین کا ڈیٹا (بلاکس، ٹرانزیکشنز کی فہرست)
- حالت کا ڈیٹا (ہر ٹرانزیکشن کی حالت کی تبدیلی کا نتیجہ)

سٹیٹ روٹ مؤخر الذکر میں آتا ہے اور یہ _پوشیدہ_ ڈیٹا ہے (آن چین محفوظ نہیں ہوتا)، جبکہ چین کا ڈیٹا واضح ہوتا ہے اور خود چین پر محفوظ ہوتا ہے ([ذریعہ](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored))۔

اس ٹیوٹوریل کے لیے، ہم آن چین ڈیٹا پر توجہ مرکوز کریں گے جس کی Dune Analytics کے ذریعے <span dir="ltr">SQL</span> کے ساتھ کوئری کی جا _سکتی_ ہے۔

جیسا کہ اوپر بیان کیا گیا ہے، ہر بلاک میں ٹرانزیکشنز کی ایک فہرست ہوتی ہے، ہم ایک مخصوص بلاک کو فلٹر کر کے اس کی کوئری کر سکتے ہیں۔ ہم سب سے حالیہ بلاک، <span dir="ltr">12396854</span> کو آزمائیں گے:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Dune پر <span dir="ltr">SQL</span> آؤٹ پٹ یہ ہے:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

چین میں شامل ہونے والا یہ واحد بلاک ایتھیریم ورچوئل مشین ([EVM](/developers/docs/evm/)) کی حالت کو تبدیل کر دیتا ہے۔ بیسیوں اور بعض اوقات، سینکڑوں ٹرانزیکشنز کی ایک ساتھ تصدیق کی جاتی ہے۔ اس مخصوص معاملے میں، <span dir="ltr">222</span> ٹرانزیکشنز شامل تھیں۔

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

بلاک <span dir="ltr">12396854</span> کے لیے، کل <span dir="ltr">222</span> ٹرانزیکشنز میں سے، <span dir="ltr">204</span> کی کامیابی سے تصدیق کی گئی:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

ٹرانزیکشنز کی درخواستیں فی سیکنڈ درجنوں بار ہوتی ہیں، لیکن بلاکس تقریباً ہر <span dir="ltr">15</span> سیکنڈ میں ایک بار کمٹ کیے جاتے ہیں ([ذریعہ](/developers/docs/blocks/))۔

یہ دیکھنے کے لیے کہ تقریباً ہر <span dir="ltr">15</span> سیکنڈ میں ایک بلاک تیار ہوتا ہے، ہم ایک دن میں سیکنڈز کی تعداد (<span dir="ltr">86400</span>) کو <span dir="ltr">15</span> سے تقسیم کر کے روزانہ بلاکس کی تخمینی اوسط تعداد (<span dir="ltr">~ 5760</span>) حاصل کر سکتے ہیں۔

روزانہ تیار ہونے والے ایتھیریم بلاکس کا چارٹ (<span dir="ltr">2016</span> - موجودہ) یہ ہے:

![Chart showing daily Ethereum block production](./daily_blocks.png)

اس وقت کے دوران روزانہ تیار ہونے والے بلاکس کی اوسط تعداد <span dir="ltr">~5,874</span> ہے:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

کوئریز یہ ہیں:

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

<span dir="ltr">2016</span> سے روزانہ تیار ہونے والے بلاکس کی اوسط تعداد اس تعداد سے قدرے زیادہ <span dir="ltr">5,874</span> ہے۔ متبادل طور پر، <span dir="ltr">86400</span> سیکنڈز کو <span dir="ltr">5874</span> اوسط بلاکس سے تقسیم کرنے پر <span dir="ltr">14.7</span> سیکنڈز یا تقریباً ہر <span dir="ltr">15</span> سیکنڈ میں ایک بلاک آتا ہے۔

### گیس {#gas}

بلاکس سائز میں محدود ہوتے ہیں۔ زیادہ سے زیادہ بلاک کا سائز متحرک ہوتا ہے اور نیٹ ورک کی مانگ کے مطابق <span dir="ltr">12,500,000</span> اور <span dir="ltr">25,000,000</span> یونٹس کے درمیان مختلف ہوتا ہے۔ صوابدیدی طور پر بڑے بلاک سائزز کو ڈسک کی جگہ اور رفتار کی ضروریات کے لحاظ سے مکمل نوڈز پر دباؤ ڈالنے سے روکنے کے لیے حدود درکار ہوتی ہیں ([ذریعہ](/developers/docs/blocks/))۔

بلاک گیس کی حد کا تصور کرنے کا ایک طریقہ یہ ہے کہ اسے دستیاب بلاک کی جگہ کی **سپلائی** کے طور پر سوچا جائے جس میں ٹرانزیکشنز کو بیچ کیا جا سکے۔ بلاک گیس کی حد کی کوئری کی جا سکتی ہے اور اسے <span dir="ltr">2016</span> سے آج تک دیکھا جا سکتا ہے:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

پھر ایتھیریم چین پر کی جانے والی کمپیوٹنگ (یعنی ٹرانزیکشن بھیجنا، سمارٹ کنٹریکٹ کو کال کرنا، <span dir="ltr">NFT</span> کی ڈھلائی کرنا) کی ادائیگی کے لیے روزانہ استعمال ہونے والی اصل گیس ہے۔ یہ دستیاب ایتھیریم بلاک کی جگہ کی **مانگ** ہے:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

ہم ان دونوں چارٹس کو ایک ساتھ رکھ کر یہ بھی دیکھ سکتے ہیں کہ **مانگ اور سپلائی** کیسے ہم آہنگ ہوتی ہیں:

![gas_demand_supply](./gas_demand_supply.png)

لہذا ہم دستیاب سپلائی کو دیکھتے ہوئے، گیس کی قیمتوں کو ایتھیریم بلاک کی جگہ کی مانگ کے فنکشن کے طور پر سمجھ سکتے ہیں۔

آخر میں، ہم ایتھیریم چین کے لیے روزانہ گیس کی اوسط قیمتوں کی کوئری کرنا چاہ سکتے ہیں، تاہم، ایسا کرنے کے نتیجے میں کوئری کا وقت خاص طور پر طویل ہو جائے گا، اس لیے ہم اپنی کوئری کو ایتھیریم فاؤنڈیشن کی طرف سے فی ٹرانزیکشن ادا کی جانے والی گیس کی اوسط مقدار تک فلٹر کریں گے۔

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

ہم سالوں کے دوران ایتھیریم فاؤنڈیشن کے پتہ پر کی جانے والی تمام ٹرانزیکشنز کے لیے ادا کی گئی گیس کی قیمتیں دیکھ سکتے ہیں۔ کوئری یہ ہے:

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

اس ٹیوٹوریل کے ساتھ، ہم آن چین ڈیٹا کی کوئری کر کے اور اس کا اندازہ لگا کر بنیادی ایتھیریم تصورات اور ایتھیریم بلاک چین کے کام کرنے کے طریقے کو سمجھتے ہیں۔

وہ ڈیش بورڈ جس میں اس ٹیوٹوریل میں استعمال ہونے والا تمام کوڈ موجود ہے [یہاں](https://dune.com/paulapivat/Learn-Ethereum) پایا جا سکتا ہے۔

Web3 کو دریافت کرنے کے لیے ڈیٹا کے مزید استعمال کے لیے [مجھے ٹوئٹر پر تلاش کریں](https://twitter.com/paulapivat)۔