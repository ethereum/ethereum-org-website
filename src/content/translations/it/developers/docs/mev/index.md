---
title: Valore estraibile massimo (MEV)
description: Un'introduzione al valore estraibile massimo (MEV)
lang: it
---

Il valore estraibile massimo (MEV) si riferisce al valore massimo che può essere estratto dalla produzione del blocco oltre alla ricompensa del blocco standard e alle commissioni del gas, includendo, escludendo e modificando l'ordine delle transazioni in un blocco.

### Valore estraibile del minatore

Questo concetto è stato applicato per la prima volta nell'ambito del [proof-of-work](/developers/docs/consensus-mechanisms/pow/) ed è stato inizialmente denominato "valore estraibile del minatore". Questo perché nel Proof of Work i miner controllano l'inclusione, l'esclusione e l'ordinamento della transazione. Tuttavia, dopo la transizione al proof-of-stake tramite [La Fusione](/upgrades/merge), i validatori saranno responsabili di questi ruoli e il mining non sarà più applicabile. Questi metodi di estrazione del valore persisteranno dopo la transizione e proprio per questo è stato necessario modificare il nome. Per conservare lo stesso acronimo a scopo di continuità e mantenere al contempo lo stesso significato fondamentale, ora utilizziamo "valore estraibile massimo" come alternativa più inclusiva.

## Prerequisiti {#prerequisites}

Assicurati di avere familiarità con [transazioni](/developers/docs/transactions/), [blocchi](/developers/docs/blocks/), [gas](/developers/docs/gas/) e [mining](/developers/docs/consensus-mechanisms/pow/mining/). Anche la familiarità con [dApp](/dapps/) e [DeFi](/defi/) è utile.

## Estrazione del MEV {#mev-extraction}

In teoria, il MEV proviene interamente dai minatori, poiché questi sono la sola parte in grado di garantire l'esecuzione di un'opportunità di MEV redditizia (almeno sull'attuale catena di proof-of-work - questo cambierà dopo [La Fusione](/upgrades/merge/)). Nella pratica, tuttavia, una grande porzione del MEV è estratta da partecipanti indipendenti della rete, chiamati "ricercatori". I ricercatori eseguono algoritmi complessi sui dati della blockchain per rilevare opportunità di MEV redditizie e si servono di bot per inviare automaticamente tali transazioni redditizie alla rete.

I miner ottengono comunque una parte dell'importo del MEV intero siccome i ricercatori sono disposti a pagare commissioni del carburante elevate (che vanno al miner), in cambio di una maggior probabilità d'inclusione delle loro transazioni redditizie in un blocco. Presumendo che i ricercatori siano economicamente razionali, la commissione del carburante che un ricercatore è disposto a pagare sarà pari fino al 100% del MEV del ricercatore (infatti, se la commissione del carburante fosse maggiore, il ricercatore perderebbe denaro).

Così, per alcune opportunità MEV altamente competitive, come l'[arbitraggio DEX](#mev-examples-dex-arbitrage), i ricercatori potrebbero dover pagare il 90% (o persino di più) dei loro ricavi MEV complessivi in commissioni del carburante al miner, in quanto sono tante le persone interessate a compiere lo stesso scambio di arbitraggio redditizio. Questo perché l'unico modo per garantire che la loro transazione di arbitraggio funzioni è quello di inviare la transazione con il prezzo del carburante più alto.

### Golfing del carburante {#mev-extraction-gas-golfing}

Con questa dinamica, chi è bravo nel "golfing del carburante", ovvero la programmazione delle transazioni in modo che consumino la quantità minima di gas, ha un vantaggio competitivo, in quanto consente ai ricercatori di impostare un prezzo del carburante maggiore pur mantenendo costanti le commissioni del carburante totali (poiché commissioni del carburante = prezzo del carburante \* carburante utilizzato).

Tra le tecniche di golfing del carburante più diffuse vi è quella di usare indirizzi che iniziano con una lunga stringa di zeri (ad es. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)), poiché occupano meno spazio di archiviazione (e dunque meno gas), oppure quella di lasciare piccoli saldi di token [ERC-20](/developers/docs/standards/tokens/erc-20/) nei contratti, poiché inizializzare uno slot di archiviazione costa più carburante (se il saldo è 0) rispetto a quello necessario per aggiornarne uno. Individuare altre tecniche per ridurre il consumo di carburante è un'area di ricerca attiva tra i ricercatori.

### Frontrunner generalizzati {#mev-extraction-generalized-frontrunners}

Anziché programmare algoritmi complessi per rilevare opportunità di MEV redditizie, alcuni ricercatori eseguono frontrunner generalizzati. I frontrunner generalizzati sono bot che tengono d'occhio il mempool per individuare le transazioni redditizie. Il frontrunner copierà il codice della transazione potenzialmente redditizia, sostituirà gli indirizzi con il proprio ed eseguirà la transazione localmente per verificare due volte che la transazione modificata risulti in un profitto all'indirizzo del frontrunner. Se la transazione è effettivamente redditizia, il frontrunner invierà la transazione modificata con l'indirizzo sostituito e un prezzo del carburante maggiorato, eseguendo il "frontrunning" della transazione originale e ottenendo il MEV del ricercatore originale.

### Flashbot {#mev-extraction-flashbots}

I flashbot sono un progetto indipendente che estende il client di go-ethereum con un servizio che consente ai ricercatori di inviare le transazioni del MEV ai miner senza rivelarli al mempool pubblico. Questo impedisce ai frontrunner generalizzati di eseguire frontrun sulle transazioni.

Al momento della redazione del presente articolo, una porzione significativa di transazioni MEV viene indirizzata attraverso i Flashbot; ciò significa che i frontrunner generalizzati non sono efficaci come in passato.

## Esempi di MEV {#mev-examples}

Il MEV emerge sulla blockchain in diversi modi.

### Arbitraggio DEX {#mev-examples-dex-arbitrage}

L'arbitraggio dello [scambio decentralizzato](/glossary/#dex) (DEX) è l'opportunità di MEV più semplice e più diffusa. Ne risulta che è anche la più competitiva.

Funziona come segue: se due DEX offrono un token a due prezzi diversi, qualcuno può acquistare il token sul DEX al prezzo minore e rivenderlo sul DEX al prezzo maggiore in un'unica transazione atomica. Grazie ai meccanismi della blockchain, questo è vero e proprio arbitraggio privo di rischi.

[Ecco un esempio](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) di transazione d'arbitraggio redditizia in cui un ricercatore ha trasformato 1.000 ETH in 1.045 ETH sfruttando i diversi prezzi della coppia ETH/DAI su Uniswap vs. Sushiswap.

### Liquidazioni {#mev-examples-liquidations}

Le liquidazioni del protocollo di prestito presentano un'altra ben nota opportunità di MEV.

I protocolli di prestito come Maker e Aave funzionano richiedendo agli utenti di depositare qualche tipo di garanzia (es. ETH). Gli utenti possono quindi prendere in prestito attivi e token diversi da altri, a seconda delle loro esigenze (ad esempio possono prendere in prestito MKR se vogliono votare su una proposta di governance di MakerDAO o SUSHI se vogliono guadagnare una porzione delle commissioni di trading su Sushiswap) fino a un certo importo della loro garanzia depositata, per esempio il 30% (l'esatta percentuale della capacità di prestito è determinata dal protocollo). In questo caso gli utenti da cui prendono in prestito gli altri token fungono da creditori.

Al fluttuare del valore della garanzia di un debitore, fluttua anche la capacità di prestito. Se, a causa delle fluttuazioni del mercato, il valore degli attivi presi in presi in prestito supera, ad esempio, il 30% del valore della loro garanzia (anche in questo caso l'esatta percentuale è determinata dal protocollo), il protocollo consente tipicamente a chiunque di liquidare la garanzia, pagando istantaneamente i creditori (in modo simile al funzionamento dei [margini aggiuntivi](https://www.investopedia.com/terms/m/margincall.asp) nella finanza tradizionale). In caso di liquidazione, il debitore deve solitamente pagare una cospicua commissione di liquidazione, parte della quale va al liquidatore; ed è qui che risiede l'opportunità di MEV.

I ricercatori competono per analizzare i dati della blockchain il più velocemente possibile per determinare quali debitori sono liquidabili ed essere i primi a inviare una transazione di liquidazione e raccogliere la commissione di liquidazione per se stessi.

### Sandwich trading {#mev-examples-sandwich-trading}

Il sandwich trading è un altro metodo comune di estrazione del MEV.

Per eseguirlo, un ricercatore osserverà il mempool alla ricerca di scambi di DEX di notevole entità. Per esempio, supponiamo che qualcuno voglia comprare 10.000 UNI con DAI su Uniswap. Uno scambio di tale portata avrà un effetto significativo sulla coppia UNI/DAI, aumentando in modo potenzialmente importante il prezzo di UNI rispetto al DAI.

Un ricercatore può calcolare l'effetto approssimativo del prezzo di questo scambio di ampia portata sulla coppia UNI/DAI ed eseguire un acquisto ottimale immediatamente _prima_ di esso, acquistando UNI a basso costo per poi eseguire l'ordine di vendita immediatamente _dopo_ lo scambio, vendendolo a un prezzo superiore, causato dallo stesso ordine.

Il sandwiching, tuttavia, è più rischioso non essendo atomico (a differenza dell'arbitraggio di DEX, come descritto sopra) ed è soggetto a un [attacco di salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV nel mondo dei NFT {#mev-examples-nfts}

Nel mondo dei NFT, il MEV è un fenomeno emergente e non necessariamente redditizio.

Tuttavia, poiché le transazioni di NFT hanno luogo sulla stessa blockchain condivisa da tutte le transazioni di Ethereum, i ricercatori possono usare tecniche simili a quelle usate per le opportunità di MEV tradizionali anche nel mercato dei NFT.

Per esempio, se si verifica un calo a livello di un NFT popolare e un ricercatore vuole un certo NFT o una serie di NFT, può programmare una transazione in modo tale da essere il primo ad acquistare il NTF o l'intera serie di NTF in una sola transazione. Oppure, se un NFT viene [erroneamente elencato a un prezzo basso](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), un ricercatore può scavalcare gli altri acquirenti e ottenerlo a buon mercato.

Un esempio eloquente di MEV nel mondo dei NFT si è verificato quando un ricercatore ha speso $7 milioni per [comprare](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) ogni singolo Cryptopunk al prezzo di base. Un ricercatore della blockchain [ha spiegato su Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) come l'acquirente avesse lavorato con un fornitore di MEV per mantenere segreto l'acquisto.

### La lunga coda {#mev-examples-long-tail}

L'arbitraggio di DEX, le liquidazioni e il sandwich trading sono tutte opportunità di MEV ben note e difficilmente saranno redditizie per i nuovi ricercatori. Tuttavia, esiste una lunga coda di opportunità di MEV meno note (il MEV nel mondo dei NFT è probabilmente una di esse).

I ricercatori che stanno muovendo i primi passi potrebbero avere maggiore successo ricercando MEV in questa lunga coda. La [MEV job board](https://github.com/flashbots/mev-job-board) del flashbot elenca alcune opportunità emergenti.

## Effetti del MEV {#effects-of-mev}

Il MEV non è una cosa negativa: su Ethereum ci sono conseguenze sia positive che negative connesse al MEV.

### Aspetti positivi {#effects-of-mev-the-good}

Molti progetti di DeFi si basano su attori economicamente razionali per assicurare l'utilità e stabilità dei loro protocolli. Per esempio, l'arbitraggio di DEX assicura che gli utenti ottengano i prezzi migliori e più corretti per i loro token, mentre i protocolli di prestito si basano su liquidazioni rapide quando i debitori scendono al di sotto dei coefficienti di garanzia per garantire il rimborso dei creditori.

Senza ricercatori razionali che cercano e correggono le inefficienze economiche e sfruttano gli incentivi economici dei protocolli, i protocolli DeFi e le dApp in generale potrebbero perdere la robustezza che esibiscono oggi.

### Aspetti negativi {#effects-of-mev-the-bad}

A livello di applicazione, alcune forme di MEV, come il sandwich trading, si traducono in un'esperienza inequivocabilmente peggiore per gli utenti. Gli utenti che ricevono il sandwich subiscono un maggiore slittamento e una peggiore esecuzione delle loro operazioni.

A livello di rete, i frontrunner generalizzati e le aste dei prezzi del carburante che spesso intraprendono (quando due o più frontrunner competono affinché la loro transazione sia inclusa nel blocco successivo aumentando progressivamente il prezzo del carburante delle loro transazioni) determinano la congestione della rete e l'aumento dei prezzi del carburante per tutti gli altri soggetti che provino a eseguire transazioni regolari.

Oltre a ciò che si verifica _all'interno_ dei blocchi, il MEV può avere effetti deleteri _tra_ i blocchi. Se il MEV disponibile in un blocco eccede significativamente la ricompensa del blocco standard, i miner potrebbero essere incentivati a ri-minare i blocchi e catturare da soli il MEV, provocando la riorganizzazione della blockchain e l'instabilità del consenso.

Questa possibile riorganizzazione della blockchain è stata [precedentemente esplorata sulla blockchain di Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Poiché le metà delle ricompense del blocco e le commissioni di transazione di Bitcoin costituiscono una porzione sempre più consistente della ricompensa del blocco, si presentano situazioni in cui diventa economicamente razionale per i miner rinunciare alla ricompensa del blocco successivo e ri-minare invece i blocchi passati con commissioni maggiori. Con la crescita del MEV, la stessa tipologia di situazione potrebbe verificarsi in Ethereum, minacciando l'integrità della blockchain.

## Stato del MEV {#state-of-mev}

L'estrazione di MEV è cresciuta esponenzialmente all'inizio del 2021, traducendosi in prezzi del gas estremamente alti nei primi mesi dell'anno. L'emergere del MEV-Relay di Flashbot ha ridotto l'efficacia dei frontrunner generalizzati e ha portato le aste dei prezzi del carburante al di fuori della catena, facendo scendere i prezzi del carburante per gli utenti ordinari.

Anche se molti ricercatori continuano a guadagnare bene con il MEV, in un contesto in cui le opportunità diventano più note e un numero crescente di ricercatori compete per la stessa opportunità, i miner otterranno ricavi totali sempre più alti dal MEV (poiché anche nei Flashbot hanno luogo aste del carburante come quelle descritte sopra, seppur privatamente, e i miner otterranno i ricavi del carburante risultanti). Inoltre, il MEV non è un'esclusiva di Ethereum e, man mano che le opportunità su Ethereum diventano più competitive, i ricercatori si spostano su blockchain alternative come Binance Smart Chain, dove esistono opportunità di MEV simili a quelle di Ethereum ma con minore competizione.

Man mano che la DeFi cresce e la sua popolarità aumenta, il MEV potrebbe presto superare significativamente la ricompensa di base dei blocchi di Ethereum. Da ciò deriva una crescente possibilità di re-mining dei blocchi in chiave egoistica e di instabilità del consenso. Alcuni ritengono che questa sia una minaccia esistenziale a Ethereum, ragion per cui disincentivare il mining egoistico è un'area attiva di ricerca nella teoria del protocollo Ethereum. Una soluzione attualmente in fase di esplorazione è l'[attenuazione delle ricompense del MEV](https://ethresear.ch/t/committee-driven-mev-smoothing/10408).

## Risorse correlate {#related-resources}

- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _Dashboard ed esploratore delle transazioni live per le transazioni MEV_

## Letture consigliate {#further-reading}

- [What Is Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV and Me](https://research.paradigm.xyz/MEV)
- [Ethereum is a Dark Forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escaping the Dark Forest](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning the MEV Crisis](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller's MEV Threads](https://twitter.com/bertcmiller/status/1402665992422047747)
