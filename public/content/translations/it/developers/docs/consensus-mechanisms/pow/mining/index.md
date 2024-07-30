---
title: Mining
description: Una spiegazione di come funzionava il mining su Ethereum.
lang: it
---

<InfoBanner emoji=":wave:">
Il Proof of Work non è più il meccanismo di consenso alla base di Ethereum, il che significa che il mining è stato disattivato. Invece, Ethereum è protetto dai validatori che mettono ETH in staking. Puoi iniziare fin da subito a mettere in staking i tuoi ETH. Leggi di più su <a href='/roadmap/merge/'>La Fusione</a>, il <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake</a> e lo <a href='/staking/'>staking</a>. Questa pagina è solo per interesse storico.
</InfoBanner>

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo innanzi tutto di leggere [transazioni](/developers/docs/transactions/), [blocchi](/developers/docs/blocks/) e [Proof of Work](/developers/docs/consensus-mechanisms/pow/).

## Cos'è il mining in Ethereum? {#what-is-ethereum-mining}

Il mining è il processo di creazione di un blocco di transazioni, da aggiungere alla blockchain Ethereum nell'architettura ormai obsoleta di Proof of Work.

La parola mining origina nel contesto dell'analogia dell'oro per le criptovalute. L'oro e i metalli preziosi sono scarsi, così come i token digitali, e l'unico modo per aumentarne il volume totale in un sistema di Proof of Work attraverso il mining. Nell'Ethereum Proof of Work, l'unico metodo di emissione era tramite il mining. A differenza dell'oro e dei metalli preziosi, però, il mining di Ethereum era anche il metodo per proteggere la rete, creando, verificando, pubblicando e propagando i blocchi nella blockchain.

Minare ether = Proteggere la Rete

Il mining è la linfa vitale di qualsiasi blockchain basata sul Proof of Work. Prima della transizione al Proof of Stake, i miner di Ethereum (computer che eseguono software) usavano il loro tempo e la loro capacità di calcolo per elaborare transazioni e produrre blocchi.

## Perché esistono i miner? {#why-do-miners-exist}

Nei sistemi decentralizzati come Ethereum, dobbiamo assicurarci che tutti concordino sull'ordine delle transazioni. In questo i miner aiutavano risolvendo complessi enigmi di calcolo con lo scopo di produrre blocchi, tenendo la rete al sicuro dagli attacchi.

[Maggiori informazioni sul Proof of Work](/developers/docs/consensus-mechanisms/pow/)

In precedenza, chiunque poteva minare sulla rete Ethereum usando il proprio computer. Tuttavia, non tutti potevano estrarre ether (ETH) in modo redditizio. In gran parte dei casi, i miner dovevano acquistare hardware dedicato e avere accesso a fonti energetiche convenienti. Per il computer medio, era improbabile guadagnare abbastanza ricompense dei blocchi da coprire i costi associati al mining.

### Costi del mining {#cost-of-mining}

- I costi potenziali dell'hardware necessario per costruire e mantenere una piattaforma di mining
- I costi elettrici per alimentarla
- Se si effettuava il mining all'interno di un gruppo, questi gruppi di mining addebitavano generalmente una commissione forfettaria percentuale su ciascun blocco generato dal gruppo
- I costi potenziali delle attrezzature per supportare la piattaforma di mining (ventilazione, monitoraggio energetico, cablaggio, etc.)

Per approfondire ulteriormente la redditività del mining, usa un apposito calcolatore, come quello messo a disposizione da [Etherscan](https://etherscan.io/ether-mining-calculator).

## Come avveniva il mining delle transazioni Ethereum {#how-ethereum-transactions-were-mined}

Quanto segue fornisce una panoramica di come erano minate le transazioni, nel proof-of-work di Ethereum. Una descrizione analoga di questo processo per il proof-of-stake di Ethereum, si può trovare [qui](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Un utente scrive e firma una richiesta di [transazione](/developers/docs/transactions/) con la chiave privata di un [conto](/developers/docs/accounts/).
2. L'utente trasmette la richiesta di transazione all'intera rete Ethereum attraverso un [nodo](/developers/docs/nodes-and-clients/).
3. Dopo aver recepito la richiesta della nuova transazione, ogni nodo nella rete Ethereum aggiunge la richiesta alla propria mempool locale, un elenco di tutte le richieste di transazioni delle quali è venuto a conoscenza e che non sono ancora state inviate alla blockchain in un blocco.
4. A un certo punto, un nodo di mining aggrega diverse dozzine o centinaia di richieste di transazione in un [blocco](/developers/docs/blocks/) potenziale, così da massimizzare le [commissioni di transazione](/developers/docs/gas/) che saranno guadagnate, entro il limite di gas del blocco. A questo punto, il nodo di mining:
   1. Verifica la validità di ogni richiesta di transazione (cioè, che nessuno stia provando a trasferire ether da un conto per cui non ha prodotto una firma, la richiesta non è malformata, etc.) e, poi, esegue il codice della richiesta, alterando lo stato della loro copia locale dell'EVM. Il miner assegna la commissione sulla transazione per ogni simile richiesta di transazione, al proprio conto.
   2. Inizia il processo di produzione del "certificato di legittimità" Proof of Work per il blocco potenziale, una volta che tutte le richieste di transazione nel blocco sono state verificate ed eseguite nella copia dell'EVM locale.
5. Infine un miner concluderà la produzione di un certificato per un blocco che include la nostra richiesta di transazione specifica. Il miner trasmetterà quindi il blocco completato, che include il certificato e una checksum del nuovo stato dell'EVM dichiarato.
6. Gli altri nodi vengono a conoscenza del nuovo blocco. Verificano il certificato, eseguono tutte le transazioni sul blocco (includendo la transazione originalmente inviata dal nostro utente) e verificano che la checksum del nuovo stato dell'EVM dopo l'esecuzione di tutte le transazioni combaci quella dello stato dichiarato dal blocco del miner. Solo a questo punto allora questi nodi aggiungeranno il blocco alla coda della blockchain e accetteranno il nuovo stato dell'EVM come canonico.
7. Ogni nodo rimuove tutte le transazioni nel nuovo blocco dalla propria mempool locale di richieste di transazioni non eseguite.
8. I nuovi nodi che si aggiungono alla rete scaricano tutti i blocchi in sequenza, incluso il blocco che contiene la transazione della quale stiamo parlando. Inizializzano la propria copia locale dell'EVM (che partirà come EVM con stato vuoto) e si avvieranno al processo di esecuzione di ogni transazione contenuta in ogni blocco aggiungendola alla propria copia dell'EVM locale e verificando le checksum dello stato ad ogni blocco che esamineranno.

Il mining di ogni transazione (cioè l'inclusione in un nuovo blocco e la prima propagazione) avviene una volta sola, ma la transazione viene eseguita e verificata da ogni partecipante nel processo di avanzamento dello stato canonico dell'EVM. Questa è una delle regole fondamentali della blockchain: **non ti fidare, verifica**.

## Blocchi ommer (zio) {#ommer-blocks}

L'estrazione di blocchi basata sul proof-of-work era solo probabilistica, il che significa che a volte due blocchi validi venivano pubblicati simultaneamente a causa della latenza della rete. In questo caso, il protocollo doveva determinare la catena più lunga (e quindi più "valida") garantendo al tempo stesso un trattamento equo dei miner, ricompensando parzialmente il blocco valido proposto non incluso. Ciò incoraggiava l'ulteriore decentralizzazione della rete in quanto i piccoli miner, che potevano trovarsi ad affrontare una latenza più elevata, potevano comunque generare rendimenti tramite ricompense per blocchi [ommer](/glossary/#ommer).

"Ommer" è il termine preferito, neutro dal punto di vista del genere, per lo stesso livello di un blocco genitore, ma a volte viene anche indicato come "zio". **Da quando Ethereum è passato alla proof-of-stake, i blocchi ommer non vengono più estratti** poiché in ogni slot viene eletto solo un proponente. Questo cambiamento può essere osservato nel [grafico storico](https://ycharts.com/indicators/ethereum_uncle_rate) dei blocchi ommer estratti.

## Demo visiva {#a-visual-demo}

Austin ti guiderà attraverso il mining e la blockchain basata sul proof-of-work.

<YouTube id="zcX7OJ-L8XQ" />

## L'algoritmo di mining {#mining-algorithm}

La Rete principale di Ethereum ha sempre e solo usato un algoritmo di mining: ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash è stato il successore di un algoritmo R&D originale noto come ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Maggiori informazioni sugli algoritmi di mining](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Argomenti correlati {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof of Work](/developers/docs/consensus-mechanisms/pow/)
