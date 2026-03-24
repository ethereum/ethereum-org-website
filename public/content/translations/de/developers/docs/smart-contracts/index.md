---
title: "Einführung in Smart Contracts"
description: "Ein Überblick über Smart Contracts mit Fokus auf ihre einzigartigen Eigenschaften und Einschränkungen."
lang: de
---

## Was ist ein Smart Contract? {#what-is-a-smart-contract}

Ein „Smart Contract“ ist einfach ein Programm, das auf der [Ethereum](/)-Blockchain läuft. Es ist eine Sammlung von Code (seine Funktionen) und Daten (sein Zustand), die sich an einer bestimmten Adresse auf der Ethereum-Blockchain befindet.

Smart Contracts sind eine Art von [Ethereum-Konto](/developers/docs/accounts/). Das bedeutet, dass sie ein Guthaben haben und das Ziel von Transaktionen sein können. Sie werden jedoch nicht von einem Benutzer kontrolliert, sondern im Netzwerk bereitgestellt und laufen wie programmiert ab. Benutzerkonten können dann mit einem Smart Contract interagieren, indem sie Transaktionen übermitteln, die eine im Smart Contract definierte Funktion ausführen. Smart Contracts können wie ein regulärer Vertrag Regeln definieren und diese automatisch über den Code durchsetzen. Smart Contracts können standardmäßig nicht gelöscht werden und Interaktionen mit ihnen sind irreversibel.

## Voraussetzungen {#prerequisites}

Wenn Sie gerade erst anfangen oder nach einer weniger technischen Einführung suchen, empfehlen wir unsere [Einführung in Smart Contracts](/smart-contracts/).

Stellen Sie sicher, dass Sie sich über [Konten](/developers/docs/accounts/), [Transaktionen](/developers/docs/transactions/) und die [Ethereum Virtual Machine](/developers/docs/evm/) informiert haben, bevor Sie in die Welt der Smart Contracts eintauchen.

## Ein digitaler Verkaufsautomat {#a-digital-vending-machine}

Die vielleicht beste Metapher für einen Smart Contract ist ein Verkaufsautomat, wie er von [Nick Szabo](https://unenumerated.blogspot.com/) beschrieben wurde. Mit den richtigen Eingaben ist eine bestimmte Ausgabe garantiert.

Um einen Snack aus einem Verkaufsautomaten zu bekommen:

```
money + snack selection = snack dispensed
```

Diese Logik ist in den Verkaufsautomaten einprogrammiert.

Ein Smart Contract hat, wie ein Verkaufsautomat, eine einprogrammierte Logik. Hier ist ein einfaches Beispiel dafür, wie dieser Verkaufsautomat aussehen würde, wenn er ein in Solidity geschriebener Smart Contract wäre:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Zustandsvariablen des Vertrags deklarieren
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Wenn der 'VendingMachine'-Vertrag bereitgestellt wird:
    // 1. die bereitstellende Adresse als Eigentümer des Vertrags festlegen
    // 2. das Cupcake-Guthaben des bereitgestellten Smart Contracts auf 100 festlegen
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Dem Eigentümer erlauben, das Cupcake-Guthaben des Smart Contracts zu erhöhen
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Jedem erlauben, Cupcakes zu kaufen
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

So wie ein Verkaufsautomat den Bedarf an einem Verkäufer überflüssig macht, können Smart Contracts in vielen Branchen Vermittler ersetzen.

## Erlaubnisfrei {#permissionless}

Jeder kann einen Smart Contract schreiben und im Netzwerk bereitstellen. Sie müssen nur lernen, wie man in einer [Smart-Contract-Sprache](/developers/docs/smart-contracts/languages/) programmiert, und über genügend ETH verfügen, um Ihren Vertrag bereitzustellen. Die Bereitstellung eines Smart Contracts ist technisch gesehen eine Transaktion, daher müssen Sie [Gas](/developers/docs/gas/) auf die gleiche Weise bezahlen, wie Sie Gas für eine einfache ETH-Überweisung bezahlen müssen. Die Gaskosten für die Bereitstellung von Verträgen sind jedoch weitaus höher.

Ethereum verfügt über entwicklerfreundliche Sprachen zum Schreiben von Smart Contracts:

- Solidity
- Vyper

[Mehr zu Sprachen](/developers/docs/smart-contracts/languages/)

Sie müssen jedoch kompiliert werden, bevor sie bereitgestellt werden können, damit die Ethereum Virtual Machine den Vertrag interpretieren und speichern kann. [Mehr zur Kompilierung](/developers/docs/smart-contracts/compiling/)

## Zusammensetzbarkeit {#composability}

Smart Contracts sind auf Ethereum öffentlich und können als offene APIs betrachtet werden. Das bedeutet, dass Sie andere Smart Contracts in Ihrem eigenen Smart Contract aufrufen können, um die Möglichkeiten erheblich zu erweitern. Verträge können sogar andere Verträge bereitstellen.

Erfahren Sie mehr über die [Zusammensetzbarkeit von Smart Contracts](/developers/docs/smart-contracts/composability/).

## Einschränkungen {#limitations}

Smart Contracts allein können keine Informationen über Ereignisse in der „realen Welt“ erhalten, da sie keine Daten aus Off-Chain-Quellen abrufen können. Das bedeutet, dass sie nicht auf Ereignisse in der realen Welt reagieren können. Dies ist beabsichtigt. Sich auf externe Informationen zu verlassen, könnte den Konsens gefährden, der für Sicherheit und Dezentralisierung wichtig ist.

Für Blockchain-Anwendungen ist es jedoch wichtig, Off-Chain-Daten nutzen zu können. Die Lösung sind [Orakel](/developers/docs/oracles/), also Werkzeuge, die Off-Chain-Daten aufnehmen und für Smart Contracts verfügbar machen.

Eine weitere Einschränkung von Smart Contracts ist die maximale Vertragsgröße. Ein Smart Contract darf maximal 24 KB groß sein, andernfalls geht ihm das Gas aus. Dies kann durch die Verwendung des [Diamond Patterns](https://eips.ethereum.org/EIPS/eip-2535) umgangen werden.

## Mehrfachsignatur-Verträge {#multisig}

Mehrfachsignatur-Verträge (Multisig) sind Smart-Contract-Konten, die mehrere gültige Signaturen erfordern, um eine Transaktion auszuführen. Dies ist sehr nützlich, um Single Points of Failure bei Verträgen zu vermeiden, die beträchtliche Mengen an Ether oder anderen Token halten. Mehrfachsignaturen teilen auch die Verantwortung für die Vertragsausführung und die Schlüsselverwaltung auf mehrere Parteien auf und verhindern, dass der Verlust eines einzelnen Private-Keys zu einem irreversiblen Verlust von Geldern führt. Aus diesen Gründen können Mehrfachsignatur-Verträge für eine einfache DAO-Governance verwendet werden. Mehrfachsignaturen erfordern N Signaturen von M möglichen akzeptablen Signaturen (wobei N ≤ M und M > 1), um ausgeführt zu werden. `N = 3, M = 5` und `N = 4, M = 7` werden häufig verwendet. Eine 4/7-Mehrfachsignatur erfordert vier von sieben möglichen gültigen Signaturen. Das bedeutet, dass die Gelder auch dann noch abrufbar sind, wenn drei Signaturen verloren gehen. In diesem Fall bedeutet es auch, dass die Mehrheit der Schlüsselbesitzer zustimmen und unterschreiben muss, damit der Vertrag ausgeführt wird.

## Ressourcen zu Smart Contracts {#smart-contract-resources}

**OpenZeppelin Contracts –** **_Bibliothek für die sichere Entwicklung von Smart Contracts._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Community-Forum](https://forum.openzeppelin.com/c/general/16)

## Weiterführende Literatur {#further-reading}

- [Coinbase: Was ist ein Smart Contract?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Was ist ein Smart Contract?](https://chain.link/education/smart-contracts)
- [Video: Einfach erklärt – Smart Contracts](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3-Lern- und Auditierungsplattform](https://updraft.cyfrin.io)

## Tutorials: Smart-Contract-Signaturen (EIP-1271) auf Ethereum {#tutorials}

- [EIP-1271: Signieren und Verifizieren von Smart-Contract-Signaturen](/developers/tutorials/eip-1271-smart-contract-signatures/) _– Wie EIP-1271 es Smart Contracts ermöglicht, Signaturen zu verifizieren, mit einer exemplarischen Vorgehensweise der Safe-Implementierung._