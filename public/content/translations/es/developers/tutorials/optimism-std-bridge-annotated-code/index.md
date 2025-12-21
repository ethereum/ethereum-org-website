---
title: "Recorrido por el contrato del puente estándar de Optimism"
description: ¿Cómo funciona el puente estándar para Optimism? ¿Por qué funciona de esta manera?
author: Ori Pomerantz
tags: [ "Solidity", "puente", "capa 2" ]
skill: intermediate
published: 2022-03-30
lang: es
---

[Optimism](https://www.optimism.io/) es un [rollup optimista](/developers/docs/scaling/optimistic-rollups/).
Los rollups optimistas pueden procesar transacciones por un precio mucho más bajo que la red principal de Ethereum (también conocida como capa 1 o L1) porque las transacciones solo son procesadas por unos pocos nodos, en lugar de cada nodo de la red.
Al mismo tiempo, todos los datos se escriben en la L1 para que todo pueda probarse y reconstruirse con todas las garantías de integridad y disponibilidad de la red principal.

Para usar activos de L1 en Optimism (o cualquier otra L2), los activos deben ser [transferidos mediante un puente](/bridges/#prerequisites).
Una forma de lograr esto es que los usuarios bloqueen activos (ETH y los [tokens ERC-20](/developers/docs/standards/tokens/erc-20/) son los más comunes) en L1, y reciban activos equivalentes para usar en L2.
Eventualmente, quien termine con ellos podría querer puentearlos de vuelta a L1.
Al hacer esto, los activos se queman en L2 y luego se liberan de nuevo al usuario en L1.

Así es como funciona el [puente estándar de Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
En este artículo, repasamos el código fuente de ese puente para ver cómo funciona y estudiarlo como ejemplo de código de Solidity bien escrito.

## Flujos de control {#control-flows}

El puente tiene dos flujos principales:

- Depósito (de L1 a L2)
- Retirada (de L2 a L1)

### Flujo de depósito {#deposit-flow}

#### Capa 1 {#deposit-flow-layer-1}

1. Si se deposita un ERC-20, el depositante le da al puente un permiso para gastar la cantidad que se está depositando
2. El depositante llama al puente de L1 (`depositERC20`, `depositERC20To`, `depositETH`, o `depositETHTo`)
3. El puente L1 toma posesión del activo puenteado
   - ETH: El activo es transferido por el depositante como parte de la llamada
   - ERC-20: El activo es transferido por el puente a sí mismo utilizando el permiso proporcionado por el depositante
4. El puente L1 utiliza el mecanismo de mensajes entre dominios para llamar a `finalizeDeposit` en el puente L2

#### Capa 2 {#deposit-flow-layer-2}

5. El puente de L2 verifica que la llamada a `finalizeDeposit` sea legítima:
   - Procede del contrato de mensajes entre dominios
   - Originalmente era del puente en L1
6. El puente de L2 comprueba si el contrato de token ERC-20 en L2 es el correcto:
   - El contrato de L2 informa que su contraparte de L1 es la misma de la que provienen los tokens en L1
   - El contrato de L2 informa que admite la interfaz correcta ([usando ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Si el contrato L2 es el correcto, llámelo para mintear el número apropiado de tokens a la dirección apropiada. Si no, inicie un proceso de retirada para permitir al usuario reclamar los tokens en L1.

### Flujo de retirada {#withdrawal-flow}

#### Capa 2 {#withdrawal-flow-layer-2}

1. Quien realiza la retirada llama al puente de L2 (`withdraw` o `withdrawTo`)
2. El puente L2 quema el número apropiado de tokens pertenecientes a `msg.sender`
3. El puente de L2 utiliza el mecanismo de mensajes entre dominios para llamar a `finalizeETHWithdrawal` o `finalizeERC20Withdrawal` en el puente de L1

#### Capa 1 {#withdrawal-flow-layer-1}

4. El puente de L1 verifica que la llamada a `finalizeETHWithdrawal` o `finalizeERC20Withdrawal` sea legítima:
   - Procede del mecanismo de mensajes entre dominios
   - Originalmente era del puente en L2
5. El puente de L1 transfiere el activo apropiado (ETH o ERC-20) a la dirección apropiada

## Código de la capa 1 {#layer-1-code}

Este es el código que se ejecuta en la L1, la red principal de Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Esta interfaz se define aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Incluye funciones y definiciones requeridas para puentear tokens ERC-20.

```solidity
// SPDX-License-Identifier: MIT
```

[La mayor parte del código de Optimism se publica bajo la licencia MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

En el momento de escribir este artículo, la última versión de Solidity es la 0.8.12.
Hasta que se lance la versión 0.9.0, no sabemos si este código es compatible con ella o no.

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

En la terminología del puente de Optimism, _deposit_ significa una transferencia de L1 a L2, y _withdrawal_ significa una transferencia de L2 a L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

En la mayoría de los casos, la dirección de un ERC-20 en L1 no es la misma que la dirección del ERC-20 equivalente en L2.
[Puede ver la lista de direcciones de tokens aquí](https://static.optimism.io/optimism.tokenlist.json).
La dirección con `chainId` 1 está en L1 (red principal) y la dirección con `chainId` 10 está en L2 (Optimism).
Los otros dos valores de `chainId` son para la red de prueba de Kovan (42) y la red de prueba de Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Es posible añadir notas a las transferencias, en cuyo caso se añaden a los eventos que las notifican.

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

El mismo contrato de puente gestiona las transferencias en ambas direcciones.
En el caso del puente de L1, esto significa la inicialización de los depósitos y la finalización de las retiradas.

```solidity
    /********************
     * Funciones públicas *
     ********************/

    /**
     * @dev obtiene la dirección del contrato de puente de L2 correspondiente.
     * @return Dirección del contrato de puente de L2 correspondiente.
     */
    function l2TokenBridge() external returns (address);
```

Esta función no es realmente necesaria, porque en L2 es un contrato preimplementado, por lo que siempre está en la dirección `0x4200000000000000000000000000000000000010`.
Está aquí por simetría con el puente de L2, porque la dirección del puente de L1 _no_ es trivial de conocer.

```solidity
    /**
     * @dev deposita una cantidad de ERC20 en el saldo del llamador en L2.
     * @param _l1Token Dirección del ERC20 de L1 que estamos depositando
     * @param _l2Token Dirección del respectivo ERC20 de L2
     * @param _amount Cantidad del ERC20 a depositar
     * @param _l2Gas Límite de gas requerido para completar el depósito en L2.
     * @param _data Datos opcionales para reenviar a L2. Estos datos se proporcionan
     *        únicamente para la comodidad de los contratos externos. Aparte de imponer una longitud máxima,
     *        estos contratos no ofrecen ninguna garantía sobre su contenido.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

El parámetro `_l2Gas` es la cantidad de gas de L2 que la transacción puede gastar.
[Hasta un cierto límite (alto), esto es gratuito](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), por lo que, a menos que el contrato ERC-20 haga algo realmente extraño al mintear, no debería ser un problema.
Esta función se encarga del escenario común, en el que un usuario transfiere activos mediante un puente a la misma dirección en una cadena de bloques diferente.

```solidity
    /**
     * @dev deposita una cantidad de ERC20 en el saldo de un destinatario en L2.
     * @param _l1Token Dirección del ERC20 de L1 que estamos depositando
     * @param _l2Token Dirección del respectivo ERC20 de L2
     * @param _to Dirección de L2 en la que acreditar el depósito.
     * @param _amount Cantidad del ERC20 a depositar.
     * @param _l2Gas Límite de gas requerido para completar el depósito en L2.
     * @param _data Datos opcionales para reenviar a L2. Estos datos se proporcionan
     *        únicamente para la comodidad de los contratos externos. Aparte de imponer una longitud máxima,
     *        estos contratos no ofrecen ninguna garantía sobre su contenido.
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
     * @dev Completa una retirada de L2 a L1 y acredita los fondos al saldo del
     * token ERC20 de L1 del destinatario.
     * Esta llamada fallará si la retirada iniciada desde L2 no se ha finalizado.
     *
     * @param _l1Token Dirección del token de L1 para finalizeWithdrawal.
     * @param _l2Token Dirección del token de L2 donde se inició la retirada.
     * @param _from Dirección de L2 que inicia la transferencia.
     * @param _to Dirección de L1 en la que acreditar la retirada.
     * @param _amount Cantidad del ERC20 a depositar.
     * @param _data Datos proporcionados por el remitente en L2. Estos datos se proporcionan
     *   únicamente para la comodidad de los contratos externos. Aparte de imponer una longitud máxima,
     *   estos contratos no ofrecen ninguna garantía sobre su contenido.
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

Las retiradas (y otros mensajes de L2 a L1) en Optimism son un proceso de dos pasos:

1. Una transacción iniciadora en L2.
2. Una transacción de finalización o reclamación en L1.
   Esta transacción debe ocurrir después de que finalice el [período de impugnación de errores](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) para la transacción de L2.

### IL1StandardBridge {#il1standardbridge}

[Esta interfaz se define aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Este archivo contiene definiciones de eventos y funciones para ETH.
Estas definiciones son muy similares a las definidas en `IL1ERC20Bridge` anteriormente para ERC-20.

La interfaz de puente está dividida entre dos archivos porque algunos tokens ERC-20 requieren un procesamiento personalizado y no pueden ser manejados por el puente estándar.
De esta manera, el puente personalizado que gestiona dicho token puede implementar `IL1ERC20Bridge` y no tener que puentear también ETH.

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

Este evento es casi idéntico a la versión ERC-20 (`ERC20DepositInitiated`), excepto que no incluye las direcciones de los tokens de L1 y L2.
Lo mismo ocurre con los demás eventos y funciones.

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
     * @dev Deposita una cantidad de ETH en el saldo del llamador en L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposita una cantidad de ETH en el saldo de un destinatario en L2.
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
     * @dev Completa una retirada de L2 a L1 y acredita los fondos en el saldo del
     * token ETH de L1 del destinatario. Dado que solo el xDomainMessenger puede llamar a esta función, nunca se llamará
     * antes de que se finalice la retirada.
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

[Este contrato](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) es heredado por ambos puentes ([L1](#the-l1-bridge-contract) y [L2](#the-l2-bridge-contract)) para enviar mensajes a la otra capa.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Esta interfaz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) le indica al contrato cómo enviar mensajes a la otra capa, utilizando el mensajero entre dominios.
Este mensajero entre dominios es un sistema completamente diferente y merece su propio artículo, que espero escribir en el futuro.

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

    // Contrato de mensajero utilizado para enviar y recibir mensajes desde el otro dominio.
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

El único parámetro que el contrato necesita saber es la dirección del mensajero entre dominios en esta capa.
Este parámetro se establece una vez, en el constructor, y nunca cambia.

```solidity

    /**********************
     * Modificadores de función *
     **********************/

    /**
     * @dev Exige que la función modificada solo pueda ser llamada por una cuenta específica entre dominios.
     * @param _sourceDomainAccount La única cuenta en el dominio de origen que está
     *  autenticada para llamar a esta función.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

La mensajería entre dominios es accesible para cualquier contrato en la cadena de bloques donde se esté ejecutando (ya sea la red principal de Ethereum u Optimism).
Pero necesitamos que el puente de cada lado confíe _únicamente_ en ciertos mensajes si provienen del puente del otro lado.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: contrato de mensajero no autenticado"
        );
```

Solo se puede confiar en los mensajes del mensajero entre dominios apropiado (`messenger`, como verá a continuación).

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: remitente incorrecto del mensaje entre dominios"
        );
```

La forma en que el mensajero entre dominios proporciona la dirección que envió un mensaje desde la otra capa es [la función `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Siempre que se llame en la transacción que fue iniciada por el mensaje, puede proporcionar esta información.

Tenemos que asegurarnos de que el mensaje que recibimos provenga del otro puente.

```solidity

        _;
    }

    /**********************
     * Funciones internas *
     **********************/

    /**
     * @dev Obtiene el mensajero, normalmente del almacenamiento. Esta función se expone en caso de que un contrato secundario
     * necesite anularla.
     * @return La dirección del contrato de mensajero entre dominios que se debe utilizar.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Esta función devuelve el mensajero entre dominios.
Utilizamos una función en lugar de la variable `messenger` para permitir que los contratos que heredan de este usen un algoritmo para especificar qué mensajero entre dominios usar.

```solidity

    /**
     * @dev Envía un mensaje a una cuenta en otro dominio
     * @param _crossDomainTarget El destinatario previsto en el dominio de destino
     * @param _message Los datos para enviar al objetivo (normalmente datos de llamada a una función con
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
En este caso, la siguiente línea activa dos vulnerabilidades:

1. [Eventos de reentrada](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Reentrada benigna](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

En este caso, no nos preocupa la reentrada, ya que sabemos que `getCrossDomainMessenger()` devuelve una dirección confiable, incluso si Slither no tiene forma de saberlo.

### El contrato del puente de L1 {#the-l1-bridge-contract}

[El código fuente de este contrato está aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Las interfaces pueden ser parte de otros contratos, por lo que tienen que admitir una amplia gama de versiones de Solidity.
Pero el puente en sí es nuestro contrato, y podemos ser estrictos sobre qué versión de Solidity utiliza.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) e [IL1StandardBridge](#IL1StandardBridge) se explican más arriba.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Esta interfaz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) nos permite crear mensajes para controlar el puente estándar en L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Esta interfaz](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nos permite controlar los contratos ERC-20.
[Puede leer más al respecto aquí](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Como se explicó anteriormente](#crossdomainenabled), este contrato se utiliza para la mensajería entre capas.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) tiene las direcciones de los contratos de L2 que siempre tienen la misma dirección. Esto incluye el puente estándar en L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Utilidades de dirección de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Se utiliza para distinguir entre las direcciones de contrato y las que pertenecen a cuentas de propiedad externa (EOA).

Tenga en cuenta que esta no es una solución perfecta, porque no hay forma de distinguir entre llamadas directas y llamadas realizadas desde el constructor de un contrato, pero al menos esto nos permite identificar y prevenir algunos errores comunes de los usuarios.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[El estándar ERC-20](https://eips.ethereum.org/EIPS/eip-20) admite dos formas para que un contrato informe de un fallo:

1. Revertir
2. Devolver `false`

Manejar ambos casos haría nuestro código más complicado, así que en su lugar usamos [`SafeERC20` de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), que se asegura de que [todos los fallos resulten en una reversión](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev El puente ERC20 y ETH de L1 es un contrato que almacena los fondos de L1 depositados y los tokens
 * estándar que están en uso en L2. Sincroniza un puente de L2 correspondiente, informándole de los depósitos
 * y escuchándolo para las retiradas recién finalizadas.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Esta línea es la forma en que especificamos que se use el contenedor `SafeERC20` cada vez que usamos la interfaz `IERC20`.

```solidity

    /********************************
     * Referencias a contratos externos *
     ********************************/

    address public l2TokenBridge;
```

La dirección de [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Asigna el token de L1 al token de L2 al saldo del token de L1 depositado
    mapping(address => mapping(address => uint256)) public deposits;
```

Un [mapeo](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) doble como este es la forma en que se define una [matriz dispersa bidimensional](https://en.wikipedia.org/wiki/Sparse_matrix).
Los valores en esta estructura de datos se identifican como `deposit[dirección de token L1][dirección de token L2]`.
El valor por defecto es cero.
Solo las celdas que se establecen en un valor diferente se escriben en el almacenamiento.

```solidity

    /***************
     * Constructor *
     ***************/

    // Este contrato vive detrás de un proxy, por lo que los parámetros del constructor no se utilizarán.
    constructor() CrossDomainEnabled(address(0)) {}
```

Queremos poder actualizar este contrato sin tener que copiar todas las variables en el almacenamiento.
Para ello, utilizamos un [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), un contrato que utiliza [`delegatecall`](https://solidity-by-example.org/delegatecall/) para transferir llamadas a un contrato separado cuya dirección es almacenada por el contrato proxy (cuando se actualiza, se le dice al proxy que cambie esa dirección).
Cuando se utiliza `delegatecall`, el almacenamiento sigue siendo el almacenamiento del contrato _que llama_, por lo que los valores de todas las variables de estado del contrato no se ven afectados.

Un efecto de este patrón es que el almacenamiento del contrato que es el _llamado_ de `delegatecall` no se utiliza y, por lo tanto, los valores del constructor que se le pasan no importan.
Esta es la razón por la que podemos proporcionar un valor sin sentido al constructor `CrossDomainEnabled`.
También es la razón por la que la inicialización a continuación está separada del constructor.

```solidity
    /******************
     * Inicialización *
     ******************/

    /**
     * @param _l1messenger Dirección del mensajero de L1 que se utiliza para las comunicaciones entre cadenas.
     * @param _l2TokenBridge Dirección del puente estándar de L2.
     */
    // slither-disable-next-line external-function
```

Esta prueba de [Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifica las funciones que no se llaman desde el código del contrato y que, por lo tanto, podrían declararse como `external` en lugar de `public`.
El coste de gas de las funciones `external` puede ser menor, porque se les pueden proporcionar parámetros en los datos de llamada.
Las funciones declaradas como `public` deben ser accesibles desde dentro del contrato.
Los contratos no pueden modificar sus propios datos de llamada, por lo que los parámetros deben estar en memoria.
Cuando se llama a una función de este tipo externamente, es necesario copiar los datos de llamada a la memoria, lo que cuesta gas.
En este caso, la función solo se llama una vez, por lo que la ineficiencia no nos importa.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "El contrato ya ha sido inicializado.");
```

La función `initialize` solo debe llamarse una vez.
Si la dirección del mensajero entre dominios de L1 o del puente de tokens de L2 cambia, creamos un nuevo proxy y un nuevo puente que lo llama.
Es poco probable que esto ocurra, excepto cuando se actualiza todo el sistema, lo que es muy raro.

Tenga en cuenta que esta función no tiene ningún mecanismo que restrinja _quién_ puede llamarla.
Esto significa que, en teoría, un atacante podría esperar hasta que implementemos el proxy y la primera versión del puente y luego hacer [front-running](https://solidity-by-example.org/hacks/front-running/) para llegar a la función `initialize` antes de que lo haga el usuario legítimo. Pero hay dos métodos para evitarlo:

1. Si los contratos no son implementados directamente por una EOA, sino [en una transacción que hace que otro contrato los cree](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), todo el proceso puede ser atómico y terminar antes de que se ejecute cualquier otra transacción.
2. Si la llamada legítima a `initialize` falla, siempre es posible ignorar el proxy y el puente recién creados y crear otros nuevos.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Estos son los dos parámetros que el puente necesita conocer.

```solidity

    /**************
     * Depósito *
     **************/

    /** @dev Modificador que requiere que el remitente sea una EOA.  Esta comprobación podría ser
     *  eludida por un contrato malicioso a través de initcode, pero se encarga del error de usuario que queremos evitar.
     */
    modifier onlyEOA() {
        // Se utiliza para detener los depósitos de los contratos (evitar la pérdida accidental de tokens)
        require(!Address.isContract(msg.sender), "Cuenta no es EOA");
        _;
    }
```

Esta es la razón por la que necesitábamos las utilidades de `Address` de OpenZeppelin.

```solidity
    /**
     * @dev Se puede llamar a esta función sin datos
     * para depositar una cantidad de ETH en el saldo del llamador en L2.
     * Como la función de recepción no toma datos, se reenvía una
     * cantidad conservadora por defecto a L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Esta función existe para fines de prueba.
Tenga en cuenta que no aparece en las definiciones de la interfaz; no es para uso normal.

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

Estas dos funciones son envoltorios de `_initiateETHDeposit`, la función que gestiona el depósito real de ETH.

```solidity
    /**
     * @dev Realiza la lógica de los depósitos almacenando el ETH e informando a la puerta de enlace de ETH de L2
     * del depósito.
     * @param _from Cuenta de la que se retira el depósito en L1.
     * @param _to Cuenta a la que se entrega el depósito en L2.
     * @param _l2Gas Límite de gas requerido para completar el depósito en L2.
     * @param _data Datos opcionales para reenviar a L2. Estos datos se proporcionan
     *        únicamente para la comodidad de los contratos externos. Aparte de imponer una longitud máxima,
     *        estos contratos no ofrecen ninguna garantía sobre su contenido.
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

El mensaje aquí es para llamar a [la función `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) con estos parámetros:

| Parámetro                       | Valor                                                                                    | Significado                                                                                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | Valor especial para representar ETH (que no es un token ERC-20) en L1                                                                             |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | El contrato de L2 que gestiona ETH en Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (este contrato es solo para uso interno de Optimism) |
| \_from    | \_from                                                             | La dirección en L1 que envía el ETH                                                                                                                                  |
| \_to      | \_to                                                               | La dirección en L2 que recibe el ETH                                                                                                                                 |
| cantidad                        | msg.value                                                                | Cantidad de wei enviados (que ya han sido enviados al puente)                                                                                     |
| \_data    | \_data                                                             | Datos adicionales para adjuntar al depósito                                                                                                                          |

```solidity
        // Enviar datos de llamada a L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Enviar el mensaje a través del mensajero entre dominios.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Emitir un evento para informar de esta transferencia a cualquier aplicación descentralizada que escuche.

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

Estas dos funciones son envoltorios de `_initiateERC20Deposit`, la función que gestiona el depósito real de ERC-20.

```solidity
    /**
     * @dev Realiza la lógica de los depósitos informando al contrato de token
     * depositado en L2 del depósito y llamando a un manejador para bloquear los fondos de L1. (p. ej., transferFrom)
     *
     * @param _l1Token Dirección del ERC20 de L1 que estamos depositando
     * @param _l2Token Dirección del respectivo ERC20 de L2
     * @param _from Cuenta de la que se retira el depósito en L1
     * @param _to Cuenta a la que se entrega el depósito en L2
     * @param _amount Cantidad del ERC20 a depositar.
     * @param _l2Gas Límite de gas requerido para completar el depósito en L2.
     * @param _data Datos opcionales para reenviar a L2. Estos datos se proporcionan
     *        únicamente para la comodidad de los contratos externos. Aparte de imponer una longitud máxima,
     *        estos contratos no ofrecen ninguna garantía sobre su contenido.
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
        // Cuando se inicia un depósito en L1, el puente de L1 transfiere los fondos a sí mismo para futuras
        // retiradas. safeTransferFrom también comprueba si el contrato tiene código, por lo que esto fallará si
        // _from es una EOA o address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Las transferencias de tokens ERC-20 siguen un proceso diferente al de ETH:

1. El usuario (`_from`) otorga un permiso al puente para transferir los tokens apropiados.
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

        // Enviar datos de llamada a L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Añada la cantidad de tokens depositados a la estructura de datos `deposits`.
Podría haber varias direcciones en L2 que correspondan al mismo token ERC-20 de L1, por lo que no es suficiente usar el saldo del puente del token ERC-20 de L1 para hacer un seguimiento de los depósitos.

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

El puente de L2 envía un mensaje al mensajero entre dominios de L2, lo que hace que el mensajero entre dominios de L1 llame a esta función (una vez que se envíe en L1 [la transacción que finaliza el mensaje](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions), por supuesto).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Asegúrese de que este sea un mensaje _legítimo_, proveniente del mensajero entre dominios y originado en el puente de tokens de L2.
Esta función se utiliza para retirar ETH del puente, por lo que tenemos que asegurarnos de que solo sea llamada por el llamador autorizado.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

La forma de transferir ETH es llamar al destinatario con la cantidad de wei en el `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: Falló la transferencia de ETH");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Emitir un evento sobre la retirada.

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

Actualizar la estructura de datos `deposits`.

```solidity

        // Cuando se finaliza una retirada en L1, el puente de L1 transfiere los fondos al retirante
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporal - Migración de ETH *
     *****************************/

    /**
     * @dev Añade saldo de ETH a la cuenta. Esto está destinado a permitir que el ETH
     * se migre de una puerta de enlace antigua a una nueva.
     * NOTA: Esto se deja solo para una actualización para que podamos recibir el ETH migrado desde el
     * contrato antiguo
     */
    function donateETH() external payable {}
}
```

Había una implementación anterior del puente.
Cuando pasamos de esa implementación a esta, tuvimos que mover todos los activos.
Los tokens ERC-20 simplemente se pueden mover.
Sin embargo, para transferir ETH a un contrato se necesita la aprobación de ese contrato, que es lo que nos proporciona `donateETH`.

## Tokens ERC-20 en L2 {#erc-20-tokens-on-l2}

Para que un token ERC-20 encaje en el puente estándar, necesita permitir que el puente estándar, y _solo_ el puente estándar, mintee tokens.
Esto es necesario porque los puentes deben garantizar que el número de tokens que circulan en Optimism sea igual al número de tokens bloqueados dentro del contrato de puente de L1.
Si hay demasiados tokens en L2, algunos usuarios no podrían puentear sus activos de vuelta a L1.
En lugar de un puente de confianza, estaríamos esencialmente recreando la [banca de reserva fraccionaria](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Si hay demasiados tokens en L1, algunos de esos tokens permanecerían bloqueados dentro del contrato de puente para siempre, porque no hay forma de liberarlos sin quemar tokens de L2.

### IL2StandardERC20 {#il2standarderc20}

Cada token ERC-20 en L2 que utiliza el puente estándar necesita proporcionar [esta interfaz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), que tiene las funciones y eventos que el puente estándar necesita.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[La interfaz estándar ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) no incluye las funciones `mint` y `burn`.
Esos métodos no son requeridos por [el estándar ERC-20](https://eips.ethereum.org/EIPS/eip-20), que deja sin especificar los mecanismos para crear y destruir tokens.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[La interfaz ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) se utiliza para especificar qué funciones proporciona un contrato.
[Puede leer el estándar aquí](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Esta función proporciona la dirección del token de L1 que se transfiere a este contrato mediante un puente.
Tenga en cuenta que no tenemos una función similar en la dirección opuesta.
Necesitamos poder puentear cualquier token de L1, independientemente de si el soporte de L2 fue planeado cuando se implementó o no.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funciones y eventos para mintear (crear) y quemar (destruir) tokens.
El puente debe ser la única entidad que pueda ejecutar estas funciones para garantizar que el número de tokens sea correcto (igual al número de tokens bloqueados en L1).

### L2StandardERC20 {#L2StandardERC20}

[Esta es nuestra implementación de la interfaz `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
A menos que necesite algún tipo de lógica personalizada, debería usar esta.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[El contrato ERC-20 de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism no cree en reinventar la rueda, especialmente cuando la rueda está bien auditada y necesita ser lo suficientemente confiable como para albergar activos.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Estos son los dos parámetros de configuración adicionales que requerimos y que ERC-20 normalmente no tiene.

```solidity

    /**
     * @param _l2Bridge Dirección del puente estándar de L2.
     * @param _l1Token Dirección del token de L1 correspondiente.
     * @param _name Nombre del ERC20.
     * @param _symbol Símbolo del ERC20.
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

Primero, llame al constructor del contrato del que heredamos (`ERC20(_name, _symbol)`) y luego establezca nuestras propias variables.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Solo el puente L2 puede mintear y quemar");
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

Así es como funciona [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Cada interfaz es un número de funciones admitidas, y se identifica como el [o exclusivo](https://en.wikipedia.org/wiki/Exclusive_or) de los [selectores de función de ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) de esas funciones.

El puente de L2 utiliza ERC-165 como una comprobación de sanidad para asegurarse de que el contrato ERC-20 al que envía activos es un `IL2StandardERC20`.

**Nota:** No hay nada que impida que un contrato malicioso proporcione respuestas falsas a `supportsInterface`, por lo que este es un mecanismo de comprobación de sanidad, _no_ un mecanismo de seguridad.

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

Solo el puente de L2 puede mintear y quemar activos.

`_mint` y `_burn` se definen en realidad en el [contrato ERC-20 de OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Ese contrato simplemente no los expone externamente, porque las condiciones para mintear y quemar tokens son tan variadas como el número de formas de usar ERC-20.

## Código del puente de L2 {#l2-bridge-code}

Este es el código que ejecuta el puente en Optimism.
[El código fuente de este contrato está aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

La interfaz [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) es muy similar al [equivalente de L1](#IL1ERC20Bridge) que vimos anteriormente.
Existen dos diferencias significativas:

1. En L1 se inician los depósitos y se finalizan las retiradas.
   Aquí se inician las retiradas y se finalizan los depósitos.
2. En L1 es necesario distinguir entre ETH y tokens ERC-20.
   En L2 podemos usar las mismas funciones para ambos porque, internamente, los saldos de ETH en Optimism se gestionan como un token ERC-20 con la dirección [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev El puente estándar de L2 es un contrato que funciona junto con el puente estándar de L1 para
 * permitir las transiciones de ETH y ERC20 entre L1 y L2.
 * Este contrato actúa como un minteador de nuevos tokens cuando recibe información sobre depósitos en el puente
 * estándar de L1.
 * Este contrato también actúa como un quemador de los tokens destinados a la retirada, informando al puente de L1
 * para que libere los fondos de L1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Referencias a contratos externos *
     ********************************/

    address public l1TokenBridge;
```

Mantener un registro de la dirección del puente de L1.
Tenga en cuenta que, a diferencia del equivalente de L1, aquí _necesitamos_ esta variable.
La dirección del puente de L1 no se conoce de antemano.

```solidity

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Mensajero entre dominios utilizado por este contrato.
     * @param _l1TokenBridge Dirección del puente de L1 implementado en la cadena principal.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Retirada *
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

Estas dos funciones inician las retiradas.
Tenga en cuenta que no es necesario especificar la dirección del token de L1.
Se espera que los tokens de L2 nos indiquen la dirección equivalente en L1.

```solidity

    /**
     * @dev Realiza la lógica de las retiradas quemando el token e informando
     *      a la puerta de enlace de tokens de L1 de la retirada.
     * @param _l2Token Dirección del token de L2 donde se inicia la retirada.
     * @param _from Cuenta de la que se retira el token en L2.
     * @param _to Cuenta a la que se entrega la retirada en L1.
     * @param _amount Cantidad del token a retirar.
     * @param _l1Gas No se utiliza, pero se incluye para posibles consideraciones de compatibilidad futura.
     * @param _data Datos opcionales para reenviar a L1. Estos datos se proporcionan
     *        únicamente para la comodidad de los contratos externos. Aparte de imponer una longitud máxima,
     *        estos contratos no ofrecen ninguna garantía sobre su contenido.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Cuando se inicia una retirada, quemamos los fondos del retirante para evitar un uso posterior en L2
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Tenga en cuenta que _no_ estamos confiando en el parámetro `_from`, sino en `msg.sender`, que es mucho más difícil de falsificar (imposible, que yo sepa).

```solidity

        // Construir datos de llamada para l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

En L1 es necesario distinguir entre ETH y ERC-20.

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

        // Enviar mensaje al puente de L1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Función entre cadenas: Depósito *
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

Asegúrese de que el origen del mensaje sea legítimo.
Esto es importante porque esta función llama a `_mint` y podría usarse para dar tokens que no están cubiertos por los tokens que el puente posee en L1.

```solidity
        // Comprobar que el token de destino es compatible y
        // verificar que el token depositado en L1 coincide con la representación del token depositado en L2 aquí
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Comprobaciones de sanidad:

1. La interfaz correcta es compatible
2. La dirección de L1 del contrato ERC-20 de L2 coincide con el origen de los tokens en L1

```solidity
        ) {
            // Cuando se finaliza un depósito, acreditamos la cuenta en L2 con la misma cantidad de
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Si las comprobaciones de sanidad pasan, finalice el depósito:

1. Mintear los tokens
2. Emitir el evento apropiado

```solidity
        } else {
            // O bien el token de L2 en el que se está depositando no está de acuerdo con la dirección correcta
            // de su token de L1, o no admite la interfaz correcta.
            // Esto solo debería ocurrir si hay un token de L2 malicioso, o si un usuario de alguna manera
            // especificó la dirección de token de L2 incorrecta para depositar.
            // En cualquier caso, detenemos el proceso aquí y construimos un mensaje de retirada
            // para que los usuarios puedan recuperar sus fondos en algunos casos.
            // No hay forma de evitar por completo los contratos de tokens maliciosos, pero esto limita
            // los errores del usuario y mitiga algunas formas de comportamiento malicioso de los contratos.
```

Si un usuario cometió un error detectable al usar la dirección de token de L2 incorrecta, queremos cancelar el depósito y devolver los tokens en L1.
La única forma en que podemos hacer esto desde L2 es enviar un mensaje que tendrá que esperar el período de impugnación de errores, pero eso es mucho mejor para el usuario que perder los tokens permanentemente.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // se cambiaron _to y _from aquí para devolver el depósito al remitente
                _from,
                _amount,
                _data
            );

            // Enviar mensaje al puente de L1
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
Especialmente para las retiradas, la mayoría de los usuarios prefieren usar [puentes de terceros](https://optimism.io/apps#bridge) que no esperan el período de impugnación y no requieren una prueba de Merkle para finalizar la retirada.

Estos puentes suelen funcionar teniendo activos en L1, que proporcionan inmediatamente por una pequeña tarifa (a menudo menor que el coste de gas para una retirada de puente estándar).
Cuando el puente (o las personas que lo gestionan) prevé que se quedará sin activos en L1, transfiere suficientes activos desde L2. Como se trata de retiradas muy grandes, el coste de la retirada se amortiza sobre una gran cantidad y es un porcentaje mucho menor.

Esperamos que este artículo le haya ayudado a entender más sobre cómo funciona la capa 2 y cómo escribir código de Solidity que sea claro y seguro.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).
