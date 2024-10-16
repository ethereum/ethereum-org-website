---
title: Okosszerződés összeilleszthetőség
description:
lang: hu
incomplete: true
---

## Egy rövid bevezető {#a-brief-introduction}

Az okosszerződések nyilvánosak az Ethereumon, így nyílt API-ként is tekinthetünk rájuk. A dapp fejlesztővé váláshoz nem kell saját okosszerződéseket írnia, csak tudnia kell, hogyan lépjen interakcióba azokkal. Például használhatja a [Uniswap](https://uniswap.exchange/swap) meglévő okosszerződéseit, egy decentralizált tőzsdét, mely kezeli a tokenváltási logikát az appban – nem kell a legelejéről kezdeni. Tekintsen meg néhány [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) és [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) szerződést.

## Mi az az összeilleszthetőség? {#what-is-composability}

Az összeilleszthetőség a különböző komponensek kombinálása új rendszerek vagy kimenetek létrehozása érdekében. A szoftverfejlesztésben az összeilleszthetőség azt jelenti, hogy a fejlesztők a meglévő szoftverkomponenseket új alkalmazások létrehozásához újra felhasználhatják. Az összeilleszthetőséget úgy is el lehet képzelni, hogy az elemei a LEGO kockákra hasonlítanak. Minden egyes LEGO kombinálható egy másikkal, így a különböző elemek kombinálásával összetett szerkezeteket építhet.

Az Ethereumban minden okosszerződés egyfajta LEGO – Ön is használhat más projektekből származó okosszerződéseket saját projektje építőköveként. Ez azt jelenti, hogy nem kell időt töltenie a kerék újbóli feltalálásával vagy a nulláról való építkezéssel.

## Hogyan működik az összeilleszthetőség? {#how-does-composability-work}

Az Ethereum-okosszerződések olyanok, mint a nyilvános API-ok, így bárki kölcsönhatásba léphet a szerződéssel, vagy integrálhatja azokat dappokba a hozzáadott funkciók érdekében. Az okosszerződések összeilleszthetősége három alapelv szerint működik – ez a modularitás, az autonómia és a felfedezhetőség:

**1. Modularitás**: Az egyes komponensek képessége egy adott feladat elvégzésére. Az Ethereumban minden okosszerződésnek van egy konkrét felhasználási esete (ahogy az Uniswap példában is látható).

**2. Autonómia**: Az összeilleszthető komponenseknek képesnek kell lenniük az önálló működésre. Az Ethereumban minden okosszerződés önvégrehajtó, és a rendszer más részei nélkül képes működni.

**3. Felfedezhetőség**: A fejlesztők nem tudnak külső szerződéseket hívni vagy szoftverkönyvtárakat integrálni az alkalmazásokba, ha az előbbiek nem nyilvánosak. Az okosszerződések eleve nyílt forráskódúak; bárki meghívhat egy okosszerződést vagy elágaztathat egy kódot.

## Az összeilleszthetőség előnyei {#benefits-of-composability}

### Rövidebb fejlesztési ciklus {#shorter-development-cycle}

Az összeilleszthetőség leveszi a munkaterhelést a fejlesztők válláról a [dappok](/dapps/#what-are-dapps) létrehozásakor. [Ahogy Naval Ravikant fogalmaz:](https://twitter.com/naval/status/1444366754650656770) „A nyílt forráskód azt jelenti, hogy egy adott problémát csak egyszer kell megoldani.”

Ha van egy okosszerződés, amely megold egy problémát, más fejlesztők újra felhasználhatják, így nem kell ugyanazt a problémát megoldaniuk. Ezáltal a fejlesztők a meglévő szoftverkönyvtárakat felhasználhatják, és extra funkciókat adhatnak hozzá, hogy új dappokat hozzanak létre.

### Nagyobb innováció {#greater-innovation}

Az összeilleszthetőség ösztönzi az innovációt és a kísérletezést, mivel a fejlesztők szabadon újrafelhasználhatják, módosíthatják, duplikálhatják vagy integrálhatják a nyílt forráskódot a kívánt eredmények érdekében. Ennek eredményeképpen a fejlesztőcsapatok kevesebb időt töltenek az alapvető funkciókkal, és több időt fordíthatnak az új funkciókkal való kísérletezésre.

### Jobb felhasználói élmény {#better-user-experience}

Az Ethereum-ökoszisztéma összetevői közötti átjárhatóság javítja a felhasználói élményt. A felhasználók nagyobb funkcionalitáshoz férhetnek hozzá, ha a dappok külső okosszerződéseket integrálnak, mint egy széttagolt ökoszisztémában, ahol az alkalmazások nem tudnak kommunikálni.

Az interoperabilitás előnyeit az arbitrázskereskedelemből vett példával szemléltetjük:

Ha egy token magasabb árfolyamon kereskedik az `A tőzsdén`, mint a `B tőzsdén`, akkor kihasználhatja az árkülönbséget, hogy profitot termeljen. Ezt azonban csak akkor teheti meg, ha elegendő tőkével rendelkezik a tranzakció finanszírozásához (azaz megvásárolja a tokent a `B tőzsdén`, és eladja az `A tőzsdén`).

Abban az esetben, amikor nincs elég pénze a kereskedés fedezésére, ideális lehet egy gyorskölcsön. A [gyorskölcsönök](/defi/#flash-loans) nagyon technikai jellegűek, de az alapötlet az, hogy Ön (fedezet nélkül) kölcsönvehet eszközöket, és ugyanezt _egy_ tranzakción belül visszaadhatja.

Visszatérve a kezdeti példánkhoz, egy arbitrázskereskedő felvehet egy nagy összegű gyorskölcsönt, vásárolhat tokeneket a `B tőzsdén`, eladhatja azokat az `A tőzsdén`, visszafizetheti a tőkét és a kamatot, és megtarthatja a nyereséget ugyanazon tranzakción belül. Ez az összetett logika több szerződés meghívásának kombinálását igényli, ami nem lenne lehetséges, ha az okosszerződések nem lennének interoperábilisak.

## Az összeilleszthetőség példái az Ethereumon {#composability-in-ethereum}

### Tokenátváltások {#token-swaps}

Ha olyan dappot hoz létre, amelyben a tranzakciókat ETH-ben kell kifizetni, a tokenátváltás-logika integrálásával lehetővé teheti a felhasználók számára, hogy más ERC-20 tokenekkel fizessenek. A kód automatikusan átváltja a felhasználó tokenjét ETH-re, mielőtt a szerződés végrehajtja a meghívott funkciót.

### Irányítás {#governance}

Az egyedi irányítási rendszerek kiépítése a [DAO-k](/dao/) számára költséges és időigényes lehet. Ehelyett használhat egy nyílt forráskódú irányítási eszközkészletet, például az [Aragon Client](https://client.aragon.org/) megoldást, hogy gyorsan megalkossa a DAO irányítási keretrendszerét.

### Identitáskezelés {#identity-management}

Ahelyett, hogy egyéni hitelesítési rendszert építene vagy központi szolgáltatókra támaszkodna, decentralizált identitás (DID) eszközöket integrálhat a felhasználók hitelesítésének kezelésére. Ilyen például a [SpruceID](https://www.spruceid.com/), egy nyílt forráskódú eszközkészlet, amely „Bejelentkezés az Ethereummal” funkciót kínál, ez pedig lehetővé teszi a felhasználók számára, hogy Ethereum-tárcával hitelesítsék az identitásukat.

## Kapcsolódó útmutatók {#related-tutorials}

- [Indítsa el a dapp frontend fejlesztését a create-eth-app segítségével](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Egy áttekintés arról, hogyan használja a create-eth-appot a népszerű okosszerződésekkel rendelkező alkalmazások készítéséhez._

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, mely segített neked? Módosítsd az oldalt és add hozzá!_

- [Az összeilleszthetőség az innováció](https://future.a16z.com/how-composability-unlocks-crypto-and-everything-else/)
- [Miért fontos az összeilleszthetőség a web3-nak](https://hackernoon.com/why-composability-matters-for-web3)
- [Mi az az összeilleszthetőség?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
