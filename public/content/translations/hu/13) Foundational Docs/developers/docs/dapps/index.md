---
title: Bevezetés a dappokba
description:
lang: hu
---

A decentralizált alkalmazás (dapp) egy olyan applikáció, amely olyan decentralizált hálózatra épült, ami egy [okosszerződést](/developers/docs/smart-contracts/) és egy frontend felhasználói felületet egyesít magában. Megjegyzésül: az Ethereum okosszerződések elérhetőek és transzparensek - mint a nyílt API-ok - így a dappod tartalmazhat olyan okosszerződést, melyet másvalaki írt.

## Előfeltételek {#prerequisites}

Mielőtt a dappokról tanulnál érdemes átnézned a [blokklánc alapok](/developers/docs/intro-to-ethereum/) oldalt, valamint eolvasnod az Ethereum hálózatról szóló oldalt, és azt, hogy mitől lesz decentralizált.

## A dapp meghatározása {#definition-of-a-dapp}

A dapp egy olyan backend kód, mely egy decentralizált peer-to-peer hálózaton fut. Ezzel szemben egy app esetében a backend kód centralizált szervereken fut.

Egy dappnak bármely nyelven íródott frontend kódja vagy felhasználói felülete lehet (akárcsak az appoknak), mely hívásokat indíthat a backend felé. Továbbá a frontendje olyan decentralizált tárhelyeken lehet, mint az [IPFS](https://ipfs.io/).

- **Decentralizált** – a dapp-ok az Ethereumon működnek, azaz egy nyitott, nyilvános, decentralizált platformon, ahol egyetlen személy vagy csoportnak sem irányít
- **Determinisztikusak** vagyis ugyanazt a függvényt hajtják végre a végrehajtási környezettől függetlenül.
- **Turing-teljes** – a dappok képesek végrehajtani bármilyen akciót, ha a megfelelő erőforrások rendelkezésre állnak
- **Izolált** – a dappok egy virtuális környezetben, az Ethereum Virtuális Gépen futnak, így ha az okosszerződésben hiba van, az nem érinti a blokklánchálózat normál működését

### Az okosszerződésekről {#on-smart-contracts}

Hogy bevezessük a dappokat, először be kell vezetnünk az okosszerződéseket – a dapp backendjét jobb kifejezés híján. A részletes áttekintéshez keresse fel az [okosszerződések](/developers/docs/smart-contracts/) oldalt.

Az okosszerződés olyan kód, mely az Ethereum blokkláncon fut és pontosan úgy, ahogyan programozták. Amint az okosszerződések feltelepültek a hálózatra, azok többé nem módosíthatók. A dappok decentralizáltak lehetnek, mivel a szerződésbe írt logika irányítja őket, nem pedig egy egyén vagy egy vállalat. Ez azt is jelenti, hogy nagyon óvatosan kell megtervezned a szerződéseidet és alaposan le kell tesztelned őket.

## A dapp fejlesztés előnyei {#benefits-of-dapp-development}

- **Nulla állásidő** – amint az alkalmazás alapjául szolgáló okosszerződés telepítésre kerül a blokkláncon, a hálózat állandóan készen áll kiszolgálni a szerződéssel interakcióba lépő klienseket. Rosszindulatú szereplők emiatt nem tudnak szolgáltatásmegtagadási támadásokat indítani az egyes dappok ellen.
- **Adatvédelem** – nem kell igazolnod a valódi személyazonosságodat, hogy interakcióba lépj egy dappal.
- **Cenzúra rezisztancia** – nincs olyan egyedüli entitás a hálózaton, mely megakadályozhatná a felhasználókat abban, hogy tranzakciókat indítsanak, dappokat telepítsenek vagy adatot olvassanak a blokkláncról.
- **Teljes adat integritás** – a blokkláncon tárolt adatot nem megváltoztatható és nem megkérdőjelezhető a kriptográfiai primitíveknek köszönhetően. Rosszindulatú szereplők nem tudnak tranzakciókat vagy egyéb más adatot hamaisítni, amelyet publikáltak.
- **Bizalommentes számítás/hitelesíthető viselkedés** – az okosszerződéseket lehet elemezni és garantált, hogy megjósolható módon fognak végbe menni anélkül, hogy meg kellene bízni egy központi hatóságban. Ez nem igaz a hagyományos modellek esetében; ha például online bankolást használunk, meg kell bíznunk a pénzintézetekben, hogy nem fognak visszaélni a pénzügyi adatainkkal, megmásítani a feljegyzéseket vagy hacker támadást elszenvedni.

## A dapp-fejlesztés hátrányai {#drawbacks-of-dapp-development}

- **Karbantartás** – a dappokat nehezebb karbantartani, mivel a blokkláncra publikált kódot és az adatot nehezebb módosítani. A fejlesztők számára nehézkes frissíteni a dappjukat (vagy a dapp által tárolt mögöttes adatot), amint felkerültek a blokkláncra – még akkor is ha hibákat vagy biztonsági kockázatokat fedeztek fel a régi verzióban.
- **Végrehajtási költség** – magas a végrehajtási költség, a skálázás pedig nagyon nehéz. Ahhoz, hogy azt a biztonsági, integritási, átláthatósági és megbízhatósági szintet elérjük, melyre az Ethereum törekszik, minden egyes csomópont lefuttatja és eltárolja az összes tranzakciót. Ezen felül a proof-of-work konszenzus is időbe telik.
- **Hálózati torlódás** – ha egy dapp túl sok számítási kapacitást használ fel, akkor a teljes hálózat feltorlódik. Jelenleg a hálózat körülbelül 10 tranzakciót tud feldolgozni egy másodperc alatt; ha ennél gyorsabban küldenek be tranzakciókat, akkor a feldolgozatlan tranzakciók száma gyorsan felfújódhat.
- **Felhasználói élmény** – nehezebb felhasználóbarát élményeket adni, mivel az átlagos felhasználók túl nehéznek találhatják az eszközkészlet felállítását ahhoz, hogy a blokklánccal valóban biztonságos módon interakcióba léphessenek.
- **Centralizálás** – előfordulhat, hogy a felhasználó- és fejlesztőbarát megoldások, amelyek az Ethereum alaprétegére épülnek, végül centralizált szolgáltatásként fognak működni. Például az ilyen szolgáltatások kulcsokat vagy más bizalmas információkat tárolnak a szerveroldalon, centralizált szervert használnak a frontend kiszolgálására, vagy fontos üzleti logikákat futtatnak egy centralizált szerveren, mielőtt a blokkláncra írnának. Ez kizárja rengeteg (ha nem az összes) előnyét a blokkláncnak a hagyományos modellel szemben.

## Ön inkább vizuális típus? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Eszközök a dappok létrehozásához {#dapp-tools}

**Scaffold-ETH _– Próbálja ki a Solidity megoldást olyan frontenddel, amely illeszkedik az Ön okosszerződéséhez._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Példa egy dappra](https://punkwallet.io/)

**Create Eth App _– Hozzon létre Ethereum-alapú alkalmazásokat egy paranccsal._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- FOSS-eszköz dapp-frontendek készítéshez egy [ABI-ból](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _– FOSS-eszköz az Ethereum fejlesztők számára, amellyel tesztelheti csomópontjukat, illetve RPC-hívásokat állíthatnak össze és debuggolhatnak a böngészőből._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _– SDK-k minden nyelven, okosszerződések, eszközök és infrastruktúra a web3 fejlesztéshez._**

- [Honlap](https://thirdweb.com/)
- [Dokumentáció](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _– Vállalati szintű web3 fejlesztési platform okosszerződések telepítéséhez, hitelkártyás és láncok közötti fizetések lehetővé tételéhez, valamint API-ok használatára NFT-k létrehozása, terjesztése, értékesítése, tárolása és szerkesztése érdekében._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentáció](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## További olvasnivaló {#further-reading}

- [Fedezze fel a dappokat](/dapps)
- [A web 3.0 alkalmazások architektúrája](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_
- [Egy 2021-es útmutató a decentralizált alkalmazásokról](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) – _LimeChain_
- [Mik azok decentralizált alkalmazások?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) – _Gemini_
- [Népszerű dapp-ok](https://www.alchemy.com/dapps) - _Alchemy_

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_

## Kapcsolódó témák {#related-topics}

- [Bevezetés az Ethereum stack-be](/developers/docs/ethereum-stack/)
- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)
