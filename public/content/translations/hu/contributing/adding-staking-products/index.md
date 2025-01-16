---
title: Letétbe helyezési termékek vagy szolgáltatások hozzáadása
description: Szabályzat az új letétbe helyezési termékek vagy szolgáltatások hozzáadásáról az ethereum.org webhelyhez
lang: hu
---

# Letétbe helyezési termékek vagy szolgáltatások hozzáadása {#adding-staking-products-or-services}

Biztosítani szeretnénk, hogy a lehető legjobb forrásokat soroljuk fel, és a felhasználók biztonságosan és magabiztosan használhassák azokat.

Bárki szabadon javasolhatja egy letétbe helyezési termék vagy szolgáltatás hozzáadását az ethereum.org webhelyen. Ha valamit kihagytunk, **[kérjük, javasolja](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Jelenleg a következő oldalakon listázunk letétbe helyezési termékeket vagy szolgáltatásokat:

- [Egyéni staking](/staking/solo/)
- [Staking, mint szolgáltatás](/staking/saas/)
- [Letéti alapok](/staking/pools/)

A letéti igazolásos (proof-of-stake) mechanizmus a Beacon-láncon 2020. december 1-én kezdődött el. Bár a letétbe helyezés még új, próbáltunk kialakítani egy helyes keretrendszert az ethereum.org-on való megjelenítésre, de a listázási kritérimok fejlődni fognak az idővel, és végső soron ez ethereum.org csapat megítélésétől fog függeni.

## A döntési keretrendszer {#the-decision-framework}

A termék megjelenítése az ethereum.org oldalon nem egy adott tényezőtől függ. Több kritériumot veszünk figyelembe egyszerre, hogy a döntést meghozzuk. Minél több kritériumnak felel meg valami, annál valószínűbb, hogy helye van a honlapon.

**Először is, milyen jellegű termék vagy szolgáltatás ez?**

- Csomópont vagy kliens eszközök
- Kulcskezelés
- Letétbe helyezés mint szolgáltatás (SaaS)
- Letéti alap

Jelenleg ezek a kategóriák érhetők el.

### A feltüntetés kritériumai {#criteria-for-inclusion}

A letétbe helyezési termékek vagy szolgáltatások megjelenítését a következők alapján ítéljük meg:

**Mikor került a projekt vagy szolgáltatás bevezetésre?**

- Van rá bizonyíték, hogy a termék vagy szolgáltatás mikor vált nyilvánosan elérhetővé?
- Ez meghatározza a termék harcedzettségét.

**A projektet aktívan karbantartják?**

- Van olyan csapat, mely aktívan dolgozik rajta? Ki vesz részt ebben?
- Csak az aktívan karbantartott termékeket tudjuk figyelembe venni.

**A termék vagy szolgáltatás megbízott/emberi közvetítők nélkül működik?**

- A felhasználás közben mikor van szükség emberi beavatkozásra, akár a kulcsok felügyeletét vagy a jutalmak elosztását illetően?
- Ez meghatározza a termék vagy szolgáltatás bizalomigénymentességét.

**A projekt pontos és megbízható információkat ad?**

- Alapvető fontosságú, hogy a termék honlapja naprakész, pontos és nem félrevezető információkat tartalmazzon, különösen az Ethereum-protokollra vagy kapcsolódó technológiákra vonatkozóan.
- Azokat a termékeket elvetjük vagy eltávolítjuk, melyek félrevezető, elavult információkat és állításokat tartalmaznak az Ethereumról vagy kapcsolódó témákról.

**Milyen platformokat támogat?**

- azaz Linux, macOS, Windows, iOS, Android

#### Szoftverek és okosszerződések {#software-and-smart-contracts}

Ha valamilyen egyéni szoftver vagy okosszerződés van benne:

**Minden nyílt forráskódú?**

- A nyílt forráskódú projekteknek nyilvánosan elérhető könyvtárban kell tárolniuk a forráskódot
- Ez meghatározza a termék nyílt forráskódú mivoltát.

**A termék túl van-e a _béta_ fejlesztésen?**

- Hol tart a termék fejlesztési ciklusa?
- A béta fejlesztésnél tartó termékeket nem listázzuk az ethereum.org-on

**A szoftver átment külső biztonsági auditon?**

- Ha még nem, akkor vannak erre tervek?
- Ez meghatározza a termék auditáltságát.

**Van a projektnek hibavadász programja?**

- Ha még nincs, akkor vannak erre tervek?
- Ez meghatározza a termék hibavadász pontszámát.

#### Csomópont vagy kliens eszközök {#node-or-client-tooling}

Azokkal a szoftverekkel kapcsolatban, melyek csomópont- vagy kliensfelállítással, -kezeléssel vagy -migrációval kapcsolatosak:

**Mely konszenzusréteg-kliensek (vagyis A Lighthouse, Teku, Nimbus, Prysm, Grandine) támogatott?**

- Milyen klienseket támogat? Választhat a felhasználó?
- Ez meghatározza a termék több klienssel való használhatóságát.

#### Staking, mint szolgáltatás {#staking-as-a-service}

A [letétbe helyezés mint szolgáltatás (SaaS)](/staking/saas/) (vagyis delegált csomópontkezelés) kapcsán:

**Milyen díjak kapcsolódnak a szolgáltatáshoz?**

- Mi a díjstruktúra, például havi fizetés van?
- Van bármilyen további letétbe helyezési feltétel?

**A felhasználóknak létre kell hozni egy számlát?**

- Lehet használni a szolgáltatást engedély vagy ellenőrzés (KYC) nélkül?
- Ez meghatározza a termék engedélymentességét.

**Kinél vannak az aláíró és visszavonó kulcsok?**

- Milyen kulcsokat kell a felhasználónak tartania? Milyen kulcsokhoz fér hozzá a szolgáltatás?
- Ez meghatározza a termék bizalomigénymentességét.

**Mi a csomópontok kliensdiverzitása?**

- A validátorkulcsok mekkora aránya fut többségi konszenzus réteg (CL) klienssel?
- A legutóbbi állapot szerint a Prysm az a konszenzus réteg kliens, melyet a legtöbb csomópont-operátor használ, ezért veszélyes a hálózatra nézve. Ha bármelyik konszenzusréteg klienst a hálózat több mint 33%-a használja, akkor annak használatáról adatokat kell kérjünk.
- Ez meghatározza a termék kliensdiverzitását.

#### Letéti alap {#staking-pool}

A [letétialap-szolgáltatások](/staking/pools/) kapcsán:

**Mi a minimális letétbe helyezés ETH-ben?**

- például 0,01 ETH

**Milyen díjak vagy letétbe helyezési feltételek vannak?**

- A jutalom mekkora részét tartják meg díj formájában?
- Van bármilyen további letétbe helyezési feltétel?

**Van likviditási token?**

- Milyen tokenek szerepelnek? Hogyan működnek? Mik a szerződéscímek?
- Ez meghatározza a terméklikviditási token pontszámát.

**A felhasználó részt vehet csomópont-operátorként?**

- Mi szükséges egy validátorkliens futtatásához az összegyűjtött alapok használatával?
- Szükséges ehhez engedély egy egyéntől, cégtől vagy DAO-tól?
- Ez meghatározza a termék engedélymentes csomópont jellegét.

**Mi a letéti alap csomópont-operátorainak kliensdiverzitása?**

- A csomópont-operátorok mekkora aránya fut többségi konszenzus réteg (CL) klienssel?
- A legutóbbi állapot szerint a Prysm az a konszenzus réteg kliens, melyet a legtöbb csomópont-operátor használ, ezért veszélyes a hálózatra nézve. Ha bármelyik konszenzusréteg klienst a hálózat több mint 33%-a használja, akkor annak használatáról adatokat kell kérjünk.
- Ez meghatározza a termék kliensdiverzitását.

### Más kritériumok: jó, ha van kategória {#other-criteria}

**Milyen felhasználói felületeket támogat?**

- azaz Böngészőalkalmazás, asztali alkalmazás, mobilalkalmazás, CLI

**A csomóponti eszközökhöz ad a szoftver lehetőséget arra, hogy kliensek között lehessen váltani?**

- A felhasználó könnyen és biztonsággal tud klienst váltani az eszközzel?

**Az SaaS esetében a szolgáltatás mennyi validátort üzemeltet jelenleg?**

- Ez segít megérteni a szolgáltatás kiterjedtségét.

## Hogyan jelenítjük meg az eredményeket {#product-ordering}

A fenti [felvételi kritériumok](#criteria-for-inclusion) alapján minden termékre vagy szolgáltatásra kumulatív pontszámot számítunk. Ezt az objektív kritériumoknak megfelelő termékek kiválogatására és bemutatására használjuk. Minél több kritériumra van bizonyíték, annál magasabbra soroljuk a terméket, a döntetlenek a használat alapján kerülnek sorrendbe.

A kód logikája és a kritériumok súlyozása jelenleg ebben [a JavaScript komponensben](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) található a könyvtárunkban.

## Adja hozzá a termékét vagy szolgáltatását {#add-product}

Ha egy letétbe helyezési terméket vagy szolgáltatást szeretne hozzáadni az ethereum.org webhelyhez, hozzon létre egy problémát a GitHubon.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Issue létrehozása
</ButtonLink>
