---
title: "تحويلات وموافقة الرموز المميزة ⁦ERC-20⁩ من عقد ذكي بلغة ⁦Solidity⁩"
description: "بناء عقد ذكي لمنصة تداول لامركزية (DEX) يتعامل مع تحويلات وموافقات الرموز المميزة ⁦ERC-20⁩ باستخدام ⁦Solidity⁩."
author: "jdourlens"
tags: ["العقود الذكية", "الرموز المميزة", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: "تحويلات ⁦ERC-20⁩"
lang: ar
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

في البرنامج التعليمي السابق، درسنا [تشريح الرمز المميز <span dir="ltr">ERC-20</span> في <span dir="ltr">Solidity</span>](/developers/tutorials/understand-the-erc-20-token-smart-contract/) على سلسلة الكتل إيثيريوم. في هذه المقالة، سنرى كيف يمكننا استخدام عقد ذكي للتفاعل مع رمز مميز باستخدام لغة <span dir="ltr">Solidity</span>.

بالنسبة لهذا العقد الذكي، سنقوم بإنشاء منصة تداول لامركزية (DEX) وهمية حقيقية حيث يمكن للمستخدم تداول الإيثر مقابل [الرمز المميز <span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) الذي تم نشره حديثًا.

في هذا البرنامج التعليمي، سنستخدم الكود الذي كتبناه في البرنامج التعليمي السابق كأساس. ستقوم منصة التداول اللامركزية (DEX) الخاصة بنا بإنشاء مثيل للعقد في المُنشئ الخاص بها وتنفيذ عمليات:

- مبادلة الرموز المميزة بالإيثر
- مبادلة الإيثر بالرموز المميزة

سنبدأ كود منصة التداول اللامركزية الخاصة بنا بإضافة قاعدة كود <span dir="ltr">ERC20</span> البسيطة الخاصة بنا:

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

سيقوم العقد الذكي الجديد لمنصة التداول اللامركزية بنشر <span dir="ltr">ERC-20</span> والحصول على كل المعروض:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // للتنفيذ
    }

    function sell(uint256 amount) public {
        // للتنفيذ
    }

}
```

لذا أصبح لدينا الآن منصة التداول اللامركزية الخاصة بنا ولديها كل احتياطي الرموز المميزة المتاح. يحتوي العقد على دالتين:

- `buy`: يمكن للمستخدم إرسال الإيثر والحصول على رموز مميزة في المقابل
- `sell`: يمكن للمستخدم أن يقرر إرسال الرموز المميزة لاسترداد الإيثر

## دالة الشراء {#the-buy-function}

دعونا نكتب كود دالة الشراء. سنحتاج أولاً إلى التحقق من كمية الإيثر التي تحتوي عليها الرسالة والتحقق من أن العقد يمتلك ما يكفي من الرموز المميزة وأن الرسالة تحتوي على بعض الإيثر. إذا كان العقد يمتلك ما يكفي من الرموز المميزة، فسيرسل عدد الرموز المميزة إلى المستخدم ويُصدر الحدث `Bought`.

لاحظ أنه إذا استدعينا دالة الاشتراط (`require`) في حالة حدوث خطأ، فسيتم إرجاع الإيثر المُرسل مباشرةً وإعادته إلى المستخدم.

لتبسيط الأمور، نقوم فقط بمبادلة <span dir="ltr">1</span> رمز مميز مقابل <span dir="ltr">1 Wei</span>.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

في حالة نجاح عملية الشراء، يجب أن نرى حدثين في المعاملة: الحدث `Transfer` للرمز المميز والحدث `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## دالة البيع {#the-sell-function}

ستشترط الدالة المسؤولة عن البيع أولاً أن يكون المستخدم قد وافق على الكمية عن طريق استدعاء دالة الموافقة (`approve`) مسبقًا. تتطلب الموافقة على التحويل أن يقوم المستخدم باستدعاء الرمز المميز <span dir="ltr">ERC20Basic</span> الذي تم إنشاء مثيل له بواسطة منصة التداول اللامركزية (DEX). يمكن تحقيق ذلك عن طريق استدعاء دالة `token()` الخاصة بعقد منصة التداول اللامركزية أولاً لاسترداد العنوان الذي نشرت فيه منصة التداول اللامركزية عقد <span dir="ltr">ERC20Basic</span> المسمى `token`. ثم نقوم بإنشاء مثيل لذلك العقد في جلستنا ونستدعي دالته `approve`. بعد ذلك نتمكن من استدعاء دالة `sell` الخاصة بمنصة التداول اللامركزية ومبادلة رموزنا المميزة مرة أخرى مقابل الإيثر. على سبيل المثال، هكذا يبدو الأمر في جلسة <span dir="ltr">Brownie</span> تفاعلية:

```python
#### Python في وحدة تحكم Brownie التفاعلية...

# نشر DEX
dex = DEX.deploy({'from':account1})

# استدعاء دالة الشراء لمبادلة إيثر مقابل رمز مميز
# 1e18 هو 1 إيثر مقوم بـ Wei
dex.buy({'from': account2, 1e18})

# الحصول على عنوان النشر للرمز المميز ERC-20
# الذي تم نشره أثناء إنشاء عقد DEX
# تُرجع dex.token() العنوان المنشور للرمز المميز
token = ERC20Basic.at(dex.token())

# استدعاء دالة الموافقة للرمز المميز
# الموافقة على عنوان dex كمنفق
# وكم عدد الرموز المميزة الخاصة بك المسموح له بإنفاقها
token.approve(dex.address, 3e18, {'from':account2})

```

ثم عند استدعاء دالة البيع، سنتحقق مما إذا كان التحويل من عنوان المتصل إلى عنوان العقد ناجحًا ثم نرسل الإيثر مرة أخرى إلى عنوان المتصل.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

إذا سار كل شيء على ما يرام، يجب أن ترى حدثين (`Transfer` و `Sold`) في المعاملة وتحديث رصيد الرموز المميزة ورصيد الإيثر الخاص بك.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

من خلال هذا البرنامج التعليمي، رأينا كيفية التحقق من الرصيد والسماحية لرمز مميز <span dir="ltr">ERC-20</span> وأيضًا كيفية استدعاء `Transfer` و `TransferFrom` لعقد ذكي <span dir="ltr">ERC20</span> باستخدام الواجهة.

بمجرد إجراء معاملة، لدينا برنامج تعليمي بلغة <span dir="ltr">JavaScript</span> [للانتظار والحصول على تفاصيل حول المعاملات](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) التي تم إجراؤها على عقدك و[برنامج تعليمي لفك تشفير الأحداث الناتجة عن تحويلات الرموز المميزة أو أي أحداث أخرى](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) طالما أن لديك واجهة التطبيق الثنائية (ABI).

إليك الكود الكامل للبرنامج التعليمي:

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
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```