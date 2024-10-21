---
title: Decentralizált tárhely
description: Áttekintés a decentralizált tárhelyről és az elérhető eszközökről, amellyekkel integrálhatóak a dappokba.
lang: hu
---

A központilag elhelyezett, egyetlen vállalat vagy szervezet által működtetett szerverrel szemben a decentralizált tárolórendszerek a felhasználói operátorok peer-to-peer hálózatából állnak, akik az összes adat egy részét tárolják egy rugalmas fájltárolási és -megosztási rendszert létrehozva. Ezek lehetnek blokklánc-alapú alkalmazásokban vagy bármilyen, közvetítő nélküli hálózatokban.

Magát az Ethereumot is lehet decentralizált tárolórendszerként használni, és úgy is működik, amikor az okosszerződések kódjait kell tárolni. Ugyanakkor az Ethereumot nem arra tervezték, hogy nagy adathalmazokat tároljon. A lánc stabilan növekszik, a jelen írás idején az Ethereum lánc kb. 500 GB – 1TB méretű ([a klienstől függően](https://etherscan.io/chartsync/chaindefault)), és a hálózat minden csomópontjának tárolnia kell ezt az adatmennyiséget. Ha a lánc nagy adatmennyiségre növekedne meg (mondjuk 5 TB méretre), akkor már nem minden csomópont tudna működni. Ezen túl ennyi adat bevitele a főhálózatra is ellehetetlenítő módon drága lenne a [gázdíjak](/developers/docs/gas) miatt.

Ezen megszorítások miatt egy másik láncra vagy módszerre van szükség, hogy az adatok nagy tömegét decentralizált módon tároljuk.

Amikor decentralizált tárhely (dStorage) opcióról beszélünk, akkor a felhasználónak néhány dolgot fontos figyelembe vennie.

- Megtartási mechanizmus / ösztönzési struktúra
- Adatmegtartás kényszere
- Decentralitás
- Konszenzus

## Megtartási mechanizmus / ösztönzési struktúra {#persistence-mechanism}

### Blokkláncalapú {#blockchain-based}

Ahhoz, hogy egy adat örökké létezzen, valamilyen megtartási mechanizmusra van szükség. Például az Ethereumon az a megtartási mechanizmus, hogy a csomópont futtatásánál az egész láncra szükség van. Az új adat a lánchoz kerül, és így az folyamatosan növekszik – az összes csomópontnak replikálnia kell az összes beágyazott adatot.

Ezt úgy nevezik, hogy **blokkláncalapú** megtartás.

A blokkláncalapú megtartással az a gond, hogy a lánc túl nagyra nőket, hogy fenntartsa és tárolja az összes adatot (például [számos forrás](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) úgy becsli, hogy az Internet több mint 40 zettabájt tárhelyet igényel).

A blokkláncnak emellett valamilyen ösztönzési struktúrát kell alkalmaznia. A blokkláncalapú megtartáshoz a validátorok fizetséget kapnak. Amikor az adat hozzákerül a lánchoz, a validátorok jutalmat kapnak a bekerülés intézéséért.

Blokkláncalapú megtartással működő platformok:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Szerződésalapú {#contract-based}

A **szerződésalapú** megtartás úgy véli, hogy az adatot nem replikálhatja és tárolhatja örökké minden csomópont, ehelyett inkább szerződéses megállapodással kell azt fenntartani. Ezeket a megállapodásokat számos csomóponttal kötik, amelyek megígérik, hogy egy adott időszakra megtartják az adatot. Ezt vissza kell fizetni vagy meg kell újítani, amikor már nem tartják meg az adatot.

A legtöbb esetben nem az adatot tárolják a láncon, hanem azt a hasht, ami az adat tárolási helyét mutatja. Így a teljes láncot nem kell skálázni, hogy minden adat elférjen.

Szerződésalapú megtartással működő platformok:

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### További megfontolások {#additional-consideration}

Az IPFS (InterPlanetary File System) egy elosztott rendszer fájlok, honlapok, alkalmazások és adatok tárolására és elérésére. Nincs beépített ösztönzési sémája, de használható bármelyik szerződésalapú ösztönzési megoldással a hosszú távú megtartásért. Egy másik módja annak, hogy az IPFS-en megmaradjon az adat, az az odatűzési (pinning) szolgáltatás, mely rögzíti az Önnek fontos adatokat, hogy Ön elérje azokat. Ön is futtathat saját IPFS csomópontot és hozzájárulhat a hálózathoz, hogy fenntartja a saját és más adatait ingyen!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS pinning service)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin pinning service)_
- [Infura](https://infura.io/product/ipfs) _(IPFS pinning service)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS pinning explorer)_
- [4EVERLAND](https://www.4everland.org/)_（IPFS pinning service）_
- [Filebase](https://filebase.com) _(IPFS Pinning Service)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoin pinning szolgáltatás)_

A SWARM egy decentralizáld adattárhely és elosztási technológia, mely tárolási ösztönzőrendszerrel és egy tárhelybérleti-költséges orákulummal működik.

## Adatmegőrzés {#data-retention}

Az adat megtartásához a rendszereknek valamilyen mechanizmusra van szükségük, hogy ezt biztosítsák.

### Kihívásalapú mechanizmus {#challenge-mechanism}

Az egyik legnépszerűbb módszer az adatmegtartásra, hogy valamilyen kriptográfiai kihívást használnak, amelyet a csomópontokhoz küldenek annak ellenőrzésére, hogy azok tényleg rendelkeznek-e az adattal. Egy egyszerű példa az Arweave hozzáférés-bizonyítása. Egy kihívást küldenek a csomópontoknak, hogy azoknál megvan-e a legutóbbi blokk és egy tetszőleges korábbi blokk. Ha a csomópont nem tud válaszolni, akkor megbüntetik.

A kihívásmechanizmussal rendelkező decentralizált tárhelyek típusai:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Decentralitás {#decentrality}

A platformok decentralitását nem lehet könnyen mérni, de általában olyan eszközt válasszon, amelyik nem valamilyen KYC-féle (ismerje meg ügyfelét) dolgot használ arra, hogy bizonyítékot adjon a decentralitásáról.

Decentralizált eszközök KYC nélkül:

- Züs (egy KYC nélküli kiadást implementál)
- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Konszenzus {#consensus}

A legtöbb eszköz rendelkezik valamilyen [konszenzusmechanizmussal](/developers/docs/consensus-mechanisms/), általában [**proof-of-work (PoW)**](/developers/docs/consensus-mechanisms/pow/) vagy [**proof-of-stake (PoS)** mechanizmust használnak](/developers/docs/consensus-mechanisms/pos/).

Proof-of-work-alapú:

- Skynet
- Arweave

Proof-of-stake-alapú:

- Ethereum
- Filecoin
- Züs
- Crust Network

## Kapcsolódó eszközök {#related-tools}

**IPFS – _InterPlanetary File System egy decentralizált tárhely és fájlreferencia-rendszer Ethereumra._**

- [Ipfs.io](https://ipfs.io/)
- [Dokumentáció](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS – _Biztonságos, privát és S3-kompatibilis, decentralizált felhőobjektum-tárhely fejlesztőknek._**

- [Storj.io](https://storj.io/)
- [Dokumentáció](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Skynet – _A Skynet egy decentralizált PoW lánc, ami a decentralizált web felé elkötelezett._**

- [Skynet.net](https://siasky.net/)
- [Dokumentáció](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin – _Filecoint az IPFS mögötti csapat hozta létre. Ez egy ösztönzőréteg az IPFS ideálok tetején._**

- [Filecoin.io](https://filecoin.io/)
- [Dokumentáció](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave – _Az Arweave egy dStorage platform adattárolásra._**

- [Arweave.org](https://www.arweave.org/)
- [Dokumentáció](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs – _A Züs egy proof-of-stake dStorage platform shardinggal és blobberekkel._**

- - [zus.network](https://zus.network/)
- [Dokumentáció](https://0chaindocs.gitbook.io/zus-docs)
- [GitHub](https://github.com/0chain/)

**Crust Network – _Crust egy dStorage platform az IPFS tetején._**

- [Crust.network](https://crust.network)
- [Dokumentáció](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm – _Egy elosztott tárhely platform és tartalom elosztó szolgáltatás az Ethereum web3-stackhez._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Dokumentáció](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB – _Egy decentralizált peer-to-peer adatbázis az IPFS tetején._**

- [OrbitDB.org](https://orbitdb.org/)
- [Dokumentáció](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im – _Decentralizált felhőprojekt (adatbázis, fájltárolás, számítás és DID). A láncon kívüli és belüli, közvetítőmentes (peer-to-peer) technológia egyedi keveréke. IPFS-sel és többféle lánccal kompatibilis._**

- [Aleph.im](https://aleph.im/)
- [Dokumentáció](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic – _Felhasználó által kontrollált IPFS-adatbázis az adatgazdag alkalmazásokért._**

- [Ceramic.network](https://ceramic.network/)
- [Dokumentáció](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase – _S3-kompatibilis decentralizált tárhely és georedundáns IPFS pinning szolgáltatás. Az IPFS-re a Filebase-en keresztül feltöltött összes fájlt automatikusan hozzátűzi a Filebase infrastruktúrához 3-szoros replikációval világszerte._**

- [Filebase.com](https://filebase.com/)
- [Dokumentáció](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND – _Egy Web 3.0 felhőszámítási platform, ami integrálja a tárolás, számítás és hálózatépítés lényegi képességeit, S3-kompatibilis és szinkron adattárolást kínál olyan decentralizált tárolóhálózatokon, mint amilyen az IPFS és az Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Dokumentáció](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido – _Egy blokklánc mint szolgáltatás platform gombnyomásos IPFS csomópontokkal_**

- [Kaleido](https://kaleido.io/)
- [Dokumentáció](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _A Spheron egy platform mint szolgáltatás (PaaS), amelyet olyan dappok számára terveztek, amelyek jó teljesítményű decentralizált infrastruktúrán szeretnék elindítani alkalmazásaikat. Számítási kapacitást, decentralizált tárolást, CDN & web hosting szolgáltatás kínál._**

- [spheron.network](https://spheron.network/)
- [Dokumentáció](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## További olvasnivaló {#further-reading}

- [Mi az a decentralizált tárhely?](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) – _CoinMarketCap_
- [Öt gyakori mítosz lerombolása a decentralizált tárhelyről](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) – _Storj_

_Ismer olyan közösségi információforrást, amely a hasznára vált? Módosítsa az oldalt, és adja hozzá!_

## Kapcsolódó témák {#related-topics}

- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)
