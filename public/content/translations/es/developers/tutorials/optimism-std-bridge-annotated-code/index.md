---
title: "Recorrido por contrato de puente estándar de Optimism"
description: '¿Cómo funciona el puente estándar para Optimism? ¿Por qué funciona de esta forma?'
author: Ori Pomerantz
tags:
  - "solidity"
  - "puente"
  - "capa 2"
skill: intermediate
published: 2022-03-30
lang: es
---

[Optimism](https://www.optimism.io/) es un [Optimistic rollup](/developers/docs/scaling/optimistic-rollups/). Los Optimistic rollups pueden procesar transacciones por un precio mucho más bajo que la red principal de Ethereum (también conocida como capa 1 o L1) porque las transacciones solo son procesadas por unos pocos nodos, en lugar de cada nodo de la red. Al mismo tiempo, los datos se escriben en L1 para que todo pueda ser probado y reconstruido con todas las garantías de integridad y disponibilidad de la red principal.

Para utilizar activos de L1 en Optimism (o cualquier otra L2), los activos deben "[puentearse](/bridges/#prerequisites)". Una manera de lograr esto es que los usuarios bloqueen activos (ETH y los [tokens ERC-20](/developers/docs/standards/tokens/erc-20/) son los más comunes) en L1 y recibir activos equivalentes para usar en L2. Eventualmente, quien acabe poseyéndolos puede querer puentearlos de vuelta a la L1. Al hacer esto, los activos se queman en L2 y luego se liberan nuevamente al usuario en L1.

Así es como funciona el [puente estándar de Optimism](https://community.optimism.io/docs/developers/bridge/standard-bridge). En este artículo analizaremos el código fuente de ese puente para ver cómo funciona y lo estudiaremos como ejemplo de código de Solidity bien escrito.

## Flujos de control {#control-flows}

El puente tiene dos flujos principales:

- Depósito (de L1 a L2)
- Retiro (de L2 a L1)

### Flujo de depósito {#deposit-flow}

#### Capa 1 {#deposit-flow-layer-1}

1. Si se deposita un ERC-20, el depositante le da al puente una asignación para gastar la cantidad depositada.
2. El depositante llama al puente L1 (`depositERC20`, `depositERC20To`, `depositETH` o `depositETHTo`).
3. El puente L1 toma posesión del activo puenteado.
   - ETH: El activo es transferido por el depositante como parte de la llamada.
   - ERC-20: El activo es transferido por el puente a sí mismo utilizando la asignación proporcionada por el depositante.
4. El puente L1 utiliza el mecanismo de mensajes de dominio cruzado para llamar a `finalizeDeposit` en el puente L2

#### Capa 2 {#deposit-flow-layer-2}

5. El puente L2 verifica que la llamada a `finalizeDeposit` sea legítima:
   - Procede del contrato de mensajes de dominio cruzado
   - Era originalmente del puente en L1
6. El puente de L2 comprueba si el contrato de token ERC-20 en L2 es el correcto:
   - El contrato L2 informa de que su contraparte en L1 es la misma de la que provienen los tokens de L1
   - El contrato de L2 informa que soporta la interfaz correcta ([usando ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Si el contrato L2 es el correcto, llámelo para mintear el número apropiado de tokens a la dirección apropiada. Si no, inicie un proceso de retiro para permitir al usuario reclamar los tokens en L1.

### Flujo de retiro {#withdrawal-flow}

#### Capa 2 {#withdrawal-flow-layer-2}

1. El que hace el retiro llama al puente de L2 (`withdraw` o `withdrawTo`)
2. El puente L2 quema el número apropiado de tokens pertenecientes a `msg.sender`
3. El puente L2 utiliza el mecanismo de mensajes entre dominios para llamar a `finalizeETHWithdrawal` o `finalizeERC20Withdrawal` en el puente L1

#### Capa 1 {#withdrawal-flow-layer-1}

4. El puente L1 verifica que la llamada a `finalizeETHWithdrawal` o `finalizeERC20Withdrawal` sea legítima:
   - Procede del mecanismo de mensajes entre dominios
   - Era originalmente del puente en L2
5. El puente L1 transfiere el activo apropiado (ETH o ERC-20) a la dirección apropiada

## Código de capa 1 {#layer-1-code}

Este es el código que se ejecuta en L1, la Red principal de Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Esta interfaz se define aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol). Incluye funciones y definiciones requeridas para puentear tokens ERC-20.

```solidity
// SPDX-License-Identifier: MIT
```

[La mayor parte del código de Optimism se libera bajo la licencia MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Al momento de escribir este artículo, la última versión de Solidity es 0.8.12. Hasta que la versión 0.9.0 sea liberada, no sabemos si este código será compatible.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Events *
     **********/

    event ERC20DepositInitiated(
```

En la terminología de puentes de Optimism, _deposit_ significa transferir de L1 a L2, y _withdrawal_ significa transferir de L2 a L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

En la mayoría de los casos, la dirección de un ERC-20 en L1 no es la misma dirección del ERC-20 equivalente en L2. [Puede ver la lista de direcciones de tokens aquí](https://static.optimism.io/optimism.tokenlist.json). La dirección con `chainId` 1 está en L1 (Red Principal) y la dirección con `chainId` 10 está en L2 (Optimism). Los otros dos valores `chainId` son para la red de pruebas Kovan (42) y la red de pruebas Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Es posible agregar notas a las transferencias, en cuyo caso se añaden a los eventos que las reportan.

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

El mismo contrato de puente maneja las transferencias en ambas direcciones. En el caso del puente L1, esto significa inicialización de depósitos y finalización de retiros.

```solidity

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev get the address of the corresponding L2 bridge contract.
     * @return Address of the corresponding L2 bridge contract.
     */
    function l2TokenBridge() external returns (address);
```

Esta función no es realmente necesaria, porque en L2 es un contrato preimplementado, así que siempre está en la dirección `0x4200000000000000000000000000000000000010`. Está aquí por simetría con el puente L2, porque la dirección del puente L1 _no_ es trivial de conocer.

```solidity
    /**
     * @dev deposit an amount of the ERC20 to the caller's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _amount Amount of the ERC20 to deposit
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

El parámetro `_l2Gas` es la cantidad de gas de L2 que la transacción puede gastar. [Hasta cierto límite (alto), es gratuito](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), así que a menos que el contrato ERC haga algo realmente extraño a la hora de mintear, no debería ser un problema. Esta función se encarga del escenario común, donde un usuario puentea activos a la misma dirección en una cadena de bloques diferente.

```solidity
    /**
     * @dev deposit an amount of ERC20 to a recipient's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _to L2 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ERC20 token.
     * This call will fail if the initialized withdrawal from L2 has not been finalized.
     *
     * @param _l1Token Address of L1 token to finalizeWithdrawal for.
     * @param _l2Token Address of L2 token where withdrawal was initiated.
     * @param _from L2 address initiating the transfer.
     * @param _to L1 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _data Data provided by the sender on L2. This data is provided
     *   solely as a convenience for external contracts. Aside from enforcing a maximum
     *   length, these contracts provide no guarantees about its content.
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

Los retiros (y otros mensajes de L2 a L1) en Optimism son un proceso de dos pasos:

1. Una transacción iniciante en L2.
2. Una transacción de finalización o reclamación en L1. Esta transacción debe ocurrir después de que finalice el [periodo de desafío (o reclamo) por falta](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) para la transacción L2.

### IL1StandardBridge {#il1standardbridge}

[Esta interfaz se define aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol). Este archivo contiene definiciones de eventos y funciones para ETH. Estas definiciones son muy similares a las definidas en `IL1ERC20Bridge` arriba para ERC-20.

La interfaz de puente está dividida entre dos archivos porque algunos tokens ERC-20 requieren un procesamiento personalizado y no pueden ser manejados por el puente estándar. De esta manera, el puente personalizado que maneja tal token puede implementar `IL1ERC20Bridge` y no tener que puentear también ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Events *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Este evento es casi idéntico a la versión ERC-20 (`ERC20DepositInitiated`), excepto que no incluye las direcciones del token en L1 y L2. Lo mismo es válido para otros eventos y las funciones.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev Deposit an amount of the ETH to the caller's balance on L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposit an amount of ETH to a recipient's balance on L2.
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
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ETH token. Since only the xDomainMessenger can call this function, it will never be called
     * before the withdrawal is finalized.
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

[Esta interfaz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) le dice al contrato cómo enviar mensajes a la otra capa usando el mensajero de dominio cruzado. Este mensajero de dominio cruzado es un sistema completamente diferente y merece su propio artículo, que espero escribir en el futuro.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Helper contract for contracts performing cross-domain communications
 *
 * Compiler used: defined by inheriting contract
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Messenger contract used to send and receive messages from the other domain.
    address public messenger;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Address of the CrossDomainMessenger on the current layer.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

El único parámetro que el contrato necesita saber, la dirección del mensajero de dominio cruzado en esta capa. Este parámetro se establece una vez, en el constructor, y nunca cambia.

```solidity

    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Enforces that the modified function is only callable by a specific cross-domain account.
     * @param _sourceDomainAccount The only account on the originating domain which is
     *  authenticated to call this function.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

La mensajería entre dominios es accesible para cualquier contrato en la cadena de bloques donde se esté ejecutando (ya sea la Red Principal de Ethereum u Optimism). Pero necesitamos que el puente de cada lado _solo_ confíe en ciertos mensajes si provienen del puente del otro lado.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Solo se puede confiar en los mensajes del mensajero de dominio cruzado apropiado (`messenger`, como ve a continuación).

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

La forma en que el mensajero de dominio cruzado proporciona la dirección que envió un mensaje con la otra capa es [la función `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128). Siempre y cuando se la llame en la transacción iniciada por el mensaje, puede proporcionar esta información.

Tenemos que asegurarnos de que el mensaje que recibimos haya venido del otro puente.

```solidity

        _;
    }

    /**********************
     * Internal Functions *
     **********************/

    /**
     * Gets the messenger, usually from storage. This function is exposed in case a child contract
     * needs to override.
     * @return The address of the cross-domain messenger contract which should be used.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Esta función devuelve el mensajero de dominio cruzado. Utilizamos una función en lugar de la variable `messenger` para permitir que los contratos que heredan de esta usen un algoritmo para especificar qué mensajero de dominio cruzado usar.

```solidity

    /**
     * Sends a message to an account on another domain
     * @param _crossDomainTarget The intended recipient on the destination domain
     * @param _message The data to send to the target (usually calldata to a function with
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit The gasLimit for the receipt of the message on the target domain.
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

[Slither](https://github.com/crytic/slither) es un analizador estático que Optimism ejecuta en cada contrato para buscar vulnerabilidades y otros potenciales problemas. En este caso, la siguiente línea dispara o activa dos vulnerabilidades:

1. [Eventos de reentrada](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Reentrada benigna](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

En este caso no estamos preocupados sobre reentradas, ya que sabemos que `getCrossDomainMessenger()` devuelve una dirección confiable, incluso si Slither no tiene manera de saberlo.

### El contrato de puente L1 {#the-l1-bridge-contract}

[El códgo fuente para este contrato está aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Las interfaces pueden ser parte de otros contratos, por lo que tienen que admitir un amplio rango de versiones de Solidity. Pero el puente en sí es nuestro contrato, y podemos ser estrictos en cuanto a la versión de Solidity utilizada.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) y [IL1StandardBridge](#IL1StandardBridge) se explican arriba.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Esta interfaz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) nos permite crear mensajes para controlar el puente estándar en L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Esta interfaz](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nos permite controlar contratos ERC-20. [Puede leer más al respecto aquí](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Como se explicó más arriba](#crossdomainenabled), este contrato se utiliza para mensajes entre capas.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) tiene las direcciones para los contratos en L2 que siempre tienen la misma dirección. Esto incluye el puente estándar en L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Utilidades de dirección de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Se utiliza para distinguir entre las direcciones del contrato y las que pertenecen a cuentas de propiedad externa (EOA).

Tenga en cuenta que esta no es una solución perfecta, porque no hay forma de distinguir entre llamadas directas y llamadas hechas desde el constructor de un contrato, pero al menos esto nos permite identificar y prevenir algunos errores de usuario comunes.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[El estándar ERC-20](https://eips.ethereum.org/EIPS/eip-20) permite dos formas para que un contrato reporte fallas:

1. Revertir
2. Devolver `false`

Manejar ambos casos complicaría nuestro código, así que en su lugar utilizamos [SafeERC20` de OpenZeppelin`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), el cual asegura que [todas las fallas resulten en una reversión](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev The L1 ETH and ERC20 Bridge is a contract which stores deposited L1 funds and standard
 * tokens that are in use on L2. It synchronizes a corresponding L2 Bridge, informing it of deposits
 * and listening to it for newly finalized withdrawals.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Esta línea es cómo especificamos usar el wrapper `SafeERC20` cada vez que usamos la interfaz `IERC20`.

```solidity

    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;
```

La dirección de [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Maps L1 token to L2 token to balance of the L1 token deposited
    mapping(address => mapping(address => uint256)) public deposits;
```

Un [mapeo](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) doble como este es la forma en que se define una [sparse array bidimensional](https://en.wikipedia.org/wiki/Sparse_matrix). Los valores de esta estructura de datos se identifican como `deposit[L1 token addr][L2 token addr]`. El valor por defecto es cero. Solo las celdas configuradas con un valor diferente se escriben en el almacenamiento.

```solidity

    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused.
    constructor() CrossDomainEnabled(address(0)) {}
```

Para poder actualizar este contrato sin tener que copiar todas las variables en el almacenamiento. Para ello usamos un [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), un contrato que usa [`delegatecall`](https://solidity-by-example.org/delegatecall/) para transferir llamadas a un contacto separado cuya dirección se almacena en el contrato proxy (cuando actualiza le dice al proxy que cambie esa dirección). Cuando usa `delegatecall` el almacenamiento sigue siendo el almacenamiento del contrato _invocante_, así que los valores de todas las variables de estado del contrato no se vean afectados.

Un efecto de este patrón es que el almacenamiento del contrato _invocado_ de `delegatecall` no se utiliza y, por tanto, los valores del constructor que le son pasados no importan. Esta es la razón por la que podemos proporcionar un valor sin sentido al constructor `CrossDomainEnabled`. También es la razón por la que la inicialización siguiente es independiente del constructor.

```solidity
    /******************
     * Initialization *
     ******************/

    /**
     * @param _l1messenger L1 Messenger address being used for cross-chain communications.
     * @param _l2TokenBridge L2 standard bridge address.
     */
    // slither-disable-next-line external-function
```

Esta [prueba de Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifica funciones que no son llamadas desde el código del contrato y, por lo tanto, podrían declararse como `external` en lugar de `public`. El costo de gas de las funciones `external` puede ser menor, porque pueden ser proporcionadas con parámetros en los datos de llamada. Las funciones declaradas como `public` deben ser accesibles desde el contrato. Los contratos no pueden modificar sus propios datos de llamada, por lo que los parámetros deben estar en memoria. Cuando se llama a tal función externamente, es necesario copiar los datos de llamada en la memoria, lo que cuesta gas. En este caso se invoca la función solo una vez, por lo que la ineficiencia no nos importa.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

La función `initialize` debe ser invocada una única vez. Si la dirección del mensajero de dominio cruzado L1 o el puente del token L2 cambia, creamos un nuevo proxy y un nuevo puente que lo llame. Es poco probable que esto ocurra, excepto cuando se actualiza todo el sistema, algo muy raro.

Tenga en cuenta que esta función no tiene ningún mecanismo que restrinja _quién_ puede llamarlo. Esto significa que en teoría un atacante podría esperar hasta que implementemos el proxy y la primera versión del puente, y luego hacer [front-run](https://solidity-by-example.org/hacks/front-running/) para llegar a la función `initialize` antes de que el usuario legítimo lo haga. Pero hay dos métodos para prevenir esto:

1. Si los contratos son implementados no directamente por una EOA, sino [en una transacción que hace que otro contrato los cree](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), el proceso completo puede ser atómico y terminar antes de que se ejecute cualquier otra transacción.
2. Si falla la llamada legítima a `initialize`, siempre es posible ignorar el proxy y el puente recién creados, y crear otros.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Estos son los dos parámetros que el puente necesita conocer.

```solidity

    /**************
     * Depositing *
     **************/

    /** @dev Modifier requiring sender to be EOA.  This check could be bypassed by a malicious
     *  contract via initcode, but it takes care of the user error we want to avoid.
     */
    modifier onlyEOA() {
        // Used to stop deposits from contracts (avoid accidentally lost tokens)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Esta es la razón por la que necesitábamos las utilidades de `Address` de OpenZeppelin.

```solidity
    /**
     * @dev This function can be called with no data
     * to deposit an amount of ETH to the caller's balance on L2.
     * Since the receive function doesn't take data, a conservative
     * default amount is forwarded to L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Esta función existe con fines de prueba. Tenga en cuenta que no aparece en las definiciones de la interfaz: no es para uso normal.

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

Estas dos funciones son wrappers alrededor de `_initiateETHDeposit`, la función que gestiona el depósito de ETH real.

```solidity
    /**
     * @dev Performs the logic for deposits by storing the ETH and informing the L2 ETH Gateway of
     * the deposit.
     * @param _from Account to pull the deposit from on L1.
     * @param _to Account to give the deposit to on L2.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construct calldata for finalizeDeposit call
        bytes memory message = abi.encodeWithSelector(
```

La forma en que funcionan los mensajes entre dominios es que el contrato de destino es llamado con el mensaje como sus datos de llamada. Los contratos de Solidity interpretan siempre sus datos de llamada de acuerdo con las [especificaciones de la ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html). La función de Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) crea esos datos de llamada.

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

| Parámetro   | Valor                            | Significado                                                                                                                                      |
| ----------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| \_l1Token | address(0)                       | Valor especial para representar ETH (que no es un token ERC-20) en L1                                                                            |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | El contrato L2 que administra ETH en Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (este contrato es solo para uso interno en Optimism) |
| \_from    | \_from                         | La dirección en L1 que envía el ETH                                                                                                              |
| \_to      | \_to                           | La dirección en L2 que recibe el ETH                                                                                                             |
| amount      | msg.value                        | Cantidad de wei enviado (que ya ha sido enviado al puente)                                                                                       |
| \_data    | \_data                         | Fecha adicional a adjuntar al depósito                                                                                                           |

```solidity
        // Send calldata into L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Enviar el mensaje a través del mensajero de dominio cruzado.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Emitir un evento para informar de cualquier aplicación descentralizada que escuche esta transferencia.

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

Estas dos funciones son wrappers alrededor de `_initiateERC20Deposit`, la función que gestiona el depósito de ERC-20 real.

```solidity
    /**
     * @dev Performs the logic for deposits by informing the L2 Deposited Token
     * contract of the deposit and calling a handler to lock the L1 funds. (e.g. transferFrom)
     *
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _from Account to pull the deposit from on L1
     * @param _to Account to give the deposit to on L2
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

Esta función es similar a la función `_initiateETHDeposit` anterior, con algunas diferencias importantes. La primera diferencia es que esta función recibe las direcciones del token y la cantidad a transferir como parámetros. En el caso de ETH la llamada al puente ya incluye la transferencia del activo a la cuenta del puente (`msg.value`).

```solidity
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if
        // _from is an EOA or address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Las transferencias de tokens ERC-20 siguen un proceso diferente de ETH:

1. El usuario (`_from`) le da una autorización al puente para transferir los tokens apropiados.
2. El usuario llama al puente con la dirección del contrato de token, la cantidad, etc.
3. El puente transfiere los tokens (a sí mismo) como parte del proceso de depósito.

El primer paso puede ocurrir en una transacción separada de los dos últimos. Sin embargo, hacer front-running no es un problema porque las dos funciones que llaman a `_initiateERC20Deposit` (`depositERC20` y `depositERC20To`) solo llaman a esta función con `msg.sender` como el parámetro `_from`.

```solidity
        // Construct calldata for _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Send calldata into L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Añada la cantidad de tokens depositados a la estructura de datos de `deposits`. Podría haber varias direcciones en L2 que correspondan al mismo token ERC-20 L1, por lo que no es suficiente usar el saldo del puente del token ERC-20 L1 para hacer un seguimiento de los depósitos.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Cross-chain Functions *
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

El puente de L2 envía un mensaje al mensajero de dominio cruzado L2 que hace que el mensajero de dominio cruzado L1 llame a esta función (una vez que [la transacción que finaliza el mensaje](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) se envíe en L1, por supuesto).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Asegúrese de que este sea un mensaje _legítimo_, proveniente del mensajero de dominio cruzado y que se origine con el puente de token L2. Esta función se utiliza para retirar ETH del puente, así que tenemos que asegurarnos de que solo sea invocada por el llamador autorizado.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

La forma de transferir ETH es llamar al destinatario con la cantidad de wei en el `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Emita un evento sobre el retiro.

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

Esta función es similar a la función `finalizeETHWithdrawal` anterior, con los cambios necesarios para los tokens ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Actualizar la estructura de datos de `deposits`.

```solidity

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the funds to the withdrawer
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporary - Migrating ETH *
     *****************************/

    /**
     * @dev Adds ETH balance to the account. This is meant to allow for ETH
     * to be migrated from an old gateway to a new gateway.
     * NOTE: This is left for one upgrade only so we are able to receive the migrated ETH from the
     * old contract
     */
    function donateETH() external payable {}
}
```

Había una implementación anterior del puente. Cuando pasamos de la implementación a esta, tuvimos que mover todos los activos. Los tokens ERC-20 pueden moverse sin más. Sin embargo, para transferir ETH a un contrato, necesita la aprobación de ese contrato, que es lo que `donateETH` nos proporciona.

## Tokens ERC-20 en L2 {#erc-20-tokens-on-l2}

Para que un token ERC-20 se ajuste al puente estándar, necesita permitir que el puente estándar, y _solo_ el puente estándar, mintee tokens. Esto es necesario porque los puentes deben garantizar que el número de tokens que circulan en Optimism sea igual al número de tokens que se encuentran bloqueados dentro del contrato de puente L1. Si hay demasiados tokens en L2, algunos usuarios no podrían puentear sus activos de vuelta a L1. En lugar de un puente de confianza, esencialmente recrearíamos [banca de reserva fraccionaria](https://www.investopedia.com/terms/f/fractionalreservebanking.asp). Si hay demasiados tokens en L1, algunos de esos tokens permanecerían bloqueados dentro del contrato de puente para siempre porque no hay forma de liberarlos sin quemar los tokens de L2.

### IL2StandardERC20 {#il2standarderc20}

Todos los tokens ERC-20 en L2 que utilicen el puente estándar deben proporcionar [esta interfaz](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), que tiene las funciones y eventos que el puente estándar necesita.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[La interfaz estándar ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) no incluye las funciones `mint` y `burn`. Esos métodos no son requeridos por [el estándar ERC-20](https://eips.ethereum.org/EIPS/eip-20), lo que deja sin especificar los mecanismos para crear y destruir tokens.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[La interfaz ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) se utiliza para especificar qué funciones proporciona un contrato. [Puede leer el estándar aquí](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Esta función proporciona la dirección del token L1 puenteado a este contrato. Tenga en cuenta que no tenemos una función similar en la dirección opuesta. Tenemos que ser capaces de puentear cualquier token L1, independientemente de que el soporte a L2 se haya planificado o no cuando se implementó.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funciones y eventos para mintear (cear) y quemar (destruir) tokens. El puente debe ser la única entidad que puede ejecutar estas funciones para asegurar que el número de tokens sea correcto (igual al número de tokens bloqueados en L1).

### L2StandardERC20 {#L2StandardERC20}

[Esta es nuestra implementación de la interfaz `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol). A menos que necesite algún tipo de lógica personalizada, debería utilizar esta.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[El contrato OpenZeppelin ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Optimism no cree en reinventar la rueda, especialmente cuando la rueda está bien auditada y necesita ser lo suficientemente fiable como para mantener los activos.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Estos son los dos parámetros de configuración adicionales que requerimos, y ERC-20 normalmente no lo hace.

```solidity

    /**
     * @param _l2Bridge Address of the L2 standard bridge.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC20 name.
     * @param _symbol ERC20 symbol.
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

Primero llamamos al constructor del contrato del que heredamos (`ERC20(_name, _symbol)`) y luego establecemos nuestras propias variables.

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

Esta es la manera en que funciona [ERC-165](https://eips.ethereum.org/EIPS/eip-165). Cada interfaz es un número de funciones soportadas, y se identifica como la [exclusiva o](https://en.wikipedia.org/wiki/Exclusive_or) de los [selectores de funciones ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) de esas funciones.

El puente L2 utiliza ERC-165 como sanity check (comprobación de cordura) para asegurarse de que el contrato ERC-20 al que envía activos sea un `IL2StandardERC20`.

**Nota:** No hay nada que impida que un contrato deshonesto proporcione respuestas falsas a `supportsInterface`, por lo que esto es un mecanismo de comprobación de cordura, _no_ un mecanismo de seguridad.

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

Solo el puente L2 puede mintear y quemar activos.

`_mint` y `_burn` están en realidad definidos en el [contrato OpenZeppelin ERC-20](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn). Ese contrato simplemente no los expone externamente, porque las condiciones para mintear y quemar tokens son tan variadas como el número de maneras de usar ERC-20.

## Código del puente L2 {#l2-bridge-code}

Este es el código que ejecuta el puente en Optimism. [La fuente de este contrato está aquí](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

La interfaz [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) es muy similar a la [equivalente en L1](#IL1ERC20Bridge) que vimos arriba. Hay dos diferencias significativas:

1. En L1 usted inicia depósitos y finaliza retiros. Aquí usted inicia retiros y finaliza depósitos.
2. En L1 es necesario distinguir entre ETH y tokens ERC-20. En L2 podemos usar las mismas funciones para ambos porque internamente los saldos de ETH en Optimism son manejados como un token ERC-20 con la dirección [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD000](https://optimistic.etherscan.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev The L2 Standard bridge is a contract which works together with the L1 Standard bridge to
 * enable ETH and ERC20 transitions between L1 and L2.
 * This contract acts as a minter for new tokens when it hears about deposits into the L1 Standard
 * bridge.
 * This contract also acts as a burner of the tokens intended for withdrawal, informing the L1
 * bridge to release L1 funds.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * External Contract References *
     ********************************/

    address public l1TokenBridge;
```

Mantener un registro de la dirección del puente L1. Tenga en cuenta que en contraste con el equivalente en L1, aquí _necesitamos_ esta variable. La dirección del puente L1 no se conoce de antemano.

```solidity

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Cross-domain messenger used by this contract.
     * @param _l1TokenBridge Address of the L1 bridge deployed to the main chain.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Withdrawing *
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

Estas dos funciones inician retiros. Tenga en cuenta que no hay necesidad de especificar la dirección del token L1. Se espera que los tokens L2 nos indiquen la dirección equivalente en L1.

```solidity

    /**
     * @dev Performs the logic for withdrawals by burning the token and informing
     *      the L1 token Gateway of the withdrawal.
     * @param _l2Token Address of L2 token where withdrawal is initiated.
     * @param _from Account to pull the withdrawal from on L2.
     * @param _to Account to give the withdrawal to on L1.
     * @param _amount Amount of the token to withdraw.
     * @param _l1Gas Unused, but included for potential forward compatibility considerations.
     * @param _data Optional data to forward to L1. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // When a withdrawal is initiated, we burn the withdrawer's funds to prevent subsequent L2
        // usage
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Tenga en cuenta que _no_ usamos el parámetro `_from`, sino `msg.sender`, que es mucho más difícil de falsificar (imposible, por lo que sé).

```solidity

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

En L1 es necesario distinguir entre ETH y tokens ERC-20.

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

        // Send message up to L1 bridge
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Cross-chain Function: Depositing *
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

Asegúrese de que la fuente del mensaje es legítima. Esto es importante porque esta función llama a `_mint` y podría ser usada para entregar tokens que no estén cubiertos por los tokens que el puente posee en L1.

```solidity
        // Check the target token is compliant and
        // verify the deposited token on L1 matches the L2 deposited token representation here
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Pruebas de cordura (sanity checks):

1. Se admite la interfaz correcta.
2. La dirección L1 del contrato ERC-20 L2 coincide con la fuente L1 de los tokens.

```solidity
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Si las pruebas de cordura son satisfactorias, finalice el depósito:

1. Mintee los tokens
2. Emita el evento apropiado

```solidity
        } else {
            // Either the L2 token which is being deposited-into disagrees about the correct address
            // of its L1 token, or does not support the correct interface.
            // This should only happen if there is a  malicious L2 token, or if a user somehow
            // specified the wrong L2 token address to deposit into.
            // In either case, we stop the process here and construct a withdrawal
            // message so that users can get their funds out in some cases.
            // There is no way to prevent malicious token contracts altogether, but this does limit
            // user error and mitigate some forms of malicious contract behavior.
```

Si un usuario realizó un error detectable mediante el uso de la dirección de token L2 incorrecta, queremos cancelar el depósito y devolver los tokens en L1. La única forma de hacerlo desde L2 es enviar un mensaje que tenga que esperar el período de desafío por falta, pero eso es mucho mejor para el usuario que perder los tokens permanentemente.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // switched the _to and _from here to bounce back the deposit to the sender
                _from,
                _amount,
                _data
            );

            // Send message up to L1 bridge
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Conclusión {#conclusion}

El puente estándar es el mecanismo más flexible para las transferencias de activos. Sin embargo, debido a que es muy genérico, no siempre es el mecanismo más fácil de utilizar. Especialmente para los retiros, la mayoría de los usuarios prefieren usar [puentes de terceros](https://www.optimism.io/apps/bridges) que no esperen el periodo de desafío y no requieran una prueba de Merkle para finalizar el retiro.

Estos puentes normalmente funcionan teniendo activos en L1, que proporcionan inmediatamente por una pequeña tarifa (a menudo menor que el costo del gas para un retiro de puente estándar). Cuando el puente (o la gente que lo ejecuta) anticipa quedarse con pocos activos en L1, transfiere suficientes activos de L2. Como se trata de retiros muy grandes, el costo de la retirada se amortiza en grandes cantidades y resulta en un porcentaje mucho menor.

Esperemos que este artículo le haya ayudado a entender más sobre cómo funciona la capa 2 y cómo escribir código de Solidity de manera clara y segura.
