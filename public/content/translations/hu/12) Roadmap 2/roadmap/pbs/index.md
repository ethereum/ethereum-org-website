---
title: Javaslattevő-építő szétválasztása
description: Ismerje meg, hogy az Ethereum-validátorok hogyan és miért osztják fel a blokképítési és -küldési feladatokat.
lang: hu
---

# Javaslattevő-építő szétválasztása {#proposer-builder-separation}

Jelenleg az Ethereum validátorok blokkokat hoznak létre_és_ küldenek. Összecsomagolnak olyan tranzakciókat, amelyekről tudomást szereztek a pletykahálózaton keresztül, blokkot készítenek azokból és elküldik a társaiknak az Ethereum-hálózaton. A **javaslattevő-építő szétválasztás (PBS)** szétosztja ezeket a feladatokat a validátorok között. A blokk építői minden egyes slotban létrehozzák a blokkokat és felajánlják azokat a javaslattevőnek, aki az adott slotban felel az előterjesztésért. A javaslattevő nem láthatja a blokk tartalmát, egyszerűen a legjövedelmezőbbet választja, és megfizeti a blokképítés díját, mielőtt elküldi a blokkot a társainak.

Ez több szempontból is egy fontos fejlesztés. Először is lehetővé teszi, hogy a tranzakciók cenzúrázása protokoll szinten ne történhessen meg. Másodsorban az egyszerűbb validátorokat nem tudják kirekeszteni a versenyből az intézményes résztvevők, akik jobban tudják optimalizálni a blokképítési profitjukat. Harmadjára az Ethereum-skálázását is támogatja azáltal, hogy lehetővé teszi a Danksharding fejlesztéseket (párhuzamos futtatás).

## A PBS és a cenzúrának való ellenállás {#pbs-and-censorship-resistance}

A blokk építésének és előterjesztésének szétválasztása megnehezíti a blokképítők számára, hogy cenzúrázzák a tranzakciókat. Ennek az az alapja, hogy egy viszonylag összetett kritériumokat lehet megadni arra, hogy minek muszáj benne lennie a blokkban, ezért a javaslattevés előtt nem lehet a tranzakciókat cenzúrázni. Mivel a javaslattevő egy másik entitás az építőhöz képest, ezért védekezhet a cenzúrázó blokképítők ellen.

Például bekerülési listákat tud adni a javaslattevő, hogy a tudomására jutott tranzakciókat, amelyeket mégsem lát az adott blokkban, a következő építésnél kötelezővé tudja tenni. Ezt a bekerülési listát a javaslattevő a saját memóriakészletéből (tranzakciók, amelyekről tudomása van) készíti és küldi el a társainak még mielőtt a blokkjavaslat megtörténne. Ha a bekerülési listáról bármely tranzakció hiányzik, akkor a javaslattevő elutasíthatja az adott blokkot, hozzáteheti a hiányzó tételeket mielőtt javasolja azt, vagy elküldheti a javaslatot és a többi validátorra bízhatja, hogy azok utasítsák el. Ennek az elképzelésnek létezik egy valószínűleg még hatékonyabb verziója, amikor az építőtől azt várjuk, hogy teljesen kihasználja a blokkhelyet, és ha nem teszi, akkor a bekerülési listáról lehet még hozzáadni tranzakciókat a blokkhoz. Ez jelenleg egy aktív kutatási terület, a bekerülési listák optimális konfigurálása még nem dőlt el.

[A titkosított memóriakészletek](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) nem teszik lehetővé az építő és a javaslattevő számára, hogy tisztában legyenek a blokkba foglalt tételekkel, csak miután az már elküldésre került.

<ExpandableCard title="Milyen fajta cenzúrát old meg a PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

A nagyobb hatalommal bíró szervezetek nyomást gyakorolhatnak a validátorokra, hogy zárjanak ki bizonyos címekre menő vagy onnan jövő tranzakciókat. A validátorok ennek megfelelően beazonosíthatják a feketelistás tételeket a tranzakciógyűjtőben és kihagyhatják azokat a javasolt blokkból. A PBS után ez nem lehetséges, mert a javaslattevő nem fogja tudni, hogy milyen tranzakciók szerepelnek az általa elküldött blokkban. Bizonyos egyéneknek vagy alkalmazásoknak talán fontos lehet bizonyos cenzúraszabályoknak megfelelni, amikor az adott régióban azt törvény szabályozza. Ezekben az esetekben a szabálynak való megfelelés az alkalmazás szintjén történik, így a protokoll továbbra is engedélymentes és cenzúramentes marad.

</ExpandableCard>

## A PBS és a MEV {#pbs-and-mev}

A **maximálisan kinyerhető érték (MEV)** arra utal, amikor a validátorok maximalizálják a nyereségüket azzal, hogy kedvezőségi sorrendbe állítják a tranzakciókat. Általános példa az arbitrázs célú átváltás a decentralizált tőzsdéken (pl. egy nagy értékű eladás vagy vétel elé kerülve), vagy annak észlelése, hogy egy pénzügyi (DeFi) pozíciót érdemes lenne likvidálni. A MEV maximalizálása olyan szofisztikált technikai tudást és személyre szabott szoftverkiegészítéseket igényel a normális validátorhoz képest, hogy sokkal valószínűbb, hogy az intézményes működtetők lehagyják az egyéneket vagy egyszerű validátorokat a MEV kinyerése kapcsán. Emiatt a letétbe helyezés díjai valószínűleg magasabbak lesznek a centralizált működtetőknél, ami olyan központosítő erőt hoz létre, amely nem motiválja az otthoni letétbe helyezést.

A PBS úgy oldja meg ezt a problémát, hogy újrakonfigurálja a MEV gazdasági helyzetét. Ahelyett, hogy a blokk javaslattevője végezne saját MEV keresést, egyszerűen felvesz egy blokkot a neki felajánlottak közül, amelyet a blokképítők készítettek. A blokk építői végezhetnek szofisztikált MEV-kinyerést, de ennek nyeresége a javaslattevőhöz jut. Tehát még ha a MEV kinyerést dominánsan néhány specializált blokképítő végzi, ennek jutalma a hálózat bármelyik validátorához kerülhet, beleértve az egyéni, otthoni letétbe helyezőket.

<ExpandableCard title="Miért elfogadható, ha a blokképítés centralizálódik?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Az egyéneket arra motiválhatja, hogy egyéni letétbe helyezés helyett inkább készletekbe tegyék a letétet, mert a szofisztikált MEV-stratégiák miatt az nagyobb nyereséget kínál. A blokk építőjének és javaslattevőjének elkülönítése azt jelenti, hogy a kinyert MEV több validátornál kerül elosztásra, nem pedig a leghatékonyabb MEV-kinyerőnél központosul. Emellett a specializált blokképítők levehetik az egyénekről a blokk készítésének terhét, megakadályozhatják, hogy az egyének saját maguknak vegyenek ki MEV-et a validálás során, miközben maximalizálják az egyéni, független validátorok számát, akik jóhiszemű módon képesek ellenőrizni a blokkokat. A fontos koncepció a „bizonyító-ellenőrző aszimmetria”, amelynek lényege, hogy a centralizált blokklétrehozás rendben van addig, amíg robosztus és maximálisan decentralizált validátorhálózat áll rendelkezésre a blokkok jóhiszemű igazolásához. A decentralizáció egy eszköz, nem pedig végcél – valós blokkokat szeretnénk elérni.
</ExpandableCard>

## A PBS és a Danksharding {#pbs-and-danksharding}

A Danksharding az a módszer, amivel az Ethereum skálázza a teljesítményt, hogy másodpercenként több mint 100 000 tranzakciót kezeljen és közben minimalizálja az összevont tranzakcióért fizető felhasználók által fizetett díjakat. A PBS-en alapszik, mert a blokképítőknek extra feladatot ad, akiknek bizonyítékot kell készíteniük 64 MB-nyi összevonttranzakció-adatra kevesebb mint 1 másodperc alatt. Ehhez valószínűleg specializált építőkre van szükség, akik elég komoly hardvert tudnak kijelölni ehhez a feladathoz. A nem PBS szerinti helyzetben a blokképítés egyre inkább centralizálódhat a szofisztikáltabb és erőteljesebb működtetők körül a MEV kinyerése miatt is. A javaslattevő-építő szétválasztás (PBS) egy olyan mód, amely felöleli ezt a valóságot és megakadályozza a blokkvalidálás központosítását (ami nagyon fontos), illetve elősegíti a letéti jutalmak elosztását. Remek lehetőség ez arra is, hogy a specializált blokképítők hajlandók és képesek legyenek kiszámolni a Dankshardinghoz szükséges adatbizonyítékokat.

## Jelenlegi helyzet {#current-progress}

A PBS a kutatás előrehaladott fázisában tart, bár akadnak még fontos kérdések, mielőtt az Ethereum klienseknél bevezetésre kerül. Nincs még véglegesített specifikáció. Ebből adódhat, hogy akár egy év is szükséges a bevezetésére. Tekintse meg a [kutatás jelenlegi állapotát](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## További olvasnivaló {#further-reading}

- [Kutatási állapot: cenzúrának való ellenállás a PBS esetén](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [PBS-barát díjpiac dizájn](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [A PBS és a cenzúrának való ellenállás](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Bekerülési listák](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
