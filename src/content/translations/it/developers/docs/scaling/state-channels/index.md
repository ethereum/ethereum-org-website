---
title: Canali di stato
description: Un'introduzione ai canali di stato e ai canali di pagamento come soluzione di scalabilità, attualmente utilizzata dalla comunità Ethereum.
lang: it
sidebarDepth: 3
---

I canali di stato consentono ai partecipanti di transare al di fuori della catena in sicurezza, mantenendo l'interazione con la Rete principale di Ethereum a un minimo. I pari del canale possono condurre un numero arbitrario di transazioni off-chain inviando solo due transazioni su catena per aprire e chiudere il canale. Questo consente un volume di transazioni estremamente elevato e risulta in costi minori per gli utenti.

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso le nostre pagine sul [ridimensionamento di Ethereum](/developers/docs/scaling/) e il [livello 2](/layer-2/).

## Cosa sono i canali? {#what-are-channels}

Le blockchain pubbliche, come Ethereum, affrontano sfide di scalabilità dovute alla loro architettura distribuita: le transazioni on-chain devono essere eseguite da tutti i nodi. I nodi devono poter gestire il volume di transazioni in un blocco usando hardware modesto, imponendo un limite al volume di transazioni per mantenere decentralizzata la rete. I canali della blockchain risolvono questo problema consentendo agli utenti di interagire all'esterno della catena, pur affidandosi alla sicurezza della catena principale per l'accordo finale.

I canali sono semplici protocolli peer-to-peer che consentono a due parti di effettuare molte transazioni tra loro e poi di pubblicare solo i risultati finali nella blockchain. Il canale usa la crittografia per dimostrare che i dati sommari che generano sono davvero il risultato di una serie valida di transazioni intermedie. Un contratto intelligente ["multifirma"](/developers/docs/smart-contracts/#multisig) assicura che le transazioni siano firmate dalle parti corrette.

Con i canali, i cambiamenti di stato sono eseguiti e convalidati dalle parti interessate, riducendo al minimo il calcolo sul livello di esecuzione di Ethereum. Questo riduce la congestione su Ethereum e, inoltre, aumenta le velocità di elaborazione delle transazioni per gli utenti.

Ogni canale è gestito da un [contratto intelligente multifirma](/developers/docs/smart-contracts/#multisig) eseguito su Ethereum. Per aprire un canale, i partecipanti distribuiscono il contratto del canale sulla catena e vi depositano i fondi. Le due parti firmano collettivamente un aggiornamento di stato per inizializzare lo stato del canale, dopodiché possono transare rapidamente e liberamente al di fuori della catena.

Per chiudere il canale, i partecipanti inviano l'ultimo stato concordato del canale sulla catena. Dopodiché, il contratto intelligente distribuisce i fondi bloccati in base al saldo di ogni partecipante nello stato finale del canale.

I canali peer-to-peer sono particolarmente utili per situazioni in cui alcuni partecipanti predefiniti desiderano eseguire transazioni ad alta frequenza senza incorrere in sovraccarichi visibili. I canali della blockchain rientrano in due categorie: **canali di pagamento** e **canali di stato**.

## Canali di pagamento {#payment-channels}

Un canale di pagamento è meglio descritto come un "registro bidirezionale" tenuto collettivamente da due utenti. Il saldo iniziale del registro è la somma dei depositi bloccati nel contratto on-chain durante la fase di apertura del canale. I trasferimenti del canale di pagamento sono eseguibili istantaneamente e senza coinvolgere la stessa effettiva blockchain, tranne che per l'iniziale creazione una tantum sulla catena e per un'eventuale chiusura del canale.

Gli aggiornamenti al saldo del registro (cioè, lo stato del canale di pagamento) richiedono l'approvazione di tutte le parti nel canale. Un aggiornamento del canale firmato da tutti i partecipanti al canale è considerato finalizzato, analogamente a una transazione su Ethereum.

I canali di pagamento furono tra le primissime soluzioni di ridimensionamento progettate per minimizzare l'attività costosa sulla catena delle semplici interazioni tra utenti (es., trasferimenti di ETH, scambi atomici, micro-pagamenti). I partecipanti al canale possono condurre una quantità illimitata di transazioni istantanee e senza commissioni tra loro purché la somma netta dei loro trasferimenti non superi i token depositati.

## Canali di stato {#state-channels}

Oltre a supportare i pagamenti off-chain, i canali di pagamento non si sono dimostrati utili per gestire la logica di transizione di stato generale. I canali di stato sono stati creati per risolvere questo problema e rendere i canali utili per ridimensionare il calcolo a scopo generale.

I canali di stato hanno comunque molto in comune con i canali di pagamento. Ad esempio, gli utenti interagiscono scambiandosi messaggi firmati crittograficamente (transazioni), che devono esser firmati anche dagli altri partecipanti del canale. Se un aggiornamento di stato proposto non è firmato da tutti i partecipanti, non è considerato valido.

Tuttavia, oltre a detenere i saldi degli utenti, il canale monitora anche lo stato corrente dell'archiviazione del contratto (cioè, i valori delle variabili del contratto).

Questo rende possibile l'esecuzione al di fuori della catena di un contratto intelligente tra due utenti. In questo scenario, gli aggiornamenti allo stato interno del contratto intelligente richiedono l'approvazione dei pari che hanno creato il canale.

Se da un lato questo risolve il problema di scalabilità precedentemente descritto, dall'altro ha implicazioni per la sicurezza. Su Ethereum, la validità delle transizioni di stato è imposta dal protocollo di consenso della rete. Questo rende impossibile proporre un aggiornamento non valido allo stato di un contratto intelligente o di alterarne l'esecuzione.

I canali di stato non hanno le stesse garanzie di sicurezza. In una certa misura, un canale di stato è una versione in miniatura della Rete principale. Con una serie limitata di partecipanti che impongono le regole, le possibilità di comportamenti malevoli (ad es. proporre aggiornamenti di stato non validi) aumentano. I canali di stato traggono la propria sicurezza da un sistema di arbitrato delle dispute basato sulle [prove di frode](/glossary/#fraud-proof).

## Come funzionano i canali di stato {#how-state-channels-work}

Fondamentalmente, l'attività in un canale di stato è una sessione di interazioni che coinvolge gli utenti e un sistema di blockchain. Gli utenti comunicano prevalentemente tra loro al di fuori della catena e interagiscono con la blockchain sottostante solo per aprire il canale, chiuderlo o risolvere le potenziali dispute tra partecipanti.

La seguente sezione delinea il flusso di lavoro di base di un canale di stato:

### Aprire il canale {#opening-the-channel}

Aprire un canale richiede ai partecipanti di impegnare fondi a un contratto intelligente sulla Rete Principale. Il deposito funziona anche da scheda virtuale, così gli attori partecipanti possono transare liberamente senza dover regolare immediatamente i pagamenti. Solo quando il canale è finalizzato sulla catena, le parti provvedono al regolamento reciproco e prelevano ciò che resta della loro scheda.

Questo deposito serve anche da cauzione per garantire il comportamento onesto di ogni partecipante. Se i depositanti sono ritenuti colpevoli di azioni malevole durante la fase di risoluzione delle dispute, il contratto decurta il loro deposito.

I pari del canale devono firmare uno stato iniziale, su cui concordano tutti. Questo serve da genesi del canale di stato, dopo di che gli utenti possono iniziare a transare.

### Usare il canale {#using-the-channel}

Dopo l'inizializzazione dello stato del canale, i pari interagiscono firmando le transazioni e inviandosele a vicenda per l'approvazione. I partecipanti avviano gli aggiornamenti di stato con queste transazioni e firmano gli aggiornamenti di stato altrui. Ogni transazione comprende quanto segue:

- Un **nonce**, che agisce da ID univoco per le transazioni e impedisce gli attacchi replay. Identifica inoltre l'ordine in cui si sono verificati gli aggiornamenti di stato (che è importante per la risoluzione delle dispute)

- Il vecchio stato del canale

- Il nuovo stato del canale

- La transazione che innesca la transizione di stato (ad. es. Alice invia 5 ETH a Bob)

Gli aggiornamenti di stato nel canale non sono trasmessi sulla catena come avviene normalmente quando gli utenti interagiscono sulla Rete principale, il che è in linea con l'obiettivo dei canali di stato di ridurre al minimo l'impronta sulla catena. Finché i partecipanti acconsentono agli aggiornamenti di stato, questi sono definitivi quanto la transazione di Ethereum. I partecipanti devono dipendere dal consenso della Rete principale solo se sorge una disputa.

### Chiudere il canale {#closing-the-channel}

Chiudere un canale di stato richiede l'invio dello stato finale e concordato del canale al contratto intelligente sulla catena. I dettagli a cui si fa riferimento nell'aggiornamento di stato includono il numero di mosse di ogni partecipante e un elenco delle transazioni approvate.

Dopo aver verificato che l'aggiornamento di stato sia valido (cioè, sia firmato da tutte le parti), il contratto intelligente finalizza il canale e distribuisce i fondi bloccati a seconda del risultato del canale. I pagamenti effettuati al di fuori della catena sono applicati allo stato di Ethereum e ogni partecipante riceve la propria quota rimanente di fondi bloccati.

Lo scenario sopra descritto rappresenta cosa succede nel caso favorevole. A volte, gli utenti potrebbero non riuscire a raggiungere un accordo e finalizzare il canale (il caso sfavorevole). Ognuna delle seguenti cose potrebbe applicarsi alla situazione:

- I partecipanti vanno offline e non propongono le transizioni di stato

- I partecipanti si rifiutano di co-firmare gli aggiornamenti di stato validi

- I partecipanti provano a finalizzare il canale proponendo un vecchio aggiornamento di stato al contratto on-chain

- I partecipanti propongono delle transizioni di stato non valide da far firmare agli altri

Ogni volta che il consenso tra gli attori partecipanti a un canale non viene raggiunto, l'ultima opzione è affidarsi al consenso della Rete principale per imporre lo stato finale e valido del canale. In questo caso, chiudere il canale di stato richiede la risoluzione delle dispute sulla catena.

### Risolvere le dispute {#settling-disputes}

Tipicamente, le parti in un canale acconsentono alla chiusura anticipata del canale e co-firmano l'ultima transizione di stato, che inviano al contratto intelligente. Una volta approvato l'aggiornamento sulla catena, l'esecuzione del contratto intelligente al di fuori della catena termina e i partecipanti escono dal canale col proprio denaro.

Tuttavia, una parte può inviare una richiesta sulla catena per terminare l'esecuzione del contratto intelligente e finalizzare il canale, senza attendere l'approvazione della propria controparte. Se una qualsiasi delle situazioni di rottura del consenso precedentemente descritte si verifica, ciascuna parte può innescare la chiusura del canale da parte del contratto on-chain e la distribuzione dei fondi. Questo fornisce la **mancanza di fiducia**, che assicura che le parti oneste possano prelevare i propri depositi in qualsiasi momento, indipendentemente dalle azioni delle altre parti.

Per elaborare l'uscita dal canale, l'utente deve inviare l'ultimo aggiornamento di stato valido dell'applicazione al contratto on-chain. Se questo corrisponde (cioè, porta la firma di tutte le parti), allora i fondi sono ridistribuiti in suo favore.

Esiste, tuttavia, un ritardo nell'esecuzione delle richieste d'uscita dei singoli utenti. Se la richiesta di concludere il canale è stata approvata all'unanimità, allora la transazione di uscita on-chain è immediatamente eseguita.

Il ritardo entra in gioco nelle uscite dei singoli utenti a causa della possibilità di azioni fraudolente. Ad esempio, un partecipante al canale potrebbe provare a finalizzarlo su Ethereum inviando un aggiornamento di stato precedente sulla catena.

Come contromisura, i canali di stato consentono agli utenti onesti di contestare gli aggiornamenti di stato non validi inviando l'ultimo stato valido del canale sulla catena. I canali di stato sono progettati in modo che gli aggiornamenti di stato più recenti e concordati prevalgano sugli aggiornamenti di stato precedenti.

Una volta che un pari innesca il sistema di risoluzione delle dispute on-chain, l'altra parte deve rispondere entro un certo limite di tempo (detto finestra di contestazione). Questo consente agli utenti di contestare la transazione di uscita, specialmente se l'altra parte sta applicando un aggiornamento obsoleto.

Indipendentemente dal caso, gli utenti del canale hanno sempre forti garanzie di finalità: se la transizione di stato in loro possesso è stata firmata da tutti gli utenti ed è l'aggiornamento più recente, allora è di finalità pari a una transazione regolare on-chain. Devono comunque contestare l'altra parte sulla catena, ma il solo risultato possibile è finalizzare l'ultimo stato valido, che posseggono.

### Come interagiscono i canali di stato con Ethereum? {#how-do-state-channels-interact-with-ethereum}

Sebbene esistano come protocolli al di fuori della catena, i canali di stato hanno un componente sulla catena: il contratto intelligente distribuito su Ethereum aprendo il canale. Questo contratto controlla le risorse depositate nel canale, verifica gli aggiornamenti di stato e arbitra le dispute tra i partecipanti.

I canali di stato non pubblicano i dati delle transazioni o gli impegni di stato nella Rete principale, a differenza delle soluzioni di ridimensionamento del [livello 2](/layer-2/). Tuttavia, sono più connessi alla Rete principale rispetto, ad esempio, alle [sidechain](/developers/docs/scaling/sidechains/), il che le rende in qualche modo più sicure.

I canali di stato si affidano al protocollo principale di Ethereum per quanto segue:

#### 1. Liveness {#liveness}

Il contratto on-chain distribuito all'apertura del canale è responsabile della funzionalità del canale. Se il contratto è in esecuzione su Ethereum, allora il canale è sempre disponibile all'uso. Viceversa, una catena secondaria può sempre fallire, anche se la Rete Principale è operativa, mettendo a rischio i fondi dell'utente.

#### 2. Sicurezza {#security}

In una certa misura, i canali di stato si affidano a Ethereum per fornire sicurezza e proteggere gli utenti dai pari malevoli. Come discusso in seguito, i canali usano un meccanismo di prova di frode che consente agli utenti di sfidare i tentativi di finalizzare il canale con un aggiornamento non valido od obsoleto.

In questo caso, la parte onesta fornisce l'ultimo stato del canale valido come una prova di frode al contratto on-chain per la verifica. Le prove di frode consentono alle parti reciprocamente diffidenti di condurre le transazioni off-chain senza rischiare i propri fondi nel processo.

#### 3. Finalità {#finality}

Gli aggiornamenti di stato firmati collettivamente dagli utenti del canale sono considerati tanto buoni quanto le transazioni on-chain. Tuttavia, tutta l'attività nel canale raggiunge la vera finalità solo quando il canale è chiuso su Ethereum.

Nel caso ottimista, entrambe le parti possono cooperare e firmare l'aggiornamento di stato finale e inviarlo sulla catena per chiudere il canale, dopodiché i fondi sono distribuiti a seconda dello stato finale del canale. Nel caso pessimistico, quando qualcuno prova a barare pubblicando un aggiornamento di stato errato sulla catena, la sua transazione non è finalizzata fino alla scadenza della finestra di sfida.

## Canali di stato virtuali {#virtual-state-channels}

L'ingenua implementazione di un canale di stato sarebbe distribuire un nuovo contratto quando due utenti desiderano eseguire un'applicazione al di fuori della catena. Questo non solo è impossibile, ma nega anche l'efficienza di costo dei canali di stato (i costi della transazione on-chain possono sommarsi rapidamente).

Per risolvere questo problema, sono stati creati i "canali virtuali". A differenza dei canali regolari che richiedono alle transazioni on-chain di aprirli e terminarli, un canale virtuale è apribile, eseguibile e finalizzabile senza interagire con la catena principale. È persino possibile risolvere le controversie al di fuori della catena usando questo metodo.

Questo sistema si affida all'esistenza dei così detti "canali libro mastro", finanziati sulla catena. I canali virtuali tra due parti possono basarsi su un canale libro mastro esistente, con i proprietari dello stesso che servono da intermediari.

Gli utenti in ogni canale virtuale interagiscono tramite l'istanza di un nuovo contratto, col canale del libro mastro capace di supportare diverse istanze del contratto. Lo stato del canale del libro mastro contiene inoltre più di uno stato d'archiviazione del contratto, consentendo l'esecuzione parallela delle applicazioni al di fuori della catena tra diversi utenti.

Proprio come nei canali regolari, gli utenti scambiano aggiornamenti di stato per far progredire la macchina di stato. Tranne che per quando sorge una controversia, l'intermediario dev'esser contattato solo aprendo o terminando il canale.

### Canali di pagamento virtuali {#virtual-payment-channels}

I canali di pagamento virtuali si basano sulla stessa idea dei canali di stato virtuali: i partecipanti connessi alla stessa rete possono passare i messaggi senza dover aprire un nuovo canale sulla catena. Nei canali di pagamento virtuali, i trasferimenti di valore sono indirizzati per uno o più intermediari, con la garanzia che solo il destinatario inteso possa ricevere i fondi trasferiti.

## Applicazioni dei canali di stato {#applications-of-state-channels}

### Pagamenti {#payments}

I primi canali della blockchain erano semplici protocolli che consentivano a due partecipanti di condurre trasferimenti rapidi e a commissioni ridotte al di fuori della catena, senza dover pagare elevate commissioni di transazione sulla Rete Principale. Oggi, i canali di pagamento sono comunque utili per le applicazioni progettate per lo scambio e deposito di ether e token.

I pagamenti basati sul canale hanno i seguenti vantaggi:

1. **Volume**: La quantità di transazioni off-chain per canale non è connessa al volume di Ethereum, influenzato da vari fattori, specialmente le dimensioni e il tempo del blocco. Eseguendo le transazioni al di fuori della catena, i canali della blockchain possono raggiungere volumi maggiori.

2. **Privacy**: Poiché i canali esistono al di fuori della catena, i dettagli delle interazioni tra partecipanti non sono registrate sulla blockchain pubblica di Ethereum. Gli utenti del canale devono interagire sulla catena solo fondando e chiudendo i canali o risolvendo le controversie. Dunque, i canali sono utili per gli individui che desiderano transazioni più private.

3. **Latenza**: Le transazioni off-chain condotte tra i partecipanti del canale sono risolvibili istantaneamente, se ambe le parti cooperano, riducendo i ritardi. In contrasto, inviare una transazione sulla Rete Principale richiede che i nodi elaborino la transazione, producano un nuovo blocco con la transazione e raggiungano il consenso. Gli utenti potrebbero anche dover attendere più conferme del blocco prima di considerare finalizzata una transazione.

4. **Costo**: i canali di stato sono particolarmente utili nelle situazioni in cui, una serie di partecipanti, si scambierà numerosi aggiornamenti di stato su un lungo periodo. I soli costi sostenuti sono l'apertura e la chiusura del contratto intelligente del canale di stato; ogni cambiamento di stato tra l'apertura e chiusura del canale sarà più economico dell'ultimo, poiché il costo dell'accordo è distribuito di conseguenza.

Implementare i canali di stato su soluzioni di livello 2, come i [rollup](/developers/docs/scaling/#rollups), potrebbe renderli persino più attraenti per i pagamenti. Sebbene i canali offrano pagamenti economici, i costi di configurazione del contratto su catena sulla Rete Principale durante la fase d'apertura possono divenire costosi, specialmente ai picchi delle commissioni sul gas. I rollup basati su Ethereum offrono [commissioni di transazione inferiori](https://l2fees.info/) e possono ridurre il sovraccarico per i partecipanti del canale per aver ridotto le commissioni di configurazione.

### Microtransazioni {#microtransactions}

Le microtransazioni sono pagamenti di basso valore (es., inferiori a una frazione di dollaro), che le aziende non possono elaborare senza incorrere in perdite. Queste entità devono pagare i fornitori del servizio di pagamento, cosa che non possono fare se il margine sui pagamenti del cliente è troppo basso per ottenere un profitto.

I canali di pagamento risolvono questo problema riducendo il sovraccarico associato alle microtransazioni. Ad esempio, un Fornitore di Servizi Internet (ISP) può aprire un canale di pagamento con un cliente, consentendogli di trasmettere piccoli pagamenti ogni volta che usa il servizio.

Oltre al costo d'apertura e chiusura del canale, i partecipanti non incorrono in ulteriori costi sulle microtransazioni (nessuna commissione sul gas). Questa è una situazione vantaggiosa per tutti, poiché i clienti hanno maggiore flessibilità in quanto pagano per i servizi e le aziende non perdono sulle microtransazioni profittevoli.

### Applicazioni decentralizzate {#decentralized-applications}

Come i canali di pagamento, i canali di stato possono effettuare pagamenti condizionali secondo gli stati finali della macchina di stato. I canali di stato possono anche supportare la logica di transizione di stato arbitraria, rendendoli utili per eseguire app generiche al di fuori della catena.

I canali di stato sono spesso limitati ad applicazioni semplici basate sui turni, dato che ciò semplifica la gestione dei fondi impegnati al contratto sulla catena. Inoltre, con un numero limitato di parti che aggiornano lo stato dell'applicazione off-chain a intervalli, punire il comportamento disonesto è relativamente semplice.

L'efficienza dell'applicazione di un canale di stato dipende anche dal suo design. Ad esempio, uno sviluppatore potrebbe distribuire il contratto del canale dell'app sulla catena una volta e consentire agli altri giocatori di riutilizzarla senza dover andare sulla catena. In questo caso, il canale iniziale dell'app serve da canale del libro mastro, supportando diversi canali virtuali, ognuno operante una nuova istanza del contratto intelligente dell'app al di fuori della catena.

Un potenziale caso d'uso per le applicazioni del canale di stato sono i giochi semplici a due giocatori, in cui i fondi sono distribuiti a seconda del risultato della partita. Qui, il beneficio è che i giocatori non si fidano l'uno dell'altro (mancanza di fiducia) e che, il contratto on-chain, non i giocatori, controllino l'allocazione dei fondi e la regolazione delle controversie (decentralizzazione).

Altri possibili casi d'uso per le app del canale di stato includono la proprietà del nome dell'ENS, libri mastri di NFT e molto altro.

### Trasferimenti atomici {#atomic-transfers}

I primi canali di pagamento furono limitati ai trasferimenti tra due parti, limitandone l'utilizzabilità. Tuttavia, l'introduzione dei canali virtuali ha consentito agli individui di indirizzare i trasferimenti per gli intermediari (cioè, più canali p2p) senza dover aprire un nuovo canale sulla catena.

Comunemente descritti come "trasferimenti multi-salto", i pagamenti instradati sono atomici (cioè, tutte le parti della transazione riescono falliscono del tutto). I trasferimenti atomici usano gli [Hashed Timelock Contracts (HTLC)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) per assicurare che il pagamento sia rilasciato solo se certe condizioni sono soddisfatte, riducendo dunque il rischio della controparte.

## Svantaggi dell'uso dei canali di stato {#drawbacks-of-state-channels}

### Presupposti di liveness {#liveness-assumptions}

Per assicurare l'efficienza, i canali di stato fissano dei limiti di tempo sull'abilità dei partecipanti del canale di rispondere alle dispute. Questa regola presuppone che i pari saranno sempre online per monitorare l'attività del canale e impugnare le contestazioni quando necessario.

In realtà, gli utenti possono andare offline per motivi che esulano dal loro controllo (ad es. connessione a Internet scadente, guasto meccanico, etc.). Se un utente onesto va offline, un pari malevolo può sfruttare la situazione presentando vecchi stati intermedi al contratto dell'arbitro e rubando i fondi impegnati.

Alcuni canali usano delle "torri di controllo", entità responsabili di osservare gli eventi di disputa on-chain per conto di altri e di intraprendere le azioni necessarie, come avvisare le parti coinvolte. Tuttavia, questo può aggiungersi ai costi dell'uso di un canale di stato.

### Non disponibilità dei dati {#data-unavailability}

Come spiegato in precedenza, contestare una disputa non valida richiede la presentazione dell'ultimo stato valido del canale di stato. Questa è un'altra regola basata sul presupposto che gli utenti abbiano accesso all'ultimo stato del canale.

Sebbene sia ragionevole aspettarsi che gli utenti del canale memorizzino copie dello stato dell'applicazione off-chain, questi dati potrebbero andar perduti a causa di errori o guasti meccanici. Se l'utente non ha eseguito il backup dei dati, può solo sperare che l'altra parte non finalizzi una richiesta di uscita non valida usando le vecchie transizioni di stato in suo possesso.

Gli utenti di Ethereum non devono affrontare questo problema poiché la rete impone le regole sulla disponibilità dei dati. I dati della transazione sono memorizzati e propagati da tutti i nodi e scaricabili dagli utenti se e quando necessario.

### Problemi di liquidità {#liquidity-issues}

Per stabilire un canale della blockchain, i partecipanti devono bloccare i fondi in un contratto intelligente sulla catena per l'intero ciclo di vita del canale. Questo riduce la liquidità degli utenti del canale e, inoltre, limita i canali a coloro che possono permettersi di tenere i fondi bloccati sulla Rete principale.

Tuttavia, i canali di registro, gestiti da un fornitore di servizi off-chain (OSP), possono ridurre i problemi di liquidità per gli utenti. Due pari connessi a un canale di registro possono creare un canale virtuale, che possono aprire e finalizzare completamente al di fuori della catena, in qualsiasi momento.

I fornitori di servizi off-chain potrebbero anche aprire i canali con più pari, rendendoli utili per instradare i pagamenti. Ovviamente, gli utenti devono pagare delle commissioni agli OSP per i loro servizi, il che potrebbe essere sgradito ad alcuni.

### Attacchi di griefing {#griefing-attacks}

Gli attacchi di griefing sono una caratteristica comune dei sistemi basati sulla prova di frode. Un attacco di griefing non dà direttamente benefici all'autore ma causa sofferenza ( , cioè danni) alla vittima, da cui il nome.

La prova di frode è suscettibile agli attacchi di griefing perché la parte onesta deve rispondere a ogni disputa, anche quelle non valide, o rischiare di perdere i propri fondi. Un partecipante malevolo può decidere di pubblicare ripetutamente le transizioni di stato obsolete sulla catena, obbligando la parte onesta a rispondere con lo stato valido. Il costo di queste transazioni on-chain può aumentare rapidamente, causando perdite alle parti oneste nel processo.

### Insieme predefinito di partecipanti {#predefined-participant-sets}

Fin dalla progettazione, il numero di partecipanti compresi in un canale di stato rimane fisso per tutto il suo ciclo di vita. Questo perché aggiornare l'insieme di partecipanti complicherebbe il funzionamento del canale, specialmente quando si finanzia il canale o si risolvono le dispute. Aggiungere o rimuovere partecipanti richiederebbe inoltre un'attività aggiuntiva sulla catena, che aumenterebbe il sovraccarico per gli utenti.

Pur rendendo più facile ragionare sui canali di stato, questo limita l'utilità dei design dei canali agli sviluppatori di applicazioni. Questo spiega parzialmente perché i canali di stato siano stati abbandonati in favore di altre soluzioni di ridimensionamento, come i rollup.

### Elaborazione in parallelo delle transazioni {#parallel-transaction-processing}

I partecipanti al canale di stato inviano gli aggiornamenti di stato a turno, il che spiega perché funzionino al meglio per le "applicazioni basate su turni" (ad es. una partita di scacchi con due giocatori). Questo elimina il bisogno di gestire gli aggiornamenti di stato simultanei e riduce il lavoro che il contratto on-chain deve compiere per punire chi pubblica aggiornamenti obsoleti. Tuttavia, un effetto collaterale di questa progettazione è che le transazioni dipendono l'una dall'altra, aumentando la latenza e riducendo l'esperienza utente generale.

Alcuni canali di stato risolvono questo problema usando un design "full-duplex", che separa lo stato off-chain in due stati "simplex" unidirezionali, consentendo aggiornamenti di stato contemporanei. Tali design migliorano il volume off-chain e riducono i ritardi della transazione.

## Usare i canali di stato {#use-state-channels}

Diversi progetti forniscono implementazioni dei canali di stato che puoi integrare nelle tue dapp:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Letture consigliate {#further-reading}

**State channels**

- [Comprendere le soluzioni di scalabilità di livello 2 di Ethereum: canali di stato, plasma e Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 febbraio 2018_
- [Canali di stato: una spiegazione](https://www.jeffcoleman.ca/state-channels/) _6 novembre 2015 - Jeff Coleman_
- [Fondamenti dei canali di stato](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Canali di stato della blockchain: stato dell'arte](https://ieeexplore.ieee.org/document/9627997)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_
