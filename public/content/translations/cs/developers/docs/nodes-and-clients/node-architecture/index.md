---
title: Architektura uzlů
description: Úvod do organizace uzlů sítě Ethereum.
lang: cs
---

Uzel sítě Ethereum se skládá ze dvou klientů: [exekučního klienta](/developers/docs/nodes-and-clients/#execution-clients) a [konsensuálního klienta](/developers/docs/nodes-and-clients/#consensus-clients). Aby mohl uzel navrhnout nový blok, musí na něm také běžet [klient validátoru](#validators).

Když Ethereum používalo [důkaz prací](/developers/docs/consensus-mechanisms/pow/), stačil k provozování plného uzlu sítě Ethereum exekuční klient. Od zavedení [důkazu podílem](/developers/docs/consensus-mechanisms/pow/) se však musí exekuční klient používat společně s dalším softwarem, který se nazývá [konsensuální klient](/developers/docs/nodes-and-clients/#consensus-clients).

Níže uvedený diagram znázorňuje vztah mezi dvěma klienty sítě Ethereum. Oba klienti se připojují ke svým vlastním sítím peer-to-peer (P2P). Jsou zapotřebí oddělené P2P sítě, protože exekuční klienti si přes svou P2P síť vyměňují transakce, což jim umožňuje spravovat jejich lokální transakční pool, zatímco konsensuální klienti si přes svou P2P síť vyměňují bloky, což umožňuje konsensus a růst řetězce.

![](node-architecture-text-background.png)

_Pro exekučního klienta existuje několik možností, včetně Erigon, Nethermind a Besu_.

Aby tato dvou-klientská struktura fungovala, musí konsensuální klienti předávat balíčky transakcí exekučnímu klientovi. Exekuční klient provádí transakce lokálně, aby ověřil, že transakce neporušují žádná pravidla Etherea a že navrhovaná aktualizace stavu Etherea je správná. Když je uzel vybrán jako producent bloku, jeho instance konsensuálního klienta si vyžádá balíčky transakcí od exekučního klienta, které zahrne do nového bloku a provede je, aby aktualizoval globální stav. Konsensuální klient řídí exekučního klienta prostřednictvím místního RPC připojení pomocí [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Co dělá exekuční klient? {#execution-client}

Exekuční klient je zodpovědný za validaci, zpracování a šíření transakcí, spolu se správou stavu a podporou Ethereum Virtual Machine ([EVM](/developers/docs/evm/)). **Není** zodpovědný za tvorbu bloků, jejich šíření nebo za zpracování logiky konsensu. To spadá do kompetence konsensuálního klienta.

Exekuční klient vytváří exekuční datové části – seznam transakcí, aktualizovaný stavový strom (trie) a další data související s prováděním. Konsensuální klienti zahrnují exekuční datovou část do každého bloku. Exekuční klient je také zodpovědný za opětovné provedení transakcí v nových blocích, aby se zajistila jejich platnost. Provádění transakcí probíhá na vestavěném počítači exekučního klienta, který je známý jako [Ethereum Virtual Machine (EVM)](/developers/docs/evm).

Exekuční klient také nabízí uživatelské rozhraní k síti Ethereum prostřednictvím [metod RPC](/developers/docs/apis/json-rpc), které uživatelům umožňují dotazovat se na blockchain Etherea, odesílat transakce a nasazovat chytré kontrakty. Je běžné, že volání RPC jsou zpracovávána knihovnou jako [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/) nebo uživatelským rozhraním, jako je například peněženka v prohlížeči.

Stručně řečeno, exekuční klient je:

- uživatelskou bránou do Etherea
- domovem pro Ethereum Virtual Machine, stav Etherea a transakční pool.

## Co dělá konsensuální klient? {#consensus-client}

Konsensuální klient se zabývá veškerou logikou, která umožňuje uzlu zůstat synchronizovaný se sítí Ethereum. To zahrnuje přijímání bloků od ostatních uzlů a spouštění algoritmu pro výběr větve, který zajišťuje, že uzel vždy sleduje řetězec s největším počtem atestací (vážených efektivními zůstatky validátorů). Podobně jako exekuční klienti, i konsensuální klienti mají vlastní P2P síť, prostřednictvím které sdílejí bloky a atestace.

Konsensuální klient se nepodílí na atestování nebo navrhování bloků – to dělá validátor, volitelný doplněk konsensuálního klienta. Konsensuální klient bez validátoru pouze sleduje vrchol řetězce, což umožňuje uzlu zůstat synchronizovaný. To umožňuje uživateli provádět transakce v síti Ethereum pomocí svého exekučního klienta s jistotou, že je na správném řetězci.

## Validátoři {#validators}

Staking a spuštění softwaru validátoru činí uzel způsobilým k výběru pro navržení nového bloku. Provozovatelé uzlů mohou přidat validátor ke svým konsensuálním klientům vložením 32 ETH do depozitního kontraktu. Klient validátoru je dodáván v balíku s konsensuálním klientem a může být kdykoli přidán k uzlu. Validátor se stará o atestace a návrhy bloků. Umožňuje také uzlu získávat odměny nebo ztrácet ETH prostřednictvím pokut nebo „slashingu“.

[Více o stakingu](/staking/).

## Porovnání komponent uzlu {#node-comparison}

| Exekuční klient                                                                              | Konsensuální klient                                                                                                                                          | Validátor                               |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| Šíří transakce přes svou P2P síť                                                             | Šíří bloky a atestace přes svou P2P síť                                                                                                                      | Navrhuje bloky                          |
| Provádí/znovu provádí transakce                                                              | Spouští algoritmus pro výběr větve                                                                                                                           | Získává odměny / postihy                |
| Ověřuje příchozí změny stavu                                                                 | Sleduje vrchol řetězce                                                                                                                                       | Vytváří atestace                        |
| Spravuje stavové stromy (trie) a stromy (trie) účtenek | Spravuje stav Beacon Chainu (obsahuje informace o konsensu a provádění)                                                                   | Vyžaduje vsadit 32 ETH. |
| Vytváří exekuční datovou část                                                                | Sleduje nahromaděnou náhodnost v RANDAO (algoritmus, který poskytuje ověřitelnou náhodnost pro výběr validátorů a další operace konsensu) | Může být podroben „slashingu“           |
| Zpřístupňuje JSON-RPC API pro interakci s Ethereem                                           | Sleduje justifikaci a finalizaci                                                                                                                             |                                         |

## Další čtení {#further-reading}

- [Důkaz podílem](/developers/docs/consensus-mechanisms/pos)
- [Návrh bloku](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Odměny a postihy pro validátory](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
