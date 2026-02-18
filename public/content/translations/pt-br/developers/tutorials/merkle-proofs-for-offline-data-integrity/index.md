---
title: Provas de Merkle para integridade de dados offline
description: "Garantindo a integridade dos dados na cadeia para dados que são armazenados, em sua maioria, fora da cadeia"
author: Ori Pomerantz
  Ori Pomerantz
tags: [ "armazenamento" ]
skill: advanced
lang: pt-br
published: 2021-12-30
---

## Introdução {#introduction}

Idealmente, gostaríamos de guardar tudo no armazenamento do Ethereum, que é armazenado em milhares de computadores e conta com uma disponibilidade extremamente alta (os dados não podem ser censurados) e integridade (os dados não podem ser modificados de forma não autorizada), sabendo que armazenar uma palavra de 32 bytes normalmente custa 20.000 gás. No momento em que estou escrevendo isto, o custo
é equivalente a $6,60. A 21 centavos por byte, isso é bastante caro para muitas utilizações.

Para resolver esse problema, o ecossistema da Ethereum desenvolveu [muitas maneiras alternativas de armazenar dados de forma descentralizada](/developers/docs/storage/). Geralmente, elas envolvem um equilíbrio entre a disponibilidade e o preço. No entanto, a integridade é geralmente assegurada.

Neste artigo, você aprenderá **como** garantir a integridade dos dados sem armazenar os dados na blockchain, usando
[provas de Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Como isso funciona? {#how-does-it-work}

Em teoria, poderíamos apenas armazenar o hash dos dados na cadeia e enviar todos os dados em transações que o exigem. No entanto, isso ainda é demasiado caro. Um byte de dados para uma transação custa cerca de 16 gás, atualmente cerca de meio centavo ou cerca de $5 por kilobyte. A $5.000 por megabyte, isso ainda é muito caro para várias utilizações, mesmo sem o custo adicional de hashing de dados.

A solução é fazer hash repetidamente de diferentes subconjuntos dos dados. Para os dados que você não precisa enviar, você pode apenas enviar um hash. Você pode fazer isso usando uma árvore de Merkle, uma estrutura de dados de árvore em que cada nó é um hash dos nós abaixo:

![Árvore de Merkle](tree.png)

O hash raiz é a única parte que precisa ser armazenada na cadeia. Para comprovar um determinado valor, forneça todos os hashes que precisam ser combinados com ele para obter a raiz. Por exemplo, para provar `C`, você fornece `D`, `H(A-B)` e `H(E-H)`.

![Prova do valor de C](proof-c.png)

## Implementação {#implementation}

[O código de exemplo é fornecido aqui](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Código fora da cadeia {#offchain-code}

Neste artigo, usamos JavaScript para os cálculos fora da cadeia. A maioria dos aplicativos descentralizados tem seu componente fora da cadeia em JavaScript.

#### Criando a raiz de Merkle {#creating-the-merkle-root}

Primeiro, precisamos fornecer a raiz Merkle à cadeia.

```javascript
const ethers = require("ethers")
```

[Usamos a função de hash do pacote ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Os dados brutos cuja integridade temos que verificar. Os primeiros dois bytes a
// são um identificador de usuário, e os dois últimos bytes a quantidade de tokens que o
// usuário possui no momento.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Codificar cada entrada em um único inteiro de 256 bits resulta em um código menos legível que o JSON, por exemplo. No entanto, isso significa um processamento significativamente menor para recuperar os dados contidos no contrato, portanto, custos de gás muito menores. [Você pode ler JSON na cadeia](https://github.com/chrisdotn/jsmnSol), mas é uma má ideia se for evitável.

```javascript
// A matriz de valores de hash, como BigInts
const hashArray = dataArray
```

Nesse caso, para começar, nossos dados têm um valor 256 bits. Portanto, não é necessário qualquer tipo de processamento. Se usarmos uma estrutura de dados mais complicada, como cadeias de caracteres, precisamos ter certeza de que fazemos primeiro o hash dos dados para obter uma matriz de hashes. Observe que isso também é devido ao fato de não nos importarmos se usuários conhecem as informações de outros usuários. Caso contrário, teríamos tido que fazer um hash, para que o usuário 1 não saiba o valor para o usuário 0, ao usuário 2 que não saberá o valor para o usuário 3, etc.

```javascript
// Converte entre a string que a função de hash espera e o
// BigInt que usamos em todos os outros lugares.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

A função de hash ethers espera obter uma string JavaScript com um número hexadecimal, como `0x60A7`, e responde com outra string com a mesma estrutura. No entanto, para o resto do código, é mais fácil usar `BigInt`, então convertemos para uma string hexadecimal e de volta novamente.

```javascript
// Hash simétrico de um par para que não nos importemos se a ordem for invertida.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Esta função é simétrica (hash de um [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Isto significa que quando verificamos a prova de Merkle, não precisamos nos preocupar se devemos colocar o valor da prova antes ou depois do valor calculado. A verificação da prova de Merkle é feita na cadeia, portanto, quanto menos precisarmos fazer lá, melhor.

Atenção: A criptografia é mais difícil do que parece.
A versão inicial deste artigo tinha a função de hash `hash(a^b)`.
Essa foi uma **má** ideia, porque significava que se você conhecesse os valores legítimos de `a` e `b`, você poderia usar `b' = a^b^a'` para provar qualquer valor `a'` desejado.
Com esta função, você teria que calcular `b'` de tal forma que `hash(a') ^ hash(b')` seja igual a um valor conhecido (o próximo ramo a caminho da raiz), o que é muito mais difícil.

```javascript
// O valor para denotar que um determinado ramo está vazio, não
// tem um valor
const empty = 0n
```

Quando o número de valores não é uma potência inteira de dois, precisamos lidar com branches vazios. O programa faz isso colocando zero como espaço reservado.

![Árvore de Merkle com ramos ausentes](merkle-empty-hash.png)

```javascript
// Calcula um nível acima na árvore de uma matriz de hash, obtendo o hash de
// cada par em sequência
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Para evitar sobrescrever a entrada // Adicione um valor vazio se necessário (precisamos que todas as folhas sejam // pareadas)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Esta função “escala” um nível na árvore de Merkle, fazendo hash dos pares de valores na camada atual. Observe que esta não é a implementação mais eficiente, poderíamos ter evitado copiar a entrada e apenas adicionado `hashEmpty` quando apropriado no loop, mas este código é otimizado para legibilidade.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Sobe na árvore até que haja apenas um valor, que é a // raiz. // // Se uma camada tem um número ímpar de entradas, o // código em oneLevelUp adiciona um valor vazio, então se tivermos, por exemplo, // 10 folhas, teremos 5 ramos na segunda camada, 3 // ramos na terceira, 2 na quarta e a raiz é a quinta

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Para obter a raiz, suba até que haja apenas um valor restante.

#### Criando uma prova de Merkle {#creating-a-merkle-proof}

Uma prova de Merkle é o conjunto de valores a fazer hash junto com o valor que está sendo provado para recuperar a raiz de Merkle. O valor a provar está frequentemente disponível a partir de outros dados, então eu prefiro fornecê-lo separadamente do que como parte do código.

```javascript
// Uma prova de merkle consiste no valor da lista de entradas para
// fazer o hash. Como usamos uma função de hash simétrica, não
// precisamos da localização do item para verificar a prova, apenas para criá-la
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Até chegarmos ao topo
    while (currentLayer.length > 1) {
        // Nenhuma camada de comprimento ímpar
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Se currentN for ímpar, adicione o valor anterior a ele à prova
            ? currentLayer[currentN-1]
               // Se for par, adicione o valor depois dele
            : currentLayer[currentN+1])

```

Fazemos o hash de `(v[0],v[1])`, `(v[2],v[3])`, etc. Portanto, para valores pares, precisamos do próximo e, para valores ímpares, precisamos do anterior.

```javascript
        // Move para a próxima camada acima
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // enquanto currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Código na cadeia {#onchain-code}

Por fim, temos o código que verifica a prova. O código na cadeia é escrito em [Solidity](https://docs.soliditylang.org/en/v0.8.11/). A otimização é aqui muito mais importante, porque o gás é relativamente caro.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Escrevi isso usando o [ambiente de desenvolvimento Hardhat](https://hardhat.org/), que nos permite ter uma [saída de console do Solidity](https://hardhat.org/docs/cookbook/debug-logs) durante o desenvolvimento.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremamente inseguro, em código de produção, o acesso a
    // esta função DEVE SER estritamente limitado, provavelmente a um
    // proprietário
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Configure e obtenha funções para a raiz de Merkle. Permitir que todos atualizem a raiz de Merkle é uma _péssima ideia_ em um sistema de produção. Aqui, faço isso por uma questão de simplicidade no código de exemplo. **Não faça isso em um sistema onde a integridade dos dados realmente importa**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Essa função gera um par de hashes. É apenas a tradução em Solidity do código JavaScript para `hash` e `pairHash`.

**Observação:** este é outro caso de otimização para legibilidade. Com base na [definição da função](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), pode ser possível armazenar os dados como um valor [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) e evitar as conversões.

```solidity
    // Verifica uma prova de Merkle
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

Em notação matemática, a verificação da prova de Merkle se parece com isto: `H(proof_n, H(proof_n-1, H(proof_n-2, ...` `H(proof_1, H(proof_0, value))...)))`. Este código implementa-o.

## Provas de Merkle e rollups não combinam {#merkle-proofs-and-rollups}

As provas de Merkle não funcionam bem com [rollups](/developers/docs/scaling/#rollups). O motivo é que os rollups escrevem todos os dados da transação no L1, mas são processadas no L2. O custo para enviar uma prova de Merkle com uma média de transação a 638 gás por camada (atualmente, um byte nos dados de chamadas custa 16 gás se não for zero, e 4 se for zero). Se temos 1024 palavras de dados, uma prova de Merkle requer dez camadas, ou um total de 6380 gás.

Olhando, por exemplo, para o [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), escrever na L1 custa cerca de 100 gwei de gás e na L2 custa 0,001 gwei de gás (este é o preço normal, pode aumentar com o congestionamento). Portanto, pelo custo de um gás L1 podemos gastar cem mil gás no processamento L2. Supondo que não sobrescrevamos o armazenamento, isso significa que podemos escrever cerca de cinco palavras para armazenamento na L2 pelo preço de um gás L1. Para uma única prova de Merkle, podemos escrever todas as 1024 palavras no armazenamento (supondo que elas possam ser calculadas na cadeia para começar, em vez de serem fornecidas em uma transação) e ainda ter a maior parte do gás restante.

## Conclusão {#conclusion}

Na vida real, você pode nunca implementar Merkle por conta própria. Existem bibliotecas conhecidas e auditadas que você pode usar e, de um modo geral, é melhor não implementar primitivos criptográficos por conta própria. Mas espero que agora você compreenda melhor as provas de Merkle e que possa decidir quando é que vale a pena utilizar.

Observe que, embora as provas de Merkle preservem a _integridade_, elas não preservam a _disponibilidade_. Saber que mais ninguém pode tomar seus ativos é uma pequena consolação se o armazenamento de dados decidir impedir o acesso e você não pode construir uma Merkle para acessá-los também. Portanto, as árvores de Merkle são melhor usadas com algum tipo de armazenamento descentralizado, como IPFS.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
