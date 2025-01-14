---
title: Sicurezza dei contratti intelligenti
description: Una panoramica delle linee guida per costruire contratti intelligenti di Ethereum sicuri
lang: it
---

I contratti intelligenti sono estremamente flessibili e in grado di gestire grandi quantità di valori e dati, eseguendo allo stesso tempo una logica immutata basata sul codice distribuito sulla blockchain. Questo ha dato vita a un vivace ecosistema di applicazioni senza fiducia e decentralizzate, che offrono molti vantaggi rispetto ai sistemi legacy. I contratti intelligenti rappresentano anche un'opportunità per gli utenti malevoli che provano a speculare sfruttandone le vulnerabilità.

Blochchain pubbliche come Ethereun rendono ancora più complessa la questione della sicurezza dei contratti intelligenti. Una volta distribuito, il codice dei contratti _di solito_ non può essere modificato per correggere falle di sicurezza. In più, le risorse rubate dai contratti intelligenti sono estremamente difficili da tracciare e praticamente irrecuperabili per via della loro immutabilità.

Anche se i dati possono variare, si stima che l'ammontare totale di valore rubato o perduto a causa di falle di sicurezza nei contratti intelligenti superi facilmente $1 miliardo. In questo sono inclusi incidenti rilievo come la [violazione della DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 milioni di ETH rubati, per un valore superiore a $1 miliardo al prezzo attuale), la [violazione del portafoglio multi-firma di Parity](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach) ($30 milioni sottratti dagli hacker), e la questione del [portafoglio Parity congelato](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (più di $300 milioni di ETH bloccati per sempre).

Per via di tutte queste problematiche, è imperativo per gli sviluppatori investire risorse nella costruzione di contratti intelligenti sicuri, robusti e resilienti. La sicurezza dei contratti intelligenti è una questione seria, su cui ogni sviluppatore farebbe bene a informarsi. Questa guida tratterà alcune considerazioni sulla sicurezza rivolte agli sviluppatori Ethereum ed esaminerà le risorse per migliorare la sicurezza dei contratti intelligenti.

## Prerequisiti {#prerequisites}

Assicurati di avere familiarità con le [basi di programmazione di contratti intelligenti](/developers/docs/smart-contracts/) prima di affrontare la questione sicurezza.

## Linee guida per costruire contratti intelligenti di Ethereum sicuri {#smart-contract-security-guidelines}

### 1. Progetta controlli di accesso adeguati {#design-proper-access-controls}

Nei contratti intelligenti, le funzioni contrassegnate da `public` o `external` possono essere chiamate da qualsiasi conto posseduto esternamente (EOA) o da un conto contratto. È necessario specificare la visibilità pubblica per le funzioni se si desidera che altri interagiscano con il contratto. Le funzioni contrassegnate da `private` invece possono essere chiamate solo da funzioni all'interno del contratto intelligente e non da conti esterni. Dare a ogni partecipante della rete l'accesso alle funzioni del contratto può causare problemi, soprattutto se ciò implica che chiunque possa eseguire operazioni sensibili (ad esempio, coniare nuovi token).

Per prevenire l'uso non autorizzato di funzioni di contratti intelligenti, è necessario implementare controlli di accesso sicuri. I meccanismi di controlli di accesso limitano la possibilità di utilizzare determinate funzioni in un contratto intelligente a soggetti approvati, come i conti responsabili della gestione del contratto. Il **modello Ownable** e il **controllo basato sul ruolo** sono due modelli utili per implementare il controllo di access nei contratti intelligenti:

#### Modello Ownable {#ownable-pattern}

Nel modello Ownable, un indirizzo è impostato come “proprietario” del contratto durante il processo di creazione del contratto. Alle funzioni protette viene assegnato un modificatore `OnlyOwner` che garantisce che il contratto autentichi l'identità dell'indirizzo chiamante prima di eseguire la funzione. Le chiamate a funzioni protette che provengono da altri indirizzi a parte il proprietario del contratto sono sempre respinte, impedendo accessi indesiderati.

#### Controllo di accesso basato sul ruolo {#role-based-access-control}

Registrare un unico indirizzo come `Owner` in un contratto intelligente introduce un rischio di centralizzazione e rappresenta un punto di errore unico. Se le chiavi del conto del proprietario sono compromesse, gli aggressori possono attaccare il contratto proprietario. Questo è il motivo per cui utilizzare un modello di controllo di accesso basato su ruoli con più conti amministrativi potrebbe essere un'opzione migliore.

Nel controllo di accesso basato sui ruoli, l'accesso alle funzioni sensibili è distribuito in un gruppo di partecipanti fidati. Per esempio, un conto può essere responsabile della coniazione di token, mentre un altro esegue gli aggiornamenti o interrompe il contratto. Decentralizzare in questo modo il controllo di accesso elimina punti di errore unici e riduce il bisogno di ipotesi di fiducia per gli utenti.

##### Uso dei portafogli multifirma

Un altro approccio utile per implementare un controllo di accesso sicuro è utilizzare un [conto multifirma](/developers/docs/smart-contracts/#multisig) nella gestione di un contratto. A differenza di un comune EOA, i conti multifirma sono di proprietà di più entità e richiedono un numero minimo di firme da parte di più conti - solitamente da 3 a 5 - per eseguire transazioni.

L'utilizzo di un multifirma per il controllo di accesso introduce un ulteriore livello di sicurezza, dal momento che le azioni effettuate sul contratto di destinazione richiedono il consenso di più parti. Ciò è particolarmente utile nei casi in cui è necessario fare uso del modello Ownable, in quanto sarà più di difficile per un aggressore esterno o un insider ostile manipolare le funzioni sensibili del contratto per scopi malevoli.

### 2. Usa le istruzioni require(), assert(), e revert() per sorvegliare le operazioni del contratto {#use-require-assert-revert}

Come accennato, chiunque potrà chiamare funzioni pubbliche nel tuo contratto intelligente una volta che questo sarà distribuito sulla blockchain. Poiché è impossibile sapere in anticipo come i conti esterni interagiranno con un contratto, l'ideale è implementare, prima della distribuzione, misure di salvaguardia interne nei confronti di operazioni sensibili. È possibile imporre un comportamento corretto nei contratti intelligenti utilizzando le istruzioni `require()`, `assert()` e `revert()` per attivare eccezioni e annullare le modifiche dello stato se l'esecuzione non soddisfa determinati requisiti.

**`require()`**: le istruzioni `require` sono definite all'inizio della funzione e assicurano che siano soddisfatte condizioni predefinite prima che venga eseguita la funzione chiamata. Un'istruzione `require` è utilizzabile per convalidare gli input dell'utente, controllare le variabili di stato o autenticare l'identità del conto chiamante, prima di procedere con una funzione.

**`assert()`**: `assert()` è usata per rilevare gli errori interni e verificare le violazioni delle "invarianti" nel tuo codice. Un'invariante è un'asserzione logica sullo stato di un contratto, che dovrebbe rimanere valida per tutte le esecuzioni della funzione. Un esempio di invariante è la fornitura o saldo massimo totale del contratto di un token. Usare `assert()` garantisce che il tuo contratto non raggiunga mai uno stato vulnerabile e, se lo fa, tutte le modifiche alle variabili di stato sono annullate.

**`revert()`**: `revert()` è utilizzabile in un'istruzione if-else che innesca un'eccezione se la condizione necessaria non è soddisfatta. Il seguente esempio di contratto utilizza `revert()` per proteggere l'esecuzione delle funzioni:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Perform the purchase.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Testa i contratti intelligenti e verifica la correttezza del codice {#test-smart-contracts-and-verify-code-correctness}

L'immutabilità del codice in esecuzione sulla [Macchina Virtuale di Ethereum](/developers/docs/evm/) fa sì che i contratti intelligenti richiedano un livello superiore di valutazione della qualità durante la fase di sviluppo. Testare ampiamente il tuo contratto e osservarlo per cogliere qualsiasi risultato imprevisto ne migliorerà considerevolmente la sicurezza e proteggerà i tuoi utenti sul lungo periodo.

Il metodo consueto prevede di scrivere piccole unità di prova utilizzando i dati di simulazione che il contratto dovrebbe ricevere dagli utenti. La conduzione di [unit test](/developers/docs/smart-contracts/testing/#unit-testing) contribuisce a testare la funzionalità di certe funzioni e assicurarsi che un contratto intelligente funzioni come previsto.

Sfortunatamente, gli unit test sono poco efficaci per migliorare la sicurezza del contratto intelligente se utilizzato in isolamento. Uno unit test potrebbe provare che una funzione sia eseguita correttamente per i dati di simulazione, ma gli unit test sono efficaci solo quanto i test scritti. Questo rende difficile rilevare i casi limite non identificati e le vulnerabilità che potrebbero spezzare la sicurezza del tuo contratto intelligente.

Un approccio migliore è combinare gli unit test con i test basati sulle proprietà, eseguiti usando l'[analisi statica e dinamica](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). L'analisi statica si affida alle rappresentazioni di basso livello, come i [grafici del flusso di controllo](https://en.wikipedia.org/wiki/Control-flow_graph) e gli [alberi di sintassi astratta](https://deepsource.io/glossary/ast/) per analizzare gli stati raggiungibili del programma e i percorsi d'esecuzione. Nel mentre, le tecniche di analisi dinamica, come il [fuzzing dei contratti intelligenti](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), eseguono il codice del contratto con valori di input casuali per rilevare le operazioni che violano le proprietà di sicurezza.

La [verifica formale](/developers/docs/smart-contracts/formal-verification) è un'altra tecnica per verificare le proprietà di sicurezza nei contratti intelligenti. A differenza dei test regolari, la verifica formale può dimostrare in modo conclusivo l'assenza di errori in un contratto intelligente. Ciò si ottiene creando una specifica formale che racchiuda le proprietà di sicurezza desiderate e dimostrando che un modello formale dei contratti aderisce a tale specifica.

### 4. Richiedi una revisione indipendente del tuo codice {#get-independent-code-reviews}

Dopo aver testato il tuo contratto, è bene richiedere ad altri di verificare il codice sorgente per qualsiasi problema di sicurezza. I test non scopriranno ogni difetto di un contratto intelligente, ma ottenere una revisione indipendente aumenta la possibilità di individuare le vulnerabilità.

#### Controlli {#audits}

Commissionare il controllo di un contratto intelligente è un modo di condurre una revisione indipendente del codice. I revisori rivestono un ruolo importante nell'assicurare che i contratti intelligenti siano sicuri e liberi da difetti di qualità ed errori di progettazione.

Detto ciò, dovresti evitare di trattare i controlli come una bacchetta magica. I controlli del contratto intelligente non troveranno ogni bug e sono principalmente progettati per fornire un ulteriore ciclo di revisioni, che possono aiutare a rilevare i problemi non identificati dagli sviluppatori durante lo sviluppo e test iniziali. Inoltre, dovresti seguire le migliori pratiche per lavorare con i revisori, come documentare correttamente il codice e aggiungere commenti inline, per massimizzare i benefici del controllo di un contratto intelligente.

- [Consigli e trucchi di controllo dei contratti intelligenti](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Ottieni il massimo dal tuo controllo](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Caccia ai bug {#bug-bounties}

Impostare un programma di caccia ai bug è un altro approccio per implementare le revisioni esterne del codice. Una bug bounty è una ricompensa finanziaria data a persone (solitamente hacker whitehat) che scoprono vulnerabilità in un'applicazione.

Quando usate propriamente, queste ricompense per la caccia ai bug incentivano i membri della community di hacker a ispezionare il tuo codice in cerca di difetti critici. Un esempio reale è il "bug del denaro infinito", che avrebbe consentito a un utente malevolo di creare un importo illimitato di Ether su [Optimism](https://www.optimism.io/), un protocollo del [livello 2](/layer-2/) eseguito su Ethereum. Fortunatamente, un hacker whitehat [ha scoperto il difetto](https://www.saurik.com/optimism.html) e informato il team, [guadagnandosi una ricca ricompensa](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Una strategia utile è impostare la ricompensa di un programma di caccia ai bug proporzionale all'importo di fondi in staking. Descritto come "[caccia ai bug scalare](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)", questo approccio fornisce incentivi finanziari alle persone perché divulghino responsabilmente le vulnerabilità invece di sfruttarle.

### 5. Segui le migliori pratiche durante lo sviluppo del contratto intelligente {#follow-smart-contract-development-best-practices}

L'esistenza di controlli e ricompense per la caccia ai bug non è una scusa per non scrivere codice di alta qualità. Una buona sicurezza dei contratti intelligenti deriva da processi di progettazione e sviluppo adeguati:

- Archivia tutto il codice in un sistema di controllo delle versioni, come git

- Effettua tutte le modifiche al codice tramite richieste pull

- Assicurati che le richieste pull abbiano almeno un revisore indipendente; se stai lavorando a un progetto da solo, valuta di trovare altri sviluppatori e di scambiare revisioni di codice

- Usa un [ambiente di sviluppo](/developers/docs/frameworks/) per testare, compilare e distribuire i contratti intelligenti

- Esegui il tuo codice tramite strumenti di analisi del codice di base, come [Cyfrin Aaderyn](https://github.com/Cyfrin/aderyn), Mythril e Slither. Idealmente, dovresti farlo prima della fusione di ogni richiesta pull e confrontare le differenze nell'output

- Assicurati che il tuo codice si compili senza errori e che il compilatore di Solidity non emetta alcun avviso

- Documenta correttamente il tuo codice (usando [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) e descrivi i dettagli sull'architettura del contratto in un linguaggio facile da comprendere. Questo semplificherà il controllo e la revisione del tuo codice da parte di altri.

### 6. Implementa solidi piani di ripristino in caso di disastro {#implement-disaster-recovery-plans}

Progettare controlli di accesso sicuri, implementare modificatori di funzioni e altri suggerimenti possono migliorare la sicurezza dei contratti intelligenti, ma non possono escludere la possibilità di exploit dannosi. Creare contratti intelligenti sicuri richiede di "prepararsi al fallimento" e di avere un piano di ripiego per rispondere efficientemente agli attacchi. Un adeguato piano di ripristino in caso di disastro includerà alcuni o tutti i seguenti componenti:

#### Aggiornamenti del contratto {#contract-upgrades}

Sebbene i contratti intelligenti di Ethereum siano immutabili di default, è possibile ottenere un certo grado di mutabilità utilizzando dei modelli di aggiornamento. Aggiornare i contratti è necessario nel caso in cui un difetto critico renda inutilizzabile il tuo vecchio contratto e distribuire una nuova logica sia l'opzione più fattibile.

I meccanismi di aggiornamento del contratto operano diversamente, ma lo "schema del proxy" è uno degli approcci più popolari per aggiornare i contratti intelligenti. Gli [schemi del proxy](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) dividono la logica e lo stato di un'applicazione tra _due_ contratti. Il primo contratto (detto "contratto proxy") archivia le variabili di stato (es., i saldi degli utenti), mentre il secondo (detto "contratto logico") detiene il codice per l'esecuzione delle funzioni del contratto.

I conti interagiscono con il contratto proxy, che invia le chiamate di tutte le funzioni al contratto logico utilizzando la chiamata di basso livello [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). A differenza di una normale chiamata di messaggio, `delegatecall()` garantisce che il codice in esecuzione all'indirizzo del contratto logico sia eseguito nel contesto del contratto chiamante. Ciò significa che il contratto logico scriverà sempre sulla memoria del proxy (invece che sulla propria) e che i valori originali di `msg.sender` e `msg.value` sono preservati.

Delegare le chiamate al contratto logico richiede l'archiviazione del suo indirizzo nella memoria del contratto proxy. Pertanto, aggiornare la logica del contratto è solo una questione di distribuire un altro contratto logico e archiviare il nuovo indirizzo nel contratto proxy. Poiché le chiamate successive al contratto proxy sono indirizzate automaticamente al nuovo contratto logico, avresti "aggiornato" il contratto senza effettivamente modificare il codice.

[Maggiori informazioni sull'aggiornamento dei contratti](/developers/docs/smart-contracts/upgrading/).

#### Arresto d'emergenza {#emergency-stops}

Come accennato, i controlli e test estesi non possono verosimilmente scoprire tutti i bug in un contratto intelligente. Se una vulnerabilità appare nel tuo codice dopo la distribuzione, correggerla è impossibile perché non puoi modificare il codice in esecuzione all'indirizzo del contratto. Inoltre, i meccanismi di aggiornamento (es., schemi del proxy) potrebbero richiedere del tempo per l'implementazione (spesso richiedono l'approvazione di parti differenti), dando più tempo agli utenti malevoli di causare più danni.

L'opzione più drastica è implementare una funzione di "arresto d'emergenza" che blocca le chiamate alle funzioni vulnerabili in un contratto. Gli arresti d'emergenza comprendono tipicamente i seguenti componenti:

1. Una variabile booleana globale che indica se il contratto intelligente è in uno stato d'arresto o no. Questa variabile è impostata a `false` durante la configurazione del contratto, ma si ripristinerà a `true` una volta arrestato il contratto.

2. Funzioni riferite alla variabile booleana nella loro esecuzione. Tali funzioni sono accessibili quando il contratto intelligente non è arrestata e divengono inaccessibili una volta innescata la funzionalità di arresto d'emergenza.

3. Un'entità avente accesso alla funzione di arresto d'emergenza, che imposta la variabile booleana a `true`. Per impedire azioni dannose, le chiamate a questa funzione possono essere limitate a un indirizzo fidato (es., il proprietario del contratto).

Una volta che il contratto attiva l'arresto d'emergenza, certe funzioni non potranno essere chiamate. Ciò avviene avvolgendo le funzioni selezionate in un modificatore che fa riferimento alla variabile globale. Di seguito, è riportato [un esempio](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) che descrive un'implementazione di questo schema nei contratti:

```solidity
// Questo codice non è stato controllato professionalmente e non fa promesse su sicurezza o correttezza. Usalo a tuo rischio.

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
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Emergency withdraw happening here
    }
}
```

Questo esempio mostra le caratteristiche fondamentali degli arresti d'emergenza:

- `isStopped` è una variabile booleana che restituisce `false` all'inizio e `true` quando il contratto entra in modalità d'emergenza.

- I modificatori della funzione `onlyWhenStopped` e `stoppedInEmergency` controllano la variabile `isStopped`. `stoppedInEmergency` è usata per controllare le funzioni che non dovrebbero essere accessibili quando il contratto è vulnerabile (es., `deposit()`). Le chiamate a queste funzioni saranno semplicemente annullate.

`onlyWhenStopped` è usata per le funzioni che dovrebbero poter essere chiamate durante un'emergenza (es., `emergencyWithdraw()`). Tali funzioni possono aiutare a risolvere la situazione, da cui la loro esclusione dall'elenco delle "funzioni limitate".

L'utilizzo di una funzionalità di arresto d'emergenza fornisce un palliativo efficiente per affrontare gravi vulnerabilità nel tuo contratto intelligente. Tuttavia, aumenta la necessità che gli utenti si fidino del fatto che gli sviluppatori non la attiveranno per motivi egoistici. A tal fine, decentralizzare il controllo dell'arresto d'emergenza sottoponendolo a un meccanismo di voto sulla catena, blocco temporale o a un'approvazione da un portafoglio multifirma, sono possibili soluzioni.

#### Monitoraggio degli eventi {#event-monitoring}

Gli [eventi](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) ti consentono di tracciare le chiamate alle funzioni del contratto intelligente e di monitorare le modifiche alle variabili di stato. È ideale programmare il tuo contratto intelligente in modo che emetta un evento ogni volta che una qualche parte effettua un'azione critica per la sicurezza (es., prelevare fondi).

Registrare gli eventi e monitorarli al di fuori della catena fornisce dettagli sulle operazioni del contratto e aiuta a scoprire più velocemente le azioni malevoli. Ciò significa che il tuo team può rispondere più velocemente alle violazioni e agire per mitigare l'impatto sugli utenti, ad esempio interrompendo le funzioni o eseguendo un aggiornamento.

Puoi anche optare per uno strumento di monitoraggio standard che inoltri automaticamente degli avvisi ogni volta che qualcuno interagisce con i tuoi contratti. Questi strumenti ti consentiranno di creare avvisi personalizzati basati su diversi inneschi, come il volume delle transazioni, la frequenza delle chiamate alla funzione o le funzioni specifiche coinvolte. Ad esempio, potresti programmare un avviso che si attivi quando l'importo prelevato in una singola transazione sia superiore a una determinata soglia.

### 7. Progetta sistemi di governance sicuri {#design-secure-governance-systems}

Potresti voler decentralizzare la tua applicazione dando il controllo dei contratti intelligenti ai membri della community. In questo caso, il sistema del contratto intelligente includerà un modulo di governance, ossia un meccanismo che consente ai membri della community di approvare le azioni amministrative tramite un sistema di governance sulla catena. Ad esempio, una proposta di aggiornare un contratto proxy a una nuova implementazione potrebbe esser votata dai possessori di token.

La governance decentralizzata può essere vantaggiosa, specialmente poiché si allinea agli interessi degli sviluppatori e degli utenti finali. Tuttavia, i meccanismi di governance del contratto intelligente potrebbero introdurre nuovi rischi, se implementati in modo errato. Uno scenario plausibile è se un utente malevolo acquisisce un enorme potere di voto (misurato in numero di token posseduti) chiedendo un [prestito flash](/defi/#flash-loans) e presentando una proposta dannosa.

Un modo di prevenire i problemi correlati alla governance sulla catena è [utilizzare un blocco temporale](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Un blocco temporale impedisce a un contratto intelligente di eseguire certe azioni finché non passa un dato periodo di tempo. Altre strategie includono l'assegnazione di un "peso di voto" a ogni token a seconda del tempo per cui è stato bloccato, o la misurazione del potere di voto di un indirizzo in un dato periodo storico (ad esempio, 2-3 blocchi nel passato) invece che al blocco corrente. Entrambi i metodi riducono la possibilità di accumulare rapidamente potere di voto per influire sui voti sulla catena.

Maggiori informazioni sulla [progettazione di sistemi di governance sicuri](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), sui [diversi meccanismi di voto nelle DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) e sui [vettori d'attacco comuni alle DAO che sfruttano la DeFi](https://dacian.me/dao-governance-defi-attacks) nei collegamenti condivisi.

### 8. Riduci al minimo la complessità nel codice {#reduce-code-complexity}

Gli sviluppatori di software tradizionali hanno familiarità con il principio KISS ("keep it simple, stupid", letteralmente "tieniti sul semplice, stupido"), che consiglia di non introdurre complessità non necessarie nella progettazione del software. Questo segue il pensiero di vecchia data che i "sistemi complessi falliscono in modi complessi" e che siano più suscettibili a errori costosi.

Mantenere le cose semplici è di particolare importanza nella scrittura dei contratti intelligenti, dato che i contratti intelligenti potrebbero potenzialmente controllare grandi importi di valore. Un suggerimento per ottenere la semplicità durante la scrittura dei contratti intelligenti è riutilizzare le librerie esistenti, come i [contratti di OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/), laddove possibile. Poiché queste librerie sono state controllate e testate ampiamente dagli sviluppatori, utilizzarle riduce le possibilità di introdurre bug rispetto a scrivere nuove funzionalità da zero.

Un altro consiglio comune è scrivere piccole funzioni e mantenere i contratti modulari, dividendo la logica commerciale su più contratti. Non solo la scrittura di codice più semplice può ridurre la superficie di attacco in un contratto intelligente, ma rende anche più semplice ragionare della correttezza del sistema complessivo e rilevare precocemente possibili errori di progettazione.

### 9. Difenditi dalle vulnerabilità comuni dei contratti intelligenti {#mitigate-common-smart-contract-vulnerabilities}

#### Rientranza {#reentrancy}

L'EVM non consente la concorrenza, il che significa che due contratti coinvolti in una chiamata di messaggio non possono essere eseguiti simultaneamente. Una chiamata esterna interrompe l'esecuzione e la memoria del contratto chiamante fino al ritorno della chiamata, dopodiché l'esecuzione procede normalmente. Questo processo può essere formalmente descritto come il trasferimento del [flusso di controllo](https://www.computerhope.com/jargon/c/contflow.htm) a un altro contratto.

Sebbene per lo più innocuo, il trasferimento del flusso di controllo a contratti non fidati può causare dei problemi, come la rientranza. Un attacco di rientranza si verifica quando un contratto malevolo viene richiamato in un contratto vulnerabile prima che l'invocazione della funzione originale sia completa. Questo tipo di attacco può essere spiegato meglio con un esempio.

Considera un contratto intelligente semplice ('Victim') che consenta a chiunque di depositare e prelevare Ether:

```solidity
// Questo contratto è vulnerabile. Non utilizzarlo in produzione

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

La funzione `withdraw()` nel contratto `Victim` segue uno schema di "controlli-interazioni-effetti". _Verifica_ se le condizioni necessarie per l'esecuzione sono soddisfatte (cioè, se l'utente ha un saldo di ETH positivo) ed esegue l'_interazione_ inviando gli ETH all'indirizzo del chiamante, prima di applicare gli _effetti_ della transazione (cioè, ridurre il saldo dell'utente).

Se `withdraw()` viene chiamato da un conto posseduto esternamente (EOA), la funzione si esegue come previsto: `msg.sender.call.value()` invia gli ETH al chiamante. Tuttavia, se `msg.sender` è un conto del contratto intelligente e chiama `withdraw()`, inviare i fondi utilizzando `msg.sender.call.value()` innescherà anche l'esecuzione del codice archiviato a quell'indirizzo.

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

Non c'è nulla di sbagliato qui, tranne il fatto che l'`Attacker` ha un'altra funzione che chiama nuovamente `withdraw()` in `Victim` se il gas rimanente da `msg.sender.call.value` in entrata è superiore a 40.000. Questo consente all'`Attacker` di rientrare nel contratto `Victim` e di prelevare ulteriori fondi, _prima_ del completamento della prima invocazione di `withdraw`. Il ciclo somiglia al seguente:

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

Riepilogando: poiché il saldo del chiamante non è impostato a 0 fino al completamento dell'esecuzione della funzione, le invocazioni successive avranno successo, consentendo al chiamante di prelevare il proprio saldo numerose volte. Questo tipo di attacco è utilizzabile per sottrarre a un contratto intelligente i suoi fondi, come è avvenuto nella [violazione della DAO del 2016](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/). Gli attacchi di rientranza sono ancora oggi un problema critico per i contratti intelligenti, come mostrato dagli [elenchi pubblici di exploit di rientranza](https://github.com/pcaversaccio/reentrancy-attacks).

##### Come prevenire gli attacchi di rientranza

Un approccio per affrontare la rientranza è seguire lo [schema di controlli-effetti-interazioni](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Questo schema ordina l'esecuzione delle funzioni in modo che il codice che esegue i controlli necessari prima di procedere all'esecuzione venga per primo, seguito dal codice che manipola lo stato del contratto e il codice che interagisce con gli altri contratti o EOA per ultimo.

Lo schema di controlli-effetti-interazioni è utilizzato in una versione rivista del contratto `Victim`, mostrato di seguito:

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

Un'altra opzione è utilizzare un blocco di esclusione reciproca (comunemente descritto come "mutex"), che blocca una porzione dello stato di un contratto fino al completamento dell'invocazione di una funzione. Questo è implementato utilizzando una variabile booleana impostata a `true` prima dell'esecuzione della funzione e ripristinata a `false` dopo l'invocazione. Come si può vedere nell'esempio seguente, l'utilizzo di un mutex protegge una funzione dalle chiamate ricorsive mentre l'invocazione originale è ancora in elaborazione, interrompendo efficientemente la rientranza.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // This function is protected by a mutex, so reentrant calls from within `msg.sender.call` cannot call `withdraw` again.
    //  L'istruzione `return` risulta in `true`, pur valutando l'istruzione `locked = false` nel modificatore
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "Nessun saldo da prelevare.");

        balances[msg.sender] -= _amount;
        bool (success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Puoi anche utilizzare un sistema di [pagamenti pull](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment), che richiede agli utenti di prelevare i fondi dai contratti intelligenti, invece di un sistema di "pagamenti push", che invia i fondi ai conti. Ciò rimuove la possibilità di innescare inavvertitamente il codice a indirizzi sconosciuti (e può anche impedire determinati attacchi denial-of-service).

#### Sottoeccedenze e sovraflussi di interi {#integer-underflows-and-overflows}

Il sovraflusso di un intero si verifica quando i risultati di un'operazione aritmetica ricadono al di fuori dell'intervallo accettabile di valori, causandone un "ripristino" al valore più basso rappresentabile. Ad esempio, un `uint8` può memorizzare solo i valori fino a 2^8-1=255. Le operazioni automatiche che risultano in valori superiori a `255` eccederanno e ripristineranno `uint` a `0`, analogamente a come il contachilometri di un'auto si ripristina a zero una volta raggiunto il chilometraggio massimo (999999).

Le sottoeccedenze di interi si verificano per motivi simili: i risultati di un'operazione aritmetica ricadono al di sotto dell'intervallo accettabile. Diciamo che hai provato a ridurre `0` in un `uint8`, il risultato sarebbe semplicemente il ripristino al valore massimo rappresentabile (`255`).

Sia le sottoeccedenze che i sovraflussi di interi possono comportare modifiche impreviste alle variabili di stato di un contratto e risultare nell'esecuzione non pianificata. Di seguito è riportato un esempio che mostra come un utente malevolo può sfruttare il sovraflusso aritmetico in un contratto intelligente per eseguire un'operazione non valida:

```
pragma solidity ^0.7.6;

// Questo contratto è progettato per agire da caveau temporale.
// L'utente può depositare in questo contratto, ma non può prelevare per almeno una settimana.
// L'utente può inoltre estendere il tempo di attesa oltre il periodo di attesa di 1 settimana.

/*
1. Distribuisci TimeLock
2. Distribuisci Attack con l'indirizzo di TimeLock
3. Chiama Attack.attack inviando 1 ether. Potrai immediatamente
   prelevare i tuoi ether.

Cos'è successo?
L'attacco ha causato il sovraflusso di TimeLock.lockTime ed è riuscito a prelevare
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
        require(block.timestamp > lockTime[msg.sender], "Tempo di blocco non scaduto");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Impossibile inviare Ether");
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
        if t = tempo di blocco corrente, allora dobbiamo trovare x tale che
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Come prevenire sottoeccedenze e sovraflussi di interi

Dalla versione 0.8.0, il compilatore di Solidity rifiuta il codice risultante in sottoeccedenze e sovraflussi di interi. Tuttavia, i contratti compilati con una versione inferiore del compilatore dovrebbero eseguire controlli sulle funzioni che comportano operazioni aritmetiche, oppure utilizzare una libreria (es., [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) che controlli sottoeccedenze/sovraflussi.

#### Manipolazione degli oracoli {#oracle-manipulation}

Gli [oracoli](/developers/docs/oracles/) si procurano le informazioni al di fuori della catena e le inviano sulla catena per l'uso dai contratti intelligenti. Con gli oracoli puoi progettare dei contratti intelligenti che interagiscono con sistemi esterni alla catena, come i mercati dei capitali, espandendo notevolmente la loro applicazione.

Ma se l'oracolo è corrotto e invia informazioni errate sulla catena, i contratti intelligenti saranno eseguiti sulla base di input errati, il che può causare problemi. Questa è la base del "problema degli oracoli", che riguarda il compito di assicurarsi che le informazioni provenienti da un oracolo della blockchain siano accurate, aggiornate e tempestive.

Un problema di sicurezza correlato è l'utilizzo di un oracolo sulla catena, come uno scambio decentralizzato, per ottenere il prezzo a pronti per un bene. Le piattaforme di prestito nell'industria della [finanza decentralizzata (DeFi)](/defi/) lo fanno spesso per determinare il valore della garanzia di un utente, per determinare quanto possa prendere in prestito.

I prezzi del DEX sono spesso accurati, in gran parte a causa degli arbitri che ripristinano la parità nei mercati. Tuttavia, sono aperti alla manipolazione, in particolare se l'oracolo sulla catena calcola i prezzi dei beni sulla base degli schemi di negoziazione storici (come di solito accade).

Ad esempio, un utente malevolo potrebbe pompare artificialmente il prezzo a pronti di un bene richiedendo un prestito flash poco prima di interagire con il tuo contratto di prestito. L'interrogazione del DEX per sapere il prezzo del bene restituirebbe un valore superiore al normale (a causa del grande "ordine d'acquisto" dell'utente malevolo, distorcendo la domanda per il bene), consentendogli di prendere in prestito più del dovuto. Tali "attacchi di prestito flash" sono stati utilizzati per sfruttare la dipendenza dagli oracoli dei prezzi tra le applicazioni DeFi, costando ai protocolli milioni in fondi perduti.

##### Come prevenire la manipolazione degli oracoli

Il requisito minimo per [evitare la manipolazione dell'oracolo](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) è utilizzare una rete di oracoli decentralizzati per richiedere informazioni da più fonti per evitare punti di errore unici. In gran parte dei casi, gli oracoli decentralizzati contengono incentivi criptoeconomici integrati per incoraggiare i nodi dell'oracolo a segnalare le informazioni corrette, rendendoli più sicuri rispetto agli oracoli centralizzati.

Se prevedi di interrogare un oracolo sulla catena per conoscere i prezzi dei beni, valuta di utilizzarne uno che implementi un meccanismo di prezzo medio ponderato per il tempo (TWAP). Un [oracolo TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) interroga il prezzo di un bene in due momenti differenti (che puoi modificare) e calcola il prezzo a pronti a seconda della media ottenuta. La scelta di periodi di tempo più lunghi protegge il tuo protocollo dalla manipolazione dei prezzi poiché i grandi ordini eseguiti di recente non possono influire sui prezzi dei beni.

## Risorse di sicurezza dei contratti intelligenti per sviluppatori {#smart-contract-security-resources-for-developers}

### Strumenti per analizzare i contratti intelligenti e verificare la correttezza del codice {#code-analysis-tools}

- **[Strumenti e librerie di test](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)**: _raccolta di strumenti e librerie standard per eseguire unit test, analisi statiche e dinamiche sui contratti intelligenti._

- **[Strumenti di verifica formale](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)**: _strumenti per verificare la correttezza funzionale nei contratti intelligenti e controllare le invarianti._

- **[Servizi di controllo dei contratti intelligenti](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)**: _elenco di organizzazioni che forniscono servizi di controllo dei contratti intelligenti per progetti di sviluppo per Ethereum._

- **[Piattaforme di bug bounty](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)**: _piattaforme per coordinare le ricompense per la segnalazione di bug e ricompensare la divulgazione responsabile delle vulnerabilità critiche nei contratti intelligenti._

- **[Fork Checker](https://forkchecker.hashex.org/)**: _uno strumento online gratuito per verificare tutte le informazioni disponibili riguardanti un contratto diramato._

- **[ABI Encoder](https://abi.hashex.org/)**: _un servizio online gratuito per la codifica delle funzioni e degli argomenti del costruttore del tuo contratto in Solidity._

- **[Aderyn](https://github.com/Cyfrin/aderyn)**: _analizzatore statico di Solidity che attraversa gli alberi di sintassi astratta (AST) per individuare le vulnerabilità sospette e restituire i problemi in un formato Markdown facilmente fruibile._

### Strumenti per monitorare i contratti intelligenti {#smart-contract-monitoring-tools}

- **[OpenZeppelin Defender Sentinels](https://docs.openzeppelin.com/defender/v1/sentinel)**: _uno strumento per monitorare automaticamente e rispondere a eventi, funzioni e parametri della transazione sui tuoi contratti intelligenti._

- **[Tenderly Real-Time Alerting](https://tenderly.co/alerting/)**: _uno strumento per ricevere notifiche in tempo reale quando si verificano eventi insoliti o imprevisti sui tuoi contratti intelligenti o portafogli._

### Strumenti per l'amministrazione sicura dei contratti intelligenti {#smart-contract-administration-tools}

- **[OpenZeppelin Defender Admin](https://docs.openzeppelin.com/defender/v1/admin)**: _interfaccia per gestire l'amministrazione dei contratti intelligenti, inclusi i controlli d'accesso, gli aggiornamenti e l'interruzione._

- **[Safe](https://safe.global/)**: _portafoglio del contratto intelligente eseguito su Ethereum, che richiede un numero minimo di persone per approvare una transazione prima che possa verificarsi (M di N)._

- **[Contratti OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/)**: _librerie dei contratti per implementare funzionalità amministrative, inclusa la proprietà del contratto, aggiornamenti, controlli di accesso, governance, interruzioni e altro._

### Servizi di controllo dei contratti intelligenti {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://consensys.net/diligence/)**: _servizio di controllo dei contratti intelligenti che aiuta i progetti sull'ecosistema della blockchain ad assicurare che i loro protocolli siano pronti al lancio e creati per proteggere gli utenti._

- **[CertiK](https://www.certik.com/)**: _società di sicurezza Blockchain pionieristica nell'uso della tecnologia di verifica formale all'avanguardia sui contratti intelligenti e sulle reti blockchain._

- **[Trail of Bits](https://www.trailofbits.com/)**: _società di cybersicurezza che combina la ricerca sulla sicurezza con una mentalità da utente malevolo per ridurre i rischi e fortificare il codice._

- **[PeckShield](https://peckshield.com/)**: _società di sicurezza della blockchain che offre prodotti e servizi per la sicurezza, la privacy e l'usabilità dell'intero ecosistema blockchain._

- **[QuantStamp](https://quantstamp.com/)**: _servizio di controllo che facilita l'adozione mainstream della tecnologia della blockchain attraverso servizi di sicurezza e valutazione dei rischi._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)**: _società di sicurezza dei contratti intelligenti che fornisce controlli di sicurezza per i sistemi distribuiti_

- **[Runtime Verification](https://runtimeverification.com/)**: _società di sicurezza specializzata nella modellazione formale e nella verifica dei contratti intelligenti._

- **[Hacken](https://hacken.io)**: _Controllore della cybersicurezza in Web3 che porta un approccio a 360 gradi alla sicurezza della blockchain._

- **[](https://nethermind.io/smart-contracts-audits)**: _servizi di controllo in Solidity e Carico che garantiscono l'integrità dei contratti intelligenti e la sicurezza degli utenti nell'ecosistema Ethereum e Starknet._

- **[HashEx](https://hashex.org/)**: _HashEx è incentrata sul controllo della blockchain e dei controlli intelligenti allo scopo di garantire la sicurezza delle criptovalute, fornendo servizi come lo sviluppo di contratti intelligenti, test di penetrazione o consulenza sulla blockchain._

- **[Code4rena](https://code4rena.com/)**: _piattaforma di controllo competitiva che incentiva gli esperti di sicurezza dei contratti intelligenti a trovare le vulnerabilità e ad aiutare a rendere il Web3 più sicuro._

- **[CodeHawks](https://codehawks.com/)**: _piattaforma di controllo competitiva che ospita competizioni di controllo dei contratti intelligenti per ricercatori della sicurezza._

- **[Cyfrin](https://cyfrin.io)**: _motore di sicurezza per Web3, che incuba la criptosicurezza tramite prodotti e servizi di controllo dei contratti intelligenti._

- **[ImmuneBytes](https://www.immunebytes.com//smart-contract-audit/)**: _studio di sicurezza del Web3 che offre controlli di sicurezza per i sistemi della blockchain tramite un team di revisori esperti e strumenti di prim'ordine._

- **[Oxorio](https://oxor.io/)**: _servizi di controllo dei contratti intelligenti e sicurezza della blockchain con esperienza nell'EVM, in Solidity, tecnologie tra catene per cripto-aziende e progetti di DeFi._

- **[Inference](https://inference.ag/)**: _azienda di controllo della sicurezza, specializzata nel controllo dei contratti intelligenti per le blockchain basate sull'EVM. Grazie ai suoi esperti revisori, identifica le potenziali problematiche e suggerisce le soluzioni attuabili per risoverle prima della distribuzione._

### Piattaforme di bug bounty {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)**: _piattaforma di bug bounty per contratti intelligenti e progetti di DeFi, in cui i ricercatori revisionano il codice, divulgano le vulnerabilità, vengono pagati e rendono le criptovalute più sicure._

- **[HackerOne](https://www.hackerone.com/)**: _piattaforma di coordinamento delle vulnerabilità e di bug bounty che connette le aziende ai tester di penetrazione e ai ricercatori sulla cybersicurezza._

- **[HackenProof](https://hackenproof.com/)**: _piattaforma esperta di bug bounty per progetti di criptovalute (DeFi, contratti intelligenti, portafogli, CEX e altro), in cui dei professionisti della sicurezza forniscono servizi di triage e i ricercatori sono pagati per segnalazioni di bug rilevanti e verificate._

-  **[Sherlock](https://www.sherlock.xyz/)**: _sottoscrittore in Web3 per la sicurezza dei contratti intelligenti, con pagamenti per i revisori gestiti tramite contratti intelligenti per assicurarsi che i bug rilevanti siano pagati equamente._

-  **[CodeHawks](https://www.codehawks.com/)**: _piattaforma competitiva di caccia ai bug in cui i revisori prendono parte a gare e sfide di sicurezza e (presto) ai propri controlli privati._

### Pubblicazioni di vulnerabilità e sfruttamenti noti dei contratti intelligenti {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: attacchi noti ai contratti intelligenti](https://consensys.github.io/smart-contract-best-practices/attacks/)**: _spiegazione per principianti delle vulnerabilità più significative dei contratti, con esempi di codice per gran parte dei casi._

- **[Registro SWC](https://swcregistry.io/)**: _elenco curato di elementi di enumerazione delle debolezze comuni (CWE) che si applicano ai contratti intelligenti di Ethereum._

- **[Rekt](https://rekt.news/)**: _pubblicazione aggiornata regolarmente di violazioni e sfruttamenti di alto profilo delle criptovalute, con report postumi dettagliati._

### Sfide per imparare sulla sicurezza dei contratti intelligenti {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)**: _elenco curato di wargame di sicurezza della blockchain, sfide e competizioni di [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) e soluzioni._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)**: _wargame per apprendere la sicurezza offensiva dei contratti intelligenti della Defi e creare abilità di caccia ai bug e controllo di sicurezza._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)**: _wargame basato su Web3/Solidity in cui ogni livello è un contratto intelligente da 'violare'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)**: _sfida di violazione dei contratti intelligenti, ambientata in un'avventura fantasy. Inoltre, il completamento della sfida fornisce l'accesso a un programma privato di caccia ai bug._

### Migliori pratiche per proteggere i contratti intelligenti {#smart-contract-security-best-practices}

- **[ConsenSys: migliori pratiche sulla sicurezza dei contratti intelligenti di Ethereum](https://consensys.github.io/smart-contract-best-practices/)**: _elenco completo di linee guida per proteggere i contratti intelligenti di Ethereum._

- **[Nascent: semplice kit di strumenti di sicurezza](https://github.com/nascentxyz/simple-security-toolkit)**: _raccolta di pratiche guide e liste di controllo incentrate sulla sicurezza per lo sviluppo dei contratti intelligenti._

- **[Schemi di Solidity](https://fravoll.github.io/solidity-patterns/)**: _utile raccolta di schemi sicuri e migliori pratiche per il linguaggio di programmazione di contratti intelligenti Solidity._

- **[Documentazione di Solidity: considerazioni sulla sicurezza](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)**: _linee guida per la scrittura di contratti intelligenti sicuri con Solidity._

- **[Standard di verifica della sicurezza dei contratti intelligenti](https://github.com/securing/SCSVS)**: _lista di controllo in quattordici parti, creata per standardizzare la sicurezza dei contratti intelligenti per sviluppatori, architetti, revisori di sicurezza e fornitori._

- **[Impara sulla sicurezza e il controllo dei contratti intelligenti](https://updraft.cyfrin.io/courses/security)**: _corso definitivo sulla sicurezza e il controllo dei contratti intelligenti, creato per gli sviluppatori di contratti intelligenti che desiderano migliorare le proprie migliori pratiche di sicurezza e diventare ricercatori della sicurezza._

### Tutorial sulla sicurezza dei contratti intelligenti {#tutorials-on-smart-contract-security}

- [Come scrivere contratti intelligenti sicuri](/developers/tutorials/secure-development-workflow/)

- [Come usare Slither per trovare bug nei contratti intelligenti](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Come usare Manticore per trovare bug nei contratti intelligenti](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Linee guida di sicurezza per i contratti intelligenti](/developers/tutorials/smart-contract-security-guidelines/)

- [Come integrare in sicurezza il tuo contratto dei token con token arbitrari](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft: corso completo sulla sicurezza e il controllo dei contratti intelligenti](https://updraft.cyfrin.io/courses/security)
