---
title: "Стандарт Токену ERC-223"
description: "Огляд стандарту взаємозамінних токенів ERC-223, принципи його роботи та порівняння з ERC-20."
lang: uk
---

## Вступ {#introduction}

### Що таке ERC-223? {#what-is-erc223}

ERC-223 — це стандарт для взаємозамінних токенів, схожий на стандарт ERC-20. Ключова відмінність полягає в тому, що ERC-223 визначає не тільки API токенів, але й логіку переказу токенів від відправника до одержувача. Він запроваджує комунікаційну модель, яка дозволяє обробляти перекази токенів на боці одержувача.

### Відмінності від ERC-20 {#erc20-differences}

ERC-223 вирішує деякі обмеження ERC-20 та запроваджує новий метод взаємодії між контрактом токена та контрактом, який може отримувати токени. Є кілька речей, які можливі з ERC-223, але не з ERC-20:

- Обробка переказу токенів на боці одержувача: одержувачі можуть виявити, що токен ERC-223 було депоновано.
- Відхилення неправильно надісланих токенів: якщо користувач надсилає токени ERC-223 на контракт, який не призначений для їх отримання, контракт може відхилити транзакцію, запобігаючи втраті токенів.
- Метадані в переказах: токени ERC-223 можуть містити метадані, що дозволяє додавати довільну інформацію до транзакцій з токенами.

## Передумови {#prerequisites}

- [Облікові записи](/developers/docs/accounts)
- [Смарт-контракти](/developers/docs/smart-contracts/)
- [Стандарти токенів](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Основна частина {#body}

ERC-223 — це стандарт токенів, який реалізує API для токенів у смарт-контрактах. Він також оголошує API для контрактів, які призначені для отримання токенів ERC-223. Контракти, які не підтримують API одержувача ERC-223, не можуть отримувати токени ERC-223, що запобігає помилці користувача.

Якщо смарт-контракт реалізує наступні методи та події, його можна назвати контрактом токенів, сумісним з ERC-223. Після розгортання
він відповідатиме за відстеження створених токенів в Ethereum.

Контракт не зобов’язаний мати лише ці функції, і розробник може додати будь-яку іншу функцію з різних стандартів токенів до цього контракту. Наприклад, функції `approve` та `transferFrom` не є частиною стандарту ERC-223, але ці функції можуть бути реалізовані за потреби.

З [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Методи {#methods}

Токен ERC-223 повинен реалізовувати такі методи:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Контракт, призначений для отримання токенів ERC-223, повинен реалізовувати наступний метод:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Якщо токени ERC-223 надсилаються на контракт, який не реалізує функцію `tokenReceived(..)`, тоді переказ має завершитися невдачею, і токени не повинні бути списані з балансу відправника.

### Події {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Приклади {#examples}

API токена ERC-223 схожий на API ERC-20, тому з точки зору розробки UI різниці немає. Єдиний виняток полягає в тому, що токени ERC-223 можуть не мати функцій `approve` + `transferFrom`, оскільки вони не є обов’язковими для цього стандарту.

#### Приклади на Solidity {#solidity-example}

Наступний приклад ілюструє, як працює базовий контракт токена ERC-223:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Тепер ми хочемо, щоб інший контракт приймав депозити `tokenA`, припускаючи, що tokenA є токеном ERC-223. Контракт повинен приймати лише tokenA і відхиляти будь-які інші токени. Коли контракт отримує tokenA, він повинен генерувати подію `Deposit()` і збільшувати значення внутрішньої змінної `deposits`.

Ось код:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Єдиний токен, який ми хочемо приймати.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Важливо розуміти, що в цій функції
        // msg.sender — це адреса токена, який отримується,
        // msg.value завжди дорівнює 0, оскільки контракт токена не володіє і не надсилає ether у більшості випадків,
        // _from      — відправник переказу токена,
        // _value     — це кількість токенів, які були депоновані.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Поширені запитання {#faq}

### Що станеться, якщо ми відправимо якийсь tokenB на контракт? {#sending-tokens}

Транзакція завершиться невдачею, і переказ токенів не відбудеться. Токени будуть повернуті на адресу відправника.

### Як ми можемо зробити депозит на цей контракт? {#contract-deposits}

Викличте функцію `transfer(address,uint256)` або `transfer(address,uint256,bytes)` токена ERC-223, вказавши адресу `RecipientContract`.

### Що станеться, якщо ми перекажемо токен ERC-20 на цей контракт? {#erc-20-transfers}

Якщо токен ERC-20 буде надіслано на `RecipientContract`, токени будуть переказані, але переказ не буде розпізнано (подія `Deposit()` не буде ініційована, а значення депозитів не зміниться). Небажані депозити ERC-20 неможливо відфільтрувати або запобігти їм.

### Що робити, якщо ми хочемо виконати якусь функцію після завершення депозиту токена? {#function-execution}

Існує кілька способів це зробити. У цьому прикладі ми будемо слідувати методу, який робить перекази ERC-223 ідентичними до переказів ether:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Єдиний токен, який ми хочемо приймати.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Обробка вхідної транзакції та виконання подальшого виклику функції.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

Коли `RecipientContract` отримає токен ERC-223, контракт виконає функцію, закодовану як параметр `_data` транзакції токена, ідентично тому, як транзакції ether кодують виклики функцій як `data` транзакції. Прочитайте [поле даних](/developers/docs/transactions/#the-data-field) для отримання додаткової інформації.

У наведеному вище прикладі токен ERC-223 має бути переказаний на адресу `RecipientContract` за допомогою функції `transfer(address,uin256,bytes calldata _data)`. Якщо параметр даних буде `0xc2985578` (сигнатура функції `foo()`), тоді функція foo() буде викликана після отримання депозиту токена, і буде ініційовано подію Foo().

Параметри також можна закодувати в `data` переказу токенів, наприклад, ми можемо викликати функцію bar() зі значенням 12345 для `_someNumber`. У цьому випадку `data` має бути `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`, де `0x0423a132` — це сигнатура функції `bar(uint256)`, а `00000000000000000000000000000000000000000000000000000000000004d2` — це 12345 як uint256.

## Обмеження {#limitations}

Хоча ERC-223 вирішує кілька проблем, виявлених у стандарті ERC-20, він не позбавлений власних обмежень:

- Впровадження та сумісність: ERC-223 ще не набув широкого поширення, що може обмежувати його сумісність з існуючими інструментами та платформами.
- Зворотна сумісність: ERC-223 не має зворотної сумісності з ERC-20, це означає, що існуючі контракти та інструменти ERC-20 не працюватимуть із токенами ERC-223 без модифікацій.
- Витрати на газ: додаткові перевірки та функціонал у переказах ERC-223 можуть призвести до вищих витрат на газ порівняно з транзакціями ERC-20.

## Для подальшого читання {#further-reading}

- [EIP-223: стандарт токенів ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Початкова пропозиція ERC-223](https://github.com/ethereum/eips/issues/223)
