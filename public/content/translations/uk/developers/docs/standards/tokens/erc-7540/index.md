---
title: Стандарт асинхронних токенізованих сховищ ERC-7540
description: Розширення ERC-4626, яке додає асинхронні процеси депозиту та викупу для токенізованих сховищ.
lang: uk
---

## Вступ {#introduction}

ERC-7540 розширює [стандарт токенізованих сховищ ERC-4626](/developers/docs/standards/tokens/erc-4626/), додаючи підтримку асинхронних процесів депозиту та викупу. Він запроваджує патерн «запит-потім-затребування»: користувачі спочатку подають запит (блокуючи свої активи або частки), а потім затребують результат після того, як сховище його обробить.

Це необхідно, коли сховище не може здійснити остаточну фіксацію миттєво в одній транзакції, наприклад:

- Протоколи активів реального світу (RWA), такі як токенізовані казначейські зобов'язання, приватне кредитування та інші активи з циклами остаточної фіксації T+1 або T+2
- Недостатньо забезпечене кредитування, де оцінка кредитоспроможності відбувається позамережево
- Кросчейн-стратегії сховищ, де використання мостів спричиняє затримки
- Токени ліквідного стейкінгу (LST) з періодами розблокування

Сховища можуть бути асинхронними лише для депозитів, лише для викупів або для обох процесів. Ця гнучкість дозволяє розробникам сховищ додавати асинхронні процеси лише там, де цього вимагає базова стратегія, залишаючи іншу сторону синхронною.

## Передумови {#prerequisites}

Щоб краще зрозуміти цю сторінку, ми рекомендуємо спочатку прочитати про [стандарти токенів](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) та [ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 проти ERC-7540 {#comparison}

У ERC-4626 остаточна фіксація депозиту відбувається атомарно: інвестор надсилає активи та отримує частки назад в одній транзакції.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 розділяє це на два етапи. Інвестор спочатку викликає `requestDeposit()`, щоб заблокувати активи, а потім чекає, поки менеджер сховища обробить запит. Після виконання інвестор викликає `deposit()`, щоб затребувати свої частки. Обмінні курси визначаються під час виконання, а не під час запиту.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

Процес викупу працює так само: `requestRedeem()` блокує частки, і після виконання інвестор викликає `redeem()`, щоб затребувати активи.

## Функції та особливості ERC-7540 {#body}

ERC-7540 успадковує повний інтерфейс ERC-4626, але перепрофільовує `deposit`/`mint`/`withdraw`/`redeem` як функції затребування. Нові функції `requestDeposit` та `requestRedeem` обробляють початковий етап запиту.

Кожен запит проходить через три стани: очікує на розгляд (поданий, очікує на обробку), доступний для затребування (виконаний та оцінений) і затребуваний (інвестор забрав свої частки або активи).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### Процес запиту на депозит {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Переказує `assets` від `owner` до сховища та подає запит на депозит. Адреса `controller` отримує контроль над запитом. Повертає `requestId`, що ідентифікує пакет запитів.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Повертає суму `assets` у запиті на депозит, що очікує на розгляд (ще не доступний для затребування), для вказаних `controller` та `requestId`.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Повертає суму `assets` у доступному для затребування (виконаному, але ще не затребуваному) запиті на депозит для вказаних `controller` та `requestId`.

#### Затребування депозитів {#claiming-deposits}

Щойно запит на депозит стає доступним для затребування, користувач викликає стандартну функцію ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) або [`mint`](/developers/docs/standards/tokens/erc-4626/#mint), щоб затребувати свої частки. У ERC-7540 ці функції більше не переказують активи (це вже відбулося під час запиту). Вони лише карбують частки для одержувача.

### Процес запиту на викуп {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Блокує `shares` від `owner` та подає запит на викуп. Адреса `controller` отримує контроль над запитом.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Повертає суму `shares` у запиті на викуп, що очікує на розгляд, для вказаних `controller` та `requestId`.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Повертає суму `shares` у доступному для затребування запиті на викуп для вказаних `controller` та `requestId`.

#### Затребування викупів {#claiming-redemptions}

Щойно запит на викуп стає доступним для затребування, користувач викликає стандартну функцію ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) або [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw), щоб затребувати свої активи.

### Управління операторами {#operator-management}

ERC-7540 включає патерн оператора (з [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)), який дозволяє третім сторонам керувати запитами від імені користувача.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Схвалює або скасовує дозвіл для `operator` діяти від імені `msg.sender` для запитів на депозит/викуп та затребувань.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Повертає інформацію про те, чи схвалено `operator` діяти від імені `controller`.

### Ідентифікатори запитів {#request-ids}

Ідентифікатори запитів розрізняють різні пакети запитів. Усі запити, що мають однаковий `requestId`, є взаємозамінними: вони переходять між станами разом і отримують однаковий обмінний курс.

Коли сховище повертає `requestId = 0` для всіх запитів, лише адреса `controller` розрізняє стан запиту. Кілька запитів від одного контролера агрегуються.

### Події {#events}

#### Подія DepositRequest {#depositrequest-event}

ПОВИННА генеруватися, коли запит на депозит подається через [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### Подія RedeemRequest {#redeemrequest-event}

ПОВИННА генеруватися, коли запит на викуп подається через [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### Подія OperatorSet {#operatorset-event}

ПОВИННА генеруватися, коли оператор схвалюється або скасовується через [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Функції попереднього перегляду {#preview-functions}

Функції попереднього перегляду повинні скасовувати транзакцію лише для асинхронних процесів, оскільки обмінний курс невідомий до виконання запиту. У сховищі з асинхронним депозитом `previewDeposit` та `previewMint` ПОВИННІ скасовувати транзакцію, тоді як `previewRedeem` та `previewWithdraw` продовжують працювати як у ERC-4626 (і навпаки для сховища з асинхронним викупом). Це ключова поведінкова відмінність від ERC-4626.

## Додаткові матеріали {#further-reading}

- [EIP-7540: Асинхронні токенізовані сховища ERC-4626](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Стандарт токенізованих сховищ](https://eips.ethereum.org/EIPS/eip-4626)
- [Реалізація ERC-7540 від ОупенЗеппелін](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)