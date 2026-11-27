---
title: Interactuar con otros contratos desde Solidity
description: "Cómo desplegar un contrato inteligente desde un contrato existente e interactuar con él"
author: "jdourlens"
tags: ["contratos inteligentes", "Solidity", "Remix", "despliegue", "composabilidad"]
skill: advanced
breadcrumb: Interacciones de contratos
lang: es
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

En los tutoriales anteriores aprendimos mucho sobre [cómo desplegar tu primer contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) y añadirle algunas características como [controlar el acceso con modificadores](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) o [el manejo de errores en Solidity](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions). En este tutorial aprenderemos cómo desplegar un contrato inteligente desde un contrato existente e interactuar con él.

Haremos un contrato que permita a cualquier persona tener su propio contrato inteligente `Counter` creando una fábrica para él, su nombre será `CounterFactory`. Primero, aquí está el código de nuestro contrato inteligente `Counter` inicial:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

     constructor(address owner) {
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

Ten en cuenta que modificamos ligeramente el código del contrato para hacer un seguimiento de la dirección de la fábrica y la dirección del propietario del contrato. Cuando llamas al código de un contrato desde otro contrato, el msg.sender se referirá a la dirección de nuestra fábrica de contratos. Este es **un punto realmente importante de entender**, ya que usar un contrato para interactuar con otros contratos es una práctica común. Por lo tanto, debes tener cuidado de quién es el remitente en casos complejos.

Para esto también añadimos un modificador `onlyFactory` que se asegura de que la función que cambia el estado solo pueda ser llamada por la fábrica que pasará al llamador original como parámetro.

Dentro de nuestro nuevo `CounterFactory` que gestionará todos los demás Counters, añadiremos un mapeo que asociará un propietario a la dirección de su contrato contador:

```solidity
mapping(address => Counter) _counters;
```

En Solidity, los [mapeos](https://docs.soliditylang.org/en/latest/types.html#mapping-types) son similares a los objetos en JavaScript: mapean una clave de tipo A a un valor de tipo B. En este caso mapeamos la dirección de un propietario con la instancia de su Counter.

Instanciar un nuevo Counter para alguien se verá así:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Primero comprobamos si la persona ya posee un contador. Un mapeo devuelve el valor por defecto para las claves que nunca se establecieron, que para un tipo de contrato es la dirección cero, por lo que comparamos la dirección del contrato almacenado con `address(0)`. Si no posee un contador, instanciamos un nuevo contador pasando su dirección al constructor de `Counter` y asignamos la instancia recién creada al mapeo.

Para obtener la cuenta de un Counter específico se verá así:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

La primera función comprueba si el contrato Counter existe para una dirección dada y luego llama al método `getCount` de la instancia. La segunda función: `getMyCount` es solo un atajo para pasar el msg.sender directamente a la función `getCount`.

La función `increment` es bastante similar pero pasa el remitente original de la transacción al contrato `Counter`:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Desde Solidity 0.8, la aritmética se [comprueba por defecto](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): si `_count` alguna vez se desbordara, `_count++` revertiría la transacción en lugar de reiniciarse silenciosamente, por lo que no se necesita ninguna biblioteca adicional como SafeMath.

Para desplegar nuestro contrato, necesitarás proporcionar tanto el código de `CounterFactory` como el de `Counter`. Al desplegar, por ejemplo en Remix, necesitarás seleccionar CounterFactory.

Aquí está el código completo:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

     constructor(address owner) {
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
        require(address(_counters[msg.sender]) == address(0), "You already have a counter");
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
        _counters[msg.sender].increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require(address(_counters[account]) != address(0), "This account has no counter");
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Después de la compilación, en la sección de despliegue de Remix seleccionarás la fábrica a desplegar:

![Seleccionando la fábrica a desplegar en Remix](./counterfactory-deploy.png)

Luego puedes jugar con tu fábrica de contratos y comprobar cómo cambia el valor. Si deseas llamar al contrato inteligente desde una dirección diferente, necesitarás cambiar la dirección en el selector de cuenta (Account) de Remix.
