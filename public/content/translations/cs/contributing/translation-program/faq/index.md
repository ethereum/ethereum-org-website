---
title: Průvodce překladem ethereum.org
metaTitle: Často kladené dotazy (FAQ) k překladatelskému programu
lang: cs
description: Často kladené dotazy ohledně překladatelského programu ethereum.org
---

Pokud jste v překladatelském programu noví a váháte, zda se zapojit, zde je několik často kladených dotazů (FAQ), které vám pomohou začít. Tento průvodce vám poskytne odpovědi na ty nejčastější otázky.

## Mohu za překlad ethereum.org dostat zaplaceno? {#compensation}

Ethereum.org je open-source webová stránka, což znamená, že se může zapojit a přispět kdokoli.

Překladatelský program ethereum.org je toho rozšířením a je organizován s ohledem na podobnou filozofii.

Cílem překladatelského programu je zpřístupnit obsah o Ethereu všem, bez ohledu na to, jakým jazykem mluví. Umožňuje také jakékoli bilingvní osobě zapojit se do ekosystému Etherea a přispět přístupným způsobem.

Z tohoto důvodu je překladatelský program otevřený a dobrovolný a účast v něm není honorována. Kdybychom překladatele odměňovali za počet přeložených slov, mohli bychom do překladatelského programu pozvat pouze ty s dostatečnými zkušenostmi (profesionální překladatele). Tím by se překladatelský program stal exkluzivním a zabránilo by nám to v dosažení stanovených cílů, konkrétně: umožnit všem zúčastnit se a zapojit se do ekosystému.

Snažíme se ze všech sil umožnit našim přispěvatelům uspět v ekosystému Etherea; existuje mnoho nefinančních pobídek, jako například: [nabídka POAPů](/contributing/translation-program/acknowledgements/#poap) a [certifikát překladatele](/contributing/translation-program/acknowledgements/#certificate), stejně jako organizování [žebříčků překladatelů](/contributing/translation-program/acknowledgements/) a [uvedení všech našich překladatelů na webu](/contributing/translation-program/contributors/).

## Jak přeložit řetězce s `<HTML tags>`? {#tags}

Ne každý řetězec je napsán v čistě textové podobě. Existují řetězce, které se skládají ze smíšených skriptů, jako jsou HTML značky (`<0>`, `</0>`). To se obvykle používá pro hypertextové odkazy nebo alternativní stylování uprostřed věty.

- Přeložte text uvnitř značek, ale ne samotné značky. Cokoli v `<` a `>` nesmí být přeloženo ani odstraněno.
- Pro zachování bezpečnosti řetězce doporučujeme kliknout na tlačítko „Copy Source“ (Kopírovat zdroj) vlevo dole. Tím se zkopíruje původní řetězec a vloží se do textového pole. To vám umožní ujasnit si, kde se značky nacházejí, a pomůže vám to vyhnout se chybám.

![Crowdin interface with copy source button highlighted](./html-tag-strings.png)

Pozici značek v rámci řetězce můžete přesunout, aby zněl ve vašem jazyce přirozeněji – jen se ujistěte, že přesouváte celou značku.

Podrobnější informace o tom, jak zacházet se značkami a úryvky kódu, najdete v [Průvodci stylem překladu ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Kde se řetězce nacházejí? {#strings}

Často samotné zdrojové řetězce nemusí stačit k tomu, abyste poskytli přesný překlad.

- Podívejte se na „screenshots“ (snímky obrazovky) a „context“ (kontext) pro více informací. V sekci zdrojového řetězce uvidíte připojený snímek obrazovky, který vám ukáže, jak řetězec používáme v kontextu.
- Pokud si stále nejste jisti, upozorněte na to v sekci komentářů („comment section“). [Nevíte, jak zanechat komentář?](#comment)

![Showing how context can be provided for a string with a screenshot](./source-string.png)

![An example screenshot added for context](./source-string-2.png)

## Jak mohu zanechat komentáře nebo klást otázky? Rád bych upozornil na problém nebo překlepy... {#comment}

Pokud chcete upozornit na konkrétní řetězec, který vyžaduje pozornost, neváhejte odeslat komentář.

- Klikněte na druhé tlačítko v pravém horním panelu. Po vaší pravici se objeví skrytá karta. Zanechte nový komentář a zaškrtněte políčko „Issue“ (Problém) dole. Typ problému můžete specifikovat výběrem jedné z možností z rozbalovací nabídky.
- Po odeslání bude problém nahlášen našemu týmu. Problém vyřešíme a dáme vám vědět odpovědí na váš komentář a uzavřením problému.
- Pokud nahlásíte nesprávný překlad, překlad a vámi navrhovaná alternativa budou zkontrolovány rodilým mluvčím během další kontroly.

![Showing how to make comments and issues](./comment-issue.png)

## Co je to překladová paměť (TM)? {#translation-memory}

Překladová paměť (Translation Memory – TM) je funkce platformy Crowdin, která ukládá všechny dříve přeložené řetězce napříč webem ethereum.org. Když je řetězec přeložen, automaticky se uloží do TM našeho projektu. Může to být užitečný nástroj, který vám pomůže ušetřit čas!

- Podívejte se do sekce „TM and MT Suggestions“ (Návrhy TM a MT) a uvidíte, jak jiní překladatelé přeložili stejný nebo podobný řetězec. Pokud najdete návrh s vysokou mírou shody, neváhejte jej použít kliknutím na něj.
- Pokud v seznamu nic není, můžete v TM vyhledat dříve vytvořené překlady a znovu je použít pro zachování konzistence.

![A screenshot of the translation memory](./translation-memory.png)

## Jak používat glosář na platformě Crowdin? {#glossary}

Terminologie Etherea je další klíčovou součástí naší překladatelské práce, protože nové technické termíny často ještě nebudou v mnoha jazycích lokalizovány. Existují také termíny, které mají v různých kontextech různé významy. [Více o překladu terminologie Etherea](#terminology)

Glosář na platformě Crowdin je nejlepším místem pro objasnění termínů a definic. Existují dva způsoby, jak do glosáře nahlédnout.

- Zaprvé, když ve zdrojovém řetězci najdete podtržený termín, můžete na něj najet myší a zobrazí se vám jeho stručná definice.

![An example glossary definition](./glossary-definition.png)

- Zadruhé, pokud uvidíte termín, který neznáte, ale není podtržený, můžete vyhledávat na kartě glosáře (třetí tlačítko v pravém sloupci). Najdete zde vysvětlení specifických termínů a těch, které se v projektu často používají.

![A screenshot showing where to find the glossary tab in Crowdin](./glossary-tab.png)

- Pokud jej stále nemůžete najít, je to vaše šance přidat nový termín! Doporučujeme vám vyhledat si jej ve vyhledávači a přidat jeho popis do glosáře. Bude to velkou pomocí pro ostatní překladatele k lepšímu pochopení daného termínu.

![A screenshot showing how to add a glossary term to Crowdin](./add-glossary-term.png)

### Zásady překladu terminologie {#terminology}

_Pro jména (značky, společnosti, lidé) a nové technické termíny (Beacon chain, shardové řetězce atd.)_

Ethereum přináší spoustu nových termínů, které byly vytvořeny teprve nedávno. Některé termíny se budou u jednotlivých překladatelů lišit, protože v jejich jazyce neexistuje žádný oficiální překlad. Takové nesrovnalosti mohou způsobit nedorozumění a snížit čitelnost.

Vzhledem k jazykové rozmanitosti a různým standardizacím v každém jazyce bylo téměř nemožné přijít s jednotnými zásadami překladu terminologie, které by bylo možné přizpůsobit ve všech podporovaných jazycích.

Po pečlivém zvážení jsme dospěli k rozhodnutí ponechat nejčastěji používanou terminologii na vás, překladatelích.

Zde je to, co navrhujeme, když narazíte na termín, který neznáte:

- Nahlédněte do [Glosáře pojmů](#glossary), možná zjistíte, jak jej dříve přeložili jiní překladatelé. Pokud si myslíte, že dříve přeložený termín není vhodný, neváhejte prosadit svůj překlad přidáním nového termínu do glosáře na platformě Crowdin.
- Pokud takový předchozí překlad v glosáři neexistuje, doporučujeme vám vyhledat si jej ve vyhledávači nebo v mediálním článku, který ukazuje, jak se termín ve vaší komunitě skutečně používá v praxi.
- Pokud nenajdete vůbec žádné odkazy, neváhejte důvěřovat své intuici a navrhněte nový překlad do svého jazyka!
- Pokud si na to netroufáte, ponechte termín nepřeložený. Někdy jsou anglické termíny pro poskytnutí přesných definic více než dostačující.

Doporučujeme ponechat názvy značek, společností a jména osob nepřeložené, protože překlad by mohl způsobit zbytečný zmatek a potíže se SEO.

## Jak funguje proces kontroly? {#review-process}

Abychom zajistili určitou úroveň kvality a konzistence našich překladů, spolupracujeme se společností [Acolad](https://www.acolad.com/), jedním z největších poskytovatelů jazykových služeb na světě. Acolad má 20 000 profesionálních lingvistů, což znamená, že mohou poskytnout profesionální korektory pro každý jazyk a typ obsahu, který potřebujeme.

Proces kontroly je přímočarý; jakmile je sada obsahu ze 100 % přeložena, objednáme pro tento balíček obsahu kontrolu. Proces kontroly probíhá přímo na platformě Crowdin. Po dokončení kontroly aktualizujeme webové stránky přeloženým obsahem.

## Jak mohu přidat obsah ve svém jazyce? {#adding-foreign-language-content}

V současné době je veškerý neanglický obsah překládán přímo z anglického zdrojového obsahu a jakýkoli obsah, který neexistuje v angličtině, nelze přidat do jiných jazyků.

Chcete-li navrhnout nový obsah pro ethereum.org, můžete [vytvořit požadavek (issue)](https://github.com/ethereum/ethereum-org-website/issues) na GitHubu. Pokud bude obsah přidán, bude napsán v angličtině a přeložen do dalších jazyků pomocí platformy Crowdin.

V blízké budoucnosti plánujeme přidat podporu pro přidávání neanglického obsahu.

## Kontaktujte nás {#contact}

Děkujeme, že jste si to všechno přečetli. Doufáme, že vám to pomůže zapojit se do našeho programu. Neváhejte se připojit k našemu [překladatelskému kanálu na Discordu](https://discord.gg/ethereum-org), kde můžete klást otázky a spolupracovat s ostatními překladateli, nebo nás kontaktujte na adrese translations@ethereum.org!