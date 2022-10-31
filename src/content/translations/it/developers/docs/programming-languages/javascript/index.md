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

È possibile utilizzare queste librerie per interagire con gli Smart Contract su Ethereum, nel qual caso si può creare una dapp in cui JavaScript viene utilizzato solo per interagire con i contratti preesistenti.

**Dai un'occhiata a:**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _– Contiene l'implementazione del portafoglio di Ethereum e le utility in JavaScript e TypeScript._

### Smart Contract {#smart-contracts}

Se sei uno sviluppatore JavaScript e vuoi scrivere uno Smart Contract personalizzato, consigliamo di familiarizzare con [Solidity](https://solidity.readthedocs.io). Questo è il linguaggio degli smart contract più popolare ed è sintatticamente simile a JavaScript, il che lo rende facile da imparare.

Scopri di più sugli [Smart Contract](/developers/docs/smart-contracts/).

## Comprendere il protocollo {#understand-the-protocol}

### La macchina virtuale Ethereum {#the-ethereum-virtual-machine}

Esiste un'implementazione JavaScript della [macchina virtuale di Ethereum](/en/developers/docs/evm/), che supporta le regole più recenti relative alle diramazioni della rete. Le regole relative alle diramazioni si riferiscono alle modifiche apportate alla macchina virtuale di Ethereum (EVM) a seguito di upgrade pianificati.

È suddivisa in vari pacchetti JavaScript che puoi leggere per comprendere meglio:

- Account
- Blocchi
- La blockchain stessa
- Transazioni
- E molto altro...

Ti aiuterà a comprendere ad esempio la struttura dati di un account.

Se preferisci invece leggere codice, questo codice JavaScript può essere un'alternativa interessante alla lettura della nostra documentazione.

**Guarda il monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Nodi e client {#nodes-and-clients}

Un client Ethereumjs è in fase di sviluppo. Permetterà di approfondire come funzionano i client Ethereum in un linguaggio che conosci.

**Guarda il client**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-client)

## Altri progetti {#other-projects}

Ci sono molte altre novità nel mondo di JavaScript per Ethereum, tra cui:

- librerie di utilità per i portafogli.
- strumenti per generare, importare ed esportare chiavi Ethereum.
- un'implementazione di `merkle-patricia-tree`, una struttura di dati delineata nel yellow paper di Ethereum.

Approfondisci ciò che ti interessa maggiormente sul [repo EthereumJSrepo](https://github.com/ethereumjs)

## Letture consigliate {#further-reading}

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_
