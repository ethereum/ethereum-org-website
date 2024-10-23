---
title: Jövőálló Ethereum
description: Ezek a fejlesztések az Ethereumot ellenálló, decentralizált alapréteggé teszik a jövő számára, bármit is hozzon az.
lang: hu
image: /images/roadmap/roadmap-future.png
alt: "Ethereum-ütemterv"
template: roadmap
---

Az ütemterv néhány eleme nem feltétlenül a skálázáshoz vagy a biztonsághoz tartozik, hanem stabilizálja és a jövőben is megbízhatóvá teszi az Ethereumot.

## A kvantumnak való ellenállóság {#quantum-resistance}

A jelenlegi Ethereumot biztosító [kriptográfia](/glossary/#cryptography) egy része veszélybe kerül, amikor a kvantumszámítás valósággá válik. Habár a kvantum számítógépek valószínűleg évtizedekre vannak attól, hogy valódi veszélyt jelentsenek a modern kriptográfiának, az Ethereumot úgy építik, hogy évszázadokig működjön. Tehát az [Ethereumot ellenállóvá kell tenni a kvantummal](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) szemben, amilyen gyorsan csak lehet.

Az Ethereum fejlesztői előtt álló kihívás az, hogy a jelenlegi [proof-of-stake](/glossary/#pos) protokoll egy nagyon hatékony aláírási rendszerre, a BLS-re támaszkodik az érvényes [blokkok](/glossary/#block) szavazatainak összesítésére. Ezt az aláírási sémát a kvantum számítógép fel tudja törni, de a kvantumnak ellenálló verziók nem olyan hatékonyak.

A [KZG elköteleződési sémák](/roadmap/danksharding/#what-is-kzg) számos helyen megtalálhatók az Ethereumban, hogy kriptográfiai titkokat állítsanak elő, és ezek sebezhetők a kvantummal szemben. Jelenleg ezt úgy kerülik meg, hogy bizalmat igénylő összeállítást használnak, tehát több entitás állítja elő a véletlenszerűséget, amit nem tud a kvantum számítógép visszakövetni. Azonban az ideális megoldás a kvantumbiztos kriptográfia lenne. Két vezető megközelítés létezik, amely képes lenne a BLS-sémát helyettesíteni: a [STARK-alapú](https://hackmd.io/@vbuterin/stark_aggregation) és a [háló alapú](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) aláírás. **Ezek kutatása és prototípusa még folyamatban van**.

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> Tudjon meg többet a KZG-ről és a bizalmat igénylő összeállításról</ButtonLink>

## Egyszerűbb és hatékonyabb Ethereum {#simpler-more-efficient-ethereum}

A komplexitás teret ad a hibáknak vagy a sebezhetőségnek, amit a támadók ki tudnak használni. Ezért a ütemtervnek része az Ethereum leegyszerűsítése, valamint az olyan kódok eltávolítása, amelyek szükségtelenek vagy amelyeket már most tovább lehet fejleszteni. A jól átlátható, egyszerű kódbázis könnyebb fenntarthatóságot tesz lehetővé a fejlesztők számára.

Számos fejlesztést fognak eszközölni az [Ethereum Virtuális Géppel (EVM)](/developers/docs/evm) kapcsolatban, hogy egyszerűbb és hatékonyabb legyen. Ezek között megtalálható a [ SELFDESTRUCT operációskód eltávolítása](https://hackmd.io/@vbuterin/selfdestruct) – egy ritkán használt utasítás, amelyre már nincs szükség, és még veszélyes is lehet, főleg más várható fejlesztéseket illetően az Ethereum-tárolási modelljét tekintve. Az [Ethereum-kliensek](/glossary/#consensus-client) továbbra is támogatnak néhány régi tranzakciótípust, amelyek most már teljesen eltávolíthatók. A [gáz](/glossary/#gas) számítási módja is javítható, és hatékonyabb módszerek alkalmazhatók egyes kriptográfiai műveletek aritmetikai alátámasztására.

Hasonlóan, az Ethereum-kliensek más részeit is frissíteni lehet. Például a végrehajtási és konszenzusos kliensek más adattömörítést használnak. Könnyebb és intuitívabb a kliensek közötti adatmegosztás, ha a sémák egységesek az egész hálózaton keresztül.

## Jelenlegi helyzet {#current-progress}

Az Ethereum jövőbiztosságának biztosításához szükséges frissítések többsége **még a kutatási fázisban van, és több év múlva is lehet** a megvalósítás. Az olyan frissítések, mint a SELFDESTRUCT eltávolítása, valamint a végrehajtási és konszenzusos kliensben lévő tömörítési séma egységesítése valószínűleg hamarabb megtörténik, mint a kvantumnak ellenálló kriptográfia megvalósítása.

**További olvasnivaló**

- [Gáz](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Adatstruktúrák](/developers/docs/data-structures-and-encoding)
