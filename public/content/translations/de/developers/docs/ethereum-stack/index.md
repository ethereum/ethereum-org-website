---
title: "Einführung in den Ethereum-Stack"
description: Eine Vorstellung der verschiedenen Ebenen des Ethereum-Stacks und wie sie zusammen passen
lang: de
---

Wie bei jedem Software-Stack variiert der komplette "Ethereum-Stack" zielabhängig von Projekt zu Projekt.

Es gibt jedoch zentrale Komponenten von Ethereum, die dabei helfen, ein gedankliches Modell für die Interaktion von Softwareanwendungen mit der Ethereum-Blockchain bereitzustellen. Wenn Sie die Ebenen des Stacks verstehen, ist es einfacher, die unterschiedlichen Möglichkeiten für die Integration von Ethereum in Softwareprojekte zu verstehen.

## Ebene 1: Ethereum Virtual Machine {#ethereum-virtual-machine}

Die [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) ist die Laufzeitumgebung für Smart Contracts auf Ethereum. Alle Smart Contracts und Zustandsänderungen auf der Ethereum-Blockchain werden durch [Transaktionen](/developers/docs/transactions/) ausgeführt. Die EVM übernimmt die gesamte Transaktionsabwicklung im Ethereum-Netzwerk.

Wie bei jeder virtuellen Maschine erzeugt die EVM einen Abstraktionsgrad zwischen dem ausführenden Code und der ausführenden Maschine (einem Ethereum-Node). Derzeit läuft die EVM auf Tausenden von Knoten, die weltweit verteilt sind.

Unter der Haube verwendet die EVM eine Reihe von Opcode-Anweisungen, um bestimmte Aufgaben auszuführen. Diese (140 einzigartigen) Opcodes ermöglichen es der EVM, [Turing-vollständig](https://en.wikipedia.org/wiki/Turing_completeness) zu sein, was bedeutet, dass die EVM bei ausreichenden Ressourcen in der Lage ist, so gut wie alles zu berechnen.

Als dApp-Entwickler müssen Sie über die EVM nicht mehr wissen, als dass sie existiert und sie alle Anwendungen auf Ethereum zuverlässig ohne Ausfallzeiten betreibt.

## Ebene 2: Smart Contracts {#smart-contracts}

[Smart Contracts](/developers/docs/smart-contracts/) sind die ausführbaren Programme, die auf der Ethereum-Blockchain laufen.

Smart Contracts werden in spezifischen [Programmiersprachen](/developers/docs/smart-contracts/languages/) geschrieben, die zu EVM-Bytecode (Maschinenbefehle auf niedriger Ebene, sogenannte Opcodes) kompiliert werden.

Smart Contracts dienen nicht nur als Open-Source-Bibliotheken, sondern sind im Wesentlichen offene API-Dienste, die rund um die Uhr laufen und nicht aufgehoben werden können. Smart Contracts stellen öffentliche Funktionen zur Verfügung, mit denen Benutzer und Anwendungen ([Dapps](/developers/docs/dapps/)) ohne Genehmigung interagieren können. Jede Anwendung kann in bereitgestellte Smart Contracts integriert werden, um Funktionalitäten zusammenzustellen, wie z. B. das Hinzufügen von [Daten-Feeds](/developers/docs/oracles/) oder die Unterstützung von Token-Swaps. Zudem kann jeder neue Smart Contracts für Ethereum bereitstellen, um maßgeschneiderte Funktionen für die Anforderungen der eigenen Anwendung zu schaffen.

Als dApp-Entwickler müssen Sie Smart Contracts nur dann schreiben, wenn Sie benutzerdefinierte Funktionen zur Ethereum-Blockchain hinzufügen möchten. Sie werden feststellen, dass sich die meisten oder alle Bedürfnisse Ihres Projekts durch die Integration von bestehenden Smart Contracts erfüllen lassen, zum Beispiel wenn Sie Zahlungen in Stablecoins unterstützen oder den dezentralen Austausch von Tokens ermöglichen möchten.

## Ebene 3: Ethereum-Nodes {#ethereum-nodes}

Damit eine Anwendung mit der Ethereum-Blockchain interagieren kann, muss sie sich mit einem [Ethereum-Node](/developers/docs/nodes-and-clients/) verbinden. Wenn Sie sich mit einem Node verbinden, können Sie Blockchain-Daten lesen und/oder Transaktionen an das Netzwerk senden.

Ethereum-Nodes sind Computer auf denen Software läuft – ein Ethereum-Client. Ein Client ist eine Implementierung von Ethereum, der alle Transaktionen in jedem Block prüft und das Netzwerk somit sicher und die Daten genau hält. **Ethereum-Nodes sind die Ethereum-Blockchain**. Sie speichern gemeinsam den Zustand der Ethereum-Blockchain und erreichen einen Konsens über Transaktionen, um den Blockchain-Status zu mutieren.

Indem Sie Ihre Anwendung mit einem Ethereum-Node verbinden (über die [JSON-RPC-API](/developers/docs/apis/json-rpc/)), kann Ihre Anwendung Daten aus der Blockchain lesen (z. B. Salden von Benutzerkonten) und neue Transaktionen an das Netzwerk senden (z. B. ETH-Übertragungen zwischen Benutzerkonten oder die Ausführung von Smart-Contract-Funktionen).

## Ebene 4: Ethereum-Client-APIs {#ethereum-client-apis}

Viele komfortable Bibliotheken (die von der Open-Source-Community von Ethereum erstellt und verwaltet werden) ermöglichen es Ihren Anwendern, sich mit der Ethereum-Blockchain zu verbinden und mit ihr zu kommunizieren.

Wenn Ihre Endbenutzer-Anwendung eine Web-App ist, können Sie eine [JavaScript-API](/developers/docs/apis/javascript/) mit `npm install` direkt in Ihr Frontend installieren. Oder Sie entscheiden sich vielleicht dafür, diese Funktionalität serverseitig zu implementieren und eine API für [Python](/developers/docs/programming-languages/python/) oder [Java](/developers/docs/programming-languages/java/) zu verwenden.

Obwohl diese APIs kein notwendiger Bestandteil des Stacks sind, gestalten sie die direkte Interaktion mit einem Ethereum-Node wesentlich einfacher. Sie bieten auch Hilfsfunktionen (z. B. die Umrechnung von ETH in Gwei), sodass Sie als Entwickler weniger Zeit mit den Feinheiten von Ethereum-Clients verbringen und sich mehr auf die anwendungsspezifische Funktionalität konzentrieren können.

## Ebene 5: Endbenutzeranwendungen {#end-user-applications}

Auf der obersten Ebene des Stacks befinden sich benutzerorientierte Anwendungen. Das sind die Standardanwendungen, die Sie heute regelmäßig nutzen aund aufhauen: in erster Linie Web- und Mobilanwendungen.

Die Art und Weise, wie Sie diese Benutzeroberflächen entwickeln, bleibt im Wesentlichen unverändert. Meist müssen Benutzer nicht wissen, dass die von ihnen verwendete Anwendung auf einer Blockchain erstellt wurde.

## Bereit, Ihren Stack zu wählen? {#ready-to-choose-your-stack}

Lesen Sie unseren Leitfaden zum [Einrichten einer lokalen Entwicklungsumgebung](/developers/local-environment/) für Ihre Ethereum-Anwendung.

## Weiterführende Lektüre {#further-reading}

- [Die Architektur einer Web 3.0-Anwendung](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
