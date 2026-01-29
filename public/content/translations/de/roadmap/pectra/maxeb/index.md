---
title: Pectra MaxEB
description: "Erfahren Sie mehr über MaxEB in der Pectra-Version"
lang: de
---

# MaxEB {#maxeb}

_tl;dr:_ Der Pectra Hard Fork ermöglicht es Ethereum-Validatoren, sich für ein höheres maximales effektives Guthaben und eine Aufzinsung zu entscheiden, indem sie von **Typ 1** auf **Typ 2** Auszahlungs-Zugangsdaten umstellen. Das offizielle Tool hierfür ist das Launchpad. Dieser Vorgang kann nicht rückgängig gemacht werden.

## Überblick {#overview}

### Wer ist betroffen? {#who-is-affected}

Jeder, der einen Validator betreibt – dies ist wahrscheinlich jemand, der den Index (z. B. [Validator #12345](https://beaconcha.in/validator/12345)) eines Validators kennt, den er kontrolliert. Wenn Sie ein Protokoll zum Betreiben eines Validators verwenden (z. B. Lido CSM oder Rocket Pool), müssen Sie sich bei diesem erkundigen, ob und wann es maxEB unterstützt.

Wenn Sie mittels eines Liquid-Staking-Tokens (z. B. rETH oder stETH) staken, ist keine Aktion erforderlich oder empfohlen.

### Was ist „maxEB“? {#what-is-maxeb}

maxEB = das MAXimale Effektive Guthaben eines Validators. Bis zum Pectra Hard Fork verdient jeder Validator auf maximal 32 ETH. Nach Pectra haben Validatoren die Möglichkeit, auf jedes Guthaben zwischen 32 und 2048 ETH in 1-ETH-Schritten zu verdienen, indem sie sich für die Änderung entscheiden.

### Wie kann sich ein Validator anmelden? {#how-does-a-validator-opt-in}

Ein Validator entscheidet sich für die maxEB-Änderung, indem er von **Typ 1** zu **Typ 2** Auszahlungs-Zugangsdaten konvertiert. Dies kann auf dem [Launchpad (Validator-Aktionen)](https://launchpad.ethereum.org/validator-actions) erfolgen, nachdem der Pectra Hard Fork live geht. Wie bei **Typ 0** → **Typ 1** ist die Konvertierung von **Typ 1** → **Typ 2** ein unumkehrbarer Prozess.

### Was sind Auszahlungs-Zugangsdaten? {#whats-a-withdrawal-credential}

Wenn Sie einen Validator betreiben, haben Sie einen Satz von Auszahlungs-Zugangsdaten. Diese finden Sie in Ihrer Einzahlungsdaten-JSON-Datei oder Sie können sie auf dem [Einzahlungs-Tab](https://beaconcha.in/validator/12345#deposits) Ihres Validators auf beaconcha.in einsehen.

1. **Typ 0** Auszahlungs-Zugangsdaten: Wenn die Auszahlungs-Zugangsdaten Ihres Validators mit `0x00...` beginnen, haben Sie vor dem Shapella Hard Fork eingezahlt und noch keine Auszahlungsadresse festgelegt.

![Typ 0 Auszahlungs-Zugangsdaten](./0x00-wd.png)

2. **Typ 1** Auszahlungs-Zugangsdaten: Wenn die Auszahlungs-Zugangsdaten Ihres Validators mit `0x01...` beginnen, haben Sie nach dem Shapella Hard Fork eingezahlt oder Ihre **Typ 0**-Zugangsdaten bereits in **Typ 1**-Zugangsdaten umgewandelt.

![Typ 1 Auszahlungs-Zugangsdaten](./0x01-wd.png)

3. **Typ 2** Auszahlungs-Zugangsdaten: Dieser neue Typ von Auszahlungs-Zugangsdaten beginnt mit `0x02...` und wird nach Pectra aktiviert. Validatoren mit **Typ 2** Auszahlungs-Zugangsdaten werden manchmal als „**Compounding-Validatoren**“ bezeichnet.

| **Erlaubt**     | **Nicht erlaubt** |
| --------------- | ----------------- |
| ✅ Typ 0 → Typ 1 | ❌ Typ 0 → Typ 2   |
| ✅ Typ 1 → Typ 2 | ❌ Typ 1 → Typ 0   |
|                 | ❌ Typ 2 → Typ 1   |
|                 | ❌ Typ 2 → Typ 0   |

### Risiken {#risks}

MaxEB ermöglicht es einem Validator, sein gesamtes Guthaben an einen anderen Validator zu senden. Benutzer, die einen Konsolidierungsantrag einreichen, sollten die Quelle und den Inhalt der Transaktion, die sie unterzeichnen, überprüfen. Das offizielle Tool zur Nutzung der maxEB-Funktionen ist das Launchpad. Wenn Sie sich für die Verwendung eines Drittanbieter-Tools entscheiden, sollten Sie Folgendes überprüfen:

- Der Pubkey und die Auszahlungsadresse des Quell-Validators mit dem von ihnen kontrollierten Validator übereinstimmen
- Der Pubkey des Ziel-Validators korrekt ist und ihnen gehört
- Die Anfrage eine Konvertierung und keine Konsolidierung ist, wenn sie nicht beabsichtigen, Gelder an einen anderen Validator zu senden
- Die Transaktion von der korrekten Auszahlungsadresse unterzeichnet wird

Wir **empfehlen dringend**, jedes Drittanbieter-Tool, das Sie verwenden möchten, mit der [EthStaker-Community](https://ethstaker.org/about) zu besprechen. Es ist ein hilfreicher Ort, um Ihren Ansatz auf Plausibilität zu prüfen und Fehler zu vermeiden. Wenn Sie ein bösartiges oder falsch konfiguriertes Tool verwenden, **könnte Ihr gesamtes Validator-Guthaben an einen Validator gesendet werden, den Sie nicht kontrollieren** – ohne eine Möglichkeit, es zurückzubekommen.

## Technische Details {#technical-details}

### Der Ablauf {#the-flow}

Es wird zwei Verwendungszwecke für die `ConsolidationRequest`-Operation geben:

1. Konvertierung eines bestehenden Validators von einem **Typ-1**- in einen **Typ-2**-Validator
2. Konsolidierung anderer Validatoren in einen bestehenden **Typ-2**-Validator

Bei der Umwandlung eines **Typ-1**- in einen **Typ-2**-Validator sind sowohl die _Quelle_ als auch das _Ziel_ der Validator, den Sie umwandeln. Die Operation kostet Gas und wird hinter anderen Konsolidierungsanfragen in die Warteschlange gestellt. Diese Warteschlange ist **getrennt** von der Einzahlungswarteschlange und wird von neuen Validator-Einzahlungen nicht beeinflusst. Sie kann auf [pectrified.com](https://pectrified.com/) eingesehen werden.

Um Validatoren zu konsolidieren, benötigen Sie einen _Ziel-Validator_, der über **Typ-2**-Auszahlungs-Zugangsdaten verfügt. Dies ist das Ziel aller konsolidierten Validator-Guthaben und der Index, der beibehalten wird.

### Anforderungen für die Konvertierung in Typ 2 {#requirements-for-converting-to-type-2}

Dies ist für den ersten Validator erforderlich, den Sie in **Typ 2** umwandeln. Der Index dieses Validators wird beibehalten und ist aktiv. Für eine Konvertierung gilt: _Quell-Validator_ == _Ziel-Validator_.

Der Validator muss...

- aktiv sein
- **Typ 1**-Auszahlungs-Zugangsdaten haben
- sich nicht in einem Ausstiegszustand befinden (oder von Slashing betroffen sein)
- keine ausstehenden manuell ausgelösten Auszahlungen haben (gilt nicht für Sweeps)

![Konvertierungsillustration](./conversion.png)

### Anforderungen für die Konsolidierung {#requirements-for-consolidating}

Dies ist die _gleiche Operation_ wie die Konvertierung, aber der _Quell-Validator_ ist ein anderer als der _Ziel-Validator_. Der Index des Ziel-Validators wird beibehalten und nimmt das Guthaben vom Quell-Validator an. Der Index des Quell-Validators wird in den `EXITED`-Zustand versetzt.

In diesem Fall gelten für den Quell-Validator alle oben genannten Anforderungen sowie:

- muss seit mindestens ~27,3 Stunden aktiv sein (eine `SHARD_COMMITTEE_PERIOD`)

Der Ziel-Validator muss

- **Typ 2**-Auszahlungs-Zugangsdaten haben
- sich nicht in einem Ausstiegszustand befinden.

![Konsolidierungsillustration](./consolidation.png)

### Der Konsolidierungsantrag {#the-consolidation-request}

Der Konsolidierungsantrag wird von der mit dem Quell-Validator verbundenen Auszahlungsadresse unterzeichnet und enthält:

1. Adresse des Quell-Validators (z. B. `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Öffentlicher Schlüssel des Quell-Validators (z. B. `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Öffentlicher Schlüssel dieses Ziel-Validators

Bei einer Konvertierung sind 2 & 3 identisch. Diese Operation kann über [das Launchpad](https://launchpad.ethereum.org/) durchgeführt werden.

### Anforderungen an die Signatur {#signing-requirements}

Um einen `ConsolidationRequest` einzureichen, muss die **Auszahlungsadresse des Quell-Validators** die Anfrage signieren. Dies beweist die Kontrolle über die Validator-Gelder.

### Was wird unterzeichnet? {#what-is-signed}

Es wird ein Domain-getrennter [Signing-Root](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) des `ConsolidationRequest`-Objekts verwendet.

- **Domain:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Felder des Signaturstamms:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

Die resultierende **BLS-Signatur** wird zusammen mit der Anfrage eingereicht.

Hinweis: Die Signatur erfolgt durch die Auszahlungsadresse, nicht durch den Validator-Schlüssel.

### Teilauszahlungen {#partial-withdrawals}

Validatoren mit **Typ 1**-Zugangsdaten erhalten automatische, gasfreie Sweeps ihres überschüssigen Guthabens (alles über 32 ETH) an ihre Auszahlungsadresse. Da **Typ 2** es einem Validator ermöglicht, Guthaben in 1-ETH-Schritten aufzuzinsen, werden Guthaben nicht automatisch als Sweep ausgezahlt, bis sie 2048 ETH erreichen. Teilauszahlungen bei **Typ-2**-Validatoren müssen manuell ausgelöst werden und kosten Gas.

## Konsolidierungs-Werkzeuge {#consolidation-tooling}

Es stehen mehrere Tools zur Verwaltung von Konsolidierungen zur Verfügung. Das offizielle, von der Ethereum Foundation entwickelte Tool ist das [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Es gibt auch Tools von Drittanbietern aus der Staking-Community, die möglicherweise Funktionen bieten, die das Launchpad nicht bereitstellt. Obwohl die hier vorgestellten Tools nicht von der Ethereum Foundation geprüft oder unterstützt werden, handelt es sich bei den folgenden um Open-Source-Tools von bekannten Mitgliedern der Community.

| Werkzeug                        | Website                                                                                                   | Offene Quelle (Open Source) | Ersteller                                      | Geprüft                                                                                                                                            | Schnittstelle                                                           | Bemerkenswerte Funktionen                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Pectra Staking Manager          | pectrastaking.com                                                                         | Ja, Apache 2.0                 | [Pier Two](https://piertwo.com/)               | Nein                                                                                                                                               | Web-UI                                                                  | Wallet Connect, funktioniert mit SAFE                                                 |
| Pectra Validator Ops CLI Tool   | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract)                                              | Ja, MIT                                        | [Luganodes](https://www.luganodes.com/)        | Ja, Quantstamp [Mai 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Kommandozeile                                                           | Batch-Verarbeitung für viele Validatoren auf einmal                                   |
| Ethereal                        | [GitHub](https://github.com/wealdtech/ethereal)                                                           | Ja, Apache 2.0                 | [Jim McDonald](https://www.attestant.io/team/) | Nein                                                                                                                                               | Kommandozeile                                                           | Vollständiger Funktionsumfang für die Verwaltung von Validatoren und Nodes            |
| Siren                           | [GitHub](https://github.com/sigp/siren)                                                                   | Ja, Apache 2.0                 | [Sigma Prime](https://sigmaprime.io/)          | Nein                                                                                                                                               | Einige Befehlszeilen, aber hauptsächlich Web-UI                         | Funktioniert nur, wenn Sie den Lighthouse Konsens-Client verwenden                    |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Ja, MIT-Lizenzen                               | [Stakely](https://stakely.io/)                 | Nein                                                                                                                                               | Web-UI, gehostet von stakely und bereit, frei selbst gehostet zu werden | Unterstützt die wichtigsten Wallet-Verbindungen einschließlich Safe mit WalletConnect |

## FAQ {#faq}

### Ändert die Teilnahme mein Vorschlagsglück oder meine Belohnungen? {#change-luck-or-rewards}

Nein. Die Teilnahme verringert nicht Ihre Chance auf einen Vorschlag – Ihre Aufgaben und die Auswahl der Vorschläge bleiben gleich. Wenn Sie beispielsweise zwei 32-ETH-Validatoren im Vergleich zu einem 64-ETH-Validator haben, haben Sie die gleichen Gesamtchancen, für einen Blockvorschlag ausgewählt zu werden und Belohnungen zu erhalten.

### Ändert die Teilnahme mein Slashing-Risiko? {#change-slashing-risk}

Für kleinere oder unprofessionelle Betreiber lautet die kurze Antwort: Nein. Die längere Antwort ist, dass für professionelle Betreiber, die viele Validatoren pro Node mit schneller Alarmierung betreiben, die Konsolidierung in weniger Validatoren ihre Fähigkeit, auf ein Slashing zu reagieren und Kaskadenereignisse zu verhindern, verringern kann. Die anfängliche Slashing-_Strafe_ für alle Validatoren wurde drastisch von 1 ETH (pro 32 ETH) auf 0,0078125 ETH (pro 32 ETH) reduziert, um dieses Risiko auszugleichen.

### Muss ich meinen Validator verlassen, um ihn zu konvertieren? {#exit-validator}

Nein. Sie können die Konvertierung ohne Beenden durchführen.

### Wie lange dauert die Konvertierung / Konsolidierung? {#how-long}

Mindestens 27,3 Stunden, aber Konsolidierungen unterliegen auch einer Warteschlange. Diese Warteschlange ist unabhängig von den Ein- und Auszahlungswarteschlangen und wird von diesen nicht beeinflusst.

### Kann ich meinen Validator-Index behalten? {#keep-validator-index}

Ja. Bei der In-Place-Konvertierung wird derselbe Validator-Index beibehalten. Wenn Sie mehrere Validatoren konsolidieren, können Sie nur den Index des _Ziel-Validators_ behalten.

### Werde ich Attestierungen verpassen? {#miss-attestations}

Während einer Konsolidierung in einen anderen Validator wird der Quell-Validator beendet, und es gibt eine Wartezeit von ca. 27 Stunden, bevor das Guthaben auf dem Ziel-Validator aktiv ist. Dieser Zeitraum **beeinflusst die Leistungsmetriken nicht**.

### Werde ich Strafen erhalten? {#incur-penalties}

Nein. Solange Ihr Validator online ist, werden Sie keine Strafen erhalten.

### Müssen die Auszahlungsadressen der zu konsolidierenden Validatoren übereinstimmen? {#withdrawal-addresses-match}

Nein. Aber die _Quelle_ muss die Anfrage von ihrer eigenen Adresse aus autorisieren.

### Werden meine Belohnungen nach der Konvertierung auf- oder verzinst? {#rewards-compound}

Ja. Mit **Typ 2**-Zugangsdaten werden Belohnungen über 32 ETH automatisch wieder gestaked – aber nicht sofort. Aufgrund eines kleinen Puffers (genannt [_Hysterese_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)) muss Ihr Guthaben **etwa 1,25 ETH mehr** erreichen, bevor der zusätzliche Betrag erneut gestakt wird. Statt also bei 33,0 ETH zu verzinsen, geschieht dies bei 33,25 (effektives Guthaben = 33 ETH), dann bei 34,25 (effektives Guthaben = 34 ETH) und so weiter.

### Kann ich nach der Konvertierung weiterhin automatische Sweeps erhalten? {#automatic-sweep}

Automatische Sweeps werden nur bei überschüssigen Guthaben von über 2048 stattfinden. Für alle anderen Teilauszahlungen müssen Sie diese manuell auslösen.

### Kann ich meine Meinung ändern und von Typ 2 zu Typ 1 zurückkehren? {#go-back-to-type1}

Nein. Die Konvertierung in **Typ 2** ist unumkehrbar.

### Wenn ich mehrere Validatoren konsolidieren möchte, muss ich jeden zuerst auf Typ 2 umstellen? {#consolidate-multiple-validators}

Nein! Konvertieren Sie einen Validator zu Typ 2 und verwenden Sie diesen dann als Ziel. Alle anderen Validatoren, die in dieses Typ-2-Ziel konsolidiert werden, können Typ 1 oder Typ 2 sein.

### Mein Validator ist offline oder unter 32 ETH - kann ich ihn trotzdem konvertieren? {#offline-or-below-32eth}

Ja. Solange er aktiv ist (nicht beendet) und Sie mit seiner Auszahlungsadresse signieren können, können Sie ihn konvertieren.

## Ressourcen {#resources}

- [Electra Konsens-Spezifikationen](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md): Dies ist die ‚wahrste‘ Version, auf die Sie sich verlassen sollten. Im Zweifelsfall die Spezifikationen lesen
- Nicht jeder fühlt sich wohl dabei, sich durch Code zu wühlen, daher kann [dieser maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) helfen, die Spezifikationen zu interpretieren. _Haftungsausschluss: Man sollte sich auf die Spezifikationen als Wahrheit verlassen, nicht auf die KI, da die KI Informationen falsch interpretieren oder Antworten halluzinieren kann_
- [pectrified.com](https://pectrified.com/): Sehen Sie sich den Status von Konsolidierungen, Einzahlungen und Wartezeiten in der Warteschlange an
- [Ethereal](https://github.com/wealdtech/ethereal): Von der Community erstelltes CLI-Tool zur Verwaltung gängiger Validator-Aufgaben
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Von der Community erstellter Vertrag, der die Einzahlung mehrerer Ethereum-Validatoren in einer einzigen Transaktion ermöglicht
