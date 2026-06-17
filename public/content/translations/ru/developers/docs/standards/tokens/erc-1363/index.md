---
title: Стандарт токенов ERC-1363 Payable Token
description: ERC-1363 — это интерфейс расширения для токенов ERC-20, который поддерживает выполнение пользовательской логики в контракте получателя после переводов или в контракте расходующего лица после одобрений в рамках одной транзакции.
lang: ru
---

## Введение {#introduction}

### Что такое ERC-1363? {#what-is-erc1363}

ERC-1363 — это интерфейс расширения для токенов ERC-20, который поддерживает выполнение пользовательской логики в контракте получателя после переводов или в контракте расходующего лица после одобрений в рамках одной транзакции.

### Отличия от ERC-20 {#erc20-differences}

Стандартные операции ERC-20, такие как `transfer`, `transferFrom` и `approve`, не позволяют выполнять код в контракте получателя или расходующего лица без отдельной транзакции.
Это усложняет разработку пользовательских интерфейсов и препятствует внедрению, поскольку пользователи должны дождаться выполнения первой транзакции, а затем отправить вторую.
Им также приходится дважды платить за Газ.

ERC-1363 позволяет взаимозаменяемым токенам легче выполнять действия и работать без использования каких-либо офчейн-слушателей.
Он позволяет выполнять обратный вызов в контракте получателя или расходующего лица после перевода или одобрения в рамках одной транзакции.

## Предварительные требования {#prerequisites}

Для лучшего понимания этой страницы мы рекомендуем сначала прочитать про:

- [Стандарты токенов](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Основная часть {#body}

ERC-1363 представляет стандартный API для токенов ERC-20 для взаимодействия со смарт-контрактами после `transfer`, `transferFrom` или `approve`.

Этот стандарт предоставляет базовую функциональность для перевода токенов, а также позволяет одобрять токены, чтобы они могли быть потрачены третьей ончейн-стороной, а затем выполнять обратный вызов в контракте получателя или расходующего лица.

Существует множество предлагаемых вариантов использования смарт-контрактов, которые могут принимать обратные вызовы ERC-20.

Примерами могут быть:

- **Краудсейлы**: отправленные токены инициируют мгновенное распределение вознаграждения.
- **Услуги**: оплата активирует доступ к услуге за один шаг.
- **Счета**: токены автоматически оплачивают счета.
- **Подписки**: одобрение годовой ставки активирует подписку в рамках платежа за первый месяц.

По этим причинам он изначально назывался **«Payable Token»** (Оплачиваемый токен).

Поведение обратного вызова еще больше расширяет его полезность, обеспечивая бесшовное взаимодействие, такое как:

- **Стейкинг**: переведенные токены инициируют автоматическую блокировку в контракте для стейкинга.
- **Голосование**: полученные токены регистрируют голоса в системе управления.
- **Свопы**: одобрения токенов активируют логику свопа за один шаг.

Токены ERC-1363 могут использоваться для конкретных утилит во всех случаях, когда требуется выполнение обратного вызова после перевода или получения одобрения.
ERC-1363 также полезен для предотвращения потери или блокировки токенов в смарт-контрактах путем проверки способности получателя обрабатывать токены.

В отличие от других предложений по расширению ERC-20, ERC-1363 не переопределяет методы ERC-20 `transfer` и `transferFrom` и определяет идентификаторы интерфейсов, которые должны быть реализованы, сохраняя обратную совместимость с ERC-20.

Из [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Методы {#methods}

Смарт-контракты, реализующие стандарт ERC-1363, **ДОЛЖНЫ** реализовывать все функции в интерфейсе `ERC1363`, а также интерфейсы `ERC20` и `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Интерфейс расширения для токенов ERC-20, который поддерживает выполнение кода на контракте-получателе
 * после `transfer` или `transferFrom`, или кода на контракте spender после `approve`, в одной транзакции.
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
   * @dev Перемещает количество токенов `value` со счета вызывающего на `to`
   * и затем вызывает `ERC1363Receiver::onTransferReceived` на `to`.
   * @param to Адрес, на который переводятся токены.
   * @param value Количество переводимых токенов.
   * @return Логическое значение, указывающее на успешность операции, если не выброшено исключение.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Перемещает количество токенов `value` со счета вызывающего на `to`
   * и затем вызывает `ERC1363Receiver::onTransferReceived` на `to`.
   * @param to Адрес, на который переводятся токены.
   * @param value Количество переводимых токенов.
   * @param data Дополнительные данные без заданного формата, отправляемые при вызове `to`.
   * @return Логическое значение, указывающее на успешность операции, если не выброшено исключение.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Перемещает количество токенов `value` от `from` к `to` с использованием механизма разрешений (allowance)
   * и затем вызывает `ERC1363Receiver::onTransferReceived` на `to`.
   * @param from Адрес, с которого отправляются токены.
   * @param to Адрес, на который переводятся токены.
   * @param value Количество переводимых токенов.
   * @return Логическое значение, указывающее на успешность операции, если не выброшено исключение.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Перемещает количество токенов `value` от `from` к `to` с использованием механизма разрешений (allowance)
   * и затем вызывает `ERC1363Receiver::onTransferReceived` на `to`.
   * @param from Адрес, с которого отправляются токены.
   * @param to Адрес, на который переводятся токены.
   * @param value Количество переводимых токенов.
   * @param data Дополнительные данные без заданного формата, отправляемые при вызове `to`.
   * @return Логическое значение, указывающее на успешность операции, если не выброшено исключение.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Устанавливает количество токенов `value` в качестве разрешения для `spender` на токены вызывающего
   * и затем вызывает `ERC1363Spender::onApprovalReceived` на `spender`.
   * @param spender Адрес, который будет расходовать средства.
   * @param value Количество токенов для расходования.
   * @return Логическое значение, указывающее на успешность операции, если не выброшено исключение.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Устанавливает количество токенов `value` в качестве разрешения для `spender` на токены вызывающего
   * и затем вызывает `ERC1363Spender::onApprovalReceived` на `spender`.
   * @param spender Адрес, который будет расходовать средства.
   * @param value Количество токенов для расходования.
   * @param data Дополнительные данные без заданного формата, отправляемые при вызове `spender`.
   * @return Логическое значение, указывающее на успешность операции, если не выброшено исключение.
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

Смарт-контракт, который хочет принимать токены ERC-1363 через `transferAndCall` или `transferFromAndCall`, **ДОЛЖЕН** реализовывать интерфейс `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Интерфейс для любого контракта, который хочет поддерживать `transferAndCall` или `transferFromAndCall` от контрактов токенов ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Всякий раз, когда токены ERC-1363 переводятся на этот контракт через `ERC1363::transferAndCall` или `ERC1363::transferFromAndCall`
   * оператором `operator` от `from`, вызывается эта функция.
   *
   * ПРИМЕЧАНИЕ: Чтобы принять перевод, она должна вернуть
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (т.е. 0x88a7ca5c, или селектор собственной функции).
   *
   * @param operator Адрес, который вызвал функцию `transferAndCall` или `transferFromAndCall`.
   * @param from Адрес, с которого переводятся токены.
   * @param value Количество переведенных токенов.
   * @param data Дополнительные данные без заданного формата.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`, если перевод разрешен, если не выброшено исключение.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Смарт-контракт, который хочет принимать токены ERC-1363 через `approveAndCall`, **ДОЛЖЕН** реализовывать интерфейс `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Интерфейс для любого контракта, который хочет поддерживать `approveAndCall` от контрактов токенов ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Всякий раз, когда `owner` токенов ERC-1363 одобряет этот контракт через `ERC1363::approveAndCall`
   * для расходования своих токенов, вызывается эта функция.
   *
   * ПРИМЕЧАНИЕ: Чтобы принять одобрение, она должна вернуть
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (т.е. 0x7b04a2d0, или селектор собственной функции).
   *
   * @param owner Адрес, который вызвал функцию `approveAndCall` и ранее владел токенами.
   * @param value Количество токенов для расходования.
   * @param data Дополнительные данные без заданного формата.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`, если одобрение разрешено, если не выброшено исключение.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Дополнительная литература {#further-reading}

- [ERC-1363: Стандарт токенов Payable Token](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Репозиторий на GitHub](https://github.com/vittominacori/erc1363-payable-token)