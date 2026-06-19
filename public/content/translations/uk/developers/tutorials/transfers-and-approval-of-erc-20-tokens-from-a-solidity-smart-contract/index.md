---
title: Перекази та схвалення токенів ERC-20 зі смарт-контракту на Solidity
description: Створіть смарт-контракт DEX, який обробляє перекази та схвалення токенів ERC-20 за допомогою Solidity.
author: jdourlens
tags:
  - смарт-контракти
  - токени
  - solidity
  - erc-20
skill: intermediate
breadcrumb: Перекази ERC-20
lang: uk
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

У попередньому посібнику ми вивчали [анатомію токена ERC-20 у Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) на блокчейні Етеріум. У цій статті ми розглянемо, як можна використовувати смарт-контракт для взаємодії з токеном за допомогою мови Solidity.

Для цього смарт-контракту ми створимо справжню тестову децентралізовану біржу (DEX), де користувач зможе обмінювати етер на наш щойно розгорнутий [токен ERC-20](/developers/docs/standards/tokens/erc-20/).

Для цього посібника ми використаємо код, написаний у попередньому посібнику, як основу. Наша DEX створить екземпляр контракту у своєму конструкторі та виконуватиме такі операції:

- обмін токенів на етер
- обмін етеру на токени

Ми почнемо писати код нашої децентралізованої біржі з додавання простої кодової бази ERC-20:

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

Наш новий смарт-контракт DEX розгорне ERC-20 і отримає всі випущені токени:

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

Отже, тепер у нас є наша DEX, і їй доступний увесь резерв токенів. Контракт має дві функції:

- `buy`: Користувач може надіслати етер і отримати токени в обмін
- `sell`: Користувач може вирішити надіслати токени, щоб отримати етер назад

## Функція buy {#the-buy-function}

Давайте напишемо код функції buy. Спочатку нам потрібно буде перевірити кількість етеру, яку містить повідомлення, і переконатися, що контракт володіє достатньою кількістю токенів, а також що повідомлення містить певну кількість етеру. Якщо контракт має достатньо токенів, він надішле їх користувачеві та викличе подію `Bought`.

Зверніть увагу, що якщо ми викличемо функцію require у разі помилки, надісланий етер буде негайно повернуто користувачеві.

Щоб усе було просто, ми обмінюємо 1 токен на 1 Wei.

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

У разі успішної купівлі ми повинні побачити дві події в транзакції: подію токена `Transfer` та подію `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## Функція sell {#the-sell-function}

Функція, що відповідає за продаж, спочатку вимагатиме від користувача схвалити суму, заздалегідь викликавши функцію approve. Схвалення переказу вимагає, щоб користувач викликав токен ERC20Basic, екземпляр якого створено DEX. Цього можна досягти, спочатку викликавши функцію `token()` контракту DEX, щоб отримати адресу, за якою DEX розгорнула контракт ERC20Basic під назвою `token`. Потім ми створюємо екземпляр цього контракту в нашій сесії та викликаємо його функцію `approve`. Після цього ми можемо викликати функцію `sell` DEX і обміняти наші токени назад на етер. Наприклад, ось як це виглядає в інтерактивній сесії Brownie:

```python
#### Python в інтерактивній консолі Brownie...

# розгорнути DEX
dex = DEX.deploy({'from':account1})

# викликати функцію buy, щоб обміняти етер на токен
# 1e18 — це 1 етер, номінований у Wei
dex.buy({'from': account2, 1e18})

# отримати адресу розгортання для токена ERC-20
# який був розгорнутий під час створення контракту DEX
# dex.token() повертає розгорнуту адресу для токена
token = ERC20Basic.at(dex.token())

# викликати функцію схвалення токена
# схвалити адресу dex як витрачальника
# і скільки ваших токенів їй дозволено витрачати
token.approve(dex.address, 3e18, {'from':account2})

```

Потім, коли викликається функція sell, ми перевіримо, чи був успішним переказ з адреси відправника на адресу контракту, а потім надішлемо етер назад на адресу відправника.

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

Якщо все працює, ви повинні побачити 2 події (`Transfer` та `Sold`) у транзакції, а ваш баланс токенів і баланс етеру оновляться.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

З цього посібника ми дізналися, як перевіряти баланс і дозвіл токена ERC-20, а також як викликати `Transfer` та `TransferFrom` смарт-контракту ERC-20 за допомогою інтерфейсу.

Після здійснення транзакції у нас є посібник з JavaScript, щоб [дочекатися та отримати детальну інформацію про транзакції](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/), які були здійснені до вашого контракту, а також [посібник з декодування подій, згенерованих переказами токенів або будь-якими іншими подіями](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), за умови, що у вас є ABI.

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