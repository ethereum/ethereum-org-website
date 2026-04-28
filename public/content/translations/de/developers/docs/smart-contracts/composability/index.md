---
title: Zusammensetzbarkeit von Smart Contracts
description: "Erfahren Sie, wie Smart Contracts wie Legosteine kombiniert werden können, um komplexe Dapps durch die Wiederverwendung bestehender Komponenten zu erstellen."
lang: de
incomplete: true
---

## Eine kurze Einführung {#a-brief-introduction}

Smart Contracts sind auf Ethereum öffentlich und können als offene APIs betrachtet werden. Sie müssen keinen eigenen Smart Contract schreiben, um ein Dapp-Entwickler zu werden, Sie müssen nur wissen, wie man mit ihnen interagiert. Zum Beispiel können Sie die bestehenden Smart Contracts von [Uniswap](https://uniswap.exchange/swap), einer dezentralisierten Börse, verwenden, um die gesamte Token-Tausch-Logik in Ihrer Anwendung zu handhaben – Sie müssen nicht bei null anfangen. Sehen Sie sich einige ihrer [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts)- und [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts)-Verträge an.

## Was ist Zusammensetzbarkeit? {#what-is-composability}

Zusammensetzbarkeit (Composability) ist die Kombination verschiedener Komponenten, um neue Systeme oder Ergebnisse zu schaffen. In der Softwareentwicklung bedeutet Zusammensetzbarkeit, dass Entwickler bestehende Softwarekomponenten wiederverwenden können, um neue Anwendungen zu erstellen. Ein guter Weg, um Zusammensetzbarkeit zu verstehen, ist, sich zusammensetzbare Elemente als Legosteine vorzustellen. Jeder Legostein kann mit einem anderen kombiniert werden, was es Ihnen ermöglicht, komplexe Strukturen durch die Kombination verschiedener Legosteine zu bauen.

In Ethereum ist jeder Smart Contract eine Art Legostein – Sie können Smart Contracts aus anderen Projekten als Bausteine für Ihr Projekt verwenden. Das bedeutet, dass Sie keine Zeit damit verbringen müssen, das Rad neu zu erfinden oder von Grund auf neu zu bauen.

## Wie funktioniert Zusammensetzbarkeit? {#how-does-composability-work}

Ethereum-Smart-Contracts sind wie öffentliche APIs, sodass jeder mit dem Vertrag interagieren oder ihn in Dapps für zusätzliche Funktionalität integrieren kann. Die Zusammensetzbarkeit von Smart Contracts basiert im Allgemeinen auf drei Prinzipien: Modularität, Autonomie und Auffindbarkeit:

**1. Modularität**: Dies ist die Fähigkeit einzelner Komponenten, eine bestimmte Aufgabe auszuführen. In Ethereum hat jeder Smart Contract einen spezifischen Anwendungsfall (wie im Uniswap-Beispiel gezeigt).

**2. Autonomie**: Zusammensetzbare Komponenten müssen in der Lage sein, unabhängig zu arbeiten. Jeder Smart Contract in Ethereum ist selbstausführend und kann funktionieren, ohne sich auf andere Teile des Systems zu verlassen.

**3. Auffindbarkeit**: Entwickler können keine externen Verträge aufrufen oder Softwarebibliotheken in Anwendungen integrieren, wenn erstere nicht öffentlich verfügbar sind. Smart Contracts sind von Natur aus Open-Source; jeder kann einen Smart Contract aufrufen oder eine Codebasis forken.

## Vorteile der Zusammensetzbarkeit {#benefits-of-composability}

### Kürzerer Entwicklungszyklus {#shorter-development-cycle}

Zusammensetzbarkeit reduziert die Arbeit, die Entwickler bei der Erstellung von [Dapps](/apps/#what-are-dapps) leisten müssen. [Wie Naval Ravikant es ausdrückt:](https://twitter.com/naval/status/1444366754650656770) „Open Source bedeutet, dass jedes Problem nur einmal gelöst werden muss.“

Wenn es einen Smart Contract gibt, der ein Problem löst, können andere Entwickler ihn wiederverwenden, sodass sie nicht dasselbe Problem lösen müssen. Auf diese Weise können Entwickler bestehende Softwarebibliotheken nehmen und zusätzliche Funktionalität hinzufügen, um neue Dapps zu erstellen.

### Größere Innovation {#greater-innovation}

Zusammensetzbarkeit fördert Innovation und Experimentierfreudigkeit, da Entwickler frei sind, Open-Source-Code wiederzuverwenden, zu modifizieren, zu duplizieren oder zu integrieren, um die gewünschten Ergebnisse zu erzielen. Infolgedessen verbringen Entwicklungsteams weniger Zeit mit grundlegenden Funktionen und können mehr Zeit für das Experimentieren mit neuen Funktionen aufwenden.

### Bessere Benutzererfahrung {#better-user-experience}

Die Interoperabilität zwischen den Komponenten des Ethereum-Ökosystems verbessert die Benutzererfahrung. Benutzer können auf eine größere Funktionalität zugreifen, wenn Dapps externe Smart Contracts integrieren, als in einem fragmentierten Ökosystem, in dem Anwendungen nicht kommunizieren können.

Wir verwenden ein Beispiel aus dem Arbitrage-Handel, um die Vorteile der Interoperabilität zu veranschaulichen:

Wenn ein Token an `Börse A` höher gehandelt wird als an `Börse B`, können Sie den Preisunterschied nutzen, um Gewinn zu erzielen. Sie können dies jedoch nur tun, wenn Sie über genügend Kapital verfügen, um die Transaktion zu finanzieren (d. h. den Token an `Börse B` zu kaufen und an `Börse A` zu verkaufen).

In einem Szenario, in dem Sie nicht über genügend Mittel verfügen, um den Handel abzudecken, könnte ein Flash-Kredit ideal sein. [Flash-Kredite](/defi/#flash-loans) sind hochtechnisch, aber die Grundidee ist, dass Sie Vermögenswerte (ohne Sicherheiten) leihen und diese innerhalb _einer_ Transaktion zurückgeben können.

Um auf unser anfängliches Beispiel zurückzukommen: Ein Arbitrage-Händler kann einen großen Flash-Kredit aufnehmen, Token an `Börse B` kaufen, sie an `Börse A` verkaufen, das Kapital plus Zinsen zurückzahlen und den Gewinn behalten – alles innerhalb derselben Transaktion. Diese komplexe Logik erfordert die Kombination von Aufrufen an mehrere Verträge, was nicht möglich wäre, wenn es Smart Contracts an Interoperabilität mangeln würde.

## Beispiele für Zusammensetzbarkeit in Ethereum {#composability-in-ethereum}

### Token-Tausch {#token-swaps}

Wenn Sie eine Dapp erstellen, die erfordert, dass Transaktionen in ETH bezahlt werden, können Sie Benutzern erlauben, in anderen ERC-20-Token zu bezahlen, indem Sie eine Token-Tausch-Logik integrieren. Der Code wird den Token des Benutzers automatisch in ETH umwandeln, bevor der Vertrag die aufgerufene Funktion ausführt.

### Governance {#governance}

Der Aufbau maßgeschneiderter Governance-Systeme für eine [DAO](/dao/) kann teuer und zeitaufwändig sein. Stattdessen könnten Sie ein Open-Source-Governance-Toolkit wie den [Aragon Client](https://client.aragon.org/) verwenden, um Ihre DAO zu bootstrappen und schnell ein Governance-Framework zu erstellen.

### Identitätsmanagement {#identity-management}

Anstatt ein benutzerdefiniertes Authentifizierungssystem zu erstellen oder sich auf zentralisierte Anbieter zu verlassen, können Sie dezentralisierte Identitätswerkzeuge (DID) integrieren, um die Authentifizierung für Benutzer zu verwalten. Ein Beispiel ist [SpruceID](https://www.spruceid.com/), ein Open-Source-Toolkit, das eine „Sign in with Ethereum“-Funktionalität bietet, mit der Benutzer Identitäten mit einem Ethereum-Wallet authentifizieren können.

## Verwandte Tutorials {#related-tutorials}

- [Starten Sie Ihre Dapp-Frontend-Entwicklung mit create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Ein Überblick darüber, wie man create-eth-app verwendet, um sofort einsatzbereite Anwendungen mit beliebten Smart Contracts zu erstellen._

## Weiterführende Literatur {#further-reading}

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

- [Composability is Innovation](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Why Composability Matters For Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [What is Composability?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)