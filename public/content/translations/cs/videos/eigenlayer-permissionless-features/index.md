---
title: "EigenLayer: přidávání funkcí do Etherea nevyžadující povolení"
description: "Sreeram Kannan představuje přístup EigenLayeru k přidávání funkcí do Etherea nevyžadujícímu povolení."
lang: cs
youtubeId: "-V-fG4J1N_M"
uploadDate: 2023-02-10
duration: "0:24:11"
educationLevel: advanced
topic:
  - "restaking"
  - "EigenLayer"
  - "bezpečnost"
format: presentation
author: a16z crypto
breadcrumb: "EigenLayer"
---

Výzkumná přednáška, kterou přednesl **Sreeram Kannan** (University of Washington / EigenLayer) na výzkumné akci a16z krypto, vysvětlující, jak se EigenLayer snaží umožnit inovace nevyžadující povolení na Ethereu tím, že umožňuje stakerům zavázat stejný vložený kapitál (stake) k dalším podmínkám penalizace výměnou za poskytování nových služeb, jako jsou orákula, mosty, vrstvy dostupnosti dat a alternativní exekuční prostředí.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=-V-fG4J1N_M) zveřejněného a16z krypto. Pro lepší čitelnost byl lehce upraven.*

#### Úvod (0:00) {#introduction-000}

Dnes budu mluvit o jednom z produktů, které budujeme, což je také myšlenka zvaná EigenLayer. EigenLayer nazýváme restakingovým kolektivem, ale to, co dělá, je, že umožňuje komukoli přidávat nové funkce do Etherea.

Jak mě Tim představil, jsem docentem na University of Washington v Seattlu, kde jsme posledního čtyři a půl roku pracovali na blockchainech, konsensu a dalších oblastech. Během posledního roku jsem zakládal startup EigenLayer Labs. Udělali jsme spoustu práce na protokolech konsensu — měli jsme článek s názvem „Everything is a Race“, který analyzuje podmínky, za kterých jsou protokoly typu nejdelšího řetězce využívající důkaz prací (PoW), důkaz podílem (PoS) a důkaz prostorem bezpečné. Na některých z těchto poznatků jsme stavěli — například v článku s názvem Prism, což je protokol důkazu prací s velmi nízkou latencí. Také jsme pracovali na projektu zvaném PoSAT, který řeší, jak vytvořit dynamicky dostupný protokol důkazu podílem, kde váš protokol nadále funguje i při proměnlivé účasti.

#### Kdy jsou blockchainy odpovědné (1:31) {#when-are-blockchains-accountable-131}

Zkoumali jsme také, kdy jsou blockchainy odpovědné. Jednou z heuristik je, že když máte kvorum a podpisy, a pokud skupina stakerů podepíše blok dvakrát, jsou tyto blockchainy odpovědné. Jsou tu ale jemné nuance — například protokol jako Algorand, který také používá kvora, odpovědný není, protože spoléhá na časové předpoklady, kde můžete vytvořit porušení bezpečnosti tím, že nebudete nic říkat.

#### Konsensus s více zdroji (2:11) {#multi-resource-consensus-211}

Dvě nejnovější práce se týkají konsensu s více zdroji — představte si, že chcete vytvořit protokol, který kombinuje důkaz podílem, důkaz prostorem a důkaz prací do jednoho protokolu. Chcete, aby fungoval, i když je většina těžařů důkazu prací škodlivá, pokud je alespoň velmi malá část těžařů důkazu podílem poctivá. Charakterizovali jsme oblasti kompromisů napříč více zdroji.

Pracovali jsme také na návrhu peer-to-peer topologie — jak zajistíte, aby v peer-to-peer síti blockchainu protokol konsensu respektoval pořadí zpráv? Jednou z věcí, která se v blockchainech nekontrolovatelně děje, je předbíhání. Abychom zabránili necílenému předbíhání — kdy se prostě chcete dostat před všechny ostatní, protože máte cenovou výhodu — máme článek s názvem Themis, který dává blockchainu nativní vlastnost „první dovnitř, první ven“ (FIFO).

Nad rámec konsensu existují řešení škálování, jako je sharding. Měli jsme na toto téma několik článků — Coded Merkle Tree a Free2Shard.

Jednou z věcí, kterou jsme v blockchainu shledali jako hlavní překážku, je to, že rychlost inovací na základních vrstvách — u konsensu, shardingu nebo peer-to-peer — je mnohem nižší než rychlost inovací na aplikační vrstvě. Aplikace lze nasadit nevyžadující povolení — kdokoli může nasadit aplikaci na existující blockchain, jako je Ethereum. Zatímco upgrady základního protokolu jsou s řízeným přístupem ve velmi hlubokém smyslu. To náš prostor docela zbrzdilo.

#### Oddělení důvěry a inovací (8:30) {#decoupling-trust-and-innovation-830}

Vraťme se v příběhu do let 2008–2009: Bitcoin byl průkopníkem decentralizované důvěry prostřednictvím těžby pomocí důkazu prací. Nad těžbou je protokol konsensu — nejdelší řetězec nebo nejtěžší řetězec — který rozhoduje o platném řetězci. Nad tím vším Bitcoin Script nastavuje sémantiku exekuce. Takže máme vrstvu důvěry v základu, vrstvu konsensu nad ní a exekuční vrstvu úplně nahoře.

Bitcoin byl ale také blockchain specifický pro jednu aplikaci — navržený pro jedinou aplikaci: výměnu bitcoinů mezi klienty. Když se vrátíme do roku 2011, každá nová aplikace, která měla být postavena na blockchainu, potřebovala svou vlastní síť důvěry. Někdo chtěl například vytvořit decentralizovaný systém doménových jmen s názvem Namecoin. Skriptovací vrstva Bitcoinu neposkytovala dostatečnou programovatelnost, takže jste museli vytvořit novou skriptovací vrstvu a novou síť důvěry. Neexistoval způsob, jak sdílet důvěru mezi Namecoinem a Bitcoinem.

Základní myšlenkou, na které Ethereum stavělo, bylo oddělení důvěry a inovací. Vzali skriptovací vrstvu Bitcoinu a nahradili ji univerzální Turingovsky úplnou programovací vrstvou — Ethereum Virtual Machine. V základním smyslu to byl malý technický upgrade, ale vytvořil modularitu důvěry. Nyní může kdokoli přijít a stavět decentralizované aplikace (dapp) nad tímto systémem. Člověk, který vytvořil ENS, neměl se sítí důvěry nic společného. Důvěra sítě Ethereum se stala modulem, který lze poskytnout jakékoli distribuované aplikaci.

#### Otevřené inovace (10:23) {#open-innovation-1023}

To vedlo k masivnímu urychlení pseudonymní ekonomiky. Kdokoli, kdo tyto aplikace vytváří — oni sami nejsou důvěryhodní, jen přinášejí inovace. Přijdete s nápadem, můžete být nikdo, nemusíte být důvěryhodní, prostě napíšete svůj kód, nasadíte ho na Ethereum a všichni důvěřují, že Ethereum bude i nadále vykonávat podmínky tak, jak jsou stanoveny.

Jeden ze způsobů, jak to modelovat: základní vrstvy — síť důvěry, konsensus a virtuální stroj — jsou spojeny do sítě důvěry, která produkuje důvěru. Blockchain Ethereum je producentem důvěry. Distribuované aplikace jsou spotřebiteli důvěry. Výměna hodnot probíhá takto: decentralizované aplikace (dapp) získávají důvěru od Etherea a na oplátku platí poplatky. Stejně jako byl rizikový kapitál oddělením kapitálu a inovací, Ethereum oddělilo důvěru a inovace.

Překážky pro otevřené inovace však nadále přetrvávají. Pokud mám nápad, jak upgradovat protokol konsensu Etherea — řekněme, že je rok 2019 a já přišel s protokolem konsensu Avalanche — neexistuje způsob, jak ho nasadit na Ethereum. Takže co udělám? Jdu a vytvořím si svůj vlastní celý svět. Toto je éra alternativních blockchainů na vrstvě 1 (l1) — každý s jinými protokoly konsensu, jinými virtuálními stroji, ale každý si musí vybudovat své vlastní sítě důvěry.

Tento obrázek vypadá přesně jako situace s Bitcoinem a Namecoinem v roce 2011. Inovace na úrovni dapp mohou jednoduše stavět na Ethereu, ale inovace, které jdou hlouběji a dotýkají se samotného jádra technologického stacku, musí vytvářet fragmentované ekosystémy důvěry.

Navíc Ethereum poskytuje důvěru dappkám pouze pro tvorbu bloků — řazení transakcí a exekuci transakcí. To je vše. Pokud by dappky chtěly důvěru v čemkoli jiném — čtení dat z internetu, čtení dat z jiného blockchainu, spuštění jiného exekučního enginu, spuštění herního enginu, spuštění autentizačního systému — musí si vytvořit svou vlastní síť důvěry. Chainlink je skvělým příkladem: je to protokol orákula, který pomáhá získávat data z internetu do blockchainu, ale Chainlink má svou vlastní síť důvěry. Jeho důvěra není vypůjčena od stakerů Etherea.

#### Mikroekonomický problém (16:28) {#microeconomic-problem-1628}

Mikroekonomický problém: pokud provozujete middleware — řekněme systém pro ukládání dat — musíte si vytvořit vlastní mechanismus stakingu. Potřebujete vysokou ekonomickou bezpečnost, což znamená spoustu vloženého kapitálu (stake), a pak tu máte náklady obětované příležitosti kapitálu. Například chcete mít ve své vrstvě pro ukládání dat vložený stake ve výši 10 miliard dolarů. V nespekulativním světě musíte z tohoto kapitálu platit 5% nebo 10% roční sazbu. Dominantním nákladem nejsou provozní náklady na ukládání dat — jsou to náklady na živení masivní ekonomické kapitálové základny.

Podívejte se na jakýkoli ekosystém důkazu podílem (PoS): 94 % odměn jde osobě, která drží kapitál, a pouze 6 % jde osobě, která skutečně provádí operace. Takže i když přijdete s průlomovým nápadem na snížení provozních nákladů desetkrát, těch 94 % zůstává nezměněno. Vaše struktura nákladů je omezena náklady na kapitál.

Pokud jste decentralizovaná aplikace (dapp), mikroekonomický problém spočívá v tom, že platíte velmi vysoký poplatek velké síti důvěry, jako je Ethereum, ale jste omezeni tou nejslabší důvěrou, na které závisíte. Pokud byste měli orákulum nebo most, který není tak důvěryhodný, mohli byste tam být zneužiti. Vaše bezpečnost je vždy nejmenším společným jmenovatelem.

#### Ekonomický problém (19:52) {#economic-problem-1952}

Pro základní blockchain platí, že pokud je hlavní hodnotovou nabídkou poskytování decentralizované důvěry a generování příjmů z ní, Ethereum je schopno poskytovat decentralizovanou důvěru pouze při tvorbě bloků — nikoli u všech ostatních věcí potřebných k provozování decentralizované služby. Jiný middleware vytváří ostrovy decentralizované důvěry, a místo toho, aby se příjmy sjednotily a vytvořily masivní síť důvěry, se příjmy fragmentují do menších ostrovů.

#### EigenLayer (20:44) {#eigenlayer-2044}

Je to vlastně směšně jednoduchá myšlenka, která řeší všechny tyto problémy najednou.

EigenLayer je mechanismus, jak využít existující síť důvěry k provádění jiných věcí, pro které nebyla původně určena. Ethereum poskytuje důvěru při řazení a exekuci. EigenLayer je série chytrých kontraktů na Ethereu a klíčovým slovem je restaking.

Co je to restaking? V Ethereu s důkazem podílem (PoS) jsou již v Beacon chainu vloženy desítky miliard dolarů. EigenLayer je mechanismus, pomocí kterého stakeři provádějí restaking — vystavují stejný kapitál dalšímu riziku. Uzamknou svůj stake v Ethereu a ten samý stake se zaváže k dalším podmínkám penalizace. Penalizace je mechanismus, kterým vám může být váš stake odebrán, ale nyní přidáváte další důvody, pro které můžete být potrestáni, a to nad rámec chytrých kontraktů EigenLayeru.

Vlastnost, kterou chceme: stejný stake na sebe bere další riziko. Další riziko v čem? V poskytování jakýchkoli nových služeb, které byly postaveny nad EigenLayerem — někdo chce vytvořit orákulum, most, vrstvu dostupnosti dat, nový protokol konsensu. Cokoli z toho lze postavit nad EigenLayerem. Pokud jste staker, který se do toho zapojuje, specifikujete také, do jaké podmnožiny služeb se zapojujete — a tím získáváte příjmy a zároveň na sebe berete další riziko penalizace.

#### Jak EigenLayer sjednocuje ekosystém (23:50) {#how-eigenlayer-aligns-the-ecosystem-2350}

Pro middleware: pokud se staker, který již vložil stake do Etherea, rozhodne poskytovat služby také na orákulu, nemá žádné dodatečné náklady na kapitál. Už vložil stake na Ethereu a vydělává APR. Zapojením do EigenLayeru jsou mezní náklady na kapitál buď velmi malé, nebo teoreticky nulové. Pokud víte, že jako poctivý uzel nebudete nikdy penalizováni, riziko je minimalizováno. Rovnice pak zní: jsou provozní náklady ospravedlněny příjmy? Struktura nákladů middlewaru se najednou mění z omezené kapitálem na omezenou provozními náklady.

Pro decentralizované aplikace (dapp): zejména populární služby, do kterých se zapojí mnoho stakerů, poskytují stejnou důvěru jako samotné Ethereum. Pokud by se potenciálně zapojili všichni stakeři, mohli byste získat základní důvěru Etherea u služeb, které nebyly do Etherea nativně zabudovány.

Je to také hodnotově sladěno se základním ekosystémem. Stakeři, kteří vložili stake na Ethereu, získávají odměny za bloky a transakční poplatky, ale mohou také získat poplatky z orákul, poplatky za dostupnost dat, poplatky za řazení — to všechno jsou věci, které dříve nebyly k dispozici. Skutečnost, že existují další zdroje příjmů za staking ETH, zvyšuje hodnotu samotného tokenu.

EigenLayer je dvoustranné tržiště. Na jedné straně jsou stakeři, kteří se zapojují. Na druhé straně jsou middlewary a služby postavené nad EigenLayerem, které se rozhodnou tyto stakery využívat.

#### Přepákování a řízení rizik (33:00) {#over-leveraging-and-risk-management-3300}

**Otázka z publika:** Co když je stake přepákovaný?

Řekněme, že existuje deset různých dapp, které provozují své vlastní řetězce, z nichž každá má hodnotu 1 milion dolarů a spoléhá na stejné kvorum stakerů s hodnotou 2 miliony dolarů — tento stake se stává přepákovaným. EigenLayer je také vrstvou pro řízení rizik. Modelujeme to jako grafový problém: každý staker je uzel, každá služba závisí na skupině stakerů a pro každou službu existuje zisk z korupce. Pak na tomto grafu vypočítáte řezy, abyste zajistili, že systém nebude nikdy přepákovaný.

Pokud se systém přepákuje, poplatky se zvýší, zapojí se více lidí a systém se opět stane pod-pákovaným. Jak se spouští více služeb, rostou příležitosti k výnosům a uzamyká se více kapitálu — místo 5 % vložených ETH ve staku jich můžete mít 50 %.

#### Ekonomika blokového prostoru (43:58) {#block-space-economics-4358}

Blokový prostor je určen limitem bloku — maximální velikostí, kterou může blok pojmout. Všechny blockchainové systémy mají samoregulační ekonomiku, kde jakmile se velikost bloku blíží limitu bloku, ceny začnou raketově růst.

Limit bloku je dán infrastrukturou nejslabšího uzlu. Filozofií Etherea je připustit domácího validátora ve Venezuele — s rychlostí třeba 1 megabajt za sekundu. Takto je tedy limit bloku nastaven. Ale všichni stakeři běžící na Amazon Web Services mají 10gigabitové připojení — což je 10 000násobný rozdíl oproti nejslabšímu uzlu.

EigenLayer to automaticky řeší vytvořením volného trhu, kde tito stakeři mohou pronajímat svůj dodatečný blokový prostor pro jiné služby. Někdo by mohl postavit další řetězec s 15 giga-gas na blok místo 15 milionů gas. Získáte tak zhruba 60 % bezpečnosti Etherea — a to už je dostatečně dobré.

#### Heterogenita stakerů (48:57) {#staker-heterogeneity-4857}

Heterogenita stakerů přesahuje výpočetní schopnosti. Stakeři jsou vysoce heterogenní ve svých preferencích ohledně rizika a odměn. My dva se můžeme shodnout, že budeme penalizováni, pokud se budeme lišit od výstupu API Coinbase, ale pro někoho jiného to může být naprosto nepřijatelné. To nelze nikdy normalizovat do základního protokolu, ale lze to externalizovat do vrstvy, do které se lze dobrovolně zapojit (opt-in).

Stakeři jsou také heterogenní v preferencích odměn. V Ethereu je blokový prostor bezbarvá veličina — všechny transakce jsou si rovny a jediným signálem k jejich rozlišení je cena. Je velmi obtížné postavit sociální síť nad Ethereem, protože každá transakce sociální sítě soutěží s transakcí decentralizovaných financí (DeFi), která je na bázi jednotlivých transakcí mnohem ziskovější. Naše řešení: stakeři se zapojují do různých dílčích řetězců, ve kterých mají různé preference odměn.

#### Demokratické a agilní inovace (51:01) {#democratic-and-agile-innovation-5101}

EigenLayer řeší problém, jak navrhnout blockchain, který je demokratický a zároveň agilní v inovacích. Ethereum je spravováno velmi demokraticky, ale také velmi pomalu reaguje. Všechny dnešní protokoly dělají kompromis mezi agilitou a demokratickou správou. Ethereum plus EigenLayer získává to nejlepší z obou světů: základní vrstvu, která je demokratická a pomalu se aktualizuje, a nad ní EigenLayer umožňuje lidem budovat inovace, které rychle reagují na požadavky trhu způsobem zcela nevyžadujícím povolení.

#### EigenDA a závěr (52:56) {#eigenda-and-closing-5256}

Zkoumáme budování mostů, automatizaci řízenou událostmi, služby spravedlivého řazení, postranní řetězce a integraci MEV — to vše na EigenLayeru. EigenLayer je již v provozu na interních testnetech. Již jsme vytvořili první případ užití: hyperškálovatelnou vrstvu dostupnosti dat pro Ethereum s názvem EigenDA. Je to vrstva dostupnosti dat, která zahrnuje ty nejlepší myšlenky z výmazového kódování a polynomiálních závazků. Na našem testnetu je rychlost, jakou můžete zapisovat data, 12,4 megabajtů za sekundu — 10× více, než co má podle plánu přinést Ethereum 2.0.

Klíčovým poznatkem je, že s výmazovým kódováním nezávisí celkové náklady na uložení souboru na počtu uzlů, které se zapojily. Ale cena, kterou si můžete účtovat, závisí na počtu uzlů, protože poskytujete větší ekonomickou bezpečnost. Funguje zde samoškálovatelná ekonomika, kdy se bude zapojovat stále více uzlů, protože si mohou účtovat bezpečnostní přirážku bez zvýšení provozních nákladů. Výmazové kódování prolamuje kompromis mezi škálovatelností a decentralizací — získáte plnou decentralizaci a plnou škálovatelnost současně.

#### To nejdůležitější z otázek a odpovědí (58:00) {#qa-highlights-5800}

**K auditům middlewaru:** Stejně jako existuje ekosystém auditů chytrých kontraktů, potřebujeme ekosystémy auditů middlewaru. Audit chytrých kontraktů slouží uživatelům, u kterých se předpokládá, že nic nevědí. Audit middlewaru slouží stakerům, u kterých se předpokládá, že něco vědí. Pokud nedokážeme zprovoznit audity middlewaru, neměli bychom ve skutečnosti důvěřovat ani auditům chytrých kontraktů.

**K riziku:** Extrémní příklad — veškerý stake se zapojil do systému EigenLayer, kde byste mohli být penalizováni, i když neuděláte nic špatného, a pak jste penalizováni a celý protokol je v ohrožení. Je to možné. Ale jsou to stakeři, kdo přichází o své peníze, takže by měli být při zapojování opatrnější. Usnadnit jim tuto opatrnost je to, na co se zaměřujeme.

**K blokovému prostoru na vrstvě 1 (l1) vs. postranní řetězce:** Nad sítí důvěry Etherea můžete provozovat velmi odlišný systém — jako je Solana VM. Podmínka penalizace je jednoduchá: pokud dvakrát podepíšete blok ve stejné hloubce, je to onchain ověřitelná podmínka a budete penalizováni. Struktura nákladů funguje, protože restakeři nemají žádné dodatečné náklady na kapitál, a rozdíl mezi postranním řetězcem na EigenLayeru a vlastním řetězcem je ten, že nepotřebujete nový hodnotový token a nemusíte platit za udržování nákladů na kapitál tohoto tokenu.