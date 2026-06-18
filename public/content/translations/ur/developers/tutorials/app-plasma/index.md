---
title: ایک ایپ کے لیے مخصوص پلازما لکھیں جو رازداری کو برقرار رکھے
description: اس ٹیوٹوریل میں، ہم ڈپازٹس کے لیے ایک نیم خفیہ بینک بناتے ہیں۔ بینک ایک مرکزی جزو ہے؛ یہ ہر صارف کا بیلنس جانتا ہے۔ تاہم، یہ معلومات آن چین محفوظ نہیں کی جاتی ہے۔ اس کے بجائے، بینک حالت کا ایک ہیش پوسٹ کرتا ہے۔ جب بھی کوئی ٹرانزیکشن ہوتی ہے، بینک نیا ہیش پوسٹ کرتا ہے، اس کے ساتھ ایک صفر علم ثبوت بھی ہوتا ہے کہ اس کے پاس ایک دستخط شدہ ٹرانزیکشن ہے جو ہیش کی حالت کو نئے میں تبدیل کرتی ہے۔ اس ٹیوٹوریل کو پڑھنے کے بعد، آپ نہ صرف یہ سمجھیں گے کہ صفر علم ثبوت کیسے استعمال کیے جاتے ہیں، بلکہ یہ بھی کہ آپ انہیں کیوں استعمال کرتے ہیں اور اسے محفوظ طریقے سے کیسے کیا جائے۔
author: اوری پومیرانٹز
tags:
  - صفر علم
  - سرور
  - آف چین
  - رازداری
skill: advanced
breadcrumb: ایپ کے لیے مخصوص پلازما
lang: ur
published: 2025-10-15
---
## تعارف {#introduction}

[رول اپس](/developers/docs/scaling/zk-rollups/) کے برعکس، [پلازما](/developers/docs/scaling/plasma) سالمیت کے لیے ایتھیریم مین نیٹ کا استعمال کرتے ہیں، لیکن دستیابی کے لیے نہیں۔ اس مضمون میں، ہم ایک ایسی ایپلی کیشن لکھتے ہیں جو پلازما کی طرح برتاؤ کرتی ہے، جس میں ایتھیریم سالمیت کی ضمانت دیتا ہے (کوئی غیر مجاز تبدیلیاں نہیں) لیکن دستیابی کی نہیں (ایک مرکزی جزو خراب ہو سکتا ہے اور پورے سسٹم کو غیر فعال کر سکتا ہے)۔

ہم یہاں جو ایپلی کیشن لکھتے ہیں وہ ایک رازداری کو برقرار رکھنے والا بینک ہے۔ مختلف پتوں کے پاس بیلنس والے اکاؤنٹس ہوتے ہیں، اور وہ دوسرے اکاؤنٹس میں رقم (<span dir="ltr">ETH</span>) بھیج سکتے ہیں۔ بینک حالت (اکاؤنٹس اور ان کے بیلنس) اور ٹرانزیکشنز کے ہیش پوسٹ کرتا ہے، لیکن اصل بیلنس کو آف چین رکھتا ہے جہاں وہ نجی رہ سکتے ہیں۔

## ڈیزائن {#design}

یہ کوئی پروڈکشن کے لیے تیار سسٹم نہیں ہے، بلکہ ایک تدریسی ٹول ہے۔ اس لیے، اسے کئی سادہ مفروضوں کے ساتھ لکھا گیا ہے۔

- مقررہ اکاؤنٹ پول۔ اکاؤنٹس کی ایک مخصوص تعداد ہوتی ہے، اور ہر اکاؤنٹ ایک پہلے سے طے شدہ پتہ سے تعلق رکھتا ہے۔ یہ ایک بہت ہی سادہ سسٹم بناتا ہے کیونکہ صفر علم ثبوت (zero-knowledge proofs) میں متغیر سائز کے ڈیٹا اسٹرکچرز کو سنبھالنا مشکل ہوتا ہے۔ پروڈکشن کے لیے تیار سسٹم کے لیے، ہم [مرکل روٹ](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) کو حالت کے ہیش کے طور پر استعمال کر سکتے ہیں اور مطلوبہ بیلنس کے لیے مرکل ثبوت فراہم کر سکتے ہیں۔

- میموری اسٹوریج۔ پروڈکشن سسٹم پر، ہمیں تمام اکاؤنٹ بیلنس کو ڈسک پر لکھنے کی ضرورت ہوتی ہے تاکہ ری اسٹارٹ کی صورت میں انہیں محفوظ رکھا جا سکے۔ یہاں، اگر معلومات محض ضائع ہو جائیں تو کوئی مسئلہ نہیں ہے۔

- صرف منتقلی۔ ایک پروڈکشن سسٹم کو بینک میں اثاثے جمع کرنے اور انہیں نکالنے کے طریقے کی ضرورت ہوگی۔ لیکن یہاں مقصد صرف تصور کو واضح کرنا ہے، اس لیے یہ بینک صرف منتقلی تک محدود ہے۔

### صفر علم ثبوت {#zero-knowledge-proofs}

بنیادی سطح پر، ایک صفر علم ثبوت یہ ظاہر کرتا ہے کہ ثابت کنندہ کچھ ڈیٹا، _Data<sub>private</sub>_ جانتا ہے، اس طرح کہ کچھ عوامی ڈیٹا، _Data<sub>public</sub>_، اور _Data<sub>private</sub>_ کے درمیان ایک تعلق _Relationship_ موجود ہے۔ تصدیق کنندہ _Relationship_ اور _Data<sub>public</sub>_ کو جانتا ہے۔

رازداری کو برقرار رکھنے کے لیے، ہمیں حالتوں اور ٹرانزیکشنز کو نجی رکھنے کی ضرورت ہے۔ لیکن سالمیت کو یقینی بنانے کے لیے، ہمیں حالتوں کے [کرپٹوگرافک ہیش](https://en.wikipedia.org/wiki/Cryptographic_hash_function) کو عوامی رکھنے کی ضرورت ہے۔ ٹرانزیکشنز جمع کرنے والے لوگوں کو یہ ثابت کرنے کے لیے کہ وہ ٹرانزیکشنز واقعی ہوئی ہیں، ہمیں ٹرانزیکشن ہیش بھی پوسٹ کرنے کی ضرورت ہے۔

زیادہ تر معاملات میں، _Data<sub>private</sub>_ صفر علم ثبوت پروگرام کا ان پٹ ہوتا ہے، اور _Data<sub>public</sub>_ آؤٹ پٹ ہوتا ہے۔

_Data<sub>private</sub>_ میں یہ فیلڈز ہیں:

- _State<sub>n</sub>_، پرانی حالت
- _State<sub>n+1</sub>_، نئی حالت
- _Transaction_، ایک ٹرانزیکشن جو پرانی حالت سے نئی حالت میں تبدیل ہوتی ہے۔ اس ٹرانزیکشن میں ان فیلڈز کا شامل ہونا ضروری ہے:
  - _Destination address_ جو منتقلی وصول کرتا ہے
  - _Amount_ جو منتقل کی جا رہی ہے
  - _Nonce_ یہ یقینی بنانے کے لیے کہ ہر ٹرانزیکشن پر صرف ایک بار کارروائی کی جا سکے۔
    ماخذ کا پتہ ٹرانزیکشن میں ہونے کی ضرورت نہیں ہے، کیونکہ اسے دستخط سے بازیافت کیا جا سکتا ہے۔
- _Signature_، ایک دستخط جو ٹرانزیکشن انجام دینے کا مجاز ہے۔ ہمارے معاملے میں، ٹرانزیکشن انجام دینے کا مجاز واحد پتہ ماخذ کا پتہ ہے۔ چونکہ ہمارا صفر علم سسٹم اپنے مخصوص طریقے سے کام کرتا ہے، اس لیے ہمیں ایتھیریم دستخط کے علاوہ اکاؤنٹ کی عوامی کلید کی بھی ضرورت ہے۔

_Data<sub>public</sub>_ میں یہ فیلڈز ہیں:

- _Hash(State<sub>n</sub>)_ پرانی حالت کا ہیش
- _Hash(State<sub>n+1</sub>)_ نئی حالت کا ہیش
- _Hash(Transaction)_ اس ٹرانزیکشن کا ہیش جو حالت کو _State<sub>n</sub>_ سے _State<sub>n+1</sub>_ میں تبدیل کرتی ہے۔

یہ تعلق کئی شرائط کی جانچ کرتا ہے:

- عوامی ہیشز درحقیقت نجی فیلڈز کے لیے درست ہیشز ہیں۔
- ٹرانزیکشن، جب پرانی حالت پر لاگو ہوتی ہے، تو اس کا نتیجہ نئی حالت کی صورت میں نکلتا ہے۔
- دستخط ٹرانزیکشن کے ماخذ کے پتہ سے آتا ہے۔

کرپٹوگرافک ہیش فنکشنز کی خصوصیات کی وجہ سے، ان شرائط کو ثابت کرنا سالمیت کو یقینی بنانے کے لیے کافی ہے۔

### ڈیٹا اسٹرکچرز {#data-structures}

بنیادی ڈیٹا اسٹرکچر وہ حالت ہے جو سرور کے پاس ہوتی ہے۔ ہر اکاؤنٹ کے لیے، سرور اکاؤنٹ کے بیلنس اور ایک [نانس](https://en.wikipedia.org/wiki/Cryptographic_nonce) کا ریکارڈ رکھتا ہے، جسے [ری پلے حملوں](https://en.wikipedia.org/wiki/Replay_attack) کو روکنے کے لیے استعمال کیا جاتا ہے۔

### اجزاء {#components}

اس سسٹم کو دو اجزاء کی ضرورت ہوتی ہے:

- _سرور_ جو ٹرانزیکشنز وصول کرتا ہے، ان پر کارروائی کرتا ہے، اور صفر علم ثبوت کے ساتھ چین پر ہیشز پوسٹ کرتا ہے۔
- ایک _سمارٹ کنٹریکٹ_ جو ہیشز کو اسٹور کرتا ہے اور صفر علم ثبوت کی تصدیق کرتا ہے تاکہ یہ یقینی بنایا جا سکے کہ حالت کی تبدیلیاں جائز ہیں۔

### ڈیٹا اور کنٹرول فلو {#flows}

یہ وہ طریقے ہیں جن سے مختلف اجزاء ایک اکاؤنٹ سے دوسرے اکاؤنٹ میں منتقلی کے لیے بات چیت کرتے ہیں۔

1. ایک ویب براؤزر ایک دستخط شدہ ٹرانزیکشن جمع کراتا ہے جس میں دستخط کنندہ کے اکاؤنٹ سے کسی دوسرے اکاؤنٹ میں منتقلی کی درخواست کی جاتی ہے۔

2. سرور تصدیق کرتا ہے کہ ٹرانزیکشن درست ہے:

   - دستخط کنندہ کا بینک میں کافی بیلنس کے ساتھ ایک اکاؤنٹ ہے۔
   - وصول کنندہ کا بینک میں ایک اکاؤنٹ ہے۔

3. سرور دستخط کنندہ کے بیلنس سے منتقل کی گئی رقم کو گھٹا کر اور اسے وصول کنندہ کے بیلنس میں شامل کر کے نئی حالت کا حساب لگاتا ہے۔

4. سرور ایک صفر علم ثبوت کا حساب لگاتا ہے کہ حالت کی تبدیلی درست ہے۔

5. سرور ایتھیریم کو ایک ٹرانزیکشن جمع کراتا ہے جس میں شامل ہیں:

   - نئی حالت کا ہیش
   - ٹرانزیکشن ہیش (تاکہ ٹرانزیکشن بھیجنے والا جان سکے کہ اس پر کارروائی ہو چکی ہے)
   - صفر علم ثبوت جو یہ ثابت کرتا ہے کہ نئی حالت میں تبدیلی درست ہے

6. سمارٹ کنٹریکٹ صفر علم ثبوت کی تصدیق کرتا ہے۔

7. اگر صفر علم ثبوت درست ثابت ہوتا ہے، تو سمارٹ کنٹریکٹ یہ کارروائیاں انجام دیتا ہے:
   - موجودہ حالت کے ہیش کو نئی حالت کے ہیش میں اپ ڈیٹ کرتا ہے
   - نئی حالت کے ہیش اور ٹرانزیکشن ہیش کے ساتھ ایک لاگ انٹری خارج کرتا ہے

### ٹولز {#tools}

کلائنٹ سائیڈ کوڈ کے لیے، ہم [Vite](https://vite.dev/)، [React](https://react.dev/)، [Viem](https://viem.sh/)، اور [Wagmi](https://wagmi.sh/) استعمال کرنے جا رہے ہیں۔ یہ انڈسٹری کے معیاری ٹولز ہیں؛ اگر آپ ان سے واقف نہیں ہیں، تو آپ [یہ ٹیوٹوریل](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) استعمال کر سکتے ہیں۔

سرور کا زیادہ تر حصہ [Node](https://nodejs.org/en) کا استعمال کرتے ہوئے JavaScript میں لکھا گیا ہے۔ صفر علم کا حصہ [Noir](https://noir-lang.org/) میں لکھا گیا ہے۔ ہمیں ورژن `1.0.0-beta.10` کی ضرورت ہے، لہذا [ہدایات کے مطابق Noir انسٹال کرنے](https://noir-lang.org/docs/getting_started/quick_start) کے بعد، یہ چلائیں:

```
noirup -v 1.0.0-beta.10
```

جو بلاک چین ہم استعمال کرتے ہیں وہ `anvil` ہے، جو ایک مقامی ٹیسٹنگ بلاک چین ہے اور [Foundry](https://getfoundry.sh/introduction/installation) کا حصہ ہے۔

## عمل درآمد {#implementation}

چونکہ یہ ایک پیچیدہ نظام ہے، ہم اسے مراحل میں نافذ کریں گے۔

### مرحلہ 1 - دستی صفر علم {#stage-1}

پہلے مرحلے کے لیے، ہم براؤزر میں ایک ٹرانزیکشن پر دستخط کریں گے اور پھر دستی طور پر صفر علم ثبوت کو معلومات فراہم کریں گے۔ صفر علم کوڈ کو یہ معلومات `server/noir/Prover.toml` میں حاصل کرنے کی توقع ہے ([یہاں](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) دستاویزی شکل میں موجود ہے)۔

اسے عملی شکل میں دیکھنے کے لیے:

1. یقینی بنائیں کہ آپ کے پاس [Node](https://nodejs.org/en/download) اور [Noir](https://noir-lang.org/install) انسٹال ہیں۔ ترجیحی طور پر، انہیں UNIX سسٹم جیسے macOS، Linux، یا [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) پر انسٹال کریں۔

2. مرحلہ 1 کا کوڈ ڈاؤن لوڈ کریں اور کلائنٹ کوڈ پیش کرنے کے لیے ویب سرور شروع کریں۔

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   یہاں آپ کو ویب سرور کی ضرورت اس لیے ہے کہ، کچھ مخصوص قسم کے فراڈ کو روکنے کے لیے، بہت سے والیٹس (جیسے میٹاماسک) براہ راست ڈسک سے پیش کی گئی فائلوں کو قبول نہیں کرتے ہیں۔

3. والیٹ کے ساتھ ایک براؤزر کھولیں۔

4. والیٹ میں، ایک نیا پاسفریز درج کریں۔ یاد رکھیں کہ یہ آپ کے موجودہ پاسفریز کو حذف کر دے گا، لہذا _یقینی بنائیں کہ آپ کے پاس بیک اپ موجود ہے_۔

   پاسفریز `test test test test test test test test test test test junk` ہے، جو anvil کے لیے ڈیفالٹ ٹیسٹنگ پاسفریز ہے۔

5. [کلائنٹ سائیڈ کوڈ](http://localhost:5173/) پر براؤز کریں۔

6. والیٹ سے جڑیں اور اپنا منزل کا اکاؤنٹ اور رقم منتخب کریں۔

7. **Sign** پر کلک کریں اور ٹرانزیکشن پر دستخط کریں۔

8. **Prover.toml** ہیڈنگ کے نیچے، آپ کو متن ملے گا۔ `server/noir/Prover.toml` کو اس متن سے تبدیل کریں۔

9. صفر علم ثبوت کو انجام دیں۔

   ```sh
   cd ../server/noir
   nargo execute
   ```

   آؤٹ پٹ کچھ اس طرح ہونا چاہیے

      ```
ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. آخری دو اقدار کا موازنہ اس ہیش سے کریں جو آپ ویب براؤزر پر دیکھتے ہیں تاکہ یہ معلوم ہو سکے کہ آیا پیغام کو درست طریقے سے ہیش کیا گیا ہے۔

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[یہ فائل](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) وہ معلوماتی فارمیٹ دکھاتی ہے جس کی Noir کو توقع ہے۔

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

پیغام ٹیکسٹ فارمیٹ میں ہے، جس سے صارف کے لیے اسے سمجھنا آسان ہو جاتا ہے (جو دستخط کرتے وقت ضروری ہے) اور Noir کوڈ کے لیے اسے پارس کرنا آسان ہوتا ہے۔ رقم کو فنی میں ظاہر کیا گیا ہے تاکہ ایک طرف جزوی منتقلی ممکن ہو سکے، اور دوسری طرف اسے آسانی سے پڑھا جا سکے۔ آخری نمبر [نانس](https://en.wikipedia.org/wiki/Cryptographic_nonce) ہے۔

سٹرنگ کی لمبائی <span dir="ltr">100</span> حروف ہے۔ صفر علم ثبوت متغیر سائز کے ڈیٹا کو اچھی طرح سے ہینڈل نہیں کرتے ہیں، اس لیے اکثر ڈیٹا کو پیڈ (pad) کرنا ضروری ہوتا ہے۔

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

یہ تینوں پیرامیٹرز فکسڈ سائز بائٹ ایریز ہیں۔

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

یہ سٹرکچرز کی ایک ایری (array) کی وضاحت کرنے کا طریقہ ہے۔ ہر اندراج کے لیے، ہم پتہ، بیلنس (milliETH عرف [فنی](https://cryptovalleyjournal.com/glossary/finney/) میں)، اور اگلی نانس ویلیو کی وضاحت کرتے ہیں۔

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[یہ فائل](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) کلائنٹ سائیڈ پروسیسنگ کو نافذ کرتی ہے اور `server/noir/Prover.toml` فائل تیار کرتی ہے (وہ جس میں صفر علم پیرامیٹرز شامل ہیں)۔

یہاں زیادہ دلچسپ حصوں کی وضاحت ہے۔

```tsx
export default attrs =>  {
```

یہ فنکشن `Transfer` React کمپوننٹ بناتا ہے، جسے دوسری فائلیں امپورٹ کر سکتی ہیں۔

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

یہ اکاؤنٹ کے پتے ہیں، وہ پتے جو `test ... test junk` پاسفریز کے ذریعے بنائے گئے ہیں۔ اگر آپ اپنے پتے استعمال کرنا چاہتے ہیں، تو بس اس تعریف میں ترمیم کریں۔

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

یہ [Wagmi ہکس](https://wagmi.sh/react/api/hooks) ہمیں [Viem](https://viem.sh/) لائبریری اور والیٹ تک رسائی کی اجازت دیتے ہیں۔

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

یہ پیغام ہے، جسے خالی جگہوں (spaces) کے ساتھ پیڈ کیا گیا ہے۔ جب بھی [`useState`](https://react.dev/reference/react/useState) متغیرات میں سے کوئی ایک تبدیل ہوتا ہے، تو کمپوننٹ دوبارہ ڈرا ہوتا ہے اور `message` اپ ڈیٹ ہو جاتا ہے۔

```tsx
  const sign = async () => {
```

یہ فنکشن اس وقت کال کیا جاتا ہے جب صارف **Sign** بٹن پر کلک کرتا ہے۔ پیغام خود بخود اپ ڈیٹ ہو جاتا ہے، لیکن دستخط کے لیے والیٹ میں صارف کی منظوری درکار ہوتی ہے، اور ہم اس وقت تک اس کا مطالبہ نہیں کرنا چاہتے جب تک کہ ضرورت نہ ہو۔

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

والیٹ سے [پیغام پر دستخط کرنے](https://viem.sh/docs/accounts/local/signMessage) کا کہیں۔ 

```tsx
    const hash = hashMessage(message)
```

پیغام کا ہیش حاصل کریں۔ اسے ڈیبگنگ (Noir کوڈ کی) کے لیے صارف کو فراہم کرنا مددگار ثابت ہوتا ہے۔ 

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

حالت کے متغیرات سیٹ کریں۔ ایسا کرنے سے کمپوننٹ دوبارہ ڈرا ہوتا ہے (`sign` فنکشن کے ختم ہونے کے بعد) اور صارف کو اپ ڈیٹ شدہ اقدار دکھاتا ہے۔

```tsx
    let proverToml = `
```

`Prover.toml` کے لیے متن۔

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem ہمیں عوامی کلید ایک <span dir="ltr">65-byte</span> ہیکساڈیسیمل سٹرنگ کے طور پر فراہم کرتا ہے۔ پہلی بائٹ `0x04` ہے، جو ایک ورژن مارکر ہے۔ اس کے بعد عوامی کلید کے `x` کے لیے <span dir="ltr">32 bytes</span> اور پھر عوامی کلید کے `y` کے لیے <span dir="ltr">32 bytes</span> ہوتے ہیں۔

تاہم، Noir کو یہ معلومات دو بائٹ ایریز کے طور پر حاصل کرنے کی توقع ہے، ایک `x` کے لیے اور ایک `y` کے لیے۔ اسے صفر علم ثبوت کے حصے کے بجائے یہاں کلائنٹ پر پارس کرنا زیادہ آسان ہے۔

یاد رکھیں کہ عام طور پر صفر علم میں یہ ایک اچھی پریکٹس ہے۔ صفر علم ثبوت کے اندر موجود کوڈ مہنگا ہوتا ہے، اس لیے کوئی بھی پروسیسنگ جو صفر علم ثبوت کے باہر کی جا سکتی ہے، اسے صفر علم ثبوت کے باہر ہی کیا جانا _چاہیے_۔

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

دستخط بھی ایک <span dir="ltr">65-byte</span> ہیکساڈیسیمل سٹرنگ کے طور پر فراہم کیا جاتا ہے۔ تاہم، آخری بائٹ صرف عوامی کلید کو بازیافت کرنے کے لیے ضروری ہے۔ چونکہ عوامی کلید پہلے ہی Noir کوڈ کو فراہم کی جائے گی، اس لیے ہمیں دستخط کی تصدیق کے لیے اس کی ضرورت نہیں ہے، اور Noir کوڈ کو اس کی ضرورت نہیں ہوتی۔

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

یہ کمپوننٹ کا HTML (زیادہ درست طور پر، [JSX](https://react.dev/learn/writing-markup-with-jsx)) فارمیٹ ہے۔

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[یہ فائل](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) اصل صفر علم کوڈ ہے۔

```
use std::hash::pedersen_hash;
```

[Pedersen ہیش](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) کو [Noir سٹینڈرڈ لائبریری](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) کے ساتھ فراہم کیا گیا ہے۔ صفر علم ثبوت عام طور پر اس ہیش فنکشن کا استعمال کرتے ہیں۔ معیاری ہیش فنکشنز کے مقابلے میں [ریاضیاتی سرکٹس](https://rareskills.io/post/arithmetic-circuit) کے اندر اس کا حساب لگانا بہت آسان ہے۔

```
use keccak256::keccak256;
use dep::ecrecover;
```

یہ دونوں فنکشنز بیرونی لائبریریاں ہیں، جن کی تعریف [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) میں کی گئی ہے۔ یہ بالکل وہی ہیں جن کے لیے ان کا نام رکھا گیا ہے، ایک فنکشن جو [keccak256 ہیش](https://emn178.github.io/online-tools/keccak_256.html) کا حساب لگاتا ہے اور ایک فنکشن جو ایتھیریم دستخطوں کی تصدیق کرتا ہے اور دستخط کنندہ کا ایتھیریم پتہ بازیافت کرتا ہے۔

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir [Rust](https://www.rust-lang.org/) سے متاثر ہے۔ متغیرات، ڈیفالٹ کے طور پر، مستقل (constants) ہوتے ہیں۔ اس طرح ہم عالمی کنفیگریشن مستقلات کی وضاحت کرتے ہیں۔ خاص طور پر، `ACCOUNT_NUMBER` ان اکاؤنٹس کی تعداد ہے جو ہم محفوظ کرتے ہیں۔

`u<number>` نامی ڈیٹا ٹائپس اتنے بٹس کی تعداد ہیں، جو ان سائنڈ (unsigned) ہیں۔ صرف `u8`، `u16`، `u32`، `u64`، اور `u128` ٹائپس ہی سپورٹڈ ہیں۔

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

یہ متغیر اکاؤنٹس کے Pedersen ہیش کے لیے استعمال ہوتا ہے، جیسا کہ ذیل میں بیان کیا گیا ہے۔

```
global MESSAGE_LENGTH : u32 = 100;
```

جیسا کہ اوپر بیان کیا گیا ہے، پیغام کی لمبائی فکسڈ ہے۔ اسے یہاں بیان کیا گیا ہے۔

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 دستخطوں](https://eips.ethereum.org/EIPS/eip-191) کے لیے ایک بفر درکار ہوتا ہے جس میں <span dir="ltr">26-byte</span> کا سابقہ (prefix) ہو، اس کے بعد ASCII میں پیغام کی لمبائی، اور آخر میں خود پیغام ہو۔

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

وہ معلومات جو ہم کسی اکاؤنٹ کے بارے میں محفوظ کرتے ہیں۔ [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) ایک نمبر ہے، جو عام طور پر <span dir="ltr">253 bits</span> تک ہوتا ہے، جسے براہ راست [ریاضیاتی سرکٹ](https://rareskills.io/post/arithmetic-circuit) میں استعمال کیا جا سکتا ہے جو صفر علم ثبوت کو نافذ کرتا ہے۔ یہاں ہم <span dir="ltr">160-bit</span> ایتھیریم پتہ محفوظ کرنے کے لیے `Field` کا استعمال کرتے ہیں۔

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

وہ معلومات جو ہم منتقلی کی ٹرانزیکشن کے لیے محفوظ کرتے ہیں۔

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

ایک فنکشن کی تعریف۔ پیرامیٹر `Account` کی معلومات ہے۔ نتیجہ `Field` متغیرات کی ایک ایری ہے، جس کی لمبائی `FLAT_ACCOUNT_FIELDS` ہے

```
let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

ایری میں پہلی ویلیو اکاؤنٹ کا پتہ ہے۔ دوسری میں بیلنس اور نانس دونوں شامل ہیں۔ `.into()` کالز کسی نمبر کو اس ڈیٹا ٹائپ میں تبدیل کرتی ہیں جس کی اسے ضرورت ہوتی ہے۔ `account.nonce` ایک `u32` ویلیو ہے، لیکن اسے `account.balance << 32` میں شامل کرنے کے لیے، جو کہ ایک `u128` ویلیو ہے، اسے `u128` ہونا چاہیے۔ یہ پہلی `.into()` ہے۔ دوسری `u128` کے نتیجے کو `Field` میں تبدیل کرتی ہے تاکہ یہ ایری میں فٹ ہو سکے۔

```
flat
}
```

Noir میں، فنکشنز صرف آخر میں ایک ویلیو واپس کر سکتے ہیں (کوئی ابتدائی واپسی نہیں ہے)۔ واپسی کی ویلیو کی وضاحت کرنے کے لیے، آپ اسے فنکشن کے اختتامی بریکٹ سے بالکل پہلے جانچتے ہیں۔

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

یہ فنکشن اکاؤنٹس کی ایری کو `Field` ایری میں تبدیل کرتا ہے، جسے Petersen ہیش کے ان پٹ کے طور پر استعمال کیا جا سکتا ہے۔

```
let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

اس طرح آپ ایک قابل تغیر (mutable) متغیر کی وضاحت کرتے ہیں، یعنی جو مستقل _نہیں_ ہے۔ Noir میں متغیرات کی ہمیشہ ایک ویلیو ہونی چاہیے، اس لیے ہم اس متغیر کو تمام صفر (zeros) کے ساتھ شروع کرتے ہیں۔

```
for i in 0..ACCOUNT_NUMBER {
```

یہ ایک `for` لوپ ہے۔ یاد رکھیں کہ حدود مستقل ہیں۔ Noir لوپس کی حدود کو کمپائل ٹائم پر معلوم ہونا چاہیے۔ اس کی وجہ یہ ہے کہ ریاضیاتی سرکٹس فلو کنٹرول کو سپورٹ نہیں کرتے ہیں۔ `for` لوپ پر کارروائی کرتے وقت، کمپائلر آسانی سے اس کے اندر موجود کوڈ کو کئی بار رکھتا ہے، ہر تکرار (iteration) کے لیے ایک بار۔

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

آخر کار، ہم اس فنکشن تک پہنچ گئے جو اکاؤنٹس کی ایری کو ہیش کرتا ہے۔

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

یہ فنکشن ایک مخصوص پتے والے اکاؤنٹ کو تلاش کرتا ہے۔ یہ فنکشن معیاری کوڈ میں انتہائی غیر موثر ہوگا کیونکہ یہ تمام اکاؤنٹس پر اعادہ (iterate) کرتا ہے، یہاں تک کہ پتہ ملنے کے بعد بھی۔

تاہم، صفر علم ثبوتوں میں، کوئی فلو کنٹرول نہیں ہوتا ہے۔ اگر ہمیں کبھی کسی شرط کو چیک کرنے کی ضرورت ہو، تو ہمیں اسے ہر بار چیک کرنا پڑتا ہے۔

اسی طرح کی چیز `if` سٹیٹمنٹس کے ساتھ ہوتی ہے۔ اوپر دیے گئے لوپ میں `if` سٹیٹمنٹ کا ترجمہ ان ریاضیاتی بیانات میں کیا گیا ہے۔

_condition<sub>result</sub> = accounts[i].address == address_ // اگر وہ برابر ہیں تو ایک، بصورت دیگر صفر

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) فنکشن صفر علم ثبوت کو کریش کرنے کا سبب بنتا ہے اگر دعویٰ (assertion) غلط ہو۔ اس صورت میں، اگر ہمیں متعلقہ پتے والا اکاؤنٹ نہیں ملتا ہے۔ پتے کی اطلاع دینے کے لیے، ہم ایک [فارمیٹ سٹرنگ](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) استعمال کرتے ہیں۔

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

ہم Noir میں فارمیٹ سٹرنگ کے اندر سٹرکچر عناصر تک رسائی حاصل نہیں کر سکتے، اس لیے ہم ایک قابل استعمال کاپی بناتے ہیں۔

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

پتہ ہمیشہ <span dir="ltr">20 bytes</span> (عرف <span dir="ltr">40</span> ہیکساڈیسیمل ہندسے) لمبا ہوتا ہے، اور کریکٹر #7 سے شروع ہوتا ہے۔

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

پیغام میں، پتے کے بعد پہلا نمبر منتقل کی جانے والی فنی (عرف ETH کا ہزارواں حصہ) کی رقم ہے۔ دوسرا نمبر نانس ہے۔ ان کے درمیان کسی بھی متن کو نظر انداز کر دیا جاتا ہے۔

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

ایک [ٹیوپل (tuple)](https://noir-lang.org/docs/noir/concepts/data_types/tuples) واپس کرنا Noir کا کسی فنکشن سے متعدد اقدار واپس کرنے کا طریقہ ہے۔

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
// Viem کے hashMessage کے مساوی
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

ہم اکاؤنٹس کے لیے Pedersen ہیش استعمال کرنے کے قابل تھے کیونکہ انہیں صرف صفر علم ثبوت کے اندر ہیش کیا جاتا ہے۔ تاہم، اس کوڈ میں ہمیں پیغام کے دستخط کو چیک کرنے کی ضرورت ہے، جو براؤزر کے ذریعے تیار کیا جاتا ہے۔ اس کے لیے، ہمیں [EIP-191](https://eips.ethereum.org/EIPS/eip-191) میں ایتھیریم دستخطی فارمیٹ کی پیروی کرنے کی ضرورت ہے۔ اس کا مطلب ہے کہ ہمیں ایک معیاری سابقہ، ASCII میں پیغام کی لمبائی، اور خود پیغام کے ساتھ ایک مشترکہ بفر بنانے کی ضرورت ہے، اور اسے ہیش کرنے کے لیے ایتھیریم کے معیاری keccak256 کا استعمال کرنا ہوگا۔

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

ایسے معاملات سے بچنے کے لیے جہاں کوئی ایپلیکیشن صارف سے ایسے پیغام پر دستخط کرنے کو کہتی ہے جسے ٹرانزیکشن یا کسی اور مقصد کے لیے استعمال کیا جا سکتا ہے، EIP-191 یہ بتاتا ہے کہ تمام دستخط شدہ پیغامات کریکٹر <span dir="ltr">0x19</span> (جو ایک درست ASCII کریکٹر نہیں ہے) سے شروع ہوتے ہیں جس کے بعد `Ethereum Signed Message:` اور ایک نئی لائن ہوتی ہے۔

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

پیغام کی لمبائی کو <span dir="ltr">999</span> تک ہینڈل کریں اور اگر یہ اس سے زیادہ ہو تو ناکام ہو جائیں۔ میں نے یہ کوڈ شامل کیا ہے، حالانکہ پیغام کی لمبائی ایک مستقل ہے، کیونکہ اس سے اسے تبدیل کرنا آسان ہو جاتا ہے۔ پروڈکشن سسٹم پر، آپ شاید بہتر کارکردگی کی خاطر یہ فرض کر لیں گے کہ `MESSAGE_LENGTH` تبدیل نہیں ہوتا ہے۔

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

یہ فنکشن دستخط کی تصدیق کرتا ہے، جس کے لیے پیغام کے ہیش کی ضرورت ہوتی ہے۔ پھر یہ ہمیں وہ پتہ فراہم کرتا ہے جس نے اس پر دستخط کیے ہیں اور پیغام کا ہیش دیتا ہے۔ پیغام کا ہیش دو `Field` اقدار میں فراہم کیا جاتا ہے کیونکہ بائٹ ایری کے مقابلے میں پروگرام کے باقی حصے میں ان کا استعمال آسان ہوتا ہے۔

ہمیں دو `Field` اقدار استعمال کرنے کی ضرورت ہے کیونکہ فیلڈ کیلکولیشنز ایک بڑے نمبر کے [ماڈیولو (modulo)](https://en.wikipedia.org/wiki/Modulo) کے ذریعے کی جاتی ہیں، لیکن وہ نمبر عام طور پر <span dir="ltr">256 bits</span> سے کم ہوتا ہے (بصورت دیگر EVM میں ان کیلکولیشنز کو انجام دینا مشکل ہوگا)۔

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
    
یہ [Solidity کے `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) سے ملتا جلتا ہے، جس میں دو اہم فرق ہیں:

- اگر دستخط درست نہیں ہے، تو کال ایک `assert` میں ناکام ہو جاتی ہے اور پروگرام منسوخ ہو جاتا ہے۔
- اگرچہ عوامی کلید کو دستخط اور ہیش سے بازیافت کیا جا سکتا ہے، لیکن یہ وہ پروسیسنگ ہے جو بیرونی طور پر کی جا سکتی ہے اور، اس لیے، اسے صفر علم ثبوت کے اندر کرنا مناسب نہیں ہے۔ اگر کوئی ہمیں یہاں دھوکہ دینے کی کوشش کرتا ہے، تو دستخط کی تصدیق ناکام ہو جائے گی۔

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

آخر کار، ہم `main` فنکشن تک پہنچتے ہیں۔ ہمیں یہ ثابت کرنے کی ضرورت ہے کہ ہمارے پاس ایک ایسی ٹرانزیکشن ہے جو اکاؤنٹس کے ہیش کو پرانی ویلیو سے نئی ویلیو میں درست طریقے سے تبدیل کرتی ہے۔ ہمیں یہ بھی ثابت کرنے کی ضرورت ہے کہ اس کا یہ مخصوص ٹرانزیکشن ہیش ہے تاکہ جس شخص نے اسے بھیجا ہے اسے معلوم ہو سکے کہ ان کی ٹرانزیکشن پر کارروائی ہو چکی ہے۔

```rust
{
    let mut txn = readTransferTxn(message);
```

ہمیں `txn` کو قابل تغیر رکھنے کی ضرورت ہے کیونکہ ہم پیغام سے بھیجنے والے کا پتہ نہیں پڑھتے، ہم اسے دستخط سے پڑھتے ہیں۔ 

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

اسے عملی شکل میں دیکھنے کے لیے:

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

6. اس سے پہلے کہ آپ کوئی ٹرانزیکشن جاری کر سکیں، آپ کو نانس کے ساتھ ساتھ وہ رقم بھی معلوم ہونی چاہیے جو آپ بھیج سکتے ہیں۔ یہ معلومات حاصل کرنے کے لیے، **Update account data** پر کلک کریں اور پیغام پر دستخط کریں۔

   یہاں ہمارے سامنے ایک الجھن ہے۔ ایک طرف، ہم کسی ایسے پیغام پر دستخط نہیں کرنا چاہتے جسے دوبارہ استعمال کیا جا سکے (ایک [ری پلے اٹیک](https://en.wikipedia.org/wiki/Replay_attack))، یہی وجہ ہے کہ ہم سب سے پہلے ایک نانس چاہتے ہیں۔ تاہم، ہمارے پاس ابھی تک کوئی نانس نہیں ہے۔ اس کا حل یہ ہے کہ ایک ایسا نانس منتخب کیا جائے جسے صرف ایک بار استعمال کیا جا سکے اور جو ہمارے پاس پہلے سے ہی دونوں طرف موجود ہو، جیسے کہ موجودہ وقت۔

   اس حل کے ساتھ مسئلہ یہ ہے کہ وقت مکمل طور پر ہم آہنگ (synchronized) نہیں ہو سکتا۔ اس لیے اس کے بجائے، ہم ایک ایسی ویلیو پر دستخط کرتے ہیں جو ہر منٹ تبدیل ہوتی ہے۔ اس کا مطلب ہے کہ ری پلے حملوں کے لیے ہماری کمزوری کی ونڈو زیادہ سے زیادہ ایک منٹ ہے۔ اس بات پر غور کرتے ہوئے کہ پروڈکشن میں دستخط شدہ درخواست کو TLS کے ذریعے محفوظ کیا جائے گا، اور یہ کہ ٹنل کا دوسرا حصہ---سرور---پہلے ہی بیلنس اور نانس کو ظاہر کر سکتا ہے (کام کرنے کے لیے اسے ان کا علم ہونا ضروری ہے)، یہ ایک قابل قبول خطرہ ہے۔

7. ایک بار جب براؤزر کو بیلنس اور نانس واپس مل جاتا ہے، تو یہ منتقلی کا فارم دکھاتا ہے۔ منزل کا پتہ اور رقم منتخب کریں اور **Transfer** پر کلک کریں۔ اس درخواست پر دستخط کریں۔

8. منتقلی دیکھنے کے لیے، یا تو **Update account data** کریں یا اس ونڈو میں دیکھیں جہاں آپ سرور چلاتے ہیں۔ جب بھی حالت تبدیل ہوتی ہے تو سرور اسے لاگ کرتا ہے۔

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

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) لائبریری JavaScript کوڈ اور Noir کوڈ کے درمیان انٹرفیس کا کام کرتی ہے۔

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

اکاؤنٹ کی معلومات فراہم کرنے کے لیے، ہمیں صرف دستخط کی ضرورت ہے۔ اس کی وجہ یہ ہے کہ ہم پہلے ہی جانتے ہیں کہ پیغام کیا ہونے والا ہے، اور اس لیے پیغام کا ہیش بھی معلوم ہے۔

```js
const processMessage = async (message, signature) => {
```

ایک پیغام پر کارروائی کریں اور اس میں انکوڈ کی گئی ٹرانزیکشن کو انجام دیں۔

```js
    // عوامی کلید حاصل کریں
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

اب چونکہ ہم سرور پر JavaScript چلاتے ہیں، ہم کلائنٹ کے بجائے وہاں عوامی کلید بازیافت کر سکتے ہیں۔

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

`noir.execute` Noir پروگرام چلاتا ہے۔ پیرامیٹرز ان کے مساوی ہیں جو [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) میں فراہم کیے گئے ہیں۔ یاد رکھیں کہ لمبی اقدار ہیکساڈیسیمل سٹرنگز کی ایک ایری (`["0x60", "0xA7"]`) کے طور پر فراہم کی جاتی ہیں، نہ کہ ایک واحد ہیکساڈیسیمل ویلیو (`0x60A7`) کے طور پر، جس طرح Viem کرتا ہے۔

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

ٹرانزیکشن لاگو کریں۔ ہم نے اسے پہلے ہی Noir کوڈ میں کر لیا ہے، لیکن وہاں سے نتیجہ نکالنے کے بجائے اسے یہاں دوبارہ کرنا زیادہ آسان ہے۔

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

ابتدائی `Accounts` سٹرکچر۔

### مرحلہ 3 - ایتھیریم سمارٹ کنٹریکٹس {#stage-3}

1. سرور اور کلائنٹ کے عمل کو روک دیں۔

2. سمارٹ کنٹریکٹس والی برانچ ڈاؤن لوڈ کریں اور یقینی بنائیں کہ آپ کے پاس تمام ضروری ماڈیولز موجود ہیں۔

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. ایک الگ کمانڈ لائن ونڈو میں `anvil` چلائیں۔

4. تصدیقی کلید اور Solidity تصدیق کنندہ تیار کریں، پھر تصدیق کنندہ کوڈ کو Solidity پروجیکٹ میں کاپی کریں۔

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

6. `Verifier.sol` کو تعینات کریں اور پتے کو ایک ماحولیاتی متغیر میں محفوظ کریں۔

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` کنٹریکٹ تعینات کریں۔

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` ویلیو `Accounts` کی ابتدائی حالت کا Pederson ہیش ہے۔ اگر آپ `server/index.mjs` میں اس ابتدائی حالت میں ترمیم کرتے ہیں، تو آپ صفر علم ثبوت کے ذریعے رپورٹ کردہ ابتدائی ہیش دیکھنے کے لیے ایک ٹرانزیکشن چلا سکتے ہیں۔

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

11. اس بات کی تصدیق کرنے کے لیے کہ حالت آن چین تبدیل ہو گئی ہے، سرور کے عمل کو دوبارہ شروع کریں۔ دیکھیں کہ `ZkBank` اب ٹرانزیکشنز قبول نہیں کرتا، کیونکہ ٹرانزیکشنز میں اصل ہیش ویلیو آن چین محفوظ کردہ ہیش ویلیو سے مختلف ہے۔

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

ہمیں آن چین بھیجنے کے لیے اصل ثبوت بنانے کے لیے [Barretenberg پیکیج](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) استعمال کرنے کی ضرورت ہے۔ ہم اس پیکیج کو یا تو کمانڈ لائن انٹرفیس (`bb`) چلا کر یا [JavaScript لائبریری، `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) استعمال کر کے استعمال کر سکتے ہیں۔ JavaScript لائبریری مقامی طور پر کوڈ چلانے کے مقابلے میں بہت سست ہے، اس لیے ہم کمانڈ لائن استعمال کرنے کے لیے یہاں [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) کا استعمال کرتے ہیں۔

یاد رکھیں کہ اگر آپ `bb.js` استعمال کرنے کا فیصلہ کرتے ہیں، تو آپ کو ایک ایسا ورژن استعمال کرنے کی ضرورت ہے جو آپ کے استعمال کردہ Noir کے ورژن کے ساتھ مطابقت رکھتا ہو۔ لکھتے وقت، موجودہ Noir ورژن (<span dir="ltr">1.0.0-beta.11</span>) `bb.js` ورژن <span dir="ltr">0.87</span> استعمال کرتا ہے۔

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

یہاں کا پتہ وہ ہے جو آپ کو اس وقت ملتا ہے جب آپ ایک کلین `anvil` کے ساتھ شروع کرتے ہیں اور اوپر دی گئی ہدایات پر عمل کرتے ہیں۔

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

ثبوت `Field` اقدار کی ایک JSON ایری ہے، جس میں سے ہر ایک کو ہیکساڈیسیمل ویلیو کے طور پر دکھایا گیا ہے۔ تاہم، ہمیں اسے ٹرانزیکشن میں ایک واحد `bytes` ویلیو کے طور پر بھیجنے کی ضرورت ہے، جسے Viem ایک بڑی ہیکساڈیسیمل سٹرنگ کے ذریعے ظاہر کرتا ہے۔ یہاں ہم تمام اقدار کو جوڑ کر، تمام `0x` کو ہٹا کر، اور پھر آخر میں ایک شامل کر کے فارمیٹ کو تبدیل کرتے ہیں۔

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

عوامی فیلڈز کو <span dir="ltr">32-byte</span> اقدار کی ایک ایری ہونے کی ضرورت ہے۔ تاہم، چونکہ ہمیں ٹرانزیکشن ہیش کو دو `Field` اقدار کے درمیان تقسیم کرنے کی ضرورت تھی، اس لیے یہ <span dir="ltr">16-byte</span> ویلیو کے طور پر ظاہر ہوتا ہے۔ یہاں ہم صفر شامل کرتے ہیں تاکہ Viem سمجھ سکے کہ یہ دراصل <span dir="ltr">32 bytes</span> ہے۔

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

جب بھی حالت تبدیل ہوتی ہے، ہم ایک `TransactionProcessed` ایونٹ خارج (emit) کرتے ہیں۔

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

یہ فنکشن ٹرانزیکشنز پر کارروائی کرتا ہے۔ یہ ثبوت (`bytes` کے طور پر) اور عوامی ان پٹس (ایک `bytes32` ایری کے طور پر) اس فارمیٹ میں حاصل کرتا ہے جس کی تصدیق کنندہ کو ضرورت ہوتی ہے (تاکہ آن چین پروسیسنگ اور اس کے نتیجے میں گیس کی لاگت کو کم کیا جا سکے)۔

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

صفر علم ثبوت کا یہ ہونا ضروری ہے کہ ٹرانزیکشن ہمارے موجودہ ہیش سے ایک نئے ہیش میں تبدیل ہو جائے۔

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

اگر سب کچھ درست ہے، تو حالت کے ہیش کو نئی ویلیو میں اپ ڈیٹ کریں اور ایک `TransactionProcessed` ایونٹ خارج کریں۔

## مرکزی جزو کے ذریعے غلط استعمال {#abuses}

معلوماتی سیکیورٹی تین خصوصیات پر مشتمل ہے:

- _رازداری_، صارفین وہ معلومات نہیں پڑھ سکتے جنہیں پڑھنے کے وہ مجاز نہیں ہیں۔
- _سالمیت_، معلومات کو مجاز صارفین کے علاوہ اور مجاز طریقے کے بغیر تبدیل نہیں کیا جا سکتا۔
- _دستیابی_، مجاز صارفین سسٹم استعمال کر سکتے ہیں۔

اس سسٹم پر، سالمیت صفر علم ثبوت کے ذریعے فراہم کی جاتی ہے۔ دستیابی کی ضمانت دینا بہت مشکل ہے، اور رازداری ناممکن ہے، کیونکہ بینک کو ہر اکاؤنٹ کا بیلنس اور تمام ٹرانزیکشنز کا علم ہونا ضروری ہے۔ کسی ایسی ہستی کو جس کے پاس معلومات ہوں، ان معلومات کو شیئر کرنے سے روکنے کا کوئی طریقہ نہیں ہے۔

[اسٹیلتھ پتوں](https://vitalik.eth.limo/general/2023/01/20/stealth.html) کا استعمال کرتے ہوئے واقعی ایک خفیہ بینک بنانا ممکن ہو سکتا ہے، لیکن یہ اس مضمون کے دائرہ کار سے باہر ہے۔

### غلط معلومات {#false-info}

سرور کے سالمیت کی خلاف ورزی کرنے کا ایک طریقہ یہ ہے کہ جب [ڈیٹا کی درخواست کی جائے](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) تو وہ غلط معلومات فراہم کرے۔

اسے حل کرنے کے لیے، ہم ایک دوسرا Noir پروگرام لکھ سکتے ہیں جو اکاؤنٹس کو نجی ان پٹ کے طور پر اور اس پتہ کو عوامی ان پٹ کے طور پر وصول کرتا ہے جس کے لیے معلومات کی درخواست کی گئی ہے۔ آؤٹ پٹ اس پتہ کا بیلنس اور نانس، اور اکاؤنٹس کا ہیش ہوتا ہے۔

یقیناً، اس ثبوت کی آن چین تصدیق نہیں کی جا سکتی، کیونکہ ہم نانسز اور بیلنسز کو آن چین پوسٹ نہیں کرنا چاہتے۔ تاہم، براؤزر میں چلنے والے کلائنٹ کوڈ کے ذریعے اس کی تصدیق کی جا سکتی ہے۔

### زبردستی کی ٹرانزیکشنز {#forced-txns}

<span dir="ltr">L2s</span> پر دستیابی کو یقینی بنانے اور سنسرشپ کو روکنے کا معمول کا طریقہ کار [زبردستی کی ٹرانزیکشنز](https://docs.optimism.io/stack/transactions/forced-transaction) ہے۔ لیکن زبردستی کی ٹرانزیکشنز صفر علم ثبوت کے ساتھ نہیں ملتیں۔ سرور واحد ہستی ہے جو ٹرانزیکشنز کی تصدیق کر سکتی ہے۔

ہم زبردستی کی ٹرانزیکشنز کو قبول کرنے کے لیے `smart-contracts/src/ZkBank.sol` میں ترمیم کر سکتے ہیں اور سرور کو حالت تبدیل کرنے سے روک سکتے ہیں جب تک کہ ان پر کارروائی نہ ہو جائے۔ تاہم، یہ ہمیں ایک سادہ ڈینائل-آف-سروس حملے کا نشانہ بناتا ہے۔ کیا ہوگا اگر زبردستی کی ٹرانزیکشن غلط ہو اور اس وجہ سے اس پر کارروائی کرنا ناممکن ہو؟

اس کا حل یہ ہے کہ ایک صفر علم ثبوت ہو جو یہ ثابت کرے کہ زبردستی کی ٹرانزیکشن غلط ہے۔ یہ سرور کو تین اختیارات دیتا ہے:

- زبردستی کی ٹرانزیکشن پر کارروائی کریں، اور ایک صفر علم ثبوت فراہم کریں کہ اس پر کارروائی ہو چکی ہے اور نئی حالت کا ہیش دیں۔
- زبردستی کی ٹرانزیکشن کو مسترد کریں، اور کنٹریکٹ کو ایک صفر علم ثبوت فراہم کریں کہ ٹرانزیکشن غلط ہے (نامعلوم پتہ، خراب نانس، یا ناکافی بیلنس)۔
- زبردستی کی ٹرانزیکشن کو نظر انداز کریں۔ سرور کو درحقیقت ٹرانزیکشن پر کارروائی کرنے پر مجبور کرنے کا کوئی طریقہ نہیں ہے، لیکن اس کا مطلب یہ ہے کہ پورا سسٹم دستیاب نہیں ہے۔

#### دستیابی کے بانڈز {#avail-bonds}

حقیقی زندگی کے نفاذ میں، سرور کو چلانے کے لیے شاید کسی قسم کا منافع بخش مقصد ہوگا۔ ہم اس ترغیب کو مضبوط کر سکتے ہیں کہ سرور ایک دستیابی کا بانڈ پوسٹ کرے جسے کوئی بھی جلا سکتا ہے اگر ایک مخصوص مدت کے اندر زبردستی کی ٹرانزیکشن پر کارروائی نہیں ہوتی ہے۔

### خراب Noir کوڈ {#bad-noir-code}

عام طور پر، لوگوں کو سمارٹ کنٹریکٹ پر بھروسہ دلانے کے لیے ہم سورس کوڈ کو [بلاک ایکسپلورر](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) پر اپ لوڈ کرتے ہیں۔ تاہم، صفر علم ثبوت کے معاملے میں، یہ ناکافی ہے۔

`Verifier.sol` میں تصدیقی کلید شامل ہے، جو Noir پروگرام کا ایک فنکشن ہے۔ تاہم، وہ کلید ہمیں یہ نہیں بتاتی کہ Noir پروگرام کیا تھا۔ درحقیقت ایک قابل اعتماد حل حاصل کرنے کے لیے، آپ کو Noir پروگرام (اور وہ ورژن جس نے اسے بنایا) اپ لوڈ کرنے کی ضرورت ہے۔ بصورت دیگر، صفر علم ثبوت کسی مختلف پروگرام کی عکاسی کر سکتے ہیں، جس میں کوئی بیک ڈور (خفیہ راستہ) ہو۔

جب تک بلاک ایکسپلوررز ہمیں Noir پروگرامز کو اپ لوڈ کرنے اور ان کی تصدیق کرنے کی اجازت دینا شروع نہیں کرتے، آپ کو یہ خود کرنا چاہیے (ترجیحی طور پر [IPFS](/developers/tutorials/ipfs-decentralized-ui/) پر)۔ پھر سمجھدار صارفین سورس کوڈ ڈاؤن لوڈ کرنے، اسے خود مرتب کرنے، `Verifier.sol` بنانے، اور اس بات کی تصدیق کرنے کے قابل ہوں گے کہ یہ بالکل آن چین والے جیسا ہی ہے۔

## نتیجہ {#conclusion}

پلازما قسم کی ایپلی کیشنز کو معلومات کے ذخیرے کے طور پر ایک مرکزی جزو کی ضرورت ہوتی ہے۔ اس سے ممکنہ خطرات پیدا ہوتے ہیں لیکن، اس کے بدلے میں، یہ ہمیں ایسے طریقوں سے رازداری برقرار رکھنے کی اجازت دیتا ہے جو خود بلاک چین پر دستیاب نہیں ہیں۔ صفر علم ثبوت کے ساتھ ہم سالمیت کو یقینی بنا سکتے ہیں اور ممکنہ طور پر مرکزی جزو چلانے والے کے لیے دستیابی کو برقرار رکھنا معاشی طور پر فائدہ مند بنا سکتے ہیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔

## اعترافات {#acknowledgements}

- جوش کرائٹس نے اس مضمون کا مسودہ پڑھا اور ایک پیچیدہ Noir مسئلے میں میری مدد کی۔

باقی ماندہ کسی بھی غلطی کی ذمہ داری میری ہے۔