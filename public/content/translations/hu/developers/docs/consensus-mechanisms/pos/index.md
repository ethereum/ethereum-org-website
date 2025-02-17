---
title: Proof-of-stake (PoS)
description: A proof-of-stake konszenzusprotokoll és az Ethereumban betöltött szerepének bemutatása.
lang: hu
---

Az Ethereum [konszenzusmechanizmusa](/developers/docs/consensus-mechanisms/) a proof-of-stake (PoS) koncepción alapul. Az Ethereum 2022-ben váltott a proof-of-stake mechanizmusra, mivel biztonságosabb, kevésbé energiaintenzív és jobban megfelel az új méretezési megoldások bevezetéséhez, mint a korábbi [proof-of-work](/developers/docs/consensus-mechanisms/pow) architektúra.

## Előfeltételek {#prerequisites}

Az oldal könnyebben megértéséhez javasoljuk, hogy tekintse meg a [konszenzusmechanizmusok](/developers/docs/consensus-mechanisms/) cikket.

## Mi az a proof-of-stake (PoS)? {#what-is-pos}

A proof-of-stake (letéti igazolás) egy módszer annak bizonyítására, hogy a validátorok valamilyen értéket helyeztek a hálózatba, amely tisztességtelen cselekedet esetén megsemmisíthető. Az Ethereum proof-of-stake mechanizmusánál a validátorok ETH formájában zárolják tőkéjüket az Ethereumon található okosszerződésben. A validátor feladata annak ellenőrzése, hogy a hálózaton keresztül terjesztett új blokkok érvényesek, és adott esetben ő maga is új blokkokat hoz létre és terjeszt elő. Ha megpróbálják meghamisítani a hálózatot (például egy helyett több blokkot javasolnak, vagy egymásnak ellentmondó tanúsításokat küldenek), a letétbe helyezett ETH egy része vagy egésze megsemmisülhet.

## Validátorok {#validators}

A validátorként való részvételhez a felhasználónak 32 ETH-t kell egy letéti szerződésben zárolnia, és három különböző szoftvert kell futtatnia: egy végrehajtási klienst, egy konszenzusos klienst és egy validátorklienst. Az ETH letétbe helyezésével a felhasználó beáll egy aktiválási sorba, amely korlátozza az új validátorok hálózathoz való csatlakozásának ütemét. Az aktiválást követően a validátorok új blokkokat kapnak a társaiktól az Ethereum-hálózaton. A blokkban szállított tranzakciókat újra végrehajtják, hogy ellenőrizzék, hogy az Ethereum státuszában javasolt változások érvényesek-e, és ellenőrzik a blokk aláírását. A validátor ezután szavazatot (ún. tanúsítást) ad le az adott blokkra a hálózaton keresztül.

Amíg a proof-of-work esetében a blokkidőt a bányászati nehézség határozza meg, addig a proof-of-stake esetén a tempó rögzített. A proof-of-stake Ethereum esetén az idő (12 másodperces) slotokra és korszakokra (egy korszak 32 slotból áll) oszlik. A rendszer minden slotban véletlenszerűen kiválaszt egy validátort a blokk előterjesztésére. Ez a validátor felel az új blokk létrehozásáért és elküldéséért a hálózat többi csomópontja felé. Emellett a rendszer minden slotban véletlenszerűen megválaszt egy a validátorbizottságot, amelynek a szavazatai döntenek az előterjesztett blokk érvényességéről. A validátorok bizottságokra való felosztása fontos a hálózati terhelés kezelhetősége szempontjából. A bizottságok úgy osztják fel a validátorhalmazt, hogy minden aktív validátor minden korszakban tanúsít, de nem minden slotban.

## Hogyan kerülnek végrehajtásra a tranzakciók az Ethereum proof-of-stake mechanizmusban {#transaction-execution-ethereum-pos}

Az alábbiakban egy teljes magyarázatot adunk arról, hogyan hajtanak végre egy tranzakciót az Ethereum proof-of-stake-ben.

1. A felhasználó létrehoz és aláír egy [tranzakciót](/developers/docs/transactions/) a privát kulcsával. Ezt általában egy tárca vagy egy könyvtár, például [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) stb. kezeli, eközben a háttérben a felhasználó az Ethereum [JSON-RPC API](/developers/docs/apis/json-rpc/) segítségével kérést intéz egy csomóponthoz. A felhasználó meghatározza, hogy mennyi gázt fizet borravalóként a validátornak, hogy az felkapja az adott tranzakciót és betegye egy blokkba. A [borravalót](/developers/docs/gas/#priority-fee) megkapja a validátor, az [alapdíjat](/developers/docs/gas/#base-fee) pedig elégeti a rendszer.
2. A tranzakciót beküldik az Ethereum [végrehajtási klienshez](/developers/docs/nodes-and-clients/#execution-client), hogy ellenőrizze az érvényességét. Ennek része, hogy a küldőnek van elég ETH összege, hogy végre legyen hajtva a tranzakció és a megfelelő kulccsal írta azt alá.
3. Ha a tranzakció érvényes, a végrehajtási kliens a helyi tranzakciógyűjtőjéhez (memóriakészlet, a függő tranzakciók listája) adja és előterjeszti a többi csomópontnak a végrehajtási réteg pletykahálózatán. Amikor a többi csomópont hall a tranzakcióról, akkor azok is beteszik a helyi memóriakészletbe. A haladó felhasználók úgy is dönthetnek, hogy nem a hálózaton terjesztik el a tranzakciójukat, hanem továbbíthatják azt speciális blokképítőknek, mint a [Flashbots aukció](https://docs.flashbots.net/flashbots-auction/overview). Ez lehetővé teszi számukra, hogy a tranzakciókat a következő blokkokba szervezzék a maximális profit érdekében ([MEV](/developers/docs/mev/#mev-extraction)).
4. A hálózat egyik validátor-csomópontja az aktuális slot blokkelőterjesztője, amelyet előzőleg a RANDAO segítségével álvéletlenszerűen kiválasztottak. Ez a csomópont felelős az Ethereum blokklánchoz hozzáadandó következő blokk létrehozásáért és továbbításáért, valamint a globális státusz frissítéséért. A csomópont három részből áll: végrehajtási kliens, konszenzusos kliens és validátorkliens. A végrehajtási kliens a tranzakciókat a helyi memóriakészletből egy végrehajtási csomagba rendezi, és helyben végrehajtja őket, hogy státusztváltozást generáljon. Ezt az információt továbbítják a konszenzusos kliensnek, ahol a végrehajtási csomagot egy Beacon-blokk részeként csomagolják be, amely jutalmakra, büntetésekre, súlyos büntetésekre, tanúsításokra stb. vonatkozó információkat is tartalmaz, amelyek lehetővé teszik a hálózat számára, hogy megállapodjon a lánc élén álló blokkok sorrendjében. A végrehajtási és a konszenzusos kliensek közötti kommunikáció részletesebb leírása a [A konszenzusos és a végrehajtási kliensek összekapcsolása](/developers/docs/networking-layer/#connecting-clients) című cikkben található.
5. A többi csomópont az új Beacon-blokkot a konszenzusréteg pletykahálózatán keresztül kapja meg. Átadják azt a saját végrehajtási kliensüknek, ami a tranzakciókat helyben újra végrehajtja, így megbizonyosodnak arról, hogy érvényes a javasolt státuszváltozás. A validátorkliens ezután tanúsítja, hogy a blokk érvényes, és logikailag ez a következő blokk a láncban (vagyis az [elágazásválasztási szabályok](/developers/docs/consensus-mechanisms/pos/#fork-choice) szerint a legnagyobb tanúsítási súllyal bíró láncra épül). A blokk hozzáadódik a helyi adatbázishoz minden olyan csomópontban, amely tanúsítja azt.
6. A tranzakció akkor tekinthető „véglegesítettnek”, ha egy olyan lánc részévé vált, amelyben két ellenőrzőpont között „szupertöbbségi kapcsolat” van. Az ellenőrzési pontok minden korszak kezdetén fordulnak elő, és azért léteznek, mert az aktív tanúsítóknak csak egy részhalmaza tanúsít minden slotban, de az összes aktív tanúsító minden korszakban tanúsít. Ezért csak a korszakok között lehet „szupertöbbségi kapcsolat” (mikor a hálózaton lévő összes letétbe helyezett ETH 66%-a egyetért két ellenőrzőponton).

A véglegesedésről a következő részben találhat bővebb információkat.

## Véglegesség {#finality}

Az elosztott hálózatokon egy tranzakció akkor válik „véglegessé”, amikor egy olyan blokk része lesz, amelyet csak jelentős mennyiségű ETH elégetésével lehet megváltoztatni. A proof-of-stake Ethereum-hálózata ezt az úgynevezett „checkpoint” (ellenőrző pont) blokkokkal éri el. Minden korszak első blokkja egy checkpoint blokk. A validátorok szavaznak az általuk érvényesek tartott checkpoint blokkpárokra. Ha egy checkpoint blokkpár megkapja legalább az összes letétbe helyezett ETH kétharmadát képviselő szavazatmennyiséget, akkor a checkpoint blokkok frissülnek. A kettő közül a későbbi (célblokk) „igazolt” állapotba kerül. A kettő közül a korábbi már igazolt állapotú, mivel az előző korszak „célblokkja” volt. Ez a blokk „véglegesített” állapotba kerül.

Egy véglegesített blokk visszaalakításához egy támadónak legalább a letétbe helyezett összes ETH egyharmadát fel kellene áldoznia. Ennek pontos okát az [Ethereum Alapítvány blogposztja](https://blog.ethereum.org/2016/05/09/on-settlement-finality/) részletesen ismerteti. Mivel a véglegességhez kétharmados többség szükséges, egy támadó a teljes ETH-letét egyharmadával szavazva akadályozhatja meg, hogy a hálózat véglegesítse a blokkot. Létezik egy mechanizmus, amellyel védekezni lehet ez ellen: ez az [inactivity leak](https://eth2book.info/bellatrix/part2/incentives/inactivity) (inaktivitási szivárgás). Akkor aktiválódik, amikor a blokklánc véglegesítése több mint négy korszakon keresztül meghiúsul. Az inactivity leak elszivárogtatja a többség ellen szavazó validátorok ETH-letétjét, ezzel lehetővé teszi, hogy a többség visszaszerezze a kétharmados többséget és véglegesítse a láncot.

## Kriptogazdaság-védelem {#crypto-economic-security}

Egy validátor futtatása elkötelezettséget jelent. A validátortól elvárják, hogy megfelelő hardvert és internetkapcsolatot tartson fenn a blokkvalidálásban és -előterjesztésben való részvételhez. Cserébe a validátor ETH-kifizetést kap (növekszik a letéti egyenlege). Ugyanakkor a validátorként való részvétel új lehetőségeket kínál a felhasználóknak, hogy személyes haszon vagy szabotázs érdekében megtámadják a hálózatot. Ez ellen hat, hogy a validátorok elveszítik az ETH-jutalmakat, ha felhívás esetén nem vesznek részt a validálásban, és a meglévő letétjük is megsemmisülhet, ha becstelenül viselkednek. Két fő viselkedési módot tekintünk rosszhiszeműnek: egy sloton belül több blokk előterjesztése (kétértelműsítés), valamint az ellentmondásos tanúsítások elküldése.

A megvágott ETH-mennyiség azon múlik, hogy ugyanabban az időben hány másik validátor ETH-letétjét vágja még meg a rendszer. Ez az úgynevezett [„korrelációs bírság”](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), amelynek mértéke lehet csekély (a letét kb. 1%-a az egyedülálló validátornál), de eredményezheti akár a validátori letét 100%-ának elvesztését is (tömeges megvágási esemény). Egy kényszerített kilépési periódus felénél szabja ki a rendszer, amely egy azonnali bírsággal (legfeljebb 1 ETH) kezdődik az 1. napon, majd korrelációs bírsággal folytatódik a 18. napon, végül a hálózatból való kivetéssel fejeződik be a 36. napon. Kis összegű tanúsítási bírságot kapnak minden nap, mert jelen vannak a hálózaton, de nem adnak le szavazatot. Ez mind azt jelenti, hogy egy koordinált támadás nagyon költséges lenne a támadó számára.

## Elágazásválasztás {#fork-choice}

Amikor a hálózat optimálisan és becsületesen működik, akkor mindig csak egy blokk van a lánc elején, és minden validátor tanúsítja azt. Mindazonáltal lehetséges, hogy hálózati látencia vagy a blokkelőterjesztő kétértelmű javaslata miatt a validátorok eltérően látják a lánc elejét. Ezért a konszenzusklienseknek egy algoritmusra van szükségük, hogy eldöntsék, melyiket részesítsék előnyben. A proof-of-stake Ethereum által használt algoritmus az [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), és úgy működik, hogy azonosítja az előzmények szerint a tanúsítások legnagyobb többségét magáénak tudó elágazást (fork).

## Proof-of-stake és biztonság {#pos-and-security}

Egy [51%-os támadás](https://www.investopedia.com/terms/1/51-attack.asp) veszélye a proof-of-work architektúrához hasonlóan a proof-of-stake konszenzusnál is fennáll, ám itt még kockázatosabb a támadók számára. A támadónak a letétbe helyezett ETH-mennyiség 51%-ára volna szüksége. Így a saját tanúsításai segítségével biztosíthatná, hogy az általa előnyben részesített elágazás (fork) szerezze meg a legtöbb tanúsítást. A felhalmozott tanúsítások „súlya” az, amit a konszenzuskliensek a helyes lánc meghatározásához használnak, tehát ez a támadó képes volna általánosan elfogadottá tenni a saját elágazását. Ugyanakkor a proof-of-work konszenzussal szemben a proof-of-stake erőssége az ellentámadás rugalmas bevezetésében rejlik. Például a becsületes validátorok dönthetnek úgy, hogy tovább építik a kisebbségi láncot, és figyelmen kívül hagyják a támadó elágazását, és ugyanerre biztatják az alkalmazásokat, a tőzsdéket és a poolokat is. Úgy is határozhatnak, hogy erőszakkal eltávolítják támadót hálózatról, és megsemmisítik az ETH-letétjét. Ezek erős gazdaságvédelmet jelentenek az 51%-os támadások ellen.

Az 51%-os támadáson túl a rosszhiszemű szereplők megpróbálhatnak más jellegű káros tevékenységeket, mint amilyen:

- a nagy hatótávolságú támadások (bár a véglegességi eszköz semlegesíti ezt a támadási vektort)
- rövid hatótávolságú „átrendezések” (bár a javaslattevő-erősítése és a tanúsítási határidők kivédik ezt)
- pattogó (bouncing) és a kiegyenlítő (balancing) támadások (szintén mitigálja a javaslattevő-erősítése, és ezeket főleg ideális hálózati körülmények között lehet végrehajtani)
- lavinatámadások (az elágazásválasztási algoritmus szabálya semlegesíti, amely csak az utolsó üzenetet veszi figyelembe)

Összességében a proof-of-stake – ahogy azt az Ethereum megvalósította – gazdasági szempontból bizonyítottan védettebb, mint proof-of-work.

## Előnyök és hátrányok {#pros-and-cons}

| Előnyök                                                                                                                                                                                                                                                                                 | Hátrányok                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| A letétbe helyezés az egyének számára megkönnyíti a részvételt a hálózat biztosításában, ezzel elősegíti a decentralizációt. Validátor-csomópont egy átlagos laptopon is futtatható. A letéti alapok lehetővé teszik, hogy a felhasználók akkor is részt vegyenek, ha nincs 32 ETH-jük. | A proof-of-stake fiatalabb és még kevésbé tesztelt, mint a proof-of-work.                                           |
| A letétbe helyezés decentralizáltabb. A méretgazdaságosság nem úgy érvényesül, mint a PoW-bányászat esetén.                                                                                                                                                                             | A proof-of-stake esetén a megvalósítás bonyolultabb, mint a proof-of-work konszenzusnál.                            |
| A proof-of-stake erősebb kriptogazdasági védelmet kínál, mint a proof-of-work.                                                                                                                                                                                                          | A felhasználóknak három szoftvert kell futtatniuk, hogy részt vehessenek az Ethereum proof-of-stake konszenzusában. |
| Kevesebb új ETH-t kell kibocsátani a hálózati résztvevők ösztönzéséhez.                                                                                                                                                                                                                 |                                                                                                                     |

### Összehasonlítása a proof-of-work mechanizmussal {#comparison-to-proof-of-work}

Az Ethereum eredetileg proof-of-work mechanizmust használt, amelyről proof-of-stake mechanizmusra váltott 2022 szeptemberében. A PoS számos előnnyel jár a PoW-vel szemben:

- nagyobb energiahatékonyság – nincs szükség sok energia felhasználására a proof-of-work számításokhoz;
- alacsonyabb belépési korlát, csökkentett hardverkövetelmények – nincs szükség csúcstechnológiás hardverre ahhoz, hogy esélyünk legyen új blokkot létrehozni;
- kisebb centralizációs kockázat – a proof-of-stake architektúra több csomópont részvételét eredményezi a hálózat biztosításában;
- az alacsony energiaszükséglet miatt kevesebb ETH-t kell kibocsátani a részvételre ösztönzéshez;
- a szabálytalan viselkedés gazdasági büntetése miatt a proof-of-work architektúrához képest magasabb költséggel jár az 51%-os típusú támadás a támadó számára;
- ha egy 51%-os támadás legyűri a kriptogazdasági védelmi rendszert, a közösség dönthet egy becsületes blokklánc közösségi visszaállítása mellett.

## További olvasnivaló {#further-reading}

- [Proof-of-stake (letéti igazolás) GYIK](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Mi az a Proof-of-Stake?](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Mi az a Proof-of-Stake és miért fontos?](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Miért a proof-of-stake (2020. november)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Proof-of-Stake: Hogyan tanultam meg szeretni a gyenge szubjektivitást](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Proof-of-stake Ethereum – támadás és védekezés](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [A proof-of-stake tervezési filozófiája](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Videó: Vitalik Buterin elmagyarázza a proof-of-stake mechanizmust Lex Fridmannak](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Kapcsolódó témák {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-authority (jogosultsági igazolás)](/developers/docs/consensus-mechanisms/poa/)
