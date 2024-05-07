---
title: "Una explicación del contrato ERC-20"
description: '¿Qué tiene el contrato OpenZeppelin ERC® y por qué está ahí?'
author: Ori Pomerantz
lang: es
tags:
  - "solidity"
  - "erc-20"
skill: beginner
published: 2021-03-09
---

## Introducción {#introduction}

Uno de los usos más comunes para Ethereum es que un grupo cree un token intercambiable, en cierto sentido su propia moneda. Estos tókenes normalmente siguen un estándar, el [ERC-20](/developers/docs/standards/tokens/erc-20/). Este estándar permite escribir herramientas, como reservas de liquidez y carteras, que funcionan con todos los tókenes ERC-20. En este artículo analizaremos la implementación de [OpenZeppelin Solidity ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), así como la [ definición de interfaz](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Este es un código fuente anotado. Si quiere implementar ERC-20, [lea este tutorial](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## La Interfaz {#the-interface}

El propósito de un estándar como ERC-20 es permitir la implementación de muchos tókenes y que sean interoperables a través de aplicaciones, como carteras e intercambios descentralizados. Para lograr esto, creamos una [interfaz](https://www.geeksforgeeks.org/solidity-basics-of-interface/). Cualquier código que necesite usar el contrato de tókenes puede usar las mismas definiciones en la interfaz y ser compatible con todos los contratos de token que lo usan, ya sea una cartera como MetaMask, una DApp como etherscan.io, o un contrato diferente como la reserva de liquidez.

![Illustración de la interfaz ERC-20](erc20_interface.png)

Si usted es un programador experto, problablemente recuerde haber visto estructuras similares en [Java](https://www.w3schools.com/java/java_interface.asp) o incluso en [archivos en encabezado C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Esta es la deinición de la [Interfaz ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) de OpenZeppelin. Es una derivación del [estándar legible por humanos](https://eips.ethereum.org/EIPS/eip-20) al código de Solidity. Por supuesto, esta interfaz por si sóla no define _como _ hacer nada. Esto se explica en el código fuente del contrato a continuación.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Se supone que los archivos de Solidity incluyen un identificador de licencia. [Puede ver la lista de licencias aquí](https://spdx.org/licenses/). Si necesita una licencia diferente, indíquelo en los comentarios.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

El lenguaje de Solidity sigue evolucionando rápidamente, y las nuevas versiones pueden que no sean compatibles con el antiguo código ([ver aquí](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Por lo tanto, es una buena idea especificar no solo una versión mínima del lenguaje, sino también una versión máxima: la última con la que probara el código.

&nbsp;

```solidity
/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
```

El `@dev` en el comentario es parte del [formato NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), utilizado para producir documentación desde el código fuente.

&nbsp;

```solidity
interface IERC20 {
```

Por convención, los nombres de interfaz comienzan por `I`.

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);
```

Esta función es `external`, lo que significa [que sólo puede ser activada desde fuera del contrato](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2). Devuelve el suministro total de tókenes en el contrato. Este valor se devuelve utilizando el tipo más común en Ethereum, 256 bits sin firma (256 bits es el tamaño nativo de la palabra de la EVM). Esta función también es una `view`, lo que significa que no cambia el estado, así que se puede ejecutar en un solo nodo en lugar de tener cada nodo en la cadena de bloques ejecutándolo. Este tipo de función no genera una transacción y no cuesta [gas](/developers/docs/gas/).

**Nota:** En teoría puede parecer que el creador de un contrato puede hacer trampas al devolver una oferta total menor que el valor real, haciendo que cada token parezca más valioso de lo que realmente es. Sin embargo, ese temor ignora la verdadera naturaleza de la cadena de bloques. Todo lo que pasa en la cadena de bloques puede verificarse en cada nodo. Para lograrlo, cada maquína de contrato, código de lenguaje y almacenamiento está disponible en cada nodo. Aunque no está obligado a publicar el código de Solidity para su contrato, nadie le tomaría en serio, a menos que publicase el código fuente y la versión de Solidity con la que se compiló, para que pueda verificarlo con respecto al código de lenguaje de la máquina que proporcionó. Por ejemplo, vea [este contrato](https://etherscan.io/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD#code).

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Como indica su nombre, `saldoDe` devuelve el saldo de una cuenta. Las cuentas de Ethereum son identificadas en Solidity usando el tipo de `dirección `, el cual contiene 160 bits. También es `externo` y `vista`.

&nbsp;

```solidity
    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

La función `transfer` transfiere tókenes de la persona que lo invoca a una dirección diferente. Esto incluye un cambio de estado, así que no es una `vista`. Cuando un usuario llama está función genera una transacción y cuesta gas. También emite un evento, `Transferir`, para informar a todos en la cadena de bloques del evento.

La función tiene dos resultados distintos, una para cada tipo de activación:

- Usuarios que invocan la función directamente desde una interfaz de usuario. Normalmente, el usuario envía una transacción y no espera una respuesta, lo que podría tomar una cantidad indefinida de tiempo. El usuario puede ver lo que ocurrió buscando el recibo de la transacción (que se identifica por el hash de la transacción) o buscando el evento `Transferir`.
- Otros contratos, que invocan la función como parte de una transacción general. Esos contratos obtienen resultados inmediatos, porque se ejecutan en la misma transacción, así que pueden usar el valor de retorno de la función.

El mismo tipo de resultados lo obtienen las otras funciones que cambian el estado del contrato.

&nbsp;

Las licencias permiten que una cuenta utilice algunos tókenes que pertenecen a un propietario diferente. Esto es útil, por ejemplo, para los contratos que actúan como vendedores. Los contratos no pueden controlar eventos, así que si un comprador transfiriera tókenes al contrato del vendedor directamente ese contrato no sabría si se ha pagado. En cambio, el comprador permite al contrato de vendedor utilizar una cierta cantidad, y el vendedor transfiere esa cantidad. Esto se hace a través de una función que invoca el contrato de vendedor, por lo que el contrato de vendedor puede saber si ha salido bien.

```solidity
    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

La función `allowance` permite a cualquiera consultar cuál es la asignación que una dirección (`owner`) permite que otra dirección (`spender`) se utilice.

&nbsp;

```solidity
    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

La función `approve` crea una asignación. Asegúrate de leer el mensaje sobre cómo se puede abusar de él. En Ethereum usted controla el orden de sus propias transacciones, pero no puede controlar el orden en el que se ejecutarán las transacciones de otras personas, a menos que no envíe su propia transacción hasta que vea que se ha producido la transacción del otro lado.

&nbsp;

```solidity
    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Por último, `transferirDesde` lo utiliza el gastador para utilizar realmente la asignación.

&nbsp;

```solidity

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Estos eventos se emiten cuando cambia el estado del contrato ERC-20.

## El contrato real {#the-actual-contract}

Este es el contrato real que implementa el estándar ERC-20, [tomado desde aquí](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). No está pensado para ser usado tal cual, pero puede [heredarlo](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) para pasarlo a algo utilizable.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Importar declaraciones {#import-statements}

Además de las definiciones de interfaz de arriba, la definición del contrato importa otros dos archivos:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` reúne las definiciones que se necesita utilizar [OpenGSN](https://www.opengsn.org/): un sistema que permite a los usuarios sin ether usar la cadena de bloques. Tenga en cuenta que esta es una versión antigua, si desea integrar con OpenGSN [utilice este tutorial](https://docs.opengsn.org/javascript-client/tutorial.html).
- [La biblioteca SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)que se utiliza para añadir y restar sin excesos. Esto es necesario, porque de lo contrario una persona podría tener un token, gastar dos tókenes y luego tener 2^256-1 tókenes.

&nbsp;

Este comentario explica la finalidad del contrato.

```solidity
/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. This behavior is nonetheless conventional
 * and does not conflict with the expectations of ERC20 applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */

```

### Composición del contrato {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Esta línea especifica la herencia, en este caso de `IERC20` desde arriba y `Context` para OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Esta línea une la biblioteca `SafeMath` al tipo `uint256`. Puede encontrar esta biblioteca [aquí](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definiciones de variables {#variable-definitions}

Estas definiciones especifican las variables de estado del contrato. Hay variables declaradas commo `privadas`, pero eso solo significa que otros contratos en la cadena de bloques no pueden leerlas. _No hay secretos en la cadena de bloques_, el software en cada nodo tiene el estado de cada contrato en cada bloque. Convencionalmente, a las variables de estado se les llama `_<something>`.

Las primeras dos variables son [mapeos](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), es decir, que se comportan aproximadamente igual que [matrices asociativas](https://wikipedia.org/wiki/Associative_array), con la salvedad de que las claves son valores numéricos. El almacenamiento solo se asigna para entradas que tienen valores diferentes del predeterminado (cero).

```solidity
    mapping (address => uint256) private _balances;
```

El primer mapeo, `_balances`, son direcciones y sus respectivos balances de este token. Para acceder al saldo, utilice esta frase: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Esta variable, `_allowances`, almacena las asignaciones explicadas anteriormente. El primer índice es el propietario de los tókenes, y el segundo es el contrato con la asignación. Para acceder a la dirección A puede gastar desde la dirección B de la cuenta, utilice `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Como el nombre sugiere, esta variable mantiene un seguimiento del suministro total de tókenes.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Estas tres variables se utilizan para mejorar la legibilidad. Las dos primeras son autoexplicativas, pero `_decimals` no lo es.

Por un lado, ethereum no tiene variables de punto flotante o fraccionales. Por otro lado, a los humanos les gusta poder dividir tókenes. Una de las razones por las que la gente se decantó por el oro como moneda fue que era difícil hacer intercambios cuando alguien quería comprar «gato por liebre».

La solución es llevar un registro de enteros, pero cuenta en lugar del token real un token fraccional que es cercano a no valer nada. En el caso del ether, el token fraccional se llama wei, y 10^18 wei es igual a un ETH. Al cierre de este artículo, 10.000.000.000.000 wei es aproximadamente un centavo de dólar estadounidense o euro.

Las aplicaciones necesitan saber cómo mostrar el saldo de tókenes. Si un usuario tiene 3.141.000.000.000.000.000 wei, ¿es eso 3,14 ETH? 31.41 ETH? ¿3,141 ETH? En el caso del ether se define 10^18 wei para el ETH, pero para su token puede seleccionar un valor diferente. Si dividir el token no tiene sentido, puede usar un valor de `_decimals` de cero. Si desea utilizar el mismo estándar que ETH, utilice el valor **18**.

### El constructor {#the-constructor}

```solidity
    /**
     * @dev Sets the values for {name} and {symbol}, initializes {decimals} with
     * a default value of 18.
     *
     * To select a different value for {decimals}, use {_setupDecimals}.
     *
     * All three of these values are immutable: they can only be set once during
     * construction.
     */
    constructor (string memory name_, string memory symbol_) public {
        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Se le llama constructor cuando se crea el contrato por primera vez. Convencionalmente, los parámetros de la función se llaman `<something>_`.

### Funciones de la interfaz de usuario {#user-interface-functions}

```solidity
    /**
     * @dev Returns the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * ether and wei. This is the value {ERC20} uses, unless {_setupDecimals} is
     * called.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Estas funciones, `name`, `symbol` y `decimals` ayudan a las interfaces de usuario a conocer su contrato, para que puedan mostrarlo correctamente.

El tipo de retorno es `memoria de cadena`, lo que significa que devuelve una cadena que se almacena en la memoria. Las variables, como cadenas, pueden almacenarse en tres ubicaciones:

|                | Tiempo de vida            | Acceso al contrato | Coste del gas                                                                   |
| -------------- | ------------------------- | ------------------ | ------------------------------------------------------------------------------- |
| Memoria        | Activación de una función | Leer/Escribir      | Decenas o centenas (más altas para ubicaciones más altas)                       |
| Calldata       | Activación de una función | Sólo lectura       | No se puede utilizar como tipo de retorno, solo un tipo de parámetro de función |
| Almacenamiento | Hasta que cambie          | Leer/Escribir      | Alta (800 para leer, 20.000 para escribir)                                      |

En este caso, `memory` es la mejor opción.

### Leer información del token {#read-token-information}

Estas son funciones que proporcionan información sobre el token, ya sea el suministro total o el saldo de una cuenta.

```solidity
    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

La función `totalSupply` devuelve el suministro total de tókenes.

&nbsp;

```solidity
    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Leer el saldo de una cuenta. Ten en cuenta que cualquiera puede obtener el saldo de otra persona. No tiene sentido intentar ocultar esta información, porque está disponible en cada nodo de todos modos. _No hay secretos en la cadena de bloques._

### Transferir tókenes {#transfer-tokens}

```solidity
    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

La función `transfer` se invoca para transferir tókenes desde la cuenta del remitente a otra diferente. Nótese que aunque devuelve un valor booleano, ese valor es siempre **verdadero o true**. Si la transferencia falla el contrato revierte la activación.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

La función `_transfer` hace el trabajo actual. Es una función privada que solo pueden activar otras funciones del contrato. Convencionalmente, a las funciones privadas se les llama `_<something>`, al igual que las variables de estado.

Normalmente, en Sodity usamos `msg.sender` para el remitente del mensaje. Sin embargo, eso rompe [OpenGSN](http://opengsn.org/). Si queremos permitir transacciones sin etherless con nuestro token, necesitamos usar `_msgSender()`. Devuelve `msg.sender` para transacciones normales, pero para las transacciones si ether devuelve el firmante original y no el contrato que reenvió el mensaje.

### Funciones de asignación {#allowance-functions}

Estas son las funciones que implementan la funcionalidad de asignación: `allowance`, `approve`, `transferFrom` y `_approve`. Adicionalmente, la implementación de OpenZeppelin va más allá de los estándares básicos para incluir algo de funcionalidad que mejora la seguridad: `increaseAllwance` y `decreaseAllowance`.

#### La función de «allowance» {#allowance}

```solidity
    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

La función `allowance` permite a todos revisar cualquier asignación.

#### La función de «approve» {#approve}

```solidity
    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Esta función se invoca para crear una asignación. Es similar a la función `transfer` que se encuentra más arriba:

- Esta función solo invoca una función interna (en este caso, `_approve`) que hace el verdadero trabajo.
- La función devuelve `true` (si tiene éxito) o revierte (si no lo tiene).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Usamos funciones internas para minimizar la cantidad de lugares donde suceden los cambios de estado. _Cualquier_ función que cambia el estado es un potencial riesgo de seguridad que necesita ser auditado por cuestiones de seguridad. De esta manera tenemos una menor probabilidad de hacerlo mal.

#### La función transferFrom {#transferFrom}

Esta es la función que un gastador llama para gastar en asignación. Esto requiere dos operaciones: transferir la cantidad gastada y reducir la asignación por esa cantidad.

```solidity
    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

La activación de la función `a.sub(b, "message")` hace dos cosas. Primero, calcula `a-b`, que es la nueva asignación. En segundo lugar, comprueba que este resultado no es negativo. Si es negativo la llamada se revierte con el mensaje proporcionado. Tenga en cuenta que cuando una activación revierte cualquier procesamiento realizado previamente durante esa activación se ignora, por lo tanto, no necesitamos deshacer la `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Adiciones de seguridad a OpenZeppelin {#openzeppelin-safety-additions}

Es peligroso establecer una asignación diferente de cero a otro valor distinto de cero, porque solo controla el orden de sus propias transacciones y no las de nadie más. Imagine que tiene dos usuarios: Alice que es ingenua y Bill que es un tramposo. Alice quiere algún servicio de Bill, que piensa que cuesta cinco tókenes, por lo que le da a Bill una asignación de cinco tókenes.

Entonces algo cambia y el precio de Bill sube a diez tókenes. Alice, quien todavía quiere el servicio, envía una transacción que establece la asignación de Bill a diez. En el momento en que Bill ve esta nueva transacción en el fondo de transacciones envía una transacción que gasta los cinco tókenes de Alice y tiene un mayor precio de gas por lo que se minará más rápido. De esa manera Bill puede gastar los primeros cinco tókenes y luego, una vez que se extraiga la nueva asignación de Alice gastará diez más por un precio total de quince tókenes. Más de lo que Alicia quería autorizar. A esta técnica se le llama [anticiparse](https://consensys.github.io/smart-contract-best-practices/attacks/#front-running).

| Transacción de Alice | Nonce de Alice | Transacción de Bill           | Nonce de Bill | Asignación de Bill | Ingresos totales de Bill procedentes de Alice |
| -------------------- | -------------- | ----------------------------- | ------------- | ------------------ | --------------------------------------------- |
| approve(Bill, 5)     | 10             |                               |               | 5                  | 0                                             |
|                      |                | transferFrom(Alice, Bill, 5)  | 10,123        | 0                  | 5                                             |
| approve(Bill, 10)    | 11             |                               |               | 10                 | 5                                             |
|                      |                | transferFrom(Alice, Bill, 10) | 10,124        | 0                  | 15                                            |

Para evitar este problema. estas dos funciones (`increaseAllowance` y `decreaseAllowance`) le permiten modificar la autorización en una cantidad específica. Así que si Bill ya había gastado cinco tókenes, solo podrá gastar cinco más. Dependiendo del momento, hay dos maneras en las que esto puede funcionar y en ambas Bill acaba recibiendo solo diez tókenes:

A:

| Transacción de Alice       | Nonce de Alice | Transacción de Bill          | Nonce de Bill | Asignación de Bill | Ingresos totales de Bill procedentes de Alice |
| -------------------------- | --------------:| ---------------------------- | -------------:| ------------------:| --------------------------------------------- |
| approve(Bill, 5)           |             10 |                              |               |                  5 | 0                                             |
|                            |                | transferFrom(Alice, Bill, 5) |        10,123 |                  0 | 5                                             |
| increaseAllowance(Bill, 5) |             11 |                              |               |            0+5 = 5 | 5                                             |
|                            |                | transferFrom(Alice, Bill, 5) |        10,124 |                  0 | 10                                            |

B:

| Transacción de Alice       | Nonce de Alice | Transacción de Bill           | Nonce de Bill | Asignación de Bill | Ingresos totales de Bill procedentes de Alice |
| -------------------------- | --------------:| ----------------------------- | -------------:| ------------------:| ---------------------------------------------:|
| approve(Bill, 5)           |             10 |                               |               |                  5 |                                             0 |
| increaseAllowance(Bill, 5) |             11 |                               |               |           5+5 = 10 |                                             0 |
|                            |                | transferFrom(Alice, Bill, 10) |        10,124 |                  0 |                                            10 |

```solidity
    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

La función `a.add(n)` es una adición segura. En el caso poco probable de que `a`+`b`>=`2^256` no se sume de la manera normal en que la adición lo hace.

```solidity

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funciones que modifican la información del token {#functions-that-modify-token-information}

Estas son las cuatro funciones que hacen el verdadero trabajo: `_transfer`, `_mint`, `_burn` y `_approve`.

#### La función \_transfer {#\_transfer}

```solidity
    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Esta función, `_transfer`, transfiere tókenes de una cuenta a otra. La invocan ambas funciones `transfer` (para transferencias desde la cuenta propia del emisor) y `transferFrom` (para usar asignaciones que transfieran desde la cuenta de alguien más).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Actualmente, nadie poseé la dirección cero en Ethereum (es decir, nadie conoce una clave privada cuya clave pública conocida se transforma en la dirección cero). Cuando las personas usan esa dirección, usualmente es un error del programa, por lo que fallamos si la dirección cero es usada como el emisor o receptor.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Hay dos maneras de usar este contrato:

1. Usarlo como plantilla para su propio código.
1. [Herédalo](https://www.bitdegree.org/learn/solidity-inheritance) y sobrescribir sólo aquellas funciones que necesite modificar.

El segundo método es mucho mejor pues el código ERC de OpenZeppelin ya ha sido auditado y demostrado ser seguro. Cuando utiliza la herencia queda claro cuáles son las funciones que modifica, y para confiar en su contrato, la gente sólo necesita auditar esas funciones específicas.

A menudo es útil realizar una función cada vez que los tókenes cambian de mano. Sin embargo,`_transfer` es una función muy importante y es posible escribirla de forma insegura (ver abajo), así que lo mejor no anularlo. La solución es `_beforeTokenTransfer`, una función de [gancho](https://wikipedia.org/wiki/Hooking). Puede anular esta función y se activará en cada transferencia.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Estas son las líneas que en realidad hacen la transferencia. Note que no hay **nada** entre ellas y que restamos la cantidad transferida desde el emisor antes de agregarla al receptor. Esto es importante, porque si se invocó un contrato diferente de por medio, este se pudo usar para engañar a este contrato. De esta manera la transferencia es atómica, nada puede suceder en medio.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Finalmente, emite un evento `Transfer`. Los eventos no son accesibles por los contratos inteligentes, pero el código en ejecución fuera de la cadena de bloques puede escuchar eventos y reaccionar a ellos. Por ejemplo, una billetera puede mantener un registro de cuando el propietario obtiene más tokens.

#### Las funciones \_mint y \_burn {#\_mint-y-\_burn}

Estas dos funciones (`_mint` y `_burn`) modifican el suministro total de tókenes. Son internas y no hay ninguna función que las invoque en este contrato, entonces sólo son útiles si las hereda desde un contrato y añade su propia lógica para decidir en qué condiciones quiere acuñar nuevos tóekens o quemar los existentes.

**NOTA:** cada token ERC-20 tiene su propia lógica de negocio que dicta la administración del token. Por ejemplo, un contrato de suministro fijo solo podría activar `_mint` en el constructor y nunca activar `_burn`. Un contrato que vende tókenes activará `_mint` cuando se pague y, presumiblemente, active `_burn` en cierto punto para evitar una inflación galopante.

```solidity
    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Asegúrese de actualizar `_totalSupply` cuando la cantidad total de tókenes cambie.

&nbsp;

```
    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

La función `_burn` es casi idéntica a `_mint`, excepto que esta va en otra dirección.

#### La función \_approve {#\_approve}

Esta es la función que actualmente especifica asignaciones. Observe que esta permite especificar una asignación que es mayor al balance actual de la cuenta del propietario. Esto es correcto, porque el saldo se revisa en el momento de la transferencia y puede ser diferente del saldo cuando se creó la asignación.

```solidity
    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Emite un evento `Approval`. Dependiendo de cómo se escriba la aplicación, se le puede informar al contrato gastador sobre la aprobación, ya sea por el propietario o por un servidor que escucha a estos eventos.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modificar la variable Decimals {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Sets {decimals} to a value other than the default one of 18.
     *
     * WARNING: This function should only be called from the constructor. Most
     * applications that interact with token contracts will not expect
     * {decimals} to ever change, and may work incorrectly if it does.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Esta función modifica la variable `_decimals` que sirve para decirle a las interfaces de usuario cómo deben interpretar la cantidad. Debería activarla desde el constructor. Sería desleal activarla desde cualquier punto subsecuente y las aplicaciones no están diseñadas para manejarla.

### Hooks {#hooks}

```solidity

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be to transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Esta es la función gancho a ser llamada durante las transferencias. Aquí está vacía, pero si necesita hacer algo puede sobrescribirla.

# Conclusión {#conclusion}

Para revisión, he aquí hay algunas de las ideas importantes en este contrato (en mi opinión, porque usted puede pensar de otra manera):

- _No hay secretos en la cadena de bloques._. Cualquier información a la que un contrato inteligente pueda acceder está disponible para todo el mundo.
- Puedes controlar el orden de tus propias transacciones, pero no cuando ocurren las transacciones de otras personas. Esta es la razón por la que cambiar una asignación puede ser peligroso, por que permite que el gastador gaste la suma de ambos permisos.
- Valores del tipo `uint256` se envuelven alrededor. En otras palabras_ 0-1=2^256-1_. Si no se desea ese comportamiento, tiene que comprobarlo (o use la biblioteca SafeMath, que lo hace en su nombre). Tome en cuenta que esto cambió en [ Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Haz todos los cambios de estado de un tipo específico en un lugar en específico, porque esto facilita la auditoría. Esta es la función que tenemos, por ejemplo, `_approve`, la cual se invoca mediante `approve`, `transferFrom`, `increaseAllowance` y `decreaseAllowance`
- Los cambios de estado deben ser atómicos, sin otra acción de por medio (como puedes ver en `_transfer`). Esto se debe a que durante el cambio de estado tiene un estado inconsistente. Por ejemplo, entre el momento en que deduce desde el saldo del emisor y el momento en que añade al saldo del receptor, hay menos tókenes en existencia de los que debería. Se podría abusar de esto potencialmente, si hay operaciones entre ellos, especialmente inivocadas a un contrato diferente.

Ahora que ha visto cómo se escribe un contrato ERC-20 de OpenZeppelin y especialmente cómo se hace más seguro, escriba sus propias aplicaciones y contratos seguros.
