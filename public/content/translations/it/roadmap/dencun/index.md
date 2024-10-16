---
title: Domande frequenti su Cancun-Deneb (Dencun)
description: Domande frequenti sull'aggiornamento della rete Cancun-Deneb (Dencun)
lang: it
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) è un aggiornamento della rete Ethereum, che attiva il **Proto-Danksharding (EIP-4844)**, introducendo **blob** di dati temporanei per un'archiviazione di rollup di [livello 2 (L2)](/glossary/#layer-2) più economica.

Un nuovo tipo di transazione consente ai provider di rollup di archiviare i dati in modo più conveniente nei cosiddetti "blob." La disponibilità dei blob sulla rete è garantita per circa 18 giorni (più precisamente 4096 [epoche](/glossary/#epoch)). Dopo questo periodo i blob vengono eliminati dalla rete, ma le applicazioni possono comunque verificare la validità dei loro dati utilizzando prove.

Ciò riduce significativamente il costo dei rollup, limita la crescita della catena e aiuta a supportare più utenti mantenendo allo stesso tempo la sicurezza e un set di operatori dei nodi decentralizzato.

## Quando si prevede che i rollup rifletteranno commissioni inferiori grazie al Proto-Danksharding? {#when}

- Questo aggiornamento è stato attivato all'epoca 269568, il **13-Mar-2024 alle 13:55 (UTC)**
- Tutti i principali provider di rollup, come Arbitrum o Optimism, hanno segnalato che i blob saranno supportati immediatamente dopo l'aggiornamento
- La tempistica di supporto per ciascun rollup può variare, poiché ogni provider deve aggiornare i propri sistemi per sfruttare il nuovo spazio blob

## Come si converte l'ETH dopo la biforcazione dura? {#scam-alert}

- **Nessuna azione richiesta per il tuo ETH**: dopo l'aggiornamento Dencun di Ethereum, non è necessario convertire o aggiornare il proprio ETH. I saldi del proprio conto rimarranno gli stessi e l'ETH che si possiede in quel momento rimarrà accessibile nella sua forma esistente dopo la biforcazione dura.
- **Attenzione alle truffe!** <Emoji text="⚠️" /> **chiunque ti dica di "aggiornare" il tuo ETH sta cercando di truffarti.** Non occorre fare nulla in relazione a questo aggiornamento. Le proprie risorse rimarranno completamente inalterate. Ricorda: essere informati è la migliore difesa contro le truffe.

[Ulteriori informazioni su come riconoscere ed evitare le truffe](/security/)

## Quale problema risolve l'aggiornamento di rete Dencun? {#network-impact}

Dencun affronta principalmente la **scalabilità** (gestire più utenti e più transazioni) con **commissioni accessibili**, pur **mantenendo la decentralizzazione** della rete.

La community di Ethereum ha adottato un approccio "incentrato sui rollup" per la sua crescita, che pone i rollup di livello 2 come mezzo principale per supportare più utenti in sicurezza.

Le reti rollup gestiscono l'_elaborazione_ (o "esecuzione") delle transazioni separatamente dalla Rete Principale e poi pubblicano una prova crittografica e/o dati di transazione compressi dei risultati sulla Rete Principale per la tenuta dei registri. L'archiviazione di queste prove comporta un costo (sotto forma di [gas](/glossary/#gas)), che, prima del Proto-Danksharding, doveva essere archiviato in modo permanente da tutti gli operatori dei nodi di rete, rendendolo un compito costoso.

L'introduzione del Proto-Danksharding nell'aggiornamento Dencun aggiunge un'archiviazione dei dati più economica per queste prove richiedendo agli operatori dei nodi di archiviare questi dati solo per 18 giorni circa, dopodiché i dati possono essere rimossi in modo sicuro per evitare l'aumento dei requisiti hardware.  Poiché i rollup in genere hanno un periodo di prelievo di 7 giorni, il loro modello di sicurezza rimane invariato a patto che i blob siano disponibili sul L1 per questa durata. La finestra temporale di 18 giorni per la potatura fornisce un buffer significativo per questo periodo.

[Ulteriori informazioni sul ridimensionamento di Ethereum](/roadmap/scaling/)

## Come si accede ai vecchi dati blob? {#historical-access}

Mentre i normali nodi di Ethereum manterranno sempre lo _stato corrente_ della rete, i dati storici di un blob possono essere eliminati circa 18 giorni dopo la sua introduzione. Prima di eliminare questi dati, Ethereum si assicura che siano stati resi disponibili a tutti i partecipanti alla rete, concedendo tempo per:

- Consentire ai soggetti interessati di scaricare e archiviare dati.
- Completare tutti i periodi di contestazione dei rollup.
- Finalizzare le transazioni dei rollup.

I dati _storici_ dei blob potrebbero essere necessari per varie ragioni e possono essere archiviati e accessibili utilizzando diversi protocolli decentralizzati:

- **Protocolli indicizzati di terze parti**, come The Graph, archiviano questi dati attraverso una rete decentralizzata di operatori di nodi incentivati da meccanismi criptoeconomici.
- **BitTorrent** è un protocollo decentralizzato dove volontari possono detenere e distribuire questi dati ad altri.
- **La [Rete Portal di Ethereum](/developers/docs/networking-layer/portal-network/)** mira a fornire accesso a tutti i dati di Ethereum attraverso una rete decentralizzata di operatori di nodi distribuendo dati tra i partecipanti, come fa BitTorrent.
- I **singoli utenti** sono sempre liberi di archiviare le proprie copie di qualsiasi dato desiderino come riferimento storico.
- I **provider di rollup** sono incentivati ​​ad archiviare questi dati per migliorare l'esperienza dell'utente del loro rollup.
- Gli **esploratori di blocchi** in genere eseguono nodi archivio che indicizzano e archiviano tutte queste informazioni per un facile riferimento storico, accessibile agli utenti tramite un'interfaccia web.

È importante notare che il ripristino dello stato storico opera su un **modello di fiducia 1 su N**. Questo significa che servono solo i dati provenienti da _una singola fonte affidabile_ per verificarne la correttezza utilizzando lo stato attuale della rete.

## Come contribuisce questo aggiornamento alla tabella di marcia di Ethereum in generale? {#roadmap-impact}

Il Proto-Danksharding mette le basi per la piena implementazione del [Danksharding](/roadmap/danksharding/). Il Danksharding è progettato per distribuire l'archivio dei dati di rollup tra gli operatori dei nodi, affinché ciascun operatore debba gestire solo una piccola parte dei dati totali. Questa distribuzione aumenterà il numero dei blob di dati per blocco, il che è essenziale per ridimensionare Ethereum gestendo più utenti e transazioni.

Questa scalabilità è fondamentale per [supportare miliardi di utenti su Ethereum](/roadmap/scaling/) con tariffe accessibili e applicazioni più avanzate, pur mantenendo una rete decentralizzata. Senza questi cambiamenti, le specifiche hardware per gli operatori di nodi aumenterebbero, con conseguente bisogno di apparecchiature sempre più costose. Questo potrebbe penalizzare gli operatori più piccoli portando a una concentrazione del controllo della rete tra pochi grandi operatori, il che andrebbe contro il principio di decentralizzazione.

## Questo aggiornamento influisce su tutti i client di consenso e validatore di Ethereum? {#client-impact}

Sì, il Proto-Danksharding (EIP-4844) richiede aggiornamenti sia ai client d'esecuzione che ai client di consenso. Tutti i principali client di Ethereum hanno rilasciato versioni che supportano l'aggiornamento. Per mantenere la sincronizzazione con la rete Ethereum dopo l'aggiornamento, gli operatori dei nodi devono assicurarsi di eseguire una versione client supportata. Si tenga presente che le informazioni sui rilasci dei client sono sensibili al fattore tempo e gli utenti devono fare riferimento agli ultimi aggiornamenti per dettagli attuali. [Si vedano i dettagli sulle versioni client supportate](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

I client di consenso gestiscono il software del _Validatore_, che è stato aggiornato per gestire l'aggiornamento.

## In che modo Cancun-Deneb (Dencun) influisce su Goerli o altre reti di prova di Ethereum? {#testnet-impact}

- Devnets, Goerli, Sepolia e Holesky hanno tutte subito l'aggiornamento Dencun e hanno il Proto-Danksharding perfettamente funzionante
- Gli sviluppatori di rollup possono utilizzare queste reti per testare la EIP-4844
- La maggior parte degli utenti non sarà per nulla influenzato da questa modifica a ciascuna rete di prova

## Le transazioni sul L2 utilizzeranno tutte lo spazio blob temporaneo o si potrà scegliere? {#calldata-vs-blobs}

Le transazioni di rollup sul Livello 2 (L2) di Ethereum hanno la possibilità di utilizzare due tipi di archiviazione dei dati: spazio blob temporaneo o calldata del contratto intelligente permanente. Lo spazio blob è una scelta economica perché fornisce archiviazione temporanea a un costo inferiore. Garantisce la disponibilità dei dati per tutti i periodi di contestazione necessari. D’altra parte, i calldata del contratto intelligente offrono un'archiviazione permanente ma sono più costosi.

La decisione tra l'utilizzo dello spazio blob o dei calldata viene presa principalmente dai provider di rollup. Basano questa decisione sull'attuale domanda di spazio blob. Se lo spazio blob è molto richiesto, i rollup possono optare per i calldata per garantire che i dati vengano pubblicati in modo tempestivo.

Sebbene in teoria sia possibile per gli utenti scegliere il tipo di archiviazione preferito, in genere sono i provider di rollup a gestire questa scelta. Offrire questa opzione agli utenti aggiungerebbe complessità, in particolare nelle transazioni di raggruppamento convenienti. Per dettagli specifici su questa scelta, gli utenti dovrebbero fare riferimento alla documentazione fornita dai singoli provider di rollup.

## La 4844 ridurrà il gas sul L1? {#l1-fee-impact}

Non in modo significativo. Viene introdotto un nuovo mercato del gas esclusivamente per lo spazio blob, ad uso dei provider di rollup. _Sebbene le tariffe sul L1 possano essere ridotte scaricando i dati di rollup sui blob, questo aggiornamento si concentra principalmente sulla riduzione delle commissioni sul L2. La riduzione delle commissioni sul L1 (Rete Principale) può verificarsi come effetto di secondo ordine in misura minore._

- La riduzione del gas sul L1 sarà proporzionale all'adozione/utilizzo dei dati blob da parte dei provider di rollup
- È probabile che il gas sul L1 rimanga competitivo grazie ad attività non correlate al rollup
- I rollup che adottano l'uso dello spazio blob richiederanno meno gas sul L1, contribuendo a ridurre le tariffe del gas sul L1 a breve termine
- Lo spazio blob è ancora limitato, quindi se i blob all'interno di un blocco sono saturi/pieni, nel frattempo potrebbe essere necessario che i rollup pubblichino i propri dati come dati permanenti, il che farebbe aumentare i prezzi del gas su L1 e L2

## Questo ridurrà le commissioni su altre blockchain di livello 1 dell'EVM? {#alt-l1-fee-impact}

No. I vantaggi del Proto-Danksharding sono specifici per i rollup di livello 2 di Ethereum che archiviano le loro prove sul livello 1 (Rete Principale).

Essere semplicemente compatibili con la Macchina virtuale di Ethereum (EVM) non significa che una rete trarrà alcun vantaggio da questo aggiornamento. Le reti che operano indipendentemente da Ethereum (compatibili con EVM o meno) non archiviano i loro dati su Ethereum e non vedranno alcun vantaggio da questo aggiornamento.

[Ulteriori informazioni sui rollup di livello 2](/layer-2/)

## Preferisci un approccio visivo all'apprendimento? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Sbloccare il ridimensionamento di Ethereum, EIP-4844 — Finematics _

<YouTube id="dFjyUY3e53Q" />

_Blobspace 101 con Domothy — Bankless_

## Letture consigliate {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Transazioni a blob di frammenti (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Annuncio di Dencun sulla Rete Principale](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Ethereum Foundation blog_
- [La guida per autostoppisti a Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Domande frequenti sul Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Una spiegazione approfondita su EIP-4844: Il nocciolo dell'aggiornamento Dencun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Aggiornamento 016 di AllCoreDevs](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
