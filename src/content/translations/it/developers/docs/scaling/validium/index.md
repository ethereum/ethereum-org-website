---
title: Validium
description: Un'introduzione a Validium come soluzione di scalabilità, attualmente utilizzata dalla comunità Ethereum.
lang: it
incomplete: true
sidebarDepth: 3
---

Usa prove di validità come [i rollup ZK](/developers/docs/scaling/zk-rollups/) ma i dati non sono archiviati sul livello 1 della catena di Ethereum. Ciò può tradursi in 10.000 transazioni al secondo per catena validium, con la possibilità di eseguire più catene in parallelo.

## Prerequisiti {#prerequisites}

Dovresti avere una buona comprensione di tutti gli argomenti fondamentali ed una comprensione di alto livello della [scalabilità di Ethereum](/developers/docs/scaling/). L'implementazione di soluzioni di scalabilità, come Validium, è un argomento avanzato in quanto la tecnologia è meno testata nel campo e continua ad essere oggetto di ricerca e sviluppo.

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                                  | Contro                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nessun ritardo di prelievo (non c'è latenza per transazioni sulla catena e tra catene); conseguente maggior efficienza del capitale. | Supporto limitato di calcolo generale/smart contract; occorrono linguaggi specifici.                                                                                              |
| Non vulnerabile a certi tipi di attacchi economici subiti da sistemi basati su prove di frode in applicazioni ad alto valore.        | Necessità di un'elevata potenza di calcolo per generare le prove ZK; non conveniente per applicazioni con bassi volumi.                                                           |
|                                                                                                                                      | Tempo di finalità soggettiva più limitato (10-30 minuti per generare una prova ZK) (ma più veloce per finalità completa perché non c'è ritardo dovuto ai tempi di contestazione). |
|                                                                                                                                      | Per generare una prova devono essere disponibili costantemente dati esterni alla catena.                                                                                          |

### Usare Validium {#use-validium}

Diversi progetti forniscono implementazioni di Validium che puoi integrare nelle tue dApp:

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)

## Letture consigliate {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_
