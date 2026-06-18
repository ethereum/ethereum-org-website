---
title: Estándar multitoken ERC-1155
description: Aprenda sobre ERC-1155, un estándar multitoken que combina tokens fungibles y no fungibles en un solo contrato.
lang: es
---

## Introducción {#introduction}

Una interfaz estándar para contratos que gestionan múltiples tipos de tokens. Un único contrato implementado puede incluir cualquier combinación de tokens fungibles, tokens no fungibles u otras configuraciones (por ejemplo, tokens semifungibles).

**¿Qué significa estándar multitoken?**

La idea es simple y busca crear una interfaz de contrato inteligente que pueda representar y controlar cualquier cantidad de tipos de tokens fungibles y no fungibles. De esta manera, el token ERC-1155 puede realizar las mismas funciones que un token [ERC-20](/developers/docs/standards/tokens/erc-20/) y [ERC-721](/developers/docs/standards/tokens/erc-721/), e incluso ambos al mismo tiempo. Mejora la funcionalidad de los estándares ERC-20 y ERC-721, haciéndolo más eficiente y corrigiendo errores de implementación evidentes.

El token ERC-1155 se describe completamente en el [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que primero lea sobre los [estándares de tokens](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) y [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funciones y características de ERC-1155: {#body}

- [Transferencia por lotes](#batch-transfers): transfiere múltiples activos en una sola llamada.
- [Saldo por lotes](#batch-balance): obtiene los saldos de múltiples activos en una sola llamada.
- [Aprobación por lotes](#batch-approval): aprueba todos los tokens para una dirección.
- [Hooks](#receive-hook): hook para recibir tokens.
- [Soporte para NFT](#nft-support): si el suministro es solo 1, se trata como un NFT.
- [Reglas de transferencia segura](#safe-transfer-rule): conjunto de reglas para una transferencia segura.

### Transferencias por lotes {#batch-transfers}

La transferencia por lotes funciona de manera muy similar a las transferencias regulares de ERC-20. Veamos la función `transferFrom` regular de ERC-20:

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

La única diferencia en ERC-1155 es que pasamos los valores como una matriz (array) y también pasamos una matriz de identificadores (ids). Por ejemplo, dados `ids=[3, 6, 13]` y `values=[100, 200, 5]`, las transferencias resultantes serán:

1. Transferir 100 tokens con el id 3 de `_from` a `_to`.
2. Transferir 200 tokens con el id 6 de `_from` a `_to`.
3. Transferir 5 tokens con el id 13 de `_from` a `_to`.

En ERC-1155 solo tenemos `transferFrom`, no hay `transfer`. Para usarlo como un `transfer` regular, simplemente establezca la dirección de origen (from) a la dirección que está llamando a la función.

### Saldo por lotes {#batch-balance}

La respectiva llamada `balanceOf` de ERC-20 también tiene su función asociada con soporte por lotes. Como recordatorio, esta es la versión de ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Aún más simple para la llamada de saldo, podemos recuperar múltiples saldos en una sola llamada. Pasamos la matriz de propietarios, seguida de la matriz de identificadores de tokens.

Por ejemplo, dados `_ids=[3, 6, 13]` y `_owners=[0xbeef..., 0x1337..., 0x1111...]`, el valor de retorno será:

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

La lectura del estado actual se puede hacer a través de `isApprovedForAll`. Como puede ver, es una operación de todo o nada. No puede definir cuántos tokens aprobar ni siquiera qué clase de token.

Esto está diseñado intencionalmente teniendo en cuenta la simplicidad. Solo puede aprobar todo para una dirección.

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

Dado el soporte de [EIP-165](https://eips.ethereum.org/EIPS/eip-165), ERC-1155 admite hooks de recepción solo para contratos inteligentes. La función del hook debe devolver un valor mágico predefinido de bytes4 que se da como:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Cuando el contrato receptor devuelve este valor, se asume que el contrato acepta la transferencia y sabe cómo manejar los tokens ERC-1155. ¡Genial, no más tokens atascados en un contrato!

### Soporte para NFT {#nft-support}

Cuando el suministro es solo uno, el token es esencialmente un token no fungible (NFT). Y como es estándar para ERC-721, puede definir una URL de metadatos. La URL puede ser leída y modificada por los clientes, consulte [aquí](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Regla de transferencia segura {#safe-transfer-rule}

Ya hemos mencionado algunas reglas de transferencia segura en las explicaciones anteriores. Pero veamos la más importante de las reglas:

1. El llamador debe estar aprobado para gastar los tokens de la dirección `_from` o el llamador debe ser igual a `_from`.
2. La llamada de transferencia debe revertir si:
   1. La dirección `_to` es 0.
   2. La longitud de `_ids` no es la misma que la longitud de `_values`.
   3. Cualquiera de los saldos de los titulares para los tokens en `_ids` es menor que las cantidades respectivas en `_values` enviadas al destinatario.
   4. Ocurre cualquier otro error.

_Nota_: Todas las funciones por lotes, incluido el hook, también existen como versiones sin lotes. Esto se hace por eficiencia de gas, considerando que transferir solo un activo probablemente seguirá siendo la forma más utilizada. Las hemos omitido por simplicidad en las explicaciones, incluidas las reglas de transferencia segura. Los nombres son idénticos, solo hay que eliminar la palabra 'Batch'.

## Más información {#further-reading}

- [EIP-1155: Estándar multitoken](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Documentación de OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repositorio de GitHub](https://github.com/enjin/erc-1155)
- [API de NFT de Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)