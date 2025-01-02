---
title: Okosszerződések frissítése
description: Az Ethereum okosszerződések frissítési mintáinak áttekintése
lang: hu
---

Az Ethereumban az okosszerződések olyan önvégrehajtó programok, amelyek az Ethereum virtuális gépén (EVM) futnak. Ezek a programok eleve megváltoztathatatlanok, ami megakadályozza az üzleti logika frissítését a szerződés telepítése után.

Bár a megváltoztathatatlanság szükséges a bizalomigény nélküliséghez, decentralizáláshoz és biztonsághoz, bizonyos esetekben hátrányt jelenthet. A megváltoztathatatlan kód például lehetetlenné teheti a fejlesztők számára a sebezhető szerződések javítását.

Ugyanakkor az okosszerződések javítására irányuló kutatások növekedése számos frissítési minta bevezetéséhez vezetett. Ezek a minták lehetővé teszik a fejlesztők számára az okosszerződések frissítését (a megváltoztathatatlanság megőrzése mellett) azáltal, hogy az üzleti logikát különböző szerződésekben helyezik el.

## Előfeltételek {#prerequisites}

Érdemes ismerni az [okosszerződéseket](/developers/docs/smart-contracts/), az [okosszerződések anatómiáját](/developers/docs/smart-contracts/anatomy/) és az [Ethereum virtuális gépet (EVM)](/developers/docs/evm/). Ehhez az útmutatóhoz az is hozzátartozik, hogy az olvasók értenek az okosszerződések programozásához.

## Mi az az okosszerződés-frissítés? {#what-is-a-smart-contract-upgrade}

Az okosszerződés frissítése magában foglalja az üzleti logika megváltoztatását, miközben megőrzi a szerződés státuszát. Fontos tisztázni, hogy a frissíthetőség és a változtathatóság nem ugyanaz, különösen az okosszerződéseknél.

Az Ethereum-hálózat egy adott címére telepített programot továbbra sem lehet megváltoztatni. De megváltoztathatja azt a kódot, amely akkor kerül végrehajtásra, amikor a felhasználók interakcióba lépnek egy okosszerződéssel.

Ezt a következő módszerekkel teheti meg:

1. Az okosszerződés több verziójának létrehozása és a státusz (az adatok) migrálása a régi szerződésből az új példányába.

2. Külön szerződések létrehozása az üzleti logika és a státusz tárolására.

3. Proxyminták használata a funkcióhívások delegálásához egy megváltoztathatatlan proxyszerződésből egy módosítható logikai szerződésbe.

4. Egy megváltoztathatatlan főszerződés létrehozása, amely interfészeket hoz létre és rugalmas alszerződésekre támaszkodik bizonyos funkciók végrehajtásához.

5. A gyémántminta használata funkcióhívások delegálására egy proxyszerződésből logikai szerződésekbe.

### 1. frissítési mechanizmus: szerződésmigráció {#contract-migration}

A szerződésmigráció a verziókezelésen alapul – ugyanazon szoftver egyedi státuszainak létrehozásán és kezelésén. A szerződésmigráció magában foglalja egy meglévő okosszerződés új példányának telepítését, valamint a tárolás és az egyenlegek átvitelét az új szerződésre.

Az újonnan telepített szerződés üres tárolóval rendelkezik, ami lehetővé teszi az adatok visszaállítását a régi szerződésből és írását az új példányba. Ezt követően frissítenie kell az összes olyan szerződést, amely kölcsönhatásba lépett a régivel, hogy tükrözze az új címet.

A szerződésátállás utolsó lépése, hogy a felhasználókat meggyőzzük az új szerződés használatáról. Az új szerződésváltozat megtartja a felhasználói egyenlegeket és címeket, ami megőrzi a megváltoztathatatlanságot. Ha token-alapú szerződésről van szó, akkor a tőzsdékkel is kapcsolatba kell lépnie, hogy dobják el a régi szerződést és használják az újat.

A szerződésmigráció egyszerű és biztonságos intézkedés az okosszerződések frissítésére a felhasználói interakciók megszakítása nélkül. A felhasználói tárolók és egyenlegek kézi migrálása az új szerződésre azonban időigényes és magas gázköltségekkel járhat.

[További információ a szerződésmigrációról.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### 2. frissítési mechanizmus: Az adatok szétválasztása {#data-separation}

Az okosszerződések frissítésének másik módszere az üzleti logika és az adattárolás külön szerződésekben történő szétválasztása. Ez azt jelenti, hogy a felhasználók a logikai szerződéssel lépnek kapcsolatba, míg az adatokat a tárolási szerződésben tartják.

A logikai szerződés tartalmazza azt a kódot, amely akkor kerül végrehajtásra, amikor a felhasználók interakcióba lépnek az alkalmazással. A tárolási szerződés címét is tartalmazza, és interakcióba lép vele az adatok lekérdezése és beállítása érdekében.

Eközben a tárolási szerződés tartja az okosszerződéshez kapcsolódó státuszt, például a felhasználói egyenlegeket és címeket. Megjegyzendő, hogy a tárolási szerződés a logikai szerződés tulajdonában van, és telepítéskor az utóbbi címével van konfigurálva. Ez megakadályozza, hogy illetéktelen szerződések meghívják a tárolási szerződést vagy frissítsék annak adatait.

Alapértelmezés szerint a tárolási szerződés megváltoztathatatlan, de a logikai szerződést, amelyre mutat, lecserélheti egy új implementációra. Ez megváltoztatja az EVM-ben futó kódot, miközben érintetlenül hagyja a tárolást és az egyenlegeket.

Ennek a frissítési módszernek a használata a logikai szerződés címének frissítését igényli a tárolási szerződésben. Az új logikai szerződést is be kell konfigurálnia a tárolási szerződés címével a korábban ismertetett okok miatt.

Az adatszétválasztás mintája könnyebben megvalósítható, mint a szerződésmigráció. Azonban több szerződést kell kezelnie, és összetett engedélyezési sémákat kell megvalósítania, hogy megvédje az okosszerződéseket a rosszindulatú frissítésektől.

### 3. frissítési mechanizmus: Proxyminták {#proxy-patterns}

A proxyminta szintén az adatok szétválasztását használja, hogy az üzleti logikát és az adatokat külön szerződésekben tartsa. A proxymintában azonban a tárolási szerződés (a proxyt) a kód végrehajtása során hívja meg a logikai szerződést. Ez az adatok szétválasztásának fordítottja, ahol a logikai szerződés hívja meg a tárolási szerződést.

Az alábbi történik egy proxymintában:

1. A felhasználók interakcióba lépnek a proxyszerződéssel, amely tárolja az adatokat, de nem tartalmazza az üzleti logikát.

2. A proxyszerződés tárolja a logikai szerződés címét, és minden funkcióhívást a logikai szerződéshez (amely az üzleti logikát tartalmazza) delegál a `delegatecall` függvény segítségével.

3. Miután a hívás továbbításra került a logikai szerződéshez, abból visszakeresésre kerülnek a visszaküldött adatok, és átadja azokat a felhasználónak.

A proxyminták használata megköveteli a **delegatecall** függvény ismeretét. Alapvetően a `delegatecall` egy olyan opkód, amely lehetővé teszi egy szerződés számára, hogy egy másik szerződést hívjon, miközben a tényleges kódvégrehajtás a hívó szerződés kontextusában történik. A `delegatecall` proxymintákban való használatának egyik következménye, hogy a proxyszerződés olvas és ír a tárolójába, és úgy hajtja végre a logikai szerződésben tárolt logikát, mintha egy belső függvényt hívna.

A [Solidity dokumentációból](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Létezik az üzenethívásnak egy speciális változata, a **delegatecall**, amely megegyezik az üzenethívással, eltekintve attól, hogy a célcímen lévő kódot a hívó szerződés kontextusában hajtjuk végre (annak címén), és a `msg.sender` és `msg.value` értéke nem változik._ _Ez azt jelenti, hogy egy szerződés futásidőben dinamikusan betölthet kódot egy másik címről. A tárolás, az aktuális cím és az egyenleg továbbra is a hívó szerződésre hivatkozik, csak a kódot a hívott címről veszik._

A proxyszerződés tudja, hogy meg kell hívnia a `delegatecall` funkciót, amikor a felhasználó meghív egy függvényt, mert van egy beépített `fallback` függvénye. A Solidity programozásban a [fallback függvény](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) akkor kerül végrehajtásra, ha a hívás nem felel meg a szerződésben meghatározott függvényeknek.

A proxyminta működéséhez egyéni fallback függvény írása szükséges, amely meghatározza, hogy a proxyszerződés hogyan kezelje az általa nem támogatott függvényhívásokat. Ebben az esetben a proxy fallback függvénye úgy van programozva, hogy egy delegatecall funkciót kezdeményezzen, és a felhasználó kérését átirányítsa az aktuális logikai szerződés implementációjához.

A proxyszerződés alapértelmezés szerint megváltoztathatatlan, de új logikai szerződéseket lehet létrehozni frissített üzleti logikával. A frissítés elvégzése a proxyszerződésben hivatkozott logikai szerződés címének megváltoztatásával történik.

Azáltal, hogy a proxyszerződést egy új logikai szerződésre irányítja, a felhasználók által meghívott függvényeknél végrehajtott kód megváltozik. Ez lehetővé teszi a szerződés logikájának frissítését anélkül, hogy a felhasználóknak egy új szerződéssel kellene interakcióba lépniük.

A proxyminta népszerű módszer az okosszerződések frissítésére, mivel kiküszöböli a szerződések migrációjával járó nehézségeket. A proxyminták használata azonban bonyolultabb, és helytelen használat esetén kritikus hibákat, például [függvényválasztó ütközéseket](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357) okozhatnak.

[Bővebben a proxymintákról](https://blog.openzeppelin.com/proxy-patterns/).

### 4. frissítési mechanizmus: Stratégiaminta {#strategy-pattern}

Ennek a technikának az alapja a [stratégiaminta](https://en.wikipedia.org/wiki/Strategy_pattern), amely olyan szoftverek létrehozására ösztönöz, amelyek más programokkal kapcsolódnak, hogy bizonyos funkciókat megvalósítsanak. A stratégiaminta alkalmazása az Ethereum-fejlesztésre azt jelentené, hogy olyan okosszerződést kell létrehozni, amely más szerződések függvényeit hívja meg.

Ebben az esetben a fő szerződés tartalmazza az alapvető üzleti logikát, de bizonyos funkciók végrehajtásához más okosszerződésekkel (szatellit- vagy alszerződésekkel) interfészeket hoz létre. Ez a fő szerződés tárolja az egyes alszerződések címét is, és képes váltani azok különböző implementációi között.

Létrehozhat egy új alszerződést, és konfigurálhatja a fő szerződést az új címmel. Ez lehetővé teszi az okosszerződési _stratégiák_ megváltoztatását (azaz új logika implementálását).

Bár hasonló a korábban tárgyalt proxymintához, a stratégiaminta mégis különbözik, mivel a fő szerződés, amellyel a felhasználók interakcióba lépnek, tartalmazza az üzleti logikát. Ennek a mintának a használata lehetőséget biztosít arra, hogy korlátozott változtatásokat hajtson végre egy okosszerződésen anélkül, hogy az alapvető infrastruktúrát befolyásolná.

A fő hátránya, hogy ez a minta inkább kisebb frissítések bevezetésére alkalmas. Továbbá, ha a fő szerződés veszélybe kerül (például meghackelik), akkor ezt a frissítési módszert nem tudja használni.

### 5. frissítési mechanizmus: Gyémántminta {#diamond-pattern}

A gyémántminta a proxyminta továbbfejlesztésének tekinthető. A gyémántminták abban különböznek a proxymintáktól, hogy a gyémánt proxyszerződés egynél több logikai szerződéshez delegálhat függvényhívásokat.

A gyémántmintában lévő logikai szerződéseket _oldalaknak (facet)_ nevezzük. Ahhoz, hogy a gyémántminta működjön, létre kell hoznia egy olyan leképezést a proxyszerződésben, amely a [függvényválasztókat](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) különböző oldalcímekhez rendeli.

Amikor egy felhasználó függvényhívást hajt végre, a proxyszerződés ellenőrzi a leképezést, hogy megtalálja a függvény végrehajtásáért felelős oldalt. Ezután meghívja a `delegatecall` (a fallback függvényt használva), és a hívást átirányítja a megfelelő logikai szerződéshez.

A gyémánt frissítési mintának van néhány előnye a hagyományos proxymintákkal szemben:

1. Lehetővé teszi a szerződés egy kis részének frissítését anélkül, hogy az egész kódot megváltoztatná. A proxyminta használata a frissítésekhez egy teljesen új logikai szerződés létrehozását igényli, még a kisebb frissítések esetében is.

2. Minden okosszerződés (beleértve a proxymintákban használt logikai szerződéseket is) 24 KB-os méretkorlátozással rendelkezik, ami korlátot jelenthet – különösen a több funkciót igénylő összetett szerződések esetében. A gyémántminta megkönnyíti ennek a problémának a megoldását azáltal, hogy a funkciókat több logikai szerződésre osztja fel.

3. A proxyminták a hozzáférés-ellenőrzés mindenre kiterjedő megközelítését alkalmazzák. A frissítési funkciókhoz hozzáféréssel rendelkező entitás megváltoztathatja a _teljes_ szerződést. A gyémántminta azonban lehetővé teszi a moduláris jogosultsági megközelítést, ahol az entitások korlátozhatók bizonyos funkciók frissítésére egy okosszerződésen belül.

[Bővebben a gyémántmintáról](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Az okosszerződések frissítésének előnyei és hátrányai {#pros-and-cons-of-upgrading-smart-contracts}

| Előnyök                                                                                                                                 | Hátrányok                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Az okosszerződés frissítése megkönnyítheti a telepítés utáni fázisban felfedezett sebezhetőségek javítását.                             | Az okosszerződések frissítése tagadja a kód megváltoztathatatlanságának elképzelését, ami hatással van a decentralizációra és a biztonságra.                                          |
| A fejlesztők logikai frissítésekkel új funkciókat adhatnak a decentralizált alkalmazásokhoz.                                            | A felhasználóknak bízniuk kell abban, hogy a fejlesztők nem módosítják önkényesen az okosszerződéseket.                                                                               |
| Az okosszerződések frissítései javíthatják a végfelhasználók biztonságát, mivel a hibák gyorsan kijavíthatók.                           | A frissítési lehetőség okosszerződésekbe történő programozása újabb komplexitási réteget jelent, és növeli a kritikus hibák lehetőségét.                                              |
| A szerződésfrissítések nagyobb teret adnak a fejlesztőknek a különböző funkciókkal való kísérletezésre és a dappok jövőbeli javítására. | Az okosszerződések frissítésének lehetősége arra ösztönözheti a fejlesztőket, hogy gyorsabban indítsák el a projekteket, anélkül hogy a fejlesztési fázisban átvilágítást végeznének. |
|                                                                                                                                         | A megbízhatatlan hozzáférés-szabályozás vagy a az okosszerződésekben lévő centralizálás megkönnyítheti a rosszindulatú szereplők számára a jogosulatlan frissítések végrehajtását.    |

## Az okosszerződések frissítésére vonatkozó megfontolások {#considerations-for-upgrading-smart-contracts}

1. Használjon biztonságos hozzáférés-szabályozási/engedélyezési mechanizmusokat a jogosulatlan okosszerződés-frissítések megakadályozására, különösen, ha proxymintákat, stratégiamintákat vagy adatszétválasztást használ. Példa a frissítési funkcióhoz való hozzáférést úgy korlátozza, hogy csak a szerződés tulajdonosa hívhatja meg azt.

2. Az okosszerződések frissítése összetett tevékenység, és nagyfokú körültekintést igényel a sebezhetőségek megelőzése érdekében.

3. Csökkentse a bizalmi feltételezéseket a frissítések decentralizálásával. A lehetséges stratégiák közé tartozik a [több aláírásos (multi-sig) tárcaszerződés](/developers/docs/smart-contracts/#multisig) használata a frissítések ellenőrzésére, vagy a [a DAO tagjainak](/dao/) szavazása a frissítés jóváhagyásáról.

4. Legyen tisztában a szerződések frissítésének költségeivel. Például a státusz (pl. a felhasználói egyenlegek) átmásolása egy régi szerződésből egy új szerződésbe a migráció során egynél több tranzakciót igényelhet, ami több gázdíjat jelent.

5. Fontolja meg **időzárak** bevezetését a felhasználók védelme érdekében. Az időzár a rendszerben végrehajtott változtatások késleltetésére utal. Az időzár kombinálható egy több aláírásos irányítási rendszerrel a frissítések ellenőrzésére: ha egy javasolt művelet eléri a szükséges jóváhagyási küszöbértéket, nem hajtják végre, amíg az előre meghatározott késleltetési időszak el nem telik.

Az időkorlátok időt adnak a felhasználóknak arra, hogy kilépjenek a rendszerből, ha nem értenek egyet egy javasolt változtatással (például logikai frissítés vagy új díjszabás). Az időzítés nélkül a felhasználóknak bízniuk kell abban, hogy a fejlesztők nem hajtanak végre önkényes változtatásokat az okosszerződésben előzetes értesítés nélkül. Ennek hátránya, hogy az időzár korlátozza a sebezhetőségek gyors javításának lehetőségét.

## Források {#resources}

**OpenZeppelin Upgrades Plugins – _Egy eszközcsomag a frissíthető okosszerződések telepítéséhez és biztosításához._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Dokumentáció](https://docs.openzeppelin.com/upgrades)

## Oktatóanyagok {#tutorials}

- [Az okosszerződések frissítése | YouTube Tutorial](https://www.youtube.com/watch?v=bdXJmWajZRY) Patrick Collinstól
- [Útmutató az Ethereum okosszerződés-migrációról](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) – Austin Griffith
- [A UUPS proxyminta használata az okosszerződésfrissítéshez](https://blog.logrocket.com/author/praneshas/) – Pranesh A.S
- [Web3-útmutató: frissíthető okosszerződés (proxy) írása az OpenZeppelin használatával](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) – fangjun.eth

## További olvasnivaló {#further-reading}

- [Az okosszerződés frissítésének helyzetet](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) – Santiago Palladino
- [A Solidity okosszerződés frissítésének módjai](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) – Crypto Market Pool blog
- [Tanulja meg: okosszerződések frissítése](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) – OpenZeppelin Docs
- [Proxy-minták a Solidity szerződések frissíthetőségéhez: az átlátható és UUPS proxyk összehasonlítása](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) – Naveen Sahu
- [Hogyan működik a gyémántfrissítés](https://dev.to/mudgen/how-diamond-upgrades-work-417j) – Nick Mudge
