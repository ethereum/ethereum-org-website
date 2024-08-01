---
title: Ethereum per sviluppatori JavaScript
description: Impara a sviluppare per Ethereum usando progetti e strumenti basati su JavaScript.
lang: it
---

JavaScript è tra i linguaggi più popolari nell'ecosistema Ethereum. C'è persino un [team](https://github.com/ethereumjs) che si occupa di trasferire Ethereum il più possibile in JavaScript.

Esistono opportunità per scrivere in JavaScript (o simile) a [tutti i livelli dello stack](/developers/docs/ethereum-stack/).

## Interagire con Ethereum {#interact-with-ethereum}

### Librerie API JavaScript {#javascript-api-libraries}

Se vuoi scrivere in JavaScript per interrogare la blockchain, inviare transazioni e altro ancora, il modo più comodo per farlo è utilizzare una [libreria API JavaScript](/developers/docs/apis/javascript/). Queste API consentono agli sviluppatori di interagire facilmente con i [nodi della rete Ethereum](/developers/docs/nodes-and-clients/).

Puoi utilizzare queste librerie per interagire con i contratti intelligenti su Ethereum, quindi è possibile creare una dapp in cui, semplicemente, utilizzi JavaScript per interagire con i contratti pre-esistenti.

**Dai un'occhiata a:**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _– Contiene l'implementazione del portafoglio di Ethereum e le utility in JavaScript e TypeScript._
- [viem](https://viem.sh): un'interfaccia TypeScript per Ethereum che fornisce primitivi con assenza di stato di basso livello per interagire con Ethereum.

### Contratti intelligenti {#smart-contracts}

Se sei uno sviluppatore JavaScript e vorresti scrivere il tuo contratto intelligente, consigliamo di familiarizzare con [Solidity](https://solidity.readthedocs.io). Questo è il linguaggio di contratti intelligenti più popolare ed è sintatticamente simile a JavaScript, che lo rende più facile da imparare.

Di più sui [contratti intelligenti](/developers/docs/smart-contracts/).

## Comprendere il protocollo {#understand-the-protocol}

### La macchina virtuale Ethereum {#the-ethereum-virtual-machine}

Esiste un'implementazione JavaScript della [macchina virtuale di Ethereum](/en/developers/docs/evm/), che supporta le regole più recenti relative alle diramazioni della rete. Le regole relative alle diramazioni si riferiscono alle modifiche apportate alla macchina virtuale di Ethereum (EVM) a seguito di upgrade pianificati.

È suddivisa in vari pacchetti JavaScript che puoi leggere per comprendere meglio:

- Conti
- Blocchi
- La blockchain stessa
- Transazioni
- E molto altro...

Ciò ti aiuterà a comprendere cose come "cos'è la struttura dei dati di un conto?".

Se preferisci invece leggere codice, questo codice JavaScript può essere un'alternativa interessante alla lettura della nostra documentazione.

**Guarda il monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Nodi e client {#nodes-and-clients}

Un client di Ethereumjs è in sviluppo attivo e ti consentirà di approfondire il funzionamento dei client di Ethereum in un linguaggio che comprendi: JavaScript!

Era ospitato in una [`repository`](https://github.com/ethereumjs/ethereumjs-client) indipendente, tuttavia, è stato in seguito unito nella repository singola di EthereumVM come pacchetto.

**Guarda il client**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Altri progetti {#other-projects}

Ci sono molte altre novità nel mondo di JavaScript per Ethereum, tra cui:

- librerie di utilità per i portafogli.
- strumenti per generare, importare ed esportare chiavi Ethereum.
- un'implementazione di `merkle-patricia-tree`, una struttura di dati delineata nel yellow paper di Ethereum.

Approfondisci ciò che ti interessa maggiormente sulla [repository EthereumJS](https://github.com/ethereumjs)

## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_
