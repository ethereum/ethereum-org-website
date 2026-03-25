---
title: State Channels
description: "Un'introduzione ai canali di stato e ai canali di pagamento come soluzione di scalabilità attualmente utilizzata dalla community di Ethereum."
lang: it
sidebarDepth: 3
---

I canali di stato consentono ai partecipanti di effettuare transazioni sicure fuori catena mantenendo al minimo l'interazione con la [rete principale](/) di Ethereum. I peer del canale possono condurre un numero arbitrario di transazioni fuori catena inviando solo due transazioni on-chain per aprire e chiudere il canale. Ciò consente un throughput di transazioni estremamente elevato e si traduce in costi inferiori per gli utenti.

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso le nostre pagine sulla [scalabilità di Ethereum](/developers/docs/scaling/) e sul [livello 2](/layer-2/).

## Cosa sono i canali? {#what-are-channels}

Le blockchain pubbliche, come Ethereum, affrontano sfide di scalabilità a causa della loro architettura distribuita: le transazioni on-chain devono essere eseguite da tutti i nodi. I nodi devono essere in grado di gestire il volume di transazioni in un blocco utilizzando hardware modesto, imponendo un limite al throughput delle transazioni per mantenere la rete decentralizzata. I canali della blockchain risolvono questo problema consentendo agli utenti di interagire fuori catena pur continuando a fare affidamento sulla sicurezza della catena principale per il regolamento finale.

I canali sono semplici protocolli peer-to-peer che consentono a due parti di effettuare molte transazioni tra loro e quindi pubblicare solo i risultati finali sulla blockchain. Il canale utilizza la crittografia per dimostrare che i dati di riepilogo che generano sono veramente il risultato di un insieme valido di transazioni intermedie. Un contratto intelligente ["multifirma"](/developers/docs/smart-contracts/#multisig) assicura che le transazioni siano firmate dalle parti corrette.

Con i canali, i cambiamenti di stato sono eseguiti e convalidati dalle parti interessate, riducendo al minimo il calcolo sul livello di esecuzione di Ethereum. Questo riduce la congestione su Ethereum e aumenta anche la velocità di elaborazione delle transazioni per gli utenti.

Ogni canale è gestito da un [contratto intelligente multifirma](/developers/docs/smart-contracts/#multisig) in esecuzione su Ethereum. Per aprire un canale, i partecipanti distribuiscono il contratto del canale on-chain e vi depositano dei fondi. Entrambe le parti firmano collettivamente un aggiornamento di stato per inizializzare lo stato del canale, dopodiché possono effettuare transazioni rapidamente e liberamente fuori catena.

Per chiudere il canale, i partecipanti inviano l'ultimo stato concordato del canale on-chain. Successivamente, il contratto intelligente distribuisce i fondi bloccati in base al saldo di ciascun partecipante nello stato finale del canale.

I canali peer-to-peer sono particolarmente utili per le situazioni in cui alcuni partecipanti predefiniti desiderano effettuare transazioni ad alta frequenza senza incorrere in costi generali visibili. I canali della blockchain rientrano in due categorie: **canali di pagamento** e **canali di stato**.

## Canali di pagamento {#payment-channels}

Un canale di pagamento è meglio descritto come un "registro bidirezionale" mantenuto collettivamente da due utenti. Il saldo iniziale del registro è la somma dei depositi bloccati nel contratto on-chain durante la fase di apertura del canale. I trasferimenti del canale di pagamento possono essere eseguiti istantaneamente e senza il coinvolgimento della blockchain vera e propria, ad eccezione di una creazione iniziale una tantum on-chain e di un'eventuale chiusura del canale.

Gli aggiornamenti al saldo del registro (ovvero, lo stato del canale di pagamento) richiedono l'approvazione di tutte le parti nel canale. Un aggiornamento del canale, firmato da tutti i partecipanti al canale, è considerato finalizzato, in modo molto simile a una transazione su Ethereum.

I canali di pagamento sono stati tra le prime soluzioni di scalabilità progettate per ridurre al minimo le costose attività on-chain di semplici interazioni degli utenti (ad es. trasferimenti di ETH, scambi atomici, micropagamenti). I partecipanti al canale possono condurre una quantità illimitata di transazioni istantanee e senza commissioni tra loro, a condizione che la somma netta dei loro trasferimenti non superi i token depositati.

## Canali di stato {#state-channels}

Oltre a supportare i pagamenti fuori catena, i canali di pagamento non si sono dimostrati utili per gestire la logica generale di transizione di stato. I canali di stato sono stati creati per risolvere questo problema e rendere i canali utili per la scalabilità del calcolo di uso generale.

I canali di stato hanno ancora molto in comune con i canali di pagamento. Ad esempio, gli utenti interagiscono scambiandosi messaggi firmati crittograficamente (transazioni), che anche gli altri partecipanti al canale devono firmare. Se un aggiornamento di stato proposto non è firmato da tutti i partecipanti, è considerato non valido.

Tuttavia, oltre a mantenere i saldi dell'utente, il canale tiene traccia anche dello stato attuale dell'archiviazione del contratto (ovvero, i valori delle variabili del contratto).

Ciò rende possibile eseguire un contratto intelligente fuori catena tra due utenti. In questo scenario, gli aggiornamenti allo stato interno del contratto intelligente richiedono solo l'approvazione dei peer che hanno creato il canale.

Sebbene questo risolva il problema di scalabilità descritto in precedenza, ha implicazioni per la sicurezza. Su Ethereum, la validità delle transizioni di stato è applicata dal protocollo di consenso della rete. Ciò rende impossibile proporre un aggiornamento non valido allo stato di un contratto intelligente o alterare l'esecuzione del contratto intelligente.

I canali di stato non hanno le stesse garanzie di sicurezza. In una certa misura, un canale di stato è una versione in miniatura della rete principale. Con un insieme limitato di partecipanti che applicano le regole, aumenta la possibilità di comportamenti dannosi (ad es. proporre aggiornamenti di stato non validi). I canali di stato derivano la loro sicurezza da un sistema di arbitrato delle controversie basato su [prove di frode](/glossary/#fraud-proof).

## Come funzionano i canali di stato {#how-state-channels-work}

Fondamentalmente, l'attività in un canale di stato è una sessione di interazioni che coinvolge utenti e un sistema blockchain. Gli utenti comunicano principalmente tra loro fuori catena e interagiscono con la blockchain sottostante solo per aprire il canale, chiudere il canale o risolvere potenziali controversie tra i partecipanti.

La sezione seguente delinea il flusso di lavoro di base di un canale di stato:

### Apertura del canale {#opening-the-channel}

L'apertura di un canale richiede ai partecipanti di impegnare fondi in un contratto intelligente sulla rete principale. Il deposito funziona anche come un conto virtuale, in modo che gli attori partecipanti possano effettuare transazioni liberamente senza dover saldare immediatamente i pagamenti. Solo quando il canale è finalizzato on-chain le parti si saldano a vicenda e prelevano ciò che resta del loro conto.

Questo deposito funge anche da cauzione per garantire un comportamento onesto da parte di ciascun partecipante. Se i depositanti vengono giudicati colpevoli di azioni dannose durante la fase di risoluzione delle controversie, il contratto punisce il loro deposito.

I peer del canale devono firmare uno stato iniziale, su cui tutti concordano. Questo funge da genesi del canale di stato, dopodiché gli utenti possono iniziare a effettuare transazioni.

### Utilizzo del canale {#using-the-channel}

Dopo aver inizializzato lo stato del canale, i peer interagiscono firmando le transazioni e inviandosele a vicenda per l'approvazione. I partecipanti avviano gli aggiornamenti di stato con queste transazioni e firmano gli aggiornamenti di stato degli altri. Ogni transazione comprende quanto segue:

- Un **nonce**, che funge da ID univoco per le transazioni e previene gli attacchi di replay. Identifica anche l'ordine in cui si sono verificati gli aggiornamenti di stato (il che è importante per la risoluzione delle controversie)

- Il vecchio stato del canale

- Il nuovo stato del canale

- La transazione che innesca la transizione di stato (ad es. Alice invia 5 ETH a Bob)

Gli aggiornamenti di stato nel canale non vengono trasmessi on-chain come avviene normalmente quando gli utenti interagiscono sulla rete principale, il che è in linea con l'obiettivo dei canali di stato di ridurre al minimo l'impronta on-chain. Finché i partecipanti concordano sugli aggiornamenti di stato, questi sono definitivi quanto una transazione di Ethereum. I partecipanti devono dipendere dal consenso della rete principale solo se sorge una controversia.

### Chiusura del canale {#closing-the-channel}

La chiusura di un canale di stato richiede l'invio dello stato finale e concordato del canale al contratto intelligente on-chain. I dettagli a cui si fa riferimento nell'aggiornamento di stato includono il numero di mosse di ciascun partecipante e un elenco di transazioni approvate.

Dopo aver verificato che l'aggiornamento di stato sia valido (ovvero, che sia firmato da tutte le parti), il contratto intelligente finalizza il canale e distribuisce i fondi bloccati in base all'esito del canale. I pagamenti effettuati fuori catena vengono applicati allo stato di Ethereum e ogni partecipante riceve la propria porzione rimanente dei fondi bloccati.

Lo scenario descritto sopra rappresenta ciò che accade nel caso ideale. A volte, gli utenti potrebbero non essere in grado di raggiungere un accordo e finalizzare il canale (il caso peggiore). Una qualsiasi delle seguenti condizioni potrebbe essere vera per la situazione:

- I partecipanti vanno offline e non riescono a proporre transizioni di stato

- I partecipanti si rifiutano di co-firmare aggiornamenti di stato validi

- I partecipanti cercano di finalizzare il canale proponendo un vecchio aggiornamento di stato al contratto on-chain

- I partecipanti propongono transizioni di stato non valide da far firmare agli altri

Ogni volta che il consenso viene meno tra gli attori partecipanti in un canale, l'ultima opzione è fare affidamento sul consenso della rete principale per far rispettare lo stato finale e valido del canale. In questo caso, la chiusura del canale di stato richiede la risoluzione delle controversie on-chain.

### Risoluzione delle controversie {#settling-disputes}

In genere, le parti in un canale concordano in anticipo sulla chiusura del canale e co-firmano l'ultima transizione di stato, che inviano al contratto intelligente. Una volta che l'aggiornamento è approvato on-chain, l'esecuzione del contratto intelligente fuori catena termina e i partecipanti escono dal canale con i loro soldi.

Tuttavia, una parte può inviare una richiesta on-chain per terminare l'esecuzione del contratto intelligente e finalizzare il canale, senza attendere l'approvazione della controparte. Se si verifica una qualsiasi delle situazioni di rottura del consenso descritte in precedenza, entrambe le parti possono attivare il contratto on-chain per chiudere il canale e distribuire i fondi. Questo fornisce **assenza di necessità di fiducia**, garantendo che le parti oneste possano ritirare i propri depositi in qualsiasi momento, indipendentemente dalle azioni dell'altra parte.

Per elaborare l'uscita dal canale, l'utente deve inviare l'ultimo aggiornamento di stato valido dell'applicazione al contratto on-chain. Se questo risulta corretto (ovvero, reca la firma di tutte le parti), i fondi vengono ridistribuiti a loro favore.

C'è, tuttavia, un ritardo nell'esecuzione delle richieste di uscita di un singolo utente. Se la richiesta di concludere il canale è stata approvata all'unanimità, la transazione di uscita on-chain viene eseguita immediatamente.

Il ritardo entra in gioco nelle uscite di un singolo utente a causa della possibilità di azioni fraudolente. Ad esempio, un partecipante al canale potrebbe tentare di finalizzare il canale su Ethereum inviando un aggiornamento di stato più vecchio on-chain.

Come contromisura, i canali di stato consentono agli utenti onesti di contestare gli aggiornamenti di stato non validi inviando l'ultimo stato valido del canale on-chain. I canali di stato sono progettati in modo tale che gli aggiornamenti di stato più recenti e concordati prevalgano sugli aggiornamenti di stato più vecchi.

Una volta che un peer attiva il sistema di risoluzione delle controversie on-chain, l'altra parte è tenuta a rispondere entro un limite di tempo (chiamato finestra di contestazione). Ciò consente agli utenti di contestare la transazione di uscita, specialmente se l'altra parte sta applicando un aggiornamento obsoleto.

Qualunque sia il caso, gli utenti del canale hanno sempre forti garanzie di finalità: se la transizione di stato in loro possesso è stata firmata da tutti i membri ed è l'aggiornamento più recente, allora ha la stessa finalità di una normale transazione on-chain. Devono comunque contestare l'altra parte on-chain, ma l'unico risultato possibile è la finalizzazione dell'ultimo stato valido, che essi detengono.

### Come interagiscono i canali di stato con Ethereum? {#how-do-state-channels-interact-with-ethereum}

Sebbene esistano come protocolli fuori catena, i canali di stato hanno un componente on-chain: il contratto intelligente distribuito su Ethereum all'apertura del canale. Questo contratto controlla le risorse depositate nel canale, verifica gli aggiornamenti di stato e arbitra le controversie tra i partecipanti.

I canali di stato non pubblicano i dati delle transazioni o gli impegni di stato sulla rete principale, a differenza delle soluzioni di scalabilità di [livello 2](/layer-2/). Tuttavia, sono più connessi alla rete principale rispetto, ad esempio, alle [catene laterali](/developers/docs/scaling/sidechains/), rendendoli in qualche modo più sicuri.

I canali di stato si affidano al protocollo principale di Ethereum per quanto segue:

#### 1. Liveness {#liveness}

Il contratto on-chain distribuito all'apertura del canale è responsabile della funzionalità del canale. Se il contratto è in esecuzione su Ethereum, il canale è sempre disponibile per l'uso. Al contrario, una catena laterale può sempre fallire, anche se la rete principale è operativa, mettendo a rischio i fondi degli utenti.

#### 2. Sicurezza {#security}

In una certa misura, i canali di stato si affidano a Ethereum per fornire sicurezza e proteggere gli utenti da peer malintenzionati. Come discusso nelle sezioni successive, i canali utilizzano un meccanismo di prova di frode che consente agli utenti di contestare i tentativi di finalizzare il canale con un aggiornamento non valido o obsoleto.

In questo caso, la parte onesta fornisce l'ultimo stato valido del canale come prova di frode al contratto on-chain per la verifica. Le prove di frode consentono a parti reciprocamente diffidenti di condurre transazioni fuori catena senza rischiare i propri fondi nel processo.

#### 3. Finalità {#finality}

Gli aggiornamenti di stato firmati collettivamente dagli utenti del canale sono considerati validi quanto le transazioni on-chain. Tuttavia, tutte le attività all'interno del canale raggiungono la vera finalità solo quando il canale viene chiuso su Ethereum.

Nel caso ottimistico, entrambe le parti possono cooperare e firmare l'aggiornamento di stato finale e inviarlo on-chain per chiudere il canale, dopodiché i fondi vengono distribuiti in base allo stato finale del canale. Nel caso pessimistico, in cui qualcuno cerca di imbrogliare pubblicando un aggiornamento di stato errato on-chain, la sua transazione non viene finalizzata fino allo scadere della finestra di contestazione.

## Canali di stato virtuali {#virtual-state-channels}

L'implementazione ingenua di un canale di stato consisterebbe nel distribuire un nuovo contratto quando due utenti desiderano eseguire un'applicazione fuori catena. Questo non solo è irrealizzabile, ma annulla anche il rapporto costo-efficacia dei canali di stato (i costi delle transazioni on-chain possono sommarsi rapidamente).

Per risolvere questo problema, sono stati creati i "canali virtuali". A differenza dei canali normali che richiedono transazioni on-chain per l'apertura e la chiusura, un canale virtuale può essere aperto, eseguito e finalizzato senza interagire con la catena principale. È persino possibile risolvere le controversie fuori catena utilizzando questo metodo.

Questo sistema si basa sull'esistenza dei cosiddetti "canali di registro" (ledger channels), che sono stati finanziati on-chain. I canali virtuali tra due parti possono essere costruiti su un canale di registro esistente, con il proprietario (o i proprietari) del canale di registro che funge da intermediario.

Gli utenti in ogni canale virtuale interagiscono tramite una nuova istanza del contratto, con il canale di registro in grado di supportare più istanze del contratto. Lo stato del canale di registro contiene anche più di uno stato di archiviazione del contratto, consentendo l'esecuzione parallela di applicazioni fuori catena tra utenti diversi.

Proprio come i canali normali, gli utenti si scambiano aggiornamenti di stato per far progredire la macchina a stati. A meno che non sorga una controversia, l'intermediario deve essere contattato solo all'apertura o alla chiusura del canale.

### Canali di pagamento virtuali {#virtual-payment-channels}

I canali di pagamento virtuali funzionano sulla stessa idea dei canali di stato virtuali: i partecipanti connessi alla stessa rete possono scambiarsi messaggi senza dover aprire un nuovo canale on-chain. Nei canali di pagamento virtuali, i trasferimenti di valore vengono instradati attraverso uno o più intermediari, con la garanzia che solo il destinatario previsto possa ricevere i fondi trasferiti.

## Applicazioni dei canali di stato {#applications-of-state-channels}

### Pagamenti {#payments}

I primi canali della blockchain erano semplici protocolli che consentivano a due partecipanti di condurre trasferimenti rapidi e a basse commissioni fuori catena senza dover pagare elevate commissioni della transazione sulla rete principale. Oggi, i canali di pagamento sono ancora utili per le applicazioni progettate per lo scambio e i depositi di ether e token.

I pagamenti basati sui canali presentano i seguenti vantaggi:

1. **Throughput**: La quantità di transazioni fuori catena per canale è scollegata dal throughput di Ethereum, che è influenzato da vari fattori, in particolare la dimensione del blocco e il tempo di blocco. Eseguendo le transazioni fuori catena, i canali della blockchain possono ottenere un throughput più elevato.

2. **Privacy**: Poiché i canali esistono fuori catena, i dettagli delle interazioni tra i partecipanti non vengono registrati sulla blockchain pubblica di Ethereum. Gli utenti del canale devono interagire on-chain solo per finanziare e chiudere i canali o risolvere le controversie. Pertanto, i canali sono utili per le persone che desiderano transazioni più private.

3. **Latenza**: Le transazioni fuori catena condotte tra i partecipanti al canale possono essere regolate istantaneamente, se entrambe le parti cooperano, riducendo i ritardi. Al contrario, l'invio di una transazione sulla rete principale richiede l'attesa che i nodi elaborino la transazione, producano un nuovo blocco con la transazione e raggiungano il consenso. Gli utenti potrebbero anche dover attendere ulteriori conferme del blocco prima di considerare finalizzata una transazione.

4. **Costo**: I canali di stato sono particolarmente utili in situazioni in cui un insieme di partecipanti scambierà molti aggiornamenti di stato per un lungo periodo. Gli unici costi sostenuti sono l'apertura e la chiusura del contratto intelligente del canale di stato; ogni cambiamento di stato tra l'apertura e la chiusura del canale sarà più economico del precedente poiché il costo di regolamento viene distribuito di conseguenza.

L'implementazione di canali di stato su soluzioni di livello 2, come i [rollup](/developers/docs/scaling/#rollups), potrebbe renderli ancora più attraenti per i pagamenti. Sebbene i canali offrano pagamenti economici, i costi di configurazione del contratto on-chain sulla rete principale durante la fase di apertura possono diventare costosi, specialmente quando le commissioni aumentano. I rollup basati su Ethereum offrono [commissioni della transazione inferiori](https://l2fees.info/) e possono ridurre i costi generali per i partecipanti al canale abbassando le commissioni di configurazione.

### Microtransazioni {#microtransactions}

Le microtransazioni sono pagamenti di basso valore (ad es. inferiori a una frazione di dollaro) che le aziende non possono elaborare senza incorrere in perdite. Queste entità devono pagare i fornitori di servizi di pagamento, cosa che non possono fare se il margine sui pagamenti dei clienti è troppo basso per trarre profitto.

I canali di pagamento risolvono questo problema riducendo i costi generali associati alle microtransazioni. Ad esempio, un fornitore di servizi Internet (ISP) può aprire un canale di pagamento con un cliente, consentendogli di inviare piccoli pagamenti in streaming ogni volta che utilizza il servizio.

Oltre al costo di apertura e chiusura del canale, i partecipanti non incorrono in ulteriori costi sulle microtransazioni (nessuna commissione). Questa è una situazione vantaggiosa per tutti, poiché i clienti hanno maggiore flessibilità su quanto pagano per i servizi e le aziende non perdono microtransazioni redditizie.

### Applicazioni decentralizzate {#decentralized-applications}

Come i canali di pagamento, i canali di stato possono effettuare pagamenti condizionati in base agli stati finali della macchina a stati. I canali di stato possono anche supportare una logica di transizione di stato arbitraria, rendendoli utili per l'esecuzione di app generiche fuori catena.

I canali di stato sono spesso limitati a semplici applicazioni a turni, poiché ciò semplifica la gestione dei fondi impegnati nel contratto on-chain. Inoltre, con un numero limitato di parti che aggiornano lo stato dell'applicazione fuori catena a intervalli, punire i comportamenti disonesti è relativamente semplice.

L'efficienza di un'applicazione di canale di stato dipende anche dalla sua progettazione. Ad esempio, uno sviluppatore potrebbe distribuire il contratto del canale dell'app on-chain una volta e consentire ad altri giocatori di riutilizzare l'app senza dover andare on-chain. In questo caso, il canale dell'app iniziale funge da canale di registro che supporta più canali virtuali, ognuno dei quali esegue una nuova istanza del contratto intelligente dell'app fuori catena.

Un potenziale caso d'uso per le applicazioni dei canali di stato sono i semplici giochi a due giocatori, in cui i fondi vengono distribuiti in base all'esito del gioco. Il vantaggio qui è che i giocatori non devono fidarsi l'uno dell'altro (assenza di necessità di fiducia) e il contratto on-chain, non i giocatori, controlla l'allocazione dei fondi e la risoluzione delle controversie (decentralizzazione).

Altri possibili casi d'uso per le app dei canali di stato includono la proprietà dei nomi ENS, i registri NFT e molti altri.

### Trasferimenti atomici {#atomic-transfers}

I primi canali di pagamento erano limitati ai trasferimenti tra due parti, limitandone l'usabilità. Tuttavia, l'introduzione dei canali virtuali ha consentito agli individui di instradare i trasferimenti attraverso intermediari (ovvero, più canali p2p) senza dover aprire un nuovo canale on-chain.

Comunemente descritti come "trasferimenti multi-hop", i pagamenti instradati sono atomici (ovvero, o tutte le parti della transazione hanno successo o fallisce del tutto). I trasferimenti atomici utilizzano gli [Hashed Timelock Contracts (HTLC)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) per garantire che il pagamento venga rilasciato solo se vengono soddisfatte determinate condizioni, riducendo così il rischio di controparte.

## Svantaggi dell'utilizzo dei canali di stato {#drawbacks-of-state-channels}

### Presupposti di liveness {#liveness-assumptions}

Per garantire l'efficienza, i canali di stato pongono limiti di tempo alla capacità dei partecipanti al canale di rispondere alle controversie. Questa regola presuppone che i peer saranno sempre online per monitorare l'attività del canale e contestare le sfide quando necessario.

In realtà, gli utenti possono andare offline per motivi al di fuori del loro controllo (ad es. scarsa connessione Internet, guasto meccanico, ecc.). Se un utente onesto va offline, un peer malintenzionato può sfruttare la situazione presentando vecchi stati intermedi al contratto giudicante e rubando i fondi impegnati.

Alcuni canali utilizzano le "torri di guardia" (watchtowers), entità responsabili di osservare gli eventi di controversia on-chain per conto di altri e di intraprendere le azioni necessarie, come avvisare le parti interessate. Tuttavia, questo può aumentare i costi di utilizzo di un canale di stato.

### Indisponibilità dei dati {#data-unavailability}

Come spiegato in precedenza, contestare una controversia non valida richiede la presentazione dell'ultimo stato valido del canale di stato. Questa è un'altra regola basata su un presupposto: che gli utenti abbiano accesso all'ultimo stato del canale.

Sebbene aspettarsi che gli utenti del canale memorizzino copie dello stato dell'applicazione fuori catena sia ragionevole, questi dati potrebbero andare persi a causa di errori o guasti meccanici. Se l'utente non ha eseguito il backup dei dati, può solo sperare che l'altra parte non finalizzi una richiesta di uscita non valida utilizzando vecchie transizioni di stato in suo possesso.

Gli utenti di Ethereum non devono affrontare questo problema poiché la rete applica regole sulla disponibilità dei dati. I dati delle transazioni vengono archiviati e propagati da tutti i nodi e sono disponibili per il download da parte degli utenti se e quando necessario.

### Problemi di liquidità {#liquidity-issues}

Per stabilire un canale della blockchain, i partecipanti devono bloccare i fondi in un contratto intelligente on-chain per il ciclo di vita del canale. Ciò riduce la liquidità degli utenti del canale e limita anche i canali a coloro che possono permettersi di mantenere i fondi bloccati sulla rete principale.

Tuttavia, i canali di registro, gestiti da un fornitore di servizi fuori catena (OSP), possono ridurre i problemi di liquidità per gli utenti. Due peer connessi a un canale di registro possono creare un canale virtuale, che possono aprire e finalizzare completamente fuori catena, in qualsiasi momento lo desiderino.

I fornitori di servizi fuori catena potrebbero anche aprire canali con più peer, rendendoli utili per l'instradamento dei pagamenti. Naturalmente, gli utenti devono pagare delle commissioni agli OSP per i loro servizi, il che potrebbe essere indesiderabile per alcuni.

### Attacchi di griefing {#griefing-attacks}

Gli attacchi di griefing sono una caratteristica comune dei sistemi basati su prove di frode. Un attacco di griefing non avvantaggia direttamente l'attaccante ma causa dolore (ovvero, danno) alla vittima, da cui il nome.

La prova di frode è suscettibile agli attacchi di griefing perché la parte onesta deve rispondere a ogni controversia, anche a quelle non valide, o rischiare di perdere i propri fondi. Un partecipante malintenzionato può decidere di pubblicare ripetutamente transazioni di stato obsolete on-chain, costringendo la parte onesta a rispondere con lo stato valido. Il costo di quelle transazioni on-chain può sommarsi rapidamente, causando perdite alle parti oneste nel processo.

### Insiemi di partecipanti predefiniti {#predefined-participant-sets}

Per impostazione predefinita, il numero di partecipanti che compongono un canale di stato rimane fisso per tutta la sua durata. Questo perché l'aggiornamento dell'insieme dei partecipanti complicherebbe il funzionamento del canale, specialmente durante il finanziamento del canale o la risoluzione delle controversie. L'aggiunta o la rimozione di partecipanti richiederebbe anche un'attività on-chain aggiuntiva, che aumenta i costi generali per gli utenti.

Sebbene ciò renda i canali di stato più facili da analizzare, limita l'utilità dei design dei canali per gli sviluppatori di applicazioni. Questo spiega in parte perché i canali di stato sono stati abbandonati a favore di altre soluzioni di scalabilità, come i rollup.

### Elaborazione parallela delle transazioni {#parallel-transaction-processing}

I partecipanti al canale di stato inviano aggiornamenti di stato a turni, motivo per cui funzionano meglio per le "applicazioni a turni" (ad es. una partita a scacchi a due giocatori). Ciò elimina la necessità di gestire aggiornamenti di stato simultanei e riduce il lavoro che il contratto on-chain deve svolgere per punire chi pubblica aggiornamenti obsoleti. Tuttavia, un effetto collaterale di questo design è che le transazioni dipendono l'una dall'altra, aumentando la latenza e diminuendo l'esperienza utente complessiva.

Alcuni canali di stato risolvono questo problema utilizzando un design "full-duplex" che separa lo stato fuori catena in due stati "simplex" unidirezionali, consentendo aggiornamenti di stato simultanei. Tali design migliorano il throughput fuori catena e riducono i ritardi delle transazioni.

## Utilizzare i canali di stato {#use-state-channels}

Diversi progetti fornisono implementazioni di canali di stato che puoi integrare nelle tue dApp:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Letture consigliate {#further-reading}

**Canali di stato**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 febbraio 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _6 novembre 2015 - Jeff Coleman_
- [Basics of State Channels](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Blockchain State Channels: A State of the Art](https://ieeexplore.ieee.org/document/9627997)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_