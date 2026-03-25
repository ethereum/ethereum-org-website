---
title: FAQ su Cancun-Deneb (Dencun)
description: Domande frequenti riguardanti l'aggiornamento della rete Cancun-Deneb (Dencun)
lang: it
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) è un aggiornamento della rete Ethereum, che attiva il **Proto-Danksharding (EIP-4844)**, introducendo **blob** di dati temporanei per un'archiviazione più economica dei rollup di [livello 2 (L2)](/glossary/#layer-2).

Un nuovo tipo di transazione consente ai fornitori di rollup di archiviare i dati in modo più conveniente in quelli che sono noti come "blob". È garantito che i blob siano disponibili per la rete per circa 18 giorni (più precisamente, 4096 [epoche](/glossary/#epoch)). Dopo questo periodo, i blob vengono eliminati dalla rete, ma le applicazioni possono ancora verificare la validità dei loro dati utilizzando le prove. 

Questo riduce significativamente il costo dei rollup, limita la crescita della catena e aiuta a supportare più utenti mantenendo la sicurezza e un insieme decentralizzato di operatori dei nodi.

## Quando ci aspettiamo che i rollup riflettano commissioni inferiori grazie al Proto-Danksharding? {#when}

- Questo aggiornamento si è attivato all'epoca 269568, il **13 marzo 2024 alle 13:55 (UTC)**
- Tutti i principali fornitori di rollup, come Arbitrum o Optimism, hanno segnalato che i blob saranno supportati immediatamente dopo l'aggiornamento
- Le tempistiche per il supporto dei singoli rollup possono variare, poiché ogni fornitore deve aggiornare i propri sistemi per trarre vantaggio dal nuovo spazio dei blob

## Come può essere convertito l'ETH dopo la biforcazione hard? {#scam-alert}

- **Nessuna azione richiesta per i tuoi ETH**: A seguito dell'aggiornamento Dencun di Ethereum, non c'è bisogno di convertire o aggiornare i tuoi ETH. I saldi del tuo account rimarranno gli stessi e gli ETH che detieni attualmente rimarranno accessibili nella loro forma esistente dopo la biforcazione hard.
- **Attenzione alle truffe!** <Emoji text="⚠️" /> **chiunque ti istruisca ad "aggiornare" i tuoi ETH sta cercando di truffarti.** Non c'è nulla che tu debba fare in relazione a questo aggiornamento. I tuoi asset rimarranno completamente inalterati. Ricorda, rimanere informati è la migliore difesa contro le truffe.

[Maggiori informazioni su come riconoscere ed evitare le truffe](/security/)

## Quale problema sta risolvendo l'aggiornamento della rete Dencun? {#network-impact}

Dencun affronta principalmente la **scalabilità** (gestire più utenti e più transazioni) con **commissioni accessibili**, pur **mantenendo la decentralizzazione** della rete.

La comunità di Ethereum ha adottato un approccio "incentrato sui rollup" per la sua crescita, che pone i rollup di livello 2 come mezzo principale per supportare in sicurezza più utenti.

Le reti di rollup gestiscono l'_elaborazione_ (o "esecuzione") delle transazioni separatamente dalla rete principale e poi pubblicano una prova crittografica e/o dati compressi delle transazioni dei risultati di nuovo sulla rete principale per la conservazione dei registri. L'archiviazione di queste prove comporta una spesa (sotto forma di [gas](/glossary/#gas)), che, prima del Proto-Danksharding, doveva essere archiviata in modo permanente da tutti gli operatori dei nodi della rete, rendendolo un compito costoso.

L'introduzione del Proto-Danksharding nell'aggiornamento Dencun aggiunge un'archiviazione dei dati più economica per queste prove richiedendo agli operatori dei nodi di archiviare questi dati solo per circa 18 giorni, dopodiché i dati possono essere rimossi in sicurezza per prevenire l'espansione dei requisiti hardware. Poiché i rollup hanno in genere un periodo di prelievo di 7 giorni, il loro modello di sicurezza rimane invariato finché i blob sono disponibili sul L1 per questa durata. La finestra di eliminazione di 18 giorni fornisce un margine significativo per questo periodo.

[Maggiori informazioni sulla scalabilità di Ethereum](/roadmap/scaling/)

## Come si accede ai vecchi dati dei blob? {#historical-access}

Mentre i normali nodi di Ethereum manterranno sempre lo _stato attuale_ della rete, i dati storici dei blob possono essere scartati circa 18 giorni dopo la loro introduzione. Prima di scartare questi dati, Ethereum si assicura che siano stati resi disponibili a tutti i partecipanti della rete, concedendo il tempo per:

- Le parti interessate di scaricare e archiviare i dati.
- Il completamento di tutti i periodi di contestazione dei rollup.
- La finalizzazione delle transazioni dei rollup.

I dati _storici_ dei blob potrebbero essere desiderati per una serie di motivi e possono essere archiviati e consultati utilizzando diversi protocolli decentralizzati:

- **Protocolli di indicizzazione di terze parti**, come The Graph, archiviano questi dati attraverso una rete decentralizzata di operatori dei nodi incentivati da meccanismi cripto-economici.
- **BitTorrent** è un protocollo decentralizzato in cui i volontari possono conservare e distribuire questi dati ad altri.
- La **[rete del portale di Ethereum](/developers/docs/networking-layer/portal-network/)** mira a fornire l'accesso a tutti i dati di Ethereum attraverso una rete decentralizzata di operatori dei nodi distribuendo i dati tra i partecipanti in modo simile a BitTorrent.
- Gli **utenti individuali** sono sempre liberi di archiviare le proprie copie di qualsiasi dato desiderino per riferimento storico.
- I **fornitori di rollup** sono incentivati ad archiviare questi dati per migliorare l'esperienza utente del loro rollup.
- Gli **esploratori di blocchi** in genere eseguono nodi di archiviazione che indicizzano e archiviano tutte queste informazioni per un facile riferimento storico, accessibili agli utenti tramite un'interfaccia web.

È importante notare che il recupero dello stato storico opera su un **modello di fiducia 1-di-N**. Ciò significa che hai solo bisogno dei dati da _una singola fonte affidabile_ per verificarne la correttezza utilizzando lo stato attuale della rete.

## In che modo questo aggiornamento contribuisce al più ampio piano d'azione di Ethereum? {#roadmap-impact}

Il Proto-Danksharding pone le basi per la completa implementazione del [Danksharding](/roadmap/danksharding/). Il Danksharding è progettato per distribuire l'archiviazione dei dati dei rollup tra gli operatori dei nodi, in modo che ogni operatore debba gestire solo una piccola parte dei dati totali. Questa distribuzione aumenterà il numero di blob di dati per blocco, il che è essenziale per la scalabilità di Ethereum per gestire più utenti e transazioni.

Questa scalabilità è fondamentale per [supportare miliardi di utenti su Ethereum](/roadmap/scaling/) con commissioni accessibili e applicazioni più avanzate, pur mantenendo una rete decentralizzata. Senza questi cambiamenti, le richieste hardware per gli operatori dei nodi aumenterebbero, portando alla necessità di apparecchiature sempre più costose. Questo potrebbe escludere gli operatori più piccoli, con conseguente concentrazione del controllo della rete tra pochi grandi operatori, il che andrebbe contro il principio della decentralizzazione.

## Questo aggiornamento influisce su tutti i client di consenso e i client dei validatori di Ethereum? {#client-impact}

Sì, il Proto-Danksharding (EIP-4844) richiede aggiornamenti sia ai client di esecuzione che ai client di consenso. Tutti i principali client di Ethereum hanno rilasciato versioni che supportano l'aggiornamento. Per mantenere la sincronizzazione con la rete Ethereum dopo l'aggiornamento, gli operatori dei nodi devono assicurarsi di eseguire una versione del client supportata. Nota che le informazioni sulle versioni dei client sono sensibili al fattore tempo e gli utenti dovrebbero fare riferimento agli ultimi aggiornamenti per i dettagli più recenti. [Vedi i dettagli sulle versioni dei client supportate](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

I client di consenso gestiscono il software del _Validatore_, che è stato interamente aggiornato per accogliere l'aggiornamento.

## In che modo Cancun-Deneb (Dencun) influisce sulle reti di test di Ethereum? {#testnet-impact}

- Le Devnet, Sepolia e Holesky sono state tutte sottoposte all'aggiornamento Dencun e hanno il Proto-Danksharding completamente funzionante
- Gli sviluppatori di rollup possono utilizzare queste reti per i test dell'EIP-4844
- La maggior parte degli utenti non sarà minimamente interessata da questa modifica a ciascuna rete di test

## Tutte le transazioni sui L2 utilizzeranno ora lo spazio temporaneo dei blob, o sarà possibile scegliere? {#calldata-vs-blobs}

Le transazioni dei rollup sul livello 2 (L2) di Ethereum hanno l'opzione di utilizzare due tipi di archiviazione dei dati: lo spazio temporaneo dei blob o i calldata permanenti dei contratti intelligenti. Lo spazio dei blob è una scelta economica, che fornisce un'archiviazione temporanea a un costo inferiore. Garantisce la disponibilità dei dati per tutti i periodi di contestazione necessari. D'altra parte, i calldata dei contratti intelligenti offrono un'archiviazione permanente ma sono più costosi.

La decisione tra l'utilizzo dello spazio dei blob o dei calldata viene presa principalmente dai fornitori di rollup. Basano questa decisione sull'attuale domanda di spazio per i blob. Se lo spazio dei blob è molto richiesto, i rollup possono optare per i calldata per garantire che i dati vengano pubblicati in modo tempestivo.

Sebbene sia teoricamente possibile per gli utenti scegliere il tipo di archiviazione preferito, i fornitori di rollup in genere gestiscono questa scelta. Offrire questa opzione agli utenti aggiungerebbe complessità, in particolare nelle transazioni di raggruppamento convenienti. Per dettagli specifici su questa scelta, gli utenti dovrebbero fare riferimento alla documentazione fornita dai singoli fornitori di rollup.

## Il 4844 ridurrà il gas del L1? {#l1-fee-impact}

Non in modo significativo. Viene introdotto un nuovo mercato del gas esclusivamente per lo spazio dei blob, ad uso dei fornitori di rollup. _Sebbene le commissioni sul L1 possano essere ridotte scaricando i dati dei rollup sui blob, questo aggiornamento si concentra principalmente sulla riduzione delle commissioni del L2. La riduzione delle commissioni sul L1 (rete principale) può verificarsi come effetto di secondo ordine in misura minore._

- La riduzione del gas del L1 sarà proporzionale all'adozione/utilizzo dei dati dei blob da parte dei fornitori di rollup
- È probabile che il gas del L1 rimanga competitivo a causa di attività non correlate ai rollup
- I rollup che adottano l'uso dello spazio dei blob richiederanno meno gas del L1, contribuendo a spingere le commissioni del gas del L1 verso il basso nel breve termine
- Lo spazio dei blob è ancora limitato, quindi se i blob all'interno di un blocco sono saturi/pieni, ai rollup potrebbe essere richiesto di pubblicare i propri dati come dati permanenti nel frattempo, il che farebbe aumentare i prezzi del gas del L1 e del L2

## Questo ridurrà le commissioni su altre blockchain di livello 1 EVM? {#alt-l1-fee-impact}

No. I vantaggi del Proto-Danksharding sono specifici per i rollup di livello 2 di Ethereum che archiviano le loro prove sul livello 1 (rete principale).

Essere semplicemente compatibili con la macchina virtuale di Ethereum (EVM) non significa che una rete trarrà alcun vantaggio da questo aggiornamento. Le reti che operano indipendentemente da Ethereum (che siano compatibili con l'EVM o meno) non archiviano i propri dati su Ethereum e non trarranno alcun vantaggio da questo aggiornamento.

[Maggiori informazioni sui rollup di livello 2](/layer-2/)

## Preferisci imparare visivamente? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Unlocking Ethereum's Scaling, EIP-4844 — Finematics _

<YouTube id="dFjyUY3e53Q" />

_Blobspace 101 with Domothy — Bankless_

## Letture di approfondimento {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Shard blob transactions (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Annuncio della rete principale Dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog della Ethereum Foundation_
- [The Hitchhiker's Guide to Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [FAQ sul Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [An In-depth Explanation of EIP-4844: The Core of the Cancun Upgrade](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Aggiornamento AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_