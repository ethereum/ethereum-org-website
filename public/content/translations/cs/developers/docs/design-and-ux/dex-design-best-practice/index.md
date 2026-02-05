---
title: Osvědčené postupy návrhu decentralizovaných burz (DEX)
description: Průvodce vysvětlující rozhodnutí o návrhu UX/UI pro směnu tokenů.
lang: cs
---

Od spuštění Uniswapu v roce 2018 byly spuštěny stovky decentralizovaných burz na desítkách různých řetězců.
Mnohé z nich zavedly nové prvky nebo přidaly vlastní vylepšení, ale rozhraní zůstalo obecně stejné.

Jedním z důvodů je [Jakobův zákon](https://lawsofux.com/jakobs-law/):

> Uživatelé tráví většinu svého času na jiných stránkách. To znamená, že uživatelé dávají přednost tomu, aby vaše stránky fungovaly stejně jako všechny ostatní stránky, které již znají.

Díky prvním inovátorům, jako jsou Uniswap, Pancakeswap a Sushiswap, mají uživatelé DeFi kolektivní představu o tom, jak DEX vypadá.
Z tohoto důvodu se nyní objevuje něco jako „osvědčený postup“. Stále častěji vidíme, že se rozhodnutí o designu napříč weby standardizují. Vývoj DEX můžete vnímat jako obrovský příklad testování v reálném čase. Věci, které fungovaly, zůstaly, věci, které ne, byly zahozeny. Stále je zde prostor pro osobitost, ale existují určité standardy, kterým by měla DEX vyhovovat.

Tento článek je shrnutím:

- co zahrnout
- jak to udělat co nejpoužitelnější
- hlavní způsoby přizpůsobení designu

Všechny příklady drátěných modelů (wireframes) byly vytvořeny speciálně pro tento článek, ačkoli všechny vycházejí ze skutečných projektů.

Sada pro Figmu je také zahrnuta na konci – klidně ji použijte a zrychlete si tak tvorbu vlastních drátěných modelů!

## Základní anatomie DEX {#basic-anatomy-of-a-dex}

Uživatelské rozhraní (UI) obecně obsahuje tři prvky:

1. Hlavní formulář
2. Tlačítko
3. Panel s podrobnostmi

![Obecné UI burzy DEX zobrazující tři hlavní prvky](./1.png)

## Varianty {#variations}

To bude v tomto článku běžné téma, ale existují různé způsoby, jak mohou být tyto prvky uspořádány. „Panel podrobností“ může být:

- Nad tlačítkem
- Pod tlačítkem
- Skrytý v rozbalovacím panelu
- A/nebo v modálním okně „náhledu“

Pozn. Modální okno „náhledu“ je volitelné, ale pokud v hlavním uživatelském rozhraní zobrazujete jen velmi málo podrobností, stává se nezbytným.

## Struktura hlavního formuláře {#structure-of-the-main-form}

Toto je pole, kde si skutečně vybíráte, který token chcete směnit. Komponenta se skládá ze vstupního pole a malého tlačítka v jednom řádku.

Burzy DEX obvykle zobrazují další podrobnosti v jednom řádku nad a v jednom řádku pod, i když to lze nakonfigurovat i jinak.

![Vstupní řádek s řádkem podrobností nad a pod](./2.png)

## Varianty {#variations2}

Jsou zde uvedeny dvě varianty uživatelského rozhraní; jedna bez ohraničení, která vytváří velmi otevřený design, a druhá, kde má vstupní řádek ohraničení, což vytváří zaměření na tento prvek.

![Dvě varianty UI hlavního formuláře](./3.png)

Tato základní struktura umožňuje v návrhu zobrazit **čtyři klíčové informace**: jednu v každém rohu. Pokud existuje pouze jeden horní/dolní řádek, pak jsou k dispozici pouze dvě místa.

Během vývoje DeFi se sem zařadilo mnoho různých věcí.

## Klíčové informace, které je třeba zahrnout {#key-info-to-include}

- Zůstatek v peněžence
- Tlačítko Max
- Fiatový ekvivalent
- Dopad na cenu u „obdržené“ částky

V počátcích DeFi fiatový ekvivalent často chyběl. Pokud vytváříte jakýkoli projekt Web3, je nezbytné, aby byl zobrazen fiatový ekvivalent. Uživatelé stále přemýšlejí v místních měnách, takže aby to odpovídalo jejich mentálním modelům z reálného světa, mělo by to být zahrnuto.

Ve druhém poli (v tom, kde si vybíráte token, na který směňujete) můžete také uvést dopad na cenu vedle částky ve fiat měně, a to výpočtem rozdílu mezi vstupní částkou a odhadovanou výstupní částkou. Je to poměrně užitečný detail, který je dobré zahrnout.

Procentuální tlačítka (např. 25 %, 50 %, 75 %) mohou být užitečnou funkcí, ale zabírají více místa, přidávají více výzev k akci a zvyšují mentální zátěž. To samé platí pro procentuální posuvníky. Některá z těchto rozhodnutí ohledně UI budou záviset na vaší značce a typu uživatele.

Další podrobnosti mohou být zobrazeny pod hlavním formulářem. Protože je tento typ informací určen především pro profesionální uživatele, dává smysl buď:

- udržovat ho co nejminimálnější, nebo;
- skrýt ho do rozbalovacího panelu

![Podrobnosti zobrazené v rozích hlavního formuláře](./4.png)

## Další informace k zahrnutí {#extra-info-to-include}

- Cenu tokenu
- Skluz
- Minimální obdržená částka
- Očekávaný výstup
- Dopad na cenu
- Odhad nákladů na gas
- Další poplatky
- Směrování příkazu

Některé z těchto údajů by mohly být volitelné.

Směrování příkazů je zajímavé, ale pro většinu uživatelů nepředstavuje velký rozdíl.

Některé další podrobnosti pouze uvádějí totéž různými způsoby. Například „minimální obdržená částka“ a „skluz“ jsou dvě strany téže mince. Pokud máte skluz nastavený na 1 %, pak minimální částka, kterou můžete očekávat, se rovná očekávanému výstupu - 1 %. Některá UI zobrazují očekávanou částku, minimální částku a skluz… Což je užitečné, ale možná až přehnané.

Většina uživatelů stejně ponechá výchozí nastavení skluzu.

„Dopad na cenu“ se často zobrazuje v závorkách vedle fiatového ekvivalentu v poli „Do“. Je to skvělý UX detail, který lze přidat, ale pokud je zobrazen zde, je opravdu nutné ho znovu zobrazovat níže? A pak znovu na obrazovce náhledu?

Mnoho uživatelů (zejména těch, kteří směňují malé částky) se o tyto podrobnosti nebude starat; jednoduše zadají číslo a stisknou tlačítko pro směnu.

![Některé podrobnosti ukazují stejnou věc](./5.png)

Jaké podrobnosti přesně zobrazíte, bude záviset na vašem publiku a na tom, jaký dojem má aplikace budit.

Pokud do panelu s podrobnostmi zahrnete toleranci skluzu, měli byste ji také umožnit upravovat přímo odtud. Toto je dobrý příklad „urychlovače“; šikovný trik v UX, který může zrychlit postupy zkušených uživatelů, aniž by to ovlivnilo obecnou použitelnost aplikace.

![Skluz lze ovládat z panelu podrobností](./6.png)

Je dobré se pečlivě zamyslet nejen nad jednou konkrétní informací na jedné obrazovce, ale nad celým postupem: zadání čísel v hlavním formuláři → kontrola podrobností → kliknutí na obrazovku náhledu (pokud ji máte).
Měl by být panel s podrobnostmi viditelný po celou dobu, nebo musí uživatel kliknout, aby ho rozbalil?
Měli byste vytvářet tření přidáním obrazovky náhledu? To donutí uživatele zpomalit a zvážit svůj obchod, což může být užitečné. Ale chtějí vidět všechny stejné informace znovu? Co je pro ně v tuto chvíli nejužitečnější?

## Možnosti návrhu {#design-options}

Jak již bylo zmíněno, mnoho z toho závisí na vašem osobním stylu
Kdo je váš uživatel?
Jaká je vaše značka?
Chcete „profesionální“ rozhraní, které zobrazuje každý detail, nebo chcete být minimalističtí?
I když se zaměřujete na profesionální uživatele, kteří chtějí všechny možné informace, měli byste si pamatovat moudrá slova Alana Coopera:

> Bez ohledu na to, jak krásné a skvělé je vaše rozhraní, bylo by lepší, kdyby ho bylo méně.

### Struktura {#structure}

- tokeny vlevo, nebo tokeny vpravo
- 2 nebo 3 řádky
- podrobnosti nad nebo pod tlačítkem
- podrobnosti rozbalené, sbalené nebo nezobrazené

### Styl komponenty {#component-style}

- prázdný
- s obrysem
- vyplněný

Z čistě UX hlediska na stylu UI záleží méně, než si myslíte. Vizuální trendy přicházejí a odcházejí v cyklech a mnoho preferencí je subjektivních.

Nejjednodušší způsob, jak to pochopit – a přemýšlet o různých konfiguracích – je podívat se na několik příkladů a pak si sami zaexperimentovat.

Přiložená sada pro Figmu obsahuje prázdné, obrysové a vyplněné komponenty.

Podívejte se na níže uvedené příklady, abyste viděli různé způsoby, jak to všechno můžete složit dohromady:

![3 řádky ve vyplněném stylu](./7.png)

![3 řádky ve stylu s obrysem](./8.png)

![2 řádky v prázdném stylu](./9.png)

![3 řádky ve stylu s obrysem, s panelem podrobností](./10.png)

![3 řádky se vstupním řádkem ve stylu s obrysem](./11.png)

![2 řádky ve vyplněném stylu](./12.png)

## Ale na kterou stranu by měl token jít? {#but-which-side-should-the-token-go-on}

Podstatné je, že to na použitelnost pravděpodobně nemá velký vliv. Existuje však několik věcí, které je třeba mít na paměti a které vás mohou přiklonit na jednu nebo druhou stranu.

Je mírně zajímavé sledovat, jak se móda s časem mění. Uniswap měl původně token vlevo, ale od té doby ho přesunul doprava. Sushiswap také provedl tuto změnu během vylepšení designu. Většina, ale ne všechny protokoly následovaly.

Finanční konvence tradičně umisťuje symbol měny před číslo, např. $50, €50, £50, ale my _říkáme_ 50 dolarů, 50 eur, 50 liber.

Pro běžného uživatele – zejména pro toho, kdo čte zleva doprava, shora dolů – je token vpravo pravděpodobně přirozenější.

![UI s tokeny vlevo](./13.png)

Umístění tokenu vlevo a všech čísel vpravo vypadá příjemně symetricky, což je plus, ale toto uspořádání má i další nevýhodu.

Zákon blízkosti říká, že prvky, které jsou blízko u sebe, jsou vnímány jako související. Proto chceme umisťovat související položky vedle sebe. Zůstatek tokenu přímo souvisí se samotným tokenem a změní se vždy, když je vybrán nový token. Proto dává o něco větší smysl, aby byl zůstatek tokenu vedle tlačítka pro výběr tokenu. Mohl by být přesunut pod token, ale to narušuje symetrii rozvržení.

Nakonec mají obě možnosti svá plusy a mínusy, ale je zajímavé, jak se zdá, že trend směřuje k tokenu napravo.

## Chování tlačítka {#button-behavior}

Nemějte samostatné tlačítko pro Schválit. Také nemějte samostatné kliknutí pro Schválit. Uživatel chce směnit, takže na tlačítku stačí uvést „Směnit“ a jako první krok zahájit schválení. Modální okno může zobrazovat pokrok pomocí krokování nebo jednoduchého oznámení „transakce 1 ze 2 – schvalování“.

![UI se samostatnými tlačítky pro schválení a směnu](./14.png)

![UI s jedním tlačítkem s nápisem „Schválit“](./15.png)

### Tlačítko jako kontextová nápověda {#button-as-contextual-help}

Tlačítko může sloužit dvojímu účelu jako upozornění!

Je to vlastně poměrně neobvyklý designový vzor mimo Web3, ale v něm se stal standardem. Je to dobrá inovace, protože šetří místo a udržuje pozornost.

Pokud je hlavní akce – SMĚNIT – nedostupná z důvodu chyby, důvod lze vysvětlit pomocí tlačítka, např.:

- přepnout síť
- připojit peněženku
- různé chyby

Tlačítko může být také **přiřazeno k akci**, která má být provedena. Například pokud uživatel nemůže provést směnu, protože je na špatné síti, na tlačítku by mělo být uvedeno „Přepnout na Ethereum“ a po kliknutí na tlačítko by se síť měla přepnout na Ethereum. To výrazně zrychluje postup uživatele.

![Klíčové akce iniciované z hlavní výzvy k akci (CTA)](./16.png)

![Chybová zpráva zobrazená v hlavní výzvě k akci (CTA)](./17.png)

## Vytvořte si vlastní pomocí tohoto souboru Figma {#build-your-own-with-this-figma-file}

Díky tvrdé práci několika protokolů se design DEX hodně zlepšil. Víme, jaké informace uživatel potřebuje, jak bychom je měli zobrazit a jak zajistit, aby byl postup co nejplynulejší.
Doufejme, že tento článek poskytuje solidní přehled principů UX.

Pokud chcete experimentovat, neváhejte použít sadu drátěných modelů pro Figma. Je co nejjednodušší, ale má dostatečnou flexibilitu k tomu, aby bylo možné základní strukturu sestavit různými způsoby.

[Sada drátěných modelů pro Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi se bude i nadále vyvíjet a vždy je co zlepšovat.

Hodně štěstí!
