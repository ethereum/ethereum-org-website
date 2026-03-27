---
title: Testare i contratti intelligenti
description: Una panoramica delle tecniche e delle considerazioni per testare i contratti intelligenti di Ethereum.
lang: it
---

Le blockchain pubbliche come Ethereum sono immutabili, il che rende difficile modificare il codice di un contratto intelligente dopo la distribuzione. Esistono [modelli di aggiornamento dei contratti](/developers/docs/smart-contracts/upgrading/) per eseguire "aggiornamenti virtuali", ma sono difficili da implementare e richiedono il consenso sociale. Inoltre, un aggiornamento può correggere un errore solo _dopo_ che è stato scoperto: se un utente malintenzionato scopre prima la vulnerabilità, il tuo contratto intelligente è a rischio di exploit.

Per questi motivi, testare i contratti intelligenti prima di [distribuirli](/developers/docs/smart-contracts/deploying/) sulla rete principale è un requisito minimo per la [sicurezza](/developers/docs/smart-contracts/security/). Esistono molte tecniche per testare i contratti e valutare la correttezza del codice; la scelta dipende dalle tue esigenze. Tuttavia, una suite di test composta da strumenti e approcci diversi è l'ideale per individuare falle di sicurezza sia minori che maggiori nel codice del contratto.

## Prerequisiti {#prerequisites}

Questa pagina spiega come testare i contratti intelligenti prima di distribuirli sulla rete Ethereum. Presuppone che tu abbia familiarità con i [contratti intelligenti](/developers/docs/smart-contracts/).

## Cos'è il test dei contratti intelligenti? {#what-is-smart-contract-testing}

Il test dei contratti intelligenti è il processo di verifica che il codice di un contratto intelligente funzioni come previsto. I test sono utili per verificare se un particolare contratto intelligente soddisfa i requisiti di affidabilità, usabilità e sicurezza.

Sebbene gli approcci varino, la maggior parte dei metodi di test richiede l'esecuzione di un contratto intelligente con un piccolo campione dei dati che dovrebbe gestire. Se il contratto produce risultati corretti per i dati campione, si presume che funzioni correttamente. La maggior parte degli strumenti di test fornisce risorse per scrivere ed eseguire [casi di test](https://en.m.wikipedia.org/wiki/Test_case) per verificare se l'esecuzione di un contratto corrisponde ai risultati previsti.

### Perché è importante testare i contratti intelligenti? {#importance-of-testing-smart-contracts}

Poiché i contratti intelligenti gestiscono spesso asset finanziari di alto valore, errori di programmazione minori possono portare, e spesso portano, a [perdite massicce per gli utenti](https://rekt.news/leaderboard/). Test rigorosi possono, tuttavia, aiutarti a scoprire tempestivamente difetti e problemi nel codice di un contratto intelligente e a risolverli prima del lancio sulla rete principale.

Sebbene sia possibile aggiornare un contratto se viene scoperto un bug, gli aggiornamenti sono complessi e possono [causare errori](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) se gestiti in modo improprio. L'aggiornamento di un contratto nega ulteriormente il principio di immutabilità e grava gli utenti di ulteriori presupposti di fiducia. Al contrario, un piano completo per testare il tuo contratto mitiga i rischi per la sicurezza dei contratti intelligenti e riduce la necessità di eseguire complessi aggiornamenti logici dopo la distribuzione.

## Metodi per testare i contratti intelligenti {#methods-for-testing-smart-contracts}

I metodi per testare i contratti intelligenti di Ethereum rientrano in due grandi categorie: **test automatizzati** e **test manuali**. I test automatizzati e i test manuali offrono vantaggi e compromessi unici, ma puoi combinarli entrambi per creare un piano robusto per l'analisi dei tuoi contratti.

### Test automatizzati {#automated-testing}

I test automatizzati utilizzano strumenti che controllano automaticamente il codice di un contratto intelligente per individuare errori di esecuzione. Il vantaggio dei test automatizzati deriva dall'uso di [script](https://www.techtarget.com/whatis/definition/script?amp=1) per guidare la valutazione delle funzionalità del contratto. I test basati su script possono essere programmati per essere eseguiti ripetutamente con un intervento umano minimo, rendendo i test automatizzati più efficienti rispetto agli approcci manuali.

I test automatizzati sono particolarmente utili quando i test sono ripetitivi e dispendiosi in termini di tempo; difficili da eseguire manualmente; suscettibili di errore umano; o comportano la valutazione di funzioni critiche del contratto. Ma gli strumenti di test automatizzati possono presentare degli svantaggi: potrebbero non rilevare determinati bug e produrre molti [falsi positivi](https://www.contrastsecurity.com/glossary/false-positive). Pertanto, l'abbinamento di test automatizzati con test manuali per i contratti intelligenti è l'ideale.

### Test manuali {#manual-testing}

I test manuali sono assistiti dall'uomo e comportano l'esecuzione di ogni caso di test nella tua suite di test uno dopo l'altro durante l'analisi della correttezza di un contratto intelligente. Questo è diverso dai test automatizzati in cui puoi eseguire simultaneamente più test isolati su un contratto e ottenere un rapporto che mostra tutti i test falliti e superati.

I test manuali possono essere eseguiti da un singolo individuo seguendo un piano di test scritto che copre diversi scenari di test. Potresti anche far interagire più individui o gruppi con un contratto intelligente per un periodo specificato come parte dei test manuali. I tester confronteranno il comportamento effettivo del contratto con il comportamento previsto, segnalando qualsiasi differenza come un bug.

Test manuali efficaci richiedono notevoli risorse (competenze, tempo, denaro e impegno) ed è possibile, a causa di errori umani, non rilevare determinati errori durante l'esecuzione dei test. Ma i test manuali possono anche essere vantaggiosi: ad esempio, un tester umano (es. un revisore) può usare l'intuizione per rilevare casi limite che uno strumento di test automatizzato non coglierebbe.

## Test automatizzati per i contratti intelligenti {#automated-testing-for-smart-contracts}

### Test unitari {#unit-testing-for-smart-contracts}

I test unitari valutano le funzioni del contratto separatamente e verificano che ogni componente funzioni correttamente. I buoni test unitari dovrebbero essere semplici, veloci da eseguire e fornire un'idea chiara di cosa è andato storto in caso di fallimento dei test.

I test unitari sono utili per verificare che le funzioni restituiscano i valori previsti e che l'archiviazione del contratto venga aggiornata correttamente dopo l'esecuzione della funzione. Inoltre, l'esecuzione di test unitari dopo aver apportato modifiche alla base di codice di un contratto garantisce che l'aggiunta di nuova logica non introduca errori. Di seguito sono riportate alcune linee guida per eseguire test unitari efficaci:

#### Linee guida per i test unitari dei contratti intelligenti {#unit-testing-guidelines}

##### 1. Comprendere la logica di business e il flusso di lavoro del contratto

Prima di scrivere test unitari, è utile sapere quali funzionalità offre un contratto intelligente e come gli utenti accederanno e utilizzeranno tali funzioni. Questo è particolarmente utile per eseguire [test del percorso felice (happy path)](https://en.m.wikipedia.org/wiki/Happy_path) che determinano se le funzioni in un contratto restituiscono l'output corretto per input utente validi. Spiegheremo questo concetto utilizzando questo esempio (abbreviato) di [un contratto d'asta](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Questo è un semplice contratto d'asta progettato per ricevere offerte durante il periodo di offerta. Se l'`highestBid` aumenta, il precedente miglior offerente riceve indietro il proprio denaro; una volta terminato il periodo di offerta, il `beneficiary` chiama il contratto per ottenere il proprio denaro.

I test unitari per un contratto come questo coprirebbero diverse funzioni che un utente potrebbe chiamare interagendo con il contratto. Un esempio potrebbe essere un test unitario che verifica se un utente può fare un'offerta mentre l'asta è in corso (ovvero, le chiamate a `bid()` hanno successo) o uno che verifica se un utente può fare un'offerta più alta dell'attuale `highestBid`.

Comprendere il flusso di lavoro operativo di un contratto aiuta anche a scrivere test unitari che verificano se l'esecuzione soddisfa i requisiti. Ad esempio, il contratto d'asta specifica che gli utenti non possono fare offerte quando l'asta è terminata (ovvero, quando `auctionEndTime` è inferiore a `block.timestamp`). Pertanto, uno sviluppatore potrebbe eseguire un test unitario che verifica se le chiamate alla funzione `bid()` hanno successo o falliscono quando l'asta è finita (ovvero, quando `auctionEndTime` > `block.timestamp`).

##### 2. Valutare tutte le ipotesi relative all'esecuzione del contratto

È importante documentare qualsiasi ipotesi sull'esecuzione di un contratto e scrivere test unitari per verificare la validità di tali ipotesi. Oltre a offrire protezione contro esecuzioni impreviste, testare le asserzioni ti costringe a pensare alle operazioni che potrebbero infrangere il modello di sicurezza di un contratto intelligente. Un consiglio utile è andare oltre i "test dell'utente felice" e scrivere test negativi che verificano se una funzione fallisce per input errati.

Molti framework di test unitari consentono di creare asserzioni (semplici dichiarazioni che stabiliscono cosa un contratto può e non può fare) ed eseguire test per vedere se tali asserzioni reggono durante l'esecuzione. Uno sviluppatore che lavora sul contratto d'asta descritto in precedenza potrebbe fare le seguenti asserzioni sul suo comportamento prima di eseguire test negativi:

- Gli utenti non possono fare offerte quando l'asta è finita o non è ancora iniziata.

- Il contratto d'asta si annulla se un'offerta è inferiore alla soglia accettabile.

- Agli utenti che non riescono a vincere l'offerta vengono accreditati i loro fondi.

**Nota**: Un altro modo per testare le ipotesi è scrivere test che attivano i [modificatori di funzione](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) in un contratto, in particolare le istruzioni `require`, `assert` e `if…else`.

##### 3. Misurare la copertura del codice

La [copertura del codice](https://en.m.wikipedia.org/wiki/Code_coverage) è una metrica di test che traccia il numero di rami, righe e istruzioni nel tuo codice eseguiti durante i test. I test dovrebbero avere una buona copertura del codice per ridurre al minimo il rischio di vulnerabilità non testate. Senza una copertura sufficiente, potresti presumere erroneamente che il tuo contratto sia sicuro perché tutti i test vengono superati, mentre le vulnerabilità esistono ancora in percorsi di codice non testati. Registrare un'elevata copertura del codice, tuttavia, dà la garanzia che tutte le istruzioni/funzioni in un contratto intelligente siano state sufficientemente testate per la correttezza.

##### 4. Utilizzare framework di test ben sviluppati

La qualità degli strumenti utilizzati per eseguire i test unitari per i tuoi contratti intelligenti è fondamentale. Un framework di test ideale è quello che viene regolarmente mantenuto; fornisce funzionalità utili (es. capacità di registrazione e reportistica); e deve essere stato ampiamente utilizzato e verificato da altri sviluppatori.

I framework di test unitari per i contratti intelligenti in Solidity sono disponibili in diversi linguaggi (principalmente JavaScript, Python e Rust). Consulta alcune delle guide di seguito per informazioni su come iniziare a eseguire test unitari con diversi framework di test:

- **[Eseguire test unitari con Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Eseguire test unitari con Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Eseguire test unitari con Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Eseguire test unitari con Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Eseguire test unitari con Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Eseguire test unitari con Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Eseguire test unitari con Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Test di integrazione {#integration-testing-for-smart-contracts}

Mentre i test unitari eseguono il debug delle funzioni del contratto in isolamento, i test di integrazione valutano i componenti di un contratto intelligente nel loro insieme. I test di integrazione possono rilevare problemi derivanti da chiamate tra contratti o interazioni tra diverse funzioni nello stesso contratto intelligente. Ad esempio, i test di integrazione possono aiutare a verificare se elementi come l'[ereditarietà](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) e l'iniezione delle dipendenze funzionano correttamente.

I test di integrazione sono utili se il tuo contratto adotta un'architettura modulare o si interfaccia con altri contratti on-chain durante l'esecuzione. Un modo per eseguire test di integrazione è creare una [biforcazione della blockchain](/glossary/#fork) a un'altezza specifica (utilizzando uno strumento come [Forge](https://book.getfoundry.sh/forge/fork-testing) o [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) e simulare le interazioni tra il tuo contratto e i contratti distribuiti.

La blockchain biforcata si comporterà in modo simile alla rete principale e avrà account con stati e saldi associati. Ma agisce solo come un ambiente di sviluppo locale in sandbox, il che significa che non avrai bisogno di ETH reali per le transazioni, ad esempio, né le tue modifiche influenzeranno il vero protocollo Ethereum.

### Test basati sulle proprietà {#property-based-testing-for-smart-contracts}

Il test basato sulle proprietà è il processo di verifica che un contratto intelligente soddisfi alcune proprietà definite. Le proprietà affermano fatti sul comportamento di un contratto che dovrebbero rimanere veri in diversi scenari: un esempio di proprietà di un contratto intelligente potrebbe essere "Le operazioni aritmetiche nel contratto non vanno mai in overflow o underflow".

L'**analisi statica** e l'**analisi dinamica** sono due tecniche comuni per eseguire test basati sulle proprietà ed entrambe possono verificare che il codice di un programma (un contratto intelligente in questo caso) soddisfi alcune proprietà predefinite. Alcuni strumenti di test basati sulle proprietà sono dotati di regole predefinite sulle proprietà previste del contratto e controllano il codice rispetto a tali regole, mentre altri consentono di creare proprietà personalizzate per un contratto intelligente.

#### Analisi statica {#static-analysis}

Un analizzatore statico prende in input il codice sorgente di un contratto intelligente e restituisce risultati che dichiarano se un contratto soddisfa o meno una proprietà. A differenza dell'analisi dinamica, l'analisi statica non comporta l'esecuzione di un contratto per analizzarne la correttezza. L'analisi statica ragiona invece su tutti i possibili percorsi che un contratto intelligente potrebbe intraprendere durante l'esecuzione (ovvero, esaminando la struttura del codice sorgente per determinare cosa significherebbe per il funzionamento del contratto in fase di esecuzione).

Il [linting](https://www.perforce.com/blog/qac/what-is-linting) e i [test statici](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) sono metodi comuni per eseguire l'analisi statica sui contratti. Entrambi richiedono l'analisi di rappresentazioni di basso livello dell'esecuzione di un contratto, come gli [alberi di sintassi astratta](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) e i [grafi del flusso di controllo](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) generati dal compilatore.

Nella maggior parte dei casi, l'analisi statica è utile per rilevare problemi di sicurezza come l'uso di costrutti non sicuri, errori di sintassi o violazioni degli standard di codifica nel codice di un contratto. Tuttavia, è noto che gli analizzatori statici sono generalmente inaffidabili nel rilevare vulnerabilità più profonde e possono produrre eccessivi falsi positivi.

#### Analisi dinamica {#dynamic-analysis}

L'analisi dinamica genera input simbolici (es. nell'[esecuzione simbolica](https://en.m.wikipedia.org/wiki/Symbolic_execution)) o input concreti (es. nel [fuzzing](https://owasp.org/www-community/Fuzzing)) per le funzioni di un contratto intelligente per vedere se qualche traccia di esecuzione viola proprietà specifiche. Questa forma di test basato sulle proprietà differisce dai test unitari in quanto i casi di test coprono più scenari e un programma gestisce la generazione dei casi di test.

Il [fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) è un esempio di tecnica di analisi dinamica per verificare proprietà arbitrarie nei contratti intelligenti. Un fuzzer invoca funzioni in un contratto di destinazione con variazioni casuali o malformate di un valore di input definito. Se il contratto intelligente entra in uno stato di errore (es. uno in cui un'asserzione fallisce), il problema viene segnalato e gli input che guidano l'esecuzione verso il percorso vulnerabile vengono prodotti in un rapporto.

Il fuzzing è utile per valutare il meccanismo di convalida dell'input di un contratto intelligente poiché una gestione impropria di input imprevisti potrebbe comportare un'esecuzione non intenzionale e produrre effetti pericolosi. Questa forma di test basato sulle proprietà può essere ideale per molti motivi:

1. **Scrivere casi di test per coprire molti scenari è difficile.** Un test delle proprietà richiede solo di definire un comportamento e un intervallo di dati con cui testare il comportamento: il programma genera automaticamente casi di test in base alla proprietà definita.

2. **La tua suite di test potrebbe non coprire sufficientemente tutti i possibili percorsi all'interno del programma.** Anche con una copertura del 100%, è possibile perdersi casi limite.

3. **I test unitari dimostrano che un contratto viene eseguito correttamente per i dati campione, ma non è noto se il contratto venga eseguito correttamente per input al di fuori del campione.** I test delle proprietà eseguono un contratto di destinazione con più variazioni di un determinato valore di input per trovare tracce di esecuzione che causano fallimenti delle asserzioni. Pertanto, un test delle proprietà fornisce maggiori garanzie che un contratto venga eseguito correttamente per un'ampia classe di dati di input.

### Linee guida per l'esecuzione di test basati sulle proprietà per i contratti intelligenti {#running-property-based-tests}

L'esecuzione di test basati sulle proprietà inizia in genere con la definizione di una proprietà (es. assenza di [overflow di interi](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) o di una raccolta di proprietà che si desidera verificare in un contratto intelligente. Potrebbe anche essere necessario definire un intervallo di valori entro il quale il programma può generare dati per gli input delle transazioni durante la scrittura dei test delle proprietà.

Una volta configurato correttamente, lo strumento di test delle proprietà eseguirà le funzioni dei tuoi contratti intelligenti con input generati casualmente. Se ci sono violazioni delle asserzioni, dovresti ottenere un rapporto con dati di input concreti che violano la proprietà in fase di valutazione. Consulta alcune delle guide di seguito per iniziare a eseguire test basati sulle proprietà con diversi strumenti:

- **[Analisi statica dei contratti intelligenti con Slither](https://github.com/crytic/slither)**
- **[Analisi statica dei contratti intelligenti con Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Test basati sulle proprietà con Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing dei contratti con Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing dei contratti con Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing dei contratti con Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Esecuzione simbolica dei contratti intelligenti con Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Esecuzione simbolica dei contratti intelligenti con Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Test manuali per i contratti intelligenti {#manual-testing-for-smart-contracts}

I test manuali dei contratti intelligenti avvengono spesso più avanti nel ciclo di sviluppo, dopo l'esecuzione dei test automatizzati. Questa forma di test valuta il contratto intelligente come un prodotto completamente integrato per vedere se funziona come specificato nei requisiti tecnici.

### Testare i contratti su una blockchain locale {#testing-on-local-blockchain}

Sebbene i test automatizzati eseguiti in un ambiente di sviluppo locale possano fornire utili informazioni di debug, vorrai sapere come si comporta il tuo contratto intelligente in un ambiente di produzione. Tuttavia, la distribuzione sulla catena principale di Ethereum comporta commissioni del gas, per non parlare del fatto che tu o i tuoi utenti potreste perdere denaro reale se il tuo contratto intelligente presenta ancora dei bug.

Testare il tuo contratto su una blockchain locale (nota anche come [rete di sviluppo](/developers/docs/development-networks/)) è un'alternativa consigliata ai test sulla rete principale. Una blockchain locale è una copia della blockchain di Ethereum in esecuzione localmente sul tuo computer che simula il comportamento del livello di esecuzione di Ethereum. In quanto tale, puoi programmare transazioni per interagire con un contratto senza incorrere in costi generali significativi.

L'esecuzione di contratti su una blockchain locale potrebbe essere utile come forma di test di integrazione manuale. [I contratti intelligenti sono altamente componibili](/developers/docs/smart-contracts/composability/), consentendoti di integrarti con i protocolli esistenti, ma dovrai comunque assicurarti che tali complesse interazioni on-chain producano i risultati corretti.

[Maggiori informazioni sulle reti di sviluppo.](/developers/docs/development-networks/)

### Testare i contratti sulle reti di test {#testing-contracts-on-testnets}

Una rete di test o testnet funziona esattamente come la rete principale di Ethereum, tranne per il fatto che utilizza ether (ETH) senza alcun valore nel mondo reale. Distribuire il tuo contratto su una [rete di test](/developers/docs/networks/#ethereum-testnets) significa che chiunque può interagirvi (es. tramite il frontend della dApp) senza mettere a rischio i fondi.

Questa forma di test manuale è utile per valutare il flusso end-to-end della tua applicazione dal punto di vista dell'utente. Qui, i beta tester possono anche eseguire prove e segnalare eventuali problemi con la logica di business e la funzionalità complessiva del contratto.

La distribuzione su una rete di test dopo i test su una blockchain locale è l'ideale poiché la prima è più vicina al comportamento della macchina virtuale di Ethereum. Pertanto, è comune per molti progetti nativi di Ethereum distribuire dApp sulle reti di test per valutare il funzionamento di un contratto intelligente in condizioni reali.

[Maggiori informazioni sulle reti di test di Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Test vs. verifica formale {#testing-vs-formal-verification}

Sebbene i test aiutino a confermare che un contratto restituisce i risultati previsti per alcuni input di dati, non possono dimostrare in modo conclusivo lo stesso per gli input non utilizzati durante i test. Testare un contratto intelligente, pertanto, non può garantire la "correttezza funzionale" (ovvero, non può dimostrare che un programma si comporti come richiesto per _tutti_ gli insiemi di valori di input).

La verifica formale è un approccio per valutare la correttezza del software verificando se un modello formale del programma corrisponde alla specifica formale. Un modello formale è una rappresentazione matematica astratta di un programma, mentre una specifica formale definisce le proprietà di un programma (ovvero, asserzioni logiche sull'esecuzione del programma).

Poiché le proprietà sono scritte in termini matematici, diventa possibile verificare che un modello formale (matematico) del sistema soddisfi una specifica utilizzando regole logiche di inferenza. Pertanto, si dice che gli strumenti di verifica formale producano una "prova matematica" della correttezza di un sistema.

A differenza dei test, la verifica formale può essere utilizzata per verificare che l'esecuzione di un contratto intelligente soddisfi una specifica formale per _tutte_ le esecuzioni (ovvero, non ha bug) senza doverlo eseguire con dati campione. Questo non solo riduce il tempo impiegato per eseguire dozzine di test unitari, ma è anche più efficace nel rilevare vulnerabilità nascoste. Detto questo, le tecniche di verifica formale si collocano su uno spettro a seconda della loro difficoltà di implementazione e utilità.

[Maggiori informazioni sulla verifica formale per i contratti intelligenti.](/developers/docs/smart-contracts/formal-verification)

## Test vs audit e bug bounty {#testing-vs-audits-bug-bounties}

Come accennato, test rigorosi raramente possono garantire l'assenza di bug in un contratto; gli approcci di verifica formale possono fornire garanzie di correttezza più forti, ma sono attualmente difficili da usare e comportano costi considerevoli.

Tuttavia, puoi aumentare ulteriormente la possibilità di individuare le vulnerabilità del contratto ottenendo una revisione indipendente del codice. Gli [audit dei contratti intelligenti](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) e i [bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) sono due modi per far analizzare i tuoi contratti ad altri.

Gli audit vengono eseguiti da revisori esperti nel trovare casi di falle di sicurezza e scarse pratiche di sviluppo nei contratti intelligenti. Un audit di solito includerà test (e possibilmente verifiche formali) nonché una revisione manuale dell'intera base di codice.

Al contrario, un programma di bug bounty di solito prevede l'offerta di una ricompensa finanziaria a un individuo (comunemente descritto come [hacker whitehat](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>)) che scopre una vulnerabilità in un contratto intelligente e la rivela agli sviluppatori. I bug bounty sono simili agli audit poiché implicano la richiesta ad altri di aiutare a trovare difetti nei contratti intelligenti.

La differenza principale è che i programmi di bug bounty sono aperti alla più ampia comunità di sviluppatori/hacker e attraggono un'ampia classe di hacker etici e professionisti della sicurezza indipendenti con competenze ed esperienze uniche. Questo può essere un vantaggio rispetto agli audit dei contratti intelligenti che si basano principalmente su team che potrebbero possedere competenze limitate o ristrette.

## Strumenti e librerie di test {#testing-tools-and-libraries}

### Strumenti di test unitari {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Strumento di copertura del codice per contratti intelligenti scritti in Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Framework per lo sviluppo e il test avanzati di contratti intelligenti (basato su ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Strumento per testare i contratti intelligenti in Solidity. Funziona sotto il plugin "Solidity Unit Testing" di Remix IDE, che viene utilizzato per scrivere ed eseguire casi di test per un contratto._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Libreria di asserzioni per il test dei contratti intelligenti di Ethereum. Assicurati che i tuoi contratti si comportino come previsto!_

- **[Framework di test unitari Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie utilizza Pytest, un framework di test ricco di funzionalità che ti consente di scrivere piccoli test con codice minimo, scala bene per progetti di grandi dimensioni ed è altamente estensibile._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry offre Forge, un framework di test per Ethereum veloce e flessibile in grado di eseguire semplici test unitari, controlli di ottimizzazione del gas e fuzzing dei contratti._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Framework per testare i contratti intelligenti basato su ethers.js, Mocha e Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Framework di sviluppo e test basato su Python per contratti intelligenti mirati alla macchina virtuale di Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Framework basato su Python per test unitari e fuzzing con forti capacità di debug e supporto per test cross-chain, che utilizza pytest e Anvil per la migliore esperienza utente e prestazioni._

### Strumenti di test basati sulle proprietà {#property-based-testing-tools}

#### Strumenti di analisi statica {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Framework di analisi statica per Solidity basato su Python per trovare vulnerabilità, migliorare la comprensione del codice e scrivere analisi personalizzate per i contratti intelligenti._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter per far rispettare le migliori pratiche di stile e sicurezza per il linguaggio di programmazione dei contratti intelligenti Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Analizzatore statico basato su Rust specificamente progettato per la sicurezza e lo sviluppo di contratti intelligenti Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Framework di analisi statica basato su Python con rilevatori di vulnerabilità e qualità del codice, stampanti per estrarre informazioni utili dal codice e supporto per la scrittura di sottomoduli personalizzati._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Un linter semplice e potente per Solidity._

#### Strumenti di analisi dinamica {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer di contratti veloce per rilevare vulnerabilità nei contratti intelligenti attraverso test basati sulle proprietà._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Strumento di fuzzing automatizzato utile per rilevare violazioni delle proprietà nel codice dei contratti intelligenti._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Framework di esecuzione simbolica dinamica per l'analisi del bytecode della EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Strumento di valutazione del bytecode della EVM per rilevare le vulnerabilità dei contratti utilizzando l'analisi delle contaminazioni (taint analysis), l'analisi concolica e il controllo del flusso di controllo._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble è un linguaggio di specifica e uno strumento di verifica a runtime che ti consente di annotare i contratti intelligenti con proprietà che ti permettono di testare automaticamente i contratti con strumenti come Diligence Fuzzing o MythX._

## Tutorial correlati {#related-tutorials}

- [Una panoramica e un confronto di diversi prodotti di test](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Come usare Echidna per testare i contratti intelligenti](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Come usare Manticore per trovare bug nei contratti intelligenti](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Come usare Slither per trovare bug nei contratti intelligenti](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Come simulare (mock) i contratti Solidity per i test](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Come eseguire test unitari in Solidity usando Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Letture consigliate {#further-reading}

- [Una guida approfondita al test dei contratti intelligenti di Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Come testare i contratti intelligenti di Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Guida ai test unitari di MolochDAO per sviluppatori](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Come testare i contratti intelligenti come una rockstar](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Tutorial: Test dei contratti intelligenti su Ethereum {#tutorials}

- [Come sviluppare e testare una dApp su una rete di test locale multi-client](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Procedura dettagliata per la distribuzione di un contratto intelligente su una rete di test locale e l'esecuzione di test._
- [Come simulare (mock) i contratti intelligenti Solidity per i test](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Tutorial intermedio su come utilizzare dati fittizi e implementare test unitari._
- [Come usare Echidna per testare i contratti intelligenti](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Approccio avanzato al fuzzing e al test dei contratti intelligenti._