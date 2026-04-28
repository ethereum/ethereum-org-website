---
title: Mining
description: Una spiegazione di come funzionava il mining su Ethereum.
lang: it
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
La prova di lavoro non è più alla base del meccanismo di consenso di Ethereum, il che significa che il mining è stato disattivato. Invece, [Ethereum](/) è protetto da validatori che mettono in stake ETH. Puoi iniziare a fare staking dei tuoi ETH oggi stesso. Maggiori informazioni su <a href='/roadmap/merge/'>La Fusione (The Merge)</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>prova di stake</a> e <a href='/staking/'>staking</a>. Questa pagina è solo di interesse storico.
</AlertDescription>
</AlertContent>
</Alert>

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima le [transazioni](/developers/docs/transactions/), i [blocchi](/developers/docs/blocks/) e la [prova di lavoro](/developers/docs/consensus-mechanisms/pow/).

## Cos'è il mining di Ethereum? {#what-is-ethereum-mining}

Il mining è il processo di creazione di un blocco di transazioni da aggiungere alla blockchain di Ethereum nell'architettura di prova di lavoro di Ethereum, ora deprecata.

La parola mining ha origine nel contesto dell'analogia dell'oro per le criptovalute. L'oro o i metalli preziosi sono scarsi, così come i token digitali, e l'unico modo per aumentare il volume totale in un sistema di prova di lavoro è attraverso il mining. In Ethereum basato sulla prova di lavoro, l'unica modalità di emissione era tramite il mining. A differenza dell'oro o dei metalli preziosi, tuttavia, il mining di Ethereum era anche il modo per proteggere la rete creando, verificando, pubblicando e propagando blocchi nella blockchain.

Minare ether = Proteggere la Rete

Il mining è la linfa vitale di qualsiasi blockchain basata sulla prova di lavoro. I minatori di Ethereum - computer che eseguono software - usavano il loro tempo e la loro potenza di calcolo per elaborare transazioni e produrre blocchi prima della transizione alla prova di stake.

## Perché esistono i minatori? {#why-do-miners-exist}

Nei sistemi decentralizzati come Ethereum, dobbiamo assicurarci che tutti siano d'accordo sull'ordine delle transazioni. I minatori aiutavano a far sì che ciò accadesse risolvendo enigmi computazionalmente difficili per produrre blocchi, proteggendo la rete dagli attacchi.

[Maggiori informazioni sulla prova di lavoro](/developers/docs/consensus-mechanisms/pow/)

In precedenza, chiunque era in grado di minare sulla rete di Ethereum usando il proprio computer. Tuttavia, non tutti potevano minare ether (ETH) in modo redditizio. Nella maggior parte dei casi, i minatori dovevano acquistare hardware informatico dedicato e avere accesso a fonti di energia economiche. Era improbabile che il computer medio guadagnasse abbastanza ricompense del blocco per coprire i costi associati al mining.

### Costo del mining {#cost-of-mining}

- Costi potenziali dell'hardware necessario per costruire e mantenere un impianto di mining (mining rig)
- Costo elettrico per alimentare l'impianto di mining
- Se stavi minando in una pool, queste pool in genere addebitavano una commissione percentuale fissa su ogni blocco generato dalla pool
- Costo potenziale delle attrezzature per supportare l'impianto di mining (ventilazione, monitoraggio dell'energia, cablaggio elettrico, ecc.)

Per esplorare ulteriormente la redditività del mining, usa un calcolatore di mining, come quello fornito da [Etherscan](https://etherscan.io/ether-mining-calculator).

## Come venivano minate le transazioni di Ethereum {#how-ethereum-transactions-were-mined}

Di seguito viene fornita una panoramica di come le transazioni venivano minate nella prova di lavoro di Ethereum. Una descrizione analoga di questo processo per la prova di stake di Ethereum può essere trovata [qui](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Un utente scrive e firma una richiesta di [transazione](/developers/docs/transactions/) con la chiave privata di un [account](/developers/docs/accounts/).
2. L'utente trasmette la richiesta di transazione all'intera rete di Ethereum da un [nodo](/developers/docs/nodes-and-clients/).
3. Dopo aver appreso della nuova richiesta di transazione, ogni nodo nella rete di Ethereum aggiunge la richiesta alla propria mempool locale, un elenco di tutte le richieste di transazione di cui sono venuti a conoscenza e che non sono ancora state confermate nella blockchain in un blocco.
4. A un certo punto, un nodo di mining aggrega diverse dozzine o centinaia di richieste di transazione in un potenziale [blocco](/developers/docs/blocks/), in un modo che massimizza le [commissioni della transazione](/developers/docs/gas/) che guadagnano pur rimanendo al di sotto del limite del gas del blocco. Il nodo di mining quindi:
   1. Verifica la validità di ogni richiesta di transazione (ad es., nessuno sta cercando di trasferire ether da un account per cui non ha prodotto una firma, la richiesta non è malformata, ecc.), e poi esegue il codice della richiesta, alterando lo stato della propria copia locale della EVM. Il minatore assegna la commissione della transazione per ciascuna di queste richieste di transazione al proprio account.
   2. Inizia il processo di produzione del "certificato di legittimità" della prova di lavoro per il potenziale blocco, una volta che tutte le richieste di transazione nel blocco sono state verificate ed eseguite sulla copia locale della EVM.
5. Alla fine, un minatore finirà di produrre un certificato per un blocco che include la nostra specifica richiesta di transazione. Il minatore trasmette quindi il blocco completato, che include il certificato e un checksum del nuovo stato della EVM dichiarato.
6. Altri nodi vengono a conoscenza del nuovo blocco. Verificano il certificato, eseguono loro stessi tutte le transazioni sul blocco (inclusa la transazione originariamente trasmessa dal nostro utente) e verificano che il checksum del loro nuovo stato della EVM dopo l'esecuzione di tutte le transazioni corrisponda al checksum dello stato dichiarato dal blocco del minatore. Solo allora questi nodi aggiungono questo blocco alla fine della loro blockchain e accettano il nuovo stato della EVM come stato canonico.
7. Ogni nodo rimuove tutte le transazioni nel nuovo blocco dalla propria mempool locale di richieste di transazione non soddisfatte.
8. I nuovi nodi che si uniscono alla rete scaricano tutti i blocchi in sequenza, incluso il blocco contenente la nostra transazione di interesse. Inizializzano una copia locale della EVM (che inizia come una EVM a stato vuoto), e poi passano attraverso il processo di esecuzione di ogni transazione in ogni blocco sopra la loro copia locale della EVM, verificando i checksum dello stato ad ogni blocco lungo il percorso.

Ogni transazione viene minata (inclusa in un nuovo blocco e propagata per la prima volta) una volta, ma eseguita e verificata da ogni partecipante nel processo di avanzamento dello stato canonico della EVM. Questo evidenzia uno dei mantra centrali della blockchain: **Non fidarti, verifica**.

## Blocchi ommer (uncle) {#ommer-blocks}

Il mining dei blocchi sulla prova di lavoro era probabilistico, il che significa che a volte due blocchi validi venivano pubblicati contemporaneamente a causa della latenza della rete. In questo caso, il protocollo doveva determinare la catena più lunga (e quindi più "valida") garantendo al contempo equità verso i minatori ricompensando parzialmente il blocco valido proposto non incluso. Questo incoraggiava un'ulteriore decentralizzazione della rete poiché i minatori più piccoli, che potevano affrontare una maggiore latenza, potevano comunque generare rendimenti tramite le ricompense del blocco [ommer](/glossary/#ommer).

Il termine "ommer" è il termine neutro preferito per il fratello di un blocco genitore, ma a volte viene anche chiamato "uncle" (zio). **Dal passaggio di Ethereum alla prova di stake, i blocchi ommer non vengono più minati** poiché viene eletto un solo proponente in ogni slot. Puoi vedere questo cambiamento visualizzando il [grafico storico](https://ycharts.com/indicators/ethereum_uncle_rate) dei blocchi ommer minati.

## Una demo visiva {#a-visual-demo}

Guarda Austin guidarti attraverso il mining e la blockchain basata sulla prova di lavoro.

<YouTube id="zcX7OJ-L8XQ" />

## L'algoritmo di mining {#mining-algorithm}

La rete principale di Ethereum ha utilizzato un solo algoritmo di mining: ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash era il successore di un algoritmo originale di ricerca e sviluppo noto come ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Maggiori informazioni sugli algoritmi di mining](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Argomenti correlati {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Prova di lavoro](/developers/docs/consensus-mechanisms/pow/)