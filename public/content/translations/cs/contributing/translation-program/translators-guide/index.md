---
title: Průvodce stylem překladů pro ethereum.org
metaTitle: Průvodce pro překladatele
lang: cs
description: Pokyny a tipy pro překladatele ethereum.org
---

Průvodce stylem překladů pro ethereum.org obsahuje některé z nejdůležitějších pokynů, instrukcí a tipů pro překladatele, které nám pomáhají s lokalizací webu.

Tento dokument slouží jako obecný průvodce a není specifický pro žádný konkrétní jazyk.

Pokud máte jakékoli dotazy, návrhy nebo zpětnou vazbu, neváhejte se na nás obrátit na adrese translations@ethereum.org, pošlete zprávu uživateli @ethdotorg na platformě Crowdin nebo [se připojte na náš Discord](https://discord.gg/ethereum-org), kde nám můžete napsat do kanálu #translations nebo kontaktovat kteréhokoli člena týmu.

## Používání platformy Crowdin {#using-crowdin}

Základní pokyny, jak se připojit k projektu na platformě Crowdin a jak používat její online editor, najdete na [stránce Překladatelského programu](/contributing/translation-program/#how-to-translate).

Pokud byste se chtěli o platformě Crowdin a používání některých jejích pokročilých funkcí dozvědět více, [znalostní báze Crowdin](https://support.crowdin.com/online-editor/) obsahuje spoustu podrobných průvodců a přehledů všech jejích funkcí.

## Zachycení podstaty zprávy {#capturing-the-essence}

Při překládání obsahu ethereum.org se vyhněte doslovným překladům.

Je důležité, aby překlady zachytily podstatu zprávy. To může znamenat přeformulování určitých frází nebo použití popisných překladů namísto překládání obsahu slovo od slova.

Různé jazyky mají různá gramatická pravidla, zvyklosti a slovosled. Při překládání mějte na paměti, jak jsou věty strukturovány v cílových jazycích, a vyhněte se doslovnému překladu anglického originálu, protože to může vést ke špatné stavbě vět a horší čitelnosti.

Místo překládání zdrojového textu slovo od slova doporučujeme přečíst si celou větu a přizpůsobit ji tak, aby odpovídala zvyklostem cílového jazyka.

## Formální vs. neformální tón {#formal-vs-informal}

Používáme formální oslovení (vykání), které je vždy zdvořilé a vhodné pro všechny návštěvníky.

Používání formálního oslovení nám umožňuje vyhnout se tomu, abychom zněli neoficiálně nebo urážlivě, a funguje bez ohledu na věk a pohlaví návštěvníka.

Většina indoevropských a afroasijských jazyků používá rodově specifická osobní zájmena ve druhé osobě, která rozlišují mezi mužem a ženou. Při oslovování uživatele nebo používání přivlastňovacích zájmen se můžeme vyhnout předpokladům o pohlaví návštěvníka, protože formální oslovení je obecně použitelné a konzistentní bez ohledu na to, jak se identifikuje.

## Jednoduchá a srozumitelná slovní zásoba a význam {#simple-vocabulary}

Naším cílem je, aby byl obsah na webu srozumitelný co největšímu počtu lidí.

Ve většině případů toho lze snadno dosáhnout používáním krátkých a jednoduchých slov, která jsou snadno srozumitelná. Pokud pro určité slovo existuje ve vašem jazyce více možných překladů se stejným významem, nejlepší volbou je nejčastěji to nejkratší slovo, které jasně odráží daný význam.

## Systém písma {#writing-system}

Ethereum.org je k dispozici v řadě jazyků, které používají alternativní systémy písma (nebo skripty) k latince.

Veškerý obsah by měl být přeložen pomocí správného systému písma pro váš jazyk a neměl by obsahovat žádná slova napsaná latinkou.

Při překládání obsahu byste měli zajistit, aby byly překlady konzistentní a neobsahovaly žádné znaky latinky.

Častou mylnou představou je, že by se Ethereum mělo vždy psát latinkou. To je většinou nesprávné, používejte prosím pravopis slova Ethereum, který je přirozený pro váš jazyk (např. 以太坊 v čínštině, إيثيريوم v arabštině atd.).

**Výše uvedené neplatí pro jazyky, kde by se vlastní jména zpravidla neměla překládat.**

## Překlad metadat stránky {#translating-metadata}

Některé stránky obsahují metadata, jako jsou 'title', 'lang', 'description', 'sidebar' atd.

Obsah, který by překladatelé nikdy neměli překládat, při nahrávání nových stránek na Crowdin skrýváme, což znamená, že všechna metadata viditelná pro překladatele na platformě Crowdin by měla být přeložena.

Buďte prosím obzvláště opatrní při překladu jakýchkoli řetězců, kde je zdrojový text 'en'. To představuje jazyk, ve kterém je stránka k dispozici, a měl by být přeložen na [kód jazyka ISO pro váš jazyk](https://www.andiamo.co.uk/resources/iso-language-codes/). Tyto řetězce by měly být vždy překládány pomocí znaků latinky, nikoli pomocí písma, které je přirozené pro cílový jazyk.

Pokud si nejste jisti, jaký kód jazyka použít, můžete zkontrolovat překladovou paměť na platformě Crowdin nebo najít kód jazyka pro váš jazyk v URL adrese stránky v online editoru Crowdin.

Několik příkladů kódů jazyků pro nejrozšířenější jazyky:

- Arabština - ar
- Zjednodušená čínština - zh
- Francouzština - fr
- Hindština - hi
- Španělština - es

## Názvy externích článků {#external-articles}

Některé řetězce obsahují názvy externích článků. Většina našich stránek s dokumentací pro vývojáře obsahuje odkazy na externí články k dalšímu čtení. Řetězce obsahující názvy článků je třeba přeložit bez ohledu na jazyk článku, aby se zajistil konzistentnější uživatelský zážitek pro návštěvníky, kteří si stránku prohlížejí ve svém jazyce.

Níže najdete několik příkladů toho, jak tyto řetězce vypadají pro překladatele a jak je identifikovat (odkazy na články najdete většinou ve spodní části těchto stránek v sekci „Další čtení“):

![Article titles in sidebar.png](./article-titles-in-sidebar.png)
![Article titles in editor.png](./article-titles-in-editor.png)

## Upozornění platformy Crowdin {#crowdin-warnings}

Crowdin má vestavěnou funkci, která varuje překladatele, když se chystají udělat chybu. Crowdin vás na to automaticky upozorní před uložením překladu, pokud zapomenete zahrnout značku ze zdroje, přeložíte prvky, které by se překládat neměly, přidáte několik po sobě jdoucích mezer, zapomenete na interpunkci na konci věty atd.
Pokud uvidíte takové varování, vraťte se prosím a navrhovaný překlad si znovu zkontrolujte.

**Tato varování nikdy neignorujte, protože obvykle znamenají, že je něco špatně nebo že v překladu chybí klíčová část zdrojového textu.**

Příklad varování platformy Crowdin, když do překladu zapomenete přidat značku:
![Example of a Crowdin warning](./crowdin-warning-example.png)

## Práce se značkami a úryvky kódu {#dealing-with-tags}

Velká část zdrojového obsahu obsahuje značky a proměnné, které jsou v editoru Crowdin zvýrazněny žlutě. Ty plní různé funkce a mělo by se k nim přistupovat správně.

**Nastavení platformy Crowdin**

Pro snazší správu značek a jejich kopírování přímo ze zdroje doporučujeme změnit nastavení v editoru Crowdin.

1. Otevřete nastavení
   ![How to open settings in the editor](./editor-settings.png)

2. Přejděte dolů do sekce „Zobrazování HTML značek“ (HTML tags displaying)

3. Vyberte „Skrýt“ (Hide)
   ![Please select 'Hide'](./hide-tags.png)

4. Klikněte na „Uložit“ (Save)

Výběrem této možnosti se již nebude zobrazovat celý text značky a bude nahrazen číslem.
Při překládání se kliknutím na tuto značku automaticky zkopíruje přesná značka do pole pro překlad.

**Odkazy**

Můžete si všimnout celých odkazů na stránky na ethereum.org nebo jiných webech.

Ty by měly být totožné se zdrojem a neměly by se měnit ani překládat. Pokud odkaz přeložíte nebo jej jakkoli změníte, byť jen odstraněním jeho části, jako je lomítko (/), povede to k nefunkčním a nepoužitelným odkazům.

Nejlepší způsob, jak zacházet s odkazy, je zkopírovat je přímo ze zdroje, a to buď kliknutím na ně, nebo pomocí tlačítka „Kopírovat zdroj“ (Copy Source) (`Alt+C`).

![Example of link.png](./example-of-link.png)

Odkazy se ve zdrojovém textu objevují také ve formě značek (tj. `<0>` `</0>`). Pokud na značku najedete myší, editor zobrazí její celý obsah – někdy tyto značky představují odkazy.

Je velmi důležité kopírovat odkazy ze zdroje a neměnit jejich pořadí.

Pokud se změní pořadí značek, odkaz, který představují, bude nefunkční.

![Example of links inside tags.png](./example-of-links-inside-tags.png)

**Značky a proměnné**

Zdrojový text obsahuje mnoho různých typů značek, které by měly být vždy zkopírovány ze zdroje a nikdy by se neměly měnit. Podobně jako výše by i pořadí těchto značek v překladu mělo zůstat stejné jako ve zdroji.

Značky vždy obsahují otevírací a uzavírací značku. Ve většině případů by měl být text mezi otevírací a uzavírací značkou přeložen.

Příklad: `<strong x-id="1">`Decentralizovaný`</strong>`

`<strong x-id="1">` - _Otevírací značka, která ztuční text_

Decentralizovaný - _Přeložitelný text_

`</strong>` - _Uzavírací značka_

![Example of 'strong' tags.png](./example-of-strong-tags.png)

K úryvkům kódu by se mělo přistupovat trochu jinak než k ostatním značkám, protože obsahují kód, který by se neměl překládat.

Příklad: `<code>`nonce`</code>`

`<code>` - _Otevírací značka, která obsahuje úryvek kódu_

nonce - _Nepřeložitelný text_

`</code>` - _Uzavírací značka_

![Example of code snippets.png](./example-of-code-snippets.png)

Zdrojový text obsahuje také zkrácené značky, které obsahují pouze čísla, což znamená, že jejich funkce není na první pohled zřejmá. Najetím myší na tyto značky přesně uvidíte, jakou funkci plní.

V níže uvedeném příkladu můžete vidět, že najetí myší na značku `<0>` ukazuje, že představuje `<code>` a obsahuje úryvek kódu, proto by se obsah uvnitř těchto značek neměl překládat.

![Example of ambiguous tags.png](./example-of-ambiguous-tags.png)

## Krátké vs. plné tvary/zkratky {#short-vs-full-forms}

Na webu se používá spousta zkratek, např. dapps, NFT, DAO, DeFi atd. Tyto zkratky se běžně používají v angličtině a většina návštěvníků webu je zná.

Vzhledem k tomu, že v jiných jazycích obvykle nemají zavedené překlady, nejlepším způsobem, jak k těmto a podobným termínům přistupovat, je poskytnout popisný překlad plného tvaru a do závorek přidat anglickou zkratku.

Tyto zkratky nepřekládejte, protože většina lidí by je neznala a lokalizované verze by většině návštěvníků nedávaly velký smysl.

Příklad, jak přeložit dapps:

- Decentralizované aplikace (dapps) → _Přeložený plný tvar (anglická zkratka v závorce)_

## Termíny bez zavedených překladů {#terms-without-established-translations}

Některé termíny nemusí mít v jiných jazycích zavedené překlady a jsou široce známé pod původním anglickým termínem. Mezi takové termíny patří většinou novější koncepty, jako je důkaz prací (PoW), důkaz podílem (PoS), Beacon chain, staking atd.

Ačkoli překlad těchto termínů může znít nepřirozeně, protože anglická verze se běžně používá i v jiných jazycích, důrazně se doporučuje je překládat.

Při jejich překladu se nebojte být kreativní, použijte popisné překlady nebo je jednoduše přeložte doslovně.

**Důvodem, proč by se většina termínů měla překládat, místo aby se některé ponechaly v angličtině, je skutečnost, že tato nová terminologie se v budoucnu více rozšíří, jakmile začne Ethereum a související technologie používat více lidí. Pokud chceme do tohoto prostoru přivést více lidí z celého světa, musíme poskytnout srozumitelnou terminologii v co nejvíce jazycích, i když si ji budeme muset vytvořit sami.**

## Tlačítka a výzvy k akci (CTA) {#buttons-and-ctas}

Web obsahuje řadu tlačítek, která by se měla překládat jinak než ostatní obsah.

Text tlačítka lze identifikovat zobrazením kontextových snímků obrazovky, které jsou spojeny s většinou řetězců, nebo kontrolou kontextu v editoru, který obsahuje slovo „button“.

Překlady tlačítek by měly být co nejkratší, aby se předešlo problémům s formátováním. Překlady tlačítek by navíc měly být v rozkazovacím způsobu, tj. měly by představovat příkaz nebo požadavek.

![How to find a button.png](./how-to-find-a-button.png)

## Překlad s ohledem na inkluzivitu {#translating-for-inclusivity}

Návštěvníci ethereum.org pocházejí z celého světa a z různých prostředí. Jazyk na webu by proto měl být neutrální, vstřícný ke všem a neměl by nikoho vylučovat.

Důležitým aspektem je genderová neutralita. Toho lze snadno dosáhnout používáním formálního oslovení (vykání) a vyhýbáním se jakýmkoli rodově specifickým slovům v překladech.

Další formou inkluzivity je snaha překládat pro globální publikum, nikoli specificky pro jakoukoli zemi, rasu nebo region.

Jazyk by měl být nakonec vhodný pro všechny cílové skupiny a věkové kategorie.

## Překlady specifické pro daný jazyk {#language-specific-translations}

Při překládání je důležité dodržovat gramatická pravidla, zvyklosti a formátování používané ve vašem jazyce, na rozdíl od kopírování ze zdroje. Zdrojový text se řídí anglickými gramatickými pravidly a zvyklostmi, což pro mnoho jiných jazyků neplatí.

Měli byste znát pravidla pro svůj jazyk a podle toho překládat. Pokud potřebujete pomoc, obraťte se na nás a my vám pomůžeme najít nějaké zdroje o tom, jak by se tyto prvky měly ve vašem jazyce používat.

Několik příkladů toho, na co si dát obzvlášť pozor:

### Interpunkce, formátování {#punctuation-and-formatting}

**Psaní velkých písmen**

- V psaní velkých písmen jsou v různých jazycích obrovské rozdíly.
- V angličtině je běžné psát velká písmena u všech slov v názvech a jménech, u měsíců a dnů, názvů jazyků, svátků atd. V mnoha jiných jazycích je to gramaticky nesprávné, protože mají jiná pravidla pro psaní velkých písmen.
- Některé jazyky mají také pravidla o psaní velkých písmen u osobních zájmen, podstatných jmen a určitých přídavných jmen, která se v angličtině s velkým písmenem nepíší.

**Mezery**

- Pravidla pravopisu definují používání mezer pro každý jazyk. Protože se mezery používají všude, patří tato pravidla k těm nejodlišnějším a mezery jsou jedním z nejčastěji chybně překládaných prvků.
- Některé běžné rozdíly v mezerách mezi angličtinou a jinými jazyky:
  - Mezera před měrnými jednotkami a měnami (např. USD, EUR, kB, MB)
  - Mezera před značkami stupňů (např. °C, ℉)
  - Mezera před některými interpunkčními znaménky, zejména před výpustkou (…)
  - Mezera před a za lomítky (/)

**Seznamy**

- Každý jazyk má rozmanitý a složitý soubor pravidel pro psaní seznamů. Ta se mohou od angličtiny výrazně lišit.
- V některých jazycích musí první slovo každého nového řádku začínat velkým písmenem, zatímco v jiných by nové řádky měly začínat malými písmeny. Mnoho jazyků má také různá pravidla pro psaní velkých písmen v seznamech v závislosti na délce každého řádku.
- Totéž platí pro interpunkci položek na řádku. Interpunkce na konci seznamů může být tečka (**.**), čárka (**,**) nebo středník (**;**) v závislosti na jazyce.

**Uvozovky**

- Jazyky používají mnoho různých uvozovek. Pouhé zkopírování anglických uvozovek ze zdroje je často nesprávné.
- Mezi nejběžnější typy uvozovek patří:
  - „příklad textu“
  - ‚příklad textu’
  - »příklad textu«
  - “příklad textu”
  - ‘příklad textu’
  - «příklad textu»

**Spojovníky a pomlčky**

- V angličtině se spojovník (-) používá ke spojení slov nebo různých částí slova, zatímco pomlčka (–) se používá k označení rozsahu nebo pauzy.
- Mnoho jazyků má pro používání spojovníků a pomlček různá pravidla, která by se měla dodržovat.

### Formáty {#formats}

**Čísla**

- Hlavním rozdílem v psaní čísel v různých jazycích je oddělovač používaný pro desetinná místa a tisíce. Pro tisíce to může být tečka, čárka nebo mezera. Podobně některé jazyky používají desetinnou tečku, zatímco jiné používají desetinnou čárku.
  - Několik příkladů velkých čísel:
    - Angličtina – **1,000.50**
    - Španělština – **1.000,50**
    - Francouzština – **1 000,50**
- Dalším důležitým aspektem při překladu čísel je znak procenta. Lze jej zapsat různými způsoby: **100%**, **100 %** nebo **%100**.
- A konečně, záporná čísla se mohou zobrazovat různě v závislosti na jazyce: -100, 100-, (100) nebo [100].

**Data**

- Při překladu dat existuje řada aspektů a rozdílů v závislosti na jazyce. Patří mezi ně formát data, oddělovač, psaní velkých písmen a úvodní nuly. Existují také rozdíly mezi plnými a číselnými daty.
  - Několik příkladů různých formátů data:
    - Britská angličtina (dd/mm/yyyy) – 1st January, 2022
    - Americká angličtina (mm/dd/yyyy) – January 1st, 2022
    - Čínština (yyyy-mm-dd) – 2022 年 1 月 1 日
    - Francouzština (dd/mm/yyyy) – 1er janvier 2022
    - Italština (dd/mm/yyyy) – 1º gennaio 2022
    - Němčina (dd/mm/yyyy) – 1. Januar 2022

**Měny**

- Překlad měn může být náročný kvůli různým formátům, zvyklostem a převodům. Obecně platí, že měny ponechte stejné jako ve zdroji. Pro usnadnění čtenáři můžete do závorek přidat svou místní měnu a převod.
- Mezi hlavní rozdíly v psaní měn v různých jazycích patří umístění symbolu, desetinné čárky vs. desetinné tečky, mezery a zkratky vs. symboly.
  - Umístění symbolu: $100 nebo 100$
  - Desetinné čárky vs. desetinné tečky: 100,50$ nebo 100.50$
  - Mezery: 100$ nebo 100 $
  - Zkratky vs. symboly: 100 $ nebo 100 USD

**Měrné jednotky**

- Obecně platí, že měrné jednotky ponechte podle zdroje. Pokud vaše země používá jiný systém, můžete do závorek uvést převod.
- Kromě lokalizace měrných jednotek je také důležité vzít na vědomí rozdíly v tom, jak jazyky k těmto jednotkám přistupují. Hlavním rozdílem je mezera mezi číslem a jednotkou, která se může lišit v závislosti na jazyce. Příklady zahrnují 100kB vs. 100 kB nebo 50ºF vs. 50 ºF.

## Závěr {#conclusion}

Překládání ethereum.org je skvělá příležitost, jak se dozvědět o různých aspektech Etherea.

Při překládání se snažte nespěchat. Buďte v klidu a bavte se!

Děkujeme, že jste se zapojili do Překladatelského programu a pomáháte nám zpřístupnit web širšímu publiku. Komunita Etherea je globální a jsme rádi, že jste její součástí!