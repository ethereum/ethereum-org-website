---
title: Standard di sviluppo di Ethereum
description: Scopri gli standard di Ethereum, inclusi gli EIP, gli standard dei token come ERC-20 ed ERC-721 e le convenzioni di sviluppo.
lang: it
incomplete: true
---

## Panoramica degli standard {#standards-overview}

La community di Ethereum ha adottato molti standard che aiutano a mantenere i progetti (come i [client di Ethereum](/developers/docs/nodes-and-clients/) e i portafogli) interoperabili tra le implementazioni e a garantire che i contratti intelligenti e le dApp restino componibili.

Generalmente, gli standard vengono introdotti come [Proposte di miglioramento di Ethereum](/eips/) (EIP), che vengono discusse dai membri della comunità attraverso un [processo standard](https://eips.ethereum.org/EIPS/eip-1).

- [Introduzione alle EIP](/eips/)
- [Elenco di EIP](https://eips.ethereum.org/)
- [Repo GitHub degli EIP](https://github.com/ethereum/EIPs)
- [Forum di discussione sugli EIP](https://ethereum-magicians.org/c/eips)
- [Introduzione alla governance di Ethereum](/governance/)
- [Panoramica sulla governance di Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 marzo 2019 - Boris Mann_
- [Governance dello sviluppo del protocollo di Ethereum e coordinamento dell'aggiornamento della rete](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 marzo 2020 - Hudson Jameson_
- [Playlist di tutte le riunioni degli sviluppatori del core di Ethereum](https://www.youtube.com/@EthereumProtocol) _(Playlist di YouTube)_

## Tipi di standard {#types-of-standards}

Esistono 3 tipi di EIP:

- Traccia Standard: descrive qualsiasi modifica che influenzi gran parte o tutte le implementazioni di Ethereum
- [Traccia meta](https://eips.ethereum.org/meta): descrive un processo relativo a Ethereum o propone una modifica a un processo
- [Traccia informativa](https://eips.ethereum.org/informational): descrive un problema di progettazione di Ethereum o fornisce linee guida o informazioni generali alla comunità di Ethereum

Inoltre, la Traccia Standard è suddivisa in 4 categorie:

- [Core](https://eips.ethereum.org/core): miglioramenti che richiedono una biforcazione del consenso
- [Rete](https://eips.ethereum.org/networking): miglioramenti relativi a devp2p e Light Ethereum Subprotocol, nonché miglioramenti proposti alle specifiche del protocollo di rete di whisper e swarm.
- [Interfaccia](https://eips.ethereum.org/interface): miglioramenti relativi alle specifiche e agli standard API/RPC del client e a determinati standard a livello di linguaggio come i nomi dei metodi e le ABI dei contratti.
- [ERC](https://eips.ethereum.org/erc): standard e convenzioni a livello di applicazione

Informazioni più dettagliate su questi diversi tipi e categorie sono disponibili in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Standard dei token {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Un'interfaccia standard per i token fungibili (intercambiabili), come i token di voto, i token di staking o le valute virtuali.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Uno standard di token fungibili che rende il comportamento dei token identico a quello dell'ether e supporta la gestione dei trasferimenti dei token da parte dei destinatari.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Un'interfaccia di estensione per token ERC-20 che supporta l'esecuzione di una richiamata (callback) sui contratti dei destinatari in una singola transazione.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Un'interfaccia standard per i token non fungibili, come un atto di proprietà per un'opera d'arte o una canzone.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Un evento standardizzato emesso durante la creazione/il trasferimento di uno o più token non fungibili usando identificatori di token consecutivi.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Estensione dell'interfaccia per il ruolo di consumatore di EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Aggiunge un ruolo a tempo limitato con autorizzazioni limitate ai token ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(SCONSIGLIATO)** Uno standard di token che migliora l'ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Uno standard di token che può contenere sia asset fungibili che non fungibili.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Uno standard per vault tokenizzati progettato per ottimizzare e unificare i parametri tecnici dei vault che generano rendimento.

Scopri di più sugli [standard dei token](/developers/docs/standards/tokens/).

## Letture consigliate {#further-reading}

- [Proposte di miglioramento di Ethereum (EIP)](/eips/)

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_
