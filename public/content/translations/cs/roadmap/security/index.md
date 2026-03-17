---
title: "Bezpečnější Ethereum"
description: "Ethereum je nejbezpečnější a nejvíce decentralizovaná platforma pro chytré kontrakty, která existuje. Nicméně stále je možné ho vylepšit, aby zůstalo odolné vůči jakékoliv úrovni útoků i v daleké budoucnosti."
lang: cs
image: /images/roadmap/roadmap-security.png
alt: "Plán Etherea"
template: roadmap
---

**Ethereum je již velmi bezpečná**, decentralizovaná platforma pro [chytré kontrakty](/glossary/#smart-contract). Nicméně stále je možné ho vylepšit, aby zůstalo odolné vůči jakémukoliv druhu útoků i v daleké budoucnosti. Mezi ně patří jemné změny ve způsobu, jakým se [klienti Etherea](/glossary/#consensus-client) vypořádávají s konkurenčními [bloky](/glossary/#block), a také zrychlení, s jakým síť považuje bloky za ["finalizované"](/developers/docs/consensus-mechanisms/pos/#finality) (což znamená, že je nelze změnit bez extrémních ekonomických ztrát pro útočníka).

Existují také vylepšení, která ztíží cenzuru transakcí tím, že navrhovatelé bloků nebudou mít přístup k aktuálnímu obsahu svých bloků, a další nové způsoby, jak identifikovat, kdy se klient snaží blockchain cenzorovat. Tato vylepšení společně vylepší protokol [důkazu podílem](/glossary/#pos) tak, aby uživatelé – od jednotlivců až po korporace – měli okamžitou důvěru ve své aplikace, data a aktiva na Ethereu.

## Výběry ze stakování {#staking-withdrawals}

Přechod z [důkazu prací](/glossary/#pow) na důkaz podílem začal tím, že průkopníci Etherea „stakovali“ své ETH do depozitního kontraktu. Tyto ETH jsou používány k ochraně sítě. Dne 12. dubna 2023 proběhla druhá aktualizace, která validátorům umožnila vybrat stakované ETH. Od té doby mohou validátoři uzamykat nebo vybírat ETH bez dřívějších omezení.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Přečtěte si o výběrech</ButtonLink>

## Obrana proti útokům {#defending-against-attacks}

Protokol důkaz podílem na Ethereu je stále možné vylepšovat. Jedním z nich je tzv. [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) – bezpečnější algoritmus pro výběr [větve](/glossary/#fork), který ztěžuje určité sofistikované typy útoků.

Snížení času, který Ethereum potřebuje k [finalizaci](/glossary/#finality) bloků, by poskytlo lepší uživatelskou zkušenost a zabránilo sofistikovaným útokům typu „reorg“, při kterých se útočníci snaží přeskupit velmi nedávné bloky, aby z nich vytěžili zisk nebo cenzurovali určité transakce. [**Finalizace v jednom slotu (SSF)**](/roadmap/single-slot-finality/) je **způsob, jak minimalizovat zpoždění finalizace**. V současnosti je časové okno bloků 15 minut, během kterých by teoreticky útočník mohl přesvědčit další validátory, aby bloky přeorganizovali. V případě SSF je to 0 minut. Uživatelé, od jednotlivců po aplikace a burzy, benefitují z rychlého ujištění, že jejich transakce nebudou zrušeny, a síť benefituje z toho, že zamezí celé řadě útoků.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Přečtěte si o finalizaci v jednom slotu</ButtonLink>

## Obrana proti cenzuře {#defending-against-censorship}

Decentralizace zabraňuje tomu, aby jednotlivci nebo malé skupiny [validátorů](/glossary/#validator) získali příliš velký vliv. Nové technologie uzamčení mohou pomoci zajistit, že validátoři Etherea zůstanou co nejvíce decentralizovaní, a zároveň je chrání proti hardwarovým, softwarovým a síťovým poruchám. To zahrnuje software, který sdílí odpovědnosti validátorů mezi více [uzly](/glossary/#node). Tomu se říká **technologie distribuovaných validátorů (DVT)**. [Staking pooly](/glossary/#staking-pool) jsou motivovány k používání DVT, protože to umožňuje více počítačům kolektivně se podílet na validaci, což přidává redundanci a odolnost proti chybám. Také rozděluje klíče validátorů mezi několik systémů, místo aby jeden operátor provozoval několik validátorů. To ztěžuje nepoctivým operátorům koordinaci útoků na Ethereum. Celkově je cílem dosáhnout bezpečnostních výhod tím, že jsou validátoři provozováni jako _komunity_, nikoliv jako jednotlivci.

<ButtonLink variant="outline-color" href="/staking/dvt/">Přečtěte si o technologii distribuovaných validátorů</ButtonLink>

Implementace **oddělení navrhovatele a stavitele (PBS)** výrazně zlepší vestavěné obranné mechanismy Etherea proti cenzuře. PBS umožňuje jednomu validátorovi vytvořit blok a jinému ho šířit po síti Ethereum. To zajišťuje, že zisky z profesionálních algoritmů na tvorbu bloků maximalizujících zisk jsou spravedlivěji sdíleny napříč sítí, **což zabraňuje koncentraci staků** u nejvýkonnějších institucionálních stakerů v průběhu času. Navrhovatel bloku si vybere nejziskovější blok, který mu nabídnul trh stavitelů bloků. Aby mohl cenzurovat, navrhovatel bloku by si často musel vybrat méně ziskový blok, což by bylo **ekonomicky iracionální a také zřejmé zbytku validátorů** v síti.

Existují potenciální doplňky k PBS, jako jsou šifrované transakce a inkluzní seznamy, které by mohly dále zlepšit odolnost Etherea proti cenzuře. Tyto funkce činí stavitele i navrhovatele bloků slepými k aktuálním transakcím zahrnutým v jejich blocích.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Přečtěte si o oddělení navrhovatele a stavitele bloků</ButtonLink>

## Ochrana validátorů {#protecting-validators}

Je možné, že by sofistikovaný útočník mohl identifikovat nadcházející validátory a spamovat je, aby jim zabránil v navrhování bloků; toto je známé jako útok **odepření služby (DoS)**. Implementace [**tajného výběru lídrů (SLE)**](/roadmap/secret-leader-election) bude chránit proti tomuto typu útoku tím, že zabrání tomu, aby byli navrhovatelé bloků předem známi. Toho je možné dosáhnout tak, že se konstantně promíchává sada kryptografických závazků reprezentujících kandidáty na navrhovatele bloků a implementuje jejich pořadí za účelem určení výběru validátora takovým způsobem, že pouze validátoři sami znají své pořadí předem.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Přečtěte si o tajném výběru lídrů</ButtonLink>

## Aktuální postup {#current-progress}

**Bezpečnostní vylepšení zahrnutá v plánu jsou v pokročilých stádiích výzkumu**, ale nečeká se, že budou implementována v nejbližší době. Další kroky pro view-merge, PBS, SSF a SLE jsou dokončení jejich specifikace a zahájení vývoje prototypů.
