---
title: Bezpečnější Ethereum
description: Ethereum je nejbezpečnější a nejvíce decentralizovaná platforma pro chytré kontrakty, která existuje. Nicméně stále je možné ho vylepšit, aby zůstalo odolné vůči jakékoliv úrovni útoků i v daleké budoucnosti.
lang: cs
image: /images/roadmap/roadmap-security.png
alt: "Plán Etherea"
template: roadmap
---

**Ethereum už je velmi bezpečná** a decentralizovaná platforma pro [chytré kontrakty](/glossary/#smart-contract). Nicméně stále je možné ho vylepšit, aby zůstalo odolné vůči jakémukoliv druhu útoků i v daleké budoucnosti. To zahrnuje jemné změny v tom, jak se [klienti na Ethereu](/glossary/#consensus-client) chovají ke konkurenčním [blokům](/glossary/#block), stejně jako zrychlení procesu, kdy síť považuje bloky za [„finalizované“](/developers/docs/consensus-mechanisms/pos/#finality) (což znamená, že je nelze změnit bez extrémních ekonomických ztrát pro útočníka).

Existují také vylepšení, která ztíží cenzuru transakcí tím, že navrhovatelé bloků nebudou mít přístup k aktuálnímu obsahu svých bloků, a další nové způsoby, jak identifikovat, kdy se klient snaží blockchain cenzorovat. Tyto změny vylepší protokol [důkaz podílem](/glossary/#pos) tak, aby uživatelé – jak jednotlivci, tak firmy – měli okamžitou důvěru v aplikace, data a aktiva na Ethereu.

## Uzamčení výběrů {#staking-withdrawals}

Přechod z [důkazu prací](/glossary/#pow) na důkaz podílem začal tím, že první uživatelé na Ethereu „uzamkli“ své ETH do depozitního kontraktu. Tyto ETH jsou používány k ochraně sítě. 12. dubna 2023 byla provedena druhá aktualizace, která umožňuje výběr uzamčeného ETH. Od té doby mohou validátoři uzamykat nebo vybírat ETH bez dřívějších omezení.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Další informace o výběrech</ButtonLink>

## Obrana proti útokům {#defending-against-attacks}

Protokol důkaz podílem na Ethereu je stále možné vylepšovat. Jedno z vylepšení je známé jako [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) – bezpečnější algoritmus pro výběr [větve](/glossary/#fork), který ztěžuje určité sofistikované typy útoků.

Snížení času potřebného k [finalizaci](/glossary/#finality) bloků by poskytlo lepší uživatelskou zkušenost a zabránilo sofistikovaným „reorg“ útokům, při kterých se útočníci snaží přeorganizovat nejnovější bloky za účelem zisku nebo cenzury transakcí. [**Finalizace v jednom slotu (single slot finality, tzv. SSF)**](/roadmap/single-slot-finality/) je **způsob, jak minimalizovat zpoždění finalizace**. V současnosti je časové okno bloků 15 minut, během kterých by teoreticky útočník mohl přesvědčit další validátory, aby bloky přeorganizovali. V případě SSF je to 0 minut. Uživatelé, od jednotlivců po aplikace a burzy, benefitují z rychlého ujištění, že jejich transakce nebudou zrušeny, a síť benefituje z toho, že zamezí celé řadě útoků.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Další informace o finalizaci v jednom slotu</ButtonLink>

## Obrana proti cenzuře {#defending-against-censorship}

Decentralizace zabraňuje tomu, aby jednotlivci nebo malé skupiny [validátorů](/glossary/#validator) získali příliš velký vliv. Nové technologie uzamčení mohou pomoci zajistit, že validátoři Etherea zůstanou co nejvíce decentralizovaní, a zároveň je chrání proti hardwarovým, softwarovým a síťovým poruchám. Mezi ně patří i software, který sdílí odpovědnosti validátorů napříč několika [síťovými uzly](/glossary/#node). Tomu se říká **distribuovaná validační technologie (DVT)**. [Vkladové fondy](/glossary/#staking-pool) jsou motivovány k použití DVT, protože umožňuje více počítačům kolektivně se podílet na validaci, čímž zvyšuje zabezpečení a odolnost proti chybám. Také rozděluje klíče validátorů mezi několik systémů, místo aby jeden operátor provozoval několik validátorů. To ztěžuje nepoctivým operátorům koordinaci útoků na Ethereum. Celkově je cílem dosáhnout bezpečnostních výhod tím, že jsou validátoři provozováni jako _komunity_, nikoliv jako jednotlivci.

<ButtonLink variant="outline-color" href="/staking/dvt/">Další informace o technologie distribuovaných validátorů</ButtonLink>

Implementace **oddělení navrhovatele a stavitele bloků (proposer-builder separation, PBS)** výrazně zlepší vestavěné obranné mechanismy Etherea proti cenzuře. PBS umožňuje jednomu validátorovi vytvořit blok a jinému ho šířit po síti Ethereum. To zajišťuje, že zisky z algoritmů na maximalizaci zisku při vytváření bloků, které naprogramují profesionálové, jsou spravedlivěji rozděleny po celé síti, **čímž se zabraňuje koncentraci uzamčených prostředků** u nejvýkonnějších institucionálních uzamykatelů. Navrhovatel bloku si vybere nejziskovější blok, který mu nabídnul trh stavitelů bloků. Aby byl navrhovatel bloku schopen cenzurovat, musel by si ve většině případů vybrat méně ziskový blok, což by bylo **ekonomicky iracionální a také zřejmé ostatním validátorům** v síti.

Existují potenciální doplňky k PBS, jako jsou šifrované transakce a inkluzní seznamy, které by mohly dále zlepšit odolnost Etherea proti cenzuře. Tyto funkce činí stavitele i navrhovatele bloků slepými k aktuálním transakcím zahrnutým v jejich blocích.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Další informace o oddělení navrhovatele a stavitele bloků</ButtonLink>

## Ochrana validátorů {#protecting-validators}

Sofistikovaný útočník by mohl identifikovat budoucí validátory a spamovat je, aby jim zabránil v navrhování bloků; tomu se říká útok **odmítnutí služby (denial of service, DoS)**. Implementace [**tajného výběru lídrů (secret leader election, SLE)**](/roadmap/secret-leader-election) chrání proti tomuto typu útoku tím, že zabraňuje navrhovatelům bloků být známi předem. Toho je možné dosáhnout tak, že se konstantně promíchává sada kryptografických závazků reprezentujících kandidáty na navrhovatele bloků a implementuje jejich pořadí za účelem určení výběru validátora takovým způsobem, že pouze validátoři sami znají své pořadí předem.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Další informace o tajném výběru lídrů</ButtonLink>

## Aktuální průběh {#current-progress}

**Bezpečnostní vylepšení zahrnutá v plánu jsou v pokročilých stádiích výzkumu**, ale nečeká se, že budou implementována v nejbližší době. Další kroky pro view-merge, PBS, SSF a SLE jsou dokončení jejich specifikace a zahájení vývoje prototypů.
