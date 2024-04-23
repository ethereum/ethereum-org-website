---
title: Okos szerződések tesztelése
description: Az Ethereum okosszerződés-tesztelési technikáinak és szempontjainak áttekintése.
lang: hu
---

Az Ethereumhoz hasonló nyilvános blokkláncok megváltoztathatatlanok, ami megnehezíti az okosszerződések kódjának módosítását a telepítésük után. [Léteznek szerződésfrissítési minták](/developers/docs/smart-contracts/upgrading/) a „virtuális frissítések” végrehajtására, de ezeket nehéz megvalósítani, és társadalmi konszenzust igényelnek. Ráadásul a frissítés csak a hiba _felfedezése után_ javíthatja ki azt – ha egy támadó előbb fedezi fel a sebezhetőséget, akkor az okosszerződést veszély fenyegeti.

Ezen okok miatt az okosszerződések tesztelése a fő hálózatra való [telepítés](/developers/docs/smart-contracts/deploying/) előtt elengedhetetlen a [biztonság](/developers/docs/smart-contracts/security/) szempontjából. A szerződések tesztelésére és a kód helyességének kiértékelésére számos technika létezik; a fejlesztő igényeitől függ, hogy melyiket választja. Mindazonáltal egy különböző eszközökből és megközelítésekből álló tesztcsomag ideális a szerződéskód kisebb és nagyobb biztonsági hibáinak kiszűrésére.

## Előfeltételek {#prerequisites}

Ez az oldal elmagyarázza, hogyan lehet tesztelni az okosszerződéseket az Ethereum-hálózaton való telepítés előtt. Feltételezi, hogy ismeri az [okosszerződéseket](/developers/docs/smart-contracts/).

## Mi az az okosszerződés-tesztelés? {#what-is-smart-contract-testing}

Az okosszerződések tesztelése annak ellenőrzése, hogy a szerződés kódja az elvárásoknak megfelelően működik-e. A tesztelés egy hasznos ellenőrzés, hogy az adott okosszerződés megfelel-e a megbízhatósági, használhatósági és biztonsági követelményeknek.

Bár a megközelítések eltérők, a legtöbb tesztelési módszerhez az okosszerződést végre kell hajtani a kezelendő adatok egy kis mintájával. Ha a szerződés helyes eredményeket ad a mintaadatokra, akkor feltételezhetően megfelelően működik. A legtöbb tesztelési eszköz forrásokat biztosít a [tesztszcenáriók](https://en.m.wikipedia.org/wiki/Test_case) megírásához és végrehajtásához, amelyekkel ellenőrizni lehet, hogy a szerződések végrehajtása megfelel-e a várt eredményeknek.

### Miért fontos az okosszerződések tesztelése? {#importance-of-testing-smart-contracts}

Mivel az okosszerződések gyakran nagy értékű pénzügyi eszközöket kezelnek, a kisebb programozási hibák [nagy veszteségeket okozhatnak a felhasználóknak](https://rekt.news/leaderboard/). A szigorú tesztelés segíthet abban, hogy az okosszerződés kódjában lévő hibákat és problémákat időben felfedezze és a fő hálózaton való elindítás előtt kijavítsa.

Bár van lehetőség a szerződés frissítésére, ha hibát fedeztek fel, a frissítések összetettek, és [hibákhoz vezethetnek](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/), ha nem megfelelően kezelik őket. A szerződés frissítése ellentmond a megváltoztathatatlanság elvének, és bizalmat igényel a felhasználóktól. Ezzel szemben az átfogó tesztelési terv csökkenti az okosszerződések biztonsági kockázatait, és a telepítés utáni komplex logikai frissítések szükségességét.

## Az okosszerződések tesztelésének módszerei {#methods-for-testing-smart-contracts}

Az Ethereum okosszerződések tesztelési módszerei két nagy kategóriába sorolhatók: **automatizált** és **manuális tesztelés**. Az automatizált és a manuális tesztelés egyedi előnyökkel és kompromisszumokkal jár, de mindkettőt kombinálhatja, hogy megbízható tervet hozzon létre a szerződések vizsgálatához.

### Automatizált tesztelés {#automated-testing}

Az automatizált tesztelés olyan eszközöket használ, amelyek automatikusan ellenőrzik az okosszerződések kódját a végrehajtási hibák szempontjából. Az automatizált tesztelés előnye a [szkriptek](https://www.techtarget.com/whatis/definition/script?amp=1) használatából származik, amelyek a szerződéses funkciók értékelését irányítják. A szkriptelt teszteket úgy lehet ütemezni, hogy minimális emberi beavatkozással ismételten fussanak, így az automatizált tesztelés hatékonyabb, mint a manuális megközelítés.

Az automatizált tesztelés különösen akkor hasznos, ha a tesztek ismétlődők és időigényesek, manuálisan nehezen kivitelezhetők, emberi hibára hajlamosak, vagy kritikus szerződéses funkciók értékelését végzik. Ezeknek is megvannak hátrányai, mert bizonyos hibákat kihagyhatnak, és számos [hamis pozitív eredményt](https://www.contrastsecurity.com/glossary/false-positive) produkálhatnak. Ezért az okosszerződések esetében az automatizált és a manuális tesztelés párosítása az ideális.

### Manuális tesztelés {#manual-testing}

A manuális tesztelést ember végzi, és az okosszerződések helyességének elemzése során a tesztcsomag minden egyes tesztszcenárióját egymás után hajtja végre. Ez ellentétben áll az automatizált teszteléssel, ahol egyszerre több izolált tesztet futtathat egy szerződésen, és egy olyan jelentést kaphat, amely megmutatja az összes sikertelen és sikeres tesztet.

A manuális tesztelést egyetlen személy is elvégezheti egy írásos teszttervet követve, amely különböző tesztszcenáriókra terjed ki. A manuális tesztelés részeként több személy vagy csoport is interakcióba léphet az okosszerződéssel egy meghatározott időszak alatt. A tesztelők összehasonlítják a szerződés tényleges és elvárt viselkedését, és minden eltérést hibaként jelölnek meg.

A hatékony manuális tesztelés jelentős erőforrásokat igényel (szakértelem, idő, pénz és erőfeszítés), és lehetséges, hogy emberi hiba miatt a tesztek végrehajtása során bizonyos hibák nem derülnek ki. A manuális tesztelés előnyös is lehet – egy ember (például egy auditor) felismerhet olyan valós helyzeteket, amelyeket egy automatizált tesztelőeszköz kihagyna.

## Automatizált tesztelés okosszerződésekhez {#automated-testing-for-smart-contracts}

### Egységtesztelés {#unit-testing-for-smart-contracts}

Az egységtesztelés külön-külön értékeli a szerződés funkcióit, és ellenőrzi, hogy minden egyes komponens megfelelően működik-e. A jó egységteszteknek egyszerűnek és gyorsan lefuttathatónak kell lenniük, és ha a teszt nem a várt eredményt adja, akkor világos képet kell adniuk arról, hogy mi a hiba.

Az egységtesztek hasznosak annak ellenőrzésére, hogy a függvények visszaadják-e a várt értékeket, és hogy a szerződés adattárhelye megfelelően frissül-e a végrehajtás során. Továbbá a szerződések kódbázisának módosítása után az egységtesztek biztosítják, hogy az új logika hozzáadása ne okozzon hibákat. Az alábbiakban bemutatjuk a hatékony egységtesztek futtatását:

#### Irányelvek az okosszerződések egységteszteléséhez {#unit-testing-guidelines}

##### 1. A szerződések üzleti logikájának és munkafolyamatának megértése

Az egységtesztek megírása előtt hasznos tudni, hogy milyen funkciókat kínál egy okosszerződés, és hogy a felhasználók hogyan fogják elérni és használni ezeket a funkciókat. Ez különösen hasznos a [boldog út (happy path) tesztek](https://en.m.wikipedia.org/wiki/Happy_path) futtatásához, amelyek meghatározzák, hogy a szerződésben szereplő függvények a helyes kimenetet adják-e vissza érvényes felhasználói bemenetek esetén. Ezt a koncepciót az [aukciós szerződés](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction) rövidített példáján keresztül magyarázzuk el

```
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Ez egy egyszerű aukciós szerződés, amelynek célja, hogy a licitidőszak alatt ajánlatokat fogadjon. Ha a `highestBid` (legmagasabb ajánlat) emelkedik, az előző legmagasabb ajánlatot tevő kapja meg a pénzét; ha a licitidőszak véget ér, a `beneficiary` (kedvezményezett) meghívja a szerződést, hogy megkapja a pénzt.

Egy ilyen szerződés egységtesztjei lefedik a különböző funkciókat, amelyeket a felhasználó meghívhat a szerződés használata során. Ilyen például egy olyan teszt, amely ellenőrzi, hogy a felhasználó tud-e licitálni, miközben az aukció folyamatban van (azaz a `bid()` meghívása sikeres), vagy egy olyan, amely ellenőrzi, hogy a felhasználó tud-e magasabb licitet tenni, mint az aktuális `highestBid` (legmagasabb ajánlat).

A szerződés működési folyamatának megértése segít az egységtesztek megírásában, amelyek ellenőrzik, hogy a végrehajtás megfelel-e a követelményeknek. Az aukciós szerződés például előírja, hogy a felhasználók nem tehetnek ajánlatot, ha az aukció már véget ért (azaz ha az `auctionEndTime` alacsonyabb, mint a `block.timestamp`). Így a fejlesztő futtathat egy olyan egységtesztet, amely ellenőrzi, hogy a `bid()` függvény hívása sikeres vagy sikertelen, amikor az aukció véget ér (amikor `auctionEndTime` > `block.timestamp`).

##### 2. A szerződés teljesítésével kapcsolatos feltételezések értékelése

Fontos dokumentálni a szerződés végrehajtásával kapcsolatos feltételezéseket, és egységteszteket írni azok érvényességének ellenőrzésére. Amellett, hogy védelmet nyújt a nem várt végrehajtás ellen, az állítások tesztelése arra készteti a fejlesztőt, hogy átgondolja azokat a műveleteket, amelyek megtörhetik az okosszerződések biztonsági modelljét. Hasznos tipp, hogy a „boldog felhasználói teszteken” túlmenően írjunk negatív teszteket, amelyek ellenőrzik, hogy egy függvény rossz bemenetek esetén nem működik-e.

Sok egységtesztelési keretrendszer lehetővé teszi, hogy állításokat hozzon létre – azaz egyszerű kijelentéseket, amelyek meghatározzák, hogy egy szerződés mit tehet és mit nem –, és teszteket futtasson, hogy lássa, ezek az állítások érvényesek-e a végrehajtás során. Egy fejlesztő, aki a korábban leírt aukciós szerződésen dolgozik, a negatív tesztek lefuttatása előtt a következő állításokat teheti a szerződés viselkedéséről:

- A felhasználók nem tehetnek ajánlatot, ha az aukció már véget ért vagy még el sem kezdődött.

- Az aukciós szerződés visszalép, ha egy ajánlat az elfogadható küszöbérték alatt van.

- Azoknak a felhasználóknak, akik nem nyerik meg a licitet, jóváírják a pénzüket

**Megjegyzés**: A feltételezések tesztelésének egy másik módja, hogy olyan teszteket írunk, amelyek a szerződésben [függvénymódosítókat](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) váltanak ki, különös tekintettel a `require`, `assert` és `if... else` utasításokra.

##### 3. Kódlefedettség mérése

A [kódlefedettség](https://en.m.wikipedia.org/wiki/Code_coverage) egy tesztelési metrika, amely a tesztek során végrehajtott ágak, sorok és utasítások számát követi a kódban. A teszteknek jó kódlefedettséggel kell rendelkezniük, különben előfordulhat, hogy „hamis negatív eredményt” kapunk, amikor a szerződés átmegy az összes teszten, de a kódban még vannak sebezhetőségek. A magas kódlefedettség rögzítése biztosítékot ad arra, hogy az okosszerződésben szereplő összes utasítást/függvényt megfelelően tesztelték a helyesség szempontjából.

##### 4. Jól kidolgozott tesztelési keretrendszerek használata

Az okosszerződések egységtesztjeinek futtatásához használt eszközök minősége kulcsfontosságú. Az ideális tesztelési keretrendszert rendszeresen karbantartják, hasznos funkciókat biztosít (például naplózási és jelentéstételi képességek), és más fejlesztők már széles körben használták és vizsgálták.

A Solidity okosszerződések egységtesztelési keretrendszerei különböző nyelveken (főként JavaScript, Python és Rust) készülnek. Az alábbi útmutatókból tájékozódhat arról, hogyan kezdheti el a tesztelési keretrendszerekkel az egységtesztek futtatását:

- **[Egységtesztek futtatása a Brownie segítségével](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Egységtesztek futtatása a Foundry segítségével](https://book.getfoundry.sh/forge/writing-tests)**
- **[Egységtesztek futtatása a Waffle segítségével](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Egységtesztek futtatása a Remix segítségével](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Egységtesztek futtatása az Ape segítségével](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Egységtesztek futtatása a Hardhat segítségével](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**

### Integrációs tesztelés {#integration-testing-for-smart-contracts}

Míg az egységtesztelés a szerződés funkcióit elszigetelten vizsgálja, az integrációs tesztek az okosszerződés összetevőit egészében értékelik. Az integrációs teszteléssel felderíthetők azok a problémák, melyek a szerződésközi meghívásokból vagy az okosszerződés különböző függvényei közötti kölcsönhatásokból erednek. Az integrációs tesztek például segíthetnek ellenőrizni, hogy az olyan dolgok, mint az [öröklődés](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) és a függőségi befecskendezésnek megfelelően működnek-e.

Az integrációs tesztelés akkor hasznos, ha a szerződés moduláris architektúrát alkalmaz, vagy ha a végrehajtás során más láncon belüli szerződésekhez kapcsolódik. Az integrációs tesztek futtatásának egyik módja, hogy [elágaztatja (fork) a blokkláncot](/glossary/#fork) egy adott magasságban (egy olyan eszközzel, mint a [Forge](https://book.getfoundry.sh/forge/fork-testing) vagy a [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks), és szimulálja a szerződése és a telepített szerződések közötti kölcsönhatásokat.

Az elágaztatott blokklánc a fő hálózathoz hasonlóan viselkedik, és számlák vannak rajta a megfelelő státuszokkal és egyenlegekkel. De ez csak egy helyi fejlesztőkörnyezet, tehát a tranzakciókhoz nincs szükség valódi ETH-re, és a változtatások nem befolyásolják a valódi Ethereum-protokollt.

### Tulajdonságalapú tesztelés {#property-based-testing-for-smart-contracts}

A tulajdonságalapú tesztelés annak ellenőrzése, hogy egy okosszerződés megfelel-e valamilyen meghatározott tulajdonságnak. A tulajdonságok olyan tényeket állítanak a szerződés viselkedéséről, amelyek várhatóan különböző forgatókönyvek esetén is igazak maradnak. Egy adott okosszerződés tulajdonsága például a következő: „A szerződésben szereplő aritmetikai műveletekre nem jellemző a túlcsordulás vagy alulcsordulás.”

A **statikus** és a **dinamikus elemzés** két gyakori technika a tulajdonságalapú tesztelésre, és mindkettő képes ellenőrizni, hogy egy program (jelen esetben egy okosszerződés) kódja megfelel-e valamilyen előre meghatározott tulajdonságnak. Egyes tulajdonságalapú tesztelési eszközök előre meghatározott szabályokat tartalmaznak a szerződés várható tulajdonságairól, és a kódot ezek alapján ellenőrzik, míg mások lehetővé teszik, hogy egyéni tulajdonságokat hozzon létre az okosszerződéshez.

#### Static analysis {#static-analysis}

A statikus elemzés bemenetként egy okosszerződés forráskódját veszi, és olyan eredményeket ad ki, amelyek kijelentik, hogy a szerződés megfelel-e egy tulajdonságnak vagy sem. A dinamikus elemzéssel ellentétben a statikus elemzés nem foglalja magában a szerződés végrehajtását, hogy megvizsgálja annak helyességét. A statikus elemzés az összes lehetséges útvonalat megvizsgálja, amelyet egy okosszerződés a végrehajtás során bejárhat (azaz a forráskód szerkezetét vizsgálja, hogy az mit jelentene a szerződések működése kapcsán a futtatásakor).

A [linting](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important) és a [statikus tesztelés](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) a szerződések statikus elemzésének általános módszerei. Mindkettő a szerződésvégrehajtás olyan alacsony szintű reprezentációinak elemzését igényli, mint az átfordító által adott [absztrakt szintaxisfák](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) és [kontrollfolyamat-ábrák](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/).

A legtöbb esetben a statikus elemzés hasznos a biztonsági problémák, például a nem biztonságos konstrukciók, szintaktikai hibák vagy a kódolási szabványok megsértésének felderítésére a kódban. A statikus elemzésről azonban köztudott, hogy nem alkalmasak a mélyebb sebezhetőségek felderítésére, és sok hamis pozitív eredményt produkálhatnak.

#### Dinamikus elemzés {#dynamic-analysis}

A dinamikus elemzés szimbolikus bemeneteket (például [szimbolikus végrehajtásnál](https://en.m.wikipedia.org/wiki/Symbolic_execution)) vagy konkrét bemeneteket (például [fuzzing](https://owasp.org/www-community/Fuzzing) esetén) generál egy okosszerződés-függvényhez, hogy vajon egy végrehajtási nyom sért-e bizonyos tulajdonságokat. A tulajdonságalapú tesztelésnek ez a formája abban különbözik az egységtesztektől, hogy a tesztesetek több szcenárióra terjednek ki, és egy program kezeli a tesztesetek generálását.

A [fuzzing](https://halborn.com/what-is-fuzz-testing-fuzzing/) az egyik dinamikus elemzési technika, amellyel az okosszerződések tetszőleges tulajdonságait lehet ellenőrizni. A fuzzer a célszerződésben lévő függvényeket egy meghatározott bemeneti érték véletlenszerű vagy hibás variációival hívja meg. Ha az okosszerződés hibás állapotba kerül (például egy állítás sikertelen), a problémát megjelöli, és a sérülékeny útvonalat mutató bemenetek egy jelentésben jelennek meg.

A fuzzing hasznos az okosszerződések bemenetérvényesítési mechanizmusának értékeléséhez, mivel a váratlan bemenetek nem megfelelő kezelése eredményezhet nem szándékos végrehajtást és veszélyes hatásokat is. A tulajdonságalapú tesztelésnek ez a formája több okból is ideális lehet:

1. **Nehéz olyan tesztszcenáriókat írni, amelyek sok szcenáriót lefednek.** A tulajdonságteszthez csak egy viselkedést és egy adattartományt kell definiálnia, amellyel a viselkedést tesztelni kívánja – a program automatikusan teszteseteket generál a megadott tulajdonság alapján.

2. **A tesztcsomag nem feltétlenül fed le minden lehetséges útvonalat a programon belül.** Még 100%-os lefedettség esetén is lehetséges, hogy kihagyja az éles eseteket.

3. **Az egységtesztek bizonyítják, hogy a szerződés helyesen kerül végrehajtásra a mintaadatokra, az viszont ismeretlen marad, hogy helyes-e a mintán kívüli bemenetekre.** A tulajdonságtesztek egy adott bemeneti érték több variációjával hajtják végre a célszerződést, hogy megtalálják az állításhibákat okozó végrehajtási nyomokat. Így a tulajdonságteszt több garanciát nyújt arra, hogy a szerződés helyesen kerül végrehajtásra a bemeneti adatok nagyobb osztálya esetén.

### Irányelvek az okosszerződések tulajdonságalapú tesztelésének futtatásához {#running-property-based-tests}

A tulajdonságalapú tesztelés futtatása általában egy tulajdonság (például [egész számok túlcsordulásának](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow) hiánya) vagy tulajdonságok gyűjteményének meghatározásával kezdődik, amelyet egy okosszerződésben ellenőrizni szeretne. A tulajdonságtesztek írásakor szükség lehet egy olyan értéktartomány meghatározására is, amelyen belül a program adatokat generálhat a tranzakciós bemenetekhez.

A megfelelő konfigurálás után a tulajdonságtesztelő eszköz véletlenszerűen generált bemenetekkel hajtja végre az okosszerződések funkcióit. Ha az állítások sérülnek, akkor a fejlesztő egy jelentést kap a konkrét bemeneti adatokkal, amelyek sértik az értékelt tulajdonságot. Tekintse meg az alábbi útmutatókat, hogy elkezdhesse a tulajdonságalapú tesztelést különböző eszközökkel:

- **[Okosszerződések statikus elemzése a Slither segítségével](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither#slither)**
- **[Tulajdonságalapú tesztelés a Brownie segítségével](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing szerződések a Foundry segítségével](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing szerződések a Echidna segítségével](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Okosszerződések szimbolikus végrehajtása a Manticore segítségével](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Okosszerződések szimbolikus végrehajtása a Mythril segítségével](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Okosszerződések manuális tesztelése {#manual-testing-for-smart-contracts}

Az okosszerződések manuális tesztelése gyakran a fejlesztési ciklus későbbi szakaszában, az automatizált tesztek lefuttatása után történik. A tesztelés ezen formája az okosszerződést egy teljesen integrált termékként értékeli, hogy kiderüljön, a műszaki követelményekben meghatározottak szerint teljesít-e.

### Szerződések tesztelése helyi blokkláncon {#testing-on-local-blockchain}

Míg a helyi fejlesztői környezetben végzett automatizált tesztelés hasznos hibakeresési információkkal szolgálhat, a fejlesztő azt is tudni szeretné, hogyan viselkedik az okosszerződése éles környezetben. A fő Ethereum-láncra való telepítés gázdíjakkal jár – arról nem is beszélve, hogy a fejlesztő vagy a felhasználók valódi pénzt veszíthetnek, ha az okosszerződés hibás.

A szerződés tesztelését egy helyi blokkláncon ([fejlesztői hálózaton](/developers/docs/development-networks/)) ajánlott elvégezni a fő hálózat helyett. A helyi blokklánc az Ethereum egy olyan másolata, amely lokálisan fut a számítógépen, és amely a végrehajtási réteg viselkedését szimulálja. Így jelentős többletköltségek nélkül programozhat tranzakciókat a szerződéssel való interakcióra.

A szerződések futtatása egy helyi blokkláncon hasznos lehet a manuális integrációs tesztelés egyik formájaként. [Az okosszerződések nagymértékben modulárisak](/developers/docs/smart-contracts/composability/), lehetővé téve a meglévő protokollokkal való integrációt, de továbbra is biztosítani kell, hogy az ilyen összetett láncon belüli kölcsönhatások a megfelelő eredményeket hozzák.

[További információk a fejlesztői hálózatokról.](/developers/docs/development-networks/)

### Szerződések tesztelése a teszthálózatokon {#testing-contracts-on-testnets}

A teszthálózat pontosan úgy működik, mint az Ethereum fő hálózat, azzal a különbséggel, hogy a használt ethernek (ETH) nincs valós értéke. Ha a szerződést egy [teszthálózatra](/developers/docs/networks/#ethereum-testnets) telepíti, akkor bárki kapcsolatba léphet azzal (például a dapp felületén keresztül) anélkül, hogy pénzeszközt kockáztatna.

A manuális tesztelés ezen formája hasznos az alkalmazás teljes folyamatának kiértékeléséhez a felhasználó szemszögéből. Itt a béta tesztelők próbafuttatásokat is végezhetnek, és jelenthetik a szerződés üzleti logikájával és általános funkcionalitásával kapcsolatos problémákat.

A teszthálózatra való telepítés a helyi blokkláncon való tesztelés után ideális, mivel az előbbi közelebb áll az Ethereum virtuális gépének viselkedéséhez. Ezért számos Ethereum-projektben gyakori, hogy a dappokat teszthálózatokra telepítik, hogy valós körülmények között értékeljék az okosszerződések működését.

[Bővebben az Ethereum teszthálózatokról.](/developers/docs/development-networks/#public-beacon-testchains)

## A tesztelés és a formális ellenőrzés összehasonlítása {#testing-vs-formal-verification}

Miközben a tesztelés segít annak megerősítésében, hogy a szerződés bizonyos bemeneti adatok esetében a várt eredményeket adja vissza, a nem használt bemeneti adatok esetében ugyanezt nem tudja egyértelműen bizonyítani. Az okosszerződés tesztelése nem garantálhatja a „funkcionális helyességet” (nem mutathatja meg, hogy a program _minden_ bemeneti értékre az előírt módon viselkedik-e).

A formális ellenőrzés a szoftver helyességét vizsgálja, hogy a program formális modellje megfelel-e a formális specifikációnak. A formális modell egy program absztrakt matematikai reprezentációja, míg a formális specifikáció a program tulajdonságait (a végrehajtással kapcsolatos logikai állításokat) határozza meg.

Mivel a tulajdonságok matematikai kifejezésekben vannak leírva, logikai következtetési szabályok segítségével ellenőrizhetővé válik, hogy a rendszer formális (matematikai) modellje megfelel-e a specifikációnak. Ezért azt mondják, hogy a formális verifikációs eszközök „matematikai bizonyítékot” állítanak elő egy rendszer helyességéről.

A teszteléssel ellentétben a formális ellenőrzés használható arra, hogy egy okosszerződés végrehajtása megfelel-e a formális specifikációnak _minden_ végrehajtás esetén (nincs benne hiba), anélkül hogy mintaadatokkal kellene végrehajtani. Ez nem csak a több tucatnyi egységteszt futtatására fordított időt csökkenti, de hatékonyabb a rejtett sebezhetőségek felderítésében is. Ennek ellenére a formális ellenőrzési technikák haszna a megvalósítás nehézségétől és hasznosságától függ.

[További információ az okosszerződések formális ellenőrzéséről.](/developers/docs/smart-contracts/formal-verification)

## A tesztelés, illetve auditok és hibavadászatok összehasonlítása {#testing-vs-audits-bug-bounties}

A szigorú tesztelés ritkán tudja garantálni, hogy egy szerződésben nincsenek hibák; a formális ellenőrzési módszerek erősebb biztosítékot nyújthatnak a helyességre, de nehéz ezeket alkalmazni, és jelentős költségekkel járnak.

Mégis tovább növelheti a szerződéses sebezhetőségek felfedezésének lehetőségét, ha független kódellenőrzést végeztet. Az [okosszerződésaudit](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) és a [hibavadászat](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) két olyan módszer, amelynek révén mások is elemzik a szerződéseket.

Az auditokat olyan auditorok végzik, akik tapasztaltak az okosszerződések biztonsági hibáinak és helytelen fejlesztési gyakorlatainak felderítésében. Az audit általában magában foglalja a tesztelést (és esetleg a formális ellenőrzést), valamint a teljes kódbázis manuális felülvizsgálatát.

Ezzel szemben a hibavadász-program általában pénzjutalom felajánlását jelenti olyan személyeknek (általában [fehér kalapos hackereknek](https://en.wikipedia.org/wiki/White_hat_(computer_security))), akik felfedezik az okosszerződés sebezhetőségét és feltárják azt a fejlesztők előtt. A hibavadászatok hasonlítanak az auditokhoz, mivel mások segítségét kérik az okosszerződések hibáinak megtalálásában.

A fő különbség az, hogy a hibavadász-programok nyitottak a szélesebb fejlesztői/hackerközösség számára, és etikus hackerek és független biztonsági szakemberek széles rétegét vonzzák, akik egyedi készségekkel és tapasztalattal rendelkeznek. Ez előnyt jelenthet az olyan okosszerződések ellenőrzésével szemben, amelyek főként olyan csapatokra támaszkodnak, akik korlátozott szakértelemmel rendelkezhetnek.

## Tesztelőeszközök és könyvtárak {#testing-tools-and-libraries}

### Egységtesztelési eszközök {#unit-testing-tools}

- **[Solidity-coverage](https://github.com/sc-forks/solidity-coverage)** – _Kódlefedettségi eszköz Solidity nyelven írt okosszerződésekhez._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** – _Keretrendszer fejlett okosszerződések fejlesztéséhez és teszteléséhez (ethers.js-alapú)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** – _Eszköz a Solidity okosszerződések teszteléséhez. A Remix IDE „Solidity Unit Testing” plugin alatt működik, amely a szerződéshez tartozó tesztek írására és futtatására szolgál._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** – _Állításkönyvtár az Ethereum okosszerződések teszteléséhez. Győződjön meg arról, hogy a szerződései az elvárt módon viselkednek!_

- **[Brownie unit testing framework](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** – _A Brownie a Pytest-et használja, amely egy funkciógazdag tesztelési keretrendszert, és amely lehetővé teszi kis tesztek írását minimális kóddal, jól skálázható nagyobb projektekhez és nagymértékben bővíthető._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/forge)** – _A Foundry a Forge megoldást kínálja, amely egy gyors és rugalmas Ethereum tesztelési keretrendszert, és amely képes egyszerű egységtesztek, gázoptimalizálási ellenőrzések és szerződés fuzzing végrehajtására._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** – _Keretrendszer az ethers.js, Mocha és Chai alapú okosszerződések tesztelésére._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** – _Python-alapú fejlesztési és tesztelési keretrendszer az Ethereum virtuális gépen működő okosszerződésekhez._

### Tulajdonságalapú tesztelőeszközök {#property-based-testing-tools}

#### Statikus elemzőeszközök {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** – _Python-alapú Solidity statikus elemzési keretrendszer a sebezhetőségek felkutatására, a kódérthetőség javítására és az okosszerződések egyéni elemzésére._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** – _Linter a stílusra és biztonságra vonatkozó bevált gyakorlatok érvényesítésére a Solidity okosszerződések programozási nyelvéhez._

#### Dinamikus elemzőeszközök {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** – _Gyors szerződésfuzzer az okosszerződések sebezhetőségének felderítésére tulajdonságalapú teszteléssel._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** – _Automatizált fuzzing eszköz, amely hasznos a tulajdonságok megsértésének észlelésére az okosszerződés kódjában._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** – _Dinamikus szimbolikus végrehajtási keretrendszer az EVM-bájtkód elemzésére._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** – _EVM-bájtkódértékelő eszköz a szerződéses sebezhetőségek felderítésére szennyeződéselemzés, dinamikus szimbolikus (concolic) elemzés és a kontrollfolyamat ellenőrzésének segítségével._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** – _A Scribble egy specifikációs nyelv és futásidejű ellenőrzési eszköz, amely lehetővé teszi, hogy az okosszerződésekre olyan tulajdonságokat jegyezzen fel, amelyek lehetővé teszik a szerződések automatikus tesztelését olyan eszközökkel, mint a Diligence Fuzzing vagy a MythX._

## Kapcsolódó útmutatók {#related-tutorials}

- [A különböző tesztelési termékek áttekintése és összehasonlítása](/developers/tutorials/guide-to-smart-contract-security-tools/)
- [Echinda használata okosszerződés teszteléshez](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [A Manticore használata az okosszerződés hibáinak felderítésére](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [A Slither használata okosszerződés bugok felderítésére](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Hogyan készítsen másolatot a Solidity szerződésekről teszteléshez](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Hogyan végezzen egységteszteket Solidity-ben a Foundry használatával](https://www.rareskills.io/post/foundry-testing-solidity)

## További olvasnivaló {#further-reading}

- [Részletes útmutató az Ethereum-okosszerződések teszteléséhez](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Hogyan tesztelje az Ethereum-okosszerződéseket](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [A MolochDAO egységtesztelési útmutatója fejlesztőknek](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Hogyan teszteljen okosszerződéseket, mint egy igazi rocksztár](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
