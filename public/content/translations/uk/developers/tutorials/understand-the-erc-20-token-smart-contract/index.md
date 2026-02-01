---
title: Зрозумійте смарт-контракт токена ERC-20
description: Дізнайтеся, як реалізувати стандарт токенів ERC-20 на повному прикладі смарт-контракту на Solidity з поясненнями.
author: "jdourlens"
tags:
  [
    "Смарт-контракти",
    "токени, лексеми",
    "мова програмування",
    "erc-20"
  ]
skill: beginner
lang: uk
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Одним із найважливіших [стандартів смарт-контрактів](/developers/docs/standards/) на Ethereum є [ERC-20](/developers/docs/standards/tokens/erc-20/), який став технічним стандартом, що використовується для всіх смарт-контрактів на блокчейні Ethereum для реалізації взаємозамінних токенів.

ERC-20 визначає загальний перелік правил, яких повинні дотримуватися всі взаємозамінні токени Ethereum. Отже, цей стандарт токенів надає розробникам усіх типів можливість точно передбачити, як нові токени працюватимуть у більшій системі Ethereum. Це спрощує та полегшує завдання розробників, оскільки вони можуть продовжувати свою роботу, знаючи, що кожен новий проєкт не потрібно буде переробляти щоразу, коли випускається новий токен, якщо він відповідає правилам.

Ось функції, які має реалізовувати ERC-20, представлені у вигляді інтерфейсу. Якщо ви не впевнені, що таке інтерфейс, перегляньте нашу статтю про [ООП-програмування на Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Ось порядкове пояснення того, для чого призначена кожна функція. Після цього ми представимо просту реалізацію токену ERC-20.

## Гетери {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Повертає кількість токенів в обігу. Ця функція є гетером і не змінює стан контракту. Майте на увазі, що в Solidity немає значень із рухомою комою. Тому більшість токенів використовують 18 десяткових розрядів і повертають загальну пропозицію та інші результати, наприклад 1000000000000000000 для 1 токена. Не кожен токен має 18 десяткових розрядів, і на це справді потрібно зважати, працюючи з токенами.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Повертає кількість токенів, що належать адресі (`account`). Ця функція є гетером і не змінює стан контракту.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Стандарт ERC-20 дозволяє одній адресі надавати дозвіл іншій адресі на отримання токенів з неї. Цей гетер повертає залишкову кількість токенів, які `spender` зможе витратити від імені `owner`. Ця функція є гетером, не змінює стан контракту і за замовчуванням має повертати 0.

## Функції {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Переміщує кількість (`amount`) токенів з адреси, що викликала функцію (`msg.sender`), на адресу одержувача. Ця функція генерує подію `Transfer`, яка визначена нижче. Функція повертає `true`, якщо переказ був можливий.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Встановлює `allowance` (ліміт) — кількість токенів, яку `spender` може переказати з балансу адреси, що викликала функцію (`msg.sender`). Ця функція генерує подію `Approval`. Функція повертає `true`, якщо ліміт було успішно встановлено.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Переміщує кількість (`amount`) токенів від `sender` до `recipient` за допомогою механізму лімітів. Потім `amount` вираховується з ліміту, наданого тому, хто викликає функцію. Ця функція генерує подію `Transfer`.

## Події {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Ця подія генерується, коли кількість токенів (`value`) надсилається з адреси `from` на адресу `to`.

У разі карбування нових токенів переказ зазвичай відбувається з адреси `from` 0x00..0000, а в разі спалювання токенів — на адресу `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Ця подія генерується, коли `owner` схвалює використання кількості токенів (`value`) для `spender`.

## Базова реалізація токенів ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Ось найпростіший код, який можна взяти за основу для вашого токена ERC-20:

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

Ще однією чудовою реалізацією стандарту токенів ERC-20 є [реалізація ERC-20 від OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
