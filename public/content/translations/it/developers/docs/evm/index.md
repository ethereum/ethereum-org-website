---
title: Macchina Virtuale Ethereum (EVM)
description: Un'introduzione alla Macchina Virtuale di Ethereum e a come si relaziona allo stato, alle transazioni e ai contratti intelligenti.
lang: it
---

La Macchina Virtuale di Ethereum (EVM) è un ambiente virtuale decentralizzato che esegue il codice con coerenza e sicurezza su tutti i nodi di Ethereum. I nodi eseguono l'EVM per eseguire i contratti intelligenti, utilizzando "[gas](/developers/docs/gas/)" per misurare lo sforzo computazionale richiesto per le [operazioni](/developers/docs/evm/opcodes/), assicurando un'allocazione efficiente delle risorse e la sicurezza della rete.

## Prerequisiti {#prerequisites}

Per comprendere l'EVM è necessaria una certa familiarità con la terminologia comune dell'informatica, come [byte](https://wikipedia.org/wiki/Byte), [memoria](https://wikipedia.org/wiki/Computer_memory) e [stack](https://wikipedia.org/wiki/Stack_\(abstract_data_type\)). Sarebbe anche utile avere familiarità con i concetti di crittografia/blockchain come le [funzioni di hash](https://wikipedia.org/wiki/Cryptographic_hash_function) e l'[albero di Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Dal libro mastro alla macchina a stati {#from-ledger-to-state-machine}

Per descrivere blockchain come Bitcoin, viene spesso utilizzata l'analogia con un "libro mastro distribuito", che permette l'esistenza di una valuta decentralizzata utilizzando strumenti base della crittografia. Il libro mastro mantiene un registro delle attività che deve aderire a una serie di regole che governano ciò che qualcuno può e non può fare per modificarlo. Ad esempio, un indirizzo Bitcoin non può spendere più Bitcoin di quanti ne abbia ricevuti in precedenza. Queste regole sono alla base di tutte le transazioni su Bitcoin e di molte altre blockchain.

Sebbene Ethereum abbia la sua criptovaluta nativa (ether) che segue quasi esattamente le stesse regole intuitive, abilita anche una funzione molto più potente: i [contratti intelligenti](/developers/docs/smart-contracts/). Per questa caratteristica più complessa, è necessaria un'analogia più complessa. Invece di essere un libro mastro distribuito, Ethereum è una [macchina a stati](https://wikipedia.org/wiki/Finite-state_machine) distribuita. Lo stato di Ethereum è una grande struttura dati che contiene non solo tutti i conti e i saldi, ma anche uno _stato della macchina_, che può cambiare da blocco a blocco secondo una serie di regole predefinite e che può eseguire codice macchina arbitrario. Le regole specifiche di cambio stato da blocco a blocco sono definite dall'EVM.

![Un diagramma che mostra la composizione dell'EVM](./evm.png)
_Diagramma adattato da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## La funzione di transizione di stato di Ethereum {#the-ethereum-state-transition-function}

L'EVM si comporta come una funzione matematica: dato un input, produce un output deterministico. È quindi molto utile descrivere più formalmente Ethereum come avente una **funzione di transizione di stato**:

```
Y(S, T)= S'
```

Dato un vecchio stato valido `(S)` e un nuovo insieme di transazioni valide `(T)`, la funzione di transizione di stato di Ethereum `Y(S, T)` produce un nuovo stato di output valido `S'`

### Stato {#state}

Nel contesto di Ethereum, lo stato è un'enorme struttura dati chiamata [Merkle Patricia Trie modificato](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), che mantiene tutti i [conti](/developers/docs/accounts/) collegati da hash e riducibili a un singolo hash radice memorizzato sulla blockchain.

### Transazioni {#transactions}

Le transazioni sono istruzioni firmate crittograficamente, provenienti dai conti. Esistono due tipi di transazioni: quelle che danno luogo a chiamate di messaggio e quelle che invece danno luogo alla creazione di contratti.

La creazione di un contratto comporta la creazione di un nuovo conto di contratto contenente il bytecode del [contratto intelligente](/developers/docs/smart-contracts/anatomy/) compilato. Ogni volta che un altro conto effettua una chiamata di messaggio a quel contratto, esegue il suo bytecode.

## Istruzioni EVM {#evm-instructions}

L'EVM esegue come una [macchina a stack](https://wikipedia.org/wiki/Stack_machine) con una profondità di 1024 elementi. Ogni elemento è una parola di 256 bit, scelta per la facilità d'uso con la crittografia a 256 bit (come gli hash Keccak-256 o le firme secp256k1).

Durante l'esecuzione, l'EVM mantiene una _memoria_ transitoria (come un array di byte indirizzato a parola), che non persiste tra le transazioni.

### Archiviazione transitoria

L'archiviazione transitoria è un archivio chiave-valore per transazione, a cui si accede tramite i codici operativi `TSTORE` e `TLOAD`. Persiste attraverso tutte le chiamate interne durante la stessa transazione, ma viene cancellata alla fine della transazione. A differenza della memoria, l'archiviazione transitoria è modellata come parte dello stato dell'EVM piuttosto che del frame di esecuzione, ma non viene salvata nello stato globale. L'archiviazione transitoria consente la condivisione temporanea dello stato efficiente in termini di gas tra le chiamate interne durante una transazione.

### Storage

I contratti contengono un trie di _archiviazione_ Merkle Patricia (come un array di parole indirizzabile a parola), associato al conto in questione e parte dello stato globale. Questa archiviazione persistente si differenzia dall'archiviazione transitoria, che è disponibile solo per la durata di una singola transazione e non fa parte del trie di archiviazione persistente del conto.

### Codici operativi

Il bytecode del contratto intelligente compilato viene eseguito come una serie di [opcode](/developers/docs/evm/opcodes) EVM, che eseguono operazioni standard dello stack come `XOR`, `AND`, `ADD`, `SUB`, ecc. L'EVM implementa anche una serie di operazioni stack specifiche della blockchain, come `ADDRESS`, `BALANCE`, `BLOCKHASH`, ecc. Il set di opcode include anche `TSTORE` e `TLOAD`, che forniscono l'accesso all'archiviazione transitoria.

![Un diagramma che mostra dove è necessario il gas per le operazioni EVM](../gas/gas.png)
_Diagrammi adattati da [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementazioni EVM {#evm-implementations}

Tutte le implementazioni dell'EVM devono rispettare le specifiche descritte nello Yellowpaper di Ethereum.

Nei dieci anni di storia di Ethereum, l'EVM ha subito diverse revisioni, ed esistono diverse implementazioni dell'EVM in vari linguaggi di programmazione.

I [client di esecuzione di Ethereum](/developers/docs/nodes-and-clients/#execution-clients) includono un'implementazione dell'EVM. Inoltre, esistono diverse implementazioni standalone, tra cui:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Ulteriori letture {#further-reading}

- [Yellowpaper di Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper, noto anche come KEVM: Semantica dell'EVM in K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Codici operativi della Macchina Virtuale di Ethereum](https://www.ethervm.io/)
- [Riferimento interattivo ai codici operativi della Macchina Virtuale di Ethereum](https://www.evm.codes/)
- [Una breve introduzione nella documentazione di Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum - La Macchina Virtuale di Ethereum](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Argomenti correlati {#related-topics}

- [Gas](/developers/docs/gas/)
