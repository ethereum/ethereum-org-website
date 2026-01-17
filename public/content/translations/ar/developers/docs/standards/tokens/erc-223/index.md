---
title: معيار رمز ERC-223
description: |
  نظرة عامة على معيار الرموز القابلة للتداول ERC-223، كيفية عمله، ومقارنة مع ERC-20.
lang: ar
---

## مقدمة {#مقدمة}

### ما هو ERC-223؟ {#what-is-erc223}

ERC-223 هو معيار للرموز القابلة للتبادل، مشابه لمعيار ERC-20. الفرق الرئيسي هو أن ERC-223 يحدد ليس فقط واجهة برمجة التطبيقات للرمز ولكن أيضًا المنطق الخاص بنقل الرموز من المرسل إلى المستلم. يقدم نموذج اتصال يسمح بتعامل مع نقل الرموز على جانب المستلم.

### Differences from ERC-20 {#erc20-differences}

عنوان ERC-223 يعالج بعض قيود ERC-20 ويقدم طريقة جديدة للتفاعل بين عقد الرمز وعقد قد يتلقى الرموز. هناك بعض الأشياء الممكنة مع ERC-223 ولكن لا يمكن تحقيقها مع ERC-20:

- معالجة تحويل الرمز على جانب المستلم: يمكن للمستلمين اكتشاف أنه يتم إيداع رمز ERC-223.
- رفض الرموز المرسلة بشكل غير صحيح: إذا أرسل مستخدم رموز ERC-223 إلى عقد لا يُفترض أن يستقبل الرموز، يمكن للعقد رفض المعاملة، مما يمنع فقدان الرموز.
- البيانات الوصفية في التحويلات: يمكن أن تتضمن رموز ERC-223 بيانات وصفية، مما يسمح بإرفاق معلومات عشوائية بعمليات نقل الرموز.

## المتطلبات الأساسية {#prerequisites}

- [الحسابات](/developers/docs/accounts)
- [العقود الذكية](/developers/docs/smart-contracts/)
- معايير الرمز
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## الجسد {#الجسد}

ERC-223 هو معيار توكن ينفذ واجهة برمجة التطبيقات للتوكنات ضمن العقود الذكية. كما يعلن عن واجهة برمجة التطبيقات للعقود التي من المفترض أن تتلقى رموز ERC-223. العقود التي لا تدعم واجهة برمجة الاستقبال ERC-223 لا يمكنها استقبال رموز ERC-223، مما يمنع حدوث أخطاء من قبل المستخدم.

إذا كان العقد الذكي ينفذ الطرق والأحداث التالية، يمكن أن يسمى عقد رمزي متوافق مع ERC-223.
ينشرينشر

بمجرد نشره، سيكون مسؤولاً عن تتبع الرموز المنشأة على الإيثيريوم. على سبيل المثال، فإن دالة `approve` و `transferFrom` ليست جزءاً من معيار ERC-223، لكن يمكن تنفيذ هذه الدوال إذا تطلب الأمر.

من [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### طرق {#methods}

يجب على توكن ERC-223 تنفيذ الأساليب التالية:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

يجب أن ينفذ العقد الذي من المفترض أن يتلقى توكنات ERC-223 الطريقة التالية:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

إذا تم إرسال رموز ERC-223 إلى عقد لا ينفذ وظيفة `tokenReceived(..)`، يجب أن تفشل عملية الإرسال ويجب ألا تتحرك الرموز من رصيد المرسل.

### الأحداث{#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### أمثلة {#examples}

الاستثناء الوحيد هنا هو أن رموز ERC-223 قد لا تحتوي على وظائف `approve` و `transferFrom` حيث إن هذه الخيارات اختيارية لهذا المعيار. الاستثناء الوحيد هنا هو أن رموز ERC-223 قد لا تحتوي على وظائف `approve` و `transferFrom` حيث إن هذه الخيارات اختيارية لهذا المعيار.

#### أمثلة سوليديتي {#مثال-سوليديتي}

المثال التالي يوضح كيفية عمل عقد توكن ERC-223 الأساسي:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

الآن نريد عقدًا آخر لقبول ودائع من `tokenA` على افتراض أن tokenA هو رمز ERC-223. يجب على العقد قبول tokenA فقط ورفض أي توكنات أخرى. عندما يتلقى العقد tokenA يجب أن يبث حدث `Deposit()` ويزيد من قيمة المتغير الداخلي `deposits`.

إليك الشيفرة:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // الرمز الوحيد الذي نريد قبوله.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // من المهم أن نفهم أنه ضمن هذه الدالة
        // msg.sender هو عنوان الرمز الذي يتم استلامه،
        // msg.value  هي دائمًا 0 لأن عقد الرمز لا يمتلك أو يرسل الإيثر في معظم الحالات،
        // _from      هو مرسل تحويل الرمز،
        // _value     هي كمية الرموز التي تم إيداعها.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## الأسئلة الشائعة {#الأسئلة الشائعة}

### ماذا سيحدث إذا أرسلنا بعض توكنB إلى العقد؟ {#sending-tokens}

ستفشل المعاملة، ولن يتم نقل الرموز. ستعود الرموز إلى عنوان المرسل.

### كيف يمكننا إيداع مبلغ في هذا العقد؟ {#contract-deposits}

استدعِ دالة `transfer(address,uint256)` أو `transfer(address,uint256,bytes)` من توكن ERC-223، مع تحديد عنوان `RecipientContract`.

### ماذا سيحدث إذا قمنا بنقل رمز ERC-20 إلى هذا العقد؟ {#erc-20-transfers}

إذا تم إرسال رمز ERC-20 إلى `RecipientContract`، سيتم نقل الرموز، ولكن لن يتم التعرف على النقل (لن يتم إطلاق حدث `Deposit()`، ولن تتغير قيمة الإيداعات). لا يمكن تصفية أو منع الودائع غير المرغوب فيها من نوع ERC-20.

### ماذا لو أردنا تنفيذ بعض الوظائف بعد انتهاء إيداع الرمز؟ {#function-execution}

هناك طرق متعددة للقيام بذلك. في هذا المثال، سنتبع الطريقة التي تجعل تحويلات ERC-223 متطابقة مع تحويلات الإيثير:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // الرمز الوحيد الذي نريد قبوله.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // تعامل مع المعاملة الواردة وقم بإجراء استدعاء دالة لاحق.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

عند استلام `RecipientContract` لرمز ERC-223، ستقوم العقدة بتنفيذ دالة مشفرة كمعامل `_data` من معاملّة الرمز، كما هو الحال في كيفية تشفير معاملات الإيثير لدعوات الدوال كبيانات معاملات.
اقرأ [حقل البيانات](/developers/docs/transactions/#the-data-field) للمزيد من المعلومات.

في المثال أعلاه، يجب نقل رمز ERC-223 إلى عنوان `RecipientContract` باستخدام دالة `transfer(address, uint256, bytes calldata _data)`. إذا كانت قيمة معامل البيانات ستكون `02985578` (توقيع دالة `()`) فسوف يتم استدعاء الدالة () بعد استلام إيداع الرمز وسيتم إطلاق حدث ().

يمكن ترميز المعلمات في ``الخاصة بنقل الرمز أيضًا، على سبيل المثال يمكننا استدعاء دالة () مع قيمة 12345 لـ `_someNumber`. في هذه الحالة يجب أن تكون`` هي `0x0423a132000000000000000000000000000000000000000000000000000000000000042` حيث أن `0x0423a132` هو توقيع دالة `()` و `000000000000000000000000000000000000000000000000000000000000042` هو 12345 كـ 256.

## القيود {#limitations}

بينما تعالج ERC-223 العديد من المشكلات الموجودة في معيار ERC-20، إلا أنها ليست خالية من قيودها الخاصة:

- التبني والتوافق: لم يتم تبني ERC-223 على نطاق واسع بعد، مما قد يحد من توافقه مع الأدوات والمنصات القائمة.
- التوافق العكسي: لا يتوافق ERC-223 مع ERC-20، مما يعني أن العقود والأدوات الحالية لـ ERC-20 لن تعمل مع رموز ERC-223 دون تعديلات.
- تكاليف الغاز: قد تؤدي الفحوص والوظائف الإضافية في تحويلات ERC-223 إلى تكاليف غاز أعلى مقارنة بمعاملات ERC-20.

## قراءة إضافية{#further-reading}

- [EIP-223: معيار توكن ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [اقتراح ERC-223 الأولي](https://github.com/ethereum/eips/issues/223)
