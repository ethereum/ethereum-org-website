---
title: "Škálování"
description: "Úvod do různých možností škálování, které v současnosti vyvíjí komunita Etherea."
lang: cs
sidebarDepth: 3
---

## Přehled škálování {#scaling-overview}

S tím, jak roste počet lidí používajících [Ethereum](/), dosáhl blockchain určitých kapacitních omezení. To vedlo ke zvýšení nákladů na používání sítě a vytvořilo potřebu „řešení škálování“. Zkoumá se, testuje a implementuje několik řešení, která k dosažení podobných cílů přistupují různými způsoby.

Hlavním cílem škálovatelnosti je zvýšit rychlost transakcí (rychlejší finalita) a propustnost transakcí (vyšší počet transakcí za sekundu) bez obětování decentralizace nebo bezpečnosti. Na blockchainu Etherea na vrstvě 1 (l1) vede vysoká poptávka k pomalejším transakcím a neúnosným [cenám gasu](/developers/docs/gas/). Zvýšení kapacity sítě z hlediska rychlosti a propustnosti je zásadní pro smysluplné a masové přijetí Etherea.

Ačkoli jsou rychlost a propustnost důležité, je nezbytné, aby řešení škálování umožňující tyto cíle zůstala decentralizovaná a bezpečná. Udržení nízké bariéry vstupu pro provozovatele uzlů je kritické pro zabránění posunu směrem k centralizovanému a nezabezpečenému výpočetnímu výkonu.

Koncepčně nejprve rozdělujeme škálování na onchain škálování a offchain škálování.

## Předpoklady {#prerequisites}

Měli byste dobře rozumět všem základním tématům. Implementace řešení škálování je pokročilá, protože technologie je méně prověřená v praxi a nadále se zkoumá a vyvíjí.

## Onchain škálování {#onchain-scaling}

Onchain škálování vyžaduje změny v protokolu Etherea ([Mainnet](/glossary/#mainnet) na vrstvě 1). Dlouhou dobu se očekávalo, že Ethereum bude škálovat sharding blockchainu. To mělo zahrnovat rozdělení blockchainu na oddělené části (shardy), které by ověřovaly podmnožiny validátorů. Nicméně jako primární technika škálování převládlo škálování pomocí rollupů na vrstvě 2 (l2). To je podpořeno přidáním nové, levnější formy dat připojených k blokům Etherea, která je speciálně navržena tak, aby rollupy byly pro uživatele levné.

### Sharding {#sharding}

Sharding je proces rozdělení databáze. Podmnožiny validátorů by byly zodpovědné za jednotlivé shardy, místo aby sledovaly celé Ethereum. Sharding byl dlouhou dobu na [plánu vývoje](/roadmap/) Etherea a kdysi se zamýšlelo jeho spuštění před Merge na důkaz podílem (PoS). Rychlý vývoj [rollupů na vrstvě 2](#layer-2-scaling) a vynález [dankshardingu](/roadmap/danksharding) (přidávání blobů rollupových dat do bloků Etherea, které mohou validátoři velmi efektivně ověřovat) však vedly komunitu Etherea k upřednostnění škálování zaměřeného na rollupy namísto škálování pomocí shardingu. To také pomůže udržet logiku konsensu Etherea jednodušší.

## Offchain škálování {#offchain-scaling}

Offchain řešení jsou implementována odděleně od Mainnetu na vrstvě 1 – nevyžadují žádné změny stávajícího protokolu Etherea. Některá řešení, známá jako řešení „vrstvy 2“, odvozují svou bezpečnost přímo z konsensu Etherea na vrstvě 1, jako jsou [optimistické rollupy](/developers/docs/scaling/optimistic-rollups/), [rollupy s nulovým vědomím](/developers/docs/scaling/zk-rollups/) nebo [stavové kanály](/developers/docs/scaling/state-channels/). Jiná řešení zahrnují vytváření nových řetězců v různých formách, které odvozují svou bezpečnost odděleně od Mainnetu, jako jsou [postranní řetězce](#sidechains), [Validia](#validium) nebo [řetězce Plasma](#plasma). Tato řešení komunikují s Mainnetem, ale odvozují svou bezpečnost odlišně, aby dosáhla různých cílů.

### Škálování na vrstvě 2 {#layer-2-scaling}

Tato kategorie offchain řešení odvozuje svou bezpečnost z Ethereum Mainnetu.

Vrstva 2 je souhrnný termín pro řešení navržená tak, aby pomohla škálovat vaši aplikaci zpracováním transakcí mimo Ethereum Mainnet (vrstva 1), přičemž využívají robustní decentralizovaný bezpečnostní model Mainnetu. Rychlost transakcí trpí, když je síť zaneprázdněná, což zhoršuje uživatelský zážitek u určitých typů decentralizovaných aplikací (dapp). A jak je síť vytíženější, ceny gasu rostou, protože odesílatelé transakcí se snaží navzájem přeplatit. To může používání Etherea velmi prodražit.

Většina řešení na vrstvě 2 je soustředěna kolem serveru nebo clusteru serverů, z nichž každý může být označován jako uzel, validátor, operátor, sekvencer, tvůrce bloků nebo podobným termínem. V závislosti na implementaci mohou být tyto uzly vrstvy 2 provozovány jednotlivci, podniky nebo subjekty, které je používají, nebo operátorem třetí strany, případně velkou skupinou jednotlivců (podobně jako Mainnet). Obecně řečeno, transakce jsou odesílány těmto uzlům vrstvy 2 namísto přímého odesílání na vrstvu 1 (Mainnet). U některých řešení je instance vrstvy 2 následně dávkuje do skupin před jejich ukotvením na vrstvu 1, po čemž jsou zabezpečeny vrstvou 1 a nelze je změnit. Podrobnosti o tom, jak se to dělá, se mezi různými technologiemi a implementacemi vrstvy 2 výrazně liší.

Konkrétní instance vrstvy 2 může být otevřená a sdílená mnoha aplikacemi, nebo může být nasazena jedním projektem a vyhrazena pouze pro podporu jeho aplikace.

#### Proč je vrstva 2 potřeba? {#why-is-layer-2-needed}

- Zvýšený počet transakcí za sekundu výrazně zlepšuje uživatelský zážitek a snižuje přetížení sítě na Ethereum Mainnetu.
- Transakce jsou srolovány do jediné transakce na Ethereum Mainnet, což snižuje poplatky za gas pro uživatele a činí Ethereum inkluzivnějším a dostupnějším pro lidi kdekoli.
- Jakékoli aktualizace škálovatelnosti by neměly být na úkor decentralizace nebo bezpečnosti – vrstva 2 staví na Ethereu.
- Existují sítě vrstvy 2 specifické pro aplikace, které přinášejí vlastní sadu zefektivnění při práci s aktivy ve velkém měřítku.

[Více o vrstvě 2](/layer-2/).

#### Rollupy {#rollups}

Rollupy provádějí spouštění transakcí mimo vrstvu 1 a data jsou poté odeslána na vrstvu 1, kde je dosaženo konsensu. Vzhledem k tomu, že transakční data jsou zahrnuta v blocích vrstvy 1, umožňuje to zabezpečení rollupů nativní bezpečností Etherea.

Existují dva typy rollupů s různými bezpečnostními modely:

- **Optimistické rollupy**: předpokládají, že transakce jsou ve výchozím nastavení platné, a výpočet provádějí pouze prostřednictvím [**důkazu o podvodu**](/glossary/#fraud-proof) v případě zpochybnění. [Více o optimistických rollupech](/developers/docs/scaling/optimistic-rollups/).
- **Rollupy s nulovým vědomím**: provádějí výpočty offchain a odesílají [**důkaz platnosti**](/glossary/#validity-proof) do řetězce. [Více o rollupech s nulovým vědomím](/developers/docs/scaling/zk-rollups/).

#### Stavové kanály {#channels}

Stavové kanály využívají multisig kontrakty, které účastníkům umožňují rychle a volně provádět transakce offchain a poté vypořádat finalitu s Mainnetem. To minimalizuje přetížení sítě, poplatky a zpoždění. V současné době existují dva typy kanálů: stavové kanály a platební kanály.

Zjistěte více o [stavových kanálech](/developers/docs/scaling/state-channels/).

### Postranní řetězce {#sidechains}

Postranní řetězec je nezávislý blockchain kompatibilní s EVM, který běží paralelně s Mainnetem. Jsou kompatibilní s Ethereem prostřednictvím obousměrných mostů a běží podle vlastních zvolených pravidel konsensu a parametrů bloků.

Zjistěte více o [postranních řetězcích](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Řetězec Plasma je samostatný blockchain, který je ukotven k hlavnímu řetězci Etherea a k rozhodování sporů používá důkazy o podvodu (jako [optimistické rollupy](/developers/docs/scaling/optimistic-rollups/)).

Zjistěte více o [Plasmě](/developers/docs/scaling/plasma/).

### Validium {#validium}

Řetězec Validium používá důkazy platnosti jako rollupy s nulovým vědomím, ale data nejsou uložena na hlavním řetězci Etherea na vrstvě 1. To může vést k 10 tisícům transakcí za sekundu na jeden řetězec Validium a paralelně lze provozovat více řetězců.

Zjistěte více o [Validium](/developers/docs/scaling/validium/).

## Proč je potřeba tolik řešení škálování? {#why-do-we-need-these}

- Více řešení může pomoci snížit celkové přetížení v jakékoli části sítě a také zabránit vzniku jediného bodu selhání.
- Celek je víc než součet jeho částí. Různá řešení mohou existovat a fungovat v harmonii, což umožňuje exponenciální vliv na budoucí rychlost a propustnost transakcí.
- Ne všechna řešení vyžadují přímé využití algoritmu konsensu Etherea a alternativy mohou nabídnout výhody, které by jinak bylo obtížné získat.

## Učíte se raději vizuálně? {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_Vezměte prosím na vědomí, že vysvětlení ve videu používá termín „vrstva 2“ pro označení všech offchain řešení škálování, zatímco my rozlišujeme „vrstvu 2“ jako offchain řešení, které odvozuje svou bezpečnost prostřednictvím konsensu Mainnetu na vrstvě 1._

<VideoWatch slug="rollups-scaling-strategy" />

## Další čtení {#further-reading}

- [Plán vývoje Etherea zaměřený na rollupy](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Aktuální analytika řešení škálování na vrstvě 2 pro Ethereum](https://www.l2beat.com/)
- [Hodnocení řešení škálování Etherea na vrstvě 2: Srovnávací rámec](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Neúplný průvodce rollupy](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollupy poháněné Ethereem: Světová špička](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistické rollupy vs. ZK rollupy](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Proč jsou rollupy + datové shardy jediným udržitelným řešením pro vysokou škálovatelnost](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Jaké druhy vrstvy 3 dávají smysl?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Dostupnost dat aneb: Jak se rollupy naučily přestat se bát a milovat Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Praktický průvodce rollupy na Ethereu](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Návody: Budování škálovatelných vrstev 2 na Ethereu {#tutorials}

- [Vše, co můžete cachovat](/developers/tutorials/all-you-can-cache/) _– Jak vytvořit a používat cachovací kontrakt ke snížení nákladů na data volání na rollupech._
- [Krátká ABI pro optimalizaci dat volání](/developers/tutorials/short-abi/) _– Jak používat kratší ABI ke snížení nákladů na data volání pro transakce na vrstvě 2._