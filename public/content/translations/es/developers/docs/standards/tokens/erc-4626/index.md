---
title: "Estándar de bóveda tokenizada ERC-4626"
description: "Un estándar para bóvedas que generan rendimiento."
lang: es
---

## Introducción {#introduction}

ERC-4626 es un estándar para optimizar y unificar los parámetros técnicos de las bóvedas que generan rendimiento. Proporciona una API estándar para bóvedas tokenizadas que generan rendimiento y que representan participaciones de un único token ERC-20 subyacente. ERC-4626 también describe una extensión opcional para bóvedas tokenizadas que utilizan ERC-20, ofreciendo una funcionalidad básica para depositar, retirar tokens y leer saldos.

**El papel de ERC-4626 en las bóvedas que generan rendimiento**

Los mercados de préstamos, los agregadores y los tokens que intrínsecamente generan intereses ayudan a los usuarios a encontrar el mejor rendimiento para sus tokens cripto mediante la ejecución de diferentes estrategias. Estas estrategias se realizan con ligeras variaciones, lo que podría ser propenso a errores o desperdiciar recursos de desarrollo.

ERC-4626 en las bóvedas que generan rendimiento reducirá el esfuerzo de integración y desbloqueará el acceso al rendimiento en varias aplicaciones con poco esfuerzo especializado por parte de los desarrolladores al crear patrones de implementación más consistentes y robustos.

El token ERC-4626 se describe completamente en [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Extensión de bóveda asíncrona (ERC-7540)**

ERC-4626 está optimizado para depósitos y canjes atómicos hasta un límite. Si se alcanza el límite, no se pueden enviar nuevos depósitos ni canjes. Esta limitación no funciona bien para ningún sistema de contrato inteligente con acciones asíncronas o retrasos como requisito previo para interactuar con la bóveda (por ejemplo, protocolos de activos del mundo real, protocolos de préstamos subcolateralizados, protocolos de préstamos intercadena, tokens de staking líquido (LST) o módulos de seguridad de seguros).

ERC-7540 amplía la utilidad de las bóvedas ERC-4626 para casos de uso asíncronos. La interfaz de bóveda existente (`deposit`/`withdraw`/`mint`/`redeem`) se utiliza completamente para reclamar solicitudes asíncronas.

La extensión ERC-7540 se describe completamente en [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Extensión de bóveda multiactivo (ERC-7575)**

Un caso de uso faltante que no es compatible con ERC-4626 son las bóvedas que tienen múltiples activos o puntos de entrada, como los tokens de proveedor de liquidez (LP). Estos son generalmente difíciles de manejar o no cumplen con los requisitos debido a la exigencia de que ERC-4626 sea en sí mismo un ERC-20.

ERC-7575 añade soporte para bóvedas con múltiples activos al externalizar la implementación del token ERC-20 de la implementación de ERC-4626.

La extensión ERC-7575 se describe completamente en [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que primero lea sobre los [estándares de tokens](/developers/docs/standards/tokens/) y [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Funciones y características de ERC-4626: {#body}

### Métodos {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Esta función devuelve la dirección del token subyacente utilizado para la bóveda para la contabilidad, el depósito y el retiro.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Esta función devuelve la cantidad total de activos subyacentes que posee la bóveda.

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
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Esta función devuelve la cantidad máxima de activos subyacentes que se pueden depositar en una sola llamada a [`deposit`](#deposit), con las participaciones acuñadas para el `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Esta función permite a los usuarios simular los efectos de su depósito en el bloque actual.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Esta función deposita `assets` de tokens subyacentes en la bóveda y otorga la propiedad de `shares` a `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Esta función devuelve la cantidad máxima de participaciones que se pueden acuñar en una sola llamada a [`mint`](#mint), con las participaciones acuñadas para el `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Esta función permite a los usuarios simular los efectos de su acuñación en el bloque actual.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Esta función acuña exactamente `shares` participaciones de la bóveda para `receiver` depositando `assets` de tokens subyacentes.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Esta función devuelve la cantidad máxima de activos subyacentes que se pueden retirar del saldo de `owner` con una sola llamada a [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Esta función permite a los usuarios simular los efectos de su retiro en el bloque actual.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Esta función quema `shares` de `owner` y envía exactamente `assets` token de la bóveda a `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Esta función devuelve la cantidad máxima de participaciones que se pueden canjear del saldo de `owner` a través de una llamada a [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Esta función permite a los usuarios simular los efectos de su canje en el bloque actual.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Esta función canjea un número específico de `shares` de `owner` y envía `assets` del token subyacente de la bóveda a `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Devuelve el número total de participaciones de la bóveda no canjeadas en circulación.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Devuelve la cantidad total de participaciones de la bóveda que tiene actualmente `owner`.

### Mapa de la interfaz {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Eventos {#events}

#### Evento Deposit {#deposit-event}

**DEBE** emitirse cuando se depositan tokens en la bóveda a través de los métodos [`mint`](#mint) y [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Donde `sender` es el usuario que intercambió `assets` por `shares`, y transfirió esos `shares` a `owner`.

#### Evento Withdraw {#withdraw-event}

**DEBE** emitirse cuando un depositante retira participaciones de la bóveda en los métodos [`redeem`](#redeem) o [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Donde `sender` es el usuario que activó el retiro e intercambió `shares`, propiedad de `owner`, por `assets`. `receiver` es el usuario que recibió los `assets` retirados.

## Más información {#further-reading}

- [EIP-4626: Estándar de bóveda tokenizada](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repositorio en GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)