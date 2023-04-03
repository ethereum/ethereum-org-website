---
title: Valore estraibile massimo (MEV)
description: Un'introduzione al valore estraibile massimo (MEV)
lang: it
---

Il valore estraibile massimo (MEV) si riferisce al valore massimo che può esser estratto dalla produzione del blocco, oltre alla ricompensa standard del blocco e alle commissioni sul gas, includendo, escludendo e cambiando l'ordine delle transazioni in un blocco.

### Valore estraibile dal miner {#miner-extractable-value}

Il valore estraibile massimo fu applicato per la prima volta nel contesto del [proof-of-work](/developers/docs/consensus-mechanisms/pow/) e fu inizialmente definito come "valore estraibile dal miner". Questo perché nel Proof of Work i miner controllano l'inclusione, l'esclusione e l'ordinamento della transazione. Tuttavia, a partire dalla transizione al proof-of-stake tramite [La Fusione](/upgrades/merge), i validatori sono responsabili di tali ruoli e il mining non è più parte del protocollo di Ethereum. I metodi d'estrazione del valore però esistono ancora, quindi il termine usato adesso è invece "Valore estraibile massimo".

## Prerequisiti {#prerequisites}

Assicurati di essere familiare con le [transazioni](/developers/docs/transactions/), i [blocchi](/developers/docs/blocks/), il [proof-of-stake](/developers/docs/consensus-mechanisms/pos) e il [gas](/developers/docs/gas/). Anche la familiarità con [dApp](/dapps/) e [DeFi](/defi/) è utile.

## Estrazione del MEV {#mev-extraction}

In teoria, il MEV proviene interamente dai validatori poiché sono l'unica parte in grado di garantire l'esecuzione di un'opportunità di MEV redditizia. Nella pratica, tuttavia, una grande porzione del MEV è estratta da partecipanti indipendenti della rete, chiamati "ricercatori". I ricercatori eseguono algoritmi complessi sui dati della blockchain per rilevare opportunità di MEV redditizie e si servono di bot per inviare automaticamente tali transazioni redditizie alla rete.

I validatori ottengono comunque una porzione dell'intero importo del MEV, poiché i ricercatori sono disposti a pagare commissioni sul gas maggiori (che vanno al validatore), in cambio di una maggiore probabilità d'inclusione delle loro transazioni profittevoli in un blocco. Supponendo che i ricercatori siano economicamente razionari, la commissione sul gas che un ricercatore è disposto a pagare sarà un importo fino al 100% del MEV del ricercatore (poiché se la commissione sul gas fosse stata maggiore, il ricercatore avrebbe perso denaro).

Così, per alcune opportunità di MEV molto competitive, come l'[arbitraggio della DEX](#mev-examples-dex-arbitrage), i ricercatori potrebbero dover pagare il 90%, se non più, delle loro entrate totali del MEV in commissioni sul gas al validatore, poiché così tante persone vogliono eseguire lo stesso scambio d'arbitraggio profittevole. Questo è perché il solo modo per garantire che la loro transazione d'arbitraggio sia eseguita se inviano la transazione con il prezzo sul gas maggiore.

### Golf del gas {#mev-extraction-gas-golfing}

Questa dinamica ha reso esser bravi al "golf del gas", la programmazione delle transazioni così che usino l'importo minimo di gas, un vantaggio competitivo, poiché consente ai ricercatori di impostare un prezzo del gas maggiore, mantenendo costanti le proprie commissioni sul gas totali (poiché, commissioni sul gas = prezzo del gas \* gas usato).

Alcune tecniche di golf del gas ben note includono: usare indirizzi che iniziano con una lunga stringa di zeri (es. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)) poiché richiedono meno spazio (e quindi gas) da archiviare; e lasciando piccoli saldi del token [ERC-20](/developers/docs/standards/tokens/erc-20/) nei contratti, poiché costa più gas inizializzare uno slot d'archiviazione (se il saldo è 0), piuttosto che aggiornarne uno. Individuare altre tecniche per ridurre il consumo di gas è un'area di ricerca attiva tra i ricercatori.

### Frontrunner generalizzati {#mev-extraction-generalized-frontrunners}

Anziché programmare algoritmi complessi per rilevare opportunità di MEV redditizie, alcuni ricercatori eseguono frontrunner generalizzati. I frontrunner generalizzati sono bot che tengono d'occhio il mempool per individuare le transazioni redditizie. Il frontrunner copierà il codice della transazione potenzialmente redditizia, sostituirà gli indirizzi con il proprio ed eseguirà la transazione localmente per verificare due volte che la transazione modificata risulti in un profitto all'indirizzo del frontrunner. Se la transazione è effettivamente redditizia, il precursore invierà la transazione modificata con l'indirizzo sostituito e un prezzo del gas maggiore, "precorrendo" la transazione originale e ottenendo il MEV originale del ricercatore.

### Flashbot {#mev-extraction-flashbots}

I flashbot sono un progetto indipendente che estende i client di esecuzione con un servizio che consente ai ricercatori di inviare le transazioni del MEV ai validatori senza rivelarle al mempool pubblico. Questo impedisce ai frontrunner generalizzati di eseguire frontrun sulle transazioni.

## Esempi di MEV {#mev-examples}

Il MEV emerge sulla blockchain in diversi modi.

### Arbitraggio DEX {#mev-examples-dex-arbitrage}

L'arbitraggio dello [scambio decentralizzato](/glossary/#dex) (DEX) è l'opportunità di MEV più semplice e più diffusa. Di conseguenza è anche la più competitiva.

Funziona come segue: se due DEX offrono un token a due prezzi diversi, qualcuno può acquistare il token sul DEX al prezzo minore e rivenderlo sul DEX al prezzo maggiore in un'unica transazione atomica. Grazie ai meccanismi della blockchain, questo è vero e proprio arbitraggio privo di rischi.

[Ecco un esempio](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) di una transazione di arbitraggio redditizia in cui un ricercatore ha trasformato 1.000 ETH in 1.045 ETH sfruttando i diversi prezzi della coppia ETH/DAI su Uniswap vs. Sushiswap.

### Liquidazioni {#mev-examples-liquidations}

Le liquidazioni del protocollo di prestito presentano un'altra opportunità di MEV ben nota.

I protocolli di prestito come Maker e Aave richiedono agli utenti di depositare un qualche tipo di garanzia (es. ETH). Questa garanzia depositata è poi usata per concedere prestiti ad altri utenti.

Gli utenti possono quindi prendere in prestito risorse e token dagli altri, a seconda delle loro esigenze (ad es. potresti prendere in prestito MKR se desideri votare in una proposta di governance di MakerDAO), fino a una certa percentuale della loro garanzia depositata. Ad esempio, se l'importo preso in prestito è un massimo del 30%, un utente che deposita 100 DAI nel protocollo può prendere in prestito fino all'equivalente di 30 DAI di un'altra risorsa. Il protocollo determina l'esatta percentuale di potenza presa in prestito.

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

Al livello della rete, i precursori generalizzati e le aste del prezzo del gas, che spesso intraprendono (quando due o più precursori competono perché la propria transazione sia inclusa nel blocco successivo, aumentando progressivamente il prezzo del gas della loro transazione), risultano in congestione della rete e prezzi del gas elevati per chiunque altro sia provando a eseguire transazioni regolari.

Oltre a ciò che si verifica _all'interno_ dei blocchi, il MEV può avere effetti deleteri _tra_ i blocchi. Se il MEV disponibile in un blocco supera significativamente la ricompensa standard del blocco, i validatori potrebbero essere incentivati a riorganizzare i blocchi e catturare da soli il MEV, causando la riorganizzazione della blockchain e l'instabilità del consenso.

Questa possibile riorganizzazione della blockchain è stata [precedentemente esplorata sulla blockchain di Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Poiché le metà delle ricompense del blocco e le commissioni di transazione di Bitcoin costituiscono una porzione sempre più consistente della ricompensa del blocco, si presentano situazioni in cui diventa economicamente razionale per i miner rinunciare alla ricompensa del blocco successivo e ri-minare invece i blocchi passati con commissioni maggiori. Con la crescita del MEV, la stessa tipologia di situazione potrebbe verificarsi in Ethereum, minacciando l'integrità della blockchain.

## Stato del MEV {#state-of-mev}

L'estrazione del MEV è aumentata a dismisura agli inizi del 2021, risultando in prezzi del gas estremamente elevati nei primi mesi dell'anno. L'emergere della trasmissione del MEV dei Flashbot ha ridotto l'efficienza dei precursori generalizzati e ha portato le aste del prezzo del gas al di fuori della catena, riducendo i prezzi del gas per gli utenti ordinari.

Mentre molti ricercatori guadagnano ancora molto dal MEV, con il diffondersi delle opportunità e la competizione di sempre più ricercatori per la stessa opportunità, i validatori cattureranno sempre più ricavi totali del MEV (poiché lo stesso tipo di aste del gas originariamente descritte in precedenza, si verificano anche nei Flashbot, seppur privatamente, e i validatori cattureranno i ricavi di gas risultanti). Inoltre, il MEV non è un'esclusiva di Ethereum e, man mano che le opportunità su Ethereum diventano più competitive, i ricercatori si spostano su blockchain alternative come Binance Smart Chain, dove esistono opportunità di MEV simili a quelle di Ethereum ma con minore competizione.

D'altra parte, la transizione dal proof-of-work al proof-of-stake e lo sforzo di ridimensionamento di Ethereum in corso usando i rollup e lo sharding stanno modificando il panorama del MEV in modi ancora piuttosto nebuloso. Non è ancora noto come il fatto di conoscere i propositori di blocchi garantiti lievemente in anticipo modifichi le dinamiche di estrazione del MEV rispetto al modello probabilistico nel proof-of-work, o come questo sarà sconvolto quando l'[elezione del leader segreto singolo](https://ethresear.ch/t/secret-non-single-leader-election/11789) e la [tecnologia distribuita del validatore](https://github.com/ethereum/distributed-validator-specs) saranno implementate. Similmente, resta da vedere quali opportunità del MEV esistono quando gran parte dell'attività degli utenti è portata via da Ethereum e sui suoi rollup e shard di livello 2.

## Risorse correlate {#related-resources}

- [Documentazione dei Flashbot](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _Dashboard e piattaforma di ricerca live delle transazioni MEV_

## Letture consigliate {#further-reading}

- [What Is Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV and Me](https://research.paradigm.xyz/MEV)
- [Ethereum is a Dark Forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escaping the Dark Forest](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning the MEV Crisis](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller's MEV Threads](https://twitter.com/bertcmiller/status/1402665992422047747)
- [The Hitchhikers Guide To Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
