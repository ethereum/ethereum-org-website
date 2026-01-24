---
title: Datenstrukturen und Kodierung
description: Eine Übersicht über die grundlegenden Ethereum-Datenstrukturen.
lang: de
sidebarDepth: 2
---

Ethereum erstellt, speichert und überträgt große Datenmengen. Diese Daten müssen auf standardisierte und speichereffiziente Weise formatiert werden, damit jeder auf relativ bescheidener handelsüblicher Hardware [einen Node ausführen](/run-a-node/) kann. Um dies zu erreichen, werden auf dem Ethereum Stack mehrere spezifische Datenstrukturen verwendet.

## Voraussetzungen {#prerequisites}

Sie sollten die Grundlagen von Ethereum und [Client-Software](/developers/docs/nodes-and-clients/) verstehen. Es wird empfohlen, mit der Netzwerkschicht und [dem Ethereum-Whitepaper](/whitepaper/) vertraut zu sein.

## Datenstrukturen {#data-structures}

### Patricia Merkle Tries {#patricia-merkle-tries}

Patricia Merkle Versucht sind Strukturen, die Schlüssel-Wert-Paare in einen deterministischen und kryptografisch authentifizierten Trie kodieren. Diese werden in der gesamten Ausführungsschicht von Ethereum umfassend verwendet.

[Mehr über Patricia Merkle Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) ist eine Serialisierungs methode, die in der gesamten Ausführungsschicht von Ethereum häufig verwendet wird.

[Mehr über RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialise (SSZ) ist aufgrund seiner Kompatibilität mit der Merklelizierung das dominierende Serialisierungsformat auf der Konsensebene von Ethereum.

[Mehr über SSZ](/developers/docs/data-structures-and-encoding/ssz)
