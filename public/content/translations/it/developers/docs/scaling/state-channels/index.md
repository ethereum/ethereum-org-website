---
title: Canali di stato
description: Un'introduzione ai canali di stato e ai canali di pagamento come soluzione di scalabilità, attualmente utilizzata dalla comunità Ethereum.
lang: it
sidebarDepth: 3
---

I canali di stato consentono ai partecipanti di effettuare transazioni in modo sicuro off-chain, mantenendo al minimo l'interazione con la Rete principale di Ethereum. I peer del canale possono condurre un numero arbitrario di transazioni off-chain, inviando solo due transazioni on-chain per aprire e chiudere il canale. Questo consente un volume di transazioni estremamente elevato e risulta in costi minori per gli utenti.

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso le nostre pagine sulla [scalabilità di Ethereum](/developers/docs/scaling/) e sul [livello 2](/layer-2/).

## Cosa sono i canali? {#what-are-channels}

Le blockchain pubbliche, come Ethereum, affrontano sfide di scalabilità dovute alla loro architettura distribuita: le transazioni on-chain devono essere eseguite da tutti i nodi. I nodi devono poter gestire il volume di transazioni in un blocco usando hardware modesto, imponendo un limite al volume di transazioni per mantenere decentralizzata la rete. I canali blockchain risolvono questo problema consentendo agli utenti di interagire off-chain, pur facendo affidamento sulla sicurezza della catena principale per la liquidazione finale.

I canali sono semplici protocolli peer-to-peer che consentono a due parti di effettuare molte transazioni tra loro e poi di pubblicare solo i risultati finali nella blockchain. Il canale usa la crittografia per dimostrare che i dati sommari che generano sono davvero il risultato di una serie valida di transazioni intermedie. Uno smart contract ["multisig"](/developers/docs/smart-contracts/#multisig) garantisce che le transazioni siano firmate dalle parti corrette.

Con i canali, i cambiamenti di stato sono eseguiti e convalidati dalle parti interessate, riducendo al minimo il calcolo sul livello di esecuzione di Ethereum. Questo riduce la congestione su Ethereum e, inoltre, aumenta le velocità di elaborazione delle transazioni per gli utenti.

Ogni canale è gestito da uno [smart contract multisig](/developers/docs/smart-contracts/#multisig) in esecuzione su Ethereum. Per aprire un canale, i partecipanti eseguono il deploy del contratto del canale on-chain e vi depositano fondi. Entrambe le parti firmano collettivamente un aggiornamento di stato per inizializzare lo stato del canale, dopodiché possono effettuare transazioni in modo rapido e libero off-chain.

Per chiudere il canale, i partecipanti inviano l'ultimo stato concordato del canale on-chain. Dopodiché, il contratto intelligente distribuisce i fondi bloccati in base al saldo di ogni partecipante nello stato finale del canale.

I canali peer-to-peer sono particolarmente utili per situazioni in cui alcuni partecipanti predefiniti desiderano eseguire transazioni ad alta frequenza senza incorrere in sovraccarichi visibili. I canali blockchain rientrano in due categorie: **canali di pagamento** e **canali di stato**.

## Canali di pagamento {#payment-channels}

Un canale di pagamento è meglio descritto come un "registro bidirezionale" tenuto collettivamente da due utenti. Il saldo iniziale del libro mastro è la somma dei depositi bloccati nel contratto on-chain durante la fase di apertura del canale. I trasferimenti su canali di pagamento possono essere eseguiti istantaneamente e senza il coinvolgimento della blockchain stessa, ad eccezione di una creazione iniziale on-chain una tantum e un'eventuale chiusura del canale.

Gli aggiornamenti al saldo del registro (cioè, lo stato del canale di pagamento) richiedono l'approvazione di tutte le parti nel canale. Un aggiornamento del canale firmato da tutti i partecipanti al canale è considerato finalizzato, analogamente a una transazione su Ethereum.

I canali di pagamento sono stati tra le prime soluzioni di scalabilità progettate per ridurre al minimo la costosa attività on-chain delle semplici interazioni tra utenti (ad es. trasferimenti di ETH, swap atomici, micropagamenti). I partecipanti al canale possono condurre una quantità illimitata di transazioni istantanee e senza commissioni tra loro purché la somma netta dei loro trasferimenti non superi i token depositati.

## Canali di stato {#state-channels}

Oltre a supportare i pagamenti off-chain, i canali di pagamento non si sono dimostrati utili per gestire la logica di transizione di stato generale. I canali di stato sono stati creati per risolvere questo problema e rendere i canali utili per ridimensionare il calcolo a scopo generale.

I canali di stato hanno comunque molto in comune con i canali di pagamento. Ad esempio, gli utenti interagiscono scambiandosi messaggi firmati crittograficamente (transazioni), che devono esser firmati anche dagli altri partecipanti del canale. Se un aggiornamento di stato proposto non è firmato da tutti i partecipanti, non è considerato valido.

Tuttavia, oltre a detenere i saldi degli utenti, il canale monitora anche lo stato corrente dell'archiviazione del contratto (cioè, i valori delle variabili del contratto).

Questo rende possibile l'esecuzione di uno smart contract off-chain tra due utenti. In questo scenario, gli aggiornamenti allo stato interno del contratto intelligente richiedono l'approvazione dei pari che hanno creato il canale.

Se da un lato questo risolve il problema di scalabilità precedentemente descritto, dall'altro ha implicazioni per la sicurezza. Su Ethereum, la validità delle transizioni di stato è garantita dal protocollo di consenso della rete. Questo rende impossibile proporre un aggiornamento non valido allo stato di un contratto intelligente o di alterarne l'esecuzione.

I canali di stato non hanno le stesse garanzie di sicurezza. In una certa misura, un canale di stato è una versione in miniatura della Rete principale. Con una serie limitata di partecipanti che impongono le regole, le possibilità di comportamenti malevoli (ad es. proporre aggiornamenti di stato non validi) aumentano. I canali di stato derivano la loro sicurezza da un sistema di arbitrato delle controversie basato su [prove di frode](/glossary/#fraud-proof).

## Come funzionano i canali di stato {#how-state-channels-work}

Fondamentalmente, l'attività in un canale di stato è una sessione di interazioni che coinvolge gli utenti e un sistema di blockchain. Gli utenti comunicano principalmente tra loro off-chain e interagiscono con la blockchain sottostante solo per aprire il canale, chiuderlo o risolvere potenziali controversie tra i partecipanti.

La seguente sezione delinea il flusso di lavoro di base di un canale di stato:

### Apertura del canale {#opening-the-channel}

Aprire un canale richiede ai partecipanti di impegnare fondi a un contratto intelligente sulla Rete Principale. Il deposito funziona anche da scheda virtuale, così gli attori partecipanti possono transare liberamente senza dover regolare immediatamente i pagamenti. Solo quando il canale viene finalizzato on-chain le parti si accordano e prelevano ciò che resta del loro conto.

Questo deposito serve anche da cauzione per garantire il comportamento onesto di ogni partecipante. Se i depositanti sono ritenuti colpevoli di azioni malevole durante la fase di risoluzione delle dispute, il contratto decurta il loro deposito.

I pari del canale devono firmare uno stato iniziale, su cui concordano tutti. Questo serve da genesi del canale di stato, dopo di che gli utenti possono iniziare a transare.

### Uso del canale {#using-the-channel}

Dopo l'inizializzazione dello stato del canale, i pari interagiscono firmando le transazioni e inviandosele a vicenda per l'approvazione. I partecipanti avviano gli aggiornamenti di stato con queste transazioni e firmano gli aggiornamenti di stato altrui. Ogni transazione comprende quanto segue:

- Un **nonce**, che funge da ID univoco per le transazioni e previene gli attacchi di tipo replay. Identifica inoltre l'ordine in cui si sono verificati gli aggiornamenti di stato (che è importante per la risoluzione delle dispute)

- Il vecchio stato del canale

- Il nuovo stato del canale

- La transazione che innesca la transizione di stato (ad. es. Alice invia 5 ETH a Bob)

Gli aggiornamenti di stato nel canale non vengono trasmessi on-chain, come avviene normalmente quando gli utenti interagiscono sulla Rete principale, il che è in linea con l'obiettivo dei canali di stato di ridurre al minimo l'impatto on-chain. Finché i partecipanti acconsentono agli aggiornamenti di stato, questi sono definitivi quanto la transazione di Ethereum. I partecipanti devono dipendere dal consenso della Rete principale solo se sorge una disputa.

### Chiusura del canale {#closing-the-channel}

La chiusura di un canale di stato richiede l'invio dello stato finale e concordato del canale allo smart contract on-chain. I dettagli a cui si fa riferimento nell'aggiornamento di stato includono il numero di mosse di ogni partecipante e un elenco delle transazioni approvate.

Dopo aver verificato che l'aggiornamento di stato sia valido (cioè, sia firmato da tutte le parti), il contratto intelligente finalizza il canale e distribuisce i fondi bloccati a seconda del risultato del canale. I pagamenti effettuati off-chain vengono applicati allo stato di Ethereum e ogni partecipante riceve la propria porzione rimanente dei fondi bloccati.

Lo scenario sopra descritto rappresenta cosa succede nel caso favorevole. A volte, gli utenti potrebbero non riuscire a raggiungere un accordo e finalizzare il canale (il caso sfavorevole). Ognuna delle seguenti cose potrebbe applicarsi alla situazione:

- I partecipanti vanno offline e non propongono le transizioni di stato

- I partecipanti si rifiutano di co-firmare gli aggiornamenti di stato validi

- I partecipanti cercano di finalizzare il canale proponendo un vecchio aggiornamento di stato al contratto on-chain

- I partecipanti propongono delle transizioni di stato non valide da far firmare agli altri

Ogni volta che il consenso tra gli attori partecipanti a un canale non viene raggiunto, l'ultima opzione è affidarsi al consenso della Rete principale per imporre lo stato finale e valido del canale. In questo caso, la chiusura del canale di stato richiede la risoluzione di controversie on-chain.

### Risoluzione delle controversie {#settling-disputes}

Tipicamente, le parti in un canale acconsentono alla chiusura anticipata del canale e co-firmano l'ultima transizione di stato, che inviano al contratto intelligente. Una volta che l'aggiornamento è approvato on-chain, l'esecuzione dello smart contract off-chain termina e i partecipanti escono dal canale con il loro denaro.

Tuttavia, una parte può inviare una richiesta on-chain per terminare l'esecuzione dello smart contract e finalizzare il canale, senza attendere l'approvazione della controparte. Se si verifica una delle situazioni di rottura del consenso descritte in precedenza, una delle parti può attivare il contratto on-chain per chiudere il canale e distribuire i fondi. Questo fornisce **trustlessness** (mancanza di fiducia), garantendo che le parti oneste possano ritirare i propri depositi in qualsiasi momento, indipendentemente dalle azioni dell'altra parte.

Per elaborare l'uscita dal canale, l'utente deve inviare l'ultimo aggiornamento di stato valido dell'applicazione al contratto on-chain. Se questo corrisponde (cioè, porta la firma di tutte le parti), allora i fondi sono ridistribuiti in suo favore.

Esiste, tuttavia, un ritardo nell'esecuzione delle richieste d'uscita dei singoli utenti. Se la richiesta di chiudere il canale è stata approvata all'unanimità, la transazione di uscita on-chain viene eseguita immediatamente.

Il ritardo entra in gioco nelle uscite dei singoli utenti a causa della possibilità di azioni fraudolente. Ad esempio, un partecipante al canale può tentare di finalizzarlo su Ethereum inviando un aggiornamento di stato meno recente on-chain.

Come contromisura, i canali di stato consentono agli utenti onesti di contestare gli aggiornamenti di stato non validi inviando lo stato più recente e valido del canale on-chain. I canali di stato sono progettati in modo che gli aggiornamenti di stato più recenti e concordati prevalgano sugli aggiornamenti di stato precedenti.

Una volta che un peer attiva il sistema di risoluzione delle controversie on-chain, l'altra parte è tenuta a rispondere entro un limite di tempo (chiamato finestra di contestazione). Questo consente agli utenti di contestare la transazione di uscita, specialmente se l'altra parte sta applicando un aggiornamento obsoleto.

In ogni caso, gli utenti del canale hanno sempre forti garanzie di finalità: se la transizione di stato in loro possesso è stata firmata da tutti i membri ed è l'aggiornamento più recente, allora ha la stessa finalità di una normale transazione on-chain. Devono comunque contestare l'altra parte on-chain, ma l'unico risultato possibile è la finalizzazione dell'ultimo stato valido, di cui sono in possesso.

### Come interagiscono i canali di stato con Ethereum? Come interagiscono i canali di stato con Ethereum? {#how-do-state-channels-interact-with-ethereum}

Sebbene esistano come protocolli off-chain, i canali di stato hanno un componente on-chain: lo smart contract distribuito su Ethereum all'apertura del canale. Questo contratto controlla le risorse depositate nel canale, verifica gli aggiornamenti di stato e arbitra le dispute tra i partecipanti.

I canali di stato non pubblicano i dati delle transazioni o gli impegni di stato sulla Rete principale, a differenza delle soluzioni di scalabilità di [livello 2](/layer-2/). Tuttavia, sono più connessi alla Rete principale rispetto, ad esempio, alle [sidechain](/developers/docs/scaling/sidechains/), il che li rende in qualche modo più sicuri.

I canali di stato si affidano al protocollo principale di Ethereum per quanto segue:

#### 1. Liveness {#liveness}

Il contratto on-chain distribuito all'apertura del canale è responsabile della funzionalità del canale. Se il contratto è in esecuzione su Ethereum, allora il canale è sempre disponibile all'uso. Viceversa, una catena secondaria può sempre fallire, anche se la Rete Principale è operativa, mettendo a rischio i fondi dell'utente.

#### 2. Sicurezza {#security}

In una certa misura, i canali di stato si affidano a Ethereum per fornire sicurezza e proteggere gli utenti dai pari malevoli. Come discusso in seguito, i canali usano un meccanismo di prova di frode che consente agli utenti di sfidare i tentativi di finalizzare il canale con un aggiornamento non valido od obsoleto.

In questo caso, la parte onesta fornisce l'ultimo stato valido del canale come prova di frode al contratto on-chain per la verifica. Le prove di frode consentono a parti che non si fidano l'una dell'altra di condurre transazioni off-chain senza rischiare i propri fondi.

#### 3. Finalità {#finality}

Gli aggiornamenti di stato firmati collettivamente dagli utenti del canale sono considerati equivalenti a transazioni on-chain. Tuttavia, tutta l'attività nel canale raggiunge la vera finalità solo quando il canale è chiuso su Ethereum.

Nel caso ottimistico, entrambe le parti possono cooperare, firmare l'aggiornamento dello stato finale e inviarlo on-chain per chiudere il canale, dopodiché i fondi vengono distribuiti in base allo stato finale del canale. Nel caso pessimistico, in cui qualcuno cerca di imbrogliare pubblicando un aggiornamento di stato errato on-chain, la sua transazione non viene finalizzata fino a quando non scade la finestra di contestazione.

## Canali di stato virtuali {#virtual-state-channels}

L'implementazione ingenua di un canale di stato consisterebbe nell'eseguire il deploy di un nuovo contratto quando due utenti desiderano eseguire un'applicazione off-chain. Questo non solo non è fattibile, ma annulla anche l'efficienza dei costi dei canali di stato (i costi delle transazioni on-chain possono sommarsi rapidamente).

Per risolvere questo problema, sono stati creati i "canali virtuali". A differenza dei canali regolari che richiedono transazioni on-chain per l'apertura e la chiusura, un canale virtuale può essere aperto, eseguito e finalizzato senza interagire con la catena principale. Con questo metodo è anche possibile risolvere le controversie off-chain.

Questo sistema si basa sull'esistenza dei cosiddetti "canali libro mastro", che sono stati finanziati on-chain. I canali virtuali tra due parti possono basarsi su un canale libro mastro esistente, con i proprietari dello stesso che servono da intermediari.

Gli utenti in ogni canale virtuale interagiscono tramite l'istanza di un nuovo contratto, col canale del libro mastro capace di supportare diverse istanze del contratto. Lo stato del canale libro mastro contiene anche più di uno stato di archiviazione del contratto, consentendo l'esecuzione parallela di applicazioni off-chain tra utenti diversi.

Proprio come nei canali regolari, gli utenti scambiano aggiornamenti di stato per far progredire la macchina di stato. A meno che non sorga una controversia, l'intermediario deve essere contattato solo all'apertura o alla chiusura del canale.

### Canali di pagamento virtuali {#virtual-payment-channels}

I canali di pagamento virtuali si basano sulla stessa idea dei canali di stato virtuali: i partecipanti connessi alla stessa rete possono scambiarsi messaggi senza dover aprire un nuovo canale on-chain. Nei canali di pagamento virtuali, i trasferimenti di valore sono indirizzati per uno o più intermediari, con la garanzia che solo il destinatario inteso possa ricevere i fondi trasferiti.

## Applicazioni dei canali di stato {#applications-of-state-channels}

### Pagamenti {#payments}

I primi canali blockchain erano semplici protocolli che consentivano a due partecipanti di effettuare trasferimenti rapidi e a basso costo off-chain senza dover pagare commissioni di transazione elevate sulla Rete principale. Oggi, i canali di pagamento sono comunque utili per le applicazioni progettate per lo scambio e deposito di ether e token.

I pagamenti basati sul canale hanno i seguenti vantaggi:

1. **Throughput**: la quantità di transazioni off-chain per canale non è collegata al throughput di Ethereum, che è influenzato da vari fattori, in particolare la dimensione del blocco e il tempo di blocco. Eseguendo le transazioni off-chain, i canali blockchain possono raggiungere un throughput più elevato.

2. **Privacy**: poiché i canali esistono off-chain, i dettagli delle interazioni tra i partecipanti non vengono registrati sulla blockchain pubblica di Ethereum. Gli utenti dei canali devono interagire on-chain solo quando finanziano e chiudono i canali o risolvono controversie. Dunque, i canali sono utili per gli individui che desiderano transazioni più private.

3. **Latenza**: le transazioni off-chain condotte tra i partecipanti al canale possono essere liquidate istantaneamente, se entrambe le parti cooperano, riducendo i ritardi. In contrasto, inviare una transazione sulla Rete Principale richiede che i nodi elaborino la transazione, producano un nuovo blocco con la transazione e raggiungano il consenso. Gli utenti potrebbero anche dover attendere più conferme del blocco prima di considerare finalizzata una transazione.

4. **Costo**: i canali di stato sono particolarmente utili in situazioni in cui un gruppo di partecipanti si scambierà molti aggiornamenti di stato per un lungo periodo. I soli costi sostenuti sono l'apertura e la chiusura del contratto intelligente del canale di stato; ogni cambiamento di stato tra l'apertura e chiusura del canale sarà più economico dell'ultimo, poiché il costo dell'accordo è distribuito di conseguenza.

L'implementazione di canali di stato su soluzioni di livello 2, come i [rollup](/developers/docs/scaling/#rollups), potrebbe renderli ancora più interessanti per i pagamenti. Sebbene i canali offrano pagamenti economici, i costi di configurazione del contratto on-chain sulla Rete principale durante la fase di apertura possono diventare costosi, specialmente quando le commissioni sul gas aumentano. I rollup basati su Ethereum offrono [commissioni di transazione più basse](https://l2fees.info/) e possono ridurre i costi generali per i partecipanti al canale abbassando le commissioni di configurazione.

### Microtransazioni {#microtransactions}

Le microtransazioni sono pagamenti di basso valore (es., inferiori a una frazione di dollaro), che le aziende non possono elaborare senza incorrere in perdite. Queste entità devono pagare i fornitori del servizio di pagamento, cosa che non possono fare se il margine sui pagamenti del cliente è troppo basso per ottenere un profitto.

I canali di pagamento risolvono questo problema riducendo il sovraccarico associato alle microtransazioni. Ad esempio, un Fornitore di Servizi Internet (ISP) può aprire un canale di pagamento con un cliente, consentendogli di trasmettere piccoli pagamenti ogni volta che usa il servizio.

Oltre al costo d'apertura e chiusura del canale, i partecipanti non incorrono in ulteriori costi sulle microtransazioni (nessuna commissione sul gas). Questa è una situazione vantaggiosa per tutti, poiché i clienti hanno maggiore flessibilità in quanto pagano per i servizi e le aziende non perdono sulle microtransazioni profittevoli.

### Applicazioni decentralizzate {#decentralized-applications}

Come i canali di pagamento, i canali di stato possono effettuare pagamenti condizionali secondo gli stati finali della macchina di stato. I canali di stato possono anche supportare una logica di transizione di stato arbitraria, rendendoli utili per l'esecuzione di app generiche off-chain.

I canali di stato sono spesso limitati a semplici applicazioni a turni, poiché ciò semplifica la gestione dei fondi vincolati al contratto on-chain. Inoltre, con un numero limitato di parti che aggiornano lo stato dell'applicazione off-chain a intervalli, punire i comportamenti disonesti è relativamente semplice.

L'efficienza dell'applicazione di un canale di stato dipende anche dal suo design. Ad esempio, uno sviluppatore potrebbe eseguire una sola volta il deploy del contratto del canale dell'app on-chain e consentire ad altri giocatori di riutilizzare l'app senza dover passare on-chain. In questo caso, il canale iniziale dell'app funge da canale libro mastro che supporta più canali virtuali, ognuno dei quali esegue una nuova istanza dello smart contract dell'app off-chain.

Un potenziale caso d'uso per le applicazioni del canale di stato sono i giochi semplici a due giocatori, in cui i fondi sono distribuiti a seconda del risultato della partita. Il vantaggio, in questo caso, è che i giocatori non devono fidarsi l'uno dell'altro (trustlessness) e che il contratto on-chain, non i giocatori, controlla l'allocazione dei fondi e la risoluzione delle controversie (decentralizzazione).

Altri possibili casi d'uso per le app del canale di stato includono la proprietà del nome dell'ENS, libri mastri di NFT e molto altro.

### Trasferimenti atomici {#atomic-transfers}

I primi canali di pagamento furono limitati ai trasferimenti tra due parti, limitandone l'utilizzabilità. Tuttavia, l'introduzione di canali virtuali ha permesso agli individui di instradare i trasferimenti attraverso intermediari (cioè, più canali p2p) senza dover aprire un nuovo canale on-chain.

Comunemente descritti come "trasferimenti multi-salto", i pagamenti instradati sono atomici (cioè, tutte le parti della transazione riescono falliscono del tutto). I trasferimenti atomici utilizzano gli [Hashed Timelock Contract (HTLC)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) per garantire che il pagamento venga rilasciato solo se vengono soddisfatte determinate condizioni, riducendo così il rischio di controparte.

## Svantaggi dell'utilizzo dei canali di stato {#drawbacks-of-state-channels}

### Presupposti di liveness {#liveness-assumptions}

Per assicurare l'efficienza, i canali di stato fissano dei limiti di tempo sull'abilità dei partecipanti del canale di rispondere alle dispute. Questa regola presuppone che i pari saranno sempre online per monitorare l'attività del canale e impugnare le contestazioni quando necessario.

In realtà, gli utenti possono andare offline per motivi che esulano dal loro controllo (ad es. connessione a Internet scadente, guasto meccanico, etc.). Se un utente onesto va offline, un pari malevolo può sfruttare la situazione presentando vecchi stati intermedi al contratto dell'arbitro e rubando i fondi impegnati.

Alcuni canali utilizzano "torri di guardia" (watchtower), entità responsabili di monitorare gli eventi di controversia on-chain per conto di altri e di intraprendere le azioni necessarie, come avvisare le parti interessate. Tuttavia, questo può aggiungersi ai costi dell'uso di un canale di stato.

### Non disponibilità dei dati {#data-unavailability}

Come spiegato in precedenza, contestare una disputa non valida richiede la presentazione dell'ultimo stato valido del canale di stato. Questa è un'altra regola basata sul presupposto che gli utenti abbiano accesso all'ultimo stato del canale.

Sebbene sia ragionevole aspettarsi che gli utenti del canale memorizzino copie dello stato dell'applicazione off-chain, questi dati potrebbero andare persi a causa di errori o guasti meccanici. Se l'utente non ha eseguito il backup dei dati, può solo sperare che l'altra parte non finalizzi una richiesta di uscita non valida usando le vecchie transizioni di stato in suo possesso.

Gli utenti di Ethereum non devono affrontare questo problema poiché la rete impone le regole sulla disponibilità dei dati. I dati della transazione sono memorizzati e propagati da tutti i nodi e scaricabili dagli utenti se e quando necessario.

### Problemi di liquidità {#liquidity-issues}

Per stabilire un canale blockchain, i partecipanti devono bloccare fondi in uno smart contract on-chain per il ciclo di vita del canale. Questo riduce la liquidità degli utenti del canale e, inoltre, limita i canali a coloro che possono permettersi di tenere i fondi bloccati sulla Rete principale.

Tuttavia, i canali libro mastro, gestiti da un fornitore di servizi off-chain (OSP), possono ridurre i problemi di liquidità per gli utenti. Due peer connessi a un canale libro mastro possono creare un canale virtuale, che possono aprire e finalizzare completamente off-chain, in qualsiasi momento.

I fornitori di servizi off-chain potrebbero anche aprire canali con più peer, rendendoli utili per l'instradamento dei pagamenti. Ovviamente, gli utenti devono pagare delle commissioni agli OSP per i loro servizi, il che potrebbe essere sgradito ad alcuni.

### Attacchi di griefing {#griefing-attacks}

Gli attacchi di griefing sono una caratteristica comune dei sistemi basati sulla prova di frode. Un attacco di griefing non dà direttamente benefici all'autore ma causa sofferenza (	, cioè danni) alla vittima, da cui il nome.

La prova di frode è suscettibile agli attacchi di griefing perché la parte onesta deve rispondere a ogni disputa, anche quelle non valide, o rischiare di perdere i propri fondi. Un partecipante malintenzionato può decidere di pubblicare ripetutamente transizioni di stato obsolete on-chain, costringendo la parte onesta a rispondere con lo stato valido. Il costo di tali transazioni on-chain può aumentare rapidamente, causando perdite per le parti oneste.

### Insiemi di partecipanti predefiniti {#predefined-participant-sets}

Fin dalla progettazione, il numero di partecipanti compresi in un canale di stato rimane fisso per tutto il suo ciclo di vita. Questo perché aggiornare l'insieme di partecipanti complicherebbe il funzionamento del canale, specialmente quando si finanzia il canale o si risolvono le dispute. L'aggiunta o la rimozione di partecipanti richiederebbe anche un'attività on-chain aggiuntiva, che aumenta i costi generali per gli utenti.

Pur rendendo più facile ragionare sui canali di stato, questo limita l'utilità dei design dei canali agli sviluppatori di applicazioni. Questo spiega parzialmente perché i canali di stato siano stati abbandonati in favore di altre soluzioni di ridimensionamento, come i rollup.

### Elaborazione parallela delle transazioni {#parallel-transaction-processing}

I partecipanti al canale di stato inviano gli aggiornamenti di stato a turno, il che spiega perché funzionino al meglio per le "applicazioni basate su turni" (ad es. una partita di scacchi con due giocatori). Questo elimina la necessità di gestire aggiornamenti di stato simultanei e riduce il lavoro che il contratto on-chain deve svolgere per punire chi pubblica aggiornamenti obsoleti. Tuttavia, un effetto collaterale di questa progettazione è che le transazioni dipendono l'una dall'altra, aumentando la latenza e riducendo l'esperienza utente generale.

Alcuni canali di stato risolvono questo problema utilizzando un design "full-duplex" che separa lo stato off-chain in due stati "simplex" unidirezionali, consentendo aggiornamenti di stato concorrenti. Tali design migliorano il throughput off-chain e riducono i ritardi delle transazioni.

## Usa i canali di stato {#use-state-channels}

Diversi progetti forniscono implementazioni dei canali di stato che puoi integrare nelle tue dapp:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Letture consigliate {#further-reading}

**Canali di stato**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 febbraio 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _6 novembre 2015 - Jeff Coleman_
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Blockchain State Channels: A State of the Art](https://ieeexplore.ieee.org/document/9627997)

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_
