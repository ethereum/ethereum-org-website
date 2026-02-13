---
title: "Ein Leitfaden für Smart-Contract-Sicherheitstools"
description: "Ein Überblick über drei verschiedene Test- und Programmanalysetechniken"
author: "Trailofbits"
lang: de
tags: [ "solidity", "intelligente Verträge", "Sicherheit" ]
skill: intermediate
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Wir werden drei verschiedene Test- und Programmanalysetechniken verwenden:

- **Statische Analyse mit [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Alle Pfade des Programms werden gleichzeitig durch verschiedene Programmdarstellungen (z. B. Kontrollflussgraph) angenähert und analysiert.
- **Fuzzing mit [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Der Code wird mit einer pseudozufälligen Generierung von Transaktionen ausgeführt. Der Fuzzer versucht, eine Folge von Transaktionen zu finden, die eine bestimmte Eigenschaft verletzen.
- **Symbolische Ausführung mit [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Eine formale Verifikationstechnik, die jeden Ausführungspfad in eine mathematische Formel übersetzt, anhand derer Einschränkungen überprüft werden können.

Jede Technik hat ihre Vor- und Nachteile und ist in [bestimmten Fällen](#determining-security-properties) nützlich:

| Technik                | Werkzeug  | Verwendung                                           | Geschwindigkeit | Übersehene Fehler | Fehlalarme |
| ---------------------- | --------- | ---------------------------------------------------- | --------------- | ----------------- | ---------- |
| Statische Analyse      | Slither   | CLI & Skripte                    | Sekunden        | moderat           | gering     |
| Fuzzing                | Echidna   | Solidity-Eigenschaften                               | Minuten         | gering            | keine      |
| Symbolische Ausführung | Manticore | Solidity-Eigenschaften & Skripte | Stunden         | keine\*           | keine      |

- wenn alle Pfade ohne Zeitüberschreitung untersucht werden

**Slither** analysiert Verträge innerhalb von Sekunden, allerdings kann eine statische Analyse zu Fehlalarmen führen und ist für komplexe Prüfungen (z. B. arithmetische Prüfungen) weniger geeignet. Führe Slither über die API aus, um per Knopfdruck auf integrierte Detektoren zuzugreifen, oder über die API für benutzerdefinierte Prüfungen.

**Echidna** muss einige Minuten lang laufen und erzeugt nur echte Positiv-Ergebnisse. Echidna überprüft vom Benutzer bereitgestellte Sicherheitseigenschaften, die in Solidity geschrieben sind. Es können Fehler übersehen werden, da es auf einer zufälligen Untersuchung basiert.

**Manticore** führt die "tiefgreifendste" Analyse durch. Wie Echidna verifiziert auch Manticore vom Benutzer bereitgestellte Eigenschaften. Die Ausführung dauert länger, aber es kann die Gültigkeit einer Eigenschaft beweisen und meldet keine Fehlalarme.

## Empfohlener Arbeitsablauf {#suggested-workflow}

Beginne mit den integrierten Detektoren von Slither, um sicherzustellen, dass jetzt und in Zukunft keine einfachen Fehler vorhanden sind. Verwende Slither, um Eigenschaften im Zusammenhang mit Vererbung, Variablenabhängigkeiten und strukturellen Problemen zu überprüfen. Wenn die Codebasis wächst, verwende Echidna, um komplexere Eigenschaften des Zustandsautomaten zu testen. Greife erneut auf Slither zurück, um benutzerdefinierte Prüfungen für Schutzmaßnahmen zu entwickeln, die in Solidity nicht verfügbar sind, wie z. B. den Schutz vor dem Überschreiben einer Funktion. Verwende schließlich Manticore, um eine gezielte Überprüfung kritischer Sicherheitseigenschaften durchzuführen, z. B. arithmetische Operationen.

- Verwende die CLI von Slither, um häufige Probleme zu finden.
- Verwende Echidna, um übergeordnete Sicherheitseigenschaften deines Vertrags zu testen.
- Verwende Slither, um benutzerdefinierte statische Prüfungen zu schreiben.
- Verwende Manticore, wenn du eine tiefgehende Absicherung kritischer Sicherheitseigenschaften wünschst.

**Ein Hinweis zu Unit-Tests**. Unit-Tests sind notwendig, um qualitativ hochwertige Software zu erstellen. Diese Techniken sind jedoch nicht am besten geeignet, um Sicherheitslücken zu finden. Sie werden typischerweise verwendet, um das positive Verhalten von Code zu testen (d. h. der Code funktioniert im normalen Kontext wie erwartet), während Sicherheitslücken eher in Grenzfällen auftreten, die die Entwickler nicht bedacht haben. In unserer Untersuchung von Dutzenden von Smart-Contract-Sicherheitsüberprüfungen hatte die [Unit-Test-Abdeckung keine Auswirkung auf die Anzahl oder den Schweregrad der Sicherheitslücken](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/), die wir im Code unserer Kunden fanden.

## Bestimmung von Sicherheitseigenschaften {#determining-security-properties}

Um deinen Code effektiv zu testen und zu verifizieren, musst du die Bereiche identifizieren, die Aufmerksamkeit erfordern. Da deine für die Sicherheit aufgewendeten Ressourcen begrenzt sind, ist es wichtig, die schwachen oder hochwertigen Teile deiner Codebasis zu bestimmen, um deinen Aufwand zu optimieren. Bedrohungsmodellierung kann dabei helfen. Ziehe Folgendes in Betracht:

- [Rapid Risk Assessments](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (unser bevorzugter Ansatz bei Zeitmangel)
- [Guide to Data-Centric System Threat Modeling](https://csrc.nist.gov/pubs/sp/800/154/ipd) (alias NIST 800-154)
- [Shostack Threat Modeling](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Verwendung von Assertions](https://blog.regehr.org/archives/1091)

### Komponenten {#components}

Wenn du weißt, was du überprüfen willst, hilft dir das auch bei der Auswahl des richtigen Tools.

Die allgemeinen Bereiche, die für Smart Contracts häufig relevant sind, umfassen:

- **Zustandsautomat.** Die meisten Verträge lassen sich als Zustandsautomat darstellen. Überlege zu prüfen, ob (1) kein ungültiger Zustand erreicht werden kann, (2) ein gültiger Zustand erreicht werden kann und (3) kein Zustand den Vertrag blockiert.

  - Echidna und Manticore sind die zu bevorzugenden Tools, um die Spezifikationen von Zustandsautomaten zu testen.

- **Zugriffskontrollen.** Wenn dein System privilegierte Benutzer hat (z. B. einen Eigentümer, Controller, ...) musst du sicherstellen, dass (1) jeder Benutzer nur die autorisierten Aktionen durchführen kann und (2) kein Benutzer Aktionen eines privilegierteren Benutzers blockieren kann.

  - Slither, Echidna und Manticore können korrekte Zugriffskontrollen überprüfen. Slither kann zum Beispiel überprüfen, dass nur bei Funktionen auf der Whitelist der onlyOwner-Modifikator fehlt. Echidna und Manticore sind für komplexere Zugriffskontrollen nützlich, z. B. für eine Berechtigung, die nur erteilt wird, wenn der Vertrag einen bestimmten Zustand erreicht.

- **Arithmetische Operationen.** Die Überprüfung der Korrektheit der arithmetischen Operationen ist entscheidend. Die durchgängige Verwendung von `SafeMath` ist ein guter Schritt, um Über- und Unterläufe zu verhindern. Dennoch musst du andere arithmetische Fehler berücksichtigen, einschließlich Rundungsfehler und Fehler, die den Vertrag blockieren.

  - Manticore ist hier die beste Wahl. Echidna kann verwendet werden, wenn die Arithmetik außerhalb des Bereichs des SMT-Solvers liegt.

- **Korrektheit der Vererbung.** Solidity-Verträge stützen sich stark auf Mehrfachvererbung. Fehler wie eine überschattende Funktion, bei der ein `super`-Aufruf fehlt, und eine falsch interpretierte c3-Linearisierungsreihenfolge können leicht entstehen.

  - Slither ist das Tool, um die Erkennung dieser Probleme sicherzustellen.

- **Externe Interaktionen.** Verträge interagieren miteinander, und einigen externen Verträgen sollte man nicht vertrauen. Wenn dein Vertrag zum Beispiel von externen Orakeln abhängt, bleibt er dann sicher, wenn die Hälfte der verfügbaren Orakel kompromittiert ist?

  - Manticore und Echidna sind die beste Wahl, um externe Interaktionen mit deinen Verträgen zu testen. Manticore verfügt über einen eingebauten Mechanismus, um externe Verträge zu stubben.

- **Standardkonformität.** Ethereum-Standards (z. B. ERC20) weisen in ihrer Entwurfsgeschichte immer wieder Fehler auf. Sei dir der Einschränkungen des Standards bewusst, auf dem du aufbaust.
  - Slither, Echidna und Manticore helfen dir dabei, Abweichungen von einem bestimmten Standard zu erkennen.

### Spickzettel zur Werkzeugauswahl {#tool-selection-cheatsheet}

| Komponente                | Tools                       | Beispiele                                                                                                                                                                                                                                                               |
| ------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zustandsautomat           | Echidna, Manticore          |                                                                                                                                                                                                                                                                         |
| Zugriffskontrolle         | Slither, Echidna, Manticore | [Slither-Übung 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Echidna-Übung 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Arithmetische Operationen | Manticore, Echidna          | [Echidna-Übung 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Manticore-Übungen 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)    |
| Korrektheit der Vererbung | Slither                     | [Slither-Übung 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                      |
| Externe Interaktionen     | Manticore, Echidna          |                                                                                                                                                                                                                                                                         |
| Standardkonformität       | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                                 |

Je nach deinen Zielen müssen auch andere Bereiche überprüft werden, aber diese grob umrissenen Schwerpunktbereiche sind ein guter Anfang für jedes Smart-Contract-System.

Unsere öffentlichen Audits enthalten Beispiele für verifizierte oder getestete Eigenschaften. Lies die Abschnitte `Automated Testing and Verification` der folgenden Berichte, um dir Sicherheitseigenschaften aus der Praxis anzusehen:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
