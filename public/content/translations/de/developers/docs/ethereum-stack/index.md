---
title: "Einführung in den Ethereum-Stack"
description: "Ein Überblick über die verschiedenen Schichten des Ethereum-Stacks und wie sie zusammenpassen."
lang: de
---

Wie bei jedem Software-Stack variiert der komplette „Ethereum-Stack“ von Projekt zu Projekt, abhängig von deinen Zielen.

Es gibt jedoch Kernkomponenten von Ethereum, die ein mentales Modell dafür liefern, wie Softwareanwendungen mit der Ethereum-Blockchain interagieren. Das Verständnis der Schichten des Stacks wird dir helfen, die verschiedenen Möglichkeiten zu verstehen, wie Ethereum in Softwareprojekte integriert werden kann.

## Ebene 1: Ethereum Virtual Machine {#ethereum-virtual-machine}

Die [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) ist die Laufzeitumgebung für Smart Contracts auf Ethereum. Alle Smart Contracts und Zustandsänderungen auf der Ethereum-Blockchain werden durch [Transaktionen](/developers/docs/transactions/) ausgeführt. Die EVM übernimmt die gesamte Transaktionsverarbeitung im Ethereum-Netzwerk.

Wie bei jeder virtuellen Maschine schafft die EVM eine Abstraktionsebene zwischen dem ausführenden Code und der ausführenden Maschine (einem Ethereum-Knoten). Derzeit läuft die EVM auf Tausenden von Knoten, die über die ganze Welt verteilt sind.

Im Hintergrund verwendet die EVM eine Reihe von Opcode-Anweisungen, um spezifische Aufgaben auszuführen. Diese (140 einzigartigen) Opcodes ermöglichen es der EVM, [Turing-vollständig](https://en.wikipedia.org/wiki/Turing_completeness) zu sein, was bedeutet, dass die EVM bei ausreichenden Ressourcen fast alles berechnen kann.

Als Entwickler einer dezentralen Anwendung (Dapp) musst du nicht viel über die EVM wissen, außer dass sie existiert und alle Anwendungen auf Ethereum zuverlässig und ohne Ausfallzeiten antreibt.

## Ebene 2: Smart Contracts {#smart-contracts}

[Smart Contracts](/developers/docs/smart-contracts/) sind die ausführbaren Programme, die auf der Ethereum-Blockchain laufen.

Smart Contracts werden in speziellen [Programmiersprachen](/developers/docs/smart-contracts/languages/) geschrieben, die zu EVM-Bytecode (maschinennahe Anweisungen, sogenannte Opcodes) kompiliert werden.

Smart Contracts dienen nicht nur als Open-Source-Bibliotheken, sie sind im Grunde offene API-Dienste, die ständig laufen und nicht abgeschaltet werden können. Smart Contracts bieten öffentliche Funktionen, mit denen Benutzer und Anwendungen ([Dapps](/developers/docs/dapps/)) ohne Erlaubnis interagieren können. Jede Anwendung kann sich in bereitgestellte Smart Contracts integrieren, um Funktionen zusammenzustellen, wie z. B. das Hinzufügen von [Daten-Feeds](/developers/docs/oracles/) oder die Unterstützung von Token-Swaps. Darüber hinaus kann jeder neue Smart Contracts auf Ethereum bereitstellen, um benutzerdefinierte Funktionen hinzuzufügen, die den Anforderungen seiner Anwendung entsprechen.

Als Dapp-Entwickler musst du nur dann Smart Contracts schreiben, wenn du der Ethereum-Blockchain benutzerdefinierte Funktionen hinzufügen möchtest. Möglicherweise stellst du fest, dass du die meisten oder alle Anforderungen deines Projekts erfüllen kannst, indem du dich einfach in bestehende Smart Contracts integrierst, zum Beispiel wenn du Zahlungen in Stablecoins unterstützen oder den dezentralen Austausch von Token ermöglichen möchtest.

## Ebene 3: Ethereum-Knoten {#ethereum-nodes}

Damit eine Anwendung mit der Ethereum-Blockchain interagieren kann, muss sie sich mit einem [Ethereum-Knoten](/developers/docs/nodes-and-clients/) verbinden. Die Verbindung zu einem Knoten ermöglicht es dir, Blockchain-Daten zu lesen und/oder Transaktionen an das Netzwerk zu senden.

Ethereum-Knoten sind Computer, auf denen Software läuft – ein Ethereum-Client. Ein Client ist eine Implementierung von Ethereum, die alle Transaktionen in jedem Block verifiziert und so das Netzwerk sicher und die Daten korrekt hält. **Ethereum-Knoten sind die Ethereum-Blockchain**. Sie speichern gemeinsam den Zustand der Ethereum-Blockchain und erzielen einen Konsens über Transaktionen, um den Blockchain-Zustand zu ändern.

Indem du deine Anwendung (über die [JSON-RPC-API](/developers/docs/apis/json-rpc/)) mit einem Ethereum-Knoten verbindest, kann deine Anwendung Daten aus der Blockchain lesen (wie z. B. Kontostände von Benutzern) sowie neue Transaktionen an das Netzwerk übertragen (wie z. B. die Überweisung von ETH zwischen Benutzerkonten oder die Ausführung von Funktionen von Smart Contracts).

## Ebene 4: Ethereum-Client-APIs {#ethereum-client-apis}

Viele Komfortbibliotheken (die von der Open-Source-Community von Ethereum entwickelt und gepflegt werden) ermöglichen es deinen Anwendungen, sich mit der Ethereum-Blockchain zu verbinden und mit ihr zu kommunizieren.

Wenn deine benutzerorientierte Anwendung eine Web-App ist, kannst du eine [JavaScript-API](/developers/docs/apis/javascript/) direkt in deinem Frontend per `npm install` einbinden. Oder vielleicht entscheidest du dich dafür, diese Funktionalität serverseitig mit einer [Python](/developers/docs/programming-languages/python/)- oder [Java](/developers/docs/programming-languages/java/)-API zu implementieren.

Obwohl diese APIs kein zwingend erforderlicher Teil des Stacks sind, abstrahieren sie einen Großteil der Komplexität der direkten Interaktion mit einem Ethereum-Knoten. Sie bieten auch Hilfsfunktionen (z. B. die Umrechnung von ETH in Gwei), sodass du als Entwickler weniger Zeit mit den Feinheiten von Ethereum-Clients verbringen musst und dich mehr auf die spezifische Funktionalität deiner Anwendung konzentrieren kannst.

## Ebene 5: Endbenutzeranwendungen {#end-user-applications}

Auf der obersten Ebene des Stacks befinden sich die benutzerorientierten Anwendungen. Dies sind die Standardanwendungen, die du heute regelmäßig nutzt und entwickelst: in erster Linie Web- und mobile Apps.

Die Art und Weise, wie du diese Benutzeroberflächen entwickelst, bleibt im Wesentlichen unverändert. Oft müssen Benutzer nicht wissen, dass die von ihnen verwendete Anwendung auf einer Blockchain basiert.

## Bereit, deinen Stack auszuwählen? {#ready-to-choose-your-stack}

Sieh dir unseren Leitfaden zur [Einrichtung einer lokalen Entwicklungsumgebung](/developers/local-environment/) für deine Ethereum-Anwendung an.

## Weiterführende Literatur {#further-reading}

- [Die Architektur einer Web 3.0-Anwendung](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_