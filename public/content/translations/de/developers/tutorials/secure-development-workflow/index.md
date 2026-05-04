---
title: "Checkliste für die Sicherheit von Smart Contracts"
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

- Überprüfen Sie Ihre Verträge mit [Slither](https://github.com/crytic/slither). Es verfügt über mehr als 40 integrierte Detektoren für häufige Schwachstellen. Führen Sie es bei jedem Check-in mit neuem Code aus und stellen Sie sicher, dass es einen sauberen Bericht erhält (oder verwenden Sie den Triage-Modus, um bestimmte Probleme stummzuschalten).
- Überprüfen Sie Ihre Verträge mit [Crytic](https://crytic.io/). Es prüft auf 50 Probleme, die Slither nicht erkennt. Crytic kann Ihrem Team auch dabei helfen, den Überblick zu behalten, indem es Sicherheitsprobleme in Pull Requests auf GitHub leicht sichtbar macht.

Berücksichtigen Sie besondere Merkmale Ihres Vertrags:

- Sind Ihre Verträge aktualisierbar? Überprüfen Sie Ihren Code für die Aktualisierbarkeit auf Fehler mit [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) oder [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Wir haben 17 Wege dokumentiert, wie Upgrades schiefgehen können.
- Geben Ihre Verträge vor, den ERCs zu entsprechen? Überprüfen Sie sie mit [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Dieses Tool erkennt sofort Abweichungen von sechs gängigen Spezifikationen.
- Integrieren Sie Token von Drittanbietern? Lesen Sie unsere [Checkliste zur Token-Integration](/developers/tutorials/token-integration-checklist/), bevor Sie sich auf externe Verträge verlassen.

Überprüfen Sie kritische Sicherheitsmerkmale Ihres Codes visuell:

- Überprüfen Sie den [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph)-Drucker von Slither. Vermeiden Sie unbeabsichtigtes Shadowing und Probleme mit der C3-Linearisierung.
- Überprüfen Sie den [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary)-Drucker von Slither. Er meldet die Sichtbarkeit von Funktionen und Zugriffskontrollen.
- Überprüfen Sie den [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization)-Drucker von Slither. Er meldet Zugriffskontrollen für Zustandsvariablen.

Dokumentieren Sie kritische Sicherheitseigenschaften und verwenden Sie automatisierte Testgeneratoren, um diese zu bewerten:

- Lernen Sie, [Sicherheitseigenschaften für Ihren Code zu dokumentieren](/developers/tutorials/guide-to-smart-contract-security-tools/). Es ist anfangs schwierig, aber es ist die wichtigste Aktivität, um ein gutes Ergebnis zu erzielen. Es ist auch eine Voraussetzung für die Verwendung der fortgeschrittenen Techniken in diesem Tutorial.
- Definieren Sie Sicherheitseigenschaften in Solidity zur Verwendung mit [Echidna](https://github.com/crytic/echidna) und [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Konzentrieren Sie sich auf Ihre Zustandsmaschine, Zugriffskontrollen, arithmetische Operationen, externe Interaktionen und die Einhaltung von Standards.
- Definieren Sie Sicherheitseigenschaften mit der [Python-API von Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Konzentrieren Sie sich auf Vererbung, Variablenabhängigkeiten, Zugriffskontrollen und andere strukturelle Probleme.
- Führen Sie Ihre Eigenschaftstests bei jedem Commit mit [Crytic](https://crytic.io) aus. Crytic kann Sicherheitseigenschaftstests verarbeiten und auswerten, sodass jeder in Ihrem Team auf GitHub leicht sehen kann, dass sie bestanden wurden. Fehlgeschlagene Tests können Commits blockieren.

Achten Sie schließlich auf Probleme, die automatisierte Tools nicht leicht finden können:

- Mangelnde Privatsphäre: Alle anderen können Ihre Transaktionen sehen, während sie im Pool in der Warteschlange stehen
- Front-Running-Transaktionen
- Kryptografische Operationen
- Riskante Interaktionen mit externen DeFi-Komponenten

## Bitten Sie um Hilfe {#ask-for-help}

Die [Ethereum-Sprechstunden](https://calendly.com/dan-trailofbits/office-hours) finden jeden Dienstagnachmittag statt. Diese einstündigen 1-zu-1-Sitzungen bieten die Gelegenheit, uns alle Fragen zum Thema Sicherheit zu stellen, Fehler mit unseren Tools zu beheben und Feedback von Experten zu Ihrem aktuellen Ansatz zu erhalten. Wir helfen Ihnen bei der Durcharbeitung dieses Leitfadens.

Treten Sie unserem Slack bei: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Wir sind bei Fragen jederzeit in den Kanälen #crytic und #ethereum erreichbar.