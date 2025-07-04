---
title: Második blokkláncréteg (L2) hozzáadása
description: Szabályzat ahhoz, hogy második blokkláncréteget (L2) adjunk az ethereum.org webhelyhez
lang: hu
---

# Második blokkláncréteg (L2) hozzáadása {#adding-layer-2}

Biztosítani szeretnénk, hogy a lehető legjobb erőforrásokat soroljuk fel, hogy a felhasználók biztonságosan és magabiztosan navigálhassanak az L2-k világában.

Bárki szabadon javasolhatja egy L2 hozzáadását az ethereum.org webhelyen. Ha van olyan L2, amelyet kihagytunk, **[kérjük, javasolja](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml)!**

Jelenleg ezeket az L2-ket soroljuk fel:

- [Optimista összegzők](/developers/docs/scaling/optimistic-rollups/)
- [Zero-knowledge összegzők](/developers/docs/scaling/zk-rollups/)
- [2. réteg](/layer-2/)

Az L2 egy viszonylag új és érdekes paradigma az Ethereumban. Az ethereum.org kapcsán próbáltunk kialakítani egy helyes keretrendszert, de a listázási kritériumok fejlődni fognak idővel.

## A döntési keretrendszer {#decision-framework}

### A feltüntetés kritériumai: kötelezők {#criteria-for-inclusion-the-must-haves}

**Az L2BEAT oldalán listázott**

- Ahhoz, hogy figyelembe tudjuk venni az adott projektet, annak listázva kell lennie az [L2BEAT](https://l2beat.com) oldalán. Az L2BEAT egy robosztus kockázati elemzést végez az L2-es projektekre, amelyre mi is támaszkodunk az adott L2 megítélésekor. **Ha a projekt nem szerepel az L2BEAT oldalán, akkor nem listázhatjuk az ethereum.org-on.**
- [Tudjon meg többet arról, hogy a projekt hogyan kerülhet fel az L2BEAT oldalra](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md).

**Nyílt forráskódú**

- A kódnak elérhetőnek kell lennie, s a széles közönségtől fogadhat be PR-okat.

**L2 kategóriák**

Jelenleg a következő L2 kategóriákat használjuk:

- Optimista típusú összevont tranzakciók
- Nulla tudás alapú (ZK) összevont tranzakció

_Más skálázási megoldásokat nem tekintünk L2-nek, melyek nem használják az Ethereumot adatelérhetőségi és biztonsági szempontból._

**Ethereum használata adatelérhetőségre**

- Az adatelérhetőség fontos megkülönböztető faktor az L2-k és más skálázási megoldások között. A projektnek az Ethereum-főhálózatot **kell** használnia az adatelérhetőségre, hogy listázni lehessen.

**Hidak**

- Hogyan tudnak a felhasználók belépni az L2-be?

**A projekt létrejöttének időpontja**

- Az L2-nek élőnek kell lennie a főhálózaton legalább 6 hónapja

- Ennél újabb projekteket, melyek még nincsenek igazán kitesztelve a felhasználók által, nem valószínű, hogy listázunk.

**Külső biztonsági audit**

- A termék biztonságát megbízható módon le kell tesztelni, akár audit, akár belső biztonsági csapat vagy más módszer révén. Ez csökkenti a felhasználók kockázatát, és megmutatja, hogy a projekt komolyan veszi a biztonságot.

**Stabil felhasználói bázis**

- Figyelembe vesszük a TVL-előzményeket, a tranzakciós statisztikákat, és azt, hogy használják-e ismert cégek vagy projektek

**Aktív fejlesztői csapat**

- Nem vesszük be a listába az olyan L2-t, melynek nincs aktív csapata, mely a projekten dolgozik.

**Blokkfelfedező**

- A listázott projektekhez működőképes blokkfelfedező szükséges, hogy a felhasználók könnyedén navigálhassanak a láncon.

### Más kritériumok: jó, ha van kategória {#nice-to-haves}

**Tőzsdei támogatás a projektre**

- Tudnak a felhasználók letétet tenni vagy kivenni közvetlenül egy tőzsdéről?

**Dapp-hivatkozások az L2 ökoszisztémában**

- Szeretnénk információt adni a felhasználóknak, hogy ezen az L2-n mit tudnak csinálni. (pl. https://portal.arbitrum.io/, https://www.optimism.io/apps)

**Tokenszerződések listái**

- Mivel az eszközöknek új címük lesz az L2-n, ezért kérjük, hogy osszák meg a tokenlistát, ha elérhető.

**Natív tárcatámogatás**

- Van bármilyen beépített tárcatámogatás?

## Adjon hozzá L2-t {#add-exchange}

Ha egy L2-t szeretne hozzáadni az ethereum.org webhelyhez, hozzon létre egy problémát a GitHubon.

<ButtonLink to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml">
  Issue létrehozása
</ButtonLink>
