---
title: Estándar multitoken ERC-1155
description:
lang: es
---

## Introducción {#introduction}

Una interfaz para contratos que administran múltiples tipos de tokens. Un solo contrato implementado podría incluir cualquier combinación de tokens fungibles, tokens no fungibles u otras configuraciones (por ejemplo, tokens semifungibles).

**¿Qué se entiende por estándar multitoken?**

La idea es simple y busca crear una interfaz de contrato inteligente que pueda representar y controlar cualquier cantidad y tipo de token fungible y no fungible. De esta manera, los tokens ERC-1155 pueden hacer las mismas funciones que los tokens [ERC-20](/developers/docs/standards/tokens/erc-20/) y los tokens [ERC-721](/developers/docs/standards/tokens/erc-721/), e incluso ambas al mismo tiempo. Mejora el funcionamiento de los estándares ERC-20 y ERC-721, haciéndolos más eficientes y corrigiendo errores obvios de implementación.

El token ERC-1155 se describe completamente en [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Requisitos previos {#prerequisites}

Para una mejor comprensión de esta página, recomendamos que primero lea acerca de los [estándares de token](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) y [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Características y funciones de ERC-1155: {#body}

- [Transferencia en lotes](#batch_transfers): transfiera múltiples activos en una sola llamada.
- [Saldos en lote](#batch_balance): obtenga saldos de multiples activos en una sola llamada.
- [Aprobación en lote](#batch_approval): apruebe todos los tokens en una dirección.
- [Hooks](#recieve_hook): reciba hooks de tokens.
- [Compatibilidad con NFT](#nft_support): si el suministro solo es 1, trátelo como un NFT.
- [Reglas de transferencia segura](#safe_transfer_rule): conjunto de reglas para una transferencia segura.

### Transferencias en lote {#batch-transfers}

Las tranferencias en lote funcionan de manera muy similar a las transferencias regulares ERC-20. Veamos la funcion regular `transferFrom` ERC-20:

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

La unica diferencia en ERC-1155 es que nosotros pasamos los valores en forma de array y tambien pasamos un array de ID. Por ejemplo, en el caso de `ids=[3, 6, 13]` y `values=[100, 200, 5]`, la transferencia resultante será

1. Transferir 100 tokens con el ID 3 de `_from` a `_to`.
2. Transferir 200 tokens con el ID 6 de `_from` a `_to`.
3. Transferir 5 tokens con el ID 13 de `_from` a `_to`.

En ERC-1155 solo tenemos `transferFrom`, no `transfer`. Para usarlo como una `transferencia` normal, solo hay que poner en la dirección de origen la dirección que llama a la función.

### Saldos en lote {#batch-balance}

La respectiva llamada de ERC-20 `balanceOf` también tiene su función socia con soporte para lotes. Como recordatorio, esta es la versión de ERC-20:

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

Por ejemplo, para `_ids=[3, 6, 13]` y `_owners=[0xbeef..., 0x1337..., 0x1111...]`, el valor para mostrar será

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Aprobación en lotes {#batch-approval}

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

Las aprobaciones son ligeramente diferentes a las de ERC-20. En lugar de aprobar cantidades especificas, establece un operador en aprobado o no aprobado mediante `setApprovalForAll`.

La lectura del estado actual puede realizarse con `isApprovedForAll`. Como puede ver, es una operación de todo o nada. No puede definir cuántos tokens aprobar ni qué clase de token.

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

Dada la compatibilidad con [EIP-165](https://eips.ethereum.org/EIPS/eip-165), ERC-1155 admite hooks de recepción para contratos inteligentes solamente. La función hook debe devolver un valor mágico predefinido bytes4 que es dado como:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Cuando el contrato de recepción muestra este valor, asumimos que el contrato acepta la transferencia y sabe cómo manejar los tokens ERC-1155. ¡Genial, no más tokens estancados en un contrato!

### Compatibilidad con NFT {#nft-support}

Cuando el suministro es solo 1, el token es esencialmente un token no fungible (NFT). Y como es estándar para ERC-721, puede definir una URL de metadatos. La URL puede ser leída y modificada por clientes, ver [aquí](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Regla de transferencia segura {#safe-transfer-rule}

Ya hemos hablado un poco acerca de algunas reglas de transferencia segura en explicaciones anteriores. Pero veamos las reglas más importantes:

1. El llamante debe ser aprobado para gastar los tokens para la dirección `_from` o el llamante debe ser igual a `_from`.
2. La llamada de transferencia debe revertirse si
   1. la dirección `_to` es 0.
   2. la longitud de `_ids` no es igual a la longitud de `_values`.
   3. cualquier balance(s) del tenedor(es) del token(s) en `_ids` es menor(es) que el monto (los montos) respectivo(s) en `_values` enviado al destinatario.
   4. ocurre cualquier otro error.

_Nota_: Todas las funciones de lote, incluyendo hook, también existen como versiones sin lote. Esto se hace para la eficiencia del gas, considerando que la transferencia de un solo activo probablemente siga siendo la manera más comúnmente utilizada. Las hemos dejado de lado para mayor simplicidad en las explicaciones, incluidas las reglas de transferencia segura. Los nombres son identicos, solo quite el lote ("Batch").

## Más información {#further-reading}

- [EIP-1155: estándar multitoken](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Documentos de Openzeppelin](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [ERC-1155: Repositorio de GitHub](https://github.com/enjin/erc-1155)
- [API de NFT de Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
