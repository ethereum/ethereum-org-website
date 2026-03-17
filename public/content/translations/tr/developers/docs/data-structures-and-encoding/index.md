---
title: "Veri yapıları ve kodlama"
description: "Temel Ethereum veri yapılarına genel bir bakış."
lang: tr
sidebarDepth: 2
---

Ethereum, büyük miktarda veri üretir, depolar ve transfer eder. Bu verinin, herhangi birinin nispeten mütevazı, tüketici sınıfı bir donanımda [bir düğüm çalıştırmasına](/run-a-node/) olanak tanımak için standartlaştırılmış ve bellek açısından verimli yollarla biçimlendirilmesi gerekir. Bunu başarmak için Ethereum yığınında belirli birkaç veri yapısı kullanılır.

## Ön Koşullar {#prerequisites}

Ethereum'un temellerini ve [istemci yazılımını](/developers/docs/nodes-and-clients/) anlamalısınız. Ağ katmanına ve [Ethereum tanıtım belgesine](/whitepaper/) aşina olmanız önerilir.

## Veri yapıları {#data-structures}

### Patricia Merkle ağaçları {#patricia-merkle-tries}

Patricia Merkle Dijital Ağaçları, anahtar-değer çiftlerini belirleyici ve kriptografik açıdan kimliği doğrulanmış bir dijital ağaç şeklinde kodlayan yapılardır. Bu yapılar, Ethereum'un yürütüm katmanında yaygın olarak kullanılır.

[Patricia Merkle Ağaçları hakkında daha fazla bilgi](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Özyinelemeli Uzunluk Ön Eki {#recursive-length-prefix}

Özyinelemeli Uzunluk Ön Eki (RLP), Ethereum'un yürütüm katmanında yaygın şekilde kullanılan bir serileştirme yöntemidir.

[RLP hakkında daha fazla bilgi](/developers/docs/data-structures-and-encoding/rlp)

### Basit Serileştirme {#simple-serialize}

Basit Serileştirme (SSZ), merkle işlemi ile uyumluluğu nedeniyle Ethereum'un fikir birliği katmanında kullanılan baskın serileştirme biçimidir.

[SSZ hakkında daha fazla bilgi](/developers/docs/data-structures-and-encoding/ssz)
