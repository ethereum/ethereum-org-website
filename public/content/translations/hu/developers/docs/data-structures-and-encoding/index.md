---
title: Adatszerkezetek és kódolás
description: Az alapvető Ethereum adatstruktúrák áttekintése.
lang: hu
sidebarDepth: 2
---

Az Ethereum nagy adatkötegeket hoz létre, tárol és mozgat. Az adatot standard és memóriahatékony módon kell formázni, hogy bárki tudjon [csomópontot futtatni](/run-a-node/) viszonylag szerény, fogyasztói szintű hardveren. Ehhez az Ethereum stackben számos speciális adatstruktúra található.

## Előfeltételek {#prerequisites}

Ehhez érdemes áttekinteni az Ethereum és a [kliensszoftver](/developers/docs/nodes-and-clients/) alapjait. Emellett javasoljuk, hogy a hálózati réteggel és az [Ethereum fehérkönyvvel](/whitepaper/) is ismerkedjen meg.

## Adatstruktúrák {#data-structures}

### Patricia Merkle-fák {#patricia-merkle-tries}

A Patricia Merkle-fák olyan struktúrák, melyek kulcs-érték párokat kódolnak egy determinisztikus és kriptográfiailag hitelesített fastruktúrává. Ezeket kiterjedten használják az Ethereum végrehajtási rétegén.

[Bővebben a Patricia Merkle-fákról](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Rekurzív hosszúságú prefixum (RLP) {#recursive-length-prefix}

A rekurzív hosszúságú prefixum (RLP) egy sorozatosítási módszer, melyet kiterjedten használnak az Ethereum végrehajtási rétegén.

[További tudnivalók az RLP-ről](/developers/docs/data-structures-and-encoding/rlp)

### Egyszerű sorosítás (SSZ) {#simple-serialize}

Az egyszerű sorosítás (SSZ) a domináns sorosítási formátum az Ethereum konszenzus rétegén, mivel kompatibilis a merklelizációval.

[További tudnivalók az SSZ-ről](/developers/docs/data-structures-and-encoding/ssz)
