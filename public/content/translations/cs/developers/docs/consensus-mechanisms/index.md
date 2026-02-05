---
title: Mechanismy konsenzu
description: Vysvětlení konsensuálních protokolů v distribuovaných systémech a jejich role v Ethereu.
lang: cs
---

Pojem „mechanismus konsenzu“ se často hovorově používá pro protokoly „důkaz podílem“, „důkaz prací“ nebo „důkaz autoritou“. Jedná se však pouze o součásti mechanismů konsenzu, které chrání proti [útokům Sybil](/glossary/#sybil-attack). Mechanismy konsenzu jsou kompletní soubor myšlenek, protokolů a pobídek, které umožňují distribuované sadě uzlů dohodnout se na stavu blockchainu.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme si nejprve přečíst náš [úvod do Etherea](/developers/docs/intro-to-ethereum/).

## Co je to konsensus? {#what-is-consensus}

Konsensem myslíme, že bylo dosaženo všeobecné shody. Představte si skupinu lidí, kteří jdou do kina. Pokud nedojde k neshodě ohledně navrhovaného výběru filmu, je dosaženo konsensu. Pokud dojde k neshodě, skupina musí mít prostředky, jak se rozhodnout, na který film se podívat. V krajních případech se skupina nakonec rozdělí.

Pokud jde o blockchain Etherea, proces je formalizován a dosažení konsensu znamená, že se alespoň 66 % uzlů v síti shodne na globálním stavu sítě.

## Co je to konsensuální mechanismus? {#what-is-a-consensus-mechanism}

Termín mechanismus konsenzu se vztahuje na celý soubor protokolů, pobídek a myšlenek, které umožňují síti uzlů dohodnout se na stavu blockchainu.

Ethereum používá mechanismus konsenzu založený na důkazu podílem, který odvozuje své krypto-ekonomické zabezpečení ze souboru odměn a pokut uplatňovaných na kapitál uzamčený stakery. Tato motivační struktura povzbuzuje jednotlivé stakery, aby provozovali poctivé validátory, trestá ty, kteří tak nečiní, a vytváří extrémně vysoké náklady na útok na síť.

Dále existuje protokol, který řídí, jak jsou poctiví validátoři vybíráni, aby navrhovali nebo validovali bloky, zpracovávali transakce a hlasovali pro svůj pohled na začátek řetězce. Ve vzácných situacích, kdy se v blízkosti začátku řetězce nachází více bloků ve stejné pozici, existuje mechanismus výběru větve, který vybírá bloky, které tvoří „nejtěžší“ řetězec, měřeno počtem validátorů, kteří pro bloky hlasovali, váženým jejich zůstatkem vsazeného etheru.

Některé koncepty jsou pro konsensus důležité, ale nejsou explicitně definovány v kódu, jako například dodatečné zabezpečení, které nabízí potenciální mimopásmová sociální koordinace jako poslední obranná linie proti útokům na síť.

Tyto komponenty dohromady tvoří mechanismus konsenzu.

## Typy mechanismů konsenzu {#types-of-consensus-mechanisms}

### Založené na důkazu prací {#proof-of-work}

Stejně jako Bitcoin, i Ethereum kdysi používalo konsensuální protokol založený na **důkazu prací (PoW)**.

#### Tvorba bloku {#pow-block-creation}

Těžaři soutěží o vytvoření nových bloků naplněných zpracovanými transakcemi. Vítěz se o nový blok podělí se zbytkem sítě a získá čerstvě vytěžené ETH. Závod vyhrává počítač, který dokáže nejrychleji vyřešit matematickou hádanku. Tím se vytvoří kryptografické spojení mezi aktuálním blokem a blokem, který mu předcházel. Vyřešení této hádanky je ona „práce“ v „důkazu prací“. Kanonický řetězec je pak určen pravidlem výběru větve, které vybírá sadu bloků, na jejichž vytěžení bylo vynaloženo nejvíce práce.

#### Bezpečnost {#pow-security}

Síť je bezpečná díky tomu, že k podvodu v řetězci byste potřebovali 51% výpočetního výkonu sítě. To by vyžadovalo tak obrovské investice do vybavení a energie, že byste pravděpodobně utratili více, než byste získali.

Více o [důkazu prací](/developers/docs/consensus-mechanisms/pow/)

### Založené na důkazu podílem {#proof-of-stake}

Ethereum nyní používá konsensuální protokol založený na **důkazu podílem (PoS)**.

#### Tvorba bloku {#pos-block-creation}

Validátoři vytvářejí bloky. V každém slotu je náhodně vybrán jeden validátor, který se stane navrhovatelem bloku. Jejich konsensuální klient si vyžádá balíček transakcí jako „exekuční datovou část“ od spárovaného exekučního klienta. Toto zabalí do konsensuálních dat, aby vytvořili blok, který odešlou ostatním uzlům v síti Ethereum. Tato produkce bloků je odměňována v ETH. Ve vzácných případech, kdy pro jeden slot existuje více možných bloků nebo se uzly o blocích dozvědí v různou dobu, algoritmus výběru větve vybere blok, který tvoří řetězec s největší váhou atestací (kde váha je počet atestujících validátorů škálovaný jejich zůstatkem ETH).

#### Bezpečnost {#pos-security}

Systém důkazu podílem je krypto-ekonomicky bezpečný, protože útočník, který se pokusí převzít kontrolu nad řetězcem, musí zničit obrovské množství ETH. Systém odměn motivuje jednotlivé stakery k čestnému chování a pokuty je odrazují od škodlivého jednání.

Více o [důkazu podílem](/developers/docs/consensus-mechanisms/pos/)

### Vizuální průvodce {#types-of-consensus-video}

Podívejte se na více informací o různých typech mechanismů konsenzu používaných v Ethereu:

<YouTube id="ojxfbN78WFQ" />

### Odolnost proti útokům Sybil a výběr řetězce {#sybil-chain}

Důkaz prací a důkaz podílem samy o sobě nejsou konsensuální protokoly, ale pro zjednodušení se tak často označují. Jsou to ve skutečnosti mechanismy odolnosti proti útokům Sybil a voliči autora bloku; je to způsob, jak rozhodnout, kdo je autorem nejnovějšího bloku. Další důležitou součástí je algoritmus pro výběr řetězce (neboli výběr větve), který umožňuje uzlům vybrat si jeden jediný správný blok na začátku řetězce ve scénářích, kdy na stejné pozici existuje více bloků.

**Odolnost proti útokům Sybil** měří, jak si protokol vede proti útoku Sybil. Odolnost proti tomuto typu útoku je pro decentralizovaný blockchain zásadní a umožňuje těžařům a validátorům, aby byli odměňováni rovnoměrně na základě vložených zdrojů. Důkaz prací a důkaz podílem proti tomu chrání tím, že nutí uživatele vynaložit velké množství energie nebo vložit velký kolaterál. Tato ochrana je ekonomickým odstrašujícím prostředkem proti útokům Sybil.

**Pravidlo výběru řetězce** se používá k rozhodnutí, který řetězec je ten „správný“. Bitcoin používá pravidlo „nejdelšího řetězce“, což znamená, že nejdelší blockchain bude ten, který zbytek uzlů přijme jako platný a bude s ním pracovat. U řetězců s důkazem prací je nejdelší řetězec určen celkovou kumulativní obtížností důkazu prací daného řetězce. I Ethereum dříve používalo pravidlo nejdelšího řetězce; nicméně nyní, když Ethereum běží na důkazu podílem, přijalo aktualizovaný algoritmus výběru větve, který měří „váhu“ řetězce. Váha je kumulativní součet hlasů validátorů, vážený zůstatky vsazeného etheru validátorů.

Ethereum používá mechanismus konsenzu známý jako [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/), který kombinuje [důkaz podílem Casper FFG](https://arxiv.org/abs/1710.09437) s [pravidlem výběru větve GHOST](https://arxiv.org/abs/2003.03052).

## Další čtení {#further-reading}

- [Co je to konsensuální algoritmus blockchainu?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Co je to Nakamoto konsensus? Kompletní průvodce pro začátečníky](https://blockonomi.com/nakamoto-consensus/)
- [Jak funguje Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [O bezpečnosti a výkonu blockchainů s důkazem prací](https://eprint.iacr.org/2016/555.pdf)
- [Byzantská chyba](https://en.wikipedia.org/wiki/Byzantine_fault)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Důkaz prací](/developers/docs/consensus-mechanisms/pow/)
- [Těžba](/developers/docs/consensus-mechanisms/pow/mining/)
- [Důkaz podílem](/developers/docs/consensus-mechanisms/pos/)
- [Důkaz autoritou](/developers/docs/consensus-mechanisms/poa/)
