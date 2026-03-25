---
title: Glamsterdam
description: Scopri l'aggiornamento del protocollo Glamsterdam
lang: it
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam è un imminente aggiornamento di Ethereum previsto per la prima metà del 2026
</AlertTitle>
<AlertDescription>
L'aggiornamento Glamsterdam è solo un singolo passo negli obiettivi di sviluppo a lungo termine di Ethereum. Scopri di più sul [piano d'azione del protocollo](/roadmap/) e sui [precedenti aggiornamenti](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

L'imminente aggiornamento Glamsterdam di [Ethereum](/) è progettato per spianare la strada alla prossima generazione di scalabilità. Glamsterdam prende il nome dalla combinazione di "Amsterdam" (aggiornamento del livello di esecuzione, che prende il nome da una precedente sede di Devconnect) e "Gloas" (aggiornamento del livello di consenso, che prende il nome da una stella).

A seguito dei progressi compiuti nell'aggiornamento [Fusaka](/roadmap/fusaka/), Glamsterdam si concentra sulla scalabilità del L1 riorganizzando il modo in cui la rete elabora le transazioni e gestisce il suo database in crescita, aggiornando fondamentalmente il modo in cui Ethereum crea e verifica i blocchi.

Mentre Fusaka si è concentrato su perfezionamenti fondamentali, Glamsterdam porta avanti gli obiettivi "Scale L1" e "Scale Blobs" sancendo la separazione dei compiti tra i diversi partecipanti della rete e introducendo modi più efficienti per gestire i dati per preparare lo [stato](/glossary/#state) a una parallelizzazione ad alto rendimento.

Questi miglioramenti assicurano che Ethereum rimanga veloce, conveniente e decentralizzato mentre gestisce più attività, mantenendo al contempo i requisiti hardware gestibili per le persone che eseguono [nodi](/glossary/#node) a casa.

<YouTube id="GgKveVMLnoo" />

## Miglioramenti presi in considerazione per Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Nota: questo articolo attualmente evidenzia una selezione di EIP presi in considerazione per l'inclusione in Glamsterdam. Per gli ultimi aggiornamenti sullo stato, visualizza l'[aggiornamento Glamsterdam su Forkcast](https://forkcast.org/upgrade/glamsterdam).

Se desideri aggiungere un EIP in fase di valutazione per Glamsterdam, ma che non è ancora stato aggiunto a questa pagina, [scopri come contribuire a ethereum.org qui](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

L'aggiornamento Glamsterdam si concentra su tre obiettivi principali:

- Velocizzare l'elaborazione (parallelizzazione): riorganizzare il modo in cui la rete registra le dipendenze dei dati, in modo che possa elaborare in sicurezza molte transazioni contemporaneamente invece che in una lenta sequenza una per una.
- Espandere la capacità: suddividere il lavoro pesante di creazione e verifica dei blocchi, dando alla rete più tempo per propagare quantità maggiori di dati senza rallentare.
- Prevenire il gonfiamento del database (sostenibilità): adeguare le commissioni della rete per riflettere accuratamente il costo hardware a lungo termine dell'archiviazione di nuovi dati, sbloccando futuri aumenti del limite del gas e prevenendo al contempo il degrado delle prestazioni hardware.

In breve, Glamsterdam introdurrà cambiamenti strutturali per garantire che, man mano che la rete aumenta la capacità, rimanga sostenibile e le prestazioni restino elevate.

## Scalabilità del L1 ed elaborazione parallela {#scale-l1}

Una scalabilità significativa del L1 richiede l'abbandono delle ipotesi di fiducia fuori dal protocollo e dei vincoli di esecuzione seriale. Glamsterdam affronta questo problema sancendo la separazione di determinati compiti di costruzione dei blocchi e introducendo nuove strutture di dati che consentono alla rete di prepararsi per l'elaborazione parallela.

### Proposta principale: Separazione Sancita tra Proponente e Costruttore (ePBS) {#epbs}

- Rimuove le ipotesi di fiducia fuori dal protocollo e la dipendenza da relay di terze parti
- Supporta la scalabilità del L1 consentendo payload molto più grandi attraverso finestre di propagazione estese
- Introduce pagamenti trustless per i costruttori direttamente nel protocollo 

Attualmente, il processo di proposta e costruzione dei blocchi include un passaggio di consegne tra i proponenti del blocco e i costruttori del blocco. La relazione tra proponenti e costruttori non fa parte del protocollo principale di Ethereum, quindi si affida a middleware di terze parti fidati, software (relay) e fiducia fuori dal protocollo tra le entità.

La relazione fuori dal protocollo tra proponenti e costruttori crea anche un "percorso caldo" durante la convalida del blocco che costringe i [validatori](/glossary/#validator) ad affrettarsi nella trasmissione e nell'esecuzione della transazione in una stretta finestra di 2 secondi, limitando la quantità di dati che la rete può gestire.

La **Separazione Sancita tra Proponente e Costruttore (ePBS, o EIP-7732)** separa formalmente il lavoro del proponente (che seleziona il blocco di consenso) da quello del costruttore (che assembla il payload di esecuzione), sancendo questo passaggio di consegne direttamente nel protocollo. 

Costruire lo scambio trustless di un payload di blocco per il pagamento direttamente nel protocollo rimuove la necessità di middleware di terze parti (come MEV-Boost). Tuttavia, costruttori e proponenti potrebbero comunque scegliere di utilizzare relay o middleware fuori dal protocollo per funzionalità complesse che non fanno ancora parte del protocollo principale. 

Per affrontare il collo di bottiglia del "percorso caldo", l'ePBS introduce anche il Payload Timeliness Committee (PTC) e una logica a doppia scadenza, consentendo ai validatori di attestare separatamente il blocco di consenso e la tempestività del payload di esecuzione per massimizzare il rendimento.

<YouTube id="u8XvkTrjITs" />

Separare i ruoli di proponente e costruttore a livello di protocollo espande la finestra di propagazione (ovvero il tempo disponibile per diffondere i dati attraverso la rete) da 2 secondi a circa 9 secondi.

Sostituendo middleware e relay fuori dal protocollo con meccaniche interne al protocollo, l'ePBS riduce le dipendenze di fiducia e consente a Ethereum di elaborare in sicurezza quantità molto maggiori di dati (come più blob per i [livelli 2](/glossary/#layer-2)) senza stressare la rete.

**Risorse**: [Specifica tecnica dell'EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Proposta principale: Liste di Accesso a Livello di Blocco (BAL) {#bals}

- Elimina i colli di bottiglia dell'elaborazione sequenziale fornendo una mappa anticipata di tutte le dipendenze delle transazioni, ponendo le basi affinché i validatori elaborino molte transazioni in parallelo invece che una per una
- Consente ai nodi di aggiornare i propri registri leggendo i risultati finali senza dover riprodurre ogni transazione (sincronizzazione senza esecuzione), rendendo molto più veloce la sincronizzazione di un nodo alla rete
- Elimina le congetture, consentendo ai validatori di precaricare tutti i dati necessari in una volta sola invece di scoprirli passo dopo passo, il che rende la convalida molto più veloce

L'Ethereum di oggi è come una strada a corsia unica; poiché la rete non sa di quali dati avrà bisogno o modificherà una transazione (come quali account toccherà una transazione) finché una transazione non è stata eseguita, i validatori devono elaborare le transazioni una per una in una linea rigorosa e sequenziale. Se provassero a elaborare le transazioni tutte in una volta, senza conoscere queste dipendenze, due transazioni potrebbero accidentalmente tentare di modificare gli stessi identici dati contemporaneamente, causando errori.

Le **Liste di Accesso a Livello di Blocco (BAL, o EIP-7928)** sono come una mappa inclusa in ogni blocco, che dice alla rete a quali parti del database si accederà prima che inizi il lavoro. Le BAL richiedono che ogni blocco includa l'hash di ogni modifica dell'account che le transazioni toccheranno, insieme ai risultati finali di tali modifiche (il record hash di tutti gli accessi allo stato e i valori post-esecuzione).

Poiché offrono visibilità istantanea su quali transazioni non si sovrappongono, le BAL consentono ai nodi di eseguire letture parallele del disco, recuperando informazioni per molte transazioni contemporaneamente. La rete può raggruppare in sicurezza transazioni non correlate ed elaborarle in parallelo.

Poiché la BAL include i risultati finali delle transazioni (i valori post-esecuzione), quando i nodi della rete devono sincronizzarsi con lo stato attuale della rete, possono copiare quei risultati finali per aggiornare i propri registri. I validatori non devono più riprodurre da zero tutte le complicate transazioni per sapere cosa è successo, rendendo più facile e veloce per i nuovi nodi unirsi alla rete.

Le letture parallele del disco abilitate dalle BAL rappresenteranno un passo significativo verso un futuro in cui Ethereum potrà elaborare molte transazioni contemporaneamente, aumentando significativamente la velocità della rete.

#### Scambio di Liste di Accesso ai Blocchi eth/71 {#bale}

Lo Scambio di Liste di Accesso ai Blocchi (eth/71 o EIP-8159) è il compagno di rete diretto delle liste di accesso a livello di blocco. Mentre le BAL sbloccano l'esecuzione parallela, eth/71 aggiorna il protocollo peer-to-peer per consentire ai nodi di condividere effettivamente queste liste sulla rete. L'implementazione dello scambio di liste di accesso ai blocchi consentirà una sincronizzazione più rapida e permetterà ai nodi di eseguire aggiornamenti di stato senza esecuzione.

**Risorse**:

- [Specifica tecnica dell'EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Specifica tecnica dell'EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Sostenibilità della rete {#network-sustainability}

Man mano che la rete Ethereum cresce più velocemente, è importante garantire che il costo del suo utilizzo corrisponda all'usura dell'hardware che esegue Ethereum. La rete deve aumentare i suoi limiti di capacità complessivi per poter scalare in sicurezza ed elaborare più transazioni.

### Aumento del costo del gas per la creazione dello stato {#state-creation-gas-cost-increase}

- Assicura che le commissioni per creare nuovi account o contratti intelligenti riflettano accuratamente l'onere a lungo termine che impongono al database di Ethereum
- Regola automaticamente queste commissioni di creazione dei dati in base alla capacità complessiva della rete, puntando a un tasso di crescita sicuro e prevedibile in modo che l'hardware fisico standard possa continuare a eseguire la rete
- Separa la contabilità per queste commissioni specifiche in un nuovo serbatoio, rimuovendo i vecchi limiti delle transazioni e consentendo agli sviluppatori di distribuire applicazioni più grandi e complesse

L'aggiunta di nuovi account, token e [contratti intelligenti](/glossary/#smart-contract) crea dati permanenti (noti come "stato") che ogni computer che esegue la rete deve archiviare a tempo indeterminato. Le attuali commissioni per aggiungere o leggere questi dati sono incoerenti e non riflettono necessariamente l'effettivo onere di archiviazione a lungo termine che impongono all'hardware della rete.

Alcune azioni che creano stato su Ethereum, come la creazione di nuovi account o la distribuzione di grandi contratti intelligenti, sono state a costo relativamente basso rispetto allo spazio di archiviazione permanente che occupano sui nodi della rete; ad esempio, la distribuzione dei contratti è significativamente più economica per byte rispetto alla creazione di slot di archiviazione.

Senza adeguamenti, lo stato di Ethereum potrebbe crescere di quasi 200 GiB all'anno se la rete scala a un limite del gas di 100M, superando infine l'hardware comune.

L'**Aumento del costo del gas per la creazione dello stato (o EIP-8037)** armonizza i costi legandoli alle dimensioni effettive dei dati creati, aggiornando le commissioni in modo che siano proporzionali alla quantità di dati permanenti che un'operazione crea o a cui accede.

L'EIP-8037 introduce anche un modello a serbatoio per gestire questi costi in modo più prevedibile; gli addebiti del gas di stato attingono prima dallo `state_gas_reservoir` e l'opcode `GAS` restituisce solo `gas_left`, impedendo ai frame di esecuzione di calcolare in modo errato il gas disponibile.

Prima dell'EIP-8037, sia il lavoro computazionale (l'elaborazione attiva) sia l'archiviazione permanente dei dati (il salvataggio del contratto intelligente nel database della rete) condividevano lo stesso limite del gas. Il modello a serbatoio divide la contabilità: il limite del gas per l'effettivo lavoro computazionale della transazione (elaborazione) e per l'archiviazione dei dati a lungo termine (gas di stato). Separare i due aiuta a impedire che le sole dimensioni dei dati di un'applicazione esauriscano il limite del gas; finché gli sviluppatori forniscono fondi sufficienti per riempire il serbatoio per l'archiviazione dei dati, possono distribuire contratti intelligenti molto più grandi e complessi.

Prezzare l'archiviazione dei dati in modo più accurato e prevedibile aiuterà Ethereum ad aumentare in sicurezza la sua velocità e capacità senza gonfiare il database. Questa sostenibilità consentirà agli operatori dei nodi di continuare a utilizzare hardware (relativamente) conveniente per gli anni a venire, mantenendo accessibile lo staking domestico per preservare la decentralizzazione della rete.

**Risorse**: [Specifica tecnica dell'EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Aggiornamento del costo del gas per l'accesso allo stato {#state-access-gas-cost-update}

- Aumenta i costi del gas per quando le applicazioni leggono o aggiornano informazioni archiviate permanentemente su Ethereum (opcode di accesso allo stato) per farli corrispondere accuratamente al lavoro di calcolo richiesto da questi comandi
- Rafforza la resilienza della rete prevenendo attacchi denial-of-service che sfruttano operazioni di lettura dei dati artificialmente economiche

Man mano che lo stato di Ethereum è cresciuto, l'atto di cercare e leggere vecchi dati ("accesso allo stato") è diventato più pesante e lento da elaborare per i nodi. Le commissioni per queste azioni sono rimaste le stesse anche se ora è leggermente più costoso cercare informazioni (in termini di potenza di calcolo).

Di conseguenza, alcuni comandi specifici sono attualmente sottocosto rispetto al lavoro che costringono un nodo a svolgere. `EXTCODESIZE` ed `EXTCODECOPY` sono sottocosto, ad esempio, perché richiedono due letture separate del database: una per l'oggetto account e una seconda per le dimensioni effettive del codice o del bytecode.

L'**Aggiornamento del costo del gas per l'accesso allo stato (o EIP-8038)** aumenta le costanti del gas per gli opcode di accesso allo stato, come la ricerca dei dati di account e contratti, per allinearli alle prestazioni dell'hardware moderno e alle dimensioni dello stato.

Allineare il costo dell'accesso allo stato aiuta anche a rendere Ethereum più resiliente. Poiché queste pesanti azioni di lettura dei dati sono artificialmente economiche, un utente malintenzionato potrebbe inondare la rete con migliaia di richieste di dati complesse in un singolo blocco prima di raggiungere il limite delle commissioni della rete, causando potenzialmente lo stallo o l'arresto anomalo della rete (un attacco denial-of-service). Anche senza intenti malevoli, gli sviluppatori non sono incoraggiati economicamente a creare applicazioni efficienti se la lettura dei dati di rete è troppo economica.

Prezzando le azioni di accesso allo stato in modo più accurato, Ethereum può essere più resiliente contro rallentamenti accidentali o intenzionali, mentre l'allineamento dei costi di rete con il carico hardware si rivela una base più sostenibile per futuri aumenti del limite del gas.

**Risorse**: [Specifica tecnica dell'EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Resilienza della rete

I perfezionamenti ai compiti dei validatori e ai processi di uscita garantiscono la stabilità della rete durante eventi di slashing di massa e democratizzano la liquidità. Questi miglioramenti rendono la rete più stabile e assicurano che tutti i partecipanti, grandi e piccoli, siano trattati in modo equo.

### Escludere i validatori puniti dalla proposta {#exclude-slashed-validators}

- Impedisce ai validatori penalizzati (puniti) di essere selezionati per proporre blocchi futuri, eliminando gli slot persi garantiti
- Mantiene Ethereum in funzione in modo fluido e affidabile, prevenendo gravi stalli in caso di un evento di slashing di massa

Attualmente, anche se un validatore viene punito (penalizzato per aver infranto le regole o non aver operato come previsto), il sistema potrebbe comunque sceglierlo per guidare un blocco nel prossimo futuro quando genera previsioni sui futuri proponenti.

Poiché i blocchi provenienti da proponenti puniti vengono automaticamente rifiutati come non validi, ciò fa sì che la rete perda slot e ritarda il ripristino della rete durante eventi di slashing di massa.

**Escludere i validatori puniti dalla proposta (o EIP-8045)** filtra semplicemente i validatori puniti dall'essere selezionati per compiti futuri. Ciò migliora la resilienza della catena garantendo che solo i validatori sani vengano selezionati per proporre blocchi, mantenendo la qualità del servizio durante le interruzioni della rete.

**Risorse**: [Specifica tecnica dell'EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Consentire alle uscite di utilizzare la coda di consolidamento {#let-exits-use-the-consolidation-queue}

- Chiude una scappatoia che consente ai validatori con saldi elevati di uscire dalla rete più rapidamente rispetto ai validatori più piccoli tramite la coda di consolidamento
- Consente alle uscite regolari di riversarsi in questa seconda coda quando ha capacità di riserva, riducendo i tempi di prelievo dello staking durante i periodi di volume elevato
- Mantiene una sicurezza rigorosa per evitare di alterare i limiti di sicurezza principali di Ethereum o di indebolire la rete

Poiché l'[aggiornamento Pectra](/roadmap/pectra) ha aumentato il saldo effettivo massimo per i validatori di Ethereum da 32 ETH a 2.048 ETH, una scappatoia tecnica consente ai validatori con saldi elevati di uscire dalla rete più velocemente rispetto ai validatori più piccoli tramite la coda di consolidamento.

**Consentire alle uscite di utilizzare la coda di consolidamento (o EIP-8080)** democratizza la coda di consolidamento per tutte le uscite dallo staking, creando un'unica fila equa per tutti.

Per analizzare come funziona oggi:

- Il limite di abbandono (churn limit) di Ethereum è un limite di sicurezza sulla velocità con cui i validatori possono entrare, uscire o unire (consolidare) i loro ETH in staking, per garantire che la sicurezza della rete non venga mai destabilizzata
- Poiché il consolidamento di un validatore è un'azione più pesante con più parti in movimento rispetto a un'uscita standard di un validatore, consuma una porzione maggiore di questo budget di sicurezza (limite di abbandono)
- Nello specifico, il protocollo stabilisce che l'esatto costo di sicurezza di un'uscita standard è pari a due terzi (2/3) del costo di un consolidamento

Code di uscita più eque consentiranno alle uscite standard di prendere in prestito spazio inutilizzato dalla coda di consolidamento durante i periodi di elevata domanda di uscita, applicando un tasso di cambio "3 per 2" (per ogni 2 posti di consolidamento inutilizzati, la rete può elaborare in sicurezza 3 uscite standard). Questo fattore di abbandono 3/2 bilancia la domanda tra le code di consolidamento e di uscita.

Democratizzare l'accesso alla coda di consolidamento aumenterà la velocità con cui gli utenti possono uscire dal loro stake durante i periodi di forte domanda fino a 2,5 volte, senza compromettere la sicurezza della rete.

**Risorse**: [Specifica tecnica dell'EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Migliorare l'esperienza di utenti e sviluppatori {#improve-user-developer-experience}

L'aggiornamento Glamsterdam di Ethereum mira a migliorare l'esperienza dell'utente, potenziare la rilevabilità dei dati e gestire le crescenti dimensioni dei messaggi per prevenire errori di sincronizzazione. Ciò rende più facile tracciare ciò che accade on-chain prevenendo al contempo intoppi tecnici man mano che la rete scala.

### Ridurre i costi intrinseci del gas delle transazioni {#reduce-intrinsic-transaction-gas-costs}

- Abbassa la commissione di base per le transazioni, riducendo il costo complessivo di un semplice pagamento nativo in ETH
- Rende i trasferimenti più piccoli più convenienti, aumentando la fattibilità di Ethereum come mezzo di scambio di routine

Tutte le transazioni di Ethereum hanno oggi una commissione di base fissa per il gas, indipendentemente da quanto sia semplice o complessa da elaborare. **Ridurre il gas intrinseco delle transazioni (o EIP-2780)** propone di ridurre tale commissione di base per rendere un trasferimento standard di ETH tra account esistenti fino al **71% più economico**.

La riduzione del gas intrinseco delle transazioni funziona scomponendo la commissione della transazione per riflettere solo il lavoro di base ed essenziale che i computer che eseguono la rete svolgono effettivamente, come la verifica di una firma digitale e l'aggiornamento di un saldo. Poiché un pagamento di base in ETH non esegue codice complesso né trasporta dati extra, questa proposta ridurrebbe la sua commissione per adeguarla alla sua impronta leggera.

La proposta introduce un'eccezione per la creazione di account nuovi di zecca per evitare che commissioni più basse travolgano lo stato della rete. Se un trasferimento invia ETH a un indirizzo vuoto e inesistente, la rete deve creare un nuovo record permanente per esso. Viene aggiunto un supplemento di gas per la creazione di quell'account per aiutare a coprire il suo onere di archiviazione a lungo termine.

Insieme, l'EIP-2780 mira a rendere i trasferimenti quotidiani tra account esistenti più convenienti, garantendo al contempo che la rete sia ancora protetta dal gonfiamento del database prezzando accuratamente la vera crescita dello stato.

**Risorse**: [Specifica tecnica dell'EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Predistribuzione Deterministica della Fabbrica {#deterministic-factory-predeploy}

- Offre agli sviluppatori un modo nativo per distribuire applicazioni e portafogli di contratti intelligenti allo stesso identico indirizzo su più catene
- Consente agli utenti di avere lo stesso indirizzo del portafoglio intelligente su più reti di livello 2 (L2), riducendo il carico cognitivo, la confusione e il rischio di perdita accidentale di fondi
- Sostituisce le soluzioni alternative che gli sviluppatori utilizzano attualmente per ottenere questa parità, rendendo più facile e sicuro creare portafogli e app multi-catena

Se un utente ha oggi un portafoglio di contratti intelligenti con account su più catene compatibili con la Macchina Virtuale di Ethereum (EVM), spesso finisce per avere un indirizzo completamente diverso su reti diverse. Questo non solo crea confusione, ma può portare alla perdita accidentale di fondi.

La **Predistribuzione Deterministica della Fabbrica (o EIP-7997)** offre agli sviluppatori un modo nativo e integrato per distribuire le loro applicazioni decentralizzate e i portafogli di contratti intelligenti allo stesso identico indirizzo su più catene EVM, tra cui la rete principale di Ethereum, le reti di livello 2 (L2) e altro ancora. Se adottata, consentirebbe all'utente di avere lo stesso identico indirizzo su ogni catena partecipante, riducendo significativamente il carico cognitivo e il potenziale di errore dell'utente.

La Predistribuzione Deterministica della Fabbrica funziona posizionando permanentemente un programma di fabbrica minimo e specializzato in una posizione identica (nello specifico, l'indirizzo 0x12) su ogni catena compatibile con EVM partecipante. Il suo obiettivo è fornire un contratto di fabbrica universale e standard che possa essere adottato da qualsiasi rete compatibile con EVM; finché una catena EVM partecipa e adotta questo standard, gli sviluppatori potranno utilizzarlo per distribuire i loro contratti intelligenti allo stesso identico indirizzo su quella rete.

Questa standardizzazione semplifica la creazione e la gestione di applicazioni cross-chain per gli sviluppatori e l'ecosistema più ampio. Gli sviluppatori non devono più creare codice personalizzato e specifico per la catena per collegare il loro software su reti diverse, utilizzando invece questa fabbrica universale per generare lo stesso identico indirizzo per la loro applicazione ovunque. Inoltre, gli esploratori di blocchi, i servizi di tracciamento e i portafogli possono identificare e collegare più facilmente queste applicazioni e account su varie catene, creando un ambiente multi-catena più unificato e senza interruzioni per tutti i partecipanti basati su Ethereum.

**Risorse**: [Specifica tecnica dell'EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### I trasferimenti e i burn di ETH emettono un log {#eth-transfers-and-burns-emit-a-log}

- Genera automaticamente un record permanente (log) ogni volta che ETH viene trasferito o bruciato
- Risolve un punto cieco storico che consente ad app, exchange e ponti di rilevare in modo affidabile i depositi degli utenti senza strumenti di tracciamento ad hoc

A differenza dei token (ERC-20), i normali trasferimenti di ETH tra contratti intelligenti non emettono una ricevuta chiara (log standard), rendendoli difficili da tracciare per exchange e app.

I trasferimenti e i burn di ETH emettono un log (o EIP-7708) rende obbligatorio per la rete emettere un evento di log standard ogni volta che una quantità non nulla di ETH viene spostata o bruciata.

Ciò renderà molto più semplice e affidabile per portafogli, exchange e operatori di ponti tracciare accuratamente depositi e movimenti senza strumenti personalizzati.

**Risorse**: [Specifica tecnica dell'EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### Liste parziali di ricevute dei blocchi eth/70 {#eth-70-partial-block-receipt-lists}

Man mano che aumentiamo la quantità di lavoro che Ethereum può svolgere, le liste di ricevute per quelle azioni (i record di dati di queste transazioni) stanno diventando così grandi che potrebbero potenzialmente causare il fallimento dei nodi della rete durante il tentativo di sincronizzare i dati tra loro.

Le liste parziali di ricevute dei blocchi eth/70 (o EIP-7975) introducono un nuovo modo per i nodi di comunicare tra loro (eth/70) che consente di suddividere queste grandi liste in parti più piccole e gestibili. eth/70 introduce un sistema di impaginazione per il protocollo di comunicazione della rete che consente ai nodi di scomporre le liste di ricevute dei blocchi e richiedere in sicurezza i dati in blocchi più piccoli e gestibili.

Questa modifica preverrebbe errori di sincronizzazione della rete durante i periodi di intensa attività. In definitiva, spiana la strada a Ethereum per aumentare la sua capacità dei blocchi ed elaborare più transazioni per blocco in futuro, senza sovraccaricare l'hardware fisico che sincronizza la catena.

**Risorse**: [Specifica tecnica dell'EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Letture consigliate {#further-reading}

- [Piano d'azione di Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Meta EIP di Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Annuncio sul blog dell'aggiornamento delle priorità del protocollo per il 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum post-quantistico, Glamsterdam sta arrivando](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## Domande frequenti {#faq}

### Come possono essere convertiti gli ETH dopo la biforcazione hard Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Nessuna azione richiesta per i tuoi ETH**: non è necessario convertire o aggiornare i tuoi ETH in seguito all'aggiornamento Glamsterdam. I saldi del tuo account rimarranno gli stessi e gli ETH che possiedi attualmente rimarranno accessibili nella loro forma esistente dopo la biforcazione hard.
- **Attenzione alle truffe!** <Emoji text="⚠️" /> **chiunque ti istruisca ad "aggiornare" i tuoi ETH sta cercando di truffarti.** Non c'è nulla che tu debba fare in relazione a questo aggiornamento. Le tue risorse rimarranno completamente inalterate. Ricorda, rimanere informati è la migliore difesa contro le truffe.

[Maggiori informazioni su come riconoscere ed evitare le truffe](/security/)

### L'aggiornamento Glamsterdam influisce su tutti i nodi e i validatori di Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Sì, l'aggiornamento Glamsterdam richiede aggiornamenti sia ai [client di esecuzione che ai client di consenso](/developers/docs/nodes-and-clients/). Poiché questo aggiornamento introduce la Separazione Sancita tra Proponente e Costruttore (ePBS), gli operatori dei nodi dovranno assicurarsi che i loro client siano aggiornati per gestire i nuovi modi in cui i blocchi vengono costruiti, convalidati e attestati dalla rete.

Tutti i principali client di Ethereum rilasceranno versioni che supportano la biforcazione hard contrassegnate come ad alta priorità. Puoi tenerti aggiornato su quando queste versioni saranno disponibili nei repository GitHub dei client, nei loro [canali Discord](https://ethstaker.org/support), nel [Discord di EthStaker](https://dsc.gg/ethstaker) o iscrivendoti al blog di Ethereum per gli aggiornamenti del protocollo.

Per mantenere la sincronizzazione con la rete Ethereum dopo l'aggiornamento, gli operatori dei nodi devono assicurarsi di eseguire una versione del client supportata. Tieni presente che le informazioni sulle versioni dei client sono sensibili al fattore tempo e gli utenti dovrebbero fare riferimento agli ultimi aggiornamenti per i dettagli più recenti.

### Come staker, cosa devo fare per l'aggiornamento Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Come per ogni aggiornamento della rete, assicurati di aggiornare i tuoi client alle ultime versioni contrassegnate con il supporto per Glamsterdam. Segui gli aggiornamenti nella mailing list e negli [Annunci del protocollo sul blog della EF](https://blog.ethereum.org/category/protocol) per essere informato sulle versioni.

Per convalidare la tua configurazione prima che Glamsterdam venga attivato sulla rete principale, puoi eseguire un validatore sulle reti di test. Anche le biforcazioni delle reti di test vengono annunciate nella mailing list e nel blog.

### Quali miglioramenti includerà Glamsterdam per la scalabilità del L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

La funzionalità principale è l'ePBS (EIP-7732), che separa il pesante compito di convalidare le transazioni della rete dal compito di raggiungere il consenso. Ciò espande la finestra di propagazione dei dati da 2 secondi a circa 9 secondi, sbloccando la capacità di Ethereum di gestire in sicurezza un rendimento delle transazioni molto più elevato e di accogliere più blob di dati per le reti di livello 2.

### Glamsterdam abbasserà le commissioni su Ethereum (livello 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Sì, molto probabilmente Glamsterdam ridurrà le commissioni per gli utenti di tutti i giorni! Ridurre il gas intrinseco delle transazioni (o EIP-2780) riduce la commissione di base per l'invio di ETH, rendendo gli ETH molto più economici da utilizzare per i pagamenti quotidiani.

Inoltre, per la sostenibilità a lungo termine, Glamsterdam introduce le Liste di Accesso a Livello di Blocco (BAL). Ciò abilita l'elaborazione parallela e prepara il L1 a gestire in sicurezza limiti del gas complessivi più elevati in futuro, il che probabilmente ridurrà i costi del gas per transazione man mano che la capacità cresce.

### Ci saranno modifiche ai miei contratti intelligenti esistenti dopo Glamsterdam? {#will-my-smart-contracts-change}

I contratti esistenti continueranno a funzionare normalmente dopo Glamsterdam. Gli sviluppatori otterranno probabilmente diversi nuovi strumenti e dovrebbero rivedere il loro utilizzo del gas:

- Aumentare la dimensione massima del contratto (o EIP-7954) consente agli sviluppatori di distribuire applicazioni più grandi, innalzando il limite massimo della dimensione del contratto da circa 24KiB a 32KiB.
- La predistribuzione deterministica della fabbrica (o EIP-7997) introduce un contratto di fabbrica universale e integrato. Consente agli sviluppatori di distribuire le loro applicazioni e i portafogli di contratti intelligenti allo stesso identico indirizzo su tutte le catene EVM partecipanti.
- Se la tua app si affida a un tracciamento complesso per trovare i trasferimenti di ETH, I trasferimenti e i burn di ETH emettono un log (o EIP-7708) ti consentirà di passare all'utilizzo dei log per una contabilità più semplice e affidabile.
- L'aumento del costo del gas per la creazione dello stato (o EIP-8037) e l'aggiornamento del costo del gas per l'accesso allo stato (o EIP-8038) introducono nuovi modelli di sostenibilità che cambieranno determinati costi di distribuzione dei contratti, poiché la creazione di nuovi account o di archiviazione permanente avrà una commissione ad adeguamento dinamico.

### In che modo Glamsterdam influirà sull'archiviazione dei nodi e sui requisiti hardware? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Diversi EIP in fase di valutazione per Glamsterdam affrontano il crollo delle prestazioni dovuto alla crescita dello stato:

- L'aumento del costo del gas per la creazione dello stato (o EIP-8037) introduce un modello di determinazione dei prezzi dinamico per puntare a un tasso di crescita del database di stato di 100 GiB/anno, garantendo che l'hardware fisico standard possa continuare a eseguire la rete in modo efficiente.
- Le liste parziali di ricevute dei blocchi eth/70 (o EIP-7975) consentono ai nodi di richiedere ricevute dei blocchi impaginate, il che scompone le liste di ricevute dei blocchi ricche di dati in blocchi più piccoli per prevenire arresti anomali e problemi di sincronizzazione man mano che Ethereum scala.