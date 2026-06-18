---
title: Komponierbarkeit von Smart Contracts
description: Erfahre, wie Smart Contracts wie Legosteine kombiniert werden können, um durch die Wiederverwendung bestehender Komponenten komplexe Dapps zu erstellen.
lang: de
incomplete: true
---

## Eine kurze Einführung {#a-brief-introduction}

Smart Contracts sind auf Ethereum öffentlich und können als offene APIs betrachtet werden. Du musst keinen eigenen Smart Contract schreiben, um ein Dapp-Entwickler zu werden, du musst nur wissen, wie man mit ihnen interagiert. Zum Beispiel kannst du die bestehenden Smart Contracts von [Uniswap](https://uniswap.exchange/swap), einer dezentralen Börse, verwenden, um die gesamte Token-Tausch-Logik in deiner App zu handhaben – du musst nicht bei null anfangen. Sieh dir einige ihrer [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts)- und [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts)-Verträge an.

## Was ist Komponierbarkeit? {#what-is-composability}

Komponierbarkeit ist die Kombination verschiedener Komponenten, um neue Systeme oder Ergebnisse zu schaffen. In der Softwareentwicklung bedeutet Komponierbarkeit, dass Entwickler bestehende Softwarekomponenten wiederverwenden können, um neue Anwendungen zu erstellen. Ein guter Weg, um Komponierbarkeit zu verstehen, ist, sich zusammensetzbare Elemente wie Legosteine vorzustellen. Jeder Legostein kann mit einem anderen kombiniert werden, was es dir ermöglicht, komplexe Strukturen durch die Kombination verschiedener Legosteine zu bauen.

In Ethereum ist jeder Smart Contract eine Art Legostein – du kannst Smart Contracts aus anderen Projekten als Bausteine für dein Projekt verwenden. Das bedeutet, dass du keine Zeit damit verbringen musst, das Rad neu zu erfinden oder von Grund auf neu zu bauen.

## Wie funktioniert Komponierbarkeit? {#how-does-composability-work}

Ethereum-Smart-Contracts sind wie öffentliche APIs, sodass jeder mit dem Vertrag interagieren oder sie für zusätzliche Funktionalität in Dapps integrieren kann. Die Komponierbarkeit von Smart Contracts basiert im Allgemeinen auf drei Prinzipien: Modularität, Autonomie und Entdeckbarkeit:

**1. Modularität**: Dies ist die Fähigkeit einzelner Komponenten, eine bestimmte Aufgabe auszuführen. In Ethereum hat jeder Smart Contract einen spezifischen Anwendungsfall (wie im Uniswap-Beispiel gezeigt).

**2. Autonomie**: Zusammensetzbare Komponenten müssen in der Lage sein, unabhängig zu arbeiten. Jeder Smart Contract in Ethereum ist selbstausführend und kann funktionieren, ohne sich auf andere Teile des Systems zu verlassen.

**3. Entdeckbarkeit**: Entwickler können keine externen Verträge aufrufen oder Softwarebibliotheken in Anwendungen integrieren, wenn erstere nicht öffentlich verfügbar sind. Smart Contracts sind von Natur aus Open Source; jeder kann einen Smart Contract aufrufen oder eine Codebasis forken.

## Vorteile der Komponierbarkeit {#benefits-of-composability}

### Kürzerer Entwicklungszyklus {#shorter-development-cycle}

Komponierbarkeit reduziert die Arbeit, die Entwickler bei der Erstellung von [Dapps](/apps/#what-are-dapps) leisten müssen. [Wie Naval Ravikant es ausdrückt:](https://twitter.com/naval/status/1444366754650656770) „Open Source bedeutet, dass jedes Problem nur einmal gelöst werden muss.“

Wenn es einen Smart Contract gibt, der ein Problem löst, können andere Entwickler ihn wiederverwenden, sodass sie nicht dasselbe Problem lösen müssen. Auf diese Weise können Entwickler bestehende Softwarebibliotheken nehmen und zusätzliche Funktionalität hinzufügen, um neue Dapps zu erstellen.

### Größere Innovation {#greater-innovation}

Komponierbarkeit fördert Innovation und Experimentierfreudigkeit, da es Entwicklern freisteht, Open-Source-Code wiederzuverwenden, zu modifizieren, zu duplizieren oder zu integrieren, um die gewünschten Ergebnisse zu erzielen. Infolgedessen verbringen Entwicklungsteams weniger Zeit mit grundlegenden Funktionen und können mehr Zeit in das Experimentieren mit neuen Funktionen investieren.

### Bessere Benutzererfahrung {#better-user-experience}

Die Interoperabilität zwischen Komponenten des Ethereum-Ökosystems verbessert die Benutzererfahrung. Benutzer können auf einen größeren Funktionsumfang zugreifen, wenn Dapps externe Smart Contracts integrieren, als in einem fragmentierten Ökosystem, in dem Anwendungen nicht miteinander kommunizieren können.

Wir verwenden ein Beispiel aus dem Arbitrage-Handel, um die Vorteile der Interoperabilität zu veranschaulichen:

Wenn ein Token auf `exchange A` höher gehandelt wird als auf `exchange B`, kannst du den Preisunterschied nutzen, um Gewinn zu erzielen. Dies ist jedoch nur möglich, wenn du über genügend Kapital verfügst, um die Transaktion zu finanzieren (d. h. den Token von `exchange B` zu kaufen und ihn auf `exchange A` zu verkaufen).

In einem Szenario, in dem du nicht über genügend Mittel verfügst, um den Handel abzudecken, könnte ein Blitzkredit ideal sein. [Blitzkredite](/defi/#flash-loans) sind hochtechnisch, aber die Grundidee ist, dass du dir Vermögenswerte (ohne Sicherheiten) leihen und diese innerhalb _einer_ Transaktion zurückgeben kannst.

Um auf unser anfängliches Beispiel zurückzukommen: Ein Arbitrage-Händler kann einen großen Blitzkredit aufnehmen, Token von `exchange B` kaufen, sie auf `exchange A` verkaufen, das Kapital plus Zinsen zurückzahlen und den Gewinn behalten – alles innerhalb derselben Transaktion. Diese komplexe Logik erfordert die Kombination von Aufrufen an mehrere Verträge, was nicht möglich wäre, wenn es Smart Contracts an Interoperabilität mangeln würde.

## Beispiele für Komponierbarkeit in Ethereum {#composability-in-ethereum}

### Token-Tausch {#token-swaps}

Wenn du eine Dapp erstellst, bei der Transaktionen in ETH bezahlt werden müssen, kannst du Benutzern erlauben, in anderen ERC-20-Token zu bezahlen, indem du eine Token-Tausch-Logik integrierst. Der Code wandelt den Token des Benutzers automatisch in ETH um, bevor der Vertrag die aufgerufene Funktion ausführt.

### Governance {#governance}

Der Aufbau maßgeschneiderter Governance-Systeme für eine [DAO](/dao/) kann teuer und zeitaufwändig sein. Stattdessen könntest du ein Open-Source-Governance-Toolkit wie den [Aragon Client](https://client.aragon.org/) verwenden, um deine DAO zu bootstrappen und schnell ein Governance-Framework zu erstellen.

### Identitätsmanagement {#identity-management}

Anstatt ein benutzerdefiniertes Authentifizierungssystem zu entwickeln oder sich auf zentralisierte Anbieter zu verlassen, kannst du Tools für dezentrale Identität (DID) integrieren, um die Authentifizierung für Benutzer zu verwalten. Ein Beispiel ist [SpruceID](https://www.spruceid.com/), ein Open-Source-Toolkit, das eine „Sign in with Ethereum“-Funktionalität bietet, mit der Benutzer Identitäten über eine Ethereum-Wallet authentifizieren können.

## Verwandte Tutorials {#related-tutorials}

- [Starte deine Dapp-Frontend-Entwicklung mit create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Ein Überblick darüber, wie man create-eth-app verwendet, um Apps mit beliebten Smart Contracts von Haus aus zu erstellen._

## Weiterführende Literatur {#further-reading}

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_

- [Komponierbarkeit ist Innovation](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Warum Komponierbarkeit für Web3 wichtig ist](https://hackernoon.com/why-composability-matters-for-web3)
- [Was ist Komponierbarkeit?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)