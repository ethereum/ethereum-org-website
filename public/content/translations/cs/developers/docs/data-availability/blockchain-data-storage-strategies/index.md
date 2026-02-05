---
title: "Strategie ukládání dat na blockchainu"
description: "Existuje několik způsobů, jak ukládat data pomocí blockchainu. Tento článek porovná různé strategie, jejich náklady a kompromisy, a také požadavky na jejich bezpečné používání."
lang: cs
---

Existuje několik způsobů, jak ukládat informace buď přímo na blockchainu, nebo způsobem, který je blockchainem zabezpečen:

- Bloby EIP-4844
- Calldata
- Mimo řetězec s mechanismy L1
- Kód kontraktu
- Události
- Úložiště EVM

Volba metody závisí na několika kritériích:

- Zdroj informací. Informace v calldata nemohou pocházet přímo ze samotného blockchainu.
- Cíl informací. Calldata je dostupná pouze v transakci, která ji obsahuje. Události nejsou na řetězci vůbec přístupné.
- Jaká míra obtíží je přijatelná? Počítače, na kterých běží plnohodnotný uzel, mohou provádět více zpracování než lehký klient v aplikaci běžící v prohlížeči.
- Je nutné zajistit snadný přístup k informacím z každého uzlu?
- Požadavky na zabezpečení.

## Požadavky na zabezpečení {#security-requirements}

Obecně se bezpečnost informací skládá ze tří atributů:

- _Důvěrnost_, neoprávněné subjekty nesmějí informace číst. To je v mnoha případech důležité, ale ne tady. _Na blockchainu neexistují žádná tajemství_. Blockchainy fungují, protože kdokoli může ověřit přechody stavů, takže je nelze použít k přímému ukládání tajemství. Existují způsoby, jak ukládat důvěrné informace na blockchain, ale všechny se spoléhají na nějakou komponentu mimo řetězec, která ukládá alespoň klíč.

- _Integrita_, informace jsou správné, nemohou je měnit neoprávněné subjekty ani neoprávněnými způsoby (například přenos [tokenů ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) bez události `Transfer`). Na blockchainu každý uzel ověřuje každou změnu stavu, což zajišťuje integritu.

- _Dostupnost_, informace jsou dostupné jakémukoli oprávněnému subjektu. Na blockchainu se toho obvykle dosahuje tak, že jsou informace dostupné na každém [plném uzlu](https://ethereum.org/developers/docs/nodes-and-clients#full-node).

Všechna zde uvedená řešení mají vynikající integritu, protože haše jsou zveřejňovány na L1. Mají však různé záruky dostupnosti.

## Předpoklady {#prerequisites}

Měli byste dobře rozumět [základům blockchainu](/developers/docs/intro-to-ethereum/). Tato stránka také předpokládá, že je čtenář obeznámen s [bloky](/developers/docs/blocks/), [transakcemi](/developers/docs/transactions/) a dalšími relevantními tématy.

## Bloby EIP-4844 {#eip-4844-blobs}

Počínaje [hardforkem Dencun](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) obsahuje blockchain Etherea [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), který do Etherea přidává datové bloby s omezenou životností (původně asi [18 dní](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). Cena těchto blobů se stanovuje odděleně od [exekučního paliva](/developers/docs/gas), i když se používá podobný mechanismus. Jsou levným způsobem, jak zveřejnit dočasná data.

Hlavním případem použití blobů EIP-4844 je zveřejňování transakcí rollupy. [Optimistické rollupy](/developers/docs/scaling/optimistic-rollups) musí zveřejňovat transakce na svých blockchainech. Tyto transakce musí být dostupné komukoli během [období pro napadení](https://docs.optimism.io/connect/resources/glossary#challenge-period), aby [validátoři](https://docs.optimism.io/connect/resources/glossary#validator) mohli opravit chybu, pokud [sekvencer](https://docs.optimism.io/connect/resources/glossary#sequencer) rollupu zveřejní nesprávný kořen stavu.

Jakmile však období pro napadení uplyne a kořen stavu je finalizován, zbývajícím účelem znalosti těchto transakcí je replikace aktuálního stavu řetězce. Tento stav je také dostupný z uzlů řetězce, přičemž je zapotřebí mnohem méně zpracování. Informace o transakcích by se tedy měly stále uchovávat na několika místech, například v [prohlížečích bloků](/developers/docs/data-and-analytics/block-explorers), ale není třeba platit za úroveň odolnosti vůči cenzuře, kterou Ethereum poskytuje.

[Rollupy s nulovou znalostí](/developers/docs/scaling/zk-rollups/#data-availability) také zveřejňují svá transakční data, aby ostatní uzly mohly replikovat existující stav a ověřit důkazy platnosti, ale opět se jedná o krátkodobý požadavek.

V době psaní tohoto článku stojí zveřejnění na EIP-4844 jeden wei (10<sup>-18</sup> ETH) za bajt, což je zanedbatelné ve srovnání s [21 000 exekučního paliva, které stojí jakákoli transakce, včetně té, která zveřejňuje bloby](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Aktuální cenu EIP-4844 si můžete prohlédnout na [blobscan.com](https://blobscan.com/blocks).

Zde jsou adresy, na kterých si můžete prohlédnout bloby zveřejněné některými známými rollupy.

| Rollup                               | Adresa poštovní schránky                                                                                                |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata označuje bajty odeslané jako součást transakce. Jsou uložena jako součást trvalého záznamu blockchainu v bloku, který danou transakci obsahuje.

Toto je nejlevnější metoda pro trvalé vložení dat do blockchainu. Cena za bajt je buď 4 exekučního paliva (pokud je bajt nulový) nebo 16 paliva (jakákoli jiná hodnota). Pokud jsou data komprimována, což je standardní postup, pak je každá hodnota bajtu stejně pravděpodobná, takže průměrná cena je přibližně 15,95 paliva za bajt.

V době psaní tohoto článku jsou ceny 12 gwei/palivo a 2300 $/ETH, což znamená, že cena je přibližně 45 centů za kilobajt. Protože se jednalo o nejlevnější metodu před EIP-4844, je to metoda, kterou rollupy používaly k ukládání informací o transakcích, které musí být dostupné pro [napadení chyb](https://docs.optimism.io/stack/protocol/overview#fault-proofs), ale nemusí být přístupné přímo na řetězci.

Zde jsou adresy, na kterých si můžete prohlédnout transakce zveřejněné některými známými rollupy.

| Rollup                               | Adresa poštovní schránky                                                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Mimo řetězec s mechanismy L1 {#offchain-with-l1-mechs}

V závislosti na vašich bezpečnostních kompromisech může být přijatelné umístit informace jinam a použít mechanismus, který zajistí dostupnost dat v případě potřeby. Aby to fungovalo, jsou zapotřebí dva požadavky:

1. Zveřejněte na blockchainu [haš](https://en.wikipedia.org/wiki/Cryptographic_hash_function) dat, nazývaný _závazek vstupu_. Může to být jediné 32bajtové slovo, takže to není drahé. Dokud je k dispozici závazek vstupu, je zaručena integrita, protože není možné najít jiná data, která by se hašovala na stejnou hodnotu. Pokud jsou tedy poskytnuta nesprávná data, lze je odhalit.

2. Mít mechanismus, který zajišťuje dostupnost. Například v [Redstone](https://redstone.xyz/docs/what-is-redstone) může jakýkoli uzel podat výzvu k dostupnosti. Pokud sekvencer neodpoví na řetězci do termínu, závazek vstupu se zruší, takže se informace považují za nikdy nezveřejněné.

To je pro optimistický rollup přijatelné, protože se již spoléháme na to, že pro kořen stavu existuje alespoň jeden poctivý ověřovatel. Takový poctivý ověřovatel se také ujistí, že má data ke zpracování bloků, a vydá výzvu k dostupnosti, pokud informace nejsou k dispozici mimo řetězec. Tento typ optimistického rollupu se nazývá [plasma](/developers/docs/scaling/plasma/).

## Kód kontraktu {#contract-code}

Informace, které je třeba zapsat pouze jednou, nikdy se nepřepisují a musí být dostupné na řetězci, lze uložit jako kód kontraktu. To znamená, že vytvoříme "chytrý kontrakt" s daty a poté pomocí [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) informace přečteme. Výhodou je, že kopírování kódu je relativně levné.

Kromě nákladů na rozšíření paměti stojí `EXTCODECOPY` 2600 paliva za první přístup ke kontraktu (když je "studený") a 100 paliva za následné kopie ze stejného kontraktu plus 3 paliva za 32bajtové slovo. Ve srovnání s calldata, které stojí 15,95 za bajt, je to levnější od přibližně 200 bajtů. Na základě [vzorce pro náklady na rozšíření paměti](https://www.evm.codes/about#memoryexpansion), pokud nepotřebujete více než 4 MB paměti, jsou náklady na rozšíření paměti menší než náklady na přidání calldata.

Samozřejmě, to jsou jen náklady na _přečtení_ dat. Vytvoření kontraktu stojí přibližně 32 000 paliva + 200 paliva/bajt. Tato metoda je ekonomická pouze tehdy, když je třeba stejné informace číst mnohokrát v různých transakcích.

Kód kontraktu může být nesmyslný, pokud nezačíná na `0xEF`. Kontrakty, které začínají na `0xEF`, jsou interpretovány jako [objektový formát ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), který má mnohem přísnější požadavky.

## Události {#events}

[Události](https://docs.alchemy.com/docs/solidity-events) jsou emitovány chytrými kontrakty a čteny softwarem mimo řetězec.
Jejich výhodou je, že kód mimo řetězec může naslouchat událostem. Cena je [palivo](https://www.evm.codes/#a0?fork=cancun), 375 plus 8 paliva za bajt dat. Při 12 gwei/palivo a 2300 $/ETH to znamená jeden cent plus 22 centů za kilobajt.

## Úložiště {#storage}

Chytré kontrakty mají přístup k [trvalému úložišti](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Je to však velmi drahé. Zápis 32bajtového slova do dříve prázdného slotu úložiště může [stát 22 100 paliva](https://www.evm.codes/#55?fork=cancun). Při 12 gwei/palivo a 2300 $/ETH je to asi 61 centů za operaci zápisu, neboli 19,5 $ za kilobajt.

Toto je nejdražší forma úložiště v Ethereu.

## Shrnutí {#summary}

Tato tabulka shrnuje různé možnosti, jejich výhody a nevýhody.

| Typ úložiště                 | Zdroj dat                    | Záruka dostupnosti                                                                                                                                | Dostupnost na řetězci                                     | Další omezení                                                  |
| ---------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| Bloby EIP-4844               | Mimo řetězec                 | Záruka Etherea po dobu [~18 dnů](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Je dostupný pouze haš                                     |                                                                |
| Calldata                     | Mimo řetězec                 | Záruka Etherea navždy (součást blockchainu)                                                                                    | Dostupné pouze při zápisu do kontraktu a v dané transakci |                                                                |
| Mimo řetězec s mechanismy L1 | Mimo řetězec                 | Záruka "jednoho poctivého ověřovatele" během období pro napadení                                                                                  | Pouze haš                                                 | Zaručeno mechanismem napadení, pouze během období pro napadení |
| Kód kontraktu                | Na řetězci nebo mimo řetězec | Záruka Etherea navždy (součást blockchainu)                                                                                    | Ano                                                       | Zapsáno na "náhodnou" adresu, nesmí začínat `0xEF`             |
| Události                     | Na řetězci                   | Záruka Etherea navždy (součást blockchainu)                                                                                    | Ne                                                        |                                                                |
| Úložiště                     | Na řetězci                   | Záruka Etherea navždy (součást blockchainu a současného stavu, dokud není přepsán)                                             | Ano                                                       |                                                                |
