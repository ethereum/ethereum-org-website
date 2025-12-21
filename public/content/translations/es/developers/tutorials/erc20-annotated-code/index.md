---
title: "Explicación del contrato ERC-20"
description: ¿Qué contiene el contrato ERC-20 de OpenZeppelin y por qué está ahí?
author: Ori Pomerantz
lang: es
tags: [ "Solidity", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## Introducción {#introduction}

Uno de los usos más comunes para Ethereum es que un grupo cree un token intercambiable, en cierto sentido su propia moneda. Estos tokens suelen seguir un estándar,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Este estándar hace posible escribir herramientas, como pools de liquidez y billeteras, que funcionen con todos los tokens
ERC-20. En este artículo analizaremos la
implementación de [Solidity ERC20 de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), así como la
[definición de la interfaz](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Este es un código fuente comentado. Si desea implementar un ERC-20,
[lea este tutorial](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## La interfaz {#the-interface}

El propósito de un estándar como ERC-20 es permitir implementaciones de muchos tokens que sean interoperables en todas las aplicaciones, como billeteras e intercambios descentralizados. Para lograrlo, creamos una
[interfaz](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Cualquier código que necesite usar el contrato del token
puede usar las mismas definiciones en la interfaz y ser compatible con todos los contratos de token que lo usan, ya sea una billetera como
MetaMask, una dapp como etherscan.io, o un contrato diferente como un pool de liquidez.

![Ilustración de la interfaz ERC-20](erc20_interface.png)

Si es un programador experimentado, probablemente recuerde haber visto construcciones similares en [Java](https://www.w3schools.com/java/java_interface.asp)
o incluso en [archivos de cabecera de C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Esta es una definición de la [interfaz ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
de OpenZeppelin. Es una traducción del [estándar legible por humanos](https://eips.ethereum.org/EIPS/eip-20) a código de Solidity. Por supuesto, la
interfaz en sí no define _cómo_ hacer nada. Eso se explica en el código fuente del contrato a continuación.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Se supone que los archivos de Solidity incluyen un identificador de licencia. [Puede ver la lista de licencias aquí](https://spdx.org/licenses/). Si necesita una licencia
diferente, solo explíquelo en los comentarios.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

El lenguaje de Solidity todavía evoluciona rápidamente y las nuevas versiones pueden no ser compatibles con el código antiguo
([ver aquí](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Por lo tanto, es una buena idea especificar no solo una versión mínima
del lenguaje, sino también una versión máxima, la última con la que probó el código.

&nbsp;

```solidity
/**
 * @dev Interfaz del estándar ERC20 tal como se define en el EIP.
 */
```

El `@dev` en el comentario forma parte del [formato NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), que se utiliza para generar
documentación a partir del código fuente.

&nbsp;

```solidity
interface IERC20 {
```

Por convención, los nombres de las interfaces empiezan por `I`.

&nbsp;

```solidity
    /**
     * @dev Devuelve la cantidad de tokens existentes.
     */
    function totalSupply() external view returns (uint256);
```

Esta función es `external`, lo que significa que [solo se puede llamar desde fuera del contrato](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Devuelve el suministro total de tokens en el contrato. Este valor se devuelve utilizando el tipo más común en Ethereum, entero sin signo de 256 bits (256 bits es el
tamaño de palabra nativo de la EVM). Esta función es también una `view`, lo que significa que no cambia el estado, por lo que se puede ejecutar en un solo nodo en lugar de que
la ejecute cada nodo de la blockchain. Este tipo de función no genera una transacción y no cuesta [gas](/developers/docs/gas/).

**Nota:** En teoría, podría parecer que el creador de un contrato puede hacer trampa devolviendo un suministro total más pequeño que el valor real, haciendo que cada token parezca
más valioso de lo que realmente es. Sin embargo, ese temor ignora la verdadera naturaleza de la blockchain. Todo lo que sucede en la blockchain puede ser verificado por
cada nodo. Para lograrlo, el código de lenguaje de máquina y el almacenamiento de cada contrato están disponibles en cada nodo. Aunque no es obligatorio que publique el código de
Solidity de su contrato, nadie lo tomaría en serio a menos que publique el código fuente y la versión de Solidity con la que fue compilado, para que pueda
ser verificado con el código de lenguaje de máquina que proporcionó.
Por ejemplo, vea [este contrato](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Devuelve la cantidad de tokens que posee la `cuenta`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Como su nombre indica, `balanceOf` devuelve el saldo de una cuenta. Las cuentas de Ethereum se identifican en Solidity utilizando el tipo `address`, que contiene 160 bits.
También es `external` y `view`.

&nbsp;

```solidity
    /**
     * @dev Mueve la `cantidad` de tokens de la cuenta del llamante al `destinatario`.
     *
     * Devuelve un valor booleano que indica si la operación tuvo éxito.
     *
     * Emite un evento {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

La función `transfer` transfiere tokens del llamante a una dirección diferente. Esto implica un cambio de estado, por lo que no es una `view`.
Cuando un usuario llama a esta función, crea una transacción y consume gas. También emite un evento, `Transfer`, para informar a todo el mundo en
la blockchain del evento.

La función tiene dos tipos de salida para dos tipos diferentes de llamantes:

- Usuarios que llaman a la función directamente desde una interfaz de usuario. Normalmente, el usuario envía una transacción
  y no espera una respuesta, lo que podría llevar una cantidad de tiempo indefinida. El usuario puede ver lo que ha ocurrido
  buscando el recibo de la transacción (que se identifica por el hash de la transacción) o buscando el evento
  `Transfer`.
- Otros contratos, que llaman a la función como parte de una transacción global. Esos contratos obtienen el resultado inmediatamente
  porque se ejecutan en la misma transacción, por lo que pueden usar el valor de retorno de la función.

El mismo tipo de salida es creado por las otras funciones que cambian el estado del contrato.

&nbsp;

Las autorizaciones (allowances) permiten que una cuenta gaste algunos tokens que pertenecen a un propietario diferente.
Esto es útil, por ejemplo, para los contratos que actúan como vendedores. Los contratos no pueden
monitorizar eventos, por lo que si un comprador transfiriera tokens al contrato del vendedor
directamente, ese contrato no sabría que se le ha pagado. En su lugar, el comprador permite que el
contrato del vendedor gaste una cierta cantidad, y el vendedor transfiere esa cantidad.
Esto se hace a través de una función que el contrato del vendedor llama, por lo que el contrato del vendedor
puede saber si tuvo éxito.

```solidity
    /**
     * @dev Devuelve el número restante de tokens que el `gastador` podrá
     * gastar en nombre del `propietario` a través de {transferFrom}. Es
     * cero por defecto.
     *
     * Este valor cambia cuando se llama a {approve} o {transferFrom}.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

La función `allowance` permite a cualquiera consultar cuál es la autorización que una
dirección (`owner`) permite gastar a otra dirección (`spender`).

&nbsp;

```solidity
    /**
     * @dev Establece `amount` como la autorización del `spender` sobre los tokens del llamante.
     *
     * Devuelve un valor booleano que indica si la operación tuvo éxito.
     *
     * IMPORTANTE: Tenga en cuenta que cambiar una autorización con este método conlleva el riesgo
     * de que alguien pueda utilizar tanto la autorización antigua como la nueva mediante una desafortunada
     * ordenación de las transacciones. Una posible solución para mitigar esta condición de
     * carrera es reducir primero la autorización del gastador a 0 y establecer el
     * valor deseado después:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emite un evento {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

La función `approve` crea una autorización. Asegúrese de leer el mensaje sobre
cómo se puede abusar de ella. En Ethereum, usted controla el orden de sus propias transacciones,
pero no puede controlar el orden en que se ejecutarán las transacciones de otras personas,
a menos que no envíe su propia transacción hasta que vea que la
transacción de la otra parte ha ocurrido.

&nbsp;

```solidity
    /**
     * @dev Mueve tokens de `amount` de `sender` a `recipient` usando el
     * mecanismo de asignación. `amount` se deduce entonces de la
     * asignación de quien realiza la llamada.
     *
     * Devuelve un valor booleano que indica si la operación tuvo éxito.
     *
     * Emite un evento {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Finalmente, el gastador utiliza `transferFrom` para gastar realmente la asignación.

&nbsp;

```solidity

    /**
     * @dev Se emite cuando se mueven tokens de `value` de una cuenta (`from`)
     * a otra (`to`).
     *
     * Tenga en cuenta que `value` puede ser cero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Se emite cuando la asignación de un `spender` para un `owner` se establece mediante
     * una llamada a {approve}. `value` es la nueva asignación.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Estos eventos se emiten cuando cambia el estado del contrato ERC-20.

## El contrato real {#the-actual-contract}

Este es el contrato real que implementa el estándar ERC-20,
[tomado de aquí](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
No está pensado para ser usado tal cual, pero puede
[heredar](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) de él para extenderlo a algo utilizable.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Declaraciones de importación {#import-statements}

Además de las definiciones de la interfaz anteriores, la definición del contrato importa otros dos archivos:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` son las definiciones necesarias para usar [OpenGSN](https://www.opengsn.org/), un sistema que permite a los usuarios sin ether
  usar la cadena de bloques. Tenga en cuenta que esta es una versión antigua; si desea integrar con OpenGSN,
  [use este tutorial](https://docs.opengsn.org/javascript-client/tutorial.html).
- [La biblioteca SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), que previene
  desbordamientos/subdesbordamientos aritméticos para versiones de Solidity **&lt;0.8.0**. En Solidity ≥0.8.0, las operaciones aritméticas se revierten
  automáticamente en caso de desbordamiento/subdesbordamiento, lo que hace que SafeMath sea innecesario. Este contrato usa SafeMath para mantener la retrocompatibilidad con
  versiones más antiguas del compilador.

&nbsp;

Este comentario explica el propósito del contrato.

```solidity
/**
 * @dev Implementación de la interfaz {IERC20}.
 *
 * Esta implementación es agnóstica a la forma en que se crean los tokens. Esto significa
 * que se debe agregar un mecanismo de suministro en un contrato derivado usando {_mint}.
 * Para un mecanismo genérico, consulte {ERC20PresetMinterPauser}.
 *
 * CONSEJO: Para una redacción detallada, consulte nuestra guía
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Cómo
 * implementar mecanismos de suministro].
 *
 * Hemos seguido las directrices generales de OpenZeppelin: las funciones se revierten en lugar
 * de devolver `false` en caso de fallo. No obstante, este comportamiento es convencional
 * y no entra en conflicto con las expectativas de las aplicaciones ERC20.
 *
 * Además, se emite un evento {Approval} en las llamadas a {transferFrom}.
 * Esto permite a las aplicaciones reconstruir la asignación para todas las cuentas simplemente
 * escuchando dichos eventos. Es posible que otras implementaciones de la EIP no emitan
 * estos eventos, ya que no es un requisito de la especificación.
 *
 * Finalmente, se han agregado las funciones no estándar {decreaseAllowance} e {increaseAllowance}
 * para mitigar los problemas conocidos relacionados con el establecimiento de
 * asignaciones. Consulte {IERC20-approve}.
 */

```

### Definición del contrato {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Esta línea especifica la herencia, en este caso desde `IERC20` (definido arriba) y `Context`, para OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Esta línea adjunta la biblioteca `SafeMath` al tipo `uint256`. Puede encontrar esta biblioteca
[aquí](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definiciones de variables {#variable-definitions}

Estas definiciones especifican las variables de estado del contrato. Estas variables se declaran como `private`, pero
eso solo significa que otros contratos en la cadena de bloques no pueden leerlas. _No hay
secretos en la cadena de bloques_; el software en cada nodo tiene el estado de cada contrato
en cada bloque. Por convención, las variables de estado se nombran `_<algo>`.

Las dos primeras variables son [asignaciones (mappings)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
lo que significa que se comportan de forma similar a las [matrices asociativas](https://wikipedia.org/wiki/Associative_array),
excepto que las claves son valores numéricos. El almacenamiento solo se asigna a las entradas que tienen valores diferentes
del predeterminado (cero).

```solidity
    mapping (address => uint256) private _balances;
```

La primera asignación (mapping), `_balances`, contiene las direcciones y sus respectivos saldos de este token. Para acceder
al saldo, use esta sintaxis: `_balances[<dirección>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Esta variable, `_allowances`, almacena las asignaciones explicadas anteriormente. El primer índice es el propietario
de los tokens, y el segundo es el contrato con la asignación. Para acceder a la cantidad que la dirección A puede
gastar de la cuenta de la dirección B, use `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Como su nombre indica, esta variable realiza un seguimiento del suministro total de tokens.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Estas tres variables se utilizan para mejorar la legibilidad. Las dos primeras se explican por sí mismas, pero `_decimals`
no.

Por un lado, Ethereum no tiene variables de punto flotante o fraccionarias. Por otro lado,
a los humanos les gusta poder dividir los tokens. Una de las razones por las que la gente se decidió por el oro como moneda fue que
resultaba difícil devolver el cambio cuando alguien quería comprar el equivalente a un pato con una vaca.

La solución es hacer un seguimiento de los números enteros, pero en lugar del token real, contar un token fraccionario que es
casi insignificante. En el caso del ether, el token fraccionario se llama wei, y 10^18 wei equivalen a un
ETH. En el momento de redactar este documento, 10 000 000 000 000 wei equivalen aproximadamente a un céntimo de dólar estadounidense o de euro.

Las aplicaciones necesitan saber cómo mostrar el saldo de tokens. Si un usuario tiene 3 141 000 000 000 000 000 wei, ¿son
3,14 ETH? ¿31,41 ETH? ¿3141 ETH? En el caso del ether, se define que 10^18 wei equivalen a un ETH, pero para su
token puede seleccionar un valor diferente. Si no tiene sentido dividir el token, puede usar un
valor de `_decimals` de cero. Si quiere usar el mismo estándar que ETH, use el valor **18**.

### El constructor {#the-constructor}

```solidity
    /**
     * @dev Establece los valores para {name} y {symbol}, inicializa {decimals} con
     * un valor predeterminado de 18.
     *
     * Para seleccionar un valor diferente para {decimals}, use {_setupDecimals}.
     *
     * Estos tres valores son inmutables: solo se pueden establecer una vez durante
     * la construcción.
     */
    constructor (string memory name_, string memory symbol_) public {
        // En Solidity ≥0.7.0, 'public' es implícito y puede omitirse.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

El constructor se llama cuando el contrato se crea por primera vez. Por convención, los parámetros de función se nombran `<algo>_`.

### Funciones de la interfaz de usuario {#user-interface-functions}

```solidity
    /**
     * @dev Devuelve el nombre del token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Devuelve el símbolo del token, generalmente una versión más corta del
     * nombre.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Devuelve el número de decimales que se usa para obtener su representación de usuario.
     * Por ejemplo, si `decimals` es igual a `2`, un saldo de `505` tokens debería
     * mostrarse a un usuario como `5,05` (`505 / 10 ** 2`).
     *
     * Los tokens suelen optar por un valor de 18, imitando la relación entre
     * ether y wei. Este es el valor que usa {ERC20}, a menos que se
     * llame a {_setupDecimals}.
     *
     * NOTA: Esta información solo se usa para fines de _visualización_: de ninguna
     * manera afecta a la aritmética del contrato, incluidos
     * {IERC20-balanceOf} y {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Estas funciones, `name`, `symbol` y `decimals` ayudan a las interfaces de usuario a obtener información sobre su contrato para que puedan mostrarlo correctamente.

El tipo de retorno es `string memory`, lo que significa que devuelve una cadena que se almacena en la memoria. Las variables, como las
cadenas, se pueden almacenar en tres ubicaciones:

|                | Vida útil           | Acceso al contrato | Costo de gas                                                                    |
| -------------- | ------------------- | ------------------ | ------------------------------------------------------------------------------- |
| Memoria        | Llamada de función  | Lectura/escritura  | Decenas o cientos (más alto para ubicaciones de mayor nivel) |
| Calldata       | Llamada de función  | Solo lectura       | No se puede usar como tipo de retorno, solo como tipo de parámetro de función   |
| Almacenamiento | Hasta que se cambie | Lectura/escritura  | Alto (800 para lectura, 20 000 para escritura)               |

En este caso, `memory` es la mejor opción.

### Leer información del token {#read-token-information}

Estas son funciones que proporcionan información sobre el token, ya sea el suministro total o el
saldo de una cuenta.

```solidity
    /**
     * @dev Consulte {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

La función `totalSupply` devuelve el suministro total de tokens.

&nbsp;

```solidity
    /**
     * @dev Consulte {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Leer el saldo de una cuenta. Tenga en cuenta que cualquiera puede obtener el saldo de la cuenta
de otra persona. No tiene sentido intentar ocultar esta información, porque de todos modos está disponible en todos
los nodos. _No hay secretos en la cadena de bloques._

### Transferir tokens {#transfer-tokens}

```solidity
    /**
     * @dev Consulte {IERC20-transfer}.
     *
     * Requisitos:
     *
     * - `recipient` no puede ser la dirección cero.
     * - quien llama debe tener un saldo de al menos `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

La función `transfer` se invoca para transferir tokens de la cuenta del remitente a otra diferente. Tenga en cuenta
que aunque devuelve un valor booleano, ese valor es siempre **true**. Si la transferencia
falla, el contrato revierte la llamada.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

La función `_transfer` hace el trabajo real. Es una función privada que solo puede ser llamada por
otras funciones del contrato. Por convención, las funciones privadas se nombran `_<algo>`, igual que las variables
de estado.

Normalmente en Solidity usamos `msg.sender` para el remitente del mensaje. Sin embargo, eso rompe
[OpenGSN](http://opengsn.org/). Si queremos permitir transacciones sin ether con nuestro token,
necesitamos usar `_msgSender()`. Devuelve `msg.sender` para transacciones normales, pero para las que no tienen ether,
devuelve el firmante original y no el contrato que transmitió el mensaje.

### Funciones de asignación {#allowance-functions}

Estas son las funciones que implementan la funcionalidad de asignación: `allowance`, `approve`, `transferFrom`
y `_approve`. Además, la implementación de OpenZeppelin va más allá del estándar básico para incluir algunas características que mejoran la
seguridad: `increaseAllowance` y `decreaseAllowance`.

#### La función de asignación {#allowance}

```solidity
    /**
     * @dev Consulte {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

La función `allowance` permite que cualquiera verifique cualquier asignación.

#### La función de aprobación {#approve}

```solidity
    /**
     * @dev Consulte {IERC20-approve}.
     *
     * Requisitos:
     *
     * - `spender` no puede ser la dirección cero.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Esta función se llama para crear una asignación. Es similar a la función `transfer` anterior:

- La función simplemente llama a una función interna (en este caso, `_approve`) que hace el trabajo real.
- La función devuelve `true` (si tiene éxito) o revierte la llamada (si no).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Usamos funciones internas para minimizar el número de lugares donde ocurren cambios de estado. _Cualquier_ función que cambie el
estado es un riesgo de seguridad potencial que necesita ser auditado por seguridad. De esta manera tenemos menos posibilidades de equivocarnos.

#### La función transferFrom {#transferFrom}

Esta es la función que un gastador llama para gastar una asignación. Esto requiere dos operaciones: transferir la cantidad
que se está gastando y reducir la asignación por esa cantidad.

```solidity
    /**
     * @dev Consulte {IERC20-transferFrom}.
     *
     * Emite un evento {Approval} que indica la asignación actualizada. Esto no
     * es requerido por la EIP. Consulte la nota al principio de {ERC20}.
     *
     * Requisitos:
     *
     * - `sender` y `recipient` no pueden ser la dirección cero.
     * - `sender` debe tener un saldo de al menos `amount`.
     * - quien llama debe tener una asignación para los tokens de ``sender`` de al menos
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

La llamada a la función `a.sub(b, "mensaje")` hace dos cosas. Primero, calcula `a-b`, que es la nueva asignación.
Segundo, comprueba que este resultado no sea negativo. Si es negativo, la llamada se revierte con el mensaje proporcionado. Tenga en cuenta que cuando se revierte una llamada, se ignora cualquier procesamiento realizado previamente durante esa llamada, por lo que no necesitamos
deshacer el `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: la cantidad de la transferencia excede la asignación"));
        return true;
    }
```

#### Adiciones de seguridad de OpenZeppelin {#openzeppelin-safety-additions}

Es peligroso establecer una asignación distinta de cero a otro valor distinto de cero,
porque solo usted controla el orden de sus propias transacciones, no el de los demás. Imagine que
tiene dos usuarios, Alice, que es ingenua, y Bill, que es deshonesto. Alice quiere un servicio de
Bill que cree que cuesta cinco tokens, por lo que le da a Bill una asignación de cinco tokens.

Luego algo cambia y el precio de Bill sube a diez tokens. Alice, que todavía quiere el servicio,
envía una transacción que establece la asignación de Bill en diez. En el momento en que Bill ve esta nueva transacción
en el pool de transacciones, envía una transacción que gasta los cinco tokens de Alice y tiene un precio de gas mucho
más alto para que se mine más rápido. De esa manera, Bill puede gastar primero cinco tokens y luego,
una vez que se mina la nueva asignación de Alice, gastar diez más por un precio total de quince tokens, más de lo que
Alice pretendía autorizar. Esta técnica se llama
[front-running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transacción de Alice                                                                                                                                                                          | ```
/**
 * @dev Mueve la `cantidad` de tokens del `remitente` al `destinatario` utilizando el
 * mecanismo de autorización. `amount` se deduce entonces de la autorización del
 * llamante.
 *
 * Devuelve un valor booleano que indica si la operación tuvo éxito.
 *
 * Emite un evento {Transfer}.
 */
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
``` | Finalmente, `transferFrom` es utilizado por el gastador para gastar realmente la autorización. | Nonce de Bill                                     | ```
/**
 * @dev Se emite cuando se mueven `value` tokens de una cuenta (`from`) a
 * otra (`to`).
 *
 * Tenga en cuenta que `value` puede ser cero.
 */
event Transfer(address indexed from, address indexed to, uint256 value);

/**
 * @dev Se emite cuando la autorización de un `spender` para un `owner` es establecida por
 * una llamada a {approve}. `value` es la nueva autorización.
 */
event Approval(address indexed owner, address indexed spender, uint256 value);
```} | Estos eventos se emiten cuando cambia el estado del contrato ERC-20. |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| El contrato real {#the-actual-contract}                                                                                                                                                       | 10                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                |                                                   | 5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 0                                                                                    |
|                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                 | transferFrom(Alice, Bill, 5)                                                                | Declaraciones de importación {#import-statements} | 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 5                                                                                    |
| `GSN/Context.sol` contiene las definiciones necesarias para usar [OpenGSN](https://www.opengsn.org/), un sistema que permite a los usuarios sin ether&#xA;usar la blockchain. | 11                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                |                                                   | 10                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 5                                                                                    |
|                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                 | Este contrato usa SafeMath por retrocompatibilidad con&#xA;versiones antiguas del compilador.  | 10 124                                            | 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 15                                                                                   |

Definición del contrato {#contract-definition} contract ERC20 is Context, IERC20 { Esta línea especifica la herencia, en este caso de `IERC20` de arriba y `Context`, para OpenGSN.

R:

| Transacción de Alice                                                           | ```
/**
 * @dev Mueve la `cantidad` de tokens del `remitente` al `destinatario` utilizando el
 * mecanismo de autorización. `amount` se deduce entonces de la autorización del
 * llamante.
 *
 * Devuelve un valor booleano que indica si la operación tuvo éxito.
 *
 * Emite un evento {Transfer}.
 */
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
``` | Finalmente, `transferFrom` es utilizado por el gastador para gastar realmente la autorización. |                                     Nonce de Bill | ```
/**
 * @dev Se emite cuando se mueven `value` tokens de una cuenta (`from`) a
 * otra (`to`).
 *
 * Tenga en cuenta que `value` puede ser cero.
 */
event Transfer(address indexed from, address indexed to, uint256 value);

/**
 * @dev Se emite cuando la autorización de un `spender` para un `owner` es establecida por
 * una llamada a {approve}. `value` es la nueva autorización.
 */
event Approval(address indexed owner, address indexed spender, uint256 value);
```} | Estos eventos se emiten cuando cambia el estado del contrato ERC-20. |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------ |
| El contrato real {#the-actual-contract}                                        |                                                                                                                                                                                                                                                                                                                                                                                                              10 |                                                                                                                |                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      5 | 0                                                                                    |
|                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                 | transferFrom(Alice, Bill, 5)                                                                | Declaraciones de importación {#import-statements} |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0 | 5                                                                                    |
| ```
mapping (address => mapping (address => uint256)) private _allowances;
``` |                                                                                                                                                                                                                                                                                                                                                                                                              11 |                                                                                                                |                                                   |                                                                                                                                                                                                                                                                                                                                                                  El primer índice es el propietario&#xA;de los tokens y el segundo es el contrato con la autorización. | 5                                                                                    |
|                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                 | transferFrom(Alice, Bill, 5)                                                                |                                            10 124 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0 | 10                                                                                   |

```
string private _name;
string private _symbol;
uint8 private _decimals;
```

| Transacción de Alice                                                           | ```
/**
 * @dev Mueve la `cantidad` de tokens del `remitente` al `destinatario` utilizando el
 * mecanismo de autorización. `amount` se deduce entonces de la autorización del
 * llamante.
 *
 * Devuelve un valor booleano que indica si la operación tuvo éxito.
 *
 * Emite un evento {Transfer}.
 */
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
``` | Finalmente, `transferFrom` es utilizado por el gastador para gastar realmente la autorización. | Nonce de Bill | ```
/**
 * @dev Se emite cuando se mueven `value` tokens de una cuenta (`from`) a
 * otra (`to`).
 *
 * Tenga en cuenta que `value` puede ser cero.
 */
event Transfer(address indexed from, address indexed to, uint256 value);

/**
 * @dev Se emite cuando la autorización de un `spender` para un `owner` es establecida por
 * una llamada a {approve}. `value` es la nueva autorización.
 */
event Approval(address indexed owner, address indexed spender, uint256 value);
```} | Estos eventos se emiten cuando cambia el estado del contrato ERC-20. |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------------------------------------------------------- | ------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -----------------------------------------------------------------------------------: |
| El contrato real {#the-actual-contract}                                        |                                                                                                                                                                                                                                                                                                                                                                                                              10 |                                                                                                                |               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      5 |                                                                                    0 |
| ```
mapping (address => mapping (address => uint256)) private _allowances;
``` |                                                                                                                                                                                                                                                                                                                                                                                                              11 |                                                                                                                |               |                                                                                                                                                                                                                                                                                                                                                    En el caso del ether se define 10^18 wei por cada ETH, pero para su&#xA;token puede seleccionar un valor diferente. |                                                                                    0 |
|                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                 | Este contrato usa SafeMath por retrocompatibilidad con&#xA;versiones antiguas del compilador.  |        10 124 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0 |                                                                                   10 |

```solidity
Por convención, los parámetros de las funciones se nombran `<algo>_`.
```

Funciones de la interfaz de usuario {#user-interface-functions}     /\*\*
\* @dev Devuelve el nombre del token.
\*/
function name() public view returns (string memory) {
return _name;
}```
/**
 * @dev Devuelve el símbolo del token, normalmente una versión más corta del
 * nombre.
 */
function symbol() public view returns (string memory) {
    return _symbol;
}

/**
 * @dev Devuelve el número de decimales utilizado para obtener su representación de usuario.
 * Por ejemplo, si `decimals` es igual a `2`, un saldo de `505` tokens debería
 * mostrarse a un usuario como `5,05` (`505 / 10 ** 2`).
 *
 * Los tokens suelen optar por un valor de 18, imitando la relación entre
 * ether y wei. Este es el valor que utiliza {ERC20}, a menos que se llame a
 * {_setupDecimals}.
 *
 * NOTA: Esta información solo se utiliza con fines de _visualización_: de ninguna
 * manera afecta a la aritmética del contrato, incluyendo
 * {IERC20-balanceOf} y {IERC20-transfer}.
 */
function decimals() public view returns (uint8) {
    return _decimals;
}
```

```solidity
Estas funciones, `name`, `symbol` y `decimals` ayudan a las interfaces de usuario a conocer su contrato para que puedan mostrarlo correctamente.
```

### El tipo de retorno es `string memory`, lo que significa que devuelve una cadena que se almacena en la memoria.

Las variables, como las
cadenas, pueden almacenarse en tres ubicaciones:

#### Tiempo de vida

```solidity
Acceso al contrato
```

Coste del gas Memoria

&nbsp;

```solidity
Lectura/escritura
```

Decenas o centenas (más para ubicaciones más altas) Cuando la gente usa esa dirección, suele ser un error de software, por lo que
fallamos si la dirección cero se usa como remitente o destinatario.

&nbsp;

```solidity
Solo lectura
```

No se puede usar como tipo de retorno, solo como tipo de parámetro de función

1. Úselo como plantilla para su propio código
2. Hasta que se cambie

El segundo método es mucho mejor porque el código ERC-20 de OpenZeppelin ya ha sido auditado y se ha demostrado que es seguro. Alto (800 para lectura, 20k para escritura)

En este caso, `memory` es la mejor opción. Leer información del token {#read-token-information} Estas son funciones que proporcionan información sobre el token, ya sea el suministro total o el
saldo de una cuenta.     /\*\*
\* @dev Véase {IERC20-totalSupply}.
\*/
function totalSupply() public view override returns (uint256) {
return _totalSupply;
}

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: la cantidad de la transferencia excede el saldo");
        _balances[recipient] = _balances[recipient].add(amount);
```

```
/**
 * @dev Véase {IERC20-balanceOf}.
 */
function balanceOf(address account) public view override returns (uint256) {
    return _balances[account];
} Leer el saldo de una cuenta. Tenga en cuenta que cualquiera puede obtener el saldo de la cuenta
```de cualquier otra persona. No tiene sentido intentar ocultar esta información, porque de todos modos está disponible en cada
nodo.

&nbsp;

```solidity
Transferir tokens {#transfer-tokens}
```

```
/**
 * @dev Véase {IERC20-transfer}.
 *
 * Requisitos:
 *
 * - `recipient` no puede ser la dirección cero.
 * - el llamante debe tener un saldo de al menos `amount`.
 */
function transfer(address recipient, uint256 amount) public virtual override returns (bool) { La función `transfer` se llama para transferir tokens de la cuenta del remitente a una diferente. Tenga en cuenta
```que, aunque devuelve un valor booleano, ese valor es siempre **true**.

#### Si la transferencia&#xA;falla, el contrato revierte la llamada.

Estas dos funciones (`_mint` y `_burn`) modifican el suministro total de tokens.
_transfer(_msgSender(), recipient, amount);
return true;
}

La función `_transfer` hace el trabajo real.
Es una función privada a la que solo pueden llamar
otras funciones del contrato. Por convención, las funciones privadas se nombran `_<algo>`, igual que las variables
de estado.

```solidity
Normalmente, en Solidity usamos `msg.sender` para el remitente del mensaje.
```

Sin embargo, eso rompe
[OpenGSN](http://opengsn.org/).

&nbsp;

```solidity
Devuelve `msg.sender` para transacciones normales, pero para las que no tienen ether
devuelve el firmante original y no el contrato que retransmitió el mensaje.
```

Funciones de autorización {#allowance-functions}

#### Estas son las funciones que implementan la funcionalidad de autorización: `allowance`, `approve`, `transferFrom`,&#xA;y `_approve`.

Además, la implementación de OpenZeppelin va más allá del estándar básico para incluir algunas características que mejoran
la seguridad: `increaseAllowance` y `decreaseAllowance`. La función de autorización {#allowance}     /\*\*
\* @dev Véase {IERC20-allowance}.
\*/
function allowance(address owner, address spender) public view virtual override returns (uint256) {
return _allowances[owner][spender];
}

```solidity
La función `allowance` permite a todo el mundo comprobar cualquier autorización.
```

&nbsp;

```
/**
 * @dev Véase {IERC20-approve}.
 *
 * Requisitos:
 *
 * - `spender` no puede ser la dirección cero.
 */
function approve(address spender, uint256 amount) public virtual override returns (bool) { Esta función se llama para crear una autorización.
```

```solidity
Es similar a la función `transfer` anterior:
```

### La función simplemente llama a una función interna (en este caso, `_approve`) que hace el trabajo real.

```solidity
La función devuelve `true` (si tiene éxito) o se revierte (si no).
```

Esta función modifica la variable `_decimals` que se utiliza para indicar a las interfaces de usuario cómo interpretar la cantidad.
_approve(_msgSender(), spender, amount);
return true;
} Usamos funciones internas para minimizar el número de lugares donde ocurren cambios de estado.

### Hooks {#functions-that-modify-token-information}

```solidity
De esta manera tenemos menos posibilidades de equivocarnos.
```

La función transferFrom {#transferFrom} Esta es la función que un gastador llama para usar una autorización.

## Conclusión {#_transfer}

```
/**
 * @dev Véase {IERC20-transferFrom}.
 *
 * Emite un evento {Approval} que indica la autorización actualizada. Esto no
 * es requerido por el EIP. Véase la nota al principio de {ERC20}.
 *
 * Requisitos:
 *
 * - `sender` y `recipient` no pueden ser la dirección cero.
 * - `sender` debe tener un saldo de al menos `amount`.
 * - el llamante debe tener autorización para los tokens de ``sender`` de al menos
 * `amount`.
 */
function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                            override returns (bool) {
    _transfer(sender, recipient, amount);
```

- _No hay secretos en la cadena de bloques_. La llamada a la función `a.sub(b, "message")` hace dos cosas.
- Primero, calcula `a-b`, que es la nueva autorización. Segundo, comprueba que este resultado no sea negativo.
- Si es negativo, la llamada se revierte con el mensaje proporcionado. Tenga en cuenta que cuando una llamada se revierte, cualquier procesamiento realizado anteriormente durante esa llamada se ignora, por lo que no es necesario
  deshacer la `_transfer`.         _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
  "ERC20: la cantidad transferida excede la autorización"));
  return true;
  } Adiciones de seguridad de OpenZeppelin {#openzeppelin-safety-additions}
- Es peligroso establecer una autorización no nula a otro valor no nulo,
  porque solo controla el orden de sus propias transacciones, no el de nadie más.
  Imagine que
  tiene dos usuarios, Alicia, que es ingenua, y Bill, que es deshonesto.
- Alicia quiere un servicio de
  Bill que cree que cuesta cinco tokens, así que le da a Bill una autorización de cinco tokens. Entonces algo cambia y el precio de Bill sube a diez tokens. Alicia, que todavía quiere el servicio,
  envía una transacción que establece la autorización de Bill en diez. En el momento en que Bill ve esta nueva transacción
  en el pool de transacciones, envía una transacción que gasta los cinco tokens de Alicia y tiene un precio
  de gas mucho más alto para que se mine más rápido.

De esa manera, Bill puede gastar primero cinco tokens y luego,
una vez que se mine la nueva autorización de Alicia, gastar diez más por un precio total de quince tokens, más de lo que
Alicia pretendía autorizar.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).
