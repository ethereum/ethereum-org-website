---
title: "تشريح العقود الذكية"
description: "نظرة متعمقة على تشريح جهة الاتصال الذكية - الوظائف والبيانات والمتغيرات."
lang: ar
---

العقد الذكي هو برنامج يتم تشغيله على عنوان على Ethereum. إنها تتكون من البيانات والوظائف التي يمكن تنفيذها عند تلقي المعاملة. فيما يلي نظرة عامة على العناصر التي يشكلها العقد الذكي.

## المتطلبات الأساسية {#prerequisites}

تأكد من أنك قرأت عن [العقود الذكية](/developers/docs/smart-contracts/) أولاً. يفترض هذا المستند أنك على دراية بلغات البرمجة مثل JavaScript أو Python.

## البيانات {#data}

يجب تعيين أي بيانات عقد إلى موقع: إما إلى `storage` أو `memory`. يعد تعديل مساحة التخزين في العقد الذكي أمرًا مكلفًا، لذا يتعين عليك التفكير في المكان الذي يجب أن تعيش فيه بياناتك.

### التخزين {#storage}

يشار إلى البيانات الدائمة بالتخزين ويتم تمثيلها بمتغيرات الحالة. يتم تخزين هذه القيم بشكل دائم على blockchain. يتعين عليك الإعلان عن النوع حتى يتمكن العقد من تتبع مقدار التخزين الذي تحتاجه على blockchain عند تجميعه.

```solidity
// مثال سوليديتي
contract SimpleStorage {
    uint storedData; // متغير الحالة
    // ...
}
```

```python
# مثال Vyper
storedData: int128
```

إذا كنت قد قمت بالفعل ببرمجة لغات موجهة للكائنات، فمن المحتمل أن تكون على دراية بمعظم الأنواع. ومع ذلك، يجب أن يكون `address` جديدًا عليك إذا كنت جديدًا في تطوير إيثريوم.

يمكن لنوع `address` أن يحمل عنوان إيثريوم الذي يعادل 20 بايت أو 160 بت. يتم إرجاعه بالتدوين الست عشري مع 0x بادئة.

تشمل الأنواع الأخرى ما يلي:

- منطقية
- عدد صحيح
- أرقام النقطة الثابتة
- صفائف بايت ذات حجم ثابت
- مصفوفات البايت ذات الحجم الديناميكي
- القيم الحرفية النسبية والصحيحة
- القيم الحرفية النصية
- القيم الحرفية الست عشرية
- التعدادات

لمزيد من التوضيح، نلقي نظرة على المستندات:

- [اطلع على أنواع Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [اطلع على أنواع سوليديتي](https://docs.soliditylang.org/en/latest/types.html#value-types)

### الذاكرة {#memory}

تسمى القيم التي يتم تخزينها فقط طوال مدة تنفيذ وظيفة العقد بمتغيرات الذاكرة. وبما أنه لا يتم تخزينها بشكل دائم على blockchain، فهي أرخص بكثير في الاستخدام.

تعرف على المزيد حول كيفية تخزين EVM للبيانات (التخزين، والذاكرة، والمكدس) في [وثائق سوليديتي](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### متغيرات البيئة {#environment-variables}

بالإضافة إلى المتغيرات التي تحددها في العقد الخاص بك، هناك بعض المتغيرات العالمية الخاصة. يتم استخدامها بشكل أساسي لتوفير معلومات حول blockchain أو المعاملة الحالية.

أمثلة:

| **الخاصية**       | **متغيرات الحالة** | **الوصف**                                          |
| ----------------- | ------------------ | -------------------------------------------------- |
| `block.timestamp` | الوحدة 256         | الطابع الزمني لعصر الكتلة الحالي                   |
| `msg.sender`      | العنوان            | مرسل الرسالة (المكالمة الحالية) |

## الدوال {#functions}

بعبارات أبسط، يمكن للوظائف الحصول على معلومات أو تعيين معلومات استجابةً للمعاملات الواردة.

هناك نوعان من استدعاءات الوظائف:

- `internal` – هذه لا تنشئ استدعاءً لـ EVM
  - لا يمكن الوصول إلى الدوال الداخلية ومتغيرات الحالة إلا داخليًا (أي من داخل العقد الحالي أو العقود المشتقة منه)
- `external` – هذه تنشئ استدعاءً لـ EVM
  - تعد الوظائف الخارجية جزءًا من واجهة العقد، مما يعني أنه يمكن استدعاؤها من عقود أخرى وعبر المعاملات. لا يمكن استدعاء دالة خارجية `f` داخليًا (أي أن `f()` لا تعمل، لكن `this.f()` تعمل).

يمكن أيضًا أن تكون `public` أو `private`

- يمكن استدعاء دوال `public` داخليًا من داخل العقد أو خارجيًا عبر الرسائل
- دوال `private` مرئية فقط للعقد الذي عُرِّفت فيه وليس في العقود المشتقة

يمكن جعل كل من الوظائف ومتغيرات الحالة عامة أو خاصة

فيما يلي وظيفة لتحديث متغير الحالة في العقد:

```solidity
// مثال سوليديتي
function update_name(string value) public {
    dapp_name = value;
}
```

- المعلمة `value` من النوع `string` تُمرر إلى الدالة: `update_name`
- تم إعلانها `public`، مما يعني أن أي شخص يمكنه الوصول إليها
- لم يتم إعلانها `view`، لذا يمكنها تعديل حالة العقد

### دوال العرض {#view-functions}

تعد هذه الوظائف بعدم تعديل حالة بيانات العقد. الأمثلة الشائعة هي وظائف "الحصول على" - يمكنك استخدام هذا لتلقي رصيد المستخدم على سبيل المثال.

```solidity
// مثال سوليديتي
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

ما يعتبر تعديل الحالة:

1. الكتابة لمتغيرات الحالة
2. [إصدار الأحداث](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [إنشاء عقود أخرى](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. استخدام `selfdestruct`.
5. إرسال الأثير عن طريق المكالمات.
6. استدعاء أي دالة غير معلمة كـ `view` أو `pure`.
7. استخدام المكالمات ذات المستوى المنخفض.
8. استخدام التجميع المضمن الذي يحتوي على رمز تشغيل معينة.

### دوال المُنشِئ {#constructor-functions}

دوال `constructor` تُنفذ مرة واحدة فقط عند نشر العقد لأول مرة. مثل `constructor` في العديد من لغات البرمجة القائمة على الأصناف، غالبًا ما تُهيئ هذه الدوال متغيرات الحالة إلى قيمها المحددة.

```solidity
// مثال سوليديتي
// يهيئ بيانات العقد، ويضبط `owner`
// على عنوان مُنشئ العقد.
constructor() public {
    // تعتمد جميع العقود الذكية على المعاملات الخارجية لتشغيل دوالها.
    // `msg` هو متغير عالمي يتضمن البيانات ذات الصلة بالمعاملة المحددة،
    // مثل عنوان المرسل وقيمة ETH المضمنة في المعاملة.
    // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# مثال Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### الدوال المدمجة {#built-in-functions}

بالإضافة إلى المتغيرات والوظائف التي تحددها في عقدك، هناك بعض الوظائف الخاصة المضمنة. الأمثلة الأكثر وضوحا هي :

- `address.send()` – سوليديتي
- `send(address)` – Vyper

تسمح هذه العقود بإرسال ETH إلى حسابات أخرى.

## كتابة الدوال {#writing-functions}

تحتاج وظيفتك إلى:

- متغير المعلمة ونوعها (إذا كان يقبل المعلمات)
- إعلان داخلي/خارجي
- إعلان نقي / عرض / مستحق الدفع
- نوع الإرجاع (إذا كان يُرجع قيمة)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // متغير الحالة

    // تُستدعى عند نشر العقد وتهيئ القيمة
    constructor() public {
        dapp_name = "تطبيقي اللامركزي المثالي";
    }

    // دالة الجلب
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // دالة الضبط
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

قد يبدو العقد الكامل شيئًا كهذا. هنا، توفر دالة `constructor` قيمة أولية للمتغير `dapp_name`.

## الأحداث والسجلات {#events-and-logs}

تتيح الأحداث لعقدك الذكي التواصل مع الواجهة الأمامية أو تطبيقات الاشتراك الأخرى. بمجرد التحقق من صحة المعاملة وإضافتها إلى الكتلة، يمكن للعقود الذكية إصدار أحداث وتسجيل المعلومات، والتي يمكن للواجهة الأمامية بعد ذلك معالجتها واستخدامها.

## أمثلة مشروحة {#annotated-examples}

هذه بعض الأمثلة الصلبة المكتوبة . إذا كنت ترغب في تجربة النص البرمجي، يمكنك التفاعل معه في [Remix](http://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// يحدد إصدار سوليديتي، باستخدام الإصدار الدلالي.
// اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// يُعرِّف عقدًا باسم `HelloWorld`.
// العقد هو مجموعة من الدوال والبيانات (حالته).
// بمجرد نشره، يقيم العقد على عنوان محدد على بلوكتشين إيثريوم.
// اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // يُعلن عن متغير حالة `message` من النوع `string`.
    // متغيرات الحالة هي متغيرات تُخزن قيمها بشكل دائم في مساحة تخزين العقد.
    // الكلمة المفتاحية `public` تجعل المتغيرات قابلة للوصول من خارج العقد
    // وتنشئ دالة يمكن للعقود الأخرى أو العملاء استدعاؤها للوصول إلى القيمة.
    string public message;

    // على غرار العديد من لغات البرمجة الشيئية القائمة على الأصناف، المُنشئ هو
    // دالة خاصة لا تُنفذ إلا عند إنشاء العقد.
    // تُستخدم المُنشِئات لتهيئة بيانات العقد.
    // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // يقبل وسيط سلسلة نصية `initMessage` ويضبط القيمة
        // في متغير التخزين `message` الخاص بالعقد).
        message = initMessage;
    }

    // دالة عامة تقبل وسيط سلسلة نصية
    // وتُحدِّث متغير التخزين `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### الرمز {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // يشبه `address` عنوان البريد الإلكتروني - يُستخدم لتعريف حساب على إيثريوم.
    // يمكن أن تمثل العناوين عقدًا ذكيًا أو حسابات خارجية (للمستخدمين).
    // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` هو في الأساس بنية بيانات جدول التجزئة (هاش).
    // يقوم هذا الـ `mapping` بتعيين عدد صحيح غير مُشار إليه (رصيد الرمز) إلى عنوان (حامل الرمز).
    // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // تسمح الأحداث بتسجيل النشاط على البلوكتشين.
    // يمكن لعملاء إيثريوم الاستماع إلى الأحداث من أجل التفاعل مع تغييرات حالة العقد.
    // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // يهيئ بيانات العقد، ويضبط `owner`
    // على عنوان مُنشئ العقد.
    constructor() public {
        // تعتمد جميع العقود الذكية على المعاملات الخارجية لتشغيل دوالها.
        // `msg` هو متغير عالمي يتضمن البيانات ذات الصلة بالمعاملة المحددة،
        // مثل عنوان المرسل وقيمة ETH المضمنة في المعاملة.
        // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // ينشئ كمية من الرموز الجديدة ويرسلها إلى عنوان.
    function mint(address receiver, uint amount) public {
        // `require` هي بنية تحكم تستخدم لفرض شروط معينة.
        // إذا تم تقييم عبارة `require` إلى `false`، يتم إطلاق استثناء،
        // والذي يعكس جميع التغييرات التي تم إجراؤها على الحالة أثناء الاستدعاء الحالي.
        // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // يمكن لمالك العقد فقط استدعاء هذه الدالة
        require(msg.sender == owner, "أنت لست المالك.");

        // يفرض حدًا أقصى لكمية الرموز
        require(amount < 1e60, "تم تجاوز الحد الأقصى للإصدار");

        // يزيد رصيد `receiver` بمقدار `amount`
        balances[receiver] += amount;
    }

    // يرسل كمية من الرموز الموجودة من أي مستدعٍ إلى عنوان.
    function transfer(address receiver, uint amount) public {
        // يجب أن يكون لدى المرسل ما يكفي من الرموز لإرسالها
        require(amount <= balances[msg.sender], "رصيد غير كافٍ.");

        // يعدل أرصدة الرموز للعنوانين
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // يُصدر الحدث المحدد سابقًا
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### أصل رقمي فريد {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// يستورد الرموز من ملفات أخرى إلى العقد الحالي.
// في هذه الحالة، سلسلة من العقود المساعدة من OpenZeppelin.
// اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// تُستخدم الكلمة المفتاحية `is` لوراثة الدوال والكلمات المفتاحية من العقود الخارجية.
// في هذه الحالة، يرث `CryptoPizza` من عقود `IERC721` و `ERC165`.
// اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // يستخدم مكتبة SafeMath من OpenZeppelin لإجراء العمليات الحسابية بأمان.
    // اعرف المزيد: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // متغيرات الحالة الثابتة في سوليديتي تشبه اللغات الأخرى
    // ولكن يجب عليك التعيين من تعبير ثابت في وقت الترجمة.
    // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // تتيح لك أنواع Struct تحديد النوع الخاص بك
    // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // ينشئ مصفوفة فارغة من هياكل Pizza
    Pizza[] public pizzas;

    // ربط من معرف البيتزا إلى عنوان مالكها
    mapping(uint256 => address) public pizzaToOwner;

    // ربط من عنوان المالك إلى عدد الرموز المملوكة
    mapping(address => uint256) public ownerPizzaCount;

    // ربط من معرف الرمز إلى العنوان المعتمد
    mapping(uint256 => address) pizzaApprovals;

    // يمكنك تداخل عمليات الربط، هذا المثال يربط المالك بموافقات المشغل
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // دالة داخلية لإنشاء بيتزا عشوائية من سلسلة نصية (الاسم) والحمض النووي (DNA)
    function _createPizza(string memory _name, uint256 _dna)
        // الكلمة المفتاحية `internal` تعني أن هذه الدالة مرئية فقط
        // داخل هذا العقد والعقود التي تشتق من هذا العقد
        // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` هو مُعدِّل دالة يتحقق مما إذا كانت البيتزا موجودة بالفعل
        // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // يضيف البيتزا إلى مصفوفة البيتزا ويحصل على المعرف
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // يتحقق من أن مالك البيتزا هو نفس المستخدم الحالي
        // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // لاحظ أن address(0) هو العنوان الصفري،
        // مما يشير إلى أن pizza[id] لم يتم تخصيصها بعد لمستخدم معين.

        assert(pizzaToOwner[id] == address(0));

        // يربط البيتزا بالمالك
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // ينشئ بيتزا عشوائية من سلسلة نصية (الاسم)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // يولد حمضًا نوويًا عشوائيًا (DNA) من سلسلة نصية (الاسم) وعنوان المالك (المنشئ)
    function generateRandomDna(string memory _str, address _owner)
        public
        // الدوال المعلمة بأنها `pure` تعد بعدم القراءة من الحالة أو تعديلها
        // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // يولد عددًا صحيحًا عشوائيًا غير مُشار إليه من سلسلة نصية (الاسم) + عنوان (المالك)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // يعيد مصفوفة من البيتزا التي تم العثور عليها حسب المالك
    function getPizzasByOwner(address _owner)
        public
        // الدوال المعلمة بأنها `view` تعد بعدم تعديل الحالة
        // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // يستخدم موقع التخزين `memory` لتخزين القيم فقط لـ
        // دورة حياة استدعاء هذه الدالة.
        // اعرف المزيد: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // ينقل البيتزا والملكية إلى عنوان آخر
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "عنوان غير صالح.");
        require(_exists(_pizzaId), "البيتزا غير موجودة.");
        require(_from != _to, "لا يمكن النقل إلى نفس العنوان.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "العنوان غير معتمد.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // يُصدر الحدث المحدد في عقد IERC721 المستورد
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * ينقل بأمان ملكية معرف رمز معين إلى عنوان آخر
     * إذا كان العنوان المستهدف عقدًا، فيجب عليه تنفيذ `onERC721Received`،
     * والذي يتم استدعاؤه عند النقل الآمن، وإرجاع القيمة السحرية
     * `bytes4(keccak256(\"onERC721Received(address,address,uint256,bytes)\"))`؛
     * وإلا، يتم التراجع عن النقل.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * ينقل بأمان ملكية معرف رمز معين إلى عنوان آخر
     * إذا كان العنوان المستهدف عقدًا، فيجب عليه تنفيذ `onERC721Received`،
     * والذي يتم استدعاؤه عند النقل الآمن، وإرجاع القيمة السحرية
     * `bytes4(keccak256(\"onERC721Received(address,address,uint256,bytes)\"))`؛
     * وإلا، يتم التراجع عن النقل.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "يجب تنفيذ onERC721Received.");
    }

    /**
     * دالة داخلية لاستدعاء `onERC721Received` على عنوان مستهدف
     * لا يتم تنفيذ الاستدعاء إذا لم يكن العنوان المستهدف عقدًا
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // حرق بيتزا - يدمر الرمز بالكامل
    // مُعدِّل الدالة `external` يعني أن هذه الدالة
    // جزء من واجهة العقد ويمكن للعقود الأخرى استدعاؤها
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "عنوان غير صالح.");
        require(_exists(_pizzaId), "البيتزا غير موجودة.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "العنوان غير معتمد.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // يعيد عدد البيتزا حسب العنوان
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // يعيد مالك البيتزا الذي تم العثور عليه بالمعرف
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "معرف بيتزا غير صالح.");
        return owner;
    }

    // يوافق لعنوان آخر على نقل ملكية البيتزا
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "يجب أن يكون مالك البيتزا.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // يعيد العنوان المعتمد لبيتزا معينة
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "البيتزا غير موجودة.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * دالة خاصة لمسح الموافقة الحالية لمعرف رمز معين
     * يتم التراجع إذا لم يكن العنوان المحدد هو مالك الرمز بالفعل
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "يجب أن يكون مالك البيتزا.");
        require(_exists(_pizzaId), "البيتزا غير موجودة.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * يضبط أو يلغي ضبط موافقة مشغل معين
     * يُسمح للمشغل بنقل جميع رموز المرسل نيابة عنهم
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "لا يمكن الموافقة على العنوان الخاص بك");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // يوضح ما إذا كان المشغل معتمدًا من قبل مالك معين
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // يستحوذ على ملكية البيتزا - للمستخدمين المعتمدين فقط
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "العنوان غير معتمد.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // يتحقق مما إذا كانت البيتزا موجودة
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // يتحقق مما إذا كان العنوان مالكًا أو معتمدًا لنقل البيتزا
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // تحقق مما إذا كانت البيتزا فريدة وغير موجودة بعد
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "توجد بالفعل بيتزا بهذا الاسم.");
        _;
    }

    // يُرجع ما إذا كان العنوان المستهدف عقدًا
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // حاليًا لا توجد طريقة أفضل للتحقق مما إذا كان هناك عقد في عنوان ما
        // من التحقق من حجم النص البرمجي في ذلك العنوان.
        // انظر https://ethereum.stackexchange.com/a/14016/36603
        // لمزيد من التفاصيل حول كيفية عمل هذا.
        // TODO تحقق من هذا مرة أخرى قبل إصدار Serenity، لأن جميع العناوين ستكون
        // عقودًا في ذلك الحين.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## قراءة إضافية{#further-reading}

تحقق من وثائق Solidity وVyper للحصول على نظرة عامة أكثر شمولاً حول العقود الذكية:

- [سوليديتي](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## المواضيع ذات الصلة {#related-topics}

- [العقود الذكية](/developers/docs/smart-contracts/)
- [آلة إيثريوم الافتراضية](/developers/docs/evm/)

## دروس تعليمية ذات صلة {#related-tutorials}

- [تقليص حجم العقود لمواجهة حد حجم العقد](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- بعض النصائح العملية لتقليل حجم عقدك الذكي._
- [تسجيل البيانات من العقود الذكية باستخدام الأحداث](/developers/tutorials/logging-events-smart-contracts/) _- مقدمة إلى أحداث العقود الذكية وكيفية استخدامها لتسجيل البيانات._
- [التفاعل مع العقود الأخرى من سوليديتي](/developers/tutorials/interact-with-other-contracts-from-solidity/) _- كيفية نشر عقد ذكي من عقد موجود والتفاعل معه._
