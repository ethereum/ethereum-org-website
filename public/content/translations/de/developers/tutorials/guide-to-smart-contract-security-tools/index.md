---
title: "Ein Leitfaden für Smart-Contract-Sicherheitstools"
description: "Ein Überblick über drei verschiedene Test- und Programmanalysetechniken"
author: "Trailofbits"
lang: de
tags: ["Solidity", "Smart Contracts", "Sicherheit"]
skill: intermediate
breadcrumb: Sicherheitstools
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Wir werden drei verschiedene Test- und Programmanalysetechniken verwenden:

- **Statische Analyse mit [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Alle Pfade des Programms werden angenähert und gleichzeitig durch verschiedene Programmdarstellungen (z. B. Kontrollflussgraph) analysiert.
- **Fuzzing mit [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Der Code wird mit einer pseudozufälligen Generierung von Transaktionen ausgeführt. Der Fuzzer wird versuchen, eine Sequenz von Transaktionen zu finden, die eine bestimmte Eigenschaft verletzt.
- **Symbolische Ausführung mit [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Eine formale Verifizierungstechnik, die jeden Ausführungspfad in eine mathematische Formel übersetzt, auf deren Grundlage Einschränkungen überprüft werden können.

Jede Technik hat Vorteile und Tücken und ist in [bestimmten Fällen](#determining-security-properties) nützlich:

| Technik | Tool | Nutzung | Geschwindigkeit | Übersehene Fehler | Falscher Alarm |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| Statische Analyse | Slither | CLI & Skripte | Sekunden | moderat | niedrig |
| Fuzzing | Echidna | Solidity-Eigenschaften | Minuten | niedrig | keine |
| Symbolische Ausführung | Manticore | Solidity-Eigenschaften & Skripte | Stunden | keine\* | keine |

\* wenn alle Pfade ohne Zeitüberschreitung erkundet werden

**Slither** analysiert Verträge innerhalb von Sekunden, jedoch kann die statische Analyse zu falschem Alarm führen und ist für komplexe Überprüfungen (z. B. arithmetische Prüfungen) weniger geeignet. Führen Sie Slither über die API aus, um per Knopfdruck auf integrierte Detektoren zuzugreifen, oder über die API für benutzerdefinierte Überprüfungen.

**Echidna** muss mehrere Minuten lang ausgeführt werden und erzeugt nur echte Treffer. Echidna überprüft vom Benutzer bereitgestellte Sicherheitseigenschaften, die in Solidity geschrieben sind. Es könnte Fehler übersehen, da es auf zufälliger Erkundung basiert.

**Manticore** führt die „schwerwiegendste“ Analyse durch. Wie Echidna verifiziert Manticore vom Benutzer bereitgestellte Eigenschaften. Es benötigt mehr Zeit für die Ausführung, kann aber die Gültigkeit einer Eigenschaft beweisen und meldet keinen falschen Alarm.

## Empfohlener Workflow {#suggested-workflow}

Beginnen Sie mit den integrierten Detektoren von Slither, um sicherzustellen, dass keine einfachen Fehler vorhanden sind oder später eingeführt werden. Verwenden Sie Slither, um Eigenschaften im Zusammenhang mit Vererbung, Variablenabhängigkeiten und strukturellen Problemen zu überprüfen. Wenn die Codebasis wächst, verwenden Sie Echidna, um komplexere Eigenschaften des Zustandsautomaten zu testen. Kehren Sie zu Slither zurück, um benutzerdefinierte Überprüfungen für Schutzmaßnahmen zu entwickeln, die in Solidity nicht verfügbar sind, wie z. B. den Schutz vor dem Überschreiben einer Funktion. Verwenden Sie schließlich Manticore, um eine gezielte Verifizierung kritischer Sicherheitseigenschaften durchzuführen, z. B. arithmetische Operationen.

- Verwenden Sie die CLI von Slither, um häufige Probleme zu erfassen
- Verwenden Sie Echidna, um übergeordnete Sicherheitseigenschaften Ihres Vertrags zu testen
- Verwenden Sie Slither, um benutzerdefinierte statische Überprüfungen zu schreiben
- Verwenden Sie Manticore, sobald Sie eine tiefgehende Absicherung kritischer Sicherheitseigenschaften wünschen

**Ein Hinweis zu Unit-Tests**. Unit-Tests sind notwendig, um qualitativ hochwertige Software zu erstellen. Diese Techniken sind jedoch nicht am besten geeignet, um Sicherheitslücken zu finden. Sie werden typischerweise verwendet, um positive Verhaltensweisen von Code zu testen (d. h. der Code funktioniert im normalen Kontext wie erwartet), während Sicherheitslücken tendenziell in Randfällen liegen, die die Entwickler nicht berücksichtigt haben. In unserer Studie von Dutzenden von Smart-Contract-Sicherheitsüberprüfungen [hatte die Abdeckung durch Unit-Tests keine Auswirkungen auf die Anzahl oder den Schweregrad von Sicherheitslücken](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/), die wir im Code unserer Kunden gefunden haben.

## Bestimmung von Sicherheitseigenschaften {#determining-security-properties}

Um Ihren Code effektiv zu testen und zu verifizieren, müssen Sie die Bereiche identifizieren, die Aufmerksamkeit erfordern. Da Ihre für Sicherheit aufgewendeten Ressourcen begrenzt sind, ist es wichtig, die schwachen oder hochwertigen Teile Ihrer Codebasis einzugrenzen, um Ihren Aufwand zu optimieren. Bedrohungsmodellierung kann dabei helfen. Ziehen Sie in Betracht, Folgendes zu überprüfen:

- [Rapid Risk Assessments](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (unser bevorzugter Ansatz, wenn die Zeit knapp ist)
- [Guide to Data-Centric System Threat Modeling](https://csrc.nist.gov/pubs/sp/800/154/ipd) (auch bekannt als NIST 800-154)
- [Shostack threat modeling](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Use of Assertions](https://blog.regehr.org/archives/1091)

### Komponenten {#components}

Zu wissen, was Sie überprüfen möchten, hilft Ihnen auch bei der Auswahl des richtigen Tools.

Zu den weitreichenden Bereichen, die für Smart Contracts häufig relevant sind, gehören:

- **Zustandsautomat.** Die meisten Verträge können als Zustandsautomat dargestellt werden. Überprüfen Sie, ob (1) kein ungültiger Zustand erreicht werden kann, (2) ein gültiger Zustand auch erreicht werden kann und (3) kein Zustand den Vertrag blockiert.

  - Echidna und Manticore sind die bevorzugten Tools zum Testen von Zustandsautomaten-Spezifikationen.

- **Zugriffskontrollen.** Wenn Ihr System über privilegierte Benutzer verfügt (z. B. einen Eigentümer, Controller ...), müssen Sie sicherstellen, dass (1) jeder Benutzer nur die autorisierten Aktionen ausführen kann und (2) kein Benutzer Aktionen eines privilegierteren Benutzers blockieren kann.

  - Slither, Echidna und Manticore können auf korrekte Zugriffskontrollen prüfen. Beispielsweise kann Slither überprüfen, ob nur bei auf der Whitelist stehenden Funktionen der `onlyOwner`-Modifikator fehlt. Echidna und Manticore sind nützlich für komplexere Zugriffskontrollen, wie z. B. eine Berechtigung, die nur erteilt wird, wenn der Vertrag einen bestimmten Zustand erreicht.

- **Arithmetische Operationen.** Die Überprüfung der Fehlerfreiheit der arithmetischen Operationen ist von entscheidender Bedeutung. Die durchgängige Verwendung von `SafeMath` ist ein guter Schritt, um Überlauf/Unterlauf zu verhindern. Sie müssen jedoch weiterhin andere arithmetische Fehler berücksichtigen, einschließlich Rundungsproblemen und Fehlern, die den Vertrag blockieren.

  - Manticore ist hier die beste Wahl. Echidna kann verwendet werden, wenn die Arithmetik außerhalb des Bereichs des SMT-Solvers liegt.

- **Korrektheit der Vererbung.** Solidity-Verträge stützen sich stark auf Mehrfachvererbung. Fehler wie eine Shadowing-Funktion, der ein `super`-Aufruf fehlt, und eine falsch interpretierte C3-Linearisierungsreihenfolge können leicht eingeführt werden.

  - Slither ist das Tool, um die Erkennung dieser Probleme sicherzustellen.

- **Externe Interaktionen.** Verträge interagieren miteinander, und einigen externen Verträgen sollte nicht vertraut werden. Wenn sich Ihr Vertrag beispielsweise auf externe Orakel verlässt, bleibt er dann sicher, wenn die Hälfte der verfügbaren Orakel kompromittiert ist?

  - Manticore und Echidna sind die beste Wahl zum Testen externer Interaktionen mit Ihren Verträgen. Manticore verfügt über einen integrierten Mechanismus zum Stubbing externer Verträge.

- **Standardkonformität.** Ethereum-Standards (z. B. ERC20) haben eine Geschichte von Fehlern in ihrem Design. Seien Sie sich der Einschränkungen des Standards bewusst, auf dem Sie aufbauen.
  - Slither, Echidna und Manticore helfen Ihnen, Abweichungen von einem bestimmten Standard zu erkennen.

### Spickzettel zur Tool-Auswahl {#tool-selection-cheatsheet}

| Komponente | Tools | Beispiele |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zustandsautomat | Echidna, Manticore |
| Zugriffskontrolle | Slither, Echidna, Manticore | [Slither-Übung 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Echidna-Übung 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Arithmetische Operationen | Manticore, Echidna | [Echidna-Übung 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Manticore-Übungen 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Korrektheit der Vererbung | Slither | [Slither-Übung 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| Externe Interaktionen | Manticore, Echidna |
| Standardkonformität | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

Andere Bereiche müssen je nach Ihren Zielen überprüft werden, aber diese groben Schwerpunktbereiche sind ein guter Start für jedes Smart-Contract-System.

Unsere öffentlichen Audits enthalten Beispiele für verifizierte oder getestete Eigenschaften. Ziehen Sie in Betracht, die Abschnitte `Automated Testing and Verification` der folgenden Berichte zu lesen, um reale Sicherheitseigenschaften zu überprüfen:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)