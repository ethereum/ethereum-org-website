---
title: Biztonságosabb Ethereum
description: Az Ethereum a legbiztonságosabb és leginkább decentralizált okosszerződés-platform a világon. Azonban még mindig vannak fejlődési lehetőségek, hogy az Ethereum ellenálló maradjon minden szinten a támadásokkal szemben a jövőben is.
lang: hu
image: /images/roadmap/roadmap-security.png
alt: "Ethereum-ütemterv"
template: roadmap
---

Az **Ethereum már egy nagyon biztonságos**, decentralizált [okosszerződéses](/glossary/#smart-contract) platform. Azonban még mindig vannak fejlődési lehetőségek, hogy az Ethereum ellenálló maradjon mindenféle támadással szemben a jövőben is. Ezek közé tartozik az [Ethereum-kliensek](/glossary/#consensus-client) versengő [blokkokkal](/glossary/#block) való kezelésének finom módosítása, valamint a hálózat által a blokkok [„véglegesítettnek”](/developers/docs/consensus-mechanisms/pos/#finality) történő megnövelése. (ami azt jelenti, hogy nem változtathatók meg anélkül, hogy rendkívüli gazdasági veszteséget okoznának a támadónak).

Olyan fejlesztések is folyamatban vannak, amelyek a tranzakciók cenzúrázását nehezítik meg, azáltal hogy a blokkjavasló nem tudja, mit tartalmaz az adott blokk, és új módokat kínál annak megállapítására, hogy egy kliens cenzúráz-e. Ezek a fejlesztések együtt frissítik a [tét bizonyítéka](/glossary/#pos) protokollt, hogy a felhasználók – magánszemélyektől a vállalatokig – azonnal megbízhassanak alkalmazásaikban, adataikban és eszközeikben az Ethereumban.

## A letétbe helyezés visszavonása {#staking-withdrawals}

A [proof-of-work](/glossary/#pow)-ről a tét-igazolásra való frissítés azzal kezdődött, hogy az Ethereum úttörői „kockáztatták” ETH-jukat egy letéti szerződésben. Ez az ETH arra van, hogy megvédje a hálózatot. 2023. április 12-én egy második frissítés is megtörtént, amely lehetővé teszi a téttel járó ETH visszavonását. Azóta a validátorok szabadon tétet tehetnek vagy visszavonhatnak ETH-t.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Bővebben a visszahívásokról</ButtonLink>

## Támadások elleni védelem {#defending-against-attacks}

Vannak fejlesztések, amelyek az Ethereum proof-of-stake protokollját érintik. Az egyik a [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) néven ismert – egy biztonságosabb [elágazás](/glossary/#fork)-választási algoritmus, amely megnehezít bizonyos kifinomult támadástípusokat.

Az Ethereumnak a blokkok [véglegesítéséhez](/glossary/#finality) szükséges idő csökkentése jobb felhasználói élményt biztosítana, és megakadályozná az olyan kifinomult „reorg” támadásokat, amelyek során a támadók megpróbálják átrendezni a legutóbbi blokkokat, hogy profitot vonjanak ki, vagy bizonyos tranzakciókat cenzúrázzanak. Az [**Single slot finality (SSF)**](/roadmap/single-slot-finality/) egy **módszer a véglegesítési késleltetés minimalizálására**. Jelenleg 15 percnyi blokk esetén tudna egy támadó elméletileg meggyőzni egy másik validátort, hogy újrakonfigurálja azokat. Az SSF esetén ez 0 lenne. A felhasználók számára, kezdve az egyénektől egészen az alkalmazásokig és tőzsdékig, mindig hasznos, ha gyorsan lehet biztosítani, hogy a tranzakcióik ne lesznek visszafordítva, a hálózatnak pedig az, hogy a támadások teljes osztályait ki tudja zárni.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Bővebben az egy sloton belüli véglegességről (SSF)</ButtonLink>

## A cenzúra elleni védelem {#defending-against-censorship}

A decentralizáció megakadályozza, hogy egyének vagy [ellenőrzők](/glossary/#validator) kis csoportjai túlságosan befolyásossá váljanak. Az új letéti technológiák segítenek, hogy az Ethereum validátorai decentralizáltak maradjanak, miközben védi őket a hardver-, szoftver- és hálózati hibáktól. Ide tartoznak azok a szoftverek is, amelyek több [csomópont](/glossary/#node) között osztják meg az érvényesítői felelősséget. Ez az **elosztottvalidátor-technológia (DVT)**. A [letéti alapokat](/glossary/#staking-pool) ez ösztönzi, hogy használják a DVT-t, így több számítógép vehet részt egyszerre a validációban, ezzel redundanciával (extra kapacitás) és hibatoleranciával kiegészítve a működést. A validátorkulcsokat több rendszerre osztja el ahelyett, hogy egy operátor futtatna több validátort. Ezáltal a rosszhiszemű operátoroknak nehezebb támadást indítani az Ethereum ellen. Összességében további biztonsági előnyökkel járhat, ha a validátorok _közösségként_ működnek, nem egyénként.

<ButtonLink variant="outline-color" href="/staking/dvt/">Bővebben az elosztottvalidátor-technológiáról (DVT)</ButtonLink>

Az **előterjesztő-építő szétválasztás (PBS)** drasztikusan fejleszti az Ethereum beépített, cenzúrának való ellenállást. A PBS lehetővé teszi, hogy egy validátor rakja össze a blokkot, egy másik pedig továbbadja az Ethereum-hálózatnak. Ez biztosítja, hogy a professzionális profitmaximalizáló blokképítő algoritmusokól eredő nyereségek majd egyenletesebben oszoljanak el a hálózaton, **megakadályozva a letétek koncentrációját** a legjobban működő intézményes letéteseknél. A blokk előterjesztője a leginkább profitábilis blokkot választja azok közül, amit a blokképítők piaca ajánl. A cenzúrához a blokk előterjesztőjének gyakran egy kevésbé profitábilis blokkot kellene választania, ami **gazdaságilag irracionális és nyilvánvaló a többi validátor számára is** a hálózaton.

Olyan potenciális kiegészítések is elérhetők a PBS-hez, mint a titkosított tranzakciók és a bekerülési lista, ami tovább növeli az Ethereum cenzúrának való ellenállást. Ezek következtében a blokk építője és javaslója nem tudja, hogy milyen tranzakciók vannak a blokkban.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Bővebben a PBS-ről</ButtonLink>

## A validátorok védelme {#protecting-validators}

Lehetséges, hogy egy szofisztikált támadó beazonosítja a következő validátort és megakadályozza őt a javaslattételben; ez a **szolgáltatásmegtagadási, vagy más néven DoS**-támadás. A [**titkos vezetőválasztás (SLE)**](/roadmap/secret-leader-election) bevezetése megvéd ettől a támadási típustól, mivel a blokkjavaslók nem lesznek előre ismertek. Úgy működik, hogy a blokkjavaslókat képviselő kriptográfiai elköteleződéseket állandón keverik, és ezek sorrendje adja meg, hogy amelyik validátor kerül kiválasztásra, amiről csak ő fog tudni.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Bővebben a titkos vezetőválasztásról</ButtonLink>

## Jelenlegi helyzet {#current-progress}

**Az ütemtervben szereplő biztonsági frissítések a kutatás előrehaladott szakaszában vannak**, de várhatóan még egy ideig nem hajtják végre őket. A következő lépés a nézetegyesítésre (amelyeket még nem valósítottak meg élesben) a specifikáció véglegesítése és a prototípusok létrehozása.
