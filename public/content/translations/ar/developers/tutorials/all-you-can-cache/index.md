---
title: "كل ما يمكنك تخزينه مؤقتًا"
description: "تعلم كيفية إنشاء واستخدام عقد تخزين مؤقت لمعاملات تجميعات أرخص"
author: أوري بوميرانتس
tags:
  - الطبقة 2
  - التخزين المؤقت
  - التخزين
  - التوسع
skill: intermediate
breadcrumb: "التخزين المؤقت للتجميعات"
published: 2022-09-15
lang: ar
---

عند استخدام التجميعات (rollups)، تكون تكلفة البايت في المعاملة أغلى بكثير من تكلفة خانة التخزين. لذلك، من المنطقي تخزين أكبر قدر ممكن من المعلومات مؤقتًا على السلسلة.

في هذه المقالة، ستتعلم كيفية إنشاء واستخدام عقد تخزين مؤقت بطريقة تضمن تخزين أي قيمة معلمة (parameter) يُحتمل استخدامها عدة مرات مؤقتًا لتكون متاحة للاستخدام (بعد المرة الأولى) بعدد أقل بكثير من البايتات، وكيفية كتابة كود خارج السلسلة يستخدم هذا التخزين المؤقت.

إذا كنت ترغب في تخطي المقالة والاطلاع على الكود المصدري فقط، [فهو موجود هنا](https://github.com/qbzzt/20220915-all-you-can-cache). حزمة التطوير المستخدمة هي [Foundry](https://getfoundry.sh/introduction/installation/).

## التصميم العام {#overall-design}

من أجل التبسيط، سنفترض أن جميع معلمات المعاملة هي `uint256`، بطول <span dir="ltr">32 bytes</span>. عندما نتلقى معاملة، سنقوم بتحليل كل معلمة على النحو التالي:

1. إذا كان البايت الأول هو `0xFF`، خذ الـ <span dir="ltr">32 bytes</span> التالية كقيمة معلمة واكتبها في التخزين المؤقت.

2. إذا كان البايت الأول هو `0xFE`، خذ الـ <span dir="ltr">32 bytes</span> التالية كقيمة معلمة ولكن _لا_ تكتبها في التخزين المؤقت.

3. لأي قيمة أخرى، خذ البتات الأربعة العليا كعدد البايتات الإضافية، والبتات الأربعة السفلى كالبتات الأكثر أهمية لمفتاح التخزين المؤقت. إليك بعض الأمثلة:

   | البايتات في بيانات الاستدعاء | مفتاح التخزين المؤقت |
   | :---------------- | --------: |
   | <span dir="ltr">0x0F</span> | <span dir="ltr">0x0F</span> |
   | <span dir="ltr">0x10,0x10</span> | <span dir="ltr">0x10</span> |
   | <span dir="ltr">0x12,0xAC</span> | <span dir="ltr">0x02AC</span> |
   | <span dir="ltr">0x2D,0xEA, 0xD6</span> | <span dir="ltr">0x0DEAD6</span> |

## معالجة التخزين المؤقت {#cache-manipulation}

يتم تنفيذ التخزين المؤقت في [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). دعونا نراجعه سطرًا بسطر.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

تُستخدم هذه الثوابت لتفسير الحالات الخاصة التي نقدم فيها جميع المعلومات ونريد إما كتابتها في التخزين المؤقت أو لا. تتطلب الكتابة في التخزين المؤقت عمليتي [`SSTORE`](https://www.evm.codes/#55) في خانات تخزين غير مستخدمة مسبقًا بتكلفة <span dir="ltr">22,100</span> غاز لكل منها، لذلك نجعلها اختيارية.

```solidity

    mapping(uint => uint) public val2key;
```

تعيين ([mapping](https://www.geeksforgeeks.org/solidity/solidity-mappings/)) بين القيم ومفاتيحها. هذه المعلومات ضرورية لتشفير القيم قبل إرسال المعاملة.

```solidity
    // يحتوي الموقع n على القيمة الخاصة بالمفتاح n+1، لأننا بحاجة إلى الحفاظ على
    // الصفر كـ "غير موجود في ذاكرة التخزين المؤقت".
    uint[] public key2val;
```

يمكننا استخدام مصفوفة للتعيين من المفاتيح إلى القيم لأننا نقوم بتعيين المفاتيح، وللتبسيط نقوم بذلك بشكل تسلسلي.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

قراءة قيمة من التخزين المؤقت.

```solidity
    // كتابة قيمة في ذاكرة التخزين المؤقت إذا لم تكن موجودة بالفعل
    // عامة (public) فقط لتمكين الاختبار من العمل
    function cacheWrite(uint _value) public returns (uint) {
        // إذا كانت القيمة موجودة بالفعل في ذاكرة التخزين المؤقت، أرجع المفتاح الحالي
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

لا جدوى من وضع نفس القيمة في التخزين المؤقت أكثر من مرة. إذا كانت القيمة موجودة بالفعل، فما عليك سوى إرجاع المفتاح الحالي.

```solidity
        // بما أن 0xFE هي حالة خاصة، فإن أكبر مفتاح يمكن لذاكرة التخزين المؤقت
        // الاحتفاظ به هو 0x0D متبوعًا بـ 15 من 0xFF. إذا كان طول ذاكرة التخزين المؤقت بهذا الحجم بالفعل،
        // فستفشل.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

لا أعتقد أننا سنحصل أبدًا على تخزين مؤقت بهذا الحجم (حوالي <span dir="ltr">1.8\*10<sup>37</sup></span> إدخال، مما سيتطلب حوالي <span dir="ltr">10<sup>27</sup> TB</span> لتخزينه). ومع ذلك، أنا كبير بما يكفي لأتذكر مقولة ["<span dir="ltr">640kB</span> ستكون دائمًا كافية"](https://quoteinvestigator.com/2011/09/08/640k-enough/). هذا الاختبار رخيص جدًا.

```solidity
        // كتابة القيمة باستخدام المفتاح التالي
        val2key[_value] = key2val.length+1;
```

إضافة البحث العكسي (من القيمة إلى المفتاح).

```solidity
        key2val.push(_value);
```

إضافة البحث الأمامي (من المفتاح إلى القيمة). نظرًا لأننا نُعين القيم بشكل تسلسلي، يمكننا ببساطة إضافتها بعد آخر قيمة في المصفوفة.

```solidity
        return key2val.length;
    }  // cacheWrite
```

إرجاع الطول الجديد لـ `key2val`، وهي الخلية التي يتم فيها تخزين القيمة الجديدة.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

تقرأ هذه الدالة قيمة من بيانات الاستدعاء بطول عشوائي (يصل إلى <span dir="ltr">32 bytes</span>، وهو حجم الكلمة).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

هذه الدالة داخلية، لذا إذا تمت كتابة بقية الكود بشكل صحيح، فلن تكون هذه الاختبارات مطلوبة. ومع ذلك، فهي لا تكلف الكثير لذا من الأفضل الاحتفاظ بها.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

هذا الكود مكتوب بلغة [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). يقرأ قيمة بحجم <span dir="ltr">32 bytes</span> من بيانات الاستدعاء. يعمل هذا حتى إذا توقفت بيانات الاستدعاء قبل `startByte+32` لأن المساحة غير المهيأة في جهاز الإيثيريوم الظاهري (EVM) تُعتبر صفرًا.

```solidity
        _retVal = _retVal >> (256-length*8);
```

لا نريد بالضرورة قيمة بحجم <span dir="ltr">32 bytes</span>. هذا يتخلص من البايتات الزائدة.

```solidity
        return _retVal;
    } // _calldataVal


    // قراءة معلمة واحدة من بيانات الاستدعاء، بدءًا من _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

قراءة معلمة واحدة من بيانات الاستدعاء. لاحظ أننا بحاجة إلى إرجاع ليس فقط القيمة التي قرأناها، ولكن أيضًا موقع البايت التالي لأن المعلمات يمكن أن تتراوح من بايت واحد إلى <span dir="ltr">33 bytes</span>.

```solidity
        // يخبرنا البايت الأول بكيفية تفسير الباقي
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

تحاول لغة Solidity تقليل عدد الأخطاء البرمجية عن طريق حظر [تحويلات الأنواع الضمنية](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) التي قد تكون خطيرة. يجب أن يكون التخفيض، على سبيل المثال من <span dir="ltr">256 bits</span> إلى <span dir="ltr">8 bits</span>، صريحًا.

```solidity

        // قراءة القيمة، ولكن لا تكتبها في ذاكرة التخزين المؤقت
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // قراءة القيمة، وكتابتها في ذاكرة التخزين المؤقت
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // إذا وصلنا إلى هنا، فهذا يعني أننا بحاجة إلى القراءة من ذاكرة التخزين المؤقت

        // عدد البايتات الإضافية للقراءة
        uint8 _extraBytes = _firstByte / 16;
```

خذ [نصف البايت (nibble)](https://en.wikipedia.org/wiki/Nibble) السفلي وادمجه مع البايتات الأخرى لقراءة القيمة من التخزين المؤقت.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // قراءة n من المعلمات (تعرف الدوال عدد المعلمات التي تتوقعها)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

يمكننا الحصول على عدد المعلمات التي لدينا من بيانات الاستدعاء نفسها، لكن الدوال التي تستدعينا تعرف عدد المعلمات التي تتوقعها. من الأسهل السماح لهم بإخبارنا.

```solidity
        // المعلمات التي نقرأها
        uint[] memory params = new uint[](_paramNum);

        // تبدأ المعلمات عند البايت 4، وقبل ذلك يوجد توقيع الدالة
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

اقرأ المعلمات حتى تحصل على العدد الذي تحتاجه. إذا تجاوزنا نهاية بيانات الاستدعاء، فإن `_readParams` سيؤدي إلى تراجع الاستدعاء.

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

إحدى المزايا الكبيرة لـ Foundry هي أنها تسمح بكتابة الاختبارات بلغة Solidity ([انظر اختبار التخزين المؤقت أدناه](#testing-the-cache)). هذا يجعل اختبارات الوحدة أسهل بكثير. هذه دالة تقرأ أربع معلمات وترجعها حتى يتمكن الاختبار من التحقق من صحتها.

```solidity
    // الحصول على قيمة، وإرجاع البايتات التي ستقوم بتشفيرها (باستخدام ذاكرة التخزين المؤقت إن أمكن)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` هي دالة يستدعيها الكود خارج السلسلة للمساعدة في إنشاء بيانات الاستدعاء التي تستخدم التخزين المؤقت. تتلقى قيمة واحدة وترجع البايتات التي تشفرها. هذه الدالة هي `view`، لذا فهي لا تتطلب معاملة وعند استدعائها خارجيًا لا تكلف أي غاز.

```solidity
        uint _key = val2key[_val];

        // القيمة ليست في ذاكرة التخزين المؤقت بعد، أضفها
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

في [جهاز الإيثيريوم الظاهري (EVM)](/developers/docs/evm/)، يُفترض أن جميع مساحات التخزين غير المهيأة هي أصفار. لذلك إذا بحثنا عن مفتاح لقيمة غير موجودة، نحصل على صفر. في هذه الحالة، البايتات التي تشفرها هي `INTO_CACHE` (لذا سيتم تخزينها مؤقتًا في المرة القادمة)، متبوعة بالقيمة الفعلية.

```solidity
        // إذا كان المفتاح <0x10، فأرجعه كبايت واحد
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

البايتات المفردة هي الأسهل. نستخدم ببساطة [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) لتحويل نوع `bytes<n>` إلى مصفوفة بايتات يمكن أن تكون بأي طول. على الرغم من الاسم، فإنها تعمل بشكل جيد عند تزويدها بوسيطة واحدة فقط.

```solidity
        // قيمة من بايتين، مشفرة كـ 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

عندما يكون لدينا مفتاح أقل من <span dir="ltr">16<sup>3</sup></span>، يمكننا التعبير عنه في بايتين. نقوم أولاً بتحويل `_key`، وهي قيمة بحجم <span dir="ltr">256 bit</span>، إلى قيمة بحجم <span dir="ltr">16 bit</span> ونستخدم المعامل المنطقي (OR) لإضافة عدد البايتات الإضافية إلى البايت الأول. ثم نضعها ببساطة في قيمة `bytes2`، والتي يمكن تحويلها إلى `bytes`.

```solidity
        // ربما توجد طريقة ذكية للقيام بالأسطر التالية كحلقة،
        // ولكنها دالة عرض (view) لذا أقوم بالتحسين من أجل وقت المبرمج و
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

يتم التعامل مع القيم الأخرى (<span dir="ltr">3 bytes</span>، <span dir="ltr">4 bytes</span>، إلخ) بنفس الطريقة، فقط بأحجام حقول مختلفة.

```solidity
        // إذا وصلنا إلى هنا، فهناك خطأ ما.
        revert("Error in encodeVal, should not happen");
```

إذا وصلنا إلى هنا، فهذا يعني أننا حصلنا على مفتاح ليس أقل من <span dir="ltr">16\*256<sup>15</sup></span>. لكن `cacheWrite` يحد من المفاتيح بحيث لا يمكننا حتى الوصول إلى <span dir="ltr">14\*256<sup>16</sup></span> (والذي سيكون البايت الأول له هو <span dir="ltr">0xFE</span>، لذا سيبدو مثل `DONT_CACHE`). لكن لا يكلفنا الكثير إضافة اختبار في حال قام مبرمج مستقبلي بإدخال خطأ برمجي.

```solidity
    } // encodeVal

}  // Cache
```

### اختبار التخزين المؤقت {#testing-the-cache}

إحدى مزايا Foundry هي أنها [تتيح لك كتابة الاختبارات بلغة Solidity](https://getfoundry.sh/forge/tests/overview/)، مما يسهل كتابة اختبارات الوحدة. الاختبارات الخاصة بفئة `Cache` موجودة [هنا](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). نظرًا لأن كود الاختبار متكرر، كما تميل الاختبارات أن تكون، تشرح هذه المقالة الأجزاء المثيرة للاهتمام فقط.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// تحتاج إلى تشغيل `forge test -vv` من أجل وحدة التحكم.
import "forge-std/console.sol";
```

هذا مجرد كود نموذجي (boilerplate) ضروري لاستخدام حزمة الاختبار و `console.log`.

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

يتم استدعاء دالة `setUp` قبل كل اختبار. في هذه الحالة، نقوم ببساطة بإنشاء تخزين مؤقت جديد، حتى لا تؤثر اختباراتنا على بعضها البعض.

```solidity
    function testCaching() public {
```

الاختبارات هي دوال تبدأ أسماؤها بـ `test`. تتحقق هذه الدالة من الوظائف الأساسية للتخزين المؤقت، بكتابة القيم وقراءتها مرة أخرى.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

هكذا تقوم بالاختبار الفعلي، باستخدام [دوال `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). في هذه الحالة، نتحقق من أن القيمة التي كتبناها هي التي قرأناها. يمكننا تجاهل نتيجة `cache.cacheWrite` لأننا نعلم أن مفاتيح التخزين المؤقت يتم تعيينها بشكل خطي.

```solidity
        }
    }    // testCaching


    // تخزين نفس القيمة في ذاكرة التخزين المؤقت عدة مرات، والتأكد من أن المفتاح يبقى
    // كما هو
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

أولاً نكتب كل قيمة مرتين في التخزين المؤقت ونتأكد من أن المفاتيح متطابقة (مما يعني أن الكتابة الثانية لم تحدث حقًا).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

نظريًا، قد يكون هناك خطأ برمجي لا يؤثر على عمليات الكتابة المتتالية في التخزين المؤقت. لذا نقوم هنا ببعض عمليات الكتابة غير المتتالية ونرى أن القيم لا تزال غير مُعاد كتابتها.

```solidity
    // قراءة uint من مخزن الذاكرة المؤقت (للتأكد من أننا نسترجع المعلمات
    // التي أرسلناها)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

قراءة كلمة بحجم <span dir="ltr">256 bit</span> من مخزن مؤقت `bytes memory`. تتيح لنا هذه الدالة المساعدة التحقق من أننا نتلقى النتائج الصحيحة عندما نقوم بتشغيل استدعاء دالة يستخدم التخزين المؤقت.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

لا تدعم لغة Yul هياكل البيانات التي تتجاوز `uint256`، لذلك عندما تشير إلى هيكل بيانات أكثر تعقيدًا، مثل المخزن المؤقت للذاكرة `_bytes`، فإنك تحصل على عنوان ذلك الهيكل. تخزن Solidity قيم `bytes memory` ككلمة بحجم <span dir="ltr">32 bytes</span> تحتوي على الطول، متبوعة بالبايتات الفعلية، لذلك للحصول على البايت رقم `_start` نحتاج إلى حساب `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // توقيع الدالة لـ fourParams()، مقدم من
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

لا يمكننا استخدام آلية واجهة التطبيق الثنائية (ABI) العادية لاستدعاء دالة باستخدام التخزين المؤقت، لذلك نحتاج إلى استخدام آلية [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) منخفضة المستوى. تأخذ هذه الآلية `bytes memory` كمدخل، وترجع ذلك (بالإضافة إلى قيمة منطقية) كمخرج.

```solidity
        // الاستدعاء الأول، ذاكرة التخزين المؤقت فارغة
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

من المفيد أن يدعم نفس العقد كلاً من الدوال المخزنة مؤقتًا (للاستدعاءات المباشرة من المعاملات) والدوال غير المخزنة مؤقتًا (للاستدعاءات من العقود الذكية الأخرى). للقيام بذلك، نحتاج إلى الاستمرار في الاعتماد على آلية Solidity لاستدعاء الدالة الصحيحة، بدلاً من وضع كل شيء في [دالة `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). القيام بذلك يجعل قابلية التركيب أسهل بكثير. سيكون بايت واحد كافيًا لتحديد الدالة في معظم الحالات، لذلك نحن نهدر ثلاثة بايتات (<span dir="ltr">16\*3=48</span> غاز). ومع ذلك، أثناء كتابتي لهذا، تكلف هذه الـ <span dir="ltr">48</span> غاز <span dir="ltr">0.07</span> سنت، وهي تكلفة معقولة لكود أبسط وأقل عرضة للأخطاء.

```solidity
            // القيمة الأولى، أضفها إلى ذاكرة التخزين المؤقت
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

القيمة الأولى: علامة (flag) تشير إلى أنها قيمة كاملة يجب كتابتها في التخزين المؤقت، متبوعة بـ <span dir="ltr">32 bytes</span> من القيمة. القيم الثلاث الأخرى مشابهة، باستثناء أن `VAL_B` لا تُكتب في التخزين المؤقت وأن `VAL_C` هي المعلمة الثالثة والرابعة معًا.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

هنا نقوم فعليًا باستدعاء عقد `Cache`.

```solidity
        assertEq(_success, true);
```

نتوقع أن يكون الاستدعاء ناجحًا.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

نبدأ بتخزين مؤقت فارغ ثم نضيف `VAL_A` متبوعًا بـ `VAL_C`. نتوقع أن يكون للأول المفتاح 1، وللثاني المفتاح 2.

```
assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

المخرجات هي المعلمات الأربع. هنا نتحقق من صحتها.

```solidity
        // الاستدعاء الثاني، يمكننا استخدام ذاكرة التخزين المؤقت
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // القيمة الأولى في ذاكرة التخزين المؤقت
            bytes1(0x01),
```

مفاتيح التخزين المؤقت الأقل من 16 هي بايت واحد فقط.

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

الاختبارات بعد الاستدعاء مطابقة لتلك التي بعد الاستدعاء الأول.

```solidity
    function testEncodeVal() public {
```

هذه الدالة مشابهة لـ `testReadParam`، باستثناء أننا بدلاً من كتابة المعلمات صراحةً نستخدم `encodeVal()`.

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

الاختبار الإضافي الوحيد في `testEncodeVal()` هو التحقق من أن طول `_callInput` صحيح. بالنسبة للاستدعاء الأول، يكون <span dir="ltr">4+33\*4</span>. بالنسبة للثاني، حيث تكون كل قيمة موجودة بالفعل في التخزين المؤقت، يكون <span dir="ltr">4+1\*4</span>.

```solidity
    // اختبار encodeVal عندما يكون المفتاح أكثر من بايت واحد
    // الحد الأقصى ثلاثة بايتات لأن ملء ذاكرة التخزين المؤقت إلى أربعة بايتات يستغرق
    // وقتًا طويلاً جدًا.
    function testEncodeValBig() public {
        // وضع عدد من القيم في ذاكرة التخزين المؤقت.
        // لإبقاء الأمور بسيطة، استخدم المفتاح n للقيمة n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

دالة `testEncodeVal` أعلاه تكتب أربع قيم فقط في التخزين المؤقت، لذا فإن [الجزء من الدالة الذي يتعامل مع القيم متعددة البايتات](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) لا يتم التحقق منه. لكن هذا الكود معقد وعرضة للأخطاء.

الجزء الأول من هذه الدالة عبارة عن حلقة (loop) تكتب جميع القيم من 1 إلى <span dir="ltr">0x1FFF</span> في التخزين المؤقت بالترتيب، حتى نتمكن من تشفير تلك القيم ومعرفة إلى أين تتجه.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // بايت واحد        0x0F
            cache.encodeVal(0x0010),   // بايتان     0x1010
            cache.encodeVal(0x0100),   // بايتان     0x1100
            cache.encodeVal(0x1000)    // ثلاثة بايتات 0x201000
        );
```

اختبار قيم البايت الواحد، والبايتين، والثلاثة بايتات. لا نختبر أبعد من ذلك لأنه سيستغرق وقتًا طويلاً لكتابة إدخالات مكدس (stack) كافية (على الأقل <span dir="ltr">0x10000000</span>، أي حوالي ربع مليار).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // اختبار أنه مع مخزن مؤقت صغير جدًا نحصل على تراجع
    function testShortCalldata() public {
```

اختبار ما يحدث في الحالة غير الطبيعية حيث لا يوجد عدد كافٍ من المعلمات.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

نظرًا لأنه يتراجع، فإن النتيجة التي يجب أن نحصل عليها هي `false`.

```
// Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // القيمة الأولى، أضفها إلى ذاكرة التخزين المؤقت
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

تحصل هذه الدالة على أربع معلمات مشروعة تمامًا، باستثناء أن التخزين المؤقت فارغ لذا لا توجد قيم هناك لقراءتها.

```solidity
        .
        .
        .
    // اختبار أنه مع مخزن مؤقت طويل جدًا يعمل كل شيء بشكل جيد
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // الاستدعاء الأول، ذاكرة التخزين المؤقت فارغة
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // القيمة الثانية، أضفها إلى ذاكرة التخزين المؤقت
            cache.INTO_CACHE(), bytes32(VAL_B),

            // القيمة الثالثة، أضفها إلى ذاكرة التخزين المؤقت
            cache.INTO_CACHE(), bytes32(VAL_C),

            // القيمة الرابعة، أضفها إلى ذاكرة التخزين المؤقت
            cache.INTO_CACHE(), bytes32(VAL_D),

            // وقيمة أخرى من أجل "حسن الحظ"
            bytes4(0x31112233)
        );
```

ترسل هذه الدالة خمس قيم. نعلم أن القيمة الخامسة يتم تجاهلها لأنها ليست إدخال تخزين مؤقت صالح، مما كان سيؤدي إلى تراجع لو لم يتم تضمينها.

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

كتابة الاختبارات بلغة Solidity أمر جيد جدًا، ولكن في نهاية المطاف يحتاج التطبيق اللامركزي (dapp) إلى أن يكون قادرًا على معالجة الطلبات من خارج السلسلة ليكون مفيدًا. توضح هذه المقالة كيفية استخدام التخزين المؤقت في تطبيق لامركزي (dapp) باستخدام `WORM`، والذي يرمز إلى "الكتابة مرة واحدة، والقراءة عدة مرات" (Write Once, Read Many). إذا لم يتم كتابة مفتاح بعد، يمكنك كتابة قيمة له. إذا كان المفتاح مكتوبًا بالفعل، فستحصل على تراجع.

### العقد {#the-contract}

[هذا هو العقد](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). يكرر في الغالب ما قمنا به بالفعل مع `Cache` و `CacheTest`، لذا سنغطي فقط الأجزاء المثيرة للاهتمام.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

أسهل طريقة لاستخدام `Cache` هي توريثه في عقدنا الخاص.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

هذه الدالة مشابهة لـ `fourParam` في `CacheTest` أعلاه. نظرًا لأننا لا نتبع مواصفات واجهة التطبيق الثنائية (ABI)، فمن الأفضل عدم التصريح عن أي معلمات في الدالة.

```solidity
    // تسهيل استدعائنا
    // توقيع الدالة لـ writeEntryCached()، مقدم من
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

سيحتاج الكود الخارجي الذي يستدعي `writeEntryCached` إلى بناء بيانات الاستدعاء يدويًا، بدلاً من استخدام `worm.writeEntryCached`، لأننا لا نتبع مواصفات واجهة التطبيق الثنائية (ABI). وجود هذه القيمة الثابتة يجعل كتابتها أسهل.

لاحظ أنه على الرغم من أننا نُعرّف `WRITE_ENTRY_CACHED` كمتغير حالة، لقراءته خارجيًا من الضروري استخدام دالة الجلب (getter) الخاصة به، `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

دالة القراءة هي `view`، لذا فهي لا تتطلب معاملة ولا تكلف غازًا. نتيجة لذلك، لا توجد فائدة من استخدام التخزين المؤقت للمعلمة. مع دوال العرض (view functions)، من الأفضل استخدام الآلية القياسية الأبسط.

### كود الاختبار {#the-testing-code}

[هذا هو كود الاختبار للعقد](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). مرة أخرى، دعونا ننظر فقط إلى ما هو مثير للاهتمام.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[هكذا (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) نحدد في اختبار Foundry أن الاستدعاء التالي يجب أن يفشل، والسبب المُبلغ عنه للفشل. ينطبق هذا عندما نستخدم الصيغة `<contract>.<function name>()` بدلاً من بناء بيانات الاستدعاء واستدعاء العقد باستخدام الواجهة منخفضة المستوى (`<contract>.call()`، إلخ).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

هنا نستخدم حقيقة أن `cacheWrite` يُرجع مفتاح التخزين المؤقت. هذا ليس شيئًا نتوقع استخدامه في الإنتاج، لأن `cacheWrite` يغير الحالة، وبالتالي لا يمكن استدعاؤه إلا أثناء معاملة. المعاملات ليس لها قيم إرجاع، وإذا كانت لها نتائج، فمن المفترض أن يتم إصدار تلك النتائج كأحداث. لذا فإن قيمة إرجاع `cacheWrite` لا يمكن الوصول إليها إلا من الكود على السلسلة، والكود على السلسلة لا يحتاج إلى تخزين المعلمات مؤقتًا.

```solidity
        (_success,) = address(worm).call(_callInput);
```

هكذا نخبر Solidity أنه بينما يحتوي `<contract address>.call()` على قيمتي إرجاع، فإننا نهتم فقط بالأولى.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

نظرًا لأننا نستخدم دالة `<address>.call()` منخفضة المستوى، لا يمكننا استخدام `vm.expectRevert()` وعلينا النظر إلى القيمة المنطقية للنجاح التي نحصل عليها من الاستدعاء.

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

هذه هي الطريقة التي نتحقق بها من أن الكود [يُصدر حدثًا بشكل صحيح](https://getfoundry.sh/reference/cheatcodes/expect-emit/) في Foundry.

### العميل {#the-client}
أحد الأشياء التي لا تحصل عليها مع اختبارات Solidity هو كود JavaScript يمكنك قصه ولصقه في تطبيقك الخاص. لكتابة هذا الكود، قمت بنشر WORM على [أوبتيميزم غويرلي](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)، شبكة اختبار [أوبتيميزم](https://www.optimism.io/) الجديدة. وهو موجود على العنوان [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[يمكنك رؤية كود JavaScript للعميل هنا](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). لاستخدامه:

1. استنسخ مستودع git:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. قم بتثبيت الحزم الضرورية:

   ```sh
   cd javascript
   yarn
   ```

3. انسخ ملف التكوين:

   ```sh
   cp .env.example .env
   ```

4. قم بتحرير `.env` لتكوينك:

   | المعلمة | القيمة |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | <span dir="ltr">MNEMONIC</span> | العبارة التذكيرية (mnemonic) لحساب يحتوي على ما يكفي من ETH لدفع رسوم معاملة. [يمكنك الحصول على ETH مجاني لشبكة أوبتيميزم غويرلي من هنا](https://optimismfaucet.xyz/). |
   | <span dir="ltr">OPTIMISM_GOERLI_URL</span> | عنوان URL لشبكة أوبتيميزم غويرلي. نقطة النهاية العامة، `https://goerli.optimism.io`، محدودة المعدل ولكنها كافية لما نحتاجه هنا |

5. قم بتشغيل `index.js`.

   ```sh
   node index.js
   ```

   يكتب هذا التطبيق النموذجي أولاً إدخالاً في WORM، ويعرض بيانات الاستدعاء ورابطًا للمعاملة على Etherscan. ثم يقرأ هذا الإدخال مرة أخرى، ويعرض المفتاح الذي يستخدمه والقيم الموجودة في الإدخال (القيمة، ورقم الكتلة، والمؤلف).

معظم العميل عبارة عن كود JavaScript عادي لتطبيق لامركزي (dapp). لذا مرة أخرى سنراجع الأجزاء المثيرة للاهتمام فقط.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // نحتاج إلى مفتاح جديد في كل مرة
    const key = await worm.encodeVal(Number(new Date()))
```

لا يمكن الكتابة في خانة معينة إلا مرة واحدة، لذا نستخدم الطابع الزمني للتأكد من أننا لا نعيد استخدام الخانات.

```javascript
const val = await worm.encodeVal("0x600D")

// كتابة إدخال
const calldata = func + key.slice(2) + val.slice(2)
```

تتوقع مكتبة Ethers أن تكون بيانات الاستدعاء سلسلة سداسية عشرية، `0x` متبوعة بعدد زوجي من الأرقام السداسية العشرية. نظرًا لأن كلاً من `key` و `val` يبدآن بـ `0x`، نحتاج إلى إزالة تلك الترويسات.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

كما هو الحال مع كود اختبار Solidity، لا يمكننا استدعاء دالة مخزنة مؤقتًا بشكل طبيعي. بدلاً من ذلك، نحتاج إلى استخدام آلية ذات مستوى أدنى.

```javascript
    .
    .
    .
    // قراءة الإدخال الذي تمت كتابته للتو
    const realKey = '0x' + key.slice(4)  // إزالة علامة FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

لقراءة الإدخالات يمكننا استخدام الآلية العادية. ليست هناك حاجة لاستخدام التخزين المؤقت للمعلمات مع دوال `view`.

## الخاتمة {#conclusion}

الكود في هذه المقالة هو إثبات للمفهوم (proof of concept)، والغرض منه هو جعل الفكرة سهلة الفهم. بالنسبة لنظام جاهز للإنتاج، قد ترغب في تنفيذ بعض الوظائف الإضافية:

- التعامل مع القيم التي ليست `uint256`. على سبيل المثال، السلاسل النصية (strings).
- بدلاً من تخزين مؤقت عالمي، ربما يكون هناك تعيين بين المستخدمين والتخزينات المؤقتة. يستخدم المستخدمون المختلفون قيمًا مختلفة.
- القيم المستخدمة للعناوين متميزة عن تلك المستخدمة لأغراض أخرى. قد يكون من المنطقي وجود تخزين مؤقت منفصل للعناوين فقط.
- حاليًا، تعتمد مفاتيح التخزين المؤقت على خوارزمية "من يأتي أولاً، يحصل على أصغر مفتاح". يمكن إرسال القيم الست عشرة الأولى كبايت واحد. يمكن إرسال القيم الـ 4080 التالية كبايتين. المليون قيمة التالية تقريبًا هي ثلاثة بايتات، إلخ. يجب أن يحتفظ نظام الإنتاج بعدادات استخدام لإدخالات التخزين المؤقت وإعادة تنظيمها بحيث تكون القيم الست عشرة _الأكثر شيوعًا_ بايتًا واحدًا، والقيم الـ 4080 الأكثر شيوعًا التالية بايتين، إلخ.

  ومع ذلك، فهذه عملية قد تكون خطيرة. تخيل تسلسل الأحداث التالي:

  1. يستدعي نعوم الساذج (Noam Naive) `encodeVal` لتشفير العنوان الذي يريد إرسال الرموز إليه. هذا العنوان هو أحد العناوين الأولى المستخدمة في التطبيق، لذا فإن القيمة المشفرة هي <span dir="ltr">0x06</span>. هذه دالة `view`، وليست معاملة، لذا فهي بين نعوم والعقدة التي يستخدمها، ولا أحد غيره يعرف عنها.

  2. يقوم أوين المالك (Owen Owner) بتشغيل عملية إعادة ترتيب التخزين المؤقت. عدد قليل جدًا من الأشخاص يستخدمون هذا العنوان فعليًا، لذا يتم تشفيره الآن كـ <span dir="ltr">0x201122</span>. يتم تعيين قيمة مختلفة، <span dir="ltr">10<sup>18</sup></span>، إلى <span dir="ltr">0x06</span>.

  3. يرسل نعوم الساذج رموزه إلى <span dir="ltr">0x06</span>. تذهب إلى العنوان `0x0000000000000000000000000de0b6b3a7640000`، وبما أنه لا أحد يعرف المفتاح الخاص لهذا العنوان، فإنها تظل عالقة هناك. نعوم _ليس سعيدًا_.

  هناك طرق لحل هذه المشكلة، والمشكلة ذات الصلة بالمعاملات الموجودة في مجمع الذاكرة أثناء إعادة ترتيب التخزين المؤقت، ولكن يجب أن تكون على دراية بها.

لقد أوضحت التخزين المؤقت هنا باستخدام أوبتيميزم، لأنني موظف في أوبتيميزم وهذا هو التجميع (rollup) الذي أعرفه بشكل أفضل. ولكن يجب أن يعمل مع أي تجميع يفرض تكلفة ضئيلة للمعالجة الداخلية، بحيث تكون كتابة بيانات المعاملة إلى طبقة 1 (L1) هي النفقات الرئيسية بالمقارنة.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).