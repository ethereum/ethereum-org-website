---
title: Sicurezza del contratto intelligente
description: Una panoramica delle linee guida per costruire contratti intelligenti di Ethereum sicuri
lang: it
---

I contratti intelligenti sono estremamente flessibili e in grado di gestire grandi quantità di valori e dati, eseguendo allo stesso tempo una logica immutata basata sul codice distribuito sulla blockchain. Questo ha dato vita a un vivace ecosistema di applicazioni senza fiducia e decentralizzate, che offrono molti vantaggi rispetto ai sistemi legacy. I contratti intelligenti rappresentano anche un'opportunità per gli utenti malevoli che provano a speculare sfruttandone le vulnerabilità.

Blochchain pubbliche come Ethereum rendono ancora più complessa la questione della sicurezza dei contratti intelligenti. Il codice del contratto distribuito _di solito_ non può essere modificato per correggere le falle di sicurezza, mentre gli asset rubati dai contratti intelligenti sono estremamente difficili da tracciare e per lo più irrecuperabili a causa dell'immutabilità.

Anche se i dati possono variare, si stima che l'ammontare totale di valore rubato o perduto a causa di falle di sicurezza nei contratti intelligenti superi facilmente $1 miliardo. Ciò include incidenti di alto profilo, come l'[hack della DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 milioni di ETH rubati, del valore di oltre 1 miliardo di dollari ai prezzi odierni), l'[hack del portafoglio multi-firma Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (30 milioni di dollari persi a causa degli hacker) e il [problema del portafoglio Parity bloccato](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (oltre 300 milioni di dollari in ETH bloccati per sempre).

Per via di tutte queste problematiche, è imperativo per gli sviluppatori investire risorse nella costruzione di contratti intelligenti sicuri, robusti e resilienti. La sicurezza dei contratti intelligenti è una questione seria, su cui ogni sviluppatore farebbe bene a informarsi. Questa guida tratterà alcune considerazioni sulla sicurezza rivolte agli sviluppatori Ethereum ed esaminerà le risorse per migliorare la sicurezza dei contratti intelligenti.

## Prerequisiti {#prerequisites}

Assicurati di avere familiarità con i [fondamenti dello sviluppo di contratti intelligenti](/developers/docs/smart-contracts/) prima di affrontare l'argomento della sicurezza.

## Linee guida per la creazione di contratti intelligenti Ethereum sicuri {#smart-contract-security-guidelines}

### 1. Progettare controlli d'accesso adeguati {#design-proper-access-controls}

Nei contratti intelligenti, le funzioni contrassegnate da `public` o `external` possono essere chiamate da qualsiasi conto posseduto esternamente (EOA) o da un conto contratto. È necessario specificare la visibilità pubblica per le funzioni se si desidera che altri interagiscano con il contratto. Le funzioni contrassegnate da `private` invece possono essere chiamate solo da funzioni all'interno del contratto intelligente e non da conti esterni. Dare a ogni partecipante della rete l'accesso alle funzioni del contratto può causare problemi, soprattutto se ciò implica che chiunque possa eseguire operazioni sensibili (ad esempio, coniare nuovi token).

Per prevenire l'uso non autorizzato di funzioni di contratti intelligenti, è necessario implementare controlli di accesso sicuri. I meccanismi di controlli di accesso limitano la possibilità di utilizzare determinate funzioni in un contratto intelligente a soggetti approvati, come i conti responsabili della gestione del contratto. Il **pattern Ownable** e il **controllo basato sui ruoli** sono due pattern utili per implementare il controllo degli accessi nei contratti intelligenti:

#### Pattern Ownable {#ownable-pattern}

Nel modello Ownable, un indirizzo è impostato come “proprietario” del contratto durante il processo di creazione del contratto. Alle funzioni protette viene assegnato un modificatore `OnlyOwner` che garantisce che il contratto autentichi l'identità dell'indirizzo chiamante prima di eseguire la funzione. Le chiamate a funzioni protette che provengono da altri indirizzi a parte il proprietario del contratto sono sempre respinte, impedendo accessi indesiderati.

#### Controllo degli accessi basato sui ruoli {#role-based-access-control}

Registrare un unico indirizzo come `Owner` in un contratto intelligente introduce un rischio di centralizzazione e rappresenta un singolo punto di errore. Se le chiavi del conto del proprietario sono compromesse, gli aggressori possono attaccare il contratto proprietario. Questo è il motivo per cui utilizzare un modello di controllo di accesso basato su ruoli con più conti amministrativi potrebbe essere un'opzione migliore.

Nel controllo di accesso basato sui ruoli, l'accesso alle funzioni sensibili è distribuito in un gruppo di partecipanti fidati. Per esempio, un conto può essere responsabile della coniazione di token, mentre un altro esegue gli aggiornamenti o interrompe il contratto. Decentralizzare in questo modo il controllo di accesso elimina punti di errore unici e riduce il bisogno di ipotesi di fiducia per gli utenti.

##### Uso dei portafogli multifirma

Un altro approccio per implementare un controllo degli accessi sicuro è usare un [conto multi-firma](/developers/docs/smart-contracts/#multisig) per gestire un contratto. A differenza di un comune EOA, i conti multifirma sono di proprietà di più entità e richiedono un numero minimo di firme da parte di più conti - solitamente da 3 a 5 - per eseguire transazioni.

L'utilizzo di un multifirma per il controllo di accesso introduce un ulteriore livello di sicurezza, dal momento che le azioni effettuate sul contratto di destinazione richiedono il consenso di più parti. Ciò è particolarmente utile nei casi in cui è necessario fare uso del modello Ownable, in quanto sarà più di difficile per un aggressore esterno o un insider ostile manipolare le funzioni sensibili del contratto per scopi malevoli.

### 2. Usare le istruzioni require(), assert() e revert() per proteggere le operazioni del contratto {#use-require-assert-revert}

Come accennato, chiunque potrà chiamare funzioni pubbliche nel tuo contratto intelligente una volta che questo sarà distribuito sulla blockchain. Poiché è impossibile sapere in anticipo come i conti esterni interagiranno con un contratto, l'ideale è implementare, prima della distribuzione, misure di salvaguardia interne nei confronti di operazioni sensibili. È possibile imporre un comportamento corretto nei contratti intelligenti utilizzando le istruzioni `require()`, `assert()` e `revert()` per attivare eccezioni e annullare le modifiche dello stato se l'esecuzione non soddisfa determinati requisiti.

**`require()`**: le istruzioni `require` sono definite all'inizio delle funzioni e assicurano che siano soddisfatte condizioni predefinite prima che venga eseguita la funzione chiamata. Un'istruzione `require` è utilizzabile per convalidare gli input dell'utente, controllare le variabili di stato o autenticare l'identità del conto chiamante, prima di procedere con una funzione.

**`assert()`**: `assert()` è usato per rilevare errori interni e verificare violazioni di “invarianti” nel tuo codice. Un'invariante è un'asserzione logica sullo stato di un contratto, che dovrebbe rimanere valida per tutte le esecuzioni della funzione. Un esempio di invariante è la fornitura o saldo massimo totale del contratto di un token. L'uso di `assert()` garantisce che il tuo contratto non raggiunga mai uno stato vulnerabile e, se lo fa, tutte le modifiche alle variabili di stato sono annullate.

**`revert()`**: `revert()` può essere usato in un'istruzione if-else che attiva un'eccezione se la condizione richiesta non è soddisfatta. L'esempio di contratto seguente utilizza `revert()` per proteggere l'esecuzione delle funzioni:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Ether forniti non sufficienti.");
        // Esegui l'acquisto.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Testare i contratti intelligenti e verificare la correttezza del codice {#test-smart-contracts-and-verify-code-correctness}

L'immutabilità del codice in esecuzione nella [macchina virtuale di Ethereum](/developers/docs/evm/) significa che i contratti intelligenti richiedono un livello più elevato di valutazione della qualità durante la fase di sviluppo. Testare ampiamente il tuo contratto e osservarlo per cogliere qualsiasi risultato imprevisto ne migliorerà considerevolmente la sicurezza e proteggerà i tuoi utenti sul lungo periodo.

Il metodo consueto prevede di scrivere piccole unità di prova utilizzando i dati di simulazione che il contratto dovrebbe ricevere dagli utenti. Lo [unit testing](/developers/docs/smart-contracts/testing/#unit-testing) è utile per testare la funzionalità di determinate funzioni e garantire che un contratto intelligente funzioni come previsto.

Sfortunatamente, gli unit test sono poco efficaci per migliorare la sicurezza del contratto intelligente se utilizzato in isolamento. Uno unit test potrebbe provare che una funzione sia eseguita correttamente per i dati di simulazione, ma gli unit test sono efficaci solo quanto i test scritti. Questo rende difficile rilevare i casi limite non identificati e le vulnerabilità che potrebbero spezzare la sicurezza del tuo contratto intelligente.

Un approccio migliore è combinare lo unit testing con il testing basato sulle proprietà, eseguito utilizzando l'[analisi statica e dinamica](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). L'analisi statica si basa su rappresentazioni di basso livello, come [grafici del flusso di controllo](https://en.wikipedia.org/wiki/Control-flow_graph) e [alberi di sintassi astratta](https://deepsource.io/glossary/ast/) per analizzare gli stati del programma e i percorsi di esecuzione raggiungibili. Nel frattempo, le tecniche di analisi dinamica, come il [fuzzing dei contratti intelligenti](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), eseguono il codice del contratto con valori di input casuali per rilevare le operazioni che violano le proprietà di sicurezza.

La [verifica formale](/developers/docs/smart-contracts/formal-verification) è un'altra tecnica per verificare le proprietà di sicurezza nei contratti intelligenti. A differenza dei test regolari, la verifica formale può dimostrare in modo conclusivo l'assenza di errori in un contratto intelligente. Ciò si ottiene creando una specifica formale che racchiuda le proprietà di sicurezza desiderate e dimostrando che un modello formale dei contratti aderisce a tale specifica.

### 4. Chiedere una revisione indipendente del codice {#get-independent-code-reviews}

Dopo aver testato il tuo contratto, è bene richiedere ad altri di verificare il codice sorgente per qualsiasi problema di sicurezza. I test non scopriranno ogni difetto di un contratto intelligente, ma ottenere una revisione indipendente aumenta la possibilità di individuare le vulnerabilità.

#### Audit {#audits}

Commissionare il controllo di un contratto intelligente è un modo di condurre una revisione indipendente del codice. I revisori rivestono un ruolo importante nell'assicurare che i contratti intelligenti siano sicuri e liberi da difetti di qualità ed errori di progettazione.

Detto ciò, dovresti evitare di trattare i controlli come una bacchetta magica. I controlli del contratto intelligente non troveranno ogni bug e sono principalmente progettati per fornire un ulteriore ciclo di revisioni, che possono aiutare a rilevare i problemi non identificati dagli sviluppatori durante lo sviluppo e test iniziali. Inoltre, dovresti seguire le migliori pratiche per lavorare con i revisori, come documentare correttamente il codice e aggiungere commenti inline, per massimizzare i benefici del controllo di un contratto intelligente.

- [Suggerimenti e trucchi per l'audit dei contratti intelligenti](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Sfruttare al meglio il proprio audit](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Ricompense per i bug {#bug-bounties}

Impostare un programma di caccia ai bug è un altro approccio per implementare le revisioni esterne del codice. Una bug bounty è una ricompensa finanziaria data a persone (solitamente hacker whitehat) che scoprono vulnerabilità in un'applicazione.

Quando usate propriamente, queste ricompense per la caccia ai bug incentivano i membri della community di hacker a ispezionare il tuo codice in cerca di difetti critici. Un esempio di vita reale è il “bug dei soldi infiniti” che avrebbe permesso a un aggressore di creare una quantità illimitata di ether su [Optimism](https://www.optimism.io/), un protocollo di [Livello 2](/layer-2/) in esecuzione su Ethereum. Fortunatamente, un hacker white hat [ha scoperto la falla](https://www.saurik.com/optimism.html) e ha notificato il team, [guadagnando una grossa ricompensa nel processo](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Una strategia utile è impostare la ricompensa di un programma di caccia ai bug proporzionale all'importo di fondi in staking. Descritto come la “[ricompensa per i bug di scalabilità](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)”, questo approccio fornisce incentivi finanziari agli individui per divulgare responsabilmente le vulnerabilità invece di sfruttarle.

### 5. Seguire le migliori pratiche durante lo sviluppo di contratti intelligenti {#follow-smart-contract-development-best-practices}

L'esistenza di controlli e ricompense per la caccia ai bug non è una scusa per non scrivere codice di alta qualità. Una buona sicurezza dei contratti intelligenti deriva da processi di progettazione e sviluppo adeguati:

- Archivia tutto il codice in un sistema di controllo delle versioni, come git

- Effettua tutte le modifiche al codice tramite richieste pull

- Assicurati che le richieste pull abbiano almeno un revisore indipendente; se stai lavorando a un progetto da solo, valuta di trovare altri sviluppatori e di scambiare revisioni di codice

- Usare un [ambiente di sviluppo](/developers/docs/frameworks/) per testare, compilare e distribuire i contratti intelligenti

- Eseguire il codice con strumenti di analisi di base, come, [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril e Slither. Idealmente, dovresti farlo prima della fusione di ogni richiesta pull e confrontare le differenze nell'output

- Assicurati che il tuo codice si compili senza errori e che il compilatore di Solidity non emetta alcun avviso

- Documentare correttamente il codice (usando [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) e descrivere i dettagli sull'architettura del contratto in un linguaggio di facile comprensione. Questo semplificherà il controllo e la revisione del tuo codice da parte di altri.

### 6. Implementare piani di ripristino di emergenza solidi {#implement-disaster-recovery-plans}

Progettare controlli di accesso sicuri, implementare modificatori di funzioni e altri suggerimenti possono migliorare la sicurezza dei contratti intelligenti, ma non possono escludere la possibilità di exploit dannosi. Creare contratti intelligenti sicuri richiede di "prepararsi al fallimento" e di avere un piano di ripiego per rispondere efficientemente agli attacchi. Un adeguato piano di ripristino in caso di disastro includerà alcuni o tutti i seguenti componenti:

#### Aggiornamenti del contratto {#contract-upgrades}

Sebbene i contratti intelligenti di Ethereum siano immutabili di default, è possibile ottenere un certo grado di mutabilità utilizzando dei modelli di aggiornamento. Aggiornare i contratti è necessario nel caso in cui un difetto critico renda inutilizzabile il tuo vecchio contratto e distribuire una nuova logica sia l'opzione più fattibile.

I meccanismi di aggiornamento del contratto operano diversamente, ma lo "schema del proxy" è uno degli approcci più popolari per aggiornare i contratti intelligenti. I [proxy pattern](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) dividono lo stato e la logica di un'applicazione tra _due_ contratti. Il primo contratto (detto "contratto proxy") archivia le variabili di stato (es., i saldi degli utenti), mentre il secondo (detto "contratto logico") detiene il codice per l'esecuzione delle funzioni del contratto.

I conti interagiscono con il contratto proxy, che invia tutte le chiamate di funzione al contratto logico utilizzando la chiamata di basso livello [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). A differenza di una normale chiamata di messaggio, `delegatecall()` garantisce che il codice in esecuzione all'indirizzo del contratto logico sia eseguito nel contesto del contratto chiamante. Ciò significa che il contratto logico scriverà sempre nell'archiviazione del proxy (invece che nella propria) e che i valori originali di `msg.sender` e `msg.value` sono preservati.

Delegare le chiamate al contratto logico richiede l'archiviazione del suo indirizzo nella memoria del contratto proxy. Pertanto, aggiornare la logica del contratto è solo una questione di distribuire un altro contratto logico e archiviare il nuovo indirizzo nel contratto proxy. Poiché le chiamate successive al contratto proxy sono indirizzate automaticamente al nuovo contratto logico, avresti "aggiornato" il contratto senza effettivamente modificare il codice.

[Maggiori informazioni sull'aggiornamento dei contratti](/developers/docs/smart-contracts/upgrading/).

#### Arresti di emergenza {#emergency-stops}

Come accennato, i controlli e test estesi non possono verosimilmente scoprire tutti i bug in un contratto intelligente. Se una vulnerabilità appare nel tuo codice dopo la distribuzione, correggerla è impossibile perché non puoi modificare il codice in esecuzione all'indirizzo del contratto. Inoltre, i meccanismi di aggiornamento (es., schemi del proxy) potrebbero richiedere del tempo per l'implementazione (spesso richiedono l'approvazione di parti differenti), dando più tempo agli utenti malevoli di causare più danni.

L'opzione più drastica è implementare una funzione di "arresto d'emergenza" che blocca le chiamate alle funzioni vulnerabili in un contratto. Gli arresti d'emergenza comprendono tipicamente i seguenti componenti:

1. Una variabile booleana globale che indica se il contratto intelligente è in uno stato d'arresto o no. Questa variabile è impostata su `false` durante la configurazione del contratto, ma si ripristinerà su `true` una volta arrestato il contratto.

2. Funzioni riferite alla variabile booleana nella loro esecuzione. Tali funzioni sono accessibili quando il contratto intelligente non è arrestata e divengono inaccessibili una volta innescata la funzionalità di arresto d'emergenza.

3. Un'entità che ha accesso alla funzione di arresto d'emergenza, che imposta la variabile booleana su `true`. Per impedire azioni dannose, le chiamate a questa funzione possono essere limitate a un indirizzo fidato (es., il proprietario del contratto).

Una volta che il contratto attiva l'arresto d'emergenza, certe funzioni non potranno essere chiamate. Ciò avviene avvolgendo le funzioni selezionate in un modificatore che fa riferimento alla variabile globale. Di seguito è riportato [un esempio](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) che descrive un'implementazione di questo pattern nei contratti:

```solidity
// Questo codice non è stato sottoposto ad audit professionale e non fornisce alcuna garanzia sulla sicurezza o sulla correttezza. Usalo a tuo rischio e pericolo.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Controlla qui l'autorizzazione di msg.sender
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // La logica di deposito avviene qui
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Il prelievo d'emergenza avviene qui
    }
}
```

Questo esempio mostra le caratteristiche fondamentali degli arresti d'emergenza:

- `isStopped` è una variabile booleana che restituisce `false` all'inizio e `true` quando il contratto entra in modalità di emergenza.

- I modificatori della funzione `onlyWhenStopped` e `stoppedInEmergency` controllano la variabile `isStopped`. `stoppedInEmergency` è usato per controllare le funzioni che non dovrebbero essere accessibili quando il contratto è vulnerabile (es., `deposit()`). Le chiamate a queste funzioni saranno semplicemente annullate.

`onlyWhenStopped` è usato per le funzioni che dovrebbero poter essere chiamate durante un'emergenza (es., `emergencyWithdraw()`). Tali funzioni possono aiutare a risolvere la situazione, da cui la loro esclusione dall'elenco delle "funzioni limitate".

L'utilizzo di una funzionalità di arresto d'emergenza fornisce un palliativo efficiente per affrontare gravi vulnerabilità nel tuo contratto intelligente. Tuttavia, aumenta la necessità che gli utenti si fidino del fatto che gli sviluppatori non la attiveranno per motivi egoistici. A tal fine, decentralizzare il controllo dell'arresto di emergenza, sottoponendolo a un meccanismo di voto sulla catena, a un blocco temporale o all'approvazione di un portafoglio multi-firma, sono possibili soluzioni.

#### Monitoraggio degli eventi {#event-monitoring}

Gli [eventi](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) consentono di tracciare le chiamate alle funzioni del contratto intelligente e di monitorare le modifiche alle variabili di stato. È ideale programmare il tuo contratto intelligente in modo che emetta un evento ogni volta che una qualche parte effettua un'azione critica per la sicurezza (es., prelevare fondi).

La registrazione degli eventi e il loro monitoraggio fuori dalla catena forniscono informazioni sulle operazioni del contratto e aiutano a scoprire più velocemente le azioni malevole. Ciò significa che il tuo team può rispondere più velocemente alle violazioni e agire per mitigare l'impatto sugli utenti, ad esempio interrompendo le funzioni o eseguendo un aggiornamento.

Puoi anche optare per uno strumento di monitoraggio standard che inoltri automaticamente degli avvisi ogni volta che qualcuno interagisce con i tuoi contratti. Questi strumenti ti consentiranno di creare avvisi personalizzati basati su diversi inneschi, come il volume delle transazioni, la frequenza delle chiamate alla funzione o le funzioni specifiche coinvolte. Ad esempio, potresti programmare un avviso che si attivi quando l'importo prelevato in una singola transazione sia superiore a una determinata soglia.

### 7. Progettare sistemi di governance sicuri {#design-secure-governance-systems}

Potresti voler decentralizzare la tua applicazione dando il controllo dei contratti intelligenti ai membri della community. In questo caso, il sistema del contratto intelligente includerà un modulo di governance, ossia un meccanismo che consente ai membri della community di approvare le azioni amministrative tramite un sistema di governance sulla catena. Ad esempio, una proposta di aggiornare un contratto proxy a una nuova implementazione potrebbe esser votata dai possessori di token.

La governance decentralizzata può essere vantaggiosa, specialmente poiché si allinea agli interessi degli sviluppatori e degli utenti finali. Tuttavia, i meccanismi di governance del contratto intelligente potrebbero introdurre nuovi rischi, se implementati in modo errato. Uno scenario plausibile è se un aggressore acquisisce un enorme potere di voto (misurato in numero di token posseduti) chiedendo un [prestito flash](/defi/#flash-loans) e presentando una proposta malevola.

Un modo per prevenire i problemi legati alla governance sulla catena è [usare un blocco temporale](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Un blocco temporale impedisce a un contratto intelligente di eseguire certe azioni finché non passa un dato periodo di tempo. Altre strategie includono l'assegnazione di un "peso di voto" a ogni token a seconda del tempo per cui è stato bloccato, o la misurazione del potere di voto di un indirizzo in un dato periodo storico (ad esempio, 2-3 blocchi nel passato) invece che al blocco corrente. Entrambi i metodi riducono la possibilità di accumulare rapidamente potere di voto per influire sui voti sulla catena.

Nei link condivisi sono disponibili ulteriori informazioni sulla [progettazione di sistemi di governance sicuri](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), sui [diversi meccanismi di voto nelle DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) e sui [vettori di attacco comuni alle DAO che sfruttano la DeFi](https://dacian.me/dao-governance-defi-attacks).

### 8. Ridurre al minimo la complessità del codice {#reduce-code-complexity}

Gli sviluppatori di software tradizionali hanno familiarità con il principio KISS ("keep it simple, stupid", letteralmente "tieniti sul semplice, stupido"), che consiglia di non introdurre complessità non necessarie nella progettazione del software. Questo segue il pensiero di vecchia data che i "sistemi complessi falliscono in modi complessi" e che siano più suscettibili a errori costosi.

Mantenere le cose semplici è di particolare importanza nella scrittura dei contratti intelligenti, dato che i contratti intelligenti potrebbero potenzialmente controllare grandi importi di valore. Un suggerimento per ottenere la semplicità durante la scrittura dei contratti intelligenti è riutilizzare le librerie esistenti, come [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/), laddove possibile. Poiché queste librerie sono state controllate e testate ampiamente dagli sviluppatori, utilizzarle riduce le possibilità di introdurre bug rispetto a scrivere nuove funzionalità da zero.

Un altro consiglio comune è scrivere piccole funzioni e mantenere i contratti modulari, dividendo la logica commerciale su più contratti. Non solo la scrittura di codice più semplice può ridurre la superficie di attacco in un contratto intelligente, ma rende anche più semplice ragionare della correttezza del sistema complessivo e rilevare precocemente possibili errori di progettazione.

### 9. Difendersi dalle vulnerabilità comuni dei contratti intelligenti {#mitigate-common-smart-contract-vulnerabilities}

#### Rientranza {#reentrancy}

L'EVM non consente la concorrenza, il che significa che due contratti coinvolti in una chiamata di messaggio non possono essere eseguiti simultaneamente. Una chiamata esterna interrompe l'esecuzione e la memoria del contratto chiamante fino al ritorno della chiamata, dopodiché l'esecuzione procede normalmente. Questo processo può essere formalmente descritto come il trasferimento del [flusso di controllo](https://www.computerhope.com/jargon/c/contflow.htm) a un altro contratto.

Sebbene per lo più innocuo, il trasferimento del flusso di controllo a contratti non fidati può causare dei problemi, come la rientranza. Un attacco di rientranza si verifica quando un contratto malevolo viene richiamato in un contratto vulnerabile prima che l'invocazione della funzione originale sia completa. Questo tipo di attacco può essere spiegato meglio con un esempio.

Considera un semplice contratto intelligente ("Victim") che consenta a chiunque di depositare e prelevare ether:

```solidity
// Questo contratto è vulnerabile. Non usarlo in produzione

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Questo contratto espone una funzione `withdraw()` per consentire agli utenti di prelevare gli ETH precedentemente depositati nel contratto. Elaborando un prelievo, il contratto esegue le seguenti operazioni:

1. Controlla il saldo di ETH dell'utente
2. Invia i fondi all'indirizzo chiamante
3. Ripristina il loro saldo a 0, impedendo ulteriori prelievi dall'utente

La funzione `withdraw()` nel contratto `Victim` segue un pattern “checks-interactions-effects” (controlli-interazioni-effetti). Esso _controlla_ se le condizioni necessarie per l'esecuzione sono soddisfatte (cioè, se l'utente ha un saldo di ETH positivo) ed esegue l'_interazione_ inviando gli ETH all'indirizzo del chiamante, prima di applicare gli _effetti_ della transazione (cioè, ridurre il saldo dell'utente).

Se `withdraw()` viene chiamato da un conto posseduto esternamente (EOA), la funzione si esegue come previsto: `msg.sender.call.value()` invia gli ETH al chiamante. Tuttavia, se `msg.sender` è un conto del contratto intelligente e chiama `withdraw()`, l'invio di fondi utilizzando `msg.sender.call.value()` attiverà anche l'esecuzione del codice archiviato a quell'indirizzo.

Immagina che questo sia il codice distribuito all'indirizzo del contratto:

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Questo contratto è progettato per fare tre cose:

1. Accettare un deposito da un altro conto (probabilmente l'EOA dell'utente malevolo)
2. Depositare 1 ETH nel contratto Victim
3. Prelevare 1 ETH archiviato nel contratto intelligente

Non c'è nulla di sbagliato qui, tranne il fatto che `Attacker` ha un'altra funzione che chiama nuovamente `withdraw()` in `Victim` se il gas rimanente da `msg.sender.call.value` in entrata è superiore a 40.000. Questo dà ad `Attacker` la possibilità di rientrare in `Victim` e prelevare altri fondi _prima_ che la prima invocazione di `withdraw` sia completata. Il ciclo somiglia al seguente:

```solidity
- L'EOA dell'Attacker chiama `Attacker.beginAttack()` con 1 ETH
- `Attacker.beginAttack()` deposita 1 ETH in `Victim`
- `Attacker` chiama `withdraw() in `Victim`
- `Victim` controlla il saldo di `Attacker` (1 ETH)
- `Victim` invia 1 ETH ad `Attacker` (che innesca la funzione di default)
- `Attacker` chiama di nuovo `Victim.withdraw()` (si noti che `Victim` non ha ridotto il saldo di `Attacker` dopo il primo prelievo)
- `Victim` controlla il saldo di `Attacker` (che è ancora 1 ETH perché non ha applicato gli effetti della prima chiamata)
- `Victim` invia 1 ETH ad `Attacker` (che innesca la funzione di default e consente ad `Attacker` di rientrare nella funzione `withdraw`)
- Il processo si ripete finché `Attacker` rimane senza gas; a quel punto `msg.sender.call.value` ritorna senza innescare alcun prelievo ulteriore
- `Victim` infine applica i risultati della prima transazione (e delle successive) al proprio stato, così che il saldo di `Attacker` è impostato su 0
```

Riepilogando: poiché il saldo del chiamante non è impostato a 0 fino al completamento dell'esecuzione della funzione, le invocazioni successive avranno successo, consentendo al chiamante di prelevare il proprio saldo numerose volte. Questo tipo di attacco può essere utilizzato per sottrarre a un contratto intelligente i suoi fondi, come è avvenuto nell'[hack della DAO del 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Gli attacchi di rientranza sono ancora oggi un problema critico per i contratti intelligenti, come mostrato dagli [elenchi pubblici di exploit di rientranza](https://github.com/pcaversaccio/reentrancy-attacks).

##### Come prevenire gli attacchi di rientranza

Un approccio per affrontare la rientranza è seguire il [pattern checks-effects-interactions](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Questo schema ordina l'esecuzione delle funzioni in modo che il codice che esegue i controlli necessari prima di procedere all'esecuzione venga per primo, seguito dal codice che manipola lo stato del contratto e il codice che interagisce con gli altri contratti o EOA per ultimo.

Il pattern checks-effect-interaction è utilizzato in una versione rivista del contratto `Victim` mostrato di seguito:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Questo contratto esegue un _controllo_ sul saldo dell'utente, applica gli _effetti_ della funzione `withdraw()` (ripristinando il saldo dell'utente a 0), e procede all'esecuzione dell'_interazione_ (inviando gli ETH all'indirizzo dell'utente). Questo garantisce che il contratto aggiorni la propria memoria prima della chiamata esterna, eliminando la condizione di rientranza che ha consentito il primo attacco. Il contratto `Attacker` potrebbe ancora richiamare in `NoLongerAVictim`, ma poiché `balances[msg.sender]` è stata impostata a 0, ulteriori prelievi genereranno un errore.

Un'altra opzione è utilizzare un blocco di esclusione reciproca (comunemente descritto come "mutex"), che blocca una porzione dello stato di un contratto fino al completamento dell'invocazione di una funzione. Questo è implementato utilizzando una variabile booleana impostata su `true` prima dell'esecuzione della funzione e ripristinata su `false` dopo che l'invocazione è stata completata. Come si può vedere nell'esempio seguente, l'utilizzo di un mutex protegge una funzione dalle chiamate ricorsive mentre l'invocazione originale è ancora in elaborazione, interrompendo efficientemente la rientranza.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Rientranza bloccata.");
        locked = true;
        _;
        locked = false;
    }
    // Questa funzione è protetta da un mutex, quindi le chiamate rientranti da `msg.sender.call` non possono chiamare `withdraw` di nuovo.
    //  L'istruzione `return` restituisce `true` ma valuta comunque l'istruzione `locked = false` nel modificatore
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "Nessun saldo da prelevare.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Puoi anche utilizzare un sistema di [pagamenti pull](https://docs.openzeppelin.com/contracts/5.x/api/security#PullPayment), che richiede agli utenti di prelevare i fondi dai contratti intelligenti, invece di un sistema di "pagamenti push", che invia i fondi ai conti. Ciò rimuove la possibilità di innescare inavvertitamente il codice a indirizzi sconosciuti (e può anche impedire determinati attacchi denial-of-service).

#### Underflow e sovraflusso di interi {#integer-underflows-and-overflows}

Il sovraflusso di un intero si verifica quando i risultati di un'operazione aritmetica ricadono al di fuori dell'intervallo accettabile di valori, causandone un "ripristino" al valore più basso rappresentabile. Ad esempio, un `uint8` può memorizzare solo valori fino a 2^8-1=255. Le operazioni aritmetiche che risultano in valori superiori a `255` andranno in sovraflusso e ripristineranno `uint` a `0`, in modo simile a come il contachilometri di un'auto si azzera una volta raggiunto il chilometraggio massimo (999999).

Gli underflow di interi si verificano per motivi simili: i risultati di un'operazione aritmetica scendono al di sotto dell'intervallo accettabile. Supponiamo di provare a decrementare `0` in un `uint8`, il risultato passerebbe semplicemente al valore massimo rappresentabile (`255`).

Sia le sottoeccedenze che i sovraflussi di interi possono comportare modifiche impreviste alle variabili di stato di un contratto e risultare nell'esecuzione non pianificata. Di seguito è riportato un esempio che mostra come un utente malevolo può sfruttare il sovraflusso aritmetico in un contratto intelligente per eseguire un'operazione non valida:

```
pragma solidity ^0.7.6;

// Questo contratto è progettato per fungere da deposito a tempo.
// L'utente può depositare in questo contratto ma non può prelevare per almeno una settimana.
// L'utente può anche estendere il tempo di attesa oltre il periodo di attesa di 1 settimana.

/*
1. Distribuisci TimeLock
2. Distribuisci Attack con l'indirizzo di TimeLock
3. Chiama Attack.attack inviando 1 ether. Sarai in grado di
   prelevare immediatamente il tuo ether.

Cosa è successo?
L'attacco ha causato il sovraflusso di TimeLock.lockTime ed è stato in grado di prelevare
prima del periodo di attesa di 1 settimana.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Fondi insufficienti");
        require(block.timestamp > lockTime[msg.sender], "Periodo di blocco non scaduto");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Invio di Ether non riuscito");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        se t = tempo di blocco corrente, allora dobbiamo trovare x tale che
        x + t = 2**256 = 0
        quindi x = -t
        2**256 = type(uint).max + 1
        quindi x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Come prevenire sottoeccedenze e sovraflussi di interi

Dalla versione 0.8.0, il compilatore di Solidity rifiuta il codice risultante in sottoeccedenze e sovraflussi di interi. Tuttavia, i contratti compilati con una versione inferiore del compilatore dovrebbero eseguire controlli sulle funzioni che coinvolgono operazioni aritmetiche o utilizzare una libreria (ad esempio, [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) che controlli l'underflow/sovraflusso.

#### Manipolazione degli oracoli {#oracle-manipulation}

Gli [oracoli](/developers/docs/oracles/) acquisiscono informazioni fuori dalla catena e le inviano sulla catena perché possano essere usate dai contratti intelligenti. Con gli oracoli, puoi progettare contratti intelligenti che interagiscono con sistemi fuori dalla catena, come i mercati dei capitali, espandendo notevolmente la loro applicazione.

Ma se l'oracolo è corrotto e invia informazioni errate sulla catena, i contratti intelligenti saranno eseguiti sulla base di input errati, il che può causare problemi. Questa è la base del "problema degli oracoli", che riguarda il compito di assicurarsi che le informazioni provenienti da un oracolo della blockchain siano accurate, aggiornate e tempestive.

Un problema di sicurezza correlato è l'utilizzo di un oracolo sulla catena, come un exchange decentralizzato, per ottenere il prezzo a pronti per un asset. Le piattaforme di prestito nel settore della [finanza decentralizzata (DeFi)](/defi/) spesso lo fanno per determinare il valore della garanzia di un utente e stabilire quanto può prendere in prestito.

I prezzi del DEX sono spesso accurati, in gran parte a causa degli arbitri che ripristinano la parità nei mercati. Tuttavia, sono aperti alla manipolazione, in particolare se l'oracolo sulla catena calcola i prezzi degli asset sulla base degli schemi di negoziazione storici (come di solito accade).

Ad esempio, un utente malevolo potrebbe pompare artificialmente il prezzo a pronti di un bene richiedendo un prestito flash poco prima di interagire con il tuo contratto di prestito. L'interrogazione del DEX per sapere il prezzo del bene restituirebbe un valore superiore al normale (a causa del grande "ordine d'acquisto" dell'utente malevolo, distorcendo la domanda per il bene), consentendogli di prendere in prestito più del dovuto. Tali "attacchi di prestito flash" sono stati utilizzati per sfruttare la dipendenza dagli oracoli dei prezzi tra le applicazioni DeFi, costando ai protocolli milioni in fondi perduti.

##### Come prevenire la manipolazione degli oracoli

Il requisito minimo per [evitare la manipolazione degli oracoli](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) è utilizzare una rete di oracoli decentralizzata che richieda informazioni da più fonti per evitare singoli punti di errore. In gran parte dei casi, gli oracoli decentralizzati contengono incentivi criptoeconomici integrati per incoraggiare i nodi dell'oracolo a segnalare le informazioni corrette, rendendoli più sicuri rispetto agli oracoli centralizzati.

Se prevedi di interrogare un oracolo sulla catena per conoscere i prezzi degli asset, valuta di utilizzarne uno che implementi un meccanismo di prezzo medio ponderato per il tempo (TWAP). Un [oracolo TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) interroga il prezzo di un asset in due momenti diversi (che puoi modificare) e calcola il prezzo a pronti in base alla media ottenuta. La scelta di periodi di tempo più lunghi protegge il tuo protocollo dalla manipolazione dei prezzi poiché i grandi ordini eseguiti di recente non possono influire sui prezzi dei beni.

## Risorse sulla sicurezza dei contratti intelligenti per sviluppatori {#smart-contract-security-resources-for-developers}

### Strumenti per l'analisi dei contratti intelligenti e la verifica della correttezza del codice {#code-analysis-tools}

- **[Strumenti e librerie di testing](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Raccolta di strumenti e librerie standard del settore per eseguire unit test, analisi statica e analisi dinamica sui contratti intelligenti._

- **[Strumenti di verifica formale](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Strumenti per verificare la correttezza funzionale nei contratti intelligenti e controllare le invarianti._

- **[Servizi di audit dei contratti intelligenti](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Elenco di organizzazioni che forniscono servizi di audit dei contratti intelligenti per progetti di sviluppo di Ethereum._

- **[Piattaforme di bug bounty](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Piattaforme per coordinare le ricompense per i bug e remunerare la divulgazione responsabile delle vulnerabilità critiche nei contratti intelligenti._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Uno strumento online gratuito per verificare tutte le informazioni disponibili riguardanti un contratto oggetto di biforcazione._

- **[ABI Encoder](https://abi.hashex.org/)** - _Un servizio online gratuito per codificare le funzioni e gli argomenti del costruttore del tuo contratto Solidity._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Analizzatore statico di Solidity, che attraversa gli alberi di sintassi astratta (AST) per individuare le vulnerabilità sospette e stampare i problemi in un formato markdown di facile fruizione._

### Strumenti per il monitoraggio dei contratti intelligenti {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Uno strumento per ricevere notifiche in tempo reale quando si verificano eventi insoliti o imprevisti sui tuoi contratti intelligenti o portafogli._

### Strumenti per l'amministrazione sicura dei contratti intelligenti {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Portafoglio di contratti intelligenti in esecuzione su Ethereum che richiede un numero minimo di persone per approvare una transazione prima che possa verificarsi (M-di-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Librerie di contratti per implementare funzionalità amministrative, tra cui proprietà del contratto, aggiornamenti, controlli degli accessi, governance, possibilità di messa in pausa e altro._

### Servizi di audit dei contratti intelligenti {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Servizio di audit di contratti intelligenti che aiuta i progetti dell'ecosistema blockchain a garantire che i loro protocolli siano pronti per il lancio e costruiti per proteggere gli utenti._

- **[CertiK](https://www.certik.com/)** - _Azienda di sicurezza blockchain pioniera nell'uso della tecnologia di verifica formale all'avanguardia su contratti intelligenti e reti blockchain._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Azienda di cybersecurity che combina la ricerca sulla sicurezza con una mentalità da aggressore per ridurre i rischi e fortificare il codice._

- **[PeckShield](https://peckshield.com/)** - _Azienda di sicurezza blockchain che offre prodotti e servizi per la sicurezza, la privacy e l'usabilità dell'intero ecosistema blockchain._

- **[QuantStamp](https://quantstamp.com/)** - _Servizio di audit che facilita l'adozione mainstream della tecnologia blockchain attraverso servizi di sicurezza e valutazione dei rischi._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Azienda di sicurezza dei contratti intelligenti che fornisce audit di sicurezza per sistemi distribuiti._

- **[Runtime Verification](https://runtimeverification.com/)** - _Azienda di sicurezza specializzata nella modellazione formale e nella verifica dei contratti intelligenti._

- **[Hacken](https://hacken.io)** - _Auditor di cybersecurity per Web3 che adotta un approccio a 360 gradi alla sicurezza della blockchain._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Servizi di audit di Solidity e Cairo, che garantiscono l'integrità dei contratti intelligenti e la sicurezza degli utenti su Ethereum e Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx si concentra sull'audit di blockchain e contratti intelligenti per garantire la sicurezza delle criptovalute, fornendo servizi come lo sviluppo di contratti intelligenti, test di penetrazione e consulenza blockchain._

- **[Code4rena](https://code4rena.com/)** - _Piattaforma di audit competitiva che incentiva gli esperti di sicurezza dei contratti intelligenti a trovare vulnerabilità e a contribuire a rendere il web3 più sicuro._

- **[CodeHawks](https://codehawks.com/)** - _Piattaforma di audit competitiva che ospita competizioni di audit di contratti intelligenti per ricercatori di sicurezza._

- **[Cyfrin](https://cyfrin.io)** - _Potenza della sicurezza Web3, che incuba la criptosicurezza attraverso prodotti e servizi di audit dei contratti intelligenti._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Azienda di sicurezza Web3 che offre audit di sicurezza per sistemi blockchain attraverso un team di auditor esperti e i migliori strumenti della categoria._

- **[Oxorio](https://oxor.io/)** - _Audit di contratti intelligenti e servizi di sicurezza blockchain con esperienza in EVM, Solidity, ZK, tecnologia cross-chain per aziende di criptovalute e progetti DeFi._

- **[Inference](https://inference.ag/)** - _Società di audit di sicurezza, specializzata nell'audit di contratti intelligenti per blockchain basate su EVM. Grazie ai suoi esperti revisori, identifica le potenziali problematiche e suggerisce le soluzioni attuabili per risolverle prima della distribuzione._

### Piattaforme di bug bounty {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Piattaforma di bug bounty per contratti intelligenti e progetti DeFi, in cui i ricercatori di sicurezza esaminano il codice, divulgano le vulnerabilità, vengono pagati e rendono le criptovalute più sicure._

- **[HackerOne](https://www.hackerone.com/)** - _Piattaforma di coordinamento delle vulnerabilità e di bug bounty che mette in contatto le aziende con penetration tester e ricercatori di cybersecurity._

- **[HackenProof](https://hackenproof.com/)** - _Piattaforma esperta di bug bounty per progetti di criptovalute (DeFi, Contratti Intelligenti, Portafogli, CEX e altro), in cui i professionisti della sicurezza forniscono servizi di triage e i ricercatori vengono pagati per segnalazioni di bug pertinenti e verificate._

- **[Sherlock](https://www.sherlock.xyz/)** - _Sottoscrittore in Web3 per la sicurezza dei contratti intelligenti, con pagamenti per gli auditor gestiti tramite contratti intelligenti per garantire che i bug rilevanti siano pagati equamente._

- **[CodeHawks](https://www.codehawks.com/)** - _Piattaforma competitiva di caccia ai bug in cui i revisori prendono parte a gare e sfide di sicurezza e (presto) ai propri audit privati._

### Pubblicazioni di vulnerabilità ed exploit noti dei contratti intelligenti {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Attacchi noti ai contratti intelligenti](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Spiegazione per principianti delle vulnerabilità più significative dei contratti, con esempi di codice per la maggior parte dei casi._

- **[Registro SWC](https://swcregistry.io/)** - _Elenco curato di elementi della Common Weakness Enumeration (CWE) che si applicano ai contratti intelligenti di Ethereum._

- **[Rekt](https://rekt.news/)** - _Pubblicazione regolarmente aggiornata di hack ed exploit di criptovalute di alto profilo, insieme a rapporti post-mortem dettagliati._

### Sfide per l'apprendimento della sicurezza dei contratti intelligenti {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Elenco curato di wargame di sicurezza blockchain, sfide, competizioni [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) e soluzioni scritte._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame per imparare la sicurezza offensiva dei contratti intelligenti DeFi e sviluppare competenze nella caccia ai bug e nell'audit di sicurezza._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Wargame basato su Web3/Solidity in cui ogni livello è un contratto intelligente che deve essere 'hackerato'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Sfida di hacking di contratti intelligenti, ambientata in un'avventura fantasy. Inoltre, il completamento della sfida fornisce l'accesso a un programma privato di caccia ai bug._

### Migliori pratiche per la messa in sicurezza dei contratti intelligenti {#smart-contract-security-best-practices}

- **[ConsenSys: Migliori pratiche per la sicurezza dei contratti intelligenti di Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Elenco completo di linee guida per la messa in sicurezza dei contratti intelligenti di Ethereum._

- **[Nascent: Semplice toolkit di sicurezza](https://github.com/nascentxyz/simple-security-toolkit)** - _Raccolta di guide pratiche incentrate sulla sicurezza e di liste di controllo per lo sviluppo di contratti intelligenti._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _Utile raccolta di pattern sicuri e migliori pratiche per il linguaggio di programmazione di contratti intelligenti Solidity._

- **[Documentazione di Solidity: Considerazioni sulla sicurezza](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Linee guida per scrivere contratti intelligenti sicuri con Solidity._

- **[Standard di verifica della sicurezza dei contratti intelligenti](https://github.com/securing/SCSVS)** - _Lista di controllo in quattordici parti creata per standardizzare la sicurezza dei contratti intelligenti per sviluppatori, architetti, revisori di sicurezza e fornitori._

- **[Impara la sicurezza e l'audit dei contratti intelligenti](https://updraft.cyfrin.io/courses/security)** - _Il corso definitivo sulla sicurezza e l'audit dei contratti intelligenti, creato per gli sviluppatori di contratti intelligenti che desiderano migliorare le loro migliori pratiche di sicurezza e diventare ricercatori di sicurezza._

### Tutorial sulla sicurezza dei contratti intelligenti {#tutorials-on-smart-contract-security}

- [Come scrivere contratti intelligenti sicuri](/developers/tutorials/secure-development-workflow/)

- [Come usare Slither per trovare bug nei contratti intelligenti](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Come usare Manticore per trovare bug nei contratti intelligenti](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Linee guida sulla sicurezza dei contratti intelligenti](/developers/tutorials/smart-contract-security-guidelines/)

- [Come integrare in sicurezza il tuo contratto di token con token arbitrari](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Corso completo sulla sicurezza e l'audit dei contratti intelligenti](https://updraft.cyfrin.io/courses/security)
