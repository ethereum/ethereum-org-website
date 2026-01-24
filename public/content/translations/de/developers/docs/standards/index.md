---
title: Ethereum-Entwicklungsstandards
description: Informieren Sie sich über Ethereum Standards, einschließlich EIPs, Token Standards wie ERC-20 und ERC-721 sowie Entwicklungskonventionen.
lang: de
incomplete: true
---

## Standardübersicht {#standards-overview}

Die Ethereum-Community hat viele Standards angenommen, die dazu beitragen, Projekte (wie [Ethereum-Clients](/developers/docs/nodes-and-clients/) und Wallets) über Implementierungen hinweg interoperabel zu halten und sicherzustellen, dass Smart Contracts und Dapps kombinierbar bleiben.

Normalerweise werden Standards als [Ethereum-Verbesserungsvorschläge](/eips/) (EIPs) eingeführt, die von Community-Mitgliedern in einem [Standardverfahren](https://eips.ethereum.org/EIPS/eip-1) diskutiert werden.

- [Einführung in EIPs](/eips/)
- [Liste der EIPs](https://eips.ethereum.org/)
- [EIP-GitHub-Repo](https://github.com/ethereum/EIPs)
- [EIP-Diskussionsforum](https://ethereum-magicians.org/c/eips)
- [Einführung in die Ethereum-Governance](/governance/)
- [Überblick über die Ethereum-Governance](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31. März 2019 – Boris Mann_
- [Governance der Ethereum-Protokollentwicklung und Koordination von Netzwerk-Upgrades](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23. März 2020 – Hudson Jameson_
- [Playlist aller Ethereum-Core-Dev-Meetings](https://www.youtube.com/@EthereumProtocol) _(YouTube-Playlist)_

## Arten von Standards {#types-of-standards}

Es gibt 3 Arten von EIPs:

- Standards Track: beschreibt jede Änderung, die die meisten oder alle Ethereum-Implementierungen betrifft
- [Meta Track](https://eips.ethereum.org/meta): beschreibt einen Prozess rund um Ethereum oder schlägt eine Änderung an einem Prozess vor
- [Informational Track](https://eips.ethereum.org/informational): beschreibt ein Ethereum-Designproblem oder stellt der Ethereum-Community allgemeine Richtlinien oder Informationen zur Verfügung

Darüber hinaus ist der Standard Track in 4 Kategorien unterteilt:

- [Core](https://eips.ethereum.org/core): Verbesserungen, die einen Konsens-Fork erfordern
- [Networking](https://eips.ethereum.org/networking): Verbesserungen rund um devp2p und das Light Ethereum Subprotocol sowie vorgeschlagene Verbesserungen der Netzwerkprotokollspezifikationen von Whisper und Swarm.
- [Interface](https://eips.ethereum.org/interface): Verbesserungen rund um Client-API/RPC-Spezifikationen und -Standards sowie bestimmte sprachliche Standards wie Methodennamen und Vertrags-ABIs.
- [ERC](https://eips.ethereum.org/erc): Standards und Konventionen auf Anwendungsebene

Ausführlichere Informationen zu diesen verschiedenen Typen und Kategorien finden Sie in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Token-Standards {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) – Eine Standardschnittstelle für fungible (austauschbare) Tokens, wie Abstimmungstokens, Staking-Tokens oder virtuelle Währungen.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) – Ein Standard für fungible Tokens, durch den sich Tokens identisch zu Ether verhalten und der die Handhabung von Token-Übertragungen auf der Empfängerseite unterstützt.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) – Eine Erweiterungsschnittstelle für ERC-20-Tokens, die die Ausführung von Callbacks auf Empfängerverträgen in einer einzigen Transaktion unterstützt.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) – Eine Standardschnittstelle für nicht-fungible Tokens, wie eine Urkunde für ein Kunstwerk oder ein Lied.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) – Ein standardisiertes Ereignis, das beim Erstellen/Übertragen eines oder mehrerer nicht-fungibler Tokens unter Verwendung aufeinanderfolgender Token-Kennungen ausgelöst wird.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) – Schnittstellenerweiterung für die EIP-721-Verbraucherrolle.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) – Hinzufügen einer zeitlich begrenzten Rolle mit eingeschränkten Berechtigungen zu ERC-721-Tokens.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) – **(NICHT EMPFOHLEN)** Ein Token-Standard, der eine Verbesserung gegenüber ERC-20 darstellt.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) – Ein Token-Standard, der sowohl fungible als auch nicht-fungible Vermögenswerte enthalten kann.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) – Ein tokenisierter Vault-Standard, der entwickelt wurde, um die technischen Parameter von renditetragenden Vaults zu optimieren und zu vereinheitlichen.

Erfahren Sie mehr über [Token-Standards](/developers/docs/standards/tokens/).

## Weiterführende Lektüre {#further-reading}

- [Ethereum-Verbesserungsvorschläge (EIPs)](/eips/)

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
