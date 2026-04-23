---
title: "Schlüssel im Proof-of-Stake-Ethereum"
description: "Eine Erklärung der Schlüssel, die im Proof-of-Stake-Konsensmechanismus von Ethereum verwendet werden"
lang: de
---

Ethereum sichert die Vermögenswerte der Benutzer mithilfe von Public-Key- und Private-Key-Kryptografie. Der Public-Key wird als Basis für eine Ethereum-Adresse verwendet – das heißt, er ist für die Allgemeinheit sichtbar und dient als eindeutiger Identifikator. Der Private-Key (oder „geheime“ Schlüssel) sollte immer nur für den Inhaber eines Kontos zugänglich sein. Der Private-Key wird verwendet, um Transaktionen und Daten zu „signieren“, sodass die Kryptografie beweisen kann, dass der Inhaber eine bestimmte Aktion eines spezifischen Private-Keys genehmigt.

Die Schlüssel von Ethereum werden mithilfe von [Kryptografie auf Basis elliptischer Kurven](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) generiert.

Als Ethereum jedoch von [Proof-of-Work](/developers/docs/consensus-mechanisms/pow) zu [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) wechselte, wurde Ethereum ein neuer Schlüsseltyp hinzugefügt. Die ursprünglichen Schlüssel funktionieren immer noch genau wie zuvor – es gab keine Änderungen an den auf elliptischen Kurven basierenden Schlüsseln, die Konten sichern. Benutzer benötigten jedoch einen neuen Schlüsseltyp, um am Proof-of-Stake teilzunehmen, indem sie ETH staken und Validatoren betreiben. Dieser Bedarf entstand aus Skalierbarkeitsherausforderungen im Zusammenhang mit vielen Nachrichten, die zwischen einer großen Anzahl von Validatoren ausgetauscht wurden. Dies erforderte eine kryptografische Methode, die leicht aggregiert werden konnte, um die Menge an Kommunikation zu reduzieren, die erforderlich ist, damit das Netzwerk zu einem Konsens kommt.

Dieser neue Schlüsseltyp verwendet das [**Boneh-Lynn-Shacham (BLS)**-Signaturschema](https://wikipedia.org/wiki/BLS_digital_signature). BLS ermöglicht eine sehr effiziente Aggregation von Signaturen, erlaubt aber auch das Reverse Engineering von aggregierten individuellen Validator-Schlüsseln und ist ideal für die Verwaltung von Aktionen zwischen Validatoren.

## Die zwei Arten von Validator-Schlüsseln {#two-types-of-keys}

Vor dem Wechsel zu Proof-of-Stake hatten Ethereum-Benutzer nur einen einzigen auf elliptischen Kurven basierenden Private-Key, um auf ihre Gelder zuzugreifen. Mit der Einführung von Proof-of-Stake benötigten Benutzer, die Solo-Staker sein wollten, auch einen **Validator-Schlüssel** und einen **Auszahlungsschlüssel**.

### Der Validator-Schlüssel {#validator-key}

Der Validator-Signaturschlüssel besteht aus zwei Elementen:

- **Private-Key** des Validators
- **Public-Key** des Validators

Der Zweck des Private-Keys des Validators besteht darin, Operationen auf der Blockchain wie Blockvorschläge und Bestätigungen zu signieren. Aus diesem Grund müssen diese Schlüssel in einem Hot-Wallet aufbewahrt werden.

Diese Flexibilität hat den Vorteil, dass Validator-Signaturschlüssel sehr schnell von einem Gerät auf ein anderes übertragen werden können. Wenn sie jedoch verloren gehen oder gestohlen werden, kann ein Dieb auf verschiedene Weise **böswillig handeln**:

- Ein Slashing des Validators verursachen, indem er:
  - Als Vorschlagender agiert und zwei verschiedene Beacon-Blöcke für denselben Slot signiert
  - Als Bestätigender agiert und eine Bestätigung signiert, die eine andere „umschließt“
  - Als Bestätigender agiert und zwei verschiedene Bestätigungen mit demselben Ziel signiert
- Einen freiwilligen Ausstieg erzwingen, was den Validator vom Staking abhält und dem Besitzer des Auszahlungsschlüssels Zugriff auf sein ETH-Guthaben gewährt

Der **Public-Key des Validators** ist in den Transaktionsdaten enthalten, wenn ein Benutzer ETH in den Staking-Einzahlungsvertrag einzahlt. Dies wird als _Einzahlungsdaten_ bezeichnet und ermöglicht es Ethereum, den Validator zu identifizieren.

### Auszahlungsberechtigungen {#withdrawal-credentials}

Jeder Validator hat eine Eigenschaft, die als _Auszahlungsberechtigungen_ (Withdrawal Credentials) bekannt ist. Das erste Byte dieses 32-Byte-Feldes identifiziert den Kontotyp: `0x00` steht für ursprüngliche BLS-Berechtigungen (vor Shapella, nicht auszahlbar), `0x01` steht für Legacy-Berechtigungen, die auf eine Ausführungsadresse verweisen, und `0x02` steht für den modernen Compounding-Berechtigungstyp.

Validatoren mit `0x00` BLS-Schlüsseln müssen diese Berechtigungen aktualisieren, damit sie auf eine Ausführungsadresse verweisen, um Zahlungen von Überschussguthaben oder die vollständige Auszahlung aus dem Staking zu aktivieren. Dies kann erfolgen, indem während der anfänglichen Schlüsselgenerierung eine Ausführungsadresse in den Einzahlungsdaten angegeben wird, _ODER_ indem der Auszahlungsschlüssel zu einem späteren Zeitpunkt verwendet wird, um eine `BLSToExecutionChange`-Nachricht zu signieren und zu übertragen.

[Mehr zu den Auszahlungsberechtigungen von Validatoren](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Der Auszahlungsschlüssel {#withdrawal-key}

Der Auszahlungsschlüssel wird benötigt, um die Auszahlungsberechtigungen so zu aktualisieren, dass sie auf eine Ausführungsadresse verweisen, falls dies nicht während der anfänglichen Einzahlung festgelegt wurde. Dies ermöglicht den Beginn der Verarbeitung von Überschussguthabenzahlungen und erlaubt es Benutzern auch, ihre gestakten ETH vollständig abzuheben.

Genau wie die Validator-Schlüssel bestehen auch die Auszahlungsschlüssel aus zwei Komponenten:

- **Private-Key** für die Auszahlung
- **Public-Key** für die Auszahlung

Der Verlust dieses Schlüssels vor der Aktualisierung der Auszahlungsberechtigungen auf den Typ `0x01` bedeutet den Verlust des Zugriffs auf das Validator-Guthaben. Der Validator kann weiterhin Bestätigungen und Blöcke signieren, da diese Aktionen den Private-Key des Validators erfordern. Es gibt jedoch wenig bis gar keinen Anreiz dafür, wenn die Auszahlungsschlüssel verloren gegangen sind.

Die Trennung der Validator-Schlüssel von den Ethereum-Kontoschlüsseln ermöglicht es einem einzelnen Benutzer, mehrere Validatoren zu betreiben.

![validator key schematic](validator-key-schematic.png)

**Hinweis**: Der Ausstieg aus den Staking-Pflichten und die Auszahlung des Guthabens eines Validators erfordern derzeit die Signierung einer [freiwilligen Ausstiegsnachricht (Voluntary Exit Message, VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) mit dem Validator-Schlüssel. [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) ist jedoch ein Vorschlag, der es einem Benutzer in Zukunft ermöglichen wird, den Ausstieg eines Validators auszulösen und sein Guthaben abzuheben, indem er Ausstiegsnachrichten mit dem Auszahlungsschlüssel signiert. Dies wird Vertrauensannahmen reduzieren, indem es Stakern, die ETH an [Staking-as-a-Service-Anbieter](/staking/saas/#what-is-staking-as-a-service) delegieren, ermöglicht, die Kontrolle über ihre Gelder zu behalten.

## Ableiten von Schlüsseln aus einer Seed-Phrase {#deriving-keys-from-seed}

Wenn für jede 32 gestakten ETH ein neues Set von 2 völlig unabhängigen Schlüsseln erforderlich wäre, würde die Schlüsselverwaltung schnell unhandlich werden, insbesondere für Benutzer, die mehrere Validatoren betreiben. Stattdessen können mehrere Validator-Schlüssel aus einem einzigen gemeinsamen Geheimnis abgeleitet werden, und die Speicherung dieses einzigen Geheimnisses ermöglicht den Zugriff auf mehrere Validator-Schlüssel.

[Mnemonics](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) und Pfade sind prominente Merkmale, auf die Benutzer oft stoßen, wenn [sie auf ihre Wallets zugreifen](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0). Die Mnemonic ist eine Wortfolge, die als anfänglicher Seed für einen Private-Key dient. In Kombination mit zusätzlichen Daten generiert die Mnemonic einen Hash, der als „Master-Schlüssel“ bekannt ist. Dies kann man sich als die Wurzel eines Baumes vorstellen. Zweige von dieser Wurzel können dann über einen hierarchischen Pfad abgeleitet werden, sodass Kindknoten als Kombinationen aus dem Hash ihres Elternknotens und ihrem Index im Baum existieren können. Lesen Sie mehr über die Standards [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) und [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) für die Mnemonic-basierte Schlüsselgenerierung.

Diese Pfade haben die folgende Struktur, die Benutzern vertraut sein wird, die bereits mit Hardware-Wallets interagiert haben:

```
m/44'/60'/0'/0`
```

Die Schrägstriche in diesem Pfad trennen die Komponenten des Private-Keys wie folgt:

```
master_key / purpose / coin_type / account / change / address_index
```

Diese Logik ermöglicht es Benutzern, so viele Validatoren wie möglich an eine einzige **Mnemonic-Phrase** anzuhängen, da die Baumwurzel gemeinsam sein kann und die Unterscheidung an den Zweigen erfolgen kann. Der Benutzer kann **eine beliebige Anzahl von Schlüsseln** aus der Mnemonic-Phrase ableiten.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Jeder Zweig ist durch ein `/` getrennt, sodass `m/2` bedeutet, mit dem Master-Schlüssel zu beginnen und Zweig 2 zu folgen. Im untenstehenden Schema wird eine einzige Mnemonic-Phrase verwendet, um drei Auszahlungsschlüssel zu speichern, denen jeweils zwei Validatoren zugeordnet sind.

![validator key logic](multiple-keys.png)

## Weiterführende Literatur {#further-reading}

- [Blogbeitrag der Ethereum Foundation von Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys)
- [EIP-2333 BLS12-381 Schlüsselgenerierung](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Durch die Ausführungsebene ausgelöste Ausstiege](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Schlüsselverwaltung im großen Maßstab](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)