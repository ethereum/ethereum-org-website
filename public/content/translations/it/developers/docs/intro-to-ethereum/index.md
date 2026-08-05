---
title: Introduzione tecnica a Ethereum
description: Un'introduzione ai concetti fondamentali di Ethereum per gli sviluppatori di dapp.
lang: it
---

## Cos'è una blockchain? {#what-is-a-blockchain}

Una blockchain è un database pubblico che viene aggiornato e condiviso tra molti computer in una rete.

"Blocco" si riferisce ai dati e allo stato archiviati in gruppi consecutivi noti come "blocchi". Se invii ETH a qualcun altro, i dati della transazione devono essere aggiunti a un blocco affinché l'operazione vada a buon fine.

"Catena" si riferisce al fatto che ogni blocco fa riferimento crittograficamente al suo genitore. In altre parole, i blocchi vengono incatenati insieme. I dati in un blocco non possono cambiare senza modificare tutti i blocchi successivi, il che richiederebbe il consenso dell'intera rete.

Ogni computer nella rete deve concordare su ogni nuovo blocco e sulla catena nel suo insieme. Questi computer sono noti come "nodi". I nodi assicurano che chiunque interagisca con la blockchain abbia gli stessi dati. Per raggiungere questo accordo distribuito, le blockchain necessitano di un meccanismo di consenso.

[Ethereum](/) utilizza un [meccanismo di consenso basato sulla Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/). Chiunque voglia aggiungere nuovi blocchi alla catena deve mettere in staking ETH (la valuta nativa di Ethereum) come collaterale ed eseguire il software del validatore. Questi "validatori" possono quindi essere selezionati casualmente per proporre blocchi che altri validatori controllano e aggiungono alla blockchain. Esiste un sistema di ricompense e penalità che incentiva fortemente i partecipanti a essere onesti e disponibili online il più possibile.

Se desideri vedere come i dati della blockchain vengono sottoposti ad hashing e successivamente aggiunti alla cronologia dei riferimenti dei blocchi, assicurati di dare un'occhiata a [questa demo](https://andersbrownworth.com/blockchain/blockchain) di Anders Brownworth e guarda il video di accompagnamento qui sotto.

Guarda Anders spiegare gli hash nelle blockchain:

<VideoWatch slug="blockchain-101-visual-demo" />

## Cos'è Ethereum? {#what-is-ethereum}

Ethereum è una blockchain con un computer integrato. È la base per creare app e organizzazioni in modo decentralizzato, permissionless e resistente alla censura.

Nell'universo di Ethereum, esiste un singolo computer canonico (chiamato Ethereum Virtual Machine, o EVM) sul cui stato tutti nella rete Ethereum concordano. Tutti coloro che partecipano alla rete Ethereum (ogni nodo Ethereum) conservano una copia dello stato di questo computer. Inoltre, qualsiasi partecipante può trasmettere una richiesta affinché questo computer esegua calcoli arbitrari. Ogni volta che viene trasmessa una richiesta del genere, gli altri partecipanti alla rete verificano, convalidano ed eseguono il calcolo. Questa esecuzione causa un cambiamento di stato nell'EVM, che viene confermato (committed) e propagato in tutta la rete.

Le richieste di calcolo sono chiamate richieste di transazione; il registro di tutte le transazioni e lo stato attuale dell'EVM vengono archiviati sulla blockchain, che a sua volta viene archiviata e concordata da tutti i nodi.

I meccanismi crittografici assicurano che, una volta che le transazioni sono verificate come valide e aggiunte alla blockchain, non possano essere manomesse in seguito. Gli stessi meccanismi assicurano inoltre che tutte le transazioni siano firmate ed eseguite con i "permessi" appropriati (nessuno dovrebbe essere in grado di inviare asset digitali dall'account di Alice, tranne Alice stessa).

## Cos'è l'ether? {#what-is-ether}

L'**ether (ETH)** è la criptovaluta nativa di Ethereum. Lo scopo di ETH è consentire un mercato per il calcolo. Tale mercato fornisce un incentivo economico ai partecipanti per verificare ed eseguire le richieste di transazione e fornire risorse computazionali alla rete.

Qualsiasi partecipante che trasmette una richiesta di transazione deve anche offrire una certa quantità di ETH alla rete come ricompensa. La rete brucerà parte della ricompensa e assegnerà il resto a chiunque alla fine svolga il lavoro di verificare la transazione, eseguirla, confermarla sulla blockchain e trasmetterla alla rete.

La quantità di ETH pagata corrisponde alle risorse necessarie per eseguire il calcolo. Queste ricompense impediscono inoltre ai partecipanti malintenzionati di intasare intenzionalmente la rete richiedendo l'esecuzione di calcoli infiniti o altri script ad alta intensità di risorse, poiché questi partecipanti devono pagare per le risorse di calcolo.

ETH viene utilizzato anche per fornire sicurezza cripto-economica alla rete in tre modi principali: 1) è utilizzato come mezzo per ricompensare i validatori che propongono blocchi o segnalano comportamenti disonesti da parte di altri validatori; 2) viene messo in staking dai validatori, fungendo da collaterale contro comportamenti disonesti: se i validatori tentano di comportarsi male, i loro ETH possono essere distrutti; 3) è utilizzato per pesare i "voti" per i nuovi blocchi proposti, alimentando la parte di scelta del fork del meccanismo di consenso.

## Cosa sono gli smart contract? {#what-are-smart-contracts}

In pratica, i partecipanti non scrivono nuovo codice ogni volta che vogliono richiedere un calcolo sull'EVM. Piuttosto, gli sviluppatori di applicazioni caricano programmi (frammenti di codice riutilizzabili) nello stato dell'EVM e gli utenti effettuano richieste per eseguire questi frammenti di codice con parametri variabili. Chiamiamo i programmi caricati ed eseguiti dalla rete "smart contract".

A un livello molto basilare, puoi pensare a uno smart contract come a una sorta di distributore automatico: uno script che, quando chiamato con determinati parametri, esegue alcune azioni o calcoli se vengono soddisfatte determinate condizioni. Ad esempio, un semplice smart contract di vendita potrebbe creare e assegnare la proprietà di un asset digitale se il chiamante invia ETH a un destinatario specifico.

Qualsiasi sviluppatore può creare uno smart contract e renderlo pubblico sulla rete, utilizzando la blockchain come livello dati, a fronte di una commissione pagata alla rete. Qualsiasi utente può quindi chiamare lo smart contract per eseguirne il codice, sempre a fronte di una commissione pagata alla rete.

Pertanto, con gli smart contract, gli sviluppatori possono creare e distribuire app e servizi rivolti agli utenti arbitrariamente complessi, come: marketplace, strumenti finanziari, giochi, ecc.

## Terminologia {#terminology}

### Blockchain {#blockchain}

La sequenza di tutti i blocchi che sono stati confermati sulla rete Ethereum nella storia della rete. Chiamata così perché ogni blocco contiene un riferimento al blocco precedente, il che ci aiuta a mantenere un ordinamento su tutti i blocchi (e quindi sulla cronologia precisa).

### ETH {#eth}

L'**ether (ETH)** è la criptovaluta nativa di Ethereum. Gli utenti pagano ETH ad altri utenti per far sì che le loro richieste di esecuzione del codice vengano soddisfatte.

[Maggiori informazioni su ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

L'Ethereum Virtual Machine è il computer virtuale globale sul cui stato ogni partecipante alla rete Ethereum archivia e concorda. Qualsiasi partecipante può richiedere l'esecuzione di codice arbitrario sull'EVM; l'esecuzione del codice modifica lo stato dell'EVM.

[Maggiori informazioni sull'EVM](/developers/docs/evm/)

### Nodi {#nodes}

Le macchine reali che archiviano lo stato dell'EVM. I nodi comunicano tra loro per propagare informazioni sullo stato dell'EVM e sui nuovi cambiamenti di stato. Qualsiasi utente può anche richiedere l'esecuzione di codice trasmettendo una richiesta di esecuzione del codice da un nodo. La rete Ethereum stessa è l'aggregato di tutti i nodi Ethereum e delle loro comunicazioni.

[Maggiori informazioni sui nodi](/developers/docs/nodes-and-clients/)

### Account {#accounts}

Dove viene archiviato l'ETH. Gli utenti possono inizializzare account, depositare ETH negli account e trasferire ETH dai propri account ad altri utenti. Gli account e i saldi degli account sono archiviati in una grande tabella nell'EVM; fanno parte dello stato complessivo dell'EVM.

[Maggiori informazioni sugli account](/developers/docs/accounts/)

### Transazioni {#transactions}

Una "richiesta di transazione" è il termine formale per una richiesta di esecuzione del codice sull'EVM, e una "transazione" è una richiesta di transazione soddisfatta e il cambiamento associato nello stato dell'EVM. Qualsiasi utente può trasmettere una richiesta di transazione alla rete da un nodo. Affinché la richiesta di transazione influisca sullo stato concordato dell'EVM, deve essere convalidata, eseguita e "confermata sulla rete" da un altro nodo. L'esecuzione di qualsiasi codice causa un cambiamento di stato nell'EVM; al momento della conferma, questo cambiamento di stato viene trasmesso a tutti i nodi della rete. Alcuni esempi di transazioni:

- Inviare X ETH dal mio account all'account di Alice.
- Pubblicare del codice di uno smart contract nello stato dell'EVM.
- Eseguire il codice dello smart contract all'indirizzo X nell'EVM, con gli argomenti Y.

[Maggiori informazioni sulle transazioni](/developers/docs/transactions/)

### Blocchi {#blocks}

Il volume delle transazioni è molto alto, quindi le transazioni vengono "confermate" in lotti, o blocchi. I blocchi contengono generalmente da dozzine a centinaia di transazioni.

[Maggiori informazioni sui blocchi](/developers/docs/blocks/)

### Smart contract {#smart-contracts}

Un frammento di codice riutilizzabile (un programma) che uno sviluppatore pubblica nello stato dell'EVM. Chiunque può richiedere che il codice dello smart contract venga eseguito effettuando una richiesta di transazione. Poiché gli sviluppatori possono scrivere applicazioni eseguibili arbitrarie nell'EVM (giochi, marketplace, strumenti finanziari, ecc.) pubblicando smart contract, queste sono spesso chiamate anche [applicazioni decentralizzate (dapp)](/developers/docs/dapps/).

[Maggiori informazioni sugli smart contract](/developers/docs/smart-contracts/)

## Passaggi successivi {#where-to-go-next}

La maggior parte dei lettori segue la documentazione in ordine, ma il percorso più breve dipende da cosa stai cercando di creare:

- **Dapp che interagiscono con Ethereum:** [account](/developers/docs/accounts/) e [transazioni](/developers/docs/transactions/), quindi scegli un [framework](/developers/docs/frameworks/).
- **Sviluppo di smart contract:** [smart contract](/developers/docs/smart-contracts/) e [linguaggi di programmazione](/developers/docs/programming-languages/).
- **Nodi e staking:** [nodi e client](/developers/docs/nodes-and-clients/), quindi [meccanismi di consenso](/developers/docs/consensus-mechanisms/).

## Letture consigliate {#further-reading}

- [Whitepaper di Ethereum](/whitepaper/)
- [Come funziona Ethereum, in ogni caso?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**NB** questa risorsa è ancora valida ma tieni presente che precede [The Merge](/roadmap/merge) e quindi si riferisce ancora al meccanismo di Prova di lavoro (PoW) di Ethereum; Ethereum è in realtà ora protetto utilizzando la [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos))

### Preferisci l'apprendimento visivo? {#visual-learner}

Questa serie di video offre un'esplorazione approfondita degli argomenti fondamentali:

<VideoWatch slug="ethereum-basics-intro" />

[Playlist sulle basi di Ethereum](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Tutorial correlati {#related-tutorials}

- [Guida a Ethereum per sviluppatori, parte 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Un'esplorazione di Ethereum molto adatta ai principianti utilizzando Python e web3.py_