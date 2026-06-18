---
title: "فهم العقد الذكي للرمز المميز ⁦ERC-20⁩"
description: "تعرف على كيفية تنفيذ معيار الرمز المميز ⁦ERC-20⁩ مع مثال وشرح كامل لعقد ذكي بلغة ⁦Solidity⁩."
author: "jdourlens"
tags: ["العقود الذكية", "الرموز المميزة", "solidity", "erc-20"]
skill: beginner
breadcrumb: "أساسيات الرمز المميز ⁦ERC-20⁩"
lang: ar
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

يُعرف أحد أهم [معايير العقود الذكية](/developers/docs/standards/) على إيثيريوم باسم [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/)، والذي برز كمعيار تقني يُستخدم لجميع العقود الذكية على سلسلة الكتل لإيثيريوم لتنفيذ الرموز القابلة للاستبدال.

يحدد <span dir="ltr">ERC-20</span> قائمة مشتركة من القواعد التي يجب أن تلتزم بها جميع رموز إيثيريوم القابلة للاستبدال. وبالتالي، يُمكّن معيار الرمز المميز هذا المطورين من جميع الأنواع من التنبؤ بدقة بكيفية عمل الرموز المميزة الجديدة داخل نظام إيثيريوم الأوسع. وهذا يبسط ويسهل مهام المطورين، حيث يمكنهم المضي قدمًا في عملهم، مع العلم أن كل مشروع جديد لن يحتاج إلى إعادة صياغته في كل مرة يتم فيها إصدار رمز مميز جديد، طالما أن الرمز المميز يتبع القواعد.

إليك الدوال التي يجب أن ينفذها <span dir="ltr">ERC-20</span>، معروضة كواجهة. إذا لم تكن متأكدًا من ماهية الواجهة: تحقق من مقالتنا حول [البرمجة كائنية التوجه (OOP) في Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

```solidity
pragma solidity ^0.6.0;

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
```

إليك شرح سطر بسطر للغرض من كل دالة. بعد ذلك سنقدم تنفيذًا بسيطًا للرمز المميز <span dir="ltr">ERC-20</span>.

## دوال الجلب (Getters) {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

تُرجع كمية الرموز المميزة الموجودة. هذه الدالة هي دالة جلب (getter) ولا تعدل حالة العقد. ضع في اعتبارك أنه لا توجد أرقام عشرية عائمة (floats) في Solidity. لذلك تتبنى معظم الرموز المميزة <span dir="ltr">18</span> منزلة عشرية وستُرجع إجمالي المعروض والنتائج الأخرى على النحو التالي <span dir="ltr">1000000000000000000</span> مقابل رمز مميز واحد (<span dir="ltr">1</span>). لا يحتوي كل رمز مميز على <span dir="ltr">18</span> منزلة عشرية وهذا شيء يجب عليك الانتباه إليه حقًا عند التعامل مع الرموز المميزة.

```solidity
function balanceOf(address account) external view returns (uint256);
```

تُرجع كمية الرموز المميزة المملوكة لعنوان (`account`). هذه الدالة هي دالة جلب ولا تعدل حالة العقد.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

يسمح معيار <span dir="ltr">ERC-20</span> لعنوان بإعطاء سماحية لعنوان آخر ليكون قادرًا على استرداد الرموز المميزة منه. تُرجع دالة الجلب هذه العدد المتبقي من الرموز المميزة التي سيُسمح لـ `spender` بإنفاقها نيابة عن `owner`. هذه الدالة هي دالة جلب ولا تعدل حالة العقد ويجب أن تُرجع <span dir="ltr">0</span> افتراضيًا.

## الدوال {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

تنقل `amount` من الرموز المميزة من عنوان مستدعي الدالة (`msg.sender`) إلى عنوان المستلم. تُصدر هذه الدالة حدث `Transfer` المُعرّف لاحقًا. وتُرجع <span dir="ltr">true</span> إذا كان التحويل ممكنًا.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

تُعيّن كمية `allowance` التي يُسمح لـ `spender` بتحويلها من رصيد مستدعي الدالة (`msg.sender`). تُصدر هذه الدالة حدث الموافقة (<span dir="ltr">Approval</span>). وتُرجع الدالة ما إذا كان قد تم تعيين السماحية بنجاح.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

تنقل `amount` من الرموز المميزة من `sender` إلى `recipient` باستخدام آلية السماحية. يتم بعد ذلك خصم الكمية (<span dir="ltr">amount</span>) من سماحية المستدعي. تُصدر هذه الدالة حدث `Transfer`.

## أحداث {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

يتم إصدار هذا الحدث عندما يتم إرسال كمية من الرموز المميزة (القيمة) من عنوان `from` إلى عنوان `to`.

في حالة عملية سك رموز مميزة جديدة، يكون التحويل عادةً `from` العنوان <span dir="ltr">0x00..0000</span> بينما في حالة حرق الرموز المميزة يكون التحويل `to` <span dir="ltr">0x00..0000</span>.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

يتم إصدار هذا الحدث عندما تتم الموافقة على كمية الرموز المميزة (`value`) من قِبل `owner` ليتم استخدامها بواسطة `spender`.

## تنفيذ أساسي للرموز المميزة <span dir="ltr">ERC-20</span> {#a-basic-implementation-of-erc-20-tokens}

إليك أبسط كود يمكنك بناء الرمز المميز <span dir="ltr">ERC-20</span> الخاص بك عليه:

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

تنفيذ ممتاز آخر لمعيار الرمز المميز <span dir="ltr">ERC-20</span> هو [تنفيذ أوبن زبلن لـ <span dir="ltr">ERC-20</span>](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).