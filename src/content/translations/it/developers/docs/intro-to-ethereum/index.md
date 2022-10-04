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

Ethereum usa un [meccanismo di consenso basato sul Proof of Stake](/developers/docs/consensus-mechanisms/pos/). Chiunque voglia aggiungere nuovi blocchi alla catena deve mettere almeno 32 ETH in staking nel contratto di deposito ed eseguire il software del validatore. Può essere selezionato casualmente per proporre i blocchi che gli altri validatori verificano e aggiungono alla blockchain. In questo modello, solitamente c'è solo una catena, ma la latenza di rete e i comportamenti disonesti possono causare l'esistenza di diversi blocchi alla stessa posizione vicino alla testa della catena. Per risolvere questo problema, un algoritmo di scelta della diramazione seleziona una serie canonica di blocchi. I blocchi selezionati sono quelli che formano la catena più pesante possibile, dove 'pesante' si riferisce al numero di validatori che hanno convalidato i blocchi (ponderati per gli ETH che hanno in staking). Esiste un sistema di ricompense e sanzioni che incentiva fortemente i partecipanti a essere onesti e online il più possibile.

Se vuoi vedere come i dati degli hash della blockchain e il blocco precedente si riferiscono tutti ai blocchi passati, dai un'occhiata a [questa demo](https://andersbrownworth.com/blockchain/blockchain) di Anders Brownworth e guarda il video d'accompagnamento riportato sotto.

Guarda Anders che spiega gli hash nelle blockchain:

<YouTube id="_160oMzblY8" />

## Cos'è Ethereum? {#what-is-ethereum}

Ethereum è una blockchain con un computer incorporato. È la base per la creazione di app e organizzazioni in un modo decentralizzato, senza autorizzazioni e resistente alla censura.

Nell'universo di Ethereum c'è un unico computer canonico (chiamato macchina virtuale Ethereum o EVM) sul cui stato è d'accordo tutta la rete Ethereum. Chiunque partecipi alla rete Ethereum (ogni nodo Ethereum) ha una copia dello stato di questo computer. In più, ogni partecipante può trasmettere una richiesta affinché questo computer esegua calcoli arbitrari. Ogni volta che viene trasmessa una richiesta di questo tipo, gli altri partecipanti sulla rete verificano, convalidano e svolgono ("eseguono") il calcolo. Quest'esecuzione innesca un cambio di stato nell'EVM, che viene salvato e propagato su tutta la rete.

Le richieste di calcolo sono dette richieste di transazione; il registro di tutte le transazioni e dello stato presente dell'EVM viene memorizzato sulla blockchain, che a sua volta è memorizzata e concordata da tutti i nodi.

I meccanismi crittografici assicurano che una volta verificate come valide e aggiunte alla blockchain, le transazioni non possano essere successivamente manomesse. Gli stessi meccanismi assicurano inoltre che tutte le transazioni siano firmate ed eseguite con "permessi" appropriati (nessuno a parte Alice stessa dovrebbe essere in grado di inviare attivi digitali dal suo account).

## Cos'è un ether? {#what-is-ether}

**Ether (ETH)** è la criptovaluta nativa di Ethereum. Lo scopo di ETH è consentire un mercato per il calcolo. Un mercato di questo tipo fornisce un incentivo economico affinché i partecipanti verifichino ed eseguano le richieste di transazione e forniscano risorse di calcolo alla rete.

Ogni partecipante che trasmette una richiesta di transazione deve anche offrire un certo importo di ETH alla rete a titolo di ricompensa. La rete elargirà tale ricompensa a chiunque svolga il lavoro effettivo verificando la transazione, eseguendola, inviandola alla blockchain e trasmettendola alla rete.

L'importo di ETH pagato corrisponde al tempo necessario per eseguire il calcolo. Queste ricompense impediscono inoltre ai partecipanti malevoli di intasare intenzionalmente la rete richiedendo l'esecuzione di calcoli infiniti o altri script ad alta intensità di risorse, poiché tali partecipanti devono pagare per il tempo di calcolo.

L'ETH è inoltre usato per fornire sicurezza cripto-economica alla rete in tre modi principali: 1) è usato come un mezzo per ricompensare i validatori che propongono i blocchi o segnalano i comportamenti disonesti degli altri validatori; 2) è messo in staking dai validatori, fungendo da garanzia contro i comportamenti disonesti: se i validatori tentano di comportarsi in modo malevolo, i loro ETH possono esser distrutti; 3) è usato per ponderare i 'voti' per i blocchi appena proposti, alimentando la parte di scelta della diramazione del meccanismo di consenso.

## Cosa sono gli Smart Contract? {#what-are-smart-contracts}

In pratica, i partecipanti non scrivono nuovo codice ogni volta che desiderano richiedere un calcolo sull'EVM. Piuttosto, gli sviluppatori dell'applicazione caricano i programmi (frammenti di codice riutilizzabili) nello stato EVM e gli utenti richiedono di eseguire questi frammenti di codice con parametri variabili. Smart contract è il nome con il quale chiamiamo questi programmi caricati ed eseguiti dalla rete.

A un livello molto basilare, puoi pensare a uno smart contract come una sorta di distributore automatico: uno script che, quando viene chiamato con certi parametri, esegue delle azioni o dei calcoli se sono soddisfatte determinate condizioni. Per esempio, un semplice smart contract del fornitore potrebbe creare e assegnare la proprietà di un asset digitale se il richiedente invia ETH a un destinatario specifico.

Qualunque sviluppatore può creare uno smart contract e renderlo pubblico alla rete, usando la blockchain come proprio livello dati, in cambio di una commissione pagata alla rete. Qualunque utente può quindi chiamare questo smart contract per eseguire il suo codice, anche in questo caso pagando una commissione alla rete.

Dunque, con gli smart contract, gli sviluppatori possono creare e distribuire app rivolte agli utenti arbitrariamente complesse e servizi come marketplace, strumenti finanziari, giochi, ecc.

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

### Account {#accounts}

Dove sono conservati gli ETH. Gli utenti possono inizializzare account, depositare ETH negli account e trasferire ETH dai loro account ad altri utenti. Account e saldi degli account sono memorizzati in una grande tabella nell'EVM, fanno parte dello stato complessivo dell'EVM.

[Maggiori informazioni sugli account](/developers/docs/accounts/)

### Transazioni {#transactions}

"Richiesta di transazione" è il termine formale per indicare una richiesta di esecuzione del codice sull'EVM, mentre una "transazione" è una richiesta di transazione portata a termine e il cambiamento associato nello stato dell'EVM. Qualunque utente può trasmettere una richiesta di transazione alla rete da un nodo. Affinché la richiesta di transazione influenzi lo stato dell'EVM concordato, deve essere convalidata, eseguita e "inviata alla rete" da un altro nodo. L'esecuzione di codice innesca un cambiamento di stato dell'EVM; al salvataggio della transazione, questo cambiamento di stato viene trasmesso a tutti i nodi della rete. Alcuni esempi di transazione:

- Inviare X ETH dal mio account a quello di Alice.
- Pubblicare il codice di uno Smart Contract nello stato dell'EVM.
- Eseguire il codice dello Smart Contract all'indirizzo X dell'EVM, con argomenti Y.

[Maggiori informazioni sulle transazioni](/developers/docs/transactions/)

### Blocchi {#blocks}

Il volume di transazioni è molto alto, quindi le transazioni sono "salvate" in lotti, o blocchi. I blocchi generalmente contengono da decine a centinaia di transazioni.

[Maggiori informazioni sui blocchi](/developers/docs/blocks/)

### Smart Contract {#smart-contracts}

Uno snippet di codice riutilizzabile (programma) che uno sviluppatore pubblica nello stato dell'EVM. Chiunque può richiedere che il codice dello smart contract venga eseguito facendo una richiesta di transazione. Siccome gli sviluppatori possono scrivere applicazioni arbitrarie eseguibili nell'EVM (giochi, marketplace, strumenti finanziari, ecc) pubblicando smart contract, queste spesso sono chiamate [dapp o app decentralizzate](/developers/docs/dapps/).

[Maggiori informazioni sugli smart contract](/developers/docs/smart-contracts/)

## Letture consigliate {#further-reading}

- [Ethereum Whitepaper](/whitepaper/)
- [How does Ethereum work, anyway?](https://www.preethikasireddy.com/post/how-does-ethereum-work-anyway) - _Preethi Kasireddy_

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Tutorial correlati {#related-tutorials}

- [Una guida per sviluppatori a Ethereum, parte 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Un'esplorazione di Ethereum pensata per i principianti usando Python e web3.py_
