---
title: "كل ما يمكنك تخزينه مؤقتًا"
description: "تعلم كيفية إنشاء واستخدام عقد تخزين مؤقت لإجراء معاملات رول أب أرخص"
author: Ori Pomerantz
tags: [ "الطبقة الثانية", "التخزين المؤقت", "التخزين" ]
skill: intermediate
published: 2022-09-15
lang: ar
---

عند استخدام تكديس المعاملات، تكون تكلفة البايت في المعاملة أغلى بكثير من تكلفة خانة التخزين. لذلك، من المنطقي تخزين أكبر قدر ممكن من المعلومات مؤقتًا على السلسلة.

في هذه المقالة، ستتعلم كيفية إنشاء واستخدام عقد تخزين مؤقت بطريقة يتم بها تخزين أي قيمة معلمة من المحتمل استخدامها عدة مرات مؤقتًا وتكون متاحة للاستخدام (بعد المرة الأولى) بعدد أقل بكثير من البايت، وكيفية كتابة نص برمجي خارج السلسلة يستخدم ذاكرة التخزين المؤقت هذه.

إذا كنت تريد تخطي المقالة ورؤية النص البرمجي المصدري فقط، [فهو هنا](https://github.com/qbzzt/20220915-all-you-can-cache). مكدس التطوير هو [Foundry](https://getfoundry.sh/introduction/installation/).

## التصميم العام {#overall-design}

من أجل البساطة، سنفترض أن جميع معلمات المعاملة هي `uint256`، بطول 32 بايت. عندما نتلقى معاملة، سنقوم بتحليل كل معلمة على النحو التالي:

1. إذا كان البايت الأول هو `0xFF`، فخذ 32 بايت التالية كقيمة معلمة واكتبها في ذاكرة التخزين المؤقت.

2. إذا كان البايت الأول هو `0xFE`، فخذ 32 بايت التالية كقيمة معلمة ولكن _لا_ تكتبها في ذاكرة التخزين المؤقت.

3. لأي قيمة أخرى، خذ البتات الأربعة العلوية كرقم للبايتات الإضافية، والبتات الأربعة السفلية كأكثر البتات أهمية في مفتاح ذاكرة التخزين المؤقت. وفيما يلي بعض الأمثلة:

   | بايتات في بيانات الاستدعاء | مفتاح ذاكرة التخزين المؤقت |
   | :------------------------- | -------------------------: |
   | 0x0F                       |                       0x0F |
   | 0x10,0x10                  |                       0x10 |
   | 0x12,0xAC                  |                     0x02AC |
   | 0x2D,0xEA, 0xD6            |                   0x0DEAD6 |

## معالجة ذاكرة التخزين المؤقت {#cache-manipulation}

يتم تنفيذ ذاكرة التخزين المؤقت في [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). دعنا نراجعه سطراً بسطر.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

تُستخدم هذه الثوابت لتفسير الحالات الخاصة التي نقدم فيها جميع المعلومات، وسواء كنا نريد كتابتها في ذاكرة التخزين المؤقت أم لا. تتطلب الكتابة في ذاكرة التخزين المؤقت عمليتي [`SSTORE`](https://www.evm.codes/#55) في خانات تخزين غير مستخدمة سابقًا بتكلفة 22100 غاز لكل منهما، لذلك نجعلها اختيارية.

```solidity

    mapping(uint => uint) public val2key;
```

[ربط](https://www.geeksforgeeks.org/solidity/solidity-mappings/) بين القيم ومفاتيحها. هذه المعلومات ضرورية لترميز القيم قبل إرسال المعاملة.

```solidity
    // الموقع n له القيمة للمفتاح n+1، لأننا بحاجة إلى الحفاظ على
    // الصفر كـ "ليس في ذاكرة التخزين المؤقت".
    uint[] public key2val;
```

يمكننا استخدام مصفوفة للربط من المفاتيح إلى القيم لأننا نعين المفاتيح، ومن أجل البساطة، نقوم بذلك بشكل تسلسلي.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "قراءة إدخال ذاكرة تخزين مؤقت غير مهيأ");
        return key2val[_key-1];
    }  // قراءة_ذاكرة_التخزين_المؤقت
```

اقرأ قيمة من ذاكرة التخزين المؤقت.

```solidity
    // اكتب قيمة في ذاكرة التخزين المؤقت إذا لم تكن موجودة بالفعل
    // عامة فقط لتمكين عمل الاختبار
    function cacheWrite(uint _value) public returns (uint) {
        // إذا كانت القيمة موجودة بالفعل في ذاكرة التخزين المؤقت، فقم بإرجاع المفتاح الحالي
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

لا فائدة من وضع نفس القيمة في ذاكرة التخزين المؤقت أكثر من مرة. إذا كانت القيمة موجودة بالفعل، فما عليك سوى إرجاع المفتاح الحالي.

```solidity
        // نظرًا لأن 0xFE حالة خاصة، فإن أكبر مفتاح يمكن أن تحتفظ به ذاكرة التخزين المؤقت هو
        // 0x0D متبوعًا بـ 15 0xFF's. إذا كان طول ذاكرة التخزين المؤقت بهذا الحجم
        // بالفعل، فافشل.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "تجاوز سعة ذاكرة التخزين المؤقت");
```

لا أعتقد أننا سنحصل على ذاكرة تخزين مؤقت بهذا الحجم (حوالي 1.8 \* 10<sup>37</sup> إدخالًا، الأمر الذي سيتطلب حوالي 10<sup>27</sup> تيرابايت لتخزينها). ومع ذلك، أنا كبير بما يكفي لأتذكر ["640 كيلوبايت ستكون كافية دائمًا"](https://quoteinvestigator.com/2011/09/08/640k-enough/). هذا الاختبار رخيص جدا.

```solidity
        // اكتب القيمة باستخدام المفتاح التالي
        val2key[_value] = key2val.length+1;
```

أضف البحث العكسي (من القيمة إلى المفتاح).

```solidity
        key2val.push(_value);
```

أضف البحث الأمامي (من المفتاح إلى القيمة). نظرًا لأننا نعين القيم بشكل تسلسلي، يمكننا فقط إضافتها بعد قيمة المصفوفة الأخيرة.

```solidity
        return key2val.length;
    }  // كتابة_ذاكرة_التخزين_المؤقت
```

أرجع الطول الجديد لـ`key2val`، وهي الخلية التي يتم فيها تخزين القيمة الجديدة.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

تقرأ هذه الدالة قيمة من بيانات الاستدعاء ذات طول عشوائي (يصل إلى 32 بايت، وهو حجم الكلمة).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal الحد الأقصى للطول هو 32 بايت");
        require(length + startByte <= msg.data.length,
            "_calldataVal محاولة القراءة بعد حجم بيانات الاستدعاء");
```

هذه الدالة داخلية، لذا إذا كان بقية النص البرمجي مكتوبًا بشكل صحيح، فإن هذه الاختبارات ليست مطلوبة. ومع ذلك، فهي لا تكلف الكثير، لذلك قد يكون من الأفضل وجودها.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

هذا النص البرمجي مكتوب بلغة [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). تقرأ قيمة 32 بايت من بيانات الاستدعاء. يعمل هذا حتى لو توقفت بيانات الاستدعاء قبل `startByte+32` لأن المساحة غير المهيأة في EVM تعتبر صفرًا.

```solidity
        _retVal = _retVal >> (256-length*8);
```

لا نريد بالضرورة قيمة 32 بايت. هذا يتخلص من البايتات الزائدة.

```solidity
        return _retVal;
    } // _calldataVal


    // اقرأ معلمة واحدة من بيانات الاستدعاء، بدءًا من _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

اقرأ معلمة واحدة من بيانات الاستدعاء. لاحظ أننا بحاجة إلى إرجاع ليس فقط القيمة التي نقرأها، ولكن أيضًا موقع البايت التالي لأن المعلمات يمكن أن تتراوح من بايت واحد إلى 33 بايت.

```solidity
        // يخبرنا البايت الأول بكيفية تفسير الباقي
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

تحاول Solidity تقليل عدد الأخطاء عن طريق حظر [تحويلات النوع الضمنية](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) التي قد تكون خطيرة. يجب أن يكون خفض المستوى، على سبيل المثال من 256 بت إلى 8 بت، صريحًا.

```solidity

        // اقرأ القيمة، لكن لا تكتبها في ذاكرة التخزين المؤقت
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // اقرأ القيمة، واكتبها في ذاكرة التخزين المؤقت
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // إذا وصلنا إلى هنا، فهذا يعني أننا بحاجة إلى القراءة من ذاكرة التخزين المؤقت

        // عدد البايتات الإضافية للقراءة
        uint8 _extraBytes = _firstByte / 16;
```

خذ [النيبل](https://en.wikipedia.org/wiki/Nibble) السفلي وادمجه مع البايتات الأخرى لقراءة القيمة من ذاكرة التخزين المؤقت.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // اقرأ n من المعلمات (تعرف الدوال عدد المعلمات التي تتوقعها)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

يمكننا الحصول على عدد المعلمات التي لدينا من بيانات الاستدعاء نفسها، ولكن الدوال التي تستدعينا تعرف عدد المعلمات التي تتوقعها. من الأسهل أن ندعهم يخبروننا.

```solidity
        // المعلمات التي نقرأها
        uint[] memory params = new uint[](_paramNum);

        // تبدأ المعلمات عند البايت 4، وقبل ذلك يوجد توقيع الدالة
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

اقرأ المعلمات حتى تحصل على العدد الذي تحتاجه. إذا تجاوزنا نهاية بيانات الاستدعاء، فإن `_readParams` ستعيد الاستدعاء.

```solidity

        return(params);
    }   // readParams

    // لاختبار _readParams، اختبر قراءة أربع معلمات
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

إحدى المزايا الكبيرة لـ Foundry هي أنها تسمح بكتابة الاختبارات بلغة Solidity ([انظر اختبار ذاكرة التخزين المؤقت أدناه](#testing-the-cache)). هذا يجعل اختبارات الوحدة أسهل بكثير. هذه دالة تقرأ أربع معلمات وتعيدها حتى يتمكن الاختبار من التحقق من صحتها.

```solidity
    // احصل على قيمة، وأرجع البايتات التي ستقوم بترميزها (باستخدام ذاكرة التخزين المؤقت إن أمكن)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` هي دالة يستدعيها النص البرمجي خارج السلسلة للمساعدة في إنشاء بيانات استدعاء تستخدم ذاكرة التخزين المؤقت. تتلقى قيمة واحدة وتعيد البايتات التي تقوم بترميزها. هذه الدالة هي `view`، لذلك لا تتطلب معاملة وعند استدعائها خارجيًا لا تكلف أي غاز.

```solidity
        uint _key = val2key[_val];

        // القيمة ليست في ذاكرة التخزين المؤقت بعد، أضفها
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

في [EVM](/developers/docs/evm/)، يُفترض أن كل مساحة التخزين غير المهيأة هي أصفار. لذلك إذا بحثنا عن مفتاح لقيمة غير موجودة، نحصل على صفر. في هذه الحالة، تكون البايتات التي تقوم بترميزها هي `INTO_CACHE` (لذلك سيتم تخزينها مؤقتًا في المرة القادمة)، متبوعة بالقيمة الفعلية.

```solidity
        // إذا كان المفتاح <0x10، فأرجعه كبايت واحد
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

البايتات المفردة هي الأسهل. نحن فقط نستخدم [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) لتحويل نوع `bytes<n>` إلى مصفوفة بايت يمكن أن تكون بأي طول. على الرغم من الاسم، فإنه يعمل بشكل جيد عند تزويده بوسيطة واحدة فقط.

```solidity
        // قيمة بايتين، مرمزة كـ 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

عندما يكون لدينا مفتاح أقل من 16<sup>3</sup>، يمكننا التعبير عنه في بايتين. نقوم أولاً بتحويل `_key`، وهي قيمة 256 بت، إلى قيمة 16 بت ونستخدم "أو" المنطقية لإضافة عدد البايتات الإضافية إلى البايت الأول. ثم نقوم فقط بتحويلها إلى قيمة `bytes2`، والتي يمكن تحويلها إلى `bytes`.

```solidity
        // ربما هناك طريقة ذكية للقيام بالأسطر التالية كحلقة،
        // لكنها دالة عرض لذا أقوم بالتحسين من أجل وقت المبرمج و
        // البساطة.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

القيم الأخرى (3 بايتات، 4 بايتات، إلخ.) يتم التعامل معها بنفس الطريقة، فقط بأحجام حقول مختلفة.

```solidity
        // إذا وصلنا إلى هنا، فهناك خطأ ما.
        revert("خطأ في encodeVal، لا ينبغي أن يحدث");
```

إذا وصلنا إلى هنا، فهذا يعني أننا حصلنا على مفتاح ليس أقل من 16 \* 256<sup>15</sup>. لكن `cacheWrite` تحد من المفاتيح حتى لا نتمكن حتى من الوصول إلى 14 \* 256<sup>16</sup> (والتي سيكون لها بايت أول بقيمة 0xFE، لذلك ستبدو مثل `DONT_CACHE`). لكنه لا يكلفنا الكثير لإضافة اختبار في حالة قيام مبرمج مستقبلي بإدخال خطأ.

```solidity
    } // encodeVal

}  // Cache
```

### اختبار ذاكرة التخزين المؤقت {#testing-the-cache}

إحدى مزايا Foundry هي أنها [تتيح لك كتابة الاختبارات بلغة Solidity](https://getfoundry.sh/forge/tests/overview/)، مما يسهل كتابة اختبارات الوحدة. اختبارات فئة `Cache` موجودة [هنا](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). نظرًا لأن النص البرمجي للاختبار متكرر، كما هو الحال في الاختبارات، فإن هذه المقالة تشرح الأجزاء المثيرة للاهتمام فقط.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// تحتاج إلى تشغيل `forge test -vv` لوحدة التحكم.
import "forge-std/console.sol";
```

هذا مجرد نص معياري ضروري لاستخدام حزمة الاختبار و `console.log`.

```solidity
import "src/Cache.sol";
```

نحتاج إلى معرفة العقد الذي نختبره.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

يتم استدعاء دالة `setUp` قبل كل اختبار. في هذه الحالة، نقوم فقط بإنشاء ذاكرة تخزين مؤقت جديدة، حتى لا تؤثر اختباراتنا على بعضها البعض.

```solidity
    function testCaching() public {
```

الاختبارات هي دوال تبدأ أسماؤها بـ`test`. تتحقق هذه الدالة من وظائف ذاكرة التخزين المؤقت الأساسية، وكتابة القيم وقراءتها مرة أخرى.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

هذه هي الطريقة التي تقوم بها بالاختبار الفعلي، باستخدام [دوال `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). في هذه الحالة، نتحقق من أن القيمة التي كتبناها هي القيمة التي قرأناها. يمكننا تجاهل نتيجة `cache.cacheWrite` لأننا نعلم أن مفاتيح ذاكرة التخزين المؤقت يتم تعيينها خطيًا.

```solidity
        }
    }    // testCaching


    // خزن نفس القيمة مؤقتًا عدة مرات، وتأكد من بقاء المفتاح
    // كما هو
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

أولاً، نكتب كل قيمة مرتين في ذاكرة التخزين المؤقت ونتأكد من أن المفاتيح هي نفسها (مما يعني أن الكتابة الثانية لم تحدث بالفعل).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

من الناحية النظرية، قد يكون هناك خطأ لا يؤثر على عمليات الكتابة المتتالية في ذاكرة التخزين المؤقت. لذلك هنا نقوم ببعض عمليات الكتابة غير المتتالية ونرى أن القيم لا تزال لم تتم إعادة كتابتها.

```solidity
    // اقرأ uint من مخزن الذاكرة المؤقت (للتأكد من أننا نستعيد المعلمات
    // التي أرسلناها)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

اقرأ كلمة 256 بت من مخزن `bytes memory` المؤقت. تتيح لنا هذه الدالة المساعدة التحقق من أننا نتلقى النتائج الصحيحة عندما نقوم بتشغيل استدعاء دالة يستخدم ذاكرة التخزين المؤقت.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_خارج_الحدود");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

لا تدعم Yul هياكل البيانات التي تتجاوز `uint256`، لذلك عندما تشير إلى بنية بيانات أكثر تعقيدًا، مثل مخزن الذاكرة المؤقت `_bytes`، فإنك تحصل على عنوان تلك البنية. تقوم Solidity بتخزين قيم `bytes memory` ككلمة 32 بايت تحتوي على الطول، متبوعة بالبايتات الفعلية، لذلك للحصول على رقم البايت `_start`، نحتاج إلى حساب `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // توقيع الدالة لـ fourParams()، مقدمة من
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // مجرد بعض القيم الثابتة لنرى أننا نحصل على القيم الصحيحة مرة أخرى
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

بعض الثوابت التي نحتاجها للاختبار.

```solidity
    function testReadParam() public {
```

استدعاء `fourParams()`، وهي دالة تستخدم `readParams`، لاختبار قدرتنا على قراءة المعلمات بشكل صحيح.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

لا يمكننا استخدام آلية واجهة التطبيق الثنائية العادية لاستدعاء دالة باستخدام ذاكرة التخزين المؤقت، لذلك نحتاج إلى استخدام آلية المستوى المنخفض [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). تأخذ هذه الآلية `bytes memory` كمدخل، وتعيد ذلك (بالإضافة إلى قيمة منطقية) كمخرج.

```solidity
        // الاستدعاء الأول، ذاكرة التخزين المؤقت فارغة
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

من المفيد أن يدعم نفس العقد كلاً من الدوال المخزنة مؤقتًا (للمكالمات مباشرة من المعاملات) والدوال غير المخزنة مؤقتًا (للمكالمات من العقود الذكية الأخرى). للقيام بذلك، نحتاج إلى الاستمرار في الاعتماد على آلية Solidity لاستدعاء الدالة الصحيحة، بدلاً من وضع كل شيء في [دالة `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). القيام بذلك يجعل قابلية التركيب أسهل بكثير. سيكون بايت واحد كافيًا لتحديد الدالة في معظم الحالات، لذلك نحن نهدر ثلاثة بايتات (16 \* 3 = 48 غاز). ومع ذلك، أثناء كتابتي لهذا، تكلف تلك الـ 48 غازًا 0.07 سنتًا، وهي تكلفة معقولة لنص برمجي أبسط وأقل عرضة للأخطاء.

```solidity
            // القيمة الأولى، أضفها إلى ذاكرة التخزين المؤقت
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

القيمة الأولى: علامة تقول إنها قيمة كاملة يجب كتابتها في ذاكرة التخزين المؤقت، متبوعة بـ 32 بايت من القيمة. القيم الثلاث الأخرى متشابهة، باستثناء أن `VAL_B` لا يتم كتابتها في ذاكرة التخزين المؤقت و`VAL_C` هي المعلمة الثالثة والرابعة.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

هنا نستدعي بالفعل عقد `Cache`.

```solidity
        assertEq(_success, true);
```

نتوقع أن يكون الاستدعاء ناجحًا.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

نبدأ بذاكرة تخزين مؤقت فارغة ثم نضيف `VAL_A` متبوعة بـ`VAL_C`. نتوقع أن يكون الأول له المفتاح 1، والثاني له المفتاح 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

الناتج هو المعلمات الأربع. هنا نتحقق من صحتها.

```solidity
        // الاستدعاء الثاني، يمكننا استخدام ذاكرة التخزين المؤقت
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // القيمة الأولى في ذاكرة التخزين المؤقت
            bytes1(0x01),
```

مفاتيح ذاكرة التخزين المؤقت الأقل من 16 هي بايت واحد فقط.

```solidity
            // القيمة الثانية، لا تضفها إلى ذاكرة التخزين المؤقت
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // القيمتان الثالثة والرابعة، نفس القيمة
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

الاختبارات التي تلي الاستدعاء مطابقة لتلك التي تلي الاستدعاء الأول.

```solidity
    function testEncodeVal() public {
```

هذه الدالة مشابهة لـ `testReadParam`، إلا أننا بدلاً من كتابة المعلمات بشكل صريح نستخدم `encodeVal()`.

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

الاختبار الإضافي الوحيد في `testEncodeVal()` هو التحقق من صحة طول `_callInput`. بالنسبة للاستدعاء الأول، هو 4+33_4. أما بالنسبة للثاني، حيث توجد كل قيمة بالفعل في ذاكرة التخزين المؤقت، فهو 4+1_4.

```solidity
    // اختبر encodeVal عندما يكون المفتاح أكثر من بايت واحد
    // ثلاثة بايتات كحد أقصى لأن ملء ذاكرة التخزين المؤقت بأربعة بايتات يستغرق
    // وقتًا طويلاً جدًا.
    function testEncodeValBig() public {
        // ضع عددًا من القيم في ذاكرة التخزين المؤقت.
        // للحفاظ على بساطة الأمور، استخدم المفتاح n للقيمة n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

تكتب دالة `testEncodeVal` أعلاه أربع قيم فقط في ذاكرة التخزين المؤقت، لذلك لم يتم التحقق من [الجزء من الدالة الذي يتعامل مع القيم متعددة البايتات](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171). لكن هذا النص البرمجي معقد وعرضة للأخطاء.

الجزء الأول من هذه الدالة هو حلقة تكتب جميع القيم من 1 إلى 0x1FFF إلى ذاكرة التخزين المؤقت بالترتيب، لذلك سنكون قادرين على ترميز تلك القيم ومعرفة إلى أين تذهب.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // One byte        0x0F
            cache.encodeVal(0x0010),   // Two bytes     0x1010
            cache.encodeVal(0x0100),   // Two bytes     0x1100
            cache.encodeVal(0x1000)    // Three bytes 0x201000
        );
```

اختبر قيم بايت واحد، وبايتين، وثلاثة بايتات. لا نختبر ما هو أبعد من ذلك لأنه سيستغرق وقتًا طويلاً جدًا لكتابة ما يكفي من إدخالات المكدس (على الأقل 0x10000000، أي ما يقرب من ربع مليار).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // اختبر ما يحدث مع مخزن مؤقت صغير بشكل مفرط، فنحصل على ارتداد
    function testShortCalldata() public {
```

اختبر ما يحدث في الحالة غير الطبيعية حيث لا توجد معلمات كافية.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

نظرًا لأنه يعود، يجب أن تكون النتيجة التي نحصل عليها `false`.

```
    // استدعاء بمفاتيح ذاكرة تخزين مؤقت غير موجودة
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // القيمة الأولى، أضفها إلى ذاكرة التخزين المؤقت
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // القيمة الثانية
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

تحصل هذه الدالة على أربع معلمات شرعية تمامًا، إلا أن ذاكرة التخزين المؤقت فارغة لذا لا توجد قيم هناك لقراءتها.

```solidity
        .
        .
        .
    // اختبار ما يحدث مع مخزن مؤقت طويل بشكل مفرط، كل شيء يعمل بشكل جيد
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // الاستدعاء الأول، ذاكرة التخزين المؤقت فارغة
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // القيمة الأولى، أضفها إلى ذاكرة التخزين المؤقت
            cache.INTO_CACHE(), bytes32(VAL_A),

            // القيمة الثانية، أضفها إلى ذاكرة التخزين المؤقت
            cache.INTO_CACHE(), bytes32(VAL_B),

            // القيمة الثالثة، أضفها إلى ذاكرة التخزين المؤقت
            cache.INTO_CACHE(), bytes32(VAL_C),

            // القيمة الرابعة، أضفها إلى ذاكرة التخزين المؤقت
            cache.INTO_CACHE(), bytes32(VAL_D),

            // وقيمة أخرى لـ"الحظ السعيد"
            bytes4(0x31112233)
        );
```

ترسل هذه الدالة خمس قيم. نعلم أن القيمة الخامسة يتم تجاهلها لأنها ليست إدخالًا صالحًا لذاكرة التخزين المؤقت، وهو ما كان سيتسبب في ارتداد لو لم يتم تضمينها.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## تطبيق نموذجي {#a-sample-app}

إن كتابة الاختبارات بلغة Solidity أمر جيد جدًا، ولكن في نهاية اليوم، يحتاج التطبيق اللامركزي إلى أن يكون قادرًا على معالجة الطلبات من خارج السلسلة ليكون مفيدًا. توضح هذه المقالة كيفية استخدام التخزين المؤقت في تطبيق لامركزي مع `WORM`، والذي يرمز إلى "الكتابة مرة واحدة، والقراءة عدة مرات". إذا لم تتم كتابة المفتاح بعد، فيمكنك كتابة قيمة له. إذا تمت كتابة المفتاح بالفعل، فستحصل على ارتداد.

### العقد {#the-contract}

[هذا هو العقد](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). يكرر في الغالب ما قمنا به بالفعل مع `Cache` و`CacheTest`، لذلك نحن نغطي فقط الأجزاء المثيرة للاهتمام.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

أسهل طريقة لاستخدام `Cache` هي وراثتها في عقدنا الخاص.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

هذه الدالة مشابهة لـ `fourParam` في `CacheTest` أعلاه. نظرًا لأننا لا نتبع مواصفات واجهة التطبيق الثنائية، فمن الأفضل عدم الإعلان عن أي معلمات في الدالة.

```solidity
    // لتسهيل الاتصال بنا
    // توقيع الدالة لـ writeEntryCached()، مقدمة من
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

سيحتاج النص البرمجي الخارجي الذي يستدعي `writeEntryCached` إلى بناء بيانات الاستدعاء يدويًا، بدلاً من استخدام `worm.writeEntryCached`، لأننا لا نتبع مواصفات واجهة التطبيق الثنائية. وجود هذه القيمة الثابتة يجعل كتابتها أسهل.

لاحظ أنه على الرغم من أننا نحدد `WRITE_ENTRY_CACHED` كمتغير حالة، فلقراءته خارجيًا من الضروري استخدام دالة getter الخاصة به، `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

دالة القراءة هي `view`، لذلك لا تتطلب معاملة ولا تكلف غاز. نتيجة لذلك، لا توجد فائدة من استخدام ذاكرة التخزين المؤقت للمعلمة. مع دوال العرض، من الأفضل استخدام الآلية القياسية الأبسط.

### النص البرمجي للاختبار {#the-testing-code}

[هذا هو النص البرمجي لاختبار العقد](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). مرة أخرى، دعونا نلقي نظرة فقط على ما هو مثير للاهتمام.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[هذا (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) هو كيف نحدد في اختبار Foundry أن الاستدعاء التالي يجب أن يفشل، والسبب المبلغ عنه للفشل. ينطبق هذا عندما نستخدم بناء الجملة `<contract>.<function name>()` بدلاً من بناء بيانات الاستدعاء واستدعاء العقد باستخدام واجهة المستوى المنخفض (`<contract>.call()`، إلخ).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

هنا نستخدم حقيقة أن `cacheWrite` يعيد مفتاح ذاكرة التخزين المؤقت. هذا ليس شيئًا نتوقع استخدامه في الإنتاج، لأن `cacheWrite` يغير الحالة، وبالتالي لا يمكن استدعاؤه إلا أثناء المعاملة. لا تحتوي المعاملات على قيم إرجاع، إذا كان لديهم نتائج، فمن المفترض أن يتم إصدار هذه النتائج كأحداث. لذلك، لا يمكن الوصول إلى قيمة إرجاع `cacheWrite` إلا من نص برمجي على السلسلة، ولا يحتاج النص البرمجي على السلسلة إلى تخزين مؤقت للمعلمات.

```solidity
        (_success,) = address(worm).call(_callInput);
```

هذه هي الطريقة التي نخبر بها Solidity أنه بينما يحتوي `<contract address>.call()` على قيمتي إرجاع، فإننا نهتم فقط بالأولى.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

نظرًا لأننا نستخدم دالة `<address>.call()` ذات المستوى المنخفض، لا يمكننا استخدام `vm.expectRevert()` وعلينا النظر إلى قيمة النجاح المنطقية التي نحصل عليها من الاستدعاء.

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

هذه هي الطريقة التي نتحقق بها من أن النص البرمجي [يصدر حدثًا بشكل صحيح](https://getfoundry.sh/reference/cheatcodes/expect-emit/) في Foundry.

### العميل {#the-client}

شيء واحد لا تحصل عليه مع اختبارات Solidity هو نص برمجي JavaScript يمكنك قصه ولصقه في تطبيقك الخاص. لكتابة هذا النص البرمجي، قمت بنشر WORM على [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)، شبكة الاختبار الجديدة لـ [Optimism](https://www.optimism.io/). إنه على العنوان [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[يمكنك رؤية نص JavaScript البرمجي للعميل هنا](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). لاستخدامه:

1. استنسخ مستودع git:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. ثبِّت الحزم الضرورية:

   ```sh
   cd javascript
   yarn
   ```

3. انسخ ملف التهيئة:

   ```sh
   cp .env.example .env
   ```

4. حرر `.env` للتهيئة الخاصة بك:

   | Parameter                                                     | Value                                                                                                                                                                             |
   | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC                                                      | الذاكرة المساعدة لحساب به ما يكفي من ETH لدفع ثمن المعاملة. [يمكنك الحصول على ETH مجانًا لشبكة Optimism Goerli هنا](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | عنوان URL لـ Optimism Goerli. نقطة النهاية العامة، `https://goerli.optimism.io`، محدودة المعدل ولكنها كافية لما نحتاجه هنا                                        |

5. شغّل `index.js`.

   ```sh
   node index.js
   ```

   يكتب هذا التطبيق النموذجي أولاً إدخالًا إلى WORM، ويعرض بيانات الاستدعاء ورابطًا للمعاملة على Etherscan. ثم يقرأ هذا الإدخال مرة أخرى، ويعرض المفتاح الذي يستخدمه والقيم الموجودة في الإدخال (القيمة ورقم الكتلة والمؤلف).

معظم العميل هو JavaScript عادي للتطبيقات اللامركزية. لذا مرة أخرى سنتناول الأجزاء المثيرة للاهتمام فقط.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // بحاجة إلى مفتاح جديد في كل مرة
    const key = await worm.encodeVal(Number(new Date()))
```

لا يمكن الكتابة في خانة معينة إلا مرة واحدة، لذلك نستخدم الطابع الزمني للتأكد من أننا لا نعيد استخدام الخانات.

```javascript
const val = await worm.encodeVal("0x600D")

// اكتب إدخالًا
const calldata = func + key.slice(2) + val.slice(2)
```

تتوقع Ethers أن تكون بيانات الاستدعاء سلسلة سداسية عشرية، `0x` متبوعة بعدد زوجي من الأرقام السداسية العشرية. نظرًا لأن `key` و`val` يبدآن بـ`0x`، فنحن بحاجة إلى إزالة تلك الرؤوس.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

كما هو الحال مع النص البرمجي لاختبار Solidity، لا يمكننا استدعاء دالة مخزنة مؤقتًا بشكل طبيعي. بدلاً من ذلك، نحتاج إلى استخدام آلية ذات مستوى أدنى.

```javascript
    .
    .
    .
    // اقرأ الإدخال الذي تم كتابته للتو
    const realKey = '0x' + key.slice(4)  // إزالة علامة FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

لقراءة الإدخالات، يمكننا استخدام الآلية العادية. ليست هناك حاجة لاستخدام التخزين المؤقت للمعلمات مع دوال `view`.

## الخلاصة {#conclusion}

النص البرمجي في هذه المقالة هو إثبات للمفهوم، والغرض منه هو جعل الفكرة سهلة الفهم. للحصول على نظام جاهز للإنتاج، قد ترغب في تنفيذ بعض الوظائف الإضافية:

- تعامل مع القيم التي ليست `uint256`. على سبيل المثال، السلاسل النصية.
- بدلاً من ذاكرة التخزين المؤقت العالمية، ربما يكون لديك ربط بين المستخدمين وذاكرة التخزين المؤقت. يستخدم المستخدمون المختلفون قيماً مختلفة.
- القيم المستخدمة للعناوين تختلف عن تلك المستخدمة لأغراض أخرى. قد يكون من المنطقي وجود ذاكرة تخزين مؤقت منفصلة للعناوين فقط.
- حاليًا، مفاتيح ذاكرة التخزين المؤقت موجودة على خوارزمية "من يأتي أولاً، يحصل على أصغر مفتاح". يمكن إرسال القيم الست عشرة الأولى كبايت واحد. يمكن إرسال القيم الـ 4080 التالية كبايتين. القيم المليونية التالية تقريبًا هي ثلاثة بايتات، إلخ. يجب أن يحتفظ نظام الإنتاج بعدادات الاستخدام على إدخالات ذاكرة التخزين المؤقت ويعيد تنظيمها بحيث تكون القيم الست عشرة _الأكثر شيوعًا_ بايتًا واحدًا، والقيم الـ 4080 الأكثر شيوعًا التالية بايتين، إلخ.

  ومع ذلك، فهذه عملية خطيرة محتملة. تخيل تسلسل الأحداث التالي:

  1. يستدعي نعيم الساذج `encodeVal` لترميز العنوان الذي يريد إرسال الرموز إليه. هذا العنوان هو أحد العناوين الأولى المستخدمة في التطبيق، لذا فإن القيمة المشفرة هي 0x06. هذه دالة `view`، وليست معاملة، لذا فهي بين نعيم والعقدة التي يستخدمها، ولا أحد آخر يعرف عنها

  2. يقوم المالك أوين بتشغيل عملية إعادة ترتيب ذاكرة التخزين المؤقت. يستخدم عدد قليل جدًا من الأشخاص هذا العنوان، لذلك يتم ترميزه الآن كـ 0x201122. يتم تعيين قيمة مختلفة، 10<sup>18</sup>، إلى 0x06.

  3. يرسل نعيم الساذج رموزه إلى 0x06. تذهب إلى العنوان `0x0000000000000000000000000de0b6b3a7640000`، وبما أنه لا أحد يعرف المفتاح الخاص لهذا العنوان، فهي عالقة هناك. نعيم _ليس سعيدًا_.

  هناك طرق لحل هذه المشكلة، والمشكلة ذات الصلة بالمعاملات الموجودة في المحطة المؤقتة أثناء إعادة ترتيب ذاكرة التخزين المؤقت، ولكن يجب أن تكون على دراية بها.

لقد أوضحت التخزين المؤقت هنا مع Optimism، لأنني موظف في Optimism وهذا هو الرول أب الذي أعرفه أفضل. ولكن يجب أن يعمل مع أي رول أب يفرض تكلفة دنيا للمعالجة الداخلية، بحيث يكون كتابة بيانات المعاملة إلى L1 هو المصروف الرئيسي بالمقارنة.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).

