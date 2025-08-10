---
title: Anatomía de los contratos inteligentes
description: 'Una mirada en profundidad a la anatomía de un contacto inteligente: Sus funciones, datos y variables.'
lang: es
---

Un contrato inteligente es un programa que se ejecuta en una dirección en Ethereum. Están formados por datos y funciones, que se pueden ejecutar al recibir una transacción. A continuación encontrarás una visión general de lo que compone un contrato inteligente.

## Requisitos previos {#prerequisites}

Asegúrate de haber leído primero la documentación sobre los [contratos inteligentes](/developers/docs/smart-contracts/). Este documento asume que ya estás familiarizado con lenguajes de programación como JavaScript o Python.

## Datos {#data}

Cualquier dato del contrato debe asignarse a una ubicación: ya sea a `almacenamiento` o `memoria`. Es costoso modificar el almacenamiento en un contrato inteligente, por lo que debes considerar dónde deben ubicarse sus datos.

### Almacenamiento {#storage}

Los datos persistentes se denominan almacenamiento y se representan por variables de estado. Estos valores se almacenan permanentemente en la blockchain. Necesitas declarar el tipo de dato para que el contrato pueda llevar un seguimiento de la cantidad de almacenamiento en la blockchain que se necesitará cuando compile.

```solidity
// ejemplo de Solidity
contract SimpleStorage {
    uint storedData; // variable de estado
    // ...
}
```

```python
# ejemplo de Vyper
storedData: int128
```

Si ya has utilizado lenguajes de programación orientados a objetos, probablemente estarás familiarizado con la mayoría de tipos de datos. Sin embargo, la `dirección` debe ser nueva para ti si eres nuevo en el desarrollo de Ethereum.

Una variable de tipo `dirección ` puede contener una dirección de Ethereum que equivale a 20 bytes o 160 bits. Devuelve en notación hexadecimal con un 0x al inicio.

Otros tipos de variables incluyen:

- booleano
- entero
- números de punto fijo
- matrices de bytes de punto fijo
- matrices de bytes de tamaño dinámico
- Literales de tipo real, racional o integradores
- Literales de cadenas de caracteres
- Literales en base hexadecimal
- Enumeraciones

Para más explicación, echa un vistazo a la documentación:

- [Ver los de tipo Vyper](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Ver los de tipo Solidity](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Memoria {#memory}

Los valores que sólo se almacenan durante la vida útil de la ejecución de una función de contrato se llaman variables de memoria. Dado que estos no se almacenan permanentemente en la blockchain, son mucho más baratos de usar.

Obtén más información sobre cómo la EVM almacena datos (almacenamiento, memoria y pila) en la [documentación de Solidity](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

### Variables de entorno {#environment-variables}

Además de las variables que se definen en su contrato, hay algunas variables globales especiales. Se utilizan principalmente para proporcionar información acerca de la cadena de bloques o la transacción actual.

Ejemplos:

| **Propiedad**     | **Variable de estado** | **Descripción**                        |
| ----------------- | ---------------------- | -------------------------------------- |
| `block.timestamp` | uint256                | Marca de tiempo del bloque actual      |
| `msg.sender`      | dirección              | Remitente del mensaje (llamada actual) |

## Funciones {#functions}

De una forma simplista, las funciones pueden obtener información o establecer información en respuesta a las transacciones entrantes.

Existen dos tipos de llamadas de funciones:

- `Internas`: Estas no crean una llamada a la EVM.
  - Solo se puede acceder a las funciones internas y a las variables de estado internamente (es decir, desde el contrato actual o los contratos que derivan de él)
- `Externas`: Estas crean una llamada a la EVM.
  - Las funciones externas forman parte de la interfaz del contrato, lo que significa que se pueden llamar desde otros contratos y a través de transacciones. Una función externa `f` no puede llamarse internamente (es decir, `f()` no funciona, pero `this.f()` funciona).

También pueden ser `públicas` o `privadas`.

- las funciones `públicas` pueden llamarse internamente desde dentro del contrato o externamente a través de mensajes
- las funciones `privadas` solo son visibles para el contrato en el que están definidas y no en contratos derivados

Tanto las funciones como las variables de estado pueden hacerse públicas o privadas.

Aquí se ejemplifica una función para actualizar una variable de estado en un contrato:

```solidity
// ejemplo de Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- El parámetro `valor` del tipo `string` se transfiere a la función: `update_name`
- Se declara `pública`, lo que significa que cualquiera puede acceder a ella.
- No está declarada `view` para solo lectura, por lo que puede modificar el estado del contrato.

### Funciones de visualización {#view-functions}

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
2. [Emisión de eventos](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events).
3. [Creando otros contratos](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. Usar la variable `selfdestruct`.
5. Enviae ethers mediante llamadas.
6. Llamar a cualquier función no marcada como sólo lectura `view` o `pure`.
7. Usar llamadas de bajo nivel.
8. Utilizando un ensamblaje en línea que contiene ciertos códigos de operador.

### Funciones de constructor {#constructor-functions}

Las funciones `constructor` solo se ejecutan una vez cuando el contrato es implementado por primera vez. Al igual que ocurre con `constructor` en muchos otros lenguajes de programación basados en clases, estas funciones a menudo inicializan variables de estado a sus valores especificados.

```solidity
// Ejemplo de Solidity
// Inicializa los datos del contrato, estableciendo el `propietario`
// Establece la dirección del creador del contrato
constructor() public {
    // Todos los contratos inteligentes dependen de transacciones externas para activar sus funciones.
    // `msg` es una variable global que incluye datos relevantes en la transacción dada,
    // tales como la dirección del remitente y el valor ETH incluido en la transacción.
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

### Funciones integradas {#built-in-functions}

Además de las variables y funciones que define en su contrato, hay algunas funciones especiales integradas. El ejemplo más obvio es:

- `address.send()`: Solidity
- `send(address)` – Vyper

Esto permite que los contratos envíen ETH a otras cuentas.

## Funciones de escritura {#writing-functions}

Su función necesita:

- parámetro de la variable y tipo de variable (si acepta parámetros)
- declaraciónde variable interna/externa
- declaración de variable de tipo pure/view/payable
- devuelve el tipo (valor, en caso de devolución)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // state variable

    // Called when the contract is deployed and initializes the value
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get Function
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set Function
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Un contrato completo podría verse así. Aquí la función `constructor` proporciona un valor inicial para la variable `dapp_name`.

## Eventos y registros {#events-and-logs}

Los eventos permiten que su contrato inteligente se comunique con su interfaz o frontend, u otras aplicaciones de suscripción. Una vez que una transacción es validada y se agrega a un bloque, los contratos inteligentes pueden emitir eventos y registrar información, que la frontend puede procesar y utilizar.

## Ejemplos anotados {#annotated-examples}

Estos son algunos ejemplos escritos en Solidity. Si quiere experimentar con el código, puede interactuar con ellos en [Remix](http://remix.ethereum.org).

### Hello World {#hello-world}

```solidity
// Especifica la versión de Solidity, utilizando la versión semántica.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragmma
pragma solidity ^0.5.10;

// Define un contrato llamado `HelloWorld`.
// Un contrato es una colección de funciones y datos (su estado).
// Una vez desplegado, un contrato reside en una dirección específica en la blockchain de Ethereum.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declara una variable de estado `message` del tipo `string`.
    // Las variables de estado son variables cuyos valores se almacenan permanentemente en el almacenamiento del contrato.
    // La palabra clave `public` hace que las variables sean accesibles desde fuera de un contrato
    // y crea una función que otros contratos o clientes pueden llamar para acceder al valor.
    string public message;

    // Similar a muchos idiomas orientados a objetos basados en clases, un constructor es
    // una función especial que sólo se ejecuta cuando se crea un contrato.
    // Los constructores se utilizan para inicializar los datos del contrato.
    // Más información: https://solidity.readthedocs.io/es/v0.5.10/contracts. tml#constructors
    constructor(string memory initMessage) public {
        // Acepta un argumento de cadena `initMessage` y establece el valor
        // en la variable de almacenamiento `message` del contrato).
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
    // Una `dirección` es comparable a una dirección de correo electrónico - se usa para identificar una cuenta en Ethereum.
    // Direcciones pueden representar un contrato inteligente o una cuenta externa (de usuario).
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Un `mapping` es esencialmente una estructura de datos de tabla hash.
    // Este `mapping` asigna un entero sin signo (el saldo del token) a una dirección (el titular del token).
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Los eventos permiten registrar la actividad en la blockchain.
    // Los clientes de Ethereum pueden escuchar eventos para reaccionar a los cambios de estado del contrato.
    // Más información: https://solidity.readthedocs.io/es/v0.5.10/contracts. tml#events
    event Transfer(address from, address to, uint amount);

    // Inicializa los datos del contrato establecer el `dueño`
    // a la dirección del creador del contrato.
    constructor() public {
    // Todos los contratos inteligentes dependen de transacciones externas para activar sus funciones.
        // `msg` es una variable global que incluye datos relevantes en la transacción dada,
    // tales como la dirección del remitente y el valor ETH incluido en la transacción.
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Crea una cantidad de nuevos tokens y los envía a una dirección.
    function mint(address receiver, uint amount) public {
        // `requiere` es una estructura de control utilizada para hacer cumplir ciertas condiciones.
        // Si una instrucción `require` evalúa a `falso`, se activa una excepción,
        // la cual revierte todos los cambios realizados en el estado durante la llamada actual.
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Sólo el propietario del contrato puede llamar a esta función
        require(msg.sender == owner, "You are not the owner.");

        // Impone una cantidad máxima de tokens
        require(amount < 1e60, "Maximum issuance exceeded");

        // Aumenta el saldo del `receiver` en `amount`.
        balances[receiver] += amount;
    }

    // Envía una cantidad de tokens existentes de cualquier llamante a una dirección.
    function transfer(address receiver, uint amount) public {
        // El remitente debe tener suficientes tokens para enviar
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Ajusta el saldo del token de las dos direcciones
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

// Importa símbolos de otros archivos al contrato actual.
// En este caso, una serie de contratos de ayuda de OpenZeppelin.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// The `is` keyword is used to inherit functions and keywords from external contracts.
// En este caso, `CryptoPizza` hereda de los contratos `IERC721` y `ERC165`.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Utiliza la librería SafeMath de OpenZeppelin para realizar operaciones aritméticas de forma segura.
    // Más información: 
https://docs.openzeppelin.com/contracts/3. /api/math#SafeMath
    using SafeMath for uint256;

    // Las variables de estado constantes en Solidity son similares a otros idiomas
    // pero debe asignar desde una expresión que es constante en el momento de compilar.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct types let you define your own type
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Creates an empty array of Pizza structs
    Pizza[] public pizzas;

    // Mapping from pizza ID to its owner's address
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping from owner's address to number of owned token
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping from token ID to approved address
    mapping(uint256 => address) pizzaApprovals;

    // You can nest mappings, this example maps owner to operator approvals
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Internal function to create a random Pizza from string (name) and DNA
    function _createPizza(string memory _name, uint256 _dna)
        // The `internal` keyword means this function is only visible
        // within this contract and contracts that derive this contract
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` is a function modifier that checks if the pizza already exists
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Adds Pizza to array of Pizzas and get id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Checks that Pizza owner is the same as current user
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // note that address(0) is the zero address,
        // indicating that pizza[id] is not yet allocated to a particular user.

        assert(pizzaToOwner[id] == address(0));

        // Maps the Pizza to the owner
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Creates a random Pizza from string (name)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generates random DNA from string (name) and address of the owner (creator)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Functions marked as `pure` promise not to read from or modify the state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generates random uint from string (name) + address (owner)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Returns array of Pizzas found by owner
    function getPizzasByOwner(address _owner)
        public
        // Functions marked as `view` promise not to modify state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Uses the `memory` storage location to store values only for the
        // lifecycle of this function call.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Transfers Pizza and ownership to other address
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emits event defined in the imported IERC721 contract
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * otherwise, the transfer is reverted.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * Internal function to invoke `onERC721Received` on a target address
     * The call is not executed if the target address is not a contract
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

    // Burns a Pizza - destroys Token completely
    // The `external` function modifier means this function is
    // part of the contract interface and other contracts can call it
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Returns count of Pizzas by address
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Returns owner of the Pizza found by id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Approves other address to transfer ownership of Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Returns approved address for specific Pizza
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Private function to clear current approval of a given token ID
     * Reverts if the given address is not indeed the owner of the token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Sets or unsets the approval of a given operator
     * An operator is allowed to transfer all tokens of the sender on their behalf
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Tells whether an operator is approved by a given owner
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Takes ownership of Pizza - only for approved users
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Checks if Pizza exists
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Checks if address is owner or is approved to transfer Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Check if Pizza is unique and doesn't exist yet
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
        require(result, "Pizza with such name already exists.");
        _;
    }

    // Returns whether the target address is a contract
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Currently there is no better way to check if there is a contract in an address
        // than to check the size of the code at that address.
        // En https://ethereum.stackexchange.com/a/14016/36603
        // podrás consultar más detalles sobre cómo funciona esto.
        // TODO Verifica esto de nuevo antes de el lanzamiento de Serenity, porque todas las direcciones serán
        // contratos entonces.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Más información {#further-reading}

Revise la documentación de Solidity y Vyper para ver una descripción más completa de los contratos inteligentes:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Temas relacionados {#related-topics}

- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Máquina virtual de Ethereum](/developers/docs/evm/)

## Tutoriales relacionados {#related-tutorials}

- [Reducir el tamaño de los contratos para luchar contra el límite de tamaño del contrato](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _: Algunos consejos prácticos para reducir el tamaño de tu contrato inteligente._
- [Registro de datos de contratos inteligentes con eventos](/developers/tutorials/logging-events-smart-contracts/) _: Una introducción a los eventos de contratos inteligentes y cómo puede utilizarlos para registrar datos._
- [Interactuar con otros contratos de Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/)_: Cómo implementar un contrato inteligente de un contrato existente e interactuar con él._
