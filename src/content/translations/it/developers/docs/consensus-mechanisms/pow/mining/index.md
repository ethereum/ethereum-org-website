---
title: Mining
description: Spiegazione del funzionamento del mining in Ethereum e di come contribuisce a mantenere la rete Ethereum sicura e decentralizzata.
lang: it
sidebar: true
preMergeBanner: true
---

<InfoBanner emoji=":wave:">
   Il proof-of-stake sostituirà presto il proof-of-work come meccanismo di consenso di Ethereum, e quindi il mining sarà disattivato. Ethereum sarà invece protetto dai validatori che mettono ETH in staking. Puoi iniziare fin da subito a mettere in staking i tuoi ETH. Leggi di più sulla <a href="/upgrades/merge/">Fusione</a>, sul <a href="/developers/docs/consensus-mechanisms/pos/">proof-of-stake</a> e sullo <a href="/staking/">staking</a>.    
</InfoBanner>

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo innanzi tutto di leggere [transazioni](/developers/docs/transactions/), [blocchi](/developers/docs/blocks/) e [Proof of Work](/developers/docs/consensus-mechanisms/pow/).

## Cos'è il mining in Ethereum? {#what-is-ethereum-mining}

Il mining è il processo di creazione di un blocco di transazioni, da aggiungere alla blockchain Ethereum.

La parola mining nasce in un contesto di analogia con l'oro per le criptovalute. L'oro e i metalli preziosi sono scarsi, così come i token digitali, e l'unico modo per aumentare il volume totale è estrarli attraverso il mining. Questo è opportuno nella misura in cui, anche in Ethereum, il solo metodo d'emissione dopo il lancio è il mining. A differenza di questi esempi però, il mining è anche il metodo per proteggere la rete, creando, verificando, pubblicando e propagando i blocchi nella blockchain.

Minare ether = Proteggere la Rete

Ethereum, come Bitcoin, utilizza al momento un meccanismo di consenso basato sul [proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow/). Il mining è la linfa vitale del proof-of-work. I miner di Ethereum (computer che eseguono un software) usano il loro tempo e la loro capacità di calcolo per elaborare transazioni e produrre blocchi.

## Perché esistono i miner? {#why-do-miners-exist}

Nei sistemi decentralizzati come Ethereum, dobbiamo assicurarci che tutti concordino sull'ordine delle transazioni. I miner aiutano a farlo verificare risolvendo complessi enigmi di calcolo per produrre blocchi, proteggendo la rete dagli attacchi.

[Di più sul proof-of-work](/developers/docs/consensus-mechanisms/pow/)

## Chi può diventare miner su Ethereum? {#who-can-become-a-miner}

Tecnicamente, tutti possono fare mining sulla rete Ethereum usando il proprio computer. Non tutti possono invece "minare" ether (ETH) in modo redditizio. In gran parte dei casi, per fare mining con profitto i miner devono acquistare hardware informatico dedicato. Anche se è vero che chiunque può eseguire il software di mining sul proprio computer, è improbabile che i computer medi guadagnino ricompense per i blocchi sufficienti per coprire i costi associati al mining.

### Costi del mining {#cost-of-mining}

- I costi potenziali dell'hardware necessario per costruire e mantenere una piattaforma di mining
- I costi elettrici per alimentarla
- Se effettui il mining all'interno di un gruppo, i gruppi di mining addebitano generalmente una commissione forfettaria percentuale su ciascun blocco generato dal gruppo
- I costi potenziali delle attrezzature per supportare la piattaforma di mining (ventilazione, monitoraggio energetico, cablaggio, etc.)

Per approfondire ulteriormente la redditività del mining, usa un apposito calcolatore, come quello messo a disposizione da [Etherscan](https://etherscan.io/ether-mining-calculator).

## Come avviene il mining delle transazioni Ethereum {#how-ethereum-transactions-are-mined}

1. Un utente scrive e firma una richiesta di [transazione](/developers/docs/transactions/) con la chiave privata di un [account](/developers/docs/accounts/).
2. L'utente trasmette la richiesta di transazione all'intera rete Ethereum attraverso un [nodo](/developers/docs/nodes-and-clients/).
3. Dopo aver recepito la richiesta della nuova transazione, ogni nodo nella rete Ethereum aggiunge la richiesta alla propria mempool locale, un elenco di tutte le richieste di transazioni delle quali è venuto a conoscenza e che non sono ancora state inviate alla blockchain in un blocco.
4. A un certo punto, un nodo di mining aggrega diverse decine o centinaia di richieste di transazioni in un [blocco](/developers/docs/blocks/) potenziale, in modo da massimizzare le [commissioni sulle transazioni](/developers/docs/gas/) che verranno guadagnate, rimanendo comunque entro il limite di gas per blocco. A questo punto, il nodo di mining:
   1. Verifica la validità di ogni richiesta di transazione (ad esempio che nessuno stia provando a trasferire ether da un account senza firma, che una richiesta non abbia un formato scorretto ecc.), dopodiché esegue il codice della richiesta, cambiando lo stato della propria copia locale dell'EVM. Il miner assegna la commissione sulle transazioni per ogni richiesta di transazione al proprio account.
   2. Inizia il processo di produzione del "certificato di legittimità" Proof of Work per il blocco potenziale, una volta che tutte le richieste di transazione nel blocco sono state verificate ed eseguite nella copia dell'EVM locale.
5. Infine un miner concluderà la produzione di un certificato per un blocco che include la nostra richiesta di transazione specifica. Il miner trasmetterà quindi il blocco completato, che include il certificato e una checksum del nuovo stato dell'EVM dichiarato.
6. Gli altri nodi vengono a conoscenza del nuovo blocco. Verificano il certificato, eseguono tutte le transazioni sul blocco (includendo la transazione originalmente inviata dal nostro utente) e verificano che la checksum del nuovo stato dell'EVM dopo l'esecuzione di tutte le transazioni combaci quella dello stato dichiarato dal blocco del miner. Solo a questo punto allora questi nodi aggiungeranno il blocco alla coda della blockchain e accetteranno il nuovo stato dell'EVM come canonico.
7. Ogni nodo rimuove tutte le transazioni nel nuovo blocco dalla propria mempool locale di richieste di transazioni non eseguite.
8. I nuovi nodi che si aggiungono alla rete scaricano tutti i blocchi in sequenza, incluso il blocco che contiene la transazione della quale stiamo parlando. Inizializzano la propria copia locale dell'EVM (che partirà come EVM con stato vuoto) e si avvieranno al processo di esecuzione di ogni transazione contenuta in ogni blocco aggiungendola alla propria copia dell'EVM locale e verificando le checksum dello stato ad ogni blocco che esamineranno.

Il mining di ogni transazione (cioè l'inclusione in un nuovo blocco e la prima propagazione) avviene una volta sola, ma la transazione viene eseguita e verificata da ogni partecipante nel processo di avanzamento dello stato canonico dell'EVM. Questa è una delle regole fondamentali della blockchain: **non ti fidare, verifica**.

## Demo visiva {#a-visual-demo}

Austin ti guiderà attraverso il mining e la blockchain basata sul proof-of-work.

<YouTube id="zcX7OJ-L8XQ" />

## L'algoritmo di mining {#mining-algorithm}

L'algoritmo di mining di Ethereum ha subito diversi aggiornamenti dalla sua nascita. L'algoritmo originale, "Dagger Hashimoto" si basava sulla messa a disposizione di una grande, transitoria serie di dati generata casualmente che forma un [Grafico Aciclico Diretto](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (la parte Dagger), e i miner tentavano di risolvere un vincolo particolare su questi dati, parzialmente determinato tramite l'hash d'intestazione di un blocco. Questo algoritmo era una novità perché presentava elevati requisiti di larghezza di banda per l'accesso alla memoria, ma era eseguibile usando un processore modesto, rendendolo eseguibile su GPU, ma resistente al tipo di corsa agli armamenti di hardware basato su ASIC che avrebbe potuto generare un rischio di centralizzazione (per approfondire sui [problemi con ASICS](https://www.investopedia.com/investing/why-centralized-crypto-mining-growing-problem/)). Dopo sostanziali aggiornamenti, l'algoritmo è stato ridenominato "Ethash". Questa ridenominazione è avvenuta prima che iniziasse il mining sulla rete principale di Ethereum. Dagger-Hashimoto è stato un algoritmo di ricerca precursore che non è stato usato sulla rete principale di Ethereum.

Ulteriori informazioni su questi algoritmi di mining sono disponibili alla nostra [pagina sugli algoritmi di mining](/developers/docs/consensus-mechanisms/pow/mining-algorithms/).

## Lettura consigliata {#further-reading}

- [What does it mean to mine Ethereum?](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_

## Strumenti correlati {#related-tools}

- [I top miner di Ethereum](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Calcolatore di mining Etherscan](https://etherscan.io/ether-mining-calculator)
- [Calcolatore di mining Minerstat](https://minerstat.com/coin/ETH)

## Argomenti correlati {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof of Work](/developers/docs/consensus-mechanisms/pow/)
