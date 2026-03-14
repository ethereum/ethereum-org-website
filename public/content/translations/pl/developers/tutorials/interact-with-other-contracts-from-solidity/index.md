---
title: Interakcje z innymi kontraktami z poziomu Solidity
description: "Jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i wejść z nim w interakcję"
author: "jdourlens"
tags:
  [
    "smart kontrakty",
    "solidity",
    "remix",
    "wdrażanie",
    "kompozycyjność"
  ]
skill: advanced
lang: pl
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W poprzednich samouczkach wiele się nauczyliśmy, na przykład [jak wdrożyć swój pierwszy inteligentny kontrakt](/developers/tutorials/deploying-your-first-smart-contract/), jak dodać do niego pewne funkcje, takie jak [kontrola dostępu za pomocą modyfikatorów](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) czy [obsługa błędów w Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). W tym samouczku dowiemy się, jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i wejść z nim w interakcję.

Stworzymy kontrakt, który umożliwi każdemu posiadanie własnego inteligentnego kontraktu `Counter`, tworząc dla niego fabrykę o nazwie `CounterFactory`. Na początek, oto kod naszego początkowego inteligentnego kontraktu `Counter`:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Nie jesteś właścicielem tego kontraktu");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Musisz użyć fabryki");
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

Zwróć uwagę, że nieznacznie zmodyfikowaliśmy kod kontraktu, aby śledzić adres fabryki i adres właściciela kontraktu. Gdy wywołujesz kod kontraktu z innego kontraktu, `msg.sender` będzie odnosić się do adresu naszej fabryki kontraktów. To **naprawdę ważna kwestia do zrozumienia**, ponieważ używanie kontraktu do interakcji z innymi kontraktami jest powszechną praktyką. Dlatego w złożonych przypadkach należy uważać, kto jest nadawcą.

W tym celu dodaliśmy również modyfikator `onlyFactory`, który zapewnia, że funkcja zmieniająca stan może być wywołana tylko przez fabrykę, która przekaże pierwotnego wywołującego jako parametr.

Wewnątrz naszej nowej fabryki `CounterFactory`, która będzie zarządzać wszystkimi innymi kontraktami `Counter`, dodamy mapowanie, które powiąże właściciela z adresem jego kontraktu `Counter`:

```solidity
mapping(address => Counter) _counters;
```

W Ethereum mapowania są odpowiednikiem obiektów w JavaScript. Umożliwiają mapowanie klucza typu A na wartość typu B. W tym przypadku mapujemy adres właściciela z instancją jego kontraktu `Counter`.

Instancjonowanie nowego kontraktu `Counter` dla kogoś będzie wyglądać następująco:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Najpierw sprawdzamy, czy dana osoba jest już właścicielem kontraktu `Counter`. Jeśli nie posiada on kontraktu `Counter`, tworzymy jego nową instancję, przekazując jego adres do konstruktora `Counter` i przypisując nowo utworzoną instancję do mapowania.

Aby uzyskać stan licznika dla konkretnego kontraktu `Counter`, należy postąpić następująco:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Pierwsza funkcja sprawdza, czy kontrakt `Counter` istnieje dla danego adresu, a następnie wywołuje metodę `getCount` z instancji. Druga funkcja, `getMyCount`, to tylko skrót do przekazania `msg.sender` bezpośrednio do funkcji `getCount`.

Funkcja `increment` jest dość podobna, ale przekazuje pierwotnego nadawcę transakcji do kontraktu `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Należy pamiętać, że przy zbyt wielu wywołaniach w naszym liczniku może dojść do przepełnienia. Powinieneś używać [biblioteki SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) tak często, jak to możliwe, aby zabezpieczyć się przed taką ewentualnością.

Aby wdrożyć nasz kontrakt, musisz podać zarówno kod `CounterFactory`, jak i `Counter`. Podczas wdrażania, na przykład w Remix, musisz wybrać `CounterFactory`.

Oto pełny kod:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Nie jesteś właścicielem tego kontraktu");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Musisz użyć fabryki");
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

Po skompilowaniu, w sekcji wdrażania w Remix, wybierz fabrykę do wdrożenia:

![Wybór fabryki do wdrożenia w Remix](./counterfactory-deploy.png)

Następnie możesz pobawić się swoją fabryką kontraktów i sprawdzić, jak zmienia się wartość. Jeśli chcesz wywołać inteligentny kontrakt z innego adresu, musisz zmienić adres w polu wyboru konta w aplikacji Remix.
