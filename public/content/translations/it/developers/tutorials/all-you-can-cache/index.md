---
title: "Salva nella cache quanto vuoi"
description: "Scopri come creare e utilizzare un contratto di memorizzazione nella cache per transazioni rollup più economiche"
author: Ori Pomerantz
tags:
  [
    "livello 2",
    "memorizzazione nella cache",
    "archiviazione"
  ]
skill: intermediate
published: 2022-09-15
lang: it
---

Utilizzando i rollup, il costo di un byte nella transazione è molto maggiore di quello di uno slot d'archiviazione. Dunque, ha senso salvare nella cache quante più informazioni possibili sulla catena.

In questo articolo imparerai come creare e utilizzare un contratto di memorizzazione nella cache, in modo tale che il valore di ogni parametro che è probabile sia utilizzato più volte sarà salvato nella cache e disponibile all'uso (dopo la prima volta), con un numero di byte molto inferiore, e come scrivere il codice fuori catena che utilizza tale cache.

Se vuoi saltare l'articolo e vedere solo il codice sorgente, [è qui](https://github.com/qbzzt/20220915-all-you-can-cache). Lo stack di sviluppo è [Foundry](https://getfoundry.sh/introduction/installation/).

## Progettazione generale {#overall-design}

Per semplicità supponiamo che tutti i parametri delle transazioni siano `uint256`, lunghi 32 byte. Quando riceviamo una transazione, analizziamo ogni parametro come segue:

1. Se il primo byte è `0xFF`, prendi i 32 byte successivi come valore di parametro e scrivilo nella cache.

2. Se il primo byte è `0xFE`, prendi i 32 byte successivi come valore del parametro ma _non_ scriverlo nella cache.

3. Per qualsiasi altro valore, prendi i primi quattro bit come numero di byte aggiuntivi e gli ultimi quattro come i bit più significativi della chiave di cache. Ecco alcuni esempi:

   | Byte nei calldata | Chiave della cache |
   | :---------------- | -----------------: |
   | 0x0F              |               0x0F |
   | 0x10,0x10         |               0x10 |
   | 0x12,0xAC         |             0x02AC |
   | 0x2D,0xEA, 0xD6   |           0x0DEAD6 |

## Manipolazione della cache {#cache-manipulation}

La cache è implementata in [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Analizziamolo riga per riga.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Queste costanti sono utilizzate per interpretare i casi speciali in cui forniamo tutte le informazioni e se desideriamo scriverle o no nella cache. La scrittura nella cache richiede due operazioni [`SSTORE`](https://www.evm.codes/#55) in slot di archiviazione non utilizzati in precedenza, al costo di 22100 gas ciascuna, quindi la rendiamo facoltativa.

```solidity

    mapping(uint => uint) public val2key;
```

Una [mappatura](https://www.geeksforgeeks.org/solidity/solidity-mappings/) tra i valori e le loro chiavi. Queste informazioni sono necessarie per codificare i valori prima di inviare la transazione.

```solidity
    // La posizione n ha il valore per la chiave n+1, perché dobbiamo preservare
    // lo zero come "non nella cache".
    uint[] public key2val;
```

Possiamo usare un array per la mappatura da chiavi a valori perché assegniamo noi le chiavi e, per semplicità, lo facciamo in modo sequenziale.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Lettura di una voce della cache non inizializzata");
        return key2val[_key-1];
    }  // cacheRead
```

Legge un valore dalla cache.

```solidity
    // Scrive un valore nella cache se non è già presente
    // Pubblico solo per consentire il funzionamento del test
    function cacheWrite(uint _value) public returns (uint) {
        // Se il valore è già nella cache, restituisce la chiave corrente
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Non ha senso mettere lo stesso valore nella cache più di una volta. Se il valore è già presente, basta restituire la chiave esistente.

```solidity
        // Poiché 0xFE è un caso speciale, la chiave più grande che la cache può
        // contenere è 0x0D seguita da 15 0xFF. Se la lunghezza della cache è già
        // così grande, l'operazione fallisce.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "overflow della cache");
```

Non penso che otterremo mai una cache così grande (approssimativamente 1,8\*10<sup>37</sup> voci, che richiederebbero circa 10<sup>27</sup> TB per l'archiviazione). Tuttavia, sono abbastanza vecchio da ricordare ["640kB sarebbero sempre stati sufficienti"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Questo test è molto economico.

```solidity
        // Scrivi il valore usando la chiave successiva
        val2key[_value] = key2val.length+1;
```

Aggiungi la ricerca inversa (dal valore alla chiave).

```solidity
        key2val.push(_value);
```

Aggiungi la ricerca diretta (dalla chiave al valore). Poiché assegniamo i valori in modo sequenziale, possiamo semplicemente aggiungerlo dopo l'ultimo valore dell'array.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Restituisce la nuova lunghezza di `key2val`, che è la cella in cui è memorizzato il nuovo valore.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Questa funzione legge un valore dai calldata di lunghezza arbitraria (fino a 32 byte, la dimensione della parola).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "il limite di lunghezza di _calldataVal è 32 byte");
        require(length + startByte <= msg.data.length,
            "_calldataVal sta tentando di leggere oltre calldatasize");
```

Questa funzione è interna, quindi se il resto del codice è scritto correttamente, questi test non sono necessari. Tuttavia, non costano molto, quindi potremmo anche averli.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Questo codice è in [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Legge un valore di 32 byte dai calldata. Ciò funziona anche se i calldata si fermano prima di `startByte+32`, poiché lo spazio non inizializzato nell'EVM è considerato pari a zero.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Non vogliamo necessariamente un valore di 32 byte. Questo elimina i byte in eccesso.

```solidity
        return _retVal;
    } // _calldataVal


    // Legge un singolo parametro dai calldata, a partire da _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Legge un singolo parametro dai calldata. Nota che dobbiamo restituire non soltanto il valore che leggiamo, ma anche la posizione di quello successivo, poiché i parametri possono andare da una lunghezza di 1 byte a 33 byte.

```solidity
        // Il primo byte ci dice come interpretare il resto
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity cerca di ridurre il numero di bug vietando [conversioni di tipo implicite](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) potenzialmente pericolose. Un downgrade, ad esempio da 256 bit a 8 bit, dev'essere esplicito.

```solidity

        // Leggi il valore, ma non scriverlo nella cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Leggi il valore e scrivilo nella cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Se siamo arrivati qui significa che dobbiamo leggere dalla cache

        // Numero di byte extra da leggere
        uint8 _extraBytes = _firstByte / 16;
```

Prendi il [nibble](https://en.wikipedia.org/wiki/Nibble) inferiore e combinalo con gli altri byte per leggere il valore dalla cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Legge n parametri (le funzioni sanno quanti parametri si aspettano)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Potremmo ottenere il numero di parametri dagli stessi calldata, ma le funzioni che ci chiamano sanno quanti parametri sono previsti. È più facile lasciarcelo dire.

```solidity
        // I parametri che leggiamo
        uint[] memory params = new uint[](_paramNum);

        // I parametri iniziano al byte 4, prima c'è la firma della funzione
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Leggi i parametri finché non ottieni il numero desiderato. Se andiamo oltre la fine dei calldata, `_readParams` annullerà la chiamata.

```solidity

        return(params);
    }   // readParams

    // Per testare _readParams, testa la lettura di quattro parametri
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Un grande vantaggio di Foundry è che consente di scrivere test in Solidity ([vedi Test della cache sotto](#testing-the-cache)). Questo semplifica molto i test unitari. Questa è una funzione che legge quattro parametri e li restituisce in modo che il test possa verificare che siano corretti.

```solidity
    // Ottiene un valore, restituisce i byte che lo codificheranno (usando la cache se possibile)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` è una funzione che il codice offchain chiama per aiutare a creare calldata che utilizzano la cache. Riceve un singolo valore e restituisce i byte che lo codificano. Questa funzione è una `view`, quindi non richiede una transazione e se chiamata esternamente non costa gas.

```solidity
        uint _key = val2key[_val];

        // Il valore non è ancora nella cache, aggiungilo
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Nell'[EVM](/developers/docs/evm/) si presume che tutta l'archiviazione non inizializzata contenga zeri. Quindi se cerchiamo la chiave per un valore assente, otteniamo uno zero. In quel caso i byte che la codificano sono `INTO_CACHE` (quindi sarà salvato nella cache la prossima volta), seguiti dal valore effettivo.

```solidity
        // Se la chiave è <0x10, la restituisce come un singolo byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

I byte singoli sono i più facili. Usiamo semplicemente [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) per trasformare un tipo `bytes<n>` in un array di byte che può avere qualsiasi lunghezza. Nonostante il nome, funziona bene quando fornito con un solo argomento.

```solidity
        // Valore di due byte, codificato come 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Quando abbiamo una chiave inferiore a 16<sup>3</sup>, possiamo esprimerla in due byte. Prima convertiamo `_key`, un valore da 256 bit, in un valore da 16 bit, quindi utilizziamo l'OR logico o per aggiungere il numero di byte aggiuntivi al primo byte. Poi lo trasformiamo in un valore `bytes2`, che può essere convertito in `bytes`.

```solidity
        // Probabilmente c'è un modo intelligente per eseguire le righe seguenti come un ciclo,
        // ma è una funzione di visualizzazione, quindi sto ottimizzando per il tempo del programmatore e
        // la semplicità.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

Gli altri valori (3 byte, 4 byte, ecc.) sono gestiti allo stesso modo, solo con dimensioni di campo differenti.

```solidity
        // Se arriviamo qui, qualcosa è andato storto.
        revert("Errore in encodeVal, non dovrebbe accadere");
```

Se arriviamo qui significa che abbiamo una chiave non inferiore a 16\*256<sup>15</sup>. Ma `cacheWrite` limita le chiavi quindi non possiamo arrivare nemmeno fino a 14\*256<sup>16</sup> (che avrebbe un primo byte di 0xFE, quindi apparirebbe come `DONT_CACHE`). Ma aggiungere un test nel caso in cui un programmatore futuro aggiunga un bug non ci costa molto.

```solidity
    } // encodeVal

}  // Cache
```

### Test della cache {#testing-the-cache}

Uno dei vantaggi di Foundry è che [ti permette di scrivere test in Solidity](https://getfoundry.sh/forge/tests/overview/), il che rende più facile scrivere test unitari. I test per la classe `Cache` sono [qui](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Poiché il codice del test è ripetitivo, come tendono a essere i test, questo articolo spiega soltanto le parti interessanti.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// È necessario eseguire `forge test -vv` per la console.
import "forge-std/console.sol";
```

Questo è solo boilerplate necessario per utilizzare il pacchetto di test e `console.log`.

```solidity
import "src/Cache.sol";
```

Dobbiamo conoscere il contratto che stiamo testando.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

La funzione `setUp` viene chiamata prima di ogni test. In questo caso, creiamo semplicemente una nuova cache, così che i nostri test non si influenzeranno a vicenda.

```solidity
    function testCaching() public {
```

I test sono funzioni i cui nomi iniziano con `test`. Questa funzione verifica la funzionalità di base della cache, scrivendo i valori e rileggendoli.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Questo è il modo in cui si esegue il test vero e proprio, utilizzando le [funzioni `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). In questo caso verifichiamo che il valore scritto sia quello che leggiamo. Possiamo scartare il risultato di `cache.cacheWrite`, poiché sappiamo che le chiavi della cache sono assegnate linearmente.

```solidity
        }
    }    // testCaching


    // Salva nella cache lo stesso valore più volte, assicurati che la chiave rimanga
    // la stessa
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Prima scriviamo ogni valore due volte nella cache e ci assicuriamo che le chiavi siano uguali (a significare che la seconda scrittura non si è verificata realmente).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

In teoria, potrebbe esserci un bug che non influenza le scritture consecutive nella cache. Quindi qui eseguiamo altre scritture non consecutive e vediamo che i valori non sono ancora riscritti.

```solidity
    // Legge un uint da un buffer di memoria (per essere sicuri di riavere i parametri
    // che abbiamo inviato)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Legge una parola da 256 bit da un buffer `bytes memory`. Questa funzione di utilità ci consente di verificare che riceviamo i risultati corretti eseguendo una chiamata a una funzione che utilizza la cache.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul non supporta le strutture di dati oltre a `uint256`, quindi quando fai riferimento a strutture di dati più sofisticate, come il buffer di memoria `_bytes`, ne ottieni l'indirizzo. Solidity memorizza i valori `bytes memory` come una parola da 32 byte contenente la lunghezza, seguita dai byte effettivi, quindi per ottenere il numero di byte `_start`, dobbiamo calcolare `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Firma della funzione per fourParams(), per gentile concessione di
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Solo alcuni valori costanti per vedere se riceviamo i valori corretti
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Alcune costanti necessarie per il test.

```solidity
    function testReadParam() public {
```

Chiama `fourParams()`, una funzione che utilizza `readParams` per testare la possibilità di leggere correttamente i parametri.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Non possiamo utilizzare il normale meccanismo ABI per chiamare una funzione utilizzando la cache, quindi dobbiamo utilizzare il meccanismo di basso livello [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Tale meccanismo prende un `bytes memory` come input e lo restituisce (insieme a un valore booleano) come output.

```solidity
        // Prima chiamata, la cache è vuota
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

È utile, per lo stesso contratto, supportare sia le funzioni nella cache (per le chiamate direttamente dalle transazioni) che le funzioni non nella cache (per le chiamate da altri contratti intelligenti). Per farlo, dobbiamo continuare ad affidarci al meccanismo di Solidity per chiamare la funzione corretta, invece di mettere tutto in una [funzione `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Farlo semplifica la componibilità. Un singolo byte basterebbe per identificare la funzione nella maggior parte dei casi, quindi stiamo sprecando tre byte (16\*3=48 gas). Tuttavia, al momento della scrittura di questa guida, quei 48 di gas costano 0,07 centesimi, un costo ragionevole per un codice più semplice e meno soggetto a bug.

```solidity
            // Primo valore, aggiungilo alla cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

Il primo valore: un flag che indica che è un valore completo che deve essere scritto nella cache, seguito dai 32 byte del valore. Gli altri tre valori sono simili, tranne che `VAL_B` non è scritto nella cache e `VAL_C` è sia il terzo che il quarto parametro.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

Qui è dove chiamiamo effettivamente il contratto `Cache`.

```solidity
        assertEq(_success, true);
```

Ci aspettiamo che la chiamata riesca.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Iniziamo con una cache vuota e poi aggiungiamo `VAL_A` seguito da `VAL_C`. Ci aspetteremmo che il primo abbia la chiave 1 e il secondo abbia la chiave 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Il risultato comprende i quattro parametri. Qui verifichiamo che sia corretto.

```solidity
        // Seconda chiamata, possiamo usare la cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primo valore nella cache
            bytes1(0x01),
```

Le chiavi della cache sotto 16 sono composte da un solo byte.

```solidity
            // Secondo valore, non aggiungerlo alla cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Terzo e quarto valore, stesso valore
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

I test dopo la chiamata sono identici a quelli dopo la prima chiamata.

```solidity
    function testEncodeVal() public {
```

Questa funzione è simile a `testReadParam`, ma, invece di scrivere i parametri esplicitamente, utilizziamo `encodeVal()`.

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

L'unico test aggiuntivo in `testEncodeVal()` consiste nel verificare che la lunghezza di `_callInput` sia corretta. Per la prima chiamata, è 4+33\*4. Per la seconda, dove ogni valore è già nella cache, è 4+1\*4.

```solidity
    // Testa encodeVal quando la chiave è più di un singolo byte
    // Massimo tre byte perché riempire la cache a quattro byte richiede
    // troppo tempo.
    function testEncodeValBig() public {
        // Inserisce un numero di valori nella cache.
        // Per semplicità, usa la chiave n per il valore n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

La funzione `testEncodeVal` di cui sopra scrive solo quattro valori nella cache, quindi la [parte della funzione che si occupa dei valori a più byte](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) non è controllata. Ma quel codice è complicato e soggetto a errori.

La prima parte di questa funzione è un ciclo che scrive tutti i valori da 1 a 0x1FFF nella cache in ordine, così saremo in grado di codificare quei valori e sapere dove stanno andando.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Un byte        0x0F
            cache.encodeVal(0x0010),   // Due byte     0x1010
            cache.encodeVal(0x0100),   // Due byte     0x1100
            cache.encodeVal(0x1000)    // Tre byte 0x201000
        );
```

Testa valori da uno, due e tre byte. Non testiamo oltre tali valori perché ci vorrebbe troppo tempo per scrivere abbastanza elementi dello stack (almeno 0x10000000, circa un quarto di miliardo).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Testa che con un buffer eccessivamente piccolo si ottenga un revert
    function testShortCalldata() public {
```

Testiamo cosa si verifica nel caso anomalo in cui non ci siano abbastanza parametri.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Poiché si ripristina, il risultato che dovremmo ottenere è `false`.

```
    // Chiama con chiavi di cache che non ci sono
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primo valore, aggiungilo alla cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Secondo valore
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Questa funzione ottiene quattro parametri perfettamente legittimi, ma la cache è vuota, quindi non non sono presenti valori da leggere.

```solidity
        .
        .
        .
    // Testa che con un buffer eccessivamente lungo tutto funzioni
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Prima chiamata, la cache è vuota
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primo valore, aggiungilo alla cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Secondo valore, aggiungilo alla cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Terzo valore, aggiungilo alla cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Quarto valore, aggiungilo alla cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // E un altro valore per "buona fortuna"
            bytes4(0x31112233)
        );
```

Questa funzione invia cinque valori. Sappiamo che il quinto valore è ignorato perché non è un elemento della cache valido, il che avrebbe causato un ripristino se non fosse stato incluso.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Un'applicazione di esempio {#a-sample-app}

Scrivere test in Solidity va benissimo, ma alla fine una dApp deve essere in grado di elaborare richieste dall'esterno della catena per essere utile. Questo articolo dimostra come utilizzare la memorizzazione nella cache in una dApp con WORM, che sta per "Write Once, Read Many" (Scrivi una volta, leggi molte volte). Se una chiave non è ancora stata scritta, puoi scriverci un valore. Se la chiave è già scritta, ottieni un ripristino.

### Il contratto {#the-contract}

[Questo è il contratto](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Per lo più ripete ciò che abbiamo già fatto con `Cache` e `CacheTest`, quindi tratteremo soltanto le parti interessanti.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Il modo più semplice per utilizzare `Cache` è ereditarlo nel proprio contratto.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Questa funzione è simile a `fourParam` in `CacheTest` di cui sopra. Poiché non seguiamo le specifiche ABI, è meglio non dichiarare alcun parametro nella funzione.

```solidity
    // Rende più facile chiamarci
    // Firma della funzione per writeEntryCached(), per gentile concessione di
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Il codice esterno che chiama `writeEntryCached` dovrà creare manualmente i calldata, invece di utilizzare `worm.writeEntryCached`, poiché non seguiamo le specifiche ABI. Avere questo valore costante ne semplifica la scrittura.

Nota che anche se definiamo `WRITE_ENTRY_CACHED` come una variabile di stato, per leggerla esternamente è necessario utilizzare la sua funzione getter, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

La funzione di lettura è una `view`, quindi non richiede una transazione e non costa gas. Di conseguenza, non vi è alcun beneficio nell'usare la cache per il parametro. Con le funzioni view, è meglio utilizzare il meccanismo standard, che è più semplice.

### Il codice di test {#the-testing-code}

[Questo è il codice di test per il contratto](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Anche in questo caso ci occupiamo soltanto di ciò che ci interessa.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Questo (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) è il modo in cui specifichiamo in un test Foundry che la chiamata successiva dovrebbe non riuscire e il motivo segnalato per l'errore. Questo si applica quando usiamo la sintassi `<contratto>.<nome funzione>()` piuttosto che creare i calldata e chiamare il contratto utilizzando l'interfaccia di basso livello (`<contratto>.call()`, ecc.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Qui utilizziamo il fatto che `cacheWrite` restituisce la chiave della cache. Questo non è qualcosa che ci aspetteremmo di utilizzare in produzione, poiché `cacheWrite` cambia lo stato e quindi può essere chiamato solo durante una transazione. Le transazioni non hanno valori di ritorno; se hanno risultati, questi dovrebbero essere emessi come eventi. Quindi, il valore restituito da `cacheWrite` è accessibile soltanto dal codice onchain, e il codice onchain non necessita della memorizzazione nella cache dei parametri.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Questo è il modo in cui diciamo a Solidity che, sebbene `<indirizzo contratto>.call()` abbia due valori di ritorno, ci interessa soltanto il primo.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Poiché utilizziamo la funzione di basso livello `<address>.call()`, non possiamo usare `vm.expectRevert()` e dobbiamo guardare al valore booleano di successo che otteniamo dalla chiamata.

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

Questo è il modo in cui verifichiamo che il codice [emetta un evento correttamente](https://getfoundry.sh/reference/cheatcodes/expect-emit/) in Foundry.

### Il client {#the-client}

Una cosa che non si ottiene con i test di Solidity è il codice JavaScript che si può copiare e incollare nella propria applicazione. Per scrivere quel codice ho distribuito WORM su [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), la nuova rete di test di [Optimism](https://www.optimism.io/). Si trova all'indirizzo [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Puoi vedere il codice JavaScript per il client qui](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Per utilizzarlo:

1. Clona la repository di git:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Installa i pacchetti necessari:

   ```sh
   cd javascript
   yarn
   ```

3. Copia il file di configurazione:

   ```sh
   cp .env.example .env
   ```

4. Modifica `.env` per la tua configurazione:

   | Parametro                                                     | Valore                                                                                                                                                                                                            |
   | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC                                                      | La frase mnemonica per un account che ha abbastanza ETH da pagare per una transazione. [Puoi ottenere ETH gratuiti per la rete Optimism Goerli qui](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL di Optimism Goerli. L'endpoint pubblico, `https://goerli.optimism.io`, è a velocità limitata ma sufficiente per ciò che ci occorre qui                                                        |

5. Esegui `index.js`.

   ```sh
   node index.js
   ```

   Questo esempio di applicazione prima scrive una voce nel WORM, mostrando i calldata e un collegamento alla transazione su Etherscan. Poi rilegge quella voce e mostra la chiave che utilizza e i valori nella voce (valore, numero del blocco e autore).

La maggior parte del client è normale JavaScript per dApp. Quindi, ancora, analizzeremo soltanto le parti interessanti.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Serve una nuova chiave ogni volta
    const key = await worm.encodeVal(Number(new Date()))
```

Un dato slot può essere scritto una sola volta, quindi utilizziamo la marca temporale per assicurarci di non riutilizzare gli slot.

```javascript
const val = await worm.encodeVal("0x600D")

// Scrivi una voce
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers si aspetta che i dati di chiamata siano una stringa esadecimale, `0x` seguito da un numero pari di cifre esadecimali. Poiché sia `key` che `val` iniziano con `0x`, dobbiamo rimuovere queste intestazioni.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Come con il codice di test di Solidity, non possiamo chiamare normalmente una funzione memorizzata nella cache. Dobbiamo invece utilizzare un meccanismo di livello inferiore.

```javascript
    .
    .
    .
    // Leggi la voce appena scritta
    const realKey = '0x' + key.slice(4)  // rimuovi il flag FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Per leggere le voci possiamo utilizzare il meccanismo normale. Non serve utilizzare il salvataggio nella cache del parametro con le funzioni `view`.

## Conclusione {#conclusion}

Il codice in questo articolo è una prova di concetto, lo scopo è rendere l'idea facile da comprendere. Per un sistema pronto alla produzione, potresti voler implementare delle funzionalità aggiuntive:

- Gestire valori che non sono `uint256`. Ad esempio, stringhe.
- Invece di una cache globale, forse avere una mappatura tra utenti e cache. Utenti differenti utilizzano valori differenti.
- I valori utilizzati per gli indirizzi sono distinti da quelli utilizzati per altri scopi. Potrebbe avere senso avere una cache separata soltanto per gli indirizzi.
- Al momento, le chiavi della cache si basano su un algoritmo "il primo che arriva riceve la chiave più piccola". I primi sedici valori sono inviabili come un singolo byte. I 4080 valori successivi sono inviabili come due byte. Il successivo milione approssimativo di valori è in tre byte, ecc. Un sistema di produzione dovrebbe mantenere dei contatori di utilizzo sulle voci della cache e riorganizzarli così che i sedici valori _più comuni_ siano un byte, i successivi 4080 valori più comuni siano due byte, ecc.

  Tuttavia, questa è un'operazione potenzialmente pericolosa. Immagina la seguente sequenza di eventi:

  1. Noam Naive chiama `encodeVal` per codificare l'indirizzo a cui desidera inviare i token. Quell'indirizzo è uno dei primi utilizzati sull'applicazione, quindi il valore codificato è 0x06. Questa è una funzione `view`, non una transazione, quindi si trova tra Noam e il nodo che utilizza, e nessun altro ne è a conoscenza.

  2. Owen Owner esegue l'operazione di riordinamento della cache. In pochissimi utilizzano realmente quell'indirizzo, quindi è ora codificato come 0x201122. Un valore differente, 10<sup>18</sup>, è assegnato a 0x06.

  3. Noam Naive invia i suoi token a 0x06. I token arrivano all'indirizzo `0x0000000000000000000000000de0b6b3a7640000` e, poiché nessuno conosce la chiave privata per quell'indirizzo, restano bloccati lì. Noam _non è felice_.

  Esistono dei modi per risolvere questo problema e il problema correlato delle transazioni nel mempool durante il riordino della cache, ma è necessario esserne consapevoli.

Qui, ho dimostrato il salvataggio nella cache con Optimism, perché ne sono un dipendente ed è il rollup che conosco meglio. Ma dovrebbe funzionare con qualsiasi rollup che addebiti un costo minimo per l'elaborazione interna, così che, in confronto, scrivere i dati della transazione a L1 sia la spesa maggiore.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).

