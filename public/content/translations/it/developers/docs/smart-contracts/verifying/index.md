---
title: Verificare gli smart contract
description: Una panoramica sulla verifica del codice sorgente per gli smart contract di Ethereum
lang: it
---

Gli [smart contract](/developers/docs/smart-contracts/) sono progettati per essere "trustless", il che significa che gli utenti non dovrebbero doversi fidare di terze parti (ad es. sviluppatori e aziende) prima di interagire con un contratto. Come requisito per l'assenza di necessità di fiducia, gli utenti e gli altri sviluppatori devono essere in grado di verificare il codice sorgente di uno smart contract. La verifica del codice sorgente assicura agli utenti e agli sviluppatori che il codice del contratto pubblicato sia lo stesso codice in esecuzione all'indirizzo del contratto sulla blockchain di Ethereum.

È importante fare una distinzione tra "verifica del codice sorgente" e "[verifica formale](/developers/docs/smart-contracts/formal-verification/)". La verifica del codice sorgente, che verrà spiegata in dettaglio di seguito, si riferisce alla verifica che il codice sorgente fornito di uno smart contract in un linguaggio di alto livello (ad es. Solidity) venga compilato nello stesso bytecode da eseguire all'indirizzo del contratto. Tuttavia, la verifica formale descrive la verifica della correttezza di uno smart contract, il che significa che il contratto si comporta come previsto. Sebbene dipenda dal contesto, la verifica del contratto di solito si riferisce alla verifica del codice sorgente.

## Cos'è la verifica del codice sorgente? {#what-is-source-code-verification}

Prima di distribuire uno smart contract nella [Macchina Virtuale di Ethereum (EVM)](/developers/docs/evm/), gli sviluppatori [compilano](/developers/docs/smart-contracts/compiling/) il codice sorgente del contratto (istruzioni [scritte in Solidity](/developers/docs/smart-contracts/languages/) o in un altro linguaggio di programmazione di alto livello) in bytecode. Poiché la EVM non può interpretare istruzioni di alto livello, la compilazione del codice sorgente in bytecode (ovvero istruzioni macchina di basso livello) è necessaria per eseguire la logica del contratto nella EVM.

La verifica del codice sorgente consiste nel confrontare il codice sorgente di uno smart contract e il bytecode compilato utilizzato durante la creazione del contratto per rilevare eventuali differenze. Verificare gli smart contract è importante perché il codice del contratto pubblicizzato potrebbe essere diverso da quello in esecuzione sulla blockchain.

La verifica degli smart contract consente di indagare su cosa fa un contratto attraverso il linguaggio di livello superiore in cui è scritto, senza dover leggere il codice macchina. Le funzioni, i valori e di solito i nomi delle variabili e i commenti rimangono gli stessi del codice sorgente originale che viene compilato e distribuito. Questo rende la lettura del codice molto più semplice. La verifica del sorgente prevede anche la documentazione del codice, in modo che gli utenti finali sappiano per cosa è stato progettato uno smart contract.

### Cos'è una corrispondenza esatta? {#full-verification}

Ci sono alcune parti del codice sorgente che non influenzano il bytecode compilato, come i commenti o i nomi delle variabili. Ciò significa che due codici sorgente con nomi di variabili diversi e commenti diversi sarebbero entrambi in grado di verificare lo stesso contratto. Con questo, un attore malintenzionato può aggiungere commenti ingannevoli o dare nomi di variabili fuorvianti all'interno del codice sorgente e far verificare il contratto con un codice sorgente diverso da quello originale.

È possibile evitare ciò aggiungendo dati extra al bytecode che fungano da _garanzia crittografica_ per l'esattezza del codice sorgente e come _impronta digitale_ delle informazioni di compilazione. Le informazioni necessarie si trovano nei [metadati del contratto di Solidity](https://docs.soliditylang.org/en/latest/metadata.html) e l'hash di questo file viene aggiunto alla fine del bytecode del contratto. Puoi vederlo in azione nel [playground dei metadati](https://playground.sourcify.dev)

Il file dei metadati contiene informazioni sulla compilazione del contratto, incluse le impostazioni del compilatore e i nomi e gli hash dei file sorgente. Ciò significa che se una qualsiasi delle impostazioni di compilazione o anche un solo byte in uno dei file sorgente cambia, il file dei metadati cambia. Di conseguenza, cambia anche l'hash del file dei metadati, che è aggiunto al bytecode. Ciò significa che se il bytecode di un contratto + l'hash dei metadati aggiunto corrispondono al codice sorgente e alle impostazioni di compilazione forniti, possiamo essere certi che questo è esattamente lo stesso codice sorgente utilizzato nella compilazione originale, senza che nemmeno un singolo byte sia diverso.

Questo tipo di verifica che sfrutta l'hash dei metadati è chiamato **"[corrispondenza esatta](https://docs.sourcify.dev/docs/exact-match-vs-match/)"** (in precedenza corrispondenza "completa" o "perfetta"). Se gli hash dei metadati non corrispondono o non vengono considerati nella verifica, si tratta di una **"corrispondenza"** (in precedenza "corrispondenza parziale"): il codice del contratto è verificato, ma i suoi file sorgente potrebbero differire da quelli originali, ad esempio nei commenti o nei nomi dei file. È possibile [inserire codice dannoso](https://samczsun.com/hiding-in-plain-sight/) che non si rifletterebbe nel codice sorgente verificato senza una corrispondenza esatta. La maggior parte degli sviluppatori non è a conoscenza delle corrispondenze esatte e non conserva il file dei metadati della propria compilazione, quindi le corrispondenze senza l'hash dei metadati sono state finora il modo più comune per verificare i contratti.

## Perché la verifica del codice sorgente è importante? {#importance-of-source-code-verification}

### Assenza di necessità di fiducia {#trustlessness}

L'assenza di necessità di fiducia è probabilmente la premessa più grande per gli smart contract e le [applicazioni decentralizzate (dapp)](/developers/docs/dapps/). Gli smart contract sono "immutabili" e non possono essere alterati; un contratto eseguirà solo la logica di business definita nel codice al momento della distribuzione. Ciò significa che gli sviluppatori e le aziende non possono manomettere il codice di un contratto dopo averlo distribuito su Ethereum.

Affinché uno smart contract sia trustless, il codice del contratto dovrebbe essere disponibile per una verifica indipendente. Sebbene il bytecode compilato per ogni smart contract sia pubblicamente disponibile sulla blockchain, il linguaggio di basso livello è difficile da comprendere, sia per gli sviluppatori che per gli utenti.

I progetti riducono le assunzioni di fiducia pubblicando il codice sorgente dei loro contratti. Ma questo porta a un altro problema: è difficile verificare che il codice sorgente pubblicato corrisponda al bytecode del contratto. In questo scenario, il valore dell'assenza di necessità di fiducia va perso perché gli utenti devono fidarsi che gli sviluppatori non modifichino la logica di business di un contratto (ovvero, modificando il bytecode) prima di distribuirlo sulla blockchain.

Gli strumenti di verifica del codice sorgente forniscono garanzie che i file del codice sorgente di uno smart contract corrispondano al codice assembly. Il risultato è un ecosistema trustless, in cui gli utenti non si fidano ciecamente di terze parti e verificano invece il codice prima di depositare fondi in un contratto.

### Sicurezza degli utenti {#user-safety}

Con gli smart contract, di solito ci sono molti soldi in gioco (at stake). Questo richiede maggiori garanzie di sicurezza e la verifica della logica di uno smart contract prima di utilizzarlo. Il problema è che sviluppatori senza scrupoli possono ingannare gli utenti inserendo codice dannoso in uno smart contract. Senza verifica, gli smart contract dannosi possono avere [backdoor](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), meccanismi di controllo degli accessi controversi, vulnerabilità sfruttabili e altre cose che mettono a repentaglio la sicurezza degli utenti e che passerebbero inosservate.

La pubblicazione dei file del codice sorgente di uno smart contract rende più facile per gli interessati, come i revisori, valutare il contratto per potenziali vettori di attacco. Con più parti che verificano in modo indipendente uno smart contract, gli utenti hanno garanzie più forti della sua sicurezza.

## Come verificare il codice sorgente per gli smart contract di Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Distribuire uno smart contract su Ethereum](/developers/docs/smart-contracts/deploying/) richiede l'invio di una transazione con un payload di dati (bytecode compilato) a un indirizzo speciale. Il payload di dati viene generato compilando il codice sorgente, più gli [argomenti del costruttore](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) dell'istanza del contratto aggiunti al payload di dati nella transazione. La compilazione è deterministica, il che significa che produce sempre lo stesso output (ovvero il bytecode del contratto) se vengono utilizzati gli stessi file sorgente e le stesse impostazioni di compilazione (ad es. versione del compilatore, ottimizzatore). Anche i nomi e i percorsi dei file sorgente fanno parte di quell'input: sono registrati nei metadati, quindi rinominare un file modifica l'hash dei metadati.

<SourceVerifyDiagram />

La verifica di uno smart contract comporta fondamentalmente i seguenti passaggi:

1. Inserire i file sorgente e le impostazioni di compilazione in un compilatore.

2. Il compilatore restituisce in output il bytecode del contratto.

3. Ottenere il bytecode del contratto distribuito a un determinato indirizzo (con `eth_getCode`).

4. Confrontare il bytecode distribuito con il bytecode ricompilato. Se i codici corrispondono, il contratto viene verificato con il codice sorgente e le impostazioni di compilazione forniti.

5. Inoltre, se gli hash dei metadati alla fine del bytecode corrispondono, si tratterà di una corrispondenza esatta.

I verificatori possono anche confrontare il bytecode di creazione del contratto: il codice che lo ha distribuito (per un contratto distribuito direttamente da un account, l'input della transazione di distribuzione), che è il bytecode compilato seguito dagli [argomenti del costruttore](https://docs.soliditylang.org/en/latest/contracts.html#constructor) codificati.

Nota che questa è una descrizione semplicistica della verifica e ci sono molte eccezioni che non funzionerebbero con questo metodo, come avere [variabili immutabili](https://docs.sourcify.dev/docs/immutables/).

## Strumenti per la verifica del codice sorgente {#source-code-verification-tools}

Il processo tradizionale di verifica dei contratti può essere complesso. Questo è il motivo per cui disponiamo di strumenti per la verifica del codice sorgente per gli smart contract distribuiti su Ethereum. Questi strumenti automatizzano gran parte della verifica del codice sorgente e curano anche i contratti verificati a vantaggio degli utenti.

### Etherscan {#etherscan}

Sebbene sia noto principalmente come [block explorer della blockchain di Ethereum](/developers/docs/data-and-analytics/block-explorers/), Etherscan offre anche un [servizio di verifica del codice sorgente](https://etherscan.io/verifyContract) per sviluppatori e utenti di smart contract.

Etherscan ti consente di ricompilare il bytecode del contratto dal payload di dati originale (codice sorgente, indirizzo della libreria, impostazioni del compilatore, indirizzo del contratto, ecc.). Se il bytecode ricompilato è associato al bytecode (e ai parametri del costruttore) del contratto onchain, allora [il contratto è verificato](https://info.etherscan.com/types-of-contract-verification/).

Una volta verificato, il codice sorgente del tuo contratto riceve un'etichetta "Verified" (Verificato) e viene pubblicato su Etherscan affinché altri possano controllarlo. Viene anche aggiunto alla sezione [Verified Contracts](https://etherscan.io/contractsVerified/) (Contratti verificati), un repository di smart contract con codici sorgente verificati.

Etherscan è lo strumento più utilizzato per verificare i contratti. Etichetta ogni contratto verificato in base a [come è corrisposto](https://info.etherscan.com/types-of-contract-verification/): una corrispondenza esatta del bytecode di creazione del contratto e degli argomenti del costruttore, una corrispondenza a runtime solo del suo bytecode distribuito, o una corrispondenza simile, assegnata automaticamente quando il bytecode di un contratto corrisponde a quello di un contratto già verificato. La corrispondenza esatta di Etherscan riguarda il bytecode di creazione e gli argomenti del costruttore; non è la stessa distinzione tra corrispondenza esatta e corrispondenza descritta sopra.

[Maggiori informazioni sulla verifica dei contratti su Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) è un block explorer open source che fornisce anche un [servizio di verifica dei contratti](https://eth.blockscout.com/contract-verification) per sviluppatori e utenti di smart contract. Come alternativa open source, Blockscout offre trasparenza su come viene eseguita la verifica e consente i contributi della community per migliorare il processo di verifica.

Similmente ad altri servizi di verifica, Blockscout ti consente di verificare il codice sorgente del tuo contratto ricompilando il bytecode e confrontandolo con il contratto distribuito. Una volta verificato, il tuo contratto riceve lo stato di verifica e il codice sorgente diventa pubblicamente disponibile per l'auditing e l'interazione. I contratti verificati sono anche elencati nel [repository dei contratti verificati](https://eth.blockscout.com/verified-contracts) di Blockscout per facilitarne la navigazione e la scoperta.

### Sourcify {#sourcify}

[Sourcify](https://verify.sourcify.dev) è un altro strumento per la verifica dei contratti che è open source e decentralizzato. Non è un block explorer e verifica solo i contratti su [diverse reti basate sulla EVM](https://docs.sourcify.dev/docs/chains). Agisce come un'infrastruttura pubblica su cui altri strumenti possono basarsi e mira a consentire interazioni con i contratti più a misura d'uomo utilizzando l'[Interfaccia binaria dell'applicazione (ABI)](/developers/docs/smart-contracts/compiling/#web-applications) e i commenti [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) presenti nel file dei metadati.

Sourcify segnala se un contratto è una corrispondenza esatta, con l'hash dei metadati, o una corrispondenza senza di esso, sia per la sua creazione che per il suo bytecode distribuito. I suoi contratti verificati sono pubblici: possono essere interrogati tramite la sua interfaccia di programmazione delle applicazioni (API) e scaricati come [dataset](https://docs.sourcify.dev/docs/repository/). Sourcify trasmette le sue verifiche ai block explorer, inclusi Blockscout, Routescan ed Etherscan, e condivide un database di contratti verificati con Blockscout e Routescan attraverso la [Verifier Alliance](https://verifieralliance.org/).

Il file dei metadati contiene anche gli hash IPFS dei file sorgente e l'hash dei metadati aggiunto al bytecode è esso stesso un hash IPFS. Se uno sviluppatore pubblica i metadati e i file sorgente su [IPFS](https://docs.ipfs.tech/concepts/what-is-ipfs/), chiunque può recuperare i sorgenti esatti di un contratto dal solo bytecode, a condizione che i file rimangano disponibili su IPFS. Un contratto può essere verificato fornendo il file dei metadati e i file sorgente tramite la sua API o l'[interfaccia utente (UI)](https://verify.sourcify.dev), oppure utilizzando plugin per strumenti di sviluppo come Hardhat e Foundry. Il [monitor](https://docs.sourcify.dev/docs/monitoring/) di Sourcify osserva anche i nuovi contratti sulle catene che segue e li verifica automaticamente quando i loro metadati e file sorgente vengono pubblicati su IPFS.

[Maggiori informazioni sulla verifica dei contratti su Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

La [piattaforma Tenderly](https://tenderly.co/) consente agli sviluppatori Web3 di creare, testare, monitorare e gestire gli smart contract. Combinando strumenti di debug con osservabilità e blocchi di costruzione dell'infrastruttura, Tenderly aiuta gli sviluppatori ad accelerare lo sviluppo degli smart contract. Per abilitare completamente le funzionalità di Tenderly, gli sviluppatori devono [eseguire la verifica del codice sorgente](https://docs.tenderly.co/contract-verification) utilizzando diversi metodi.

È possibile verificare un contratto privatamente o pubblicamente. Se verificato privatamente, lo smart contract è visibile solo a te (e agli altri membri del tuo progetto). Verificare un contratto pubblicamente lo rende visibile a tutti coloro che utilizzano la piattaforma Tenderly.

Puoi verificare i tuoi contratti utilizzando la [Dashboard](https://docs.tenderly.co/contract-verification), il [plugin Tenderly per Hardhat](https://docs.tenderly.co/contract-verification/hardhat) o [Foundry](https://docs.tenderly.co/contract-verification/foundry).

Quando verifichi i contratti tramite la Dashboard, devi importare il file sorgente o il file dei metadati generato dal compilatore Solidity, l'indirizzo/rete e le impostazioni del compilatore.

L'utilizzo del plugin Tenderly per Hardhat consente un maggiore controllo sul processo di verifica con meno sforzo, permettendoti di scegliere tra la verifica automatica (senza codice) e manuale (basata sul codice).

## Letture consigliate {#further-reading}

- [Verificare il codice sorgente del contratto](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
