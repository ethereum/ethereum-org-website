---
title: "Estándar multitoken ERC-1155"
description: "Obtenga más información sobre el ERC-1155, un estándar de múltiples tokens que combina tokens fungibles y no fungibles en un único contrato."
lang: es
---

## Introducción {#introduction}

Una interfaz para contratos que administran múltiples tipos de tokens. Un único contrato desplegado puede incluir cualquier combinación de tokens fungibles, tokens no fungibles u otras configuraciones (p. ej., tokens semifungibles).

**¿Qué se entiende por estándar de múltiples tokens?**

La idea es simple y busca crear una interfaz de contrato inteligente que pueda representar y controlar cualquier cantidad y tipo de token fungible y no fungible. De este modo, el token ERC-1155 puede realizar las mismas funciones que un token [ERC-20](/developers/docs/standards/tokens/erc-20/) y un token [ERC-721](/developers/docs/standards/tokens/erc-721/), e incluso ambas al mismo tiempo. Mejora el funcionamiento de los estándares ERC-20 y ERC-721, haciéndolos más eficientes y corrigiendo errores obvios de implementación.

El token ERC-1155 se describe en su totalidad en el [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que primero lea sobre los [estándares de tokens](/developers/docs/standards/tokens/), el [ERC-20](/developers/docs/standards/tokens/erc-20/) y el [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funciones y características del ERC-1155: {#body}

- [Transferencia por lotes](#batch_transfers): transfiera múltiples activos en una sola llamada.
- [Saldo por lotes](#batch_balance): obtenga los saldos de múltiples activos en una sola llamada.
- [Aprobación por lotes](#batch_approval): apruebe todos los tokens para una dirección.
- [Hooks](#receive_hook): hook de recepción de tokens.
- [Compatibilidad con NFT](#nft_support): si el suministro es de solo 1, trátelo como un NFT.
- [Reglas de transferencia segura](#safe_transfer_rule): conjunto de reglas para una transferencia segura.

### Transferencias por lotes {#batch-transfers}

Las tranferencias en lote funcionan de manera muy similar a las transferencias regulares ERC-20. Echemos un vistazo a la función `transferFrom` del ERC-20 normal:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

La unica diferencia en ERC-1155 es que nosotros pasamos los valores en forma de array y tambien pasamos un array de ID. Por ejemplo, dados `ids=[3, 6, 13]` y `values=[100, 200, 5]`, las transferencias resultantes serán

1. Transferir 100 tokens con el id 3 de `_from` a `_to`.
2. Transferir 200 tokens con el id 6 de `_from` a `_to`.
3. Transferir 5 tokens con el id 13 de `_from` a `_to`.

En el ERC-1155 solo tenemos `transferFrom`, no `transfer`. Para utilizarla como una `transfer` normal, simplemente establezca la dirección de origen en la dirección que llama a la función.

### Saldo por lotes {#batch-balance}

La respectiva llamada `balanceOf` del ERC-20 también tiene su función homóloga con soporte para lotes. Como recordatorio, esta es la versión de ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Aún más simple para la llamada de saldo, podemos recuperar múltiples saldos en una sola llamada. Pasamos la matríz de propietarios, seguida de la matríz de identificadores de token.

Por ejemplo, dados `_ids=[3, 6, 13]` y `_owners=[0xbeef..., 0x1337..., 0x1111...]`, el valor de retorno será

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Aprobación por lotes {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Las aprobaciones son ligeramente diferentes a las de ERC-20. En lugar de aprobar cantidades específicas, se establece un operador como aprobado o no aprobado a través de `setApprovalForAll`.

La lectura del estado actual puede hacerse a través de `isApprovedForAll`. Como puede ver, es una operación de todo o nada. No puede definir cuántos tokens aprobar ni qué clase de token.

Esto se diseñó así intencionalmente pensando en la simplicidad. Solamente puede aprobar todo para una dirección.

### Hook de recepción {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Dado el soporte para [EIP-165](https://eips.ethereum.org/EIPS/eip-165), el ERC-1155 admite hooks de recepción solo para contratos inteligentes. La función hook debe devolver un valor mágico predefinido bytes4 que es dado como:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Cuando el contrato de recepción muestra este valor, asumimos que el contrato acepta la transferencia y sabe cómo manejar los tokens ERC-1155. ¡Genial, no más tokens estancados en un contrato!

### Compatibilidad con NFT {#nft-support}

Cuando el suministro es solo 1, el token es esencialmente un token no fungible (NFT). Y como es estándar para ERC-721, puede definir una URL de metadatos. La URL puede ser leída y modificada por los clientes, véase [aquí](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Regla de transferencia segura {#safe-transfer-rule}

Ya hemos hablado un poco acerca de algunas reglas de transferencia segura en explicaciones anteriores. Pero veamos las reglas más importantes:

1. Quien realiza la llamada debe tener la aprobación para gastar los tokens de la dirección `_from` o debe ser el mismo que `_from`.
2. La llamada de transferencia debe revertirse si
   1. La dirección `_to` es 0.
   2. la longitud de `_ids` no es la misma que la de `_values`.
   3. alguno de los saldos del(los) poseedor(es) para el(los) token(s) en `_ids` es inferior a la(s) cantidad(es) respectiva(s) en `_values` enviada(s) al destinatario.
   4. ocurre cualquier otro error.

_Nota_: todas las funciones por lotes, incluido el hook, también existen en versiones sin lotes. Esto se hace para la eficiencia del gas, considerando que la transferencia de un solo activo probablemente siga siendo la manera más comúnmente utilizada. Las hemos dejado de lado para mayor simplicidad en las explicaciones, incluidas las reglas de transferencia segura. Los nombres son identicos, solo quite el lote ("Batch").

## Lecturas adicionales {#further-reading}

- [EIP-1155: estándar de múltiples tokens](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Documentación de OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repositorio de GitHub](https://github.com/enjin/erc-1155)
- [API de NFT de Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)
