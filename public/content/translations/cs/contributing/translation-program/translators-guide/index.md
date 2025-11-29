---
title: Průvodce překladem
lang: cs
description: Pokyny a tipy pro překladatele Ethereum.org
---

# Průvodce stylem překladu Ethereum.org {#style-guide}

Průvodce stylem překladu pro Ethereum.org obsahuje některé z nejdůležitějších pokynů, instrukcí a tipů pro překladatele, kteří nám pomáhají lokalizovat webové stránky.

Tento dokument slouží jako obecný průvodce a není specifický pro žádný konkrétní jazyk.

Pokud máte jakékoli dotazy, návrhy nebo zpětnou vazbu, neváhejte nás kontaktovat na translations@Ethereum.org, pošlete zprávu na @ethdotorg na Crowdin nebo se [připojte k našemu Discordu](https://discord.gg/Ethereum-org), kde nám můžete poslat zprávu v kanálu #translations nebo kontaktovat některého z členů týmu.

## Používání Crowdinu {#using-Crowdin}

Základní pokyny, jak se připojit k projektu na Crowdinu a jak používat online editor Crowdin, najdete na stránce [Translation Program](/contributing/translation-program/#how-to-translate).

Pokud byste se chtěli dozvědět více o Crowdinu a používat některé z jeho pokročilých funkcí, [znalostní báze Crowdin](https://support.Crowdin.com/online-editor/) obsahuje mnoho podrobných průvodců a přehledů všech jeho funkcionalit.

## Zachycení podstaty sdělení {#capturing-the-essence}

Při překládání obsahu Ethereum.org se vyhýbejte doslovným překladům.

Je důležité, aby překlady zachytily podstatu sdělení. To může znamenat přeformulování určitých frází nebo použití popisných překladů místo překládání obsahu slovo od slova.

Různé jazyky mají různá gramatické pravidla, konvence a pořadí slov. Při překládání mějte na paměti, jak jsou věty strukturovány v cílovém jazyce, a vyhněte se doslovnému překladu anglického zdroje, protože to může vést ke špatné struktuře vět a čitelnosti.

Místo překládání zdrojového textu slovo od slova se doporučuje přečíst si celou větu a přizpůsobit ji tak, aby odpovídala konvencím cílového jazyka.

## Formální vs. neformální {#formal-vs-informal}

Používáme formální oslovení, které je vždy zdvořilé a vhodné pro všechny návštěvníky.

Používání formálního oslovení nám umožňuje vyhnout se neoficiálnímu nebo urážlivému tónu a funguje bez ohledu na věk a pohlaví návštěvníka.

Většina indoevropských a afroasijských jazyků používá genderově specifická osobní zájmena, která rozlišují mezi mužským a ženským pohlavím. Při oslovování uživatele nebo používání přivlastňovacích zájmen se můžeme vyhnout předpokladu o pohlaví návštěvníka, protože formální forma oslovení je obecně použitelná a konzistentní, bez ohledu na to, jak se identifikují.

## Jednoduchá a jasná slovní zásoba a význam {#simple-vocabulary}

Naším cílem je, aby obsah na webu byl srozumitelný co největšímu počtu lidí.

Ve většině případů toho lze snadno dosáhnout použitím krátkých a jednoduchých slov, která jsou snadno srozumitelná. Pokud ve vašem jazyce existuje více možných překladů pro určitý výraz se stejným významem, nejlepší možností je většinou nejkratší slovo, které jasně odráží význam.

## Písmo {#writing-system}

Ethereum.org je dostupné v řadě jazyků, které používají alternativní písma (nebo abecedy) k latince.

Veškerý obsah by měl být přeložen s použitím správného písma pro váš jazyk a neměl by obsahovat žádná slova psaná pomocí latinky.

Při překládání obsahu byste měli zajistit, že překlady budou konzistentní a nebudou obsahovat žádné latinské znaky.

Běžná mylná představa je, že Ethereum by mělo být vždy psáno latinkou. To je většinou nesprávné, prosím, použijte název Ethereum tak, jak je vlastní vašemu jazyku (např. 以太坊 v čínštině, إيثيريوم v arabštině atd.).

**Výše uvedené neplatí pro jazyky, kde se jména obvykle nepřekládají.**

## Překládání metadat stránky {#translating-metadata}

Některé stránky obsahují metadata jako „title“, „lang“, „description“, „sidebar“ atd.

Když nahráváme nové stránky do Crowdinu, skryjeme obsah, který by překladatelé nikdy neměli překládat, což znamená, že všechna metadata viditelná pro překladatele v Crowdinu by měla být přeložena.

Buďte obzvláště opatrní při překládání jakýchkoli řetězců, kde je zdrojový text „en“. Tento text představuje jazyk, ve kterém je stránka dostupná, a měl by být přeložen na [ISO jazykový kód vašeho jazyka](https://www.andiamo.co.uk/resources/iso-language-codes/). Tyto řetězce by měly být vždy přeloženy pomocí latinských znaků, nikoli abecedy, která je vlastní cílovému jazyku.

Pokud si nejste jisti, jaký jazykový kód použít, můžete se podívat do překladové paměti v Crowdinu nebo najít jazykový kód pro váš jazyk v URL stránky v online editoru Crowdin.

Některé příklady jazykových kódů pro nejrozšířenější jazyky:

- Arabština – ar
- Čínština zjednodušená – zh
- Francouzština – fr
- Hindština – hi
- Španělština – es

## Názvy externích článků {#external-articles}

Některé řetězce obsahují názvy externích článků. Většina našich stránek s dokumentací pro vývojáře obsahuje odkazy na externí články pro další čtení. Řetězce obsahující názvy článků je třeba přeložit bez ohledu na jazyk článku, aby se zajistila konzistentnější uživatelská zkušenost pro návštěvníky, kteří si prohlížejí stránku ve svém jazyce.

Níže najdete několik příkladů toho, jak tyto řetězce vypadají pro překladatele a jak je identifikovat (odkazy na články najdete většinou na konci těchto stránek, v sekci „Další čtení“):

![Názvy článků v postranním panelu.png](./article-titles-in-sidebar.png) ![Názvy článků v editoru.png](./article-titles-in-editor.png)

## Upozornění v Crowdinu {#Crowdin-warnings}

Crowdin má zabudovanou funkci, která varuje překladatele, když se chystají udělat chybu. Crowdin vás automaticky upozorní před uložením překladu, pokud zapomenete zahrnout tag ze zdroje, přeložíte prvky, které by neměly být přeloženy, přidáte několik po sobě jdoucích mezer, zapomenete koncové interpunkční znaménko atd. Pokud vidíte takové upozornění, vraťte se a dvakrát zkontrolujte navrhovaný překlad.

**Nikdy tato varování neignorujte, protože obvykle znamenají, že něco není v pořádku nebo že v překladu chybí klíčová část zdrojového textu.**

Příklad upozornění v Crowdinu, když zapomenete přidat tag do překladu: ![Příklad upozornění v Crowdinu](./Crowdin-warning-example.png)

## Práce s tagy a úryvky kódu {#dealing-with-tags}

Mnoho zdrojového obsahu obsahuje tagy a proměnné, které jsou v editoru Crowdin zvýrazněny žlutě. Tyto prvky slouží různým funkcím a je nutné k nim přistupovat správně.

**Nastavení Crowdinu**

Aby bylo snazší pracovat s tagy a kopírovat je přímo ze zdroje, doporučujeme změnit nastavení v editoru Crowdin.

1. Otevřete nastavení ![Jak otevřít nastavení v editoru](./editor-settings.png)

2. Sjeďte dolů do sekce „Zobrazování HTML tagů“

3. Vyberte „Skrýt“ ![Prosím, zvolte možnost „Skrýt“](./hide-tags.png)

4. Klikněte na „Uložit“

Při výběru této možnosti se celý text tagu již nebude zobrazovat a bude nahrazen číslem. Při překládání kliknutí na tento tag automaticky zkopíruje přesný tag do pole překladu.

**Odkazy**

Můžete si také všimnout úplných odkazů na stránky na Ethereum.org nebo na jiné webové stránky.

Tyto odkazy by měly být identické se zdrojem a neměly by být měněny nebo překládány. Pokud odkaz přeložíte nebo ho jakýmkoliv způsobem změníte, dokonce i jen odstraněním části, jako je například lomítko (/), povede to k nefunkčním a nepoužitelným odkazům.

Nejlepší způsob, jak pracovat s odkazy, je kopírovat je přímo ze zdroje, buď kliknutím na ně, nebo použitím tlačítka „Kopírovat zdroj“ (Alt+C).

![Příklad odkazu.png](./example-of-link.png)

Odkazy se také zobrazují ve zdrojovém textu ve formě tagů (tj. \<0> \</0>). Pokud na tag umístíte kurzor, editor zobrazí jeho celý obsah – někdy tyto tagy představují odkazy.

Je velmi důležité zkopírovat odkazy ze zdroje a neměnit jejich pořadí.

Pokud se změní pořadí tagů, odkaz, který představují, bude nefunkční.

![Příklad odkazů uvnitř tags.png](./example-of-links-inside-tags.png)

**Tagy a proměnné**

Zdrojový text obsahuje mnoho různých typů tagů, které by měly být vždy zkopírovány ze zdroje a nikdy měněny. Podobně jako výše, pořadí těchto tagů v překladu by mělo zůstat stejné jako ve zdroji.

Tagy vždy obsahují otevírací a zavírací tag. Ve většině případů by text mezi otevíracím a zavíracím tagem měl být přeložen.

Příklad: `<strong x-id="1">`Decentralized`</strong>`

`<strong x-id="1">` – _otevírací tag, který udělá text tučným_

Decentralized – _přeložitelný text_

`</strong>` – _zavírací tag_

![Příklad tagů „strong“.png](./example-of-strong-tags.png)

Úryvky kódu by měly být zpracovány trochu jinak než ostatní tagy, protože obsahují kód, který by neměl být přeložen.

Příklad: `<code>`nonce`</code>`

`<code>` – _otevírací tag, který obsahuje úryvek kódu_

nonce – _text, který není určen k překladu_

`</code>` – _zavírací tag_

![Příklad úryvků kódu.png](./example-of-code-snippets.png)

Zdrojový text také obsahuje zkrácené tagy, které obsahují pouze čísla, což znamená, že jejich funkce není okamžitě zřejmá. Můžete na tyto tagy najet kurzorem, abyste přesně zjistili, jakou funkci plní.

V příkladu níže můžete vidět, že když najedete kurzorem na tag \<0> , zobrazí se, že představuje `<code>` a obsahuje úryvek kódu, takže obsah uvnitř těchto tagů by neměl být přeložen.

![Příklad nejednoznačných tagů.png](./example-of-ambiguous-tags.png)

## Krátké versus plné formy nebo zkratky {#short-vs-full-forms}

Na webových stránkách se používá mnoho zkratek, např. dapps, NFT, DAO, DeFi atd. Tyto zkratky jsou běžně používány v angličtině a většina návštěvníků webu je s nimi obeznámena.

Protože obvykle nemají zavedené překlady v jiných jazycích, nejlepší způsob, jak k těmto a podobným termínům přistupovat, je poskytnout popisný překlad plné formy a přidat anglickou zkratku v závorkách.

Tyto zkratky nepřekládejte, protože většina lidí by jim nerozuměla a lokalizované verze by pro většinu návštěvníků nedávaly smysl.

Příklad, jak přeložit dapps:

- Decentralized applications (dapps) → _přeložená plná forma (anglická zkratka v závorkách)_

## Termíny bez zavedených překladů {#terms-without-established-translations}

Některé termíny nemusí mít zavedené překlady v jiných jazycích a jsou široce známé pod původním anglickým termínem. Tyto termíny většinou zahrnují novější koncepty, jako je proof-of-work, proof-of-stake, Beacon Chain, staking atd.

I když může překlad těchto termínů znít nepřirozeně, protože anglická verze je běžně používána i v jiných jazycích, je silně doporučeno, aby byly přeloženy.

Při jejich překladu se nebojte být kreativní, použijte popisné překlady nebo je jednoduše přeložte doslovně.

**Důvod, proč by většina termínů měla být přeložena, místo toho, aby některé zůstaly v angličtině, spočívá v tom, že tato nová terminologie se v budoucnu rozšíří, jakmile začne více lidí používat Ethereum a související technologie. Pokud chceme do tohoto ekosystému přivést více lidí z celého světa, musíme poskytnout srozumitelnou terminologii v co nejvíce jazycích, i když ji musíme sami vytvořit.**

## Tlačítka a výzvy k akci (CTA) {#buttons-and-ctas}

Web obsahuje spoustu tlačítek, která by měla být přeložena odlišně od ostatního obsahu.

Text tlačítek lze identifikovat zobrazením kontextových snímků obrazovky, spojených s většinou řetězců, nebo kontrolou kontextu v editoru, který obsahuje frázi „tlačítko“.

Překlady tlačítek by měly být co nejkratší, aby se zabránilo problémům s formátováním. Kromě toho by překlady tlačítek měly být imperativní, tj. představovat příkaz nebo žádost.

![Jak najít tlačítko.png](./how-to-find-a-button.png)

## Překládání s ohledem na inkluzivitu {#translating-for-inclusivity}

Návštěvníci Ethereum.org pocházejí z celého světa a z různých prostředí. Jazyk na webu by proto měl být neutrální, přívětivý ke všem a ne vylučující.

Důležitým aspektem tohoto přístupu je genderová neutralita. Toho lze snadno dosáhnout použitím formálního způsobu oslovení a vyhnutím se jakýmkoli genderově specifickým slovům v překladech.

Další formou inkluzivity je snaha překládat pro globální publikum, nikoli specificky pro jakoukoli zemi, rasu nebo region.

Jazyk by měl být vhodný pro všechna publika a věkové kategorie.

## Jazykově specifické překlady {#language-specific-translations}

Při překládání je důležité dodržovat gramatická pravidla, konvence a formátování používané ve vašem jazyce, na rozdíl od kopírování ze zdroje. Zdrojový text se řídí anglickými gramatickými pravidly a konvencemi, což není použitelné pro mnoho jiných jazyků.

Měli byste být obeznámeni s pravidly pro váš jazyk a překládat podle nich. Pokud potřebujete pomoc, kontaktujte nás a my vám pomůžeme najít nějaké zdroje, které vám ukážou, jak by tyto prvky měly být ve vašem jazyce používány.

Některé příklady toho, na co být obzvláště opatrní:

### Interpunkce, formátování {#punctuation-and-formatting}

**Velká písmena**

- V různých jazycích existují obrovské rozdíly ve využívání velkých písmen.
- V angličtině je běžné psát všechna slova v nadpisech a názvech s velkým počátečním písmenem, stejně jako názvy měsíců, dní, jazyků, svátků apod. V mnoha jiných jazycích je to však gramaticky nesprávné, protože mají odlišná pravidla pro používání velkých písmen.
- Některé jazyky mají také pravidla pro psaní velkých písmen u osobních zájmen, podstatných jmen a určitých přídavných jmen, která nejsou v angličtině psána s velkým písmenem.

**Mezery**

- Pravidla pro používání mezer jsou definována ortografií pro každý jazyk. Protože mezery se používají všude, tato pravidla jsou velmi odlišná a mezery jsou často nesprávně překládány.
- Některé běžné rozdíly v používání mezer mezi angličtinou a jinými jazyky:
  - Mezera před jednotkami měření a měnami (např. USD, EUR, kB, MB)
  - Mezera před znakem stupně (např. °C, ℉)
  - Mezera před některými interpunkčními znaky, zejména před trojtečkou (…)
  - Mezera před a za lomítky (/)

**Seznamy**

- Každý jazyk má rozmanitý a složitý soubor pravidel pro psaní seznamů. Tato pravidla mohou být výrazně odlišná od angličtiny.
- V některých jazycích je první slovo každé nové položky seznamu třeba psát s velkým písmenem, zatímco v jiných jazycích by nové položky měly začínat malým písmenem. Mnoho jazyků má také různá pravidla pro psaní velkých písmen v seznamech, která závisí na délce každé položky.
- Totéž platí pro interpunkci jednotlivých položek seznamu. Závěrečná interpunkce v seznamech může být tečka (**.**), čárka (**,**) nebo středník (**;**), v závislosti na jazyce.

**Uvozovky**

- Různé jazyky používají různé typy uvozovek. Pouhé kopírování anglických uvozovek ze zdroje je často nesprávné.
- Některé z nejběžnějších typů uvozovek zahrnují:
  - „ukázkový text“
  - ‚ukázkový text’
  - »ukázkový text«
  - “ukázkový text”
  - ‘ukázkový text’
  - «ukázkový text»

**Spojovníky a pomlčky**

- V angličtině se spojovník (-) používá ke spojení slov nebo různých částí slova, zatímco pomlčka (–) se používá k označení rozsahu nebo pauzy.
- Mnoho jazyků má odlišná pravidla pro používání spojovníků a pomlček, která by měla být dodržována.

### Formáty {#formats}

**Čísla**

- Hlavním rozdílem při psaní čísel v různých jazycích je oddělovač použitý pro desetinná místa a tisíce. Pro tisíce to může být tečka, čárka nebo mezera. Podobně některé jazyky používají desetinnou tečku, zatímco jiné používají desetinnou čárku.
  - Některé příklady velkých čísel:
    - Angličtina – **1,000.50**
    - Španělština – **1.000,50**
    - Francouzština – **1 000,50**
- Dalším důležitým faktorem při překladu čísel je procentní znak. Ten může být psán různými způsoby: **100%**, **100 %** nebo **%100**.
- Záporná čísla mohou být zobrazena různě, v závislosti na jazyce: -100, 100-, (100) nebo [100].

**Data**

- Při překladu dat existuje řada úvah a rozdílů v závislosti na jazyce. Patří sem formát data, oddělovač, používání velkých písmen a počáteční nuly. Existují také rozdíly mezi plnými a číselnými formami data.
  - Některé příklady různých formátů data:
    - Angličtina (UK) (dd/mm/yyyy) – 1st January, 2022
    - Angličtina (US) (mm/dd/yyyy) – January 1st, 2022
    - Čínština (yyyy-mm-dd) – 2022 年 1 月 1 日
    - Francouzština (dd/mm/yyyy) – 1er janvier 2022
    - Italština (dd/mm/yyyy) – 1º gennaio 2022
    - Němčina (dd/mm/yyyy) – 1. Januar 2022

**Měny**

- Překlad měn může být náročný kvůli různým formátům, konvencím a převodům. Obecně platí, že měny ponecháte stejné jako ve zdrojovém textu. Pro pohodlí čtenáře můžete přidat místní měnu a převod v závorce.
- Hlavní rozdíly ve psaní měn v různých jazycích zahrnují umístění symbolu, desetinné čárky vs. desetinné tečky, mezery a zkratky vs. symboly.
  - Umístění symbolu: $100 nebo 100$
  - Desetinné čárky vs. desetinné tečky: 100,50$ nebo 100.50$
  - Mezery: 100$ nebo 100 $
  - Zkratky vs. symboly: 100 $ nebo 100 USD

**Měrné jednotky**

- Obecně platí, že měrné jednotky můžete ponechat tak, jak jsou ve zdrojovém textu. Pokud vaše země používá jiný systém, můžete zahrnout převod v závorce.
- Kromě lokalizace jednotek měření je také důležité si uvědomit rozdíly v tom, jak jazyky přistupují k těmto jednotkám. Hlavní rozdíl je ve vzdálenosti mezi číslem a jednotkou, která může být rozdílná v závislosti na jazyce. Příkladem toho může být 100kB vs. 100 kB nebo 50ºF vs. 50 ºF.

## Závěr {#conclusion}

Překlad Ethereum.org je skvělou příležitostí, jak se dozvědět více o různých aspektech Etherea.

Při překládání se nesnažte spěchat. Vezměte to v klidu a bavte se!

Děkujeme, že jste se zapojili do překladatelského programu a pomáháte nám zpřístupnit web širšímu publiku. Komunita Etherea je globální a jsme rádi, že jste její součástí!
