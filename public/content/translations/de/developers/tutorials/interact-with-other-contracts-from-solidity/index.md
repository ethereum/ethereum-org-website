---
title: "Mit anderen Verträgen aus Solidity interagieren"
description: Wie man einen Smart Contract aus einem bestehenden Vertrag bereitstellt und mit ihm interagiert
author: "jdourlens"
tags: ["Smart Contracts", "Solidity", "Remix", "Bereitstellung", "Zusammensetzbarkeit"]
skill: advanced
breadcrumb: Vertragsinteraktionen
lang: de
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In den vorherigen Tutorials haben wir viel darüber gelernt, [wie man seinen ersten Smart Contract bereitstellt](/developers/tutorials/deploying-your-first-smart-contract/) und ihm einige Funktionen hinzufügt, wie [Zugriffskontrolle mit Modifikatoren](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) oder [Fehlerbehandlung in Solidity](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions). In diesem Tutorial werden wir lernen, wie man einen Smart Contract aus einem bestehenden Vertrag bereitstellt und mit ihm interagiert.

Wir werden einen Vertrag erstellen, der es jedem ermöglicht, seinen eigenen `Counter` Smart Contract zu haben, indem wir eine Fabrik (Factory) dafür erstellen. Ihr Name wird `CounterFactory` sein. Zuerst ist hier der Code unseres anfänglichen `Counter` Smart Contracts:

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

Beachten Sie, dass wir den Vertragscode leicht modifiziert haben, um die Adresse der Fabrik und die Adresse des Vertragsbesitzers zu verfolgen. Wenn Sie einen Vertragscode von einem anderen Vertrag aus aufrufen, bezieht sich msg.sender auf die Adresse unserer Vertragsfabrik. Dies ist **ein wirklich wichtiger Punkt, den man verstehen muss**, da die Verwendung eines Vertrags zur Interaktion mit anderen Verträgen eine gängige Praxis ist. Sie sollten daher in komplexen Fällen darauf achten, wer der Absender ist.

Dafür haben wir auch einen `onlyFactory`-Modifikator hinzugefügt, der sicherstellt, dass die zustandsändernde Funktion nur von der Fabrik aufgerufen werden kann, die den ursprünglichen Aufrufer als Parameter übergibt.

Innerhalb unserer neuen `CounterFactory`, die alle anderen Counters verwalten wird, fügen wir ein Mapping hinzu, das einen Besitzer der Adresse seines Counter-Vertrags zuordnet:

```solidity
mapping(address => Counter) _counters;
```

In Solidity sind [Mappings](https://docs.soliditylang.org/en/latest/types.html#mapping-types) ähnlich wie Objekte in JavaScript: Sie ordnen einen Schlüssel vom Typ A einem Wert vom Typ B zu. In diesem Fall ordnen wir die Adresse eines Besitzers der Instanz seines Counters zu.

Die Instanziierung eines neuen Counters für jemanden wird so aussehen:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Wir prüfen zuerst, ob die Person bereits einen Counter besitzt. Ein Mapping gibt den Standardwert für Schlüssel zurück, die nie gesetzt wurden, was für einen Vertragstyp die Nulladresse ist, also vergleichen wir die gespeicherte Vertragsadresse mit `address(0)`. Wenn er keinen Counter besitzt, instanziieren wir einen neuen Counter, indem wir seine Adresse an den `Counter`-Konstruktor übergeben und die neu erstellte Instanz dem Mapping zuweisen.

Um den Zählerstand eines bestimmten Counters zu erhalten, sieht das so aus:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Die erste Funktion prüft, ob der Counter-Vertrag für eine bestimmte Adresse existiert, und ruft dann die Methode `getCount` von der Instanz auf. Die zweite Funktion: `getMyCount` ist nur eine Kurzschreibweise, um msg.sender direkt an die Funktion `getCount` zu übergeben.

Die Funktion `increment` ist recht ähnlich, übergibt aber den ursprünglichen Absender der Transaktion an den `Counter`-Vertrag:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Seit Solidity 0.8 wird die Arithmetik [standardmäßig überprüft](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): Wenn `_count` jemals überlaufen würde, würde `_count++` die Transaktion rückgängig machen, anstatt stillschweigend umzubrechen, sodass keine zusätzliche Bibliothek wie SafeMath benötigt wird.

Um unseren Vertrag bereitzustellen, müssen Sie sowohl den Code von `CounterFactory` als auch von `Counter` bereitstellen. Wenn Sie beispielsweise in Remix bereitstellen, müssen Sie CounterFactory auswählen.

Hier ist der vollständige Code:

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

Nach der Kompilierung wählen Sie im Bereitstellungsbereich von Remix die Fabrik aus, die bereitgestellt werden soll:

![Auswahl der in Remix bereitzustellenden Fabrik](./counterfactory-deploy.png)

Dann können Sie mit Ihrer Vertragsfabrik spielen und überprüfen, wie sich der Wert ändert. Wenn Sie den Smart Contract von einer anderen Adresse aus aufrufen möchten, müssen Sie die Adresse in der Kontoauswahl von Remix ändern.
