---
title: Sicurezza degli smart contract
description: Una panoramica delle linee guida per creare smart contract di Ethereum sicuri
lang: it
---

Gli smart contract sono estremamente flessibili e in grado di controllare grandi quantità di valore e dati, eseguendo al contempo una logica immutabile basata sul codice distribuito sulla blockchain. Questo ha creato un vivace ecosistema di applicazioni trustless e decentralizzate che offrono molti vantaggi rispetto ai sistemi legacy. Rappresentano anche delle opportunità per gli aggressori che cercano di trarre profitto sfruttando le vulnerabilità negli smart contract.

Le blockchain pubbliche, come [Ethereum](/), complicano ulteriormente il problema della messa in sicurezza degli smart contract. Il codice del contratto distribuito _di solito_ non può essere modificato per correggere le falle di sicurezza, mentre gli asset rubati dagli smart contract sono estremamente difficili da rintracciare e per lo più irrecuperabili a causa dell'immutabilità.

Sebbene le cifre varino, si stima che l'importo totale del valore rubato o perso a causa di difetti di sicurezza negli smart contract superi facilmente il miliardo di dollari. Questo include incidenti di alto profilo, come l'[attacco informatico alla DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 milioni di ETH rubati, per un valore di oltre 1 miliardo di dollari ai prezzi odierni), l'[attacco informatico al portafoglio multifirma di Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (30 milioni di dollari persi a causa degli hacker) e il [problema del portafoglio congelato di Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (oltre 300 milioni di dollari in ETH bloccati per sempre).

I problemi sopracitati rendono imperativo per gli sviluppatori investire sforzi nella creazione di smart contract sicuri, robusti e resilienti. La sicurezza degli smart contract è una questione seria, e ogni sviluppatore farà bene a impararla. Questa guida tratterà le considerazioni sulla sicurezza per gli sviluppatori di Ethereum ed esplorerà le risorse per migliorare la sicurezza degli smart contract.

## Prerequisiti {#prerequisites}

Assicurati di avere familiarità con i [fondamenti dello sviluppo di smart contract](/developers/docs/smart-contracts/) prima di affrontare la sicurezza.

## Linee guida per la creazione di smart contract sicuri su Ethereum {#smart-contract-security-guidelines}

### 1. Progettare controlli di accesso adeguati {#design-proper-access-controls}

Negli smart contract, le funzioni contrassegnate con `public` o `external` possono essere chiamate da qualsiasi account di proprietà esterna (EOA) o account di contratto. Specificare la visibilità pubblica per le funzioni è necessario se si desidera che altri interagiscano con il proprio contratto. Le funzioni contrassegnate con `private`, tuttavia, possono essere chiamate solo da funzioni all'interno dello smart contract e non da account esterni. Dare a ogni partecipante della rete l'accesso alle funzioni del contratto può causare problemi, specialmente se significa che chiunque può eseguire operazioni sensibili (ad es., il conio di nuovi token).

Per prevenire l'uso non autorizzato delle funzioni dello smart contract, è necessario implementare controlli di accesso sicuri. I meccanismi di controllo degli accessi limitano la capacità di utilizzare determinate funzioni in uno smart contract a entità approvate, come gli account responsabili della gestione del contratto. Il **pattern Ownable** e il **controllo basato sui ruoli** sono due pattern utili per implementare il controllo degli accessi negli smart contract:

#### Pattern Ownable {#ownable-pattern}

Nel pattern Ownable, un indirizzo viene impostato come "proprietario" del contratto durante il processo di creazione del contratto. Alle funzioni protette viene assegnato un modificatore `OnlyOwner`, che assicura che il contratto autentichi l'identità dell'indirizzo chiamante prima di eseguire la funzione. Le chiamate alle funzioni protette da altri indirizzi oltre al proprietario del contratto vanno sempre in revert, impedendo accessi indesiderati.

#### Controllo degli accessi basato sui ruoli {#role-based-access-control}

Registrare un singolo indirizzo come `Owner` in uno smart contract introduce il rischio di centralizzazione e rappresenta un singolo punto di vulnerabilità. Se le chiavi dell'account del proprietario vengono compromesse, gli aggressori possono attaccare il contratto posseduto. Ecco perché utilizzare un pattern di controllo degli accessi basato sui ruoli con più account amministrativi potrebbe essere un'opzione migliore.

Nel controllo degli accessi basato sui ruoli, l'accesso alle funzioni sensibili è distribuito tra un gruppo di partecipanti fidati. Ad esempio, un account potrebbe essere responsabile del conio di token, mentre un altro account esegue aggiornamenti o mette in pausa il contratto. Decentralizzare il controllo degli accessi in questo modo elimina i singoli punti di vulnerabilità e riduce le assunzioni di fiducia per gli utenti.

##### Utilizzo di portafogli multifirma
Un altro approccio per implementare un controllo degli accessi sicuro è utilizzare un [account multifirma](/developers/docs/smart-contracts/#multisig) per gestire un contratto. A differenza di un normale EOA, gli account multifirma sono di proprietà di più entità e richiedono le firme di un numero minimo di account (ad esempio 3 su 5) per eseguire le transazioni.

L'utilizzo di un multisig per il controllo degli accessi introduce un ulteriore livello di sicurezza, poiché le azioni sul contratto di destinazione richiedono il consenso di più parti. Ciò è particolarmente utile se è necessario utilizzare il pattern Ownable, in quanto rende più difficile per un aggressore o un insider malintenzionato manipolare le funzioni sensibili del contratto per scopi malevoli.

### 2. Utilizzare le istruzioni require(), assert() e revert() per proteggere le operazioni del contratto {#use-require-assert-revert}

Come accennato, chiunque può chiamare le funzioni pubbliche nel tuo smart contract una volta che è stato distribuito sulla blockchain. Poiché non puoi sapere in anticipo come gli account esterni interagiranno con un contratto, è ideale implementare salvaguardie interne contro operazioni problematiche prima della distribuzione. Puoi imporre un comportamento corretto negli smart contract utilizzando le istruzioni `require()`, `assert()` e `revert()` per innescare eccezioni e fare il revert delle modifiche di stato se l'esecuzione non soddisfa determinati requisiti.

**`require()`**: le istruzioni `require` sono definite all'inizio delle funzioni e assicurano che le condizioni predefinite siano soddisfatte prima che la funzione chiamata venga eseguita. Un'istruzione `require` può essere utilizzata per convalidare gli input dell'utente, controllare le variabili di stato o autenticare l'identità dell'account chiamante prima di procedere con una funzione.

**`assert()`**: `assert()` viene utilizzato per rilevare errori interni e verificare la presenza di violazioni degli "invarianti" nel codice. Un invariante è un'asserzione logica sullo stato di un contratto che dovrebbe rimanere vera per tutte le esecuzioni delle funzioni. Un esempio di invariante è l'offerta totale massima o il saldo di un contratto di token. L'utilizzo di `assert()` assicura che il tuo contratto non raggiunga mai uno stato vulnerabile e, se lo fa, tutte le modifiche alle variabili di stato vengono annullate.

**`revert()`**: `revert()` può essere utilizzato in un'istruzione if-else che innesca un'eccezione se la condizione richiesta non è soddisfatta. Il contratto di esempio seguente utilizza `revert()` per proteggere l'esecuzione delle funzioni:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Esegue l'acquisto.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Testare gli smart contract e verificare la correttezza del codice {#test-smart-contracts-and-verify-code-correctness}

L'immutabilità del codice in esecuzione nella [Ethereum Virtual Machine](/developers/docs/evm/) significa che gli smart contract richiedono un livello più elevato di valutazione della qualità durante la fase di sviluppo. Testare ampiamente il tuo contratto e osservarlo per eventuali risultati imprevisti migliorerà notevolmente la sicurezza e proteggerà i tuoi utenti a lungo termine.

Il metodo abituale consiste nello scrivere piccoli test unitari utilizzando dati fittizi (mock) che il contratto dovrebbe ricevere dagli utenti. Il [test unitario](/developers/docs/smart-contracts/testing/#unit-testing) è utile per testare la funzionalità di determinate funzioni e assicurarsi che uno smart contract funzioni come previsto.

Sfortunatamente, il test unitario è minimamente efficace per migliorare la sicurezza degli smart contract se utilizzato in isolamento. Un test unitario potrebbe dimostrare che una funzione viene eseguita correttamente per i dati fittizi, ma i test unitari sono efficaci solo quanto i test che vengono scritti. Ciò rende difficile rilevare casi limite trascurati e vulnerabilità che potrebbero compromettere la sicurezza del tuo smart contract.

Un approccio migliore consiste nel combinare i test unitari con test basati sulle proprietà eseguiti utilizzando l'[analisi statica e dinamica](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). L'analisi statica si basa su rappresentazioni di basso livello, come i [grafi del flusso di controllo](https://en.wikipedia.org/wiki/Control-flow_graph) e gli [alberi sintattici astratti](https://deepsource.io/glossary/ast/), per analizzare gli stati del programma raggiungibili e i percorsi di esecuzione. Nel frattempo, le tecniche di analisi dinamica, come il [fuzzing degli smart contract](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), eseguono il codice del contratto con valori di input casuali per rilevare operazioni che violano le proprietà di sicurezza.

La [verifica formale](/developers/docs/smart-contracts/formal-verification) è un'altra tecnica per verificare le proprietà di sicurezza negli smart contract. A differenza dei test regolari, la verifica formale può dimostrare in modo conclusivo l'assenza di errori in uno smart contract. Ciò si ottiene creando una specifica formale che cattura le proprietà di sicurezza desiderate e dimostrando che un modello formale dei contratti aderisce a questa specifica.

### 4. Richiedere una revisione indipendente del codice {#get-independent-code-reviews}

Dopo aver testato il tuo contratto, è buona norma chiedere ad altri di controllare il codice sorgente per eventuali problemi di sicurezza. I test non scopriranno ogni difetto in uno smart contract, ma ottenere una revisione indipendente aumenta la possibilità di individuare le vulnerabilità.

#### Audit {#audits}

Commissionare un audit dello smart contract è un modo per condurre una revisione indipendente del codice. I revisori (auditor) svolgono un ruolo importante nel garantire che gli smart contract siano sicuri e privi di difetti di qualità ed errori di progettazione.

Detto questo, dovresti evitare di considerare gli audit come una soluzione miracolosa. Gli audit degli smart contract non individueranno ogni bug e sono progettati principalmente per fornire un ulteriore ciclo di revisioni, che può aiutare a rilevare problemi sfuggiti agli sviluppatori durante lo sviluppo e i test iniziali. Dovresti anche seguire le migliori pratiche per lavorare con i revisori, come documentare correttamente il codice e aggiungere commenti in linea, per massimizzare i vantaggi di un audit dello smart contract.

- [Suggerimenti e trucchi per l'audit degli smart contract](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Ottieni il massimo dal tuo audit](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Bug bounty {#bug-bounties}

L'istituzione di un programma di bug bounty è un altro approccio per implementare revisioni esterne del codice. Un bug bounty è una ricompensa finanziaria data a individui (di solito hacker whitehat) che scoprono vulnerabilità in un'applicazione.

Se utilizzati correttamente, i bug bounty incentivano i membri della comunità di hacker a ispezionare il tuo codice alla ricerca di difetti critici. Un esempio reale è il "bug dei soldi infiniti" che avrebbe permesso a un aggressore di creare una quantità illimitata di ether su [Optimism](https://www.optimism.io/), un protocollo [layer 2 (l2)](/layer-2/) in esecuzione su Ethereum. Fortunatamente, un hacker whitehat [ha scoperto la falla](https://www.saurik.com/optimism.html) e ha informato il team, [guadagnando un cospicuo compenso nel processo](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Una strategia utile è quella di impostare il compenso di un programma di bug bounty in proporzione alla quantità di fondi in gioco. Descritto come "[bug bounty scalabile](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)", questo approccio fornisce incentivi finanziari agli individui per divulgare responsabilmente le vulnerabilità invece di sfruttarle.

### 5. Seguire le migliori pratiche durante lo sviluppo degli smart contract {#follow-smart-contract-development-best-practices}

L'esistenza di audit e bug bounty non ti esime dalla responsabilità di scrivere codice di alta qualità. Una buona sicurezza degli smart contract inizia seguendo processi di progettazione e sviluppo adeguati:

- Archivia tutto il codice in un sistema di controllo della versione, come git

- Apporta tutte le modifiche al codice tramite pull request

- Assicurati che le pull request abbiano almeno un revisore indipendente; se stai lavorando da solo a un progetto, considera di trovare altri sviluppatori e scambiare revisioni del codice

- Utilizza un [ambiente di sviluppo](/developers/docs/frameworks/) per testare, compilare e distribuire gli smart contract

- Esegui il tuo codice attraverso strumenti di analisi del codice di base, come [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril e Slither. Idealmente, dovresti farlo prima che ogni pull request venga unita e confrontare le differenze nell'output

- Assicurati che il tuo codice venga compilato senza errori e che il compilatore Solidity non emetta avvisi

- Documenta correttamente il tuo codice (utilizzando [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) e descrivi i dettagli sull'architettura del contratto in un linguaggio di facile comprensione. Ciò renderà più facile per gli altri controllare e revisionare il tuo codice.

### 6. Implementare solidi piani di disaster recovery {#implement-disaster-recovery-plans}

Progettare controlli di accesso sicuri, implementare modificatori di funzione e altri suggerimenti possono migliorare la sicurezza degli smart contract, ma non possono escludere la possibilità di exploit malevoli. Costruire smart contract sicuri richiede di "prepararsi al fallimento" e di avere un piano di riserva per rispondere efficacemente agli attacchi. Un piano di disaster recovery adeguato incorporerà alcuni o tutti i seguenti componenti:

#### Aggiornamenti del contratto {#contract-upgrades}

Sebbene gli smart contract di Ethereum siano immutabili per impostazione predefinita, è possibile ottenere un certo grado di mutabilità utilizzando pattern di aggiornamento. L'aggiornamento dei contratti è necessario nei casi in cui un difetto critico renda inutilizzabile il vecchio contratto e la distribuzione di una nuova logica sia l'opzione più fattibile.

I meccanismi di aggiornamento del contratto funzionano in modo diverso, ma il "pattern proxy" è uno degli approcci più popolari per l'aggiornamento degli smart contract. I [pattern proxy](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) dividono lo stato e la logica di un'applicazione tra _due_ contratti. Il primo contratto (chiamato 'contratto proxy') memorizza le variabili di stato (ad es., i saldi degli utenti), mentre il secondo contratto (chiamato 'contratto logico') contiene il codice per l'esecuzione delle funzioni del contratto.

Gli account interagiscono con il contratto proxy, che invia tutte le chiamate di funzione al contratto logico utilizzando la chiamata di basso livello [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). A differenza di una normale chiamata di messaggio, `delegatecall()` assicura che il codice in esecuzione all'indirizzo del contratto logico venga eseguito nel contesto del contratto chiamante. Ciò significa che il contratto logico scriverà sempre nello storage del proxy (invece che nel proprio storage) e i valori originali di `msg.sender` e `msg.value` vengono preservati.

Delegare le chiamate al contratto logico richiede la memorizzazione del suo indirizzo nello storage del contratto proxy. Pertanto, l'aggiornamento della logica del contratto è solo questione di distribuire un altro contratto logico e memorizzare il nuovo indirizzo nel contratto proxy. Poiché le chiamate successive al contratto proxy vengono instradate automaticamente al nuovo contratto logico, avrai "aggiornato" il contratto senza modificarne effettivamente il codice.

[Maggiori informazioni sull'aggiornamento dei contratti](/developers/docs/smart-contracts/upgrading/).

#### Arresti di emergenza {#emergency-stops}

Come accennato, audit e test approfonditi non possono scoprire tutti i bug in uno smart contract. Se una vulnerabilità appare nel tuo codice dopo la distribuzione, correggerla è impossibile poiché non puoi modificare il codice in esecuzione all'indirizzo del contratto. Inoltre, i meccanismi di aggiornamento (ad es., i pattern proxy) potrebbero richiedere tempo per essere implementati (spesso richiedono l'approvazione di diverse parti), il che dà solo agli aggressori più tempo per causare ulteriori danni.

L'opzione nucleare è implementare una funzione di "arresto di emergenza" che blocca le chiamate alle funzioni vulnerabili in un contratto. Gli arresti di emergenza comprendono in genere i seguenti componenti:

1. Una variabile booleana globale che indica se lo smart contract è in uno stato di arresto o meno. Questa variabile è impostata su `false` durante la configurazione del contratto, ma passerà a `true` una volta che il contratto viene arrestato.

2. Funzioni che fanno riferimento alla variabile booleana nella loro esecuzione. Tali funzioni sono accessibili quando lo smart contract non è arrestato e diventano inaccessibili quando viene attivata la funzione di arresto di emergenza.

3. Un'entità che ha accesso alla funzione di arresto di emergenza, che imposta la variabile booleana su `true`. Per prevenire azioni malevole, le chiamate a questa funzione possono essere limitate a un indirizzo fidato (ad es., il proprietario del contratto).

Una volta che il contratto attiva l'arresto di emergenza, alcune funzioni non saranno chiamabili. Ciò si ottiene racchiudendo funzioni selezionate in un modificatore che fa riferimento alla variabile globale. Di seguito è riportato [un esempio](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) che descrive un'implementazione di questo pattern nei contratti:

```solidity
// Questo codice non è stato sottoposto ad audit professionale e non fa alcuna promessa sulla sicurezza o correttezza. Usare a proprio rischio.

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
        // Verifica l'autorizzazione di msg.sender qui
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
        // Il prelievo di emergenza avviene qui
    }
}
```

Questo esempio mostra le caratteristiche di base degli arresti di emergenza:

- `isStopped` è un booleano che restituisce `false` all'inizio e `true` quando il contratto entra in modalità di emergenza.

- I modificatori di funzione `onlyWhenStopped` e `stoppedInEmergency` controllano la variabile `isStopped`. `stoppedInEmergency` viene utilizzato per controllare le funzioni che dovrebbero essere inaccessibili quando il contratto è vulnerabile (ad es., `deposit()`). Le chiamate a queste funzioni andranno semplicemente in revert.

`onlyWhenStopped` viene utilizzato per le funzioni che dovrebbero essere chiamabili durante un'emergenza (ad es., `emergencyWithdraw()`). Tali funzioni possono aiutare a risolvere la situazione, da qui la loro esclusione dall'elenco delle "funzioni limitate".

L'utilizzo di una funzionalità di arresto di emergenza fornisce un efficace espediente temporaneo per affrontare gravi vulnerabilità nel tuo smart contract. Tuttavia, aumenta la necessità per gli utenti di fidarsi degli sviluppatori affinché non la attivino per scopi egoistici. A tal fine, decentralizzare il controllo dell'arresto di emergenza sottoponendolo a un meccanismo di voto onchain, a un timelock o all'approvazione da un portafoglio multisig sono possibili soluzioni.

#### Monitoraggio degli eventi {#event-monitoring}

Gli [eventi](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) ti consentono di tracciare le chiamate alle funzioni dello smart contract e monitorare le modifiche alle variabili di stato. È ideale programmare il tuo smart contract per emettere un evento ogni volta che una parte intraprende un'azione critica per la sicurezza (ad es., il prelievo di fondi).

La registrazione degli eventi e il loro monitoraggio offchain forniscono informazioni sulle operazioni del contratto e aiutano a una scoperta più rapida di azioni malevole. Ciò significa che il tuo team può rispondere più rapidamente agli hack e intraprendere azioni per mitigare l'impatto sugli utenti, come mettere in pausa le funzioni o eseguire un aggiornamento.

Puoi anche optare per uno strumento di monitoraggio pronto all'uso che inoltra automaticamente avvisi ogni volta che qualcuno interagisce con i tuoi contratti. Questi strumenti ti consentiranno di creare avvisi personalizzati basati su diversi trigger, come il volume delle transazioni, la frequenza delle chiamate di funzione o le funzioni specifiche coinvolte. Ad esempio, potresti programmare un avviso che arriva quando l'importo prelevato in una singola transazione supera una determinata soglia.

### 7. Progettare sistemi di governance sicuri {#design-secure-governance-systems}

Potresti voler decentralizzare la tua applicazione cedendo il controllo degli smart contract principali ai membri della comunità. In questo caso, il sistema di smart contract includerà un modulo di governance: un meccanismo che consente ai membri della comunità di approvare azioni amministrative tramite un sistema di governance onchain. Ad esempio, una proposta per aggiornare un contratto proxy a una nuova implementazione può essere votata dai possessori di token.

La governance decentralizzata può essere vantaggiosa, soprattutto perché allinea gli interessi degli sviluppatori e degli utenti finali. Tuttavia, i meccanismi di governance degli smart contract possono introdurre nuovi rischi se implementati in modo errato. Uno scenario plausibile è se un aggressore acquisisce un enorme potere di voto (misurato in numero di token posseduti) stipulando un [prestito lampo](/defi/#flash-loans) e fa approvare una proposta malevola.

Un modo per prevenire i problemi relativi alla governance onchain è [utilizzare un timelock](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Un timelock impedisce a uno smart contract di eseguire determinate azioni fino a quando non trascorre un periodo di tempo specifico. Altre strategie includono l'assegnazione di un "peso di voto" a ciascun token in base a quanto tempo è stato bloccato, o la misurazione del potere di voto di un indirizzo in un periodo storico (ad esempio, 2-3 blocchi nel passato) invece del blocco corrente. Entrambi i metodi riducono la possibilità di accumulare rapidamente potere di voto per influenzare i voti onchain.

Maggiori informazioni sulla [progettazione di sistemi di governance sicuri](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), sui [diversi meccanismi di voto nelle DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) e sui [comuni vettori di attacco alle DAO che sfruttano la DeFi](https://dacian.me/dao-governance-defi-attacks) nei link condivisi.

### 8. Ridurre al minimo la complessità nel codice {#reduce-code-complexity}

Gli sviluppatori di software tradizionali hanno familiarità con il principio KISS ("keep it simple, stupid"), che sconsiglia di introdurre complessità non necessarie nella progettazione del software. Questo segue il pensiero di lunga data secondo cui "i sistemi complessi falliscono in modi complessi" e sono più suscettibili a errori costosi.

Mantenere le cose semplici è di particolare importanza quando si scrivono smart contract, dato che gli smart contract controllano potenzialmente grandi quantità di valore. Un suggerimento per ottenere semplicità quando si scrivono smart contract è riutilizzare librerie esistenti, come [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/), ove possibile. Poiché queste librerie sono state ampiamente controllate e testate dagli sviluppatori, il loro utilizzo riduce le possibilità di introdurre bug scrivendo nuove funzionalità da zero.

Un altro consiglio comune è scrivere piccole funzioni e mantenere i contratti modulari suddividendo la logica di business su più contratti. Scrivere codice più semplice non solo riduce la superficie di attacco in uno smart contract, ma rende anche più facile ragionare sulla correttezza del sistema complessivo e rilevare tempestivamente possibili errori di progettazione.

### 9. Difendersi dalle comuni vulnerabilità degli smart contract {#mitigate-common-smart-contract-vulnerabilities}

#### Rientranza {#reentrancy}

L'EVM non consente la concorrenza, il che significa che due contratti coinvolti in una chiamata di messaggio non possono essere eseguiti contemporaneamente. Una chiamata esterna mette in pausa l'esecuzione e la memoria del contratto chiamante fino al ritorno della chiamata, a quel punto l'esecuzione procede normalmente. Questo processo può essere formalmente descritto come il trasferimento del [flusso di controllo](https://www.computerhope.com/jargon/c/contflow.htm) a un altro contratto.

Sebbene per lo più innocuo, il trasferimento del flusso di controllo a contratti non attendibili può causare problemi, come la rientranza. Un attacco di rientranza si verifica quando un contratto malevolo richiama un contratto vulnerabile prima che l'invocazione della funzione originale sia completata. Questo tipo di attacco è spiegato meglio con un esempio.

Considera un semplice smart contract ('Vittima') che consente a chiunque di depositare e prelevare ether:

```solidity
// Questo contratto è vulnerabile. Non usare in produzione

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

Questo contratto espone una funzione `withdraw()` per consentire agli utenti di prelevare gli ETH precedentemente depositati nel contratto. Durante l'elaborazione di un prelievo, il contratto esegue le seguenti operazioni:

1. Controlla il saldo in ETH dell'utente
2. Invia i fondi all'indirizzo chiamante
3. Azzera il suo saldo, impedendo ulteriori prelievi da parte dell'utente

La funzione `withdraw()` nel contratto `Victim` segue un pattern "controlli-interazioni-effetti" (checks-interactions-effects). _Controlla_ se le condizioni necessarie per l'esecuzione sono soddisfatte (ovvero, l'utente ha un saldo in ETH positivo) ed esegue l'_interazione_ inviando ETH all'indirizzo del chiamante, prima di applicare gli _effetti_ della transazione (ovvero, riducendo il saldo dell'utente).

Se `withdraw()` viene chiamata da un account di proprietà esterna (EOA), la funzione viene eseguita come previsto: `msg.sender.call.value()` invia ETH al chiamante. Tuttavia, se `msg.sender` è un account di smart contract che chiama `withdraw()`, l'invio di fondi utilizzando `msg.sender.call.value()` innescherà anche l'esecuzione del codice memorizzato a quell'indirizzo.

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

1. Accettare un deposito da un altro account (probabilmente l'EOA dell'aggressore)
2. Depositare 1 ETH nel contratto Vittima
3. Prelevare l'1 ETH memorizzato nello smart contract

Non c'è niente di sbagliato qui, tranne che `Attacker` ha un'altra funzione che chiama nuovamente `withdraw() in `Victim` se il gas rimanente dal `msg.sender.call.value` in entrata è superiore a 40.000. Ciò dà a `Attacker` la capacità di rientrare in `Victim` e prelevare più fondi _prima_ che la prima invocazione di `withdraw` sia completata. Il ciclo si presenta così:

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

In sintesi, poiché il saldo del chiamante non viene impostato a 0 fino al completamento dell'esecuzione della funzione, le invocazioni successive avranno successo e consentiranno al chiamante di prelevare il proprio saldo più volte. Questo tipo di attacco può essere utilizzato per prosciugare i fondi di uno smart contract, come è successo nell'[hack della DAO del 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Gli attacchi di rientranza sono ancora oggi un problema critico per gli smart contract, come mostrano gli [elenchi pubblici di exploit di rientranza](https://github.com/pcaversaccio/reentrancy-attacks).

##### Come prevenire gli attacchi di rientranza
Un approccio per affrontare la rientranza è seguire il [pattern controlli-effetti-interazioni](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Questo pattern ordina l'esecuzione delle funzioni in modo tale che il codice che esegue i controlli necessari prima di procedere con l'esecuzione venga per primo, seguito dal codice che manipola lo stato del contratto, con il codice che interagisce con altri contratti o EOA che arriva per ultimo.

Il pattern controlli-effetti-interazioni viene utilizzato in una versione rivista del contratto `Victim` mostrata di seguito:

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

Questo contratto esegue un _controllo_ sul saldo dell'utente, applica gli _effetti_ della funzione `withdraw()` (azzerando il saldo dell'utente) e procede a eseguire l'_interazione_ (inviando ETH all'indirizzo dell'utente). Ciò assicura che il contratto aggiorni il suo storage prima della chiamata esterna, eliminando la condizione di rientranza che ha consentito il primo attacco. Il contratto `Attacker` potrebbe ancora richiamare `NoLongerAVictim`, ma poiché `balances[msg.sender]` è stato impostato a 0, ulteriori prelievi genereranno un errore.

Un'altra opzione è utilizzare un blocco di mutua esclusione (comunemente descritto come "mutex") che blocca una porzione dello stato di un contratto fino al completamento dell'invocazione di una funzione. Questo viene implementato utilizzando una variabile booleana che viene impostata su `true` prima dell'esecuzione della funzione e ritorna a `false` dopo che l'invocazione è terminata. Come si vede nell'esempio seguente, l'utilizzo di un mutex protegge una funzione dalle chiamate ricorsive mentre l'invocazione originale è ancora in elaborazione, fermando efficacemente la rientranza.

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
    // Questa funzione è protetta da un mutex, quindi le chiamate rientranti dall'interno di `msg.sender.call` non possono chiamare di nuovo `withdraw`.
    //  L'istruzione `return` restituisce `true` ma valuta comunque l'istruzione `locked = false` nel modificatore
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Puoi anche utilizzare un sistema di [pagamenti pull](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment) che richiede agli utenti di prelevare fondi dagli smart contract, invece di un sistema di "pagamenti push" che invia fondi agli account. Ciò rimuove la possibilità di innescare inavvertitamente codice a indirizzi sconosciuti (e può anche prevenire determinati attacchi denial-of-service).

#### Underflow e overflow di interi {#integer-underflows-and-overflows}

Un overflow di interi si verifica quando i risultati di un'operazione aritmetica non rientrano nell'intervallo di valori accettabile, facendolo "riavvolgere" al valore rappresentabile più basso. Ad esempio, un `uint8` può memorizzare solo valori fino a 2^8-1=255. Le operazioni aritmetiche che producono valori superiori a `255` andranno in overflow e ripristineranno `uint` a `0`, in modo simile a come il contachilometri di un'auto si azzera a 0 una volta raggiunto il chilometraggio massimo (999999).

Gli underflow di interi si verificano per motivi simili: i risultati di un'operazione aritmetica scendono al di sotto dell'intervallo accettabile. Supponiamo che tu abbia provato a decrementare `0` in un `uint8`, il risultato si riavvolgerebbe semplicemente al valore massimo rappresentabile (`255`).

Sia gli overflow che gli underflow di interi possono portare a modifiche impreviste alle variabili di stato di un contratto e provocare un'esecuzione non pianificata. Di seguito è riportato un esempio che mostra come un aggressore può sfruttare l'overflow aritmetico in uno smart contract per eseguire un'operazione non valida:

```
pragma solidity ^0.7.6;

// Questo contratto è progettato per fungere da cassaforte a tempo.
// L'utente può depositare in questo contratto ma non può prelevare per almeno una settimana.
// L'utente può anche estendere il tempo di attesa oltre il periodo di attesa di 1 settimana.

/*
1. Distribuisci TimeLock
2. Distribuisci Attack con l'indirizzo di TimeLock
3. Chiama Attack.attack inviando 1 ether. Sarai immediatamente in grado di
   prelevare il tuo ether.

Cosa è successo?
Attack ha causato l'overflow di TimeLock.lockTime ed è stato in grado di prelevare
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
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
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
        se t = tempo di blocco attuale, allora dobbiamo trovare x tale che
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

##### Come prevenire underflow e overflow di interi
A partire dalla versione 0.8.0, il compilatore Solidity rifiuta il codice che produce underflow e overflow di interi. Tuttavia, i contratti compilati con una versione del compilatore inferiore dovrebbero eseguire controlli sulle funzioni che coinvolgono operazioni aritmetiche o utilizzare una libreria (ad es., [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) che controlla la presenza di underflow/overflow.

#### Manipolazione dell'oracolo {#oracle-manipulation}

Gli [oracoli](/developers/docs/oracles/) reperiscono informazioni offchain e le inviano onchain affinché gli smart contract le utilizzino. Con gli oracoli, puoi progettare smart contract che interagiscono con sistemi offchain, come i mercati dei capitali, espandendo notevolmente la loro applicazione.

Ma se l'oracolo è corrotto e invia informazioni errate onchain, gli smart contract verranno eseguiti in base a input errati, il che può causare problemi. Questa è la base del "problema dell'oracolo", che riguarda il compito di assicurarsi che le informazioni provenienti da un oracolo blockchain siano accurate, aggiornate e tempestive.

Un problema di sicurezza correlato è l'utilizzo di un oracolo onchain, come un exchange decentralizzato, per ottenere il prezzo spot di un asset. Le piattaforme di prestito nel settore della [finanza decentralizzata (DeFi)](/defi/) lo fanno spesso per determinare il valore del collaterale di un utente per stabilire quanto può prendere in prestito.

I prezzi dei DEX sono spesso accurati, in gran parte grazie agli arbitraggisti che ripristinano la parità nei mercati. Tuttavia, sono aperti alla manipolazione, in particolare se l'oracolo onchain calcola i prezzi degli asset in base a modelli di trading storici (come di solito accade).

Ad esempio, un aggressore potrebbe pompare artificialmente il prezzo spot di un asset stipulando un prestito lampo subito prima di interagire con il tuo contratto di prestito. Interrogare il DEX per il prezzo dell'asset restituirebbe un valore più alto del normale (a causa del grande "ordine di acquisto" dell'aggressore che distorce la domanda per l'asset), consentendogli di prendere in prestito più di quanto dovrebbe. Tali "attacchi di prestito lampo" sono stati utilizzati per sfruttare la dipendenza dagli oracoli di prezzo tra le applicazioni DeFi, costando ai protocolli milioni in fondi persi.

##### Come prevenire la manipolazione dell'oracolo
Il requisito minimo per [evitare la manipolazione dell'oracolo](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) è utilizzare una rete di oracoli decentralizzata che interroga le informazioni da più fonti per evitare singoli punti di vulnerabilità. Nella maggior parte dei casi, gli oracoli decentralizzati hanno incentivi criptoeconomici integrati per incoraggiare i nodi oracolo a riportare informazioni corrette, rendendoli più sicuri degli oracoli centralizzati.

Se hai intenzione di interrogare un oracolo onchain per i prezzi degli asset, considera di utilizzarne uno che implementa un meccanismo di prezzo medio ponderato nel tempo (TWAP). Un [oracolo TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) interroga il prezzo di un asset in due diversi momenti nel tempo (che puoi modificare) e calcola il prezzo spot in base alla media ottenuta. La scelta di periodi di tempo più lunghi protegge il tuo protocollo dalla manipolazione dei prezzi poiché i grandi ordini eseguiti di recente non possono influire sui prezzi degli asset.

## Risorse sulla sicurezza degli smart contract per gli sviluppatori {#smart-contract-security-resources-for-developers}

### Strumenti per analizzare gli smart contract e verificare la correttezza del codice {#code-analysis-tools}

- **[Strumenti e librerie di test](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Raccolta di strumenti e librerie standard del settore per eseguire test unitari, analisi statica e analisi dinamica sugli smart contract._

- **[Strumenti di verifica formale](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Strumenti per verificare la correttezza funzionale negli smart contract e controllare gli invarianti._

- **[Servizi di auditing degli smart contract](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Elenco di organizzazioni che forniscono servizi di auditing degli smart contract per i progetti di sviluppo su Ethereum._

- **[Piattaforme di bug bounty](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Piattaforme per coordinare i bug bounty e ricompensare la divulgazione responsabile di vulnerabilità critiche negli smart contract._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Uno strumento online gratuito per controllare tutte le informazioni disponibili riguardanti un contratto sottoposto a fork._

- **[ABI Encoder](https://abi.hashex.org/)** - _Un servizio online gratuito per codificare le funzioni del tuo contratto Solidity e gli argomenti del costruttore._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Analizzatore statico per Solidity, che attraversa gli Abstract Syntax Tree (AST) per individuare vulnerabilità sospette e stampare i problemi in un formato markdown facile da consultare._

### Strumenti per il monitoraggio degli smart contract {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Uno strumento per ricevere notifiche in tempo reale quando si verificano eventi insoliti o inaspettati sui tuoi smart contract o portafogli._

### Strumenti per l'amministrazione sicura degli smart contract {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Portafoglio smart contract in esecuzione su Ethereum che richiede a un numero minimo di persone di approvare una transazione prima che possa avvenire (M-di-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Librerie di contratti per implementare funzionalità amministrative, tra cui la proprietà del contratto, gli aggiornamenti, i controlli di accesso, la governance, la possibilità di messa in pausa e altro ancora._

### Servizi di auditing degli smart contract {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Servizio di auditing degli smart contract che aiuta i progetti in tutto l'ecosistema blockchain ad assicurarsi che i loro protocolli siano pronti per il lancio e costruiti per proteggere gli utenti._

- **[CertiK](https://www.certik.com/)** - _Azienda di sicurezza blockchain pioniera nell'uso di tecnologie all'avanguardia di verifica formale su smart contract e reti blockchain._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Azienda di sicurezza informatica che combina la ricerca sulla sicurezza con una mentalità da attaccante per ridurre i rischi e fortificare il codice._

- **[PeckShield](https://peckshield.com/)** - _Azienda di sicurezza blockchain che offre prodotti e servizi per la sicurezza, la privacy e l'usabilità dell'intero ecosistema blockchain._

- **[QuantStamp](https://quantstamp.com/)** - _Servizio di auditing che facilita l'adozione di massa della tecnologia blockchain attraverso servizi di sicurezza e valutazione dei rischi._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Azienda di sicurezza degli smart contract che fornisce audit di sicurezza per sistemi distribuiti._

- **[Runtime Verification](https://runtimeverification.com/)** - _Azienda di sicurezza specializzata nella modellazione e verifica formale degli smart contract._

- **[Hacken](https://hacken.io)** - _Revisore di sicurezza informatica Web3 che porta un approccio a 360 gradi alla sicurezza della blockchain._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Servizi di auditing per Solidity e Cairo, che garantiscono l'integrità degli smart contract e la sicurezza degli utenti su Ethereum e Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx si concentra sull'auditing di blockchain e smart contract per garantire la sicurezza delle criptovalute, fornendo servizi come lo sviluppo di smart contract, penetration test e consulenza blockchain._

- **[Code4rena](https://code4rena.com/)** - _Piattaforma di audit competitiva che incentiva gli esperti di sicurezza degli smart contract a trovare vulnerabilità e contribuire a rendere il Web3 più sicuro._

- **[CodeHawks](https://codehawks.com/)** - _Piattaforma di audit competitiva che ospita competizioni di auditing di smart contract per i ricercatori di sicurezza._

- **[Cyfrin](https://cyfrin.io)** - _Potenza della sicurezza Web3, che incuba la sicurezza cripto attraverso prodotti e servizi di auditing degli smart contract._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Azienda di sicurezza Web3 che offre audit di sicurezza per sistemi blockchain attraverso un team di revisori esperti e strumenti all'avanguardia._

- **[Oxorio](https://oxor.io/)** - _Audit di smart contract e servizi di sicurezza blockchain con esperienza in EVM, Solidity, ZK e tecnologie cross-chain per aziende cripto e progetti di finanza decentralizzata (DeFi)._

- **[Inference](https://inference.ag/)** - _Azienda di auditing di sicurezza, specializzata nell'auditing di smart contract per blockchain basate su EVM. Grazie ai suoi revisori esperti, identificano potenziali problemi e suggeriscono soluzioni attuabili per risolverli prima della distribuzione._

### Piattaforme di bug bounty {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Piattaforma di bug bounty per smart contract e progetti DeFi, dove i ricercatori di sicurezza esaminano il codice, divulgano le vulnerabilità, vengono pagati e rendono le cripto più sicure._

- **[HackerOne](https://www.hackerone.com/)** - _Piattaforma di coordinamento delle vulnerabilità e bug bounty che connette le aziende con penetration tester e ricercatori di sicurezza informatica._

- **[HackenProof](https://hackenproof.com/)** - _Piattaforma esperta di bug bounty per progetti cripto (DeFi, smart contract, portafogli, CEX e altro), dove i professionisti della sicurezza forniscono servizi di triage e i ricercatori vengono pagati per segnalazioni di bug rilevanti e verificate._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Sottoscrittore nel Web3 per la sicurezza degli smart contract, con pagamenti per i revisori gestiti tramite smart contract per garantire che i bug rilevanti vengano pagati equamente._

-  **[CodeHawks](https://www.codehawks.com/)** - _Piattaforma competitiva di bug bounty in cui i revisori partecipano a concorsi e sfide di sicurezza e (presto) ai propri audit privati._

### Pubblicazioni di vulnerabilità ed exploit noti degli smart contract {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Attacchi noti agli smart contract](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Spiegazione adatta ai principianti delle vulnerabilità più significative dei contratti, con codice di esempio per la maggior parte dei casi._

- **[SWC Registry](https://swcregistry.io/)** - _Elenco curato di elementi Common Weakness Enumeration (CWE) che si applicano agli smart contract di Ethereum._

- **[Rekt](https://rekt.news/)** - _Pubblicazione regolarmente aggiornata di hack ed exploit cripto di alto profilo, insieme a rapporti post-mortem dettagliati._

### Sfide per imparare la sicurezza degli smart contract {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Elenco curato di wargame sulla sicurezza della blockchain, sfide e competizioni [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) con le relative soluzioni scritte._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame per imparare la sicurezza offensiva degli smart contract DeFi e sviluppare competenze nella ricerca di bug e nell'auditing di sicurezza._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Wargame basato su Web3/Solidity in cui ogni livello è uno smart contract che deve essere "hackerato"._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Sfida di hacking di smart contract, ambientata in un'avventura fantasy. Il completamento con successo della sfida dà anche accesso a un programma privato di bug bounty._

### Migliori pratiche per proteggere gli smart contract {#smart-contract-security-best-practices}

- **[ConsenSys: Migliori pratiche di sicurezza per gli smart contract di Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Elenco completo di linee guida per proteggere gli smart contract di Ethereum._

- **[Nascent: Simple Security Toolkit](https://github.com/nascentxyz/simple-security-toolkit)** - _Raccolta di guide pratiche incentrate sulla sicurezza e liste di controllo per lo sviluppo di smart contract._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _Utile raccolta di pattern sicuri e migliori pratiche per il linguaggio di programmazione di smart contract Solidity._

- **[Documentazione di Solidity: Considerazioni sulla sicurezza](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Linee guida per scrivere smart contract sicuri con Solidity._

- **[Smart Contract Security Verification Standard](https://github.com/securing/SCSVS)** - _Lista di controllo in quattordici parti creata per standardizzare la sicurezza degli smart contract per sviluppatori, architetti, revisori della sicurezza e fornitori._

- **[Impara la sicurezza e l'auditing degli smart contract](https://updraft.cyfrin.io/courses/security)** - _Corso definitivo sulla sicurezza e l'auditing degli smart contract, creato per gli sviluppatori di smart contract che desiderano migliorare le proprie pratiche di sicurezza e diventare ricercatori di sicurezza._

### Tutorial sulla sicurezza degli smart contract {#tutorials-on-smart-contract-security}

- [Come scrivere smart contract sicuri](/developers/tutorials/secure-development-workflow/)

- [Come usare Slither per trovare bug negli smart contract](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Come usare Manticore per trovare bug negli smart contract](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Linee guida sulla sicurezza degli smart contract](/developers/tutorials/smart-contract-security-guidelines/)

- [Come integrare in modo sicuro il tuo contratto di token con token arbitrari](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Corso completo sulla sicurezza e l'auditing degli smart contract](https://updraft.cyfrin.io/courses/security)