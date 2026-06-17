---
title: Interactuar con otros contratos desde Solidity
description: Cómo desplegar un contrato inteligente desde un contrato existente e interactuar con él
author: "jdourlens"
tags: ["contratos inteligentes", "solidity", "remix", "despliegue", "composabilidad"]
skill: advanced
breadcrumb: Interacciones de contratos
lang: es
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En los tutoriales anteriores aprendimos mucho sobre [cómo desplegar tu primer contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) y añadirle algunas características como [controlar el acceso con modificadores](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) o [el manejo de errores en Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). En este tutorial aprenderemos cómo desplegar un contrato inteligente desde un contrato existente e interactuar con él.

Haremos un contrato que permita a cualquiera tener su propio contrato inteligente `Counter` creando una fábrica (factory) para él, su nombre será `CounterFactory`. Primero, aquí está el código de nuestro contrato inteligente `Counter` inicial:

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

Ten en cuenta que modificamos ligeramente el código del contrato para hacer un seguimiento de la dirección de la fábrica y la dirección del propietario del contrato. Cuando llamas al código de un contrato desde otro contrato, el msg.sender se referirá a la dirección de nuestra fábrica de contratos. Este es **un punto muy importante de entender**, ya que usar un contrato para interactuar con otros contratos es una práctica común. Por lo tanto, debes tener cuidado de quién es el remitente en casos complejos.

Para esto también añadimos un modificador `onlyFactory` que se asegura de que la función que cambia el estado solo pueda ser llamada por la fábrica que pasará al llamador original como parámetro.

Dentro de nuestro nuevo `CounterFactory` que gestionará todos los demás Counters, añadiremos un mapeo (mapping) que asociará a un propietario con la dirección de su contrato contador:

```solidity
mapping(address => Counter) _counters;
```

En Ethereum, los mapeos son el equivalente a los objetos en JavaScript, permiten mapear una clave de tipo A a un valor de tipo B. En este caso mapeamos la dirección de un propietario con la instancia de su Counter.

Instanciar un nuevo Counter para alguien se verá así:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Primero comprobamos si la persona ya posee un contador. Si no posee un contador, instanciamos un nuevo contador pasando su dirección al constructor de `Counter` y asignamos la instancia recién creada al mapeo.

Para obtener la cuenta de un Counter específico se verá así:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

La primera función comprueba si el contrato Counter existe para una dirección dada y luego llama al método `getCount` desde la instancia. La segunda función: `getMyCount` es solo un atajo para pasar el msg.sender directamente a la función `getCount`.

La función `increment` es bastante similar pero pasa el remitente original de la transacción al contrato `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Ten en cuenta que si se llama demasiadas veces, nuestro contador podría ser víctima de un desbordamiento. Deberías usar la [biblioteca SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) tanto como sea posible para protegerte de este posible caso.

Para desplegar nuestro contrato, necesitarás proporcionar tanto el código de `CounterFactory` como el de `Counter`. Al desplegar, por ejemplo en Remix, necesitarás seleccionar CounterFactory.

Aquí está el código completo:

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

Después de la compilación, en la sección de despliegue de Remix seleccionarás la fábrica que se va a desplegar:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

Luego puedes jugar con tu fábrica de contratos y comprobar cómo cambia el valor. Si deseas llamar al contrato inteligente desde una dirección diferente, necesitarás cambiar la dirección en el selector de cuenta (Account) de Remix.