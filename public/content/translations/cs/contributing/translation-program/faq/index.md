---
title: Často kladené otázky (FAQ) o překladatelském programu
lang: cs
description: Často kladené otázky týkající se překladatelského programu stránky ethereum.org
---

# Průvodce překladem ethereum.org {#translating-ethereum-guide}

Pokud jste noví v překladatelském programu a váháte, jestli se vrhnout na překlad, toto jsou některé často kladené otázky, jejichž zodpovězení vám může pomoci začít. Tento průvodce obsahuje odpovědi na nejčastější dotazy.

## Mohu za překlad ethereum.org dostat zaplaceno? {#compensation}

Ethereum.org je open-source web, což znamená, že se do něj může zapojit a přispívat kdokoli.

Překladatelský program ethereum.org je jeho rozšířením a je organizován s podobnou filozofií.

Cílem překladatelského programu je zpřístupnit obsah Etherea všem bez ohledu na to, jakým jazykem mluví. Umožňuje také každému dvojjazyčnému člověku zapojit se do ekosystému Etherea a přispívat přístupným způsobem.

Z tohoto důvodu je překladatelský program otevřený a dobrovolný a účast v něm není podmíněna finanční odměnou. Pokud bychom měli překladatele kompenzovat za počet přeložených slov, mohli bychom do překladatelského programu pozvat pouze ty, kteří mají dostatečné překladatelské zkušenosti (profesionální překladatele). Tím by se překladatelský program stal uzavřeným a nedosáhli bychom vytyčených cílů, konkrétně: umožnit všem účastnit se a zapojit se do ekosystému.

Vynakládáme veškeré úsilí, abychom našim přispěvatelům umožnili uspět v ekosystému Etherea; existuje mnoho nepeněžních pobídek, jako např.: [nabízíme POAPy](/contributing/translation-program/acknowledgements/#poap) a [certifikát překladatele](/contributing/translation-program/acknowledgements/#certificate), stejně jako organizujeme [Žebříčky překladatelů](/contributing/translation-program/acknowledgements/) a [seznam všech našich překladatelů na webu](/contributing/translation-program/contributors/).

## Jak překládat řetězce s `<HTML značkami>`? {#tags}

Ne každý řetězec je čistě v textové podobě. Některé řetězce obsahují i kód, jako jsou HTML značky (`<0>`, `</0>`).To obyčejně označuje hypertextové odkazy nebo vložené styly ve větě.

- Přeložte text mezi značkami, ale ne samotné značky. To, co se nachází mezi `<` a `>`, nesmí být přeloženo ani odstraněno.
- Pro jistotu doporučujeme kliknout na tlačítko „Kopírovat zdroj“ vlevo dole. To zkopíruje původní řetězec a vloží jej do textového pole. To vám pomůže si ujasnit, kde jsou značky, a pomáhá vám vyhnout se chybám.

![Rozhraní Crowdin se zvýrazněným tlačítkem Kopírovat zdroj](./html-tag-strings.png)

Umístění značek v řetězci můžete přesunout, aby překlad ve vašem jazyce zněl přirozeněji. Jen se ujistěte, že přesouváte celou značku.

Podrobnější informace o práci se štítky a úryvky kódu naleznete v [průvodci stylem překladu ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Odkud tyto řetězce jsou? {#strings}

Často nejsou jen zdrojové řetězce dostačující k vytvoření přesného překladu.

- Pro více informací se podívejte na „snímky obrazovky“ a „kontext“. V oddílu zdrojových řetězců lze vidět snímek obrazovky, který vám ukáže, v jakém kontextu se tento řetězec používá.
- Pokud si stále nejste jisti, můžete se zeptat v komentářích. [Nejste si jisti, jak zanechat komentář?](#comment)

![Ukázka toho, jak lze poskytnout kontext pro řetězec pomocí snímku obrazovky](./source-string.png)

![Pro kontext přidán ukázkový snímek obrazovky](./source-string-2.png)

## Jak mohu zanechat komentář nebo položit otázku? Rád/a bych upozornil na problém nebo překlepy… {#comment}

Pokud chcete upozornit na určitý řetězec, který vyžaduje pozornost, můžete zaslat komentář.

- Klikněte na druhé tlačítko vpravo nahoře. Vpravo se objeví skrytá karta. Zanechte nový komentář a klikněte na zaškrtávací políčko „Problém“ v dolní části. Typ problému můžete určit výběrem jedné z možností z rozevírací nabídky.
- Po odeslání bude problém nahlášen našemu týmu. Problém opravíme a dáme vám vědět odpovědí na váš komentář a uzavřením problému.
- Pokud nahlásíte nesprávný překlad, bude překlad a vámi navržená alternativa při příští kontrole zkontrolována rodilým mluvčím.

![Ukázka toho, jak vznášet připomínky a otázky](./comment-issue.png)

## Co je překladová paměť (PP)? {#translation-memory}

Překladová paměť (PP) je funkce Crowdinu, která ukládá všechny dříve přeložené řetězce na [ethereum.org](https://ethereum.org/). Když je řetězec přeložen, automaticky se uloží do PP našeho projektu. Může to být užitečný nástroj, který vám pomůže ušetřit čas!

- Podívejte se do sekce „Návrhy PP a SP“ a uvidíte, jak stejný nebo podobný řetězec přeložili jiní překladatelé. Pokud naleznete návrh s vysokou mírou shody, neváhejte na překlad odkázat kliknutím.
- Pokud v seznamu nic není, můžete v PP vyhledat dříve vytvořené překlady a znovu je použít pro zajištění konzistence.

![Snímek obrazovky překladové paměti](./translation-memory.png)

## Jak používat glosář Crowdinu? {#glossary}

Další důležitou součástí naší překladatelské práce je terminologie Etherea, protože nové technické termíny často ještě nejsou lokalizovány do mnoha jazyků. Existují také termíny, které mají v různých kontextech různý význam. [Další informace o překladu terminologie Etherea](#terminology)

Nejlepším místem pro objasnění pojmů a definic je glosář Crowdinu. Na glosář lze odkazovat dvěma způsoby.

- Když ve zdrojovém řetězci najdete podtržený výraz, můžete na něj najet myší a zobrazit jeho stručnou definici.

![Příklad definice v glosáři](./glossary-definition.png)

- Dále, pokud uvidíte termín, který vám není známý, ale není podtržený, můžete hledat v kartě glosáře (třetí tlačítko v pravém sloupci). Najdete zde vysvětlení konkrétních a v projektu často používaných pojmů.

![Snímek obrazovky, který ukazuje, kde v Crowdinu najdete záložku glosáře](./glossary-tab.png)

- Pokud ho stále nemůžete najít, máte šanci přidat nový termín! Doporučujeme vám, abyste si ho vyhledali ve vyhledávači a přidali jeho popis do glosáře. Ostatním překladatelům to velmi pomůže lépe porozumět tomuto termínu.

![Snímek obrazovky, který ukazuje, jak přidat termín do Crowdin glosáře](./add-glossary-term.png)

### Politika překladu terminologie {#terminology}

_Pro názvy (značek, firem, lidí) a nové technologické termíny (Beacon Chain, shard chains atd.)_

Ethereum představuje spoustu nových termínů, které byly nedávno vytvořeny. Některé termíny se u jednotlivých překladatelů liší, protože v jejich jazyce neexistuje oficiální překlad. Tyto nesrovnalosti mohou způsobit nedorozumění a snížit srozumitelnost.

Vzhledem k jazykové rozmanitosti a odlišným standardizacím v jednotlivých jazycích bylo téměř nemožné vypracovat jednotnou politiku překladu terminologie, kterou by bylo možné přizpůsobit všem podporovaným jazykům.

Po pečlivém zvážení jsme dospěli k rozhodnutí ponechat nejčastěji používanou terminologii na vás, překladatelích.

Pokud narazíte na termín, který neznáte, doporučujeme následující postup:

- Podívejte se do [Glosáře pojmů](#glossary), možná zjistíte, jak jej dříve překládali jiní překladatelé. Pokud si myslíte, že dříve přeložený termín není vhodný, můžete překlad obnovit přidáním nového termínu do glosáře Crowdinu.
- Pokud takový předchozí překlad ve slovníku neexistuje, doporučujeme vám, abyste si jej vyhledali ve vyhledávači nebo v článku v médiích, který ukazuje, jak se daný termín ve vaší komunitě skutečně používá.
- Pokud nenajdete vůbec žádné odkazy, neváhejte důvěřovat své intuici a navrhněte nový překlad do vašeho jazyka!
- Pokud se cítíte méně jistí, ponechte termín nepřeložený. Někdy jsou anglické termíny více než vhodné pro poskytnutí přesných definic.

Doporučujeme ponechat názvy značek, firem a zaměstnanců nepřeložené, protože překlad by mohl způsobit zbytečné zmatky a potíže s SEO.

## Jak probíhá proces revize? {#review-process}

Abychom zajistili určitou úroveň kvality a konzistence našich překladů, spolupracujeme s [Acolad](https://www.acolad.com/), jedním z největších poskytovatelů jazykových služeb na světě. Acolad má 20 000 profesionálních lingvistů, což znamená, že může poskytnout profesionální revizory pro každý jazyk a typ obsahu, který potřebujeme.

Proces revize je jednoduchý; jakmile je určitá [obsahová kategorie](/contributing/translation-program/content-buckets) přeložena na 100 %, objednáme její revizi. Proces revize probíhá přímo v Crowdinu. Jakmile je revize dokončena, aktualizujeme webové stránky s přeloženým obsahem.

## Jak přidám obsah ve svém jazyce? {#adding-foreign-language-content}

V současné době je veškerý neanglický obsah překládán přímo z anglického zdrojového obsahu a obsah, který neexistuje v angličtině, nelze přidat do jiných jazyků.

Chcete-li navrhnout nový obsah pro ethereum.org, můžete [vytvořit problém](https://github.com/ethereum/ethereum-org-website/issues) na GitHubu. V případě přidání bude obsah sepsán v angličtině a přeložen do dalších jazyků přes Crowdin.

V blízké budoucnosti plánujeme přidat podporu pro přidávání jiného než anglického obsahu.

## Kontaktujte nás {#contact}

Děkujeme, že jste si všechno přečetli. Doufáme, že vám to pomůže při nástupu do našeho programu. Neváhejte se připojit k našemu [překladatelskému kanálu na Discordu](https://discord.gg/ethereum-org) a klást otázky a spolupracovat s ostatními překladateli, nebo nás kontaktujte na adrese translations@ethereum.org!
