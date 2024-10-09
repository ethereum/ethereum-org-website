---
title: Státuszcsatornák
description: Bevezetés a státusz- és fizetési csatornákba, az Ethereum közössége által használt skálázási megoldásba.
lang: hu
sidebarDepth: 3
---

A státuszcsatornák lehetővé teszik a résztvevők számára, hogy biztonságosan tranzakciókat bonyolítsanak le a láncon kívül, miközben minimálisra csökkentik az Ethereum főhálózattal való interakciót. A csatornát alkotó résztvevők tetszőleges számú, a láncon kívüli tranzakciót hajthatnak végre, melyhez csak két láncon belüli tranzakciót kell beküldeniük csatorna megnyitásához és lezárásához. Ez rendkívül nagy tranzakcióátvitelt tesz lehetővé, és alacsonyabb költségeket eredményez a felhasználók számára.

##  {#how-do-sidechains-work}

A nyilvános blokkláncok, mint például az Ethereum, az elosztott architektúrájuk miatt skálázhatósági kihívásokkal küzdenek: a láncban végrehajtott tranzakciókat az összes csomópontnak végre kell hajtania. A csomópontoknak képesnek kell lenniük arra, hogy egy blokkban lévő tranzakciók mennyiségét szerény hardverrel kezeljék, hogy a hálózat decentralizált maradjon, de ez korlátozza a tranzakcióátviteli sebességet.

###  {#consensus-algorithms}

A csatornák olyan egyszerű társközi (peer-to-peer) protokollok, amelyek lehetővé teszik, hogy két fél számos tranzakciót hajtson végre egymás között, és csak a végeredményt tegyék fel a blokkláncra. A csatorna kriptográfiát használ annak bizonyítására, hogy az általuk generált összesített adatok valóban érvényes köztes tranzakciók eredményei. Egy [több aláírásos](/developers/docs/smart-contracts/#multisig) okosszerződés biztosítja, hogy a tranzakciókat a megfelelő felek írják alá.

- []()
- []()
-

A csatornák segítségével a státuszváltozásokat az érdekelt felek hajtják végre és érvényesítik, minimalizálva az Ethereum végrehajtási rétegének számításait. Ez csökkenti a torlódásokat az Ethereumon, és növeli a tranzakciók feldolgozási sebességét a felhasználók számára.

####  {#block-parameters}

Minden csatornát egy [több aláírásos okosszerződés](/developers/docs/smart-contracts/#multisig) kezel, amely az Ethereumon fut. Egy csatorna megnyitásához a résztvevők telepítik a csatornaszerződést a láncban, és pénzt helyeznek el benne.

A csatorna lezárásához a résztvevők elküldik a csatorna utolsó elfogadott státuszát a láncba. Ezt követően az okosszerződés a zárolt pénzeszközöket az egyes résztvevőknek a csatorna végső státuszában lévő egyenlege szerint osztja szét.

A peer-to-peer csatornák különösen hasznosak olyan helyzetekben, amikor néhány előre meghatározott résztvevő nagy gyakorisággal kíván tranzakciókat lebonyolítani anélkül, hogy az többletterhekkel járna. A blokklánc-csatornák két kategóriába sorolhatók: **fizetési** és **státuszcsatornák**.

###  {#evm-compatibility}

A fizetési csatornát leginkább úgy lehet leírni, mint két felhasználó által közösen vezetett „kétirányú főkönyvet”. A főkönyv kezdeti egyenlege a csatornanyitási fázisban a láncban lévő szerződésbe zárolt betétek összege.

A főkönyv egyenlegének (azaz a fizetési csatorna státuszának) frissítéséhez a csatorna összes résztvevőjének jóváhagyása szükséges. A csatorna résztvevői által aláírt csatornaváltozás véglegesítettnek tekinthető, hasonlóan az Ethereumban végrehajtott tranzakciókhoz.

A fizetési csatornák a legkorábbi skálázási megoldások közé tartoztak, amelyek célja az egyszerű felhasználói interakciók (pl. ETH átutalások, atomikus átváltások, mikrofizetések) költséges láncon belüli tevékenységének minimalizálása volt. A csatorna résztvevői korlátlan mennyiségű azonnali, illeték nélküli tranzakciót hajthatnak végre egymás között mindaddig, amíg az átutalások nettó összege nem haladja meg a letétbe helyezett tokeneket.

A láncon kívüli fizetések támogatásán kívül a fizetési csatornák nem bizonyultak hasznosnak az általános státuszváltozási logika kezelésére. A státuszcsatornákat azért hozták létre, hogy megoldják ezt a problémát, és azok támogassák az általános célú számítások skálázását.

###  {#asset-movement}

A státuszcsatornáknak sok közös vonásuk van a fizetési csatornákkal. A felhasználók például kriptográfiailag aláírt üzenetek (tranzakciók) cseréjével lépnek kapcsolatba egymással, amelyeket a csatorna többi résztvevőjének is alá kell írnia. Ha egy javasolt státuszváltozást nem ír alá minden résztvevő, az érvénytelennek minősül.

##  {#pros-and-cons-of-sidechains}

|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

###  {#use-sidechains}

- []()
- []()
- []()
- []()
- []()

##  {#further-reading}

-

_ _
