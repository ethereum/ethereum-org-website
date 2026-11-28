---
title: "Ridurre le dimensioni dei contratti per combattere il limite di dimensione del contratto"
description: Cosa puoi fare per evitare che i tuoi smart contract diventino troppo grandi?
author: Markus Waas
lang: it
tags: ["Solidity", "smart contract", "archiviazione"]
skill: intermediate
breadcrumb: Ridurre le dimensioni dei contratti
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Perché c'è un limite? {#why-is-there-a-limit}

Il [22 novembre 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) l'hard fork Spurious Dragon ha introdotto l'[EIP-170](https://eips.ethereum.org/EIPS/eip-170) che ha aggiunto un limite di dimensione per gli smart contract di 24.576 byte (24 KiB). Per te come sviluppatore Solidity questo significa che quando aggiungi sempre più funzionalità al tuo contratto, a un certo punto raggiungerai il limite e il compilatore ti avviserà:

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

C'è un avviso simile per il codice di distribuzione (initcode), che l'[EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) ha limitato a 49.152 byte nell'aggiornamento Shanghai.

Il limite non è permanente. L'[EIP-7954](https://eips.ethereum.org/EIPS/eip-7954) lo innalza a 65.536 byte (64 KiB) e il limite dell'initcode a 131.072 byte, ed è programmato per l'[aggiornamento Glamsterdam](/roadmap/glamsterdam/). Finché tale aggiornamento non si attiverà sulla rete su cui distribuisci, 24.576 byte rimarrà il limite, e anche in seguito i contratti più piccoli resteranno più economici da distribuire e più facili da controllare.

Questo limite è stato introdotto per prevenire gli attacchi denial-of-service (DOS). Qualsiasi chiamata a un contratto è relativamente economica in termini di gas. Tuttavia, l'impatto di una chiamata a un contratto per i nodi Ethereum aumenta in modo sproporzionato a seconda delle dimensioni del codice del contratto chiamato (lettura del codice dal disco, pre-elaborazione del codice, aggiunta di dati alla prova di Merkle). Ogni volta che si verifica una situazione in cui l'aggressore richiede poche risorse per causare molto lavoro ad altri, si ottiene il potenziale per attacchi DOS.

In origine questo era un problema minore perché un limite naturale alle dimensioni del contratto è il limite di gas del blocco. Ovviamente, un contratto deve essere distribuito all'interno di una transazione che contenga tutto il bytecode del contratto. Se includi solo quella transazione in un blocco, puoi consumare tutto quel gas, ma non è infinito. Oggi il limite di gas del blocco è di decine di milioni di gas ed è stato innalzato diverse volte dai validatori, quindi da solo consentirebbe contratti molto grandi. Dall'[aggiornamento Fusaka](/roadmap/fusaka/), anche una singola transazione è limitata a 16.777.216 gas ([EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)), ma questo è ancora ben al di sopra di quanto costa distribuire un contratto da 24 KiB, motivo per cui è necessario un limite di dimensione esplicito.

Di seguito esamineremo alcuni metodi ordinati in base al loro potenziale impatto. Pensaci in termini di perdita di peso. La migliore strategia per qualcuno che vuole raggiungere il proprio peso forma (nel nostro caso 24kb) è concentrarsi prima sui metodi a grande impatto. Nella maggior parte dei casi, basterà sistemare la dieta per arrivarci, ma a volte serve un po' di più. Quindi potresti aggiungere un po' di esercizio fisico (impatto medio) o persino degli integratori (impatto basso).

## Grande impatto {#big-impact}

### Separare i contratti {#separate-your-contracts}

Questo dovrebbe essere sempre il tuo primo approccio. Come puoi separare il contratto in più contratti più piccoli? In genere ti costringe a ideare una buona architettura per i tuoi contratti. I contratti più piccoli sono sempre preferiti dal punto di vista della leggibilità del codice. Per dividere i contratti, chiediti:

- Quali funzioni vanno insieme? Ogni insieme di funzioni potrebbe stare meglio nel proprio contratto.
- Quali funzioni non richiedono la lettura dello stato del contratto o solo di un sottoinsieme specifico dello stato?
- Puoi separare l'archiviazione e le funzionalità?

### Librerie {#libraries}

Un modo semplice per allontanare il codice delle funzionalità dall'archiviazione è utilizzare una [libreria](https://docs.soliditylang.org/en/latest/contracts.html#libraries). Non dichiarare le funzioni della libreria come interne, poiché queste verranno [aggiunte al contratto](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) direttamente durante la compilazione. Ma se usi funzioni pubbliche, allora queste si troveranno di fatto in un contratto di libreria separato. Considera l'utilizzo di [using for](https://docs.soliditylang.org/en/latest/contracts.html#using-for) per rendere più comodo l'uso delle librerie.

### Proxy {#proxies}

Una strategia più avanzata sarebbe un sistema di proxy. Le librerie usano `DELEGATECALL` internamente, che esegue semplicemente la funzione di un altro contratto con lo stato del contratto chiamante. Dai un'occhiata all'[aggiornamento degli smart contract](/developers/docs/smart-contracts/upgrading/) per saperne di più sui sistemi di proxy. Ti offrono maggiori funzionalità, ad esempio consentono l'aggiornabilità, ma aggiungono anche molta complessità. Non li aggiungerei solo per ridurre le dimensioni del contratto, a meno che non sia la tua unica opzione per qualsiasi motivo.

## Impatto medio {#medium-impact}

### Rimuovere funzioni {#remove-functions}

Questo dovrebbe essere ovvio. Le funzioni aumentano non poco le dimensioni di un contratto.

- **Esterne**: Spesso aggiungiamo molte funzioni di visualizzazione (view) per motivi di comodità. Va benissimo finché non si raggiunge il limite di dimensione. A quel punto potresti voler pensare seriamente di rimuovere tutte quelle non assolutamente essenziali.
- **Interne**: Puoi anche rimuovere le funzioni interne/private e semplicemente inserire il codice in linea (inline) a patto che la funzione venga chiamata una sola volta.

### Evitare variabili aggiuntive {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Un semplice cambiamento come questo ha fatto una differenza di **0,28kb** quando è stato scritto questo articolo. Il risparmio esatto dipende dalla versione e dalle impostazioni del compilatore (con Solidity 0.8.37 è di circa 0,1kb senza l'ottimizzatore e molto meno con esso), quindi misura sempre. È probabile che tu possa trovare molte situazioni simili nei tuoi contratti e queste possono davvero sommarsi fino a raggiungere quantità significative.

### Accorciare i messaggi di errore {#shorten-error-message}

I messaggi di revert lunghi e in particolare molti messaggi di revert diversi possono gonfiare il contratto. Usa invece codici di errore brevi e decodificali nel tuo contratto. Un messaggio lungo potrebbe diventare molto più corto:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Usare errori personalizzati invece di messaggi di errore {#use-custom-errors-instead-of-error-messages}

Gli errori personalizzati sono stati introdotti in [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Sono un ottimo modo per ridurre le dimensioni dei tuoi contratti, perché sono codificati nell'ABI come selettori (proprio come le funzioni).

```solidity
error Unauthorized();

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### Considerare un valore di esecuzione basso nell'ottimizzatore {#consider-a-low-run-value-in-the-optimizer}

Puoi anche modificare le impostazioni dell'ottimizzatore. Il valore predefinito di 200 significa che sta cercando di ottimizzare il bytecode come se una funzione venisse chiamata 200 volte. Se lo modifichi a 1, in pratica dici all'ottimizzatore di ottimizzare per il caso in cui ogni funzione venga eseguita una sola volta. Una funzione ottimizzata per essere eseguita una sola volta significa che è ottimizzata per la distribuzione stessa. Tieni presente che **questo aumenta i [costi del gas](/developers/docs/gas/) per l'esecuzione delle funzioni**, quindi potresti non volerlo fare. Se compili con `viaIR` abilitato, controlla le dimensioni con e senza di esso, poiché il generatore di codice basato su IR può produrre dimensioni del bytecode notevolmente diverse. Consulta le [opzioni dell'ottimizzatore](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options) per i dettagli.

## Impatto basso {#small-impact}

### Evitare di passare struct alle funzioni {#avoid-passing-structs-to-functions}

Se stai usando l'[ABI coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma) (il predefinito da Solidity 0.8.0), può essere utile non passare struct a una funzione. Invece di passare il parametro come struct, passa direttamente i parametri richiesti. In questo esempio abbiamo risparmiato un altro **0,1kb**.

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### Dichiarare la corretta visibilità per funzioni e variabili {#declare-correct-visibility-for-functions-and-variables}

- Funzioni o variabili che vengono chiamate solo dall'esterno? Dichiarale come `external` invece di `public`.
- Funzioni o variabili chiamate solo dall'interno del contratto? Dichiarale come `private` o `internal` invece di `public`.

### Rimuovere i modificatori {#remove-modifiers}

I modificatori, specialmente se usati intensamente, potrebbero avere un impatto significativo sulle dimensioni del contratto. Prendi in considerazione l'idea di rimuoverli e di usare invece le funzioni.

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

Questi suggerimenti dovrebbero aiutarti a ridurre significativamente le dimensioni del contratto. Ancora una volta, non lo sottolineerò mai abbastanza, concentrati sempre sulla divisione dei contratti, se possibile, per ottenere l'impatto maggiore.
