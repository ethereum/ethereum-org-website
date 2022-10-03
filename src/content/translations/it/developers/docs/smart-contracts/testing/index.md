---
title: Test degli smart contract
description: Una panoramica delle tecniche e delle considerazioni per testare gli smart contract di Ethereum
lang: it
---

Testare gli [smart contract](/developers/docs/smart-contracts/) è una delle misure più importanti per migliorarne la [sicurezza](/developers/docs/smart-contracts/security/). A differenza dei software tradizionali, in genere gli smart contract non possono essere aggiornati dopo il lancio, il che rende imperativo testarli rigorosamente prima di distribuirli sulla rete di Ethereum.

## Cosa significa testare gli smart contract? {#what-is-smart-contract-testing}

Con testare gli smart contract si intende l'esecuzione di analisi e valutazioni dettagliate per valutare la qualità del codice sorgente durante il ciclo di sviluppo. Testare uno smart contract semplifica l'identificazione di bug e vulnerabilità e riduce la possibilità di errori software che potrebbero portare a costosi exploit.

Il test degli smart contract assume molte forme, con metodi differenti che offrono una serie di vantaggi. Le strategie per testare gli smart contract di Ethereum sono classificabili in due ampie categorie: **test automatizzati** e **test manuali**.

### Test automatizzati {#automated-testing}

I test automatizzati comportano l'uso di strumenti automatizzati per svolgere test scriptati degli smart contract. Questa tecnica si affida a software automatizzati che possono eseguire ripetuti test per individuare eventuali difetti negli smart contract.

I test automatizzati sono efficienti, usano meno risorse e offrono livelli di copertura superiori alle analisi manuali. Gli strumenti di test automatizzati sono anche configurabili coi dati dei test, il che consente di confrontare i comportamenti previsti con i risultati effettivi.

### Test manuali {#manual-testing}

I test manuali sono assistiti dall'uomo e implicano la presenza di un individuo che esegue manualmente i passaggi dei test. I controlli del codice, in cui sviluppatori e/o revisori analizzano ogni singola riga del codice del contratto, sono un esempio di test manuale per gli smart contract.

Il test manuale degli smart contract richiede notevoli abilità e un investimento considerevole di tempo, denaro e sforzo. Inoltre, a volte i test manuali possono essere soggetti a problemi derivati dall'errore umano.

Tuttavia, applicare il test manuale agli smart contract può anche esser vantaggioso. I controlli del codice sfruttano l'intelligenza umana per individuare difetti nel codice del contratto che potrebbero passare inosservati durante i test automatizzati.

Testare manualmente i propri smart contract permette anche di rivelare vulnerabilità esistenti al di fuori del codice, ma che possono comunque influenzarlo. Ad esempio, il controllo di uno smart contract può fare emergere vulnerabilità derivanti dall'interazione difettosa con i componenti al di fuori della catena.

## Perché è importante testare gli smart contract? {#benefits-of-smart-contract-testing}

Testare gli smart contract è importante per i seguenti motivi:

### 1. Gli smart contract sono applicazioni dal valore elevato {#smart-contracts-are-high-value-applications}

Gli smart contract hanno spesso a che fare con risorse finanziarie dal valore elevato, specialmente in settori come la [finanza decentralizzata (DeFi)](/defi/), ed oggetti di valore, come i [token non fungibili (NFT)](/nft/). Come tali, le vulnerabilità minori negli smart contract possono tradursi e spesso si traducono in perdite enormi e irrecuperabili per gli utenti. Effettuando test completi, tuttavia, è possibile esporre errori nel codice degli smart contract e ridurre i rischi di sicurezza prima della distribuzione.

### 2. Gli smart contract sono immutabili {#smart-contracts-are-immutable}

Gli smart contract distribuiti nella [Macchina Virtuale di Ethereum (EVM)](/developers/docs/evm/) sono immutabili di default. Mentre gli sviluppatori tradizionali potrebbero essere abituati a risolvere i bug del software dopo il lancio, lo sviluppo di Ethereum lascia poco spazio alla risoluzione delle falle di sicurezza una volta che uno smart contract è attivo sulla blockchain.

Benché esistano meccanismi di aggiornabilità per gli smart contract, come gli schemi del proxy, possono essere difficili da implementare. Oltre a ridurre l'immutabilità e introdurre complessità, spesso gli aggiornamenti richiedono complessi processi di governance.

In gran parte, gli aggiornamenti dovrebbero essere considerati come l'ultima spiaggia ed evitati, se non necessari. Rilevare potenziali vulnerabilità e difetti nel proprio smart contract durante la fase pre-lancio riduce il bisogno di aggiornamenti logici.

## Test automatizzati per gli smart contract {#automated-testing-for-smart-contracts}

### 1. Test funzionali {#functional-testing}

I test funzionali verificano la funzionalità di uno smart contract e garantiscono che ogni funzione nel codice funzioni come previsto. I test funzionali richiedono la comprensione di come lo smart contract dovrebbe comportarsi in determinate condizioni. Quindi, è possibile testare ogni funzione eseguendo calcoli con i valori selezionati e confrontando i risultati ottenuti con quelli previsti.

I test funzionali coprono tre metodi: **test unitario**, **test d'integrazione** e **test di sistema**.

#### Test unitario

Il test dell'unità comporta il test della correttezza dei singoli componenti in uno smart contract. Un test unitario è semplice, rapido da eseguire e fornisce un'idea chiara di cosa è andato storto se il test fallisce.

I testi unitari sono fondamentali per lo sviluppo degli smart contract, specialmente se occorre aggiungere nuova logica al codice. Puoi verificare il comportamento di ogni funzione e confermare che venga eseguito come desiderato.

Eseguire un test unitario spesso richiede la creazione di _asserzioni_, semplici dichiarazioni informali che specificano i requisiti di uno smart contract. Il test unitario è poi utilizzabile per testare ogni asserazione e verificare se resta vera durante l'esecuzione.

Esempi di asserzioni correlate al contratto includono:

i. "Solo l'admin può interrompere il contratto"

ii. "I non admin non possono coniare nuovi token"

iii. "Il contratto si ripristina in caso di errore"

#### Test d'integrazione

Il test d'integrazione è di un livello superiore rispetto al test unitario sulla gerarchia dei test. Nel test d'integrazione, i singoli componenti dello smart contract vengono testati insieme.

Questo approccio rileva gli errori derivanti dalle interazioni tra i diversi componenti di un contratto o tra diversi contratti. Dovresti usare questo metodo se hai un contratto complesso con numerose funzioni o con una funzione che si interfaccia con altri contratti.

Il test d'integrazione può essere utile per assicurarsi che aspetti come l'[eredità](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) e l'iniezione di dipendenza funzionino correttamente.

#### Test di sistema

I test di sistema sono la fase finale del test funzionale per gli smart contract. Un sistema valuta lo smart contract come un prodotto completamente integrato per vedere se performa come specificato nei requisiti tecnici.

Puoi pensare a questa fase come al controllo del flusso end-to-end del tuo smart contract dal punto di vista di un utente. Un modo efficace per eseguire i test di sistema su uno smart contract consiste nel distribuirli su un ambiente simile a quello di produzione, come una [rete di prova](/developers/docs/networks/#ethereum-testnets) o una [rete di sviluppo](/developers/docs/development-networks/).

Qui gli utenti finali possono eseguire prove e segnalare eventuali problemi con la logica aziendale del contratto e le funzionalità generali. Il test di sistema è importante perché non è possibile cambiare il codice una volta distribuito il contratto nell'ambiente dell'EVM principale.

### 2. Analisi statica/dinamica {#static-dynamic-analysis}

L'analisi statica e l'analisi dinamica sono due metodi di test automatizzati per valutare le qualità di sicurezza degli smart contract. Entrambe le tecniche, tuttavia, usano approcci differenti per trovare difetti nel codice del contratto.

#### Analisi statica

L'analisi statica esamina il codice sorgente o il bytecode di uno smart contract prima dell'esecuzione. Questo significa che puoi eseguire il debug del codice del contratto senza eseguire effettivamente il programma. Gli analizzatori statici possono rilevare le vulnerabilità comuni negli smart contract e aiutare a conformarsi alle pratiche migliori.

#### Analisi dinamica

Le tecniche di analisi dinamica richiedono l'esecuzione dello smart contract in un ambiente di esecuzione per identificare i problemi a livello del codice. Gli analizzatori del codice dinamico osservano i comportamenti del contratto durante l'esecuzione e generano un rapporto dettagliato sulle vulnerabilità e violazioni di proprietà identificate.

Il fuzzing (test con dati casuali) è un esempio di una tecnica di analisi dinamica per testare i contratti. Durante i test di fuzzing, un fuzzer alimenta lo smart contract con dati malformati e non validi e monitora la reazione del contratto a tali input.

Come ogni programma, gli smart contract si affidano agli input forniti dagli utenti per eseguire funzioni. E, pur supponendo che gli utenti forniscano input corretti, potrebbe anche accadere il contrario.

In alcuni casi, inviare valori di input errati a uno smart contract può causare perdite di risorse, crash, o peggio condurre all'esecuzione di codice indesiderato. Le campagne di fuzzing identificano tali problemi in anticipo, consentendo di eliminare la vulnerabilità.

## Test manuale per gli smart contract {#manual-testing-for-smart-contracts}

### 1. Controlli del codice {#code-audits}

Un controllo del codice è una valutazione dettagliata del codice sorgente di uno smart contract per scoprire possibili punti di guasto, falle di sicurezza e pratiche di sviluppo deboli. Anche se i controlli del codice possono essere automatizzati, qui facciamo riferimento all'analisi del codice assistita dall'uomo.

I controlli del codice richiedono una mentalità da utente malevolo per mappare i possibili vettori di attacco negli smart contract. Anche eseguendo controlli automatizzati, l'analisi di ogni riga del codice sorgente è un requisito minimo per scrivere smart contract sicuri.

Puoi anche commissionare un controllo di sicurezza per dare agli utenti garanzie migliori sulla sicurezza dello smart contract. I controlli beneficiano dall'ampia analisi eseguita dai professionisti della cyber-sicurezza e rilevano le vulnerabilità potenziali o i bug che potrebbero danneggiare la funzionalità dello smart contract.

### 2. Caccia ai bug {#bug-bounties}

Una caccia ai bug è una ricompensa finanziaria data a un individuo che scopre una vulnerabilità o un bug nel codice di un programma e la segnala agli sviluppatori. Le cacce ai bug sono simili ai controlli poiché comportano di chiedere ad altri di aiutare a trovare difetti negli smart contract. La differenzza principale è che i programmi di caccia ai bug sono aperti alla più ampia community di sviluppatori/hacker.

I programmi di caccia ai bug attraggono spesso un'ampia classe di hacker etici e di professionisti della sicurezza indipendenti con abilità ed esperienza uniche. Questo potrebbe essere un vantaggio rispetto ai controlli sugli smart contract che si affidano principalmente a team che potrebbero possedere esperienze limitate o minime.

## Test vs. verifica formale {#testing-vs-formal-verification}

Sebbene i test aiutino a confermare che un contratto restituisce i risultati previsti per alcuni input di dati, non può provare in via conclusiva lo stesso per gli input non usati durante i test. Testare uno smart contract non può garantire la "correttezza funzionale", il che significa che non può mostrare che un programma si comporta come richiesto per _tutte_ le serie di valori e condizioni di input.

Come tali, gli sviluppatori sono incoraggiati a incorporare la **verifica formale** nel loro approccio a valutare la correttezza degli smart contract. La verifica formale usa [metodi formali](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/), tecniche matematicamente rigorose per specificare e verificare software.

La verifica formale è considerata importante per gli smart contract perché aiuta gli sviluppatori a testare formalmente le ipotesi correlate agli stessi. A tale scopo vengono create specifiche formali che descrivono le proprietà di uno smart contract e si verifica che un modello formale dello smart contract corrisponda alla specifica. Questo approccio aumenta la fiducia che uno smart contract eseguirà le funzioni solo come definito nella sua logica aziendale e in nessun altro caso.

[Maggiori informazioni sulla verifica formale per gli smart contract](/developers/docs/smart-contracts/formal-verification)

## Strumenti di test e librerie {#testing-tools-and-libraries}

### Strumenti per i test unitari {#unit-testing-tools}

**Solidity-Coverage** - _Strumento di copertura del codice di Solidity, utile per testare gli smart contract._

- [GitHub](https://github.com/sc-forks/solidity-coverage)

**Waffle** - _Quadro per lo sviluppo e l'esecuzione di test avanzati sugli smart contract (basato su ethers.js)_.

- [Documentazione](https://ethereum-waffle.readthedocs.io/en/latest/)
- [GitHub](https://github.com/TrueFiEng/Waffle)
- [Sito web](https://getwaffle.io/)

**Remix Tests** - _Strumento per testare gli smart contract di Solidity. Opera sotto il plugin "Solidity Unit Testing" di Remix IDE, usato per scrivere ed eseguire casi di prova per un contratto._

- [Documentazione](https://remix-ide.readthedocs.io/en/latest/unittesting.html)
- [GitHub](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)

**OpenZeppelin Test Helpers** - _Libreria di affermazione per testare gli smart contract di Ethereum. Assicurati che i tuoi contratti si comportino come previsto!_

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-test-helpers)
- [Documentazione](https://docs.openzeppelin.com/test-helpers)

**Quadro di test degli smart contract di Truffle** - _Quadro di test automatizzato per testare i tuoi contratti in un attimo._

- [Documenti](https://trufflesuite.com/docs/truffle/testing/testing-your-contracts/)
- [Sito Web](https://trufflesuite.com/)

**Quadro per i test unitari di Brownie** - _Brownie utilizza Pytest, un quadro di test ricco di funzioni che consente di scrivere piccoli test con codice minimo, facilmente scalabile per i grandi progetti ed è altamente estensibile._

- [Documentazione](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)
- [GitHub](https://github.com/eth-brownie/brownie)

**Test di Foundry** - _Foundry offre Forge, un quadro di prova di Ethereum veloce e flessibile, capace di eseguire semplici test unitari, controlli di ottimizzazione del gas e fuzzing del contratto._

- [GitHub](https://github.com/foundry-rs/foundry/tree/master/forge)
- [Documentazione](https://book.getfoundry.sh/forge/)

**Etheno** - _Strumento di test di Ethereum tutto in uno che comprende un multiplexer di JSON RPC, un contenitore di strumenti d'analisi e lo strumento di integrazione del test. Etheno elimina la complessità di configurare strumenti di analisi come Manticore ed Echidna sui grandi progetti multi-contrattuali._

- [GitHub](https://github.com/crytic/etheno)

### Strumenti di analisi statica {#static-analysis-tools}

**Mythril** - _Strumento di valutazione del bytecode dell'EVM per rilevare le vulnerabilità del contratto usando l'analisi a macchia, l'analisi concolica e la verifica del flusso di controllo._

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Documentazione](https://mythril-classic.readthedocs.io/en/master/about.html)

**Slither** - _Quadro di analisi statica di Solidity basato su Python per trovare vulnerabilità, migliorare la comprensione del codice e scrivere analisi personalizzate per gli smart contract._

- [GitHub](https://github.com/crytic/slither)

**Rattle** - _Quadro di analisi statica del bytecode dell'EVM progettato per operare sugli smart contract distribuiti._

- [GitHub](https://github.com/crytic/rattle)

### Strumenti di analisi dinamica {#dynamic-analysis-tools}

**Echidna** - _Fuzzer del contratto veloce, per rilevare le vulnerabilità negli smart contract tramite i test basati sulla proprietà._

- [GitHub](https://github.com/crytic/echidna/)

**Harvey** - _Strumento di fuzzing automatizzato utile per rilevare le violazioni di proprietà nel codice dello smart contract._

- [Sito web](https://consensys.net/diligence/fuzzing/)

**Manticore** - _Quadro di esecuzione simbolico dinamico per analizzare il bytecode dell'EVM._

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentazione](https://github.com/trailofbits/manticore/wiki)

### Servizi di controllo degli smart contract {#smart-contract-auditing-services}

**ConsenSys Diligence** - _Servizio di controllo degli smart contract che aiuta i progetti sull'ecosistema della blockchain ad assicurare che i loro protocolli siano pronti al lancio e creati per proteggere gli utenti._

- [Sito web](https://consensys.net/diligence/)

**CertiK** - _Studio di sicurezza della blockchain, pioniere nell'uso di tecnologie di verifica formali e all'avanguardia sugli smart contract e le reti della blockchain._

- [Sito web](https://www.certik.com/)

**Trail of Bits** - _Azienda di cybersicurezza che combina la ricerca sulla sicurezza con una mentalità da utente malevolo per ridurre i rischi e fortificare il codice._

- [Sito web](https://www.trailofbits.com/)

**PeckShield** - _Azienda di sicurezza della blockchain che offre prodotti e servizi per la sicurezza, privacy e utilizzabilità dell'intero ecosistema della blockchain._

- [Sito web](https://peckshield.com/)

**QuantStamp** - _Servizio di controllo che facilita l'adozione mainstream della tecnologia della blockchain tramite servizi di sicurezza e valutazione dei rischi._

- [Sito web](https://quantstamp.com/)

**OpenZeppelin** - _Azienda di sicurezza degli smart contract che fornisce controlli di sicurezza per i sistemi distribuiti._

- [Sito web](https://www.openzeppelin.com/security-audits)

### Piattaforme di caccia ai bug {#bug-bounty-platforms}

**Immunefi** - _Piattaforma di caccia ai bug per gli smart contract e i progetti di DeFi, in cui i ricercatori revisionano il codice, divulgano le vulnerabilità, vengono pagati e rendono le cripto più sicure._

- [Sito web](https://immunefi.com/)

**HackerOne** - _Piattaforma di coordinazione delle vulnerabilità e di caccia ai bug che connette le aziende ai tester di penetrazione e i ricercatori sulla cybersicurezza._

- [Sito web](https://www.hackerone.com/)

## Tutorial correlati {#related-tutorials}

- [Configurare l'integrazione continua in Solidity e Truffle](/developers/tutorials/solidity-and-truffle-continuous-integration-setup/) _– Come configurare Travis o Circle CI per il test Truffle con plug-in utili._
- [Panoramica dei prodotti per il test](/developers/tutorials/guide-to-smart-contract-security-tools/) _– Panoramica e confronto tra diversi prodotti per il test._
- [Come usare Echidna per testare gli smart contract](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Come utilizzare Manticore per individuare i bug negli smart contract](/developers/tutorials/how-to-use-manticor-to-find-smart-contract-bugs/)
- [Come utilizzare Slither per individuare i bug negli smart contract](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Come simulare i contratti in Solidity per testarli](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Come migrare dai test di Truffle all'ambiente di test di OpenZeppelin](https://docs.openzeppelin.com/test-environment/0.1/migrating-from-truffle)
- [Come testare i contratti dopo che sono stati distribuiti su una rete](https://fulldecent.blogspot.com/2019/04/testing-deployed-ethereum-contracts.html)
- [Impara sulla Blockchain, Solidity e lo sviluppo Full Stack in Web3 con JavaScript (YouTube)](https://www.youtube.com/watch?v=gyMwXuJrbJQ)
- [Corso su Solidity, la Blockchain e gli smart contract (YouTube)](https://www.youtube.com/watch?v=M576WGiDBdQ)

## Letture consigliate {#further-reading}

- [Una guida approfondita per testare gli smart contract di Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297) - _Ben Hauser_
- [Come testare gli smart contract di Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d) - _Alex Roan_
