---
title: Fordítási útmutató
lang: hu
description: Instrukciók és tippek az ethereum.org fordítóinak
---

# Ethereum.org fordítási stílusútmutató {#style-guide}

Az ethereum.org fordítási stílusútmutató a legfontosabb iránymutatásokat, instrukciókat és tippeket tartalmazza a fordítók számára, hogy a honlapot helyi nyelveken tudjuk megjeleníteni.

Ez egy általános útmutató, nem nyelvspecifikus.

Ha bármilyen kérdése, javaslata vagy visszajelzése van, írjon nekünk a translations@ethereum.org-ra, üzenjen a @ethdotorg-ra a Crowdin-ban, vagy [csatlakozzon a Discord](https://discord.gg/ethereum-org) csatornához, ahol üzenhet a #translations beszélgetésben.

## A Crowdin használata {#using-crowdin}

A [fordítási program oldalon](/contributing/translation-program/#how-to-translate) találhat alapvető instrukciókat arról, hogyan csatlakozzon a Crowdin-ban a projekthez és hogyan kell az online szerkesztőt használni.

Ha többet szeretne megtudni a Crowdin-ről és a haladóbb funkcióiról, akkor a [Crowdin tudástárban](https://support.crowdin.com/online-editor/) minden funkcióról részletes útmutatókat és áttekintéseket találhat.

## Az üzenet lényegének megragadása {#capturing-the-essence}

Amikor az ethereum.org tartalmát fordítja, ne ragaszkodjon a szó szerinti átültetéshez.

Az üzenet lényegét ragadja meg. Ehhez talán át kell fogalmazni bizonyos mondatokat, vagy leírást kell alkalmazni a szavankénti fordítás helyett.

A különféle nyelvek eltérő nyelvtani szabályokkal, konvenciókkal és szórenddel bírnak. A fordításnál vegye figyelembe a célnyelv logikáját, és ne ragaszkodjon az angol stuktúrájához, mert ennek gyenge megfogalmazás és olvashatóság lesz a következménye.

Olvassa el az egész mondatot, és alakítsa úgy, hogy az a célnyelvnek megfeleljen.

## Magázás vagy tegezés {#formal-vs-informal}

Magázást használunk, mert az mindig udvarias és minden látogatónak megfelel.

Ilyen megfogalmazással elkerülhetők a nem hivatalosnak vagy támadónak hangzó kifejezések, és a látogatók korától és nemétől függetlenül mindig alkalmas.

A legtöbb indoeurópiai és afro-ázsiai nyelv nemspecifikus második személyű személyes névmásokat használ, amelyek megkülönböztetik a férfiakat és a nőket. A felhasználó megszólításakor vagy a birtokos névmások használatakor elkerülhetjük a látogató nemének feltételezését, mivel a formális megszólítási forma általánosan alkalmazható és következetes, függetlenül attól, hogy a látogató hogyan azonosítja magát.

## Egyszerű és tiszta szóhasználat és jelentés {#simple-vocabulary}

Az a célunk, hogy a honlapon lévő tartalom mindenki számára érthető legyen.

Ez könnyen elérhető rövid és egyszerű szavak használatával. Ha több szó is rendelkezésre áll az adott nyelven, akkor a legjobb a legrövidebb kifejezés, amely visszaadja a jelentést.

## Írásrendszerek {#writing-system}

Az ethereum.org számos nyelven elérhető a latinhoz képest eltérő írásrendszerek (vagy írásjelek) használatával.

A tartalom az adott nyelvnek megfelelő írásrendszeren kell megjelenjen, és ne tartalmazzon latin írásjeleket.

A tartalom átültetésénél biztosítani kell, hogy a fordítás konzisztens legyen és nem tartalmazzon latin írásjeleket.

Általános félreértés, hogy az Ethereum kifejezéseinek latin írásjelekkel kell megjelennie. Ez nem helyes, inkább a kiejtését használjuk minden helyi nyelven (például 以太坊 kínaiul, إيثيريوم arabul stb.).

**Ez természetesen nem alkalmazható azokra a nyelvekre, ahol a tulajdonneveket nem fordítják le.**

## Az oldal metaadatának fordítása {#translating-metadata}

Néhány oldal tartalmaz metaadatokat, mint „title”, „lang”, „description”, „sidebar” stb.

A Crowdin-ban el van rejtve az a szöveg, melyet nem kell lefordítani, tehát a látható metaadatokhoz is megfelelő fordításra van szükség.

Legyen körültekintő, amikor a forrásszöveg „en” jelöléssel szerepel. Ez mutatja, hogy az oldal milyen nyelven elérhető, és a [helyi nyelv ISO-nyelvikódjára](https://www.andiamo.co.uk/resources/iso-language-codes/) kell fordítani. Ezeket a sztringeket latin írásjelekkel kell írni, nem más írásrendszerrel.

A nyelvi kódokhoz nézze meg a Crowdin fordítási memóriáját, vagy az online szerkesztőben is láthatja az oldal URL-jében.

Néhány példa a nyelvi kódokra:

- Arab - ar
- Egyszerűsített kínai - zh
- Francia - fr
- Hindi - hi
- Spanyol - es

## Külsős cikkek címei {#external-articles}

Néhány sztring külsős cikkek címeit is tartalmazza. A legtöbb fejlesztői dokumentáció ajánl további olvasmányokat külsős cikkek formájában. Ezeket a címeket le kell fordítani a helyi nyelvre, hogy a látogató konzisztens módon tudja elolvasni a szöveget.

Alább talál néhány példát arra, hogyan néznek ki ezek a sztringek, hogyan lehet ezeket azonosítani (a cikkekre mutató hivatkozások az oldalak alján, a További olvasnivalók részben találhatók):

![Cikkcímek az oldalsó menüben](./article-titles-in-sidebar.png) ![Cikkcímek a szerkesztőben](./article-titles-in-editor.png)

## Crowdin figyelmeztetések {#crowdin-warnings}

A Crowdin beépített funkciója, hogy hibák esetén jelez a fordítónak. Automatikus figyelmeztet mentés előtt, ha lemaradt egy tag a forrás szerint, ha olyan elemet fordított le, melyet nem szabad, ha több szóköz van valahol, hiányzik a mondat végén az írásjel stb. Amikor ilyen figyelmeztetést lát, kérjük, hogy nézze meg még egyszer a fordítását.

**Ezek mindig azt jelzik, hogy valami eltérés van vagy fontos rész hiányzik.**

Így néz ki egy Crowdin figyelmeztetés, ha lemarad egy tag: ![Példák a Crowdin figyelmeztetéseire](./crowdin-warning-example.png)

## Tagek és kódrészletek kezelése {#dealing-with-tags}

Számos szöveg tartalmaz tageket és variánsokat, amelyeket a szerkesztőben sárgával láthatunk. Ezeknek funkciójuk van, ezért megfelelően kell kezelni őket.

**Crowdin-beállítások**

A tagek kezeléséhez és másolásához azt javasoljuk, hogy változtassa meg a beállítását.

1. Beállítások megnyitása ![Hogyan kell a beállításokat megnyitni a szerkesztőben](./editor-settings.png)

2. Gördítsen le a HTML-tagek megjelenítése pontig

3. „Elrejtés” kiválasztása![Válassza ki az „Elrejtés” lehetőséget](./hide-tags.png)

4. Kattintson a „Mentés” lehetőségre

Ebben az eseten nem a teljes tag látszik, hanem egy szám lesz a helyén. A fordításnál ezekre a tagekre kattintva a teljes hivatkozást átmásolja a fordítói mezőbe.

**Hivatkozások**

Teljes hivatkozásokat is találhat az ethereum.org vagy más honlapokra vonatkozóan.

Ezek maradjanak azonosak a forrással, ne változtassa meg őket. Ha bármit változtat a hivatkozásokon, akár egy perjelet is kivesz, akkor azok használhatatlanná válnak.

A hivatkozásokat másolja át egyenesen a forrásból, kattintson rájuk vagy használja a „forrás másolása” (copy source) gombot (Ctrl+Shift+C).

![Example of link.png](./example-of-link.png)

A hivatkozások tagekkel formázva is megjelennek a forrásszövegben (vagyis <0> </0>). Ha a tagek fölé mozgatja a kurzort, akkor megnézheti a tartalmát - ezek sokszor hivatkozásokat tartalmaznak.

A hivatkozásokat mindig másolja át a forrásból, ne változtassa meg a sorrendjüket.

Ha a tagek megváltoznak, akkor az általuk képviselt hivatkozások használhatatlanok lesznek.

![Example of links inside tags.png](./example-of-links-inside-tags.png)

**Tagek és variánsok**

A forrás sokféle taget tartalmaz, melyeket mindig másoljon át a forrásból. A sorrendjük is maradjon a forrásnak megfelelő.

A tageknél mindig van nyitó és zárótag. Az ezek közé eső szöveget általában le kell fordítani.

Például: `<strong x-id="1">`Decentralizált`</strong>`

`<strong x-id="1">` - _Ez egy nyitótag, melytől félkövér lesz a szöveg_

Decentralizált - _Fordítandó szöveg_

`</strong>` - _Zárótag_

![Example of 'strong' tags.png](./example-of-strong-tags.png)

A kódrészleteket másképp kell megközelíteni, mert ezek kódot tartalmaznak és nem szabad lefordítani.

Például: `<code>`nonce`</code>`

`<code>` - _Nyitótag, melyben egy kódrészlet van_

nonce - _Nem fordítható szöveg_

`</code>` - _Zárótag_

![Example of code snippets.png](./example-of-code-snippets.png)

A forrás tartalmaz rövidített tagokat is, melyek csak számként jelennek meg, a tartalmuk nem egyértelmű ránézésre. Ha a kurzort fölé mozgatjuk, akkor látszik, hogy mit tartalmaznak.

Az alábbi példában látszik, hogy a kurzort odamozgatva <0> azt mutatja, hogy `<code>` és egy kódrészletet tartalmaz, így azt nem kell lefordítani.

![Example of ambiguous tags.png](./example-of-ambiguous-tags.png)

## Rövid és hosszú alakok/rövidítések {#short-vs-full-forms}

Számos rövidítést használunk a honlapon, például dapp-ok, NFT, DAO, DeFi stb. Ezek elfogadott rövidítések az angolban és a legtöbb felhasználó számára ismerősek.

Mivel ezeknek nem létezik más nyelvre való átültetése, ezért a legjobb módszer egy leíró fordítás használata, mely mellé bekerül zárójelbe az eredeti rövidítés.

Ne fordítsa le a rövidítést, mert nem fogják felismerni a felhasználók és a helyi megoldás nem lesz számukra ismerős.

Például a dapp-ok fordítása:

- Decentralizált alkalmazások (dapp-ok) → _Teljes formában lefordítva (angol rövidítés zárójelben)_

## Kifejezések, melyekre nincs bevett fordítás {#terms-without-established-translations}

Bizonyos kifejezéseknek nincs bevett fordítása az adott nyelven, és inkább angolul ismeri mindenki. Az ilyen kifejezések sokszor új koncepciókat fednek le, mint a proof-of-work, proof-of-stake, Beacon-lánc, staking stb.

Bár a fordítás furcsán hathat, mégis érdemes lenne átültetni ezeket a helyi nyelvre.

A fordításnál legyen kreatív, írja körül vagy egyszerűen írja át a saját nyelvére.

**Azért érdemes lefordítani a helyi nyelvre és nem angolul használni, mert a jövőben ez az új terminológia sokkal elterjedtebb lesz, ahogy sokan kezdik el használni az Ethereumot és a kapcsolódó technológiákat. Az új emberek bevonásához érthető terminológiára van szükség minden nyelven, még ha azt nekünk is kell kitalálni.**

## Gombok és CTA-k {#buttons-and-ctas}

A honlapon számos gomb található, melyet másképpen kell lefordítani.

A gomb szövegét úgy lehet beazonosítani, hogy a kontextusban található képernyőképen látható, vagy a szerkesztőben a „button” kifejezéssel szerepel.

A fordítás legyen a lehető legrövidebb, hogy ne okozzon gondot a formázásnál. Emellett legyen felszólító módban, vagyis egy utasítást vagy kérést tükrözzön.

![Hogyan lehet felismerni a gombot](./how-to-find-a-button.png)

## Fordítás a befogadás szellemében {#translating-for-inclusivity}

Az ethereum.org látogatói a világ minden tájáról jönnek és különféle háttérrel rendelkeznek. Ezért a honlap nyelve legyen semleges, mindenkit befogadó, nem kizáró jellegű.

Ennek fontos szempontja a nemi semlegesség. Ehhez a formális megszólításokat érdemes használni, és elkerülni a nemre utaló kifejezéseket a fordításban.

A bevonás másik szempontja a globális közönség figyelembe vétele, amely nem szűkül le semelyik országra, fajra vagy régióra.

Végül a nyelve legyen megfelelő mindenféle közönségnek és korosztálynak.

## Nyelvspecifikus fordítások {#language-specific-translations}

A fordítás közben ügyeljen arra, hogy az adott nyelv nyelvtani szabályait, konvencióit és formázását kövesse, ne a forrást vegye figyelembe. A forrásszöveg az angol szabályokat követi, melyek nem feltétlen alkalmazhatók más nyelveknél.

Ismerje és használja a saját nyelvének szabályait megfelelő módon. Ha segítségre van szüksége, akkor jelezze, és megpróbálunk információkat találni az adott nyelv szabályairól.

Néhány példa, hogy mire kell különösen odafigyelni:

### Írásjelek, formázás {#punctuation-and-formatting}

**Nagybetüs írásmód**

- A nagybetüs írásmód jelentősen eltér a különféle nyelvekben.
- Az angolban minden címet és nevet, a hónapokat és napokat, a nyelvek neveit, az ünnepeket stb. mind nagybetűvel írják. Más nyelvekben ez hibásnak minősül, mert más szabályokat követnek.
- Máshol jellemző a személyes névmások, főnevek és bizonyos melléknevek nagybetűvel való írása, ami az angolban másképp van.

**Szóközhasználat**

- A helyesírási szabályok megadják az adott nyelv szóközhasználatát. Mivel szóközt mindenhol használunk, ezért ezek a szabályok a legkülönfélébbek és könnyű elrontani a fordításban.
- Néhány jellemző különbség az angol és más nyelvek között:
  - Szóköz a mértékegységek és valuták előtt (pl. USD, EUR, kB, MB)
  - Szóköz a hőfokot jelző jel előtt (pl. °C, ℉)
  - Szóköz néhány írásjel előtt, mint a szókihagyás (…)
  - Szóköz a perjel (/) előtt és után

**Listák**

- Minden nyelvben eltérő szabályok vonatkoznak a listák írására. Melyek jelentősen eltérhetnek az angoltól.
- Néhány nyelvben az első szót nagybetűvel kell írni, máshol kisbetűvel kezdik. Számos nyelvben más szabály van a nagybetűvel való írásra attól függően, hogy milyen hosszúak a sorok.
- Ez igaz a mondatvégi írásjelekre is. A lista végén lehet pont (**.**), vessző (**,**) vagy pontosvessző (**;**) a nyelvtől függően.

**Idézőjelek**

- A nyelvek másféle idézőjeleket használnak. Az angol átmásolása általában nem helyes.
- A leggyakoribb példák:
  - „példaszöveg“
  - ‚példaszöveg’
  - »példaszöveg«
  - “példaszöveg”
  - ‘példaszöveg’
  - «példaszöveg»

**Kötőjelek és gondolatjelek**

- Az angolban a kötőjelet (-) arra használják, hogy szavakat vagy szórészeket kapcsoljanak össze, miközben a gondolatjel (–) inkább tartományt vagy megállást jelöl.
- Sok nyelvben eltérő a használata a kötőjelnek és a gondolatjelnek, melyet figyelembe kell venni.

### Formátumok {#formats}

**Számok**

- A számok írásában a legnagyobb eltérés a decimális és az ezres elválasztás jelölése. Az ezres elválasztás lehet pont, vessző vagy szóköz. Ehhez hasonlóan néhány nyelv pontot használ a decimálisnál, mások vesszőt.
  - Néhány példa:
    - Angol – **1,000.50**
    - Spanyol – **1.000,50**
    - Francia – **1 000,50**
- Másik fontos megfontolás lehet a százalékjel használata. Különféle módokon lehet írni: **100%**, **100 %** vagy **%100**.
- Végül a negatív számok írásmódja is eltérhet a nyelvtől függően: -100, 100-, (100) vagy [100].

**Dátumok**

- A dátumok írásánál számos dolgot figyelembe kell venni a nyelvi eltérések miatt. A dátum formátuma, elválaszás, nagybetű használata és kezdő nullák használata. Különbség van a teljes hosszúságú és a számokkal írt dátum között is.
  - Néhány példa a dátumformátumokra:
    - Angol UK (dd/mm/yyyy) – 1st January, 2022
    - Angol US (mm/dd/yyyy) – January 1st, 2022
    - Kínai (yyyy-mm-dd) – 2022 年 1 月 1 日
    - Francia (dd/mm/yyyy) – 1er janvier 2022
    - Olasz (dd/mm/yyyy) – 1º gennaio 2022
    - Német (dd/mm/yyyy) – 1. Januar 2022

**Pénznemek**

- A pénznemek fordítása nehézsége okozhat a különféle formátumok, konvenciók és átváltások miatt. Általános szabályként hagyjuk meg az eredeti szövegben lévő pénznemet. Az olvasó kedvéért hozzátehetjük zárójelben a helyi pénznemet és átváltást.
- Az írásbeli eltérés a szimbólumok elhelyezésében, a decimális jelölőkben, a szóközben, rövidítésekben vagy szimbólumok használatában áll.
  - Szimbólum elhelyezése: $100 vagy 100$
  - Decimális vessző vagy pont: 100,50$ vagy 100.50$
  - Szóközhasználat: 100$ vagy 100 $
  - Rövidítések vagy szimbólumok: 100 $ vagy 100 USD

**Mértékegységek**

- Általános szabályként hagyjuk meg az eredeti szövegben lévő mértékegységeket. Ha más rendszert használ egy adott ország, akkor zárójelben meg lehet mutatni azt is.
- A helyi használat mellett vannak más eltérések is a nyelveknél. A fő különbség a szóközhasználat a szám és a mértékegység között van, mely eltérhet nyelvenként. Például 100kB vagy 100 kB, 50ºF vagy 50 ºF.

## Következtetés {#conclusion}

Az ethereum.org fordítása remek lehetőség arra, hogy az Ethereum különféle aspektusait megismerjük.

A fordítás során próbáljon meg nem sietni. Élvezze a folyamatot, leljen benne örömet!

Köszönjük, hogy részt vesz a fordítási programban, s lehetővé teszi, hogy a honlap mások számára is elérhető legyen. Az Ethereum közössége globális, örülünk, hogy Ön is a tagja!
