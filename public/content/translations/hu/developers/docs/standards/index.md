---
title: Ethereum fejlesztési szabványok
description:
lang: hu
incomplete: true
---

## Szabványok áttekintése {#standards-overview}

Az Ethereum közösség sok szabványt vezetett be, hogy a projektek (mint az [Ethereum kliensek](/developers/docs/nodes-and-clients/) és tárcák) interoperábilisek maradjanak különböző megvalósításokban, és biztosítsák, hogy az okosszerződések és a dappok összeilleszthetőek maradnak.

Általában a szabványok [Ethereum-fejlesztési javaslatokként](/eips/) (EIP) kerülnek bevezetésre, melyeket a közösség tagjai vitatnak meg egy [sztenderd folyamat](https://eips.ethereum.org/EIPS/eip-1) során.

- [Bevezetés az EIP-kbe](/eips/)
- [EIP-k listája](https://eips.ethereum.org/)
- [EIP GitHub mappa](https://github.com/ethereum/EIPs)
- [EIP vitafórum](https://ethereum-magicians.org/c/eips)
- [Bevezetés az Ethereum irányításába](/governance/)
- [Az Ethereum irányításának áttekintése](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _2019. március 31., Boris Mann_
- [Ethereum protokollfejlesztés-irányítás és hálózatfrissítés-koordináció](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _2020. március 23., Hudson Jameson_
- [Lejátszási lista az Ethereum protokollfejlesztőinek megbeszéléseiről](https://www.youtube.com/@EthereumProtocol) _(YouTube lejátszási lista)_

## Szabványtípusok {#types-of-standards}

Az EIP-k 3 típusa:

- Szabványok listája: minden olyan változást leír, amely a legtöbb vagy az összes Ethereum-implementációt érinti
- [Meta lista](https://eips.ethereum.org/meta): egy Ethereumhoz kapcsolódó folyamat leírása, vagy javaslat egy folyamat megváltoztatására
- [Információs lista](https://eips.ethereum.org/informational): egy Ethereum-tervezési problémát ír le, vagy általános iránymutatásokat nyújt az Ethereum közössége számára

A szabványok listáját 4 kategóriára lehet felosztani:

- [Központi](https://eips.ethereum.org/core): konszenzuselágazást igénylő fejlesztések
- [Hálózat](https://eips.ethereum.org/networking): fejlesztések a devp2p és a Light Ethereum alprotokoll körül, valamint javasolt fejlesztések a whisper és a swarm hálózati protokollspecifikációkhoz.
- [Interfész](https://eips.ethereum.org/interface): fejlesztések az ügyfél API/RPC specifikációk és szabványok, valamint bizonyos nyelvi szintű szabványok, például a metódusnevek és a szerződés ABI-k körül.
- [ERC](https://eips.ethereum.org/erc): alkalmazási szintű szabványok és konvenciók

A különböző típusokról és kategóriákról részletesebb információ az [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types) dokumentumban található

### Token szabványok {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) – Egy sztenderd interfész a helyettesíthető (cserélhető) tokenekhez, például a szavazási és letéti tokenekhez vagy a virtuális valutákhoz.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Egy helyettesíthető tokenszabvány, melynek révén a tokenek az etherrel azonosan működnek, és támogatja a tokenküldés kezelését a fogadó oldalán.
  - [ERC-1363](https://eips.ethereum.org/EIPS/eip-1363) – Egy tokeninterfészt határoz meg az ERC-20 tokenek számára, amely támogatja a címzett kód végrehajtását a transfer vagy transferFrom után, illetve a feladó kódját a jóváhagyás után.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) – Egy sztenderd interfész a nem helyettesíthető tokenekhez, például egy műalkotásról szóló okirathoz vagy egy dalhoz.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) – Egy szabványosított esemény, amelyet egy vagy több, egymást követő tokenazonosítókat használó, nem helyettesítő token létrehozásakor/átadásakor bocsátanak ki.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) – Az EIP-721 fogyasztói szerepkör interfészbővítése.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) – Korlátozott jogosultságú, időben korlátozott szerepkör hozzáadása az ERC-721 tokenekhez.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) – **(NEM AJÁNLOTT)** Az ERC-20-hoz képest továbbfejlesztett tokenszabvány.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) – Olyan tokenszabvány, amely egyaránt tartalmazhat helyettesíthető és nem helyettesíthető eszközöket.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) – A tokenizált trezorok technikai paramétereinek optimalizálására és egységesítésére tervezett tokenizált trezorszabvány.

Tudjon meg többet a [tokenszabványokról](/developers/docs/standards/tokens/).

## További olvasnivaló {#further-reading}

- [Ethereum Fejlesztési Javaslatok (EIP-k)](/eips/)

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_
