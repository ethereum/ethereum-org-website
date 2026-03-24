---
title: "Ridurre le dimensioni dei contratti per combattere il limite di dimensione del contratto"
description: Cosa puoi fare per evitare che i tuoi contratti intelligenti diventino troppo grandi?
author: Markus Waas
lang: it
tags: ["Solidity", "contratti intelligenti", "archiviazione"]
skill: intermediate
breadcrumb: Ridurre le dimensioni dei contratti
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Perché c'è un limite? {#why-is-there-a-limit}

Il [22 novembre 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) la biforcazione hard Spurious Dragon ha introdotto l'[EIP-170](https://eips.ethereum.org/EIPS/eip-170) che ha aggiunto un limite di dimensione del contratto intelligente di 24,576 kb. Per te come sviluppatore Solidity questo significa che quando aggiungi sempre più funzionalità al tuo contratto, a un certo punto raggiungerai il limite e durante la distribuzione vedrai l'errore:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Questo limite è stato introdotto per prevenire attacchi denial-of-service (DOS). Qualsiasi chiamata a un contratto è relativamente economica in termini di gas. Tuttavia, l'impatto di una chiamata al contratto per i nodi di Ethereum aumenta in modo sproporzionato a seconda delle dimensioni del codice del contratto chiamato (lettura del codice dal disco, pre-elaborazione del codice, aggiunta di dati alla prova di Merkle). Ogni volta che si verifica una situazione in cui l'attaccante richiede poche risorse per causare molto lavoro agli altri, si ottiene il potenziale per attacchi DOS.

In origine questo era un problema minore perché un limite naturale alle dimensioni del contratto è il limite del gas del blocco. Ovviamente, un contratto deve essere distribuito all'interno di una transazione che contiene tutto il bytecode del contratto. Se includi solo quella transazione in un blocco, puoi consumare tutto quel gas, ma non è infinito. A partire dall'[Aggiornamento di Londra](/ethereum-forks/#london), il limite del gas del blocco ha potuto variare tra 15M e 30M di unità a seconda della domanda della rete.

Di seguito esamineremo alcuni metodi ordinati in base al loro potenziale impatto. Pensaci in termini di perdita di peso. La strategia migliore per raggiungere il proprio peso forma (nel nostro caso 24kb) è concentrarsi prima sui metodi a grande impatto. Nella maggior parte dei casi, basta sistemare la dieta per arrivarci, ma a volte serve un po' di più. Quindi potresti aggiungere un po' di esercizio fisico (impatto medio) o persino degli integratori (impatto basso).

## Grande impatto {#big-impact}

### Separa i tuoi contratti {#separate-your-contracts}

Questo dovrebbe sempre essere il tuo primo approccio. Come puoi separare il contratto in più contratti più piccoli? In genere ti costringe a ideare una buona architettura per i tuoi contratti. I contratti più piccoli sono sempre preferiti dal punto di vista della leggibilità del codice. Per dividere i contratti, chiediti:

- Quali funzioni appartengono allo stesso gruppo? Ogni insieme di funzioni potrebbe stare meglio nel proprio contratto.
- Quali funzioni non richiedono la lettura dello stato del contratto o solo di un sottoinsieme specifico dello stato?
- Puoi separare l'archiviazione e le funzionalità?

### Librerie {#libraries}

Un modo semplice per allontanare il codice delle funzionalità dall'archiviazione è utilizzare una [libreria](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Non dichiarare le funzioni della libreria come interne, poiché queste verranno [aggiunte al contratto](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) direttamente durante la compilazione. Ma se usi funzioni pubbliche, allora queste saranno di fatto in un contratto di libreria separato. Considera l'utilizzo di [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) per rendere più conveniente l'uso delle librerie.

### Proxy {#proxies}

Una strategia più avanzata sarebbe un sistema proxy. Le librerie usano `DELEGATECALL` in background, che esegue semplicemente la funzione di un altro contratto con lo stato del contratto chiamante. Dai un'occhiata a [questo post del blog](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) per saperne di più sui sistemi proxy. Ti offrono maggiori funzionalità, ad esempio consentono l'aggiornabilità, ma aggiungono anche molta complessità. Non li aggiungerei solo per ridurre le dimensioni del contratto, a meno che non sia la tua unica opzione per qualsiasi motivo.

## Impatto medio {#medium-impact}

### Rimuovi funzioni {#remove-functions}

Questo dovrebbe essere ovvio. Le funzioni aumentano un bel po' le dimensioni di un contratto.

- **Esterne**: Spesso aggiungiamo molte funzioni di visualizzazione (view) per motivi di comodità. Va benissimo finché non si raggiunge il limite di dimensione. A quel punto potresti voler pensare seriamente di rimuovere tutte quelle non assolutamente essenziali.
- **Interne**: Puoi anche rimuovere le funzioni interne/private e semplicemente inserire il codice in linea, a patto che la funzione venga chiamata solo una volta.

### Evita variabili aggiuntive {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Un semplice cambiamento come questo fa una differenza di **0,28kb**. È probabile che tu possa trovare molte situazioni simili nei tuoi contratti e queste possono davvero sommarsi fino a raggiungere quantità significative.

### Accorcia i messaggi di errore {#shorten-error-message}

I messaggi di revert lunghi e in particolare molti messaggi di revert diversi possono gonfiare il contratto. Usa invece codici di errore brevi e decodificali nel tuo contratto. Un messaggio lungo potrebbe diventare molto più corto:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Usa errori personalizzati invece di messaggi di errore

Gli errori personalizzati sono stati introdotti in [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Sono un ottimo modo per ridurre le dimensioni dei tuoi contratti, perché sono codificati in ABI come selettori (proprio come lo sono le funzioni).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Considera un valore di esecuzione basso nell'ottimizzatore {#consider-a-low-run-value-in-the-optimizer}

Puoi anche modificare le impostazioni dell'ottimizzatore. Il valore predefinito di 200 significa che sta cercando di ottimizzare il bytecode come se una funzione venisse chiamata 200 volte. Se lo modifichi a 1, in pratica dici all'ottimizzatore di ottimizzare per il caso in cui ogni funzione venga eseguita solo una volta. Una funzione ottimizzata per essere eseguita una sola volta significa che è ottimizzata per la distribuzione stessa. Tieni presente che **questo aumenta i [costi del gas](/developers/docs/gas/) per l'esecuzione delle funzioni**, quindi potresti non volerlo fare.

## Impatto basso {#small-impact}

### Evita di passare struct alle funzioni {#avoid-passing-structs-to-functions}

Se stai utilizzando l'[ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), può essere utile non passare struct a una funzione. Invece di passare il parametro come struct, passa direttamente i parametri richiesti. In questo esempio abbiamo risparmiato un altro **0,1kb**.

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### Dichiara la visibilità corretta per funzioni e variabili {#declare-correct-visibility-for-functions-and-variables}

- Funzioni o variabili che vengono chiamate solo dall'esterno? Dichiarale come `external` invece di `public`.
- Funzioni o variabili chiamate solo dall'interno del contratto? Dichiarale come `private` o `internal` invece di `public`.

### Rimuovi i modificatori {#remove-modifiers}

I modificatori, specialmente se usati intensamente, potrebbero avere un impatto significativo sulle dimensioni del contratto. Considera di rimuoverli e di usare invece le funzioni.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Questi suggerimenti dovrebbero aiutarti a ridurre significativamente le dimensioni del contratto. Ancora una volta, non lo sottolineerò mai abbastanza, concentrati sempre sulla divisione dei contratti, se possibile, per ottenere l'impatto maggiore.