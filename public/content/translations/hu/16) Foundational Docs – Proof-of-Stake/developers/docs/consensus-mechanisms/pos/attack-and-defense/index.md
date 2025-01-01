---
title: Az Ethereum proof-of-stake rendszerére vonatkozó támadás és védekezés
description: Ismerje meg a proof-of-stake Ethereum elleni ismert támadási vektorokat és azok elleni védelmet.
lang: hu
---

A tolvajok és szabotőrök folyamatosan keresik a lehetőséget, hogy megtámadják az Ethereum kliensszoftverét. Ez az oldal ismerteti az Ethereum konszenzusrétegét érő ismert támadási vektorokat, és felvázolja, hogyan lehet ezeket a támadásokat kivédeni.

## Előfeltételek {#prerequisites}

##  {#what-is-pos}

Gyakori tévhit, hogy egy sikeres támadó képes új ethert generálni, vagy tetszőleges számlákról ethert lehívni. Egyik sem lehetséges, mivel minden tranzakciót a hálózat összes végrehajtási kliense hajtja végre. A tranzakcióknak meg kell felelniük az érvényesség alapvető feltételeinek (például a tranzakciókat a feladó privát kulcsa írja alá, a feladónak elegendő egyenleggel kell rendelkeznie stb. Az eredménynek három osztálya van, amelyet egy támadó reálisan megcélozhat: átszervezés, dupla véglegesség vagy a véglegesség késleltetése.

##  {#validators}

Az **átszervezés** a blokkok új sorrendbe rendezése, esetleg a kanonikus láncban lévő blokkok hozzáadásával vagy kivonásával. Egy rosszindulatú átszervezés biztosíthatja, hogy bizonyos blokkok bekerüljenek vagy kikerüljenek, lehetővé téve a dupla költést vagy az értékkivonást előre és hátra futó tranzakciókkal (MEV). Az átszervezés arra is felhasználható, hogy bizonyos tranzakciókat ne lehessen felvenni a kanonikus láncba, ami a cenzúra egy formája. Az átszervezés legszélsőségesebb formája a „véglegesítés visszaállítása”, amely eltávolítja vagy helyettesíti a korábban véglegesített blokkokat. Ez csak akkor lehetséges, ha a támadó a teljes feltett ether több mint ⅓-át megsemmisíti – ez a garancia az úgynevezett „gazdasági véglegesség” (erről később még lesz szó).

**Kettős véglegesség** az a valószínűtlen, de súlyos állapot, amikor két elágazás képes egyszerre véglegesedni, ami tartós szakadást okoz a láncban. Ez elméletileg lehetséges egy olyan támadó számára, aki hajlandó a teljes feltett ether 34%-át kockáztatni. A közösség kénytelen lenne a láncon kívül koordinálni és megegyezni arról, hogy melyik láncot kövesse, amihez a társadalmi réteg erejére lenne szükség.

##  {#transaction-execution-ethereum-pos}

1.
2.
3.
4.
5.
6.

A szociális réteg elleni támadás célja lehet az Ethereumba vetett közbizalom aláásása, az ether leértékelése, az elfogadás csökkentése vagy az Ethereum-közösség gyengítése, hogy megnehezítse a sávon kívüli koordinációt.

##  {#finality}

Először is, azok a személyek, akik nem vesznek részt aktívan az Ethereumban (a kliensszoftver futtatásával), a társadalmi réteget (0. réteg) célozva támadhatnak. A 0. réteg az alap, amelyre az Ethereum épül, és mint ilyen, potenciális támadási felületet jelent, amelynek következményei a stack többi részére is kihatnak. Néhány példa:

##  {#crypto-economic-security}

Ezeket a támadásokat az teszi különösen veszélyessé, hogy sok esetben nagyon kevés tőkére vagy technikai tudásra van szükség. Egy 0. rétegbeli támadás egy kriptogazdasági támadás multiplikátora lehet. Ha például a cenzúrát vagy a véglegesség visszaállítását egy rosszindulatú többségi érdekelt fél érné el, a szociális réteg aláásása megnehezíthetné a sávon kívüli közösségi válaszlépések koordinálását.

A 0. rétegbeli támadások elleni védekezés valószínűleg nem egyszerű, de néhány alapelvet fel lehet állítani. Az egyik az Ethereummal kapcsolatos nyilvános információk magas jel-zaj arányának fenntartása, amelyeket a közösség becsületes tagjai hoznak létre és terjesztenek blogokon, Discord szervereken, kommentált specifikációkon, könyveken, podcastokon és Youtube-on keresztül. Itt az ethereum.org-on is igyekszünk pontos információkat fenntartani és a lehető legtöbb nyelvre lefordítani. A tér minőségi információkkal és mémekkel való elárasztása hatékony védekezés a félretájékoztatás ellen.

##  {#fork-choice}

Egy másik fontos megerősítés a társadalmi réteg támadásaival szemben az egyértelmű küldetésnyilatkozat és az irányítási protokoll. Az Ethereum a decentralizáció és a biztonság bajnokaként pozicionálta magát az L1-es okosszerződések között, miközben nagyra értékeli a skálázhatóságot és a fenntarthatóságot is. Bármilyen nézeteltérések merülnek fel az Ethereum közösségben, ezek az alapelvek minimálisan sérülnek. A narratíva értékelése ezen alapelvek alapján és a felülvizsgálat egymást követő fordulóin keresztül az EIP (Ethereum Fejlesztési Javaslatok) folyamatában segíthet a közösségnek megkülönböztetni a jó és a rossz szereplőket, illetve korlátozhatja a rosszindulatú szereplők lehetőségét az Ethereum jövőbeli irányának befolyásolására.

##  {#pos-and-security}

Végezetül fontos, hogy az Ethereum-közösség nyitott és befogadó maradjon minden résztvevő számára. A zártkörű közösségek különösen sebezhetők a társadalmi támadásokkal szemben, mivel könnyű „mi és ők” narratívákat építeni. A törzsiség és a mérgező maximalizmus árt a közösségnek és aláássa a 0. réteg biztonságát. A hálózat biztonságában érdekelt Ethereum-tagoknak úgy kell tekinteni az online és személyes találkozásokra, mint ami közvetlenül hozzájárul az Ethereum 0. rétegének biztonságához.

-
-
-
- Hozzáértő, de rosszindulatú szereplők beszivárgása a fejlesztői közösségbe, akiknek célja a fejlődés lelassítása a megbeszélések megzavarásával, a fontos döntések késleltetésével, szemeteléssel (spam) stb.

##  {#pros-and-cons}

|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

###  {#comparison-to-proof-of-work}

Több cikk is ismertette az Ethereum elleni olyan támadásokat, amelyek a teljes feltett ether csak kis hányadával érnek el reorgokat vagy végleges késleltetést. Ezek a támadások általában arra épülnek, hogy a támadó visszatart valamilyen információt a többi validátor elől, majd valamilyen árnyalt módon és/vagy egy alkalmas pillanatban kiadja azt.

-
-
-
-
-
-

##  {#further-reading}

-
-
-
-
-
- []()
-
- []()

##  {#related-topics}

- []()
- []()
