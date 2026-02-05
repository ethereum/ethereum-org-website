---
title: Příručka překladatelského programu
lang: cs
description: Sbírka tipů a důležitých aspektů pro zřízení překladatelského programu
---

# Příručka překladatelského programu {#translation-program-playbook}

Angličtina je jedním z nejpoužívanějších jazyků na světě a je zdaleka nejstudovanějším jazykem na světě. Vzhledem k tomu, že angličtina je na internetu nejběžnějším jazykem – zejména na sociálních sítích – a vícejazyčné programovací jazyky jsou vzácné, většina obsahu v oblasti blockchainu je původně psána v angličtině.

Jelikož však více než 6 miliard lidí na světě (více než 75 % populace) nemluví anglicky vůbec, představuje to pro drtivou většinu světové populace obrovskou překážku pro vstup do světa Etherea.

Z tohoto důvodu se stále více projektů v této oblasti snaží nechat svůj obsah přeložit do různých jazyků a lokalizovat pro globální komunity.

Poskytování vícejazyčného obsahu je jednoduchý a efektivní způsob, jak rozšiřovat svou globální komunitu, poskytovat vzdělání lidem, kteří nemluví anglicky, zajistit, aby se váš obsah a komunikace dostaly k širšímu publiku, a zapojit do tohoto prostoru více lidí.

Cílem této příručky je řešit běžné problémy a mylné představy o lokalizaci obsahu. Poskytuje podrobný návod ke správě obsahu, procesu překladu a revize, zajištění kvality, oslovování překladatelů a dalším důležitým aspektům procesu lokalizace.

## Správa obsahu {#content-management}

Správa překladatelského obsahu označuje proces automatizace pracovního postupu překladu, který odstraňuje potřebu opakované manuální práce, zvyšuje efektivitu a kvalitu, umožňuje lepší kontrolu a usnadňuje spolupráci.

Existuje mnoho různých přístupů ke správě obsahu v procesu lokalizace v závislosti na obsahu a vašich potřebách.

Základním způsobem správy obsahu je vytváření dvojjazyčných souborů, které obsahují zdrojový a cílový text. Tento způsob se při překladu používá jen zřídka, protože kromě jednoduchosti nenabízí žádné významné výhody.

Překladatelské agentury obvykle přistupují ke správě překladů pomocí softwaru pro správu překladů nebo lokalizačních nástrojů, které poskytují možnosti projektového řízení a umožňují mnohem větší kontrolu nad soubory, obsahem a lingvisty.

Přečtěte si více o správě obsahu:

[Trados o tom, co je správa překladů](https://www.trados.com/solutions/translation-management/)

[Phrase o vícejazyčné správě obsahu](https://phrase.com/blog/posts/multilingual-content-management/)

### Software pro správu překladů {#translation-management-software}

Existuje mnoho systémů pro správu překladů a lokalizačních nástrojů a výběr softwaru závisí především na vašich potřebách.

Ačkoli se některé projekty rozhodnou nepoužívat systémy pro správu překladů a dávají přednost manuálnímu zpracování překladů – buď přímo v dvojjazyčných souborech, nebo na hostovacích službách, jako je GitHub – toto dramaticky snižuje kontrolu, produktivitu, kvalitu, škálovatelnost a možnosti spolupráce. Takový přístup může být nejvýhodnější pro malé nebo jednorázové překladatelské projekty.

Rychlý přehled některých z nejvýkonnějších a nejpoužívanějších nástrojů pro správu překladů:

**Nejlepší pro crowdsourcing a spolupráci**

[Crowdin](https://crowdin.com/)

- Zdarma pro open-source projekty (neomezený počet řetězců a projektů)
- Překladová paměť (TM) a glosář jsou k dispozici u všech plánů
- Více než 60 podporovaných formátů souborů, více než 70 integrací API

[Lokalise](https://lokalise.com/)

- Zdarma pro 2 členy týmu, placené plány pro více přispěvatelů (omezený počet řetězců pro většinu plánů)
- Překladová paměť (TM) a glosář jsou k dispozici u některých placených plánů
- Více než 30 podporovaných formátů souborů, více než 40 integrací API

[Transifex](https://www.transifex.com/)

- Pouze placené plány (omezený počet řetězců pro většinu plánů)
- Překladová paměť (TM) a glosář jsou k dispozici u všech placených plánů
- Více než 30 podporovaných formátů souborů, více než 20 integrací API

[Phrase](https://phrase.com/)

- Pouze placené plány (neomezený počet řetězců pro všechny plány, omezený počet projektů a členů týmu)
- Překladová paměť (TM) a glosář jsou k dispozici u některých placených plánů
- Více než 40 podporovaných formátů souborů, více než 20 integrací API

[Smartcat](https://www.smartcat.com/)

- Základní bezplatný plán s placenými pokročilými funkcemi (neomezený počet řetězců a projektů pro všechny plány)
- Překladová paměť (TM) a glosář jsou k dispozici u všech plánů
- Více než 60 podporovaných formátů souborů, více než 20 integrací API

[POEditor](https://poeditor.com/)

- Zdarma pro open-source projekty (omezený počet řetězců pro všechny projekty, neomezený pro open-source projekty)
- Překladová paměť (TM) a glosář jsou k dispozici pro placené plány
- Více než 20 podporovaných formátů souborů, více než 10 integrací API

a mnoho dalších...

**Profesionální překladatelské nástroje**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Placené plány pro nezávislé překladatele a týmy
- Velmi výkonný nástroj pro počítačem podporovaný překlad (CAT) a software pro produktivitu překladatelů

[MemoQ](https://www.memoq.com/)

- Omezená bezplatná verze je k dispozici s několika placenými plány pro pokročilé funkce
- Software pro správu překladů pro společnosti, poskytovatele jazykových služeb a překladatele

[Memsource](https://www.memsource.com/)

- Zdarma pro jednotlivé překladatele s několika placenými plány pro týmy
- Cloudový systém pro počítačem podporovaný překlad a správu překladů

a mnoho dalších...

Přečtěte si více o softwaru pro správu překladů:

[Definice systémů pro správu překladů na Wikipedii](https://en.wikipedia.org/wiki/Translation_management_system)

[Phrase o 7 věcech, které by měl mít každý software pro správu překladů](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ o tom, co je systém pro správu překladů](https://www.memoq.com/tools/what-is-a-translation-management-system)

[Seznam 16 nejlepších systémů pro správu překladů od Gengo](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Pracovní postup {#workflow}

V oblasti překladu může pracovní postup překladu znamenat několik různých věcí, které jsou vzájemně propojené a představují důležité aspekty pro váš projekt.

Níže se budeme zabývat oběma.

**Význam 1**

Toto je pravděpodobně nejběžnější způsob přemýšlení o pracovních postupech překladu a něco, co se obvykle vybaví při slyšení slova pracovní postup.

V podstatě se jedná o ‚tok práce‘ od počáteční úvahy o překladech až po použití přeloženého obsahu ve vašem produktu.

Příklad pracovního postupu v tomto případě by byl:

1. **Příprava souborů k překladu** – Zní to jednoduše, ale je třeba zvážit několik důležitých věcí. V tomto kroku byste měli mít jasný plán, jak by měl celý proces fungovat.

- _Jaké typy souborů budete používat?_ V jakém formátu chcete přeložené soubory obdržet?_
  - Pokud je váš obsah k dispozici ve formátu DOCX nebo MD, bude přístup mnohem jednodušší, než když překládáte PDF verzi vaší Bílé knihy nebo jiných dokumentů.
- _Které lokalizační nástroje podporují tento typ souboru?_ Lze soubor přeložit tak, aby se zachovalo původní formátování?_
  - Ne všechny typy souborů podporují přímou lokalizaci (např. soubory PDF, obrázkové soubory) a ne všechny lokalizační nástroje podporují všechny typy souborů.
- _Kdo bude obsah překládat?_ Objednáte si profesionální překlady, nebo se budete spoléhat na dobrovolníky?_
  - To ovlivňuje řadu dalších rozhodnutí, která musíte učinit. Například profesionální překladatelé jsou při práci s pokročilými lokalizačními nástroji pohodlnější než dobrovolníci.
- _Jaká jsou vaše očekávání od lingvistů?_ Pokud využíváte poskytovatele jazykových služeb, co od vás očekávají oni?_
  - V tomto kroku je třeba zajistit, aby vaše cíle, očekávání a časové plány byly v souladu.
- _Je veškerý obsah k překladu stejně důležitý?_ Měl by se některý obsah přeložit jako první?_
  - Existují způsoby, jak upřednostnit určitý obsah, který by měl být přeložen a implementován jako první. Pokud máte například velké množství obsahu k překladu, můžete použít správu verzí, abyste zajistili, že překladatelé budou vědět, čemu mají dát přednost.

2. **Sdílení souborů k překladu** – Tento krok také vyžaduje dlouhodobé přemýšlení a není tak jednoduchý jako pouhé zaslání zdrojových souborů poskytovateli jazykových služeb.

- _Kdo bude obsah překládat?_ Kolik lidí se do tohoto procesu zapojí?_
  - Pokud plánujete použít lokalizační nástroj, je tento krok zjednodušen, protože zdrojové soubory můžete nahrát přímo do nástroje. To platí i v případě, že proces překladu probíhá na hostovací službě, protože zdrojové soubory není třeba nikam exportovat.
- _Budou zdrojové soubory zpracovávány ručně, nebo lze tento proces automatizovat?_
  - Většina lokalizačních nástrojů umožňuje nějaký typ integrace nebo automatizace procesu správy souborů. Na druhou stranu, pokud pracujete s jednotlivými překladateli a nepoužíváte lokalizační nástroj, ruční zasílání zdrojových souborů stovkám nebo tisícům překladatelů není škálovatelný proces.
- _Jaké nástroje budou pro lokalizaci použity?_
  - Odpověď na tuto otázku určí, jak budete přistupovat ke všemu ostatnímu. Výběr správného nástroje vám může pomoci automatizovat správu obsahu, správu překladové paměti a glosáře, správu překladatelů, sledování průběhu překladu/revize atd., takže si dejte čas a prozkoumejte, který nástroj chcete použít. Pokud neplánujete používat lokalizační nástroj, vše výše uvedené bude nutné provést ručně.
- _Jak dlouho bude proces překladu trvat?_ Kolik to bude stát?_
  - V tomto bodě byste měli být připraveni sdílet zdrojové soubory s poskytovatelem jazykových služeb nebo skupinou překladatelů. Poskytovatel jazykových služeb vám může pomoci analyzovat počet slov a poskytnout cenovou nabídku, včetně sazeb a časového harmonogramu překladatelského procesu.
- _Plánujete během tohoto procesu provádět změny/aktualizace zdrojového obsahu?_
  - Pokud je váš obsah dynamický a často se mění, jakékoli změny nebo aktualizace mohou narušit postup překladu. Použití překladové paměti může tento problém výrazně zmírnit, i když je stále důležité přemýšlet o tom, jak bude proces fungovat a jak můžete zabránit zmaření pokroku, kterého překladatelé dosahují.

3. **Řízení překladatelského procesu** – Vaše práce nekončí předáním zdrojového obsahu poskytovateli jazykových služeb nebo překladatelům. Pro zajištění optimální kvality překladů by se tvůrci obsahu měli co nejvíce zapojit do procesu překladu.

- _Jakým způsobem plánujete komunikovat s překladateli?_
  - Pokud plánujete používat lokalizační nástroj, komunikace může probíhat přímo v tomto nástroji. Doporučuje se také zřídit alternativní komunikační kanál s překladateli, protože by se mohli méně zdráhat oslovit vás a nástroje pro zasílání zpráv umožňují volnější komunikaci.
- _Jak řešit dotazy překladatelů?_ Kdo by měl na tyto otázky odpovídat?_
  - Překladatelé (profesionální i neprofesionální) se často obracejí s dotazy a žádostmi o vysvětlení nebo dodatečný kontext, stejně jako se zpětnou vazbou a nápady na zlepšení. Odpovídání na tyto dotazy může často vést k lepšímu zapojení a kvalitě přeloženého obsahu. Je také cenné poskytnout jim co nejvíce zdrojů (např. příručky, tipy, terminologické pokyny, často kladené dotazy atd.).
- _Jak řešit proces revize?_ Chcete jej outsourcovat, nebo máte kapacity na provádění revizí interně?_
  - Ačkoli nejsou vždy nutné, revize jsou nedílnou součástí optimálního procesu překladu. Obvykle je nejsnadnější outsourcovat proces revize profesionálním revizorům. Pokud však máte velký mezinárodní tým, revize nebo zajištění kvality (QA) lze také provádět interně.

4. **Implementace přeloženého obsahu** – Poslední část pracovního postupu, kterou je však stále důležité zvážit předem.

- _Budou všechny překlady dokončeny ve stejnou dobu?_
  - Pokud ne, měli byste přemýšlet o tom, které překlady by měly být upřednostněny, jak sledovat probíhající překlady a jak se řeší implementace během překladů.
- _Jak vám bude přeložený obsah doručen?_ V jakém formátu bude?_
  - Toto je důležitá úvaha bez ohledu na to, jaký přístup použijete. Lokalizační nástroje vám umožňují udržovat kontrolu nad formátem cílového souboru a procesem exportu a obvykle podporují automatizaci, např. umožněním integrace s hostovací službou.
- _Jak budete implementovat překlady ve svém projektu?_
  - V některých případech to může být tak jednoduché jako nahrání přeloženého souboru nebo jeho přidání do vaší dokumentace. U složitějších projektů, jako jsou překlady webových stránek nebo aplikací, byste se však měli ujistit, že kód podporuje internacionalizaci, a předem stanovit, jak bude proces implementace probíhat.
- _Co se stane, když se formátování liší od zdrojového?_
  - Podobně jako výše, pokud překládáte jednoduché textové soubory, formátování pravděpodobně není zásadně důležité. U složitějších souborů, jako je obsah pro webové stránky nebo aplikace, však musí být formátování a kód totožné se zdrojovým, aby mohly být implementovány ve vašem projektu. Pokud ne, cílové soubory bude třeba upravit, a to buď překladateli, nebo vašimi vývojáři.

**Význam 2**

Alternativní pracovní postup překladu, který nezohledňuje interní rozhodnutí a přístupy. Hlavním hlediskem je zde tok samotného obsahu.

Příklad pracovního postupu v tomto případě by byl:

1. _Překlad → Implementace_

- Nejjednodušší pracovní postup, kde překlad bude pravděpodobně lidský, protože neexistuje proces revize nebo zajištění kvality (QA) pro hodnocení kvality a úpravu překladů před implementací.
- S tímto pracovním postupem je důležité, aby překladatelé dokázali udržet určitou úroveň kvality, což bude vyžadovat odpovídající zdroje a komunikaci mezi projektovými manažery a překladateli.

2. _Překlad → Revize → Implementace_

- Pokročilejší pracovní postup, který zahrnuje proces revize a úprav, aby se zajistila přijatelná a konzistentní kvalita překladů.
- Existuje řada přístupů k tomuto pracovnímu postupu, kde překlady mohou provádět profesionální překladatelé nebo dobrovolníci, zatímco proces revize budou pravděpodobně provádět profesionální revizoři, kteří jsou obeznámeni se všemi gramatickými a pravopisnými pravidly, která je třeba v cílovém jazyce dodržovat.

3. _Překlad → Revize → Zajištění kvality (QA) → Implementace_

- Optimální pracovní postup pro zajištění nejvyšší úrovně kvality. Ačkoli zajištění kvality (QA) není vždy nutné, může být užitečné pro získání lepší představy o kvalitě přeloženého textu po překladu a revizi.
- S tímto pracovním postupem mohou překlady provádět výhradně dobrovolníci nebo dokonce strojový překlad. Proces revize by měli provádět profesionální překladatelé, zatímco zajištění kvality (QA) může provádět poskytovatel jazykových služeb nebo interně, pokud máte zaměstnance, kteří jsou rodilými mluvčími cílových jazyků.

Přečtěte si více o pracovních postupech překladu:

[Pravidla obsahu o pěti fázích pracovního postupu překladu](https://contentrules.com/creating-translation-workflow/)

[Smartling o tom, co je řízení pracovního postupu překladu](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans o pracovním postupu překladu](https://www.rixtrans.com/translation-workflow)

## Správa terminologie {#terminology-management}

Vytvoření jasného plánu, jak nakládat s terminologií, je jedním z nejdůležitějších kroků k zajištění kvality a konzistence vašich překladů a k úspoře času vašich překladatelů.

V oblasti překladu je to známo jako správa terminologie a je to jedna z klíčových služeb, které poskytovatelé jazykových služeb nabízejí svým klientům, kromě přístupu ke své skupině lingvistů a správě obsahu.

Správa terminologie označuje proces identifikace, shromažďování a správy terminologie, která je důležitá pro váš projekt a měla by být vždy překládána správně a konzistentně.

Při úvahách o správě terminologie je třeba dodržet několik kroků:

- Identifikujte klíčové termíny, které by měly být zahrnuty do terminologické databáze.
- Vytvořte glosář termínů a jejich definic.
- Přeložte termíny a přidejte je do glosáře.
- Zkontrolujte a schvalte překlady.
- Udržujte glosář a aktualizujte jej o nové termíny, jakmile se stanou důležitými.

Přečtěte si více o správě terminologie:

[Trados o tom, co je správa terminologie](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific o tom, proč je správa terminologie důležitá](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation o tom, co je správa terminologie a proč je důležitá](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Překladová paměť a glosář {#tm-and-glossary}

Překladová paměť a glosář jsou důležité nástroje v překladatelském průmyslu a něco, na co se většina poskytovatelů jazykových služeb spoléhá.

Podívejme se, co tyto termíny znamenají a jak se od sebe liší:

**Překladová paměť (TM)** – Databáze, která automaticky ukládá segmenty nebo řetězce, včetně delších bloků textu, celých vět, odstavců a jednotlivých termínů, stejně jako jejich současné a předchozí překlady v každém jazyce.

Většina lokalizačních nástrojů, systémů pro správu překladů a nástrojů pro počítačem podporovaný překlad má vestavěné překladové paměti, které lze obvykle exportovat a používat i v jiných podobných nástrojích.

Mezi výhody používání překladové paměti patří rychlejší překlady, lepší kvalita překladu, schopnost zachovat určité překlady při aktualizaci nebo změně zdrojového obsahu a levnější náklady na překlad opakovaného obsahu.

Překladové paměti fungují na základě procentuální shody mezi různými segmenty a obvykle jsou nejužitečnější, když dva segmenty obsahují více než 50 % stejného obsahu. Používají se také k automatickému překladu opakujících se segmentů, které jsou 100% shodné, čímž se odstraňuje potřeba překládat opakovaný obsah více než jednou.

Přečtěte si více o překladových pamětech:

[Memsource o překladových pamětech](https://www.memsource.com/translation-memory/)

[Smartling o tom, co je překladová paměť](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Glosář –** Seznam důležitých nebo citlivých termínů, jejich definic, funkcí a zavedených překladů. Hlavní rozdíl mezi glosářem a překladovou pamětí je v tom, že glosář se nevytváří automaticky a neobsahuje překlady celých vět.

Většina lokalizačních nástrojů, systémů pro správu překladů a nástrojů pro počítačem podporovaný překlad má vestavěné glosáře, které můžete udržovat, abyste zajistili, že budou obsahovat terminologii důležitou pro váš projekt. Stejně jako překladovou paměť lze glosář obvykle exportovat a používat v jiných lokalizačních nástrojích.

Před zahájením překladatelského projektu se důrazně doporučuje věnovat čas vytvoření glosáře pro vaše překladatele a revizory. Použití glosáře zajišťuje, že důležité termíny jsou přeloženy správně, poskytuje překladatelům tolik potřebný kontext a zaručuje konzistenci překladů.

Ačkoli glosáře nejčastěji obsahují zavedené překlady v cílových jazycích, jsou užitečné i bez nich. I bez zavedených překladů může glosář obsahovat definice technických termínů, zvýrazňovat termíny, které by se neměly překládat, a informovat překladatele, zda se konkrétní termín používá jako podstatné jméno, sloveso, vlastní jméno nebo jakýkoli jiný slovní druh.

Přečtěte si více o glosářích:

[Lionbridge o tom, co je překladatelský glosář](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex o glosářích](https://docs.transifex.com/glossary/glossary)

Pokud neplánujete pro svůj projekt používat lokalizační nástroj, pravděpodobně nebudete moci používat překladovou paměť a glosář (glosář nebo terminologickou databázi byste mohli vytvořit v souboru Excel, nicméně automatizované glosáře odstraňují potřebu, aby překladatelé ručně vyhledávali termíny a jejich definice).

To znamená, že veškerý opakující se a podobný obsah by se musel pokaždé ručně překládat. Navíc by překladatelé museli klást otázky, zda je třeba určitý termín přeložit či nikoli, jak se v textu používá a zda již má zavedený překlad.

_Chcete ve svém projektu použít překladovou paměť a glosář webu ethereum.org?_ Kontaktujte nás na adrese translations@ethereum.org._

## Oslovování překladatelů {#translator-outreach}

**Spolupráce s poskytovatelem jazykových služeb**

Pokud spolupracujete s poskytovatelem jazykových služeb a jejich profesionálními překladateli, tato část pro vás nemusí být příliš relevantní.

V tomto případě je důležité vybrat si poskytovatele jazykových služeb s kapacitou poskytovat všechny služby, které potřebujete (např. překlad, revize, zajištění kvality) v mnoha jazycích.

Ačkoli může být lákavé vybrat si poskytovatele jazykových služeb pouze na základě nabízených sazeb, je důležité si uvědomit, že největší poskytovatelé jazykových služeb mají vyšší sazby z nějakého důvodu.

- Mají v databázi desítky tisíc lingvistů, což znamená, že budou schopni vašemu projektu přidělit překladatele s dostatečnými zkušenostmi a znalostmi vašeho konkrétního odvětví (tj. technické překladatele).
- Mají významné zkušenosti s prací na různých projektech a s plněním rozmanitých potřeb svých klientů. To znamená, že se s větší pravděpodobností přizpůsobí vašemu konkrétnímu pracovnímu postupu, nabídnou cenné návrhy a potenciální vylepšení vašeho překladatelského procesu a splní vaše potřeby, požadavky a termíny.
- Většina největších poskytovatelů jazykových služeb má také své vlastní lokalizační nástroje, překladové paměti a glosáře, které můžete použít. Pokud ne, mají alespoň dostatek lingvistů ve své skupině, aby se ujistili, že jejich překladatelé budou obeznámeni a schopni pracovat s jakýmkoli lokalizačním nástrojem, který chcete použít.

Podrobné srovnání největších poskytovatelů jazykových služeb na světě, některé podrobnosti o každém z nich a rozdělení podle poskytovaných služeb, geografických údajů atd. najdete ve [zprávě Nimdzi 100 za rok 2021](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Spolupráce s neprofesionálními překladateli**

Možná spolupracujete s neprofesionálními překladateli a hledáte dobrovolníky, kteří by vám s překladem pomohli.

Existuje několik způsobů, jak oslovit lidi a pozvat je, aby se připojili k vašemu projektu. To bude do značné míry záviset na vašem produktu a na velikosti komunity, kterou již máte.

Některé způsoby zapojení dobrovolníků jsou uvedeny níže:

**Oslovování –** Ačkoli je toto téma částečně pokryto v bodech níže, oslovování potenciálních dobrovolníků a ujištění se, že jsou si vědomi vaší překladatelské iniciativy, může být samo o sobě účinné.

Mnoho lidí se chce zapojit a přispět ke svým oblíbeným projektům, ale často nevidí jasný způsob, jak to udělat, aniž by byli vývojáři nebo měli speciální technické dovednosti. Pokud dokážete šířit povědomí o svém projektu, mnoho dvojjazyčných lidí se pravděpodobně rádo zapojí.

**Hledání v rámci vaší komunity –** Většina projektů v tomto prostoru již má velké a aktivní komunity. Mnoho členů vaší komunity by pravděpodobně ocenilo možnost přispět k projektu jednoduchým způsobem.

Přestože přispívání do open-source projektů je často založeno na vnitřní motivaci, je to také fantastická příležitost k učení. Každý, kdo má zájem dozvědět se více o vašem projektu, by se pravděpodobně rád zapojil do překladatelského programu jako dobrovolník, protože by mu to umožnilo spojit skutečnost, že přispěl k něčemu, na čem mu záleží, s intenzivní praktickou zkušeností s učením.

**Zmínka o iniciativě ve vašem produktu –** Pokud je váš produkt oblíbený a používá ho velké množství lidí, může být zvýraznění vašeho překladatelského programu a výzva uživatelů k akci během používání produktu nesmírně účinná.

U aplikací a webových stránek to může být tak jednoduché jako přidání banneru nebo vyskakovacího okna s výzvou k akci do vašeho produktu. To je efektivní, protože vaše cílová skupina je vaše komunita – lidé, kteří se s největší pravděpodobností zapojí jako první.

**Sociální média –** Sociální média mohou být účinným způsobem, jak šířit povědomí o vašem překladatelském programu a oslovit členy vaší komunity, stejně jako další lidi, kteří ještě členy vaší komunity nejsou.

Pokud máte server na Discordu nebo kanál na Telegramu, je snadné je použít k oslovení, komunikaci s překladateli a uznání vašich přispěvatelů.

Platformy jako X (dříve Twitter) mohou být také užitečné pro zapojování nových členů komunity a veřejné uznání vašich přispěvatelů.

Linux Foundation vytvořila rozsáhlou [zprávu z průzkumu přispěvatelů FOSS v roce 2020](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), která analyzuje přispěvatele do open-source a jejich motivace.

## Závěr {#conclusion}

Tento dokument obsahuje několik klíčových úvah, o kterých by měl vědět každý překladatelský program. V žádném případě se nejedná o vyčerpávající příručku, i když může pomoci komukoli bez zkušeností v překladatelském průmyslu zorganizovat překladatelský program pro svůj projekt.

Pokud hledáte podrobnější pokyny a rozbory různých nástrojů, procesů a kritických aspektů řízení překladatelského programu, někteří z největších poskytovatelů jazykových služeb udržují blogy a často publikují články o různých aspektech lokalizačního procesu. Toto jsou nejlepší zdroje, pokud se chcete hlouběji ponořit do některého z výše uvedených témat a pochopit, jak profesionálně funguje lokalizační proces.

Některé relevantní odkazy jsou uvedeny na konci každé části; mnoho dalších zdrojů však můžete najít online.

Pro návrhy na spolupráci nebo další informace, poznatky a osvědčené postupy, které jsme získali při udržování překladatelského programu ethereum.org, nás neváhejte kontaktovat na adrese translations@ethereum.org.
