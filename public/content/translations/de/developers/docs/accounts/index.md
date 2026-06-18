---
title: Ethereum-Konten
description: "Eine Erklärung von Ethereum-Konten – ihre Datenstrukturen und ihre Beziehung zur Schlüsselpaar-Kryptographie."
lang: de
---

Ein [Ethereum](/)-Konto ist eine Entität mit einem Ether-Guthaben (ETH), die Nachrichten auf Ethereum senden kann. Konten können benutzergesteuert sein oder als Smart Contracts bereitgestellt werden.

## Voraussetzungen {#prerequisites}

Um Ihnen zu helfen, diese Seite besser zu verstehen, empfehlen wir Ihnen, zuerst unsere [Einführung in Ethereum](/developers/docs/intro-to-ethereum/) zu lesen.

## Kontotypen {#types-of-account}

Ethereum hat zwei Kontotypen:

- Externes Konto (Externally-owned account, EOA) – kontrolliert von jedem, der die privaten Schlüssel besitzt
- Contract-Konto – ein im Netzwerk bereitgestellter Smart Contract, der durch Code kontrolliert wird. Erfahren Sie mehr über [Smart Contracts](/developers/docs/smart-contracts/)

Beide Kontotypen haben die Fähigkeit:

- ETH und Token zu empfangen, zu halten und zu senden
- Mit bereitgestellten Smart Contracts zu interagieren

### Hauptunterschiede {#key-differences}

**Externes Konto**

- Die Erstellung eines Kontos kostet nichts
- Kann Transaktionen initiieren
- Transaktionen zwischen externen Konten können nur ETH-/Token-Transfers sein
- Besteht aus einem kryptographischen Schlüsselpaar: öffentliche und private Schlüssel, die die Kontoaktivitäten steuern

**Contract-Konto**

- Die Erstellung eines Vertrags ist mit Kosten verbunden, da Sie Netzwerkspeicherplatz nutzen
- Kann Nachrichten nur als Reaktion auf den Empfang einer Transaktion senden
- Transaktionen von einem externen Konto an ein Contract-Konto können Code auslösen, der viele verschiedene Aktionen ausführen kann, wie z. B. das Übertragen von Token oder sogar das Erstellen eines neuen Vertrags
- Contract-Konten haben keine privaten Schlüssel. Stattdessen werden sie durch die Logik des Smart-Contract-Codes gesteuert

## Ein Konto im Detail {#an-account-examined}

Ethereum-Konten haben vier Felder:

- `nonce` – Ein Zähler, der die Anzahl der von einem externen Konto gesendeten Transaktionen oder die Anzahl der von einem Contract-Konto erstellten Verträge angibt. Für jedes Konto kann nur eine Transaktion mit einer bestimmten Nonce ausgeführt werden, was vor Replay-Angriffen schützt, bei denen signierte Transaktionen wiederholt gesendet und erneut ausgeführt werden.
- `balance` – Die Anzahl der Wei, die diese Adresse besitzt. Wei ist eine Stückelung von ETH und es gibt 1e+18 Wei pro ETH.
- `codeHash` – Dieser Hash bezieht sich auf den _Code_ eines Kontos auf der Ethereum Virtual Machine (EVM). In Contract-Konten sind Codefragmente einprogrammiert, die verschiedene Operationen ausführen können. Dieser EVM-Code wird ausgeführt, wenn das Konto einen Nachrichtenaufruf erhält. Er kann im Gegensatz zu den anderen Kontofeldern nicht geändert werden. Alle derartigen Codefragmente sind in der Zustandsdatenbank unter ihren entsprechenden Hashes für den späteren Abruf enthalten. Dieser Hash-Wert ist als codeHash bekannt. Bei externen Konten ist das codeHash-Feld der Hash einer leeren Zeichenfolge.
- `storageRoot` – Manchmal auch als Speicher-Hash (storage hash) bezeichnet. Ein 256-Bit-Hash des Wurzelknotens eines [Merkle-Patricia-Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), der den Speicherinhalt des Kontos kodiert (eine Zuordnung zwischen 256-Bit-Ganzzahlwerten), kodiert in den Trie als Zuordnung vom Keccak-256-Bit-Hash der 256-Bit-Ganzzahlschlüssel zu den RLP-kodierten 256-Bit-Ganzzahlwerten. Dieser Trie kodiert den Hash des Speicherinhalts dieses Kontos und ist standardmäßig leer.

![A diagram showing the make up of an account](./accounts.png)
_Diagramm adaptiert von [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Externe Konten und Schlüsselpaare {#externally-owned-accounts-and-key-pairs}

Ein Konto besteht aus einem kryptographischen Schlüsselpaar: öffentlich und privat. Sie helfen zu beweisen, dass eine Transaktion tatsächlich vom Absender signiert wurde, und verhindern Fälschungen. Ihr privater Schlüssel ist das, was Sie zum Signieren von Transaktionen verwenden, er gewährt Ihnen also die Verwahrung über die mit Ihrem Konto verbundenen Gelder. Sie halten nie wirklich Kryptowährung, Sie halten private Schlüssel – die Gelder befinden sich immer auf dem Ledger von Ethereum.

Dies hindert böswillige Akteure daran, gefälschte Transaktionen zu senden, da Sie den Absender einer Transaktion immer verifizieren können.

Wenn Alice Ether von ihrem eigenen Konto an Bobs Konto senden möchte, muss Alice eine Transaktionsanfrage erstellen und diese zur Verifizierung an das Netzwerk senden. Die Verwendung von Public-Key-Kryptographie durch Ethereum stellt sicher, dass Alice beweisen kann, dass sie die Transaktionsanfrage ursprünglich initiiert hat. Ohne kryptographische Mechanismen könnte eine böswillige Angreiferin Eve einfach öffentlich eine Anfrage senden, die in etwa so aussieht: „Sende 5 ETH von Alices Konto an Eves Konto“, und niemand könnte verifizieren, dass sie nicht von Alice stammt.

## Kontoerstellung {#account-creation}

Wenn Sie ein Konto erstellen möchten, generieren Ihnen die meisten Bibliotheken einen zufälligen privaten Schlüssel.

Ein privater Schlüssel besteht aus 64 Hex-Zeichen und kann mit einem Passwort verschlüsselt werden.

Beispiel:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Der öffentliche Schlüssel wird aus dem privaten Schlüssel unter Verwendung des [Elliptic Curve Digital Signature Algorithm](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) generiert. Sie erhalten eine öffentliche Adresse für Ihr Konto, indem Sie die letzten 20 Bytes des Keccak-256-Hashes des öffentlichen Schlüssels nehmen und `0x` an den Anfang setzen.

Das bedeutet, dass ein externes Konto (EOA) eine 42-stellige Adresse hat (20-Byte-Segment, was 40 hexadezimalen Zeichen entspricht, plus das Präfix `0x`).

Beispiel:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Das folgende Beispiel zeigt, wie man ein Signier-Tool namens [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) verwendet, um ein neues Konto zu generieren. Clef ist ein Tool zur Kontoverwaltung und zum Signieren, das mit dem Ethereum-Client [Geth](https://geth.ethereum.org) gebündelt ist. Der Befehl `clef newaccount` erstellt ein neues Schlüsselpaar und speichert es in einem verschlüsselten Schlüsselspeicher.

```
> clef newaccount --keystore <path>

Bitte geben Sie ein Passwort für das neu zu erstellende Konto ein:
> <password>

------------
INFO [10-28|16:19:09.156] Ihr neuer Schlüssel wurde generiert       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Bitte sichern Sie Ihre Schlüsseldatei      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Bitte merken Sie sich Ihr Passwort!
Generiertes Konto 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Geth-Dokumentation](https://geth.ethereum.org/docs)

Es ist möglich, neue öffentliche Schlüssel aus Ihrem privaten Schlüssel abzuleiten, aber Sie können keinen privaten Schlüssel aus öffentlichen Schlüsseln ableiten. Es ist von entscheidender Bedeutung, Ihre privaten Schlüssel sicher und, wie der Name schon sagt, **PRIVAT** zu halten.

Sie benötigen einen privaten Schlüssel, um Nachrichten und Transaktionen zu signieren, die eine Signatur ausgeben. Andere können dann die Signatur nehmen, um Ihren öffentlichen Schlüssel abzuleiten und so den Autor der Nachricht zu beweisen. In Ihrer Anwendung können Sie eine JavaScript-Bibliothek verwenden, um Transaktionen an das Netzwerk zu senden.

## Contract-Konten {#contract-accounts}

Contract-Konten haben ebenfalls eine 42-stellige hexadezimale Adresse:

Beispiel:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Die Vertragsadresse wird normalerweise vergeben, wenn ein Vertrag auf der Ethereum-Blockchain bereitgestellt wird. Die Adresse ergibt sich aus der Adresse des Erstellers und der Anzahl der von dieser Adresse gesendeten Transaktionen (der „Nonce“).

## Validator-Schlüssel {#validators-keys}

Es gibt auch eine andere Art von Schlüssel in Ethereum, die eingeführt wurde, als Ethereum vom Proof-of-Work- zum Proof-of-Stake-basierten Konsens wechselte. Dies sind „BLS“-Schlüssel und sie werden verwendet, um Validatoren zu identifizieren. Diese Schlüssel können effizient aggregiert werden, um die Bandbreite zu reduzieren, die das Netzwerk benötigt, um zu einem Konsens zu gelangen. Ohne diese Schlüsselaggregation wäre der Mindest-Stake für einen Validator viel höher.

[Mehr zu Validator-Schlüsseln](/developers/docs/consensus-mechanisms/pos/keys/).

## Eine Anmerkung zu Wallets {#a-note-on-wallets}

Ein Konto ist keine Wallet. Eine Wallet ist eine Schnittstelle oder Anwendung, mit der Sie mit Ihrem Ethereum-Konto interagieren können, entweder mit einem externen Konto oder einem Contract-Konto.

## Eine visuelle Demo {#a-visual-demo}

Sehen Sie sich an, wie Austin Sie durch Hash-Funktionen und Schlüsselpaare führt.

<VideoWatch slug="hash-function-eth-build" />

<VideoWatch slug="key-pair-eth-build" />

## Weiterführende Literatur {#further-reading}

- [Ethereum-Konten verstehen](https://info.etherscan.com/understanding-ethereum-accounts/) - Etherscan

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Smart Contracts](/developers/docs/smart-contracts/)
- [Transaktionen](/developers/docs/transactions/)