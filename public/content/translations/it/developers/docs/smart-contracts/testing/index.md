---
title: Testare i contratti intelligenti
description: Una panoramica delle tecniche e considerazioni per testare i contratti intelligenti di Ethereum.
lang: it
---

Le blockchain pubbliche come Ethereum sono immutabili, il che rende difficile modificare il codice di un contratto intelligente dopo la sua distribuzione. Esistono [modelli di aggiornamento dei contratti](/developers/docs/smart-contracts/upgrading/) per eseguire "aggiornamenti virtuali", ma sono difficili da implementare e richiedono il consenso sociale. Inoltre, un aggiornamento può risolvere un errore solo _dopo_ che è stato scoperto; se un utente malintenzionato scopre per primo la vulnerabilità, il tuo contratto intelligente rischia di essere sfruttato.

Per questi motivi, testare i contratti intelligenti prima di [distribuirli](/developers/docs/smart-contracts/deploying/) sulla Rete Principale è un requisito minimo per la [sicurezza](/developers/docs/smart-contracts/security/). Esistono molte tecniche per testare i contratti e valutare la correttezza del codice; ciò che scegli dipende dalle tue esigenze. Tuttavia, una suite di test composta da strumenti e approcci differenti è ideale per individuare le falle di sicurezza sia minori che maggiori nel codice dei contratti.

## Prerequisiti {#prerequisites}

Questa pagina spiega come testare i contratti intelligenti prima della distribuzione sulla rete di Ethereum. Si presuppone che tu abbia familiarità con i [contratti intelligenti](/developers/docs/smart-contracts/).

## In cosa consistono i test dei contratti intelligenti? In cosa consistono i test dei contratti intelligenti? {#what-is-smart-contract-testing}

I test dei contratti intelligenti sono il procedimento per verificare che il codice di un contratto intelligente funzioni come previsto. I test sono utili per verificare se uno specifico contratto intelligente soddisfa i requisiti di affidabilità, utilizzabilità e sicurezza.

Sebbene gli approcci possano variare, gran parte dei metodi di test richiedono l'esecuzione di un contratto intelligente con un piccolo campione dei dati che si prevede dovrà gestire. Se il contratto produce risultati corretti per i dati del campione, si presume che funzioni correttamente. La maggior parte degli strumenti di test fornisce risorse per scrivere ed eseguire [casi di test](https://en.m.wikipedia.org/wiki/Test_case) per verificare se l'esecuzione di un contratto corrisponde ai risultati attesi.

### Perché è importante testare i contratti intelligenti? Importanza di testare i contratti intelligenti {#importance-of-testing-smart-contracts}

Poiché i contratti intelligenti gestiscono spesso risorse finanziarie di alto valore, errori di programmazione minori possono causare, e spesso lo fanno, [enormi perdite per gli utenti](https://rekt.news/leaderboard/). Test rigorosi possono, tuttavia, aiutarti a scoprire i difetti e i problemi nel codice di un contratto intelligente in anticipo, e correggerli prima del lancio sulla Rete Principale.

Sebbene sia possibile aggiornare un contratto se viene scoperto un bug, gli aggiornamenti sono complessi e possono [risultare in errori](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) se gestiti in modo improprio. L'aggiornamento di un contratto nega ulteriormente il principio di immutabilità, gravando sugli utenti con ulteriori ipotesi di fiducia. Viceversa, un piano completo per testare il tuo contratto mitiga i rischi di sicurezza del contratto intelligente, riducendo l'esigenza di eseguire complessi aggiornamenti alla logica dopo la distribuzione.

## Metodi per testare i contratti intelligenti {#methods-for-testing-smart-contracts}

I metodi per testare i contratti intelligenti di Ethereum rientrano in due ampie categorie: **test automatizzati** e **test manuali**. I test automatizzati e manuali offrono vantaggi e compromessi unici, ma puoi combinarli per creare un piano robusto di analisi dei tuoi contratti.

### Test automatizzati {#automated-testing}

I test automatizzati utilizzano strumenti che controllano automaticamente il codice di un contratto intelligente alla ricerca di errori durante l'esecuzione. Il vantaggio dei test automatizzati deriva dall'utilizzo di [script](https://www.techtarget.com/whatis/definition/script?amp=1) per guidare la valutazione delle funzionalità del contratto. I test basati su script sono pianificabili per essere eseguiti ripetutamente con un minimo intervento umano, rendendoli più efficienti degli approcci manuali al test.

I test automatizzati sono particolarmente utili quando sono ripetitivi e richiedono tempo, difficili da svolgere manualmente, suscettibili all'errore umano, o coinvolgono la valutazione delle funzioni critiche del contratto. Ma gli strumenti di test automatizzati possono comportare svantaggi: potrebbero non identificare certi bug e produrre molti [falsi positivi](https://www.contrastsecurity.com/glossary/false-positive). Dunque, associare ai test automatizzati dei test manuali per i contratti intelligenti è ideale.

### Test manuali {#manual-testing}

I test manuali sono assistiti dall'uomo e comportano l'esecuzione di ogni caso di prova nella tua suite di test, l'uno dopo l'altro, analizzando la correttezza di un contratto intelligente. Questo si distingue dai test automatizzati, in cui puoi eseguire simultaneamente diversi test isolati su un contratto e ottenere un report che mostri tutti i test falliti e superati.

I test manuali sono eseguibili da un singolo individuo che segue un piano testuale scritto che copre diversi scenari di test. Inoltre, come parte dei test manuali potresti far interagire diversi individui o gruppi con un contratto intelligente durante un periodo specificato. I collaudatori confronteranno il comportamento effettivo del contratto con quello previsto, segnalando qualsiasi differenza come un bug.

I test manuali efficaci richiedono considerevoli risorse (abilità, tempo, denaro e sforzo) ed è possibile, a causa di errori umani, non identificare certi errori eseguendo i test. Ma i test manuali possono anche essere vantaggiosi, ad esempio un collaudatore umano (es. un revisore) potrebbe utilizzare l'intuito per rilevare i casi limite che non sarebbero identificati da uno strumento di test automatizzato.

## Test automatizzati per contratti intelligenti {#automated-testing-for-smart-contracts}

### Test unitari {#unit-testing-for-smart-contracts}

Il test unitario valuta le funzioni del contratto separatamente, verificando che ogni componente funzioni correttamente. Dei buoni test unitari dovrebbero essere semplici, rapidi da eseguire e fornire un'idea chiara di cosa sia andato storto, qualora dovessero fallire.

I test unitari sono utili per verificare che le funzioni restituiscano i valori previsti e che l'archiviazione del contratto sia aggiornata correttamente dopo l'esecuzione della funzione. Inoltre, l'esecuzione dei test unitari dopo aver apportato modifiche alla base di codice dei contratti assicura che l'aggiunta di nuova logica non introduca errori. Seguono alcune linee guida per effettuare test unitari efficienti:

#### Linee guida per i test unitari dei contratti intelligenti {#unit-testing-guidelines}

##### 1. Comprendere la logica e il flusso di lavoro dei contratti

Prima di scrivere i test unitari, è utile conoscere quali funzionalità sono offerte da un contratto intelligente, nonché come gli utenti accederanno a tali funzioni e le utilizzeranno. Ciò è particolarmente utile per eseguire [test del percorso felice](https://en.m.wikipedia.org/wiki/Happy_path) che determinano se le funzioni di un contratto restituiscono l'output corretto per input utente validi. Spiegheremo questo concetto usando questo esempio (abbreviato) di [un contratto d'asta](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

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

Questo è un semplice contratto d'asta, progettato per ricevere offerte durante il periodo d'offerta. Se `highestBid` aumenta, il precedente offerente più alto riceve il suo denaro; una volta terminato il periodo di offerta, il `beneficiary` chiama il contratto per ottenere il suo denaro.

I test unitari per un contratto simile coprirebbero diverse funzioni che un utente potrebbe chiamare quando interagisce con esso. Un esempio sarebbe un test unitario che controlli se un utente può presentare un'offerta mentre l'asta è in corso (cioè, le chiamate a `bid()` hanno esito positivo) o uno che controlli se un utente può presentare un'offerta maggiore dell'attuale `highestBid`.

Comprendere il flusso di lavoro operativo di un contratto aiuta anche a scrivere test unitari che verificano se l'esecuzione soddisfa i requisiti. Ad esempio, il contratto d'asta specifica che gli utenti non possono presentare offerte al termine dell'asta (cioè quando `auctionEndTime` è inferiore a `block.timestamp`). Pertanto, uno sviluppatore potrebbe eseguire un test unitario che verifichi se le chiamate alla funzione `bid()` abbiano esito positivo o negativo quando l'asta è terminata (cioè, quando `auctionEndTime` > `block.timestamp`).

##### 2. Valutare tutte le ipotesi legate all'esecuzione del contratto

È importante documentare qualsiasi ipotesi sull'esecuzione di un contratto e scrivere test unitari per verificare la validità di tali ipotesi. Oltre a offrire protezione dall'esecuzione imprevista, testare le asserzioni impone di pensare alle operazioni che potrebbero infrangere il modello di sicurezza di un contratto intelligente. Un suggerimento utile è andare oltre i "test utente felice" e scrivere test negativi che verifichino se una funzione fallisce per gli input errati.

Molti quadri di test unitari ti consentono di creare asserzioni – semplici dichiarazioni che dichiarano ciò che un contratto può e non può fare – ed eseguire test per verificare se tali asserzioni sono rispettate durante l'esecuzione. Uno sviluppatore che lavora al contratto d'asta descritto in precedenza potrebbe fare le seguenti asserzioni sul suo comportamento prima di seguire dei test negativi:

- Gli utenti non possono presentare offerte quando l'asta è terminata o quando non è iniziata.

- Il contratto d'asta viene annullato se un'offerta è inferiore alla soglia accettabile.

- Agli utenti che non vincono l'asta vengono accreditati i propri fondi

**Nota**: un altro modo per testare le ipotesi è scrivere test che attivino i [modificatori di funzione](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) in un contratto, in particolare le istruzioni `require`, `assert` e `if…else`.

##### 3. Misurare la copertura del codice

[La copertura del codice](https://en.m.wikipedia.org/wiki/Code_coverage) è una metrica di test che tiene traccia del numero di rami, righe e istruzioni nel codice eseguiti durante i test. I test dovrebbero avere una buona code coverage per ridurre al minimo il rischio di vulnerabilità non testate. Senza una code coverage sufficiente potresti dare erroneamente per scontato che il tuo contratto sia sicuro; pur superando tutti i test, infatti, potrebbero comunque esistere vulnerabilità in percorsi di codice non testati. Registrare un'elevata copertura del codice, tuttavia, garantisce che tutte le dichiarazioni/funzioni di un contratto intelligente siano state testate sufficientemente per verificarne la correttezza.

##### 4. Utilizzare quadri di test ben sviluppati

La qualità degli strumenti utilizzati nell'esecuzione dei test unitari per i tuoi contratti intelligenti è fondamentale. Un quadro di test ideale è mantenuto regolarmente, fornisce funzionalità utili (es. capacità di registrazione e segnalazione) e deve essere utilizzato e controllato ampiamente da altri sviluppatori.

I quadri di test unitari per i contratti intelligenti in Solidity esistono in diversi linguaggi (principalmente JavaScript, Python e Rust). Vedi alcune delle guide seguenti per informazioni su come iniziare a eseguire test unitari con diversi quadri di test:

- **[Esecuzione di test unitari con Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Esecuzione di test unitari con Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Esecuzione di test unitari con Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Esecuzione di test unitari con Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Esecuzione di test unitari con Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Esecuzione di test unitari con Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Esecuzione di test unitari con Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Test di integrazione {#integration-testing-for-smart-contracts}

Mentre i test unitari eseguono il debug delle funzioni del contratto in isolamento, i test d'integrazione valutano i componenti di un contratto intelligente nella sua interezza. I test d'integrazione possono rilevare i problemi che sorgono da chiamate tra contratti o da interazioni tra funzioni differenti nello stesso contratto intelligente. Ad esempio, i test di integrazione possono aiutare a verificare se elementi come l'[ereditarietà](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) e l'iniezione di dipendenza funzionano correttamente.

Il test di integrazione è utile se il contratto adotta un'architettura modulare o interagisce con altri contratti on-chain durante l'esecuzione. Un modo per eseguire i test di integrazione è [eseguire una biforcazione della blockchain](/glossary/#fork) a un'altezza specifica (usando uno strumento come [Forge](https://book.getfoundry.sh/forge/fork-testing) o [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) e simulare le interazioni tra il tuo contratto e i contratti già distribuiti.

La blockchain diramata si comporterà in modo simile alla Rete Principale e avrà conti con stati e saldi associati. Ma agisce soltanto come un ambiente di sviluppo locale in modalità sandbox, a significare che non avrai bisogno di ETH reali per le transazioni, ad esempio, né le tue modifiche influenzeranno il protocollo reale di Ethereum.

### Test basati sulle proprietà {#property-based-testing-for-smart-contracts}

I test basati sulle proprietà sono il procedimento di verifica che un contratto intelligente soddisfi una data proprietà definita. Le proprietà asseriscono fatti sul comportamento di un contratto che si prevede restino veri in diversi scenari: un esempio di proprietà di un contratto intelligente potrebbe essere che "Le operazioni aritmetiche nel contratto non hanno mai sovrafflussi o sottoeccedenze."

**L'analisi statica** e l'**analisi dinamica** sono due tecniche comuni per l'esecuzione di test basati sulle proprietà, ed entrambe possono verificare che il codice di un programma (un contratto intelligente in questo caso) soddisfi alcune proprietà predefinite. Alcuni strumenti di test basati sulle proprietà comprendono delle regole predefinite sulle proprietà previste del contratto e verificano il codice rispetto a tali regole; altri ti consentono di creare proprietà personalizzate per un contratto intelligente.

#### Analisi statica {#static-analysis}

Un analizzatore statico prende come input il codice sorgente di un contratto intelligente e produce dei risultati che dichiarano se un contratto soddisfa o meno una proprietà. A differenza dell'analisi dinamica, l'analisi statica non coinvolge l'esecuzione di un contratto per analizzarne la correttezza. L'analisi statica, invece, ragiona su tutti i possibili percorsi che un contratto intelligente potrebbe intraprendere durante l'esecuzione (esaminando la struttura del codice sorgente per determinare cosa significherebbe per il funzionamento dei contratti all'esecuzione).

[Il linting](https://www.perforce.com/blog/qac/what-is-linting) e il [test statico](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) sono metodi comuni per eseguire l'analisi statica sui contratti. Entrambi richiedono l'analisi di rappresentazioni a basso livello dell'esecuzione di un contratto, come gli [alberi di sintassi astratta](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) e i [grafi del flusso di controllo](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) generati dal compilatore.

In gran parte dei casi, l'analisi statica è utile per rilevare problemi di sicurezza come l'uso di costrutti non sicuri, errori di sintassi o violazioni degli standard di scrittura nel codice di un contratto. Tuttavia, gli analizzatori statici sono noti come generalmente instabili nel rilevare le vulnerabilità più profonde e potrebbero produrre un eccesso di falsi positivi.

#### Analisi dinamica {#dynamic-analysis}

L'analisi dinamica genera input simbolici (ad es. nell'[esecuzione simbolica](https://en.m.wikipedia.org/wiki/Symbolic_execution)) o input concreti (ad es. nel [fuzzing](https://owasp.org/www-community/Fuzzing)) per le funzioni di un contratto intelligente per vedere se qualche traccia di esecuzione viola proprietà specifiche. Questa forma di test basato sulle proprietà differisce dai test unitari nel fatto che i casi di prova coprono diversi scenari e che un programma gestisce la generazione dei casi di prova.

[Il fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) è un esempio di tecnica di analisi dinamica per la verifica di proprietà arbitrarie nei contratti intelligenti. Un fuzzer invoca le funzioni in un contratto in questione con varianti casuali o malformate di un valore di input definito. Se il contratto intelligente entra in uno stato di errore (es., uno in cui un'asserzione fallisce), il problema è segnalato e gli input che guidano l'esecuzione verso il percorso vulnerabile sono prodotti in un report.

Il fuzzing è utile per valutare il meccanismo di validazione dell'input di un contratto intelligente, poiché la gestione inappropriata degli input imprevisti potrebbe risultare in un'esecuzione indesiderata, producendo effetti pericolosi. Questa forma di test basati sulle proprietà può essere ideale per molti motivi:

1. **Scrivere i casi di prova per coprire molti scenari è difficile.** Un test delle proprietà ti richiede soltanto di definire un comportamento e un intervallo di dati con cui testare il comportamento; sarà il programma a generare automaticamente i casi di prova secondo la proprietà definita.

2. \*\*La tua suite di test potrebbe non coprire a sufficienza tutti i percorsi possibili nel programma. Anche con una copertura del 100%, è possibile perdere alcuni casi limite.

3. \*\*I test unitari provano che un contratto si esegue correttamente per i dati campione, ma se il contratto si esegua correttamente per gli input esterni al campione resta ignoto. I test delle proprietà eseguono il contratto in questione con molte varianti di un dato valore di input per trovare le tracce d'esecuzione che causano gli errori dell'asserzione. Dunque, un test delle proprietà fornisce maggiori garanzie che un contratto sia eseguito correttamente per un'ampia classe di dati di input.

### Linee guida per l'esecuzione di test basati sulle proprietà per i contratti intelligenti {#running-property-based-tests}

L'esecuzione di test basati sulle proprietà inizia tipicamente con la definizione di una proprietà (ad esempio, l'assenza di [overflow di interi](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) o di una raccolta di proprietà che si desidera verificare in un contratto intelligente. Inoltre, durante la scrittura dei test delle proprietà potresti dover definire un intervallo di valori entro cui il programma possa generare i dati per gli input della transazione.

Una volta configurato adeguatamente, lo strumento di test delle proprietà eseguirà le funzioni dei tuoi contratti intelligenti con input generati casualmente. Se si verifica una violazione delle asserzioni, dovresti ottenere un report con i dati di input concreti che violano la proprietà valutata. Vedi alcune delle seguenti linee guida per iniziare a eseguire test basati sulle proprietà con diversi strumenti:

- **[Analisi statica di contratti intelligenti con Slither](https://github.com/crytic/slither)**
- **[Analisi statica di contratti intelligenti con Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Test basati sulle proprietà con Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing di contratti con Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing di contratti con Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing di contratti con Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Esecuzione simbolica di contratti intelligenti con Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Esecuzione simbolica di contratti intelligenti con Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Test manuali per i contratti intelligenti {#manual-testing-for-smart-contracts}

I test manuali dei contratti intelligenti sono spesso effettuati più avanti nel ciclo di sviluppo, dopo aver eseguito i test automatizzati. Questa forma di test valuta il contratto intelligente come un prodotto pienamente integrato per scoprire se opera come specificato nei requisiti tecnici.

### Testare i contratti su una blockchain locale {#testing-on-local-blockchain}

Mentre i test automatizzati eseguiti in un ambiente di sviluppo locale possono fornire utili informazioni di debug, vorrai sapere come il tuo contratto intelligente si comporta in un ambiente di produzione. Tuttavia, distribuire alla catena principale di Ethereum comporta delle commissioni sul carburante, per non menzionare che tu o i tuoi utenti potreste perdere denaro reale se il contratto intelligente dovesse ancora contenere dei bug.

Testare il tuo contratto su una blockchain locale (nota anche come [rete di sviluppo](/developers/docs/development-networks/)) è un'alternativa consigliata al test sulla Rete Principale. Una blockchain locale è una copia della blockchain di Ethereum eseguita localmente sul tuo computer che simula il comportamento del livello di esecuzione di Ethereum. Come tale, puoi programmare le transazioni affinché interagiscano con un contratto senza incorrere in significativi costi di gestione.

Eseguire i contratti su una blockchain locale potrebbe essere utile come forma di test d'integrazione manuale. [I contratti intelligenti sono altamente componibili](/developers/docs/smart-contracts/composability/), e consentono di integrarsi con i protocolli esistenti, ma sarà comunque necessario assicurarsi che tali complesse interazioni on-chain producano i risultati corretti.

[Altre informazioni sulle reti di sviluppo.](/developers/docs/development-networks/)

### Testare i contratti sulle reti di test {#testing-contracts-on-testnets}

Una rete di prova funziona esattamente come la Rete Principale di Ethereum, tranne per il fatto che utilizza degli ether (ETH) privi di valore reale. La distribuzione del tuo contratto su una [rete di test](/developers/docs/networks/#ethereum-testnets) significa che chiunque può interagire con esso (ad esempio, tramite il frontend della dApp) senza mettere a rischio i fondi.

Questa forma di test manuale è utile per valutare il flusso end-to-end della tua applicazione dal punto di vista di un utente. Inoltre, qui i beta tester possono eseguire prove e segnalare qualsiasi problema con la logica aziendale del contratto e le sue funzionalità complessive.

Distribuire su una rete di prova dopo il test su una blockchain locale è ideale, poiché la prima è più simile al comportamento della Macchina Virtuale di Ethereum. Pertanto, è comune per molti progetti nativi di Ethereum distribuire le dapp sulle reti di prova per valutare il funzionamento dei contratti intelligenti in condizioni reali.

[Altre informazioni sulle reti di test di Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Test e verifica formale a confronto {#testing-vs-formal-verification}

Sebbene i test aiutino a confermare che un contratto restituisce i risultati previsti per alcuni input di dati, non può provare in via conclusiva lo stesso per gli input non usati durante i test. Testare un contratto intelligente, pertanto, non può garantire la "correttezza funzionale" (cioè, non può dimostrare che un programma si comporti come richiesto per _tutti_ i set di valori di input).

La verifica formale è un approccio di valutazione della correttezza del software tramite la verifica del fatto che un modello formale del programma corrisponda alla specifica formale. Un modello formale è una rappresentazione matematica astratta di un programma, mentre una specifica formale definisce le proprietà di un programma (ossia le asserzioni logiche sull'esecuzione del programma).

Poiché le proprietà sono scritte in termini matematici, diventa possibile verificare che un modello (matematico) formale del sistema soddisfi una specifica utilizzando le regole logiche di inferenza. Dunque, si dice che gli strumenti di verifica formale producano una 'prova matematica' della correttezza di un sistema.

A differenza dei test, la verifica formale può essere utilizzata per verificare che l'esecuzione di un contratto intelligente soddisfi una specifica formale per _tutte_ le esecuzioni (cioè che non abbia bug) senza la necessità di eseguirlo con dati di esempio. Questo non solo riduce il tempo trascorso a eseguire decine di test unitari, ma è anche più efficiente nel trovare le vulnerabilità nascoste. Detto ciò, le tecniche di verifica formale si trovano su uno spettro che dipende dalla loro difficoltà di implementazione e utilità.

[Altre informazioni sulla verifica formale per i contratti intelligenti.](/developers/docs/smart-contracts/formal-verification)

## Test, audit e bug bounty a confronto {#testing-vs-audits-bug-bounties}

Come accennato, raramente i test rigorosi possono garantire l'assenza di bug in un contratto; gli approcci di verifica formale possono fornire maggiori garanzie di correttezza ma al momento sono difficili da utilizzare e incorrono in considerevoli costi.

Tuttavia, puoi aumentare maggiormente la possibilità di identificare le vulnerabilità del contratto aggiungendo una revisione indipendente del codice. [Gli audit di contratti intelligenti](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) e i [bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) sono due modi per far analizzare i tuoi contratti da altri.

I controlli sono eseguiti da revisori esperti nel trovare i casi di falle di sicurezza e pratiche di sviluppo inadeguate nei contratti intelligenti. Un controllo, solitamente, includerà test (e verosimilmente una verifica formale), nonché una revisione manuale dell'intera base di codice.

Viceversa, un programma di bug bounty di solito prevede l'offerta di una ricompensa finanziaria a un individuo (comunemente descritto come [hacker white-hat](https://en.wikipedia.org/wiki/White_hat_\(computer_security\))) che scopre una vulnerabilità in un contratto intelligente e la rivela agli sviluppatori. Le bug bounty sono simili ai controlli poiché comportano di chiedere ad altri di aiutare a trovare difetti nei contratti intelligenti.

La differenza principale è che i programmi di bug bounty sono aperti alla più ampia community di sviluppatori/hacker e attrae un'ampia classe di hacker etici e professionisti della sicurezza indipendenti dotati di competenze uniche ed esperienza. Questo potrebbe essere un vantaggio rispetto ai controlli del contratto intelligente che si affidano principalmente ai team che potrebbero possedere esperienza limitata o minima.

## Strumenti e librerie di test {#testing-tools-and-libraries}

### Strumenti di test unitario {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Strumento di copertura del codice per contratti intelligenti scritti in Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Framework per lo sviluppo e il test avanzato di contratti intelligenti (basato su ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Strumento per il test di contratti intelligenti in Solidity._ Opera sotto il plugin "Solidity Unit Testing" di Remix IDE, usato per scrivere ed eseguire casi di prova per un contratto._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Libreria di asserzioni per il test di contratti intelligenti Ethereum._ Assicurati che i tuoi contratti si comportino come previsto!_

- **[Framework di test unitari di Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie utilizza Pytest, un framework di test ricco di funzionalità che consente di scrivere piccoli test con codice minimo, si adatta bene a progetti di grandi dimensioni ed è altamente estensibile._

- **[Test di Foundry](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry offre Forge, un framework di test per Ethereum veloce e flessibile in grado di eseguire semplici test unitari, controlli di ottimizzazione del gas e fuzzing dei contratti._

- **[Test di Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Framework per il test di contratti intelligenti basato su ethers.js, Mocha e Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Framework di sviluppo e test basato su Python per contratti intelligenti destinati alla Macchina Virtuale di Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Framework basato su Python per test unitari e fuzzing con potenti funzionalità di debug e supporto per test cross-chain, che utilizza pytest e Anvil per la migliore esperienza utente e le migliori prestazioni._

### Strumenti di test basati sulle proprietà {#property-based-testing-tools}

#### Strumenti di analisi statica {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Framework di analisi statica di Solidity basato su Python per trovare vulnerabilità, migliorare la comprensione del codice e scrivere analisi personalizzate per i contratti intelligenti._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter per l'applicazione delle migliori pratiche di stile e sicurezza per il linguaggio di programmazione di contratti intelligenti Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Analizzatore statico basato su Rust progettato specificamente per la sicurezza e lo sviluppo di contratti intelligenti Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Framework di analisi statica basato su Python con rilevatori di vulnerabilità e di qualità del codice, printer per estrarre informazioni utili dal codice e supporto per la scrittura di sottomoduli personalizzati._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Un linter semplice e potente per Solidity._

#### Strumenti di analisi dinamica {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer di contratti veloce per rilevare vulnerabilità nei contratti intelligenti attraverso test basati sulle proprietà._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Strumento di fuzzing automatizzato utile per rilevare violazioni di proprietà nel codice dei contratti intelligenti._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Framework di esecuzione simbolica dinamica per l'analisi del bytecode EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Strumento di valutazione del bytecode EVM per rilevare le vulnerabilità dei contratti utilizzando l'analisi taint, l'analisi concolica e il controllo del flusso di controllo._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble è un linguaggio di specifica e uno strumento di verifica a runtime che consente di annotare i contratti intelligenti con proprietà che permettono di testare automaticamente i contratti con strumenti come Diligence Fuzzing o MythX._

## Guide correlate {#related-tutorials}

- [Una panoramica e un confronto di diversi prodotti di test](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Come usare Echidna per testare i contratti intelligenti](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Come usare Manticore per trovare bug nei contratti intelligenti](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Come usare Slither per trovare bug nei contratti intelligenti](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Come simulare (mock) i contratti Solidity per i test](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Come eseguire test unitari in Solidity usando Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Letture consigliate {#further-reading}

- [Una guida approfondita al test dei contratti intelligenti di Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Come testare i contratti intelligenti di Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [La guida ai test unitari di MolochDAO per sviluppatori](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Come testare i contratti intelligenti come una rockstar](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
