---
title: Minaggio
description: Una spiegazione di come funzionava il minaggio su Ethereum.
lang: it
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
La Prova di lavoro (PoW) non è più alla base del meccanismo di consenso di Ethereum, il che significa che il minaggio è stato disattivato. Invece, [Ethereum](/) è protetto da validatori che mettono in staking ETH. Puoi iniziare a mettere in staking i tuoi ETH oggi stesso. Scopri di più su <a href='/roadmap/merge/'>The Merge</a>, sulla <a href='/developers/docs/consensus-mechanisms/pos/'>Proof-of-Stake (PoS)</a> e sullo <a href='/staking/'>staking</a>. Questa pagina è solo di interesse storico.
</AlertDescription>
</AlertContent>
</Alert>

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima le [transazioni](/developers/docs/transactions/), i [blocchi](/developers/docs/blocks/) e la [Prova di lavoro (PoW)](/developers/docs/consensus-mechanisms/pow/).

## Cos'è il minaggio di Ethereum? {#what-is-ethereum-mining}

Il minaggio è il processo di creazione di un blocco di transazioni da aggiungere alla blockchain di Ethereum nell'architettura Proof-of-Work di Ethereum, ora deprecata.

La parola minaggio ha origine nel contesto dell'analogia dell'oro per le criptovalute. L'oro o i metalli preziosi sono scarsi, così come i token digitali, e l'unico modo per aumentare il volume totale in un sistema Proof-of-Work è attraverso il minaggio. Nell'Ethereum Proof-of-Work, l'unica modalità di emissione era tramite il minaggio. A differenza dell'oro o dei metalli preziosi, tuttavia, il minaggio di Ethereum era anche il modo per proteggere la rete creando, verificando, pubblicando e propagando blocchi nella blockchain.

Minare ether = Proteggere la rete

Il minaggio è la linfa vitale di qualsiasi blockchain Proof-of-Work. I minatori di Ethereum - computer che eseguono software - usavano il loro tempo e la loro potenza di calcolo per elaborare le transazioni e produrre blocchi prima della transizione alla Proof-of-Stake.

## Perché esistono i minatori? {#why-do-miners-exist}

Nei sistemi decentralizzati come Ethereum, dobbiamo assicurarci che tutti siano d'accordo sull'ordine delle transazioni. I minatori aiutavano a far sì che ciò accadesse risolvendo enigmi computazionalmente difficili per produrre blocchi, proteggendo la rete dagli attacchi.

[Maggiori informazioni sulla Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)

In precedenza, chiunque era in grado di minare sulla rete Ethereum utilizzando il proprio computer. Tuttavia, non tutti potevano minare ether (ETH) in modo redditizio. Nella maggior parte dei casi, i minatori dovevano acquistare hardware informatico dedicato e avere accesso a fonti di energia economiche. Era improbabile che il computer medio guadagnasse abbastanza ricompense del blocco per coprire i costi associati al minaggio.

### Costo del minaggio {#cost-of-mining}

- Costi potenziali dell'hardware necessario per costruire e mantenere un impianto di minaggio
- Costo elettrico per alimentare l'impianto di minaggio
- Se stavi minando in una pool, queste pool in genere addebitavano una commissione percentuale fissa su ogni blocco generato dalla pool
- Costo potenziale delle attrezzature per supportare l'impianto di minaggio (ventilazione, monitoraggio dell'energia, cablaggio elettrico, ecc.)

Per esplorare ulteriormente la redditività del minaggio, usa un calcolatore di minaggio, come quello fornito da [Etherscan](https://etherscan.io/ether-mining-calculator).

## Come venivano minate le transazioni di Ethereum {#how-ethereum-transactions-were-mined}

Di seguito viene fornita una panoramica di come venivano minate le transazioni nella Proof-of-Work di Ethereum. Una descrizione analoga di questo processo per la Proof-of-Stake di Ethereum può essere trovata [qui](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Un utente scrive e firma una richiesta di [transazione](/developers/docs/transactions/) con la chiave privata di un [account](/developers/docs/accounts/).
2. L'utente trasmette la richiesta di transazione all'intera rete Ethereum da un [nodo](/developers/docs/nodes-and-clients/).
3. Dopo aver appreso della nuova richiesta di transazione, ogni nodo nella rete Ethereum aggiunge la richiesta alla propria mempool locale, un elenco di tutte le richieste di transazione di cui sono a conoscenza che non sono state ancora confermate nella blockchain in un blocco.
4. A un certo punto, un nodo minatore aggrega diverse dozzine o centinaia di richieste di transazione in un potenziale [blocco](/developers/docs/blocks/), in un modo che massimizza le [commissioni di transazione](/developers/docs/gas/) che guadagna pur rimanendo al di sotto del limite di gas del blocco. Il nodo minatore quindi:
   1. Verifica la validità di ogni richiesta di transazione (ad es., nessuno sta cercando di trasferire ether da un account per cui non ha prodotto una firma, la richiesta non è malformata, ecc.), e quindi esegue il codice della richiesta, alterando lo stato della propria copia locale dell'EVM. Il minatore assegna la commissione di transazione per ciascuna di queste richieste di transazione al proprio account.
   2. Inizia il processo di produzione del "certificato di legittimità" della Proof-of-Work per il potenziale blocco, una volta che tutte le richieste di transazione nel blocco sono state verificate ed eseguite sulla copia locale dell'EVM.
5. Alla fine, un minatore finirà di produrre un certificato per un blocco che include la nostra specifica richiesta di transazione. Il minatore trasmette quindi il blocco completato, che include il certificato e un checksum del nuovo stato dell'EVM dichiarato.
6. Altri nodi vengono a conoscenza del nuovo blocco. Verificano il certificato, eseguono loro stessi tutte le transazioni sul blocco (inclusa la transazione originariamente trasmessa dal nostro utente) e verificano che il checksum del loro nuovo stato dell'EVM dopo l'esecuzione di tutte le transazioni corrisponda al checksum dello stato dichiarato dal blocco del minatore. Solo allora questi nodi aggiungono questo blocco alla fine della loro blockchain e accettano il nuovo stato dell'EVM come stato canonico.
7. Ogni nodo rimuove tutte le transazioni nel nuovo blocco dalla propria mempool locale di richieste di transazione non soddisfatte.
8. I nuovi nodi che si uniscono alla rete scaricano tutti i blocchi in sequenza, incluso il blocco contenente la nostra transazione di interesse. Inizializzano una copia locale dell'EVM (che inizia come un EVM a stato vuoto), e quindi passano attraverso il processo di esecuzione di ogni transazione in ogni blocco sopra la loro copia locale dell'EVM, verificando i checksum di stato ad ogni blocco lungo il percorso.

Ogni transazione viene minata (inclusa in un nuovo blocco e propagata per la prima volta) una volta, ma eseguita e verificata da ogni partecipante nel processo di avanzamento dello stato canonico dell'EVM. Questo evidenzia uno dei mantra centrali della blockchain: **Non fidarti, verifica**.

## Blocchi ommer (uncle) {#ommer-blocks}

Il minaggio dei blocchi sulla Proof-of-Work era probabilistico, il che significa che a volte due blocchi validi venivano pubblicati contemporaneamente a causa della latenza di rete. In questo caso, il protocollo doveva determinare la catena più lunga (e quindi più "valida") garantendo al contempo equità verso i minatori ricompensando parzialmente il blocco valido proposto non incluso. Ciò incoraggiava un'ulteriore decentralizzazione della rete poiché i minatori più piccoli, che potevano affrontare una maggiore latenza, potevano comunque generare rendimenti tramite le ricompense dei [blocchi ommer](/glossary/#ommer).

Il termine "ommer" è il termine neutro rispetto al genere preferito per il fratello di un blocco genitore, ma a volte viene anche definito "uncle" (zio). **Dal passaggio di Ethereum alla Proof-of-Stake, i blocchi ommer non vengono più minati** poiché viene eletto un solo proponente in ogni slot. Puoi vedere questo cambiamento visualizzando il [grafico storico](https://ycharts.com/indicators/ethereum_uncle_rate) dei blocchi ommer minati.

## Una demo visiva {#a-visual-demo}

Guarda Austin guidarti attraverso il minaggio e la blockchain Proof-of-Work.

<VideoWatch slug="blockchain-eth-build" />

## L'algoritmo di minaggio {#mining-algorithm}

La Mainnet di Ethereum ha utilizzato un solo algoritmo di minaggio: ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash era il successore di un algoritmo originale di ricerca e sviluppo noto come ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Maggiori informazioni sugli algoritmi di minaggio](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Argomenti correlati {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Prova di lavoro (PoW)](/developers/docs/consensus-mechanisms/pow/)