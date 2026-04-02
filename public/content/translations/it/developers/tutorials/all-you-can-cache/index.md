---
title: "Tutto ciò che puoi mettere in cache"
description: "Impara a creare e utilizzare un contratto di caching per transazioni di rollup più economiche"
author: Ori Pomerantz
tags: ["livello 2", "caching", "archiviazione", "scalabilità"]
skill: intermediate
breadcrumb: Caching per i rollup
published: 2022-09-15
lang: it
---

Quando si utilizzano i rollup, il costo di un byte nella transazione è molto più costoso del costo di uno slot di archiviazione. Pertanto, ha senso memorizzare nella cache quante più informazioni possibili on-chain.

In questo articolo imparerai come creare e utilizzare un contratto di caching in modo tale che qualsiasi valore di parametro che probabilmente verrà utilizzato più volte venga memorizzato nella cache e reso disponibile per l'uso (dopo la prima volta) con un numero molto inferiore di byte, e come scrivere codice fuori catena che utilizzi questa cache.

Se vuoi saltare l'articolo e vedere solo il codice sorgente, [è qui](https://github.com/qbzzt/20220915-all-you-can-cache). Lo stack di sviluppo è [Foundry](https://getfoundry.sh/introduction/installation/).

## Design generale {#overall-design}

Per semplicità, supporremo che tutti i parametri della transazione siano `uint256`, lunghi 32 byte. Quando riceviamo una transazione, analizzeremo ogni parametro in questo modo:

1. Se il primo byte è `0xFF`, prendi i successivi 32 byte come valore del parametro e scrivilo nella cache.

2. Se il primo byte è `0xFE`, prendi i successivi 32 byte come valore del parametro ma _non_ scriverlo nella cache.

3. Per qualsiasi altro valore, prendi i primi quattro bit come numero di byte aggiuntivi e gli ultimi quattro bit come bit più significativi della chiave della cache. Ecco alcuni esempi:

   | Byte in calldata | Chiave della cache |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## Manipolazione della cache {#cache-manipulation}

La cache è implementata in [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Esaminiamola riga per riga.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Queste costanti sono utilizzate per interpretare i casi speciali in cui forniamo tutte le informazioni e vogliamo che vengano scritte nella cache o meno. Scrivere nella cache richiede due operazioni [`SSTORE`](https://www.evm.codes/#55) in slot di archiviazione precedentemente inutilizzati a un costo di 22100 gas ciascuna, quindi lo rendiamo opzionale.

```solidity

    mapping(uint => uint) public val2key;
```

Una [mappatura](https://www.geeksforgeeks.org/solidity/solidity-mappings/) tra i valori e le loro chiavi. Questa informazione è necessaria per codificare i valori prima di inviare la transazione.

```solidity
    // La posizione n ha il valore per la chiave n+1, perché dobbiamo preservare
    // lo zero come "non nella cache".
    uint[] public key2val;
```

Possiamo usare un array per la mappatura dalle chiavi ai valori perché assegniamo noi le chiavi e, per semplicità, lo facciamo in modo sequenziale.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    } // cacheRead
```

Legge un valore dalla cache.

```solidity
    // Scrive un valore nella cache se non è già presente
    // Pubblico solo per permettere al test di funzionare
    function cacheWrite(uint _value) public returns (uint) {
        // Se il valore è già nella cache, restituisce la chiave corrente
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Non ha senso inserire lo stesso valore nella cache più di una volta. Se il valore è già presente, restituisce semplicemente la chiave esistente.

```solidity
        // Poiché 0xFE è un caso speciale, la chiave più grande che la cache può
        // contenere è 0x0D seguito da 15 0xFF. Se la lunghezza della cache è già così
        // grande, fallisce.
        // 1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Non credo che avremo mai una cache così grande (circa 1.8\*10<sup>37</sup> voci, che richiederebbero circa 10<sup>27</sup> TB per l'archiviazione). Tuttavia, sono abbastanza vecchio da ricordare che ["640kB sarebbero sempre stati sufficienti"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Questo test è molto economico.

```solidity
        // Scrive il valore usando la chiave successiva
        val2key[_value] = key2val.length+1;
```

Aggiunge la ricerca inversa (dal valore alla chiave).

```solidity
        key2val.push(_value);
```

Aggiunge la ricerca in avanti (dalla chiave al valore). Poiché assegniamo i valori in modo sequenziale, possiamo semplicemente aggiungerlo dopo l'ultimo valore dell'array.

```solidity
        return key2val.length;
    } // cacheWrite
```

Restituisce la nuova lunghezza di `key2val`, che è la cella in cui è memorizzato il nuovo valore.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Questa funzione legge un valore dal calldata di lunghezza arbitraria (fino a 32 byte, la dimensione della parola).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Questa funzione è interna, quindi se il resto del codice è scritto correttamente questi test non sono necessari. Tuttavia, non costano molto, quindi tanto vale averli.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Questo codice è in [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Legge un valore di 32 byte dal calldata. Questo funziona anche se il calldata si ferma prima di `startByte+32` perché lo spazio non inizializzato nell'EVM è considerato pari a zero.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Non vogliamo necessariamente un valore di 32 byte. Questo elimina i byte in eccesso.

```solidity
        return _retVal;
    } // _calldataVal


    // Legge un singolo parametro dalla calldata, partendo da _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Legge un singolo parametro dal calldata. Nota che dobbiamo restituire non solo il valore che abbiamo letto, ma anche la posizione del byte successivo perché i parametri possono variare da 1 byte a 33 byte di lunghezza.

```solidity
        // Il primo byte ci dice come interpretare il resto
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity cerca di ridurre il numero di bug vietando [conversioni di tipo implicite](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) potenzialmente pericolose. Un declassamento, ad esempio da 256 bit a 8 bit, deve essere esplicito.

```solidity

        // Legge il valore, ma non lo scrive nella cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Legge il valore e lo scrive nella cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Se siamo arrivati qui significa che dobbiamo leggere dalla cache

        // Numero di byte extra da leggere
        uint8 _extraBytes = _firstByte / 16;
```

Prende il [nibble](https://en.wikipedia.org/wiki/Nibble) inferiore e lo combina con gli altri byte per leggere il valore dalla cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    } // _readParam


    // Legge n parametri (le funzioni sanno quanti parametri si aspettano)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Potremmo ottenere il numero di parametri che abbiamo dal calldata stesso, ma le funzioni che ci chiamano sanno quanti parametri si aspettano. È più facile lasciare che ce lo dicano loro.

```solidity
        // I parametri che leggiamo
        uint[] memory params = new uint[](_paramNum);

        // I parametri iniziano al byte 4, prima c'è la firma della funzione
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Legge i parametri finché non hai il numero di cui hai bisogno. Se andiamo oltre la fine del calldata, `_readParams` annullerà la chiamata.

```solidity

        return(params);
    } // readParams

    // Per testare _readParams, testa la lettura di quattro parametri
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    } // fourParam
```

Un grande vantaggio di Foundry è che consente di scrivere test in Solidity ([vedi Testare la cache di seguito](#testing-the-cache)). Questo rende i test unitari molto più semplici. Questa è una funzione che legge quattro parametri e li restituisce in modo che il test possa verificare che fossero corretti.

```solidity
    // Ottiene un valore, restituisce i byte che lo codificheranno (usando la cache se possibile)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` è una funzione che il codice fuori catena chiama per aiutare a creare calldata che utilizza la cache. Riceve un singolo valore e restituisce i byte che lo codificano. Questa funzione è una `view`, quindi non richiede una transazione e quando chiamata esternamente non costa alcun gas.

```solidity
        uint _key = val2key[_val];

        // Il valore non è ancora nella cache, lo aggiunge
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Nell'[EVM](/developers/docs/evm/) (macchina virtuale di Ethereum) tutta l'archiviazione non inizializzata si presume sia composta da zeri. Quindi, se cerchiamo la chiave per un valore che non c'è, otteniamo uno zero. In tal caso i byte che lo codificano sono `INTO_CACHE` (in modo che venga memorizzato nella cache la prossima volta), seguiti dal valore effettivo.

```solidity
        // Se la chiave è <0x10, la restituisce come singolo byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

I byte singoli sono i più facili. Usiamo semplicemente [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) per trasformare un tipo `bytes<n>` in un array di byte che può essere di qualsiasi lunghezza. Nonostante il nome, funziona bene quando viene fornito con un solo argomento.

```solidity
        // Valore a due byte, codificato come 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Quando abbiamo una chiave inferiore a 16<sup>3</sup>, possiamo esprimerla in due byte. Per prima cosa convertiamo `_key`, che è un valore a 256 bit, in un valore a 16 bit e usiamo l'OR logico per aggiungere il numero di byte extra al primo byte. Quindi lo inseriamo semplicemente in un valore `bytes2`, che può essere convertito in `bytes`.

```solidity
        // Probabilmente c'è un modo intelligente per eseguire le righe seguenti come un ciclo,
        // ma è una funzione view, quindi sto ottimizzando per il tempo del programmatore e
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

Gli altri valori (3 byte, 4 byte, ecc.) vengono gestiti allo stesso modo, solo con dimensioni del campo diverse.

```solidity
        // Se arriviamo qui, c'è qualcosa di sbagliato.
        revert("Error in encodeVal, should not happen");
```

Se arriviamo qui significa che abbiamo ottenuto una chiave che non è inferiore a 16\*256<sup>15</sup>. Ma `cacheWrite` limita le chiavi, quindi non possiamo nemmeno arrivare a 14\*256<sup>16</sup> (che avrebbe un primo byte di 0xFE, quindi sembrerebbe `DONT_CACHE`). Ma non ci costa molto aggiungere un test nel caso in cui un programmatore futuro introduca un bug.

```solidity
    } // encodeVal

} // Cache
```

### Testare la cache {#testing-the-cache}

Uno dei vantaggi di Foundry è che [ti permette di scrivere test in Solidity](https://getfoundry.sh/forge/tests/overview/), il che rende più facile scrivere test unitari. I test per la classe `Cache` sono [qui](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Poiché il codice di test è ripetitivo, come tendono a essere i test, questo articolo spiega solo le parti interessanti.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// È necessario eseguire `forge test -vv` per la console.
import "forge-std/console.sol";
```

Questo è solo codice boilerplate necessario per utilizzare il pacchetto di test e `console.log`.

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

La funzione `setUp` viene chiamata prima di ogni test. In questo caso creiamo semplicemente una nuova cache, in modo che i nostri test non si influenzino a vicenda.

```solidity
    function testCaching() public {
```

I test sono funzioni i cui nomi iniziano con `test`. Questa funzione controlla la funzionalità di base della cache, scrivendo valori e leggendoli di nuovo.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Ecco come si esegue il test vero e proprio, utilizzando le [funzioni `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). In questo caso, controlliamo che il valore che abbiamo scritto sia quello che abbiamo letto. Possiamo scartare il risultato di `cache.cacheWrite` perché sappiamo che le chiavi della cache vengono assegnate in modo lineare.

```solidity
        }
    } // testCaching


    // Mette in cache lo stesso valore più volte, assicurandosi che la chiave rimanga
    // la stessa
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Per prima cosa scriviamo ogni valore due volte nella cache e ci assicuriamo che le chiavi siano le stesse (il che significa che la seconda scrittura non è avvenuta realmente).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    } // testRepeatCaching
```

In teoria potrebbe esserci un bug che non influisce sulle scritture consecutive nella cache. Quindi qui facciamo alcune scritture che non sono consecutive e vediamo che i valori non vengono comunque riscritti.

```solidity
    // Legge un uint da un buffer di memoria (per assicurarsi di riavere i parametri
    // che abbiamo inviato)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Legge una parola a 256 bit da un buffer `bytes memory`. Questa funzione di utilità ci consente di verificare di ricevere i risultati corretti quando eseguiamo una chiamata di funzione che utilizza la cache.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul non supporta strutture dati oltre a `uint256`, quindi quando ti riferisci a una struttura dati più sofisticata, come il buffer di memoria `_bytes`, ottieni l'indirizzo di quella struttura. Solidity memorizza i valori `bytes memory` come una parola di 32 byte che contiene la lunghezza, seguita dai byte effettivi, quindi per ottenere il numero di byte `_start` dobbiamo calcolare `_bytes+32+_start`.

```solidity

        return tempUint;
    } // toUint256

    // Firma della funzione per fourParams(), per gentile concessione di
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Solo alcuni valori costanti per vedere che stiamo ottenendo indietro i valori corretti
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Alcune costanti di cui abbiamo bisogno per i test.

```solidity
    function testReadParam() public {
```

Chiama `fourParams()`, una funzione che utilizza `readParams`, per testare che possiamo leggere i parametri correttamente.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Non possiamo usare il normale meccanismo ABI per chiamare una funzione usando la cache, quindi dobbiamo usare il meccanismo di basso livello [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Quel meccanismo accetta un `bytes memory` come input e lo restituisce (insieme a un valore booleano) come output.

```solidity
        // Prima chiamata, la cache è vuota
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

È utile che lo stesso contratto supporti sia funzioni memorizzate nella cache (per chiamate direttamente dalle transazioni) sia funzioni non memorizzate nella cache (per chiamate da altri contratti intelligenti). Per farlo dobbiamo continuare ad affidarci al meccanismo di Solidity per chiamare la funzione corretta, invece di inserire tutto in [una funzione di `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Fare questo rende la componibilità molto più semplice. Un singolo byte sarebbe sufficiente per identificare la funzione nella maggior parte dei casi, quindi stiamo sprecando tre byte (16\*3=48 gas). Tuttavia, mentre scrivo questo, quei 48 gas costano 0,07 centesimi, che è un costo ragionevole per un codice più semplice e meno soggetto a bug.

```solidity
            // Primo valore, lo aggiunge alla cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

Il primo valore: un flag che indica che è un valore completo che deve essere scritto nella cache, seguito dai 32 byte del valore. Gli altri tre valori sono simili, tranne per il fatto che `VAL_B` non viene scritto nella cache e `VAL_C` è sia il terzo parametro che il quarto.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

È qui che chiamiamo effettivamente il contratto `Cache`.

```solidity
        assertEq(_success, true);
```

Ci aspettiamo che la chiamata abbia successo.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Iniziamo con una cache vuota e poi aggiungiamo `VAL_A` seguito da `VAL_C`. Ci aspetteremmo che il primo abbia la chiave 1 e il secondo abbia 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

L'output sono i quattro parametri. Qui verifichiamo che sia corretto.

```solidity
        // Seconda chiamata, possiamo usare la cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primo valore nella Cache
            bytes1(0x01),
```

Le chiavi della cache inferiori a 16 sono di un solo byte.

```solidity
            // Secondo valore, non lo aggiunge alla cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Terzo e quarto valore, stesso valore
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    } // testReadParam
```

I test dopo la chiamata sono identici a quelli dopo la prima chiamata.

```solidity
    function testEncodeVal() public {
```

Questa funzione è simile a `testReadParam`, tranne per il fatto che invece di scrivere i parametri esplicitamente usiamo `encodeVal()`.

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
    } // testEncodeVal
```

L'unico test aggiuntivo in `testEncodeVal()` è verificare che la lunghezza di `_callInput` sia corretta. Per la prima chiamata è 4+33\*4. Per la seconda, dove ogni valore è già nella cache, è 4+1\*4.

```solidity
    // Testa encodeVal quando la chiave è più di un singolo byte
    // Massimo tre byte perché riempire la cache a quattro byte richiede
    // troppo tempo.
    function testEncodeValBig() public {
        // Mette un certo numero di valori nella cache.
        // Per mantenere le cose semplici, usa la chiave n per il valore n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

La funzione `testEncodeVal` sopra scrive solo quattro valori nella cache, quindi [la parte della funzione che gestisce i valori multi-byte](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) non viene controllata. Ma quel codice è complicato e soggetto a errori.

La prima parte di questa funzione è un ciclo che scrive tutti i valori da 1 a 0x1FFF nella cache in ordine, in modo da poter codificare quei valori e sapere dove stanno andando.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F), // Un byte        0x0F
            cache.encodeVal(0x0010), // Due byte     0x1010
            cache.encodeVal(0x0100), // Due byte     0x1100
            cache.encodeVal(0x1000) // Tre byte 0x201000
        );
```

Testa valori di un byte, due byte e tre byte. Non testiamo oltre perché ci vorrebbe troppo tempo per scrivere abbastanza voci nello stack (almeno 0x10000000, circa un quarto di miliardo).

```solidity
        .
        .
        .
        .
    } // testEncodeValBig


    // Testa che con un buffer eccessivamente piccolo otteniamo un revert
    function testShortCalldata() public {
```

Testa cosa succede nel caso anomalo in cui non ci sono abbastanza parametri.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    } // testShortCalldata
```

Poiché si annulla, il risultato che dovremmo ottenere è `false`.

```
    // Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Questa funzione ottiene quattro parametri perfettamente legittimi, tranne per il fatto che la cache è vuota, quindi non ci sono valori da leggere.

```solidity
        .
        .
        .
    // Testa che con un buffer eccessivamente lungo tutto funziona correttamente
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Prima chiamata, la cache è vuota
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primo valore, lo aggiunge alla cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Secondo valore, lo aggiunge alla cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Terzo valore, lo aggiunge alla cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Quarto valore, lo aggiunge alla cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // E un altro valore per "buona fortuna"
            bytes4(0x31112233)
        );
```

Questa funzione invia cinque valori. Sappiamo che il quinto valore viene ignorato perché non è una voce di cache valida, il che avrebbe causato un annullamento se non fosse stato incluso.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    } // testLongCalldata

} // CacheTest

```

## Un'applicazione di esempio {#a-sample-app}

Scrivere test in Solidity va benissimo, ma alla fine della giornata una dApp deve essere in grado di elaborare richieste dall'esterno della catena per essere utile. Questo articolo dimostra come utilizzare il caching in una dApp con `WORM`, che sta per "Write Once, Read Many" (Scrivi una volta, leggi molte). Se una chiave non è ancora stata scritta, puoi scriverci un valore. Se la chiave è già scritta, ottieni un annullamento.

### Il contratto {#the-contract}

[Questo è il contratto](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Ripete per lo più ciò che abbiamo già fatto con `Cache` e `CacheTest`, quindi copriamo solo le parti interessanti.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Il modo più semplice per usare `Cache` è ereditarlo nel nostro contratto.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    } // writeEntryCached
```

Questa funzione è simile a `fourParam` in `CacheTest` sopra. Poiché non seguiamo le specifiche ABI, è meglio non dichiarare alcun parametro nella funzione.

```solidity
    // Rende più facile chiamarci
    // Firma della funzione per writeEntryCached(), per gentile concessione di
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Il codice esterno che chiama `writeEntryCached` dovrà costruire manualmente il calldata, invece di usare `worm.writeEntryCached`, perché non seguiamo le specifiche ABI. Avere questo valore costante rende semplicemente più facile scriverlo.

Nota che anche se definiamo `WRITE_ENTRY_CACHED` come una variabile di stato, per leggerla esternamente è necessario utilizzare la sua funzione getter, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

La funzione di lettura è una `view`, quindi non richiede una transazione e non costa gas. Di conseguenza, non c'è alcun vantaggio nell'usare la cache per il parametro. Con le funzioni view è meglio usare il meccanismo standard che è più semplice.

### Il codice di test {#the-testing-code}

[Questo è il codice di test per il contratto](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Ancora una volta, guardiamo solo ciò che è interessante.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Questo (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) è il modo in cui specifichiamo in un test di Foundry che la chiamata successiva dovrebbe fallire, e il motivo riportato per un fallimento. Questo si applica quando usiamo la sintassi `<contract>.<function name>()` piuttosto che costruire il calldata e chiamare il contratto usando l'interfaccia di basso livello (`<contract>.call()`, ecc.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Qui usiamo il fatto che `cacheWrite` restituisce la chiave della cache. Questo non è qualcosa che ci aspetteremmo di usare in produzione, perché `cacheWrite` cambia lo stato, e quindi può essere chiamato solo durante una transazione. Le transazioni non hanno valori di ritorno, se hanno risultati si suppone che quei risultati vengano emessi come eventi. Quindi il valore di ritorno di `cacheWrite` è accessibile solo dal codice on-chain, e il codice on-chain non ha bisogno del caching dei parametri.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Questo è il modo in cui diciamo a Solidity che mentre `<contract address>.call()` ha due valori di ritorno, a noi interessa solo il primo.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Poiché usiamo la funzione di basso livello `<address>.call()`, non possiamo usare `vm.expectRevert()` e dobbiamo guardare il valore booleano di successo che otteniamo dalla chiamata.

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

Una cosa che non ottieni con i test di Solidity è il codice JavaScript che puoi tagliare e incollare nella tua applicazione. Per scrivere quel codice ho distribuito WORM su [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), la nuova rete di test di [Optimism](https://www.optimism.io/). Si trova all'indirizzo [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Puoi vedere il codice JavaScript per il client qui](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Per usarlo:

1. Clona il repository git:

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

   | Parametro           | Valore                                                                                                                                                               |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC            | La frase mnemonica per un account che ha abbastanza ETH per pagare una transazione. [Puoi ottenere ETH gratuiti per la rete Optimism Goerli qui](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL per Optimism Goerli. L'endpoint pubblico, `https://goerli.optimism.io`, ha un limite di velocità ma è sufficiente per ciò di cui abbiamo bisogno qui                                      |

5. Esegui `index.js`.

   ```sh
   node index.js
```

   Questa applicazione di esempio scrive prima una voce in WORM, visualizzando il calldata e un link alla transazione su Etherscan. Quindi rilegge quella voce e visualizza la chiave che utilizza e i valori nella voce (valore, numero del blocco e autore).

La maggior parte del client è normale JavaScript per dApp. Quindi, ancora una volta, esamineremo solo le parti interessanti.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Serve una nuova chiave ogni volta
    const key = await worm.encodeVal(Number(new Date()))
```

Un determinato slot può essere scritto solo una volta, quindi usiamo il timestamp per assicurarci di non riutilizzare gli slot.

```javascript
const val = await worm.encodeVal("0x600D")

// Scrive una voce
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers si aspetta che i dati della chiamata siano una stringa esadecimale, `0x` seguita da un numero pari di cifre esadecimali. Poiché sia `key` che `val` iniziano con `0x`, dobbiamo rimuovere quelle intestazioni.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Come con il codice di test di Solidity, non possiamo chiamare normalmente una funzione memorizzata nella cache. Invece, dobbiamo usare un meccanismo di livello inferiore.

```javascript
    .
    .
    .
    // Legge la voce appena scritta
    const realKey = '0x' + key.slice(4) // rimuove il flag FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Per leggere le voci possiamo usare il meccanismo normale. Non c'è bisogno di usare il caching dei parametri con le funzioni `view`.

## Conclusione {#conclusion}

Il codice in questo articolo è una prova di concetto, lo scopo è rendere l'idea facile da capire. Per un sistema pronto per la produzione potresti voler implementare alcune funzionalità aggiuntive:

- Gestire valori che non sono `uint256`. Ad esempio, le stringhe.
- Invece di una cache globale, magari avere una mappatura tra utenti e cache. Utenti diversi usano valori diversi.
- I valori utilizzati per gli indirizzi sono distinti da quelli utilizzati per altri scopi. Potrebbe avere senso avere una cache separata solo per gli indirizzi.
- Attualmente, le chiavi della cache si basano su un algoritmo "primo arrivato, chiave più piccola". I primi sedici valori possono essere inviati come un singolo byte. I successivi 4080 valori possono essere inviati come due byte. Il successivo milione circa di valori sono tre byte, ecc. Un sistema di produzione dovrebbe mantenere contatori di utilizzo sulle voci della cache e riorganizzarle in modo che i sedici valori _più comuni_ siano di un byte, i successivi 4080 valori più comuni di due byte, ecc.

  Tuttavia, questa è un'operazione potenzialmente pericolosa. Immagina la seguente sequenza di eventi:

  1. Noam Naive chiama `encodeVal` per codificare l'indirizzo a cui vuole inviare i token. Quell'indirizzo è uno dei primi utilizzati sull'applicazione, quindi il valore codificato è 0x06. Questa è una funzione `view`, non una transazione, quindi è tra Noam e il nodo che utilizza, e nessun altro ne è a conoscenza.

  2. Owen Owner esegue l'operazione di riordino della cache. Pochissime persone utilizzano effettivamente quell'indirizzo, quindi ora è codificato come 0x201122. A un valore diverso, 10<sup>18</sup>, viene assegnato 0x06.

  3. Noam Naive invia i suoi token a 0x06. Vanno all'indirizzo `0x0000000000000000000000000de0b6b3a7640000`, e poiché nessuno conosce la chiave privata per quell'indirizzo, rimangono semplicemente bloccati lì. Noam _non è felice_.

  Ci sono modi per risolvere questo problema, e il problema correlato delle transazioni che si trovano nella mempool durante il riordino della cache, ma devi esserne consapevole.

Ho dimostrato il caching qui con Optimism, perché sono un dipendente di Optimism e questo è il rollup che conosco meglio. Ma dovrebbe funzionare con qualsiasi rollup che addebita un costo minimo per l'elaborazione interna, in modo che in confronto la scrittura dei dati della transazione su L1 sia la spesa maggiore.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).