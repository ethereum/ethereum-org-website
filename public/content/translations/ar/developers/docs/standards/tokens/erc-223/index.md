---
title: "معيار الرمز المميز ⁦ERC-223⁩"
description: "نظرة عامة على معيار الرمز المميز القابل للاستبدال ⁦ERC-223⁩، وكيفية عمله، ومقارنة مع ⁦ERC-20⁩."
lang: ar
---

## مقدمة {#introduction}

### ما هو <span dir="ltr">ERC-223</span>؟ {#what-is-erc223}

يعد <span dir="ltr">ERC-223</span> معيارًا للرموز المميزة القابلة للاستبدال، على غرار معيار <span dir="ltr">ERC-20</span>. الاختلاف الرئيسي هو أن <span dir="ltr">ERC-223</span> لا يحدد فقط <span dir="ltr">API</span> للرمز المميز بل يحدد أيضًا منطق تحويل الرموز المميزة من المرسل إلى المستلم. يقدم نموذج اتصال يسمح بمعالجة تحويلات الرموز المميزة على جانب المستلم.

### الاختلافات عن <span dir="ltr">ERC-20</span> {#erc20-differences}

يعالج <span dir="ltr">ERC-223</span> بعض قيود <span dir="ltr">ERC-20</span> ويقدم طريقة جديدة للتفاعل بين عقد الرمز المميز والعقد الذي قد يتلقى الرموز المميزة. هناك بعض الأشياء الممكنة مع <span dir="ltr">ERC-223</span> ولكن ليس مع <span dir="ltr">ERC-20</span>:

- معالجة تحويل الرمز المميز على جانب المستلم: يمكن للمستلمين اكتشاف أنه يتم إيداع رمز مميز <span dir="ltr">ERC-223</span>.
- رفض الرموز المميزة المرسلة بشكل غير صحيح: إذا أرسل مستخدم رموزًا مميزة <span dir="ltr">ERC-223</span> إلى عقد غير مفترض أن يتلقى رموزًا مميزة، فيمكن للعقد رفض المعاملة، مما يمنع فقدان الرموز المميزة.
- البيانات الوصفية في التحويلات: يمكن أن تتضمن الرموز المميزة <span dir="ltr">ERC-223</span> بيانات وصفية، مما يسمح بإرفاق معلومات عشوائية بمعاملات الرموز المميزة.

## المتطلبات الأساسية {#prerequisites}

- [الحسابات](/developers/docs/accounts)
- [العقود الذكية](/developers/docs/smart-contracts/)
- [معايير الرموز المميزة](/developers/docs/standards/tokens/)
- [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/)

## المحتوى {#body}

يعد <span dir="ltr">ERC-223</span> معيارًا للرموز المميزة ينفذ <span dir="ltr">API</span> للرموز المميزة داخل العقود الذكية. كما يعلن عن <span dir="ltr">API</span> للعقود التي من المفترض أن تتلقى رموزًا مميزة <span dir="ltr">ERC-223</span>. العقود التي لا تدعم <span dir="ltr">API</span> لمستلم <span dir="ltr">ERC-223</span> لا يمكنها تلقي رموز مميزة <span dir="ltr">ERC-223</span>، مما يمنع خطأ المستخدم.

إذا كان العقد الذكي ينفذ الطرق والأحداث التالية، فيمكن تسميته عقد رمز مميز متوافق مع <span dir="ltr">ERC-223</span>. بمجرد نشره، سيكون مسؤولاً عن تتبع الرموز المميزة المنشأة على إيثيريوم.

العقد غير ملزم بامتلاك هذه الدوال فقط ويمكن للمطور إضافة أي ميزة أخرى من معايير الرموز المميزة المختلفة إلى هذا العقد. على سبيل المثال، الدوال `approve` و `transferFrom` ليست جزءًا من معيار <span dir="ltr">ERC-223</span> ولكن يمكن تنفيذ هذه الدوال إذا لزم الأمر.

من [<span dir="ltr">EIP-223</span>](https://eips.ethereum.org/EIPS/eip-223):

### الطرق {#methods}

يجب أن ينفذ الرمز المميز <span dir="ltr">ERC-223</span> الطرق التالية:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

يجب أن ينفذ العقد الذي من المفترض أن يتلقى رموزًا مميزة <span dir="ltr">ERC-223</span> الطريقة التالية:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

إذا تم إرسال رموز مميزة <span dir="ltr">ERC-223</span> إلى عقد لا ينفذ الدالة `tokenReceived(..)`، فيجب أن يفشل التحويل ويجب ألا يتم نقل الرموز المميزة من رصيد المرسل.

### أحداث {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### أمثلة {#examples}

إن <span dir="ltr">API</span> للرمز المميز <span dir="ltr">ERC-223</span> مشابه لـ <span dir="ltr">ERC-20</span>، لذلك من وجهة نظر تطوير واجهة المستخدم لا يوجد فرق. الاستثناء الوحيد هنا هو أن الرموز المميزة <span dir="ltr">ERC-223</span> قد لا تحتوي على الدوال `approve` + `transferFrom` لأنها اختيارية لهذا المعيار.

#### أمثلة Solidity {#solidity-example}

يوضح المثال التالي كيف يعمل عقد رمز مميز <span dir="ltr">ERC-223</span> أساسي:

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

الآن نريد عقدًا آخر لقبول إيداعات `tokenA` بافتراض أن tokenA هو رمز مميز <span dir="ltr">ERC-223</span>. يجب أن يقبل العقد tokenA فقط ويرفض أي رموز مميزة أخرى. عندما يتلقى العقد tokenA، يجب أن يصدر حدث `Deposit()` ويزيد من قيمة المتغير الداخلي `deposits`.

إليك الكود:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // الرمز المميز الوحيد الذي نريد قبوله.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // من المهم أن نفهم أنه داخل هذه الدالة
        // msg.sender هو عنوان الرمز المميز الذي يتم تلقيه،
        // msg.value  دائماً 0 لأن عقد الرمز المميز لا يملك أو يرسل إيثر في معظم الحالات،
        // _from      هو مرسل تحويل الرمز المميز،
        // _value     هو مقدار الرموز المميزة التي تم إيداعها.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## الأسئلة الشائعة {#faq}

### ماذا سيحدث إذا أرسلنا بعض tokenB إلى العقد؟ {#sending-tokens}

ستفشل المعاملة، ولن يحدث تحويل الرموز المميزة. سيتم إرجاع الرموز المميزة إلى عنوان المرسل.

### كيف يمكننا إجراء إيداع في هذا العقد؟ {#contract-deposits}

استدعِ الدالة `transfer(address,uint256)` أو `transfer(address,uint256,bytes)` للرمز المميز <span dir="ltr">ERC-223</span>، مع تحديد عنوان `RecipientContract`.

### ماذا سيحدث إذا قمنا بتحويل رمز مميز <span dir="ltr">ERC-20</span> إلى هذا العقد؟ {#erc-20-transfers}

إذا تم إرسال رمز مميز <span dir="ltr">ERC-20</span> إلى `RecipientContract`، فسيتم تحويل الرموز المميزة، ولكن لن يتم التعرف على التحويل (لن يتم إطلاق حدث `Deposit()`، ولن تتغير قيمة الإيداعات). لا يمكن تصفية إيداعات <span dir="ltr">ERC-20</span> غير المرغوب فيها أو منعها.

### ماذا لو أردنا تنفيذ دالة ما بعد اكتمال إيداع الرمز المميز؟ {#function-execution}

هناك طرق متعددة للقيام بذلك. في هذا المثال، سنتبع الطريقة التي تجعل تحويلات <span dir="ltr">ERC-223</span> مطابقة لتحويلات الإيثر:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // الرمز المميز الوحيد الذي نريد قبوله.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // معالجة المعاملة الواردة وتنفيذ استدعاء دالة لاحق.
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

عندما يتلقى `RecipientContract` رمزًا مميزًا <span dir="ltr">ERC-223</span>، سينفذ العقد دالة مشفرة كمعلمة `_data` لمعاملة الرمز المميز، بشكل مطابق لكيفية تشفير معاملات الإيثر لاستدعاءات الدوال كـ `data` للمعاملة. اقرأ [حقل البيانات](/developers/docs/transactions/#the-data-field) لمزيد من المعلومات.

في المثال أعلاه، يجب تحويل رمز مميز <span dir="ltr">ERC-223</span> إلى عنوان `RecipientContract` باستخدام الدالة `transfer(address,uin256,bytes calldata _data)`. إذا كانت معلمة البيانات هي `0xc2985578` (توقيع الدالة `foo()`) فسيتم استدعاء الدالة foo() بعد تلقي إيداع الرمز المميز وسيتم إطلاق الحدث Foo().

يمكن تشفير المعلمات في `data` لتحويل الرمز المميز أيضًا، على سبيل المثال يمكننا استدعاء الدالة bar() بقيمة <span dir="ltr">12345</span> لـ `_someNumber`. في هذه الحالة يجب أن يكون `data` هو `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` حيث `0x0423a132` هو توقيع الدالة `bar(uint256)` و `00000000000000000000000000000000000000000000000000000000000004d2` هو <span dir="ltr">12345</span> كـ uint256.

## القيود {#limitations}

بينما يعالج <span dir="ltr">ERC-223</span> العديد من المشكلات الموجودة في معيار <span dir="ltr">ERC-20</span>، إلا أنه لا يخلو من قيوده الخاصة:

- التبني والتوافق: لم يتم تبني <span dir="ltr">ERC-223</span> على نطاق واسع بعد، مما قد يحد من توافقه مع الأدوات والمنصات الحالية.
- التوافق مع الإصدارات السابقة: لا يتوافق <span dir="ltr">ERC-223</span> مع الإصدارات السابقة من <span dir="ltr">ERC-20</span>، مما يعني أن عقود وأدوات <span dir="ltr">ERC-20</span> الحالية لن تعمل مع الرموز المميزة <span dir="ltr">ERC-223</span> دون تعديلات.
- تكاليف الغاز: قد تؤدي الفحوصات والوظائف الإضافية في تحويلات <span dir="ltr">ERC-223</span> إلى ارتفاع تكاليف الغاز مقارنة بمعاملات <span dir="ltr">ERC-20</span>.

## قراءة إضافية {#further-reading}

- [<span dir="ltr">EIP-223</span>: معيار الرمز المميز <span dir="ltr">ERC-223</span>](https://eips.ethereum.org/EIPS/eip-223)
- [مقترح <span dir="ltr">ERC-223</span> الأولي](https://github.com/ethereum/eips/issues/223)