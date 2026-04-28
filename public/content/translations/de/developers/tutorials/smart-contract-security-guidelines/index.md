---
title: "Sicherheitsrichtlinien für Smart Contracts"
description: Eine Checkliste mit Sicherheitsrichtlinien, die Sie bei der Entwicklung Ihrer Dapp beachten sollten
author: "Trailofbits"
tags: ["Solidity", "Smart Contracts", "Sicherheit"]
skill: intermediate
breadcrumb: Sicherheitsrichtlinien
lang: de
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Befolgen Sie diese allgemeinen Empfehlungen, um sicherere Smart Contracts zu erstellen.

## Design-Richtlinien {#design-guidelines}

Das Design des Vertrags sollte im Voraus besprochen werden, bevor auch nur eine einzige Zeile Code geschrieben wird.

### Dokumentation und Spezifikationen {#documentation-and-specifications}

Die Dokumentation kann auf verschiedenen Ebenen verfasst werden und sollte während der Implementierung der Verträge aktualisiert werden:

- **Eine einfache Beschreibung des Systems**, die erklärt, was die Verträge tun, sowie alle Annahmen zur Codebasis.
- **Schema- und Architekturdiagramme**, einschließlich der Vertragsinteraktionen und des Zustandsautomaten des Systems. [Slither-Drucker (Printers)](https://github.com/crytic/slither/wiki/Printer-documentation) können bei der Erstellung dieser Schemata helfen.
- **Gründliche Code-Dokumentation**, für Solidity kann das [Natspec-Format](https://docs.soliditylang.org/en/develop/natspec-format.html) verwendet werden.

### Berechnung auf der Blockchain vs. Off-Chain-Berechnung {#onchain-vs-offchain-computation}

- **Halten Sie so viel Code wie möglich Off-Chain.** Halten Sie die Ebene auf der Blockchain klein. Verarbeiten Sie Daten mit Code Off-Chain so vor, dass die Überprüfung auf der Blockchain einfach ist. Benötigen Sie eine geordnete Liste? Sortieren Sie die Liste Off-Chain und überprüfen Sie dann nur ihre Reihenfolge auf der Blockchain.

### Aktualisierbarkeit (Upgradeability) {#upgradeability}

Wir haben die verschiedenen Lösungen zur Aktualisierbarkeit in [unserem Blogbeitrag](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) besprochen. Treffen Sie eine bewusste Entscheidung darüber, ob Sie Aktualisierbarkeit unterstützen möchten oder nicht, bevor Sie Code schreiben. Diese Entscheidung wird beeinflussen, wie Sie Ihren Code strukturieren. Im Allgemeinen empfehlen wir:

- **Bevorzugen Sie [Vertragsmigration](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) gegenüber Aktualisierbarkeit.** Migrationssysteme bieten viele der gleichen Vorteile wie aktualisierbare Systeme, jedoch ohne deren Nachteile.
- **Verwenden Sie das Datentrennungsmuster (Data Separation) anstelle des Delegatecall-Proxy-Musters.** Wenn Ihr Projekt eine klare Abstraktionstrennung aufweist, erfordert die Aktualisierbarkeit mittels Datentrennung nur wenige Anpassungen. Der Delegatecall-Proxy erfordert Fachwissen über die Ethereum Virtual Machine (EVM) und ist sehr fehleranfällig.
- **Dokumentieren Sie das Migrations-/Aktualisierungsverfahren vor der Bereitstellung.** Wenn Sie unter Stress ohne Richtlinien reagieren müssen, werden Sie Fehler machen. Schreiben Sie das zu befolgende Verfahren im Voraus auf. Es sollte Folgendes umfassen:
  - Die Aufrufe, die die neuen Verträge initiieren
  - Wo die Schlüssel gespeichert sind und wie man auf sie zugreift
  - Wie die Bereitstellung überprüft wird! Entwickeln und testen Sie ein Post-Deployment-Skript.

## Implementierungsrichtlinien {#implementation-guidelines}

**Streben Sie nach Einfachheit.** Verwenden Sie immer die einfachste Lösung, die Ihren Zweck erfüllt. Jedes Mitglied Ihres Teams sollte in der Lage sein, Ihre Lösung zu verstehen.

### Funktionskomposition {#function-composition}

Die Architektur Ihrer Codebasis sollte es einfach machen, Ihren Code zu überprüfen. Vermeiden Sie architektonische Entscheidungen, die es erschweren, über dessen Richtigkeit nachzudenken.

- **Teilen Sie die Logik Ihres Systems auf**, entweder durch mehrere Verträge oder indem Sie ähnliche Funktionen gruppieren (zum Beispiel Authentifizierung, Arithmetik, ...).
- **Schreiben Sie kleine Funktionen mit einem klaren Zweck.** Dies erleichtert die Überprüfung und ermöglicht das Testen einzelner Komponenten.

### Vererbung {#inheritance}

- **Halten Sie die Vererbung überschaubar.** Vererbung sollte verwendet werden, um die Logik aufzuteilen. Ihr Projekt sollte jedoch darauf abzielen, die Tiefe und Breite des Vererbungsbaums zu minimieren.
- **Verwenden Sie den [Vererbungsdrucker (Inheritance Printer)](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) von Slither, um die Hierarchie der Verträge zu überprüfen.** Der Vererbungsdrucker hilft Ihnen dabei, die Größe der Hierarchie zu überprüfen.

### Ereignisse (Events) {#events}

- **Protokollieren Sie alle wichtigen Vorgänge.** Ereignisse helfen dabei, den Vertrag während der Entwicklung zu debuggen und ihn nach der Bereitstellung zu überwachen.

### Vermeiden Sie bekannte Fallstricke {#avoid-known-pitfalls}

- **Seien Sie sich der häufigsten Sicherheitsprobleme bewusst.** Es gibt viele Online-Ressourcen, um sich über häufige Probleme zu informieren, wie z. B. [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) oder [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Beachten Sie die Warnhinweise in der [Solidity-Dokumentation](https://docs.soliditylang.org/en/latest/).** Die Warnhinweise informieren Sie über nicht offensichtliches Verhalten der Sprache.

### Abhängigkeiten {#dependencies}

- **Verwenden Sie gut getestete Bibliotheken.** Das Importieren von Code aus gut getesteten Bibliotheken verringert die Wahrscheinlichkeit, dass Sie fehlerhaften Code schreiben. Wenn Sie einen ERC-20-Vertrag schreiben möchten, verwenden Sie [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Verwenden Sie einen Abhängigkeitsmanager; vermeiden Sie das Kopieren und Einfügen von Code.** Wenn Sie sich auf eine externe Quelle verlassen, müssen Sie diese mit der Originalquelle auf dem neuesten Stand halten.

### Tests und Verifizierung {#testing-and-verification}

- **Schreiben Sie gründliche Unit-Tests.** Eine umfangreiche Testsuite ist entscheidend für die Entwicklung hochwertiger Software.
- **Schreiben Sie benutzerdefinierte Prüfungen und Eigenschaften für [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) und [Manticore](https://github.com/trailofbits/manticore).** Automatisierte Tools helfen dabei, die Sicherheit Ihres Vertrags zu gewährleisten. Lesen Sie den Rest dieses Leitfadens, um zu erfahren, wie Sie effiziente Prüfungen und Eigenschaften schreiben.
- **Verwenden Sie [crytic.io](https://crytic.io/).** Crytic lässt sich in GitHub integrieren, bietet Zugriff auf private Slither-Detektoren und führt benutzerdefinierte Eigenschaftsprüfungen von Echidna aus.

### Solidity {#solidity}

- **Bevorzugen Sie Solidity 0.5 gegenüber 0.4 und 0.6.** Unserer Meinung nach ist Solidity 0.5 sicherer und verfügt über bessere integrierte Praktiken als 0.4. Solidity 0.6 hat sich als zu instabil für die Produktion erwiesen und benötigt Zeit, um zu reifen.
- **Verwenden Sie eine stabile Version zum Kompilieren; verwenden Sie die neueste Version, um auf Warnungen zu prüfen.** Stellen Sie sicher, dass Ihr Code mit der neuesten Compiler-Version keine gemeldeten Probleme aufweist. Solidity hat jedoch einen schnellen Veröffentlichungszyklus und eine Historie von Compiler-Fehlern, weshalb wir die neueste Version nicht für die Bereitstellung empfehlen (siehe Slithers [solc-Versionsempfehlung](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)).
- **Verwenden Sie kein Inline-Assembly.** Assembly erfordert Fachwissen über die Ethereum Virtual Machine. Schreiben Sie keinen EVM-Code, wenn Sie das Yellow Paper nicht _gemeistert_ haben.

## Bereitstellungsrichtlinien {#deployment-guidelines}

Sobald der Vertrag entwickelt und bereitgestellt wurde:

- **Überwachen Sie Ihre Verträge.** Beobachten Sie die Protokolle und seien Sie bereit zu reagieren, falls der Vertrag oder das Wallet kompromittiert wird.
- **Fügen Sie Ihre Kontaktinformationen zu [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) hinzu.** Diese Liste hilft Dritten, Sie zu kontaktieren, falls eine Sicherheitslücke entdeckt wird.
- **Sichern Sie die Wallets privilegierter Benutzer.** Befolgen Sie unsere [Best Practices](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/), wenn Sie Schlüssel in Hardware-Wallets speichern.
- **Haben Sie einen Plan zur Reaktion auf Vorfälle (Incident Response Plan).** Bedenken Sie, dass Ihre Smart Contracts kompromittiert werden können. Selbst wenn Ihre Verträge fehlerfrei sind, könnte ein Angreifer die Kontrolle über die Schlüssel des Vertragsinhabers erlangen.