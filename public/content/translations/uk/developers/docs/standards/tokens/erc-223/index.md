---
title: "Стандарт токенів ERC-223"
description: "Огляд стандарту взаємозамінних токенів ERC-223, як він працює, та порівняння з ERC-20."
lang: uk
---

## Вступ {#introduction}

### Що таке ERC-223? {#what-is-erc223}

ERC-223 — це стандарт для взаємозамінних токенів, подібний до стандарту ERC-20. Головна відмінність полягає в тому, що ERC-223 визначає не лише API токена, але й логіку переказу токенів від відправника до одержувача. Він запроваджує модель комунікації, яка дозволяє обробляти перекази токенів на стороні одержувача.

### Відмінності від ERC-20 {#erc20-differences}

ERC-223 усуває деякі обмеження ERC-20 і запроваджує новий метод взаємодії між контрактом токена та контрактом, який може отримувати токени. Є кілька речей, які можливі з ERC-223, але неможливі з ERC-20:

- Обробка переказу токенів на стороні одержувача: одержувачі можуть виявляти, що токен ERC-223 був внесений.
- Відхилення неправильно надісланих токенів: якщо користувач надсилає токени ERC-223 на контракт, який не повинен отримувати токени, контракт може відхилити транзакцію, запобігаючи втраті токенів.
- Метадані в переказах: токени ERC-223 можуть містити метадані, що дозволяє додавати довільну інформацію до транзакцій токенів.

## Передумови {#prerequisites}

- [Акаунти](/developers/docs/accounts)
- [Смарт-контракти](/developers/docs/smart-contracts/)
- [Стандарти токенів](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Основна частина {#body}

ERC-223 — це стандарт токенів, який реалізує API для токенів у смарт-контрактах. Він також оголошує API для контрактів, які повинні отримувати токени ERC-223. Контракти, які не підтримують API одержувача ERC-223, не можуть отримувати токени ERC-223, що запобігає помилкам користувачів.

Якщо смарт-контракт реалізує наступні методи та події, його можна назвати сумісним із ERC-223 контрактом токена. Після розгортання він відповідатиме за відстеження створених токенів в Етеріумі.

Контракт не зобов'язаний мати лише ці функції, і розробник може додати до цього контракту будь-яку іншу функцію з різних стандартів токенів. Наприклад, функції `approve` та `transferFrom` не є частиною стандарту ERC-223, але ці функції можуть бути реалізовані за необхідності.

З [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Методи {#methods}

Токен ERC-223 повинен реалізовувати наступні методи:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Контракт, який повинен отримувати токени ERC-223, має реалізовувати наступний метод:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Якщо токени ERC-223 надсилаються на контракт, який не реалізує функцію `tokenReceived(..)`, переказ має завершитися невдачею, а токени не повинні списуватися з балансу відправника.

### Події {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Приклади {#examples}

API токена ERC-223 подібний до API ERC-20, тому з точки зору розробки інтерфейсу користувача (UI) немає жодної різниці. Єдиним винятком є те, що токени ERC-223 можуть не мати функцій `approve` + `transferFrom`, оскільки вони є необов'язковими для цього стандарту.

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

Тепер ми хочемо, щоб інший контракт приймав депозити `tokenA`, припускаючи, що tokenA є токеном ERC-223. Контракт повинен приймати лише tokenA і відхиляти будь-які інші токени. Коли контракт отримує tokenA, він повинен генерувати подію `Deposit()` та збільшувати значення внутрішньої змінної `deposits`.

Ось код:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Єдиний токен, який ми хочемо приймати.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Важливо розуміти, що в межах цієї функції
        // msg.sender — це адреса токена, який отримується,
        // msg.value завжди дорівнює 0, оскільки контракт токена не володіє та не надсилає етер у більшості випадків,
        // _from — це відправник переказу токена,
        // _value — це кількість токенів, яка була внесена.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Часті запитання {#faq}

### Що станеться, якщо ми надішлемо якийсь tokenB на контракт? {#sending-tokens}

Транзакція завершиться невдачею, і переказ токенів не відбудеться. Токени будуть повернуті на адресу відправника.

### Як ми можемо зробити депозит на цей контракт? {#contract-deposits}

Викличте функцію `transfer(address,uint256)` або `transfer(address,uint256,bytes)` токена ERC-223, вказавши адресу `RecipientContract`.

### Що станеться, якщо ми перекажемо токен ERC-20 на цей контракт? {#erc-20-transfers}

Якщо токен ERC-20 буде надіслано на `RecipientContract`, токени будуть переказані, але переказ не буде розпізнано (подія `Deposit()` не буде згенерована, а значення депозитів не зміниться). Небажані депозити ERC-20 неможливо відфільтрувати або запобігти їм.

### Що робити, якщо ми хочемо виконати певну функцію після завершення депозиту токенів? {#function-execution}

Існує кілька способів зробити це. У цьому прикладі ми будемо дотримуватися методу, який робить перекази ERC-223 ідентичними до переказів етеру:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Єдиний токен, який ми хочемо приймати.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Обробити вхідну транзакцію та виконати подальший виклик функції.
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

Коли `RecipientContract` отримає токен ERC-223, контракт виконає функцію, закодовану як параметр `_data` транзакції токена, ідентично тому, як транзакції етеру кодують виклики функцій як `data` транзакції. Прочитайте про [поле даних](/developers/docs/transactions/#the-data-field) для отримання додаткової інформації.

У наведеному вище прикладі токен ERC-223 має бути переказаний на адресу `RecipientContract` за допомогою функції `transfer(address,uin256,bytes calldata _data)`. Якщо параметр даних буде `0xc2985578` (підпис функції `foo()`), тоді функція foo() буде викликана після отримання депозиту токенів, і буде згенерована подія Foo().

Параметри також можуть бути закодовані в `data` переказу токенів, наприклад, ми можемо викликати функцію bar() зі значенням 12345 для `_someNumber`. У цьому випадку `data` має бути `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`, де `0x0423a132` — це підпис функції `bar(uint256)`, а `00000000000000000000000000000000000000000000000000000000000004d2` — це 12345 як uint256.

## Обмеження {#limitations}

Хоча ERC-223 вирішує кілька проблем, виявлених у стандарті ERC-20, він не позбавлений власних обмежень:

- Впровадження та сумісність: ERC-223 ще не набув широкого поширення, що може обмежити його сумісність з існуючими інструментами та платформами.
- Зворотна сумісність: ERC-223 не має зворотної сумісності з ERC-20, що означає, що існуючі контракти та інструменти ERC-20 не працюватимуть з токенами ERC-223 без модифікацій.
- Витрати на газ: додаткові перевірки та функціональні можливості в переказах ERC-223 можуть призвести до вищих витрат на газ порівняно з транзакціями ERC-20.

## Додаткові матеріали {#further-reading}

- [EIP-223: Стандарт токенів ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Початкова пропозиція ERC-223](https://github.com/ethereum/eips/issues/223)