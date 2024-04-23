---
title: Biztonságosabb Ethereum
description: Az Ethereum a legbiztonságosabb és leginkább decentralizált okosszerződés-platform a világon. Azonban még mindig vannak fejlődési lehetőségek, hogy az Ethereum ellenálló maradjon minden szinten a támadásokkal szemben a jövőben is.
lang: hu
image: /roadmap/roadmap-security.png
alt: "Ethereum-ütemterv"
template: roadmap
---

Az Ethereum már most is egy nagyon biztonságos, decentralizált okosszerződés-platform. Azonban még mindig vannak fejlődési lehetőségek, hogy az Ethereum ellenálló maradjon mindenféle támadással szemben a jövőben is. Ez olyan apró változtatásokat is magában foglal, hogy az Ethereum-kliensek kezelik a versenyző blokkokat, valamint a sebességmegnövelését, amennyi idő alatt a hálózat azt mondja egy blokkra, hogy [végleges](/developers/docs/consensus-mechanisms/pos/#finality) (így a támadó nem változtathatja meg, csak nagy gazdasági veszteség árán).

Olyan fejlesztések is folyamatban vannak, amelyek a tranzakciók cenzúrázását nehezítik meg, azáltal hogy a blokkjavasló nem tudja, mit tartalmaz az adott blokk, és új módokat kínál annak megállapítására, hogy egy kliens cenzúráz-e. Ezek együtt fogják továbbfejleszteni a proof-of-stake protokollt, hogy a felhasználóknak, az egyénektől a vállaltokig, azonnali bizalmuk legyen az alkalmazásokban, adatokban és eszközökben az Ethereumon.

## A letétbe helyezés visszavonása {#staking-withdrawals}

A proof-of-work mechanizmusról a proof-of-stake-ra való áttérés azzal kezdődött, hogy az Ethereum-úttörők egy letéti szerződésben letétbe helyezték az rendelkezésre álló ETH-jüket. Ez az ETH arra van, hogy megvédje a hálózatot. Ugyanakkor ezt az ETH-t nem lehetett felszabadítani és visszaadni a felhasználóknak. Az ETH-visszavonás lehetősége egy kritikus része a proof-of-stake frissítésnek. Amellett, hogy a pénzkivonás a teljesen működőképes proof-of-stake protokoll kritikus eleme, a kifizetések engedélyezése az Ethereum biztonságának is jót tesz, mivel lehetővé teszi a letétbe helyezők számára, hogy ETH-jutalmaikat más, nem letéttel kapcsolatos célokra is felhasználják. A likviditást igénylő felhasználóknak nem kell a likvid letéti derivatívákat (LSD) használni, ami egy centralizáló erő az Ethereumon. Ez a frissítés várhatóan 2023. április 12-án fog végbemenni.

<ButtonLink variant="outline-color" to="/staking/withdrawals/">Bővebben a visszahívásokról</ButtonLink>

## Támadások elleni védelem {#defending-against-attacks}

A visszahívásokon kívül további fejlesztések tehetők az Ethereum [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) protokollján. Az egyik ilyen a [nézetegyesítés](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739), egy biztonságosabb elágazási algoritmus, ami bizonyos szofisztikált támadásokat lehetetlenít el.

Ha az Ethereum blokkvéglegesítési idejét sikerül csökkenteni, akkor a jobb felhasználói élmény mellett az olyan szofisztikált átrendezési támadásokat is csökkenteni lehet, amikor a támadó extra profitot akar kiszedni vagy cenzúrázza a tranzakciókat. Az [**egy sloton belüli véglegesség (SSF)**](/roadmap/single-slot-finality/) egy remek módszer a véglegesítés késleltetésére. Jelenleg 15 percnyi blokk esetén tudna egy támadó elméletileg meggyőzni egy másik validátort, hogy újrakonfigurálja azokat. Az SSF esetén ez 0 lenne. A felhasználók számára, kezdve az egyénektől egészen az alkalmazásokig és tőzsdékig, mindig hasznos, ha gyorsan lehet biztosítani, hogy a tranzakcióik ne lesznek visszafordítva, a hálózatnak pedig az, hogy a támadások teljes osztályait ki tudja zárni.

<ButtonLink variant="outline-color" to="/roadmap/single-slot-finality/">Bővebben az egy sloton belüli véglegességről (SSF)</ButtonLink>

## A cenzúra elleni védelem {#defending-against-censorship}

A decentralizáció megakadályozza, hogy bizonyos egyének vagy validátorok kis csoportja túlzott befolyásra tegyen szert. Az új letéti technológiák segítenek, hogy az Ethereum validátorai decentralizáltak maradjanak, miközben védi őket a hardver-, szoftver- és hálózati hibáktól. Ez olyan szoftvert is felölel, amely megosztja a validátor felelősségét több csomóponton keresztül. Ez az **elosztottvalidátor-technológia (DVT)**. A letéti alapok ez ösztönzi, hogy használják a DVT-t, így több számítógép vehet részt egyszerre a validációban, ezzel redundanciával (extra kapacitás) és hibatoleranciával kiegészítve a működést. A validátorkulcsokat több rendszerre osztja el ahelyett, hogy egy operátor futtatna több validátort. Ezáltal a rosszhiszemű operátoroknak nehezebb támadást indítani az Ethereum ellen. Összességében további biztonsági előnyökkel járhat, ha a validátorok _közösségként_ működnek, nem egyénként.

<ButtonLink variant="outline-color" to="/staking/dvt/">Bővebben az elosztottvalidátor-technológiáról (DVT)</ButtonLink>

Az **előterjesztő-építő szétválasztás (PBS)** drasztikusan fejleszti az Ethereum beépített, cenzúrának való ellenállást. A PBS lehetővé teszi, hogy egy validátor rakja össze a blokkot, egy másik pedig továbbadja az Ethereum-hálózatnak. Ez biztosítja, hogy a professzionális profitmaximalizáló blokképítő algoritmusokól eredő nyereségek majd egyenletesebben oszoljanak el a hálózaton, **megakadályozva a letétek koncentrációját** a legjobban működő intézményes letéteseknél. A blokk előterjesztője a leginkább profitábilis blokkot választja azok közül, amit a blokképítők piaca ajánl. A cenzúrához a blokk előterjesztőjének gyakran egy kevésbé profitábilis blokkot kellene választania, ami **gazdaságilag irracionális és nyilvánvaló a többi validátor számára is** a hálózaton.

Olyan potenciális kiegészítések is elérhetők a PBS-hez, mint a titkosított tranzakciók és a bekerülési lista, ami tovább növeli az Ethereum cenzúrának való ellenállást. Ezek következtében a blokk építője és javaslója nem tudja, hogy milyen tranzakciók vannak a blokkban.

<ButtonLink variant="outline-color" to="/roadmap/pbs/">Bővebben a PBS-ről</ButtonLink>

## A validátorok védelme {#protecting-validators}

Lehetséges, hogy egy szofisztikált támadó beazonosítja a következő validátort és megakadályozza őt a javaslattételben; ez a **szolgáltatásmegtagadási, vagy más néven DoS**-támadás. A [**titkos vezetőválasztás (SLE)**](/roadmap/secret-leader-election) bevezetése megvéd ettől a támadási típustól, mivel a blokkjavaslók nem lesznek előre ismertek. Úgy működik, hogy a blokkjavaslókat képviselő kriptográfiai elköteleződéseket állandón keverik, és ezek sorrendje adja meg, hogy amelyik validátor kerül kiválasztásra, amiről csak ő fog tudni.

<ButtonLink variant="outline-color" to="/roadmap/secret-leader-election">Bővebben a titkos vezetőválasztásról</ButtonLink>

## Jelenlegi helyzet {#current-progress}

A tervezett fejlesztések között a biztonsági frissítések igen előrehaladott kutatási állapotban vannak, de még egy ideig nem várható a bevezetésük. A következő lépés a nézetegyesítésre (amelyeket még nem valósítottak meg élesben) a specifikáció véglegesítése és a prototípusok létrehozása.
