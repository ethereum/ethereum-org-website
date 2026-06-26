---
title: Canali di stato
description: Un'introduzione ai canali di stato e ai canali di pagamento come soluzione di ridimensionamento attualmente utilizzata dalla community di Ethereum.
lang: it
sidebarDepth: 3
---

I canali di stato consentono ai partecipanti di effettuare transazioni sicure offchain mantenendo al minimo l'interazione con la Mainnet di [Ethereum](/). I peer del canale possono condurre un numero arbitrario di transazioni offchain inviando solo due transazioni onchain per aprire e chiudere il canale. Ciò consente una capacità transazionale estremamente elevata e si traduce in costi inferiori per gli utenti.

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso le nostre pagine sul [ridimensionamento di Ethereum](/developers/docs/scaling/) e sui [layer 2](/layer-2/).

## Cosa sono i canali? {#what-are-channels}

Le blockchain pubbliche, come Ethereum, affrontano sfide di scalabilità a causa della loro architettura distribuita: le transazioni onchain devono essere eseguite da tutti i nodi. I nodi devono essere in grado di gestire il volume di transazioni in un blocco utilizzando hardware modesto, imponendo un limite alla capacità transazionale per mantenere la rete decentralizzata. I canali della blockchain risolvono questo problema consentendo agli utenti di interagire offchain pur continuando a fare affidamento sulla sicurezza della catena principale per il regolamento finale.

I canali sono semplici protocolli peer-to-peer che consentono a due parti di effettuare molte transazioni tra loro e quindi pubblicare solo i risultati finali sulla blockchain. Il canale utilizza la crittografia per dimostrare che i dati di riepilogo che generano sono veramente il risultato di un insieme valido di transazioni intermedie. Uno smart contract ["multisig"](/developers/docs/smart-contracts/#multisig) garantisce che le transazioni siano firmate dalle parti corrette.

Con i canali, le modifiche di stato vengono eseguite e convalidate dalle parti interessate, riducendo al minimo il calcolo sul livello di esecuzione di Ethereum. Ciò riduce la congestione su Ethereum e aumenta anche la velocità di elaborazione delle transazioni per gli utenti.

Ogni canale è gestito da uno [smart contract multisig](/developers/docs/smart-contracts/#multisig) in esecuzione su Ethereum. Per aprire un canale, i partecipanti distribuiscono il contratto del canale onchain e vi depositano fondi. Entrambe le parti firmano collettivamente un aggiornamento di stato per inizializzare lo stato del canale, dopodiché possono effettuare transazioni in modo rapido e libero offchain.

Per chiudere il canale, i partecipanti inviano l'ultimo stato concordato del canale onchain. Successivamente, lo smart contract distribuisce i fondi bloccati in base al saldo di ciascun partecipante nello stato finale del canale.

I canali peer-to-peer sono particolarmente utili per le situazioni in cui alcuni partecipanti predefiniti desiderano effettuare transazioni ad alta frequenza senza incorrere in costi generali visibili. I canali della blockchain rientrano in due categorie: **canali di pagamento** e **canali di stato**.

## Canali di pagamento {#payment-channels}

Un canale di pagamento è meglio descritto come un "registro bidirezionale" mantenuto collettivamente da due utenti. Il saldo iniziale del registro è la somma dei depositi bloccati nel contratto onchain durante la fase di apertura del canale. I trasferimenti del canale di pagamento possono essere eseguiti istantaneamente e senza il coinvolgimento della blockchain vera e propria, ad eccezione di una creazione onchain iniziale una tantum e di un'eventuale chiusura del canale.

Gli aggiornamenti al saldo del registro (ovvero, lo stato del canale di pagamento) richiedono l'approvazione di tutte le parti nel canale. Un aggiornamento del canale, firmato da tutti i partecipanti al canale, è considerato finalizzato, in modo molto simile a una transazione su Ethereum.

I canali di pagamento sono stati tra le prime soluzioni di ridimensionamento progettate per ridurre al minimo le costose attività onchain di semplici interazioni degli utenti (ad es. trasferimenti di ETH, atomic swap, micropagamenti). I partecipanti al canale possono condurre una quantità illimitata di transazioni istantanee e senza commissioni tra loro, a condizione che la somma netta dei loro trasferimenti non superi i token depositati.

## Canali di stato {#state-channels}

Oltre a supportare i pagamenti offchain, i canali di pagamento non si sono dimostrati utili per gestire la logica generale di transizione di stato. I canali di stato sono stati creati per risolvere questo problema e rendere i canali utili per il ridimensionamento del calcolo generico.

I canali di stato hanno ancora molto in comune con i canali di pagamento. Ad esempio, gli utenti interagiscono scambiandosi messaggi firmati crittograficamente (transazioni), che anche gli altri partecipanti al canale devono firmare. Se un aggiornamento di stato proposto non è firmato da tutti i partecipanti, è considerato non valido.

Tuttavia, oltre a mantenere i saldi dell'utente, il canale tiene traccia anche dello stato corrente dell'archiviazione del contratto (ovvero, i valori delle variabili del contratto).

Ciò rende possibile eseguire uno smart contract offchain tra due utenti. In questo scenario, gli aggiornamenti allo stato interno dello smart contract richiedono solo l'approvazione dei peer che hanno creato il canale.

Sebbene ciò risolva il problema di scalabilità descritto in precedenza, ha implicazioni per la sicurezza. Su Ethereum, la validità delle transizioni di stato è applicata dal protocollo di consenso della rete. Ciò rende impossibile proporre un aggiornamento non valido allo stato di uno smart contract o alterare l'esecuzione dello smart contract.

I canali di stato non hanno le stesse garanzie di sicurezza. In una certa misura, un canale di stato è una versione in miniatura della Mainnet. Con un insieme limitato di partecipanti che applicano le regole, aumenta la possibilità di comportamenti dannosi (ad es. proporre aggiornamenti di stato non validi). I canali di stato derivano la loro sicurezza da un sistema di arbitrato delle controversie basato su [prove di frode](/glossary/#fraud-proof).

## Come funzionano i canali di stato {#how-state-channels-work}

Fondamentalmente, l'attività in un canale di stato è una sessione di interazioni che coinvolge utenti e un sistema blockchain. Gli utenti comunicano principalmente tra loro offchain e interagiscono con la blockchain sottostante solo per aprire il canale, chiudere il canale o risolvere potenziali controversie tra i partecipanti.

La sezione seguente delinea il flusso di lavoro di base di un canale di stato:

### Apertura del canale {#opening-the-channel}

L'apertura di un canale richiede ai partecipanti di impegnare fondi in uno smart contract sulla Mainnet. Il deposito funziona anche come un conto virtuale, in modo che gli attori partecipanti possano effettuare transazioni liberamente senza dover regolare immediatamente i pagamenti. Solo quando il canale è finalizzato onchain le parti si regolano a vicenda e ritirano ciò che resta del loro conto.

Questo deposito funge anche da cauzione per garantire un comportamento onesto da parte di ciascun partecipante. Se i depositanti vengono giudicati colpevoli di azioni dannose durante la fase di risoluzione delle controversie, il contratto taglia (slash) il loro deposito.

I peer del canale devono firmare uno stato iniziale, su cui tutti concordano. Questo funge da genesi del canale di stato, dopodiché gli utenti possono iniziare a effettuare transazioni.

### Utilizzo del canale {#using-the-channel}

Dopo aver inizializzato lo stato del canale, i peer interagiscono firmando le transazioni e inviandosele a vicenda per l'approvazione. I partecipanti avviano gli aggiornamenti di stato con queste transazioni e firmano gli aggiornamenti di stato degli altri. Ogni transazione comprende quanto segue:

- Un **nonce**, che funge da ID univoco per le transazioni e previene gli attacchi di replay. Identifica anche l'ordine in cui si sono verificati gli aggiornamenti di stato (il che è importante per la risoluzione delle controversie)

- Il vecchio stato del canale

- Il nuovo stato del canale

- La transazione che innesca la transizione di stato (ad es. Alice invia 5 ETH a Bob)

Gli aggiornamenti di stato nel canale non vengono trasmessi onchain come avviene normalmente quando gli utenti interagiscono sulla Mainnet, il che è in linea con l'obiettivo dei canali di stato di ridurre al minimo l'impronta onchain. Finché i partecipanti concordano sugli aggiornamenti di stato, questi sono definitivi quanto una transazione di Ethereum. I partecipanti devono dipendere dal consenso della Mainnet solo in caso di controversia.

### Chiusura del canale {#closing-the-channel}

La chiusura di un canale di stato richiede l'invio dello stato finale e concordato del canale allo smart contract onchain. I dettagli a cui si fa riferimento nell'aggiornamento di stato includono il numero di mosse di ciascun partecipante e un elenco di transazioni approvate.

Dopo aver verificato che l'aggiornamento di stato sia valido (ovvero, sia firmato da tutte le parti), lo smart contract finalizza il canale e distribuisce i fondi bloccati in base all'esito del canale. I pagamenti effettuati offchain vengono applicati allo stato di Ethereum e ogni partecipante riceve la parte rimanente dei fondi bloccati.

Lo scenario descritto sopra rappresenta ciò che accade nel caso ideale. A volte, gli utenti potrebbero non essere in grado di raggiungere un accordo e finalizzare il canale (il caso peggiore). Una qualsiasi delle seguenti condizioni potrebbe verificarsi nella situazione:

- I partecipanti vanno offline e non riescono a proporre transizioni di stato

- I partecipanti si rifiutano di co-firmare aggiornamenti di stato validi

- I partecipanti cercano di finalizzare il canale proponendo un vecchio aggiornamento di stato al contratto onchain

- I partecipanti propongono transizioni di stato non valide da far firmare agli altri

Ogni volta che il consenso viene meno tra gli attori partecipanti in un canale, l'ultima opzione è fare affidamento sul consenso della Mainnet per far rispettare lo stato finale e valido del canale. In questo caso, la chiusura del canale di stato richiede la risoluzione delle controversie onchain.

### Risoluzione delle controversie {#settling-disputes}

In genere, le parti in un canale concordano in anticipo sulla chiusura del canale e co-firmano l'ultima transizione di stato, che inviano allo smart contract. Una volta approvato l'aggiornamento onchain, l'esecuzione dello smart contract offchain termina e i partecipanti escono dal canale con i loro soldi.

Tuttavia, una parte può inviare una richiesta onchain per terminare l'esecuzione dello smart contract e finalizzare il canale, senza attendere l'approvazione della controparte. Se si verifica una delle situazioni di rottura del consenso descritte in precedenza, entrambe le parti possono attivare il contratto onchain per chiudere il canale e distribuire i fondi. Ciò fornisce **assenza di necessità di fiducia**, garantendo che le parti oneste possano ritirare i propri depositi in qualsiasi momento, indipendentemente dalle azioni dell'altra parte.

Per elaborare l'uscita dal canale, l'utente deve inviare l'ultimo aggiornamento di stato valido dell'applicazione al contratto onchain. Se questo risulta corretto (ovvero, reca la firma di tutte le parti), i fondi vengono ridistribuiti a loro favore.

C'è, tuttavia, un ritardo nell'esecuzione delle richieste di uscita di un singolo utente. Se la richiesta di concludere il canale è stata approvata all'unanimità, la transazione di uscita onchain viene eseguita immediatamente.

Il ritardo entra in gioco nelle uscite di un singolo utente a causa della possibilità di azioni fraudolente. Ad esempio, un partecipante al canale potrebbe tentare di finalizzare il canale su Ethereum inviando un aggiornamento di stato più vecchio onchain.

Come contromisura, i canali di stato consentono agli utenti onesti di contestare gli aggiornamenti di stato non validi inviando l'ultimo stato valido del canale onchain. I canali di stato sono progettati in modo tale che gli aggiornamenti di stato più recenti e concordati prevalgano sugli aggiornamenti di stato più vecchi.

Una volta che un peer attiva il sistema di risoluzione delle controversie onchain, l'altra parte è tenuta a rispondere entro un limite di tempo (chiamato finestra di contestazione). Ciò consente agli utenti di contestare la transazione di uscita, specialmente se l'altra parte sta applicando un aggiornamento obsoleto.

Qualunque sia il caso, gli utenti del canale hanno sempre forti garanzie di definitività: se la transizione di stato in loro possesso è stata firmata da tutti i membri ed è l'aggiornamento più recente, allora ha la stessa definitività di una normale transazione onchain. Devono comunque contestare l'altra parte onchain, ma l'unico risultato possibile è la finalizzazione dell'ultimo stato valido, che essi detengono.

### Come interagiscono i canali di stato con Ethereum? {#how-do-state-channels-interact-with-ethereum}

Sebbene esistano come protocolli offchain, i canali di stato hanno un componente onchain: lo smart contract distribuito su Ethereum all'apertura del canale. Questo contratto controlla gli asset depositati nel canale, verifica gli aggiornamenti di stato e arbitra le controversie tra i partecipanti.

I canali di stato non pubblicano dati di transazione o impegni di stato sulla Mainnet, a differenza delle soluzioni di ridimensionamento [layer 2](/layer-2/). Tuttavia, sono più connessi alla Mainnet rispetto, ad esempio, alle [sidechain](/developers/docs/scaling/sidechains/), rendendoli in qualche modo più sicuri.

I canali di stato si affidano al protocollo principale di Ethereum per quanto segue:

#### 1. Liveness {#liveness}

Il contratto onchain distribuito all'apertura del canale è responsabile della funzionalità del canale. Se il contratto è in esecuzione su Ethereum, il canale è sempre disponibile per l'uso. Al contrario, una sidechain può sempre fallire, anche se la Mainnet è operativa, mettendo a rischio i fondi degli utenti.

#### 2. Security {#security}

In una certa misura, i canali di stato si affidano a Ethereum per fornire sicurezza e proteggere gli utenti da peer malintenzionati. Come discusso nelle sezioni successive, i canali utilizzano un meccanismo di prova di frode che consente agli utenti di contestare i tentativi di finalizzare il canale con un aggiornamento non valido o obsoleto.

In questo caso, la parte onesta fornisce l'ultimo stato valido del canale come prova di frode al contratto onchain per la verifica. Le prove di frode consentono a parti reciprocamente diffidenti di condurre transazioni offchain senza rischiare i propri fondi nel processo.

#### 3. Finality {#finality}

Gli aggiornamenti di stato firmati collettivamente dagli utenti del canale sono considerati validi quanto le transazioni onchain. Tuttavia, tutte le attività all'interno del canale raggiungono la vera definitività solo quando il canale viene chiuso su Ethereum.

Nel caso ottimistico, entrambe le parti possono cooperare e firmare l'aggiornamento di stato finale e inviarlo onchain per chiudere il canale, dopodiché i fondi vengono distribuiti in base allo stato finale del canale. Nel caso pessimistico, in cui qualcuno cerca di imbrogliare pubblicando un aggiornamento di stato errato onchain, la sua transazione non viene finalizzata fino allo scadere della finestra di contestazione.

## Canali di stato virtuali {#virtual-state-channels}

L'implementazione ingenua di un canale di stato consisterebbe nel distribuire un nuovo contratto quando due utenti desiderano eseguire un'applicazione offchain. Questo non solo è irrealizzabile, ma annulla anche l'efficienza in termini di costi dei canali di stato (i costi delle transazioni onchain possono sommarsi rapidamente).

Per risolvere questo problema, sono stati creati i "canali virtuali". A differenza dei canali normali che richiedono transazioni onchain per l'apertura e la chiusura, un canale virtuale può essere aperto, eseguito e finalizzato senza interagire con la catena principale. È persino possibile risolvere le controversie offchain utilizzando questo metodo.

Questo sistema si basa sull'esistenza dei cosiddetti "canali di registro" (ledger channel), che sono stati finanziati onchain. I canali virtuali tra due parti possono essere costruiti su un canale di registro esistente, con il proprietario (o i proprietari) del canale di registro che funge da intermediario.

Gli utenti in ciascun canale virtuale interagiscono tramite una nuova istanza del contratto, con il canale di registro in grado di supportare più istanze del contratto. Lo stato del canale di registro contiene anche più di uno stato di archiviazione del contratto, consentendo l'esecuzione parallela di applicazioni offchain tra utenti diversi.

Proprio come i canali normali, gli utenti si scambiano aggiornamenti di stato per far progredire la macchina a stati. A meno che non sorga una controversia, l'intermediario deve essere contattato solo all'apertura o alla chiusura del canale.

### Canali di pagamento virtuali {#virtual-payment-channels}

I canali di pagamento virtuali funzionano sulla stessa idea dei canali di stato virtuali: i partecipanti connessi alla stessa rete possono scambiarsi messaggi senza dover aprire un nuovo canale onchain. Nei canali di pagamento virtuali, i trasferimenti di valore vengono instradati attraverso uno o più intermediari, con la garanzia che solo il destinatario previsto possa ricevere i fondi trasferiti.

## Applicazioni dei canali di stato {#applications-of-state-channels}

### Pagamenti {#payments}

I primi canali della blockchain erano protocolli semplici che consentivano a due partecipanti di condurre trasferimenti rapidi e a basso costo offchain senza dover pagare commissioni di transazione elevate sulla Mainnet. Oggi, i canali di pagamento sono ancora utili per le applicazioni progettate per lo scambio e i depositi di ether e token.

I pagamenti basati sui canali presentano i seguenti vantaggi:

1. **Capacità transazionale**: La quantità di transazioni offchain per canale non è collegata alla capacità transazionale di Ethereum, che è influenzata da vari fattori, in particolare la dimensione del blocco e il tempo di blocco. Eseguendo le transazioni offchain, i canali della blockchain possono ottenere una capacità transazionale più elevata.

2. **Privacy**: Poiché i canali esistono offchain, i dettagli delle interazioni tra i partecipanti non vengono registrati sulla blockchain pubblica di Ethereum. Gli utenti del canale devono interagire onchain solo quando finanziano e chiudono i canali o risolvono le controversie. Pertanto, i canali sono utili per le persone che desiderano transazioni più private.

3. **Latenza**: Le transazioni offchain condotte tra i partecipanti al canale possono essere regolate istantaneamente, se entrambe le parti cooperano, riducendo i ritardi. Al contrario, l'invio di una transazione sulla Mainnet richiede l'attesa che i nodi elaborino la transazione, producano un nuovo blocco con la transazione e raggiungano il consenso. Gli utenti potrebbero anche dover attendere ulteriori conferme del blocco prima di considerare una transazione finalizzata.

4. **Costo**: I canali di stato sono particolarmente utili in situazioni in cui un insieme di partecipanti scambierà molti aggiornamenti di stato per un lungo periodo. Gli unici costi sostenuti sono l'apertura e la chiusura dello smart contract del canale di stato; ogni modifica di stato tra l'apertura e la chiusura del canale sarà più economica della precedente poiché il costo di regolamento viene distribuito di conseguenza.

L'implementazione di canali di stato su soluzioni layer 2, come i [rollup](/developers/docs/scaling/#rollups), potrebbe renderli ancora più interessanti per i pagamenti. Sebbene i canali offrano pagamenti economici, i costi di configurazione del contratto onchain sulla Mainnet durante la fase di apertura possono diventare costosi, specialmente quando le commissioni del gas subiscono picchi. I rollup basati su Ethereum offrono [commissioni di transazione inferiori](https://l2fees.info/) e possono ridurre i costi generali per i partecipanti al canale abbassando le commissioni di configurazione.

### Microtransazioni {#microtransactions}

Le microtransazioni sono pagamenti di basso valore (ad es. inferiori a una frazione di dollaro) che le aziende non possono elaborare senza incorrere in perdite. Queste entità devono pagare i fornitori di servizi di pagamento, cosa che non possono fare se il margine sui pagamenti dei clienti è troppo basso per trarre profitto.

I canali di pagamento risolvono questo problema riducendo i costi generali associati alle microtransazioni. Ad esempio, un fornitore di servizi Internet (ISP) può aprire un canale di pagamento con un cliente, consentendogli di inviare in streaming piccoli pagamenti ogni volta che utilizza il servizio.

Oltre al costo di apertura e chiusura del canale, i partecipanti non sostengono ulteriori costi sulle microtransazioni (nessuna commissione del gas). Questa è una situazione vantaggiosa per tutti, poiché i clienti hanno maggiore flessibilità su quanto pagano per i servizi e le aziende non perdono microtransazioni redditizie.

### Applicazioni decentralizzate {#decentralized-applications}

Come i canali di pagamento, i canali di stato possono effettuare pagamenti condizionati in base agli stati finali della macchina a stati. I canali di stato possono anche supportare una logica di transizione di stato arbitraria, rendendoli utili per l'esecuzione di app generiche offchain.

I canali di stato sono spesso limitati a semplici applicazioni a turni, poiché ciò semplifica la gestione dei fondi impegnati nel contratto onchain. Inoltre, con un numero limitato di parti che aggiornano lo stato dell'applicazione offchain a intervalli, punire i comportamenti disonesti è relativamente semplice.

L'efficienza di un'applicazione del canale di stato dipende anche dal suo design. Ad esempio, uno sviluppatore potrebbe distribuire il contratto del canale dell'app onchain una volta e consentire ad altri giocatori di riutilizzare l'app senza dover andare onchain. In questo caso, il canale dell'app iniziale funge da canale di registro che supporta più canali virtuali, ciascuno dei quali esegue una nuova istanza dello smart contract dell'app offchain.

Un potenziale caso d'uso per le applicazioni dei canali di stato sono i semplici giochi a due giocatori, in cui i fondi vengono distribuiti in base all'esito del gioco. Il vantaggio qui è che i giocatori non devono fidarsi l'uno dell'altro (assenza di necessità di fiducia) e il contratto onchain, non i giocatori, controlla l'allocazione dei fondi e la risoluzione delle controversie (decentralizzazione).

Altri possibili casi d'uso per le app dei canali di stato includono la proprietà dei nomi ENS, i registri NFT e molti altri.

### Trasferimenti atomici {#atomic-transfers}

I primi canali di pagamento erano limitati ai trasferimenti tra due parti, limitandone l'usabilità. Tuttavia, l'introduzione dei canali virtuali ha consentito agli individui di instradare i trasferimenti attraverso intermediari (ovvero, più canali p2p) senza dover aprire un nuovo canale onchain.

Comunemente descritti come "trasferimenti multi-hop", i pagamenti instradati sono atomici (ovvero, o tutte le parti della transazione hanno successo o fallisce del tutto). I trasferimenti atomici utilizzano gli [Hashed Timelock Contract (HTLC)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) per garantire che il pagamento venga rilasciato solo se vengono soddisfatte determinate condizioni, riducendo così il rischio di controparte.

## Svantaggi dell'utilizzo dei canali di stato {#drawbacks-of-state-channels}

### Presupposti di liveness {#liveness-assumptions}

Per garantire l'efficienza, i canali di stato pongono limiti di tempo alla capacità dei partecipanti al canale di rispondere alle controversie. Questa regola presuppone che i peer saranno sempre online per monitorare l'attività del canale e contestare le sfide quando necessario.

In realtà, gli utenti possono andare offline per motivi al di fuori del loro controllo (ad es. scarsa connessione Internet, guasto meccanico, ecc.). Se un utente onesto va offline, un peer malintenzionato può sfruttare la situazione presentando vecchi stati intermedi al contratto di aggiudicazione e rubando i fondi impegnati.

Alcuni canali utilizzano "torri di guardia" (watchtower), entità responsabili di osservare gli eventi di controversia onchain per conto di altri e di intraprendere le azioni necessarie, come avvisare le parti interessate. Tuttavia, ciò può aumentare i costi di utilizzo di un canale di stato.

### Indisponibilità dei dati {#data-unavailability}

Come spiegato in precedenza, contestare una controversia non valida richiede la presentazione dell'ultimo stato valido del canale di stato. Questa è un'altra regola basata su un presupposto: che gli utenti abbiano accesso all'ultimo stato del canale.

Sebbene sia ragionevole aspettarsi che gli utenti del canale memorizzino copie dello stato dell'applicazione offchain, questi dati potrebbero andare persi a causa di errori o guasti meccanici. Se l'utente non ha eseguito il backup dei dati, può solo sperare che l'altra parte non finalizzi una richiesta di uscita non valida utilizzando vecchie transizioni di stato in suo possesso.

Gli utenti di Ethereum non devono affrontare questo problema poiché la rete applica regole sulla disponibilità dei dati. I dati delle transazioni vengono archiviati e propagati da tutti i nodi e sono disponibili per il download da parte degli utenti se e quando necessario.

### Problemi di liquidità {#liquidity-issues}

Per stabilire un canale della blockchain, i partecipanti devono bloccare i fondi in uno smart contract onchain per il ciclo di vita del canale. Ciò riduce la liquidità degli utenti del canale e limita anche i canali a coloro che possono permettersi di mantenere i fondi bloccati sulla Mainnet.

Tuttavia, i canali di registro, gestiti da un fornitore di servizi offchain (OSP), possono ridurre i problemi di liquidità per gli utenti. Due peer connessi a un canale di registro possono creare un canale virtuale, che possono aprire e finalizzare completamente offchain, in qualsiasi momento lo desiderino.

I fornitori di servizi offchain potrebbero anche aprire canali con più peer, rendendoli utili per l'instradamento dei pagamenti. Naturalmente, gli utenti devono pagare delle commissioni agli OSP per i loro servizi, il che potrebbe essere indesiderabile per alcuni.

### Attacchi di griefing {#griefing-attacks}

Gli attacchi di griefing sono una caratteristica comune dei sistemi basati su prove di frode. Un attacco di griefing non avvantaggia direttamente l'attaccante ma causa dolore (ovvero, danno) alla vittima, da cui il nome.

La prova di frode è suscettibile agli attacchi di griefing perché la parte onesta deve rispondere a ogni controversia, anche a quelle non valide, o rischiare di perdere i propri fondi. Un partecipante malintenzionato può decidere di pubblicare ripetutamente transizioni di stato obsolete onchain, costringendo la parte onesta a rispondere con lo stato valido. Il costo di quelle transazioni onchain può sommarsi rapidamente, causando perdite alle parti oneste nel processo.

### Insiemi di partecipanti predefiniti {#predefined-participant-sets}

Per impostazione predefinita, il numero di partecipanti che compongono un canale di stato rimane fisso per tutta la sua durata. Questo perché l'aggiornamento dell'insieme dei partecipanti complicherebbe il funzionamento del canale, specialmente durante il finanziamento del canale o la risoluzione delle controversie. L'aggiunta o la rimozione di partecipanti richiederebbe anche un'attività onchain aggiuntiva, che aumenta i costi generali per gli utenti.

Sebbene ciò renda i canali di stato più facili da comprendere, limita l'utilità dei design dei canali per gli sviluppatori di applicazioni. Questo spiega in parte perché i canali di stato sono stati abbandonati a favore di altre soluzioni di ridimensionamento, come i rollup.

### Elaborazione parallela delle transazioni {#parallel-transaction-processing}

I partecipanti al canale di stato inviano aggiornamenti di stato a turni, motivo per cui funzionano meglio per le "applicazioni a turni" (ad es. una partita a scacchi a due giocatori). Ciò elimina la necessità di gestire aggiornamenti di stato simultanei e riduce il lavoro che il contratto onchain deve svolgere per punire chi pubblica aggiornamenti obsoleti. Tuttavia, un effetto collaterale di questo design è che le transazioni dipendono l'una dall'altra, aumentando la latenza e diminuendo l'esperienza utente complessiva.

Alcuni canali di stato risolvono questo problema utilizzando un design "full-duplex" che separa lo stato offchain in due stati "simplex" unidirezionali, consentendo aggiornamenti di stato simultanei. Tali design migliorano la capacità transazionale offchain e riducono i ritardi delle transazioni.

## Utilizzare i canali di stato {#use-state-channels}

Diversi progetti forniscono implementazioni di canali di stato che puoi integrare nelle tue dapp:

- [Connext](https://connext.network/)
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