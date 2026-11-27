---
title: "Estándar de bóveda tokenizada asíncrona ERC-7540"
description: "Una extensión de ERC-4626 que añade flujos asíncronos de depósito y canje para bóvedas tokenizadas."
lang: es
---

## Introducción {#introduction}

ERC-7540 extiende el [Estándar de bóveda tokenizada ERC-4626](/developers/docs/standards/tokens/erc-4626/) al añadir soporte para flujos asíncronos de depósito y canje. Introduce un patrón de solicitar y luego reclamar: los usuarios primero envían una solicitud (entregando sus activos o acciones a la bóveda), y luego reclaman el resultado después de que la bóveda lo haya procesado.

Esto es necesario cuando una bóveda no puede liquidarse instantáneamente en una sola transacción, por ejemplo:

- Protocolos de activos del mundo real (RWA) como tesorerías tokenizadas, crédito privado y otros activos con ciclos de liquidación T+1 o T+2
- Préstamos subcolateralizados donde las evaluaciones de crédito ocurren fuera de la cadena
- Estrategias de bóveda intercadena donde el uso de puentes introduce retrasos
- Tokens de staking líquido con períodos de desvinculación

Las bóvedas pueden elegir ser asíncronas solo en los depósitos, solo en los canjes, o en ambos. Esta flexibilidad permite a los desarrolladores de bóvedas añadir flujos asíncronos solo donde la estrategia subyacente lo requiera, mientras mantienen el otro lado síncrono.

## Requisitos previos {#prerequisites}

Para entender mejor esta página, le recomendamos que primero lea sobre los [estándares de tokens](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) y [ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 frente a ERC-7540 {#comparison}

En ERC-4626, un depósito se liquida de forma atómica: el inversor envía activos y recibe acciones a cambio en una sola transacción.

<VaultDepositDiagram />

ERC-7540 divide esto en dos pasos. El inversor primero llama a `requestDeposit()`, lo que transfiere sus activos a la bóveda, y luego espera a que la bóveda procese la solicitud. Cómo y cuándo sucede eso depende de la bóveda, por ejemplo, cuando se completa una liquidación fuera de la cadena. Una vez cumplida, el inversor llama a `deposit()` para reclamar sus acciones. El tipo de cambio no se fija en el momento de la solicitud: la bóveda lo establece, típicamente cuando cumple la solicitud, por lo que las acciones recibidas pueden diferir de lo que devolvió `convertToShares()` cuando se hizo la solicitud.

<AsyncVaultDiagram />

El flujo de canje funciona de la misma manera: `requestRedeem()` toma las acciones del inversor, y una vez cumplida, el inversor llama a `redeem()` para reclamar los activos.

## Funciones y características de ERC-7540 {#body}

ERC-7540 hereda la interfaz completa de ERC-4626 pero reutiliza `deposit`/`mint`/`withdraw`/`redeem` como funciones de reclamo. Las nuevas funciones `requestDeposit` y `requestRedeem` manejan el paso de solicitud inicial.

Cada solicitud pasa por tres estados: pendiente (enviada, esperando procesamiento), reclamable (cumplida y con precio fijado), y reclamada (el inversor ha recogido sus acciones o activos). Una bóveda puede hacer que una solicitud sea reclamable inmediatamente, omitiendo el estado pendiente, pero reclamar siempre es una llamada separada. El estándar no define ningún evento para cuando una solicitud se vuelve reclamable.

<VaultRequestDiagram />

### Flujo de solicitud de depósito {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Transfiere `assets` desde `owner` hacia la bóveda y envía una solicitud de depósito. La dirección `controller` recibe el control de la solicitud. Devuelve un `requestId` que identifica el lote de la solicitud.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Devuelve la cantidad de `assets` en una solicitud de depósito pendiente (aún no reclamable) para el `controller` y `requestId` dados.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Devuelve la cantidad de `assets` en una solicitud de depósito reclamable (cumplida pero aún no reclamada) para el `controller` y `requestId` dados.

#### Reclamar depósitos {#claiming-deposits}

Una vez que una solicitud de depósito se vuelve reclamable, el usuario llama a la función estándar de ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) o [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) para reclamar sus acciones. En ERC-7540, estas funciones ya no transfieren activos (eso ya ocurrió en el momento de la solicitud). Solo acuñan acciones para el receptor.

### Flujo de solicitud de canje {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Toma el control de `shares` de `owner` y envía una solicitud de canje. La bóveda puede retener las acciones hasta que se reclame la solicitud o quemarlas de inmediato. La dirección `controller` recibe el control de la solicitud.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Devuelve la cantidad de `shares` en una solicitud de canje pendiente para el `controller` y `requestId` dados.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Devuelve la cantidad de `shares` en una solicitud de canje reclamable para el `controller` y `requestId` dados.

#### Reclamar canjes {#claiming-redemptions}

Una vez que una solicitud de canje se vuelve reclamable, el usuario llama a la función estándar de ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) o [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) para reclamar sus activos.

### Gestión de operadores {#operator-management}

ERC-7540 incluye un patrón de operador (de [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)) que permite a terceros gestionar solicitudes en nombre de un usuario.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Aprueba o revoca a `operator` para actuar en nombre de `msg.sender` para solicitudes de depósito/canje y reclamos.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Devuelve si `operator` está aprobado para actuar en nombre de `controller`.

### ID de solicitud {#request-ids}

Los ID de solicitud diferencian entre distintos lotes de solicitudes. Todas las solicitudes que comparten el mismo `requestId` son fungibles: transicionan entre estados juntas y reciben el mismo tipo de cambio.

Cuando una bóveda devuelve `requestId = 0` para todas las solicitudes, solo la dirección `controller` diferencia el estado de la solicitud. Múltiples solicitudes del mismo controlador se agregan.

### Eventos {#events}

#### Evento DepositRequest {#depositrequest-event}

DEBE emitirse cuando se envía una solicitud de depósito a través de [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### Evento RedeemRequest {#redeemrequest-event}

DEBE emitirse cuando se envía una solicitud de canje a través de [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### Evento OperatorSet {#operatorset-event}

DEBE emitirse cuando un operador es aprobado o revocado a través de [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Funciones de vista previa {#preview-functions}

Las funciones de vista previa deben revertir solo para los flujos que son asíncronos, porque el tipo de cambio no se conoce hasta que se cumple la solicitud. En una bóveda de depósito asíncrono, `previewDeposit` y `previewMint` DEBEN revertir, mientras que `previewRedeem` y `previewWithdraw` siguen funcionando como en ERC-4626 (y viceversa para una bóveda de canje asíncrono). Esta es una diferencia de comportamiento clave con respecto a ERC-4626.

## Lecturas adicionales {#further-reading}

- [EIP-7540: Bóvedas tokenizadas asíncronas ERC-4626](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Estándar de bóveda tokenizada](https://eips.ethereum.org/EIPS/eip-4626)
- [Implementación de ERC-7540 de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)
