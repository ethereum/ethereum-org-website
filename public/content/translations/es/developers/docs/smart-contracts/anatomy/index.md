---
title: "Anatomía de los contratos inteligentes"
description: "Una mirada en profundidad a la anatomía de un contacto inteligente: Sus funciones, datos y variables."
lang: es
---

Un contrato inteligente es un programa que se ejecuta en una dirección en Ethereum. Están formados por datos y funciones, que se pueden ejecutar al recibir una transacción. A continuación encontrarás una visión general de lo que compone un contrato inteligente.

## Requisitos previos {#prerequisites}

Asegúrese de haber leído primero sobre los [contratos inteligentes](/developers/docs/smart-contracts/). Este documento asume que ya estás familiarizado con lenguajes de programación como JavaScript o Python.

## Datos {#data}

Cualquier dato del contrato debe asignarse a una ubicación: ya sea a `storage` o `memory`. Es costoso modificar el almacenamiento en un contrato inteligente, por lo que debes considerar dónde deben ubicarse sus datos.

### Almacenamiento {#storage}

Los datos persistentes se denominan almacenamiento y se representan por variables de estado. Estos valores se almacenan permanentemente en la blockchain. Necesitas declarar el tipo de dato para que el contrato pueda llevar un seguimiento de la cantidad de almacenamiento en la blockchain que se necesitará cuando compile.

```solidity
// Ejemplo de Solidity
contract SimpleStorage {
    uint storedData; // Variable de estado
    // ...
}
```

```python
# ejemplo de Vyper
storedData: int128
```

Si ya has utilizado lenguajes de programación orientados a objetos, probablemente estarás familiarizado con la mayoría de tipos de datos. Sin embargo, `address` debería ser nuevo para usted si es nuevo en el desarrollo de Ethereum.

Un tipo `address` puede contener una dirección de Ethereum que equivale a 20 bytes o 160 bits. Devuelve en notación hexadecimal con un 0x al inicio.

Otros tipos de variables incluyen:

- booleano
- entero
- números de punto fijo
- matrices de bytes de punto fijo
- matrices de bytes de tamaño dinámico
- literales racionales y enteros
- literales de cadena
- literales hexadecimales
- enums

Para más explicación, echa un vistazo a la documentación:

- [Ver tipos de Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Ver tipos de Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Memoria {#memory}

Los valores que sólo se almacenan durante la vida útil de la ejecución de una función de contrato se llaman variables de memoria. Dado que estos no se almacenan permanentemente en la blockchain, son mucho más baratos de usar.

Obtenga más información sobre cómo la EVM almacena los datos (almacenamiento, memoria y pila) en los [documentos de Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Variables de entorno {#environment-variables}

Además de las variables que se definen en su contrato, hay algunas variables globales especiales. Se utilizan principalmente para proporcionar información acerca de la cadena de bloques o la transacción actual.

Ejemplos:

| **Propiedad**     | **Variable de estado** | **Descripción**                                           |
| ----------------- | ---------------------- | --------------------------------------------------------- |
| `block.timestamp` | uint256                | Marca de tiempo del bloque actual                         |
| `msg.sender`      | dirección              | Remitente del mensaje (llamada actual) |

## Funciones {#functions}

De una forma simplista, las funciones pueden obtener información o establecer información en respuesta a las transacciones entrantes.

Existen dos tipos de llamadas de funciones:

- `internal`: estas no crean una llamada a la EVM
  - Solo se puede acceder a las funciones y variables de estado internas desde dentro (es decir, desde el contrato actual o los contratos que se deriven de él)
- `external`: estas sí crean una llamada a la EVM
  - Las funciones externas forman parte de la interfaz del contrato, lo que significa que se pueden llamar desde otros contratos y a través de transacciones. Una función externa `f` no se puede llamar internamente (es decir, `f()` no funciona, pero `this.f()` sí).

También pueden ser `public` o `private`

- Las funciones `public` se pueden llamar internamente desde el contrato o externamente a través de mensajes
- Las funciones `private` solo son visibles para el contrato en el que se definen y no para los contratos derivados

Tanto las funciones como las variables de estado pueden hacerse públicas o privadas.

Aquí se ejemplifica una función para actualizar una variable de estado en un contrato:

```solidity
// ejemplo de Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- El parámetro `value` de tipo `string` se pasa a la función: `update_name`
- Se declara como `public`, lo que significa que cualquiera puede acceder a ella
- No se declara como `view`, por lo que puede modificar el estado del contrato

### Funciones de vista {#view-functions}

Estas funciones no modifican el estado de los datos del contrato. Ejemplos comunes son las funciones "getter", que se pueden utilizar para recibir el saldo o balance de un usuario, por ejemplo.

```solidity
// Ejemplo de Solidity
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

Qué se considera modificar un estado:

1. Escribir a variables de estado.
2. [Emisión de eventos](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Creación de otros contratos](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Uso de `selfdestruct`.
5. Enviae ethers mediante llamadas.
6. Llamar a cualquier función no marcada como `view` o `pure`.
7. Usar llamadas de bajo nivel.
8. Utilizando un ensamblaje en línea que contiene ciertos códigos de operador.

### Funciones constructoras {#constructor-functions}

Las funciones `constructor` solo se ejecutan una vez cuando el contrato se implementa por primera vez. Al igual que `constructor` en muchos lenguajes de programación basados en clases, estas funciones a menudo inicializan las variables de estado con sus valores especificados.

```solidity
// Ejemplo de Solidity
// Inicializa los datos del contrato, estableciendo el `owner`
// a la dirección del creador del contrato.
constructor() public {
    // Todos los contratos inteligentes dependen de transacciones externas para activar sus funciones.
    // `msg` es una variable global que incluye datos relevantes sobre la transacción dada,
    // como la dirección del remitente y el valor de ETH incluido en la transacción.
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Ejemplo en Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Funciones incorporadas {#built-in-functions}

Además de las variables y funciones que define en su contrato, hay algunas funciones especiales integradas. El ejemplo más obvio es:

- `address.send()` – Solidity
- `send(address)` – Vyper

Esto permite que los contratos envíen ETH a otras cuentas.

## Escribir funciones {#writing-functions}

Su función necesita:

- parámetro de la variable y tipo de variable (si acepta parámetros)
- declaraciónde variable interna/externa
- declaración de variable de tipo pure/view/payable
- devuelve el tipo (valor, en caso de devolución)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // variable de estado

    // Se llama cuando el contrato se implementa e inicializa el valor
    constructor() public {
        dapp_name = "Mi dapp de ejemplo";
    }

    // Función Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Función Set
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Un contrato completo podría verse así. Aquí la función `constructor` proporciona un valor inicial para la variable `dapp_name`.

## Eventos y registros {#events-and-logs}

Los eventos permiten que su contrato inteligente se comunique con su interfaz o frontend, u otras aplicaciones de suscripción. Una vez que una transacción es validada y se agrega a un bloque, los contratos inteligentes pueden emitir eventos y registrar información, que la frontend puede procesar y utilizar.

## Ejemplos anotados {#annotated-examples}

Estos son algunos ejemplos escritos en Solidity. Si le gustaría jugar con el código, puede interactuar con ellos en [Remix](http://remix.ethereum.org).

### Hola, mundo {#hello-world}

```solidity
// Especifica la versión de Solidity, usando un versionado semántico.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Define un contrato llamado `HelloWorld`.
// Un contrato es una colección de funciones y datos (su estado).
// Una vez implementado, un contrato reside en una dirección específica de la cadena de bloques de Ethereum.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declara una variable de estado `message` de tipo `string`.
    // Las variables de estado son variables cuyos valores se almacenan permanentemente en el almacenamiento del contrato.
    // La palabra clave `public` hace que las variables sean accesibles desde fuera de un contrato
    // y crea una función a la que otros contratos o clientes pueden llamar para acceder al valor.
    string public message;

    // Al igual que en muchos lenguajes de programación orientados a objetos basados en clases, un constructor es
    // una función especial que solo se ejecuta en la creación del contrato.
    // Los constructores se utilizan para inicializar los datos del contrato.
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Acepta un argumento de cadena `initMessage` y establece el valor
        // en la variable de almacenamiento `message` del contrato.
        message = initMessage;
    }

    // Una función pública que acepta un argumento de cadena
    // y actualiza la variable de almacenamiento `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Una `address` es comparable a una dirección de correo electrónico; se utiliza para identificar una cuenta en Ethereum.
    // Las direcciones pueden representar un contrato inteligente o cuentas externas (de usuario).
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Un `mapping` es, esencialmente, una estructura de datos de tabla de hash.
    // Este `mapping` asigna un número entero sin signo (el saldo del token) a una dirección (el poseedor del token).
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Los eventos permiten registrar la actividad en la cadena de bloques.
    // Los clientes de Ethereum pueden escuchar eventos para reaccionar a los cambios de estado del contrato.
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Inicializa los datos del contrato, estableciendo el `owner`
    // a la dirección del creador del contrato.
    constructor() public {
        // Todos los contratos inteligentes dependen de transacciones externas para activar sus funciones.
        // `msg` es una variable global que incluye datos relevantes sobre la transacción dada,
        // como la dirección del remitente y el valor de ETH incluido en la transacción.
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Crea una cantidad de nuevos tokens y los envía a una dirección.
    function mint(address receiver, uint amount) public {
        // `require` es una estructura de control que se utiliza para aplicar ciertas condiciones.
        // Si una declaración `require` se evalúa como `false`, se activa una excepción,
        // que revierte todos los cambios realizados en el estado durante la llamada actual.
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Solo el propietario del contrato puede llamar a esta función
        require(msg.sender == owner, "Usted no es el propietario.");

        // Aplica una cantidad máxima de tokens
        require(amount < 1e60, "Se superó la emisión máxima");

        // Aumenta el saldo de `receiver` en `amount`
        balances[receiver] += amount;
    }

    // Envía una cantidad de tokens existentes desde cualquier llamador a una dirección.
    function transfer(address receiver, uint amount) public {
        // El remitente debe tener suficientes tokens para enviar
        require(amount <= balances[msg.sender], "Saldo insuficiente.");

        // Ajusta los saldos de tokens de las dos direcciones
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Emite el evento definido anteriormente
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Activo digital único {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Importa símbolos de otros archivos en el contrato actual.
// En este caso, una serie de contratos de ayuda de OpenZeppelin.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// La palabra clave `is` se utiliza para heredar funciones y palabras clave de contratos externos.
// En este caso, `CryptoPizza` hereda de los contratos `IERC721` y `ERC165`.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Utiliza la librería SafeMath de OpenZeppelin para realizar operaciones aritméticas de forma segura.
    // Más información: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Las variables de estado constantes en Solidity son similares a las de otros lenguajes,
    // pero debe asignarlas desde una expresión que sea constante en tiempo de compilación.
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Los tipos de estructura le permiten definir su propio tipo
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Crea una matriz vacía de estructuras de Pizza
    Pizza[] public pizzas;

    // Mapeo del ID de la pizza a la dirección de su propietario
    mapping(uint256 => address) public pizzaToOwner;

    // Mapeo de la dirección del propietario al número de tokens que posee
    mapping(address => uint256) public ownerPizzaCount;

    // Mapeo del ID del token a la dirección aprobada
    mapping(uint256 => address) pizzaApprovals;

    // Puede anidar mapeos, este ejemplo mapea al propietario a las aprobaciones del operador
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Función interna para crear una Pizza aleatoria a partir de una cadena (nombre) y un ADN
    function _createPizza(string memory _name, uint256 _dna)
        // La palabra clave `internal` significa que esta función solo es visible
        // dentro de este contrato y de los contratos que derivan de este
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` es un modificador de función que comprueba si la pizza ya existe
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Añade una pizza a la matriz de pizzas y obtiene el ID
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Comprueba que el propietario de la pizza es el mismo que el usuario actual
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // tenga en cuenta que address(0) es la dirección cero,
        // lo que indica que pizza[id] aún no está asignada a un usuario en particular.

        assert(pizzaToOwner[id] == address(0));

        // Mapea la pizza al propietario
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Crea una pizza aleatoria a partir de una cadena (nombre)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Genera un ADN aleatorio a partir de una cadena (nombre) y la dirección del propietario (creador)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Las funciones marcadas como `pure` prometen no leer ni modificar el estado
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Genera un uint aleatorio a partir de una cadena (nombre) + dirección (propietario)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Devuelve una matriz de pizzas encontradas por el propietario
    function getPizzasByOwner(address _owner)
        public
        // Las funciones marcadas como `view` prometen no modificar el estado
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Utiliza la ubicación de almacenamiento `memory` para almacenar valores solo durante
        // el ciclo de vida de esta llamada de función.
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Transfiere la pizza y la propiedad a otra dirección
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Dirección no válida.");
        require(_exists(_pizzaId), "La pizza no existe.");
        require(_from != _to, "No se puede transferir a la misma dirección.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "La dirección no está aprobada.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emite el evento definido en el contrato IERC721 importado
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Transfiere de forma segura la propiedad de un ID de token determinado a otra dirección
     * Si la dirección de destino es un contrato, debe implementar `onERC721Received`,
     * que se llama en una transferencia segura, y devuelve el valor mágico
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * de lo contrario, la transferencia se revierte.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Transfiere de forma segura la propiedad de un ID de token determinado a otra dirección
     * Si la dirección de destino es un contrato, debe implementar `onERC721Received`,
     * que se llama en una transferencia segura, y devuelve el valor mágico
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * de lo contrario, la transferencia se revierte.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Debe implementar onERC721Received.");
    }

    /**
     * Función interna para invocar `onERC721Received` en una dirección de destino
     * La llamada no se ejecuta si la dirección de destino no es un contrato
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // Quema una pizza: destruye el token por completo
    // El modificador de función `external` significa que esta función forma
    // parte de la interfaz del contrato y otros contratos pueden llamarla
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Dirección no válida.");
        require(_exists(_pizzaId), "La pizza no existe.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "La dirección no está aprobada.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Devuelve el recuento de pizzas por dirección
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Devuelve el propietario de la pizza encontrada por ID
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "ID de pizza no válido.");
        return owner;
    }

    // Aprueba a otra dirección para transferir la propiedad de la pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Debe ser el propietario de la pizza.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Devuelve la dirección aprobada para una pizza específica
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "La pizza no existe.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Función privada para borrar la aprobación actual de un ID de token determinado
     * Se revierte si la dirección dada no es realmente la propietaria del token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Debe ser el propietario de la pizza.");
        require(_exists(_pizzaId), "La pizza no existe.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Establece o anula la aprobación de un operador determinado
     * Un operador puede transferir todos los tokens del remitente en su nombre
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "No se puede aprobar la propia dirección");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Indica si un operador está aprobado por un propietario determinado
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Toma la propiedad de la pizza: solo para usuarios aprobados
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "La dirección no está aprobada.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Comprueba si la pizza existe
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Comprueba si la dirección es la propietaria o está aprobada para transferir la pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Desactivar la comprobación de solium debido a
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Comprueba si la pizza es única y no existe todavía
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Ya existe una pizza con ese nombre.");
        _;
    }

    // Devuelve si la dirección de destino es un contrato
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Actualmente no hay una forma mejor de comprobar si hay un contrato en una dirección
        // que comprobar el tamaño del código en esa dirección.
        // Consulte https://ethereum.stackexchange.com/a/14016/36603
        // para obtener más detalles sobre cómo funciona.
        // TODO: Vuelva a comprobar esto antes del lanzamiento de Serenity, porque entonces todas las direcciones serán
        // contratos.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Lecturas adicionales {#further-reading}

Revise la documentación de Solidity y Vyper para ver una descripción más completa de los contratos inteligentes:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Temas relacionados {#related-topics}

- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Máquina virtual de Ethereum](/developers/docs/evm/)

## Tutoriales relacionados {#related-tutorials}

- [Reducción del tamaño de los contratos para luchar contra el límite de tamaño de los contratos](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Algunos consejos prácticos para reducir el tamaño de su contrato inteligente._
- [Registro de datos de contratos inteligentes con eventos](/developers/tutorials/logging-events-smart-contracts/) _– Una introducción a los eventos de contratos inteligentes y cómo puede utilizarlos para registrar datos._
- [Interactuar con otros contratos desde Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cómo implementar un contrato inteligente a partir de un contrato existente e interactuar con él._
