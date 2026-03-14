---
title: "Стандарт токенизированных хранилищ ERC-4626"
description: "Стандарт для доходных хранилищ."
lang: ru
---

## Введение {#introduction}

ERC-4626 - стандарт, разработанный для оптимизации и объединения технических параметров доходных хранилищ. Он предоставляет стандартный API для токенизированных доходных хранилищ, которые представляют собой доли одного базового токена ERC-20. ERC-4626 также описывает необязательное расширение для токенизированных хранилищ, использующих ERC-20, предлагая базовую функциональность для внесения депозита, вывода токенов и считывания балансов.

**Роль ERC-4626 в доходных хранилищах**

Рынки кредитования, агрегаторы и внутренне процентные токены помогают пользователям находить лучшую доходность на свои криптотокены путем выполнения различных стратегий. Эти стратегии выполняются с небольшими вариациями, что может приводить к ошибкам или тратить впустую ресурсы на разработку.

ERC-4626 в доходных хранилищах снизит трудозатраты на интеграцию и откроет доступ к доходности в различных приложениях с небольшими специальными усилиями со стороны разработчиков путем создания более последовательных и надежных шаблонов реализации.

Токен ERC-4626 полностью описан в [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Асинхронное расширение хранилища (ERC-7540)**

ERC-4626 оптимизирован для атомарных депозитов и погашений до определенного лимита. Если лимит достигнут, новые депозиты или погашения не могут быть отправлены. Это ограничение плохо работает для любой системы умных контрактов с асинхронными действиями или задержками в качестве необходимого условия для взаимодействия с Хранилищем (например, протоколы реальных активов, протоколы кредитования с недостаточным обеспечением, межсетевые протоколы кредитования, токены ликвидного стейкинга или модули страховой безопасности).

ERC-7540 расширяет полезность Хранилищ ERC-4626 для асинхронных сценариев использования. Существующий интерфейс Хранилища (`deposit`/`withdraw`/`mint`/`redeem`) полностью используется для получения асинхронных Запросов.

Расширение ERC-7540 полностью описано в [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Расширение хранилища с несколькими активами (ERC-7575)**

Один из недостающих вариантов использования, который не поддерживается ERC-4626, — это Хранилища, которые имеют несколько активов или точек входа, такие как токены поставщика ликвидности (LP). Они, как правило, громоздки или несовместимы из-за требования к самому ERC-4626 быть токеном ERC-20.

ERC-7575 добавляет поддержку Хранилищ с несколькими активами путем вынесения реализации токена ERC-20 за пределы реализации ERC-4626.

Расширение ERC-7575 полностью описано в [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Предварительные условия {#prerequisites}

Чтобы лучше понять эту страницу, мы рекомендуем вам сначала прочитать о [стандартах токенов](/developers/docs/standards/tokens/) и [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Функции и возможности ERC-4626: {#body}

### Методы {#methods}

#### актив {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Эта функция возвращает адрес базового токена, используемого хранилищем для учета, внесения депозитов и вывода средств.

#### всегоАктивов {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Эта функция возвращает общее количество базовых активов, хранящихся в хранилище.

#### конвертироватьВДОли {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Эта функция возвращает количество долей (`shares`), которое будет обменено хранилищем на предоставленное количество активов (`assets`).

#### конвертироватьВАктивы {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Эта функция возвращает количество активов (`assets`), которое будет обменено хранилищем на предоставленное количество долей (`shares`).

#### максДепозит {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Эта функция возвращает максимальное количество базовых активов, которое можно внести одним вызовом [`deposit`](#deposit), при этом доли выпускаются для получателя (`receiver`).

#### предпросмотрДепозита {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Эта функция позволяет пользователям симулировать результат своего депозита на текущем блоке.

#### депозит {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Эта функция вносит активы (`assets`) базовых токенов в хранилище и передает право собственности на доли (`shares`) получателю (`receiver`).

#### максМинт {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Эта функция возвращает максимальное количество долей, которое можно выпустить одним вызовом [`mint`](#mint), при этом доли выпускаются для получателя (`receiver`).

#### предпросмотрМинта {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Эта функция позволяет пользователям симулировать результат своего выпуска (минта) на текущем блоке.

#### минт {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Эта функция выпускает (минтит) ровно `shares` (долей) хранилища для получателя (`receiver`) путем внесения `assets` (активов) базовых токенов.

#### максВывод {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Эта функция возвращает максимальное количество базовых активов, которое можно вывести с баланса владельца (`owner`) одним вызовом [`withdraw`](#withdraw).

#### предпросмотрВывода {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Эта функция позволяет пользователям симулировать результат своего вывода на текущем блоке.

#### вывод {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Эта функция сжигает доли (`shares`) владельца (`owner`) и отправляет ровно `assets` (активов) токена из хранилища получателю (`receiver`).

#### максПогашение {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Эта функция возвращает максимальное количество долей, которое можно погасить с баланса владельца (`owner`) через вызов [`redeem`](#redeem).

#### предпросмотрПогашения {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Эта функция позволяет пользователям симулировать результат своего погашения на текущем блоке.

#### погашение {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Эта функция погашает определенное количество долей (`shares`) владельца (`owner`) и отправляет активы (`assets`) базового токена из хранилища получателю (`receiver`).

#### общееПредложение {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Возвращает общее количество непогашенных долей хранилища в обращении.

#### баланс {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Возвращает общее количество долей хранилища, которыми в настоящее время владеет `owner`.

### Карта интерфейса {#mapOfTheInterface}

![Карта интерфейса ERC-4626](./map-of-erc-4626.png)

### События {#events}

#### Событие Deposit

**ДОЛЖНО** генерироваться, когда токены вносятся в хранилище с помощью методов [`mint`](#mint) и [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Где `sender` — это пользователь, который обменял `assets` на `shares` и перевел эти `shares` владельцу (`owner`).

#### Событие Withdraw

**ДОЛЖНО** генерироваться, когда доли выводятся из хранилища вкладчиком с помощью методов [`redeem`](#redeem) или [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Где `sender` — это пользователь, который инициировал вывод и обменял `shares` (доли), принадлежащие `owner` (владельцу), на `assets` (активы). `receiver` — это пользователь, который получил выведенные `assets` (активы).

## Дополнительные материалы {#further-reading}

- [EIP-4626: Стандарт токенизированного хранилища](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: репозиторий на GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
