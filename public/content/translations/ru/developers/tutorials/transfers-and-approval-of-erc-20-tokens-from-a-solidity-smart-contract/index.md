---
title: "Переводы и одобрение токенов ERC-20 из смарт-контракта на Solidity"
description: "Создание смарт-контракта DEX, который обрабатывает переводы и одобрения токенов ERC-20 с использованием Solidity."
author: jdourlens
tags:
  - смарт-контракты
  - токены
  - solidity
  - erc-20
skill: intermediate
breadcrumb: "Переводы ERC-20"
lang: ru
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

В предыдущем руководстве мы изучили [анатомию токена ERC-20 на Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) в блокчейне Эфириума. В этой статье мы посмотрим, как можно использовать смарт-контракт для взаимодействия с токеном с помощью языка Solidity.

Для этого смарт-контракта мы создадим настоящую учебную децентрализованную биржу (DEX), где пользователь сможет обменивать эфир на наш недавно развернутый [токен ERC-20](/developers/docs/standards/tokens/erc-20/).

В этом руководстве мы будем использовать код, написанный в предыдущем руководстве, в качестве основы. Наша DEX создаст экземпляр контракта в своем конструкторе и будет выполнять следующие операции:

- обмен токенов на эфир
- обмен эфира на токены

Мы начнем писать код нашей децентрализованной биржи с добавления простой кодовой базы ERC-20:

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

Наш новый смарт-контракт DEX развернет ERC-20 и получит все выпущенные токены:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

Итак, теперь у нас есть наша DEX, и ей доступен весь резерв токенов. Контракт имеет две функции:

- `buy`: Пользователь может отправить эфир и получить взамен токены
- `sell`: Пользователь может решить отправить токены, чтобы получить эфир обратно

## Функция покупки (buy) {#the-buy-function}

Давайте напишем функцию покупки. Сначала нам нужно будет проверить количество эфира, которое содержит сообщение, и убедиться, что контракт владеет достаточным количеством токенов, а также что в сообщении есть немного эфира. Если контракт владеет достаточным количеством токенов, он отправит это количество токенов пользователю и сгенерирует событие `Bought`.

Обратите внимание, что если мы вызовем оператор require, то в случае ошибки транзакция откатится, а отправленный эфир будет возвращен пользователю.

Для простоты мы просто обмениваем 1 токен на 1 Wei.

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

В случае успешной покупки мы должны увидеть два события в транзакции: `Transfer` токена и событие `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## Функция продажи (sell) {#the-sell-function}

Функция, отвечающая за продажу, сначала потребует от пользователя предварительно одобрить сумму, вызвав функцию approve. Одобрение перевода требует, чтобы пользователь вызвал токен ERC20Basic, экземпляр которого создан DEX. Этого можно достичь, сначала вызвав функцию `token()` контракта DEX, чтобы получить адрес, по которому DEX развернула контракт ERC20Basic под названием `token`. Затем мы создаем экземпляр этого контракта в нашей сессии и вызываем его функцию `approve`. После этого мы сможем вызвать функцию `sell` контракта DEX и обменять наши токены обратно на эфир. Например, вот как это выглядит в интерактивной сессии Brownie:

```python
#### Python в интерактивной консоли Brownie...

# развернуть DEX
dex = DEX.deploy({'from':account1})

# вызвать функцию buy, чтобы обменять эфир на токен
# 1e18 — это 1 эфир, номинированный в Wei
dex.buy({'from': account2, 1e18})

# получить адрес развертывания токена ERC-20
# который был развернут во время создания контракта DEX
# dex.token() возвращает развернутый адрес токена
token = ERC20Basic.at(dex.token())

# вызвать функцию approve токена
# одобрить адрес dex в качестве spender
# и сколько ваших токенов ему разрешено потратить
token.approve(dex.address, 3e18, {'from':account2})

```

Затем, когда вызывается функция продажи, мы проверим, был ли успешен перевод с адреса вызывающей стороны на адрес контракта, а затем отправим эфир обратно на адрес вызывающей стороны.

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

Если все работает, вы должны увидеть 2 события (`Transfer` и `Sold`) в транзакции, а ваш баланс токенов и баланс эфира обновятся.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

Из этого руководства мы узнали, как проверять баланс и разрешение токена ERC-20, а также как вызывать `Transfer` и `TransferFrom` смарт-контракта ERC-20 с использованием интерфейса.

После того как вы совершите транзакцию, у нас есть руководство по JavaScript о том, как [дождаться и получить подробную информацию о транзакциях](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/), которые были выполнены в вашем контракте, а также [руководство по декодированию событий, сгенерированных переводами токенов или любыми другими событиями](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), при условии, что у вас есть ABI.

Вот полный код для этого руководства:

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