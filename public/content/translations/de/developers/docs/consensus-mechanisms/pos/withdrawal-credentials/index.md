---
title: Auszahlungsberechtigungen
description: "Eine Erklärung der Arten von Validator-Auszahlungsberechtigungen (0x00, 0x01, 0x02) und ihrer Auswirkungen für Ethereum-Staker."
lang: de
---

Jeder Validator verfügt über eine **Auszahlungsberechtigung** (Withdrawal Credential), die bestimmt, wie und wo seine als Einsatz (Stake) hinterlegten ETH und Belohnungen ausgezahlt werden können. Der Typ der Berechtigung wird durch das erste Byte angegeben: `0x00`, `0x01` oder `0x02`. Das Verständnis dieser Typen ist wichtig für Validatoren, die ihren Einsatz verwalten.

## 0x00: Pre-Shapella-Berechtigungen {#0x00-credentials}

Der Typ `0x00` ist das ursprüngliche Format der Auszahlungsberechtigung aus der Zeit vor dem Shapella-Upgrade (April 2023). Bei Validatoren mit diesem Berechtigungstyp ist keine Auszahlungsadresse auf der Ausführungsebene festgelegt, was bedeutet, dass ihre Gelder auf der Konsensebene gesperrt bleiben. Wenn Sie noch über `0x00`-Berechtigungen verfügen, müssen Sie ein Upgrade auf `0x01` oder `0x02` durchführen, bevor Sie Auszahlungen erhalten können.

## 0x01: Veraltete Auszahlungsberechtigungen (Legacy) {#0x01-credentials}

Der Typ `0x01` wurde mit dem Shapella-Upgrade eingeführt und wurde zum Standard für Validatoren, die eine Auszahlungsadresse auf der Ausführungsebene festlegen wollten. Mit `0x01`-Berechtigungen:

- Jedes Guthaben über 32 ETH wird **automatisch** an Ihre Auszahlungsadresse **überwiesen** (Sweeping)
- Vollständige Ausstiege (Exits) durchlaufen die Standard-Ausstiegswarteschlange
- Belohnungen über 32 ETH können sich nicht verzinsen (Compounding) – sie werden regelmäßig abgebucht

**Warum einige Validatoren immer noch 0x01 verwenden:** Es ist einfacher und vertraut. Viele Validatoren haben nach Shapella eingezahlt und verfügen bereits über diesen Typ, und er funktioniert gut für diejenigen, die automatische Auszahlungen von überschüssigem Guthaben wünschen.

**Warum es nicht empfohlen wird:** Mit `0x01` verlieren Sie die Möglichkeit, Belohnungen über 32 ETH zu verzinsen (Compounding). Jeder Überschuss wird automatisch abgebucht, was das Verdienstpotenzial Ihres Validators einschränkt und eine separate Verwaltung der ausgezahlten Gelder erfordert.

## 0x02: Zinseszins-Auszahlungsberechtigungen (Compounding) {#0x02-credentials}

Der Typ `0x02` wurde mit dem Pectra-Upgrade eingeführt und ist heute die **empfohlene Wahl** für Validatoren. Validatoren mit `0x02`-Berechtigungen werden manchmal als „Compounding-Validatoren“ bezeichnet.

Mit `0x02`-Berechtigungen:

- Belohnungen über 32 ETH **verzinsen sich** in Schritten von 1 ETH bis zu einem maximalen effektiven Guthaben von 2048 ETH
- Teilweise Auszahlungen müssen manuell angefordert werden (automatische Abbuchungen erfolgen nur oberhalb der Grenze von 2048 ETH)
- Validatoren können mehrere 32-ETH-Validatoren zu einem einzigen Validator mit höherem Guthaben konsolidieren
- Vollständige Ausstiege werden weiterhin über die Standard-Ausstiegswarteschlange unterstützt

Sowohl teilweise Auszahlungen als auch Konsolidierungen können über die [Launchpad Validator Actions](https://launchpad.ethereum.org/en/validator-actions) durchgeführt werden.

**Warum Validatoren 0x02 bevorzugen sollten:** Es bietet eine bessere Kapitaleffizienz durch Zinseszins (Compounding), mehr Kontrolle darüber, wann Auszahlungen erfolgen, und unterstützt die Konsolidierung von Validatoren. Für Solo-Staker, die im Laufe der Zeit Belohnungen ansammeln, bedeutet dies, dass ihr effektives Guthaben – und damit ihre Belohnungen – ohne manuelles Eingreifen über 32 ETH hinaus wachsen kann.

**Wichtig:** Sobald Sie von `0x01` zu `0x02` konvertieren, können Sie dies nicht mehr rückgängig machen.

Eine detaillierte Anleitung zur Konvertierung in Typ-2-Berechtigungen und zur MaxEB-Funktion finden Sie auf der [MaxEB-Erklärungsseite](/roadmap/pectra/maxeb/).

## Was sollte ich wählen? {#what-should-i-pick}

- **Neue Validatoren:** Wählen Sie `0x02`. Es ist der moderne Standard mit besserem Zinseszins und mehr Flexibilität.
- **Bestehende 0x01-Validatoren:** Erwägen Sie die Konvertierung zu `0x02`, wenn Sie möchten, dass sich Belohnungen über 32 ETH verzinsen, oder wenn Sie planen, Validatoren zu konsolidieren.
- **Bestehende 0x00-Validatoren:** Führen Sie sofort ein Upgrade durch – Sie können keine Auszahlungen vornehmen, ohne Ihre Berechtigungen zu aktualisieren. Sie müssen zuerst zu `0x01` konvertieren, danach können Sie zu `0x02` konvertieren.

## Tools zur Verwaltung von Auszahlungsberechtigungen {#withdrawal-credential-tools}

Mehrere Tools unterstützen die Auswahl oder Konvertierung zwischen Berechtigungstypen:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** – Das offizielle Tool für Einzahlungen und die Verwaltung von Validatoren, einschließlich der Konvertierung von Berechtigungen und Konsolidierungen
- **[Pectra Staking Manager](https://pectrastaking.com)** – Web-Benutzeroberfläche mit Wallet-Connect-Unterstützung für Konvertierungen und Konsolidierungen
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** – Befehlszeilen-Tool für Batch-Konvertierungen
- **[Ethereal](https://github.com/wealdtech/ethereal)** – CLI-Tool für Ethereum-Operationen einschließlich der Verwaltung von Validatoren

Eine vollständige Liste der Konsolidierungs-Tools und detaillierte Anweisungen zur Konvertierung finden Sie unter [MaxEB-Konsolidierungs-Tools](/roadmap/pectra/maxeb/#consolidation-tooling).

## Weiterführende Literatur {#further-reading}

- [Schlüssel im Proof-of-Stake-Ethereum](/developers/docs/consensus-mechanisms/pos/keys/) – Erfahren Sie mehr über Validator-Schlüssel und wie sie mit Auszahlungsberechtigungen zusammenhängen
- [MaxEB](/roadmap/pectra/maxeb/) – Detaillierter Leitfaden zum Pectra-Upgrade und zur Funktion des maximalen effektiven Guthabens