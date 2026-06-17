---
title: Стандарт платіжного токена ERC-1363
description: ERC-1363 — це інтерфейс розширення для токенів ERC-20, який підтримує виконання користувацької логіки в контракті одержувача після переказів або в контракті витратника після схвалень у межах однієї транзакції.
lang: uk
---

## Вступ {#introduction}

### Що таке ERC-1363? {#what-is-erc1363}

ERC-1363 — це інтерфейс розширення для токенів ERC-20, який підтримує виконання користувацької логіки в контракті одержувача після переказів або в контракті витратника після схвалень у межах однієї транзакції.

### Відмінності від ERC-20 {#erc20-differences}

Стандартні операції ERC-20, такі як `transfer`, `transferFrom` та `approve`, не дозволяють виконувати код у контракті одержувача або витратника без окремої транзакції.
Це ускладнює розробку інтерфейсу користувача (UI) та створює перешкоди для впровадження, оскільки користувачі повинні чекати виконання першої транзакції, а потім надсилати другу.
Їм також доводиться двічі платити за газ.

ERC-1363 дозволяє взаємозамінним токенам легше виконувати дії та працювати без використання будь-якого позамережевого слухача.
Він дозволяє здійснювати зворотний виклик у контракті одержувача або витратника після переказу або схвалення в межах однієї транзакції.

## Передумови {#prerequisites}

Для кращого розуміння цієї сторінки ми рекомендуємо спочатку прочитати про:

- [Стандарти токенів](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Основна частина {#body}

ERC-1363 запроваджує стандартний API для токенів ERC-20 для взаємодії зі смарт-контрактами після `transfer`, `transferFrom` або `approve`.

Цей стандарт надає базову функціональність для переказу токенів, а також дозволяє схвалювати токени, щоб їх могла витратити інша ончейн третя сторона, а потім здійснювати зворотний виклик у контракті одержувача або витратника.

Існує багато запропонованих варіантів використання смарт-контрактів, які можуть приймати зворотні виклики ERC-20.

Прикладами можуть бути:

- **Краудсейли**: надіслані токени ініціюють миттєвий розподіл винагороди.
- **Послуги**: оплата активує доступ до послуги за один крок.
- **Рахунки-фактури**: токени автоматично оплачують рахунки.
- **Підписки**: схвалення річної ставки активує підписку під час оплати першого місяця.

З цих причин він спочатку називався **«Платіжний токен» (Payable Token)**.

Поведінка зворотного виклику ще більше розширює його корисність, забезпечуючи безперебійну взаємодію, таку як:

- **Стейкінг**: переказані токени ініціюють автоматичне блокування в контракті стейкінгу.
- **Голосування**: отримані токени реєструють голоси в системі управління.
- **Обмін**: схвалення токенів активують логіку обміну за один крок.

Токени ERC-1363 можна використовувати для конкретних цілей у всіх випадках, які вимагають виконання зворотного виклику після переказу або отримання схвалення.
ERC-1363 також корисний для уникнення втрати або блокування токенів у смарт-контрактах шляхом перевірки здатності одержувача обробляти токени.

На відміну від інших пропозицій щодо розширення ERC-20, ERC-1363 не перевизначає методи ERC-20 `transfer` та `transferFrom` і визначає ідентифікатори інтерфейсів, які мають бути реалізовані, зберігаючи зворотну сумісність з ERC-20.

З [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Методи {#methods}

Смарт-контракти, що реалізують стандарт ERC-1363, **ПОВИННІ** реалізувати всі функції в інтерфейсі `ERC1363`, а також інтерфейси `ERC20` та `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Інтерфейс розширення для токенів ERC-20, який підтримує виконання коду на контракті-отримувачі
 * після `transfer` або `transferFrom`, або коду на контракті-витратнику після `approve`, в одній транзакції.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * ПРИМІТКА: ідентифікатор ERC-165 для цього інтерфейсу — 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Переміщує кількість токенів `value` з рахунку того, хто викликає, на `to`
   * і потім викликає `ERC1363Receiver::onTransferReceived` на `to`.
   * @param to Адреса, на яку переказуються токени.
   * @param value Кількість токенів для переказу.
   * @return Логічне значення, що вказує на успішність операції, якщо не виникає помилка.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Переміщує кількість токенів `value` з рахунку того, хто викликає, на `to`
   * і потім викликає `ERC1363Receiver::onTransferReceived` на `to`.
   * @param to Адреса, на яку переказуються токени.
   * @param value Кількість токенів для переказу.
   * @param data Додаткові дані без визначеного формату, надіслані у виклику до `to`.
   * @return Логічне значення, що вказує на успішність операції, якщо не виникає помилка.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Переміщує кількість токенів `value` з `from` на `to` за допомогою механізму дозволів (allowance)
   * і потім викликає `ERC1363Receiver::onTransferReceived` на `to`.
   * @param from Адреса, з якої надсилаються токени.
   * @param to Адреса, на яку переказуються токени.
   * @param value Кількість токенів для переказу.
   * @return Логічне значення, що вказує на успішність операції, якщо не виникає помилка.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Переміщує кількість токенів `value` з `from` на `to` за допомогою механізму дозволів (allowance)
   * і потім викликає `ERC1363Receiver::onTransferReceived` на `to`.
   * @param from Адреса, з якої надсилаються токени.
   * @param to Адреса, на яку переказуються токени.
   * @param value Кількість токенів для переказу.
   * @param data Додаткові дані без визначеного формату, надіслані у виклику до `to`.
   * @return Логічне значення, що вказує на успішність операції, якщо не виникає помилка.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Встановлює кількість токенів `value` як дозвіл (allowance) для `spender` на токени того, хто викликає,
   * і потім викликає `ERC1363Spender::onApprovalReceived` на `spender`.
   * @param spender Адреса, яка буде витрачати кошти.
   * @param value Кількість токенів для витрачання.
   * @return Логічне значення, що вказує на успішність операції, якщо не виникає помилка.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Встановлює кількість токенів `value` як дозвіл (allowance) для `spender` на токени того, хто викликає,
   * і потім викликає `ERC1363Spender::onApprovalReceived` на `spender`.
   * @param spender Адреса, яка буде витрачати кошти.
   * @param value Кількість токенів для витрачання.
   * @param data Додаткові дані без визначеного формату, надіслані у виклику до `spender`.
   * @return Логічне значення, що вказує на успішність операції, якщо не виникає помилка.
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
 * @dev Інтерфейс для будь-якого контракту, який хоче підтримувати `transferAndCall` або `transferFromAndCall` від контрактів токенів ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Щоразу, коли токени ERC-1363 переказуються на цей контракт через `ERC1363::transferAndCall` або `ERC1363::transferFromAndCall`
   * `operator` від `from`, викликається ця функція.
   *
   * ПРИМІТКА: Щоб прийняти переказ, вона повинна повернути
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (тобто 0x88a7ca5c, або власний селектор функції).
   *
   * @param operator Адреса, яка викликала функцію `transferAndCall` або `transferFromAndCall`.
   * @param from Адреса, з якої переказуються токени.
   * @param value Кількість переказаних токенів.
   * @param data Додаткові дані без визначеного формату.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`, якщо переказ дозволено, якщо не виникає помилка.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Смарт-контракт, який хоче приймати токени ERC-1363 через `approveAndCall`, **ПОВИНЕН** реалізувати інтерфейс `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Інтерфейс для будь-якого контракту, який хоче підтримувати `approveAndCall` від контрактів токенів ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Щоразу, коли `owner` токенів ERC-1363 схвалює цей контракт через `ERC1363::approveAndCall`
   * для витрачання своїх токенів, викликається ця функція.
   *
   * ПРИМІТКА: Щоб прийняти схвалення, вона повинна повернути
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (тобто 0x7b04a2d0, або власний селектор функції).
   *
   * @param owner Адреса, яка викликала функцію `approveAndCall` і раніше володіла токенами.
   * @param value Кількість токенів для витрачання.
   * @param data Додаткові дані без визначеного формату.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`, якщо схвалення дозволено, якщо не виникає помилка.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Подальше читання {#further-reading}

- [ERC-1363: Стандарт платіжного токена](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Репозиторій на GitHub](https://github.com/vittominacori/erc1363-payable-token)