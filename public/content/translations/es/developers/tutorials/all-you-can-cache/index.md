---
title: "Todo lo que puedas almacenar en caché"
description: "Aprenda a crear y usar un contrato de almacenamiento en caché para transacciones de rollup más baratas"
author: Ori Pomerantz
tags: ["capa 2", "almacenamiento en caché", "almacenamiento", "escalabilidad"]
skill: intermediate
breadcrumb: "Almacenamiento en caché para rollups"
published: 2022-09-15
lang: es
---

Al usar rollup, cada byte de la transacción debe publicarse en la L1. Cuando se escribió este artículo, eso hacía que el costo de un byte en la transacción fuera mucho más caro que el costo de un slot de almacenamiento. Por lo tanto, tenía sentido almacenar en caché tanta información como fuera posible en cadena.

> **Nota:** Las tarifas de los rollup han cambiado mucho desde que se escribió este artículo en 2022. Desde las [actualizaciones Ecotone y Fjord](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) (2024), las cadenas de OP Stack publican los datos de las transacciones en [blob](/roadmap/danksharding/), y la tarifa de datos de la L1 se basa en una estimación del tamaño _comprimido_ de la transacción, con un mínimo de 100 bytes por transacción ([consulte la especificación](https://specs.optimism.io/protocol/fjord/exec-engine.html)). Como resultado:
>
> - Los bytes cero son casi gratuitos, porque se comprimen bien.
> - Las transacciones cortas ya están en el mínimo de 100 bytes, por lo que hacer que sus datos de llamada sean aún más cortos no reduce su tarifa.
> - El espacio de los blob es barato, por lo que en la Red principal de OP el gas de ejecución de la L2 suele ser una parte mayor de la tarifa que la tarifa de datos de la L1. Escribir un nuevo valor en la caché (dos `SSTORE` de 22100 de gas cada uno) puede costar más que los bytes que ahorra.
>
> El principio sigue siendo válido (menos bytes comprimidos significan una tarifa de datos de la L1 más baja), pero si el almacenamiento en caché vale la pena depende del tamaño de sus transacciones y de los precios actuales del gas de la L1 y la L2. Puede verificar la tarifa de datos de la L1 de una transacción específica llamando a `getL1Fee` en el [despliegue previo de `GasPriceOracle`](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle).

En este artículo aprenderá cómo crear y usar un contrato de almacenamiento en caché de tal manera que cualquier valor de parámetro que probablemente se use varias veces se almacenará en caché y estará disponible para su uso (después de la primera vez) con un número mucho menor de bytes, y cómo escribir código fuera de la cadena que use esta caché.

Si desea omitir el artículo y solo ver el código fuente, [está aquí](https://github.com/qbzzt/20220915-all-you-can-cache). La pila de desarrollo es [Foundry](https://getfoundry.sh/introduction/installation/).

## Diseño general {#overall-design}

Para simplificar, asumiremos que todos los parámetros de la transacción son `uint256`, de 32 bytes de longitud. Cuando recibimos una transacción, analizaremos cada parámetro de la siguiente manera:

1. Si el primer byte es `0xFF`, tome los siguientes 32 bytes como valor de parámetro y escríbalo en la caché.

2. Si el primer byte es `0xFE`, tome los siguientes 32 bytes como valor de parámetro pero _no_ lo escriba en la caché.

3. Para cualquier otro valor, tome los cuatro bits superiores como el número de bytes adicionales, y los cuatro bits inferiores como los bits más significativos de la clave de caché. Aquí hay algunos ejemplos:

   | Bytes en los datos de llamada | Clave de caché |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## Manipulación de la caché {#cache-manipulation}

La caché se implementa en [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Repasémoslo línea por línea.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Estas constantes se utilizan para interpretar los casos especiales en los que proporcionamos toda la información y queremos que se escriba en la caché o no. Escribir en la caché requiere dos operaciones [`SSTORE`](https://www.evm.codes/#55) en slots de almacenamiento no utilizados previamente a un costo de 22100 de gas cada una, por lo que lo hacemos opcional.

```solidity

    mapping(uint => uint) public val2key;
```

Un [mapeo](https://www.geeksforgeeks.org/solidity/solidity-mappings/) entre los valores y sus claves. Esta información es necesaria para codificar los valores antes de enviar la transacción.

```solidity
    // La ubicación n tiene el valor para la clave n+1, porque necesitamos preservar
    // el cero como "no está en la caché".
    uint[] public key2val;
```

Podemos usar un array para el mapeo de claves a valores porque nosotros asignamos las claves, y por simplicidad lo hacemos secuencialmente.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Lee un valor de la caché.

```solidity
    // Escribir un valor en la caché si aún no está allí
    // Solo es público para permitir que la prueba funcione
    function cacheWrite(uint _value) public returns (uint) {
        // Si el valor ya está en la caché, devolver la clave actual
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

No tiene sentido poner el mismo valor en la caché más de una vez. Si el valor ya está ahí, simplemente devuelve la clave existente.

```solidity
        // Dado que 0xFE es un caso especial, la clave más grande que la caché puede
        // contener es 0x0D seguido de 15 0xFF. Si la longitud de la caché ya es tan
        // grande, fallar.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

No creo que alguna vez tengamos una caché tan grande (aproximadamente 1.8\*10<sup>37</sup> entradas, lo que requeriría alrededor de 10<sup>27</sup> TB para almacenar). Sin embargo, soy lo suficientemente mayor como para recordar que ["640kB siempre serían suficientes"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Esta prueba es muy barata.

```solidity
        // Escribir el valor usando la siguiente clave
        val2key[_value] = key2val.length+1;
```

Añade la búsqueda inversa (del valor a la clave).

```solidity
        key2val.push(_value);
```

Añade la búsqueda directa (de la clave al valor). Debido a que asignamos valores secuencialmente, simplemente podemos añadirlo después del último valor del array.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Devuelve la nueva longitud de `key2val`, que es la celda donde se almacena el nuevo valor.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Esta función lee un valor de los datos de llamada de longitud arbitraria (hasta 32 bytes, el tamaño de la palabra).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Esta función es interna, por lo que si el resto del código está escrito correctamente, estas pruebas no son necesarias. Sin embargo, no cuestan mucho, así que bien podríamos tenerlas.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Este código está en [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Lee un valor de 32 bytes de los datos de llamada. Esto funciona incluso si los datos de llamada se detienen antes de `startByte+32` porque el espacio no inicializado en la EVM se considera cero.

```solidity
        _retVal = _retVal >> (256-length*8);
```

No necesariamente queremos un valor de 32 bytes. Esto elimina los bytes sobrantes.

```solidity
        return _retVal;
    } // _calldataVal


    // Leer un solo parámetro de los datos de llamada, comenzando en _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Lee un solo parámetro de los datos de llamada. Tenga en cuenta que necesitamos devolver no solo el valor que leemos, sino también la ubicación del siguiente byte porque los parámetros pueden variar de 1 byte a 33 bytes de longitud.

```solidity
        // El primer byte nos dice cómo interpretar el resto
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity intenta reducir el número de errores prohibiendo las [conversiones de tipo implícitas](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) potencialmente peligrosas. Una reducción, por ejemplo de 256 bits a 8 bits, debe ser explícita.

```solidity

        // Leer el valor, pero no escribirlo en la caché
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Leer el valor y escribirlo en la caché
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Si llegamos aquí significa que necesitamos leer de la caché

        // Número de bytes adicionales a leer
        uint8 _extraBytes = _firstByte / 16;
```

Tome el [nibble](https://en.wikipedia.org/wiki/Nibble) inferior y combínelo con los otros bytes para leer el valor de la caché.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Leer n parámetros (las funciones saben cuántos parámetros esperan)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Podríamos obtener el número de parámetros que tenemos de los propios datos de llamada, pero las funciones que nos llaman saben cuántos parámetros esperan. Es más fácil dejar que nos lo digan.

```solidity
        // Los parámetros que leemos
        uint[] memory params = new uint[](_paramNum);

        // Los parámetros comienzan en el byte 4, antes de eso es la firma de la función
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Lea los parámetros hasta que tenga el número que necesita. Si pasamos el final de los datos de llamada, `_readParams` revertirá la llamada.

```solidity

        return(params);
    }   // readParams

    // Para probar _readParams, probar la lectura de cuatro parámetros
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Una gran ventaja de Foundry es que permite escribir pruebas en Solidity ([consulte Prueba de la caché a continuación](#testing-the-cache)). Esto hace que las pruebas unitarias sean mucho más fáciles. Esta es una función que lee cuatro parámetros y los devuelve para que la prueba pueda verificar que eran correctos.

```solidity
    // Obtener un valor, devolver los bytes que lo codificarán (usando la caché si es posible)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` es una función que el código fuera de la cadena llama para ayudar a crear datos de llamada que usan la caché. Recibe un solo valor y devuelve los bytes que lo codifican. Esta función es un `view`, por lo que no requiere una transacción y cuando se llama externamente no cuesta nada de gas.

```solidity
        uint _key = val2key[_val];

        // El valor aún no está en la caché, agregarlo
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

En la [EVM](/developers/docs/evm/) todo el almacenamiento no inicializado se asume como ceros. Así que si buscamos la clave para un valor que no está ahí, obtenemos un cero. En ese caso, los bytes que lo codifican son `INTO_CACHE` (para que se almacene en caché la próxima vez), seguidos del valor real.

```solidity
        // Si la clave es <0x10, devolverla como un solo byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Los bytes individuales son los más fáciles. Simplemente usamos [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) para convertir un tipo `bytes<n>` en un array de bytes que puede tener cualquier longitud. A pesar del nombre, funciona bien cuando se proporciona con un solo argumento.

```solidity
        // Valor de dos bytes, codificado como 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Cuando tenemos una clave que es menor que 16<sup>3</sup>, podemos expresarla en dos bytes. Primero convertimos `_key`, que es un valor de 256 bits, a un valor de 16 bits y usamos un OR lógico para añadir el número de bytes adicionales al primer byte. Luego simplemente lo convertimos en un valor `bytes2`, que se puede convertir a `bytes`.

```solidity
        // Probablemente haya una forma inteligente de hacer las siguientes líneas como un bucle,
        // pero es una función view, así que estoy optimizando el tiempo del programador y
        // la simplicidad.

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

Los otros valores (3 bytes, 4 bytes, etc.) se manejan de la misma manera, solo que con diferentes tamaños de campo.

```solidity
        // Si llegamos aquí, algo anda mal.
        revert("Error in encodeVal, should not happen");
```

Si llegamos aquí significa que obtuvimos una clave que no es menor que 16\*256<sup>15</sup>. Pero `cacheWrite` limita las claves para que ni siquiera podamos llegar a 14\*256<sup>16</sup> (que tendría un primer byte de 0xFE, por lo que se vería como `DONT_CACHE`). Pero no nos cuesta mucho añadir una prueba en caso de que un futuro programador introduzca un error.

```solidity
    } // encodeVal

}  // Cache
```

### Prueba de la caché {#testing-the-cache}

Una de las ventajas de Foundry es que [le permite escribir pruebas en Solidity](https://getfoundry.sh/forge/tests/overview/), lo que facilita la escritura de pruebas unitarias. Las pruebas para la clase `Cache` están [aquí](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Debido a que el código de prueba es repetitivo, como suelen ser las pruebas, este artículo solo explica las partes interesantes.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Es necesario ejecutar `forge test -vv` para la consola.
import "forge-std/console.sol";
```

Esto es solo código repetitivo que es necesario para usar el paquete de prueba y `console.log`.

```solidity
import "src/Cache.sol";
```

Necesitamos conocer el contrato que estamos probando.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

La función `setUp` se llama antes de cada prueba. En este caso, simplemente creamos una nueva caché, para que nuestras pruebas no se afecten entre sí.

```solidity
    function testCaching() public {
```

Las pruebas son funciones cuyos nombres comienzan con `test`. Esta función comprueba la funcionalidad básica de la caché, escribiendo valores y leyéndolos de nuevo.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Así es como se realiza la prueba real, utilizando [funciones `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). En este caso, comprobamos que el valor que escribimos es el que leemos. Podemos descartar el resultado de `cache.cacheWrite` porque sabemos que las claves de caché se asignan linealmente.

```solidity
        }
    }    // testCaching


    // Almacenar en caché el mismo valor varias veces, asegurarse de que la clave (Aunque 'llave' también se utiliza, 'clave' es el estándar establecido en el ámbito criptográfico y de seguridad informática en español.) se mantenga
    // igual
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

En teoría, podría haber un error que no afecte a las escrituras consecutivas en la caché. Así que aquí hacemos algunas escrituras que no son consecutivas y vemos que los valores aún no se reescriben.

```solidity
    // Leer un uint de un búfer de memoria (para asegurarnos de recuperar los parámetros
    // que enviamos)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Lee una palabra de 256 bits de un búfer `bytes memory`. Esta función de utilidad nos permite verificar que recibimos los resultados correctos cuando ejecutamos una llamada a una función que usa la caché.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul no admite estructuras de datos más allá de `uint256`, por lo que cuando se refiere a una estructura de datos más sofisticada, como el búfer de memoria `_bytes`, obtiene la dirección de esa estructura. Solidity almacena los valores `bytes memory` como una palabra de 32 bytes que contiene la longitud, seguida de los bytes reales, por lo que para obtener el número de byte `_start` necesitamos calcular `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Firma de la función para fourParams(), cortesía de
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Solo algunos valores constantes para ver que estamos recuperando los valores correctos
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Algunas constantes que necesitamos para las pruebas.

```solidity
    function testReadParam() public {
```

Llame a `fourParams()`, una función que usa `readParams`, para probar que podemos leer los parámetros correctamente.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

No podemos usar el mecanismo normal de la ABI para llamar a una función usando la caché, por lo que necesitamos usar el mecanismo de bajo nivel [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Ese mecanismo toma un `bytes memory` como entrada y devuelve eso (así como un valor booleano) como salida.

```solidity
        // Primera llamada, la caché está vacía
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Es útil que el mismo contrato admita tanto funciones almacenadas en caché (para llamadas directamente desde transacciones) como funciones no almacenadas en caché (para llamadas desde otros contratos inteligentes). Para hacer eso, necesitamos seguir confiando en el mecanismo de Solidity para llamar a la función correcta, en lugar de poner todo en [una función `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Hacer esto hace que la composabilidad sea mucho más fácil. Un solo byte sería suficiente para identificar la función en la mayoría de los casos, por lo que estamos desperdiciando tres bytes. Con la fórmula de tarifas actual de OP Stack, esos tres bytes agregan una pequeña fracción de un centavo (si acaso, consulte la nota en la parte superior del artículo), lo cual es un costo razonable para un código más simple y menos propenso a errores.

```solidity
            // Primer valor, añadirlo a la caché
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

El primer valor: una bandera que dice que es un valor completo que debe escribirse en la caché, seguido de los 32 bytes del valor. Los otros tres valores son similares, excepto que `VAL_B` no se escribe en la caché y `VAL_C` es tanto el tercer parámetro como el cuarto.

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

Esperamos que la llamada sea exitosa.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Comenzamos con una caché vacía y luego agregamos `VAL_A` seguido de `VAL_C`. Esperaríamos que el primero tuviera la clave 1 y el segundo tuviera 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

La salida son los cuatro parámetros. Aquí verificamos que sea correcta.

```solidity
        // Segunda llamada, podemos usar la caché
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primer valor en la caché
            bytes1(0x01),
```

Las claves de caché por debajo de 16 son solo de un byte.

```solidity
            // Segundo valor, no añadirlo a la caché
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Tercer y cuarto valor, mismo valor
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Las pruebas después de la llamada son idénticas a las posteriores a la primera llamada.

```solidity
    function testEncodeVal() public {
```

Esta función es similar a `testReadParam`, excepto que en lugar de escribir los parámetros explícitamente usamos `encodeVal()`.

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

La única prueba adicional en `testEncodeVal()` es verificar que la longitud de `_callInput` sea correcta. Para la primera llamada es 4+33\*4. Para la segunda, donde cada valor ya está en la caché, es 4+1\*4.

```solidity
    // Probar encodeVal cuando la clave (Aunque 'llave' también se utiliza, 'clave' es el estándar establecido en el ámbito criptográfico y de seguridad informática en español.) es de más de un solo byte
    // Máximo tres bytes porque llenar la caché a cuatro bytes toma
    // demasiado tiempo.
    function testEncodeValBig() public {
        // Poner una cantidad de valores en la caché.
        // Para mantener las cosas simples, usar la clave (Aunque 'llave' también se utiliza, 'clave' es el estándar establecido en el ámbito criptográfico y de seguridad informática en español.) n para el valor n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

La función `testEncodeVal` anterior solo escribe cuatro valores en la caché, por lo que [la parte de la función que se ocupa de los valores de varios bytes](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) no se comprueba. Pero ese código es complicado y propenso a errores.

La primera parte de esta función es un bucle que escribe todos los valores de 1 a 0x1FFF en la caché en orden, por lo que podremos codificar esos valores y saber a dónde van.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Un byte         0x0F
            cache.encodeVal(0x0010),   // Dos bytes       0x1010
            cache.encodeVal(0x0100),   // Dos bytes       0x1100
            cache.encodeVal(0x1000)    // Tres bytes      0x201000
        );
```

Pruebe valores de un byte, dos bytes y tres bytes. No probamos más allá de eso porque tomaría demasiado tiempo escribir suficientes entradas de pila (al menos 0x10000000, aproximadamente un cuarto de billón).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Probar que con un búfer excesivamente pequeño obtenemos un revertir
    function testShortCalldata() public {
```

Pruebe qué sucede en el caso anormal en el que no hay suficientes parámetros.

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
    // Llamar con claves (Aunque 'llave' también se utiliza, 'clave' es el estándar establecido en el ámbito criptográfico y de seguridad informática en español.) de caché que no están ahí
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primer valor, añadirlo a la caché
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Segundo valor
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Esta función obtiene cuatro parámetros perfectamente legítimos, excepto que la caché está vacía, por lo que no hay valores allí para leer.

```solidity
        .
        .
        .
    // Probar que con un búfer excesivamente largo todo funciona bien
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Primera llamada, la caché está vacía
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primer valor, añadirlo a la caché
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Segundo valor, añadirlo a la caché
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Tercer valor, añadirlo a la caché
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Cuarto valor, añadirlo a la caché
            cache.INTO_CACHE(), bytes32(VAL_D),

            // Y otro valor para la "buena suerte"
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

Escribir pruebas en Solidity está muy bien, pero al final del día una aplicación descentralizada (dapp) necesita poder procesar solicitudes desde fuera de la cadena para ser útil. Este artículo demuestra cómo usar el almacenamiento en caché en una dapp con `WORM`, que significa "Escribir una vez, leer muchas" (Write Once, Read Many). Si una clave aún no está escrita, puede escribir un valor en ella. Si la clave ya está escrita, obtiene una reversión.

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

Esta función es similar a `fourParam` en `CacheTest` arriba. Debido a que no seguimos las especificaciones de la ABI, es mejor no declarar ningún parámetro en la función.

```solidity
    // Hacer que sea más fácil llamarnos
    // Firma de la función para writeEntryCached(), cortesía de
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

El código externo que llama a `writeEntryCached` necesitará construir manualmente los datos de llamada, en lugar de usar `worm.writeEntryCached`, porque no seguimos las especificaciones de la ABI. Tener este valor constante simplemente hace que sea más fácil escribirlo.

Tenga en cuenta que aunque definimos `WRITE_ENTRY_CACHED` como una variable de estado, para leerla externamente es necesario usar la función getter para ella, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

La función de lectura es un `view`, por lo que no requiere una transacción y no cuesta gas. Como resultado, no hay ningún beneficio en usar la caché para el parámetro. Con las funciones de vista es mejor usar el mecanismo estándar que es más simple.

### El código de prueba {#the-testing-code}

[Este es el código de prueba para el contrato](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Nuevamente, veamos solo lo que es interesante.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Así (`vm.expectRevert`)](https://getfoundry.sh/reference/cheatcodes/expect-revert/) es como especificamos en una prueba de Foundry que la siguiente llamada debería fallar, y el motivo informado de un fallo. Esto se aplica cuando usamos la sintaxis `<contract>.<function name>()` en lugar de construir los datos de llamada y llamar al contrato usando la interfaz de bajo nivel (`<contract>.call()`, etc.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Aquí usamos el hecho de que `cacheWrite` devuelve la clave de caché. Esto no es algo que esperaríamos usar en producción, porque `cacheWrite` cambia el estado y, por lo tanto, solo se puede llamar durante una transacción. Las transacciones no tienen valores de retorno, si tienen resultados, se supone que esos resultados se emiten como eventos. Por lo tanto, el valor de retorno de `cacheWrite` solo es accesible desde el código en cadena, y el código en cadena no necesita almacenamiento en caché de parámetros.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Así es como le decimos a Solidity que, si bien `<contract address>.call()` tiene dos valores de retorno, solo nos importa el primero.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Dado que usamos la función de bajo nivel `<address>.call()`, no podemos usar `vm.expectRevert()` y tenemos que mirar el valor booleano de éxito que obtenemos de la llamada.

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

Esta es la forma en que verificamos que el código [emite un evento correctamente](https://getfoundry.sh/reference/cheatcodes/expect-emit/) en Foundry.

### El cliente {#the-client}

Una cosa que no obtiene con las pruebas de Solidity es código JavaScript que puede cortar y pegar en su propia aplicación. La versión original de este tutorial desplegó WORM en Optimism Goerli, que desde entonces se ha cerrado. El repositorio de muestra todavía apunta a Optimism Goerli, por lo que para ejecutar el cliente hoy debe desplegar WORM usted mismo en [OP Sepolia](https://docs.optimism.io/op-stack/introduction/op-stack) y apuntar el cliente a su despliegue.

[Puede ver el código JavaScript para el cliente aquí](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Para usarlo, necesita [Foundry](https://getfoundry.sh/introduction/installation/), [Node.js](https://nodejs.org/) y una cuenta con algo de ETH de OP Sepolia. [La documentación de faucet de Optimism](https://docs.optimism.io/app-developers/tools-sdks/faucets) enumera los faucet actuales de la red de prueba.

1. Clone el repositorio de git, incluido el submódulo `forge-std`, y compile los contratos. El cliente lee la ABI y el código de bytes de WORM de `out/WORM.sol/WORM.json`, que solo existe después de `forge build`.

   ```sh
   git clone --recurse-submodules https://github.com/qbzzt/20220915-all-you-can-cache.git
   cd 20220915-all-you-can-cache
   forge build
   ```

   Forge advierte que `foundry.toml` usa el antiguo nombre de sección `[default]`. Puede ignorar esta advertencia o ejecutar `forge config --fix`.

2. Importe la clave privada de su cuenta con fondos en un almacén de claves cifrado de Foundry y úsela para [desplegar WORM](https://getfoundry.sh/reference/forge/create) en OP Sepolia.

   ```sh
   cast wallet import op-sepolia-deployer --interactive
   forge create src/WORM.sol:WORM --rpc-url https://sepolia.optimism.io --account op-sepolia-deployer --broadcast
   ```

   Sin `--broadcast`, `forge create` solo simula el despliegue. Copie la dirección de la línea `Deployed to:` de la salida.

3. Edite `javascript/index.js`. Reemplace la antigua dirección de Optimism Goerli en esta línea con la dirección de su despliegue:

   ```javascript
   const worm = WormFactory.attach("0xD34335b1d818ceE54e3323D3246bD31d94E6a78a")
   ```

   También puede reemplazar `https://goerli-optimism.etherscan.io` con `https://sepolia-optimism.etherscan.io` en las dos líneas `console.log`, para que los enlaces que imprime el cliente funcionen.

4. Instale los paquetes necesarios:

   ```sh
   cd javascript
   npm install
   ```

5. Copie el archivo de configuración:

   ```sh
   cp .env.example .env
   ```

6. Edite `.env` para su configuración. Los nombres de las variables aún se refieren a Optimism Goerli, pero los valores son para OP Sepolia:

   | Parámetro           | Valor                                                                                                   |
   | ------------------- | ------------------------------------------------------------------------------------------------------- |
   | MNEMONIC            | La frase mnemotécnica para una cuenta que tiene suficiente ETH de OP Sepolia para pagar una transacción.                    |
   | OPTIMISM_GOERLI_URL | La URL de RPC de OP Sepolia, `https://sepolia.optimism.io`, o un punto de conexión de OP Sepolia de otro proveedor. |

7. Ejecute `index.js`.

   ```sh
   node index.js
   ```

   Esta aplicación de muestra primero escribe una entrada en WORM, mostrando los datos de llamada y un enlace a la transacción en un explorador de bloques. Luego lee esa entrada y muestra la clave que usa y los valores en la entrada (valor, número de bloque y autor).

La mayor parte del cliente es JavaScript normal de dapp. Así que, de nuevo, solo repasaremos las partes interesantes.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Se necesita una nueva clave (Aunque 'llave' también se utiliza, 'clave' es el estándar establecido en el ámbito criptográfico y de seguridad informática en español.) cada vez
    const key = await worm.encodeVal(Number(new Date()))
```

Solo se puede escribir en un slot determinado una vez, por lo que usamos la marca de tiempo para asegurarnos de no reutilizar los slot.

```javascript
const val = await worm.encodeVal("0x600D")

// Escribir una entrada
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers espera que los datos de llamada sean una cadena hexadecimal, `0x` seguida de un número par de dígitos hexadecimales. Como `key` y `val` comienzan con `0x`, necesitamos eliminar esos encabezados.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Al igual que con el código de prueba de Solidity, no podemos llamar a una función almacenada en caché normalmente. En su lugar, necesitamos usar un mecanismo de nivel inferior.

```javascript
    .
    .
    .
    // Leer la entrada recién escrita
    const realKey = '0x' + key.slice(4)  // eliminar la bandera FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Para leer entradas podemos usar el mecanismo normal. No hay necesidad de usar el almacenamiento en caché de parámetros con funciones `view`.

## Conclusión {#conclusion}

El código de este artículo es una prueba de concepto, el propósito es hacer que la idea sea fácil de entender. Para un sistema listo para producción, es posible que desee implementar alguna funcionalidad adicional:

- Manejar valores que no son `uint256`. Por ejemplo, cadenas.
- En lugar de una caché global, tal vez tener un mapeo entre usuarios y cachés. Diferentes usuarios usan diferentes valores.
- Los valores utilizados para las direcciones son distintos de los utilizados para otros fines. Podría tener sentido tener una caché separada solo para las direcciones.
- Actualmente, las claves de caché están en un algoritmo de "el primero en llegar, la clave más pequeña". Los primeros dieciséis valores se pueden enviar como un solo byte. Los siguientes 4080 valores se pueden enviar como dos bytes. Los siguientes aproximadamente un millón de valores son de tres bytes, etc. Un sistema de producción debería mantener contadores de uso en las entradas de la caché y reorganizarlas para que los dieciséis valores _más comunes_ sean de un byte, los siguientes 4080 valores más comunes de dos bytes, etc.

  Sin embargo, esa es una operación potencialmente peligrosa. Imagine la siguiente secuencia de eventos:

  1. Noam Naive llama a `encodeVal` para codificar la dirección a la que quiere enviar tokens. Esa dirección es una de las primeras utilizadas en la aplicación, por lo que el valor codificado es 0x06. Esta es una función `view`, no una transacción, por lo que es entre Noam y el nodo que usa, y nadie más lo sabe.

  2. Owen Owner ejecuta la operación de reordenamiento de la caché. Muy pocas personas usan realmente esa dirección, por lo que ahora está codificada como 0x201122. A un valor diferente, 10<sup>18</sup>, se le asigna 0x06.

  3. Noam Naive envía sus tokens a 0x06. Van a la dirección `0x0000000000000000000000000de0b6b3a7640000`, y como nadie conoce la clave privada de esa dirección, simplemente se quedan atascados allí. Noam _no está contento_.

  Hay formas de resolver este problema, y el problema relacionado de las transacciones que están en la mempool durante el reordenamiento de la caché, pero debe ser consciente de ello.

Demostré el almacenamiento en caché aquí con Optimism, porque soy un empleado de Optimism y este es el rollup que mejor conozco. Pero debería funcionar con cualquier rollup que cobre un costo mínimo por el procesamiento interno, de modo que, en comparación, escribir los datos de la transacción en la L1 sea el gasto principal. Como se explica en la nota en la parte superior de este artículo, verifique las tarifas actuales antes de decidir que el almacenamiento en caché vale la pena.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).

