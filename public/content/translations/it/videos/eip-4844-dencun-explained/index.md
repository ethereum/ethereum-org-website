---
title: "Sbloccare la scalabilità di Ethereum: EIP-4844 spiegato"
description: "Finematics spiega l'EIP-4844 (Proto-Danksharding), l'aggiornamento chiave nell'hard fork Dencun che introduce le transazioni blob per ridurre drasticamente i costi per i rollup di layer 2 su Ethereum."
lang: it
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "come-funziona-ethereum"
  - "scalabilita"
  - "eip-4844"
  - "dencun"
  - "aggiornamenti"
format: explainer
author: Finematics
breadcrumb: "EIP-4844 spiegato"
---

Una spiegazione di **Finematics** che copre l'EIP-4844 (Proto-Danksharding), l'aggiornamento chiave nell'hard fork Dencun che introduce le transazioni blob per ridurre drasticamente i costi per i rollup di layer 2 su Ethereum.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=HT9PHWloIiU) pubblicata da Finematics. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione (0:00) {#introduction-000}

La scalabilità di Ethereum è da tempo un argomento molto dibattuto. Le soluzioni di layer 2 (l2) sono state in prima linea in questa battaglia, offrendo un modo per gestire le transazioni fuori dalla catena principale per alleviare la congestione e ridurre le commissioni. Ma c'è un problema: anche i layer 2 affrontano limitazioni che ostacolano la loro efficienza e scalabilità. L'EIP-4844 è il passo successivo per aumentare il potenziale dei layer 2 e allineare Ethereum alla sua roadmap di scalabilità.

Quindi, di cosa tratta esattamente l'EIP-4844? In che modo aiuta a scalare i layer 2? Quali nuove possibilità sblocca? Ed è vero che può ridurre le commissioni di transazione sui layer 2 di oltre il 90%?

#### Cos'è l'EIP-4844 e il Proto-Danksharding (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

Come promemoria, EIP sta per Ethereum Improvement Proposal (Proposta di Miglioramento di Ethereum), un processo attraverso il quale gli sviluppatori possono suggerire modifiche al protocollo di Ethereum. L'EIP-4844, nello specifico, propone un nuovo tipo di transazione che può migliorare significativamente il modo in cui i dati vengono gestiti ed elaborati su Ethereum. Potresti aver sentito anche il nome "Proto-Danksharding", che ora viene usato in modo intercambiabile con EIP-4844.

Il Proto-Danksharding è un'implementazione iniziale del danksharding completo. Pone le basi per un'ulteriore scalabilità con il danksharding in futuro. Ciò si ottiene implementando la maggior parte della logica e dell'"impalcatura" che compongono una specifica completa di danksharding, senza implementare l'effettivo sharding dei dati. Farlo in questo modo consente una transizione più semplice e meno dirompente che può aver luogo attraverso molteplici aggiornamenti della rete senza introdurre troppi rischi per Ethereum in un singolo aggiornamento.

L'idea centrale alla base dell'EIP-4844 è supportare il futuro "incentrato sui rollup" di Ethereum. I rollup sono soluzioni di layer 2 che elaborano le transazioni al di fuori della catena principale di Ethereum ma ne ereditano la sicurezza. L'EIP-4844 mira a rendere i rollup più economici ed efficienti introducendo un nuovo tipo di transazione che può essere sfruttato dai rollup per consentire loro di ridurre i costi operativi di un ordine di grandezza. Questo a sua volta permetterà alle applicazioni costruite sui rollup di essere molto più economiche da usare e aumenterà l'adozione dell'intero ecosistema di Ethereum.

Immagina di fare uno swap su un DEX su uno dei rollup. Se il costo attuale per eseguire tale operazione è, diciamo, di 1 $, molto probabilmente scenderà a circa 0,10 $ dopo l'EIP-4844. L'impatto in questo esempio ha però alcune avvertenze che tratteremo più avanti nel video.

L'EIP-4844 insieme ad alcuni altri EIP sarà incluso nell'imminente aggiornamento Dencun della rete.

#### Dettagli tecnici (2:50) {#technical-details-250}

Ora, diamo un'occhiata più da vicino a come funziona l'EIP-4844.

L'EIP-4844 introduce un nuovo tipo di transazione su Ethereum che accetta "blob" di dati da conservare nel nodo beacon per un breve periodo di tempo. Queste modifiche sono compatibili in avanti con la roadmap di scalabilità di Ethereum e i blob sono abbastanza piccoli da mantenere gestibile l'uso del disco. Le transazioni blob sono nello stesso formato in cui ci si aspetta che esistano nella specifica finale del danksharding.

Questo è accompagnato da un "mercato delle commissioni per i blob", garantendo che lo spazio dei blob sia utilizzato in modo efficiente e rimanga economicamente sostenibile. Ciò si ottiene introducendo il gas dei blob come un nuovo tipo di gas. È indipendente dal gas normale. Per ora, solo i blob sono prezzati in gas dei blob.

I blob sono 4.096 elementi di campo di 32 byte ciascuno. Il limite di blob per blocco è controllato dal parametro MAX_BLOBS_PER_BLOCK. Il limite può iniziare basso e crescere nel corso di molteplici aggiornamenti della rete. Inizialmente, Dencun punta a 6 blob per blocco. 4.096 × 32 byte × 6 per blocco = 0,75 MB per blocco.

I blob vengono conservati nei nodi beacon (livello di consenso), non nel livello di esecuzione. Il futuro lavoro di sharding richiede solo modifiche al nodo beacon, consentendo al livello di esecuzione di lavorare su altre iniziative in parallelo.

I blob hanno vita breve e vengono eliminati dopo circa due settimane. Sono disponibili abbastanza a lungo affinché tutti gli attori di un rollup possano recuperarli, ma per un tempo sufficientemente breve da mantenere gestibile l'uso del disco. Questo permette ai blob di avere un prezzo inferiore rispetto ai dati di chiamata (calldata), che sono dati archiviati nella cronologia per sempre.

La spina dorsale crittografica dell'EIP-4844 sono i commitment KZG. Senza scendere troppo nei dettagli tecnici, consentono un'inclusione dei dati efficiente e sicura, cruciale per la funzionalità delle transazioni blob. In questo modo, solo i commitment ai blob devono essere interpretati dall'EVM nel livello di esecuzione e non i blob stessi.

Per generare il segreto condiviso per i commitment KZG, è stata eseguita una cerimonia ampiamente distribuita basata su browser, in modo che tutti i partecipanti alla rete Ethereum avessero la possibilità di assicurarsi che fosse generato in modo corretto e sicuro.

L'EIP-4844 aggiunge un nuovo precompilato chiamato valutazione del punto (point evaluation) che verifica una prova KZG la quale attesta che un blob (rappresentato da un commitment) restituisce un dato valore in un dato punto.

Quindi, come si applica esattamente tutto questo ai rollup? Con il nuovo spazio dei blob, i rollup saranno in grado di inserire i dati del loro blocco nei blob piuttosto che nei più costosi dati di chiamata che sono stati utilizzati per questo scopo finora. Sfruttare uno spazio dei blob a vita breve nel livello di consenso è possibile poiché i rollup hanno bisogno che i dati siano disponibili solo per il tempo necessario a garantire che gli attori onesti possano costruire lo spazio del rollup.

Nel caso dei rollup ottimistici come Optimism o Arbitrum, devono fornire i dati sottostanti solo per il tempo in cui la finestra di contestazione delle frodi è aperta. La prova di frode può verificare la transizione in passaggi più piccoli, caricando al massimo pochi valori del blob alla volta attraverso i dati di chiamata.

I rollup a conoscenza zero (ZK rollup) fornirebbero due commitment ai dati della loro transazione o del delta di stato: il commitment del blob e il commitment del rollup ZK stesso, utilizzando qualsiasi sistema di prova il rollup usi internamente. Utilizzerebbero anche un protocollo di prova di equivalenza, usando il precompilato di valutazione del punto menzionato in precedenza, per dimostrare che i due commitment si riferiscono agli stessi dati.

#### Impatto (6:25) {#impact-625}

L'impatto dell'EIP-4844 sull'ecosistema di Ethereum non può essere sopravvalutato. Per cominciare, migliora drasticamente la scalabilità delle soluzioni di layer 2, riducendo i loro costi operativi e rendendole più competitive rispetto ad altre blockchain alternative ed economiche. La riduzione dei costi operativi è possibile poiché la stragrande maggioranza dei costi attualmente sostenuti dai rollup è dovuta alle commissioni pagate per i dati di chiamata.

Inoltre, l'EIP-4844 pone le basi per un'ulteriore scalabilità attraverso il danksharding completo. Questo futuro aggiornamento dividerà la rete Ethereum in molteplici catene di shard di dati, ciascuna in grado di archiviare dati in modo indipendente, migliorando ulteriormente la capacità della rete.

Con la diminuzione dei costi operativi, potremmo assistere all'emergere di un'ondata di nuove soluzioni di layer 2, attirando gli sviluppatori a costruire applicazioni innovative sui rollup.

Per quanto riguarda la diminuzione dei costi di transazione sui rollup, illustrata dal nostro precedente esempio di swap su DEX, la situazione è complessa. Supponendo che la domanda per i rollup rimanga costante dopo l'EIP-4844, potremmo effettivamente anticipare una significativa riduzione dei costi per gli utenti. Tuttavia, i miglioramenti nella scalabilità possono portare a effetti economici imprevisti. Ad esempio, commissioni di transazione più basse per gli utenti finali potrebbero spingere più persone a utilizzare i rollup, aumentando di conseguenza la domanda sulle risorse di rete e potenzialmente innalzando i costi di transazione.

Una cosa è certa: anche se il risultato principale fosse l'aumento della capacità transazionale e il costo delle transazioni rimanesse lo stesso, l'EIP-4844 pone le basi per una scalabilità ancora maggiore in futuro che alla fine si tradurrà in transazioni più economiche per gli utenti.

#### Riepilogo (8:04) {#summary-804}

La comunità di Ethereum ha già completato i test dell'EIP-4844 su varie testnet, con un lancio sulla Mainnet previsto per il 13 marzo. Questo è un passo monumentale verso il raggiungimento di una scalabilità senza pari per Ethereum. Possiamo già vedere la maggior parte dei principali layer 2 impegnarsi a iniziare a utilizzare il nuovo spazio dei blob non appena avverrà l'aggiornamento Dencun.

In conclusione, l'EIP-4844 è più di un semplice aggiornamento. È un momento cruciale nel viaggio di Ethereum verso il diventare una blockchain più scalabile, efficiente e facile da usare. Riducendo i costi e aumentando l'efficienza delle soluzioni di layer 2, Ethereum è destinato a consolidare la sua posizione come piattaforma leader per le applicazioni decentralizzate.