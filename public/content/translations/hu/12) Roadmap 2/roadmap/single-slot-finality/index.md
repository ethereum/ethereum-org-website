---
title: Egy sloton belüli véglegesség
description: Az egy sloton belüli véglegesség magyarázata
lang: hu
---

# Egy sloton belüli véglegesség {#single-slot-finality}

Jelenleg 15 percet vesz igénybe, hogy egy Ethereum blokk véglegesedjen. Ugyanakkor az Ethereum konszenzusmechanizmusa úgy is fejleszthető, hogy a blokk validálása hatékonyabb legyen, és a véglegességhez szükséges idő drasztikusan csökkenjen. Ahelyett, hogy egy blokk javaslásához tizenöt perc kellene, azt ugyanabban a slotban lehessen javasolni és véglegesíteni. Ezt a koncepciót nevezik **egy sloton belüli véglegességnek (SSF)**.

## Mi az a véglegesség? {#what-is-finality}

Az Ethereum proof-of-stake alapú konszenzusmechanizmusában a véglegesítés arra utal, hogy a blokkot nem lehet megváltoztatni vagy eltávolítani a blokkláncból anélkül, hogy legalább 33%-nyi résztvevő vállalná az ezzel járó súlyos büntetést, vagyis az ETH elégetését. Ez egy kriptogazdasági biztonság, mert nagyon nagy költséggel járna, ha valaki meg akarná változtatni a lánc sorrendjét vagy tartalmát, így a racionális gazdasági szereplők nem vállalnák.

## Miért törekszünk gyorsabb véglegesítésre? {#why-aim-for-quicker-finality}

A véglegessé válás jelenlegi ideje túl hosszúnak bizonyult. A legtöbb felhasználó nem akar 15 percet várni, hogy végleges legyen a tranzakciója. Továbbá az alkalmazások és tőzsdék számára is kellemetlen, amelyek gyors tranzakcióátvitelt szeretnének, és mégis sokáig kell várniuk, hogy állandónak tekinthessék a változást. A blokk előterjesztése és a véglegesítése közötti idő arra is lehetőséget teremt, hogy egy támadó átrendezze a tartalmat, illetve hogy blokkokat cenzúrázzon vagy MEV-et szerezzen. Az a mechanizmus, amely a várakozó blokkok frissítését intézi, elég összetett és számtalanszor volt már javítva, hogy a gyenge biztonsági pontokat lezárják, így ez az Ethereum kódjának ez az a része, ahol kisebb hibák nagy valószínűséggel fordulnak elő. Ezeket a problémákat mind megoldaná, hogy ha egy slotban véglegessé válna a blokk.

## A decentralizáció/idő/költség átváltása {#the-decentralization-time-overhead-tradeoff}

A véglegesség garanciája az új blokknál nem azonnal történik meg; idő kell ahhoz, hogy a blokkot véglegesnek tekintsük. Ennek az az oka, hogy a véglegesítéshez a teljes letétbe helyezett ETH 2/3-át képviselő validátoroknak tanúsítaniuk kell az új blokkot. A hálózat minden validáló csomópontjának a többi csomóponttól érkező tanúsításokat kell feldolgoznia, hogy a blokk elérte a 2/3-os határt vagy nem.

Minél rövidebb idő alatt kell elérni a véglegesedést, annál komolyabb számítási kapacitásra van szükség a csomópontoknál, mert a tanúsítást gyorsan kell elvégezni. Emellett minél több validáló csomópont van a hálózaton, annál több tanúsításra van szükség blokkonként, ami növeli a feldolgozási kapacitási igényt. Ha nagyobb feldolgozási kapacitás szükséges, akkor kevesebb személy vehet részt benne, mert drága hardvert kell ahhoz használni, hogy a validáló csomópont működjön. Ha a blokkok között több idő telik el, akkor kevesebb számítási kapacitás is elég a csomópontokhoz, de a véglegesedés is később történik meg, mert a tanúsításokat lassan dolgozzák fel.

Így tehát átváltás van jelen a költség (számítási kapacitás), a decentralizáció (a validációban részt vevő csomópontok száma) és a véglegesítés ideje között. Az ideális rendszer a minimális számítási kapacitás, a maximális decentralizáció és a minimális véglegesítési idő között egyensúlyoz.

Az Ethereum jelenlegi konszenzusmechanizmusa e három paraméter között a következőképpen egyensúlyoz:

- **A minimális letétbe helyezést 32 ETH-ben állapítja meg**. Ez meghatároz egy felső határt arra, hogy a validátoroknak mennyi tanúsítást kell végezniük, amelyet az egyéni csomópontok hajtanak végre, és ezáltal egy felső határt határoz meg e csomópontok számítási igényeinek is.
- **A véglegesítés idejét kb. 15 percre teszi**. Ez elegendő időt ad az otthoni számítógépen futó validátoroknak is, hogy biztonsággal elvégezzék minden blokk tanúsítását.

A jelenlegi mechanizmussal a véglegesítés idejét úgy lehet csökkenteni, ha csökkentjük a validátorok számát a hálózaton vagy növeljük a hardverszükségletet minden csomópont esetében. Ugyanakkor fejleszthető a tanúsítások végzése is, amellyel több tanúsítás lehetséges növekvő költség és az egyes csomópontok túlterhelése nélkül. A hatékonyabb végrehajtás lehetővé teszi, hogy a véglegesítés egy sloton belül, ne két korszak alatt történjen meg.

## Az egy sloton belüli véglegesítéshez (SSF) vezető út {#routes-to-ssf}

<ExpandableCard title= "Miért nem lehet bevezetni az SSF-et akár ma?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

A jelenlegi konszenzusmechanizmus összekombinálja a több validátortól, vagyis a bizottságtól származó tanúsítást, hogy csökkentse az üzenetek számát, amelyet minden validátornak fel kell dolgoznia a validálás során. Minden validátornak lehetősége van tanúsítani egy adott korszakban (32 slot), de egy adott slotban csak a validátorok egy csoportja, a bizottság végzi a tanúsítást. Ehhez alhálózatokra osztódnak, amelyekben néhány validátor aggregátorként működik. Ezek az aggregátorok a saját alhálózatukban lévő validátortól látott összes aláírást összevonják egy aggregált aláírásba. Az aggregátor, aki a legtöbb egyéni hozzájárulást tudta összevonni, átadja az aggregált aláírást a blokk javaslattevőjének, aki azt beleteszi a blokkba a többi bizottságtól kapott aggregált aláírással együtt.

Ez a folyamat elegendő kapacitást ad minden validátornak, hogy szavazzon minden korszakban, mert ez korszakonként 32 slot × 64 bizottság× 256 validátor bizottságonként = 524 288 validátor. A jelen szöveg írásának időpontjában (2023. február) kb. 513 000 aktív validátor van.

E séma szerint egy teljes korszak kell ahhoz, hogy minden validátor részt vehessen a tanúsításban egy blokkhoz kapcsolódóan. Ugyanakkor lehetséges ezt a mechanizmust úgy is továbbfejleszteni, hogy minden validátor minden slotban végezhessen tanúsítást.
</ExpandableCard>

Mióta az Ethereum konszenzusmechanizmusát megtervezték, az aláírásaggregálás sémája (BLS) sokkal skálázhatóbbnak bizonyult, mint azt korábban gondolták, és közben a kliensek is fejlődtek az aláírások feldolgozásában és ellenőrzésében. Kiderült, hogy a nagy számú validátor valójában egyetlen slotban is képes végrehajtani a tanúsításokat. Például egymillió validátorral, akik közül mindenki kétszer szavaz egy slotban, a slot ideje pedig 16 másodperc, a csomópontoknak az aláírások ellenőrzését egy minimális másodpercenként 125 000 aggregációs rátán kellene végrehajtaniuk, hogy egymillió tanúsítást végezzenek a slotban. Valójában egy átlagos számítógépnek 500 nanomásodpercig tart egy aláírás ellenőrzése, tehát 125 000 ellenőrzést nagyjából 62,5 ms alatt végezne el – jóval az egy másodperces határ alatt.

Még hatékonyabb lenne, ha szuperbizottságokat hoznának létre, pl. 125 000 véletlenszerűen kiválasztott validátort slotonként. Csak ezek a validátorok szavaznának egy adott blokkra, ezért a validátoroknak csak ezen alcsoportja döntene a blokk véglegesítéséről. Hogy vajon ez egy jó ötlet vagy sem, az azon múlik, hogy a közösség számára mennyire drága egy sikeres támadás az Ethereum ellen. Mivel ahelyett, hogy a támadó véglegesíteni tudna egy blokkot, ha a teljes letétbe helyett ethernek a 2/3-t kontrollálja, csak a _szuperbizottságban_ kell a 2/3-nyi lekötött etherrel bírnia egy rosszhiszemű blokk véglegesítéséhez. Ez továbbra is egy aktívan kutatott terület, de valószínű, hogy egy igazán nagy méretű validátorkészlet esetén, amelynél már szuperbizottságokat kell bevezetni, ezen csoportok megtámadásának költsége rendkívül magas lenne (pl. a denominált költség ETH-ben `2/3 × 125 000 × 32 = kb. 2,6 millió ETH`). A támadás költsége igazítható azáltal, hogy a validátorkészlet méretét megnövelik (pl. úgy igazítható a validátorszám, hogy a támadás költsége 1, 4, 10 stb. millió ether legyen). [A kezdeti vélemények](https://youtu.be/ojBgyFl6-v4?t=755) a közösség részéről azt sugallják, hogy az 1-2 millió ether egy elfogadható támadási költség, ami szuperbizottságonként ~65 536–97 152 validátort jelentene.

Ugyanakkor nem az ellenőrzés a valódi szűk keresztmetszet, hanem az aláírások aggregálása a kihívás a validátor-csomópontok számára. Az aláírásaggregáció skálázásához a validátorok számát valószínűleg meg kell növelni minden alhálózatban, növelni kell az alhálózatok számát, vagy az aggregáció új rétegeit kell bevezetni (pl. a bizottságok bizottságát létrehozni). A megoldás része lehet a specializált aggregátorok létrehozása is, hasonlóan ahhoz, ahogy a javaslattevő-építő szétválasztás (PBS) és a Danksharding bevezetésénél a blokk építését és az összevont tranzakcióhoz tartozó elköteleződés létrehozását kiszervezik specializált építőknek.

## Mi a szerepe az elágazásválasztásnak az SSF-ben? {#role-of-the-fork-choice-rule}

A jelenlegi konszenzusmechanizmus a véglegesedési mechanizmus és az elágazásválasztás közötti szoros kapcsolaton alapszik, az első az az algoritmus, amely meghatározza, hogy a validátorok 2/3-a tanúsított-e egy adott láncot, a második pedig az az algoritmus, amelyik eldönti, hogy melyik lánc a megfelelő, amikor több opció is létezik. Az elágazásválasztás algoritmusa csak azokat a blokkokat veszi figyelembe, amelyek az utolsó véglegesített blokk _után_keletkeznek. Az SSF bevezetésével nem lesz olyan blokk, ami az elágazásválaszt határkörébe esik, mert a véglegesítés ugyanabban a slotban történik, mint a blokk előterjesztése. Ennélfogva az SSF bevezetésével _sem_ az elágazásválasztás algoritmusa, _sem_ a véglegességi mechanizmus nem lesz aktív. A véglegességi mechanizmus véglegesítené azokat a blokkokat, ahol a validátorok 2/3-a online volt és jóhiszeműen tanúsított. Ha a blokk nem tudná meghaladni a 2/3-os határt, akkor az elágazásválasztási szabály lépne életbe, hogy meghatározza a követendő láncot. Ez arra is lehetőséget ad, hogy az inaktivitás miatti elszivárgás mechanizmusát fenntartsák, amely visszaállítja a láncot, amikor a validátorok több mint 1/3-a offline, jóllehet némileg továbbfejlesztve azt.

## Fennálló problémák {#outstanding-issues}

Ha az aggregáció skálázásához az alhálózatokban megnövelnék a validátorok számát, az azzal a problémával járna, hogy a peer-to-peer hálózatra nagyobb teher nehezedne. Az aggregáció új rétegeinek bevezetése elég összetett programozási feladat és késleltetést okoz (mivel hosszabb időbe telik, mire a blokkot ellenőrző minden alhálózati aggregátortól kap valamit). Az sem egyértelmű, hogyan lehetne kezelni azt, hogy több aktív validátor van a hálózaton, mint amit egy slotban fel lehet dolgozni, még akár BLS aláírásaggregációval is. Mivel minden slotban minden validátor tanúsít és nincsenek bizottságok az SSF koncepcióban, egy lehetséges megoldás lehet az is, hogy az effektív egyenleg maximális 32 ETH határát teljesen eltörölnék, így a több validátort működtetők konszolidálhatnák a letétjeiket és kevesebb validátort futtathatnának, ezzel csökkentve az üzenetek számát, amelyet a validátor-csomópontoknak kell feldolgozniuk a teljes validátorkészletet illetően. A nagyletéteseken múlik, hogy konszolidálják a validátoraikat. Az is lehetséges, hogy bármikor felső határt húznak a validátorok számát vagy a letétbe helyezett ETH összegét illetően. Ugyanakkor ehhez szükséges egy olyan mechanizmus, amely eldönti, hogy melyik validátor vehet részt és amelyik nem, ez pedig nem kívánt másodlagos hatásokat okozhat.

## Jelenlegi helyzet {#current-progress}

Az SSF még kutatási fázisban van. Nem várható, hogy a következő években bevezetésre kerül, csak miután más lényeges fejlesztések elérhetővé váltak, mint a [Verkle-fák](/roadmap/verkle-trees/) és a [Danksharding](/roadmap/danksharding/).

## További olvasnivaló {#further-reading}

- [Vitalik az SSF-ről az EDCON rendezvényen (2022)](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Vitalik jegyzetei: az egy sloton belüli véglegességhez vezető út](https://notes.ethereum.org/@vbuterin/single_slot_finality)
