---
title: Ethereum-Entwicklungsstandards
description: Erfahre mehr über Ethereum-Standards, einschließlich EIPs, Token-Standards wie ERC-20 und ERC-721 sowie Entwicklungskonventionen.
lang: de
incomplete: true
---

## Übersicht der Standards {#standards-overview}

Die Ethereum-Community hat viele Standards übernommen, die dabei helfen, Projekte (wie [Ethereum-Clients](/developers/docs/nodes-and-clients/) und Wallets) über Implementierungen hinweg interoperabel zu halten und sicherzustellen, dass Smart Contracts und Dezentrale Anwendungen (Dapps) zusammensetzbar bleiben.

Typischerweise werden Standards als [Ethereum Improvement Proposals](/eips/) (EIPs) eingeführt, die von Community-Mitgliedern in einem [Standardprozess](https://eips.ethereum.org/EIPS/eip-1) diskutiert werden.

- [Einführung in EIPs](/eips/)
- [Liste der EIPs](https://eips.ethereum.org/)
- [EIP-GitHub-Repository](https://github.com/ethereum/EIPs)
- [EIP-Diskussionsforum](https://ethereum-magicians.org/c/eips)
- [Einführung in die Ethereum-Governance](/governance/)
- [Übersicht der Ethereum-Governance](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31. März 2019 – Boris Mann_
- [Governance der Ethereum-Protokollentwicklung und Koordination von Netzwerk-Upgrades](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23. März 2020 – Hudson Jameson_
- [Playlist aller Ethereum Core Dev Meetings](https://www.youtube.com/@EthereumProtocol) _(YouTube-Playlist)_

## Arten von Standards {#types-of-standards}

Es gibt 3 Arten von EIPs:

- Standards Track: beschreibt jede Änderung, die die meisten oder alle Ethereum-Implementierungen betrifft
- [Meta Track](https://eips.ethereum.org/meta): beschreibt einen Prozess rund um Ethereum oder schlägt eine Änderung an einem Prozess vor
- [Informational Track](https://eips.ethereum.org/informational): beschreibt ein Ethereum-Designproblem oder bietet allgemeine Richtlinien oder Informationen für die Ethereum-Community

Darüber hinaus ist der Standard Track in 4 Kategorien unterteilt:

- [Core](https://eips.ethereum.org/core): Verbesserungen, die einen Konsens-Fork erfordern
- [Networking](https://eips.ethereum.org/networking): Verbesserungen rund um devp2p und das Light Ethereum Subprotocol sowie vorgeschlagene Verbesserungen an den Netzwerkprotokollspezifikationen von Whisper und Swarm.
- [Interface](https://eips.ethereum.org/interface): Verbesserungen rund um Client-API/RPC-Spezifikationen und -Standards sowie bestimmte Standards auf Sprachebene wie Methodennamen und Vertrags-ABIs.
- [ERC](https://eips.ethereum.org/erc): Standards und Konventionen auf Anwendungsebene

Detailliertere Informationen zu diesen verschiedenen Arten und Kategorien findest du in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types).

### Token-Standards {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) – Eine Standardschnittstelle für fungible (austauschbare) Token, wie Abstimmungs-Token, Staking-Token oder virtuelle Währungen.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) – Ein Standard für fungible Token, der dafür sorgt, dass sich Token identisch zu Ether verhalten, und die Handhabung von Token-Transfers auf Empfängerseite unterstützt.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) – Eine Erweiterungsschnittstelle für ERC-20-Token, die die Ausführung von Callbacks bei Empfängerverträgen in einer einzigen Transaktion unterstützt.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) – Eine Standardschnittstelle für nicht-fungible Token, wie eine Urkunde für ein Kunstwerk oder einen Song.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) – Ein standardisiertes Ereignis, das beim Erstellen/Übertragen eines oder mehrerer nicht-fungibler Token unter Verwendung fortlaufender Token-Identifikatoren ausgegeben wird.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) – Schnittstellenerweiterung für die EIP-721-Verbraucherrolle.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) – Fügt ERC-721-Token eine zeitlich begrenzte Rolle mit eingeschränkten Berechtigungen hinzu.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) – **(NICHT EMPFOHLEN)** Ein Token-Standard, der ERC-20 verbessert.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) – Ein Token-Standard, der sowohl fungible als auch nicht-fungible Vermögenswerte enthalten kann.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) – Ein Standard für tokenisierte Tresore, der entwickelt wurde, um die technischen Parameter von renditebringenden Tresoren zu optimieren und zu vereinheitlichen.

Erfahre mehr über [Token-Standards](/developers/docs/standards/tokens/).

## Weiterführende Literatur {#further-reading}

- [Ethereum Improvement Proposals (EIPs)](/eips/)

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_