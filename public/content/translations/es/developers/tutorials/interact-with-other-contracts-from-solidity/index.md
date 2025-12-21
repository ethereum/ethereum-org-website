---
title: Interactuar con otros contratos desde Solidity
description: Cómo implementar un contrato inteligente desde un contrato existente e interactuar con él.
author: "jdourlens"
tags:
  [
    "contratos Inteligentes",
    "Solidity",
    "remix",
    "implementación",
    "composabilidad"
  ]
skill: advanced
lang: es
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En los tutoriales anteriores aprendimos mucho sobre [cómo implementar su primer contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) y añadirle algunas funcionalidades como el [control de acceso con modificadores](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) o el [manejo de errores en Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). En este tutorial aprenderemos cómo implementar un contrato inteligente desde un contrato existente e interactuar con él.

Crearemos un contrato que permita a cualquiera tener su propio contrato inteligente `Counter` creando una fábrica para este. Se llamará `CounterFactory`. En primer lugar, aquí está el código de nuestro contrato inteligente `Counter` inicial:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "No es el propietario del contrato");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Necesita usar la fábrica");
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

Tenga en cuenta que hemos modificado ligeramente el código del contrato para hacer un seguimiento de la dirección de la fábrica y la dirección del propietario del contrato. Cuando se llama al código de un contrato desde otro contrato, `msg.sender` se referirá a la dirección de nuestra fábrica de contratos. Este es **un punto realmente importante que hay que entender**, ya que usar un contrato para interactuar con otros contratos es una práctica común. Por lo tanto, debería prestar atención a quién es el emisor en casos complejos.

Por esta razón, también añadimos un modificador `onlyFactory` que se asegura de que la función de cambio de estado solo pueda ser invocada por la fábrica que pasará el invocador inicial como parámetro.

Dentro de nuestro nuevo `CounterFactory`, que gestionará todos los demás `Counter`, añadiremos un mapeo que asociará a un propietario con la dirección de su contrato de contador:

```solidity
mapping(address => Counter) _counters;
```

En Ethereum, los mapeos (`mapping`) son el equivalente a los objetos en JavaScript; permiten asociar una clave de tipo A a un valor de tipo B. En este caso, asociamos la dirección de un propietario con la instancia de su `Counter`.

Instanciar un nuevo `Counter` para alguien se verá así:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Primero comprobamos si la persona ya posee un contador. Si no posee un contador, instanciamos uno nuevo pasando su dirección al constructor de `Counter` y asignamos la instancia recién creada al mapeo.

Para obtener la cuenta de un `Counter` específico, se verá así:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

La primera función comprueba si el contrato `Counter` existe para una dirección determinada y, a continuación, llama al método `getCount` desde la instancia. La segunda función, `getMyCount`, es solo un atajo para pasar `msg.sender` directamente a la función `getCount`.

La función `increment` es bastante similar, pero pasa el emisor de la transacción original al contrato `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Tenga en cuenta que, si se llama demasiadas veces, nuestro contador podría ser víctima de un desbordamiento. Debería usar la [librería SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) tanto como sea posible para protegerse de este posible caso.

Para implementar nuestro contrato, necesitará proporcionar el código de `CounterFactory` y de `Counter`. Al implementar, por ejemplo en Remix, deberá seleccionar `CounterFactory`.

Este es el código completo:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "No es el propietario del contrato");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Necesita usar la fábrica");
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

![Selección de la fábrica a implementar en Remix](./counterfactory-deploy.png)

Luego puede experimentar con la fábrica de su contrato y comprobar cómo cambia el valor. Si desea llamar al contrato inteligente desde una dirección diferente, tendrá que cambiar la dirección en el selector de Cuentas de Remix.
