---
title: Interakcja z innymi kontraktami z poziomu Solidity
description: "Jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i wejść z nim w interakcję"
author: "jdourlens"
tags: ["inteligentne kontrakty", "Solidity", "Remix", "wdrażanie", "kompozycyjność"]
skill: advanced
breadcrumb: "Interakcje kontraktów"
lang: pl
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W poprzednich samouczkach dowiedzieliśmy się wiele o tym, [jak wdrożyć swój pierwszy inteligentny kontrakt](/developers/tutorials/deploying-your-first-smart-contract/) i dodać do niego pewne funkcje, takie jak [kontrola dostępu za pomocą modyfikatorów](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) lub [obsługa błędów w Solidity](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions). W tym samouczku dowiemy się, jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i wejść z nim w interakcję.

Stworzymy kontrakt, który umożliwi każdemu posiadanie własnego inteligentnego kontraktu `Counter` poprzez utworzenie dla niego fabryki, której nazwa będzie brzmieć `CounterFactory`. Na początek oto kod naszego początkowego inteligentnego kontraktu `Counter`:

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

Zauważ, że nieznacznie zmodyfikowaliśmy kod kontraktu, aby śledzić adres fabryki i adres właściciela kontraktu. Kiedy wywołujesz kod kontraktu z innego kontraktu, msg.sender będzie odnosić się do adresu naszej fabryki kontraktów. Jest to **bardzo ważna kwestia do zrozumienia**, ponieważ używanie kontraktu do interakcji z innymi kontraktami jest powszechną praktyką. W skomplikowanych przypadkach należy zatem zwracać uwagę na to, kto jest nadawcą.

W tym celu dodaliśmy również modyfikator `onlyFactory`, który upewnia się, że funkcja zmieniająca stan może być wywołana tylko przez fabrykę, która przekaże pierwotnego wywołującego jako parametr.

Wewnątrz naszego nowego `CounterFactory`, który będzie zarządzał wszystkimi innymi kontraktami Counter, dodamy mapowanie, które powiąże właściciela z adresem jego kontraktu licznika:

```solidity
mapping(address => Counter) _counters;
```

W Solidity [mapowania](https://docs.soliditylang.org/en/latest/types.html#mapping-types) są podobne do obiektów w JavaScript: mapują klucz typu A na wartość typu B. W tym przypadku mapujemy adres właściciela na instancję jego kontraktu Counter.

Utworzenie instancji nowego kontraktu Counter dla kogoś będzie wyglądać następująco:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Najpierw sprawdzamy, czy dana osoba posiada już licznik. Mapowanie zwraca wartość domyślną dla kluczy, które nigdy nie zostały ustawione, co dla typu kontraktu oznacza adres zerowy, więc porównujemy zapisany adres kontraktu z `address(0)`. Jeśli nie posiada ona licznika, tworzymy instancję nowego licznika, przekazując jej adres do konstruktora `Counter` i przypisujemy nowo utworzoną instancję do mapowania.

Pobranie wartości konkretnego kontraktu Counter będzie wyglądać następująco:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Pierwsza funkcja sprawdza, czy kontrakt Counter istnieje dla danego adresu, a następnie wywołuje metodę `getCount` z instancji. Druga funkcja: `getMyCount` to tylko skrót do przekazania msg.sender bezpośrednio do funkcji `getCount`.

Funkcja `increment` jest dość podobna, ale przekazuje pierwotnego nadawcę transakcji do kontraktu `Counter`:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Od wersji Solidity 0.8 operacje arytmetyczne są [domyślnie sprawdzane](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): jeśli `_count` kiedykolwiek uległoby przepełnieniu, `_count++` wycofałoby transakcję zamiast po cichu zawijać wartość, więc żadna dodatkowa biblioteka, taka jak SafeMath, nie jest potrzebna.

Aby wdrożyć nasz kontrakt, będziesz musiał dostarczyć zarówno kod `CounterFactory`, jak i `Counter`. Podczas wdrażania na przykład w Remix, będziesz musiał wybrać CounterFactory.

Oto pełny kod:

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

Po kompilacji, w sekcji wdrażania Remix wybierzesz fabrykę do wdrożenia:

![Wybór fabryki do wdrożenia w Remix](./counterfactory-deploy.png)

Następnie możesz pobawić się swoją fabryką kontraktów i sprawdzić zmieniającą się wartość. Jeśli chciałbyś wywołać inteligentny kontrakt z innego adresu, będziesz musiał zmienić adres w polu wyboru konta (Account) w Remix.
