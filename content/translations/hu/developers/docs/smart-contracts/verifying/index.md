---
title: Okosszerződések érvényesítése
description: Az Ethereum okosszerződések forráskódjának ellenőrzési folyamata
lang: hu
---

Az [okosszerződéseket](/developers/docs/smart-contracts/) úgy tervezték, hogy „bizalom nélküliek” legyenek, vagyis a felhasználóknak ne kelljen megbízniuk harmadik félben (például fejlesztőkben és vállalatokban), mielőtt kapcsolatba lépnének egy szerződéssel. A bizalomigény nélküliség feltétele, hogy a felhasználók és más fejlesztők képesek ellenőrizni az okosszerződés forráskódját. A forráskód-ellenőrzés biztosítja a felhasználók és a fejlesztők számára, hogy a közzétett szerződéskód ugyanaz, ami a szerződés címén fut az Ethereum blokkláncon.

Fontos különbséget tenni a forráskód-ellenőrzés és a "[formális ellenőrzés](/developers/docs/smart-contracts/formal-verification/)" között. A forráskód-ellenőrzés, amelyet ez a cikk részletesen ismertet, arra vonatkozik, hogy egy okosszerződés forráskódja egy magas szintű nyelven (mint a Solidity) lefordítható-e ugyanarra a bájtkódra, amelyet a szerződés címén végre kell hajtani. A formális ellenőrzés ugyanakkor az okosszerződés helyességének ellenőrzését írja le, ami azt jelenti, hogy a szerződés az elvárásoknak megfelelően viselkedik. Bár a kontextustól függ, a szerződés-ellenőrzés általában a forráskód ellenőrzésére utal.

## Mi az a forráskód-ellenőrzés? {#what-is-source-code-verification}

Mielőtt egy okosszerződést a [Ethereum virtuális gépen (EVM)](/developers/docs/evm/) telepítenének, a fejlesztők [átfordítják](/developers/docs/smart-contracts/compiling/) a szerződés forráskódját – a [Solidity](/developers/docs/smart-contracts/languages/) vagy más magas szintű programozási nyelven írt utasításokat – bájtkódra. Mivel az EVM nem tudja értelmezni a magas szintű utasításokat, a forráskód bájtkódra (azaz alacsony szintű, gépi utasításokra) történő fordítása szükséges a szerződés logikájának EVM-ben való végrehajtásához.

A forráskód-ellenőrzés az okosszerződés forráskódjának és a szerződés létrehozásakor használt átfordított bájtkódnak az összehasonlítása azért, hogy a lehetséges különbségeket észrevegyék. Az okosszerződések ellenőrzése azért fontos, mert a nyilvánossá tett szerződéskód eltérhet attól, ami a blokkláncon fut.

Az okosszerződések ellenőrzése lehetővé teszi annak vizsgálatát, hogy mit csinál egy szerződés a magasabb szintű nyelven, amelyen meg van írva, anélkül, hogy gépi kódot kellene olvasni. A függvények, értékek és általában a változók nevei és megjegyzései ugyanazok maradnak, mint a lefordított és telepített eredeti forráskódban. Ez sokkal könnyebbé teszi a kódolvasást. A forráshitelesítés a kód dokumentációját is biztosítja, hogy a végfelhasználók tudják, mire tervezték azt.

### Mi az a teljes körű ellenőrzés? {#full-verification}

A forráskódnak vannak olyan részei, amelyek nem befolyásolják a lefordított bájtkódot, mint például a megjegyzések vagy a változónevek. Ez azt jelenti, hogy két különböző változónevű és különböző megjegyzésekkel rendelkező forráskód is képes lenne ugyanazt a szerződést ellenőrizni. Ezzel egy rosszindulatú szereplő megtévesztő megjegyzéseket adhat hozzá vagy félrevezető változóneveket adhat a forráskódon belül, és a szerződést az eredetitől eltérő forráskóddal hitelesítheti.

Ezt úgy lehet elkerülni, hogy a bájtkódhoz további adatokat csatolunk, amelyek a forráskód pontosságának _kriptográfiai garanciájaként_ és az átfordítási információk _ujjlenyomataként_ szolgálnak. A szükséges információkat a [Solidity szerződési metaadataiban](https://docs.soliditylang.org/en/v0.8.15/metadata.html) találjuk, és ennek a fájlnak a hashe a szerződés bájtkódjához van csatolva. Ezt működés közben is láthatja a [metaadatok játszótéren](https://playground.sourcify.dev)

A metaadatfájl tartalmazza a szerződés összeállítására vonatkozó információkat, beleértve a forrásfájlokat és azok hashét is. Ez azt jelenti, hogy ha bármelyik fordítási beállítás vagy akár csak egy bájt is megváltozik az egyik forrásfájlban, a metaadatfájl is megváltozik. Következésképpen a bájtkódhoz csatolt metaadatfájl hashe is megváltozik. Ez azt jelenti, hogy ha egy szerződés bájtkódja és a hozzáfűzött metaadatok hashe egyezik a megadott forráskóddal és az átfordítási beállításokkal, akkor ez pontosan ugyanaz a forráskód, amit az eredeti fordítás során használtunk, és egyetlen bájt sem különbözik.

Ezt a metaadatok hashét használó ellenőrzést nevezzük **"[teljes vagy tökéletes ellenőrzésnek](https://docs.sourcify.dev/docs/full-vs-partial-match/)"**. Ha a metaadathashek nem egyeznek, vagy nem veszik figyelembe az ellenőrzés során, akkor „részleges egyezésről” van szó, ami jelenleg a szerződésellenőrzés elterjedtebb módja. Lehetőség van [olyan rosszindulatú kód](https://samczsun.com/hiding-in-plain-sight/) beillesztésére, amelyet csak a teljes ellenőrzés mutat ki. A legtöbb fejlesztő nem ismeri a teljes ellenőrzést, és nem őrzi meg az átfordítás metaadatfájlját, ezért eddig a részleges ellenőrzés volt az alapvető módszer.

## Miért fontos a forráskód-ellenőrzés? {#importance-of-source-code-verification}

### Bizalomigénytől való mentesség {#trustlessness}

A bizalomigénytől való mentesség az okosszerződések és a [decentralizált alkalmazások (dapp)](/developers/docs/dapps/) legfontosabb előfeltétele. Az okosszerződések alapvetően megváltoztathatatlanok, nem módosíthatók; egy szerződés a telepítés időpontjában a kódban meghatározott üzleti logikát hajtja végre. Ez azt jelenti, hogy a fejlesztők és a vállalatok nem tudják manipulálni a szerződés kódját az Ethereumra való telepítés után.

Ahhoz, hogy egy okosszerződés megbízható legyen, a szerződés kódjának elérhetőnek kell lennie független ellenőrzésre. Bár minden okosszerződés lefordított bájtkódja nyilvánosan elérhető a blokkláncon, az alacsony szintű nyelv nehezen érthető a fejlesztők és a felhasználók számára.

A projektek a szerződések forráskódjának közzétételével csökkentik a bizalmi feltételezéseket. Ez azonban egy másik problémához vezet: nehéz ellenőrizni, hogy a közzétett forráskód megegyezik-e a szerződéses bájtkóddal. Ebben a forgatókönyvben a bizalomigénytől való mentesség elvész, mivel a felhasználóknak meg kell bízniuk a fejlesztőkben, hogy nem változtatják meg a szerződés üzleti logikáját (például a bájtkód megváltoztatásával), mielőtt azt a blokkláncra telepítenék.

A forráskód-ellenőrző eszközök garanciát nyújtanak arra, hogy az intelligens szerződés forráskódfájljai megegyeznek az assembly (összeszerelési) kóddal. Az eredmény egy bizalomigény nélküli ökoszisztéma, ahol a felhasználók nem bíznak vakon harmadik félben, hanem a kódot ellenőrzik, mielőtt pénzt helyeznének el egy szerződésben.

### Felhasználói biztonság {#user-safety}

Az okosszerződések esetében sok pénz foroghat kockán. Ez magasabb biztonsági garanciákat és az okosszerződés logikájának ellenőrzését igényli a használat előtt. A probléma az, hogy a rosszhiszemű fejlesztők megtéveszthetik a felhasználókat azzal, hogy rosszindulatú kódot illesztenek az okosszerződésbe. Ellenőrzés nélkül a rosszindulatú okosszerződések [hátsó ajtókkal](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), ellentmondásos hozzáférés-szabályozási mechanizmusokkal, kihasználható sebezhetőségekkel és egyéb, a felhasználók biztonságát veszélyeztető dolgokkal rendelkezhetnek, amelyek észrevétlenül maradnának.

Az okosszerződés forráskódfájljainak közzététele megkönnyíti az érdeklődők, például az auditorok számára, hogy értékeljék a szerződést a potenciális támadási vektorok szempontjából. Ha több fél egymástól függetlenül ellenőrzi az okosszerződést, a felhasználók nagyobb garanciát kapnak annak biztonságára.

## Hogyan ellenőrizhetjük az Ethereum okosszerződések forráskódját {#source-code-verification-for-ethereum-smart-contracts}

[Egy okosszerződés Ethereumon történő telepítéséhez](/developers/docs/smart-contracts/deploying/) egy tranzakciót kell elküldeni egy speciális címre, amely egy adatcsomagot (lefordított bájtkódot) tartalmaz. Az adatcsomag úgy jön létre, hogy a forráskódot átfordítják, valamint hozzáillesztik a tranzakcióban az adatcsomaghoz csatolt szerződéspéldány [konstruktori argumentumait](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor). A fordítás determinisztikus, ami azt jelenti, hogy mindig ugyanazt a kimenetet (azaz szerződéses bájtkódot) produkálja, ha ugyanazokat a forrásfájlokat és fordítási beállításokat (például fordítóverzió, optimalizáló) használjuk.

![Az okosszerződés forráskódjának ellenőrzését bemutató diagram](./source-code-verification.png)

Az okosszerződés ellenőrzése alapvetően a következő lépésekből áll:

1. A forrásfájlok és a fordítási beállítások bevitele a fordítóprogramba.

2. A fordító kiadja a szerződés bájtkódját

3. A telepített szerződés bájtkódjának lekérdezése egy adott címen

4. A telepített bájtkód összehasonlítása az újrafordított bájtkóddal. Ha a kódok egyeznek, a szerződés a megadott forráskóddal és a fordítási beállításokkal kerül ellenőrzésre.

5. Továbbá, ha a metaadatok hashe a bájtkód végén megegyezik, akkor ez egy teljes egyezés.

Vegye figyelembe, hogy ez egy leegyszerűsített leírása az ellenőrzésnek, és számos olyan kivétel van, amelyek nem működik ilyen módon, mint például a [megmásíthatatlan változók](https://docs.sourcify.dev/docs/immutables/).

## Forráskód-ellenőrző eszközök {#source-code-verification-tools}

A szerződések ellenőrzésének hagyományos folyamata összetett lehet. Ezért vannak eszközeink az Ethereumon telepített okosszerződések forráskódjának ellenőrzésére. Ezek az eszközök automatizálják a forráskód-ellenőrzés nagy részét, és a felhasználók számára előnyös, ellenőrzött szerződéseket is összeállítanak.

### Etherscan {#etherscan}

Bár leginkább [Ethereum-blokkláncfelfedezőként](/developers/docs/data-and-analytics/block-explorers/) ismerik, az Etherscan [forráskód-ellenőrzési szolgáltatást](https://etherscan.io/verifyContract) is kínál az okosszerződések fejlesztőinek és felhasználóinak.

Az Etherscan lehetővé teszi a szerződés bájtkódjának újrafordítását az eredeti adatcsomagból (forráskód, könyvtárcím, fordítói beállítások, szerződés címe stb.). Ha az újrafordított bájtkód a láncon belüli szerződés bájtkódjához (és konstruktor paramétereihez) kapcsolódik, akkor [a szerződés ellenőrzött](https://info.etherscan.com/types-of-contract-verification/).

Ezt követően az Ön szerződésének forráskódja megkapja az „Ellenőrzött” címkét, és közzéteszik az Etherscan oldalon, hogy mások is ellenőrizhessék. A szerződés bekerül a [Hitelesített szerződések](https://etherscan.io/contractsVerified/) szekcióba, vagyis az ellenőrzött forráskódú okosszerződések tárházába.

Az Etherscan a leggyakrabban használt eszköz a szerződések ellenőrzésére. Az Etherscan szerződés-ellenőrzésének azonban van egy hátránya: nem hasonlítja össze a láncon belüli és az újrafordított bájtkód **metaadat hash** értékét. Ezért az Etherscanben szereplő egyezések részlegesek.

[Bővebben a szerződések ellenőrzéséről az Etherscanen](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Sourcify {#sourcify}

A [Sourcify](https://sourcify.dev/#/verifier) egy másik nyílt forráskódú és decentralizált eszköz a szerződések ellenőrzésére. Ez nem blokkfelfedező, és csak a [különböző EVM-alapú hálózatokon](https://docs.sourcify.dev/docs/chains) kötött szerződéseket ellenőrzi. Nyilvános infrastruktúraként működik, amelyre más eszközök építhetnek, és célja, hogy a metaadatfájlban található [ABI](/developers/docs/smart-contracts/compiling/#web-applications) és [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) megjegyzések segítségével felhasználóbarát szerződéses interakciókat tegyen lehetővé.

Az Etherscannal ellentétben a Sourcify támogatja a metaadatok hashsel való teljes egyeztetést. Az ellenőrzött szerződéseket a [nyilvános adattárban](https://docs.sourcify.dev/docs/repository/) HTTP-n és [IPFS-en](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), egy decentralizált, [tartalomcímzett](https://web3.storage/docs/concepts/content-addressing/) tárolóban jeleníti meg. Ez lehetővé teszi egy szerződés metaadatfájljának IPFS-en keresztüli lehívását, mivel a csatolt metaadat hash egy IPFS hash.

Ezenkívül a forráskódfájlokat is lekérdezhetjük az IPFS-en keresztül, mivel a metaadatokban megtalálhatók ezen fájlok IPFS hashei is. Egy szerződés a metaadatfájl és a forrásfájlok megadásával is ellenőrizhető az API vagy [UI](https://sourcify.dev/#/verifier) révén, illetve a bővítmények használatával. A Sourcify monitoring eszköz figyeli az új blokkok szerződéseinek létrehozását is, és megpróbálja ellenőrizni a szerződéseket, ha azok metaadatait és forrásfájljait közzéteszik az IPFS-en.

[Bővebben a szerződések ellenőrzéséről a Sourcify oldalon](https://blog.soliditylang.org/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

A [Tenderly platform](https://tenderly.co/) lehetővé teszi a web3-fejlesztők számára az okosszerződések létrehozását, tesztelését, felügyeletét és működtetését. A Tenderly segít a fejlesztőknek felgyorsítani az okosszerződések fejlesztését úgy, hogy a hibakeresési eszközöket a megfigyelhetőséggel és az infrastrukturális építőelemekkel kombinálja. A Tenderly funkcióinak teljes körű használatához a fejlesztőknek [a forráskód ellenőrzését](https://docs.tenderly.co/monitoring/contract-verification) többféle módszerrel kell elvégezniük.

Lehetőség van a szerződés privát vagy nyilvános ellenőrzésére. Privát ellenőrzés esetén az okosszerződés csak Ön (és a projekt többi tagja) számára látható. A szerződés nyilvános ellenőrzése mindenkinek látható lesz, aki a Tenderly platformot használja.

Szerződéseit a [Dashboard](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-a-smart-contract), a [Tenderly Hardhat plugin](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-the-tenderly-hardhat-plugin) vagy a [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli) segítségével ellenőrizheti.

Ha a szerződéseket a Dashboardon keresztül ellenőrzi, importálnia kell a forrásfájlt vagy a Solidity fordító által generált metaadatfájlt, a címet/hálózatot és a fordító beállításait.

A Tenderly Hardhat-plugin használata lehetővé teszi, hogy kevesebb erőfeszítéssel nagyobb kontrollt gyakoroljon az ellenőrzési folyamat felett, mivel automatikus (kód nélküli) és kézi (kódalapú) ellenőrzést is választhat.

## További olvasnivaló {#further-reading}

- [A szerződés forráskódjának ellenőrzése](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
