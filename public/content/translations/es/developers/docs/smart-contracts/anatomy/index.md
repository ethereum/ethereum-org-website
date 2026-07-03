---
title: "Anatomía de los contratos inteligentes"
description: "Un análisis en profundidad de la anatomía de un contrato inteligente: las funciones, los datos y las variables."
lang: es
---

Un contrato inteligente es un programa que se ejecuta en una dirección en Ethereum. Están compuestos por datos y funciones que pueden ejecutarse al recibir una transacción. A continuación, se presenta una descripción general de lo que compone un contrato inteligente.

## Requisitos previos {#prerequisites}

Asegúrese de haber leído primero sobre los [contratos inteligentes](/developers/docs/smart-contracts/). Este documento asume que ya está familiarizado con lenguajes de programación como JavaScript o Python.

## Datos {#data}

Cualquier dato del contrato debe asignarse a una ubicación: ya sea a `storage` o a `memory`. Modificar el almacenamiento en un contrato inteligente es costoso, por lo que debe considerar dónde deben residir sus datos.

### Almacenamiento {#storage}

Los datos persistentes se denominan almacenamiento y están representados por variables de estado. Estos valores se almacenan permanentemente en la cadena de bloques. Debe declarar el tipo para que el contrato pueda realizar un seguimiento de cuánto almacenamiento necesita en la cadena de bloques cuando se compila.

```solidity
// Ejemplo de Solidity
contract SimpleStorage {
    uint storedData; // Variable de estado
    // ...
}
```

```python
# Ejemplo de Vyper
storedData: int128
```

Si ya ha programado en lenguajes orientados a objetos, es probable que esté familiarizado con la mayoría de los tipos. Sin embargo, `address` debería ser nuevo para usted si es nuevo en el desarrollo de [Ethereum](/).

Un tipo `address` puede contener una dirección de Ethereum, lo que equivale a 20 bytes o 160 bits. Se devuelve en notación hexadecimal con un 0x inicial.

Otros tipos incluyen:

- booleanos
- enteros
- números de punto fijo
- matrices de bytes de tamaño fijo
- matrices de bytes de tamaño dinámico
- literales racionales y enteros
- literales de cadena
- literales hexadecimales
- enumeraciones (enums)

Para obtener más explicaciones, eche un vistazo a la documentación:

- [Ver tipos de Vyper](https://docs.vyperlang.org/en/stable/types.html#value-types)
- [Ver tipos de Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Memoria {#memory}

Los valores que solo se almacenan durante la vida útil de la ejecución de una función de contrato se denominan variables de memoria. Dado que no se almacenan permanentemente en la cadena de bloques, su uso es mucho más económico.

Obtenga más información sobre cómo la EVM almacena datos (almacenamiento, memoria y la pila) en la [documentación de Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Variables de entorno {#environment-variables}

Además de las variables que define en su contrato, existen algunas variables globales especiales. Se utilizan principalmente para proporcionar información sobre la cadena de bloques o la transacción actual.

Ejemplos:

| **Propiedad**     | **Variable de estado** | **Descripción**                      |
| ----------------- | ---------------------- | ------------------------------------ |
| `block.timestamp` | uint256            | Marca de tiempo de la época del bloque actual |
| `msg.sender`      | address            | Remitente del mensaje (llamada actual) |

## Funciones {#functions}

En los términos más simples, las funciones pueden obtener información o establecer información en respuesta a las transacciones entrantes.

Hay dos tipos de llamadas a funciones:

- `internal`: estas no crean una llamada a la EVM
  - A las funciones internas y a las variables de estado solo se puede acceder internamente (es decir, desde dentro del contrato actual o de los contratos que derivan de él)
- `external`: estas sí crean una llamada a la EVM
  - Las funciones externas forman parte de la interfaz del contrato, lo que significa que pueden ser llamadas desde otros contratos y mediante transacciones. Una función externa `f` no puede ser llamada internamente (es decir, `f()` no funciona, pero `this.f()` sí funciona).

También pueden ser `public` o `private`

- Las funciones `public` pueden ser llamadas internamente desde dentro del contrato o externamente a través de mensajes
- Las funciones `private` solo son visibles para el contrato en el que están definidas y no en los contratos derivados

Tanto las funciones como las variables de estado pueden hacerse públicas o privadas

Aquí hay una función para actualizar una variable de estado en un contrato:

```solidity
// Ejemplo de Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- El parámetro `value` de tipo `string` se pasa a la función: `update_name`
- Está declarada como `public`, lo que significa que cualquiera puede acceder a ella
- No está declarada como `view`, por lo que puede modificar el estado del contrato

### Funciones de vista (View) {#view-functions}

Estas funciones prometen no modificar el estado de los datos del contrato. Ejemplos comunes son las funciones "getter" (obtener); podría usar esto para recibir el saldo de un usuario, por ejemplo.

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

Qué se considera modificar el estado:

1. Escribir en variables de estado.
2. [Emitir eventos](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Crear otros contratos](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Usar `selfdestruct`.
5. Enviar ether mediante llamadas.
6. Llamar a cualquier función que no esté marcada como `view` o `pure`.
7. Usar llamadas de bajo nivel.
8. Usar ensamblador en línea (inline assembly) que contenga ciertos códigos de operación (opcodes).

### Funciones constructoras {#constructor-functions}

Las funciones `constructor` solo se ejecutan una vez cuando el contrato se despliega por primera vez. Al igual que `constructor` en muchos lenguajes de programación basados en clases, estas funciones a menudo inicializan variables de estado con sus valores especificados.

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
# Ejemplo de Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Funciones integradas {#built-in-functions}

Además de las variables y funciones que define en su contrato, existen algunas funciones integradas especiales. El ejemplo más obvio es:

- `address.send()` – Solidity
- `send(address)` – Vyper

Estas permiten a los contratos enviar ETH a otras cuentas.

## Escribir funciones {#writing-functions}

Su función necesita:

- variable de parámetro y tipo (si acepta parámetros)
- declaración de interna/externa (internal/external)
- declaración de pure/view/payable
- tipo de retorno (si devuelve un valor)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // variable de estado

    // Se llama cuando se despliega el contrato e inicializa el valor
    constructor() public {
        dapp_name = "My Example dapp";
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

Un contrato completo podría verse algo así. Aquí, la función `constructor` proporciona un valor inicial para la variable `dapp_name`.

## Eventos y registros {#events-and-logs}

Los eventos permiten que su contrato inteligente se comunique con su frontend u otras aplicaciones suscritas. Una vez que una transacción se valida y se agrega a un bloque, los contratos inteligentes pueden emitir eventos y registrar información, que el frontend puede procesar y utilizar.

## Ejemplos comentados {#annotated-examples}

Estos son algunos ejemplos escritos en Solidity. Si desea jugar con el código, puede interactuar con ellos en [Remix](https://remix.ethereum.org).

### Hola mundo {#hello-world}

```solidity
// Especifica la versión de Solidity, utilizando el versionado semántico.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Define un contrato llamado `HelloWorld`.
// Un contrato es una colección de funciones y datos (su estado).
// Una vez desplegado, un contrato reside en una dirección específica en la cadena de bloques de Ethereum.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declara una variable de estado `message` de tipo `string`.
    // Las variables de estado son variables cuyos valores se almacenan permanentemente en el almacenamiento del contrato.
    // La palabra clave `public` hace que las variables sean accesibles desde fuera de un contrato
    // y crea una función que otros contratos o clientes pueden llamar para acceder al valor.
    string public message;

    // De manera similar a muchos lenguajes orientados a objetos basados en clases, un constructor es
    // una función especial que solo se ejecuta en la creación del contrato.
    // Los constructores se utilizan para inicializar los datos del contrato.
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
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
    // Una `dirección` es comparable a una dirección de correo electrónico: se utiliza para identificar una cuenta en Ethereum.
    // Las direcciones pueden representar un contrato inteligente o cuentas externas (de usuario).
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Un `mapping` es esencialmente una estructura de datos de tabla hash.
    // Este `mapping` asigna un entero sin signo (el saldo del token) a una dirección (el titular del token).
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Los eventos permiten el registro de la actividad en la cadena de bloques.
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
        // `require` es una estructura de control utilizada para hacer cumplir ciertas condiciones.
        // Si una declaración `require` se evalúa como `false`, se activa una excepción,
        // que revierte todos los cambios realizados en el estado durante la llamada actual.
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Solo el propietario del contrato puede llamar a esta función
        require(msg.sender == owner, "You are not the owner.");

        // Impone una cantidad máxima de tokens
        require(amount < 1e60, "Maximum issuance exceeded");

        // Aumenta el saldo de `receiver` en `amount`
        balances[receiver] += amount;
    }

    // Envía una cantidad de tokens existentes de cualquier llamador a una dirección.
    function transfer(address receiver, uint amount) public {
        // El remitente debe tener suficientes tokens para enviar
        require(amount <= balances[msg.sender], "Insufficient balance.");

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

// Importa símbolos de otros archivos al contrato actual.
// En este caso, una serie de contratos auxiliares de OpenZeppelin.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// La palabra clave `is` se utiliza para heredar funciones y palabras clave de contratos externos.
// En este caso, `CryptoPizza` hereda de los contratos `IERC721` y `ERC165`.
// Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Utiliza la biblioteca SafeMath de OpenZeppelin para realizar operaciones aritméticas de forma segura.
    // Más información: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Las variables de estado constantes en Solidity son similares a las de otros lenguajes
    // pero debes asignar desde una expresión que sea constante en tiempo de compilación.
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Los tipos Struct te permiten definir tu propio tipo
    // Más información: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Crea un array vacío de structs Pizza
    Pizza[] public pizzas;

    // Mapeo del ID de la pizza a la dirección de su propietario
    mapping(uint256 => address) public pizzaToOwner;

    // Mapeo de la dirección del propietario al número de tokens poseídos
    mapping(address => uint256) public ownerPizzaCount;

    // Mapeo del ID del token a la dirección aprobada
    mapping(uint256 => address) pizzaApprovals;

    // Puedes anidar mappings, este ejemplo mapea el propietario a las aprobaciones del operador
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Función interna para crear una Pizza aleatoria a partir de una cadena (nombre) y ADN
    function _createPizza(string memory _name, uint256 _dna)
        // La palabra clave `internal` significa que esta función solo es visible
        // dentro de este contrato y los contratos que derivan de este contrato
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` es un modificador de función que comprueba si la pizza ya existe
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Añade la Pizza al array de Pizzas y obtiene el id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Comprueba que el propietario de la Pizza sea el mismo que el usuario actual
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // ten en cuenta que address(0) es la dirección cero,
        // lo que indica que pizza[id] aún no está asignada a un usuario en particular.

        assert(pizzaToOwner[id] == address(0));

        // Mapea la Pizza al propietario
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Crea una Pizza aleatoria a partir de una cadena (nombre)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Genera ADN aleatorio a partir de una cadena (nombre) y la dirección del propietario (creador)
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

    // Devuelve un array de Pizzas encontradas por el propietario
    function getPizzasByOwner(address _owner)
        public
        // Las funciones marcadas como `view` prometen no modificar el estado
        // Más información: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Utiliza la ubicación de almacenamiento `memory` para almacenar valores solo durante el
        // ciclo de vida de esta llamada a la función.
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

    // Transfiere la Pizza y la propiedad a otra dirección
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Emite el evento definido en el contrato IERC721 importado
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Transfiere de forma segura la propiedad de un ID de token dado a otra dirección
     * Si la dirección de destino es un contrato, debe implementar `onERC721Received`,
     * que se llama tras una transferencia segura, y devolver el valor mágico
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
     * Transfiere de forma segura la propiedad de un ID de token dado a otra dirección
     * Si la dirección de destino es un contrato, debe implementar `onERC721Received`,
     * que se llama tras una transferencia segura, y devolver el valor mágico
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
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
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

    // Quema una Pizza - destruye el token por completo
    // El modificador de función `external` significa que esta función es
    // parte de la interfaz del contrato y otros contratos pueden llamarla
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

    // Devuelve el recuento de Pizzas por dirección
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Devuelve el propietario de la Pizza encontrada por id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Aprueba a otra dirección para transferir la propiedad de la Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Devuelve la dirección aprobada para una Pizza específica
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Función privada para borrar la aprobación actual de un ID de token dado
     * Se revierte si la dirección dada no es de hecho el propietario del token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Establece o anula la aprobación de un operador dado
     * A un operador se le permite transferir todos los tokens del remitente en su nombre
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Indica si un operador está aprobado por un propietario dado
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Toma la propiedad de la Pizza - solo para usuarios aprobados
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Comprueba si la Pizza existe
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Comprueba si la dirección es el propietario o está aprobada para transferir la Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Deshabilita la comprobación de solium debido a
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Comprueba si la Pizza es única y aún no existe
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

    // Devuelve si la dirección de destino es un contrato
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Actualmente no hay una mejor manera de comprobar si hay un contrato en una dirección
        // que comprobar el tamaño del código en esa dirección.
        // Consulta https://ethereum.stackexchange.com/a/14016/36603
        // para obtener más detalles sobre cómo funciona esto.
        // TODO Comprobar esto de nuevo antes del lanzamiento de Serenity, porque todas las direcciones serán
        // contratos entonces.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Lecturas adicionales {#further-reading}

Consulte la documentación de Solidity y Vyper para obtener una descripción más completa de los contratos inteligentes:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Temas relacionados {#related-topics}

- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Máquina virtual de Ethereum](/developers/docs/evm/)

## Tutoriales relacionados {#related-tutorials}

- [Reducción del tamaño de los contratos para combatir el límite de tamaño del contrato](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Algunos consejos prácticos para reducir el tamaño de su contrato inteligente._
- [Registro de datos de contratos inteligentes con eventos](/developers/tutorials/logging-events-smart-contracts/) _– Una introducción a los eventos de contratos inteligentes y cómo puede usarlos para registrar datos._
- [Interactuar con otros contratos desde Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cómo desplegar un contrato inteligente desde un contrato existente e interactuar con él._
