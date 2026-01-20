---
title: Стандарт оплачиваемых токенов ERC-1363
description: ERC-1363 — это интерфейс расширения для токенов ERC-20, который поддерживает выполнение пользовательской логики в контракте получателя после переводов или в контракте расходования после одобрений в рамках одной транзакции.
lang: ru
---

## Введение {#introduction}

### Что такое ERC-1363? {#what-is-erc1363}

ERC-1363 — это интерфейс расширения для токенов ERC-20, который поддерживает выполнение пользовательской логики в контракте получателя после переводов или в контракте расходования после одобрений в рамках одной транзакции.

### Отличия от ERC-20 {#erc20-differences}

Стандартные операции ERC-20, такие как `transfer`, `transferFrom` и `approve`, не позволяют выполнять код в контракте получателя или расходования без отдельной транзакции.
Это усложняет разработку пользовательского интерфейса и препятствует внедрению, поскольку пользователи должны дождаться выполнения первой транзакции, а затем отправить вторую.
Им также приходится дважды платить за ГАЗ.

ERC-1363 позволяет взаимозаменяемым токенам проще выполнять действия и работать без использования каких-либо внесетевых слушателей.
Он позволяет выполнить обратный вызов в контракте получателя или расходования после перевода или одобрения в рамках одной транзакции.

## Предварительные условия {#prerequisites}

Чтобы лучше понять эту страницу, мы рекомендуем вам сначала прочитать о:

- [Стандарты токенов](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Тело {#body}

ERC-1363 представляет стандартный API для взаимодействия токенов ERC-20 с умными контрактами после выполнения `transfer`, `transferFrom` или `approve`.

Этот стандарт предоставляет базовую функциональность для перевода токенов, а также позволяет одобрять токены, чтобы их могла потратить другая внутрисетевая третья сторона, а затем выполнить обратный вызов в контракте получателя или расходования.

Существует множество предлагаемых вариантов использования умных контрактов, которые могут принимать обратные вызовы ERC-20.

Примеры:

- **Краудсейлы**: отправленные токены вызывают мгновенное распределение вознаграждения.
- **Сервисы**: оплата активирует доступ к услуге за один шаг.
- **Счета**: токены автоматически оплачивают счета.
- **Подписки**: одобрение годовой ставки активирует подписку в рамках платежа за первый месяц.

По этим причинам он изначально назывался **"оплачиваемым токеном"**.

Поведение обратного вызова еще больше расширяет его полезность, обеспечивая беспрепятственные взаимодействия, такие как:

- **Стейкинг**: переведенные токены вызывают автоматическую блокировку в контракте стейкинга.
- **Голосование**: полученные токены регистрируют голоса в системе управления.
- **Обмен**: одобрение токенов активирует логику обмена за один шаг.

Токены ERC-1363 могут использоваться для определенных утилит во всех случаях, когда требуется выполнить обратный вызов после получения перевода или одобрения.
ERC-1363 также полезен для предотвращения потери или блокировки токенов в умных контрактах путем проверки способности получателя обрабатывать токены.

В отличие от других предложений по расширению ERC-20, ERC-1363 не переопределяет методы ERC-20 `transfer` и `transferFrom` и определяет идентификаторы интерфейсов, которые должны быть реализованы, сохраняя обратную совместимость с ERC-20.

Из [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Методы {#methods}

Умные контракты, реализующие стандарт ERC-1363, **ДОЛЖНЫ** реализовывать все функции интерфейса `ERC1363`, а также интерфейсов `ERC20` и `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Интерфейс расширения для токенов ERC-20, который поддерживает выполнение кода в контракте получателя
 * после `transfer` или `transferFrom` или кода в контракте расходования после `approve` в рамках одной транзакции.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * ПРИМЕЧАНИЕ: идентификатор ERC-165 для этого интерфейса — 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Перемещает токены в количестве `value` со счета вызывающего на `to`
   * и затем вызывает `ERC1363Receiver::onTransferReceived` на `to`.
   * @param to Адрес, на который переводятся токены.
   * @param value Количество токенов для перевода.
   * @return Логическое значение, указывающее, что операция прошла успешно, если не возникло исключение.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Перемещает токены в количестве `value` со счета вызывающего на `to`
   * и затем вызывает `ERC1363Receiver::onTransferReceived` на `to`.
   * @param to Адрес, на который переводятся токены.
   * @param value Количество токенов для перевода.
   * @param data Дополнительные данные без указанного формата, отправляемые при вызове `to`.
   * @return Логическое значение, указывающее, что операция прошла успешно, если не возникло исключение.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Перемещает токены в количестве `value` из `from` в `to`, используя механизм разрешений,
   * и затем вызывает `ERC1363Receiver::onTransferReceived` в `to`.
   * @param from Адрес, с которого отправляются токены.
   * @param to Адрес, на который переводятся токены.
   * @param value Количество токенов для перевода.
   * @return Логическое значение, указывающее, что операция прошла успешно, если не возникло исключение.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Перемещает токены в количестве `value` из `from` в `to`, используя механизм разрешений,
   * и затем вызывает `ERC1363Receiver::onTransferReceived` в `to`.
   * @param from Адрес, с которого отправляются токены.
   * @param to Адрес, на который переводятся токены.
   * @param value Количество токенов для перевода.
   * @param data Дополнительные данные без указанного формата, отправляемые при вызове `to`.
   * @return Логическое значение, указывающее, что операция прошла успешно, если не возникло исключение.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Устанавливает количество токенов `value` в качестве разрешения для `spender` на токены вызывающего,
   * а затем вызывает `ERC1363Spender::onApprovalReceived` на `spender`.
   * @param spender Адрес, который будет тратить средства.
   * @param value Количество токенов, которое будет потрачено.
   * @return Логическое значение, указывающее, что операция прошла успешно, если не возникло исключение.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Устанавливает количество токенов `value` в качестве разрешения для `spender` на токены вызывающего,
   * а затем вызывает `ERC1363Spender::onApprovalReceived` на `spender`.
   * @param spender Адрес, который будет тратить средства.
   * @param value Количество токенов, которое будет потрачено.
   * @param data Дополнительные данные без указанного формата, отправляемые при вызове `spender`.
   * @return Логическое значение, указывающее, что операция прошла успешно, если не возникло исключение.
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

Умный контракт, который хочет принимать токены ERC-1363 через `transferAndCall` или `transferFromAndCall`, **ДОЛЖЕН** реализовывать интерфейс `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Интерфейс для любого контракта, который хочет поддерживать `transferAndCall` или `transferFromAndCall` от контрактов токенов ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Эта функция вызывается всякий раз, когда токены ERC-1363 переводятся в этот контракт с помощью `ERC1363::transferAndCall` или `ERC1363::transferFromAndCall`
   * оператором `operator` от `from`.
   *
   * ПРИМЕЧАНИЕ: чтобы принять перевод, эта функция должна вернуть
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (т. е. 0x88a7ca5c или свой собственный селектор функции).
   *
   * @param operator Адрес, который вызвал функцию `transferAndCall` или `transferFromAndCall`.
   * @param from Адрес, с которого были переведены токены.
   * @param value Количество переведенных токенов.
   * @param data Дополнительные данные без указанного формата.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`, если перевод разрешен, если не возникло исключение.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Умный контракт, который хочет принимать токены ERC-1363 через `approveAndCall`, **ДОЛЖЕН** реализовывать интерфейс `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Интерфейс для любого контракта, который хочет поддерживать `approveAndCall` от контрактов токенов ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Эта функция вызывается всякий раз, когда `owner` токенов ERC-1363 одобряет этот контракт через `ERC1363::approveAndCall`
   * для траты своих токенов.
   *
   * ПРИМЕЧАНИЕ: чтобы принять одобрение, эта функция должна вернуть
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (т. е. 0x7b04a2d0 или свой собственный селектор функции).
   *
   * @param owner Адрес, который вызвал функцию `approveAndCall` и ранее владел токенами.
   * @param value Количество токенов, которое будет потрачено.
   * @param data Дополнительные данные без указанного формата.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`, если одобрение разрешено, если не возникло исключение.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Дополнительные материалы {#further-reading}

- [ERC-1363: Стандарт оплачиваемых токенов](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: репозиторий GitHub](https://github.com/vittominacori/erc1363-payable-token)
