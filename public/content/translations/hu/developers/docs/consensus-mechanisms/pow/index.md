---
title: Proof-of-work (PoW)
description: Egy magyarázat a proof-of-work konszenzus protokollról és az Ethereumban betöltött szerepéről.
lang: hu
incomplete: true
---

Az Ethereum a Bitcoinhoz hasonlóan egy konszenzus protokollt használ, melyet úgy hívnak, hogy [proof-of-work (PoW)](https://wikipedia.org/wiki/Proof_of_work). Ez lehetővé teszi, hogy az Ethereum hálózat csomópontjainak, hogy az összes Ethereum blokkláncra feljegyzett információ állapotáról egyet tudjanak érteni és bizonyos gazdasági támadásokat meg tudjanak akadályozni.

## Előfeltételek {#prerequisites}

Hogy jobban megértsd ezt az oldalt, javasoljuk, hogy előbb olvasd el a [tranzakciókról](/developers/docs/transactions/) és a [blokkokról](/developers/docs/blocks/) szóló oldalakat.

## Mi az a proof-of-work (PoW)? {#what-is-pow}

A proof-of-work (PoW) egy olyam mechanizmus, mely lehetővé teszi a decentralizált Ethereum hálózat számára, hogy konszenzusra jusson, vagy egyet értsen olyanok felett, mint a számla egyenlegek vagy a tranzakciók rendje. Ez megakadályozza, hogy a felhasználók "duplán elköltsék" az érméiket és biztosítja azt, hogy az Ethereum láncot hihetetlenül nehéz megtámadni vagy átírni.

## Proof-of-work és bányászat {#pow-and-mining}

Proof-of-work a mögöttes algoritmus, mely beállítja a nehézséget és szabályokat a munkához, melyet a bányászok végeznek. A bányászat maga a "munka". Érvényes blokkok hozzáadását jelenti a lánchoz. Ez fontos, mivel a lánc hossza segít a hálózatnak, hogy meglássa a valós láncot és megértse az Ethereum jelenlegi állapotát. Minél több "munka" van elvégezve, annál hosszabb a lánc és minél magasabb a blokkszám, annál inkább biztosabb lehet a hálózat a dolgok jelenlegi állapotában.

[Többet a bányászatról](/developers/docs/consensus-mechanisms/pow/mining/)

## Hogyan működik az Ethereum proof-of-work? {#how-it-works}

Az Ethereum tranzakciókat blokkokba dolgozzák fel. Minden egyes blokknak van:

- blokk nehézsége – például: 3,324,092,183,262,715
- mixHash-e – például: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce-a – például: `0xd3ee432b4fb3d26b`

Ez a blokk adat közvetlen kapcsolatban áll a PoW-kel.

### A munka a proof-of-work-ben {#the-work}

A proof-of-work protokoll, melyet Ethhash-nek hívnak, arra ösztönzi a bányászokat, hogy egy intenzív verseny keretében próba szerencse alapon megtalálják a nonce-ot egy blokkra. Csak érvényes nonce-szal rendelkező blokkok adhatók hozzá a lánchoz.

Amikor a blokk létrehozásáért versenyeznek, egy adott bányász több alkalommal is betesz egy adathalmazt egy matematikai függvénybe, melyet csak a teljes lánc letöltésével és futtatásával (ahogy a bányászok csinálják) lehet megszerezni. Így generálódik a mixHash, mely a cél nonce alatt van, ahogy a blokk nehézség előírja. Ezt a legjobb próba és hiba módszerrel kiszámítani.

A nehézség meghatározza a hash célját. Minél alacsonyabb a cél, annál kisebb az érvényes hash-ek halmaza. Amint legenerálja valaki, onnantól már rendkívül egyszerű a többi bányász és kliens számára hitelesíteni. Ha akár egy tranzakció is megváltozna, akkor a hash teljesen más lenne, mely csalást jelentene.

A hashing egyszerűvé teszi, hogy észrevegyük a csalásokat. De a PoW, mint folyamat elrettentő erővel bír a lánc megtámadásával szemben.

### Proof-of-work és biztonság {#security}

A bányászok ösztönözve vannak, hogy elvégezzék ezt a munkát az Ethereum láncon. A bányászok egy részhalmaza számára kicsi az ösztönző, hogy elindítsák a saját láncukat - ez aláássa a rendszert. A blokkláncok egy állapotra hagyatkoznak, mint az igazság forrása. A felhasználók pedig mindig a hosszabb vagy "nehezebb" láncokat fogják választani.

A PoW célkitűzése a lánc kiterjesztése. A leghosszabb lánc a leghihetőbb érvényes lánc, mivel itt végezték el a legtöbb számítási munkát. Az Ethereum PoW rendszerén belül szinte lehetetlen olyan új blokkokat létrehozni, melyek korábbi tranzakciókat törölnének ki vagy hamis tranzakciókat tartalmaznának, vagy egy másik láncok építenének. Ennek az az oka, hogy egy rosszindulatú bányásznak mindig gyorsabban kéne megoldania a blokk nonce-ot, mint bárki másnak.

Ahhoz, hogy konzisztensen rosszindulatú, de mégis érvényes blokkokat hozhass létre, a hálózat bányászati erejének több mint az 51%-val rendelkezned kell. Rengeteg számítógépre lenne szükséged, hogy elvégezhesd ezt a mennyiségű "munkát". És az is lehet, hogy a ráfordított energia meghaladja a támadás során szerzett hozamot.

### Proof-of-work közgazdaságtan {#economics}

A PoW másik feladata, hogy új érméket bocsájtson ki a rendszerbe és ezzel ösztönözze a bányászokat a munka elvégzésére.

Azok a bányászok, akik sikeresen létrehoznak egy blokkok 2 újonnan létrehozott ETH kapnak jutalmul, valamint a blokkban lévő összes tranzakciónak a díját. A bányász ugyanakkor 1,75 ETH jutalmat kaphat az uncle blokkokért. Ez egy érvényes blokk, melyet egy időben készítettek egy másik bányász által létrehozott sikeres blokkal. Ez általában hálózati késeltetéskor fordul elő.

## Véglegesség {#finality}

Az elosztott hálózatoknál egy tranzakciónak "véglegessége" van, amikor egy olyan blokkban van, ami nem tud megváltozni.

Mivel a bányászok decentralizáltan dolgoznak, lehetséges, hogy egyszerre két érvényes blokk jön létre. Ez egy átmeneti elágazást (forkot) eredményez. Végül az egyik lánc lesz az elfogadott lánc, amint egy későbbi blokkot kibányásznak és hozzáfűznek, ami miatt hosszabbá válik.

De hogy tovább bonyolítsuk a dolgokat, a tranzakciók, melyek el lettek utasítva az átmeneti elágazásban, belekerülhettek az elfogadott láncba. Ez azt jelenti, hogy vissza lehet őket állítani. A véglegesség tehát arra az időre utal, amennyit várnod kellene, hogy a tranzakciót visszafordíthatatlannak tekintsük. Az Ethereum esetében az ajánlott idő 6 blokk vagy éppen több mint 1 perc. Ezután relatív konfidenciával azt mondhatod, hogy a tranzakció sikeres volt. Természetesen több ideig is várhatsz a nagyobb bizonyosság érdekében.

Ezt figyelembe kell venni a dappok tervezésénél, mivel silány felhasználói élményt eredményezhet, ha félretájékoztatjuk a felhasználókat a tranzakciós információkról. Különösen ha a tranzakciónak nagy az értéke.

Ne feledd, hogy ebbe az időbe nem számítjuk bele a várakozási időt, mialatt egy bányász felveszi a tranzakciót.

## Előnyök és hátrányok {#pros-and-cons}

| Előnyök                                                                                                                                                                                                                                             | Hátrányok                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A PoW neutrális. Nincs szükséged ETH-re, hogy elkezd, és a blokk jutalmaknak köszönhetően 0 ETH-ről pozitívba mehet át az egyenleged. A [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) esetében ETH-re van szükséged, hogy belekezdj. | A PoW olyan sok energiát használ fel, ami káros a környezetnek.                                                                                                        |
| A PoW egy kipróbált és letesztelt konszenzus mechanizmus, mely éveken keresztül biztonságban tartotta a Bitcoint és az Ethereumot.                                                                                                                  | Ha bányászni szeretnél, akkor speciális felszerelésre lesz szükséged, mely kezdetnek nagy befektetés.                                                                  |
| A proof-of-stake-kel szemben viszonylag egyszerűbb implementálni.                                                                                                                                                                                   | A folyamatosan növekvő számítási igény miatt, a bányász poolok potenciálisan dominálhatják a bányász világot, mely centralizációhoz és biztonsági kockázatokhoz vezet. |

## A proof-of-stake-kel összehasonlítva {#compared-to-pos}

Fölülről nézve a proof-of-stakenek ugyanaz a végcélja, mint a proof-of-worknek: hogy biztonságosan segítse elérni a konszenzust a decentralizált hálózaton. De van egy pár különbség a folyamatban és a személyekben:

- A PoS leváltja a számítási erő fontosságát a letétbe helyezett ETH-re
- A PoS lecseréli a bányászokat validátorokra. A validátorok letétbe helyezik az ETH-jüket, hogy aktiválják a képességüket új blokkok létrehozására.
- A validátorok nem versenyeznek a blokk létrehozásért, ehelyett egy algoritmus választja ki őket véletlenszerűen.
- A véglegesség tisztább: bizonyos ellenőrzési pontokon, ha a validátorok 2/3 része egyetért a blokk állapotán, akkor a blokkot véglegesnek tekintjük. A validátorok a tejles letétüket felteszik erre, így ha megpróbálnak összejátszani, akkor a teljes letétüket elveszítik.

[Többet a proof-of-stake-ről](/developers/docs/consensus-mechanisms/pos/)

## További olvasnivaló {#further-reading}

- [Többségi támadás](https://en.bitcoin.it/wiki/Majority_attack)
- [Az elszámolási véglegességről](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

## Kapcsolódó témák {#related-topics}

- [Bányászat](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
