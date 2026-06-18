---
title: Provas de Merkle para integridade de dados offline
description: "Garantindo a integridade de dados onchain para dados que são armazenados, em sua maioria, offchain"
author: Ori Pomerantz
tags: ["armazenamento"]
skill: advanced
breadcrumb: Provas de Merkle
lang: pt-br
published: 2021-12-30
---

## Introdução {#introduction}

Idealmente, gostaríamos de armazenar tudo no armazenamento do Ethereum, que é distribuído por milhares de computadores e tem uma disponibilidade extremamente alta (os dados não podem ser censurados) e integridade (os dados não podem ser modificados de maneira não autorizada), mas armazenar uma palavra de 32 bytes normalmente custa 20.000 de gás. Enquanto escrevo isso, esse custo é equivalente a US$ 6,60. A 21 centavos por byte, isso é muito caro para muitos usos.

Para resolver esse problema, o ecossistema Ethereum desenvolveu [muitas maneiras alternativas de armazenar dados de forma descentralizada](/developers/docs/storage/). Geralmente, elas envolvem um compromisso entre disponibilidade e preço. No entanto, a integridade é normalmente garantida.

Neste artigo, você aprenderá **como** garantir a integridade dos dados sem armazená-los na blockchain, usando [provas de Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Como funciona? {#how-does-it-work}

Na teoria, poderíamos apenas armazenar o hash dos dados onchain e enviar todos os dados em transações que os exigem. No entanto, isso ainda é muito caro. Um byte de dados para uma transação custa cerca de 16 de gás, atualmente cerca de meio centavo, ou cerca de US$ 5 por kilobyte. A US$ 5.000 por megabyte, isso ainda é muito caro para muitos usos, mesmo sem o custo adicional da geração de hash dos dados.

A solução é gerar hash repetidamente de diferentes subconjuntos dos dados, de modo que, para os dados que você não precisa enviar, você pode apenas enviar um hash. Você faz isso usando uma árvore de Merkle, uma estrutura de dados em árvore onde cada nó é um hash dos nós abaixo dele:

![Merkle Tree](tree.png)

O hash da raiz é a única parte que precisa ser armazenada onchain. Para provar um determinado valor, você fornece todos os hashes que precisam ser combinados com ele para obter a raiz. Por exemplo, para provar `C`, você fornece `D`, `H(A-B)` e `H(E-H)`.

![Proof of the value of C](proof-c.png)

## Implementação {#implementation}

[O código de exemplo é fornecido aqui](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Código offchain {#offchain-code}

Neste artigo, usamos JavaScript para os cálculos offchain. A maioria das aplicações descentralizadas (dapps) tem seu componente offchain em JavaScript.

#### Criando a raiz de Merkle {#creating-the-merkle-root}

Primeiro, precisamos fornecer a raiz de Merkle para a cadeia.

```javascript
const ethers = require("ethers")
```

[Usamos a função de hash do pacote ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Os dados brutos cuja integridade temos que verificar. Os primeiros dois bytes s
// ão um identificador de usuário, e os últimos dois bytes a quantidade de tokens que o
// usuário possui atualmente.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Codificar cada entrada em um único número inteiro de 256 bits resulta em um código menos legível do que usar JSON, por exemplo. No entanto, isso significa significativamente menos processamento para recuperar os dados no contrato, logo, custos de gás muito menores. [Você pode ler JSON onchain](https://github.com/chrisdotn/jsmnSol), é apenas uma má ideia se puder ser evitado.

```javascript
// O array de valores de hash, como BigInts
const hashArray = dataArray
```

Neste caso, nossos dados já são valores de 256 bits para começar, então nenhum processamento é necessário. Se usarmos uma estrutura de dados mais complicada, como strings, precisamos ter certeza de gerar o hash dos dados primeiro para obter uma matriz de hashes. Note que isso também ocorre porque não nos importamos se os usuários souberem as informações de outros usuários. Caso contrário, teríamos que gerar o hash para que o usuário 1 não soubesse o valor do usuário 0, o usuário 2 não soubesse o valor do usuário 3, etc.

```javascript
// Converter entre a string que a função de hash espera e o
// BigInt que usamos em todos os outros lugares.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

A função de hash do ethers espera receber uma string JavaScript com um número hexadecimal, como `0x60A7`, e responde com outra string com a mesma estrutura. No entanto, para o resto do código é mais fácil usar `BigInt`, então nós convertemos para uma string hexadecimal e vice-versa.

```javascript
// Hash simétrico de um par para que não nos importemos se a ordem for invertida.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Esta função é simétrica (hash de a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Isso significa que, quando verificamos a prova de Merkle, não precisamos nos preocupar se devemos colocar o valor da prova antes ou depois do valor calculado. A verificação da prova de Merkle é feita onchain, então quanto menos precisarmos fazer lá, melhor.

Aviso:
A criptografia é mais difícil do que parece.
A versão inicial deste artigo tinha a função de hash `hash(a^b)`.
Essa foi uma **péssima** ideia porque significava que, se você soubesse os valores legítimos de `a` e `b`, você poderia usar `b' = a^b^a'` para provar qualquer valor `a'` desejado.
Com esta função, você teria que calcular `b'` de tal forma que `hash(a') ^ hash(b')` fosse igual a um valor conhecido (o próximo ramo no caminho para a raiz), o que é muito mais difícil.

```javascript
// O valor para denotar que um determinado ramo está vazio, não
// tem um valor
const empty = 0n
```

Quando o número de valores não é uma potência inteira de dois, precisamos lidar com ramos vazios. A maneira como este programa faz isso é colocar zero como um espaço reservado.

![Merkle tree with branches missing](merkle-empty-hash.png)

```javascript
// Calcular um nível acima na árvore de um array de hash obtendo o hash de
// cada par em sequência
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Para evitar sobrescrever a entrada // Adicionar um valor vazio se necessário (precisamos que todas as folhas sejam // pareadas)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Esta função "sobe" um nível na árvore de Merkle gerando o hash dos pares de valores na camada atual. Note que esta não é a implementação mais eficiente, poderíamos ter evitado copiar a entrada e apenas adicionado `hashEmpty` quando apropriado no loop, mas este código é otimizado para legibilidade.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Subir na árvore até que haja apenas um valor, que é a // raiz. // // Se uma camada tiver um número ímpar de entradas, o // código em oneLevelUp adiciona um valor vazio, então se tivermos, por exemplo, // 10 folhas, teremos 5 ramos na segunda camada, 3 // ramos na terceira, 2 na quarta e a raiz é a quinta

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Para obter a raiz, suba até que reste apenas um valor.

#### Criando uma prova de Merkle {#creating-a-merkle-proof}

Uma prova de Merkle consiste nos valores para gerar o hash junto com o valor sendo provado para obter de volta a raiz de Merkle. O valor a provar geralmente está disponível a partir de outros dados, então prefiro fornecê-lo separadamente em vez de como parte do código.

```javascript
// Uma prova de Merkle consiste no valor da lista de entradas para
// gerar o hash com. Como usamos uma função de hash simétrica, não
// precisamos da localização do item para verificar a prova, apenas para criá-la
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Até chegarmos ao topo
    while (currentLayer.length > 1) {
        // Sem camadas de comprimento ímpar
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Se currentN for ímpar, adicionar com o valor anterior a ele à prova
            ? currentLayer[currentN-1]
               // Se for par, adicionar o valor depois dele
            : currentLayer[currentN+1])

```

Nós geramos o hash de `(v[0],v[1])`, `(v[2],v[3])`, etc. Portanto, para valores pares, precisamos do próximo; para valores ímpares, do anterior.

```javascript
        // Mover para a próxima camada acima
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Código onchain {#onchain-code}

Finalmente, temos o código que verifica a prova. O código onchain é escrito em [Solidity](https://docs.soliditylang.org/en/v0.8.11/). A otimização é muito mais importante aqui porque o gás é relativamente caro.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Eu escrevi isso usando o [ambiente de desenvolvimento Hardhat](https://hardhat.org/), que nos permite ter [saída de console do Solidity](https://hardhat.org/docs/cookbook/debug-logs) durante o desenvolvimento.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremamente inseguro, em código de produção o acesso a
    // esta função DEVE SER estritamente limitado, provavelmente a um
    // proprietário
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Funções set e get para a raiz de Merkle. Deixar que todos atualizem a raiz de Merkle é uma _péssima ideia_ em um sistema de produção. Eu faço isso aqui por uma questão de simplicidade para o código de exemplo. **Não faça isso em um sistema onde a integridade dos dados realmente importa**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Esta função gera um hash de par. É apenas a tradução em Solidity do código JavaScript para `hash` e `pairHash`.

**Nota:** Este é outro caso de otimização para legibilidade. Com base na [definição da função](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), pode ser possível armazenar os dados como um valor [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) e evitar as conversões.

```solidity
    // Verificar uma prova de Merkle
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

Na notação matemática, a verificação da prova de Merkle se parece com isto: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Este código a implementa.

## Provas de Merkle e rollups não se misturam {#merkle-proofs-and-rollups}

As provas de Merkle não funcionam bem com [rollups](/developers/docs/scaling/#rollups). O motivo é que os rollups gravam todos os dados da transação na camada 1 (l1), mas processam na camada 2 (l2). O custo para enviar uma prova de Merkle com uma transação é em média de 638 de gás por camada (atualmente, um byte em dados de chamada custa 16 de gás se não for zero, e 4 se for zero). Se tivermos 1024 palavras de dados, uma prova de Merkle requer dez camadas, ou um total de 6380 de gás.

Olhando, por exemplo, para a [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), gravar gás na l1 custa cerca de 100 gwei e o gás na l2 custa 0,001 gwei (esse é o preço normal, pode subir com o congestionamento). Portanto, pelo custo de um gás na l1, podemos gastar cem mil de gás no processamento da l2. Supondo que não sobrescrevamos o armazenamento, isso significa que podemos gravar cerca de cinco palavras no armazenamento na l2 pelo preço de um gás na l1. Para uma única prova de Merkle, podemos gravar todas as 1024 palavras no armazenamento (supondo que elas possam ser calculadas onchain para começar, em vez de fornecidas em uma transação) e ainda sobrar a maior parte do gás.

## Conclusão {#conclusion}

Na vida real, você pode nunca implementar árvores de Merkle por conta própria. Existem bibliotecas bem conhecidas e auditadas que você pode usar e, de modo geral, é melhor não implementar primitivas criptográficas por conta própria. Mas espero que agora você entenda melhor as provas de Merkle e possa decidir quando vale a pena usá-las.

Note que, embora as provas de Merkle preservem a _integridade_, elas não preservam a _disponibilidade_. Saber que ninguém mais pode pegar seus ativos é um pequeno consolo se o armazenamento de dados decidir proibir o acesso e você também não puder construir uma árvore de Merkle para acessá-los. Portanto, as árvores de Merkle são melhor utilizadas com algum tipo de armazenamento descentralizado, como o IPFS.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).