---
title: Smart-Contract-Sicherheitscheckliste
description: Ein empfohlener Workflow zum Schreiben sicherer Smart Contracts
author: "Trailofbits"
tags: ["smart contracts", "security", "solidity"]
skill: intermediate
lang: de
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Smart-Contract-Entwicklungscheckliste {#smart-contract-development-checklist}

Nachfolgend finden Sie einen allgemeinen Prozess, dessen Befolgung wir beim Schreiben Ihrer Smart Contracts empfehlen.

Auf bekannte Sicherheitsprobleme prüfen:

- Überprüfen Sie Ihre Verträge mit [Slither](https://github.com/crytic/slither). Es verfügt über mehr als 40 integrierte Detektoren für häufige Schwachstellen. Führen Sie es bei jedem Check-in mit neuem Code aus und stellen Sie sicher, dass Sie einen fehlerfreien Bericht erhalten (oder verwenden Sie den Triage-Modus, um bestimmte Probleme auszublenden).
- Überprüfen Sie Ihre Verträge mit [Crytic](https://crytic.io/). Es prüft auf 50 Probleme, die von Slither nicht geprüft werden. Crytic kann Ihrem Team auch dabei helfen, den Überblick zu behalten, indem es Sicherheitsprobleme in Pull-Requests auf GitHub leicht aufdeckt.

Berücksichtigen Sie die besonderen Merkmale Ihres Vertrags:

- Sind Ihre Verträge upgradefähig? Überprüfen Sie Ihren Upgradefähigkeits-Code auf Fehler mit [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) oder [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Wir haben 17 Möglichkeiten dokumentiert, wie Upgrades fehlschlagen können.
- Erheben Ihre Verträge den Anspruch, ERC-konform zu sein? Überprüfen Sie sie mit [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Dieses Tool erkennt sofort Abweichungen von sechs gängigen Spezifikationen.
- Integrieren Sie Token von Drittanbietern? Lesen Sie unsere [Checkliste für die Token-Integration](/developers/tutorials/token-integration-checklist/), bevor Sie sich auf externe Verträge verlassen.

Überprüfen Sie die kritischen Sicherheitsmerkmale Ihres Codes visuell:

- Überprüfen Sie den [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph)-Printer von Slither. Vermeiden Sie unbeabsichtigtes Shadowing und Probleme mit der C3-Linearisierung.
- Überprüfen Sie den [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary)-Printer von Slither. Er meldet die Sichtbarkeit von Funktionen und die Zugriffskontrollen.
- Überprüfen Sie den [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization)-Printer von Slither. Er meldet die Zugriffskontrollen für Zustandsvariablen.

Dokumentieren Sie kritische Sicherheitseigenschaften und verwenden Sie automatisierte Testgeneratoren, um sie zu bewerten:

- Lernen Sie, [wie Sie Sicherheitseigenschaften für Ihren Code dokumentieren](/developers/tutorials/guide-to-smart-contract-security-tools/). Anfangs ist es schwierig, aber es ist die wichtigste Tätigkeit, um ein gutes Ergebnis zu erzielen. Es ist auch eine Voraussetzung für die Anwendung der fortgeschrittenen Techniken in diesem Tutorial.
- Definieren Sie Sicherheitseigenschaften in Solidity, zur Verwendung mit [Echidna](https://github.com/crytic/echidna) und [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Konzentrieren Sie sich auf Ihre Statusmaschine, Zugriffskontrollen, arithmetische Operationen, externe Interaktionen und die Einhaltung von Standards.
- Definieren Sie Sicherheitseigenschaften mit der [Python-API von Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Konzentrieren Sie sich auf Vererbung, Variablenabhängigkeiten, Zugriffskontrollen und andere strukturelle Probleme.
- Führen Sie Ihre Eigenschaftstests bei jedem Commit mit [Crytic](https://crytic.io) aus. Crytic kann Tests von Sicherheitseigenschaften verarbeiten und auswerten, sodass jeder in Ihrem Team auf GitHub leicht sehen kann, dass sie erfolgreich sind. Fehlgeschlagene Tests können Commits blockieren.

Achten Sie schließlich auf Probleme, die automatisierte Werkzeuge nicht leicht finden können:

- Mangelnde Privatsphäre: Alle anderen können Ihre Transaktionen sehen, während sie sich im Pool in der Warteschlange befinden.
- Front-Running von Transaktionen
- Kryptografische Operationen
- Riskante Interaktionen mit externen DeFi-Komponenten

## Bitten Sie um Hilfe {#ask-for-help}

Die [Ethereum-Sprechstunden](https://calendly.com/dan-trailofbits/office-hours) finden jeden Dienstagnachmittag statt. Diese einstündigen Einzelsitzungen sind eine Gelegenheit, uns alle Ihre Fragen zur Sicherheit zu stellen, Probleme bei der Verwendung unserer Werkzeuge zu beheben und Feedback von Experten zu Ihrem aktuellen Ansatz zu erhalten. Wir helfen Ihnen, diesen Leitfaden durchzuarbeiten.

Treten Sie unserem Slack bei: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Wir sind immer in den Kanälen #crytic und #ethereum erreichbar, wenn Sie Fragen haben.
