---
title: Mining
description: Spiegazione del funzionamento del mining in Ethereum e di come contribuisce a mantenere la rete Ethereum sicura e decentralizzata.
lang: it
sidebar: true
incomplete: true
---

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo di leggere [transazioni](/en/developers/docs/transactions/), [blocchi](/en/developers/docs/blocks/) e [Proof of Work](/developers/docs/consensus-mechanisms/pow/).

## Cos'è il mining in Ethereum? {#what-is-ethereum-mining}

Il mining è il processo di creazione di un blocco di transazioni, da aggiungere alla blockchain Ethereum.

Ethereum, come Bitcon, al momento utilizza un meccanismo di consenso basato sulla [Proof of Work (PoW)](/developers/docs/consensus-mechanisms/pow/). Il mining è la linfa vitale della Proof of Work. I miner di Ethereum (computer che eseguono software) usano il loro tempo e la loro capacità di calcolo per elaborare transazioni e produrre blocchi.

## Perché esistono i miner? {#why-do-miners-exist}

Nei sistemi decentralizzati come Ethereum dobbiamo assicurarci che tutti siano d'accordo sull'ordine delle transazioni. In questo i miner aiutano risolvendo complessi enigmi di calcolo con lo scopo di produrre blocchi, tenendo la rete al sicuro dagli attacchi.

[Maggiori informazioni sulla Proof of Work](/developers/docs/consensus-mechanisms/pow/)

## Come avviene il mining delle transazioni Ethereum {#how-ethereum-transactions-are-mined}

1. Un utente scrive e firma una richiesta di [transazione](/en/developers/docs/transactions/) con la chiave privata di un [account](/en/developers/docs/accounts/).
2. L'utente trasmette la richiesta di transazione all'intera rete Ethereum attraverso un [nodo](/en/developers/docs/nodes-and-clients/).
3. Dopo aver recepito la richiesta della nuova transazione, ogni nodo nella rete Ethereum aggiunge la richiesta alla propria mempool locale, un elenco di tutte le richieste di transazioni delle quali è venuto a conoscenza e che non sono ancora state inviate alla blockchain in un blocco.
4. A un certo punto, un nodo di mining aggrega diverse decine o centinaia di richieste di transazioni in un [blocco](/en/developers/docs/blocks/) potenziale, in modo da massimizzare le [commissioni sulle transazioni](/en/developers/docs/gas/) che verranno guadagnate, rimanendo comunque sotto il limite di carburante per blocco. A questo punto, il nodo di mining:
   1. Verifica la validità di ogni richiesta di transazione (ad esempio che nessuno stia provando a trasferire ether da un account senza firma, che una richiesta non abbia un formato scorretto ecc.), dopodiché esegue il codice della richiesta, cambiando lo stato della propria copia locale dell'EVM. Il miner assegna la commissione sulle transazioni per ogni richiesta di transazione al proprio account.
   2. Inizia il processo di produzione del "certificato di legittimità" Proof of Work per il blocco potenziale, una volta che tutte le richieste di transazione nel blocco sono state verificate ed eseguite nella copia dell'EVM locale.
5. Infine un miner concluderà la produzione di un certificato per un blocco che include la nostra richiesta di transazione specifica. Il miner trasmetterà quindi il blocco completato, che include il certificato e una checksum del nuovo stato dell'EVM dichiarato.
6. Gli altri nodi vengono a conoscenza del nuovo blocco. Verificano il certificato, eseguono tutte le transazioni sul blocco (includendo la transazione originalmente inviata dal nostro utente) e verificano che la checksum del nuovo stato dell'EVM dopo l'esecuzione di tutte le transazioni combaci quella dello stato dichiarato dal blocco del miner. Solo a questo punto allora questi nodi aggiungeranno il blocco alla coda della blockchain e accetteranno il nuovo stato dell'EVM come canonico.
7. Ogni nodo rimuove tutte le transazioni nel nuovo blocco dalla propria mempool locale di richieste di transazioni non eseguite.
8. I nuovi nodi che si aggiungono alla rete scaricano tutti i blocchi in sequenza, incluso il blocco che contiene la transazione della quale stiamo parlando. Inizializzano la propria copia locale dell'EVM (che partirà come EVM con stato vuoto) e si avvieranno al processo di esecuzione di ogni transazione contenuta in ogni blocco aggiungendola alla propria copia dell'EVM locale e verificando le checksum dello stato ad ogni blocco che esamineranno.

Il mining di ogni transazione (cioè l'inclusione in un nuovo blocco e la prima propagazione) avviene una volta sola, ma la transazione viene eseguita e verificata da ogni partecipante nel processo di avanzamento dello stato canonico dell'EVM. Questo è uno dei mantra della blockchain: **non ti fidare, verifica**.

## Demo visiva {#a-visual-demo}

Lasciati guidare da Austin attraverso il mining e la blockchain basata sulla Proof of Work. <iframe width="100%" height="315" src="https://www.youtube.com/embed/zcX7OJ-L8XQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Letture consigliate {#further-reading}

- [What does it mean to mine Ethereum?](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_
- [How Ethereum Mining Works](https://www.coindesk.com/information/ethereum-mining-works) _Coindesk_

## Strumenti correlati {#related-tools}

- [I top miner di Ethereum](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Calcolatore di mining Ethereum](https://minerstat.com/coin/ETH)

## Argomenti correlati {#related-topics}

- [Carburante](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof of Work](/developers/docs/consensus-mechanisms/pow/)
