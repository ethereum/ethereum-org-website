---
title: "EIP-7805: Elenchi di inclusione applicati tramite fork-choice (FOCIL)"
description: "I ricercatori di Ethereum Thomas Thiery e Julian Ma illustrano l'EIP-7805 (FOCIL), che utilizza elenchi di inclusione locali aggregati per garantire che le transazioni valide non possano essere censurate dai costruttori di blocchi."
lang: it
youtubeId: "cUGyLx-mf6I"
uploadDate: 2025-02-12
duration: "1:00:30"
educationLevel: advanced
topic:
  - "privacy"
  - "network-upgrades"
  - "roadmap-and-priorities"
format: presentation
author: ECH Institute
breadcrumb: "EIP-7805 (FOCIL)"
---

Episodio 141 di **PEEPanEIP** degli Ethereum Cat Herders. La presentatrice Pooja Ranjan è affiancata da **Thomas Thiery** e **Julian Ma**, ricercatori del Robust Incentives Group presso la Fondazione Ethereum e coautori dell'[EIP-7805](https://eips.ethereum.org/EIPS/eip-7805), per spiegare gli elenchi di inclusione applicati tramite fork-choice (FOCIL): perché Ethereum ha bisogno di resistenza alla censura a livello di protocollo, come funziona il meccanismo e a che punto è l'implementazione.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=cUGyLx-mf6I) pubblicata dagli Ethereum Cat Herders. È stata leggermente modificata per facilitarne la lettura.*

### Introduzione (0:35) {#introduction-035}

**Pooja Ranjan:** Ciao e benvenuti a PEEPanEIP, l'unico e inimitabile show in cui esploriamo in dettaglio le Proposte di Miglioramento di Ethereum (EIP) e analizziamo il loro impatto sull'ecosistema. Questo è l'episodio 141, offerto dagli Ethereum Cat Herders. Sono la vostra presentatrice, Pooja Ranjan, e oggi parliamo dell'EIP-7805, Fork-choice enforced Inclusion Lists (Liste di inclusione applicate tramite fork-choice).

Documentata a novembre 2024, l'EIP-7805 è una proposta core del percorso standard attualmente in stato di bozza. Questa proposta mira a consentire a un comitato di validatori di forzare l'inclusione di un set di transazioni in ogni blocco. Co-scritta da Thomas Thiery, Francesco D'Amato, Julian Ma, Barnabé Monnot, Terence Tsao, Jacob Kaufmann e Jihoon Song, la proposta è in discussione attiva per un futuro aggiornamento.

In questo episodio, esploreremo i dettagli dell'EIP-7805, le sue implicazioni e il suo potenziale impatto sull'ecosistema di Ethereum. Per parlare più approfonditamente della proposta, siamo in compagnia di Thomas Thiery e Julian Ma. Benvenuti a PEEPanEIP.

**Thomas Thiery:** Grazie per averci invitato.

**Julian Ma:** Sì, grazie mille per averci invitato.

**Pooja Ranjan:** Siamo entusiasti di scoprire la panoramica della proposta, a che punto si trova oggi e quanto presto potremo vederla sulla Mainnet di Ethereum. Ma prima di iniziare, la nostra community ama conoscere i ricercatori e gli sviluppatori dietro a questo lavoro. Potreste condividere qualcosa su di voi, sul progetto in cui siete attualmente coinvolti e sul vostro percorso all'interno dell'ecosistema di Ethereum?

### Presentazione degli ospiti (2:14) {#guest-introductions-214}

**Julian Ma:** Certo, posso iniziare io. Sono Julian, un ricercatore del Robust Incentives Group, proprio come Thomas, presso la Fondazione Ethereum. Il Robust Incentives Group si occupa dell'economia del protocollo in senso molto ampio. Alcuni di noi hanno esaminato i meccanismi delle commissioni di transazione, come l'EIP-1559, e altri hanno analizzato gli attacchi al livello di consenso, per lo più quelli motivati da incentivi economici.

Per quanto mi riguarda, ho iniziato con un tirocinio studiando i derivati della commissione di base, e in seguito sono entrato a tempo pieno. Ho lavorato principalmente sulla separazione proponente-costruttore (PBS) e su argomenti legati al MEV, e ora mi sto concentrando sulle liste di inclusione tramite FOCIL con questo EIP, e guardo con interesse alla separazione attestatore-proponente. Direi che la cosa che mi entusiasma di più è portare la ricerca in produzione attraverso questo percorso che parte da un lavoro più teorico per arrivare a un EIP che, si spera, possa essere proposto e implementato all'interno di Ethereum.

**Thomas Thiery:** Sono Thomas. Anche io lavoro alla Fondazione Ethereum nel Robust Incentives Group, facendo ricerca. Il mio background è in realtà un dottorato in neuroscienze, che era molto diverso. Ma mi sono incuriosito riguardo alle blockchain e ai sistemi distribuiti, volevo provare qualcosa di un po' diverso e sono entrato in un'azienda di dati cripto chiamata Dune. Sono rimasto lì per un po', ma poi mi è mancato fare ricerca e ho avuto la fortuna di potermi unire alla EF e al Robust Incentives Group, il che è stato fantastico finora.

Ho lavorato su argomenti simili. Il MEV era un tema piuttosto importante quando sono entrato. Curiosamente, i miei primissimi post di ricerca erano molto brevi, ma riguardavano i ritardi di inclusione e la resistenza alla censura. Non ci sono andato a fondo fino a tempi più recenti. Negli ultimi sei mesi o un anno sono stato più attivo sul fronte della resistenza alla censura e dell'inclusione. È stato davvero bello poter partire da idee di ricerca, migliorare idee precedenti che erano molto interessanti ma non includevano alcuni dei dettagli di cui parleremo, elaborare una proposta e ora avere implementazioni e devnet che la maggior parte delle persone con cui ho parlato ritiene sarebbero un'ottima aggiunta a Ethereum.

**Pooja Ranjan:** Grazie per aver condiviso. È sempre stimolante conoscere il background degli sviluppatori. È interessante vedere che provengono da settori diversi e alla fine contribuiscono all'ecosistema di Ethereum. Mi risulta che oggi abbiamo una presentazione qui. Quindi, senza ulteriori indugi, diamo un'occhiata.

### Presentazione: obiettivi di FOCIL (5:16) {#presentation-goals-of-focil-516}

**Julian Ma:** Perfetto, grazie mille. Vorrei iniziare con una breve presentazione su come funziona l'EIP-7805, o FOCIL, e sul perché esattamente vogliamo implementarlo. Ha lo scopo di avviare la conversazione, quindi non scenderà troppo nei dettagli, per lasciare spazio alla discussione in seguito.

L'obiettivo principale di FOCIL è aumentare la neutralità credibile di Ethereum. FOCIL lo fa rimuovendo il monopolio di inclusione che attualmente un singolo proponente o costruttore di blocchi detiene all'interno di uno slot. Invece, FOCIL consente a più validatori di contribuire alla costruzione di un blocco includendo transazioni in ogni blocco.

L'obiettivo di livello superiore è perseguire una proprietà che chiamiamo neutralità della catena, il che significa che qualsiasi transazione in sospeso che paga una commissione dovrebbe essere inclusa se è disponibile e se c'è spazio per includerla onchain. Riteniamo che se questa proprietà è sufficientemente soddisfatta, allora aumentiamo la neutralità credibile di Ethereum.

### Perché abbiamo bisogno di FOCIL, e perché ora? (6:09) {#why-do-we-need-focil-and-why-now-609}

**Julian Ma:** Perché abbiamo bisogno di qualcosa del genere? Attualmente quasi tutti i validatori esternalizzano la costruzione dei blocchi a MEV-Boost, che è un mercato fuori dal protocollo in cui i costruttori fanno offerte per i diritti di costruzione dei blocchi. In questo mercato ci sono solo due entità che dominano davvero, e questo significa che il 90% dei blocchi viene costruito da sole due entità.

Vediamo qui che Ethereum non può più trarre la sua neutralità credibile dalla costruzione locale dei blocchi. Un tempo lo faceva. È iniziato avendo proponenti situati in tutto il mondo, ognuno dei quali costruiva i propri blocchi localmente, il che significava che tutte le transazioni venivano incluse. Ma ora che la costruzione dei blocchi è esternalizzata a queste entità sofisticate, questo non è più sufficiente. Quindi è necessario implementare misure anti-censura più robuste, e FOCIL è il modo migliore conosciuto per farlo.

Perché dovremmo implementare FOCIL ora? Si potrebbe pensare che i costruttori non stiano censurando molto in questo momento, ma potrebbero iniziare a farlo in qualsiasi momento, sia per ragioni normative che economiche. E la censura economica è sicuramente qualcosa da non sottovalutare. È anche positivo introdurre FOCIL quando c'è relativamente poca censura, perché in questo modo lo si introduce come base e come impostazione predefinita. Tutti i validatori creano liste di inclusione indipendentemente dalla loro giurisdizione o dagli incentivi economici, e ciò causa poca instabilità del mercato. Considerando che, se si dovesse introdurre FOCIL quando tutti i costruttori stanno censurando, forse sarebbe più difficile.

Inoltre, i based rollup stanno diventando sempre più diffusi di questi tempi, e graveranno sulla costruzione dei blocchi di Ethereum. Se vogliamo fornire il sequenziamento che ha Ethereum, è necessario avere una neutralità credibile qui tramite FOCIL.

E potenzialmente FOCIL potrebbe aiutare con la scalabilità, a seconda di a chi lo si chieda. Oggi Ethereum trae ancora la sua resistenza alla censura dalla costruzione locale dei blocchi. Se Ethereum può trarre la resistenza alla censura da altrove, per esempio tramite FOCIL, allora forse possiamo aumentare le aspettative che abbiamo sui costruttori di blocchi e consentire, per esempio, più blob. Ma potenzialmente questo potrebbe essere fatto anche senza FOCIL. Pertanto, è stato proposto di implementare FOCIL in Fusaka.

### Come funziona FOCIL (8:10) {#how-focil-works-810}

**Julian Ma:** Ora vi illustrerò come funziona FOCIL. Inizieremo dalle basi e procederemo passo dopo passo fino a ottenere il meccanismo completo, per poi esplorare come questo meccanismo completo soddisfi le proprietà che desideriamo.

L'idea di base di una lista di inclusione, che è stata proposta in precedenza anche da Mike Neuder, è che ci sia una lista di transazioni che vincola il blocco in qualche modo. Quindi c'è, ad esempio, una lista di inclusione che include le transazioni A e B, è firmata da qualcuno che è riconosciuto dal protocollo, e poi queste transazioni devono essere incluse in un blocco. FOCIL non cambia questo aspetto. Ci si basa sopra, e riguarda maggiormente chi crea questa lista e come viene fatta rispettare.

Quindi, chi crea questa lista? Questo è il primo passo di come funziona il protocollo FOCIL. In ogni slot, 16 validatori vengono selezionati come membri del comitato della lista di inclusione. Ciascuno di questi membri del comitato osserva la mempool e costruisce la propria lista di inclusione. Una lista di inclusione dovrebbe essere di circa 8 kilobyte, o circa 20 transazioni medie, il che significa circa 320 transazioni medie in totale.

Il secondo passo è la distribuzione di queste liste di inclusione. I membri del comitato della lista di inclusione distribuiscono le loro liste di inclusione sul topic globale, e non le includono loro stessi in un blocco. Devono farlo prima del secondo 9 dello slot, momento in cui gli attestatori congelano la loro visione delle liste di inclusione locali. Come vedremo nel prossimo passo, gli attestatori sono coloro che fanno effettivamente rispettare queste liste di inclusione, come suggerisce il nome: liste di inclusione fatte rispettare dalla scelta del fork (fork-choice enforced inclusion lists). Congelano la loro visione di quali liste di inclusione faranno rispettare al secondo 9, e questo previene gli attacchi di tipo split-view. Il produttore del blocco ha ancora qualche secondo in più per osservare le liste di inclusione e per assicurarsi di non essere influenzato negativamente dalla mancanza di alcuna lista di inclusione, quindi il produttore del blocco non corre alcun rischio in questo scenario.

Passiamo quindi al passo finale, che è l'applicazione. Come ho detto, l'applicazione avviene tramite la scelta del fork. Gli attestatori voteranno per un blocco solo se soddisfa la condizione della lista di inclusione. Lo fanno osservando le liste di inclusione che sono state inviate sul topic globale, creando una lista aggregata di transazioni che avevano visto in queste liste di inclusione, e poi controllando se tutte queste transazioni sono nel blocco. Se questo controllo viene superato, votano per il blocco. Potrebbe anche darsi il caso che non tutte le transazioni delle liste di inclusione siano nel blocco, ma che il blocco sia pieno. In tal caso, gli attestatori votano ugualmente per il blocco. Quindi, a meno che il blocco non contenga le transazioni e non sia pieno, gli attestatori votano per il blocco.

Per ricapitolare l'intero meccanismo: in ogni slot, 16 membri del comitato vengono selezionati come membri del comitato della lista di inclusione. Osservano la mempool e costruiscono oggetti lista di inclusione che distribuiscono sul topic globale prima di una scadenza, in questo caso il secondo 9. Il costruttore osserva queste liste di inclusione e include tutte le transazioni che ha visto nel suo blocco. Gli attestatori controllano quindi se tutte le transazioni che avevano visto prima del secondo 9 nelle liste di inclusione sono effettivamente nel blocco. Se questo controllo viene superato, votano per il blocco e passiamo allo slot successivo, dove si ripete la stessa configurazione.

### IL Boost e uncrowdability (11:07) {#il-boost-and-uncrowdability-1107}

**Julian Ma:** Una delle grandi preoccupazioni riguardo alle liste di inclusione, espressa per la precedente EIP da Mike e durante lo sviluppo successivo, è l'"IL Boost", o uncrowdability. Si riferisce al fatto che i proponenti della lista di inclusione potrebbero voler vendere i propri diritti per costruire una lista di inclusione. È una preoccupazione molto logica, perché vediamo che questo accade con la costruzione dei blocchi: vendere questo diritto porta a un mercato centralizzato di costruttori sofisticati.

Sosteniamo che FOCIL sia robusto contro questi mercati simili a MEV-Boost, o IL Boost come sono colloquialmente noti, per via delle seguenti proprietà. FOCIL non garantisce alcun ordinamento delle transazioni. Indipendentemente da dove inserisci la tua transazione nella tua lista di inclusione, verrà ordinata nel modo che il costruttore di blocchi riterrà più opportuno. Se, ad esempio, includessi una transazione di arbitraggio nella lista, è altamente improbabile che il costruttore metta la tua transazione di arbitraggio in cima al blocco in modo che esegua effettivamente l'arbitraggio. Invece, il costruttore probabilmente lo farà da solo.

Inoltre, il flusso di ordini privato non è possibile. Queste liste di inclusione sono distribuite sul topic globale, quindi le tue transazioni sono pubbliche prima che il costruttore costruisca il blocco. Non è possibile far entrare un flusso di ordini privato nel blocco tramite una lista di inclusione.

In terzo luogo, ci sono più proponenti della lista di inclusione per slot. Anche se ci fosse qualcosa di prezioso da vendere, tutti i 16 membri del comitato della lista di inclusione hanno la stessa possibilità di costruire questa lista di inclusione, quindi la competizione tra questi proponenti della lista di inclusione spingerebbe il valore a zero.

E infine, queste liste di inclusione vengono create 3 secondi prima che il produttore del blocco agisca. Ci sono 3 secondi di informazioni extra, che di solito sono estremamente rilevanti per le transazioni di tipo MEV, che arrivano dopo che la lista di inclusione è stata confermata e prima che il produttore del blocco agisca, il che significa che c'è pochissimo vantaggio informativo. In realtà, c'è uno svantaggio informativo per coloro che cercano di utilizzare le liste di inclusione come veicolo per la MEV.

Per questi motivi, riteniamo che nessun singolo proponente della lista di inclusione abbia potere di inclusione, ordinamento o esclusione, che è la definizione fondamentale di MEV. Pertanto, le liste di inclusione non dovrebbero essere soggette alla MEV.

### Riepilogo della presentazione (13:09) {#summary-of-the-presentation-1309}

**Julian Ma:** Per riassumere questa rapida presentazione: FOCIL consente a più validatori di contribuire alla costruzione del blocco, prevenendo il monopolio di inclusione di un singolo proponente e rafforzando la neutralità credibile di Ethereum. Riteniamo che sia necessario implementare FOCIL ora perché attualmente ci sono solo due costruttori dominanti che potrebbero iniziare a censurare in qualsiasi momento, e questo potrebbe avvenire per ragioni economiche da cui potrebbero trarre vantaggio. La costruzione dei blocchi potrebbe assumere un peso maggiore perché i based rollup vorranno utilizzare le proprietà di sequenziamento di Ethereum. FOCIL verrà lanciato in modo molto più fluido quando ci sono poche parti che censurano: in primo luogo, perché significa che è la prassi predefinita per i validatori costruire liste di inclusione e, in secondo luogo, perché significa che c'è meno instabilità di mercato tra i costruttori che censurano e quelli che non lo fanno. E infine, FOCIL potrebbe potenzialmente aiutare con la scalabilità, che è forse un argomento che possiamo approfondire maggiormente.

Grazie per il tempo concesso per questa piccola presentazione. Volevo solo mostrare il codice QR, che rimanda all'EIP, per le persone interessate.

**Pooja Ranjan:** Grazie mille per questa rapida presentazione e per la panoramica della proposta.

### Q&A: in che modo l'EIP-7805 differisce dall'EIP-7547? (14:17) {#qa-how-does-eip-7805-differ-from-eip-7547-1417}

**Pooja Ranjan:** Vorrei iniziare la sessione di Q&A con la primissima domanda, riguardante la proposta precedente che è stata menzionata anche nella vostra presentazione: la proposta 7547, le liste di inclusione, di Mike Neuder. Voglio capire la differenza fondamentale tra quella proposta e FOCIL che abbiamo con il 7805. Nella vostra presentazione avete accennato in parte a IL Boost e alla non affollabilità (uncrowdability). Vi andrebbe di spiegarlo un po' più nel dettaglio?

**Julian Ma:** Forse Thomas è la persona più adatta per rispondere su come il 7805 differisca dal 7547, ma posso dire qualcosa al riguardo. Innanzitutto, FOCIL riguarda lo stesso slot, mentre il 7547 riguardava lo slot successivo. La proprietà dello stesso slot rende alcune cose più semplici, perché significa che la lista di inclusione non deve essere archiviata onchain.

Per quanto riguarda la proprietà di non affollabilità, questa è molto interessante e sottile. All'interno del 7547, che è stata un'ottima proposta su cui si basa la nostra, la lista di inclusione viene aggiunta incondizionatamente in fondo al blocco ed è creata da una sola persona. Questo presenta alcune proprietà diverse rispetto alla nostra. Innanzitutto, le transazioni sono ordinate. Potrebbe darsi che in futuro sia molto prezioso avere un arbitraggio in fondo al blocco e, di fatto, alcune delle ricerche di Thomas hanno evidenziato che questo potrebbe potenzialmente essere un posto di valore. Avere i diritti per costruire la lista di inclusione significa essere l'ultima persona ad agire nel blocco, e in alcuni casi questo potrebbe avere un certo valore. In secondo luogo, è creata da una singola persona, quindi non c'è questo effetto di competizione tra i membri del comitato della lista di inclusione. Un comitato di una sola persona ha il pieno diritto di includere transazioni in fondo al blocco, il che potrebbe renderlo altrettanto prezioso. In terzo luogo, c'è questa proprietà incondizionata, il che significa che, indipendentemente da ciò che fa il produttore del blocco, la tua transazione verrà comunque inclusa onchain. Quindi ha alcune garanzie extra, oltre al minimo necessario per l'inclusione, che potrebbero renderla preziosa in una certa misura.

**Thomas Thiery:** Una grande differenza è anche il numero di proponenti della lista di inclusione che abbiamo. Nella proposta precedente, c'era un meccanismo per cui il proponente dello slot n crea la lista di inclusione che il proponente dello slot n+1 deve applicare. Le due cose importanti qui sono: primo, c'è un ritardo di uno slot, quindi le transazioni nella lista di inclusione devono essere incluse solo nello slot successivo dal proponente successivo. E c'è solo un proponente che crea effettivamente la lista di inclusione. Con FOCIL ne abbiamo 16. Fa un'enorme differenza, perché ora abbiamo bisogno che solo uno dei 16 membri del comitato IL sia onesto affinché l'intero meccanismo funzioni come previsto. Moltiplica le possibilità di avere effettivamente un buon meccanismo resistente alla censura, mentre prima ci si affidava a una singola parte.

E poi alcuni dettagli più tecnici: c'erano alcune incompatibilità con l'astrazione dell'account, ed era difficile gestire l'equivocazione delle IL, ovvero qualcuno che invia due liste di inclusione diverse. L'equivocazione dei blocchi è una cosa nota ed è penalizzata dal protocollo, ma poiché nella proposta precedente tutto andava onchain, si doveva anche avere a che fare con strani casi limite, e non era molto facile gestirli. Con FOCIL, le liste di inclusione non vanno onchain. Vengono semplicemente trasmesse sulla rete P2P del livello di consenso. È un po' tecnico, ma fa una grande differenza nell'affrontare questi casi limite causati dall'astrazione dell'account, o attacchi in cui si divide la rete in due visioni con l'equivocazione delle IL.

**Pooja Ranjan:** Grazie mille. Per le persone che volessero saperne di più sulla proposta 7547, abbiamo un episodio registrato con Mike Neuder, l'episodio 130 di PEEPanEIP, che ne fornisce una panoramica ad alto livello. Mi piace sempre vedere proposte in competizione, perché so che è per il miglioramento dell'ecosistema e della catena. Vedo in chat che ci sono alcune domande. Forse vorrei invitare Kataya a condividere la sua domanda.

### Il proponente deve includere tutte e 16 le liste? (19:05) {#does-the-proposer-have-to-include-all-16-lists-1905}

**Kataya:** Ciao, grazie. La mia domanda era: il proponente del blocco riceve 16 liste di inclusione, ciascuna da un membro del comitato, e deve includere tutte le transazioni di queste liste?

**Thomas Thiery:** Sì, esatto. Si prende l'unione di tutte le transazioni presenti in tutte le liste, nel nostro caso 16 liste. Potrebbero esserci delle sovrapposizioni, ovviamente, quindi si prende l'unione e si deduplica, ma sì, tutte le transazioni in tutte le liste devono essere incluse nel blocco affinché sia considerato valido dagli attestatori.

**Pooja Ranjan:** La prossima domanda nella chat è di Justin. Justin, vorresti leggere la tua domanda per gli ospiti?

### Transazioni da mempool private nelle liste di inclusione (19:55) {#private-mempool-transactions-in-inclusion-lists-1955}

**Justin:** Ho fatto così tante domande. Volevo chiedere cosa impedisce di inserire una transazione da una mempool privata in una lista di inclusione, e credo che sia stata data una risposta esauriente. Sembra che vada benissimo, considerando che il costruttore le ordinerà essenzialmente come ritiene opportuno in ogni caso, e la tua transazione diventa pubblica anche quando finisce nella IL. Quindi penso che abbia senso. Grazie.

**Thomas Thiery:** Questa era una considerazione, come ha menzionato Julian. Non volevamo assolutamente che FOCIL e le liste di inclusione venissero utilizzate per includere transazioni MEV, flussi di ordini privati o preconferme, perché in definitiva ciò che vogliamo è la resistenza alla censura, ed è molto facile che un meccanismo diventi un veicolo per includere transazioni di valore se non si fa attenzione. Il fatto che quando includi la tua transazione in una lista di inclusione questa diventi automaticamente pubblica, tutti possano vederla, non abbia garanzie di ordinamento e possa essere inclusa dal costruttore in qualsiasi punto del blocco, la rende poco adatta per le transazioni di valore.

Quindi, o hai una transazione pubblica e potresti semplicemente inviarla alla mempool pubblica affinché venga inclusa in una lista di inclusione, oppure hai transazioni private di valore e allora non passeresti per FOCIL, perché ci sono modi migliori per farlo. Contatteresti direttamente il costruttore e la invieresti tramite canali privati.

**Pooja Ranjan:** Grazie per la condivisione. Vedo che la prossima domanda è di Ladislaus.

### FOCIL e scalabilità (21:41) {#focil-and-scaling-2141}

**Ladislaus:** Ciao ragazzi. Questo si riferisce al punto che avete sollevato riguardo a FOCIL e alla scalabilità. Ultimamente ho visto alcune discussioni, come tutti noi, sulla scalabilità di Ethereum e, come avete giustamente menzionato, c'è questo collo di bottiglia dovuto ai pochi costruttori in circolazione. Personalmente mi piace pensare a FOCIL come a un modo per ridare potere alla costruzione locale, e lo vedo come una necessità da sancire nel protocollo prima di aumentare i requisiti di larghezza di banda, o i requisiti dei nodi in generale. Forse potete approfondire come la pensate al riguardo, e anche altri potenziali modi per scalare, magari senza FOCIL, come avete accennato.

**Julian Ma:** Grazie per la domanda. Prima di tutto, la questione della scalabilità tramite FOCIL. Attualmente il 90% dei validatori esternalizza la costruzione dei blocchi tramite MEV-Boost, e queste entità sofisticate hanno ovviamente più larghezza di banda rispetto ai requisiti hardware minimi. Potrebbero, ad esempio, includere più blob nei loro blocchi senza causare alcun problema. Una cosa interessante, tuttavia, è che Ethereum si affida alla costruzione locale dei blocchi per la neutralità credibile, o resistenza alla censura, perché queste due entità sofisticate non sono quelle su cui si può basare la resistenza alla censura di Ethereum.

Quindi il protocollo di Ethereum deve comunque essere progettato in modo che sia possibile effettuare la costruzione locale dei blocchi e, di fatto, lo progettiamo affinché non sia svantaggioso rispetto a MEV-Boost. Questo fa parte del design di Ethereum, ma in pratica, ovviamente, MEV-Boost è molto più redditizio: in primo luogo perché questi costruttori di blocchi sofisticati dispongono di algoritmi più complessi, e in secondo luogo perché hanno un flusso di ordini privato molto maggiore. Di recente c'è stata una ricerca di Data Always che ha dimostrato che i blocchi di MEV-Boost contengono molte più transazioni. Già solo questo porta a maggiori profitti.

Tuttavia, il protocollo è progettato in modo che non ci siano forze all'interno delle regole del protocollo che rendano un validatore meno redditizio di un altro. Se vogliamo mantenere questa regola, allora FOCIL è necessario, perché in questo modo i costruttori di blocchi locali possono contribuire alle liste di inclusione e sostenere così la resistenza alla censura. Potremmo, tuttavia, anche sbarazzarci di questa regola e dire fondamentalmente che i costruttori di blocchi locali possono includere un certo numero di blob, ma i costruttori di blocchi più sofisticati potrebbero includere più blob, al punto che i costruttori di blocchi locali non sarebbero in grado di gestire quel carico mentre creano un blocco da soli. Quindi, se vogliamo mantenere la regola secondo cui il massimo è impostato sui requisiti hardware più bassi, allora abbiamo bisogno di FOCIL. Se ci va bene allentare questa regola, allora potenzialmente non abbiamo bisogno di FOCIL per la scalabilità.

**Thomas Thiery:** Immagino sia molto simile, ma in questo momento su Ethereum ci troviamo in una posizione strana, perché ci affidiamo a costruttori sofisticati per costruire la maggior parte dei blocchi, ma questi non sono il massimo per la resistenza alla censura, perché si tratta solo di due parti. Se decidono di censurare delle transazioni o alcuni indirizzi per un motivo arbitrario, allora fondamentalmente non abbiamo resistenza alla censura o permissionlessness, il che è altrettanto molto importante. Significa che possono censurare o impedire a qualsiasi attore vogliano di partecipare onchain, il che è un grosso problema.

E le proprietà di resistenza alla censura che manteniamo non sono eccezionali, giusto? Dato che la maggior parte dei blocchi viene costruita da questi due costruttori, in pratica devi aspettare finché un costruttore di blocchi locale non viene eletto e propone un blocco che include tutte queste transazioni che normalmente vengono censurate, il che non è il massimo. Significa che questi utenti dovranno aspettare 10, 12, non so, molti blocchi prima che le loro transazioni vengano effettivamente incluse onchain.

Quindi vogliamo davvero mantenere gli home staker e i costruttori di blocchi locali, perché sono loro a preservare la resistenza alla censura. Allo stesso tempo, oggi, anche usarli non è il massimo, perché devi comunque aspettare molto tempo per far includere la tua transazione se viene censurata dai due costruttori. Con FOCIL, si passa a un mondo in cui i partecipanti che garantiscono la resistenza alla censura, i membri del comitato della lista di inclusione nel nostro caso, potrebbero essere diversi dalle persone che costruiscono i blocchi. Penso che questo apra uno scenario molto interessante, perché ora non dobbiamo fare affidamento sullo stesso identico partecipante sia per costruire blocchi di valore sia per contribuire alla resistenza alla censura. FOCIL può anche essere considerato un primo passo in questa importante direzione, perché si hanno due compiti molto diversi, e oggi chiediamo agli stessi identici nodi validatori di fare entrambe le cose, il che crea molta tensione.

**Pooja Ranjan:** Grazie mille. Penso che la prossima domanda sia di Luis.

### Criteri per la selezione delle transazioni (26:46) {#criteria-for-selecting-transactions-2646}

**Luis Pinto:** Mi sono unito qualche minuto dopo l'inizio, ma mi sembra che questo stia decentralizzando la selezione delle transazioni nella rete nel suo complesso. Secondo me è un'ottima cosa; combatte il MEV e la censura. E mi piace decisamente la parte in cui sono gli attestatori a fare questo lavoro, perché in futuro avranno requisiti hardware inferiori rispetto ai costruttori, a maggior ragione con l'assenza di stato e i client senza stato. Dato che sarà possibile eseguirlo con un hardware molto limitato, rende le cose molto decentralizzate. Immagino che la sfida principale qui sia definire i criteri per la selezione delle transazioni di queste liste di inclusione, che si scelga di usare le commissioni di priorità o il numero di blob; ci sono così tante variabili. Siete giunti a un insieme di criteri che state pensando di applicare?

**Thomas Thiery:** È un'ottima domanda. La risposta è duplice. La prima parte è molto importante e riguarda il tentativo di separare gli attestatori dalle persone che costruiscono o propongono il blocco. Questa è l'intera linea di ricerca sulla separazione attestatore-proponente (APS); Julian ci ha lavorato parecchio. Lo chiamiamo separazione dei ruoli, in modo che corrispondano più da vicino ai compiti del protocollo. Ho scritto un post, che ho appena condiviso, su una possibile separazione, che è ancora molto aperta, e mi piacerebbe ricevere più opinioni dalle persone. In questo post faccio una distinzione tra attestatori, includitori, che ora sono i membri del comitato delle IL, e proponenti dell'esecuzione, o costruttori. Penso che questi siano compiti fondamentalmente diversi e forse dovremmo avere ruoli diversi per loro.

Poi, per quanto riguarda la regola di inclusione, è un'ottima domanda. Ci abbiamo pensato un bel po' e credo che siamo giunti a due conclusioni. La prima è che vogliamo una diversità di regole. Non vogliamo una singola regola, ad esempio l'ordinamento per commissioni di priorità decrescenti per tutti i client, perché in quel caso si potrebbero fare dei giochetti e cercare di riordinare la mempool in modo che solo le proprie transazioni vengano incluse nelle IL. Ma se si ha una diversità di regole, inclusa una regola che tiene conto anche del tempo in cui una transazione è rimasta in sospeso nella mempool, e client diversi implementano regole diverse, tutte dello stesso tipo, per lo più incentrate sulle commissioni di priorità e sul tempo di attesa nella mempool, allora diventa molto, molto difficile da manipolare, e rende il protocollo ancora più robusto. Penso che sia anche un buon modo per trarre vantaggio dalla diversità di client che abbiamo oggi su Ethereum e per consentire ai client di fare scelte mirate. Abbiamo delle regole in mente, ma pensiamo che i client possano anche scegliere le regole migliori per loro. Finché non tutti avranno l'esatta stessa regola ordinata per commissioni di priorità, andrà tutto bene.

**Luis Pinto:** Ok, quindi state anche distribuendo questi criteri, lasciando che coloro che costruiscono le liste di inclusione abbiano i propri criteri. O questo farà parte del protocollo?

**Julian Ma:** La regola di inclusione non farà parte del protocollo. Prima di tutto, è molto difficile da applicare e, in secondo luogo, in realtà è meglio non imporre nulla. Se permettiamo ai membri del comitato di decidere da soli, o lasciamo che i team dei client agiscano per loro conto, su come includere le transazioni, allora creiamo una certa robustezza nella rete. Persone con preferenze diverse includeranno in modi diversi, il che significa che è più difficile attaccare il sistema.

**Luis Pinto:** Ok, grazie.

### Compatibilità con EIP-7702, ePBS e PeerDAS (30:43) {#compatibility-with-eip-7702-epbs-and-peerdas-3043}

**Pooja Ranjan:** Grazie mille. Da quanto ho capito, questa proposta è già stata avanzata per l'aggiornamento successivo a Pectra, Fusaka. E dato che Fusaka potrebbe includere o meno altri EIP attualmente in lavorazione, mi chiedo quale sia lo stato di compatibilità di FOCIL rispetto a proposte come la 7702, che riguarda l'astrazione dell'account, ePBS e PeerDAS.

**Thomas Thiery:** Ottima domanda. Qui avevamo un piccolo vantaggio grazie alla storia delle liste di inclusione. Come abbiamo accennato, l'EIP-7547 era stato preso in considerazione per l'inclusione e poi respinto a causa di incompatibilità. Quindi siamo stati molto attenti a risolverle prima di fare una nuova proposta, perché sapevamo che le persone l'avrebbero esaminata ponendosi le stesse domande, il che è comprensibile.

Siamo molto fiduciosi, perché abbiamo parlato anche con i team che si occupano dell'astrazione dell'account e abbiamo discusso a lungo con Potuz e Terence. Terence ci ha aiutato attivamente e ha lavorato sia su ePBS che su FOCIL, quindi è stato molto facile per noi verificare anche questa compatibilità. Non credo proprio che ci siano incompatibilità con nessuno degli altri EIP. Con ePBS, bisogna fare attenzione alle tempistiche, perché si separa il payload di esecuzione dal blocco di consenso, quindi cambia l'intera tempistica dello slot, e ora si aggiunge anche la creazione delle IL che devono essere fatte prima che il payload venga proposto. Quindi bisogna fare attenzione alle tempistiche, ma se ricordo bene, dall'ultima volta che ne abbiamo parlato sia con Potuz che con Terence, non c'era assolutamente alcuna incompatibilità cruciale. Penso che siamo a buon punto per quanto riguarda la compatibilità.

**Pooja Ranjan:** È bello saperlo. Ho notato che anche Jihoon ha condiviso un HackMD, che aggiungeremo alle risorse, per le persone che vorrebbero saperne di più sulla compatibilità con ePBS nello specifico. E sì, ricordo dall'ultima conversazione con Mike, immagino che la proposta non sia stata inclusa a causa dell'incompatibilità con l'astrazione dell'account. Quindi è bello sapere che questo problema è già stato risolto.

### FOCIL e il MEV multi-slot (33:04) {#focil-and-multi-slot-mev-3304}

**Pooja Ranjan:** Stavo esaminando i documenti e i dettagli aggiunti al sito web di FOCIL, meetfocil.eth.limo, e ho scoperto un termine chiamato MEV multi-slot. Julian ha anche menzionato che MEV-Boost in generale è redditizio, nonostante il desiderio e gli sforzi fatti dagli sviluppatori per mantenerlo alla pari. Mi chiedo come FOCIL lo impedirà.

**Julian Ma:** Grazie per la domanda. Innanzitutto, lasciami dire qualcosa su FOCIL e il MEV, e poi possiamo passare al MEV multi-slot. FOCIL non previene necessariamente il MEV, e questo è proprio perché vogliamo separare le parti relative al MEV e quelle relative all'inclusione. A nostro avviso è importante farlo, perché altrimenti si vedrebbero spuntare mercati del tipo IL Boost. Seguendo questo ragionamento, se la lista di inclusione potesse limitare la quantità di MEV estraibile, allora costruire la lista di inclusione diventerebbe molto prezioso e le persone creerebbero mercati attorno ad essa. Il nostro design è concepito per fornire la garanzia minima di inclusione, il che significa che non è così prezioso essere un membro del comitato della lista di inclusione, e ce ne sono 16, il che significa che non esiste un mercato di produttori sofisticati.

Passando poi al MEV multi-slot: FOCIL allevia alcuni dei problemi, ma non li risolve del tutto. Questo è di nuovo a causa di questa incompatibilità tra il fornire sia resistenza alla censura che una soluzione al MEV. Ciò che fa FOCIL è consentire l'inclusione di qualsiasi transazione purché paghi le commissioni, il che risolve in una certa misura il MEV multi-slot. Il MEV multi-slot in questo caso si verifica quando una parte è in grado di estrarre più MEV se controlla due blocchi di fila.

FOCIL allevia alcuni dei problemi perché ti consente di inserire la tua transazione. Ad esempio, se hai bisogno di inserire una transazione che liquida un debito inesigibile su una qualche posizione da qualche parte, sei in grado di farlo anche se il proponente cerca di censurarti ed estrarrebbe MEV da te nel blocco successivo.

Il motivo per cui non risolve tutti i problemi è a causa della selezione avversa, una proprietà economica in cui una persona ha più informazioni dell'altra. Un esempio di MEV multi-slot sarebbe l'estrazione di arbitraggio su due blocchi, in cui il costruttore di blocchi non estrae arbitraggio nel primo blocco e lo fa nel secondo blocco. Ci sono alcuni risultati teorici che mostrano che questo può essere più redditizio per il costruttore di blocchi rispetto all'estrazione di arbitraggio in entrambi gli slot. Si potrebbe pensare che FOCIL aiuti in questo caso, perché gli arbitraggisti potrebbero in linea di principio includere la loro transazione nella lista di inclusione e forzare così il verificarsi di una sorta di arbitraggio. Sebbene sia così, non è compatibile con gli incentivi per gli arbitraggisti inviare la loro transazione a FOCIL, perché ci sono ancora 3 secondi tra l'invio della loro transazione e il momento in cui il costruttore di blocchi è in grado di agire. Se stai cercando di fare arbitraggio e il prezzo si muove costantemente su un mercato esterno, non vuoi impegnarti con 3 secondi di anticipo, perché hai molte meno informazioni rispetto al costruttore di blocchi, che agisce dopo di te. La selezione avversa entra in gioco perché il costruttore ha più informazioni: ti lascerà vincere se è negativo per te, se il prezzo sul mercato esterno si è mosso contro di te in quei tre secondi extra, e lascerà vincere se stesso se è meglio per lui vincere.

Quindi FOCIL risolve le parti del MEV multi-slot in cui le transazioni non subiscono la selezione avversa. Per le transazioni in cui c'è selezione avversa, è leggermente più complicato, ma allevia il problema in una certa misura. In linea di principio, rende le cose migliori di come sono ora, ma c'è ancora un po' di lavoro da fare.

**Pooja Ranjan:** Molto bene, grazie mille per averlo condiviso. Capisco che ci sia molta ricerca in corso per affrontare la questione del MEV, quindi è bello sapere che almeno in linea di principio aiuterà più dello scenario attuale.

### Compromessi e sfide (36:44) {#trade-offs-and-challenges-3644}

**Pooja Ranjan:** Ho una domanda relativa a ciò che Thomas ha menzionato prima riguardo all'equivocazione delle IL. Ho notato che nella sezione delle considerazioni sulla sicurezza della proposta, ci sono parecchi punti menzionati, come la liveness del consenso, l'equivocazione delle IL e la costruzione del payload. Quale considereresti il compromesso più grande, o qualcosa che potrebbe richiedere ulteriori ricerche e impedire a questa proposta di essere inclusa nel prossimo aggiornamento così com'è?

**Thomas Thiery:** Sinceramente, penso che la sezione sulle considerazioni sulla sicurezza fosse principalmente un modo per dimostrare che abbiamo pensato e affrontato le preoccupazioni relative alla sicurezza. Si tratta più di questo che di avere questioni aperte su aspetti di sicurezza che non conosciamo. Non credo ci siano grandi ostacoli o problemi in termini di considerazioni sulla sicurezza.

Per quanto riguarda i compromessi: se si adotta una visione molto ristretta, è vero che FOCIL aggiunge alcuni compiti ai validatori, sia quando devono proporre una lista di inclusione, sia per gli attestatori, quando devono verificare una condizione in più per assicurarsi che il blocco sia valido secondo le liste di inclusione. Aggiunge anche un piccolo compito per il proponente, perché ora deve assicurarsi che il suo payload includa effettivamente le transazioni presenti nelle IL. Per me, questo è l'unico compromesso, e questi compiti non sono gravosi o complessi. Un membro del comitato delle IL si limita a monitorare la mempool pubblica e a includere le transazioni in una lista che poi invia. Non richiede alcun tipo di competenza o sofisticazione, il che penso sia positivo. D'altra parte, come abbiamo detto, potrebbe sbloccare alcuni grandi miglioramenti di scalabilità e una migliore separazione tra i partecipanti e i compiti all'interno del protocollo.

Potrei essere di parte, ma non vedo grandi compromessi. Penso invece che capovolga completamente la situazione per quanto riguarda la resistenza alla censura. Ora è sufficiente che solo il 15% della rete sia onesto affinché tutte le transazioni, comprese quelle che potrebbero essere censurate dai costruttori, vengano incluse nel blocco successivo, il che rappresenta un grandissimo miglioramento. Sinceramente, non credo che si debba scendere a molti compromessi in questo caso.

**Pooja Ranjan:** È bello saperlo. Nella maggior parte delle proposte scopriamo che la sezione delle considerazioni sulla sicurezza non contiene alcuna informazione o ne contiene pochissime, quindi è positivo sapere che la ricerca è stata fatta su quella parte e che siamo consapevoli delle possibili considerazioni sulla sicurezza. Sono felice di sapere che non rappresenta un ostacolo o una potenziale sfida per l'implementazione e l'adozione in futuro.

### Meccanismi delle commissioni di transazione per le liste di inclusione (39:50) {#transaction-fee-mechanisms-for-inclusion-lists-3950}

**Pooja Ranjan:** Ho una domanda su alcune questioni aperte che ho trovato sul sito web stesso, riguardo al meccanismo delle commissioni di transazione. Mi chiedo se ci siano aggiornamenti, o se vorreste condividere maggiori dettagli sul modo migliore per addebitare le commissioni e distribuirle per l'inclusione nella lista di inclusione.

**Thomas Thiery:** Abbiamo un grant in corso che sta esaminando specificamente questo aspetto e i meccanismi di incentivo per ricompensare i membri del comitato delle IL (liste di inclusione). Non è facile. È complicato e, indipendentemente da come lo si affronti, si tratta di cambiamenti molto grandi. Modificare le commissioni su Ethereum, che si tratti di cambiarne una, aggiungerne una o aggiungere una nuova emissione, sono tutti grandi cambiamenti che richiedono molta considerazione e attenzione. Ma lo stiamo esplorando, e le idee sulla distribuzione delle commissioni tra, ad esempio, i membri del comitato che includono una transazione sembrano buone. Ha in un certo senso le proprietà che desideriamo, perché vogliamo ricompensare le persone che includono transazioni che altri potrebbero non voler includere. Quindi ci stiamo riflettendo molto a fondo e abbiamo un grant in corso.

C'è anche da chiedersi se vogliamo davvero dare delle commissioni ai membri del comitato delle IL, perché è notoriamente molto difficile ricompensare i partecipanti più piccoli distribuiti in tutto il mondo. Non si vogliono attacchi Sybil e non si vuole che i grandi partecipanti con molto stake estromettano l'insieme del comitato delle IL. Come si fa a prevenirlo? È molto difficile. Quindi ci sono molte considerazioni di progettazione di cui tenere conto.

Una delle mie opinioni recenti è: e se aggiungessimo alcune funzionalità interessanti a FOCIL, come la privacy, in modo da non poter sapere veramente chi ha proposto una determinata lista di transazioni? Sai che è stato qualcuno effettivamente selezionato come membro del comitato delle IL, ma non sai esattamente chi ha proposto quale lista, quindi non puoi collegare i membri del comitato delle IL all'insieme di transazioni nelle loro IL. Se riuscissimo a ottenere questo, e a rendere il ruolo del comitato delle IL una sorta di opt-in, allora probabilmente avremmo partecipanti onesti nel protocollo, basandoci su un comportamento altruistico, e forse non avremmo affatto bisogno di istituire un meccanismo di commissioni. Questa è un'opinione molto recente e personale, e la stiamo esplorando a fondo proprio ora. Tutte queste sono discussioni sul "futuro di FOCIL"; non è previsto che vengano incluse nell'EIP attuale.

**Julian Ma:** Solo per aggiungere qualcosa, anche l'ultima parte è molto importante: l'EIP-7805 non include alcun meccanismo per le commissioni di transazione, per renderlo più semplice da implementare. È fondamentalmente l'approccio più minimale possibile con cui possiamo fornire le proprietà di resistenza alla censura, ma è molto estendibile. Lo stiamo esaminando. Thomas ha svolto un bel po' di lavoro analizzando commissioni di transazione separate per chi include e per i proponenti. Poi, come ha menzionato Thomas, abbiamo un grant in corso con un fantastico ricercatore di Nethermind che sta studiando la creazione di un meccanismo per le commissioni di transazione per FOCIL, e questo è molto promettente. E infine, c'è stato del lavoro su un meccanismo per le commissioni di transazione per una variante di FOCIL chiamata AUCIL, un design di lista di inclusione basato su aste proposto da Sarisht Wadhwa, Fan Zhang e Kartik Nayak insieme a diversi autori di FOCIL, che esamina i modi per incentivare i membri del comitato delle liste di inclusione.

Riguardo al punto precedente di Luis, l'incentivazione riguarda molto il modo in cui vengono create le liste di inclusione. Significa che il protocollo vuole dare una certa visione di come dovrebbero comportarsi i membri del comitato delle liste di inclusione. Di solito, ciò si riduce al fatto che vuole che determinati partecipanti facciano cose diverse. Ad esempio, potrebbe ordinare i membri del comitato e assegnare loro determinate transazioni tramite un equilibrio correlato, al fine di avere comunque un comportamento diverso tra i membri del comitato. Quindi non fa parte della proposta attuale, ma lo stiamo sicuramente esaminando e si adatta alla linea di estendibilità di FOCIL.

**Pooja Ranjan:** Oh, è interessante. Quindi dovremmo aspettarci alcune proposte supplementari in futuro per migliorare le attuali funzionalità di FOCIL.

### Dimensione della lista di inclusione (44:16) {#inclusion-list-size-4416}

**Pooja Ranjan:** Ho un'altra domanda. Non sono sicura che debba far parte della presente proposta, ma sono curiosa di capire se ci sono aggiornamenti sulla dimensione delle IL. Le liste di inclusione devono probabilmente essere limitate in termini di dimensioni per evitare un uso eccessivo della larghezza di banda. Abbiamo ulteriori ricerche o aggiornamenti su come si possa determinare la dimensione ottimale della lista di inclusione?

**Thomas Thiery:** Ora abbiamo una dimensione fissa nella specifica, ed è lì da un po': 8 kilobyte. L'abbiamo impostata in kilobyte perché ciò che FOCIL e le IL consumano realmente è la larghezza di banda, e questo è quanto. Se si prende la dimensione mediana della transazione, arriviamo a circa 40 transazioni per IL, e se tutte le transazioni sono uniche, si tratta di circa 640 transazioni che potrebbero essere combinate insieme tra tutti i 16 membri del comitato.

Non so se ci sia molta ricerca da fare sull'esatta dimensione ottimale. Quello che abbiamo scelto: 16 volte 8 kilobyte è fondamentalmente la dimensione di un blob, quindi non è un'enorme quantità di larghezza di banda combinata. E poiché la combinazione di transazioni tra le IL è più grande di un blocco, non credo che incontreremo problemi al riguardo.

Per il futuro, si potrebbe aumentare la dimensione delle IL, ma si potrebbe anche considerare di aumentare il numero dei membri del comitato delle IL. Ciò consente di avere ancora più possibilità di ottenere un membro onesto del comitato delle IL se la maggior parte della rete decide di iniziare a censurare. Quindi anche questa è una cosa che potremmo fare. Per ora, sembra che 16 andrebbe benissimo e sarebbe sufficiente, ma si può sicuramente giocare con questi parametri in futuro se la censura dovesse diventare molto folle, o se avessimo bisogno di intraprendere ulteriori azioni.

### Metriche per monitorare l'adozione (46:39) {#metrics-to-track-adoption-4639}

**Pooja Ranjan:** Solo una domanda di follow-up: avete in mente delle metriche che possiamo monitorare per comprendere l'adozione o il successo di questa proposta?

**Julian Ma:** È un'ottima domanda. Lasciatemi rispondere rapidamente per poi passare la parola a Thomas. Alcune metriche semplici riguardano semplicemente quante liste di inclusione non vuote vengono proposte. E si potrebbe pensare a delle dashboard, come la serie ".pics" di Toni Wahrstätter, dove ci sono forse maggiori sfumature, assegnando una qualche misura di qualità a queste liste di inclusione. In linea di principio, tuttavia, è sufficiente che una sola persona per slot crei una lista di inclusione adeguata per fornire resistenza alla censura.

Penso sia un punto così importante che è fondamentale implementare FOCIL al più presto, perché ora ci troviamo in questo regime magico in cui i costruttori di blocchi non stanno censurando troppo e i validatori non stanno censurando troppo. Direi che si tratta di una situazione molto fragile. Fino ad ora, i costruttori di blocchi hanno censurato per molto tempo e, se introduciamo FOCIL adesso, abbiamo la possibilità di far sì che diventi la norma che tutti questi validatori lo adottino e creino liste di inclusione significative. Poiché i costruttori di blocchi non stanno censurando, non si crea alcuna instabilità di mercato. Se aspettiamo che ci sia censura tra i costruttori, allora sarà molto più difficile introdurre FOCIL, e immagino che tutte le metriche che verrebbero utilizzate per misurare l'adozione sarebbero di gran lunga peggiori.

**Thomas Thiery:** Una metrica chiave da osservare è anche letteralmente il ritardo di inclusione per le transazioni della mempool pubblica. Si prendono tutte le transazioni in sospeso nella mempool pubblica e si osserva quanto velocemente vengono incluse. Se FOCIL funziona, verranno tutte incluse nel blocco successivo. Se non lo sono, significa che un'ampia percentuale di validatori sta censurando. Quindi l'altra metrica che possiamo osservare è chi sta censurando e quale percentuale della rete sta censurando. Avremo dashboard e metriche molto trasparenti per monitorare tutto questo, perché è fondamentalmente ciò che FOCIL dovrebbe fare. Se le transazioni pubbliche non vengono incluse nel blocco successivo, significa che una porzione molto ampia della rete sta effettivamente censurando queste transazioni.

**Pooja Ranjan:** Molto interessante. Quindi forse è uno spunto per i ricercatori: una possibile lista dei desideri per gli aggiornamenti, in cui dashboard e tracker di metriche dovrebbero essere condivisi dagli sviluppatori per una proposta ogni volta che viene inclusa in un aggiornamento della rete.

### Stato dell'implementazione dei client (49:11) {#client-implementation-status-4911}

**Pooja Ranjan:** Come ha menzionato Julian, questa proposta potrebbe dover essere implementata il prima possibile. Sono curiosa di capire a che punto siamo con l'implementazione dei client, perché ricordo che nell'ultima chiamata sulla testnet Paritosh ha menzionato l'aggiunta di un po' di supporto con le devnet. Quindi, a che punto siamo?

**Thomas Thiery:** Stiamo andando piuttosto bene. Prima di tutto, è stato fantastico vedere come le persone si siano fatte carico della parte di implementazione di FOCIL, perché io non sono uno sviluppatore, sono un ricercatore. Ho lavorato con gli sviluppatori fin dall'inizio, ma non sono io a implementare le cose nei client.

I tre che hanno guidato l'iniziativa: abbiamo Terence di Prysm e Jihoon, che ha aiutato molto Terence su Prysm ma ha anche lavorato su Geth. Quindi ora abbiamo una devnet funzionante per Prysm e Geth, il che è fantastico, e ci sono molti test in corso. Ora stiamo anche cercando di rendere FOCIL mostrato e visibile sull'explorer Dora. Poi c'è Jacob, che ha lavorato su Lighthouse e Reth, e so che ci sono ancora degli sforzi in corso lì. Lodestar è stato molto attivo ultimamente; penso che siano molto vicini ad avere una devnet funzionante. Oggi abbiamo avuto notizie da Nethermind che hanno un prototipo, il che è davvero fantastico. Mi sembra di dimenticarne qualcuno... Anche Nimbus si sta unendo, dice Jihoon. È davvero un'ottima notizia.

Nel complesso, stiamo preparando e attivando sempre più devnet, devnet locali e sempre più combinazioni tra i client del livello di esecuzione e del livello di consenso. Ci sono stati dei progressi davvero buoni, ed è bello vederlo, perché sappiamo tutti che gli sviluppatori sono piuttosto occupati ora con l'arrivo di Pectra, e stanno già lavorando su PeerDAS e altre cose. È stato davvero fantastico vedere come le persone su Ethereum in generale tengano molto alla resistenza alla censura. La maggior parte dei team che non avevo contattato specificamente si è semplicemente unita allo sforzo e ora sta lavorando verso le devnet e i test.

**Pooja Ranjan:** Grazie per averlo condiviso. Non vedo l'ora di seguire gli aggiornamenti sulle devnet. Non sono sicura di quante iterazioni di questa devnet ci saranno, ma sono entusiasta di vederla arrivare. Vedo che Justin ha una domanda qui. Justin, prego, vai pure avanti.

### FOCIL in Fusaka o Glamsterdam? (52:07) {#focil-in-fusaka-or-glamsterdam-5207}

**Justin:** Okay, tenetevi forte per questa. Hai fatto un'ottima osservazione sul fatto che il momento migliore per affrontare la censura è prima che la censura avvenga, giusto? Quindi: FOCIL in Fusaka, o può aspettare Glamsterdam? E quale dovrei sostenere come sviluppatore?

**Thomas Thiery:** Abbiamo aperto la PR ed è stata unita, con FOCIL proposto per Fusaka. Pensiamo che dovrebbe essere incluso in Fusaka. Parte del ragionamento è che alcuni client hanno già iniziato a lavorarci e non hanno incontrato troppi ostacoli. Non è come altre proposte che sono molto più difficili da implementare e richiedono molto più lavoro. E non è nemmeno molto controversa. Non credo che nessuno si opponga alla resistenza alla censura, e tutti sono più o meno d'accordo che debba essere inclusa il prima possibile. Quindi io opterei per Fusaka.

Non so se possa aspettare o meno. Le proposte e gli aggiornamenti possono sempre aspettare. Voglio solo evitare un mondo in cui non sia così facile implementare questi cambiamenti. Le cose possono capovolgersi molto rapidamente. Come abbiamo visto, è andata al contrario: qualche mese fa, uno dei principali costruttori ha smesso di censurare di punto in bianco. Abbiamo chiesto il perché, e la risposta è stata tipo: "sì, abbiamo semplicemente deciso di non farlo". È stato un bene in quel caso, perché è andata per il verso giusto, ma la situazione può ribaltarsi completamente, e allora potremmo avere i due costruttori che censurano alcune transazioni, e ci ritroveremmo in una pessima situazione.

L'altra cosa che voglio menzionare, perché ritengo sia importante: se andiamo verso alcune delle cose di cui abbiamo parlato, come l'APS, dove si può effettivamente separare l'attestatore e il proponente con alcuni dei design su cui abbiamo lavorato, dobbiamo avere FOCIL prima di allora, e dobbiamo sapere che FOCIL funziona. Abbiamo bisogno di FOCIL sulla Mainnet per sei mesi, un anno, per essere effettivamente sicuri che stia adempiendo al suo scopo, che è mantenere e migliorare le proprietà di resistenza alla censura di Ethereum. Quindi un'altra urgenza, almeno per me, è che se vogliamo proteggere gli attestatori dai giochi di tempismo e da altre preoccupazioni che vogliamo affrontare con l'APS, abbiamo bisogno di FOCIL il prima possibile.

**Pooja Ranjan:** A volte è triste vedere quando le proposte non vengono selezionate per l'aggiornamento successivo o più vicino, ma solo un certo numero di proposte può essere incluso in un singolo aggiornamento. Apprezzo molto tutto il duro lavoro svolto dietro la presentazione della proposta, la preparazione della proposta, così come i test che la riguardano. Quindi grazie mille per tutto il lavoro che state facendo per l'ecosistema di Ethereum.

### Botta e risposta (55:18) {#rapid-fire-5518}

**Pooja Ranjan:** Prima di concludere, abbiamo un rapido round di botta e risposta. L'unica condizione è che la risposta debba essere di una sola parola o di una sola frase, e cercheremo di farlo con un timer, magari 30 secondi ciascuno. Se siete pronti, andiamo avanti e iniziamo con Julian. Qual è il problema più difficile nella ricerca sulla blockchain in questo momento?

**Julian Ma:** Non farò troppi meme, quindi risponderò seriamente. Direi che il problema più difficile è il futuro dello staking: cosa significa il futuro dello staking, quali ruoli forniscono i fornitori di servizi, come vengono compensati per questo e come si relazionano tra loro.

**Pooja Ranjan:** Qual è un caso d'uso della blockchain che non è stato esplorato abbastanza?

**Julian Ma:** Direi FOCIL.

**Pooja Ranjan:** Qual è il più grande rischio per la sicurezza di Ethereum oggi?

**Julian Ma:** Onestamente direi che la resistenza alla censura è molto critica qui, a causa di cose come la MEV multi-blocco che potrebbero comportare enormi rischi per la sicurezza, ad esempio per gli L2.

**Pooja Ranjan:** La MEV dovrebbe essere ridotta al minimo, accolta o qualcosa nel mezzo?

**Julian Ma:** Sono in gran parte d'accordo con la posizione di Flashbots al riguardo, ovvero che dovrebbe essere democratizzata, il che significa che dovrebbe essere massimizzata dove necessario e ridotta al minimo a livello di applicazione.

**Pooja Ranjan:** La decentralizzazione vale sempre i compromessi?

**Julian Ma:** Di solito vale i compromessi.

**Pooja Ranjan:** Qual è la più grande innovazione che Ethereum ha portato al mondo?

**Julian Ma:** Qui vorrei citare il discorso di Mike Neuder al Devcon sui diritti di proprietà digitale. Direi i diritti di proprietà digitale resistenti alla censura che stanno davvero cambiando il mondo.

**Pooja Ranjan:** Grazie mille, ottima risposta. La mia prossima serie di domande è per Thomas. Quindi, se Ethereum non esistesse, su quale blockchain lavoreresti?

**Thomas Thiery:** Penso che farò un po' di meme, e Julian mi ha un po' spiazzato perché pensavo che avrebbe fatto lo stesso. La blockchain sarebbe FOCIL.

**Pooja Ranjan:** Qual è il caso d'uso più sopravvalutato per la blockchain?

**Thomas Thiery:** Nessun caso d'uso merita di essere esaltato senza FOCIL.

**Pooja Ranjan:** Qual è una cosa che Ethereum deve migliorare il prima possibile?

**Thomas Thiery:** La resistenza alla censura, con FOCIL.

**Pooja Ranjan:** Una parola per descrivere la decentralizzazione?

**Thomas Thiery:** FOCIL.

**Pooja Ranjan:** Pensi che Ethereum risolverà completamente la scalabilità?

**Thomas Thiery:** Ethereum con FOCIL, sì.

**Pooja Ranjan:** Scalabilità del layer 1 (l1) o scalabilità del layer 2 (l2), quale vince?

**Thomas Thiery:** Infiniti layer, tutti con FOCIL.

**Pooja Ranjan:** Molto bene, grazie mille, Thomas. Grazie per aver risposto a tutte queste domande. Mentre stiamo concludendo, vorrei darvi questa opportunità: se avete qualche messaggio per la community riguardo alla proposta, o per la community di Ethereum in generale.

### Messaggi alla community (58:08) {#messages-to-the-community-5808}

**Thomas Thiery:** In realtà, questo è un punto molto importante, perché abbiamo discussioni attive tutto il tempo, ed è tutto pubblico su Discord. All'inizio c'è stata una spinta per rendere tutto pubblico, e le persone lo stanno effettivamente facendo, quindi ne sono molto felice. Potete seguire le discussioni e i progressi sul Discord pubblico di Eth R&D, nel canale inclusion-list. È fondamentalmente lì che sta succedendo tutto in questo momento. Poi potete contattarci su Twitter, Telegram, ovunque. Sentitevi liberi di farlo.

Più persone con cui parliamo e che coinvolgiamo, migliore sarà il design e migliore sarà l'implementazione. Quindi, se potete aiutare in qualsiasi modo, contattateci e saremo felici di collaborare su tutti i fronti, anche sul lato della ricerca. È ancora più indicato, immagino, per noi lavorare con persone che vogliono dedicarsi al futuro di FOCIL. Abbiamo menzionato la privacy, abbiamo menzionato i meccanismi delle commissioni di transazione e ci concentreremo molto anche su FOCIL per i blob. Tutte queste cose richiedono persone e sforzi di ricerca. Se siete interessati, contattateci. Grazie mille per averci ospitato e grazie anche per tutto il lavoro che fate per Ethereum.

**Julian Ma:** Solo per aggiungere una cosa, spero che siamo riusciti a entusiasmare qualcuno riguardo a FOCIL. Se siete entusiasti, fatecelo sapere. E se avete ancora delle domande, saremo felici di rispondervi e speriamo di potervi convincere che FOCIL è davvero la strada da percorrere. Grazie mille. È stato davvero un piacere essere qui e grazie per aver ospitato la sessione. E naturalmente grazie anche a tutti per aver partecipato.

### Chiusura (59:52) {#closing-words-5952}

**Pooja Ranjan:** Grazie. Con questo concludiamo. Un enorme ringraziamento a Thomas e Julian per essersi uniti a noi oggi e aver condiviso i loro approfondimenti sull'EIP-7805. Grazie a tutti i partecipanti; le vostre domande sono incoraggianti e istruttive. Grazie per averci seguito. Se questa conversazione vi è piaciuta, assicuratevi di lasciare un mi piace, iscrivervi e condividere questo episodio con gli altri appassionati di Ethereum. Vi porteremo altri EIP e progressi nella ricerca su PEEPanEIP. Alla prossima, continuate a fare le fusa con la conoscenza e ad aggirarvi per Ethereum con gli Ethereum Cat Herders. Buon proseguimento di giornata.