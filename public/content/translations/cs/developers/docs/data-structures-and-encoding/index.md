---
title: "Datové struktury a kódování"
description: "Přehled základních datových struktur Etherea."
lang: cs
sidebarDepth: 2
---

Ethereum vytváří, ukládá a přenáší velké objemy dat. Tato data musí být formátována standardizovaným a paměťově efektivním způsobem, aby komukoli umožnila [provozovat uzel](/run-a-node/) na relativně skromném spotřebitelském hardwaru. K dosažení tohoto cíle se v zásobníku Etherea používá několik specifických datových struktur.

## Předpoklady {#prerequisites}

Měli byste rozumět základům Etherea a [klientskému softwaru](/developers/docs/nodes-and-clients/). Doporučuje se obeznámenost se síťovou vrstvou a [bílou knihou Etherea](/whitepaper/).

## Datové struktury {#data-structures}

### Patricia Merkle tries {#patricia-merkle-tries}

Patricia Merkle trie jsou struktury, které kódují páry klíč-hodnota do deterministické a kryptograficky ověřené trie. Ty se hojně využívají napříč exekuční vrstvou Etherea.

[Více o Patricia Merkle tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) je metoda serializace, která se hojně využívá napříč exekuční vrstvou Etherea.

[Více o RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) je dominantní formát serializace na vrstvě konsensu Etherea díky své kompatibilitě s merklelizací.

[Více o SSZ](/developers/docs/data-structures-and-encoding/ssz)