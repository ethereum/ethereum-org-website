---
title: Pörgesse fel saját Ethereum-csomópontját
description: Általános bevezető az Ethereum-kliens saját példányának működtetéséről.
lang: hu
sidebarDepth: 2
---

A saját csomópont működtetése számos előnnyel jár, új lehetőségeket nyit meg, és emellett támogatja az ökoszisztémát. Ez az áttekintés a saját csomópont felpörgetéséről szól, illetve arról, hogyan vegyen részt az Ethereum tranzakciók validálásában.

Fontos megérteni, hogy az [egyesítés (Merge)](/roadmap/merge) után két kliensre van szükség egy Ethereum-csomópont működtetéséhez: egy **végrehajtási réteg (EL)** és egy **konszenzusréteg (CL)** kliensre. Itt azt mutatjuk be, hogy ezt a két klienst hogyan kell telepíteni, konfigurálni és összekapcsolni az Ethereum-csomópont futtatásához.

## Előfeltételek {#prerequisites}

Először is tisztában kell lennie azzal, hogy mi az az Ethereum-csomópont, és mi a lényege annak, hogy klienst futtasson. Ezt megtalálja a [Csomópontok és kliensek](/developers/docs/nodes-and-clients/) című leírásban.

Ha Önnek újdonság a csomópontok témaköre, vagy egy kevésbé technikai megközelítést szeretne, akkor azt javasoljuk, először tekintse meg az [Ethereum-csomópont futtatása](/run-a-node) című felhasználóbarát ismertetőnket.

## A megközelítés kiválasztása {#choosing-approach}

A csomópont felpörgetésének első lépése a megközelítés kiválasztása. Az igények és lehetőségek alapján el kell dönteni a klienstelepítést (a végrehajtási és a konszenzusos kliensre is), a környezetet (hardver, rendszer) és a kliensbeállítás paramétereit.

A jelen leírás végigvezeti Önt ezeken a döntéseken, hogy megtalálja a leginkább Önnek való módot a saját Ethereum-példányának működtetésére.

A klienstelepítés eldöntéséhez nézze meg a főhálózaton elérhető [végrehajtási klienseket](/developers/docs/nodes-and-clients/#execution-clients), [konszenzusos klienseket](/developers/docs/nodes-and-clients/#consensus-clients) és tudjon meg többet a [kliensdiverzitásról](/developers/docs/nodes-and-clients/client-diversity).

El kell döntenie, hogy a szoftvert inkább a saját [hardverén vagy inkább a felhőben](#local-vs-cloud) futtatja, figyelembe véve a kliensek [igényeit](#requirements).

A környezet kialakítása után telepítse a kiválasztott klienseket egy [kezdőknek is könnyen használható felülettel](#automatized-setup) vagy [manuálisan](#manual-setup) egy terminállal, ahol haladó opciókkal élhet.

Amikor a csomópont már működik és szinkronizál, akkor Ön elkezdheti [használni](#using-the-node), de ne feledkezzen meg a [karbantartásról](#operating-the-node) sem.

![Kliensfelállítás](./diagram.png)

### Környezet és hardver {#environment-and-hardware}

#### Helyi gépen vagy felhőben {#local-vs-cloud}

Az Ethereum-klienseket általános számítógépeken is lehet futtatni, nincs szükség hozzá speciális hardverre, mint amilyenek a bányászathoz való gépek. Ennélfogva számos lehetőség adódik egy csomópont telepítésére a felhasználó igényei szerint. Nézzük meg mindkét opciót, amikor egy helyi, fizikai gépen, és amikor egy felhőszerveren vannak a kliensek:

- Felhő
  - A szolgáltatók szinte állandó szerverműködést és statikus nyilvános IP-címeket ajánlanak
  - A dedikált vagy virtuális szerver kényelmesebb lehet, mint sajátot építeni
  - Ugyanakkor meg kell bízni egy harmadik félben – a szerverszolgáltatóban
  - A teljes csomópont nagyobb tárhelyet igényel, ezért a bérelt szerver ára is magasabb lesz
- Saját hardver
  - Bizalomigény-mentesebb és önállóbb megközelítés
  - Egyszeri befektetés
  - Lehetőség van előre konfigurált gépeket vásárolni
  - Fizikailag össze kell rakni, karban kell tartani, és valószínűleg meg kell oldania a géppel és a hálózattal kapcsolatban felmerülő problémákat is

Mindkét opció más előnyökkel jár. Ha felhőalapú megoldás mellett dönt, akkor a hagyományos felhőalapú szolgáltatók mellett léteznek speciális szolgáltatások a csomópontok telepítésére. Tekintse meg a [Csomópontok mint szolgáltatás](/developers/docs/nodes-and-clients/nodes-as-a-service/) című oldalt a csomópont-szolgáltatókról szóló információkért.

#### Hardver {#hardware}

Ugyanakkor egy cenzúrának ellenálló, decentralizált hálózat nem függhet a felhő alapú szolgáltatóktól. Ehelyett az ökoszisztémának egészségesebb, ha a felhasználó a saját csomópontját a saját helyi hardverén üzemelteti. [A becslések](https://www.ethernodes.org/networkType/Hosting) szerint a csomópontok nagy aránya fut felhőn, ami felveti az egyetlen hibaforrás lehetőségét.

Az Ethereum-klienseket a saját számítógépén, laptopján, szerverén vagy akár egy egykártyás számítógépen is üzemeltetheti. Miközben lehetséges a személyi számítógépen működtetni a klienseket, egy csomópont számára dedikált gép jelentősen növeli a teljesítményt és biztonságot, és minimalizálja az Ön elsődleges számítógépére tett hatást is.

A saját hardver használata igen könnyű is lehet. Vannak egyszerű opciók, de a műszaki területen jártasabb embereknek fejlettebb összeállítások is elérhetők. Tekintsük át az Ethereum-kliensek számítógépen való futtatásához szükséges feltételeket és eszközöket.

#### Követelmények {#requirements}

A hardverkövetelmények kliensenként eltérők, de általánosságban nem magasak, mivel a csomópontnak csak szinkronizálva kell lennie. Nem összekeverendő a bányászattal, amelynek sokkal magasabb számításiteljesítmény-igénye van. Ugyanakkor a szinkronizációs idő és a teljesítmény javul egy erősebb hardverrel.

Mielőtt telepítene egy klienst, győződjön meg arról, hogy a számítógépe rendelkezik elegendő erőforrással. A minimális és az ajánlott követelményeket alább találja.

A hardver szűk keresztmetszete leginkább a lemezterület. Az Ethereum blokklánccal való szinkronizálás igen bemenet/kimenet-intenzív folyamat, és sok helyet igényel. A legjobb a **tartós állapotú meghajtó (SSD)**, melyen még a szinkronizálás után is marad sok száz GB-nyi szabad tárhely.

Az adatbázis mérete és a kezdeti szinkronizálás sebessége függ a kiválasztott klienstől, annak konfigurációjától és a [szinkronizálási stratégiától](/developers/docs/nodes-and-clients/#sync-modes).

Emellett arról is meg kell győződnie, hogy az internetkapcsolatát nem korlátozza egy [sávszélességi maximum](https://wikipedia.org/wiki/Data_cap). A korlátlan kapcsolódás az ajánlott, mert a kezdeti szinkronizálás és az adat nyilvánossá tétele a hálózaton meg fogja haladni a határt.

##### Operációs rendszer

Minden kliens támogatja a legnagyobb operációs rendszereket, mint a Linux, ,macOS, Windows. Tehát a csomópontok működtetéséhez a számítógépén vagy a szerverén olyan operációs rendszert (OS) használ, amilyet szeretne. Biztosítsa, hogy az operációs rendszer frissítve van, hogy ezzel elkerülje a lehetséges hibákat és biztonsági gyengeségeket.

##### Minimális követelmények

- Processzor (CPU) 2+ maggal
- 8 GB RAM
- 2 TB SSD
- 10+ MBit/másodperc sávszélesség

##### Ajánlott követelmények

- Gyors processzor (CPU) 4+ maggal
- 16 GB+ RAM
- Gyors SSD 2+ TB kapacitással
- 25+ MBit/másodperc sávszélesség

A szinkronizálási mód és a kiválasztott kliens befolyásolja a lemezterület-igényt, alább a kliensek szerinti becslést láthatja.

| Kliens     | Lemezterület (snap szinkronizálás) | Lemezterület (teljes archívum) |
| ---------- | ---------------------------------- | ------------------------------ |
| Besu       | 800 GB+                            | 12 TB+                         |
| Erigon     | N.a.                               | 2,5 TB+                        |
| Geth       | 500 GB+                            | 12 TB+                         |
| Nethermind | 500 GB+                            | 12 TB+                         |
| Reth       | N.a.                               | 2,2 TB+                        |

- Megjegyzés: az Erigon és a Reth nem ajánl snap szinkronizálási módot, de lehetséges a teljes adatmegvágás (kb. 2 TB az Erigonnál, 1,2 TB a Rethnél)

A konszenzusos kliens esetében a lemezterület szintén függ a telepítéstől és a beállított jellemzőktől (pl. validátor büntető/kizáró funkció), de általánosságban egy újabb 200 GB-ra van szükség a beacon-adathoz. Sok validátorral a sávszélesség terhelése is növekszik. Ebben az elemzésben [megtalálja a konszenzuskliens követelmények részleteit](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Plug-and-play megoldások {#plug-and-play}

A saját csomópont futtatása saját hardverrel úgy a legegyszerűbb, ha plug and play csomagot használunk. Az előre beállított gépeknél nem kell mást tenni, mint megrendelni, csatlakoztatni és használni. Minden előre be van konfigurálva és magától fut egy intuitív útmutatóval és a szoftver felügyeletére és irányítására szolgáló irányítópulttal.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum egy egykártyás számítógépen {#ethereum-on-a-single-board-computer}

Egyszerű és olcsó módja egy Ethereum-csomópont futtatásának ha egykártyás számítógépet használunk, akár ARM architektúrával, mint a Raspberry Pi. Az [Ethereum az ARM-on](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) több végrehajtási és konszenzusos kliens egyszerűen futtatását teszi lehetővé a Raspberry Pi és más ARM-kártyák számára.

Ezek a kicsi, pénztárcabarát és hatékony eszközök ideálisak a csomópont otthoni futtatására, de a teljesítményük korlátozott lehet.

## A csomópont felpörgetése {#spinning-up-node}

Az aktuális kliensfelállítás végezhető automata telepítőkkel vagy manuálisan, közvetlenül telepítve a kliensszoftvert.

A kevésbé szakértő felhasználók számára az automatikus telepítés a legjobb megoldás, mivel ez a szoftver végigvezeti őket az telepítésen, a kliensbeállításokat pedig magától intézi. Ugyanakkor, akinek van már tapasztalata a terminál használatában, az a manuális beállítás lépéseit is követheti.

### Vezetett felállítás {#automatized-setup}

Számos felhasználóbarát projekt arra törekszik, hogy leegyszerűsítse a kliens felállítását. Ezek a bevezetők automatikus klienstelepítést és -konfigurálást kínálnak, emellett néha grafikus felületet is biztosítanak a vezetett beállításhoz és a felügyelethez.

Több ilyen projektet is találhat alább, melyek segítenek néhány kattintással telepíteni és felügyelni a klienseket:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - A DappNode nem csak a gyártótól származó géppel kapható. A szoftvert, a csomópont-telepítőt és a számos jellemzővel bíró irányítási központot tetszőleges hardveren is használhatja.
- [eth-docker](https://eth-docker.net/) – Az automatikus beállítás a Docker használatával arra fókuszál, hogy egyszerű és biztonságos legyen a letétbe helyezés – egy alapvető terminál és Docker-ismeret szükséges hozzá, ezért a haladóbb felhasználóknak ajánlott.
- [Stereum](https://stereum.net/ethereum-node-setup/) – Telepítő a kliens távoli szerveren, SSH-kapcsolódáson keresztüli telepítéséhez egy GUI beállítási útmutatóval, irányítási központtal és számos egyéb jellemzővel.
- [NiceNode](https://www.nicenode.xyz/) – Telepítő az egyértelmű felhasználói élményért, amely leírja, hogyan futtasson csomópontot saját számítógépén. Csak válassza ki a klienseket, és néhány kattintással indítsa el azokat. Még fejlesztés alatt áll.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) – Csomópont-felállítási eszköz, amely automatikusan generál egy Docker-konfigurációt a CLI-varázslót használva. Go nyelven írta a Nethermind.

### Manuális kliensfelállítás {#manual-setup}

Ez a másik lehetőség, hogy a kliensszoftvert manuális letöltse, ellenőrizze és konfigurálja. Még ha bizonyos kliensek ajánlanak is grafikus felületet, a manuális beállításhoz szükség van alapvető terminálismeretekre, de közben nagy mértékű rugalmasságot tesznek lehetővé.

Ahogy említettük, az Ethereum-csomópont működtetéséhez egy konszenzusos kliens és egy végrehajtási kliens szükséges. Néhány kliens tartalmazhat másik típusú könnyű klienst és előfordulhat, hogy a szinkronizáláshoz sem kell más szoftver. Ugyanakkor a teljes, bizalomigény-mentes ellenőrzéshez mindkét klienst telepíteni kell.

#### A kliensszoftver megszerzése {#getting-the-client}

Először meg kell szerezni a kiválasztott [végrehajtási kliens](/developers/docs/nodes-and-clients/#execution-clients) és [konszenzusos kliens](/developers/docs/nodes-and-clients/#consensus-clients) szoftverét.

Egyszerűen töltsön le egy végrehajtható alkalmazást vagy egy telepítőcsomagot, ami megfelel az operációs rendszernek és az architektúrának. Mindig ellenőrizze az aláírásokat és a letöltött csomagok ellenőrző összegét. Néhány kliens mappákat vagy Docker képeket is ajánl az egyszerűbb telepítés és frissítések érdekében. Minden kliens nyílt forráskódú, tehát Ön is építhet egyet a forrásból. Ez egy sokkal haladóbb módszer, de néhány esetben szükség lehet rá.

A telepítési utasításokat megtalálja a klienshez kapcsolódó dokumentációban.

Ezek a kliensek kiadási oldalai, ahol az előre megépített binárisok vagy instrukciók találhatók:

##### Végrehajtásos kliensek

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Fontos tisztában lenni azzal is, hogy a kliensdiverzitás [problémát jelent a végrehajtási rétegen](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Önnek is azt javasoljuk, hogy futtasson kisebbségi végrehajtási klienst.

##### Konszenzusos kliensek

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/install/source/) (nem ad előre megépített binárist, csak egy Docker-képet vagy fel kell építeni a forrásból)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

A [kliensdiverzitás](/developers/docs/nodes-and-clients/client-diversity/) kritikus a konszenzus-csomópontok esetén, melyek validátort működtetnek. Ha a validátorok többsége egyetlen kliensverziót használ, akkor a hálózat biztonsága veszélybe kerül. Ezért Ön is használjon kisebbségi klienst.

[Tekintse meg a legfrissebb klienshasználatot](https://clientdiversity.org/), és tudjon meg többet a [kliensdiverzitásról](/developers/docs/nodes-and-clients/client-diversity).

##### A szoftver ellenőrzése

A szoftver letöltése után érdemes ellenőrizni annak integritását. Ez opcionális, de ilyen fontos infrastrukturális elemeknél, mint amilyen az Ethereum-kliens, fontos tisztában lenni a támadó vektorokkal és elkerülni azokat. Ha egy előre megépített binárist tölt le, akkor meg kell abban bíznia és kockáztatja, hogy egy támadó kicseréli a végrehajthatót egy ártalmasra.

A fejlesztők aláírják a kiadott binárisokat a PGP-kulcsokkal, így kriptográfiailag ellenőrizheti, hogy tényleg az a szoftver fut-e, amit ők hoztak létre. Ehhez a fejlesztők által használt publikus kulcsokra van szükség, melyeket a kliens kiadási oldalán vagy a dokumentációban megtalál. Miután letöltötte a kliensprogramot és az aláírást, használjon egy PGP-implementációt, pl. [GnuPG](https://gnupg.org/download/index.html), hogy könnyedén ellenőrizze ezeket. Tekintse meg ezt az útmutatót a nyílt forráskódú szoftver ellenőrzéséről a `gpg` használatával kapcsolatban [linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) vagy [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/) operációs rendszeren.

Egy másik ellenőrzési lehetőség az, hogy a letöltött szoftver hashe, vagyis egyedi kriptográfiai ujjlenyomata egyezik a fejlesztő által adottal. Ez még a PGP-nél is egyszerűbb, és néhány kliensnél csak ez a lehetőség érhető el. Csak futtassa le a hash funkciót a letöltött szoftverre, és hasonlítsa össze azzal, amit a kiadási oldalon talál. Például:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Kliensfelállítás {#client-setup}

Miután telepítette, letöltötte vagy összeállította a kliensszoftvert, készen áll a használatra. Ennek lényege, hogy a megfelelő konfigurációkkal kell elindítani. A kliensek bőven kínálnak konfigurációs lehetőségeket, melyek különféle jellemzőket tesznek elérhetővé.

Kezdjük azokkal az opciókkal, melyek jelentősen befolyásolják a kliens teljesítményét és adathasználatát. A [szinkronizációs módok](/developers/docs/nodes-and-clients/#sync-modes) a blokkláncadat letöltésére és validálására ajánlanak különféle módszereket. A csomópont elindítása előtt el kell dönteni, hogy milyen hálózati és szinkronizálási módokat használjon. A legfontosabb a lemezterület és a szinkronizálási idő, amire a kliensnek szüksége lesz. Nézze meg a kliens dokumentációjában, hogy melyik szinkronizálási mód az alapbeállítás. Ha ez nem felel meg Önnek, akkor válasszon egy másikat a biztonsági szint, az elérhető adatok és a költségek alapján. A szinkronizálási algoritmus mellett a korábbi adatok különféle megvágását is be lehet állítani. Ez a megvágás eltávolítja a nem releváns adatokat, pl. azokat a státuszfaszinteket, melyek a közelmúlt blokkjaiból elérhetetlenek.

Másik alapvető konfigurációs lehetőség például a hálózat kiválasztása (főhálózat vagy teszthálózat), HTTP-végpont az RPC vagy a WebSockets részére stb. A kliens dokumentációja tartalmaz minden jellemzőt és opciót. Különféle klienskonfigurációkat lehet beállítani azáltal, hogy a klienst a megfelelő jelöléssel futtatják közvetlenül a CLI-ben vagy a konfigurációs fájlban. Minden kliens egy kicsit más, ezért mindig a hivatalos dokumentációból vagy a támogatást nyújtó oldalról szerezze be a konfigurációs lehetőségek részleteit.

Teszteléshez futtathatja a klienst a teszthálózatok egyikén. [Bővebben a támogatott hálózatokról](/developers/docs/nodes-and-clients/#execution-clients).

A végrehajtási kliensek alapvető konfigurációit a következő részben találja.

#### A végrehajtási kliens elindítása {#starting-the-execution-client}

Mielőtt elindítaná az Ethereum-kliensszoftvert, ellenőrizze, hogy a környezet készen áll. Például:

- Elég lemezterület áll rendelkezésre a kiválasztott hálózati és szinkronizálási mód szerint.
- A memóriát és a CPU-t nem akasztotta meg más program.
- Az operációs rendszer frissítve van a legutóbbi verzióra.
- A rendszerben a helyes idő és dátum szerepel.
- A router és a tűzfal elfogad kapcsolódásokat a hallgató (listening) portokon keresztül. Alapvetően az Ethereum-kliensek hallgató (TCP) és felfedező (UDP) portot használnak, melynek alapbeállítása 30303.

Futtassa először teszthálózaton a kliensét, hogy biztosan minden jól működik.

Minden olyan kliensbeállítást tisztázni kell, mely a kezdőpontban nincs alapból beállítva. A választott konfigurációt a jelölőkkel vagy a konfigurációs fájlban tudja rögzíteni. Minden kliensnél különböznek az elérhető jellemzők és a konfigurációs szintaxisok. A specifikációhoz nézze meg a kliens dokumentációját.

A végrehajtási és konszenzusos kliensek egy hitelesített végponton keresztül kommunikálnak, mely az [Engine API-ban](https://github.com/ethereum/execution-apis/tree/main/src/engine) van specifikálva. A konszenzusos klienshez való kapcsolódáshoz a végrehajtási kliensnek generálnia kell egy [`jwtsecret`](https://jwt.io/) kódot egy ismert útvonalon. Biztonsági és stabilitási okokból a klienseket ugyanazon a gépen kell működtetni, és mindkettőnek ismernie kell ezt az útvonalat, mert ez hitelesíti a helyi RPC-kapcsolódást közöttük. A végrehajtási kliensnek meg kell határoznia egy hallgató (listening) portot a hitelesített API-khoz.

Ezt a tokent a kliensszoftver automatikusan létrehozza, de ezt néha manuálisan kell megtenni. Az [OpenSSL](https://www.openssl.org/) révén Ön is létre tudja hozni:

```sh
openssl rand -hex 32 > jwtsecret
```

#### A végrehajtási kliens futtatása {#running-an-execution-client}

Ez a rész a végrehajtási kliensek elindítását mutatja be. Csak példaként szolgál az alapszintű konfigurációkra, ami a következő beállításokkal indítja el a klienst:

- Meghatározza a hálózatot, amihez kapcsolódik a kliens; példánkban ez a főhálózat
  - Ehelyett használhatja [az egyik teszthálózatot](/developers/docs/networks/) is a beállítások kipróbálására
- Meghatározza az adatkönyvtárat, ahol az összes adat, beleértve a blokkláncot is, le lesz tárolva
  - Írja át az útvonalat egy valódira, pl. ami a külső meghajtójára mutat
- Lehetővé teszi, hogy az interfészek kommunikáljanak a klienssel
  - Beleértve a JSON-RPC-t és az Engine API-t a konszenzusos klienssel való kommunikációhoz
- Meghatározza a `jwtsecret` kódhoz tartozó útvonalat a hitelesített API-hoz
  - Cserélje le a példát egy valódi útvonallal, amit elérnek a kliensek, pl. `/tmp/jwtsecret`

Ne feledje, hogy ez csak alappélda, az összes beállítás a kezdőértéken marad. Tekintse át a kliensek dokumentációit, hogy megismerje a kezdeti értékeket, beállításokat és jellemzőket. A további jellemzőkért, mint a validátorok futtatása, felügyelete stb. tekintse át az adott kliens dokumentációját.

> Vegye figyelembe, hogy a perjelek `\` a példákban csak formázásra szolgálnak, a konfigurációs jeleket egy sorban is meg lehet határozni.

##### A Besu futtatása

Ez a példa a Besut a főhálózaton indítja el, a blokkláncadatokat az alapértelmezett formátumban tárolja a `/data/ethereum` alatt, engedélyezi a JSON RPC-t és Engine RPC-t a konszenzusos klienssel való kapcsolódáshoz. Az Engine API-t a `jwtsecret` token hitelesíti, és csak a `localhostból` jövő hívások vannak megengedve.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

A Besu egy telepítő opcióval bír, mely egy sor kérdést tesz fel, majd legenerálja a konfigurációs fájlt. Indítsa el az interaktív telepítőt a következővel:

```sh
besu --Xlauncher
```

A [Besu dokumentációja](https://besu.hyperledger.org/en/latest/HowTo/Get-Started/Starting-node/) további opciókat és konfigurációs részleteket tartalmaz.

##### Az Erigon futtatása

Ez a példa az Erigont a főhálózaton indítja el, a blokkláncadatot a `/data/ethereum` alatt tárolja, engedélyezi a JSON-RPC-t, meghatározza a namespace-eket, és engedélyezi a hitelesítést a konszenzusos klienssel való kapcsolódáshoz, amit a `jwtsecret` útvonal határoz meg.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Az Erigon alapból teljes szinkronizálást végez 8 GB HDD-vel, ami több mint 2 TB archív adatot eredményez. Biztosítsa, hogy a `datadir` egy olyan lemezre mutat, ahol elég szabad hely van, vagy állítsa be a `--prune` jelölőt, ami megvágja a különféle adatokat. További információért nézze meg az Erigon `--help` oldalát.

##### A Geth futtatása

Ez a példa a Gethet a főhálózaton indítja el, a blokkláncadatokat a `/data/ethereum` alatt tárolja, engedélyezi a JSON-RPC-t, és meghatározza a namespace-eket. Engedélyezi a hitelesítést, hogy a konszenzusos klienssel lehessen kapcsolódni, amihez a `jwtsecret` útvonal szükséges, és azt is megadja, hogy milyen kapcsolódások lehetségesek, jelen példánkban csak a `localhosttól` érkezők.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Tekintse meg a [dokumentációt az összes konfigurálási opcióhoz](https://geth.ethereum.org/docs/fundamentals/command-line-options), és tudjon meg többet a[Geth futtatása konszenzusos klienssel](https://geth.ethereum.org/docs/getting-started/consensus-clients) témáról.

##### A Nethermind futtatása

A Nethermind különféle [telepítési opciókat](https://docs.nethermind.io/nethermind/first-steps-with-nethermind/getting-started) kínál. A csomag számos binárist tartalmaz, beleértve egy Telepítőt, ami egy vezetett felállítást tesz lehetővé, így a konfigurációt interaktív módon lehet létrehozni. Másik megoldásként használhatja a Runner-t is, ami a végrehajtási program maga, és konfigurációs jelölőkkel futtathatja. A JSON-RPC alapból engedélyezve van.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

A Nethermind dokumentációk egy [teljeskörű útmutatót](https://docs.nethermind.io/nethermind/first-steps-with-nethermind/running-nethermind-post-merge) adnak arról, hogyan lehet a Nethermind-ot konszenzusos klienssel működtetni.

A végrehajtási kliens elindítja a fő funkcióit, a kiválasztott végpontokat, és társakat keres. Miután sikeresen felfedezte a társait, elkezd szinkronizálni. A végrehajtási kliens kapcsolódásra vár a konszenzusos klienstől. A jelenlegi blokkláncadatok elérhetők lesznek, amint a kliens sikeresen szinkronizál a jelen státuszhoz.

##### A Reth futtatása

Ez a példa a Reth-et a főhálózaton indítja el az alapértelmezett adathelyet figyelembe véve. Engedélyezi a JSON-RPC-t és az Engine RPC hitelesítést a `jwtsecret` elérési útvonal által meghatározott konszenzusklienshez való csatlakozáshoz, és csak a `localhost`-ról érkező hívások engedélyezettek.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Tekintse meg a [Reth konfigurálást](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth), hogy többet megtudjon az alapértelmezett adatkönyvtárakról. [A Reth dokumentációja](https://reth.rs/run/mainnet.html) további opciókat és konfigurációs részleteket tartalmaz.

#### A konszenzusos kliens elindítása {#starting-the-consensus-client}

A konszenzusos klienst a megfelelő portkonfigurációval kell indítani, hogy egy lokális RPC-kapcsolatot hozzon létre a végrehajtási klienssel. A konszenzusos klienst a felfedett végrehajtási kliens portjával kell futtatni, mint konfigurációs argumentum.

A konszenzusos kliensnek szüksége van a végrehajtási kliens `jwt-secret` kódjához vezető útvonalra, hogy hitelesíteni tudja az RPC-kapcsolódást közöttük. A fenti példákhoz hasonlóan, minden konszenzusos kliensnek van egy konfigurációs jelölője, ami argumentumként felveszi a jwt token útvonalát. Ennek konzisztensnek kell lennie a `jwtsecret` útvonallal, melyet a végrehajtási kliens kapott.

Ha Ön validátort tervez majd futtatni, akkor be kell tennie egy konfigurációs jelölőt a validációs díj címzettjének Ethereum-címét megadva. Ezt az ether jutalmat gyűjti a validátor. Minden konszenzusos kliensnek van egy opciója, pl. `--suggested-fee-recipient=0xabcd1`, hogy az Ethereum címet argumentumként vegye fel.

Amikor egy Beacon-csomópontot indít a teszthálózaton, jelentős szinkronizálási időt takaríthat meg, ha egy publikus végpontot használ a [Checkpoint sync-re](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Konszenzusos kliens futtatása {#running-a-consensus-client}

##### A Lighthouse futtatása

Mielőtt a Lighthouse-t futtatná, ismerje meg, hogyan kell telepíteni és konfigurálni azt a [Lighthouse Könyvből](https://lighthouse-book.sigmaprime.io/installation.html).

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### A Lodestar futtatása

Telepítse a Lodestar szoftvert összeállítva vagy a Docker-kép letöltésével. Tudjon meg többet a [dokumentációból](https://chainsafe.github.io/lodestar/) és a még részletesebb [felállítási útmutatóból](https://hackmd.io/@philknows/rk5cDvKmK).

```sh
lodestar beacon \
    --rootDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### A Nimbus futtatása

A Nimbus egyaránt tartalmaz konszenzusos és végrehajtási klienst. Különféle eszközökön lehet futtatni igen szerény számítási kapacitással. Miután [installálta a hozzá tartozó dolgokat és magát a Nimbust](https://nimbus.guide/quick-start.html), futtathatja a konszenzusos kliensét:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### A Prysm futtatása

A Prysm egy szkripttel együtt elérhető, amely egyszerű, automatikus telepítést tesz lehetővé. A részleteket a [Prysm dokumentációban](https://docs.prylabs.network/docs/install/install-with-script) találja.

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### A Teku futtatása

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

Amikor egy konszenzusos kliens kapcsolódik egy végrehajtási klienshez, hogy beolvassa a letéti szerződést és azonosítsa a validátorokat, szintén kapcsolódik más Beacon-csomóponttársakhoz, és elkezdi szinkronizálni a konszenzus-slotokat a genezistől kezdve. Amint a Beacon-csomópont eléri a jelenlegi korszakot (epoch), a Beacon API használhatóvá válik a validátor számára. Bővebben a [Beacon-csomópont API-król](https://eth2docs.vercel.app/).

### Validátorok hozzáadása {#adding-validators}

A konszenzusos kliens Beacon-csomópontként működik a validátoroknak, hogy azok kapcsolódni tudjanak. Minden konszenzusos kliensnek saját validátorszoftvere van, melyről a releváns dokumentáció részleteiben beszél.

A saját validátor futtatása lehetővé teszi az [önálló letétbe helyezést](/staking/solo/), a leginkább hatásos és bizalomigény nélküli módszert, mely az Ethereum hálózatát támogatja. Ehhez azonban szükség van 32 ETH letétre. Ha szeretne validátort futtatni a saját csomópontján egy kisebb összeggel, akkor Önt érdekelheti az engedélyhez nem kötött csomópontműködtetőkből álló decentralizált alapok, mint amilyen a [Rocket Pool](https://rocketpool.net/node-operators).

A letétbe helyezéssel és a validátorkulcs-generálásával a legkönnyebben a [Holesky Testnet Staking Launchpad](https://holesky.launchpad.ethereum.org/) segítségével kezdhet foglalkozni, amellyel tesztelheti a beállítását a [csomópont futtatása a Holesky-n](https://notes.ethereum.org/@launchpad/holesky) útmutatóval. Amikor készen áll a főhálózatra, akkor ugyanezeket a lépéseket kell megismételnie a [Mainnet Staking Launchpad](https://launchpad.ethereum.org/) segítségével.

Tekintse át a [letétbe helyezési oldalt](/staking), hogy a letéti opciókról tájékozódjon.

### A csomópont használata {#using-the-node}

A végrehajtási kliensek [RPC API végpontokat](/developers/docs/apis/json-rpc/) kínálnak, mellyel tranzakciókat lehet beküldeni, valamint okosszerződésekkel interakcióba lépni vagy telepíteni azokat különféle módokon az Ethereum hálózaton:

- Manuálisan meghívni azokat egy megfelelő protokollal (pl. a `curl` kódot használva)
- Egy megadott konzolt csatolva (pl. `geth attach`)
- Alkalmazásokban implementálva azokat a web3-könyvtárak segítségével, pl. [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

A különféle klienseknél eltér az RPC-végpontok telepítése. De van egy standard JSON-RPC, melyet minden klienssel lehet használni. Az áttekintésért [nézze meg a JSON-RPC dokumentációt](/developers/docs/apis/json-rpc/). Az alkalmazások, melyeknek információra van szükségük az Ethereum hálózatáról, ezt az RPC-t használhatják. Például a népszerű MetaMask tárca megengedi, hogy Ön [kapcsolódjon a saját RPC végpontjához](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node), ami erős adatvédelmet és biztonsági előnyöket ad.

A konszenzusos kliensek mind felfednek egy [Beacon API-t](https://ethereum.github.io/beacon-APIs), amit a kliens státuszának ellenőrzésére vagy a blokkok és konszenzusadatok letöltésére lehet használni, lekérdezéseket küldve olyan eszközökkel, mint amilyen a [Curl](https://curl.se). Bővebben a konszenzusos kliensek dokumentációiban olvashat erről.

#### RPC elérése {#reaching-rpc}

Az alapértelmezett port a végrehajtási kliens JSON-RPC számára a `8545`, de a konfigurációban módosítani lehet a lokális végpontok portjait. Alapból az RPC-interfész csak a számítógépének localhost-ján érhető el. A távoli eléréshez fel kell azt fednie nyilvánosan úgy, hogy a címet `0.0.0.0` kódra változtatja. Ettől elérhetővé válik a helyi hálózat és a nyilvános IP-címek számára. A legtöbb esetben porttovábbítást is be kell állítani a routeren.

Az interneten való port felfedéssel vigyázzon, mert ez bárki számára lehetővé teszi a csomópontjának irányítását. A támadók elérhetik a csomópontot, hogy leállítsák a rendszert vagy ellopják a pénzeszközöket, ha a klienst tárcaként használja.

Ennek elkerülésére a potenciálisan ártó RPC-módokat megakadályozhatja úgy, hogy azok nem módosíthatók. Például a Geth-tel a módosítható módokat egy jelölővel láthatja el: `--http.api web3,eth,txpool`.

Az RPC-interfészhez való hozzáférést kiterjesztheti edge layer API-k vagy webszerver-alkalmazások fejlesztésével, mint amilyen a Nginx, és ezeket a kliens lokális címéhez és portjához kapcsolhatja. Egy köztes réteg használata segíthet a fejlesztőknek, hogy hitelesítést állítsanak fel a biztonságos `https` kapcsolódásokhoz az RPC-interfészhez.

A webszerver, a proxy vagy a kifelé néző Rest API nem az egyedüli módszer arra, hogy a csomópontjának az RPC-végpontjához hozzáférést adjon. Egy nyilvánosan elérhető végpont adatbiztonságot megőrző módja az, hogy a csomópontot a saját [Tor](https://www.torproject.org/) onion szolgáltatásán hosztolja. Így az RPC elérhető a lokális hálózaton kívül, statikus, nyilvános IP-cím vagy egy nyitott port nélkül is. Ugyanakkor ez a beállítás az RPC-végpontot talán csak a Tor hálózaton keresztül teszi elérhetővé, amit nem támogat minden alkalmazást, és ezért kapcsolódási problémákat okozhat.

Ehhez létre kell hoznia a saját [onion szolgáltatását](https://community.torproject.org/onion-services/). Tekintse meg a [dokumentációt](https://community.torproject.org/onion-services/setup/) az onion szolgáltatás felállításáról ahhoz, hogy a sajátját hosztolja. Ezt egy webszerverhez kapcsolhatja egy proxy-val az RPC-porthoz vagy közvetlenül az RPC-hez.

Végül az egyik legnépszerűbb mód a belső hálózathoz való hozzáférés-biztosításra a VPN-en keresztüli kapcsolat. Attól függően, hogy Ön mire használja és mennyi felhasználónak akar hozzáférést biztosítani a csomópontjához, a biztonságos VPN-kapcsolat jó opció lehet. Az [OpenVPN](https://openvpn.net/) egy teljes körű SSL VPN, amely OSI layer 2 vagy 3 biztonságos hálózati kiterjesztést implementál az iparági standard SSL/TLS-protokollt használva, támogatja a rugalmas klienshitelesítési módokat bizonyítványok, okoskártyák és/vagy felhasználói név és jelszó alapján, és engedi a felhasználó vagy csoport specifikus hozzáférés-kezelési szabályzatok használatát a tűzfalszabályokat alkalmazva a VPN virtuális interfészére.

### A csomópont üzemeltetése {#operating-the-node}

A csomópontot rendszeresen felügyelni kell, hogy az megfelelően működik-e. Emellett esetenként karbantartást kell végezni.

#### A csomópont online tartása {#keeping-node-online}

A csomópontnak nem kell mindig online lennie, de érdemes minél többet online tartani, hogy szinkronban legyen a hálózattal. Le lehet állítani azért, hogy újra legyen indítva, de érdemes figyelni arra, hogy:

- A leállítás eltarthat néhány percig, ha a jelenlegi státusz még íródik a lemezre.
- A kényszerített leállítás következtében sérülhet az adatbázis, ami miatt akár az egész csomópontot újra kell szinkronizálni.
- A kliens nem lesz szinkronban a hálózattal, így az újraindításnál újra kell szinkronizálni. Miközben a csomópont képes onnan szinkronizálni, ahol legutóbb tartott, ez eltarthat egy darabig attól függően, hogy mennyit volt offline.

_Ez nem vonatkozik a konszenzusréteg validátor-csomópontjaira._ Ekkor a csomópont offline állapota minden olyan szolgáltatást érint, amely ettől függ. Ha _letétbe helyezési_ célból üzemeltet csomópontot, akkor minimalizálni kell a kiesett időt.

#### Kliensszolgáltatások létrehozása {#creating-client-services}

Fontolja meg, hogy létrehoz egy szolgáltatást, hogy a klienseket automatikusan futtassa a bekapcsoláskor. Például a Linux szervereken érdemes lehet létrehozni egy szolgáltatást például a `systemd` kóddal, amely elindítja a klienst a megfelelő konfigurációval egy korlátozott privilégiumokkal bíró felhasználó alatt és automatikusan újraindítja azt.

#### A kliensek frissítése {#updating-clients}

Tartsa a kliensszoftverét naprakészen a legutóbbi biztonsági javításokkal, funkciókkal és [EIP-ekkel](/eips/). Főleg a [végleges elágazás (hard fork)](/history/) esetén legyen biztos abban, hogy a megfelelő kliensverziót használja.

> A fontos hálózati frissítések előtt az Ethereum Alapítvány publikál egy cikket a [blogon](https://blog.ethereum.org). Ön is [feliratkozhat ezekre a bejelentésekre](https://blog.ethereum.org/category/protocol#subscribe), hogy e-mailes figyelmeztetést kapjon, amikor a csomópontot frissíteni kell.

A kliensek frissítése igen egyszerű. Minden kliens dokumentációjában specifikus instrukciókat talál, de az általános eljárás az, hogy le kell tölteni a legújabb verziót és újra kell indítani a klienst az új végrehajtási programmal. A kliens ott folytatja, ahol abbahagyta, de már a frissítésekkel együtt.

Minden kliensimplementáció rendelkezik egy ember által olvasható verziójelöléssel, melyet a peer-to-peer protokollban használnak, de a parancssorból is elérhető. Ez a verziójelölés megmutatja a felhasználóknak, hogy a megfelelő verziót használják-e, illetve a blokkfelfedezők és más elemzési eszközök számára, hogy megvizsgálják a kliensek megoszlását a hálózaton keresztül. A verziójelöléssel kapcsolatos további információkért tekintse át az adott kliens dokumentációját.

#### Hozzáadott szolgáltatások futtatása {#running-additional-services}

A saját csomópont futtatása megengedi olyan szolgáltatások használatát, melyhez hozzáférés szükséges az Ethereum-kliens RPC-hez. Ezek olyan, Ethereumra épített szolgáltatások, mint a [2. blokkláncréteg által nyújtott megoldások](/developers/docs/scaling/#layer-2-scaling), a tárcák biztonsági mentése, blokkfelfedezők, fejlesztői eszközök és más Ethereum infrastruktúrák.

#### A csomópont felügyelete {#monitoring-the-node}

A csomópont megfelelő felügyeletéhez érdemes a mérőszámokat gyűjteni. A kliensek képesek mérőszámokat biztosítani a végpontokról, így átfogó képet ad a csomóponttal kapcsolatban. Használjon olyan eszközöket, mint az [InfluxDB](https://www.influxdata.com/get-influxdb/) vagy a [Prometheus](https://prometheus.io/), hogy adatbázist hozzon létre, amelyből vizualizációt és diagrammokat készíthet olyan szoftverekkel, mint a [Grafana](https://grafana.com/). Különféle beállítások és Grafana-irányítópultok léteznek a csomópont és az egész hálózat vizualizációjára. Nézze meg például a [Geth felügyeletéről szóló útmutatót](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

A felügyelet részeként figyeljen a gép teljesítményére is. A csomópont kezdeti szinkronizálásakor a kliensszoftver nagyobb terhet helyezhet a CPU-ra és RAM-ra. A Grafana mellett olyan eszközt is használhat, amit az operációs rendszere ajánl, mint a `htop` vagy az `uptime`.

## További olvasnivaló {#further-reading}

- [Ethereum letétbe helyezési útmutatók](https://github.com/SomerEsat/ethereum-staking-guides) – _Somer Esat, rendszeresen frissítve_
- [Útmutató | Hogyan állítson fel validátort az Ethereum letétbe helyezéshez a főhálózaton](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, rendszeresen frissítve_
- [ETHStaker útmutatók a validátorok futtatásáról a teszthálózatokon](https://github.com/remyroy/ethstaker#guides) – _ETHStaker, rendszeresen frissítve_
- [Az egyesítéssel (Merge) kapcsolatos gyakran ismételt kérdések a csomópontműködtetők számára](https://notes.ethereum.org/@launchpad/node-faq-merge) – _2022. július_
- [A hardverkövetelmények elemzése az Ethereum teljes validátor-csomóponthoz kapcsolódóan](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 2018. szeptember 24._
- [Teljes csomópontok futtatása az Ethereumon: Útmutató az alig motivált felhasználók számára](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 2019. november 7._
- [Hyperledger Besu csomópont futtatása az Ethereum főhálózaton: előnyök, követelmények és felállítás](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 2020. május 7._
- [Nethermind Ethereum-kliens bevezetése felügyeleti eszközökkel együtt](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 2020. július 8._

## Kapcsolódó témák {#related-topics}

- [ Csomópontok és kliensek](/developers/docs/nodes-and-clients/)
- [Blokkok](/developers/docs/blocks/)
- [Hálózatok](/developers/docs/networks/)
