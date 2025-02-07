---
title: Fordítási program – gyakran ismételt kérdések (GYIK)
lang: hu
description: Gyakran ismételt kérdések az ethereum.org fordítási programról
---

# Útmutató az ethereum.org fordításához {#translating-ethereum-guide}

Ha Önnek új a fordítási program és még kérdései vannak, akkor az alábbi gyakran ismételt kérdések segíthetnek a kezdésben. Ez az útmutató segít választ kapni a legjellemzőbb kérdésekre.

## Kaphatok jutalmat az ethereum.org fordításáért? {#compensation}

Az ethereum.org egy nyílt forráskódú honlap, ezért bárki részt vehet és hozzájárulhat.

Az ethereum.org fordítási program ennek kiterjesztése és ugyanilyen elveken működik.

A fordítási program célja, hogy az Ethereumhoz kapcsolódó tartalom mindenki számára elérhető legyen, függetlenül az általa beszélt nyelvektől. Azt is lehetővé teszi, hogy a több nyelvet beszélők részt vehessenek az Ethereum ökoszisztémájában és hozzájáruljanak ahhoz.

Ezért a fordítási program nyitott és önkéntes, nem jár érte külön jutalom. Ha a lefordított szavak után fizetni kellene a fordítóknak, akkor a fordítási programba csak profi fordítók vehetnének részt. Emiatt a program kizárólagos lenne, és nem érné el a célját, azt, hogy bárki bevonódhasson és részt vehessen az ökoszisztémában.

Mindent megteszünk, hogy a hozzájárulók sikeresek legyenek az Ethereum ökoszisztémában; számos nem pénzügyi ösztönző létezik, mint a [POAP-ok](/contributing/translation-program/acknowledgements/#poap) és a [fordítói igazolás](/contributing/translation-program/acknowledgements/#certificate), továbbá a [Fordítói ranglista](/contributing/translation-program/acknowledgements/) és [a fordítók megjelenítése a honlapon](/contributing/translation-program/contributors/).

## Hogyan kell lefordítani a sztringeket, melyekben `<HTML tags>` található? {#tags}

Nem minden sztring jelenik meg egyszerű szövegként. Bizonyos sztringek tartalmaznak HTML tagokat (`<0>`, `</0>`).Ezek lényege a hiperlinkek beillesztése, illetve a formázás.

- A tagek közötti szöveget fordítsa le, de a tagekat ne. A `<` és `>` zárójelek között ne fordítson és ne változtasson semmit.
- A sztring egységessége érdekében használja az eredeti másolása (Copy Source) gombot balra lent. Ez átmásolja az eredeti sztringet és beilleszti a szövegdobozba. Ezzel a tagek egyértelműen a helyükön lesznek, és így nem fog semmi hiányozni.

![Crowdin interfész, ahol az eredeti másolása gomb ki van emelve](./html-tag-strings.png)

A sztingen belül mozgathatja a tagek helyét, hogy a fordításnak megfelelő helyen álljanak - csak egyszerre mozgassa minden részét.

A tagek és kódrészletek kezeléséről többet megtudhat az [ethereum.org Fordítási stílusútmutatóból](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Hol élnek a sztringek? {#strings}

Az eredeti sztring néha nem elég ahhoz, hogy pontos fordítást tudjon adni.

- Nézze meg a „képernyőképeket” és a „kontextust” a további információkért. Az eredeti sztring szekciójában látható a képernyőkép, mely megmutatja, hogy milyen szövegkörnyezetben helyezkedik el a sztring.
- Ha mégis bizonytalan lenne, jelezze azt a „komment szekcióban”. [Nem tudja, hogyan írjon kommentet?](#comment)

![Megmutatja, hogyan látszik a kontextus egy sztringnél a képernyőkép segítségével](./source-string.png)

![Egy példa képernyőkép a kontextusban](./source-string-2.png)

## Hogyan írjak kommentet vagy kérdezzek? Szeretnék jelezni valami gondot vagy elírást... {#comment}

Ha egy adott sztring kapcsán jelezni szeretne valamit, írjon kommentet.

- Kattintson a második gombra a jobb fenti menüsorban. Jobb oldalon megjelenik egy rejtett lap. Írja meg kommentjét vagy kattintson a „probléma” (issue) dobozra alul a bejelöléséhez. Kiválaszthatja a probléma típusát a legördülő menüből.
- Amint elküldi, az megjelenik a csapatunknál. Kijavítjuk a problémát, válaszolunk Önnek a kommentjére és lezárjuk azt.
- Ha egy helytelen fordítást jelez, akkor az adott fordítás és az új javaslat a következő átnézés során egy olyan személyhez kerül, aki beszéli az adott nyelvet.

![Hogyan lehet kommenteket és kéréseket létrehozni](./comment-issue.png)

## Mi az a fordítói memória (TM)? {#translation-memory}

A fordítói memória (TM) egy Crowdin funkció, mely eltárolja a korábban fordított [ethereum.org](http://ethereum.org/) sztringeket. A sztring fordításkor automatikusan bekerül a projekt TM-jébe. Ez egy hasznos eszköz lehet, mellyel időt spórolhat!

- Tekintse meg a „TM- és MT-javaslatokat”, és láthatja, hogy mások hogyan fordították az adott vagy hasonló kifejezést. Ha talál egy nagy mértékben illeszkedő megoldást, akkor úgy használhatja fel azt, hogy rákattint.
- Ha a lista üres, akkor kereshet a TM-ben korábbi fordításokat, hogy konzisztensen legyenek adott kifejezések használva.

![A fordítói memóriáról készült képernyőkép](./translation-memory.png)

## Hogyan használjam a Crowdin szószedetet? {#glossary}

Az Ethereum terminológia egy másik fontos része a fordító tevékenységnek, mivel a legtöbb új technikai kifejezés még nem rendelkezik helyi megfelelővel. Emellett bizonyos kifejezések mást jelentenek a különböző kontextusokban. [Bővebben az Ethereum terminológiafordításáról](#terminology)

A Crowdin szószedet jó hely arra, hogy a kifejezéseket és definíciókat tisztázzuk. Kétféleképpen lehet a szószedetet használni.

- Először is, ha alá van húzva egy kifejezés az eredeti sztringben, akkor vigye oda az egeret és láthatja a rövid meghatározását.

![Egy példa a szószedetben lévő definícióra](./glossary-definition.png)

- Másodszor, ha lát egy ismeretlen kifejezést, de az nincs aláhúzva, akkor kereshet a szószedetben (harmadik gomb a jobb oszlopban). Itt megtalálja bizonyos kifejezések magyarázatát, melyek gyakran szerepelnek a projektben.

![Képernyőkép, hogy hol található a Crowdin-ban a szószedet](./glossary-tab.png)

- Ha nem találja, akkor adja hozzá! Keresse meg azt egy keresőben, és adja hozzá a meghatározást a szószedethez. Ezzel segítheti a többi fordítót is, hogy jobban megértsék a kifejezést.

![Képernyőkép, hogyan lehet a Crowdin-ben új elemet felvinni a szószedetbe](./add-glossary-term.png)

### Terminológiafordítási szabályzat {#terminology}

_A nevek (márkák, cégek, emberek) és az új technológiai kifejezések (Beacon-lánc, shard láncok stb.) kapcsán_

Az Ethereum számtalan új kifejezést használ, melyeket nemrég találtak ki. Néhány kifejezés másképp fog megjelenni minden fordítónál, mert nincsen rá egy megoldás az adott nyelven. Az ilyen inkonzisztenciák félreértést okozhatnak és rontják az olvashatóságot.

A nyelvi sokszínűség és a különféle sztenderdizációk miatt szinte lehetetlen egységesen hozzáállni a terminológia fordításához, mely mindenre használható lenne.

Ezért a leggyakrabban használt kifejezéseket a fordítókra bízzuk.

A következőket javasoljuk, ha ismeretlen kifejezéssel találkozik:

- Tekintse meg a [szószedetet](#glossary), hogy más fordítók hogyan kezelték azt. Ha úgy véli, hogy a korábbi megoldások nem megfelelők, akkor adja hozzá a saját verzióját a szószedethez.
- Ha a szószedetben nincs semmi, nézze meg egy keresőben vagy a cikkekben, hogy a saját közössége hogyan használja azt.
- Ha nem talál ilyen előfordulást, akkor bízzon az intuíciójában és javasoljon egy megoldást!
- Ha bizonytalan lenne, akkor hagyja fordítás nélkül az adott kifejezést. Néha az angol kifejezések kellőképpen hordozzák a kifejezés értelmét.

A márkák, cégek és emberek neveit hagyja meg, mert zavarhoz és SEO-nehézségekhez vezethet.

## Hogyan működik az átnézés? {#review-process}

A fordítások minőségének és konzisztenciájának érdekében az [Acolad](https://www.acolad.com/) végzi az átnézést, ami világ szinten az egyik legnagyobb nyelvi szolgáltató. Az Acolad 20 000 profi nyelvésszel dolgozik, akik szakmai átnézést biztosítanak minden nyelvre és tartalomra.

Az átnézés folyamata egyértelmű; amint egy adott [tartalommappa](/contributing/translation-program/content-buckets) 100%-ban le van fordítva, akkor arra az adagra megrendeljük az átnézést. Az átnézés a Crowdin platformon történik. Amint az átnézéssel végeztek, a lefordított tartalom megjelenik a honlapon.

## Hogyan adhatok hozzá tartalmat a saját nyelvemen? {#adding-foreign-language-content}

Jelenleg a nem angol nyelvű tartalom közvetlenül angolból van fordítva, ezért olyan szöveg nem adható hozzá egy adott nyelvhez, amely nem létezik angolul.

Ha szeretne az ethereum.org-ra új tartalmat javasolni, akkor [nyisson egy kérést](https://github.com/ethereum/ethereum-org-website/issues) a GitHub-on. Ha ezzel egyetértenek, az új tartalom angolul készül el, és a Crowdin platformon lesz lefordítva minden más nyelvre.

A jövőben a tervek szerint nem angol nyelvű tartalom is bekerülhet majd.

## Kapcsolatfevétel {#contact}

Köszönjük, hogy áttekintette a fentieket. Reméljük, hogy ez segít bekapcsolódni a programba. Csatlakozzon a [Discord fordítási csatornához](https://discord.gg/ethereum-org), hogy választ kapjon a kérdéseire, egyeztessen a többi fordítóval, vagy írjon nekünk a translations@ethereum.org címre!
