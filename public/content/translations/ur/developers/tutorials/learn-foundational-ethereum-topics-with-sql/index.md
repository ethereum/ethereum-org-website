---
title: "⁦SQL⁩ کے ساتھ ایتھیریم کے بنیادی موضوعات سیکھیں"
description: "یہ ٹیوٹوریل قارئین کو سٹرکچرڈ کوئری لینگویج (⁦SQL⁩) کے ساتھ آن چین ڈیٹا کی کوئری کر کے ٹرانزیکشنز، بلاکس اور گیس سمیت ایتھیریم کے بنیادی تصورات کو سمجھنے میں مدد کرتا ہے۔"
author: "پال اپیوت"
tags: ["SQL", "کوئری کرنا", "ٹرانزیکشنز", "ڈیٹا اور تجزیات"]
skill: beginner
breadcrumb: "ایتھیریم ⁦SQL⁩ کے ساتھ"
lang: ur
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://web.archive.org/web/20260516182620/https://paulapivat.com/post/query_ethereum/
---

بہت سے ایتھیریم ٹیوٹوریلز ڈیولپرز کو ہدف بناتے ہیں، لیکن ڈیٹا تجزیہ کاروں یا ان لوگوں کے لیے تعلیمی وسائل کی کمی ہے جو کلائنٹ یا نوڈ چلائے بغیر آن چین ڈیٹا دیکھنا چاہتے ہیں۔

یہ ٹیوٹوریل قارئین کو [Dune](https://dune.com/) کے فراہم کردہ انٹرفیس کے ذریعے سٹرکچرڈ کوئری لینگویج (<span dir="ltr">SQL</span>) کے ساتھ آن چین ڈیٹا کی کوئری کر کے ٹرانزیکشنز، بلاکس اور گیس سمیت ایتھیریم کے بنیادی تصورات کو سمجھنے میں مدد کرتا ہے۔ یہ کوئریز [DuneSQL](https://docs.dune.com/query-engine/overview) کا استعمال کرتی ہیں، جو Dune کا <span dir="ltr">SQL</span> ڈائلیکٹ ہے۔

آن چین ڈیٹا ہمیں ایتھیریم، نیٹ ورک، اور کمپیوٹنگ پاور کی معیشت کے طور پر سمجھنے میں مدد کر سکتا ہے اور اسے آج ایتھیریم کو درپیش چیلنجز (جیسے، گیس کی بڑھتی ہوئی قیمتوں) اور، اس سے بھی اہم بات، اسکیلنگ سلوشنز کے بارے میں بات چیت کو سمجھنے کے لیے ایک بنیاد کے طور پر کام کرنا چاہیے۔

### ٹرانزیکشنز {#transactions}

ایتھیریم پر صارف کا سفر صارف کے زیر کنٹرول اکاؤنٹ یا <span dir="ltr">ETH</span> بیلنس والی ہستی کو شروع کرنے سے شروع ہوتا ہے۔ اکاؤنٹ کی دو اقسام ہیں - صارف کے زیر کنٹرول یا سمارٹ کنٹریکٹ ([ethereum.org](/developers/docs/accounts/) دیکھیں)۔

کسی بھی اکاؤنٹ کو بلاک ایکسپلورر جیسے [Etherscan](https://etherscan.io/) یا [Blockscout](https://eth.blockscout.com/) پر دیکھا جا سکتا ہے۔ بلاک ایکسپلوررز ایتھیریم کے ڈیٹا کا ایک پورٹل ہیں۔ وہ ریئل ٹائم میں بلاکس، ٹرانزیکشنز، توثیق کاروں، اکاؤنٹس اور دیگر آن چین سرگرمیوں کا ڈیٹا دکھاتے ہیں ([یہاں](/developers/docs/data-and-analytics/block-explorers/) دیکھیں)۔

تاہم، ایک صارف بیرونی بلاک ایکسپلوررز کی طرف سے فراہم کردہ معلومات کی تصدیق کے لیے براہ راست ڈیٹا کی کوئری کرنا چاہ سکتا ہے۔ [Dune](https://dune.com/) یہ صلاحیت ہر اس شخص کو فراہم کرتا ہے جسے <span dir="ltr">SQL</span> کا کچھ علم ہو۔

حوالے کے لیے، ایتھیریم فاؤنڈیشن (<span dir="ltr">EF</span>) کا سمارٹ کنٹریکٹ اکاؤنٹ [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) پر دیکھا جا سکتا ہے۔

ایک بات نوٹ کرنے کی ہے کہ تمام اکاؤنٹس، بشمول <span dir="ltr">EF</span> کے، کا ایک عوامی پتہ ہوتا ہے جسے ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے استعمال کیا جا سکتا ہے۔

Etherscan پر اکاؤنٹ کا بیلنس باقاعدہ ٹرانزیکشنز اور اندرونی ٹرانزیکشنز پر مشتمل ہوتا ہے۔ اندرونی ٹرانزیکشنز، نام کے باوجود، _اصل_ ٹرانزیکشنز نہیں ہیں جو چین کی حالت کو تبدیل کرتی ہیں۔ وہ کنٹریکٹ کو نافذ کرنے سے شروع ہونے والی ویلیو ٹرانسفرز ہیں ([ذریعہ](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions))۔ چونکہ اندرونی ٹرانزیکشنز کا کوئی دستخط نہیں ہوتا، اس لیے انہیں بلاک چین پر ٹرانزیکشنز کے طور پر شامل **نہیں** کیا جاتا۔ Dune انہیں الگ سے، `ethereum.traces` ٹیبل میں ریکارڈ کرتا ہے۔

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
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
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

نوٹ کریں کہ پتے بغیر کوٹس کے `0x...` لٹرلز کے طور پر لکھے جاتے ہیں۔ DuneSQL میں، پتے اور ہیشز بائنری ویلیوز ہیں، سٹرنگز نہیں۔

اس سے وہی معلومات حاصل ہوں گی جو Etherscan کے ٹرانزیکشن صفحہ پر فراہم کی گئی ہیں۔ موازنہ کے لیے، یہاں دو ذرائع ہیں:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Blockscout پر EF کا کنٹریکٹ صفحہ۔](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune {#dune-analytics}

![Screenshot of a Dune query dashboard](./dune_view.png)

آپ ڈیش بورڈ [یہاں](https://dune.com/paulapivat/Learn-Ethereum) تلاش کر سکتے ہیں۔ کوئری دیکھنے کے لیے ٹیبل پر کلک کریں (اوپر بھی دیکھیں)۔

### ٹرانزیکشنز کا تجزیہ {#breaking-down-transactions}

جمع کرائی گئی ٹرانزیکشن میں کئی معلومات شامل ہوتی ہیں جن میں یہ شامل ہیں ([ذریعہ](/developers/docs/transactions/)):

- **وصول کنندہ**: وصول کرنے والا پتہ ("to" کے طور پر کوئری کیا گیا)
- **دستخط**: اگرچہ بھیجنے والے کی پرائیویٹ کیز ٹرانزیکشن پر دستخط کرتی ہیں، لیکن ہم <span dir="ltr">SQL</span> کے ساتھ بھیجنے والے کے عوامی پتے ("from") کی کوئری کر سکتے ہیں۔
- **ویلیو**: یہ منتقل کی گئی <span dir="ltr">ETH</span> کی رقم ہے (`ether` کالم دیکھیں)۔
- **ڈیٹا**: یہ صوابدیدی ڈیٹا ہے جسے ہیش کیا گیا ہے (`data` کالم دیکھیں)
- **gasLimit** – گیس یونٹس کی زیادہ سے زیادہ مقدار جو ٹرانزیکشن کے ذریعے استعمال کی جا سکتی ہے۔ گیس کے یونٹس کمپیوٹیشنل مراحل کی نمائندگی کرتے ہیں
- **maxPriorityFeePerGas** - توثیق کار کو ٹپ کے طور پر شامل کی جانے والی گیس کی زیادہ سے زیادہ مقدار
- **maxFeePerGas** - ٹرانزیکشن کے لیے ادا کی جانے والی گیس کی زیادہ سے زیادہ مقدار (جس میں baseFeePerGas اور maxPriorityFeePerGas شامل ہیں)

ہم ایتھیریم فاؤنڈیشن کے عوامی پتے پر ہونے والی ٹرانزیکشنز کے لیے ان مخصوص معلومات کی کوئری کر سکتے ہیں:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(CAST(gas_used AS DOUBLE) / gas_limit * 100, 2) AS gas_used_pct
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

`CAST` ضروری ہے کیونکہ DuneSQL میں ایک انٹیجر کو دوسرے سے تقسیم کرنے پر انٹیجر نتیجہ ملتا ہے، جو تقریباً ہر فیصد کو صفر تک راؤنڈ ڈاؤن کر دے گا۔

### بلاکس {#blocks}

ہر ٹرانزیکشن ایتھیریم ورچوئل مشین ([<span dir="ltr">EVM</span>](/developers/docs/evm/)) کی حالت کو تبدیل کر دے گی ([ذریعہ](/developers/docs/transactions/))۔ ٹرانزیکشنز کو نیٹ ورک پر نشر کیا جاتا ہے تاکہ ان کی تصدیق کی جا سکے اور انہیں ایک بلاک میں شامل کیا جا سکے۔ ہر ٹرانزیکشن ایک بلاک نمبر سے وابستہ ہوتی ہے۔ ڈیٹا دیکھنے کے لیے، ہم ایک مخصوص بلاک نمبر کی کوئری کر سکتے ہیں: <span dir="ltr">12396854</span> (مئی <span dir="ltr">2021</span> میں لکھتے وقت ایتھیریم فاؤنڈیشن کی ٹرانزیکشنز میں سب سے حالیہ بلاک)۔

مزید برآں، جب ہم اگلے دو بلاکس کی کوئری کرتے ہیں، تو ہم دیکھ سکتے ہیں کہ ہر بلاک میں پچھلے بلاک کا ہیش (یعنی پیرنٹ ہیش) ہوتا ہے، جو یہ واضح کرتا ہے کہ بلاک چین کیسے بنتی ہے۔

ہر بلاک میں اس کے پیرنٹ بلاک کا حوالہ ہوتا ہے۔ یہ نیچے `hash` اور `parent_hash` کالمز کے درمیان دکھایا گیا ہے ([ذریعہ](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

کوئری یہ ہے:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum.blocks
WHERE number IN (12396854, 12396855, 12396856)
```

ہم وقت، بلاک نمبر، ہیش، پیرنٹ ہیش، اور نانس کی کوئری کر کے ایک بلاک کا جائزہ لے سکتے ہیں۔ بلاک <span dir="ltr">12396854</span> [دی مرج](/roadmap/merge/) سے پہلے تیار کیا گیا تھا، جب بلاکس کو ثبوتِ کار (PoW) کے ساتھ مائن کیا جاتا تھا اور نانس بامعنی تھا۔ حصہ داری کا ثبوت (PoS) بلاکس میں نانس ہمیشہ صفر ہوتا ہے۔

واحد چیز جو یہ کوئری کور نہیں کرتی وہ _ٹرانزیکشنز کی فہرست_ ہے جس کے لیے نیچے ایک الگ کوئری کی ضرورت ہے اور _سٹیٹ روٹ_ ہے۔ ایک مکمل یا آرکائیول نوڈ تمام ٹرانزیکشنز اور حالت کی تبدیلیوں کو محفوظ کرے گا، جس سے کلائنٹس کسی بھی وقت چین کی حالت کی کوئری کر سکیں گے۔ چونکہ اس کے لیے ذخیرہ کرنے کی بڑی جگہ درکار ہوتی ہے، اس لیے ہم چین کے ڈیٹا کو حالت کے ڈیٹا سے الگ کر سکتے ہیں:

- چین کا ڈیٹا (بلاکس، ٹرانزیکشنز کی فہرست)
- حالت کا ڈیٹا (ہر ٹرانزیکشن کی حالت کی تبدیلی کا نتیجہ)

سٹیٹ روٹ مؤخر الذکر میں آتا ہے اور یہ _پوشیدہ_ ڈیٹا ہے (آن چین محفوظ نہیں ہوتا)، جبکہ چین کا ڈیٹا واضح ہوتا ہے اور خود چین پر محفوظ ہوتا ہے ([ذریعہ](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored))۔

اس ٹیوٹوریل کے لیے، ہم آن چین ڈیٹا پر توجہ مرکوز کریں گے جس کی Dune کے ذریعے <span dir="ltr">SQL</span> کے ساتھ کوئری کی جا _سکتی_ ہے۔

جیسا کہ اوپر بیان کیا گیا ہے، ہر بلاک میں ٹرانزیکشنز کی ایک فہرست ہوتی ہے، ہم ایک مخصوص بلاک کے لیے فلٹر کر کے اس کی کوئری کر سکتے ہیں۔ ہم بلاک <span dir="ltr">12396854</span> کو آزمائیں گے:

```sql
SELECT * FROM ethereum.transactions
WHERE block_number = 12396854
```

Dune پر <span dir="ltr">SQL</span> آؤٹ پٹ یہ ہے:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

چین میں شامل ہونے والا یہ واحد بلاک ایتھیریم ورچوئل مشین ([<span dir="ltr">EVM</span>](/developers/docs/evm/)) کی حالت کو تبدیل کر دیتا ہے۔ بعض اوقات درجنوں، سینکڑوں ٹرانزیکشنز کی ایک ساتھ تصدیق کی جاتی ہے۔ اس مخصوص معاملے میں، <span dir="ltr">222</span> ٹرانزیکشنز شامل تھیں۔

یہ دیکھنے کے لیے کہ کتنی دراصل کامیاب ہوئیں، ہم کامیاب ٹرانزیکشنز کو گننے کے لیے ایک اور فلٹر شامل کریں گے:

```sql
SELECT
    COUNT(*) AS num_successful_txn
FROM ethereum.transactions
WHERE block_number = 12396854 AND success = true
```

بلاک <span dir="ltr">12396854</span> کے لیے، کل <span dir="ltr">222</span> ٹرانزیکشنز میں سے، <span dir="ltr">204</span> کی کامیابی سے تصدیق کی گئی:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

ٹرانزیکشن کی درخواستیں فی سیکنڈ درجنوں بار ہوتی ہیں، لیکن بلاکس صرف وقفے وقفے سے شامل کیے جاتے ہیں ([ذریعہ](/developers/docs/blocks/))۔ ثبوتِ کار (PoW) کے تحت، ایک بلاک اوسطاً ہر <span dir="ltr">13</span> سے <span dir="ltr">15</span> سیکنڈ میں مائن کیا جاتا تھا، جس میں بہت زیادہ تغیر ہوتا تھا۔ ستمبر <span dir="ltr">2022</span> میں [دی مرج](/roadmap/merge/) کے بعد سے، حصہ داری کا ثبوت (PoS) وقت کو <span dir="ltr">12</span> سیکنڈ کے سلاٹس میں تقسیم کرتا ہے، اور ہر سلاٹ میں زیادہ سے زیادہ ایک بلاک ہو سکتا ہے۔

لہذا آج روزانہ زیادہ سے زیادہ <span dir="ltr">86400 / 12 = 7200</span> بلاکس ہو سکتے ہیں۔ عملی طور پر یہ قدرے کم ہوتے ہیں، کیونکہ ایک توثیق کار کبھی کبھار اپنا سلاٹ کھو دیتا ہے۔

روزانہ تیار ہونے والے ایتھیریم بلاکس کا چارٹ (<span dir="ltr">2016 - 2021</span>) یہ ہے:

![Chart showing daily Ethereum block production](./daily_blocks.png)

اس وقت کے دوران روزانہ تیار ہونے والے بلاکس کی اوسط تعداد تقریباً <span dir="ltr">5,874</span> ہے:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

کوئریز یہ ہیں:

روزانہ تیار ہونے والے بلاکس کی تعداد کو دیکھنے کے لیے کوئری یہ ہے۔ `WHERE` کلاز موجودہ دن کو خارج کر دیتی ہے، جو ابھی ختم نہیں ہوا ہے۔

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

اور یہ کوئری دی مرج سے پہلے اور بعد میں، روزانہ تیار ہونے والے بلاکس کی اوسط تعداد کا حساب لگاتی ہے۔ بلاک <span dir="ltr">15537394</span> پہلا حصہ داری کا ثبوت (PoS) بلاک ہے۔

```sql
WITH daily AS (
    SELECT
        DATE_TRUNC('day', time) AS dt,
        MIN(number) >= 15537394 AS after_merge,
        COUNT(*) AS block_count
    FROM ethereum.blocks
    WHERE time < DATE_TRUNC('day', NOW())
    GROUP BY 1
)
SELECT
    after_merge,
    AVG(block_count) AS avg_block_count,
    86400 / AVG(block_count) AS avg_seconds_per_block
FROM daily
GROUP BY 1
```

جب یہ ٹیوٹوریل پہلی بار مئی <span dir="ltr">2021</span> میں لکھا گیا تھا، تو اوسط <span dir="ltr">5,874</span> بلاکس یومیہ تھی، یا ہر <span dir="ltr">14.7</span> سیکنڈ میں ایک بلاک۔ دی مرج کے بعد، اوسط <span dir="ltr">7200</span> کی زیادہ سے زیادہ حد سے بالکل نیچے ہے، تقریباً ہر <span dir="ltr">12</span> سیکنڈ میں ایک بلاک۔

### گیس {#gas}

بلاکس سائز میں محدود ہوتے ہیں۔ ہر بلاک کی گیس کی حد ہوتی ہے، اور [<span dir="ltr">EIP-1559</span>](/developers/docs/gas/#base-fee) کے بعد سے ہر بلاک کا ایک گیس ہدف بھی ہوتا ہے، جو حد کا نصف ہوتا ہے۔ جب بلاکس ہدف سے زیادہ گیس استعمال کرتے ہیں، تو بنیادی فیس بڑھ جاتی ہے، اور جب وہ کم استعمال کرتے ہیں، تو یہ کم ہو جاتی ہے۔ گیس کی حد کو خود توثیق کاروں کے ذریعے ایڈجسٹ کیا جاتا ہے، اور اسے سالوں کے دوران کئی بار بڑھایا گیا ہے۔ صوابدیدی طور پر بڑے بلاک سائزز کو ڈسک کی جگہ اور رفتار کی ضروریات کے لحاظ سے مکمل نوڈس پر دباؤ ڈالنے سے روکنے کے لیے حدود درکار ہیں ([ذریعہ](/developers/docs/blocks/))۔

بلاک گیس کی حد کو تصور کرنے کا ایک طریقہ یہ ہے کہ اسے دستیاب بلاک اسپیس کی **سپلائی** کے طور پر سوچا جائے جس میں ٹرانزیکشنز کو بیچ کیا جا سکے۔ بلاک گیس کی حد کی کوئری کی جا سکتی ہے اور اسے <span dir="ltr">2016</span> سے آج تک دیکھا جا سکتا ہے:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

پھر ایتھیریم چین پر کی جانے والی کمپیوٹنگ (یعنی ٹرانزیکشن بھیجنا، سمارٹ کنٹریکٹ کو کال کرنا، غیر متبادل ٹوکن (NFT) کی ڈھلائی کرنا) کی ادائیگی کے لیے روزانہ استعمال ہونے والی اصل گیس ہے۔ یہ دستیاب ایتھیریم بلاک اسپیس کی **ڈیمانڈ** ہے:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

ہم ان دونوں چارٹس کو ایک ساتھ رکھ کر یہ بھی دیکھ سکتے ہیں کہ **ڈیمانڈ اور سپلائی** کیسے ہم آہنگ ہوتے ہیں:

![gas_demand_supply](./gas_demand_supply.png)

لہذا ہم دستیاب سپلائی کو دیکھتے ہوئے، ایتھیریم بلاک اسپیس کی ڈیمانڈ کے فنکشن کے طور پر گیس کی قیمتوں کو سمجھ سکتے ہیں۔

آخر میں، ہم ایتھیریم چین کے لیے اوسط یومیہ گیس کی قیمتوں کی کوئری کرنا چاہ سکتے ہیں، تاہم، ایسا کرنے کے نتیجے میں کوئری کا وقت خاص طور پر طویل ہو جائے گا، اس لیے ہم اپنی کوئری کو ایتھیریم فاؤنڈیشن کی جانب سے فی ٹرانزیکشن ادا کی جانے والی گیس کی اوسط مقدار تک فلٹر کریں گے۔

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

ہم سالوں کے دوران ایتھیریم فاؤنڈیشن کے پتے پر کی گئی تمام ٹرانزیکشنز کے لیے ادا کی گئی گیس کی قیمتیں دیکھ سکتے ہیں۔ کوئری یہ ہے:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

### خلاصہ {#summary}

اس ٹیوٹوریل کے ساتھ، ہم ایتھیریم کے بنیادی تصورات کو سمجھتے ہیں اور یہ کہ ایتھیریم بلاک چین آن چین ڈیٹا کی کوئری کر کے اور اسے محسوس کر کے کیسے کام کرتی ہے۔

وہ ڈیش بورڈ جس میں اس ٹیوٹوریل میں استعمال ہونے والا تمام کوڈ موجود ہے [یہاں](https://dune.com/paulapivat/Learn-Ethereum) پایا جا سکتا ہے۔

Web3 کو دریافت کرنے کے لیے ڈیٹا کے مزید استعمال کے لیے [مجھے ٹوئٹر پر تلاش کریں](https://twitter.com/paulapivat)۔
