---
title: Smart-Contract-Kombinierbarkeit
description:
lang: de
incomplete: true
---

## Eine kurze Einführung {#a-brief-introduction}

Smart Contracts sind auf Ethereum öffentlich und können als offene APIs betrachtet werden. Sie müssen nicht unbedingt Ihren eigenen Smart Contract schreiben, um ein dApp-Entwickler zu werden, sondern nur wissen, wie Sie mit Smart Contracts interagieren können. Sie können zum Beispiel vorhandenen Smart Contracts von [Uniswap](https://uniswap.exchange/swap), eine dezentrale Börse, verwenden, um die Token-Swap-Logik in Ihrer App zu handhaben. Sie müssen also nicht bei Null anfangen. Sehen Sie sich einige der [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts)- und [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts)-Verträge an.

## Was ist Zusammensetzbarkeit? {#what-is-composability}

Zusammensetzbarkeit ist die Kombination verschiedener Komponenten zur Schaffung neuer Systeme oder Ergebnisse. In der Softwareentwicklung bedeutet Zusammensetzbarkeit, dass Entwickler vorhandene Softwarekomponenten wiederverwenden können, um neue Anwendungen zu erstellen. Um die Zusammensetzbarkeit zu verstehen, stellen Sie sich einfach zusammensetzbare Elemente als Legosteine vor. Jeder Legostein kann mit einem anderen kombiniert werden, sodass Sie durch die Verbindung verschiedener Legosteine komplexe Strukturen errichten können.

Auf Ethereum ist jeder Smart Contract eine Art Legostein – Sie können Smart Contracts aus anderen Projekten als Bausteine für Ihr Projekt verwenden. Das bedeutet, dass Sie keine Zeit damit verschwenden müssen, das Rad neu zu erfinden oder von Grund auf neu zu entwickeln.

## Wie funktioniert Zusammensetzbarkeit? {#how-does-composability-work}

Ethereum-Smart-Contracts sind wie öffentliche APIs, d. h. jeder kann mit dem Vertrag interagieren oder sie in DApps integrieren, um zusätzliche Funktionen zu erhalten. Die Zusammensetzbarkeit von Smart Contracts beruht im Allgemeinen auf drei Prinzipien: Modularität, Autonomie und Auffindbarkeit:

**‌1. Modularität**: Dies ist die Fähigkeit einzelner Komponenten, eine bestimmte Aufgabe zu erfüllen. Auf Ethereum verfügt jeder Smart Contract über einen bestimmten Anwendungsfall (wie im Beispiel von Uniswap gezeigt).

**2. Autonomie**: Zusammensetzbare Komponenten müssen in der Lage sein, unabhängig voneinander zu arbeiten. Jeder Smart Contract in Ethereum ist selbstausführend und kann betrieben werden, ohne auf andere Teile des Systems angewiesen zu sein.

**3. Auffindbarkeit**: Entwickler können keine externen Verträge aufrufen oder Softwarebibliotheken in Anwendungen integrieren, wenn Erstere nicht öffentlich zugänglich sind. Smart Contracts sind bewusst als Open-Source-Software konzipiert, d. h. jeder kann einen Smart Contract aufrufen oder eine Codebasis abspalten.

## Vorteile der Zusammensetzbarkeit {#benefits-of-composability}

### Kürzere Entwicklungszyklen {#shorter-development-cycle}

Die Zusammensetzbarkeit reduziert die Arbeit, die Entwickler bei der Erstellung von [DApps](/dapps/#what-are-dapps) leisten müssen. [Wie Naval Ravikant es ausdrückt:](https://twitter.com/naval/status/1444366754650656770) „Open Source bedeutet, dass jedes Problem nur einmal gelöst werden muss.“

Wenn es einen Smart Contract gibt, der ein Problem löst, können andere Entwickler ihn wiederverwenden, damit sie nicht das gleiche Problem lösen müssen. Auf diese Weise können Entwickler bestehenden Softwarebibliotheken zusätzliche Funktionen hinzufügen, um neue DApps zu erstellen.

### Mehr Innovation {#greater-innovation}

Die Zusammensetzbarkeit fördert Innovationen und Experimentierfreude, da es den Entwicklern freisteht, Open-Source-Code wiederzuverwenden, abzuändern, zu vervielfältigen oder zu integrieren, um die gewünschten Ergebnisse zu erzielen. Infolgedessen verbringen die Entwicklungsteams weniger Zeit mit der grundlegenden Funktionalität und können mehr Zeit für das Experimentieren mit neuen Funktionen aufwenden.

### Bessere Nutzererfahrung {#better-user-experience}

Die Interoperabilität zwischen den Komponenten des Ethereum-Ökosystems verbessert das Benutzererlebnis. Wenn DApps externe Smart Contracts integrieren, können die Benutzer auf mehr Funktionen zugreifen als in einem fragmentierten Ökosystem, in dem Anwendungen nicht miteinander kommunizieren können.

Anhand eines Beispiels aus dem Arbitrage-Handel wollen wir die Vorteile der Interoperabilität verdeutlichen:

Wenn ein Token auf `Börse A` höher gehandelt wird als auf `Börse B`, können Sie sich den Preisunterschied zunutze machen, um Gewinn zu erzielen. Sie können das allerdings nur tun, wenn Sie über genügend Kapital verfügen, um die Transaktion zu finanzieren (d. h. den Token auf `Börse B` zu kaufen und ihn auf `Börse A` zu verkaufen).

In einem Szenario, in dem Sie nicht über genügend Geldmittel verfügen, um den Handel zu decken, könnte sich ein Flash Loan ideal eignen. [Flash Loans](/defi/#flash-loans) sind sehr fachspezifisch, aber die Grundidee ist, dass Assets (ohne Sicherheiten) ausgeliehen und diese innerhalb _einer_ Transaktion zurückgeben werden können.

Zurück zu unserem anfänglichen Beispiel: Ein Arbitrage-Händler kann einen großen Flash Loan aufnehmen, Token von `Börse B` kaufen, diese auf `Börse A` verkaufen, das Kapital + Zinsen zurückzahlen und den Gewinn innerhalb derselben Transaktion behalten. Diese komplexe Logik erfordert die Kombination von Aufrufen für mehrere Verträge, was nicht möglich wäre, wenn Smart Contracts nicht über Interoperabilität verfügen würden.

## Beispiele für Zusammensetzbarkeit auf Ethereum {#composability-in-ethereum}

### Token-Tausch {#token-swaps}

Wenn Sie eine DApp erstellen, für die Transaktionen in ETH bezahlt werden müssen, können Sie den Benutzern die Zahlung in anderen ERC-20-Token erlauben, indem Sie eine Token-Tausch-Logik integrieren. Der Code wandelt den Token des Benutzers automatisch in ETH um, bevor der Vertrag die aufgerufene Funktion ausführt.

### Verwaltung {#governance}

Die Entwicklung maßgeschneiderter Verwaltungssysteme für eine [DAO](/dao/) kann teuer und zeitaufwendig sein. Stattdessen könnten Sie ein Verwaltungs-Toolkit auf Open-Source-Basis wie [Aragon Client](https://client.aragon.org/) zur Gründung Ihrer DAO und schnellen Schaffung eines Verwaltungs-Frameworks verwenden.

### Identitätsmanagement {#identity-management}

Anstatt ein benutzerdefiniertes Authentifizierungssystem zu entwickeln oder sich auf zentrale Anbieter zu verlassen, können Sie zur Verwaltung der Benutzerauthentifizierung Werkzeuge für dezentrale Identität (DID) integrieren. Ein Beispiel hierfür ist [SpruceID](https://www.spruceid.com/), ein Open-Source-Toolkit, das eine „Anmeldung bei Ethereum“-Funktionalität anbietet, mit der Benutzer Identitäten mithilfe einer Ethereum-Wallet authentifizieren können.

## Ähnliche Tutorials {#related-tutorials}

- [Starten Sie die Entwicklung Ihres DApp-Frontends mit create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Ein Überblick über die Verwendung von create-eth-app, um sofort einsatzbereite Apps mit beliebten Smart Contracts zu erstellen._

## Weiterführende Informationen {#further-reading}

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_

- [Kombinierbarkeit ist Innovation](https://future.a16z.com/how-composability-unlocks-crypto-and-everything-else/)
- [Warum Zusammensetzbarkeit für Web3 wichtig ist](https://hackernoon.com/why-composability-matters-for-web3)
- [Was ist Zusammensetzbarkeit?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
