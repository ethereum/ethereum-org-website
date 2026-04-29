---
title: "Keynote: il VERO stato dei L2"
description: "Un intervento sullo stato attuale delle soluzioni di layer 2 (L2), che esamina il divario tra le promesse di sicurezza dei rollup e la realtà, proponendo un percorso verso una vera decentralizzazione."
lang: it
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "scalabilità-e-layer-2"
  - "rollup"
  - "layer-2"
format: presentation
author: Ethereum Foundation
breadcrumb: "Stato dei L2"
---

Un keynote di **Bartek Kiepuszewski**, fondatore di L2BEAT, alla Devcon SEA che esamina lo stato attuale delle soluzioni di layer 2 (L2), il divario tra le promesse di sicurezza dei rollup e la realtà, le nuove categorie di valutazione e l'impegno di L2BEAT a investire risorse significative nella verifica dei sistemi di prova nel corso del prossimo anno.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=ik2JxmHDmyw) pubblicata dalla Fondazione Ethereum. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione (0:00) {#introduction-000}

Essendo uno dei fondatori di L2BEAT, ho l'opportunità unica di lavorare praticamente con ogni singolo team di L2 in circolazione, e collaboriamo con loro fin dagli albori di questo settore, ovvero circa quattro anni fa. È incredibile. Il tempo vola davvero in fretta. Abbiamo lavorato con i primi pionieri della tecnologia a conoscenza zero (ZK), abbiamo lavorato con il Plasma Group che poi è stato rinominato in Optimism, abbiamo lavorato con Arbitrum. E da questo palco voglio ringraziare tutti questi team, perché senza il vostro supporto non saremmo certamente qui. Come L2BEAT, siamo estremamente grati per tutto il supporto che la community ci offre.

Diamo quindi un'occhiata a ciò che siamo riusciti a realizzare. Prima di tutto, siamo riusciti a lanciare quasi 50 rollup e oltre 50 altri L2. È un traguardo incredibile: sono tantissimi sistemi e ne abbiamo quasi altrettanti da lanciare nei prossimi mesi. Abbiamo inserito molto valore, molto valore totale bloccato (TVL), anche in questi sistemi e, se guardate i grafici, continuano tutti a salire.

Il punto è che, con tutta questa crescita, arrivano anche molte responsabilità. Dobbiamo capire che gli utenti finali che utilizzano questi sistemi stanno investendo denaro in questi rollup perché credono che i rollup ereditino la sicurezza di Ethereum. Con questa consapevolezza, a mio parere, dobbiamo iniziare a fare sul serio riguardo alla sicurezza.

#### Scalare Ethereum (2:10) {#scaling-ethereum-210}

Siamo anche riusciti a scalare Ethereum. Ethereum procedeva piuttosto bene, ma ha iniziato a diventare davvero lento rispetto alla domanda e le commissioni stavano diventando molto alte. Quindi stiamo sicuramente scalando: anche questi numeri stanno salendo. È incredibile.

Tuttavia, c'è un "ma". Sapete, ragazzi, c'è sempre un "ma", giusto? E sono qui solo per essere onesto con tutti voi. Voglio davvero che questo settore diventi serio, e questa è la mia occasione per chiedere il vostro supporto per assicurarci di non fallire: non deludere le aspettative della community. Dobbiamo iniziare a prendere davvero sul serio la sicurezza di ciò che stiamo costruendo.

Perché sapete, abbiamo usato le rotelle per troppo tempo. Se sei un adulto che usa le rotelle (e ripeto, sono passati quattro anni), allora sei davvero immaturo. Va bene usare le rotelle se sei un bambino. Non va bene usarle se sei un adulto. E penso che sia giunto il momento per tutti noi di smettere di essere timidi al riguardo. Dovremmo tutti farci sentire e non dovremmo soffrire della sindrome dei vestiti nuovi dell'imperatore.

#### Il grande "ma": la mancanza di sistemi di prova (4:30) {#the-big-but-missing-proof-systems-430}

Quindi qual è questo grande "ma"? Beh, prima di tutto, la maggior parte dei L2 oggi non ha un sistema di prova, il che è in qualche modo sorprendente perché i primi pionieri come StarkNet, zkSync, Aztec, quattro anni fa, quando lanciavano i loro primi rollup specifici per le applicazioni, avevano sistemi di prova. Quindi sì, oggi puoi lanciare un L2 con un clic. Tuttavia, è davvero un L2? È davvero un rollup? Quello che stai facendo è lanciare qualcosa che è protetto da un multisig. Non credo che sia sufficiente.

Lo stato dell'ecosistema oggi è un po' come in questo diagramma. A sinistra potete vedere gli attuali L2 con un sistema di prova. A destra potete vedere gli attuali L2 senza un sistema di prova. E scommetterei che la stragrande maggioranza dei prossimi L2 non avrà un sistema di prova. Questo includerebbe essenzialmente ogni singola catena OP Stack ad eccezione di OP Mainnet e Base (e complimenti a loro, a proposito, sono dei campioni). Tuttavia, ogni singola altra catena OP Stack semplicemente non ha un sistema di prova.

Quel grafico a destra includerà anche tutti gli stack Orbit, che hanno un sistema di prova, tuttavia è in realtà dietro una whitelist autorizzata spesso molto breve. A volte questa whitelist è composta da un solo attore: è lo stesso del proponente di stato. È essenzialmente il proponente di stato e sono solo loro a potersi sfidare da soli. Cioè, cosa? Sul serio.

#### Consigli di sicurezza (6:00) {#security-councils-600}

Ora, la maggior parte dei L2 non utilizza consigli di sicurezza. Cosa intendiamo per consiglio di sicurezza? Un consiglio di sicurezza è essenzialmente un multisig composto da almeno otto partecipanti e che richiede una soglia di consenso del 75%. Quindi potete pensarlo come un grande multisig, ma non si tratta solo delle dimensioni: si tratta del fatto che vogliamo che i partecipanti siano geograficamente decentralizzati. Potreste aver sentito ieri una fantastica presentazione sulla necessità di diversificazione geografica. Questo è ciò che vogliamo da queste strutture. Ed essenzialmente, vogliamo che i partecipanti provengano soprattutto da aziende diverse e giurisdizioni diverse. Questo è importantissimo e vi mostrerò alcuni esempi del perché.

Pensate ai consigli di sicurezza come a questi multisig potenziati. C'è un livello sociale molto importante dietro di essi. Quindi questo è lo stato attuale delle cose e, ripeto, è molto negativo. Abbiamo consigli di sicurezza solo in Arbitrum, Optimism, Polygon, zkSync (e so che StarkNet, Scroll e, curiosamente, Fuel stanno per essere lanciati con un consiglio di sicurezza). Tutti gli altri sono essenzialmente un multisig molto piccolo, interno, spesso privato e, francamente, è estremamente difficile distinguere tra questi multisig e dei semplici EOA.

#### Assunzioni di fiducia sulla disponibilità dei dati (7:25) {#data-availability-trust-assumptions-725}

Il terzo grande errore che abbiamo commesso è che la maggior parte dei L2 non rollup sono configurati con assunzioni di fiducia sulla disponibilità dei dati (DA) pessime. E uso la parola "pessime": A, perché mi piace, e B, perché è davvero, davvero un disastro.

Guardate questi esempi a sinistra: Arbitrum, StarkEx, Immutable X. Tuttavia, quasi tutti gli altri stanno letteralmente pubblicando la DA sul loro server in cantina o chissà dove. Non ne abbiamo idea. Non ne abbiamo letteralmente idea. Il punto è che sono davvero pessimi e non sembrano preoccuparsene. Quindi forse agli utenti non importa, non lo sappiamo. Ma dobbiamo davvero guardare quei dati e dire a tutti: ehi, questo non è un comitato per la disponibilità dei dati.

Un comitato per la disponibilità dei dati è stato originariamente creato e promosso da StarkWare per le implementazioni StarkEx e da Arbitrum. Ma non era questo il punto: poter dire "Ho un server in cantina, posso chiamarlo comitato per la disponibilità dei dati". Non era questo lo scopo di quell'esercizio.

Quindi, nel complesso, mi dispiace dirlo, ma al momento nella maggior parte dei L2, gli operatori autorizzati possono rubare o congelare i vostri fondi. Siamo qui per rendervi tutti consapevoli di questo. Mi dispiace dirlo, ma dobbiamo cambiare atteggiamento.

#### Perché i sistemi di prova sono importanti (8:40) {#why-proof-systems-matter-840}

Perché dovremmo preoccuparci dei sistemi di prova? Ci sono almeno tre buone ragioni, secondo noi, per cui dovremmo tutti avere un sistema di prova funzionante.

Una è che in realtà consente un'uscita permissionless nel caso in cui tutti gli operatori siano inattivi (e potrebbero esserlo per qualsiasi motivo). Abbiamo avuto di recente un caso in cui dYdX è andato offline. Hanno avvertito gli utenti, molti utenti non sono usciti. Tuttavia, se si dispone di un sistema di prova, è possibile configurare il sistema in modo che qualcuno subentri in modo permissionless, oppure è possibile creare un meccanismo di salvaguardia in modo che gli utenti possano prelevare i propri fondi. Questo è importantissimo. Senza un sistema di prova, semplicemente non si può fare: è impossibile.

Il secondo motivo è che si possono effettivamente migliorare le assunzioni di fiducia del consiglio di sicurezza (supponendo ovviamente di averne uno). E il motivo è piuttosto sfumato. Quello che si può fare ora è questo: invece della situazione in cui un proponente malintenzionato (e questo è il diagramma che mostra il rollup ottimistico base senza un sistema di prova, che si può vedere in molti OP Stack oggi) c'è un multisig molto forte che può sovrascrivere la radice di stato, e c'è un proponente che propone le radici di stato. Se quella proposta è dannosa, tutto ciò che devono fare è corrompere una minoranza dei membri del consiglio di sicurezza affinché guardino dall'altra parte: non per fare qualcosa di dannoso, ma semplicemente per non fare nulla, nel qual caso la proposta dannosa passerà effettivamente e ruberanno i fondi.

Una volta introdotto un sistema di prova, la situazione è molto più difficile per il proponente malintenzionato, perché ora deve corrompere la **maggioranza** del consiglio di sicurezza. Non solo deve corrompere la maggioranza, ma deve effettivamente farle fare qualcosa di dannoso, non semplicemente guardare dall'altra parte. È una prospettiva molto diversa. Far guardare qualcuno dall'altra parte significa dire: "Ehi, se ti do 10 milioni di dollari, perdi semplicemente le chiavi o fai un lungo volo internazionale". Se vuoi far fare a qualcuno qualcosa di dannoso, è una prospettiva completamente diversa. Riteniamo che questo cambi radicalmente le assunzioni di fiducia, specialmente con un consiglio di sicurezza pubblico.

Infine, i sistemi di prova (se si è nella Fase 2) consentono di rimuovere qualsiasi intermediario. Non c'è bisogno di un consiglio di sicurezza o, se lo si ha, è solo per situazioni di emergenza. Quindi questo potrebbe effettivamente avere profonde implicazioni normative. Si potrebbe voler lanciare il proprio L2 come sistema di Fase 2 fin dall'inizio. È possibile, ma ovviamente è necessario disporre di un sistema di prova: idealmente se ne potrebbe volere più di uno. Ci sono già alcuni annunci di sistemi che lo fanno, come il recente annuncio del team di Nethermind che sta costruendo un rollup destinato a essere di Fase 2 al momento del lancio.

#### Perché i consigli di sicurezza e non i multisig (11:29) {#why-security-councils-not-multisigs-1129}

Questo riguardava i sistemi di prova. Ora, perché i consigli di sicurezza e non dei semplici multisig? Il motivo è: non credete che i multisig siano multisig. Questo è il motivo, a meno che non ci sia un livello sociale che possa effettivamente convincervi che siano fondamentalmente diversificati.

Abbiamo avuto diversi grandi eventi nella nostra storia. Abbiamo avuto Multichain che sosteneva di essere molto decentralizzato, e si è scoperto che no, non lo era (e questa è un'affermazione che non si può davvero verificare in modo indipendente). Un enorme attacco, o un lavoro dall'interno, o un rug pull: non ne siamo sicuri.

Poi abbiamo avuto una situazione con Oasis, in cui sono stati contattati da un tribunale del Regno Unito e hanno dovuto effettivamente utilizzare il multisig per estrarre alcuni fondi dal protocollo. Sarebbe stato impossibile farlo se si fosse avuto un consiglio di sicurezza geopoliticamente diversificato, perché non c'è un'ordinanza del tribunale che possa effettivamente raggiungere tutti.

Infine, molto di recente abbiamo avuto un attacco a un multisig. Non pensate nemmeno per un secondo che i multisig non possano essere attaccati. Alla fine dobbiamo sbarazzarci di tutti loro.

Quindi, per riassumere: se si ha un rollup di Fase 0 senza consiglio di sicurezza, essenzialmente un operatore malintenzionato può fare quello che vuole con i vostri fondi. Se si è un rollup di Fase 0 con un consiglio di sicurezza, allora un utente malintenzionato deve corrompere una minoranza del consiglio di sicurezza: forse una cosa difficile da fare, ma molto più facile che corrompere la maggioranza del consiglio di sicurezza, cosa che si dovrebbe fare se il rollup avesse un sistema di prova. E infine, nessuno può rubare i vostri fondi se siete nella Fase 2. Questa è la promessa di arrivare alla Fase 2.

#### Riclassificazione proposta (13:10) {#proposed-reclassification-1310}

La domanda è: abbiamo gli incentivi giusti affinché i progetti se ne preoccupino davvero? Il problema è che l'unica cosa che possiamo fare (noi come L2BEAT e noi come community di Ethereum) è applicare pressione sociale. Vitalik ha detto che a partire dal prossimo anno ha in programma di menzionare pubblicamente solo i L2 che sono di Fase 1. In precedenza aveva persino detto che non chiamerà i sistemi rollup se non sono di Fase 1.

Quindi ci chiedevamo cosa potessimo fare. Al momento abbiamo delle fasi per i rollup. Non abbiamo fasi per i validium e gli optimium. Ci siamo chiesti per molto tempo: forse potremmo introdurre la "Fase 0+" per i sistemi che hanno sistemi di prova ma non sono ancora di Fase 1. Ma dopo mesi di discussioni, abbiamo deciso: no, è ora di crescere.

Quello che stiamo proponendo alla community (e questo andrà sul forum per il feedback della community) è questo. Innanzitutto, vogliamo creare una categoria separata per i sistemi. La differenza principale è che si dovrà avere un sistema di prova per essere di Fase 0. Quindi, ad esempio, StarkNet oggi sarà di Fase 0 in base a questa classificazione. Tutte le catene OP Stack che non hanno un sistema di prova (tranne Base e Optimism) non rientreranno in questa categoria. E, naturalmente, daremo tempo ai sistemi per adeguarsi. Questa è la categoria principale e dovrebbe essere come una super lega di sistemi.

Poi c'è un'altra categoria di sistemi che non utilizzano la DA di Ethereum. Utilizzano assunzioni di fiducia aggiuntive che derivano da una DA esterna. Li chiamiamo "alt-DA" ma includerebbero validium, optimium e qualsiasi costruzione ibrida si possa creare. Tuttavia, devono fornire garanzie di DA ragionevoli: non può essere la vostra cantina. Deve essere un comitato per la disponibilità dei dati di dimensioni ragionevoli o, se si utilizza Celestia o Avail, è necessario utilizzare il ponte.

#### La categoria "altri" e l'impegno di L2BEAT (16:05) {#the-others-category-and-l2beats-pledge-1605}

E gli altri? Li inseriremo in una terza categoria, che chiamiamo (e ora aspetto il feedback della community su come nominare questi sistemi) con il nome provvisorio di "altri". Il punto è che sono protetti da multisig e noi esporremo questi multisig per quello che sono. Questo è ciò che vogliamo fare nella nostra interfaccia utente.

L'interfaccia utente avrà all'incirca questo aspetto: vedrete questa suddivisione: rollup, validium e optimium, e altri. E l'ordinamento predefinito sarà in base alla sicurezza, non in base al TVL. Non inseguiamo il TVL con una scarsa sicurezza: finirà molto male.

Promuoveremo i progetti di Fase 1 e Fase 2. Considereremo i progetti di Fase 0 come contendenti. Per gli "altri", saremo felici di elencarli: saremo estremamente liberali. È sufficiente essere essenzialmente allineati con Ethereum e ovviamente avere un ponte che consenta di spostare i fondi. Tuttavia, esamineremo le assunzioni di fiducia e i multisig, e speriamo che lentamente ma inesorabilmente i sistemi passino da "altri" a validium/optimium o a rollup.

Questo è l'aspetto che pensiamo avrebbe la categoria "altri": questi sono i dati reali in questo momento, i sistemi reali che potrebbero rientrare in questa categoria se non introducono un sistema di prova. Vedrete esattamente chi è il proponente, chi è lo sfidante e chi è l'aggiornatore. La cosa divertente è che potete vederlo oggi su L2BEAT: è solo che queste informazioni sono così nascoste in profondità nella pagina dei dettagli che scommetto che solo i ricercatori e gli appassionati le controllano. È tutto disponibile oggi. Tuttavia, vogliamo esporre i dati agli utenti finali. Vogliamo che gli utenti finali siano veramente consapevoli di ciò che sta accadendo, in modo che siamo tutti responsabili dei sistemi che stiamo costruendo.

È sufficiente dire semplicemente "Ho un sistema di prova"? No. Il nostro impegno nei confronti della community come L2BEAT è che l'anno prossimo investiremo risorse significative per esaminare a fondo e in modo molto approfondito questi sistemi di prova per assicurarci che siano validi e completi. Analizzeremo sia quelli ZK che quelli ottimistici. Entreremo nel codice sorgente, guarderemo come avete creato la vostra configurazione attendibile, esamineremo i vostri circuiti e vedremo cosa viene esattamente verificato onchain. Vogliamo rendere tutto super trasparente in modo che le assunzioni di fiducia siano comunicate chiaramente e, cosa più importante, il vostro sistema di prova non possa essere nascosto dietro una whitelist irragionevolmente piccola.

Stiamo assumendo ricercatori. Faremo tutto questo lavoro. Questo è il nostro impegno per il prossimo anno. Spero che il prossimo anno sarà l'anno dei L2 e dei rollup; tuttavia, non si tratta di lanciare un rollup con un clic. Il punto è che si vuole essere in grado di lanciare un sistema con una buona sicurezza. Idealmente si vuole ereditare quanta più sicurezza possibile da Ethereum. C'è molto lavoro da fare per tutti noi per raggiungere questo obiettivo. Ma se non lo facciamo, allora tutto ciò che stiamo facendo è essenzialmente creare migliaia di sidechain insicure. Non credo che lo vogliamo, come community.

#### Domande e risposte (18:45) {#qa-1845}

**Presentatore:** Passiamo alle domande e risposte. È importante che i rollup abbiano un sequencer decentralizzato o sono sufficienti altri meccanismi di sicurezza?

**Bartek Kiepuszewski:** Questa è una domanda molto buona e importante. Penso che vedremo design diversi. Non credo che decentralizzare il sequencer sia importantissimo per la sicurezza dei fondi degli utenti, ma potrebbe essere importante per la resistenza alla censura in tempo reale in determinate situazioni. Vitalik ha detto durante il suo keynote di apertura che il futuro potrebbe essere quello di vedere i rollup diventare "based" (sfruttando l'infrastruttura di Ethereum per combattere la resistenza alla censura in tempo reale), mentre altri, come ad esempio MegaETH, potrebbero in realtà avere un sequencer molto centralizzato e fare affidamento solo sul meccanismo di salvaguardia. Potremmo vedere costruzioni ibride. Penso che lo spazio di progettazione sia enorme e in questo momento a L2BEAT vogliamo davvero vedere cosa succederà e come si evolverà la situazione.

**Presentatore:** I sistemi di prova basati su TEE saranno considerati di Fase 2 anche se implicano fiducia nel produttore dell'hardware?

**Bartek Kiepuszewski:** La risposta breve è no, perché con le costruzioni che vediamo oggi, se si utilizza SGX, Intel potrebbe inviare una prova e potrebbe potenzialmente bloccare, rubare o congelare tutto ciò che vuole senza che nessuno se ne accorga davvero (e senza che Ethereum se ne accorga). Tuttavia, con tutto il lavoro che si sta portando avanti per creare TEE trustless e permissionless... mi dicono che questo è in realtà un lavoro estremamente entusiasmante. Ma la risposta breve è: oggi, no.

**Presentatore:** Perché Optimism è classificato come Fase 1? In base alla valutazione, non lo sono: la Fondazione controlla interamente il processo di proposta.

**Bartek Kiepuszewski:** Soddisfano essenzialmente tutti i criteri. Non si tratta tanto del processo di proposta, ma di chi controlla i fondi. Si può avere un proponente centralizzato, tuttavia c'è un'alternativa di riserva. Se vanno offline, l'intero sistema diventa più permissionless. Penso che sia importante riconoscere qual è il ruolo del consiglio di sicurezza. Vogliamo che i sistemi di Fase 1 consentano l'uscita se il proponente centralizzato si ferma. Ad esempio, con dYdX, la proposta era super centralizzata, tuttavia quando si sono fermati, le persone hanno potuto uscire. Quindi non si tratta di essere centralizzati o decentralizzati: si tratta di poter effettivamente uscire in modo permissionless.

Hanno soddisfatto tutti i criteri. Stavamo perfezionando, a proposito: i criteri non sono qualcosa di scolpito nella pietra perché tutti questi sistemi si stanno evolvendo, quindi dobbiamo evolverci con questi sistemi. I criteri potrebbero cambiare un po' e stiamo guardando molto da vicino sia Optimism che Arbitrum perché chiaramente sono i due leader. Ci sono molte sfumature in cui non ho tempo di addentrarmi. Ma non è che si ha una designazione di fase per sempre: se ci sono nuove informazioni o qualcosa che potremmo aver saltato o perso, è del tutto possibile che si possa perdere quella designazione.

**Presentatore:** Quali sono i motivi principali per cui i progetti non costruiscono verso la Fase 1?

**Bartek Kiepuszewski:** Complessità, tempo, costi, talento. È sorprendentemente costoso. Come ho detto, i pionieri quattro anni fa stavano essenzialmente costruendo: dYdX è stato letteralmente uno dei primi, se non il primo, rollup ZK. Era specifico per l'applicazione, ma era comunque il primo. E se non fosse per piccole sfumature, sarebbe di Fase 2: in realtà, è il processo di governance che richiediamo per la Fase 2 a mancare. Ma a tutti gli effetti, è un sistema di Fase 2. È stato costruito quattro anni fa, quindi non è che sia impossibile.

Penso che ciò che rende super difficile oggi per tutti i rollup farlo effettivamente, francamente, è che la maggior parte dei rollup non sono costruiti dai team: sono lanciati da fornitori di rollup-as-a-service e dobbiamo incentivarli a fare effettivamente meglio. Ed è difficile. Nessuno ha detto che sarebbe stato facile.