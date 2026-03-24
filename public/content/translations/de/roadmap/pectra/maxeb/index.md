---
title: Pectra MaxEB
description: "Erfahren Sie mehr über MaxEB im Pectra-Release"
lang: de
---

# MaxEB {#maxeb}

*tl;dr:* Der Pectra-Hard-Fork ermöglicht es Ethereum-Validatoren, sich für ein höheres maximales effektives Guthaben und Compounding zu entscheiden, indem sie ihre Auszahlungsberechtigungen von **Typ 1** in **Typ 2** umwandeln. Das offizielle Tool dafür ist das Launchpad. Dieser Vorgang kann nicht rückgängig gemacht werden.

## Übersicht {#overview}

### Wer ist betroffen? {#who-is-affected}

Jeder, der einen Validator betreibt – das ist wahrscheinlich jemand, der den Index (z. B. [Validator #12345](https://beaconcha.in/validator/12345)) eines von ihm kontrollierten Validators kennt. Wenn Sie ein Protokoll verwenden, um einen Validator zu betreiben (z. B. Lido CSM oder Rocket Pool), müssen Sie sich bei diesen erkundigen, ob und wann sie maxEB unterstützen.

Wenn Sie Staking über einen Liquid-Staking-Token (z. B. rETH oder stETH) betreiben, ist keine Aktion erforderlich oder empfohlen.

### Was ist „maxEB“? {#what-is-maxeb}

maxEB = das MAXimale effektive Guthaben (MAXimum Effective Balance) eines Validators. Bis zum Pectra-Hard-Fork verdient jeder Validator an maximal 32 ETH. Nach Pectra haben Validatoren die Möglichkeit, an jedem Guthaben zwischen 32 und 2048 ETH in Schritten von 1 ETH zu verdienen, indem sie sich für diese Änderung entscheiden (Opt-in).

### Wie entscheidet sich ein Validator dafür (Opt-in)? {#how-does-a-validator-opt-in}

Ein Validator entscheidet sich für die maxEB-Änderung, indem er seine Auszahlungsberechtigungen von **Typ 1** in **Typ 2** umwandelt. Dies kann über das [Launchpad (Validator Actions)](https://launchpad.ethereum.org/validator-actions) erfolgen, nachdem der Pectra-Hard-Fork live gegangen ist. Wie bei **Typ 0** → **Typ 1** ist die Umwandlung von **Typ 1** → **Typ 2** ein irreversibler Prozess.

### Was ist eine Auszahlungsberechtigung? {#whats-a-withdrawal-credential}

Wenn Sie einen Validator betreiben, verfügen Sie über einen Satz von Auszahlungsberechtigungen (Withdrawal Credentials). Diese finden Sie in Ihrer Deposit-Data-JSON oder Sie können sie auf dem [Einzahlungs-Tab](https://beaconcha.in/validator/12345#deposits) Ihres Validators auf beaconcha.in einsehen.

1. **Typ 0** Auszahlungsberechtigungen: Wenn die Auszahlungsberechtigungen Ihres Validators mit `0x00...` beginnen, haben Sie vor dem Shapella-Hard-Fork eingezahlt und noch keine Auszahlungsadresse festgelegt.

![Typ 0 Auszahlungsberechtigung](./0x00-wd.png)

2. **Typ 1** Auszahlungsberechtigungen: Wenn die Auszahlungsberechtigungen Ihres Validators mit `0x01...` beginnen, haben Sie nach dem Shapella-Hard-Fork eingezahlt oder Ihre **Typ 0**-Berechtigungen bereits in **Typ 1**-Berechtigungen umgewandelt.

 ![Typ 1 Auszahlungsberechtigung](./0x01-wd.png)

3. **Typ 2** Auszahlungsberechtigungen: Dieser neue Typ von Auszahlungsberechtigungen beginnt mit `0x02...` und wird nach Pectra aktiviert. Validatoren mit **Typ 2**-Auszahlungsberechtigungen werden manchmal als „**Compounding-Validatoren**“ bezeichnet.

| **Erlaubt** | **Nicht erlaubt** |
| --- | --- |
| ✅ Typ 0 → Typ 1 | ❌ Typ 0 → Typ 2 |
| ✅ Typ 1 → Typ 2 | ❌ Typ 1 → Typ 0 |
|  | ❌ Typ 2 → Typ 1 |
|  | ❌ Typ 2 → Typ 0 |

### Risiken {#risks}

MaxEB ermöglicht es einem Validator, sein gesamtes Guthaben an einen anderen Validator zu senden. Benutzer, die eine Konsolidierungsanfrage einreichen, sollten die Quelle und den Inhalt der Transaktion, die sie signieren, überprüfen. Das offizielle Tool zur Nutzung der maxEB-Funktionen ist das Launchpad. Wenn Sie sich entscheiden, ein Drittanbieter-Tool zu verwenden, sollten Sie überprüfen, ob:

- Der Public-Key und die Auszahlungsadresse des Quell-Validators mit dem von ihnen kontrollierten Validator übereinstimmen
- Der Public-Key des Ziel-Validators korrekt ist und ihnen gehört
- Die Anfrage eine Umwandlung und keine Konsolidierung ist, wenn sie nicht beabsichtigen, Gelder an einen anderen Validator zu senden
- Die Transaktion von der korrekten Auszahlungsadresse signiert wird

Wir **empfehlen dringend**, jedes Drittanbieter-Tool, das Sie verwenden möchten, mit der [EthStaker-Community](https://ethstaker.org/about) zu besprechen. Es ist ein hilfreicher Ort, um Ihren Ansatz auf Plausibilität zu prüfen und Fehler zu vermeiden. Wenn Sie ein bösartiges oder falsch konfiguriertes Tool verwenden, **könnte Ihr gesamtes Validator-Guthaben an einen Validator gesendet werden, den Sie nicht kontrollieren** – ohne Möglichkeit, es zurückzubekommen.

## Technische Details {#technical-details}

### Der Ablauf {#the-flow}

Es wird zwei Verwendungszwecke für die `ConsolidationRequest`-Operation geben:

1. Umwandlung eines bestehenden Validators von einem **Typ 1**- in einen **Typ 2**-Validator
2. Konsolidierung anderer Validatoren in einen bestehenden **Typ 2**-Validator

Bei einer Umwandlung eines **Typ 1**- in einen **Typ 2**-Validator sind sowohl die *Quelle* als auch das *Ziel* der Validator, den Sie umwandeln. Die Operation kostet Gas und wird hinter anderen Konsolidierungsanfragen in die Warteschlange eingereiht. Diese Warteschlange ist **getrennt** von der Einzahlungswarteschlange, wird nicht von neuen Validator-Einzahlungen beeinflusst und kann auf [pectrified.com](https://pectrified.com/) eingesehen werden.

Um Validatoren zu konsolidieren, müssen Sie einen *Ziel-Validator* haben, der über eine **Typ 2**-Auszahlungsberechtigung verfügt. Dies ist das Ziel aller konsolidierten Validator-Guthaben und der Index, der erhalten bleibt.

### Anforderungen für die Umwandlung in Typ 2 {#requirements-for-converting-to-type-2}

Dies ist für den ersten Validator erforderlich, den Sie in **Typ 2** umwandeln. Der Index dieses Validators bleibt erhalten und aktiv. Für eine Umwandlung gilt: *Quell-Validator* == *Ziel-Validator*.

Der Validator muss...

- aktiv sein
- über **Typ 1**-Auszahlungsberechtigungen verfügen
- sich nicht in einem Exiting-Status befinden (oder von Slashing betroffen sein)
- keine ausstehenden manuell ausgelösten Auszahlungen haben (gilt nicht für automatische Sweeps)

![Umwandlungs-Illustration](./conversion.png)

### Anforderungen für die Konsolidierung {#requirements-for-consolidating}

Dies ist die *gleiche Operation* wie die Umwandlung, jedoch ist der *Quell-Validator* ein anderer als der *Ziel-Validator*. Der Index des Ziel-Validators bleibt erhalten und nimmt das Guthaben des Quell-Validators auf. Der Index des Quell-Validators wird in einen `EXITED`-Status versetzt.

In diesem Fall hat der Quell-Validator alle oben genannten Anforderungen plus:

- war für mindestens ~27,3 Stunden aktiv (eine `SHARD_COMMITTEE_PERIOD`)

Der Ziel-Validator muss

- über **Typ 2**-Auszahlungsberechtigungen verfügen
- sich nicht in einem Exiting-Status befinden.

![Konsolidierungs-Illustration](./consolidation.png)

### Die Konsolidierungsanfrage {#the-consolidation-request}

Die Konsolidierungsanfrage wird von der mit dem Quell-Validator verknüpften Auszahlungsadresse signiert und enthält:

1. Adresse des Quell-Validators (z. B. `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Public-Key des Quell-Validators (z. B. `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Public-Key des Ziel-Validators

Bei einer Umwandlung sind 2 & 3 identisch. Diese Operation kann auf [dem Launchpad](https://launchpad.ethereum.org/) durchgeführt werden.

### Signaturanforderungen {#signing-requirements}

Um einen `ConsolidationRequest` einzureichen, muss die **Auszahlungsadresse des Quell-Validators** die Anfrage signieren. Dies beweist die Kontrolle über die Validator-Gelder.

### Was wird signiert? {#what-is-signed}

Es wird ein domänengetrennter [Signing Root](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root) des `ConsolidationRequest`-Objekts verwendet.

- **Domäne:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Signing-Root-Felder:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

Die resultierende **BLS-Signatur** wird zusammen mit der Anfrage eingereicht.

Hinweis: Die Signatur erfolgt durch die Auszahlungsadresse, nicht durch den Validator-Schlüssel.

### Teilweise Auszahlungen {#partial-withdrawals}

Validatoren mit **Typ 1**-Berechtigungen erhalten automatische, gasfreie Sweeps ihres überschüssigen Guthabens (alles über 32 ETH) an ihre Auszahlungsadresse. Da **Typ 2** es einem Validator ermöglicht, Guthaben in Schritten von 1 ETH aufzuzinsen (Compounding), werden Guthaben nicht automatisch gesweept, bis 2048 ETH erreicht sind. Teilweise Auszahlungen bei **Typ 2**-Validatoren müssen manuell ausgelöst werden und kosten Gas.

## Konsolidierungs-Tools {#consolidation-tooling}

Es stehen mehrere Tools zur Verwaltung von Konsolidierungen zur Verfügung. Das offizielle Tool, das von der Ethereum Foundation erstellt wurde, ist das [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Es gibt auch Drittanbieter-Tools, die von Entitäten aus der Staking-Community erstellt wurden und möglicherweise Funktionen bieten, die das Launchpad nicht bereitstellt. Obwohl die hier aufgeführten Tools nicht von der Ethereum Foundation geprüft oder unterstützt werden, handelt es sich bei den folgenden um Open-Source-Tools von bekannten Mitgliedern der Community.

| Tool | Website | Open Source | Ersteller | Geprüft (Audited) | Schnittstelle | Besondere Funktionen |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Ja, Apache 2.0 | [Pier Two](https://piertwo.com/) | Nein | Web-UI | Wallet Connect, funktioniert mit SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Ja, MIT | [Luganodes](https://www.luganodes.com/) | Ja, Quantstamp [Mai 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Kommandozeile | Batching, für viele Validatoren gleichzeitig |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Ja, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Nein | Kommandozeile | Vollständiger Funktionsumfang für Validator- und Blockchain-Knoten-Verwaltung |
| Siren | [GitHub](https://github.com/sigp/siren) | Ja, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | Nein | Teilweise Kommandozeile, aber primär Web-UI | Funktioniert nur, wenn Sie den Lighthouse Konsens-Client verwenden |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Ja, MIT-Lizenzen | [Stakely](https://stakely.io/) | Nein | Web-UI, gehostet von Stakely und bereit zum kostenlosen Self-Hosting | Unterstützt wichtige Wallet-Verbindungen einschließlich SAFE mit WalletConnect |

## FAQ {#faq}

### Ändert das Opt-in mein Vorschlagsglück oder meine Belohnungen? {#change-luck-or-rewards}

Nein. Das Opt-in verringert nicht Ihre Chance auf einen Vorschlag – Ihre Pflichten und die Vorschlagsauswahl bleiben gleich. Wenn Sie beispielsweise zwei 32-ETH-Validatoren im Vergleich zu einem 64-ETH-Validator haben, haben Sie insgesamt die gleichen Chancen, für den Vorschlag eines Blocks ausgewählt zu werden und Belohnungen zu verdienen.

### Ändert das Opt-in mein Slashing-Risiko? {#change-slashing-risk}

Für kleinere oder unprofessionelle Betreiber lautet die kurze Antwort: Nein. Die längere Antwort ist, dass für professionelle Betreiber, die viele Validatoren pro Blockchain-Knoten mit schnellen Warnsystemen betreiben, die Konsolidierung auf weniger Validatoren ihre Fähigkeit verringern kann, auf ein Slashing zu reagieren und Kaskadenereignisse zu verhindern. Die anfängliche Slashing-*Strafe* für alle Validatoren wurde drastisch von 1 ETH (pro 32 ETH) auf 0,0078125 ETH (pro 32 ETH) reduziert, um dieses Risiko auszugleichen.

### Muss ich meinen Validator beenden (exiten), um ihn umzuwandeln? {#exit-validator}

Nein. Sie können die Umwandlung direkt durchführen, ohne ihn zu beenden.

### Wie lange dauert die Umwandlung / Konsolidierung? {#how-long}

Mindestens 27,3 Stunden, aber Konsolidierungen unterliegen auch einer Warteschlange. Diese Warteschlange ist unabhängig von den Einzahlungs- und Auszahlungswarteschlangen und wird von diesen nicht beeinflusst.

### Kann ich meinen Validator-Index behalten? {#keep-validator-index}

Ja. Bei einer direkten Umwandlung bleibt derselbe Validator-Index erhalten. Wenn Sie mehrere Validatoren konsolidieren, können Sie nur den Index des *Ziel-Validators* behalten.

### Werde ich Bestätigungen verpassen? {#miss-attestations}

Während einer Konsolidierung in einen anderen Validator wird der Quell-Validator beendet und es gibt eine Wartezeit von ca. 27 Stunden, bevor das Guthaben auf dem Ziel-Validator aktiv ist. Dieser Zeitraum **wirkt sich nicht auf die Leistungsmetriken aus**.

### Werden mir Strafen auferlegt? {#incur-penalties}

Nein. Solange Ihr Validator online ist, werden Ihnen keine Strafen auferlegt.

### Müssen die Auszahlungsadressen der zu konsolidierenden Validatoren übereinstimmen? {#withdrawal-addresses-match}

Nein. Aber die *Quelle* muss die Anfrage von ihrer eigenen Adresse aus autorisieren.

### Werden meine Belohnungen nach der Umwandlung aufgezinst (Compounding)? {#rewards-compound}

Ja. Mit **Typ 2**-Berechtigungen werden Belohnungen über 32 ETH automatisch erneut gestakt (Restaking) – aber nicht sofort. Aufgrund eines kleinen Puffers (genannt [*Hysterese*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)) muss Ihr Guthaben **etwa 1,25 ETH mehr** erreichen, bevor der zusätzliche Betrag erneut gestakt wird. Anstatt also bei 33,0 ETH aufzuzinsen, geschieht dies bei 33,25 (effektives Guthaben = 33 ETH), dann bei 34,25 (effektives Guthaben = 34 ETH) und so weiter.

### Kann ich nach der Umwandlung noch automatische Sweeps erhalten? {#automatic-sweep}

Automatische Sweeps erfolgen nur bei überschüssigen Guthaben über 2048. Alle anderen teilweisen Auszahlungen müssen Sie manuell auslösen.

### Kann ich meine Meinung ändern und von Typ 2 zu Typ 1 zurückkehren? {#go-back-to-type1}

Nein. Die Umwandlung in **Typ 2** ist irreversibel.

### Wenn ich mehrere Validatoren konsolidieren möchte, muss ich dann jeden zuerst in Typ 2 umwandeln? {#consolidate-multiple-validators}

Nein! Wandeln Sie einen Validator in Typ 2 um und verwenden Sie diesen dann als Ziel. Alle anderen Validatoren, die in dieses Typ-2-Ziel konsolidiert werden, können Typ 1 oder Typ 2 sein.

### Mein Validator ist offline oder unter 32 ETH – kann ich ihn trotzdem umwandeln? {#offline-or-below-32eth}

Ja. Solange er aktiv ist (nicht beendet) und Sie mit seiner Auszahlungsadresse signieren können, können Sie ihn umwandeln.

## Ressourcen {#resources}

- [Electra-Konsens-Spezifikationen](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): Dies ist die „wahrste“ Version, auf die Sie sich verlassen sollten. Im Zweifelsfall lesen Sie die Spezifikationen.
- Nicht jeder wühlt sich gerne durch Code, daher kann [dieser maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) bei der Interpretation der Spezifikationen helfen. *Haftungsausschluss: Die Spezifikationen, nicht die KI, sollten als Wahrheit herangezogen werden, da die KI Informationen falsch interpretieren oder Antworten halluzinieren kann.*
- [pectrified.com](https://pectrified.com/): Sehen Sie sich den Status von Konsolidierungen, Einzahlungen und Wartezeiten in der Warteschlange an.
- [Ethereal](https://github.com/wealdtech/ethereal): Von der Community erstelltes CLI-Tool zur Verwaltung allgemeiner Validator-Aufgaben.
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Von der Community erstellter Vertrag, der es ermöglicht, Einzahlungen für mehrere Ethereum-Validatoren in einer einzigen Transaktion vorzunehmen.