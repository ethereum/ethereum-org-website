---
title: Ethereum per gli sviluppatori JavaScript
description: Scopri come sviluppare per Ethereum usando progetti e strumenti basati su JavaScript.
lang: it
---

JavaScript è tra i linguaggi più popolari nell'ecosistema Ethereum, con implementazioni in JavaScript e TypeScript di tutto, dalle primitive del protocollo di base a un client di consenso di produzione.

Ci sono opportunità per scrivere in JavaScript (o qualcosa di simile) a [tutti i livelli dello stack](/developers/docs/ethereum-stack/).

## Interagire con Ethereum {#interact-with-ethereum}

### Librerie di API JavaScript {#javascript-api-libraries}

Se desideri scrivere in JavaScript per interrogare la blockchain, inviare transazioni e altro ancora, il modo più conveniente per farlo è usare una [libreria di API JavaScript](/developers/docs/apis/javascript/). Queste API consentono agli sviluppatori di interagire facilmente con i [nodi della rete Ethereum](/developers/docs/nodes-and-clients/).

Puoi usare queste librerie per interagire con gli smart contract su Ethereum, in modo che sia possibile creare un'applicazione decentralizzata (dapp) in cui usi semplicemente JavaScript per interagire con contratti preesistenti.

**Dai un'occhiata a**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _include l'implementazione di un portafoglio Ethereum e utilità in JavaScript e TypeScript._
- [Viem](https://viem.sh) – _un'interfaccia TypeScript per Ethereum che fornisce primitive senza stato di basso livello per interagire con Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _una meta-libreria TypeScript con caching integrato, hook e mock di test per uno sviluppo su Ethereum senza sforzo attraverso le librerie Web3._

### Smart contract {#smart-contracts}

Se sei uno sviluppatore JavaScript e vuoi scrivere il tuo smart contract, potresti voler familiarizzare con [Solidity](https://solidity.readthedocs.io). Questo è il linguaggio per smart contract più popolare ed è sintatticamente simile a JavaScript, il che potrebbe renderlo più facile da imparare.

Maggiori informazioni sugli [smart contract](/developers/docs/smart-contracts/).

## Comprendere il protocollo {#understand-the-protocol}

### La macchina virtuale di Ethereum {#the-ethereum-virtual-machine}

Esiste un'implementazione in JavaScript della [macchina virtuale di Ethereum](/developers/docs/evm/). Supporta le ultime regole di fork. Le regole di fork si riferiscono alle modifiche apportate all'EVM a seguito di aggiornamenti pianificati.

È suddivisa in vari pacchetti JavaScript che puoi consultare per comprendere meglio:

- Account
- Blocchi
- La blockchain stessa
- Transazioni
- E altro ancora...

Questo ti aiuterà a capire cose come "qual è la struttura dati di un account?".

Se preferisci leggere il codice, questo JavaScript potrebbe essere un'ottima alternativa alla lettura della nostra documentazione.

**Dai un'occhiata all'EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Nodi e client {#nodes-and-clients}

[Lodestar](https://lodestar.chainsafe.io/) è un client di consenso pronto per la produzione scritto in TypeScript e mantenuto da ChainSafe. Include un nodo beacon e un client validatore, ed è un buon punto di partenza per vedere come funziona il consenso Proof-of-Stake (PoS) di Ethereum in un linguaggio che conosci.

**Dai un'occhiata a Lodestar**  
[`ChainSafe/lodestar`](https://github.com/ChainSafe/lodestar)

Sul lato dell'esecuzione, il client EthereumJS è deprecato e archiviato, ma il suo codice sorgente rimane disponibile per esplorare come funziona un client Ethereum in JavaScript.

**Dai un'occhiata al client archiviato**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/archive/client)

## Altri progetti {#other-projects}

Ci sono anche molte altre cose in corso nel mondo di Ethereum JavaScript, tra cui:

- librerie di utilità per portafogli.
- strumenti per generare, importare ed esportare chiavi Ethereum.
- un'implementazione del `merkle-patricia-tree` – una struttura dati delineata nello yellow paper di Ethereum.

Approfondisci ciò che ti interessa di più nella [repository di EthereumJS](https://github.com/ethereumjs)

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_
