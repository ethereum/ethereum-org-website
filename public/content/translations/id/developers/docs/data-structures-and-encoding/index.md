---
title: Struktur data dan pengodean
description: Gambaran umum tentang struktur data Ethereum yang mendasar.
lang: id
sidebarDepth: 2
---

Ethereum membuat, menyimpan, dan mentransfer data dalam jumlah besar. Data ini harus diformat dengan cara yang terstandardisasi dan hemat memori agar siapa pun dapat [menjalankan node](/run-a-node/) pada perangkat keras kelas konsumen yang relatif sederhana. Untuk mencapai hal ini, beberapa struktur data spesifik digunakan pada tumpukan Ethereum.

## Persyaratan {#prerequisites}

Anda harus memahami dasar-dasar Ethereum dan [perangkat lunak klien](/developers/docs/nodes-and-clients/). Disarankan untuk memahami lapisan jaringan dan [Kertas Putih Ethereum](/whitepaper/).

## Struktur data {#data-structures}

### Patricia merkle tries {#patricia-merkle-tries}

Patricia Merkle Trie adalah struktur yang menyandi pasangan kunci-nilai ke dalam trie yang deterministik dan terautentikasi secara kriptografi. Ini digunakan secara luas di seluruh lapisan eksekusi Ethereum.

[Selengkapnya tentang Patricia Merkle Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) adalah metode serialisasi yang digunakan secara luas di seluruh lapisan eksekusi Ethereum.

[Selengkapnya tentang RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) adalah format serialisasi utama di lapisan konsensus Ethereum karena kompatibilitasnya dengan merklelisasi.

[Selengkapnya tentang SSZ](/developers/docs/data-structures-and-encoding/ssz)
