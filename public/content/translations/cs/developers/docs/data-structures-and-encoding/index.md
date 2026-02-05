---
title: "Datové struktury a kódování"
description: "Přehled základních datových struktur Etherea."
lang: cs
sidebarDepth: 2
---

Ethereum vytváří, ukládá a přenáší velké objemy dat. Tato data musí být formátována standardizovaným a paměťově efektivním způsobem, aby bylo možné [provozovat uzel](/run-a-node/) na relativně nenáročném hardwaru. K dosažení tohoto cíle se v rámci Etherea používá několik specifických datových struktur.

## Předpoklady {#prerequisites}

Měli byste rozumět základům Etherea a [klientskému softwaru](/developers/docs/nodes-and-clients/). Doporučuje se obeznámenost se síťovou vrstvou a [whitepaperem Etherea](/whitepaper/).

## Datové struktury {#data-structures}

### Patricia Merkle tries {#patricia-merkle-tries}

Patricia Merkle Trie jsou struktury, které kódují páry klíč-hodnota do deterministického a kryptograficky ověřeného trie. Tyto struktury se hojně používají v rámci exekuční vrstvy Etherea.

[Více o Patricia Merkle Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Rekurzivní délkový prefix {#recursive-length-prefix}

Rekurzivní délkový prefix (RLP) je metoda serializace, která se hojně využívá v rámci exekuční vrstvy Etherea.

[Více o RLP](/developers/docs/data-structures-and-encoding/rlp)

### Jednoduchá serializace {#simple-serialize}

Jednoduchá serializace (SSZ) je dominantním formátem serializace v konsensuální vrstvě Etherea kvůli její kompatibilitě s merkelizací.

[Více o SSZ](/developers/docs/data-structures-and-encoding/ssz)
