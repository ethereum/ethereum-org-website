---
title: Gyakran ismételt kérdések
description: Gyakran ismételt kérdések az Ethereum proof-of-stake (letéti igazolás) mechanizmusáról.
lang: hu
---

## Mi az a proof-of-stake? {#what-is-proof-of-stake}

A proof-of-stake (letéti igazolás) egy algoritmusfajta, ami biztonságot tud adni a blokkláncoknak azáltal, hogy a támadók elveszítik az értékeiket, amint rosszhiszeműen viselkednek. A proof-of-stake rendszereknél szükség van egy validátorszettre, amely eszközöket biztosít, és ezeket lehet megsemmisíteni, ha bizonyítottan rosszindulatúan cselekszenek. Az Ethereum proof-of-stake mechanizmust használ arra, hogy biztosítsa a blokkláncot.

## Hogyan viszonyul a proof-of-stake a proof-of-work mechanizmushoz? {#comparison-to-proof-of-work}

A proof-of-work (munkaigazolás) és a proof-of-stake (letéti igazolás) egyaránt olyan mechanizmus, mely elrettenti a rosszhiszemű szereplőket attól, hogy teleszemeteljék vagy becsapják a hálózatot. Mindkettőnél azok a csomópontok, melyek aktívan részt vesznek a konszenzusban, valamennyi eszközt „tesznek be a hálózatba”, melyet elveszítenek, ha nem viselkednek megfelelően.

A proof-of-work esetében ez az eszköz az energia. A bányászként ismert csomópont egy olyan algoritmust futtat, melynek célja, hogy egy értéket gyorsabban számoljon ki, mint az összes többi csomópont. A leggyorsabb csomópont javasolhat blokkot a láncra. Ahhoz, hogy a lánc történetét megváltoztassa vagy dominálja a blokkelőterjesztést, a bányásznak olyan hatalmas számítási kapacitással kell bírnia, hogy mindig megnyerje a versenyt. Ez olyan szinten drága és nehezen kivitelezhető, hogy ez megvédi a láncot a támadásoktól. A proof-of-work alapú bányászathoz szükséges energia egy valódi eszköz, amiért a bányászok fizetnek.

A proof-of-stake-hez validátor szerepű csomópontokra van szükség, amelyek egyértelműen kriptoeszközt adnak át egy okosszerződésnek. Ha egy validátor nem megfelelően viselkedik, ezt a kriptót megsemmisíthetik, mivel ezt közvetlen módon letétbe helyezték a láncon, nem pedig közvetett módon, az energiakiadáson keresztül.

A proof-of-work sokkal energiaigényesebb, mert a bányászati folyamatban elektromosságot égetnek el. A proof-of-stake ezzel szemben csak nagyon kevés energiát igényel – az Ethereum-validátorokat igen alacsony kapacitású eszközön is futtathatják, mint amilyen a Raspberry Pi. Az Ethereum proof-of-stake mechanizmusát sokkal biztonságosabbnak vélik, mint a proof-of-work metódust, mert a támadás költsége sokkal nagyobb, a támadót pedig sokkal súlyosabb következmények sújtják.

A proof-of-work és proof-of-stake összehasonlítása állandó téma. [Vitalik Buterin blogja](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work), valamint a Justin Drake és Lyn Alden közötti vita jól összefoglalja az érveket.

<YouTube id="1m12zgJ42dI" />

## Energiatakarékos a proof-of-stake? {#is-pos-energy-efficient}

Igen. A proof-of-stake hálózat csomópontjai kis mennyiségű energiát használnak. Egy harmadik fél által készített tanulmány szerint az Ethereum teljes proof-of-stake hálózatának fogyasztása kb. 0,0026 TWh/év, ami nagyjából 13 000-szer kevesebb, mint a játék csak az Egyesült Államokban.

[Bővebben az Ethereum energiafelhasználásáról](/energy-consumption/).

## Biztonságos a proof-of-stake? {#is-pos-secure}

Az Ethereum proof-of-stake mechanizmusa nagyon biztonságos. A mechanizmust nyolc éven át kutatták, fejlesztették és alaposan tesztelték, mielőtt életbe lépett volna. A biztonsági garanciák eltérnek a proof-of-work alapú blokkláncoktól. A proof-of-stake esetén a rosszindulatú validátorokat aktívan meg lehet büntetni (slash) és ki lehet dobni a validátorok közül, ami nekik jelentős összegű ETH-be kerül. A proof-of-work esetében a támadó megismételheti a támadását, amíg elegendő hashkapacitással nem rendelkezik. Az Ethereum proof-of-stake-nél egy ugyanolyan jellegű támadás költségesebb, mint proof-of-work esetén. A lánc elérhetőségének befolyásolásához a hálózaton lévő összes letétbe helyezett ether legalább 33%-ára van szükség (kivéve a nagyon kifinomult, rendkívül valószínűtlen sikerű támadások esetén). A jövőbeli blokkok tartalmának ellenőrzéséhez a teljes letétbe helyezett ETH legalább 51%-a szükséges, az előzményadatok átírásához pedig a teljes letét több mint 66%-a kell. Az Ethereum protokollja a 33%-os vagy 51%-os támadásoknál megsemmisítené ezeket az eszközöket, a 66%-os támadásnál pedig társadalmi konszenzussal oldaná meg.

- [Bővebben az Ethereum proof-of-stake támadás elleni védelméről](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Bővebben a proof-of-stake kialakításáról](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Olcsóbbá teszi az Ethereumot a proof-of-stake? {#does-pos-make-ethereum-cheaper}

Nem. A tranzakció elküldésének költségét (gázdíj) egy dinamikus díjpiac határozza meg, amely a hálózati kereslet növekedésével nő. A konszenzusmechanizmus ezt közvetlenül nem befolyásolja.

[Bővebben a gázról](/developers/docs/gas).

## Mik azok a csomópontok, kliensek és validátorok? {#what-are-nodes-clients-and-validators}

A csomópontok az Ethereum-hálózathoz csatlakozó számítógépek. A kliensek az általuk futtatott szoftverek, amelyek a számítógépet csomóponttá alakítják. A klienseknek két típusa van: a végrehajtási és a konszenzuskliensek. Mindkettőre szükség van egy csomópont létrehozásához. A validátor a konszenzusos kliens opcionális kiegészítője, amely lehetővé teszi a csomópont számára, hogy részt vegyen a proof-of-stake konszenzusban. Ez azt jelenti, hogy blokkokat hoz létre és javasol, amikor kiválasztják, és igazolja azokat a blokkokat, amelyekről a hálózaton hall. Validátor futtatásához a csomópont üzemeltetőjének 32 ETH-t kell befizetnie a letéti szerződésbe.

- [Bővebben a csomópontokról és kliensekről](/developers/docs/nodes-and-clients)
- [Többet a letétbe helyezésről](/staking)

## A proof-of-stake egy új ötlet? {#is-pos-new}

Nem. A BitcoinTalk egyik felhasználója 2011-ben [javasolta a proof-of-stake alapötletét](https://bitcointalk.org/index.php?topic=27787.0) a Bitcoin továbbfejlesztéseként. Tizenegy év telt el, mire készen állt a megvalósításra az Ethereum főhálózaton. Néhány más lánc már korábban megvalósította a proof-of-stake-et, de nem az Ethereum sajátos mechanizmusát (ami Gasper néven ismert).

## Mi a különleges az Ethereum proof-of-stake mechanizmusában? {#why-is-ethereum-pos-special}

Az Ethereum proof-of-stake mechanizmusa teljesen egyedi. Nem ez volt az első proof-of-stake mechanizmus, amelyet megterveztek és megvalósítottak, de ez a legstabilabb. A proof-of-stake mechanizmusát Casper-nek nevezik. A Casper határozza meg, hogyan választják ki a validátorokat a blokkelőterjesztésre, hogyan és mikor tanúsítanak, hogyan számolják a tanúsításokat, milyen jutalmakat és büntetéseket kapnak a validátorok, a súlyos büntetések feltételeit, a hibabiztos mechanizmusokat, mint például az inaktivitás elszivárgás, és a „véglegesség” feltételeit. A véglegesség egy feltétel, hogy egy blokk a kanonikus lánc állandó része legyen, a hálózaton lévő összes letétbe helyezett ETH legalább 66%-ának szavazatával kell bírnia. A kutatók a Caspert kifejezetten az Ethereum számára fejlesztették ki, így ez az első és egyetlen blokklánc, amely megvalósította.

A Casper mellett az Ethereum proof-of-stake-je egy LMD-GHOST nevű elágazásválasztó-algoritmust használ. Erre abban az esetben van szükség, ha két blokk létezik ugyanarra a slotra. Ezáltal a blokklánc két elágazást hoz létre. Az LMD-GHOST azt választja ki, amelyiknél a tanúsítások „súlya” a legnagyobb. A súly a tanúsítások száma súlyozva a validátorok tényleges egyenlegével. Az LMD-GHOST egyedülálló az Ethereumban.

A Casper és az LMD_GHOST kombinációja Gasper néven ismert.

[Bővebben a Gasperről](/developers/docs/consensus-mechanisms/pos/gasper/)

## Mi az a súlyos büntetés (slashing)? {#what-is-slashing}

Súlyos büntetésnek nevezzük a validátor letétjének megsemmisítését és a validátornak a hálózatból való kizárását. A súlyos büntetés során elveszített ETH mennyisége a megbüntetett validátorok számával arányos – ez azt jelenti, hogy az összejátszó validátorok súlyosabb büntetést kapnak, mint az egyének.

[Bővebben a súlyos büntetésről (slashing)](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Miért kell a validátoroknak 32 ETH? {#why-32-eth}

A validátoroknak ETH-t kell letétbe helyezniük, hogy legyen mit veszíteniük, ha rosszhiszeműen viselkednek. Azért is kell 32 ETH-t feltölteniük, hogy a csomópontok egyszerűbb hardveren is működhessenek. Ha az egy validátorra jutó minimális ETH alacsonyabb lenne, akkor a validátorok száma, és így az egyes slotokban feldolgozandó üzenetek száma is növekedne, ezért nagyobb teljesítményű hardverre lenne szükség egy csomóponthoz.

## Hogyan választják ki a validátorokat? {#how-are-validators-selected}

Egy adott validátor álvéletlenszerűen kerül kiválasztásra a RANDAO nevű algoritmus segítségével, hogy egy adott slotban blokkot javasoljon; ez a blokkelőterjesztőtől származó hasht keveri egy seeddel, amely minden blokkban frissül. Ezt az értéket használják, hogy kiválasszanak egy adott validátort a teljes szettből. A validátor kiválasztását két korszakra előre elvégzik.

[Bővebben a validátorkiválasztásról](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Mi az a letéti grinding? {#what-is-stake-grinding}

A letéti grinding egy proof-of-stake hálózat elleni támadás, ahol a támadó megpróbálja a validátor kiválasztási algoritmust a saját validátorai javára torzítani. A RANDAO letéti grinding támadásához a teljes lekötött ETH-mennyiség felére van szükség.

[Bővebben a letéti grindingről](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Mi az a közösségi slashing? {#what-is-social-slashing}

A közösségi slashing a közösség azon lehetősége, hogy egy támadás esetén eldöntse a blokklánc elágazását. Ez lehetővé teszi a közösség számára, hogy helyreálljon egy helytelen láncot véglegesítő támadás esetén. A közösségi slashing a cenzúrázó támadások ellen is használható.

- [Bővebben a közösségi slashingről](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin a közösségi slashingről](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Engem is érhet súlyos büntetés (slashing)? {#will-i-get-slashed}

Validátorként nehéz súlyos büntetést szerezni, hacsak nem valaki szándékosan rosszindulatúan viselkedik. A súlyos büntetést speciális esetekben alkalmazzák, amikor a validátorok több blokkot javasolnak ugyanabban a slotban, vagy ellentmondanak önmaguknak a tanúsításaikkal – ezek nem valószínű, hogy véletlenül előfordulnak.

[Bővebben a súlyos büntetés feltételeiről](https://eth2book.info/altair/part2/incentives/slashing)

## Mit jelent a nincs kockázat probléma? {#what-is-nothing-at-stake-problem}

A nincs kockázat probléma egy koncepcionális hiányosság néhány proof-of-stake mechanizmus esetén, ahol csak jutalmak vannak, és nincsenek büntetések. Ha nincs kockázat, tehát nem lehet a letétet elveszíteni, akkor a gyakorlatias validátor ugyanúgy tanúsítja bármelyik vagy akár több elágazását is a blokkláncnak, mert ebből több jutalmat kap. Az Ethereum ezt úgy kezeli, hogy véglegességi feltételeket szab és létezik súlyos büntetés, így biztosítható a kanonikus lánc.

[Bővebben a nincs kockázat problémáról](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Mi az az elágazásválasztó algoritmus? {#what-is-a-fork-choice-algorithm}

Az elágazásválasztó algoritmus olyan szabályokat alkalmaz, amelyek meghatározzák, hogy melyik lánc a kanonikus. Optimális körülmények között nincs szükség elágazásválasztási szabályra, mivel slotonként csak egy blokkelőterjesztő van, és csak egy blokk jön létre. Alkalmanként lehetséges, hogy több blokk keletkezik ugyanarra a slotra vagy későn érkező információ miatt több lehetőség van a lánc fejéhez közeli blokkok szerveződésére. Ezekben az esetekben minden kliensnek azonos módon kell végrehajtania néhány szabályt, hogy biztosítsa, hogy a blokkok helyes sorrendjét válasszák. Az elágazásválasztó algoritmus kódolja ezeket a szabályokat.

Az Ethereum elágazásválasztási algoritmusának neve LMD-GHOST. Azt az elágazást választja, amelynek a legnagyobb a tanúsítási súlya, vagyis amelyikre a legtöbb letétbe helyezett ETH szavazott.

[Bővebben az LMD-GHOST-ról](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Mit jelent a véglegesség a proof-of-stake-ben? {#what-is-finality}

A véglegesség a proof-of-stake-ben az a garancia, hogy egy adott blokk stabil része a kanonikus láncnak, és nem lehet azt visszafordítani, kivéve, ha a konszenzus meghiúsul, és a támadó a teljes letétbe helyezett ether 33%-át elégeti. Ez egy kriptogazdasági véglegesség, szemben a „valószínűségi véglegességgel”, amely a proof-of-work blokkláncokra releváns. A valószínűségi véglegességben nincsenek explicit véglegesített/nem véglegesített státuszok a blokkok számára – egyszerűen egyre kevésbé valószínű, hogy egy blokkot el lehet távolítani a láncból, ahogy telik az idő, és a felhasználók maguk határozzák meg, hogy mikor eléggé biztosak abban, hogy egy blokk helyzete „biztonságos”. A kriptogazdasági véglegesítésnél az ellenőrzőpont blokkpárjait a letétbe helyezett ether 66%-ának kell megszavaznia. Ha ez a feltétel teljesül, akkor az ellenőrzőpontok közötti blokkok egyértelműen véglegesek.

[Bővebben a véglegességről](/developers/docs/consensus-mechanisms/pos/#finality)

## Mi az a „gyenge szubjektivitás”? {#what-is-weak-subjectivity}

A gyenge szubjektivitás a proof-of-stake hálózatok egyik jellemzője, ahol a társadalmi információkat használják a blokklánc aktuális státuszának megerősítésére. Az új csomópontok vagy a hálózathoz egy hosszabb offline állapot után csatlakozó csomópontok kaphatnak egy friss állapotot, így azonnal láthatják, hogy a megfelelő láncon vannak-e. Ezeket a státuszokat a gyenge szubjektivitás ellenőrzési pontjainak nevezik, és más csomópontok üzemeltetőitől kaphatók, blokkfelfedezőktől vagy több nyilvános végponttól.

[Bővebben a gyenge szubjektivitásról](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Ellenáll a proof-of-stake a cenzúrának? {#is-pos-censorship-resistant}

A cenzúrának való ellenállását jelenleg nehéz bizonyítani. A proof-of-worktől eltérően azonban a proof-of-stake lehetőséget ad a cenzúrázó validátorok megbüntetésére. A protokollban hamarosan szétválasztják a blokképítőket a blokkelőterjesztőktől, és bevezetik azon tranzakciók listáját, amelyeket a blokképítőknek bele kell foglalniuk a blokkba. Ez a javaslattevő-építő szétválasztás, mely segít megakadályozni, hogy a validátorok cenzúrázzák a tranzakciókat.

[Bővebben a javaslattevő-építő szétválasztásról (PBS)](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Az Ethereum proof-of-stake rendszerét érheti 51%-os támadás? {#pos-51-attack}

Igen. A proof-of-stake rendszer ugyanúgy ki van téve az 51%-os támadásnak, mint a proof-of-work. Ahelyett, hogy a támadónak a hálózat hash teljesítményének 51%-ára lenne szüksége, az összes letétbe helyezett ETH 51%-a kell. Az a támadó, aki a teljes letét 51%-át összegyűjti, átveszi az irányítást az elágazásválasztó-algoritmus felett. Ez lehetővé teszi a támadó számára, hogy bizonyos tranzakciókat cenzúrázzon, rövidtávú átszervezéseket végezzen, és a blokkok önérdekű átrendezésével profitot (MEV) szerezzen.

[Bővebben a proof-of-stake-re irányuló támadásokról](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Mi a közösségi koordináció, és miért van rá szükség? {#what-is-social-coordination}

A közösségi koordináció az Ethereum utolsó védelmi vonala, amely lehetővé teszi, hogy egy helyes láncot helyreállítsanak egy olyan támadásból, amely helytelen blokkokat véglegesített. Ebben az esetben az Ethereum közösségének „sávon kívül” kellene koordinálnia és megállapodnia egy helyes kisebbségi elágazás használatában, és ezzel a támadó validátorait kizárni (slashing). Ehhez az alkalmazásokra és a tőzsdékre is szükség lenne, hogy felismerjék a helyes elágazást.

[Bővebben a közösségi koordinációról](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## A proof-of-stake-ben a gazdagok gazdagabbak lesznek? {#do-rich-get-richer}

Minél több ETH-t tesz letétbe valaki, annál több validátort tud futtatni, és annál több jutalmat tud felhalmozni. A jutalmak lineárisan skálázódnak a letétbe helyezett ETH összegével, és mindenki ugyanannyi százalékos hozamot kap. A proof-of-work jobban gazdagítja a gazdagokat, mint a proof-of-stake, mivel a gazdagabb bányászok, akik hardvereket vásárolnak, a méretgazdaságosság előnyeit élvezik, tehát a vagyon és a jutalom közötti kapcsolat nem lineáris.

## A proof-of-stake centralizáltabb, mint a proof-of-work? {#is-pos-decentralized}

Nem, a proof-of-work a centralizáció felé hajlik, mivel a bányászati költségek növekednek és kiszorítják a magánszemélyeket, majd a kisebb vállalatokat, és így tovább. A proof-of-stake jelenlegi problémája a likvid letéti derivatívák (LSD) hatása. Ezek olyan tokenek, amelyek valamilyen letétbe helyezett ETH-t képviselnek, és amelyeket bárki elcserélhet a másodlagos piacokon anélkül, hogy a tényleges ETH letétet felbontanák. Az LSD-k lehetővé teszik a felhasználók számára, hogy 32 ETH-nél kevesebb letétet tegyenek, de egyúttal centralizációs kockázatot is teremtenek, ahol néhány nagy szervezet végül a letét nagy részét ellenőrizheti. Ezért az [önálló letétbe helyezés](/staking/solo) a legjobb megoldás az Ethereum számára.

[Bővebben a letétcentralizációról az LSD-kben](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Miért csak ETH-t lehet letétbe helyezni? {#why-can-i-only-stake-eth}

Az ETH az Ethereum natív valutája. Elengedhetetlen, hogy minden letét egyetlen valutában legyen, mert így lehet a súlyozott szavazatokhoz szükséges aktuális egyenlegeket venni és ez kell a biztonsághoz is. Az ETH az Ethereum alapvető összetevője, nem egy okosszerződés. Más valuták beépítése jelentősen megnövelné a bonyolultságot és csökkentené a letétek biztonságát.

## Az Ethereum az egyetlen proof-of-stake blokklánc? {#is-ethereum-the-only-pos-blockchain}

Nem, több proof-of-stake blokklánc létezik. Egyik sem azonos az Ethereummal, mert annak proof-of-stake mechanizmusa egyedülálló.

## Mi az a Beolvadás? {#what-is-the-merge}

A Beolvadás volt az a pillanat, amikor az Ethereum kikapcsolta a proof-of-work alapú konszenzusmechanizmusát, és bekapcsolta a proof-of-stake alapút. A Beolvadás 2022. szeptember 15-én történt.

[A beolvadásról bővebben](/roadmap/merge)

## Mi az elérhetőség és a biztonság? {#what-are-liveness-and-safety}

Az elérhetőség és a biztonság a blokklánc két alapvető biztonsági szempontja. Az elérhetőség azt jelenti, hogy a lánc véglegesedni tud. Ha a lánc véglegesedése leáll, vagy a felhasználók nem tudnak könnyen hozzáférni, akkor nem elérhető a lánc. A hozzáférés rendkívül magas költségei is elérhetőségi hibák. A biztonság arra utal, hogy mennyire nehéz a láncot megtámadni, vagyis egymásnak ellentmondó ellenőrzőpontokat véglegesíteni.

[Bővebb információkat talál a Casper dokumentációban](https://arxiv.org/pdf/1710.09437.pdf)
