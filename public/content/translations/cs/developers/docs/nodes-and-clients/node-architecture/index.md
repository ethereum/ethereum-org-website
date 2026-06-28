---
title: Architektura uzlu
description: "Úvod do toho, jak jsou organizovány uzly Etherea."
lang: cs
---

Uzel Etherea se skládá ze dvou klientů: [exekučního klienta](/developers/docs/nodes-and-clients/#execution-clients) a [konsensuálního klienta](/developers/docs/nodes-and-clients/#consensus-clients). Aby mohl uzel navrhnout nový blok, musí také provozovat [klienta validátoru](#validators).

Když Ethereum používalo [důkaz prací (PoW)](/developers/docs/consensus-mechanisms/pow/), k provozování plného uzlu Etherea stačil exekuční klient. Od implementace [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/) však musí být exekuční klient používán společně s dalším softwarem zvaným [konsensuální klient](/developers/docs/nodes-and-clients/#consensus-clients).

Níže uvedený diagram ukazuje vztah mezi těmito dvěma klienty Etherea. Oba klienti se připojují ke svým vlastním peer-to-peer (P2P) sítím. Oddělené P2P sítě jsou potřeba, protože exekuční klienti šíří transakce přes svou P2P síť, což jim umožňuje spravovat jejich lokální transakční pool, zatímco konsensuální klienti šíří bloky přes svou P2P síť, což umožňuje konsensus a růst řetězce.

![Diagram of Ethereum node architecture showing execution and consensus layers](node-architecture-text-background.png)

_Existuje několik možností pro exekučního klienta, včetně Erigon, Nethermind a Besu_.

Aby tato dvouklientová struktura fungovala, musí konsensuální klienti předávat balíčky transakcí exekučnímu klientovi. Exekuční klient provádí transakce lokálně, aby ověřil, že neporušují žádná pravidla Etherea a že navrhovaná aktualizace stavu Etherea je správná. Když je uzel vybrán jako producent bloku, jeho instance konsensuálního klienta si vyžádá balíčky transakcí od exekučního klienta, aby je zahrnula do nového bloku a provedla je za účelem aktualizace globálního stavu. Konsensuální klient řídí exekučního klienta prostřednictvím lokálního RPC připojení pomocí [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Co dělá exekuční klient? {#execution-client}

Exekuční klient je zodpovědný za validaci, zpracování a šíření transakcí, spolu se správou stavu a podporou virtuálního stroje Etherea ([EVM](/developers/docs/evm/)). **Není** zodpovědný za vytváření bloků, šíření bloků ani za zpracování logiky konsensu. Tyto úkoly spadají do kompetence konsensuálního klienta.

Exekuční klient vytváří exekuční payloady – seznam transakcí, aktualizovanou stavovou trii a další data související s exekucí. Konsensuální klienti zahrnují exekuční payload do každého bloku. Exekuční klient je také zodpovědný za opětovné provedení transakcí v nových blocích, aby se ujistil, že jsou platné. Provádění transakcí probíhá na vestavěném počítači exekučního klienta, známém jako [virtuální stroj Etherea (EVM)](/developers/docs/evm).

Exekuční klient také nabízí uživatelské rozhraní k Ethereu prostřednictvím [RPC metod](/developers/docs/apis/json-rpc), které uživatelům umožňují dotazovat se na blockchain Etherea, odesílat transakce a nasazovat chytré kontrakty. Je běžné, že RPC volání jsou zpracovávána knihovnou jako [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/), nebo uživatelským rozhraním, jako je peněženka v prohlížeči.

Stručně řečeno, exekuční klient je:

- uživatelská brána k Ethereu
- domov pro virtuální stroj Etherea, stav Etherea a transakční pool.

## Co dělá konsensuální klient? {#consensus-client}

Konsensuální klient se zabývá veškerou logikou, která umožňuje uzlu zůstat synchronizovaný se sítí Ethereum. To zahrnuje přijímání bloků od peerů a spouštění algoritmu volby forku, aby se zajistilo, že uzel vždy sleduje řetězec s největší akumulací atestací (váženo efektivními zůstatky validátorů). Podobně jako exekuční klient mají konsensuální klienti svou vlastní P2P síť, jejímž prostřednictvím sdílejí bloky a atestace.

Konsensuální klient se nepodílí na atestování ani navrhování bloků – to dělá validátor, volitelný doplněk konsensuálního klienta. Konsensuální klient bez validátoru pouze udržuje krok s vrcholem řetězce, což umožňuje uzlu zůstat synchronizovaný. To umožňuje uživateli provádět transakce s Ethereem pomocí svého exekučního klienta s jistotou, že se nachází na správném řetězci.

## Validátory {#validators}

Staking a provozování softwaru validátoru činí uzel způsobilým k tomu, aby byl vybrán k návrhu nového bloku. Operátoři uzlů mohou přidat validátor ke svým konsensuálním klientům vložením 32 ETH do depozitního kontraktu. Klient validátoru je dodáván v balíčku s konsensuálním klientem a může být k uzlu přidán kdykoli. Validátor zpracovává atestace a návrhy bloků. Umožňuje také uzlu shromažďovat odměny nebo ztrácet ETH prostřednictvím pokut nebo penalizace.

[Více o stakingu](/staking/).

## Porovnání komponent uzlu {#node-comparison}

| Exekuční klient | Konsensuální klient | Validátor |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Šíří transakce přes svou P2P síť | Šíří bloky a atestace přes svou P2P síť | Navrhuje bloky |
| Provádí/znovu provádí transakce | Spouští algoritmus volby forku | Shromažďuje odměny/pokuty |
| Ověřuje příchozí změny stavu | Sleduje vrchol řetězce | Provádí atestace |
| Spravuje stavové trie a trie účtenek | Spravuje stav Beaconu (obsahuje informace o konsensu a exekuci) | Vyžaduje stake 32 ETH |
| Vytváří exekuční payload | Sleduje akumulovanou náhodnost v RANDAO (algoritmus, který poskytuje ověřitelnou náhodnost pro výběr validátorů a další operace konsensu) | Může být penalizován |
| Zpřístupňuje JSON-RPC API pro interakci s Ethereem | Sleduje justifikaci a finalizaci | |

## Další čtení {#further-reading}

- [Důkaz podílem (PoS)](/developers/docs/consensus-mechanisms/pos)
- [Návrh bloku](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Odměny a pokuty validátorů](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)