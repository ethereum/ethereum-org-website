---
title: "Sicherheits-Checkliste für Smart Contracts"
description: Ein empfohlener Workflow zum Schreiben sicherer Smart Contracts
author: "Trailofbits"
tags: ["Smart Contracts", "Sicherheit", "Solidity"]
skill: intermediate
breadcrumb: Sicherheits-Checkliste
lang: de
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Checkliste für die Entwicklung von Smart Contracts {#smart-contract-development-checklist}

Hier ist ein allgemeiner Prozess, den wir empfehlen, während Sie Ihre Smart Contracts schreiben.

Prüfen Sie auf bekannte Sicherheitsprobleme:

- Überprüfen Sie Ihre Verträge mit [Slither](https://github.com/crytic/slither). Es verfügt über mehr als 100 integrierte Detektoren für häufige Schwachstellen. Führen Sie es bei jedem Check-in mit neuem Code aus und stellen Sie sicher, dass es einen sauberen Bericht liefert (oder verwenden Sie den Triage-Modus, um bestimmte Probleme stummzuschalten).
- Führen Sie Slither in der CI aus, zum Beispiel mit [slither-action](https://github.com/crytic/slither-action) auf GitHub, damit Sicherheitsprobleme in Pull Requests auftauchen.

Berücksichtigen Sie besondere Merkmale Ihres Vertrags:

- Sind Ihre Verträge aktualisierbar? Überprüfen Sie Ihren Code für die Aktualisierbarkeit auf Fehler mit [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks). Wir haben 17 Wege dokumentiert, wie Upgrades schiefgehen können.
- Geben Ihre Verträge vor, ERCs zu entsprechen? Überprüfen Sie sie mit [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Dieses Tool erkennt sofort Abweichungen von sechs gängigen Spezifikationen.
- Integrieren Sie Token von Drittanbietern? Lesen Sie unsere [Checkliste zur Token-Integration](/developers/tutorials/token-integration-checklist/), bevor Sie sich auf externe Verträge verlassen.

Überprüfen Sie kritische Sicherheitsmerkmale Ihres Codes visuell:

- Überprüfen Sie den [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph)-Drucker von Slither. Vermeiden Sie unbeabsichtigtes Shadowing und Probleme mit der C3-Linearisierung.
- Überprüfen Sie den [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary)-Drucker von Slither. Er meldet die Sichtbarkeit von Funktionen und Zugriffskontrollen.
- Überprüfen Sie den [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization)-Drucker von Slither. Er meldet Zugriffskontrollen für Zustandsvariablen.

Dokumentieren Sie kritische Sicherheitseigenschaften und verwenden Sie automatisierte Testgeneratoren, um diese zu bewerten:

- Lernen Sie, [Sicherheitseigenschaften für Ihren Code zu dokumentieren](/developers/tutorials/guide-to-smart-contract-security-tools/). Es ist anfangs schwierig, aber es ist die wichtigste Aktivität, um ein gutes Ergebnis zu erzielen. Es ist auch eine Voraussetzung für die Verwendung der fortgeschrittenen Techniken in diesem Tutorial.
- Definieren Sie Sicherheitseigenschaften in Solidity zur Verwendung mit Fuzzern wie [Echidna](https://github.com/crytic/echidna) und [Medusa](https://github.com/crytic/medusa) sowie mit Tools zur symbolischen Ausführung wie [hevm](https://hevm.dev/). Konzentrieren Sie sich auf Ihre Zustandsmaschine, Zugriffskontrollen, arithmetische Operationen, externe Interaktionen und die Einhaltung von Standards.
- Definieren Sie Sicherheitseigenschaften mit der [Python-API von Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Konzentrieren Sie sich auf Vererbung, Variablenabhängigkeiten, Zugriffskontrollen und andere strukturelle Probleme.
- Führen Sie Ihre Eigenschaftstests bei jedem Commit in der CI (zum Beispiel GitHub Actions) aus, damit jeder in Ihrem Team leicht sehen kann, dass sie erfolgreich sind. Fehlschlagende Tests können Merges blockieren.

Achten Sie schließlich auf Probleme, die automatisierte Tools nicht leicht finden können:

- Mangelnde Privatsphäre: Alle anderen können Ihre Transaktionen sehen, während sie im Pool in der Warteschlange stehen
- Front-Running von Transaktionen
- Kryptografische Operationen
- Riskante Interaktionen mit externen Komponenten der Dezentralisierten Finanzen (DeFi)

## Bitten Sie um Hilfe {#ask-for-help}

Die [Ethereum-Sprechstunden](https://meetings.hubspot.com/trailofbits/office-hours) finden jeden Dienstagnachmittag statt. Diese einstündigen 1-zu-1-Sitzungen bieten die Gelegenheit, uns alle Fragen zum Thema Sicherheit zu stellen, Fehlerbehebungen mit unseren Tools durchzuführen und Feedback von Experten zu Ihrem aktuellen Ansatz zu erhalten. Wir helfen Ihnen dabei, diesen Leitfaden durchzuarbeiten.

Treten Sie unserem Slack bei: [Empire Hacking](https://slack.empirehacking.nyc/). Wir sind bei Fragen jederzeit in den Kanälen #crytic und #ethereum erreichbar.
