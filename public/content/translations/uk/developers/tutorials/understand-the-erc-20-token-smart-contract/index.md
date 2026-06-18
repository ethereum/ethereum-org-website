---
title: Розуміння смарт-контракту токена ERC-20
description: Дізнайтеся, як реалізувати стандарт токенів ERC-20, за допомогою повного прикладу смарт-контракту на Solidity та пояснень.
author: "jdourlens"
tags: ["смарт-контракти", "токени", "solidity", "erc-20"]
skill: beginner
breadcrumb: Основи токена ERC-20
lang: uk
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Одним із найважливіших [стандартів смарт-контрактів](/developers/docs/standards/) в Етеріумі є [ERC-20](/developers/docs/standards/tokens/erc-20/), який став технічним стандартом, що використовується для всіх смарт-контрактів у блокчейні Етеріум для реалізації взаємозамінних токенів.

ERC-20 визначає загальний перелік правил, яких повинні дотримуватися всі взаємозамінні токени Етеріуму. Отже, цей стандарт токенів дає розробникам усіх типів можливість точно прогнозувати, як нові токени функціонуватимуть у ширшій системі Етеріуму. Це спрощує та полегшує завдання розробників, оскільки вони можуть продовжувати свою роботу, знаючи, що кожен новий проєкт не потрібно буде переробляти щоразу під час випуску нового токена, за умови, що токен дотримується правил.

Нижче у вигляді інтерфейсу представлені функції, які повинен реалізовувати ERC-20. Якщо ви не впевнені, що таке інтерфейс: перегляньте нашу статтю про [об'єктно-орієнтоване програмування (ООП) у Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Ось порядкове пояснення призначення кожної функції. Після цього ми представимо просту реалізацію токена ERC-20.

## Гетери {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Повертає кількість існуючих токенів. Ця функція є гетером і не змінює стан контракту. Майте на увазі, що в Solidity немає чисел із плаваючою комою. Тому більшість токенів використовують 18 десяткових знаків і повертатимуть загальну пропозицію та інші результати у вигляді 1000000000000000000 для 1 токена. Не кожен токен має 18 десяткових знаків, і за цим дійсно потрібно стежити під час роботи з токенами.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Повертає кількість токенів, що належать адресі (`account`). Ця функція є гетером і не змінює стан контракту.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Стандарт ERC-20 дозволяє одній адресі надавати дозвіл іншій адресі на зняття з неї токенів. Цей гетер повертає кількість токенів, що залишилася, яку `spender` матиме дозвіл витратити від імені `owner`. Ця функція є гетером, не змінює стан контракту і за замовчуванням повинна повертати 0.

## Функції {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Здійснює переказ кількості (`amount`) токенів з адреси того, хто викликає функцію (`msg.sender`), на адресу одержувача. Ця функція генерує подію `Transfer`, визначену пізніше. Вона повертає `true`, якщо переказ був можливим.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Встановлює кількість (`allowance`), яку `spender` має дозвіл переказувати з балансу того, хто викликає функцію (`msg.sender`). Ця функція генерує подію Approval. Функція повертає значення, що вказує, чи було успішно встановлено дозвіл.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Здійснює переказ кількості (`amount`) токенів з `sender` на `recipient` за допомогою механізму дозволів. Потім ця кількість віднімається від дозволу того, хто викликає функцію. Ця функція генерує подію `Transfer`.

## Події {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Ця подія генерується, коли кількість токенів (`value`) надсилається з адреси `from` на адресу `to`.

У разі карбування нових токенів переказ зазвичай здійснюється з `from` адреси 0x00..0000, тоді як у разі спалювання токенів переказ здійснюється на `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Ця подія генерується, коли кількість токенів (`value`) схвалюється `owner` для використання `spender`.

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

Ще однією чудовою реалізацією стандарту токенів ERC-20 є [реалізація ERC-20 від ОупенЗеппелін](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).