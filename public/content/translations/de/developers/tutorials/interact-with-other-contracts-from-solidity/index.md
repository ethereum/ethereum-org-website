---
title: Mit anderen Contracts von Solidity aus interagieren
description: Wie man einen Smart Contract von einem bestehenden Contract aus bereitstellt und mit ihm interagiert
author: "jdourlens"
tags:
  [
    "intelligente Verträge",
    "solidity",
    "remix",
    "Bereitstellung",
    "Komponierbarkeit"
  ]
skill: advanced
lang: de
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In den vorherigen Tutorials haben wir viel gelernt, [wie man seinen ersten Smart Contract bereitstellt](/developers/tutorials/deploying-your-first-smart-contract/) und ihm einige Funktionen hinzufügt, wie [Zugriffskontrolle mit Modifikatoren](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) oder [Fehlerbehandlung in Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). In diesem Tutorial lernen wir, wie man einen Smart Contract von einem bestehenden Contract aus bereitstellt und mit ihm interagiert.

Wir erstellen einen Contract, der es jedem ermöglicht, seinen eigenen `Counter`-Smart-Contract zu haben. Dafür erstellen wir eine Factory, die `CounterFactory` heißen wird. Hier ist zunächst der Code unseres ursprünglichen `Counter`-Smart-Contracts:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Du bist nicht der Eigentümer des Vertrags");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Du musst die Factory verwenden");
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

Beachte, dass wir den Contract-Code geringfügig geändert haben, um die Adresse der Factory und die Adresse des Contract-Eigentümers zu speichern. Wenn du einen Contract-Code von einem anderen Contract aus aufrufst, verweist `msg.sender` auf die Adresse unserer Contract-Factory. Dies ist **ein sehr wichtiger Punkt, den man verstehen sollte**, da die Verwendung eines Contracts zur Interaktion mit anderen Contracts gängige Praxis ist. Daher solltest du in komplexen Fällen darauf achten, wer der Absender ist.

Dafür haben wir auch einen `onlyFactory`-Modifikator hinzugefügt, der sicherstellt, dass die zustandsändernde Funktion nur von der Factory aufgerufen werden kann, die den ursprünglichen Aufrufer als Parameter übergibt.

Innerhalb unserer neuen `CounterFactory`, die alle anderen Counter verwalten wird, fügen wir ein Mapping hinzu, das einem Eigentümer die Adresse seines Counter-Contracts zuordnet:

```solidity
mapping(address => Counter) _counters;
```

In Ethereum sind Mappings das Äquivalent zu Objekten in Javascript; sie ermöglichen es, einen Schlüssel vom Typ A einem Wert vom Typ B zuzuordnen. In diesem Fall ordnen wir die Adresse eines Eigentümers der Instanz seines Counters zu.

Das Instanziieren eines neuen `Counter` für jemanden sieht wie folgt aus:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Zuerst prüfen wir, ob die Person bereits einen `Counter` besitzt. Wenn die Person keinen `Counter` besitzt, instanziieren wir einen neuen, indem wir ihre Adresse an den `Counter`-Konstruktor übergeben und die neu erstellte Instanz dem Mapping zuweisen.

Um den Zählerstand eines bestimmten `Counter` abzurufen, sieht es wie folgt aus:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Die erste Funktion prüft, ob der `Counter`-Contract für eine bestimmte Adresse existiert, und ruft dann die `getCount`-Methode von der Instanz auf. Die zweite Funktion, `getMyCount`, ist nur eine Abkürzung, um `msg.sender` direkt an die `getCount`-Funktion zu übergeben.

Die `increment`-Funktion ist recht ähnlich, übergibt aber den ursprünglichen Transaktionssender an den `Counter`-Contract:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Beachte, dass unser `Counter` bei zu häufigen Aufrufen Opfer eines Überlaufs werden könnte. Du solltest die [SafeMath-Bibliothek](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) so oft wie möglich verwenden, um dich vor diesem möglichen Fall zu schützen.

Um unseren Contract bereitzustellen, musst du sowohl den Code der `CounterFactory` als auch den des `Counter` angeben. Bei der Bereitstellung in Remix musst du zum Beispiel `CounterFactory` auswählen.

Hier ist der vollständige Code:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Du bist nicht der Eigentümer des Vertrags");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Du musst die Factory verwenden");
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

Nach dem Kompilieren wählst du im Bereitstellungsbereich von Remix die Factory aus, die bereitgestellt werden soll:

![Auswahl der in Remix bereitzustellenden Factory](./counterfactory-deploy.png)

Danach kannst du mit deiner Contract Factory interagieren und die Wertänderung überprüfen. Wenn du den Smart Contract von einer anderen Adresse aus aufrufen möchtest, musst du die Adresse in der Kontoauswahl von Remix ändern.
