---
title: Rollup ottimistici
description: Introduzione ai rollup ottimistici
lang: it
---

## Prerequisiti {#prerequisites}

Occorre avere una buona comprensione di tutti gli argomenti fondamentali ed un elevato livello di comprensione della [scalabilità di Ethereum](/developers/docs/scaling/). L'implementazione di soluzioni di scalabilità, come i rollup, è un argomento avanzato in quanto la tecnologia è meno testata nel campo e continua ad essere oggetto di ricerca e sviluppo.

Stai cercando una risorsa più adatta ai principianti? Consulta la nostra [introduzione al livello 2](/layer-2/).

## Rollup ottimistici {#optimistic-rollups}

I rollup ottimistici si collocano parallelamente alla catena principale di Ethereum sul livello 2. Possono apportare miglioramenti a livello di scalabilità perché non eseguono calcoli di default. Invece, dopo una transazione, propongono il nuovo stato alla rete principale o "autenticano" la transazione.

Con i rollup ottimistici, le transazioni sono scritte sulla catena principale di Ethereum come `calldata`, ottimizzandoli ulteriormente attraverso la riduzione del costo del carburante.

Siccome il calcolo è la parte lenta e costosa di Ethereum, i rollup ottimistici possono offrire miglioramenti a livello di scalabilità fino a 10-100x, a seconda della transazione. Questo numero aumenterà ancora di più con l'introduzione delle [shard chains](/upgrades/sharding), poiché saranno disponibili più dati se una transazione viene contestata.

### Transazioni contestate {#disputing-transactions}

I rollup ottimistici non calcolano la transazione, quindi occorre un meccanismo per assicurarsi che le transazioni siano legittime e non fraudolente. E qui entrano in gioco le prove di frode. Se qualcuno nota una transazione fraudolenta, il rollup esegue una prova di frode e avvia il calcolo della transazione utilizzando i dati di stato disponibili. Ciò significa che potresti avere tempi d'attesa maggiori per la conferma della transazione rispetto a un rollup ZK, poiché la transazione potrebbe essere contestata.

![Diagramma che mostra cosa succede quando avviene una transazione fraudolenta in un rollup ottimistico in Ethereum](./optimistic-rollups.png)

Il carburante che serve per eseguire il calcolo della prova di frode viene rimborsato. Ben Jones di Optimism descrive così il metodo in uso:

"_chiunque sia in grado di eseguire un'azione che qualcuno dovrà provare come fraudolenta per proteggere i propri fondi richiede l'invio di un'obbligazione. In pratica, si bloccano alcuni ETH con la dichiarazione "Giuro di dire la verità"... Se non dico la verità e la frode viene confermata, il denaro sparisce (slashing). Non solo viene eseguito lo slashing di parte del denaro, ma un'altra parte pagherà il carburante necessario per effettuare la prova di frode_"

Perciò puoi vedere gli incentivi: i partecipanti vengono penalizzati se realizzano una frode e rimborsati se invece ne dimostrano una.

### Pro e contro {#optimistic-pros-and-cons}

| Pro                                                                                                                                               | Contro                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Tutto quello si può fare con il livello 1 di Ethereum, si può fare anche con i rollup ottimistici, in quanto sono compatibili con EVM e Solidity. | Tempi di attesa lunghi per le transazioni sulla catena a causa di potenziali contestazioni di frodi. |
| Tutti i dati della transazione sono memorizzati sulla catena di livello 1, il che significa sicurezza e decentralizzazione.                       | Un operatore può influenzare l'ordine della transazione.                                             |

### Una spiegazione visiva dei rollup ottimistici {#optimistic-video}

Guarda Finematics spiegare i rollup ottimistici:

<YouTube id="7pWxCklcNsU" start="263" />

### Utilizzo dei rollup ottimistici {#use-optimistic-rollups}

Esistono molteplici implementazioni dei rollup Ottimistici che puoi integrare nelle tue dapp:

<RollupProductDevDoc rollupType="optimistic" />

**Lettura dei rollup ottimistici**

- [Tutto ciò che devi sapere sul rollup ottimistico](https://research.paradigm.xyz/rollups)
- [EthHub sui rollup ottimsitici](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [La guida essenziale ad Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Come funziona realmente il rollup ottimistico?](https://research.paradigm.xyz/optimism)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
