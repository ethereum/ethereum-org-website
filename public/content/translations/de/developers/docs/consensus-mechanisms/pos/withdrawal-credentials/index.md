---
title: Auszahlungsberechtigungen
description: Eine Erklärung der Arten von Auszahlungsberechtigungen für Validatoren (0x00, 0x01, 0x02) und deren Auswirkungen für Ethereum-Staker.
lang: de
---

Jeder Validator hat eine **Auszahlungsberechtigung**, die bestimmt, wie und wo sein gestaktes ETH und seine Belohnungen abgehoben werden können. Die Art der Berechtigung wird durch das erste Byte angegeben: `0x00`, `0x01` oder `0x02`. Das Verständnis dieser Arten ist wichtig für Validatoren, die ihren Stake verwalten.

## 0x00: Pre-Shapella-Berechtigungen {#0x00-credentials}

Der Typ `0x00` ist das ursprüngliche Format der Auszahlungsberechtigungen aus der Zeit vor dem Shapella-Upgrade (April 2023). Validatoren mit dieser Art von Berechtigung haben keine Abhebungsadresse auf der Ausführungsschicht festgelegt, was bedeutet, dass ihre Gelder auf der Konsensschicht gesperrt bleiben. Wenn Sie noch `0x00`-Berechtigungen haben, müssen Sie auf `0x01` oder `0x02` aktualisieren, bevor Sie Abhebungen erhalten können.

## 0x01: Veraltete Auszahlungsberechtigungen (Legacy) {#0x01-credentials}

Der Typ `0x01` wurde mit dem Shapella-Upgrade eingeführt und wurde zum Standard für Validatoren, die eine Abhebungsadresse auf der Ausführungsschicht festlegen wollten. Mit `0x01`-Berechtigungen:

- Jedes Guthaben über 32 ETH wird **automatisch** an Ihre Abhebungsadresse **überwiesen**
- Vollständige Austritte durchlaufen die Standard-Austrittswarteschlange
- Belohnungen über 32 ETH können nicht verzinst werden (kein Compounding) – sie werden regelmäßig automatisch abgehoben

**Warum einige Validatoren immer noch 0x01 verwenden:** Es ist einfacher und vertraut. Viele Validatoren haben nach Shapella eingezahlt und besitzen bereits diesen Typ, und er funktioniert gut für diejenigen, die automatische Abhebungen von überschüssigem Guthaben wünschen.

**Warum es nicht empfohlen wird:** Mit `0x01` verlieren Sie die Möglichkeit, Belohnungen über 32 ETH zu verzinsen (Compounding). Jeder Überschuss wird automatisch abgehoben, was das Verdienstpotenzial Ihres Validators einschränkt und erfordert, dass abgehobene Gelder separat verwaltet werden.

## 0x02: Compounding-Auszahlungsberechtigungen {#0x02-credentials}

Der Typ `0x02` wurde mit dem Pectra-Upgrade eingeführt und ist heute die **empfohlene Wahl** für Validatoren. Validatoren mit `0x02`-Berechtigungen werden manchmal als „Compounding-Validatoren“ bezeichnet.

Mit `0x02`-Berechtigungen:

- Belohnungen über 32 ETH **verzinsen sich (Compounding)** in Schritten von 1 ETH bis zu einem maximalen effektiven Guthaben von 2048 ETH
- Teilweise Abhebungen müssen manuell angefordert werden (automatische Abhebungen erfolgen nur über dem Schwellenwert von 2048 ETH)
- Validatoren können mehrere 32-ETH-Validatoren zu einem einzigen Validator mit höherem Guthaben konsolidieren
- Vollständige Austritte werden weiterhin über die Standard-Austrittswarteschlange unterstützt

Sowohl teilweise Abhebungen als auch Konsolidierungen können über die [Launchpad-Validator-Aktionen](https://launchpad.ethereum.org/en/validator-actions) durchgeführt werden.

**Warum Validatoren 0x02 bevorzugen sollten:** Es bietet eine bessere Kapitaleffizienz durch Compounding, mehr Kontrolle darüber, wann Abhebungen stattfinden, und unterstützt die Konsolidierung von Validatoren. Für Solo-Staker, die im Laufe der Zeit Belohnungen ansammeln, bedeutet dies, dass ihr effektives Guthaben – und damit ihre Belohnungen – ohne manuelles Eingreifen über 32 ETH hinaus wachsen kann.

**Wichtig:** Sobald Sie von `0x01` zu `0x02` konvertieren, können Sie dies nicht mehr rückgängig machen.

Für eine detaillierte Anleitung zur Konvertierung in Typ-2-Berechtigungen und die MaxEB-Funktion, siehe die [MaxEB-Erklärungsseite](/roadmap/pectra/maxeb/).

## Was sollte ich wählen? {#what-should-i-pick}

- **Neue Validatoren:** Wählen Sie `0x02`. Es ist der moderne Standard mit besserem Compounding und mehr Flexibilität.
- **Bestehende 0x01-Validatoren:** Erwägen Sie die Konvertierung zu `0x02`, wenn Sie möchten, dass sich Belohnungen über 32 ETH verzinsen, oder wenn Sie planen, Validatoren zu konsolidieren.
- **Bestehende 0x00-Validatoren:** Aktualisieren Sie sofort – Sie können keine Abhebungen vornehmen, ohne Ihre Berechtigungen zu aktualisieren. Sie müssen zuerst zu `0x01` konvertieren, danach können Sie zu `0x02` konvertieren.

## Tools zur Verwaltung von Auszahlungsberechtigungen {#withdrawal-credential-tools}

Mehrere Tools unterstützen die Auswahl oder Konvertierung zwischen Berechtigungstypen:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** - Das offizielle Tool für Einzahlungen und die Verwaltung von Validatoren, einschließlich der Konvertierung von Berechtigungen und Konsolidierungen
- **[Pectra Staking Manager](https://pectrastaking.com)** - Web-Benutzeroberfläche mit Wallet-Connect-Unterstützung für Konvertierungen und Konsolidierungen
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** - Befehlszeilen-Tool für Batch-Konvertierungen
- **[Ethereal](https://github.com/wealdtech/ethereal)** - CLI-Tool für Ethereum-Operationen einschließlich der Verwaltung von Validatoren

Für eine vollständige Liste von Konsolidierungs-Tools und detaillierte Konvertierungsanweisungen, siehe [MaxEB-Konsolidierungs-Tools](/roadmap/pectra/maxeb/#consolidation-tooling).

## Weiterführende Literatur {#further-reading}

- [Schlüssel im Proof-of-Stake-Ethereum](/developers/docs/consensus-mechanisms/pos/keys/) - Erfahren Sie mehr über Validator-Schlüssel und wie sie mit Auszahlungsberechtigungen zusammenhängen
- [MaxEB](/roadmap/pectra/maxeb/) - Detaillierter Leitfaden zum Pectra-Upgrade und zur Funktion des maximalen effektiven Guthabens