---
title: A felhasználói élmény javítása
description: A legtöbb ember számára még mindig túl bonyolult az Ethereum használata. A tömeges használathoz az Ethereumnak drasztikusan csökkentenie kell ezt az akadályt – mindenki számára előnyösnek kell lennie a decentralizált, engedélymentes és cenzúrának ellenálló Ethereum-hozzáférésnek, ugyanakkor olyan könnyednek kell lennie, mint a hagyományos web2 alkalmazás használata.
lang: hu
image: /roadmap/roadmap-ux.png
alt: "Ethereum-ütemterv"
template: roadmap
---

Az Ethereum használatát egyszerűsíteni kell – a kulcsok és tárcák kezelésével kezdve a tranzakciók elindításáig. A tömeges használathoz az Ethereumnak könnyebbé kell tennie a használatot, hogy a felhasználók megtapasztalhassák az engedélymentes és cenzúrának ellenálló hozzáférést az Ethereumhoz, a web2 alkalmazások könnyű használatához hasonlóan.

## A kulcsmondatokon túl {#no-more-seed-phrases}

Az Ethereum-számlákat egy kulcspár védi, amelyek a számla azonosítását (nyilvános kulcs) és az üzenetek aláírását (privát kulcs) szolgálják. A privát kulcs olyan, akár egy mesterjelszó; teljes hozzáférést biztosít az Ethereum-számlához. Ez egy más megközelítés, mint amelyet a legtöbb felhasználó ismer, akik a bankokra és web2-alkalmazásokra bízzák a számlák kezelését. Az Ethereum tömeges használatának eléréséhez egyértelmű és könnyed utat kell mutatni a felhasználóknak, hogyan anélkül felügyelhessék eszközeiket és adataikat, hogy érteniük kellene a nyilvános-privát kulcsok kriptográfiájához és a kulcskezeléshez.

Erre remek megoldás, hogy okosszerződéses tárcákat használjanak az Ethereummal való interakciókhoz. Az okosszerződéses tárcák képesek megvédeni a számlát, ha a kulcsok elvesznek vagy ellopják azokat, jobban ellenállnak a csalásnak és támadásnak, és új funkciók használatát is lehetővé teszik a tárcákban. Habár okosszerződéses tárcák már most is léteznek, de nagyon nehézkes megépíteni azokat, mert az Ethereum-protokollnak jobban kellene azokat támogatni. Ezt az extra támogatást nevezzük számlaabsztrakciónak.

<ButtonLink variant="outline-color" to="/roadmap/account-abstraction/">Bővebben a számlaabsztrakcióról</ButtonLink>

## Csomópont mindenkinek

A csomópont működtetésével a felhasználónak nem kell harmadik felekre bíznia, hogy adatokkal lássák el, így gyorsan, privát módon és engedély nélkül tud az Ethereum blokklánccal interakcióba lépni. Azonban a csomópont jelenlegi működtetése technikai tudást és jelentős merevlemez-kapacitást igényel, így a legtöbb felhasználónak másokhoz kell fordulnia.

Számos fejlesztés meg fogja könnyíteni a csomópontok működtetését és csökkenti erőforrásigényüket. Az adatok tárolásához egy sokkal kevesebb tárhelyet igénylő struktúrát fognak használni, amit **Verkle fának** neveznek. Emellett a [státusztalanság](/roadmap/statelessness) és az [adatok lejárata](/roadmap/statelessness/#data-expiry) miatt a csomópontoknak nem kell majd a teljes Ethereum-státuszadatát tárolniuk, jelentősen lecsökkentve a merevlemezigényeket. A [könnyű kliensek](/developers/docs/nodes-and-clients/light-clients/) is rengeteg előnyt nyújtanak a teljes csomópontok üzemeltetéséhez, mivel ezeket mobileszközökről vagy egyszerű böngészőalkalmazásokból is futtatni lehet majd.

<ButtonLink variant="outline-color" to="/roadmap/verkle-trees/">Bővebben a Verkle-fákról</ButtonLink>

Ezekkel az fejlesztésekkel gyakorlatilag nullára csökken a csomópontfuttatás akadálya. A felhasználók biztonságos, engedélymentes hozzáférést nyernek az Ethereumhoz, anélkül hogy komoly lemezterületet vagy CPU-t áldoznának erre, és nem kell harmadik félhez fordulniuk adatért vagy a hálózat eléréséhez, amikor alkalmazásokat használnak.

## Jelenlegi helyzet {#current-progress}

Az okosszerződéses tárcák már elérhetők, de több fejlesztésre van szükség, hogy még decentralizáltabbak és engedélymentesek legyenek. Az EIP-4337 egy olyan javaslat, ami már nem igényli az Ethereum-protokoll komoly módosítását. A fő okosszerződés, ami a EIP-4337-hez kellett, 2023. márciusában jelent meg.

A teljes státusztalanság még a kutatás fázisában van és valószínűleg több év kell a bevezetéséhez. Ehhez még számos mérföldkövet el kell érni, ilyen például az adatok lejárata is, amelyek hamarabb bevezetésre kerülhetnek. A többi tervezett fejlesztésnek, mint a [Verkle-fáknak](/roadmap/verkle-trees/) és a [javaslattevő-építő szétválasztásnak](/roadmap/pbs/) előbb meg kell valósulnia.

A Verkle-fás teszthálózatok már használhatók, a következő lépés a Verkle-fákkal működő kliensek privát és nyilvános teszthálózaton való futtatása. Ön is segíthet a fejlesztés meggyorsításában, ha szerződéseket hoz létre a teszthálózaton és klienseket működtet a teszthez.
