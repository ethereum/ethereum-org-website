---
title: Ethereum per sviluppatori JavaScript
description: Impara a sviluppare per Ethereum usando progetti e strumenti basati su JavaScript.
lang: it
---

JavaScript è tra i linguaggi più popolari nell'ecosistema Ethereum. Infatti, c'è un [team](https://github.com/ethereumjs) dedicato a portare quanto più Ethereum possibile in JavaScript.

Esistono opportunità per scrivere in JavaScript (o qualcosa di simile) a [tutti i livelli dello stack](/developers/docs/ethereum-stack/).

## Interagire con Ethereum {#interact-with-ethereum}

### Librerie API JavaScript {#javascript-api-libraries}

Se desideri scrivere in JavaScript per interrogare la blockchain, inviare transazioni e altro ancora, il modo più comodo per farlo è utilizzare una [libreria API JavaScript](/developers/docs/apis/javascript/). Queste API consentono agli sviluppatori di interagire facilmente con i [nodi della rete Ethereum](/developers/docs/nodes-and-clients/).

Puoi utilizzare queste librerie per interagire con i contratti intelligenti su Ethereum, quindi è possibile creare una dapp in cui, semplicemente, utilizzi JavaScript per interagire con i contratti pre-esistenti.

**Dai un'occhiata**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _Contiene l'implementazione del portafoglio di Ethereum e le utility in JavaScript e TypeScript._
- [viem](https://viem.sh) – _un'interfaccia TypeScript per Ethereum che fornisce primitive stateless di basso livello per interagire con Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _una meta-libreria TypeScript con caching, hook e mock di test integrati per uno sviluppo Ethereum agevole tra le librerie web3._

### Contratti intelligenti {#smart-contracts}

Se sei uno sviluppatore JavaScript e desideri scrivere il tuo contratto intelligente, ti consigliamo di familiarizzare con [Solidity](https://solidity.readthedocs.io). Questo è il linguaggio di contratti intelligenti più popolare ed è sintatticamente simile a JavaScript, che lo rende più facile da imparare.

Maggiori informazioni sui [contratti intelligenti](/developers/docs/smart-contracts/).

## Comprendere il protocollo {#understand-the-protocol}

### La macchina virtuale di Ethereum {#the-ethereum-virtual-machine}

Esiste un'implementazione JavaScript della [macchina virtuale di Ethereum](/developers/docs/evm/). che supporta le regole più recenti relative alle diramazioni della rete. Le regole relative alle diramazioni si riferiscono alle modifiche apportate alla macchina virtuale di Ethereum (EVM) a seguito di upgrade pianificati.

È suddivisa in vari pacchetti JavaScript che puoi leggere per comprendere meglio:

- Conti
- Blocchi
- La blockchain stessa
- Transazioni
- E molto altro...

Ciò ti aiuterà a comprendere cose come "cos'è la struttura dei dati di un conto?".

Se preferisci invece leggere codice, questo codice JavaScript può essere un'alternativa interessante alla lettura della nostra documentazione.

**Consulta l'EVM**
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Nodi e client {#nodes-and-clients}

Un client di Ethereumjs è in sviluppo attivo e ti consentirà di approfondire il funzionamento dei client di Ethereum in un linguaggio che comprendi: JavaScript!

**Consulta il client**
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Altri progetti {#other-projects}

Ci sono molte altre novità nel mondo di JavaScript per Ethereum, tra cui:

- librerie di utilità per i portafogli.
- strumenti per generare, importare ed esportare chiavi Ethereum.
- un'implementazione di `merkle-patricia-tree` – una struttura dati descritta nello Yellow Paper di Ethereum.

Approfondisci ciò che ti interessa di più nel [repository EthereumJS](https://github.com/ethereumjs)

## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_
