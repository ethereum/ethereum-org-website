---
title: Schlüssel im Proof-of-Stake-System auf Ethereum
description: Eine Erklärung der Schlüssel, die im Proof-of-Stake-Konsensmechanismus auf Ethereum verwendet werden
lang: de
---

Ethereum sichert die Assets der Benutzer durch Verschlüsselung auf Basis öffentlicher/privater Schlüssel ab. Der öffentliche Schlüssel wird als Basis für eine Ethereum-Adresse verwendet – das bedeutet, dass er für die Allgemeinheit sichtbar ist und als einzigartiger Identifikator verwendet wird. Der private (oder „geheime“) Schlüssel sollte immer nur für den Kontoinhaber zugänglich sein. Der private Schlüssel wird dazu genutzt, Transaktionen und Daten zu „signieren“, sodass kryptographisch nachgewiesen werden kann, dass der Inhaber die Aktion eines bestimmten privaten Schlüssels genehmigt.

Ethereums Schlüssel werden mit Hilfe der [elliptischen Kurvenkryptografie](https://de.wikipedia.org/wiki/Elliptic-curve_cryptography) erzeugt.

Als Ethereum jedoch von [Proof-of-Work](/developers/docs/consensus-mechanisms/pow) zu [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) wechselte, wurde eine neue Art von Schlüssel zu Ethereum hinzugefügt. Die ursprünglichen Schlüssel funktionieren immer noch genauso wie zuvor – es gab keine Änderungen an den elliptischen kurvenbasierten Schlüsseln, die die Konten sichern. Jedoch benötigten die Benutzer einen neuen Typ von Schlüssel, um am Proof-of-Stake-Mechanismus teilzunehmen, ETH einzusetzen und Validatoren zu betreiben. Dieses Bedürfnis entstand aus Skalierbarkeitsproblemen, die damit verbunden waren, dass viele Nachrichten zwischen einer großen Anzahl von Validatoren ausgetauscht wurden. Hierfür war eine kryptographische Methode erforderlich, die leicht aggregiert werden konnte, um den für das Erreichen eines Konsenses erforderlichen Kommunikationaufwand zu reduzieren.

Dieser neue Schlüsseltyp verwendet das Signaturschema [**Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS ermöglicht eine sehr effiziente Aggregation von Signaturen, erlaubt aber auch das Reverse Engineering von aggregierten individuellen Validatorenschlüsseln und ist ideal für die Verwaltung von Aktionen zwischen Validatoren.

## Die beiden Arten von Validatorenschlüsseln {#two-types-of-keys}

Vor dem Wechsel zu Proof-of-Stake verfügten Ethereum-Benutzer nur über einen einzigen auf einer elliptischen Kurve basierenden privaten Schlüssel, mit dem sie auf ihre Geldmittel zugreifen konnten. Mit der Einführung von Proof-of-Stake brauchten Benutzer, die Solo-Staker sein wollten, auch einen **Validatorenschlüssel** und einen **Auszahlungsschlüssel**.

### Der Validatorenschlüssel {#validator-key}

Der Schlüssel für die Validatorensignatur besteht aus zwei Elementen:

- dem **privaten** Schlüssel des Validatoren
- dem **öffentlichen** Schlüssel des Validatoren

Der Zweck eines privaten Validatorenschlüssel ist es, On-Chain-Operationen wie zum Beispiel Block-Proposals und Attestierungen zu signieren. Deshalb müssen diese Schlüssel in einer Hot Wallet gehalten werden.

Diese Flexibilität hat den Vorteil, dass sich die Signaturschlüssel für Validatoren sehr schnell von einem zum anderen Gerät transferieren lassen. Sollten sie allerdings verloren gehen oder gestohlen werden, könnte ein Dieb auf mehrere Arten **böswillig handeln**:

- Bestrafung des Validatoren mit Slashing, indem er:
  - ein Proposer ist und zwei unterschiedliche Beacon-Blöcke für denselben Slot signiert
  - ein Attestierer ist und eine Attestierung, die eine andere „umgibt“, signiert
  - ein Attestierer ist und zwei unterschiedliche Attestierungen mit demselben Ziel signiert
- Erzwingen eines freiwilligen Austritts, was den Validatoren vom Staking anhält und dem Besitzer des Auszahlungsschlüssel Zugriff auf sein ETH-Guthaben gewährt

Der **öffentliche Schlüssel des Validatoren** ist in den Transaktionsdaten enthalten, wenn ein Benutzer ETH in den Staking-Einzahlungsvertrag transferiert. Diese Daten sind als _Einzahlungsdaten_ bekannt. Mit ihnen kann Ethereum den Validatoren identifizieren.

### Zugangsdaten für die Auszahlung {#withdrawal-credentials}

Jeder Validator hat eine Eigenschaft, bekannt als _Zugangsdaten für die Auszahlung_. Dieses 32-Byte-Feld beginnt entweder mit `0x00`, was BLS-Zugangsdaten für die Auszahlung repräsentiert, oder `0x01`, wobei es sich um Zugangsdaten handelt, die sich auf eine Ausführungsadresse beziehen.

Validatoren mit `0x00`-BLS-Schlüsseln müssen diese Zugangsdaten aktualisieren, damit auf eine Auszahlungsadresse verwiesen wird und überschüssige Zahlungen für ihr Guthaben oder vollständige Auszahlungen von Staking-Beträgen aktiviert werden können. Dies lässt sich erreichen, indem während der ersten Schlüsselgeneration eine Ausführungsadresse in den Einzahlungsdaten bereitstellt wird _ODER_, indem der Auszahlungsschlüssel zu einem späteren Zeitpunkt verwendet wird, um eine `BLSToExecutionChange`-Nachricht zu signieren und zu übertragen.

### Der Auszahlungsschlüssel {#withdrawal-key}

Der Auszahlungsschlüssel wird zur Aktualisierung der Zugangsdaten für die Auszahlung benötigt, um auf eine Ausführungsadresse zu verweisen, falls die nicht während der ersten Einzahlung festgelegt wurde. Dies ermöglicht die allmähliche Bearbeitung von überschüssigen Guthabenauszahlungen und das vollständige Abheben der eingesetzten ETH durch die jeweiligen Benutzer.

Genau wie die Validatorenschlüssel setzen sich die Auszahlungsschlüssel auch aus zwei Komponenten zusammen:

- **Privater** Auszahlungsschlüssel
- **Öffentlicher** Auszahlungsschlüssel

Ein Verlust dieses Schlüssel, bevor die Zugangsdaten für die Auszahlung auf `0x01`-Typ aktualisiert wurden, ist gleichbedeutend mit dem Verlust des Zugriffs auf das Validatorenguthaben. Der Validator kann immer noch Attestierungen und Blöcke signieren, da für diese Aktionen der private Schlüssel des Validatoren erforderlich ist. Hierfür gibt es aber wenig bis keine Anreize, sollten die Auszahlungsschlüssel verloren gegangen sein.

Eine Trennung der Schlüssel der Validatoren von denen des Ethereum-Kontos ermöglicht das Betreiben mehrerer Validatoren durch einen einzigen Benutzer.

![Schema der Schlüssel für Validatoren](validator-key-schematic.png)

## Schlüssel aus einer Seed Phrase ableiten {#deriving-keys-from-seed}

Wenn für jede 32 eingesetzten ETH ein neues Set von zwei komplett unabhängigen Schlüsseln erforderlich wäre, würde die Schlüsselverwaltung schnell sehr unübersichtlich werden, besonders für Benutzer, die mehrere Validatoren ausführen. Stattdessen lassen sich mehrere Validatorenschlüssel von einem einzelnen gemeinsamen Geheimnis ableiten und das Speichern dieses Geheimnisses ermöglicht den Zugriff auf mehrere Validatorenschlüssel.

[Mnemoniken](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) und Pfade sind wichtige Funktionen, mit denen Benutzer oft zu tun haben, wenn [sie auf ihre Wallets zugreifen](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0). Die Mnemonik ist eine Sequenz von Wörtern, die als erster Seed für einen privaten Schlüssel dienen. Durch Kombination mit zusätzlichen kann die Mnemonik einen Hash, bekannt als der „Master Key“, generieren. Das kann man sich wie die Wurzeln eines Baums vorstellen. Abzweigungen dieser Wurzeln lassen sich mithilfe eines hierarchischen Pfads ableiten, sodass Child Nodes als Kombinationen aus dem Hash der Parent Nodes und dem Index im Baum existieren können. Lesen Sie mehr zu [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) und [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)-Standards für die mnemonikbasierte Schlüsselerstellung.

Diese Pfade haben die folgende Struktur. Nutzer, die mit Hardware-Wallets interagiert haben, sollte sie bekannt vorkommen:

```
m/44'/60'/0'/0`
```

Die Schrägstriche in diesem Weg trennen Komponenten des privaten Schlüssels wie folgt:

```
master_key / purpose / coin_type / account / change / address_index
```

Diese Logik ermöglicht es Benutzern, so viele Validatoren wie möglich an eine einzige **mnemonische Phrase** anzuhängen, da die Tree Root gewöhnlich sein kann und es an den Branches zur Differenzierung kommen kann. Der Benutzer kann **eine beliebige Anzahl von Schlüsseln** von der mnemonischen Phrase ableiten.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Jeder Branch ist durch einen `/` separiert, deshalb bedeutet `m/2`, dass Sie mit dem Master Key beginnen und dem zweiten Branch folgen. Im Schema unten kommt eine einzige mnemonische Phrase zum Einsatz, um drei Auszahlungsschlüssel mit jeweils zwei zugehörigen Validatoren zu speichern.

![Logik für Validatorenschlüssel](multiple-keys.png)

## Weiterführende Informationen {#further-reading}

- [Blogbeitrag der Ethereum Foundation von Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys/)
- [Schlüsselerzeugung EIP-2333 BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
