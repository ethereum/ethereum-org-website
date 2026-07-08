---
title: "Разбор контракта стандартного моста Optimism"
description: "Как работает стандартный мост для Optimism? Почему он работает именно так?"
author: "Ори Померанц"
tags: ["Solidity", "мост", "уровень 2 (l2)"]
skill: intermediate
breadcrumb: "Мост Optimism"
published: 2022-03-30
lang: ru
---

[Optimism](https://www.optimism.io/) — это [оптимистичный роллап](/developers/docs/scaling/optimistic-rollups/).
Оптимистичные роллапы могут обрабатывать транзакции по гораздо более низкой цене, чем основная сеть Ethereum (также известная как уровень 1 (l1)), поскольку транзакции обрабатываются только несколькими узлами, а не каждым узлом в сети.
В то же время все данные записываются на l1, поэтому все можно доказать и восстановить со всеми гарантиями целостности и доступности Мейннета.

Чтобы использовать активы l1 в Optimism (или любом другом l2), активы необходимо [перевести через мост](/bridges/#prerequisites).
Один из способов добиться этого — заблокировать активы (ETH и [токены ERC-20](/developers/docs/standards/tokens/erc-20/) являются наиболее распространенными) на l1 и получить эквивалентные активы для использования на l2.
В конечном итоге тот, у кого они окажутся, может захотеть перевести их обратно на l1 через мост.
При этом активы сжигаются на l2, а затем возвращаются пользователю на l1.

Именно так работает [стандартный мост Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
В этой статье мы рассмотрим исходный код этого моста, чтобы понять, как он работает, и изучим его как пример хорошо написанного кода на Solidity.

## Потоки управления {#control-flows}

У моста есть два основных потока:

- Депозит (с l1 на l2)
- Вывод (с l2 на l1)

### Поток депозита {#deposit-flow}

#### Уровень 1 (l1) {#deposit-flow-layer-1}

1. При внесении депозита в ERC-20 вкладчик дает мосту разрешение на расходование вносимой суммы.
2. Вкладчик вызывает мост l1 (`depositERC20`, `depositERC20To`, `depositETH` или `depositETHTo`).
3. Мост l1 вступает во владение переводимым активом.
   - ETH: Актив переводится вкладчиком в рамках вызова.
   - ERC-20: Актив переводится мостом самому себе с использованием разрешения, предоставленного вкладчиком.
4. Мост l1 использует механизм кросс-доменных сообщений для вызова `finalizeDeposit` на мосту l2.

#### Уровень 2 (l2) {#deposit-flow-layer-2}

5. Мост l2 проверяет законность вызова `finalizeDeposit`:
   - Поступил от контракта кросс-доменных сообщений.
   - Изначально исходил от моста на l1.
6. Мост l2 проверяет, является ли контракт токена ERC-20 на l2 правильным:
   - Контракт l2 сообщает, что его аналог на l1 совпадает с тем, от которого поступили токены на l1.
   - Контракт l2 сообщает, что он поддерживает правильный интерфейс ([с использованием ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Если контракт l2 правильный, он вызывается, чтобы чеканить соответствующее количество токенов на соответствующий адрес. Если нет, запускается процесс вывода, чтобы позволить пользователю востребовать токены на l1.

### Поток вывода {#withdrawal-flow}

#### Уровень 2 (l2) {#withdrawal-flow-layer-2}

1. Пользователь, осуществляющий вывод, вызывает мост l2 (`withdraw` или `withdrawTo`).
2. Мост l2 сжигает соответствующее количество токенов, принадлежащих `msg.sender`.
3. Мост l2 использует механизм кросс-доменных сообщений для вызова `finalizeETHWithdrawal` или `finalizeERC20Withdrawal` на мосту l1.

#### Уровень 1 (l1) {#withdrawal-flow-layer-1}

4. Мост l1 проверяет законность вызова `finalizeETHWithdrawal` или `finalizeERC20Withdrawal`:
   - Поступил от механизма кросс-доменных сообщений.
   - Изначально исходил от моста на l2.
5. Мост l1 переводит соответствующий актив (ETH или ERC-20) на соответствующий адрес.

## Код уровня 1 (l1) {#layer-1-code}

Это код, который выполняется на l1, в основной сети Ethereum.

### IL1ERC20Bridge {#il1erc20bridge}

[Этот интерфейс определен здесь](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Он включает функции и определения, необходимые для перевода токенов ERC-20 через мост.

```solidity
// SPDX-License-Identifier: MIT
```

[Большая часть кода Optimism выпущена под лицензией MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

На момент написания статьи последней версией Solidity является 0.8.12.
Пока не будет выпущена версия 0.9.0, мы не знаем, совместим ли этот код с ней или нет.

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

В терминологии моста Optimism _депозит_ означает перевод с l1 на l2, а _вывод_ означает перевод с l2 на l1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

В большинстве случаев адрес ERC-20 на l1 не совпадает с адресом эквивалентного ERC-20 на l2.
[Вы можете посмотреть список адресов токенов здесь](https://static.optimism.io/optimism.tokenlist.json).
Адрес с `chainId` 1 находится на l1 (Мейннет), а адрес с `chainId` 10 — на l2 (Optimism).
Два других значения `chainId` предназначены для тестовой сети Kovan (42) и тестовой сети Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

К переводам можно добавлять примечания, и в этом случае они добавляются к событиям, которые о них сообщают.

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

Один и тот же контракт моста обрабатывает переводы в обоих направлениях.
В случае моста l1 это означает инициализацию депозитов и завершение выводов.

```solidity

    /********************
     * Публичные функции *
     ********************/

    /**
     * @dev получить Адрес соответствующего контракта моста l2.
     * @return Адрес соответствующего контракта моста l2.
     */
    function l2TokenBridge() external returns (address);
```

Эта функция на самом деле не нужна, потому что на l2 это предварительно развернутый контракт, поэтому он всегда находится по адресу `0x4200000000000000000000000000000000000010`.
Она здесь для симметрии с мостом l2, потому что адрес моста l1 узнать _не_ так просто.

```solidity
    /**
     * @dev внести сумму ERC-20 на баланс вызывающего на l2.
     * @param _l1Token Адрес ERC-20 l1, который мы вносим
     * @param _l2Token Адрес соответствующего ERC-20 l2 для l1
     * @param _amount Сумма ERC-20 для внесения
     * @param _l2Gas Лимит Газа, необходимый для завершения внесения на l2.
     * @param _data Необязательные данные для пересылки на l2. Эти данные предоставляются
     *        исключительно для удобства внешних контрактов. Помимо ограничения максимальной
     *        длины, эти контракты не предоставляют никаких гарантий относительно их содержимого.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Параметр `_l2Gas` — это количество газа l2, которое разрешено потратить транзакции.
[До определенного (высокого) предела это бесплатно](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), поэтому, если контракт ERC-20 не делает ничего действительно странного при чеканке, это не должно быть проблемой.
Эта функция заботится об обычном сценарии, когда пользователь переводит активы через мост на тот же адрес в другом блокчейне.

```solidity
    /**
     * @dev внести сумму ERC-20 на баланс получателя на l2.
     * @param _l1Token Адрес ERC-20 l1, который мы вносим
     * @param _l2Token Адрес соответствующего ERC-20 l2 для l1
     * @param _to Адрес l2 для зачисления вывода.
     * @param _amount Сумма ERC-20 для внесения.
     * @param _l2Gas Лимит Газа, необходимый для завершения внесения на l2.
     * @param _data Необязательные данные для пересылки на l2. Эти данные предоставляются
     *        исключительно для удобства внешних контрактов. Помимо ограничения максимальной
     *        длины, эти контракты не предоставляют никаких гарантий относительно их содержимого.
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

Эта функция почти идентична `depositERC20`, но она позволяет отправить ERC-20 на другой адрес.

```solidity
    /*************************
     * Кроссчейн-функции *
     *************************/

    /**
     * @dev Завершить вывод с l2 на l1 и зачислить средства на баланс получателя
     * токена ERC-20 l1.
     * Этот вызов завершится ошибкой, если инициированный вывод с l2 не был завершен.
     *
     * @param _l1Token Адрес токена l1 для finalizeWithdrawal.
     * @param _l2Token Адрес токена l2, где был инициирован вывод.
     * @param _from Адрес l2, инициирующий перевод.
     * @param _to Адрес l1 для зачисления вывода.
     * @param _amount Сумма ERC-20 для внесения.
     * @param _data Данные, предоставленные отправителем на l2. Эти данные предоставляются
     *   исключительно для удобства внешних контрактов. Помимо ограничения максимальной
     *   длины, эти контракты не предоставляют никаких гарантий относительно их содержимого.
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

Выводы (и другие сообщения с l2 на l1) в Optimism — это двухэтапный процесс:

1. Инициирующая транзакция на l2.
2. Завершающая транзакция или транзакция востребования на l1.
   Эта транзакция должна произойти после окончания [периода оспаривания ошибок](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) для транзакции l2.

### IL1StandardBridge {#il1standardbridge}

[Этот интерфейс определен здесь](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Этот файл содержит определения событий и функций для ETH.
Эти определения очень похожи на те, что определены в `IL1ERC20Bridge` выше для ERC-20.

Интерфейс моста разделен на два файла, потому что некоторые токены ERC-20 требуют пользовательской обработки и не могут обрабатываться стандартным мостом.
Таким образом, пользовательский мост, который обрабатывает такой токен, может реализовать `IL1ERC20Bridge` и не должен также переводить ETH.

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

Это событие почти идентично версии ERC-20 (`ERC20DepositInitiated`), за исключением отсутствия адресов токенов l1 и l2.
То же самое верно и для других событий и функций.

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
     * @dev Внести сумму ETH на баланс вызывающего на l2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Внести сумму ETH на баланс получателя на l2.
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
     * Кроссчейн-функции *
     *************************/

    /**
     * @dev Завершить вывод с l2 на l1 и зачислить средства на баланс получателя
     * токена ETH l1. Поскольку только xDomainMessenger может вызвать эту функцию, она никогда не будет вызвана
     * до того, как вывод будет завершен.
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

[Этот контракт](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) наследуется обоими мостами ([l1](#the-l1-bridge-contract) и [l2](#l2-bridge-code)) для отправки сообщений на другой уровень.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Импорты интерфейсов */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Этот интерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) сообщает контракту, как отправлять сообщения на другой уровень, используя кросс-доменный мессенджер.
Этот кросс-доменный мессенджер — совершенно другая система, и она заслуживает отдельной статьи, которую я надеюсь написать в будущем.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Вспомогательный контракт для контрактов, выполняющих кроссдоменные коммуникации
 *
 * Используемый компилятор: определяется наследующим контрактом
 */
contract CrossDomainEnabled {
    /*************
     * Переменные *
     *************/

    // Контракт мессенджера, используемый для отправки и получения сообщений из другого домена.
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

Единственный параметр, который должен знать контракт, — это адрес кросс-доменного мессенджера на этом уровне.
Этот параметр устанавливается один раз в конструкторе и никогда не меняется.

```solidity

    /**********************
     * Модификаторы функций *
     **********************/

    /**
     * Гарантирует, что модифицированная функция может быть вызвана только определенным кроссдоменным аккаунтом.
     * @param _sourceDomainAccount Единственный аккаунт в исходном домене, который
     *  аутентифицирован для вызова этой функции.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Кросс-доменный обмен сообщениями доступен любому контракту в блокчейне, где он запущен (будь то основная сеть Ethereum или Optimism).
Но нам нужно, чтобы мост на каждой стороне доверял _только_ определенным сообщениям, если они исходят от моста на другой стороне.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Доверять можно только сообщениям от соответствующего кросс-доменного мессенджера (`messenger`, как вы увидите ниже).

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Способ, которым кросс-доменный мессенджер предоставляет адрес, отправивший сообщение с другого уровня, — это [функция `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Пока она вызывается в транзакции, инициированной сообщением, она может предоставить эту информацию.

Нам нужно убедиться, что полученное нами сообщение пришло от другого моста.

```solidity

        _;
    }

    /**********************
     * Внутренние функции *
     **********************/

    /**
     * Получает мессенджер, обычно из хранилища. Эта функция открыта на случай, если дочернему контракту
     * потребуется ее переопределить.
     * @return Адрес контракта кроссдоменного мессенджера, который должен использоваться.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Эта функция возвращает кросс-доменный мессенджер.
Мы используем функцию, а не переменную `messenger`, чтобы позволить контрактам, наследующим от этого, использовать алгоритм для указания того, какой кросс-доменный мессенджер использовать.

```solidity

    /**
     * Отправляет сообщение аккаунту в другом домене
     * @param _crossDomainTarget Предполагаемый получатель в целевом домене
     * @param _message Данные для отправки цели (обычно данные вызова для функции с
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Лимит Газа для получения сообщения в целевом домене.
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

[Слизер](https://github.com/crytic/slither) — это статический анализатор, который Optimism запускает на каждом контракте для поиска уязвимостей и других потенциальных проблем.
В данном случае следующая строка вызывает две уязвимости:

1. [События повторного входа](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Безопасный повторный вход](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

В этом случае мы не беспокоимся о повторном входе, мы знаем, что `getCrossDomainMessenger()` возвращает заслуживающий доверия адрес, даже если Слизер никак не может этого знать.

### Контракт моста l1 {#the-l1-bridge-contract}

[Исходный код этого контракта находится здесь](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Интерфейсы могут быть частью других контрактов, поэтому они должны поддерживать широкий спектр версий Solidity.
Но сам мост — это наш контракт, и мы можем быть строгими в отношении того, какую версию Solidity он использует.

```solidity
/* Импорты интерфейсов */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) и [IL1StandardBridge](#il1standardbridge) объяснены выше.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Этот интерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) позволяет нам создавать сообщения для управления стандартным мостом на l2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Этот интерфейс](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) позволяет нам управлять контрактами ERC-20.
[Вы можете прочитать об этом подробнее здесь](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Импорты библиотек */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Как объяснялось выше](#crossdomainenabled), этот контракт используется для межсетевого обмена сообщениями.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) содержит адреса контрактов l2, которые всегда имеют один и тот же адрес. Сюда входит стандартный мост на l2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Утилиты адресов ОпенЗеппелин](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Они используются для различения адресов контрактов и адресов, принадлежащих внешним аккаунтам (EOA).

Обратите внимание, что это не идеальное решение, поскольку нет способа отличить прямые вызовы от вызовов, сделанных из конструктора контракта, но, по крайней мере, это позволяет нам выявлять и предотвращать некоторые распространенные ошибки пользователей.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Стандарт ERC-20](https://eips.ethereum.org/EIPS/eip-20) поддерживает два способа сообщения контрактом об ошибке:

1. Откат
2. Возврат `false`

Обработка обоих случаев усложнила бы наш код, поэтому вместо этого мы используем [`SafeERC20` от ОпенЗеппелин](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), который гарантирует, что [все сбои приводят к откату](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Мост ETH и ERC-20 l1 — это контракт, который хранит внесенные средства l1 и стандартные
 * токены, которые используются на l2. Он синхронизирует соответствующий мост l2, информируя его о внесениях
 * и прослушивая его на предмет недавно завершенных выводов.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

В этой строке мы указываем использовать обертку `SafeERC20` каждый раз, когда мы используем интерфейс `IERC20`.

```solidity

    /********************************
     * Ссылки на внешние контракты *
     ********************************/

    address public l2TokenBridge;
```

Адрес [L2StandardBridge](#l2-bridge-code).

```solidity

    // Сопоставляет токен l1 с токеном l2 и балансом внесенного токена l1
    mapping(address => mapping(address => uint256)) public deposits;
```

Двойное [отображение (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), подобное этому, — это способ определения [двумерного разреженного массива](https://en.wikipedia.org/wiki/Sparse_matrix).
Значения в этой структуре данных идентифицируются как `deposit[L1 token addr][L2 token addr]`.
Значение по умолчанию — ноль.
В хранилище записываются только те ячейки, которым задано другое значение.

```solidity

    /***************
     * Конструктор *
     ***************/

    // Этот контракт находится за прокси, поэтому параметры конструктора не будут использоваться.
    constructor() CrossDomainEnabled(address(0)) {}
```

Мы хотим иметь возможность обновлять этот контракт без необходимости копировать все переменные в хранилище.
Для этого мы используем [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) — прокси-контракт, который использует [`delegatecall`](https://solidity-by-example.org/delegatecall/) для передачи вызовов отдельному контракту, адрес которого хранится в прокси-контракте (при обновлении вы указываете прокси изменить этот адрес).
Когда вы используете `delegatecall`, хранилище остается хранилищем _вызывающего_ контракта, поэтому значения всех переменных состояния контракта остаются неизменными.

Одним из эффектов этого шаблона является то, что хранилище контракта, который является _вызываемым_ для `delegatecall`, не используется, и поэтому переданные ему значения конструктора не имеют значения.
По этой причине мы можем передать бессмысленное значение конструктору `CrossDomainEnabled`.
Это также причина, по которой инициализация ниже отделена от конструктора.

```solidity
    /******************
     * Инициализация *
     ******************/

    /**
     * @param _l1messenger Адрес мессенджера l1, используемый для кроссчейн-коммуникаций.
     * @param _l2TokenBridge Адрес стандартного моста l2.
     */
    // slither-disable-next-line external-function
```

Этот [тест Слизера](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) определяет функции, которые не вызываются из кода контракта и поэтому могут быть объявлены как `external` вместо `public`.
Стоимость газа для функций `external` может быть ниже, поскольку им могут быть переданы параметры в данных вызова.
Функции, объявленные как `public`, должны быть доступны изнутри контракта.
Контракты не могут изменять свои собственные данные вызова, поэтому параметры должны находиться в памяти.
Когда такая функция вызывается извне, необходимо скопировать данные вызова в память, что стоит газа.
В данном случае функция вызывается только один раз, поэтому неэффективность не имеет для нас значения.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

Функция `initialize` должна вызываться только один раз.
Если адрес кросс-доменного мессенджера l1 или моста токенов l2 изменится, мы создадим новый прокси и новый мост, который его вызывает.
Вряд ли это произойдет, за исключением случаев обновления всей системы, что случается очень редко.

Обратите внимание, что в этой функции нет механизма, ограничивающего то, _кто_ может ее вызывать.
Это означает, что теоретически злоумышленник может подождать, пока мы развернем прокси и первую версию моста, а затем использовать [фронтраннинг](https://solidity-by-example.org/hacks/front-running/), чтобы добраться до функции `initialize` раньше законного пользователя. Но есть два метода предотвратить это:

1. Если контракты развертываются не напрямую через EOA, а [в транзакции, в которой их создает другой контракт](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), весь процесс может быть атомарным и завершиться до выполнения любой другой транзакции.
2. Если законный вызов `initialize` завершается неудачей, всегда можно проигнорировать недавно созданные прокси и мост и создать новые.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Это два параметра, которые должен знать мост.

```solidity

    /**************
     * Внесение *
     **************/

    /** @dev Модификатор, требующий, чтобы отправитель был EOA. Эту проверку может обойти вредоносный
     *  контракт через initcode, но она предотвращает ошибку пользователя, которой мы хотим избежать.
     */
    modifier onlyEOA() {
        // Используется для остановки внесений от контрактов (во избежание случайно потерянных токенов)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Именно по этой причине нам понадобились утилиты `Address` от ОпенЗеппелин.

```solidity
    /**
     * @dev Эта функция может быть вызвана без данных
     * для внесения суммы ETH на баланс вызывающего на l2.
     * Поскольку функция receive не принимает данные, консервативная
     * сумма по умолчанию пересылается на l2.
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

Эти две функции являются обертками вокруг `_initiateETHDeposit` — функции, которая обрабатывает фактический депозит ETH.

```solidity
    /**
     * @dev Выполняет логику для внесений, сохраняя ETH и информируя шлюз ETH l2 о
     * внесении.
     * @param _from Аккаунт, с которого списывается внесение на l1.
     * @param _to Аккаунт, которому передается внесение на l2.
     * @param _l2Gas Лимит Газа, необходимый для завершения внесения на l2.
     * @param _data Необязательные данные для пересылки на l2. Эти данные предоставляются
     *        исключительно для удобства внешних контрактов. Помимо ограничения максимальной
     *        длины, эти контракты не предоставляют никаких гарантий относительно их содержимого.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Сформировать данные вызова для вызова finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Кросс-доменные сообщения работают таким образом, что целевой контракт вызывается с сообщением в качестве его данных вызова.
Контракты Solidity всегда интерпретируют свои данные вызова в соответствии со [спецификациями ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Функция Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) создает эти данные вызова.

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

Сообщение здесь заключается в вызове [функции `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) со следующими параметрами:

| Параметр | Значение | Значение |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0) | Специальное значение, обозначающее ETH (который не является токеном ERC-20) на l1 |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Контракт l2, который управляет ETH в Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (этот контракт предназначен только для внутреннего использования Optimism) |
| \_from | \_from | Адрес на l1, который отправляет ETH |
| \_to | \_to | Адрес на l2, который получает ETH |
| amount | msg.value | Количество отправленных Wei (которые уже были отправлены на мост) |
| \_data | \_data | Дополнительные данные для прикрепления к депозиту |

```solidity
        // Отправить данные вызова на l2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Отправка сообщения через кросс-доменный мессенджер.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Генерация события для информирования любого децентрализованного приложения (dapp), которое прослушивает этот перевод.

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

Эти две функции являются обертками вокруг `_initiateERC20Deposit` — функции, которая обрабатывает фактический депозит ERC-20.

```solidity
    /**
     * @dev Выполняет логику для внесений, информируя контракт внесенного токена l2
     * о внесении и вызывая обработчик для блокировки средств l1. (например, transferFrom)
     *
     * @param _l1Token Адрес ERC-20 l1, который мы вносим
     * @param _l2Token Адрес соответствующего ERC-20 l2 для l1
     * @param _from Аккаунт, с которого списывается внесение на l1
     * @param _to Аккаунт, которому передается внесение на l2
     * @param _amount Сумма ERC-20 для внесения.
     * @param _l2Gas Лимит Газа, необходимый для завершения внесения на l2.
     * @param _data Необязательные данные для пересылки на l2. Эти данные предоставляются
     *        исключительно для удобства внешних контрактов. Помимо ограничения максимальной
     *        длины, эти контракты не предоставляют никаких гарантий относительно их содержимого.
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

Эта функция похожа на `_initiateETHDeposit` выше, с несколькими важными отличиями.
Первое отличие заключается в том, что эта функция получает адреса токенов и сумму для перевода в качестве параметров.
В случае с ETH вызов моста уже включает перевод актива на аккаунт моста (`msg.value`).

```solidity
        // Когда внесение инициируется на l1, мост l1 переводит средства себе для будущих
        // выводов. safeTransferFrom также проверяет, есть ли у контракта код, поэтому это завершится ошибкой, если
        // _from является EOA или address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Переводы токенов ERC-20 следуют другому процессу, нежели ETH:

1. Пользователь (`_from`) дает мосту разрешение на перевод соответствующих токенов.
2. Пользователь вызывает мост с адресом контракта токена, суммой и т. д.
3. Мост переводит токены (самому себе) в рамках процесса депозита.

Первый шаг может произойти в отдельной транзакции от последних двух.
Однако фронтраннинг не является проблемой, поскольку две функции, вызывающие `_initiateERC20Deposit` (`depositERC20` и `depositERC20To`), вызывают эту функцию только с `msg.sender` в качестве параметра `_from`.

```solidity
        // Сформировать данные вызова для _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Отправить данные вызова на l2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Добавление внесенного количества токенов в структуру данных `deposits`.
На l2 может быть несколько адресов, соответствующих одному и тому же токену ERC-20 на l1, поэтому недостаточно использовать баланс моста для токена ERC-20 на l1 для отслеживания депозитов.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Кроссчейн-функции *
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

Мост l2 отправляет сообщение кросс-доменному мессенджеру l2, что заставляет кросс-доменный мессенджер l1 вызвать эту функцию (конечно, после того, как [транзакция, завершающая сообщение](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions), будет отправлена на l1).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Убедитесь, что это _законное_ сообщение, исходящее от кросс-доменного мессенджера и происходящее от моста токенов l2.
Эта функция используется для вывода ETH из моста, поэтому мы должны убедиться, что она вызывается только авторизованным вызывающим абонентом.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Способ перевода ETH заключается в вызове получателя с количеством Wei в `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Генерация события о выводе.

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

Эта функция похожа на `finalizeETHWithdrawal` выше, с необходимыми изменениями для токенов ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Обновление структуры данных `deposits`.

```solidity

        // Когда вывод завершается на l1, мост l1 переводит средства тому, кто осуществляет вывод
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Временно - Миграция ETH *
     *****************************/

    /**
     * @dev Добавляет баланс ETH на аккаунт. Это предназначено для того, чтобы позволить ETH
     * мигрировать со старого шлюза на новый шлюз.
     * ПРИМЕЧАНИЕ: Это оставлено только для одного обновления, чтобы мы могли получить мигрированный ETH из
     * старого контракта
     */
    function donateETH() external payable {}
}
```

Существовала более ранняя реализация моста.
Когда мы перешли от той реализации к этой, нам пришлось перенести все активы.
Токены ERC-20 можно просто перенести.
Однако для перевода ETH на контракт вам нужно одобрение этого контракта, что и предоставляет нам `donateETH`.

## Токены ERC-20 на l2 {#erc-20-tokens-on-l2}

Чтобы токен ERC-20 подходил для стандартного моста, он должен позволять стандартному мосту и _только_ стандартному мосту чеканить токен.
Это необходимо, потому что мосты должны гарантировать, что количество токенов, циркулирующих в Optimism, равно количеству токенов, заблокированных внутри контракта моста l1.
Если на l2 будет слишком много токенов, некоторые пользователи не смогут перевести свои активы обратно на l1 через мост.
Вместо надежного моста мы бы по сути воссоздали [банковскую систему с частичным резервированием](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Если на l1 будет слишком много токенов, некоторые из этих токенов навсегда останутся заблокированными внутри контракта моста, потому что нет способа высвободить их без сжигания токенов l2.

### IL2StandardERC20 {#il2standarderc20}

Каждый токен ERC-20 на l2, который использует стандартный мост, должен предоставлять [этот интерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), в котором есть функции и события, необходимые стандартному мосту.

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

[Интерфейс ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) используется для указания того, какие функции предоставляет контракт.
[Вы можете прочитать стандарт здесь](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Эта функция предоставляет адрес токена l1, который переводится через мост на этот контракт.
Обратите внимание, что у нас нет аналогичной функции в обратном направлении.
Нам нужно иметь возможность переводить через мост любой токен l1, независимо от того, планировалась ли поддержка l2 при его реализации или нет.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Функции и события для того, чтобы чеканить (создавать) и сжигать (уничтожать) токены.
Мост должен быть единственной сущностью, которая может запускать эти функции, чтобы гарантировать правильное количество токенов (равное количеству токенов, заблокированных на l1).

### L2StandardERC20 {#l2standarderc20}

[Это наша реализация интерфейса `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Если вам не нужна какая-то пользовательская логика, вам следует использовать эту.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Контракт ERC-20 от ОпенЗеппелин](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism не верит в изобретение велосипеда, особенно когда велосипед хорошо проверен и должен быть достаточно надежным для хранения активов.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Это два дополнительных параметра конфигурации, которые нам требуются, а ERC-20 обычно нет.

```solidity

    /**
     * @param _l2Bridge Адрес стандартного моста l2.
     * @param _l1Token Адрес соответствующего токена l1.
     * @param _name Имя ERC-20.
     * @param _symbol Символ ERC-20.
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

Сначала вызывается конструктор для контракта, от которого мы наследуем (`ERC20(_name, _symbol)`), а затем устанавливаются наши собственные переменные.

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
Каждый интерфейс представляет собой ряд поддерживаемых функций и идентифицируется как [исключающее ИЛИ](https://en.wikipedia.org/wiki/Exclusive_or) [селекторов функций ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) этих функций.

Мост l2 использует ERC-165 в качестве проверки работоспособности, чтобы убедиться, что контракт ERC-20, на который он отправляет активы, является `IL2StandardERC20`.

**Примечание:** Ничто не мешает мошенническому контракту предоставлять ложные ответы на `supportsInterface`, поэтому это механизм проверки работоспособности, а _не_ механизм безопасности.

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

Только мосту l2 разрешено чеканить и сжигать активы.

`_mint` и `_burn` на самом деле определены в [контракте ERC-20 от ОпенЗеппелин](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Этот контракт просто не раскрывает их извне, потому что условия для того, чтобы чеканить и сжигать токены, так же разнообразны, как и количество способов использования ERC-20.

## Код моста l2 {#l2-bridge-code}

Это код, который запускает мост в Optimism.
[Исходный код этого контракта находится здесь](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Импорты интерфейсов */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Интерфейс [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) очень похож на [эквивалент l1](#il1erc20bridge), который мы видели выше.
Есть два существенных отличия:

1. На l1 вы инициируете депозиты и завершаете выводы.
   Здесь вы инициируете выводы и завершаете депозиты.
2. На l1 необходимо различать токены ETH и ERC-20.
   На l2 мы можем использовать одни и те же функции для обоих, потому что внутренне балансы ETH в Optimism обрабатываются как токен ERC-20 с адресом [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Импорты библиотек */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Импорты контрактов */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Стандартный мост l2 — это контракт, который работает вместе со стандартным мостом l1 для
 * обеспечения переходов ETH и ERC-20 между l1 и l2.
 * Этот контракт выполняет функцию чеканки новых токенов, когда получает информацию о внесениях в стандартный мост
 * l1.
 * Этот контракт также выполняет функцию сжигания токенов, предназначенных для вывода, информируя мост
 * l1 о необходимости высвободить средства l1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Ссылки на внешние контракты *
     ********************************/

    address public l1TokenBridge;
```

Отслеживание адреса моста l1.
Обратите внимание, что в отличие от эквивалента l1, здесь нам _нужна_ эта переменная.
Адрес моста l1 заранее неизвестен.

```solidity

    /***************
     * Конструктор *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Кроссдоменный мессенджер, используемый этим контрактом.
     * @param _l1TokenBridge Адрес моста l1, развернутого в основной сети.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Вывод *
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

Эти две функции инициируют выводы.
Обратите внимание, что нет необходимости указывать адрес токена l1.
Ожидается, что токены l2 сообщат нам адрес эквивалента l1.

```solidity

    /**
     * @dev Выполняет логику для выводов, сжигая токен и информируя
     *      шлюз токенов l1 о выводе.
     * @param _l2Token Адрес токена l2, где инициирован вывод.
     * @param _from Аккаунт, с которого списывается вывод на l2.
     * @param _to Аккаунт, которому передается вывод на l1.
     * @param _amount Сумма токена для вывода.
     * @param _l1Gas Не используется, но включен из соображений потенциальной прямой совместимости.
     * @param _data Необязательные данные для пересылки на l1. Эти данные предоставляются
     *        исключительно для удобства внешних контрактов. Помимо ограничения максимальной
     *        длины, эти контракты не предоставляют никаких гарантий относительно их содержимого.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Когда инициируется вывод, мы сжигаем средства того, кто осуществляет вывод, чтобы предотвратить последующее
        // использование на l2
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Обратите внимание, что мы _не_ полагаемся на параметр `_from`, а на `msg.sender`, который гораздо сложнее подделать (насколько мне известно, невозможно).

```solidity

        // Сформировать данные вызова для l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

На l1 необходимо различать ETH и ERC-20.

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

        // Отправить сообщение наверх на мост l1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Кроссчейн-функция: Внесение *
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

Убедитесь, что источник сообщения является законным.
Это важно, потому что эта функция вызывает `_mint` и может быть использована для выдачи токенов, которые не покрываются токенами, которыми мост владеет на l1.

```solidity
        // Проверить, что целевой токен совместим, и
        // убедиться, что внесенный токен на l1 соответствует представлению внесенного токена l2 здесь
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Проверки работоспособности:

1. Поддерживается правильный интерфейс
2. Адрес l1 контракта ERC-20 на l2 совпадает с источником токенов на l1

```solidity
        ) {
            // Когда внесение завершается, мы пополняем аккаунт на l2 на ту же сумму
            // токенов.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Если проверки работоспособности пройдены, завершите депозит:

1. Чеканить токены
2. Сгенерировать соответствующее событие

```solidity
        } else {
            // Либо токен l2, в который производится внесение, не согласен с правильным адресом
            // своего токена l1, либо не поддерживает правильный интерфейс.
            // Это должно происходить только в том случае, если существует вредоносный токен l2, или если пользователь каким-то образом
            // указал неправильный Адрес токена l2 для внесения.
            // В любом случае, мы останавливаем процесс здесь и формируем сообщение о выводе,
            // чтобы пользователи могли вывести свои средства в некоторых случаях.
            // Невозможно полностью предотвратить вредоносные контракты токенов, но это ограничивает
            // ошибки пользователей и смягчает некоторые формы вредоносного поведения контрактов.
```

Если пользователь совершил обнаруживаемую ошибку, использовав неправильный адрес токена l2, мы хотим отменить депозит и вернуть токены на l1.
Единственный способ сделать это с l2 — отправить сообщение, которому придется ждать периода оспаривания ошибок, но это гораздо лучше для пользователя, чем потерять токены навсегда.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // поменяли местами _to и _from здесь, чтобы вернуть внесение отправителю
                _from,
                _amount,
                _data
            );

            // Отправить сообщение наверх на мост l1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Заключение {#conclusion}

Стандартный мост — самый гибкий механизм для перевода активов.
Однако из-за того, что он такой универсальный, это не всегда самый простой в использовании механизм.
Особенно для выводов большинство пользователей предпочитают использовать [сторонние мосты](https://optimism.io/apps#bridge), которые не ждут периода оспаривания и не требуют доказательства Меркла для завершения вывода.

Эти мосты обычно работают за счет наличия активов на l1, которые они предоставляют немедленно за небольшую плату (часто меньше стоимости газа для вывода через стандартный мост).
Когда мост (или люди, управляющие им) предвидит нехватку активов на l1, он переводит достаточное количество активов с l2. Поскольку это очень большие выводы, стоимость вывода амортизируется на большую сумму и составляет гораздо меньший процент.

Надеемся, эта статья помогла вам лучше понять, как работает уровень 2 (l2) и как писать понятный и безопасный код на Solidity.

[Смотрите здесь другие мои работы](https://cryptodocguy.pro/).
