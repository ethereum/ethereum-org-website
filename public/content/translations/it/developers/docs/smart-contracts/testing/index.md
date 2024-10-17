---
title: Testare i contratti intelligenti
description: Una panoramica delle tecniche e considerazioni per testare i contratti intelligenti di Ethereum.
lang: it
---

Le blockchain pubbliche come Ethereum sono immutabili, il che rende difficile modificare il codice di un contratto intelligente dopo la sua distribuzione. Esistono dei [modelli di aggiornamento dei contratti](/developers/docs/smart-contracts/upgrading/) per eseguire "aggiornamenti virtuali", ma sono difficili da implementare e richiedono il consenso sociale. Inoltre, un aggiornamento può risolvere un errore solo _dopo_ che è stato scoperto; se un utente malevolo scopre per primo la vulnerabilità, il tuo contratto intelligente rischierà di essere sfruttato.

Per questi motivi, testare i contratti intelligenti prima della [distribuzione](/developers/docs/smart-contracts/deploying/) alla Rete Principale è un requisito minimo per la [sicurezza](/developers/docs/smart-contracts/security/). Esistono molte tecniche per testare i contratti e valutare la correttezza del codice; ciò che scegli dipende dalle tue esigenze. Tuttavia, una suite di test composta da strumenti e approcci differenti è ideale per individuare le falle di sicurezza sia minori che maggiori nel codice dei contratti.

## Prerequisiti {#prerequisites}

Questa pagina spiega come testare i contratti intelligenti prima della distribuzione sulla rete di Ethereum. Parte dal presupposto che tu abbia familiarità con i [contratti intelligenti](/developers/docs/smart-contracts/).

## In cosa consistono i test dei contratti intelligenti? {#what-is-smart-contract-testing}

I test dei contratti intelligenti sono il procedimento per verificare che il codice di un contratto intelligente funzioni come previsto. I test sono utili per verificare se uno specifico contratto intelligente soddisfa i requisiti di affidabilità, utilizzabilità e sicurezza.

Sebbene gli approcci possano variare, gran parte dei metodi di test richiedono l'esecuzione di un contratto intelligente con un piccolo campione dei dati che si prevede dovrà gestire. Se il contratto produce risultati corretti per i dati del campione, si presume che funzioni correttamente. Gran parte degli strumenti di test fornisce risorse per scrivere ed eseguire i [casi d'uso](https://en.m.wikipedia.org/wiki/Test_case) per verificare se l'esecuzione dei contratti corrisponde ai risultati previsti.

### Perché è importante testare i contratti intelligenti? {#importance-of-testing-smart-contracts}

Poiché i contratti intelligenti gestiscono spesso risorse finanziarie dal valore elevato, gli errori minori di programmazione possono causare, e spesso causano, [enormi perdite per gli utenti](https://rekt.news/leaderboard/). Test rigorosi possono, tuttavia, aiutarti a scoprire i difetti e i problemi nel codice di un contratto intelligente in anticipo, e correggerli prima del lancio sulla Rete Principale.

Sebbene sia possibile aggiornare un contratto se viene scoperto un bug, gli aggiornamenti sono complessi e possono [risultare in errori](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) se gestiti impropriamente. L'aggiornamento di un contratto nega ulteriormente il principio di immutabilità, gravando sugli utenti con ulteriori ipotesi di fiducia. Viceversa, un piano completo per testare il tuo contratto mitiga i rischi di sicurezza del contratto intelligente, riducendo l'esigenza di eseguire complessi aggiornamenti alla logica dopo la distribuzione.

## Metodi per testare i contratti intelligenti {#methods-for-testing-smart-contracts}

I metodi per testare i contratti intelligenti di Ethereum ricadono in due ampie categorie: **test automatizzati** e **test manuali**. I test automatizzati e manuali offrono vantaggi e compromessi unici, ma puoi combinarli per creare un piano robusto di analisi dei tuoi contratti.

### Test automatizzati {#automated-testing}

I test automatizzati utilizzano strumenti che controllano automaticamente il codice di un contratto intelligente alla ricerca di errori durante l'esecuzione. Il vantaggio dei test automatizzati deriva dall'utilizzo di [script](https://www.techtarget.com/whatis/definition/script?amp=1) per guidare la valutazione delle funzionalità del contratto. I test basati su script sono pianificabili per essere eseguiti ripetutamente con un minimo intervento umano, rendendoli più efficienti degli approcci manuali al test.

I test automatizzati sono particolarmente utili quando sono ripetitivi e richiedono tempo, difficili da svolgere manualmente, suscettibili all'errore umano, o coinvolgono la valutazione delle funzioni critiche del contratto. Ma gli strumenti di test automatizzati possono comportare svantaggi: potrebbero non identificare certi bug e produrre molti [falsi positivi](https://www.contrastsecurity.com/glossary/false-positive). Dunque, associare ai test automatizzati dei test manuali per i contratti intelligenti è ideale.

### Test manuali {#manual-testing}

I test manuali sono assistiti dall'uomo e comportano l'esecuzione di ogni caso di prova nella tua suite di test, l'uno dopo l'altro, analizzando la correttezza di un contratto intelligente. Questo si distingue dai test automatizzati, in cui puoi eseguire simultaneamente diversi test isolati su un contratto e ottenere un report che mostri tutti i test falliti e superati.

I test manuali sono eseguibili da un singolo individuo che segue un piano testuale scritto che copre diversi scenari di test. Inoltre, come parte dei test manuali potresti far interagire diversi individui o gruppi con un contratto intelligente durante un periodo specificato. I collaudatori confronteranno il comportamento effettivo del contratto con quello previsto, segnalando qualsiasi differenza come un bug.

I test manuali efficaci richiedono considerevoli risorse (abilità, tempo, denaro e sforzo) ed è possibile, a causa di errori umani, non identificare certi errori eseguendo i test. Ma i test manuali possono anche essere vantaggiosi, ad esempio un collaudatore umano (es. un revisore) potrebbe utilizzare l'intuito per rilevare i casi limite che non sarebbero identificati da uno strumento di test automatizzato.

## Test automatizzati per i contratti intelligenti {#automated-testing-for-smart-contracts}

### Test unitario {#unit-testing-for-smart-contracts}

Il test unitario valuta le funzioni del contratto separatamente, verificando che ogni componente funzioni correttamente. Dei buoni test unitari dovrebbero essere semplici, rapidi da eseguire e fornire un'idea chiara di cosa sia andato storto, qualora dovessero fallire.

I test unitari sono utili per verificare che le funzioni restituiscano i valori previsti e che l'archiviazione del contratto sia aggiornata correttamente dopo l'esecuzione della funzione. Inoltre, l'esecuzione dei test unitari dopo aver apportato modifiche alla base di codice dei contratti assicura che l'aggiunta di nuova logica non introduca errori. Seguono alcune linee guida per effettuare test unitari efficienti:

#### Linee guida per i test unitari dei contratti intelligenti {#unit-testing-guidelines}

##### 1. Comprendere la logica e il flusso di lavoro dei contratti

Prima di scrivere i test unitari, è utile conoscere quali funzionalità sono offerte da un contratto intelligente, nonché come gli utenti accederanno a tali funzioni e le utilizzeranno. Ciò è particolarmente utile per eseguire i [test del percorso felice](https://en.m.wikipedia.org/wiki/Happy_path) che determinano se le funzioni in un contratto restituiscono il risultato corretto per gli input validi dell'utente. Spiegheremo questo concetto utilizzando questo esempio (accorciato) di [un contratto d'asta](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```
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

Questo è un semplice contratto d'asta, progettato per ricevere offerte durante il periodo d'offerta. Se `highestBid` aumenta, l'offerente maggiore precedente riceve il denaro; una volta terminato il periodo di offerta, il `beneficiary` chiama il contratto per ricevere il denaro.

I test unitari per un contratto simile coprirebbero diverse funzioni che un utente potrebbe chiamare quando interagisce con esso. Un esempio sarebbe un test unitario che controlli se un utente può presentare un'offerta durante l'asta (cioè, le chiamate a `bid()` hanno esito positivo) o uno che controlli se un utente può presentare un'offerta maggiore dell'attuale `highestBid`.

Comprendere il flusso di lavoro operativo di un contratto aiuta anche a scrivere test unitari che verificano se l'esecuzione soddisfa i requisiti. Ad esempio, il contratto d'asta specifica che gli utenti non possono presentare offerte al termine dell'asta (cioè, quando `auctionEndTime` è inferiore a `block.timestamp`). Dunque, uno sviluppatore potrebbe eseguire un test unitario che verifichi se le chiamate alla funzione `bid()` hanno esito positivo o negativo al termine dell'asta (cioè, quando `auctionEndTime` > `block.timestamp`).

##### 2. Valutare tutte le ipotesi legate all'esecuzione del contratto

È importante documentare qualsiasi ipotesi sull'esecuzione di un contratto e scrivere test unitari per verificare la validità di tali ipotesi. Oltre a offrire protezione dall'esecuzione imprevista, testare le asserzioni impone di pensare alle operazioni che potrebbero infrangere il modello di sicurezza di un contratto intelligente. Un suggerimento utile è andare oltre i "test utente felice" e scrivere test negativi che verifichino se una funzione fallisce per gli input errati.

Molti quadri di test unitari ti consentono di creare asserzioni – semplici dichiarazioni che dichiarano ciò che un contratto può e non può fare – ed eseguire test per verificare se tali asserzioni sono rispettate durante l'esecuzione. Uno sviluppatore che lavora al contratto d'asta descritto in precedenza potrebbe fare le seguenti asserzioni sul suo comportamento prima di seguire dei test negativi:

- Gli utenti non possono presentare offerte quando l'asta è terminata o quando non è iniziata.

- Il contratto d'asta viene annullato se un'offerta è inferiore alla soglia accettabile.

- Agli utenti che non vincono l'asta vengono accreditati i propri fondi

**Nota**: un altro modo di testare le ipotesi è scrivere test che inneschino i [modificatori della funzione](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) in un contratto, specialmente, le dichiarazioni `require`, `assert` e `if…else`.

##### 3. Misurare la copertura del codice

La [copertura del codice](https://en.m.wikipedia.org/wiki/Code_coverage) è un parametro di prova che traccia il numero di rami, righe e dichiarazioni nel tuo codice eseguiti durante i test. I test dovrebbero avere una buona copertura del codice, altrimenti potresti ottenere dei "falsi negativi", che si verificano quando un contratto supera tutti i test ma continuano a esistere vulnerabilità nel codice. Registrare un'elevata copertura del codice, tuttavia, garantisce che tutte le dichiarazioni/funzioni di un contratto intelligente siano state testate sufficientemente per verificarne la correttezza.

##### 4. Utilizzare quadri di test ben sviluppati

La qualità degli strumenti utilizzati nell'esecuzione dei test unitari per i tuoi contratti intelligenti è fondamentale. Un quadro di test ideale è mantenuto regolarmente, fornisce funzionalità utili (es. capacità di registrazione e segnalazione) e deve essere utilizzato e controllato ampiamente da altri sviluppatori.

I quadri di test unitari per i contratti intelligenti in Solidity esistono in diversi linguaggi (principalmente JavaScript, Python e Rust). Vedi alcune delle guide seguenti per informazioni su come iniziare a eseguire test unitari con diversi quadri di test:

- **[Eseguire test unitari con Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Eseguire test unitari con Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Eseguire test unitari con Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Eseguire test unitari con Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Eseguire test unitari con Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Eseguire test unitari con Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Eseguire test unitari con Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Test d'integrazione {#integration-testing-for-smart-contracts}

Mentre i test unitari eseguono il debug delle funzioni del contratto in isolamento, i test d'integrazione valutano i componenti di un contratto intelligente nella sua interezza. I test d'integrazione possono rilevare i problemi che sorgono da chiamate tra contratti o da interazioni tra funzioni differenti nello stesso contratto intelligente. Ad esempio, i test d'integrazione possono aiutare a verificare se aspetti come l'[eredità](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) e l'iniezione di dipendenza funzionano correttamente.

I test d'integrazione sono utili se il tuo contratto adotta un'architettura modulare o si interfaccia con altri contratti su catena durante l'esecuzione. Un modo di eseguire i test d'integrazone è [biforcare la blockchain](/glossary/#fork) a un'altezza specifica (utilizzando uno strumento come [Forge](https://book.getfoundry.sh/forge/fork-testing) o [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) e simulare le interazioni tra il tuo contratto e i contratti distribuiti.

La blockchain diramata si comporterà in modo simile alla Rete Principale e avrà conti con stati e saldi associati. Ma agisce soltanto come un ambiente di sviluppo locale in modalità sandbox, a significare che non avrai bisogno di ETH reali per le transazioni, ad esempio, né le tue modifiche influenzeranno il protocollo reale di Ethereum.

### Test basati sulle proprietà {#property-based-testing-for-smart-contracts}

I test basati sulle proprietà sono il procedimento di verifica che un contratto intelligente soddisfi una data proprietà definita. Le proprietà asseriscono fatti sul comportamento di un contratto che si prevede restino veri in diversi scenari: un esempio di proprietà di un contratto intelligente potrebbe essere che "Le operazioni aritmetiche nel contratto non hanno mai sovrafflussi o sottoeccedenze."

L'**analisi statica** e l'**analisi dinamica** sono due tecniche comuni per eseguire i test basati sulle proprietà ed entrambe posso verificare che il codice di un programma (in questo caso, un contratto intelligente) soddisfi una data proprietà predefinita. Alcuni strumenti di test basati sulle proprietà comprendono delle regole predefinite sulle proprietà previste del contratto e verificano il codice rispetto a tali regole; altri ti consentono di creare proprietà personalizzate per un contratto intelligente.

#### Analisi statica {#static-analysis}

Un analizzatore statico prende come input il codice sorgente di un contratto intelligente e produce dei risultati che dichiarano se un contratto soddisfa o meno una proprietà. A differenza dell'analisi dinamica, l'analisi statica non coinvolge l'esecuzione di un contratto per analizzarne la correttezza. L'analisi statica, invece, ragiona su tutti i possibili percorsi che un contratto intelligente potrebbe intraprendere durante l'esecuzione (esaminando la struttura del codice sorgente per determinare cosa significherebbe per il funzionamento dei contratti all'esecuzione).

Il [linting](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important) e i [test statici](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) sono metodi comuni per eseguire analisi statiche sui contratti. Entrambi richiedono rappresentazioni di basso livello dell'esecuzione di un contratto, come [alberi di sintassi astratta](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) e [grafici del flusso di controllo](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) prodotti dal compilatore.

In gran parte dei casi, l'analisi statica è utile per rilevare problemi di sicurezza come l'uso di costrutti non sicuri, errori di sintassi o violazioni degli standard di scrittura nel codice di un contratto. Tuttavia, gli analizzatori statici sono noti come generalmente instabili nel rilevare le vulnerabilità più profonde e potrebbero produrre un eccesso di falsi positivi.

#### Analisi dinamica {#dynamic-analysis}

L'analisi dinamica genera input simbolici (es. nell'[esecuzione simbolica](https://en.m.wikipedia.org/wiki/Symbolic_execution)) o input concreti (es. nel [fuzzing](https://owasp.org/www-community/Fuzzing)) alle funzioni di un contratto intelligente, per scoprire se qualche traccia d'esecuzione viola delle proprietà specifiche. Questa forma di test basato sulle proprietà differisce dai test unitari nel fatto che i casi di prova coprono diversi scenari e che un programma gestisce la generazione dei casi di prova.

Il [fuzzing](https://halborn.com/what-is-fuzz-testing-fuzzing/) è un esempio di tecnica di analisi dinamica per verificare le proprietà arbitrarie nei contratti intelligenti. Un fuzzer invoca le funzioni in un contratto in questione con varianti casuali o malformate di un valore di input definito. Se il contratto intelligente entra in uno stato di errore (es., uno in cui un'asserzione fallisce), il problema è segnalato e gli input che guidano l'esecuzione verso il percorso vulnerabile sono prodotti in un report.

Il fuzzing è utile per valutare il meccanismo di validazione dell'input di un contratto intelligente, poiché la gestione inappropriata degli input imprevisti potrebbe risultare in un'esecuzione indesiderata, producendo effetti pericolosi. Questa forma di test basati sulle proprietà può essere ideale per molti motivi:

1. **Scrivere i casi di prova per coprire molti scenari è difficile.** Un test delle proprietà ti richiede soltanto di definire un comportamento e un intervallo di dati con cui testare il comportamento; sarà il programma a generare automaticamente i casi di prova secondo la proprietà definita.

2. **La tua suite di test potrebbe non coprire a sufficienza tutti i percorsi possibili nel programma.** Anche con una copertura del 100%, è possibile perdere alcuni casi limite.

3. **I test unitari provano che un contratto si esegue correttamente per i dati campione, ma se il contratto si esegua correttamente per gli input esterni al campione resta ignoto.** I test delle proprietà eseguono il contratto in questione con molte varianti di un dato valore di input per trovare le tracce d'esecuzione che causano gli errori dell'asserzione. Dunque, un test delle proprietà fornisce maggiori garanzie che un contratto sia eseguito correttamente per un'ampia classe di dati di input.

### Linee guida per l'esecuzione di test basati sulle proprietà per i contratti intelligenti {#running-property-based-tests}

L'esecuzione di test basati sulle proprietà inizia solitamente con la definizione di una proprietà (es. l'assenza di [sovrafflussi di interi](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) o la raccolta di proprietà che desideri verificare in un contratto intelligente. Inoltre, durante la scrittura dei test delle proprietà potresti dover definire un intervallo di valori entro cui il programma possa generare i dati per gli input della transazione.

Una volta configurato adeguatamente, lo strumento di test delle proprietà eseguirà le funzioni dei tuoi contratti intelligenti con input generati casualmente. Se si verifica una violazione delle asserzioni, dovresti ottenere un report con i dati di input concreti che violano la proprietà valutata. Vedi alcune delle seguenti linee guida per iniziare a eseguire test basati sulle proprietà con diversi strumenti:

- **[Analisi statica dei contratti intelligenti con Slither](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither#slither)**
- **[Analisi statica dei contratti intelligenti con Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Test basati sulle proprietà con Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing dei contratti con Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing dei contratti con Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing dei contratti con Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Esecuzione simbolica dei contratti intelligenti con Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Esecuzione simbolica dei contratti intelligenti con Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Test manuali per i contratti intelligenti {#manual-testing-for-smart-contracts}

I test manuali dei contratti intelligenti sono spesso effettuati più avanti nel ciclo di sviluppo, dopo aver eseguito i test automatizzati. Questa forma di test valuta il contratto intelligente come un prodotto pienamente integrato per scoprire se opera come specificato nei requisiti tecnici.

### Testare i contratti su una blockchain locale {#testing-on-local-blockchain}

Mentre i test automatizzati eseguiti in un ambiente di sviluppo locale possono fornire utili informazioni di debug, vorrai sapere come il tuo contratto intelligente si comporta in un ambiente di produzione. Tuttavia, distribuire alla catena principale di Ethereum comporta delle commissioni sul carburante, per non menzionare che tu o i tuoi utenti potreste perdere denaro reale se il contratto intelligente dovesse ancora contenere dei bug.

Testare il contratto su una blockchain locale (anche nota come una [rete di sviluppo](/developers/docs/development-networks/)) è un'alternativa consigliata ai test sulla Rete principale. Una blockchain locale è una copia della blockchain di Ethereum eseguita localmente sul tuo computer che simula il comportamento del livello di esecuzione di Ethereum. Come tale, puoi programmare le transazioni affinché interagiscano con un contratto senza incorrere in significativi costi di gestione.

Eseguire i contratti su una blockchain locale potrebbe essere utile come forma di test d'integrazione manuale. [I contratti intelligenti sono altamente componibili](/developers/docs/smart-contracts/composability/), il che ti consente di integrarli con i protocolli esistenti – ma dovrai assicurarti che tali interazioni complesse su catena producano i risultati corretti.

[Maggiori informazioni sulle reti di sviluppo.](/developers/docs/development-networks/)

### Testare i contratti sulle reti di prova {#testing-contracts-on-testnets}

Una rete di prova funziona esattamente come la Rete principale di Ethereum, tranne nel fatto che utilizza ether (ETH) privi di valore reale. Distribuire il proprio contratto su una [rete di prova](/developers/docs/networks/#ethereum-testnets) significa che chiunque può interagirvi (es. tramite il frontend della dapp) senza mettere a rischio dei fondi.

Questa forma di test manuale è utile per valutare il flusso end-to-end della tua applicazione dal punto di vista di un utente. Inoltre, qui i beta tester possono eseguire prove e segnalare qualsiasi problema con la logica aziendale del contratto e le sue funzionalità complessive.

Distribuire su una rete di prova dopo il test su una blockchain locale è ideale, poiché la prima è più simile al comportamento della Macchina Virtuale di Ethereum. Pertanto, è comune per molti progetti nativi di Ethereum distribuire le dapp sulle reti di prova per valutare il funzionamento dei contratti intelligenti in condizioni reali.

[Maggiori informazioni sulle reti di prova di Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Test vs. verifica formale {#testing-vs-formal-verification}

Sebbene i test aiutino a confermare che un contratto restituisce i risultati previsti per alcuni input di dati, non può provare in via conclusiva lo stesso per gli input non usati durante i test. Testare un contratto intelligente, dunque, non può garantire la "correttezza funzionale" (cioè, non può dimostrare che un programma si comporti come richiesto per _tutte_ le serie di valori di input).

La verifica formale è un approccio di valutazione della correttezza del software tramite la verifica del fatto che un modello formale del programma corrisponda alla specifica formale. Un modello formale è una rappresentazione matematica astratta di un programma, mentre una specifica formale definisce le proprietà di un programma (ossia le asserzioni logiche sull'esecuzione del programma).

Poiché le proprietà sono scritte in termini matematici, diventa possibile verificare che un modello (matematico) formale del sistema soddisfi una specifica utilizzando le regole logiche di inferenza. Dunque, si dice che gli strumenti di verifica formale producano una 'prova matematica' della correttezza di un sistema.

A differenza dei test, la verifica formale è utilizzabile per verificare che l'esecuzione dei contratti intelligenti soddisfi una specifica formale per _tutte_ le esecuzioni (cioè che sia privo di bug) senza doverlo eseguire con dei campioni di dati. Questo non solo riduce il tempo trascorso a eseguire decine di test unitari, ma è anche più efficiente nel trovare le vulnerabilità nascoste. Detto ciò, le tecniche di verifica formale si trovano su uno spettro che dipende dalla loro difficoltà di implementazione e utilità.

[Maggiori informazioni sulla verifica formale per i contratti intelligenti.](/developers/docs/smart-contracts/formal-verification)

## Test vs. controlli e bug bounty {#testing-vs-audits-bug-bounties}

Come accennato, raramente i test rigorosi possono garantire l'assenza di bug in un contratto; gli approcci di verifica formale possono fornire maggiori garanzie di correttezza ma al momento sono difficili da utilizzare e incorrono in considerevoli costi.

Tuttavia, puoi aumentare maggiormente la possibilità di identificare le vulnerabilità del contratto aggiungendo una revisione indipendente del codice. I [controlli dei contratti intelligenti](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) e le [bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) sono due metodi per far analizzare ad altri i tuoi contratti.

I controlli sono eseguiti da revisori esperti nel trovare i casi di falle di sicurezza e pratiche di sviluppo inadeguate nei contratti intelligenti. Un controllo, solitamente, includerà test (e verosimilmente una verifica formale), nonché una revisione manuale dell'intera base di codice.

Viceversa, un programma di bug bounty comporta solitamente l'offerta di una ricompensa economica a una persona (comunemente descritto come [hacker whitehat](https://en.wikipedia.org/wiki/White_hat_(computer_security))) che scopre una vulnerabilità in un contratto intelligente e la comunica agli sviluppatori. Le bug bounty sono simili ai controlli poiché comportano di chiedere ad altri di aiutare a trovare difetti nei contratti intelligenti.

La differenza principale è che i programmi di bug bounty sono aperti alla più ampia community di sviluppatori/hacker e attrae un'ampia classe di hacker etici e professionisti della sicurezza indipendenti dotati di competenze uniche ed esperienza. Questo potrebbe essere un vantaggio rispetto ai controlli del contratto intelligente che si affidano principalmente ai team che potrebbero possedere esperienza limitata o minima.

## Strumenti di test e librerie {#testing-tools-and-libraries}

### Strumenti per i test unitari {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Strumento di copertura del codice per contratti intelligenti scritti in Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Quadro per lo sviluppo e test avanzati dei contratti intelligenti (basato su ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Strumento per testare contratti intelligenti in Solidity. Opera sotto il plugin "Solidity Unit Testing" di Remix IDE, usato per scrivere ed eseguire casi di prova per un contratto._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Libreria di asserzioni per i test di contratti intelligenti di Ethereum. Assicurati che i tuoi contratti si comportino come previsto!_

- **[Quadro di test unitari di Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie utilizza Pytest, un quadro di test ricco di funzionalità che ti consente di scrivere piccoli test con codice minimale, si ridimensiona bene per i grandi progetti ed è altamente estendibile._

- **[Test di Foundry](https://github.com/foundry-rs/foundry/tree/master/forge)** - _Foundry offre Forge, un quadro di test di Ethereum veloci e flessibili, in grado di eseguire semplici test unitari, controlli d'ottimizzazione del carburante e fuzzing del contratto._

- **[Test di Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Quadro per testare i contratti intelligenti basato su ethers.js, Mocha e Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Quadro di sviluppo e test basato su Python per i contratti intelligenti, rivolto alla Macchina Virtuale Intelligente._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Assetto basato su Python per i test unitari e il fuzzing, con forti capacità di debug e supporto ai test tra catene, che utilizza pytest e Anvil per un'esperienza dell'utente e prestazioni migliori._

### Strumenti di test basati sulle proprietà {#property-based-testing-tools}

#### Strumenti di analisi statica {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Quadro di analisi statica in Solidity basato su Python per trovare vulnerabilità, migliorare la comprensione del codice e scrivere analisi personalizzate per i contratti intelligenti._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter per l'applicazione delle migliori pratiche di stile e sicurezza per il linguaggio di programmazione dei contratti intelligenti Solidity_

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)**: _Analizzatore statico basato su Rust, progettato specificamente per la sicurezza e lo sviluppo di contratti intelligenti in Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Assetto di analisi statica basato su Python con rilevatori delle vulnerabilità e della qualità del codice, stampanti per estrarre informazioni utili dal codice e supporto alla scrittura di moduli secondari personalizzati._

#### Strumenti di analisi dinamica {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Veloce fuzzer di contratti per rilevare le vulnerabilità nei contratti intelligenti tramite i test basati sulle proprietà._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Strumento automatizzato di fuzzing utile per rilevare le violazioni delle proprietà nel codice dei contratti intelligenti._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Quadro di esecuzione simbolica e dinamica per analizzare il bytecode dell'EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Strumento di valutazione del bytecode dell'EVM per rilevare le vulnerabilità del contratto utilizzando l'analisi a macchia, l'analisi concolica e la verifica del flusso di controllo._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble è uno strumento di verifica del linguaggio della specifica e dell'esecuzione che consente di annotare i contratti intelligenti con proprietà che consentono di testare automaticamente i contratti con strumenti come Diligence Fuzzing o MythX._

## Tutorial correlati {#related-tutorials}

- [Panoramica e confronto dei diversi prodotti di test](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Come usare Echidna per testare gli smart contract](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Come utilizzare Manticore per trovare bug nei contratti intelligenti](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Come usare Slither per trovare bug nei contratti intelligenti](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Come simulare contratti in Solidity per i test](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Come eseguire i test unitari in Solidity, utilizzando Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Letture consigliate {#further-reading}

- [Una guida approfondita ai test dei contratti intelligenti di Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Come testare i contratti intelligenti di Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Guida ai test unitari di MolochDAO per sviluppatori](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Come testare i contratti intelligenti come una rockstar](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
