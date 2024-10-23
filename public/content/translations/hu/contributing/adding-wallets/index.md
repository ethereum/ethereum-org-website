---
title: Tárcák hozzáadása
description: Szabályzat a tárcák hozzáadásáról az ethereum.org webhelyhez
lang: hu
---

# Tárcák hozzáadása {#adding-wallets}

Biztosítani szeretnénk, hogy sokféle tárcát megmutatunk, lefedve azok funkciógazdagságát, hogy a felhasználók magabiztosan navigálhassanak az Ethereumban.

Bárki szabadon javasolhatja egy tárca hozzáadását az ethereum.org webhelyen. Ha van olyan tárca, amelyet kihagytunk, kérjük, javasolja!

A tárcák jelenleg a következő helyen vannak listázva:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

A tárcák gyorsan változnak az Ethereumban. Az ethereum.org kapcsán próbáltunk kialakítani egy helyes keretrendszert, de a listázási kritériumok fejlődni fognak idővel.

## A döntési keretrendszer {#the-decision-framework}

### A feltüntetés kritériumai: kötelezők {#the-must-haves}

- **Bizonsági szempontból tesztelt termék** – a tárca biztonságát megbízható módon le kell tesztelni, akár audit, belső biztonsági csapat vagy más módszer révén. Ez csökkenti a felhasználók kockázatát, és megmutatja, hogy a projekt komolyan veszi a biztonságot.
- **A tárca legalább 6 hónapja élesben működik VAGY olyan csoport adta ki, melynek megbízható reputációja van** – ez is megmutatja a termék biztonságát. Hat hónap alatt a kritikus hibák és sebezhetőségek általában kiderülnek. Azért is kérünk hat hónapot, mert így ki lehet szűrni azokat az elágazásokat, melyeket gyorsan magukra hagynak.
- **Egy aktív csapat dolgozik rajta** – ez biztosítja a minőséget és a felhasználók támogatását is.
- **Őszinte és pontos listázási információk** - a projekt által javasolt termék őszinte és pontos információkkal érkezik. Azokat a termékeket eltávolítjuk, melyek hamis információkat adnak meg a listázáshoz, például a nyílt forráskódú megjelölés, amikor a kód nem érhető el.
- **Kapcsolattartási pont** - Egy kapcsolattartási pont a tárca kapcsán nagyban segíti a pontos információk beszerzését változások esetén. Ezzel az ethereum.org frissítése könnyebb, amikor a jövőben információt kell szerezni.
- **EIP-1559 (2-es típusú) tranzakciók** - a tárcának támogatnia kell az EIP-1559 (2-es típusú) tranzakciókat az Ethereum főhálózatán.
- **Jó felhasználói élmény** - Bár a felhasználói élmény szubjektív, de ha a központi csapat tagjai tesztelik a terméket, és nehezen használhatónak találják, akkor elutasíthatjuk azt, és inkább javaslatokat teszünk a javításra. Ezzel szeretnénk védeni a felhasználókat, akik sokszor kezdők ezen a területen.

### Termékeltávolítások {#product-removals}

- **Frissített információk** - A tárcaszolgáltatók felelősek azért, hogy 6 havonta újra benyújtsák a tárcára vonatkozó információkat, hogy biztosítsák azok érvényességét és relevanciáját (akkor is, ha nem történt változás). Ha ezt nem teszi meg a termék csapata, akkor az ethereum.org eltávolíthatja azt a honlapról.

### Más kritériumok: jó, ha van kategória {#the-nice-to-haves}

- **Világszerte elérhető** - a tárcának ne legyen földrajzi korlátozása vagy olyan ismerd meg ügyfeled (KYC) követelménye, amely kizár bizonyos embereket a szolgáltatásból.
- **Több nyelven elérhető** - a tárca le van fordítva több nyelvre, így a világ minden tájáról származó felhasználók számára elérhető.
- **Nyílt forráskódú** –a teljes kódbázisnak (nem csak moduloknak) elérhetőnek kell lennie, és a széles közönségtől fogadhat be PR-okat.
- **Saját felügyeletű** – a felhasználók kezelik a saját pénzeszközeiket. Ha a termék eltűnik, a felhasználók akkor is elérik és használhatják az eszközeiket.
- **Hardveres tárca támogatása** - a felhasználók hozzákapcsolhatják a hardveres tárcájukat, hogy tranzakciókat írjanak alá.
- **WalletConnect** - a felhasználók kapcsolódhatnak olyan dappokhoz, melyek WalletConnect-et használnak.
- **Ethereum RPC végpontok importálása** - a felhasználók importálhatják a csomópontok RPC-adatait, így csatlakozhatnak egy kiválasztott csomóponthoz vagy más EVM-kompatibilis hálózatokhoz.
- **NFT-k** - a felhasználók láthatják és használhatják az NFT-iket a tárcában.
- **Kapcsolódás az Ethereum alkalmazásaihoz** - a felhasználók képesek kapcsolódni az Ethereum alkalmazásaihoz és használni azokat.
- **Letétbe helyezés** - a felhasználók képeseket letétbe helyezni pénzeszközeiket közvetlenül a tárcából.
- **Átváltások** - a felhasználók képesek tokeneket átváltani a tárcán keresztül.
- **Több blokklánchálózat** - a tárca támogatja több blokklánchálózat elérését.
- **L2 hálózatok** - a tárca támogatja, hogy a felhasználók L2 hálózatokat érjenek el.
- **Gázdíjak személyre szabása** - a tárca lehetővé teszi a felhasználóknak, hogy személyre szabják a tranzakciós díjaikat (alapdíj, prioritási díj, maximális díj).
- **ENS támogatása** - a tárca lehetővé teszi, hogy a felhasználó ENS nevekre küldjön tranzakciókat.
- **ERC-20 támogatása** - a tárca lehetővé teszi, hogy ERC-20 tokenszerződéseket importáljon a felhasználó, vagy automatikusan lekérdezi és megmutatja az ERC-20-tokeneket.
- **Kriptovásárlás** - a tárca támogatja, hogy a felhasználó közvetlenül vásárolhasson kriptót vagy kapcsolódjon azzal.
- **Fiatért eladás** - a tárca támogatja, hogy a felhasználók közvetlenül kártyára vagy bankszámlára adjanak el és vegyenek ki fiatot.
- **Több aláírás** - támogatja több aláíró meglétét a tranzakciók kezelésénél.
- **Hagyományos visszaállítás** - támogatja az őrzők meglétét, így a felhasználó akkor is vissza tudja állítani a tárcát, ha nincs meg a kulcsmondata.
- **Dedikált támogatócsapat** - a tárcának dedikált támogatócsapata van, amely segít a felhasználók problémáit megoldani.
- **Oktatási források/dokumentáció** - a terméknek jól kidolgozott bevezető élménnyel kell rendelkeznie, hogy segítse és oktassa a felhasználókat. Vagy legyenek elérhető cikkek vagy videók arról, hogyan kell azt használni.

## Tárca hozzáadása {#adding-a-wallet}

Ha egy tárcát szeretne hozzáadni az ethereum.org webhelyhez, hozzon létre egy problémát a GitHubon.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Issue létrehozása
</ButtonLink>

## Karbantartás {#maintenance}

Mivel az Ethereum természete gyorsan alakul, a csapatok és a termékek jönnek-mennek, és naponta történnek innovációk, ezért rutinszerűen ellenőrizzük a tartalmakat:

- biztosítjuk, hogy az összes felsorolt tárca és dapp továbbra is teljesíti a kritériumainkat
- ellenőrizzük, hogy nincsenek-e olyan termékek, amelyek a jelenlegiekhez képest jobban megfelelnek a kritériumoknak

az ethereum.org-ot a nyílt forráskódú közösség tartja fenn, és így a közösségre támaszkodik ahhoz, hogy aktuális információkat mutasson. Ha a listázott tárcáknál frissítésre van szükség, akkor [nyisson egy hibajegyet](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) vagy [PR-t](https://github.com/ethereum/ethereum-org-website/pulls)!


## Felhasználási feltételek {#terms-of-use}

Tekintse meg [használati feltételeinket](/terms-of-use/). Az ethereum.org-on található információk általános tájékoztatásul szolgálnak.
