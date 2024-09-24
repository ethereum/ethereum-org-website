---
title: "Ridimensionare i contratti per combattere i limiti di dimensioni"
description: Cosa puoi fare per impedire che i tuoi smart contract diventino troppo grandi?
author: Markus Waas
lang: it
tags:
  - "solidity"
  - "contratti intelligenti"
  - "archiviazione"
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Perché c'è un limite? {#why-is-there-a-limit}

Il [22 Novembre 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/), la diramazione permanente Spurious Dragon ha introdotto [EIP-170](https://eips.ethereum.org/EIPS/eip-170), che ha aggiunto un limite di dimensioni per gli smart contract di 24.576 kb. Per gli sviluppatori in Solidity, significa che quando si aggiungono più funzionalità al contratto, a un certo punto si raggiunge il limite e, in fase di implementazione, si vedrà l'errore:

`Attenzione: La dimensione del codice del contratto eccede i 24576 byte (un limite introdotto in Spurious Dragon). This contract may not be deployable on Mainnet. Considera di abilitare l'ottimizzatore (con un valore di "esecuzioni" basso!), disattivare le stringhe di ripristino o usare le librerie.`

Questo limite è stato introdotto per prevenire gli attacchi DOS (denial-of-service). Qualsiasi chiamata a un contratto è relativamente economica in termini di gas. Tuttavia, l'impatto della chiamata di un contratto per i nodi di Ethereum aumenta sproporzionatamente in base alla dimensione del codice del contratto chiamato (lettura del codice dal disco, pre-elaborazione del codice, aggiunta di dati alla prova di Merkle). Ogni volta che ti trovi in una situazione in cui il malintenzionato richiede poche risorse per causare molto lavoro per altri, esiste il potenziale di attacchi DOS.

In origine, questo era un problema minore, dato che il limite naturale di dimensioni del contratto è il limite di gas del blocco. Ovviamente, un contratto dev'esser distribuito entro una transazione che detenga tutto il codice del byte del contratto. Se includi solo quella transazione in un blocco, puoi usare anche tutto il gas, ma non è infinito. Dall'[Aggiornamento di Londra](/history/#london), il limite di gas del blocco è stato capace di variare tra le 15M e le 30M unità, a seconda della domanda di rete.

Di seguito, passeremo in rassegna alcuni metodi, ordinati in base al loro impatto potenziale. Pensiamo ad esempio alla perdita di peso: la strategia migliore per raggiungere il proprio peso target (nel nostro caso 24kb) consiste nel concentrarsi prima sui metodi a maggiore impatto. In gran parte dei casi è sufficiente adattare la propria dieta, mentre in altri serve qualcosa di più. Si può aggiungere un po' di esercizio fisico (impatto medio) o persino degli integratori (impatto ridotto).

## Impatto elevato {#big-impact}

### Separa i tuoi contratti {#separate-your-contracts}

Questo dovrebbe sempre essere l'approccio preferenziale. Come fare per separare un unico contratto in diversi contratti più piccoli? Generalmente è necessario trovare un'architettura efficace per i propri contratti. I contratti più piccoli sono sempre preferibili a livello di leggibilità del codice. Per dividere i contratti, chiediti:

- Quali funzioni devono rimanere insieme? Ogni serie di funzioni potrebbe risultare più efficace in un contratto a sé stante.
- Quali funzioni non richiedono la lettura dello stato del contratto o solo un sottoinsieme specifico dello stato?
- Puoi dividere archiviazione e funzionalità?

### Librerie {#libraries}

Un modo semplice per togliere il codice di funzionalità dall'archiviazione consiste nell'utilizzare una [libreria](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Evita di dichiarare le funzioni della libreria come interne, poiché verranno [aggiunte al contratto](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) direttamente durante la compilazione. Se invece usi funzioni pubbliche, queste si troveranno nel contratto di una libreria separata. Considera [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) per rendere l'utilizzo delle librerie più pratico.

### Proxy {#proxies}

Una strategia più avanzata è il sistema proxy. Le librerie usano `DELEGATECALL` in background, che esegue semplicemente la funzione di un altro contratto con lo stato del contratto chiamante. Dai un'occhiata a [questo post del blog](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) per scoprire di più sui sistemi proxy. Offono maggiore funzionalità, ad es. consentono l'aggiornabilità ma aggiungono anche una notevole complessità. Non li aggiungerei solo per ridurre le dimensioni del contratto, a meno che non sia la sola opzione per qualche motivo.

## Impatto medio {#medium-impact}

### Rimuovi le funzioni {#remove-functions}

Questo punto dovrebbe essere ovvio. Le funzioni aumentano di un bel po' le dimensioni di un contratto.

- **Esterne**: talvolta aggiungiamo molte funzioni di visualizzazione per motivi di comodità, il che va perfettamente bene finché non si supera il limite di dimensioni. A quel punto si potrebbe seriamente pensare di rimuovere tutte le funzioni tranne quelle essenziali.
- **Interne**: puoi rimuovere anche le funzioni interne/private e limitarti a mettere il codice in linea, a condizione che la funzione venga chiamata solo una volta.

### Evita le variabili aggiuntive {#avoid-additional-variables}

Una semplice modifica come questa:

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

crea una differenza di **0,28kb**. È facile incontrare numerose situazioni simili nei propri contratti, con il rischio che si sommino fino a raggiungere volumi significativi.

### Abbrevia i messaggi d'errore {#shorten-error-message}

I messaggi di ripristino lunghi e, in particolare, la presenza di numerosi messaggi diversi possono fare espandere il contratto. Invece, è meglio usare brevi codici d'errore e decodificali nel contratto. In questo modo è possibile rendere brevi i messaggi più lunghi:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");

```

```solidity
require(msg.sender == owner, "OW1");
```

### Utilizza gli errori personalizzati invece dei messaggi d'errore

Gli errori personalizzati sono stati introdotti in [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Sono ottimi modi per ridurre le dimensioni dei tuoi contratti, poiché sono codificati in ABI come selettori (proprio come le funzioni).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Considera un valore d'esecuzione basso nell'ottimizzatore {#consider-a-low-run-value-in-the-optimizer}

Puoi anche cambiare le impostazioni dell'ottimizzatore. Il valore predefinito di 200 significa che sta provando a ottimizzare il bytecode come se una funzione fosse chiamata 200 volte. Se lo modifichi a 1, fondamentalmente dici all'ottimizzatore di ottimizzare nel caso dell'esecuzione di ogni funzione una sola volta. Una funzione ottimizzata per essere eseguita solo una volta è ottimizzata per la distribuzione stessa. Sappi che **ciò aumenta i [costi del gas](/developers/docs/gas/) per l'esecuzione delle funzioni**, quindi meglio non farlo.

## Piccolo impatto {#small-impact}

### Evita il passaggio di struct alle funzioni {#avoid-passing-structs-to-functions}

Se utilizzi l'[ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), può essere utile evitare il passaggio di struct a una funzione. Anziché passare il parametro come struct...

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

... passa direttamente i parametri richiesti. In questo esempio abbiamo risparmiato altri **0,1kb**.

### Dichiara la visibilità corretta per funzioni e variabili {#declare-correct-visibility-for-functions-and-variables}

- Funzioni o variabili chiamate solo dall'esterno? Dichiarale come `external` anziché `public`.
- Funzioni o variabili chiamate dall'interno del contratto? Dichiarale come `private` o `internal` anziché `public`.

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
