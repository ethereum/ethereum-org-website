---
title: "Schlüssel im Proof-of-Stake-Ethereum"
description: "Eine Erklärung der Schlüssel, die im Proof-of-Stake-Konsensmechanismus von Ethereum verwendet werden"
lang: de
---

Ethereum sichert Benutzerwerte mithilfe von Kryptographie mit öffentlichen und privaten Schlüsseln. Der öffentliche Schlüssel wird als Basis für eine Ethereum-Adresse verwendet – das heißt, er ist für die Allgemeinheit sichtbar und dient als eindeutiger Identifikator. Der private (oder „geheime“) Schlüssel sollte immer nur für einen Kontoinhaber zugänglich sein. Der private Schlüssel wird verwendet, um Transaktionen und Daten zu „signieren“, sodass die Kryptographie beweisen kann, dass der Inhaber eine bestimmte Aktion eines spezifischen privaten Schlüssels genehmigt.

Die Schlüssel von Ethereum werden mithilfe von [Kryptographie auf Basis elliptischer Kurven](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) generiert.

Als Ethereum jedoch von [Proof-of-Work (PoW)](/developers/docs/consensus-mechanisms/pow) zu [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos) wechselte, wurde Ethereum eine neue Art von Schlüssel hinzugefügt. Die ursprünglichen Schlüssel funktionieren immer noch genau wie zuvor – es gab keine Änderungen an den auf elliptischen Kurven basierenden Schlüsseln, die Konten sichern. Benutzer benötigten jedoch eine neue Art von Schlüssel, um am Proof-of-Stake teilzunehmen, indem sie ETH staken und Validatoren betreiben. Dieser Bedarf entstand aus Skalierbarkeitsherausforderungen im Zusammenhang mit vielen Nachrichten, die zwischen einer großen Anzahl von Validatoren ausgetauscht wurden. Dies erforderte eine kryptographische Methode, die leicht aggregiert werden konnte, um die Menge an Kommunikation zu reduzieren, die das Netzwerk benötigt, um zu einem Konsens zu gelangen.

Diese neue Art von Schlüssel verwendet das [**Boneh-Lynn-Shacham (BLS)**-Signaturschema](https://wikipedia.org/wiki/BLS_digital_signature). BLS-Signaturen von vielen Validatoren können zu einer einzigen Signatur aggregiert werden, die in einer einzigen Prüfung verifiziert wird, was Konsens-Nachrichten klein hält. BLS ist nicht quantensicher, daher plant die [Post-Quanten-Roadmap](/roadmap/security/quantum-resistance/), BLS-Schlüssel von Validatoren durch Hash-basierte Schlüssel zu ersetzen.

## Die zwei Arten von Validator-Schlüsseln {#two-types-of-keys}

Vor dem Wechsel zu Proof-of-Stake hatten Ethereum-Benutzer nur einen einzigen auf elliptischen Kurven basierenden privaten Schlüssel, um auf ihr Guthaben zuzugreifen. Mit der Einführung von Proof-of-Stake benötigten Benutzer, die Solo-Staker sein wollten, auch einen **Validator-Schlüssel** und einen **Abhebungsschlüssel**.

### Der Validator-Schlüssel {#validator-key}

Der Validator-Signaturschlüssel besteht aus zwei Elementen:

- **Privater** Validator-Schlüssel
- **Öffentlicher** Validator-Schlüssel

Der Zweck des privaten Validator-Schlüssels besteht darin, Onchain-Operationen wie Block-Vorschläge und Attestierungen zu signieren. Aus diesem Grund müssen diese Schlüssel in einer Hot-Wallet aufbewahrt werden.

Diese Flexibilität hat den Vorteil, dass Validator-Signaturschlüssel sehr schnell von einem Gerät auf ein anderes übertragen werden können. Wenn sie jedoch verloren gehen oder gestohlen werden, kann ein Dieb auf verschiedene Weise **böswillig handeln**:

- Ein Slashing des Validators verursachen, indem er:
  - Als Proposer agiert und zwei verschiedene Beacon-Blöcke für denselben Slot signiert
  - Als Attester agiert und eine Attestierung signiert, die eine andere „umschließt“
  - Als Attester agiert und zwei verschiedene Attestierungen mit demselben Ziel signiert
- Einen freiwilligen Austritt erzwingen, was den Validator vom Staking abhält und dem Inhaber des Abhebungsschlüssels Zugriff auf sein ETH-Guthaben gewährt

Der **öffentliche Validator-Schlüssel** ist in den Transaktionsdaten enthalten, wenn ein Benutzer ETH in den Staking-Einlage-Vertrag einzahlt. Dies wird als _Einzahlungsdaten_ bezeichnet und ermöglicht es Ethereum, den Validator zu identifizieren.

### Auszahlungsberechtigungen {#withdrawal-credentials}

Jeder Validator hat eine Eigenschaft, die als _Auszahlungsberechtigungen_ bekannt ist. Das erste Byte dieses 32-Byte-Feldes identifiziert den Kontotyp: `0x00` steht für alte BLS-Berechtigungen (vor Shapella, nicht abhebbar), `0x01` steht für alte Berechtigungen, die auf eine Ausführungsadresse verweisen, und `0x02` steht für den modernen Compounding-Berechtigungstyp.

Validatoren mit `0x00`-BLS-Schlüsseln müssen diese Berechtigungen aktualisieren, damit sie auf eine Ausführungsadresse verweisen, um Zahlungen von Überschussguthaben oder eine vollständige Abhebung aus dem Staking zu aktivieren. Dies kann erfolgen, indem während der anfänglichen Schlüsselgenerierung eine Ausführungsadresse in den Einzahlungsdaten angegeben wird, _ODER_ indem der Abhebungsschlüssel zu einem späteren Zeitpunkt verwendet wird, um eine `BLSToExecutionChange`-Nachricht zu signieren und zu übertragen. Vorschläge, `0x00`-Berechtigungen vor dem Post-Quanten-Übergang auslaufen zu lassen, werden derzeit diskutiert, daher sollten Validatoren, die noch `0x00` verwenden, jetzt konvertieren.

[Mehr zu Auszahlungsberechtigungen von Validatoren](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Der Abhebungsschlüssel {#withdrawal-key}

Der Abhebungsschlüssel wird benötigt, um Auszahlungsberechtigungen so zu aktualisieren, dass sie auf eine Ausführungsadresse verweisen, falls dies nicht während der anfänglichen Einzahlung festgelegt wurde. Dadurch können Zahlungen von Überschussguthaben verarbeitet werden, und Benutzer können ihre gestakten ETH vollständig abheben.

Genau wie die Validator-Schlüssel bestehen auch die Abhebungsschlüssel aus zwei Komponenten:

- **Privater** Abhebungsschlüssel
- **Öffentlicher** Abhebungsschlüssel

Der Verlust dieses Schlüssels vor der Aktualisierung der Auszahlungsberechtigungen auf den Typ `0x01` bedeutet den Verlust des Zugriffs auf das Validator-Guthaben. Der Validator kann weiterhin Attestierungen und Blöcke signieren, da diese Aktionen den privaten Schlüssel des Validators erfordern. Es gibt jedoch wenig bis gar keinen Anreiz dafür, wenn die Abhebungsschlüssel verloren gegangen sind.

Die Trennung der Validator-Schlüssel von den Ethereum-Kontoschlüsseln ermöglicht es einem einzelnen Benutzer, mehrere Validatoren zu betreiben. Mit `0x02`-Berechtigungen kann ein Validator bis zu 2.048 ETH halten, sodass ein größerer Stake nicht mehr auf viele Validatoren aufgeteilt werden muss.

<ValidatorKeysDiagram />

**Hinweis**: Ein Validator kann austreten, indem er eine [Nachricht zum freiwilligen Austritt (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) mit dem Validator-Schlüssel signiert. Seit dem Pectra-Upgrade ermöglicht [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) auch der Abhebungsadresse, den Austritt eines Validators sowie teilweise Abhebungen für `0x02`-Validatoren auszulösen. Dies reduziert Vertrauensannahmen, indem Staker, die ETH an [Staking as a Service-Anbieter](/staking/saas/#what-is-staking-as-a-service) delegieren, die Kontrolle über ihre Gelder behalten.

## Ableiten von Schlüsseln aus einer Seed-Phrase {#deriving-keys-from-seed}

Wenn für jeweils 32 gestakte ETH ein neues Set von 2 völlig unabhängigen Schlüsseln erforderlich wäre, würde die Schlüsselverwaltung schnell unhandlich werden, insbesondere für Benutzer, die mehrere Validatoren betreiben. Stattdessen können mehrere Validator-Schlüssel aus einem einzigen gemeinsamen Geheimnis abgeleitet werden, und die Speicherung dieses einzigen Geheimnisses ermöglicht den Zugriff auf mehrere Validator-Schlüssel.

[Mnemonics](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) und Pfade sind prominente Merkmale, auf die Benutzer oft stoßen, wenn [sie auf ihre Wallets zugreifen](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0). Die Mnemonic ist eine Folge von Wörtern, die als anfänglicher Seed für einen privaten Schlüssel fungiert. In Kombination mit zusätzlichen Daten generiert die Mnemonic einen Hash, der als „Master-Schlüssel“ bekannt ist. Dies kann man sich als die Wurzel eines Baumes vorstellen. Zweige von dieser Wurzel können dann über einen hierarchischen Pfad abgeleitet werden, sodass untergeordnete Knoten als Kombinationen aus dem Hash ihres übergeordneten Knotens und ihrem Index im Baum existieren können. Lesen Sie mehr über die Standards [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) und [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) für die Mnemonic-basierte Schlüsselgenerierung.

Diese Pfade haben die folgende Struktur, die Benutzern vertraut sein wird, die bereits mit Hardware-Wallets interagiert haben:

```
m/44'/60'/0'/0
```

Die Schrägstriche in diesem Pfad trennen die Komponenten des privaten Schlüssels wie folgt:

```
master_key / purpose / coin_type / account / change / address_index
```

Diese Logik ermöglicht es Benutzern, so viele Validatoren wie möglich an eine einzige **Mnemonic-Phrase** anzuhängen, da die Baumwurzel gemeinsam sein kann und die Unterscheidung an den Zweigen erfolgen kann. Der Benutzer kann **beliebig viele Schlüssel** aus der Mnemonic-Phrase ableiten.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Jeder Zweig ist durch einen `/` getrennt, sodass `m/2` bedeutet, dass man mit dem Master-Schlüssel beginnt und Zweig 2 folgt. Validator-Schlüssel folgen [EIP-2334](https://eips.ethereum.org/EIPS/eip-2334): Validator `i` erhält seinen Abhebungsschlüssel bei `m/12381/3600/i/0` und seinen Signaturschlüssel bei `m/12381/3600/i/0/0` (12381 identifiziert die BLS12-381-Kurve, 3600 den Coin-Typ für Schlüssel der Konsensschicht).

<KeyDerivationDiagram />

## Weiterführende Literatur {#further-reading}

- [Blogbeitrag der Ethereum Foundation von Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys)
- [EIP-2333 BLS12-381 Schlüsselgenerierung](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Von der Ausführungsschicht ausgelöste Austritte](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Schlüsselverwaltung im großen Maßstab](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
