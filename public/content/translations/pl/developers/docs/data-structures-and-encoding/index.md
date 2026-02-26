---
title: Struktura i kodowanie danych
description: "Przegląd podstawowych struktur danych Ethereum."
lang: pl
sidebarDepth: 2
---

Ethereum tworzy, przechowuje i przesyła duże ilości danych. Dane te muszą być sformatowane w ustandaryzowany i wydajny pod względem pamięci sposób, aby umożliwić każdemu [uruchomienie węzła](/run-a-node/) na stosunkowo skromnym sprzęcie klasy konsumenckiej. Aby to osiągnąć, w stosie Ethereum używanych jest kilka specyficznych struktur danych.

## Wymagania wstępne {#prerequisites}

Należy zrozumieć podstawy Ethereum i [oprogramowania klienckiego](/developers/docs/nodes-and-clients/). Zalecana jest znajomość warstwy sieciowej i [białej księgi Ethereum](/whitepaper/).

## Struktury danych {#data-structures}

### Drzewa Patricia Merkle {#patricia-merkle-tries}

Drzewa Patricia Merkle to struktury, które kodują pary klucz-wartość w deterministyczne i kryptograficznie uwierzytelnione drzewo. Są one szeroko stosowane w warstwie wykonawczej Ethereum.

[Więcej o drzewach Patricia Merkle](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) to metoda serializacji szeroko stosowana w warstwie wykonawczej Ethereum.

[Więcej o RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) to dominujący format serializacji w warstwie konsensusu Ethereum ze względu na jego zgodność z merkelizacją.

[Więcej o SSZ](/developers/docs/data-structures-and-encoding/ssz)
