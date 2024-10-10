---
title: Introduzione a Ethereum
description: Introduzione ai concetti fondamentali di Ethereum per sviluppatori di dapp.
lang: it
---

## Cos'è una blockchain? {#what-is-a-blockchain}

Una blockchain si può descrivere come un database pubblico che viene aggiornato e condiviso fra molti computer in una rete.

"Blocco" si riferisce al fatto che i dati e lo stato vengono memorizzati in batch sequenziali o "blocchi". Se invii ETH a un altro utente, i dati della transazione devono essere aggiunti a un blocco affinché l'operazione riesca.

"Catena" si riferisce al fatto che ogni blocco fa riferimento crittograficamente al suo padre. In altre parole, i blocchi si incatenano tra loro. I dati in un blocco non possono cambiare senza modificare tutti i blocchi successivi, il che richiederebbe il consenso dell'intera rete.

Ogni computer nella rete deve acconsentire a ogni nuovo blocco e alla catena nel complesso. Questi computer sono noti come "nodi". I nodi assicurano che tutti coloro che interagiscono con la blockchain dispongono degli stessi dati. Per compiere questo accordo distribuito, le blockchain necessitano di un meccanismo di consenso.

Ethereum usa un [meccanismo di consenso basato sul Proof of Stake](/developers/docs/consensus-mechanisms/pos/). Chiunque voglia aggiungere nuovi blocchi alla catena deve mettere ETH – la valuta nativa di Ethereum – in staking a titolo di garanzia ed eseguire il software del validatore. Questi "validatori" possono quindi essere selezionati casualmente per proporre i blocchi che gli altri validatori verificano e aggiungono alla blockchain. Esiste un sistema di ricompense e sanzioni che incentiva fortemente i partecipanti a essere onesti e il più possibile disponibili online.

Se desideri vedere come avviene l'hashing dei dati della blockchain e la loro successiva aggiunta alla storia dei riferimenti dei blocchi, assicurati di consultare [questa demo](https://andersbrownworth.com/blockchain/blockchain) di Anders Brownworth e di guardare il video d'accompagnamento seguente.

Guarda Anders che spiega gli hash nelle blockchain:

<YouTube id="_160oMzblY8" />

## Cos'è Ethereum? {#what-is-ethereum}

Ethereum è una blockchain con un computer incorporato. È la base per la creazione di app e organizzazioni in un modo decentralizzato, senza autorizzazioni e resistente alla censura.

Nell'universo di Ethereum c'è un unico computer canonico (chiamato macchina virtuale Ethereum o EVM) sul cui stato è d'accordo tutta la rete Ethereum. Chiunque partecipi alla rete Ethereum (ogni nodo Ethereum) ha una copia dello stato di questo computer. In più, ogni partecipante può trasmettere una richiesta affinché questo computer esegua calcoli arbitrari. Ogni volta che viene trasmessa una richiesta di questo tipo, gli altri partecipanti sulla rete verificano, convalidano e svolgono ("eseguono") il calcolo. Quest'esecuzione innesca un cambio di stato nell'EVM, che viene salvato e propagato su tutta la rete.

Le richieste di calcolo sono dette richieste di transazione; il registro di tutte le transazioni e dello stato presente dell'EVM viene memorizzato sulla blockchain, che a sua volta è memorizzata e concordata da tutti i nodi.

I meccanismi crittografici assicurano che una volta verificate come valide e aggiunte alla blockchain, le transazioni non possano essere successivamente manomesse. Inoltre, gli stessi meccanismi assicurano che tutte le transazioni siano firmate ed eseguite con "permessi" appropriati (nessuno dovrebbe poter inviare risorse digitali dal conto di Alice, tranne la stessa Alice).

## Cos'è un ether? {#what-is-ether}

**Ether (ETH)** è la criptovaluta nativa di Ethereum. Lo scopo di ETH è consentire un mercato per il calcolo. Un mercato di questo tipo fornisce un incentivo economico affinché i partecipanti verifichino ed eseguano le richieste di transazione e forniscano risorse di calcolo alla rete.

Ogni partecipante che trasmette una richiesta di transazione deve anche offrire un certo importo di ETH alla rete a titolo di ricompensa. La rete brucerà parte della ricompensa, elargendo il resto a chiunque alla fine svolgerà il lavoro di verifica, esecuzione, invio alla blockchain e trasmissione della transazione alla rete.

L'importo di ETH pagato corrisponde alle risorse necessarie a eseguire il calcolo. Queste ricompense impediscono ai partecipanti malevoli di intasare intenzionalmente la rete, richiedendo l'esecuzione di calcoli infiniti o di altri script ad alta intensità di risorse, poiché tali partecipanti devono pagare per le risorse di calcolo.

L'ETH è inoltre usato per fornire sicurezza cripto-economica alla rete in tre modi principali: 1) è usato come un mezzo per ricompensare i validatori che propongono i blocchi o segnalano i comportamenti disonesti degli altri validatori; 2) è messo in staking dai validatori, fungendo da garanzia contro i comportamenti disonesti: se i validatori tentano di comportarsi in modo malevolo, i loro ETH possono esser distrutti; 3) è usato per ponderare i 'voti' per i blocchi appena proposti, alimentando la parte di scelta della diramazione del meccanismo di consenso.

## Cosa sono i contratti intelligenti? {#what-are-smart-contracts}

In pratica, i partecipanti non scrivono nuovo codice ogni volta che desiderano richiedere un calcolo sull'EVM. Piuttosto, gli sviluppatori dell'applicazione caricano i programmi (frammenti di codice riutilizzabili) nello stato EVM e gli utenti richiedono di eseguire questi frammenti di codice con parametri variabili. Chiamiamo i programmi caricati a ed eseguiti dai contratti intelligenti della rete.

A un livello molto basilare, puoi pensare a un contratto intelligente come una sorta di distributore automatico: uno script che, quando chiamato entro certi parametri, esegue delle azioni o dei calcoli, se certe condizioni sono soddisfatte. Ad esempio, il semplice contratto intelligente del fornitore potrebbe creare e assegnare la proprietà di una risorsa digitale se il chiamante invia ETH a un destinatario specifico.

Qualsiasi sviluppatore può creare un contratto intelligente e renderlo pubblico sulla rete, usando la blockchain come suo livello dei dati, per una commissione pagata alla rete. Qualsiasi utente può, quindi, chiamare il contratto intelligente a eseguire il proprio codice, anche in questo caso per una commissione pagata alla rete.

Dunque, con i contratti intelligenti, gli sviluppatori possono creare e distribuire arbitrariamente app e servizi rivolti agli utenti, come: mercati, strumenti finanziari, giochi, etc.

## Terminologia {#terminology}

### Blockchain {#blockchain}

La sequenza di tutti i blocchi che sono stati salvati nella rete Ethereum in tutta la sua storia. È chiamata in questo modo perché ciascun blocco contiene un riferimento a quello precedente, il che aiuta a mantenere un ordine tra tutti i blocchi (e quindi a livello della storia precisa).

### ETH {#eth}

**Ether (ETH)** è la criptovaluta nativa di Ethereum. Gli utenti pagano ETH ad altri utenti perché le loro richieste di esecuzione di codice vengano soddisfatte.

[Maggiori informazioni su ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

La Macchina Virtuale di Ethereum è il computer virtuale globale il cui stato è concordato e memorizzato da ogni partecipante alla rete Ethereum. Ogni partecipante può richiedere l'esecuzione di codice arbitrario all'EVM; l'esecuzione di codice cambia lo stato dell'EVM.

[Maggiori informazioni sull'EVM](/developers/docs/evm/)

### Nodi {#nodes}

Le macchine fisiche reali che conservano lo stato dell'EVM. I nodi comunicano tra di loro per propagare informazioni sullo stato dell'EVM e sui cambiamenti di stato. Ogni utente può inoltre richiedere l'esecuzione del codice trasmettendo una richiesta di esecuzione di codice da un nodo. La rete Ethereum è l'insieme di tutti i nodi Ethereum e delle loro comunicazioni.

[Maggiori informazioni sui nodi](/developers/docs/nodes-and-clients/)

### Conti {#accounts}

Dove sono conservati gli ETH. Gli utenti possono inizializzare i conti, depositare ETH nei conti e trasferire ETH dai propri conti ad altri utenti. I conti e i loro saldi sono archiviati in una grande tabella nell'EVM; sono parte dello stato complessivo dell'EVM.

[Di più sui conti](/developers/docs/accounts/)

### Transazioni {#transactions}

"Richiesta di transazione" è il termine formale per indicare una richiesta di esecuzione del codice sull'EVM, mentre una "transazione" è una richiesta di transazione portata a termine e il cambiamento associato nello stato dell'EVM. Qualunque utente può trasmettere una richiesta di transazione alla rete da un nodo. Affinché la richiesta di transazione influenzi lo stato dell'EVM concordato, deve essere convalidata, eseguita e "inviata alla rete" da un altro nodo. L'esecuzione di codice innesca un cambiamento di stato dell'EVM; al salvataggio della transazione, questo cambiamento di stato viene trasmesso a tutti i nodi della rete. Alcuni esempi di transazione:

- Inviare X ETH dal mio conto a quello di Alice.
- Pubblicare il codice di un contratto intelligente nello stato dell'EVM.
- Eseguire il codice del contratto intelligente all'indirizzo X nell'EVM, con gli argomenti Y.

[Maggiori informazioni sulle transazioni](/developers/docs/transactions/)

### Blocchi {#blocks}

Il volume di transazioni è molto alto, quindi le transazioni sono "salvate" in lotti, o blocchi. I blocchi generalmente contengono da decine a centinaia di transazioni.

[Maggiori informazioni sui blocchi](/developers/docs/blocks/)

### Contratti intelligenti {#smart-contracts}

Uno snippet di codice riutilizzabile (programma) che uno sviluppatore pubblica nello stato dell'EVM. Chiunque può richiedere che il codice del contratto intelligente sia eseguito effettuando una richiesta di transazione. Poiché gli sviluppatori possono scrivere applicazioni arbitrarie eseguibili nell'EVM (giochi, mercati, strumenti finanziari, etc.) pubblicando i contratti intelligenti, questi sono anche spesso detti [dapp, o App Decentralizzate](/developers/docs/dapps/).

[Di più sui contratti intelligenti](/developers/docs/smart-contracts/)

## Letture consigliate {#further-reading}

- [Ethereum Whitepaper](/whitepaper/)
- [How does Ethereum work, anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**NB**: questa risorsa è ancora preziosa, ma sappiate che è precedente a [La Fusione](/roadmap/merge) e pertanto si riferisce ancora al meccanismo di proof-of-work di Ethereum; di fatto Ethereum è ormai protetta utilizzando il [proof-of-stake](/developers/docs/consensus-mechanisms/pos))

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Tutorial correlati {#related-tutorials}

- [Una guida per sviluppatori a Ethereum, parte 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Un'esplorazione di Ethereum pensata per i principianti usando Python e web3.py_
