---
title: Interakcje z innymi kontraktami od Solidity
description: Jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i pracować na nim
author: "jdourlens"
tags:
  - "inteligentne kontrakty"
  - "solidity"
  - "remix"
  - "fabryki"
  - "wdrożenie"
  - "kompozycyjność"
skill: advanced
lang: pl
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Z poprzednich samouczków dowiedzieliśmy się [jak wdrożyć swój pierwszy inteligentny kontrakt](/developers/tutorials/deploying-your-first-smart-contract/) i dodać do niego kilka funkcji, takich jak <a href="https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/">kontrola dostępu za pomocą modyfikatorów</a> lub [obsługa błędów w Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Z tego samouczka dowiemy się, jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i pracować na nim.

Stworzymy kontrakt, który umożliwi każdemu posiadanie własnego inteligentnego kontraktu `Counter`, tworząc dla niego fabrykę o nazwie `CounterFactory`. Pierwszy jest kod naszego początkowego inteligentnego kontraktu `Counter`:

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

Zwróć uwagę, że nieznacznie zmodyfikowaliśmy kod kontraktu, aby śledzić adres fabryki i adres właściciela umowy. Gdy wywołasz kod kontraktu z innego kontraktu, msg.sender odniesie się do adresu naszej fabryki kontraktowej. Jest to **bardzo ważny punkt do zrozumienia**, ponieważ używanie kontraktu do interakcji z innymi kontraktami jest powszechną praktyką. Dlatego w skomplikowanych przypadkach należy zadbać o to, kto jest nadawcą.

W tym celu dodaliśmy również modyfikator `onlyFactory`, który zapewnia, że ​​funkcja zmiany stanu może być wywołana tylko przez fabrykę, która przekaże oryginalny obiekt wywołujący jako parametr.

W naszej nowej `CounterFactory`, która będzie zarządzać wszystkimi innymi licznikami, dodamy mapowanie, które skojarzy właściciela z adresem jego kontraktu counter:

```solidity
mapping(address => Counter) _counters;
```

W Ethereum mapowanie jest równoważne obiektom w javascript, umożliwiają one mapowanie klucza typu A do wartości typu B. W tym przypadku mapujemy adres właściciela z instancją jego kontraktu counter.

Utworzenie nowego kontraktu Counter dla kogoś będzie wyglądać tak:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Najpierw sprawdzamy, czy osoba jest już właścicielem Counter. Jeśli nie jest właścicielem counter, natychmiastowo przekazujemy jego adres do konstruktora `Counter` i przypisujemy nowo utworzoną instancję do mapowania.

Aby uzyskać liczbę konkretnego Counter, powinno to wyglądać tak:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Pierwsza funkcja sprawdza, czy kontrakt Counter istnieje dla danego adresu, a następnie wywołuje metodę `getCount` z instancji. Druga funkcja: `getMyCount` to tylko krótki koniec do przekazania msg.sender bezpośrednio do funkcji `getCount`.

Funkcja `increment` jest dość podobna, ale przekazuje oryginalnego nadawcę transakcji do kontraktu `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Zauważ, że jeśli zostaniesz wywołany wiele razy, nasz counter może paść ofiarą przepełnienia. Powinieneś użyć [biblioteki SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) w możliwie największym stopniu, aby chronić przed tym przypadkiem.

Aby wdrożyć nasz kontrakt, musisz podać zarówno kod `CounterFactory`, jak i `Counter`. Podczas wdrażania na przykład w Remix musisz wybrać CounterFactory.

Oto pełny kod:

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

Po skompilowaniu wybierz w sekcji wdrażanie Remix fabrykę do wdrożenia:

![Wybór fabryki do wdrożenia w Remix](./counterfactory-deploy.png)

Następnie możesz pobawić się swoją fabryką kontraktową i sprawdzić, jak zmienia się wartość. Jeśli chcesz wywołać inteligentny kontrakt z innego adresu, musisz zmienić adres w wyborze konta w Remix.
