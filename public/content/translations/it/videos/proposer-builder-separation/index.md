---
title: "Oltre il protocollo di Ethereum: separazione proponente-costruttore (PBS)"
description: "Una presentazione sulla separazione proponente-costruttore (PBS), un modello di progettazione che separa i ruoli di costruzione e proposta dei blocchi in Ethereum."
lang: it
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "roadmap"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "Spiegazione della PBS"
---

Questa presentazione spiega come la produzione di blocchi di Ethereum si sia evoluta da un modello semplice a una sofisticata catena di approvvigionamento che coinvolge validatori, costruttori, searcher e relay. Barnabé Monnot della Fondazione Ethereum illustra i motivi per cui esiste la separazione proponente-costruttore (PBS), come i relay di MEV-Boost mediano la relazione tra proponenti e costruttori e quali soluzioni interne al protocollo vengono esplorate per ridurre le dipendenze di fiducia e migliorare la resistenza alla censura, la distribuzione del MEV e la decentralizzazione dei validatori.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=u8XvkTrjITs) pubblicata dal CBER Forum. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione (0:00) {#introduction-000}

Mi chiamo Barnabé Monnot. Parlerò un po' di ciò che accade al di fuori del protocollo, e in particolare del concetto di separazione proponente-costruttore (PBS) e di come viene gestita con i relay e molta infrastruttura offchain.

Mi piace pensare al protocollo come a un oggetto astratto dotato di determinati poteri. Uno dei poteri del protocollo è la capacità di conferire diritti a determinati partecipanti. Abbiamo visto nell'intervento precedente che il protocollo autorizza i validatori a svolgere i compiti di consenso, ma non è l'unica cosa che fanno: dobbiamo anche riempire i blocchi con le transazioni. Chiamiamo questi compiti di esecuzione, ed è su questo che voglio concentrarmi in questa presentazione.

#### Perché i validatori usano i costruttori (0:46) {#why-validators-use-builders-046}

La cosa interessante è che, sebbene sia il protocollo a originare questi diritti e a conferirli ai validatori, ciò che osserviamo in pratica è che molti validatori scelgono di non esercitare il diritto in prima persona. Scelgono di cedere il diritto a qualcun altro affinché lo eserciti per loro conto. E questo "qualcun altro" in Ethereum lo conosciamo come costruttori.

Quindi ciò che osserviamo è che, sebbene i validatori continuino a svolgere i compiti di consenso in prima persona, decidono di passare i compiti di esecuzione ai costruttori. Si tratta in realtà di un mercato piuttosto significativo. Oggi circa il 90% dei blocchi è realizzato da costruttori esterni, e questo accade all'incirca da dicembre 2022, tre mesi dopo The Merge. Il pagamento mediano dal costruttore al validatore è di circa 120 $ per blocco. Viene pagato un milione di dollari al giorno e ogni 12 secondi c'è la possibilità che questo mercato giunga a una sorta di accordo tra un proponente e un costruttore.

Oggi voglio discutere del perché i validatori usano i costruttori, da dove nasce questa relazione (introdurrò un po' il MEV e i searcher lungo il percorso), poi vi spiegherò come viene mediata questa relazione e parlerò dei relay che esistono oggi e delle soluzioni interne al protocollo a cui stiamo pensando. Voglio anche ampliare un po' la prospettiva, perché è facile guardare queste immagini e pensare: "Oh, questo è molto spaventoso, che ne è della decentralizzazione?". Voglio darvi l'idea che si tratta di compromessi che vengono fatti, ma a mio parere nella giusta direzione.

#### Il modello ingenuo e il MEV (3:04) {#the-naive-model-and-mev-304}

Si può pensare a un modello ingenuo di produzione dei blocchi in cui il validatore viene selezionato in base a un processo di selezione del leader e deve creare un blocco contenente un elenco di transazioni dalla mempool. Nel modello più ingenuo, si hanno in realtà solo due parti: un validatore in ascolto della mempool e, quando è il suo turno di creare un blocco, preleva le transazioni che pagano le commissioni più alte e le aggiunge, di solito utilizzando algoritmi di impacchettamento non molto sofisticati.

Ciò che è stato osservato in modo piuttosto drammatico negli ultimi cinque anni è che questo conferisce molto potere al produttore, in particolare il potere dell'ultima occhiata (last look). Vedono cosa vogliono fare gli utenti, per esempio vedono che l'utente vuole fare uno swap di qualcosa, e possono usare quell'informazione per estrarre profitto per se stessi.

Nel migliore dei casi questo profitto deriva da una funzione naturale del mercato come l'arbitraggio. Nel peggiore dei casi può provenire direttamente dalle tasche dell'utente, come nel caso degli attacchi sandwich. Ad esempio, un utente effettua un ordine di swap per il token A contro il token B su un mercato come Uniswap. Quella transazione creerà uno squilibrio di prezzo con un altro mercato distribuito sulla stessa catena. Il produttore può vedere la transazione in sospeso e inserire la propria transazione che effettua uno swap nella direzione opposta su un mercato diverso, intascando l'arbitraggio lungo il percorso.

Questo conferisce davvero molto potere al produttore e rende la posizione di produttore di blocchi estremamente preziosa. Questo privilegio del produttore è qualcosa che ora chiamiamo **valore massimo estraibile (MEV)**.

#### Il ruolo dei searcher (5:43) {#the-role-of-searchers-543}

In pratica, i produttori potrebbero non sapere dove si trova il valore. Si possono avere produttori di blocchi un po' inesperti: come accennato, chiunque può diventare un validatore purché abbia capitale sufficiente e sia in grado di eseguire un nodo. In pratica, potrei non sapere come fare arbitraggio o non sapere nulla dei mercati finanziari. Quello che vorrei è che qualcuno mi dicesse dove sono queste opportunità: un mercato di persone in competizione per dirmi qual è la cosa migliore da fare come produttore di blocchi.

Queste entità che sono molto brave a trovare opportunità, le chiamiamo **searcher**. Fanno emergere le opportunità per il produttore di blocchi. Il searcher potrebbe osservare un utente che effettua uno swap, attraverso la mempool pubblica o attraverso dark pool o canali privati, e poi comunicare al validatore: "C'è uno swap in corso: se impacchetti questo swap insieme a questo arbitraggio in un bundle di transazioni atomiche e includi questo bundle, allora puoi guadagnare dall'arbitraggio". Ci saranno molti searcher in competizione per convincere il produttore di blocchi.

Questo modello funziona bene in pratica se il searcher si fida del fatto che il produttore mantenga il bundle atomico. Forse avete sentito parlare di recente di un attacco su Ethereum che è costato 25 milioni di dollari a un gruppo di sandwicher: la causa principale è stata che l'attaccante è riuscito a rompere l'atomicità dei bundle, ricevendone i contenuti e cercando di riorganizzarli e modificarli. Questa è una proprietà molto importante che è valida solo finché ci si può fidare che il produttore non rompa questa atomicità.

#### Perché abbiamo bisogno dei costruttori (8:16) {#why-we-need-builders-816}

Cosa si fa se un produttore non è attendibile? Dopo The Merge in Ethereum, abbiamo staker solitari (circa il 6% della rete) che non conosciamo. I searcher non vorranno davvero inviare bundle a questi proponenti di blocchi perché è un po' troppo pericoloso.

Quindi il design a cui si è giunti è: invece di avere searcher che comunicano bundle che il produttore include nel proprio blocco, creeremo semplicemente l'intero blocco per te. In questo modo puoi semplicemente firmare ciecamente il blocco: non hai bisogno di sapere cosa c'è dentro, ti fidi che il costruttore ti stia dando un buon blocco.

Ora si ha questa catena ancora più profonda: il validatore a un'estremità, l'utente all'altra, e in mezzo tutta questa catena di intermediari che continua a diventare più fitta nel tempo. Il costruttore si occupa della parte di esecuzione mentre il validatore si occupa del consenso.

#### Come funzionano i relay di MEV-Boost (13:01) {#how-mev-boost-relays-work-1301}

Diciamo che sei un proponente e vuoi entrare in questo mercato. Questo servizio di produzione di blocchi è un classico problema di scambio equo: due parti che cercano di giungere a un accordo ma non si fidano l'una dell'altra. La letteratura classica ci dice che non si può fare uno scambio equo senza una terza parte fidata.

Ciò che usiamo oggi come terza parte fidata è quello che chiamiamo un **relay**: il relay di MEV-Boost. MEV-Boost è il nome del protocollo che media le interazioni tra costruttori e validatori. Il relay si pone nel mezzo per garantire che l'accordo vada a buon fine per entrambe le parti.

Il relay ha un paio di ruoli. In primo luogo, deve convalidare il payload di un costruttore: il relay vede in chiaro il blocco che il costruttore sta creando e può verificare che sia valido e possa essere proposto alla rete. C'è una variante chiamata relay ottimistico, in cui il relay non controlla immediatamente la validità ma chiede al costruttore un collaterale nel caso in cui il blocco risulti alla fine non valido.

In secondo luogo, i costruttori fanno delle offerte cercando di competere per diventare il costruttore selezionato dal validatore. Il relay funge da inoltratore di offerte, inviando le offerte al validatore. Poi, nell'ultimo passaggio, una volta che il validatore sceglie una delle offerte dal relay (e il validatore può connettersi a quanti relay desidera), la firma, sempre senza sapere quali siano i contenuti del blocco, e rimanda l'offerta firmata al relay. Data questa offerta firmata, il relay può rilasciare il blocco alla rete.

L'economia dei relay è complicata. Alcuni sono gratuiti, un po' come i beni pubblici. Altri hanno sviluppato modelli di reddito: il relay Ultrasound, ad esempio, ha un "adeguamento dell'offerta" in cui prendono la differenza tra l'offerta migliore e la seconda migliore come ricavo.

#### La fiducia e il relay (17:01) {#trust-and-the-relay-1701}

Il relay è la terza parte fidata nel sistema. Supponiamo che un relay serva un blocco non valido: le persone lo vedranno immediatamente perché è firmato e si disconnetteranno molto rapidamente da quel relay. Si può persino diffondere tramite gossip una sorta di prova di errore. Entro cinque blocchi, se il relay non funziona bene, le persone smetteranno di fidarsi e si disconnetteranno semplicemente.

Quindi si basa sulla fiducia, ma con il presupposto che possa essere sostituito in modo piuttosto rapido. I relay non sono validatori: non hanno necessariamente uno stake e non devono avere nulla a che fare con Ethereum. Potrebbero essere persone che conosciamo e amiamo oggi, ma domani potrebbe essere chiunque.

#### Integrare la PBS nel protocollo (20:01) {#enshrining-pbs-in-the-protocol-2001}

Stiamo cercando di eliminare lo status di terza parte fidata del relay. Abbiamo una terza parte fidata che ci piace in Ethereum, ed è Ethereum stesso. È possibile progettare soluzioni interne al protocollo che cercano essenzialmente di integrare il ruolo del relay e rendere opzionale la dipendenza da esso.

Al momento, il protocollo di Ethereum vede parte di ciò che stanno facendo i validatori, ma è completamente cieco rispetto alla rete dei costruttori. Stiamo cercando di spingere affinché il protocollo di Ethereum diventi la terza parte fidata nell'interazione tra proponente e costruttore: in questo senso, non avremo più bisogno di fare affidamento sul relay.

#### Vincolare i costruttori, amplificare la decentralizzazione (22:05) {#constraining-builders-amplifying-decentralization-2205}

Il quadro generale è importante. A ogni livello sembrano esserci giochi diversi in corso e giocatori diversi che si prendono soldi a vicenda: è di nuovo la finanza tradizionale? Voglio sostenere che questi compromessi non nascono da cattive intenzioni. Cercano di appoggiarsi alle proprietà di questi sistemi che riteniamo utili per scalarli e renderli più utili.

Vitalik ha parlato di un'asimmetria fondamentale dei servizi che una blockchain potrebbe offrire. Il consenso richiede un insieme decentralizzato molto ampio di persone che effettuano controlli. Ma alcuni servizi richiedono davvero che una sola persona faccia bene il lavoro e che tutti gli altri verifichino che il lavoro sia stato fatto bene. Abbiamo bisogno di un solo costruttore per creare un blocco, e poi tutti possono verificare che sia valido.

Oggi ci sono chiaramente tre costruttori dominanti: Beaver Build, Titan e rsync Builder. È un buono stato delle cose? Non proprio: possiamo fare di meglio. Ma è realistico immaginare che avremo tanti costruttori quanti validatori? Probabilmente no.

Ciò che vogliamo veramente è questo sottile livello di validatori che vincola e sfrutta il fatto che ci sono parti ad alta potenza nel mezzo che possono eseguire compiti che non richiedono presupposti di maggioranza onesta.

Alcune idee per vincolare i costruttori:

- **Elenchi di inclusione** (inclusion list): in cui il validatore dice al costruttore "devi includere queste transazioni nel tuo blocco"
- **Costruzione parziale dei blocchi**: suddividere l'intero blocco in modo che il costruttore non abbia il monopolio su tutto lo spazio
- **Riduzione delle dipendenze da terze parti**: integrare il ruolo del relay nel protocollo

Per amplificare la decentralizzazione dei validatori:

- **Separazione attestatore-proponente**: invece di rendere il validatore il produttore di blocchi per impostazione predefinita, scegliere un gruppo diverso di persone per diventare produttori di blocchi e separare i ruoli
- **Meccanismi di staking migliorati**: lo staking in Ethereum è un po' rudimentale oggi e può essere migliorato

#### Domande e chiusura (27:03) {#questions-and-closing-2703}

Una domanda dal pubblico: nel mondo della finanza tradizionale, il tempo di regolamento si sta riducendo da due giorni a un giorno. Ridurre il tempo di regolamento da 12 secondi a un intervallo più breve risolverebbe alcuni dei problemi di front-running?

Le persone ne stanno parlando: le chiamano **pre-conferme**. L'idea è che invii la tua transazione e qualcuno ti dice "sei dentro, a questo prezzo, su quello stato". Il fatto è che non puoi effettuare il regolamento più velocemente di quanto sia in esecuzione il protocollo. Non puoi ottenere un regolamento di definitività più veloce di 12 minuti. Non puoi muoverti più velocemente del tempo di blocco.

Accorciare il tempo di blocco è difficile perché vogliamo mantenere il livello dei validatori il più decentralizzato possibile, e accorciarlo aumenta semplicemente i requisiti hardware.