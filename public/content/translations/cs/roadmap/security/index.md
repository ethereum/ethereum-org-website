---
title: "Bezpečnější Ethereum"
description: "Ethereum je nejbezpečnější a nejvíce decentralizovaná platforma pro chytré kontrakty, jaká existuje. Stále však lze provést vylepšení, aby Ethereum zůstalo odolné vůči jakékoli úrovni útoků i v daleké budoucnosti."
lang: cs
image: /images/roadmap/roadmap-security.png
alt: "Plán vývoje Etherea"
template: roadmap
---

**Ethereum je již nyní velmi bezpečná**, decentralizovaná platforma pro [chytré kontrakty](/glossary/#smart-contract). Stále však lze provést vylepšení, aby Ethereum zůstalo odolné vůči všem druhům útoků i v daleké budoucnosti. Patří mezi ně drobné změny ve způsobu, jakým se [klienti Etherea](/glossary/#consensus-client) vypořádávají s konkurenčními [bloky](/glossary/#block), a také zvýšení rychlosti, s jakou síť považuje bloky za [„finalizované“](/developers/docs/consensus-mechanisms/pos/#finality) (což znamená, že je nelze změnit bez extrémních ekonomických ztrát pro útočníka).

Existují také vylepšení, která výrazně ztěžují cenzuru transakcí tím, že navrhovatelé bloků nevidí skutečný obsah svých bloků, a nové způsoby, jak identifikovat, když klient cenzuruje. Společně tato vylepšení upgradují protokol [důkazu podílem (PoS)](/glossary/#pos) tak, aby uživatelé – od jednotlivců po korporace – měli okamžitou důvěru ve své aplikace, data a aktiva na Ethereu.

## Výběry ze stakingu {#staking-withdrawals}

Přechod z [důkazu prací (PoW)](/glossary/#pow) na důkaz podílem (PoS) začal tím, že průkopníci Etherea „stakovali“ své ETH v depozitním kontraktu. Toto ETH se používá k ochraně sítě. Dne 12. dubna 2023 proběhla druhá aktualizace, která validátorům umožnila vybírat stakované ETH. Od té doby mohou validátoři volně stakovat nebo vybírat ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Přečtěte si o výběrech</ButtonLink>

## Obrana proti útokům {#defending-against-attacks}

Protokol důkazu podílem (PoS) na Ethereu lze vylepšit. Jedno z vylepšení je známé jako [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) – bezpečnější algoritmus pro výběr [forku](/glossary/#fork), který ztěžuje určité sofistikované typy útoků.

Zkrácení doby, kterou Ethereum potřebuje k [finalizaci](/glossary/#finality) bloků, by poskytlo lepší uživatelskou zkušenost a zabránilo sofistikovaným útokům typu „reorganizace“, při kterých se útočníci snaží přeskládat velmi nedávné bloky, aby získali zisk nebo cenzurovali určité transakce. [**Jednoslotová finalita (SSF)**](/roadmap/single-slot-finality/) je **způsob, jak minimalizovat zpoždění finalizace**. V současné době existují bloky za posledních 15 minut, u kterých by útočník mohl teoreticky přesvědčit ostatní validátory k rekonfiguraci. S SSF je to 0. Uživatelé, od jednotlivců po aplikace a burzy, těží z rychlé jistoty, že jejich transakce nebudou zvráceny, a síť těží z toho, že se zamezí celé třídě útoků.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Přečtěte si o jednoslotové finalitě</ButtonLink>

## Obrana proti cenzuře {#defending-against-censorship}

Decentralizace brání tomu, aby se jednotlivci nebo malé skupiny [validátorů](/glossary/#validator) stali příliš vlivnými. Nové technologie pro staking mohou pomoci zajistit, aby validátoři Etherea zůstali co nejvíce decentralizovaní, a zároveň je chránit před selháním hardwaru, softwaru a sítě. To zahrnuje software, který rozděluje odpovědnosti validátora mezi více [uzlů](/glossary/#node). To je známé jako **technologie distribuovaných validátorů (DVT)**. [Staking pooly](/glossary/#staking-pool) jsou motivovány k používání DVT, protože umožňuje více počítačům společně se podílet na validaci, což přidává redundanci a odolnost proti chybám. Také rozděluje klíče validátorů mezi několik systémů, místo aby jednotliví operátoři provozovali více validátorů. To ztěžuje nepoctivým operátorům koordinaci útoků na Ethereum. Celkovou myšlenkou je získat bezpečnostní výhody provozováním validátorů jako _komunit_ spíše než jako jednotlivců.

<ButtonLink variant="outline-color" href="/staking/dvt/">Přečtěte si o technologii distribuovaných validátorů</ButtonLink>

Implementace **oddělení navrhovatele a tvůrce (PBS)** drasticky zlepší vestavěnou obranu Etherea proti cenzuře. PBS umožňuje jednomu validátorovi vytvořit blok a jinému jej vysílat napříč sítí Ethereum. To zajišťuje, že zisky z profesionálních algoritmů pro tvorbu bloků maximalizujících zisk jsou v síti rozdělovány spravedlivěji, což **zabraňuje koncentraci staku** u nejvýkonnějších institucionálních stakerů v průběhu času. Navrhovatel bloku si může vybrat nejziskovější blok, který mu nabídne trh tvůrců bloků. Aby mohl cenzurovat, musel by si navrhovatel bloku často vybrat méně ziskový blok, což by bylo **ekonomicky iracionální a také zřejmé pro ostatní validátory** v síti.

Existují potenciální doplňky k PBS, jako jsou šifrované transakce a seznamy zahrnutí, které by mohly dále zlepšit odolnost Etherea vůči cenzuře. Díky nim tvůrce bloku a navrhovatel nevidí skutečné transakce zahrnuté v jejich blocích.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Přečtěte si o oddělení navrhovatele a tvůrce</ButtonLink>

## Ochrana validátorů {#protecting-validators}

Je možné, že by sofistikovaný útočník mohl identifikovat nadcházející validátory a spamovat je, aby jim zabránil v navrhování bloků; to je známé jako útok **odepření služby (DoS)**. Implementace [**tajné volby lídra (SLE)**](/roadmap/secret-leader-election) bude chránit před tímto typem útoku tím, že zabrání tomu, aby byli navrhovatelé bloků známi předem. Funguje to tak, že se neustále míchá sada kryptografických závazků představujících kandidáty na navrhovatele bloků a jejich pořadí se používá k určení, který validátor je vybrán, a to takovým způsobem, že pouze samotní validátoři znají své pořadí předem.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Přečtěte si o tajné volbě lídra</ButtonLink>

## Současný pokrok {#current-progress}

**Bezpečnostní upgrady v plánu vývoje jsou v pokročilých fázích výzkumu**, ale neočekává se, že by byly v dohledné době implementovány. Dalšími kroky pro view-merge, PBS, SSF a SLE je dokončit specifikaci a začít s tvorbou prototypů.