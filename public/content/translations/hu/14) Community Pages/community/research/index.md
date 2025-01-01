---
title: Az Ethereum-kutatás aktív területei
description: Fedezze fel a nyitott kutatás különféle területeit, és hogy hogyan tud Ön is bekapcsolódni.
lang: hu
---

# Az Ethereum-kutatás aktív területei {#active-areas-of-ethereum-research}

Az Ethereum egyik fontos erőssége, hogy egy aktív kutatási és mérnöki közösség folyamatosan fejleszti. Számtalan lelkes és képzett ember a világ minden táján szeretné belevetni magát a jelenlegi problémák megoldásába, de gyakran nem könnyű megtalálni, hogy mik is a problémák. Ez az oldal körvonalazza a legfontosabb aktív kutatási területeket.

## Hogyan működik az Ethereum-kutatás {#how-ethereum-research-works}

Az Ethereum-kutatás nyitott és transzparens, a [decentralizált tudomány (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science) elveit testesítve meg. Olyan kultúrát követünk, amely a kutatási eszközöket és eredményeket olyan nyilvánossá és interaktívvá teszi, amennyire csak lehetséges, például a végrehajtható fájlok révén. Az Ethereum-kutatás gyorsan halad, az új eredményeket nyilvánosan posztolják és megvitatják az olyan fórumokon, mint az [ethresear.ch](https://ethresear.ch/), ahelyett hogy a hagyományos módon, a véleményezések után adnák ki a nyilvánosságnak.

## Általános kutatási források {#general-research-resources}

Minden téma gazdag forrásanyagban bővelkedik az [ethreser.ch](https://ethresear.ch) és az [Eth R&D Discord csatornán](https://discord.gg/qGpsxSA). Ezek a főbb helyek, ahol a kutatók megvitatják a legutóbbi ötleteket és fejlesztési lehetőségeket.

Ezt a riportot 2022. májusában készítette a [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum), melyben kiváló áttekintést adnak az Ethereum fejlesztési tervéről (roadmap).

## Finanszírozási források {#sources-of-funding}

Ön is bekapcsolódhat az Ethereum-kutatásba, és kereshet vele! Például az [Ethereum Alapítvány](/foundation/) nemrég adott [akadémikus finanszírozási támogatásokat](https://esp.ethereum.foundation/academic-grants). Az [Ethereum-támogatások oldalon](/community/grants/) megtalálhatja az aktív és jövőbeli finanszírozási lehetőségeket.

## Protokollkutatás {#protocol-research}

A protokollkutatás az Ethereum alaprétegével foglalkozik – szabályok összessége, hogy a csomópontok hogyan kapcsolódnak, kommunikálnak, cserélik és tárolják az adatot, és hogyan jutnak konszenzusra a blokklánc státuszát illetően. A protokollkutatás két fő kategóriára oszlik: konszenzus és végrehajtási.

### Konszenzus {#consensus}

A konszenzuskutatás az [Ethereum proof-of-stake mechanizmusával](/developers/docs/consensus-mechanisms/pos/) foglalkozik. Néhány példa:

- sebezhető pontok azonosítása és befedése;
- a kriptogazdasági biztonság mérése;
- a kliensbevezetések biztonságának vagy teljesítményének növelése;
- és könnyű kliensek fejlesztése.

Emellett a jövőbe előretekintő kutatások, a protokoll alapvető újratervezése, mint amilyen az egy sloton belüli véglegesedés is, jelentős fejlődést tudnának hozni az Ethereum számára. Továbbá a peer-to-peer hálózat hatékonysága, biztonsága és monitorozása a konszenzus kliensek között is fontos terület.

#### Háttérolvasmányok {#background-reading}

- [Bevezetés a proof-of-stake mechanizmusba](/developers/docs/consensus-mechanisms/pos/)
- [Casper-FFG dokumentáció](https://arxiv.org/abs/1710.09437)
- [Casper-FFG magyarázat](https://arxiv.org/abs/1710.09437)
- [Gasper dokumentáció](https://arxiv.org/abs/2003.03052)

#### Jelenlegi kutatás {#recent-research}

- [Ethresear.ch konszenzus](https://ethresear.ch/c/consensus/29)
- [Elérhetőségi/véglegességi dilemma](https://arxiv.org/abs/2009.04987)
- [Egy sloton belüli véglegesség](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Javaslattevő-építő elkülönítés](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Végrehajtás {#execution}

A végrehajtási réteg a tranzakciók feldolgozását végzi, az [Ethereum virtuális gépet (EVM)](/developers/docs/evm/) futtatja és végrehajtási csomagokat küld a konszenzusrétegnek. Számos aktív kutatási terület van, beleértve:

- a könnyű kliens támogatás kiépítése;
- gáz korlátok kutatása;
- és új adatstruktúrák (pl. Verkle-fák) beépítése.

#### Háttérolvasmányok {#background-reading-1}

- [Bevezetés az EVM-be](/developers/docs/evm)
- [Ethresear.ch konszenzusréteg](https://ethresear.ch/c/execution-layer-research/37)

#### Jelenlegi kutatás {#recent-research-1}

- [Adatbázis-optimalizálások](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Státuszlejárat](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [A státuszlejárathoz vezető út](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Verkle és státuszlejárat-javaslat](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Előzményadatok kezelése](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle-fák](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Adatelérhetőségi mintavétel](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Kliensfejlesztés {#client-development}

Az Ethereum kliensek az Ethereum protokoll implementációi. A kliensfejlesztés teszi lehetővé, hogy a protokoll kutatás eredményei valósággá váljanak azáltal, hogy ezekbe a kliensekbe beépítik azokat. A kliens fejlesztés magába foglalja a kliensspecifikációk frissítését és specifikus implementációk beépítését.

Az Ethereum-csomópontok két szoftvert futtatnak:

1. a konszenzuskliens a blokklánc elejét/fejét trekkeli, elterjeszti a blokkokat (pletyka) és kezeli a konszenzus logikáját
2. a végrehajtási kliens az Ethereum virtuális gépet támogatja, valamint a tranzakciókat és okosszerződéseket futtatja

Bővebb információkért tekintse át a [node-ok és kliensek oldalt](/developers/docs/nodes-and-clients/), ahol a jelenlegi kliensbevezetések listáját is megtalálja. Az Ethereum-fejlesztésekről is találhat információkat az [Ethereum története oldalon](/history/).

### Végrehajtási kliensek {#execution-clients}

- [Végrehajtásikliens-specifikáció](https://github.com/ethereum/execution-specs)
- [Végrehajtási API-specifikáció](https://github.com/ethereum/execution-apis)

### Konszenzuskliensek {#consensus-clients}

- [Konszenzuskliens-specifikáció](https://github.com/ethereum/consensus-specs)
- [Beacon API-specifikáció](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Skálázás és teljesítmény {#scaling-and-performance}

Az Ethereum skálázása egy hatalmas kutatási terület. A jelenlegi megközelítések felölelik a rollupokba történő tranzakciógyűjtést, ami az adatblobok használatával rendkívül olcsó lesz a felhasználók számára. A skálázás áttekintését megtalálja a [skálázási oldalon](/developers/docs/scaling).

### Második blokkláncréteg (L2) {#layer-2}

Jelenleg több második blokkláncréteg (L2) protokoll létezik, ami az Ethereumot skálázza, amelyek különféle technikákkal csomagolják össze a tranzakciókat és biztosítják azokat az L1 rétegen. Ez egy gyorsan fejlődő téma rengeteg kutatási és fejlesztési potenciállal.

#### Háttérolvasmányok {#background-reading-2}

- [Bevezetés az L2-be](/layer-2/)
- [Polynya: rollupok, adatelérhetőségi rétegek (DA) és moduláris láncok](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Jelenlegi kutatás {#recent-research-2}

- [A helyes sorbarendezés a szekvenszereknél az Arbitrumnál](https://eprint.iacr.org/2021/1465)
- [ethresear.ch L2](https://ethresear.ch/c/layer-2/32)
- [Rollupra fókuszáló ütemterv](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Hidak {#bridges}

Az L2 az egyik területe még több kutatást és fejlesztést igényel – ez pedig nem más, mint a hidak biztonsága és teljesítménye. Ez a különböző L2 megoldások közötti hidakra, valamint az L1 és L2 közötti hidakra vonatkozik. Fontos terület, mert gyakori célpontja a támadásoknak.

#### Háttérolvasmányok {#background-reading-3}

- [Bevezetés a blokklánchidak működésébe](/bridges/)
- [Vitalik a hidakról](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Blokklánc-hidak cikk](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [A hidakba ragadt érték](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Jelenlegi kutatás {#recent-research-3}

- [Hidak validálása](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Szilánkolás (sharding) {#sharding}

Az Ethereum-blokklánc shardingja már régóta része a terveknek. Míg az új skálázási megoldások, mint a Danksharding, mostanában kerülnek a középpontba.

A teljes Danksharding előzménye, a Proto-Danksharding a Cancun-Deneb („Dencun”) hálózati frissítéssel került bevezetésre.

[További információ a Dencun hálózatfrissítésről](/roadmap/dencun/)

#### Háttérolvasmányok {#background-reading-4}

- [Proto-Danksharding jegyzetek](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless Danksharding video](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Ethereum sharding kutatási összefoglaló](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Jelenlegi kutatás {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik a shardingról és az adatelérhetőségi mintavételről](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardver {#hardware}

A [csomópontok futtatása](/developers/docs/nodes-and-clients/run-a-node/) szerényebb hardvereken alapvető lenne az Ethereum decentralizáltan tartásához. Ezért a hardverszükségletek minimalizálása is fontos kutatási terület.

#### Háttérolvasmányok {#background-reading-5}

- [Ethereum az ARM-ról](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Jelenlegi kutatás {#recent-research-5}

- [ecdsa az FPGA-król](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Biztonság {#security}

A biztonság nagyon kiterjedt téma, beleértjük a szemetelés (spam) és család elleni védelmet, a tárca-, hardver- és kriptogazdasági biztonságot, az alkalmazások és kliensszoftverekben való hibakeresést és ezek tesztelését, valamint a kulcskezelést is. E területek mélyebb feltárása hozzájárul a szélesebb körű alkalmazáshoz.

### Kriptográfia & ZKP {#cryptography--zkp}

A zero-knowledge bizonyítékok (ZKP) és a kriptográfia kritikus a személyes adatok védelme és a biztonság szempontjából. A zero-knowledge egy viszonylag új, de gyorsan fejlődő ág, számos nyitott kutatási és fejlesztési lehetőségekkel. Néhány kiemelt lehetőség, például a hatékonyabb implementációja a [Keccak hashing algoritmusnak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), jobb polinomiális kommitmentek találása vagy az ecdsa nyilvános kulcsok és aláírás ellenőrző hálózatok költségének csökkentése.

#### Háttérolvasmányok {#background-reading-6}

- [0xparc blog](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Zero Knowledge podcast](https://zeroknowledge.fm/)

#### Jelenlegi kutatás {#recent-research-6}

- [Jelenlegi előrehaladás az elliptikus görbe kriptográfiában](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Tárcák {#wallets}

Az Ethereum-tárcák lehetnek böngészőkiterjesztések, asztali gépen és mobilon lévő alkalmazások vagy okosszerződések az Ethereumon. Aktív kutatás folyik a hagyományos módon visszaállítható tárcák területén, hogy az egyéni felhasználói kulcs kezelése kevesebb kockázatot jelentsen. A tárcák fejlődéséhez kapcsolódik az éppen születő kutatási terület a számlaabsztrakciók alternatív formáiról.

#### Háttérolvasmányok {#background-reading-7}

- [Bevezetés a tárcákba](/wallets/)
- [Bevezetés a tárcabiztonságba](/security/)
- [ethresear.ch biztonság](https://ethresear.ch/tag/security)
- [EIP-2938 Számlaabsztrakció](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Számlaabsztrakció](https://eips.ethereum.org/EIPS/eip-4337)

#### Jelenlegi kutatás {#recent-research-7}

- [Validációfókuszú okosszerződéses tárcák](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [A számlák jövője](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH és AUTHCALL opkódok](https://eips.ethereum.org/EIPS/eip-3074)
- [Kód publikálása egy EOA címen](https://eips.ethereum.org/EIPS/eip-5003)

## Közösség, oktatás és a felhasználók elérése {#community-education-and-outreach}

Az új felhasználók bevezetése az Ethereumra új oktatási anyagokat igényel és új megközelítéseket az emberek elérésére. Ezek lehetnek blogbejegyzések és cikkek, könyvek, podcastok, mémek, oktatási anyagok, események és bármi más, ami közösséget épít, fogadja az újonnan érkezőket és tanítja őket az Ethereumról.

### UX/UI {#uxui}

Ahhoz, hogy több embert lehessen bevezetni az Ethereum világába, fejleszteni kell a felhasználói élményt / kezelőfelületet (UX/UI). Ehhez a dizájnerek és termékszakértők meg kell vizsgálják a tárcák és alkalmazások dizájnját.

#### Háttérolvasmányok {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Jelenlegi kutatás {#recent-research-8}

- [Web3 tervezés Discord](https://discord.gg/FsCFPMTSm9)
- [Web3 tervezési elvek](https://www.web3designprinciples.com/)
- [Ethereum Magicians UX egyeztetések](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Gazdaság {#economics}

Az Ethereumban a gazdasági kutatás nagyjából két megközelítés mentén zajlik: a mechanizmusok biztonságának validálása, melyek a gazdasági ösztönzőkön alapulnak (mikroökonómia), valamint a protokoll, az alkalmazások és a felhasználók közötti értékáramlás elemzése (makroökonómia). Összetett kriptogazdasági tényezők állnak fenn az Ethereum saját eszközei (ether) és a rá épülő tokenek (mint NFT-k és ERC20 tokenek) kapcsán.

#### Háttérolvasmányok {#background-reading-9}

- [Robust Incentives Group](https://ethereum.github.io/rig/)
- [ETHconomics workshop a Devconnect-en](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Jelenlegi kutatás {#recent-research-9}

- [EIP1559 empírikus elemzése](https://arxiv.org/abs/2201.05574)
- [A kínálati egyensúly megközelítése](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [A MEV tényleges mennyisége: mennyire sötét az erdő?](https://arxiv.org/abs/2101.05511)

### Blokkméret és díjpiacok {#blockspace-fee-markets}

A blokkméretpiacok irányítják, hogy a felhasználó tranzakciói közvetlenül az Ethereumban (L1) vagy hidakkal összekötött hálózatokon keresztül (pl. rollupok (L2)) kerülnek-e be a blokkláncba. Az Ethereumon a tranzakciók a díjpiacra kerülnek, melyet az EIP-1559 mentén vezettek be a protokollba, hogy ne lehessen szemeteléssel (spam) és ártorlódással veszélyeztetni a láncot. Mindkét rétegen a tranzakciók externáliákat hoznak létre, melyet maximálisan kinyerhető értéknek (MEV) neveznek, és új piaci struktúrát eszközölt, hogy ezt megszerezze vagy kezelje.

#### Háttérolvasmányok {#background-reading-10}

- [A tranzakciós díj mechanizmusterve az Ethereum blokkláncra: Az EIP-1559 gazdasági elemzése (Tim Roughgarden, 2020.)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559 szimulációk (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Rollupok gazdasága az első elvektől](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: beelőzés (frontrunning), tranzakcióátrendezés és konszenzusinstabilitás a decentralizált tőzsdéken](https://arxiv.org/abs/1904.05234)

#### Jelenlegi kutatás {#recent-research-10}

- [Multidimenzionális EIP-1559 videoprezentáció](https://youtu.be/QbR4MTgnCko)
- [Területek közötti MEV](http://arxiv.org/abs/2112.01472)
- [MEV-aukciók](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Proof-of-stake ösztönzők {#proof-of-stake-incentives}

A validátorok az Ethereum saját eszközét (ether) használják fedezetként a rosszhiszemű viselkedés ellen. Ennek kriptogazdasága határozza meg a hálózat biztonságát. A szofisztikált validátorok talán képesek kihasználni az ösztönző réteg finom részleteit, hogy támadást indítsanak.

#### Háttérolvasmányok {#background-reading-11}

- [Ethereum gazdasági mesterkurzus és gazdasági modell](https://github.com/CADLabs/ethereum-economic-model)
- [A PoS ösztönzők szimulációja (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Jelenlegi kutatás {#recent-research-11}

- [A tranzakciók cenzúrának való ellenállásának növelése a javaslattevő/építő elkülönítéssel (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Három támadás a PoS Ethereumon](https://arxiv.org/abs/2110.10086)

### Likvid letétbe helyezés és derivatívák {#liquid-staking-and-derivatives}

A likvid letétbe helyezés lehetővé teszi, hogy a 32 ETH-nél kevesebbel rendelkező felhasználók is részesüljenek jutalomban azáltal, hogy az ETH-t átváltják letétbe helyezett ethert képviselő tokenre, amit a decentralizált pénzügyekben (DeFi) használni lehet. Ugyanakkor az ezzel kapcsolatos ösztönzők és piaci dinamizmusok még feltárásra várnak, az Ethereum biztonságra gyakorolt hatásukkal együtt (pl. centralizáció kockázata).

#### Háttérolvasmányok {#background-reading-12}

- [Ethresear.ch likvid letétbe helyezés](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: A bizalomigénymentes letétbe helyezéshez vezető út az Ethereumon](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Bevezető a letétbe helyezési protokollba](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Jelenlegi kutatás {#recent-research-12}

- [A Lido-tól való visszavonások kezelése](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [A visszavonási hitelesítő adatok](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [A likvid letéti derivatívák kockázatai](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Tesztelés {#testing}

### Formális ellenőrzés {#formal-verification}

A formális ellenőrzés egy olyan kód, amely igazolja, hogy az Ethereum konszenzusspecifikációi helyesek, és nincs bennük hiba. A specifikációnak van egy végrehajtható verziója, melyet Python nyelven írtak, és ami fenntartást és fejlesztést igényel. A kutatás segíthet feltárni ennek a specifikációimplementációnak a fejlesztési lehetőségeit, és eszközöket biztosíthat, hogy az ellenőrzés robusztusabb legyen.

#### Háttérolvasmányok {#background-reading-13}

- [Bevezetés a formális ellenőrzésbe](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Formális ellenőrzés (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Jelenlegi kutatás {#recent-research-13}

- [A letéti szerződés formális ellenőrzése](https://github.com/runtimeverification/deposit-contract-verification)
- [A Beacon-lánc specifikációjának formális ellenőrzése](https://github.com/runtimeverification/deposit-contract-verification)

## Adattudomány és elemzés {#data-science-and-analytics}

Több adatelemzési eszközre és irányítópultra van szükség, hogy részletes adatokat nyújtson az Ethereum működéséről és a hálózat egészségéről.

### Háttérolvasmányok {#background-reading-14}

- [Dune elemzések](https://dune.com/browse/dashboards)
- [Kliensdiverzitási irányítópult](https://clientdiversity.org/)

#### Jelenlegi kutatás {#recent-research-14}

- [Robust Incentives Group adatelemzése](https://ethereum.github.io/rig/)

## Alkalmazások és eszközök {#apps-and-tooling}

Az alkalmazási réteg a programok kiterjedt ökoszisztémáját támogatja, melyek tranzakciókat hajtanak végre az Ethereum alaprétegén. A fejlesztői csapatok állandón új utakat találnak az Ethereum felhasználására, hogy átjárható, engedélymentes és cenzúrának ellenálló alkalmazásokat készítsenek, egyrészt a fontos web2 eszközök mását, másrészt teljesen új web3-koncepciókat. Eközben olyan új eszközöket fejlesztenek, melyekkel a dappok Ethereumra való építése kevésbé bonyolulttá válik.

### DeFi {#defi}

A decentralizált pénzügyek (DeFi) az egyik elsődleges alkalmazáscsoport, melyet az Ethereumra építettek. Ennek célja az egymásra illeszthető „pénz építőkockák” létrehozása, amellyel a felhasználók tárolnak, küldenek, kölcsönöznek, kölcsönvesznek és befektetnek kriptoeszközöket az okosszerződések használatával. A DeFi egy gyorsan fejlődő terület, mely folyamatosan megújul. Folyamatos igény van a biztonságos, hatékony és elérhető protokollokra.

#### Háttérolvasmányok {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Mi az a DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Jelenlegi kutatás {#recent-research-15}

- [Decentralizált pénzügyek, centralizált tulajdonjog?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: A sub-dollár tranzakciókhoz vezető út](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO-k {#daos}

Az Ethereum képes arra, hogy decentralizált módon irányítson a decentralizált autonóm szervezetek (DAO) segítségével. Sok aktív kutatás folyik, hogy hogyan lehetne fejleszteni a DAO-kat az Ethereumon, felhasználni azokat az irányítás fejlettebb formáira, mint egy minimális bizalmat igénylő, koordinációs eszköz, mely nagyban kiterjeszti az emberek opcióit a hagyományos szervezeteken túlra.

#### Háttérolvasmányok {#background-reading-16}

- [Bevezetés a DAO-kba](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Jelenlegi kutatás {#recent-research-16}

- [A DAO ökoszisztéma térképe](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Fejlesztői eszközök {#developer-tools}

Az Ethereum-fejlesztők eszközei gyorsan fejlődnek. Ezen a területen is sok aktív kutatás folyik.

#### Háttérolvasmányok {#background-reading-17}

- [Eszközök programozási nyelv szerint](/developers/docs/programming-languages/)
- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)
- [Konszenzusfejlesztői eszközök listája](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Tokenszabványok](/developers/docs/standards/tokens/)
- [CryptoDevHub: EVM eszközök](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Jelenlegi kutatás {#recent-research-17}

- [Eth R&D Discord konszenzus eszközök csatornája](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Orákulumok {#oracles}

Az orákulumok importálják be a láncon kívüli adatokat a blokkláncra egy engedélymentes és decentralizált módon. Mivel ez az adat a láncon belül van, ezért a dappok képesek lekövetni a világ változásait, mint a valódi eszközök árfluktuációja, a láncon kívüli alkalmazások adatai vagy akár az időjárásváltozás.

#### Háttérolvasmányok {#background-reading-18}

- [Bevezetés az orákulumokba](/developers/docs/oracles/)

#### Jelenlegi kutatás {#recent-research-18}

- [A blokklánc-orákulumok áttekintése](https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlink fehérkönyv](https://chain.link/whitepaper)

### Alkalmazások biztonsága {#app-security}

Az Ethereum elleni támadások általában az egyéni alkalmazások gyenge pontjait használják ki, nem a protokollét. A támadók és az alkalmazásfejlesztők egy fegyverkezési versenybe kényszerültek, hogy új támadásokat és új védekezéseket fejlesszenek. Ebből az következik, hogy mindig fontos a kutatás és fejlesztés, hogy az alkalmazások biztonságban legyenek.

#### Háttérolvasmányok {#background-reading-19}

- [Féreglyuk-kihasználási jelentés](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Az Ethereum-szerződések meghackelésének vizsgálatai](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt hírek](https://twitter.com/RektHQ?s=20\&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Jelenlegi kutatás {#recent-research-19}

- [ethresear.ch alkalmazások](https://ethresear.ch/c/applications/18)

### Technológiai stack {#technology-stack}

A teljes Ethereum-technológiai köteg decentralizálása is egy érdekes kutatási terület. Jelenleg az Ethereum dappoknak gyakran vannak centralizációs pontjai, mert központi eszközökön vagy infrastruktúrán alapulnak.

#### Háttérolvasmányok {#background-reading-20}

- [Ethereum stack](/developers/docs/ethereum-stack/)
- [Coinbase: Bevezetés a web3 stackbe](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Bevezetés az okosszerződésekbe](/developers/docs/smart-contracts/)
- [Bevezetés a decentralizált tárhelybe](/developers/docs/storage/)

#### Jelenlegi kutatás {#recent-research-20}

- [Okosszerződések összeilleszthetősége](/developers/docs/smart-contracts/composability/)
