---
title: Introduzione a Ethereum
description: Introduzione ai concetti fondamentali di Ethereum per sviluppatori di dapp.
lang: it
sidebar: true
---

## Cos'è una blockchain? {#what-is-a-blockchain}

Una blockchain si può descrivere come un database pubblico che viene aggiornato e condiviso fra molti computer in una rete.

"Blocco" si riferisce al fatto che i dati e lo stato vengono memorizzati in batch sequenziali o "blocchi". Se invii ETH a un altro utente, i dati della transazione devono essere aggiunti a un blocco affinché l'operazione riesca.

"Catena" si riferisce al fatto che ogni blocco fa riferimento crittograficamente al suo padre. In altre parole, i blocchi si incatenano tra loro. I dati in un blocco non possono cambiare senza modificare tutti i blocchi successivi, il che richiederebbe il consenso dell'intera rete.

Ogni computer nella rete deve acconsentire a ogni nuovo blocco e alla catena nel complesso. Questi computer sono noti come "nodi". I nodi assicurano che tutti coloro che interagiscono con la blockchain dispongono degli stessi dati. Per compiere questo accordo distribuito, le blockchain necessitano di un meccanismo di consenso.

Al momento Ethereum usa un meccanismo di consenso basato sul [Proof of Work](/developers/docs/consensus-mechanisms/pow/). Questo significa che chiunque voglia aggiungere nuovi blocchi alla catena deve risolvere un enigma difficile, che richiede molta potenza di calcolo. Risolvere l'enigma offre la prova (in inglese "proof") che sono state impiegate risorse di calcolo. Questa attività è detta [mining](/developers/docs/consensus-mechanisms/pow/mining/). In genere il mining consiste in un processo di forza bruta basato su ripetuti tentativi ed errori, ma l'aggiunta effettiva di un blocco viene ricompensata in ETH.

I nuovi blocchi vengono trasmessi ai nodi della rete, controllati e verificati, aggiornando lo stato di tutti.

Quindi, ricapitolando, quando si inviano ETH a qualcuno, la transazione deve essere sottoposta a mining e inclusa in un nuovo blocco. Lo stato aggiornato viene quindi condiviso con l'intera rete.

Lascia che Austin ti accompagni attraverso la blockchain:

<YouTube id="zcX7OJ-L8XQ" />

Se vuoi vedere come i dati degli hash della blockchain e il blocco precedente si riferiscono tutti ai blocchi passati, dai un'occhiata a [questa demo](https://andersbrownworth.com/blockchain/blockchain) di Anders Brownworth e guarda il video d'accompagnamento riportato sotto.

Guarda Anders che spiega gli hash nelle blockchain:

<YouTube id="_160oMzblY8" />

## Cos'è Ethereum? {#what-is-ethereum}

Nell'universo di Ethereum c'è un unico computer canonico (chiamata macchina virtuale Ethereum o EVM) sul cui stato è d'accordo tutta la rete Ethereum. Chiunque partecipi alla rete Ethereum (ogni nodo Ethereum) ha una copia dello stato di questo computer. In più, ogni partecipante può trasmettere una richiesta affinché questo computer esegua calcoli arbitrari. Ogni volta che viene trasmessa una richiesta di questo tipo, gli altri partecipanti sulla rete verificano, convalidano e svolgono ("eseguono") il calcolo. Quest'esecuzione innesca un cambio di stato nell'EVM, che viene salvato e propagato su tutta la rete.

Le richieste di calcolo sono dette richieste di transazione; il registro di tutte le transazioni e dello stato presente dell'EVM viene memorizzato sulla blockchain, che a sua volta è memorizzata e concordata da tutti i nodi.

I meccanismi crittografici assicurano che una volta verificate come valide e aggiunte alla blockchain, le transazioni non possano essere successivamente manomesse. Gli stessi meccanismi assicurano inoltre che tutte le transazioni siano firmate ed eseguite con "permessi" appropriati (nessuno a parte Alice stessa dovrebbe essere in grado di inviare attivi digitali dal suo account).

## Cos'è un ether? {#what-is-ether}

**Ether (ETH)** è la criptovaluta nativa di Ethereum. Lo scopo dell'ether è consentire un mercato per i calcoli. Un mercato di questo tipo fornisce un incentivo economico affinché i partecipanti verifichino ed eseguano le richieste di transazione e forniscano risorse di calcolo alla rete.

Ogni partecipante che trasmette una richiesta di transazione deve anche offrire alla rete un certo importo di ether a titolo di ricompensa. Tale ricompensa viene elargita a chiunque svolga il lavoro effettivo verificando la transazione, eseguendola, inviandola alla blockchain e trasmettendola alla rete.

L'importo di ether pagato corrisponde al tempo necessario per eseguire il calcolo. Queste ricompense impediscono inoltre ai partecipanti malevoli di intasare intenzionalmente la rete richiedendo l'esecuzione di calcoli infiniti o altri script ad alta intensità di risorse, poiché tali partecipanti devono pagare per il tempo di calcolo.

## Cosa sono gli Smart Contract? {#what-are-smart-contracts}

In pratica, i partecipanti non scrivono nuovo codice ogni volta che desiderano richiedere un calcolo sull'EVM. Piuttosto, gli sviluppatori dell'applicazione caricano i programmi (frammenti di codice riutilizzabili) nell'archiviazione EMV e gli utenti richiedono di eseguire questi frammenti di codice con parametri variabili. Smart contract è il nome con il quale chiamiamo questi programmi caricati ed eseguiti dalla rete.

A un livello molto basilare, puoi pensare a uno smart contract come una sorta di distributore automatico: uno script che, quando viene chiamato con certi parametri, esegue delle azioni o dei calcoli se sono soddisfatte determinate condizioni. Per esempio, un semplice smart contract potrebbe creare e assegnare la proprietà di un asset digitale se il richiedente invia ether a un destinatario specifico.

Qualunque sviluppatore può creare uno smart contract e renderlo pubblico sulla rete, usando la blockchain come livello di dati, in cambio di una commissione pagata alla rete. Qualunque utente può quindi richiedere a questo smart contract di eseguire il suo codice, anche in questo caso pagando una commissione alla rete.

Dunque, con gli smart contract, gli sviluppatori possono creare e distribuire app rivolte agli utenti arbitrariamente complesse e servizi come marketplace, strumenti finanziari, giochi, ecc.

## Terminologia {#terminology}

### Blockchain {#blockchain}

La sequenza di tutti i blocchi che sono stati salvati nella rete Ethereum in tutta la sua storia. È chiamata in questo modo perché ciascun blocco contiene un riferimento a quello precedente, il che aiuta a mantenere un ordine a livello di tutti i blocchi (e quindi a livello della storia precisa).

### ETH {#eth}

La criptovaluta nativa di Ethereum. Gli utenti pagano ether ad altri utenti affinché le loro richieste di esecuzione di codice vengano soddisfatte.

[Maggiori informazioni su ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

La Macchina Virtuale Ethereum è il computer virtuale globale, il cui stato è concordato e memorizzato da ogni partecipante alla rete Ethereum. Ogni partecipante può richiedere l'esecuzione di codice arbitrario sull'EVM; l'esecuzione di codice cambia lo stato dell'EVM.

[Maggiori informazioni sull'EVM](/developers/docs/evm/)

### Nodi {#nodes}

Le macchine fisiche che memorizzano lo stato dell'EVM. I nodi comunicano tra di loro per propagare informazioni sullo stato dell'EVM e sui nuovi cambiamenti di stato. Ogni utente può inoltre richiedere l'esecuzione del codice trasmettendo una richiesta di esecuzione del codice da un nodo. La rete Ethereum è l'insieme di tutti i nodi Ethereum e delle loro comunicazioni.

[Maggiori informazioni sui nodi](/developers/docs/nodes-and-clients/)

### Account {#accounts}

Luogo in cui vengono conservati gli ether. Gli utenti possono inizializzare account, depositare ether negli account e trasferire ether dai loro account ad altri utenti. Account e saldi degli account sono memorizzati in una grande tabella nell'EVM; fanno parte dello stato complessivo dell'EVM.

[Maggiori informazioni sugli account](/developers/docs/accounts/)

### Transazioni {#transactions}

"Richiesta di transazione" è il termine formale per indicare una richiesta di esecuzione del codice sull'EVM, mentre una "transazione" è una richiesta di transazione portata a termine e il cambiamento associato nello stato dell'EVM. Qualunque utente può trasmettere una richiesta di transazione alla rete da un nodo. Affinché la richiesta di transazione influenzi lo stato dell'EVM concordato, deve esser convalidata, eseguita e "inviata alla rete" da un altro nodo. L'esecuzione di codice innesca un cambiamento di stato dell'EVM; al salvataggio della transazione, questo cambiamento di stato viene trasmesso a tutti i nodi della rete. Alcuni esempi di transazione:

- Invio di X ether dal mio account a quello di Alice.
- Pubblicare il codice di uno Smart Contract nella memoria dell'EVM.
- Eseguire il codice dello Smart Contract all'indirizzo X dell'EVM, con argomenti Y.

[Maggiori informazioni sulle transazioni](/developers/docs/transactions/)

### Blocchi {#blocks}

Il volume di transazioni è molto alto, quindi le transazioni sono "salvate" in lotti o blocchi. In genere i blocchi contengono da dozzine a centinaia di transazioni.

[Maggiori informazioni sui blocchi](/developers/docs/blocks/)

### Smart Contract {#smart-contracts}

Uno snippet di codice riutilizzabile (programma) che uno sviluppatore pubblica nella memoria dell'EVM. Chiunque può richiedere che il codice dello smart contract venga eseguito effettuando una richiesta di transazione. Siccome gli sviluppatori possono scrivere applicazioni arbitrarie eseguibili nell'EVM (videogiochi, marketplace, strumenti finanziari, ecc.) pubblicando smart contract, spesso queste sono chiamate [dApp o app decentralizzate](/developers/docs/dapps/).

[Maggiori informazioni sugli Smart Contract](/developers/docs/smart-contracts/)

## Letture consigliate {#further-reading}

- [Ethereum Whitepaper](/whitepaper/)
- [How does Ethereum work, anyway?](https://www.preethikasireddy.com/post/how-does-ethereum-work-anyway) - _Preethi Kasireddy_

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_

## Tutorial correlati {#related-tutorials}

- [A developer's guide to Ethereum, part 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _: panoramica di base di Ethereum usando Python e web3.py, adatta ai principianti _
