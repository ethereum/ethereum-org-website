---
title: Elosztott validátor technológia
description: Az elosztott validátor technológia lehetővé teszi, hogy több entitás elosztva üzemeltessen egy Ethereum-validátort.
lang: hu
---

# Elosztott validátor technológia {#distributed-validator-technology}

Az elosztott validátor technológia (DVT) a validátor biztonságát akarja megerősíteni, ezért több entitásra osztja fel a kulcsok kezelését és az aláírási jogosultságokat, így kizárja az egyetlen meghibásodási pont kockázatát, a rugalmasság pedig nő.

Ennek érdekében **felosztja a validátort biztosító privát kulcsot** **több számítógépre**, melyeket klaszterbe rendez. Mivel a kulcs nem egyben van letárolva egyetlen gépen, ezért a támadóknak igen nehéz megszerezni azt. Még néhány csomópont is leállhat, a szükséges aláírás akkor is megtörténik a klaszterekben lévő gépek kisebb halmaza által. Ez lecsökkenti az egyetlen meghibásodási pont kockázatát a hálózatban, a validátorkészlet pedig megbízhatóbbá válik.

![Az ábra azt mutatja, hogy a validátorkulcsot szétosztják kulcsrészekre és több csomópontnak elosztják, melyek különféle komponensekből állnak.](./dvt-cluster.png)

## Miért van szükség az elosztott validátor technológiára (DVT)? {#why-do-we-need-dvt}

### Biztonság {#security}

A validátorok két nyilvános privát kulcspárt hoznak létre: a validátorkulcsot a konszenzusban való részvételhez, a visszavonási kulcsot ahhoz, hogy elérjék a pénzeszközöket. Miközben a visszavonási kulcsot tarthatja a validátor olyan helyen is, ahol lassabban éri el (cold storage), addig a privát kulcsnak folyamatosan online kell lennie (24/7). Ha a validátor privát kulcsa veszélybe kerül, akkor egy támadó átveheti felette a kontrollt, ami súlyos büntetéssel egybekötött kizáráshoz (slashing), illetve a letétbe helyezett ETH elvesztéséhez vezethet. A DVT segít ezt a kockázatot csökkenteni. A működése:

A DVT használatával a letétbe helyező (staker) részt vehet a letétbe helyezésben, miközben a validátor privát kulcsát cold storage-ban tartja. Ehhez az eredeti, teljes validátorkulcsot titkosítják és azután darabokra osztják. A kulcs darabjai online vannak és több csomópont megkapja azokat, így a validátor működése elosztódik ezek között. Ez azért lehetséges, mert az Ethereum-validátorok BLS aláírást használnak, ami összeadódik, tehát a teljes kulcsot bármikor összerakják a részekből. Tehát a letétbe helyező a teljes, eredeti validátorkulcsát biztonságban tarthatja offline.

### Nincs egyetlen meghibásodási pont sem {#no-single-point-of-failure}

Amikor a validátor több operátorra és több gépre van elosztva, akkor lesz offline, ha az egyedi hardverek vagy szoftverek leállnak. A leállás kockázatát azzal is lehet csökkenteni, hogy a klaszterbe tartozó csatlakozási pontoknak eltérő hardver- és szoftverkonfigurációkat állítanak össze. A rugalmasság nem kézzelfogható az egyetlen csatlakozási pontot használó validátorkonfigurációnál – ez a DVT megoldásból származik.

Ha a klaszter egyik gépének valamelyik komponense leáll (például a klaszter négy operátorából az egyik olyan klienst használ, amelyen hiba van), akkor a többiek biztosítják, hogy a validátor ugyanúgy működjön tovább.

### Decentralizáció {#decentralization}

Az Ethereum számára az az ideális szcenárió, ha annyi függetlenül üzemeltetett validátora van, amennyi csak lehetséges. Ugyanakkor néhány letétszolgáltató igen népszerű lett és a teljes letétbe helyezett ETH lényeges részét tudhatja magáénak a hálózaton. A DVT révén lehetséges ilyen operátorok működése, miközben a letétbe helyezett ETH megőrzi decentralizáltságát. Mivel a validátor kulcsai el vannak osztva több számítógépen, és a visszaéléshez sokkal komolyabb összejátszásra lenne szükség.

A DVT nélkül a letétszolgáltatóknak könnyebb csak egy-két klienskonfigurációt támogatni az összes validátorra, ami megnöveli a kliensből eredő hibák hatását. A DVT-vel ez a kockázat elosztható több klienskonfigurációra és különböző hardverekre, így sokrétűség rugalmasságot teremt.

**A DVT a következő előnyökkel jár az Ethereum számára:**

1. **Decentralizálja** az Ethereum proof-of-stake (PoS) konszenzusát
2. Biztosítja a hálózat **aktív, élő állapotát (liveness)**
3. A validátor **toleránssá válik a hibákra**
4. **Minimalizált bizalomigény** jellemzi a validátor működését
5. **Minimalizált büntetéssel egybekötött kizárás (slashing)** és leállási kockázat
6. **Javítja a diverzitást** (kliens, adatközpont, hely, szabályozás stb.)
7. **Nagyobb biztonság** a validátorkulcs kezelését illetően

## Hogyan működik a DVT? {#how-does-dvt-work}

A DVT megoldás a következő komponensekből áll:

- **[Shamir-féle titokmegosztás ](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** – A validátorok [BLS-kulcsokat](https://en.wikipedia.org/wiki/BLS_digital_signature) használnak. Az egyéni BLS-kulcsrészeket össze lehet kapcsolni egy aggregált kulccsá (aláírás). A DVT esetén a validátor privát kulcsa a klaszter operátorainak összekapcsolt BLS-aláírása.
- **[Aláírási küszöb séma](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** – Meghatározza az egyéni kulcsrészek számát, melyekkel az aláírás meg tud történni, pl. 4-ből 3.
- **[Elosztottkulcs-generálás (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** – Egy kriptográfiai folyamat, ami létrehozza a kulcsrészeket és elosztja egy létező vagy új validátorkulcs részeit a klaszterben található csomópontoknak.
- **[Több résztvevős számítás (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** – A teljes validátorkulcs titokban készül el a több résztvevős számítás révén. Egyetlen operátor sem ismeri a teljes kulcsot, ők csak a saját részüket ismerik.
- **Konszenzusprotokoll** – A konszenzusprotokoll kiválaszt egy csomópontot, hogy az javasoljon blokkot. Az megosztja a blokkot a klaszter többi csomópontjával, amelyek hozzáteszik a kulcsrészeiket az aggregált aláíráshoz. Amikor a kellő mennyiségű kulcsrészlet összeáll, megtörténhet a blokk előterjesztése az Ethereumon.

Az elosztott validátorok ellenállóbbak a hibákkal szemben, és akkor is képesek működni, ha az egyéni csomópontok közül néhány leáll. A klaszter tehát ellenálló, még ha a benne lévő csomópontokról ki is derül, hogy ártalmasak vagy lusták.

## A DVT alkalmazási területei {#dvt-use-cases}

A DVT jelentős hatást gyakorol a kiterjedtebb letétszolgáltató iparágban:

### Önálló letétesek {#solo-stakers}

A DVT lehetővé teszi a nem felügyelt letétbe helyezést is, mivel a validátorkulcsot távoli csomópontok között is el lehet osztani, miközben a teljes kulcsot offline tárolják. Tehát az otthoni letéteseknek nem feltétlenül kell, hogy hardverre költsenek, mivel a kulcsrészek elosztása megerősítheti őket a lehetséges támadások ellen.

### Letétbe helyezés mint szolgáltatás (SaaS) {#saas}

Az operátorok (mint letéti alapok és intézményi letétesek), akik sok validátort kezelnek, a DVT révén csökkenthetik kockázatukat. Az infrastruktúra elosztásával a működésükhöz redundanciát (extra kapacitást) tudnak adni és diverzifikálják a hardvertípusok használatát is.

A DVT megosztja a kulcskezelés felelősségét számod csomóponton keresztül, így az üzemeltetési költség is megosztható. A DVT csökkenti a letétszolgáltatók üzemeltetési kockázatát és biztosítási költségeit.

### Letéti alapok {#staking-pools}

A standard validátorbeállítás következtében a letéti alapok és a likvid letétbe helyezők kénytelenek egy operátorral működő validátorban változó szinten megbízni, mivel a nyereségek és a veszteségek az egész alapot érintik. Emellett bízniuk kell az operátorokban, hogy biztonságban tartják az aláírási kulcsokat, mert korábban nem volt erre másik megoldás.

Habár hagyományos módon tettek erőfeszítéseket, hogy elosszák a kockázatot azáltal, hogy több operátor között elosztják a letétet, de az operátorok még így is jelentős letétet kezelnek független módon. Nagy kockázatot jelent, amikor egyetlen operátorra támaszkodik a folyamat, ha az alulteljesít, leáll, kompromittálódik vagy ártó módon cselekszik.

A DVT kihasználásával az operátoroknak nem kell másban bízniuk. **Az alapok megengedik az operátoroknak, hogy letétet kezeljenek anélkül, hogy a validátorkulcsot felügyelet alá kellene helyezniük** (mivel csak a kulcsrészeket használják). A kezelt letéteket is több operátor között tudják elosztani (pl. egyetlen operátor helyett, aki 1000 validátort kezel, a DVT-vel ezeket a validátorokat több operátor együtt tudja működtetni). A különféle operátorkonfigurációk biztosítják, hogy az egyik operátor leállásával a többiek még mindig el tudják végezni a tanúsítást. Ennek eredményeként redundancia (extra kapacitás) és diverzifikáció jön létre, ami jobb teljesítményt és rugalmasságot hoz, miközben maximalizálja a nyereséget.

Az egyoperátoros bizalom minimalizálása következtében a letéti alapok nyitottabb és külön engedélyhez nem kötött operátorrészvételt engedhetnek meg. A szolgáltatóknak így kevesebb kockázattal kell számolniuk, támogatja az Ethereum decentralizációt azáltal, hogy válogatott és külön engedély nélküli operátorcsoportokat is használ, például összepárosítva az otthoni vagy kisebb letéteseket a nagyobbakkal.

## A DVT lehetséges hátrányai {#potential-drawbacks-of-using-dvt}

- **Még egy komponens** – DVT-csomópont hozzáadásával még egy összetevő lehet hibás vagy sebezhető. Ennek minimalizálásához arra kell törekedni, hogy a DVT csomópontot többféle beállítással, vagyis több DVT-klienssel kell használni (ahogy a konszenzus és végrehajtási rétegre is többféle kliens létezik).
- **Működési költségek** – mivel a DVT elosztja a validátort több entitás között, ezért (egy helyett) több csomópontra van szükség a működéshez, ami nagyobb költséggel jár.
- **A késedelem lehetséges növekedése** – mivel a DVT konszenzusprotokollt használ ahhoz, hogy megegyezést érjen el a több csomópont között, melyek a validátort működtetik, ezért a késedelem megnövekedhet.

## További olvasnivaló {#further-reading}

- [Az Ethereum elosztott validátorának specifikációja (átfogó)](https://github.com/ethereum/distributed-validator-specs)
- [Az Ethereum elosztott validátorának technikai specifikációi](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Shamir titokmegosztási bemutató alkalmazás](https://iancoleman.io/shamir/)
