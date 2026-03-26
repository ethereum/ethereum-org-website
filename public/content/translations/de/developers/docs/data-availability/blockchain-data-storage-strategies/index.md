---
title: Strategien zur Datenspeicherung auf der Blockchain
description: "Es gibt verschiedene Möglichkeiten, Daten mithilfe der Blockchain zu speichern. Dieser Artikel vergleicht die verschiedenen Strategien, ihre Kosten und Kompromisse sowie die Anforderungen für eine sichere Nutzung."
lang: de
---

Es gibt mehrere Möglichkeiten, Informationen entweder direkt auf der Blockchain oder auf eine durch die Blockchain gesicherte Weise zu speichern:

- EIP-4844-Blobs
- Calldata
- Off-Chain mit L1-Mechanismen
- Vertrags-„Code“
- Events
- EVM-Speicher

Die Wahl der zu verwendenden Methode hängt von mehreren Kriterien ab:

- Die Quelle der Informationen. Informationen in Calldata können nicht direkt von der Blockchain selbst stammen.
- Das Ziel der Informationen. Calldata ist nur in der Transaktion verfügbar, die sie enthält. Events sind auf der Blockchain überhaupt nicht zugänglich.
- Wie viel Aufwand ist akzeptabel? Computer, die einen vollständigen Blockchain-Knoten ausführen, können mehr Verarbeitungsleistung erbringen als ein Light Client in einer Anwendung, die in einem Browser läuft.
- Ist es notwendig, einen einfachen Zugriff auf die Informationen von jedem Blockchain-Knoten aus zu ermöglichen?
- Die Sicherheitsanforderungen.

## Die Sicherheitsanforderungen {#security-requirements}

Im Allgemeinen besteht die Informationssicherheit aus drei Attributen:

- _Vertraulichkeit_: Unbefugte Entitäten dürfen die Informationen nicht lesen. Dies ist in vielen Fällen wichtig, aber nicht hier. _Es gibt keine Geheimnisse auf der Blockchain_. Blockchains funktionieren, weil jeder die Zustandsübergänge verifizieren kann, daher ist es unmöglich, sie zur direkten Speicherung von Geheimnissen zu verwenden. Es gibt Möglichkeiten, vertrauliche Informationen auf der Blockchain zu speichern, aber sie alle verlassen sich auf eine Off-Chain-Komponente, um zumindest einen Schlüssel zu speichern.

- _Integrität_: Die Informationen sind korrekt, sie können nicht von unbefugten Entitäten oder auf unbefugte Weise geändert werden (zum Beispiel die Übertragung von [ERC-20-Token](https://eips.ethereum.org/EIPS/eip-20#events) ohne ein `Transfer`-Event). Auf der Blockchain verifiziert jeder Blockchain-Knoten jede Zustandsänderung, was die Integrität sicherstellt.

- _Verfügbarkeit_: Die Informationen stehen jeder autorisierten Entität zur Verfügung. Auf der Blockchain wird dies normalerweise dadurch erreicht, dass die Informationen auf jedem [vollständigen Blockchain-Knoten](https://ethereum.org/developers/docs/nodes-and-clients/#full-node) verfügbar sind.

Die verschiedenen hier vorgestellten Lösungen weisen alle eine hervorragende Integrität auf, da Hashes auf L1 gepostet werden. Sie haben jedoch unterschiedliche Verfügbarkeitsgarantien.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis der [Blockchain-Grundlagen](/developers/docs/intro-to-ethereum/) haben. Diese Seite setzt außerdem voraus, dass der Leser mit [Blöcken](/developers/docs/blocks/), [Transaktionen](/developers/docs/transactions/) und anderen relevanten Themen vertraut ist.

## EIP-4844-Blobs {#eip-4844-blobs}

Beginnend mit [dem Dencun-Hardfork](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md) beinhaltet die Ethereum-Blockchain [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), was Ethereum um Daten-Blobs mit einer begrenzten Lebensdauer (anfänglich etwa [18 Tage](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)) erweitert. Diese Blobs werden separat vom [Ausführungsgas](/developers/docs/gas) bepreist, obwohl ein ähnlicher Mechanismus verwendet wird. Sie sind eine günstige Möglichkeit, temporäre Daten zu posten.

Der Hauptanwendungsfall für EIP-4844-Blobs besteht darin, dass Rollups ihre Transaktionen veröffentlichen. [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups) müssen die Transaktionen auf ihren Blockchains veröffentlichen. Diese Transaktionen müssen während der [Herausforderungsfrist (Challenge Period)](https://docs.optimism.io/connect/resources/glossary#challenge-period) für jeden verfügbar sein, um es [Validatoren](https://docs.optimism.io/connect/resources/glossary#validator) zu ermöglichen, den Fehler zu beheben, falls der [Sequencer](https://docs.optimism.io/connect/resources/glossary#sequencer) des Rollups eine falsche State Root postet.

Sobald jedoch die Herausforderungsfrist abgelaufen ist und die State Root finalisiert wurde, besteht der verbleibende Zweck für die Kenntnis dieser Transaktionen darin, den aktuellen Zustand der Chain zu replizieren. Dieser Zustand ist auch von Blockchain-Knoten der Chain verfügbar, wobei viel weniger Verarbeitungsaufwand erforderlich ist. Transaktionsinformationen sollten also weiterhin an einigen Orten aufbewahrt werden, wie z. B. in [Blocksuchmaschinen](/developers/docs/data-and-analytics/block-explorers), aber es besteht keine Notwendigkeit, für das Maß an Zensurresistenz zu bezahlen, das Ethereum bietet.

[Zero-Knowledge Rollups](/developers/docs/scaling/zk-rollups/#data-availability) posten ebenfalls ihre Transaktionsdaten, um es anderen Blockchain-Knoten zu ermöglichen, den bestehenden Zustand zu replizieren und Validitätsnachweise zu verifizieren, aber auch das ist eine kurzfristige Anforderung.

Zum Zeitpunkt des Schreibens kostet das Posten auf EIP-4844 ein Wei (10<sup>-18</sup> ETH) pro Byte, was im Vergleich zu [den 21.000 Ausführungsgas, die jede Transaktion, einschließlich einer, die Blobs postet, kostet](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index), vernachlässigbar ist. Sie können den aktuellen EIP-4844-Preis auf [blobscan.com](https://blobscan.com/blocks) einsehen.

Hier sind die Adressen, um die von einigen bekannten Rollups geposteten Blobs zu sehen.

| Rollup                               | Mailbox-Adresse                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata bezieht sich auf die Bytes, die als Teil der Transaktion gesendet werden. Sie werden als Teil der permanenten Aufzeichnung der Blockchain in dem Block gespeichert, der diese Transaktion enthält.

Dies ist die günstigste Methode, um Daten dauerhaft in der Blockchain abzulegen. Die Kosten pro Byte betragen entweder 4 Ausführungsgas (wenn das Byte null ist) oder 16 Gas (jeder andere Wert). Wenn die Daten komprimiert sind, was gängige Praxis ist, dann ist jeder Bytewert gleich wahrscheinlich, sodass die durchschnittlichen Kosten bei etwa 15,95 Gas pro Byte liegen.

Zum Zeitpunkt des Schreibens liegen die Preise bei 12 Gwei/Gas und 2300 $/ETH, was bedeutet, dass die Kosten bei etwa 45 Cent pro Kilobyte liegen. Da dies vor EIP-4844 die günstigste Methode war, ist dies die Methode, die Rollups verwendeten, um Transaktionsinformationen zu speichern, die für [Fehlerherausforderungen (Fault Challenges)](https://docs.optimism.io/stack/protocol/overview#fault-proofs) verfügbar sein müssen, aber nicht direkt auf der Blockchain zugänglich sein müssen.

Hier sind die Adressen, um die von einigen bekannten Rollups geposteten Transaktionen zu sehen.

| Rollup                               | Mailbox-Adresse                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Off-Chain mit L1-Mechanismen {#offchain-with-l1-mechs}

Abhängig von Ihren Sicherheitskompromissen kann es akzeptabel sein, die Informationen an einem anderen Ort abzulegen und einen Mechanismus zu verwenden, der sicherstellt, dass die Daten bei Bedarf verfügbar sind. Damit dies funktioniert, gibt es zwei Anforderungen:

1. Posten Sie einen [Hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) der Daten auf der Blockchain, genannt _Input Commitment_. Dies kann ein einzelnes 32-Byte-Wort sein, ist also nicht teuer. Solange das Input Commitment verfügbar ist, ist die Integrität gewährleistet, da es nicht machbar ist, andere Daten zu finden, die denselben Hash-Wert ergeben würden. Wenn also falsche Daten bereitgestellt werden, kann dies erkannt werden.

2. Verfügen Sie über einen Mechanismus, der die Verfügbarkeit sicherstellt. Zum Beispiel kann in [Redstone](https://redstone.xyz/docs/what-is-redstone) jeder Blockchain-Knoten eine Verfügbarkeitsherausforderung einreichen. Wenn der Sequencer nicht bis zur Frist auf der Blockchain antwortet, wird das Input Commitment verworfen, sodass die Informationen als nie gepostet gelten.

Dies ist für ein Optimistic Rollup akzeptabel, da wir uns bereits darauf verlassen, mindestens einen ehrlichen Verifizierer für die State Root zu haben. Ein solcher ehrlicher Verifizierer wird auch sicherstellen, dass er über die Daten zur Verarbeitung von Blöcken verfügt, und eine Verfügbarkeitsherausforderung ausgeben, wenn die Informationen Off-Chain nicht verfügbar sind. Diese Art von Optimistic Rollup wird [Plasma](/developers/docs/scaling/plasma/) genannt.

## Vertrags-Code {#contract-code}

Informationen, die nur einmal geschrieben werden müssen, nie überschrieben werden und auf der Blockchain verfügbar sein müssen, können als Vertrags-Code gespeichert werden. Das bedeutet, dass wir einen „Smart Contract“ mit den Daten erstellen und dann [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) verwenden, um die Informationen zu lesen. Der Vorteil ist, dass das Kopieren von Code relativ günstig ist.

Abgesehen von den Kosten für die Speichererweiterung kostet `EXTCODECOPY` 2600 Gas für den ersten Zugriff auf einen Vertrag (wenn er „kalt“ ist) und 100 Gas für nachfolgende Kopien aus demselben Vertrag plus 3 Gas pro 32-Byte-Wort. Verglichen mit Calldata, die 15,95 pro Byte kosten, ist dies ab etwa 200 Bytes günstiger. Basierend auf [der Formel für Speichererweiterungskosten](https://www.evm.codes/about#memoryexpansion) sind die Kosten für die Speichererweiterung geringer als die Kosten für das Hinzufügen von Calldata, solange Sie nicht mehr als 4 MB Speicher benötigen.

Natürlich sind dies nur die Kosten, um die Daten zu _lesen_. Die Erstellung des Vertrags kostet etwa 32.000 Gas + 200 Gas/Byte. Diese Methode ist nur dann wirtschaftlich, wenn dieselben Informationen viele Male in verschiedenen Transaktionen gelesen werden müssen.

Vertrags-Code kann unsinnig sein, solange er nicht mit `0xEF` beginnt. Verträge, die mit `0xEF` beginnen, werden als [Ethereum Object Format](https://notes.ethereum.org/@ipsilon/evm-object-format-overview) interpretiert, welches viel strengere Anforderungen hat.

## Events {#events}

[Events](https://docs.alchemy.com/docs/solidity-events) werden von Smart Contracts ausgegeben und von Off-Chain-Software gelesen.
Ihr Vorteil ist, dass Off-Chain-Code auf Events lauschen kann. Die Kosten sind [Gas](https://www.evm.codes/#a0?fork=cancun), 375 plus 8 Gas pro Byte an Daten. Bei 12 Gwei/Gas und 2300 $/ETH entspricht dies einem Cent plus 22 Cent pro Kilobyte.

## Speicher {#storage}

Smart Contracts haben Zugriff auf [persistenten Speicher](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Dieser ist jedoch sehr teuer. Das Schreiben eines 32-Byte-Wortes in einen zuvor leeren Speicherplatz kann [22.100 Gas kosten](https://www.evm.codes/#55?fork=cancun). Bei 12 Gwei/Gas und 2300 $/ETH sind das etwa 61 Cent pro Schreibvorgang oder 19,5 $ pro Kilobyte.

Dies ist die teuerste Form der Speicherung in Ethereum.

## Zusammenfassung {#summary}

Diese Tabelle fasst die verschiedenen Optionen sowie ihre Vor- und Nachteile zusammen.

| Speichertyp                 | Datenquelle         | Verfügbarkeitsgarantie                                                                                                             | Verfügbarkeit auf der Blockchain                                 | Zusätzliche Einschränkungen                                             |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| EIP-4844-Blobs              | Off-Chain           | Ethereum-Garantie für [\~18 Tage](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | Nur Hash ist verfügbar                                           |                                                                         |
| Calldata                    | Off-Chain           | Ethereum-Garantie für immer (Teil der Blockchain)                                                                                  | Nur verfügbar, wenn in einen Vertrag geschrieben, und bei dieser Transaktion |                                                                         |
| Off-Chain mit L1-Mechanismen| Off-Chain           | Garantie „eines ehrlichen Verifizierers“ während der Herausforderungsfrist                                                         | Nur Hash                                                         | Garantiert durch den Herausforderungsmechanismus, nur während der Herausforderungsfrist |
| Vertrags-Code               | Auf der Blockchain oder Off-Chain | Ethereum-Garantie für immer (Teil der Blockchain)                                                                                  | Ja                                                               | Geschrieben an eine „zufällige“ Adresse, darf nicht mit `0xEF` beginnen |
| Events                      | Auf der Blockchain  | Ethereum-Garantie für immer (Teil der Blockchain)                                                                                  | Nein                                                             |                                                                         |
| Speicher                    | Auf der Blockchain  | Ethereum-Garantie für immer (Teil der Blockchain und des aktuellen Zustands, bis überschrieben)                                    | Ja                                                               |                                                                         |