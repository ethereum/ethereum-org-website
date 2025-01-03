---
title: Decentralizált tőzsde (DEX) tervezésének bevált gyakorlatai
description: Útmutató a tokenátváltás UX/UI döntéseihez.
lang: hu
---

Az Uniswap 2018-as bevezetése óta százával jöttek létre decentralizált tőzsdék tucatnyi különböző láncon.
Számos új elemeket vezetett be vagy beletette a maga kis csavarját, de az interfész általában ugyanolyan maradt.

Ennek egyik oka [Jakob törvénye](https://lawsofux.com/jakobs-law/):

> A felhasználók a legtöbb időt ezeken az oldalakon töltik. Tehát azt preferálják, hogy minden oldal ugyanúgy működjön, ahogy azt már megismerték.

A korai bevezetőknek, mint a Uniswap, Pancakeswap és Sushiswap köszönhetően a DeFifelhasználóknak van egy közös elképzelésük, hogyan néz ki egy DEX.
Emiatt meg tudunk fogalmazni bevált gyakorlatokat. Egyre több tervezési döntést kezelnek sztenderd módon a különböző oldalakon. A DEX-ek fejlődését úgy nézhetjük végig, mint egy nagy tesztelés, ami élőben folyik. A működő dolgok maradnak, a nem működőket kivetik. Van hely az egyéni megoldásokra, de bizonyos szabványoknak meg kell felelni.

Ez a cikk összefoglalja:

- mit tartalmazzon
- hogyan legyen a leginkább használható
- a személyreszabás főbb módjai

A példák modelljei ehhez a cikkhez készültek, bár valódi projekteken alapulnak.

A Figma eszközkészlet megtalálható a cikk alján – használja Ön is szabadon, és alkossa meg saját modelljét!

## A DEX alapvető anatómiája {#basic-anatomy-of-a-dex}

Az UI általában három elemet tartalmaz:

1. Fő űrlap
2. Gomb
3. Részletek panel

![Általános DEX UI a három fő elemmel](./1.png)

## Variációk {#variations}

Ez a közös téma, de ezeket az elemeket különféle módokon lehet elrendezni. A részletek panel lehet:

- A gomb felett
- A gomb alatt
- Rejtve egy kinyíló panelben
- És/vagy egy előnézeti ablakban

Megjegyzés: Az előnézeti ablak opcionális, de ha kevés adat van a fő felületen, akkor szükség lesz rá.

## A fő űrlap struktúrája {#structure-of-the-main-form}

Ez az a doboz, ahol kiválasztjuk, melyik tokent akarjuk átváltani. Egy beviteli mezőből és egy kis gombból áll, melyek egymás mellett találhatók.

A DEX-ek általában további információkat közölnek a felette vagy alatta lévő sorban, de ezt másképp is be lehet állítani.

![Beviteli sor a részletekkel felette és alatta](./2.png)

## Variációk {#variations2}

Két UI-variációt láthatunk itt; az egyiknek nincsenek szegélyei, nyitott dijáznt adva, a másiknál pedig a beviteli sora keretezve van, így fókusz kerül erre az elemre.

![A fő űrlap két UI-variációja](./3.png)

Ez az alapvető struktúra **négy fő információt** mutat a dizájban: egyet-egyet minden sarokban. Ha csak egy felső/alsó sor van, akkor két dolgot lehet megmutatni.

A DeFi fejlődése mentén sokféle dolgot foglaltak bele ide.

## Kulcsinformációk megmutatása {#key-info-to-include}

- Egyenleg a tárcában
- Maximum gomb
- Fiat egyenérték
- Árhatás a „kapott” összeg esetén

A korai megoldásoknál a fiat egyenérték sokszor hiányzott. Ha bármilyen web3-projekt készül, ez a fiat egyenérték elengedhetetlen. A felhasználók még helyi valutákban gondolkodnak, ezért szükséges, hogy ezzel a mentális modellel össze lehessen kapcsolni az információkat.

A második mezőnél (ahol kiválasztja a tokent, amire váltani szeretne) az árhatást is meg lehet mutatni a fiat valuta összege mellett, kiszámolva a beadott és becsült visszakapott összeg különbségét. Ez egy igen hasznos részlet.

A százalékos gombok (pl. 25%, 50%, 75%) hasznos funkciók, de több helyet igényelnek, több műveletet kell végrehajtani és több mentális terhet jelentenek. Ugyanez a helyzet a százalékos csúszkával. Ezek az UI döntések az adott márkán és a felhasználóin múlnak.

További részleteket lehet megmutatni a fő űrlap alatt. Mivel ezek a profi felhasználóknak szólnak, érdemes:

- minimálisra csökkenteni ezek mennyiségét, vagy
- elrejteni egy kinyíló panelben

![A fő űrlap sarkaiban látható részletek](./4.png)

## További információk megmutatása {#extra-info-to-include}

- A tokenek ára
- Csúszás
- Minimum kapott összeg
- Várható eredmény
- Árhatás
- Gázköltség becslése
- Egyéb díjak
- Rendelés útvonala

Ezek a részletek természetesen opcionálisak is lehetnek.

A rendelés útvonala érdekes, de a legtöbb felhasználónak egyáltalán nem számít.

Néhány másik részlet ugyanazt mondja el, csak másképpen. Például a minimum kapott összeg és a csúszás ugyanannak két oldala. Ha a csúszás 1%-ra van állítva, akkor a minimum várható összeg = várt eredmény-1%. Néhány UI várható összeget, minimum összeget és csúszást mutat… Ami hasznos, de talán túl sok.

A legtöbb felhasználó általában az alapértelmezett csúszást használja.

Az árhatás gyakran látszik zárójelekben a fiat egyenérték mellett, a „valamire” mezőben. Ez egy kiváló UX részlet, de ha itt megmutatjuk, akkor kell-e még alatta is megmutatni? Majd újra az előnézetben?

Számos felhasználó (főleg ha kis összegeket vált) nem foglalkozik ezekkel a részletekkel; csak beírják a számot és megnyomják az átváltást.

![Néhány részlet ugyanazt mutatja](./5.png)

A részletek azon múlnak, hogy milyenek a felhasználók és milyen érzetet ad az alkalmazás.

Ha a részletek panelban megmutatjuk a csúszási toleranciát, akkor ott szerkeszhetővé is kell tenni. Ez egy jó példa a „gyorsításra”; egy elegáns UX trükk, amely anélkül gyorsítja meg a flowt a tapasztalt felhasználók számára, hogy az az alkalmazás általános használatát érintené.

![A csúszást állítani lehet a részletek panelben](./6.png)

Érdemes végiggondolni a részleteket, és nem csak egy oldalon, hanem a teljes menetben:
A fő űrlapon beírjuk a számokat → A részleteket megmutatjuk → Rákattintunk az előnézetre (ha van).
A részletek panel mindig látható, vagy rá kell kattintani ahhoz, hogy kinyíljon?
Az előnézettel megtörjük a használat folytonosságát? Ez ráveszi a felhasználót, hogy lassítson és átgondolja a szándékát, ami hasznos lehet. De szükséges-e nekik még egyszer minden részlet? Ezen a ponton mi a hasznos számukra?

## Tervezési opciók {#design-options}

Ahogy említettük, ennek nagy része a személyes stíluson múlik
Ki a felhasználó?
Mi a márka?
Profi interfészt akar minden részlettel, vagy inkább minimalista elrendezést?
Még ha a profi felhasználóknak is készül, és minden információ elérhető, érdemes megfontolni meg Alan Cooper szavait:

> Mindegy, milyen szép és menő az interfész, a kevesebb néha több.

### Struktúra {#structure}

- tokenek a bal vagy a jobb oldalon
- 2 vagy 3 sor
- részletek a gomb felett vagy alatt
- a részletek kinyithatók, minimalizáltak vagy nem jelennek meg

### Komponensstílus {#component-style}

- üres
- körvonalas
- kitöltött

Tisztán UX szempontból az UI stílusok kevesebbet számítanak, mint gondolnánk. A vizuális divatok jönnek-mennek, és a legtöbb preferencia szubjektív.

Ahhoz, hogy erre ráérezzen, és átlássa a különféle beállításokat, nézzen meg néhány példát és kísérletezzen maga.

Az alábbi Figma eszközkészlet tartalmaz üres, körvonalas és kitöltött komponenseket is.

Tekintse meg az alábbi példákat, hogyan lehet ezeket összeilleszteni különféle módokon:

![3 sor kitöltött stílussal](./7.png)

![3 sor körvonalas sílussal](./8.png)

![2 sor üres stílussal](./9.png)

![3 sor körvonalasan egy részletek panellel együtt](./10.png)

![3 sor az input sorral körvonalasan](./11.png)

![2 sor kitöltött stílussal](./12.png)

## De melyik oldalra kerüljön a token? {#but-which-side-should-the-token-go-on}

A lényeg, hogy valószínűleg nem okoz nagy különbséget a használatban. Néhány dologra érdemes figyelni, ami miatt egyik vagy másik lesz a jó megoldás.

Érdekes megfigyelni, ahogy a divat változik az idővel. Uniswap eredetileg balra tette a tokent, de aztán átkerült jobbra. Sushiswap is megváltoztatta ugyanígy egy frissítésnél. A legtöbb protokoll követte a példát.

A pénzügyi konvenciók szerint a valuta szimbóluma a szám elé kerül, például $50, €50, £50, de _szóban_ 50 dollár, 50 euró, 50 font hangzik el.

Az átlagos felhasználónak – főleg aki balról jobbra, fentről lefelé olvas – a token a jobb oldalon természetesebben hat.

![UI, ahol a token a bal oldalon van](./13.png)

Ha a token a bal oldalon és a számok a jobb oldalon vannak, akkor kellemesen szimmetrikus az elhelyezés, de van ennek hátránya is.

A közelség törvénye azt mondja, hogy a közeli dolgok összefüggőbbnek tűnnek. Eszerint a kapcsolódó tételeket közel akarjuk tenni egymáshoz. A tokenegyenleg közvetlenül kapcsolódik a tokenhez, és megváltozik, amikor új tokent választunk. Ezért a tokenegyenleg kerülhetne a token kiválasztógombja mellé. Ha a token alá tennénk, akkor megtörné a szimmetriát.

Végülis mindkét megoldásnak vannak előnyei és hátrányai, de a trend szerint a token a jobb oldalra kerül.

# Gombműködés {#button-behavior}

Ne legyen külön gomb a jóváhagyásra. Ne is kelljen ehhez külön kattintani. A felhasználó átváltást akar, ezért legyen a gombon átváltás felirat és az első lépés maga a jóváhagyás. Az ablak mutathatja a haladást lépésekkel, vagy egyszerűen egy „2-ből 1 tranzakció jóváhagyása” figyelmeztetéssel.

![UI, ahol külön gomb van a jóváhagyásra és az átváltásra](./14.png)

![UI, ahol egy jóváhagyás gomb van](./15.png)

## Gomb mint helyi segítség {#button-as-contextual-help}

A gomb figyelmeztetésként is működhet!

Ezt nem használják annyira web3-on kívül, de itt elterjedtté vált. Így kevesebb helyet foglal, és fenntartja a figyelmet.

Ha a fő tevékenység, azaz az átváltás nem érhető el egy hiba miatt, akkor annak okát ki lehet írni a gombra, például

- hálózatváltás
- tárca csatlakoztatása
- különféle hibák

A gombot **hozzá is lehet kapcsolni az elvégzendő cselekvéshez**. Például, ha a felhasználó rossz hálózaton van, a gombon megjelenik, hogy „váltás Ethereumra”, és ha rákattint, akkor átváltja a hálózatot. Ez jelentősen meggyorsítja a használatot.

![A fő akciók a fő CTA-ról indulnak](./16.png)

![Hibaüzenet a fő CTA-n](./17.png)

## Építse meg sajátját ezzel a figma fájllal {#build-your-own-with-this-figma-file}

Számos protokoll kemény munkájának köszönhető, hogy a DEX dizájnja sokat fejlődött. Tudjuk, hogy a felhasználónak milyen információra van szüksége, hogyan mutassuk azt meg, és hogyan legyen könnyed a használat menete.
Remélhetőleg ez a cikk segített áttekinteni az UX elveket.

Ha kísérletezne, akkor használja hozzá a Figma eszközkészletet. Egyszerű, mégis rugalmas ahhoz, hogy kedve szerint építse meg az alapstruktúrát.

[Figma eszközkészlet](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

A DeFi továbbfejlődik, és mindig van lehetőség az újításra.

Sok szerencsét!
