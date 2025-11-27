---
title: Estándar de token de pago ERC-1363
description: ERC-1363 es una interfaz de extensión para tokens ERC-20 que permite ejecutar una lógica personalizada en un contrato receptor después de las transferencias, o en un contrato gastador después de las aprobaciones, todo dentro de una única transacción.
lang: es
---

## Introducción {#introduction}

### ¿Qué es ERC-1363? {#what-is-erc1363}

ERC-1363 es una interfaz de extensión para tokens ERC-20 que permite ejecutar una lógica personalizada en un contrato receptor después de las transferencias, o en un contrato gastador después de las aprobaciones, todo dentro de una única transacción.

### Diferencias con ERC-20 {#erc20-differences}

Las operaciones estándar de ERC-20 como `transfer`, `transferFrom` y `approve`, no permiten la ejecución de código en el contrato receptor o gastador sin una transacción separada.
Esto introduce complejidad en el desarrollo de la interfaz de usuario y fricción en la adopción porque los usuarios deben esperar a que se ejecute la primera transacción y luego enviar la segunda.
También deben pagar el GAS dos veces.

ERC-1363 hace que los tokens fungibles sean capaces de realizar acciones más fácilmente y de funcionar sin el uso de ningún oyente fuera de la cadena.
Permite realizar una llamada de retorno («callback») en un contrato receptor o gastador, después de una transferencia o una aprobación, en una única transacción.

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, le recomendamos que primero lea sobre:

- [Estándares de tokens](/desarrolladores/documentos/estándares/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Cuerpo {#body}

ERC-1363 introduce una API estándar para que los tokens ERC-20 interactúen con contratos inteligentes después de `transfer`, `transferFrom` o `approve`.

Este estándar proporciona una funcionalidad básica para transferir tokens, además de permitir que los tokens se aprueben para que puedan ser gastados por un tercero en la cadena, y luego realizar una llamada de retorno («callback») en el contrato receptor o gastador.

Existen muchos usos propuestos para los contratos inteligentes que pueden aceptar las llamadas de retorno («callbacks») de ERC-20.

Algunos ejemplos podrían ser:

- **Ventas colectivas**: los tokens enviados activan la asignación instantánea de recompensas.
- **Servicios**: el pago activa el acceso al servicio en un solo paso.
- **Facturas**: los tokens liquidan las facturas automáticamente.
- **Suscripciones**: la aprobación de la tarifa anual activa la suscripción con el pago del primer mes.

Por estas razones, se le denominó originalmente **«token de pago»**.

El comportamiento de la llamada de retorno («callback») amplía aún más su utilidad, permitiendo interacciones fluidas como:

- **Staking**: los tokens transferidos activan el bloqueo automático en un contrato de staking.
- **Votación**: los tokens recibidos registran los votos en un sistema de gobernanza.
- **Intercambio (swapping)**: las aprobaciones de tokens activan la lógica de intercambio en un solo paso.

Los tokens ERC-1363 pueden utilizarse para utilidades específicas en todos los casos que requieran la ejecución de una llamada de retorno («callback») después de recibir una transferencia o una aprobación.
ERC-1363 también es útil para evitar la pérdida o el bloqueo de tokens en los contratos inteligentes al verificar la capacidad del destinatario para gestionar los tokens.

A diferencia de otras propuestas de extensión de ERC-20, ERC-1363 no anula los métodos `transfer` y `transferFrom` de ERC-20 y define los ID de las interfaces que se deben implementar, manteniendo la compatibilidad con versiones anteriores de ERC-20.

Del [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Métodos {#methods}

Los contratos inteligentes que implementan el estándar ERC-1363 **DEBEN** implementar todas las funciones de la interfaz `ERC1363`, así como las interfaces `ERC20` y `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @título ERC1363
 * @dev Una interfaz de extensión para tokens ERC-20 que permite ejecutar código en un contrato receptor
 * después de `transfer` o `transferFrom`, o código en un contrato gastador después de `approve`, en una sola transacción.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * NOTA: el identificador de ERC-165 para esta interfaz es 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Mueve una cantidad de tokens de `valor` de la cuenta del remitente a `to`
   * y luego llama a `ERC1363Receiver::onTransferReceived` en `to`.
   * @param to La dirección a la que se están transfiriendo los tokens.
   * @param value La cantidad de tokens que se van a transferir.
   * @return Un valor booleano que indica que la operación se ha realizado correctamente a menos que se produzca una excepción.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Mueve una cantidad de tokens de `valor` de la cuenta del remitente a `to`
   * y luego llama a `ERC1363Receiver::onTransferReceived` en `to`.
   * @param to La dirección a la que se están transfiriendo los tokens.
   * @param value La cantidad de tokens que se van a transferir.
   * @param data Datos adicionales sin formato específico, enviados en la llamada a `to`.
   * @return Un valor booleano que indica que la operación se ha realizado correctamente a menos que se produzca una excepción.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Mueve una cantidad de tokens de `valor` de `from` a `to` utilizando el mecanismo de asignación
   * y luego llama a `ERC1363Receiver::onTransferReceived` en `to`.
   * @param from La dirección desde la que se envían los tokens.
   * @param to La dirección a la que se están transfiriendo los tokens.
   * @param value La cantidad de tokens que se van a transferir.
   * @return Un valor booleano que indica que la operación se ha realizado correctamente a menos que se produzca una excepción.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Mueve una cantidad de tokens de `valor` de `from` a `to` utilizando el mecanismo de asignación
   * y luego llama a `ERC1363Receiver::onTransferReceived` en `to`.
   * @param from La dirección desde la que se envían los tokens.
   * @param to La dirección a la que se están transfiriendo los tokens.
   * @param value La cantidad de tokens que se van a transferir.
   * @param data Datos adicionales sin formato específico, enviados en la llamada a `to`.
   * @return Un valor booleano que indica que la operación se ha realizado correctamente a menos que se produzca una excepción.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Establece una cantidad de tokens de `valor` como la asignación de `spender` sobre los tokens del remitente
   * y luego llama a `ERC1363Spender::onApprovalReceived` en `spender`.
   * @param spender La dirección que gastará los fondos.
   * @param value La cantidad de tokens que se van a gastar.
   * @return Un valor booleano que indica que la operación se ha realizado correctamente a menos que se produzca una excepción.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Establece una cantidad de tokens de `valor` como la asignación de `spender` sobre los tokens del remitente
   * y luego llama a `ERC1363Spender::onApprovalReceived` en `spender`.
   * @param spender La dirección que gastará los fondos.
   * @param value La cantidad de tokens que se van a gastar.
   * @param data Datos adicionales sin formato específico, enviados en la llamada a `spender`.
   * @return Un valor booleano que indica que la operación se ha realizado correctamente a menos que se produzca una excepción.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

Un contrato inteligente que quiera aceptar tokens ERC-1363 a través de `transferAndCall` o `transferFromAndCall` **DEBE** implementar la interfaz `ERC1363Receiver`:

```solidity
/**
 * @título ERC1363Receiver
 * @dev Interfaz para cualquier contrato que quiera admitir `transferAndCall` o `transferFromAndCall` desde contratos de token ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Cada vez que los tokens ERC-1363 se transfieren a este contrato a través de `ERC1363::transferAndCall` o `ERC1363::transferFromAndCall`
   * por parte del `operator` desde `from`, se llama a esta función.
   *
   * NOTA: Para aceptar la transferencia, esto debe devolver
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (es decir, 0x88a7ca5c, o su propio selector de funciones).
   *
   * @param operator La dirección que llamó a la función `transferAndCall` o `transferFromAndCall`.
   * @param from La dirección desde la que se transfieren los tokens.
   * @param value La cantidad de tokens transferidos.
   * @param data Datos adicionales sin formato específico.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` si se permite la transferencia, a menos que se produzca una excepción.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Un contrato inteligente que quiera aceptar tokens ERC-1363 a través de `approveAndCall` **DEBE** implementar la interfaz `ERC1363Spender`:

```solidity
/**
 * @título ERC1363Spender
 * @dev Interfaz para cualquier contrato que quiera admitir `approveAndCall` desde contratos de token ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Cada vez que un `propietario` de tokens ERC-1363 aprueba este contrato a través de `ERC1363::approveAndCall`
   * para gastar sus tokens, se llama a esta función.
   *
   * NOTA: Para aceptar la aprobación, debe devolver
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (es decir, 0x7b04a2d0, o su propio selector de funciones).
   *
   * @param owner La dirección que llamó a la función `approveAndCall` y que anteriormente poseía los tokens.
   * @param value La cantidad de tokens que se van a gastar.
   * @param data Datos adicionales sin formato específico.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` si se permite la aprobación, a menos que se produzca una excepción.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Lecturas adicionales {#further-reading}

- [ERC-1363: Estándar de token de pago](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Repositorio de GitHub](https://github.com/vittominacori/erc1363-payable-token)
