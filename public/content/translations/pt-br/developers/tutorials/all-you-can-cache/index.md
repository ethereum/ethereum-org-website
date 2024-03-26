---
title: "Tudo que você puder armazenar em cache"
description: Aprenda como criar e usar um contrato de cache para transações de roll-up mais baratas
author: Ori Pomerantz
tags:
  - "camada 2"
  - "armazenamento em cache"
  - "armazenamento"
skill: intermediate
published: 2022-09-15
lang: pt-br
---

Ao usar roll-ups, o custo de um byte na transação é muito mais caro que o custo de um slot de armazenamento. Portanto, faz sentido armazenar em cache o máximo de informações possível na cadeia.

Neste artigo, você aprenderá como criar e usar um contrato de armazenamento em cache de forma que qualquer valor de parâmetro, provável de ser usado diversas vezes, será armazenado em cache e ficará disponível para uso (depois da primeira vez) com um número muito menor de bytes, e como escrever código off-chain para usar esse cache.

Se você quiser pular o artigo e somente ver o código-fonte, [consulte-o aqui](https://github.com/qbzzt/20220915-all-you-can-cache). A pilha de desenvolvimento é [Foundry](https://book.getfoundry.sh/getting-started/installation).

## Design Geral {#overall-design}

Para fins de simplicidade, vamos supor que todos os parâmetros de transação são `uint256`, com 32 bytes de tamanho. Quando recebemos uma transação, fazemos o parse em cada parâmetro deste modo:

1. Se o primeiro byte for `0xFF`, pegue os 32 bytes seguintes como um valor de parâmetro e escreva-o no cache.

2. Se o primeiro byte for `0xFE`, pegue os próximos 32 bytes como um valor de parâmetro, mas _não_ o escreva no cache.

3. Para qualquer outro valor, pegue os primeiros quatro bits como o número de bytes adicionais, e os últimos quatro bits como os bits mais significantes da chave do cache. Veja aqui alguns exemplos:

   | Bytes em calldata | Chave da cache |
   |:----------------- | --------------:|
   | 0x0F              |           0x0F |
   | 0x10,0x10         |           0x10 |
   | 0x12,0xAC         |         0x02AC |
   | 0x2D,0xEA, 0xD6   |       0x0DEAD6 |

## Manipulação do cache {#cache-manipulation}

A cache é implementada em [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Vamos passar por ele linha a linha.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Essas constantes são usadas para interpretar os casos especiais nos quais fornecemos todas as informações, independentemente de as querermos escritas no cache ou não. Escrever no cache requer duas operações [`SSTORE`](https://www.evm.codes/#55) nos slots de armazenamento previamente não utilizados, ao custo de 22.100 gás cada. Portanto, deixamos isso opcional.

```solidity

    mapping(uint => uint) public val2key;
```

Um [mapeamento](https://www.geeksforgeeks.org/solidity-mappings/) entre os valores e suas chaves. Esta informação é necessária para codificar valores antes de você enviar a transação.

```solidity
    // Location n has the value for key n+1, because we need to preserve
    // zero as "not in the cache".
    uint[] public key2val;
```

Podemos usar uma matriz para mapear das chaves aos valores, pois atribuímos as chaves e, para simplificar, fazemos isso de modo sequencial.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Ler um valor da cache.

```solidity
    // Write a value to the cache if it's not there already
    // Only public to enable the test to work
    function cacheWrite(uint _value) public returns (uint) {
        // If the value is already in the cache, return the current key
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Não faz sentido colocar o mesmo valor no cache mais de uma vez. Se o valor já está lá, apenas retorne a chave existente.

```solidity
        // Since 0xFE is a special case, the largest key the cache can
        // hold is 0x0D followed by 15 0xFF's. If the cache length is already that
        // large, fail.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Não acho que iremos algum dia ter um cache tão grande (cerca de 1,8\*10<sup>37</sup> entradas, o que exigiria cerca de 10<sup>27</sup> TB de armazenamento). No entanto, eu sou velho o suficiente para lembrar que ["640kB sempre será o suficiente"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Este teste é muito barato.

```solidity
        // Write the value using the next key
        val2key[_value] = key2val.length+1;
```

Adicione a busca reversa (do valor para a chave).

```solidity
        key2val.push(_value);
```

Adicione a busca para frente (da chave para o valor). Como atribuímos valores de modo sequencial, podemos apenas adicioná-los depois do último valor da matriz.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Retorne o novo tamanho de `key2val`, que é a célula onde o novo valor está armazenado.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Essa função lê um valor de calldata de tamanho arbitrário (até 32 bytes, o tamanho da palavra).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

A função é interna, por isso, se o resto do código for escrito corretamente, esses testes não serão obrigatórios. Porém, como eles não custam muito, podemos tê-los de qualquer forma.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Este código está em [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Ele lê um valor de 32 bytes do calldata. Isso funciona até mesmo se o calldata parar antes `startByte+32`, pois o espaço não inicializado na EVM é considerado como zero.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Não queremos necessariamente um valor de 32 bytes. Isso elimina os bytes em excesso.

```solidity
        return _retVal;
    } // _calldataVal


    // Read a single parameter from the calldata, starting at _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Leia um único parâmetro do calldata. Observe que precisamos retornar não somente o valor que lemos, mas também a localização do próximo byte, pois os parâmetros podem estar na faixa de comprimento de 1 byte a 33 bytes.

```solidity
        // The first byte tells us how to interpret the rest
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

O Solidity tenta reduzir o número de bugs proibindo [conversões de tipo implícitas](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) potencialmente perigosas. Um rebaixamento, por exemplo, de 256 bits para 8 bits, precisa ser explícito.

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

Pegue o [nibble](https://en.wikipedia.org/wiki/Nibble) inferior e combine-o com os outros bytes para ler o valor do cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Read n parameters (functions know how many parameters they expect)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Poderíamos pegar o número de parâmetros que temos do calldata propriamente dito, mas as funções que nos chamam sabem quantos parâmetros elas esperam. É mais fácil que elas nos contem.

```solidity
        // The parameters we read
        uint[] memory params = new uint[](_paramNum);

        // Parameters start at byte 4, before that it's the function signature
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Leia os parâmetros até que você tenha o número de que precisa. Se ultrapassarmos o fim do calldata, `_readParams` reverterá a chamada.

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

Uma grande vantagem do Foundry é que ele permite que os testes sejam escritos no Solidity ([veja o teste de cache abaixo](#testing-the-cache)). Isto faz testes unitários muito mais fáceis. Essa é uma função que lê quatro parâmetros e retorna-os para que o teste possa verificar que eles estão corretos.

```solidity
    // Get a value, return bytes that will encode it (using the cache if possible)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` é uma função que o código off-chain chama para ajudar a criar o calldata que usa o cache. Ela recebe um único valor e retorna os bytes que o codificam. Essa função é uma `view`, portanto, ela não requer uma transação e, quando chamada externamente, não custa nenhum gás.

```solidity
        uint _key = val2key[_val];

        // The value isn't in the cache yet, add it
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Na [EVM](/developers/docs/evm/) todo o armazenamento não inicializado é considerado como zero. Então, se buscarmos a chave de um valor que não está lá, obteremos zero. Nesse caso, os bytes que o codificaram são `INTO_CACHE` (portanto, ele será armazenado em cache da próxima vez), seguido do valor real.

```solidity
        // If the key is <0x10, return it as a single byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Bytes únicos são os mais fáceis. Somente usamos [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) para transformar um tipo de `bytes<n>` em uma matriz de bytes que pode ser de qualquer tamanho. Apesar do nome, isso funciona bem quando fornecemos somente um argumento.

```solidity
        // Two byte value, encoded as 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Quando temos uma chave que é inferior a 16<sup>3</sup>, podemos expressá-la em dois bytes. Primeiro, convertemos `_key`, que é um valor de 256 bits, para um valor de 16 bits e usamos um cálculo lógico para adicionar o número de bytes extras ao primeiro byte. Então, convertemos o byte em um valor `bytes2`, que pode ser convertido para `bytes`.

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

Os outros valores (3 bytes, 4 bytes, etc.) são manipulados da mesma maneira, apenas com diferentes tamanhos de campo.

```solidity
        // If we get here, something is wrong.
        revert("Error in encodeVal, should not happen");
```

Se chegarmos até aí, significa que temos a chave que não é inferior a 16\*256<sup>15</sup>. Porém, `cacheWrite` limita as chaves, portanto, não conseguimos nem mesmo chegar a 14\*256<sup>16</sup> (o que teria o primeiro byte de 0xFE, que se pareceria com `DONT_CACHE`). Mas ele não nos custa tanto para adicionar um teste caso um futuro programador introduza um bug.

```solidity
    } // encodeVal

}  // Cache
```

### Testando o cache {#testing-the-cache}

Uma das vantagens do Foundry é que [ele deixa você escrever testes em Solidity](https://book.getfoundry.sh/forge/tests), o que facilita escrever testes de unidade. Os testes para a classe `Cache` estão [aqui](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Como o código de teste pode ser repetitivo, assim como os testes tendem a ser, este artigo explica apenas as partes interessantes.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Need to run `forge test -vv` for the console.
import "forge-std/console.sol";
```

Isso é apenas um modelo necessário para usar o pacote de teste e `console.log`.

```solidity
import "src/Cache.sol";
```

Precisamos conhecer o contrato que estamos testando.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

A função `setUp` é chamada antes de cada teste. Nesse caso, acabamos de criar um novo cache, de modo que nossos testes não sejam afetados um pelo outro.

```solidity
    function testCaching() public {
```

Testes são funções cujos nomes começam com `test`. Essa função verifica a funcionalidade básica do cache, escrevendo valores e lendo-os novamente.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Isto é como você faz teste realmente, usando as funções [`assert...`](https://book.getfoundry.sh/reference/forge-std/std-assertions). Nesse caso, nós verificamos que o valor que escrevemos é o mesmo que lemos. Podemos descartar o resultado de `cache.cacheWrite`, pois sabemos que as chaves do cache são atribuídos linearmente.

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

Primeiro, escrevemos cada valor duas vezes para o cache e nos certificamos de que as chaves são as mesmas (ou seja, a segunda escrita não aconteceu realmente).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Na teoria poderia haver um bug que não afetasse escritas em cache consecutivas. Então, fazemos aqui algumas escritas que não sejam consecutivas e observamos que os valores ainda não foram reescritos.

```solidity
    // Read a uint from a memory buffer (to make sure we get back the parameters
    // we sent out)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Leia uma palavra de 256 bits de um buffer de `bytes memory`. Essa função utilitária nos deixa verificar que recebemos os resultados corretos quando executamos uma chamada de função que usa o cache.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

O Yul não suporta estruturas de dados além de `uint256`, então quando você se refere a uma estrutura de dados mais sofisticada, como um buffer de memória `_bytes`, você obtém o endereço dessa estrutura. O Solidity armazena valores `bytes memory` como uma palavra de 32 bytes que contém o tamanho, seguida dos bytes reais, então, para obter o número de bytes `_start`, precisamos calcular `_bytes+32+_start`.

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

Algumas constantes de que precisamos para os testes.

```solidity
    function testReadParam() public {
```

Chame `fourParams()`, uma função que usa `readParams`, para testar nós podemos ler parâmetros corretamente.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Não podemos usar o mecanismo de ABI normal para chamar uma função usando o cache, por isso, precisamos usar o mecanismo de baixo nível [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Esse mecanismo pega um `bytes memory` como entrada e retorna aquele (assim como o valor booleano) como saída.

```solidity
        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

É útil para o mesmo contrato suportar ambas funções em cache (para chamadas diretamente de transações) e funções não em cache (para chamadas de outros contratos inteligentes). Para fazer isso nós precisamos continuar a confiar no mecanismo Solidity para chamar a função correta, ao invés de pôr tudo em [uma função `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Fazer isso torna a componibilidade muito mais fácil. Um único byte seria suficiente para identificar a função na maioria dos casos, por isso, estamos desperdiçando três bytes (16\*3=48 gás). No entanto, no momento em que escrevo este artigo, 48 gás custam 0,07 centavos de dólar, o que é um custo razoável para um código mais simples e menos sujeito a bugs.

```solidity
            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

O primeiro valor: Um sinalizador dizendo que é um valor que precisa ser escrito na cache, seguido pelos 32 bytes do valor. Os outros três valores são similares, exceto que `VAL_B` não é escrito no cache e `VAL_C` é ambos o terceiro e quarto parâmetros.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

É aqui que realmente chamamos o contrato `Cache`.

```solidity
        assertEq(_success, true);
```

Nós esperamos que a chamada tenha sucesso.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Nós começamos com uma cache vazia e então adicionamos `VAL_A` seguida de `VAL_C`. Nós esperaríamos a primeira ter a chave 1, e a segunda ter a 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

A saída é composta pelos quatro parâmetros. Aqui, verificamos que está correto.

```solidity
        // Second call, we can use the cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value in the Cache
            bytes1(0x01),
```

As chaves de cache abaixo de 16 correspondem a apenas um byte.

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

Os testes depois da chamada são idênticos a aqueles depois da primeira chamada.

```solidity
    function testEncodeVal() public {
```

Esta função é similar a `testReadParam`, exceto que ao invés de escrever os parâmetros explicitamente, nós usamos `encodeVal()`.

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

O único teste adicional em `testEncodeVal()` é verificar que o comprimento de `_callInput` está correto. Para a primeira chamada, ele é 4+33\*4. Para a segunda, na qual cada valor já está no cache, ele é 4+1\*4.

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

A função `testEncodeVal` acima somente escreve quatro valores na cache, então [a parte da função que lida com valores multi-byte](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) não é checada. Porém, esse código é complicado e sujeito a erros.

A primeira parte dessa função é um loop que escreve todos os valores de 1 até 0x1FFF para o cache em ordem, a fim de podermos codificar esses valores e saber para onde eles estão indo.

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

Teste valores de um byte, dois bytes e três bytes. Não testamos além disso, pois levaria tempo demais para escrever entradas de pilha suficientes (pelo menos 0x10000000, cerca de um quarto de bilhão).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Test what with an excessively small buffer we get a revert
    function testShortCalldata() public {
```

Teste o que acontece no caso anormal em que não há parâmetros suficientes.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Como ele é revertido, o resultado deve ser `false`.

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

Esta função pega quatro parâmetros perfeitamente legítimos, exceto que a cache está vazia, então não há valores lá para ler.

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

Esta função envia cinco valores. Sabemos que o quinto valor é ignorado porque não é uma entrada de cache válida, o que causaria uma reversão se não tivesse sido incluída.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Uma amostra do aplicativo {#a-sample-app}

Escrever testes em Solidity é tudo muito bem, mas no final do dia, um dapp precisa ser capaz de processar requisições de fora da cadeia para ser útil. Este artigo demonstra como usar o cache em um dapp com `WORM`, que significa “escrever uma vez, ler várias” (em inglês, "Write Once, Read Many"). Se uma chave ainda não estiver escrita, você pode escrever um valor para ela. Se a chave já estiver escrita, você terá uma reversão.

### O contrato {#the-contract}

[Este é o contrato](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Ele repete, em grande parte, o que já fizemos com `Cache` e `CacheTest`, então abrangeremos somente as partes que são interessantes.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

A maneira mais fácil de usar `Cache` é herdá-lo no seu próprio contrato.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Essa função é similar a `fourParam` no `CacheTest` acima. Como nós não seguimos as especificações da ABI, é melhor não declarar nenhum parâmetro dentro da função.

```solidity
    // Make it easier to call us
    // Function signature for writeEntryCached(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

O código externo que chama `writeEntryCached` precisará construir manualmente o calldata, ao invés de usar `worm.writeEntryCached`, porque nós não seguimos as especificações da ABI. Tendo o valor desta constante só facilita escrevê-la.

Observe que, apesar de definirmos `WRITE_ENTRY_CACHED` como uma variável de estado, para lê-la externamente é necessário usar a função getter, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

A função de leitura é uma `view`, então ela não requer uma transação e não custa gas. Como resultado, não há benefício de usar cache para o parâmetro. Com funções view é melhor usar o mecanismo padrão, que é mais simples.

### O código de teste {#the-testing-code}

[Este é o código de teste para o contrato](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Novamente, vamos ver somente o que é interessante.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Este (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) é como especificamos em um teste Foundry que a próxima chamada deve falhar, assim como a razão dessa falha. Isto se aplica quando nós usamos a sintaxe `<contract>.<function name>()` ao invés de construir o calldata e chamar o contrato usando interface de baixo nível (`<contract>.call()`, etc.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Aqui nós usamos o fato de `cacheWrite` retornar a chave da cache. Isto não é algo que nós esperaríamos usar em produção, porque `cacheWrite` altera o estado, e por isso pode ser chamado apenas durante a transação. Transações não têm valores de retorno. Se elas têm resultados, esses resultados devem ser supostamente emitidos como eventos. Assim, o valor de retorno de `cacheWrite` é somente acessível do código on-chain, e o código on-chain não precisa armazenar parâmetros em cache.

```solidity
        (_success,) = address(worm).call(_callInput);
```

É assim que contamos ao Solidity que, enquanto `<contract address>.call()` tem dois valores de retorno, só nos importamos com o primeiro.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Como usamos a função de baixo nível `<address>.call()`, não podemos usar `vm.expectRevert()` e temos de olhar para o valor de êxito booleano que obtivemos da chamada.

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

Essa é a maneira que verificamos que o código [emite um evento corretamente](https://book.getfoundry.sh/cheatcodes/expect-emit) no Foundry.

### O cliente {#the-client}

Uma coisa que você não obtém com testes no Solidity é código JavaScript, que você pode cortar e colar no seu próprio aplicativo. Para escrever este código, implantei WORM na [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), a nova rede de teste da [Optimism](https://www.optimism.io/). Ela está no endereço [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Você pode ver o código JavaScript para o cliente aqui](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Para usá-lo:

1. Clone o repositório git:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Instale os pacotes necessários:

   ```sh
   cd javascript
   yarn
   ```

3. Copie o arquivo de configuração:

   ```sh
   cp .env.example .env
   ```

4. Edite `.env` para a sua configuração:

   | Parâmetro             | Valor                                                                                                                                                                     |
   | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMÔNICO             | O mnemônico para uma conta que tem ETH suficiente para pagar por uma transação. [Você consegue ETH grátis para a rede Optimism Goerli aqui](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL da Optimism Goerli. O endpoint público, `https://goerli.optimism.io`, tem taxa limitada mas suficiente para o que precisamos aqui                                     |

5. Rode `index.js`.

   ```sh
   node index.js
   ```

   Primeiro, esse exemplo de aplicativo escreve uma entrada para WORM, exibindo o calldata e um link para a transação no Etherscan. Em seguida, ele lê novamente essa entrada e exibe a chave que usou e os valores na entrada (valor, bloco, número e autor).

A maioria dos clientes é Javascript Dapp normal. Então, novamente, passaremos apenas pelas partes interessantes.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Need a new key every time
    const key = await worm.encodeVal(Number(new Date()))
```

Um dado slot pode ser apenas escrito uma vez, então usamos o carimbo de data/hora para ter certeza de que não vamos reutilizar esses slots.

```javascript
const val = await worm.encodeVal("0x600D")

// Write an entry
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers espera que o dado da chamada seja uma cadeia de caracteres hexadecimal, `0x` seguida de um número par de dígitos hexadecimais. Como `key` e `val` começam com `0x`, precisamos remover esses cabeçalhos.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Como no código de teste Solidity, não podemos chamar uma função em cache normalmente. Ao invés disso, nós precisamos usar um mecanismo de nível mais baixo.

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

Para ler entradas, podemos usar o mecanismo normal. Não há necessidade de armazenar em cache parâmetros com funções `view`.

## Conclusão {#conclusion}

O código neste artigo é uma prova de conceito, a finalidade é tornar a ideia fácil de entender. Para um sistema pronto para produção, recomenda-se implementar funcionalidades adicionais:

- Manipular valores que não são `uint256`. Por exemplo, cadeias de caracteres.
- Em vez de um cache global, talvez ter um mapeamento entre usuários e caches. Usuários diferentes usam valores diferentes.
- Valores usados para endereços são distintos daqueles usados para outras finalidades. Pode fazer sentido ter um cache separado só para endereços.
- Atualmente, as chaves de cache estão em um algoritmo do tipo “o primeiro que chega tem a chave menor”. Os primeiros dezesseis valores podem ser enviados como um único byte. Os próximos 4.080 valores podem ser enviados como dois bytes. Os próximos milhões de valores são três bytes, etc. Um sistema de produção deveria manter contadores de uso nas entradas de cache e reorganizá-las para que os dezesseis _mais comuns_ valores sejam um byte, os próximos 4080 valores mais comuns sejam dois bytes, etc.

  No entanto, essa é uma operação potencialmente perigosa. Imagine a seguinte sequência de eventos:

  1. Noam Naive chama `encodeVal` para codificar o endereço para o qual ele quer enviar tokens. Este endereço é um dos primeiros usados na aplicação, então o valor codificado é 0x06. Trata-se de uma função `view`, e não uma transação, então ela diz respeito unicamente a Noam e ao nó que ele usa, e ninguém mais sabe disso

  2. Owen Owner executa a operação de reordenação de cache. Muito poucas pessoas realmente usam esse endereço, por isso, ele é agora codificado como 0x201122. Para um valor diferente, 10<sup>18</sup>, é atribuído 0x06.

  3. Noam Naive envia seus tokens para 0x06. Eles vão para o endereço `0x0000000000000000000000000de0b6b3a7640000`, e já que ninguém sabe a chave privada para esse endereço, eles ficam presos lá. Noam _não está contente_.

  Existem maneiras de resolver esse problema, e o problema relacionado às transações que estão na mempool durante a reordenação do cache, mas você deve estar atento a isso.

Demonstrei o processo de armazenamento em cache aqui com o Optimism, porque sou funcionário da Optimism e esse é o roll-up que conheço melhor. Mas deve funcionar com qualquer rollup que cobre um mínimo custo por processamento interno, de modo que em comparação com escrever os dados da transação na L1 é a maior despesa.
