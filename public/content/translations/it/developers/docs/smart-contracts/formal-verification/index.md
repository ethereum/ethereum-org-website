---
title: Verifica formale dei contratti intelligenti
description: Una panoramica della verifica formale per i contratti intelligenti di Ethereum
lang: it
---

I [contratti intelligenti](/developers/docs/smart-contracts/) stanno rendendo possibile la creazione di applicazioni decentralizzate, robuste e trustless che introducono nuovi casi d'uso e sbloccano valore per gli utenti. Poiché i contratti intelligenti gestiscono grandi quantità di valore, la sicurezza è una considerazione critica per gli sviluppatori.

La verifica formale è una delle tecniche consigliate per migliorare la [sicurezza dei contratti intelligenti](/developers/docs/smart-contracts/security/). La verifica formale, che utilizza [metodi formali](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) per specificare, progettare e verificare i programmi, è stata utilizzata per anni per garantire la correttezza dei sistemi hardware e software critici.

Quando implementata nei contratti intelligenti, la verifica formale può dimostrare che la logica di business di un contratto soddisfa una specifica predefinita. Rispetto ad altri metodi per valutare la correttezza del codice del contratto, come i test, la verifica formale offre garanzie più forti che un contratto intelligente sia funzionalmente corretto.

## Cos'è la verifica formale? {#what-is-formal-verification}

La verifica formale si riferisce al processo di valutazione della correttezza di un sistema rispetto a una specifica formale. In termini più semplici, la verifica formale ci consente di controllare se il comportamento di un sistema soddisfa determinati requisiti (cioè, fa ciò che vogliamo).

I comportamenti attesi del sistema (un contratto intelligente in questo caso) sono descritti utilizzando la modellazione formale, mentre i linguaggi di specifica consentono la creazione di proprietà formali. Le tecniche di verifica formale possono quindi verificare che l'implementazione di un contratto sia conforme alla sua specifica e derivare una prova matematica della correttezza della prima. Quando un contratto soddisfa la sua specifica, viene descritto come "funzionalmente corretto", "corretto per progettazione" o "corretto per costruzione".

### Cos'è un modello formale? {#what-is-a-formal-model}

Nell'informatica, un [modello formale](https://en.wikipedia.org/wiki/Model_of_computation) è una descrizione matematica di un processo computazionale. I programmi sono astratti in funzioni matematiche (equazioni), con il modello che descrive come vengono calcolati gli output delle funzioni dato un input.

I modelli formali forniscono un livello di astrazione su cui può essere valutata l'analisi del comportamento di un programma. L'esistenza di modelli formali consente la creazione di una _specifica formale_, che descrive le proprietà desiderate del modello in questione.

Vengono utilizzate diverse tecniche per modellare i contratti intelligenti per la verifica formale. Ad esempio, alcuni modelli sono utilizzati per ragionare sul comportamento ad alto livello di un contratto intelligente. Queste tecniche di modellazione applicano una visione a scatola nera (black-box) ai contratti intelligenti, considerandoli come sistemi che accettano input ed eseguono calcoli basati su tali input.

I modelli ad alto livello si concentrano sulla relazione tra i contratti intelligenti e gli agenti esterni, come gli account controllati esternamente (EOA), gli account del contratto e l'ambiente della blockchain. Tali modelli sono utili per definire le proprietà che specificano come un contratto dovrebbe comportarsi in risposta a determinate interazioni dell'utente.

Al contrario, altri modelli formali si concentrano sul comportamento a basso livello di un contratto intelligente. Mentre i modelli ad alto livello possono aiutare a ragionare sulla funzionalità di un contratto, potrebbero non riuscire a catturare i dettagli sul funzionamento interno dell'implementazione. I modelli a basso livello applicano una visione a scatola bianca (white-box) all'analisi del programma e si basano su rappresentazioni di livello inferiore delle applicazioni dei contratti intelligenti, come le tracce del programma e i [grafi del flusso di controllo](https://en.wikipedia.org/wiki/Control-flow_graph), per ragionare sulle proprietà rilevanti per l'esecuzione di un contratto.

I modelli a basso livello sono considerati ideali poiché rappresentano l'effettiva esecuzione di un contratto intelligente nell'ambiente di esecuzione di Ethereum (cioè, la [EVM](/developers/docs/evm/)). Le tecniche di modellazione a basso livello sono particolarmente utili per stabilire proprietà di sicurezza critiche nei contratti intelligenti e rilevare potenziali vulnerabilità.

### Cos'è una specifica formale? {#what-is-a-formal-specification}

Una specifica è semplicemente un requisito tecnico che un particolare sistema deve soddisfare. Nella programmazione, le specifiche rappresentano idee generali sull'esecuzione di un programma (cioè, cosa dovrebbe fare il programma).

Nel contesto dei contratti intelligenti, le specifiche formali si riferiscono alle _proprietà_: descrizioni formali dei requisiti che un contratto deve soddisfare. Tali proprietà sono descritte come "invarianti" e rappresentano asserzioni logiche sull'esecuzione di un contratto che devono rimanere vere in ogni possibile circostanza, senza alcuna eccezione.

Pertanto, possiamo pensare a una specifica formale come a una raccolta di dichiarazioni scritte in un linguaggio formale che descrivono l'esecuzione prevista di un contratto intelligente. Le specifiche coprono le proprietà di un contratto e definiscono come il contratto dovrebbe comportarsi in diverse circostanze. Lo scopo della verifica formale è determinare se un contratto intelligente possiede queste proprietà (invarianti) e che queste proprietà non vengano violate durante l'esecuzione.

Le specifiche formali sono fondamentali nello sviluppo di implementazioni sicure dei contratti intelligenti. I contratti che non riescono a implementare le invarianti o le cui proprietà vengono violate durante l'esecuzione sono inclini a vulnerabilità che possono danneggiare la funzionalità o causare exploit dannosi.

## Tipi di specifiche formali per i contratti intelligenti {#formal-specifications-for-smart-contracts}

Le specifiche formali consentono il ragionamento matematico sulla correttezza dell'esecuzione del programma. Come per i modelli formali, le specifiche formali possono catturare sia le proprietà ad alto livello che il comportamento a basso livello di un'implementazione del contratto.

Le specifiche formali sono derivate utilizzando elementi della [logica di programmazione](https://en.wikipedia.org/wiki/Logic_programming), che consentono il ragionamento formale sulle proprietà di un programma. Una logica di programmazione ha regole formali che esprimono (in linguaggio matematico) il comportamento atteso di un programma. Varie logiche di programmazione sono utilizzate nella creazione di specifiche formali, tra cui la [logica di raggiungibilità](https://en.wikipedia.org/wiki/Reachability_problem), la [logica temporale](https://en.wikipedia.org/wiki/Temporal_logic) e la [logica di Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Le specifiche formali per i contratti intelligenti possono essere classificate in generale come specifiche di **alto livello** o di **basso livello**. Indipendentemente dalla categoria a cui appartiene una specifica, deve descrivere in modo adeguato e inequivocabile la proprietà del sistema in analisi.

### Specifiche di alto livello {#high-level-specifications}

Come suggerisce il nome, una specifica di alto livello (chiamata anche "specifica orientata al modello") descrive il comportamento ad alto livello di un programma. Le specifiche di alto livello modellano un contratto intelligente come una [macchina a stati finiti](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), che può transitare tra gli stati eseguendo operazioni, con la logica temporale utilizzata per definire le proprietà formali per il modello FSM.

Le [logiche temporali](https://en.wikipedia.org/wiki/Temporal_logic) sono "regole per ragionare su proposizioni qualificate in termini di tempo (ad es., "Ho _sempre_ fame" o "Avrò _alla fine_ fame")". Quando applicate alla verifica formale, le logiche temporali sono utilizzate per dichiarare asserzioni sul comportamento corretto dei sistemi modellati come macchine a stati. Nello specifico, una logica temporale descrive gli stati futuri in cui può trovarsi un contratto intelligente e come transita tra gli stati.

Le specifiche di alto livello catturano generalmente due proprietà temporali critiche per i contratti intelligenti: **sicurezza** (safety) e **vitalità** (liveness). Le proprietà di sicurezza rappresentano l'idea che "non accade mai nulla di male" e di solito esprimono invarianza. Una proprietà di sicurezza può definire requisiti software generali, come l'assenza di [stallo (deadlock)](https://www.techtarget.com/whatis/definition/deadlock), o esprimere proprietà specifiche del dominio per i contratti (ad es., invarianti sul controllo degli accessi per le funzioni, valori ammissibili delle variabili di stato o condizioni per i trasferimenti di token).

Prendi ad esempio questo requisito di sicurezza che copre le condizioni per l'utilizzo di `transfer()` o `transferFrom()` nei contratti di token ERC-20: _"Il saldo di un mittente non è mai inferiore all'importo richiesto di token da inviare."_. Questa descrizione in linguaggio naturale di un'invariante del contratto può essere tradotta in una specifica formale (matematica), che può quindi essere rigorosamente controllata per verificarne la validità.

Le proprietà di vitalità asseriscono che "alla fine accade qualcosa di buono" e riguardano la capacità di un contratto di progredire attraverso diversi stati. Un esempio di proprietà di vitalità è la "liquidità", che si riferisce alla capacità di un contratto di trasferire i propri saldi agli utenti su richiesta. Se questa proprietà viene violata, gli utenti non sarebbero in grado di prelevare gli asset memorizzati nel contratto, come è successo con l'[incidente del portafoglio Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Specifiche di basso livello {#low-level-specifications}

Le specifiche di alto livello prendono come punto di partenza un modello a stati finiti di un contratto e definiscono le proprietà desiderate di questo modello. Al contrario, le specifiche di basso livello (chiamate anche "specifiche orientate alle proprietà") spesso modellano i programmi (contratti intelligenti) come sistemi che comprendono una raccolta di funzioni matematiche e descrivono il comportamento corretto di tali sistemi.

In termini più semplici, le specifiche di basso livello analizzano le _tracce del programma_ e tentano di definire le proprietà di un contratto intelligente su queste tracce. Le tracce si riferiscono a sequenze di esecuzioni di funzioni che alterano lo stato di un contratto intelligente; quindi, le specifiche di basso livello aiutano a specificare i requisiti per l'esecuzione interna di un contratto.

Le specifiche formali di basso livello possono essere fornite come proprietà in stile Hoare o invarianti sui percorsi di esecuzione.

### Proprietà in stile Hoare {#hoare-style-properties}

La [logica di Hoare](https://en.wikipedia.org/wiki/Hoare_logic) fornisce un insieme di regole formali per ragionare sulla correttezza dei programmi, inclusi i contratti intelligenti. Una proprietà in stile Hoare è rappresentata da una tripla di Hoare `{P}c{Q}`, dove `c` è un programma e `P` e `Q` sono predicati sullo stato di `c` (cioè, il programma), descritti formalmente come _precondizioni_ e _postcondizioni_, rispettivamente.

Una precondizione è un predicato che descrive le condizioni richieste per la corretta esecuzione di una funzione; gli utenti che chiamano il contratto devono soddisfare questo requisito. Una postcondizione è un predicato che descrive la condizione che una funzione stabilisce se eseguita correttamente; gli utenti possono aspettarsi che questa condizione sia vera dopo aver chiamato la funzione. Un'_invariante_ nella logica di Hoare è un predicato che viene preservato dall'esecuzione di una funzione (cioè, non cambia).

Le specifiche in stile Hoare possono garantire la _correttezza parziale_ o la _correttezza totale_. L'implementazione di una funzione del contratto è "parzialmente corretta" se la precondizione è vera prima che la funzione venga eseguita e, se l'esecuzione termina, anche la postcondizione è vera. La prova della correttezza totale si ottiene se una precondizione è vera prima dell'esecuzione della funzione, l'esecuzione è garantita per terminare e, quando lo fa, la postcondizione è vera.

Ottenere la prova della correttezza totale è difficile poiché alcune esecuzioni potrebbero ritardare prima di terminare, o non terminare affatto. Detto questo, la questione se l'esecuzione termini è probabilmente un punto controverso poiché il meccanismo del gas di Ethereum previene i cicli infiniti del programma (l'esecuzione termina con successo o si conclude a causa di un errore di 'esaurimento del gas').

Le specifiche dei contratti intelligenti create utilizzando la logica di Hoare avranno precondizioni, postcondizioni e invarianti definite per l'esecuzione di funzioni e cicli in un contratto. Le precondizioni includono spesso la possibilità di input errati a una funzione, con le postcondizioni che descrivono la risposta attesa a tali input (ad es., il lancio di un'eccezione specifica). In questo modo le proprietà in stile Hoare sono efficaci per assicurare la correttezza delle implementazioni del contratto.

Molti framework di verifica formale utilizzano specifiche in stile Hoare per dimostrare la correttezza semantica delle funzioni. È anche possibile aggiungere proprietà in stile Hoare (come asserzioni) direttamente al codice del contratto utilizzando le istruzioni `require` e `assert` in Solidity.

Le istruzioni `require` esprimono una precondizione o un'invariante e sono spesso utilizzate per convalidare gli input dell'utente, mentre `assert` cattura una postcondizione necessaria per la sicurezza. Ad esempio, un adeguato controllo degli accessi per le funzioni (un esempio di proprietà di sicurezza) può essere ottenuto utilizzando `require` come controllo di precondizione sull'identità dell'account chiamante. Allo stesso modo, un'invariante sui valori consentiti delle variabili di stato in un contratto (ad es., il numero totale di token in circolazione) può essere protetta dalla violazione utilizzando `assert` per confermare lo stato del contratto dopo l'esecuzione della funzione.

### Proprietà a livello di traccia {#trace-level-properties}

Le specifiche basate sulle tracce descrivono le operazioni che fanno transitare un contratto tra diversi stati e le relazioni tra queste operazioni. Come spiegato in precedenza, le tracce sono sequenze di operazioni che alterano lo stato di un contratto in un modo particolare.

Questo approccio si basa sul modello dei contratti intelligenti come sistemi di transizione di stato con alcuni stati predefiniti (descritti da variabili di stato) insieme a un insieme di transizioni predefinite (descritte dalle funzioni del contratto). Inoltre, un [grafo del flusso di controllo](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), che è una rappresentazione grafica del flusso di esecuzione di un programma, viene spesso utilizzato per descrivere la semantica operativa di un contratto. Qui, ogni traccia è rappresentata come un percorso sul grafo del flusso di controllo.

Principalmente, le specifiche a livello di traccia sono utilizzate per ragionare sui modelli di esecuzione interna nei contratti intelligenti. Creando specifiche a livello di traccia, asseriamo i percorsi di esecuzione ammissibili (cioè, le transizioni di stato) per un contratto intelligente. Utilizzando tecniche, come l'esecuzione simbolica, possiamo verificare formalmente che l'esecuzione non segua mai un percorso non definito nel modello formale.

Usiamo un esempio di un contratto [DAO](/dao/) che ha alcune funzioni accessibili pubblicamente per descrivere le proprietà a livello di traccia. Qui, supponiamo che il contratto DAO consenta agli utenti di eseguire le seguenti operazioni:

- Depositare fondi

- Votare su una proposta dopo aver depositato i fondi

- Richiedere un rimborso se non votano su una proposta

Esempi di proprietà a livello di traccia potrebbero essere _"gli utenti che non depositano fondi non possono votare su una proposta"_ o _"gli utenti che non votano su una proposta dovrebbero sempre essere in grado di richiedere un rimborso"_. Entrambe le proprietà asseriscono sequenze di esecuzione preferite (il voto non può avvenire _prima_ del deposito dei fondi e la richiesta di un rimborso non può avvenire _dopo_ aver votato su una proposta).

## Tecniche per la verifica formale dei contratti intelligenti {#formal-verification-techniques}

### Controllo dei modelli (Model checking) {#model-checking}

Il controllo dei modelli è una tecnica di verifica formale in cui un algoritmo controlla un modello formale di un contratto intelligente rispetto alla sua specifica. Nel controllo dei modelli i contratti intelligenti sono spesso rappresentati come sistemi di transizione di stato, mentre le proprietà sugli stati consentiti del contratto sono definite utilizzando la logica temporale.

Il controllo dei modelli richiede la creazione di una rappresentazione matematica astratta di un sistema (cioè, un contratto) e l'espressione delle proprietà di questo sistema utilizzando formule radicate nella [logica proposizionale](https://www.baeldung.com/cs/propositional-logic). Questo semplifica il compito dell'algoritmo di controllo dei modelli, ovvero dimostrare che un modello matematico soddisfa una data formula logica.

Il controllo dei modelli nella verifica formale è utilizzato principalmente per valutare le proprietà temporali che descrivono il comportamento di un contratto nel tempo. Le proprietà temporali per i contratti intelligenti includono _sicurezza_ e _vitalità_, che abbiamo spiegato in precedenza.

Ad esempio, una proprietà di sicurezza relativa al controllo degli accessi (ad es., _Solo il proprietario del contratto può chiamare `selfdestruct`_) può essere scritta in logica formale. Successivamente, l'algoritmo di controllo dei modelli può verificare se il contratto soddisfa questa specifica formale.

Il controllo dei modelli utilizza l'esplorazione dello spazio degli stati, che comporta la costruzione di tutti i possibili stati di un contratto intelligente e il tentativo di trovare stati raggiungibili che si traducono in violazioni delle proprietà. Tuttavia, questo può portare a un numero infinito di stati (noto come "problema dell'esplosione degli stati"), quindi i controllori di modelli si affidano a tecniche di astrazione per rendere possibile un'analisi efficiente dei contratti intelligenti.

### Dimostrazione di teoremi {#theorem-proving}

La dimostrazione di teoremi è un metodo per ragionare matematicamente sulla correttezza dei programmi, inclusi i contratti intelligenti. Comporta la trasformazione del modello del sistema di un contratto e delle sue specifiche in formule matematiche (dichiarazioni logiche).

L'obiettivo della dimostrazione di teoremi è verificare l'equivalenza logica tra queste dichiarazioni. L'"equivalenza logica" (chiamata anche "bi-implicazione logica") è un tipo di relazione tra due dichiarazioni tale che la prima dichiarazione è vera _se e solo se_ la seconda dichiarazione è vera.

La relazione richiesta (equivalenza logica) tra le dichiarazioni sul modello di un contratto e la sua proprietà è formulata come una dichiarazione dimostrabile (chiamata teorema). Utilizzando un sistema formale di inferenza, il dimostratore automatico di teoremi può verificare la validità del teorema. In altre parole, un dimostratore di teoremi può dimostrare in modo conclusivo che il modello di un contratto intelligente corrisponde esattamente alle sue specifiche.

Mentre il controllo dei modelli modella i contratti come sistemi di transizione con stati finiti, la dimostrazione di teoremi può gestire l'analisi di sistemi a stati infiniti. Tuttavia, questo significa che un dimostratore automatico di teoremi non può sempre sapere se un problema logico è "decidibile" o meno.

Di conseguenza, è spesso richiesta l'assistenza umana per guidare il dimostratore di teoremi nel derivare le prove di correttezza. L'uso dello sforzo umano nella dimostrazione di teoremi lo rende più costoso da utilizzare rispetto al controllo dei modelli, che è completamente automatizzato.

### Esecuzione simbolica {#symbolic-execution}

L'esecuzione simbolica è un metodo per analizzare un contratto intelligente eseguendo funzioni utilizzando _valori simbolici_ (ad es., `x > 5`) invece di _valori concreti_ (ad es., `x == 5`). Come tecnica di verifica formale, l'esecuzione simbolica è utilizzata per ragionare formalmente sulle proprietà a livello di traccia nel codice di un contratto.

L'esecuzione simbolica rappresenta una traccia di esecuzione come una formula matematica sui valori di input simbolici, altrimenti chiamata _predicato di percorso_. Un [risolutore SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) viene utilizzato per verificare se un predicato di percorso è "soddisfacibile" (cioè, esiste un valore che può soddisfare la formula). Se un percorso vulnerabile è soddisfacibile, il risolutore SMT genererà un valore concreto che innesca e indirizza l'esecuzione verso quel percorso.

Supponiamo che la funzione di un contratto intelligente prenda come input un valore `uint` (`x`) e si annulli (revert) quando `x` è maggiore di `5` e anche inferiore a `10`. Trovare un valore per `x` che inneschi l'errore utilizzando una normale procedura di test richiederebbe l'esecuzione di dozzine di casi di test (o più) senza la garanzia di trovare effettivamente un input che inneschi l'errore.

Al contrario, uno strumento di esecuzione simbolica eseguirebbe la funzione con il valore simbolico: `X > 5 ∧ X < 10` (cioè, `x` è maggiore di 5 E `x` è minore di 10). Il predicato di percorso associato `x = X > 5 ∧ X < 10` verrebbe quindi fornito a un risolutore SMT per essere risolto. Se un particolare valore soddisfa la formula `x = X > 5 ∧ X < 10`, il risolutore SMT lo calcolerà: ad esempio, il risolutore potrebbe produrre `7` come valore per `x`.

Poiché l'esecuzione simbolica si basa sugli input a un programma e l'insieme di input per esplorare tutti gli stati raggiungibili è potenzialmente infinito, è ancora una forma di test. Tuttavia, come mostrato nell'esempio, l'esecuzione simbolica è più efficiente dei test regolari per trovare input che innescano violazioni delle proprietà.

Inoltre, l'esecuzione simbolica produce meno falsi positivi rispetto ad altre tecniche basate sulle proprietà (ad es., il fuzzing) che generano casualmente input per una funzione. Se uno stato di errore viene innescato durante l'esecuzione simbolica, allora è possibile generare un valore concreto che innesca l'errore e riprodurre il problema.

L'esecuzione simbolica può anche fornire un certo grado di prova matematica di correttezza. Considera il seguente esempio di una funzione del contratto con protezione dall'overflow:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Una traccia di esecuzione che si traduce in un overflow di interi dovrebbe soddisfare la formula: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` È improbabile che una tale formula venga risolta, quindi serve come prova matematica che la funzione `safe_add` non va mai in overflow.

### Perché utilizzare la verifica formale per i contratti intelligenti? {#benefits-of-formal-verification}

#### Necessità di affidabilità {#need-for-reliability}

La verifica formale è utilizzata per valutare la correttezza dei sistemi critici per la sicurezza il cui fallimento può avere conseguenze devastanti, come morte, lesioni o rovina finanziaria. I contratti intelligenti sono applicazioni di alto valore che controllano enormi quantità di valore e semplici errori di progettazione possono portare a [perdite irrecuperabili per gli utenti](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Verificare formalmente un contratto prima della distribuzione, tuttavia, può aumentare le garanzie che funzionerà come previsto una volta in esecuzione sulla blockchain.

L'affidabilità è una qualità altamente desiderata in qualsiasi contratto intelligente, specialmente perché il codice distribuito nella [macchina virtuale di Ethereum](/) (EVM) è tipicamente immutabile. Con gli aggiornamenti post-lancio non facilmente accessibili, la necessità di garantire l'affidabilità dei contratti rende necessaria la verifica formale. La verifica formale è in grado di rilevare problemi complessi, come underflow e overflow di interi, rientranza (re-entrancy) e scarse ottimizzazioni del gas, che potrebbero sfuggire a revisori e tester.

#### Dimostrare la correttezza funzionale {#prove-functional-correctness}

Il test del programma è il metodo più comune per dimostrare che un contratto intelligente soddisfa alcuni requisiti. Ciò comporta l'esecuzione di un contratto con un campione dei dati che ci si aspetta debba gestire e l'analisi del suo comportamento. Se il contratto restituisce i risultati attesi per i dati di esempio, allora gli sviluppatori hanno una prova oggettiva della sua correttezza.

Tuttavia, questo approccio non può dimostrare la corretta esecuzione per i valori di input che non fanno parte del campione. Pertanto, testare un contratto può aiutare a rilevare i bug (cioè, se alcuni percorsi del codice non riescono a restituire i risultati desiderati durante l'esecuzione), ma **non può dimostrare in modo conclusivo l'assenza di bug**.

Al contrario, la verifica formale può dimostrare formalmente che un contratto intelligente soddisfa i requisiti per una gamma infinita di esecuzioni _senza_ eseguire affatto il contratto. Ciò richiede la creazione di una specifica formale che descriva con precisione i comportamenti corretti del contratto e lo sviluppo di un modello formale (matematico) del sistema del contratto. Quindi possiamo seguire una procedura di prova formale per verificare la coerenza tra il modello del contratto e la sua specifica.

Con la verifica formale, la questione di verificare se la logica di business di un contratto soddisfa i requisiti è una proposizione matematica che può essere dimostrata o confutata. Dimostrando formalmente una proposizione, possiamo verificare un numero infinito di casi di test con un numero finito di passaggi. In questo modo la verifica formale ha migliori prospettive di dimostrare che un contratto è funzionalmente corretto rispetto a una specifica.

#### Obiettivi di verifica ideali {#ideal-verification-targets}

Un obiettivo di verifica descrive il sistema da verificare formalmente. La verifica formale è utilizzata al meglio nei "sistemi integrati" (piccoli e semplici pezzi di software che fanno parte di un sistema più ampio). Sono ideali anche per domini specializzati che hanno poche regole, poiché ciò rende più facile modificare gli strumenti per verificare le proprietà specifiche del dominio.

I contratti intelligenti, almeno in una certa misura, soddisfano entrambi i requisiti. Ad esempio, le piccole dimensioni dei contratti di Ethereum li rendono adatti alla verifica formale. Allo stesso modo, l'EVM segue regole semplici, il che rende più facile specificare e verificare le proprietà semantiche per i programmi in esecuzione nell'EVM.

### Ciclo di sviluppo più rapido {#faster-development-cycle}

Le tecniche di verifica formale, come il controllo dei modelli e l'esecuzione simbolica, sono generalmente più efficienti della normale analisi del codice del contratto intelligente (eseguita durante i test o l'auditing). Questo perché la verifica formale si basa su valori simbolici per testare le asserzioni ("cosa succede se un utente cerca di prelevare _n_ ether?") a differenza dei test che utilizzano valori concreti ("cosa succede se un utente cerca di prelevare 5 ether?").

Le variabili di input simboliche possono coprire più classi di valori concreti, quindi gli approcci di verifica formale promettono una maggiore copertura del codice in un lasso di tempo più breve. Se utilizzata in modo efficace, la verifica formale può accelerare il ciclo di sviluppo per gli sviluppatori.

La verifica formale migliora anche il processo di costruzione di applicazioni decentralizzate (dApp) riducendo costosi errori di progettazione. L'aggiornamento dei contratti (ove possibile) per correggere le vulnerabilità richiede un'ampia riscrittura delle basi di codice e un maggiore sforzo speso nello sviluppo. La verifica formale può rilevare molti errori nelle implementazioni dei contratti che potrebbero sfuggire a tester e revisori e offre ampie opportunità per correggere tali problemi prima di distribuire un contratto.

## Svantaggi della verifica formale {#drawbacks-of-formal-verification}

### Costo del lavoro manuale {#cost-of-manual-labor}

La verifica formale, specialmente la verifica semi-automatizzata in cui un essere umano guida il dimostratore per derivare le prove di correttezza, richiede un notevole lavoro manuale. Inoltre, la creazione di specifiche formali è un'attività complessa che richiede un alto livello di competenza.

Questi fattori (sforzo e competenza) rendono la verifica formale più impegnativa e costosa rispetto ai metodi usuali di valutazione della correttezza nei contratti, come test e audit. Tuttavia, pagare il costo per un audit di verifica completo è pratico, dato il costo degli errori nelle implementazioni dei contratti intelligenti.

### Falsi negativi {#false-negatives}

La verifica formale può solo controllare se l'esecuzione del contratto intelligente corrisponde alla specifica formale. Pertanto, è importante assicurarsi che la specifica descriva correttamente i comportamenti attesi di un contratto intelligente.

Se le specifiche sono scritte male, le violazioni delle proprietà, che indicano esecuzioni vulnerabili, non possono essere rilevate dall'audit di verifica formale. In questo caso, uno sviluppatore potrebbe erroneamente presumere che il contratto sia privo di bug.

### Problemi di prestazioni {#performance-issues}

La verifica formale va incontro a una serie di problemi di prestazioni. Ad esempio, i problemi di esplosione degli stati e dei percorsi riscontrati rispettivamente durante il controllo dei modelli e il controllo simbolico possono influenzare le procedure di verifica. Inoltre, gli strumenti di verifica formale utilizzano spesso risolutori SMT e altri risolutori di vincoli nel loro livello sottostante, e questi risolutori si basano su procedure ad alta intensità di calcolo.

Inoltre, non è sempre possibile per i verificatori di programmi determinare se una proprietà (descritta come una formula logica) può essere soddisfatta o meno (il "[problema della decidibilità](https://en.wikipedia.org/wiki/Decision_problem)") perché un programma potrebbe non terminare mai. Pertanto, potrebbe essere impossibile dimostrare alcune proprietà per un contratto anche se è ben specificato.

## Strumenti di verifica formale per i contratti intelligenti di Ethereum {#formal-verification-tools}

### Linguaggi di specifica per la creazione di specifiche formali {#specification-languages}

**Act**: _*Act consente la specifica degli aggiornamenti di archiviazione, delle pre/post condizioni e delle invarianti del contratto. La sua suite di strumenti ha anche backend di prova in grado di dimostrare molte proprietà tramite Coq, risolutori SMT o hevm.*_

- [GitHub](https://github.com/ethereum/act)
- [Documentazione](https://github.com/argotorg/act)

**Scribble** - _*Scribble trasforma le annotazioni del codice nel linguaggio di specifica Scribble in asserzioni concrete che controllano la specifica.*_

- [Documentazione](https://docs.scribble.codes/)

**Dafny** - _*Dafny è un linguaggio di programmazione pronto per la verifica che si basa su annotazioni di alto livello per ragionare e dimostrare la correttezza del codice.*_

- [GitHub](https://github.com/dafny-lang/dafny)

### Verificatori di programmi per il controllo della correttezza {#program-verifiers}

**Certora Prover** - _Certora Prover è uno strumento di verifica formale automatica per controllare la correttezza del codice nei contratti intelligenti. Le specifiche sono scritte in CVL (Certora Verification Language), con le violazioni delle proprietà rilevate utilizzando una combinazione di analisi statica e risoluzione dei vincoli._

- [Sito web](https://www.certora.com/)
- [Documentazione](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*L'SMTChecker di Solidity è un controllore di modelli integrato basato su SMT (Satisfiability Modulo Theories) e sulla risoluzione di Horn. Conferma se il codice sorgente di un contratto corrisponde alle specifiche durante la compilazione e controlla staticamente le violazioni delle proprietà di sicurezza.*_

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify è una versione estesa del compilatore Solidity che può eseguire la verifica formale automatizzata sul codice Solidity utilizzando annotazioni e la verifica modulare del programma.*_

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM è una semantica formale della macchina virtuale di Ethereum (EVM) scritta nel framework K. KEVM è eseguibile e può dimostrare determinate asserzioni relative alle proprietà utilizzando la logica di raggiungibilità.*_

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Documentazione](https://jellopaper.org/)

### Framework logici per la dimostrazione di teoremi {#theorem-provers}

**Isabelle** - _Isabelle/HOL è un assistente di prova che consente di esprimere formule matematiche in un linguaggio formale e fornisce strumenti per dimostrare tali formule. L'applicazione principale è la formalizzazione di prove matematiche e in particolare la verifica formale, che include la dimostrazione della correttezza dell'hardware o del software del computer e la dimostrazione delle proprietà dei linguaggi e dei protocolli informatici._

- [GitHub](https://github.com/isabelle-prover)
- [Documentazione](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq è un dimostratore di teoremi interattivo che ti consente di definire programmi utilizzando teoremi e generare in modo interattivo prove di correttezza controllate dalla macchina._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Documentazione](https://rocq-prover.org/docs)

### Strumenti basati sull'esecuzione simbolica per rilevare modelli vulnerabili nei contratti intelligenti {#symbolic-execution-tools}

**Manticore** - _*Uno strumento per l'analisi del bytecode EVM basato sull'esecuzione simbolica*._

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentazione](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm è un motore di esecuzione simbolica e un controllore di equivalenza per il bytecode EVM.*_

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Uno strumento di esecuzione simbolica per rilevare vulnerabilità nei contratti intelligenti di Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Documentazione](https://mythril-classic.readthedocs.io/en/develop/)

## Letture consigliate {#further-reading}

- [Come funziona la verifica formale dei contratti intelligenti](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Come la verifica formale può garantire contratti intelligenti impeccabili](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Una panoramica dei progetti di verifica formale nell'ecosistema di Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Verifica formale end-to-end del contratto intelligente di deposito di Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Verifica formale del contratto intelligente più popolare al mondo](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker e verifica formale](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)