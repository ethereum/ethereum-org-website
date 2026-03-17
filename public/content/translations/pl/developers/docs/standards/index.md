---
title: Standardy rozwoju Ethereum
description: "Dowiedz się o standardach Ethereum takich jak EIP, standardy tokenów jak ERC-20 oraz ERC-721 i konwencjach programistycznych."
lang: pl
incomplete: true
---

## Przegląd standardów {#standards-overview}

Społeczność Ethereum przyjęła wiele standardów, które pomagają utrzymać interoperacyjność projektów (takich jak [klienci Ethereum](/developers/docs/nodes-and-clients/) i portfele) we wszystkich implementacjach oraz zapewniają, że inteligentne kontrakty i dapki pozostają komponowalne.

Zazwyczaj standardy są wprowadzane jako [Propozycje ulepszeń w Ethereum](/eips/) (EIP), które są omawiane przez członków społeczności w ramach [standardowego procesu](https://eips.ethereum.org/EIPS/eip-1).

- [Wprowadzenie do EIP](/eips/)
- [Lista EIP](https://eips.ethereum.org/)
- [Repozytorium GitHub EIP](https://github.com/ethereum/EIPs)
- [Forum dyskusyjne EIP](https://ethereum-magicians.org/c/eips)
- [Wprowadzenie do zarządzania Ethereum](/governance/)
- [Przegląd zarządzania Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 marca 2019 r. - Boris Mann_
- [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 marca 2020 r. - Hudson Jameson_
- [Playlista wszystkich spotkań programistów rdzenia Ethereum](https://www.youtube.com/@EthereumProtocol) _(Playlista YouTube)_

## Rodzaje standardów {#types-of-standards}

Istnieją 3 rodzaje EIP:

- Standardowa ścieżka: opisuje dowolną zmianę, która ma wpływ na większość lub wszystkie implementacje Ethereum
- [Ścieżka meta](https://eips.ethereum.org/meta): opisuje proces związany z Ethereum lub proponuje zmianę procesu
- [Ścieżka informacyjna](https://eips.ethereum.org/informational): opisuje problem projektowy Ethereum lub zapewnia ogólne wytyczne bądź informacje dla społeczności Ethereum

Ponadto, standardowa ścieżka jest podzielona na 4 kategorie:

- [Rdzeniowe](https://eips.ethereum.org/core): ulepszenia wymagające forka konsensusu
- [Sieciowe](https://eips.ethereum.org/networking): ulepszenia dotyczące devp2p i Light Ethereum Subprotocol, a także proponowane ulepszenia specyfikacji protokołów sieciowych Whisper i Swarm.
- [Interfejs](https://eips.ethereum.org/interface): ulepszenia dotyczące specyfikacji i standardów API/RPC klienta oraz określonych standardów na poziomie języka, takich jak nazwy metod i ABI kontraktów.
- [ERC](https://eips.ethereum.org/erc): standardy i konwencje na poziomie aplikacji

Bardziej szczegółowe informacje na temat tych różnych typów i kategorii można znaleźć w [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Standardy tokenów {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) – standardowy interfejs dla tokenów zamiennych (wymienialnych), takich jak tokeny do głosowania, tokeny stakingowe lub wirtualne waluty.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) – standard tokenów zamiennych, który sprawia, że tokeny zachowują się identycznie jak ether i obsługuje przetwarzanie transferów tokenów po stronie odbiorcy.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) – rozszerzenie interfejsu dla tokenów ERC-20, które obsługuje wykonywanie wywołań zwrotnych (callback) w kontraktach odbiorców w ramach jednej transakcji.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) – standardowy interfejs dla tokenów niezamiennych, takich jak akt własności dzieła sztuki lub piosenki.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) – standaryzowane zdarzenie emitowane podczas tworzenia/przenoszenia jednego lub wielu tokenów niezamiennych przy użyciu kolejnych identyfikatorów tokenów.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) – rozszerzenie interfejsu dla roli konsumenta EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) – dodaje ograniczoną czasowo rolę z ograniczonymi uprawnieniami do tokenów ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) – **(NIEZALECANY)** standard tokenu stanowiący ulepszenie ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) – standard tokenów, który może zawierać zarówno zamienne, jak i niezamienne aktywa.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) – standard tokenizowanych skarbców zaprojektowany w celu optymalizacji i ujednolicenia parametrów technicznych skarbców przynoszących zyski.

Dowiedz się więcej o [standardach tokenów](/developers/docs/standards/tokens/).

## Dalsza lektura {#further-reading}

- [Propozycje ulepszeń w Ethereum (EIP)](/eips/)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_
