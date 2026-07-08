---
title: "Tudo o que você pode armazenar em cache"
description: "Aprenda a criar e usar um contrato de cache para transações de rollup mais baratas"
author: Ori Pomerantz
tags: ["camada 2", "cache", "armazenamento", "escalabilidade"]
skill: intermediate
breadcrumb: Cache para rollups
published: 2022-09-15
lang: pt-br
---

Ao usar rollups, o custo de um byte na transação é muito mais caro do que o custo de um slot de armazenamento. Portanto, faz sentido armazenar em cache o máximo de informações possível onchain.

Neste artigo, você aprenderá como criar e usar um contrato de cache de forma que qualquer valor de parâmetro que provavelmente será usado várias vezes seja armazenado em cache e fique disponível para uso (após a primeira vez) com um número muito menor de bytes, e como escrever código offchain que usa esse cache.

Se você quiser pular o artigo e apenas ver o código-fonte, [ele está aqui](https://github.com/qbzzt/20220915-all-you-can-cache). A pilha de desenvolvimento é [Foundry](https://getfoundry.sh/introduction/installation/).

## Design geral {#overall-design}

Por uma questão de simplicidade, assumiremos que todos os parâmetros da transação são `uint256`, com 32 bytes de comprimento. Quando recebermos uma transação, analisaremos cada parâmetro da seguinte forma:

1. Se o primeiro byte for `0xFF`, pegue os próximos 32 bytes como um valor de parâmetro e grave-o no cache.

2. Se o primeiro byte for `0xFE`, pegue os próximos 32 bytes como um valor de parâmetro, mas _não_ o grave no cache.

3. Para qualquer outro valor, pegue os quatro bits superiores como o número de bytes adicionais e os quatro bits inferiores como os bits mais significativos da chave de cache. Aqui estão alguns exemplos:

   | Bytes nos dados de chamada | Chave de cache |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## Manipulação de cache {#cache-manipulation}

O cache é implementado em [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Vamos analisá-lo linha por linha.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Essas constantes são usadas para interpretar os casos especiais em que fornecemos todas as informações e queremos que sejam gravadas no cache ou não. Gravar no cache exige duas operações [`SSTORE`](https://www.evm.codes/#55) em slots de armazenamento não utilizados anteriormente a um custo de 22.100 de gás cada, portanto, tornamos isso opcional.

```solidity

    mapping(uint => uint) public val2key;
```

Um [mapeamento](https://www.geeksforgeeks.org/solidity/solidity-mappings/) entre os valores e suas chaves. Essas informações são necessárias para codificar valores antes de enviar a transação.

```solidity
    // O local n tem o valor para a chave n+1, porque precisamos preservar
    // zero como "não está no cache".
    uint[] public key2val;
```

Podemos usar uma matriz para o mapeamento de chaves para valores porque nós atribuímos as chaves e, por simplicidade, fazemos isso sequencialmente.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Lê um valor do cache.

```solidity
    // Escreve um valor no cache se ele já não estiver lá
    // Público apenas para permitir que o teste funcione
    function cacheWrite(uint _value) public returns (uint) {
        // Se o valor já estiver no cache, retorna a chave atual
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Não faz sentido colocar o mesmo valor no cache mais de uma vez. Se o valor já estiver lá, basta retornar a chave existente.

```solidity
        // Como 0xFE é um caso especial, a maior chave que o cache pode
        // conter é 0x0D seguido por 15 0xFF's. Se o comprimento do cache já for desse
        // tamanho, falha.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Não acho que teremos um cache tão grande (aproximadamente 1,8\*10<sup>37</sup> entradas, o que exigiria cerca de 10<sup>27</sup> TB para armazenar). No entanto, sou velho o suficiente para lembrar que ["640kB sempre seriam suficientes"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Este teste é muito barato.

```solidity
        // Escreve o valor usando a próxima chave
        val2key[_value] = key2val.length+1;
```

Adiciona a pesquisa reversa (do valor para a chave).

```solidity
        key2val.push(_value);
```

Adiciona a pesquisa direta (da chave para o valor). Como atribuímos valores sequencialmente, podemos simplesmente adicioná-lo após o último valor da matriz.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Retorna o novo comprimento de `key2val`, que é a célula onde o novo valor é armazenado.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Esta função lê um valor dos dados de chamada de comprimento arbitrário (até 32 bytes, o tamanho da palavra).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Esta função é interna, portanto, se o restante do código for escrito corretamente, esses testes não serão necessários. No entanto, eles não custam muito, então é melhor tê-los.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Este código está em [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Ele lê um valor de 32 bytes dos dados de chamada. Isso funciona mesmo se os dados de chamada pararem antes de `startByte+32` porque o espaço não inicializado na EVM é considerado zero.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Não queremos necessariamente um valor de 32 bytes. Isso se livra dos bytes em excesso.

```solidity
        return _retVal;
    } // _calldataVal


    // Lê um único parâmetro dos dados de chamada, começando em _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Lê um único parâmetro dos dados de chamada. Observe que precisamos retornar não apenas o valor que lemos, mas também a localização do próximo byte, porque os parâmetros podem variar de 1 byte a 33 bytes de comprimento.

```solidity
        // O primeiro byte nos diz como interpretar o resto
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

O Solidity tenta reduzir o número de bugs proibindo [conversões de tipo implícitas](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) potencialmente perigosas. Um downgrade, por exemplo, de 256 bits para 8 bits, precisa ser explícito.

```solidity

        // Lê o valor, mas não o escreve no cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Lê o valor e o escreve no cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Se chegamos aqui, significa que precisamos ler do cache

        // Número de bytes extras para ler
        uint8 _extraBytes = _firstByte / 16;
```

Pega o [nibble](https://en.wikipedia.org/wiki/Nibble) inferior e o combina com os outros bytes para ler o valor do cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Lê n parâmetros (as funções sabem quantos parâmetros esperam)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Poderíamos obter o número de parâmetros que temos dos próprios dados de chamada, mas as funções que nos chamam sabem quantos parâmetros esperam. É mais fácil deixá-las nos dizer.

```solidity
        // Os parâmetros que lemos
        uint[] memory params = new uint[](_paramNum);

        // Os parâmetros começam no byte 4, antes disso é a assinatura da função
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Lê os parâmetros até ter o número necessário. Se passarmos do final dos dados de chamada, `_readParams` reverterá a chamada.

```solidity

        return(params);
    }   // readParams

    // Para testar _readParams, testa a leitura de quatro parâmetros
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Uma grande vantagem do Foundry é que ele permite que os testes sejam escritos em Solidity ([veja Testando o cache abaixo](#testing-the-cache)). Isso torna os testes de unidade muito mais fáceis. Esta é uma função que lê quatro parâmetros e os retorna para que o teste possa verificar se estavam corretos.

```solidity
    // Obtém um valor, retorna os bytes que o codificarão (usando o cache, se possível)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` é uma função que o código offchain chama para ajudar a criar dados de chamada que usam o cache. Ela recebe um único valor e retorna os bytes que o codificam. Esta função é uma `view`, portanto, não exige uma transação e, quando chamada externamente, não custa nenhum gás.

```solidity
        uint _key = val2key[_val];

        // O valor ainda não está no cache, adiciona-o
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Na [EVM](/developers/docs/evm/), todo armazenamento não inicializado é assumido como zeros. Portanto, se procurarmos a chave de um valor que não está lá, obteremos um zero. Nesse caso, os bytes que o codificam são `INTO_CACHE` (para que seja armazenado em cache na próxima vez), seguidos pelo valor real.

```solidity
        // Se a chave for <0x10, retorna-a como um único byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Bytes únicos são os mais fáceis. Apenas usamos [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) para transformar um tipo `bytes<n>` em uma matriz de bytes que pode ter qualquer comprimento. Apesar do nome, funciona bem quando fornecido com apenas um argumento.

```solidity
        // Valor de dois bytes, codificado como 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Quando temos uma chave menor que 16<sup>3</sup>, podemos expressá-la em dois bytes. Primeiro convertemos `_key`, que é um valor de 256 bits, em um valor de 16 bits e usamos o 'ou' lógico para adicionar o número de bytes extras ao primeiro byte. Em seguida, nós o colocamos em um valor `bytes2`, que pode ser convertido em `bytes`.

```solidity
        // Provavelmente existe uma maneira inteligente de fazer as linhas a seguir como um loop,
        // mas é uma função view, então estou otimizando para o tempo do programador e
        // simplicidade.

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

Os outros valores (3 bytes, 4 bytes, etc.) são tratados da mesma maneira, apenas com tamanhos de campo diferentes.

```solidity
        // Se chegarmos aqui, algo está errado.
        revert("Error in encodeVal, should not happen");
```

Se chegarmos aqui, significa que obtivemos uma chave que não é menor que 16\*256<sup>15</sup>. Mas `cacheWrite` limita as chaves para que não possamos chegar a 14\*256<sup>16</sup> (que teria um primeiro byte de 0xFE, então se pareceria com `DONT_CACHE`). Mas não nos custa muito adicionar um teste caso um futuro programador introduza um bug.

```solidity
    } // encodeVal

}  // Cache
```

### Testando o cache {#testing-the-cache}

Uma das vantagens do Foundry é que [ele permite que você escreva testes em Solidity](https://getfoundry.sh/forge/tests/overview/), o que torna mais fácil escrever testes de unidade. Os testes para a classe `Cache` estão [aqui](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Como o código de teste é repetitivo, como os testes tendem a ser, este artigo explica apenas as partes interessantes.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// É necessário executar `forge test -vv` para o console.
import "forge-std/console.sol";
```

Isso é apenas um código clichê (boilerplate) necessário para usar o pacote de teste e `console.log`.

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

A função `setUp` é chamada antes de cada teste. Neste caso, apenas criamos um novo cache, para que nossos testes não afetem uns aos outros.

```solidity
    function testCaching() public {
```

Testes são funções cujos nomes começam com `test`. Esta função verifica a funcionalidade básica do cache, gravando valores e lendo-os novamente.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

É assim que você faz o teste real, usando [funções `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). Neste caso, verificamos se o valor que gravamos é o que lemos. Podemos descartar o resultado de `cache.cacheWrite` porque sabemos que as chaves de cache são atribuídas linearmente.

```solidity
        }
    }    // testCaching


    // Armazena em cache o mesmo valor várias vezes, garante que a chave permaneça
    // a mesma
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Primeiro, gravamos cada valor duas vezes no cache e nos certificamos de que as chaves sejam as mesmas (o que significa que a segunda gravação não aconteceu de fato).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Em teoria, poderia haver um bug que não afeta gravações consecutivas no cache. Então, aqui fazemos algumas gravações que não são consecutivas e vemos que os valores ainda não são reescritos.

```solidity
    // Lê um uint de um buffer de memória (para garantir que recebemos de volta os parâmetros
    // que enviamos)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Lê uma palavra de 256 bits de um buffer `bytes memory`. Esta função utilitária nos permite verificar se recebemos os resultados corretos quando executamos uma chamada de função que usa o cache.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul não suporta estruturas de dados além de `uint256`, portanto, quando você se refere a uma estrutura de dados mais sofisticada, como o buffer de memória `_bytes`, você obtém o endereço dessa estrutura. O Solidity armazena valores `bytes memory` como uma palavra de 32 bytes que contém o comprimento, seguido pelos bytes reais, portanto, para obter o número do byte `_start`, precisamos calcular `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Assinatura de função para fourParams(), cortesia de
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Apenas alguns valores constantes para ver se estamos recebendo os valores corretos de volta
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Algumas constantes que precisamos para testar.

```solidity
    function testReadParam() public {
```

Chama `fourParams()`, uma função que usa `readParams`, para testar se podemos ler os parâmetros corretamente.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Não podemos usar o mecanismo ABI normal para chamar uma função usando o cache, então precisamos usar o mecanismo de baixo nível [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Esse mecanismo recebe um `bytes memory` como entrada e o retorna (bem como um valor booleano) como saída.

```solidity
        // Primeira chamada, o cache está vazio
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

É útil que o mesmo contrato suporte funções em cache (para chamadas diretamente de transações) e funções sem cache (para chamadas de outros contratos inteligentes). Para fazer isso, precisamos continuar a confiar no mecanismo do Solidity para chamar a função correta, em vez de colocar tudo em [uma função `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Fazer isso torna a composabilidade muito mais fácil. Um único byte seria suficiente para identificar a função na maioria dos casos, então estamos desperdiçando três bytes (16\*3=48 de gás). No entanto, enquanto escrevo isso, esses 48 de gás custam 0,07 centavos, o que é um custo razoável para um código mais simples e menos propenso a bugs.

```solidity
            // Primeiro valor, adiciona-o ao cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

O primeiro valor: Um sinalizador dizendo que é um valor completo que precisa ser gravado no cache, seguido pelos 32 bytes do valor. Os outros três valores são semelhantes, exceto que `VAL_B` não é gravado no cache e `VAL_C` é tanto o terceiro parâmetro quanto o quarto.

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

Esperamos que a chamada seja bem-sucedida.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Começamos com um cache vazio e depois adicionamos `VAL_A` seguido por `VAL_C`. Esperaríamos que o primeiro tivesse a chave 1 e o segundo tivesse 2.

```
assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

A saída são os quatro parâmetros. Aqui verificamos se está correto.

```solidity
        // Segunda chamada, podemos usar o cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primeiro valor no Cache
            bytes1(0x01),
```

As chaves de cache abaixo de 16 têm apenas um byte.

```solidity
            // Segundo valor, não o adiciona ao cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Terceiro e quarto valores, mesmo valor
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Os testes após a chamada são idênticos aos após a primeira chamada.

```solidity
    function testEncodeVal() public {
```

Esta função é semelhante a `testReadParam`, exceto que, em vez de gravar os parâmetros explicitamente, usamos `encodeVal()`.

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

O único teste adicional em `testEncodeVal()` é verificar se o comprimento de `_callInput` está correto. Para a primeira chamada, é 4+33\*4. Para a segunda, onde cada valor já está no cache, é 4+1\*4.

```solidity
    // Testa encodeVal quando a chave tem mais de um único byte
    // Máximo de três bytes porque preencher o cache até quatro bytes leva
    // muito tempo.
    function testEncodeValBig() public {
        // Coloca um número de valores no cache.
        // Para manter as coisas simples, usa a chave n para o valor n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

A função `testEncodeVal` acima grava apenas quatro valores no cache, portanto, [a parte da função que lida com valores de vários bytes](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) não é verificada. Mas esse código é complicado e propenso a erros.

A primeira parte desta função é um loop que grava todos os valores de 1 a 0x1FFF no cache em ordem, para que possamos codificar esses valores e saber para onde eles estão indo.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Um byte        0x0F
            cache.encodeVal(0x0010),   // Dois bytes     0x1010
            cache.encodeVal(0x0100),   // Dois bytes     0x1100
            cache.encodeVal(0x1000)    // Três bytes 0x201000
        );
```

Testa valores de um byte, dois bytes e três bytes. Não testamos além disso porque levaria muito tempo para gravar entradas de pilha suficientes (pelo menos 0x10000000, aproximadamente um quarto de bilhão).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Testa se com um buffer excessivamente pequeno obtemos uma reversão
    function testShortCalldata() public {
```

Testa o que acontece no caso anormal em que não há parâmetros suficientes.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Como ele reverte, o resultado que devemos obter é `false`.

```
// Chama com chaves de cache que não estão lá
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primeiro valor, adicione-o ao cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Segundo valor
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Esta função obtém quatro parâmetros perfeitamente legítimos, exceto que o cache está vazio, então não há valores lá para ler.

```solidity
        .
        .
        .
    // Testa se com um buffer excessivamente longo tudo funciona bem
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Primeira chamada, o cache está vazio
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primeiro valor, adiciona-o ao cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Segundo valor, adiciona-o ao cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Terceiro valor, adiciona-o ao cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Quarto valor, adiciona-o ao cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // E outro valor para "boa sorte"
            bytes4(0x31112233)
        );
```

Esta função envia cinco valores. Sabemos que o quinto valor é ignorado porque não é uma entrada de cache válida, o que teria causado uma reversão se não tivesse sido incluído.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Um aplicativo de exemplo {#a-sample-app}

Escrever testes em Solidity é muito bom, mas no final das contas um dapp precisa ser capaz de processar solicitações de fora da cadeia para ser útil. Este artigo demonstra como usar o cache em um dapp com `WORM`, que significa "Write Once, Read Many" (Grave Uma Vez, Leia Várias). Se uma chave ainda não estiver gravada, você pode gravar um valor nela. Se a chave já estiver gravada, você obterá uma reversão.

### O contrato {#the-contract}

[Este é o contrato](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Ele repete principalmente o que já fizemos com `Cache` e `CacheTest`, então cobrimos apenas as partes que são interessantes.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

A maneira mais fácil de usar `Cache` é herdá-lo em nosso próprio contrato.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Esta função é semelhante a `fourParam` em `CacheTest` acima. Como não seguimos as especificações da ABI, é melhor não declarar nenhum parâmetro na função.

```solidity
    // Torna mais fácil nos chamar
    // Assinatura de função para writeEntryCached(), cortesia de
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

O código externo que chama `writeEntryCached` precisará construir manualmente os dados de chamada, em vez de usar `worm.writeEntryCached`, porque não seguimos as especificações da ABI. Ter esse valor constante apenas torna mais fácil escrevê-lo.

Observe que, embora definamos `WRITE_ENTRY_CACHED` como uma variável de estado, para lê-la externamente é necessário usar a função getter para ela, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

A função de leitura é uma `view`, portanto, não exige uma transação e não custa gás. Como resultado, não há benefício em usar o cache para o parâmetro. Com funções de visualização, é melhor usar o mecanismo padrão que é mais simples.

### O código de teste {#the-testing-code}

[Este é o código de teste para o contrato](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Novamente, vamos olhar apenas para o que é interessante.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[É assim (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) que especificamos em um teste do Foundry que a próxima chamada deve falhar e o motivo relatado para uma falha. Isso se aplica quando usamos a sintaxe `<contract>.<function name>()` em vez de construir os dados de chamada e chamar o contrato usando a interface de baixo nível (`<contract>.call()`, etc.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Aqui usamos o fato de que `cacheWrite` retorna a chave de cache. Isso não é algo que esperaríamos usar em produção, porque `cacheWrite` altera o estado e, portanto, só pode ser chamado durante uma transação. Transações não têm valores de retorno; se tiverem resultados, esses resultados devem ser emitidos como eventos. Portanto, o valor de retorno de `cacheWrite` só é acessível a partir do código onchain, e o código onchain não precisa de cache de parâmetros.

```solidity
        (_success,) = address(worm).call(_callInput);
```

É assim que dizemos ao Solidity que, embora `<contract address>.call()` tenha dois valores de retorno, nos importamos apenas com o primeiro.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Como usamos a função de baixo nível `<address>.call()`, não podemos usar `vm.expectRevert()` e temos que olhar para o valor booleano de sucesso que obtemos da chamada.

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

Esta é a maneira como verificamos se o código [emite um evento corretamente](https://getfoundry.sh/reference/cheatcodes/expect-emit/) no Foundry.

### O cliente {#the-client}

Uma coisa que você não obtém com os testes em Solidity é o código JavaScript que você pode recortar e colar em seu próprio aplicativo. A versão original deste tutorial implantou o WORM na Optimism Goerli, que desde então foi desativada. Para executar o cliente hoje, reimplante o WORM em uma rede OP Stack suportada, como a [OP Sepolia](https://docs.optimism.io/op-stack/introduction/op-stack), e então use o endereço do contrato resultante no cliente JavaScript.

[Você pode ver o código JavaScript para o cliente aqui](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). O repositório de exemplo foi escrito para a Optimism Goerli, portanto, antes de executá-lo, atualize o endpoint RPC e as URLs do explorador em `javascript/.env.example` e `javascript/index.js` para a sua rede de destino. Para usá-lo:

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

4. Edite o `.env` para a sua configuração:

   | Parâmetro           | Valor                                                                                                                                                               |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC            | O mnemônico para uma conta que tem ETH suficiente para pagar por uma transação. [A documentação de faucet da Optimism](https://docs.optimism.io/app-developers/tools/faucets) lista as faucets atuais da rede de teste. |
   | OPTIMISM_GOERLI_URL | URL RPC para a rede onde você reimplanta o WORM. Para a OP Sepolia, use um endpoint RPC da OP Sepolia, como `https://sepolia.optimism.io`, ou outro endpoint do seu provedor.        |

5. Execute o `index.js`.

   ```sh
   node index.js
   ```

   Este aplicativo de exemplo primeiro grava uma entrada no WORM, exibindo os dados de chamada e um link para a transação em um explorador de blocos. Em seguida, ele lê essa entrada novamente e exibe a chave que ela usa e os valores na entrada (valor, número do bloco e autor).

A maior parte do cliente é JavaScript normal de aplicativo descentralizado (dapp). Então, novamente, abordaremos apenas as partes interessantes.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Precisa de uma nova chave todas as vezes
    const key = await worm.encodeVal(Number(new Date()))
```

Um determinado slot só pode ser gravado uma vez, portanto, usamos o carimbo de data/hora para garantir que não reutilizemos os slots.

```javascript
const val = await worm.encodeVal("0x600D")

// Grava uma entrada
const calldata = func + key.slice(2) + val.slice(2)
```

O Ethers espera que os dados de chamada sejam uma string hexadecimal, `0x` seguido por um número par de dígitos hexadecimais. Como `key` e `val` começam com `0x`, precisamos remover esses cabeçalhos.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Assim como no código de teste em Solidity, não podemos chamar uma função em cache normalmente. Em vez disso, precisamos usar um mecanismo de nível mais baixo.

```javascript
    .
    .
    .
    // Lê a entrada que acabou de ser gravada
    const realKey = '0x' + key.slice(4)  // remove o sinalizador FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Para ler entradas, podemos usar o mecanismo normal. Não há necessidade de usar o cache de parâmetros com funções `view`.
## Conclusão {#conclusion}

O código neste artigo é uma prova de conceito, o objetivo é tornar a ideia fácil de entender. Para um sistema pronto para produção, você pode querer implementar algumas funcionalidades adicionais:

- Lidar com valores que não são `uint256`. Por exemplo, strings.
- Em vez de um cache global, talvez ter um mapeamento entre usuários e caches. Usuários diferentes usam valores diferentes.
- Os valores usados para endereços são distintos daqueles usados para outros fins. Pode fazer sentido ter um cache separado apenas para endereços.
- Atualmente, as chaves de cache estão em um algoritmo "primeiro a chegar, menor chave". Os primeiros dezesseis valores podem ser enviados como um único byte. Os próximos 4080 valores podem ser enviados como dois bytes. Os próximos aproximadamente um milhão de valores são três bytes, etc. Um sistema de produção deve manter contadores de uso nas entradas de cache e reorganizá-los para que os dezesseis valores _mais comuns_ sejam de um byte, os próximos 4080 valores mais comuns sejam de dois bytes, etc.

  No entanto, essa é uma operação potencialmente perigosa. Imagine a seguinte sequência de eventos:

  1. Noam Naive chama `encodeVal` para codificar o endereço para o qual ele deseja enviar tokens. Esse endereço é um dos primeiros usados no aplicativo, então o valor codificado é 0x06. Esta é uma função `view`, não uma transação, então é entre Noam e o nó que ele usa, e ninguém mais sabe sobre isso

  2. Owen Owner executa a operação de reordenação de cache. Muito poucas pessoas realmente usam esse endereço, então agora ele é codificado como 0x201122. Um valor diferente, 10<sup>18</sup>, é atribuído a 0x06.

  3. Noam Naive envia seus tokens para 0x06. Eles vão para o endereço `0x0000000000000000000000000de0b6b3a7640000` e, como ninguém sabe a chave privada para esse endereço, eles ficam presos lá. Noam _não está feliz_.

  Existem maneiras de resolver esse problema e o problema relacionado de transações que estão na mempool durante a reordenação do cache, mas você deve estar ciente disso.

Demonstrei o cache aqui com a Optimism, porque sou um funcionário da Optimism e este é o rollup que conheço melhor. Mas deve funcionar com qualquer rollup que cobre um custo mínimo para processamento interno, de modo que, em comparação, gravar os dados da transação na L1 seja a maior despesa.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
