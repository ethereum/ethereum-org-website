---
title: "Análisis detallado del contrato ERC-20"
description: "¿Qué contiene el contrato ERC-20 de OpenZeppelin y por qué está ahí?"
author: Ori Pomerantz
lang: es
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: "Análisis de ERC-20"
published: 2021-03-09
---

## Introducción {#introduction}

Uno de los usos más comunes de Ethereum es que un grupo cree un token negociable, en cierto sentido, su propia moneda. Estos tokens suelen seguir un estándar, el
[ERC-20](/developers/docs/standards/tokens/erc-20/). Este estándar hace posible escribir herramientas, como fondos de liquidez y billeteras, que funcionan con todos los tokens ERC-20. En este artículo analizaremos la
[implementación de ERC20 en Solidity de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), así como la
[definición de la interfaz](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Este es un código fuente comentado. Si desea implementar ERC-20,
[lea este tutorial](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## La interfaz {#the-interface}

El propósito de un estándar como ERC-20 es permitir muchas implementaciones de tokens que sean interoperables entre aplicaciones, como billeteras e intercambios descentralizados. Para lograrlo, creamos una
[interfaz](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Cualquier código que necesite usar el contrato del token puede usar las mismas definiciones en la interfaz y ser compatible con todos los contratos de tokens que la usen, ya sea una billetera como
MetaMask, una aplicación descentralizada (dapp) como etherscan.io, o un contrato diferente como un fondo de liquidez.

![Illustration of the ERC-20 interface](erc20_interface.png)

Si es un programador experimentado, probablemente recuerde haber visto construcciones similares en [Java](https://www.w3schools.com/java/java_interface.asp)
o incluso en [archivos de cabecera de C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Esta es una definición de la [interfaz ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
de OpenZeppelin. Es una traducción del [estándar legible por humanos](https://eips.ethereum.org/EIPS/eip-20) a código Solidity. Por supuesto, la
interfaz en sí no define _cómo_ hacer nada. Eso se explica en el código fuente del contrato a continuación.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Se supone que los archivos de Solidity incluyen un identificador de licencia. [Puede ver la lista de licencias aquí](https://spdx.org/licenses/). Si necesita una licencia diferente, simplemente explíquelo en los comentarios.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

El lenguaje Solidity todavía está evolucionando rápidamente, y las nuevas versiones pueden no ser compatibles con el código antiguo
([véase aquí](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Por lo tanto, es una buena idea especificar no solo una versión mínima del lenguaje, sino también una versión máxima, la última con la que probó el código.

&nbsp;

```solidity
/**
 * @dev Interfaz del estándar ERC-20 tal como se define en el EIP.
 */
```

El `@dev` en el comentario es parte del [formato NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), utilizado para producir
documentación a partir del código fuente.

&nbsp;

```solidity
interface IERC20 {
```

Por convención, los nombres de las interfaces comienzan con `I`.

&nbsp;

```solidity
    /**
     * @dev Devuelve la cantidad de tokens en existencia.
     */
    function totalSupply() external view returns (uint256);
```

Esta función es `external`, lo que significa que [solo se puede llamar desde fuera del contrato](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Devuelve el suministro total de tokens en el contrato. Este valor se devuelve utilizando el tipo más común en Ethereum, 256 bits sin signo (256 bits es el
tamaño de palabra nativo de la EVM). Esta función también es `view`, lo que significa que no cambia el estado, por lo que se puede ejecutar en un solo nodo en lugar de hacer que
cada nodo de la cadena de bloques la ejecute. Este tipo de función no genera una transacción y no cuesta [gas](/developers/docs/gas/).

**Nota:** En teoría, podría parecer que el creador de un contrato podría hacer trampa devolviendo un suministro total menor que el valor real, haciendo que cada token parezca
más valioso de lo que realmente es. Sin embargo, ese temor ignora la verdadera naturaleza de la cadena de bloques. Todo lo que sucede en la cadena de bloques puede ser verificado por
cada nodo. Para lograr esto, el código en lenguaje de máquina y el almacenamiento de cada contrato están disponibles en cada nodo. Si bien no está obligado a publicar el código Solidity
de su contrato, nadie lo tomaría en serio a menos que publique el código fuente y la versión de Solidity con la que se compiló, para que pueda
verificarse con el código en lenguaje de máquina que proporcionó.
Por ejemplo, consulte [este contrato](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Devuelve la cantidad de tokens propiedad de `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Como su nombre indica, `balanceOf` devuelve el saldo de una cuenta. Las cuentas de Ethereum se identifican en Solidity utilizando el tipo `address`, que contiene 160 bits.
También es `external` y `view`.

&nbsp;

```solidity
    /**
     * @dev Mueve `amount` tokens de la cuenta del llamador a `recipient`.
     *
     * Devuelve un valor booleano que indica si la operación tuvo éxito.
     *
     * Emite un evento {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

La función `transfer` transfiere tokens del llamador a una dirección diferente. Esto implica un cambio de estado, por lo que no es `view`.
Cuando un usuario llama a esta función, crea una transacción y cuesta gas. También emite un evento, `Transfer`, para informar a todos en
la cadena de bloques sobre el evento.

La función tiene dos tipos de salida para dos tipos diferentes de llamadores:

- Usuarios que llaman a la función directamente desde una interfaz de usuario. Por lo general, el usuario envía una transacción
  y no espera una respuesta, lo que podría llevar una cantidad de tiempo indefinida. El usuario puede ver lo que sucedió
  buscando el recibo de la transacción (que se identifica por el hash de transacción) o buscando el
  evento `Transfer`.
- Otros contratos, que llaman a la función como parte de una transacción general. Esos contratos obtienen el resultado de inmediato,
  porque se ejecutan en la misma transacción, por lo que pueden usar el valor de retorno de la función.

El mismo tipo de salida es creado por las otras funciones que cambian el estado del contrato.

&nbsp;

Las asignaciones permiten que una cuenta gaste algunos tokens que pertenecen a un propietario diferente.
Esto es útil, por ejemplo, para contratos que actúan como vendedores. Los contratos no pueden
monitorear eventos, por lo que si un comprador transfiriera tokens al contrato del vendedor
directamente, ese contrato no sabría que se le pagó. En cambio, el comprador permite que el
contrato del vendedor gaste una cierta cantidad, y el vendedor transfiere esa cantidad.
Esto se hace a través de una función que llama el contrato del vendedor, para que el contrato del vendedor
pueda saber si tuvo éxito.

```solidity
    /**
     * @dev Devuelve el número restante de tokens que `spender` tendrá
     * permitido gastar en nombre de `owner` a través de {transferFrom}. Esto es
     * cero por defecto.
     *
     * Este valor cambia cuando se llama a {approve} o {transferFrom}.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

La función `allowance` permite a cualquiera consultar para ver cuál es la asignación que una
dirección (`owner`) permite gastar a otra dirección (`spender`).

&nbsp;

```solidity
    /**
     * @dev Establece `amount` como la asignación de `spender` sobre los tokens del llamador.
     *
     * Devuelve un valor booleano que indica si la operación tuvo éxito.
     *
     * IMPORTANTE: Tenga en cuenta que cambiar una asignación con este método conlleva el riesgo
     * de que alguien pueda usar tanto la asignación antigua como la nueva por un ordenamiento
     * desafortunado de la transacción. Una posible solución para mitigar esta condición
     * de carrera es reducir primero la asignación del gastador a 0 y establecer el
     * valor deseado después:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emite un evento {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

La función `approve` crea una asignación. Asegúrese de leer el mensaje sobre
cómo se puede abusar de ella. En Ethereum, usted controla el orden de sus propias transacciones,
pero no puede controlar el orden en que se ejecutarán las transacciones de otras personas,
a menos que no envíe su propia transacción hasta que vea que la
transacción de la otra parte ha ocurrido.

&nbsp;

```solidity
    /**
     * @dev Mueve `amount` tokens de `sender` a `recipient` usando el
     * mecanismo de asignación. Luego, `amount` se deduce de la
     * asignación del llamador.
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
     * @dev Emitido cuando `value` tokens se mueven de una cuenta (`from`) a
     * otra (`to`).
     *
     * Tenga en cuenta que `value` puede ser cero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitido cuando la asignación de un `spender` para un `owner` se establece mediante
     * una llamada a {approve}. `value` es la nueva asignación.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Estos eventos se emiten cuando cambia el estado del contrato ERC-20.

## El contrato real {#the-actual-contract}

Este es el contrato real que implementa el estándar ERC-20,
[tomado de aquí](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
No está destinado a usarse tal cual, pero puede
[heredar](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) de él para extenderlo a algo utilizable.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Declaraciones de importación {#import-statements}

Además de las definiciones de interfaz anteriores, la definición del contrato importa otros dos archivos:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` son las definiciones requeridas para usar [OpenGSN](https://www.opengsn.org/), un sistema que permite a los usuarios sin ether
  usar la cadena de bloques. Tenga en cuenta que esta es una versión antigua, si desea integrarse con OpenGSN
  [use este tutorial](https://docs.opengsn.org/javascript-client/tutorial.html).
- [La biblioteca SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), que previene
  desbordamientos aritméticos (overflows/underflows) para versiones de Solidity **&lt;0.8.0**. En Solidity ≥0.8.0, las operaciones aritméticas se revierten automáticamente
  en caso de desbordamiento, lo que hace que SafeMath sea innecesario. Este contrato utiliza SafeMath para mantener la compatibilidad con
  versiones anteriores del compilador.

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
 * CONSEJO: Para un artículo detallado, consulte nuestra guía
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * Hemos seguido las pautas generales de OpenZeppelin: las funciones revierten en lugar
 * de devolver `false` en caso de fallo. Sin embargo, este comportamiento es convencional
 * y no entra en conflicto con las expectativas de las aplicaciones ERC-20.
 *
 * Además, se emite un evento {Approval} en las llamadas a {transferFrom}.
 * Esto permite a las aplicaciones reconstruir la asignación para todas las cuentas simplemente
 * escuchando dichos eventos. Otras implementaciones del EIP pueden no emitir
 * estos eventos, ya que no es requerido por la especificación.
 *
 * Finalmente, se han agregado las funciones no estándar {decreaseAllowance} e {increaseAllowance}
 * para mitigar los problemas bien conocidos en torno al establecimiento de
 * asignaciones. Consulte {IERC20-approve}.
 */

```

### Definición del contrato {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Esta línea especifica la herencia, en este caso de `IERC20` de arriba y `Context`, para OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Esta línea adjunta la biblioteca `SafeMath` al tipo `uint256`. Puede encontrar esta biblioteca
[aquí](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definiciones de variables {#variable-definitions}

Estas definiciones especifican las variables de estado del contrato. Estas variables se declaran como `private`, pero
eso solo significa que otros contratos en la cadena de bloques no pueden leerlas. _No hay
secretos en la cadena de bloques_, el software en cada nodo tiene el estado de cada contrato
en cada bloque. Por convención, las variables de estado se nombran `_<something>`.

Las dos primeras variables son [mapeos](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
lo que significa que se comportan aproximadamente igual que las [matrices asociativas](https://wikipedia.org/wiki/Associative_array),
excepto que las claves son valores numéricos. El almacenamiento solo se asigna para las entradas que tienen valores diferentes
al predeterminado (cero).

```solidity
    mapping (address => uint256) private _balances;
```

El primer mapeo, `_balances`, son las direcciones y sus respectivos saldos de este token. Para acceder
al saldo, use esta sintaxis: `_balances[<address>]`.

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

Como sugiere el nombre, esta variable realiza un seguimiento del suministro total de tokens.

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
era difícil dar cambio cuando alguien quería comprar el equivalente a un pato en vaca.

La solución es realizar un seguimiento de los números enteros, pero contar en lugar del token real un token fraccionario que
casi no tiene valor. En el caso del ether, el token fraccionario se llama Wei, y 10^18 Wei es igual a un
ETH. Al momento de escribir este artículo, 10.000.000.000.000 Wei equivalen aproximadamente a un centavo de dólar estadounidense o euro.

Las aplicaciones necesitan saber cómo mostrar el saldo del token. Si un usuario tiene 3.141.000.000.000.000.000 Wei, ¿son
3,14 ETH? ¿31,41 ETH? ¿3.141 ETH? En el caso del ether, se define 10^18 Wei por ETH, pero para su
token puede seleccionar un valor diferente. Si dividir el token no tiene sentido, puede usar un
valor de `_decimals` de cero. Si desea utilizar el mismo estándar que ETH, utilice el valor **18**.

### El constructor {#the-constructor}

```solidity
    /**
     * @dev Establece los valores para {name} y {symbol}, inicializa {decimals} con
     * un valor por defecto de 18.
     *
     * Para seleccionar un valor diferente para {decimals}, use {_setupDecimals}.
     *
     * Estos tres valores son inmutables: solo se pueden establecer una vez durante
     * el constructor.
     */
    constructor (string memory name_, string memory symbol_) public {
        // En Solidity ≥0.7.0, 'public' es implícito y puede omitirse.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

El constructor se llama cuando el contrato se crea por primera vez. Por convención, los parámetros de la función se nombran `<something>_`.

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
     * @dev Devuelve el número de decimales utilizados para obtener su representación de usuario.
     * Por ejemplo, si `decimals` es igual a `2`, un saldo de `505` tokens debería
     * mostrarse a un usuario como `5,05` (`505 / 10 ** 2`).
     *
     * Los tokens generalmente optan por un valor de 18, imitando la relación entre
     * ether y Wei. Este es el valor que usa {ERC20}, a menos que se llame a
     * {_setupDecimals}.
     *
     * NOTA: Esta información solo se utiliza para fines de _visualización_: de
     * ninguna manera afecta la aritmética del contrato, incluyendo
     * {IERC20-balanceOf} y {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Estas funciones, `name`, `symbol` y `decimals` ayudan a las interfaces de usuario a conocer su contrato para que puedan mostrarlo correctamente.

El tipo de retorno es `string memory`, lo que significa que devuelve una cadena que se almacena en la memoria. Las variables, como
las cadenas, se pueden almacenar en tres ubicaciones:

|                  | Vida útil            | Acceso al contrato | Costo de gas                                                                  |
| ---------------- | -------------------- | ------------------ | ----------------------------------------------------------------------------- |
| Memoria          | Llamada a la función | Lectura/Escritura  | Decenas o cientos (mayor para ubicaciones más altas)                          |
| Datos de llamada | Llamada a la función | Solo lectura       | No se puede usar como tipo de retorno, solo como tipo de parámetro de función |
| Almacenamiento   | Hasta que se cambie  | Lectura/Escritura  | Alto (800 para lectura, 20k para escritura)                                   |

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

Lee el saldo de una cuenta. Tenga en cuenta que a cualquiera se le permite obtener el saldo de la cuenta de cualquier otra persona.
No tiene sentido intentar ocultar esta información, porque de todos modos está disponible en cada
nodo. _No hay secretos en la cadena de bloques._

### Transferir tokens {#transfer-tokens}

```solidity
    /**
     * @dev Consulte {IERC20-transfer}.
     *
     * Requisitos:
     *
     * - `recipient` no puede ser la dirección cero.
     * - el llamador debe tener un saldo de al menos `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

La función `transfer` se llama para transferir tokens de la cuenta del remitente a una diferente. Tenga en
cuenta que aunque devuelve un valor booleano, ese valor siempre es **verdadero**. Si la transferencia
falla, el contrato revierte la llamada.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

La función `_transfer` hace el trabajo real. Es una función privada a la que solo pueden llamar
otras funciones del contrato. Por convención, las funciones privadas se nombran `_<something>`, al igual que las variables
de estado.

Normalmente en Solidity usamos `msg.sender` para el remitente del mensaje. Sin embargo, eso rompe
[OpenGSN](https://opengsn.org/). Si queremos permitir transacciones sin ether con nuestro token,
necesitamos usar `_msgSender()`. Devuelve `msg.sender` para transacciones normales, pero para las que no tienen ether
devuelve el firmante original y no el contrato que retransmitió el mensaje.

### Funciones de asignación {#allowance-functions}

Estas son las funciones que implementan la funcionalidad de asignación: `allowance`, `approve`, `transferFrom`
y `_approve`. Además, la implementación de OpenZeppelin va más allá del estándar básico para incluir algunas características que mejoran
la seguridad: `increaseAllowance` y `decreaseAllowance`.

#### La función allowance {#allowance}

```solidity
    /**
     * @dev Consulte {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

La función `allowance` permite a todos verificar cualquier asignación.

#### La función approve {#approve}

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
- La función devuelve `true` (si tiene éxito) o se revierte (si no).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Usamos funciones internas para minimizar la cantidad de lugares donde ocurren cambios de estado. _Cualquier_ función que cambie el
estado es un riesgo de seguridad potencial que debe ser auditado por seguridad. De esta manera tenemos menos posibilidades de equivocarnos.

#### La función transferFrom {#transferfrom}

Esta es la función que llama un gastador para gastar una asignación. Esto requiere dos operaciones: transferir la cantidad
que se gasta y reducir la asignación en esa cantidad.

```solidity
    /**
     * @dev Consulte {IERC20-transferFrom}.
     *
     * Emite un evento {Approval} indicando la asignación actualizada. Esto no es
     * requerido por el EIP. Consulte la nota al principio de {ERC20}.
     *
     * Requisitos:
     *
     * - `sender` y `recipient` no pueden ser la dirección cero.
     * - `sender` debe tener un saldo de al menos `amount`.
     * - el llamador debe tener una asignación para los tokens de ``sender`` de al menos
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

La llamada a la función `a.sub(b, "message")` hace dos cosas. Primero, calcula `a-b`, que es la nueva asignación.
Segundo, verifica que este resultado no sea negativo. Si es negativo, la llamada se revierte con el mensaje proporcionado. Tenga en cuenta que cuando una llamada se revierte, cualquier procesamiento realizado previamente durante esa llamada se ignora, por lo que no necesitamos
deshacer el `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Adiciones de seguridad de OpenZeppelin {#openzeppelin-safety-additions}

Es peligroso establecer una asignación distinta de cero a otro valor distinto de cero,
porque solo controla el orden de sus propias transacciones, no las de nadie más. Imagine que
tiene dos usuarios, Alice que es ingenua y Bill que es deshonesto. Alice quiere algún servicio de
Bill, que ella cree que cuesta cinco tokens, por lo que le da a Bill una asignación de cinco tokens.

Luego algo cambia y el precio de Bill sube a diez tokens. Alice, que todavía quiere el servicio,
envía una transacción que establece la asignación de Bill en diez. En el momento en que Bill ve esta nueva transacción
en el pool de transacciones, envía una transacción que gasta los cinco tokens de Alice y tiene un
precio del gas mucho más alto para que se extraiga más rápido. De esa manera, Bill puede gastar primero cinco tokens y luego,
una vez que se extrae la nueva asignación de Alice, gastar diez más por un precio total de quince tokens, más de lo que
Alice pretendía autorizar. Esta técnica se llama
[front-running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transacción de Alice | Nonce de Alice | Transacción de Bill           | Nonce de Bill | Asignación de Bill | Ingreso total de Bill de Alice |
| -------------------- | -------------- | ----------------------------- | ------------- | ------------------ | ------------------------------ |
| approve(Bill, 5)     | 10             |                               |               | 5                  | 0                              |
|                      |                | transferFrom(Alice, Bill, 5)  | 10,123        | 0                  | 5                              |
| approve(Bill, 10)    | 11             |                               |               | 10                 | 5                              |
|                      |                | transferFrom(Alice, Bill, 10) | 10,124        | 0                  | 15                             |

Para evitar este problema, estas dos funciones (`increaseAllowance` y `decreaseAllowance`) le permiten
modificar la asignación en una cantidad específica. Entonces, si Bill ya había gastado cinco tokens, solo
podrá gastar cinco más. Dependiendo del momento, hay dos formas en que esto puede funcionar, ambas
terminan con Bill obteniendo solo diez tokens:

A:

| Transacción de Alice       | Nonce de Alice | Transacción de Bill          | Nonce de Bill | Asignación de Bill | Ingreso total de Bill de Alice |
| -------------------------- | -------------: | ---------------------------- | ------------: | -----------------: | ------------------------------ |
| approve(Bill, 5)           |             10 |                              |               |                  5 | 0                              |
|                            |                | transferFrom(Alice, Bill, 5) |        10,123 |                  0 | 5                              |
| increaseAllowance(Bill, 5) |             11 |                              |               |            0+5 = 5 | 5                              |
|                            |                | transferFrom(Alice, Bill, 5) |        10,124 |                  0 | 10                             |

B:

| Transacción de Alice       | Nonce de Alice | Transacción de Bill           | Nonce de Bill | Asignación de Bill | Ingreso total de Bill de Alice |
| -------------------------- | -------------: | ----------------------------- | ------------: | -----------------: | -----------------------------: |
| approve(Bill, 5)           |             10 |                               |               |                  5 |                              0 |
| increaseAllowance(Bill, 5) |             11 |                               |               |           5+5 = 10 |                              0 |
|                            |                | transferFrom(Alice, Bill, 10) |        10,124 |                  0 |                             10 |

```solidity
    /**
     * @dev Aumenta atómicamente la asignación otorgada a `spender` por el llamador.
     *
     * Esta es una alternativa a {approve} que se puede usar como mitigación para
     * los problemas descritos en {IERC20-approve}.
     *
     * Emite un evento {Approval} indicando la asignación actualizada.
     *
     * Requisitos:
     *
     * - `spender` no puede ser la dirección cero.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

La función `a.add(b)` es una suma segura. En el improbable caso de que `a`+`b`>=`2^256`, no se desborda
de la forma en que lo hace la suma normal.

```solidity

    /**
     * @dev Disminuye atómicamente la asignación otorgada a `spender` por el llamador.
     *
     * Esta es una alternativa a {approve} que se puede usar como mitigación para
     * los problemas descritos en {IERC20-approve}.
     *
     * Emite un evento {Approval} indicando la asignación actualizada.
     *
     * Requisitos:
     *
     * - `spender` no puede ser la dirección cero.
     * - `spender` debe tener una asignación para el llamador de al menos
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funciones que modifican la información del token {#functions-that-modify-token-information}

Estas son las cuatro funciones que hacen el trabajo real: `_transfer`, `_mint`, `_burn` y `_approve`.

#### La función _transfer {#transfer}

```solidity
    /**
     * @dev Mueve `amount` tokens de `sender` a `recipient`.
     *
     * Esta función interna es equivalente a {transfer}, y puede usarse para
     * p. ej., implementar tarifas automáticas de token, mecanismos de recorte (slashing), etc.
     *
     * Emite un evento {Transfer}.
     *
     * Requisitos:
     *
     * - `sender` no puede ser la dirección cero.
     * - `recipient` no puede ser la dirección cero.
     * - `sender` debe tener un saldo de al menos `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Esta función, `_transfer`, transfiere tokens de una cuenta a otra. Es llamada tanto por
`transfer` (para transferencias desde la propia cuenta del remitente) como por `transferFrom` (para usar asignaciones
para transferir desde la cuenta de otra persona).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

En realidad, nadie es dueño de la dirección cero en Ethereum (es decir, nadie conoce una clave privada cuya clave pública coincidente
se transforme en la dirección cero). Cuando las personas usan esa dirección, generalmente es un error de software, por lo que
fallamos si la dirección cero se usa como remitente o destinatario.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Hay dos formas de usar este contrato:

1. Úselo como plantilla para su propio código
1. [Herede de él](https://www.bitdegree.org/learn/solidity-inheritance) y anule solo aquellas funciones que necesite modificar

El segundo método es mucho mejor porque el código ERC-20 de OpenZeppelin ya ha sido auditado y se ha demostrado que es seguro. Cuando usa la herencia
está claro cuáles son las funciones que modifica, y para confiar en su contrato, las personas solo necesitan auditar esas funciones específicas.

A menudo es útil realizar una función cada vez que los tokens cambian de manos. Sin embargo, `_transfer` es una función muy importante y es
posible escribirla de forma insegura (ver más abajo), por lo que es mejor no anularla. La solución es `_beforeTokenTransfer`, una
[función de gancho (hook)](https://wikipedia.org/wiki/Hooking). Puede anular esta función y se llamará en cada transferencia.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Estas son las líneas que realmente hacen la transferencia. Tenga en cuenta que no hay **nada** entre ellas, y que restamos
la cantidad transferida del remitente antes de agregarla al destinatario. Esto es importante porque si hubiera una
llamada a un contrato diferente en el medio, podría haberse utilizado para engañar a este contrato. De esta manera, la transferencia
es atómica, nada puede suceder en medio de ella.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Finalmente, emita un evento `Transfer`. Los eventos no son accesibles para los contratos inteligentes, pero el código que se ejecuta fuera de la cadena de bloques
puede escuchar eventos y reaccionar ante ellos. Por ejemplo, una billetera puede realizar un seguimiento de cuándo el propietario obtiene más tokens.

#### Las funciones _mint y _burn {#mint-and-burn}

Estas dos funciones (`_mint` y `_burn`) modifican el suministro total de tokens.
Son internas y no hay ninguna función que las llame en este contrato,
por lo que solo son útiles si hereda del contrato y agrega su propia
lógica para decidir bajo qué condiciones acuñar nuevos tokens o quemar los existentes.

**NOTA:** Cada token ERC-20 tiene su propia lógica de negocio que dicta la gestión del token.
Por ejemplo, un contrato de suministro fijo podría llamar a `_mint`
solo en el constructor y nunca llamar a `_burn`. Un contrato que vende tokens
llamará a `_mint` cuando se le pague, y presumiblemente llamará a `_burn` en algún momento
para evitar una inflación descontrolada.

```solidity
    /** @dev Crea `amount` tokens y los asigna a `account`, aumentando
     * el suministro total.
     *
     * Emite un evento {Transfer} con `from` establecido en la dirección cero.
     *
     * Requisitos:
     *
     * - `to` no puede ser la dirección cero.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Asegúrese de actualizar `_totalSupply` cuando cambie el número total de tokens.

&nbsp;

```solidity
    /**
     * @dev Destruye `amount` tokens de `account`, reduciendo el
     * suministro total.
     *
     * Emite un evento {Transfer} con `to` establecido en la dirección cero.
     *
     * Requisitos:
     *
     * - `account` no puede ser la dirección cero.
     * - `account` debe tener al menos `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

La función `_burn` es casi idéntica a `_mint`, excepto que va en la otra dirección.

#### La función _approve {#approve-2}

Esta es la función que realmente especifica las asignaciones. Tenga en cuenta que permite a un propietario especificar
una asignación que es mayor que el saldo actual del propietario. Esto está bien porque el saldo se
verifica en el momento de la transferencia, cuando podría ser diferente del saldo cuando se
crea la asignación.

```solidity
    /**
     * @dev Establece `amount` como la asignación de `spender` sobre los tokens de `owner`.
     *
     * Esta función interna es equivalente a `approve`, y puede usarse para
     * p. ej., establecer asignaciones automáticas para ciertos subsistemas, etc.
     *
     * Emite un evento {Approval}.
     *
     * Requisitos:
     *
     * - `owner` no puede ser la dirección cero.
     * - `spender` no puede ser la dirección cero.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Emita un evento `Approval`. Dependiendo de cómo esté escrita la aplicación, el propietario o un servidor que escuche estos eventos puede informar al contrato del gastador sobre la aprobación.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modificar la variable de decimales {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Establece {decimals} en un valor distinto al predeterminado de 18.
     *
     * ADVERTENCIA: Esta función solo debe llamarse desde el constructor. La mayoría
     * de las aplicaciones que interactúan con contratos de token no esperarán
     * que {decimals} cambie alguna vez, y pueden funcionar incorrectamente si lo hace.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Esta función modifica la variable `_decimals` que se utiliza para indicar a las interfaces de usuario cómo interpretar la cantidad.
Debería llamarla desde el constructor. Sería deshonesto llamarla en cualquier momento posterior, y las aplicaciones
no están diseñadas para manejarlo.

### Ganchos (Hooks) {#hooks}

```solidity

    /**
     * @dev Hook que se llama antes de cualquier transferencia de tokens. Esto incluye
     * la acuñación y la quema.
     *
     * Condiciones de llamada:
     *
     * - cuando `from` y `to` son ambos distintos de cero, `amount` de los tokens de ``from``
     * se transferirán a `to`.
     * - cuando `from` es cero, se acuñarán `amount` tokens para `to`.
     * - cuando `to` es cero, se quemarán `amount` de los tokens de ``from``.
     * - `from` y `to` nunca son ambos cero.
     *
     * Para obtener más información sobre los hooks, diríjase a xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Esta es la función de gancho que se llamará durante las transferencias. Aquí está vacía, pero si necesita
que haga algo, simplemente anúlela.

## Conclusión {#conclusion}

A modo de repaso, aquí hay algunas de las ideas más importantes en este contrato (en mi opinión, es probable que la suya varíe):

- _No hay secretos en la cadena de bloques_. Cualquier información a la que pueda acceder un contrato inteligente
  está disponible para todo el mundo.
- Puede controlar el orden de sus propias transacciones, pero no cuándo ocurren las transacciones de otras personas.
  Esta es la razón por la que cambiar una asignación puede ser peligroso, porque permite
  al gastador gastar la suma de ambas asignaciones.
- Los valores de tipo `uint256` se desbordan (wrap around). En otras palabras, _0-1=2^256-1_. Si ese no es el comportamiento
  deseado, debe verificarlo (o usar la biblioteca SafeMath que lo hace por usted). Tenga en cuenta que esto cambió en
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Realice todos los cambios de estado de un tipo específico en un lugar específico, porque facilita la auditoría.
  Esta es la razón por la que tenemos, por ejemplo, `_approve`, que es llamada por `approve`, `transferFrom`,
  `increaseAllowance` y `decreaseAllowance`
- Los cambios de estado deben ser atómicos, sin ninguna otra acción en el medio (como puede ver
  en `_transfer`). Esto se debe a que durante el cambio de estado tiene un estado inconsistente. Por ejemplo,
  entre el momento en que deduce del saldo del remitente y el momento en que agrega al saldo del
  destinatario, hay menos tokens en existencia de los que debería haber. Esto podría ser potencialmente abusado si
  hay operaciones entre ellos, especialmente llamadas a un contrato diferente.

Ahora que ha visto cómo está escrito el contrato ERC-20 de OpenZeppelin, y especialmente cómo se
hace más seguro, vaya y escriba sus propios contratos y aplicaciones seguros.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).