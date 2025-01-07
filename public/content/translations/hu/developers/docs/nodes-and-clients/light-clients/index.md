---
title: Könnyű kliens
description: Az Ethereum könnyű klienseinek bemutatása.
lang: hu
---

A teljes csomópont futtatása a leginkább bizalomigény-mentes, decentralizált és cenzúrának ellenálló mód, ahogy az Ethereummal kapcsolódni lehet. A teljes csomópont esetén Ön rendelkezik a blokklánc saját másolatával, amit azonnal lekérdezhet, illetve közvetlen hozzáférése van az Ethereum peer-to-peer hálózatához. Ehhez azonban jelentős memória, tárhely és CPU szükséges. Tehát nem lehetséges mindenki számára, hogy a saját csomópontját működtesse. Az Ethereum ütemterve számos olyan megoldást tartalmaz, mely segít majd ezen, mint például a státuszmentesség, de lehet, hogy csak néhány év múlva kerül bevezetésre. A közeljövőben az a kompromisszum jelenthet megoldást, hogy a teljes csomópont néhány előnyét feláldozzuk olyan teljesítménynövelésre, amivel a csomópont alacsony hardverszükséglettel is működtethető. Ezt a kompromisszumot képviselik a könnyű csomópontok.

## Mi az a könnyű kliens {#what-is-a-light-client}

A könnyű csomópont az, amely könnyű kliensszoftvert működtet. Ahelyett, hogy a blokklánc adatának másolatát tartaná és önállóan ellenőrizné a változásokat, a szükséges adatot szolgáltatóktól szerzi be. A szolgáltató lehet egy közvetlen kapcsolat egy teljes csomóponthoz vagy egy központosított RPC-szerveren keresztül. Az adatot ezután ellenőrzi a könnyű csomópont, így kezeli a lánc legfrissebb állapotát. A könnyű csomópont csak a blokkfejlécet kezeli, és csak esetenként tölti le a blokk tartalmát. A csomópontok eltérhetnek a könnyűségükben, mivel a könnyű és a teljes kliensszoftver kombinációját is működtethetik. Például könnyűségi beállítás lehet az, hogy könnyű végrehajtási kliens és könnyű konszenzusos kliens működik. Az is valószínű, hogy számos csomópont könnyű konszenzusos klienst futtat teljes végrehajtási klienssel, vagy fordítva.

## Hogyan működnek a könnyű kliensek? {#how-do-light-clients-work}

Amikor az Ethereum átállt a proof-of-stake mechanizmusra, akkor új infrastruktúrát vezetett be a könnyű kliensek támogatására. Ez úgy működik, hogy véletlenszerűen választ ki egy 512 validátorból álló alcsoportot minden 1,1 naponta, hogy **szinkronizálási bizottságként** működjenek. A szinkronizálási bizottság írja alá az éppen aktuális blokkok fejlécét. Minden blokkfejléc tartalmazza a bizottság validátorainak aggregált aláírását és egy bit-mezőt arról, hogy melyik validátor írta alá és melyik nem. Minden fejléc tartalmazza a következő blokk aláírásában részt vevő validátorok listáját is. Eszerint egy könnyű kliens gyorsan értelmezni tudja, hogy a szinkronizálási bizottság aláírta az adatot, amit ő is megkapott, továbbá a bizottság kilétét is igazolni tudja azáltal, hogy az előző blokkban megkapta a résztvevők listáját. Így a könnyű kliens is ismeri a legutóbbi Ethereum-blokkot anélkül, hogy ténylegesen letöltené azt, és csak a fejlécben található összefoglalást kell néznie.

A végrehajtási rétegen nem létezik egyetlen specifikáció a könnyű végrehajtási kliensre. Ennek tartományába belefér a teljes kliens „könnyű üzemmódja”, ami rendelkezik a teljes csomópont összes EVM- és hálózati funkcionalitásával, de csak a blokkfejlécet ellenőrzi, a kapcsolódó adatot nem tölti le; vagy lehet egy sokkal egyszerűbb kliens is, amelynek az Ethereummal való kapcsolata az RPC-szolgáltatónak küldött kérésen alapszik.

## Miért fontosak a könnyű kliensek? {#why-are-light-clients-important}

A könnyű kliensek azért fontosak, mert lehetővé teszik a felhasználóknak, hogy ellenőrizni tudják a bejövő adatokat, és ne kelljen vakon megbízni az adatszolgáltatók korrekt és egyenes hozzáállásában, és mindeközben a teljes csomópont számítási erőforrásának csak egy apró töredékét használják. A könnyű kliensek által kapott adatot össze kell vetni a blokkfejléccel, amelyet már aláírt az Ethereum-validátorok véletlenszerűen választott, 512 tagból álló bizottságának legalább 2/3-a. Ez egy nagyon erős bizonyíték arra vonatkozóan, hogy az adat helyes.

A könnyű kliens a számítási kapacitás, memória és tárhely töredékét használja csak, ezért mobilon is futtatható, beágyazható egy alkalmazásba vagy egy böngésző részeként is működhet. A könnyű kliensek megadják a lehetőséget arra, hogy az Ethereumhoz minimális bizalomigényű hozzáférése legyen a felhasználónak, ami épp annyira egyszerű, mint megbízni egy harmadik fél által adott szolgáltatásban.

Vegyünk egy egyszerű példát. Tegyük fel, Ön meg szeretné nézni a számlaegyenlegét. Ehhez egy kérést kell küldenie egy Ethereum-csomópontnak. Ez a csomópont megnézi az Ethereum státuszáról készült saját másolatát az egyenlegért, és azt visszaküldi Önnek. Ha Önnek nincs közvetlen hozzáférése egy csomóponthoz, akkor központi szolgáltatók adják meg ezt az adatot. Ön küld egy kérést e szolgáltatóknak, akik ellenőrzik a csomópontjukat, és visszaküldik az eredményt. Ezzel annyi a probléma, hogy Önnek meg kell bíznia a szolgáltatóban, hogy a helyes információt adja. Sosem tudhatja, hogy az információ helyes, ha nem ellenőrzi maga.

A könnyű kliens megoldja ezt a problémát. Ön ekkor is egy külső adatszolgáltatótól kér információt, de az adat egy bizonyítékkal érkezik, melyet a könnyű csomópont le tud ellenőrizni a blokkfejléchez képest. Tehát az Ethereum ellenőrzi az adat helyességét egy bizalmat igénylő szolgáltató helyett.

## Milyen innovációkat tesznek lehetővé a könnyű kliensek? {#what-innovations-do-light-clients-enable}

Az elsődleges előnye a könnyű klienseknek az, hogy több ember fér hozzá az Ethereumhoz független módon, jelentéktelen hardvert igényel és minimális a függés a harmadik felektől. Ez jó a felhasználóknak, mert ellenőrizni tudják a saját adataikat, és jó a hálózatnak is, mert növeli a csomópontok számát és diverzitását, melyek ellenőrzik a láncot.

Az innováció egyik fő területe az, hogy az Ethereum-csomópontokat olyan eszközökön is lehet futtatni, amelyek kis tárhellyel, memóriával és feldolgozási kapacitással bírnak. Miközben a mai Ethereum-csomópontok jelentős számítási kapacitást igényelnek, addig a könnyű klienseket be lehet ágyazni a böngészőkbe, mobilon lehet futtatni, és talán még annál is kisebb eszközökön, mint az okosórák. Tehát az Ethereum-tárcák beágyazott kliensekkel futtathatók mobilon is. Emellett a mobiltárcák még inkább decentralizáltak lehetnek, mert az adatokhoz nem egy központi szolgáltatónál jutnak hozzá.

Ennek kiterjesztése lehetővé teszi **a dolgok internete (IoT)** eszközök használatát is. A könnyű kliens gyorsan igazolni tudja valamilyen tokenegyenleg vagy NFT tulajdonlását, mindazzal a garanciával együtt, amit a szinkronizálási bizottság ad, és valamilyen akciót indít el egy IoT-hálózaton. Vegyünk egy [kerékpárkölcsönzőt](https://youtu.be/ZHNrAXf3RDE?t=929), amely egy alkalmazást használ egy beágyazott könnyű klienssel, hogy gyorsan ellenőrizze, hogy a felhasználónál megtalálható a kölcsönző NFT-je, és ha igen, akkor rendelkezésére bocsát egy kerékpárt!

Az Ethereum összevont tranzakciói is élvezhetik a könnyű kliensek előnyét. Az összevont tranzakciók egyik nagy problémája az, hogy támadások érik azokat a hidakat, melyeken pénzeszközöket küldenek az Ethereum főhálózatról az összevont tranzakcióra. Az egyik sebezhető pont az összevont tranzakciók által használt orákulum, amellyel felismerik, hogy egy felhasználó letétet helyezett a hídba. Ha az orákulum rossz adatot szolgáltat, akkor rászedheti az összevont tranzakciót, hogy elhiggye a hídnak adott letétet, és így tévesen pénzeszközt adjon át. Az összevont tranzakcióba ágyazott könnyű kliens megvédheti azt a korrupt orákulumoktól, mert a hídnak adott letét egy olyan bizonyítékkal jön, melyet az összevont tranzakció ellenőrizni tud, mielőtt bármilyen tokent átadna. Ugyanez a koncepció alkalmazható más láncok közötti hidaknál.

A könnyű kliensek az Ethereum-tárcák fejlesztésére is használhatók. Ahelyett, hogy egy RPC-szolgáltató által adott adatban bízna, a tárca közvetlenül ellenőrizni tudná az adatot egy beágyazott könnyű kliens révén. Ez növelné a tárca biztonságát. Ha az RPC-szolgáltató rosszhiszemű volt és helytelen adatot adott, akkor a beágyazott könnyű kliens ezt feltárná Önnek!

## Mi a könnyű kliens fejlesztésének jelenlegi helyzete? {#current-state-of-development}

Számos könnyű klienst fejlesztenek, beleértve a végrehajtási, konszenzusos és a kombinált klienseket is. A jelen írás keletkezésekor az alábbi bevezetésekről van információnk:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): konszenzusos könnyű kliens TypeScript-ben
- [Helios](https://github.com/a16z/helios): kombinált végrehajtási és konszenzusos könnyű kliens Rust-ban
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): a végrehajtási kliens könnyű módozata (fejlesztés alatt áll) Go-ban
- [Nimbus](https://nimbus.guide/el-light-client.html): konszenzusos könnyű kliens Nim-ben

Tudomásunk szerint ezek még nem állnak készen az éles használatra.

Számos fejlesztés zajlott akörül is, hogy a könnyű kliensek hogyan férnek hozzá az Ethereum adataihoz. Jelenleg a könnyű kliensek a teljes csomópontoknak adott RPC-kéréseken alapulnak kliens/szerver modellt használva, de a jövőben az adatot egy decentralizáltabb módon is kérhetik egy dedikált hálózatot használva, mint amilyen a [Portal Network](https://www.ethportal.net/), amely képes adatot szolgáltatni a könnyű klienseknek a peer-to-peer pletykaprotokollt használva.

Más tételek az [ütemtervből](/roadmap/), mint a [Verkle-fák](/roadmap/verkle-trees/) és a [státuszmentesség](/roadmap/statelessness/) végül ugyanazt a biztonsági garanciát fogják elhozni a könnyű klienseknek, mint amilyennel teljes kliensek rendelkeznek.

## További olvasnivaló {#further-reading}

- [Felföldi Zsolt a Geth könnyű kliensekről](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling a könnyű kliens networkingről](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling a könnyű kliensekről az egyesítés (Merge) után](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: A működő könnyű kliensekhez vezető kanyargós ösvény](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
