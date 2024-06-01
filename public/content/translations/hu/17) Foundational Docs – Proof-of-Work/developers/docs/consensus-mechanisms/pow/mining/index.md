---
title: Bányászat
description: Áttekintés – hogyan működött a bányászat az Ethereumon.
lang: hu
---

<InfoBanner emoji=":wave:">
A proof-of-work (munkaigazolás) már nem az Ethereum konszenzusmechanizmus alapja, tehát a bányászatot kikapcsolták. Ehelyett az Ethereumot úgy biztosítják a validátorok, hogy letétbe helyeznek ETH-t. Ön is letétbe helyezheti a rendelkezésére álló ETH-t. Tudjon meg többet a <a href='/roadmap/merge/'>egyesítés (Merge)</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake (letéti igazolás)</a> és <a href='/staking/'>letétbe helyezés</a> témákról. Ez az oldal csak elavult témákat tartalmaz.
</InfoBanner>

## Előfeltételek {#prerequisites}

Javasoljuk, hogy olvassa el a [tranzakciók](/developers/docs/transactions/), [blokkok](/developers/docs/blocks/) és a [proof-of-work](/developers/docs/consensus-mechanisms/pow/) oldalakat is.

## Mi az az Ethereum bányászat? {#what-is-ethereum-mining}

A bányászat az a tevékenység, amikor tranzakciókból álló blokkokat hoznak létre, hogy azokat hozzáadják az Ethereum-blokklánchoz abban a proof-of-work architektúrában, melyet már kivezettek az Ethereumból.

A bányászat kifejezés a kriptovaluták aranyhoz hasonló kinyerésére vonatkozott. Az arany vagy más nemesfémek ritkák, ahogy a digitális tokenek is, ezért a mennyiséget egy proof-of-work-alapú rendszerben a bányászattal lehetett növelni. A proof-of-work-alapú Ethereumban a kibocsátás egyetlen módja a bányászat volt. Az arany és más bányászatához képest ugyanakkor az Ethereumban ez volt a hálózat biztosításának módja a blokkláncba létrehozott, ellenőrzött, publikált és elterjesztett blokkok révén.

Ether bányászata = A hálózat biztosítása

A bányászat a proof-of-work blokkláncok lényege. Az Ethereum-bányászok – szoftvert futtató számítógépek – az idejüket és számítási kapacitásukat fordították a tranzakciók feldolgozására és blokkok létrehozására a proof-of-stake mechanizmus bevezetése előtt.

## Miért léteznek a bányászok? {#why-do-miners-exist}

Az Ethereumhoz hasonló decentralizált rendszerek esetében biztosítanunk kell, hogy mindenki egyetért a tranzakciók sorrendjében. A bányászok segítettek, hogy ez megtörténjen úgy, hogy számítás szempontjából nehéz rejtvényeket oldottak meg azért, hogy blokkokat hozhassanak létre, amely így megvédte a hálózatot a támadásoktól.

[Bővebben a proof-of-work mechanizmusról](/developers/docs/consensus-mechanisms/pow/)

Korábban bárki bányászhatott az Ethereum hálózaton a számítógépét használva. Ugyanakkor nem mindenkit tudott nyereségesen bányászni ethert (ETH). A legtöbb esetben a bányászoknak dedikált számítógépes hardvereket kellett szerezniük, és hozzá kellett férniük az energiaforrásokhoz. Egy átlagos számítógép nem valószínű, hogy elég blokkjutalmat tudott szerezni, hogy fedezze a bányászat költségeit.

### A bányászat költsége {#cost-of-mining}

- Annak a hardvernek a valószínű költsége, mely a bányászati eszköz felépítéséhez és fenntartásához szükséges
- A bányászati eszközt működtető elektromosság költsége
- Ha egy bányászati alapban vett részt valaki, akkor az alap általában egy %-os általánydíjat számolt fel minden létrehozott blokk után
- A bányászati eszköz támogatásához szükséges dolgok költségei (szellőztető, energiamonitorozás, elektromos vezetékek stb.)

A bányászat nyereségességét olyan bányászati kalkulátor segítségével ellenőrizheti, mint amilyen az [Etherscan](https://etherscan.io/ether-mining-calculator) oldalon is található.

## Hogyan bányászták ki az Ethereum-tranzakciókat {#how-ethereum-transactions-were-mined}

A következőkben a tranzakciók bányászatáról olvashat egy áttekintés az Ethereum proof-of-work mechanizmusa idejéből. Az Ethereum proof-of-stake mechanizmusára vonatkozó leírást [itt](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos) találja.

1. A felhasználó létrehoz és aláír egy [tranzakciós](/developers/docs/transactions/) kérvényt valamely [számla](/developers/docs/accounts/) privát kulcsával.
2. A felhasználó közvetíti a tranzakciós kérelmet a teljes hálózat számára valamilyen [csomópontról](/developers/docs/nodes-and-clients/).
3. Amint tudomást szereznek a tranzakció kérvényről, az Ethereum hálózat valamennyi csomópontja hozzáadja a kérvényt a lokális mempooljához, ami azokat a tranzakciós kérvényeket tartalmazza, amikről már tudomást szereztek, de még nem adták hozzá a blokklánchoz egy blokkban.
4. Egy bizonyos ponton egy bányászcsomópont több tucat vagy több száz tranzakciós kérvényt összesít egy potenciális [blokkba](/developers/docs/blocks/) úgy, hogy a begyűjtött [tranzakciós díj](/developers/docs/gas/) maximális legyen, de ne lépje túl a blokk gázkorlátozását. Ezután a bányász csomópont:
   1. Ellenőrzi az egyes tranzakciós kérelmek érvényességét (azaz senki nem próbál ethert átutalni olyan számláról, amelyhez nem készített aláírást, a kérés nem hibás, stb.), majd végrehajtja a kérés kódját, megváltoztatva az EVM helyi másolatának állapotát. A bányász a tranzakciós díjat minden ilyen tranzakciós kérvényért a saját számlájára teszi.
   2. Elindítja a proof-of-work “megbízhatósági bizonyítvány” előállításának folyamatát a potenciális blokkra, amint az összes tranzakciós kérelmet érvényesítette és végrehajtotta a helyi EVM másolaton.
5. Végül egy bányász befejezi a bizonyítvány elkészítését egy blokkra, mely tartalmazza a mi specifikus tranzakciós kérelmünket. A bányász ezután közvetíti a kész blokkot, mely tartalmazza a bizonyítványt és az ellenőrző összeget az új, kiállított EVM állapotról.
6. A többi csomópont is tudomást szerez a blokkról. Érvényesítik a bizonyítványt, saját maguk is végrehajtják a blokk összes tranzakcióját (beleértve azt is, amit eredetileg a felhasználónk közvetített), és megbizonyosodnak arról, hogy az új tranzakciók végrehajtása utáni EVM állapotuk ellenőrző összege megegyezik a bányász által kiállított blokk állapotának összegével. Csak ezután fűzik hozzá ezek a csomópontok ezt a blokkot a blokkláncuk végére, és fogadják el az új EVM állapotot, mint kanonikus új állapot.
7. Minden csomópont eltávolítja az új blokkban lévő összes tranzakciót a teljesítetlen tranzakciós kérvényeket tartalmazó helyi mempooljából.
8. A hálózatba újonnan becsatlakozó csomópontok letöltik az összes blokkot a sorrendet betartva, beleértve azt a blokkot is, mely a szóban forgó tranzakciónkat tartalmazza. Inicializálnak egy helyi EVM másolatot (mely egy üres állapotú EVM-ként indul), ezután végig mennek az összes blokkban található összes tranzakció végrehajtásának folyamatán a helyi EVM másolatukon, miközben érvényesítik a blokkok állapotainak ellenőrző összegeit.

Minden tranzakciót egyszer bányásznak ki (blokkba foglalják és első alkalommal közvetítik), de minden résztvevő végrehajtja és érvényesíti azokat a kanonikus EVM-állapot előrevitelének folyamatában. Ez kiemeli a blokklánc egyik központi mantráját: **Nem kell megbíznia senkiben. Csak ellenőrizni.**.

## Ommer (nagybácsi) blokkok {#ommer-blocks}

A proof-of-work mechanizmusban végzett blokkbányászat valószínűségen alapult, tehát néha a hálózati késedelem miatt két érvényes blokkot is publikáltak egyszerre. Ebben az esetben a protokoll kiválasztotta a leghosszabb láncot (amelyik érvényesebb volt), miközben díjazta azt a bányászt is egy részleges jutalommal, akinek nem került be a javasolt blokkja. Ez bátorította a hálózat decentralizációját, mert a kisebb bányászok, akiknél nagyobb volt a csúszás, még mindig tudtak nyereséget szerezni az [ommer](/glossary/#ommer) blokkok jutalmából.

Az „ommer” kifejezés a szülőblokk testvérblokkjának semleges formája, de néha nagybácsi/uncle formában is hivatkoznak rá. **Mióta az Ethereum átállt a proof-of-stake mechanizmusra, többé nincsenek ommer blokkok**, mivel csak egy előterjesztő van minden slotban. Ezt a változást megtekintheti a kibányászott ommer blokkok [előzményábráján](https://ycharts.com/indicators/ethereum_uncle_rate) is.

## Egy vizuális bemutató {#a-visual-demo}

Tekintse meg, ahogy Austin elmagyarázza a bányászatot és a proof-of-work blokkláncot.

<YouTube id="zcX7OJ-L8XQ" />

## A bányászati algoritmus {#mining-algorithm}

Az Ethereum főhálózat csak egy bányászati algoritmust használt, az [Ethash-t](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Az Ethash a [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/) néven ismert R&D algoritmus utódja volt.

[Bővebben a bányászati algoritmusokról](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Kapcsolódó témák {#related-topics}

- [Gáz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
