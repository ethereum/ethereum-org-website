---
title: "Стандарт токенізованого сховища ERC-4626"
description: "Стандарт для дохідних сховищ."
lang: uk
---

## Вступ {#introduction}

ERC-4626 — це стандарт для оптимізації та уніфікації технічних параметрів дохідних сховищ. Він надає стандартний API для токенізованих дохідних сховищ, що представляють частки єдиного базового токена ERC-20. ERC-4626 також описує необов'язкове розширення для токенізованих сховищ, які використовують ERC-20, пропонуючи базовий функціонал для внесення депозитів, виведення токенів та зчитування балансів.

**Роль ERC-4626 у дохідних сховищах**

Ринки кредитування, агрегатори та токени, що за своєю суттю приносять відсотки, допомагають користувачам знаходити найкращу дохідність для своїх криптотокенів шляхом виконання різних стратегій. Ці стратегії виконуються з невеликими варіаціями, що може призводити до помилок або марної витрати ресурсів на розробку.

ERC-4626 у дохідних сховищах зменшить зусилля на інтеграцію та відкриє доступ до дохідності в різних програмах з незначними спеціалізованими зусиллями від розробників, створюючи більш послідовні та надійні шаблони реалізації.

Токен ERC-4626 повністю описаний в [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Асинхронне розширення сховища (ERC-7540)**

ERC-4626 оптимізовано для атомарних депозитів і погашень до певного ліміту. Якщо ліміт досягнуто, нові депозити чи погашення не можуть бути подані. Це обмеження погано працює для будь-якої системи смарт-контрактів з асинхронними діями або затримками як необхідною умовою для взаємодії зі Сховищем (наприклад, протоколи активів реального світу, протоколи недостатньо забезпеченого кредитування, протоколи міжмережевого кредитування, ліквідні токени для стейкінгу або модулі безпеки страхування).

ERC-7540 розширює корисність сховищ ERC-4626 для асинхронних випадків використання. Існуючий інтерфейс Сховища (`deposit`/`withdraw`/`mint`/`redeem`) повністю використовується для обробки асинхронних Запитів.

Розширення ERC-7540 повністю описано в [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Розширення сховища для кількох активів (ERC-7575)**

Одним із варіантів використання, який не підтримується ERC-4626, є Сховища з кількома активами або точками входу, як-от токени постачальника ліквідності (LP). Вони, як правило, громіздкі або невідповідні через вимогу, що сам ERC-4626 має бути ERC-20.

ERC-7575 додає підтримку Сховищ з кількома активами, виносячи реалізацію токена ERC-20 за межі реалізації ERC-4626.

Розширення ERC-7575 повністю описано в [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Передумови {#prerequisites}

Щоб краще зрозуміти цю сторінку, радимо спершу прочитати про [стандарти токенів](/developers/docs/standards/tokens/) та [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Функції та особливості ERC-4626: {#body}

### Методи {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Ця функція повертає адресу базового токена, що використовується для сховища для обліку, внесення та виведення коштів.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Ця функція повертає загальну суму базових активів, що зберігаються у сховищі.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Ця функція повертає кількість `shares`, яку сховище обміняє на надану кількість `assets`.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Ця функція повертає кількість `assets`, яку сховище обміняє на надану кількість `shares`.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Ця функція повертає максимальну кількість базових активів, яку можна внести за один виклик [`deposit`](#deposit), при цьому частки карбуються для `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Ця функція дозволяє користувачам симулювати ефекти свого депозиту в поточному блоці.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Ця функція вносить `assets` базових токенів у сховище і надає право власності на `shares` для `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Ця функція повертає максимальну кількість часток, яку можна викарбувати за один виклик [`mint`](#mint), при цьому частки карбуються для `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Ця функція дозволяє користувачам симулювати ефекти свого карбування в поточному блоці.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Ця функція карбує рівно `shares` часток сховища для `receiver`, вносячи `assets` базових токенів.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Ця функція повертає максимальну кількість базових активів, яку можна вивести з балансу `owner` за один виклик [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Ця функція дозволяє користувачам симулювати ефекти свого виведення коштів у поточному блоці.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Ця функція спалює `shares` з `owner` і надсилає рівно `assets` токенів зі сховища до `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Ця функція повертає максимальну кількість часток, яку можна погасити з балансу `owner` через виклик [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Ця функція дозволяє користувачам симулювати ефекти свого погашення в поточному блоці.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Ця функція погашає певну кількість `shares` від `owner` і надсилає `assets` базового токена зі сховища до `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Повертає загальну кількість непогашених часток сховища, що перебувають в обігу.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Повертає загальну кількість часток сховища, яку наразі має `owner`.

### Карта інтерфейсу {#mapOfTheInterface}

![Карта інтерфейсу ERC-4626](./map-of-erc-4626.png)

### Події {#events}

#### Подія Deposit

**ПОВИННА** генеруватися, коли токени вносяться у сховище за допомогою методів [`mint`](#mint) та [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Де `sender` – це користувач, який обміняв `assets` на `shares` і передав ці `shares` до `owner`.

#### Подія Withdraw

**ПОВИННА** генеруватися, коли частки виводяться зі сховища вкладником за допомогою методів [`redeem`](#redeem) або [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Де `sender` – це користувач, який ініціював виведення коштів і обміняв `shares`, що належать `owner`, на `assets`. `receiver` – це користувач, який отримав виведені `assets`.

## Для подальшого читання {#further-reading}

- [EIP-4626: Стандарт токенізованого сховища](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: репозиторій на GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
