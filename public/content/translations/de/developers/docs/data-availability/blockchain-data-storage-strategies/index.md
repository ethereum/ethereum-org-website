---
title: Blockchain-Datenspeicherungsstrategien
description: "Es gibt verschiedene Möglichkeiten, Daten mithilfe der Blockchain zu speichern. Dieser Artikel wird die verschiedenen Strategien, ihre Kosten und Kompromisse sowie die Anforderungen für eine sichere Nutzung vergleichen."
lang: de
---

Es gibt mehrere Möglichkeiten, Informationen entweder direkt auf der Blockchain oder auf eine durch die Blockchain gesicherte Weise zu speichern:

- EIP-4844 Blobs
- Aufrufdaten
- Offchain mit L1-Mechanismen
- Vertragscode ("Contract code")
- Ereignisse
- EVM Speicher

Die Wahl der zu verwendenden Methode basiert auf mehreren Kriterien:

- Die Quelle der Informationen. Informationen in Calldata können nicht direkt von der Blockchain selbst stammen.
- Das Ziel der Information. Calldata sind nur in der Transaktion verfügbar, die sie enthalten. Ereignisse sind onchain überhaupt nicht zugänglich.
- Wie viel Aufwand ist akzeptabel? Computer, die einen vollwertigen Node betreiben, können mehr Verarbeitung leisten als ein Light-Client in einer Anwendung, die in einem Browser läuft.
- Ist es notwendig, den einfachen Zugriff auf die Informationen von jedem Node zu ermöglichen?
- Die Sicherheitsanforderungen.

## Die Sicherheitsanforderungen {#security-requirements}

Im Allgemeinen besteht die Informationssicherheit aus drei Attributen:

- _Vertraulichkeit_, unbefugte Entitäten dürfen die Informationen nicht lesen. Dies ist in vielen Fällen wichtig, aber hier nicht. _Es gibt keine Geheimnisse in der Blockchain_. Blockchains funktionieren, weil jeder die Zustandsübergänge überprüfen kann. Es ist daher unmöglich, sie zur direkten Speicherung von Geheimnissen zu verwenden. Es gibt Möglichkeiten, vertrauliche Informationen auf der Blockchain zu speichern, aber alle beruhen auf einer Off-Chain-Komponente, um zumindest einen Schlüssel zu speichern.

- _Integrität_, die Information ist korrekt, sie kann nicht von unbefugten Entitäten oder auf unbefugte Weise verändert werden (z. B. durch Übertragung von [ERC-20-Tokens](https://eips.ethereum.org/EIPS/eip-20#events) ohne ein `Transfer`-Event). Auf der Blockchain überprüft jeder Node jede Zustandsänderung, was die Integrität sicherstellt.

- _Verfügbarkeit_, die Informationen stehen jeder autorisierten Entität zur Verfügung. Auf der Blockchain wird dies in der Regel dadurch erreicht, dass die Informationen auf jedem [Full Node](https://ethereum.org/developers/docs/nodes-and-clients#full-node) verfügbar sind.

Die verschiedenen hier vorgestellten Lösungen haben alle eine ausgezeichnete Integrität, da Hashes auf L1 gepostet werden. Sie haben jedoch unterschiedliche Verfügbarkeitsgarantien.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis der [Blockchain-Grundlagen](/developers/docs/intro-to-ethereum/) haben. Diese Seite setzt auch voraus, dass der Leser mit [Blöcken](/developers/docs/blocks/), [Transaktionen](/developers/docs/transactions/) und anderen relevanten Themen vertraut ist.

## EIP-4844-Blobs {#eip-4844-blobs}

Beginnend mit dem [Dencun Hard Fork](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) enthält die Ethereum-Blockchain [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), das Ethereum um Daten-Blobs mit einer begrenzten Lebensdauer (anfänglich etwa [18 Tage](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)) erweitert. Der Preis für diese Blobs wird getrennt vom [Ausführungsgas](/developers/docs/gas) festgelegt, obwohl ein ähnlicher Mechanismus verwendet wird. Sie sind eine günstige Möglichkeit, temporäre Daten zu posten.

Der Hauptanwendungsfall für EIP-4844-Blobs ist die Veröffentlichung von Transaktionen durch Rollups. [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups) müssen die Transaktionen auf ihren Blockchains veröffentlichen. Diese Transaktionen müssen während der [Challenge Period](https://docs.optimism.io/connect/resources/glossary#challenge-period) für jeden verfügbar sein, damit [Validatoren](https://docs.optimism.io/connect/resources/glossary#validator) den Fehler beheben können, wenn der [Sequencer](https://docs.optimism.io/connect/resources/glossary#sequencer) des Rollups einen falschen State Root postet.

Sobald die Challenge Period jedoch abgelaufen ist und der State Root finalisiert wurde, besteht der verbleibende Zweck der Kenntnis dieser Transaktionen darin, den aktuellen Zustand der Chain zu replizieren. Dieser Zustand ist auch von Chain-Nodes verfügbar, mit weitaus weniger erforderlicher Verarbeitung. Transaktionsinformationen sollten also weiterhin an einigen Stellen, wie z. B. in [Block-Explorern](/developers/docs/data-and-analytics/block-explorers), aufbewahrt werden, aber es ist nicht nötig, für das Maß an Zensurresistenz zu bezahlen, das Ethereum bietet.

[Zero-Knowledge-Rollups](/developers/docs/scaling/zk-rollups/#data-availability) posten ebenfalls ihre Transaktionsdaten, um anderen Nodes zu ermöglichen, den bestehenden Zustand zu replizieren und Validitätsbeweise zu verifizieren, aber auch das ist eine kurzfristige Anforderung.

Zum Zeitpunkt des Schreibens kostet das Posten auf EIP-4844 ein Wei (10<sup>-18</sup> ETH) pro Byte, was im Vergleich zu [den 21.000 Ausführungsgas, die jede Transaktion, einschließlich einer, die Blobs postet, kostet](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index), vernachlässigbar ist. Den aktuellen EIP-4844-Preis können Sie auf [blobscan.com](https://blobscan.com/blocks) einsehen.

Hier sind die Adressen, um die von einigen bekannten Rollups geposteten Blobs zu sehen.

| Rollup                               | Mailbox-Adresse                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata bezieht sich auf die Bytes, die als Teil der Transaktion gesendet werden. Sie werden als Teil der dauerhaften Aufzeichnung der Blockchain in dem Block gespeichert, der diese Transaktion enthält.

Dies ist die günstigste Methode, um Daten dauerhaft in der Blockchain abzulegen. Die Kosten pro Byte betragen entweder 4 Ausführungsgas (wenn das Byte null ist) oder 16 Gas (jeder andere Wert). Wenn die Daten komprimiert sind, was übliche Praxis ist, dann ist jeder Byte-Wert gleich wahrscheinlich, sodass die durchschnittlichen Kosten ungefähr 15,95 Gas pro Byte betragen.

Zum Zeitpunkt des Schreibens liegen die Preise bei 12 Gwei/Gas und 2300 $/ETH, was bedeutet, dass die Kosten etwa 45 Cent pro Kilobyte betragen. Da dies vor EIP-4844 die günstigste Methode war, ist dies die Methode, die Rollups zur Speicherung von Transaktionsinformationen verwendeten, die für [Fault Challenges](https://docs.optimism.io/stack/protocol/overview#fault-proofs) verfügbar sein müssen, aber nicht direkt onchain zugänglich sein müssen.

Hier sind die Adressen, um die von einigen bekannten Rollups geposteten Transaktionen zu sehen.

| Rollup                               | Mailbox-Adresse                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Off-Chain mit L1-Mechanismen {#offchain-with-l1-mechs}

Abhängig von Ihren Sicherheitsabwägungen kann es akzeptabel sein, die Informationen an anderer Stelle zu platzieren und einen Mechanismus zu verwenden, der sicherstellt, dass die Daten bei Bedarf verfügbar sind. Damit dies funktioniert, gibt es zwei Anforderungen:

1. Posten Sie einen [Hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) der Daten auf der Blockchain, der als _Input Commitment_ bezeichnet wird. Dies kann ein einzelnes 32-Byte-Wort sein, also ist es nicht teuer. Solange das Input Commitment verfügbar ist, ist die Integrität gewährleistet, da es nicht machbar ist, andere Daten zu finden, die zum gleichen Wert hashen würden. Wenn also falsche Daten bereitgestellt werden, kann dies erkannt werden.

2. Sorgen Sie für einen Mechanismus, der die Verfügbarkeit sicherstellt. Zum Beispiel kann in [Redstone](https://redstone.xyz/docs/what-is-redstone) jeder Node eine Availability Challenge einreichen. Wenn der Sequencer nicht bis zur Frist onchain antwortet, wird das Input Commitment verworfen, sodass die Information als niemals gepostet gilt.

Dies ist für einen Optimistic Rollup akzeptabel, da wir uns bereits darauf verlassen, dass es mindestens einen ehrlichen Verifizierer für den State Root gibt. Ein solcher ehrlicher Verifizierer wird auch sicherstellen, dass er die Daten zur Verarbeitung von Blöcken hat, und eine Availability Challenge ausstellen, wenn die Informationen nicht off-chain verfügbar sind. Diese Art von Optimistic Rollup wird [Plasma](/developers/docs/scaling/plasma/) genannt.

## Vertragscode {#contract-code}

Informationen, die nur einmal geschrieben werden müssen, niemals überschrieben werden und onchain verfügbar sein müssen, können als Vertragscode gespeichert werden. Das bedeutet, dass wir einen "Smart Contract" mit den Daten erstellen und dann [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) verwenden, um die Informationen zu lesen. Der Vorteil ist, dass das Kopieren von Code relativ günstig ist.

Abgesehen von den Kosten für die Speichererweiterung kostet `EXTCODECOPY` 2600 Gas für den ersten Zugriff auf einen Vertrag (wenn er „kalt“ ist) und 100 Gas für nachfolgende Kopien aus demselben Vertrag plus 3 Gas pro 32-Byte-Wort. Im Vergleich zu Calldata, die 15,95 pro Byte kosten, ist dies ab etwa 200 Bytes günstiger. Basierend auf [der Formel für Speichererweiterungskosten](https://www.evm.codes/about#memoryexpansion), sind die Speichererweiterungskosten geringer als die Kosten für das Hinzufügen von Calldata, solange Sie nicht mehr als 4 MB Speicher benötigen.

Natürlich sind das nur die Kosten, um die Daten zu _lesen_. Die Erstellung des Vertrags kostet ungefähr 32.000 Gas + 200 Gas/Byte. Diese Methode ist nur dann wirtschaftlich, wenn dieselben Informationen in verschiedenen Transaktionen viele Male gelesen werden müssen.

Vertragscode kann unsinnig sein, solange er nicht mit `0xEF` beginnt. Verträge, die mit `0xEF` beginnen, werden als [Ethereum Object Format](https://notes.ethereum.org/@ipsilon/evm-object-format-overview) interpretiert, das viel strengere Anforderungen hat.

## Ereignisse {#events}

[Ereignisse](https://docs.alchemy.com/docs/solidity-events) werden von Smart Contracts ausgegeben und von Off-Chain-Software gelesen.
Ihr Vorteil ist, dass Off-Chain-Code auf Ereignisse lauschen kann. Die Kosten betragen [Gas](https://www.evm.codes/#a0?fork=cancun), 375 plus 8 Gas pro Byte an Daten. Bei 12 Gwei/Gas und 2300 $/ETH entspricht dies einem Cent plus 22 Cent pro Kilobyte.

## Speicher {#storage}

Smart Contracts haben Zugriff auf [persistenten Speicher](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Er ist jedoch sehr teuer. Das Schreiben eines 32-Byte-Wortes in einen zuvor leeren Speicher-Slot kann [22.100 Gas kosten](https://www.evm.codes/#55?fork=cancun). Bei 12 Gwei/Gas und 2300 $/ETH sind das etwa 61 Cent pro Schreibvorgang oder 19,5 $ pro Kilobyte.

Dies ist die teuerste Form von Speicher in Ethereum.

## Zusammenfassung {#summary}

Diese Tabelle fasst die verschiedenen Optionen, ihre Vor- und Nachteile zusammen.

| Speichertyp                 | Datenquelle            | Verfügbarkeitsgarantie                                                                                                                            | Onchain-Verfügbarkeit                                                        | Zusätzliche Einschränkungen                                                  |
| --------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| EIP-4844 Blobs              | Off-Chain              | Ethereum-Garantie für [~18 Tage](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Nur Hash ist verfügbar                                                       |                                                                              |
| Aufrufdaten                 | Off-Chain              | Ethereum-Garantie für immer (Teil der Blockchain)                                                                              | Nur verfügbar, wenn in einen Vertrag geschrieben, und bei dieser Transaktion |                                                                              |
| Offchain mit L1-Mechanismen | Off-Chain              | "One honest verifier"-Garantie während der Challenge Period                                                                                       | Nur Hash                                                                     | Garantiert durch den Challenge-Mechanismus, nur während der Challenge Period |
| Vertragscode                | Onchain oder Off-Chain | Ethereum-Garantie für immer (Teil der Blockchain)                                                                              | Ja                                                                           | An eine "zufällige" Adresse geschrieben, darf nicht mit `0xEF` beginnen      |
| Ereignisse                  | Onchain                | Ethereum-Garantie für immer (Teil der Blockchain)                                                                              | Nein                                                                         |                                                                              |
| Speicherort                 | Onchain                | Ethereum-Garantie für immer (Teil der Blockchain und des gegenwärtigen Zustands, bis er überschrieben wird)                    | Ja                                                                           |                                                                              |
