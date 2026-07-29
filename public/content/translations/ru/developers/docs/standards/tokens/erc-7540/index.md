---
title: Стандарт асинхронных токенизированных хранилищ ERC-7540
description: Расширение ERC-4626, добавляющее асинхронные процессы депозита и выкупа для токенизированных хранилищ.
lang: ru
---

## Введение {#introduction}

ERC-7540 расширяет [стандарт токенизированных хранилищ ERC-4626](/developers/docs/standards/tokens/erc-4626/), добавляя поддержку асинхронных процессов депозита и выкупа. Он вводит паттерн «запрос-затем-востребование»: пользователи сначала отправляют запрос (блокируя свои активы или доли), а затем востребуют результат после того, как хранилище его обработает.

Это необходимо, когда хранилище не может выполнить финализацию расчетов мгновенно в одной транзакции, например:

- Протоколы для активов реального мира (RWA), такие как токенизированные казначейские облигации, частные кредиты и другие активы с циклами финализации расчетов T+1 или T+2
- Недостаточно обеспеченное кредитование, где оценка кредитоспособности происходит офчейн
- Кроссчейн-стратегии хранилищ, где использование мостов вносит задержки
- Токены ликвидного стейкинга (LST) с периодами отвязки

Хранилища могут быть асинхронными только для депозитов, только для выкупов или для обоих процессов. Эта гибкость позволяет разработчикам хранилищ добавлять асинхронные процессы только там, где этого требует базовая стратегия, оставляя другую сторону синхронной.

## Предварительные требования {#prerequisites}

Для лучшего понимания этой страницы мы рекомендуем сначала прочитать про [стандарты токенов](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) и [ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 против ERC-7540 {#comparison}

В ERC-4626 депозит проходит финализацию расчетов атомарно: инвестор отправляет активы и получает обратно доли в рамках одной транзакции.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 разделяет это на два шага. Инвестор сначала вызывает `requestDeposit()` для блокировки активов, затем ждет, пока управляющий хранилищем обработает запрос. После выполнения инвестор вызывает `deposit()`, чтобы востребовать свои доли. Обменные курсы определяются в момент выполнения, а не в момент запроса.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

Процесс выкупа работает аналогичным образом: `requestRedeem()` блокирует доли, и после выполнения инвестор вызывает `redeem()`, чтобы востребовать активы.

## Функции и особенности ERC-7540 {#body}

ERC-7540 наследует полный интерфейс ERC-4626, но перепрофилирует `deposit`/`mint`/`withdraw`/`redeem` как функции востребования. Новые функции `requestDeposit` и `requestRedeem` обрабатывают начальный этап запроса.

Каждый запрос проходит через три состояния: в ожидании (отправлен, ожидает обработки), доступный для востребования (выполнен и оценен) и востребованный (инвестор забрал свои доли или активы).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### Процесс запроса депозита {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Переводит `assets` от `owner` в хранилище и отправляет запрос на депозит. Адрес `controller` получает контроль над запросом. Возвращает `requestId`, идентифицирующий пакет запросов.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Возвращает количество `assets` в ожидающем (еще не доступном для востребования) запросе на депозит для заданных `controller` и `requestId`.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Возвращает количество `assets` в доступном для востребования (выполненном, но еще не востребованном) запросе на депозит для заданных `controller` и `requestId`.

#### Востребование депозитов {#claiming-deposits}

Как только запрос на депозит становится доступным для востребования, пользователь вызывает стандартную функцию ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) или [`mint`](/developers/docs/standards/tokens/erc-4626/#mint), чтобы востребовать свои доли. В ERC-7540 эти функции больше не переводят активы (это уже произошло во время запроса). Они только чеканят доли для получателя.

### Процесс запроса выкупа {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Блокирует `shares` от `owner` и отправляет запрос на выкуп. Адрес `controller` получает контроль над запросом.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Возвращает количество `shares` в ожидающем запросе на выкуп для заданных `controller` и `requestId`.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Возвращает количество `shares` в доступном для востребования запросе на выкуп для заданных `controller` и `requestId`.

#### Востребование выкупов {#claiming-redemptions}

Как только запрос на выкуп становится доступным для востребования, пользователь вызывает стандартную функцию ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) или [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw), чтобы востребовать свои активы.

### Управление операторами {#operator-management}

ERC-7540 включает паттерн оператора (из [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)), который позволяет третьим лицам управлять запросами от имени пользователя.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Одобряет или отзывает у `operator` право действовать от имени `msg.sender` для запросов на депозит/выкуп и востребований.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Возвращает информацию о том, одобрен ли `operator` для действий от имени `controller`.

### Идентификаторы запросов {#request-ids}

Идентификаторы запросов различают разные пакеты запросов. Все запросы, имеющие один и тот же `requestId`, взаимозаменяемы: они переходят между состояниями вместе и получают одинаковый обменный курс.

Когда хранилище возвращает `requestId = 0` для всех запросов, только адрес `controller` различает состояние запроса. Несколько запросов от одного и того же контроллера агрегируются.

### События {#events}

#### Событие DepositRequest {#depositrequest-event}

ДОЛЖНО генерироваться, когда запрос на депозит отправляется через [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### Событие RedeemRequest {#redeemrequest-event}

ДОЛЖНО генерироваться, когда запрос на выкуп отправляется через [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### Событие OperatorSet {#operatorset-event}

ДОЛЖНО генерироваться, когда оператор одобряется или отзывается через [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Функции предварительного просмотра {#preview-functions}

Функции предварительного просмотра должны выполнять откат только для асинхронных процессов, поскольку обменный курс неизвестен до выполнения запроса. В хранилище с асинхронным депозитом `previewDeposit` и `previewMint` ДОЛЖНЫ выполнять откат, в то время как `previewRedeem` и `previewWithdraw` продолжают работать как в ERC-4626 (и наоборот для хранилища с асинхронным выкупом). Это ключевое поведенческое отличие от ERC-4626.

## Дополнительная литература {#further-reading}

- [EIP-7540: Асинхронные токенизированные хранилища ERC-4626](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Стандарт токенизированных хранилищ](https://eips.ethereum.org/EIPS/eip-4626)
- [Реализация ERC-7540 от ОпенЗеппелин](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)