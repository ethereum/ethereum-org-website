---
title: Introduzione a Ethereum
description: Introduzione ai concetti fondamentali di Ethereum per sviluppatori di dapp.
lang: it
sidebar: true
---

## Cos'è una blockchain? {#what-is-a-blockchain}

Una blockchain si può descrivere come un database pubblico che viene aggiornato e condiviso fra molti computer in una rete.

"Blocco" si riferisce al fatto che i dati e lo stato vengono memorizzati in batch sequenziali o "blocchi". Se invii ETH a un altro utente, i dati della transazione devono essere aggiunti a un blocco affinché l'operazione riesca.

"Catena" si riferisce al fatto che ogni blocco fa riferimento crittograficamente al suo padre. I dati di un blocco non possono essere modificati senza modificare tutti i blocchi successivi, e questo richiederebbe il consenso di tutta la rete.

Ogni nuovo blocco, e la catena in generale, devono essere approvati da ogni nodo nella rete. In questo modo, ognuno ha gli stessi dati. Per fare questo, la blockchain ha bisogno di un meccanismo di consenso.

Ethereum attualmente utilizza un meccanismo di consenso basato sulla Proof of Work. Questo significa che chiunque voglia aggiungere nuovi blocchi alla catena deve risolvere un enigma difficile, che richiede molta potenza di calcolo. Risolvere l'enigma offre la prova (in inglese "proof") che sono state impiegate risorse di calcolo. Questa attività è detta [mining](/en/developers/docs/consensus-mechanisms/pow/mining/). Il mining può comportare tentativi ed errori, ma l'aggiunta di un blocco comporta una ricompensa in Eth. D'altra parte, inviare blocchi fraudolenti non è un'opzione interessante, considerate le risorse che devono essere impiegate per produrre il blocco.

I nuovi blocchi vengono trasmessi ai nodi della rete, controllati e verificati, aggiornando lo stato di tutti.

Quindi, ricapitolando, quando si inviano ETH a qualcuno, la transazione deve essere sottoposta a mining e inclusa in un nuovo blocco. Lo stato aggiornato viene quindi condiviso con l'intera rete. Più dettagli qui sotto.

Lascia che Austin ti accompagni attraverso la blockchain: <iframe width="100%" height="315" src="https://www.youtube.com/embed/zcX7OJ-L8XQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Cos'è Ethereum? {#what-is-ethereum}

Nell'universo di Ethereum c'è un unico computer canonico (chiamata macchina virtuale Ethereum o EVM) sul cui stato è d'accordo tutta la rete Ethereum. Chiunque partecipi alla rete Ethereum (ogni nodo Ethereum) ha una copia dello stato di questo computer. In più, ogni partecipante può trasmettere una richiesta di questo computer per eseguire calcoli arbitrari. Ogni volta che una richiesta di questo tipo viene trasmessa, gli altri partecipanti alla rete verificano, convalidano ed eseguono il calcolo. Questo provoca un cambio di stato dell'EVM, che viene salvato e propagato a tutta la rete.

Le richieste di calcolo sono dette richieste di transazione; il registro di tutte le transazioni, così come lo stato attuale dell'EVM, sono memorizzati nella blockchain, che a sua volta è archiviata e approvata da tutti i nodi.

I meccanismi crittografici assicurano che, una volta che le transazioni sono state verificate come valide e aggiunte alla blockchain, non possano essere manipolate in futuro; lo stesso meccanismo assicura inoltre che tutte le transazioni siano firmate ed eseguite con permessi appropriati (nessuno dovrebbe essere in grado di inviare risorse digitali dall'account di Alice, ad eccezione di Alice).

## Cos'è un ether? {#what-is-ether}

Lo scopo di Ether, la criptovaluta, è consentire l'esistenza di un mercato per il calcolo. Questo mercato costituisce un incentivo economico per i partecipanti per verificare/eseguire le richieste di transazione e per fornire risorse di calcolo alla rete.

Ogni partecipante che trasmette una transazione deve anche offrire un certo quantitativo di ether alla rete, come ricompensa da assegnare a chi poi si occuperà di verificare la transazione, eseguirla, salvarla nella blockchain e trasmetterla alla rete.

La quantità di ether pagati varia in funzione alla lunghezza del calcolo. Questo impedisce inoltre che partecipanti malevoli intasino intenzionalmente la rete inviando richieste di cicli infiniti o script con alta richiesta di risorse, perché verrebbero addebitati in continuazione.

## Cosa sono le dapp? {#what-are-dapps}

In pratica, i partecipanti non scrivono nuovo codice ogni volta che desiderano richiedere un calcolo sull'EVM. Gli sviluppatori di applicazioni caricano programmi (frammenti di codice riutilizzabili) nella memoria dell'EVM, e poi gli utenti effettuano richieste per l'esecuzione di questi frammenti di codice con parametri variabili. Smart Contract è il nome con il quale chiamiamo questi programmi caricati ed eseguiti dalla rete.

A livello molto basico, si può pensare a uno Smart Contract come a una sorta di distributore automatico: uno script che, quando viene chiamato con determinati parametri, esegue alcune azioni o calcoli se certe condizioni vengono soddisfatte. Per esempio, un semplice Smart Contract potrebbe creare e assegnare la proprietà di una risorsa digitale se il chiamante invia ether a un destinatario specifico.

Qualunque sviluppatore può creare uno Smart Contract e renderlo pubblico alla rete, usando la blockchain come proprio livello dati, in cambio di una commissione pagata alla rete. Qualunque utente può quindi chiamare questo Smart Contract per eseguire il suo codice, anche in questo caso pagando una commissione alla rete.

Così, con gli Smart Contract, gli sviluppatori possono creare e distribuire agli utenti app e servizi arbitrariamente complessi: marketplace, strumenti finanziari, videogiochi, ecc.

## Terminologia {#terminology}

### Blockchain {#blockchain}

La sequenza di tutti i blocchi che sono stati salvati nella rete Ethereum in tutta la sua storia. Chiamata così perché ogni blocco contiene un riferimento a quello precedente, che aiuta a mantenere un ordine su tutti i blocchi (e quindi sulla storia precisa).

### ETH {#eth}

La criptovaluta nativa di Ethereum. Gli utenti pagano ether ad altri utenti perché le loro richieste di esecuzione di codice vengano soddisfatte.

### EVM {#evm}

La macchina virtuale Ethereum è il computer virtuale globale sul cui stato ogni partecipante alla rete Ethereum concorda e che memorizza. Ogni partecipante può richiedere l'esecuzione di codice arbitrario all'EVM; l'esecuzione di codice cambia lo stato dell'EVM.

[Maggiori informazioni sull'EVM](/developers/docs/evm/)

### Nodi {#nodes}

Le macchine fisiche reali che conservano lo stato dell'EVM. I nodi comunicano tra di loro per propagare informazioni sullo stato dell'EVM e sui cambiamenti di stato. Ogni utente può anche richiedere l'esecuzione di codice trasmettendo la richiesta di esecuzione del codice da un nodo. La rete Ethereum è l'insieme di tutti i nodi Ethereum e delle loro comunicazioni.

[Maggiori informazioni sui nodi](/developers/docs/nodes-and-clients/)

### Account {#accounts}

Posizione in cui vengono conservati gli ether. Gli utenti possono inizializzare account, depositare ether negli account e trasferire ether dai loro account ad altri utenti. Account e saldi degli account sono memorizzati in una grande tabella nell'EVM, fanno parte dello stato complessivo dell'EVM.

[Maggiori informazioni sugli account](/developers/docs/accounts/)

### Transazioni {#transactions}

Una richiesta di transazione è il termine formale che indica una richiesta di esecuzione di codice all'EVM, e una transazione è una richiesta soddisfatta associata a un cambio di stato dell'EVM. Qualunque utente può trasmettere una richiesta di transazione alla rete da un nodo. Perché la richiesta di transazione abbia effetto sullo stato dell'EVM concordato, deve essere convalidata, eseguita e salvata nella rete da un altro nodo. L'esecuzione di codice causa un cambiamento di stato dell'EVM; al momento del salvataggio della transazione, questo cambiamento di stato viene trasmesso a tutti i nodi della rete. Alcuni esempi di transazione:

- Inviare X ether dal mio account all'account di Alice.
- Pubblicare il codice di uno Smart Contract nella memoria dell'EVM.
- Eseguire il codice dello Smart Contract all'indirizzo X dell'EVM, con argomenti Y.

[Maggiori informazioni sulle transazioni](/developers/docs/transactions/)

### Blocchi {#blocks}

Il volume delle transazioni è molto alto, così le transazioni sono salvate in lotti, o blocchi. I blocchi generalmente contengono da dozzine a centinaia di transazioni.

[Maggiori informazioni sui blocchi](/developers/docs/blocks/)

### Smart Contract {#smart-contracts}

Snippet di codice riutilizzabile (programma) che uno sviluppatore pubblica nella memora dell'EVM. Chiunque può richiedere che il codice dello Smart Contract venga eseguito facendo una richiesta di transazione. Siccome gli sviluppatori possono scrivere applicazioni arbitrarie eseguibili nell'EVM (videogiochi, marketplace, strumenti finanziari, ecc) pubblicando Smart Contract, queste spesso sono chiamate [dapp o app decentralizzate](/developers/docs/dapps/).

[Maggiori informazioni sugli Smart Contract](/en/developers/docs/smart-contracts/)

## Letture consigliate {#further-reading}

- [Ethereum Whitepaper](/whitepaper/)

## Tutorial correlati {#related-tutorials}

- [A developer's guide to Ethereum, part 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _: panoramica di base di Ethereum usando Python e web3.py, adatta ai principianti _
