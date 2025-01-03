---
title: "Todo lo que pueda almacenar en una memoria caché"
description: Aprenda a crear y usar un contrato de almacenamiento en caché para transacciones acumuladas más baratas.
author: Ori Pomerantz
tags:
  - "capa 2"
  - "guardar en caché"
  - "almacenamiento"
skill: intermediate
published: 2022-09-15
lang: es
---

Cuando se utilizan rollups (o acumulaciones), el coste de un byte en la transacción es mucho más caro que el coste de una ranura de almacenamiento. Por lo tanto, tiene sentido almacenar en caché la mayor cantidad de información posible en la cadena.

En este artículo, aprenderá a crear y usar un contrato de almacenamiento en caché de tal manera que cualquier valor de parámetro que se pueda usar varias veces se almacenará en caché, y estará disponible para su uso (después de la primera vez) con un número mucho menor de bytes, y cómo cancelar el código de cadena que utiliza esa caché.

Si quiere omitir el artículo y ver el código fuente, [lo encontrará aquí](https://github.com/qbzzt/20220915-all-you-can-cache). La pila de desarrollo es [Foundry](https://book.getfoundry.sh/getting-started/installation).

## Diseño general {#overall-design}

En aras de la simplicidad, asumiremos que todos los parámetros de la transacción tienen una longitud de `uint256`, 32 bytes. Cuando recibamos una transacción, analizaremos cada parámetro de la siguiente manera:

1. Si el primer byte es `0xFF`, tome los siguientes 32 bytes como valor de parámetro y escríbalos en la caché.

2. Si el primer byte es `0xFE`, tome los siguientes 32 bytes como valor de parámetro, pero _no_ lo escriba en la caché.

3. Para cualquier otro valor, tome los cuatro bits superiores como el número de bytes adicionales, y los cuatro bits inferiores como los bits más significativos de la clave de caché. He aquí algunos ejemplos:

   | Bytes en calldata | Clave de caché |
   |:----------------- | --------------:|
   | 0x0F              |           0x0F |
   | 0x10,0x10         |           0x10 |
   | 0x12,0xAC         |         0x02AC |
   | 0x2D,0xEA, 0xD6   |       0x0DEAD6 |

## Manipulación de caché {#cache-manipulation}

La caché se implementa en [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Vamos a repasarlo línea por línea.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Estas constantes se utilizan para interpretar los casos especiales en los que proporcionamos toda la información y queremos que se escriba en la caché o no. Escribir en la caché requiere dos operaciones [`SSTORE`](https://www.evm.codes/#55) en ranuras de almacenamiento no utilizadas hasta el momento a un coste de 22.100 de gas cada una, por lo que lo hacemos opcional.

```solidity

    mapping(uint => uint) public val2key;
```

Un [mapeo](https://www.geeksforgeeks.org/solidity-mappings/) entre los valores y sus claves. Esta información es necesaria para codificar los valores antes de enviar la transacción.

```solidity
    // Location n has the value for key n+1, because we need to preserve
    // zero as "not in the cache".
    uint[] public key2val;
```

Podemos usar una matriz para el mapeo de claves a valores porque asignamos las claves, y por simplicidad, lo hacemos secuencialmente.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Leer un valor de la caché.

```solidity
    // Write a value to the cache if it's not there already
    // Only public to enable the test to work
    function cacheWrite(uint _value) public returns (uint) {
        // If the value is already in the cache, return the current key
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

No tiene sentido poner el mismo valor en la caché más de una vez. Si el valor ya está ahí, simplemente devuelva la clave existente.

```solidity
        // Since 0xFE is a special case, the largest key the cache can
        // hold is 0x0D followed by 15 0xFF's. If the cache length is already that
        // large, fail.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

No creo que alguna vez tengamos una caché tan grande (aproximadamente 1,8\*10<sup>37</sup> entradas, lo que requeriría alrededor de 10<sup>27</sup> TB para almacenar). Sin embargo, tengo la edad suficiente para recordar que ["640 kB siempre sería suficiente"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Esta prueba es muy barata.

```solidity
        // Write the value using the next key
        val2key[_value] = key2val.length+1;
```

Añada la búsqueda inversa (del valor a la clave).

```solidity
        key2val.push(_value);
```

Añade la búsqueda hacia adelante (desde la clave hasta el valor). Debido a que asignamos valores secuencialmente, podemos añadirlos después del último valor de la matriz.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Devuelve la nueva longitud de `key2val`, que es la celda donde se almacena el nuevo valor.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Esta función lee un valor de Calldata de longitud arbitraria (hasta 32 bytes, el tamaño de la palabra).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Esta función es interna, por lo que si el resto del código está escrito correctamente, estas pruebas no son necesarias. Aunque tampoco es que cuesten tanto, así que podríamos tenerlas.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Este código está en [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Lee un valor de 32 bytes de los Calldata. Esto funciona incluso si los Calldata se detienen antes de `startByte+32` porque el espacio no inicializado en EVM se considera cero.

```solidity
        _retVal = _retVal >> (256-length*8);
```

No queremos necesariamente un valor de 32 bytes. Esto elimina el exceso de bytes.

```solidity
        return _retVal;
    } // _calldataVal


    // Read a single parameter from the calldata, starting at _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Lea un solo parámetro de los Calldata. Tenga en cuenta que necesitamos devolver no solo el valor que leemos, sino también la ubicación del siguiente byte, porque la longitud de los parámetros puede variar de 1 byte a 33 bytes.

```solidity
        // The first byte tells us how to interpret the rest
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity intenta reducir el número de errores al prohibir [conversiones de tipo implícito potencialmente peligrosas](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions). Una degradación, por ejemplo, de 256 bits a 8 bits, debe ser explícita.

```solidity

        // Read the value, but do not write it to the cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Read the value, and write it to the cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // If we got here it means that we need to read from the cache

        // Number of extra bytes to read
        uint8 _extraBytes = _firstByte / 16;
```

Toma el [nibble](https://en.wikipedia.org/wiki/Nibble) inferior y combínalo con los otros bytes para leer el valor de la caché.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Read n parameters (functions know how many parameters they expect)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Podríamos obtener el número de parámetros que tenemos de los propios Calldata, pero las funciones que nos invocan, saben cuántos parámetros esperan. Es más fácil dejar que nos lo digan.

```solidity
        // The parameters we read
        uint[] memory params = new uint[](_paramNum);

        // Parameters start at byte 4, before that it's the function signature
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Lea los parámetros hasta obtener el número que necesite. Si nos pasamos el final de los Calldata, `_readParams` esta revertirá.

```solidity

        return(params);
    }   // readParams

    // For testing _readParams, test reading four parameters
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Una de las principales ventajas de Foundry es que permite escribir las pruebas en Solidity ([ver más adelante Probar la caché](#testing-the-cache)). Esto hace que las pruebas unitarias sean mucho más fáciles. Esta es una función que lee cuatro parámetros y los devuelve, de manera que la prueba puede verificar si son correctos.

```solidity
    // Get a value, return bytes that will encode it (using the cache if possible)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` es una función que activa el código fuera de la cadena para ayudar a crear los Calldata que utilizan la caché. Esta recibe un único valor y devuelve los bytes que lo codifican. Esta función es una `view`, por lo que no requiere una transacción y cuando se activa externamente no cuesta gas.

```solidity
        uint _key = val2key[_val];

        // The value isn't in the cache yet, add it
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

En la [EVM](/developers/docs/evm/) se asume que todo el almacenamiento sin inicializar son ceros. Por tanto, si buscamos la clave para un valor que no está ahí, obtenemos un cero. En ese caso, los bytes que lo codifican son `INTO_CACHE` (por lo que estará en la caché la próxima vez), seguido de un valor real.

```solidity
        // If the key is <0x10, return it as a single byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Los bytes individuales son los más fáciles. Solo usamos [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) para convertir un tipo `bytes<n>` en una matriz de bytes que puede tener cualquier longitud. A pesar del nombre, funciona bien cuando se le proporciona un solo argumento.

```solidity
        // Two byte value, encoded as 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Cuando tenemos una clave que es inferior a 16<sup>3</sup>, podemos expresarla en dos bytes. Primero convertimos `_key`, que es un valor de 256 bits, a un valor de 16 bits y usamos la lógica o para añadir el número de bytes adicionales al primer byte. Luego lo convertimos en un valor de `bytes2`, que se puede convertir en `bytes`.

```solidity
        // There is probably a clever way to do the following lines as a loop,
        // but it's a view function so I'm optimizing for programmer time and
        // simplicity.

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

Los otros valores (3 bytes, 4 bytes, etc.) se manejan de la misma manera, solo con diferentes tamaños de campo.

```solidity
        // If we get here, something is wrong.
        revert("Error in encodeVal, should not happen");
```

Si hemos llegado aquí, quiere decir que tenemos una llave que no es inferior a 16\*256<sup>15</sup>. Pero `cacheWrite` limita las claves, por lo que ni siquiera podemos llegar a 14\*256<sup>16</sup> (que tendría un primer byte de 0xFE, por lo que se vería como `DONT_CACHE`). Tampoco nos costaría mucho añadir una prueba en caso de que un futuro programador introduzca un error.

```solidity
    } // encodeVal

}  // Cache
```

### Probar la caché {#testing-the-cache}

Una de las ventajas de Foundry es que [te permite escribir pruebas en Solidity](https://book.getfoundry.sh/forge/tests), lo que facilita la escritura de pruebas unitarias. Las pruebas para la clase `Cache` son [aquí](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Dado que el código de prueba es repetitivo, como suelen ser las pruebas, este artículo solo explica las partes interesantes.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Need to run `forge test -vv` for the console.
import "forge-std/console.sol";
```

Esto es solo la norma que es necesaria para usar el paquete de prueba y `console.log`.

```solidity
import "src/Cache.sol";
```

Necesitamos saber el contrato que estamos probando.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

La función `setUp` se activa antes de cada prueba. En este caso, solo creamos una nueva caché, para que nuestras pruebas no se afecten entre sí.

```solidity
    function testCaching() public {
```

Las pruebas son funciones cuyos nombres comienzan por `test`. Esta función comprueba la funcionalidad básica de la caché, escribiendo valores y leyéndolos de nuevo.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Así es como se hacen las pruebas reales, utilizando las funciones [`assert...`](https://book.getfoundry.sh/reference/forge-std/std-assertions). En este caso, comprobamos que el valor que escribimos es el mismo que leemos. Podemos descartar el resultado de `cache.cacheWrite` porque sabemos que las claves de caché se asignan de forma lineal.

```solidity
        }
    }    // testCaching


    // Cache the same value multiple times, ensure that the key stays
    // the same
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Primero escribimos cada valor dos veces en la caché y nos aseguramos de que las claves sean las mismas (lo que significa que la segunda escritura no ocurrió realmente).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

En teoría, podría haber un error que no afecte a las escrituras consecutivas en caché. Así que aquí hacemos algunas escrituras que no son consecutivas y vemos que los valores aún no se han reescrito.

```solidity
    // Read a uint from a memory buffer (to make sure we get back the parameters
    // we sent out)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Lee una palabra de 256 bits desde un búfer de `bytes de memoria`. Esta función de utilidad nos permite verificar que recibimos los resultados correctos cuando ejecutamos una activación de la función que utiliza la caché.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul no admite estructuras de datos más allá de `uint256`, por lo que cuando usted se refiere a una estructura de datos más sofisticada, como el búfer de memoria `_bytes`, se obtiene la dirección de esa estructura. Solidity almacena valores de `bytes de memoria` como una palabra de 32 bytes que contiene la longitud, seguida de los bytes reales, por lo que para obtener el número de bytes `_start` necesitamos calcular `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Function signature for fourParams(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Just some constant values to see we're getting the correct values back
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Algunas de las constantes que necesitamos probar.

```solidity
    function testReadParam() public {
```

Llame a `fourParams()`, una función que utiliza `readParams`, para probar que podemos leer los parámetros correctamente.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

No podemos usar el mecanismo ABI normal para llamar a una función usando la caché, por lo que necesitamos usar el mecanismo de bajo nivel [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Ese mecanismo toma una memoria de `bytes` como entrada, y la devuelve (así como un valor booleano) como salida.

```solidity
        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Es útil que el mismo contrato admita tanto funciones en caché (para activaciones directamente desde transacciones) como funciones no en caché (para activaciones desde otros contratos inteligentes). Para ell, tenemos que seguir confiando en el mecanismo Solidity para activar la función correcta, en lugar de poner todo en [una función `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Esto hace que la composición sea mucho más fácil. Un solo byte sería suficiente para identificar la función en la mayoría de los casos, por lo que estamos desperdiciando tres bytes (16\*3=48 gas). Sin embargo, mientras escribo esto, esos 48 de gas cuestan 0,07 centavos, que es un coste razonable de un código más simple y menos propenso a errores.

```solidity
            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

El primer valor: una bandera que dice que es un valor completo que debe escribirse en la caché, seguido de los 32 bytes del valor. Los otros tres valores son similares, con la salvedad de que `VAL_B` no están escritos en la caché y `VAL_C` es tanto el tercer parámetro como el cuarto.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

Aquí es donde realmente llamamos al contrato `Cache`.

```solidity
        assertEq(_success, true);
```

Esperamos que la activación tenga éxito.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Comenzamos con una caché vacía y luego añadimos `VAL_A` seguido de `VAL_C`. Esperaríamos que la primera tuviera la clave 1 y que la segunda tuviera 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

La salida son los cuatro parámetros. Aquí verificamos que es correcto.

```solidity
        // Second call, we can use the cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value in the Cache
            bytes1(0x01),
```

Las claves de caché por debajo de 16 son solo un byte.

```solidity
            // Second value, don't add it to the cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Third and fourth values, same value
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Las pruebas después de la activación son idénticas a las posteriores a la primera activación.

```solidity
    function testEncodeVal() public {
```

Esta función es similar a `testReadParam`, salvo que en lugar de escribir los parámetros explícitamente usamos `encodeVal()`.

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

La única prueba adicional en `testEncodeVal()` es verificar que la longitud de `_callInput` es correcta. Para la primera activación es 4+33\*4. Para la segunda, donde cada valor ya está en la caché, es 4+1\*4.

```solidity
    // Test encodeVal when the key is more than a single byte
    // Maximum three bytes because filling the cache to four bytes takes
    // too long.
    function testEncodeValBig() public {
        // Put a number of values in the cache.
        // To keep things simple, use key n for value n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

La función `testEncodeVal` anterior solo escribe cuatro valores en la caché, por lo que [la parte de la función que se ocupa de los valores de varios bytes](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) no está marcada. Pero ese código es complicado y propenso a errores.

La primera parte de esta función es un bucle que escribe todos los valores de 1 a 0x1FFF en la caché en orden, por lo que podremos codificar esos valores y saber a dónde van.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // One byte        0x0F
            cache.encodeVal(0x0010),   // Two bytes     0x1010
            cache.encodeVal(0x0100),   // Two bytes     0x1100
            cache.encodeVal(0x1000)    // Three bytes 0x201000
        );
```

Pruebe con los valores de un byte, dos bytes y tres bytes. No probamos más allá de eso, porque llevaría demasiado tiempo escribir suficientes entradas de pila (al menos 0 x 10000000, aproximadamente un cuarto de mil millones).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Test what with an excessively small buffer we get a revert
    function testShortCalldata() public {
```

Pruebe lo que sucede en el caso anormal en el que no haya suficientes parámetros.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Dado que se revierte, el resultado que deberíamos obtener es `false`.

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

Esta función obtiene cuatro parámetros perfectamente legítimos, excepto que la caché está vacía, por lo que no hay valores para leer.

```solidity
        .
        .
        .
    // Test what with an excessively long buffer everything works file
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Second value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Third value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Fourth value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // And another value for "good luck"
            bytes4(0x31112233)
        );
```

Esta función envía cinco valores. Sabemos que el quinto valor se ignora porque no es una entrada de caché válida, lo que habría causado una reversión si no se hubiera incluido.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Una aplicación de muestra {#a-sample-app}

Escribir pruebas en Solidity está muy bien, pero al fin y al cabo una DApp tiene que ser capaz de procesar solicitudes de fuera de la cadena para ser útil. Este artículo muestra cómo usar el almacenamiento en caché en una DApp con `WORM`, que significa «Write Once, Read Many». Si aún no se ha escrito una clave, puede escribirle un valor. Si la clave ya está escrita, se obtiene una reversión.

### El contrato {#the-contract}

[Este es el contrato](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). En su mayoría repite lo que ya hemos hecho con `Cache` y `CacheTest`, por lo que solo cubrimos las partes que son interesantes.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

La forma más fácil de usar `Cache` es heredarlo en nuestro propio contrato.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Esta función es similar a `fourParam` en `CacheTest` anterior. Debido a que no seguimos las especificaciones de ABI, es mejor no declarar ningún parámetro en la función.

```solidity
    // Make it easier to call us
    // Function signature for writeEntryCached(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

El código externo que activa a `writeEntryCached` tendrá que construir manualmente los Calldata, en lugar de usar `worm.writeEntryCached`, porque no seguimos las especificaciones de ABI. Tener este valor constante hace que sea más fácil escribirlo.

Tenga en cuenta que a pesar de que definimos `WRITE_ENTRY_CACHED` como una variable de estado, para leerla externamente es necesario usar la función getter para ella, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

La función de lectura es una `view`, por lo que no requiere una transacción y no cuesta gas. Como resultado, no hay ningún beneficio en usar la caché para el parámetro. Con las funciones de vista, lo mejor es utilizar el mecanismo estándar que es más simple.

### El código de prueba {#the-testing-code}

[Este es el código de prueba para el contrato](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Una vez más, echemos un vistazo a lo que es interesante.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Esto (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) es como especificamos en una prueba de Foundry que la siguiente activación debe fallar, e informamos de la razón del fallo. Esto se aplica cuando usamos la sintaxis `<contract>.<function name>()` en lugar de construir los Calldata y activar el contrato utilizando la interfaz de bajo nivel (`<contract>.call()`, etc.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Aquí nos basamos en que `cacheWrite` devuelve la clave de la caché. Nno es algo que esperábamos usar en la producción, porque `cacheWrite` cambia el estado y, por lo tanto, solo se puede llamar durante una transacción. Las transacciones no tienen valores de retorno, si tienen resultados, se supone que esos resultados se emiten como eventos. Por lo tanto, el valor de retorno `cacheWrite` solo es accesible desde el código en cadena, y el código en cadena no necesita almacenamiento en caché de parámetros.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Así es como le decimos a Solidity que, si bien `<contract address>.call()` tiene dos valores de retorno, solo nos importa el primero.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Dado que usamos la función de bajo nivel `<address>.call()`, no podemos usar `vm.expectRevert()` y tenemos que mirar el valor de éxito booleano que obtenemos de la activación.

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

Esta es la forma en que verificamos que el código [emite un evento correctamente](https://book.getfoundry.sh/cheatcodes/expect-emit) en Foundry.

### El cliente {#the-client}

Una cosa que no se consigue con las pruebas de Solidity es un código JavaScript para cortar y pegar en su propia aplicación. Para escribir ese código, implementé WORM en [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), [Optimism](https://www.optimism.io/) nueva red de prueba. Está en la dirección [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Puede ver el código JavaScript para el cliente aquí](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Para usarlo:

1. Clone el repositorio de git:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Instale los paquetes necesarios:

   ```sh
   cd javascript
   yarn
   ```

3. Copie el archivo de configuración:

   ```sh
   cp .env.example .env
   ```

4. Edite `.env` en su configuración:

   | Parámetro             | Valor                                                                                                                                                                        |
   | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC              | El mnemotécnico de una cuenta que tiene suficiente ETH para pagar una transacción. [Puede obtener ETH gratis para la red Optimism Goerli aquí](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | La URL a Optimism Goerli. La terminal pública, `https://goerli.optimism.io`, tiene una tasa limitada pero suficiente para lo que necesitamos aquí                            |

5. Ejecute `index.js`.

   ```sh
   node index.js
   ```

   Esta aplicación de ejemplo escribe primero una entrada en WORM, mostrando los Calldata y un enlace a la transacción en Etherscan. Luego lee esa entrada y muestra la clave que utiliza y los valores de la entrada (valor, número de bloque y autor).

La mayor parte del cliente es una DApp JavaScript normal. Así que, de nuevo, solo repasamos las partes interesantes.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Need a new key every time
    const key = await worm.encodeVal(Number(new Date()))
```

Una ranura determinada solo se puede escribir una vez, por lo que usamos la marca de tiempo para asegurarnos de no reutilizar las ranuras.

```javascript
const val = await worm.encodeVal("0x600D")

// Write an entry
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers espera que los datos de la activación sean una cadena hexadecimal, `0x` seguida de un número par de dígitos hexadecimales. Como `key` y `val` comienzan por `0x`, tenemos que eliminar esos encabezados.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Al igual que con el código de prueba de Solidity, no podemos activar a una función en caché normalmente. En su lugar, necesitamos usar un mecanismo de nivel inferior.

```javascript
    .
    .
    .
    // Read the entry just written
    const realKey = '0x' + key.slice(4)  // remove the FF flag
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Para leer las entradas podemos usar el mecanismo normal. No es necesario usar el almacenamiento en caché de parámetros con las funciones `view`.

## Conclusión {#conclusion}

El código de este artículo es una prueba de concepto, el propósito es hacer que la idea sea fácil de entender. Para un sistema listo para la producción, es posible que se deseen implementar algunas funciones adicionales:

- Manejar valores que no son `uint256`. Por ejemplo, cadenas.
- En lugar de una caché global, tal vez tenga una asignación entre los usuarios y las cachés. Diferentes usuarios usan diferentes valores.
- Los valores utilizados para las direcciones son distintos de los utilizados para otros fines. Tener una caché separada solo para las direcciones podría ser oportuno.
- Actualmente, las claves de caché están en un algoritmo de «el primero en llegar se lleva la clave más pequeña». Los primeros dieciséis valores se pueden enviar como un solo byte. Los siguientes 4.080 valores se pueden enviar como dos bytes. Los siguientes valores de cerca de un millón son de tres bytes, etc. Un sistema de producción debe mantener los contadores de uso en las entradas de la caché y reorganizarlos de modo que los dieciséis _valores más comunes_ sean de un byte, los siguientes 4.080 valores más comunes de dos bytes, etc.

  Sin embargo, esta es una operación potencialmente peligrosa. Imagine la siguiente secuencia de eventos:

  1. Noam Naive activa `encodeVal` para codificar la dirección a la que quiere enviar tókenes. Esa dirección es una de las primeras utilizadas en la aplicación, por lo que el valor codificado es 0 x 06. Esta es una función `view`, no una transacción, así que está entre Noam y el nodo que usa, y nadie más lo sabe.

  2. Owen Owner ejecuta la operación de reordenación de la caché. Muy pocas personas realmente usan esa dirección, por lo que ahora está codificada como 0 x 201122. Un valor diferente, 10<sup>18</sup>, se asigna 0 x 06.

  3. Noam Naive envía sus fichas a 0 x 06. Van a la dirección `0x0000000000000000000000000de0b6b3a7640000`, y como nadie conoce la clave privada de esa dirección, están atrapados allí. Noam _no está contento al respecto_.

  Hay formas de resolver este problema y el problema relacionado con las transacciones que están en la zona de espera durante el reorden de la caché, pero debe ser consciente de ello.

He demostrado el almacenamiento en caché aquí con Optimism, porque soy un empleado de Optimism y este es el rollup que mejor conozco. Pero debería funcionar con cualquier rollup que cobre un coste mínimo por el procesamiento interno, de modo que, en comparación, escribir los datos de la transacción en L1 sea el mayor gasto.
