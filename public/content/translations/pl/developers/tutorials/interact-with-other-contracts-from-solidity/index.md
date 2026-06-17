---
title: Interakcja z innymi kontraktami z poziomu Solidity
description: Jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i wejść z nim w interakcję
author: "jdourlens"
tags: ["inteligentne kontrakty", "solidity", "remix", "wdrażanie", "kompozycyjność"]
skill: advanced
breadcrumb: Interakcje kontraktów
lang: pl
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W poprzednich samouczkach dowiedzieliśmy się wiele o tym, [jak wdrożyć swój pierwszy inteligentny kontrakt](/developers/tutorials/deploying-your-first-smart-contract/) i dodać do niego pewne funkcje, takie jak [kontrola dostępu za pomocą modyfikatorów](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) lub [obsługa błędów w Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). W tym samouczku dowiemy się, jak wdrożyć inteligentny kontrakt z poziomu istniejącego kontraktu i wejść z nim w interakcję.

Stworzymy kontrakt, który umożliwi każdemu posiadanie własnego inteligentnego kontraktu `Counter` poprzez utworzenie dla niego fabryki, której nazwa będzie brzmieć `CounterFactory`. Na początek oto kod naszego początkowego inteligentnego kontraktu `Counter`:

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

Zauważ, że nieznacznie zmodyfikowaliśmy kod kontraktu, aby śledzić adres fabryki oraz adres właściciela kontraktu. Kiedy wywołujesz kod kontraktu z innego kontraktu, msg.sender będzie odnosić się do adresu naszej fabryki kontraktów. Jest to **bardzo ważna kwestia do zrozumienia**, ponieważ używanie kontraktu do interakcji z innymi kontraktami jest powszechną praktyką. W złożonych przypadkach należy zatem zwracać uwagę na to, kto jest nadawcą.

W tym celu dodaliśmy również modyfikator `onlyFactory`, który upewnia się, że funkcja zmieniająca stan może być wywołana tylko przez fabrykę, która przekaże pierwotnego wywołującego jako parametr.

Wewnątrz naszej nowej `CounterFactory`, która będzie zarządzać wszystkimi innymi licznikami (Counters), dodamy mapowanie, które powiąże właściciela z adresem jego kontraktu licznika:

```solidity
mapping(address => Counter) _counters;
```

W Ethereum mapowania są odpowiednikiem obiektów w języku JavaScript, umożliwiają one zmapowanie klucza typu A na wartość typu B. W tym przypadku mapujemy adres właściciela na instancję jego licznika (Counter).

Utworzenie instancji nowego licznika dla kogoś będzie wyglądać następująco:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Najpierw sprawdzamy, czy dana osoba posiada już licznik. Jeśli nie posiada licznika, tworzymy instancję nowego licznika, przekazując jej adres do konstruktora `Counter` i przypisujemy nowo utworzoną instancję do mapowania.

Pobranie wartości konkretnego licznika będzie wyglądać tak:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
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
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Zauważ, że jeśli zostanie wywołany zbyt wiele razy, nasz licznik może paść ofiarą przepełnienia. Należy w miarę możliwości używać biblioteki [SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), aby zabezpieczyć się przed takim przypadkiem.

Aby wdrożyć nasz kontrakt, będziesz musiał dostarczyć zarówno kod `CounterFactory`, jak i `Counter`. Podczas wdrażania na przykład w Remix, będziesz musiał wybrać CounterFactory.

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

Po kompilacji, w sekcji wdrażania Remix wybierzesz fabrykę do wdrożenia:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

Następnie możesz pobawić się swoją fabryką kontraktów i sprawdzić zmieniającą się wartość. Jeśli chciałbyś wywołać inteligentny kontrakt z innego adresu, będziesz musiał zmienić adres w polu wyboru konta (Account) w Remix.