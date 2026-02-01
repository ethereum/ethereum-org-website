---
title: "ایک ایپ کے لیے مخصوص پلازما لکھیں جو پرائیویسی کو محفوظ رکھتا ہے"
description: "اس ٹیوٹوریل میں، ہم ڈپازٹس کے لیے ایک نیم خفیہ بینک بناتے ہیں۔ بینک ایک مرکزی جزو ہے؛ یہ ہر صارف کا بیلنس جانتا ہے۔ تاہم، یہ معلومات آن چین ذخیرہ نہیں کی جاتی ہے۔ اس کے بجائے، بینک اسٹیٹ کا ایک ہیش پوسٹ کرتا ہے۔ جب بھی کوئی ٹرانزیکشن ہوتا ہے، بینک نیا ہیش پوسٹ کرتا ہے، ساتھ ہی ایک زیرو-نالج پروف بھی کہ اس کے پاس ایک دستخط شدہ ٹرانزیکشن ہے جو ہیش اسٹیٹ کو نئے میں بدل دیتا ہے۔ اس ٹیوٹوریل کو پڑھنے کے بعد، آپ نہ صرف یہ سمجھیں گے کہ زیرو-نالج پروف کا استعمال کیسے کریں، بلکہ یہ بھی کہ آپ انہیں کیوں استعمال کرتے ہیں اور اسے محفوظ طریقے سے کیسے کریں۔"
author: "اوری پومیرانٹز"
tags: [ "زیرو-نالج", "سرور", "آف چین", "رازداری" ]
skill: advanced
lang: ur-in
published: 2025-10-15
---

## تعارف {#introduction}

[رول اپس](/developers/docs/scaling/zk-rollups/) کے برعکس، [پلازما](/developers/docs/scaling/plasma) انٹیگریٹی کے لیے Ethereum مین نیٹ کا استعمال کرتے ہیں، لیکن دستیابی کے لیے نہیں۔ اس مضمون میں، ہم ایک ایسی ایپلیکیشن لکھتے ہیں جو پلازما کی طرح برتاؤ کرتی ہے، جس میں Ethereum انٹیگریٹی (کوئی غیر مجاز تبدیلیاں نہیں) کی ضمانت دیتا ہے لیکن دستیابی کی نہیں (ایک مرکزی جزو ڈاؤن ہو سکتا ہے اور پورے سسٹم کو غیر فعال کر سکتا ہے)۔

جو ایپلیکیشن ہم یہاں لکھتے ہیں وہ ایک پرائیویسی کو محفوظ رکھنے والا بینک ہے۔ مختلف پتوں کے پاس بیلنس والے اکاؤنٹس ہوتے ہیں، اور وہ دوسرے اکاؤنٹس میں رقم (ETH) بھیج سکتے ہیں۔ بینک اسٹیٹ (اکاؤنٹس اور ان کے بیلنس) اور ٹرانزیکشنز کے ہیش پوسٹ کرتا ہے، لیکن اصل بیلنس کو آف چین رکھتا ہے جہاں وہ نجی رہ سکتے ہیں۔

## ڈیزائن {#design}

یہ پروڈکشن کے لیے تیار سسٹم نہیں ہے، بلکہ ایک تدریسی ٹول ہے۔ اس طرح، اسے کئی آسان بنانے والے مفروضوں کے ساتھ لکھا گیا ہے۔

- فکسڈ اکاؤنٹ پول۔ اکاؤنٹس کی ایک مخصوص تعداد ہے، اور ہر اکاؤنٹ ایک پہلے سے طے شدہ پتے سے تعلق رکھتا ہے۔ یہ ایک بہت آسان نظام بناتا ہے کیونکہ زیرو-نالج پروف میں متغیر سائز کے ڈیٹا ڈھانچے کو سنبھالنا مشکل ہے۔ پروڈکشن کے لیے تیار سسٹم کے لیے، ہم [مرکل روٹ](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) کو اسٹیٹ ہیش کے طور پر استعمال کر سکتے ہیں اور مطلوبہ بیلنس کے لیے مرکل پروف فراہم کر سکتے ہیں۔

- میموری اسٹوریج۔ پروڈکشن سسٹم پر، ہمیں تمام اکاؤنٹ بیلنس کو ڈسک پر لکھنے کی ضرورت ہے تاکہ انہیں دوبارہ شروع ہونے کی صورت میں محفوظ رکھا جا سکے۔ یہاں، یہ ٹھیک ہے اگر معلومات آسانی سے ضائع ہو جائیں۔

- صرف ٹرانسفرز۔ ایک پروڈکشن سسٹم کو بینک میں اثاثے جمع کرنے اور انہیں نکالنے کے ایک طریقے کی ضرورت ہوگی۔ لیکن یہاں مقصد صرف تصور کی وضاحت کرنا ہے، اس لیے یہ بینک صرف ٹرانسفرز تک محدود ہے۔

### زیرو-نالج پروفس {#zero-knowledge-proofs}

بنیادی سطح پر، ایک زیرو-نالج پروف یہ ظاہر کرتا ہے کہ پروور کچھ ڈیٹا، _Data<sub>private</sub>_ کو جانتا ہے، اس طرح کہ کچھ عوامی ڈیٹا، _Data<sub>public</sub>_، اور _Data<sub>private</sub>_ کے درمیان ایک رشتہ _Relationship_ موجود ہے۔ تصدیق کنندہ _Relationship_ اور _Data<sub>public</sub>_ کو جانتا ہے۔

پرائیویسی کو محفوظ رکھنے کے لیے، ہمیں اسٹیٹس اور ٹرانزیکشنز کو نجی رکھنے کی ضرورت ہے۔ لیکن انٹیگریٹی کو یقینی بنانے کے لیے، ہمیں اسٹیٹس کے [کرپٹوگرافک ہیش](https://en.wikipedia.org/wiki/Cryptographic_hash_function) کو عوامی رکھنے کی ضرورت ہے۔ ان لوگوں کو ثابت کرنے کے لیے جو ٹرانزیکشنز جمع کرتے ہیں کہ وہ ٹرانزیکشنز واقعی ہوئے، ہمیں ٹرانزیکشن ہیش بھی پوسٹ کرنے کی ضرورت ہے۔

زیادہ تر معاملات میں، _Data<sub>private</sub>_ زیرو-نالج پروف پروگرام کا ان پٹ ہے، اور _Data<sub>public</sub>_ آؤٹ پٹ ہے۔

_Data<sub>private</sub>_ میں یہ فیلڈز:

- _اسٹیٹ<sub>n</sub>_، پرانی اسٹیٹ
- _اسٹیٹ<sub>n+1</sub>_، نئی اسٹیٹ
- _ٹرانزیکشن_، ایک ٹرانزیکشن جو پرانی اسٹیٹ سے نئی میں بدلتا ہے۔ اس ٹرانزیکشن میں یہ فیلڈز شامل ہونے چاہئیں:
  - _منزل کا پتہ_ جو ٹرانسفر وصول کرتا ہے
  - ٹرانسفر کی جانے والی _رقم_
  - _نونس_ یہ یقینی بنانے کے لیے کہ ہر ٹرانزیکشن پر صرف ایک بار کارروائی کی جا سکتی ہے۔
    سورس ایڈریس کو ٹرانزیکشن میں ہونے کی ضرورت نہیں ہے، کیونکہ اسے دستخط سے بازیافت کیا جا سکتا ہے۔
- _دستخط_، ایک دستخط جو ٹرانزیکشن انجام دینے کے لیے مجاز ہے۔ ہمارے معاملے میں، ٹرانزیکشن انجام دینے کے لیے مجاز واحد پتہ سورس ایڈریس ہے۔ چونکہ ہمارا زیرو-نالج سسٹم جس طرح سے کام کرتا ہے، ہمیں Ethereum دستخط کے علاوہ، اکاؤنٹ کی پبلک کی بھی ضرورت ہے۔

یہ _Data<sub>public</sub>_ میں فیلڈز ہیں:

- _ہیش(اسٹیٹ<sub>n</sub>)_ پرانی اسٹیٹ کا ہیش
- _ہیش(اسٹیٹ<sub>n+1</sub>)_ نئی اسٹیٹ کا ہیش
- _ہیش(ٹرانزیکشن)_ اس ٹرانزیکشن کا ہیش جو اسٹیٹ کو _اسٹیٹ<sub>n</sub>_ سے _اسٹیٹ<sub>n+1</sub>_ میں بدلتا ہے۔

یہ رشتہ کئی شرائط کی جانچ کرتا ہے:

- عوامی ہیش واقعی نجی فیلڈز کے لیے درست ہیش ہیں۔
- ٹرانزیکشن، جب پرانی اسٹیٹ پر لاگو ہوتا ہے، تو نئی اسٹیٹ کا نتیجہ نکلتا ہے۔
- دستخط ٹرانزیکشن کے سورس ایڈریس سے آتا ہے۔

کرپٹوگرافک ہیش فنکشنز کی خصوصیات کی وجہ سے، ان شرائط کو ثابت کرنا انٹیگریٹی کو یقینی بنانے کے لیے کافی ہے۔

### ڈیٹا کی ساختیں {#data-structures}

بنیادی ڈیٹا ڈھانچہ سرور کے زیر اہتمام اسٹیٹ ہے۔ ہر اکاؤنٹ کے لیے، سرور اکاؤنٹ بیلنس اور ایک [نونس](https://en.wikipedia.org/wiki/Cryptographic_nonce) کا ٹریک رکھتا ہے، جو [ری پلے حملوں](https://en.wikipedia.org/wiki/Replay_attack) کو روکنے کے لیے استعمال ہوتا ہے۔

### اجزاء {#components}

اس سسٹم کو دو اجزاء کی ضرورت ہے:

- _سرور_ جو ٹرانزیکشنز وصول کرتا ہے، ان پر کارروائی کرتا ہے، اور زیرو-نالج پروفس کے ساتھ چین پر ہیش پوسٹ کرتا ہے۔
- ایک _اسمارٹ کنٹریکٹ_ جو ہیش کو ذخیرہ کرتا ہے اور یہ یقینی بنانے کے لیے کہ اسٹیٹ کی منتقلی جائز ہے، زیرو-نالج پروفس کی تصدیق کرتا ہے۔

### ڈیٹا اور کنٹرول فلو {#flows}

یہ وہ طریقے ہیں جن سے مختلف اجزاء ایک اکاؤنٹ سے دوسرے میں ٹرانسفر کرنے کے لیے مواصلت کرتے ہیں۔

1. ایک ویب براؤزر ایک دستخط شدہ ٹرانزیکشن جمع کرتا ہے جس میں دستخط کنندہ کے اکاؤنٹ سے ایک مختلف اکاؤنٹ میں ٹرانسفر کی درخواست کی جاتی ہے۔

2. سرور تصدیق کرتا ہے کہ ٹرانزیکشن درست ہے:

   - دستخط کنندہ کے پاس بینک میں کافی بیلنس والا ایک اکاؤنٹ ہے۔
   - وصول کنندہ کا بینک میں ایک اکاؤنٹ ہے۔

3. سرور دستخط کنندہ کے بیلنس سے منتقل کی گئی رقم کو گھٹا کر اور اسے وصول کنندہ کے بیلنس میں شامل کرکے نئی اسٹیٹ کا حساب لگاتا ہے۔

4. سرور ایک زیرو-نالج پروف کا حساب لگاتا ہے کہ اسٹیٹ کی تبدیلی ایک درست ہے۔

5. سرور Ethereum کو ایک ٹرانزیکشن جمع کرتا ہے جس میں شامل ہیں:

   - نئی اسٹیٹ ہیش
   - ٹرانزیکشن ہیش (تاکہ ٹرانزیکشن بھیجنے والے کو معلوم ہو کہ اس پر کارروائی ہو چکی ہے)
   - زیرو-نالج پروف جو یہ ثابت کرتا ہے کہ نئی اسٹیٹ میں منتقلی درست ہے

6. اسمارٹ کنٹریکٹ زیرو-نالج پروف کی تصدیق کرتا ہے۔

7. اگر زیرو-نالج پروف چیک آؤٹ ہو جاتا ہے، تو اسمارٹ کنٹریکٹ یہ کارروائیاں کرتا ہے:
   - موجودہ اسٹیٹ ہیش کو نئی اسٹیٹ ہیش میں اپ ڈیٹ کریں
   - نئی اسٹیٹ ہیش اور ٹرانزیکشن ہیش کے ساتھ ایک لاگ انٹری جاری کریں

### ٹولز {#tools}

کلائنٹ سائڈ کوڈ کے لیے، ہم [Vite](https://vite.dev/)، [React](https://react.dev/)، [Viem](https://viem.sh/)، اور [Wagmi](https://wagmi.sh/) کا استعمال کرنے جا رہے ہیں۔ یہ انڈسٹری کے معیاری ٹولز ہیں؛ اگر آپ ان سے واقف نہیں ہیں، تو آپ [یہ ٹیوٹوریل](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) استعمال کر سکتے ہیں۔

سرور کا زیادہ تر حصہ [Node](https://nodejs.org/en) کا استعمال کرتے ہوئے JavaScript میں لکھا گیا ہے۔ زیرو-نالج کا حصہ [Noir](https://noir-lang.org/) میں لکھا گیا ہے۔ ہمیں ورژن `1.0.0-beta.10` کی ضرورت ہے، لہذا [ہدایت کے مطابق Noir انسٹال کرنے](https://noir-lang.org/docs/getting_started/quick_start) کے بعد، چلائیں:

```
noirup -v 1.0.0-beta.10
```

جو بلاک چین ہم استعمال کرتے ہیں وہ `anvil` ہے، جو ایک مقامی ٹیسٹنگ بلاک چین ہے جو [Foundry](https://getfoundry.sh/introduction/installation) کا حصہ ہے۔

## عمل درآمد {#implementation}

چونکہ یہ ایک پیچیدہ نظام ہے، ہم اسے مراحل میں نافذ کریں گے۔

### مرحلہ 1 - دستی زیرو نالج {#stage-1}

پہلے مرحلے کے لیے، ہم براؤزر میں ایک ٹرانزیکشن پر دستخط کریں گے اور پھر دستی طور پر زیرو-نالج پروف کو معلومات فراہم کریں گے۔ زیرو-نالج کوڈ کو یہ معلومات `server/noir/Prover.toml` میں ملنے کی توقع ہے (جس کی دستاویزات [یہاں](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) ہیں)۔

اسے عمل میں دیکھنے کے لیے:

1. یقینی بنائیں کہ آپ کے پاس [Node](https://nodejs.org/en/download) اور [Noir](https://noir-lang.org/install) انسٹال ہیں۔ ترجیحاً، انہیں UNIX سسٹم جیسے macOS، Linux، یا [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) پر انسٹال کریں۔

2. مرحلہ 1 کا کوڈ ڈاؤن لوڈ کریں اور کلائنٹ کوڈ کی خدمت کے لیے ویب سرور شروع کریں۔

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   آپ کو یہاں ویب سرور کی ضرورت اس لیے ہے کہ، کچھ قسم کے فراڈ کو روکنے کے لیے، بہت سے والیٹس (جیسے MetaMask) براہ راست ڈسک سے پیش کی گئی فائلوں کو قبول نہیں کرتے ہیں۔

3. ایک والیٹ کے ساتھ ایک براؤزر کھولیں۔

4. والیٹ میں، ایک نیا پاس فریز درج کریں۔ نوٹ کریں کہ یہ آپ کے موجودہ پاس فریز کو حذف کر دے گا، اس لیے _یقینی بنائیں کہ آپ کے پاس بیک اپ ہے_۔

   پاس فریز `test test test test test test test test test test test junk` ہے، جو anvil کے لیے ڈیفالٹ ٹیسٹنگ پاس فریز ہے۔

5. [کلائنٹ سائڈ کوڈ](http://localhost:5173/) پر براؤز کریں۔

6. والیٹ سے جڑیں اور اپنا منزل کا اکاؤنٹ اور رقم منتخب کریں۔

7. **دستخط کریں** پر کلک کریں اور ٹرانزیکشن پر دستخط کریں۔

8. **Prover.toml** ہیڈنگ کے تحت، آپ کو متن ملے گا۔ `server/noir/Prover.toml` کو اس متن سے تبدیل کریں۔

9. زیرو-نالج پروف کو انجام دیں۔

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

10. آخری دو اقدار کا موازنہ اس ہیش سے کریں جو آپ ویب براؤزر پر دیکھتے ہیں یہ دیکھنے کے لیے کہ آیا پیغام درست طریقے سے ہیش کیا گیا ہے۔

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[یہ فائل](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir کی طرف سے متوقع معلومات کی شکل دکھاتی ہے۔

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

پیغام ٹیکسٹ فارمیٹ میں ہے، جو صارف کے لیے سمجھنا آسان بناتا ہے (جو دستخط کرتے وقت ضروری ہے) اور Noir کوڈ کے لیے پارس کرنا۔ رقم فننی میں بتائی گئی ہے تاکہ ایک طرف فریکشنل ٹرانسفرز کو فعال کیا جا سکے، اور دوسری طرف آسانی سے پڑھنے کے قابل ہو۔ آخری نمبر [نونس](https://en.wikipedia.org/wiki/Cryptographic_nonce) ہے۔

سٹرنگ 100 حروف طویل ہے۔ زیرو-نالج پروف متغیر سائز کے ڈیٹا کو اچھی طرح سے نہیں سنبھالتے ہیں، اس لیے اکثر ڈیٹا کو پیڈ کرنا ضروری ہوتا ہے۔

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

یہ تینوں پیرامیٹرز فکسڈ سائز بائٹ ارے ہیں۔

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

یہ ڈھانچوں کی ایک صف کی وضاحت کرنے کا طریقہ ہے۔ ہر اندراج کے لیے، ہم پتہ، بیلنس (ملی ETH عرف میں) بتاتے ہیں۔ [فننی](https://cryptovalleyjournal.com/glossary/finney/))، اور اگلی نونس ویلیو۔

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[یہ فائل](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) کلائنٹ سائڈ پروسیسنگ کو نافذ کرتی ہے اور `server/noir/Prover.toml` فائل بناتی ہے (جس میں زیرو-نالج پیرامیٹرز شامل ہیں)۔

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

یہ اکاؤنٹ کے پتے ہیں، وہ پتے جو `test ...` سے بنائے گئے ہیں۔ ٹیسٹ جنک` پاس فریز۔ اگر آپ اپنے پتے استعمال کرنا چاہتے ہیں، تو صرف اس تعریف میں ترمیم کریں۔

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

یہ [Wagmi ہکس](https://wagmi.sh/react/api/hooks) ہمیں [viem](https://viem.sh/) لائبریری اور والیٹ تک رسائی کی اجازت دیتے ہیں۔

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

یہ پیغام ہے، جسے اسپیس سے پیڈ کیا گیا ہے۔ جب بھی [`useState`](https://react.dev/reference/react/useState) متغیرات میں سے کوئی ایک تبدیل ہوتا ہے، تو جزو دوبارہ تیار ہوتا ہے اور `message` اپ ڈیٹ ہو جاتا ہے۔

```tsx
  const sign = async () => {
```

یہ فنکشن اس وقت کال ہوتا ہے جب صارف **دستخط کریں** بٹن پر کلک کرتا ہے۔ پیغام خود بخود اپ ڈیٹ ہو جاتا ہے، لیکن دستخط کے لیے والیٹ میں صارف کی منظوری کی ضرورت ہوتی ہے، اور ہم اسے اس وقت تک نہیں مانگنا چاہتے جب تک ضرورت نہ ہو۔

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

والیٹ سے [پیغام پر دستخط کرنے](https://viem.sh/docs/accounts/local/signMessage) کے لیے کہیں۔

```tsx
    const hash = hashMessage(message)
```

پیغام کا ہیش حاصل کریں۔ صارف کو ڈیبگنگ (Noir کوڈ کی) کے لیے فراہم کرنا مددگار ہے۔

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[پبلک کی حاصل کریں](https://viem.sh/docs/utilities/recoverPublicKey)۔ یہ [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) فنکشن کے لیے ضروری ہے۔

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

اسٹیٹ متغیرات سیٹ کریں۔ ایسا کرنے سے جزو دوبارہ تیار ہوتا ہے (جب `sign` فنکشن ختم ہوتا ہے) اور صارف کو اپ ڈیٹ شدہ اقدار دکھاتا ہے۔

```tsx
    let proverToml = ` 
```

`Prover.toml` کے لیے متن۔

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem ہمیں پبلک کی کو 65 بائٹ کی ہیکساڈیسیمل سٹرنگ کے طور پر فراہم کرتا ہے۔ پہلا بائٹ `0x04` ہے، جو ایک ورژن مارکر ہے۔ اس کے بعد پبلک کی کے `x` کے لیے 32 بائٹس اور پھر پبلک کی کے `y` کے لیے 32 بائٹس آتے ہیں۔

تاہم، Noir کو یہ معلومات دو بائٹ ارے کے طور پر حاصل کرنے کی توقع ہے، ایک `x` کے لیے اور ایک `y` کے لیے۔ اسے یہاں کلائنٹ پر پارس کرنا زیرو-نالج پروف کے حصے کے طور پر پارس کرنے سے زیادہ آسان ہے۔

نوٹ کریں کہ یہ عام طور پر زیرو-نالج میں ایک اچھی پریکٹس ہے۔ زیرو-نالج پروف کے اندر کا کوڈ مہنگا ہوتا ہے، اس لیے کوئی بھی پروسیسنگ جو زیرو-نالج پروف سے باہر کی جا سکتی ہے _چاہیے_ کہ وہ زیرو-نالج پروف سے باہر کی جائے۔

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

دستخط بھی 65 بائٹ کی ہیکساڈیسیمل سٹرنگ کے طور پر فراہم کیا جاتا ہے۔ تاہم، آخری بائٹ صرف پبلک کی کو بازیافت کرنے کے لیے ضروری ہے۔ چونکہ پبلک کی پہلے ہی Noir کوڈ کو فراہم کر دی جائے گی، ہمیں دستخط کی تصدیق کے لیے اس کی ضرورت نہیں ہے، اور Noir کوڈ کو اس کی ضرورت نہیں ہے۔

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

[یہ فائل](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) اصل زیرو-نالج کوڈ ہے۔

```
use std::hash::pedersen_hash;
```

[پیڈرسن ہیش](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) [Noir اسٹینڈرڈ لائبریری](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) کے ساتھ فراہم کیا گیا ہے۔ زیرو-نالج پروف عام طور پر اس ہیش فنکشن کا استعمال کرتے ہیں۔ اسٹینڈرڈ ہیش فنکشنز کے مقابلے میں [ارتھمیٹک سرکٹس](https://rareskills.io/post/arithmetic-circuit) کے اندر اس کا حساب لگانا بہت آسان ہے۔

```
use keccak256::keccak256;
use dep::ecrecover;
```

یہ دو فنکشنز بیرونی لائبریریاں ہیں، جو [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) میں بیان کی گئی ہیں۔ یہ بالکل وہی ہیں جن کے لیے ان کا نام رکھا گیا ہے، ایک فنکشن جو [keccak256 ہیش](https://emn178.github.io/online-tools/keccak_256.html) کا حساب لگاتا ہے اور ایک فنکشن جو Ethereum دستخطوں کی تصدیق کرتا ہے اور دستخط کنندہ کا Ethereum پتہ بازیافت کرتا ہے۔

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir [Rust](https://www.rust-lang.org/) سے متاثر ہے۔ متغیرات، بطور ڈیفالٹ، مستقل ہوتے ہیں۔ اس طرح ہم عالمی کنفیگریشن مستقلات کی تعریف کرتے ہیں۔ خاص طور پر، `ACCOUNT_NUMBER` ان اکاؤنٹس کی تعداد ہے جنہیں ہم اسٹور کرتے ہیں۔

`u<number>` نامی ڈیٹا کی اقسام اس تعداد کے بٹس ہیں، جو غیر دستخط شدہ ہیں۔ صرف معاون اقسام `u8`، `u16`، `u32`، `u64`، اور `u128` ہیں۔

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

یہ متغیر اکاؤنٹس کے پیڈرسن ہیش کے لیے استعمال ہوتا ہے، جیسا کہ ذیل میں بیان کیا گیا ہے۔

```
global MESSAGE_LENGTH : u32 = 100;
```

جیسا کہ اوپر بیان کیا گیا ہے، پیغام کی لمبائی مقرر ہے۔ یہاں اس کی وضاحت کی گئی ہے۔

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 دستخط](https://eips.ethereum.org/EIPS/eip-191) کے لیے 26-بائٹ کے سابقے والا ایک بفر درکار ہوتا ہے، اس کے بعد ASCII میں پیغام کی لمبائی، اور آخر میں خود پیغام۔

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

وہ معلومات جو ہم ایک اکاؤنٹ کے بارے میں اسٹور کرتے ہیں۔ [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) ایک نمبر ہے، عام طور پر 253 بٹس تک، جسے براہ راست [ارتھمیٹک سرکٹ](https://rareskills.io/post/arithmetic-circuit) میں استعمال کیا جا سکتا ہے جو زیرو-نالج پروف کو نافذ کرتا ہے۔ یہاں ہم 160 بٹ Ethereum ایڈریس کو اسٹور کرنے کے لیے `Field` کا استعمال کرتے ہیں۔

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

وہ معلومات جو ہم ٹرانسفر ٹرانزیکشن کے لیے اسٹور کرتے ہیں۔

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

ایک فنکشن کی تعریف۔ پیرامیٹر `Account` کی معلومات ہے۔ نتیجہ `Field` متغیرات کی ایک صف ہے، جس کی لمبائی `FLAT_ACCOUNT_FIELDS` ہے

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

صف میں پہلی قدر اکاؤنٹ کا پتہ ہے۔ دوسرے میں بیلنس اور نونس دونوں شامل ہیں۔ `.into()` کالز ایک نمبر کو اس ڈیٹا کی قسم میں تبدیل کرتی ہیں جس کی اسے ضرورت ہوتی ہے۔ `account.nonce` ایک `u32` قدر ہے، لیکن اسے `account.balance « 32` میں شامل کرنے کے لیے، جو ایک `u128` قدر ہے، اسے `u128` ہونا چاہیے۔ یہ پہلا `.into()` ہے۔ دوسرا `u128` نتیجے کو ایک `Field` میں تبدیل کرتا ہے تاکہ یہ صف میں فٹ ہو سکے۔

```
    flat
}
```

Noir میں، فنکشنز صرف آخر میں ایک قدر واپس کر سکتے ہیں (کوئی ابتدائی واپسی نہیں ہے)۔ واپسی کی قدر کی وضاحت کرنے کے لیے، آپ اسے فنکشن کے اختتامی بریکٹ سے ٹھیک پہلے جانچتے ہیں۔

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

یہ فنکشن اکاؤنٹس کی صف کو ایک `Field` صف میں بدل دیتا ہے، جسے پیٹرسن ہیش کے ان پٹ کے طور پر استعمال کیا جا سکتا ہے۔

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

یہ ایک قابل تغیر متغیر کی وضاحت کرنے کا طریقہ ہے، یعنی _نہ کہ_ ایک مستقل۔ Noir میں متغیرات کی ہمیشہ ایک قدر ہونی چاہیے، اس لیے ہم اس متغیر کو تمام صفر پر شروع کرتے ہیں۔

```
    for i in 0..ACCOUNT_NUMBER {
```

یہ ایک `for` لوپ ہے۔ نوٹ کریں کہ حدود مستقل ہیں۔ Noir لوپس کی حدود کمپائل ٹائم پر معلوم ہونی چاہئیں۔ وجہ یہ ہے کہ ارتھمیٹک سرکٹس فلو کنٹرول کو سپورٹ نہیں کرتے ہیں۔ `for` لوپ پر کارروائی کرتے وقت، کمپائلر صرف اس کے اندر کا کوڈ متعدد بار رکھتا ہے، ہر تکرار کے لیے ایک بار۔

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

آخر میں، ہم اس فنکشن پر پہنچ گئے جو اکاؤنٹس کی صف کو ہیش کرتا ہے۔

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

یہ فنکشن ایک مخصوص پتے والا اکاؤنٹ ڈھونڈتا ہے۔ یہ فنکشن معیاری کوڈ میں بہت غیر موثر ہوگا کیونکہ یہ تمام اکاؤنٹس پر تکرار کرتا ہے، یہاں تک کہ جب اسے پتہ مل جاتا ہے۔

تاہم، زیرو-نالج پروف میں، کوئی فلو کنٹرول نہیں ہے۔ اگر ہمیں کبھی بھی کسی شرط کو جانچنے کی ضرورت ہوتی ہے، تو ہمیں اسے ہر بار جانچنا پڑتا ہے۔

اسی طرح کی چیز `if` بیانات کے ساتھ ہوتی ہے۔ اوپر کے لوپ میں `if` بیان کو ان ریاضیاتی بیانات میں ترجمہ کیا گیا ہے۔

_condition<sub>result</sub> = accounts[i].address == address_ // ایک اگر وہ برابر ہیں، ورنہ صفر

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) فنکشن زیرو-نالج پروف کو کریش کر دیتا ہے اگر دعویٰ غلط ہو۔ اس صورت میں، اگر ہم متعلقہ پتے والا کوئی اکاؤنٹ نہیں ڈھونڈ سکتے ہیں۔ پتے کی اطلاع دینے کے لیے، ہم ایک [فارمیٹ سٹرنگ](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) استعمال کرتے ہیں۔

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

یہ فنکشن ایک ٹرانسفر ٹرانزیکشن لاگو کرتا ہے اور نئی اکاؤنٹس کی صف واپس کرتا ہے۔

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

ہم Noir میں فارمیٹ سٹرنگ کے اندر ڈھانچے کے عناصر تک رسائی حاصل نہیں کر سکتے، اس لیے ہم ایک قابل استعمال کاپی بناتے ہیں۔

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

نئی اکاؤنٹس کی صف بنائیں اور پھر اسے واپس کریں۔

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

یہ فنکشن پیغام سے پتہ پڑھتا ہے۔

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

پتہ ہمیشہ 20 بائٹس (عرف 40 ہیکساڈیسیمل ہندسوں) لمبا ہوتا ہے، اور کریکٹر #7 سے شروع ہوتا ہے۔ 40 ہیکساڈیسیمل ہندسے) لمبا، اور کریکٹر #7 سے شروع ہوتا ہے۔

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

پیغام سے رقم اور نونس پڑھیں۔

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

پیغام میں، پتے کے بعد پہلا نمبر فننی (عرف ہزارواں ETH) کی رقم ہے جسے ٹرانسفر کرنا ہے۔ ETH کا ہزارواں حصہ) ٹرانسفر کرنا ہے۔ دوسرا نمبر نونس ہے۔ ان کے درمیان کوئی بھی متن نظر انداز کر دیا جاتا ہے۔

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
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

[ٹیوپل](https://noir-lang.org/docs/noir/concepts/data_types/tuples) واپس کرنا Noir میں ایک فنکشن سے متعدد قدریں واپس کرنے کا طریقہ ہے۔

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

یہ فنکشن پیغام کو بائٹس میں تبدیل کرتا ہے، پھر رقم کو ایک `TransferTxn` میں تبدیل کرتا ہے۔

```rust
// Viem کے hashMessage کے برابر
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

ہم اکاؤنٹس کے لیے پیڈرسن ہیش کا استعمال کرنے کے قابل تھے کیونکہ وہ صرف زیرو-نالج پروف کے اندر ہیش کیے جاتے ہیں۔ تاہم، اس کوڈ میں ہمیں پیغام کے دستخط کی جانچ کرنے کی ضرورت ہے، جو براؤزر کے ذریعے تیار کیا جاتا ہے۔ اس کے لیے، ہمیں [EIP 191](https://eips.ethereum.org/EIPS/eip-191) میں Ethereum دستخطی فارمیٹ کی پیروی کرنے کی ضرورت ہے۔ اس کا مطلب ہے کہ ہمیں ایک معیاری سابقے کے ساتھ ایک مشترکہ بفر بنانے کی ضرورت ہے، ASCII میں پیغام کی لمبائی، اور خود پیغام، اور اسے ہیش کرنے کے لیے Ethereum کے معیاری keccak256 کا استعمال کرنا ہوگا۔

```rust
    // ASCII prefix
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

ان صورتوں سے بچنے کے لیے جہاں کوئی ایپلیکیشن صارف سے کسی ایسے پیغام پر دستخط کرنے کو کہتی ہے جسے ٹرانزیکشن کے طور پر یا کسی اور مقصد کے لیے استعمال کیا جا سکتا ہے، EIP 191 یہ بتاتا ہے کہ تمام دستخط شدہ پیغامات کریکٹر 0x19 (ایک درست ASCII کریکٹر نہیں) سے شروع ہوتے ہیں جس کے بعد `Ethereum Signed Message:` اور ایک نئی لائن آتی ہے۔

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

999 تک کی پیغام کی لمبائی کو سنبھالیں اور اگر یہ اس سے زیادہ ہو تو ناکام ہو جائیں۔ میں نے یہ کوڈ شامل کیا، حالانکہ پیغام کی لمبائی ایک مستقل ہے، کیونکہ اس سے اسے تبدیل کرنا آسان ہو جاتا ہے۔ پروڈکشن سسٹم پر، آپ شاید صرف یہ فرض کریں گے کہ `MESSAGE_LENGTH` بہتر کارکردگی کی خاطر تبدیل نہیں ہوتا ہے۔

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Ethereum کے معیاری `keccak256` فنکشن کا استعمال کریں۔

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

یہ فنکشن دستخط کی تصدیق کرتا ہے، جس کے لیے پیغام کا ہیش درکار ہوتا ہے۔ پھر یہ ہمیں وہ پتہ فراہم کرتا ہے جس نے اس پر دستخط کیا اور پیغام کا ہیش۔ پیغام کا ہیش دو `Field` اقدار میں فراہم کیا جاتا ہے کیونکہ پروگرام کے باقی حصوں میں بائٹ ارے کے مقابلے میں ان کا استعمال آسان ہے۔

ہمیں دو `Field` اقدار کا استعمال کرنے کی ضرورت ہے کیونکہ فیلڈ کے حسابات ایک بڑی تعداد کے [ماڈیولو](https://en.wikipedia.org/wiki/Modulo) کیے جاتے ہیں، لیکن وہ تعداد عام طور پر 256 بٹس سے کم ہوتی ہے (ورنہ EVM میں ان حسابات کو انجام دینا مشکل ہوگا)۔

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` اور `hash2` کو قابل تغیر متغیرات کے طور پر بیان کریں، اور ہیش کو بائٹ بائٹ کر کے ان میں لکھیں۔

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

یہ [سولیڈٹی کے `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) سے ملتا جلتا ہے، دو اہم فرقوں کے ساتھ:

- اگر دستخط درست نہیں ہے، تو کال ایک `assert` ناکام ہو جاتی ہے اور پروگرام ختم ہو جاتا ہے۔
- جبکہ پبلک کی کو دستخط اور ہیش سے بازیافت کیا جا سکتا ہے، یہ ایک ایسی پروسیسنگ ہے جو بیرونی طور پر کی جا سکتی ہے اور، اس لیے، زیرو-نالج پروف کے اندر کرنے کے قابل نہیں ہے۔ اگر کوئی یہاں ہمیں دھوکہ دینے کی کوشش کرتا ہے، تو دستخط کی تصدیق ناکام ہو جائے گی۔

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
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

آخر میں، ہم `main` فنکشن تک پہنچتے ہیں۔ ہمیں یہ ثابت کرنے کی ضرورت ہے کہ ہمارے پاس ایک ٹرانزیکشن ہے جو اکاؤنٹس کے ہیش کو پرانی قدر سے نئی میں درست طریقے سے تبدیل کرتا ہے۔ ہمیں یہ بھی ثابت کرنے کی ضرورت ہے کہ اس کا یہ مخصوص ٹرانزیکشن ہیش ہے تاکہ جس شخص نے اسے بھیجا ہے اسے معلوم ہو کہ اس کے ٹرانزیکشن پر کارروائی ہو چکی ہے۔

```rust
{
    let mut txn = readTransferTxn(message);
```

ہمیں `txn` کو قابل تغیر ہونے کی ضرورت ہے کیونکہ ہم پیغام سے سے پتہ نہیں پڑھتے ہیں، ہم اسے دستخط سے پڑھتے ہیں۔

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

### مرحلہ 2 - ایک سرور شامل کرنا {#stage-2}

دوسرے مرحلے میں، ہم ایک سرور شامل کرتے ہیں جو براؤزر سے ٹرانسفر ٹرانزیکشنز وصول کرتا ہے اور ان کو نافذ کرتا ہے۔

اسے عمل میں دیکھنے کے لیے:

1. اگر Vite چل رہا ہے تو اسے روک دیں۔

2. وہ برانچ ڈاؤن لوڈ کریں جس میں سرور شامل ہے اور یقینی بنائیں کہ آپ کے پاس تمام ضروری ماڈیولز ہیں۔

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir کوڈ کو کمپائل کرنے کی ضرورت نہیں ہے، یہ وہی کوڈ ہے جو آپ نے مرحلہ 1 کے لیے استعمال کیا تھا۔

3. سرور شروع کریں۔

   ```sh
   npm run start
   ```

4. ایک الگ کمانڈ لائن ونڈو میں، براؤزر کوڈ کی خدمت کے لیے Vite چلائیں۔

   ```sh
   cd client
   npm run dev
   ```

5. کلائنٹ کوڈ پر براؤز کریں [http://localhost:5173](http://localhost:5173) پر

6. کسی ٹرانزیکشن کو جاری کرنے سے پہلے، آپ کو نونس کے ساتھ ساتھ وہ رقم بھی جاننے کی ضرورت ہے جو آپ بھیج سکتے ہیں۔ یہ معلومات حاصل کرنے کے لیے، **اکاؤنٹ ڈیٹا اپ ڈیٹ کریں** پر کلک کریں اور پیغام پر دستخط کریں۔

   ہمارے پاس یہاں ایک مخمصہ ہے۔ ایک طرف، ہم کسی ایسے پیغام پر دستخط نہیں کرنا چاہتے جسے دوبارہ استعمال کیا جا سکے ([ری پلے حملہ](https://en.wikipedia.org/wiki/Replay_attack))، یہی وجہ ہے کہ ہم سب سے پہلے ایک نونس چاہتے ہیں۔ تاہم، ہمارے پاس ابھی تک کوئی نونس نہیں ہے۔ حل یہ ہے کہ ایک ایسا نونس منتخب کیا جائے جسے صرف ایک بار استعمال کیا جا سکے اور جو ہمارے پاس دونوں طرف پہلے سے موجود ہو، جیسے کہ موجودہ وقت۔

   اس حل کے ساتھ مسئلہ یہ ہے کہ وقت بالکل ہم آہنگ نہیں ہو سکتا ہے۔ اس کے بجائے، ہم ایک ایسی قدر پر دستخط کرتے ہیں جو ہر منٹ بدلتی ہے۔ اس کا مطلب ہے کہ ری پلے حملوں کے لیے ہماری کمزوری کی کھڑکی زیادہ سے زیادہ ایک منٹ ہے۔ یہ دیکھتے ہوئے کہ پروڈکشن میں دستخط شدہ درخواست TLS کے ذریعے محفوظ کی جائے گی، اور یہ کہ سرنگ کا دوسرا رخ — سرور — پہلے ہی بیلنس اور نونس کا انکشاف کر سکتا ہے (اسے کام کرنے کے لیے انہیں جاننا ہوگا)، یہ ایک قابل قبول خطرہ ہے۔

7. ایک بار جب براؤزر بیلنس اور نونس واپس حاصل کر لیتا ہے، تو یہ ٹرانسفر فارم دکھاتا ہے۔ منزل کا پتہ اور رقم منتخب کریں اور **ٹرانسفر کریں** پر کلک کریں۔ اس درخواست پر دستخط کریں۔

8. ٹرانسفر دیکھنے کے لیے، یا تو **اکاؤنٹ ڈیٹا اپ ڈیٹ کریں** یا اس ونڈو میں دیکھیں جہاں آپ سرور چلاتے ہیں۔ سرور ہر بار جب یہ تبدیل ہوتا ہے تو اسٹیٹ کو لاگ کرتا ہے۔

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

[یہ فائل](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) سرور کے عمل پر مشتمل ہے، اور [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) پر Noir کوڈ کے ساتھ تعامل کرتی ہے۔ یہاں دلچسپ حصوں کی وضاحت ہے۔

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) لائبریری JavaScript کوڈ اور Noir کوڈ کے درمیان انٹرفیس کرتی ہے۔

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

ارتھمیٹک سرکٹ لوڈ کریں — وہ کمپائل شدہ Noir پروگرام جو ہم نے پچھلے مرحلے میں بنایا تھا — اور اسے چلانے کے لیے تیار کریں۔

```js
// We only provide account information in return to a signed request
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

اکاؤنٹ کی معلومات فراہم کرنے کے لیے، ہمیں صرف دستخط کی ضرورت ہے۔ وجہ یہ ہے کہ ہم پہلے ہی جانتے ہیں کہ پیغام کیا ہوگا، اور اس لیے پیغام کا ہیش۔

```js
const processMessage = async (message, signature) => {
```

ایک پیغام پر کارروائی کریں اور اس ٹرانزیکشن کو انجام دیں جسے یہ انکوڈ کرتا ہے۔

```js
    // Get the public key
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

اب جب کہ ہم سرور پر JavaScript چلاتے ہیں، ہم کلائنٹ کے بجائے وہاں سے پبلک کی بازیافت کر سکتے ہیں۔

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

`noir.execute` Noir پروگرام چلاتا ہے۔ پیرامیٹرز ان کے برابر ہیں جو [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) میں فراہم کیے گئے ہیں۔ نوٹ کریں کہ لمبی قدریں ہیکساڈیسیمل سٹرنگز کی ایک صف کے طور پر فراہم کی جاتی ہیں (`["0x60", "0xA7"]`)، نہ کہ ایک ہی ہیکساڈیسیمل قدر (`0x60A7`) کے طور پر، جس طرح Viem کرتا ہے۔

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

اگر کوئی خرابی ہو تو اسے پکڑیں اور پھر کلائنٹ کو ایک آسان ورژن ریلے کریں۔

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

ٹرانزیکشن لاگو کریں۔ ہم نے اسے پہلے ہی Noir کوڈ میں کر دیا ہے، لیکن اسے یہاں دوبارہ کرنا اس سے نتیجہ نکالنے سے زیادہ آسان ہے۔

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

ابتدائی `Accounts` کی ساخت۔

### مرحلہ 3 - Ethereum اسمارٹ کنٹریکٹس {#stage-3}

1. سرور اور کلائنٹ کے عمل کو روک دیں۔

2. اسمارٹ کنٹریکٹس کے ساتھ برانچ ڈاؤن لوڈ کریں اور یقینی بنائیں کہ آپ کے پاس تمام ضروری ماڈیولز ہیں۔

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. ایک الگ کمانڈ لائن ونڈو میں `anvil` چلائیں۔

4. تصدیقی کلید اور سولیڈٹی تصدیق کنندہ تیار کریں، پھر تصدیق کنندہ کوڈ کو سولیڈٹی پروجیکٹ میں کاپی کریں۔

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. اسمارٹ کنٹریکٹس پر جائیں اور `anvil` بلاک چین استعمال کرنے کے لیے ماحولیاتی متغیرات سیٹ کریں۔

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol` کو تعینات کریں اور پتے کو ایک ماحولیاتی متغیر میں ذخیرہ کریں۔

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` کنٹریکٹ کو تعینات کریں۔

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` قدر `Accounts` کی ابتدائی اسٹیٹ کا پیڈرسن ہیش ہے۔ اگر آپ `server/index.mjs` میں اس ابتدائی اسٹیٹ میں ترمیم کرتے ہیں، تو آپ زیرو-نالج پروف کے ذریعے رپورٹ کردہ ابتدائی ہیش کو دیکھنے کے لیے ایک ٹرانزیکشن چلا سکتے ہیں۔

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

11. یہ تصدیق کرنے کے لیے کہ اسٹیٹ آن چین تبدیل ہو گئی ہے، سرور کے عمل کو دوبارہ شروع کریں۔ دیکھیں کہ `ZkBank` اب ٹرانزیکشنز قبول نہیں کرتا ہے، کیونکہ ٹرانزیکشنز میں اصل ہیش ویلیو آن چین ذخیرہ شدہ ہیش ویلیو سے مختلف ہے۔

    یہ متوقع غلطی کی قسم ہے۔

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

اس فائل میں تبدیلیاں زیادہ تر اصل پروف بنانے اور اسے آن چین جمع کرنے سے متعلق ہیں۔

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

ہمیں آن چین بھیجنے کے لیے اصل پروف بنانے کے لیے [Barretenberg پیکیج](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) کا استعمال کرنے کی ضرورت ہے۔ ہم اس پیکیج کو یا تو کمانڈ لائن انٹرفیس (`bb`) چلا کر یا [JavaScript لائبریری، `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) کا استعمال کر کے استعمال کر سکتے ہیں۔ JavaScript لائبریری مقامی طور پر کوڈ چلانے سے بہت سست ہے، اس لیے ہم یہاں کمانڈ لائن استعمال کرنے کے لیے [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) کا استعمال کرتے ہیں۔

نوٹ کریں کہ اگر آپ `bb.js` استعمال کرنے کا فیصلہ کرتے ہیں، تو آپ کو ایک ایسا ورژن استعمال کرنے کی ضرورت ہے جو آپ کے استعمال کردہ Noir کے ورژن کے ساتھ مطابقت رکھتا ہو۔ لکھنے کے وقت، موجودہ Noir ورژن (1.0.0-beta.11) `bb.js` ورژن 0.87 استعمال کرتا ہے۔

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

یہاں کا پتہ وہ ہے جو آپ کو ملتا ہے جب آپ ایک صاف `anvil` سے شروع کرتے ہیں اور اوپر دی گئی ہدایات پر عمل کرتے ہیں۔

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

یہ نجی کلید `anvil` میں ڈیفالٹ پہلے سے فنڈ شدہ اکاؤنٹس میں سے ایک ہے۔

```js
const generateProof = async (witness, fileID) => {
```

`bb` قابل عمل کا استعمال کرتے ہوئے ایک پروف تیار کریں۔

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

گواہ کو ایک فائل میں لکھیں۔

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

اصل میں پروف بنائیں۔ یہ مرحلہ عوامی متغیرات کے ساتھ ایک فائل بھی بناتا ہے، لیکن ہمیں اس کی ضرورت نہیں ہے۔ ہمیں وہ متغیرات پہلے ہی `noir.execute` سے مل گئے ہیں۔

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

پروف `Field` اقدار کی ایک JSON صف ہے، ہر ایک کو ایک ہیکساڈیسیمل قدر کے طور پر پیش کیا جاتا ہے۔ تاہم، ہمیں اسے ٹرانزیکشن میں ایک ہی `bytes` قدر کے طور پر بھیجنے کی ضرورت ہے، جسے Viem ایک بڑی ہیکساڈیسیمل سٹرنگ سے ظاہر کرتا ہے۔ یہاں ہم تمام اقدار کو جوڑ کر، تمام `0x` کو ہٹا کر، اور پھر آخر میں ایک شامل کر کے فارمیٹ کو تبدیل کرتے ہیں۔

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

صفائی کریں اور پروف واپس کریں۔

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

عوامی فیلڈز کو 32-بائٹ اقدار کی ایک صف ہونے کی ضرورت ہے۔ تاہم، چونکہ ہمیں ٹرانزیکشن ہیش کو دو `Field` اقدار کے درمیان تقسیم کرنے کی ضرورت تھی، یہ 16 بائٹ کی قدر کے طور پر ظاہر ہوتا ہے۔ یہاں ہم صفر شامل کرتے ہیں تاکہ Viem سمجھ جائے کہ یہ دراصل 32 بائٹس ہے۔

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

ہر پتہ ہر نونس کو صرف ایک بار استعمال کرتا ہے تاکہ ہم گواہ فائل اور آؤٹ پٹ ڈائرکٹری کے لیے ایک منفرد شناخت کنندہ کے طور پر `fromAddress` اور `nonce` کے امتزاج کا استعمال کر سکیں۔

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

آن چین کوڈ کو دو متغیرات کا ٹریک رکھنے کی ضرورت ہے: تصدیق کنندہ (ایک الگ کنٹریکٹ جو `nargo` کے ذریعے بنایا گیا ہے) اور موجودہ اسٹیٹ ہیش۔

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

جب بھی اسٹیٹ تبدیل ہوتی ہے، ہم ایک `TransactionProcessed` ایونٹ جاری کرتے ہیں۔

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

یہ فنکشن ٹرانزیکشنز پر کارروائی کرتا ہے۔ یہ پروف (`bytes` کے طور پر) اور عوامی ان پٹس (`bytes32` ارے کے طور پر) حاصل کرتا ہے، اس فارمیٹ میں جس کی تصدیق کنندہ کو ضرورت ہوتی ہے (آن چین پروسیسنگ اور اس لیے گیس کے اخراجات کو کم کرنے کے لیے)۔

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

زیرو-نالج پروف یہ ہونا چاہیے کہ ٹرانزیکشن ہمارے موجودہ ہیش سے ایک نئے میں تبدیل ہوتا ہے۔

```solidity
        myVerifier.verify(_proof, _publicFields);
```

زیرو-نالج پروف کی تصدیق کے لیے تصدیق کنندہ کنٹریکٹ کو کال کریں۔ یہ مرحلہ ٹرانزیکشن کو واپس کر دیتا ہے اگر زیرو-نالج پروف غلط ہو۔

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

اگر سب کچھ ٹھیک ہو جاتا ہے، تو اسٹیٹ ہیش کو نئی قدر میں اپ ڈیٹ کریں اور ایک `TransactionProcessed` ایونٹ جاری کریں۔

## مرکزی جزو کے ذریعے بدسلوکی {#abuses}

انفارمیشن سیکیورٹی تین خصوصیات پر مشتمل ہے:

- _رازداری_، صارفین وہ معلومات نہیں پڑھ سکتے جو وہ پڑھنے کے مجاز نہیں ہیں۔
- _انٹیگریٹی_، معلومات کو مجاز صارفین کے علاوہ مجاز طریقے سے تبدیل نہیں کیا جا سکتا۔
- _دستیابی_، مجاز صارفین سسٹم کا استعمال کر سکتے ہیں۔

اس سسٹم پر، انٹیگریٹی زیرو-نالج پروف کے ذریعے فراہم کی جاتی ہے۔ دستیابی کی ضمانت دینا بہت مشکل ہے، اور رازداری ناممکن ہے، کیونکہ بینک کو ہر اکاؤنٹ کا بیلنس اور تمام ٹرانزیکشنز جاننے کی ضرورت ہے۔ کسی ایسی ہستی کو روکنے کا کوئی طریقہ نہیں ہے جس کے پاس معلومات ہوں وہ اس معلومات کو بانٹنے سے۔

[اسٹیلتھ ایڈریسز](https://vitalik.eth.limo/general/2023/01/20/stealth.html) کا استعمال کرتے ہوئے ایک حقیقی خفیہ بینک بنانا ممکن ہو سکتا ہے، لیکن یہ اس مضمون کے دائرہ کار سے باہر ہے۔

### غلط معلومات {#false-info}

ایک طریقہ جس سے سرور انٹیگریٹی کی خلاف ورزی کر سکتا ہے وہ یہ ہے کہ جب [ڈیٹا کی درخواست کی جاتی ہے](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) تو غلط معلومات فراہم کی جائیں۔

اسے حل کرنے کے لیے، ہم ایک دوسرا Noir پروگرام لکھ سکتے ہیں جو اکاؤنٹس کو ایک نجی ان پٹ کے طور پر اور اس پتے کو جس کے لیے معلومات کی درخواست کی گئی ہے ایک عوامی ان پٹ کے طور پر وصول کرتا ہے۔ آؤٹ پٹ اس پتے کا بیلنس اور نونس، اور اکاؤنٹس کا ہیش ہے۔

یقیناً، اس پروف کی تصدیق آن چین نہیں کی جا سکتی، کیونکہ ہم آن چین پر نونس اور بیلنس پوسٹ نہیں کرنا چاہتے۔ تاہم، اس کی تصدیق براؤزر میں چلنے والے کلائنٹ کوڈ کے ذریعے کی جا سکتی ہے۔

### جبری ٹرانزیکشنز {#forced-txns}

L2s پر دستیابی کو یقینی بنانے اور سنسرشپ کو روکنے کا معمول کا طریقہ [جبری ٹرانزیکشنز](https://docs.optimism.io/stack/transactions/forced-transaction) ہے۔ لیکن جبری ٹرانزیکشنز زیرو-نالج پروف کے ساتھ نہیں ملتے ہیں۔ سرور وہ واحد ہستی ہے جو ٹرانزیکشنز کی تصدیق کر سکتی ہے۔

ہم جبری ٹرانزیکشنز کو قبول کرنے کے لیے `smart-contracts/src/ZkBank.sol` میں ترمیم کر سکتے ہیں اور سرور کو اس وقت تک اسٹیٹ کو تبدیل کرنے سے روک سکتے ہیں جب تک کہ ان پر کارروائی نہ ہو جائے۔ تاہم، یہ ہمیں ایک سادہ denial-of-service حملے کے لیے کھول دیتا ہے۔ کیا ہوگا اگر کوئی جبری ٹرانزیکشن غلط ہو اور اس لیے اس پر کارروائی کرنا ناممکن ہو؟

حل یہ ہے کہ ایک زیرو-نالج پروف ہو کہ ایک جبری ٹرانزیکشن غلط ہے۔ یہ سرور کو تین اختیارات دیتا ہے:

- جبری ٹرانزیکشن پر کارروائی کریں، یہ ثابت کرنے کے لیے ایک زیرو-نالج پروف فراہم کریں کہ اس پر کارروائی ہو چکی ہے اور نئی اسٹیٹ ہیش۔
- جبری ٹرانزیکشن کو مسترد کریں، اور کنٹریکٹ کو ایک زیرو-نالج پروف فراہم کریں کہ ٹرانزیکشن غلط ہے (نامعلوم پتہ، خراب نونس، یا ناکافی بیلنس)۔
- جبری ٹرانزیکشن کو نظر انداز کریں۔ سرور کو اصل میں ٹرانزیکشن پر کارروائی کرنے پر مجبور کرنے کا کوئی طریقہ نہیں ہے، لیکن اس کا مطلب ہے کہ پورا نظام دستیاب نہیں ہے۔

#### دستیابی بانڈز {#avail-bonds}

حقیقی زندگی کے نفاذ میں، سرور کو چلانے کے لیے شاید کسی قسم کا منافع کا محرک ہوگا۔ ہم سرور سے ایک دستیابی بانڈ پوسٹ کروا کر اس ترغیب کو مضبوط کر سکتے ہیں جسے کوئی بھی جلا سکتا ہے اگر ایک جبری ٹرانزیکشن پر ایک مخصوص مدت کے اندر کارروائی نہ کی جائے۔

### خراب Noir کوڈ {#bad-noir-code}

عام طور پر، لوگوں کو ایک اسمارٹ کنٹریکٹ پر بھروسہ دلانے کے لیے ہم سورس کوڈ کو [بلاک ایکسپلورر](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) پر اپ لوڈ کرتے ہیں۔ تاہم، زیرو-نالج پروف کے معاملے میں، یہ ناکافی ہے۔

`Verifier.sol` میں تصدیقی کلید ہوتی ہے، جو Noir پروگرام کا ایک فنکشن ہے۔ تاہم، وہ کلید ہمیں یہ نہیں بتاتی کہ Noir پروگرام کیا تھا۔ اصل میں ایک قابل اعتماد حل کے لیے، آپ کو Noir پروگرام (اور وہ ورژن جس نے اسے بنایا ہے) اپ لوڈ کرنے کی ضرورت ہے۔ ورنہ، زیرو-نالج پروف ایک مختلف پروگرام کی عکاسی کر سکتے ہیں، جس میں ایک بیک ڈور ہو۔

جب تک بلاک ایکسپلورر ہمیں Noir پروگرامز کو اپ لوڈ کرنے اور تصدیق کرنے کی اجازت دینا شروع نہیں کرتے، آپ کو یہ خود کرنا چاہیے (ترجیحاً [IPFS](/developers/tutorials/ipfs-decentralized-ui/) پر)۔ پھر نفیس صارفین سورس کوڈ ڈاؤن لوڈ کرنے، اسے خود کمپائل کرنے، `Verifier.sol` بنانے، اور یہ تصدیق کرنے کے قابل ہوں گے کہ یہ آن چین والے سے یکساں ہے۔

## نتیجہ {#conclusion}

پلازما قسم کی ایپلی کیشنز کو معلومات کے ذخیرہ کے طور پر ایک مرکزی جزو کی ضرورت ہوتی ہے۔ یہ ممکنہ کمزوریوں کو کھولتا ہے لیکن، بدلے میں، ہمیں ان طریقوں سے رازداری کو برقرار رکھنے کی اجازت دیتا ہے جو خود بلاک چین پر دستیاب نہیں ہیں۔ زیرو-نالج پروف کے ساتھ ہم انٹیگریٹی کو یقینی بنا سکتے ہیں اور ممکنہ طور پر اسے مرکزی جزو چلانے والے کے لیے دستیابی کو برقرار رکھنے کے لیے اقتصادی طور پر فائدہ مند بنا سکتے ہیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔

## اعترافات {#acknowledgements}

- جوش کرائٹس نے اس مضمون کا ایک مسودہ پڑھا اور ایک کانٹے دار Noir مسئلے میں میری مدد کی۔

کوئی بھی باقی غلطیاں میری ذمہ داری ہیں۔
