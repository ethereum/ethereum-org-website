---
title: "Klientská diverzita"
description: "Obecné vysvětlení důležitosti klientské diverzity Etherea."
lang: cs
sidebarDepth: 2
---

Chování uzlu [Etherea](/) je řízeno klientským softwarem, který na něm běží. Existuje několik produkčních klientů Etherea, z nichž každý je vyvíjen a udržován v různých jazycích samostatnými týmy. Klienti jsou postaveni na společné specifikaci, která zajišťuje, že spolu bezproblémově komunikují, mají stejnou funkcionalitu a poskytují rovnocenný uživatelský zážitek. V současné době však distribuce klientů napříč uzly není dostatečně rovnoměrná na to, aby se toto posílení sítě projevilo naplno. V ideálním případě by se uživatelé měli zhruba rovnoměrně rozdělit mezi různé klienty, aby do sítě přinesli co největší klientskou diverzitu.

## Předpoklady {#prerequisites}

Pokud ještě nevíte, co jsou uzly a klienti, podívejte se na [uzly a klienty](/developers/docs/nodes-and-clients/). [Exekuční](/glossary/#execution-layer) vrstva a vrstva [konsensu](/glossary/#consensus-layer) jsou definovány ve slovníčku.

## Proč existuje více klientů? {#why-multiple-clients}

Více nezávisle vyvíjených a udržovaných klientů existuje proto, že klientská diverzita činí síť odolnější vůči útokům a chybám. Množství klientů je silnou stránkou, která je pro Ethereum jedinečná – jiné blockchainy spoléhají na neomylnost jediného klienta. Nestačí však pouze mít k dispozici více klientů, komunita je musí přijmout a celkový počet aktivních uzlů mezi ně musí být relativně rovnoměrně rozdělen.

## Proč je klientská diverzita důležitá? {#client-diversity-importance}

Mít mnoho nezávisle vyvíjených a udržovaných klientů je pro zdraví decentralizované sítě životně důležité. Pojďme prozkoumat důvody proč.

### Chyby {#bugs}

Chyba v jednotlivém klientovi představuje pro síť menší riziko, pokud zastupuje menšinu uzlů Etherea. Při zhruba rovnoměrném rozložení uzlů mezi mnoho klientů je pravděpodobnost, že by většina klientů trpěla společným problémem, malá, a v důsledku toho je síť robustnější.

### Odolnost vůči útokům {#resilience}

Klientská diverzita také nabízí odolnost vůči útokům. Například útok, který [oklame konkrétního klienta](https://twitter.com/vdWijden/status/1437712249926393858) a svede ho na určitou větev řetězce, pravděpodobně nebude úspěšný, protože ostatní klienti pravděpodobně nebudou zneužitelní stejným způsobem a kanonický řetězec zůstane neporušený. Nízká klientská diverzita zvyšuje riziko spojené s hacknutím dominantního klienta. Klientská diverzita se již ukázala jako důležitá obrana proti škodlivým útokům na síť. Například útok odepření služby (DoS) Šanghaj v roce 2016 byl možný proto, že útočníci dokázali oklamat dominantního klienta (Geth), aby provedl pomalou diskovou I/O operaci desetitisíckrát za blok. Protože byli online i alternativní klienti, kteří tuto zranitelnost nesdíleli, Ethereum dokázalo útoku odolat a pokračovat v provozu, zatímco byla zranitelnost v Gethu opravena.

### Finalita důkazu podílem (PoS) {#finality}

Chyba v konsensuálním klientovi s více než 33 % uzlů Etherea by mohla zabránit vrstvě konsensu v dosažení finality, což znamená, že by uživatelé nemohli věřit, že transakce nebudou v určitém okamžiku zrušeny nebo změněny. To by bylo velmi problematické pro mnoho aplikací postavených na Ethereu, zejména pro decentralizované finance (DeFi).

<Emoji text="🚨" className="me-4" /> Ještě horší je, že kritická chyba v klientovi s dvoutřetinovou většinou by mohla způsobit, že se řetězec <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">nesprávně rozdělí a dosáhne finality</a>, což by vedlo k tomu, že by velká skupina validátorů uvízla na neplatném řetězci. Pokud by se tito validátoři chtěli znovu připojit ke správnému řetězci, čelili by penalizaci nebo pomalému a drahému dobrovolnému výběru a reaktivaci. Velikost penalizace se úměrně zvyšuje s počtem provinilých uzlů, přičemž dvoutřetinová většina je penalizována maximálně (32 ETH).

Ačkoli se jedná o nepravděpodobné scénáře, ekosystém Etherea může jejich riziko zmírnit vyrovnáním distribuce klientů napříč aktivními uzly. V ideálním případě by žádný konsensuální klient nikdy nedosáhl 33% podílu z celkového počtu uzlů.

### Sdílená odpovědnost {#responsibility}

Existence většinových klientů má také lidskou daň. Klade to nadměrnou zátěž a odpovědnost na malý vývojářský tým. Čím menší je klientská diverzita, tím větší je břemeno odpovědnosti pro vývojáře udržující většinového klienta. Rozložení této odpovědnosti mezi více týmů je dobré jak pro zdraví sítě uzlů Etherea, tak pro jeho síť lidí.

## Současná klientská diverzita {#current-client-diversity}

### Exekuční klienti {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Konsensuální klienti {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Other", value: 0.07 }
]}
/>

Tento diagram může být zastaralý — pro aktuální informace navštivte [ethernodes.org](https://ethernodes.org) a [clientdiversity.org](https://clientdiversity.org).

Dva výše uvedené koláčové grafy ukazují snímky současné klientské diverzity pro exekuční vrstvu a vrstvu konsensu (v době psaní v říjnu 2025). Klientská diverzita se v průběhu let zlepšila a exekuční vrstva zaznamenala snížení dominance klienta [Geth](https://geth.ethereum.org/), přičemž [Nethermind](https://www.nethermind.io/nethermind-client) je v těsném závěsu na druhém místě, [Besu](https://besu.hyperledger.org/) na třetím a [Erigon](https://github.com/ledgerwatch/erigon) na čtvrtém, zatímco ostatní klienti tvoří méně než 3 % sítě. Nejčastěji používaný klient na vrstvě konsensu — [Lighthouse](https://lighthouse.sigmaprime.io/) — je poměrně blízko druhému nejpoužívanějšímu. [Prysm](https://prysmaticlabs.com/#projects) a [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) tvoří ~31 % a ~14 %, a ostatní klienti se používají zřídka.

Data pro exekuční vrstvu byla získána z [supermajority.info](https://supermajority.info/) dne 26. října 2025. Data pro konsensuální klienty byla získána od [Michaela Sproula](https://github.com/sigp/blockprint). Data o konsensuálních klientech je obtížnější získat, protože klienti vrstvy konsensu nemají vždy jednoznačné stopy, které by bylo možné použít k jejich identifikaci. Data byla vygenerována pomocí klasifikačního algoritmu, který někdy zaměňuje některé menšinové klienty (více podrobností naleznete [zde](https://twitter.com/sproulM_/status/1440512518242197516)). Ve výše uvedeném diagramu jsou tyto nejednoznačné klasifikace označeny štítkem buď/anebo (např. Nimbus/Teku). Nicméně je jasné, že většina sítě provozuje Prysm. Přestože se jedná pouze o snímky, hodnoty v diagramu poskytují dobrý obecný přehled o současném stavu klientské diverzity.

Aktuální data o klientské diverzitě pro vrstvu konsensu jsou nyní k dispozici na [clientdiversity.org](https://clientdiversity.org/).

## Exekuční vrstva {#execution-layer}

Až dosud se konverzace o klientské diverzitě soustředila hlavně na vrstvu konsensu. Nicméně exekuční klient [Geth](https://geth.ethereum.org) v současnosti tvoří přibližně 85 % všech uzlů. Toto procento je problematické ze stejných důvodů jako u konsensuálních klientů. Například chyba v Gethu ovlivňující zpracování transakcí nebo sestavování exekučních payloadů by mohla vést k tomu, že konsensuální klienti dosáhnou finality u problematických nebo chybných transakcí. Proto by Ethereum bylo zdravější s rovnoměrnějším rozložením exekučních klientů, ideálně tak, aby žádný klient nepředstavoval více než 33 % sítě.

## Používejte menšinového klienta {#use-minority-client}

Řešení klientské diverzity vyžaduje více než jen to, aby si jednotliví uživatelé vybírali menšinové klienty – vyžaduje to, aby na jiné klienty přešly i pooly validátorů a instituce, jako jsou hlavní decentralizované aplikace (dapps) a burzy. Všichni uživatelé však mohou přispět k nápravě současné nerovnováhy a normalizaci používání veškerého dostupného softwaru Etherea. Po Merge budou všichni provozovatelé uzlů muset provozovat exekučního klienta a konsensuálního klienta. Výběr kombinací níže navržených klientů pomůže zvýšit klientskou diverzitu.

### Exekuční klienti {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Konsensuální klienti {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Techničtí uživatelé mohou pomoci tento proces urychlit psaním dalších návodů a dokumentace pro menšinové klienty a povzbuzováním svých kolegů provozujících uzly, aby přešli od dominantních klientů. Návody na přechod na menšinového konsensuálního klienta jsou k dispozici na [clientdiversity.org](https://clientdiversity.org/).

## Nástěnky klientské diverzity {#client-diversity-dashboards}

Několik nástěnek poskytuje statistiky klientské diverzity v reálném čase pro exekuční vrstvu a vrstvu konsensu.

**Vrstva konsensu:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Exekuční vrstva:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Další čtení {#further-reading}

- [Klientská diverzita na vrstvě konsensu Etherea](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Merge Etherea: Provozujte většinového klienta na vlastní nebezpečí!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24. března 2022_
- [Důležitost klientské diverzity](https://our.status.im/the-importance-of-client-diversity/)
- [Seznam služeb uzlů Etherea](https://ethereumnodes.com/)
- [„Pět proč“ problému klientské diverzity](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Diverzita Etherea a jak ji řešit (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Související témata {#related-topics}

- [Provozování uzlu Etherea](/run-a-node/)
- [Uzly a klienti](/developers/docs/nodes-and-clients/)
