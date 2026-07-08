---
title: Příručka překladatelského programu
metaTitle: Příručka překladatelského programu
lang: cs
description: Sbírka tipů a důležitých aspektů pro nastavení překladatelského programu
---

Angličtina je jedním z nejrozšířenějších jazyků na světě a zdaleka nejstudovanějším jazykem vůbec. Vzhledem k tomu, že angličtina je nejběžnějším jazykem používaným na internetu – zejména na sociálních sítích – a vícejazyčné programovací jazyky jsou vzácné, většina obsahu v oblasti blockchainu je nativně psána v angličtině.

Nicméně, jelikož více než 6 miliard lidí na světě (více než 75 % populace) anglicky vůbec nemluví, představuje to pro drtivou většinu světové populace obrovskou bariéru pro vstup do Etherea.

Z tohoto důvodu se stále více projektů v tomto odvětví snaží o překlad svého obsahu do různých jazyků a jeho lokalizaci pro globální komunity.

Poskytování vícejazyčného obsahu je jednoduchý a efektivní způsob, jak rozšiřovat svou globální komunitu, vzdělávat lidi, kteří nemluví anglicky, zajistit, aby váš obsah a komunikace zasáhly širší publikum, a usnadnit onboarding více lidem do tohoto odvětví.

Tato příručka si klade za cíl řešit běžné výzvy a mylné představy o lokalizaci obsahu. Poskytuje podrobného průvodce správou obsahu, procesem překladu a revize, zajištěním kvality, oslovováním překladatelů a dalšími důležitými aspekty procesu lokalizace.

## Správa obsahu {#content-management}

Správa překladového obsahu označuje proces automatizace překladatelského workflow, který odstraňuje potřebu opakující se manuální práce, zlepšuje efektivitu a kvalitu, umožňuje lepší kontrolu a usnadňuje spolupráci.

Existuje mnoho různých přístupů ke správě obsahu v procesu lokalizace v závislosti na obsahu a vašich potřebách.

Základním způsobem správy obsahu je vytváření dvojjazyčných souborů obsahujících zdrojový a cílový text. V překladatelství se to používá zřídka, protože to kromě jednoduchosti nenabízí žádné významné výhody.

Překladatelské agentury obvykle přistupují ke správě překladů pomocí softwaru pro správu překladů nebo lokalizačních nástrojů, které poskytují funkce pro řízení projektů a umožňují mnohem větší kontrolu nad soubory, obsahem a lingvisty.

Přečtěte si více o správě obsahu:

[Trados o tom, co je správa překladů](https://www.trados.com/solutions/translation-management/)

[Phrase o správě vícejazyčného obsahu](https://phrase.com/blog/posts/multilingual-content-management/)

### Software pro správu překladů {#translation-management-software}

Existuje mnoho systémů pro správu překladů a lokalizačních nástrojů a výběr softwaru závisí především na vašich potřebách.

Zatímco některé projekty se rozhodnou systémy pro správu překladů nepoužívat a raději řeší překlady manuálně – buď přímo ve dvojjazyčných souborech, nebo na hostingových službách, jako je GitHub – dramaticky to snižuje kontrolu, produktivitu, kvalitu, škálovatelnost a možnosti spolupráce. Takový přístup může být nejpřínosnější pro malé nebo jednorázové překladatelské projekty.

Rychlý pohled na některé z nejvýkonnějších a nejpoužívanějších nástrojů pro správu překladů:

**Nejlepší pro crowdsourcing a spolupráci**

[Crowdin](https://crowdin.com/)

- Zdarma pro open-source projekty (neomezený počet řetězců a projektů)
- Překladová paměť (TM) a glosář dostupné ve všech plánech
- Více než 60 podporovaných formátů souborů, více než 70 integrací API

[Lokalise](https://lokalise.com/)

- Zdarma pro 2 členy týmu, placené plány pro více přispěvatelů (omezený počet řetězců u většiny plánů)
- Překladová paměť (TM) a glosář dostupné v některých placených plánech
- Více než 30 podporovaných formátů souborů, více než 40 integrací API

[Transifex](https://www.transifex.com/)

- Pouze placené plány (omezený počet řetězců u většiny plánů)
- Překladová paměť (TM) a glosář dostupné ve všech placených plánech
- Více než 30 podporovaných formátů souborů, více než 20 integrací API

[Phrase](https://phrase.com/)

- Pouze placené plány (neomezený počet řetězců pro všechny plány, omezený počet projektů a členů týmu)
- Překladová paměť (TM) a glosář dostupné v některých placených plánech
- Více než 40 podporovaných formátů souborů, více než 20 integrací API

[Smartcat](https://www.smartcat.com/)

- Základní plán zdarma s placenými pokročilými funkcemi (neomezený počet řetězců a projektů pro všechny plány)
- Překladová paměť (TM) a glosář dostupné ve všech plánech
- Více než 60 podporovaných formátů souborů, více než 20 integrací API

[POEditor](https://poeditor.com/)

- Zdarma pro open-source projekty (omezený počet řetězců pro všechny projekty, neomezený pro open-source projekty)
- Překladová paměť (TM) a glosář dostupné pro placené plány
- Více než 20 podporovaných formátů souborů, více než 10 integrací API

a mnoho dalších...

**Profesionální překladatelské nástroje**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Placené plány pro překladatele na volné noze a týmy
- Velmi výkonný nástroj pro počítačem podporovaný překlad (CAT) a software pro produktivitu překladatelů

[MemoQ](https://www.memoq.com/)

- K dispozici je omezená bezplatná verze s několika placenými plány pro pokročilé funkce
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

## Workflow {#workflow}

V oblasti překladů může překladatelské workflow znamenat několik různých věcí, které spolu do jisté míry souvisejí a jsou důležitými aspekty pro váš projekt.

Níže prozkoumáme obě z nich.

**Význam 1**

Toto je pravděpodobně nejběžnější způsob uvažování o překladatelských workflow a něco, co se obvykle vybaví, když slyšíte slovo workflow.

Ve své podstatě jde o „tok práce“ od chvíle, kdy začnete o překladech uvažovat, až po použití přeloženého obsahu ve vašem produktu.

Příkladem workflow by v tomto případě bylo:

1. **Příprava souborů k překladu** – Zní to jednoduše, nicméně je třeba zvážit několik důležitých věcí. V tomto kroku byste měli mít jasný plán, jak by měl celý proces fungovat.

- _Jaké typy souborů budete používat? V jakém formátu chcete obdržet přeložené soubory?_
  - Pokud je váš obsah k dispozici ve formátu DOCX nebo MD, bude přístup mnohem přímočařejší, než když překládáte PDF verzi vaší bílé knihy nebo jiných dokumentů.
- _Které lokalizační nástroje podporují tento typ souboru? Lze soubor přeložit tak, aby si zachoval původní formátování?_
  - Ne všechny typy souborů podporují přímou lokalizaci (např. soubory PDF, obrazové soubory) a ne všechny lokalizační nástroje podporují všechny typy souborů.
- _Kdo bude obsah překládat? Budete si objednávat profesionální překlady, nebo se spolehnete na dobrovolníky?_
  - To ovlivňuje řadu dalších rozhodnutí, která musíte učinit. Například profesionální překladatelé pracují s pokročilými lokalizačními nástroji raději než dobrovolníci.
- _Jaká jsou vaše očekávání od lingvistů? Pokud využíváte poskytovatele jazykových služeb, co očekávají oni od vás?_
  - V tomto kroku se musíte ujistit, že jsou vaše cíle, očekávání a časové plány sladěny.
- _Je veškerý obsah k překladu stejně důležitý? Měl by být některý obsah přeložen jako první?_
  - Existují způsoby, jak upřednostnit určitý obsah, který by měl být přeložen a implementován jako první. Pokud máte například k překladu velké množství obsahu, můžete použít správu verzí, abyste se ujistili, že překladatelé vědí, co mají upřednostnit.

2. **Sdílení souborů k překladu** – Tento krok také vyžaduje určité dlouhodobé plánování a není tak přímočarý jako odeslání zdrojových souborů poskytovateli jazykových služeb.

- _Kdo bude obsah překládat? Kolik lidí se do tohoto procesu zapojí?_
  - Pokud plánujete použít lokalizační nástroj, je tento krok zjednodušen, protože zdrojové soubory můžete nahrát přímo do nástroje. To platí i v případě, že proces překladu probíhá na hostingové službě, protože zdrojové soubory není třeba nikam exportovat.
- _Budou se zdrojové soubory zpracovávat ručně, nebo lze tento proces automatizovat?_
  - Většina lokalizačních nástrojů umožňuje určitý typ integrace nebo automatizace procesu správy souborů. Na druhou stranu, pokud pracujete s jednotlivými překladateli a nepoužíváte lokalizační nástroj, ruční odesílání zdrojových souborů stovkám nebo tisícům překladatelů není škálovatelný proces.
- _Jaké nástroje se k lokalizaci použijí?_
  - Odpověď na tuto otázku určí, jak přistoupíte ke všemu ostatnímu. Výběr správného nástroje vám může pomoci automatizovat správu obsahu, správu překladové paměti a glosáře, správu překladatelů, sledování postupu překladu/revize atd., takže si udělejte čas a prozkoumejte, který nástroj chcete použít. Pokud neplánujete použít lokalizační nástroj, vše výše uvedené bude nutné provést ručně.
- _Jak dlouho bude proces překladu trvat? Kolik to bude stát?_
  - V této fázi byste měli být připraveni sdílet zdrojové soubory s poskytovatelem jazykových služeb nebo skupinou překladatelů. Poskytovatel jazykových služeb vám může pomoci analyzovat počet slov a poskytnout cenovou nabídku, včetně sazeb a časového harmonogramu procesu překladu.
- _Plánujete během tohoto procesu provádět změny/aktualizace zdrojového obsahu?_
  - Pokud je váš obsah dynamický a často se mění, jakékoli změny nebo aktualizace mohou narušit postup překladu. Použití překladové paměti to může výrazně zmírnit, i když je stále důležité přemýšlet o tom, jak bude proces fungovat a jak můžete zabránit zmaření pokroku, kterého překladatelé dosahují.

3. **Řízení procesu překladu** – Vaše práce nekončí předáním zdrojového obsahu poskytovateli jazykových služeb nebo překladatelům. Pro zajištění optimální kvality překladů by se tvůrci obsahu měli do procesu překladu zapojit co nejvíce.

- _Jak plánujete komunikovat s překladateli?_
  - Pokud plánujete používat lokalizační nástroj, komunikace může probíhat přímo v něm. Doporučuje se také nastavit alternativní komunikační kanál s překladateli, protože by se mohli méně zdráhat vás kontaktovat a nástroje pro zasílání zpráv umožňují plynulejší komunikaci.
- _Jak řešit dotazy překladatelů? Kdo by měl na tyto otázky odpovídat?_
  - Překladatelé (profesionální i neprofesionální) se často obracejí s dotazy a žádostmi o vysvětlení nebo dodatečný kontext, stejně jako se zpětnou vazbou a nápady na zlepšení. Odpovídání na tyto dotazy může často vést k lepšímu zapojení a vyšší kvalitě přeloženého obsahu. Je také cenné poskytnout jim co nejvíce zdrojů (např. průvodce, tipy, terminologické pokyny, často kladené dotazy atd.).
- _Jak řešit proces revize? Chcete jej outsourcovat, nebo máte kapacitu provádět revize interně?_
  - Ačkoli to není vždy nutné, revize jsou nedílnou součástí optimálního procesu překladu. Obvykle je nejjednodušší proces revize outsourcovat profesionálním revizorům. Pokud však máte velký mezinárodní tým, revize nebo zajištění kvality (QA) lze řešit i interně.

4. **Implementace přeloženého obsahu** – Poslední část workflow, kterou je však stále důležité zvážit předem.

- _Budou všechny překlady dokončeny ve stejnou dobu?_
  - Pokud ne, měli byste se zamyslet nad tím, které překlady by měly být upřednostněny, jak sledovat probíhající překlady a jak se řeší implementace během provádění překladů.
- _Jak vám bude přeložený obsah doručen? V jakém bude formátu?_
  - To je důležitý aspekt bez ohledu na to, jaký přístup zvolíte. Lokalizační nástroje vám umožňují udržet si kontrolu nad formátem cílového souboru a procesem exportu a obvykle podporují automatizaci, např. tím, že umožňují integraci s hostingovou službou.
- _Jak budete překlady implementovat do svého projektu?_
  - V některých případech to může být tak jednoduché jako nahrání přeloženého souboru nebo jeho přidání do vaší dokumentace. U složitějších projektů, jako jsou překlady webových stránek nebo aplikací, byste se však měli ujistit, že kód podporuje internacionalizaci, a předem stanovit, jak bude proces implementace probíhat.
- _Co se stane, když se formátování liší od zdroje?_
  - Podobně jako výše, pokud překládáte jednoduché textové soubory, formátování pravděpodobně není kriticky důležité. U složitějších souborů, jako je obsah pro webové stránky nebo aplikace, však musí být formátování a kód totožné se zdrojem, aby mohly být implementovány do vašeho projektu. Pokud tomu tak není, cílové soubory bude nutné upravit, a to buď překladateli, nebo vašimi vývojáři.

**Význam 2**

Alternativní překladatelské workflow, které nezohledňuje interní rozhodnutí a přístupy. Hlavním hlediskem je zde tok samotného obsahu.

Příkladem workflow by v tomto případě bylo:

1. _Překlad → Implementace_

- Nejjednodušší workflow, kde překlad bude pravděpodobně lidský, protože neexistuje žádný proces revize nebo QA k vyhodnocení kvality a úpravě překladů před implementací.
- U tohoto workflow je důležité, aby si překladatelé dokázali udržet určitou úroveň kvality, což bude vyžadovat odpovídající zdroje a komunikaci mezi projektovými manažery a překladateli.

2. _Překlad → Revize → Implementace_

- Pokročilejší workflow, které zahrnuje proces revize a úprav, aby se zajistilo, že kvalita překladů je přijatelná a konzistentní.
- K tomuto workflow existuje řada přístupů, kdy překlady mohou provádět profesionální překladatelé nebo dobrovolníci, zatímco proces revize budou pravděpodobně zajišťovat profesionální revizoři, kteří jsou obeznámeni se všemi gramatickými a pravopisnými pravidly, která je třeba v cílovém jazyce dodržovat.

3. _Překlad → Revize → QA → Implementace_

- Optimální workflow pro zajištění nejvyšší úrovně kvality. Ačkoli QA není vždy nutné, může být užitečné k získání lepší představy o kvalitě přeloženého textu po překladu a revizi.
- S tímto workflow by překlady mohly být prováděny výhradně dobrovolníky nebo dokonce strojovým překladem. Proces revize by měli provádět profesionální překladatelé, zatímco QA může provádět poskytovatel jazykových služeb nebo interně, pokud máte zaměstnance, kteří jsou rodilými mluvčími cílových jazyků.

Přečtěte si více o překladatelských workflow:

[Pravidla obsahu o pěti fázích překladatelského workflow](https://contentrules.com/creating-translation-workflow/)

[Smartling o tom, co je správa překladatelského workflow](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans o překladatelském workflow](https://www.rixtrans.com/translation-workflow)

## Správa terminologie {#terminology-management}

Vytvoření jasného plánu, jak nakládat s terminologií, je jedním z nejdůležitějších kroků k zajištění kvality a konzistence vašich překladů a k úspoře času vašich překladatelů.

V oblasti překladů je to známé jako správa terminologie a je to jedna z klíčových služeb, které poskytovatelé jazykových služeb nabízejí svým klientům, kromě přístupu k jejich skupině lingvistů a správě obsahu.

Správa terminologie označuje proces identifikace, shromažďování a správy terminologie, která je pro váš projekt důležitá a měla by být vždy překládána správně a konzistentně.

Při úvahách o správě terminologie je třeba dodržet několik kroků:

- Identifikujte klíčové termíny, které by měly být zahrnuty do terminologické databáze.
- Vytvořte glosář termínů a jejich definic.
- Přeložte termíny a přidejte je do glosáře.
- Zkontrolujte a schvalte překlady.
- Udržujte glosář a aktualizujte jej o nové termíny, jakmile se stanou důležitými.

Přečtěte si více o správě terminologie:

[Trados o tom, co je správa terminologie](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific o tom, proč záleží na správě terminologie](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation o tom, co je správa terminologie a proč na ní záleží](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Překladová paměť a glosář {#tm-and-glossary}

Překladová paměť a glosář jsou důležitými nástroji v překladatelském průmyslu a něčím, na co se většina poskytovatelů jazykových služeb spoléhá.

Pojďme se podívat, co tyto termíny znamenají a jak se od sebe liší:

**Překladová paměť (TM)** – Databáze, která automaticky ukládá segmenty nebo řetězce, včetně delších bloků textu, celých vět, odstavců a jednotlivých termínů, stejně jako jejich aktuální a předchozí překlady v každém jazyce.

Většina lokalizačních nástrojů, systémů pro správu překladů a nástrojů pro počítačem podporovaný překlad má vestavěné překladové paměti, které lze obvykle exportovat a použít i v jiných podobných nástrojích.

Mezi výhody používání překladové paměti patří rychlejší překlady, lepší kvalita překladu, schopnost zachovat určité překlady při aktualizaci nebo změně zdrojového obsahu a nižší náklady na překlad u opakujícího se obsahu.

Překladové paměti fungují na základě procentuální shody mezi různými segmenty a jsou obvykle nejužitečnější, když dva segmenty obsahují více než 50 % stejného obsahu. Používají se také k automatickému překladu opakujících se segmentů, které se shodují na 100 %, čímž odpadá nutnost překládat opakující se obsah více než jednou.

Přečtěte si více o překladových pamětech:

[Memsource o překladových pamětech](https://www.memsource.com/translation-memory/)

[Smartling o tom, co je překladová paměť](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Glosář –** Seznam důležitých nebo citlivých termínů, jejich definic, funkcí a zavedených překladů. Hlavní rozdíl mezi glosářem a překladovou pamětí spočívá v tom, že glosář se nevytváří automaticky a neobsahuje překlady celých vět.

Většina lokalizačních nástrojů, systémů pro správu překladů a nástrojů pro počítačem podporovaný překlad má vestavěné glosáře, které můžete spravovat, abyste zajistili, že obsahují terminologii důležitou pro váš projekt. Stejně jako TM lze glosář obvykle exportovat a použít v jiných lokalizačních nástrojích.

Před zahájením překladatelského projektu se důrazně doporučuje věnovat nějaký čas vytvoření glosáře pro vaše překladatele a revizory. Použití glosáře zajišťuje správný překlad důležitých termínů, poskytuje překladatelům tolik potřebný kontext a zaručuje konzistenci překladů.

Ačkoli glosáře nejčastěji obsahují zavedené překlady v cílových jazycích, jsou užitečné i bez nich. I bez zavedených překladů může glosář obsahovat definice technických termínů, zvýrazňovat termíny, které by se neměly překládat, a informovat překladatele, zda se konkrétní termín používá jako podstatné jméno, sloveso, vlastní jméno nebo jiný slovní druh.

Přečtěte si více o glosářích:

[Lionbridge o tom, co je překladový glosář](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex o glosářích](https://docs.transifex.com/glossary/glossary)

Pokud pro svůj projekt neplánujete použít lokalizační nástroj, pravděpodobně nebudete moci používat překladovou paměť a glosář (mohli byste vytvořit glosář nebo terminologickou databázi v souboru Excel, nicméně automatizované glosáře odstraňují nutnost, aby překladatelé ručně hledali termíny a jejich definice).

To znamená, že veškerý opakující se a podobný obsah by musel být pokaždé přeložen ručně. Kromě toho by se překladatelé museli obracet s dotazy, zda je třeba určitý termín přeložit či nikoli, jak se v textu používá a zda již má zavedený překlad.

_Chcete ve svém projektu použít překladovou paměť a glosář ethereum.org? Kontaktujte nás na adrese translations@ethereum.org._

## Oslovování překladatelů {#translator-outreach}

**Spolupráce s poskytovatelem jazykových služeb**

Pokud spolupracujete s poskytovatelem jazykových služeb a jeho profesionálními překladateli, tato část pro vás možná nebude příliš relevantní.

V tomto případě je důležité vybrat poskytovatele jazykových služeb s kapacitou poskytovat všechny služby, které potřebujete (např. překlad, revize, QA), v mnoha jazycích.

Ačkoli může být lákavé vybrat si poskytovatele jazykových služeb pouze na základě nabízených sazeb, je důležité si uvědomit, že největší poskytovatelé jazykových služeb mají vyšší sazby z nějakého důvodu.

- Mají ve své databázi desítky tisíc lingvistů, což znamená, že budou schopni k vašemu projektu přiřadit překladatele s dostatečnými zkušenostmi a znalostmi vašeho konkrétního odvětví (tj. technické překladatele).
- Mají značné zkušenosti s prací na různých projektech a plněním různorodých potřeb svých klientů. To znamená, že se s větší pravděpodobností přizpůsobí vašemu konkrétnímu workflow, nabídnou cenné návrhy a potenciální vylepšení vašeho procesu překladu a splní vaše potřeby, požadavky a termíny.
- Většina největších poskytovatelů jazykových služeb má také vlastní lokalizační nástroje, překladové paměti a glosáře, které můžete použít. Pokud ne, mají ve své skupině alespoň dostatek lingvistů, aby zajistili, že jejich překladatelé budou obeznámeni s jakýmkoli lokalizačním nástrojem, který chcete použít, a budou s ním schopni pracovat.

Podrobné srovnání největších poskytovatelů jazykových služeb na světě, některé podrobnosti o každém z nich a rozpisy podle poskytovaných služeb, geografických údajů atd. najdete ve [zprávě Nimdzi 100 z roku 2021](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Spolupráce s neprofesionálními překladateli**

Možná spolupracujete s neprofesionálními překladateli a hledáte dobrovolníky, kteří by vám s překladem pomohli.

Existuje několik způsobů, jak oslovit lidi a pozvat je, aby se připojili k vašemu projektu. To bude do značné míry záviset na vašem produktu a na tom, jak velkou komunitu již máte.

Některé způsoby onboardingu dobrovolníků jsou nastíněny níže:

**Oslovování –** Ačkoli je to do jisté míry pokryto v bodech níže, oslovení potenciálních dobrovolníků a zajištění toho, aby věděli o vaší překladatelské iniciativě, může být efektivní samo o sobě.

Mnoho lidí se chce zapojit a přispět ke svým oblíbeným projektům, ale často nevidí jasný způsob, jak to udělat, aniž by byli vývojáři nebo měli speciální technické dovednosti. Pokud dokážete rozšířit povědomí o svém projektu, mnoho bilingvních lidí se pravděpodobně rádo zapojí.

**Hledání ve vaší komunitě –** Většina projektů v tomto odvětví již má velké a aktivní komunity. Mnoho členů vaší komunity by pravděpodobně ocenilo možnost přispět k projektu jednoduchým způsobem.

Ačkoli je přispívání do open-source projektů často založeno na vnitřní motivaci, je to také fantastická vzdělávací zkušenost. Každý, kdo má zájem dozvědět se o vašem projektu více, by se pravděpodobně rád zapojil do překladatelského programu jako dobrovolník, protože by mu to umožnilo spojit skutečnost, že přispěl k něčemu, na čem mu záleží, s intenzivní praktickou zkušeností s učením.

**Zmínka o iniciativě ve vašem produktu –** Pokud je váš produkt populární a používá ho velké množství lidí, může být zdůraznění vašeho překladatelského programu a výzva uživatelů k akci během používání produktu extrémně efektivní.

Může to být tak jednoduché jako přidání banneru nebo vyskakovacího okna s výzvou k akci (CTA) do vašeho produktu pro aplikace a webové stránky. Je to efektivní, protože vaší cílovou skupinou je vaše komunita – lidé, u kterých je největší pravděpodobnost, že se zapojí.

**Sociální sítě –** Sociální sítě mohou být efektivním způsobem, jak šířit povědomí o vašem překladatelském programu a oslovit členy vaší komunity, stejně jako další lidi, kteří ještě členy vaší komunity nejsou.

Pokud máte server na Discordu nebo kanál na Telegramu, je snadné je použít k oslovování, komunikaci s vašimi překladateli a k ocenění vašich přispěvatelů.

Platformy jako X (dříve Twitter) mohou být také užitečné pro onboarding nových členů komunity a veřejné ocenění vašich přispěvatelů.

Linux Foundation vytvořila rozsáhlou [Zprávu o průzkumu přispěvatelů do FOSS z roku 2020](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), která analyzuje přispěvatele do open-source a jejich motivace.

## Závěr {#conclusion}

Tento dokument obsahuje některé klíčové aspekty, kterých by si měl být vědom každý překladatelský program. V žádném případě se nejedná o vyčerpávajícího průvodce, i když může pomoci komukoli bez zkušeností v překladatelském průmyslu zorganizovat překladatelský program pro svůj projekt.

Pokud hledáte podrobnější pokyny a rozpisy různých nástrojů, procesů a kritických aspektů řízení překladatelského programu, někteří z největších poskytovatelů jazykových služeb spravují blogy a často publikují články o různých aspektech procesu lokalizace. Toto jsou nejlepší zdroje, pokud se chcete hlouběji ponořit do některého z výše uvedených témat a pochopit, jak proces lokalizace funguje profesionálně.

Některé relevantní odkazy jsou uvedeny na konci každé části, nicméně online můžete najít mnoho dalších zdrojů.

Pro návrhy na spolupráci nebo další informace, poznatky a osvědčené postupy, které jsme získali při správě překladatelského programu ethereum.org, nás neváhejte kontaktovat na adrese translations@ethereum.org.