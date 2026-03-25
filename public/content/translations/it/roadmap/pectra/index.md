---
title: Prague-Electra (Pectra)
description: Scopri l'aggiornamento del protocollo Pectra
lang: it
---

# Pectra {#pectra}

L'aggiornamento della rete Pectra ha seguito [Dencun](/roadmap/dencun/) e ha apportato modifiche sia al livello di esecuzione che al livello di consenso di Ethereum. Il nome abbreviato Pectra è una combinazione di Prague ed Electra, che sono i rispettivi nomi per le modifiche alle specifiche del livello di esecuzione e del livello di consenso. Insieme, queste modifiche portano una serie di miglioramenti agli utenti, agli sviluppatori e ai validatori di [Ethereum](/).

Questo aggiornamento è stato attivato con successo sulla rete principale di Ethereum all'epoca `364032`, il **07-Maggio-2025 alle 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
L'aggiornamento Pectra è solo un singolo passo negli obiettivi di sviluppo a lungo termine di Ethereum. Scopri di più sul [piano d'azione del protocollo](/roadmap/) e sui [precedenti aggiornamenti](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Miglioramenti in Pectra {#new-improvements}

Pectra porta il maggior numero di [EIP](https://eips.ethereum.org/) rispetto a qualsiasi aggiornamento precedente! Ci sono molte modifiche minori ma anche alcune nuove funzionalità significative. L'elenco completo delle modifiche e dei dettagli tecnici può essere trovato nei singoli EIP inclusi.

### Codice dell'account EOA {#7702}

L'[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) rappresenta un passo importante verso la diffusione dell'[astrazione dell'account](/roadmap/account-abstraction/). Con questa funzionalità, gli utenti possono impostare il proprio indirizzo ([EOA](/glossary/#eoa)) per essere esteso con un contratto intelligente. L'EIP introduce un nuovo tipo di transazione con una funzione specifica: consentire ai proprietari degli indirizzi di firmare un'autorizzazione che imposta il loro indirizzo per imitare un contratto intelligente scelto. 

Con questo EIP, gli utenti possono optare per portafogli programmabili che consentono nuove funzionalità come il raggruppamento delle transazioni, le transazioni senza gas e l'accesso personalizzato agli asset per schemi di recupero alternativi. Questo approccio ibrido combina la semplicità degli EOA con la programmabilità degli account basati su contratto. 

Leggi un approfondimento sul 7702 [qui](/roadmap/pectra/7702/)

### Aumento del saldo effettivo massimo {#7251}

L'attuale saldo effettivo del validatore è esattamente di 32 ETH. È l'importo minimo necessario per partecipare al consenso ma allo stesso tempo il massimo che un singolo validatore può mettere in stake.

L'[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) aumenta il saldo effettivo massimo possibile a 2048 ETH, il che significa che un singolo validatore può ora mettere in stake tra 32 e 2048 ETH. Invece di multipli di 32, gli staker possono ora scegliere un importo arbitrario di ETH da mettere in stake e ricevere ricompense su ogni 1 ETH al di sopra del minimo. Ad esempio, se il saldo di un validatore cresce con le sue ricompense a 33 ETH, l'1 ETH extra è considerato anch'esso parte del saldo effettivo e riceve ricompense.

Ma il vantaggio di un sistema di ricompense migliore per i validatori è solo una parte di questo miglioramento. Gli [staker](/staking/) che gestiscono più validatori possono ora aggregarli in uno solo, il che consente operazioni più semplici e riduce il sovraccarico della rete. Poiché ogni validatore nella beacon chain invia una firma in ogni epoca, i requisiti di larghezza di banda crescono con più validatori e un gran numero di firme da propagare. L'aggregazione dei validatori alleggerirà il carico della rete e aprirà nuove opzioni di scalabilità mantenendo la stessa sicurezza economica.

Leggi un approfondimento sul maxEB [qui](/roadmap/pectra/maxeb/)

### Aumento del throughput dei blob {#7691}

I blob forniscono la [disponibilità dei dati](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) per i L2. Sono stati introdotti nel [precedente aggiornamento della rete](/roadmap/dencun/). 

Attualmente, la rete punta a una media di 3 blob per blocco con un massimo di 6 blob. Con l'[EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), il conteggio medio dei blob sarà aumentato a 6, con un massimo di 9 per blocco, risultando in una maggiore capacità per i rollup di Ethereum. Questo EIP aiuta a colmare il divario finché [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) non consentirà conteggi di blob ancora più elevati.

### Aumento del costo dei calldata {#7623}

Prima dell'introduzione dei [blob nell'aggiornamento Dencun](/roadmap/danksharding), i L2 utilizzavano i [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) per archiviare i propri dati su Ethereum. Sia i blob che i calldata influiscono sull'utilizzo della larghezza di banda di Ethereum. Sebbene la maggior parte dei blocchi utilizzi solo una quantità minima di calldata, i blocchi pesanti in termini di dati che contengono anche molti blob possono essere dannosi per la rete p2p di Ethereum. 

Per risolvere questo problema, l'[EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) aumenta il prezzo dei calldata, ma solo per le transazioni pesanti in termini di dati. Questo limita la dimensione del blocco nel caso peggiore, fornisce un incentivo ai L2 a utilizzare solo i blob e lascia inalterato oltre il 99% delle transazioni.

### Uscite attivabili dal livello di esecuzione {#7002}

Attualmente, uscire da un validatore e [ritirare gli ETH in stake](/staking/withdrawals/) è un'operazione del livello di consenso che richiede una chiave del validatore attiva, la stessa chiave BLS utilizzata dal validatore per eseguire compiti attivi come le attestazioni. Le credenziali di prelievo sono una chiave fredda separata che riceve lo stake in uscita ma non può attivare l'uscita. L'unico modo per gli staker di uscire è inviare un messaggio speciale alla rete della beacon chain firmato utilizzando la chiave del validatore attiva. Questo è limitante negli scenari in cui le credenziali di prelievo e la chiave del validatore sono detenute da entità diverse o quando la chiave del validatore viene persa.

L'[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) introduce un nuovo contratto che può essere utilizzato per attivare l'uscita utilizzando le credenziali di prelievo del livello di esecuzione. Gli staker saranno in grado di uscire dal proprio validatore chiamando una funzione in questo contratto speciale senza la necessità della propria chiave di firma del validatore o dell'accesso alla beacon chain. È importante sottolineare che l'abilitazione dei prelievi dei validatori on-chain consente protocolli di staking con presupposti di fiducia ridotti nei confronti degli operatori dei nodi.

### Depositi dei validatori on-chain {#6110}

I depositi dei validatori sono attualmente elaborati da [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), che è una funzione sulla beacon chain che recupera i dati dal livello di esecuzione. È una sorta di debito tecnico dei tempi precedenti a The Merge, quando la beacon chain era una rete separata e doveva preoccuparsi delle riorganizzazioni della prova di lavoro. 

L'[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) è un nuovo modo di consegnare i depositi dall'esecuzione al livello di consenso, che consente un'elaborazione istantanea con minore complessità di implementazione. È un modo più sicuro di gestire i depositi nativo di Ethereum unito. Aiuta anche a rendere il protocollo a prova di futuro perché non richiede depositi storici per avviare il nodo, il che è necessario per la scadenza della cronologia.

### Precompilazione per BLS12-381 {#2537}

Le precompilazioni sono un set speciale di contratti intelligenti integrati direttamente nella macchina virtuale di Ethereum ([EVM](/developers/docs/evm/)). A differenza dei contratti normali, le precompilazioni non vengono distribuite dagli utenti ma fanno parte dell'implementazione stessa del client, scritte nel suo linguaggio nativo (es. Go, Java, ecc., non Solidity). Le precompilazioni servono per funzioni ampiamente utilizzate e standardizzate come le operazioni crittografiche. Gli sviluppatori di contratti intelligenti possono chiamare le precompilazioni come un contratto normale ma con maggiore sicurezza ed efficienza.

L'[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) aggiunge nuove precompilazioni per le operazioni sulle curve su [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Questa curva ellittica è diventata ampiamente utilizzata negli ecosistemi di criptovaluta grazie alle sue proprietà pratiche. Più specificamente, è stata adottata dal livello di consenso di Ethereum, dove viene utilizzata dai validatori.

La nuova precompilazione aggiunge la capacità per ogni sviluppatore di eseguire in modo semplice, efficiente e sicuro operazioni crittografiche utilizzando questa curva, ad esempio, verificando le firme. Le applicazioni on-chain che dipendono da questa curva possono diventare più efficienti in termini di gas e sicure affidandosi a una precompilazione invece che a un contratto personalizzato. Questo si applica principalmente alle applicazioni che vogliono ragionare sui validatori all'interno dell'EVM, ad es. pool di staking, [restaking](/restaking/), client leggeri, ponti ma anche a conoscenza-zero.

### Fornire gli hash dei blocchi storici dallo stato {#2935}

L'EVM fornisce attualmente l'opcode `BLOCKHASH` che consente agli sviluppatori di contratti di recuperare l'hash di un blocco direttamente nel livello di esecuzione. Tuttavia, questo è limitato solo agli ultimi 256 blocchi e potrebbe diventare problematico per i client senza stato in futuro.

L'[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) crea un nuovo contratto di sistema che può fornire gli ultimi 8192 hash dei blocchi come slot di archiviazione. Questo aiuta a rendere il protocollo a prova di futuro per l'esecuzione senza stato e diventa più efficiente quando verranno adottati i verkle trie. Tuttavia, a parte questo, i rollup possono trarne vantaggio fin da subito, poiché possono interrogare direttamente il contratto con una finestra storica più lunga.

### Spostare l'indice del comitato fuori dall'Attestazione {#7549}

Il consenso della beacon chain si basa sui validatori che esprimono i loro voti per l'ultimo blocco e l'epoca finalizzata. L'attestazione include 3 elementi, 2 dei quali sono voti e il terzo è il valore dell'indice del comitato.

L'[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) sposta questo indice al di fuori del messaggio di attestazione firmato, il che rende più facile verificare e aggregare i voti di consenso. Ciò consentirà una maggiore efficienza in ogni client di consenso e può apportare significativi miglioramenti delle prestazioni ai circuiti a conoscenza-zero per dimostrare il consenso di Ethereum.

### Aggiungere la pianificazione dei blob ai file di configurazione EL {#7840}

L'[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) è una semplice modifica che aggiunge un nuovo campo alla configurazione del client di esecuzione. Configura il numero di blocchi, abilitando l'impostazione dinamica per i conteggi target e massimi dei blob per blocco, nonché l'adeguamento della commissione dei blob. Con una configurazione definita direttamente, i client possono evitare la complessità dello scambio di queste informazioni tramite l'Engine API.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Per saperne di più su come Pectra ti influenza specificamente come utente, sviluppatore o validatore di Ethereum, consulta le <a href="https://epf.wiki/#/wiki/pectra-faq">FAQ su Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Questo aggiornamento influisce su tutti i nodi e i validatori di Ethereum? {#client-impact}

Sì, l'aggiornamento Pectra richiede aggiornamenti sia ai [client di esecuzione che ai client di consenso](/developers/docs/nodes-and-clients/). Tutti i principali client di Ethereum rilasceranno versioni che supportano la biforcazione hard contrassegnata come ad alta priorità. Per mantenere la sincronizzazione con la rete Ethereum dopo l'aggiornamento, gli operatori dei nodi devono assicurarsi di eseguire una versione del client supportata. Nota che le informazioni sulle versioni dei client sono sensibili al fattore tempo e gli utenti dovrebbero fare riferimento agli ultimi aggiornamenti per i dettagli più recenti.

## Come possono essere convertiti gli ETH dopo la biforcazione hard? {#scam-alert}

- **Nessuna azione richiesta per i tuoi ETH**: A seguito dell'aggiornamento Pectra di Ethereum, non è necessario convertire o aggiornare i tuoi ETH. I saldi del tuo account rimarranno gli stessi e gli ETH che detieni attualmente rimarranno accessibili nella loro forma esistente dopo la biforcazione hard.
- **Attenzione alle truffe!** <Emoji text="⚠️" /> **chiunque ti istruisca ad "aggiornare" i tuoi ETH sta cercando di truffarti.** Non c'è nulla che tu debba fare in relazione a questo aggiornamento. I tuoi asset rimarranno completamente inalterati. Ricorda, rimanere informati è la migliore difesa contro le truffe.

[Maggiori informazioni su come riconoscere ed evitare le truffe](/security/)

## Preferisci imparare visivamente? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Cosa c'è nell'aggiornamento Pectra? - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Aggiornamento Pectra di Ethereum: cosa devono sapere gli staker — Blockdaemon_

## Letture consigliate {#further-reading}

- [Piano d'azione di Ethereum](/roadmap/)
- [FAQ su Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Pagina informativa Pectra.wtf](https://pectra.wtf)
- [Come Pectra migliora l'esperienza degli staker](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Pagina informativa EIP7702](https://eip7702.io/)
- [Devnet di Pectra](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)