---
title: Osvědčené postupy pro návrh decentralizovaných burz (DEX)
description: Průvodce vysvětlující rozhodnutí ohledně UX/UI při swapování tokenů.
lang: cs
---

Od spuštění Uniswapu v roce 2018 byly na desítkách různých sítí spuštěny stovky decentralizovaných burz.
Mnoho z nich představilo nové prvky nebo přidalo vlastní vylepšení, ale rozhraní zůstalo v podstatě stejné.

Jedním z důvodů je [Jakobův zákon](https://lawsofux.com/jakobs-law/):

> Uživatelé tráví většinu času na jiných webech. To znamená, že preferují, aby váš web fungoval stejně jako všechny ostatní weby, které už znají.

Díky raným inovátorům, jako jsou Uniswap, Pancakeswap a Sushiswap, mají uživatelé decentralizovaných financí (DeFi) společnou představu o tom, jak má DEX vypadat.
Z tohoto důvodu se nyní objevuje něco jako „osvědčené postupy“. Vidíme, že se stále více rozhodnutí ohledně designu napříč weby standardizuje. Vývoj DEXů můžete vnímat jako obrovský příklad testování v praxi. Věci, které fungovaly, zůstaly, a ty, které ne, byly zahozeny. Stále je zde prostor pro osobitost, ale existují určité standardy, kterým by se měl DEX přizpůsobit.

Tento článek je shrnutím toho:
- co zahrnout
- jak to udělat co nejpoužitelnější
- jaké jsou hlavní způsoby přizpůsobení designu

Všechny ukázkové wireframy byly vytvořeny speciálně pro tento článek, ačkoli všechny vycházejí ze skutečných projektů.

Na konci článku je také přiložen Figma kit – neváhejte ho použít a urychlit tak tvorbu vlastních wireframů!

## Základní anatomie DEXu {#basic-anatomy-of-a-dex}

Uživatelské rozhraní (UI) obecně obsahuje tři prvky:
1. Hlavní formulář
2. Tlačítko
3. Panel podrobností

![Generic DEX UI, showing the three main elements](./1.png)


## Varianty {#variations}

Toto bude v tomto článku časté téma, ale existují různé způsoby, jak lze tyto prvky uspořádat. „Panel podrobností“ může být:
- Nad tlačítkem
- Pod tlačítkem
- Skrytý v rozbalovacím panelu
- A/nebo v modálním okně „náhledu“
  
Pozn.: Modální okno „náhledu“ je volitelné, ale pokud v hlavním UI zobrazujete jen velmi málo podrobností, stává se nezbytným.

## Struktura hlavního formuláře {#structure-of-the-main-form}

Toto je pole, kde si reálně vybíráte, který token chcete swapovat. Komponenta se skládá ze vstupního pole a malého tlačítka v jednom řádku.

DEXy obvykle zobrazují další podrobnosti v jednom řádku nahoře a v jednom řádku dole, ačkoli to lze nakonfigurovat i jinak.

![Input row, with a details row above and below](./2.png)

## Varianty {#variations2}

Zde jsou zobrazeny dvě varianty UI; jedna bez jakýchkoli ohraničení, což vytváří velmi otevřený design, a druhá, kde má vstupní řádek ohraničení, což na tento prvek strhává pozornost.

![Two UI variations of the main form](./3.png)

Tato základní struktura umožňuje v designu zobrazit **čtyři klíčové informace**: jednu v každém rohu. Pokud je k dispozici pouze jeden horní/spodní řádek, jsou zde pouze dvě místa.

Během vývoje DeFi sem byla zahrnuta spousta různých věcí.

## Klíčové informace k zahrnutí {#key-info-to-include}

- Zůstatek v peněžence
- Tlačítko Max
- Ekvivalent ve fiat měně
- Cenový dopad na „přijatou“ částku

V raných dobách DeFi ekvivalent ve fiat měně často chyběl. Pokud budujete jakýkoli projekt ve Web3, je nezbytné, aby byl ekvivalent ve fiat měně zobrazen. Uživatelé stále uvažují v lokálních měnách, takže aby to odpovídalo mentálním modelům reálného světa, mělo by to být zahrnuto.

Ve druhém poli (tom, kde vybíráte token, na který swapujete) můžete vedle částky ve fiat měně zahrnout také cenový dopad, a to výpočtem rozdílu mezi vstupní částkou a odhadovanou výstupní částkou. Je to docela užitečný detail, který se vyplatí přidat.

Procentuální tlačítka (např. 25 %, 50 %, 75 %) mohou být užitečnou funkcí, ale zabírají více místa, přidávají další výzvy k akci a zvyšují mentální zátěž. Totéž platí pro procentuální posuvníky. Některá z těchto rozhodnutí ohledně UI budou záviset na vaší značce a typu uživatelů.

Další podrobnosti lze zobrazit pod hlavním formulářem. Vzhledem k tomu, že tento typ informací je určen převážně pro pokročilé uživatele, dává smysl buď:
- zachovat je co nejminimalističtější, nebo;
- skrýt je v rozbalovacím panelu

![Details shown in the corners of that main form](./4.png)

## Další informace k zahrnutí {#extra-info-to-include}

- Cena tokenu
- Cenový skluz
- Minimum k přijetí
- Očekávaný výstup
- Cenový dopad
- Odhad nákladů na gas
- Ostatní poplatky
- Směrování objednávky

Dalo by se říci, že některé z těchto podrobností by mohly být volitelné.

Směrování objednávky je zajímavé, ale pro většinu uživatelů nehraje velkou roli.

Některé další podrobnosti jednoduše opakují totéž jinými slovy. Například „minimum k přijetí“ a „cenový skluz“ jsou dvě strany téže mince. Pokud máte cenový skluz nastavený na 1 %, pak minimum, které můžete očekávat, že obdržíte = očekávaný výstup - 1 %. Některá UI zobrazují očekávanou částku, minimální částku a cenový skluz... Což je užitečné, ale možná až zbytečně překombinované. 

Většina uživatelů stejně ponechá výchozí cenový skluz.

„Cenový dopad“ se často zobrazuje v závorkách vedle ekvivalentu ve fiat měně v poli „do“. Je to skvělý UX detail, ale pokud je zobrazen zde, je opravdu nutné ho znovu ukazovat níže? A pak znovu na obrazovce náhledu?

Mnoho uživatelů (zejména těch, kteří swapují malé částky) se o tyto podrobnosti nebude zajímat; jednoduše zadají číslo a kliknou na swap.

![Some details show the same thing](./5.png)

To, jaké přesně podrobnosti se zobrazí, bude záviset na vašem publiku a na tom, jaký dojem chcete, aby aplikace vyvolávala.

Pokud do panelu podrobností zahrnete toleranci cenového skluzu, měli byste také umožnit její úpravu přímo odtud. Je to dobrý příklad „akcelerátoru“; šikovného UX triku, který může urychlit postup zkušených uživatelů, aniž by to ovlivnilo celkovou použitelnost aplikace.

![Slippage can be controlled from the details panel](./6.png)

Je dobré pečlivě přemýšlet nejen o jedné konkrétní informaci na jedné obrazovce, ale o celém průchodu:
Zadávání čísel v hlavním formuláři → Procházení podrobností → Kliknutí na obrazovku náhledu (pokud máte obrazovku náhledu). 
Měl by být panel podrobností viditelný neustále, nebo na něj musí uživatel kliknout, aby se rozbalil?
Měli byste vytvářet tření přidáním obrazovky náhledu? To nutí uživatele zpomalit a zvážit svůj obchod, což může být užitečné. Ale chtějí znovu vidět všechny stejné informace? Co je pro ně v tuto chvíli nejužitečnější?

## Možnosti designu {#design-options}

Jak již bylo zmíněno, hodně z toho závisí na vašem osobním stylu.
Kdo je váš uživatel?
Jaká je vaše značka?
Chcete „profi“ rozhraní zobrazující každý detail, nebo chcete být minimalističtí?
I když cílíte na pokročilé uživatele, kteří chtějí všechny možné informace, měli byste mít na paměti moudrá slova Alana Coopera:

> Bez ohledu na to, jak krásné, bez ohledu na to, jak skvělé je vaše rozhraní, bylo by lepší, kdyby ho bylo méně.

### Struktura {#structure}

- tokeny vlevo, nebo tokeny vpravo
- 2 řádky nebo 3
- podrobnosti nad nebo pod tlačítkem
- podrobnosti rozbalené, minimalizované nebo nezobrazené

### Styl komponent {#component-style}

- prázdné
- ohraničené
- vyplněné

Z čistě UX hlediska záleží na stylu UI méně, než si myslíte. Vizuální trendy přicházejí a odcházejí v cyklech a velká část preferencí je subjektivní.

Nejjednodušší způsob, jak pro to získat cit – a zamyslet se nad různými konfiguracemi – je podívat se na několik příkladů a pak sami trochu experimentovat.

Přiložený Figma kit obsahuje prázdné, ohraničené a vyplněné komponenty.

Podívejte se na níže uvedené příklady, abyste viděli různé způsoby, jak to všechno poskládat dohromady:

![3 rows in a filled style](./7.png)

![3 rows in a outlined style](./8.png)

![2 rows in an empty style](./9.png)

![3 rows in an outlined style, with a details panel](./10.png)

![3 rows with the input row in an outlined style](./11.png)

![2 rows in a filled style](./12.png)

## Ale na kterou stranu by měl token přijít? {#but-which-side-should-the-token-go-on}

Základem je, že to pravděpodobně nemá velký vliv na použitelnost. Je však třeba mít na paměti několik věcí, které by vás mohly přiklonit na jednu či druhou stranu.

Bylo docela zajímavé sledovat, jak se móda postupem času mění. Uniswap měl zpočátku token vlevo, ale od té doby ho přesunul doprava. Sushiswap tuto změnu provedl také během aktualizace designu. Většina protokolů, i když ne všechny, tento trend následovala.

Finanční konvence tradičně umisťuje symbol měny před číslo, např. $50, €50, £50, ale *říkáme* 50 dolarů, 50 eur, 50 liber.

Běžnému uživateli – zejména někomu, kdo čte zleva doprava a shora dolů – pravděpodobně připadá token vpravo přirozenější.

![A UI with tokens on the left](./13.png)

Umístění tokenu vlevo a všech čísel vpravo vypadá příjemně symetricky, což je plus, ale toto rozložení má i další nevýhodu.

Zákon blízkosti říká, že položky, které jsou blízko sebe, jsou vnímány jako související. V souladu s tím chceme umístit související položky vedle sebe. Zůstatek tokenu přímo souvisí se samotným tokenem a změní se vždy, když je vybrán nový token. Proto dává o něco větší smysl, aby byl zůstatek tokenu vedle tlačítka pro výběr tokenu. Mohl by být přesunut pod token, ale to narušuje symetrii rozložení.

Nakonec existují plusy a minusy pro obě možnosti, ale je zajímavé, jak se zdá, že trend směřuje k tokenu vpravo.

## Chování tlačítka {#button-behavior}

Nemějte samostatné tlačítko pro schválení. Také nemějte samostatné kliknutí pro schválení. Uživatel chce provést swap, takže na tlačítku jednoduše uveďte „swap“ a zahajte schvalování jako první krok. Modální okno může zobrazovat průběh pomocí krokování nebo jednoduchého upozornění „tx 1 ze 2 – schvalování“.

![A UI with separate buttons for approve and swap](./14.png)

![A UI with one button that says approve](./15.png)

### Tlačítko jako kontextová nápověda {#button-as-contextual-help}

Tlačítko může plnit dvojí funkci a sloužit i jako upozornění!

Mimo Web3 je to vlastně poměrně neobvyklý návrhový vzor, ale v jeho rámci se stal standardem. Je to dobrá inovace, protože šetří místo a udržuje pozornost.

Pokud je hlavní akce – SWAP – nedostupná kvůli chybě, důvod lze vysvětlit pomocí tlačítka, např.:

- přepnout síť
- připojit peněženku
- různé chyby

Tlačítko lze také **namapovat na akci**, kterou je třeba provést. Pokud například uživatel nemůže swapovat, protože je ve špatné síti, tlačítko by mělo říkat „přepnout na Ethereum“, a když na něj uživatel klikne, mělo by přepnout síť na Ethereum. To výrazně urychluje postup uživatele.

![Key actions being initiated from the main CTA](./16.png)

![Error message shown within the main CTA](./17.png)

## Vytvořte si vlastní pomocí tohoto souboru Figma {#build-your-own-with-this-figma-file}

Díky tvrdé práci mnoha protokolů se design DEXů hodně zlepšil. Víme, jaké informace uživatel potřebuje, jak bychom je měli zobrazovat a jak zajistit, aby byl průchod co nejplynulejší.
Doufejme, že tento článek poskytuje solidní přehled o principech UX. 

Pokud chcete experimentovat, neváhejte použít Figma wireframe kit. Je udržován co nejjednodušší, ale má dostatečnou flexibilitu pro sestavení základní struktury různými způsoby.

[Figma wireframe kit](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi se bude i nadále vyvíjet a vždy je prostor pro zlepšení. 

Hodně štěstí!