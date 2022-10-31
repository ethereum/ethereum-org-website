---
title: Csomópontok, mint szolgáltatás
description: Belépőszintű áttekintés a csomópont-szolgáltatásokról, az előnyökről és hátrányokról, valamint a népszerű szolgáltatókról.
lang: hu
sidebarDepth: 2
isOutdated: true
---

## Bevezetés {#Introduction}

A saját [Ethereum csomópontod](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) futtatása kihívás lehet, különösen az induláskor vagy a gyors méretezés során. [Számos szolgáltatás van](#popular-node-services), mely optimált csomópont infrastruktúrát futtat neked, így jobban összpontosíthatsz az alkalmazásod vagy terméked fejlesztésére. Elmondjuk, hogyan működnek a csomópont-szolgáltatások, azok használatának előnyeit és hátrányait, valamint felsoroljuk a szolgáltatókat, ha érdekel az indulás.

## Előfeltételek {#prerequisites}

Ha nem tudod, hogy mik azok a csomópontok és kliensek, akkor nézd meg a [Csomópontok és kliensek](/developers/docs/nodes-and-clients/) című anyagot.

## Hogyan működnek a csomópontszolgáltatások? {#how-do-node-services-work}

A csomópontszolgáltatók elosztott csomópont klienseket futtatnak a színfalak mögött, így neked nem kell.

Ezek a szolgáltatások általában egy API kulcsot adnak, amivel írhatsz és olvashatsz a blokkláncról. Gyakran biztosítanak hozzáférést az [Ethereum tesztnetekhez](/developers/docs/networks/#ethereum-testnets) a főhálózat mellett.

Egyes szolgáltatások saját dedikált csomópontot kínálnak, amelyet a te számodra tartanak fenn, míg mások terheléselosztókkal oszlatják el a tevékenységet a csomópontok között.

Szinte az összes csomópontszolgáltatás rendkívül könnyen integrálható, egy sor változtatással jár a kódban, hogy kicseréld az önállóan üzemeltetett csomópontot, vagy akár válts maguk a szolgáltatások között.

Gyakran a csomópontszolgáltatók különféle [csomópont klienseket](/developers/docs/nodes-and-clients/#execution-clients) és [típusokat](/developers/docs/nodes-and-clients/#node-types) futtatnak, lehetővé téve ezzel, a teljes vagy archívcsomóponti hozzáférést továbbá kliens specifikus metódusokat egy API-ban.

Fontos megjegyezni, hogy a csomópontszolgáltatások nem tárolják és nem is tárolhatják a privát kulcsokat vagy információkat.

## Mik az előnyei a csomópontszolgáltatások használatának? {#benefits-of-using-a-node-service}

A csomópont szolgáltatás használatának legfőbb előnye, hogy nem kell neked mérnöki időt tölteni a csomópontok fenntartásával és kezelésével. Ez lehetővé teszi, hogy a termék építésére összpontosíts, ahelyett, hogy aggódnod kellene az infrastruktúra karbantartása miatt.

Saját csomópontok futtatása a tárolástól a sávszélességig és az értékes mérnöki időig nagyon költséges lehet. Az olyan dolgok, mint több csomópont felállítása a méretezéskor, a csomópontok frissítése a legújabb verziókra és az állapot konzisztenciájának biztosítása, ronthatnak a kívánt web3 termék erőforrásainak felépítésén és kiadásán.

## Mik a hátrányai a csomópontszolgáltatások használatának? {#cons-of-using-a-node-service}

Csomópontszolgáltatás használatával központosítod a terméked infrastrukturális aspektusát. Ezért azok a projektek, amelyek a decentralizációt tartják kiemelt fontosságúnak, előnyben részesíthetik az saját fenntartású csomópontokat, nem pedig egy harmadik félnek történő kiszervezést.

Olvass többet a [saját csomópont üzemeltetésének előnyeiről](/developers/docs/nodes-and-clients/#benefits-to-you).

## Népszerű csomópontszolgáltatások {#popular-node-services}

Itt található a legnépszerűbb Ethereum csomópontszolgáltatók listája, bátran adj hozzá hiányzó elemeket! Minden csomópont-szolgáltatás különböző előnyöket és szolgáltatásokat kínál az ingyenes vagy fizetett szintek mellett. A döntés meghozatala előtt meg kell vizsgálnod, hogy melyik felel meg legjobban az igényeidnek.

- [**Alchemy**](https://alchemyapi.io/)
  - [Dokumentáció](https://docs.alchemyapi.io/)
  - Jellemzők
    - Ingyenes opció
    - Menet közbeni méretezés
    - Ingyenes archív adatok
    - Analitikai eszközök
    - Vezérlőpult
    - Egyedi API végpontok
    - Webhook-ok
    - Közvetlen támogatás
- [**Infura**](https://infura.io/)
  - [Dokumentáció](https://infura.io/docs)
  - Jellemzők
    - Ingyenes opció
    - Menet közbeni méretezés
    - Fizetős archív adatok
    - Közvetlen támogatás
    - Vezérlőpult
- [**QuikNode**](https://www.quiknode.io/)
  - Jellemzők
    - 7 napos próbaidőszak
    - Változó támogatás
    - Webhook-ok
    - Vezérlőpult
    - Elemzések
- [**Rivet**](https://rivet.cloud/)
  - [Dokumentáció](https://rivet.readthedocs.io/en/latest/)
  - Jellemzők
    - Ingyenes opció
    - Menet közbeni méretezés
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Dokumentáció](https://ubiquity.docs.blockdaemon.com/)
  - Előnyök
    - Vezérlőpult
    - Csomópontkénti
    - Elemzések

## További olvasnivaló {#further-reading}

- [Ethereum csomópontszolgáltatások listája](https://ethereumnodes.com/)

## Kapcsolódó témák {#related-topics}

- [Csomópontok és kliensek](/developers/docs/nodes-and-clients/)

## Kapcsolódó útmutatók {#related-tutorials}

- [Bevezetés az Ethereum fejlesztésbe Alchemy-vel](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Útmutató tranzakció küldéshez a web3 és az Alchemy használatával](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
