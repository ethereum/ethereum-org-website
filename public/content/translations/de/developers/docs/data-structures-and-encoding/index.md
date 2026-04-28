---
title: Datenstrukturen und Codierung
description: "Ein Überblick über die grundlegenden Ethereum-Datenstrukturen."
lang: de
sidebarDepth: 2
---

Ethereum erstellt, speichert und überträgt große Datenmengen. Diese Daten müssen auf standardisierte und speichereffiziente Weise formatiert werden, damit jeder einen [Blockchain-Knoten](/run-a-node/) auf relativ bescheidener, handelsüblicher Hardware betreiben kann. Um dies zu erreichen, werden im Ethereum-Stack verschiedene spezifische Datenstrukturen verwendet.

## Voraussetzungen {#prerequisites}

Sie sollten die Grundlagen von Ethereum und [Client-Software](/developers/docs/nodes-and-clients/) verstehen. Vertrautheit mit der Netzwerkschicht und [dem Ethereum-Whitepaper](/whitepaper/) wird empfohlen.

## Datenstrukturen {#data-structures}

### Patricia-Merkle-Tries {#patricia-merkle-tries}

Patricia-Merkle-Tries sind Strukturen, die Schlüssel-Wert-Paare in einen deterministischen und kryptografisch authentifizierten Trie codieren. Diese werden in der gesamten Ausführungsebene von Ethereum ausgiebig genutzt.

[Mehr zu Patricia-Merkle-Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) ist eine Serialisierungsmethode, die in der gesamten Ausführungsebene von Ethereum ausgiebig genutzt wird.

[Mehr zu RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) ist das dominierende Serialisierungsformat auf der Konsensebene von Ethereum, da es mit der Merklelisierung kompatibel ist.

[Mehr zu SSZ](/developers/docs/data-structures-and-encoding/ssz)