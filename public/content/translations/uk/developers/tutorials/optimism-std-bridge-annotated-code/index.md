---
title: "Покрокове керівництво для стандартного мостового контракту Optimism"
description: "Як працює стандартний міст для Optimism? Чому це працює таким чином?"
author: Ori Pomerantz
tags: [ "мова програмування", "міст", "рівень 2" ]
skill: intermediate
published: 2022-03-30
lang: uk
---

[Optimism](https://www.optimism.io/) — це [оптимістичний ролап](/developers/docs/scaling/optimistic-rollups/).
Оптимістичні ролапи можуть обробляти транзакції за набагато нижчою ціною, ніж мережа Ethereum Mainnet (також відома як рівень 1 або L1), оскільки транзакції обробляються лише кількома вузлами, а не кожним вузлом у мережі.
Водночас усі дані записуються на L1, тому все можна перевірити та реконструювати з усіма гарантіями цілісності та доступності Mainnet.

Щоб використовувати активи L1 на Optimism (або будь-якому іншому L2), їх потрібно [переказати через міст](/bridges/#prerequisites).
Один зі способів досягти цього — заблокувати активи (найпоширенішими є ETH і [токени ERC-20](/developers/docs/standards/tokens/erc-20/)) на L1 та отримати еквівалентні активи для використання на L2.
Зрештою, той, у кого вони опиняться, може захотіти повернути їх на L1 через міст.
При цьому активи спалюються на L2, а потім вивільняються користувачеві на L1.

Саме так працює [стандартний міст Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
У цій статті ми розглянемо вихідний код цього мосту, щоб побачити, як він працює, і вивчимо його як приклад добре написаного коду на Solidity.

## Потоки керування {#control-flows}

Міст має два основні потоки:

- Внесення (з L1 до L2)
- Виведення (з L2 до L1)

### Процес внесення {#deposit-flow}

#### Рівень 1 {#deposit-flow-layer-1}

1. При внесенні ERC-20, вкладник надає мосту дозвіл (allowance) на витрату суми, що вноситься
2. Вкладник викликає міст L1 (`depositERC20`, `depositERC20To`, `depositETH`, або `depositETHTo`)
3. Міст L1 отримує у володіння актив, що переказується через міст
   - ETH: актив передається вкладником у межах виклику
   - ERC-20: актив переказується мостом самому собі з використанням дозволу (allowance), наданого вкладником
4. Міст L1 використовує механізм міждоменних повідомлень для виклику `finalizeDeposit` на мосту L2

#### Рівень 2 {#deposit-flow-layer-2}

5. Міст L2 перевіряє, чи є виклик `finalizeDeposit` легітимним:
   - Надійшло з контракту міждоменних повідомлень
   - Початково надійшло з мосту на L1
6. Міст L2 перевіряє, чи є контракт токена ERC-20 на L2 правильним:
   - Контракт L2 повідомляє, що його аналог L1 збігається з тим, звідки надійшли токени на L1
   - Контракт L2 повідомляє, що підтримує правильний інтерфейс ([з використанням ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Якщо контракт L2 правильний, викликати його, щоб викарбувати відповідну кількість токенів на відповідну адресу. Якщо ні, розпочати процес виведення, щоб дозволити користувачеві отримати токени на L1.

### Процес виведення {#withdrawal-flow}

#### Рівень 2 {#withdrawal-flow-layer-2}

1. Той, хто виводить кошти, викликає міст L2 (`withdraw` або `withdrawTo`)
2. Міст L2 спалює відповідну кількість токенів, що належать `msg.sender`
3. Міст L2 використовує механізм міждоменних повідомлень для виклику `finalizeETHWithdrawal` або `finalizeERC20Withdrawal` на мосту L1

#### Рівень 1 {#withdrawal-flow-layer-1}

4. Міст L1 перевіряє, чи є виклик `finalizeETHWithdrawal` або `finalizeERC20Withdrawal` легітимним:
   - Надійшло з механізму міждоменних повідомлень
   - Початково надійшло з мосту на L2
5. Міст L1 переказує відповідний актив (ETH або ERC-20) на відповідну адресу

## Код рівня 1 {#layer-1-code}

Це код, який виконується на L1, у мережі Ethereum Mainnet.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Цей інтерфейс визначено тут](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Він містить функції та визначення, необхідні для переказу токенів ERC-20 через міст.

```solidity
// SPDX-License-Identifier: MIT
```

[Більша частина коду Optimism випущена під ліцензією MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

На момент написання статті остання версія Solidity — 0.8.12.
Поки не випущено версію 0.9.0, ми не знаємо, чи сумісний цей код із нею.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Події *
     **********/

    event ERC20DepositInitiated(
```

У термінології мосту Optimism _deposit_ означає переказ з L1 на L2, а _withdrawal_ — переказ з L2 на L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

У більшості випадків адреса ERC-20 на L1 не збігається з адресою еквівалентного ERC-20 на L2.
[Список адрес токенів можна переглянути тут](https://static.optimism.io/optimism.tokenlist.json).
Адреса з `chainId` 1 знаходиться на L1 (Mainnet), а адреса з `chainId` 10 — на L2 (Optimism).
Інші два значення `chainId` призначені для тестової мережі Kovan (42) та оптимістичної тестової мережі Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Можна додавати примітки до переказів, і в такому разі вони додаються до подій, що їх фіксують.

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

Той самий контракт мосту обробляє перекази в обох напрямках.
У випадку мосту L1 це означає ініціалізацію внесення та фіналізацію виведення коштів.

```solidity

    /********************
     * Публічні функції *
     ********************/

    /**
     * @dev отримати адресу відповідного контракту мосту L2.
     * @return Адреса відповідного контракту мосту L2.
     */
    function l2TokenBridge() external returns (address);
```

Ця функція насправді не потрібна, оскільки на L2 це попередньо розгорнутий контракт, тому вона завжди знаходиться за адресою `0x4200000000000000000000000000000000000010`.
Вона тут для симетрії з мостом L2, оскільки адресу мосту L1 дізнатися _не_ так просто.

```solidity
    /**
     * @dev внести суму ERC20 на баланс викликаючого на L2.
     * @param _l1Token Адреса L1 ERC20, який ми вносимо
     * @param _l2Token Адреса відповідного L2 ERC20 на L1
     * @param _amount Сума ERC20 для внесення
     * @param _l2Gas Ліміт газу, необхідний для завершення внесення на L2.
     * @param _data Необов’язкові дані для пересилання на L2. Ці дані надаються
     *        виключно для зручності зовнішніх контрактів. Крім встановлення максимальної
     *        довжини, ці контракти не дають жодних гарантій щодо їхнього вмісту.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Параметр `_l2Gas` — це кількість газу L2, яку транзакція може витратити.
[До певного (високого) ліміту це безкоштовно](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), тому, якщо контракт ERC-20 не робить нічого дивного під час карбування, це не повинно бути проблемою.
Ця функція обробляє поширений сценарій, коли користувач переказує активи через міст на ту саму адресу в іншому блокчейні.

```solidity
    /**
     * @dev внести суму ERC20 на баланс одержувача на L2.
     * @param _l1Token Адреса L1 ERC20, який ми вносимо
     * @param _l2Token Адреса відповідного L2 ERC20 на L1
     * @param _to Адреса L2, на яку буде зараховано виведення коштів.
     * @param _amount Сума ERC20 для внесення.
     * @param _l2Gas Ліміт газу, необхідний для завершення внесення на L2.
     * @param _data Необов’язкові дані для пересилання на L2. Ці дані надаються
     *        виключно для зручності зовнішніх контрактів. Крім встановлення максимальної
     *        довжини, ці контракти не дають жодних гарантій щодо їхнього вмісту.
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

Ця функція майже ідентична `depositERC20`, але вона дозволяє надсилати ERC-20 на іншу адресу.

```solidity
    /*************************
     * Міжмережеві функції *
     *************************/

    /**
     * @dev Завершити виведення з L2 на L1 і зарахувати кошти на баланс одержувача
     * токена L1 ERC20.
     * Цей виклик не вдасться, якщо ініційоване виведення з L2 не було фіналізовано.
     *
     * @param _l1Token Адреса токена L1, для якого виконується finalizeWithdrawal.
     * @param _l2Token Адреса токена L2, де було ініційовано виведення.
     * @param _from Адреса L2, що ініціює переказ.
     * @param _to Адреса L1, на яку буде зараховано виведення коштів.
     * @param _amount Сума ERC20 для внесення.
     * @param _data Дані, надані відправником на L2. Ці дані надаються
     *   виключно для зручності зовнішніх контрактів. Крім встановлення максимальної
     *   довжини, ці контракти не дають жодних гарантій щодо їхнього вмісту.
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

Виведення коштів (та інші повідомлення з L2 на L1) в Optimism — це двоетапний процес:

1. Ініціююча транзакція на L2.
2. Фіналізуюча або підтверджуюча транзакція на L1.
   Ця транзакція має відбутися після завершення [періоду оскарження помилок](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) для транзакції L2.

### IL1StandardBridge {#il1standardbridge}

[Цей інтерфейс визначено тут](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Цей файл містить визначення подій та функцій для ETH.
Ці визначення дуже схожі на визначені вище в `IL1ERC20Bridge` для ERC-20.

Інтерфейс мосту розділено на два файли, оскільки деякі токени ERC-20 вимагають спеціальної обробки і не можуть бути оброблені стандартним мостом.
Таким чином, спеціальний міст, який обробляє такий токен, може реалізувати `IL1ERC20Bridge` і не мусить також переказувати ETH через міст.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Події *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Ця подія майже ідентична версії ERC-20 (`ERC20DepositInitiated`), за винятком відсутності адрес токенів L1 та L2.
Те саме стосується інших подій і функцій.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Публічні функції *
     ********************/

    /**
     * @dev Внести суму ETH на баланс викликаючого на L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Внести суму ETH на баланс одержувача на L2.
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
     * Міжмережеві функції *
     *************************/

    /**
     * @dev Завершити виведення з L2 на L1 і зарахувати кошти на баланс одержувача
     * токена L1 ETH. Оскільки тільки xDomainMessenger може викликати цю функцію, вона ніколи не буде викликана
     * до фіналізації виведення.
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

[Цей контракт](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) успадковується обома мостами ([L1](#the-l1-bridge-contract) і [L2](#the-l2-bridge-contract)) для надсилання повідомлень на інший рівень.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Імпорт інтерфейсів */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Цей інтерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) повідомляє контракту, як надсилати повідомлення на інший рівень за допомогою міждоменного месенджера.
Цей міждоменний месенджер — це ціла окрема система, яка заслуговує на власну статтю, яку я сподіваюся написати в майбутньому.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Допоміжний контракт для контрактів, що виконують міждоменні комунікації
 *
 * Використаний компілятор: визначається контрактом, що успадковує
 */
contract CrossDomainEnabled {
    /*************
     * Змінні *
     *************/

    // Контракт месенджера, що використовується для надсилання та отримання повідомлень з іншого домену.
    address public messenger;

    /***************
     * Конструктор *
     ***************/

    /**
     * @param _messenger Адреса CrossDomainMessenger на поточному рівні.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Єдиний параметр, який має знати контракт, — це адреса міждоменного месенджера на цьому рівні.
Цей параметр встановлюється один раз у конструкторі й ніколи не змінюється.

```solidity

    /**********************
     * Модифікатори функцій *
     **********************/

    /**
     * Застосовує обмеження, щоб змінена функція могла викликатися лише з певного міждоменного облікового запису.
     * @param _sourceDomainAccount Єдиний обліковий запис у вихідному домені, який
     *  автентифікований для виклику цієї функції.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Міждоменний обмін повідомленнями доступний будь-якому контракту в блокчейні, де він виконується (або в Ethereum Mainnet, або в Optimism).
Але нам потрібно, щоб міст на кожній стороні довіряв _лише_ тим повідомленням, які надходять від мосту з іншого боку.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: контракт месенджера не автентифікований"
        );
```

Можна довіряти лише повідомленням із відповідного міждоменного месенджера (`messenger`, як ви побачите нижче).

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: неправильний відправник міждоменного повідомлення"
        );
```

Спосіб, у який міждоменний месенджер надає адресу, що надіслала повідомлення з іншого рівня, — це [функція `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Доки вона викликається в транзакції, ініційованій повідомленням, вона може надавати цю інформацію.

Нам потрібно переконатися, що отримане повідомлення надійшло з іншого мосту.

```solidity

        _;
    }

    /**********************
     * Внутрішні функції *
     **********************/

    /**
     * Отримує месенджер, зазвичай зі сховища. Ця функція є відкритою на випадок, якщо дочірньому контракту
     * знадобиться її перевизначити.
     * @return Адреса контракту міждоменного месенджера, який слід використовувати.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Ця функція повертає міждоменний месенджер.
Ми використовуємо функцію, а не змінну `messenger`, щоб дозволити контрактам, які успадковують від цього, використовувати алгоритм для визначення, який міждоменний месенджер використовувати.

```solidity

    /**
     * Надсилає повідомлення на обліковий запис в іншому домені
     * @param _crossDomainTarget Запланований одержувач у цільовому домені
     * @param _message Дані для надсилання цілі (зазвичай calldata для функції з
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit gasLimit для отримання повідомлення в цільовому домені.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Нарешті, функція, яка надсилає повідомлення на інший рівень.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) — це статичний аналізатор, який Optimism запускає для кожного контракту, щоб знайти вразливості та інші потенційні проблеми.
У цьому випадку наступний рядок викликає дві вразливості:

1. [Події повторного входу](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Безпечний повторний вхід](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

У цьому випадку ми не турбуємося про повторний вхід, оскільки знаємо, що `getCrossDomainMessenger()` повертає надійну адресу, навіть якщо Slither не може цього знати.

### Контракт мосту L1 {#the-l1-bridge-contract}

[Вихідний код цього контракту тут](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Інтерфейси можуть бути частиною інших контрактів, тому вони мають підтримувати широкий діапазон версій Solidity.
Але сам міст — це наш контракт, і ми можемо бути суворими щодо версії Solidity, яку він використовує.

```solidity
/* Імпорт інтерфейсів */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) та [IL1StandardBridge](#IL1StandardBridge) пояснено вище.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Цей інтерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) дозволяє нам створювати повідомлення для керування стандартним мостом на L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Цей інтерфейс](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) дозволяє нам керувати контрактами ERC-20.
[Детальніше про це можна прочитати тут](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Імпорт бібліотек */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Як пояснювалося вище](#crossdomainenabled), цей контракт використовується для міжрівневого обміну повідомленнями.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) містить адреси контрактів L2, які завжди мають однакову адресу. Це включає стандартний міст на L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Утиліти Address від OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Він використовується для розрізнення адрес контрактів і тих, що належать зовнішнім обліковим записам (EOA).

Зауважте, що це не ідеальне рішення, оскільки немає способу розрізнити прямі виклики та виклики, зроблені з конструктора контракту, але принаймні це дозволяє нам виявляти та запобігати деяким поширеним помилкам користувачів.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Стандарт ERC-20](https://eips.ethereum.org/EIPS/eip-20) підтримує два способи повідомлення контрактом про помилку:

1. Revert
2. Повернення `false`

Обробка обох випадків ускладнила б наш код, тому замість цього ми використовуємо [`SafeERC20` від OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), який гарантує, що [всі помилки призводять до revert](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Міст L1 для ETH та ERC20 — це контракт, який зберігає внесені кошти L1 та стандартні
 * токени, що використовуються на L2. Він синхронізує відповідний міст L2, інформуючи його про депозити
 * та очікуючи від нього повідомлень про нові фіналізовані виведення коштів.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Цей рядок визначає використання обгортки `SafeERC20` щоразу, коли ми використовуємо інтерфейс `IERC20`.

```solidity

    /********************************
     * Посилання на зовнішні контракти *
     ********************************/

    address public l2TokenBridge;
```

Адреса [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Відображає токен L1 на токен L2 до балансу внесеного токена L1
    mapping(address => mapping(address => uint256)) public deposits;
```

Подвійне [відображення (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) — це спосіб визначення [двовимірного розрідженого масиву](https://en.wikipedia.org/wiki/Sparse_matrix).
Значення в цій структурі даних ідентифікуються як `deposit[адреса токена L1][адреса токена L2]`.
Значення за замовчуванням — нуль.
До сховища записуються лише ті комірки, яким встановлено інше значення.

```solidity

    /***************
     * Конструктор *
     ***************/

    // Цей контракт працює за проксі, тому параметри конструктора не будуть використовуватися.
    constructor() CrossDomainEnabled(address(0)) {}
```

Щоб мати можливість оновити цей контракт без необхідності копіювати всі змінні в сховищі.
Для цього ми використовуємо [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), контракт, який використовує [`delegatecall`](https://solidity-by-example.org/delegatecall/) для переадресації викликів до окремого контракту, чия адреса зберігається в контракті проксі (під час оновлення ви повідомляєте проксі змінити цю адресу).
Коли ви використовуєте `delegatecall`, сховище залишається сховищем _викликаючого_ контракту, тому значення всіх змінних стану контракту не змінюються.

Одним з наслідків цього шаблону є те, що сховище _викликаного_ контракту `delegatecall` не використовується, і тому значення конструктора, передані йому, не мають значення.
Саме тому ми можемо надати безглузде значення конструктору `CrossDomainEnabled`.
Це також причина, чому наведена нижче ініціалізація відокремлена від конструктора.

```solidity
    /******************
     * Ініціалізація *
     ******************/

    /**
     * @param _l1messenger Адреса L1 Messenger, що використовується для міжмережевих комунікацій.
     * @param _l2TokenBridge Адреса стандартного мосту L2.
     */
    // slither-disable-next-line external-function
```

Цей [тест Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) виявляє функції, які не викликаються з коду контракту і тому можуть бути оголошені як `external` замість `public`.
Вартість газу для функцій `external` може бути нижчою, оскільки їм можна передавати параметри в calldata.
Функції, оголошені як `public`, мають бути доступні зсередини контракту.
Контракти не можуть змінювати власні calldata, тому параметри мають бути в пам’яті.
Коли така функція викликається ззовні, необхідно скопіювати calldata в пам’ять, що коштує газу.
У цьому випадку функція викликається лише один раз, тому неефективність для нас не має значення.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Контракт уже ініціалізовано.");
```

Функція `initialize` має викликатися лише один раз.
Якщо адреса міждоменного месенджера L1 або мосту токенів L2 змінюється, ми створюємо новий проксі та новий міст, який його викликає.
Це навряд чи станеться, за винятком випадків оновлення всієї системи, що буває дуже рідко.

Зауважте, що ця функція не має механізму, який обмежує, _хто_ може її викликати.
Це означає, що теоретично зловмисник може почекати, доки ми розгорнемо проксі та першу версію мосту, а потім [випередити (front-run)](https://solidity-by-example.org/hacks/front-running/), щоб дістатися до функції `initialize` раніше, ніж це зробить легітимний користувач. Але є два способи запобігти цьому:

1. Якщо контракти розгортаються не безпосередньо EOA, а [у транзакції, яка змушує інший контракт створювати їх](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), весь процес може бути атомарним і завершитися до виконання будь-якої іншої транзакції.
2. Якщо легітимний виклик `initialize` не вдається, завжди можна проігнорувати щойно створений проксі та міст і створити нові.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Це два параметри, які міст повинен знати.

```solidity

    /**************
     * Внесення *
     **************/

    /** @dev Модифікатор, що вимагає, щоб відправник був EOA.  Цю перевірку може
     *  обійти зловмисний контракт через initcode, але вона запобігає помилці користувача, якої ми хочемо уникнути.
     */
    modifier onlyEOA() {
        // Використовується для зупинки депозитів з контрактів (щоб уникнути випадкової втрати токенів)
        require(!Address.isContract(msg.sender), "Обліковий запис не є EOA");
        _;
    }
```

Ось чому нам знадобилися утиліти `Address` від OpenZeppelin.

```solidity
    /**
     * @dev Цю функцію можна викликати без даних
     * для внесення суми ETH на баланс викликаючого на L2.
     * Оскільки функція receive не приймає дані, консервативна
     * стандартна сума пересилається на L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Ця функція існує для тестування.
Зверніть увагу, що вона не з’являється у визначеннях інтерфейсу — вона не для звичайного використання.

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

Ці дві функції є обгортками навколо `_initiateETHDeposit`, функції, яка обробляє фактичне внесення ETH.

```solidity
    /**
     * @dev Виконує логіку для депозитів, зберігаючи ETH та інформуючи шлюз L2 ETH про
     * депозит.
     * @param _from Обліковий запис, з якого буде взято депозит на L1.
     * @param _to Обліковий запис, на який буде зараховано депозит на L2.
     * @param _l2Gas Ліміт газу, необхідний для завершення депозиту на L2.
     * @param _data Необов’язкові дані для пересилання на L2. Ці дані надаються
     *        виключно для зручності зовнішніх контрактів. Крім встановлення максимальної
     *        довжини, ці контракти не дають жодних гарантій щодо їхнього вмісту.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Сконструювати calldata для виклику finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Спосіб роботи міждоменних повідомлень полягає в тому, що контракт призначення викликається з повідомленням як його calldata.
Контракти Solidity завжди інтерпретують свої calldata відповідно до
[специфікацій ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Функція Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) створює ці calldata.

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

Повідомлення тут — це виклик [функції `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) з такими параметрами:

| Параметр                        | Значення                                                                                 | Значення                                                                                                                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | Спеціальне значення для ETH (який не є токеном ERC-20) на L1                                                                                                 |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Контракт L2, який керує ETH на Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (цей контракт призначений лише для внутрішнього використання Optimism) |
| \_from    | \_from                                                             | Адреса на L1, яка надсилає ETH                                                                                                                                                  |
| \_to      | \_to                                                               | Адреса на L2, яка отримує ETH                                                                                                                                                   |
| сума                            | msg.value                                                                | Кількість надісланих wei (які вже надіслано на міст)                                                                                                         |
| \_data    | \_data                                                             | Додаткові дані, які додаються до депозиту                                                                                                                                       |

```solidity
        // Надіслати calldata на L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Надішліть повідомлення через міждоменний месенджер.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Надішліть подію, щоб повідомити будь-який децентралізований застосунок, який відстежує цей переказ.

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

Ці дві функції є обгортками навколо `_initiateERC20Deposit`, функції, яка обробляє фактичне внесення ERC-20.

```solidity
    /**
     * @dev Виконує логіку для депозитів, інформуючи токен L2 Deposited Token
     * про депозит і викликаючи обробник для блокування коштів L1. (наприклад, transferFrom)
     *
     * @param _l1Token Адреса L1 ERC20, який ми вносимо
     * @param _l2Token Адреса відповідного L2 ERC20 на L1
     * @param _from Обліковий запис, з якого буде взято депозит на L1
     * @param _to Обліковий запис, на який буде зараховано депозит на L2
     * @param _amount Сума ERC20 для внесення.
     * @param _l2Gas Ліміт газу, необхідний для завершення депозиту на L2.
     * @param _data Необов’язкові дані для пересилання на L2. Ці дані надаються
     *        виключно для зручності зовнішніх контрактів. Крім встановлення максимальної
     *        довжини, ці контракти не дають жодних гарантій щодо їхнього вмісту.
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

Ця функція подібна до `_initiateETHDeposit` вище, з кількома важливими відмінностями.
Перша відмінність полягає в тому, що ця функція отримує адреси токенів і суму для переказу як параметри.
У випадку з ETH виклик мосту вже включає переказ активу на рахунок мосту (`msg.value`).

```solidity
        // Коли депозит ініціюється на L1, міст L1 переказує кошти на свій рахунок для майбутніх
        // виведень. safeTransferFrom також перевіряє, чи є у контракту код, тому це не спрацює, якщо
        // _from є EOA або address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Перекази токенів ERC-20 відбуваються за іншим процесом, ніж ETH:

1. Користувач (`_from`) надає дозвіл мосту на переказ відповідних токенів.
2. Користувач викликає міст з адресою контракту токена, сумою тощо.
3. Міст переказує токени (собі) у рамках процесу внесення.

Перший крок може відбуватися в окремій транзакції від останніх двох.
Однак випередження (front-running) не є проблемою, оскільки дві функції, які викликають `_initiateERC20Deposit` (`depositERC20` і `depositERC20To`), викликають цю функцію лише з `msg.sender` як параметром `_from`.

```solidity
        // Сконструювати calldata для _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Надіслати calldata на L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Додайте внесену кількість токенів до структури даних `deposits`.
На L2 може бути кілька адрес, які відповідають одному токену L1 ERC-20, тому для відстеження депозитів недостатньо використовувати баланс токена L1 ERC-20 на мосту.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Міжмережеві функції *
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

Міст L2 надсилає повідомлення до міждоменного месенджера L2, який змушує міждоменний месенджер L1 викликати цю функцію (звичайно, коли [транзакція, яка завершує повідомлення](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions), надсилається на L1).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Переконайтеся, що це _легітимне_ повідомлення, яке надходить від міждоменного месенджера та походить від мосту токенів L2.
Ця функція використовується для виведення ETH з мосту, тому ми повинні переконатися, що її викликає лише авторизований викликаючий.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Спосіб переказу ETH полягає у виклику одержувача із сумою wei в `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: не вдалося переказати ETH");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Випромінюйте подію про виведення коштів.

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

Ця функція подібна до `finalizeETHWithdrawal` вище, з необхідними змінами для токенів ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Оновіть структуру даних `deposits`.

```solidity

        // Коли виведення фіналізується на L1, міст L1 переказує кошти тому, хто виводить
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Тимчасово - міграція ETH *
     *****************************/

    /**
     * @dev Додає баланс ETH до облікового запису. Це призначено для того, щоб дозволити міграцію ETH
     * зі старого шлюзу на новий.
     * ПРИМІТКА: Це залишено лише для одного оновлення, щоб ми могли отримати мігрований ETH зі
     * старого контракту
     */
    function donateETH() external payable {}
}
```

Існувала рання реалізація мосту.
Коли ми переходили від тієї реалізації до цієї, нам довелося перемістити всі активи.
Токени ERC-20 можна просто перемістити.
Однак для переказу ETH до контракту потрібне схвалення цього контракту, що нам і надає `donateETH`.

## Токени ERC-20 на L2 {#erc-20-tokens-on-l2}

Щоб токен ERC-20 підходив до стандартного мосту, він має дозволяти стандартному мосту, і _лише_ стандартному мосту, карбувати токен.
Це необхідно, оскільки мости повинні гарантувати, що кількість токенів, що обертаються на Optimism, дорівнює кількості токенів, заблокованих у контракті мосту L1.
Якщо на L2 буде занадто багато токенів, деякі користувачі не зможуть переказати свої активи назад на L1 через міст.
Замість надійного мосту ми, по суті, відтворимо [банківську систему з частковим резервуванням](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Якщо на L1 забагато токенів, деякі з них назавжди залишаться заблокованими в бридж-контракті, оскільки їх неможливо звільнити, не спаливши токени L2.

### IL2StandardERC20 {#il2standarderc20}

Кожен токен ERC-20 на L2, який використовує стандартний міст, повинен надавати [цей інтерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), який має функції та події, необхідні стандартному мосту.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Стандартний інтерфейс ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) не включає функції `mint` та `burn`.
Ці методи не вимагаються [стандартом ERC-20](https://eips.ethereum.org/EIPS/eip-20), який не визначає механізми створення та знищення токенів.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Інтерфейс ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) використовується для визначення того, які функції надає контракт.
[Стандарт можна прочитати тут](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Ця функція надає адресу токена L1, який переказується на цей контракт через міст.
Зауважте, що у нас немає подібної функції у зворотному напрямку.
Нам потрібно мати можливість переказувати будь-який токен L1 через міст, незалежно від того, чи планувалася підтримка L2 під час його впровадження.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Функції та події для карбування (створення) і спалювання (знищення) токенів.
Міст має бути єдиною сутністю, яка може запускати ці функції, щоб переконатися, що кількість токенів правильна (дорівнює кількості токенів, заблокованих на L1).

### L2StandardERC20 {#L2StandardERC20}

[Це наша реалізація інтерфейсу `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Якщо вам не потрібна якась спеціальна логіка, ви повинні використовувати цю.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Контракт ERC-20 від OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism не вірить у винахід колеса, особливо коли колесо добре перевірено та має бути достатньо надійним, щоб зберігати активи.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Це два додаткові параметри конфігурації, які потрібні нам, а ERC-20 зазвичай не вимагає.

```solidity

    /**
     * @param _l2Bridge Адреса стандартного мосту L2.
     * @param _l1Token Адреса відповідного токена L1.
     * @param _name Назва ERC20.
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

Спочатку викликаємо конструктор для контракту, від якого ми успадковуємо (`ERC20(_name, _symbol)`), а потім встановлюємо наші власні змінні.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Тільки міст L2 може карбувати та спалювати");
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

Саме так працює [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Кожен інтерфейс — це набір підтримуваних функцій, що ідентифікується як [виключне АБО](https://en.wikipedia.org/wiki/Exclusive_or) [селекторів функцій ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) цих функцій.

Міст L2 використовує ERC-165 як перевірку на адекватність, щоб переконатися, що контракт ERC-20, на який він надсилає активи, є `IL2StandardERC20`.

**Примітка:** ніщо не заважає зловмисному контракту надавати неправдиві відповіді на `supportsInterface`, тому це механізм перевірки на адекватність, а _не_ механізм безпеки.

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

Лише на мосту L2 дозволено карбувати та спалювати активи.

`_mint` та `_burn` насправді визначені в [контракті ERC-20 від OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Цей контракт просто не робить їх доступними ззовні, оскільки умови для карбування та спалювання токенів настільки ж різноманітні, як і кількість способів використання ERC-20.

## Код мосту L2 {#l2-bridge-code}

Це код, який запускає міст у Optimism.
[Вихідний код цього контракту тут](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Імпорт інтерфейсів */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Інтерфейс [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) дуже схожий на [еквівалент L1](#IL1ERC20Bridge), який ми бачили вище.
Є дві істотні відмінності:

1. На L1 ви ініціюєте внесення та фіналізуєте виведення коштів.
   Тут ви ініціюєте виведення та фіналізуєте внесення коштів.
2. На L1 необхідно розрізняти токени ETH і ERC-20.
   На L2 ми можемо використовувати однакові функції для обох, оскільки внутрішні баланси ETH на Optimism обробляються як токен ERC-20 з адресою [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Імпорт бібліотек */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Імпорт контрактів */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Стандартний міст L2 — це контракт, який працює разом зі стандартним мостом L1, щоб
 * забезпечити перекази ETH та ERC20 між L1 та L2.
 * Цей контракт діє як мінтер для нових токенів, коли він отримує інформацію про депозити в стандартний міст
 * L1.
 * Цей контракт також діє як спалювач токенів, призначених для виведення, інформуючи міст L1
 * про необхідність вивільнення коштів L1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Посилання на зовнішні контракти *
     ********************************/

    address public l1TokenBridge;
```

Відстежуйте адресу мосту L1.
Зверніть увагу, що на відміну від еквівалента L1, тут нам _потрібна_ ця змінна.
Адреса мосту L1 заздалегідь невідома.

```solidity

    /***************
     * Конструктор *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Міждоменний месенджер, що використовується цим контрактом.
     * @param _l1TokenBridge Адреса мосту L1, розгорнутого в основній мережі.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Виведення *
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

Ці дві функції ініціюють виведення коштів.
Зверніть увагу, що немає необхідності вказувати адресу токена L1.
Очікується, що токени L2 повідомлять нам адресу еквівалента L1.

```solidity

    /**
     * @dev Виконує логіку для виведення, спалюючи токен та інформуючи
     *      шлюз токенів L1 про виведення.
     * @param _l2Token Адреса токена L2, де ініційовано виведення.
     * @param _from Обліковий запис, з якого буде взято виведення на L2.
     * @param _to Обліковий запис, на який буде зараховано виведення на L1.
     * @param _amount Кількість токена для виведення.
     * @param _l1Gas Не використовується, але включено для можливих міркувань щодо майбутньої сумісності.
     * @param _data Необов’язкові дані для пересилання на L1. Ці дані надаються
     *        виключно для зручності зовнішніх контрактів. Крім встановлення максимальної
     *        довжини, ці контракти не дають жодних гарантій щодо їхнього вмісту.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Коли виведення ініціюється, ми спалюємо кошти того, хто виводить, щоб запобігти подальшому використанню на L2
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Зауважте, що ми покладаємося не на параметр `_from`, а на `msg.sender`, який набагато важче підробити (наскільки мені відомо, неможливо).

```solidity

        // Сконструювати calldata для l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

На L1 необхідно розрізняти ETH і ERC-20.

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

        // Надіслати повідомлення на міст L1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Міжмережева функція: внесення *
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

Ця функція викликається `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Переконайтеся, що джерело повідомлення є легітимним.
Це важливо, оскільки ця функція викликає `_mint` і може бути використана для надання токенів, які не забезпечені токенами, якими володіє міст на L1.

```solidity
        // Перевірити, чи є цільовий токен сумісним, і
        // перевірити, чи відповідає внесений токен на L1 представленню токена на L2 тут
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Перевірки на адекватність:

1. Підтримується правильний інтерфейс
2. Адреса L1 контракту L2 ERC-20 відповідає джерелу L1 токенів

```solidity
        ) {
            // Коли депозит фіналізується, ми зараховуємо на рахунок на L2 таку ж кількість
            // токенів.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Якщо перевірки на адекватність проходять, фіналізуйте депозит:

1. Викарбуйте токени
2. Випромінюйте відповідну подію

```solidity
        } else {
            // Або токен L2, на який вноситься депозит, не погоджується з правильною адресою
            // свого токена L1, або не підтримує правильний інтерфейс.
            // Це має відбуватися лише у випадку зловмисного токена L2, або якщо користувач якимось чином
            // вказав неправильну адресу токена L2 для депозиту.
            // У будь-якому випадку, ми зупиняємо процес тут і створюємо повідомлення про
            // виведення, щоб користувачі могли в деяких випадках повернути свої кошти.
            // Немає способу повністю запобігти зловмисним контрактам токенів, але це обмежує
            // помилки користувачів і пом'якшує деякі форми зловмисної поведінки контрактів.
```

Якщо користувач зробив помилку, яку можна виявити, використавши неправильну адресу токена L2, ми хочемо скасувати депозит і повернути токени на L1.
Єдиний спосіб зробити це з L2 — надіслати повідомлення, яке має чекати періоду оскарження помилки, але це набагато краще для користувача, ніж остаточна втрата токенів.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // тут поміняли _to та _from, щоб повернути депозит відправнику
                _from,
                _amount,
                _data
            );

            // Надіслати повідомлення на міст L1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Висновок {#conclusion}

Стандартний міст є найбільш гнучким механізмом для переказу активів.
Однак, оскільки він настільки загальний, це не завжди найпростіший механізм для використання.
Особливо для виведення коштів, більшість користувачів вважають за краще використовувати [сторонні мости](https://optimism.io/apps#bridge), які не чекають періоду оскарження і не вимагають доказу Merkle для завершення виведення.

Ці мости зазвичай працюють, маючи активи на L1, які вони надають негайно за невелику плату (часто меншу, ніж вартість газу для стандартного виведення через міст).
Коли міст (або люди, які ним керують) очікує брак активів L1, він переказує достатню кількість активів з L2. Оскільки це дуже великі виведення, вартість виведення амортизується на велику суму та становить набагато менший відсоток.

Сподіваюся, ця стаття допомогла вам більше зрозуміти, як працює рівень 2 і як написати чіткий і безпечний код Solidity.

[Більше моїх робіт дивіться тут](https://cryptodocguy.pro/).
