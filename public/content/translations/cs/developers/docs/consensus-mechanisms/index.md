---
title: Mechanismy konsensu
description: Vysvětlení protokolů konsensu v distribuovaných systémech a jejich role v Ethereu.
lang: cs
authors: ["Patrick Collins"]
---

Termín „mechanismus konsensu“ se často hovorově používá k označení protokolů „důkaz podílem (PoS)“, „důkaz prací (PoW)“ nebo „důkaz autority“. Jedná se však pouze o součásti mechanismů konsensu, které chrání před [Sybil útoky](/glossary/#sybil-attack). Mechanismy konsensu představují kompletní sadu myšlenek, protokolů a pobídek, které umožňují distribuované sadě uzlů shodnout se na stavu blockchainu.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst náš [úvod do Etherea](/developers/docs/intro-to-ethereum/).

## Co je to konsensus? {#what-is-consensus}

Konsensem rozumíme dosažení obecné shody. Představte si skupinu lidí, kteří jdou do kina. Pokud nepanuje neshoda ohledně navrhovaného výběru filmu, je dosaženo konsensu. Pokud dojde k neshodě, skupina musí mít prostředky, jak rozhodnout, na který film půjde. V extrémních případech se skupina nakonec rozdělí.

Pokud jde o blockchain [Etherea](/), proces je formalizován a dosažení konsensu znamená, že se alespoň 66 % uzlů v síti shodne na globálním stavu sítě.

## Co je to mechanismus konsensu? {#what-is-a-consensus-mechanism}

Termín mechanismus konsensu označuje celou sadu protokolů, pobídek a myšlenek, které umožňují síti uzlů shodnout se na stavu blockchainu.

Ethereum používá mechanismus konsensu založený na důkazu podílem (PoS), který odvozuje svou kryptoekonomickou bezpečnost ze sady odměn a sankcí uplatňovaných na kapitál uzamčený stakery. Tato struktura pobídek motivuje jednotlivé stakery k provozování poctivých validátorů, trestá ty, kteří tak nečiní, a vytváří extrémně vysoké náklady na útok na síť.

Dále existuje protokol, který řídí, jak jsou vybíráni poctiví validátoři, aby navrhovali nebo validovali bloky, zpracovávali transakce a hlasovali pro svůj pohled na vrchol řetězce. Ve vzácných situacích, kdy se více bloků nachází na stejné pozici blízko vrcholu řetězce, existuje mechanismus volby forku, který vybírá bloky tvořící „nejtěžší“ řetězec, měřeno počtem validátorů, kteří pro bloky hlasovali, váženým jejich zůstatkem stakovaného etheru.

Pro konsensus jsou důležité i některé koncepty, které nejsou explicitně definovány v kódu, jako je dodatečná bezpečnost nabízená potenciální sociální koordinací mimo pásmo (out-of-band) jako poslední linií obrany proti útokům na síť.

Tyto komponenty společně tvoří mechanismus konsensu.

## Typy mechanismů konsensu {#types-of-consensus-mechanisms}

### Založené na důkazu prací (PoW) {#proof-of-work}

Stejně jako Bitcoin, i Ethereum kdysi používalo protokol konsensu založený na **důkazu prací (PoW)**.

#### Vytváření bloků {#pow-block-creation}

Těžaři soutěží o vytvoření nových bloků naplněných zpracovanými transakcemi. Vítěz sdílí nový blok se zbytkem sítě a získá nově vyražené ETH. Závod vyhrává počítač, který dokáže nejrychleji vyřešit matematický hlavolam. Tím se vytvoří kryptografické spojení mezi aktuálním blokem a blokem předchozím. Řešení tohoto hlavolamu je onou prací v „důkazu prací“. Kanonický řetězec je pak určen pravidlem volby forku, které vybere sadu bloků, na jejichž těžbu bylo vynaloženo nejvíce práce.

#### Bezpečnost {#pow-security}

Síť je udržována v bezpečí díky tomu, že k podvedení řetězce byste potřebovali 51 % výpočetního výkonu sítě. To by vyžadovalo tak obrovské investice do vybavení a energie, že byste pravděpodobně utratili více, než byste získali.

Více o [důkazu prací (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Založené na důkazu podílem (PoS) {#proof-of-stake}

Ethereum nyní používá protokol konsensu založený na **důkazu podílem (PoS)**.

#### Vytváření bloků {#pos-block-creation}

Validátoři vytvářejí bloky. V každém slotu je náhodně vybrán jeden validátor jako navrhovatel bloku. Jejich konsensuální klient si vyžádá balíček transakcí jako „exekuční payload“ od svého spárovaného exekučního klienta. Zabalí jej do konsensuálních dat, čímž vytvoří blok, který odešlou dalším uzlům v síti Ethereum. Tato produkce bloků je odměňována v ETH. Ve vzácných případech, kdy pro jeden slot existuje více možných bloků, nebo se uzly dozvědí o blocích v různou dobu, algoritmus volby forku vybere blok, který tvoří řetězec s největší váhou atestací (kde váha je počet atestujících validátorů škálovaný jejich zůstatkem ETH).

#### Bezpečnost {#pos-security}

Systém důkazu podílem je kryptoekonomicky bezpečný, protože útočník, který se pokusí převzít kontrolu nad řetězcem, musí zničit obrovské množství ETH. Systém odměn motivuje jednotlivé stakery k poctivému chování a sankce je odrazují od zlomyslného jednání.

Více o [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/)

### Vizuální průvodce {#types-of-consensus-video}

Podívejte se na další informace o různých typech mechanismů konsensu používaných v Ethereu:

<VideoWatch slug="understanding-consensus-mechanisms" />

### Odolnost proti Sybil útokům a výběr řetězce {#sybil-chain}

Samotný důkaz prací a důkaz podílem nejsou protokoly konsensu, ale pro zjednodušení se tak často označují. Ve skutečnosti se jedná o mechanismy odolnosti proti Sybil útokům a selektory autorů bloků; jsou to způsoby, jak rozhodnout, kdo je autorem nejnovějšího bloku. Další důležitou součástí je algoritmus výběru řetězce (neboli volby forku), který umožňuje uzlům vybrat jeden jediný správný blok na vrcholu řetězce ve scénářích, kdy na stejné pozici existuje více bloků.

**Odolnost proti Sybil útokům** měří, jak si protokol vede proti Sybil útoku. Odolnost vůči tomuto typu útoku je pro decentralizovaný blockchain nezbytná a umožňuje, aby byli těžaři a validátoři odměňováni spravedlivě na základě vložených zdrojů. Důkaz prací a důkaz podílem proti tomu chrání tím, že nutí uživatele vynaložit velké množství energie nebo poskytnout velké zajištění. Tato ochranná opatření fungují jako ekonomický odstrašující prostředek proti Sybil útokům.

**Pravidlo výběru řetězce** se používá k rozhodnutí, který řetězec je ten „správný“. Bitcoin používá pravidlo „nejdelšího řetězce“, což znamená, že ten blockchain, který je nejdelší, bude ten, který ostatní uzly přijmou jako platný a budou s ním pracovat. U řetězců s důkazem prací je nejdelší řetězec určen celkovou kumulativní obtížností důkazu prací daného řetězce. Ethereum dříve také používalo pravidlo nejdelšího řetězce; nicméně nyní, když Ethereum běží na důkazu podílem, přijalo aktualizovaný algoritmus volby forku, který měří „váhu“ řetězce. Váha je kumulovaný součet hlasů validátorů, vážený zůstatky stakovaného etheru validátorů.

Ethereum používá mechanismus konsensu známý jako [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/), který kombinuje [důkaz podílem Casper FFG](https://arxiv.org/abs/1710.09437) s [pravidlem volby forku GHOST](https://arxiv.org/abs/2003.03052).

## Další čtení {#further-reading}

- [Co je to algoritmus konsensu blockchainu?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Co je Nakamotův konsensus? Kompletní průvodce pro začátečníky](https://blockonomi.com/nakamoto-consensus/)
- [Jak funguje Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [O bezpečnosti a výkonu blockchainů s důkazem prací](https://eprint.iacr.org/2016/555.pdf)
- [Byzantská chyba](https://en.wikipedia.org/wiki/Byzantine_fault)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Důkaz prací (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Těžba](/developers/docs/consensus-mechanisms/pow/mining/)
- [Důkaz podílem (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Důkaz autority](/developers/docs/consensus-mechanisms/poa/)