---
title: Vývojové standardy Etherea
description: Seznamte se se standardy Etherea, včetně EIP, tokenových standardů jako ERC-20 a ERC-721 a vývojových konvencí.
lang: cs
incomplete: true
---

## Přehled standardů {#standards-overview}

Komunita Etherea přijala mnoho standardů, které pomáhají udržovat projekty (jako jsou [klienti Etherea](/developers/docs/nodes-and-clients/) a peněženky) interoperabilní napříč implementacemi a zajišťují, že chytré kontrakty a dapps zůstávají skládatelné.

Standardy jsou obvykle zaváděny jako [Návrhy na vylepšení Etherea (EIP)](/eips/), které jsou projednávány členy komunity prostřednictvím [standardního procesu](https://eips.ethereum.org/EIPS/eip-1).

- [Úvod do EIP](/eips/)
- [Seznam EIP](https://eips.ethereum.org/)
- [GitHub repozitář EIP](https://github.com/ethereum/EIPs)
- [Diskusní fórum o EIP](https://ethereum-magicians.org/c/eips)
- [Úvod do správy Etherea](/governance/)
- [Přehled správy Etherea](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31. března 2019 - Boris Mann_
- [Správa vývoje protokolu Ethereum a koordinace upgradu sítě](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23. března 2020 - Hudson Jameson_
- [Playlist všech schůzek vývojářů jádra Etherea](https://www.youtube.com/@EthereumProtocol) _(Playlist na YouTube)_

## Typy standardů {#types-of-standards}

Existují 3 typy EIP:

- Standardizační stopa: popisuje jakoukoli změnu, která ovlivňuje většinu nebo všechny implementace Etherea
- [Meta stopa](https://eips.ethereum.org/meta): popisuje proces týkající se Etherea nebo navrhuje změnu procesu
- [Informační stopa](https://eips.ethereum.org/informational): popisuje problém v návrhu Etherea nebo poskytuje obecné pokyny či informace komunitě Etherea

Dále se standardizační stopa dělí do 4 kategorií:

- [Jádro](https://eips.ethereum.org/core): vylepšení vyžadující větev konsensu
- [Síť](https://eips.ethereum.org/networking): vylepšení týkající se devp2p a Light Ethereum Subprotocol, jakož i navrhovaná vylepšení specifikací síťových protokolů Whisper a Swarm.
- [Rozhraní](https://eips.ethereum.org/interface): vylepšení specifikací a standardů klientského API/RPC a určitých standardů na úrovni jazyka, jako jsou názvy metod a ABI kontraktů.
- [ERC](https://eips.ethereum.org/erc): standardy a konvence na úrovni aplikace

Podrobnější informace o těchto různých typech a kategoriích naleznete v [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Tokenové standardy {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) – standardní rozhraní pro zaměnitelné (fungible) tokeny, jako jsou hlasovací tokeny, stakovací tokeny nebo virtuální měny.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Standard zaměnitelných tokenů, díky kterému se tokeny chovají stejně jako ether a který podporuje zpracování přenosů tokenů na straně příjemce.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Rozšiřující rozhraní pro tokeny ERC-20, které podporuje provádění zpětného volání (callback) na kontraktech příjemce v jediné transakci.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) – standardní rozhraní pro nezaměnitelné tokeny, jako je listina k uměleckému dílu nebo písni.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Standardizovaná událost emitovaná při vytváření/převodu jednoho nebo více nezaměnitelných tokenů s použitím po sobě jdoucích identifikátorů tokenů.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Rozšíření rozhraní pro roli spotřebitele EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Přidává časově omezenou roli s omezenými oprávněními k tokenům ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NEDOPORUČUJE SE)** Tokenový standard, který vylepšuje ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) – tokenový standard, který může obsahovat jak zaměnitelná, tak nezaměnitelná aktiva.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Standard pro tokenizované trezory navržený pro optimalizaci a sjednocení technických parametrů trezorů nesoucích výnos.

Zjistěte více o [tokenových standardech](/developers/docs/standards/tokens/).

## Další čtení {#further-reading}

- [Návrhy na vylepšení Etherea (EIP)](/eips/)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
