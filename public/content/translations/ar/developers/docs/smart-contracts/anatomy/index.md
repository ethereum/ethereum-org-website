---
title: "تشريح العقود الذكية"
description: "نظرة متعمقة في تشريح العقد الذكي – الدوال والبيانات والمتغيرات."
lang: ar
---

العقد الذكي هو برنامج يعمل على عنوان في إيثيريوم. تتكون من بيانات ودوال يمكن تنفيذها عند تلقي معاملة. إليك نظرة عامة على ما يتكون منه العقد الذكي.

## المتطلبات الأساسية {#prerequisites}

تأكد من قراءة حول [العقود الذكية](/developers/docs/smart-contracts/) أولاً. تفترض هذه الوثيقة أنك على دراية بالفعل بلغات البرمجة مثل JavaScript أو Python.

## البيانات {#data}

يجب تعيين أي بيانات عقد إلى موقع: إما إلى `storage` أو `memory`. من المكلف تعديل التخزين في عقد ذكي، لذا يجب عليك التفكير في المكان الذي يجب أن توجد فيه بياناتك.

### التخزين {#storage}

يُشار إلى البيانات الدائمة باسم التخزين ويتم تمثيلها بواسطة متغيرات الحالة. يتم تخزين هذه القيم بشكل دائم على سلسلة الكتل. تحتاج إلى التصريح عن النوع حتى يتمكن العقد من تتبع مقدار التخزين الذي يحتاجه على سلسلة الكتل عند تجميعه.

```solidity
// مثال Solidity
contract SimpleStorage {
    uint storedData; // متغير حالة
    // ...
}
```

```python
# مثال Vyper
storedData: int128
```

إذا كنت قد برمجت بالفعل بلغات كائنية التوجه، فمن المحتمل أن تكون على دراية بمعظم الأنواع. ومع ذلك، يجب أن يكون `address` جديدًا بالنسبة لك إذا كنت جديدًا في تطوير [إيثيريوم](/).

يمكن أن يحمل النوع `address` عنوان إيثيريوم والذي يعادل <span dir="ltr">20 bytes</span> أو <span dir="ltr">160 bits</span>. يتم إرجاعه بالتدوين السداسي العشري مع بادئة <span dir="ltr">0x</span>.

تشمل الأنواع الأخرى:

- منطقي (boolean)
- عدد صحيح (integer)
- أرقام الفاصلة الثابتة (fixed point numbers)
- مصفوفات بايتات ثابتة الحجم
- مصفوفات بايتات متغيرة الحجم
- القيم الحرفية المنطقية والصحيحة
- القيم الحرفية النصية
- القيم الحرفية السداسية العشرية
- التعدادات (enums)

لمزيد من التوضيح، ألق نظرة على المستندات:

- [انظر أنواع Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [انظر أنواع Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### الذاكرة {#memory}

القيم التي يتم تخزينها فقط طوال فترة تنفيذ دالة العقد تسمى متغيرات الذاكرة. نظرًا لأن هذه لا يتم تخزينها بشكل دائم على سلسلة الكتل، فهي أرخص بكثير في الاستخدام.

تعرف على المزيد حول كيفية تخزين آلة إيثيريوم الافتراضية (EVM) للبيانات (التخزين، الذاكرة، والمكدس) في [مستندات Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### متغيرات البيئة {#environment-variables}

بالإضافة إلى المتغيرات التي تحددها في عقدك، هناك بعض المتغيرات العامة الخاصة. تُستخدم بشكل أساسي لتوفير معلومات حول سلسلة الكتل أو المعاملة الحالية.

أمثلة:

| **الخاصية**          | **متغير الحالة** | **الوصف**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | الطابع الزمني لحقبة الكتلة الحالية        |
| `msg.sender`      | address            | مرسل الرسالة (الاستدعاء الحالي) |

## الدوال {#functions}

بعبارات بسيطة للغاية، يمكن للدوال الحصول على معلومات أو تعيين معلومات استجابة للمعاملات الواردة.

هناك نوعان من استدعاءات الدوال:

- `internal` – هذه لا تنشئ استدعاء لآلة إيثيريوم الافتراضية (EVM)
  - لا يمكن الوصول إلى الدوال الداخلية ومتغيرات الحالة إلا داخليًا (أي من داخل العقد الحالي أو العقود المشتقة منه)
- `external` – هذه تنشئ استدعاء لآلة إيثيريوم الافتراضية (EVM)
  - الدوال الخارجية هي جزء من واجهة العقد، مما يعني أنه يمكن استدعاؤها من عقود أخرى وعبر المعاملات. لا يمكن استدعاء دالة خارجية `f` داخليًا (أي أن `f()` لا يعمل، ولكن `this.f()` يعمل).

يمكن أن تكون أيضًا `public` أو `private`

- يمكن استدعاء دوال `public` داخليًا من داخل العقد أو خارجيًا عبر الرسائل
- دوال `private` مرئية فقط للعقد الذي تم تعريفها فيه وليس في العقود المشتقة

يمكن جعل كل من الدوال ومتغيرات الحالة عامة أو خاصة

إليك دالة لتحديث متغير حالة في عقد:

```solidity
// مثال Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- يتم تمرير المعلمة `value` من النوع `string` إلى الدالة: `update_name`
- تم التصريح عنها كـ `public`، مما يعني أنه يمكن لأي شخص الوصول إليها
- لم يتم التصريح عنها كـ `view`، لذا يمكنها تعديل حالة العقد

### دوال العرض (View functions) {#view-functions}

تتعهد هذه الدوال بعدم تعديل حالة بيانات العقد. الأمثلة الشائعة هي دوال "الجلب" (getter) – يمكنك استخدام هذا لتلقي رصيد المستخدم على سبيل المثال.

```solidity
// مثال Solidity
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

ما يُعتبر تعديلاً للحالة:

1. الكتابة في متغيرات الحالة.
2. [إصدار الأحداث](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [إنشاء عقود أخرى](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. استخدام `selfdestruct`.
5. إرسال الإيثر عبر الاستدعاءات.
6. استدعاء أي دالة غير مميزة بـ `view` أو `pure`.
7. استخدام الاستدعاءات منخفضة المستوى.
8. استخدام لغة التجميع المضمنة (inline assembly) التي تحتوي على أكواد تشغيل (opcodes) معينة.

### دوال المُنشئ {#constructor-functions}

يتم تنفيذ دوال `constructor` مرة واحدة فقط عند نشر العقد لأول مرة. مثل `constructor` في العديد من لغات البرمجة القائمة على الفئات (class-based)، غالبًا ما تقوم هذه الدوال بتهيئة متغيرات الحالة إلى قيمها المحددة.

```solidity
// مثال Solidity
// يهيئ بيانات العقد، ويعين `owner`
// إلى عنوان منشئ العقد.
constructor() public {
    // تعتمد جميع العقود الذكية على معاملات خارجية لتشغيل وظائفها.
    // `msg` هو متغير عام يتضمن بيانات ذات صلة بالمعاملة المحددة،
    // مثل عنوان المرسل وقيمة ETH المضمنة في المعاملة.
    // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
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

بالإضافة إلى المتغيرات والدوال التي تحددها في عقدك، هناك بعض الدوال المدمجة الخاصة. المثال الأكثر وضوحًا هو:

- `address.send()` – Solidity
- `send(address)` – Vyper

تسمح هذه للعقود بإرسال ETH إلى حسابات أخرى.

## كتابة الدوال {#writing-functions}

تحتاج دالتك إلى:

- متغير المعلمة والنوع (إذا كانت تقبل معلمات)
- التصريح بكونها داخلية/خارجية (internal/external)
- التصريح بكونها pure/view/payable
- نوع الإرجاع (إذا كانت تُرجع قيمة)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // متغير حالة

    // يُستدعى عند نشر العقد ويهيئ القيمة
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // دالة الجلب
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // دالة التعيين
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

قد يبدو العقد الكامل شيئًا كهذا. هنا توفر دالة `constructor` قيمة أولية للمتغير `dapp_name`.

## الأحداث والسجلات {#events-and-logs}

تمكّن الأحداث عقدك الذكي من التواصل مع الواجهة الأمامية أو التطبيقات المشتركة الأخرى. بمجرد التحقق من صحة معاملة وإضافتها إلى كتلة، يمكن للعقود الذكية إصدار أحداث وتسجيل المعلومات، والتي يمكن للواجهة الأمامية بعد ذلك معالجتها والاستفادة منها.

## أمثلة مشروحة {#annotated-examples}

هذه بعض الأمثلة المكتوبة بلغة Solidity. إذا كنت ترغب في تجربة الكود، يمكنك التفاعل معها في [Remix](https://remix.ethereum.org).

### مرحبًا بالعالم {#hello-world}

```solidity
// يحدد إصدار Solidity، باستخدام تعيين الإصدارات الدلالي.
// تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// يحدد عقدًا باسم `HelloWorld`.
// العقد هو مجموعة من الدوال والبيانات (حالته).
// بمجرد نشره، يستقر العقد في عنوان محدد على سلسلة الكتل لإيثيريوم.
// تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // يصرح عن متغير حالة `message` من النوع `string`.
    // متغيرات الحالة هي متغيرات تُخزن قيمها بشكل دائم في مساحة تخزين العقد.
    // الكلمة المفتاحية `public` تجعل المتغيرات قابلة للوصول من خارج العقد
    // وتنشئ دالة يمكن للعقود أو العملاء الآخرين استدعاؤها للوصول إلى القيمة.
    string public message;

    // على غرار العديد من اللغات كائنية التوجه القائمة على الفئات، فإن المُنشئ هو
    // دالة خاصة تُنفذ فقط عند إنشاء العقد.
    // تُستخدم المُنشئات لتهيئة بيانات العقد.
    // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // يقبل وسيطة نصية `initMessage` ويعين القيمة
        // في متغير التخزين `message` الخاص بالعقد).
        message = initMessage;
    }

    // دالة عامة تقبل وسيطة نصية
    // وتُحدّث متغير التخزين `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### رمز مميز {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // العنوان مشابه لعنوان البريد الإلكتروني - يُستخدم لتحديد حساب على إيثيريوم.
    // يمكن أن تمثل العناوين عقدًا ذكيًا أو حسابات خارجية (للمستخدمين).
    // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // الـ `mapping` هو في الأساس بنية بيانات جدول تجزئة.
    // يعين هذا الـ `mapping` عددًا صحيحًا بدون إشارة (رصيد الرمز المميز) إلى عنوان (حامل الرمز المميز).
    // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // تسمح الأحداث بتسجيل النشاط على سلسلة الكتل.
    // يمكن لعملاء إيثيريوم الاستماع إلى الأحداث من أجل التفاعل مع تغييرات حالة العقد.
    // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // يهيئ بيانات العقد، ويعين `owner`
    // إلى عنوان منشئ العقد.
    constructor() public {
        // تعتمد جميع العقود الذكية على معاملات خارجية لتشغيل وظائفها.
        // `msg` هو متغير عام يتضمن بيانات ذات صلة بالمعاملة المحددة،
        // مثل عنوان المرسل وقيمة ETH المضمنة في المعاملة.
        // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // ينشئ كمية من الرموز المميزة الجديدة ويرسلها إلى عنوان.
    function mint(address receiver, uint amount) public {
        // `require` هي بنية تحكم تُستخدم لفرض شروط معينة.
        // إذا تم تقييم عبارة `require` إلى `false`، يتم تشغيل استثناء،
        // مما يؤدي إلى التراجع عن جميع التغييرات التي أُجريت على الحالة أثناء الاستدعاء الحالي.
        // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // يمكن لمالك العقد فقط استدعاء هذه الدالة
        require(msg.sender == owner, "You are not the owner.");

        // يفرض حدًا أقصى لعدد الرموز المميزة
        require(amount < 1e60, "Maximum issuance exceeded");

        // يزيد رصيد `receiver` بمقدار `amount`
        balances[receiver] += amount;
    }

    // يرسل كمية من الرموز المميزة الحالية من أي مستدعي إلى عنوان.
    function transfer(address receiver, uint amount) public {
        // يجب أن يمتلك المرسل ما يكفي من الرموز المميزة لإرسالها
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // يضبط أرصدة الرموز المميزة للعنوانين
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // يُصدر الحدث المُعرّف سابقًا
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### أصل رقمي فريد {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// يستورد الرموز من ملفات أخرى إلى العقد الحالي.
// في هذه الحالة، سلسلة من العقود المساعدة من OpenZeppelin.
// تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// تُستخدم الكلمة المفتاحية `is` لوراثة الدوال والكلمات المفتاحية من عقود خارجية.
// في هذه الحالة، يرث `CryptoPizza` من عقدي `IERC721` و `ERC165`.
// تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // يستخدم مكتبة SafeMath الخاصة بـ OpenZeppelin لإجراء العمليات الحسابية بأمان.
    // تعرف على المزيد: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // متغيرات الحالة الثابتة في Solidity مشابهة للغات الأخرى
    // ولكن يجب التعيين من تعبير ثابت في وقت الترجمة.
    // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // تتيح لك أنواع البنيات (Struct) تحديد النوع الخاص بك
    // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // ينشئ مصفوفة فارغة من بنيات Pizza
    Pizza[] public pizzas;

    // تعيين من معرف البيتزا إلى عنوان مالكها
    mapping(uint256 => address) public pizzaToOwner;

    // تعيين من عنوان المالك إلى عدد الرموز المميزة المملوكة
    mapping(address => uint256) public ownerPizzaCount;

    // تعيين من معرف الرمز المميز إلى العنوان المعتمد
    mapping(uint256 => address) pizzaApprovals;

    // يمكنك تداخل التعيينات، يربط هذا المثال المالك بموافقات المشغل
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // دالة داخلية لإنشاء بيتزا عشوائية من سلسلة نصية (الاسم) والحمض النووي (DNA)
    function _createPizza(string memory _name, uint256 _dna)
        // الكلمة المفتاحية `internal` تعني أن هذه الدالة مرئية فقط
        // داخل هذا العقد والعقود المشتقة من هذا العقد
        // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` هو مُعدِّل دالة يتحقق مما إذا كانت البيتزا موجودة بالفعل
        // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // يضيف البيتزا إلى مصفوفة البيتزا ويحصل على المعرف
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // يتحقق من أن مالك البيتزا هو نفس المستخدم الحالي
        // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // لاحظ أن address(0) هو العنوان الصفري،
        // مما يشير إلى أن pizza[id] لم تُخصص بعد لمستخدم معين.

        assert(pizzaToOwner[id] == address(0));

        // يعين البيتزا للمالك
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

    // يُنشئ حمضًا نوويًا (DNA) عشوائيًا من سلسلة نصية (الاسم) وعنوان المالك (المنشئ)
    function generateRandomDna(string memory _str, address _owner)
        public
        // الدوال المحددة كـ `pure` تتعهد بعدم القراءة من الحالة أو تعديلها
        // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // يُنشئ عددًا صحيحًا بدون إشارة (uint) عشوائيًا من سلسلة نصية (الاسم) + العنوان (المالك)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // يُرجع مصفوفة من البيتزا التي عثر عليها المالك
    function getPizzasByOwner(address _owner)
        public
        // الدوال المحددة كـ `view` تتعهد بعدم تعديل الحالة
        // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // يستخدم موقع التخزين `memory` لتخزين القيم فقط طوال
        // دورة حياة استدعاء هذه الدالة.
        // تعرف على المزيد: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // يُصدر الحدث المُعرّف في عقد IERC721 المستورد
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * ينقل ملكية معرف رمز مميز معين بأمان إلى عنوان آخر
     * إذا كان العنوان المستهدف عبارة عن عقد، فيجب أن ينفذ `onERC721Received`،
     * والذي يُستدعى عند النقل الآمن، ويُرجع القيمة السحرية
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`؛
     * وإلا، يتم التراجع عن النقل.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * ينقل ملكية معرف رمز مميز معين بأمان إلى عنوان آخر
     * إذا كان العنوان المستهدف عبارة عن عقد، فيجب أن ينفذ `onERC721Received`،
     * والذي يُستدعى عند النقل الآمن، ويُرجع القيمة السحرية
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`؛
     * وإلا، يتم التراجع عن النقل.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * دالة داخلية لاستدعاء `onERC721Received` على عنوان مستهدف
     * لا يتم تنفيذ الاستدعاء إذا كان العنوان المستهدف ليس عقدًا
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

    // يحرق بيتزا - يدمر الرمز المميز تمامًا
    // مُعدِّل الدالة `external` يعني أن هذه الدالة هي
    // جزء من واجهة العقد ويمكن للعقود الأخرى استدعاؤها
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // يُرجع عدد البيتزا حسب العنوان
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // يُرجع مالك البيتزا الموجودة بواسطة المعرف
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // يوافق لعنوان آخر على نقل ملكية البيتزا
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // يُرجع العنوان المعتمد لبيتزا معينة
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * دالة خاصة لمسح الموافقة الحالية لمعرف رمز مميز معين
     * يتراجع إذا كان العنوان المحدد ليس في الواقع مالك الرمز المميز
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * يعين أو يلغي تعيين الموافقة لمشغل معين
     * يُسمح للمشغل بنقل جميع الرموز المميزة للمرسل نيابة عنه
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // يخبر عما إذا كان المشغل معتمدًا من قبل مالك معين
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // يأخذ ملكية البيتزا - فقط للمستخدمين المعتمدين
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // يتحقق مما إذا كانت البيتزا موجودة
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // يتحقق مما إذا كان العنوان هو المالك أو معتمدًا لنقل البيتزا
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // تعطيل فحص solium بسبب
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // التحقق مما إذا كانت البيتزا فريدة ولا توجد بعد
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
        require(result, "Pizza with such name already exists.");
        _;
    }

    // يُرجع ما إذا كان العنوان المستهدف عبارة عن عقد
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // حاليًا لا توجد طريقة أفضل للتحقق مما إذا كان هناك عقد في عنوان
        // من التحقق من حجم الكود في ذلك العنوان.
        // راجع https://ethereum.stackexchange.com/a/14016/36603
        // لمزيد من التفاصيل حول كيفية عمل ذلك.
        // TODO تحقق من هذا مرة أخرى قبل إصدار Serenity، لأن جميع العناوين ستكون
        // عقودًا حينها.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## قراءة إضافية {#further-reading}

تحقق من وثائق Solidity و Vyper للحصول على نظرة عامة أكثر اكتمالاً على العقود الذكية:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## مواضيع ذات صلة {#related-topics}

- [العقود الذكية](/developers/docs/smart-contracts/)
- [آلة إيثيريوم الافتراضية (EVM)](/developers/docs/evm/)

## برامج تعليمية ذات صلة {#related-tutorials}

- [تقليص حجم العقود لمواجهة حد حجم العقد](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– بعض النصائح العملية لتقليل حجم عقدك الذكي._
- [تسجيل البيانات من العقود الذكية باستخدام الأحداث](/developers/tutorials/logging-events-smart-contracts/) _– مقدمة لأحداث العقد الذكي وكيف يمكنك استخدامها لتسجيل البيانات._
- [التفاعل مع العقود الأخرى من Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– كيفية نشر عقد ذكي من عقد موجود والتفاعل معه._