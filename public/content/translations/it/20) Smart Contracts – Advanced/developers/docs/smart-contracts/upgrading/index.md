---
title: Aggiornare i contratti intelligenti
description: Una panoramica degli schemi di aggiornamento per i contratti intelligenti di Ethereum
lang: it
---

I contratti intelligenti su Ethereum sono programmi autoeseguibili eseguiti nella Macchina Virtuale di Ethereum (EVM). Questi programmi sono immutabili per progettazione, il che impedisce qualsiasi aggiornamento alla logica aziendale una volta che il contratto è distribuito.

Sebbene l'immutabilità sia necessaria per la mancanza di fiducia, la decentralizzazione e la sicurezza dei contratti intelligenti, potrebbe talvolta comportare uno svantaggio. Ad esempio, un codice immutabile può rendere impossibile per gli sviluppatori correggere dei contratti vulnerabili.

Tuttavia, maggiori ricerche volte a migliorare i contratti intelligenti hanno portato all'introduzione di svariati schemi di aggiornamento. Questi consentono agli sviluppatori di aggiornare i contratti intelligenti (preservandone l'immutabilità) inserendo della logica aziendale in contratti differenti.

## Prerequisiti {#prerequisites}

Dovresti avere una buona comprensione dei [contratti intelligenti](/developers/docs/smart-contracts/), dell'[anatomia dei contratti intelligenti](/developers/docs/smart-contracts/anatomy/) e della [Macchina Virtuale di Ethereum (EVM)](/developers/docs/evm/). Questa guida, inoltre, presume che i lettori comprendano la programmazione dei contratti intelligenti.

## Cos'è l'aggiornamento di un contratto intelligente? {#what-is-a-smart-contract-upgrade}

L'aggiornamento di un contratto intelligente comporta la modifica della sua logica aziendale pur preservandone lo stato. È importante chiarire che l'aggiornabilità e la mutabilità non sono la stessa cosa, specialmente nel contesto dei contratti intelligenti.

Non è comunque possibile modificare un programma distribuito a un indirizzo sulla rete di Ethereum. Ma è possibile modificare il codice eseguito quando gli utenti interagiscono con il contratto intelligente.

Ciò può avvenire tramite uno dei seguenti metodi:

1. Creazione di diverse versioni di un contratto intelligente e migrazione dello stato (cioè, dei dati) dal vecchio contratto a una sua nuova istanza.

2. Creazione di contratti separati per memorizzare la logica aziendale e lo stato.

3. Utilizzo di modelli proxy per delegare le chiamate alle funzioni da un contratto proxy immutabile a un contratto logico modificabile.

4. Creazione di un contratto principale immutabile che si interfacci con contratti satellite flessibili, e si basi su questi ultimi, per eseguire funzioni specifiche.

5. Utilizzo di modelli a diamante per delegare le chiamate alle funzioni da un contratto proxy a contratti logici.

### Meccanismo di aggiornamento n. 1: migrazione del contratto {#contract-migration}

La migrazione del contratto si basa sul versionamento: l'idea di creare e gestire stati univoci dello stesso software. La migrazione del contratto comporta la distribuzione di una nuova istanza di un contratto intelligente esistente e il trasferimento di archiviazione e saldi al nuovo contratto.

Il nuovo contratto distribuito avrà un'archiviazione vuota, consentendoti di recuperare i dati dal precedente e di scriverli nella nuova implementazione. Dopodiché, dovrai aggiornare tutti i contratti che hanno interagito con il vecchio contratto affinché riflettano il nuovo indirizzo.

L'ultimo passaggio nella migrazione del contratto è convincere gli utenti a passare all'utilizzo di quello nuovo. La nuova versione del contratto manterrà i saldi e indirizzi degli utenti, preservandone l'immutabilità. Se è un contratto basato su token, dovrai anche contattare le borse per scartare il vecchio contratto e utilizzare quello nuovo.

La migrazione del contratto è una misura relativamente semplice e sicura per aggiornare i contratti intelligenti senza spezzare le interazioni degli utenti. Tuttavia, la migrazione manuale dell'archiviazione e dei saldi degli utenti al nuovo contratto richiede tempo e può comportare costi elevati in termini di carburante.

[Maggiori informazioni sulla migrazione del contratto.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Meccanismo di aggiornamento n. 2: separazione dei dati {#data-separation}

Un altro metodo per aggiornare i contratti intelligenti è separare la logica aziendale e l'archiviazione dei dati in contratti separati. Ciò significa che gli utenti interagiscono con il contratto logico, mentre i dati sono memorizzati in quello d'archiviazione.

Il contratto logico contiene il codice eseguito quando gli utenti interagiscono con l'applicazione. Inoltre, contiene l'indirizzo del contratto d'archiviazione e vi interagisce per ottenere e impostare dati.

Nel mentre, il contratto d'archiviazione detiene lo stato associato al contratto intelligente, come saldi e indirizzi degli utenti. Nota che il contratto d'archiviazione è posseduto dal contratto logico ed è configurato con l'indirizzo di quest'ultimo alla distribuzione. Ciò impedisce ai contratti non autorizzati di chiamare il contratto d'archiviazione o di aggiornarne i dati.

Di default, il contratto d'archiviazione è immutabile, ma puoi sostituire il contratto logico a cui è indirizzato con una nuova implementazione. Questo modificherà il codice eseguito nell'EVM, mantenendo intatti archiviazione e saldi.

Utilizzare questo metodo di aggiornamento richiede l'aggiornamento dell'indirizzo del contratto logico nel contratto d'archiviazione. Devi inoltre configurare il nuovo contratto logico con l'indirizzo del contratto d'archiviazione per i suddetti motivi.

Il modello di separazione dei dati è indubbiamente più facile da implementare rispetto alla migrazione del contratto. Tuttavia, dovrai gestire svariati contratti e implementare complessi schemi di autorizzazione per proteggere i contratti intelligenti dagli aggiornamenti malevoli.

### Meccanismo di aggiornamento n. 3: modelli del proxy {#proxy-patterns}

Anche il modello del proxy utilizza la separazione dei dati per mantenere la logica aziendale e i dati in contratti separati. Tuttavia, in un modello del proxy, il contratto di archiviazione (detto proxy) chiama il contratto logico durante l'esecuzione del codice. Questo è l'inverso del metodo di separazione dei dati, in cui il contratto logico chiama il contratto d'archiviazione.

Questo è quanto si verifica in un modello del proxy:

1. Gli utenti interagiscono con il contratto proxy, che memorizza i dati ma non detiene la logica aziendale.

2. Il contratto proxy memorizza gli indirizzi del contratto logico e delega tutte le chiamate alle funzioni al contratto logico (che detiene la logica aziendale) utilizzando la funzione `delegatecall`.

3. Dopo l'inoltro della chiamata al contratto logico, i dati restituiti dal contratto logico sono recuperati e restituiti all'utente.

Utilizzare i modelli del proxy richiede una comprensione della funzione **delegatecall**. Fondamentalmente, `delegatecall` è un opcode che permette a un contratto di chiamarne un altro, mentre l'esecuzione effettiva del codice si verifica nel contesto del contratto chiamante. Un'implicazione dell'utilizzo di `delegatecall` nei modelli del proxy è che il contratto proxy legge e scrive alla propria archiviazione, eseguendo la logica archiviata al contratto logico come se stesse chiamando una funzione interna.

Dalla [documentazione di Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Esiste una variante speciale di una chiamata al messaggio, detta **delegatecall**, identica a una chiamata al messaggio tranne nel fatto che il codice all'indirizzo di destinazione è eseguito nel contesto (cioè, all'indirizzo) del contratto chiamante e `msg.sender` e `msg.value` non modificano i propri valori. _ _Ciò significa che un contratto può caricare dinamicamente il codice da un indirizzo differente all'esecuzione. L'archiviazione, l'indirizzo corrente e il saldo fanno ancora riferimento al contratto chiamante, solo il codice è preso dall'indirizzo chiamato._

Il contratto proxy sa di invocare `delegatecall` ogni volta che un utente chiama una funzione, poiché ha una funzione di `fallback` integrata. Nella programmazione in Solidity, la [funzione di fallback](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) è eseguita quando una chiamata a una funzione non corrisponde alle funzioni specificate in un contratto.

Far funzionare il modello del proxy richiede la scrittura di una funzione di fallback personalizzata che specifichi come il contratto proxy dovrebbe gestire le chiamate alla funzione che non supporta. In questo caso, la funzione di fallback del proxy è programmata per avviare una delegatecall e reindirizzare la richiesta dell'utente all'implementazione del contratto logico corrente.

Il contratto proxy è immutabile di default, ma possono essere creati dei nuovi contratti logici con logica aziendale aggiornata. Eseguire l'aggiornamento dipende quindi dalla modifica dell'indirizzo del contratto logico a cui si fa riferimento nel contratto proxy.

Indicando il contratto proxy a un nuovo contratto logico, il codice eseguito quando gli utenti chiamano la funzione del contratto proxy cambia. Ciò ci consente di aggiornare la logica di un contratto senza chiedere agli utenti di interagire con un nuovo contratto.

I modelli del proxy sono un metodo popolare per aggiornare i contratti intelligenti poiché eliminano le difficoltà associate alla migrazione del contratto. Tuttavia, i modelli del proxy sono più complicati da utilizzare e possono introdurre falle critiche, come [conflitti del selettore di funzione](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), se usate impropriamente.

[Maggiori informazioni sui modelli del proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Meccanismo di aggiornamento n. 4: modello strategico {#strategy-pattern}

Questa tecnica è influenzata dal [modello strategico](https://en.wikipedia.org/wiki/Strategy_pattern), che incoraggia la creazione di programmi software che si interfaccino con altri programmi per implementare specifiche funzionalità. Applicare il modello strategico allo sviluppo di Ethereum significherebbe costruire un contratto intelligente che chiami le funzioni da altri contratti.

Il contratto principale in questo caso contiene la logica aziendale principale, ma si interfaccia con altri contratti intelligenti ("contratti satellite") per eseguire certe funzioni. Questo contratto principale, inoltre, memorizza l'indirizzo per ogni contratto satellite e può passare tra diverse implementazioni del contratto satellite.

Puoi creare un nuovo contratto satellite e configurare il contratto principale con il nuovo indirizzo. Ciò ti consente di cambiare le _strategie_ (cioè, implementare nuova logica) per un contratto intelligente.

Sebbene sia simile al modello del proxy discusso in precedenza, il modello strategico è differente poiché il contratto principale, con cui gli utenti interagiscono, detiene la logica aziendale. Utilizzare questo modello ti offre l'opportunità di introdurre modifiche limitate a un contratto intelligente senza influenzare l'infrastruttura principale.

Lo svantaggio principale è che questo modello è per lo più utile per implementare aggiornamenti minori. Inoltre, se il contratto intelligente è compromesso (es. per via di una violazione), non puoi utilizzare questo metodo di aggiornamento.

### Meccanismo di aggiornamento n. 5: modello a diamante {#diamond-pattern}

Il modello a diamante può essere considerato un miglioramento del modello del proxy. I modelli a diamante differiscono dai modelli del proxy perché il contratto proxy a diamante può delegare le chiamate alle funzioni a più di un contratto logico.

I contratti logici nel modello a diamante sono noti come _sfaccettature_. Per far funzionare il modello a diamante, devi creare una mappatura nel contratto proxy che mappi i [selettori della funzione](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) a diversi indirizzi di sfaccettatura.

Quando un utente effettua una chiamata a una funzione, il contratto proxy controlla la mappatura per trovare la sfaccettatura responsabile dell'esecuzione di tale funzione. Quindi invoca `delegatecall` (utilizzando la funzione di fallback) e reindirizza la chiamata al contratto logico appropriato.

Il modello di aggiornamento a diamante presenta dei vantaggi rispetto ai tradizionali modelli di aggiornamento del proxy:

1. Ti consente di aggiornare una piccola parte del contratto senza modificare tutto il codice. L'utilizzo del modello del proxy per gli aggiornamenti richiede la creazione di un contratto logico completamente nuovo, anche per aggiornamenti minori.

2. Tutti i contratti intelligenti (inclusi i contratti logici utilizzati nei modelli del proxy) hanno un limite di dimensione di 24KB che può risultare limitante, specialmente per i contratti complessi che richiedono più funzioni. Il modello a diamante semplifica la risoluzione di questo problema dividendo le funzioni tra più contratti logici.

3. I modelli del proxy adottano un approccio omnicomprensivo per i controlli dell'accesso. Un'entità con accesso alle funzioni di aggiornamento può modificare l'_intero_ contratto. Ma il modello a diamante consente un approccio modulare ai permessi, in cui puoi fare in modo che le entità possano aggiornare solo determinate funzioni in un contratto intelligente.

[Maggiori informazioni sui modelli a diamante](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Pro e contro dell'aggiornamento dei contratti intelligenti {#pros-and-cons-of-upgrading-smart-contracts}

| Pro                                                                                                                                                  | Contro                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L'aggiornamento di un contratto intelligente può semplificare la correzione delle vulnerabilità scoperte nella fase post-distribuzione.              | L'aggiornamento dei contratti intelligenti nega l'idea dell'immutabilità del codice, il che ha implicazioni per la decentralizzazione e la sicurezza.                                    |
| Gli sviluppatori possono utilizzare gli aggiornamenti logici per aggiungere nuove funzionalità alle applicazioni decentralizzate.                    | Gli utenti devono fidarsi del fatto che gli sviluppatori non modifichino arbitrariamente i contratti intelligenti.                                                                       |
| Gli aggiornamenti dei contratti intelligenti possono migliorare la sicurezza per gli utenti finali grazie a una rapida correzione dei bug.           | La programmazione di funzionalità di aggiornamento nei contratti intelligenti aggiunge un ulteriore livello di complessità, incrementando la possibilità di falle critiche.              |
| Gli aggiornamenti dei contratti danno più spazio agli sviluppatori per sperimentare con varie funzionalità e migliorare le dapp nel corso del tempo. | L'opportunità di aggiornare i contratti intelligenti potrebbe incoraggiare gli sviluppatori a lanciare i progetti più velocemente senza la dovuta diligenza durante la fase di sviluppo. |
|                                                                                                                                                      | Un controllo dell'accesso non sicuro o la centralizzazione nei contratti intelligenti possono semplificare l'esecuzione di aggiornamenti non autorizzati da parte di utenti malevoli.    |

## Considerazioni sull'aggiornamento dei contratti intelligenti {#considerations-for-upgrading-smart-contracts}

1. Utilizzare meccanismi di controllo/autorizzazione dell'accesso sicuro per prevenire aggiornamenti non autorizzati ai contratti intelligenti, specialmente se si utilizzano modelli proxy, modelli strategici o separazione dei dati. Un esempio è limitare l'accesso alla funzione di aggiornamento, così che soltanto il proprietario del contratto possa chiamarla.

2. L'aggiornamento dei contratti intelligenti è un'attività complessa e richiede un elevato livello di diligenza per prevenire l'introduzione di vulnerabilità.

3. Ridurre le ipotesi di fiducia decentralizzando il processo di implementazione degli aggiornamenti. Le possibili strategie includono l'utilizzo di un [contratto del portafoglio multifirma](/developers/docs/smart-contracts/#multisig) per controllare gli aggiornamenti, o la richiesta ai [membri di una DAO](/dao/) di votare sull'approvazione dell'aggiornamento.

4. Essere consapevoli dei costi comportati dall'aggiornamento dei contratti. Ad esempio, copiare lo stato (es. i saldi degli utenti) da un contratto vecchio a uno nuovo durante la sua migrazione potrebbe richiedere più di una transazione, il che significa maggiori commissioni sul carburante.

5. Considerare l'implementazione di **blocchi temporali** per proteggere gli utenti. Un blocco temporale si riferisce a un ritardo imposto alle modifiche a un sistema. I blocchi temporali sono combinabili con un sistema di governance multifirma per controllare gli aggiornamenti: se un'azione proposta raggiunge la soglia di approvazione necessaria, non viene eseguita fino al termine del periodo di ritardo predefinito.

I blocchi temporali danno del tempo agli utenti per uscire dal sistema se sono in disaccordo con una modifica proposta (es. aggiornamento logico o nuovi schemi di commissioni). Senza i blocchi temporali, gli utenti devono fidarsi del fatto che gli sviluppatori non implementino modifiche arbitrarie in un contratto intelligente senza preavviso. In questo caso lo svantaggio è che i blocchi temporali limitano la possibilità di correggere rapidamente le vulnerabilità.

## Risorse {#resources}

**OpenZeppelin Upgrades Plugins - _Una suite di strumenti per distribuire e proteggere contratti intelligenti aggiornabili._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Documentazione](https://docs.openzeppelin.com/upgrades)

## Tutorial {#tutorials}

- [Aggiornare i tuoi contratti intelligenti | Tutorial YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) di Patrick Collins
- [Tutorial di migrazione dei contratti intelligenti di Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) di Austin Griffith
- [Utilizzare il modello proxy UUPS per aggiornare i contratti intelligenti](https://blog.logrocket.com/author/praneshas/) di Pranesh A.S
- [Tutorial Web3: scrivere contratti intelligenti aggiornabili (proxy) utilizzando OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) di fangjun.eth

## Letture consigliate {#further-reading}

- [Lo stato degli aggiornamenti dei contratti intelligenti](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) di Santiago Palladino
- [Svariati metodi per aggiornare un contratto intelligente in Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blog Crypto Market Pool
- [Impara: aggiornare i contratti intelligenti](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Documentazione di OpenZeppelin
- [Modelli proxy per l'aggiornabilità dei contratti in Solidity: proxy trasparenti vs. UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) di Naveen Sahu
- [Come funzionano gli aggiornamenti a diamante](https://dev.to/mudgen/how-diamond-upgrades-work-417j) di Nick Mudge
