---
title: Sidechain
description: Un'introduzione alle sidechain come soluzione di scalabilità, attualmente utilizzate dalla comunità Ethereum.
lang: it
incomplete: true
sidebarDepth: 3
---

Una sidechain è una blockchain separata che viene eseguita parallelamente alla rete principale di Ethereum e funziona in modo indipendente. Ha un proprio [algoritmo di consenso](/developers/docs/consensus-mechanisms/) (ad esempio [Proof of Authority](https://wikipedia.org/wiki/Proof_of_authority), [Proof Of Stake delegato](https://en.bitcoinwiki.org/wiki/DPoS), [Tolleranza ai Guasti Bizantini](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained) e così via). È collegata alla rete principale da un ponte bidirezionale.

Ciò che rende una sidechain particolarmente eccitante è che la catena funziona come la catena principale di Ethereum perché è basata su [EVM](/developers/docs/evm/). Non usa Ethereum: è Ethereum. Ciò significa che, se vuoi usare la tua [dApp](/developers/docs/dapps/) su una sidechain, è sufficiente distribuire il tuo codice su questa sidechain. Assomiglia e funziona proprio come la rete principale: scrivi i contratti in Solidity e interagisci con la catena tramite l'API Web3.

## Prerequisiti {#prerequisites}

Dovresti avere una buona comprensione di tutti gli argomenti fondamentali ed una comprensione di alto livello della [scalabilità di Ethereum](/developers/docs/scaling/).

## Pro e contro {#pros-and-cons}

| Pro                                                    | Contro                                                                                                    |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Tecnologia consolidata.                                | Meno decentralizzata.                                                                                     |
| Supporta il calcolo generale, compatibilità con l'EVM. | Usa un meccanismo di consenso separato. Non protetta dal livello 1 (quindi tecnicamente non è livello 2). |
|                                                        | Un quorum di validatori della sidechain può commettere frodi.                                             |

### Usare la sidechain {#use-sidechains}

Diversi progetti forniscono implementazioni di sidechain che puoi integrare nelle tue dApp:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (in precedenza xDai)](https://www.xdaichain.com/)

## Letture consigliate {#further-reading}

- [EthHub sulle sidechain](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_
