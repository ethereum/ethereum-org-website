---
title: Aggiornare gli smart contract
description: Una panoramica dei modelli di aggiornamento per gli smart contract di Ethereum
lang: it
---

Gli smart contract su Ethereum sono programmi auto-eseguibili che vengono eseguiti nella Ethereum Virtual Machine (EVM). Questi programmi sono immutabili per concezione, il che impedisce qualsiasi aggiornamento alla logica di business una volta che il contratto è stato distribuito.

Sebbene l'immutabilità sia necessaria per l'assenza di necessità di fiducia, la decentralizzazione e la sicurezza degli smart contract, in certi casi può rappresentare uno svantaggio. Ad esempio, il codice immutabile può rendere impossibile per gli sviluppatori correggere i contratti vulnerabili.

Tuttavia, la crescente ricerca per migliorare gli smart contract ha portato all'introduzione di diversi modelli di aggiornamento. Questi modelli di aggiornamento consentono agli sviluppatori di aggiornare gli smart contract (pur preservandone l'immutabilità) inserendo la logica di business in contratti diversi.

## Prerequisiti {#prerequisites}

Dovresti avere una buona comprensione degli [smart contract](/developers/docs/smart-contracts/), dell'[anatomia degli smart contract](/developers/docs/smart-contracts/anatomy/) e della [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). Questa guida presuppone inoltre che i lettori abbiano una conoscenza di base della programmazione degli smart contract.

## Cos'è un aggiornamento di uno smart contract? {#what-is-a-smart-contract-upgrade}

Un aggiornamento di uno smart contract comporta la modifica della logica di business di uno smart contract preservando lo stato del contratto. È importante chiarire che aggiornabilità e mutabilità non sono la stessa cosa, specialmente nel contesto degli smart contract.

Non è comunque possibile modificare un programma distribuito a un indirizzo sulla rete Ethereum. Ma è possibile modificare il codice che viene eseguito quando gli utenti interagiscono con uno smart contract.

Questo può essere fatto tramite i seguenti metodi:

1. Creare più versioni di uno smart contract e migrare lo stato (ovvero i dati) dal vecchio contratto a una nuova istanza del contratto.

2. Creare contratti separati per archiviare la logica di business e lo stato.

3. Utilizzare modelli proxy per delegare le chiamate di funzione da un contratto proxy immutabile a un contratto logico modificabile.

4. Creare un contratto principale immutabile che si interfaccia e si affida a contratti satellite flessibili per eseguire funzioni specifiche.

5. Utilizzare il modello a diamante (diamond pattern) per delegare le chiamate di funzione da un contratto proxy a contratti logici.

### Meccanismo di aggiornamento n. 1: Migrazione del contratto {#contract-migration}

La migrazione del contratto si basa sul controllo delle versioni (versioning), ovvero l'idea di creare e gestire stati unici dello stesso software. La migrazione del contratto comporta la distribuzione di una nuova istanza di uno smart contract esistente e il trasferimento dell'archiviazione e dei saldi al nuovo contratto.

Il contratto appena distribuito avrà un'archiviazione vuota, consentendoti di recuperare i dati dal vecchio contratto e scriverli nella nuova implementazione. Successivamente, dovrai aggiornare tutti i contratti che interagivano con il vecchio contratto per riflettere il nuovo indirizzo.

L'ultimo passaggio nella migrazione del contratto consiste nel convincere gli utenti a passare all'utilizzo del nuovo contratto. La nuova versione del contratto manterrà i saldi e gli indirizzi degli utenti, il che preserva l'immutabilità. Se si tratta di un contratto basato su token, dovrai anche contattare gli exchange per scartare il vecchio contratto e utilizzare quello nuovo.

La migrazione del contratto è una misura relativamente semplice e sicura per aggiornare gli smart contract senza interrompere le interazioni degli utenti. Tuttavia, la migrazione manuale dell'archiviazione e dei saldi degli utenti al nuovo contratto richiede molto tempo e può comportare costi del gas elevati.

[Maggiori informazioni sulla migrazione dei contratti.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Meccanismo di aggiornamento n. 2: Separazione dei dati {#data-separation}

Un altro metodo per aggiornare gli smart contract consiste nel separare la logica di business e l'archiviazione dei dati in contratti separati. Ciò significa che gli utenti interagiscono con il contratto logico, mentre i dati sono archiviati nel contratto di archiviazione.

Il contratto logico contiene il codice eseguito quando gli utenti interagiscono con l'applicazione. Contiene anche l'indirizzo del contratto di archiviazione e interagisce con esso per ottenere e impostare i dati.

Nel frattempo, il contratto di archiviazione mantiene lo stato associato allo smart contract, come i saldi e gli indirizzi degli utenti. Nota che il contratto di archiviazione è di proprietà del contratto logico ed è configurato con l'indirizzo di quest'ultimo al momento della distribuzione. Questo impedisce a contratti non autorizzati di chiamare il contratto di archiviazione o di aggiornarne i dati.

Per impostazione predefinita, il contratto di archiviazione è immutabile, ma è possibile sostituire il contratto logico a cui punta con una nuova implementazione. Questo cambierà il codice che viene eseguito nell'EVM, mantenendo intatti l'archiviazione e i saldi.

L'utilizzo di questo metodo di aggiornamento richiede l'aggiornamento dell'indirizzo del contratto logico nel contratto di archiviazione. Devi anche configurare il nuovo contratto logico con l'indirizzo del contratto di archiviazione per i motivi spiegati in precedenza.

Il modello di separazione dei dati è probabilmente più facile da implementare rispetto alla migrazione del contratto. Tuttavia, dovrai gestire più contratti e implementare schemi di autorizzazione complessi per proteggere gli smart contract da aggiornamenti dannosi.

### Meccanismo di aggiornamento n. 3: Modelli proxy {#proxy-patterns}

Anche il modello proxy utilizza la separazione dei dati per mantenere la logica di business e i dati in contratti separati. Tuttavia, in un modello proxy, il contratto di archiviazione (chiamato proxy) chiama il contratto logico durante l'esecuzione del codice. Questo è l'inverso del metodo di separazione dei dati, in cui il contratto logico chiama il contratto di archiviazione.

Ecco cosa succede in un modello proxy:

1. Gli utenti interagiscono con il contratto proxy, che archivia i dati, ma non contiene la logica di business.

2. Il contratto proxy archivia l'indirizzo del contratto logico e delega tutte le chiamate di funzione al contratto logico (che contiene la logica di business) utilizzando la funzione `delegatecall`.

3. Dopo che la chiamata è stata inoltrata al contratto logico, i dati restituiti dal contratto logico vengono recuperati e restituiti all'utente.

L'utilizzo dei modelli proxy richiede la comprensione della funzione **delegatecall**. Fondamentalmente, `delegatecall` è un codice operativo (opcode) che consente a un contratto di chiamare un altro contratto, mentre l'esecuzione effettiva del codice avviene nel contesto del contratto chiamante. Un'implicazione dell'utilizzo di `delegatecall` nei modelli proxy è che il contratto proxy legge e scrive nella sua archiviazione ed esegue la logica archiviata nel contratto logico come se stesse chiamando una funzione interna.

Dalla [documentazione di Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Esiste una variante speciale di una chiamata di messaggio, denominata **delegatecall**, che è identica a una chiamata di messaggio a parte il fatto che il codice all'indirizzo di destinazione viene eseguito nel contesto (ovvero, all'indirizzo) del contratto chiamante e `msg.sender` e `msg.value` non cambiano i loro valori._ _Ciò significa che un contratto può caricare dinamicamente codice da un indirizzo diverso in fase di esecuzione. L'archiviazione, l'indirizzo corrente e il saldo si riferiscono ancora al contratto chiamante, solo il codice viene preso dall'indirizzo chiamato._

Il contratto proxy sa di dover invocare `delegatecall` ogni volta che un utente chiama una funzione perché ha una funzione `fallback` integrata. Nella programmazione in Solidity, la [funzione di fallback](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) viene eseguita quando una chiamata di funzione non corrisponde alle funzioni specificate in un contratto.

Per far funzionare il modello proxy è necessario scrivere una funzione di fallback personalizzata che specifichi come il contratto proxy debba gestire le chiamate di funzione che non supporta. In questo caso, la funzione di fallback del proxy è programmata per avviare una delegatecall e reindirizzare la richiesta dell'utente all'attuale implementazione del contratto logico.

Il contratto proxy è immutabile per impostazione predefinita, ma è possibile creare nuovi contratti logici con logica di business aggiornata. Eseguire l'aggiornamento è quindi una questione di modifica dell'indirizzo del contratto logico a cui si fa riferimento nel contratto proxy.

Puntando il contratto proxy a un nuovo contratto logico, il codice eseguito quando gli utenti chiamano la funzione del contratto proxy cambia. Questo ci consente di aggiornare la logica di un contratto senza chiedere agli utenti di interagire con un nuovo contratto.

I modelli proxy sono un metodo popolare per aggiornare gli smart contract perché eliminano le difficoltà associate alla migrazione del contratto. Tuttavia, i modelli proxy sono più complicati da usare e possono introdurre difetti critici, come i [conflitti dei selettori di funzione](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), se usati in modo improprio.

[Maggiori informazioni sui modelli proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Meccanismo di aggiornamento n. 4: Modello di strategia {#strategy-pattern}

Questa tecnica è influenzata dal [modello di strategia (strategy pattern)](https://en.wikipedia.org/wiki/Strategy_pattern), che incoraggia la creazione di programmi software che si interfacciano con altri programmi per implementare funzionalità specifiche. Applicare il modello di strategia allo sviluppo su Ethereum significherebbe costruire uno smart contract che chiama funzioni da altri contratti.

Il contratto principale in questo caso contiene la logica di business principale, ma si interfaccia con altri smart contract ("contratti satellite") per eseguire determinate funzioni. Questo contratto principale archivia anche l'indirizzo per ogni contratto satellite e può passare da un'implementazione all'altra del contratto satellite.

Puoi costruire un nuovo contratto satellite e configurare il contratto principale con il nuovo indirizzo. Questo ti consente di cambiare _strategie_ (ovvero, implementare nuova logica) per uno smart contract.

Sebbene simile al modello proxy discusso in precedenza, il modello di strategia è diverso perché il contratto principale, con cui gli utenti interagiscono, contiene la logica di business. L'utilizzo di questo modello ti offre l'opportunità di introdurre modifiche limitate a uno smart contract senza influire sull'infrastruttura principale.

Lo svantaggio principale è che questo modello è utile principalmente per l'implementazione di aggiornamenti minori. Inoltre, se il contratto principale viene compromesso (ad es. tramite un attacco informatico), non è possibile utilizzare questo metodo di aggiornamento.

### Meccanismo di aggiornamento n. 5: Modello a diamante {#diamond-pattern}

Il modello a diamante può essere considerato un miglioramento del modello proxy. I modelli a diamante differiscono dai modelli proxy perché il contratto proxy a diamante può delegare le chiamate di funzione a più di un contratto logico.

I contratti logici nel modello a diamante sono noti come _sfaccettature_ (facets). Per far funzionare il modello a diamante, è necessario creare una mappatura nel contratto proxy che associ i [selettori di funzione](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) a diversi indirizzi di sfaccettature.

Quando un utente effettua una chiamata di funzione, il contratto proxy controlla la mappatura per trovare la sfaccettatura responsabile dell'esecuzione di quella funzione. Quindi invoca `delegatecall` (utilizzando la funzione di fallback) e reindirizza la chiamata al contratto logico appropriato.

Il modello di aggiornamento a diamante presenta alcuni vantaggi rispetto ai tradizionali modelli di aggiornamento proxy:

1. Consente di aggiornare una piccola parte del contratto senza modificare tutto il codice. L'utilizzo del modello proxy per gli aggiornamenti richiede la creazione di un contratto logico completamente nuovo, anche per aggiornamenti minori.

2. Tutti gli smart contract (inclusi i contratti logici utilizzati nei modelli proxy) hanno un limite di dimensione di 24 KB, che può rappresentare una limitazione, specialmente per contratti complessi che richiedono più funzioni. Il modello a diamante semplifica la risoluzione di questo problema suddividendo le funzioni su più contratti logici.

3. I modelli proxy adottano un approccio onnicomprensivo (catch-all) ai controlli di accesso. Un'entità con accesso alle funzioni di aggiornamento può modificare l'_intero_ contratto. Ma il modello a diamante consente un approccio modulare alle autorizzazioni, in cui è possibile limitare le entità all'aggiornamento di determinate funzioni all'interno di uno smart contract.

[Maggiori informazioni sul modello a diamante](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Pro e contro dell'aggiornamento degli smart contract {#pros-and-cons-of-upgrading-smart-contracts}

| Pro                                                                                                                                            | Contro                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Un aggiornamento di uno smart contract può semplificare la correzione delle vulnerabilità scoperte nella fase successiva alla distribuzione.   | L'aggiornamento degli smart contract nega l'idea dell'immutabilità del codice, il che ha implicazioni per la decentralizzazione e la sicurezza.                                                 |
| Gli sviluppatori possono utilizzare gli aggiornamenti logici per aggiungere nuove funzionalità alle applicazioni decentralizzate (dapp).       | Gli utenti devono fidarsi del fatto che gli sviluppatori non modifichino gli smart contract in modo arbitrario.                                                                                 |
| Gli aggiornamenti degli smart contract possono migliorare la sicurezza per gli utenti finali poiché i bug possono essere corretti rapidamente. | La programmazione della funzionalità di aggiornamento negli smart contract aggiunge un ulteriore livello di complessità e aumenta la possibilità di difetti critici.                            |
| Gli aggiornamenti dei contratti offrono agli sviluppatori più spazio per sperimentare diverse funzionalità e migliorare le dapp nel tempo.     | L'opportunità di aggiornare gli smart contract potrebbe incoraggiare gli sviluppatori a lanciare i progetti più velocemente senza eseguire la dovuta diligenza durante la fase di sviluppo. |
|                                                                                                                                                | Un controllo degli accessi non sicuro o la centralizzazione negli smart contract possono rendere più facile per gli attori malintenzionati eseguire aggiornamenti non autorizzati.              |

## Considerazioni per l'aggiornamento degli smart contract {#considerations-for-upgrading-smart-contracts}

1. Utilizza meccanismi di controllo degli accessi/autorizzazione sicuri per impedire aggiornamenti non autorizzati degli smart contract, specialmente se si utilizzano modelli proxy, modelli di strategia o separazione dei dati. Un esempio è limitare l'accesso alla funzione di aggiornamento, in modo che solo il proprietario del contratto possa chiamarla.

2. L'aggiornamento degli smart contract è un'attività complessa e richiede un alto livello di diligenza per prevenire l'introduzione di vulnerabilità.

3. Riduci le assunzioni di fiducia decentralizzando il processo di implementazione degli aggiornamenti. Le possibili strategie includono l'utilizzo di un [contratto di portafoglio multi-firma](/developers/docs/smart-contracts/#multisig) per controllare gli aggiornamenti o richiedere ai [membri di una DAO](/dao/) di esprimere un voto per approvare l'aggiornamento.

4. Sii consapevole dei costi associati all'aggiornamento dei contratti. Ad esempio, la copia dello stato (ad es. i saldi degli utenti) da un vecchio contratto a un nuovo contratto durante la migrazione del contratto potrebbe richiedere più di una transazione, il che significa maggiori commissioni del gas.

5. Prendi in considerazione l'implementazione di **timelock** per proteggere gli utenti. Un timelock si riferisce a un ritardo imposto alle modifiche a un sistema. I timelock possono essere combinati con un sistema di governance multi-firma per controllare gli aggiornamenti: se un'azione proposta raggiunge la soglia di approvazione richiesta, non viene eseguita fino allo scadere del periodo di ritardo predefinito.

I timelock danno agli utenti un po' di tempo per l'uscita dal sistema se non sono d'accordo con una modifica proposta (ad es. aggiornamento logico o nuovi schemi di commissioni). Senza i timelock, gli utenti devono fidarsi del fatto che gli sviluppatori non implementino modifiche arbitrarie in uno smart contract senza preavviso. Lo svantaggio in questo caso è che i timelock limitano la capacità di correggere rapidamente le vulnerabilità.

## Risorse {#resources}

**Plugin di aggiornamento di OpenZeppelin - _Una suite di strumenti per la distribuzione e la protezione di smart contract aggiornabili._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Documentazione](https://docs.openzeppelin.com/upgrades)

## Tutorial {#tutorials}

- [Aggiornare i tuoi smart contract | Tutorial su YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) di Patrick Collins
- [Tutorial sulla migrazione degli smart contract di Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) di Austin Griffith
- [Utilizzo del modello proxy UUPS per aggiornare gli smart contract](https://blog.logrocket.com/author/praneshas/) di Pranesh A.S
- [Tutorial Web3: Scrivere uno smart contract aggiornabile (proxy) utilizzando OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) di fangjun.eth

## Letture consigliate {#further-reading}

- [Lo stato degli aggiornamenti degli smart contract](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) di Santiago Palladino
- [Diversi modi per aggiornare uno smart contract in Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blog di Crypto Market Pool
- [Impara: Aggiornare gli smart contract](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Documentazione di OpenZeppelin
- [Modelli proxy per l'aggiornabilità dei contratti in Solidity: Proxy trasparenti vs UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) di Naveen Sahu
- [Come funzionano gli aggiornamenti a diamante](https://dev.to/mudgen/how-diamond-upgrades-work-417j) di Nick Mudge