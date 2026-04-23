---
title: Introduzione tecnica a Ethereum
description: Un'introduzione per sviluppatori di dApp ai concetti fondamentali di Ethereum.
lang: it
---

## Cos'è una blockchain? {#what-is-a-blockchain}

Una blockchain è un database pubblico che viene aggiornato e condiviso tra molti computer in una rete.

"Blocco" si riferisce ai dati e allo stato archiviati in gruppi consecutivi noti come "blocchi". Se invii ETH a qualcun altro, i dati della transazione devono essere aggiunti a un blocco affinché vada a buon fine.

"Catena" si riferisce al fatto che ogni blocco fa riferimento crittograficamente al suo genitore. In altre parole, i blocchi vengono incatenati insieme. I dati in un blocco non possono cambiare senza modificare tutti i blocchi successivi, il che richiederebbe il consenso dell'intera rete.

Ogni computer nella rete deve concordare su ogni nuovo blocco e sulla catena nel suo insieme. Questi computer sono noti come "nodi". I nodi assicurano che chiunque interagisca con la blockchain abbia gli stessi dati. Per raggiungere questo accordo distribuito, le blockchain necessitano di un meccanismo di consenso.

[Ethereum](/) utilizza un [meccanismo di consenso basato sulla prova di stake](/developers/docs/consensus-mechanisms/pos/). Chiunque voglia aggiungere nuovi blocchi alla catena deve mettere in stake ETH - la valuta nativa di Ethereum - come garanzia ed eseguire il software del validatore. Questi "validatori" possono quindi essere selezionati casualmente per proporre blocchi che altri validatori controllano e aggiungono alla blockchain. Esiste un sistema di ricompense e penalità che incentiva fortemente i partecipanti a essere onesti e disponibili online il più possibile.

Se desideri vedere come i dati della blockchain vengono sottoposti a hash e successivamente aggiunti alla cronologia dei riferimenti dei blocchi, assicurati di dare un'occhiata a [questa demo](https://andersbrownworth.com/blockchain/blockchain) di Anders Brownworth e guarda il video di accompagnamento qui sotto.

Guarda Anders spiegare gli hash nelle blockchain:

<YouTube id="_160oMzblY8" />

## Cos'è Ethereum? {#what-is-ethereum}

Ethereum è una blockchain con un computer incorporato. È la base per creare app e organizzazioni in modo decentralizzato, senza permessi e resistente alla censura.

Nell'universo di Ethereum, esiste un singolo computer canonico (chiamato macchina virtuale di Ethereum, o EVM) sul cui stato tutti nella rete Ethereum concordano. Chiunque partecipi alla rete Ethereum (ogni nodo Ethereum) conserva una copia dello stato di questo computer. Inoltre, qualsiasi partecipante può trasmettere una richiesta affinché questo computer esegua calcoli arbitrari. Ogni volta che una tale richiesta viene trasmessa, gli altri partecipanti alla rete verificano, convalidano ed eseguono il calcolo. Questa esecuzione causa un cambiamento di stato nell'EVM, che viene confermato e propagato in tutta la rete.

Le richieste di calcolo sono chiamate richieste di transazione; il registro di tutte le transazioni e lo stato attuale dell'EVM vengono archiviati sulla blockchain, che a sua volta viene archiviata e concordata da tutti i nodi.

I meccanismi crittografici assicurano che, una volta che le transazioni sono verificate come valide e aggiunte alla blockchain, non possano essere manomesse in seguito. Gli stessi meccanismi assicurano inoltre che tutte le transazioni siano firmate ed eseguite con i "permessi" appropriati (nessuno dovrebbe essere in grado di inviare risorse digitali dall'account di Alice, tranne Alice stessa).

## Cos'è l'ether? {#what-is-ether}

L'**Ether (ETH)** è la criptovaluta nativa di Ethereum. Lo scopo dell'ETH è consentire un mercato per il calcolo. Tale mercato fornisce un incentivo economico ai partecipanti per verificare ed eseguire le richieste di transazione e fornire risorse computazionali alla rete.

Qualsiasi partecipante che trasmette una richiesta di transazione deve anche offrire una certa quantità di ETH alla rete come ricompensa. La rete brucerà parte della ricompensa e assegnerà il resto a chiunque alla fine svolga il lavoro di verificare la transazione, eseguirla, confermarla sulla blockchain e trasmetterla alla rete.

La quantità di ETH pagata corrisponde alle risorse necessarie per eseguire il calcolo. Queste ricompense impediscono inoltre ai partecipanti malintenzionati di intasare intenzionalmente la rete richiedendo l'esecuzione di calcoli infiniti o altri script ad alta intensità di risorse, poiché questi partecipanti devono pagare per le risorse di calcolo.

L'ETH viene utilizzato anche per fornire sicurezza cripto-economica alla rete in tre modi principali: 1) è utilizzato come mezzo per ricompensare i validatori che propongono blocchi o denunciano comportamenti disonesti da parte di altri validatori; 2) Viene messo in stake dai validatori, fungendo da garanzia contro comportamenti disonesti: se i validatori tentano di comportarsi male, i loro ETH possono essere distrutti; 3) è utilizzato per pesare i 'voti' per i nuovi blocchi proposti, alimentando la parte di scelta della biforcazione del meccanismo di consenso.

## Cosa sono i contratti intelligenti? {#what-are-smart-contracts}

In pratica, i partecipanti non scrivono nuovo codice ogni volta che vogliono richiedere un calcolo sull'EVM. Piuttosto, gli sviluppatori di applicazioni caricano programmi (frammenti di codice riutilizzabili) nello stato dell'EVM e gli utenti effettuano richieste per eseguire questi frammenti di codice con parametri variabili. Chiamiamo i programmi caricati ed eseguiti dalla rete "contratti intelligenti".

A un livello molto basilare, puoi pensare a un contratto intelligente come a una sorta di distributore automatico: uno script che, quando chiamato con determinati parametri, esegue alcune azioni o calcoli se vengono soddisfatte determinate condizioni. Ad esempio, un semplice contratto intelligente di vendita potrebbe creare e assegnare la proprietà di una risorsa digitale se il chiamante invia ETH a un destinatario specifico.

Qualsiasi sviluppatore può creare un contratto intelligente e renderlo pubblico sulla rete, utilizzando la blockchain come livello dati, a fronte di una commissione pagata alla rete. Qualsiasi utente può quindi chiamare il contratto intelligente per eseguire il suo codice, sempre a fronte di una commissione pagata alla rete.

Pertanto, con i contratti intelligenti, gli sviluppatori possono creare e distribuire app e servizi rivolti agli utenti arbitrariamente complessi come: mercati, strumenti finanziari, giochi, ecc.

## Terminologia {#terminology}

### Blockchain {#blockchain}

La sequenza di tutti i blocchi che sono stati confermati sulla rete Ethereum nella storia della rete. Chiamata così perché ogni blocco contiene un riferimento al blocco precedente, il che ci aiuta a mantenere un ordine su tutti i blocchi (e quindi sulla cronologia precisa).

### ETH {#eth}

L'**Ether (ETH)** è la criptovaluta nativa di Ethereum. Gli utenti pagano ETH ad altri utenti per far soddisfare le loro richieste di esecuzione del codice.

[Maggiori informazioni sull'ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

La macchina virtuale di Ethereum è il computer virtuale globale il cui stato ogni partecipante alla rete Ethereum archivia e concorda. Qualsiasi partecipante può richiedere l'esecuzione di codice arbitrario sull'EVM; l'esecuzione del codice cambia lo stato dell'EVM.

[Maggiori informazioni sull'EVM](/developers/docs/evm/)

### Nodi {#nodes}

Le macchine reali che archiviano lo stato dell'EVM. I nodi comunicano tra loro per propagare informazioni sullo stato dell'EVM e sui nuovi cambiamenti di stato. Qualsiasi utente può anche richiedere l'esecuzione di codice trasmettendo una richiesta di esecuzione del codice da un nodo. La rete Ethereum stessa è l'aggregato di tutti i nodi Ethereum e delle loro comunicazioni.

[Maggiori informazioni sui nodi](/developers/docs/nodes-and-clients/)

### Account {#accounts}

Dove viene archiviato l'ETH. Gli utenti possono inizializzare account, depositare ETH negli account e trasferire ETH dai loro account ad altri utenti. Gli account e i saldi degli account sono archiviati in una grande tabella nell'EVM; fanno parte dello stato complessivo dell'EVM.

[Maggiori informazioni sugli account](/developers/docs/accounts/)

### Transazioni {#transactions}

Una "richiesta di transazione" è il termine formale per una richiesta di esecuzione del codice sull'EVM, e una "transazione" è una richiesta di transazione soddisfatta e il cambiamento associato nello stato dell'EVM. Qualsiasi utente può trasmettere una richiesta di transazione alla rete da un nodo. Affinché la richiesta di transazione influisca sullo stato concordato dell'EVM, deve essere convalidata, eseguita e "confermata sulla rete" da un altro nodo. L'esecuzione di qualsiasi codice causa un cambiamento di stato nell'EVM; al momento della conferma, questo cambiamento di stato viene trasmesso a tutti i nodi della rete. Alcuni esempi di transazioni:

- Inviare X ETH dal mio account all'account di Alice.
- Pubblicare del codice di un contratto intelligente nello stato dell'EVM.
- Eseguire il codice del contratto intelligente all'indirizzo X nell'EVM, con gli argomenti Y.

[Maggiori informazioni sulle transazioni](/developers/docs/transactions/)

### Blocchi {#blocks}

Il volume delle transazioni è molto alto, quindi le transazioni vengono "confermate" in lotti, o blocchi. I blocchi contengono generalmente da dozzine a centinaia di transazioni.

[Maggiori informazioni sui blocchi](/developers/docs/blocks/)

### Contratti intelligenti {#smart-contracts}

Un frammento di codice riutilizzabile (un programma) che uno sviluppatore pubblica nello stato dell'EVM. Chiunque può richiedere che il codice del contratto intelligente venga eseguito effettuando una richiesta di transazione. Poiché gli sviluppatori possono scrivere applicazioni eseguibili arbitrarie nell'EVM (giochi, mercati, strumenti finanziari, ecc.) pubblicando contratti intelligenti, queste sono spesso chiamate anche [dApp, o Applicazioni Decentralizzate](/developers/docs/dapps/).

[Maggiori informazioni sui contratti intelligenti](/developers/docs/smart-contracts/)

## Letture consigliate {#further-reading}

- [Whitepaper di Ethereum](/whitepaper/)
- [Come funziona Ethereum, in ogni caso?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**NB** questa risorsa è ancora valida ma tieni presente che precede [Il Merge](/roadmap/merge) e quindi si riferisce ancora al meccanismo di prova di lavoro di Ethereum - Ethereum è in realtà ora protetto utilizzando la [prova di stake](/developers/docs/consensus-mechanisms/pos))

### Preferisci l'apprendimento visivo? {#visual-learner}

Questa serie di video offre un'esplorazione approfondita degli argomenti fondamentali:

<YouTube id="j78ZcIIpi0Q"/>

[Playlist delle basi di Ethereum](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Conosci una risorsa della community che ti ha aiutato? Modifica questa pagina e aggiungila!_

## Tutorial correlati {#related-tutorials}

- [Una guida a Ethereum per sviluppatori, parte 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Un'esplorazione di Ethereum molto adatta ai principianti utilizzando Python e web3.py_