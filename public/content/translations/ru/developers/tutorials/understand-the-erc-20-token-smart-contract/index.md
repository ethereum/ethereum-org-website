---
title: "Понимание смарт-контракта токена ERC-20"
description: "Узнайте, как реализовать стандарт токена ERC-20, с полным примером смарт-контракта на Solidity и объяснением."
author: jdourlens
tags:
  - смарт-контракты
  - токены
  - solidity
  - erc-20
skill: beginner
breadcrumb: "Основы токена ERC-20"
lang: ru
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Один из самых значимых [стандартов смарт-контрактов](/developers/docs/standards/) в Эфириуме известен как [ERC-20](/developers/docs/standards/tokens/erc-20/), который стал техническим стандартом, используемым для всех смарт-контрактов в блокчейне Эфириума для реализации взаимозаменяемых токенов.

ERC-20 определяет общий список правил, которых должны придерживаться все взаимозаменяемые токены Эфириума. Следовательно, этот стандарт токенов позволяет разработчикам всех типов точно прогнозировать, как новые токены будут функционировать в более широкой системе Эфириума. Это упрощает и облегчает задачи разработчиков, поскольку они могут продолжать свою работу, зная, что каждый новый проект не нужно будет переделывать каждый раз при выпуске нового токена, при условии, что токен следует правилам.

Здесь в виде интерфейса представлены функции, которые должен реализовывать ERC-20. Если вы не уверены, что такое интерфейс, ознакомьтесь с нашей статьей об [ООП-программировании на Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Ниже приведено построчное объяснение того, для чего нужна каждая функция. После этого мы представим простую реализацию токена ERC-20.

## Геттеры {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Возвращает количество существующих токенов. Эта функция является геттером и не изменяет состояние контракта. Имейте в виду, что в Solidity нет чисел с плавающей запятой. Поэтому большинство токенов используют 18 десятичных знаков и будут возвращать общее предложение и другие результаты в виде 1000000000000000000 для 1 токена. Не каждый токен имеет 18 десятичных знаков, и за этим действительно нужно следить при работе с токенами.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Возвращает количество токенов, принадлежащих адресу (`account`). Эта функция является геттером и не изменяет состояние контракта.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Стандарт ERC-20 позволяет одному адресу выдавать разрешение другому адресу на снятие с него токенов. Этот геттер возвращает оставшееся количество токенов, которое `spender` сможет потратить от имени `owner`. Эта функция является геттером, не изменяет состояние контракта и по умолчанию должна возвращать 0.

## Функции {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Переводит количество токенов `amount` с адреса вызывающего функцию (`msg.sender`) на адрес получателя. Эта функция генерирует событие `Transfer`, определенное позже. Она возвращает `true`, если перевод был возможен.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Устанавливает количество `allowance`, которое `spender` разрешено переводить с баланса вызывающего функцию (`msg.sender`). Эта функция генерирует событие `Approval`. Функция возвращает логическое значение, указывающее, было ли успешно установлено разрешение.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Переводит количество токенов `amount` от `sender` к `recipient` с использованием механизма разрешений. Затем сумма вычитается из разрешения вызывающего. Эта функция генерирует событие `Transfer`.

## События {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Это событие генерируется, когда количество токенов (`value`) отправляется с адреса `from` на адрес `to`.

В случае чеканки новых токенов перевод обычно идет `from` адреса 0x00..0000, тогда как в случае, когда нужно сжигать токены, перевод идет `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Это событие генерируется, когда количество токенов (`value`) одобряется `owner` для использования со стороны `spender`.

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

Еще одной отличной реализацией стандарта токенов ERC-20 является [реализация ERC-20 от ОпенЗеппелин](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).