---
title: Blokkláncadat-tárolási stratégiák
description: Többféle módon is lehet adatokat tárolni a blokklánc használatával. Ez a cikk összeveti a különféle stratégiákat, azok költségét és átváltásait, valamint a biztonságos használat feltételeit.
lang: hu
---

Többféle módon lehet információt tárolni vagy közvetlenül a blokkláncon, vagy olyan módon, hogy azt a blokklánc biztosítja:

- EIP-4844 blobok
- Calldata
- Láncon kívül L1 mechanizmusokkal
- Szerződés „kódja”
- Események
- EVM-tárhely

A módszer kiválasztása számos feltételtől függ:

- Az információ forrása. A calldata mezőben lévő információ nem származhat közvetlenül a blokkláncról.
- Az információ célállomása. A calldata csak az általa kezdeményezett tranzakcióban érhető el. Az események egyáltalán nem érhetők el a láncon.
- Mekkora erőfeszítés elfogadható? A teljes csomópontot futtató számítógépek többet dolgoznak, mint egy könnyű kliens egy alkalmazásban, mely böngészőben fut.
- Szükséges, hogy minden csomópont könnyedén elérje az információt?
- Biztonsági követelmények.

## Biztonsági követelmények {#security-requirements}

Általánosságban az információs biztonság három jellemzővel bír:

- _Titkosság_, vagyis a felhatalmazással nem rendelkező entitások nem olvashatják el az információt. Ez sok helyen fontos, de itt nem. _A blokkláncon nincsenek titkok_. A blokklánc működésének alapja, hogy bárki ellenőrzini tudja a státuszváltozásokat, ezért közvetlen módon nem használható titkok tárolására. Vannak módok, hogy bizalmas információkat tároljanak blokkláncon, de ezek valami láncon kívüli elemen alapulnak, hogy legalább egy kulcsot ott tároljanak.

- _Integritás_, vagyis az információ korrekt, azt nem változtathatják meg olyanok, akik arra nincsenek felhatalmazva, vagy nem engedélyezett módokon (például [ERC-20 tokenek](https://eips.ethereum.org/EIPS/eip-20#events) küldése a „Transfer” esemény nélkül). A blokkláncon minden csomópont ellenőriz minden státuszváltozást, mely biztosítja az integritást.

- _Elérhetőség_, vagyis az információ elérhető minden arra felhatalmazott entitásnak. A blokkláncon ezt úgy érik el, hogy az információ minden [teljes csomóponton](https://ethereum.org/developers/docs/nodes-and-clients#full-node) elérhető.

Ezek a megoldások mind kiváló integritással bírnak, mert a hash-eket az L1-en rögzítik. De más elérhetőségi biztosítékaik vannak.

## Előfeltételek {#prerequisites}

A jelen téma könnyebb megértéséhez érdemes ismerni a [blokklánc alapjait](/developers/docs/intro-to-ethereum/). Ez az oldal azt is feltételezi, hogy az olvasó ismeri a [blokkokat](/developers/docs/blocks/), [tranzakciókat](/developers/docs/transactions/) és más kapcsolódó témákat.

## EIP-4844 blobok {#eip-4844-blobs}

[A Dencun végleges elágazás](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) óta az Ethereum blokklánc tartalmazza az [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) változást, ami az Ethereumhoz adatblobokat illesztett, melyek rövid ideig, kb. [18 napig](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) elérhetőek. Ezeket a blobokat külön árazzák, a [végrehajtási gáztól](/developers/docs/gas) függetlenül, bár hasonló mechanizmussal. Ez egy olcsó megoldás átmeneti adatok tárolására.

Az EIP-4844 blobok fő használati területe az összevont tranzakciók, hogy az általuk feldolgozott tranzakciók bekerüljenek az L1-re. Az [optimista rollupoknak](/developers/docs/scaling/optimistic-rollups) publikálni kell a tranzakciókat a blokkláncon. Ezeknek a tranzakcióknak elérhetőnek kell lenniük bárki számára a [megkérdőjelezési periódusban](https://docs.optimism.io/connect/resources/glossary#challenge-period), hogy a [validátorok](https://docs.optimism.io/connect/resources/glossary#validator) kijavíthassák a hibát, ha a rollup [szekvencer](https://docs.optimism.io/connect/resources/glossary#sequencer) rossz státuszgyökeret posztol.

Ugyanakkor a megkérdőjelezési periódus után a státuszgyökér véglegessé válik, a tranzakciók további lényege az marad, hogy a lánc jelen státuszát újra lehessen alkotni. Ez a státusz elérhető a lánc csomópontjaiból is, melyhez kevesebb erőfeszítés szükséges. Így a tranzakciókról szóló információ megmarad néhány helyen, mint amilyenek a [blokkfelfedezők](/developers/docs/data-and-analytics/block-explorers), de nincs szükség arra a cenzúrának való ellenállásra, amit az Ethereum biztosít.

A [zero-knowledge rollupok](/developers/docs/scaling/zk-rollups/#data-availability) is posztolják a tranzakciós adatokat, hogy más csomópontok replikálni tudják a státuszt és ellenőrizhessék az érvényességi bizonyítékokat, de ez is egy rövid távú igény.

A jelen írás idején az EIP-4844-gyel a költség egy wei (10<sup>-18</sup> ETH) bájtonként, ami elhanyagolható [a 21,000 végrehajtási gázhoz képest, amibe bármelyik tranzakció kerül, beleértve azt, ami blobokat is posztol](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Az EIP-4844 árakat a következő oldalon tekintheti meg: [blobscan.com](https://blobscan.com/blocks).

A következőben láthatók azok a címek, melyekre néhány ismert rollup posztolja a blobokat.

| Rollup                               | Postafiók címe                                                                                                          |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

A calldata azokat a bájtokat jelenti, melyeket a tranzakció részeként küldenek. Ez a blokklánc állandó tárhelyének része a blokkban, amely az adott tranzakciót tartalmazza.

Így lehet a legolcsóbban adatot tenni a blokkba állandó tárolásra. A bájtonkénti költsége 4 végrehajtási gáz (ha a bájt nulla) vagy 16 gáz (minden más értéknél). Ha az adat tömörítve van, ami egy bevett gyakorlat, akkor minden bájtérték ugyanolyan valószínű, így az átlagköltség kb. 15,95 gáz bájtonként.

A jelen írás idején az ár 12 gwei/gáz és 2300 $/ETH, mely szerint a költség kb. 45 cent kilóbájtonként. Mivel az EIP-4844 előtt ez volt a legolcsóbb módszer, ezért a rollupok így tárolták a tranzakciós információkat, hogy azok elérhetők legyenek a [hiba kivizsgálásra](https://docs.optimism.io/stack/protocol/overview#fault-proofs), de nem kell azokat közvetlenül elérni a láncon.

A következőben láthatóak azok a címek, melyekre néhány ismert rollup posztolja a tranzakciókat.

| Rollup                               | Postafiók címe                                                                                                                |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Láncon kívül L1 mechanizmusokkal {#offchain-with-l1-mechs}

A biztonsági megfontolások alapján talán elfogadható, hogy az információ máshol található, és egy mechanizmus biztosítja az elérhetőségét. Ez két feltétellel működhet:

1. Az adat [hashét](https://en.wikipedia.org/wiki/Cryptographic_hash_function) a blokkláncra kell posztolni, melyet _input rögzítésnek_ neveznek. Ez lehet egy 32 bájtos szó, ami nem kerül sokba. Amíg az input rögzítése elérhető, az integritás biztosítva van, mert nem lesz más adat, aminek a hashe ugyanarra mutatna. Ha a helyes adat elérhető, akkor azt meg lehet találni.

2. Szükség van egy mechanizmusra, mellyel elérhetővé válik az adat. Például a [Redstone](https://redstone.xyz/docs/what-is-redstone) esetében bármelyik csomópont indíthat elérhetőségi kihívást. Ha a szekvencer nem válaszol online a határidőig, az inputrögzítést elvetik, így az információt úgy veszik, mintha sosem lett volna beposztolva.

Ez elfogadható az optimista rollup esetén, mert arra támaszkodunk, hogy legalább egy jóhiszemű ellenőrző van a státuszgyökérre. Egy ilyen jóhiszemű ellenőrző azt is biztosítja, hogy az adat létezik a blokk feldolgozásához, és egy elérhetőségi kihívást ad ki, ha az információ nem elérhető a láncon kívül. Ezt a fajta optimista rollupot nevezik [plazmának](/developers/docs/scaling/plasma/).

## Szerződéskód {#contract-code}

Az információ, melyet csak egyszer kell rögzíteni, sosem lesz felülírva, és a láncon belül elérhetőnek kell lennie, szerződéskódként is tárolható. Tehát készítünk egy „okosszerződést” az adattal, majd a [EXTCODECOPY](https://www.evm.codes/#3c?fork=shanghai) paranccsal kiolvassuk az információt. Ennek előnye az, hogy a kód másolása viszonylag olcsó.

A memória kibővítésének költségén kívül az EXTCODECOPY 2600 gázba kerül, amikor a szerződéshez először férnek hozzá (amikor az „hideg”) és 100 gázba kerülnek a további másolatok, plusz 3 gázba 32 bájtnyi szavanként. A calldata-hoz képes, ami 15,95-be kerül bájtonként, ez kevesebb kb. 200 bájttól kezdve. [A memória kibővéítés költségének képlete](https://www.evm.codes/about#memoryexpansion) alapján, amíg nincs szükség több mint 4 MB memóriára, ez a bővítési költség kisebb, mint a calldata hozzáadása.

Természetesen ez csak az adat _kiolvasása_. A szerződés létrehozásánek költsége kb. 32 000 gáz + 200 gáz/bájt. Ez csak akkor éri meg, ha az adott információt többször kell kiolvasni különféle tranzakciók során.

A szerződéskód lehet értelmetlen, amíg nem kezdődik 0xEF-fel. Ha a szerződés kezdete 0xEF, akkor az egy [ethereum objektum formátum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), amelynek szigorúbb követelményeknek kell megfelelnie.

## Események {#events}

Az [eseményeket](https://docs.alchemy.com/docs/solidity-events) az okosszerződések adják ki, és a láncon kívüli szoftverek olvassák azokat.
Előnye az, hogy a láncon kívüli kód képes értelmezni az eseményeket. A költsége 375 [gáz](https://www.evm.codes/#a0?fork=cancun) plusz 8 gáz bájtonként. Ha 12 gwei/gáz és 2300 $/ETH, akkor ez 1 cent plusz 22 cent kilóbájtonként.

## Tárhely {#storage}

Az okosszerződések hozzáférnek az [állandó tárhelyhez](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Ez azonban nagyon drága. Egy 32 bájtos szó beírása egy üres helyre [belekerülhet akár 22 100 gázba is](https://www.evm.codes/#55?fork=cancun). Ha 12 gwei/gáz és 2300 $/ETH, akkor ez 61 cent minden írásra, vagy 19,5 $ kilóbájtonként.

Ez a legdrágább tárolás az Ethereumon.

## Összefoglaló {#summary}

Ez a táblázat összefoglalja a különböző opciókat azok előnyeivel és hátrányaival együtt.

| Tárolási típus                   | Adatforrás                | Elérhetőségi garancia                                                                                                                                  | Láncon belüli elérhetőség                                                         | További korlátozások                                       |
| -------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| EIP-4844 blobok                  | Láncon kívüli             | Az Ethereum garantálja [kb. 18 napig](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Csak a hash elérhető                                                              |                                                            |
| Calldata                         | Láncon kívüli             | Az Ethereum garantálja örökre (része a blokkláncnak)                                                                                | Csak akkor elérhető, ha egy szerződésbe van írva, és abban az adott tranzakcióban |                                                            |
| Láncon kívül L1 mechanizmusokkal | Láncon kívüli             | Legalább egy jóhiszemű ellenőrző garantálja a kihívási periódus alatt                                                                                  | Csak hash                                                                         | A kihívási mechanizmus garantálja a kihívási időszak alatt |
| Szerződéskód                     | Láncon belüli vagy kívüli | Az Ethereum garantálja örökre (része a blokkláncnak)                                                                                | Igen                                                                              | Egy „véletlenszerű” címre van írva, nem kezdődhet 0xEF-fel |
| Események                        | Láncon belüli             | Az Ethereum garantálja örökre (része a blokkláncnak)                                                                                | Nem                                                                               |                                                            |
| Tárhely                          | Láncon belüli             | Az Ethereum garantálja örökre (része a blokkláncnak és a jelen státusznak addig, amíg felül nem írják)                              | Igen                                                                              |                                                            |
