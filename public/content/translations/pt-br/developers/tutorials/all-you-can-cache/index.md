---
title: "Tudo que você pode colocar em cache"
description: Aprenda a criar e usar um contrato de cache para transações de rollup mais baratas
author: |
  Ori Pomerantz
tags: [ "camada 2", "cache", "armazenamento" ]
skill: intermediate
published: 15/09/2022
lang: pt-br
---

Ao usar rollups, o custo de um byte na transação é muito mais caro do que o custo de um slot de armazenamento. Portanto, faz sentido armazenar em cache o máximo de informações on-chain possível.

Neste artigo, você aprenderá a criar e usar um contrato de cache de forma que qualquer valor de parâmetro que provavelmente será usado várias vezes será armazenado em cache e estará disponível para uso (após a primeira vez) com um número muito menor de bytes, e como escrever código off-chain que usa esse cache.

Se quiser pular o artigo e ver apenas o código-fonte, [ele está aqui](https://github.com/qbzzt/20220915-all-you-can-cache). A pilha de desenvolvimento é a [Foundry](https://getfoundry.sh/introduction/installation/).

## Projeto geral {#overall-design}

Para simplificar, vamos supor que todos os parâmetros da transação são `uint256`, com 32 bytes de comprimento. Ao receber uma transação, analisaremos cada parâmetro desta forma:

1. Se o primeiro byte for `0xFF`, pegue os próximos 32 bytes como um valor de parâmetro e escreva-o no cache.

2. Se o primeiro byte for `0xFE`, pegue os próximos 32 bytes como um valor de parâmetro, mas _não_ o escreva no cache.

3. Para qualquer outro valor, pegue os quatro bits superiores como o número de bytes adicionais e os quatro bits inferiores como os bits mais significativos da chave do cache. Veja aqui alguns exemplos:

   | Bytes em calldata | Chave de cache |
   | :---------------- | -------------: |
   | 0x0F              |           0x0F |
   | 0x10,0x10         |           0x10 |
   | 0x12,0xAC         |         0x02AC |
   | 0x2D,0xEA, 0xD6   |       0x0DEAD6 |

## Manipulação de cache {#cache-manipulation}

O cache é implementado em [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Vamos analisá-lo linha por linha.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Essas constantes são usadas para interpretar os casos especiais em que fornecemos todas as informações e queremos ou não que elas sejam gravadas no cache. Escrever no cache requer duas operações [`SSTORE`](https://www.evm.codes/#55) em slots de armazenamento não utilizados anteriormente, a um custo de 22.100 de gás cada, por isso tornamos isso opcional.

```solidity

    mapping(uint => uint) public val2key;
```

Um [mapeamento](https://www.geeksforgeeks.org/solidity/solidity-mappings/) entre os valores e suas chaves. Esta informação é necessária para codificar valores antes de enviar a transação.

```solidity
    // A localização n tem o valor da chave n+1, porque precisamos preservar
    // o zero como "não está no cache".
    uint[] public key2val;
```

Podemos usar um array para o mapeamento de chaves para valores, pois atribuímos as chaves e, para simplificar, fazemos isso sequencialmente.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Lê um valor do cache.

```solidity
    // Escreve um valor no cache se ele ainda não estiver lá
    // Público apenas para permitir que o teste funcione
    function cacheWrite(uint _value) public returns (uint) {
        // Se o valor já estiver no cache, retorne a chave atual
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Não faz sentido colocar o mesmo valor no cache mais de uma vez. Se o valor já estiver lá, basta retornar a chave existente.

```solidity
        // Como 0xFE é um caso especial, a maior chave que o cache pode
        // conter é 0x0D seguido por 15 0xFF's. Se o tamanho do cache já for tão
        // grande, falhe.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Acho que nunca teremos um cache tão grande (aproximadamente 1,8\*10<sup>37</sup> entradas, o que exigiria cerca de 10<sup>27</sup> TB para armazenar). No entanto, tenho idade suficiente para me lembrar de ["640kB sempre seriam suficientes"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Este teste é muito barato.

```solidity
        // Escreve o valor usando a próxima chave
        val2key[_value] = key2val.length+1;
```

Adicione a pesquisa reversa (do valor para a chave).

```solidity
        key2val.push(_value);
```

Adicione a pesquisa direta (da chave para o valor). Como atribuímos valores sequencialmente, podemos simplesmente adicioná-lo após o último valor do array.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Retorna o novo comprimento de `key2val`, que é a célula onde o novo valor está armazenado.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Esta função lê um valor do calldata de comprimento arbitrário (até 32 bytes, o tamanho da palavra).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "O limite de comprimento de _calldataVal é de 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal tentando ler além do tamanho do calldata");
```

Esta função é interna, então se o resto do código for escrito corretamente, esses testes não são necessários. No entanto, eles não custam muito, então podemos mantê-los.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Este código está em [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Ele lê um valor de 32 bytes do calldata. Isso funciona mesmo que o calldata pare antes de `startByte+32`, porque o espaço não inicializado na EVM é considerado como zero.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Não queremos necessariamente um valor de 32 bytes. Isso elimina os bytes em excesso.

```solidity
        return _retVal;
    } // _calldataVal


    // Lê um único parâmetro do calldata, começando em _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Lê um único parâmetro do calldata. Observe que precisamos retornar não apenas o valor que lemos, mas também a localização do próximo byte, porque os parâmetros podem variar de 1 a 33 bytes de comprimento.

```solidity
        // O primeiro byte nos diz como interpretar o resto
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

O Solidity tenta reduzir o número de bugs, proibindo [conversões de tipo implícitas](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) potencialmente perigosas. Um rebaixamento, por exemplo, de 256 bits para 8 bits, precisa ser explícito.

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

Pegue o [nibble](https://en.wikipedia.org/wiki/Nibble) inferior e combine-o com os outros bytes para ler o valor do cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Read n parameters (functions know how many parameters they expect)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Poderíamos obter o número de parâmetros que temos do próprio calldata, mas as funções que nos chamam sabem quantos parâmetros esperam. É mais fácil que elas nos contem.

```solidity
        // Os parâmetros que lemos
        uint[] memory params = new uint[](_paramNum);

        // Os parâmetros começam no byte 4, antes disso é a assinatura da função
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Leia os parâmetros até ter o número que você precisa. Se passarmos do final do calldata, `_readParams` reverterá a chamada.

```solidity

        return(params);
    }   // readParams

    // Para testar _readParams, teste a leitura de quatro parâmetros
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Uma grande vantagem da Foundry é que ela permite que os testes sejam escritos em Solidity ([veja Testando o cache abaixo](#testing-the-cache)). Isso torna os testes de unidade muito mais fáceis. Esta é uma função que lê quatro parâmetros e os retorna para que o teste possa verificar se eles estavam corretos.

```solidity
    // Obtém um valor, retorna os bytes que o codificarão (usando o cache, se possível)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` é uma função que o código off-chain chama para ajudar a criar calldata que usa o cache. Ela recebe um único valor e retorna os bytes que o codificam. Esta função é uma `view`, portanto não requer uma transação e, quando chamada externamente, não custa gás.

```solidity
        uint _key = val2key[_val];

        // O valor ainda não está no cache, adicione-o
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Na [EVM](/developers/docs/evm/), todo o armazenamento não inicializado é considerado como zero. Então, se procurarmos a chave de um valor que não está lá, obtemos um zero. Nesse caso, os bytes que o codificam são `INTO_CACHE` (para que seja armazenado em cache da próxima vez), seguido do valor real.

```solidity
        // Se a chave for <0x10, retorne-a como um único byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Bytes únicos são os mais fáceis. Nós apenas usamos [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) para transformar um tipo `bytes<n>` em um array de bytes que pode ter qualquer comprimento. Apesar do nome, funciona bem quando fornecido com apenas um argumento.

```solidity
        // Valor de dois bytes, codificado como 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Quando temos uma chave menor que 16<sup>3</sup>, podemos expressá-la em dois bytes. Primeiro, convertemos `_key`, que é um valor de 256 bits, para um valor de 16 bits e usamos o OU lógico para adicionar o número de bytes extras ao primeiro byte. Então, o transformamos em um valor `bytes2`, que pode ser convertido em `bytes`.

```solidity
        // Provavelmente existe uma maneira inteligente de fazer as seguintes linhas como um loop,
        // mas é uma função de visualização, então estou otimizando para o tempo do programador e
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

Os outros valores (3 bytes, 4 bytes, etc.) são tratados da mesma forma, apenas com tamanhos de campo diferentes.

```solidity
        // Se chegarmos aqui, algo está errado.
        revert("Erro em encodeVal, não deveria acontecer");
```

Se chegarmos aqui, significa que obtivemos uma chave que não é menor que 16\*256<sup>15</sup>. Mas `cacheWrite` limita as chaves para que não possamos chegar a 14\*256<sup>16</sup> (o que teria um primeiro byte de 0xFE, então se pareceria com `DONT_CACHE`). Mas não custa muito adicionar um teste caso um futuro programador introduza um bug.

```solidity
    } // encodeVal

}  // Cache
```

### Testando o cache {#testing-the-cache}

Uma das vantagens da Foundry é que [ela permite que você escreva testes em Solidity](https://getfoundry.sh/forge/tests/overview/), o que facilita a escrita de testes de unidade. Os testes para a classe `Cache` estão [aqui](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Como o código de teste é repetitivo, como os testes tendem a ser, este artigo explica apenas as partes interessantes.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// É necessário executar `forge test -vv` para o console.
import "forge-std/console.sol";
```

Isso é apenas um código padrão necessário para usar o pacote de teste e o `console.log`.

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

Testes são funções cujos nomes começam com `test`. Esta função verifica a funcionalidade básica do cache, escrevendo valores e lendo-os novamente.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

É assim que você faz o teste real, usando as [funções `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). Neste caso, verificamos que o valor que escrevemos é o que lemos. Podemos descartar o resultado de `cache.cacheWrite` porque sabemos que as chaves de cache são atribuídas linearmente.

```solidity
        }
    }    // testCaching


    // Armazena o mesmo valor em cache várias vezes, garante que a chave permaneça
    // a mesma
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Primeiro, escrevemos cada valor duas vezes no cache e garantimos que as chaves sejam as mesmas (o que significa que a segunda escrita não aconteceu de fato).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Em teoria, poderia haver um bug que não afeta as escritas consecutivas no cache. Então, aqui fazemos algumas escritas que não são consecutivas e vemos que os valores ainda não são reescritos.

```solidity
    // Lê um uint de um buffer de memória (para garantir que recebamos de volta os parâmetros
    // que enviamos)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Lê uma palavra de 256 bits de um buffer `bytes memory`. Esta função utilitária nos permite verificar se recebemos os resultados corretos quando executamos uma chamada de função que usa o cache.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_fora_dos_limites");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

O Yul não suporta estruturas de dados além de `uint256`, então, quando você se refere a uma estrutura de dados mais sofisticada, como o buffer de memória `_bytes`, você obtém o endereço dessa estrutura. O Solidity armazena valores `bytes memory` como uma palavra de 32 bytes que contém o comprimento, seguida pelos bytes reais, então para obter o byte de número `_start` precisamos calcular `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Assinatura da função para fourParams(), cortesia de
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

Chame `fourParams()`, uma função que usa `readParams`, para testar se conseguimos ler os parâmetros corretamente.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Não podemos usar o mecanismo ABI normal para chamar uma função usando o cache, então precisamos usar o mecanismo de baixo nível [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Esse mecanismo usa um `bytes memory` como entrada e o retorna (assim como um valor booleano) como saída.

```solidity
        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

É útil que o mesmo contrato suporte tanto funções em cache (para chamadas diretamente de transações) quanto funções não armazenadas em cache (para chamadas de outros contratos inteligentes). Para fazer isso, precisamos continuar a confiar no mecanismo do Solidity para chamar a função correta, em vez de colocar tudo em uma [função `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Fazer isso torna a componentização muito mais fácil. Um único byte seria suficiente para identificar a função na maioria dos casos, então estamos desperdiçando três bytes (16\*3=48 de gás). No entanto, no momento em que escrevo, esses 48 de gás custam 0,07 centavos de dólar, o que é um custo razoável para um código mais simples e menos propenso a bugs.

```solidity
            // Primeiro valor, adicione-o ao cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

O primeiro valor: um sinalizador dizendo que é um valor completo que precisa ser escrito no cache, seguido pelos 32 bytes do valor. Os outros três valores são semelhantes, exceto que `VAL_B` não é escrito no cache e `VAL_C` é tanto o terceiro quanto o quarto parâmetro.

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

Começamos com um cache vazio e depois adicionamos `VAL_A` seguido de `VAL_C`. Esperaríamos que o primeiro tivesse a chave 1 e o segundo a chave 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

A saída são os quatro parâmetros. Aqui verificamos que está correto.

```solidity
        // Segunda chamada, podemos usar o cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primeiro valor no Cache
            bytes1(0x01),
```

Chaves de cache abaixo de 16 têm apenas um byte.

```solidity
            // Segundo valor, não o adicione ao cache
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

Os testes após a chamada são idênticos aos da primeira chamada.

```solidity
    function testEncodeVal() public {
```

Esta função é semelhante a `testReadParam`, exceto que, em vez de escrever os parâmetros explicitamente, usamos `encodeVal()`.

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
    // Testa encodeVal quando a chave tem mais de um byte
    // Máximo de três bytes porque preencher o cache até quatro bytes leva
    // muito tempo.
    function testEncodeValBig() public {
        // Coloca uma série de valores no cache.
        // Para simplificar, use a chave n para o valor n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

A função `testEncodeVal` acima apenas escreve quatro valores no cache, então [a parte da função que lida com valores de vários bytes](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) não é verificada. Mas esse código é complicado e propenso a erros.

A primeira parte desta função é um loop que escreve todos os valores de 1 a 0x1FFF no cache em ordem, para que possamos codificar esses valores e saber para onde eles estão indo.

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

Testa valores de um, dois e três bytes. Não testamos além disso porque levaria muito tempo para escrever entradas de pilha suficientes (pelo menos 0x10000000, aproximadamente um quarto de bilhão).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Testa o que acontece com um buffer excessivamente pequeno para obter uma reversão
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
    // Chama com chaves de cache que não existem
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

Esta função obtém quatro parâmetros perfeitamente legítimos, exceto que o cache está vazio, então não há valores para ler.

```solidity
        .
        .
        .
    // Testa o que acontece com um buffer excessivamente longo para ver se tudo funciona bem
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Primeira chamada, o cache está vazio
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Primeiro valor, adicione-o ao cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Segundo valor, adicione-o ao cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Terceiro valor, adicione-o ao cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Quarto valor, adicione-o ao cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // E outro valor para "dar sorte"
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

Escrever testes em Solidity é muito bom, mas no final das contas um dapp precisa ser capaz de processar solicitações de fora da cadeia para ser útil. Este artigo demonstra como usar o cache em um dapp com `WORM`, que significa "Write Once, Read Many" (Escreva uma vez, leia muitas). Se uma chave ainda não foi escrita, você pode escrever um valor para ela. Se a chave já estiver escrita, você recebe uma reversão.

### O contrato {#the-contract}

[Este é o contrato](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Ele repete principalmente o que já fizemos com `Cache` e `CacheTest`, então abordaremos apenas as partes interessantes.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

A maneira mais fácil de usar o `Cache` é herdá-lo em nosso próprio contrato.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Esta função é semelhante a `fourParam` em `CacheTest` acima. Como não seguimos as especificações da ABI, é melhor não declarar nenhum parâmetro na função.

```solidity
    // Facilita a chamada
    // Assinatura da função para writeEntryCached(), cortesia de
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

O código externo que chama `writeEntryCached` precisará construir manualmente o calldata, em vez de usar `worm.writeEntryCached`, porque não seguimos as especificações da ABI. Ter esse valor constante apenas facilita a escrita.

Observe que, embora definamos `WRITE_ENTRY_CACHED` como uma variável de estado, para lê-la externamente é necessário usar sua função getter, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

A função de leitura é uma `view`, portanto não requer uma transação e não custa gás. Como resultado, não há benefício em usar o cache para o parâmetro. Com funções de visualização, é melhor usar o mecanismo padrão que é mais simples.

### O código de teste {#the-testing-code}

[Este é o código de teste para o contrato](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Novamente, vamos olhar apenas para o que é interessante.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entrada já escrita"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Isso (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) é como especificamos em um teste da Foundry que a próxima chamada deve falhar e o motivo relatado para a falha. Isso se aplica quando usamos a sintaxe `<contract>.<function name>`() em vez de construir o calldata e chamar o contrato usando a interface de baixo nível (`<contract>.call()`, etc.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Aqui usamos o fato de que `cacheWrite` retorna a chave do cache. Isso não é algo que esperaríamos usar em produção, porque `cacheWrite` altera o estado e, portanto, só pode ser chamado durante uma transação. As transações não têm valores de retorno; se tiverem resultados, esses resultados devem ser emitidos como eventos. Portanto, o valor de retorno `cacheWrite` só é acessível a partir do código na cadeia (on-chain), e o código na cadeia não precisa de cache de parâmetros.

```solidity
        (_success,) = address(worm).call(_callInput);
```

É assim que dizemos ao Solidity que, embora `<contract address>.call()` tenha dois valores de retorno, só nos importamos com o primeiro.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Como usamos a função de baixo nível `<address>.call()`, não podemos usar `vm.expectRevert()` e temos que observar o valor de sucesso booleano que obtemos da chamada.

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

É assim que verificamos se o código [emite um evento corretamente](https://getfoundry.sh/reference/cheatcodes/expect-emit/) na Foundry.

### O cliente {#the-client}

Uma coisa que você não obtém com os testes do Solidity é o código JavaScript que você pode cortar e colar em seu próprio aplicativo. Para escrever esse código, implantei o WORM na [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), a nova [rede de teste](https://www.optimism.io/) da [Optimism](https://www.optimism.io/). Ele está no endereço [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Você pode ver o código JavaScript do cliente aqui](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Para usá-lo:

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

4. Edite o `.env` para sua configuração:

   | Parâmetro                                                     | Valor                                                                                                                                                                                                     |
   | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMÔNICO                                                     | O mnemônico de uma conta que tem ETH suficiente para pagar por uma transação. [Você pode obter ETH grátis para a rede Optimism Goerli aqui](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL para a Optimism Goerli. O endpoint público, `https://goerli.optimism.io`, tem taxa limitada, mas é suficiente para o que precisamos aqui                                              |

5. Execute o `index.js`.

   ```sh
   node index.js
   ```

   Este aplicativo de exemplo primeiro escreve uma entrada no WORM, exibindo o calldata e um link para a transação no Etherscan. Em seguida, ele lê essa entrada e exibe a chave que usa e os valores na entrada (valor, número do bloco e autor).

A maior parte do cliente é JavaScript de Dapp normal. Então, novamente, vamos abordar apenas as partes interessantes.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Precisa de uma nova chave a cada vez
    const key = await worm.encodeVal(Number(new Date()))
```

Um determinado slot só pode ser escrito uma vez, então usamos o carimbo de data/hora para garantir que não reutilizamos slots.

```javascript
const val = await worm.encodeVal("0x600D")

// Escreve uma entrada
const calldata = func + key.slice(2) + val.slice(2)
```

O Ethers espera que os dados da chamada sejam uma string hexadecimal, `0x` seguido por um número par de dígitos hexadecimais. Como tanto `key` quanto `val` começam com `0x`, precisamos remover esses cabeçalhos.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Assim como no código de teste do Solidity, não podemos chamar uma função em cache normalmente. Em vez disso, precisamos usar um mecanismo de nível inferior.

```javascript
    .
    .
    .
    // Lê a entrada que acabou de ser escrita
    const realKey = '0x' + key.slice(4)  // remove o sinalizador FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Para ler as entradas, podemos usar o mecanismo normal. Não há necessidade de usar cache de parâmetros com funções `view`.

## Conclusão {#conclusion}

O código neste artigo é uma prova de conceito, o objetivo é tornar a ideia fácil de entender. Para um sistema pronto para produção, você pode querer implementar algumas funcionalidades adicionais:

- Lidar com valores que não são `uint256`. Por exemplo, strings.
- Em vez de um cache global, talvez tenha um mapeamento entre usuários e caches. Diferentes usuários usam valores diferentes.
- Os valores usados para endereços são distintos daqueles usados para outros fins. Pode fazer sentido ter um cache separado apenas para endereços.
- Atualmente, as chaves do cache estão em um algoritmo "primeiro a chegar, chave menor". Os primeiros dezesseis valores podem ser enviados como um único byte. Os próximos 4080 valores podem ser enviados como dois bytes. Os próximos aproximadamente um milhão de valores são três bytes, etc. Um sistema de produção deve manter contadores de uso nas entradas de cache e reorganizá-los para que os dezesseis valores _mais comuns_ sejam de um byte, os próximos 4080 valores mais comuns de dois bytes, etc.

  No entanto, essa é uma operação potencialmente perigosa. Imagine a seguinte sequência de eventos:

  1. Noam Naive chama `encodeVal` para codificar o endereço para o qual ele quer enviar tokens. Esse endereço é um dos primeiros usados no aplicativo, então o valor codificado é 0x06. Esta é uma função `view`, não uma transação, então é entre Noam e o nó que ele usa, e mais ninguém sabe sobre isso

  2. Owen Owner executa a operação de reordenação do cache. Pouquíssimas pessoas realmente usam esse endereço, então ele agora é codificado como 0x201122. Um valor diferente, 10<sup>18</sup>, é atribuído a 0x06.

  3. Noam Naive envia seus tokens para 0x06. Eles vão para o endereço `0x0000000000000000000000000de0b6b3a7640000`, e como ninguém conhece a chave privada para esse endereço, eles ficam presos lá. Noam _não está feliz_.

  Existem maneiras de resolver esse problema e o problema relacionado às transações que estão na mempool durante a reordenação do cache, mas você deve estar ciente disso.

Demonstrei o cache aqui com a Optimism, porque sou um funcionário da Optimism e este é o rollup que conheço melhor. Mas deve funcionar com qualquer rollup que cobre um custo mínimo para processamento interno, de modo que, em comparação, escrever os dados da transação na L1 seja a maior despesa.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).

