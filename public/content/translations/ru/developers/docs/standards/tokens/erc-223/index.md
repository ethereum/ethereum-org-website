---
title: "Стандарт токенов ERC-223"
description: "Обзор стандарта взаимозаменяемых токенов ERC-223, принцип его работы и сравнение с ERC-20."
lang: ru
---

## Введение {#introduction}

### Что такое ERC-223? {#what-is-erc223}

ERC-223 — это стандарт взаимозаменяемых токенов, аналогичный стандарту ERC-20. Ключевое отличие заключается в том, что ERC-223 определяет не только API токена, но и логику перевода токенов от отправителя к получателю. Он представляет модель связи, которая позволяет обрабатывать переводы токенов на стороне получателя.

### Отличия от ERC-20 {#erc20-differences}

ERC-223 устраняет некоторые ограничения ERC-20 и представляет новый метод взаимодействия между контрактом токена и контрактом, который может получать токены. Есть несколько вещей, которые возможны с ERC-223, но не с ERC-20:

- Обработка перевода токенов на стороне получателя: получатели могут обнаружить, что вносится токен ERC-223.
- Отклонение неправильно отправленных токенов: если пользователь отправляет токены ERC-223 на контракт, который не должен получать токены, контракт может отклонить транзакцию, предотвращая потерю токенов.
- Метаданные в переводах: токены ERC-223 могут включать метаданные, что позволяет прикреплять произвольную информацию к транзакциям токенов.

## Предварительные требования {#prerequisites}

- [Аккаунты](/developers/docs/accounts)
- [Смарт-контракты](/developers/docs/smart-contracts/)
- [Стандарты токенов](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Основная часть {#body}

ERC-223 — это стандарт токенов, который реализует API для токенов внутри смарт-контрактов. Он также объявляет API для контрактов, которые должны получать токены ERC-223. Контракты, не поддерживающие API получателя ERC-223, не могут получать токены ERC-223, что предотвращает ошибки пользователей.

Если смарт-контракт реализует следующие методы и события, его можно назвать совместимым с ERC-223 контрактом токена. После развертывания он будет отвечать за отслеживание созданных токенов в Эфириуме.

Контракт не обязан иметь только эти функции, и разработчик может добавить в этот контракт любую другую функцию из различных стандартов токенов. Например, функции `approve` и `transferFrom` не являются частью стандарта ERC-223, но эти функции могут быть реализованы в случае необходимости.

Из [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Методы {#methods}

Токен ERC-223 должен реализовывать следующие методы:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Контракт, который должен получать токены ERC-223, должен реализовывать следующий метод:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Если токены ERC-223 отправляются на контракт, который не реализует функцию `tokenReceived(..)`, то перевод должен завершиться ошибкой, а токены не должны списываться с баланса отправителя.

### События {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Примеры {#examples}

API токена ERC-223 аналогичен API ERC-20, поэтому с точки зрения разработки пользовательского интерфейса разницы нет. Единственным исключением здесь является то, что токены ERC-223 могут не иметь функций `approve` + `transferFrom`, поскольку они являются необязательными для этого стандарта.

#### Примеры на Solidity {#solidity-example}

Следующий пример иллюстрирует, как работает базовый контракт токена ERC-223:

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

Теперь мы хотим, чтобы другой контракт принимал депозиты `tokenA`, предполагая, что tokenA является токеном ERC-223. Контракт должен принимать только tokenA и отклонять любые другие токены. Когда контракт получает tokenA, он должен генерировать событие `Deposit()` и увеличивать значение внутренней переменной `deposits`.

Вот код:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Единственный токен, который мы хотим принять.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Важно понимать, что внутри этой функции
        // msg.sender — это адрес получаемого токена,
        // msg.value  всегда равен 0, так как контракт токена в большинстве случаев не владеет эфиром и не отправляет его,
        // _from      — это отправитель перевода токенов,
        // _value     — это количество токенов, которое было внесено.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Часто задаваемые вопросы {#faq}

### Что произойдет, если мы отправим какой-то tokenB на контракт? {#sending-tokens}

Транзакция завершится ошибкой, и перевод токенов не произойдет. Токены будут возвращены на адрес отправителя.

### Как мы можем внести депозит на этот контракт? {#contract-deposits}

Вызовите функцию `transfer(address,uint256)` или `transfer(address,uint256,bytes)` токена ERC-223, указав адрес `RecipientContract`.

### Что произойдет, если мы переведем токен ERC-20 на этот контракт? {#erc-20-transfers}

Если токен ERC-20 отправлен на `RecipientContract`, токены будут переведены, но перевод не будет распознан (событие `Deposit()` не будет сгенерировано, а значение депозитов не изменится). Нежелательные депозиты ERC-20 не могут быть отфильтрованы или предотвращены.

### Что, если мы хотим выполнить какую-то функцию после завершения депозита токена? {#function-execution}

Существует несколько способов сделать это. В этом примере мы будем следовать методу, который делает переводы ERC-223 идентичными переводам эфира:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Единственный токен, который мы хотим принять.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Обработать входящую транзакцию и выполнить последующий вызов функции.
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

Когда `RecipientContract` получит токен ERC-223, контракт выполнит функцию, закодированную как параметр `_data` транзакции токена, идентично тому, как транзакции эфира кодируют вызовы функций в виде `data` транзакции. Прочтите о [поле данных](/developers/docs/transactions/#the-data-field) для получения дополнительной информации.

В приведенном выше примере токен ERC-223 должен быть переведен на адрес `RecipientContract` с помощью функции `transfer(address,uin256,bytes calldata _data)`. Если параметр данных будет `0xc2985578` (подпись функции `foo()`), то функция foo() будет вызвана после получения депозита токена, и будет сгенерировано событие Foo().

Параметры также могут быть закодированы в `data` перевода токена, например, мы можем вызвать функцию bar() со значением 12345 для `_someNumber`. В этом случае `data` должно быть `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`, где `0x0423a132` — это подпись функции `bar(uint256)`, а `00000000000000000000000000000000000000000000000000000000000004d2` — это 12345 в формате uint256.

## Ограничения {#limitations}

Хотя ERC-223 решает несколько проблем, обнаруженных в стандарте ERC-20, он не лишен собственных ограничений:

- Принятие и совместимость: ERC-223 еще не получил широкого распространения, что может ограничить его совместимость с существующими инструментами и платформами.
- Обратная совместимость: ERC-223 не имеет обратной совместимости с ERC-20, что означает, что существующие контракты и инструменты ERC-20 не будут работать с токенами ERC-223 без модификаций.
- Затраты на газ: дополнительные проверки и функции в переводах ERC-223 могут привести к более высоким затратам на газ по сравнению с транзакциями ERC-20.

## Дополнительная литература {#further-reading}

- [EIP-223: Стандарт токенов ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Первоначальное предложение ERC-223](https://github.com/ethereum/eips/issues/223)