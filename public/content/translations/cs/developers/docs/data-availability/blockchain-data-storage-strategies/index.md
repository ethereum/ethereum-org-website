---
title: Strategie ukládání dat na blockchainu
description: Existuje několik způsobů, jak ukládat data pomocí blockchainu. Tento článek porovná různé strategie, jejich náklady a kompromisy, stejně jako požadavky na jejich bezpečné používání.
lang: cs
---

Existuje několik způsobů, jak ukládat informace buď přímo na blockchainu, nebo způsobem, který je blockchainem zabezpečen:

- Bloby EIP-4844
- Data volání
- Offchain s mechanismy vrstvy 1 (L1)
- „Kód“ kontraktu
- Události
- Úložiště EVM

Výběr metody závisí na několika kritériích:

- Zdroj informací. Informace v datech volání nemohou pocházet přímo ze samotného blockchainu.
- Cíl informací. Data volání jsou k dispozici pouze v transakci, která je obsahuje. Události nejsou onchain vůbec přístupné.
- Kolik komplikací je přijatelných? Počítače, které provozují plný uzel, mohou provádět více zpracování než lehký klient v aplikaci běžící v prohlížeči.
- Je nutné usnadnit snadný přístup k informacím z každého uzlu?
- Bezpečnostní požadavky.

## Bezpečnostní požadavky {#security-requirements}

Obecně se informační bezpečnost skládá ze tří atributů:

- _Důvěrnost_, neoprávněné subjekty nesmí číst informace. To je v mnoha případech důležité, ale ne zde. _Na blockchainu nejsou žádná tajemství_. Blockchainy fungují, protože kdokoli může ověřit přechody stavu, takže je nemožné je použít k přímému ukládání tajemství. Existují způsoby, jak ukládat důvěrné informace na blockchainu, ale všechny spoléhají na nějakou offchain komponentu, která ukládá alespoň klíč.

- _Integrita_, informace jsou správné, nemohou být změněny neoprávněnými subjekty nebo neoprávněnými způsoby (například převod [tokenů ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) bez události `Transfer`). Na blockchainu každý uzel ověřuje každou změnu stavu, což zajišťuje integritu.

- _Dostupnost_, informace jsou k dispozici jakémukoli oprávněnému subjektu. Na blockchainu se toho obvykle dosahuje tím, že jsou informace dostupné na každém [plném uzlu](https://ethereum.org/developers/docs/nodes-and-clients/#full-node).

Všechna zde uvedená řešení mají vynikající integritu, protože hashe jsou zveřejňovány na vrstvě 1 (L1). Mají však různé záruky dostupnosti.

## Předpoklady {#prerequisites}

Měli byste dobře rozumět [základům blockchainu](/developers/docs/intro-to-ethereum/). Tato stránka také předpokládá, že čtenář je obeznámen s [bloky](/developers/docs/blocks/), [transakcemi](/developers/docs/transactions/) a dalšími souvisejícími tématy.

## Bloby EIP-4844 {#eip-4844-blobs}

Počínaje [hard forkem Dencun](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md) obsahuje blockchain Etherea [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), který do Etherea přidává datové bloby s omezenou životností (zpočátku asi [18 dní](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)). Tyto bloby jsou zpoplatněny odděleně od [gasu za provedení](/developers/docs/gas), ačkoli využívají podobný mechanismus. Představují levný způsob, jak zveřejňovat dočasná data.

Hlavním případem užití blobů EIP-4844 je pro rollupy, aby mohly publikovat své transakce. [Optimistické rollupy](/developers/docs/scaling/optimistic-rollups) potřebují publikovat transakce na svých blockchainech. Tyto transakce musí být komukoli dostupné během [období pro zpochybnění](https://docs.optimism.io/connect/resources/glossary#challenge-period), aby [validátoři](https://docs.optimism.io/connect/resources/glossary#validator) mohli opravit chybu, pokud [sekvencer](https://docs.optimism.io/connect/resources/glossary#sequencer) rollupu zveřejní nesprávný kořen stavu.

Jakmile však období pro zpochybnění uplyne a kořen stavu je finalizováno, zbývajícím účelem znalosti těchto transakcí je replikace aktuálního stavu řetězce. Tento stav je také dostupný z uzlů řetězce, což vyžaduje mnohem méně zpracování. Informace o transakcích by tedy měly být stále zachovány na několika místech, jako jsou [prohlížeče bloků](/developers/docs/data-and-analytics/block-explorers), ale není nutné platit za úroveň odolnosti vůči cenzuře, kterou Ethereum poskytuje.

[Rollupy s nulovým vědomím](/developers/docs/scaling/zk-rollups/#data-availability) také zveřejňují svá transakční data, aby umožnily ostatním uzlům replikovat existující stav a ověřit důkazy platnosti, ale i to je pouze krátkodobý požadavek.

V době psaní tohoto textu stojí zveřejnění na EIP-4844 jeden Wei (10<sup>-18</sup> ETH) za bajt, což je zanedbatelné ve srovnání s [21 000 gasu za provedení, které stojí jakákoli transakce, včetně té, která zveřejňuje bloby](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Aktuální cenu EIP-4844 můžete vidět na [blobscan.com](https://blobscan.com/blocks).

Zde jsou adresy, kde si můžete prohlédnout bloby zveřejněné některými známými rollupy.

| Rollup                               | Adresa schránky                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Data volání {#calldata}

Data volání označují bajty odeslané jako součást transakce. Jsou uložena jako součást trvalého záznamu blockchainu v bloku, který tuto transakci obsahuje.

Jedná se o nejlevnější metodu, jak trvale vložit data do blockchainu. Cena za bajt je buď 4 gasy za provedení (pokud je bajt nula), nebo 16 gasů (jakákoli jiná hodnota). Pokud jsou data komprimována, což je standardní praxe, pak je každá hodnota bajtu stejně pravděpodobná, takže průměrná cena je přibližně 15,95 gasu za bajt.

V době psaní tohoto textu jsou ceny 12 Gwei/gas a 2300 $/ETH, což znamená, že cena je přibližně 45 centů za kilobajt. Protože to byla před EIP-4844 nejlevnější metoda, je to metoda, kterou rollupy používaly k ukládání informací o transakcích, které musí být dostupné pro [zpochybnění chyb](https://docs.optimism.io/stack/protocol/overview#fault-proofs), ale nemusí být přístupné přímo onchain.

Zde jsou adresy, kde si můžete prohlédnout transakce zveřejněné některými známými rollupy.

| Rollup                               | Adresa schránky                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Offchain s mechanismy L1 {#offchain-with-l1-mechs}

V závislosti na vašich bezpečnostních kompromisech může být přijatelné umístit informace jinam a použít mechanismus, který zajistí, že data budou k dispozici, když budou potřeba. Aby to fungovalo, existují dva požadavky:

1. Zveřejnit [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) dat na blockchainu, nazývaný _vstupní závazek_. Může to být jediné 32bajtové slovo, takže to není drahé. Dokud je vstupní závazek k dispozici, je zajištěna integrita, protože není proveditelné najít žádná jiná data, která by měla stejný hash. Pokud jsou tedy poskytnuta nesprávná data, lze to odhalit.

2. Mít mechanismus, který zajišťuje dostupnost. Například v [Redstone](https://redstone.xyz/docs/what-is-redstone) může jakýkoli uzel podat výzvu k dostupnosti. Pokud sekvencer neodpoví onchain do stanoveného termínu, vstupní závazek je zahozen, takže se informace považuje za nikdy nezveřejněnou.

To je přijatelné pro optimistický rollup, protože již spoléháme na to, že máme alespoň jednoho poctivého ověřovatele pro kořen stavu. Takový poctivý ověřovatel se také ujistí, že má data ke zpracování bloků, a vydá výzvu k dostupnosti, pokud informace nejsou dostupné offchain. Tento typ optimistického rollupu se nazývá [Plasma](/developers/docs/scaling/plasma/).

## Kód kontraktu {#contract-code}

Informace, které je třeba zapsat pouze jednou, nikdy se nepřepisují a musí být dostupné onchain, lze uložit jako kód kontraktu. To znamená, že vytvoříme „chytrý kontrakt“ s daty a poté použijeme [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) ke čtení informací. Výhodou je, že kopírování kódu je relativně levné.

Kromě nákladů na rozšíření paměti stojí `EXTCODECOPY` 2600 gasu za první přístup ke kontraktu (když je „studený“) a 100 gasu za následné kopie ze stejného kontraktu plus 3 gasy za 32bajtové slovo. Ve srovnání s daty volání, která stojí 15,95 za bajt, je to levnější od přibližně 200 bajtů. Na základě [vzorce pro náklady na rozšíření paměti](https://www.evm.codes/about#memoryexpansion), pokud nepotřebujete více než 4 MB paměti, jsou náklady na rozšíření paměti menší než náklady na přidání dat volání.

Samozřejmě, to jsou pouze náklady na _čtení_ dat. Vytvoření kontraktu stojí přibližně 32 000 gasu + 200 gasu/bajt. Tato metoda je ekonomická pouze tehdy, když je třeba stejné informace číst mnohokrát v různých transakcích.

Kód kontraktu může být nesmyslný, pokud nezačíná na `0xEF`. Kontrakty, které začínají na `0xEF`, jsou interpretovány jako [objektový formát Etherea (EOF)](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), který má mnohem přísnější požadavky.

## Události {#events}

[Události](https://docs.alchemy.com/docs/solidity-events) jsou emitovány chytrými kontrakty a čteny offchain softwarem.
Jejich výhodou je, že offchain kód může naslouchat událostem. Nákladem je [gas](https://www.evm.codes/#a0?fork=cancun), 375 plus 8 gasů za bajt dat. Při 12 Gwei/gas a 2300 $/ETH to znamená jeden cent plus 22 centů za kilobajt.

## Úložiště {#storage}

Chytré kontrakty mají přístup k [trvalému úložišti](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Je to však velmi drahé. Zápis 32bajtového slova do dříve prázdného slotu úložiště může [stát 22 100 gasu](https://www.evm.codes/#55?fork=cancun). Při 12 Gwei/gas a 2300 $/ETH je to asi 61 centů za operaci zápisu, neboli 19,5 $ za kilobajt.

Jedná se o nejdražší formu úložiště v Ethereu.

## Shrnutí {#summary}

Tato tabulka shrnuje různé možnosti, jejich výhody a nevýhody.

| Typ úložiště                | Zdroj dat      | Záruka dostupnosti                                                                                                             | Onchain dostupnost                                             | Další omezení                                                  |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Bloby EIP-4844              | Offchain            | Záruka Etherea na [~18 dní](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | K dispozici je pouze hash                                           |                                                                         |
| Data volání                    | Offchain            | Záruka Etherea navždy (součást blockchainu)                                                                                | K dispozici pouze v případě zápisu do kontraktu a při dané transakci |
| Offchain s mechanismy L1 | Offchain            | Záruka „jednoho poctivého ověřovatele“ během období pro zpochybnění                                                                        | Pouze hash                                                        | Zaručeno mechanismem zpochybnění, pouze během období pro zpochybnění |
| Kód kontraktu               | Onchain nebo offchain | Záruka Etherea navždy (součást blockchainu)                                                                                | Ano                                                              | Zapsáno na „náhodnou“ adresu, nemůže začínat na `0xEF`                 |
| Události                      | Onchain             | Záruka Etherea navždy (součást blockchainu)                                                                                | Ne                                                               |
| Úložiště                     | Onchain             | Záruka Etherea navždy (součást blockchainu a současného stavu, dokud není přepsáno)                                        | Ano                                                              |