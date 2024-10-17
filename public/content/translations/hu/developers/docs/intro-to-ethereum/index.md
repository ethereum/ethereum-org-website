---
title: Bevezetés az Ethereumba
description: A dapp fejlesztője bemutatja az Ethereum alapfogalmait.
lang: hu
---

## Mi az a blokklánc? {#what-is-a-blockchain}

A blokkláncot legjobban úgy lehet leírni, mint egy nyilvános adatbázist, melyet frissítenek és megosztanak egy számítógépes hálózaton.

A "blokk" arra utal, hogy az adat és az állapot szekvenciális adagokban vagy "blokkokban" van tárolva. Ha ETH-t küld valakinek, akkor a tranzakciós adatot hozzá kell adni egy blokkhoz, hogy végrehajtásra kerüljön.

A "lánc" arra a tényre utal, hogy minden egyes blokk kriptográfiailag hozzá van rendelve a szülő blokkjához. Tehát a blokkok össze vannak kötve. Egy blokk adatát nem lehet megváltoztatni anélkül, hogy megváltoztatnánk az összes későbbi blokkot, amely a teljes hálózat konszenzusát igényelné.

A hálózat minden számítógépének meg kell egyeznie minden új blokkon és az egész láncon. Ezeket a számítógépeket úgy ismerjük, mint csomópontok. A csomópontok biztosítják, hogy mindenki számára ugyanaz az adat. Ahhoz, hogy ezt az elosztott megegyezést teljesítse, a blokkláncoknak szükségük van konszenzusmechanizmusra.

Az Ethereum [proof-of-stake alapú konszenzusmechanizmust](/developers/docs/consensus-mechanisms/pos/) használ. Aki új blokkot akar adni a lánchoz, annak le kell kötnie ETH-t – az Ethereum saját valutáját – fedezetként, és futtatniuk kell a validátor szoftvert. Ezen validátorok közül véletlenszerűen választják ki a blokkot javaslót, amelyet a többi validátor ellenőriz és hozzáad a lánchoz. Jutalmak és büntetések rendszere ösztönzi a résztvevőket a jóhiszemű viselkedésre és arra, hogy online legyenek.

Ha szeretné látni, hogy a blokklánc adat hogyan hashelődik és azután hogyan adódik hozzá a blokkreferenciák történetéhez, akkor nézze meg [ezt a bemutatót](https://andersbrownworth.com/blockchain/blockchain) Anders Brownworth narrálásával, illetve az alábbi videót.

Nézze meg, ahogy Anders elmagyarázza a hasheket a blokkláncban:

<YouTube id="_160oMzblY8" />

## Mi az Ethereum? {#what-is-ethereum}

Az Ethereum egy blokklánc egy beágyazott számítógéppel. Alapot szolgáltat alkalmazások és szervezetek számára egy decentralizált, engedélymentes és cenzúrának ellenálló módon.

Az Ethereum univerzumban van egy kanonikus számítógép (melyet Ethereum Virtuális Gépnek vagy EVM-nek hívnak), amelynek állapota felett mindenki egyetért a hálózaton. Mindenki, aki részt vesz az Ethereum hálózatban (minden Ethereum-csomópont) egy másolattal rendelkezik ennek a számítógépnek az állapotáról. Ezen kívül bármely résztvevő közvetíthet kéréseket ehhez a számítógéphez, hogy tetszőleges számításokat hajtsanak végre. Amikor egy ilyen kérést közvetítenek, a többi résztvevő a hálózaton hitelesíti, validálja és véghez viszi (lefuttatja) a számítást. Ez állapotváltozást okoz az EVM-ben, amelyet a teljes hálózatban elköteleznek és tovább terjesztenek.

A számítási kérelmeket tranzakciós kérelmeknek nevezzük; az összes tranzakció bejegyzését, valamint az EVM jelenlegi állapotát a blokklánc tárolja, amelyet viszont minden csomópont tárol és elfogad.

A kriptográfiai mechanizmusok biztosítják, hogy az ellenőrzött és a blokklánchoz hozzáadott tranzakciók később nem változtathatók meg. Ugyanazok a mechanizmusok biztosítják azt is, hogy az összes tranzakciót megfelelő engedélyekkel írják alá és hajtják végre (senki ne legyen képes digitális eszközök küldésére Alice számlájáról, kivéve magát Alice-t).

## Mi az ether? {#what-is-ether}

**Ether (ETH)** az Ethereum saját kriptovalutája. Az ETH célja, hogy a számítási kapacitásért fizetni lehessen. Egy ilyen piac gazdasági ösztönzőt biztosít a résztvevőknek, hogy hitelesítsék/végrehajtsák a tranzakciós kérelmeket és, hogy számítási kapacitást szolgáltassanak a hálózatnak.

A résztvevők a tranzakcióért jutalomként felajánlanak ETH-t a hálózatnak. A hálózat elégeti a jutalom egy részét és díjazza azokat, akik végül elvégzik a tranzakció ellenőrzését, végrehajtását, a blokkláncba való beillesztését és a hálózatba történő közvetítését.

Az ETH összege a számítási kapacitáshoz kapcsolódik. Ezek a jutalmak megakadályozzák a rosszindulatú résztvevőket is abban, hogy szándékosan eltömítsék a hálózatot azzal, hogy végtelen ciklusokat vagy erőforrásigényes szkriptek végrehajtását kérik, mivel ezeknek a szereplőknek fizetni kell a kalkulációért.

Az ETH-t arra is használják, hogy kriptogazdasági biztonságot adjon a hálózatnak három módon: 1) a validátorok jutalmat kapnak, hogy blokkot javasolnak vagy kiszűrik a rosszhiszemű viselkedést; 2) a validátorok letétbe helyezik fedezetként a rosszhiszemű viselkedés elkerülése érdekében (csalás esetén az ETH megsemmisül); 3) a szavazatok súlyozására használják az újonnan javasolt blokkoknál, a konszenzusmechanizmus elágazási pontjához kapcsolódóan.

## Mi az az okosszerződés? {#what-are-smart-contracts}

A gyakorlatban a résztvevők nem írnak minden alkalommal új kódot, amikor számítást kérelmeznek az EVM-től. Ehelyett az alkalmazásfejlesztők programokat (újrafelhasználható kódrészleteket) töltenek fel az EVM tárhelyére, majd a felhasználók kérik, hogy ezeket a kódrészleteket lefuttassák változó paraméterekkel. A feltöltött és a hálózat által végrehajtott programokat okosszerződéseknek hívjuk.

Úgy is elképzelheti ezeket az okosszerződéseket, mint egyfajta ételautomata: egy szkript, amelyet ha meghívnak bizonyos paraméterekkel, végrehajt valamilyen akciót vagy számítást, ha bizonyos feltételek teljesülnek. Például egy egyszerű árusító okosszerződés létrehozhatná és átruházhatná egy digitális eszköz tulajdonjogát, ha a hívó fél ETH-t küld egy bizonyos címzettnek.

Bármely fejlesztő írhat egy okosszerződést és teheti nyilvánossá a hálózat számára úgy, hogy a blokkláncot egy adat rétegként használja a hálózatnak fizetett díj ellenében. Bármely felhasználó meghívhatja az okosszerződést és végrehajthatja a kódját szintén valamekkora díj ellenében.

Ezáltal az okosszerződésekkel a fejlesztők tetszőlegesen bonyolult felhasználó oldali alkalmazásokat és szolgáltatásokat fejleszthetnek és telepíthetnek: piactereket, pénzügyi eszközöket, játékokat stb.

## Terminológia {#terminology}

### Blokklánc {#blockchain}

Az összes blokk sorozata, amely elköteleződött az Ethereum hálózaton a hálózati történetben. A név onnan származik, hogy minden egyes blokk tartalmaz egy referenciát az előző blokkra, amely segít fenntartani egy sorrendet a összes blokk között (így egy pontos történetet is).

### ETH {#eth}

**Ether (ETH)** az Ethereum saját kriptovalutája. A felhasználók más felhasználóknak ETH-t fizetnek, hogy teljesítsék a kód végrehajtási kérelmeiket.

[Többet az ETH-ről](/developers/docs/intro-to-ether/)

### EVM {#evm}

Az Ethereum Virtuális Gép egy globális számítógép, amelynek állapota felett az Ethereum-hálózat minden résztvevője tárol és egyet ért. Bármely résztvevő kérelmezheti valamilyen tetszőleges kód végrehajtását az EVM-en; a kód végrehajtás megváltoztatja az EVM állapotát.

[További tudnivalók az EVM-ről](/developers/docs/evm/)

### Csomópontok {#nodes}

A valódi gépek, amelyek az EVM állapotot tárolják. A csomópontok kommunikálnak egymással, hogy információkat terjesszenek az EVM állapotáról és az új állapotváltozásokról. Bármely felhasználó kérheti a kód végrehajtását azáltal is, hogy kód végrehajtási kérelmet közvetít egy csomópontból. Az Ethereum hálózat az összes Ethereum csomópont és a kommunikációjuk összessége.

[Többet a csomópontokról](/developers/docs/nodes-and-clients/)

### Számlák {#accounts}

Ahol az ETH tárolódik. A felhasználók indíthatnak számlákat, ETH-t helyezhetnek el a számlákon, és utalhatnak át a számlájukról más felhasználóknak. A számlák és a számla egyenlegek egy nagy táblában vannak eltárolva az EVM-ben; a teljes EVM állapot részei.

[További tudnivalók a számlákról](/developers/docs/accounts/)

### Tranzakciók {#transactions}

A tranzakciós kérelem egy formális kifejezés a kód végrehajtási kérelemre az EVM-en, a tranzakció pedig egy teljesített tranzakciós kérelem és a hozzárendelt változás az EVM állapotában. Bármely felhasználó közvetíthet tranzakciós kérelmet a hálózatra egy csomópontból. Ahhoz, hogy a tranzakciókérelemnek valóban legyen hatása az elfogadott EVM-állapot felett, először validálni kell, végre kell hajtani és komittálni kell a hálózatra egy másik csomópont által. Bármely kód végrehajtása állapotváltozást okoz az EVM-ben; elkötelezettséggel ez az állapotváltozás a hálózat minden csomópontjához eljut. Néhány tranzakció példa:

- Küldjön X ETH-t a számlámról Alice számlájára.
- Publikáljon egy okosszerződéses kódot az EVM státuszba.
- Hajtsd végre az okosszerződés kódot az X címen az EVM-ben Y paraméterekkel.

[Többet a tranzakciókról](/developers/docs/transactions/)

### Blokkok {#blocks}

A tranzakciók száma nagyon magas, így a tranzakciókat adagokban vagy blokkokban „kötelezzük el”. A blokkok általában több tucat vagy több száz tranzakciót tartalmaznak.

[További tudnivalók a blokkokról](/developers/docs/blocks/)

### Okosszerződések {#smart-contracts}

Egy újra felhasználható kódrészlet (egy program), amelyet egy fejlesztő publikál az EVM státuszba. Bárki kérheti az okosszerződéses kód végrehajtását egy tranzakciós kérelemmel. Mivel a fejlesztők tetszőlegesen végrehajtható alkalmazásokat írhatnak az EVM-be (játékokat, piactereket, pénzügyi eszközöket stb.) okosszerződések publikálásával, ezért gyakran hívjuk ezeket [dappoknak, vagy decentralizált alkalmazásoknak](/developers/docs/dapps/).

[Többet az okos szerződésekről](/developers/docs/smart-contracts/)

## További olvasnivaló {#further-reading}

- [Ethereum fehérkönyv](/whitepaper/)
- [Amúgy hogyan működik az Ethereum?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**Megjegyzés:** bár ez a forrás még mindig értékes, de a [Beolvadás](/roadmap/merge) előtti, és ezért az említett proof-of-work mechanizmus helyett az Ethereum már [proof-of-stake](/developers/docs/consensus-mechanisms/pos)-et használ)

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_

## Kapcsolódó útmutatók {#related-tutorials}

- [Egy fejlesztő útmutatása az Ethereumba 1. rész](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Az Ethereum nagyon kezdőbarát felfedezése Python és web3.py használatával_
