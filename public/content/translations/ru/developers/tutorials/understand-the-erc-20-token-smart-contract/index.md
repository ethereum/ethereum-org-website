---
title: "Понимание смарт-контракта токена ERC-20"
description: "Узнайте, как реализовать стандарт токенов ERC-20, на полном примере и с объяснением смарт-контракта на языке Solidity."
author: "jdourlens"
tags: [ "Умные контракты", "токенов", "твердость", "erc-20" ]
skill: beginner
lang: ru
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Один из наиболее важных [стандартов смарт-контрактов](/developers/docs/standards/) в Ethereum известен как [ERC-20](/developers/docs/standards/tokens/erc-20/), который стал техническим стандартом, используемым для всех смарт-контрактов в блокчейне Ethereum для реализации взаимозаменяемых токенов.

ERC-20 определяет общий список правил, которым должны соответствовать все взаимозаменяемые токены Ethereum. Следовательно, этот стандарт токенов позволяет разработчикам всех типов точно предсказывать, как новые токены будут функционировать в более крупной системе Ethereum. Это упрощает и облегчает задачи разработчиков, потому что они могут продолжать свою работу, зная, что им не придется переделывать каждый новый проект при выпуске нового токена, если он соответствует правилам.

Ниже в виде интерфейса представлены функции, которые должен реализовывать ERC-20. Если вы не знаете, что такое интерфейс, прочтите нашу статью об [объектно-ориентированном программировании в Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Ниже приведено построчное объяснение назначения каждой функции. После этого мы представим простую реализацию токена ERC-20.

## Геттеры {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Возвращает количество существующих токенов. Эта функция является геттером и не изменяет состояние контракта. Имейте в виду, что в Solidity нет чисел с плавающей запятой. Поэтому в большинстве токенов используется 18 десятичных знаков, и общее предложение и другие результаты будут возвращаться в следующем виде: 1000000000000000000 для 1 токена. Не у каждого токена 18 десятичных знаков, и на это действительно нужно обращать внимание при работе с токенами.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Возвращает количество токенов, принадлежащих адресу (`account`). Эта функция является геттером и не изменяет состояние контракта.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Стандарт ERC-20 позволяет адресу предоставить разрешение другому адресу на получение с него токенов. Этот геттер возвращает оставшееся количество токенов, которые `spender` сможет потратить от имени `owner`. Эта функция является геттером, не изменяет состояние контракта и по умолчанию должна возвращать 0.

## Функции {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Перемещает `amount` токенов с адреса вызывающего функцию (`msg.sender`) на адрес получателя. Эта функция генерирует событие `Transfer`, которое будет определено позже. Возвращает true, если перевод был возможен.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Устанавливает `allowance` — количество токенов, которое `spender` может перевести с баланса вызывающего функцию (`msg.sender`). Эта функция генерирует событие `Approval`. Функция возвращает значение, указывающее, было ли разрешение успешно установлено.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Перемещает `amount` токенов от `sender` к `recipient` с помощью механизма разрешений. Затем `amount` вычитается из разрешенной суммы (allowance) для вызывающего. Эта функция генерирует событие `Transfer`.

## События {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Это событие генерируется, когда определенное количество (`value`) токенов отправляется с адреса `from` на адрес `to`.

В случае выпуска новых токенов перевод обычно происходит `from` нулевого адреса (0x00..0000), а в случае сжигания токенов перевод происходит `to` нулевой адрес (0x00..0000).

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Это событие генерируется, когда определенное количество (`value`) токенов одобрено `owner` для использования `spender`.

## Базовая реализация токенов ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Вот самый простой код, который можно взять за основу для вашего токена ERC-20:

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

Другой отличной реализацией стандарта токенов ERC-20 является [реализация ERC-20 от OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
