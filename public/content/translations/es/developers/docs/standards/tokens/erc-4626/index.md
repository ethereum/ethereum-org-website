---
title: Estándar de bóveda tokenizada ERC-4626
description: Un estándar para las bóvedas de rendimiento.
lang: es
---

## Introducción {#introduction}

ERC-4626 es un estándar para optimizar y unificar los parámetros técnicos de las bóvedas que otorgan rendimiento. Proporciona una API estándar para las bóvedas de rendimiento tokenizadas que representan acciones de un único token ERC-20 subyacente. ERC-4626 también esboza una extensión opcional para las bóvedas tokenizadas que usan ERC-20, ofreciendo funcionalidad básica para depósitos, retiros de tokens y lectura de saldos.

**El papel del ERC-4626 en las bóvedas de rendimiento**

Los mercados de préstamos, los agregadores y los tokens que intrínsecamente dan interés ayudan a los usuarios a encontrar el mejor rendimiento en sus tokens criptográficos mediante la ejecución de diferentes estrategias. Estas estrategias se llevan a cabo con ligeras variaciones, que podrían ser propensas a errores o desperdiciar recursos de desarrollo.

ERC-4626 en bóvedas de rendimiento reducirá el esfuerzo de integración y desbloqueará el acceso al rendimiento en varias aplicaciones con poco esfuerzo especializado de los desarrolladores gracias a la creación de patrones de implementación más consistentes y robustos.

El token ERC-4626 se describe en detalle en [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

## Prerrequisitos {#prerequisites}

Para comprender mejor esta página, recomendamos leer primero sobre [estándares de token](/developers/docs/standards/tokens/) y [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Funciones y características de ERC-4626: {#body}

### Métodos {#methods}

#### asset {#asset}

```solidity
función asset() retornos de vista pública (dirección assetTokenAddress)
```

Esta función devuelve la dirección del token subyacente utilizado en la bóveda para contabilidad, depósito y retiro.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Esta función devuelve la cantidad total de activos subyacentes que se poseen en la bóveda.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Esta función devuelve la cantidad de `shares` (acciones) que serían intercambiadas por la bóveda por la cantidad de `assets` (activos) proporcionados.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Esta función devuelve la cantidad de `assets` que serían intercambiados por la bóveda por la cantidad de `shares` proporcionadas.

#### maxDeposit {#maxdeposit}

```solidity
función maxDeposit(receptor de dirección) retornos de vista pública (uint256 maxAssets)
```

Esta función devuelve la cantidad máxima de activos subyacentes que pueden depositarse en una sola llamada de depósito ([`deposit`](#deposit)) por parte del `receiver` (receptor).

#### previewDeposit {#previewdeposit}

```solidity
vista previa de la función Depósito (activos uint256) rendimientos de vista pública (acciones uint256)
```

Esta función permite a los usuarios simular los efectos de su depósito en el bloque actual.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Esta función deposita `assets` de los tokens subyacentes en la bóveda y otorga la propiedad de acciones (`shares`) al receptor (`receiver`).

#### maxMint {#maxmint}

```solidity
función maxMint (receptor de dirección) devoluciones de vista pública (uint256 maxShares)
```

Esta función devuelve la cantidad máxima de acciones que pueden mintearse en una sola llamada de [`mint`](#mint) (minteo) por parte del receptor (`receiver`).

#### previewMint {#previewmint}

```solidity
vista previa de la funciónMint(uint256 acciones) rendimientos de la vista pública (activos uint256)
```

Esta función permite a los usuarios simular los efectos de su minteo en el bloque actual.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Esta función mintea exactamente `shares` acciones de la bóveda al `receiver` depositando `assets` de los tokens subyacentes.

#### maxWithdraw {#maxwithdraw}

```solidity
función maxWithdraw (propietario de la dirección) devuelve la vista pública (uint256 maxAssets)
```

Esta función devuelve la cantidad máxima de activos subyacentes que se pueden retirar del saldo del propietario (`owner`) con una única llamada a [`withdraw`](#withdraw) (retiro).

#### previewWithdraw {#previewwithdraw}

```solidity
vista previa de la funciónWithdraw(uint256 activos) rendimientos de vista pública (uint256 acciones)
```

Esta función permite a los usuarios simular los efectos de su retiro en el bloque actual.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Esta función quema `shares` del `owner` y envía exactamente `assets` token de la bóveda al `receiver`.

#### maxRedeem {#maxredeem}

```solidity
función maxRedeem (propietario de la dirección) retornos de vista pública (uint256 maxShares)
```

Esta funcion retorna la cantidad máxima de acciones que pueden ser reclamadas del saldo del `owner` a traves de una llamada a [`redeem`](#redeem) (canjeo o reclamo).

#### previewRedeem {#previewredeem}

```solidity
vista previa de la funciónRedeem (uint256 acciones) rendimientos de vista pública (activos uint256)
```

Esta función permite a los usuarios simular el efecto de su canjeo en el bloque actual.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Esta función canjea un número específico de `shares` del `owner` y envía `assets` del token subyacente de la bóveda al `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Devuelve el número total de acciones no canjeadas de la bóveda en circulación.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Devuelve la cantidad total de acciones de la bóveda que el `owner` tiene actualmente.

### Mapa de la interfaz {#mapOfTheInterface}

![Mapa de la interfaz ERC-4626](./map-of-erc-4626.png)

### Eventos {#events}

#### Evento de depósito

**DEBE** ser emitido cuando se depositan tokens en la bóveda mediante los métodos [`mint`](#mint) y [`deposit`](#deposit)

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Donde `sender` es el usuario que intercambió `assets` por `shares` y transfirió esas `shares` al `owner`.

#### Evento de retiro

**DEBE** ser emitido cuando un depositante retira acciones de la bóveda con los métodos [`redeem`](#redeem) o [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Donde `sender` es el usuario que desencadenó el retiro e intercambió `shares`, en posesión de `owner`, por `assets`. `receiver` es el usuario que recibió los `assets` retirados.

## Más información {#further-reading}

- [EIP-4626: estándar de bóveda tokenizada](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: repositorio de GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
