---
title: Az Ethereum irányítása
description: Annak bemutatása, hogy az Ethereummal kapcsolatos döntések hogyan születnek meg.
lang: hu
---

# Bevezetés az Ethereum irányításába {#introduction}

_Ha senki sem birtokolja az Ethereumot, akkor a döntéseket hogyan hozzák meg az Ethereum kapcsán? Az Ethereum irányítása (governance) egy olyan folyamat, mely lehetővé teszi a döntések meghozatalát._

<Divider />

## Mi az az irányítás (governance)? {#what-is-governance}

Az irányítás az a rendszer, amely lehetővé teszi a döntéshozást. Egy tipikus szervezeti struktúrában a végrehajtó csapat vagy az igazgatótanács szava az utolsó a döntéshozásban. Vagy talán a részvényesek szavaznak a javaslatokra, hogy változást indítsanak el. A politikai rendszerben a választott hivatalnokok olyan törvényt hoznak, ami a választóik javát szolgálja.

## Decentralizált irányítás {#decentralized-governance}

Az Ethereum protokollt nem birtokolja vagy kontrollálja senki, ugyanakkor a változásokról dönteni kell, hogy a hálózat hosszú életét és prosperitását a leginkább biztosítsák. A tulajdonlás hiánya miatt a hagyományos szervezeti irányítás nem működő megoldás.

## Ethereum-felügyelet {#ethereum-governance}

Az Ethereum irányítása (governance) az a folyamat, amely által a protokoll megváltoztatható. Fontos kiemelni, hogy ez nem kapcsolódik ahhoz, hogy az emberek és az alkalmazások hogyan használják a protokollt, mert az Ethereum egy engedélymentes hálózat. A világon bárki bárhonnan részt vehet a láncon zajló tevékenységekben. Nincsenek olyan szabályok, hogy ki csinálhat vagy nem csinálhat alkalmazást vagy indíthat tranzakciókat. Ugyanakkor van egy folyamat, mellyel változásokat lehet kezdeményezni a protokollban, amelyre a decentralizált alkalmazások épülnek. Mivel sok ember függ az Ethereum stabilitásától, ezért a kulcsváltozások koordinációs küszöbe nagyon magas, beleértve a közösségi és technikai folyamatokét is, hogy az Ethereum módosítása biztonságos és a közösség által széles körben támogatott legyen.

### A láncon belüli és kívüli irányítás összehasonlítása {#on-chain-vs-off-chain}

A blokklánc-technológiával új irányítási képességek jelentek meg, mint amilyen a láncon belüli irányítás is. A láncon belüli irányítás az, amikor a javasolt protokollváltoztatásokat az érdekeltek megszavazzák, általában egy irányítási token birtokában, a szavazás pedig a láncon zajlik. A láncon belüli irányítás néhány esetében a javasolt változások már bele vannak írva a kódba és automatikusan végrehajtásra kerülnek, ha az érdekeltek jóváhagyják azt, aláírva a tranzakciót.

A másik megközelítés, a láncon kívüli irányítás az, amikor a protokoll változtatásait egy közösségi megvitatás informális folyamata vezérli, amit ha jóváhagynak, akkor teszik bele a kódba.

**Az Ethereum-irányítás láncon kívül történik** az érdekeltek széles körét bevonva.

_Miközben a protokollszintű Ethereum-irányítás láncon kívül zajlik, addig számos alkalmazási területe van a láncon belüli irányításnak, mint például a decentralizált autonóm szervezetek (DAO) működése._

<ButtonLink href="/dao/">
  Bővebben a DAO-król
</ButtonLink>

<Divider />

## Ki vesz részt ebben? {#who-is-involved}

Az [Ethereum-közösségben](/community/) számos érdekelt fél van, akik szerepet játszanak az irányítási folyamatban. A protokolltól távolabb lévőktől kezdve így néz ki az érdekeltek köre:

- **Ether-használók**: olyan emberek, akik egy tetszőleges összegű ETH-t birtokolnak. [Bővebben az ETH-ről](/eth/).
- **Az alkalmazások felhasználói**: akik az Ethereum blokkláncán lévő alkalmazásokat használják.
- **Alkalmazások/eszközök fejlesztői**: akik alkalmazásokat írnak az Ethereum blokkláncra (pl. DeFi, NFT-k stb.), vagy eszközöket építenek, amelyek az Ethereummal lépnek interakcióba (pl. tárcák, tesztcsomagok stb.). [Bővebben a dapp-okról](/dapps/).
- **Csomópont-operátorok**: akik csomópontokat működtetnek, amelyek blokkokat és tranzakciókat javasolnak, illetve elutasítják az érvénytelen tranzakciókat vagy blokkokat. [Bővebben a csomópontokról](/developers/docs/nodes-and-clients/).
- **EIP-szerzők**: ők javasolnak változásokat az Ethereum-protokollt illetően Ethereum fejlesztési javaslatok (EIP) formájában. [Bővebben az EIP-ekről](/eips/).
- **Validátorok**: ők olyan csomópontokat futtatnak, melyek új blokkokat tudnak adni az Ethereum-blokklánchoz.
- **Protokollfejlesztők** (azaz „Magfejlesztők” ): ők kezelik a különféle Ethereum-implementációkat (pl. go-ethereum, Nethermind, Besu, Erigon, Reth a végrehajtási rétegen; Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine a konszenzusrétegen). [Bővebben az Ethereum-kliensekről](/developers/docs/nodes-and-clients/).

_Megjegyzés: bárki lehet több csoport tagja is (pl. a protokollfejlesztő lehet EIP-bajnok is, futtathat Beaconlánc-validátort és használhat DeFi-alkalmazásokat). A koncepcionális egyértelműség miatt könnyebb, ha megkülönböztetjük őket._

<Divider />

## Mi az az Ethereum fejlesztési javaslat (EIP)? {#what-is-an-eip}

Az egyik fontos Ethereum-irányítási eszköz az **Ethereum fejlesztési javaslatok (EIP)** kezelése. Az EIP olyan szabvány, amely egy lehetséges új funkciót vagy folyamatot specifikál az Ethereum számára. Az Ethereum-közösség bármelyik tagja létrehozhat EIP-t. Ha Önt érdekli az EIP írása, értékelése vagy irányítása, akkor:

<ButtonLink href="/eips/">
  Bővebben az EIP-kről
</ButtonLink>

<Divider />

## A hivatalos folyamat {#formal-process}

Az Ethereum-protokollt érintő változásokat a következő módon lehet kezdeményezni:

1. **Javasoljon egy alapvető (core) EIP-et**: ahogy az [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips) részletezi, az első lépés egy Ethereum változtatáshoz az, hogy egy alapvető EIP-ben kidolgozzák azt. Ez lesz a hivatalos specifikációja egy EIP-nek, amit a protokollfejlesztők implementálnak, ha elfogadásra kerül.

2. **Mutassa be az EIP-et a protokollfejlesztőknek**: amint egy alapvető EIP-vel rendelkezik, amelyhez közösségi adatokat is gyűjtött, mutassa be azt a fejlesztőknek. Ehhez javasolja, hogy vitassák azt meg egy [AllCoreDevs konferenciabeszélgetésen](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Valószínűleg valamilyen beszélgetés már történt róla az [Ethereum Magician fórumon](https://ethereum-magicians.org/) vagy az [Ethereum R&D Discord csatornán](https://discord.gg/mncqtgVSVw).

> E fázis lehetséges kimenetelei:

> - Az EIP megfontolásra kerül egy következő hálózati fejlesztésnél
> - Technikai változásokat kérhetnek
> - Elutasításra kerülhet, ha nem prioritás vagy a fejlődés nem elég nagy a fejlesztési erőfeszítéshez képest

3. **A javaslat iteratív további fejlesztése a végső verzió felé:** a releváns érdekeltektől jövő visszajelzések alapján valószínűleg változásokat kell eszközölni a kezdeti javaslaton, hogy biztonságosabb legyen vagy a felhasználók igényeit jobban kielégítse. Amint ezek a változások megvalósultak, újra be kell mutatni azt a protokollfejlesztőknek. Ekkor vagy tovább lehet lépni, vagy új kérdések merülnek fel, így tovább kell dolgozni a javaslaton.

4. **Az EIP bekerül a hálózati frissítésbe**: feltéve, hogy a javaslat addigra átesik a jóváhagyáson, tesztelésen és bevezetésen, bele fog kerülni a következő rendszerfrissítésbe. Mivel ezeknek elég komoly a koordinációs költsége (mindenkinek egyszerre kell frissíteni), ezért az EIP-k csomagba kerülnek.

5. **A hálózati frissítés aktiválása**: az aktiválás után az EIP élesedik az Ethereum hálózaton. _Megjegyzés: a hálózati frissítéseket általában a teszthálózaton aktiválják, mielőtt az Ethereum-főhálózatra kerülnének._

Ez az egyszerűsített folyamat betekintést ad a protokollváltoztatások főbb állomásaiba. Most nézzük meg az informális tényezőket, melyek mindezt befolyásolják.

## Az informális folyamat {#informal-process}

### A korábbi munkák megértése {#prior-work}

Az EIP-bajnokoknak ismerni kell a korábbi munkákat és javaslatokat, mielőtt egy újat készítenek, hogy azt komolyan megfontolják egy Ethereum-fejlesztéseként. Így az EIP javaslat újdonságot hozhat, nem pedig egy korábban már elutasított dolgot. Három fő helyen kell átnézni az anyagokat: [EIP-könyvtár](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) és [ethresear.ch](https://ethresear.ch/).

### Munkacsoportok {#working-groups}

Az EIP kezdeti javaslata változtatások nélkül nem valószínű, hogy végigmegy a bevezetésig. Általában az EIP-bajnokok a protokollfejlesztők egy kis csoportjával dolgoznak együtt, hogy specifikálják, létrehozzák, teszteljék és véglegesítsék a javaslatot. Korábban ezek a munkacsoportok számos hónapot (néha éveket) dolgoztak a javaslatokon. Az EIP-bajnokok emellett be kell vonják a releváns alkalmazás- vagy eszközfejlesztőket, hogy a felhasználóktól is tudjanak visszajelzést kapni, illetve csökkentsék a megvalósítás kockázatát.

### Közösségi konszenzus {#community-consensus}

Miközben néhány EIP egyértelmű technikai fejlesztés, addig mások komplexek és olyan kompromisszumokat kívánnak meg, melyek a különféle érdekeltek másképpen érintik. Tehát néhány javaslat több vitát vált ki.

Nincs egyértelmű kézikönyv, hogy a vitás javaslatokat hogyan kezeljék. Az Ethereum decentralizált dizájnjának eredménye, hogy egyetlen érdekcsoport sem nyomhat el egy másikat: a protokollfejlesztők dönthetnek úgy, hogy nem fejlesztenek le egy kódváltoztatást; a csomópont-operátorok nem használják a legújabb Ethereum-klienst; az alkalmazásokat készítő csoportok és felhasználók pedig nem használják a hálózatot. Mivel a protokollfejlesztők nem tudják kényszeríteni az embereket a hálózati frissítések használatára, ezért általában elkerülik azokat a javaslatokat, ahol a vitatottság nagyobb, mint a nyilvánvaló előnyök.

Az EIP-bajnokoknak minden releváns érdekelttől visszajelzést kell kérniük. Ha egy vitatottabb EIP-ről van szó, akkor meg kell próbálni az ellenvetéseket sorban átbeszélni, hogy konszenzus tudjon kialakulni. Az Ethereum-közösség méretét és diverzitását tekintve nincs egy mértéke a közösség konszenzusának, ezért a fejlesztési javaslatot a körülményekhez igazítva kell kezelni.

Az Ethereum-hálózat biztonságán túl rendkívül fontos az, hogy miként vélekednek a protokollfejlesztők, az alkalmazás-/eszközfejlesztők és az alkalmazások felhasználói, mert az ő közreműködésük és munkájuk teszi vonzóvá ezt az ökoszisztémát. Emellett az EIP-ket az összes kliensen végig kell vezetni, amit különböző csapatok végeznek. Tehát meg kell győzni a protokollfejlesztők számos csapatát, hogy az adott változás értékes, segíti a felhasználókat vagy biztonsági problémát old meg.

<Divider />

## A nézeteltérések kezelése {#disagreements}

Mivel ennyiféle érdekelt van különböző motivációkkal és hitekkel, ezért a nézeteltérés nem ritka.

Általában a nézeteltéréseket hosszú egyeztetéseken kezelik nyilvános fórumokon, hogy a probléma gyökerét megtalálják és azt mindenki meg tudja fontolni. Általában az egyik fél engedményt tesz vagy egy örömteli középutat találnak. Ha az egyik csoport egy adott változást áterőltet a rendszeren, akkor a lánc kettéválhat. Amikor az érdekeltek egy része kifogásol egy változást, így a protokollnak egy eltérő, nem kompatibilis verziói működnek, melyekből két blokklánc emelkedik ki.

### A DAO elágazás {#dao-fork}

Az elágazások akkor jönnek létre, amikor komoly technikai változások történnek a hálózaton és megváltoztatják a protokoll szabályait. Az [Ethereum-klienseknek](/developers/docs/nodes-and-clients/) frissíteni kell a szoftverjét, hogy az új elágazási szabályokat életbe léptessék.

A DAO-elágazás volt a válasz egy [2016-os DAO-támadásra](https://www.coindesk.com/understanding-dao-hack-journalists), amikor egy sebezhető [DAO](/glossary/#dao) szerződésből 3,6 millió ETH-t ürítettek le a támadás során. Az elágazás a pénzeszközöket a hibás szerződésből egy újba tette át, hogy a támadás során károsultak kaphassanak belőle.

Ennek az akciónak a kezelését megszavazták az Ethereum közösségen belül. Bármely ETH tulajdonos szavazhatott egy tranzakción keresztül [egy szavazási platformon](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Az elágazás mellett több mint a szavazók 85%-a voksolt.

Fontos megjegyezni, hogy miközben a protokoll tényleg elágazott, hogy visszafordítsa a támadást, a szavazás súlya megkérdőjelezhető:

- A szavazók száma rendkívül alacsony volt
- A legtöbben nem tudták, hogy szavazás történt
- A szavazást csak ETH-val rendelkezők végezték, a rendszer többi résztvevője nem vett részt

A közösség ezen része elutasította az elágazást, főleg, mert az incidenst nem a protokollnak tulajdonították. Ők ezután létrehozták az [Ethereum Classicot](https://ethereumclassic.org/).

Ma az Ethereum közössége a beavatkozásmentesség szabályát követi a hibás szerződések vagy elveszett pénzek esetén, hogy megtartsák a rendszer hihető semlegességét.

Bővebben a DAO-támadásról:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Az elágazás hasznossága {#forking-utility}

Az Ethereum/Ethereum Classic elágazás egy kiváló példája az egészséges elágazásnak. A két csoport elég nagy mértékben nem értett egyet egymással az alapvető értékek tekintetében, hogy megérte a kockázatot, hogy a saját útjukat kövessék.

Az elágazás lehetősége a jelentős politikai, filozófiai vagy gazdasági különbségek esetén az Ethereum-irányítás sikerének fontos része. Az elágazás lehetősége nélkül az alternatívák folyamatosan ütköztek, részvételre kényszerítve a vonakodókat, akik később végül létrehozták az Ethereum Classicot, és egy teljesen más vízióval rendelkeztek arról, hogy az Ethereum sikere miben áll.

<Divider />

## Beacon-lánc irányítása {#beacon-chain}

Az Ethereum-irányítási folyamat gyakran a gyorsaság és a hatékonyság rovására a nyitottságot és a bevonódást hangsúlyozza. A Beacon-lánc fejlesztésének meggyorsítása érdekében ezt a proof-of-work Ethereum-hálózattól külön hozták létre, és a maga irányítási gyakorlatát követte.

Miközben a specifikáció és a fejlesztés teljesen nyitott volt, a hivatalos fejlesztési folyamat nem követte a fenti lépéseket. Így a kutatók és a fejlesztők gyorsabban meg tudtak egyezni a specifikus változtatásokon.

Amikor a Beacon-lánc egyesült az Ethereum végrehajtási réteggel 2022. szeptember 15-én, a Merge teljesült a [Paris hálózati frissítés](/history/#paris) részeként. Az [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) javaslat státusza véglegesre változott befejezve az átállást a proof-of-stake mechanizmusra.

<ButtonLink href="/roadmap/merge/">
  A beolvadásról bővebben
</ButtonLink>

<Divider />

## Hogyan lehet részt venni? {#get-involved}

- [Javasoljon egy EIP-t](/eips/#participate)
- [Vitassa meg a jelenlegi javaslatokat](https://ethereum-magicians.org/)
- [Vegyen részt az R&D beszélgetéseken](https://ethresear.ch/)
- [Csatlakozzon az Ethereum R&D Discord csatornához](https://discord.gg/mncqtgVSVw)
- [Csomópont futtatása](/developers/docs/nodes-and-clients/run-a-node/)
- [Vegyen részt a kliensfejlesztésekben](/developers/docs/nodes-and-clients/#execution-clients)
- [Protokollfejlesztő gyakornoki program](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## További olvasnivaló {#further-reading}

Az Ethereumban az irányítás nincs szigorúan definiálva. A közösség különféle tagjainak eltérő perspektívái vannak ezzel kapcsolatban. Néhány ezek közül:

- [Megjegyzések a blokkláncirányításról](https://vitalik.eth.limo/general/2017/12/17/voting.html) – _Vitalik Buterin_
- [Hogyan működik az Ethereum irányítása?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Hogyan működik az Ethereum irányítása](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Kik az az Ethereum protokollfejlesztői?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) – _Hudson Jameson_
- [Irányítás, 2. rész: A plutokrácia még mindig rossz](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) – _Vitalik Buterin_
- [Túl az érmealapú szavazásra épülő irányításon](https://vitalik.eth.limo/general/2021/08/16/voting3.html) – _Vitalik Buterin_
