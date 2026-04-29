---
title: "Vysvětlení škálování Etherea na vrstvě 2"
description: "Přehled řešení škálování na vrstvě 2 pro Ethereum, včetně rollupů, Plasmy, stavových kanálů a postranních řetězců."
lang: cs
youtubeId: "BgCgauWVTs0"
uploadDate: 2021-02-03
duration: "0:14:28"
educationLevel: intermediate
topic:
  - "scaling"
  - "layer-2"
format: explainer
author: Finematics
breadcrumb: "Škálování na vrstvě 2"
---

Vysvětlující video od **Finematics**, které pokrývá řešení škálování na vrstvě 2 pro Ethereum — včetně kanálů, Plasmy, postranních řetězců a rollupů, a proč se rollupy stávají dominantní strategií škálování. Zjistěte, jak tyto technologie snižují náklady a zvyšují propustnost, zatímco dědí bezpečnost Etherea.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=BgCgauWVTs0) publikovaného kanálem Finematics. Byl lehce upraven pro lepší čitelnost.*

#### Škálování Etherea (0:31) {#ethereum-scaling-031}

Škálování Etherea je jedním z nejdiskutovanějších témat v podstatě od doby, kdy byla síť spuštěna. Debata o škálování se vždy zintenzivní po období velkého přetížení sítě.

Jedním z prvních takových období byl krypto býčí trh v roce 2017, kdy nechvalně známé CryptoKitties spolu s ICO dokázaly ucpat celou síť Ethereum, což způsobilo obrovský nárůst poplatků za gas. Letos se přetížení sítě vrátilo ještě silněji, tentokrát způsobené popularitou decentralizovaných financí (DeFi) a výnosového farmaření. Byla období, kdy ani poplatky za gas ve výši 500+ Gwei nezajistily ověření vaší transakce po nějakou dobu.

#### Škálování blockchainů (1:20) {#scaling-blockchains-120}

Pokud jde o škálování Etherea nebo blockchainů obecně, existují dva hlavní způsoby, jak to udělat: škálování samotné základní vrstvy — vrstvy 1 (l1) — nebo škálování sítě přesunutím části práce na jinou vrstvu — vrstvu 2 (l2).

Vrstva 1 je standardní základní vrstva konsensu, kde se v současnosti vypořádávají téměř všechny transakce. Koncept vrstev není specifický pouze pro Ethereum; i další blockchainy, jako je Bitcoin nebo Zcash, jej hojně využívají.

Vrstva 2 je další vrstva postavená nad vrstvou 1. Je zde několik důležitých bodů: vrstva 2 nevyžaduje žádné změny ve vrstvě 1 — může být jednoduše postavena nad vrstvou 1 s využitím jejích stávajících prvků, jako jsou chytré kontrakty. Vrstva 2 také využívá bezpečnost vrstvy 1 tím, že ukotvuje svůj stav do vrstvy 1.

Ethereum v současnosti dokáže zpracovat přibližně 15 transakcí za sekundu na své základní vrstvě. Škálování na vrstvě 2 může dramaticky zvýšit počet transakcí — v závislosti na řešení může zpracovávat mezi 2 000 a 4 000 transakcemi za sekundu.

#### Ethereum 2.0 (2:39) {#ethereum-20-239}

A co Ethereum 2.0? Nemělo to škálovat Ethereum? Ano — Ethereum 2.0 zavádí důkaz podílem (PoS) a sharding, což dramaticky zvýší propustnost transakcí na základní vrstvě.

Znamená to, že nebudeme potřebovat škálování na vrstvě 2, až bude spuštěno Ethereum 2.0? Ne tak docela — i se shardingem bude Ethereum stále potřebovat škálování na vrstvě 2, aby v budoucnu zvládlo stovky tisíc nebo dokonce miliony transakcí za sekundu.

#### Trilema škálovatelnosti (3:15) {#scalability-trilemma-315}

Zde také vstupuje do hry slavné trilema škálovatelnosti. Teoreticky bychom mohli vrstvu 2 úplně přeskočit a zaměřit se místo toho na škálování základní vrstvy. To by vyžadovalo vysoce specializované uzly pro zvládnutí zvýšené zátěže, což by vedlo k vyšší centralizaci a tím ke snížení bezpečnosti a odolnosti sítě vůči cenzuře.

Pokud se budeme držet faktu, že škálovatelnost by nikdy neměla být na úkor bezpečnosti a decentralizace, zbývá nám pro budoucnost kombinace škálování na vrstvě 1 a vrstvě 2.

#### Škálování na vrstvě 2 (3:52) {#layer-2-scaling-352}

Škálování na vrstvě 2 je souhrnný termín pro řešení, která pomáhají zvyšovat schopnosti vrstvy 1 tím, že zpracovávají transakce offchain. Dvě hlavní schopnosti, které lze zlepšit, jsou rychlost transakcí a propustnost transakcí. Navíc mohou řešení na vrstvě 2 výrazně snížit poplatky za gas.

Pokud jde o samotná řešení škálování, je k dispozici několik možností. Některé z nich jsou dostupné již nyní a mohou zvýšit propustnost sítě Ethereum v krátkodobém až střednědobém horizontu, zatímco jiné cílí na střednědobý až dlouhodobý časový horizont. Některá řešení jsou specifická pro konkrétní aplikace — například platební kanály — zatímco jiná, jako jsou optimistické rollupy, lze použít pro jakékoli libovolné provádění kontraktů.

#### Kanály (5:03) {#channels-503}

Kanály jsou jedním z prvních široce diskutovaných řešení škálování. Umožňují účastníkům vyměnit si své transakce mnohokrát, přičemž do základní vrstvy odešlou pouze dvě transakce. Nejoblíbenějšími typy kanálů jsou stavové kanály a jejich podtyp, platební kanály.

Ačkoli mají kanály potenciál snadno zpracovat tisíce transakcí za sekundu, přinášejí s sebou několik nevýhod. Nenabízejí otevřenou účast — účastníci musí být známi předem a uživatelé musí uzamknout své prostředky v multisig kontraktu. Navíc je toto řešení škálování specifické pro danou aplikaci a nelze jej použít ke škálování univerzálních chytrých kontraktů.

Hlavním projektem, který využívá sílu stavových kanálů na Ethereu, je Raiden. Koncept platebních kanálů také hojně využívá Lightning Network na Bitcoinu.

#### Plasma (6:04) {#plasma-604}

Plasma je řešení škálování na vrstvě 2, které původně navrhli Joseph Poon a Vitalik Buterin. Je to framework pro budování škálovatelných aplikací na Ethereu.

Plasma využívá chytré kontrakty a Merkleovy stromy k umožnění vytvoření neomezeného počtu dceřiných řetězců — kopií mateřského blockchainu Etherea. Přesunutí transakcí z hlavního řetězce do dceřiných řetězců umožňuje rychlé a levné transakce.

Jednou z nevýhod Plasmy je dlouhá čekací doba pro uživatele, kteří chtějí vybrat své prostředky z vrstvy 2. Plasmu, podobně jako kanály, nelze použít ke škálování univerzálních chytrých kontraktů. OMG Network je postavena na vlastní implementaci Plasmy zvané More Viable Plasma. Matic Network je dalším příkladem platformy využívající upravenou verzi frameworku Plasma.

#### Postranní řetězce (7:08) {#sidechains-708}

Postranní řetězce jsou nezávislé blockchainy kompatibilní s Ethereem, které mají vlastní modely konsensu a parametry bloků. Interoperabilita s Ethereem je umožněna použitím stejného Ethereum Virtual Machine (EVM), takže kontrakty nasazené na základní vrstvu Etherea mohou být přímo nasazeny na postranní řetězec.

xDai je jedním z příkladů takového postranního řetězce.

#### ZK rollupy (8:11) {#zk-rollups-811}

Rollupy poskytují škálování tím, že sdružují — nebo „rolují“ — transakce z postranního řetězce do jediné transakce a generují kryptografický důkaz, známý také jako SNARK (Succinct Non-interactive Argument of Knowledge). Do základní vrstvy se odesílá pouze tento důkaz. U rollupů se veškerý stav transakcí a jejich provádění řeší v postranních řetězcích; hlavní řetězec Etherea ukládá pouze data transakcí.

Existují dva typy rollupů: ZK rollupy a optimistické rollupy.

ZK rollupy, ačkoli jsou rychlejší a efektivnější než optimistické rollupy, neposkytují snadný způsob, jak by stávající chytré kontrakty mohly migrovat na vrstvu 2.

Optimistické rollupy provozují virtuální stroj kompatibilní s EVM zvaný OVM (Optimistic Virtual Machine), který umožňuje provádět stejné chytré kontrakty, jaké lze provádět na Ethereu. To je velmi důležité, protože to usnadňuje stávajícím chytrým kontraktům zachovat si svou skládatelnost, což je extrémně relevantní v DeFi, kde již byly všechny hlavní chytré kontrakty otestovány v praxi.

Jedním z hlavních projektů pracujících na optimistických rollupech je Optimism, který se stále více blíží ke spuštění svého Mainnetu. Pokud jde o ZK rollupy, Loopring a DeversiFi jsou dobrými příklady decentralizovaných burz postavených na vrstvě 2. Navíc tu máme zkSync, který umožňuje škálovatelné krypto platby.

#### Plán zaměřený na rollupy (9:18) {#a-rollup-centric-roadmap-918}

Škálovatelnost rollupů může být také umocněna Ethereem 2.0. Ve skutečnosti, protože rollupy potřebují škálovat pouze datovou vrstvu, mohou získat obrovskou podporu již ve Fázi 1 Etherea 2.0, která se týká shardingu dat.

Navzdory spektru dostupných řešení škálování na vrstvě 2 se zdá, že komunita Etherea se sbližuje v přístupu škálování převážně prostřednictvím rollupů a shardingu dat ve Fázi 1 Etherea 2.0. Tento přístup byl také potvrzen v nedávném příspěvku Vitalika Buterina s názvem „A Rollup-Centric Ethereum Roadmap“.

V budoucích videích prozkoumáme škálování základní vrstvy pomocí Etherea 2.0 a jak může škálování na vrstvě 1 i vrstvě 2 pomoci zpřístupnit decentralizované finance všem.