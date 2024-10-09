---
title: Verifica formale dei contratti intelligenti
description: Una panoramica della verifica formale per i contratti intelligenti di Ethereum
lang: it
---

I [contratti intelligenti](/developers/docs/smart-contracts/) consentono di creare applicazioni decentralizzate, affidabili e robuste che introducono nuovi casi d'uso e creano valore per gli utenti. Poiché i contratti intelligenti gestiscono grandi quantità di valore, la sicurezza è una considerazione fondamentale per gli sviluppatori.

La verifica formale è una delle tecniche consigliate per migliorare la [sicurezza dei contratti intelligenti](/developers/docs/smart-contracts/security/). La verifica formale, che utilizza i [metodi formali](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) per specificare, progettare e verificare i programmi, è stata utilizzata per anni per assicurare la correttezza di sistemi hardware e software fondamentali.

Quando implementata nei contratti intelligenti, la verifica formale può dimostrare che la logica aziendale di un contratto soddisfa una specifica predefinita. Rispetto ad altri metodi di valutazione della correttezza del codice di un contratto, come i test, la verifica formale fornisce maggiori garanzie che un contratto intelligente sia funzionalmente corretto.

## Cosa è la verifica formale? {#what-is-formal-verification}

La verifica formale si riferisce al processo di valutazione della correttezza di un sistema rispetto a una specifica formale. In termini più semplici, ci consente di verificare se il comportamento di un sistema soddisfa dei requisiti (cioè, fa ciò che vogliamo).

I comportamenti previsti del sistema (un contratto intelligente, in questo caso) sono descritti utilizzando la modellizzazione formale, mentre i linguaggi di specifica consentono la creazione di proprietà formali. Le tecniche di verifica formale possono quindi verificare che l'implementazione di un contratto sia conforme con le sue specifiche e ricavare la prova matematica della relativa correttezza. Quando un contratto soddisfa le sue specifiche, è descritto come "funzionalmente corretto", "corretto per progettazione" o "corretto per costruzione".

### Cosa è un modello formale? {#what-is-a-formal-model}

In informatica, un [modello formale](https://en.wikipedia.org/wiki/Model_of_computation) è una descrizione matematica di un processo di calcolo. I programmi sono astratti in funzioni matematiche (equazioni) e il modello descrive come, dato un input, vengono calcolati i risultati delle funzioni.

I modelli formali forniscono un livello di astrazione su cui è valutabile l'analisi del comportamento di un programma. L'esistenza di modelli formali consente la creazione di una _specifica formale_, che descrive le proprietà desiderate del modello in questione.

Sono utilizzate diverse tecniche per modellizzare i contratti intelligenti per la verifica formale. Ad esempio, alcuni modelli sono utilizzati per ragionare sul comportamento di alto livello di un contratto intelligente. Queste tecniche di modellizzazione applicano una visualizzazione a scatola nera ai contratti intelligenti, visualizzandoli come sistemi che accettano input ed eseguono calcoli sulla base degli stessi.

I modelli di alto livello si concentrano sulla relazione tra contratti intelligenti e agenti esterni, come conti posseduti esternamente (EOA), conti di contratti e l'ambiente della blockchain. Tali modelli sono utili per definire le proprietà che specificano come un contratto dovrebbe comportarsi in risposta a determinate interazioni degli utenti.

Al contrario, altri modelli formali si concentrano sul comportamento di basso livello di un contratto intelligente. Sebbene i modelli di alto livello possano aiutare a ragionare sulla funzionalità di un contratto, potrebbero non riuscire a catturare i dettagli sui meccanismi interni dell'implementazione. I modelli di basso livello applicano una visualizzazione a scatola bianca per analizzare il programma e si affidano a rappresentazioni di basso livello delle applicazioni del contratto intelligente, quali tracce del programma e [grafici del flusso di controllo](https://en.wikipedia.org/wiki/Control-flow_graph), per ragionare sulle proprietà rilevanti alla sua esecuzione.

I modelli di basso livello sono considerati ideali perché rappresentano l'effettiva esecuzione di un contratto intelligente nell'ambiente di esecuzione di Ethereum (cioè, l'[EVM](/developers/docs/evm/)). Le tecniche di modellizzazione di basso livello sono particolarmente utili nello stabilire le proprietà di sicurezza essenziali nei contratti intelligenti e nel rilevare le potenziali vulnerabilità.

### Cosa è una specifica formale? {#what-is-a-formal-specification}

Una specifica è semplicemente un requisito tecnico che uno specifico sistema deve soddisfare. Nella programmazione, le specifiche rappresentano delle idee generali sull'esecuzione di un programma (cioè, cosa il programma dovrebbe fare).

Nel contesto dei contratti intelligenti, le specifiche formali si riferiscono alle _proprietà_: descrizioni formali dei requisiti che un contratto deve soddisfare. Tali proprietà sono descritte come "invarianti" e rappresentano asserzioni logiche sull'esecuzione di un contratto che devono rimanere vere in ogni circostanza possibile, senza eccezione alcuna.

Dunque, possiamo pensare a una specifica formale come una raccolta di dichiarazioni scritte in un linguaggio formale che descrivono l'esecuzione prevista di un contratto intelligente. Le specifiche coprono le proprietà di un contratto e definiscono come questo dovrebbe comportarsi in circostanze diverse. Lo scopo della verifica formale è determinare se un contratto intelligente possiede tali proprietà (invarianti) e che queste non siano violate durante l'esecuzione.

Le specifiche formali sono essenziali per sviluppare implementazioni sicure dei contratti intelligenti. I contratti che non riescono a implementare le invarianti o le cui proprietà sono violate durante l'esecuzione, sono soggetti a vulnerabilità che possono danneggiare la funzionalità o causare sfruttamenti malevoli.

## Tipi di specifiche formali per contratti intelligenti {#formal-specifications-for-smart-contracts}

Le specifiche formali consentono il ragionamento matematico sulla correttezza dell'esecuzione del programma. Come i modelli formali, le specifiche formali possono catturare le proprietà di alto livello o i comportamenti di basso livello dell'implementazione di un contratto.

Le specifiche formali sono derivate utilizzando elementi della [logica del programma](https://en.wikipedia.org/wiki/Logic_programming), che consentono il ragionamento formale sulle proprietà di un programma. La logica di un programma contiene le regole formali che esprimono (in linguaggio matematico) il comportamento previsto di un programma. Varie logiche del programma sono utilizzate nella creazione di specifiche formali, tra cui la [logica di raggiungibilità](https://en.wikipedia.org/wiki/Reachability_problem), la [logica temporale](https://en.wikipedia.org/wiki/Temporal_logic) e la [logica di Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Le specifiche formali per i contratti intelligenti sono classificabili ampiamente come specifiche di **alto livello** o di **basso livello**. Indipendentemente dalla categoria cui appartiene una specifica, deve descrivere adeguatamente e inequivocabilmente la proprietà del sistema analizzato.

### Specifiche di alto livello {#high-level-specifications}

Come suggerisce il nome, una specifica di alto livello (anche detta "specifica orientata al modello") descrive il comportamento di alto livello di un programma. Le specifiche di alto livello modellizzano un contratto intelligente come una [macchina a stato finito](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), che può passare tra stati eseguendo operazioni, utilizzando la logica temporale per definire le proprietà formali per il modello FSM.

Le [logiche temporali](https://en.wikipedia.org/wiki/Temporal_logic) sono "regole per ragionare sulle proposizioni qualificate in termini di tempo (es. "Ho _sempre_ fame" o "_Prima o poi_ avrò fame")." Quando applicate alla verifica formale, le logiche temporali sono utilizzate per dichiarare le asserzioni sul comportamento corretto dei sistemi modellizzati come macchine di stato. Nello specifico, una logica temporale descrive gli stati futuri in cui un contratto intelligente può trovarsi e come passa tra gli stati.

Le specifiche di alto livello catturano generalmente due proprietà temporali essenziali per i contratti intelligenti: **sicurezza** e **vitalità**. Le proprietà di sicurezza rappresentano l'idea che "non si verifica mai nulla di male" e solitamente esprimono invarianza. Una proprietà di sicurezza potrebbe definire i requisiti software generali, quali la libertà da [stallo](https://www.techtarget.com/whatis/definition/deadlock), o esprimere proprietà specifiche del dominio per i contratti (es., le invarianti sul controllo dell'accesso per le funzioni, i valori ammissibili delle variabili di stato o le condizioni per i trasferimenti di token).

Prendiamo ad esempio questo requisito di sicurezza che copre le condizioni per l'utilizzo del `transfer()` o `transferFrom()` nei contratti di token ERC-20: _“Il saldo di un mittente non è mai inferiore alla quantità richiesta di token da inviare._ Questa descrizione in linguaggio naturale dell'invariante di un contratto è traducibile in una specifica (matematica) formale, rigorosamente verificabile per la validità.

Le proprietà di vitalità asseriscono che "prima o poi si verifica qualcosa di buono" e riguardano la capacità di un contratto di progredire tra diversi stati. Un esempio di proprietà di vitalità è la "liquidità", che si riferisce alla capacità di un contratto di trasferire i propri saldi agli utenti su richiesta. Se questa proprietà viene violata, gli utenti non potrebbero prelevare le risorse memorizzate nel contratto, come avvenuto con l'[incidente del portafoglio Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Specifiche di basso livello {#low-level-specifications}

Le specifiche di alto livello prendono come punto di partenza un modello di stato finito di un contratto e definiscono le proprietà desiderate di questo modello. Al contrario, le specifiche di basso livello (anche dette "specifiche orientate alla proprietà") spesso modellizzano i programmi (contratti intelligenti) come sistemi che comprendono una raccolta di funzioni matematiche e descrivono il comportamento corretto di tali sistemi.

In termini più semplici, le specifiche di basso livello analizzano le _tracce del programma_ e tentano di definire le proprietà di un contratto intelligente sulla base delle stesse. Le tracce si riferiscono a sequenze delle esecuzioni della funzione che alterano lo stato di un contratto intelligente; dunque, le specifiche di basso livello aiutano a specificare i requisiti per l'esecuzione interna di un contratto.

Le specifiche formali di basso livello possono essere date come proprietà in stile Hoare o invarianti sui percorsi d'esecuzione.

### Proprietà in stile Hoare {#hoare-style-properties}

La [logica di Hoare](https://en.wikipedia.org/wiki/Hoare_logic) fornisce una serie di regole formali per ragionare sulla correttezza dei programmi, contratti intelligenti inclusi. Una proprietà in stile Hoare è rappresentata da una tripletta di Hoare {_P_}_c_{_Q_}, dove _c_ è un programma e _P_ e _Q_ sono predicati sullo stato della _c_ (cioè, il programma), formalmente descritte rispettivamente come _precondizioni_ e _postcondizioni_.

Una precondizione è un predicato che descrive le condizioni richieste per l'esecuzione corretta di una funzione; gli utenti che chiamano il contratto devono soddisfare tale requisito. Una postcondizione è un predicato che descrive la condizione che una funzione stabilisce se eseguita correttamente; gli utenti possono prevedere che questa condizione sia vera dopo aver chiamato la funzione. Un'_invariante_ nella logica di Hoare è un predicato che è preservato dall'esecuzione di una funzione (cioè, non cambia).

Le specifiche in stile Hoare possono garantire la _correttezza parziale_ o la _correttezza totale_. L'implementazione della funzione di un contratto è "parzialmente corretta" se la precondizione resta vera prima dell'esecuzione della funzione e, se l'esecuzione termina, anche la postcondizione è vera. La prova di correttezza totale è ottenuta se una precondizione è vera prima dell'esecuzione della funzione, è garantito che l'esecuzione termini e, quando lo fa, la postcondizione resta vera.

L'ottenimento della prova di correttezza totale è difficile, poiché alcune esecuzioni potrebbero tardare a terminare, o non terminare affatto. Detto ciò, il fatto che l'esecuzione termini è probabilmente una questione irrilevante, poiché il meccanismo di carburante di Ethereum impedisce i cicli infiniti del programma (l'esecuzione termina con esito positivo o a causa dell'errore 'carburante terminato').

Le specifiche dei contratti intelligenti create utilizzando la logica di Hoare avranno precondizioni, postcondizioni e invarianti definite per l'esecuzione di funzioni e cicli in un contratto. Le precondizioni spesso includono la possibilità di input errati a una funzione, con le postcondizioni che descrivono la risposta prevista per tali input (es., generare un'eccezione specifica). In questo modo le proprietà in stile Hoare sono efficaci per garantire la correttezza delle implementazioni del contratto.

Molti quadri di verifica formale utilizzano le specifiche in stile Hoare per provare la correttezza semantica delle funzioni. Inoltre, è possibile aggiungere le proprietà in stile Hoare (come asserzioni) direttamente al codice del contratto utilizzando le istruzioni `require` e `assert` in Solidity.

Le dichiarazioni `require` esprimono una precondizione o invariante e sono spesso utilizzate per convalidare gli input dell'utente, mentre `assert` cattura una postcondizione necessaria per la sicurezza. Per esempio, il controllo adeguato dell'accesso per le funzioni (un esempio di proprietà di sicurezza) può essere ottenuto utilizzando `require` come controllo della precondizione sull'identità del conto chiamante. Analogamente, un'invariante sui valori di stato ammissibili delle variabili di stato in un contratto (es. numero totale di token in circolazione) può essere protetta dalla violazione utilizzando `assert` per confermare lo stato del contratto dopo l'esecuzione della funzione.

### Proprietà a livello di traccia {#trace-level-properties}

Le specifiche basate sulla traccia descrivono le operazioni che fanno passare un contratto tra diversi stati e le relazioni tra di esse. Come spiegato in precedenza, le tracce sono sequenze di operazioni che alterano lo stato di un contratto in un certo modo.

Questo approccio si basa sul modello dei contratti intelligenti come sistemi di transizione di stato con degli stati predefiniti (descritti dalle variabili di stato), insieme a una serie di transizioni predefinite (descritte dalle funzioni del contratto). Inoltre, un [grafico del flusso di controllo](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), che è una rappresentazione grafica del flusso d'esecuzione di un programma, è spesso utilizzato per descrivere la semantica operativa di un contratto. Qui ogni traccia è rappresentata come un percorso sul grafico del flusso di controllo.

In primo luogo, le specifiche a livello di traccia sono utilizzate per ragionare sui modelli d'esecuzione interna nei contratti intelligenti. Creando delle specifiche al livello di traccia, asseriamo i percorsi d'esecuzione ammissibili (cioè, le transizioni di stato) per un contratto intelligente. Utilizzando le tecniche, come l'esecuzione simbolica, possiamo verificare formalmente che l'esecuzione non segua mai un percorso non definito nel modello formale.

Utilizziamo un esempio di contratto [DAO](/dao/) avente delle funzioni accessibili pubblicamente per descrivere le proprietà a livello di traccia. Qui, supponiamo che il contratto DAO consenta agli utenti di eseguire le seguenti operazioni:

- Depositare fondi

- Votare una proposta dopo aver depositato fondi

- Richiedere un rimborso se non votano una proposta

Le proprietà a livello di traccia dell'esempio potrebbero essere _"gli utenti che non depositano fondi non possono votare una proposta"_ o _"gli utenti che non votano una proposta dovrebbero sempre poter richiedere un rimborso"_. Entrambe le proprietà affermano delle sequenze preferite d'esecuzione (il voto non può verificarsi _prima_ di depositare i fondi e non si può richiedere un rimborso _dopo_ aver votato una proposta).

## Tecniche di verifica formale dei contratti intelligenti {#formal-verification-techniques}

### Controllo del modello {#model-checking}

Il controllo del modello è una tecnica di verifica formale in cui un algoritmo controlla il modello formale di un contratto intelligente rispetto alla sua specifica. Nel controllo del modello i contratti intelligenti sono spesso rappresentati come sistemi di transizione di stato, mentre le proprietà sugli stati permissibili del contratto sono definiti utilizzando la logica temporale.

Il controllo del modello richiede la creazione di una rappresentazione matematica astratta di un sistema (ossia un contratto) e di esprimere le proprietà di tale sistema utilizzando le formule radicate nella [logica proposizionale](https://www.baeldung.com/cs/propositional-logic). Ciò semplifica il compito dell'algoritmo di controllo del modello, vale a dire dimostrare che un modello matematico soddisfi una data formula logica.

Il controllo del modello nella verifica formale è utilizzato principalmente per valutare le proprietà temporali che descrivono il comportamento di un contratto nel tempo. Le proprietà temporali per i contratti intelligenti includono la _sicurezza_ e la _vitalità_, spiegate in precedenza.

Ad esempio, una proprietà di sicurezza relativa al controllo dell'accesso (es., _Solo il proprietario del contratto può chiamare `selfdestruct`_) può essere scritta in logica formale. In seguito, l'algoritmo di controllo del modello può verificare se il contratto soddisfa tale specifica formale.

Il controllo del modello utilizza l'esplorazione dello spazio di stato, che richiede la costruzione di tutti gli stati possibili di un contratto intelligente e di tentare di trovare gli stati raggiungibili risultanti in violazioni della proprietà. Tuttavia, ciò può comportare un numero infinito di stati (noto come il "problema d'esplosione dello stato"), dunque i revisori del modello si affidano a tecniche di astrazione per rendere possibile l'analisi efficiente dei contratti intelligenti.

### Dimostrazione del teorema {#theorem-proving}

La dimostrazione del teorema è un metodo di ragionamento matematico sulla correttezza dei programmi, inclusi i contratti intelligenti. Prevede la trasformazione del modello del sistema di un contratto e delle sue specifiche in formule matematiche (dichiarazioni logiche).

L'obiettivo della dimostrazione del teorema è verificare l'equivalenza logica tra tali dichiarazioni. L'"equivalenza logica" (anche detta "bi-implicazione logica") è un tipo di relazione tra due dichiarazioni tale per cui la prima dichiarazione è vera _se e soltanto se_ la seconda è vera.

La relazione richiesta (equivalenza logica) tra le dichiarazioni sul modello di un contratto e le sue proprietà è formulata come una dichiarazione dimostrabile (detta teorema). Utilizzando un sistema formale di deduzione, il dimostratore automatizzato del teorema può verificarne la validità. In altre parole, un dimostratore del teorema può provare in modo conclusivo che il modello di un contratto intelligente corrisponde precisamente alle sue specifiche.

Mentre il controllo del modello modellizza i contratti come sistemi di transizione con stati finiti, la dimostrazione del teorema può gestire l'analisi di sistemi di stato infinito. Tuttavia, ciò significa che un dimostratore automatizzato del teorema non può sempre sapere se un problema logico sia "decidibile" o no.

Di conseguenza, è spesso richiesta l'assistenza umana per guidare il dimostratore del teorema alla derivazione delle prove di correttezza. L'utilizzo del lavoro umano nella dimostrazione del teorema la rende più costosa da usare del controllo del modello, che è completamente automatizzato.

### Esecuzione simbolica {#symbolic-execution}

L'esecuzione simbolica è un metodo per analizzare un contratto intelligente eseguendo le funzioni utilizzando dei _valori simbolici_ (es. `x > 5`) invece di _valori concreti_ (es. `x == 5`). Come tecnica formale di verifica, l'esecuzione simbolica è utilizzata per ragionare formalmente sulle proprietà a livello di traccia nel codice di un contratto.

L'esecuzione simbolica rappresenta una traccia d'esecuzione come una formula matematica sui valori di input simbolici, altrimenti detta _predicato del percorso_. Un [risolutore SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) è utilizzato per verificare se il predicato di un percorso sia "soddisfacibile" (cioè, esiste un valore che possa soddisfare la formula). Se un percorso vulnerabile è soddisfacibile, il risolutore SMT genererà un valore concreto che innesca la sterzata dell'esecuzione verso tale percorso.

Ipotizziamo che la funzione di un contratto intelligente prenda come input un valore `uint` (`x`) e si ripristini quando `x` è maggiore di `5` e minore di `10`. Trovare un valore per `x` che inneschi l'errore utilizzando una normale procedura di test richiederebbe l'esecuzione di decine di casi di prova (o più) senza la garanzia di trovare effettivamente un input che causi un errore.

Viceversa, uno strumento d'esecuzione simbolica eseguirebbe la funzione con il valore simbolico: `X > 5 ∧ X < 10` (cioè `x` è maggiore di 5 AND `x` è minore di 10). Il predicato del percorso associato `x = X > 5 ∧ X < 10` sarebbe quindi dato a un risolutore SMT per la risoluzione. Se un valore specifico soddisfa la formula `x = X > 5 ∧ X < 10`, il risolutore SMT lo calcolerà, ad esempio producendo `7` come valore per `x`.

Poiché l'esecuzione simbolica si basa sugli input di un programma e la serie di input per esplorare tutti gli stati raggiungibili è potenzialmente infinito, è comunque una forma di test. Tuttavia, come mostrato nell'esempio, l'esecuzione simbolica è più efficiente dei test regolari per trovare gli input che innescano le violazioni di proprietà.

Inoltre, l'esecuzione simbolica produce meno falsi positivi di altre tecniche basate sulle proprietà (es. il fuzzing) che generano casualmente gli input di una funzione. Se uno stato di errore viene innescato durante l'esecuzione simbolica, allora è possibile generare un valore concreto che inneschi l'errore e lo riproduca.

L'esecuzione simbolica, inoltre, può fornire un certo grado di prova di correttezza matematica. Considera il seguente esempio di una funzione del contratto con la protezione dal sovrafflusso:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
```

Una traccia di esecuzione che risulta in un sovrafflusso di interi dovrebbe soddisfare la formula: `z = x + y AND (z >= x) AND (z=>y) AND (z < x OR z < y)` Una simile formula è improbabile che sia risolta, dunque serve una prova matematica che la funzione `safe_add` non vada mai in sovrafflusso.

### Perché utilizzare la verifica formale per i contratti intelligenti? {#benefits-of-formal-verification}

#### Necessità di affidabilità {#need-for-reliability}

La verifica formale è utilizzata per valutare la correttezza dei sistemi critici per la sicurezza, i cui guasti possono avere conseguenze devastanti, quali morte, lesioni o rovina finanziaria. I contratti intelligenti sono applicazioni dal valore elevato che controllano enormi quantità di valore, e i semplici errori di progettazione possono comportare [perdite irrecuperabili per gli utenti](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Verificare formalmente un contratto prima della distribuzione, tuttavia, può aumentare le garanzie che funzionerà come previsto una volta eseguito sulla blockchain.

L'affidabilità è una qualità altamente desiderata in qualsiasi contratto intelligente, specialmente perché il codice distribuito alla Macchina Virtuale di Ethereum (EVM) è tipicamente immutabile. Con gli aggiornamenti successivi al lancio non prontamente accessibili, la necessità di garantire l'affidabilità dei contratti rende necessaria la verifica formale. La verifica formale è capace di rilevare problemi delicati, come sottoeccedenze e sovrafflussi di interi, rientranza e ottimizzazioni scadenti del carburante, che potrebbero sfuggire a revisori e tester.

#### Provare la correttezza funzionale {#prove-functional-correctness}

I test dei programmi è il metodo più comune di provare che un contratto intelligente soddisfa dei requisiti. Ciò comporta l'esecuzione di un contratto con un campione dei dati che si prevede gestirà e l'analisi del rispettivo comportamento. Se il contratto restituisce i risultati previsti per i dati campione, allora gli sviluppatori hanno la prova obiettiva della sua correttezza.

Tuttavia, questo approccio non può provare l'esecuzione corretta per i valori di input che non fanno parte del campione. Dunque, testare un contratto potrebbe aiutare a rilevare i bug (cioè, se i percorsi del codice non riescono a restituire i risultati desiderati durante l'esecuzione), ma **non può provare in via conclusiva l'assenza di bug**.

Viceversa, la verifica formale può provare formalmente che un contratto intelligente soddisfa i requisiti per una gamma infinita di esecuzioni _senza_ eseguire affatto il contratto. Ciò richiede la creazione di una specifica formale che descriva precisamente i comportamenti corretti del contratto e lo sviluppo di un modello (matematico) formale del sistema del contratto. Quindi possiamo seguire una procedura di prova formale per verificare la coerenza tra il modello del contratto e la sua specifica.

Con la verifica formale, la questione di verificare se la logica aziendale di un contratto soddisfi i requisiti è una proposizione matematica che può essere dimostrata o confutata. Dimostrando formalmente una proposizione, possiamo verificare un numero infinito di casi di prova con un numero finito di passaggi. Così, la verifica formale ha delle prospettive migliori di dimostrare che un contratto sia funzionalmente corretto rispetto a una specifica.

#### Obiettivi di verifica ideali {#ideal-verification-targets}

Un obiettivo di verifica descrive il sistema da verificare formalmente. La verifica formale è meglio utilizzata nei "sistemi incorporati" (piccoli pezzi di software semplici che fanno parte di un sistema più grande). Inoltre, sono ideali per i domini specializzati aventi poche regole, poiché ciò semplifica la modifica degli strumenti per verificare le proprietà specifiche del dominio.

I contratti intelligenti, almeno in una certa misura, soddisfano entrambi i requisiti. Ad esempio, le piccole dimensioni dei contratti di Ethereum li rendono suscettibili alla verifica formale. Analogamente, l'EVM segue delle regole semplici, che rendono più facile specificare e verificare le proprietà semantiche per i programmi in esecuzione nell'EVM.

### Ciclo di sviluppo più veloce {#faster-development-cycle}

Le tecniche di verifica formale, come il controllo dei modelli e l'esecuzione simbolica, sono generalmente più efficienti dell'analisi regolare del codice del contratto intelligente (eseguita durante i test o i controlli). Questo perché la verifica formale si basa su valori simbolici per testare le asserzioni ("che succede se un utente prova a prelevare _n_ ether?") a differenza dei test che utilizzano valori concreti ("che succede se un utente prova a prelevare 5 ether?").

Le variabili di input simboliche possono coprire svariate classi di valori concreti, quindi gli approcci di verifica formale promettono maggiore copertura del codice in un periodo di tempo più breve. Se usata efficacemente, la verifica formale può accelerare il ciclo di sviluppo per gli sviluppatori.

La verifica formale, inoltre, migliora il processo di costruzione di applicazioni decentralizzate (dapp) riducendo costosi errori di progettazione. Aggiornare i contratti (ove possibile) per risolvere le vulnerabilità richiede una vasta riscrittura delle basi di codice e maggiori sforzi di sviluppo. La verifica formale può rilevare molti errori nelle implementazioni del contratto che potrebbero sfuggire a tester e revisori e fornire ampia opportunità di correggere tali errori prima della distribuzione di un contratto.

## Svantaggi della verifica formale {#drawbacks-of-formal-verification}

### Costo della manodopera {#cost-of-manual-labor}

La verifica formale, specialmente la verifica semi-automatica in cui un umano guida il dimostratore a ricavare le prove di correttezza, richiede considerevole manodopera. Inoltre, la creazione della specifica formale è un'attività complessa che richiede un livello elevato di competenze.

Questi fattori (sforzo e competenze) rendono la verifica formale più impegnativa e costosa rispetto ai soliti metodi di valutazione della correttezza nei contratti, come test e controlli. Tuttavia, sostenere il costo di un controllo di verifica completo è pratico, dato il costo degli errori nelle implementazioni del contratto intelligente.

### Falsi negativi {#false-negatives}

La verifica formale può soltanto verificare se l'esecuzione del contratto intelligente corrisponde alla specifica formale. Come tale, è importante assicurarsi che la specifica descriva adeguatamente i comportamenti previsti di un contratto intelligente.

Se le specifiche sono scritte male, le violazioni delle proprietà – che puntano alle esecuzioni vulnerabili – non sono rilevabili dal controllo di verifica formale. In questo caso il programmatore potrebbe pensare erroneamente che il contratto sia senza bug.

### Problemi di prestazione {#performance-issues}

La verifica formale comporta una serie di problemi di prestazione. Per esempio, i problemi d'esplosione di stato e di percorso incontrati durante il controllo del modello e il controllo simbolico, rispettivamente, possono influenzare le procedure di verifica. Inoltre, gli strumenti di verifica formale utilizzano spesso risolutori SMT e altri risolutori di vincolo nel proprio livello sottostante, e questi si basano su procedure ad alta intensità di calcoli.

Inoltre, non sempre per i verificatori di programmi è possibile determinare se una proprietà (descritta come una formula logica) sia soddisfacibile o no (il "[problema di decidibilità](https://en.wikipedia.org/wiki/Decision_problem)"), poiché un programma potrebbe non terminare mai. Come tale, potrebbe essere impossibile dimostrare alcune proprietà per un contratto, anche se ben specificate.

## Strumenti di verifica formale per i contratti intelligenti di Ethereum {#formal-verification-tools}

### Linguaggi di specifica per la creazione di specifiche formali {#specification-languages}

**Act**: _*Act consente la specifica di aggiornamenti d'archiviazione, pre e post condizioni e invarianti del contratto. La sua suite di strumenti contiene inoltre backend di prova in grado di dimostrare molte proprietà tramite Coq, risolutori SMT o hevm.**

- [GitHub](https://github.com/ethereum/act)
- [Documentazione](https://ethereum.github.io/act/)

**Scribble** - _*Scribble trasforma le annotazioni di codice nel linguaggio di specifica di Scribble in asserzioni concrete che verificano la specifica.**

- [Documentazione](https://docs.scribble.codes/)

**Dafny** - _*Dafny è un linguaggio di programmazione pronto alla verifica che si basa su annotazioni di alto livello per ragionare sulla correttezza del codice e dimostrarla.**

- [GitHub](https://github.com/dafny-lang/dafny)

### Verificatori di programmi per verificare la correttezza {#program-verifiers}

**Certora Prover** - _Certora Prover è uno strumento automatico di verifica formale per verificare la correttezza del codice nei contratti intelligenti. Le specifiche sono scritte in CVL (Certora Verification Language), con le violazioni di proprietà rilevate utilizzando una combinazione di analisi statica e risoluzione del vincolo._

- [Sito web](https://www.certora.com/)
- [Documentazione](https://docs.certora.com/en/latest/index.html)

**SMTChecker di Solidity** - _*SMTChecker di Solidity è un revisore del modello integrato basato sulle SMT (Satisfiability Modulo Theories) e la risoluzione di Horn. Conferma se il codice sorgente di un contratto corrisponde alle specifiche durante la compilazione e controlla staticamente le violazioni delle proprietà di sicurezza.**

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify è una versione estesa del compilatore di Solidity che può eseguire la verifica formale automatizzata sul codice di Solidity utilizzando le annotazioni e la verifica modulare del programma.**

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM è una semantica formale della Macchina Virtuale di Ethereum (EVM), scritta nel quadro K. KEVM è eseguibile e può dimostrare determinate asserzioni correlate alle proprietà utilizzando la logica di raggiungibilità.**

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Documentazione](https://jellopaper.org/)

### Quadri logici per la dimostrazione del teorema {#theorem-provers}

**Isabelle** - _Isabelle/HOL è un assistente di dimostrazione che consente di esprimere formule matematiche in un linguaggio formale e fornisce strumenti per dimostrarle. L'applicazione principale è la formalizzazione delle dimostrazioni matematiche e in particolare la verifica formale, che include la dimostrazione della correttezza di hardware e software e la dimostrazione delle proprietà dei linguaggi e dei protocolli informatici._

- [GitHub](https://github.com/isabelle-prover)
- [Documentazione](https://isabelle.in.tum.de/documentation.html)

**Coq** - _Coq è un dimostratore interattivo del teorema che ti consente di definire i programmi che utilizzano i teoremi e generare interattivamente prove di correttezza verificate dalla macchina._

- [GitHub](https://github.com/coq/coq)
- [Documentazione](https://coq.github.io/doc/v8.13/refman/index.html)

### Strumenti basati sull'esecuzione simbolica per rilevare modelli vulnerabili nei contratti intelligenti {#symbolic-execution-tools}

**Manticore** - _*Uno strumento per analizzare il bytecode dell'EVM basato sull'esecuzione simbolica*.*

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentazione](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm è un motore di esecuzione simbolica e verificatore di equivalenza per il bytecode dell'EVM.**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Uno strumento di esecuzione simbolica per rilevare le vulnerabilità nei contratti intelligenti di Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Documentazione](https://mythril-classic.readthedocs.io/en/develop/)

## Ulteriori letture {#further-reading}

- [Come funziona la verifica formale dei contratti intelligenti](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Come la verifica formale può assicurare contratti intelligenti impeccabili](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Una panoramica dei progetti di verifica formale nell'ecosistema di Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Verifica formale end-to-end del contratto intelligente di deposito di Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Verificare formalmente il contratto intelligente più popolare al mondo](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker e verifica formale](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
