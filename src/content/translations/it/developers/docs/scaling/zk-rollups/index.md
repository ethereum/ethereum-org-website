---
title: Rollup a conoscenza zero (zero-knowledge)
description: Introduzione ai rollup a conoscenza zero
lang: it
---

## Prerequisiti {#prerequisites}

Occorre avere una buona comprensione di tutti gli argomenti fondamentali ed una conoscenza approfondita della [scalabilità di Ethereum](/developers/docs/scaling/). L'implementazione di soluzioni di scalabilità, come i rollup, è un argomento avanzato in quanto la tecnologia è meno testata sul campo e continua ad essere oggetto di ricerca e sviluppo.

Stai cercando una risorsa più adatta ai principianti? Consulta la nostra [introduzione al livello 2](/layer-2/).

## Rollup a conoscenza zero (zero-knowledge) {#zk-rollups}

I **rollup a conoscenza zero (rollup ZK)** inglobano (o "avvolgono") centinaia di trasferimenti al di fuori della catena e generano una prova crittografica. Queste prove possono essere sotto forma di SNARK (argomenti di conoscenza succinti non interattivi) o STARK (argomenti di conoscenza trasparenti e scalabili). SNARK e STARK sono noti come prove di validità e sono pubblicati al livello 1.

Il contratto intelligente del rollup ZK mantiene lo stato di tutti i trasferimenti sul livello 2 e, questo stato, è aggiornabile solo con una prova di validità. Questo significa che i rollup ZK necessitano solo della prova di validità invece di tutti i dati della transazione. Con un rollup ZK, convalidare un blocco è più rapido ed economico perché sono inclusi meno dati.

Con un rollup ZK, non ci sono ritardi spostando i fondi dal livello 2 all'1, poiché una prova di validità accettata dal contratto del rollup ZK ha già verificato i fondi.

Essendo sul livello 2, i rollup ZK sono ottimizzabili per ridurre ulteriormente le dimensioni della transazione. Ad esempio, un account è rappresentato da un indice anziché da un indirizzo, riducendo la transazione da 32 byte a soli 4 byte. Le transazioni sono scritte in Ethereum anche come `calldata`, riducendo il gas.

### Pro e contro {#zk-pros-and-cons}

| Pro                                                                                                                                          | Contro                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Tempo di finalizzazione più veloce, poiché lo stato è verificato istantaneamente una volta che le prove sono inviate alla catena principale. | Alcuni non sono supportati dall'EVM.                                                                                   |
| Non vulnerabile agli attacchi economici a cui i [rollup ottimistici](#optimistic-pros-and-cons) possono essere esposti.                      | Le prove di validità sono difficili da calcolare, non ne vale la pena per applicazioni con poca attività sulla catena. |
| Sicuro e decentralizzato, dal momento che i dati necessari per recuperare lo stato sono sulla catena del livello 1.                          | Un operatore può influenzare l'ordine della transazione                                                                |

### Una spiegazione grafica dei rollup ZK {#zk-video}

Guarda Finematics spiegare i rollup ZK:

<YouTube id="7pWxCklcNsU" start="406" />

### Utilizzo dei rollup ZK {#use-zk-rollups}

Esistono molteplici implementazioni dei rollup ZK che puoi integrare nelle tue dapp:

<RollupProductDevDoc rollupType="zk" />

**Lettura dei rollup ZK**

- [Cosa sono i rollup a conoscenza zero?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [EthHub sui rollup ZK](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)
- [STARK vs SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
