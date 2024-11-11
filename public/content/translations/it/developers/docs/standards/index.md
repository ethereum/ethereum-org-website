---
title: Standard di sviluppo di Ethereum
description:
lang: it
incomplete: true
---

## Panoramica degli standard {#standards-overview}

La community di Ethereum ha adottato molti standard che aiutano a mantenere interoperabili i progetti (come i [client di Ethereum](/developers/docs/nodes-and-clients/) e i portafogli) tra le implementazioni e ad assicurarsi che i contratti intelligenti e le dapp restino componibili.

Normalmente, gli standard vengono introdotti come [proposte di miglioramento di Ethereum](/eips/) (EIP) che vengono discusse dai membri della community attraverso un [processo standard](https://eips.ethereum.org/EIPS/eip-1).

- [Introduzione alle EIP](/eips/)
- [Elenco delle EIP](https://eips.ethereum.org/)
- [Repo di GitHub delle EIP](https://github.com/ethereum/EIPs)
- [Forum di discussione per le EIP](https://ethereum-magicians.org/c/eips)
- [Introduzione alla Governance di Ethereum](/governance/)
- [Ethereum Governance Overview](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _March 31, 2019 - Boris Mann_
- [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _March 23, 2020 - Hudson Jameson_
- [Playlist di tutti gli incontri di Core Dev di Ethereum](https://www.youtube.com/@EthereumProtocol) _(Playlist di YouTube)_

## Tipi di standard {#types-of-standards}

Esistono 3 tipi di EIP:

- Traccia Standard: descrive qualsiasi modifica che influenzi gran parte o tutte le implementazioni di Ethereum
- [Meta-Traccia](https://eips.ethereum.org/meta): descrive un processo circostante Ethereum o propone una modifica a un processo
- [Traccia Informativa](https://eips.ethereum.org/informational): descrive un problema di design di Ethereum o fornisce linee guida o informazioni generali alla community di Ethereum

Inoltre, la Traccia Standard è suddivisa in 4 categorie:

- [Principale](https://eips.ethereum.org/core): miglioramenti che richiedono una diramazione del consenso
- [Rete](https://eips.ethereum.org/networking): miglioramenti relativi a devp2p e al protocollo secondario Ethereum leggero, nonché miglioramenti proposti alle specifiche del protocollo di rete di Whisper e Swarm.
- [Interfaccia](https://eips.ethereum.org/interface): miglioramenti relativi alle specifiche e agli standard API/RPC del client e certi standard di livello linguistico come i nomi dei metodi e le ABI del contratto.
- [ERC](https://eips.ethereum.org/erc): standard e convenzioni a livello delle applicazioni

Informazioni più dettagliate su questi diversi tipi e categorie sono disponibili in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Standard per i token {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Un'interfaccia standard per token fungibili (intercambiabili), come i token di voto, i token di staking o le valute virtuali.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Uno standard di token fungibili che fa comportare i token in modo identico all'ether e supporta la gestione dei trasferimenti di token dal lato dei destinatari.
  - [ERC-1363](https://eips.ethereum.org/EIPS/eip-1363) - Definisce un'interfaccia token per i token ERC-20 che supporta l'esecuzione del codice del destinatario dopo il codice transfer o transferFrom o spender dopo l'approvazione.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Un'interfaccia standard per token non fungibili, come un atto relativo a opere d'arte o canzoni.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Un evento standardizzato emesso quando si creano/trasferiscono uno o molti token non fungibili utilizzando identificatori di token consecutivi.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Estensione dell'interfaccia per il ruolo dei consumatori EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Aggiungere un ruolo limitato nel tempo e con permessi limitati ai token ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(SCONSIGLIATO)** Uno standard token migliorato rispetto a ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Uno standard per i token che può contenere risorse sia fungibili che non fungibili.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Uno standard di cassaforte tokenizzata progettato per ottimizzare e unificare i parametri tecnici delle cassaforti di resa.

Maggiori informazioni sugli [standard peri token](/developers/docs/standards/tokens/).

## Letture consigliate {#further-reading}

- [Proposte di miglioramento di Ethereum (EIP)](/eips/)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_
