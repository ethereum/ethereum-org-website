---
title: Cancun-Deneb (Dencun) FAQ
description: Gyakori kérdések a Cancun-Deneb (Dencun) hálózati frissítés kapcsán
lang: hu
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) az Ethereum-hálózat fejlesztése, mely bevezeti a **Proto-Danksharding (EIP-4844)** fejlesztést, lehetővé teszi az átmeneti **adatblobok** használatát, hogy olcsóbb legyen a [második blokkláncréteg (L2)](/glossary/#layer-2) összegzők tárolása.

Egy új tranzakciótípus lehetővé teszi, hogy az összegzők költséghatékonyabban tudjanak adatot tárolni az úgynevezett „blobokban”. A blobok kb. 18 napig (pontosabban 4096 [korszakig](/glossary/#epoch)) elérhetők a hálózaton. Ezután a blobokat leválasztják a hálózatról, de az alkalmazások még mindig tudják az adatérvényességet ellenőrizni a bizonyítékok révén.

Ez rendkívüli módon csökkenti az összegzők költségét, behatárolja a lánc növekedését, és több felhasználót képes kiszolgálni, miközben megtartja a biztonságot és a csomópontüzemeltetők decentralizált struktúráját.

## Mikor lesznek az összegzőknek alacsonyabb díjaik a Proto-Danksharding következtében? {#when}

- A frissítés a 269 568. korszakban lett telepítve, **2024. március 13-án, 13:55-kor (UTC)**
- A legnagyobb összegzők, mint az Arbitrum vagy Optimism, jelezték, hogy a blobokat azonnal használni fogják a frissíté után
- Az egyéni összegzők eltérő időpontban fognak átállni, mert mindnek frissíteni kell a maga rendszerét, hogy ki tudja használni az új blob-helyet

## Hogyan lehet az ETH-t átváltani a végleges elágazás után? {#scam-alert}

- **Az ETH-szel nincs teendője**: Az Ethereum Dencun frissítés után nincs szükség arra, hogy átváltsa vagy frissítse az ETH-t. A számlaegyenlege ugyanaz marad, a jelenleg Ön által birtokolt ETH elérhető marad az aktuális állapotában a végleges elágazás után is.
- **Figyeljen oda a csalásokra!** <Emoji text="⚠️" /> **bárki mondja, hogy „frissítse” az ETH-t, az be akarja Önt csapni.** Ezzel a hálózatfrissítéssel kapcsolatban Önnek semmilyen teendője nincs. A pénzeszközei teljesen érintetlenek maradnak. Emlékezzen rá, hogy a legjobb védekezés a csalások ellen, ha Ön tájékozott.

[Bővebben a csalások felismeréséről és elkerüléséről](/security/)

## Milyen problémát old meg a Dencun hálózati frissítés? {#network-impact}

A Dencun elsődlegesen a **skálázhatóságot** célozza (több felhasználó és több tranzakció kezelését) **megengedhető díjak** mellett, miközben a hálózat **decentralizációja megmarad**.

Az Ethereum közössége egy összegzőalapú megközelítést alkalmaz a növekedésre, melynél a második blokkláncréteg (L2) összegzők biztosítják, hogy több felhasználó biztonságos módon használja a rendszert.

A rollup hálózatok a főhálózattól függetlenül kezelik a tranzkaciók _feldolgozását_ (vagy „végrehajtását”), majd publikálják az eredmény kriptográfiai bizonyítékát és/vagy a tömörített tranzakciós adatokat a főhálózaton, hogy azok felkövethetők legyenek. Ezen bizonyítékok tárolása költséges ([gáz](/glossary/#gas) formájában), melyet a Proto-Danksharding előtt állandó módon kellett tárolnia minden csomópontüzemeltetőnek, ami drága feladat.

A Proto-Danksharding bevezetése a Dencun frissítés által olcsóbb adattárolást tesz lehetővé ezen bizonyítékoknak, mivel a csomópontüzemeltetőknek csak 18 napig kell tárolni azokat, utána biztonsággal eltávolíthatóak, hogy ne növeljék tovább a hardverigényeket.  Mivel az összegzőknek általában 7 napos visszavonási periódusuk van, ezért a biztonsági modelljük változatlan marad, amíg az L1-en ugyanilyen hosszen elérhetők a blobok. A 18 napos periódus egy kellően nagy időszakot biztosít erre.

[Bővebben az Ethereum skálázásról](/roadmap/scaling/)

## Hogyan lehet a régi blobadatokat elérni? {#historical-access}

Miközben az általános Ethereum-csomópontok a hálózatnak a _jelen állapotát_ tárolják, a korábbi blobadatokat kb. 18 nappal később már mellőzni lehet. Mielőtt az adatot eltávolítaná, az Ethereum biztosítja, hogy az összes hálózati résztvevőnek elérhető volt arra, hogy:

- Az érdekelt felek letöltsék és eltárolják az adatokat.
- Az összegző megkérdőjelezési periódusai lezáruljanak.
- Az összegző tranzakciói véglegessé váljanak.

A blob-_előzményadatok_ számos okból szükségesek lehetnek, illetve azokat több decentralzált protokoll is elérheti és tárolhatja:

- **Harmadik fél indexáló protokollok**, mint a The Graph, amelyek csomópont-üzemeltetők decentralizált hálózata révén tárolják ezeket az adatokat, melyet kriptogazdasági mechanizmusokkal ösztönöznek.
- **BitTorrent** egy decentralizált protokoll, ahol az önkéntesek tárolják és terjesztik ezeket az adatokat másoknak.
- **[Ethereum portal network](/developers/docs/networking-layer/portal-network/)** célja, hogy elérést biztosítson az Ethereum összes adatához a csomópont-üzemeltetők decentralizált hálózatán keresztül, akik között elosztják az adatokat, ahogy a BitTorrent esetében.
- **Egyéni felhasználók** bármikor eltárolhatják az adatokat, amelyre historikus okokból szükségük lehet.
- **Rollup szolgáltatók** számára érdemes tárolni ezeket az adatokat, hogy jobb legyen a felhasználói élmény.
- **Blokkfelfedezők** általában olyan archív csomópontokat futtatnak, melyek indexálják és eltárolják az összes információt, hogy visszakereshető legyen a felhasználóknak egy webfelületen keresztül.

Fontos megjegyezni, hogy az előzményállapotok visszahíváse egy **N-ből 1 bizalmi modellen** alapszik. Eszerint csak _egyetlen megbízható forrásból_ kell adat ahhoz, hogy ellenőrizhető legyen a helyessége a hálózat jelen állapotát felhasználva.

## Hogyan járul hozzá ez a frissítés az Ethereum nagyobb útitervéhez? {#roadmap-impact}

Proto-Danksharding elősegíti a teljes [Danksharding](/roadmap/danksharding/) bevezetést. A Danksharding lényege, hogy a rollup-adatok tárolását elosztja a csomópont-üzemeltetők között, így az egyes operátoroknak csak a teljes adat egy kis részét kell kezelniük. Ez az elosztás megnöveli a blokkonkénti adatblobok számát, ami alapvető az Ethereum skálázásához, hogy több felhasználót és tranzakciót tudjon kezelni.

Ez a skálázási megoldás elengedhetetlen ahhoz, hogy [felhasználók milliárdjait támogassa az Ethereum](/roadmap/scaling/) megengedhető díjakkal és fejlettebb alkalmazásokkal, miközben megőrzi a hálózat decentralizáltságát. E változások nélkül a csomópontüzemeltetők hardverigényei megnövekednének, amely egyre drágább gépeket követelne tőlük. Emiatt a kisebb üzemeltetők kiesnének a működésből, amitől koncentrálódna a hálózat irányítása néhány nagy operátornál, és ez ellene megy a decentralizáció alapelvének.

## Érinti ez a frissítés az Ethereum összes konszenzusát és validátorkliensét? {#client-impact}

Igen, a Proto-Danksharding (EIP-4844) következtében mind a végrehajtási klienseket, mind a konszenzusklienseket frissíteni kell. Az összes Ethereum-kliens új verziója elérhető, hogy alátámassza ezt a frissítést. A frissítés után az Ethereum-hálózattal való szinkronizáció érdekében a csomópont-üzemeltetőknek támogatott kliensverziót kell futattniuk. Vegye figyelembe, hogy a kliensverziók adott időben érvényesek, a felhasználók a legutóbbi frissítéseket vegyék figyelembe. [Tekintse meg a támogatott kliensverziók részleteit](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

A konszenzuskliensek kezelik a _validátorszoftvert_, melyek mind frissítve lettek, hogy eleget tegyenek a változásnak.

## Hogyan érinti a Cancun-Deneb (Dencun) a Goerlit és az Ethereum egyéb teszthálózatait? {#testnet-impact}

- A fejlesztői hálózatok, a Goerli, Sepolia és a Holesky is mind átesik a Dencun frissítésen és a Proto-Danksharding teljes mértékben működik ezekben
- A rollup-fejlesztők használhatják ezeket a hálózatokat az EIP-4844 tesztelésre
- A legtöbb felhasználót ugyanakkor a teszthálózatok változása egyáltalán nem érinti

## Innentől fogva az összes L2-es tranzakció blobhelyet használ majd, vagy választani lehet? {#calldata-vs-blobs}

Az Ethereum második blokkláncrétegének (L2) összegzői kétféle tárhelyet használhatnak: átmeneti blobhely vagy állandó okosszerződéses calldata. A blobhely egy gazdaságos megoldás, átmeneti tárolást ad alacsonyabb költségen. Biztosítja az adatelérhetőséget a megkérdőjelezési időszakra. Másrészt az okosszerződés calldata állandó tárhelyet biztosít, de sokkal drágább.

A döntést a blobhely és a calldata között a rollup-szolgáltatók hozzák meg. Ezt a döntést a blobhely iránti igény befolyásolja. Ha a bobhelyre nagy az igény, akkor a rollupok talán a calldata-t választják, hogy időben el tudják tárolni az adatokat.

Bár elméletileg a felhasználó is választhat, de az a jellemző, hogy a rollup-szolgáltatók hozzák meg ezt a döntést. Ha a felhasználók hoznának döntést, az összetettebb helyzetet teremtene, főleg a költséghatékény tranzakciócsomagolás esetén. E döntés részleteit a felhasználók megtekinthetik a rollup-szolgáltatók dokumentációiban.

## A 4844 csökkenti az L1 gázdíjat? {#l1-fee-impact}

Nem igazán. Egy új gázpiac jött létre kizárólag a blobhelyeknek a rollup-szolgáltatók részére. _Habár az L1 díjak csökkenhetnek azzal, hogy a rollup-adatokat blobokba teszik, ez a frissítés elsősorban arra fókuszál, hogy az L2-es díjak csökkenjenek. Az L1 (főhálózat) díjainak csökkenése másodlagos hatás, mely kisebb mértékű._

- Az L1 gázcsökkenés arányos azzal, hogy a rollup-szolgáltatók mennyire kezdik el használni a blobadatokat
- Az L1 gáz valószínűleg versenyképes marad a nem rollup-jellegű tevékenységek révén
- Azok az összegzők, amelyek blobhelyet használnak, kevesebb L1 gázt igényelnek, ezért annak díja csökkenhet
- A blobhely még behatárolt, ezért ha egy blokkban tele van a blob, akkor a rollup kénytelen állandó tárhelyet használni, ami növeli az L1 és L2 gázárakat is

## Csökkenteni fogja ez a változás a többi EVM L1 blokkláncok díjait? {#alt-l1-fee-impact}

Nem. A Proto-Danksharding által hozott előnyök az Ethereum L2 rollupokra vonatkoznak, melyek a bizonyítékokat az L1-en (főhálózat) tárolják.

Az a tény, hogy valami kompatibilis az Ethereum virtuális géppel (EVM), nem jelenti azt, hogy ebből a frissítésből bármilyen előnyt is élvezne. Az Ethereumtól függetlenül működő hálózatok (legyenek akár EVM-kompatibilisek vagy sem) nem tárolják az adataikat az Ethereumon, így nem hoz számukra előnyt ez a frissítés.

[Bővebben az L2 rollupokról](/layer-2/)

## Ön inkább vizuális típus? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Az Ethereum skálázása, EIP-4844 — Finematics_

<YouTube id="dFjyUY3e53Q" />

_Blobhely 101 Domothy-val — Bankless_

## További olvasnivaló {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Elosztott blob tranzakciók (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Dencun főhálózati bejelentés](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Ethereum Foundation blog_
- [The Hitchhiker's Guide to Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Proto-Danksharding GYIK](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Részletes magyarázat az EIP-4844-ről: A Cancun frissítés lényege](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [AllCoreDevs Update 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
