---
title: "Огляд контракту стандартного мосту Optimism"
description: Як працює стандартний міст для Optimism? Чому він працює саме так?
author: Орі Померанц
tags: ["solidity", "міст", "рівень 2 (l2)"]
skill: intermediate
breadcrumb: Міст Optimism
published: 2022-03-30
lang: uk
---

[Optimism](https://www.optimism.io/) — це [оптимістичний ролап](/developers/docs/scaling/optimistic-rollups/).
Оптимістичні ролапи можуть обробляти транзакції за значно нижчою ціною, ніж головна мережа Ethereum (також відома як рівень 1 (l1)), оскільки транзакції обробляються лише кількома вузлами, а не кожним вузлом у мережі.
Водночас усі дані записуються на l1, тому все можна довести та відновити з усіма гарантіями цілісності та доступності Головної мережі.

Щоб використовувати активи l1 в Optimism (або на будь-якому іншому l2), активи потрібно [перевести через міст](/bridges/#prerequisites).
Один зі способів досягти цього — користувачам заблокувати активи (ETH та [токени ERC-20](/developers/docs/standards/tokens/erc-20/) є найпоширенішими) на l1 і отримати еквівалентні активи для використання на l2.
Зрештою, той, хто їх отримає, може захотіти перевести їх назад на l1 через міст.
Під час цього активи спалюються на l2, а потім повертаються користувачеві на l1.

Саме так працює [стандартний міст Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
У цій статті ми розглянемо вихідний код цього мосту, щоб побачити, як він працює, і вивчимо його як приклад добре написаного коду Solidity.

## Потоки керування {#control-flows}

Міст має два основні потоки:

- Депозит (з l1 на l2)
- Виведення (з l2 на l1)

### Потік депозиту {#deposit-flow}

#### Рівень 1 {#deposit-flow-layer-1}

1. Якщо вноситься ERC-20, вкладник надає мосту дозвіл на витрачання суми, що вноситься
2. Вкладник викликає міст l1 (`depositERC20`, `depositERC20To`, `depositETH` або `depositETHTo`)
3. Міст l1 отримує у володіння переведений актив
   - ETH: Актив переказується вкладником як частина виклику
   - ERC-20: Актив переказується мостом самому собі за допомогою дозволу, наданого вкладником
4. Міст l1 використовує механізм міждоменних повідомлень для виклику `finalizeDeposit` на мосту l2

#### Рівень 2 {#deposit-flow-layer-2}

5. Міст l2 перевіряє, чи є виклик `finalizeDeposit` легітимним:
   - Надійшов від контракту міждоменних повідомлень
   - Спочатку був від мосту на l1
6. Міст l2 перевіряє, чи є контракт токена ERC-20 на l2 правильним:
   - Контракт l2 повідомляє, що його аналог на l1 є тим самим, від якого надійшли токени на l1
   - Контракт l2 повідомляє, що він підтримує правильний інтерфейс ([використовуючи ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Якщо контракт l2 є правильним, викликати його, щоб карбувати відповідну кількість токенів на відповідну адресу. Якщо ні, розпочати процес виведення, щоб дозволити користувачеві затребувати токени на l1.

### Потік виведення {#withdrawal-flow}

#### Рівень 2 {#withdrawal-flow-layer-2}

1. Особа, що здійснює виведення, викликає міст l2 (`withdraw` або `withdrawTo`)
2. Міст l2 спалює відповідну кількість токенів, що належать `msg.sender`
3. Міст l2 використовує механізм міждоменних повідомлень для виклику `finalizeETHWithdrawal` або `finalizeERC20Withdrawal` на мосту l1

#### Рівень 1 {#withdrawal-flow-layer-1}

4. Міст l1 перевіряє, чи є виклик `finalizeETHWithdrawal` або `finalizeERC20Withdrawal` легітимним:
   - Надійшов від механізму міждоменних повідомлень
   - Спочатку був від мосту на l2
5. Міст l1 переказує відповідний актив (ETH або ERC-20) на відповідну адресу

## Код рівня 1 {#layer-1-code}

Це код, який виконується на l1, у головній мережі Ethereum.

### IL1ERC20Bridge {#il1erc20bridge}

[Цей інтерфейс визначено тут](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Він містить функції та визначення, необхідні для переведення токенів ERC-20 через міст.

```solidity
// SPDX-License-Identifier: MIT
```

[Більшість коду Optimism випущено під ліцензією MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

На момент написання статті останньою версією Solidity є 0.8.12.
Поки не вийде версія 0.9.0, ми не знаємо, чи буде цей код сумісний з нею.

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

У термінології мосту Optimism _депозит_ означає переказ з l1 на l2, а _виведення_ означає переказ з l2 на l1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

У більшості випадків адреса ERC-20 на l1 не збігається з адресою еквівалентного ERC-20 на l2.
[Ви можете переглянути список адрес токенів тут](https://static.optimism.io/optimism.tokenlist.json).
Адреса з `chainId` 1 знаходиться на l1 (Головна мережа), а адреса з `chainId` 10 — на l2 (Optimism).
Інші два значення `chainId` призначені для тестової мережі Kovan (42) та тестової мережі Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

До переказів можна додавати примітки, у такому разі вони додаються до подій, які про них повідомляють.

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
У випадку мосту l1 це означає ініціалізацію депозитів та завершення виведення.

```solidity

    /********************
     * Публічні функції *
     ********************/

    /**
     * @dev отримати адресу відповідного контракту мосту l2.
     * @return Адреса відповідного контракту мосту l2.
     */
    function l2TokenBridge() external returns (address);
```

Ця функція насправді не потрібна, оскільки на l2 це попередньо розгорнутий контракт, тому він завжди знаходиться за адресою `0x4200000000000000000000000000000000000010`.
Вона тут для симетрії з мостом l2, оскільки адресу мосту l1 дізнатися _не_ так просто.

```solidity
    /**
     * @dev внести суму ERC-20 на баланс абонента на l2.
     * @param _l1Token Адреса ERC-20 на l1, який ми вносимо
     * @param _l2Token Адреса відповідного ERC-20 на l2 для l1
     * @param _amount Сума ERC-20 для внесення
     * @param _l2Gas Ліміт газу, необхідний для завершення внесення на l2.
     * @param _data Необов'язкові дані для пересилання на l2. Ці дані надаються
     *        виключно для зручності зовнішніх контрактів. Окрім обмеження максимальної
     *        довжини, ці контракти не надають жодних гарантій щодо їхнього вмісту.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Параметр `_l2Gas` — це кількість газу l2, яку дозволено витратити транзакції.
[До певної (високої) межі це безкоштовно](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), тому, якщо контракт ERC-20 не робить нічого дійсно дивного під час карбування, це не повинно бути проблемою.
Ця функція обробляє поширений сценарій, коли користувач переводить активи через міст на ту саму адресу в іншому блокчейні.

```solidity
    /**
     * @dev внести суму ERC-20 на баланс одержувача на l2.
     * @param _l1Token Адреса ERC-20 на l1, який ми вносимо
     * @param _l2Token Адреса відповідного ERC-20 на l2 для l1
     * @param _to Адреса на l2 для зарахування виведення.
     * @param _amount Сума ERC-20 для внесення.
     * @param _l2Gas Ліміт газу, необхідний для завершення внесення на l2.
     * @param _data Необов'язкові дані для пересилання на l2. Ці дані надаються
     *        виключно для зручності зовнішніх контрактів. Окрім обмеження максимальної
     *        довжини, ці контракти не надають жодних гарантій щодо їхнього вмісту.
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

Ця функція майже ідентична `depositERC20`, але вона дозволяє вам надіслати ERC-20 на іншу адресу.

```solidity
    /*************************
     * Кросчейн-функції *
     *************************/

    /**
     * @dev Завершити виведення з l2 на l1 та зарахувати кошти на баланс одержувача
     * токена ERC-20 на l1.
     * Цей виклик завершиться помилкою, якщо ініційоване виведення з l2 не було фіналізовано.
     *
     * @param _l1Token Адреса токена на l1, для якого виконується finalizeWithdrawal.
     * @param _l2Token Адреса токена на l2, де було ініційовано виведення.
     * @param _from Адреса на l2, що ініціює переказ.
     * @param _to Адреса на l1 для зарахування виведення.
     * @param _amount Сума ERC-20 для внесення.
     * @param _data Дані, надані відправником на l2. Ці дані надаються
     *   виключно для зручності зовнішніх контрактів. Окрім обмеження максимальної
     *   довжини, ці контракти не надають жодних гарантій щодо їхнього вмісту.
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

Виведення (та інші повідомлення з l2 на l1) в Optimism — це двохетапний процес:

1. Ініціююча транзакція на l2.
2. Завершальна транзакція або транзакція затребування на l1.
   Ця транзакція має відбутися після завершення [періоду оскарження помилок](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) для транзакції l2.

### IL1StandardBridge {#il1standardbridge}

[Цей інтерфейс визначено тут](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Цей файл містить визначення подій та функцій для ETH.
Ці визначення дуже схожі на ті, що визначені в `IL1ERC20Bridge` вище для ERC-20.

Інтерфейс мосту розділений на два файли, оскільки деякі токени ERC-20 потребують спеціальної обробки і не можуть оброблятися стандартним мостом.
Таким чином, спеціальний міст, який обробляє такий токен, може реалізувати `IL1ERC20Bridge` і не мати потреби також переводити ETH.

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

Ця подія майже ідентична версії ERC-20 (`ERC20DepositInitiated`), за винятком відсутності адрес токенів l1 та l2.
Те саме стосується інших подій та функцій.

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
     * @dev Внести суму ETH на баланс абонента на l2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Внести суму ETH на баланс одержувача на l2.
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
     * Кросчейн-функції *
     *************************/

    /**
     * @dev Завершити виведення з l2 на l1 та зарахувати кошти на баланс одержувача
     * токена ETH на l1. Оскільки лише xDomainMessenger може викликати цю функцію, вона ніколи не буде викликана
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

[Цей контракт](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) успадковується обома мостами ([l1](#the-l1-bridge-contract) та [l2](#l2-bridge-code)) для надсилання повідомлень на інший рівень.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Імпорт інтерфейсів */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Цей інтерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) вказує контракту, як надсилати повідомлення на інший рівень, використовуючи міждоменний месенджер.
Цей міждоменний месенджер — це зовсім інша система, яка заслуговує на окрему статтю, яку я сподіваюся написати в майбутньому.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Допоміжний контракт для контрактів, що виконують кросдоменні комунікації
 *
 * Використаний компілятор: визначається контрактом-спадкоємцем
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

Єдиний параметр, який потрібно знати контракту, — це адреса міждоменного месенджера на цьому рівні.
Цей параметр встановлюється один раз у конструкторі і ніколи не змінюється.

```solidity

    /**********************
     * Модифікатори функцій *
     **********************/

    /**
     * Забезпечує вимогу, щоб модифікована функція могла бути викликана лише певним кросдоменним акаунтом.
     * @param _sourceDomainAccount Єдиний акаунт у вихідному домені, який
     *  автентифікований для виклику цієї функції.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Міждоменний обмін повідомленнями доступний будь-якому контракту в блокчейні, де він працює (чи то Головна мережа Ethereum, чи Optimism).
Але нам потрібно, щоб міст з кожного боку довіряв _лише_ певним повідомленням, якщо вони надходять від мосту з іншого боку.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Довіряти можна лише повідомленням від відповідного міждоменного месенджера (`messenger`, як ви бачите нижче).

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Спосіб, у який міждоменний месенджер надає адресу, що надіслала повідомлення з іншого рівня, — це [функція `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Поки вона викликається в транзакції, ініційованій повідомленням, вона може надати цю інформацію.

Нам потрібно переконатися, що отримане нами повідомлення надійшло від іншого мосту.

```solidity

        _;
    }

    /**********************
     * Внутрішні функції *
     **********************/

    /**
     * Отримує месенджер, зазвичай зі сховища. Ця функція відкрита на випадок, якщо дочірньому контракту
     * потрібно її перевизначити.
     * @return Адреса контракту кросдоменного месенджера, який слід використовувати.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Ця функція повертає міждоменний месенджер.
Ми використовуємо функцію, а не змінну `messenger`, щоб дозволити контрактам, які успадковують цей контракт, використовувати алгоритм для визначення того, який міждоменний месенджер використовувати.

```solidity

    /**
     * Надсилає повідомлення на акаунт в іншому домені
     * @param _crossDomainTarget Цільовий одержувач у домені призначення
     * @param _message Дані для надсилання цілі (зазвичай дані виклику для функції з
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Ліміт газу для отримання повідомлення в домені призначення.
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

[Слізер](https://github.com/crytic/slither) — це статичний аналізатор, який Optimism запускає на кожному контракті для пошуку вразливостей та інших потенційних проблем.
У цьому випадку наступний рядок викликає дві вразливості:

1. [Події повторного входу](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Безпечний повторний вхід](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

У цьому випадку ми не турбуємося про повторний вхід, оскільки знаємо, що `getCrossDomainMessenger()` повертає надійну адресу, навіть якщо Слізер не має можливості про це дізнатися.

### Контракт мосту l1 {#the-l1-bridge-contract}

[Вихідний код цього контракту знаходиться тут](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Інтерфейси можуть бути частиною інших контрактів, тому вони повинні підтримувати широкий спектр версій Solidity.
Але сам міст — це наш контракт, і ми можемо бути суворими щодо того, яку версію Solidity він використовує.

```solidity
/* Імпорт інтерфейсів */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) та [IL1StandardBridge](#il1standardbridge) пояснюються вище.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Цей інтерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) дозволяє нам створювати повідомлення для керування стандартним мостом на l2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Цей інтерфейс](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) дозволяє нам керувати контрактами ERC-20.
[Ви можете прочитати більше про це тут](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Імпорт бібліотек */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Як пояснювалося вище](#crossdomainenabled), цей контракт використовується для міжрівневого обміну повідомленнями.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) містить адреси для контрактів l2, які завжди мають однакову адресу. Це включає стандартний міст на l2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Утиліти Address від ОупенЗеппелін](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Вони використовуються для розрізнення адрес контрактів та адрес, що належать зовнішнім акаунтам (EOA).

Зауважте, що це не ідеальне рішення, оскільки немає способу розрізнити прямі виклики та виклики, зроблені з конструктора контракту, але принаймні це дозволяє нам виявляти та запобігати деяким поширеним помилкам користувачів.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Стандарт ERC-20](https://eips.ethereum.org/EIPS/eip-20) підтримує два способи для контракту повідомити про помилку:

1. Скасувати
2. Повернути `false`

Обробка обох випадків ускладнила б наш код, тому замість цього ми використовуємо [`SafeERC20` від ОупенЗеппелін](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), що гарантує, що [всі помилки призводять до скасування](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Міст ETH та ERC-20 на l1 — це контракт, який зберігає внесені кошти l1 та стандартні
 * токени, що використовуються на l2. Він синхронізує відповідний міст l2, інформуючи його про внесення
 * та прослуховуючи його на наявність нових фіналізованих виведень.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Цей рядок вказує на використання обгортки `SafeERC20` щоразу, коли ми використовуємо інтерфейс `IERC20`.

```solidity

    /********************************
     * Посилання на зовнішні контракти *
     ********************************/

    address public l2TokenBridge;
```

Адреса [L2StandardBridge](#l2-bridge-code).

```solidity

    // Відображає токен l1 на токен l2 до балансу внесеного токена l1
    mapping(address => mapping(address => uint256)) public deposits;
```

Подвійне [відображення (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) на кшталт цього — це спосіб визначення [двовимірного розрідженого масиву](https://en.wikipedia.org/wiki/Sparse_matrix).
Значення в цій структурі даних ідентифікуються як `deposit[L1 token addr][L2 token addr]`.
Значення за замовчуванням — нуль.
Лише комірки, яким встановлено інше значення, записуються до сховища.

```solidity

    /***************
     * Конструктор *
     ***************/

    // Цей контракт знаходиться за проксі, тому параметри конструктора не використовуватимуться.
    constructor() CrossDomainEnabled(address(0)) {}
```

Ми хочемо мати можливість оновлювати цей контракт без необхідності копіювати всі змінні у сховищі.
Для цього ми використовуємо [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), проксі-контракт, який використовує [`delegatecall`](https://solidity-by-example.org/delegatecall/) для передачі викликів до окремого контракту, адреса якого зберігається проксі-контрактом (під час оновлення ви вказуєте проксі змінити цю адресу).
Коли ви використовуєте `delegatecall`, сховище залишається сховищем _викликаючого_ контракту, тому значення всіх змінних стану контракту залишаються незмінними.

Одним із наслідків цього патерну є те, що сховище контракту, який _викликається_ за допомогою `delegatecall`, не використовується, і тому значення конструктора, передані йому, не мають значення.
Саме тому ми можемо надати безглузде значення конструктору `CrossDomainEnabled`.
Це також є причиною того, що ініціалізація нижче відокремлена від конструктора.

```solidity
    /******************
     * Ініціалізація *
     ******************/

    /**
     * @param _l1messenger Адреса месенджера l1, що використовується для кросчейн-комунікацій.
     * @param _l2TokenBridge Адреса стандартного мосту l2.
     */
    // slither-disable-next-line external-function
```

Цей [тест Слізер](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) ідентифікує функції, які не викликаються з коду контракту і тому можуть бути оголошені як `external` замість `public`.
Вартість газу для функцій `external` може бути нижчою, оскільки їм можна передавати параметри в даних виклику.
Функції, оголошені як `public`, мають бути доступними зсередини контракту.
Контракти не можуть змінювати власні дані виклику, тому параметри мають бути в пам'яті.
Коли така функція викликається ззовні, необхідно скопіювати дані виклику в пам'ять, що коштує газу.
У цьому випадку функція викликається лише один раз, тому неефективність не має для нас значення.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

Функція `initialize` має викликатися лише один раз.
Якщо адреса міждоменного месенджера l1 або мосту токенів l2 змінюється, ми створюємо новий проксі-контракт і новий міст, який його викликає.
Це навряд чи станеться, за винятком випадків оновлення всієї системи, що трапляється дуже рідко.

Зауважте, що ця функція не має жодного механізму, який обмежує те, _хто_ може її викликати.
Це означає, що теоретично зловмисник міг би зачекати, поки ми розгорнемо проксі-контракт і першу версію мосту, а потім здійснити [випередження](https://solidity-by-example.org/hacks/front-running/), щоб дістатися до функції `initialize` раніше за легітимного користувача. Але є два методи запобігти цьому:

1. Якщо контракти розгортаються не безпосередньо через EOA, а [у транзакції, де їх створює інший контракт](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), весь процес може бути атомарним і завершитися до виконання будь-якої іншої транзакції.
2. Якщо легітимний виклик `initialize` завершується невдало, завжди можна проігнорувати щойно створені проксі-контракт і міст та створити нові.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Це два параметри, які потрібно знати мосту.

```solidity

    /**************
     * Внесення *
     **************/

    /** @dev Модифікатор, що встановлює вимогу, щоб відправник був EOA. Цю перевірку може обійти зловмисний
     *  контракт через initcode, але вона запобігає помилці користувача, якої ми хочемо уникнути.
     */
    modifier onlyEOA() {
        // Використовується для зупинки внесень з контрактів (щоб уникнути випадкової втрати токенів)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Саме тому нам знадобилися утиліти `Address` від ОупенЗеппелін.

```solidity
    /**
     * @dev Цю функцію можна викликати без даних,
     * щоб внести суму ETH на баланс абонента на l2.
     * Оскільки функція receive не приймає дані, консервативна
     * сума за замовчуванням пересилається на l2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Ця функція існує для цілей тестування.
Зверніть увагу, що вона не з'являється у визначеннях інтерфейсу — вона не призначена для звичайного використання.

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

Ці дві функції є обгортками навколо `_initiateETHDeposit`, функції, яка обробляє фактичний депозит ETH.

```solidity
    /**
     * @dev Виконує логіку для внесень, зберігаючи ETH та інформуючи шлюз ETH на l2 про
     * внесення.
     * @param _from Акаунт, з якого стягується внесення на l1.
     * @param _to Акаунт, якому надається внесення на l2.
     * @param _l2Gas Ліміт газу, необхідний для завершення внесення на l2.
     * @param _data Необов'язкові дані для пересилання на l2. Ці дані надаються
     *        виключно для зручності зовнішніх контрактів. Окрім обмеження максимальної
     *        довжини, ці контракти не надають жодних гарантій щодо їхнього вмісту.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Створити дані виклику для виклику finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Міждоменні повідомлення працюють таким чином, що контракт призначення викликається з повідомленням у вигляді його даних виклику.
Контракти Solidity завжди інтерпретують свої дані виклику відповідно до
[специфікацій ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Функція Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) створює ці дані виклику.

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

Повідомлення тут полягає у виклику [функції `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) з такими параметрами:

| Параметр | Значення | Значення |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0) | Спеціальне значення, що позначає ETH (який не є токеном ERC-20) на l1 |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Контракт l2, який керує ETH в Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (цей контракт призначений лише для внутрішнього використання Optimism) |
| \_from | \_from | Адреса на l1, яка надсилає ETH |
| \_to | \_to | Адреса на l2, яка отримує ETH |
| amount | msg.value | Кількість надісланих Wei (які вже були надіслані на міст) |
| \_data | \_data | Додаткові дані, які додаються до депозиту |

```solidity
        // Надіслати дані виклику на l2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Надіслати повідомлення через міждоменний месенджер.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Викликати подію, щоб повідомити будь-який децентралізований застосунок (dapp), який прослуховує цей переказ.

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

Ці дві функції є обгортками навколо `_initiateERC20Deposit`, функції, яка обробляє фактичний депозит ERC-20.

```solidity
    /**
     * @dev Виконує логіку для внесень, інформуючи контракт внесених токенів на l2
     * про внесення та викликаючи обробник для блокування коштів на l1. (наприклад, transferFrom)
     *
     * @param _l1Token Адреса ERC-20 на l1, який ми вносимо
     * @param _l2Token Адреса відповідного ERC-20 на l2 для l1
     * @param _from Акаунт, з якого стягується внесення на l1
     * @param _to Акаунт, якому надається внесення на l2
     * @param _amount Сума ERC-20 для внесення.
     * @param _l2Gas Ліміт газу, необхідний для завершення внесення на l2.
     * @param _data Необов'язкові дані для пересилання на l2. Ці дані надаються
     *        виключно для зручності зовнішніх контрактів. Окрім обмеження максимальної
     *        довжини, ці контракти не надають жодних гарантій щодо їхнього вмісту.
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

Ця функція схожа на `_initiateETHDeposit` вище, з кількома важливими відмінностями.
Перша відмінність полягає в тому, що ця функція отримує адреси токенів і суму для переказу як параметри.
У випадку з ETH виклик мосту вже включає переказ активу на акаунт мосту (`msg.value`).

```solidity
        // Коли внесення ініціюється на l1, міст l1 переказує кошти собі для майбутніх
        // виведень. safeTransferFrom також перевіряє, чи має контракт код, тому це завершиться помилкою, якщо
        // _from є EOA або address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Перекази токенів ERC-20 відбуваються за іншим процесом, ніж ETH:

1. Користувач (`_from`) надає мосту дозвіл на переказ відповідних токенів.
2. Користувач викликає міст з адресою контракту токена, сумою тощо.
3. Міст переказує токени (самому собі) як частину процесу депозиту.

Перший крок може відбутися в окремій транзакції від останніх двох.
Однак випередження не є проблемою, оскільки дві функції, які викликають `_initiateERC20Deposit` (`depositERC20` та `depositERC20To`), викликають цю функцію лише з `msg.sender` як параметром `_from`.

```solidity
        // Створити дані виклику для _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Надіслати дані виклику на l2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Додати внесену кількість токенів до структури даних `deposits`.
На l2 може бути кілька адрес, які відповідають одному й тому самому токену ERC-20 на l1, тому недостатньо використовувати баланс мосту токена ERC-20 на l1 для відстеження депозитів.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Кросчейн-функції *
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

Міст l2 надсилає повідомлення до міждоменного месенджера l2, що змушує міждоменний месенджер l1 викликати цю функцію (звісно, після того, як [транзакція, що завершує повідомлення](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions), буде надіслана на l1).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Переконайтеся, що це _легітимне_ повідомлення, яке надходить від міждоменного месенджера і походить від мосту токенів l2.
Ця функція використовується для виведення ETH з мосту, тому ми маємо переконатися, що її викликає лише авторизований абонент.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Спосіб переказу ETH полягає у виклику одержувача з кількістю Wei у `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Викликати подію про виведення.

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

Ця функція схожа на `finalizeETHWithdrawal` вище, з необхідними змінами для токенів ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Оновити структуру даних `deposits`.

```solidity

        // Коли виведення фіналізується на l1, міст l1 переказує кошти особі, що здійснює виведення
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Тимчасово - Міграція ETH *
     *****************************/

    /**
     * @dev Додає баланс ETH на акаунт. Це призначено для того, щоб дозволити міграцію ETH
     * зі старого шлюзу на новий шлюз.
     * ПРИМІТКА: Це залишено лише для одного оновлення, щоб ми могли отримати мігровані ETH зі
     * старого контракту
     */
    function donateETH() external payable {}
}
```

Існувала попередня реалізація мосту.
Коли ми перейшли від тієї реалізації до цієї, нам довелося перемістити всі активи.
Токени ERC-20 можна просто перемістити.
Однак, щоб переказати ETH на контракт, вам потрібне схвалення цього контракту, що й забезпечує нам `donateETH`.

## Токени ERC-20 на рівні 2 {#erc-20-tokens-on-l2}

Щоб токен ERC-20 підходив для стандартного мосту, він має дозволяти стандартному мосту, і _лише_ стандартному мосту, карбувати токен.
Це необхідно, оскільки мости мають гарантувати, що кількість токенів, які циркулюють в Optimism, дорівнює кількості токенів, заблокованих у контракті мосту l1.
Якщо на l2 буде забагато токенів, деякі користувачі не зможуть перевести свої активи назад на l1 через міст.
Замість надійного мосту ми б по суті відтворили [банкінг із частковим резервуванням](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Якщо на l1 буде забагато токенів, деякі з цих токенів назавжди залишаться заблокованими в контракті мосту, оскільки немає способу вивільнити їх без спалювання токенів l2.

### IL2StandardERC20 {#il2standarderc20}

Кожен токен ERC-20 на l2, який використовує стандартний міст, має надавати [цей інтерфейс](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), що містить функції та події, необхідні стандартному мосту.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Стандартний інтерфейс ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) не включає функції `mint` та `burn`.
Ці методи не вимагаються [стандартом ERC-20](https://eips.ethereum.org/EIPS/eip-20), який залишає невизначеними механізми створення та знищення токенів.

```solidity
import { IERC-165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Інтерфейс ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) використовується для визначення того, які функції надає контракт.
[Ви можете прочитати стандарт тут](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Ця функція надає адресу токена l1, який переведено через міст до цього контракту.
Зауважте, що ми не маємо подібної функції у зворотному напрямку.
Нам потрібно мати можливість перевести через міст будь-який токен l1, незалежно від того, чи планувалася підтримка l2 під час його реалізації, чи ні.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Функції та події для карбування (створення) та спалювання (знищення) токенів.
Міст має бути єдиною сутністю, яка може запускати ці функції, щоб гарантувати правильну кількість токенів (що дорівнює кількості токенів, заблокованих на l1).

### L2StandardERC20 {#l2standarderc20}

[Це наша реалізація інтерфейсу `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Якщо вам не потрібна якась спеціальна логіка, вам слід використовувати саме її.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Контракт ERC-20 від ОупенЗеппелін](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism не вірить у винайдення велосипеда, особливо коли цей велосипед добре перевірений і має бути достатньо надійним для зберігання активів.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Це два додаткові параметри конфігурації, які ми вимагаємо, а ERC-20 зазвичай ні.

```solidity

    /**
     * @param _l2Bridge Адреса стандартного мосту l2.
     * @param _l1Token Адреса відповідного токена l1.
     * @param _name Назва ERC-20.
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

Спочатку викликаємо конструктор для контракту, який ми успадковуємо (`ERC20(_name, _symbol)`), а потім встановлюємо власні змінні.

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

Саме так працює [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Кожен інтерфейс — це низка підтримуваних функцій, і він ідентифікується як [виключне АБО](https://en.wikipedia.org/wiki/Exclusive_or) [селекторів функцій ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) цих функцій.

Міст l2 використовує ERC-165 як базову перевірку, щоб переконатися, що контракт ERC-20, на який він надсилає активи, є `IL2StandardERC20`.

**Примітка:** Ніщо не заважає шахрайському контракту надавати неправдиві відповіді на `supportsInterface`, тому це механізм базової перевірки, а _не_ механізм безпеки.

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

Лише мосту l2 дозволено карбувати та спалювати активи.

`_mint` та `_burn` насправді визначені в [контракті ERC-20 від ОупенЗеппелін](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Цей контракт просто не відкриває їх назовні, оскільки умови для карбування та спалювання токенів такі ж різноманітні, як і кількість способів використання ERC-20.

## Код мосту рівня 2 {#l2-bridge-code}

Це код, який запускає міст в Optimism.
[Вихідний код цього контракту знаходиться тут](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Імпорт інтерфейсів */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Інтерфейс [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) дуже схожий на [еквівалент l1](#il1erc20bridge), який ми бачили вище.
Є дві суттєві відмінності:

1. На l1 ви ініціюєте депозити та завершуєте виведення.
   Тут ви ініціюєте виведення та завершуєте депозити.
2. На l1 необхідно розрізняти ETH та токени ERC-20.
   На l2 ми можемо використовувати ті самі функції для обох, оскільки внутрішньо баланси ETH в Optimism обробляються як токен ERC-20 з адресою [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Імпорт бібліотек */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Імпорт контрактів */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Стандартний міст l2 — це контракт, який працює разом зі стандартним мостом l1 для
 * забезпечення переходів ETH та ERC-20 між l1 та l2.
 * Цей контракт діє як той, що карбує нові токени, коли отримує інформацію про внесення до стандартного мосту
 * l1.
 * Цей контракт також діє як той, що спалює токени, призначені для виведення, інформуючи міст l1
 * про необхідність вивільнення коштів l1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Посилання на зовнішні контракти *
     ********************************/

    address public l1TokenBridge;
```

Відстежувати адресу мосту l1.
Зауважте, що на відміну від еквівалента l1, тут нам _потрібна_ ця змінна.
Адреса мосту l1 невідома заздалегідь.

```solidity

    /***************
     * Конструктор *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Кросдоменний месенджер, що використовується цим контрактом.
     * @param _l1TokenBridge Адреса мосту l1, розгорнутого в головній мережі.
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

Ці дві функції ініціюють виведення.
Зауважте, що немає потреби вказувати адресу токена l1.
Очікується, що токени l2 повідомлять нам адресу еквівалента l1.

```solidity

    /**
     * @dev Виконує логіку для виведень, спалюючи токен та інформуючи
     *      шлюз токенів на l1 про виведення.
     * @param _l2Token Адреса токена на l2, де ініціюється виведення.
     * @param _from Акаунт, з якого стягується виведення на l2.
     * @param _to Акаунт, якому надається виведення на l1.
     * @param _amount Сума токена для виведення.
     * @param _l1Gas Не використовується, але включено з міркувань потенційної прямої сумісності.
     * @param _data Необов'язкові дані для пересилання на l1. Ці дані надаються
     *        виключно для зручності зовнішніх контрактів. Окрім обмеження максимальної
     *        довжини, ці контракти не надають жодних гарантій щодо їхнього вмісту.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Коли ініціюється виведення, ми спалюємо кошти особи, що здійснює виведення, щоб запобігти подальшому l2
        // використанню
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Зверніть увагу, що ми _не_ покладаємося на параметр `_from`, а на `msg.sender`, який набагато важче підробити (неможливо, наскільки мені відомо).

```solidity

        // Створити дані виклику для l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

На l1 необхідно розрізняти ETH та ERC-20.

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

        // Надіслати повідомлення вгору до мосту l1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Кросчейн-функція: Внесення *
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
Це важливо, оскільки ця функція викликає `_mint` і може бути використана для видачі токенів, які не покриваються токенами, якими міст володіє на l1.

```solidity
        // Перевірити, чи цільовий токен є сумісним, та
        // переконатися, що внесений токен на l1 відповідає представленню внесеного токена на l2 тут
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Базові перевірки:

1. Підтримується правильний інтерфейс
2. Адреса l1 контракту ERC-20 на l2 збігається з джерелом токенів на l1

```solidity
        ) {
            // Коли внесення фіналізується, ми поповнюємо акаунт на l2 на таку ж суму
            // токенів.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Якщо базові перевірки пройдено, завершити депозит:

1. Карбувати токени
2. Викликати відповідну подію

```solidity
        } else {
            // Або токен l2, в який здійснюється внесення, не погоджується щодо правильної адреси
            // свого токена l1, або не підтримує правильний інтерфейс.
            // Це має статися лише у випадку наявності зловмисного токена l2, або якщо користувач якимось чином
            // вказав неправильну адресу токена l2 для внесення.
            // У будь-якому випадку ми зупиняємо процес тут і створюємо виведення
            // повідомлення, щоб користувачі могли вивести свої кошти в деяких випадках.
            // Немає способу повністю запобігти зловмисним контрактам токенів, але це обмежує
            // помилки користувачів і пом'якшує деякі форми зловмисної поведінки контрактів.
```

Якщо користувач зробив помилку, яку можна виявити, використавши неправильну адресу токена l2, ми хочемо скасувати депозит і повернути токени на l1.
Єдиний спосіб зробити це з l2 — надіслати повідомлення, якому доведеться чекати період оскарження помилок, але це набагато краще для користувача, ніж назавжди втратити токени.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // поміняли місцями _to та _from тут, щоб повернути внесення відправнику
                _from,
                _amount,
                _data
            );

            // Надіслати повідомлення вгору до мосту l1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Висновок {#conclusion}

Стандартний міст є найбільш гнучким механізмом для переказів активів.
Однак через те, що він такий універсальний, це не завжди найпростіший механізм у використанні.
Особливо для виведення більшість користувачів віддають перевагу використанню [сторонніх мостів](https://optimism.io/apps#bridge), які не чекають періоду оскарження і не вимагають доказу Меркла для завершення виведення.

Ці мости зазвичай працюють, маючи активи на l1, які вони надають негайно за невелику комісію (часто меншу за вартість газу для виведення через стандартний міст).
Коли міст (або люди, які ним керують) передбачає нестачу активів на l1, він переказує достатню кількість активів з l2. Оскільки це дуже великі виведення, вартість виведення амортизується на велику суму і становить набагато менший відсоток.

Сподіваємося, ця стаття допомогла вам краще зрозуміти, як працює рівень 2 і як писати зрозумілий та безпечний код Solidity.

[Дивіться тут більше моїх робіт](https://cryptodocguy.pro/).