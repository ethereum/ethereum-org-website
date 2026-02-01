---
title: Перекази та схвалення токенів ERC-20 зі смарт-контракту Solidity
description: Створіть смарт-контракт DEX, який обробляє перекази та схвалення токенів ERC-20 з використанням Solidity.
author: "jdourlens"
tags:
  [
    "Смарт-контракти",
    "токени, лексеми",
    "мова програмування",
    "erc-20"
  ]
skill: intermediate
lang: uk
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

У попередньому посібнику ми вивчили [анатомію токена ERC-20 на Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) на блокчейні Ethereum. У цій статті ми розглянемо, як можна використовувати смарт-контракт для взаємодії з токеном за допомогою мови Solidity.

Для цього смарт-контракту ми створимо просту демонстраційну децентралізовану біржу, де користувач зможе обмінювати ефір на наш щойно розгорнутий [токен ERC-20](/developers/docs/standards/tokens/erc-20/).

Для цього посібника ми використаємо код, який ми написали в попередньому посібнику, як основу. Наша DEX створить екземпляр контракту у своєму конструкторі та виконуватиме такі операції:

- обмін токенів на ефір
- обмін ефіру на токени

Розпочнемо код нашої децентралізованої біржі, додавши нашу просту кодову базу ERC20:

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

Наш новий смарт-контракт DEX розгорне ERC-20 і отримає всю пропозицію токенів:

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

Отже, тепер у нас є наша DEX, і вона має в наявності весь резерв токенів. Контракт має дві функції:

- `buy`: користувач може надсилати ефір і отримувати токени в обмін
- `sell`: користувач може надіслати токени, щоб отримати ефір назад

## Функція buy {#the-buy-function}

Напишемо код для функції `buy`. Спочатку нам потрібно буде перевірити кількість ефіру, яку містить повідомлення, і переконатися, що контракт володіє достатньою кількістю токенів, а також що повідомлення містить певну кількість ефіру. Якщо контракт володіє достатньою кількістю токенів, він надішле відповідну кількість токенів користувачеві та ініціює подію `Bought`.

Зверніть увагу, що якщо ми викликаємо функцію `require`, у разі помилки надісланий ефір буде негайно скасовано, а кошти повернуто користувачеві.

Для простоти ми просто обмінюємо 1 токен на 1 Wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Ви повинні надіслати трохи ефіру");
    require(amountTobuy <= dexBalance, "Недостатньо токенів у резерві");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

У разі успішної купівлі ми повинні побачити дві події в транзакції: `Transfer` токена та подію `Bought`.

![Дві події в транзакції: Transfer і Bought](./transfer-and-bought-events.png)

## Функція sell {#the-sell-function}

Функція, що відповідає за продаж, спершу вимагатиме, щоб користувач схвалив суму, викликавши заздалегідь функцію `approve`. Схвалення переказу вимагає, щоб користувач викликав функцію на токені ERC20Basic, екземпляр якого було створено за допомогою DEX. Цього можна досягти, спершу викликавши функцію `token()` контракту DEX, щоб отримати адресу, за якою DEX розгорнув контракт ERC20Basic під назвою `token`. Потім ми створюємо екземпляр цього контракту в нашій сесії та викликаємо його функцію `approve`. Після цього ми зможемо викликати функцію `sell` контракту DEX і обміняти наші токени назад на ефір. Наприклад, ось як це виглядає в інтерактивній сесії brownie:

```python
#### Python в інтерактивній консолі brownie...

# розгортаємо DEX
dex = DEX.deploy({'from':account1})

# викликаємо функцію buy, щоб обміняти ефір на токен
# 1e18 — це 1 ефір, виражений у wei
dex.buy({'from': account2, 1e18})

# отримуємо адресу розгортання токена ERC20
# який було розгорнуто під час створення контракту DEX
# dex.token() повертає адресу розгорнутого токена
token = ERC20Basic.at(dex.token())

# викликаємо функцію approve токена
# схвалюємо адресу dex як витратника
# і вказуємо, скільки ваших токенів дозволено витратити
token.approve(dex.address, 3e18, {'from':account2})

```

Потім, коли викликається функція `sell`, ми перевіримо, чи успішним був переказ з адреси викликаючого на адресу контракту, і після цього надішлемо ефір назад на адресу викликаючого.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Ви повинні продати хоча б кілька токенів");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Перевірте дозвіл на використання токенів");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Якщо все спрацює, ви повинні побачити 2 події (`Transfer` і `Sold`) у транзакції, а також оновлення вашого балансу токенів та ефіру.

![Дві події в транзакції: Transfer і Sold](./transfer-and-sold-events.png)

<Divider />

З цього посібника ми дізналися, як перевіряти баланс і дозвіл токена ERC-20, а також як викликати `Transfer` і `TransferFrom` смарт-контракту ERC20 за допомогою інтерфейсу.

Після того, як ви здійсните транзакцію, у нас є посібник з JavaScript про те, як [очікувати та отримувати відомості про транзакції](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/), які були зроблені з вашим контрактом, а також [посібник із декодування подій, згенерованих передачами токенів або будь-якими іншими подіями](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), за умови, що у вас є ABI.

Ось повний код для цього посібника:

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
        require(amountTobuy > 0, "Ви повинні надіслати трохи ефіру");
        require(amountTobuy <= dexBalance, "Недостатньо токенів у резерві");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Ви повинні продати хоча б кілька токенів");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Перевірте дозвіл на використання токенів");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
