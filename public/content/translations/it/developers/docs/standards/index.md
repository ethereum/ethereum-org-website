---
title: Standard di sviluppo di Ethereum
description: Scopri gli standard di Ethereum, inclusi gli EIP, gli standard dei token come ERC-20 ed ERC-721 e le convenzioni di sviluppo.
lang: it
incomplete: true
---

## Panoramica sugli standard {#standards-overview}

La community di Ethereum ha adottato molti standard che aiutano a mantenere i progetti (come i [client di Ethereum](/developers/docs/nodes-and-clients/) e i portafogli) interoperabili tra le implementazioni e assicurano che i contratti intelligenti e le dApp rimangano componibili.

In genere, gli standard vengono introdotti come [Proposte di miglioramento di Ethereum](/eips/) (EIP), che vengono discusse dai membri della community attraverso un [processo standard](https://eips.ethereum.org/EIPS/eip-1).

- [Introduzione agli EIP](/eips/)
- [Elenco degli EIP](https://eips.ethereum.org/)
- [Repository GitHub degli EIP](https://github.com/ethereum/EIPs)
- [Forum di discussione degli EIP](https://ethereum-magicians.org/c/eips)
- [Introduzione alla governance di Ethereum](/governance/)
- [Panoramica sulla governance di Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 marzo 2019 - Boris Mann_
- [Governance dello sviluppo del protocollo di Ethereum e coordinamento degli aggiornamenti di rete](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 marzo 2020 - Hudson Jameson_
- [Playlist di tutte le riunioni dei Core Dev di Ethereum](https://www.youtube.com/@EthereumProtocol) _(Playlist di YouTube)_

## Tipi di standard {#types-of-standards}

Esistono 3 tipi di EIP:

- Standards Track: descrive qualsiasi modifica che influisce sulla maggior parte o su tutte le implementazioni di Ethereum
- [Meta Track](https://eips.ethereum.org/meta): descrive un processo relativo a Ethereum o propone una modifica a un processo
- [Informational Track](https://eips.ethereum.org/informational): descrive un problema di progettazione di Ethereum o fornisce linee guida generali o informazioni alla community di Ethereum

Inoltre, lo Standards Track è suddiviso in 4 categorie:

- [Core](https://eips.ethereum.org/core): miglioramenti che richiedono una biforcazione del consenso
- [Networking](https://eips.ethereum.org/networking): miglioramenti relativi a devp2p e al Light Ethereum Subprotocol, nonché proposte di miglioramento alle specifiche del protocollo di rete di whisper e swarm.
- [Interface](https://eips.ethereum.org/interface): miglioramenti relativi alle specifiche e agli standard API/RPC dei client e ad alcuni standard a livello di linguaggio come i nomi dei metodi e le ABI dei contratti.
- [ERC](https://eips.ethereum.org/erc): standard e convenzioni a livello di applicazione

Informazioni più dettagliate su questi diversi tipi e categorie sono disponibili nell'[EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Standard dei token {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Un'interfaccia standard per i token fungibili (intercambiabili), come i token di voto, i token di staking o le valute virtuali.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Uno standard per i token fungibili che fa sì che i token si comportino in modo identico agli ether e supporta la gestione dei trasferimenti di token dal lato dei destinatari.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Un'interfaccia di estensione per i token ERC-20 che supporta l'esecuzione di callback sui contratti destinatari in una singola transazione.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Un'interfaccia standard per i token non fungibili, come un atto di proprietà per un'opera d'arte o una canzone.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Un evento standardizzato emesso durante la creazione/trasferimento di uno o più token non fungibili utilizzando identificatori di token consecutivi.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Estensione dell'interfaccia per il ruolo di consumatore EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Aggiunge un ruolo limitato nel tempo con permessi ristretti ai token ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NON CONSIGLIATO)** Uno standard di token che migliora l'ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Uno standard di token che può contenere sia asset fungibili che non fungibili.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Uno standard per i vault tokenizzati progettato per ottimizzare e unificare i parametri tecnici dei vault fruttiferi.

Scopri di più sugli [standard dei token](/developers/docs/standards/tokens/).

## Letture consigliate {#further-reading}

- [Proposte di miglioramento di Ethereum (EIP)](/eips/)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_