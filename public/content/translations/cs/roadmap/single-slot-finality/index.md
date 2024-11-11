---
title: Finalita v jednom slotu
description: Vysvětlení finality v jednom slotu
lang: cs
---

# Finalita v jednom slotu {#single-slot-finality}

Než se blok v síti Ethereum finalizuje, trvá to přibližně 15 minut. Nicméně, mechanismus konsenzu Etherea lze vylepšit tak, že bude bloky validovat efektivněji a výrazně zkrátí dobu do finality. Místo čekání patnáct minut by mohly být bloky navrženy a finalizovány ve stejném slotu. Tento koncept je známý pod pojmem **finalita v jednom slotu (SSF)**.

## What is finality? {#what-is-finality}

V mechanismu konsenzu Etherea založeném na důkazu podílem znamená finalita záruku, že blok nemůže být změněn nebo odstraněn z blockchainu, aniž by útočník musel spálit alespoň 33 % celkového uzamčeného ETH. Jedná se o „krypto-ekonomickou“ bezpečnost, protože důvěra je založena na extrémně vysokých nákladech spojených se změnou pořadí nebo obsahu řetězce, což zabraňuje jakémukoli racionálnímu ekonomickému subjektu se o takovou změnu vůbec pokoušet.

## Proč se snažit o rychlejší finalitu? {#why-aim-for-quicker-finality}

Současná doba do finality se ukázala být příliš dlouhá. Většina uživatelů nechce čekat 15 minut na finalitu, což je nepohodlné pro aplikace a burzy, které potřebují vysoký průtok transakcí a musí čekat tak dlouho, aby si byly jisté, že jejich transakce jsou trvalé. Prodleva mezi návrhem bloku a jeho finalizací také vytváří příležitost pro krátké reorganizace (reorg), které by útočník mohl využít k cenzuře určitých bloků nebo k extrakci MEV. Mechanismus, který se zabývá vylepšením bloků po etapách, je také poměrně složitý a několikrát se opravoval, aby se odstranily bezpečnostní zranitelnosti, což z něj činí jednu z částí kódu Etherea, kde je pravděpodobnější výskyt subtilních chyb. Všechny tyto problémy lze odstranit zkrácením doby do finality na jeden slot.

## Kompromis mezi decentralizací, časem a režijními náklady {#the-decentralization-time-overhead-tradeoff}

Záruka finality není okamžitou vlastností nového bloku – trvá nějaký čas, než se nový blok finalizuje. Důvodem je, že validátoři představující alespoň 2/3 celkového uzamčeného ETH v síti musí pro blok hlasovat („atestovat ho“), aby byl považován za finalizovaný. Každý validační uzel v síti musí zpracovávat atestace od ostatních uzlů, aby věděl, zda blok dosáhl nebo nedosáhl hranice 2/3.

Čím kratší je čas povolený k dosažení finality, tím více výpočetního výkonu je potřeba na každém uzlu, protože zpracování atestace musí probíhat rychleji. Dále, čím více je v síti validačních uzlů, tím více atestací musí být zpracováno pro každý blok, což opět zvyšuje potřebný výpočetní výkon. Čím více výpočetního výkonu je potřeba, tím méně lidí je může provádět, protože pro každý validační uzel je potřeba dražší hardware. Zvýšení času mezi bloky snižuje potřebný výpočetní výkon na každém uzlu, ale také prodlužuje dobu do finality, protože atestace jsou zpracovávány pomaleji.

Proto existuje kompromis mezi režijními náklady (výpočetním výkonem), decentralizací (počtem uzlů, které se mohou účastnit validace řetězce) a časem do finality. Ideální systém vyvažuje minimální výpočetní výkon, maximální decentralizaci a minimální čas do finality.

Současný mechanismus konsenzu Etherea vyvážil tyto tři parametry takto:

- **Stanovením minimálního uzamčení na 32 ETH**. To stanovuje horní hranici počtu atestací od validátorů, které musí být zpracovány jednotlivými uzly, a tedy i horní hranici výpočetních požadavků pro každý uzel.
- **Stanovením času do finality na ~15 minut**. To poskytuje dostatek času validátorům spuštěným na běžných domácích počítačích bezpečně zpracovat atestace pro každý blok.

S aktuálním návrhem mechanismu je pro zkrácení času do finality nutné snížit počet validátorů v síti nebo zvýšit hardwarové požadavky pro každý uzel. Existují však vylepšení způsobu zpracování atestací, což může umožnit započítání více atestací, aniž by se zvýšily režijní náklady na každý uzel. Efektivnější zpracování umožní určit finalitu v rámci jednoho slotu, namísto dvou epoch.

## Cesty k finalitě v jednom slotu (SSF) {#routes-to-ssf}

<ExpandableCard title= "Proč není finalita v jednom slotu v současnosti reálná?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Současný mechanismus konsenzu kombinuje atestace od více validátorů, známých jako komise, aby se snížil počet zpráv, které každý validátor musí zpracovat k ověření bloku. Každý validátor má možnost atestovat blok v každé epoše (32 slotů), ale v každém slotu atestuje pouze podmnožina validátorů, známá jako „komise“. Tito validátoři se dělí do podsítí, kde je několik validátorů vybráno jako „agregátoři“. Ti kombinují všechny podpisy, které vidí od ostatních validátorů ve své podsíti, do jednoho agregovaného podpisu. Agregátor, který zahrne největší počet individuálních příspěvků, předá svůj agregovaný podpis navrhovateli bloku, který ho zahrne do bloku spolu s agregovaným podpisem od ostatních komisí.

Tento proces poskytuje dostatečnou kapacitu, aby mohl každý validátor hlasovat v každé epoše, protože „32 slotů * 64 komisí * 256 validátorů na komisi = 524 288 validátorů na epochu“. V době psaní tohoto textu (únor 2023) je aktivních přibližně 513 000 validátorů.

V tomto schématu je možné, aby každý validátor hlasoval o bloku pouze rozdělením atestací napříč celou epochou. Existují však potenciální způsoby, jak tento mechanismus vylepšit, aby _měl každý validátor možnost atestovat každý slot_.
</ExpandableCard>

Od doby navržení mechanismu konsenzu Etherea se ukázalo, že schéma agregace podpisů (BLS) je mnohem škálovatelnější, než se původně zdálo, a že schopnost klientů zpracovávat a ověřovat podpisy se také zlepšila. Ukazuje se, že zpracování atestací od obrovského množství validátorů je ve skutečnosti možné v rámci jednoho slotu. Např. s jedním milionem validátorů, kteří každý hlasují dvakrát v každém slotu, a časem slotu nastaveným na 16 sekund, by uzly musely ověřovat podpisy rychlostí alespoň 125 000 agregací za sekundu, aby zpracovaly celý 1 milion atestací v rámci slotu. Ve skutečnosti trvá běžnému počítači přibližně 500 nanosekund ověřit jeden podpis, což znamená, že 125 000 podpisů může být ověřeno za ~62,5 ms, což je výrazně pod hranicí jedné sekundy.

Dalšího zvýšení efektivity by mohlo být dosaženo vytvořením superkomisí, např. o 125 000 náhodně vybraných validátorech na slot. Jen tito validátoři by mohli hlasovat o bloku a tudíž by jen tato podmnožina validátorů rozhodovala, zda bude blok finalizován. Jestli je to dobrý nápad, závisí na tom, jak drahý by komunita chtěla, aby byl úspěšný útok na Ethereum. Protože místo vyžadování 2/3 celkového uzamčeného etheru by útočník mohl finalizovat nepoctivý blok s 2/3 uzamčeného etheru _v této superkomisi_. Toto je stále aktivně zkoumáno, ale zdá se pravděpodobné, že pro množinu validátorů dostatečně velkou na to, aby vyžadovala superkomise, bude náklad na útok na jednu z těchto podkomisí extrémně vysoký (např. náklady na útok denominované v ETH by byly `2/3 * 125 000 * 32 = ~2,6 milionu ETH`). Náklady na útok mohou být upraveny zvýšením velikosti množiny validátorů (např. nastavením velikosti validátorské množiny tak, aby náklady na útok činily 1 milion etherů, 4 miliony etherů, 10 milionů etherů atd.). [Předběžné průzkumy](https://youtu.be/ojBgyFl6-v4?t=755) komunity naznačují, že 1–2 miliony etherů jsou přijatelnými náklady na útok, což implikuje ~65 536–97 152 validátorů na superkomisi.

Nicméně ověřování není skutečnou překážkou – tou je agregace podpisů, která reálně zatěžuje validační uzly. Aby se agregace podpisů škálovala, bude pravděpodobně nutné zvýšit počet validátorů v každé podsíti, zvýšit počet podsítí nebo přidat další vrstvy agregace (tj. implementovat komise komisí). Část řešení by mohla spočívat v povolení specializovaných agregátorů – podobně jako budou sestavování bloků a generování závazků pro data rollupů outsourcována specializovaným sestavovatelům bloků v rámci oddělení navrhovatele a sestavovatele (PBS) a Dankshardingu.

## Jaká je role pravidla pro volbu větve v SSF? {#role-of-the-fork-choice-rule}

Dnešní mechanismus konsenzu spoléhá na těsné propojení mezi finalizačním gadgetem (algoritmem, který určuje, zda 2/3 validátorů atestovalo určitý řetězec) a pravidlem pro volbu větve (algoritmem, který rozhoduje, který řetězec je správný, když existuje více možností). Algoritmus pro volbu větve zohledňuje pouze bloky _od_ posledního finalizovaného bloku. Pod SSF by nebyly žádné bloky, které by algoritmus pro volbu větve mohl zohlednit, protože finalita nastává ve stejném slotu, ve kterém je blok navržen. To znamená, že pod SSF by byl kdykoliv aktivní _buď_ finalizační gadget, _nebo_ algoritmus pro volbu větve. Finalizační gadget by finalizoval bloky, kde by byly online a poctivě atestovaly 2/3 validátorů. Pokud by blok nedokázal překročit hranici 2/3, nastoupilo by pravidlo pro volbu větve, aby určilo, který řetězec sledovat. To také vytváří příležitost zachovat mechanismus neaktivity, který obnovuje řetězec, když je > 1/3 validátorů offline, byť s určitými dalšími nuancemi.

## Nevyřešené problémy {#outstanding-issues}

Problém se škálováním agregace rozšířením počtu validátorů na podsíť spočívá ve zvýšení zátěže peer-to-peer sítě. Problém s přidáním vrstev agregace je zvýšená složitost z technického hlediska, což přidává latenci (tj. může trvat déle, než se navrhovateli bloku ozvou všichni agregátoři podsítí). Není také jasné, jak se vypořádat se scénářem, kdy je na síti více aktivních validátorů, než lze zpracovat v každém slotu, i při BLS agregaci podpisů. Jedním z možných řešení je, že by mohl být úplně odstraněn strop 32 ETH na efektivní zůstatek, protože všichni validátoři atestují každý slot a pod SSF nejsou žádné komise, což by znamenalo, že operátoři spravující více validátorů by mohli konsolidovat své uzamčení a provozovat méně validátorů, čímž by se snížil počet zpráv, které musí validační uzly zpracovat za účelem zohlednění celého množství validátorů. Toto spoléhá na fakt, že velcí uzamykatelé budou souhlasit s konsolidací svých validátorů. Je také možné kdykoliv zavést pevný strop počtu validátorů nebo množství uzamčeného ETH. To však vyžaduje nějaký mechanismus rozhodnutí, kteří validátoři se mohou účastnit a kteří ne, což je náchylné k vytvoření nežádoucích sekundárních efektů.

## Aktuální průběh {#current-progress}

SSF je ve fázi výzkumu. Neočekává se, že bude spuštěno v nejbližších letech, pravděpodobně se ho dočkáme až po dalších podstatných vylepšeních, jako jsou [Verkle trees](/roadmap/verkle-trees/) a [Danksharding](/roadmap/danksharding/).

## Další informace {#further-reading}

- [Vitalik o SSF na EDCONu v roce 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Vitalikovy poznámky: Cesta k finalitě v jednom slotu](https://notes.ethereum.org/@vbuterin/single_slot_finality)
