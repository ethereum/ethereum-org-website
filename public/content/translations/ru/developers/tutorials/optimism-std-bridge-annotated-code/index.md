---
title: "Пошаговый обзор контракта стандартного Моста Optimism"
description: Как работает стандартный Мост для Optimism? Почему он работает именно так?
author: Ори Померанц
tags: [ "твердость", "Мост", "уровень 2" ]
skill: intermediate
published: 2022-03-30
lang: ru
---

[Optimism](https://www.optimism.io/) — это [оптимистический ролл-ап](/developers/docs/scaling/optimistic-rollups/).
Оптимистические ролл-апы могут обрабатывать транзакции по гораздо более низкой цене, чем основная сеть Ethereum (также известная как уровень 1, или L1), поскольку транзакции обрабатываются только несколькими узлами, а не каждым узлом в сети.
В то же время все данные записываются в L1, поэтому все можно доказать и реконструировать со всеми гарантиями целостности и доступности основной сети.

Чтобы использовать активы L1 в Optimism (или в любом другом L2), их необходимо [перевести через Мост](/bridges/#prerequisites).
Один из способов добиться этого — предоставить пользователям возможность заблокировать активы (наиболее распространенными являются ETH и [токены ERC-20](/developers/docs/standards/tokens/erc-20/)) на L1 и получить эквивалентные активы для использования на L2.
В конечном итоге тот, кто их получит, может захотеть вернуть их на L1 через Мост.
При этом активы сжигаются на L2, а затем возвращаются пользователю на L1.

Именно так работает [стандартный Мост Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
В этой статье мы рассмотрим исходный код этого Моста, чтобы увидеть, как он работает, и изучим его как пример хорошо написанного кода на Solidity.

## Потоки управления {#control-flows}

Мост имеет два основных потока:

- Депозит (с L1 на L2)
- Вывод (с L2 на L1)

### Поток депозита {#deposit-flow}

#### Уровень 1 {#deposit-flow-layer-1}

1. При внесении ERC-20 вкладчик дает Мосту разрешение на расходование вносимой суммы
2. Вкладчик вызывает Мост L1 (`depositERC20`, `depositERC20To`, `depositETH` или `depositETHTo`)
3. Мост L1 получает во владение переведенный через Мост актив
   - ETH: актив передается вкладчиком в рамках вызова
   - ERC-20: актив переводится Мостом самому себе, используя разрешение, предоставленное вкладчиком
4. Мост L1 использует механизм междоменных сообщений для вызова `finalizeDeposit` на Мосте L2

#### Уровень 2 {#deposit-flow-layer-2}

5. Мост L2 проверяет, что вызов `finalizeDeposit` является легитимным:
   - Вызов поступил из контракта междоменных сообщений
   - Изначально был отправлен с Моста на L1
6. Мост L2 проверяет, является ли контракт токена ERC-20 на L2 верным:
   - Контракт L2 сообщает, что его аналог на L1 совпадает с тем, от которого поступили токены на L1
   - Контракт L2 сообщает, что он поддерживает правильный интерфейс ([с использованием ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Если контракт L2 является верным, он вызывается для выпуска соответствующего количества токенов на соответствующий адрес. В противном случае запускается процесс вывода, чтобы пользователь мог получить токены на L1.

### Поток вывода {#withdrawal-flow}

#### Уровень 2 {#withdrawal-flow-layer-2}

1. Инициатор вывода вызывает Мост L2 (`withdraw` или `withdrawTo`)
2. Мост L2 сжигает соответствующее количество токенов, принадлежащих `msg.sender`
3. Мост L2 использует механизм междоменных сообщений для вызова `finalizeETHWithdrawal` или `finalizeERC20Withdrawal` на Мосте L1

#### Уровень 1 {#withdrawal-flow-layer-1}

4. Мост L1 проверяет, что вызов `finalizeETHWithdrawal` или `finalizeERC20Withdrawal` является легитимным:
   - Вызов поступил через механизм междоменных сообщений
   - Изначально был отправлен с Моста на L2
5. Мост L1 переводит соответствующий актив (ETH или ERC-20) на соответствующий адрес

## Код уровня 1 {#layer-1-code}

Это код, который выполняется на L1, в основной сети Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Этот интерфейс определен здесь](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Он включает функции и определения, необходимые для перевода токенов ERC-20 через Мост.

```solidity
// SPDX-License-Identifier: MIT
```

[Большая часть кода Optimism выпущена под лицензией MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

На момент написания статьи последняя версия Solidity — 0.8.12.
Пока не выйдет версия 0.9.0, неизвестно, будет ли этот код совместим с ней.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * События *
     **********/

    event ERC20DepositInitiated(
```

В терминологии Моста Optimism _депозит_ означает перевод с L1 на L2, а _вывод_ — перевод с L2 на L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

В большинстве случаев адрес ERC-20 на L1 не совпадает с адресом эквивалентного ERC-20 на L2.
[Список адресов токенов можно посмотреть здесь](https://static.optimism.io/optimism.tokenlist.json).
Адрес с `chainId` 1 находится на L1 (в основной сети), а адрес с `chainId` 10 — на L2 (в сети Optimism).
Два других значения `chainId` предназначены для тестовой сети Kovan (42) и тестовой сети Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

К переводам можно добавлять примечания, и в этом случае они добавляются в сообщающие о них события.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Один и тот же контракт Моста обрабатывает переводы в обоих направлениях.
В случае Моста L1 это означает инициализацию депозитов и финализацию выводов.

```solidity

    /********************
     * Публичные функции *
     ********************/

    /**
     * @dev Получить адрес соответствующего контракта Моста L2.
     * @return Адрес соответствующего контракта Моста L2.
     */
    function l2TokenBridge() external returns (address);
```

Эта функция на самом деле не нужна, так как на L2 это предварительно развернутый контракт, поэтому он всегда находится по адресу `0x4200000000000000000000000000000000000010`.
Она здесь для симметрии с Мостом L2, потому что адрес Моста L1 узнать _не_ тривиально.

```solidity
    /**
     * @dev внести сумму ERC20 на баланс вызывающего на L2.
     * @param _l1Token Адрес ERC20 на L1, который мы вносим
     * @param _l2Token Адрес соответствующего ERC20 на L2
     * @param _amount Сумма ERC20 для внесения
     * @param _l2Gas Лимит газа, необходимый для завершения депозита на L2.
     * @param _data Необязательные данные для пересылки на L2. Эти данные предоставляются
     *        исключительно для удобства внешних контрактов. Кроме ограничения максимальной
     *        длины, эти контракты не дают никаких гарантий относительно их содержимого.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Параметр `_l2Gas` — это количество газа на L2, которое может потратить транзакция.
[До определенного (высокого) лимита это бесплатно](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), поэтому, если только контракт ERC-20 не делает что-то действительно странное при выпуске, это не должно быть проблемой.
Эта функция предназначена для распространенного сценария, когда пользователь переводит активы через Мост на тот же адрес в другом блокчейне.

```solidity
    /**
     * @dev внести сумму ERC20 на баланс получателя на L2.
     * @param _l1Token Адрес ERC20 на L1, который мы вносим
     * @param _l2Token Адрес соответствующего ERC20 на L2
     * @param _to Адрес L2, на который будет зачислен вывод средств.
     * @param _amount Сумма ERC20 для внесения.
     * @param _l2Gas Лимит газа, необходимый для завершения депозита на L2.
     * @param _data Необязательные данные для пересылки на L2. Эти данные предоставляются
     *        исключительно для удобства внешних контрактов. Кроме ограничения максимальной
     *        длины, эти контракты не дают никаких гарантий относительно их содержимого.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Эта функция почти идентична `depositERC20`, но позволяет отправить ERC-20 на другой адрес.

```solidity
    /*************************
     * Межсетевые функции *
     *************************/

    /**
     * @dev Завершить вывод с L2 на L1 и зачислить средства на баланс получателя
     * токена ERC20 на L1.
     * Этот вызов не удастся, если инициированный вывод с L2 не был завершен.
     *
     * @param _l1Token Адрес токена L1 для finalizeWithdrawal.
     * @param _l2Token Адрес токена L2, на котором был инициирован вывод.
     * @param _from Адрес L2, инициирующий перевод.
     * @param _to Адрес L1, на который будет зачислен вывод.
     * @param _amount Сумма ERC20 для внесения.
     * @param _data Данные, предоставленные отправителем на L2. Эти данные предоставляются
     *   исключительно для удобства внешних контрактов. Кроме ограничения максимальной
     *   длины, эти контракты не дают никаких гарантий относительно их содержимого.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Вывод средств (и другие сообщения с L2 на L1) в Optimism — это двухэтапный процесс:

1. Инициирующая транзакция на L2.
2. Завершающая или запрашивающая транзакция на L1.
   Эта транзакция должна произойти после окончания [периода оспаривания сбоев](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) для транзакции L2.

### IL1StandardBridge {#il1standardbridge}

[Этот интерфейс определен здесь](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Этот файл содержит определения событий и функций для ETH.
Эти определения очень похожи на определения в `IL1ERC20Bridge`, приведенные выше для ERC-20.

Интерфейс Моста разделен на два файла, поскольку некоторые токены ERC-20 требуют специальной обработки и не могут обрабатываться стандартным Мостом.
Таким образом, пользовательский Мост, обрабатывающий такой токен, может реализовать `IL1ERC20Bridge` и не должен также переводить ETH через Мост.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * События *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Это событие почти идентично версии для ERC-20 (`ERC20DepositInitiated`), за исключением отсутствия адресов токенов L1 и L2.
То же самое относится и к другим событиям и функциям.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Публичные функции *
     ********************/

    /**
     * @dev Депозит суммы ETH на баланс вызывающего на L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Депозит суммы ETH на баланс получателя на L2.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Межсетевые функции *
     *************************/

    /**
     * @dev Завершить вывод с L2 на L1 и зачислить средства на баланс получателя
     * токена ETH на L1. Поскольку только xDomainMessenger может вызывать эту функцию, она никогда не будет вызвана
     * до завершения вывода.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Этот контракт](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) наследуется обоими Мостами ([L1](#the-l1-bridge-contract) и [L2](#the-l2-bridge-contract)) для отправки сообщений на другой уровень.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Этот интерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) сообщает контракту, как отправлять сообщения на другой уровень с помощью междоменного мессенджера.
Этот междоменный мессенджер — это целая отдельная система, которая заслуживает отдельной статьи, и я надеюсь написать ее в будущем.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Вспомогательный контракт для контрактов, выполняющих междоменные коммуникации
 *
 * Используемый компилятор: определяется наследующим контрактом
 */
contract CrossDomainEnabled {
    /*************
     * Переменные *
     *************/

    // Контракт-мессенджер, используемый для отправки и получения сообщений из другого домена.
    address public messenger;

    /***************
     * Конструктор *
     ***************/

    /**
     * @param _messenger Адрес CrossDomainMessenger на текущем уровне.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Единственный параметр, который должен знать контракт, — это адрес междоменного мессенджера на этом уровне.
Этот параметр устанавливается один раз в конструкторе и никогда не изменяется.

```solidity

    /**********************
     * Модификаторы функций *
     **********************/

    /**
     * Гарантирует, что измененную функцию может вызывать только определенная междоменная учетная запись.
     * @param _sourceDomainAccount Единственный аккаунт в исходном домене, который аутентифицирован для вызова этой функции.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Междоменный обмен сообщениями доступен любому контракту в блокчейне, в котором он запущен (либо в основной сети Ethereum, либо в Optimism).
Но нам нужно, чтобы Мост на каждой стороне доверял только определенным сообщениям, если они исходят от Моста на другой стороне.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Доверять можно только сообщениям от соответствующего междоменного мессенджера (`messenger`, как вы увидите ниже).

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Междоменный мессенджер предоставляет адрес, отправивший сообщение на другой уровень, с помощью [функции `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Пока он вызывается в транзакции, инициированной сообщением, он может предоставить эту информацию.

Нам нужно убедиться, что полученное сообщение пришло от другого Моста.

```solidity

        _;
    }

    /**********************
     * Внутренние функции *
     **********************/

    /**
     * Получает мессенджер, обычно из хранилища. Эта функция доступна на случай, если дочернему контракту
     * потребуется переопределение.
     * @return Адрес контракта междоменного мессенджера, который следует использовать.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Эта функция возвращает междоменный мессенджер.
Мы используем функцию, а не переменную `messenger`, чтобы позволить контрактам, которые наследуются от этого, использовать алгоритм для указания, какой междоменный мессенджер использовать.

```solidity

    /**
     * Отправляет сообщение на аккаунт в другом домене
     * @param _crossDomainTarget Предполагаемый получатель в домене назначения
     * @param _message Данные для отправки цели (обычно calldata для функции с
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit gasLimit для получения сообщения в целевом домене.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Наконец, функция, которая отправляет сообщение на другой уровень.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) — это статический анализатор, который Optimism запускает для каждого контракта для поиска уязвимостей и других потенциальных проблем.
В этом случае следующая строка вызывает две уязвимости:

1. [События повторного входа](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Безопасный повторный вход](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

В данном случае мы не беспокоимся о повторном входе, поскольку знаем, что `getCrossDomainMessenger()` возвращает надежный адрес, даже если Slither не может этого знать.

### Контракт Моста L1 {#the-l1-bridge-contract}

[Исходный код этого контракта находится здесь](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Интерфейсы могут быть частью других контрактов, поэтому они должны поддерживать широкий диапазон версий Solidity.
Но сам Мост — это наш контракт, и мы можем быть строги в отношении того, какую версию Solidity он использует.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) и [IL1StandardBridge](#IL1StandardBridge) описаны выше.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Этот интерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) позволяет нам создавать сообщения для управления стандартным Мостом на L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Этот интерфейс](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) позволяет нам управлять контрактами ERC-20.
[Вы можете прочитать больше об этом здесь](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Как объяснялось выше](#crossdomainenabled), этот контракт используется для межуровневого обмена сообщениями.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) содержит адреса для контрактов L2, которые всегда имеют один и тот же адрес. Сюда входит стандартный Мост на L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Утилиты Address от OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Они используются для различения адресов контрактов и адресов, принадлежащих внешним аккаунтам (EOA).

Обратите внимание, что это не идеальное решение, поскольку невозможно отличить прямые вызовы от вызовов, сделанных из конструктора контракта, но, по крайней мере, это позволяет нам выявлять и предотвращать некоторые распространенные ошибки пользователей.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Стандарт ERC-20](https://eips.ethereum.org/EIPS/eip-20) поддерживает два способа, которыми контракт может сообщить о сбое:

1. Revert (откат)
2. Вернуть `false`

Обработка обоих случаев усложнила бы наш код, поэтому вместо этого мы используем [`SafeERC20` от OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), который гарантирует, что [все сбои приводят к откату](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Мост L1 для ETH и ERC20 — это контракт, который хранит депонированные средства L1 и стандартные
 * токены, используемые на L2. Он синхронизирует соответствующий Мост L2, информируя его о депозитах
 * и прослушивая его на предмет новых завершенных выводов.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Эта строка указывает на использование оболочки `SafeERC20` каждый раз, когда мы используем интерфейс `IERC20`.

```solidity

    /********************************
     * Ссылки на внешние контракты *
     ********************************/

    address public l2TokenBridge;
```

Адрес [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Сопоставляет токен L1 с токеном L2 для баланса депонированного токена L1
    mapping(address => mapping(address => uint256)) public deposits;
```

Двойное [сопоставление (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) — это способ определения [двумерного разреженного массива](https://en.wikipedia.org/wiki/Sparse_matrix).
Значения в этой структуре данных идентифицируются как `deposit[адрес токена L1][адрес токена L2]`.
Значение по умолчанию равно нулю.
В хранилище записываются только ячейки, которым присвоено другое значение.

```solidity

    /***************
     * Конструктор *
     ***************/

    // Этот контракт находится за прокси, поэтому параметры конструктора не будут использоваться.
    constructor() CrossDomainEnabled(address(0)) {}
```

Чтобы иметь возможность обновлять этот контракт без необходимости копировать все переменные в хранилище.
Для этого мы используем [`Прокси`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), контракт, который использует [`delegatecall`](https://solidity-by-example.org/delegatecall/) для перенаправления вызовов отдельному контракту, адрес которого хранится в прокси-контракте (при обновлении вы указываете прокси-контракту изменить этот адрес).
Когда вы используете `delegatecall`, хранилище остается хранилищем _вызывающего_ контракта, поэтому значения всех переменных состояния контракта не затрагиваются.

Одним из следствий этого шаблона является то, что хранилище контракта, который является _вызываемым_ для `delegatecall`, не используется, и поэтому значения конструктора, переданные ему, не имеют значения.
Именно по этой причине мы можем предоставить бессмысленное значение конструктору `CrossDomainEnabled`.
Это также причина того, что приведенная ниже инициализация отделена от конструктора.

```solidity
    /******************
     * Инициализация *
     ******************/

    /**
     * @param _l1messenger Адрес мессенджера L1, используемый для межсетевых коммуникаций.
     * @param _l2TokenBridge Адрес стандартного Моста L2.
     */
    // slither-disable-next-line external-function
```

Этот [тест Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) идентифицирует функции, которые не вызываются из кода контракта и поэтому могут быть объявлены как `external` вместо `public`.
Стоимость газа для `external`-функций может быть ниже, поскольку им можно предоставить параметры в calldata.
Функции, объявленные как `public`, должны быть доступны изнутри контракта.
Контракты не могут изменять свои собственные calldata, поэтому параметры должны находиться в памяти.
Когда такая функция вызывается извне, необходимо скопировать calldata в память, что стоит газ.
В этом случае функция вызывается только один раз, поэтому неэффективность для нас не имеет значения.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

Функцию `initialize` следует вызывать только один раз.
Если адрес междоменного мессенджера L1 или Моста токенов L2 изменится, мы создадим новый прокси и новый Мост, который его вызывает.
Такое вряд ли случится, за исключением случаев обновления всей системы, что является очень редким явлением.

Обратите внимание, что у этой функции нет никакого механизма, который ограничивает, _кто_ может ее вызывать.
Это означает, что теоретически злоумышленник может подождать, пока мы развернем прокси и первую версию Моста, а затем [опередить](https://solidity-by-example.org/hacks/front-running/) транзакцию, чтобы добраться до функции `initialize` раньше, чем это сделает легитимный пользователь. Но есть два способа предотвратить это:

1. Если контракты развертываются не напрямую EOA, а [в транзакции, в которой их создает другой контракт](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), весь процесс может быть атомарным и завершиться до выполнения любой другой транзакции.
2. Если легитимный вызов `initialize` не удался, всегда можно проигнорировать вновь созданный прокси и Мост и создать новые.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Это два параметра, которые должен знать Мост.

```solidity

    /**************
     * Внесение депозита *
     **************/

    /** @dev Модификатор, требующий, чтобы отправитель был EOA. Эту проверку можно обойти с помощью вредоносного
     *  контракта через initcode, но она помогает избежать ошибки пользователя, которой мы хотим избежать.
     */
    modifier onlyEOA() {
        // Используется для прекращения депозитов от контрактов (во избежание случайной потери токенов)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Именно по этой причине нам понадобились утилиты `Address` от OpenZeppelin.

```solidity
    /**
     * @dev Эту функцию можно вызвать без данных
     * для внесения суммы ETH на баланс вызывающего на L2.
     * Поскольку функция receive не принимает данные, консервативная
     * сумма по умолчанию пересылается на L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Эта функция существует для целей тестирования.
Обратите внимание, что она не появляется в определениях интерфейса — она не предназначена для обычного использования.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Эти две функции являются обертками `_initiateETHDeposit`, функции, которая обрабатывает фактический депозит ETH.

```solidity
    /**
     * @dev Выполняет логику для депозитов, сохраняя ETH и информируя шлюз L2 ETH о
     * депозите.
     * @param _from Аккаунт для снятия депозита на L1.
     * @param _to Аккаунт для зачисления депозита на L2.
     * @param _l2Gas Лимит газа, необходимый для завершения депозита на L2.
     * @param _data Необязательные данные для пересылки на L2. Эти данные предоставляются
     *        исключительно для удобства внешних контрактов. Кроме ограничения максимальной
     *        длины, эти контракты не дают никаких гарантий относительно их содержимого.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Конструируем calldata для вызова finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Междоменные сообщения работают следующим образом: контракт назначения вызывается с сообщением в качестве его calldata.
Контракты Solidity всегда интерпретируют свои calldata в соответствии с
[спецификациями ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Функция Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) создает эти calldata.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

Здесь сообщение вызывает [функцию `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) со следующими параметрами:

| Параметр                        | Значение                                                                                 | Значение                                                                                                                                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | Специальное значение для обозначения ETH (который не является токеном ERC-20) на L1                                                                                      |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Контракт L2, который управляет ETH в Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (этот контракт предназначен только для внутреннего использования в Optimism) |
| \_from    | \_from                                                             | Адрес на L1, который отправляет ETH                                                                                                                                                         |
| \_to      | \_to                                                               | Адрес на L2, который получает ETH                                                                                                                                                           |
| сумма                           | msg.value                                                                | Количество отправленных wei (которые уже отправлены на Мост)                                                                                                             |
| \_data    | \_data                                                             | Дополнительные данные для присоединения к депозиту                                                                                                                                          |

```solidity
        // Отправить calldata на L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Отправьте сообщение через междоменный мессенджер.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Выпустить событие, чтобы уведомить любое децентрализованное приложение, которое отслеживает этот перевод.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Эти две функции являются обертками `_initiateERC20Deposit`, функции, которая обрабатывает фактический депозит ERC-20.

```solidity
    /**
     * @dev Выполняет логику для депозитов, информируя контракт депонированного токена L2
     * о депозите и вызывая обработчик для блокировки средств на L1 (например, transferFrom).
     *
     * @param _l1Token Адрес ERC20 на L1, который мы вносим
     * @param _l2Token Адрес соответствующего ERC20 на L2
     * @param _from Аккаунт для снятия депозита на L1
     * @param _to Аккаунт для зачисления депозита на L2
     * @param _amount Сумма ERC20 для внесения.
     * @param _l2Gas Лимит газа, необходимый для завершения депозита на L2.
     * @param _data Необязательные данные для пересылки на L2. Эти данные предоставляются
     *        исключительно для удобства внешних контрактов. Кроме ограничения максимальной
     *        длины, эти контракты не дают никаких гарантий относительно их содержимого.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

Эта функция аналогична `_initiateETHDeposit` выше, но с несколькими важными отличиями.
Первое отличие состоит в том, что эта функция получает адреса токенов и сумму для перевода в качестве параметров.
В случае с ETH вызов Моста уже включает перевод актива на счет Моста (`msg.value`).

```solidity
        // Когда депозит инициируется на L1, Мост L1 переводит средства себе для будущих
        // выводов. safeTransferFrom также проверяет, есть ли у контракта код, поэтому это не удастся, если
        // _from является EOA или address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Переводы токенов ERC-20 следуют иному процессу, чем ETH:

1. Пользователь (`_from`) дает Мосту разрешение на перевод соответствующих токенов.
2. Пользователь вызывает Мост, указывая адрес контракта токена, сумму и т. д.
3. Мост переводит токены (самому себе) в рамках процесса депозита.

Первый шаг может выполняться в отдельной транзакции от двух последних.
Однако упреждающее выполнение (front-running) не является проблемой, поскольку две функции, которые вызывают `_initiateERC20Deposit` (`depositERC20` и `depositERC20To`), вызывают эту функцию только с `msg.sender` в качестве параметра `_from`.

```solidity
        // Конструируем calldata для _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Отправить calldata на L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Добавьте внесенную сумму токенов в структуру данных `deposits`.
На L2 может быть несколько адресов, соответствующих одному и тому же токену ERC-20 на L1, поэтому недостаточно использовать баланс Моста токена ERC-20 на L1 для отслеживания депозитов.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Межсетевые функции *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Мост L2 отправляет сообщение междоменному мессенджеру L2, который заставляет междоменный мессенджер L1 вызывать эту функцию (конечно, как только [транзакция, завершающая сообщение](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions), будет отправлена на L1).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Убедитесь, что это _легитимное_ сообщение, исходящее от междоменного мессенджера и отправленное с Моста токенов L2.
Эта функция используется для вывода ETH с Моста, поэтому мы должны убедиться, что она вызывается только авторизованным вызывающим.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Способ перевода ETH заключается в вызове получателя с суммой wei в `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Выпустить событие о выводе средств.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Эта функция аналогична `finalizeETHWithdrawal` выше, с необходимыми изменениями для токенов ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Обновите структуру данных `deposits`.

```solidity

        // Когда вывод завершается на L1, Мост L1 переводит средства тому, кто их выводит
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Временно - миграция ETH *
     *****************************/

    /**
     * @dev Добавляет баланс ETH на аккаунт. Это предназначено для того, чтобы
     * ETH можно было перенести со старого шлюза на новый.
     * ПРИМЕЧАНИЕ: Это оставлено только для одного обновления, чтобы мы могли получить перенесенный ETH со
     * старого контракта
     */
    function donateETH() external payable {}
}
```

Существовала более ранняя реализация Моста.
Когда мы перешли от той реализации к этой, нам пришлось переместить все активы.
Токены ERC-20 можно просто переместить.
Однако для перевода ETH на контракт необходимо одобрение этого контракта, что нам и предоставляет `donateETH`.

## Токены ERC-20 на L2 {#erc-20-tokens-on-l2}

Чтобы токен ERC-20 подходил для стандартного Моста, он должен позволять стандартному Мосту и _только_ стандартному Мосту выпускать токены.
Это необходимо, потому что Мосты должны гарантировать, что количество токенов, находящихся в обращении в сети Optimism, равно количеству токенов, заблокированных в контракте Моста L1.
Если на L2 будет слишком много токенов, некоторые пользователи не смогут вернуть свои активы на L1 через Мост.
Вместо доверенного Моста мы, по сути, воссоздали бы [частичное банковское резервирование](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Если на L1 слишком много токенов, некоторые из этих токенов навсегда останутся заблокированными в контракте Моста, потому что их невозможно освободить без сжигания токенов L2.

### IL2StandardERC20 {#il2standarderc20}

Каждый токен ERC-20 на L2, который использует стандартный Мост, должен предоставлять [этот интерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), который содержит функции и события, необходимые стандартному Мосту.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Стандартный интерфейс ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) не включает функции `mint` и `burn`.
Эти методы не требуются [стандартом ERC-20](https://eips.ethereum.org/EIPS/eip-20), который оставляет неуказанными механизмы создания и уничтожения токенов.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Интерфейс ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) используется для указания, какие функции предоставляет контракт.
[Вы можете прочитать стандарт здесь](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Эта функция предоставляет адрес токена L1, который переведен на этот контракт через Мост.
Обратите внимание, что аналогичной функции в обратном направлении у нас нет.
Нам нужно иметь возможность переводить через Мост любой токен L1, независимо от того, планировалась ли поддержка L2 при его реализации или нет.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Функции и события для выпуска (создания) и сжигания (уничтожения) токенов.
Мост должен быть единственной сущностью, которая может выполнять эти функции, чтобы гарантировать правильное количество токенов (равное количеству токенов, заблокированных на L1).

### L2StandardERC20 {#L2StandardERC20}

[Это наша реализация интерфейса `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Если вам не нужна какая-то специальная логика, вам следует использовать эту реализацию.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Контракт ERC-20 от OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism не верит в изобретение велосипеда, особенно когда велосипед хорошо проверен и должен быть достаточно надежным для хранения активов.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Это два дополнительных параметра конфигурации, которые нам требуются и которых обычно нет у ERC-20.

```solidity

    /**
     * @param _l2Bridge Адрес стандартного Моста L2.
     * @param _l1Token Адрес соответствующего токена L1.
     * @param _name Название ERC20.
     * @param _symbol Символ ERC20.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

Сначала вызовите конструктор контракта, от которого мы наследуем (`ERC20(_name, _symbol)`), а затем установите наши собственные переменные.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

Именно так работает [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Каждый интерфейс — это набор поддерживаемых функций, и он идентифицируется как [исключающее ИЛИ](https://en.wikipedia.org/wiki/Exclusive_or) [селекторов функций ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) этих функций.

Мост L2 использует ERC-165 в качестве проверки на вменяемость, чтобы убедиться, что контракт ERC-20, на который он отправляет активы, является `IL2StandardERC20`.

**Примечание:** Ничто не мешает мошенническому контракту предоставлять ложные ответы на `supportsInterface`, поэтому это механизм проверки на вменяемость, а _не_ механизм безопасности.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Только Мосту L2 разрешено выпускать и сжигать активы.

`_mint` и `_burn` на самом деле определены в [контракте ERC-20 от OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Этот контракт просто не предоставляет их внешне, потому что условия для выпуска и сжигания токенов столь же разнообразны, как и количество способов использования ERC-20.

## Код Моста L2 {#l2-bridge-code}

Это код, который запускает Мост на Optimism.
[Исходный код этого контракта находится здесь](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Интерфейс [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) очень похож на [эквивалент L1](#IL1ERC20Bridge), который мы видели выше.
Есть два существенных различия:

1. На L1 вы инициируете депозиты и завершаете вывод средств.
   Здесь вы инициируете выводы и завершаете депозиты.
2. На L1 необходимо различать токены ETH и ERC-20.
   На L2 мы можем использовать одни и те же функции для обоих, поскольку внутренние балансы ETH в Optimism обрабатываются как токен ERC-20 с адресом [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Стандартный Мост L2 — это контракт, который работает совместно со стандартным Мостом L1
 * для обеспечения переходов ETH и ERC20 между L1 и L2.
 * Этот контракт действует как эмитент для новых токенов, когда он получает информацию о депозитах в стандартный
 * Мост L1.
 * Этот контракт также действует как сжигатель токенов, предназначенных для вывода, информируя
 * Мост L1 о необходимости высвобождения средств L1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Ссылки на внешние контракты *
     ********************************/

    address public l1TokenBridge;
```

Отслеживаем адрес Моста L1.
Обратите внимание, что в отличие от эквивалента L1, здесь нам _необходима_ эта переменная.
Адрес Моста L1 заранее не известен.

```solidity

    /***************
     * Конструктор *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Междоменный мессенджер, используемый этим контрактом.
     * @param _l1TokenBridge Адрес Моста L1, развернутого в основной сети.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Вывод средств *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

Эти две функции инициируют вывод средств.
Обратите внимание, что нет необходимости указывать адрес токена L1.
Ожидается, что токены L2 сообщат нам адрес эквивалента на L1.

```solidity

    /**
     * @dev Выполняет логику вывода средств, сжигая токен и информируя
     *      шлюз токенов L1 о выводе.
     * @param _l2Token Адрес токена L2, на котором инициирован вывод.
     * @param _from Аккаунт для списания выводимых средств на L2.
     * @param _to Аккаунт для зачисления выводимых средств на L1.
     * @param _amount Сумма токена для вывода.
     * @param _l1Gas Не используется, но включен для потенциальной прямой совместимости.
     * @param _data Необязательные данные для пересылки на L1. Эти данные предоставляются
     *        исключительно для удобства внешних контрактов. Кроме ограничения максимальной
     *        длины, эти контракты не дают никаких гарантий относительно их содержимого.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Когда инициируется вывод, мы сжигаем средства выводившего для предотвращения последующего использования на L2
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Обратите внимание, что мы _не_ полагаемся на параметр `_from`, а на `msg.sender`, который намного сложнее подделать (насколько я знаю, невозможно).

```solidity

        // Конструируем calldata для l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

На L1 необходимо различать ETH и ERC-20.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Отправить сообщение на Мост L1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Межсетевая функция: Депозит *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Эта функция вызывается `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Убедитесь, что источник сообщения легитимен.
Это важно, потому что эта функция вызывает `_mint` и может быть использована для выдачи токенов, которые не покрыты токенами, принадлежащими Мосту на L1.

```solidity
        // Проверяем, что целевой токен соответствует требованиям, и
        // убеждаемся, что депонированный токен на L1 соответствует представлению токена на L2
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Проверки на вменяемость:

1. Поддерживается правильный интерфейс
2. Адрес L1 контракта L2 ERC-20 соответствует источнику токенов на L1

```solidity
        ) {
            // Когда депозит завершается, мы зачисляем на аккаунт на L2 такую же сумму
            // токенов.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Если проверки на вменяемость пройдены, завершите депозит:

1. Выпустить токены
2. Выпустить соответствующее событие

```solidity
        } else {
            // Либо токен L2, на который делается депозит, не согласен с правильным адресом
            // своего токена L1, либо не поддерживает правильный интерфейс.
            // Это должно происходить только в случае вредоносного токена L2 или если пользователь как-то
            // указал неправильный адрес токена L2 для депозита.
            // В любом случае мы останавливаем процесс здесь и конструируем сообщение о выводе,
            // чтобы пользователи в некоторых случаях могли вернуть свои средства.
            // Невозможно полностью предотвратить вредоносные контракты токенов, но это ограничивает
            // ошибки пользователя и смягчает некоторые формы вредоносного поведения контрактов.
```

Если пользователь допустил обнаруживаемую ошибку, используя неправильный адрес токена L2, мы хотим отменить депозит и вернуть токены на L1.
Единственный способ сделать это с L2 — отправить сообщение, которому придется ждать периода оспаривания, но для пользователя это намного лучше, чем безвозвратная потеря токенов.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // поменяли _to и _from местами, чтобы вернуть депозит отправителю
                _from,
                _amount,
                _data
            );

            // Отправить сообщение на Мост L1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Заключение {#conclusion}

Стандартный Мост является наиболее гибким механизмом для перевода активов.
Однако из-за своей универсальности он не всегда является самым простым в использовании механизмом.
Особенно для вывода средств, большинство пользователей предпочитают использовать [сторонние Мосты](https://optimism.io/apps#bridge), которые не ждут периода оспаривания и не требуют доказательства Меркла для завершения вывода.

Эти Мосты обычно работают за счет наличия активов на L1, которые они предоставляют немедленно за небольшую плату (часто меньшую, чем стоимость газа при стандартном выводе через Мост).
Когда Мост (или люди, управляющие им) предвидит нехватку активов L1, он переводит достаточное количество активов с L2. Поскольку это очень крупные выводы, стоимость вывода амортизируется на большую сумму и составляет гораздо меньший процент.

Надеемся, эта статья помогла вам лучше понять, как работает уровень 2 и как писать понятный и безопасный код на Solidity.

[Больше моих работ смотрите здесь](https://cryptodocguy.pro/).
