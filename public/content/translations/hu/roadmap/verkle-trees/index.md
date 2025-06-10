---
title: Verkle-fák
description: A Verkle-fák részletes bemutatása, illetve annak leírás, hogy miként használják ezeket az Ethereum fejlesztésére
lang: hu
summaryPoints:
  - Fedezze fel, hogy mire valók a Verkle-fák
  - Tekintse meg, hogy a Verkle-fák hogyan járulnak hozzá az Ethereum fejlődéséhez
---

# Verkle-fák {#verkle-trees}

A Verkle-fák (a vektor elköteleződés és a „Merkel-fák” összevonásából) olyan adatstruktúrát alkotnak, amely az Ethereum-csomópontokat fejleszti, hogy ne kelljen nagy mennyiségű státuszadat tárolniuk, de mégis validálni tudják a blokkokat.

## Hontalanság {#statelessness}

A Verkle-fák kritikus lépést jelentenek a státusztalan Ethereum-kliensekhez vezető úton. A státusztalan kliensek úgy tudják validálni a bejövő blokkokat, hogy ahhoz nem kell tárolniuk a teljes státuszadatbázist. Ahelyett, hogy az Ethereum státuszának saját lokális másolatát használnák, a státusztalan kliensek egy „tanút” használnak a státuszadatokhoz, amely a blokkal együtt érkezik. A tanú a státuszadat egyéni darabjainak halmaza, amely ahhoz szükséges, hogy a tranzakciók egy adott kötegét le lehessen futtatni, illetve egy kriptográfiai bizonyíték arra, hogy a tanú valóban a teljes adat része. Ezt a tanút használják a státuszadatbázis _helyett_. Ehhez arra van szükség, hogy a tanúk nagyon kis méretűek legyenek, így biztosan időben el lehet juttatni őket a hálózaton keresztül a validátorokhoz, hogy azt egy 12 másodperces slotban feldolgozzák. A jelenlegi státuszadatstruktúra nem megfelelő, mert a tanúk túl nagy méretűek. A Verkle-fák megoldják ezt a problémát, mert kis méretű tanúkat tudnak készíteni, így a státusztalan kliensek egyik fő akadályát ki tudják küszöbölni.

<ExpandableCard title="Miért van szükség státusztalan kliensekre?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Az Ethereum-kliensek jelenleg a Patricia Merkle Trie-adatstruktúrát használják a státuszadatok tárolására. Az egyéni számlákra vonatkozó információk a fa és a digitális fa leveleiként tárolódnak, ahol a levélpárokat addig hashelik, amíg már csak egyetlen hash marad. Ezt a végső hasht hívják gyökérnek. A blokkellenőrzéshez az Ethereum-kliensek végrehajtják az összes tranzakciót a blokkban és frissítik a lokális státuszfájukat. A blokkot akkor tekintik érvényesnek, amikor a lokális fa gyökere azonos lesz azzal, amit a blokkelőterjesztő adott, mivel ha bármilyen különbség lenne az előterjesztő és a validáló csomópont számolása között, akkor a gyökérhash teljesen eltérne. Ezzel az a gond, hogy a blokklánc validálásához minden kliensnek tárolnia kell a vezetőblokk és számos előzményblokk teljes státuszfáját (a Geth-ben alapvető, hogy a vezetőblokk utáni 128 blokkra megtartják a státuszadatokat). Ehhez a klienseknek nagy tárhelyre van szükségük, ami megakadályozza, hogy teljes csomópontokat lehessen olcsón és kisebb kapacitású hardverrel üzemeltetni. Ezt úgy lehet megoldani, hogy a státuszfát egy hatékonyabb struktúrára (Verkle-fa) cserélik, ami képes kis méretű tanúkkal összefoglalni az adatokat, amit a teljes státuszadat helyett meg lehet osztani a validátorokkal. A státuszadat átformázása a Verkle-fa struktúrájába egy mérföldkő a státuszmentes kliensek bevezetéséhez.

</ExpandableCard>

## Mi az a tanú és miért van rá szükség? {#what-is-a-witness}

A blokk ellenőrzése azt jelenti, hogy a benne lévő tranzakciókat újra végrehajtják, megváltoztatják az Ethereum státuszfát, és kiszámolják az új gyökérhasht. Az érvényes blokk az lesz, amelynek a kiszámolt státuszgyökér-hashe ugyanazt, mint amit a blokkal együtt adtak (mert ekkor a blokkot javasló valóban végrehajtotta a számításokat úgy, ahogy mondja). A jelenlegi Ethereum-kliensekben a státusz frissítéséhez hozzá kell férni a teljes státuszfához, ami egy nagyméretű adatstruktúra, és lokálisan kell azt tárolni. A tanú a státuszadatnak csak töredékeit tartalmazza, ami a blokkban lévő tranzakciók lefuttatásához szükségesek. A validátornak tehát csak ezeket a töredékeket kell használnia arra, hogy leellenőrizze, a javaslattevő végrehajtotta-e a blokk tranzakcióit és megfelelő módon frissítette-e a státuszt. Ugyanakkor ez azt is jelenti, hogy a tanút az Ethereum hálózatán olyan gyorsan kell eljuttatni a peereknek, hogy azt biztosan megkapja és feldolgozza minden egyes csomópont a 12 másodperces slotban. Ha a tanú túl nagy méretű, akkor néhány csomópont számára sokáig tart a letöltése, így nehéz lépést tartani a lánccal. Ez egy centralizáló erő, mert csak gyors internetkapcsolattal bíró csomópontok vehetnek részt a blokkvalidálásban. A Verkle-fák révén nem kell a státuszt a merevlemezen tárolni; a blokk validálásához _mindent_ maga a blokk tartalmaz. Sajnos a Merkle-fákból előállítható tanúk túl nagy méretűek ahhoz, hogy lehetővé tegyék a státusztalan klienseket.

## Hogyan állítható elő a Verkle-fákkal kisebb méretű tanúk? {#why-do-verkle-trees-enable-smaller-witnesses}

A Merkle-fa struktúrája nagy méretű tanúkat ad – ezeket nem lehet biztonsággal szétküldeni a peerek között a 12 másodperces slotban. Ennek az az oka, hogy a tanú egy olyan útvonal, amely összeköti az adatokat (amelyeket a levelek tartalmaznak) a gyökérhash-sel. Az adatok ellenőrzéséhez nem elég az összes köztes hash, ami összeköti a leveleket és a gyökeret, hanem szükség van testvérpontokra is. A bizonyítékban minden csomópontnak van egy testvére, amivel hashelődik, hogy létrehozza a fa következő hashét. Ez rengeteg adat. A Verkle-fák úgy csökkentik a tanú méretét, hogy megrövidítik a falevelek és a gyökér közötti távolságot, és nem kell a testvérpontokat is megadni ahhoz, hogy a gyökér-hash validálható legyen. Még ennél is több hely nyerhető azzal, hogy egy erőteljes polinomiális elköteleződési sémát használnak a hash-stílusú vektorelköteleződés helyett. A polinomiális elköteleződés lehetővé teszi, hogy a tanú adott méretű legyen, függetlenül az általa bizonyított levelek számától.

A polinomiális elköteleződési séma alapján a tanú kezelhető méretű lesz, és könnyedén átadható a peer-to-peer hálózaton keresztül. Ez alapján a kliensek minimális adatmennyiséggel képesek minden blokkban ellenőrizni a státuszváltozást.

<ExpandableCard title="A Verkle-fák pontosan milyen mértékben tudják lecsökkenteni a tanú méretét?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

A tanú mérete a benne lévő levelek száma alapján változik. Feltéve, hogy a tanú 1000 levelet fed le, akkor a Merkle-fához tartozó tanú 3,5 MB lenne (egy 7 szintű fa esetében). Ugyanezen adatok esetében a Verkle-fa tanúja (4 szintű fát feltételezve) 150 kB – **ez nagyjából 23-szor kisebb**. A tanú ilyen szintű méretcsökkenése megengedi, hogy a státusztalan kliensek tanúi elfogadhatóan kicsik maradjanak. A polinomiális tanúk 0,128–1 kB méretűek, attól függően, hogy amelyik polinomiális elköteleződést használják.

</ExpandableCard>

## Mi a Verkle-fák struktúrája? {#what-is-the-structure-of-a-verkle-tree}

A Verkle-fák `key, value` (kulcs, érték) párokból állnak, ahol a kulcsok 32 bájtos elemek, amelyek egy 31 bájtos _tőből_ és egy egyetlen bájtos _toldalékból_ tevődnek össze. Ezek a kulcsok _kiterjesztő_ pontokba és _belső_ pontokba rendeződnek. A kiterjesztőpontok egyetlen tövet képviselnek 256 gyermek számára különböző toldalékokkal. A belső pontoknak is 256 gyermekük van, de ezek lehetnek más kiterjesztőpontok is. A Verkle- és a Merkle-fastruktúra közötti fő különbség az, hogy a Verkle-fa sokkal laposabb, kevesebb köztes pont kapcsolja a levelet a gyökérhez, ezért kevesebb adat kell a bizonyíték legyártásához.

![](./verkle.png)

[Tudjon meg többet a Verkle-fák struktúrájáról](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Jelenlegi helyzet {#current-progress}

A Verkle-fa teszthálózatai már működnek, de jelentős mértékű kliensfrissítésre van még szükség ahhoz, hogy támogatni tudják ezt az adatstruktúrát. Ön is segíthet a fejlesztés meggyorsításában, ha szerződéseket hoz létre a teszthálózaton és klienseket működtet a teszthez.

[Fedezze fel a Verkle Gen Devnet 6 teszthálózatot](https://verkle-gen-devnet-6.ethpandaops.io/)

[Nézze meg, ahogy Guillaume Ballet bemutatja a Condrieu Verkle-teszthálózatot](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (a Condrieu teszthálózat még a proof-of-work mechanizmus szerint működött, és mára már Verkle Gen Devnet 6 teszthálózat váltotta fel).

## További olvasnivaló {#further-reading}

- [Verkle-fák a státusztalanság megvalósításához](https://verkle.info/)
- [Dankrad Feist magyarázata a Verkle-fákról a PEEPanEIP csatornán](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet magyarázata a Verkle-fákról az ETHGlobal rendezvényen](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [„Hogyan segítenek a Verkle-fák abban, hogy az Ethereum áttekinthető és egyszerű legyen?” – Guillaume Ballet előadása a Devcon 6 rendezvényen](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam előadása a státusztalan kliensekről az ETHDenver 2020-as rendezvényén](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest Verkle-fákról és státuszmentességről szóló podcastja a Zero Knowledge csatornán](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin magyarázata a Verkle-fákról](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist magyarázata a Verkle-fákról](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [A Verkle-fák EIP-dokumentációja](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
