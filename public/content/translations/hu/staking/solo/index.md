---
title: Egyéni letétbe helyezés
description: Az egyéni letétbe helyezés áttekintése
lang: hu
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie, a rinocérosz a saját számítógépes chipjén.
sidebarDepth: 2
summaryPoints:
  - Szerezzen maximális jutalmat közvetlenül a protokolltól azért, hogy a validátorát megfelelően működteti és az folyamatosan online
  - Működtessen az otthonából hardvert és támogassa személyesen az Ethereum hálózatának biztonságát és decentralizálását
  - Nem kell másban megbíznia, és az eszközeihez tartozó kulcsok mindig az Ön kontrollja alatt állnak
---

## Mi az az egyéni letétbe helyezés? {#what-is-solo-staking}

Az egyéni letétbe helyezés során a felhasználó egy [Ethereum-csomópontot működtet](/run-a-node/) az internethez csatlakozva, letétbe helyez 32 ETH-t, hogy aktiváljon egy [validátort](#faq), így közvetlenül részt tud venni a hálózat konszenzusfolyamatában.

**Az egyéni letétbe helyezés növeli az Ethereum hálózatának decentralizációját**, így az ellenállóbb lesz a cenzúrával és a támadásokkal szemben. A többi letétbe helyezési módszer nem feltétlen segíti a hálózatot ugyanilyen módon. Az egyéni letétbe helyezés a legjobb letéti opció az Ethereum biztosítására.

Az Ethereum-csomópontot egy végrehajtási réteg (EL) klienst és egy konszenzus réteg (CL) klienst tartalmaz. Ezek a kliensek olyan szoftverek, amelyek együtt dolgoznak egy érvényes aláírókulcs-készlettel együtt, hogy érvényesítsék a tranzakciókat és a blokkokat, tanúsítsák a lánc státuszát, aggregálják a tanúsítványokat és blokkokat javasoljanak.

Az egyéni letétbe helyezők azért felelnek, hogy a kliensek futásához szükséges hardvert működtetik. Azt javasoljuk, hogy erre egy dedikált gépet használjanak, melyet otthonról üzemeltetnek, mert ez rendkívül hasznos a hálózat egészsége szempontjából.

Az egyéni letétbe helyező közvetlenül a protokolltól kap jutalmakat azért, hogy a validátora megfelelően működik és online van.

## Miért legyek egyéni letétbe helyező? {#why-stake-solo}

Az egyéni letétbe helyezés több felelősséggel jár, de teljes kontrollt biztosít a pénzeszközök és a staking felállítás felett.

<CardGrid>
  <Card title="Szerezzen új ETH-t" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Teljes kontroll" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Hálózatbiztonság" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Megfontolandó dolgok, mielőtt belevágna az egyéni letétbe helyezésbe {#considerations-before-staking-solo}

Bármennyire is szeretnénk, hogy az egyéni letétbe helyezés elérhető és kockázatmentes legyen mindenkinek, ez nem lehet elérni. Mielőtt belevágna, komoly gyakorlati megfontolásokkal kell szembenéznie.

<InfoGrid>
<ExpandableCard title="Kötelező olvasmány" eventCategory="SoloStaking" eventName="clicked required reading">
Saját csomópont működtetéséhez meg kell tanulni a választott szoftver használatát. El kell olvasni a rendelkezésre álló dokumentációt és ráhangolni a fejlesztői csapatok kommunikációs csatornáira.

Minél többet tud a választott szoftverről és a proof-of-stake működéséről, annál kevésbé kockázatos a letétbe helyezés, illetve a felmerülő problémák kezelése a csomópont-operátor szerepében.
</ExpandableCard>

<ExpandableCard title="Számítógépes tapasztalat" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
A csomópont beállításához egy bizonyos szintű számítógépes gyakorlat szükséges, habár az új eszközök egyre inkább megkönnyítik ezt a feladatot is. A parancssoros felhasználói felület (command-line interface) ismerete hasznos, de nem elengedhetetlen.

Alapvető hardverösszeállításra, illetve a javasolt minimális specifikáció megértésére van szükség.
</ExpandableCard>

<ExpandableCard title="Biztonságos kulcskezelés" eventCategory="SoloStaking" eventName="clicked secure key management">
Ahogy a privát kulcs biztosítja az Ethereum-címet, úgy a validátorhoz is létre kell hozni kulcsokat. Tudnia kell, hogyan tartsa a kulcsmondatokat vagy privát kulcsokat biztos helyen.{' '}

<a href="/security/">Ethereum biztonság és csalásmegelőzés</a>
</ExpandableCard>

<ExpandableCard title="Karbantartás" eventCategory="SoloStaking" eventName="clicked maintenance">
A hardver néha leáll, a hálózati kapcsolat hibára fut, a kliensszoftvert néha frissíteni kell. A csomópont karbantartása elkerülhetetlen, ezzel foglalkozni kell. Muszáj naprakésznek lennie minden várható hálózati frissítésről vagy más kritikus kliensfrissítésről.
</ExpandableCard>

<ExpandableCard title="Megbízható üzemidő" eventCategory="SoloStaking" eventName="clicked reliable uptime">
A jutalmazás annak arányában történik, hogy a validátor mennyi időt van online és megfelelő módon végzi-e a tanúsítást. A leállás miatti büntetések annak függvényében vannak megállapítva, hogy ugyanakkor hány validátor volt még offline, ez azonban <a href="#faq">nem von maga után súlyos büntetést és kizárást (slashing)</a>. A sávszélesség is számít, mert a tanúsításért járó jutalmak csökkenek, ha azok nem érkeznek meg időben. A szükséges paraméterek változhatnak, de érdemes legalább 10 Mb/s fel- és letöltési sebességgel számolni.
</ExpandableCard>

<ExpandableCard title="A súlyos büntetés és kizárás (slashing) kockázata" eventCategory="SoloStaking" eventName="clicked slashing risk">
Az inaktív állapot miatti büntetéstől különbözik a <em>súlyos büntetéssel egybekötött kizárás (slashing)</em>, ami rosszhiszemű vétségekért jár. Ha kisebbségi klienst használ és a kulcsokat csak egy gépre tölti fel, akkor a slashing kockázata minimális. Ettől függetlenül minden letétbe helyezőnek szembe kell néznie a slashing kockázatával.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">Bővebben a slashingről és a validátor életciklusáról</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Hogyan működik {#how-it-works}

<StakingHowSoloWorks />

Mialatt Ön aktív, ETH jutalmakat kap, melyeket rendszeresen elhelyeznek a visszavonási számlán.

Bármikor kiléphet a validátor szerepéből, így nem kell online lennie, és leállnak a jutalmak. Ekkor a maradék egyenlege visszatér a visszavonási címre, melyet a felállításnál adott meg.

[Bővebben a letétbe helyezés visszavonásáról](/staking/withdrawals/)

## Induljon el a Staking Launchpad segítségével {#get-started-on-the-staking-launchpad}

A Staking Launchpad egy nyílt forráskódú alkalmazás, ami segít a letétbe helyezés folyamatában. Végigvezeti Önt a szükséges lépéseken, mint a kliensek kiválasztása, a kulcsok létrehozása és az ETH letétbe helyezése a letéti szerződésbe. Egy ellenőrzőlistán is végigveheti, hogy minden a rendelkezésre áll, hogy biztonsággal működjön a validátora.

<StakingLaunchpadWidget />

## Mit kell figyelembe venni a csomópont- és kliensbeállító eszközöknél {#node-tool-considerations}

Az egyéni letétbe helyezést segítő eszközök és szolgáltatások száma egyre növekszik, de mindnél áll fenn kockázat, ugyanúgy mind előnyökkel is jár.

Alább különböző jellemzők mentén mutatjuk be a jelentős erősségeket vagy gyengeségeket, melyekkel a listázott letéti eszközök rendelkezhetnek. Ez alapján Ön is megértheti, hogy e jellemzőket hogyan határoztuk meg, és így könnyebben választhat a szükséges eszközök közül.

<StakingConsiderations page="solo" />

## Fedezze fel a csomópont- és kliensbeállító eszközöket {#node-and-client-tools}

Számos olyan opció érhető el, amely biztosan kielégíti minden igényét. A fenti jellemzőket használva megértheti az alábbi eszközökben rejlő lehetőségeket.

<ProductDisclaimer />

### Csomóponteszközök

<StakingProductsCardGrid category="nodeTools" />

Olyan szolgáltatót válasszon, aki komolyan veszi a [kliensek diverzitását](/developers/docs/nodes-and-clients/client-diversity/), mert ez egyszerre javítja a hálózat biztonságát, és csökkenti az Ön kockázatát. Azok az eszközök, amelyek a kisebbségi kliens beállítást támogatják, a <em style={{ textTransform: "uppercase" }}>többklienses</em> jellemzővel vannak jelölve

### Kulcsgenerátorok

Ezek alternatív eszközök a [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) mellett, hogy a kulcsok le legyenek generálva.

<StakingProductsCardGrid category="keyGen" />

Hiányolja valamelyik letétbe helyezési eszközt? Ha a [terméklistázó szabályzat](/contributing/adding-staking-products/) alapján úgy véli, hogy egy adott eszköz illeszkedne ide, akkor jelezze felénk.

## Nézze meg az egyéni letétbe helyezésre vonatkozó útmutatókat {#staking-guides}

<StakingGuides />

## Gyakran ismételt kérdések {#faq}

Ezek a leggyakrabban felmerülő kérdések a letétbe helyezés kapcsán, melyről érdemes Önnek is tudnia.

<ExpandableCard title="Mi az a validátor?">

A <em>validátor</em> egy virtuális entitás, ami az Ethereumon működik és a protokoll konszenzusfolyamatában vesz részt. A validátort az egyenleg, a nyilvános kulcs és más tulajdonságok jellemzik. A <em>validátorkliens</em> az a szoftver, ami a validátor nevében működik, tárolva és felhasználva annak privát kulcsát. Egy validátorkliens több kulcspárt is tárolhat, így több validátort is üzemelhet.

</ExpandableCard>

<ExpandableCard title="Letétbe helyezhetek több mint 32 ETH-t?">
A validátorhoz tartozó kulcspár pontosan 32 ETH összeget igényel ahhoz, hogy aktívvá váljon. Ha a kulcsokhoz több ETH kerül letétbe, az nem növeli meg a jutalmak lehetőségét, mert a validátor <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">érvényes egyenlege</a> 32 ETH. Tehát a letétbe helyezés 32 ETH összegenként történik, melyekhez saját kulcs és egyenleg tartozik.

Egy validátorhoz ne kössön le többet, mint 32 ETH. Ez nem hoz több nyereséget. A <a href="/staking/withdrawals/#validator-sweeping">validátor-ellenőrzés</a> során a 32 ETH feletti rész automatikusan átkerül a visszavonási címre, ha az be van állítva a validátorhoz.

Ha az egyéni letétbe helyezés túl nagy erőfeszítést igényelne Öntől, akkor nézze meg a <a href="/staking/saas/">letétbe helyezés, mint szolgáltatás</a> opcióit, vagy ha kevesebb mint 32 ETH összegről van szó, akkor fontolja meg a <a href="/staking/pools/">letéti alapok</a> szolgáltatást.
</ExpandableCard>

<ExpandableCard title="Súlyos büntetéssel és kizárással jár, ha offline a validátorom? (Röviden: nem.)">
Nem vezet súlyos büntetéshez és kizáráshoz (slashing) az, ha a validátor offline, de a hálózat állapota megfelelő. Kis mértékű <em>inaktivitási büntetések</em> várhatók, ha a validátor nem elérhető a tanúsításhoz egy adott korszakban (mely 6,4 perc hosszú), ez azonban különbözik a <em>súlyos büntetéssel járó kizárástól (slashing)</em>. A kis büntetések kicsit kevesebbek, mint az a jutalom, amit a validátor a tanúsításért kapott volna, az elvesztett pénzt pedig vissza lehet nyerni ugyanannyi online töltött idővel.

Az inaktivitási büntetés mértéke függ attól, hogy ugyanabban az időben mennyi validátor van offline. Ha a hálózat nagy része mind egyszerre lesz offline, akkor a büntetés sokkal nagyobb ezen validátorok esetében, mintha csak egy validátor lenne elérhetetlen.

Szélsőséges esetben, ha a hálózat nem tud állapotot frissíteni, mert a validátorok harmada offline van, akkor ezek a felhasználók a <em>kvadratikus inaktivitási elszivárgást</em> szenvedik el, vagyis a validátorszámlákról exponenciálisan kiáramlik az ETH. Ezzel a rendszer végül képes helyrebillenteni magát azáltal, hogy az inaktív validátorok ETH-jét elégeti, amíg az egyenlegük 16 ETH lesz és ezzel automatikusan kilökődnek a validátorok közül. A megmaradó online validátorok végül teljesítik a több mint 2/3 arányt, kielégítve a túlnyomó többség elvét, hogy a lánc állapota megint frissítve legyen.
</ExpandableCard>

<ExpandableCard title="Hogyan biztosíthatom, hogy ne zárjanak ki?">
Röviden, bár nem lehet garantálni, de a slahing kockázata szinte nulla, hogy ha jóhiszeműen jár el, kisebbségi klienst használ, az aláíró kulcsokat pedig csak egy gépen tartja.

Néhány specifikus eset van, amikor a validátor súlyos büntetést kap és kilökik a hálózatból. A korábbi eseteknél kizárólag redundáns hardver volt beállítva, és az aláíró kulcsokat két különböző gépen tárolták egyszerre. Ez akaratlanul is <em>dupla szavazást</em> eredményezhet a kulcsokkal, ami súlyos vétség.

Egy többségi kliens használatával (amit a hálózat 2/3 használ) is nő a slashing kockázata, hogyha a kliensben hiba áll fenn, és emiatt egy láncelágazás jön létre. Hibás elágazást okozhat, ami a lánc állapotaként rögzítésre kerül. Ahhoz, hogy visszatérjen a valódi lánc állapotához, egy <em>„surround” szavazatot</em> kell leadni egy véglegesített blokk visszaállításával. Ez is egy súlyos vétség, és elkerülhető a kisebbségi kliensek használatával.

A <em>kisebbségi kliensben lévő hiba nem fog végleges állapotot eredményezni</em>, így nem vezet ahhoz, hogy két különböző állapotra szavazzanak helyenként (surround szavazat), és egyszerű inaktivitási büntetéssel jár, <em>nem slashinggel</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Tudjon meg többet annak jelentőségéről, hogy kisebbségi klienst használ.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Tudjon meg többet a súlyos büntetés és kizárás (slashing) elkerüléséről</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Melyik kliens a legjobb?">
Az egyéni kliensek esetében kicsit különböző a teljesítmény, a felhasználói felület, mivel mindet különböző csapatok fejlesztik, különböző programozási nyelveken. Így nincsen „legjobb” kliens. Az összes működő kliens kiváló szoftver, melyek működési elve azonos, hogy szinkronizáljanak és kapcsolódjanak a blokklánchoz.

Mivel az összes kliens ugyanazokat az alapvető funkcionalitásokat kínálja, így fontos, hogy Ön egy <strong>kisebbségi klienst</strong> válasszon, tehát nem azokat, amelyeket a validátorok többsége használ. Ez talán ellentmond a logikus gondolkodásnak, de a többségi vagy szupertöbbségi kliensek használata miatt megnő a slaghing kockázata, ha a kliensben valamilyen hiba van. Ezt a kockázatot jelentősen lecsökkenti egy kisebbségi kliens használata.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Tudjon meg többet arról, hogy kliensdiverzitás miért kritikus fontosságú</a>
</ExpandableCard>

<ExpandableCard title="Használhatok VPS-t (virtual private server)?">
Habár a virtuális privát szerver (VPS) használható az otthoni hardver helyett, a validátorkliens fizikai elérhetősége és helye <em>igenis számít</em>. A centralizált felhőszolgáltatások, mint az Amazon Web Services vagy a Digital Ocean, lehetővé teszik, hogy nem kell hardvert venni és működtetni, de ez hatással van a hálózat centralizáltságára.

Minél több validátorkliens működik ugyanazon a centralizált felhőszolgáltatón, annál veszélyesebbé válik a felhasználóknak. Ha ezek a szolgáltatók bármilyen esemény miatt elérhetetlenné válnak, legyen akár támadás, szabályozási kötelezettség, áram- vagy internetleállás, az összes validátorkliens ugyanakkor lesz offline.

Az offline büntetések arányosak azzal, hogy hány validátor van még offline ugyanakkor. A VPS használata megnöveli az offline büntetés várható mértékét, a kvadratikus elszivárgás vagy akár a slashing kockázatát is, ha a kimaradás kellően nagy mértékű. A saját és a hálózat kockázatát minimalizálandó a felhasználó jobban jár, ha saját hardvert szerez és üzemeltet.
</ExpandableCard>

<ExpandableCard title="Hogyan juthatok hozzá a jutalmakhoz vagy kaphatom vissza a letétbe helyezett ETH-t?">

A Beacon-láncról való visszavonáshoz be kell állítani a visszavonási adatokat.

Az új letétesek ezt megtették a kulcsgenerálás és a letétbe helyezés során. A meglévő letétesek, akik még nem állították ezt be, frissíthetik a kulcsaikat ezzel a funkcióval.

Amint a visszavonási adatok be vannak állítva, a jutalmak (a 32 ETH-en felüli rész) rendszeresen és automatikusan átkerülnek a visszavonási címre.

A teljes egyenleg visszavonásához végig kell menni a validátorkiléptetési folyamaton.

<ButtonLink href="/staking/withdrawals/">Bővebben a letétbe helyezés visszavonásáról</ButtonLink>
</ExpandableCard>

## További olvasnivaló {#further-reading}

- [Ethereum letétbe helyezési jegyzék](https://www.staking.directory/) – _Eridian és Spacesider_
- [Az Ethereum-kliens diverzitásának problémája](https://hackernoon.com/ethereums-client-diversity-problem) – _@emmanuelawosika 2022._
- [A kliensdiverzitás támogatása](https://www.attestant.io/posts/helping-client-diversity/) – _Jim McDonald 2022._
- [Kliensdiverzitás az Ethereum konszenzus rétegén](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) – _jmcook.eth 2022._
- [Hogyan kell: Ethereum validátorhardver vásárlása](https://www.youtube.com/watch?v=C2wwu1IlhDc) – _EthStaker 2022._
- [Lépésről lépésre: hogyan kell csatlakozni az Ethereum 2.0 teszthálózathoz](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) – _Butta_
- [Eth2 Slashing elkerülési tippek](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) – _Raul Jordan 2020._

<QuizWidget quizKey="staking-solo" />
