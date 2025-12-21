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

El token ERC-4626 se describe en su totalidad en [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Extensión de bóvedas asíncronas (ERC-7540)**

ERC-4626 está optimizado para depósitos y reembolsos atómicos hasta cierto límite. Si se alcanza el límite, no se podrán enviar nuevos depósitos ni reembolsos. Esta limitación no funciona bien para ningún sistema de contrato inteligente con acciones asíncronas o retrasos como prerrequisito para interactuar con la Bóveda (p. ej., protocolos de activos del mundo real, protocolos de préstamos subcolateralizados, protocolos de préstamos entre cadenas, tokens de staking líquido o módulos de seguridad de seguros).

ERC-7540 amplía la utilidad de las bóvedas ERC-4626 para casos de uso asíncronos. La interfaz de la bóveda existente (`deposit`/`withdraw`/`mint`/`redeem`) se utiliza en su totalidad para reclamar solicitudes asíncronas.

La extensión ERC-7540 se describe en su totalidad en [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Extensión de bóveda multiactivos (ERC-7575)**

Un caso de uso faltante que no es compatible con ERC-4626 son las bóvedas que tienen múltiples activos o puntos de entrada, como los tókenes de proveedores de liquidez (LP). Estos suelen ser difíciles de manejar o no cumplen con los requisitos, debido a la exigencia de que ERC-4626 sea un ERC-20.

ERC-7575 agrega soporte para bóvedas con múltiples activos al externalizar la implementación del token ERC-20 de la implementación de ERC-4626.

La extensión ERC-7575 se describe en su totalidad en [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que primero lea sobre los [estándares de tokens](/developers/docs/standards/tokens/) y [ERC-20](/developers/docs/standards/tokens/erc-20/).

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

Esta función devuelve la cantidad de `shares` que la bóveda intercambiaría por la cantidad de `assets` proporcionada.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Esta función devuelve la cantidad de `assets` que la bóveda intercambiaría por la cantidad de `shares` proporcionada.

#### maxDeposit {#maxdeposit}

```solidity
función maxDeposit(receptor de dirección) retornos de vista pública (uint256 maxAssets)
```

Esta función devuelve la cantidad máxima de activos subyacentes que se pueden depositar en una única llamada a [`deposit`](#deposit), con los shares acuñados para el `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
vista previa de la función Depósito (activos uint256) rendimientos de vista pública (acciones uint256)
```

Esta función permite a los usuarios simular los efectos de su depósito en el bloque actual.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Esta función deposita `assets` de tokens subyacentes en la bóveda y otorga la propiedad de `shares` al `receiver`.

#### maxMint {#maxmint}

```solidity
función maxMint (receptor de dirección) devoluciones de vista pública (uint256 maxShares)
```

Esta función devuelve la cantidad máxima de shares que se pueden acuñar en una única llamada a [`mint`](#mint), con los shares acuñados para el `receiver`.

#### previewMint {#previewmint}

```solidity
vista previa de la funciónMint(uint256 acciones) rendimientos de la vista pública (activos uint256)
```

Esta función permite a los usuarios simular los efectos de su minteo en el bloque actual.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Esta función acuña exactamente `shares` de la bóveda para el `receiver` depositando `assets` de tokens subyacentes.

#### maxWithdraw {#maxwithdraw}

```solidity
función maxWithdraw (propietario de la dirección) devuelve la vista pública (uint256 maxAssets)
```

Esta función devuelve la cantidad máxima de activos subyacentes que se pueden retirar del saldo del `owner` con una única llamada a [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
vista previa de la funciónWithdraw(uint256 activos) rendimientos de vista pública (uint256 acciones)
```

Esta función permite a los usuarios simular los efectos de su retiro en el bloque actual.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Esta función quema `shares` del `owner` y envía exactamente la cantidad `assets` del token desde la bóveda al `receiver`.

#### maxRedeem {#maxredeem}

```solidity
función maxRedeem (propietario de la dirección) retornos de vista pública (uint256 maxShares)
```

Esta función devuelve la cantidad máxima de shares que se pueden canjear del saldo del `owner` a través de una llamada a [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
vista previa de la funciónRedeem (uint256 acciones) rendimientos de vista pública (activos uint256)
```

Esta función permite a los usuarios simular el efecto de su canjeo en el bloque actual.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Esta función canjea un número específico de `shares` del `owner` y envía `assets` del token subyacente desde la bóveda al `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Devuelve el número total de acciones no canjeadas de la bóveda en circulación.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Devuelve la cantidad total de shares de la bóveda que el `owner` tiene actualmente.

### Mapa de la interfaz {#mapOfTheInterface}

![Mapa de la interfaz ERC-4626](./map-of-erc-4626.png)

### Eventos {#events}

#### Evento de depósito

**DEBE** emitirse cuando se depositan tokens en la bóveda a través de los métodos [`mint`](#mint) y [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Donde `sender` es el usuario que intercambió `assets` por `shares`, y transfirió esos `shares` al `owner`.

#### Evento de retiro

**DEBE** emitirse cuando un depositante retira shares de la bóveda en los métodos [`redeem`](#redeem) o [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Donde `sender` es el usuario que activó el retiro e intercambió `shares`, propiedad del `owner`, por `assets`. `receiver` es el usuario que recibió los `assets` retirados.

## Lecturas adicionales {#further-reading}

- [EIP-4626: Estándar de bóveda tokenizada](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repositorio de GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
