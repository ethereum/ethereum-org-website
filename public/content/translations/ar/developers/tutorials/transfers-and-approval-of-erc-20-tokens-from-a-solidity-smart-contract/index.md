---
title: "تحويلات رموز ERC-20 والموافقة عليها من عقد سوليديتي ذكي"
description: "بناء عقد ذكي لمنصة تداول لامركزية (DEX) يتعامل مع تحويلات رموز ERC-20 والموافقات عليها باستخدام سوليديتي."
author: "jdourlens"
tags: [ "العقود الذكيه ", "tokens", "الصلابة", "erc-20" ]
skill: intermediate
lang: ar
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

في الدرس التعليمي السابق درسنا [تشريح رمز ERC-20 في سوليديتي](/developers/tutorials/understand-the-erc-20-token-smart-contract/) على بلوكتشين إيثريوم. في هذه المقالة، سنرى كيف يمكننا استخدام عقد ذكي للتفاعل مع رمز باستخدام لغة سوليديتي.

لهذا العقد الذكي، سننشئ منصة تداول لامركزية وهمية حقيقية حيث يمكن للمستخدم تداول الإيثر مقابل [رمز ERC-20](/developers/docs/standards/tokens/erc-20/) الذي نشرناه حديثًا.

في هذا الدرس التعليمي، سنستخدم النص البرمجي الذي كتبناه في الدرس التعليمي السابق كأساس. ستقوم منصة التداول اللامركزية الخاصة بنا بإنشاء مثيل للعقد في الدالة الإنشائية الخاصة به وتنفيذ العمليات التالية:

- استبدال الرموز بالإيثر
- استبدال الإيثر بالرموز

سنبدأ النص البرمجي لمنصة التداول اللامركزية الخاصة بنا بإضافة قاعدة التعليمات البرمجية البسيطة الخاصة بـ ERC20:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


```

سيقوم عقدنا الذكي الجديد الخاص بمنصة التداول اللامركزية بنشر ERC-20 والحصول على كل ما تم توفيره:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // سيتم التنفيذ لاحقاً
    }

    function sell(uint256 amount) public {
        // سيتم التنفيذ لاحقاً
    }

}
```

لذا، لدينا الآن منصة التداول اللامركزية الخاصة بنا وكل احتياطي الرموز متاح لديها. يحتوي العقد على وظيفتين:

- `الشراء`: يمكن للمستخدم إرسال الإيثر والحصول على رموز في المقابل
- `البيع`: يمكن للمستخدم أن يقرر إرسال الرموز لاستعادة الإيثر

## وظيفة الشراء {#the-buy-function}

لنقم بكتابة النص البرمجي لوظيفة الشراء. سنحتاج أولاً إلى التحقق من كمية الإيثر التي تحتويها الرسالة والتحقق من أن العقد يمتلك رموزًا كافية وأن الرسالة تحتوي على بعض الإيثر. إذا كان العقد يمتلك رموزًا كافية، فسيرسل عدد الرموز إلى المستخدم ويصدر حدث `Bought`.

لاحظ أنه إذا استدعينا وظيفة `require` في حالة حدوث خطأ، فسيتم إرجاع الإيثر المرسل مباشرة وإعادته إلى المستخدم.

لتبسيط الأمور، سنقوم بتبديل رمز واحد مقابل 1 واي.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "تحتاج إلى إرسال بعض الإيثر");
    require(amountTobuy <= dexBalance, "لا توجد رموز كافية في الاحتياطي");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

في حالة نجاح عملية الشراء، يجب أن نرى حدثين في المعاملة: حدث `Transfer` للرمز وحدث `Bought`.

![حدثان في المعاملة: Transfer و Bought](./transfer-and-bought-events.png)

## وظيفة البيع {#the-sell-function}

الوظيفة المسؤولة عن البيع ستتطلب أولاً من المستخدم أن يكون قد وافق على المبلغ عن طريق استدعاء وظيفة `approve` مسبقاً. تتطلب الموافقة على التحويل أن يتم استدعاء رمز ERC20Basic الذي تم إنشاؤه بواسطة منصة التداول اللامركزية من قِبل المستخدم. يمكن تحقيق ذلك عن طريق استدعاء وظيفة `token()` الخاصة بعقد منصة التداول اللامركزية أولاً لاسترداد العنوان الذي نشرت فيه منصة التداول اللامركزية عقد ERC20Basic المسمى `token`. ثم نقوم بإنشاء مثيل لهذا العقد في جلستنا ونستدعي وظيفة `approve` الخاصة به. بعد ذلك، يمكننا استدعاء وظيفة `sell` الخاصة بمنصة التداول اللامركزية واستبدال رموزنا مرة أخرى بالإيثر. على سبيل المثال، هكذا يبدو هذا في جلسة Brownie تفاعلية:

```python
#### بايثون في وحدة تحكم Brownie التفاعلية...

# نشر منصة التداول اللامركزية (DEX)
dex = DEX.deploy({'from':account1})

# استدعاء وظيفة الشراء لمبادلة الإيثر بالرمز
# 1e18 هو 1 إيثر مُقوّم بالـ wei
dex.buy({'from': account2, 1e18})

# الحصول على عنوان النشر لرمز ERC20
# الذي تم نشره أثناء إنشاء عقد DEX
# dex.token() تُرجع عنوان النشر للرمز
token = ERC20Basic.at(dex.token())

# استدعاء وظيفة الموافقة الخاصة بالرمز
# الموافقة على عنوان DEX كمنفق
# وعدد الرموز التي يُسمح له بإنفاقها
token.approve(dex.address, 3e18, {'from':account2})

```

بعد ذلك، عند استدعاء وظيفة البيع، سنتحقق مما إذا كان التحويل من عنوان المتصل إلى عنوان العقد قد تم بنجاح، ثم نعيد إرسال الإيثر إلى عنوان المتصل.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "تحتاج إلى بيع بعض الرموز على الأقل");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "تحقق من بدل الرمز");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

إذا سار كل شيء على ما يرام، يجب أن ترى حدثين (`Transfer` و `Sold`) في المعاملة وتحديث رصيد الرمز ورصيد الإيثر لديك.

![حدثان في المعاملة: Transfer و Sold](./transfer-and-sold-events.png)

<Divider />

من هذا الدرس التعليمي، رأينا كيفية التحقق من الرصيد والبدل لرمز ERC-20، وكذلك كيفية استدعاء `Transfer` و`TransferFrom` لعقد ERC20 ذكي باستخدام الواجهة.

بمجرد إجراء معاملة، لدينا درس تعليمي لجافا سكريبت [للانتظار والحصول على تفاصيل حول المعاملات](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) التي أُجريت على عقدك و[درس تعليمي لفك تشفير الأحداث الناتجة عن تحويلات الرموز أو أي أحداث أخرى](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) طالما أنك تملك واجهة التطبيق الثنائية (ABI).

إليك النص البرمجي الكامل للدرس التعليمي:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "تحتاج إلى إرسال بعض الإيثر");
        require(amountTobuy <= dexBalance, "لا توجد رموز كافية في الاحتياطي");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "تحتاج إلى بيع بعض الرموز على الأقل");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "تحقق من بدل الرمز");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
