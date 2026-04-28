---
title: "Стандарт токенів ERC-1363, що підлягають оплаті"
description: "ERC-1363 — це розширений інтерфейс для токенів ERC-20, який підтримує виконання спеціальної логіки в контракті отримувача після переказів або в контракті витрачальника після схвалень, і все це в межах однієї транзакції."
lang: uk
---

## Вступ {#introduction}

### Що таке ERC-1363? {#what-is-erc1363}

ERC-1363 — це розширений інтерфейс для токенів ERC-20, який підтримує виконання спеціальної логіки в контракті отримувача після переказів або в контракті витрачальника після схвалень, і все це в межах однієї транзакції.

### Відмінності від ERC-20 {#erc20-differences}

Стандартні операції ERC-20, такі як `transfer`, `transferFrom` і `approve`, не дозволяють виконувати код у контракті отримувача або витрачальника без окремої транзакції.
Це ускладнює розробку інтерфейсу користувача та сповільнює впровадження, оскільки користувачі повинні чекати, поки буде виконано першу транзакцію, а потім надсилати другу.
Вони також повинні двічі платити за газ.

ERC-1363 дає змогу взаємозамінним токенам легше виконувати дії та працювати без використання будь-якого позаланцюгового слухача.
Це дозволяє здійснювати зворотний виклик для контракту отримувача або витрачальника після переказу або схвалення в межах однієї транзакції.

## Передумови {#prerequisites}

Щоб краще зрозуміти цю сторінку, радимо спочатку прочитати про:

- [Стандарти токенів](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Основна частина {#body}

ERC-1363 представляє стандартний API для токенів ERC-20 для взаємодії зі смарт-контрактами після `transfer`, `transferFrom` або `approve`.

Цей стандарт надає базову функціональність для переказу токенів, а також дозволяє схвалювати токени, щоб їх могла витратити інша третя сторона в ланцюжку, а потім здійснити зворотний виклик для контракту отримувача або витрачальника.

Існує багато запропонованих способів використання смарт-контрактів, які можуть приймати зворотні виклики ERC-20.

Наприклад:

- **Краудсейли**: надіслані токени запускають миттєвий розподіл винагороди.
- **Сервіси**: оплата активує доступ до сервісу за один крок.
- **Рахунки-фактури**: токени автоматично оплачують рахунки-фактури.
- **Підписки**: схвалення річного тарифу активує підписку в межах платежу за перший місяць.

З цих причин його спочатку назвали **«Токен для оплати»**.

Поведінка зворотного виклику ще більше розширює його корисність, забезпечуючи безперебійну взаємодію, наприклад:

- **Стейкінг**: передані токени запускають автоматичне блокування в стейкінговому контракті.
- **Голосування**: отримані токени реєструють голоси в системі управління.
- **Обмін**: схвалення токенів активує логіку обміну за один крок.

Токени ERC-1363 можна використовувати для певних утиліт у всіх випадках, які вимагають виконання зворотного виклику після отримання переказу або схвалення.
ERC-1363 також корисний для уникнення втрати або блокування токенів у смарт-контрактах шляхом перевірки здатності отримувача обробляти токени.

На відміну від інших пропозицій щодо розширення ERC-20, ERC-1363 не перевизначає методи ERC-20 `transfer` та `transferFrom` і визначає ідентифікатори інтерфейсів, які мають бути реалізовані, зберігаючи зворотну сумісність з ERC-20.

З [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Методи {#methods}

Смарт-контракти, що реалізують стандарт ERC-1363, **ПОВИННІ** реалізовувати всі функції в інтерфейсі `ERC1363`, а також інтерфейси `ERC20` та `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Розширений інтерфейс для токенів ERC-20, що підтримує виконання коду в контракті отримувача
 * після `transfer` або `transferFrom`, або коду в контракті витрачальника після `approve`, в одній транзакції.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * ПРИМІТКА: ідентифікатор ERC-165 для цього інтерфейсу – 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Переміщує токени кількістю `value` з рахунку того, хто викликає, до `to`
   * а потім викликає `ERC1363Receiver::onTransferReceived` на `to`.
   * @param to Адреса, на яку передаються токени.
   * @param value Кількість токенів, що будуть передані.
   * @return Логічне значення, що вказує на успішне завершення операції, якщо не виникає помилка.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Переміщує токени кількістю `value` з рахунку того, хто викликає, до `to`
   * а потім викликає `ERC1363Receiver::onTransferReceived` на `to`.
   * @param to Адреса, на яку передаються токени.
   * @param value Кількість токенів, що будуть передані.
   * @param data Додаткові дані без зазначеного формату, що надсилаються у виклику до `to`.
   * @return Логічне значення, що вказує на успішне завершення операції, якщо не виникає помилка.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Переміщує токени кількістю `value` з `from` до `to` за допомогою механізму допуску
   * а потім викликає `ERC1363Receiver::onTransferReceived` на `to`.
   * @param from Адреса, з якої надсилаються токени.
   * @param to Адреса, на яку передаються токени.
   * @param value Кількість токенів, що будуть передані.
   * @return Логічне значення, що вказує на успішне завершення операції, якщо не виникає помилка.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Переміщує токени кількістю `value` з `from` до `to` за допомогою механізму допуску
   * а потім викликає `ERC1363Receiver::onTransferReceived` на `to`.
   * @param from Адреса, з якої надсилаються токени.
   * @param to Адреса, на яку передаються токени.
   * @param value Кількість токенів, що будуть передані.
   * @param data Додаткові дані без зазначеного формату, що надсилаються у виклику до `to`.
   * @return Логічне значення, що вказує на успішне завершення операції, якщо не виникає помилка.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Встановлює токени кількістю `value` як допуск `spender` для токенів того, хто викликає
   * а потім викликає `ERC1363Spender::onApprovalReceived` на `spender`.
   * @param spender Адреса, яка витрачатиме кошти.
   * @param value Кількість токенів, що будуть витрачені.
   * @return Логічне значення, що вказує на успішне завершення операції, якщо не виникає помилка.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Встановлює токени кількістю `value` як допуск `spender` для токенів того, хто викликає
   * а потім викликає `ERC1363Spender::onApprovalReceived` на `spender`.
   * @param spender Адреса, яка витрачатиме кошти.
   * @param value Кількість токенів, що будуть витрачені.
   * @param data Додаткові дані без зазначеного формату, що надсилаються у виклику до `spender`.
   * @return Логічне значення, що вказує на успішне завершення операції, якщо не виникає помилка.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

Смарт-контракт, який хоче приймати токени ERC-1363 через `transferAndCall` або `transferFromAndCall`, **ПОВИНЕН** реалізувати інтерфейс `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Інтерфейс для будь-якого контракту, який хоче підтримувати `transferAndCall` або `transferFromAndCall` з контрактів токенів ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Щоразу, коли токени ERC-1363 передаються в цей контракт через `ERC1363::transferAndCall` або `ERC1363::transferFromAndCall`
   * від `operator` з `from`, ця функція викликається.
   *
   * ПРИМІТКА: щоб прийняти передачу, вона має повернути
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (тобто 0x88a7ca5c, або власний селектор функцій).
   *
   * @param operator Адреса, яка викликала функцію `transferAndCall` або `transferFromAndCall`.
   * @param from Адреса, з якої передаються токени.
   * @param value Кількість переданих токенів.
   * @param data Додаткові дані без зазначеного формату.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` якщо передача дозволена, якщо не виникає помилка.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Смарт-контракт, який хоче приймати токени ERC-1363 через `approveAndCall`, **ПОВИНЕН** реалізувати інтерфейс `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Інтерфейс для будь-якого контракту, який хоче підтримувати `approveAndCall` з контрактів токенів ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Щоразу, коли `owner` токенів ERC-1363 схвалює цей контракт через `ERC1363::approveAndCall`
   * щоб витратити свої токени, ця функція викликається.
   *
   * ПРИМІТКА: щоб прийняти схвалення, вона має повернути
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (тобто 0x7b04a2d0, або власний селектор функцій).
   *
   * @param owner Адреса, яка викликала функцію `approveAndCall` і раніше володіла токенами.
   * @param value Кількість токенів, що будуть витрачені.
   * @param data Додаткові дані без зазначеного формату.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`, якщо схвалення дозволено, якщо не виникає помилка.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Для подальшого читання {#further-reading}

- [ERC-1363: стандарт токена з можливістю оплати](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: репозиторій на GitHub](https://github.com/vittominacori/erc1363-payable-token)
