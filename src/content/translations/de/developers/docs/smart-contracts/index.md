---
title: Einführung in Smart Contracts
description: Eine Übersicht zu Smart Contracts mit dem Fokus auf ihre einzigartigen Besonderheiten und Beschränkungen
lang: de
---

## Was ist ein Smart Contract? {#what-is-a-smart-contract}

Ein "Smart Contract" oder intelligenter Vertrag ist einfach ein Programm, das auf der Ethereum-Blockchain läuft. Es ist eine Sammlung von Anweisungen (seinen Funktionen) und Daten (seinem Zustand), die sich an einer bestimmten Adresse in der Ethereum-Blockchain befindet.

Smart Contracts sind eine Art [Ethereum-Konto](/developers/docs/accounts/). Sie können also ein Guthaben aufweisen und Transaktionen über das Netzwerk senden. Allerdings werden sie nicht von einem Benutzer gesteuert, sondern im Netzwerk bereitgestellt und wie programmiert ausgeführt. Benutzerkonten können dann mit einem Smart Contract interagieren, indem sie Transaktionen übermitteln, die eine im Smart Contract definierte Funktion ausführt. Smart Contracts können, wie auch herkömmliche Verträge, Regeln definieren und diese mittels Programmierung automatisch durchsetzen. Standardmäßig können Smart Contracts nicht gelöscht werden und Interaktionen mit ihnen sind irreversibel.

## Voraussetzungen {#prerequisites}

Wenn Sie gerade erst anfangen, sich mit dem Thema zu beschäftigen, oder auf der Suche nach einer weniger technischen Einführung sind, empfehlen wir Ihnen unsere [Einführung in Smart Contracts](/smart-contracts/).

Machen Sie sich mit [Konten](/developers/docs/accounts/), [Transaktionen](/developers/docs/transactions/) und der [Ethereum-Virtual Machine](/developers/docs/evm/) vertraut, bevor Sie in die Welt der Smart Contracts einsteigen.

## Ein digitaler Verkaufsautomat {#a-digital-vending-machine}

Die vielleicht beste Metapher für einen Smart Contract ist ein Verkaufsautomat, wie von [Nick Szabo](https://unenumerated.blogspot.com/) beschrieben. Mit den richtigen Eingaben ist eine bestimmte Ausgabe garantiert.

So bekommen Sie einen Schokoriegel aus einem Verkaufsautomaten:

```
Geld + Produktauswahl = ausgeworfener Riegel
```

Diese Logik ist in den Automaten einprogrammiert.

Einem Smart Contract wurde, wie auch einem Verkaufsautomaten, eine Logik einprogrammiert. Hier ist ein einfaches Beispiel dafür, wie ein solcher Verkaufsautomat als Smart Contract aussehen könnte:

```solidity
pragma solidity 0.8.7;

contract Verkaufsautomat {

    // Deklariere Zustandsvariablen des Vertrags
    address public owner;
    mapping (address => uint) public toertchenBestand;

    // Wenn der 'Verkaufsautomat'-Vertrag bereitgestellt wird:
    // 1. Setze die Bereitstellungsadresse als Eigentümer des Vertrags
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Wenn ein Verkaufsautomat vorhanden ist, benötigt man keinen Verkäufer mehr. Genau so können Smart Contracts in vielen Branchen Vermittler ersetzen.

## Genehmigungsfrei {#permissionless}

Jeder kann einen Smart Contract erstellen und ihn im Netzwerk bereitstellen. Sie müssen nur lernen, wie Sie in einer [intelligenten Vertragssprache](/developers/docs/smart-contracts/languages/) codieren. Zudem benötigen Sie ausreichend ETH, um Ihren Vertrag bereitzustellen. Die Bereitstellung eines Smart Contracts ist technisch betrachtet eine Transaktion. Daher müssen Sie Ihre [Ressourcen](/developers/docs/gas/) genauso bezahlen wie Sie es für einen einfachen ETH-Transfer tun. Die Ressourcenkosten für die Vertragsbereitstellung sind jedoch weitaus höher.

Ethereum bietet entwicklerfreundliche Sprachen zum Schreiben von Smart Contracts:

- Solidity
- Vyper

[Mehr zu den Sprachen](/developers/docs/smart-contracts/languages/)

Allerdings müssen sie kompiliert werden, bevor sie bereitgestellt werden können, damit die Ethereum-Virtual Machine den Vertrag interpretieren und speichern kann. [Mehr zum Kompilieren](/developers/docs/smart-contracts/compiling/)

## Komposition {#composability}

Smart Contracts sind auf Ethereum öffentlich. Sie können sie sich als offene APIs vorstellen. Das bedeutet, Sie können andere Smart Contracts in Ihrem eigenen Smart Contract aufrufen, um die Möglichkeiten erheblich zu erweitern. Verträge können sogar andere Verträge bereitstellen.

Erfahren Sie mehr über die [Kombinierbarkeit von Smart Contracts](/developers/docs/smart-contracts/composability/).

## Einschränkungen {#limitations}

Smart Contracts können alleine keine Informationen über Ereignisse der "echten Welt" erhalten, weil sie keine HTTP-Anfragen stellen können. Das ist beabsichtigt. Sich auf externe Informationen zu verlassen, könnte den für Sicherheit und Dezentralisierung wichtigen Konsens gefährden.

Es gibt Möglichkeiten, das mittels [Orakel](/developers/docs/oracles/) zu umgehen.

Eine weitere Einschränkung von Smart Contracts ist die maximale Vertragsgröße. Ein Smart Contract kann maximal 24 KB groß sein, sonst gehen ihm die Ressourcen aus. Das kann mit [The Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535) behoben werden.

## Ressourcen für Smart Contracts {#smart-contract-resources}

**OpenZeppelin Contracts –** **_Bibliothek für die sichere Entwicklung von Smart Contracts_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Community-Forum](https://forum.openzeppelin.com/c/general/16)

**DappSys –** **_Sichere, einfache, flexible Bausteine für Smart Contracts_**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## Weiterführende Informationen {#further-reading}

- [Smart Contracts: The Blockchain Technology That Will Replace Lawyers](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_
- [Best Practices for Smart Contract Development](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– 10. November 2019 – Yos Riady_
- [Clean Contracts – ein Leitfaden zu intelligenten Vertragsmustern & Praktiken](https://www.wslyvh.com/clean-contracts/) _– 30. Juli 2020 – wslyvh_
