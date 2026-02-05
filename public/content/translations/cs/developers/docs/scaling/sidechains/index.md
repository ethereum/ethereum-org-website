---
title: Postranní řetězce
description: Úvod do postranních řetězců jako škálovacího řešení, které v současnosti využívá komunita Etherea.
lang: cs
sidebarDepth: 3
---

Postranní řetězec je samostatný blockchain, který běží nezávisle na Ethereu a je spojen s Ethereum Mainnetem pomocí obousměrného přemostění. Postranní řetězce mohou mít odlišné parametry bloků a [konsensuální algoritmy](/developers/docs/consensus-mechanisms/), které jsou často navrženy pro efektivní zpracování transakcí. Použití postranního řetězce však přináší určité kompromisy, protože nedědí bezpečnostní vlastnosti Etherea. Na rozdíl od [škálovacích řešení na 2. vrstvě](/layer-2/) postranní řetězce nezaznamenávají změny stavu a transakční data zpět na Ethereum Mainnet.

Postranní řetězce také obětují určitou míru decentralizace nebo bezpečnosti, aby dosáhly vysoké propustnosti ([trilema škálovatelnosti](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum se však zavázalo ke škálování bez kompromisů v oblasti decentralizace a bezpečnosti.

## Jak fungují postranní řetězce? {#how-do-sidechains-work}

Postranní řetězce jsou nezávislé blockchainy s odlišnou historií, vývojovými plány a designovými úvahami. Zatímco postranní řetězec může sdílet určité povrchové podobnosti s Ethereem, má několik charakteristických vlastností.

### Konsenzuální algoritmy {#consensus-algorithms}

Jednou z vlastností, která činí postranní řetězce jedinečnými (tj. odlišnými od Etherea), je použitý konsensuální algoritmus. Postranní řetězce se pro dosažení konsensu nespoléhají na Ethereum a mohou si vybrat alternativní konsensuální protokoly, které vyhovují jejich potřebám. Některé příklady konsensuálních algoritmů používaných na postranních řetězcích zahrnují:

- [Důkaz autoritou](/developers/docs/consensus-mechanisms/poa/)
- [Delegovaný důkaz podílem](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Byzantská odolnost proti chybám](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Stejně jako Ethereum mají postranní řetězce validační uzly, které ověřují a zpracovávají transakce, produkují bloky a uchovávají stav blockchainu. Validátoři jsou také zodpovědní za udržování konsensu v celé síti a za její ochranu před škodlivými útoky.

#### Parametry bloku {#block-parameters}

Ethereum stanovuje limity na [doby bloků](/developers/docs/blocks/#block-time) (tj. dobu potřebnou k vytvoření nových bloků) a [velikosti bloků](/developers/docs/blocks/#block-size) (tj. množství dat obsažených v jednom bloku, vyjádřené v palivu). Naproti tomu postranní řetězce často přijímají odlišné parametry, jako jsou rychlejší doby blokování a vyšší limity paliva, aby dosáhly vysoké propustnosti, rychlých transakcí a nízkých poplatků.

I když tento přístup určité výhody přináší, má také zásadní důsledky pro decentralizaci a bezpečnost sítě. Parametry bloků, jako jsou rychlé doby blokování a velké velikosti bloků, zvyšují obtížnost provozu úplného síťového uzlu, což ponechává jen několik „superuzlů“ odpovědných za zabezpečení řetězce. V takovém scénáři se zvyšuje riziko tajné dohody validátorů nebo škodlivého převzetí řetězce.

Aby mohly blockchainy škálovat, aniž by utrpěla decentralizace, musí být provoz síťového uzlu otevřený všem, nikoli nutně jen pro strany se specializovaným hardwarem. Proto probíhají snahy o zajištění toho, aby každý mohl [provozovat plný uzel](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) v síti Ethereum.

### Kompatibilita s EVM {#evm-compatibility}

Některé postranní řetězce jsou kompatibilní s EVM a jsou schopny spouštět kontrakty vyvinuté pro [Virtuální stroj Etherea (EVM)](/developers/docs/evm/). Postranní řetězce kompatibilní s EVM podporují chytré kontrakty [napsané v jazyce Solidity](/developers/docs/smart-contracts/languages/), stejně jako jiné jazyky pro chytré kontrakty EVM, což znamená, že chytré kontrakty napsané pro Ethereum Mainnet budou fungovat i na postranních řetězcích kompatibilních s EVM.

To znamená, že pokud chcete použít svou [dapp](/developers/docs/dapps/) na postranním řetězci, stačí nasadit svůj [chytrý kontrakt](/developers/docs/smart-contracts/) na tento postranní řetězec. Vypadá a funguje stejně jako na Mainnetu – píšete kontrakty v Solidity a interagujete s řetězcem prostřednictvím RPC postranního řetězce.

Protože jsou postranní řetězce kompatibilní s EVM, jsou považovány za užitečné [škválovací řešení](/developers/docs/scaling/) pro dapps nativní na Ethereu. S vaší dappkou na postranním řetězci mohou uživatelé využívat nižší poplatky za palivo a rychlejší transakce, zejména pokud je Mainnet přetížený.

Nicméně jak bylo dříve vysvětleno, používání postranního řetězce zahrnuje významné kompromisy. Každý postranní řetězec je zodpovědný za svou bezpečnost a nedědí bezpečnostní vlastnosti Etherea. To zvyšuje možnost škodlivého chování, které může ovlivnit vaše uživatele nebo ohrozit jejich prostředky.

### Přesun aktiv {#asset-movement}

Aby se samostatný blockchain mohl stát postranním řetězcem Mainnetu Etherea, musí mít schopnost umožnit převod aktiv z Mainnetu. Této interoperability s Ethereem je dosaženo pomocí blockchainového přemostění. [Přemostění](/bridges/) používají chytré kontrakty nasazené na Ethereum Mainnet a na postranním řetězci k řízení převodu prostředků mezi nimi.

Zatímco přemostění pomáhají uživatelům přesouvat prostředky mezi Ethereem a postranním řetězcem, aktiva mezi těmito dvěma řetězci nejsou fyzicky přesouvána. Místo toho se k převodu hodnoty mezi řetězci používají mechanismy, které obvykle zahrnují mintování a spalování. Více o tom, [jak fungují přemostění](/developers/docs/bridges/#how-do-bridges-work).

## Výhody a nevýhody postranních řetězců {#pros-and-cons-of-sidechains}

| Plusy                                                                                                                                                  | Minusy                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Technologie, která stojí za postranními řetězci, je dobře zavedená a těží z rozsáhlého výzkumu a vylepšení designu.                    | Postranní řetězce obětují určitou míru decentralizace a důvěryhodnosti ve prospěch škálovatelnosti.                                                            |
| Postranní řetězce podporují obecné výpočty a nabízejí EVM kompatibilitu (mohou spouštět dappky nativní na Ethereu). | Postranní řetězec používá samostatný konsensuální mechanismus a nemá prospěch z bezpečnostních záruk Etherea.                                                  |
| Postranní řetězce používají různé modely konsensu k efektivnímu zpracování transakcí a snížení poplatků za transakce pro uživatele.    | Postranní řetězce vyžadují vyšší předpoklady důvěry (např. kvórum škodlivých validátorů postranního řetězce může podvádět). |
| Postranní řetězce kompatibilní s EVM umožňují dappkám rozšířit jejich ekosystém.                                                       |                                                                                                                                                                                |

### Použijte postranní řetězce {#use-sidechains}

Několik projektů poskytuje implementace postranních řetězců, které můžete integrovat do svých dappek:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (dříve xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Další čtení {#further-reading}

- [Škálování dapps na Ethereu pomocí postranních řetězců](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8. února 2018 - Georgios Konstantopoulos_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
