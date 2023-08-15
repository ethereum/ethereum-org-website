---
title: Bevezetés a dappokba
description:
lang: hu
---

Egy decentralizált applikáció (dapp) olyan applikáció, mely egy olyan decentralizált hálózatra épült, ami egyesít egy [okosszerződést](/developers/docs/smart-contracts/) és egy frontend felhasználói felületet. Megjegyzésül: az Ethereum okosszerződések elérhetőek és transzparensek - mint a nyílt API-ok - így a dappod tartalmazhat olyan okosszerződést, melyet másvalaki írt.

## Előfeltételek {#prerequisites}

Mielőtt a dappokról tanulnál érdemes átnézned a [blokklánc alapok](/developers/docs/intro-to-ethereum/) oldalt, valamint eolvasnod az Ethereum hálózatról szóló oldalt, és azt, hogy mitől lesz decentralizált.

## A dapp meghatározása {#definition-of-a-dapp}

A dapp egy olyan backend kód, mely egy decentralizált peer-to-peer hálózaton fut. Ezzel szemben egy app esetében a backend kód centralizált szervereken fut.

Egy dappnak bármely nyelven íródott frontend kódja vagy felhasználói felülete lehet (akárcsak az appoknak), mely hívásokat indíthat a backend felé. Továbbá a frontendje olyan decentralizált tárhelyeken lehet, mint az [IPFS](https://ipfs.io/).

- **Decentalizáltak**, mely függetlenné teszi őket, és senki sem irányítja őket.
- **Determinisztikusak** vagyis ugyanazt a függvényt hajtják végre a végrehajtási környezettől függetlenül.
- **Turing kompatibilisek**, ami azt jelenti, hogy ha adottak az erőforrások, akkor a dapp bármilyen parancsot végre tud hajtani.
- **Izoláltak**, ami azt jelenti, hogy egy virtuális környezetben futnak le, melyek Ethereum Virtuális Gépként (EVM) ismerünk, így ha az okosszerződésnek van egy bugja, nem fogja az akadályozni a blokklánc hálózat működését.

### Az okosszerződésekről {#on-smart-contracts}

Hogy bevezessük a dappokat, először be kell vezetnünk az okosszerződéseket – a dapp backendjét jobb kifejezés híján. Részletes áttekintésért keresd fel az [okosszerződések](/developers/docs/smart-contracts/) oldalt.

Az okosszerződés olyan kód, mely az Ethereum blokkláncon fut és pontosan úgy, ahogyan programozták. Amint feltelepíted őket a hálózatra, nem tudod megváltoztatni őket. A dappok decentralizáltak lehetnek, mivel a szerződésbe írt logika irányítja őket, nem pedig egy egyén vagy egy vállalat. Ez azt is jelenti, hogy nagyon óvatosan kell megtervezned a szerződéseidet és alaposan le kell tesztelned őket.

## A dapp fejlesztés előnyei {#benefits-of-dapp-development}

- **Nulla állásidő** – amint az alkalmazás alapjául szolgáló okosszerződés telepítésre és a blokkláncra kerül, a hálózat egésze mindig képes lesz kiszolgálni a szerződéssel interakcióba lépő klienseket. Rosszindulatú szereplők emiatt nem tudnak szolgáltatásmegtagadási támadásokat indítani az egyes dappok ellen.
- **Adatvédelem** – nem kell igazolnod a valódi személyazonosságodat, hogy interakcióba lépj egy dappal.
- **Cenzúra rezisztancia** – nincs olyan egyedüli entitás a hálózaton, mely megakadályozhatná a felhasználókat abban, hogy tranzakciókat indítsanak, dappokat telepítsenek vagy adatot olvassanak a blokkláncról.
- **Teljes adat integritás** – a blokkláncon tárolt adatot nem megváltoztatható és nem megkérdőjelezhető a kriptográfiai primitíveknek köszönhetően. Rosszindulatú szereplők nem tudnak tranzakciókat vagy egyéb más adatot hamaisítni, amelyet publikáltak.
- **Bizalommentes számítás/hitelesíthető viselkedés** – az okosszerződéseket lehet analizálni és garantált, hogy megjósolható módon fognak végbe menni anélkül, hogy meg kellene bízni egy központi hatóságban. Ez nem igaz a hagyományos modellek esetében; ha például online bankolást használunk, meg kell bíznunk a pénzintézetekben, hogy nem fognak visszaélni a pénzügyi adatainkkal, megmásítani a feljegyzéseket vagy hacker támadást elszenvedni.

## A dapp fejlesztés visszáságai {#implications-of-dapp-development}

- **Karbantartás** – a dappokat nehezebb karbantartani, mivel a blokkláncra publikált kódot és az adatot nehezebb módosítani. A fejlesztők számára nehézkes frissíteni a dappjukat (vagy a dapp által tárolt mögöttes adatot), amint felkerültek a blokkláncra - még akkor is ha bugokat vagy biztonsági kockázatokat fedeztek fel a régi verzióban.
- **Teljesítmény költség** – nagy a teljesítmény költség és a skálázás nagyon nehéz. Ahhoz, hogy azt a biztonsági, integritási, átláthatósági és megbízhatósági szintet elérjük, melyre az Ethereum törekszik, minden egyes csomópont lefuttatja és eltárolja az összes tranzakciót. Ezen felül a proof-of-work is időbe telik. Egy egyszerű számolgatás ezt a költséget körülbelül az 1,000,000 szorosára becsüli, mintha az egy általános számítás lett volna.
- **Hálózati torlódás** – legalábbis a jelenlegi modell szerint, ha egy dapp túl sok számítási kapacitást használ fel, akkor a teljes hálózat feltorlódik. Jelenleg a hálózat körülbelül 10 tranzakciót tud feldolgozni egy másodperc alatt; ha ennél gyorsabban küldenek be tranzakciókat, akkor a feldolgozatlan tranzakciók száma gyorsan felfújódhat.
- **Felhasználói élmény** – nehezebb felhasználóbarát élményeket megalkotni: Az átlag végfelhasználó túl nehéznek találhatja az eszközkészlet felállítását ahhoz, hogy a blokklánccal valóban biztonságos módon interakcióba léphessen.
- **Centralizáció** – Felhasználóbarát és fejlesztőbarát megoldások, melyek az Ethereum alaprétegére épültek, végül mégis úgy nézhetnek ki, mint a centralizált szolgáltatások: például az ilyen szolgáltatások a kulcsokat és más érzékeny információkat a szerver oldalon tárolhatják, a frontendnek egy centralizált szerver szolgálhatja ki, vagy a fontos üzleti logikát egy centralizált szerver végzi, mielőtt felkerült volna a blokkláncra. Ez kizárja rengeteg (ha nem az összes) előnyét a blokkláncnak a hagyományos modellel szemben.

## Dapp eszközök {#dapp-tools}

**One Click Dapp** **_- FOSS eszköz, mely egy dapp frontendet generál egy ABI-ból._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow** **_- FOSS leteszteljék a csomópontjukat & összeálítsanak valamint debugoljanak RPC hívásokat a böngészőből._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_

## Kapcsolódó témák {#related-topics}

- [Bevezetés az Ethereum stack-be](/developers/docs/ethereum-stack/)
- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)
