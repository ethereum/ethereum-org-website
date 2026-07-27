---
title: Plán rozvoje soukromí pro Ethereum
description: Ethereum pracuje na tom, aby se soukromí stalo prvotřídní vlastností sítě prostřednictvím aktualizací, které chrání soukromí transakcí, zabezpečují přístup k uživatelským datům a umožňují ověřitelnou, ale soukromou identitu.
lang: cs
image: /images/roadmap/roadmap-security.png
alt: Plán rozvoje Etherea
template: roadmap
---

**Soukromí na Ethereu se přesouvá z volitelného doplňku na výchozí nastavení na úrovni sítě.** Navrhované plány rozvoje soukromí Etherea se zaměřují na specifická zranitelná místa připojení, kde dnes mohou unikat uživatelská data. Výzkum napříč ekosystémem má za cíl učinit z Etherea platformu, kde je soukromí strukturální, nikoli pouze volitelné.

Výzkumníci z Nadace Ethereum [shrnuli tři hlavní priority plánu rozvoje](https://pse.dev/blog/pse-roadmap-2025) z distribuovaného výzkumu napříč ekosystémem:

- **Soukromé čtení** - dotazování a procházení Etherea bez odhalení, k jakým adresám, kontraktům nebo datům uživatel přistupuje. Ochrana čtení zabraňuje shromažďování dat ještě předtím, než je transakce vůbec podepsána.
- **Soukromý zápis** - odesílání transakcí, které jsou odolné vůči cenzuře a úniku metadat, od zařazení do mempoolu až po konečné vypořádání. Ochrana zápisu zajišťuje, že soukromé transakce nebudou cenzurovány ani spojovány se svým původem.
- **Soukromé dokazování** - ověřování identity, způsobilosti nebo dat bez odhalení základních osobních údajů pomocí efektivních důkazů s nulovým vědomím. Soukromé dokazování umožňuje uživatelům účastnit se sítě a zároveň se rozhodnout odhalit pouze nezbytné minimum informací (selektivní odhalení).

Společně tyto tři oblasti tvoří komplexní model soukromí. Cílem je **výpočetní suverenita**, která zajistí, že Ethereum bude platformou, kde mohou jednotlivci a instituce globálně interagovat, koordinovat se a provádět transakce bez neschváleného shromažďování dat, sledování nebo centralizované cenzury.

**Proč je soukromí důležité?** Přečtěte si o soukromí, jak chránit své soukromí online a jak chránit své soukromí na Ethereu dnes.

<ButtonLink variant="outline" href="/privacy/">Více o soukromí</ButtonLink>

## Soukromé čtení chrání uživatelské dotazy a přístupová data {#private-reads}

Než je transakce vůbec podepsána, uživatel potřebuje přečíst data z blockchainu. Pro kontrolu zůstatku, odhad gasu nebo ověření stavu chytrého kontraktu odesílá software peněženky dotazy poskytovateli uzlu. Tyto standardní dotazy **Remote Procedure Call (RPC)** odhalují obrovské množství metadat.

Poskytovatel uzlu vidí IP adresu uživatele, otisk zařízení, konkrétní dotazované adresy a načasování a frekvenci jeho aktivity. I když uživatel následně odešle soukromou transakci, poskytovatel infrastruktury již má přístup k detailní mapě jeho záměrů.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

Únik metadat na přístupové vrstvě je jedním z nejvytrvalejších problémů se soukromím ve všech blockchainových systémech. Ethereum se snaží řešit únik metadat prostřednictvím soukromí původu (skrytí toho, kdo se ptal), soukromí obsahu (skrytí toho, na co se ptal) a ověřování správnosti vrácených informací.

**Soukromí původu** využívá [anonymní RPC](https://privreads.ethereum.foundation/feed/anon-rpc/) a řešení anonymních sítí k zamlžení entity požadující data, **soukromí obsahu** využívá taktiky jako soukromé získávání informací a [oblivious RAM](https://en.wikipedia.org/wiki/Oblivious_RAM) ke skrytí dotazovaných dat, zatímco **ověřování správnosti** využívá lehké klienty k prokázání, že vrácená data jsou přesná.

Kryptografickým stavebním kamenem soukromí obsahu je [**Private Information Retrieval (PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval), kryptografická technika, která umožňuje klientovi dotazovat se databáze a získat konkrétní informaci, aniž by serveru odhalil, ke které položce bylo přistupováno. Server zpracuje požadavek naslepo a vrátí zašifrovanou odpověď, kterou může dešifrovat pouze dotazující se peněženka.

PIR funguje na přístupové vrstvě a nachází se mezi softwarem peněženky a poskytovateli uzlů. Jak budou implementace PIR dospívat, budou integrovány do sad pro vývoj softwaru (SDK) peněženek a poskytovatelů infrastruktury, což uživatelům umožní dotazovat se sítě, aniž by svou aktivitu odhalili centralizovaným zprostředkovatelům.

Soukromé čtení také snižuje vystavení útokům typu předbíhání a manipulaci s pořadím transakcí. Pokud poskytovatel infrastruktury nevidí, na jaký chytrý kontrakt nebo adresu se uživatel dotazuje, nemůže tuto informaci prodat aktérům, kteří profitují z předvídání onchain aktivity.

## Soukromý zápis zabraňuje cenzuře a úniku transakcí {#private-writes}

Jakmile je transakce odeslána, prochází síťovou infrastrukturou, která ji může sledovat nebo zablokovat ještě předtím, než je zaznamenána onchain. Zde v praxi selhává mnoho protokolů pro soukromí. Velcí, centralizovaní tvůrci bloků monitorují mempool a mohou potichu odsunout na vedlejší kolej nebo cenzurovat transakce pocházející z nástrojů pro soukromí. I když je základní kryptografie spolehlivá, transakce, která není nikdy zahrnuta do bloku, neposkytuje žádnou ochranu.

Tento problém společně řeší dvě aktualizace na úrovni protokolu:

[**EIP-8141 (Rámcové transakce)**](https://eips.ethereum.org/EIPS/eip-8141) zavádí nový typ transakce, který rozděluje transakce na segmenty pro ověření podpisu a autorizaci poplatků a na samotné instrukce transakce. Rámcové transakce umožňují [chytrým účtům](/roadmap/account-abstraction/) definovat vlastní schémata podpisů a využívat externí kontrakty k pokrytí poplatků za plyn. Přísná pravidla sandboxingu v mempoolu zabraňují tomu, aby tyto transakce otevřely síť útokům typu odepření služby (DoS).

Rámcové transakce jsou zvažovány pro aktualizaci Etherea [Hegotá](https://forkcast.org/upgrade/hegota/), což je další aktualizace sítě po nadcházející aktualizaci [Glamsterdam](/roadmap/glamsterdam/). Stejná aktualizace také umožní chytrým účtům přijmout [kvantově bezpečné podpisy](/roadmap/security/quantum-resistance/) ještě před dokončením plného přechodu sítě na postkvantovou éru.

<ExpandableCard title="Jak rámcové transakce (EIP-8141) umožňují soukromí?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

Rámcové transakce umožňují účtům zvolit si vlastní metodu ověřování podpisu. Pro soukromí to znamená, že uživatelé mohou přijmout schémata podpisů zachovávající soukromí, aniž by museli čekat na rozsáhlou migraci v rámci celé sítě. Rámcové transakce také umožňují abstrakci poplatků za plyn, což nástrojům pro soukromí umožňuje pokrýt transakční náklady bez odhalení uživatelských adres onchain.

</ExpandableCard>

[**EIP-7805 (Fork-Choice Enforced Inclusion Lists, neboli FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805) poskytuje mechanismus vynucování pro soukromý zápis. Pravidla konsenzu vyžadují, aby navrhovatelé bloků zahrnuli do svých bloků transakce z agregovaných lokálních seznamů pro zahrnutí (inclusion lists), které shromažďují transakce z více zdrojů. Pokud se tvůrce bloku pokusí cenzurovat transakci, která se objevila na seznamech pro zahrnutí, atestující uzly navržený blok zcela odmítnou. FOCIL je v současné době zvažován pro aktualizaci [Hegotá](https://forkcast.org/upgrade/hegota/).

Rámcové transakce dávají uživatelům flexibilitu vytvářet transakce zachovávající soukromí s vlastními schématy podpisů, zatímco FOCIL zajišťuje, že tyto transakce nemohou být selektivně cenzurovány, jakmile vstoupí do mempoolu. Společně řeší dva různé body selhání: jeden umožňuje formát soukromých transakcí, druhý zaručuje jejich zahrnutí. Žádný centrální aktér nemůže zablokovat platný soukromý převod.

<VideoWatch slug="eip-7805-focil-explained" />

Druhým zranitelným bodem pro soukromí uživatelů je způsob, jakým Ethereum sleduje pořadí transakcí, nazývaný systém sekvenční nonce. Ve standardním modelu účtu Etherea používá každý účet jediné, lineárně se zvyšující počítadlo. Pokud je jedna soukromá transakce zpožděna v mempoolu, všechny následné transakce z tohoto účtu se za ní zaseknou. Sekvence nonce také umožňuje pozorovatelům sítě propojit více transakcí zpět se stejným původním účtem, což narušuje soukromí.

[**EIP-8250 (Klíčované nonce pro rámcové transakce)**](https://eips.ethereum.org/EIPS/eip-8250), v současnosti zvažovaný pro Hegotá, to řeší tím, že umožňuje jedinému účtu spravovat více paralelních sekvencí transakcí současně. Uživatelé mohou provádět mnoho soukromých transakcí napříč různými kontexty ve stejnou dobu a pozorovatelé již nemohou spolehlivě korelovat odlišné aktivity zpět ke stejnému nadřazenému účtu.

### Soukromé platby a převod hodnoty {#private-payments}

Kromě směrování transakcí a správy nonce vyžaduje ochrana zápisu skrytí identit a aktiv zapojených do převodu. I když se uživatel dotazuje soukromě a vysílá transakci bez cenzury, transakční data zaznamenaná onchain zůstávají veřejně viditelná. Kdokoli může vidět, kdo komu kolik poslal, a firmy zabývající se analýzou řetězce agregují tato data do prohledávatelných profilů, které přetrvávají donekonečna.

[**EIP-8182 (Soukromé převody ETH a ERC-20)**](https://eips.ethereum.org/EIPS/eip-8182), navržený pro aktualizaci Hegotá, zavádí nativní, sdílený chráněný fond (shielded pool) přímo do protokolu Etherea pro převody ETH a ERC-20. Fondy soukromí (privacy pools) využívají kryptografické mixování k přerušení vazby mezi vkladem a výběrem, ale dnes jsou dostupné pouze prostřednictvím aplikací pro soukromí, peněženek a sítí vrstvy 2 (l2).

Historicky řešení soukromí na úrovni aplikací tříštila likviditu a trpěla malými množinami anonymity. EIP-8182 konsoliduje chráněné převody na úrovni protokolu, což uživatelům umožňuje směrovat prostředky prostřednictvím skrytých doručovacích klíčů, aniž by vyžadovali specializované architektury peněženek nebo interagovali s fragmentovanými, volitelnými aplikacemi.

Další výzkumné přístupy, které se prosazují pro soukromí transakcí, zahrnují důkazy, které uživatelům umožňují prokázat, že částky transakcí jsou platné, aniž by odhalili skutečné hodnoty (jako jsou bulletproofs a důkazy rozsahu). Výzkum **důvěrných transakcí** má za cíl skrýt částky a zároveň umožnit síti ověřit, že žádná hodnota není vytvořena ani zničena.

Tato řešení na platební vrstvě staví na infrastruktuře popsané dříve v této části. PIR chrání přípravnou fázi, rámcové transakce a FOCIL zajišťují, že se soukromé platby dostanou do mempoolu bez cenzury, a zkVM umožňují komplexní kryptografii potřebnou pro skrytí hodnoty při zachování záruk bezpečnosti sítě.

## Soukromé dokazování a ochrana identity {#private-proving}

Soukromí není o úplném utajení. Je o **selektivním odhalení**, neboli o výběru toho, jaké informace odhalit, komu a za jakých podmínek. Ethereum podporuje selektivní odhalení prostřednictvím [**důkazů s nulovým vědomím (ZKP)**](/zero-knowledge-proofs/), které umožňují jedné straně prokázat, že je tvrzení pravdivé, aniž by odhalila podkladová data. Například prokázání občanství bez odhalení údajů z pasu nebo prokázání věkové hranice bez odhalení přesného data narození.

Soukromé dokazování se napojuje na plán rozvoje soukromí tím, že umožňuje ověřitelnou identitu bez vystavení dat na úrovni protokolu. Zatímco soukromé čtení a zápis chrání transakční metadata, soukromé dokazování zajišťuje, že kontroly identity a způsobilosti vyžadované pro účast v reálném světě nevyžadují odevzdání osobních údajů centralizovaným ověřovacím systémům.

V plánu rozvoje soukromí Etherea je soukromé dokazování podporováno doplňkovými infrastrukturními směry, jedním na exekuční vrstvě, aby byly soukromé výpočty možné na úrovni protokolu, a druhým na přístupové vrstvě, který činí soukromé výpočty praktickými na spotřebitelských zařízeních.

**Virtuální stroje s nulovým vědomím (zkVM)** umožňují chytrým kontraktům spouštět svou logiku a generovat kryptografický důkaz, že práce byla provedena správně. Když je tento důkaz skutečně s nulovým vědomím, neodhaluje nic o vstupech, průběžném stavu nebo výstupech, čímž odemyká soukromé výpočty na úrovni sítě.

Název „zkVM“ v sobě nese určitou nuanci; většina systémů, které se dnes nazývají zkVM, je spíše stručná (succinct) než s nulovým vědomím. Jejich důkazy jsou malé a rychle ověřitelné, ale nutně neskrývají data použitá k jejich generování. Dnes pouze hrstka dokazovacích systémů poskytuje vlastnost skrytí, na které závisí aplikace pro soukromí. [Benchmarky dokazování na straně klienta (Client-Side Proving)](https://ethproofs.org/csp-benchmarks) sledují, které zkVM byly analyzovány na skutečné nulové vědomí v jejich systémových vlastnostech. Uzavření této mezery je součástí práce na soukromém dokazování v rámci plánu rozvoje.

Rámcové transakce (EIP-8141) jsou také spojeny s implementací zkVM. Mohou využívat vlastní ověřovací schémata k odesílání důkazem ověřených přechodů stavu, což aplikacím umožňuje nabízet soukromá exekuční prostředí a odesílat veřejné síti Ethereum kryptografický důkaz, že akce byla provedena správně, aniž by byla odhalena samotná transakční data.

Důkazy s nulovým vědomím jsou vynikající pro to, aby jednotlivcům umožnily prokázat platnost jejich dat a zároveň je udržet v soukromí, ale nemohou snadno spravovat chytré kontrakty, kde více uživatelů potřebuje současně interagovat se sdíleným fondem tajných dat.

K překlenutí této mezery začleňuje plán rozvoje Etherea **plně homomorfní šifrování (FHE)**. FHE umožňuje chytrým kontraktům provádět výpočty přímo na zašifrovaných datech, aniž by bylo nutné podkladové informace dešifrovat nebo odhalit. Integrace stavebních bloků FHE a specializovaných kryptografických koprocesorů do Etherea je nezbytná pro decentralizované aplikace, které spoléhají na sdílený „skrytý stav“, jako jsou soukromí automatizovaní tvůrci trhu (AMM), důvěrné fondy pro půjčování nebo aukce s uzavřenými nabídkami, kde musí vstupy všech interagovat a zároveň zůstat zcela tajné.

**Dokazování na straně klienta** činí generování těchto důkazů soukromí praktickým na běžných zařízeních. Projekt Client-Side Proving udržuje veřejnou sadu benchmarků porovnávající dokazovací systémy a zkVM na spotřebitelském hardwaru a publikuje výsledky na [ethproofs.org](https://ethproofs.org). Technický výzkum směřuje k transparentním, [postkvantovým](/roadmap/security/quantum-resistance/) důkazům s přímým onchain ověřením, díky čemuž budou soukromé výpočty rychlejší, snáze ověřitelné přímo v síti Ethereum a životaschopné na mobilních zařízeních.

[**Iniciativa zkID**](https://pse.dev/projects/zk-id) vytvořila open-source infrastrukturu v souladu s globálními rámci identity, včetně peněženky evropské digitální identity (EUDI). Systém Open Anonymous Credentials (OpenAC) poskytuje nepropojitelnost vydaných pověření, čímž zajišťuje, že více důkazů vygenerovaných stejným uživatelem napříč různými platformami nelze korelovat zpět k jedinému profilu.

V oblasti správy poskytuje protokol [**Minimal Anti-Collusion Infrastructure (MACI)**](https://maci.pse.dev/) **absenci stvrzenek (receipt-freeness)**, což kryptograficky znemožňuje prokázat, jak účet hlasoval. Protože voliči nemohou předložit stvrzenku ukazující jejich volbu, kupování hlasů a nátlak ztrácejí svou ekonomickou motivaci. MACI od roku 2020 zabezpečuje rozhodování o financování v reálném světě prostřednictvím [clr.fund](https://clr.fund/), který rozdělil miliony dolarů v kvadratickém financování pro veřejné statky Etherea.

Hlasování zachovávající soukromí již chrání skutečné voliče v prostředích s vysokými sázkami. [Nástroj Freedom Tool od Rarimo](https://docs.rarimo.com/freedom-tool/) využívá ověřování pasů s nulovým vědomím, aby občanům umožnil prokázat, že jsou oprávněni volit, aniž by odhalili, kým jsou. Poháněl anonymní stínové volby a opoziční průzkumy v zemích včetně Ruska (opoziční hlasování [Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a)), Gruzie (aplikace pro průzkumy United Space) a Íránu (projekt Iranians Vote), kde bezpečnost voličů závisí na kryptografickém tajemství hlasování.

Soukromé dokazování také umožňuje **soukromí s ohledem na dodržování předpisů (compliance-aware privacy)**. Řešení soukromí, jako jsou fondy soukromí, přijímají vklady volně, ale před výběrem vyžadují, aby uživatelé vygenerovali důkazy s nulovým vědomím, že se jejich prostředky neprotínají se známými škodlivými adresami. Programovatelný model dodržování předpisů odděluje akt ochrany transakcí od aktu prokazování souladu s předpisy, což běžným uživatelům umožňuje provádět transakce soukromě a zároveň splňovat institucionální požadavky.

zkEVM mohou tyto kontroly dodržování předpisů provádět soukromě, ověřovat regulační status bez odhalení podrobností o transakcích nebo identit uživatelů.

## Aktuální pokrok plánu rozvoje {#current-progress}

Směr vývoje soukromí na Ethereu je utvářen spíše shodou v rámci celého ekosystému než jakoukoli jedinou organizací. Plán rozvoje [strawmap.org](https://strawmap.org/) shromažďuje navrhované aktualizace z celého ekosystému, aby sledoval a navrhoval, kde komunita dosáhla konsenzu. Výzkumníci z Nadace Ethereum pomáhají spravovat paralelní plán výzkumu a vývoje napříč výzkumným ekosystémem, zaměřený na pokrok v nástrojích pro soukromí na přístupové vrstvě, infrastruktuře identity a systémech s ohledem na dodržování předpisů. Oba příklady odrážejí stejnou základní prioritu učinit soukromí na Ethereu strukturálním, nikoli volitelným.

Výzkum a vývoj v oblasti soukromí na Ethereu zahrnuje desítky týmů napříč ekosystémem. Práce postupují na aktualizacích protokolu, řešeních na přístupové vrstvě, infrastruktuře identity a nástrojích s ohledem na dodržování předpisů.

**Aktualizace protokolu**: EIP-8141 (Rámcové transakce), EIP-7805 (FOCIL), EIP-8250 (Klíčované nonce) a EIP-8182 (Chráněné fondy na úrovni protokolu) jsou v aktivním vývoji a zvažují se pro aktualizaci [Hegotá](https://forkcast.org/upgrade/hegota/), další aktualizaci sítě po [Glamsterdam](/roadmap/glamsterdam/). EIP-8025 (volitelné exekuční důkazy) a Verkle stromy jsou také cíleny pro Hegotá, čímž poskytují základ pro soukromé výpočty založené na zkEVM na Ethereum Mainnet. Paralelně dozrává výzkum kolem koprocesorů FHE, které umožní vícestranné šifrované chytré kontrakty.

**Přístupová vrstva**: Výzkum PIR postupuje s aktivními implementacemi, které testují infrastrukturní týmy. SDK peněženky Kohaku je ve vývoji jako open-source reference pro peněženky zachovávající soukromí.

**Dokazování na straně klienta**: Týmy aktivně využívají výsledky testů založených na benchmarcích k optimalizaci toho, jak důkazy s nulovým vědomím běží na standardních zařízeních. Projekty jako Spartan-WHIR posouvají vpřed bezpečné, kvantově odolné důkazy, které lze snadno ověřit přímo v síti Ethereum. Výzkumné iniciativy jako leanVM poskytují odlehčený zkVM navržený tak, aby spojil více kryptografických podpisů dohromady, čímž zmenšuje velikost dat kvantově bezpečných podpisů 250krát, aby se ušetřilo místo a snížily náklady na síť.

**Identita a dokazování**: Iniciativa zkID vytváří optimalizovaná dokazovací schémata pro mobilní zařízení. MACI nadále zabezpečuje kola kvadratického financování a správu DAO, nástroje jako Freedom Tool od Rarimo přinášejí hlasování s nulovým vědomím do voleb v reálném světě a pokračuje probíhající výzkum standardů identity zachovávajících soukromí.

Žádná část této práce není dokončena. Časové osy jsou cíle, nikoli záruky, a [proces správy Etherea založený na konsenzu](/governance/) znamená, že plán rozvoje se může s postupem výzkumu měnit. Rozsah aktivního vývoje a počet týmů pracujících na soukromí však představují jasný závazek učinit Ethereum ve výchozím nastavení odolným vůči extrakci.

## Další čtení {#further-reading}

- [Soukromí na Ethereu](/privacy/)
- [Plán rozvoje PSE: 2025 a dále](https://pse.dev/blog/pse-roadmap-2025)
- [Mandát Nadace Ethereum](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Důkazy s nulovým vědomím](/zero-knowledge-proofs/)
- [Decentralizovaná identita](/decentralized-identity/)
- [Plán rozvoje Kohaku](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [Benchmarky dokazování na straně klienta](https://ethproofs.org/csp-benchmarks)
- [zkEVM v číslech](https://zkevm.ethereum.foundation/)