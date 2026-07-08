---
title: "⁦Web3⁩ خفیہ اسٹوریج کی تعریف"
description: "⁦Web3⁩ خفیہ اسٹوریج کی باقاعدہ تعریف"
lang: ur
sidebarDepth: 2
---

ایتھیریم پر اپنی ایپ کو کام کرنے کے قابل بنانے کے لیے، آپ <span dir="ltr">Web3.js</span> لائبریری کی طرف سے فراہم کردہ <span dir="ltr">web3</span> آبجیکٹ استعمال کر سکتے ہیں۔ اندرونی طور پر یہ <span dir="ltr">RPC</span> کالز کے ذریعے ایک مقامی نوڈ سے رابطہ کرتا ہے۔ [web3](https://github.com/ethereum/web3.js/) کسی بھی ایتھیریم نوڈ کے ساتھ کام کرتا ہے جو <span dir="ltr">RPC</span> لیئر فراہم کرتا ہے۔

`web3` میں `eth` آبجیکٹ شامل ہے - <span dir="ltr">web3.eth</span>۔

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** نتیجہ
 *               [ 'web3', 3 ]   Web3 (v3) کلیدی فائل
 *  [ 'ethersale', undefined ]   Ethersale کلیدی فائل
 *                        null     غیر معتبر کلیدی فائل
 */
```

یہ دستاویز <span dir="ltr">Web3</span> خفیہ اسٹوریج کی تعریف کے **ورژن 3** کو بیان کرتی ہے۔

## تعریف {#definition}

فائل کی اصل انکوڈنگ اور ڈیکوڈنگ بڑی حد تک ورژن 1 سے غیر تبدیل شدہ ہے، سوائے اس کے کہ کرپٹو الگورتھم اب <span dir="ltr">AES-128-CBC</span> تک محدود نہیں رہا (<span dir="ltr">AES-128-CTR</span> اب کم از کم ضرورت ہے)۔ زیادہ تر معانی/الگورتھم ورژن 1 سے ملتے جلتے ہیں، سوائے `mac` کے، جسے اخذ کردہ کلید کے بائیں سے دوسرے <span dir="ltr">16 bytes</span> اور مکمل `ciphertext` کے ملاپ کے <span dir="ltr">SHA3</span> (کیچاک-۲۵۶) کے طور پر دیا گیا ہے۔

خفیہ کلید کی فائلیں براہ راست `~/.web3/keystore` (یونکس جیسے سسٹمز کے لیے) اور `~/AppData/Web3/keystore` (Windows کے لیے) میں محفوظ کی جاتی ہیں۔ ان کا کوئی بھی نام رکھا جا سکتا ہے، لیکن ایک اچھی روایت `<uuid>.json` ہے، جہاں `<uuid>` خفیہ کلید کو دیا گیا <span dir="ltr">128-bit UUID</span> ہے (خفیہ کلید کے پتہ کے لیے رازداری کو برقرار رکھنے والی پراکسی)۔

ایسی تمام فائلوں کا ایک متعلقہ پاس ورڈ ہوتا ہے۔ کسی دی گئی `.json` فائل کی خفیہ کلید اخذ کرنے کے لیے، سب سے پہلے فائل کی خفیہ کاری کی کلید اخذ کریں؛ یہ فائل کا پاس ورڈ لے کر اور اسے کلید اخذ کرنے والے فنکشن (KDF) سے گزار کر کیا جاتا ہے جیسا کہ `kdf` کلید کے ذریعے بیان کیا گیا ہے۔ KDF فنکشن کے لیے KDF پر منحصر جامد اور متحرک پیرامیٹرز `kdfparams` کلید میں بیان کیے گئے ہیں۔

<span dir="ltr">PBKDF2</span> کو تمام کم از کم مطابقت رکھنے والے نفاذات کے ذریعے سپورٹ کیا جانا چاہیے، جسے اس طرح ظاہر کیا جاتا ہے:

- `kdf`: `pbkdf2`

<span dir="ltr">PBKDF2</span> کے لیے، kdfparams میں شامل ہیں:

- `prf`: `hmac-sha256` ہونا چاہیے (مستقبل میں اس میں توسیع کی جا سکتی ہے)؛
- `c`: تکرار کی تعداد؛
- `salt`: <span dir="ltr">PBKDF</span> کو پاس کیا گیا سالٹ (salt)؛
- `dklen`: اخذ کردہ کلید کی لمبائی۔ <span dir="ltr">= 32</span> ہونی چاہیے۔

ایک بار جب فائل کی کلید اخذ کر لی جائے، تو اسے <span dir="ltr">MAC</span> کے اخذ کے ذریعے تصدیق کیا جانا چاہیے۔ <span dir="ltr">MAC</span> کا حساب اخذ کردہ کلید کے بائیں سے دوسرے <span dir="ltr">16 bytes</span> اور `ciphertext` کلید کے مندرجات کے ملاپ سے بننے والے بائٹ ایرے کے <span dir="ltr">SHA3</span> (کیچاک-۲۵۶) ہیش کے طور پر کیا جانا چاہیے، یعنی:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(جہاں `++` ملاپ کا آپریٹر ہے)

اس قدر کا موازنہ `mac` کلید کے مندرجات سے کیا جانا چاہیے؛ اگر وہ مختلف ہیں، تو ایک متبادل پاس ورڈ طلب کیا جانا چاہیے (یا عمل منسوخ کر دیا جائے)۔

فائل کی کلید کی تصدیق کے بعد، سائفر ٹیکسٹ (فائل میں `ciphertext` کلید) کو `cipher` کلید کے ذریعے متعین کردہ اور `cipherparams` کلید کے ذریعے پیرامیٹرائزڈ سمیٹرک خفیہ کاری الگورتھم کا استعمال کرتے ہوئے ڈیکرپٹ کیا جا سکتا ہے۔ اگر اخذ کردہ کلید کا سائز اور الگورتھم کی کلید کا سائز مماثل نہیں ہیں، تو اخذ کردہ کلید کے زیرو پیڈڈ، دائیں جانب کے بائٹس کو الگورتھم کی کلید کے طور پر استعمال کیا جانا چاہیے۔

تمام کم از کم مطابقت رکھنے والے نفاذات کو <span dir="ltr">AES-128-CTR</span> الگورتھم کو سپورٹ کرنا چاہیے، جسے اس طرح ظاہر کیا جاتا ہے:

- `cipher: aes-128-ctr`

یہ سائفر درج ذیل پیرامیٹرز لیتا ہے، جو cipherparams کلید کی کلیدوں کے طور پر دیے گئے ہیں:

- `iv`: سائفر کے لیے <span dir="ltr">128-bit</span> انیشلائزیشن ویکٹر۔

سائفر کے لیے کلید اخذ کردہ کلید کے بائیں جانب کے <span dir="ltr">16 bytes</span> ہیں، یعنی `DK[0..15]`

خفیہ کلید کی تخلیق/خفیہ کاری بنیادی طور پر ان ہدایات کے برعکس ہونی چاہیے۔ اس بات کو یقینی بنائیں کہ `uuid`، `salt` اور `iv` واقعی بے ترتیب (random) ہیں۔

`version` فیلڈ کے علاوہ، جسے ورژن کے "سخت" شناخت کنندہ کے طور پر کام کرنا چاہیے، نفاذات فارمیٹ میں چھوٹی، غیر توڑنے والی تبدیلیوں کو ٹریک کرنے کے لیے `minorversion` کا بھی استعمال کر سکتے ہیں۔

## ٹیسٹ ویکٹرز {#test-vectors}

تفصیلات:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### <span dir="ltr">PBKDF2-SHA-256</span> {#pbkdf2-sha-256}

`AES-128-CTR` اور `PBKDF2-SHA-256` کا استعمال کرتے ہوئے ٹیسٹ ویکٹر:

`~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json` کے فائل مندرجات:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "6087dab2f9fdbbfaddc31a909735c1e6"
    },
    "ciphertext": "5318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46",
    "kdf": "pbkdf2",
    "kdfparams": {
      "c": 262144,
      "dklen": 32,
      "prf": "hmac-sha256",
      "salt": "ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd"
    },
    "mac": "517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**درمیانی مراحل**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### <span dir="ltr">Scrypt</span> {#scrypt}

<span dir="ltr">AES-128-CTR</span> اور <span dir="ltr">Scrypt</span> کا استعمال کرتے ہوئے ٹیسٹ ویکٹر:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "740770fce12ce862af21264dab25f1da"
    },
    "ciphertext": "dd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "25710c2ccd7c610b24d068af83b959b7a0e5f40641f0c82daeb1345766191034"
    },
    "mac": "337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**درمیانی مراحل**:

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## ورژن 1 سے تبدیلیاں {#alterations-from-v2}

یہ ورژن [یہاں](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst) شائع شدہ ورژن 1 کے ساتھ کئی تضادات کو دور کرتا ہے۔ مختصراً یہ ہیں:

- کیپیٹلائزیشن غیر منصفانہ اور متضاد ہے (<span dir="ltr">scrypt</span> چھوٹے حروف میں، <span dir="ltr">Kdf</span> ملے جلے حروف میں، <span dir="ltr">MAC</span> بڑے حروف میں)۔
- پتہ غیر ضروری ہے اور رازداری سے سمجھوتہ کرتا ہے۔
- `Salt` بنیادی طور پر کلید اخذ کرنے والے فنکشن کا ایک پیرامیٹر ہے اور اس کے ساتھ منسلک ہونے کا مستحق ہے، نہ کہ عام طور پر کرپٹو کے ساتھ۔
- _SaltLen_ غیر ضروری ہے (اسے صرف سالٹ سے اخذ کریں)۔
- کلید اخذ کرنے کا فنکشن دیا گیا ہے، پھر بھی کرپٹو الگورتھم سختی سے متعین ہے۔
- `Version` بنیادی طور پر عددی ہے پھر بھی ایک سٹرنگ ہے (سٹرنگ کے ساتھ سٹرکچرڈ ورژننگ ممکن ہو سکتی ہے، لیکن اسے شاذ و نادر ہی تبدیل ہونے والے کنفیگریشن فائل فارمیٹ کے دائرہ کار سے باہر سمجھا جا سکتا ہے)۔
- `KDF` اور `cipher` تصوراتی طور پر ہم منصب تصورات ہیں پھر بھی انہیں مختلف طریقے سے منظم کیا گیا ہے۔
- `MAC` کا حساب ڈیٹا کے ایک وائٹ اسپیس ایگنوسٹک حصے کے ذریعے کیا جاتا ہے(!)

درج ذیل فائل دینے کے لیے فارمیٹ میں تبدیلیاں کی گئی ہیں، جو عملی طور پر پہلے لنک کیے گئے صفحے پر دی گئی مثال کے مساوی ہے:

```json
{
  "crypto": {
    "cipher": "aes-128-cbc",
    "ciphertext": "07533e172414bfa50e99dba4a0ce603f654ebfa1ff46277c3e0c577fdc87f6bb4e4fe16c5a94ce6ce14cfa069821ef9b",
    "cipherparams": {
      "iv": "16d67ba0ce5a339ff2f07951253e6ba8"
    },
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "06870e5e6a24e183a5c807bd1c43afd86d573f7db303ff4853d135cd0fd3fe91"
    },
    "mac": "8ccded24da2e99a11d48cda146f9cc8213eb423e2ea0d8427f41c3be414424dd",
    "version": 1
  },
  "id": "0498f19a-59db-4d54-ac95-33901b4f1870",
  "version": 2
}
```

## ورژن 2 سے تبدیلیاں {#alterations-from-v2-2}

ورژن 2 ایک ابتدائی <span dir="ltr">C++</span> نفاذ تھا جس میں کئی بگز تھے۔ تمام ضروری چیزیں اس سے غیر تبدیل شدہ رہتی ہیں۔