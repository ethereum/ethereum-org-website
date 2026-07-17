---
title: Jednoslotová finalita
description: Vysvětlení jednoslotové finality
lang: cs
---

Trvá přibližně 15 minut, než je blok [Etherea](/) finalizován. Můžeme však zajistit, aby mechanismus konsensu Etherea validoval bloky efektivněji a dramaticky zkrátil čas do finality. Místo patnáctiminutového čekání by bloky mohly být navrženy a finalizovány ve stejném slotu. Tento koncept je známý jako **jednoslotová finalita (SSF)**.

## Co je to finalita? {#what-is-finality}

V mechanismu konsensu Etherea založeném na důkazu podílem (PoS) finalita označuje záruku, že blok nemůže být změněn nebo odstraněn z blockchainu bez spálení alespoň 33 % celkového stakovaného ETH. Jedná se o „kryptoekonomickou“ bezpečnost, protože důvěra pramení z extrémně vysokých nákladů spojených se změnou pořadí nebo obsahu řetězce, což by odradilo jakéhokoli racionálního ekonomického aktéra od toho, aby se o to pokusil.

## Proč usilovat o rychlejší finalitu? {#why-aim-for-quicker-finality}

Současný čas do finality se ukázal být příliš dlouhý. Většina uživatelů nechce čekat 15 minut na finalitu a pro aplikace a burzy, které mohou vyžadovat vysokou propustnost transakcí, je nepohodlné čekat tak dlouho, aby měly jistotu, že jsou jejich transakce trvalé. Zpoždění mezi návrhem bloku a jeho finalizací také vytváří příležitost pro krátké reorganizace (reorgs), které by útočník mohl využít k cenzuře určitých bloků nebo k extrakci MEV. Mechanismus, který se zabývá povyšováním bloků ve fázích, je také poměrně složitý a byl již několikrát záplatován, aby se uzavřely bezpečnostní zranitelnosti, což z něj činí jednu z částí kódové základny Etherea, kde je vyšší pravděpodobnost výskytu nenápadných chyb. Všechny tyto problémy by mohly být odstraněny zkrácením času do finality na jediný slot.

## Kompromis mezi decentralizací, časem a režií {#the-decentralization-time-overhead-tradeoff}

Záruka finality není okamžitou vlastností nového bloku; trvá nějakou dobu, než je nový blok finalizován. Důvodem je, že validátoři zastupující alespoň 2/3 celkového stakovaného ETH v síti musí pro blok hlasovat („atestovat“), aby mohl být považován za finalizovaný. Každý validující uzel v síti musí zpracovat atestace od ostatních uzlů, aby věděl, zda blok dosáhl, nebo nedosáhl této 2/3 hranice.

Čím kratší je čas povolený k dosažení finalizace, tím více výpočetního výkonu je vyžadováno na každém uzlu, protože zpracování atestací musí probíhat rychleji. Navíc, čím více validujících uzlů v síti existuje, tím více atestací musí být pro každý blok zpracováno, což také zvyšuje požadavky na výpočetní výkon. Čím více výpočetního výkonu je vyžadováno, tím méně lidí se může zapojit, protože k provozu každého validujícího uzlu je zapotřebí dražší hardware. Prodloužení času mezi bloky snižuje výpočetní výkon vyžadovaný na každém uzlu, ale také prodlužuje čas do finality, protože atestace jsou zpracovávány pomaleji.

Proto existuje kompromis mezi režií (výpočetním výkonem), decentralizací (počtem uzlů, které se mohou podílet na validaci řetězce) a časem do finality. Ideální systém balancuje minimální výpočetní výkon, maximální decentralizaci a minimální čas do finality.

Současný mechanismus konsensu Etherea vyvážil tyto tři parametry následovně:

- **Nastavením minimálního staku na 32 ETH**. To stanovuje horní limit počtu atestací validátorů, které musí být zpracovány jednotlivými uzly, a tím i horní limit výpočetních požadavků pro každý uzel.
- **Nastavením času do finality na ~15 minut**. To poskytuje dostatek času validátorům běžícím na běžných domácích počítačích k bezpečnému zpracování atestací pro každý blok.

Při současném návrhu mechanismu je pro zkrácení času do finality nutné snížit počet validátorů v síti nebo zvýšit hardwarové požadavky pro každý uzel. Existují však vylepšení, která lze provést ve způsobu zpracování atestací a která umožní započítat více atestací bez zvýšení režie na každém uzlu. Efektivnější zpracování umožní určit finalitu v rámci jediného slotu, nikoli napříč dvěma epochami.

## Cesty k SSF {#routes-to-ssf}

<ExpandableCard title= "Why can't we have SSF today?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Současný mechanismus konsensu kombinuje atestace od více validátorů, známých jako výbory, aby se snížil počet zpráv, které musí každý validátor zpracovat k validaci bloku. Každý validátor má příležitost atestovat v každé epoše (32 slotů), ale v každém slotu atestuje pouze podmnožina validátorů, známá jako „výbor“. Dělají to tak, že se rozdělí do podsítí, ve kterých je několik validátorů vybráno jako „agregátoři“. Tito agregátoři pak zkombinují všechny podpisy, které vidí od ostatních validátorů ve své podsíti, do jednoho agregovaného podpisu. Agregátor, který zahrne největší počet individuálních příspěvků, předá svůj agregovaný podpis navrhovateli bloku, který jej zahrne do bloku spolu s agregovanými podpisy od ostatních výborů.

Tento proces poskytuje dostatečnou kapacitu pro to, aby každý validátor mohl hlasovat v každé epoše, protože `32 slots * 64 committees * 256 validators per committee = 524,288 validators per epoch`. V době psaní tohoto textu (únor 2023) existuje ~513 000 aktivních validátorů.

V tomto schématu je možné, aby každý validátor hlasoval o bloku pouze tak, že rozloží své atestace napříč celou epochou. Existují však potenciální způsoby, jak mechanismus vylepšit tak, aby _měl každý validátor šanci atestovat v každém slotu_.
</ExpandableCard>

Od doby, kdy byl navržen mechanismus konsensu Etherea, se zjistilo, že schéma agregace podpisů (BLS) je mnohem škálovatelnější, než se původně myslelo, a zároveň se zlepšila schopnost klientů zpracovávat a ověřovat podpisy. Ukazuje se, že zpracování atestací od obrovského počtu validátorů je ve skutečnosti možné v rámci jediného slotu. Například s jedním milionem validátorů, z nichž každý hlasuje dvakrát v každém slotu, a s časy slotů upravenými na 16 sekund, by uzly musely ověřovat podpisy minimální rychlostí 125 000 agregací za sekundu, aby zpracovaly všech 1 milion atestací v rámci slotu. Ve skutečnosti trvá běžnému počítači jedno ověření podpisu přibližně 500 nanosekund, což znamená, že 125 000 ověření lze provést za ~62,5 ms – hluboko pod hranicí jedné sekundy.

Dalšího zvýšení efektivity by bylo možné dosáhnout vytvořením supervýborů o velikosti např. 125 000 náhodně vybraných validátorů na slot. Pouze tito validátoři by mohli hlasovat o bloku, a proto by pouze tato podmnožina validátorů rozhodovala o tom, zda je blok finalizován. Zda je to dobrý nápad, nebo ne, závisí na tom, jak drahý by komunita chtěla mít úspěšný útok na Ethereum. Je to proto, že místo požadavku na 2/3 celkového stakovaného etheru by útočník mohl finalizovat nepoctivý blok pomocí 2/3 stakovaného etheru _v tomto supervýboru_. Toto je stále aktivní oblast výzkumu, ale zdá se pravděpodobné, že pro sadu validátorů dostatečně velkou na to, aby vůbec vyžadovala supervýbory, budou náklady na útok na jeden z těchto podvýborů extrémně vysoké (např. náklady na útok denominované v ETH by byly `2/3 * 125,000 * 32 = ~2.6 million ETH`). Náklady na útok lze upravit zvětšením velikosti sady validátorů (např. vyladit velikost validátorů tak, aby se náklady na útok rovnaly 1 milionu etherů, 4 milionům etherů, 10 milionům etherů atd.). [Předběžné průzkumy](https://youtu.be/ojBgyFl6-v4?t=755) komunity naznačují, že 1–2 miliony etherů jsou přijatelné náklady na útok, což znamená ~65 536 – 97 152 validátorů na supervýbor.

Ověřování však není skutečným úzkým hrdlem – to, co představuje pro validující uzly skutečnou výzvu, je agregace podpisů. Škálování agregace podpisů bude pravděpodobně vyžadovat zvýšení počtu validátorů v každé podsíti, zvýšení počtu podsítí nebo přidání dalších vrstev agregace (tj. implementaci výborů z výborů). Část řešení by mohla spočívat v povolení specializovaných agregátorů – podobně jako bude tvorba bloků a generování závazků pro rollup data outsourcováno specializovaným tvůrcům bloků v rámci oddělení navrhovatele a tvůrce (PBS) a dankshardingu.

## Jaká je role pravidla volby forku v SSF? {#role-of-the-fork-choice-rule}

Dnešní mechanismus konsensu spoléhá na úzké propojení mezi nástrojem finality (algoritmem, který určuje, zda 2/3 validátorů atestovaly určitý řetězec) a pravidlem volby forku (algoritmem volby forku, který rozhoduje, který řetězec je ten správný, když existuje více možností). Algoritmus volby forku bere v úvahu pouze bloky _od_ posledního finalizovaného bloku. V rámci SSF by neexistovaly žádné bloky, které by pravidlo volby forku mohlo zvažovat, protože finalita nastává ve stejném slotu, ve kterém je blok navržen. To znamená, že v rámci SSF by byl v danou chvíli aktivní _buď_ algoritmus volby forku, _nebo_ nástroj finality. Nástroj finality by finalizoval bloky tam, kde by byly 2/3 validátorů online a poctivě by atestovaly. Pokud by blok nebyl schopen překročit hranici 2/3, nastoupilo by pravidlo volby forku, aby určilo, který řetězec následovat. To také vytváří příležitost k zachování mechanismu úniku za neaktivitu, který obnovuje řetězec v případě, že se >1/3 validátorů odpojí, i když s určitými dodatečnými nuancemi.

## Nevyřešené problémy {#outstanding-issues}

Problém se škálováním agregace prostřednictvím zvyšování počtu validátorů na podsíť spočívá v tom, že to vede k větší zátěži peer-to-peer sítě. Problém s přidáváním vrstev agregace je ten, že je to inženýrsky poměrně složité a přidává to latenci (tj. mohlo by trvat déle, než navrhovatel bloku obdrží informace od všech agregátorů podsítí). Není také jasné, jak se vypořádat se scénářem, kdy je v síti více aktivních validátorů, než lze reálně zpracovat v každém slotu, a to i s agregací podpisů BLS. Jedním z potenciálních řešení je, že vzhledem k tomu, že všichni validátoři atestují v každém slotu a v rámci SSF neexistují žádné výbory, mohl by být limit 32 ETH na efektivní zůstatek zcela odstraněn. To by znamenalo, že operátoři spravující více validátorů by mohli konsolidovat svůj stake a provozovat jich méně, čímž by se snížil počet zpráv, které musí validující uzly zpracovat, aby pokryly celou sadu validátorů. To spoléhá na to, že velcí stakeři budou souhlasit s konsolidací svých validátorů. Je také možné kdykoli zavést pevný limit na počet validátorů nebo množství stakovaného ETH. To však vyžaduje nějaký mechanismus pro rozhodování o tom, kterým validátorům je povoleno se účastnit a kterým ne, což může vyvolat nežádoucí sekundární efekty.

## Současný pokrok {#current-progress}

SSF je ve fázi výzkumu. Neočekává se, že bude nasazena dříve než za několik let, pravděpodobně až po dalších podstatných upgradech, jako jsou [Verkle stromy](/roadmap/verkle-trees/) a [danksharding](/roadmap/danksharding/).

## Další čtení {#further-reading}

- [Vitalik o SSF na EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Vitalikovy poznámky: Cesty k jednoslotové finalitě](https://notes.ethereum.org/@vbuterin/single_slot_finality)