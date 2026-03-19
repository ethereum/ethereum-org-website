---
title: "إثباتات ميركل لسلامة البيانات خارج السلسلة"
description: "ضمان سلامة البيانات على السلسلة للبيانات المخزنة، في الغالب، خارج السلسلة"
author: "أوري بوميرانتس"
tags: ["التخزين"]
skill: advanced
lang: ar
published: 2021-12-30
---

## المقدمة {#introduction}

من الناحية المثالية، نود تخزين كل شيء في تخزين إيثريوم، والذي يتم تخزينه عبر آلاف أجهزة الكمبيوتر ويتمتع بتوافر عالٍ للغاية (لا يمكن فرض رقابة على البيانات) وسلامة (لا يمكن تعديل البيانات بطريقة غير مصرح بها)، ولكن تخزين كلمة بحجم 32 بايت يكلف عادةً 20,000 من الغاز. أثناء كتابتي لهذا، تعادل هذه التكلفة 6.60 دولار. بسعر 21 سنتًا لكل بايت، يعد هذا مكلفًا للغاية للعديد من الاستخدامات.

لحل هذه المشكلة، طور نظام إيثريوم البيئي [العديد من الطرق البديلة لتخزين البيانات بطريقة لامركزية](/developers/docs/storage/). عادة ما تنطوي على مقايضة بين التوافر والسعر. ومع ذلك، عادة ما تكون السلامة مضمونة.

في هذه المقالة، ستتعلم **كيفية** ضمان سلامة البيانات دون تخزين البيانات على البلوك تشين، باستخدام [إثباتات ميركل](https://computersciencewiki.org/index.php/Merkle_proof).

## كيف تعمل؟ {#how-does-it-work}

نظريًا، يمكننا فقط تخزين التجزئة (هاش) للبيانات على السلسلة، وإرسال جميع البيانات في المعاملات التي تتطلب ذلك. ومع ذلك، لا يزال هذا مكلفًا للغاية. يكلف بايت من البيانات لمعاملة حوالي 16 من الغاز، حاليًا حوالي نصف سنت، أو حوالي 5 دولارات لكل كيلوبايت. بسعر 5000 دولار لكل ميغابايت، لا يزال هذا مكلفًا للغاية للعديد من الاستخدامات، حتى بدون التكلفة الإضافية لإجراء التجزئة (هاش) للبيانات.

الحل هو إجراء التجزئة (هاش) بشكل متكرر لمجموعات فرعية مختلفة من البيانات، لذلك بالنسبة للبيانات التي لا تحتاج إلى إرسالها، يمكنك فقط إرسال التجزئة (هاش). يمكنك القيام بذلك باستخدام شجرة ميركل (Merkle tree)، وهي بنية بيانات شجرية حيث تكون كل عقدة عبارة عن التجزئة (هاش) للعقد الموجودة أسفلها:

![شجرة ميركل](tree.png)

تجزئة الجذر هي الجزء الوحيد الذي يجب تخزينه على السلسلة. لإثبات قيمة معينة، فإنك توفر جميع التجزئات التي يجب دمجها معها للحصول على الجذر. على سبيل المثال، لإثبات `C`، فإنك توفر `D` و `H(A-B)` و `H(E-H)`.

![إثبات قيمة C](proof-c.png)

## التنفيذ {#implementation}

[يتم توفير نموذج التعليمات البرمجية هنا](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### التعليمات البرمجية خارج السلسلة {#offchain-code}

في هذه المقالة نستخدم JavaScript للحسابات خارج السلسلة. تحتوي معظم التطبيقات اللامركزية على مكونها خارج السلسلة مكتوبًا بلغة JavaScript.

#### إنشاء جذر ميركل {#creating-the-merkle-root}

أولاً، نحتاج إلى توفير جذر ميركل للسلسلة.

```javascript
const ethers = require("ethers")
```

[نستخدم دالة التجزئة (هاش) من حزمة ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// The raw data whose integrity we have to verify. The first two bytes a // البيانات الخام التي يجب علينا التحقق من سلامتها. أول بايتين
// are a user identifier, and the last two bytes the amount of tokens the // هما معرّف مستخدم، وآخر بايتين هما كمية الرموز التي
// user owns at present. // يملكها المستخدم في الوقت الحالي.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

يؤدي تشفير كل إدخال في عدد صحيح واحد بحجم 256 بت إلى تعليمات برمجية أقل قابلية للقراءة مقارنة باستخدام JSON، على سبيل المثال. ومع ذلك، فإن هذا يعني معالجة أقل بكثير لاسترداد البيانات في العقد، وبالتالي تكاليف غاز أقل بكثير. [يمكنك قراءة JSON على السلسلة](https://github.com/chrisdotn/jsmnSol)، إنها مجرد فكرة سيئة إذا كان من الممكن تجنبها.

```javascript
// The array of hash values, as BigInts // مصفوفة قيم التجزئة (هاش)، كأعداد صحيحة كبيرة (BigInts)
const hashArray = dataArray
```

في هذه الحالة، بياناتنا عبارة عن قيم بحجم 256 بت في البداية، لذلك لا حاجة إلى معالجة. إذا استخدمنا بنية بيانات أكثر تعقيدًا، مثل السلاسل النصية، فنحن بحاجة إلى التأكد من إجراء التجزئة (هاش) للبيانات أولاً للحصول على مصفوفة من التجزئات. لاحظ أن هذا يرجع أيضًا إلى أننا لا نهتم إذا كان المستخدمون يعرفون معلومات المستخدمين الآخرين. وإلا لكان علينا إجراء التجزئة (هاش) حتى لا يعرف المستخدم 1 قيمة المستخدم 0، ولن يعرف المستخدم 2 قيمة المستخدم 3، وما إلى ذلك.

```javascript
// Convert between the string the hash function expects and the // التحويل بين السلسلة النصية التي تتوقعها دالة التجزئة (هاش) و
// BigInt we use everywhere else. // العدد الصحيح الكبير (BigInt) الذي نستخدمه في كل مكان آخر.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

تتوقع دالة التجزئة (هاش) في ethers الحصول على سلسلة JavaScript برقم سداسي عشري، مثل `0x60A7`، وتستجيب بسلسلة أخرى بنفس البنية. ومع ذلك، بالنسبة لبقية التعليمات البرمجية، من الأسهل استخدام `BigInt`، لذلك نقوم بالتحويل إلى سلسلة سداسية عشرية والعودة مرة أخرى.

```javascript
// Symmetrical hash of a pair so we won't care if the order is reversed. // التجزئة (هاش) المتماثلة لزوج حتى لا نهتم إذا تم عكس الترتيب.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

هذه الدالة متماثلة (التجزئة لـ a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). هذا يعني أنه عندما نتحقق من إثبات ميركل، لا داعي للقلق بشأن ما إذا كنا سنضع القيمة من الإثبات قبل أو بعد القيمة المحسوبة. يتم التحقق من إثبات ميركل على السلسلة، لذلك كلما قل ما نحتاج إلى القيام به هناك كان ذلك أفضل.

تحذير:
علم التشفير أصعب مما يبدو.
الإصدار الأولي من هذه المقالة كان يحتوي على دالة التجزئة <span dir="ltr">`hash(a^b)`</span>.
كانت تلك فكرة **سيئة** لأنها تعني أنه إذا كنت تعرف القيم المشروعة لـ `a` و `b`، فيمكنك استخدام <span dir="ltr">`b' = a^b^a'`</span> لإثبات أي قيمة `a'` مطلوبة.
باستخدام هذه الدالة، سيتعين عليك حساب `b'` بحيث تكون <span dir="ltr">`hash(a') ^ hash(b')`</span> مساوية لقيمة معروفة (الفرع التالي في الطريق إلى الجذر)، وهو أمر أصعب بكثير.

```javascript
// The value to denote that a certain branch is empty, doesn't // القيمة التي تشير إلى أن فرعًا معينًا فارغ، ولا
// have a value // يحتوي على قيمة
const empty = 0n
```

عندما لا يكون عدد القيم قوة صحيحة للرقم اثنين، نحتاج إلى التعامل مع الفروع الفارغة. الطريقة التي يقوم بها هذا البرنامج هي وضع الصفر كعنصر نائب.

![شجرة ميركل مع فروع مفقودة](merkle-empty-hash.png)

```javascript
// Calculate one level up the tree of a hash array by taking the hash of // حساب مستوى واحد لأعلى في شجرة مصفوفة التجزئة (هاش) عن طريق أخذ التجزئة (هاش) لـ
// each pair in sequence // كل زوج بالتسلسل
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // To avoid over writing the input // Add an empty value if necessary (we need all the leaves to be // paired) // لتجنب الكتابة فوق المدخلات // أضف قيمة فارغة إذا لزم الأمر (نحتاج إلى أن تكون جميع الأوراق // مزدوجة)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp // oneLevelUp
```

هذه الدالة "تتسلق" مستوى واحدًا في شجرة ميركل عن طريق إجراء التجزئة (هاش) لأزواج القيم في الطبقة الحالية. لاحظ أن هذا ليس التنفيذ الأكثر كفاءة، كان بإمكاننا تجنب نسخ الإدخال وإضافة `hashEmpty` فقط عند الاقتضاء في الحلقة، ولكن تم تحسين هذه التعليمات البرمجية لسهولة القراءة.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Climb up the tree until there is only one value, that is the // root. // // If a layer has an odd number of entries the // code in oneLevelUp adds an empty value, so if we have, for example, // 10 leaves we'll have 5 branches in the second layer, 3 // branches in the third, 2 in the fourth and the root is the fifth // تسلق الشجرة حتى تتبقى قيمة واحدة فقط، وهي // الجذر. // // إذا كانت الطبقة تحتوي على عدد فردي من المدخلات، فإن // الكود في oneLevelUp يضيف قيمة فارغة، لذلك إذا كان لدينا، على سبيل المثال، // 10 أوراق، فسيكون لدينا 5 فروع في الطبقة الثانية، و 3 // فروع في الثالثة، و 2 في الرابعة، والجذر هو الخامس

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

للحصول على الجذر، استمر في التسلق حتى تتبقى قيمة واحدة فقط.

#### إنشاء إثبات ميركل {#creating-a-merkle-proof}

إثبات ميركل هو القيم التي يتم إجراء التجزئة (هاش) لها مع القيمة التي يتم إثباتها لاستعادة جذر ميركل. غالبًا ما تكون القيمة المراد إثباتها متاحة من بيانات أخرى، لذلك أفضل توفيرها بشكل منفصل بدلاً من أن تكون جزءًا من التعليمات البرمجية.

```javascript
// A merkle proof consists of the value of the list of entries to // يتكون إثبات ميركل من قيمة قائمة المدخلات التي سيتم
// hash with. Because we use a symmetrical hash function, we don't // إجراء التجزئة (هاش) معها. لأننا نستخدم دالة تجزئة (هاش) متماثلة، فإننا لا
// need the item's location to verify the proof, only to create it // نحتاج إلى موقع العنصر للتحقق من الإثبات، بل لإنشائه فقط
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Until we reach the top // حتى نصل إلى القمة
    while (currentLayer.length > 1) {
        // No odd length layers // لا توجد طبقات بطول فردي
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // If currentN is odd, add with the value before it to the proof // إذا كان currentN فرديًا، أضفه مع القيمة التي قبله إلى الإثبات
            ? currentLayer[currentN-1]
               // If it is even, add the value after it // إذا كان زوجيًا، أضف القيمة التي بعده
            : currentLayer[currentN+1])

```

نقوم بإجراء التجزئة (هاش) لـ `(v[0],v[1])`، `(v[2],v[3])`، إلخ. لذلك بالنسبة للقيم الزوجية نحتاج إلى القيمة التالية، وبالنسبة للقيم الفردية نحتاج إلى القيمة السابقة.

```javascript
        // Move to the next layer up // الانتقال إلى الطبقة التالية لأعلى
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1 // طالما currentLayer.length > 1

    return result
}   // getMerkleProof // getMerkleProof
```

### التعليمات البرمجية على السلسلة {#onchain-code}

أخيرًا لدينا التعليمات البرمجية التي تتحقق من الإثبات. تمت كتابة التعليمات البرمجية على السلسلة بلغة [Solidity](https://docs.soliditylang.org/en/v0.8.11/). التحسين هنا أكثر أهمية بكثير لأن الغاز مكلف نسبيًا.

```solidity
//SPDX-License-Identifier: Public Domain // SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

لقد كتبت هذا باستخدام [بيئة تطوير Hardhat](https://hardhat.org/)، والتي تتيح لنا الحصول على [مخرجات وحدة التحكم من Solidity](https://hardhat.org/docs/cookbook/debug-logs) أثناء التطوير.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremely insecure, in production code access to // غير آمن للغاية، في كود الإنتاج يجب أن يكون الوصول إلى
    // this function MUST BE strictly limited, probably to an // هذه الدالة مقيدًا بشدة، وربما يقتصر على
    // owner // المالك
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot // setRoot
```

دوال التعيين (Set) والاسترجاع (Get) لجذر ميركل. السماح للجميع بتحديث جذر ميركل هو _فكرة سيئة للغاية_ في نظام الإنتاج. أقوم بذلك هنا من أجل التبسيط لنموذج التعليمات البرمجية. **لا تفعل ذلك في نظام تهم فيه سلامة البيانات بالفعل**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

تُنشئ هذه الدالة تجزئة زوجية. إنها مجرد ترجمة Solidity لتعليمات JavaScript البرمجية لـ `hash` و `pairHash`.

**ملاحظة:** هذه حالة أخرى من حالات التحسين لسهولة القراءة. بناءً على [تعريف الدالة](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm)، قد يكون من الممكن تخزين البيانات كقيمة [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) وتجنب التحويلات.

```solidity
    // Verify a Merkle proof // التحقق من إثبات ميركل
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof // MarkleProof
```

في التدوين الرياضي، يبدو التحقق من إثبات ميركل هكذا: <span dir="ltr">`H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`</span>. هذه التعليمات البرمجية تنفذ ذلك.

## إثباتات ميركل والرول أب لا يختلطان {#merkle-proofs-and-rollups}

لا تعمل إثباتات ميركل بشكل جيد مع [الرول أب](/developers/docs/scaling/#rollups). السبب هو أن الرول أب يكتب جميع بيانات المعاملات على الطبقة الأولى (L1)، ولكنه يعالجها على الطبقة الثانية (L2). يبلغ متوسط تكلفة إرسال إثبات ميركل مع معاملة 638 من الغاز لكل طبقة (حاليًا يكلف البايت في بيانات الاستدعاء 16 من الغاز إذا لم يكن صفرًا، و 4 إذا كان صفرًا). إذا كان لدينا 1024 كلمة من البيانات، فإن إثبات ميركل يتطلب عشر طبقات، أو إجمالي 6380 من الغاز.

بالنظر على سبيل المثال إلى [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)، تكلف كتابة غاز الطبقة الأولى (L1) حوالي 100 gwei وتكلف غاز الطبقة الثانية (L2) 0.001 gwei (هذا هو السعر العادي، ويمكن أن يرتفع مع الازدحام). لذلك مقابل تكلفة غاز واحد من الطبقة الأولى (L1)، يمكننا إنفاق مائة ألف غاز على معالجة الطبقة الثانية (L2). بافتراض أننا لا نستبدل التخزين، فهذا يعني أنه يمكننا كتابة حوالي خمس كلمات في التخزين على الطبقة الثانية (L2) بسعر غاز واحد من الطبقة الأولى (L1). بالنسبة لإثبات ميركل واحد، يمكننا كتابة 1024 كلمة بالكامل في التخزين (بافتراض أنه يمكن حسابها على السلسلة في البداية، بدلاً من توفيرها في معاملة) ولا يزال يتبقى لدينا معظم الغاز.

## الخاتمة {#conclusion}

في الحياة الواقعية، قد لا تقوم أبدًا بتنفيذ أشجار ميركل بنفسك. هناك مكتبات معروفة ومدققة يمكنك استخدامها، وبشكل عام من الأفضل عدم تنفيذ الأساسيات التشفيرية بنفسك. لكنني آمل أن تفهم الآن إثباتات ميركل بشكل أفضل ويمكنك أن تقرر متى تستحق الاستخدام.

لاحظ أنه بينما تحافظ إثباتات ميركل على _السلامة_، فإنها لا تحافظ على _التوافر_. إن معرفة أنه لا يمكن لأي شخص آخر أخذ أصولك هو عزاء بسيط إذا قرر تخزين البيانات عدم السماح بالوصول ولا يمكنك بناء شجرة ميركل للوصول إليها أيضًا. لذلك من الأفضل استخدام أشجار ميركل مع نوع من التخزين اللامركزي، مثل IPFS.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).