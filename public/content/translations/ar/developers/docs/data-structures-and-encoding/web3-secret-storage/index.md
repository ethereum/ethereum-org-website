---
title: "تعريف تخزين أسرار ⁦Web3⁩"
description: "التعريف الرسمي لتخزين أسرار ⁦Web3⁩"
lang: ar
sidebarDepth: 2
---

لجعل تطبيقك يعمل على إيثيريوم، يمكنك استخدام كائن <span dir="ltr">web3</span> الذي توفره مكتبة <span dir="ltr">Web3.js</span>. داخليًا، يتواصل مع عقدة محلية من خلال استدعاءات <span dir="ltr">RPC</span>. تعمل [web3](https://github.com/ethereum/web3.js/) مع أي عقدة إيثيريوم تكشف عن طبقة <span dir="ltr">RPC</span>.

يحتوي `web3` على الكائن `eth` - <span dir="ltr">web3.eth</span>.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** النتيجة
 *               [ 'web3', 3 ]   ملف مفتاح Web3 (v3)
 *  [ 'ethersale', undefined ]   ملف مفتاح Ethersale
 *                        null     ملف مفتاح غير صالح
 */
```

يوثق هذا **الإصدار 3** من تعريف تخزين أسرار <span dir="ltr">Web3</span>.

## التعريف {#definition}

يظل التشفير وفك التشفير الفعلي للملف دون تغيير إلى حد كبير عن الإصدار 1، باستثناء أن خوارزمية الكريبتو لم تعد ثابتة على <span dir="ltr">AES-128-CBC</span> (أصبح <span dir="ltr">AES-128-CTR</span> الآن هو الحد الأدنى من المتطلبات). تتشابه معظم المعاني/الخوارزميات مع الإصدار 1، باستثناء `mac`، والذي يتم إعطاؤه كـ <span dir="ltr">SHA3</span> (كيكاك-256) لتسلسلات الـ 16 بايت الثانية من اليسار للمفتاح المشتق مع `ciphertext` بالكامل.

يتم تخزين ملفات المفتاح السري مباشرة في `~/.web3/keystore` (للأنظمة الشبيهة بـ <span dir="ltr">Unix</span>) و `~/AppData/Web3/keystore` (لـ <span dir="ltr">Windows</span>). يمكن تسميتها بأي اسم، ولكن العرف الجيد هو `<uuid>.json`، حيث `<uuid>` هو <span dir="ltr">UUID</span> بحجم 128 بت المعطى للمفتاح السري (وكيل يحافظ على الخصوصية لعنوان المفتاح السري).

تحتوي جميع هذه الملفات على كلمة مرور مرتبطة بها. لاشتقاق المفتاح السري لملف `.json` معين، قم أولاً باشتقاق مفتاح تشفير الملف؛ يتم ذلك من خلال أخذ كلمة مرور الملف وتمريرها عبر دالة اشتقاق المفتاح كما هو موضح بواسطة مفتاح `kdf`. يتم وصف المعلمات الثابتة والديناميكية المعتمدة على <span dir="ltr">KDF</span> لدالة <span dir="ltr">KDF</span> في مفتاح `kdfparams`.

يجب أن يكون <span dir="ltr">PBKDF2</span> مدعومًا من قبل جميع التطبيقات المتوافقة بالحد الأدنى، ويُشار إليه من خلال:

- `kdf`: `pbkdf2`

بالنسبة لـ <span dir="ltr">PBKDF2</span>، تتضمن <span dir="ltr">kdfparams</span> ما يلي:

- `prf`: يجب أن يكون `hmac-sha256` (قد يتم توسيعه في المستقبل)؛
- `c`: عدد التكرارات؛
- `salt`: الملح (salt) الممرر إلى <span dir="ltr">PBKDF</span>؛
- `dklen`: طول المفتاح المشتق. يجب أن يكون <span dir="ltr">>= 32</span>.

بمجرد اشتقاق مفتاح الملف، يجب التحقق منه من خلال اشتقاق <span dir="ltr">MAC</span>. يجب حساب <span dir="ltr">MAC</span> كـ تجزئة <span dir="ltr">SHA3</span> (كيكاك-256) لمصفوفة البايتات المكونة من تسلسلات الـ 16 بايت الثانية من اليسار للمفتاح المشتق مع محتويات مفتاح `ciphertext`، أي:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(حيث `++` هو عامل التسلسل)

يجب مقارنة هذه القيمة بمحتويات مفتاح `mac`؛ إذا كانت مختلفة، يجب طلب كلمة مرور بديلة (أو إلغاء العملية).

بعد التحقق من مفتاح الملف، يمكن فك تشفير النص المشفر (مفتاح `ciphertext` في الملف) باستخدام خوارزمية التشفير المتماثل المحددة بواسطة مفتاح `cipher` والمُعَدَّة من خلال مفتاح `cipherparams`. إذا كان حجم المفتاح المشتق وحجم مفتاح الخوارزمية غير متطابقين، فيجب استخدام البايتات المبطنة بالصفر في أقصى اليمين من المفتاح المشتق كمفتاح للخوارزمية.

يجب أن تدعم جميع التطبيقات المتوافقة بالحد الأدنى خوارزمية <span dir="ltr">AES-128-CTR</span>، ويُشار إليها من خلال:

- `cipher: aes-128-ctr`

تأخذ هذه الشفرة المعلمات التالية، المعطاة كمفاتيح لمفتاح <span dir="ltr">cipherparams</span>:

- `iv`: متجه تهيئة بحجم 128 بت للشفرة.

مفتاح الشفرة هو الـ 16 بايت في أقصى اليسار من المفتاح المشتق، أي `DK[0..15]`

يجب أن يكون إنشاء/تشفير المفتاح السري في الأساس عكس هذه التعليمات. تأكد من أن `uuid` و `salt` و `iv` عشوائية بالفعل.

بالإضافة إلى حقل `version`، والذي يجب أن يعمل كمعرف "صلب" للإصدار، قد تستخدم التطبيقات أيضًا `minorversion` لتتبع التغييرات الأصغر غير الجذرية في التنسيق.

## متجهات الاختبار {#test-vectors}

التفاصيل:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### <span dir="ltr">PBKDF2-SHA-256</span> {#pbkdf2-sha-256}

متجه الاختبار باستخدام `AES-128-CTR` و `PBKDF2-SHA-256`:

محتويات ملف `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

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

**الوسطاء**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### <span dir="ltr">Scrypt</span> {#scrypt}

متجه الاختبار باستخدام <span dir="ltr">AES-128-CTR</span> و <span dir="ltr">Scrypt</span>:

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

**الوسطاء**:

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## التعديلات عن الإصدار 1 {#alterations-from-v2}

يصلح هذا الإصدار العديد من التناقضات مع الإصدار 1 المنشور [هنا](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). باختصار هي:

- استخدام الأحرف الكبيرة غير مبرر وغير متسق (<span dir="ltr">scrypt</span> بأحرف صغيرة، <span dir="ltr">Kdf</span> بأحرف مختلطة، <span dir="ltr">MAC</span> بأحرف كبيرة).
- العنوان غير ضروري ويعرض الخصوصية للخطر.
- `Salt` هو في الأساس معلمة لدالة اشتقاق المفتاح ويستحق أن يرتبط بها، وليس بالكريبتو بشكل عام.
- _SaltLen_ غير ضروري (فقط اشتقه من <span dir="ltr">Salt</span>).
- يتم إعطاء دالة اشتقاق المفتاح، ومع ذلك يتم تحديد خوارزمية الكريبتو بشكل صارم.
- `Version` هو رقمي في الأساس ولكنه سلسلة نصية (سيكون تعيين الإصدارات المنظمة ممكنًا باستخدام سلسلة نصية، ولكن يمكن اعتباره خارج النطاق لتنسيق ملف تكوين نادرًا ما يتغير).
- `KDF` و `cipher` هما مفاهيم شقيقة من الناحية النظرية ولكنهما منظمان بشكل مختلف.
- يتم حساب `MAC` من خلال جزء من البيانات لا يتأثر بالمسافات البيضاء(!)

تم إجراء تغييرات على التنسيق لإعطاء الملف التالي، وهو مكافئ وظيفيًا للمثال الوارد في الصفحة المرتبطة سابقًا:

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

## التعديلات عن الإصدار 2 {#alterations-from-v2-2}

كان الإصدار 2 عبارة عن تطبيق مبكر بلغة <span dir="ltr">C++</span> مع عدد من الأخطاء. تظل جميع الأساسيات دون تغيير عنه.