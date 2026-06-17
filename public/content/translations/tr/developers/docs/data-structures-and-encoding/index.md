---
title: Veri yapıları ve kodlama
description: Temel Ethereum veri yapılarına genel bir bakış.
lang: tr
sidebarDepth: 2
---

Ethereum büyük hacimlerde veri oluşturur, depolar ve aktarır. Bu veriler, herkesin nispeten mütevazı tüketici sınıfı donanımlarda [bir düğüm çalıştırmasına](/run-a-node/) olanak tanımak için standartlaştırılmış ve bellek açısından verimli yollarla biçimlendirilmelidir. Bunu başarmak için, Ethereum yığınında birkaç özel veri yapısı kullanılır.

## Ön koşullar {#prerequisites}

Ethereum'un ve [istemci yazılımının](/developers/docs/nodes-and-clients/) temellerini anlamalısınız. Ağ katmanına ve [Ethereum tanıtım belgesine](/whitepaper/) aşina olmanız önerilir.

## Veri yapıları {#data-structures}

### Patricia merkle trie'leri {#patricia-merkle-tries}

Patricia Merkle Trie'leri, anahtar-değer çiftlerini deterministik ve kriptografik olarak doğrulanmış bir trie'ye kodlayan yapılardır. Bunlar, Ethereum'un yürütme katmanı genelinde yaygın olarak kullanılır.

[Patricia Merkle Trie'leri hakkında daha fazlası](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Özyineli Uzunluk Öneki {#recursive-length-prefix}

Özyineli Uzunluk Öneki (RLP), Ethereum'un yürütme katmanı genelinde yaygın olarak kullanılan bir serileştirme yöntemidir.

[RLP hakkında daha fazlası](/developers/docs/data-structures-and-encoding/rlp)

### Basit Serileştirme {#simple-serialize}

Basit Serileştirme (SSZ), merklelaştırma ile uyumluluğu nedeniyle Ethereum'un mutabakat katmanındaki baskın serileştirme formatıdır.

[SSZ hakkında daha fazlası](/developers/docs/data-structures-and-encoding/ssz)