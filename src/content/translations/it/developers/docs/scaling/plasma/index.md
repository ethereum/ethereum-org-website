---
title: Catene plasma
description: Un'introduzione alle catene plasma come soluzione di scalabilità, attualmente utilizzata dalla comunità Ethereum.
lang: it
incomplete: true
sidebarDepth: 3
---

Una catena plasma è una blockchain separata ancorata alla catena principale di Ethereum, che utilizza le prove di frode (come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/)) per arbitrare le dispute. Queste catene sono talvolta denominate catene "figlie", poiché sono essenzialmente delle copie più piccole della rete principale di Ethereum. Gli alberi di Merkle consentono la creazione di una pila illimitata di queste catene, che può aiutare a scaricare la larghezza di banda dalle catene principali (inclusa la rete principale). Da questi deriva la loro sicurezza attraverso [le prove di frode](/glossary/#fraud-proof), ed ogni catena figlia ha un proprio meccanismo per la convalida dei blocchi.

## Prerequisiti {#prerequisites}

Dovresti avere una buona comprensione di tutti gli argomenti fondamentali ed una comprensione di alto livello della [scalabilità di Ethereum](/developers/docs/scaling/). L'implementazione di soluzioni di scalabilità, come Plasma, è un argomento avanzato in quanto la tecnologia è meno testata nel campo e continua ad essere oggetto di ricerca e sviluppo.

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                           | Contro                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Volumi elevati, basso costo per transazione.                                                                                  | Non supporta il calcolo generale. Solo trasferimenti di base di token, scambi e pochi altri tipi di transazione sono supportati tramite logica dei predicati.                                                          |
| Ottima per transazioni tra utenti arbitrari (non c'è sovraccarico per coppia di utenti se entrambi sono sulla catena plasma). | Necessità di monitorare la rete periodicamente (requisito di liveness) o delegare la responsabilità a qualcun altro per garantire la sicurezza dei fondi.                                                              |
|                                                                                                                               | Fa affidamento ad uno o più operatori per archiviare i dati e fornirli su richiesta.                                                                                                                                   |
|                                                                                                                               | I prelievi sono ritardati di diversi giorni per consentire eventuali contestazioni. Per gli attivi fungibili, questo aspetto può essere mitigato da fornitori di liquidità, ma è sempre presente un costo di capitale. |

### Usare Plasma {#use-plasma}

Diversi progetti forniscono implementazioni di Plasma che puoi integrare nelle tue dApp:

- [OMG Network](https://omg.network/)
- [Polygon](https://polygon.technology/) (precedentemente Matic Network)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Letture consigliate {#further-reading}

- [EthHub su Plasma](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/plasma/)
- [Learn Plasma](https://www.learnplasma.org/en/)

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_
