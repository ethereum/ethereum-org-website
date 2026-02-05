---
title: Škálování
description: Úvod do různých škálovacích možností, které v současné době vyvíjí ethereovská komunita.
lang: cs
sidebarDepth: 3
---

## Přehled škálování {#scaling-overview}

S růstem počtu lidí používajících Ethereum narazil tento blockchain na určité kapacitní limity. To vedlo ke zvýšení nákladů na používání sítě a vytvořilo potřebu „škálovacích řešení.“ Existuje několik řešení, která se zkoumají, testují a implementují, přičemž každé přistupuje k dosažení podobných cílů různými způsoby.

Hlavním cílem škálovatelnosti je zvýšit rychlost transakcí (rychlejší finalita) a propustnost transakcí (vyšší počet transakcí za sekundu), aniž by byla obětována decentralizace nebo bezpečnost. Na blockchainu Ethereum vrstvy 1 vede vysoká poptávka k pomalejším transakcím a neudržitelným [cenám za gas](/developers/docs/gas/). Zvýšení kapacity sítě z hlediska rychlosti a propustnosti je zásadní pro smysluplné a masové přijetí Etherea.

Zatímco rychlost a propustnost jsou důležité, je nezbytné, aby škálovací řešení umožňující tyto cíle zůstala decentralizovaná a bezpečná. Udržení nízké bariéry pro vstup pro operátory síťových uzlů je klíčové k tomu, aby se zabránilo přechodu k centralizovanému a nezabezpečenému výpočetnímu výkonu.

Koncepčně nejprve dělíme škálování na on-chain škálování a off-chain škálování.

## Předpoklady {#prerequisites}

Měli byste dobře rozumět všem základním tématům. Implementace škálovacích řešení je pokročilým tématem, protože tato technologie není zatím dostatečně otestována v praxi a stále se vyvíjí a zkoumá.

## On-chain škálování {#onchain-scaling}

On-chain škálování vyžaduje změny v protokolu Ethereum (vrstva 1 [Mainnet](/glossary/#mainnet)). Dlouhou dobu se očekávalo, že Ethereum bude škálováno prostřednictvím shardingu. To mělo zahrnovat rozdělení blockchainu na oddělené části (shardy), které by byly ověřovány podskupinami validátorů. Ale hlavní technikou škálování se postupně stalo škálování pomocí rollupů na vrstvě 2. To je podporováno přidáním nové levnější formy dat připojených k blokům Etherea, která je speciálně navržena tak, aby byly rollupy pro uživatele levné.

### Sharding {#sharding}

Sharding je proces rozdělení databáze. Podskupiny validátorů by byly zodpovědné za jednotlivé shardery, místo aby sledovaly celé Ethereum. Sharding byl dlouhou dobu součástí [plánu](/roadmap/) Etherea a původně se počítalo s jeho spuštěním před přechodem na proof-of-stake (The Merge). Rychlý vývoj [rollupů vrstvy 2](#layer-2-scaling) a vynález [Dankshardingu](/roadmap/danksharding) (přidávání datových blobů z rollupů do bloků Etherea, které mohou validátoři velmi efektivně ověřit) však vedly komunitu Etherea k upřednostnění škálování zaměřeného na rollupy namísto škálování pomocí shardingu. To také pomůže udržet logiku konsensu Etherea jednodušší.

## Off-chain škálování {#offchain-scaling}

Off-chain řešení jsou implementována odděleně od Mainnetu vrstvy 1 – nevyžadují žádné změny v existujícím protokolu Ethereum. Některá řešení, známá jako řešení „vrstvy 2“, odvozují svou bezpečnost přímo z konsensu Etherea na vrstvě 1, jako jsou [optimistické rollupy](/developers/docs/scaling/optimistic-rollups/), [rollupy s nulovou znalostí](/developers/docs/scaling/zk-rollups/) nebo [stavové kanály](/developers/docs/scaling/state-channels/). Jiná řešení zahrnují vytváření nových chainů v různých formách, které odvozují svou bezpečnost nezávisle na Mainnetu, jako jsou [sidechainy](#sidechains), [validia](#validium) nebo [plasma chainy](#plasma). Tato řešení komunikují s Mainnetem, ale odvozují svou bezpečnost odlišně, za účelem dosažení různých cílů.

### Škálování vrstvy 2 {#layer-2-scaling}

Tato kategorie off-chain řešení odvozuje svou bezpečnost od Mainnetu Etherea.

Vrstva 2 je souhrnný termín pro řešení navržená k lepšímu škálování vaší aplikace tím, že zpracovávají transakce mimo Mainnet Etherea (vrstva 1) a zároveň využívají robustní decentralizovaný bezpečnostní model Mainnetu. Rychlost transakcí trpí, když je síť zaneprázdněna, což zhoršuje uživatelský zážitek u určitých typů dappek. A jak se síť stává vytíženější, zvyšují se ceny paliva, protože odesílatelé transakcí se snaží navzájem předhánět. To může použití Etherea značně prodražit.

Většina řešení vrstvy 2 je založena na serveru nebo skupině serverů, z nichž každý může být označen jako síťový uzel, validátor, operátor, sekvencer, producent bloků nebo podobným termínem. V závislosti na implementaci mohou být tyto síťové uzly vrstvy 2 provozovány jednotlivci, podniky nebo subjekty, které je používají, nebo třetími stranami nebo velkou skupinou jednotlivců (podobně jako Mainnet). Obecně platí, že transakce jsou doručeny těmto uzlům vrstvy 2 namísto přímého doručení na vrstvu 1 (Mainnet). U některých řešení instance vrstvy 2 dávkuje transakce do skupin, než je ukotví na vrstvu 1, načež jsou zabezpečeny vrstvou 1 a nelze je změnit. Detaily takové exekuce se mezi různými technologiemi a implementacemi vrstvy 2 značně liší.

Konkrétní instance vrstvy 2 může být otevřená a sdílená mnoha aplikacemi nebo může být nasazena jedním projektem a určena pouze k podpoře jejich aplikace.

#### Proč je vrstva 2 potřeba? {#why-is-layer-2-needed}

- Zvýšení počtu transakcí za sekundu výrazně zlepšuje uživatelský zážitek a snižuje přetížení sítě na Mainnetu Etherea.
- Transakce jsou seskupeny do jedné transakce na Mainnetu Etherea, což snižuje poplatky za palivo pro uživatele a činí Ethereum více inkluzivním a dostupným pro lidi po celém světě.
- Jakékoli aktualizace škálovatelnosti by neměly být na úkor decentralizace nebo bezpečnosti – vrstva 2 je postavena nad Ethereem.
- Existují sítě vrstvy 2 se specifickou aplikací, které přinášejí vlastní sadu efektivity při práci s aktivy ve velkém měřítku.

[Více o vrstvě 2](/layer-2/).

#### Rollupy {#rollups}

Rollupy provádějí exekuci transakcí mimo vrstvu 1 a poté data zveřejní na vrstvě 1, kde je dosaženo konsensu. Protože jsou transakční data zahrnuta v blocích vrstvy 1, rollupy mohou být zabezpečeny nativní bezpečností Etherea.

Existují dva typy rollupů s různými bezpečnostními modely:

- **Optimistické rollupy**: předpokládají, že transakce jsou ve výchozím nastavení platné a spouští výpočet, prostřednictvím [**důkazu o podvodu**](/glossary/#fraud-proof), pouze v případě zpochybnění. [Více o optimistických rollupech](/developers/docs/scaling/optimistic-rollups/).
- **Rollupy s nulovou znalostí**: provádí výpočty off-chain a na chain odesílají [**důkaz o platnosti**](/glossary/#validity-proof). [Více o rollupech s nulovou znalostí](/developers/docs/scaling/zk-rollups/).

#### Stavové kanály {#channels}

Stavové kanály využívají multisig kontrakty, aby účastníkům umožnily rychle a volně provádět transakce off-chain, a poté finalizovat stav na Mainnetu. To minimalizuje přetížení sítě, poplatky a zpoždění. Dva typy kanálů jsou v současnosti stavové kanály a platební kanály.

Zjistěte více o [stavových kanálech](/developers/docs/scaling/state-channels/).

### Sidechainy {#sidechains}

Postranní řetězec je nezávislý blockchain kompatibilní s EVM, který běží paralelně s Mainnetem. Jsou kompatibilní s Ethereem prostřednictvím obousměrných přemostění a fungují podle svých vlastních pravidel konsensu a parametrů bloků.

Zjistěte více o [sidechainech](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Plasma chain je samostatný blockchain, který je ukotven k hlavnímu chainu Etherea a používá důkazy o podvodu (stejně jako [optimistické rollupy](/developers/docs/scaling/optimistic-rollups/)) k řešení sporů.

Zjistěte více o [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Řetězec typu validium používá důkazy o platnosti, stejně jako zero-knowledge rollupy, ale data nejsou uložena na vrstvě 1 Etherea. To umožňuje 10 000 transakcí za sekundu na jeden Validium řetězec a více řetězců může běžet paralelně.

Zjistěte více o [Validium](/developers/docs/scaling/validium/).

## Proč je potřeba tolik škálovacích řešení? {#why-do-we-need-these}

- Více řešení může pomoci snížit celkové přetížení na jakékoliv části sítě a také zabránit vzniku jediných bodů selhání.
- Celek je efektivnější než součet efektivity jeho částí. Různá řešení mohou existovat a pracovat v harmonii, což aplikuje exponenciální efekt na budoucí rychlost transakcí a propustnost.
- Ne všechna řešení vyžadují přímé využití konsensuálního algoritmu Etherea a alternativy mohou nabízet výhody, které by jinak bylo obtížné získat.

## Učíte se spíše vizuálně? Vizuální výuka {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Upozornění: Vysvětlení ve videu používá termín „vrstva 2“ k označení všech off-chain řešení škálování, zatímco my rozlišujeme „vrstvu 2“ jako off-chain řešení, které odvozuje svou bezpečnost prostřednictvím konsensu Mainnetu vrstvy 1._

<YouTube id="7pWxCklcNsU" />

## Další čtení {#further-reading}

- [Plán Etherea zaměřený na rollupy](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Aktuální analýzy řešení škálování vrstvy 2 pro Ethereum](https://www.l2beat.com/)
- [Hodnocení řešení škálování vrstvy 2 pro Ethereum: Srovnávací rámec](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Neúplný průvodce rollupy](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollupy na Ethereu: Světová špička](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistické rollupy vs. ZK rollupy](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Proč jsou rollupy a datové shardy jediným udržitelným řešením pro vysokou škálovatelnost](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Jaký druh vrstev 3 dává smysl?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Dostupnost dat aneb: Jak se rollupy naučily nedělat si starosti a milovat Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Praktický průvodce rollupy na Ethereu](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
