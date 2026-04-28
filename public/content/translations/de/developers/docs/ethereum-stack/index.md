---
title: "Einführung in den Ethereum-Stack"
description: Ein Durchgang durch die verschiedenen Ebenen des Ethereum-Stacks und wie sie zusammenpassen.
lang: de
---

Wie bei jedem Software-Stack variiert der komplette „Ethereum-Stack“ von Projekt zu Projekt, abhängig von Ihren Zielen.

Es gibt jedoch Kernkomponenten von Ethereum, die ein mentales Modell dafür liefern, wie Softwareanwendungen mit der Ethereum-Blockchain interagieren. Das Verständnis der Ebenen des Stacks wird Ihnen helfen, die verschiedenen Möglichkeiten zu verstehen, wie Ethereum in Softwareprojekte integriert werden kann.

## Ebene 1: Ethereum Virtual Machine {#ethereum-virtual-machine}

Die [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) ist die Laufzeitumgebung für Smart Contracts auf Ethereum. Alle Smart Contracts und Zustandsänderungen auf der Ethereum-Blockchain werden durch [Transaktionen](/developers/docs/transactions/) ausgeführt. Die EVM übernimmt die gesamte Transaktionsverarbeitung im Ethereum-Netzwerk.

Wie bei jeder virtuellen Maschine schafft die EVM eine Abstraktionsebene zwischen dem ausführenden Code und der ausführenden Maschine (einem Ethereum-Blockchain-Knoten). Derzeit läuft die EVM auf Tausenden von verteilten Blockchain-Knoten auf der ganzen Welt.

Unter der Haube verwendet die EVM eine Reihe von Opcode-Anweisungen, um spezifische Aufgaben auszuführen. Diese (140 einzigartigen) Opcodes ermöglichen es der EVM, [Turing-vollständig](https://en.wikipedia.org/wiki/Turing_completeness) zu sein, was bedeutet, dass die EVM in der Lage ist, fast alles zu berechnen, sofern genügend Ressourcen vorhanden sind.

Als Dapp-Entwickler müssen Sie nicht viel über die EVM wissen, außer dass sie existiert und dass sie zuverlässig alle Anwendungen auf Ethereum ohne Ausfallzeiten antreibt.

## Ebene 2: Smart Contracts {#smart-contracts}

[Smart Contracts](/developers/docs/smart-contracts/) sind die ausführbaren Programme, die auf der Ethereum-Blockchain laufen.

Smart Contracts werden in spezifischen [Programmiersprachen](/developers/docs/smart-contracts/languages/) geschrieben, die zu EVM-Bytecode (maschinennahe Anweisungen, sogenannte Opcodes) kompiliert werden.

Smart Contracts dienen nicht nur als Open-Source-Bibliotheken, sie sind im Wesentlichen offene API-Dienste, die ständig laufen und nicht abgeschaltet werden können. Smart Contracts bieten öffentliche Funktionen, mit denen Benutzer und Anwendungen ([Dapps](/developers/docs/dapps/)) interagieren können, ohne eine Erlaubnis zu benötigen. Jede Anwendung kann sich in bereitgestellte Smart Contracts integrieren, um Funktionalitäten zusammenzustellen, wie z. B. das Hinzufügen von [Daten-Feeds](/developers/docs/oracles/) oder die Unterstützung beim Tauschen von Token. Darüber hinaus kann jeder neue Smart Contracts auf Ethereum bereitstellen, um benutzerdefinierte Funktionen hinzuzufügen, die den Anforderungen seiner Anwendung entsprechen.

Als Dapp-Entwickler müssen Sie nur dann Smart Contracts schreiben, wenn Sie der Ethereum-Blockchain benutzerdefinierte Funktionen hinzufügen möchten. Möglicherweise stellen Sie fest, dass Sie die meisten oder alle Anforderungen Ihres Projekts erfüllen können, indem Sie sich einfach in bestehende Smart Contracts integrieren, beispielsweise wenn Sie Zahlungen in Stablecoins unterstützen oder eine dezentralisierte Börse für Token ermöglichen möchten.

## Ebene 3: Ethereum-Blockchain-Knoten {#ethereum-nodes}

Damit eine Anwendung mit der Ethereum-Blockchain interagieren kann, muss sie sich mit einem [Ethereum-Blockchain-Knoten](/developers/docs/nodes-and-clients/) verbinden. Die Verbindung zu einem Blockchain-Knoten ermöglicht es Ihnen, Blockchain-Daten zu lesen und/oder Transaktionen an das Netzwerk zu senden.

Ethereum-Blockchain-Knoten sind Computer, auf denen Software läuft – ein Ethereum-Client. Ein Client ist eine Implementierung von Ethereum, die alle Transaktionen in jedem Block verifiziert und so das Netzwerk sicher und die Daten korrekt hält. **Ethereum-Blockchain-Knoten sind die Ethereum-Blockchain**. Sie speichern gemeinsam den Zustand der Ethereum-Blockchain und erzielen einen Konsens über Transaktionen, um den Blockchain-Zustand zu ändern.

Indem Sie Ihre Anwendung mit einem Ethereum-Blockchain-Knoten verbinden (über die [JSON-RPC-API](/developers/docs/apis/json-rpc/)), kann Ihre Anwendung Daten aus der Blockchain lesen (wie z. B. Benutzerkontostände) sowie neue Transaktionen an das Netzwerk übertragen (wie z. B. die Überweisung von ETH zwischen Benutzerkonten oder die Ausführung von Funktionen von Smart Contracts).

## Ebene 4: Ethereum-Client-APIs {#ethereum-client-apis}

Viele Komfortbibliotheken (die von der Open-Source-Community von Ethereum entwickelt und gepflegt werden) ermöglichen es Ihren Anwendungen, sich mit der Ethereum-Blockchain zu verbinden und mit ihr zu kommunizieren.

Wenn Ihre benutzerorientierte Anwendung eine Web-App ist, können Sie sich dafür entscheiden, eine [JavaScript-API](/developers/docs/apis/javascript/) direkt in Ihrem Frontend über `npm install` zu installieren. Oder vielleicht entscheiden Sie sich dafür, diese Funktionalität serverseitig mit einer [Python-](/developers/docs/programming-languages/python/) oder [Java-API](/developers/docs/programming-languages/java/) zu implementieren.

Obwohl diese APIs kein notwendiger Teil des Stacks sind, abstrahieren sie einen Großteil der Komplexität der direkten Interaktion mit einem Ethereum-Blockchain-Knoten. Sie bieten auch Hilfsfunktionen (z. B. die Umrechnung von ETH in Gwei), sodass Sie als Entwickler weniger Zeit mit den Feinheiten von Ethereum-Clients verbringen und sich mehr auf die spezifische Funktionalität Ihrer Anwendung konzentrieren können.

## Ebene 5: Endbenutzeranwendungen {#end-user-applications}

Auf der obersten Ebene des Stacks befinden sich benutzerorientierte Anwendungen. Dies sind die Standardanwendungen, die Sie heute regelmäßig nutzen und entwickeln: in erster Linie Web- und mobile Apps.

Die Art und Weise, wie Sie diese Benutzeroberflächen entwickeln, bleibt im Wesentlichen unverändert. Oft müssen Benutzer nicht wissen, dass die von ihnen verwendete Anwendung mithilfe einer Blockchain erstellt wurde.

## Bereit, Ihren Stack auszuwählen? {#ready-to-choose-your-stack}

Sehen Sie sich unseren Leitfaden zur [Einrichtung einer lokalen Entwicklungsumgebung](/developers/local-environment/) für Ihre Ethereum-Anwendung an.

## Weiterführende Literatur {#further-reading}

- [Die Architektur einer Web 3.0-Anwendung](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_