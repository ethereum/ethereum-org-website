---
title: "Некоторые уловки, используемые мошенническими токенами, и как их обнаружить"
description: В этом руководстве мы разберем мошеннический токен, чтобы увидеть некоторые уловки, которые используют мошенники, как они их реализуют и как мы можем их обнаружить.
author: Ори Померанц
tags:
  [
    "мошенничество",
    "solidity",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 15-09-2023
lang: ru
---

В этом руководстве мы разбираем [мошеннический токен](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), чтобы увидеть некоторые уловки, которые используют мошенники, и то, как они их реализуют. К концу руководства вы получите более полное представление о контрактах токенов ERC-20, их возможностях и о том, почему необходим скептицизм. Затем мы посмотрим на события, создаваемые этим мошенническим токеном, и увидим, как мы можем автоматически определить, что он не является легитимным.

## Мошеннические токены — что это такое, почему люди их создают и как их избежать {#scam-tokens}

Чаще всего Ethereum используется для создания собственного токена, который можно использовать как валюту. Однако везде, где есть настоящие варианты использования чего-либо, что несет ценность, есть и преступники, пытающиеся эту ценность украсть.

Вы можете прочитать больше на эту тему [в другом месте на ethereum.org](/guides/how-to-id-scam-tokens/) с точки зрения пользователя. Это руководство посвящено разбору мошеннического токена, чтобы увидеть, как он устроен и как его можно обнаружить.

### Как я узнаю, что wARB — это мошенничество? {#warb-scam}

Токен, который мы разбираем, — это [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), который притворяется эквивалентным легитимному [токену ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

Самый простой способ узнать, какой токен является легитимным, — это посмотреть на организацию-эмитента, [Arbitrum](https://arbitrum.foundation/). Легитимные адреса указаны [в их документации](https://docs.arbitrum.foundation/deployment-addresses#token).

### Почему исходный код доступен? {#why-source}

Обычно мы ожидаем, что люди, которые пытаются обмануть других, будут скрытными, и действительно, многие мошеннические токены не имеют доступного кода (например, [этот](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) и [этот](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Однако легитимные токены обычно публикуют свой исходный код, поэтому, чтобы выглядеть легитимными, авторы мошеннических токенов иногда делают то же самое. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) — один из тех токенов, у которых доступен исходный код, что облегчает его понимание.

Хотя развертыватели контрактов могут выбирать, публиковать исходный код или нет, они _не могут_ опубликовать неверный исходный код. Обозреватель блоков компилирует предоставленный исходный код независимо, и если он не получает точно такой же байт-код, он отклоняет этот исходный код. [Вы можете прочитать больше об этом на сайте Etherscan](https://etherscan.io/verifyContract).

## Сравнение с легитимными токенами ERC-20 {#compare-legit-erc20}

Мы собираемся сравнить этот токен с легитимными токенами ERC-20. Если вы не знакомы с тем, как обычно пишутся легитимные токены ERC-20, [см. это руководство](/developers/tutorials/erc20-annotated-code/).

### Константы для привилегированных адресов {#constants-for-privileged-addresses}

Контрактам иногда нужны привилегированные адреса. Контракты, предназначенные для долгосрочного использования, позволяют некоторым привилегированным адресам изменять эти адреса, например, чтобы включить использование нового контракта с мультиподписью. Есть несколько способов сделать это.

Контракт [токена `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) использует шаблон [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Привилегированный адрес хранится в хранилище, в поле под названием `_owner` (см. третий файл, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Контракт [токена `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) не имеет привилегированного адреса напрямую. Однако ему он и не нужен. Он находится за [`прокси`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) по [адресу `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Этот контракт имеет привилегированный адрес (см. четвертый файл, `ERC1967Upgrade.sol`), который может использоваться для обновлений.

```solidity
    /**
     * @dev Сохраняет новый адрес в слоте администратора EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: новый администратор имеет нулевой адрес");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

В отличие от этого, в контракте `wARB` жестко закодирован `contract_owner`.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[Этот владелец контракта](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) — не контракт, которым могли бы управлять разные аккаунты в разное время, а [аккаунт, принадлежащий внешнему пользователю](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Это означает, что он, вероятно, предназначен для краткосрочного использования отдельным лицом, а не как долгосрочное решение для контроля над токеном ERC-20, который будет оставаться ценным.

И действительно, если мы посмотрим на Etherscan, то увидим, что мошенник использовал этот контракт всего 12 часов (с [первой транзакции](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) по [последнюю транзакцию](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) 19 мая 2023 года.

### Поддельная функция `_transfer` {#the-fake-transfer-function}

Стандартной практикой является выполнение фактических переводов с помощью [внутренней функции `_transfer`](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

В `wARB` эта функция выглядит почти легитимной:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: перевод с нулевого адреса");
        require(recipient != address(0), "ERC20: перевод на нулевой адрес");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: сумма перевода превышает баланс");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Подозрительная часть:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Если владелец контракта отправляет токены, почему событие `Transfer` показывает, что они исходят от `deployer`?

Однако есть более важная проблема. Кто вызывает эту функцию `_transfer`? Ее нельзя вызвать извне, она помечена как `internal`. И имеющийся у нас код не содержит никаких вызовов `_transfer`. Очевидно, что она здесь в качестве приманки.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: сумма перевода превышает лимит"));
        return true;
    }
```

Когда мы смотрим на функции, которые вызываются для перевода токенов, `transfer` и `transferFrom`, мы видим, что они вызывают совершенно другую функцию, `_f_`.

### Настоящая функция `_f_` {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: перевод с нулевого адреса");
        require(recipient != address(0), "ERC20: перевод на нулевой адрес");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: сумма перевода превышает баланс");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

В этой функции есть два потенциальных тревожных сигнала.

- Использование [модификатора функции](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Однако, когда мы заглядываем в исходный код, мы видим, что `_mod_` на самом деле безвреден.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Та же проблема, что мы видели в `_transfer`: когда `contract_owner` отправляет токены, они выглядят так, как будто исходят от `deployer`.

### Поддельная функция событий `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Теперь мы подходим к тому, что похоже на настоящее мошенничество. Я немного отредактировал функцию для удобочитаемости, но функционально она эквивалентна.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Эта функция имеет модификатор `auth()`, что означает, что ее может вызывать только владелец контракта.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Взаимодействие не разрешено");
    _;
}
```

Это ограничение имеет смысл, потому что мы не хотим, чтобы случайные аккаунты распространяли токены. Однако остальная часть функции подозрительна.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Функция для перевода из аккаунта пула массиву получателей массива сумм имеет смысл. Существует множество случаев использования, в которых вы захотите распределить токены из одного источника по нескольким адресатам, например, для выплаты заработной платы, аирдропов и т. д. Дешевле (с точки зрения газа) сделать это в одной транзакции, чем выпускать несколько транзакций или даже вызывать ERC-20 несколько раз из другого контракта в рамках одной транзакции.

Однако `dropNewTokens` этого не делает. Она генерирует [события `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), но на самом деле не переводит никаких токенов. Нет никакой законной причины вводить в заблуждение оффчейн-приложения, сообщая им о переводе, которого на самом деле не было.

### «Сжигающая» функция `Approve` {#the-burning-approve-function}

Контракты ERC-20 должны иметь [функцию `approve`](/developers/tutorials/erc20-annotated-code/#approve) для лимитов, и действительно, у нашего мошеннического токена есть такая функция, и она даже корректна. Однако, поскольку Solidity произошел от C, он чувствителен к регистру. «Approve» и «approve» — это разные строки.

Кроме того, функциональность не связана с `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Эта функция вызывается с массивом адресов держателей токена.

```solidity
    public approver() {
```

Модификатор `approver()` гарантирует, что только `contract_owner` может вызывать эту функцию (см. ниже).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: сумма сжигания превышает баланс");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Для каждого адреса держателя функция перемещает весь баланс держателя на адрес `0x00...01`, эффективно сжигая его (фактическое `сжигание` в стандарте также изменяет общее предложение и переводит токены на `0x00...00`). Это означает, что `contract_owner` может изымать активы любого пользователя. Это не похоже на функцию, которую вы хотели бы видеть в токене управления.

### Проблемы с качеством кода {#code-quality-issues}

Эти проблемы с качеством кода не _доказывают_, что этот код является мошенническим, но они делают его подозрительным. Организованные компании, такие как Arbitrum, обычно не выпускают настолько плохой код.

#### Функция `mount` {#the-mount-function}

Хотя это не указано в [стандарте](https://eips.ethereum.org/EIPS/eip-20), в общем говоря, функция, создающая новые токены, называется [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Если мы посмотрим на конструктор `wARB`, мы увидим, что функция эмиссии была по какой-то причине переименована в `mount` и вызывается пять раз с пятой частью начального предложения вместо одного раза для всей суммы для эффективности.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

Сама функция `mount` также подозрительна.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: эмиссия на нулевой адрес");
```

Глядя на `require`, мы видим, что только владелец контракта имеет право на эмиссию. Это законно. Но сообщение об ошибке должно быть _только владелец имеет право на эмиссию_ или что-то в этом роде. Вместо этого это нерелевантное _ERC20: эмиссия на нулевой адрес_. Правильная проверка эмиссии на нулевой адрес — это `require(account != address(0), "<сообщение об ошибке>")`, которую контракт никогда не удосуживается проверить.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Есть еще два подозрительных факта, непосредственно связанных с эмиссией:

- Есть параметр `account`, который, предположительно, является аккаунтом, который должен получить эмитированную сумму. Но баланс, который увеличивается, на самом деле принадлежит `contract_owner`.

- В то время как увеличенный баланс принадлежит `contract_owner`, сгенерированное событие показывает перевод на `account`.

### Зачем нужны и `auth`, и `approver`? Зачем нужен `mod`, который ничего не делает? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Этот контракт содержит три модификатора: `_mod_`, `auth` и `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` принимает три параметра и ничего с ними не делает. Зачем он нужен?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Взаимодействие не разрешено");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Взаимодействие не разрешено");
        _;
    }
```

`auth` и `approver` имеют больше смысла, потому что они проверяют, что контракт был вызван `contract_owner`. Мы ожидаем, что определенные привилегированные действия, такие как эмиссия, будут ограничены этим аккаунтом. Однако в чем смысл иметь две отдельные функции, которые делают _в точности одно и то же_?

## Что мы можем обнаружить автоматически? {#what-can-we-detect-automatically}

Мы можем видеть, что `wARB` — это мошеннический токен, посмотрев на Etherscan. Однако это централизованное решение. Теоретически, Etherscan может быть скомпрометирован или взломан. Лучше иметь возможность самостоятельно определить, является ли токен легитимным или нет.

Есть несколько уловок, которые мы можем использовать для определения того, что токен ERC-20 является подозрительным (либо мошенническим, либо очень плохо написанным), посмотрев на события, которые он генерирует.

## Подозрительные события `Approval` {#suspicious-approval-events}

[События `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) должны происходить только по прямому запросу (в отличие от [событий `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), которые могут происходить в результате лимита). [См. документацию Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) для подробного объяснения этой проблемы и того, почему запросы должны быть прямыми, а не опосредованными контрактом.

Это означает, что события `Approval`, которые одобряют расходование средств с [аккаунта, принадлежащего внешнему пользователю](/developers/docs/accounts/#types-of-account), должны исходить от транзакций, которые начинаются в этом аккаунте и чьим назначением является контракт ERC-20. Любой другой вид одобрения от аккаунта, принадлежащего внешнему пользователю, является подозрительным.

Вот [программа, которая идентифицирует этот тип событий](https://github.com/qbzzt/20230915-scam-token-detection), использующая [viem](https://viem.sh/) и [TypeScript](https://www.typescriptlang.org/docs/), вариант JavaScript с безопасностью типов. Чтобы запустить ее:

1. Скопируйте `.env.example` в `.env`.
2. Отредактируйте `.env`, чтобы указать URL-адрес узла основной сети Ethereum.
3. Выполните `pnpm install` для установки необходимых пакетов.
4. Выполните `pnpm susApproval` для поиска подозрительных одобрений.

Вот построчное объяснение:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

Импортируйте определения типов, функции и определение цепочки из `viem`.

```typescript
import { config } from "dotenv"
config()
```

Прочтите `.env`, чтобы получить URL-адрес.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Создайте клиент Viem. Нам нужно только читать из блокчейна, поэтому этому клиенту не нужен приватный ключ.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Адрес подозрительного контракта ERC-20 и блоки, в которых мы будем искать события. Поставщики узлов обычно ограничивают нашу возможность чтения событий, потому что пропускная способность может быть дорогой. К счастью, `wARB` не использовался в течение восемнадцатичасового периода, поэтому мы можем искать все события (всего их было 13).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Это способ запросить у Viem информацию о событиях. Когда мы предоставляем ему точную сигнатуру события, включая имена полей, он разбирает событие для нас.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Наш алгоритм применим только к аккаунтам, принадлежащим внешним пользователям. Если `client.getBytecode` возвращает какой-либо байт-код, это означает, что это контракт, и мы должны его пропустить.

Если вы раньше не использовали TypeScript, определение функции может показаться немного странным. Мы не просто говорим ему, что первый (и единственный) параметр называется `addr`, но и что он имеет тип `Address`. Аналогично, часть `: boolean` сообщает TypeScript, что возвращаемое значение функции — это логическое значение.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Эта функция получает квитанцию транзакции из события. Нам нужна квитанция, чтобы убедиться, что мы знаем, куда была направлена транзакция.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Это самая важная функция, та, которая фактически решает, является ли событие подозрительным или нет. Возвращаемый тип `(Event | null)` сообщает TypeScript, что эта функция может вернуть либо `Event`, либо `null`. Мы возвращаем `null`, если событие не является подозрительным.

```typescript
const owner = ev.args._owner
```

Viem знает имена полей, поэтому он разобрал событие для нас. `_owner` — это владелец токенов, которые будут потрачены.

```typescript
// Одобрения от контрактов не являются подозрительными
if (await isContract(owner)) return null
```

Если владелец является контрактом, предположим, что это одобрение не является подозрительным. Чтобы проверить, является ли одобрение контракта подозрительным или нет, нам нужно будет отследить полное выполнение транзакции, чтобы увидеть, дошла ли она когда-либо до контракта-владельца, и вызвал ли этот контракт контракт ERC-20 напрямую. Это гораздо более ресурсоемко, чем мы хотели бы делать.

```typescript
const txn = await getEventTxn(ev)
```

Если одобрение исходит от аккаунта, принадлежащего внешнему пользователю, получите транзакцию, которая его вызвала.

```typescript
// Одобрение является подозрительным, если оно исходит от владельца EOA, который не является `from` транзакции
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Мы не можем просто проверить равенство строк, потому что адреса являются шестнадцатеричными, поэтому они содержат буквы. Иногда, например в `txn.from`, эти буквы все в нижнем регистре. В других случаях, таких как `ev.args._owner`, адрес находится в [смешанном регистре для идентификации ошибок](https://eips.ethereum.org/EIPS/eip-55).

Но если транзакция не от владельца, и этот владелец является внешним, то у нас есть подозрительная транзакция.

```typescript
// Также подозрительно, если назначение транзакции не является контрактом ERC-20, который мы
// исследуем
if (txn.to.toLowerCase() != testedAddress) return ev
```

Аналогично, если адрес `to` транзакции, первый вызванный контракт, не является исследуемым контрактом ERC-20, то это подозрительно.

```typescript
    // Если нет причин для подозрений, возвращаем null.
    return null
}
```

Если ни одно из условий не выполняется, то событие `Approval` не является подозрительным.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Асинхронная функция `async`](https://www.w3schools.com/js/js_async.asp) возвращает объект `Promise`. При использовании общего синтаксиса `await x()` мы ждем выполнения этого `Promise` перед тем, как продолжить обработку. Это просто программировать и отслеживать, но это также неэффективно. Пока мы ждем выполнения `Promise` для определенного события, мы уже можем начать работать над следующим событием.

Здесь мы используем [`map`](https://www.w3schools.com/jsref/jsref_map.asp) для создания массива объектов `Promise`. Затем мы используем [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/), чтобы дождаться выполнения всех этих обещаний. Затем мы [`фильтруем`](https://www.w3schools.com/jsref/jsref_filter.asp) эти результаты, чтобы удалить не подозрительные события.

### Подозрительные события `Transfer` {#suspicious-transfer-events}

Еще один возможный способ выявления мошеннических токенов — это проверка на наличие подозрительных переводов. Например, переводы с аккаунтов, у которых не так много токенов. Вы можете увидеть, [как реализовать этот тест](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), но у `wARB` этой проблемы нет.

## Заключение {#conclusion}

Автоматическое обнаружение мошенничества с ERC-20 страдает от [ложноотрицательных результатов](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), потому что мошенничество может использовать совершенно нормальный контракт токена ERC-20, который просто не представляет ничего реального. Поэтому вы всегда должны пытаться _получить адрес токена из доверенного источника_.

Автоматическое обнаружение может помочь в определенных случаях, например, в компонентах DeFi, где много токенов, и их нужно обрабатывать автоматически. Но, как всегда, [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), проводите собственное исследование и поощряйте своих пользователей делать то же самое.

[Больше моих работ смотрите здесь](https://cryptodocguy.pro/).
