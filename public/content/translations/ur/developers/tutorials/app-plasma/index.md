---
title: "ایک ایپ کے لیے مخصوص پلازما لکھیں جو رازداری کو برقرار رکھے"
description: "اس ٹیوٹوریل میں، ہم ڈپازٹس کے لیے ایک نیم خفیہ بینک بناتے ہیں۔ بینک ایک مرکزی جزو ہے؛ یہ ہر صارف کے بیلنس کو جانتا ہے۔ تاہم، یہ معلومات آن چین محفوظ نہیں کی جاتی ہیں۔ اس کے بجائے، بینک حالت کا ایک ہیش پوسٹ کرتا ہے۔ جب بھی کوئی ٹرانزیکشن ہوتی ہے، بینک نیا ہیش پوسٹ کرتا ہے، اس کے ساتھ ایک صفر علم ثبوت بھی ہوتا ہے کہ اس کے پاس ایک دستخط شدہ ٹرانزیکشن ہے جو ہیش کی حالت کو نئی حالت میں تبدیل کرتی ہے۔ اس ٹیوٹوریل کو پڑھنے کے بعد، آپ نہ صرف یہ سمجھیں گے کہ صفر علم ثبوت کیسے استعمال کیے جاتے ہیں، بلکہ یہ بھی کہ آپ انہیں کیوں استعمال کرتے ہیں اور اسے محفوظ طریقے سے کیسے کیا جائے۔"
author: "اوری پومرانٹز"
tags:
  - صفر علم
  - سرور
  - آف چین
  - رازداری
skill: advanced
breadcrumb: "ایپ کے لیے مخصوص پلازما"
lang: ur
published: 2025-10-15
---

## تعارف {#introduction}

[رول اپس](/developers/docs/scaling/zk-rollups/) کے برعکس، [پلازما](/developers/docs/scaling/plasma) سالمیت کے لیے ایتھیریم مین نیٹ کا استعمال کرتے ہیں، لیکن دستیابی کے لیے نہیں۔ اس مضمون میں، ہم ایک ایسی ایپلی کیشن لکھتے ہیں جو پلازما کی طرح برتاؤ کرتی ہے، جس میں ایتھیریم سالمیت کی ضمانت دیتا ہے (کوئی غیر مجاز تبدیلیاں نہیں) لیکن دستیابی کی نہیں (ایک مرکزی جزو ڈاؤن ہو سکتا ہے اور پورے سسٹم کو غیر فعال کر سکتا ہے)۔

ہم یہاں جو ایپلی کیشن لکھتے ہیں وہ رازداری کو برقرار رکھنے والا بینک ہے۔ مختلف پتوں کے پاس بیلنس والے اکاؤنٹس ہوتے ہیں، اور وہ دوسرے اکاؤنٹس میں رقم (<span dir="ltr">ETH</span>) بھیج سکتے ہیں۔ بینک حالت (اکاؤنٹس اور ان کے بیلنس) اور ٹرانزیکشنز کے ہیش پوسٹ کرتا ہے، لیکن اصل بیلنس کو آف چین رکھتا ہے جہاں وہ نجی رہ سکتے ہیں۔

## ڈیزائن {#design}

یہ پروڈکشن کے لیے تیار سسٹم نہیں ہے، بلکہ سکھانے کا ایک ٹول ہے۔ اس طرح، اسے کئی آسان مفروضوں کے ساتھ لکھا گیا ہے۔

- مقررہ اکاؤنٹ پول۔ اکاؤنٹس کی ایک مخصوص تعداد ہے، اور ہر اکاؤنٹ کا تعلق پہلے سے طے شدہ پتہ سے ہے۔ یہ ایک بہت آسان سسٹم بناتا ہے کیونکہ صفر علم ثبوتوں میں متغیر سائز کے ڈیٹا اسٹرکچرز کو سنبھالنا مشکل ہے۔ پروڈکشن کے لیے تیار سسٹم کے لیے، ہم [مرکل روٹ](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) کو حالت کے ہیش کے طور پر استعمال کر سکتے ہیں اور مطلوبہ بیلنس کے لیے مرکل ثبوت فراہم کر سکتے ہیں۔

- میموری اسٹوریج۔ پروڈکشن سسٹم پر، ہمیں ری اسٹارٹ ہونے کی صورت میں انہیں محفوظ رکھنے کے لیے تمام اکاؤنٹ بیلنس کو ڈسک پر لکھنے کی ضرورت ہوتی ہے۔ یہاں، اگر معلومات آسانی سے ضائع ہو جائیں تو کوئی مسئلہ نہیں ہے۔

- صرف منتقلی۔ پروڈکشن سسٹم کو بینک میں اثاثے جمع کرنے اور انہیں نکالنے کے طریقے کی ضرورت ہوگی۔ لیکن یہاں مقصد صرف تصور کو واضح کرنا ہے، اس لیے یہ بینک صرف منتقلی تک محدود ہے۔

### صفر علم ثبوت {#zero-knowledge-proofs}

بنیادی سطح پر، ایک صفر علم ثبوت یہ ظاہر کرتا ہے کہ ثابت کنندہ کچھ ڈیٹا، _Data<sub>private</sub>_ جانتا ہے تاکہ کچھ عوامی ڈیٹا، _Data<sub>public</sub>_، اور _Data<sub>private</sub>_ کے درمیان ایک تعلق _Relationship_ ہو۔ تصدیق کنندہ _Relationship_ اور _Data<sub>public</sub>_ کو جانتا ہے۔

رازداری کو برقرار رکھنے کے لیے، ہمیں حالتوں اور ٹرانزیکشنز کو نجی رکھنے کی ضرورت ہے۔ لیکن سالمیت کو یقینی بنانے کے لیے، ہمیں حالتوں کے [کرپٹوگرافک ہیش](https://en.wikipedia.org/wiki/Cryptographic_hash_function) کو عوامی رکھنے کی ضرورت ہے۔ ٹرانزیکشنز جمع کرانے والے لوگوں کو یہ ثابت کرنے کے لیے کہ وہ ٹرانزیکشنز واقعی ہوئی ہیں، ہمیں ٹرانزیکشن ہیشز بھی پوسٹ کرنے کی ضرورت ہے۔

زیادہ تر معاملات میں، _Data<sub>private</sub>_ صفر علم ثبوت پروگرام کا ان پٹ ہوتا ہے، اور _Data<sub>public</sub>_ آؤٹ پٹ ہوتا ہے۔

_Data<sub>private</sub>_ میں یہ فیلڈز:

- _State<sub>n</sub>_، پرانی حالت
- _State<sub>n+1</sub>_، نئی حالت
- _Transaction_، ایک ٹرانزیکشن جو پرانی حالت سے نئی حالت میں تبدیل ہوتی ہے۔ اس ٹرانزیکشن میں ان فیلڈز کو شامل کرنے کی ضرورت ہے:
  - _منزل کا پتہ_ جو منتقلی وصول کرتا ہے
  - _رقم_ جو منتقل کی جا رہی ہے
  - _نانس_ یہ یقینی بنانے کے لیے کہ ہر ٹرانزیکشن پر صرف ایک بار کارروائی کی جا سکے۔
    ماخذ کا پتہ ٹرانزیکشن میں ہونے کی ضرورت نہیں ہے، کیونکہ اسے دستخط سے بازیافت کیا جا سکتا ہے۔
- _دستخط_، ایک دستخط جو ٹرانزیکشن انجام دینے کا مجاز ہے۔ ہمارے معاملے میں، ٹرانزیکشن انجام دینے کا مجاز واحد پتہ ماخذ کا پتہ ہے۔ چونکہ ہمارا صفر علم سسٹم اس طرح کام کرتا ہے، اس لیے ہمیں ایتھیریم دستخط کے علاوہ اکاؤنٹ کی عوامی کلید کی بھی ضرورت ہے۔

_Data<sub>public</sub>_ میں یہ فیلڈز ہیں:

- _Hash(State<sub>n</sub>)_ پرانی حالت کا ہیش
- _Hash(State<sub>n+1</sub>)_ نئی حالت کا ہیش
- _Hash(Transaction)_ اس ٹرانزیکشن کا ہیش جو حالت کو _State<sub>n</sub>_ سے _State<sub>n+1</sub>_ میں تبدیل کرتا ہے۔

تعلق کئی شرائط کی جانچ کرتا ہے:

- عوامی ہیشز واقعی نجی فیلڈز کے لیے درست ہیشز ہیں۔
- ٹرانزیکشن، جب پرانی حالت پر لاگو ہوتی ہے، تو نئی حالت کا نتیجہ نکلتا ہے۔
- دستخط ٹرانزیکشن کے ماخذ کے پتہ سے آتا ہے۔

کرپٹوگرافک ہیش فنکشنز کی خصوصیات کی وجہ سے، ان شرائط کو ثابت کرنا سالمیت کو یقینی بنانے کے لیے کافی ہے۔

### ڈیٹا اسٹرکچرز {#data-structures}

بنیادی ڈیٹا اسٹرکچر وہ حالت ہے جو سرور کے پاس ہوتی ہے۔ ہر اکاؤنٹ کے لیے، سرور اکاؤنٹ کے بیلنس اور ایک [نانس](https://en.wikipedia.org/wiki/Cryptographic_nonce) کا ٹریک رکھتا ہے، جو [ری پلے حملوں](https://en.wikipedia.org/wiki/Replay_attack) کو روکنے کے لیے استعمال ہوتا ہے۔

### اجزاء {#components}

اس سسٹم کو دو اجزاء کی ضرورت ہے:

- _سرور_ جو ٹرانزیکشنز وصول کرتا ہے، ان پر کارروائی کرتا ہے، اور صفر علم ثبوتوں کے ساتھ چین پر ہیشز پوسٹ کرتا ہے۔
- ایک _سمارٹ کنٹریکٹ_ جو ہیشز کو اسٹور کرتا ہے اور صفر علم ثبوتوں کی تصدیق کرتا ہے تاکہ یہ یقینی بنایا جا سکے کہ حالت کی تبدیلیاں جائز ہیں۔

### ڈیٹا اور کنٹرول فلو {#flows}

یہ وہ طریقے ہیں جن سے مختلف اجزاء ایک اکاؤنٹ سے دوسرے اکاؤنٹ میں منتقلی کے لیے بات چیت کرتے ہیں۔

1. ایک ویب براؤزر ایک دستخط شدہ ٹرانزیکشن جمع کراتا ہے جس میں دستخط کنندہ کے اکاؤنٹ سے کسی دوسرے اکاؤنٹ میں منتقلی کی درخواست کی جاتی ہے۔

2. سرور تصدیق کرتا ہے کہ ٹرانزیکشن درست ہے:

   - دستخط کنندہ کا بینک میں کافی بیلنس والا اکاؤنٹ ہے۔
   - وصول کنندہ کا بینک میں اکاؤنٹ ہے۔

3. سرور دستخط کنندہ کے بیلنس سے منتقل کی گئی رقم کو گھٹا کر اور اسے وصول کنندہ کے بیلنس میں شامل کر کے نئی حالت کا حساب لگاتا ہے۔

4. سرور ایک صفر علم ثبوت کا حساب لگاتا ہے کہ حالت کی تبدیلی درست ہے۔

5. سرور ایتھیریم کو ایک ٹرانزیکشن جمع کراتا ہے جس میں شامل ہیں:

   - نئی حالت کا ہیش
   - ٹرانزیکشن ہیش (تاکہ ٹرانزیکشن بھیجنے والا جان سکے کہ اس پر کارروائی ہو چکی ہے)
   - صفر علم ثبوت جو ثابت کرتا ہے کہ نئی حالت میں تبدیلی درست ہے

6. سمارٹ کنٹریکٹ صفر علم ثبوت کی تصدیق کرتا ہے۔

7. اگر صفر علم ثبوت درست ثابت ہوتا ہے، تو سمارٹ کنٹریکٹ یہ افعال انجام دیتا ہے:
   - موجودہ حالت کے ہیش کو نئی حالت کے ہیش میں اپ ڈیٹ کریں
   - نئی حالت کے ہیش اور ٹرانزیکشن ہیش کے ساتھ ایک لاگ انٹری خارج کریں

### ٹولز {#tools}

کلائنٹ سائیڈ کوڈ کے لیے، ہم [Vite](https://vite.dev/)، [React](https://react.dev/)، [Viem](https://viem.sh/)، اور [Wagmi](https://wagmi.sh/) استعمال کرنے جا رہے ہیں۔ یہ انڈسٹری کے معیاری ٹولز ہیں؛ اگر آپ ان سے واقف نہیں ہیں، تو آپ [یہ ٹیوٹوریل](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) استعمال کر سکتے ہیں۔

سرور کا زیادہ تر حصہ [Node](https://nodejs.org/en) کا استعمال کرتے ہوئے JavaScript میں لکھا گیا ہے۔ صفر علم کا حصہ [Noir](https://noir-lang.org/) میں لکھا گیا ہے۔ ہمیں ورژن `1.0.0-beta.10` کی ضرورت ہے، لہذا [ہدایات کے مطابق Noir انسٹال کرنے](https://noir-lang.org/docs/getting_started/quick_start) کے بعد، چلائیں:

```
noirup -v 1.0.0-beta.10
```

ہم جو بلاک چین استعمال کرتے ہیں وہ `anvil` ہے، ایک مقامی ٹیسٹنگ بلاک چین جو [Foundry](https://getfoundry.sh/introduction/installation) کا حصہ ہے۔

## نفاذ {#implementation}

چونکہ یہ ایک پیچیدہ سسٹم ہے، اس لیے ہم اسے مراحل میں نافذ کریں گے۔

### مرحلہ 1 - دستی صفر علم {#stage-1}

پہلے مرحلے کے لیے، ہم براؤزر میں ایک ٹرانزیکشن پر دستخط کریں گے اور پھر دستی طور پر صفر علم ثبوت کو معلومات فراہم کریں گے۔ صفر علم کوڈ کو وہ معلومات `server/noir/Prover.toml` میں ملنے کی توقع ہے (جس کی دستاویز [یہاں](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) موجود ہے)۔

اسے عمل میں دیکھنے کے لیے:

1. یقینی بنائیں کہ آپ کے پاس [Node](https://nodejs.org/en/download) اور [Noir](https://noir-lang.org/docs/installation) انسٹال ہیں۔ ترجیحی طور پر، انہیں یونکس (UNIX) سسٹم جیسے macOS، Linux، یا [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) پر انسٹال کریں۔

2. مرحلہ 1 کا کوڈ ڈاؤن لوڈ کریں اور کلائنٹ کوڈ پیش کرنے کے لیے ویب سرور شروع کریں۔

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   یہاں آپ کو ویب سرور کی ضرورت اس لیے ہے کہ، بعض قسم کے دھوکہ دہی کو روکنے کے لیے، بہت سے والیٹس (جیسے میٹاماسک) براہ راست ڈسک سے پیش کی جانے والی فائلوں کو قبول نہیں کرتے ہیں۔

3. والیٹ کے ساتھ ایک براؤزر کھولیں۔

4. والیٹ میں، ایک نیا پاس فریز درج کریں۔ نوٹ کریں کہ یہ آپ کے موجودہ پاس فریز کو حذف کر دے گا، لہذا _یقینی بنائیں کہ آپ کے پاس بیک اپ موجود ہے_۔

   پاس فریز `test test test test test test test test test test test junk` ہے، جو anvil کے لیے ڈیفالٹ ٹیسٹنگ پاس فریز ہے۔

5. [کلائنٹ سائیڈ کوڈ](http://localhost:5173/) پر براؤز کریں۔

6. والیٹ سے جڑیں اور اپنا منزل کا اکاؤنٹ اور رقم منتخب کریں۔

7. **Sign** پر کلک کریں اور ٹرانزیکشن پر دستخط کریں۔

8. **Prover.toml** ہیڈنگ کے نیچے، آپ کو ٹیکسٹ ملے گا۔ `server/noir/Prover.toml` کو اس ٹیکسٹ سے تبدیل کریں۔

9. صفر علم ثبوت کو انجام دیں۔

   ```sh
   cd ../server/noir
   nargo execute
   ```

   آؤٹ پٹ اس سے ملتا جلتا ہونا چاہیے

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. آخری دو اقدار کا موازنہ اس ہیش سے کریں جو آپ ویب براؤزر پر دیکھتے ہیں تاکہ یہ دیکھا جا سکے کہ آیا پیغام کو صحیح طریقے سے ہیش کیا گیا ہے۔

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[یہ فائل](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir کی طرف سے متوقع معلومات کا فارمیٹ دکھاتی ہے۔

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

پیغام ٹیکسٹ فارمیٹ میں ہے، جو صارف کے لیے سمجھنا آسان بناتا ہے (جو دستخط کرتے وقت ضروری ہے) اور Noir کوڈ کے لیے پارس کرنا آسان بناتا ہے۔ رقم کو فنی میں درج کیا گیا ہے تاکہ ایک طرف جزوی منتقلی کو فعال کیا جا سکے، اور دوسری طرف آسانی سے پڑھنے کے قابل ہو۔ آخری نمبر [نانس](https://en.wikipedia.org/wiki/Cryptographic_nonce) ہے۔

اسٹرنگ <span dir="ltr">100</span> حروف لمبی ہے۔ صفر علم ثبوت متغیر سائز کے ڈیٹا کو اچھی طرح سے نہیں سنبھالتے ہیں، اس لیے اکثر ڈیٹا کو پیڈ (pad) کرنا ضروری ہوتا ہے۔

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

یہ تین پیرامیٹرز فکسڈ سائز بائٹ ایریز ہیں۔

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

یہ اسٹرکچرز کی ایک ایری (array) کی وضاحت کرنے کا طریقہ ہے۔ ہر اندراج کے لیے، ہم پتہ، بیلنس (milliETH عرف [فنی](https://cryptovalleyjournal.com/glossary/finney/) میں)، اور اگلی نانس ویلیو کی وضاحت کرتے ہیں۔

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[یہ فائل](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) کلائنٹ سائیڈ پروسیسنگ کو نافذ کرتی ہے اور `server/noir/Prover.toml` فائل (وہ جس میں صفر علم پیرامیٹرز شامل ہیں) تیار کرتی ہے۔

یہاں زیادہ دلچسپ حصوں کی وضاحت ہے۔

```tsx
export default attrs =>  {
```

یہ فنکشن `Transfer` React جزو بناتا ہے، جسے دوسری فائلیں امپورٹ کر سکتی ہیں۔

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

یہ اکاؤنٹ کے پتے ہیں، وہ پتے جو `test ... test junk` پاس فریز کے ذریعے بنائے گئے ہیں۔ اگر آپ اپنے پتے استعمال کرنا چاہتے ہیں، تو بس اس تعریف میں ترمیم کریں۔

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

یہ [Wagmi ہکس](https://wagmi.sh/react/api/hooks) ہمیں [viem](https://viem.sh/) لائبریری اور والیٹ تک رسائی دیتے ہیں۔

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

یہ پیغام ہے، جسے خالی جگہوں (spaces) کے ساتھ پیڈ کیا گیا ہے۔ جب بھی [`useState`](https://react.dev/reference/react/useState) متغیرات میں سے کوئی ایک تبدیل ہوتا ہے، تو جزو کو دوبارہ ڈرا کیا جاتا ہے اور `message` کو اپ ڈیٹ کیا جاتا ہے۔

```tsx
  const sign = async () => {
```

یہ فنکشن اس وقت کال کیا جاتا ہے جب صارف **Sign** بٹن پر کلک کرتا ہے۔ پیغام خود بخود اپ ڈیٹ ہو جاتا ہے، لیکن دستخط کے لیے والیٹ میں صارف کی منظوری درکار ہوتی ہے، اور ہم اس وقت تک اس کے لیے نہیں پوچھنا چاہتے جب تک کہ ضرورت نہ ہو۔

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

والیٹ سے [پیغام پر دستخط کرنے](https://viem.sh/docs/accounts/local/signMessage) کو کہیں۔ 

```tsx
    const hash = hashMessage(message)
```

پیغام کا ہیش حاصل کریں۔ اسے ڈیبگنگ (Noir کوڈ کی) کے لیے صارف کو فراہم کرنا مددگار ہے۔ 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[عوامی کلید حاصل کریں](https://viem.sh/docs/utilities/recoverPublicKey)۔ یہ [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) فنکشن کے لیے درکار ہے۔

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

حالت کے متغیرات سیٹ کریں۔ ایسا کرنے سے جزو دوبارہ ڈرا ہوتا ہے (`sign` فنکشن کے باہر نکلنے کے بعد) اور صارف کو اپ ڈیٹ شدہ اقدار دکھاتا ہے۔

```tsx
    let proverToml = `
```

`Prover.toml` کے لیے ٹیکسٹ۔

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem ہمیں عوامی کلید ایک <span dir="ltr">65</span>-بائٹ ہیکساڈیسیمل اسٹرنگ کے طور پر فراہم کرتا ہے۔ پہلا بائٹ `0x04` ہے، جو ایک ورژن مارکر ہے۔ اس کے بعد عوامی کلید کے `x` کے لیے <span dir="ltr">32</span> بائٹس اور پھر عوامی کلید کے `y` کے لیے <span dir="ltr">32</span> بائٹس ہوتے ہیں۔

تاہم، Noir کو یہ معلومات دو بائٹ ایریز کے طور پر ملنے کی توقع ہے، ایک `x` کے لیے اور ایک `y` کے لیے۔ اسے صفر علم ثبوت کے حصے کے بجائے یہاں کلائنٹ پر پارس کرنا آسان ہے۔

نوٹ کریں کہ یہ عام طور پر صفر علم میں ایک اچھی پریکٹس ہے۔ صفر علم ثبوت کے اندر کا کوڈ مہنگا ہوتا ہے، اس لیے کوئی بھی پروسیسنگ جو صفر علم ثبوت کے باہر کی جا سکتی ہے اسے صفر علم ثبوت کے باہر _کیا جانا چاہیے_۔

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

دستخط بھی ایک <span dir="ltr">65</span>-بائٹ ہیکساڈیسیمل اسٹرنگ کے طور پر فراہم کیا جاتا ہے۔ تاہم، آخری بائٹ صرف عوامی کلید کو بازیافت کرنے کے لیے ضروری ہے۔ چونکہ عوامی کلید پہلے ہی Noir کوڈ کو فراہم کی جائے گی، اس لیے ہمیں دستخط کی تصدیق کے لیے اس کی ضرورت نہیں ہے، اور Noir کوڈ کو اس کی ضرورت نہیں ہے۔

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

اکاؤنٹس فراہم کریں۔

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

یہ جزو کا HTML (زیادہ درست طور پر، [JSX](https://react.dev/learn/writing-markup-with-jsx)) فارمیٹ ہے۔

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[یہ فائل](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) اصل صفر علم کوڈ ہے۔

```
use std::hash::pedersen_hash;
```

[پیڈرسن ہیش](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) [Noir اسٹینڈرڈ لائبریری](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) کے ساتھ فراہم کیا گیا ہے۔ صفر علم ثبوت عام طور پر اس ہیش فنکشن کا استعمال کرتے ہیں۔ معیاری ہیش فنکشنز کے مقابلے میں [ریاضیاتی سرکٹس](https://rareskills.io/post/arithmetic-circuit) کے اندر اس کا حساب لگانا بہت آسان ہے۔

```
use keccak256::keccak256;
use dep::ecrecover;
```

یہ دو فنکشنز بیرونی لائبریریاں ہیں، جن کی تعریف [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) میں کی گئی ہے۔ وہ بالکل وہی ہیں جن کے لیے ان کا نام رکھا گیا ہے، ایک فنکشن جو [keccak256 ہیش](https://emn178.github.io/online-tools/keccak_256.html) کا حساب لگاتا ہے اور ایک فنکشن جو ایتھیریم دستخطوں کی تصدیق کرتا ہے اور دستخط کنندہ کا ایتھیریم پتہ بازیافت کرتا ہے۔

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir [Rust](https://www.rust-lang.org/) سے متاثر ہے۔ متغیرات، ڈیفالٹ کے طور پر، مستقل (constants) ہوتے ہیں۔ اس طرح ہم عالمی کنفیگریشن مستقل کی وضاحت کرتے ہیں۔ خاص طور پر، `ACCOUNT_NUMBER` ان اکاؤنٹس کی تعداد ہے جو ہم اسٹور کرتے ہیں۔

`u<number>` نامی ڈیٹا ٹائپس بٹس کی وہ تعداد ہیں، جو ان سائنڈ (unsigned) ہیں۔ صرف تعاون یافتہ ٹائپس `u8`، `u16`، `u32`، `u64`، اور `u128` ہیں۔

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

یہ متغیر اکاؤنٹس کے پیڈرسن ہیش کے لیے استعمال ہوتا ہے، جیسا کہ ذیل میں وضاحت کی گئی ہے۔

```
global MESSAGE_LENGTH : u32 = 100;
```

جیسا کہ اوپر وضاحت کی گئی ہے، پیغام کی لمبائی مقررہ ہے۔ یہ یہاں بیان کی گئی ہے۔

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[<span dir="ltr">EIP-191</span> دستخطوں](https://eips.ethereum.org/EIPS/eip-191) کے لیے ایک بفر کی ضرورت ہوتی ہے جس میں <span dir="ltr">26</span>-بائٹ کا سابقہ (prefix) ہو، اس کے بعد ASCII میں پیغام کی لمبائی، اور آخر میں خود پیغام ہو۔

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

وہ معلومات جو ہم کسی اکاؤنٹ کے بارے میں اسٹور کرتے ہیں۔ [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) ایک نمبر ہے، عام طور پر <span dir="ltr">253</span> بٹس تک، جسے براہ راست [ریاضیاتی سرکٹ](https://rareskills.io/post/arithmetic-circuit) میں استعمال کیا جا سکتا ہے جو صفر علم ثبوت کو نافذ کرتا ہے۔ یہاں ہم <span dir="ltr">160</span>-بٹ ایتھیریم پتہ کو اسٹور کرنے کے لیے `Field` کا استعمال کرتے ہیں۔

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

وہ معلومات جو ہم منتقلی کی ٹرانزیکشن کے لیے اسٹور کرتے ہیں۔

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

ایک فنکشن کی تعریف۔ پیرامیٹر `Account` معلومات ہے۔ نتیجہ `Field` متغیرات کی ایک ایری ہے، جس کی لمبائی `FLAT_ACCOUNT_FIELDS` ہے

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

ایری میں پہلی ویلیو اکاؤنٹ کا پتہ ہے۔ دوسری میں بیلنس اور نانس دونوں شامل ہیں۔ `.into()` کالز ایک نمبر کو اس ڈیٹا ٹائپ میں تبدیل کرتی ہیں جس کی اسے ضرورت ہوتی ہے۔ `account.nonce` ایک `u32` ویلیو ہے، لیکن اسے `account.balance << 32`، جو کہ ایک `u128` ویلیو ہے، میں شامل کرنے کے لیے، اسے `u128` ہونا چاہیے۔ یہ پہلی `.into()` ہے۔ دوسری `u128` کے نتیجے کو `Field` میں تبدیل کرتی ہے تاکہ یہ ایری میں فٹ ہو سکے۔

```
    flat
}
```

Noir میں، فنکشنز صرف آخر میں ایک ویلیو واپس کر سکتے ہیں (کوئی ابتدائی واپسی نہیں ہے)۔ واپسی کی ویلیو کی وضاحت کرنے کے لیے، آپ فنکشن کے اختتامی بریکٹ سے ٹھیک پہلے اس کا جائزہ لیتے ہیں۔

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

یہ فنکشن اکاؤنٹس کی ایری کو `Field` ایری میں تبدیل کرتا ہے، جسے پیڈرسن ہیش کے ان پٹ کے طور پر استعمال کیا جا سکتا ہے۔

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

اس طرح آپ ایک قابل تغیر (mutable) متغیر کی وضاحت کرتے ہیں، یعنی، جو مستقل _نہیں_ ہے۔ Noir میں متغیرات کی ہمیشہ ایک ویلیو ہونی چاہیے، اس لیے ہم اس متغیر کو تمام صفر (zeros) سے شروع کرتے ہیں۔

```
    for i in 0..ACCOUNT_NUMBER {
```

یہ ایک `for` لوپ ہے۔ نوٹ کریں کہ حدود مستقل ہیں۔ Noir لوپس کی حدود کو کمپائل ٹائم پر معلوم ہونا چاہیے۔ اس کی وجہ یہ ہے کہ ریاضیاتی سرکٹس فلو کنٹرول کو سپورٹ نہیں کرتے ہیں۔ `for` لوپ پر کارروائی کرتے وقت، کمپائلر آسانی سے اس کے اندر موجود کوڈ کو کئی بار رکھتا ہے، ہر تکرار (iteration) کے لیے ایک بار۔

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

آخر کار، ہم اس فنکشن پر پہنچ گئے جو اکاؤنٹس کی ایری کو ہیش کرتا ہے۔

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

یہ فنکشن ایک مخصوص پتہ والے اکاؤنٹ کو تلاش کرتا ہے۔ یہ فنکشن معیاری کوڈ میں انتہائی غیر موثر ہوگا کیونکہ یہ تمام اکاؤنٹس پر اعادہ (iterate) کرتا ہے، یہاں تک کہ پتہ ملنے کے بعد بھی۔

تاہم، صفر علم ثبوتوں میں، کوئی فلو کنٹرول نہیں ہوتا ہے۔ اگر ہمیں کبھی کسی شرط کو چیک کرنے کی ضرورت ہو، تو ہمیں اسے ہر بار چیک کرنا ہوگا۔

اسی طرح کی چیز `if` اسٹیٹمنٹس کے ساتھ ہوتی ہے۔ اوپر والے لوپ میں `if` اسٹیٹمنٹ کا ترجمہ ان ریاضیاتی اسٹیٹمنٹس میں کیا جاتا ہے۔

_condition<sub>result</sub> = accounts[i].address == address_ // ایک اگر وہ برابر ہیں، بصورت دیگر صفر

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/language/assert) فنکشن صفر علم ثبوت کو کریش کرنے کا سبب بنتا ہے اگر دعویٰ (assertion) غلط ہو۔ اس صورت میں، اگر ہمیں متعلقہ پتہ والا اکاؤنٹ نہیں ملتا ہے۔ پتہ کی اطلاع دینے کے لیے، ہم ایک [فارمیٹ اسٹرنگ](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) استعمال کرتے ہیں۔

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

یہ فنکشن منتقلی کی ٹرانزیکشن کو لاگو کرتا ہے اور نئے اکاؤنٹس کی ایری واپس کرتا ہے۔

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

ہم Noir میں فارمیٹ اسٹرنگ کے اندر اسٹرکچر عناصر تک رسائی حاصل نہیں کر سکتے، اس لیے ہم ایک قابل استعمال کاپی بناتے ہیں۔

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

یہ دو شرائط ہیں جو کسی ٹرانزیکشن کو غلط قرار دے سکتی ہیں۔

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

نئے اکاؤنٹس کی ایری بنائیں اور پھر اسے واپس کریں۔

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

یہ فنکشن پیغام سے پتہ پڑھتا ہے۔ 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

پتہ ہمیشہ <span dir="ltr">20</span> بائٹس (عرف <span dir="ltr">40</span> ہیکساڈیسیمل ہندسے) لمبا ہوتا ہے، اور کریکٹر #7 سے شروع ہوتا ہے۔

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

پیغام سے رقم اور نانس پڑھیں۔ 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

پیغام میں، پتہ کے بعد پہلا نمبر منتقل کرنے کے لیے فنی (عرف <span dir="ltr">ETH</span> کا ہزارواں حصہ) کی رقم ہے۔ دوسرا نمبر نانس ہے۔ ان کے درمیان کسی بھی ٹیکسٹ کو نظر انداز کر دیا جاتا ہے۔

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // ہمیں یہ ابھی ملا ہے
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

ایک [ٹپل (tuple)](https://noir-lang.org/docs/noir/concepts/data_types/tuples) واپس کرنا Noir کا ایک فنکشن سے متعدد اقدار واپس کرنے کا طریقہ ہے۔

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

یہ فنکشن پیغام کو بائٹس میں تبدیل کرتا ہے، پھر رقوم کو `TransferTxn` میں تبدیل کرتا ہے۔

```rust
// Viem کے hashMessage کے مترادف
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

ہم اکاؤنٹس کے لیے پیڈرسن ہیش استعمال کرنے کے قابل تھے کیونکہ وہ صرف صفر علم ثبوت کے اندر ہیش کیے جاتے ہیں۔ تاہم، اس کوڈ میں ہمیں پیغام کے دستخط کو چیک کرنے کی ضرورت ہے، جو براؤزر کے ذریعے تیار کیا جاتا ہے۔ اس کے لیے، ہمیں [<span dir="ltr">EIP-191</span>](https://eips.ethereum.org/EIPS/eip-191) میں ایتھیریم دستخط کرنے کے فارمیٹ کی پیروی کرنے کی ضرورت ہے۔ اس کا مطلب ہے کہ ہمیں ایک معیاری سابقہ، ASCII میں پیغام کی لمبائی، اور خود پیغام کے ساتھ ایک مشترکہ بفر بنانے کی ضرورت ہے، اور اسے ہیش کرنے کے لیے ایتھیریم کے معیاری keccak256 کا استعمال کرنا ہوگا۔

```rust
    // ASCII سابقہ
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

ایسے معاملات سے بچنے کے لیے جہاں کوئی ایپلی کیشن صارف سے کسی ایسے پیغام پر دستخط کرنے کو کہتی ہے جسے ٹرانزیکشن کے طور پر یا کسی اور مقصد کے لیے استعمال کیا جا سکتا ہے، <span dir="ltr">EIP-191</span> یہ بتاتا ہے کہ تمام دستخط شدہ پیغامات کریکٹر 0x19 (جو ایک درست ASCII کریکٹر نہیں ہے) سے شروع ہوتے ہیں جس کے بعد `Ethereum Signed Message:` اور ایک نئی لائن (newline) ہوتی ہے۔

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

پیغام کی لمبائی <span dir="ltr">999</span> تک سنبھالیں اور اگر یہ اس سے زیادہ ہو تو ناکام ہو جائیں۔ میں نے یہ کوڈ شامل کیا، حالانکہ پیغام کی لمبائی ایک مستقل ہے، کیونکہ اس سے اسے تبدیل کرنا آسان ہو جاتا ہے۔ پروڈکشن سسٹم پر، آپ شاید بہتر کارکردگی کی خاطر یہ فرض کر لیں گے کہ `MESSAGE_LENGTH` تبدیل نہیں ہوتا ہے۔

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

ایتھیریم کا معیاری `keccak256` فنکشن استعمال کریں۔

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // پتہ، ہیش کے پہلے 16 بائٹس، ہیش کے آخری 16 بائٹس        
{
```

یہ فنکشن دستخط کی تصدیق کرتا ہے، جس کے لیے پیغام کے ہیش کی ضرورت ہوتی ہے۔ پھر یہ ہمیں وہ پتہ فراہم کرتا ہے جس نے اس پر دستخط کیے ہیں اور پیغام کا ہیش۔ پیغام کا ہیش دو `Field` اقدار میں فراہم کیا جاتا ہے کیونکہ بائٹ ایری کی نسبت انہیں باقی پروگرام میں استعمال کرنا آسان ہے۔

ہمیں دو `Field` اقدار استعمال کرنے کی ضرورت ہے کیونکہ فیلڈ کیلکولیشنز ایک بڑے نمبر کے [ماڈیولو (modulo)](https://en.wikipedia.org/wiki/Modulo) کی جاتی ہیں، لیکن وہ نمبر عام طور پر <span dir="ltr">256</span> بٹس سے کم ہوتا ہے (بصورت دیگر EVM میں ان کیلکولیشنز کو انجام دینا مشکل ہوگا)۔

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` اور `hash2` کو قابل تغیر متغیرات کے طور پر متعین کریں، اور ان میں ہیش کو بائٹ در بائٹ لکھیں۔

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
یہ [Solidity کے `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) سے ملتا جلتا ہے، دو اہم اختلافات کے ساتھ:

- اگر دستخط درست نہیں ہے، تو کال ایک `assert` میں ناکام ہو جاتی ہے اور پروگرام منسوخ کر دیا جاتا ہے۔
- اگرچہ عوامی کلید کو دستخط اور ہیش سے بازیافت کیا جا سکتا ہے، یہ وہ پروسیسنگ ہے جو بیرونی طور پر کی جا سکتی ہے اور، اس لیے، صفر علم ثبوت کے اندر کرنے کے قابل نہیں ہے۔ اگر کوئی ہمیں یہاں دھوکہ دینے کی کوشش کرتا ہے، تو دستخط کی تصدیق ناکام ہو جائے گی۔

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // پرانے اکاؤنٹس ایرے کا ہیش
        Field,  // نئے اکاؤنٹس ایرے کا ہیش
        Field,  // پیغام کے ہیش کے پہلے 16 بائٹس
        Field,  // پیغام کے ہیش کے آخری 16 بائٹس
    )
```

آخر کار، ہم `main` فنکشن پر پہنچتے ہیں۔ ہمیں یہ ثابت کرنے کی ضرورت ہے کہ ہمارے پاس ایک ٹرانزیکشن ہے جو اکاؤنٹس کے ہیش کو پرانی ویلیو سے نئی ویلیو میں درست طریقے سے تبدیل کرتی ہے۔ ہمیں یہ بھی ثابت کرنے کی ضرورت ہے کہ اس میں یہ مخصوص ٹرانزیکشن ہیش ہے تاکہ جس شخص نے اسے بھیجا ہے وہ جان سکے کہ ان کی ٹرانزیکشن پر کارروائی ہو چکی ہے۔

```rust
{
    let mut txn = readTransferTxn(message);
```

ہمیں `txn` کو قابل تغیر ہونے کی ضرورت ہے کیونکہ ہم پیغام سے بھیجنے والے کا پتہ نہیں پڑھتے، ہم اسے دستخط سے پڑھتے ہیں۔ 

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### مرحلہ 2 - سرور شامل کرنا {#stage-2}

دوسرے مرحلے میں، ہم ایک سرور شامل کرتے ہیں جو براؤزر سے منتقلی کی ٹرانزیکشنز وصول کرتا ہے اور ان پر عمل درآمد کرتا ہے۔

اسے عمل میں دیکھنے کے لیے:

1. اگر Vite چل رہا ہے تو اسے روک دیں۔

2. وہ برانچ ڈاؤن لوڈ کریں جس میں سرور شامل ہے اور یقینی بنائیں کہ آپ کے پاس تمام ضروری ماڈیولز موجود ہیں۔

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir کوڈ کو مرتب (compile) کرنے کی ضرورت نہیں ہے، یہ وہی کوڈ ہے جو آپ نے مرحلہ 1 کے لیے استعمال کیا تھا۔

3. سرور شروع کریں۔

   ```sh
   npm run start
   ```

4. ایک الگ کمانڈ لائن ونڈو میں، براؤزر کوڈ پیش کرنے کے لیے Vite چلائیں۔

   ```sh
   cd client
   npm run dev
   ```

5. کلائنٹ کوڈ پر [http://localhost:5173](http://localhost:5173) پر براؤز کریں

6. اس سے پہلے کہ آپ کوئی ٹرانزیکشن جاری کر سکیں، آپ کو نانس کے ساتھ ساتھ وہ رقم بھی جاننے کی ضرورت ہے جو آپ بھیج سکتے ہیں۔ یہ معلومات حاصل کرنے کے لیے، **Update account data** پر کلک کریں اور پیغام پر دستخط کریں۔

   یہاں ہمارے سامنے ایک مخمصہ ہے۔ ایک طرف، ہم کسی ایسے پیغام پر دستخط نہیں کرنا چاہتے جسے دوبارہ استعمال کیا جا سکے (ایک [ری پلے حملہ](https://en.wikipedia.org/wiki/Replay_attack))، یہی وجہ ہے کہ ہم سب سے پہلے ایک نانس چاہتے ہیں۔ تاہم، ہمارے پاس ابھی تک کوئی نانس نہیں ہے۔ اس کا حل یہ ہے کہ ایک ایسا نانس منتخب کیا جائے جسے صرف ایک بار استعمال کیا جا سکے اور جو ہمارے پاس پہلے سے ہی دونوں طرف موجود ہو، جیسے کہ موجودہ وقت۔

   اس حل کے ساتھ مسئلہ یہ ہے کہ وقت مکمل طور پر ہم آہنگ (synchronized) نہیں ہو سکتا ہے۔ لہذا اس کے بجائے، ہم ایک ایسی ویلیو پر دستخط کرتے ہیں جو ہر منٹ تبدیل ہوتی ہے۔ اس کا مطلب ہے کہ ری پلے حملوں کے لیے ہماری کمزوری کی ونڈو زیادہ سے زیادہ ایک منٹ ہے۔ اس بات پر غور کرتے ہوئے کہ پروڈکشن میں دستخط شدہ درخواست کو TLS کے ذریعے محفوظ کیا جائے گا، اور یہ کہ سرنگ (tunnel) کا دوسرا حصہ---سرور---پہلے ہی بیلنس اور نانس کو ظاہر کر سکتا ہے (کام کرنے کے لیے اسے انہیں جاننا ہوگا)، یہ ایک قابل قبول خطرہ ہے۔

7. ایک بار جب براؤزر کو بیلنس اور نانس واپس مل جاتا ہے، تو یہ منتقلی کا فارم دکھاتا ہے۔ منزل کا پتہ اور رقم منتخب کریں اور **Transfer** پر کلک کریں۔ اس درخواست پر دستخط کریں۔

8. منتقلی دیکھنے کے لیے، یا تو **Update account data** کریں یا اس ونڈو میں دیکھیں جہاں آپ سرور چلاتے ہیں۔ جب بھی حالت تبدیل ہوتی ہے سرور اسے لاگ کرتا ہے۔

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[اس فائل](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) میں سرور کا عمل شامل ہے، اور یہ [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) پر Noir کوڈ کے ساتھ تعامل کرتی ہے۔ یہاں دلچسپ حصوں کی وضاحت ہے۔

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) لائبریری JavaScript کوڈ اور Noir کوڈ کے درمیان انٹرفیس کرتی ہے۔

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

ریاضیاتی سرکٹ کو لوڈ کریں---وہ مرتب شدہ Noir پروگرام جو ہم نے پچھلے مرحلے میں بنایا تھا---اور اسے چلانے کی تیاری کریں۔

```js
// ہم صرف دستخط شدہ درخواست کے جواب میں اکاؤنٹ کی معلومات فراہم کرتے ہیں
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

اکاؤنٹ کی معلومات فراہم کرنے کے لیے، ہمیں صرف دستخط کی ضرورت ہے۔ اس کی وجہ یہ ہے کہ ہم پہلے ہی جانتے ہیں کہ پیغام کیا ہونے والا ہے، اور اس لیے پیغام کا ہیش بھی۔

```js
const processMessage = async (message, signature) => {
```

ایک پیغام پر کارروائی کریں اور اس ٹرانزیکشن کو انجام دیں جسے یہ انکوڈ کرتا ہے۔

```js
    // عوامی کلید حاصل کریں
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

اب جب کہ ہم سرور پر JavaScript چلاتے ہیں، ہم کلائنٹ کے بجائے وہاں عوامی کلید بازیافت کر سکتے ہیں۔

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` Noir پروگرام چلاتا ہے۔ پیرامیٹرز ان کے مساوی ہیں جو [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) میں فراہم کیے گئے ہیں۔ نوٹ کریں کہ لمبی اقدار ہیکساڈیسیمل اسٹرنگز کی ایک ایری (`["0x60", "0xA7"]`) کے طور پر فراہم کی جاتی ہیں، نہ کہ ایک واحد ہیکساڈیسیمل ویلیو (`0x60A7`) کے طور پر، جس طرح Viem کرتا ہے۔

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

اگر کوئی خرابی ہے، تو اسے پکڑیں اور پھر کلائنٹ کو ایک آسان ورژن ریلے کریں۔

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

ٹرانزیکشن لاگو کریں۔ ہم نے اسے پہلے ہی Noir کوڈ میں کر لیا ہے، لیکن وہاں سے نتیجہ نکالنے کے بجائے اسے یہاں دوبارہ کرنا آسان ہے۔

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

ابتدائی `Accounts` اسٹرکچر۔

### مرحلہ 3 - ایتھیریم سمارٹ کنٹریکٹس {#stage-3}

1. سرور اور کلائنٹ کے عمل کو روک دیں۔

2. سمارٹ کنٹریکٹس کے ساتھ برانچ ڈاؤن لوڈ کریں اور یقینی بنائیں کہ آپ کے پاس تمام ضروری ماڈیولز موجود ہیں۔

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. ایک الگ کمانڈ لائن ونڈو میں `anvil` چلائیں۔

4. تصدیقی کلید اور solidity تصدیق کنندہ تیار کریں، پھر تصدیق کنندہ کوڈ کو Solidity پروجیکٹ میں کاپی کریں۔

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. سمارٹ کنٹریکٹس پر جائیں اور `anvil` بلاک چین استعمال کرنے کے لیے ماحولیاتی متغیرات (environment variables) سیٹ کریں۔

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol` کو تعینات کریں اور پتہ کو ایک ماحولیاتی متغیر میں اسٹور کریں۔

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` کنٹریکٹ تعینات کریں۔

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` ویلیو `Accounts` کی ابتدائی حالت کا پیڈرسن ہیش ہے۔ اگر آپ `server/index.mjs` میں اس ابتدائی حالت میں ترمیم کرتے ہیں، تو آپ صفر علم ثبوت کے ذریعے رپورٹ کردہ ابتدائی ہیش دیکھنے کے لیے ایک ٹرانزیکشن چلا سکتے ہیں۔

8. سرور چلائیں۔

   ```sh
   cd ../server
   npm run start
   ```

9. کلائنٹ کو ایک مختلف کمانڈ لائن ونڈو میں چلائیں۔

   ```sh
   cd client
   npm run dev
   ```

10. کچھ ٹرانزیکشنز چلائیں۔

11. یہ تصدیق کرنے کے لیے کہ حالت آن چین تبدیل ہو گئی ہے، سرور کے عمل کو دوبارہ شروع کریں۔ دیکھیں کہ `ZkBank` اب ٹرانزیکشنز کو قبول نہیں کرتا ہے، کیونکہ ٹرانزیکشنز میں اصل ہیش ویلیو آن چین اسٹور کردہ ہیش ویلیو سے مختلف ہے۔

    یہ متوقع خرابی کی قسم ہے۔

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

اس فائل میں تبدیلیاں زیادہ تر اصل ثبوت بنانے اور اسے آن چین جمع کرانے سے متعلق ہیں۔

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

ہمیں آن چین بھیجنے کے لیے اصل ثبوت بنانے کے لیے [Barretenberg پیکیج](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) استعمال کرنے کی ضرورت ہے۔ ہم اس پیکیج کو یا تو کمانڈ لائن انٹرفیس (`bb`) چلا کر یا [JavaScript لائبریری، `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) استعمال کر کے استعمال کر سکتے ہیں۔ JavaScript لائبریری مقامی طور پر کوڈ چلانے کی نسبت بہت سست ہے، اس لیے ہم یہاں کمانڈ لائن استعمال کرنے کے لیے [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) استعمال کرتے ہیں۔

نوٹ کریں کہ اگر آپ `bb.js` استعمال کرنے کا فیصلہ کرتے ہیں، تو آپ کو ایک ایسا ورژن استعمال کرنے کی ضرورت ہے جو آپ کے استعمال کردہ Noir کے ورژن کے ساتھ مطابقت رکھتا ہو۔ لکھتے وقت، موجودہ Noir ورژن (1.0.0-beta.11) `bb.js` ورژن 0.87 استعمال کرتا ہے۔

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

یہاں کا پتہ وہ ہے جو آپ کو اس وقت ملتا ہے جب آپ ایک صاف `anvil` کے ساتھ شروع کرتے ہیں اور اوپر دی گئی ہدایات پر عمل کرتے ہیں۔

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

یہ نجی کلید `anvil` میں ڈیفالٹ پری فنڈڈ اکاؤنٹس میں سے ایک ہے۔ 

```js
const generateProof = async (witness, fileID) => {
```

`bb` ایگزیکیوٹیبل کا استعمال کرتے ہوئے ایک ثبوت تیار کریں۔

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

گواہ کو ایک فائل میں لکھیں۔

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

دراصل ثبوت بنائیں۔ یہ مرحلہ عوامی متغیرات کے ساتھ ایک فائل بھی بناتا ہے، لیکن ہمیں اس کی ضرورت نہیں ہے۔ ہم نے وہ متغیرات پہلے ہی `noir.execute` سے حاصل کر لیے ہیں۔

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

ثبوت `Field` اقدار کی ایک JSON ایری ہے، جس میں سے ہر ایک کو ہیکساڈیسیمل ویلیو کے طور پر دکھایا گیا ہے۔ تاہم، ہمیں اسے ٹرانزیکشن میں ایک واحد `bytes` ویلیو کے طور پر بھیجنے کی ضرورت ہے، جسے Viem ایک بڑی ہیکساڈیسیمل اسٹرنگ کے ذریعے ظاہر کرتا ہے۔ یہاں ہم تمام اقدار کو جوڑ کر، تمام `0x` کو ہٹا کر، اور پھر آخر میں ایک شامل کر کے فارمیٹ کو تبدیل کرتے ہیں۔

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

کلین اپ کریں اور ثبوت واپس کریں۔

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

عوامی فیلڈز کو <span dir="ltr">32</span>-بائٹ اقدار کی ایک ایری ہونے کی ضرورت ہے۔ تاہم، چونکہ ہمیں ٹرانزیکشن ہیش کو دو `Field` اقدار کے درمیان تقسیم کرنے کی ضرورت تھی، اس لیے یہ <span dir="ltr">16</span>-بائٹ ویلیو کے طور پر ظاہر ہوتا ہے۔ یہاں ہم صفر (zeros) شامل کرتے ہیں تاکہ Viem سمجھ سکے کہ یہ دراصل <span dir="ltr">32</span> بائٹس ہے۔

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

ہر پتہ ہر نانس کو صرف ایک بار استعمال کرتا ہے تاکہ ہم گواہ فائل اور آؤٹ پٹ ڈائرکٹری کے لیے ایک منفرد شناخت کنندہ کے طور پر `fromAddress` اور `nonce` کے امتزاج کا استعمال کر سکیں۔

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

ٹرانزیکشن کو چین پر بھیجیں۔

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

یہ آن چین کوڈ ہے جو ٹرانزیکشن وصول کرتا ہے۔

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

آن چین کوڈ کو دو متغیرات کا ٹریک رکھنے کی ضرورت ہے: تصدیق کنندہ (ایک الگ کنٹریکٹ جو `nargo` کے ذریعے بنایا گیا ہے) اور موجودہ حالت کا ہیش۔

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

جب بھی حالت تبدیل ہوتی ہے، ہم ایک `TransactionProcessed` ایونٹ خارج کرتے ہیں۔

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

یہ فنکشن ٹرانزیکشنز پر کارروائی کرتا ہے۔ یہ ثبوت (`bytes` کے طور پر) اور عوامی ان پٹس (ایک `bytes32` ایری کے طور پر) اس فارمیٹ میں حاصل کرتا ہے جس کی تصدیق کنندہ کو ضرورت ہوتی ہے (آن چین پروسیسنگ اور اس وجہ سے گیس کے اخراجات کو کم کرنے کے لیے)۔

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

صفر علم ثبوت کو یہ ہونا چاہیے کہ ٹرانزیکشن ہمارے موجودہ ہیش سے ایک نئے ہیش میں تبدیل ہوتی ہے۔

```solidity
        myVerifier.verify(_proof, _publicFields);
```

صفر علم ثبوت کی تصدیق کے لیے تصدیق کنندہ کنٹریکٹ کو کال کریں۔ اگر صفر علم ثبوت غلط ہے تو یہ مرحلہ ٹرانزیکشن کو واپس (revert) کر دیتا ہے۔

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

اگر سب کچھ درست ثابت ہوتا ہے، تو حالت کے ہیش کو نئی ویلیو میں اپ ڈیٹ کریں اور ایک `TransactionProcessed` ایونٹ خارج کریں۔

## مرکزی جزو کے ذریعے غلط استعمال {#abuses}

انفارمیشن سیکیورٹی تین صفات پر مشتمل ہے:

- _رازداری_، صارفین وہ معلومات نہیں پڑھ سکتے جنہیں پڑھنے کے وہ مجاز نہیں ہیں۔
- _سالمیت_، معلومات کو مجاز صارفین کے علاوہ کسی اور کے ذریعے مجاز طریقے سے تبدیل نہیں کیا جا سکتا۔
- _دستیابی_، مجاز صارفین سسٹم کا استعمال کر سکتے ہیں۔

اس سسٹم پر، سالمیت صفر علم ثبوتوں کے ذریعے فراہم کی جاتی ہے۔ دستیابی کی ضمانت دینا بہت مشکل ہے، اور رازداری ناممکن ہے، کیونکہ بینک کو ہر اکاؤنٹ کا بیلنس اور تمام ٹرانزیکشنز جاننا ہوتی ہیں۔ کسی ایسی ہستی کو جس کے پاس معلومات ہوں، ان معلومات کو شیئر کرنے سے روکنے کا کوئی طریقہ نہیں ہے۔

[اسٹیلتھ پتوں](https://vitalik.eth.limo/general/2023/01/20/stealth.html) کا استعمال کرتے ہوئے واقعی ایک خفیہ بینک بنانا ممکن ہو سکتا ہے، لیکن یہ اس مضمون کے دائرہ کار سے باہر ہے۔

### غلط معلومات {#false-info}

ایک طریقہ جس سے سرور سالمیت کی خلاف ورزی کر سکتا ہے وہ یہ ہے کہ جب [ڈیٹا کی درخواست کی جائے](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) تو غلط معلومات فراہم کرے۔

اسے حل کرنے کے لیے، ہم ایک دوسرا Noir پروگرام لکھ سکتے ہیں جو اکاؤنٹس کو نجی ان پٹ کے طور پر اور اس پتہ کو جس کے لیے معلومات کی درخواست کی گئی ہے عوامی ان پٹ کے طور پر وصول کرتا ہے۔ آؤٹ پٹ اس پتہ کا بیلنس اور نانس، اور اکاؤنٹس کا ہیش ہے۔

یقیناً، اس ثبوت کی آن چین تصدیق نہیں کی جا سکتی، کیونکہ ہم آن چین نانس اور بیلنس پوسٹ نہیں کرنا چاہتے۔ تاہم، براؤزر میں چلنے والے کلائنٹ کوڈ کے ذریعے اس کی تصدیق کی جا سکتی ہے۔

### جبری ٹرانزیکشنز {#forced-txns}

<span dir="ltr">L2s</span> پر دستیابی کو یقینی بنانے اور سنسرشپ کو روکنے کا معمول کا طریقہ کار [جبری ٹرانزیکشنز](https://docs.optimism.io/stack/transactions/forced-transaction) ہے۔ لیکن جبری ٹرانزیکشنز صفر علم ثبوتوں کے ساتھ نہیں ملتیں۔ سرور واحد ہستی ہے جو ٹرانزیکشنز کی تصدیق کر سکتی ہے۔

ہم `smart-contracts/src/ZkBank.sol` میں ترمیم کر سکتے ہیں تاکہ جبری ٹرانزیکشنز کو قبول کیا جا سکے اور سرور کو اس وقت تک حالت تبدیل کرنے سے روکا جا سکے جب تک کہ ان پر کارروائی نہ ہو جائے۔ تاہم، یہ ہمیں ایک سادہ ڈینائل آف سروس (denial-of-service) حملے کے لیے کھول دیتا ہے۔ کیا ہوگا اگر کوئی جبری ٹرانزیکشن غلط ہو اور اس لیے اس پر کارروائی کرنا ناممکن ہو؟

اس کا حل یہ ہے کہ ایک صفر علم ثبوت ہو کہ جبری ٹرانزیکشن غلط ہے۔ یہ سرور کو تین اختیارات دیتا ہے:

- جبری ٹرانزیکشن پر کارروائی کریں، ایک صفر علم ثبوت فراہم کریں کہ اس پر کارروائی ہو چکی ہے اور نئی حالت کا ہیش۔
- جبری ٹرانزیکشن کو مسترد کریں، اور کنٹریکٹ کو ایک صفر علم ثبوت فراہم کریں کہ ٹرانزیکشن غلط ہے (نامعلوم پتہ، خراب نانس، یا ناکافی بیلنس)۔
- جبری ٹرانزیکشن کو نظر انداز کریں۔ سرور کو دراصل ٹرانزیکشن پر کارروائی کرنے پر مجبور کرنے کا کوئی طریقہ نہیں ہے، لیکن اس کا مطلب ہے کہ پورا سسٹم دستیاب نہیں ہے۔

#### دستیابی بانڈز {#avail-bonds}

حقیقی زندگی کے نفاذ میں، سرور کو چلانے کے لیے شاید کسی قسم کا منافع کا مقصد ہوگا۔ ہم سرور سے ایک دستیابی بانڈ پوسٹ کروا کر اس ترغیب کو مضبوط کر سکتے ہیں جسے کوئی بھی جلا (burn) سکتا ہے اگر کسی خاص مدت کے اندر جبری ٹرانزیکشن پر کارروائی نہیں کی جاتی ہے۔

### خراب Noir کوڈ {#bad-noir-code}

عام طور پر، لوگوں کو سمارٹ کنٹریکٹ پر بھروسہ دلانے کے لیے ہم سورس کوڈ کو ایک [بلاک ایکسپلورر](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) پر اپ لوڈ کرتے ہیں۔ تاہم، صفر علم ثبوتوں کے معاملے میں، یہ ناکافی ہے۔

`Verifier.sol` میں تصدیقی کلید شامل ہے، جو Noir پروگرام کا ایک فنکشن ہے۔ تاہم، وہ کلید ہمیں یہ نہیں بتاتی کہ Noir پروگرام کیا تھا۔ دراصل ایک قابل اعتماد حل حاصل کرنے کے لیے، آپ کو Noir پروگرام (اور وہ ورژن جس نے اسے بنایا) اپ لوڈ کرنے کی ضرورت ہے۔ بصورت دیگر، صفر علم ثبوت ایک مختلف پروگرام کی عکاسی کر سکتے ہیں، جس میں بیک ڈور (back door) ہو۔

جب تک بلاک ایکسپلوررز ہمیں Noir پروگرام اپ لوڈ کرنے اور ان کی تصدیق کرنے کی اجازت دینا شروع نہیں کرتے، آپ کو یہ خود کرنا چاہیے (ترجیحی طور پر [IPFS](/developers/tutorials/ipfs-decentralized-ui/) پر)۔ پھر نفیس صارفین سورس کوڈ ڈاؤن لوڈ کرنے، اسے خود مرتب کرنے، `Verifier.sol` بنانے، اور اس بات کی تصدیق کرنے کے قابل ہوں گے کہ یہ آن چین والے کے بالکل مماثل ہے۔

## نتیجہ {#conclusion}

پلازما قسم کی ایپلی کیشنز کو معلومات کے ذخیرہ کے طور پر ایک مرکزی جزو کی ضرورت ہوتی ہے۔ یہ ممکنہ کمزوریوں کو کھولتا ہے لیکن، اس کے بدلے میں، ہمیں ان طریقوں سے رازداری کو برقرار رکھنے کی اجازت دیتا ہے جو خود بلاک چین پر دستیاب نہیں ہیں۔ صفر علم ثبوتوں کے ساتھ ہم سالمیت کو یقینی بنا سکتے ہیں اور ممکنہ طور پر جو بھی مرکزی جزو چلا رہا ہے اس کے لیے دستیابی کو برقرار رکھنا معاشی طور پر فائدہ مند بنا سکتے ہیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔

## اعترافات {#acknowledgements}

- جوش کرائٹس (Josh Crites) نے اس مضمون کا مسودہ پڑھا اور ایک مشکل Noir مسئلے میں میری مدد کی۔

باقی ماندہ کوئی بھی غلطیاں میری ذمہ داری ہیں۔
