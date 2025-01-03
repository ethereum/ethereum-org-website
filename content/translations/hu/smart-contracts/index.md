---
title: Okosszerződések
description: Egy nem technikai bevezetés az okosszerződésekbe
lang: hu
---

# Bevezetés az okosszerződésekbe {#introduction-to-smart-contracts}

Az okosszerződések az Ethereum alkalmazási rétegének alapvető építőkockái. Ezek olyan számítógépes programok, melyek a [blokkláncon](/glossary/#blockchain) találhatók, feltételeket követve működnek (ha ez van, akkor ezt csinálom), és garantáltan a programkódja által definiált szabályok alapján végez műveleteket. E szabályokat nem lehet megváltoztatni, miután a szerződés életbe lépett.

Az okosszerződés kifejezést Nick Szabo alkotta meg. 1994-ben írt egy cikket a [a koncepció lényegéről](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), majd 1996-ban tovább taglalta, hogy [mire képes az okosszerződés](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo egy olyan digitális piacteret képzelt el, ahol automatikus, [kriptográfiailag biztosított](/glossary/#cryptography) folyamatok lehetővé teszik tranzakciók és üzleti funkciók működését megbízott közvetítők nélkül. Az okosszerződések ezt a víziót valósítják meg az Ethereumon.

Nézze meg a videót, melyben a Finematics elmagyarázza az okosszerződések lényegét:

<YouTube id="pWGLtjG-F5c" />

## Bizalom a hagyományos szerződésekben {#trust-and-contracts}

A hagyományos szerződéssel az a legnagyobb gond, hogy meg kell bízni a résztvevőkben, hogy végrehajtják a szerződés tartalmát.

Következzen egy példa:

Alice és Bob kerékpáron versenyeznek. Tegyük fel, Alice arra fogad Bobbal 10 $-ban, hogy ő maga fog nyerni. Bob magabiztos a saját nyerését illetően, ezért belemegy a fogadásba. Végül Alice sokkal hamarabb ér célba Bobhoz képest, egyértelműen ő a győztes. Bob azonban nem fizeti ki a fogadás összegét, mert szerinte Alice csalt.

Ez az egyszerű példa a „nem okos” megegyezések problémáját illusztrálja. Még a megegyezés feltételei teljesülnek is (tehát Ön a verseny győztese), még mindig meg kell bíznia egy másik személyben, hogy teljesítse a megállapodást (azaz kifizesse a fogadás összegét).

## Egy digitális ételautomata {#vending-machine}

Az okosszerződésre egy egyszerű metafora lehet az ételautomata működése, melynél bizonyos beviteli értékek előre meghatározott eredménnyel járnak.

- Ön kiválaszt egy terméket
- Az ételautomata kiírja az árat
- Ön kifizeti az árát
- Az ételautomata ellenőrzi, hogy a megfelelő összeget kapta meg
- Majd az automata kiadja a kért árut

Az ételautomata csak az Ön által kért terméket adja oda, miután a feltételek teljesültek. Ha Ön nem választ ki terméket vagy nem dob be elég pénzt, akkor az automata nem adja ki a terméket.

## Automatikus végrehajtás {#automation}

Az okosszerződés legfontosabb előnye, hogy bizonyos feltételek fennállásakor egyértelműen végrehajt egy meghatározott programkódot. Nem kell várni az emberi beavatkozásra, hogy értelmezze vagy kitalálja az eredményt. Így nincs szükség megbízott közvetítőkre.

Például írhat egy olyan okosszerződést, mely letétben tart pénzeszközt egy gyermek számára, melyet egy bizonyos dátum után kaphat meg. Ha hamarabb akarná megkapni, akkor az okosszerződés nem hajtaná azt végre. Vagy olyan okosszerződést is írhat, mely automatikusan biztosítja egy autó forgalmi engedélyének digitális verzióját, amint Ön kifizeti azt a kereskedőnek.

## Előre meghatározott kimenetel {#predictability}

A hagyományos szerződések nem egyértelműek, mert emberek értelmezik és hajtják végre azokat. Például két bíró teljesen másképpen is értelmezhet egy szerződést, mely eltérő döntésekhez és egyenlőtlen kimenetelhez vezethet. Az okosszerződések kizárják ezt a lehetőséget. Ehelyett az okosszerződések a szerződés kódjában megadott feltétek mentén pontosan végrehajtásra kerülnek. A pontosság azt is jelenti, hogy ugyanolyan körülmények között az adott okosszerződés ugyanazt az eredményt adja.

## Nyilvános dokumentálás {#public-record}

Az okosszerződéseket könnyedén lehet auditálni és követni. Mivel az Ethereum okosszerződései egy nyilvános blokkláncon találhatók, ezért bárki azonnal megnézheti az eszközök mozgását és a kapcsolódó információkat. Például Ön megnézheti, hogy valaki pénzt utalt az Ön címére.

## Adatvédelem {#privacy-protection}

Az okosszerződések védik az Ön adatait. Mivel az Ethereum egy olyan hálózat, ahol a tranzakciók nem közvetlen módon köthetők az identitáshoz (nyilvánosan egy egyedi kriptográfiai címhez tartoznak), így Ön is megőrizheti valódi kilétét mások előtt.

## Látható feltételek {#visible-terms}

Végül a hagyományos szerződéshez hasonlóan Ön ellenőrizheti az okosszerződés tartalmát, mielőtt aláírná azt (vagy valamilyen interakcióba lépne azzal). Az okosszerződés transzparens volta biztosítja, hogy bárki megvizsgálhatja annak részleteit.

## Az okosszerződés alkalmazási területei {#use-cases}

Az okosszerződések lényegében mindent végre tudnak hajtani, amit egy számítógépes program tud.

Többek között képesek számításokat végezni, valutát létrehozni, adatot tárolni, [NFT-ket](/glossary/#nft) kreálni (minting), üzeneteket küldeni és még ábrát vagy grafikont is tudnak készíteni. Következzen néhány népszerű példa a való életből:

- [Stablecoin-ok](/stablecoins/)
- [Egyedi digitális eszközök létrehozása és szétosztása](/nft/)
- [Automatikus, nyílt valutaátváltás](/get-eth/#dex)
- [Decentralizált játékok](/dapps/?category=gaming#explore)
- [Biztosítási szerződés, mely automatikus kifizetést alkalmaz](https://etherisc.com/)
- [Szabvány, melyet alapul véve az emberek egyéni, interoperábilis valutákat hoznak létre](/developers/docs/standards/tokens/)

## További olvasnivaló {#further-reading}

- [Hogyan fogják az okosszerződések megváltoztatni a világot](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Okosszerződések: a blokklánc-technológia, mely leváltja az ügyvédeket](https://blockgeeks.com/guides/smart-contracts/)
- [Okosszerződések fejlesztőknek](/developers/docs/smart-contracts/)
- [Tanulja meg, hogyan kell okosszerződéseket írni](/developers/learning-tools/)
- [Ismerje meg Ethereumot – Mi az az okosszerződés?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
