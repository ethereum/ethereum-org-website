---
title: Proof-of-work (PoW)
description: A proof-of-work (munkaigazolás) konszenzusprotokoll bemutatása és az Ethereumban betöltött szerepe.
lang: hu
---

Az Ethereum-hálózat kezdetben egy olyan konszenzusmechanizmust használt, amely a **[proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow)** koncepciót használta. Ez lehetővé tette az Ethereum-hálózat csomópontjai számára, hogy az összes Ethereum-blokkláncra feljegyzett információ állapotáról megegyezzenek és kivédjenek bizonyos gazdasági támadásokat. Ugyanakkor az Ethereum 2022-ben leváltotta a proof-of-work mechanizmust, és helyette a [proof-of-stake (letéti igazolás)](/developers/docs/consensus-mechanisms/pos) koncepcióját vezette be.

<InfoBanner emoji=":wave:">
    A proof-of-work ezzel kivezetésre került. A konszenzusmechanizmusnak többé nem része a proof-of-work az Ethereumon. Ehelyett a proof-of-stake mechanizmus működik. Tudjon meg többet a <a href="/developers/docs/consensus-mechanisms/pos/">proof-of-stake-ről</a> és a <a href="/staking/">letétbe helyezésről</a>.
</InfoBanner>

## Előfeltételek {#prerequisites}

A jelen téma könnyebb megértéséhez érdemes áttekinteni a [tranzakciók](/developers/docs/transactions/), [blokkok](/developers/docs/blocks/) és a [konszenzusmechanizmus](/developers/docs/consensus-mechanisms/) oldalakat.

## Mi az a proof-of-work (PoW)? {#what-is-pow}

A Nakamoto konszenzus, amely a proof-of-work (PoW) mechanizmust használja, egykor lehetővé tette a decentralizált Ethereum-hálózat számára, hogy konszenzusra jusson (tehát minden csomópont egyetértsen) olyanok felett, mint a számlaegyenlegek vagy a tranzakciók sorrendje. Ez megakadályozta, hogy a felhasználók „duplán elköltsék” a coinokat és biztosította azt, hogy az Ethereum-láncot hihetetlenül nehéz volt megtámadni vagy átírni. Ezek a biztonsági jellemzők most a proof-of-stake mechanizmusból erednek, amely a [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) nevű konszenzust használja.

## Proof-of-work és bányászat {#pow-and-mining}

A proof-of-work a mögöttes algoritmus, amely a nehézséget és a szabályokat határozza meg a munkához, amelyet a bányászok végeznek proof-of-work blokkláncokon. A bányászat maga a „munka”. Érvényes blokkok hozzáadását jelenti a lánchoz. Ez azért fontos, mert a lánc hossza segíti a hálózatot abban, hogy kövesse a blokklánc megfelelő elágazását. Minél több „munka” van elvégezve, annál hosszabb a lánc, és minél magasabb a blokkszám, annál inkább biztosabb lehet a hálózat a dolgok jelenlegi állapotában.

[Többet a bányászatról](/developers/docs/consensus-mechanisms/pow/mining/)

## Hogyan működött az Ethereum proof-of-work mechanizmusa? {#how-it-works}

Az Ethereum-tranzakciókat blokkokba dolgozzák fel. A már kivezetett proof-of-work-alapú Ethereumon minden blokkban volt:

- blokk nehézsége – például: 3,324,092,183,262,715
- mixHash-e – például: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce-a – például: `0xd3ee432b4fb3d26b`

Ezek a blokkadatok közvetlen kapcsolatban álltak a proof-of-work mechanizmussal.

### A munka a proof-of-work-ben {#the-work}

A proof-of-work protokoll, melyet Ethashnek hívnak, arra ösztönözte a bányászokat, hogy egy intenzív verseny keretében próba szerencse alapon megtalálják a nonce-t egy blokkhoz. Csak érvényes nonce-szal rendelkező blokkokat lehetett hozzáadni a lánchoz.

Amikor a blokk létrehozásáért versenyeztek, egy adott bányász ismételten betett egy adathalmazt, melyet csak a teljes lánc letöltésével és futtatásával (ahogy a bányászok csinálják) lehetett megszerezni, egy matematikai függvényen keresztül. Az adathalmazt arra használták, hogy készítsenek egy mixHasht, ami a blokk nehézsége által megadott tartományon belül marad. Ezt a legjobban a próba és hiba módszerrel kiszámítani.

A nehézség határozta meg a hash célját. Minél alacsonyabb a cél, annál kisebb az érvényes hashek halmaza. Amint legenerálta valaki, onnantól már rendkívül egyszerű a többi bányász és kliens számára hitelesíteni. Ha akár egy tranzakciót is megváltoztattak volna, akkor a hash teljesen más lett volna, ami egyértelműen jelzi a csalást.

A hashing egyszerűvé teszi, hogy észrevegyük a csalásokat. Emellett a proof-of-work folyamata elrettentő erővel bírt a lánc megtámadásával szemben.

### Proof-of-work és biztonság {#security}

A bányászokat ösztönözték, hogy elvégezzék ezt a munkát az Ethereum láncon. A bányászok számára nem volt mérvadó az a motiváció, hogy saját láncot indítsanak, és ezzel aláássák a rendszert. A blokkláncok egy állapotra hagyatkoznak az igazság forrásaként.

A proof-of-work célkitűzése a lánc kiterjesztése volt. A leghosszabb lánc a leghihetőbb érvényes lánc volt, mivel itt végezték el a legtöbb számítási munkát ahhoz, hogy létrehozzák. Az Ethereum proof-of-work rendszerén belül szinte lehetetlen volt olyan új blokkokat létrehozni, melyek korábbi tranzakciókat törölnének ki vagy hamis tranzakciókat tartalmaznának, vagy egy másik láncok építenének. Ennek az az oka, hogy egy rosszindulatú bányásznak mindig gyorsabban kéne megoldania a blokk nonce-ot, mint bárki másnak.

Ahhoz, hogy valaki konzisztensen rosszindulatú, de mégis érvényes blokkokat hozhasson létre, a hálózat bányászati erejének több mint az 51%-ával rendelkeznie kellett volna. Ez a mennyiségű „munka” rengeteg, drága számítási kapacitást igényel, és az erre költött ráfordítás talán meg is haladja a támadással járó előnyöket.

### A proof-of-work gazdaságtana {#economics}

A proof-of-work másik feladata az volt, hogy új coinokat bocsásson ki a rendszerbe és ezzel ösztönözze a bányászokat a munka elvégzésére.

A [Constantinople-frissítés](/history/#constantinople) után a bányászok, akik sikeresen létrehoztak egy blokkot, két frissen kibocsátott ETH-t kaptak, valamint a tranzakciós díjak egy része is az övék lett. Az ommer blokkokért is járt 1,75 ETH. Az ommerek olyan érvényes blokkok, melyeket ugyanabban az időben készítenek, mint a kanonikus blokkot, ami végül a lánc folytatása lesz. Ezek általában hálózati késedelemkor fordultak elő.

## Véglegesség {#finality}

A tranzakció végleges az Ethereumon, amikor egy olyan blokk része, amit már nem lehet megváltoztatni.

Mivel a bányászok decentralizáltan dolgoztak, lehetséges volt, hogy egyszerre két érvényes blokk jöjjön létre. Ez egy átmeneti elágazást (fork) eredményez. Végül az egyik lánc lett az elfogadott, amint egy későbbi blokkot kibányásztak és hozzáfűztek, ami miatt hosszabbá vált.

Tovább bonyolította, hogy a tranzakciók, melyek el lettek utasítva az átmeneti elágazásban, nem feltétlenül kerültek be az elfogadott láncba. Ez azt jelentette, hogy vissza lehetett azokat fordítani. A véglegesség tehát arra az időre utal, amennyit a felhasználónak várnia kell, hogy a tranzakciót visszafordíthatatlannak tekintsük. A korábbi proof-of-work-alapú Ethereumon minél több blokkot bányásztak egy adott `N` blokk tetejére, annál inkább meg lehetett bízni abban, hogy az `N` blokk tranzakciói sikeresek és nem lehet azokat visszafordítani. A jelenlegi proof-of-stake rendszerben a véglegesség a blokk kifejezett jellemzője, nem annyira valószínűségi.

## A proof-of-work energiafelhasználása {#energy}

A proof-of-work egyik legnagyobb hibája az energiamennyiség volt, melyet a hálózat biztonságosságáért el kellett fogyasztani. Az Ethereum proof-of-work rendszere sok energiát igényelt ahhoz, hogy biztonságos és decentralizált legyen. Röviddel a proof-of-stake-re való áttérés előtt az Ethereum-bányászok együttesen kb. 70 TWh/év energiát fogyasztottak (akár a Cseh Köztársaság a [digiconomist](https://digiconomist.net/) szerint, melyet 2022. július 18-án publikáltak).

## Előnyök és hátrányok {#pros-and-cons}

| Előnyök                                                                                                                                                                                                                                                                                | Hátrányok                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A proof-of-work egy semleges rendszer. Nincs szükség ETH-re, hogy valaki elkezdje, és a blokk jutalmaknak köszönhetően 0 ETH-ről pozitívba mehet át az egyenlege. A [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) esetében ETH-re van szükség, hogy valaki belekezdjen. | A proof-of-work sok energiát használ fel, ami káros a környezetnek.                                                                                                      |
| A proof-of-work egy kipróbált és letesztelt konszenzusos mechanizmus, amely éveken keresztül biztonságban és decentralizáltan tartotta a Bitcoint és az Ethereumot.                                                                                                                    | Ha valaki bányászni szeretne, akkor speciális felszerelésre van szüksége, mely kezdetnek nagy befektetés.                                                                |
| A proof-of-stake-kel szemben viszonylag egyszerűbb implementálni.                                                                                                                                                                                                                      | A folyamatosan növekvő számítási igény miatt, a bányászati alapok potenciálisan dominálhatják a bányászvilágot, mely centralizációhoz és biztonsági kockázatokhoz vezet. |

## Összehasonlítás a proof-of-stake megoldással {#compared-to-pos}

Nagy vonalakban a proof-of-stake-nek ugyanaz a végcélja, mint a proof-of-work-nek: biztonságosan segítse elérni a konszenzust a decentralizált hálózaton. De van egy pár különbség a folyamatban és a személyekben:

- A proof-of-stake leváltja a számítási kapacitás fontosságát a letétbe helyezett ETH-re.
- A proof-of-stake lecseréli a bányászokat validátorokra. A validátorok letétbe helyezik az ETH-jüket, hogy aktiválják a képességüket új blokkok létrehozására.
- A validátorok nem versenyeznek a blokk létrehozásért, ehelyett egy algoritmus választja ki őket véletlenszerűen.
- A véglegesség tisztább: ha bizonyos ellenőrzési pontokon a validátorok 2/3 része egyetért a blokk állapotát illetően, akkor a blokkot véglegesnek tekintjük. A validátorok a tejles letétüket felteszik erre, így ha megpróbálnak összejátszani, akkor a teljes letétüket elveszítik.

[A proof-of-stake-ről bővebben](/developers/docs/consensus-mechanisms/pos/)

## Ön inkább vizuális típus? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## További olvasnivaló {#further-reading}

- [Többségi támadás](https://en.bitcoin.it/wiki/Majority_attack)
- [Az elszámolási véglegességről](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Videók {#videos}

- [A proof-of-work protokollok technikai magyarázata](https://youtu.be/9V1bipPkCTU)

## Kapcsolódó témák {#related-topics}

- [Bányászat](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof-of-authority (jogosultsági igazolás)](/developers/docs/consensus-mechanisms/poa/)
