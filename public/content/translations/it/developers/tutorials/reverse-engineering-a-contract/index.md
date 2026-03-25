---
title: "Reverse engineering di un contratto"
description: Come comprendere un contratto quando non si dispone del codice sorgente
author: Ori Pomerantz
lang: it
tags: ["evm", "opcodes"]
skill: advanced
breadcrumb: Reverse engineering
published: 2021-12-30
---
## Introduzione {#introduction}

_Non ci sono segreti sulla blockchain_, tutto ciò che accade è coerente, verificabile e pubblicamente disponibile. Idealmente, [i contratti dovrebbero avere il loro codice sorgente pubblicato e verificato su Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Tuttavia, [non è sempre così](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). In questo articolo imparerai come fare il reverse engineering dei contratti esaminando un contratto senza codice sorgente, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Esistono compilatori inversi, ma non sempre producono [risultati utilizzabili](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). In questo articolo imparerai come fare manualmente il reverse engineering e comprendere un contratto a partire [dagli opcode](https://github.com/wolflo/evm-opcodes), oltre a come interpretare i risultati di un decompilatore.

Per poter comprendere questo articolo dovresti già conoscere le basi della EVM ed avere almeno una certa familiarità con l'assembler della EVM. [Puoi leggere di più su questi argomenti qui](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Preparare il codice eseguibile {#prepare-the-executable-code}

Puoi ottenere gli opcode andando su Etherscan per il contratto, cliccando sulla scheda **Contract** e poi su **Switch to Opcodes View**. Otterrai una visualizzazione con un opcode per riga.

![Visualizzazione degli opcode da Etherscan](opcode-view.png)

Per poter comprendere i salti (jump), tuttavia, devi sapere dove si trova ciascun opcode nel codice. Per farlo, un modo è aprire un Foglio Google e incollare gli opcode nella colonna C. [Puoi saltare i passaggi seguenti creando una copia di questo foglio di calcolo già preparato](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Il passaggio successivo è ottenere le posizioni corrette del codice in modo da poter comprendere i salti. Inseriremo la dimensione dell'opcode nella colonna B e la posizione (in esadecimale) nella colonna A. Digita questa funzione nella cella `B1` e poi copiala e incollala per il resto della colonna B, fino alla fine del codice. Dopo averlo fatto, puoi nascondere la colonna B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Innanzitutto questa funzione aggiunge un byte per l'opcode stesso, e poi cerca `PUSH`. Gli opcode push sono speciali perché devono avere byte aggiuntivi per il valore che viene inserito (pushed). Se l'opcode è un `PUSH`, estraiamo il numero di byte e lo aggiungiamo.

In `A1` inserisci il primo offset, zero. Quindi, in `A2`, inserisci questa funzione e copiala e incollala di nuovo per il resto della colonna A:

```
=dec2hex(hex2dec(A1)+B1)
```

Abbiamo bisogno che questa funzione ci dia il valore esadecimale perché i valori che vengono inseriti prima dei salti (`JUMP` e `JUMPI`) ci vengono forniti in esadecimale.

## Il Punto di Ingresso (0x00) {#the-entry-point-0x00}

I contratti vengono sempre eseguiti dal primo byte. Questa è la parte iniziale del codice:

| Offset | Opcode       | Stack (dopo l'opcode)    |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | Vuoto                    |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | Vuoto                    |

Questo codice fa due cose:

1. Scrive 0x80 come valore a 32 byte nelle posizioni di memoria 0x40-0x5F (0x80 è memorizzato in 0x5F e 0x40-0x5E sono tutti zeri).
2. Legge la dimensione dei calldata. Normalmente i dati di chiamata per un contratto di Ethereum seguono [l'ABI (interfaccia binaria dell'applicazione)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), che richiede come minimo quattro byte per il selettore di funzione. Se la dimensione dei dati di chiamata è inferiore a quattro, salta a 0x5E.

![Diagramma di flusso per questa porzione](flowchart-entry.png)

### Il Gestore a 0x5E (per dati di chiamata non-ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Opcode       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Questo frammento inizia con un `JUMPDEST`. I programmi della EVM (macchina virtuale di Ethereum) generano un'eccezione se si salta a un opcode che non è `JUMPDEST`. Poi guarda la CALLDATASIZE e, se è "vera" (cioè non zero), salta a 0x7C. Ci arriveremo più avanti.

| Offset | Opcode     | Stack (dopo l'opcode)                                                      |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | [Wei](/glossary/#wei) forniti dalla chiamata. Chiamato `msg.value` in Solidity |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

Quindi, quando non ci sono dati di chiamata, leggiamo il valore di Storage[6]. Non sappiamo ancora quale sia questo valore, ma possiamo cercare le transazioni che il contratto ha ricevuto senza dati di chiamata. Le transazioni che trasferiscono semplicemente ETH senza alcun dato di chiamata (e quindi senza alcun metodo) hanno in Etherscan il metodo `Transfer`. Infatti, [la primissima transazione ricevuta dal contratto](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) è un trasferimento.

Se guardiamo in quella transazione e clicchiamo su **Click to see More**, vediamo che i dati di chiamata, chiamati dati di input, sono effettivamente vuoti (`0x`). Si noti anche che il valore è di 1.559 ETH, il che sarà rilevante in seguito.

![I dati di chiamata sono vuoti](calldata-empty.png)

Successivamente, clicca sulla scheda **State** ed espandi il contratto di cui stiamo facendo il reverse engineering (0x2510...). Puoi vedere che `Storage[6]` è effettivamente cambiato durante la transazione e, se cambi Hex in **Number**, vedi che è diventato 1.559.000.000.000.000.000, il valore trasferito in wei (ho aggiunto le virgole per chiarezza), corrispondente al successivo valore del contratto.

![Il cambiamento in Storage[6]](storage6.png)

Se guardiamo i cambiamenti di stato causati da [altre transazioni `Transfer` dello stesso periodo](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) vediamo che `Storage[6]` ha tracciato il valore del contratto per un po'. Per ora lo chiameremo `Value*`. L'asterisco (`*`) ci ricorda che non _sappiamo_ ancora cosa faccia questa variabile, ma non può servire solo a tracciare il valore del contratto perché non c'è bisogno di usare l'archiviazione, che è molto costosa, quando puoi ottenere il saldo del tuo account usando `ADDRESS BALANCE`. Il primo opcode inserisce l'indirizzo stesso del contratto. Il secondo legge l'indirizzo in cima allo stack e lo sostituisce con il saldo di quell'indirizzo.

| Offset | Opcode       | Stack                                       |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

Continueremo a tracciare questo codice alla destinazione del salto.

| Offset | Opcode     | Stack                                                       |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

Il `NOT` è bit a bit, quindi inverte il valore di ogni bit nel valore della chiamata.

| Offset | Opcode       | Stack                                                                       |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

Saltiamo se `Value*` è minore di 2^256-CALLVALUE-1 o uguale ad esso. Questa sembra una logica per prevenire l'overflow. E in effetti, vediamo che dopo alcune operazioni senza senso (la scrittura in memoria sta per essere eliminata, ad esempio) all'offset 0x01DE il contratto si annulla se viene rilevato l'overflow, il che è un comportamento normale.

Si noti che un tale overflow è estremamente improbabile, perché richiederebbe che il valore della chiamata più `Value*` fosse paragonabile a 2^256 wei, circa 10^59 ETH. [L'offerta totale di ETH, al momento della stesura, è inferiore a duecento milioni](https://etherscan.io/stat/supply).

| Offset | Opcode   | Stack                                     |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

Se siamo arrivati fin qui, ottieni `Value* + CALLVALUE` e salta all'offset 0x75.

| Offset | Opcode   | Stack                           |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

Se arriviamo qui (il che richiede che i dati di chiamata siano vuoti) aggiungiamo a `Value*` il valore della chiamata. Questo è coerente con ciò che diciamo facciano le transazioni `Transfer`.

| Offset | Opcode |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Infine, svuota lo stack (il che non è necessario) e segnala la fine con successo della transazione.

Per riassumere il tutto, ecco un diagramma di flusso per il codice iniziale.

![Diagramma di flusso del punto di ingresso](flowchart-entry.png)

## Il Gestore a 0x7C {#the-handler-at-0x7c}

Di proposito non ho inserito nell'intestazione cosa fa questo gestore. Il punto non è insegnarti come funziona questo specifico contratto, ma come fare ingegneria inversa sui contratti. Imparerai cosa fa nello stesso modo in cui l'ho fatto io, seguendo il codice.

Arriviamo qui da diversi punti:

- Se ci sono dati di chiamata di 1, 2 o 3 byte (dall'offset 0x63)
- Se la firma del metodo è sconosciuta (dagli offset 0x42 e 0x5D)

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

Questa è un'altra cella di archiviazione, una che non sono riuscito a trovare in nessuna transazione, quindi è più difficile sapere cosa significhi. Il codice sottostante lo renderà più chiaro.

| Offset | Opcode                                            | Stack                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

Questi opcode troncano il valore che leggiamo da Storage[3] a 160 bit, la lunghezza di un indirizzo Ethereum.

| Offset | Opcode | Stack                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

Questo salto è superfluo, poiché stiamo andando all'opcode successivo. Questo codice non è minimamente efficiente in termini di gas quanto potrebbe esserlo.

| Offset | Opcode     | Stack                           |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

All'inizio del codice impostiamo Mem[0x40] a 0x80. Se cerchiamo 0x40 in seguito, vediamo che non lo modifichiamo, quindi possiamo presumere che sia 0x80.

| Offset | Opcode       | Stack                                             |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

Copia tutti i dati di chiamata in memoria, a partire da 0x80.

| Offset | Opcode        | Stack                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

Ora le cose sono molto più chiare. Questo contratto può agire come un [proxy](https://blog.openzeppelin.com/proxy-patterns/), chiamando l'indirizzo in Storage[3] per fare il vero lavoro. `DELEGATE_CALL` chiama un contratto separato, ma rimane nello stesso spazio di archiviazione. Ciò significa che il contratto delegato, quello per cui fungiamo da proxy, accede allo stesso spazio di archiviazione. I parametri per la chiamata sono:

- _Gas_: Tutto il gas rimanente
- _Indirizzo chiamato_: Storage[3]-as-address
- _Dati di chiamata_: I byte CALLDATASIZE a partire da 0x80, che è dove abbiamo inserito i dati di chiamata originali
- _Dati di ritorno_: Nessuno (0x00 - 0x00) Otterremo i dati di ritorno con altri mezzi (vedi sotto)

| Offset | Opcode         | Stack                                                                                                         |
| -----: | -------------- | ------------------------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address                          |

Qui copiamo tutti i dati di ritorno nel buffer di memoria a partire da 0x80.

| Offset | Opcode       | Stack                                                                                                                                        |
| -----: | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((successo/fallimento della chiamata))) RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1         | (((successo/fallimento della chiamata))) (((successo/fallimento della chiamata))) RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO       | (((la chiamata è fallita))) (((successo/fallimento della chiamata))) RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((la chiamata è fallita))) (((successo/fallimento della chiamata))) RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address |
|     BC | JUMPI        | (((successo/fallimento della chiamata))) RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2         | RETURNDATASIZE (((successo/fallimento della chiamata))) RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((successo/fallimento della chiamata))) RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address          |
|     BF | RETURN       |                                                                                                                                              |

Quindi, dopo la chiamata, copiamo i dati di ritorno nel buffer 0x80 - 0x80+RETURNDATASIZE e, se la chiamata ha esito positivo, eseguiamo un `RETURN` esattamente con quel buffer.

### DELEGATECALL Fallita {#delegatecall-failed}

Se arriviamo qui, a 0xC0, significa che il contratto che abbiamo chiamato è stato annullato. Poiché siamo solo un proxy per quel contratto, vogliamo restituire gli stessi dati e annullare a nostra volta.

| Offset | Opcode   | Stack                                                                                                                               |
| -----: | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((successo/fallimento della chiamata))) RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2     | RETURNDATASIZE (((successo/fallimento della chiamata))) RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((successo/fallimento della chiamata))) RETURNDATASIZE (((successo/fallimento della chiamata))) 0x80 Storage[3]-as-address |
|     C3 | REVERT   |

Quindi eseguiamo un `REVERT` con lo stesso buffer che abbiamo usato per il `RETURN` in precedenza: 0x80 - 0x80+RETURNDATASIZE

![Diagramma di flusso della chiamata al proxy](flowchart-proxy.png)

## Chiamate ABI {#abi-calls}

Se la dimensione dei dati di chiamata è di quattro byte o più, questa potrebbe essere una chiamata ABI valida.

| Offset | Opcode       | Stack                                                              |
| -----: | ------------ | ------------------------------------------------------------------ |
|      D | PUSH1 0x00   | 0x00                                                               |
|      F | CALLDATALOAD | (((Prima parola (256 bit) dei dati di chiamata)))                  |
|     10 | PUSH1 0xe0   | 0xE0 (((Prima parola (256 bit) dei dati di chiamata)))             |
|     12 | SHR          | (((primi 32 bit (4 byte) dei dati di chiamata)))                   |

Etherscan ci dice che `1C` è un opcode sconosciuto, perché [è stato aggiunto dopo che Etherscan ha scritto questa funzionalità](https://eips.ethereum.org/EIPS/eip-145) e non l'hanno aggiornata. Una [tabella degli opcode aggiornata](https://github.com/wolflo/evm-opcodes) ci mostra che si tratta di uno scorrimento a destra (shift right)

| Offset | Opcode           | Stack                                                                                                            |
| -----: | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((primi 32 bit (4 byte) dei dati di chiamata))) (((primi 32 bit (4 byte) dei dati di chiamata)))                |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((primi 32 bit (4 byte) dei dati di chiamata))) (((primi 32 bit (4 byte) dei dati di chiamata)))     |
|     19 | GT               | 0x3CD8045E>primi-32-bit-dei-dati-di-chiamata (((primi 32 bit (4 byte) dei dati di chiamata)))                    |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>primi-32-bit-dei-dati-di-chiamata (((primi 32 bit (4 byte) dei dati di chiamata)))               |
|     1D | JUMPI            | (((primi 32 bit (4 byte) dei dati di chiamata)))                                                                 |

Dividere i test di corrispondenza della firma del metodo in due in questo modo fa risparmiare in media metà dei test. Il codice che segue immediatamente questo e il codice in `0x43` seguono lo stesso schema: `DUP1` dei primi 32 bit dei dati di chiamata, `PUSH4 (((firma del metodo>`, esecuzione di `EQ` per verificare l'uguaglianza, e poi `JUMPI` se la firma del metodo corrisponde. Ecco le firme dei metodi, i loro indirizzi e, se nota, [la definizione del metodo corrispondente](https://www.4byte.directory/):

| Metodo                                                                                 | Firma del metodo | Offset in cui saltare |
| -------------------------------------------------------------------------------------- | ---------------- | --------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103                |
| ???                                                                                    | 0x81e580d3       | 0x0138                |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158                |
| ???                                                                                    | 0x1f135823       | 0x00C4                |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED                |

Se non viene trovata alcuna corrispondenza, il codice salta al [gestore del proxy a 0x7C](#the-handler-at-0x7c), nella speranza che il contratto di cui siamo un proxy abbia una corrispondenza.

![Diagramma di flusso delle chiamate ABI](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Opcode       | Stack                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

La prima cosa che fa questa funzione è controllare che la chiamata non abbia inviato alcun ETH. Questa funzione non è [`payable`](https://solidity-by-example.org/payable/). Se qualcuno ci ha inviato degli ETH deve trattarsi di un errore e vogliamo eseguire un `REVERT` per evitare di avere quegli ETH dove non possono essere recuperati.

| Offset | Opcode                                            | Stack                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] alias il contratto per cui siamo un proxy)))                  |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] alias il contratto per cui siamo un proxy)))             |
|    116 | MLOAD                                             | 0x80 (((Storage[3] alias il contratto per cui siamo un proxy)))             |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] alias il contratto per cui siamo un proxy)))   |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] alias il contratto per cui siamo un proxy)))   |
|    12D | SWAP2                                             | (((Storage[3] alias il contratto per cui siamo un proxy))) 0xFF...FF 0x80   |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

E 0x80 ora contiene l'indirizzo del proxy

| Offset | Opcode       | Stack     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Il codice E4 {#the-e4-code}

Questa è la prima volta che vediamo queste righe, ma sono condivise con altri metodi (vedi sotto). Quindi chiameremo il valore nello stack X, e ricorderemo semplicemente che in `splitter()` il valore di questa X è 0xA0.

| Offset | Opcode     | Stack       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

Quindi questo codice riceve un puntatore di memoria nello stack (X) e fa in modo che il contratto esegua un `RETURN` con un buffer che è 0x80 - X.

Nel caso di `splitter()`, questo restituisce l'indirizzo per cui siamo un proxy. `RETURN` restituisce il buffer in 0x80-0x9F, che è dove abbiamo scritto questi dati (offset 0x130 sopra).

## currentWindow() {#currentwindow}

Il codice negli offset 0x158-0x163 è identico a quello che abbiamo visto in 0x103-0x10E in `splitter()` (a parte la destinazione `JUMPI`), quindi sappiamo che anche `currentWindow()` non è `payable`.

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### Il codice DA {#the-da-code}

Questo codice è condiviso anche con altri metodi. Quindi chiameremo il valore nello stack Y, e ricorderemo semplicemente che in `currentWindow()` il valore di questa Y è Storage[1].

| Offset | Opcode     | Stack            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Scrive Y in 0x80-0x9F.

| Offset | Opcode     | Stack          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

E il resto è già stato spiegato [sopra](#the-e4-code). Quindi i salti a 0xDA scrivono la cima dello stack (Y) in 0x80-0x9F e restituiscono quel valore. Nel caso di `currentWindow()`, restituisce Storage[1].

## merkleRoot() {#merkleroot}

Il codice negli offset 0xED-0xF8 è identico a quello che abbiamo visto in 0x103-0x10E in `splitter()` (a parte la destinazione `JUMPI`), quindi sappiamo che anche `merkleRoot()` non è `payable`.

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

Cosa succede dopo il salto [lo abbiamo già capito](#the-da-code). Quindi `merkleRoot()` restituisce Storage[0].

## 0x81e580d3 {#0x81e580d3}

Il codice negli offset 0x138-0x143 è identico a quello che abbiamo visto in 0x103-0x10E in `splitter()` (a parte la destinazione di `JUMPI`), quindi sappiamo che anche questa funzione non è `payable`.

| Offset | Opcode       | Stack                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
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
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Sembra che questa funzione accetti almeno 32 byte (una word) di dati di chiamata.

| Offset | Opcode | Stack                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

Se non riceve i dati di chiamata, la transazione viene annullata senza alcun dato di ritorno.

Vediamo cosa succede se la funzione riceve _effettivamente_ i dati di chiamata di cui ha bisogno.

| Offset | Opcode       | Stack                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` è la prima word dei dati di chiamata _dopo_ la firma del metodo

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
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Se la prima word non è minore di Storage[4], la funzione fallisce. Viene annullata senza alcun valore restituito:

| Offset | Opcode     | Stack         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

Se calldataload(4) è minore di Storage[4], otteniamo questo codice:

| Offset | Opcode     | Stack                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

E le posizioni di memoria 0x00-0x1F ora contengono il dato 0x04 (0x00-0x1E sono tutti zeri, 0x1F è quattro)

| Offset | Opcode     | Stack                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Quindi c'è una tabella di ricerca nello storage, che inizia allo SHA3 di 0x000...0004 e ha una voce per ogni valore legittimo dei dati di chiamata (valore inferiore a Storage[4]).

| Offset | Opcode | Stack                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Sappiamo già cosa fa [il codice all'offset 0xDA](#the-da-code), restituisce il valore in cima allo stack al chiamante. Quindi questa funzione restituisce il valore dalla tabella di ricerca al chiamante.

## 0x1f135823 {#0x1f135823}

Il codice negli offset 0xC4-0xCF è identico a quello che abbiamo visto in 0x103-0x10E in `splitter()` (a parte la destinazione `JUMPI`), quindi sappiamo che anche questa funzione non è `payable`.

| Offset | Opcode       | Stack             |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

Sappiamo già cosa fa [il codice all'offset 0xDA](#the-da-code), restituisce il valore in cima allo stack al chiamante. Quindi questa funzione restituisce `Value*`.

### Riepilogo dei metodi {#method-summary}

Senti di aver compreso il contratto a questo punto? Io no. Finora abbiamo questi metodi:

| Metodo                            | Significato                                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Transfer                          | Accetta il valore fornito dalla chiamata e incrementa `Value*` di tale importo                                       |
| [splitter()](#splitter)           | Restituisce Storage[3], l'indirizzo del proxy                                                                        |
| [currentWindow()](#currentwindow) | Restituisce Storage[1]                                                                                               |
| [merkleRoot()](#merkeroot)        | Restituisce Storage[0]                                                                                               |
| [0x81e580d3](#0x81e580d3)         | Restituisce il valore da una tabella di ricerca, a condizione che il parametro sia inferiore a Storage[4]            |
| [0x1f135823](#0x1f135823)         | Restituisce Storage[6], noto anche come Value\*                                                                      |

Ma sappiamo che qualsiasi altra funzionalità è fornita dal contratto in Storage[3]. Forse, se sapessimo cos'è quel contratto, ci darebbe un indizio. Fortunatamente, questa è la blockchain e tutto è noto, almeno in teoria. Non abbiamo visto alcun metodo che imposti Storage[3], quindi deve essere stato impostato dal costruttore.

## Il Costruttore {#the-constructor}

Quando [osserviamo un contratto](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) possiamo anche vedere la transazione che lo ha creato.

![Fai clic sulla transazione di creazione](create-tx.png)

Se facciamo clic su quella transazione, e poi sulla scheda **Stato**, possiamo vedere i valori iniziali dei parametri. Nello specifico, possiamo vedere che Storage[3] contiene [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Quel contratto deve contenere la funzionalità mancante. Possiamo comprenderlo usando gli stessi strumenti che abbiamo usato per il contratto che stiamo indagando.

## Il Contratto Proxy {#the-proxy-contract}

Usando le stesse tecniche che abbiamo usato per il contratto originale qui sopra, possiamo vedere che il contratto si annulla se:

- C'è qualche ETH allegato alla chiamata (0x05-0x0F)
- La dimensione dei dati della chiamata è inferiore a quattro (0x10-0x19 e 0xBE-0xC2)

E che i metodi che supporta sono:

| Metodo                                                                                                          | Firma del metodo             | Offset in cui saltare |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

Possiamo ignorare gli ultimi quattro metodi perché non ci arriveremo mai. Le loro firme sono tali che il nostro contratto originale se ne occupa da solo (puoi cliccare sulle firme per vedere i dettagli sopra), quindi devono essere [metodi sovrascritti](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Uno dei metodi rimanenti è `claim(<params>)`, e un altro è `isClaimed(<params>)`, quindi sembra un contratto di airdrop. Invece di esaminare il resto opcode per opcode, possiamo [provare il decompilatore](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), che produce risultati utilizzabili per tre funzioni di questo contratto. Il reverse engineering delle altre è lasciato come esercizio per il lettore.

### scaleAmountByPercentage {#scaleamountbypercentage}

Questo è ciò che il decompilatore ci fornisce per questa funzione:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Il primo `require` verifica che i dati della chiamata abbiano, oltre ai quattro byte della firma della funzione, almeno 64 byte, sufficienti per i due parametri. In caso contrario, c'è ovviamente qualcosa di sbagliato.

L'istruzione `if` sembra controllare che `_param1` non sia zero e che `_param1 * _param2` non sia negativo. Probabilmente serve a prevenire casi di wrap around (overflow).

Infine, la funzione restituisce un valore scalato.

### claim {#claim}

Il codice creato dal decompilatore è complesso e non tutto è rilevante per noi. Ne salterò una parte per concentrarmi sulle righe che ritengo forniscano informazioni utili

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Qui vediamo due cose importanti:

- `_param2`, sebbene sia dichiarato come `uint256`, è in realtà un indirizzo
- `_param1` è la finestra che viene riscattata, che deve essere `currentWindow` o precedente.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Quindi ora sappiamo che Storage[5] è un array di finestre e indirizzi, e se l'indirizzo ha riscattato la ricompensa per quella finestra.

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
      revert with 0, 'Invalid proof'
```

Sappiamo che `unknown2eb4a7ab` è in realtà la funzione `merkleRoot()`, quindi questo codice sembra verificare una [prova di Merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Ciò significa che `_param4` è una prova di Merkle.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Questo è il modo in cui un contratto trasferisce i propri ETH a un altro indirizzo (contratto o account controllato esternamente). Lo chiama con un valore che è l'importo da trasferire. Quindi sembra che si tratti di un airdrop di ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Le ultime due righe ci dicono che anche Storage[2] è un contratto che chiamiamo. Se [guardiamo la transazione del costruttore](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) vediamo che questo contratto è [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), un contratto Wrapped Ether [il cui codice sorgente è stato caricato su Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Quindi sembra che il contratto tenti di inviare ETH a `_param2`. Se ci riesce, ottimo. Altrimenti, tenta di inviare [WETH](https://weth.tkn.eth.limo/). Se `_param2` è un account controllato esternamente (EOA), allora può sempre ricevere ETH, ma i contratti possono rifiutarsi di ricevere ETH. Tuttavia, WETH è ERC-20 e i contratti non possono rifiutarsi di accettarlo.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Alla fine della funzione vediamo che viene generata una voce di log. [Guarda le voci di log generate](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) e filtra per l'argomento che inizia con `0xdbd5...`. Se [clicchiamo su una delle transazioni che ha generato tale voce](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) vediamo che in effetti sembra un riscatto: l'account ha inviato un messaggio al contratto di cui stiamo facendo il reverse engineering e in cambio ha ottenuto ETH.

![Una transazione di riscatto](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Questa funzione è molto simile a [`claim`](#claim) qui sopra. Controlla anch'essa una prova di Merkle, tenta di trasferire ETH al primo e produce lo stesso tipo di voce di log.

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
      revert with 0, 'Invalid proof'
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

La differenza principale è che il primo parametro, la finestra da prelevare, non c'è. Invece, c'è un ciclo su tutte le finestre che potrebbero essere riscattate.

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

Quindi sembra una variante di `claim` che riscatta tutte le finestre.

## Conclusione {#conclusion}

A questo punto dovresti sapere come comprendere i contratti il cui codice sorgente non è disponibile, utilizzando gli opcode o (quando funziona) il decompilatore. Come è evidente dalla lunghezza di questo articolo, il reverse engineering di un contratto non è banale, ma in un sistema in cui la sicurezza è essenziale è una competenza importante per poter verificare che i contratti funzionino come promesso.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).