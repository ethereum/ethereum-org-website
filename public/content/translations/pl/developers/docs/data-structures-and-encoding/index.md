---
title: Struktury danych i kodowanie
description: Przegląd podstawowych struktur danych Ethereum.
lang: pl
sidebarDepth: 2
---

Ethereum tworzy, przechowuje i przesyła duże ilości danych. Dane te muszą być formatowane w ustandaryzowany i oszczędny pod względem pamięci sposób, aby umożliwić każdemu [uruchomienie węzła](/run-a-node/) na stosunkowo skromnym sprzęcie konsumenckim. Aby to osiągnąć, w stosie technologicznym Ethereum wykorzystuje się kilka specyficznych struktur danych.

## Wymagania wstępne {#prerequisites}

Powinieneś rozumieć podstawy Ethereum oraz [oprogramowania klienta](/developers/docs/nodes-and-clients/). Zalecana jest znajomość warstwy sieciowej oraz [białej księgi Ethereum](/whitepaper/).

## Struktury danych {#data-structures}

### Drzewa Patricia Merkle {#patricia-merkle-tries}

Drzewa Patricia Merkle to struktury, które kodują pary klucz-wartość w deterministyczne i kryptograficznie uwierzytelnione drzewo poszukiwań (trie). Są one powszechnie używane w całej warstwie wykonawczej Ethereum.

[Więcej o drzewach Patricia Merkle](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) to metoda serializacji powszechnie używana w całej warstwie wykonawczej Ethereum.

[Więcej o RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) to dominujący format serializacji w warstwie konsensusu Ethereum ze względu na jego kompatybilność z procesem tworzenia drzew Merkle (merklelization).

[Więcej o SSZ](/developers/docs/data-structures-and-encoding/ssz)