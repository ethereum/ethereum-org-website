---
title: Merkle proofs for offline data integrity
description: "ضمان سلامة البيانات على السلسلة للبيانات المخزنة، في الغالب، خارج السلسلة"
author: Ori Pomerantz
tags: [ "التخزين" ]
skill: advanced
lang: ar
published: 2021-12-30
---

## مقدمة {#مقدمة}

Ideally we'd like to store everything in Ethereum storage, which is stored across thousands of computers and has
extremely high availability (the data cannot be censored) and integrity (the data cannot be modified in an
unauthorized manner), but storing a 32-byte word typically costs 20,000 gas. As I'm writing this, that cost is
equivalent to $6.60. At 21 cents per byte this is too expensive for many uses.

لحل هذه المشكلة، طوّر نظام إيثريوم البيئي [العديد من الطرق البديلة لتخزين البيانات بطريقة لامركزية](/developers/docs/storage/). Usually they involve a tradeoff between availability
and price. However, integrity is usually assured.

في هذا المقال، ستتعلم **كيف** تضمن سلامة البيانات دون تخزين البيانات على البلوكتشين، باستخدام [إثباتات ميركل](https://computersciencewiki.org/index.php/Merkle_proof).

## How does it work؟ {#how-does-it-work}

من الناحية النظرية، يمكننا فقط تخزين التجزئة (هاش) للبيانات على السلسلة، وإرسال جميع البيانات في المعاملات التي تتطلب ذلك. However, this is still too expensive. A byte of data to a transaction costs about 16 gas, currently about half a cent, or about $5 per kilobyte. At $5000 per megabyte, this is still too expensive for many uses, even without the added cost of hashing the data.

The solution is to repeatedly hash different subsets of the data, so for the data that you don't need to send you can just send a hash. You do this using a Merkle tree, a tree data structure where each node is a hash of the nodes below it:

![شجرة ميركل](tree.png)

التجزئة (هاش) الجذرية هي الجزء الوحيد الذي يجب تخزينه على السلسلة. To prove a certain value, you provide all the hashes that need to be combined with it to obtain the root. على سبيل المثال، لإثبات `C`، فإنك تقدم `D` و `H(A-B)` و `H(E-H)`.

![إثبات قيمة C](proof-c.png)

## التنفيذ {#implementation}

[يتم توفير النص البرمجي النموذجي هنا](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### النص البرمجي خارج السلسلة {#offchain-code}

في هذه المقالة، نستخدم JavaScript للحسابات خارج السلسلة. معظم التطبيقات اللامركزية لديها مكونها خارج السلسلة في JavaScript.

#### إنشاء جذر ميركل {#creating-the-merkle-root}

First we need to provide the Merkle root to the chain.

```javascript
const ethers = require("ethers")
```

[نحن نستخدم دالة التجزئة (هاش) من حزمة ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// البيانات الأولية التي يجب علينا التحقق من سلامتها. أول بايتين هما
// معرف مستخدم، وآخر بايتين هما مقدار الرموز التي
// يملكها المستخدم في الوقت الحالي.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Encoding each entry into a single 256-bit integer results in less readable code than using JSON, for example. However, this means significantly less processing to retrieve the data in the contract, so much lower gas costs. [يمكنك قراءة JSON على السلسلة](https://github.com/chrisdotn/jsmnSol)، إنها مجرد فكرة سيئة إذا كان بالإمكان تجنبها.

```javascript
// مصفوفة قيم التجزئة (هاش)، بصيغة BigInts
const hashArray = dataArray
```

In this case our data is 256-bit values to begin with, so no processing is needed. If we use a more complicated data structure, such as strings, we need to make sure we hash the data first to get an array of hashes. Note that this is also because we don't care if users know other users' information. Otherwise we would have had to hash so user 1 won't know the value for user 0, user 2 won't know the value for user 3, etc.

```javascript
// التحويل بين السلسلة التي تتوقعها دالة التجزئة (هاش) و
// BigInt الذي نستخدمه في كل مكان آخر.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

تتوقع دالة التجزئة (هاش) في ethers الحصول على سلسلة JavaScript برقم ست عشري، مثل `0x60A7`، وتستجيب بسلسلة أخرى بنفس البنية. ولكن، بالنسبة لبقية النص البرمجي، من الأسهل استخدام `BigInt`، لذلك نقوم بالتحويل إلى سلسلة ست عشرية والعودة مرة أخرى.

```javascript
// تجزئة (هاش) متماثلة لزوج حتى لا نهتم إذا تم عكس الترتيب.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

هذه الدالة متماثلة (تجزئة أ [xor](https://en.wikipedia.org/wiki/Exclusive_or) ب). This means that when we check the Merkle proof we don't need to worry about whether to put the value from the proof before or after the calculated value. يتم التحقق من إثبات ميركل على السلسلة، لذا كلما قل ما نحتاج إلى القيام به هناك كان ذلك أفضل.

Warning:
Cryptography is harder than it looks.
تضمن الإصدار الأولي من هذه المقالة دالة التجزئة (هاش) `hash(a^b)`.
كانت تلك فكرة **سيئة** لأنها كانت تعني أنه إذا كنت تعرف القيم المشروعة لـ `a` و `b`، فيمكنك استخدام `b' = a^b^a'` لإثبات أي قيمة `a'` مرغوبة.
باستخدام هذه الدالة، سيتعين عليك حساب `b'` بحيث تكون `hash(a') ^ hash(b')` مساوية لقيمة معروفة (الفرع التالي في الطريق إلى الجذر)، وهو أمر أصعب بكثير.

```javascript
// القيمة التي تشير إلى أن فرعًا معينًا فارغ، وليس له
// قيمة
const empty = 0n
```

When the number of values is not an integer power of two we need to handle empty branches. The way this program does it is to put zero as a place holder.

![شجرة ميركل مع فروع مفقودة](merkle-empty-hash.png)

```javascript
// حساب مستوى واحد لأعلى في شجرة مصفوفة التجزئة (هاش) عن طريق أخذ تجزئة (هاش)
// كل زوج بالتسلسل
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // لتجنب الكتابة فوق المدخلات // أضف قيمة فارغة إذا لزم الأمر (نحتاج إلى أن تكون جميع الأوراق // مزدوجة)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

This function "climbs" one level in the Merkle tree by hashing the pairs of values at the current layer. لاحظ أن هذا ليس التنفيذ الأكثر كفاءة، كان بإمكاننا تجنب نسخ المدخلات وإضافة `hashEmpty` فقط عند الاقتضاء في الحلقة، ولكن هذا النص البرمجي محسن لسهولة القراءة.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // تسلق الشجرة حتى لا يتبقى سوى قيمة واحدة، وهي // الجذر. // // إذا كانت الطبقة تحتوي على عدد فردي من الإدخالات، فإن // النص البرمجي في oneLevelUp يضيف قيمة فارغة، لذلك إذا كان لدينا على سبيل المثال، // 10 أوراق، فسيكون لدينا 5 فروع في الطبقة الثانية، و3 // فروع في الطبقة الثالثة، و2 في الرابعة، والجذر هو الخامس

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

To get the root, climb until there is only one value left.

#### إنشاء إثبات ميركل {#creating-a-merkle-proof}

A Merkle proof is the values to hash together with the value being proved to get back the Merkle root. The value to prove is often available from other data, so I prefer to provide it separately rather than as part of the code.

```javascript
// يتكون إثبات ميركل من قيمة قائمة الإدخالات
// التي سيتم تجزئتها. ولأننا نستخدم دالة تجزئة (هاش) متماثلة، فإننا لا
// نحتاج إلى موقع العنصر للتحقق من الإثبات، بل فقط لإنشائه
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // حتى نصل إلى القمة
    while (currentLayer.length > 1) {
        // لا توجد طبقات ذات طول فردي
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // إذا كان currentN فرديًا، أضف القيمة التي تسبقه إلى الإثبات
            ? currentLayer[currentN-1]
               // إذا كان زوجيًا، أضف القيمة التي تليه
            : currentLayer[currentN+1])

```

نحن نجزئ `(v[0],v[1])`، `(v[2],v[3])`، إلخ. So for even values we need the next one, for odd values the previous one.

```javascript
        // الانتقال إلى الطبقة التالية لأعلى
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // طالما أن currentLayer.length > 1

    return result
}   // getMerkleProof
```

### النص البرمجي على السلسلة {#onchain-code}

Finally we have the code that checks the proof. النص البرمجي على السلسلة مكتوب بلغة [سوليديتي](https://docs.soliditylang.org/en/v0.8.11/). Optimization is a lot more important here because gas is relatively expensive.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

لقد كتبت هذا باستخدام [بيئة تطوير Hardhat](https://hardhat.org/)، والتي تتيح لنا الحصول على [إخراج وحدة التحكم من سوليديتي](https://hardhat.org/docs/cookbook/debug-logs) أثناء التطوير.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // غير آمن للغاية، في النص البرمجي الإنتاجي يجب أن يكون الوصول
    // إلى هذه الدالة محدودًا للغاية، ربما
    // لمالك
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Set and get functions for the Merkle root. يُعد السماح للجميع بتحديث جذر ميركل _فكرة سيئة للغاية_ في نظام إنتاجي. I do it here for the sake of simplicity for sample code. **لا تفعل ذلك على نظام تكون فيه سلامة البيانات مهمة بالفعل**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

This function generates a pair hash. إنها مجرد ترجمة سوليديتي للنص البرمجي JavaScript لـ `hash` و`pairHash`.

**ملاحظة:** هذه حالة أخرى من حالات التحسين لسهولة القراءة. بناءً على [تعريف الدالة](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm)، قد يكون من الممكن تخزين البيانات كقيمة [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) وتجنب التحويلات.

```solidity
    // التحقق من إثبات ميركل
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

في الترميز الرياضي، يبدو التحقق من إثبات ميركل كما يلي: `H(proof_n, H(proof_n-1, H(proof_n-2, ...` H(proof_1, H(proof_0, value))...)))`. This code implements it.

## إثباتات ميركل وتكديس المعاملات لا يختلطان {#merkle-proofs-and-rollups}

لا تعمل إثباتات ميركل بشكل جيد مع [تكديس المعاملات](/developers/docs/scaling/#rollups). The reason is that rollups write all the transaction data on L1, but process on L2. The cost to send a Merkle proof with a transaction averages to 638 gas per layer (currently a byte in call data costs 16 gas if it isn't zero, and 4 if it is zero). If we have 1024 words of data, a Merkle proof requires ten layers, or a total of 6380 gas.

بالنظر على سبيل المثال إلى [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)، تبلغ تكلفة كتابة غاز L1 حوالي 100 غوي وتبلغ تكلفة غاز L2 0.001 غوي (وهو السعر العادي، ويمكن أن يرتفع مع الازدحام). So for the cost of one L1 gas we can spend a hundred thousand gas on L2 processing. Assuming we don't overwrite storage, this means that we can write about five words to storage on L2 for the price of one L1 gas. لإثبات ميركل واحد، يمكننا كتابة الكلمات البالغ عددها 1024 كلمة بالكامل في التخزين (بافتراض أنه يمكن حسابها على السلسلة في البداية، بدلاً من توفيرها في معاملة) ولا يزال لدينا معظم الغاز المتبقي.

## الخلاصة {#conclusion}

In real life you might never implement Merkle trees on your own. There are well known and audited libraries you can use and generally speaking it is best not to implement cryptographic primitives on your own. But I hope that now you understand Merkle proofs better and can decide when they are worth using.

لاحظ أنه بينما تحافظ إثباتات ميركل على _السلامة_، فإنها لا تحافظ على _التوفر_. Knowing that nobody else can take your assets is small consolation if the data storage decides to disallow access and you can't construct a Merkle tree to access them either. So Merkle trees are best used with some kind of decentralized storage, such as IPFS.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).
