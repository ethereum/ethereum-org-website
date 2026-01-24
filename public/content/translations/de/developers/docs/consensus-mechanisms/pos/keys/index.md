---
title: "Schlüssel im Proof-of-Stake-System auf Ethereum"
description: "Eine Erklärung der Schlüssel, die im Proof-of-Stake-Konsensmechanismus auf Ethereum verwendet werden"
lang: de
---

Ethereum sichert die Assets der Benutzer durch Verschlüsselung auf Basis öffentlicher/privater Schlüssel ab. Der öffentliche Schlüssel wird als Basis für eine Ethereum-Adresse verwendet – das bedeutet, dass er für die Allgemeinheit sichtbar ist und als einzigartiger Identifikator verwendet wird. Der private (oder „geheime“) Schlüssel sollte immer nur für den Kontoinhaber zugänglich sein. Der private Schlüssel wird dazu genutzt, Transaktionen und Daten zu „signieren“, sodass kryptographisch nachgewiesen werden kann, dass der Inhaber die Aktion eines bestimmten privaten Schlüssels genehmigt.

Ethereums Schlüssel werden mittels [elliptischer-Kurven-Kryptographie](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) generiert.

Als Ethereum jedoch von [Proof-of-Work](/developers/docs/consensus-mechanisms/pow) auf [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos) umstellte, wurde Ethereum eine neue Art von Schlüssel hinzugefügt. Die ursprünglichen Schlüssel funktionieren immer noch genauso wie zuvor – es gab keine Änderungen an den elliptischen kurvenbasierten Schlüsseln, die die Konten sichern. Jedoch benötigten die Benutzer einen neuen Typ von Schlüssel, um am Proof-of-Stake-Mechanismus teilzunehmen, ETH einzusetzen und Validatoren zu betreiben. Dieses Bedürfnis entstand aus Skalierbarkeitsproblemen, die damit verbunden waren, dass viele Nachrichten zwischen einer großen Anzahl von Validatoren ausgetauscht wurden. Hierfür war eine kryptographische Methode erforderlich, die leicht aggregiert werden konnte, um den für das Erreichen eines Konsenses erforderlichen Kommunikationaufwand zu reduzieren.

Diese neue Art von Schlüssel verwendet das [\*\*Boneh-Lynn-Shacham-(BLS-)\*\*Signaturschema](https://wikipedia.org/wiki/BLS_digital_signature). BLS ermöglicht eine sehr effiziente Aggregation von Signaturen, erlaubt aber auch das Reverse Engineering von aggregierten individuellen Validatorenschlüsseln und ist ideal für die Verwaltung von Aktionen zwischen Validatoren.

## Die zwei Arten von Validator-Schlüsseln {#two-types-of-keys}

Vor dem Wechsel zu Proof-of-Stake verfügten Ethereum-Benutzer nur über einen einzigen auf einer elliptischen Kurve basierenden privaten Schlüssel, mit dem sie auf ihre Geldmittel zugreifen konnten. Mit der Einführung von Proof-of-Stake benötigten Benutzer, die Solo-Staker sein wollten, auch einen **Validator-Schlüssel** und einen **Auszahlungsschlüssel**.

### Der Validator-Schlüssel {#validator-key}

Der Schlüssel für die Validatorensignatur besteht aus zwei Elementen:

- **Privater** Validator-Schlüssel
- **Öffentlicher** Validator-Schlüssel

Die Aufgabe des privaten Validator-Schlüssels besteht darin, On-Chain-Operationen wie Block Proposals und Attestations zu signieren. Deshalb müssen diese Schlüssel in einer Hot Wallet gehalten werden.

Diese Flexibilität hat den Vorteil, dass sich die Signaturschlüssel für Validatoren sehr schnell von einem Gerät zum anderen transferieren lassen. Sollten sie allerdings verloren gehen oder gestohlen werden, könnte ein Dieb auf verschiedene Weisen **böswillig handeln**:

- Bestrafung des Validatoren mit Slashing, indem er:
  - ein Proposer ist und zwei unterschiedliche Beacon-Blöcke für denselben Slot signiert
  - ein Attestierer ist und eine Attestierung, die eine andere „umgibt“, signiert
  - ein Attestierer ist und zwei unterschiedliche Attestierungen mit demselben Ziel signiert
- Erzwingen eines freiwilligen Austritts, was den Validatoren vom Staking anhält und dem Besitzer des Auszahlungsschlüssel Zugriff auf sein ETH-Guthaben gewährt

Der **öffentliche Validator-Schlüssel** ist in den Transaktionsdaten enthalten, wenn ein Benutzer ETH in den Staking-Einzahlungsvertrag einzahlt. Dies wird als _Einzahlungsdaten_ bezeichnet und ermöglicht es Ethereum, den Validator zu identifizieren.

### Auszahlungs-Zugangsdaten {#withdrawal-credentials}

Jeder Validator hat eine Eigenschaft, die als _Auszahlungs-Zugangsdaten_ bezeichnet wird. Dieses 32-Byte-Feld beginnt entweder mit `0x00`, das für BLS-Auszahlungs-Zugangsdaten steht, oder mit `0x01`, das für Zugangsdaten steht, die auf eine Ausführungsadresse verweisen.

Validatoren mit `0x00` BLS-Schlüsseln müssen diese Zugangsdaten aktualisieren, damit sie auf eine Ausführungsadresse verweisen, um Auszahlungen von überschüssigem Guthaben oder die vollständige Auszahlung vom Staking zu aktivieren. Dies kann geschehen, indem bei der erstmaligen Schlüsselgenerierung eine Ausführungsadresse in den Einzahlungsdaten angegeben wird _ODER_ indem der Auszahlungsschlüssel zu einem späteren Zeitpunkt verwendet wird, um eine `BLSToExecutionChange`-Nachricht zu signieren und zu senden.

### Der Auszahlungsschlüssel {#withdrawal-key}

Der Auszahlungsschlüssel wird zur Aktualisierung der Zugangsdaten für die Auszahlung benötigt, um auf eine Ausführungsadresse zu verweisen, falls die nicht während der ersten Einzahlung festgelegt wurde. Dies ermöglicht die allmähliche Bearbeitung von überschüssigen Guthabenauszahlungen und das vollständige Abheben der eingesetzten ETH durch die jeweiligen Benutzer.

Genau wie die Validatorenschlüssel setzen sich die Auszahlungsschlüssel auch aus zwei Komponenten zusammen:

- **Privater** Auszahlungsschlüssel
- **Öffentlicher** Auszahlungsschlüssel

Der Verlust dieses Schlüssels vor der Aktualisierung der Auszahlungs-Zugangsdaten auf den Typ `0x01` bedeutet den Verlust des Zugriffs auf das Validator-Guthaben. Der Validator kann immer noch Attestierungen und Blöcke signieren, da für diese Aktionen der private Schlüssel des Validatoren erforderlich ist. Hierfür gibt es aber wenig bis keine Anreize, sollten die Auszahlungsschlüssel verloren gegangen sein.

Eine Trennung der Schlüssel der Validatoren von denen des Ethereum-Kontos ermöglicht das Betreiben mehrerer Validatoren durch einen einzigen Benutzer.

![Schema der Validator-Schlüssel](validator-key-schematic.png)

**Hinweis**: Das Beenden der Staking-Pflichten und das Abheben des Guthabens eines Validators erfordert derzeit das Signieren einer [freiwilligen Austrittsnachricht (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) mit dem Validator-Schlüssel. [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) ist jedoch ein Vorschlag, der es Benutzern in Zukunft ermöglichen wird, den Austritt eines Validators auszulösen und sein Guthaben abzuheben, indem Austrittsnachrichten mit dem Auszahlungsschlüssel signiert werden. Dies wird die Vertrauensannahmen reduzieren, indem es Stakern, die ETH an [Staking-as-a-Service-Anbieter](/staking/saas/#what-is-staking-as-a-service) delegieren, ermöglicht, die Kontrolle über ihre Gelder zu behalten.

## Ableiten von Schlüsseln aus einer Seed-Phrase {#deriving-keys-from-seed}

Wenn für jede 32 eingesetzten ETH ein neues Set von zwei komplett unabhängigen Schlüsseln erforderlich wäre, würde die Schlüsselverwaltung schnell sehr unübersichtlich werden, besonders für Benutzer, die mehrere Validatoren ausführen. Stattdessen lassen sich mehrere Validatorenschlüssel von einem einzelnen gemeinsamen Geheimnis ableiten und das Speichern dieses Geheimnisses ermöglicht den Zugriff auf mehrere Validatorenschlüssel.

[Mnemonics](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) und Pfade sind wichtige Funktionen, auf die Benutzer häufig stoßen, wenn [sie auf](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) ihre Wallets zugreifen. Die Mnemonik ist eine Sequenz von Wörtern, die als erster Seed für einen privaten Schlüssel dienen. Durch Kombination mit zusätzlichen kann die Mnemonik einen Hash, bekannt als der „Master Key“, generieren. Das kann man sich wie die Wurzeln eines Baums vorstellen. Abzweigungen dieser Wurzeln lassen sich mithilfe eines hierarchischen Pfads ableiten, sodass Child Nodes als Kombinationen aus dem Hash der Parent Nodes und dem Index im Baum existieren können. Lesen Sie mehr über die Standards [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) und [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) für die mnemotechnische Schlüsselgenerierung.

Diese Pfade haben die folgende Struktur. Nutzer, die mit Hardware-Wallets interagiert haben, sollte sie bekannt vorkommen:

```
`m/44'/60'/0'/0`
```

Die Schrägstriche in diesem Weg trennen Komponenten des privaten Schlüssels wie folgt:

```
`master_key / purpose / coin_type / account / change / address_index`
```

Diese Logik ermöglicht es Benutzern, so viele Validatoren wie möglich an eine einzige **mnemonische Phrase** anzuhängen, da die Baumwurzel (tree root) gemeinsam sein kann und die Differenzierung an den Zweigen (branches) stattfinden kann. Der Benutzer kann **beliebig viele Schlüssel** aus der mnemonischen Phrase **ableiten**.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Jeder „Branch“ (Zweig) wird durch ein `/` getrennt. `m/2` bedeutet also, dass man mit dem Master-Schlüssel beginnt und dem Branch 2 folgt. Im Schema unten kommt eine einzige mnemonische Phrase zum Einsatz, um drei Auszahlungsschlüssel mit jeweils zwei zugehörigen Validatoren zu speichern.

![Logik der Validator-Schlüssel](multiple-keys.png)

## Weiterführende Lektüre {#further-reading}

- [Blogbeitrag der Ethereum Foundation von Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys/)
- [EIP-2333 BLS12-381 Schlüsselgenerierung](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Von der Ausführungsebene ausgelöste Austritte](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Schlüsselverwaltung in großem Umfang](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
