---
title: Стандарт токенізованого сховища ERC-4626
description: Стандарт для прибуткових сховищ.
lang: uk
---

## Вступ {#introduction}

ERC-4626 — це стандарт для оптимізації та уніфікації технічних параметрів прибуткових сховищ (yield-bearing vaults). Він надає стандартний API для токенізованих прибуткових сховищ, які представляють частки одного базового токена ERC-20. ERC-4626 також описує необов'язкове розширення для токенізованих сховищ, що використовують ERC-20, пропонуючи базову функціональність для внесення, виведення токенів та зчитування балансів.

**Роль ERC-4626 у прибуткових сховищах**

Ринки кредитування, агрегатори та токени, що за своєю природою приносять відсотки, допомагають користувачам знаходити найкращу прибутковість для їхніх криптотокенів шляхом виконання різних стратегій. Ці стратегії реалізуються з незначними варіаціями, що може призводити до помилок або марнотратства ресурсів розробників.

ERC-4626 у прибуткових сховищах знизить зусилля на інтеграцію та відкриє доступ до прибутковості в різних застосунках з мінімальними спеціалізованими зусиллями розробників завдяки створенню більш узгоджених і надійних шаблонів реалізації.

Токен ERC-4626 повністю описаний у [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Асинхронне розширення сховища (ERC-7540)**

ERC-4626 оптимізовано для атомарних депозитів та погашень до певної межі. Якщо межу досягнуто, нові депозити або погашення не можуть бути подані. Це обмеження погано працює для будь-якої системи смарт-контрактів з асинхронними діями або затримками як передумовою для взаємодії зі сховищем (наприклад, протоколи реальних активів, протоколи кредитування з недостатнім забезпеченням, протоколи кросчейн-кредитування, токени ліквідного стейкінгу або страхові модулі безпеки).

ERC-7540 розширює корисність сховищ ERC-4626 для асинхронних варіантів використання. Існуючий інтерфейс сховища (`deposit`/`withdraw`/`mint`/`redeem`) повністю використовується для затребування асинхронних запитів.

Розширення ERC-7540 повністю описано в [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Розширення мультивалютного сховища (ERC-7575)**

Одним із відсутніх варіантів використання, який не підтримується ERC-4626, є сховища, що мають кілька активів або точок входу, як-от токени постачальника ліквідності (LP). Зазвичай вони є громіздкими або не відповідають вимогам через те, що ERC-4626 сам по собі має бути ERC-20.

ERC-7575 додає підтримку сховищ із кількома активами шляхом винесення реалізації токена ERC-20 за межі реалізації ERC-4626.

Розширення ERC-7575 повністю описано в [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Передумови {#prerequisites}

Для кращого розуміння цієї сторінки ми рекомендуємо спочатку прочитати про [стандарти токенів](/developers/docs/standards/tokens/) та [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Функції та особливості ERC-4626: {#body}

### Методи {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Ця функція повертає адресу базового токена, який використовується для сховища для обліку, внесення та виведення.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Ця функція повертає загальну суму базових активів, що зберігаються у сховищі.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Ця функція повертає кількість `shares`, які сховище обміняло б на надану кількість `assets`.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Ця функція повертає кількість `assets`, які сховище обміняло б на надану кількість `shares`.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Ця функція повертає максимальну суму базових активів, яку можна внести за один виклик [`deposit`](#deposit), з частками, викарбуваними для `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Ця функція дозволяє користувачам симулювати наслідки їхнього депозиту на поточному блоці.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Ця функція вносить `assets` базових токенів у сховище та надає право власності на `shares` для `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Ця функція повертає максимальну кількість часток, які можна викарбувати за один виклик [`mint`](#mint), з частками, викарбуваними для `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Ця функція дозволяє користувачам симулювати наслідки їхнього карбування на поточному блоці.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Ця функція карбує рівно `shares` часток сховища для `receiver` шляхом внесення `assets` базових токенів.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Ця функція повертає максимальну суму базових активів, яку можна вивести з балансу `owner` за один виклик [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Ця функція дозволяє користувачам симулювати наслідки їхнього виведення на поточному блоці.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Ця функція спалює `shares` з `owner` і надсилає рівно `assets` токенів зі сховища до `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Ця функція повертає максимальну кількість часток, які можна погасити з балансу `owner` через виклик [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Ця функція дозволяє користувачам симулювати наслідки їхнього погашення на поточному блоці.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Ця функція погашає певну кількість `shares` з `owner` і надсилає `assets` базового токена зі сховища до `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Повертає загальну кількість непогашених часток сховища в обігу.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Повертає загальну кількість часток сховища, які наразі має `owner`.

### Карта інтерфейсу {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Події {#events}

#### Подія Deposit {#deposit-event}

**ПОВИННА** генеруватися, коли токени вносяться у сховище за допомогою методів [`mint`](#mint) та [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Де `sender` — це користувач, який обміняв `assets` на `shares` і переказав ці `shares` до `owner`.

#### Подія Withdraw {#withdraw-event}

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

Де `sender` — це користувач, який ініціював виведення та обміняв `shares`, що належать `owner`, на `assets`. `receiver` — це користувач, який отримав виведені `assets`.

## Додаткові матеріали {#further-reading}

- [EIP-4626: Стандарт токенізованого сховища](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Репозиторій на GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)