---
title: "Decompilare un contratto"
description: Come comprendere un contratto quando non hai il codice sorgente
author: Ori Pomerantz
lang: it
tags:
  - "evm"
  - "opcode"
skill: advanced
published: 2021-12-30
---

## Introduzione {#introduction}

_Non ci sono segreti sulla blockchain_: tutto ciò che si verifica è coerente, verificabile e disponibile pubblicamente. Idealmente, il codice sorgente dei [contratti dovrebbe essere pubblicato e verificato su Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Però [non sempre è così](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). In questo articolo imparerai come decompilare i contratti guardando un contratto privo del codice sorgente, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Esistono dei decompilatori, ma non producono sempre [risultati utilizzabili](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). In questo articolo imparerai come decompilare manualmente e comprendere un contratto dagli [opcode](https://github.com/wolflo/evm-opcodes), nonché come interpretare i risultati di un decompilatore.

Per poter comprendere questo articolo dovresti già conoscere le basi dell'EVM ed avere una certa familiarità con l'assembler dell'EVM. [Puoi leggere articoli su questi argomenti qui](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Preparare il codice eseguibile {#prepare-the-executable-code}

Puoi ottenere gli opcode andando su Etherscan per il contratto, facendo clic sulla scheda **Contract** e poi **Switch to Opcodes View**. Ottieni una vista composta da un opcode per riga.

![Vista dell'opcode da Etherscan](opcode-view.png)

Per poter comprendere i salti, però, devi sapere dove si trova ogni opcode nel codice. Per farlo, un modo è aprire un Foglio di calcolo di Google e incollare gli opcode nella colonna C. [Puoi saltare i passaggi successivi creando una copia di questo foglio di calcolo già pronto](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Il prossimo passaggio è ottenere le posizioni corrette del codice, così da poter comprendere i salti. Inseriremo la dimensione dell'opcode nella colonna B e la posizione (in esadecimale) nella colonna A. Digita questa funzione nella cella `B1` e poi copiala e incollala per il resto della colonna B, fino alla fine del codice. Dopo averlo fatto, puoi nascondere la colonna B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Questa funzione aggiunge prima un byte per l'opcode stesso e poi cerca `PUSH`. Gli opcode push sono speciali perché hanno bisogno di byte aggiuntivi affinché venga eseguito il push del valore. Se l'opcode è un `PUSH`, estraiamo il numero di byte e lo aggiungiamo.

In `A1` inserisci il primo scostamento: zero. Poi, in `A2`, inserisci questa funzione e di nuovo copiala e incollala per il resto della colonna A:

```
=dec2hex(hex2dec(A1)+B1)
```

Ci serve che questa funzione ci restituisca il valore esadecimale perché i valori su cui è stato eseguito il push prima dei salti (`JUMP` e `JUMPI`) ci vengono dati in esadecimali.

## Il Punto d'accesso (0x00) {#the-entry-point-0x00}

I contratti sono sempre eseguiti dal primo byte. Questa è la parte iniziale del codice:

| Offset | Opcode       | Stack (dopo l'opcode) |
| -----: | ------------ | --------------------- |
|      0 | PUSH1 0x80   | 0x80                  |
|      2 | PUSH1 0x40   | 0x40, 0x80            |
|      4 | MSTORE       | Vuoto                 |
|      5 | PUSH1 0x04   | 0x04                  |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04     |
|      8 | LT           | CALLDATASIZE<4        |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE<4   |
|      C | JUMPI        | Vuoto                 |

Questo codice fa due cose:

1. Scrive 0x80 come un valore a 32 byte nelle posizioni di memoria 0x40-0x5F (0x80 è memorizzato in 0x5F e 0x40-0x5E sono tutti zeri).
2. Legge la dimensione dei calldata. Normalmente i dati della chiamata per un contratto di Ethereum seguono [l'ABI (Application Binary Interface, interfaccia binaria dell'applicazione)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), che richiede come minimo quattro byte per il selettore della funzione. Se la dimensione dei dati della chiamata è inferiore a quattro, salta a 0x5E.

![Diagramma di flusso per questa parte](flowchart-entry.png)

### Il Gestore a 0x5E (per i dati della chiamata non ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Opcode       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Questo frammento inizia con un `JUMPDEST`. I programmi dell'EVM (macchina virtuale di Ethereum) lanciano un'eccezione se salti a un opcode che non è `JUMPDEST`. Poi guarda la CALLDATASIZE e se è "true" (ovvero, non è zero) salta a 0x7C. Lo vedremo di seguito.

| Offset | Opcode     | Stack (dopo l'opcode)                                                          |
| -----: | ---------- | ------------------------------------------------------------------------------ |
|     64 | CALLVALUE  | [Wei](/glossary/#wei) fornito dalla chiamata. Chiamato `msg.value` in Solidity |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                    |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                                  |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                        |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                      |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                             |

Quindi quando non ci sono dati della chiamata leggiamo il valore di Storage[6]. Non sappiamo ancora cosa sia questo valore, ma possiamo cercare delle transazioni ricevute dal contratto prive di dati della chiamata. Le transazioni che trasferiscono semplicemente ETH senza alcun dato della chiamata (e dunque senza metodo) contengono in Etherscan il metodo `Transfer`. Difatti, [la prima vera transazione ricevuta dal contratto](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) è un trasferimento.

Se guardiamo in quella transazione e facciamo clic su **Click to see More**, vediamo che i dati della chiamata, detti dati di input, sono vuoti (`0x`). Nota anche che il valore è 1,559 ETH, che sarà rilevante in seguito.

![I dati della chiamata sono vuoti](calldata-empty.png)

A questo punto, fai clic sulla scheda **State** ed espandi il contratto che stiamo decompilando (0x2510...). Puoi vedere che `Storage[6]` è cambiato durante la transazione e, passando da Hex a **Number**, vedrai che è diventato 1.559.000.000.000.000.000, il valore trasferito in wei (ho aggiunto i punti per chiarezza), corrispondente al valore del contratto successivo.

![Il cambiamento in Storage[6]](storage6.png)

Se guardiamo i cambiamenti di stato causati da [altre transazioni `Transfer` dallo stesso periodo](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange), vediamo che `Storage[6]` ha monitorato il valore del contratto per un po'. Per ora lo chiameremo `Value*`. L'asterisco (`*`) ci ricorda che ancora non _sappiamo_ cosa faccia questa variabile, ma non può servire solo a tracciare il valore del contratto, poiché non è necessario utilizzare l'archiviazione, essendo molto costosa, quando si può ottenere il saldo dei conti utilizzando `ADDRESS BALANCE`. Il primo opcode effettua il push dell'indirizzo del contratto. Il secondo legge l'indirizzo in cima allo stack e lo sostituisce con il saldo di quell'indirizzo.

| Offset | Opcode       | Stack                                       |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |                                             |

Continueremo a monitorare questo codice alla destinazione del salto.

| Offset | Opcode     | Stack                                                       |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

Il `NOT` opera su singoli bit, quindi annulla il valore di ogni bit nel valore della chiamata.

| Offset | Opcode       | Stack                                                                       |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |                                                                             |

Saltiamo se `Value*` è inferiore o pari a 2^256-CALLVALUE-1. Questa sembra una logica per prevenire l'overflow. E in effetti vediamo che dopo alcune operazioni senza senso (la scrittura sulla memoria sta per essere eliminata, ad esempio), all'offset 0x01DE il contratto si annulla se viene rilevato l'overflow, il che è comportamento normale.

Nota che l'overflow è estremamente improbabile, perché richiederebbe che il valore della chiamata più `Value*` fosse comparabile a 2^256 wei, circa 10^59 ETH. [La quantità totale di ETH, al momento della scrittura, è inferiore a duecento milioni](https://etherscan.io/stat/supply).

| Offset | Opcode   | Stack                                     |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |                                           |

Se siamo arrivati qui, ottieni `Value* + CALLVALUE` e salta all'offset 0x75.

| Offset | Opcode   | Stack                           |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

Se siamo arrivati qui (che richiede che i dati della chiamata siano vuoti), aggiungiamo il valore della chiamata a `Value*`. Ciò è coerente con ciò che diciamo che facciano le transazioni `Transfer`.

| Offset | Opcode |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Infine, cancelliamo lo stack (che non è necessario) e segnaliamo che la transazione è andata a buon fine.

Per riassumere tutto, ecco un diagramma di flusso per il codice iniziale.

![Diagramma di flusso dei punti d'accesso](flowchart-entry.png)

## Il Gestore a 0x7C {#the-handler-at-0x7c}

Volutamente ho omesso di inserire nell'intestazione cosa fa questo gestore. Il punto non è insegnarti come funziona questo contratto specifico, ma come decompilare i contratti. Imparerai cosa faccia come ho fatto io, seguendo il codice.

Arriviamo qui da diversi punti:

- Se ci sono dati della chiamata di 1, 2 o 3 byte (dall'offset 0x63)
- Se la firma del metodo non è nota (dagli offset 0x42 e 0x5D)

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |                      |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

Questa è un'altra cella di memoria; non riuscivo a trovarla in nessuna transazione quindi è più difficile sapere cosa significhi. Il codice seguente lo chiarirà.

| Offset | Opcode                                            | Stack                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

Questi opcode troncano il valore che leggiamo da Storage[3] a 160 bit, la lunghezza di un indirizzo di Ethereum.

| Offset | Opcode | Stack                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

Questo salto è superfluo, poiché stiamo andando all'opcode successivo. Questo codice non è tanto efficiente a livello di gas, rispetto a quanto potrebbe.

| Offset | Opcode     | Stack                           |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

All'inizio del codice, impostiamo Mem[0x40] a 0x80. Se cerchiamo 0x40 in seguito, vediamo che non lo cambiamo, quindi supponiamo che sia 0x80.

| Offset | Opcode       | Stack                                             |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

Copia tutti i dati della chiamata nella memoria, a partire da 0x80.

| Offset | Opcode        | Stack                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |                                                                                  |

Ora le cose sono molto più chiare. Questo contratto può fungere da [proxy](https://blog.openzeppelin.com/proxy-patterns/), chiamando l'indirizzo in Storage[3] per compiere il vero lavoro. `DELEGATE_CALL` chiama un contratto separato, ma resta nella stessa memoria. Questo significa che il contratto delegato, quello per cui siamo un proxy, accede allo stesso spazio d'archiviazione. I parametri per la chiamata sono:

- _Gas_: Tutto il gas rimanente
- _Indirizzo chiamato_: Storage[3]-as-address
- _dati della chiamata_: i byte CALLDATASIZE che iniziano a 0x80, ovvero dove inseriamo i dati di chiamata originali
- _Dati restituiti_: nessuno (0x00 - 0x00) Otterremo i dati restituiti con altri mezzi (vedi di seguito)

| Offset | Opcode         | Stack                                                                                         |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

Qui copiamo tutti i dati restituiti al buffer di memoria partendo a 0x80.

| Offset | Opcode       | Stack                                                                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1         | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO       | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     BC | JUMPI        | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2         | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address          |
|     BF | RETURN       |                                                                                                                              |

Quindi, dopo la chiamata, copiamo i dati restituiti al buffer 0x80 - 0x80+RETURNDATASIZE, e se la chiamata è andata a buon fine `RETURN` esattamente con quel buffer.

### DELEGATECALL fallita {#delegatecall-failed}

Se arriviamo qui, a 0xC0, significa che il contratto che abbiamo chiamato è annullato. Poiché siamo solo un proxy per quel contratto, vogliamo restituire gli stessi dati e annullare a nostra volta.

| Offset | Opcode   | Stack                                                                                                               |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2     | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     C3 | REVERT   |                                                                                                                     |

Quindi noi `REVERT` con lo stesso buffer usato prima per `RETURN`: 0x80 - 0x80+RETURNDATASIZE

![Chiamata al diagramma di flusso del proxy](flowchart-proxy.png)

## Chiamate ABI {#abi-calls}

Se la dimensione dei dati della chiamata è di quattro byte o superiore, potrebbe essere una chiamata ABI valida.

| Offset | Opcode       | Stack                                                     |
| -----: | ------------ | --------------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                                      |
|      F | CALLDATALOAD | (((Prima parola (256 bit) dei dati della chiamata)))      |
|     10 | PUSH1 0xe0   | 0xE0 (((Prima parola (256 bit) dei dati della chiamata))) |
|     12 | SHR          | (((primi 32 bit (4 byte) dei dati della chiamata)))       |

Etherscan ci dice che `1C` è un opcode sconosciuto, perché [è stato aggiunto dopo che Etherscan aveva scritto questa funzionalità](https://eips.ethereum.org/EIPS/eip-145) e non l'ha aggiornata. An [up to date opcode table](https://github.com/wolflo/evm-opcodes) shows us that this is shift right

| Offset | Opcode           | Stack                                                                                                              |
| -----: | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
|     13 | DUP1             | (((primi 32 bit (4 byte) dei dati della chiamata))) (((primi 32 bit (4 byte) dei dati della chiamata)))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((primi 32 bit (4 byte) dei dati della chiamata))) (((primi 32 bit (4 byte) dei dati della chiamata))) |
|     19 | GT               | 0x3CD8045E>first-32-bits-of-the-call-data (((primi 32 bit (4 byte) dei dati della chiamata)))                      |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>first-32-bits-of-the-call-data (((primi 32 bit (4 byte) dei dati della chiamata)))                 |
|     1D | JUMPI            | (((primi 32 bit (4 byte) dei dati della chiamata)))                                                                |

Dividere le prove di corrispondenza della firma del metodo in due, in questo modo, permette di risparmiare in media metà delle prove. Il codice che segue immediatamente questo e il codice in 0x43 seguono lo stesso schema: `DUP1` i primi 32 bit dei dati della chiamata, `PUSH4 (((method signature>`, esegui `EQ` per verificare l'uguaglianza e poi `JUMPI` se la firma del metodo corrisponde. Ecco le firme del metodo, i loro indirizzi e, se nota, [la definizione del metodo corrispondente](https://www.4byte.directory/):

| Metodo                                                                                 | Firma del metodo | Offset a cui saltare |
| -------------------------------------------------------------------------------------- | ---------------- | -------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103               |
| ???                                                                                    | 0x81e580d3       | 0x0138               |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158               |
| ???                                                                                    | 0x1f135823       | 0x00C4               |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED               |

Se non è trovata alcuna corrispondenza, il codice salta al [gestore del proxy a 0x7C](#the-handler-at-0x7c), nella speranza che il contratto per cui siamo un proxy abbia una corrispondenza.

![Diagramma di flusso delle chiamate ABI](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Opcode       | Stack                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |                               |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |                               |

La prima cosa che fa questa funzione è controllare che la chiamata non abbia inviato alcun ETH. Questa funzione non è [`pagabile`](https://solidity-by-example.org/payable/). Se qualcuno ci ha invitato degli ETH, deve trattarsi di un errore e vogliamo `REVERT` (RIPRISTINARE) per evitare che tali ETH finiscano per essere irrecuperabili.

| Offset | Opcode                                            | Stack                                                                      |
| -----: | ------------------------------------------------- | -------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |                                                                            |
|    110 | POP                                               |                                                                            |
|    111 | PUSH1 0x03                                        | 0x03                                                                       |
|    113 | SLOAD                                             | (((Storage[3] ovvero il contratto per cui siamo un proxy)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] ovvero il contratto per cui siamo un proxy)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] ovvero il contratto per cui siamo un proxy)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] ovvero il contratto per cui siamo un proxy))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] ovvero il contratto per cui siamo un proxy))) |
|    12D | SWAP2                                             | (((Storage[3] ovvero il contratto per cui siamo un proxy))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                             |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                        |
|    130 | MSTORE                                            | 0x80                                                                       |

E ora 0x80 contiene l'indirizzo del proxy

| Offset | Opcode       | Stack     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Il Codice E4 {#the-e4-code}

Questa è la prima volta che vediamo queste righe, ma sono condivise con altri metodi (vedi di seguito). Quindi chiameremo il valore nello stack X e ricorderemo semplicemente che in `splitter()` il valore di questa X è 0xA0.

| Offset | Opcode     | Stack       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |             |

Quindi questo codice riceve un puntatore di memoria nello stack (X) e fa sì che il contratto dia `RETURN` con un buffer che sia 0x80 - X.

Nel caso di `splitter()`, ciò restituisce l'indirizzo per cui siamo un proxy. `RETURN` restituisce il buffer in 0x80-0x9F, ovvero dove abbiamo scritto questi dati (offset 0x130 sopra).

## currentWindow() {#currentwindow}

Il codice negli offset 0x158-0x163 è identico a quello che abbiamo visto in 0x103-0x10E in `splitter()` (diverso dalla destinazione `JUMPI`), quindi sappiamo che neanche `currentWindow()` è `pagabile`.

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |                      |
|    165 | POP          |                      |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### Il codice DA {#the-da-code}

Questo codice è condiviso anche con altri metodi. Quindi chiameremo il valore nello stack Y e ricorderemo semplicemente che in `currentWindow()` il valore di questa Y è Storage[1].

| Offset | Opcode     | Stack            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Scrivi Y a 0x80-0x9F.

| Offset | Opcode     | Stack          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

E il resto è già spiegato [sopra](#the-e4-code). Quindi salta a 0xDA, scrive la cima dello stack (Y) a 0x80-0x9F e restituisce quel valore. Nel caso di `currentWindow()`, restituisce Storage[1].

## merkleRoot() {#merkleroot}

Il codice negli offset 0xED-0xF8 è identico a quello che abbiamo visto in 0x103-0x10E in `splitter()` (diverso dalla destinazione `JUMPI`), quindi sappiamo che neanche `merkleRoot()` è `pagabile`.

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |                      |
|     FA | POP          |                      |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

Cosa succede dopo il salto, [lo abbiamo già capito](#the-da-code). Quindi `merkleRoot()` restituisce Storage[0].

## 0x81e580d3 {#0x81e580d3}

Il codice negli offset 0x138-0x143 è identico a quello che abbiamo visto in 0x103-0x10E in `splitter()` (diverso dalla destinazione `JUMPI`), quindi sappiamo che neanche questa funzione è `pagabile`.

| Offset | Opcode       | Stack                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |                                                              |
|    145 | POP          |                                                              |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Sembra che questa funzione richieda almeno 32 byte (una parola) di dati della chiamata.

| Offset | Opcode | Stack                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |                                              |

Se non ottiene i dati della chiamata, la transazione è annullata senza alcun dato restituito.

Vediamo cosa succede se la funzione _ottiene_ i dati della chiamata che necessita.

| Offset | Opcode       | Stack                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` è la prima parola della dei dati della chiamata _dopo_ la firma del metodo

| Offset | Opcode       | Stack                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Se la prima parola non è inferiore a Storage[4], la funzione fallisce. Si annulla senza alcun valore restituito:

| Offset | Opcode     | Stack         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |               |

Se calldataload(4) è inferiore a Storage[4], otteniamo questo codice:

| Offset | Opcode     | Stack                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

E le posizioni di memoria 0x00-0x1F ora contengono i dati 0x04 (0x00-0x1E sono tutti zeri, ox1F è quattro)

| Offset | Opcode     | Stack                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Quindi c'è una tabella di ricerca in memoria che inizia allo SHA3 di 0x000...0004 e ha una voce per ogni valore dei dati della chiamata legittimo (valore sotto Storage[4]).

| Offset | Opcode | Stack                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Sappiamo già cosa faccia [il codice all'offset 0xDA](#the-da-code), restituisce il valore massimo dello stack al chiamante. Quindi questa funzione restituisce il valore dalla tabella di ricerca al chiamante.

## 0x1f135823 {#0x1f135823}

Il codice negli offset 0xC4-0xCF è identico a quello che abbiamo visto in 0x103-0x10E in `splitter()` (diverso dalla destinazione `JUMPI`), quindi sappiamo che neanche questa funzione è `pagabile`.

| Offset | Opcode       | Stack             |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |                   |
|     D1 | POP          |                   |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

Sappiamo già cosa faccia [il codice all'offset 0xDA](#the-da-code), restituisce il valore massimo dello stack al chiamante. Quindi questa funzione restituisce `Value*`.

### Riepilogo del metodo {#method-summary}

Senti di comprendere il contratto a questo punto? Io no. Finora abbiamo questi metodi:

| Metodo                            | Significato                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Trasferimento                     | Accetta il valore fornito dalla chiamata e aumenta `Value*` di quell'importo                              |
| [splitter()](#splitter)           | Restituisci Storage[3], l'indirizzo del proxy                                                             |
| [currentWindow()](#currentwindow) | Restituisci Storage[1]                                                                                    |
| [merkleRoot()](#merkeroot)        | Restituisci Storage[0]                                                                                    |
| [0x81e580d3](#0x81e580d3)         | Restituisce il valore da una tabella di ricerca, a condizione che il parametro sia inferiore a Storage[4] |
| [0x1f135823](#0x1f135823)         | Restituisce Storage[6], ovvero Value\*                                                                    |

Ma sappiamo che ogni altra funzionalità è fornita dal contratto in Storage[3]. Forse se sapessimo cos'è quel contratto ci darebbe un indizio. Fortunatamente questa è la blockchain e tutto è noto, almeno in teoria. Non abbiamo visto alcun metodo che imposti Storage[3], quindi dev'essere stato impostato dal costruttore.

## Il costruttore {#the-constructor}

Quando [guardiamo un contratto](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) possiamo anche vedere la transazione che lo ha creato.

![Fai clic per creare la transazione](create-tx.png)

Facendo clic su quella transazione e poi sulla scheda **State**, possiamo visualizzare i valori iniziali dei parametri. Nello specifico, possiamo vedere che Storage[3] contiene [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Quel contratto deve contenere la funzionalità mancante. Possiamo comprenderlo usando gli stessi strumenti usati per il contratto che stiamo esaminando.

## Il contratto proxy {#the-proxy-contract}

Usando le stesse tecniche usate per il suddetto contratto originale, possiamo vedere che il contratto si annulla se:

- Sono presenti ETH allegati alla chiamata (0x05-0x0F)
- Le dimensioni dei dati della chiamata sono inferiori a quattro (0x10-0x19 e 0xBE-0xC2)

E che i metodi che supporta sono:

| Metodo                                                                                                          | Firma del metodo             | Offset a cui saltare |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/x/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135               |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151               |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4               |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110               |
| ???                                                                                                             | 0x3f26479e                   | 0x0118               |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3               |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148               |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107               |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122               |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8               |

Possiamo ignorare gli ultimi quattro metodi perché non ci arriveremo mai. Le loro firme sono tali che il nostro contratto originale se ne occupa da solo (puoi fare clic sulle firme per vedere i suddetti dettagli), quindi devono essere [metodi sovrascritti](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Uno dei metodi rimanenti è `claim(<params>)` e un altro è `isClaimed(<params>)`, quindi sembra un contratto airdrop. Invece di analizzare il resto opcode per opcode, possiamo [provare il decompilatore](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), che produce risultati utilizzabili per tre funzioni da questo contratto. La decompilazione degli altri viene lasciato come esercizio per il lettore.

### scaleAmountByPercentage {#scaleamountbypercentage}

Questo è ciò che il decompilatore ci restituisce per questa funzione:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Il primo `require` testa che i dati della chiamata abbiano, oltre ai quattro byte della firma della funzione, almeno 64 byte. abbastanza per i due parametri. Altrimenti c'è ovviamente qualcosa di sbagliato.

L'istruzione `if` sembra verificare che `_param1` non sia zero e che `_param1 * _param2` non sia negativo. Probabilmente serve a impedire casi di avvolgimento.

Infine, la funzione restituisce un valore in scala.

### claim {#claim}

Il codice creato dal decompilatore è complesso, e non tutto è rilevante per noi. Ne salterò una parte per concentrarci sulle righe che ritengo forniscano informazioni utili

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'impossibile rivendicare per una finestra futura'
```

Qui vediamo due cose importanti:

- `_param2`, sebbene sia dichiarato come `uint256`, è in realtà un indirizzo
- `_param1` è la finestra rivendicata, che dev'essere `currentWindow` o precedente.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Il conto ha già rivendicato la finestra data'
```

Quindi ora sappiamo che Storage[5] è un array di finestre e indirizzi, e se l'indirizzo ha rivendicato la ricompensa per quella finestra.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Prova non valida'
```

Sappiamo che `unknown2eb4a7ab` è in realtà la funzione `merkleRoot()`, quindi sembra che questo codice stia verificando una [prova di Merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Ciò significa che `_param4` è una prova di Merkle.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Ecco come un contratto trasferisce i propri ETH a un altro indirizzo (contratto o posseduto esternamente). Lo chiama con un valore che è l'importo da trasferire. Quindi sembra che questo sia un airdrop di ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Le ultime due righe ci dicono che anche Storage[2] è un contratto che chiamiamo. Se [guardiamo la transazione del costruttore](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), vediamo che questo contratto è [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), un contratto Wrapped Ether [il cui codice sorgente è stato caricato in Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Quindi sembra che i contratti tentino di inviare ETH a `_param2`. Se riescono a farlo, ottimo. Altrimenti, tentano di inviare [WETH](https://weth.tkn.eth.limo/). Se `_param2` è un conto posseduto esternamente (EOA), allora può sempre ricevere ETH, ma i contratti possono rifiutarsi di ricevere ETH. Tuttavia, WETH è ERC-20 e i contratti non possono rifiutarsi di accettarlo.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Alla fine della funzione vediamo che viene generata una voce del registro. [Guarda le voci del registro generate](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) e filtra l'argomento che inizia per `0xdbd5...`. Se [clicchiamo su una delle transazioni che hanno generato tale voce](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), vediamo che sembra indubbiamente una rivendicazione: il conto ha inviato un messaggio al contratto che stiamo decompilando e, in cambio, ha ricevuto degli ETH.

![Una transazione di rivendicazione](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Questa funzione è molto simile alla suddetta [`claim`](#claim). Verifica anche una prova di Merkle, tenta di trasferire ETH al primo e produce lo stesso tipo di voce del registro.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Prova non valida'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

La differenza principale è che il primo parametro, la finestra per prelevare, non c'è. Invece, c'è un ciclo su tutte le finestre rivendicabili.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

Quindi, sembra una variante di `claim` che rivendica tutte le finestre.

## Conclusione {#conclusion}

A questo punto dovresti sapere come comprendere i contratti il cui codice sorgente non è disponibile usando gli opcode o (quando funziona) il decompilatore. Come è evidente dalla lunghezza di questo articolo, decompilare un contratto non è banale, ma in un sistema in cui la sicurezza è essenziale, poter verificare che i contratti operino come promesso è un'abilità importante.
