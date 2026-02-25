---
title: Praga-Electra (Pectra)
description: Scopri l'aggiornamento del protocollo Pectra
lang: it
---

# Pectra {#pectra}

L'aggiornamento della rete Pectra è seguito a [Dencun](/roadmap/dencun/) e ha introdotto modifiche sia al livello di esecuzione che al livello di consenso di Ethereum. Il nome abbreviato Pectra è una combinazione di Praga ed Electra, che sono i rispettivi nomi delle modifiche alle specifiche del livello di esecuzione e del livello di consenso. Insieme, questi cambiamenti apportano numerosi miglioramenti agli utenti, agli sviluppatori e ai validatori di Ethereum.

Questo aggiornamento è stato attivato con successo sulla rete principale di Ethereum all'epoca `364032`, il **07-maggio-2025 alle 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
L'aggiornamento Pectra è solo un singolo passo negli obiettivi di sviluppo a lungo termine di Ethereum. Scopri di più sulla [tabella di marcia del protocollo](/roadmap/) e sugli [aggiornamenti precedenti](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Miglioramenti in Pectra {#new-improvements}

Pectra porta il maggior numero di [EIP](https://eips.ethereum.org/) rispetto a qualsiasi aggiornamento precedente! Ci sono molte modifiche minori ma anche alcune nuove funzionalità significative. L'elenco completo delle modifiche e dei dettagli tecnici può essere trovato nelle singole EIP incluse.

### Codice del conto EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) rappresenta un passo importante verso un'[astrazione del conto](/roadmap/account-abstraction/) diffusa. Con questa funzionalità, gli utenti possono impostare il proprio indirizzo ([EOA](/glossary/#eoa)) da estendere con un contratto intelligente. L’EIP introduce un nuovo tipo di transazione con una funzione specifica: consentire ai titolari di un indirizzo di firmare un’autorizzazione che imposta il loro indirizzo per imitare uno smart contract scelto.

Con questo EIP, gli utenti possono scegliere portafogli programmabili che consentono nuove funzionalità come il raggruppamento delle transazioni, le transazioni senza gas e l’accesso personalizzato agli asset per schemi alternativi di recupero. Questo approccio ibrido combina la semplicità degli EOA con la programmabilità dei conti basati su contratto.

Leggi un approfondimento su 7702 [qui](/roadmap/pectra/7702/)

### Aumento del saldo effettivo massimo {#7251}

L'attuale saldo effettivo del validatore è esattamente di 32 ETH. È l'importo minimo necessario per partecipare al consenso ma, allo stesso tempo, il massimo che un singolo validatore può mettere in staking.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) aumenta il saldo effettivo massimo possibile a 2048 ETH, il che significa che un singolo validatore può ora mettere in staking tra 32 e 2048 ETH. Invece di multipli di 32, gli staker possono ora scegliere un importo arbitrario di ETH da mettere in staking e ricevere ricompense per ogni 1 ETH al di sopra del minimo. Ad esempio, se il saldo di un validatore cresce con le sue ricompense a 33 ETH, l'ETH extra viene considerato parte del saldo effettivo e riceve ricompense.

Ma il vantaggio di un migliore sistema di ricompense per i validatori è solo una parte di questo miglioramento. Gli [staker](/staking/) che gestiscono più validatori possono ora aggregarli in uno solo, il che consente un'operatività più semplice e riduce il sovraccarico della rete. Poiché ogni validatore nella Beacon Chain invia una firma in ogni epoca, i requisiti di larghezza di banda aumentano con l’aumentare dei validatori e dell’elevato numero di firme da propagare. L'aggregazione dei validatori alleggerirà il carico sulla rete e aprirà nuove opzioni di scalabilità, mantenendo la stessa sicurezza economica.

Leggi un approfondimento su maxEB [qui](/roadmap/pectra/maxeb/)

### Aumento del throughput dei blob {#7691}

I blob forniscono [disponibilità dei dati](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) per gli L2. Sono stati introdotti nel [precedente aggiornamento della rete](/roadmap/dencun/).

Attualmente, la rete ha come obiettivo una media di 3 blob per blocco, con un massimo di 6 blob. Con [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), il numero medio di blob sarà aumentato a 6, con un massimo di 9 per blocco, con conseguente aumento della capacità per i rollup di Ethereum. Questa EIP aiuta a colmare il divario fino a quando [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) non consentirà un numero di blob ancora più elevato.

### Aumento del costo dei calldata {#7623}

Prima dell'introduzione dei [blob nell'aggiornamento Dencun](/roadmap/danksharding), gli L2 utilizzavano i [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) per archiviare i propri dati su Ethereum. Sia i blob che i calldata influiscono sull'uso della larghezza di banda di Ethereum. Mentre la maggior parte dei blocchi utilizza solo una quantità minima di calldata, i blocchi con un elevato volume di dati che contengono anche molti blob possono essere dannosi per la rete p2p di Ethereum.

Per risolvere questo problema, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) aumenta il prezzo dei calldata, ma solo per le transazioni con un elevato volume di dati. Questo limita la dimensione massima del blocco, fornisce un incentivo ai livelli 2 (L2) a utilizzare solo i blob e lascia oltre il 99% delle transazioni inalterate.

### Uscite attivabili a livello di esecuzione {#7002}

Attualmente, l’uscita di un validatore e il [prelievo dell’ETH in staking](/staking/withdrawals/) è un’operazione del livello di consenso che richiede una chiave di validatore attiva, la stessa chiave BLS utilizzata dal validatore per svolgere attività attive come le attestazioni. Le credenziali di prelievo sono una chiave fredda separata che riceve lo stake dismesso ma non può avviare l’uscita. L'unico modo per gli staker di uscire è inviare un messaggio speciale alla rete della Beacon Chain firmato con la chiave del validatore attiva. Questo risulta limitante negli scenari in cui le credenziali di prelievo e la chiave del validatore sono detenute da entità diverse o quando la chiave del validatore viene smarrita.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) introduce un nuovo contratto che può essere utilizzato per avviare l’uscita utilizzando le credenziali di prelievo del livello di esecuzione. Gli staker potranno uscire dal proprio validatore chiamando una funzione in questo contratto speciale senza la necessità della chiave di firma del validatore né di alcun accesso alla Beacon Chain. È importante notare che abilitare i prelievi dei validatori sulla catena consente protocolli di staking con presupposti di fiducia ridotti sugli operatori dei nodi.

### Depositi dei validatori sulla catena {#6110}

I depositi dei validatori sono attualmente elaborati dal [sondaggio eth1data](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), che è una funzione sulla Beacon Chain che recupera i dati dal livello di esecuzione. È una sorta di debito tecnico risalente a prima della Fusione, quando la Beacon Chain era una rete separata e doveva preoccuparsi delle riorganizzazioni della proof-of-work.

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) è un nuovo modo di trasferire i depositi dal livello di esecuzione al livello di consenso, che consente un'elaborazione istantanea con minore complessità di implementazione. È un modo più sicuro di gestire i depositi nativi di Ethereum dopo la fusione. Aiuta anche a rendere il protocollo a prova di futuro, perché non richiede depositi storici per l'avvio del nodo, cosa necessaria per la scadenza della cronologia.

### Precompilazione per BLS12-381 {#2537}

Le precompilazioni sono un insieme speciale di contratti intelligenti integrati direttamente nella Macchina virtuale di Ethereum ([EVM](/developers/docs/evm/)). A differenza dei contratti normali, le precompilazioni non sono distribuite dagli utenti ma fanno parte dell'implementazione del client stesso, scritte nel suo linguaggio nativo (ad esempio Go, Java, ecc., non Solidity). Le precompilazioni servono per funzioni ampiamente utilizzate e standardizzate, come le operazioni crittografiche. Gli sviluppatori di contratti intelligenti possono chiamare le precompilazioni come un contratto normale, ma con maggiore sicurezza ed efficienza.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) aggiunge nuove precompilazioni per le operazioni sulle curve su [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Questa curva ellittica è diventata ampiamente utilizzata negli ecosistemi di criptovalute grazie alle sue proprietà pratiche. Più specificamente, è stata adottata dal livello di consenso di Ethereum, dove è utilizzata dai validatori.

La nuova precompilazione aggiunge la possibilità per ogni sviluppatore di eseguire in modo semplice, efficiente e sicuro operazioni crittografiche utilizzando questa curva, ad esempio, verificando le firme. Le applicazioni sulla catena che dipendono da questa curva possono diventare più efficienti in termini di gas e più sicure affidandosi a una precompilazione invece che a un contratto personalizzato. Questo si applica principalmente alle applicazioni che vogliono ragionare sui validatori all'interno dell'EVM, ad es., pool di staking, [restaking](/restaking/), client leggeri, ponti, ma anche conoscenza-zero.

### Servire gli hash dei blocchi storici dallo stato {#2935}

L'EVM fornisce attualmente l'opcode `BLOCKHASH` che consente agli sviluppatori di contratti di recuperare l'hash di un blocco direttamente nel livello di esecuzione. Tuttavia, questo è limitato solo agli ultimi 256 blocchi e potrebbe diventare problematico per i client stateless in futuro.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) crea un nuovo contratto di sistema in grado di servire gli ultimi 8192 hash di blocco come slot di archiviazione. Questo aiuta a rendere il protocollo a prova di futuro per l'esecuzione stateless e diventa più efficiente quando vengono adottati i verkle trie. Tuttavia, a parte questo, i rollup possono trarne vantaggio immediatamente, poiché possono interrogare il contratto direttamente con una finestra storica più lunga.

### Spostare l'indice della commissione al di fuori dell'Attestazione {#7549}

Il consenso della Beacon Chain si basa sui validatori che esprimono i loro voti per l'ultimo blocco e l'epoca finalizzata. L'attestazione include 3 elementi, 2 dei quali sono voti e il terzo è il valore dell'indice della commissione.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) sposta questo indice al di fuori del messaggio di attestazione firmato, il che rende più facile verificare e aggregare i voti del consenso. Ciò consentirà una maggiore efficienza in ogni client di consenso e potrà apportare significativi miglioramenti delle prestazioni ai circuiti a conoscenza-zero per la prova del consenso di Ethereum.

### Aggiungere la pianificazione dei blob ai file di configurazione EL {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) è una semplice modifica che aggiunge un nuovo campo alla configurazione del client del livello di esecuzione. Configura il numero di blocchi, consentendo l'impostazione dinamica del target e del numero massimo di blob per blocco, nonché l'adeguamento delle commissioni dei blob. Con una configurazione definita direttamente, i client possono evitare la complessità di scambiare queste informazioni tramite l'API Engine.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Per saperne di più su come Pectra ti riguarda specificamente come utente, sviluppatore o validatore di Ethereum, consulta le <a href="https://epf.wiki/#/wiki/pectra-faq">FAQ su Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Questo aggiornamento influisce su tutti i nodi e i validatori di Ethereum? {#client-impact}

Sì, l'aggiornamento Pectra richiede aggiornamenti sia per i [client di esecuzione che per i client di consenso](/developers/docs/nodes-and-clients/). Tutti i principali client di Ethereum rilasceranno versioni che supportano la biforcazione dura, contrassegnate come ad alta priorità. Per mantenere la sincronizzazione con la rete Ethereum dopo l'aggiornamento, gli operatori dei nodi devono assicurarsi di eseguire una versione client supportata. Si tenga presente che le informazioni sui rilasci dei client sono sensibili al fattore tempo e gli utenti devono fare riferimento agli ultimi aggiornamenti per dettagli attuali.

## Come si converte l'ETH dopo la biforcazione dura? {#scam-alert}

- **Nessuna azione richiesta per i tuoi ETH**: dopo l'aggiornamento Pectra di Ethereum, non è necessario convertire o aggiornare i tuoi ETH. I saldi del proprio conto rimarranno gli stessi e l'ETH che si possiede in quel momento rimarrà accessibile nella sua forma esistente dopo la biforcazione dura.
- **Attenzione alle truffe!** <Emoji text="⚠️" /> **chiunque ti dica di "aggiornare" il tuo ETH sta cercando di truffarti.** Non occorre fare nulla in relazione a questo aggiornamento. Le proprie risorse rimarranno completamente inalterate. Ricorda: essere informati è la migliore difesa contro le truffe.

[Ulteriori informazioni su come riconoscere ed evitare le truffe](/security/)

## Preferisci un approccio visivo all'apprendimento? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Cosa c'è nell'aggiornamento Pectra?_ - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Aggiornamento Pectra di Ethereum: cosa devono sapere gli staker — Blockdaemon_

## Letture consigliate {#further-reading}

- [Tabella di marcia di Ethereum](/roadmap/)
- [Domande frequenti su Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Pagina informativa Pectra.wtf](https://pectra.wtf)
- [Come Pectra migliora l'esperienza degli staker](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Pagina informativa EIP7702](https://eip7702.io/)
- [Devnet di Pectra](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
