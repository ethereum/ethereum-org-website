---
title: Bevezetés az Ethereumba
description: A dapp fejlesztője bemutatja az Ethereum alapfogalmait.
lang: hu
---

## Mi az a blokklánc? {#what-is-a-blockchain}

A blokkláncot legjobban úgy lehet leírni, mint egy nyilvános adatbázist, melyet frissítenek és megosztanak egy számítógépes hálózaton.

A "blokk" arra utal, hogy az adat és az állapot szekvenciális adagokban vagy "blokkokban" van tárolva. Ha ETH-et küldesz valaki másnak, akkor a tranzakciós adatot hozzá kell adni egy blokkhoz, hogy sikeres legyen.

A "lánc" arra a tényre utal, hogy minden egyes blokk kriptográfiailag hozzá van rendelve a szülő blokkjához. Egy blokk adatát nem lehet megváltoztatni anélkül, hogy megváltoztatnánk az összes későbbi blokkot, mely a teljes hálózat konszenzusát igényelné.

Minden új blokk és a teljes lánc felett egyet kell érteniük a hálózat összes csomópontjának. Így mindenki ugyanazzal az adattal rendelkezik. Ahhoz, hogy ez működjön, a blokkláncoknak kell egy konszenzus mechanizmus.

Az Ethereum jelenleg a proof-of-work konszenzus mechanizmust használja. Ez azt jelenti, hogyha bárki új blokkokat szeretne hozzáadni a lánchoz, először egy nehéz puzzle-t kell megoldania, melyhez rengeteg számítási erő kell. Ennek a puzzle-nek a megoldása "bizonyítja", hogy elköltötted a számítási erőforrásaidat. Ezt a tevékenységet [bányászatnak](/developers/docs/consensus-mechanisms/pow/mining/) hívjuk. A bányászat próba szerencse alapon történik, de egy sikeres blokk hozzáadásért ETH jár jutalmul. Mindazonáltal csaló blokkok hozzáadása nem egy vonzó lehetőség figyelembe véve az erőforrásokat, melyek elköltöttél, hogy létrehozd a blokkot.

Az új blokkokat közvetítik a hálózat csomópontjainak, melyek leellenőrzik és hitelesítik, majd frissítik az állapotot mindenki számára.

Összefoglalásként, amikor ETH-et küldesz valakinek, a tranzakciót ki kell bányászni és belefoglalni egy új blokkba. A frissített állapot ezután megosztásra kerül a teljes hálózattal. Lent több részletet találsz.

Nézd meg ahogy Austin végig vezet a blokkláncokon:

<YouTube id="zcX7OJ-L8XQ" />

## Mi az Ethereum? {#what-is-ethereum}

Az Ethereum univerzumban van egy kanonikus számítógép (melyet Ethereum Virtuális Gépnek vagy EVM-nek hívnak), melynek állapota felett mindenki egyetért a hálózaton. Mindenki, aki részt vesz az Ethereum hálózatban (minden Ethereum csomópont) egy másolattal rendelkezik ennek a számítógépnek az állapotáról. Ezen kívül bármely résztvevő közvetíthet kéréseket ehhez a számítógéphez, hogy tetszőleges számításokat hajtsanak végre. Amikor egy ilyen kérést közvetítenek, a többi résztvevő a hálózaton hitelesíti, validálja és véghez viszi ("lefuttatja") a számítást. Ez állapotváltozást okoz az EVM-ben, amelyet a teljes hálózatban elköteleznek és tovább terjesztenek.

A számítási kérelmeket tranzakciós kérelmeknek nevezzük; az összes tranzakció bejegyzését, valamint az EVM jelenlegi állapotát a blokklánc tárolja, amelyet viszont minden csomópont tárol és elfogad.

A kriptográfiai mechanizmusok biztosítják, hogy amint a tranzakciókat érvényesnek igazolják és hozzáadják a blokklánchoz, később nem lehet őket megváltoztatni; ugyanazok a mechanizmusok biztosítják azt is, hogy az összes tranzakciót megfelelő „engedélyekkel” írják alá és hajtják végre (senki ne legyen képes digitális eszközök küldésére Alice számlájáról, kivéve magát Alice-t).

## Mi az ether? {#what-is-ether}

Az Ether kriptovaluta célja, hogy lehetővé tegye egy piac létezését a számításnak. Egy ilyen piac gazdasági ösztönzőt biztosít a résztvevőknek, hogy hitelesítsék/végrehajtsák a tranzakciós kérelmeket és, hogy számítási kapacitást szolgáltassanak a hálózatnak.

Bármely résztvevőnek, aki tranzakciós kérelmet közvetít, bizonyos mennyiségű ethert is fel kell ajánlania a hálózatnak, mivel jutalmat kell odaítélni annak, aki végül elvégzi a tranzakció ellenőrzésének, végrehajtásának, a blokklánc felé történő elkötelezettségének és a hálózatba történő közvetítésének a munkáját.

A fizetett ether mennyiség a számítási hossz függvénye. Ez megakadályozza a rosszindulatú résztvevőket is abban, hogy szándékosan eltömítsék a hálózatot azzal, hogy végtelen ciklusokat vagy erőforrás-igényes szkriptek végrehajtását kérik, mivel ezeket a szereplőket folyamatosan terhelni fogják.

## Mik azok a dappok? {#what-are-dapps}

A gyakorlatban a résztvevők nem írnak minden alkalommal új kódot, amikor számítást kérelmeznek az EVM-től. Ehelyett az alkalmazásfejlesztők programokat (újra felhasználható kódrészleteket) töltenek fel az EVM tárhelyére, majd a felhasználók kéréseket tesznek ezeknek a kódrészleteknek a végrehajtására változó paraméterekkel. A feltöltött és a hálózat által végrehajtott programokat okosszerződéseknek hívjuk.

Egy nagyon alap szinten úgy gondolhatsz az okosszerződésekre, mint egyfajta kajaautomatára: egy szkript, melyet ha meghívnak bizonyos paraméterekkel, végrehajt valamilyen akciót vagy számítást, ha bizonyos feltételek teljesülnek. Például egy egyszerű árusító okosszerződés létrehozhatná és átruházhatná egy digitális eszköz tulajdonjogát, ha a hívó fél ether-t küld egy bizonyos címzettnek.

Bármely fejlesztő írhat egy okosszerződést és teheti nyilvánossá a hálózat számára úgy, hogy a blokkláncot egy adat rétegként használja a hálózatnak fizetett díj ellenében. Bármely felhasználó meghívhatja az okosszerződést és végrehajthatja a kódját szintén valamekkora díj ellenében.

Ezáltal az okosszerződésekkel a fejlesztők tetszőlegesen bonyolult felhasználó oldali appokat és szolgáltatásokat fejleszthetnek és telepíthetnek: piactereket, pénzügyi eszközöket, játékokat stb.

## Terminológia {#terminology}

### Blokklánc {#blockchain}

Az össze blokk sorozata, mely elköteleződött az Ethereum hálózaton a hálózati történetben. A név onnan származik, hogy minden egyes blokk tartalmaz egy referenciát az előző blokkra, mely segít fenntartani egy sorrendet a összes blokk között (így egy pontos történetet is).

### ETH {#eth}

Az Ethereum natív kriptovalutája. A felhasználók más felhasználóknak fizetnek, hogy teljesítsék a kód végrehajtási kérelmeiket.

### EVM {#evm}

Az Ethereum Virtuális Gép egy globális számítógép, melynek állapota felett az Ethereum hálózat minden résztvevője egyet ért. Bármely résztvevő kérelmezheti valamilyen tetszőleges kód végrehajtását az EVM-en; a kód végrehajtás megváltoztatja az EVM állapotát.

[Többet az EVM-ről](/developers/docs/evm/)

### Csomópontok {#nodes}

A valódi gépek, melyek az EVM állapotot tárolják. A csomópontok kommunikálnak egymással, hogy információkat terjesszenek az EVM állapotáról és az új állapotváltozásokról. Bármely felhasználó kérheti a kód végrehajtását azáltal is, hogy kód végrehajtási kérelmet közvetít egy csomópontból. Az Ethereum hálózat az összes Ethereum csomópont és a kommunikációjuk összessége.

[Többet a csomópontokról](/developers/docs/nodes-and-clients/)

### Számlák {#accounts}

Ahol az ether tárolódik. A felhasználók indíthatnak számlákat, ethert helyezhetnek el a számlákon, és ethert utalhatnak át a számlájukról más felhasználóknak. A számlák és a számla egyenlegek egy nagy táblában vannak eltárolva az EVM-ben; a teljes EVM állapot részei.

[Többet a számlákról](/developers/docs/accounts/)

### Tranzakciók {#transactions}

A "tranzakciós kérelem" egy formális kifejezés a kód végrehajtási kérelemre az EVM-en és a "tranzakció" egy teljesített tranzakciós kérelem és a hozzárendelt változás az EVM állapotában. Bármely felhasználó közvetíthet tranzakciós kérelmet a hálózatra egy csomópontból. Ahhoz, hogy a tranzakció kérelemnek valóban legyen hatása az elfogadott EVM állapot felett, először validálni, végrehajtani és "elkötelezni kell a hálózatra" más csomópontok által. Bármely kód végrehajtása állapotváltozást okoz az EVM-ben; elkötelezettséggel ez az állapotváltozás a hálózat minden csomópontjához eljut. Néhány tranzakció példa:

- Küldj X ethert a számlámról Alice számlájára.
- Publikálj valamilyen okosszerződés kódot az EVM memóriába.
- Hajtsd végre az okosszerződés kódot az X címen az EVM-ben Y paraméterekkel.

[Többet a tranzakciókról](/developers/docs/transactions/)

### Blokkok {#blocks}

A tranzakciók mennyisége nagyon magas, így a tranzakciókat adagokban vagy blokkokban "kötelezzük el". A blokkok általában több tucat vagy több száz tranzakciót tartalmaznak.

[Többet a blokkokról](/developers/docs/blocks/)

### Okosszerződések {#smart-contracts}

Egy újra felhasználható kódrészlet (egy program), melyet egy fejlesztő publikál az EVM memóriába. Bárki kérheti az okosszerződés kód végrehajtását egy tranzakciós kérelemmel. Mivel a fejlesztők tetszőlegesen végrehajtható alkalmazásokat írhatnak az EVM-be (játékokat, piactereket, pénzügyi eszközöket stb.) okosszerződések publikálásával, ezért gyakran hívjuk ezeket [dappoknak, vagy decentralizált alkalmazásoknak](/developers/docs/dapps/).

[Többet az okos szerződésekről](/developers/docs/smart-contracts/)

## További olvasnivaló {#further-reading}

- [Ethereum fehérkönyv](/whitepaper/)

## Kapcsolódó útmutatók {#related-tutorials}

- [Egy fejlesztő útmutatása az Ethereumba, első rész](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Az Ethereum nagyon kezdőbarát felfedezése Python és web3.py használatával_
