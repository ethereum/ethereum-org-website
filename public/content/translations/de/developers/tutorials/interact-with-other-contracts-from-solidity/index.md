---
title: Mit anderen Verträgen aus Solidity interagieren
description: Wie man einen Smart Contract aus einem bestehenden Vertrag bereitstellt und mit ihm interagiert
author: "jdourlens"
tags: ["Smart Contracts", "Solidity", "Remix", "Bereitstellung", "Zusammensetzbarkeit"]
skill: advanced
breadcrumb: Vertragsinteraktionen
lang: de
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In den vorherigen Tutorials haben wir viel darüber gelernt, [wie man seinen ersten Smart Contract bereitstellt](/developers/tutorials/deploying-your-first-smart-contract/) und ihm einige Funktionen hinzufügt, wie z. B. [Zugriffskontrolle mit Modifikatoren](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) oder [Fehlerbehandlung in Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). In diesem Tutorial werden wir lernen, wie man einen Smart Contract aus einem bestehenden Vertrag bereitstellt und mit ihm interagiert.

Wir werden einen Vertrag erstellen, der es jedem ermöglicht, seinen eigenen `Counter`-Smart Contract zu haben, indem wir eine Fabrik (Factory) dafür erstellen. Ihr Name wird `CounterFactory` sein. Zuerst ist hier der Code unseres anfänglichen `Counter`-Smart Contracts:

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

Beachten Sie, dass wir den Vertragscode leicht modifiziert haben, um die Adresse der Fabrik und die Adresse des Vertragsbesitzers nachzuverfolgen. Wenn Sie einen Vertragscode von einem anderen Vertrag aus aufrufen, bezieht sich msg.sender auf die Adresse unserer Vertragsfabrik. Dies ist **ein wirklich wichtiger Punkt, den man verstehen muss**, da die Verwendung eines Vertrags zur Interaktion mit anderen Verträgen eine gängige Praxis ist. Sie sollten daher in komplexen Fällen darauf achten, wer der Absender ist.

Dafür haben wir auch einen `onlyFactory`-Modifikator hinzugefügt, der sicherstellt, dass die zustandsändernde Funktion nur von der Fabrik aufgerufen werden kann, die den ursprünglichen Aufrufer als Parameter übergibt.

Innerhalb unserer neuen `CounterFactory`, die alle anderen Counters verwalten wird, fügen wir ein Mapping hinzu, das einen Besitzer der Adresse seines Counter-Vertrags zuordnet:

```solidity
mapping(address => Counter) _counters;
```

In Ethereum sind Mappings das Äquivalent zu Objekten in JavaScript. Sie ermöglichen es, einen Schlüssel vom Typ A auf einen Wert vom Typ B abzubilden. In diesem Fall bilden wir die Adresse eines Besitzers auf die Instanz seines Counters ab.

Die Instanziierung eines neuen Counters für jemanden wird so aussehen:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Wir prüfen zunächst, ob die Person bereits einen Counter besitzt. Wenn sie keinen Counter besitzt, instanziieren wir einen neuen Counter, indem wir ihre Adresse an den `Counter`-Konstruktor übergeben und die neu erstellte Instanz dem Mapping zuweisen.

Um den Zählerstand eines bestimmten Counters zu erhalten, sieht das so aus:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Die erste Funktion prüft, ob der Counter-Vertrag für eine bestimmte Adresse existiert, und ruft dann die Methode `getCount` von der Instanz auf. Die zweite Funktion: `getMyCount` ist nur eine Abkürzung, um msg.sender direkt an die Funktion `getCount` zu übergeben.

Die Funktion `increment` ist recht ähnlich, übergibt aber den ursprünglichen Absender der Transaktion an den `Counter`-Vertrag:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Beachten Sie, dass unser Counter bei zu vielen Aufrufen möglicherweise Opfer eines Überlaufs werden könnte. Sie sollten die [SafeMath-Bibliothek](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) so oft wie möglich verwenden, um sich vor diesem möglichen Fall zu schützen.

Um unseren Vertrag bereitzustellen, müssen Sie sowohl den Code der `CounterFactory` als auch des `Counter` bereitstellen. Wenn Sie beispielsweise in Remix bereitstellen, müssen Sie CounterFactory auswählen.

Hier ist der vollständige Code:

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

Nach der Kompilierung wählen Sie im Bereitstellungsbereich von Remix die Fabrik aus, die bereitgestellt werden soll:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

Dann können Sie mit Ihrer Vertragsfabrik spielen und überprüfen, wie sich der Wert ändert. Wenn Sie den Smart Contract von einer anderen Adresse aus aufrufen möchten, müssen Sie die Adresse in der Kontoauswahl von Remix ändern.