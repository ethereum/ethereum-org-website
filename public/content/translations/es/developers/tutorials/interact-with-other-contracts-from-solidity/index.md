---
title: Interactúe con otros contratos desde Solidity
description: Cómo implementar un contrato inteligente desde un contrato existente e interactuar con él
author: "jdourlens"
tags:
  - "contratos inteligentes"
  - "solidity"
  - "remix"
  - "implementación"
  - "capacidad de composición"
skill: advanced
lang: es
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En los tutoriales anteriores aprendimos mucho sobre [cómo implementar su primer contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) y agregar algunas funciones como [control de acceso con modificadores](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) o [manejo de errores en Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). En este tutorial aprenderemos cómo implementar un contrato inteligente desde un contrato existente e interactuar con él.

Vamos a hacer un contrato que permita a cualquiera tener su propio contrato inteligente de `Counter` mediante la creación de una fábrica para tal propósito: se llamará `CounterFactory`. En primer lugar, aquí tenemos el código del contrato inteligente `Counter` inicial:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

Tenga en cuenta que modificamos ligeramente el código del contrato para controlar la dirección de la fábrica y la dirección del contrato del propietario. Al hacer una llamada al código de un contrato desde otro contrato, msg.sender hará referencia a la dirección de la fábrica del contrato. Este es **un punto realmente importante que hay que entender**, ya que utilizar un contrato para interactuar con otros contratos es una práctica común. Por tanto, se debería prestar a atención a quién es el remitente en casos complejos.

Por esta razón, también añadimos un modificador `onlyFactory` que se asegure de que la función de cambio de estado solo pueda ser invocada por la fábrica que pasará el invocador inicial como parámetro.

Dentro de nuestro `CounterFactory` que administrará todos los demás Counters, agregaremos un mapeo que asociará a un propieatario con la dirección de este contrato de contador:

```solidity
mapping(address => Counter) _counters;
```

En Ethereum, los mapeos, o mappings, son equivalentes a los objetos en JavaScript: permiten asociar una clave de tipo A a un valor de tipo B. En este caso, asociamos la dirección de un propietario con la instancia de su contador.

La instanciación de un Contador nuevo para alguien se verá de la siguiente manera:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Primero, revisaremos si la persona en cuestión ya es propietaria de un contador. Si ese no es el caso, instanciaremos un nuevo contador pasando su dirección al constructor de `Counter` y asignar la instancia recientemente creada al mapeo.

Para obtener el conteo de un Contador específico, se verá así:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

La primera función revisa si el contrato del Contador existe para una dirección proporcionada y luego llama al método `getCount` desde la instancia. La segunda función, `getMyCount`, es solo un extremo corto para pasar el msg.sender directamente a la función `getMyCount`.

La función `increment` es bastante similar, pero pasa el emisor de la transacción original al contrato `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Note que si es llamado muchas veces, nuestro contador podría ser víctima del desbordamiento, u overflow. Debe usar la [biblioteca SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) tanto como sea posible para evitar esta situación.

Para implementar nuestro contrato, necesitará proporcionar el código de `CounterFactory` y el `Counter`. Al realizar la implementación, por ejemplo, en Remix, deberá seleccionar CounterFactory.

Este es el código completo:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Luego de la compilación, en la sección de implementación de Remix, debe seleccionar la fábrica a implementar:

![Seleccionar la fábrica a implementar en Remix](./counterfactory-deploy.png)

Luego puede experimentar con su fábrica de contratos y revisar el valor cambiante. Si desea invocar el contrato inteligente desde una dirección diferente, necesitará cambiar la dirección en la selección de Cuenta en Remix.
