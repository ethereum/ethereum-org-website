---
title: Postranní řetězce
description: Úvod do postranních řetězců jako řešení škálování, které v současnosti využívá komunita Etherea.
lang: cs
sidebarDepth: 3
---

Postranní řetězec je samostatný blockchain, který běží nezávisle na [Ethereu](/) a je připojen k síti Ethereum Mainnet pomocí obousměrného mostu. Postranní řetězce mohou mít samostatné parametry bloku a [algoritmy konsensu](/developers/docs/consensus-mechanisms/), které jsou často navrženy pro efektivní zpracování transakcí. Použití postranního řetězce však přináší kompromisy, protože nedědí bezpečnostní vlastnosti Etherea. Na rozdíl od [řešení škálování vrstvy 2](/layer-2/) neodesílají postranní řetězce změny stavu a transakční data zpět na Ethereum Mainnet.

Postranní řetězce také obětují určitou míru decentralizace nebo bezpečnosti k dosažení vysoké propustnosti ([trilema škálovatelnosti](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum se však zavázalo ke škálování bez kompromisů v oblasti decentralizace a bezpečnosti.

## Jak fungují postranní řetězce? {#how-do-sidechains-work}

Postranní řetězce jsou nezávislé blockchainy s odlišnou historií, plány vývoje a konstrukčními hledisky. Ačkoli může postranní řetězec sdílet s Ethereem určité povrchové podobnosti, má několik charakteristických rysů.

### Algoritmy konsensu {#consensus-algorithms}

Jednou z vlastností, která činí postranní řetězce jedinečnými (tj. odlišnými od Etherea), je použitý algoritmus konsensu. Postranní řetězce nespoléhají na Ethereum ohledně konsensu a mohou si zvolit alternativní protokoly konsensu, které vyhovují jejich potřebám. Mezi příklady algoritmů konsensu používaných na postranních řetězcích patří:

- [Důkaz autority](/developers/docs/consensus-mechanisms/poa/)
- [Delegovaný důkaz podílem](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Byzantská odolnost proti chybám](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Stejně jako Ethereum mají postranní řetězce validující uzly, které ověřují a zpracovávají transakce, vytvářejí bloky a ukládají stav blockchainu. Validátory jsou také zodpovědné za udržování konsensu v celé síti a její zabezpečení proti škodlivým útokům.

#### Parametry bloku {#block-parameters}

Ethereum stanovuje limity na [časy bloků](/developers/docs/blocks/#block-time) (tj. čas potřebný k vytvoření nových bloků) a [velikosti bloků](/developers/docs/blocks/#block-size) (tj. množství dat obsažených v jednom bloku vyjádřené v gasu). Naopak postranní řetězce často přijímají odlišné parametry, jako jsou rychlejší časy bloků a vyšší limity gasu, aby dosáhly vysoké propustnosti, rychlých transakcí a nízkých poplatků.

Ačkoli to má určité výhody, má to kritické důsledky pro decentralizaci a bezpečnost sítě. Parametry bloku, jako jsou rychlé časy bloků a velké velikosti bloků, zvyšují obtížnost provozování plného uzlu – což ponechává zodpovědnost za zabezpečení řetězce na několika „superuzlech“. V takovém scénáři se zvyšuje možnost tajné dohody validátorů nebo škodlivého převzetí řetězce.

Aby se blockchainy mohly škálovat bez poškození decentralizace, musí být provozování uzlu otevřené všem – ne nutně jen stranám se specializovaným hardwarem. Proto probíhají snahy zajistit, aby každý mohl [provozovat plný uzel](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) v síti Ethereum.

### Kompatibilita s EVM {#evm-compatibility}

Některé postranní řetězce jsou kompatibilní s EVM a dokážou spouštět kontrakty vyvinuté pro [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). Postranní řetězce kompatibilní s EVM podporují chytré kontrakty [napsané v Solidity](/developers/docs/smart-contracts/languages/) i v dalších jazycích pro chytré kontrakty EVM, což znamená, že chytré kontrakty napsané pro Ethereum Mainnet budou fungovat i na postranních řetězcích kompatibilní s EVM.

To znamená, že pokud chcete používat svou [decentralizovanou aplikaci (dapp)](/developers/docs/dapps/) na postranním řetězci, stačí pouze nasadit váš [chytrý kontrakt](/developers/docs/smart-contracts/) na tento postranní řetězec. Vypadá, působí a chová se přesně jako Mainnet – píšete kontrakty v Solidity a komunikujete s řetězcem prostřednictvím RPC postranního řetězce.

Protože jsou postranní řetězce kompatibilní s EVM, jsou považovány za užitečné [řešení škálování](/developers/docs/scaling/) pro nativní dapp na Ethereu. S vaší dapp na postranním řetězci mohou uživatelé využívat nižší poplatky za gas a rychlejší transakce, zejména pokud je Mainnet přetížený.

Jak však bylo vysvětleno dříve, použití postranního řetězce s sebou nese významné kompromisy. Každý postranní řetězec je zodpovědný za svou bezpečnost a nedědí bezpečnostní vlastnosti Etherea. To zvyšuje možnost škodlivého chování, které může ovlivnit vaše uživatele nebo ohrozit jejich prostředky.

### Pohyb aktiv {#asset-movement}

Aby se samostatný blockchain mohl stát postranním řetězcem k síti Ethereum Mainnet, potřebuje schopnost usnadnit převod aktiv z a do sítě Ethereum Mainnet. Této interoperability s Ethereem je dosaženo pomocí blockchainového mostu. [Mosty](/bridges/) využívají chytré kontrakty nasazené na síti Ethereum Mainnet a postranním řetězci k řízení přemostění prostředků mezi nimi.

Ačkoli mosty pomáhají uživatelům přesouvat prostředky mezi Ethereem a postranním řetězcem, aktiva se fyzicky nepřesouvají mezi těmito dvěma řetězci. Místo toho se k převodu hodnoty napříč řetězci používají mechanismy, které obvykle zahrnují ražení a spálení. Více o tom, [jak fungují mosty](/developers/docs/bridges/#how-do-bridges-work).

## Výhody a nevýhody postranních řetězců {#pros-and-cons-of-sidechains}

| Výhody                                                                                                                      | Nevýhody                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Technologie, o kterou se postranní řetězce opírají, je dobře zavedená a těží z rozsáhlého výzkumu a vylepšení designu.      | Postranní řetězce vyměňují určitou míru decentralizace a bezdůvěrnosti za škálovatelnost.                        |
| Postranní řetězce podporují obecné výpočty a nabízejí kompatibilitu s EVM (mohou spouštět nativní dapp Etherea).            | Postranní řetězec používá samostatný mechanismus konsensu a netěží z bezpečnostních záruk Etherea.               |
| Postranní řetězce používají různé modely konsensu k efektivnímu zpracování transakcí a snížení transakčních poplatků pro uživatele. | Postranní řetězce vyžadují vyšší předpoklady důvěry (např. kvorum škodlivých validátorů postranního řetězce může spáchat podvod). |
| Postranní řetězce kompatibilní s EVM umožňují dapp rozšířit jejich ekosystém.                                               |                                                                                                                  |

### Použití postranních řetězců {#use-sidechains}

Několik projektů poskytuje implementace postranních řetězců, které můžete integrovat do svých dapp:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (dříve xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Další čtení {#further-reading}

- [Škálování dapp na Ethereu pomocí postranních řetězců](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8. února 2018 – Georgios Konstantopoulos_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_