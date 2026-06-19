---
title: "Análisis del contrato del puente estándar de Optimism"
description: "¿Cómo funciona el puente estándar de Optimism? ¿Por qué funciona de esta manera?"
author: Ori Pomerantz
tags: ["Solidity", "puente", "capa 2"]
skill: intermediate
breadcrumb: "Puente de Optimism"
published: 2022-03-30
lang: es
---

[Optimism](https://www.optimism.io/) es un [rollup optimista](/developers/docs/scaling/optimistic-rollups/).
Los rollup optimistas pueden procesar transacciones por un precio mucho menor que la red principal de Ethereum (también conocida como capa 1 o l1) porque las transacciones solo son procesadas por unos pocos nodos, en lugar de por cada nodo de la red.
Al mismo tiempo, todos los datos se escriben en la l1 para que todo pueda probarse y reconstruirse con todas las garantías de integridad y disponibilidad de la Red principal.

Para usar activos de la l1 en Optimism (o cualquier otra capa 2 (l2)), los activos necesitan ser [puenteados](/bridges/#prerequisites).
Una forma de lograr esto es que los usuarios bloqueen activos (ETH y [tokens ERC-20](/developers/docs/standards/tokens/erc-20/) son los más comunes) en la l1, y reciban activos equivalentes para usar en la l2.
Eventualmente, quien termine con ellos podría querer puentearlos de vuelta a la l1.
Al hacer esto, los activos se queman en la l2 y luego se liberan de vuelta al usuario en la l1.

Esta es la forma en que funciona el [puente estándar de Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
En este artículo repasamos el código fuente de ese puente para ver cómo funciona y estudiarlo como un ejemplo de código Solidity bien escrito.

## Flujos de control {#control-flows}

El puente tiene dos flujos principales:

- Depósito (de la l1 a la l2)
- Retiro (de la l2 a la l1)

### Flujo de depósito {#deposit-flow}

#### Capa 1 {#deposit-flow-layer-1}

1. Si se deposita un ERC-20, el depositante le da al puente una asignación para gastar la cantidad que se está depositando
2. El depositante llama al puente de la l1 (`depositERC20`, `depositERC20To`, `depositETH` o `depositETHTo`)
3. El puente de la l1 toma posesión del activo puenteado
   - ETH: El activo es transferido por el depositante como parte de la llamada
   - ERC-20: El activo es transferido por el puente a sí mismo utilizando la asignación proporcionada por el depositante
4. El puente de la l1 utiliza el mecanismo de mensajes entre dominios para llamar a `finalizeDeposit` en el puente de la l2

#### Capa 2 {#deposit-flow-layer-2}

5. El puente de la l2 verifica que la llamada a `finalizeDeposit` sea legítima:
   - Provino del contrato de mensajes entre dominios
   - Era originalmente del puente en la l1
6. El puente de la l2 comprueba si el contrato del token ERC-20 en la l2 es el correcto:
   - El contrato de la l2 informa que su contraparte de la l1 es la misma de la que provinieron los tokens en la l1
   - El contrato de la l2 informa que es compatible con la interfaz correcta ([usando ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Si el contrato de la l2 es el correcto, lo llama para acuñar el número apropiado de tokens a la dirección apropiada. Si no, inicia un proceso de retiro para permitir al usuario reclamar los tokens en la l1.

### Flujo de retiro {#withdrawal-flow}

#### Capa 2 {#withdrawal-flow-layer-2}

1. Quien retira llama al puente de la l2 (`withdraw` o `withdrawTo`)
2. El puente de la l2 quema el número apropiado de tokens pertenecientes a `msg.sender`
3. El puente de la l2 utiliza el mecanismo de mensajes entre dominios para llamar a `finalizeETHWithdrawal` o `finalizeERC20Withdrawal` en el puente de la l1

#### Capa 1 {#withdrawal-flow-layer-1}

4. El puente de la l1 verifica que la llamada a `finalizeETHWithdrawal` o `finalizeERC20Withdrawal` sea legítima:
   - Provino del mecanismo de mensajes entre dominios
   - Era originalmente del puente en la l2
5. El puente de la l1 transfiere el activo apropiado (ETH o ERC-20) a la dirección apropiada

## Código de la capa 1 {#layer-1-code}

Este es el código que se ejecuta en la l1, la red principal de Ethereum.

### IL1ERC20Bridge {#il1erc20bridge}

[Esta interfaz se define aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Incluye funciones y definiciones requeridas para puentear tokens ERC-20.

```solidity
// SPDX-License-Identifier: MIT
```

[La mayor parte del código de Optimism se publica bajo la licencia MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Al momento de escribir este artículo, la última versión de Solidity es la 0.8.12.
Hasta que se publique la versión 0.9.0, no sabemos si este código será compatible con ella o no.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Eventos *
     **********/

    event ERC20DepositInitiated(
```

En la terminología del puente de Optimism, _depósito_ significa transferencia de la l1 a la l2, y _retiro_ significa una transferencia de la l2 a la l1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

En la mayoría de los casos, la dirección de un ERC-20 en la l1 no es la misma que la dirección del ERC-20 equivalente en la l2.
[Puede ver la lista de direcciones de tokens aquí](https://static.optimism.io/optimism.tokenlist.json).
La dirección con `chainId` 1 está en la l1 (Red principal) y la dirección con `chainId` 10 está en la l2 (Optimism).
Los otros dos valores de `chainId` son para la red de pruebas Kovan (42) y la red de pruebas Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Es posible añadir notas a las transferencias, en cuyo caso se añaden a los eventos que las reportan.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

El mismo contrato del puente maneja las transferencias en ambas direcciones.
En el caso del puente de la l1, esto significa la inicialización de depósitos y la finalización de retiros.

```solidity

    /********************
     * Funciones públicas *
     ********************/

    /**
     * @dev obtiene la dirección del contrato puente de l2 correspondiente.
     * @return Dirección del contrato puente de l2 correspondiente.
     */
    function l2TokenBridge() external returns (address);
```

Esta función no es realmente necesaria, porque en la l2 es un contrato predesplegado, por lo que siempre está en la dirección `0x4200000000000000000000000000000000000010`.
Está aquí por simetría con el puente de la l2, porque la dirección del puente de la l1 _no_ es trivial de conocer.

```solidity
    /**
     * @dev deposita una cantidad del ERC-20 en el saldo del llamador en l2.
     * @param _l1Token Dirección del ERC-20 de l1 que estamos depositando
     * @param _l2Token Dirección del ERC-20 de l2 respectivo de l1
     * @param _amount Cantidad del ERC-20 a depositar
     * @param _l2Gas Límite de gas requerido para completar el depósito en l2.
     * @param _data Datos opcionales para reenviar a l2. Estos datos se proporcionan
     *        únicamente como conveniencia para contratos externos. Aparte de imponer una
     *        longitud máxima, estos contratos no ofrecen garantías sobre su contenido.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

El parámetro `_l2Gas` es la cantidad de gas de la l2 que la transacción tiene permitido gastar.
[Hasta un cierto límite (alto), esto es gratis](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), por lo que a menos que el contrato ERC-20 haga algo realmente extraño al acuñar, no debería ser un problema.
Esta función se encarga del escenario común, donde un usuario puentea activos a la misma dirección en una cadena de bloques diferente.

```solidity
    /**
     * @dev deposita una cantidad de ERC-20 en el saldo de un destinatario en l2.
     * @param _l1Token Dirección del ERC-20 de l1 que estamos depositando
     * @param _l2Token Dirección del ERC-20 de l2 respectivo de l1
     * @param _to Dirección de l2 a la que acreditar el retiro.
     * @param _amount Cantidad del ERC-20 a depositar.
     * @param _l2Gas Límite de gas requerido para completar el depósito en l2.
     * @param _data Datos opcionales para reenviar a l2. Estos datos se proporcionan
     *        únicamente como conveniencia para contratos externos. Aparte de imponer una
     *        longitud máxima, estos contratos no ofrecen garantías sobre su contenido.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Esta función es casi idéntica a `depositERC20`, pero le permite enviar el ERC-20 a una dirección diferente.

```solidity
    /*************************
     * Funciones entre cadenas *
     *************************/

    /**
     * @dev Completa un retiro de l2 a l1, y acredita los fondos al saldo del destinatario del
     * token ERC-20 de l1.
     * Esta llamada fallará si el retiro inicializado desde l2 no ha sido finalizado.
     *
     * @param _l1Token Dirección del token de l1 para el cual hacer finalizeWithdrawal.
     * @param _l2Token Dirección del token de l2 donde se inició el retiro.
     * @param _from Dirección de l2 que inicia la transferencia.
     * @param _to Dirección de l1 a la que acreditar el retiro.
     * @param _amount Cantidad del ERC-20 a depositar.
     * @param _data Datos proporcionados por el remitente en l2. Estos datos se proporcionan
     *   únicamente como conveniencia para contratos externos. Aparte de imponer una longitud
     *   máxima, estos contratos no ofrecen garantías sobre su contenido.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Los retiros (y otros mensajes de la l2 a la l1) en Optimism son un proceso de dos pasos:

1. Una transacción de inicio en la l2.
2. Una transacción de finalización o reclamo en la l1.
   Esta transacción debe ocurrir después de que termine el [período de desafío de fallas](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) para la transacción de la l2.

### IL1StandardBridge {#il1standardbridge}

[Esta interfaz se define aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Este archivo contiene definiciones de eventos y funciones para ETH.
Estas definiciones son muy similares a las definidas en `IL1ERC20Bridge` anteriormente para ERC-20.

La interfaz del puente se divide en dos archivos porque algunos tokens ERC-20 requieren un procesamiento personalizado y no pueden ser manejados por el puente estándar.
De esta manera, el puente personalizado que maneja dicho token puede implementar `IL1ERC20Bridge` y no tener que puentear también ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Eventos *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Este evento es casi idéntico a la versión ERC-20 (`ERC20DepositInitiated`), excepto que no tiene las direcciones de los tokens de la l1 y la l2.
Lo mismo ocurre con los otros eventos y las funciones.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Funciones públicas *
     ********************/

    /**
     * @dev Deposita una cantidad del ETH en el saldo del llamador en l2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposita una cantidad de ETH en el saldo de un destinatario en l2.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Funciones entre cadenas *
     *************************/

    /**
     * @dev Completa un retiro de l2 a l1, y acredita los fondos al saldo del destinatario del
     * token ETH de l1. Dado que solo el xDomainMessenger puede llamar a esta función, nunca será llamada
     * antes de que el retiro sea finalizado.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Este contrato](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) es heredado por ambos puentes ([l1](#the-l1-bridge-contract) y [l2](#l2-bridge-code)) para enviar mensajes a la otra capa.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Importaciones de interfaces */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Esta interfaz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) le dice al contrato cómo enviar mensajes a la otra capa, utilizando el mensajero entre dominios.
Este mensajero entre dominios es un sistema completamente diferente, y merece su propio artículo, que espero escribir en el futuro.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Contrato auxiliar para contratos que realizan comunicaciones entre dominios
 *
 * Compilador utilizado: definido por el contrato que hereda
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Contrato mensajero utilizado para enviar y recibir mensajes del otro dominio.
    address public messenger;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Dirección del CrossDomainMessenger en la capa actual.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

El único parámetro que el contrato necesita conocer, la dirección del mensajero entre dominios en esta capa.
Este parámetro se establece una vez, en el constructor, y nunca cambia.

```solidity

    /**********************
     * Modificadores de funciones *
     **********************/

    /**
     * Obliga a que la función modificada solo pueda ser llamada por una cuenta específica de dominio cruzado.
     * @param _sourceDomainAccount La única cuenta en el dominio de origen que está
     *  autenticada para llamar a esta función.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

La mensajería entre dominios es accesible por cualquier contrato en la cadena de bloques donde se está ejecutando (ya sea la red principal de Ethereum u Optimism).
Pero necesitamos que el puente de cada lado _solo_ confíe en ciertos mensajes si provienen del puente del otro lado.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Solo se puede confiar en los mensajes del mensajero entre dominios apropiado (`messenger`, como se ve a continuación).

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

La forma en que el mensajero entre dominios proporciona la dirección que envió un mensaje con la otra capa es [la función `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Siempre que se llame en la transacción que fue iniciada por el mensaje, puede proporcionar esta información.

Necesitamos asegurarnos de que el mensaje que recibimos provino del otro puente.

```solidity

        _;
    }

    /**********************
     * Funciones internas *
     **********************/

    /**
     * Obtiene el mensajero, generalmente del almacenamiento. Esta función se expone en caso de que un contrato hijo
     * necesite anularla.
     * @return La dirección del contrato mensajero de dominio cruzado que debe usarse.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Esta función devuelve el mensajero entre dominios.
Usamos una función en lugar de la variable `messenger` para permitir que los contratos que heredan de este utilicen un algoritmo para especificar qué mensajero entre dominios usar.

```solidity

    /**
     * Envía un mensaje a una cuenta en otro dominio
     * @param _crossDomainTarget El destinatario previsto en el dominio de destino
     * @param _message Los datos a enviar al objetivo (generalmente datos de llamada a una función con
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit El límite de gas para la recepción del mensaje en el dominio de destino.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Finalmente, la función que envía un mensaje a la otra capa.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) es un analizador estático que Optimism ejecuta en cada contrato para buscar vulnerabilidades y otros problemas potenciales.
En este caso, la siguiente línea desencadena dos vulnerabilidades:

1. [Eventos de reentrada](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Reentrada benigna](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

En este caso no nos preocupa la reentrada, sabemos que `getCrossDomainMessenger()` devuelve una dirección confiable, incluso si Slither no tiene forma de saberlo.

### El contrato del puente de la l1 {#the-l1-bridge-contract}

[El código fuente de este contrato está aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Las interfaces pueden ser parte de otros contratos, por lo que tienen que soportar una amplia gama de versiones de Solidity.
Pero el puente en sí es nuestro contrato, y podemos ser estrictos sobre qué versión de Solidity utiliza.

```solidity
/* Importaciones de interfaces */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) e [IL1StandardBridge](#il1standardbridge) se explican anteriormente.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Esta interfaz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) nos permite crear mensajes para controlar el puente estándar en la l2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Esta interfaz](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nos permite controlar contratos ERC-20.
[Puede leer más al respecto aquí](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Importaciones de bibliotecas */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Como se explicó anteriormente](#crossdomainenabled), este contrato se utiliza para la mensajería entre capas.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) tiene las direcciones para los contratos de la l2 que siempre tienen la misma dirección. Esto incluye el puente estándar en la l2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Utilidades de Address de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Se utiliza para distinguir entre direcciones de contratos y aquellas que pertenecen a cuentas de propiedad externa (EOA).

Tenga en cuenta que esta no es una solución perfecta, porque no hay forma de distinguir entre llamadas directas y llamadas realizadas desde el constructor de un contrato, pero al menos esto nos permite identificar y prevenir algunos errores comunes de los usuarios.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[El estándar ERC-20](https://eips.ethereum.org/EIPS/eip-20) admite dos formas para que un contrato informe de un fallo:

1. Revertir
2. Devolver `false`

Manejar ambos casos haría que nuestro código fuera más complicado, por lo que en su lugar usamos [`SafeERC20` de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), que se asegura de que [todos los fallos resulten en revertir](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev El puente de ETH y ERC-20 de l1 es un contrato que almacena fondos depositados de l1 y tokens
 * estándar que están en uso en l2. Sincroniza un puente de l2 correspondiente, informándole de los depósitos
 * y escuchándolo para nuevos retiros finalizados.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Esta línea es cómo especificamos usar el envoltorio `SafeERC20` cada vez que usamos la interfaz `IERC20`.

```solidity

    /********************************
     * Referencias a contratos externos *
     ********************************/

    address public l2TokenBridge;
```

La dirección de [L2StandardBridge](#l2-bridge-code).

```solidity

    // Mapea el token de l1 al token de l2 al saldo del token de l1 depositado
    mapping(address => mapping(address => uint256)) public deposits;
```

Un [mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) doble como este es la forma en que se define una [matriz dispersa bidimensional](https://en.wikipedia.org/wiki/Sparse_matrix).
Los valores en esta estructura de datos se identifican como `deposit[L1 token addr][L2 token addr]`.
El valor predeterminado es cero.
Solo las celdas que se establecen en un valor diferente se escriben en el almacenamiento.

```solidity

    /***************
     * Constructor *
     ***************/

    // Este contrato vive detrás de un proxy, por lo que los parámetros del constructor no se utilizarán.
    constructor() CrossDomainEnabled(address(0)) {}
```

Queremos poder actualizar este contrato sin tener que copiar todas las variables en el almacenamiento.
Para hacer eso usamos un [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), un contrato que usa [`delegatecall`](https://solidity-by-example.org/delegatecall/) para transferir llamadas a un contrato separado cuya dirección es almacenada por el contrato proxy (cuando se actualiza, se le dice al proxy que cambie esa dirección).
Cuando se usa `delegatecall` el almacenamiento sigue siendo el almacenamiento del contrato _que llama_, por lo que los valores de todas las variables de estado del contrato no se ven afectados.

Un efecto de este patrón es que el almacenamiento del contrato que es el _llamado_ de `delegatecall` no se utiliza y, por lo tanto, los valores del constructor que se le pasan no importan.
Esta es la razón por la que podemos proporcionar un valor sin sentido al constructor de `CrossDomainEnabled`.
También es la razón por la que la inicialización a continuación está separada del constructor.

```solidity
    /******************
     * Inicialización *
     ******************/

    /**
     * @param _l1messenger Dirección del mensajero de l1 que se utiliza para las comunicaciones entre cadenas.
     * @param _l2TokenBridge Dirección del puente estándar de l2.
     */
    // slither-disable-next-line external-function
```

Esta [prueba de Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifica funciones que no se llaman desde el código del contrato y, por lo tanto, podrían declararse como `external` en lugar de `public`.
El costo de gas de las funciones `external` puede ser menor, porque se les pueden proporcionar parámetros en los datos de llamada.
Las funciones declaradas como `public` tienen que ser accesibles desde dentro del contrato.
Los contratos no pueden modificar sus propios datos de llamada, por lo que los parámetros tienen que estar en la memoria.
Cuando una función de este tipo se llama externamente, es necesario copiar los datos de llamada a la memoria, lo que cuesta gas.
En este caso, la función solo se llama una vez, por lo que la ineficiencia no nos importa.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

La función `initialize` solo debe llamarse una vez.
Si la dirección del mensajero entre dominios de la l1 o del puente de tokens de la l2 cambia, creamos un nuevo proxy y un nuevo puente que lo llama.
Es poco probable que esto suceda, excepto cuando se actualiza todo el sistema, un hecho muy raro.

Tenga en cuenta que esta función no tiene ningún mecanismo que restrinja _quién_ puede llamarla.
Esto significa que, en teoría, un atacante podría esperar hasta que despleguemos el proxy y la primera versión del puente y luego hacer [front-running](https://solidity-by-example.org/hacks/front-running/) para llegar a la función `initialize` antes que el usuario legítimo. Pero hay dos métodos para prevenir esto:

1. Si los contratos no son desplegados directamente por una EOA sino [en una transacción que hace que otro contrato los cree](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), todo el proceso puede ser atómico y terminar antes de que se ejecute cualquier otra transacción.
2. Si la llamada legítima a `initialize` falla, siempre es posible ignorar el proxy y el puente recién creados y crear unos nuevos.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Estos son los dos parámetros que el puente necesita conocer.

```solidity

    /**************
     * Depósitos *
     **************/

    /** @dev Modificador que requiere que el remitente sea una EOA. Esta comprobación podría ser eludida por un contrato
     *  malicioso a través de initcode, pero se encarga del error de usuario que queremos evitar.
     */
    modifier onlyEOA() {
        // Utilizado para detener depósitos desde contratos (evitar tokens perdidos accidentalmente)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Esta es la razón por la que necesitábamos las utilidades `Address` de OpenZeppelin.

```solidity
    /**
     * @dev Esta función puede ser llamada sin datos
     * para depositar una cantidad de ETH en el saldo del llamador en l2.
     * Dado que la función receive no toma datos, se reenvía una cantidad
     * predeterminada conservadora a l2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Esta función existe con fines de prueba.
Note que no aparece en las definiciones de la interfaz: no es para uso normal.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Estas dos funciones son envoltorios alrededor de `_initiateETHDeposit`, la función que maneja el depósito real de ETH.

```solidity
    /**
     * @dev Realiza la lógica para los depósitos almacenando el ETH e informando a la puerta de enlace de ETH de l2 sobre
     * el depósito.
     * @param _from Cuenta de la que extraer el depósito en l1.
     * @param _to Cuenta a la que dar el depósito en l2.
     * @param _l2Gas Límite de gas requerido para completar el depósito en l2.
     * @param _data Datos opcionales para reenviar a l2. Estos datos se proporcionan
     *        únicamente como conveniencia para contratos externos. Aparte de imponer una
     *        longitud máxima, estos contratos no ofrecen garantías sobre su contenido.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construir datos de llamada para la llamada a finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

La forma en que funcionan los mensajes entre dominios es que se llama al contrato de destino con el mensaje como sus datos de llamada.
Los contratos de Solidity siempre interpretan sus datos de llamada de acuerdo con
[las especificaciones de la ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
La función de Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) crea esos datos de llamada.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

El mensaje aquí es llamar a [la función `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) con estos parámetros:

| Parámetro | Valor                          | Significado                                                                                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | Valor especial para representar ETH (que no es un token ERC-20) en la l1                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | El contrato de la l2 que gestiona ETH en Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (este contrato es solo para uso interno de Optimism) |
| \_from    | \_from                         | La dirección en la l1 que envía el ETH                                                                                                         |
| \_to      | \_to                           | La dirección en la l2 que recibe el ETH                                                                                                      |
| amount    | msg.value                      | Cantidad de Wei enviada (que ya ha sido enviada al puente)                                                                               |
| \_data    | \_data                         | Datos adicionales para adjuntar al depósito                                                                                                     |

```solidity
        // Enviar datos de llamada a l2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Envía el mensaje a través del mensajero entre dominios.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Emite un evento para informar a cualquier aplicación descentralizada (dapp) que escuche sobre esta transferencia.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Estas dos funciones son envoltorios alrededor de `_initiateERC20Deposit`, la función que maneja el depósito real de ERC-20.

```solidity
    /**
     * @dev Realiza la lógica para los depósitos informando al contrato de token depositado de l2
     * sobre el depósito y llamando a un manejador para bloquear los fondos de l1. (ej., transferFrom)
     *
     * @param _l1Token Dirección del ERC-20 de l1 que estamos depositando
     * @param _l2Token Dirección del ERC-20 de l2 respectivo de l1
     * @param _from Cuenta de la que extraer el depósito en l1
     * @param _to Cuenta a la que dar el depósito en l2
     * @param _amount Cantidad del ERC-20 a depositar.
     * @param _l2Gas Límite de gas requerido para completar el depósito en l2.
     * @param _data Datos opcionales para reenviar a l2. Estos datos se proporcionan
     *        únicamente como conveniencia para contratos externos. Aparte de imponer una
     *        longitud máxima, estos contratos no ofrecen garantías sobre su contenido.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

Esta función es similar a `_initiateETHDeposit` anterior, con algunas diferencias importantes.
La primera diferencia es que esta función recibe las direcciones de los tokens y la cantidad a transferir como parámetros.
En el caso de ETH, la llamada al puente ya incluye la transferencia del activo a la cuenta del puente (`msg.value`).

```solidity
        // Cuando se inicia un depósito en l1, el puente de l1 transfiere los fondos a sí mismo para futuros
        // retiros. safeTransferFrom también comprueba si el contrato tiene código, por lo que esto fallará si
        // _from es una EOA o address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Las transferencias de tokens ERC-20 siguen un proceso diferente al de ETH:

1. El usuario (`_from`) le da una asignación al puente para transferir los tokens apropiados.
2. El usuario llama al puente con la dirección del contrato del token, la cantidad, etc.
3. El puente transfiere los tokens (a sí mismo) como parte del proceso de depósito.

El primer paso puede ocurrir en una transacción separada de los dos últimos.
Sin embargo, el front-running no es un problema porque las dos funciones que llaman a `_initiateERC20Deposit` (`depositERC20` y `depositERC20To`) solo llaman a esta función con `msg.sender` como el parámetro `_from`.

```solidity
        // Construir datos de llamada para _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Enviar datos de llamada a l2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Añade la cantidad depositada de tokens a la estructura de datos `deposits`.
Podría haber múltiples direcciones en la l2 que correspondan al mismo token ERC-20 de la l1, por lo que no es suficiente usar el saldo del puente del token ERC-20 de la l1 para realizar un seguimiento de los depósitos.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Funciones entre cadenas *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

El puente de la l2 envía un mensaje al mensajero entre dominios de la l2, lo que hace que el mensajero entre dominios de la l1 llame a esta función (una vez que la [transacción que finaliza el mensaje](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) se envía en la l1, por supuesto).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Asegúrese de que este sea un mensaje _legítimo_, proveniente del mensajero entre dominios y originado en el puente de tokens de la l2.
Esta función se utiliza para retirar ETH del puente, por lo que tenemos que asegurarnos de que solo sea llamada por el llamador autorizado.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

La forma de transferir ETH es llamar al destinatario con la cantidad de Wei en el `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Emite un evento sobre el retiro.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Esta función es similar a `finalizeETHWithdrawal` anterior, con los cambios necesarios para los tokens ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Actualiza la estructura de datos `deposits`.

```solidity

        // Cuando se finaliza un retiro en l1, el puente de l1 transfiere los fondos a quien realiza el retiro
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporal - Migrando ETH *
     *****************************/

    /**
     * @dev Añade saldo de ETH a la cuenta. Esto está destinado a permitir que el ETH
     * sea migrado de una puerta de enlace antigua a una nueva puerta de enlace.
     * NOTA: Esto se deja solo para una actualización para que podamos recibir el ETH migrado del
     * contrato antiguo
     */
    function donateETH() external payable {}
}
```

Hubo una implementación anterior del puente.
Cuando pasamos de esa implementación a esta, tuvimos que mover todos los activos.
Los tokens ERC-20 simplemente se pueden mover.
Sin embargo, para transferir ETH a un contrato se necesita la aprobación de ese contrato, que es lo que nos proporciona `donateETH`.

## Tokens ERC-20 en la l2 {#erc-20-tokens-on-l2}

Para que un token ERC-20 encaje en el puente estándar, necesita permitir que el puente estándar, y _solo_ el puente estándar, acuñe el token.
Esto es necesario porque los puentes necesitan asegurarse de que el número de tokens que circulan en Optimism sea igual al número de tokens bloqueados dentro del contrato del puente de la l1.
Si hay demasiados tokens en la l2, algunos usuarios no podrían puentear sus activos de vuelta a la l1.
En lugar de un puente confiable, esencialmente recrearíamos la [banca de reserva fraccionaria](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Si hay demasiados tokens en la l1, algunos de esos tokens se quedarían bloqueados dentro del contrato del puente para siempre porque no hay forma de liberarlos sin quemar tokens de la l2.

### IL2StandardERC20 {#il2standarderc20}

Cada token ERC-20 en la l2 que utiliza el puente estándar necesita proporcionar [esta interfaz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), que tiene las funciones y eventos que el puente estándar necesita.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[La interfaz estándar ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) no incluye las funciones `mint` y `burn`.
Esos métodos no son requeridos por [el estándar ERC-20](https://eips.ethereum.org/EIPS/eip-20), que deja sin especificar los mecanismos para crear y destruir tokens.

```solidity
import { IERC-165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[La interfaz ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) se utiliza para especificar qué funciones proporciona un contrato.
[Puede leer el estándar aquí](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Esta función proporciona la dirección del token de la l1 que está puenteado a este contrato.
Tenga en cuenta que no tenemos una función similar en la dirección opuesta.
Necesitamos poder puentear cualquier token de la l1, independientemente de si el soporte para la l2 estaba planeado cuando se implementó o no.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funciones y eventos para acuñar (crear) y quemar (destruir) tokens.
El puente debería ser la única entidad que pueda ejecutar estas funciones para asegurar que el número de tokens sea correcto (igual al número de tokens bloqueados en la l1).

### L2StandardERC20 {#l2standarderc20}

[Esta es nuestra implementación de la interfaz `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
A menos que necesite algún tipo de lógica personalizada, debería usar esta.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[El contrato ERC-20 de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism no cree en reinventar la rueda, especialmente cuando la rueda está bien auditada y necesita ser lo suficientemente confiable como para mantener activos.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Estos son los dos parámetros de configuración adicionales que requerimos y que ERC-20 normalmente no requiere.

```solidity

    /**
     * @param _l2Bridge Dirección del puente estándar de l2.
     * @param _l1Token Dirección del token de l1 correspondiente.
     * @param _name Nombre del ERC-20.
     * @param _symbol Símbolo del ERC-20.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

Primero llama al constructor del contrato del que heredamos (`ERC20(_name, _symbol)`) y luego establece nuestras propias variables.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

Esta es la forma en que funciona [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Cada interfaz es un número de funciones compatibles, y se identifica como el [o exclusivo](https://en.wikipedia.org/wiki/Exclusive_or) de los [selectores de funciones de la ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) de esas funciones.

El puente de la l2 utiliza ERC-165 como una comprobación de cordura para asegurarse de que el contrato ERC-20 al que envía activos es un `IL2StandardERC20`.

**Nota:** No hay nada que impida que un contrato malicioso proporcione respuestas falsas a `supportsInterface`, por lo que este es un mecanismo de comprobación de cordura, _no_ un mecanismo de seguridad.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Solo el puente de la l2 tiene permitido acuñar y quemar activos.

`_mint` y `_burn` están realmente definidos en el [contrato ERC-20 de OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Ese contrato simplemente no los expone externamente, porque las condiciones para acuñar y quemar tokens son tan variadas como el número de formas de usar ERC-20.

## Código del puente de la l2 {#l2-bridge-code}

Este es el código que ejecuta el puente en Optimism.
[El código fuente de este contrato está aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Importaciones de interfaces */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

La interfaz [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) es muy similar al [equivalente de la l1](#il1erc20bridge) que vimos anteriormente.
Hay dos diferencias significativas:

1. En la l1 se inician depósitos y se finalizan retiros.
   Aquí se inician retiros y se finalizan depósitos.
2. En la l1 es necesario distinguir entre ETH y tokens ERC-20.
   En la l2 podemos usar las mismas funciones para ambos porque internamente los saldos de ETH en Optimism se manejan como un token ERC-20 con la dirección [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Importaciones de bibliotecas */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Importaciones de contratos */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev El puente estándar de l2 es un contrato que trabaja junto con el puente estándar de l1 para
 * permitir transiciones de ETH y ERC-20 entre l1 y l2.
 * Este contrato actúa como acuñador de nuevos tokens cuando se entera de depósitos en el puente estándar
 * de l1.
 * Este contrato también actúa como quemador de los tokens destinados al retiro, informando al puente
 * de l1 para que libere los fondos de l1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Referencias a contratos externos *
     ********************************/

    address public l1TokenBridge;
```

Realiza un seguimiento de la dirección del puente de la l1.
Tenga en cuenta que, en contraste con el equivalente de la l1, aquí _necesitamos_ esta variable.
La dirección del puente de la l1 no se conoce de antemano.

```solidity

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Mensajero de dominio cruzado utilizado por este contrato.
     * @param _l1TokenBridge Dirección del puente de l1 desplegado en la cadena principal.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Retiros *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

Estas dos funciones inician retiros.
Tenga en cuenta que no hay necesidad de especificar la dirección del token de la l1.
Se espera que los tokens de la l2 nos digan la dirección del equivalente de la l1.

```solidity

    /**
     * @dev Realiza la lógica para los retiros quemando el token e informando
     *      a la puerta de enlace del token de l1 sobre el retiro.
     * @param _l2Token Dirección del token de l2 donde se inicia el retiro.
     * @param _from Cuenta de la que extraer el retiro en l2.
     * @param _to Cuenta a la que dar el retiro en l1.
     * @param _amount Cantidad del token a retirar.
     * @param _l1Gas No utilizado, pero incluido por posibles consideraciones de compatibilidad futura.
     * @param _data Datos opcionales para reenviar a l1. Estos datos se proporcionan
     *        únicamente como conveniencia para contratos externos. Aparte de imponer una
     *        longitud máxima, estos contratos no ofrecen garantías sobre su contenido.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Cuando se inicia un retiro, quemamos los fondos de quien realiza el retiro para evitar el posterior uso
        // en l2
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Note que _no_ dependemos del parámetro `_from` sino de `msg.sender`, que es mucho más difícil de falsificar (imposible, hasta donde yo sé).

```solidity

        // Construir datos de llamada para l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

En la l1 es necesario distinguir entre ETH y ERC-20.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Enviar mensaje al puente de l1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Función entre cadenas: Depósitos *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Esta función es llamada por `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Asegúrese de que la fuente del mensaje sea legítima.
Esto es importante porque esta función llama a `_mint` y podría usarse para dar tokens que no están cubiertos por los tokens que el puente posee en la l1.

```solidity
        // Comprobar que el token de destino es compatible y
        // verificar que el token depositado en l1 coincide con la representación del token depositado en l2 aquí
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Comprobaciones de cordura:

1. Se admite la interfaz correcta
2. La dirección de la l1 del contrato ERC-20 de la l2 coincide con la fuente de la l1 de los tokens

```solidity
        ) {
            // Cuando se finaliza un depósito, acreditamos la cuenta en l2 con la misma cantidad de
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Si las comprobaciones de cordura pasan, finaliza el depósito:

1. Acuña los tokens
2. Emite el evento apropiado

```solidity
        } else {
            // O bien el token de l2 en el que se está depositando no está de acuerdo sobre la dirección correcta
            // de su token de l1, o no admite la interfaz correcta.
            // Esto solo debería suceder si hay un token de l2 malicioso, o si un usuario de alguna manera
            // especificó la dirección incorrecta del token de l2 para depositar.
            // En cualquier caso, detenemos el proceso aquí y construimos un mensaje de
            // retiro para que los usuarios puedan sacar sus fondos en algunos casos.
            // No hay forma de prevenir por completo los contratos de tokens maliciosos, pero esto limita
            // el error del usuario y mitiga algunas formas de comportamiento malicioso del contrato.
```

Si un usuario cometió un error detectable al usar la dirección incorrecta del token de la l2, queremos cancelar el depósito y devolver los tokens en la l1.
La única forma en que podemos hacer esto desde la l2 es enviar un mensaje que tendrá que esperar el período de desafío de fallas, pero eso es mucho mejor para el usuario que perder los tokens permanentemente.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // se intercambiaron _to y _from aquí para devolver el depósito al remitente
                _from,
                _amount,
                _data
            );

            // Enviar mensaje al puente de l1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Conclusión {#conclusion}

El puente estándar es el mecanismo más flexible para las transferencias de activos.
Sin embargo, debido a que es tan genérico, no siempre es el mecanismo más fácil de usar.
Especialmente para los retiros, la mayoría de los usuarios prefieren usar [puentes de terceros](https://optimism.io/apps#bridge) que no esperan el período de desafío y no requieren una prueba de Merkle para finalizar el retiro.

Estos puentes generalmente funcionan teniendo activos en la l1, que proporcionan de inmediato por una pequeña tarifa (a menudo menor que el costo del gas para un retiro del puente estándar).
Cuando el puente (o las personas que lo administran) anticipa que le faltarán activos en la l1, transfiere suficientes activos desde la l2. Como estos son retiros muy grandes, el costo del retiro se amortiza sobre una gran cantidad y es un porcentaje mucho menor.

Con suerte, este artículo le ayudó a comprender más sobre cómo funciona la capa 2 y cómo escribir código Solidity que sea claro y seguro.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).