---
title: Glamsterdam
description: Scopri di più sull'aggiornamento del protocollo Glamsterdam
lang: it
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam è un imminente aggiornamento di Ethereum previsto per il primo semestre del 2026
</AlertTitle>
<AlertDescription>
L'aggiornamento Glamsterdam è solo un singolo passo negli obiettivi di sviluppo a lungo termine di Ethereum. Scopri di più sulla [tabella di marcia del protocollo](/roadmap/) e sugli [aggiornamenti precedenti](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

L'imminente aggiornamento Glamsterdam di [Ethereum](/) è progettato per spianare la strada alla prossima generazione di scalabilità. Glamsterdam prende il nome dalla combinazione di "Amsterdam" (aggiornamento del livello di esecuzione, che prende il nome da una precedente sede di Devconnect) e "Gloas" (aggiornamento del livello di consenso, che prende il nome da una stella).

In seguito ai progressi compiuti con l'aggiornamento [Fusaka](/roadmap/fusaka/), Glamsterdam si concentra sulla scalabilità dell'L1 riorganizzando il modo in cui la rete elabora le transazioni e gestisce il suo crescente database, aggiornando radicalmente il modo in cui Ethereum crea e verifica i blocchi.

Mentre Fusaka si è concentrato su perfezionamenti fondamentali, Glamsterdam porta avanti gli obiettivi "Scale L1" e "Scale Blobs" sancendo la separazione dei compiti tra i diversi partecipanti alla rete e introducendo modi più efficienti di gestire i dati per preparare lo [stato](/glossary/#state) alla parallelizzazione ad alto rendimento.

Questi miglioramenti assicurano che Ethereum rimanga veloce, accessibile e decentralizzato mentre gestisce più attività, mantenendo al contempo requisiti hardware gestibili per coloro che eseguono [nodi](/glossary/#node) da casa.

<YouTube id="GgKveVMLnoo" />

## Miglioramenti considerati per Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Nota: questo articolo attualmente evidenzia una selezione di EIP in fase di valutazione per l'inclusione in Glamsterdam. Per gli ultimi aggiornamenti sullo stato, consulta [l'aggiornamento Glamsterdam su Forkcast](https://forkcast.org/upgrade/glamsterdam).

Se vuoi aggiungere un EIP in fase di valutazione per Glamsterdam, ma che non è stato ancora aggiunto a questa pagina, [scopri come contribuire a ethereum.org qui](/contributing/). </AlertDescription> </AlertContent> </Alert>

L'aggiornamento Glamsterdam si concentra su tre obiettivi principali:

- Accelerare l'elaborazione (parallelizzazione): riorganizzare il modo in cui la rete registra le dipendenze dei dati, in modo che possa elaborare in sicurezza molte transazioni contemporaneamente invece che in una lenta sequenza una per una.
- Aumentare la capacità: suddividere il lavoro pesante di creazione e verifica dei blocchi, dando alla rete più tempo per propagare maggiori quantità di dati senza rallentare.
- Prevenire il gonfiore del database (sostenibilità): adeguare le commissioni di rete per riflettere accuratamente il costo hardware a lungo termine dell'archiviazione di nuovi dati, sbloccando futuri aumenti del limite del gas e prevenendo al contempo il degrado delle prestazioni hardware.

In breve, Glamsterdam introdurrà cambiamenti strutturali per garantire che, con l'aumento della capacità della rete, essa rimanga sostenibile e le prestazioni elevate.

## Scalabilità L1 e elaborazione parallela {#scale-l1}

Una scalabilità L1 significativa richiede l'abbandono delle ipotesi di fiducia fuori dal protocollo e dei vincoli di esecuzione seriale. Glamsterdam affronta questo problema sancendo la separazione di alcuni compiti di costruzione dei blocchi e introducendo nuove strutture di dati che consentono alla rete di prepararsi all'elaborazione parallela.

### Proposta principale: Enshrined Proposer-Builder Separation (ePBS) {#epbs}

- Rimuove le ipotesi di fiducia fuori dal protocollo e la dipendenza da relè di terze parti
- Supporta la scalabilità L1 consentendo carichi utili molto più grandi attraverso finestre di propagazione estese
- Introduce i pagamenti trustless per i costruttori direttamente nel protocollo

Attualmente, il processo di proposta e costruzione dei blocchi include un passaggio di consegne tra i proponenti dei blocchi e i costruttori di blocchi. La relazione tra proponenti e costruttori non fa parte del protocollo principale di Ethereum, quindi si basa su middleware di terze parti fidati, software (relè) e fiducia fuori dal protocollo tra le entità.

La relazione fuori dal protocollo tra proponenti e costruttori crea anche un "percorso critico" durante la convalida del blocco che costringe i [validatori](/glossary/#validator) ad affrettarsi nella trasmissione e nell'esecuzione delle transazioni in una stretta finestra di 2 secondi, limitando la quantità di dati che la rete può gestire.

**Enshrined Proposer-Builder Separation (ePBS, o EIP-7732)** separa formalmente il lavoro del proponente (che seleziona il blocco di consenso) da quello del costruttore (che assembla il payload di esecuzione), sancendo questo passaggio di consegne direttamente nel protocollo.

Integrare lo scambio trustless di un payload di un blocco per il pagamento direttamente nel protocollo elimina la necessità di middleware di terze parti (come MEV-Boost). Tuttavia, costruttori e proponenti potrebbero comunque scegliere di utilizzare relè o middleware fuori dal protocollo per funzionalità complesse che non fanno ancora parte del protocollo principale.

Per affrontare il collo di bottiglia del "percorso critico", ePBS introduce anche il Payload Timeliness Committee (PTC) e una logica a doppia scadenza, consentendo ai validatori di attestare separatamente la tempestività del blocco di consenso e del payload di esecuzione per massimizzare il throughput.

<YouTube id="u8XvkTrjITs" />

La separazione dei ruoli di proponente e costruttore a livello di protocollo estende la finestra di propagazione (o il tempo disponibile per diffondere i dati attraverso la rete) da 2 a circa 9 secondi.

Sostituendo middleware e relè fuori dal protocollo con meccanismi interni al protocollo, ePBS riduce le dipendenze dalla fiducia e consente a Ethereum di elaborare in sicurezza quantità di dati molto più grandi (come più blob per i [livelli 2](/glossary/#layer-2)) senza stressare la rete.

**Risorse**: [specifica tecnica EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Proposta principale: Block-Level Access Lists (BALs) {#bals}

- Elimina i colli di bottiglia dell'elaborazione sequenziale fornendo una mappa anticipata di tutte le dipendenze delle transazioni, preparando il terreno affinché i validatori elaborino molte transazioni in parallelo invece che una per una
- Consente ai nodi di aggiornare i propri registri leggendo i risultati finali senza dover rieseguire ogni transazione (sincronizzazione senza esecuzione), rendendo molto più veloce la sincronizzazione di un nodo con la rete
- Elimina le congetture, consentendo ai validatori di precaricare tutti i dati necessari in una sola volta invece di scoprirli passo dopo passo, il che rende la convalida molto più veloce

L'Ethereum di oggi è come una strada a una sola corsia; poiché la rete non sa quali dati una transazione necessiterà o modificherà (come quali account una transazione toccherà) finché la transazione non è stata eseguita, i validatori devono elaborare le transazioni una per una in una linea stretta e sequenziale. Se cercassero di elaborare le transazioni tutte in una volta, senza conoscere queste dipendenze, due transazioni potrebbero accidentalmente provare a modificare gli stessi identici dati nello stesso momento, causando errori.

**Le Block-Level Access Lists (BAL, o EIP-7928)** sono come una mappa inclusa in ogni blocco, che indica alla rete quali parti del database saranno accessibili prima dell'inizio del lavoro. Le BAL richiedono che ogni blocco includa l'hash di ogni modifica di account che le transazioni toccheranno, insieme ai risultati finali di tali modifiche (il record hash di tutti gli accessi allo stato e i valori post-esecuzione).

Poiché forniscono una visibilità istantanea su quali transazioni non si sovrappongono, le BAL consentono ai nodi di eseguire letture parallele su disco, recuperando informazioni per molte transazioni contemporaneamente. La rete può raggruppare in sicurezza le transazioni non correlate ed elaborarle in parallelo.

Poiché la BAL include i risultati finali delle transazioni (i valori post-esecuzione), quando i nodi della rete devono sincronizzarsi con lo stato corrente della rete, possono copiare tali risultati finali per aggiornare i propri registri. I validatori non devono più rieseguire tutte le complicate transazioni da zero per sapere cosa è successo, rendendo più veloce e più facile per i nuovi nodi unirsi alla rete.

Le letture parallele su disco abilitate dalle BAL costituiranno un passo significativo verso un futuro in cui Ethereum potrà elaborare molte transazioni contemporaneamente, aumentando notevolmente la velocità della rete.

#### eth/71 Block Access List Exchange {#bale}

Block Access List Exchange (eth/71 o EIP-8159) è il compagno di rete diretto delle liste di accesso a livello di blocco. Mentre le BAL sbloccano l'esecuzione parallela, eth/71 aggiorna il protocollo peer-to-peer per consentire ai nodi di condividere effettivamente queste liste sulla rete. L'implementazione dello scambio delle liste di accesso ai blocchi consentirà una sincronizzazione più rapida e permetterà ai nodi di eseguire aggiornamenti dello stato senza esecuzione.

**Risorse**:

- [Specifica tecnica EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Specifica tecnica EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Sostenibilità della rete {#network-sustainability}

Man mano che la rete Ethereum cresce più velocemente, è importante garantire che il costo del suo utilizzo corrisponda all'usura dell'hardware che esegue Ethereum. La rete deve aumentare i suoi limiti di capacità complessivi per poter scalare in sicurezza ed elaborare più transazioni.

### Aumento del costo del gas per la creazione dello stato {#state-creation-gas-cost-increase}

- Garantisce che le commissioni per la creazione di nuovi account o contratti intelligenti riflettano accuratamente l'onere a lungo termine che impongono al database di Ethereum
- Regola automaticamente queste commissioni di creazione dei dati in base alla capacità complessiva della rete, mirando a un tasso di crescita sicuro e prevedibile in modo che l'hardware fisico standard possa continuare a far funzionare la rete
- Separa la contabilità di queste commissioni specifiche in un nuovo serbatoio, rimuovendo i vecchi limiti di transazione e consentendo agli sviluppatori di implementare applicazioni più grandi e complesse

L'aggiunta di nuovi account, token e [contratti intelligenti](/glossary/#smart-contract) crea dati permanenti (noti come "stato") che ogni computer che esegue la rete deve archiviare a tempo indeterminato. Le commissioni attuali per aggiungere o leggere questi dati sono incoerenti e non riflettono necessariamente l'effettivo onere di archiviazione a lungo termine che impongono sull'hardware della rete.

Alcune azioni che creano uno stato su Ethereum, come la creazione di nuovi account o l'implementazione di grandi contratti intelligenti, hanno avuto un costo relativamente basso rispetto allo spazio di archiviazione permanente che occupano sui nodi della rete; ad esempio, l'implementazione di un contratto è significativamente più economica per byte rispetto alla creazione di slot di archiviazione.

Senza aggiustamenti, lo stato di Ethereum potrebbe crescere di quasi 200 GiB all'anno se la rete scalasse fino a un limite del gas di 100M, superando alla fine l'hardware comune.

**L'aumento del costo del gas per la creazione dello stato (o EIP-8037)** armonizza i costi legandoli alla dimensione effettiva dei dati creati, aggiornando le commissioni in modo che siano proporzionali alla quantità di dati permanenti che un'operazione crea o a cui accede.

L'EIP-8037 introduce anche un modello a serbatoio per gestire questi costi in modo più prevedibile; i costi del gas dello stato attingono prima dal `state_gas_reservoir` e l'opcode `GAS` restituisce solo `gas_left`, impedendo ai frame di esecuzione di calcolare erroneamente il gas disponibile.

Prima dell'EIP-8037, sia il lavoro computazionale (l'elaborazione attiva) che l'archiviazione permanente dei dati (il salvataggio del contratto intelligente nel database della rete) condividono lo stesso limite del gas. Il modello a serbatoio suddivide la contabilità: il limite del gas per il lavoro computazionale effettivo della transazione (elaborazione) e per l'archiviazione dei dati a lungo termine (gas dello stato). La separazione dei due aiuta a prevenire che la dimensione pura dei dati di un'applicazione raggiunga il limite del gas; finché gli sviluppatori forniscono fondi sufficienti per riempire il serbatoio per l'archiviazione dei dati, possono implementare contratti intelligenti molto più grandi e complessi.

Prezzare l'archiviazione dei dati in modo più accurato e prevedibile aiuterà Ethereum ad aumentare in sicurezza la sua velocità e capacità senza gonfiare il database. Questa sostenibilità consentirà agli operatori di nodi di continuare a utilizzare hardware (relativamente) accessibile per gli anni a venire, mantenendo accessibile lo staking domestico per preservare la decentralizzazione della rete.

**Risorse**: [specifica tecnica EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Aggiornamento del costo del gas per l'accesso allo stato {#state-access-gas-cost-update}

- Aumenta i costi del gas per quando le applicazioni leggono o aggiornano le informazioni archiviate in modo permanente su Ethereum (opcode di accesso allo stato) per corrispondere accuratamente al lavoro di calcolo richiesto da questi comandi
- Rafforza la resilienza della rete prevenendo attacchi di tipo denial-of-service che sfruttano operazioni di lettura dei dati artificialmente economiche

Man mano che lo stato di Ethereum è cresciuto, l'atto di cercare e leggere dati vecchi ("accesso allo stato") è diventato più pesante e lento da elaborare per i nodi. Le commissioni per queste azioni sono rimaste le stesse anche se ora è leggermente più costoso cercare informazioni (in termini di potenza di calcolo).

Di conseguenza, alcuni comandi specifici sono attualmente sottovalutati rispetto al lavoro che costringono un nodo a fare. `EXTCODESIZE` e `EXTCODECOPY` sono sottovalutati, ad esempio, perché richiedono due letture separate dal database: una per l'oggetto dell'account e una seconda per la dimensione effettiva del codice o del bytecode.

**L'aggiornamento del costo del gas per l'accesso allo stato (o EIP-8038)** aumenta le costanti di gas per gli opcode di accesso allo stato, come la ricerca dei dati di account e contratti, per allinearli alle moderne prestazioni hardware e alle dimensioni dello stato.

Allineare il costo dell'accesso allo stato aiuta anche a rendere Ethereum più resiliente. Poiché queste pesanti azioni di lettura dei dati sono artificialmente economiche, un utente malintenzionato potrebbe inviare spam alla rete con migliaia di richieste di dati complesse in un singolo blocco prima di raggiungere il limite di commissioni della rete, causando potenzialmente il blocco o il crash della rete (un attacco di tipo denial-of-service). Anche senza intento malevolo, gli sviluppatori non sono incoraggiati economicamente a creare applicazioni efficienti se la lettura dei dati di rete è troppo economica.

Prezzando in modo più accurato le azioni di accesso allo stato, Ethereum può essere più resiliente contro rallentamenti accidentali o intenzionali, mentre l'allineamento dei costi di rete con il carico hardware si dimostra una base più sostenibile per futuri aumenti del limite del gas.

**Risorse**: [specifica tecnica EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Resilienza di rete

I perfezionamenti ai doveri dei validatori e ai processi di uscita garantiscono la stabilità della rete durante gli eventi di punizione di massa (mass-slashing) e democratizzano la liquidità. Questi miglioramenti rendono la rete più stabile e garantiscono che tutti i partecipanti, grandi e piccoli, siano trattati in modo equo.

### Escludere i validatori puniti dalla proposta {#exclude-slashed-validators}

- Impedisce ai validatori penalizzati (puniti) di essere selezionati per proporre blocchi futuri, eliminando gli slot mancati garantiti
- Mantiene Ethereum in funzione in modo fluido e affidabile, prevenendo gravi stalli in caso di un evento di punizione di massa

Attualmente, anche se un validatore viene punito (penalizzato per aver infranto le regole o non aver operato come previsto), il sistema potrebbe comunque sceglierlo per guidare un blocco nel prossimo futuro quando genera le previsioni dei futuri proponenti.

Poiché i blocchi dei proponenti puniti vengono automaticamente respinti come non validi, ciò causa la perdita di slot da parte della rete e ritarda il ripristino della rete durante gli eventi di punizione di massa.

**Escludere i validatori puniti dalla proposta (o EIP-8045)** filtra semplicemente i validatori puniti dalla selezione per compiti futuri. Ciò migliora la resilienza della catena garantendo che vengano selezionati solo validatori sani per proporre blocchi, mantenendo la qualità del servizio durante le interruzioni della rete.

**Risorse**: [specifica tecnica EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Consentire alle uscite di utilizzare la coda di consolidamento {#let-exits-use-the-consolidation-queue}

- Chiude una scappatoia che consente ai validatori con saldo elevato di uscire dalla rete più rapidamente rispetto ai validatori più piccoli tramite la coda di consolidamento
- Consente alle uscite regolari di riversarsi in questa seconda coda quando ha capacità di riserva, riducendo i tempi di prelievo dello staking durante i periodi di alto volume
- Mantiene una sicurezza rigorosa per evitare di alterare i limiti di sicurezza principali di Ethereum o di indebolire la rete

Da quando l'aggiornamento [Pectra](/roadmap/pectra) ha aumentato il saldo effettivo massimo per i validatori di Ethereum da 32 ETH a 2.048 ETH, una scappatoia tecnica consente ai validatori con saldo elevato di uscire dalla rete più velocemente rispetto ai validatori più piccoli tramite la coda di consolidamento.

**Consentire alle uscite di utilizzare la coda di consolidamento (o EIP-8080)** democratizza la coda di consolidamento per tutte le uscite di staking, creando un'unica fila equa per tutti.

Per spiegare come funziona oggi:

- Il limite di ricambio di Ethereum è un limite di sicurezza sulla velocità con cui i validatori possono entrare, uscire o unire (consolidare) i loro ETH in staking, per garantire che la sicurezza della rete non venga mai destabilizzata
- Poiché un consolidamento di un validatore è un'azione più pesante con più parti in movimento rispetto a un'uscita standard di un validatore, consuma una porzione maggiore di questo budget di sicurezza (limite di ricambio)
- In particolare, il protocollo stabilisce che il costo esatto per la sicurezza di un'uscita standard è due terzi (2/3) del costo di un consolidamento

Code di uscita più eque consentiranno alle uscite standard di prendere in prestito spazio inutilizzato dalla coda di consolidamento durante i periodi di forte domanda di uscita, applicando un tasso di cambio "3 per 2" (per ogni 2 posti di consolidamento non utilizzati, la rete può elaborare in sicurezza 3 uscite standard). Questo fattore di ricambio di 3/2 bilancia la domanda tra le code di consolidamento e di uscita.

La democratizzazione dell'accesso alla coda di consolidamento aumenterà la velocità con cui gli utenti possono uscire dal loro stake durante i periodi di forte domanda fino a 2,5 volte, senza compromettere la sicurezza della rete.

**Risorse**: [specifica tecnica EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Migliorare l'esperienza dell'utente e dello sviluppatore {#improve-user-developer-experience}

L'aggiornamento Glamsterdam di Ethereum mira a migliorare l'esperienza dell'utente, aumentare la reperibilità dei dati e gestire le crescenti dimensioni dei messaggi per prevenire errori di sincronizzazione. Ciò rende più facile tenere traccia di ciò che accade on-chain, prevenendo al contempo problemi tecnici man mano che la rete si scala.

### Ridurre i costi intrinseci del gas delle transazioni {#reduce-intrinsic-transaction-gas-costs}

- Abbassa la commissione di base per le transazioni, riducendo il costo complessivo di un semplice pagamento nativo in ETH
- Rende i trasferimenti più piccoli più convenienti, aumentando la fattibilità di Ethereum come mezzo di scambio di routine

Tutte le transazioni di Ethereum oggi hanno una commissione di base del gas fissa, indipendentemente da quanto sia semplice o complesso elaborarle. **Ridurre il gas intrinseco della transazione (o EIP-2780)** propone di ridurre tale commissione di base per rendere un trasferimento standard di ETH tra account esistenti fino al **71% più economico**.

La riduzione del gas intrinseco della transazione funziona scomponendo la commissione della transazione per riflettere solo il lavoro di base ed essenziale che i computer che eseguono la rete effettivamente svolgono, come la verifica di una firma digitale e l'aggiornamento di un saldo. Poiché un pagamento di base in ETH non esegue codice complesso o trasporta dati extra, questa proposta ridurrebbe la sua commissione per corrispondere alla sua impronta leggera.

La proposta introduce un'eccezione per la creazione di account nuovi di zecca per evitare che le commissioni più basse sovraccarichino lo stato della rete. Se un trasferimento invia ETH a un indirizzo vuoto e inesistente, la rete deve creare un nuovo record permanente per esso. Viene aggiunto un supplemento di gas per la creazione di tale account per aiutare a coprire il suo onere di archiviazione a lungo termine.

Insieme, l'EIP-2780 mira a rendere più convenienti i trasferimenti giornalieri tra account esistenti, garantendo al contempo che la rete sia ancora protetta dal gonfiore del database prezzando accuratamente la vera crescita dello stato.

**Risorse**: [specifica tecnica EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Pre-distribuzione deterministica della factory {#deterministic-factory-predeploy}

- Offre agli sviluppatori un modo nativo per distribuire applicazioni e portafogli di contratti intelligenti allo stesso identico indirizzo su più catene
- Consente agli utenti di avere lo stesso indirizzo di portafoglio intelligente su più reti di livello 2 (L2), riducendo il carico cognitivo, la confusione e il rischio di perdita accidentale di fondi
- Sostituisce le soluzioni alternative che gli sviluppatori utilizzano attualmente per ottenere questa parità, rendendo più facile e sicuro creare portafogli e app multi-catena

Se un utente ha oggi un portafoglio di contratti intelligenti con account su più catene compatibili con la Macchina Virtuale di Ethereum (EVM), spesso si ritrova con un indirizzo completamente diverso su reti diverse. Questo non solo crea confusione, ma può portare a una perdita accidentale di fondi.

**La pre-distribuzione deterministica della factory (o EIP-7997)** offre agli sviluppatori un modo nativo e integrato per distribuire le loro applicazioni decentralizzate e i portafogli di contratti intelligenti allo stesso identico indirizzo su più catene EVM, tra cui la Rete Principale di Ethereum, le reti di livello 2 (L2) e altro ancora. Se adottato, consentirebbe all'utente di avere lo stesso identico indirizzo su ogni catena partecipante, riducendo significativamente il carico cognitivo e il potenziale di errore dell'utente.

La pre-distribuzione deterministica della factory funziona posizionando permanentemente un programma factory minimo e specializzato in una posizione identica (in particolare, l'indirizzo 0x12) su ogni catena compatibile con EVM partecipante. Il suo obiettivo è fornire un contratto factory universale e standard che possa essere adottato da qualsiasi rete compatibile con EVM; finché una catena EVM partecipa e adotta questo standard, gli sviluppatori saranno in grado di utilizzarlo per distribuire i loro contratti intelligenti allo stesso identico indirizzo su quella rete.

Questa standardizzazione semplifica la creazione e la gestione di applicazioni cross-chain per gli sviluppatori e l'ecosistema più ampio. Gli sviluppatori non devono più creare codice personalizzato e specifico per la catena per collegare il loro software su reti diverse, utilizzando invece questa factory universale per generare lo stesso identico indirizzo per la loro applicazione ovunque. Inoltre, gli esploratori di blocchi, i servizi di tracciamento e i portafogli possono identificare e collegare più facilmente queste applicazioni e account su varie catene, creando un ambiente multi-catena più unificato e senza soluzione di continuità per tutti i partecipanti basati su Ethereum.

**Risorse**: [specifica tecnica EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### I trasferimenti e i burn di ETH emettono un log {#eth-transfers-and-burns-emit-a-log}

- Genera automaticamente un record permanente (log) ogni volta che ETH viene trasferito o bruciato
- Risolve un punto cieco storico che consente ad app, exchange e ponti di rilevare in modo affidabile i depositi degli utenti senza strumenti di tracciamento ad-hoc

A differenza dei token (ERC-20), i normali trasferimenti di ETH tra contratti intelligenti non emettono una ricevuta chiara (log standard), rendendoli difficili da tracciare per exchange e app.

I trasferimenti e i burn di ETH emettono un log (o EIP-7708) rende obbligatorio per la rete emettere un evento di log standard ogni volta che una quantità non nulla di ETH viene spostata o bruciata.

Ciò renderà molto più facile e affidabile per portafogli, exchange e operatori di ponti tracciare accuratamente depositi e movimenti senza strumenti personalizzati.

**Risorse**: [specifica tecnica EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 liste parziali di ricevute di blocco {#eth-70-partial-block-receipt-lists}

Man mano che aumentiamo la quantità di lavoro che Ethereum può svolgere, gli elenchi di ricevute per tali azioni (i record di dati di queste transazioni) stanno diventando così grandi da poter potenzialmente causare il fallimento dei nodi della rete quando tentano di sincronizzare i dati tra loro.

eth/70 liste parziali di ricevute di blocco (o EIP-7975) introduce un nuovo modo per i nodi di parlare tra loro (eth/70) che consente di suddividere questi grandi elenchi in pezzi più piccoli e più gestibili. eth/70 introduce un sistema di impaginazione per il protocollo di comunicazione della rete che consente ai nodi di suddividere gli elenchi di ricevute di blocco e di richiedere in sicurezza i dati in blocchi più piccoli e più gestibili.

Questa modifica eviterebbe i fallimenti di sincronizzazione della rete durante i periodi di intensa attività. In definitiva, apre la strada a Ethereum per aumentare la sua capacità di blocco ed elaborare più transazioni per blocco in futuro, senza sovraccaricare l'hardware fisico che sincronizza la catena.

**Risorse**: [specifica tecnica EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Letture consigliate {#further-reading}

- [Tabella di marcia di Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773)
- [Annuncio sul blog dell'aggiornamento delle priorità del protocollo per il 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum post-quantistico, Glamsterdam sta arrivando](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## Domande frequenti {#faq}

### Come si può convertire ETH dopo l'hard fork di Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Nessuna azione richiesta per i tuoi ETH**: non è necessario convertire o aggiornare i tuoi ETH a seguito dell'aggiornamento di Glamsterdam. I saldi del proprio conto rimarranno gli stessi e l'ETH che si possiede in quel momento rimarrà accessibile nella sua forma esistente dopo la biforcazione dura.
- **Attenzione alle truffe!** <Emoji text="⚠️" /> **chiunque ti indichi di "aggiornare" i tuoi ETH sta cercando di truffarti.** Non c'è nulla che tu debba fare in relazione a questo aggiornamento. Le proprie risorse rimarranno completamente inalterate. Ricorda: essere informati è la migliore difesa contro le truffe.

[Ulteriori informazioni su come riconoscere ed evitare le truffe](/security/)

### L'aggiornamento di Glamsterdam influisce su tutti i nodi e i validatori di Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Sì, l'aggiornamento di Glamsterdam richiede aggiornamenti sia per i [client di esecuzione che per i client di consenso](/developers/docs/nodes-and-clients/). Poiché questo aggiornamento introduce l'Enshrined Proposer-Builder Separation (ePBS), gli operatori di nodi dovranno assicurarsi che i loro client siano aggiornati per gestire i nuovi modi in cui i blocchi vengono costruiti, convalidati e attestati dalla rete.

Tutti i principali client di Ethereum rilasceranno versioni che supportano la biforcazione dura, contrassegnate come ad alta priorità. Puoi rimanere aggiornato su quando queste versioni saranno disponibili nei repository GitHub dei client, sui loro [canali Discord](https://ethstaker.org/support), sul [Discord di EthStaker](https://dsc.gg/ethstaker) o iscrivendoti al blog di Ethereum per gli aggiornamenti del protocollo.

Per mantenere la sincronizzazione con la rete Ethereum dopo l'aggiornamento, gli operatori dei nodi devono assicurarsi di eseguire una versione client supportata. Si tenga presente che le informazioni sui rilasci dei client sono sensibili al fattore tempo e gli utenti devono fare riferimento agli ultimi aggiornamenti per dettagli attuali.

### In qualità di staker, cosa devo fare per l'aggiornamento di Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Come per ogni aggiornamento della rete, assicurati di aggiornare i tuoi client alle ultime versioni contrassegnate con il supporto di Glamsterdam. Segui gli aggiornamenti nella mailing list e gli [annunci del protocollo sul blog di EF](https://blog.ethereum.org/category/protocol) per essere informato sui rilasci.

Per convalidare la tua configurazione prima che Glamsterdam venga attivato sulla Rete Principale, puoi eseguire un validatore sulle reti di test. Anche i fork delle testnet sono annunciati nella mailing list e sul blog.

### Quali miglioramenti includerà Glamsterdam per la scalabilità L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

La caratteristica principale è l'ePBS (EIP-7732), che separa il pesante compito di convalidare le transazioni di rete dal compito di raggiungere il consenso. Ciò espande la finestra di propagazione dei dati da 2 secondi a circa 9 secondi, sbloccando la capacità di Ethereum di gestire in sicurezza un throughput di transazioni molto più elevato e di ospitare più blob di dati per le reti di livello 2.

### Glamsterdam abbasserà le commissioni su Ethereum (livello 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Sì, molto probabilmente Glamsterdam ridurrà le commissioni per gli utenti di tutti i giorni! La riduzione del gas intrinseco della transazione (o EIP-2780) riduce la commissione di base per l'invio di ETH, rendendo l'ETH molto più economico da usare per i pagamenti di tutti i giorni.

Inoltre, per la sostenibilità a lungo termine, Glamsterdam introduce le Block-Level Access Lists (BAL). Ciò abilita l'elaborazione parallela e prepara l'L1 a gestire in sicurezza limiti del gas complessivi più elevati in futuro, il che probabilmente ridurrà i costi del gas per transazione man mano che la capacità cresce.

### Ci saranno cambiamenti ai miei contratti intelligenti esistenti dopo Glamsterdam? {#will-my-smart-contracts-change}

I contratti esistenti continueranno a funzionare normalmente dopo Glamsterdam. Gli sviluppatori riceveranno probabilmente diversi nuovi strumenti e dovrebbero rivedere il loro utilizzo del gas:

- L'aumento della dimensione massima del contratto (o EIP-7954) consente agli sviluppatori di distribuire applicazioni più grandi, aumentando il limite massimo della dimensione del contratto da circa 24KiB a 32KiB.
- La pre-distribuzione deterministica della factory (o EIP-7997) introduce un contratto factory universale e integrato. Consente agli sviluppatori di distribuire le loro applicazioni e i portafogli di contratti intelligenti allo stesso identico indirizzo su tutte le catene EVM partecipanti.
- Se la tua app si basa su un tracciamento complesso per trovare i trasferimenti di ETH, la funzione 'i trasferimenti e i burn di ETH emettono un log' (o EIP-7708) ti consentirà di passare all'utilizzo dei log per una contabilità più semplice e affidabile.
- L'aumento del costo del gas per la creazione dello stato (o EIP-8037) e l'aggiornamento del costo del gas per l'accesso allo stato (o EIP-8038) introducono nuovi modelli di sostenibilità che modificheranno alcuni costi di implementazione dei contratti, poiché la creazione di nuovi account o l'archiviazione permanente avranno una commissione che si adegua dinamicamente.

### In che modo Glamsterdam influenzerà i requisiti di archiviazione e hardware dei nodi? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Diverse EIP in fase di valutazione per Glamsterdam affrontano il precipizio prestazionale della crescita dello stato:

- L'aumento del costo del gas per la creazione dello stato (o EIP-8037) introduce un modello di prezzi dinamico per puntare a un tasso di crescita del database di stato di 100 GiB/anno, garantendo che l'hardware fisico standard possa continuare a far funzionare la rete in modo efficiente.
- eth/70 liste parziali di ricevute di blocco (o EIP-7975) consente ai nodi di richiedere ricevute di blocco impaginate, il che suddivide gli elenchi di ricevute di blocco pesanti in termini di dati in blocchi più piccoli per prevenire arresti anomali e sincronizzazioni man mano che Ethereum scala.
