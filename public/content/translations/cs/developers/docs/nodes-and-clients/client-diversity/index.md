---
title: "Rozmanitost klientů"
description: "Vysvětlení důležitosti diverzity klientů Etherea na vysoké úrovni."
lang: cs
sidebarDepth: 2
---

Chování uzlu sítě Ethereum je řízeno klientským softwarem, který na něm běží. Existuje několik klientů sítě Ethereum na produkční úrovni, přičemž každý z nich je vyvíjen a udržován v různých jazycích samostatnými týmy. Klienti jsou vytvořeni podle společné specifikace, která zajišťuje, že mezi sebou bezproblémově komunikují, mají stejnou funkcionalitu a poskytují ekvivalentní uživatelskou zkušenost. V současné době však distribuce klientů napříč uzly není dostatečně rovnoměrná, aby se toto posílení sítě využilo v plném rozsahu. V ideálním případě by se uživatelé měli zhruba rovnoměrně rozdělit mezi různé klienty, aby síti zajistili co největší diverzitu klientů.

## Předpoklady {#prerequisites}

Pokud ještě nerozumíte tomu, co jsou uzly a klienti, podívejte se na [uzly a klienty](/developers/docs/nodes-and-clients/). [Exekuční](/glossary/#execution-layer) a [konsensuální](/glossary/#consensus-layer) vrstvy jsou definovány ve slovníku.

## Proč existuje více klientů? {#why-multiple-clients}

Existuje více nezávisle vyvíjených a udržovaných klientů, protože diverzita klientů činí síť odolnější vůči útokům a chybám. Více klientů je silnou stránkou, kterou má pouze Ethereum – ostatní blockchainy se spoléhají na neomylnost jediného klienta. Nestačí však mít k dispozici pouze více klientů, musí je přijmout komunita a celkový počet aktivních uzlů musí být mezi nimi relativně rovnoměrně rozložen.

## Proč je diverzita klientů důležitá? {#client-diversity-importance}

Existence mnoha nezávisle vyvíjených a udržovaných klientů je pro zdraví decentralizované sítě životně důležitá. Pojďme se podívat na důvody, proč tomu tak je.

### Chyby {#bugs}

Chyba v jednotlivém klientovi představuje pro síť menší riziko, když představuje menšinu uzlů sítě Ethereum. Při zhruba rovnoměrném rozložení uzlů mezi mnoho klientů je pravděpodobnost, že by většina klientů trpěla společným problémem, malá, a síť je díky tomu robustnější.

### Odolnost vůči útokům {#resilience}

Diverzita klientů také nabízí odolnost vůči útokům. Například útok, který [přiměje konkrétního klienta](https://twitter.com/vdWijden/status/1437712249926393858) k přechodu na konkrétní větev řetězce, má malou šanci na úspěch, protože ostatní klienti pravděpodobně nebudou zneužitelní stejným způsobem a kanonický řetězec zůstane neporušený. Nízká diverzita klientů zvyšuje riziko spojené s hackem dominantního klienta. Diverzita klientů se již osvědčila jako důležitá obrana proti škodlivým útokům na síť. Například útok typu denial-of-service v Šanghaji v roce 2016 byl možný, protože útočníci dokázali přimět dominantního klienta (Geth) k provedení pomalé I/O operace na disku desítky tisíckrát za blok. Protože byly online i alternativní klienti, kteří tuto zranitelnost nesdíleli, bylo Ethereum schopno útoku odolat a pokračovat v provozu, zatímco byla opravena zranitelnost v Gethu.

### Finalita u důkazu podílem {#finality}

Chyba v konsensuálním klientovi, který by používalo více než 33 % uzlů sítě Ethereum, by mohla zabránit finalizaci konsensuální vrstvy, což znamená, že by uživatelé nemohli věřit, že transakce nebudou v určitém okamžiku vráceny nebo změněny. To by bylo velmi problematické pro mnoho aplikací postavených na Ethereu, zejména pro DeFi.

<Emoji text="🚨" className="me-4" /> A co je horší, kritická chyba v klientovi s dvoutřetinovou většinou by mohla způsobit <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">nesprávné rozdělení a finalizaci</a> řetězce, což by vedlo k tomu, že by se velká skupina validátorů zasekla na neplatném řetězci. Pokud se tito validátoři chtějí znovu připojit ke správnému řetězci, čelí slashingu nebo pomalému a nákladnému dobrovolnému odchodu a reaktivaci. Velikost slashingu se odvíjí od počtu provinilých uzlů, přičemž dvoutřetinová většina je penalizována maximálně (32 ETH).

Přestože se jedná o nepravděpodobné scénáře, ekosystém Etherea může jejich riziko zmírnit vyrovnáním distribuce klientů mezi aktivními uzly. V ideálním případě by žádný konsensuální klient nikdy neměl dosáhnout 33% podílu na celkovém počtu uzlů.

### Sdílená odpovědnost {#responsibility}

Existence majoritních klientů si vybírá i lidskou daň. Znamená to nadměrnou zátěž a odpovědnost pro malý vývojářský tým. Čím menší je diverzita klientů, tím větší je břemeno odpovědnosti pro vývojáře, kteří udržují majoritního klienta. Rozdělení této odpovědnosti mezi více týmů je dobré jak pro zdraví sítě uzlů Etherea, tak pro jeho síť lidí.

## Současná diverzita klientů {#current-client-diversity}

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

Tento diagram může být zastaralý – aktuální informace naleznete na [ethernodes.org](https://ethernodes.org) a [clientdiversity.org](https://clientdiversity.org).

Dva výše uvedené koláčové grafy ukazují snímky současné diverzity klientů pro exekuční a konsensuální vrstvu (v době psaní v říjnu 2025). Diverzita klientů se v průběhu let zlepšila a v exekuční vrstvě došlo ke snížení dominance klienta [Geth](https://geth.ethereum.org/), v těsném závěsu je [Nethermind](https://www.nethermind.io/nethermind-client), třetí [Besu](https://besu.hyperledger.org/) a čtvrtý [Erigon](https://github.com/ledgerwatch/erigon), přičemž ostatní klienti tvoří méně než 3 % sítě. Nejčastěji používaný klient na konsensuální vrstvě – [Lighthouse](https://lighthouse.sigmaprime.io/) – je poměrně blízko druhému nejpoužívanějšímu. [Prysm](https://prysmaticlabs.com/#projects) a [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) tvoří přibližně 31 %, respektive 14 %, a ostatní klienti jsou používáni zřídka.

Data o exekuční vrstvě byla získána z [supermajority.info](https://supermajority.info/) dne 26. října 2025. Data pro konsensuální klienty byla získána od [Michaela Sproula](https://github.com/sigp/blockprint). Data konsensuálních klientů je obtížnější získat, protože klienti konsensuální vrstvy nemají vždy jednoznačné stopy, které lze použít k jejich identifikaci. Data byla vygenerována pomocí klasifikačního algoritmu, který si někdy plete některé menšinové klienty (více podrobností naleznete [zde](https://twitter.com/sproulM_/status/1440512518242197516)). Ve výše uvedeném diagramu jsou tyto nejednoznačné klasifikace označeny štítkem typu buď/nebo (např. Nimbus/Teku). Nicméně je zřejmé, že na většině sítě běží Prysm. Přestože se jedná pouze o snímky, hodnoty v diagramu poskytují dobrý obecný přehled o současném stavu diverzity klientů.

Aktuální data o diverzitě klientů pro konsensuální vrstvu jsou nyní k dispozici na [clientdiversity.org](https://clientdiversity.org/).

## Exekuční vrstva {#execution-layer}

Dosud se konverzace o diverzitě klientů zaměřovala především na konsensuální vrstvu. Nicméně exekuční klient [Geth](https://geth.ethereum.org) v současné době tvoří přibližně 85 % všech uzlů. Toto procento je problematické ze stejných důvodů jako u konsensuálních klientů. Například chyba v Gethu, která ovlivňuje zpracování transakcí nebo vytváření exekučních payloadů, by mohla vést k tomu, že by konsensuální klienti finalizovali problematické nebo chybné transakce. Proto by Ethereum bylo zdravější s rovnoměrnějším rozložením exekučních klientů, přičemž v ideálním případě by žádný klient neměl představovat více než 33 % sítě.

## Používejte menšinového klienta {#use-minority-client}

Řešení diverzity klientů vyžaduje více než jen to, aby si jednotliví uživatelé vybírali menšinové klienty – vyžaduje to také, aby klienta změnily pooly validátorů a instituce, jako jsou hlavní dapps a burzy. Každý uživatel se však může podílet na nápravě současné nerovnováhy a normalizaci používání veškerého dostupného softwaru Etherea. Po sloučení (The Merge) budou všichni provozovatelé uzlů muset provozovat exekučního klienta a konsensuálního klienta. Volba kombinací níže navržených klientů pomůže zvýšit diverzitu klientů.

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

Technicky zdatní uživatelé mohou tento proces urychlit tím, že budou psát více návodů a dokumentace pro menšinové klienty a povzbuzovat své kolegy provozující uzly k přechodu od dominantních klientů. Průvodci přechodem na menšinového konsensuálního klienta jsou k dispozici na [clientdiversity.org](https://clientdiversity.org/).

## Nástěnky diverzity klientů {#client-diversity-dashboards}

Několik nástěnek poskytuje statistiky o diverzitě klientů v reálném čase pro exekuční a konsensuální vrstvu.

**Konsensuální vrstva:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Exekuční vrstva:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Další čtení {#further-reading}

- [Diverzita klientů na konsensuální vrstvě Etherea](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Sloučení Etherea: Provozujte majoritního klienta na vlastní nebezpečí!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24. března 2022_
- [Důležitost diverzity klientů](https://our.status.im/the-importance-of-client-diversity/)
- [Seznam služeb uzlů Etherea](https://ethereumnodes.com/)
- [Problém diverzity klientů metodou „Pěti proč“](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Diverzita Etherea a jak ji řešit (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Související témata {#related-topics}

- [Provozovat uzel Etherea](/run-a-node/)
- [Uzly a klienti](/developers/docs/nodes-and-clients/)
