---
title: Gasper
description: A Gasper proof-of-stake mechanizmusának magyarázata.
lang: hu
---

A Gasper a Casper, a baráti véglegességi eszköz (Casper-FFG), és az LMD-GHOST elágazásválasztó-algoritmus kombinációja. Ezek az összetevők együttesen alkotják az Ethereum proof-of-stake-et biztosító konszenzusmechanizmust. A Casper az a mechanizmus, amely bizonyos blokkokat „véglegesre” frissít, hogy a hálózatba újonnan belépők biztosak lehessenek abban, hogy a kanonikus láncot szinkronizálják. Az elágazásválasztó algoritmus felhalmozott szavazatokat használ, hogy a csomópontok könnyen kiválaszthassák a helyeset, amikor elágazások keletkeznek a blokkláncban.

**Érdemes megjegyezni**, hogy a Casper-FFG eredeti definíciója kissé megváltozott a Gasperbe való beépítéshez. Ezen az oldalon a frissített változatot tekintjük át.

## Előfeltételek

A jelen téma könnyebb megértéséhez tekintse meg a [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) alapjairól szóló bevezető oldalt.

## A Gasper szerepe {#role-of-gasper}

A Gasper egy proof-of-stake blokklánc tetején helyezkedik el, ahol a csomópontok biztonsági letétként ethert biztosítanak, amely megsemmisíthető, ha lusták vagy rosszhiszeműek a blokkok javaslata vagy validálása során. A Gasper az a mechanizmus, amely meghatározza, hogyan jutalmazzák és büntetik a validátorokat, hogyan döntenek arról, hogy mely blokkokat fogadják el és melyeket utasítják el, és hogy a blokklánc melyik elágazására építsenek.

## Mi az a véglegesség? {#what-is-finality}

A véglegesség bizonyos blokkok tulajdonsága, ami azt jelenti, hogy nem lehet visszafordítani azokat, kivéve, ha kritikus konszenzushiba történt, és a támadó a teljes letétbe helyezett ether legalább 1/3-át megsemmisítette. A véglegesített blokkok olyan információkat jelentenek, amelyekkel kapcsolatban a blokklánc biztos. Egy blokknak kétlépcsős frissítési eljáráson kell átesnie ahhoz, hogy véglegesítésre kerüljön:

1. Az összes feltett ether kétharmadának kell megszavaznia, hogy az adott blokk bekerüljön a kanonikus láncba. Ez a feltétel a blokkot „érvényesített” kategóriába emeli. Az érvényesített blokkokat nem valószínű, hogy visszafordítják, de bizonyos feltételek mellett megtörténhet.
2. Ha egy másik blokkot érvényesítenek egy érvényesített blokk tetején, akkor az „véglegesített” állapotba kerül. Egy blokk véglegesítése az adott blokknak a kanonikus láncba való felvétele iránti elköteleződés. Nem lehet visszaállítani, kivéve, ha egy támadó több millió ethert (több milliárd $USD) semmisít meg.

Ezek a blokkfrissítések nem minden slotban történnek meg. Ehelyett csak a korszakhatárhoz tartozó blokkok érvényesíthetők és véglegesíthetők. Ezeket a blokkokat ellenőrzőpontoknak nevezzük. A frissítés az ellenőrzőpontpárokat veszi figyelembe. Két egymást követő ellenőrzőpont között „szupertöbbségi kapcsolatnak” kell fennállnia (az összes letétbe helyezett ether kétharmada szavaz arra, hogy a B ellenőrzőpont az A ellenőrzőpont helyes leszármazottja) ahhoz, hogy a korábbi ellenőrzőpontot véglegesítettre, a frissebbet pedig érvényesítettre lehessen állítani.

Mivel a véglegesítéshez kétharmados egyetértés kell a blokk kanonikus voltát illetően, egy támadó nem tud a következők nélkül alternatív véglegesített láncot létrehozni:

1. A teljes letétbe helyezett ether kétharmadának birtoklása vagy manipulálása nélkül.
2. A letétbe helyezett ether legalább egyharmadának elpusztítása nélkül.

Az első feltétel azért merül fel, mert egy lánc véglegesítéséhez a letétbe helyezett ether kétharmadára van szükség. A második feltétel azért van, mert ha a teljes letét kétharmada mindkét elágazás mellett szavazott, akkor egyharmadának mindkettőre szavaznia kellett. A kettős szavazás súlyos büntetést és kizárást von maga után, amelyet maximálisan büntetnének, és a teljes letét egyharmada megsemmisülne. 2022 májusától ezért egy támadónak körülbelül 10 milliárd dollár értékű ethert kellene elégetnie. A Gasperben a blokkokat érvényesítő és véglegesítő algoritmus a [Casper-FFG](https://arxiv.org/pdf/1710.09437.pdf) kissé módosított formája.

### Ösztönzők és súlyos büntetés (slashing) {#incentives-and-slashing}

A validátorok jutalmat kapnak a blokkok jóhiszemű előterjesztéséért és validálásáért. Ethert kapnak jutalomként, mely hozzáadódik a letétjükhöz. Másrészt, azok a validátorok, akik nem cselekszenek, amikor felszólítják őket, lemaradnak ezekről a jutalmakról, és bizonyos esetekben elveszítik meglévő letétjük egy kis részét. A távolmaradásért járó büntetések csekélyek, és a legtöbb esetben csak a jutalmak elmaradását jelentik. Ugyanakkor vannak olyan validátori műveletek, amelyeket nehéz lenne véletlenül megtenni, ezért valamilyen rosszindulatú szándékot jeleznek, például több blokkot javasolni vagy tanúsítani ugyanarra a slotra, vagy ellentmondani a korábbi ellenőrzési pontra vonatkozó szavazásnak. Ezek a viselkedésmódok súlyos büntetést vonnak maguk után komoly következményekkel: a slashing eredményeként a validátor letétjének egy része megsemmisül, a validátort pedig eltávolítják a hálózatból. Ez a folyamat 36 napig tart. Az 1. napon legfeljebb 1 ETH összegű kezdeti büntetés jár. Ezután a súlyos büntetést kapott validátor ether egyenlege lassan fogy a kilépési időszak alatt, de a 18. napon „korrelációs büntetést” kap, amely nagyobb, ha több validátor egy időben kerül kizárásra. A maximális büntetés a teljes letét. Ezek a jutalmak és büntetések arra szolgálnak, hogy ösztönözzék a becsületes validátorokat, és visszatartsák a hálózat elleni támadásokat.

### Inaktivitási elszivárgás {#inactivity-leak}

A biztonság mellett a Gasper „elfogadható elérhetőséget” is biztosít. Ez az a feltétel, hogy amíg az összes letétbe helyezett ether kétharmada becsületesen és a protokollt követve szavaz, a lánc képes lesz a véglegesítésre, függetlenül bármilyen más tevékenységtől (például támadások, késleltetés vagy súlyos büntetések). Másképp fogalmazva, a teljes letétbe helyezett ether egyharmadának veszélyeztetettnek kell lennie ahhoz, hogy a lánc ne tudjon véglegesedni. A Gasperben van egy további védelmi vonal az elérhetőség sérülése ellen, amelyet „inaktivitási elszivárgásként” ismerünk. Ez a mechanizmus akkor aktiválódik, amikor a blokklánc véglegesítése több mint négy korszakon keresztül meghiúsul. Azoknak a validátoroknak, akik nem tanúsítják aktívan a többségi láncot, a letétjük fokozatosan elszivárog, amíg a többség vissza nem nyeri a teljes letét kétharmadát, így az elérhetőség sérülése csak átmeneti.

### Elágazásválasztás {#fork-choice}

A Casper-FFG eredeti definíciója tartalmazott egy elágazásválasztó algoritmust a következő szabállyal: `kövesse azt a láncot, amely a legnagyobb magasságú érvényesített ellenőrzőpontot tartalmazza`, ahol a magasságot a genezisblokktól való távolságként határozzuk meg. A Gasperben az eredeti elágazásválasztási szabályt lecserélték egy kifinomultabb, LMD-GHOST nevű algoritmusra. Fontos megérteni, hogy normális körülmények között az elágazásválasztási szabály szükségtelen, mert minden slothoz egyetlen blokkajánló tartozik, és ezt a jóhiszemű validátorok tanúsítják. Csak nagy hálózati aszinkronitás esetén, vagy ha egy rosszhiszemű blokkajánló kétértelműen nyilatkozott, van szükség elágazásválasztó algoritmusra. Ha azonban ezek az esetek mégis bekövetkeznek, ez az algoritmus kritikus védelmet jelent, ás biztosítja a helyes láncot.

Az LMD-GHOST a következő kifejezés rövidítése: latest message-driven greedy heaviest observed sub-tree (a legutolsó üzenet által vezérelt, mohó, legsúlyosabb részfa). Ez egy nehézkes meghatározása annak, hogy a tanúsítások legnagyobb összesített súlyával rendelkező elágazást választja ki kanonikusnak (mohó legsúlyosabb részfa), és ha több üzenet érkezik egy validátortól, csak a legutolsót veszi figyelembe (legutolsó üzenet által vezérelt). Mielőtt a legnehezebb blokkot hozzáadná a kanonikus láncához, minden validátor minden blokkot e szabály alapján értékel.

## További olvasnivaló {#further-reading}

- [Gasper: A GHOST és a Casper kombinációja](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper, a baráti véglegességi eszköz (Friendly Finality Gadget)](https://arxiv.org/pdf/1710.09437.pdf)
