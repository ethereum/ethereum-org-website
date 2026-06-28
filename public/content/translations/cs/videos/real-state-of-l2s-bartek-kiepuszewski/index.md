---
title: "Hlavní přednáška: SKUTEČNÝ stav L2"
description: "Přednáška o současném stavu řešení vrstvy 2 (L2), která zkoumá propast mezi sliby o bezpečnosti rollupů a realitou a navrhuje cestu ke skutečné decentralizaci."
lang: cs
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "scaling-and-layer-2"
  - "rollups"
  - "layer-2"
format: presentation
author: Ethereum Foundation
breadcrumb: "Stav L2"
---

Hlavní přednáška, kterou přednesl **Bartek Kiepuszewski**, zakladatel L2BEAT, na konferenci Devcon SEA. Zkoumá současný stav řešení vrstvy 2 (L2), propast mezi sliby o bezpečnosti rollupů a realitou, nové kategorie hodnocení a závazek L2BEAT věnovat v příštím roce značné prostředky na ověřování systémů důkazů.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=ik2JxmHDmyw) zveřejněného Nadací Ethereum. Pro lepší čitelnost byl lehce upraven.*

#### Úvod (0:00) {#introduction-000}

Jako zakladatel L2BEAT mám jedinečnou příležitost spolupracovat v podstatě s každým týmem vrstvy 2 (L2), který existuje, a pracujeme s nimi od samého počátku tohoto odvětví – což je asi před čtyřmi lety. To je neuvěřitelné. Čas letí velmi rychle. Spolupracovali jsme s ranými průkopníky v technologii s nulovým vědomím (ZK), pracovali jsme s Plasma Group, která se přejmenovala na Optimism, pracovali jsme s Arbitrum. A z tohoto pódia chci všem těmto týmům vyjádřit uznání, protože bez vaší podpory bychom tu určitě nebyli. Jako L2BEAT jsme nesmírně vděční za veškerou podporu, kterou nám komunita poskytuje.

Pojďme se tedy podívat na to, čeho se nám podařilo dosáhnout. Především se nám podařilo spustit téměř 50 rollupů a více než 50 dalších L2. To je neuvěřitelný úspěch – je to spousta systémů a téměř stejný počet jich máme spustit v nadcházejících měsících. Do těchto systémů jsme také vložili velkou hodnotu, velkou celkovou uzamčenou hodnotu (TVL), a když se podíváte na grafy, všechny jdou jen nahoru.

Jde o to, že s celým tímto růstem přichází také velká zodpovědnost. Musíme pochopit, že koncoví uživatelé, kteří tyto systémy používají, vkládají peníze do těchto rollupů, protože věří, že rollupy dědí bezpečnost Etherea. S tímto uvědoměním bychom podle mého názoru měli začít brát bezpečnost vážně.

#### Škálování Etherea (2:10) {#scaling-ethereum-210}

Podařilo se nám také škálovat Ethereum. Ethereum si vedlo docela dobře, ale vzhledem k poptávce začalo být opravdu pomalé a poplatky byly velmi vysoké. Takže určitě škálujeme – tato čísla také rostou. To je neuvěřitelné.

Je tu však jedno „ale“. Víte, lidi, vždycky je nějaké „ale“, že? A já jsem tu jen proto, abych k vám všem byl upřímný. Opravdu chci, aby toto odvětví začalo být bráno vážně, a toto je moje příležitost požádat vás o podporu, abychom se ujistili, že neselžeme – že nezklameme očekávání komunity. Musíme začít brát bezpečnost toho, co budujeme, opravdu vážně.

Protože víte, už příliš dlouho používáme pomocná kolečka. Pokud jste dospělí a používáte pomocná kolečka – a opakuji, už jsou to čtyři roky – pak jste opravdu nezralí. Je v pořádku používat pomocná kolečka, když jste dítě. Není v pořádku je používat, když jste dospělí. A myslím, že je načase, abychom se za to všichni přestali stydět. Měli bychom o tom všichni mluvit a neměli bychom trpět syndromem císařových nových šatů.

#### Velké „ale“: chybějící systémy důkazů (4:30) {#the-big-but-missing-proof-systems-430}

Co je tedy to velké „ale“? No, za prvé, většina L2 dnes nemá systém důkazů, což je docela překvapivé, protože raní průkopníci jako StarkNet, zkSync nebo Aztec – před čtyřmi lety, když spouštěli své první aplikačně specifické rollupy, systémy důkazů měli. Takže ano, dnes můžete spustit L2 jedním kliknutím na tlačítko. Je to ale opravdu L2? Je to opravdu rollup? To, co děláte, je spuštění něčeho, co je zabezpečeno pomocí multisig. Nemyslím si, že to je dostatečné.

Stav ekosystému dnes vypadá zhruba jako na tomto diagramu. Vlevo vidíte současné L2 se systémem důkazů. Vpravo vidíte současné L2 bez systému důkazů. A vsadil bych se, že drtivá většina nadcházejících L2 systém důkazů mít nebude. To by zahrnovalo v podstatě každý jednotlivý řetězec OP Stack kromě OP Mainnet a Base – a klobouk dolů před nimi, mimochodem, jsou to šampioni. Nicméně každý další řetězec OP Stack prostě systém důkazů nemá.

Tento graf vpravo bude zahrnovat také všechny stacky Orbit, které sice mají systém důkazů, ale ve skutečnosti se skrývá za často velmi krátkým seznamem povolených adres s řízeným přístupem. Někdy je na tomto seznamu pouze jeden aktér – je to stejný aktér jako navrhovatel stavu. Je to v podstatě navrhovatel stavu a pouze on může zpochybnit sám sebe. Jako, cože? Vážně.

#### Bezpečnostní rady (6:00) {#security-councils-600}

Většina L2 dnes nepoužívá bezpečnostní rady. Co myslíme bezpečnostní radou? Bezpečnostní rada je v podstatě multisig, který se skládá z nejméně osmi účastníků a vyžaduje 75% práh pro konsensus. Můžete si to tedy představit jako velký multisig, ale nejde jen o velikost – jde o to, že chceme, aby účastníci byli geograficky decentralizovaní. Možná jste včera slyšeli úžasnou prezentaci o potřebě geografické diverzifikace. To je to, co od těchto struktur chceme. A v podstatě chceme, aby účastníci pocházeli především z různých společností a různých jurisdikcí. To je nesmírně důležité a já vám ukážu několik příkladů proč.

Představte si bezpečnostní rady jako tyto vylepšené multisigy. Je za nimi velmi důležitá sociální vrstva. Takže toto je současný stav věcí a znovu, je to velmi špatné. Bezpečnostní rady máme pouze u Arbitrum, Optimism, Polygon, zkSync – a vím, že StarkNet, Scroll a zajímavé je, že i Fuel se spouštějí s bezpečnostní radou. Všichni ostatní jsou v podstatě velmi malý, interní, často soukromý multisig a upřímně řečeno, je nesmírně těžké rozeznat rozdíl mezi těmito multisigy a jednoduchými EOA (externě vlastněnými účty).

#### Předpoklady důvěry pro dostupnost dat (7:25) {#data-availability-trust-assumptions-725}

Třetí velkou věcí, kterou jsme udělali špatně, je to, že většina L2, které nejsou rollupy, je nastavena s propastnými předpoklady důvěry pro dostupnost dat (DA). A používám slovo „propastnými“ – za A, protože se mi líbí, a za B, protože je to opravdu, ale opravdu špatné.

Podívejte se na tyto příklady vlevo – Arbitrum, StarkEx, Immutable X. Nicméně téměř všichni ostatní doslova posílají DA na svůj server ve sklepě nebo tak něco. Nemáme tušení. Doslova nemáme tušení. Jde o to, že jsou na tom opravdu špatně a zdá se, že je to nezajímá. Takže možná to nezajímá ani uživatele – nevíme. Ale musíme se na ta data opravdu podívat a říct všem: hej, tohle není výbor pro dostupnost dat.

Výbor pro dostupnost dat byl původně vytvořen a prosazován společností StarkWare pro implementace StarkEx a společností Arbitrum. Ale o to nešlo – že si můžete říct: „Mám jeden server ve sklepě, můžu tomu říkat výbor pro dostupnost dat.“ To nebyl smysl tohoto cvičení.

Takže celkově vzato, je mi líto, že to musím říct, ale v současné době mohou ve většině L2 operátoři s řízeným přístupem ukrást nebo zmrazit vaše prostředky. Jsme tu proto, abychom vás na to všechny upozornili. Nerad to říkám, ale musíme změnit přístup.

#### Proč záleží na systémech důkazů (8:40) {#why-proof-systems-matter-840}

Proč bychom se měli zajímat o systémy důkazů? Podle našeho názoru existují minimálně tři dobré důvody, proč bychom všichni měli mít fungující systém důkazů.

Jedním z nich je, že to ve skutečnosti umožňuje výstup nevyžadující povolení v případě, že jsou všichni operátoři mimo provoz – a mohou být mimo provoz z jakéhokoli důvodu. Docela nedávno jsme tu měli případ výpadku dYdX. Varovali uživatele, spousta uživatelů neprovedla výstup. Pokud však máte systém důkazů, můžete systém nastavit tak, aby jej někdo převzal způsobem nevyžadujícím povolení, nebo můžete vybudovat únikový mechanismus, aby uživatelé mohli získat své prostředky zpět. To je nesmírně důležité. Bez systému důkazů to prostě udělat nemůžete – je to nemožné.

Druhým důvodem je, že můžete skutečně vylepšit předpoklady důvěry bezpečnostní rady – za předpokladu, že ji samozřejmě máte. A důvod je docela nuancovaný. Nyní můžete udělat toto: místo situace, kdy škodlivý navrhovatel – a toto je diagram ukazující základní optimistický rollup bez systému důkazů, který dnes můžete vidět v mnoha OP Stacks – existuje velmi silný multisig, který může přepsat kořen stavu, a existuje navrhovatel, který navrhuje kořeny stavu. Pokud je tento návrh škodlivý, stačí mu podplatit menšinu členů bezpečnostní rady, aby se dívali jinam – ne aby udělali něco škodlivého, ale aby prostě nedělali nic, v takovém případě škodlivý návrh skutečně projde a oni ukradnou prostředky.

Jakmile zavedete systém důkazů, situace je pro škodlivého navrhovatele mnohem těžší, protože nyní musí podplatit **většinu** bezpečnostní rady. Nejenže musí podplatit většinu, musí je skutečně přimět, aby udělali něco škodlivého – ne se jen prostě dívat jinam. To je úplně jiná situace. Přimět někoho, aby se díval jinam, znamená říct: „Hej, když ti dám 10 milionů dolarů, prostě ztratíš klíče nebo poletíš na dlouhý mezinárodní let.“ Pokud chcete někoho přimět, aby udělal něco škodlivého, je to úplně jiná situace. Myslíme si, že to zásadně mění předpoklady důvěry, zejména u veřejné bezpečnostní rady.

A konečně, systémy důkazů – pokud jste ve Fázi 2 (Stage 2) – vám umožňují odstranit jakékoli zprostředkovatele. Nepotřebujete bezpečnostní radu, nebo pokud ji máte, je to jen pro nouzové situace. To může mít ve skutečnosti hluboké regulační důsledky. Možná budete chtít spustit svou L2 jako systém Fáze 2 hned od začátku. To je možné, ale samozřejmě musíte mít systém důkazů – v ideálním případě jich možná budete chtít mít více. Už existují nějaká oznámení o systémech, které to dělají, jako nedávné oznámení od týmu Nethermind, který buduje rollup zamýšlený jako Fáze 2 již při spuštění.

#### Proč bezpečnostní rady, a ne multisigy (11:29) {#why-security-councils-not-multisigs-1129}

To bylo o systémech důkazů. Nyní, proč bezpečnostní rady a ne jen jednoduché multisigy? Důvod je ten: nevěřte, že multisigy jsou multisigy. To je ten důvod – pokud neexistuje sociální vrstva, která by vás skutečně přesvědčila, že jsou zásadně diverzifikované.

V naší historii jsme měli několik velkých událostí. Měli jsme Multichain, který tvrdil, že je velmi decentralizovaný, a ukázalo se, že ne, nebyl – a to je tvrzení, které nemůžete skutečně nezávisle ověřit. Obrovský útok, nebo práce zevnitř, nebo podvod (rug pull) – nejsme si jisti.

Pak jsme tu měli situaci s Oasis, kdy je oslovil britský soud a oni museli skutečně použít multisig k vytažení nějakých prostředků z protokolu. Bylo by nemožné to udělat, kdybyste měli geopoliticky diverzifikovanou bezpečnostní radu, protože neexistuje žádný soudní příkaz, který by mohl skutečně dosáhnout na všechny.

A konečně, docela nedávno jsme tu měli útok na multisig. Ani na vteřinu si nemyslete, že multisigy nemohou být napadeny. Nakonec se jich musíme všech zbavit.

Takže abych to shrnul: pokud máte rollup Fáze 0 bez bezpečnostní rady, v podstatě si škodlivý operátor může s vašimi prostředky dělat, co chce. Pokud jste rollup Fáze 0 s bezpečnostní radou, pak útočník musí podplatit menšinu bezpečnostní rady – možná těžká věc, ale mnohem snazší než podplatit většinu bezpečnostní rady, což byste museli udělat, pokud má váš rollup systém důkazů. A konečně, nikdo vám nemůže ukrást prostředky, pokud jste ve Fázi 2. To je slib dosažení Fáze 2.

#### Navrhovaná reklasifikace (13:10) {#proposed-reclassification-1310}

Otázkou je: máme správné pobídky pro projekty, aby se o to skutečně zajímaly? Problém je v tom, že jediné, co můžeme udělat – my jako L2BEAT a my jako komunita Etherea – je vyvíjet sociální tlak. Vitalik řekl, že od příštího roku plánuje veřejně zmiňovat pouze L2, které jsou ve Fázi 1. Dříve dokonce řekl, že nebude nazývat systémy rollupy, pokud nebudou ve Fázi 1.

Takže jsme přemýšleli, co můžeme udělat. V současné době máme fáze pro rollupy. Nemáme fáze pro Validium a optimia. Dlouho jsme přemýšleli – možná bychom mohli zavést „Fázi 0+“ pro systémy, které mají systémy důkazů, ale ještě nejsou ve Fázi 1. Ale po měsících diskusí jsme se rozhodli: ne, je čas dospět.

To, co navrhujeme komunitě – a to půjde na fórum pro zpětnou vazbu od komunity – je toto. Za prvé, chceme vytvořit samostatnou kategorii pro systémy. Hlavní rozdíl je v tom, že abyste byli ve Fázi 0, budete muset mít systém důkazů. Takže například StarkNet dnes bude podle této klasifikace Fáze 0. Všechny řetězce OP Stack, které nemají systém důkazů – kromě Base a Optimism – do této kategorie nespadnou. A samozřejmě dáme systémům čas na přizpůsobení. To je hlavní kategorie a ta by měla být jako superliga systémů.

Pak tu máte další kategorii systémů, které nepoužívají DA Etherea. Používají dodatečné předpoklady důvěry, které přicházejí s externí DA. Říkáme jim „alt-DA“, ale zahrnovaly by Validium, optimia a jakoukoli hybridní konstrukci, kterou můžete vytvořit. Musí vám však poskytnout rozumné záruky DA – to nemůže být váš sklep. Musí to být přiměřeně velký výbor pro dostupnost dat, nebo pokud používáte Celestia nebo Avail, musíte použít most.

#### Kategorie „ostatní“ a závazek L2BEAT (16:05) {#the-others-category-and-l2beats-pledge-1605}

A co ty ostatní? Zařadíme je do třetí kategorie, kterou nazýváme – a teď čekám na zpětnou vazbu od komunity, jak tyto systémy pojmenovat – náš pracovní název je „ostatní“. Jde o to, že jsou zabezpečeny multisigy a my tyto multisigy odhalíme takové, jaké jsou. To je to, co chceme udělat v našem uživatelském rozhraní (UI).

Uživatelské rozhraní bude vypadat zhruba takto: uvidíte toto rozdělení – rollupy, Validium a optimia a ostatní. A výchozí řazení bude podle bezpečnosti, ne podle celkové uzamčené hodnoty (TVL). Nehoňme se za TVL se špatnou bezpečností – to dopadne opravdu špatně.

Budeme propagovat projekty Fáze 1 a Fáze 2. Na projekty Fáze 0 se budeme dívat jako na uchazeče. Co se týče „ostatních“, rádi je zařadíme na seznam – budeme extrémně liberální. V podstatě jen musíte být v souladu s Ethereem a samozřejmě mít most, který vám umožní přesouvat prostředky. Budeme se však dívat na předpoklady důvěry a multisigy a doufáme, že pomalu, ale jistě se systémy přesunou z „ostatních“ buď do Validium/optimium, nebo do rollupů.

Takto si myslíme, že by kategorie „ostatní“ vypadala – toto jsou skutečná data právě teď, skutečné systémy, které mohou do této kategorie spadnout, pokud nezavedou systém důkazů. Uvidíte přesně, kdo je navrhovatel, kdo je vyzyvatel a kdo provádí upgrady. Vtipné je, že to dnes můžete vidět na L2BEAT – jenže tyto informace jsou tak hluboko skryté na stránce s podrobnostmi, že se vsadím, že si je prohlížejí jen výzkumníci a nadšenci. Všechno je to dostupné už dnes. My však chceme tato data odhalit koncovým uživatelům. Chceme, aby si koncoví uživatelé byli skutečně vědomi toho, co se děje, abychom byli všichni zodpovědní za systémy, které budujeme.

Stačí jen říct „mám systém důkazů“? Ne. Náš závazek vůči komunitě jako L2BEAT je, že v příštím roce vložíme značné prostředky do toho, abychom se na tyto systémy důkazů podívali opravdu velmi důkladně a do hloubky, abychom se ujistili, že jsou spolehlivé a úplné. Budeme analyzovat jak ZK, tak optimistické. Půjdeme do zdrojového kódu, podíváme se, jak jste vytvořili své důvěryhodné nastavení, podíváme se na vaše obvody a uvidíme, co přesně se ověřuje onchain. Chceme udělat vše super transparentní, aby byly předpoklady důvěry jasně komunikovány – a co je důležitější, váš systém důkazů se nemůže skrývat za nepřiměřeně malým seznamem povolených adres.

Najímáme výzkumníky. Uděláme veškerou tuto práci. To je náš závazek pro příští rok. Doufám, že příští rok bude rokem L2 a rollupů – nejde však o spuštění rollupu jedním kliknutím na tlačítko. Jde o to, že chcete být schopni spustit systém s dobrou bezpečností. V ideálním případě chcete zdědit co nejvíce bezpečnosti z Etherea. Čeká nás všechny spousta práce, abychom toho dosáhli. Ale pokud to neuděláme, pak v podstatě jen vytváříme tisíce nezabezpečených postranních řetězců (sidechains). Myslím, že to jako komunita nechceme.

#### Otázky a odpovědi (18:45) {#qa-1845}

**Moderátor:** Pojďme na otázky a odpovědi. Je důležité, aby rollupy měly decentralizovaný sekvencer, nebo postačují jiné bezpečnostní mechanismy?

**Bartek Kiepuszewski:** To je velmi dobrá a důležitá otázka. Myslím, že uvidíme různé návrhy. Nemyslím si, že decentralizace sekvenceru je pro bezpečnost uživatelských prostředků super důležitá, ale může být důležitá pro odolnost vůči cenzuře v reálném čase v určitých situacích. Vitalik během své úvodní přednášky řekl, že budoucnost může být taková, že uvidíme rollupy založené na základní vrstvě (based rollups) – využívající infrastrukturu Etherea k boji proti cenzuře v reálném čase – zatímco jiné, jako řekněme MegaETH, mohou mít ve skutečnosti velmi centralizovaný sekvencer a spoléhat se pouze na únikový mechanismus. Možná uvidíme hybridní konstrukce. Myslím, že prostor pro návrh je obrovský, a právě teď v L2BEAT opravdu chceme vidět, co se stane a jak se to vyvine.

**Moderátor:** Budou systémy důkazů založené na TEE považovány za Fázi 2, i když implikují důvěru ve výrobce hardwaru?

**Bartek Kiepuszewski:** Krátká odpověď zní ne, protože u konstrukcí, které vidíme dnes, pokud používáte SGX, by Intel mohl předložit důkaz a mohl by potenciálně zablokovat, ukrást nebo zmrazit cokoli by chtěl, aniž by si toho někdo skutečně všiml – a aniž by si toho všimlo Ethereum. Nicméně se vší tou prací, která se vynakládá na vytvoření TEE nevyžadujících důvěru a nevyžadujících povolení – bylo mi řečeno, že je to ve skutečnosti nesmírně vzrušující práce. Ale krátká odpověď: dnes ne.

**Moderátor:** Proč je Optimism klasifikován jako Fáze 1? Na základě hodnocení nejsou – Nadace zcela kontroluje proces návrhů.

**Bartek Kiepuszewski:** V podstatě splňují všechna kritéria. Nejde ani tak o proces návrhů – jde o to, kdo kontroluje prostředky. Můžete mít centralizovaného navrhovatele, nicméně existuje záložní řešení. Pokud vypadnou, pak se celý systém stane více nevyžadujícím povolení. Myslím, že je důležité si uvědomit, jaká je role bezpečnostní rady. Chceme, aby vám systémy Fáze 1 umožnily výstup, pokud se centralizovaný navrhovatel zastaví. Například u dYdX byl návrh super centralizovaný, nicméně když se zastavili, lidé mohli provést výstup. Takže nejde o to, zda jste centralizovaní nebo decentralizovaní – jde o to, zda můžete skutečně provést výstup způsobem nevyžadujícím povolení.

Splnili všechna kritéria. Mimochodem, kritéria jsme upřesňovali – kritéria nejsou něco, co je vytesáno do kamene, protože všechny tyto systémy se vyvíjejí, takže se musíme vyvíjet s těmito systémy. Kritéria se mohou trochu měnit a my velmi pečlivě sledujeme jak Optimism, tak Arbitrum, protože to jsou jasně dva lídři. Je tu spousta nuancí, do kterých nemám čas zacházet. Ale není to tak, že máte označení fáze navždy – pokud se objeví nové informace nebo něco, co jsme možná přeskočili nebo přehlédli, je docela možné, že toto označení ztratíte.

**Moderátor:** Jaké jsou hlavní důvody, proč projekty nebudují směrem k Fázi 1?

**Bartek Kiepuszewski:** Složitost, čas, náklady, talent. Je to překvapivě nákladné. Jak jsem řekl, průkopníci před čtyřmi lety v podstatě budovali – dYdX byl doslova jedním z prvních, ne-li prvním, ZK rollupem. Byl aplikačně specifický, ale přesto byl první. A nebýt malých nuancí, byla by to Fáze 2 – ve skutečnosti selhává proces správy, který pro Fázi 2 vyžadujeme. Ale pro všechny praktické účely je to systém Fáze 2. Byl postaven před čtyřmi lety, takže to není tak, že by to bylo nemožné.

Myslím, že to, co dnes dělá pro všechny rollupy super těžkým to skutečně udělat, je upřímně řečeno to, že většina rollupů není budována týmy – jsou spouštěny poskytovateli rollup-as-a-service (rollup jako služba) a my je musíme motivovat, aby to dělali lépe. A je to těžké. Nikdo neřekl, že to bude snadné.