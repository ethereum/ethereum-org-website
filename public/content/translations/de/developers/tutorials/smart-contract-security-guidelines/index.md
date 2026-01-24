---
title: Smart-Contract-Sicherheitsrichtlinien
description: "Eine Checkliste der Sicherheitsrichtlinien, die beim Erstellen Ihrer dapp berücksichtigt werden sollen"
author: "Spuren von bits"
tags: [ "solidity", "Smart Contracts", "Sicherheit" ]
skill: intermediate
lang: de
published: 06.09.2020
source: "Aufbau sicherer Verträge"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Befolgen Sie diese High-Level Empfehlungen, um sicherere Smart Contracts zu schreiben.

## Design-Richtlinien {#design-guidelines}

Bevor Code geschrieben wird, sollte die Gestaltung des Smart Contracts sollte diskutiert werden.

### Dokumentation und Spezifikationen {#documentation-and-specifications}

Dokumentationen können auf verschiedenen Ebenen geschrieben werden und sollten bei der Umsetzung von Contracts aktualisiert werden:

- **Eine einfache englische Beschreibung des Systems**, die beschreibt, was die Verträge tun und welche Annahmen bezüglich der Codebasis getroffen werden.
- **Schema- und Architekturdiagramme**, einschließlich der Vertragsinteraktionen und der Zustandsmaschine des Systems. [Slither-Printers](https://github.com/crytic/slither/wiki/Printer-documentation) können helfen, diese Schemata zu generieren.
- **Eine gründliche Code-Dokumentation**, für die in Solidity das [Natspec-Format](https://docs.soliditylang.org/en/develop/natspec-format.html) verwendet werden kann.

### On-Chain- vs. Off-Chain-Berechnungen {#onchain-vs-offchain-computation}

- **Halten Sie so viel Code wie möglich Off-Chain.** Halten Sie die On-Chain-Ebene klein. Verarbeiten Sie Daten mit Code Off-Chain so vor, dass die Verifizierung On-Chain einfach ist. Brauchst du eine sortierte Liste? Sortieren Sie die Liste off-chain, um anschließend nur noch nie Reihenfolge on-chain zu überprüfen.

### Upgrade-Fähigkeit {#upgradeability}

Wir haben die verschiedenen Lösungen zur Upgrade-Fähigkeit in [unserem Blogbeitrag](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) diskutiert. Entscheiden Sie sich bewusst für oder gegen die Erweiterbarkeit Ihres Codes. Diese Entscheidung wird beeinflussen, wie Sie Ihren Code strukturieren. Generell empfehlen wir:

- **Bevorzugen Sie die [Vertragsmigration](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) gegenüber der Upgrade-Fähigkeit.** Migrationssysteme haben viele der gleichen Vorteile wie upgrade-fähige Systeme, aber nicht deren Nachteile.
- **Verwenden Sie das Datentrennungsmuster anstelle des delegatecallproxy-Musters.** Wenn Ihr Projekt eine klare Trennung der Abstraktionsebenen aufweist, erfordert die Upgrade-Fähigkeit mittels Datentrennung nur wenige Anpassungen. Das delegatecallproxy Muster ist sehr fehleranfällig, da EVM Expertise gefragt ist.
- **Dokumentieren Sie das Migrations-/Upgrade-Verfahren vor dem Deployment.** Wenn Sie unter Stress ohne Richtlinien reagieren müssen, machen Sie Fehler. Schreiben Sie die Aktualisierungsrichtlinien also rechtzeitig. Es sollte berücksichtig werden:
  - Aufrufe welche die neuen Smart Contracts initialisieren
  - Speicherort der Schlüssel und wie auf sie zugegriffen werden kann
  - Wie die Bereitstellung überprüft werden kann! Entwickeln und testen Sie ein Post-Bereitstellungs-Skript.

## Implementierungsrichtlinien {#implementation-guidelines}

**Streben Sie nach Einfachheit.** Verwenden Sie immer die einfachste Lösung, die Ihren Zweck erfüllt. Jedes Mitglied Ihres Teams sollte Ihre Lösung verstehen können.

### Funktionskomposition {#function-composition}

Die Architektur Ihrer Codebasis sollte eine einfache Überprüfung Ihres Codes ermöglichen. Vermeiden Sie Architekturentscheidungen, die es erschweren, die Korrektheit nachzuvollziehen.

- **Teilen Sie die Logik Ihres Systems auf**, entweder durch mehrere Verträge oder durch die Gruppierung ähnlicher Funktionen (z. B. Authentifizierung, Arithmetik, ...).
- **Schreiben Sie kleine Funktionen mit einem klaren Zweck.** Dies erleichtert die Überprüfung und ermöglicht das Testen einzelner Komponenten.

### Vererbung {#inheritance}

- **Halten Sie die Vererbung überschaubar.** Vererbung sollte zur Aufteilung der Logik verwendet werden, Ihr Projekt sollte jedoch darauf abzielen, die Tiefe und Breite des Vererbungsbaums zu minimieren.
- **Verwenden Sie den [Vererbungs-Printer von Slither](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph), um die Vertragshierarchie zu überprüfen.** Der Vererbungs-Printer hilft Ihnen bei der Überprüfung der Größe der Hierarchie.

### Ereignisse {#events}

- **Protokollieren Sie alle wichtigen Vorgänge.** Ereignisse (Events) helfen, den Vertrag während der Entwicklung zu debuggen und ihn nach der Bereitstellung zu überwachen.

### Bekannte Fallstricke vermeiden {#avoid-known-pitfalls}

- **Seien Sie sich der häufigsten Sicherheitsprobleme bewusst.** Es gibt viele Online-Ressourcen, um sich über häufige Probleme zu informieren, wie z. B. [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) oder [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Beachten Sie die Warnhinweise in der [Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/).** Die Warnhinweise informieren Sie über nicht offensichtliches Verhalten der Sprache.

### Abhängigkeiten {#dependencies}

- **Verwenden Sie gut getestete Bibliotheken.** Das Importieren von Code aus gut getesteten Bibliotheken verringert die Wahrscheinlichkeit, dass Sie fehlerhaften Code schreiben. Wenn Sie einen ERC20-Vertrag schreiben möchten, verwenden Sie [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Verwenden Sie einen Abhängigkeitsmanager; vermeiden Sie das Kopieren und Einfügen von Code.** Wenn Sie sich auf eine externe Quelle verlassen, müssen Sie diese mit der Originalquelle auf dem neuesten Stand halten.

### Testen und Verifizierung {#testing-and-verification}

- **Schreiben Sie gründliche Unit-Tests.** Eine umfangreiche Test-Suite ist entscheidend für die Entwicklung hochwertiger Software.
- **Schreiben Sie benutzerdefinierte Prüfungen und Eigenschaften für [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) und [Manticore](https://github.com/trailofbits/manticore).** Automatisierte Tools helfen sicherzustellen, dass Ihr Vertrag sicher ist. Lesen Sie den Rest dieses Leitfadens, um zu erfahren, wie Sie effiziente Prüfungen und Eigenschaften schreiben.
- **Verwenden Sie [crytic.io](https://crytic.io/).** Crytic lässt sich in GitHub integrieren, bietet Zugriff auf private Slither-Detektoren und führt benutzerdefinierte Eigenschaftsprüfungen von Echidna aus.

### Solidity {#solidity}

- **Bevorzugen Sie Solidity 0.5 gegenüber 0.4 und 0.6.** Unserer Meinung nach ist Solidity 0.5 sicherer und verfügt über bessere integrierte Praktiken als 0.4. Solidity 0.6 hat sich für den Produktionseinsatz als zu instabil erwiesen und benötigt Zeit zur Reifung.
- **Verwenden Sie eine stabile Version zum Kompilieren; verwenden Sie die neueste Version zur Überprüfung auf Warnungen.** Stellen Sie sicher, dass Ihr Code keine gemeldeten Probleme mit der neuesten Compiler-Version aufweist. Allerdings hat Solidity einen schnellen Release-Zyklus und eine Vorgeschichte von Compiler-Bugs, daher empfehlen wir nicht die neueste Version für das Deployment (siehe Slithers [solc-Versionsempfehlung](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)).
- **Verwenden Sie kein Inline-Assembly.** Assembly erfordert EVM-Fachwissen. Schreiben Sie keinen EVM-Code, wenn Sie das Yellow Paper nicht _gemeistert_ haben.

## Deployment-Richtlinien {#deployment-guidelines}

Nach Entwicklung und Bereitstellung eines Smart Contracts:

- **Überwachen Sie Ihre Verträge.** Beobachten Sie die Protokolle und seien Sie bereit, im Falle einer Kompromittierung des Vertrags oder der Wallet zu reagieren.
- **Fügen Sie Ihre Kontaktinformationen zu [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) hinzu.** Diese Liste hilft Dritten, Sie zu kontaktieren, wenn eine Sicherheitslücke entdeckt wird.
- **Sichern Sie die Wallets von privilegierten Benutzern.** Befolgen Sie unsere [Best Practices](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/), wenn Sie Schlüssel in Hardware-Wallets speichern.
- **Haben Sie einen Plan für die Reaktion auf Vorfälle.** Bedenken Sie, dass Ihre Smart Contracts kompromittiert werden können. Selbst wenn Ihre Verträge fehlerfrei sind, kann ein Angreifer die Kontrolle über die Schlüssel des Vertragsinhabers übernehmen.
