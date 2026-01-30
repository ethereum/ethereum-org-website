---
title: "Ridimensionare i contratti per combattere i limiti di dimensioni"
description: Cosa puoi fare per impedire che i tuoi contratti intelligenti diventino troppo grandi?
author: Markus Waas
lang: it
tags: [ "Solidity", "smart contract", "archiviazione" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Perché c'è un limite? {#why-is-there-a-limit}

Il [22 novembre 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) l'hard-fork Spurious Dragon ha introdotto l'[EIP-170](https://eips.ethereum.org/EIPS/eip-170) che ha aggiunto un limite di dimensione per i contratti intelligenti di 24.576 kb. Per te, come sviluppatore Solidity, questo significa che quando aggiungi sempre più funzionalità al tuo contratto, a un certo punto raggiungerai il limite e durante la distribuzione vedrai l'errore:

`Attenzione: La dimensione del codice del contratto eccede i 24576 byte (un limite introdotto in Spurious Dragon).` Questo contratto potrebbe non essere distribuibile sulla Rete Principale. `Considera di abilitare l'ottimizzatore (con un valore di "esecuzioni" basso!), disattivare le stringhe di ripristino o usare le librerie.`

Questo limite è stato introdotto per prevenire gli attacchi denial-of-service (DOS). Qualsiasi chiamata a un contratto è relativamente economica in termini di gas. Tuttavia, l'impatto della chiamata di un contratto per i nodi di Ethereum aumenta sproporzionatamente in base alla dimensione del codice del contratto chiamato (lettura del codice dal disco, pre-elaborazione del codice, aggiunta di dati alla prova di Merkle). Ogni volta che ti trovi in una situazione in cui l'aggressore richiede poche risorse per causare molto lavoro per altri, si crea il potenziale di attacchi DOS.

In origine, questo era un problema minore, dato che il limite naturale di dimensioni del contratto è il limite del gas del blocco. Ovviamente, un contratto deve essere distribuito all'interno di una transazione che contenga tutto il bytecode del contratto. Se includi solo quella transazione in un blocco, puoi usare tutto quel gas, ma non è infinito. Dall'[Aggiornamento London](/ethereum-forks/#london), il limite del gas del blocco ha potuto variare tra 15M e 30M di unità a seconda della domanda della rete.

Di seguito, passeremo in rassegna alcuni metodi, ordinati in base al loro impatto potenziale. Pensiamolo nei termini di perdita di peso. La strategia migliore per qualcuno per raggiungere il peso target (nel nostro caso 24kb) è concentrarsi prima sui metodi a grande impatto. Nella maggior parte dei casi, è sufficiente correggere la propria dieta, ma a volte è necessario qualcosa in più. Potresti allora aggiungere un po' di esercizio (impatto medio) o persino degli integratori (impatto ridotto).

## Grande impatto {#big-impact}

### Separa i tuoi contratti {#separate-your-contracts}

Questo dovrebbe sempre essere il tuo primo approccio. Come puoi separare il contratto in più contratti più piccoli? Generalmente ti costringe a pensare a una buona architettura per i tuoi contratti. I contratti più piccoli sono sempre preferibili a livello di leggibilità del codice. Per dividere i contratti, chiediti:

- Quali funzioni devono rimanere insieme? Ogni insieme di funzioni potrebbe risultare più efficace in un contratto a sé stante.
- Quali funzioni non richiedono la lettura dello stato del contratto o solo un sottoinsieme specifico dello stato?
- Puoi dividere archiviazione e funzionalità?

### Librerie {#libraries}

Un modo semplice per spostare il codice delle funzionalità lontano dall'archiviazione è usare una [libreria](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Non dichiarare le funzioni della libreria come `internal` poiché verranno [aggiunte direttamente al contratto](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) durante la compilazione. Ma se usi funzioni `public`, allora queste si troveranno di fatto in un contratto di libreria separato. Considera di usare [`using for`](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) per rendere più comodo l'uso delle librerie.

### Proxy {#proxies}

Una strategia più avanzata sarebbe un sistema proxy. Le librerie usano `DELEGATECALL` dietro le quinte, che esegue semplicemente la funzione di un altro contratto con lo stato del contratto chiamante. Consulta [questo post del blog](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) per saperne di più sui sistemi proxy. Offrono più funzionalità, ad esempio, abilitano l'aggiornabilità, ma aggiungono anche molta complessità. Non li aggiungerei solo per ridurre le dimensioni del contratto, a meno che non sia la sola opzione per qualche motivo.

## Impatto medio {#medium-impact}

### Rimuovi le funzioni {#remove-functions}

Questo punto dovrebbe essere ovvio. Le funzioni aumentano di un bel po' le dimensioni di un contratto.

- **Esterne**: spesso aggiungiamo molte funzioni `view` per motivi di comodità. Va benissimo finché non raggiungi il limite di dimensione. A quel punto potresti voler davvero pensare di rimuovere tutte quelle non assolutamente essenziali.
- **Interne**: puoi anche rimuovere le funzioni `internal`/`private` e semplicemente mettere il codice in linea, a patto che la funzione sia chiamata solo una volta.

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

Un semplice cambiamento come questo fa una differenza di **0,28kb**. È probabile che tu possa trovare molte situazioni simili nei tuoi contratti, e queste possono davvero sommarsi fino a raggiungere importi significativi.

### Accorcia i messaggi di errore {#shorten-error-message}

I lunghi messaggi di ripristino e, in particolare, molti messaggi di ripristino diversi, possono gonfiare il contratto. Usa invece codici di errore brevi e decodificali nel tuo contratto. Un messaggio lungo potrebbe diventare molto più corto:

```solidity
require(msg.sender == owner, "Solo il proprietario di questo contratto può chiamare questa funzione");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Utilizza gli errori personalizzati invece dei messaggi d'errore

Gli errori personalizzati sono stati introdotti in [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Sono un ottimo modo per ridurre le dimensioni dei tuoi contratti, perché sono codificati in ABI come selettori (proprio come le funzioni).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Considera un valore di esecuzione basso nell'ottimizzatore {#consider-a-low-run-value-in-the-optimizer}

Puoi anche cambiare le impostazioni dell'ottimizzatore. Il valore predefinito di 200 significa che sta provando a ottimizzare il bytecode come se una funzione fosse chiamata 200 volte. Se lo modifichi a 1, fondamentalmente dici all'ottimizzatore di ottimizzare nel caso dell'esecuzione di ogni funzione una sola volta. Una funzione ottimizzata per essere eseguita solo una volta significa che è ottimizzata per la distribuzione stessa. Sappi che **questo aumenta i [costi del gas](/developers/docs/gas/) per l'esecuzione delle funzioni**, quindi potresti non volerlo fare.

## Impatto ridotto {#small-impact}

### Evita di passare struct alle funzioni {#avoid-passing-structs-to-functions}

Se usi l'[ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), può essere d'aiuto non passare `struct` a una funzione. Invece di passare il parametro come una `struct`, passa direttamente i parametri richiesti. In questo esempio abbiamo risparmiato altri **0,1kb**.

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

- Funzioni o variabili chiamate solo dall'esterno? Dichiarale come `external` invece che `public`.
- Funzioni o variabili chiamate dall'interno del contratto? Dichiarale come `private` o `internal` invece che `public`.

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

Questi suggerimenti dovrebbero aiutarti a ridurre significativamente le dimensioni del contratto. Ancora una volta, non smetterò mai di insistere sull'importanza di concentrarsi sempre sulla divisione dei contratti, se possibile, per avere il massimo impatto.
