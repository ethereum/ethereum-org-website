---
title: "فهم العقد الذكي لرمز ERC-20"
description: "تعلم كيفية تنفيذ معيار الرمز ERC-20 مع مثال وشرح كامل للعقد الذكي بلغة سوليديتي."
author: "jdourlens"
tags: [ "العقود الذكيه ", "tokens", "الصلابة", "erc-20" ]
skill: beginner
lang: ar
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

أحد أهم [معايير العقود الذكية](/developers/docs/standards/) على إيثريوم يُعرف باسم [ERC-20](/developers/docs/standards/tokens/erc-20/)، والذي برز كمعيار فني يُستخدم لجميع العقود الذكية على بلوكتشين إيثريوم لتنفيذ الرموز القابلة للاستبدال.

يحدد ERC-20 قائمة مشتركة من القواعد التي يجب أن تلتزم بها جميع رموز إيثريوم القابلة للاستبدال. وبالتالي، فإن معيار الرمز هذا يمكّن المطورين من جميع الأنواع من التنبؤ بدقة بكيفية عمل الرموز الجديدة داخل نظام إيثريوم الأكبر. هذا يبسط ويسهل مهام المطورين، لأنهم يستطيعون المضي قدمًا في عملهم، مع العلم أن كل مشروع جديد لن يحتاج إلى إعادة عمل في كل مرة يتم فيها إصدار رمز جديد، طالما أن الرمز يتبع القواعد.

إليك الوظائف التي يجب أن ينفذها ERC-20، مقدمة كواجهة. إذا لم تكن متأكدًا من ماهية الواجهة: تحقق من مقالتنا حول [البرمجة كائنية التوجه في Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

إليك شرح سطر بسطر لوظيفة كل دالة. بعد هذا، سنقدم تنفيذًا بسيطًا لرمز ERC-20.

## دوال الجلب (Getters) {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

تُرجع كمية الرموز الموجودة. هذه الدالة هي دالة جلب (getter) ولا تعدل حالة العقد. ضع في اعتبارك أنه لا توجد أرقام عشرية (floats) في لغة Solidity. لذلك، تعتمد معظم الرموز 18 خانة عشرية وستُرجع إجمالي العرض والنتائج الأخرى على النحو التالي: 1000000000000000000 لرمز واحد. لا يحتوي كل رمز على 18 خانة عشرية، وهذا شيء يجب أن تنتبه إليه حقًا عند التعامل مع الرموز.

```solidity
function balanceOf(address account) external view returns (uint256);
```

تُرجع كمية الرموز المملوكة لعنوان (`account`). هذه الدالة هي دالة جلب (getter) ولا تعدل حالة العقد.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

يسمح معيار ERC-20 للعنوان بإعطاء سماحية (allowance) لعنوان آخر ليتمكن من سحب الرموز منه. تُرجع دالة الجلب هذه العدد المتبقي من الرموز التي سيُسمح لـ `spender` بإنفاقها نيابةً عن `owner`. هذه الدالة هي دالة جلب ولا تعدل حالة العقد ويجب أن تُرجع 0 بشكل افتراضي.

## الدوال {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

تنقل `amount` من الرموز من عنوان مستدعي الدالة (`msg.sender`) إلى عنوان المستلم. تُصدر هذه الدالة حدث `Transfer` المُعرّف لاحقًا. تُرجع القيمة true إذا كان التحويل ممكنًا.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

تحدد مبلغ `allowance` (السماحية) الذي يُسمح لـ `spender` بتحويله من رصيد مستدعي الدالة (`msg.sender`). تُصدر هذه الدالة حدث الموافقة (Approval). تُرجع الدالة ما إذا كان قد تم تعيين السماحية بنجاح.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

تنقل `amount` من الرموز من `sender` إلى `recipient` باستخدام آلية السماحية. يتم بعد ذلك خصم المبلغ من سماحية المستدعي. تُصدر هذه الدالة حدث `Transfer`.

## الأحداث {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

يُصدر هذا الحدث عندما يتم إرسال كمية الرموز (value) من العنوان `from` إلى العنوان `to`.

في حالة سك رموز جديدة، يكون التحويل عادةً `from` (من) العنوان 0x00..0000، بينما في حالة حرق الرموز يكون التحويل `to` (إلى) 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

يُصدر هذا الحدث عندما تتم الموافقة على كمية الرموز (`value`) من قبل `owner` ليستخدمها `spender`.

## تنفيذ أساسي لرموز ERC-20 {#a-basic-implementation-of-erc-20-tokens}

إليك أبسط كود يمكنك أن تبني عليه رمز ERC-20 الخاص بك:

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

تنفيذ ممتاز آخر لمعيار الرمز ERC-20 هو [تنفيذ ERC-20 من OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
