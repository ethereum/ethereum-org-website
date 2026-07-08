---
title: Struktur data dan pengodean
description: Gambaran umum tentang struktur data dasar Ethereum.
lang: id
sidebarDepth: 2
---

Ethereum membuat, menyimpan, dan mentransfer data dalam volume besar. Data ini harus diformat dengan cara yang terstandardisasi dan hemat memori untuk memungkinkan siapa saja [menjalankan node](/run-a-node/) pada perangkat keras tingkat konsumen yang relatif sederhana. Untuk mencapai hal ini, beberapa struktur data spesifik digunakan pada tumpukan Ethereum.

## Prasyarat {#prerequisites}

Anda harus memahami dasar-dasar Ethereum dan [perangkat lunak klien](/developers/docs/nodes-and-clients/). Disarankan untuk familier dengan lapisan jaringan dan [buku putih Ethereum](/whitepaper/).

## Struktur data {#data-structures}

### Trie Patricia merkle {#patricia-merkle-tries}

Trie Patricia Merkle adalah struktur yang mengodekan pasangan kunci-nilai ke dalam trie yang deterministik dan diautentikasi secara kriptografis. Struktur ini digunakan secara luas di seluruh lapisan eksekusi Ethereum.

[Lebih lanjut tentang Trie Patricia Merkle](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) adalah metode serialisasi yang digunakan secara luas di seluruh lapisan eksekusi Ethereum.

[Lebih lanjut tentang RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) adalah format serialisasi dominan pada lapisan konsensus Ethereum karena kompatibilitasnya dengan merklelisasi.

[Lebih lanjut tentang SSZ](/developers/docs/data-structures-and-encoding/ssz)