---
title: MaxEB
metaTitle: Pectra MaxEB
description: Erfahre mehr über MaxEB im Pectra-Release
lang: de
authors: ["Nixo"]
---

*tl;dr:* Der Pectra-Hard-Fork ermöglicht es Ethereum-Validatoren, sich für ein höheres maximales effektives Guthaben und Compounding (Zinseszins) zu entscheiden, indem sie von Auszahlungsberechtigungen des **Typs 1** zu **Typ 2** wechseln. Das offizielle Tool dafür ist das Launchpad. Dieser Vorgang kann nicht rückgängig gemacht werden.

## Übersicht {#overview}

### Wer ist betroffen? {#who-is-affected}

Jeder, der einen Validator betreibt – das ist wahrscheinlich jemand, der den Index (z. B. [Validator #12345](https://beaconcha.in/validator/12345)) eines von ihm kontrollierten Validators kennt. Wenn du ein Protokoll verwendest, um einen Validator zu betreiben (z. B. Lido CSM oder Rocket Pool), musst du dort nachfragen, ob und wann sie maxEB unterstützen.

Wenn du über einen Liquid-Staking-Token (LST) (z. B. rETH oder stETH) stakst, ist keine Aktion erforderlich oder empfohlen.

### Was ist „maxEB“? {#what-is-maxeb}

maxEB = das MAXimale effektive Guthaben (Maximum Effective Balance) eines Validators. Bis zum Pectra-Hard-Fork verdient jeder Validator an maximal 32 ETH. Nach Pectra haben Validatoren die Möglichkeit, an jedem Guthaben zwischen 32 und 2048 ETH in Schritten von 1 ETH zu verdienen, indem sie sich für diese Änderung entscheiden.

### Wie entscheidet sich ein Validator dafür? {#how-does-a-validator-opt-in}

Ein Validator entscheidet sich für die maxEB-Änderung, indem er von Auszahlungsberechtigungen des **Typs 1** zu **Typ 2** wechselt. Dies kann auf dem [Launchpad (Validator-Aktionen)](https://launchpad.ethereum.org/validator-actions) durchgeführt werden, nachdem der Pectra-Hard-Fork live gegangen ist. Wie bei **Typ 0** → **Typ 1** ist die Umwandlung von **Typ 1** → **Typ 2** ein irreversibler Prozess.

### Was ist eine Auszahlungsberechtigung? {#whats-a-withdrawal-credential}

Wenn du einen Validator betreibst, hast du einen Satz von Auszahlungsberechtigungen. Diese findest du in deiner Einzahlungsdaten-JSON oder du kannst sie auf dem [Einzahlungs-Tab](https://beaconcha.in/validator/12345#deposits) deines Validators auf beaconcha.in einsehen.

1. Auszahlungsberechtigungen vom **Typ 0**: Wenn die Auszahlungsberechtigungen deines Validators mit `0x00...` beginnen, hast du vor dem Shapella-Hard-Fork eingezahlt und noch keine Abhebungsadresse festgelegt.

![Type 0 withdrawal credential](./0x00-wd.png)

2. Auszahlungsberechtigungen vom **Typ 1**: Wenn die Auszahlungsberechtigungen deines Validators mit `0x01...` beginnen, hast du nach dem Shapella-Hard-Fork eingezahlt oder deine Berechtigungen vom **Typ 0** bereits in Berechtigungen vom **Typ 1** umgewandelt.

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. Auszahlungsberechtigungen vom **Typ 2**: Dieser neue Typ von Auszahlungsberechtigungen beginnt mit `0x02...` und wird nach Pectra aktiviert. Validatoren mit Auszahlungsberechtigungen vom **Typ 2** werden manchmal als „**Compounding-Validatoren**“ bezeichnet.

| **Erlaubt** | **Nicht erlaubt** |
| --- | --- |
| ✅ Typ 0 → Typ 1 | ❌ Typ 0 → Typ 2 |
| ✅ Typ 1 → Typ 2 | ❌ Typ 1 → Typ 0 |
|  | ❌ Typ 2 → Typ 1 |
|  | ❌ Typ 2 → Typ 0 |

### Risiken {#risks}

MaxEB ermöglicht es einem Validator, sein gesamtes Guthaben an einen anderen Validator zu senden. Benutzer, die eine Konsolidierungsanfrage einreichen, sollten die Quelle und den Inhalt der Transaktion überprüfen, die sie signieren. Das offizielle Tool zur Nutzung der maxEB-Funktionen ist das Launchpad. Wenn du dich entscheidest, ein Drittanbieter-Tool zu verwenden, solltest du überprüfen, ob:

- Der öffentliche Schlüssel (Pubkey) und die Abhebungsadresse des Quell-Validators mit dem Validator übereinstimmen, den sie kontrollieren
- Der öffentliche Schlüssel des Ziel-Validators korrekt ist und ihnen gehört
- Die Anfrage eine Umwandlung und keine Konsolidierung ist, wenn sie nicht beabsichtigen, Gelder an einen anderen Validator zu senden
- Die Transaktion von der korrekten Abhebungsadresse signiert wird

Wir **empfehlen dringend**, jedes Drittanbieter-Tool, das du verwenden möchtest, mit der [EthStaker-Community](https://ethstaker.org/about) zu besprechen. Es ist ein hilfreicher Ort, um dein Vorgehen auf Plausibilität zu prüfen und Fehler zu vermeiden. Wenn du ein bösartiges oder falsch konfiguriertes Tool verwendest, **könnte dein gesamtes Validator-Guthaben an einen Validator gesendet werden, den du nicht kontrollierst** – ohne Möglichkeit, es zurückzubekommen.

## Technische Details {#technical-details}

### Der Ablauf {#the-flow}

Es wird zwei Anwendungsfälle für die `ConsolidationRequest`-Operation geben:

1. Umwandlung eines bestehenden Validators von einem **Typ-1**- zu einem **Typ-2**-Validator
2. Konsolidierung anderer Validatoren in einen bestehenden **Typ-2**-Validator

Bei einer Umwandlung eines **Typ-1**- in einen **Typ-2**-Validator sind sowohl *Quelle* als auch *Ziel* der Validator, den du umwandelst. Die Operation kostet Gas und wird hinter anderen Konsolidierungsanfragen in eine Warteschlange eingereiht. Diese Warteschlange ist **getrennt** von der Einzahlungs-Warteschlange, wird nicht von neuen Validator-Einzahlungen beeinflusst und kann auf [pectrified.com](https://pectrified.com/) eingesehen werden.

Um Validatoren zu konsolidieren, musst du einen *Ziel-Validator* haben, der über eine Auszahlungsberechtigung vom **Typ 2** verfügt. Dies ist das Ziel aller Validator-Guthaben, die konsolidiert werden, und der Index, der erhalten bleibt.

### Voraussetzungen für die Umwandlung in Typ 2 {#requirements-for-converting-to-type-2}

Dies ist für den ersten Validator erforderlich, den du in **Typ 2** umwandelst. Der Index dieses Validators bleibt erhalten und aktiv. Bei einer Umwandlung gilt: *Quell-Validator* == *Ziel-Validator*.

Der Validator muss...

- aktiv sein
- Auszahlungsberechtigungen vom **Typ 1** haben
- sich nicht in einem Austritts-Zustand befinden (oder vom Slashing betroffen sein)
- keine ausstehenden manuell ausgelösten Abhebungen haben (gilt nicht für automatische Sweeps)

![conversion illustration](./conversion.png)

### Voraussetzungen für die Konsolidierung {#requirements-for-consolidating}

Dies ist die *gleiche Operation* wie die Umwandlung, jedoch unterscheidet sich hier der *Quell-Validator* vom *Ziel-Validator*. Der Index des Ziel-Validators bleibt erhalten und nimmt das Guthaben des Quell-Validators auf. Der Index des Quell-Validators wird in einen `EXITED`-Zustand versetzt.

In diesem Fall hat der Quell-Validator alle oben genannten Voraussetzungen plus:

- er war für mindestens ~27,3 Stunden aktiv (eine `SHARD_COMMITTEE_PERIOD`)

Der Ziel-Validator muss

- Auszahlungsberechtigungen vom **Typ 2** haben
- sich nicht in einem Austritts-Zustand befinden.

![consolidation illustration](./consolidation.png)

### Die Konsolidierungsanfrage {#the-consolidation-request}

Die Konsolidierungsanfrage wird von der Abhebungsadresse signiert, die mit dem Quell-Validator verknüpft ist, und enthält:

1. Adresse des Quell-Validators (z. B. `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Öffentlicher Schlüssel des Quell-Validators (z. B. `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Öffentlicher Schlüssel des Ziel-Validators

Bei einer Umwandlung sind 2 und 3 identisch. Diese Operation kann auf [dem Launchpad](https://launchpad.ethereum.org/) durchgeführt werden.

### Signaturanforderungen {#signing-requirements}

Um eine `ConsolidationRequest` einzureichen, muss die **Abhebungsadresse des Quell-Validators** die Anfrage signieren. Dies beweist die Kontrolle über die Validator-Gelder.

### Was wird signiert? {#what-is-signed}

Es wird eine domänengetrennte [Signing Root](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root) des `ConsolidationRequest`-Objekts verwendet.

- **Domäne:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Felder der Signing Root:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

Die resultierende **BLS-Signatur** wird zusammen mit der Anfrage eingereicht.

Hinweis: Das Signieren erfolgt durch die Abhebungsadresse, nicht durch den Validator-Schlüssel.

### Teilweise Abhebungen {#partial-withdrawals}

Validatoren mit Berechtigungen vom **Typ 1** erhalten automatische, gasfreie Sweeps ihres überschüssigen Guthabens (alles über 32 ETH) an ihre Abhebungsadresse. Da **Typ 2** es einem Validator ermöglicht, Guthaben in Schritten von 1 ETH zu verzinsen (Compounding), werden Guthaben nicht automatisch gesweept, bis 2048 ETH erreicht sind. Teilweise Abhebungen bei **Typ-2**-Validatoren müssen manuell ausgelöst werden und kosten Gas.

## Konsolidierungs-Tools {#consolidation-tooling}

Es stehen mehrere Tools zur Verwaltung von Konsolidierungen zur Verfügung. Das offizielle Tool, das von der Ethereum Foundation erstellt wurde, ist das [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Es gibt auch Drittanbieter-Tools, die von Akteuren aus der Staking-Community erstellt wurden und möglicherweise Funktionen bieten, die das Launchpad nicht bereitstellt. Obwohl die hier aufgeführten Tools nicht von der Ethereum Foundation geprüft oder unterstützt werden, handelt es sich bei den folgenden um Open-Source-Tools von bekannten Mitgliedern der Community.

| Tool | Website | Open Source | Ersteller | Geprüft | Schnittstelle | Besondere Funktionen |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Ja, Apache 2.0 | [Pier Two](https://piertwo.com/) | Nein | Web-UI | WalletConnect, funktioniert mit SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Ja, MIT | [Luganodes](https://www.luganodes.com/) | Ja, Quantstamp [Mai 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Kommandozeile | Bündelung, für viele Validatoren auf einmal |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Ja, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Nein | Kommandozeile | Vollständiger Funktionsumfang für Validator- und Knoten-Verwaltung |
| Siren | [GitHub](https://github.com/sigp/siren) | Ja, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | Nein | Teilweise Kommandozeile, aber primär Web-UI | Funktioniert nur, wenn du den Lighthouse-Konsens-Client verwendest |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Ja, MIT-Lizenzen | [Stakely](https://stakely.io/) | Nein | Web-UI, gehostet von Stakely und bereit zum kostenlosen Self-Hosting | Unterstützt wichtige Wallet-Verbindungen, einschließlich Safe mit WalletConnect |

## FAQ {#faq}

### Ändert die Teilnahme mein Vorschlags-Glück oder meine Belohnungen? {#change-luck-or-rewards}

Nein. Die Teilnahme verringert nicht deine Chance auf einen Vorschlag – deine Aufgaben und die Vorschlagsauswahl bleiben gleich. Wenn du beispielsweise zwei 32-ETH-Validatoren im Vergleich zu einem 64-ETH-Validator hast, hast du insgesamt die gleichen Chancen, ausgewählt zu werden, um einen Block vorzuschlagen und Belohnungen zu verdienen.

### Ändert die Teilnahme mein Slashing-Risiko? {#change-slashing-risk}

Für kleinere oder nicht-professionelle Betreiber lautet die kurze Antwort: Nein. Die längere Antwort ist, dass für professionelle Betreiber, die viele Validatoren pro Knoten mit schnellen Warnsystemen betreiben, die Konsolidierung in weniger Validatoren ihre Fähigkeit verringern kann, auf ein Slashing zu reagieren und Kaskadenereignisse zu verhindern. Die anfängliche Slashing-*Strafe* für alle Validatoren wurde drastisch von 1 ETH (pro 32 ETH) auf 0,0078125 ETH (pro 32 ETH) reduziert, um dieses Risiko auszugleichen.

### Muss ich mit meinem Validator austreten, um ihn umzuwandeln? {#exit-validator}

Nein. Du kannst ihn direkt umwandeln, ohne einen Austritt durchzuführen.

### Wie lange dauert die Umwandlung / Konsolidierung? {#how-long}

Mindestens 27,3 Stunden, aber Konsolidierungen unterliegen auch einer Warteschlange. Diese Warteschlange ist unabhängig von den Einzahlungs- und Abhebungs-Warteschlangen und wird von diesen nicht beeinflusst.

### Kann ich meinen Validator-Index behalten? {#keep-validator-index}

Ja. Bei der direkten Umwandlung bleibt derselbe Validator-Index erhalten. Wenn du mehrere Validatoren konsolidierst, kannst du nur den Index des *Ziel-Validators* behalten.

### Werde ich Attestierungen verpassen? {#miss-attestations}

Während einer Konsolidierung in einen anderen Validator tritt der Quell-Validator aus und es gibt eine Wartezeit von ca. 27 Stunden, bevor das Guthaben auf dem Ziel-Validator aktiv ist. Dieser Zeitraum **wirkt sich nicht auf die Leistungskennzahlen aus**.

### Werden mir Strafen auferlegt? {#incur-penalties}

Nein. Solange dein Validator online ist, werden dir keine Strafen auferlegt.

### Müssen die Abhebungsadressen der zu konsolidierenden Validatoren übereinstimmen? {#withdrawal-addresses-match}

Nein. Aber die *Quelle* muss die Anfrage von ihrer eigenen Adresse aus autorisieren.

### Werden meine Belohnungen nach der Umwandlung verzinst (Compounding)? {#rewards-compound}

Ja. Mit Berechtigungen vom **Typ 2** werden Belohnungen über 32 ETH automatisch erneut gestakt (Restaking) – aber nicht sofort. Aufgrund eines kleinen Puffers (genannt [*Hysterese*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)) muss dein Guthaben **etwa 1,25 ETH mehr** erreichen, bevor der Überschuss erneut gestakt wird. Anstatt also bei 33,0 ETH zu verzinsen, geschieht dies bei 33,25 (effektives Guthaben = 33 ETH), dann bei 34,25 (effektives Guthaben = 34 ETH) und so weiter.

### Kann ich nach der Umwandlung noch automatische Sweeps erhalten? {#automatic-sweep}

Automatische Sweeps erfolgen nur bei überschüssigen Guthaben über 2048. Alle anderen teilweisen Abhebungen musst du manuell auslösen.

### Kann ich meine Meinung ändern und von Typ 2 zu Typ 1 zurückkehren? {#go-back-to-type1}

Nein. Die Umwandlung in **Typ 2** ist irreversibel.

### Wenn ich mehrere Validatoren konsolidieren möchte, muss ich dann jeden zuerst in Typ 2 umwandeln? {#consolidate-multiple-validators}

Nein! Wandle einen Validator in Typ 2 um und verwende diesen dann als Ziel. Alle anderen Validatoren, die in dieses Typ-2-Ziel konsolidiert werden, können Typ 1 oder Typ 2 sein.

### Mein Validator ist offline oder unter 32 ETH – kann ich ihn trotzdem umwandeln? {#offline-or-below-32eth}

Ja. Solange er aktiv ist (kein Austritt erfolgt ist) und du mit seiner Abhebungsadresse signieren kannst, kannst du ihn umwandeln.

## Ressourcen {#resources}

- [Electra-Konsens-Spezifikationen](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): Dies ist die „wahrste“ Version, auf die du dich verlassen solltest. Im Zweifelsfall lies die Spezifikationen.
- Nicht jeder wühlt sich gerne durch Code, daher kann [dieser maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) bei der Interpretation der Spezifikationen helfen. *Haftungsausschluss: Man sollte sich auf die Spezifikationen und nicht auf die KI als Wahrheit verlassen, da die KI Informationen falsch interpretieren oder Antworten halluzinieren kann.*
- [pectrified.com](https://pectrified.com/): Sieh dir den Status von Konsolidierungen, Einzahlungen und Wartezeiten in der Warteschlange an.
- [Ethereal](https://github.com/wealdtech/ethereal): Von der Community erstelltes CLI-Tool zur Verwaltung gängiger Validator-Aufgaben.
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Von der Community erstellter Vertrag, der es ermöglicht, Einzahlungen für mehrere Ethereum-Validatoren in einer einzigen Transaktion vorzunehmen.