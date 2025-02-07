---
title: Csomópontok és kliensek
description: Áttekintés az Ethereum csomópontokról (node) és kliens szoftverekről, valamint egy csomópont felállításának menetéről, és hogy miért érdemes sajátot működtetni.
lang: hu
sidebarDepth: 2
---

Az Ethereum számítógépekből (ún. csomópontokból) álló elosztott hálózat, amelyen a számítógépek a blokkok és tranzakciós adatok hitelesítésére képes szoftvert futtatnak. A szoftver futtatása teszi a felhasználó számítógépét Ethereum-csomóponttá. A csomóponthoz két különálló szoftverre, vagyis kliensre van szükség.

## Előfeltételek {#prerequisites}

Mielőtt mélyebbre merülne, és megkezdené a saját Ethereum-kliensének működtetését, javasoljuk, hogy ismerje meg a közvetítőmentes (peer-to-peer) hálózatok koncepcióját és az[Ethereum Virtális Gép (EVM) alapjait](/developers/docs/evm/). Tekintse meg a [Bevezetés az Ethereumba](/developers/docs/intro-to-ethereum/) című cikket.

Ha Önnek újdonság a csomópontok témaköre, akkor azt javasoljuk, először tekintse meg az [Ethereum-csomópont futtatása](/run-a-node) című felhasználóbarát ismertetőnket.

## Mik azok a csomópontok és kliensek? {#what-are-nodes-and-clients}

„Csomópont” minden olyan Ethereum-kliensszoftver-példány, amely más – szintén Ethereum-szoftvert futtató – számítógépek hálózatához kapcsolódik. A kliens az Ethereum egy implementációja, amely adatok hitelesítését végzi a protokollszabályok alapján, és fenntartja a hálózat biztonságát. A csomópontnak két klienst kell futtatnia: konszenzusos és végrehajtási kliens.

- A végrehajtási kliens (más néven végrehajtási motor, EL-kliens vagy korábbi nevén Eth1-kliens) a hálózatban terjesztett új tranzakciókat figyeli, végrehajtja őket az EVM-ben, és tárolja az összes aktuális Ethereum-adat legutolsó állapotát és adatbázisát.
- A konszenzusos kliens (más néven Beacon-csomópont, CL-kliens vagy korábbi nevén Eth2-kliens) feladata a proof-of-stake konszenzusalgoritmus végrehajtása, amely lehetővé teszi, hogy a hálózat a végrehajtási kliens validált adatai alapján megegyezésre jusson. Létezik egy harmadik szoftver is, a validátor, amelyet a konszenzusok klienshez lehet hozzáadni, így az adott csomópont részt vehet a hálózat biztosításában.

Ezek a kliensek együtt dolgoznak azon, hogy az Ethereum-hálózat legfrissebb állapotát kövessék, és lehetővé tegyék a felhasználók számára, hogy interakcióba lépjenek a hálózattal. Az egymással együttműködő szoftverrészekből álló moduláris felépítés neve [bennfoglalt komplexitás (encapsulated complexity)](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Ez a megközelítés lehetővé tette, hogy [az egyesítés (Merge)](/roadmap/merge) hibátlanul végbemehessen, a kliensszoftvereket könnyebb legyen karbantartani és fejleszteni, továbbá az egyéni klienseket újra lehet hasznosítani, például a [2. blokkláncrétegben](/layer-2/).

![Összekapcsolt végrehajtási és konszenzusos kliensek](./eth1eth2client.png) Az összekapcsolt végrehajtási és konszenzusos kliens egyszerűsített ábrája.

### Kliensdiverzitás {#client-diversity}

A [ végrehajtási klienseket](/developers/docs/nodes-and-clients/#execution-clients) és a [ konszenzusos klienseket](/developers/docs/nodes-and-clients/#consensus-clients) számos különböző programnyelvben fejlesztették ki a különféle csapatok.

A többféle kliensimplementáció erősebbé teheti a hálózatot azáltal, hogy nem függ szorosan egyetlen programkódtól. A cél a sokszínűség elérése anélkül, hogy bármelyik kliens dominálná a hálózatot, így el lehet kerülni az egyetlen hibapont lehetőségét. A nyelvek változatossága szélesebb fejlesztői közösséget is vonz, és lehetővé teszi, hogy az általuk előnyben részesített nyelven integrációt hajtsanak végre.

Tudjon meg többet a [kliensdiverzitásról](/developers/docs/nodes-and-clients/client-diversity/).

Az implementációk közös vonása, hogy egyazon specifikációt követik. Ez a specifikáció diktálja, hogyan működik az Ethereum-hálózat és a blokklánc. Minden technikai részlet ki van dolgozva, a specifikációkat pedig itt találhatja:

- Eredetileg az [Ethereum Sárga Könyvében](https://ethereum.github.io/yellowpaper/paper.pdf), vagyis műszaki alaptanulmányában.
- [Végrehajtási specifikációk](https://github.com/ethereum/execution-specs/)
- [Konszenzusspecifikációk](https://github.com/ethereum/consensus-specs)
- [EIP-ek](https://eips.ethereum.org/), amelyeket a különböző [ hálózatfrissítések](/history/) során vezettek be

### Csomópontok követése a hálózatban {#network-overview}

Az Ethereum-hálózat csomópontjairól számos trekker biztosít valós idejű adatokat. Megjegyzendő, hogy a decentralizált hálózatok jellege miatt ezek a letapogatók (crawler) csak korlátozott rálátást tudnak nyújtani a hálózatra, és eltérő eredményeket jelenthetnek.

- [Csomóponttérkép](https://etherscan.io/nodetracker), készítette: Etherscan
- [Ethercsomópontok](https://ethernodes.org/), készítette: Bitfly
- [Nodewatch](https://www.nodewatch.io/), készítette: Chainsafe, konszenzuscsomópontok letapogatása
- [Monitoreth](https://monitoreth.io/) - a MigaLabs által biztosított megosztott hálózati ellenőrzési eszköz

## Csomóponttípusok {#node-types}

Ha [ saját csomópontot akar futtatni](/developers/docs/nodes-and-clients/run-a-node/), akkor fontos megértenie, hogy különböző típusú csomópontok léteznek, amelyek adathasználata eltérő. A kliensek valójában három különböző típusú csomópontot futtathatnak: könnyű (light), teljes (full) és archív (archive). Különböző szinkronizálási stratégiák is elérhetők, amelyek rövidebb szinkronizálási időt tesznek lehetővé. A szinkronizálás arra utal, hogy milyen gyorsan tudja elérni a csomópont az Ethereum legfrissebb státuszát.

### Teljes csomópont (full node) {#full-node}

A teljes csomópontok a blokklánc egymást követő blokkjait validálják, melyhez letöltik és ellenőrzik a blokk tartalmát és az adat státuszát minden egyes blokkra. A teljes csomópontoknak több fajtája létezik, néhány a kezdetektől indul, a genezis blokktól, és a blokklánc teljes történetét validálja blokkonként. Mások az ellenőrzést egy későbbi blokktól indítják, melynek érvényességében megbíznak (pl. a Geth-féle, pillanatfelvételen alapuló szinkronizálás). Függetlenül az ellenőrzés kezdőpontjától, a teljes csomópontok csak a legutóbbi adatokat (általában az utolsó 128 blokkot) tárolják, az ennél régebbieket törlik, hogy ne foglaljon annyi helyet. A régebbi adatot újra elő lehet állítani, amikor szükséges.

- A blokkláncadatokat teljeskörűen tárolja (habár ezt időről időre megrövidíti a rendszer, tehát a teljes csomópont sem tárolja az összes állapotadatot a genezisig visszamenőleg).
- Részt vesz a blokkvalidációban, hitelesíti az összes blokkot és állapotot.
- A teljes csomópont minden státuszt elő tud hívni a lokális tárhelyéről vagy újra tudja generálni a pillanatképekből.
- Kiszolgálja a hálózatot, és kérésre adatszolgáltatást nyújt.

### Archív csomópont {#archive-node}

Az archív csomópontok olyan teljes csomópontok, melyek minden blokkot ellenőriznek a genezis óta, és nem törölnek semmilyen letöltött adatot.

- Tárolja mindazt, ami a teljes csomóponton van, és archívumot épít a múltbeli állapotokból. Akkor van rá szükség, ha például valaki le akar kérni egy számlaegyenleget a 4 000 000. blokknál, vagy nyomon követést alkalmazva egyszerűen és gyorsan le akarja tesztelni a saját tranzakcióit anélkül, hogy kibányászná őket.
- Ezek az adatok terabájtnyi egységeket képviselnek, emiatt az archív csomópontok kevésbé vonzók az átlagfelhasználók számára, de hasznos lehet az olyan szolgáltatóknak, mint a blokkfelfedezők, a tárcaforgalmazók és a blokkláncelemzők.

A kliensek szinkronizálása az archív kivételével minden módban részleges blokkláncadatokat eredményez. Ez azt jelenti, hogy nincs egy összes múltbeli státusszal rendelkező archívum, de igény esetén a teljes csomópont képes felépíteni azt.

Tudjon meg többet az [archív csomópontokról](/developers/docs/nodes-and-clients/archive-nodes).

### Könnyű csomópont {#light-node}

A teljes blokkok letöltése helyett a könnyű csomópontok csak a blokkfejléceket töltik le. Ezek a fejlécek összegző információkat hordoznak a blokkok tartalmáról. A könnyű csomópont a szükséges egyéb információkat egy teljes csomóponttól kéri le. A könnyű csomópont ezután független módon hitelesítheti a kapott adatokat a blokkfejlécben található állapot-gyökérhash értékek alapján. A könnyű csomópontok segítségével a felhasználók a teljes csomópontok futtatásához elengedhetetlen erős hardver és nagy sávszélesség nélkül is részt vehetnek az Ethereum hálózatában. Végül a könnyű csomópontok mobiltelefonokon vagy beágyazott eszközökön is futtathatók lesznek. A könnyű csomópontok nem vesznek részt a konszenzusban (tehát nem lehetnek bányászok/validátorok), de ugyanolyan funkcionalitással és biztonsági garanciákkal férhetnek hozzá az Ethereum-blokklánchoz, mint egy teljes csomópont.

A könnyű kliensek az Ethereum aktív fejlesztési területei közé tartoznak, és hamarosan új könnyű kliensek megjelenésére számítunk a konszenzusréteg és a végrehajtási réteg számára. A könnyűkliens-adatok nyújtásának további potenciális útvonala lehet a [ pletykahálózat (gossip network)](https://www.ethportal.net/). Ez előnyös, mivel a pletykahálózat képes támogatni a könnyű csomópontok hálózatát anélkül, hogy a teljes csomópontoknak kellene adatot szolgáltatniuk.

Az Ethereum még nem támogatja a könnyű csomópontok nagy tömegeit, de számítani lehet rá, hogy ezek támogatása a közeljövőben gyorsan fejlődik majd. Különösen a [Nimbus](https://nimbus.team/), a [Helios](https://github.com/a16z/helios) és a [LodeStar](https://lodestar.chainsafe.io/) kliensek fejlesztenek aktívan a könnyű csomópontok területén.

## Miért futtassak Ethereum csomópontot? {#why-should-i-run-an-ethereum-node}

Egy csomópont futtatása lehetővé teszi, hogy Ön közvetlenül, bizalomigény nélkül és privát módon használhassa az Ethereumot, miközben a hálózatot támogatva fokozza annak szilárdságát és decentralizációját.

### Milyen előnyökkel jár ez Önnek? {#benefits-to-you}

A saját csomópont futtatása lehetővé teszi az Ethereum valóban privát, önálló és bizalomigény nélküli használatát. Önnek nem kell bíznia a hálózatban, mivel az adatokat saját maga is ellenőrizheti a kliensén keresztül. A „Nem kell megbíznia senkiben. Csak ellenőrizni” egy népszerű blokkláncmantra.

- A csomópontja önállóan hitelesíti az összes tranzakciót és blokkot a konszenzusszabályoknak megfelelően. Ez azt jelenti, hogy nem kell a hálózat egyetlen más csomópontjára sem támaszkodnia, sem teljesen megbíznia bennük.
- Saját csomópontjához használhat egy Ethereum-tárcát. Biztonságosabban és diszkrétebben használhatja a dappokat, mivel nem kell kiadnia a címét és az egyenlegét közvetítőknek. Mindent ellenőrizhet a saját kliensével. A [MetaMask](https://metamask.io), a [Frame](https://frame.sh/)és [ számos egyéb tárca](/wallets/find-wallet/) kínál RPC-importálást, amely lehetővé teszi számukra az Ön csomópontjának használatát.
- Más olyan szolgáltatásokat is futtathat vagy végezhet saját hatáskörben, amelyek az Ethereum adataira támaszkodnak. Ilyen lehet például egy Beaconlánc-validátor, egy második blokkláncréteg szoftvere, infrastruktúra, blokkfelfedezők, fizetésfeldolgozó alkalmazások stb.
- Ön saját egyéni [RPC-végpontokat](/developers/docs/apis/json-rpc/) is kínálhat. Ezeket a végpontokat felajánlhatja nyilvánosan a közösségnek is, hogy ezzel is elkerüljék a nagy, centralizált szolgáltatókat.
- A csomópontjához a **folyamaton belüli kommunikációk (IPC)** mechanizmusával csatlakozhat, vagy átírhatja a csomópontját, hogy a saját programját töltse be pluginként. Ez rövid késleltetést tesz lehetővé, ami nagyon fontos, ha például valaki web3 könyvtárak használatával dolgoz fel nagy mennyiségű adatot, vagy amikor a lehető leggyorsabban ki kell cserélnie tranzakcióit (például frontrunning esetén).
- Közvetlenül letétbe helyezhet ETH-t, ezzel biztosítja a hálózatot és jutalmakat szerez. A kezdéshez tekintse meg az [önálló letétbe helyezésről](/staking/solo/) szóló oldalunkat.

![Hogyan férhet hozzá az Ethereumhoz az alkalmazásával és a csomópontjával](./nodes.png)

### Hálózati előnyök {#network-benefits}

A csomópontok sokfélesége fontos az Ethereum egészsége, biztonsága és működési ellenálló képessége szempontjából.

- A teljes csomópontok betartatják a konszenzusszabályokat, így nem lehet őket becsapni és rávenni szabálytalan blokkok elfogadására. Ez extra biztonságot nyújt a hálózatnak, mert ha az összes csomópont könnyű csomópont lenne, amelyek nem végeznek teljes ellenőrzést, akkor a validátorok megtámadhatnák a hálózatot.
- Ha egy támadás legyűri a [proof-of-stake](/developers/docs/consensus-mechanisms/pos/#what-is-pos) mechanizmus kriptogazdaság-védelmi rendszerét, akkor a teljes csomópontok a becsületes lánc követése mellett szavazva közösségi visszaállítást hajthatnak végre.
- Ha több csomópont van a hálózatban, az sokszínűbb és szilárdabb hálózatot eredményez, ami a decentralizáció végső célja, és megteremti a cenzúrával szemben ellenálló és megbízható rendszer lehetőségét.
- A teljes csomópontok hozzáférést biztosítanak a blokkláncadatokhoz a könnyű kliensek számára, melyek ettől függenek. A könnyű csomópontok nem tárolják az egész blokkláncot, ehelyett az adatokat a [blokkfejlécekben található státuszgyökerek](/developers/docs/blocks/#block-anatomy) alapján ellenőrzik. Szükség esetén további információkat is kérhetnek a blokkokról a teljes csomópontoktól.

Ha valaki egy teljes csomópontot futtat, akkor az az egész Ethereum-hálózat számára előnyös, még ha nem is működtet azon validátort.

## Saját csomópont üzemeltetése {#running-your-own-node}

Szeretne saját Ethereum-klienst futtatni?

A kezdők számára is könnyen érthető bevezetőért látogasson el a [Csomópont futtatása](/run-a-node) oldalunkra.

Ha Ön jártas a technológiában, akkor további részleteket és lehetőségeket talál arra vonatkozóan, hogyan [pörgesse fel saját csomópontját](/developers/docs/nodes-and-clients/run-a-node/).

## Alternatívák {#alternatives}

A saját csomópont felállítása idő- és erőforrásigényes lehet, de nem minden esetben szükséges saját példányt futtatnia. Ekkor használhat egy harmadik fél által biztosított API-t (alkalmazásprogramozási felület). Ezen szolgáltatások használatának áttekintéséhez nyissa meg a [Csomópontok mint szolgáltatás](/developers/docs/nodes-and-clients/nodes-as-a-service/) című bejegyzésünket.

Ha az Ön közösségében valaki nyilvános API-val futtat egy Ethereum-csomópontot, akkor egy egyedi RPC-n keresztül átirányíthatja a tárcáit erre a közösségi csomópontra, így nagyobb fokú adatvédelemben részesülhet, mintha egy véletlenszerűen kiválasztott, harmadik félben bízna meg.

Ugyanakkor, ha Ön klienst üzemeltet, akkor megoszthatja azokkal a barátaival, akiknek szüksége lehet rá.

## Végrehajtási kliensek {#execution-clients}

Az Ethereum-közösség több nyílt forráskódú végrehajtási klienst (korábbi nevén „Eth1-kliens”, vagy egyszerűen „Ethereum-kliens”) tart fent, amelyeket különböző csapatok különböző programnyelveken hoztak létre. Ez erősebbé és [sokszínűvé](/developers/docs/nodes-and-clients/client-diversity/) teszi a hálózatot. A cél a sokszínűség elérése anélkül, hogy bármelyik kliens dominálna, így el lehet kerülni az egyetlen hibapont lehetőségét.

Ez a táblázat összefoglalja a különböző klienseket. Ezek mindegyike megfelel a [klienstesztnek](https://github.com/ethereum/tests), és aktívan karbantartják őket, hogy naprakészek legyenek a hálózati frissítések tekintetében.

| Kliens                                                                   | Nyelv      | Operációs rendszerek  | Hálózatok                 | Szinkronizációs stratégiák                                           | Állapot elhagyás    |
| ------------------------------------------------------------------------ | ---------- | --------------------- | ------------------------- | -------------------------------------------------------------------- | ------------------- |
| [Geth](https://geth.ethereum.org/)                                       | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Snap](#snap-sync), [teljes](#full-sync)                             | Archív, megvágott   |
| [Nethermind](https://www.nethermind.io/)                                 | C#, .NET   | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Snap](#snap-sync) (kiszolgálás nélkül), gyors, [teljes](#full-sync) | Archív, csökkentett |
| [Besu](https://besu.hyperledger.org/en/stable/)                          | Java       | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Snap](#snap-sync), [gyors](#fast-sync), [teljes](#full-sync)        | Archív, csökkentett |
| [Erigon](https://github.com/ledgerwatch/erigon)                          | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Teljes](#full-sync)                                                 | Archív, csökkentett |
| [Reth](https://reth.rs/)                                                 | Rust       | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Teljes](#full-sync)                                                 | Archív, megvágott   |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(béta)_ | TypeScript | Linux, Windows, macOS | Sepolia, Holesky          | [Teljes](#full-sync)                                                 | Megvágott           |

A támogatott hálózatokkal kapcsolatos további információkért olvassa el az [Ethereum-hálózatok](/developers/docs/networks/) című cikket.

Minden kliens egyedi felhasználási esetekkel és előnyökkel rendelkezik, ezért a saját preferenciái alapján válasszon közülük. A sokféleség lehetővé teszi, hogy az implementációk különféle szolgáltatásokra és felhasználói közönségekre koncentráljanak. Előfordulhat, hogy a klienseket a szolgáltatások, a támogatás, a programozási nyelv vagy a licencek alapján választja ki.

### Besu {#besu}

íA Hyperledger Besu egy vállalati szintű Ethereum-kliens a nyilvános és engedélyhez kötött hálózatokhoz. Az Ethereum-főhálózat összes szolgáltatását támogatja, a nyomon követéstől a GraphQL-ig, kiterjedt felügyeleti funkciót kínál, és a ConsenSys támogatja, mind a nyílt közösségi csatornákon, mind a vállalkozások számára elérhető kereskedelmi SLA-k révén. Java nyelven íródott, és az Apache 2.0 licenc alatt fut.

A Besu részletes [dokumentációja](https://besu.hyperledger.org/en/stable/) az összes funkció és beállítás tekintetében tájékoztatást nyújt.

### Erigon {#erigon}

Az Erigon – korábbi nevén Turbo-Geth – a Go Ethereum elágazásaként indult el a sebességre és a hatékony tárhelyhasználatra fókuszálva. Az Erigon az Ethereum teljesen újraépített implementációja, mely jelenleg Go nyelven elérhető, de más programozási nyelven is lehet majd implementálni. Az Erigon célja egy gyorsabb, modulárisabb és optimalizáltabb Ethereum-implementáció megteremtése. Kevesebb mint 3 nap alatt képes egy 2 TB tárhelyet használó, teljes archív csomópont szinkronizációját elvégezni.

### Go Ethereum {#geth}

A Go Ethereum (röviden Geth) az Ethereum protokoll egyik eredeti implementációja. Jelenleg ez a legelterjedtebb kliens a legnagyobb felhasználói bázissal és sokféle eszközzel a felhasználók és a fejlesztők számára. Go nyelven van írva, teljesen nyílt forráskódú, és a GNU LGPL v3 licenc alatt fut.

További információkat a Geth [dokumentációjában](https://geth.ethereum.org/docs/) talál.

### Nethermind {#nethermind}

A Nethermind egy Ethereum-implementáció, amelyet a C# .NET tech stackkel hoztak létre az LGPL-3.0 licenc alatt, és minden nagyobb platformon fut, beleértve az ARM-et is. Nagyszerű teljesítményt nyújt:

- egy optimizált virtuális géppel;
- állapoteléréssel;
- networkinggel és sokféle funkcióval, mint a Prometheus/Graphana irányítópultok, seq vállalati naplózási támogatás, JSON-RPC nyomon követés és analitikai plugin-ek.

Ezenkívül a Nethermind [részletes dokumentációval](https://docs.nethermind.io), erős fejlesztői támogatással és online közösséggel is rendelkezik, valamint nonstop támogatással a prémium felhasználók részére.

### Reth {#reth}

A Reth (a Rust Ethereum rövidítve) egy Ethereum teljes csomópont-implementáció, amely felhasználóbarát, rendkívül moduláris, gyors és hatékony. A Reth-et eredetileg a Paradigm építette és fejlesztette, és az Apache és MIT alatt van engedélyeztetve.

A Reth készen áll az éles használatra, olyan kritikus környezetekben is jól használható, mint a letétbe helyezés vagy nagy elérhetőséget igénylő szolgáltatások. Olyan esetekben is jól teljesít, melyek nagy teljesítményt igényelnek jó áron, mint az RPC, MEV, indexálás, szimulációk és peer-to-peer tevékenységek.

Tudjon meg többet a [Reth Book](https://reth.rs/) vagy a [Reth GitHub repo](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth) révén.

### Fejlesztés alatt {#execution-in-development}

Ezek a kliensek még a fejlesztés korai fázisában vannak, és ezért nem lehet élesben használni őket.

#### EthereumJS {#ethereumjs}

Az EthereumJS végrehajtási kliens (EthereumJS) TypeScript nyelven íródott, és számos csomagból áll, beleértve a Block, Transaction és Merkle-Patricia Trie osztályok által képviselt alapvető Ethereum primitíveket, valamint az alapvető klienskomponenseket, beleértve az Ethereum virtuális gép (EVM) implementációját, egy blokkláncosztályt és a DevP2P hálózati stacket.

Tudjon meg többet erről a [dokumentációból](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master)

## Konszenzusos kliensek {#consensus-clients}

Többféle konszenzusos kliens (korábbi nevén „Eth2” kliens) is létezik, amely támogatja a [ konszenzusfrissítéseket](/roadmap/beacon-chain/). Ezek felelnek az összes konszenzushoz kapcsolódó logikáért, beleértve az elágazásalgoritmust, a tanúsítások feldolgozását, valamint a [proof-of-stake](/developers/docs/consensus-mechanisms/pos) jutalmak és büntetések kezelését.

| Kliens                                                        | Nyelv      | Operációs rendszerek  | Hálózatok                                                    |
| ------------------------------------------------------------- | ---------- | --------------------- | ------------------------------------------------------------ |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Beacon Chain, Goerli, Pyrmont, Sepolia, Ropsten stb.         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Beacon Chain, Goerli, Sepolia, Ropsten stb.                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Beacon Chain, Goerli, Sepolia, Ropsten stb.                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/)   | Go         | Linux, Windows, macOS | Beacon Chain, Gnosis, Goerli, Pyrmont, Sepolia, Ropsten stb. |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Beacon Chain, Gnosis, Goerli, Sepolia, Ropsten stb.          |
| [Grandine](https://docs.grandine.io/) (béta)                  | Rust       | Linux, Windows, macOS | Beacon Chain, Goerli, Sepolia és mások                       |

### Lighthouse {#lighthouse}

A Lighthouse egy konszenzusos kliens-implementáció, amelyet Rust nyelven írtak, és az Apache-2.0 licenc alatt adták ki. Fenntartója a Sigma Prime, és a Beacon lánc létrejötte óta stabil és szabadon használható. Különböző vállalkozások, letéti alapok és magánszemélyek támaszkodnak rá. Célja a biztonságos, nagy teljesítményű és interoperábilis működés számos különböző környezetben, az asztali számítógépektől egészen a kifinomult, automatizált rendszerekig.

A dokumentációt a [Lighthouse Book](https://lighthouse-book.sigmaprime.io/) tartalmazza

### Lodestar {#lodestar}

A Lodestar egy szabadon használható konszenzusoskliens-implementáció, amelyet TypeScript nyelven írtak, és az LGPL-3.0 licenc alatt adták ki. A fenntartója a ChainSafe Systems, és az önálló letétbe helyezőknek, fejlesztőknek és kutatóknak készült legújabb konszenzusos kliens. A Lodestar egy Beacon-csomópontból és egy validátorkliensből áll, amely az Ethereum-protokollok JavaScript implementációival működik. A Lodestar célja az Ethereum használhatóbbá tétele a könnyű kliensek felhasználói számára, a hozzáférés kiterjesztése egy szélesebb fejlesztői körre, és hogy hozzájáruljon az ökoszisztéma sokszínűségéhez.

További információ a [Lodestar webhelyünkön](https://lodestar.chainsafe.io/) található

### Nimbus {#nimbus}

A Nimbus egy konszenzusos kliens-implementáció, amelyet Nim nyelven írtak, és az Apache-2.0 licenc alatt adták ki. Ez egy szabadon használható kliens, amelyet önálló letétbe helyezők és letéti alapok használnak. A Nimbust erőforráshatékony rendszernek tervezték, emiatt a korlátozott erőforrásokkal rendelkező eszközökön és a vállalati szintű infrastruktúrákon egyaránt könnyű futtatni anélkül, hogy a stabilitást vagy a jutalmat szerző teljesítményt veszélyeztetné. A kisebb erőforráslábnyom azt jelenti, hogy nagy hálózati terheltség mellett nagyobb a kliens biztonsági zónája.

További információ a [Nimbus-dokumentációban](https://nimbus.guide/) található

### Prysm {#prysm}

A Prysm egy teljes körű funkciókat kínáló, nyílt forráskódú konszenzusos kliens, amelyet Go nyelven írtak, és a GPL-3.0 licenc alatt adták ki. Opcionális webalkalmazási felhasználói felületet kínál, előtérbe helyezi a felhasználói élményt, a dokumentációt és a konfigurálhatóságot az otthoni letétbe helyezők és az intézményi felhasználók számára is.

További információkért tekintse meg a [Prysm-dokumentációt](https://docs.prylabs.network/docs/getting-started/).

### Teku {#teku}

A Teku a Beacon lánc egyik eredeti geneziskliense. A szokásos célok (biztonság, szilárdság, stabilitás, használhatóság, teljesítmény) mellett a Teku külön célként tűzte ki, hogy teljes mértékben megfeleljen a különböző konszenzusoskliens-szabványoknak.

A Teku nagyon rugalmas alkalmazási opciókat kínál. A Beacon-csomópont és a validátorkliens egyetlen folyamatként együtt is futtatható, ami rendkívül kényelmes az önálló letétbe helyezők számára, illetve a csomópontok a kifinomult letéti műveletek érdekében külön is futtathatók. Emellett a Teku teljesen kompatibilis a [Web3Signer](https://github.com/ConsenSys/web3signer/) rendszerrel az aláírásikulcs-biztonság, valamint a súlyos és kizárással járó büntetés (slashing) elkerülése érdekében.

A Teku Java nyelven íródott és az Apache 2.0 licenc alatt fut. A ConsenSys Protocols csapata fejleszti, amely a Besu és a Web3Signer fejlesztője is. További információk a [Teku-dokumentációban](https://docs.teku.consensys.net/en/latest/) találhatók.

### Grandine {#grandine}

A Grandine egy konszenzuskliens-implementáció, amelyet Rust nyelven írtak, és a GPL-3.0 licenc alatt adták ki. Fenntartója a Grandine központi csapata, továbbá gyors, nagy teljesítményre képes és könnyű. A letétbe helyezők széles skálájához illeszkedik, a kis erőforrásigényű eszközökön, például Raspberry Pi-n futó egyéni letétbe helyezőktől kezdve a több tízezer validálót futtató, nagy intézményi letétesekig.

A dokumentációt a [Grandine Book](https://docs.grandine.io/) tartalmazza

## Szinkronizálási módok {#sync-modes}

Ahhoz, hogy az Ethereum-kliens az aktuális adatokat kövesse és hitelesítse a hálózaton, szinkronizálnia kell a legfrissebb hálózati státusszal. Ez úgy történik, hogy adatokat tölt le többi klienstől, kriptográfiailag ellenőrzi azok integritását, és felépít egy helyi blokkláncadatbázist.

A szinkronizálási módok ennek a folyamatnak a különböző megközelítéseit képviselik eltérő kompromisszumokkal. A kliensek a szinkronizálási algoritmusok végrehajtásában is különböznek. A végrehajtással kapcsolatos konkrétumokról mindig a választott kliens hivatalos dokumentációjából tájékozódjon.

### A végrehajtási réteg szinkronizálási módjai {#execution-layer-sync-modes}

A végrehajtási réteg különféle módokon futhat a felhasználási esetek szerint, újravégrehajtva a blokklánc globális állapotát addig, hogy csak a lánc csúcsával szinkronizál egy megbízható ellenőrzési pontból.

#### Teljes szinkronizálás (full sync) {#full-sync}

A teljes szinkronizálás letölti az összes blokkot (beleértve a fejléceket és a blokkadatokat), és a genezistől kezdve a blokkok végrehajtásával lépésenként legenerálja a blokklánc státuszát.

- Minimalizálja a bizalomigényt, és a tranzakciók hiánytalan ellenőrzésével a legmagasabb fokú biztonságot garantálja.
- A tranzakciók növekvő száma miatt az összes tranzakció feldolgozása napokat vagy akár heteket is igénybe vehet.

Az [archív csomópontok](#archive-node) teljes szinkronizálást végeznek, hogy felépítsék (és megtartsák) a státuszváltozások teljes előzményadatait, melyeket az összes blokk összes tranzakciója indukált.

#### Gyors szinkronizálás (fast sync) {#fast-sync}

Ahogy a teljes szinkronizálás, a gyors szinkronizálás is letölt minden blokkot (beleértve a fejléceket, tranzakciókat és visszaigazolásokat). Ugyanakkor nem hajtja újra végre a korábbi tranzakciókat, hanem a visszaigazolásokra támaszkodik, amíg elér a legújabb fejhez, ahol importálásba kezd és feldolgozza a blokkokat, hogy teljes csomópontot adjon.

- Gyors szinkronizálási stratégia.
- Csökkenti az internet-sávszélességi igényt.

#### Snap szinkronizálás (snap sync) {#snap-sync}

A snap szinkronizálás is blokkról blokkra ellenőrzi a láncot. Ugyanakkor nem a genezisblokktól kezdi, hanem egy azt követő, megbízható ellenőrzési ponton, ami valóban része a blokkláncnak. A csomópont elmenti a periodikus ellenőrzési pontokat, miközben törli az adatokat, melyek egy bizonyos időpontnál régebbiek. Ezek a pillanatfelvételek kellenek az adatok újragenerálásához szükségszerint, így nem kell azokat örökre tárolni.

- A leggyorsabb szinkronizálási stratégia jelenleg az alapértelmezett mód az Ethereum-főhálózaton.
- A biztonság feláldozása nélkül takarít meg nagy lemezterületet és sávszélességet.

[Bővebben a snap szinkronizálásról](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Könnyű szinkronizálás (light sync) {#light-sync}

A könnyű szinkronizálás letölti az összes blokkfejlécet és blokkadatot, és véletlenszerűen ellenőriz néhányat. Csak a lánc végét szinkronizálja a megbízható ellenőrző ponttól kezdve.

- Csak a legutolsó állapotot hívja le, és megbízik a fejlesztőkben és a konszenzusmechanizmusban.
- A kliens néhány percen belül készen áll arra, hogy az aktuális hálózati állapottal használják.

**Megjegyzés**: A proof-of-stake Ethereum-hálózatán még nem működik a könnyű szinkronizálás, ennek új verziói nemsokára használhatóak lesznek!

[Bővebben a könnyű kliensekről](/developers/docs/nodes-and-clients/light-clients/)

### A konszenzusréteg szinkronizálási módjai {#consensus-layer-sync-modes}

#### Optimista szinkronizálás {#optimistic-sync}

Az optimista szinkronizálás egy Merge utáni szinkronizálási stratégia, amelynek célja az opt-in és a visszamenőleges kompatibilitás megvalósítása, lehetővé téve, hogy a végrehajtási pontok a már bejáratott módszerekkel végezhessék a szinkronizálást. A végrehajtási motor _ optimista módon_ képes a beacon blokkokat importálni azok teljes körű ellenőrzése nélkül, megtalálni a legújabb fejlécet, majd a fenti módszerekkel megkezdeni a lánc szinkronizálását. Majd miután a végrehajtási kliens behozta a lemaradást, értesíti a konszenzusos klienst a Beacon láncon található tranzakciók érvényességéről.

[Az optimista szinkronizálásról bővebben](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### Ellenőrzésipont-alapú szinkronizálás {#checkpoint-sync}

Az ellenőrzésipont-alapú vagy más néven gyenge szubjektivitású szinkronizálás első osztályú felhasználói élményt nyújt a Beacon-csomópont szinkronizálásához. A [gyenge szubjektivitás](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) feltevésein alapul, ami lehetővé teszi, hogy a kliens a Beacon láncot a genezis helyett egy közelmúltbeli, gyenge szubjektivitású ellenőrzési ponttól kezdve szinkronizálja. Ez jelentősen lerövidíti a kezdeti szinkronizálás idejét ahhoz hasonló bizalmi feltevések mellett, mintha a [genezistől](/glossary/#genesis-block) kezdve szinkronizálnánk.

A gyakorlatban ez azt jelenti, hogy a csomópontunk egy távoli szolgáltatóhoz kapcsolódva a közelmúltban véglegesített állapotokat tölt le, majd attól a ponttól kezdve folytatja az adatok hitelesítését. Az adatokat szolgáltató harmadik fél bizalmat igényel, ezért körültekintően kell kiválasztani.

Az [ ellenőrzésipont-alapú szinkronizálásról](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice) bővebben

## További olvasnivaló {#further-reading}

- [Ethereum-alapismeretek – 2. rész – A csomópontok megértése](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 2019. február 13._
- [Teljes csomópontok futtatása az Ethereumon: Útmutató az alig motivált felhasználók számára](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 2019. november 7._

## Kapcsolódó témák {#related-topics}

- [Blokkok](/developers/docs/blocks/)
- [Hálózatok](/developers/docs/networks/)

## Kapcsolódó útmutatók {#related-tutorials}

- [Alakítsa át a Raspberry Pi 4-et validátor-csomóponttá pusztán a MicroSD kártya előkészítésével – Telepítési útmutató](/developers/tutorials/run-node-raspberry-pi/) _– Készítse fel a Raspberry Pi 4-et, csatlakoztasson egy Ethernet-kábelt, csatlakoztassa az SSD-t, és kapcsolja be az eszközt, hogy a Raspberry Pi 4 teljes Ethereum-csomóponttá váljon a végrehajtási rétegen (fő hálózat) és/vagy a konszenzusrétegen (Beacon lánc/validátor)._
