---
title: Переводы и подтверждение токенов ERC-20 из умного контракта Solidity
description: Создайте умный контракт DEX, который обрабатывает переводы и подтверждения токенов ERC-20 с использованием Solidity.
author: "jdourlens"
tags: [ "Умные контракты", "токенов", "твердость", "erc-20" ]
skill: intermediate
lang: ru
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

В предыдущем руководстве мы изучили [анатомию токена ERC-20 в Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) в блокчейне Ethereum. В этой статье мы рассмотрим, как можно использовать умный контракт для взаимодействия с токеном с помощью языка Solidity.

Для этого умного контракта мы создадим настоящую учебную децентрализованную биржу, где пользователь сможет обменять эфир на наш недавно развернутый [токен ERC-20](/developers/docs/standards/tokens/erc-20/).

Для этого руководства мы будем использовать в качестве основы код, который мы написали в предыдущем руководстве. Наш DEX будет создавать экземпляр контракта в своем конструкторе и выполнять следующие операции:

- обмен токенов на эфир
- обмен эфира на токены

Мы начнем писать код нашей децентрализованной биржи, добавив нашу простую кодовую базу ERC20:

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

Наш новый умный контракт DEX развернет ERC-20 и получит все созданные токены:

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

Итак, теперь у нас есть наш DEX, и у него в наличии весь резерв токенов. У контракта есть две функции:

- `buy`: пользователь может отправить эфир и получить взамен токены
- `sell`: пользователь может отправить токены, чтобы получить обратно эфир

## Функция buy {#the-buy-function}

Давайте напишем код для функции buy. Сначала нам нужно будет проверить количество эфира, которое содержит сообщение, и убедиться, что у контракта достаточно токенов и что в сообщении есть некоторое количество эфира. Если у контракта достаточно токенов, он отправит их пользователю и сгенерирует событие `Bought`.

Обратите внимание, что если мы вызовем функцию require в случае ошибки, отправленный эфир будет немедленно возвращен пользователю.

Для простоты мы обмениваем 1 токен на 1 wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Нужно отправить немного эфира");
    require(amountTobuy <= dexBalance, "Недостаточно токенов в резерве");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

В случае успешной покупки мы должны увидеть в транзакции два события: `Transfer` токена и `Bought`.

![Два события в транзакции: Transfer и Bought](./transfer-and-bought-events.png)

## Функция sell {#the-sell-function}

Функция, отвечающая за продажу, сначала потребует от пользователя предварительно подтвердить сумму, вызвав функцию approve. Подтверждение перевода требует, чтобы пользователь вызвал контракт токена ERC20Basic, экземпляр которого был создан DEX. Этого можно достичь, сначала вызвав функцию `token()` контракта DEX, чтобы получить адрес, по которому DEX развернул контракт ERC20Basic, названный `token`. Затем мы создаем экземпляр этого контракта в нашей сессии и вызываем его функцию `approve`. Затем мы можем вызвать функцию `sell` контракта DEX и обменять наши токены обратно на эфир. Например, вот как это выглядит в интерактивной сессии brownie:

```python
#### Python в интерактивной консоли brownie...

# развертываем DEX
dex = DEX.deploy({'from':account1})

# вызываем функцию buy для обмена эфира на токен
# 1e18 — это 1 эфир, выраженный в wei
dex.buy({'from': account2, 1e18})

# получаем адрес развертывания токена ERC20
# который был развернут во время создания контракта DEX
# dex.token() возвращает адрес развернутого токена
token = ERC20Basic.at(dex.token())

# вызываем функцию approve токена
# подтверждаем адрес dex в качестве расходующего
# и сколько ваших токенов ему разрешено потратить
token.approve(dex.address, 3e18, {'from':account2})

```

Затем, когда вызывается функция sell, мы проверим, был ли успешным перевод с адреса вызывающего на адрес контракта, а затем отправим эфир обратно на адрес вызывающего.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Вы должны продать хотя бы несколько токенов");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Проверьте разрешенное количество токенов");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Если все сработает, вы должны увидеть в транзакции 2 события (`Transfer` и `Sold`), а также обновленные балансы токенов и эфира.

![Два события в транзакции: Transfer и Sold](./transfer-and-sold-events.png)

<Divider />

Из этого руководства мы узнали, как проверять баланс и разрешенное количество для токена ERC-20, а также как вызывать `Transfer` и `TransferFrom` смарт-контракта ERC20 с помощью интерфейса.

После того как вы совершите транзакцию, у нас есть руководство по JavaScript о том, как [ожидать и получать сведения о транзакциях](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/), которые были совершены с вашим контрактом, и [руководство по декодированию событий, сгенерированных переводами токенов или любыми другими событиями](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), если у вас есть ABI.

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
        require(amountTobuy > 0, "Нужно отправить немного эфира");
        require(amountTobuy <= dexBalance, "Недостаточно токенов в резерве");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Вы должны продать хотя бы несколько токенов");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Проверьте разрешенное количество токенов");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
