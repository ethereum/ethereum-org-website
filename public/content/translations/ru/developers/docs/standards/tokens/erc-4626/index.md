---
title: "Стандарт токенизированного хранилища ERC-4626"
description: "Стандарт для доходных хранилищ."
lang: ru
---

## Введение {#introduction}

ERC-4626 — это стандарт для оптимизации и унификации технических параметров доходных хранилищ. Он предоставляет стандартный API для токенизированных доходных хранилищ, которые представляют собой доли одного базового токена ERC-20. ERC-4626 также описывает дополнительное расширение для токенизированных хранилищ, использующих ERC-20, предлагая базовую функциональность для внесения, вывода токенов и чтения балансов.

**Роль ERC-4626 в доходных хранилищах**

Рынки кредитования, агрегаторы и токены, изначально приносящие процентный доход, помогают пользователям находить лучшую доходность для их криптовалютных токенов путем выполнения различных стратегий. Эти стратегии реализуются с небольшими вариациями, что может приводить к ошибкам или лишним тратам ресурсов на разработку.

Использование ERC-4626 в доходных хранилищах снизит усилия по интеграции и откроет доступ к доходности в различных приложениях с минимальными специализированными усилиями со стороны разработчиков за счет создания более согласованных и надежных шаблонов реализации.

Токен ERC-4626 полностью описан в [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Асинхронное расширение хранилища (ERC-7540)**

ERC-4626 оптимизирован для атомарных внесений и погашений до определенного лимита. Если лимит достигнут, новые внесения или погашения не могут быть отправлены. Это ограничение плохо работает для любой системы смарт-контрактов с асинхронными действиями или задержками в качестве обязательного условия для взаимодействия с хранилищем (например, протоколы активов реального мира, протоколы кредитования с недостаточным обеспечением, протоколы кроссчейн-кредитования, токены ликвидного стейкинга (LST) или страховые модули безопасности).

ERC-7540 расширяет полезность хранилищ ERC-4626 для асинхронных сценариев использования. Существующий интерфейс хранилища (`deposit`/`withdraw`/`mint`/`redeem`) полностью используется для того, чтобы востребовать асинхронные запросы.

Расширение ERC-7540 полностью описано в [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Расширение хранилища для нескольких активов (ERC-7575)**

Одним из недостающих сценариев использования, который не поддерживается ERC-4626, являются хранилища, имеющие несколько активов или точек входа, такие как токены поставщика ликвидности (LP). Обычно они являются громоздкими или несовместимыми из-за требования к ERC-4626 самому быть токеном ERC-20.

ERC-7575 добавляет поддержку хранилищ с несколькими активами путем вынесения реализации токена ERC-20 за пределы реализации ERC-4626.

Расширение ERC-7575 полностью описано в [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Предварительные требования {#prerequisites}

Для лучшего понимания этой страницы мы рекомендуем сначала прочитать про [стандарты токенов](/developers/docs/standards/tokens/) и [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Функции и особенности ERC-4626: {#body}

### Методы {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Эта функция возвращает адрес базового токена, используемого для хранилища в целях учета, внесения и вывода.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Эта функция возвращает общую сумму базовых активов, удерживаемых хранилищем.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Эта функция возвращает количество `shares`, которое хранилище обменяло бы на предоставленное количество `assets`.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Эта функция возвращает количество `assets`, которое хранилище обменяло бы на предоставленное количество `shares`.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Эта функция возвращает максимальное количество базовых активов, которое может быть внесено за один вызов [`deposit`](#deposit), с долями, отчеканенными для `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Эта функция позволяет пользователям смоделировать результаты их внесения на текущем блоке.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Эта функция вносит `assets` базовых токенов в хранилище и предоставляет право собственности на `shares` для `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Эта функция возвращает максимальное количество долей, которое может быть отчеканено за один вызов [`mint`](#mint), с долями, отчеканенными для `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Эта функция позволяет пользователям смоделировать результаты их чеканки на текущем блоке.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Эта функция чеканит ровно `shares` долей хранилища для `receiver` путем внесения `assets` базовых токенов.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Эта функция возвращает максимальное количество базовых активов, которое может быть выведено с баланса `owner` за один вызов [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Эта функция позволяет пользователям смоделировать результаты их вывода на текущем блоке.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Эта функция сжигает `shares` у `owner` и отправляет ровно `assets` токенов из хранилища к `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Эта функция возвращает максимальное количество долей, которое может быть погашено с баланса `owner` через вызов [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Эта функция позволяет пользователям смоделировать результаты их погашения на текущем блоке.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Эта функция погашает определенное количество `shares` у `owner` и отправляет `assets` базовых токенов из хранилища к `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Возвращает общее количество непогашенных долей хранилища в обращении.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Возвращает общее количество долей хранилища, которое в настоящее время имеет `owner`.

### Карта интерфейса {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### События {#events}

#### Событие Deposit {#deposit-event}

**ДОЛЖНО** генерироваться, когда токены вносятся в хранилище через методы [`mint`](#mint) и [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Где `sender` — это пользователь, который обменял `assets` на `shares` и перевел эти `shares` к `owner`.

#### Событие Withdraw {#withdraw-event}

**ДОЛЖНО** генерироваться, когда доли выводятся из хранилища вкладчиком в методах [`redeem`](#redeem) или [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Где `sender` — это пользователь, который инициировал вывод и обменял `shares`, принадлежащие `owner`, на `assets`. `receiver` — это пользователь, который получил выведенные `assets`.

## Дополнительная литература {#further-reading}

- [EIP-4626: Стандарт токенизированного хранилища](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Репозиторий на GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)