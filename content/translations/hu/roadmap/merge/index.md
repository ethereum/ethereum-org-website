---
title: A beolvadás
description: További információ a beolvadásról – amikor az Ethereum fő hálózata áttért a proof-of-stake konszenzusra.
lang: hu
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: Az Ethereum fő hálózata proof-of-stake konszenzust használ, ám ez nem mindig volt így.
summaryPoint2: Az áttérés az eredeti proof-of-work mechanizmusról a proof-of-stake mechanizmusa a beolvadás nevet kapta.
summaryPoint3: A Beolvadás az eredeti Ethereum-főhálózat összeolvadását jelenti a Beacon lánc nevű különálló proof-of-stake blokklánccal, amelyek most már egy láncként léteznek.
summaryPoint4: A Beolvadás nagyjából 99,95%-kal csökkentette az Ethereum energiafogyasztását.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  A beolvadás 2022. szeptember 15-én ment végbe. Ezzel lezárult az Ethereum áttérése a proof-of-stake konszenzusra, így hivatalosan is elhagyta a proof-of-work mechanizmust, és nagyjából 99,95%-kal csökkentette az energiafogyasztását.
</UpgradeStatus>

## Mi volt a beolvadás? {#what-is-the-merge}

A beolvadás az Ethereum eredeti végrehajtási rétegének (a [genezis](/history/#frontier) óta létező fő hálózatnak) az összeolvadása volt az új proof-of-stake konszenzusréteggel, a Beacon lánccal. Ezzel szükségtelenné vált az energiaintenzív bányászat, és megnyílt a hálózat biztosításának lehetősége letétbe helyezett ETH felhasználásával. Igazán izgalmas lépés volt ez az Ethereum jövőképének – nagyobb méretezhetőség, biztonság és fenntarthatóság – megvalósítása felé vezető úton.

<MergeInfographic />

A [Beacon lánc](/roadmap/beacon-chain/) és a [fő hálózat](/glossary/#mainnet) eredetileg külön működött. Az Ethereum-főhálózat biztonságát – az összes számlájával, egyenlegével, okosszerződésével és blokkláncállapotával együtt – továbbra is a [proof-of-work](/developers/docs/consensus-mechanisms/pow/) konszenzus szolgáltatta, még akkor is amikor a [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) mechanizmust használó Beacon lánc vele párhuzamosan futott. A beolvadás volt az esemény, amikor ez a két rendszer végre egyesült, és a proof-of-work helyét végleg átvette a proof-of-stake.

Képzeljük el, hogy az Ethereum egy űrhajó, amely még azelőtt felszállt, hogy igazán készen állt volna a csillagközi utazásra. A Beacon lánccal a közösség egy új hajtóművet és egy erősebb hajótestet épített. Jelentős tesztelést követően eljött az ideje, hogy a régi hajtóművet menet közben kicseréljék az újra. Ezzel az új, hatékonyabb hajtómű beolvadt a már meglévő hajóba, megteremtve a lehetőséget, hogy súlyos fényéveket tegyen meg, és nyakába vegye az univerzumot.

## Összeolvadás a fő hálózattal {#merging-with-mainnet}

A proof-of-work mechanizmus biztosította az Ethereum-főhálózatot a születésétől a beolvadásig. Ez tette lehetővé, hogy az általunk jól ismert Ethereum-blokklánc 2015 júliusában az összes ismerős funkciójával együtt (tranzakciók, okosszerződések, számlák stb.) létrejöjjön.

A fejlesztők az Ethereum története során végig készültek arra, hogy egyszer majd áttérnek a proof-of-work konszenzusról a proof-of-stake mechanizmusra. 2020. december 1-jén a fő hálózattól elkülönült, vele párhuzamosan működő blokkláncként létrejött a Beacon lánc.

A Beacon lánc eredetileg nem kezelte a fő hálózat tranzakcióit. Ehelyett a saját állapotát illetően jutott konszenzusra az aktív validátorok számlaegyenlegekre vonatkozó egyetértésén keresztül. Mélyreható tesztelést követően eljött az ideje, hogy a Beacon lánc való világbeli adatokkal kapcsolatban is konszenzusra jusson. A beolvadás után a Beacon lánc lett az összes hálózati adat konszenzusmotorja, beleértve a végrehajtási réteg tranzakcióit és számlaegyenlegeit is.

A beolvadás jelentette a hivatalos váltást, amely után a Beacon lánc tölti be a blokkelőállítás hajtómotorjának szerepét. Az érvényes blokkok előállításának módja többé már nem a bányászat. Ehelyett a proof-of-stake validátorok vették át ezt a szerepet, és most már ők felelnek a tranzakciók validálásának végrehajtásáért és az új blokkok előterjesztéséért.

Az előzmények nem vesztek el a beolvadással. Ahogy a fő hálózat egyesült a Beacon lánccal, az Ethereum összes tranzakcióelőzményét is magával vitte.

<InfoBanner>
A proof-of-stake mechanizmus átvétele megváltoztatta az Ether kibocsátásának módját. Tudjon meg többet: <a href="/roadmap/merge/issuance/">Ether-kibocsátás a beolvadás előtt és után</a>.
</InfoBanner>

### Felhasználók és tulajdonosok {#users-holders}

**A beolvadás nem hozott változást a tulajdonosok/felhasználók számára.**

_Erre ráfér az ismétlés_: az ETH vagy az Ethereum hálózatán található bármely egyéb digitális eszköz felhasználójaként vagy tulajdonosaként, valamint nem csomópont-operátor letétesként **semmit sem kell tennie a pénzeszközeivel vagy a tárcájával a beolvadás kapcsán.** Az ETH egyszerűen csak ETH. Nincs olyan, hogy „régi ETH”/„új ETH” vagy olyan, hogy „ETH1”/„ETH2”, és a tárcák a beolvadás után is pontosan ugyanúgy működnek, mint azelőtt. Akik mást állítanak, valószínűleg csalók.

Annak ellenére, hogy lecserélte a proof-of-work mechanizmust, az Ethereum összes előzménye – a létrejöttéig visszamenőleg – változatlan formában megmaradt a proof-of-stake-re való áttérés során. A beolvadás előtt az Ön tárcájában lévő eszközök a beolvadást követően is elérhetők. **Az ön részéről semmilyen frissítési intézkedés nem szükséges.**

[Az Ethereum biztonságáról bővebben](/security/#eth2-token-scam)

### Csomópont-operátorok és dapp-fejlesztők {#node-operators-dapp-developers}

<ExpandableCard
title="Letéticsomópont-operátorok és letétszolgáltatók"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

A fő intézkedési elemekhez tartoznak az alábbiak:

1. Futtasson _egyidejűleg_ egy konszenzusklienst és egy végrehajtási klienst; a harmadik fél végpontok a beolvadás után már nem tudnak végrehajtási adatokat szerezni.
2. A végrehajtási és a konszenzusklienst is egy megosztott JWT titkos kulccsal hitelesítse, hogy biztonságosan tudjanak kommunikálni.
3. Állítson be egy „díj címzettje” címet a kapott tranzakciós illetéktételek/MEV fogadásához.

Ha a fenti felsorolás első két elemét nem teljesíti, akkor a csomópontja „offline” állapotot mutat majd, amíg mindkét réteg szinkronizálása és hitelesítése be nem fejeződik.

Ha nem állít be egy „díj címzettje” címet, attól még a validátor a szokásos módon tud működni, de Ön lemarad az el nem égetett díjtételekről/MEV-ről, amelyeket egyébként megkapott volna a validátora által előterjesztett blokkokkal.
</ExpandableCard>

<ExpandableCard
title="Nem validáló csomópont-operátorok és infrastruktúra-szolgáltatók"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Egészen a beolvadásig egy végrehajtási kliens (például: Geth, Erigon, Besu vagy Nethermind) elég volt ahhoz, hogy valaki fogadja, megfelelően validálja és propagálja a hálózaton terjedő blokkokat. _A beolvadás óta_ egy végrehajtási csomagban található tranzakciók érvényessége az őket tartalmazó „konszenzusblokk” érvényességétől is függ.

Ennek eredményeképpen egy teljes Ethereum-csomóponthoz most már végrehajtási kliens és egy konszenzuskliens is szükséges. Ez a két kliens egy új motor-API segítségével működik együtt. A motor-API JWT titkos kulcsot használó hitelesítést igényel. A kulcsot mindkét kliens megkapja, ami biztonságos kommunikációt tesz lehetővé.

A fő intézkedési elemekhez tartoznak az alábbiak:

– konszenzuskliens telepítése a végrehajtási kliens mellé
– végrehajtási és konszenzuskliens hitelesítése megosztott JWT titkos kulccsal, hogy biztonságosan kommunikálhassanak egymással.

Ha a fenti felsorolás elemeit nem teljesíti, akkor a csomópontja „offline” állapotúnak tűnik majd, amíg mindkét réteg szinkronizálása és hitelesítése be nem fejeződik.

</ExpandableCard>

<ExpandableCard
title="Dapp- és okosszerződés-fejlesztők"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

A Beolvadás megváltoztatta a konszenzust, amely a következőkre is hatott:<

<ul>
  <li>blokkstruktúra</li>
  <li>slot-/blokkidőzítés</li>
  <li>operációskód-változások</li>
  <li>a láncon belüli véletlenszerűség forrása</li>
  <li>a <em>biztonságos fejléc</em> és a <em>véglegesített blokkok</em> koncepciója</li>
</ul>

További információért nézze meg Tim Beiko blog postját: <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">Hogyan érinti a Beolvadás az Ethereum alkalmazási rétegét</a>.

</ExpandableCard>

## A beolvadás és az energiafogyasztás {#merge-and-energy}

A beolvadás a proof-of-work végét jelentette az Ethereum számára, valamint egy fenntarthatóbb, környezetbarátabb Ethereum kezdetét. Az Ethereum energiafogyasztása nagyjából 99,95%-kal csökkent, ezzel az Ethereum zöld blokklánc lett. Tudjon meg többet az [Ethereum energiafogyasztásáról](/energy-consumption/).

## A beolvadás és a méretezhetőség {#merge-and-scaling}

A beolvadás a további méretezhetőségi fejlesztések lehetőségét is megteremtette, amelyek a proof-of-work konszenzus mellett lehetetlenek voltak, egy lépéssel közelebb hozva az Ethereumot az [Ethereum-jövőképben](/roadmap/vision/) felvázolt méretezési, biztonsági és fenntarthatósági célok eléréséhez.

## Téveszmék a beolvadásról {#misconceptions}

<ExpandableCard
title="Tévhit: „Egy csomópont futtatásához 32 ETH kell.”"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Két típusú Ethereum-csomópont létezik: olyanok, amelyek képesek blokkjavaslatot tenni, és olyanok, amelyek nem.

A blokkot előterjesztő csomópontok csak kis részét adják az Ethereum hálózatán működő csomópontoknak. Ebbe a kategóriába tartoznak a proof-of-work (PoW) mechanizmus bányászcsomópontjai és a proof-of-stake (PoS) mechanizmus validátor-csomópontjai. Ez a kategória megköveteli a gazdasági erőforrások elkülönítését (például GPU hash-teljesítményt a proof-of-work mechanizmus alatt, illetve ETH-letétbe helyezést a proof-of-stake mechanizmus mellett) cserébe azért, hogy az operátor alkalomadtán javaslatot tehessen a következő blokkra, és megkaphassa a protokolljutalmakat.

A hálózat többi csomópontja (tehát a csomópontok többsége) nem köteles gazdasági erőforrásokat feláldozni egy átlagos személyi számítógépen, 1-2 TB elérhető tárhelyen és egy internetkapcsolaton túl. Ezek a csomópontok nem terjesztenek elő blokkjavaslatokat, mégis kritikus szerepet játszanak a hálózat biztosításában azzal, hogy a blokkelőterjesztőket szemmel tartva vizsgálják az újonnan érkező blokkokat, és hálózat konszenzusszabályaival összhangban ellenőrzik azok érvényességét. Ha a blokk érvényes, akkor a csomópont propagálja azt a hálózaton keresztül. Ha a blokk bármilyen okból kifolyólag érvénytelen, akkor a csomópont szoftverje figyelmen kívül hagyja azt, és nem folytatja a propagálását.

Egy nem blokk-készítő csomópontot bárki futtathat, működjön bármilyen konszenzusmechanizmus szerint is (proof-of-work vagy proof-of-stake); de aki megteheti, <em>azt erőteljesen bátorítják</em>. Egy csomópont futtatása hihetetlen értékkel bír az Ethereum számára, és előnyöket biztosít a csomópontot futtató egyén számára is, például nagyobb biztonságot, adatvédelmet és ellenálló képességet a cenzúrával szemben.

Az Ethereum-hálózat decentralizációjának fenntartásához <em>rendkívül lényeges</em> az a képesség, hogy bárki tudjon saját csomópontot működtetni.

<a href="/run-a-node/">Bővebben a saját csomópont működtetéséről</a>

</ExpandableCard>

<ExpandableCard
title="Tévhit: „A beolvadás nem tudta csökkenteni a gasdíjakat.”"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

A gasdíjak a hálózati teljesítmény iránti kereslet és a hálózati kapacitás egymáshoz viszonyított változásának eredményeként alakulnak. A beolvadással megszűnt a proof-of-work mechanizmus használata, és áttértünk a proof-of-stake konszenzusra, ám a hálózati kapacitást vagy feldolgozóképességet közvetlenül érintő paraméterekben jelentős változás nem következett be.

A <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">összevonttranzakció-centrikus fejlesztési tervvel</a> az erőfeszítések oda irányultak, hogy a felhasználói aktivitást az <a href="/layer-2/">L2-n</a> tegyék skálázhatóvá, miközben lehetővé teszik, hogy az L1 főhálózat egy biztonságos, decentralizált réteg, ami optimális az összevont tranzakciós adatok tárolására, így azok használata exponenciálisan olcsóbb lehet. Ennek eléréséhez az áttérés a proof-of-stake mechanizmusra létfontosságú előfeltétel volt. <a href="/developers/docs/gas/">Bővebben a gázról és a díjakról.</a>

</ExpandableCard>

<ExpandableCard
title="Tévhit: „A tranzakciók jelentős mértékben gyorsultak a beolvadással.”"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
A tranzakciók „sebessége” több módon is mérhető, például az egy blokkban foglalt idővel és a véglegesítés időigényével. Ezek mindegyike változik kicsit, de a felhasználók számára ez nem észlelhető.

Korábban, a proof-of-work konszenzus ideje alatt a cél az volt, hogy körülbelül 13,3 másodpercenként létrejöjjön egy új blokk. A proof-of-stake mechanizmussal a slotok pontosan 12 másodpercenként ismétlődnek, mind egy-egy lehetőség, hogy egy validátor közzétegyen egy blokkot. A legtöbb slothoz tartozik blokk is, de nem feltétlenül mindegyikhez (például ha egy validátor offline állapotban van). A proof-of-stake mechanizmus mellett körülbelül 10%-kal gyakrabban jön létre blokk, mint a proof-of-work mellett. Ez egy viszonylag jelentéktelen változás, amely a felhasználóknak valószínűleg nem tűnik fel.

A proof-of-stake magával hozta a tranzakció véglegességének koncepcióját, amely korábban nem létezett. A proof-of-work rendszerében egy blokk visszafordításának nehézsége az adott tranzakció után kibányászott minden egyes blokkal exponenciálisan növekszik, de valójában sosem válik lehetetlenné. A proof-of-stake mechanizmusban a blokkok úgynevezett korszakokba (epoch) rendeződnek (6,4 perces időintervallumonként, amelyek 32 blokklehetőséget tartalmaznak), amelyekről a validátorok szavaznak. Amikor egy korszak lezárul, a validátorok szavaznak arról, hogy adott korszakot „igazolt” állapotúnak tekintsék. Ha a validátorok megegyeznek, hogy a korszakot igazolt állapotúnak tekintsék, akkor az a következő korszakban végleges állapotba kerül. A véglegesített tranzakciók visszafordítása gazdaságtalan lenne, mivel ehhez a teljes letétbe helyezett ETH-állomány több mint egyharmadát meg kellene szerezni és el kellene égetni.

</ExpandableCard>

<ExpandableCard
title="Tévhit: „A beolvadással lehetővé vált a letétbe helyezett összegek lehívása.”"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Kezdetben a Beolvadás után a letétesek csak az extra díjakat és a MEV-et kapták meg, amelyet a blokkjavaslások eredményeként nyertek. Ezek a jutalmak egy nem letéti számlára kerültek, amelyet a validátor kontrollál (aki a <em>díjakat kapja</em>), és azonnal elérhetők. Ezek különböznek a protokolljutalmaktól, amelyeket a validátori kötelezettségeikért kapnak.

A Shanghai/Capella hálózatfrissítés óta a letétesek egy <em>visszavonási számlát</em> jelölnek ki, hogy automatikusan megkapják a letéti összeg feletti részt (32 ETH felett). Ez a fejlesztés lehetővé tette, hogy a validátor kilépjen a hálózatból, és ezzel felszabadítsa és visszakapja a teljes egyenlegét.

<a href="/staking/withdrawals/">Bővebben a letétek visszavonásáról</a>

</ExpandableCard>

<ExpandableCard
title="Tévhit: „A Beolvadás után, amikor a visszavonások lehetővé váltak, a letétesek egyszerre ki tudtak lépni.”"
contentPreview="False. Validator exits are rate limited for security reasons.">
Mióta a Shanghai/Capella frissítés lehetővé tette a letétek visszavonását, minden validátort arra ösztönöznek, hogy lehívja a 32 ETH feletti letéti egyenlegét, mivel ezek a pénzeszközök nem járnak plusz hozammal, de a rendszer zárolja őket. Az APR-értéktől függően (amelyet a teljes letétbe helyezett ETH-mennyiség határoz meg) ez arra ösztönözheti őket, hogy teljesen feladják a validátori pozíciójukat és visszakérjék a teljes egyenlegüket, vagy éppen arra, hogy a jutalmaik felhasználásával növeljék a letétjüket és nagyobb hozamhoz jussanak.

Egy fontos kikötés, hogy a validátor kilépése egy rátához van kötve, és csak eszerint léphet ki valaki egy adott korszakban (minden 6,4. percben). Ez a határérték az aktív validátorok számától függően változik, de a teljes letétbe helyezett ETH-nak kb. 0,33%-a lehet egy adott napon.

Így nem lehet tömegesen letéti összeget kivonni. Emellett azt is megakadályozza, hogy egy potenciális támadó a letétjét felhasználva slashing-sértést kövessen el, és egyazon korszakon belül felszámolja a validátor teljes ETH-letéti egyenlegét, mielőtt a protokoll érvényesíthetné a megsemmisítési szankciót.

Az APR értéke szándékosan dinamikus, segítségével a letétesek által alkotott piac megállapíthatja azt a kifizetési szintet, amely mellett hajlandók gondoskodni a hálózat biztonságáról. Ha ez a szint túl alacsony, akkor a validátorok a protokoll által korlátozott tempóban kilépnek. Ez fokozatosan megemeli az APR értékét a maradók számára, ami új vagy visszatérő letéteseket eredményez majd.
</ExpandableCard>

## Mi történt az „Eth2”-vel? {#eth2}

Az „Eth2” kifejezést elhagytuk. Miután az „Eth1” és az „Eth2” egyetlen láncban egyesült, már nincs szükség arra, hogy különbséget tegyünk két Ethereum-hálózat között. Csak egy Ethereum maradt.

A zavar elkerülése érdekében a közösség frissítette az alábbi kifejezéseket:

- Az „Eth1” helyett a „végrehajtási réteg” kifejezést használjuk. Ez a réteg kezeli a tranzakciókat és a végrehajtást.
- Az „Eth2” helyett a „konszenzusréteg” kifejezést használjuk. Ez a réteg kezeli a proof-of-stake konszenzust.

Ezek a terminológiai módosítások csak az elnevezési szabályokat változtatják meg; ez nem változtatnak az Ethereum céljain vagy ütemtervén.

[Tudjon meg többet az „Eth2” átnevezéséről](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## A frissítések közötti kapcsolat {#relationship-between-upgrades}

Az Ethereum-frissítések némileg összefüggnek egymással. Foglaljuk össze hát, hogy a beolvadás hogyan viszonyul a többi frissítéshez.

### A beolvadás és a Beacon lánc {#merge-and-beacon-chain}

A beolvadás a Beacon lánc hivatalos átvételét jelenti az eredeti fő hálózat végrehajtási rétegéhez tartozó új konszenzusrétegként. A beolvadás óta a validátorok feladata az Ethereum-főhálózat biztosítása, és a [proof-of-work](/developers/docs/consensus-mechanisms/pow/) rendszerű bányászat már nem érvényes módszer a blokkok előállítására.

Ehelyett a blokkokra azok a validáló csomópontok tesznek javaslatot, amelyek ETH-t helyeztek letétbe a konszenzusban való részvétel jogáért. Ezek a frissítések készítik elő a terepet a jövőbeni méretezhetőségi frissítésekhez, többek között a szilánkoláshoz.

<ButtonLink href="/roadmap/beacon-chain/">
  A Beacon lánc
</ButtonLink>

### A beolvadás és a Shanghai frissítés {#merge-and-shanghai}

Hogy leegyszerűsítsük az áttérést a proof-of-stake mechanizmusra, és maximalizáljuk az összpontosítást erre a feladatra, a beolvadás nem tartalmazott bizonyos várt funkciókat, mint például a letétbe helyezett ETH lehívásának lehetőségét. Ez a funkció külön vált elérhetővé a Shanghai/Capella frissítéssel.

A kíváncsibbak többet megtudhatnak arról, hogy [Mi történik A Beolvadás után](https://youtu.be/7ggwLccuN5s?t=101), méghozzá Vitalik 2021. áprilisi ETHGlobal eseményen tartott előadásából.

### A beolvadás és a szilánkolás {#merge-and-data-sharding}

Az eredeti terv szerint a beolvadás előtt dolgozták volna ki a láncszilánkolást (sharding) a méretezhetőség megoldására. Azonban a [2. rétegű méretezési megoldások](/layer-2/) elterjedésével a prioritás eltolódott afelé, hogy előbb a proof-of-stake leváltsa a proof-of-work rendszert.

A szilánkolással kapcsolatos tervek gyorsan fejlődnek, ám a 2. rétegű technológiák felemelkedése és sikere kapcsán – amelyet a tranzakció-végrehajtás méretezése terén elértek – a szilánkolásra vonatkozó elképzelések most már arra irányulnak, hogy megtalálják a legoptimálisabb módot a rollupszerződések tömörített lehívási adatainak tárolásával járó teher elosztására, és így lehetővé tegyék a hálózati kapacitás exponenciális növekedését. Ehhez azonban előbb át kell térni a proof-of-stake mechanizmusra.

<ButtonLink href="/roadmap/danksharding/">
  Szilánkolás (sharding)
</ButtonLink>

## További olvasnivaló {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
