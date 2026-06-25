---
title: Simple serialize
description: "Explicação do formato SSZ do Ethereum."
lang: pt-br
sidebarDepth: 2
---

**Simple serialize (SSZ)** é o método de serialização usado na Beacon Chain. Ele substitui a serialização RLP usada na camada de execução em toda a camada de consenso, exceto no protocolo de descoberta de pares. Para saber mais sobre a serialização RLP, consulte [Prefixo de comprimento recursivo (RLP)](/developers/docs/data-structures-and-encoding/rlp/). O SSZ foi projetado para ser determinístico e também para ser transformado em árvore de Merkle (merkleizar) de forma eficiente. O SSZ pode ser considerado como tendo dois componentes: um esquema de serialização e um esquema de merkleização que é projetado para funcionar de forma eficiente com a estrutura de dados serializada.

## Como o SSZ funciona? {#how-does-ssz-work}

### Serialização {#serialization}

O SSZ é um esquema de serialização que não é autodescritivo - em vez disso, ele depende de um esquema (schema) que deve ser conhecido com antecedência. O objetivo da serialização SSZ é representar objetos de complexidade arbitrária como cadeias de bytes. Este é um processo muito simples para "tipos básicos". O elemento é simplesmente convertido em bytes hexadecimais. Os tipos básicos incluem:

- inteiros sem sinal (unsigned integers)
- booleanos

Para tipos "compostos" complexos, a serialização é mais complicada porque o tipo composto contém vários elementos que podem ter tipos diferentes ou tamanhos diferentes, ou ambos. Quando todos esses objetos têm comprimentos fixos (ou seja, o tamanho dos elementos sempre será constante, independentemente de seus valores reais), a serialização é simplesmente uma conversão de cada elemento no tipo composto ordenado em cadeias de bytes little-endian. Essas cadeias de bytes são unidas. O objeto serializado tem a representação em lista de bytes dos elementos de comprimento fixo na mesma ordem em que aparecem no objeto desserializado.

Para tipos com comprimentos variáveis, os dados reais são substituídos por um valor de "deslocamento" (offset) na posição desse elemento no objeto serializado. Os dados reais são adicionados a um heap (monte) no final do objeto serializado. O valor de deslocamento é o índice para o início dos dados reais no heap, agindo como um ponteiro para os bytes relevantes.

O exemplo abaixo ilustra como o deslocamento funciona para um contêiner com elementos de comprimento fixo e variável:

```Rust

    struct Dummy {

        number1: u64,
        number2: u64,
        vector: Vec<u8>,
        number3: u64
    }

    dummy = Dummy{

        number1: 37,
        number2: 55,
        vector: vec![1,2,3,4],
        number3: 22,
    }

    serialized = ssz.serialize(dummy)

```

`serialized` teria a seguinte estrutura (preenchido apenas com 4 bits aqui, preenchido com 32 bits na realidade, e mantendo a representação `int` para maior clareza):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2  deslocamento    number 3   valor para
                          para o vetor                 o vetor
```

dividido em linhas para maior clareza:

```
[
  37, 0, 0, 0,  # codificação little-endian de `number1`.
  55, 0, 0, 0,  # codificação little-endian de `number2`.
  16, 0, 0, 0,  # O "deslocamento" que indica onde o valor de `vector` começa (little-endian 16).
  22, 0, 0, 0,  # codificação little-endian de `number3`.
  1, 2, 3, 4,   # Os valores reais em `vector`.
]
```

Isso ainda é uma simplificação - os inteiros e zeros nos esquemas acima seriam, na verdade, listas de bytes armazenadas, assim:

```
[
  10100101000000000000000000000000  # codificação little-endian de `number1`
  10110111000000000000000000000000  # codificação little-endian de `number2`.
  10010000000000000000000000000000  # O "deslocamento" que indica onde o valor de `vector` começa (little-endian 16).
  10010110000000000000000000000000  # codificação little-endian de `number3`.
  10000001100000101000001110000100   # O valor real do campo `bytes`.
]
```

Portanto, os valores reais para tipos de comprimento variável são armazenados em um heap no final do objeto serializado, com seus deslocamentos armazenados em suas posições corretas na lista ordenada de campos.

Existem também alguns casos especiais que exigem tratamento específico, como o tipo `BitList`, que exige que um limite de comprimento seja adicionado durante a serialização e removido durante a desserialização. Todos os detalhes estão disponíveis na [especificação do SSZ](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

### Desserialização {#deserialization}

Para desserializar esse objeto, é necessário o <b>esquema</b> (schema). O esquema define o layout preciso dos dados serializados para que cada elemento específico possa ser desserializado de um blob de bytes em algum objeto significativo, com os elementos tendo o tipo, valor, tamanho e posição corretos. É o esquema que informa ao desserializador quais valores são valores reais e quais são deslocamentos. Todos os nomes de campos desaparecem quando um objeto é serializado, mas são reinstanciados na desserialização de acordo com o esquema.

Consulte [ssz.dev](https://www.ssz.dev/overview) para obter uma explicação interativa sobre isso.

## Merkleização {#merkleization}

Esse objeto serializado em SSZ pode então ser merkleizado - ou seja, transformado em uma representação de árvore de Merkle dos mesmos dados. Primeiro, o número de pedaços (chunks) de 32 bytes no objeto serializado é determinado. Essas são as "folhas" da árvore. O número total de folhas deve ser uma potência de 2 para que a geração de hash das folhas em conjunto produza, por fim, uma única raiz de árvore de hash (hash-tree-root). Se esse não for naturalmente o caso, folhas adicionais contendo 32 bytes de zeros são adicionadas. Em forma de diagrama:

```
raiz da árvore de hash
            /     \
           /       \
          /         \
         /           \
hash das folhas  hash das folhas
     1 e 2            3 e 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 folha1   folha2  folha3   folha4
```

Também há casos em que as folhas da árvore não se distribuem naturalmente de maneira uniforme como no exemplo acima. Por exemplo, a folha 4 poderia ser um contêiner com vários elementos que exigem que uma "profundidade" adicional seja adicionada à árvore de Merkle, criando uma árvore irregular.

Em vez de nos referirmos a esses elementos da árvore como folha X, nó X, etc., podemos dar a eles índices generalizados, começando com a raiz = 1 e contando da esquerda para a direita ao longo de cada nível. Esse é o índice generalizado explicado acima. Cada elemento na lista serializada tem um índice generalizado igual a `2**depth + idx`, onde idx é sua posição indexada em zero no objeto serializado e a profundidade é o número de níveis na árvore de Merkle, que pode ser determinado como o logaritmo de base dois do número de elementos (folhas).

## Índices generalizados {#generalized-indices}

Um índice generalizado é um número inteiro que representa um nó em uma árvore de Merkle binária, onde cada nó tem um índice generalizado `2 ** depth + index in row`.

```
1           --profundidade = 0  2**0 + 0 = 1
    2       3       --profundidade = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --profundidade = 2  2**2 + 0 = 4, 2**2 + 1 = 5...
```

Essa representação produz um índice de nó para cada pedaço de dados na árvore de Merkle.

## Multiprovas {#multiproofs}

Fornecer a lista de índices generalizados que representam um elemento específico nos permite verificá-lo em relação à raiz da árvore de hash (hash-tree-root). Essa raiz é a nossa versão aceita da realidade. Quaisquer dados que nos sejam fornecidos podem ser verificados em relação a essa realidade, inserindo-os no lugar certo na árvore de Merkle (determinado por seu índice generalizado) e observando que a raiz permanece constante. Existem funções na especificação [aqui](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) que mostram como calcular o conjunto mínimo de nós exigido para verificar o conteúdo de um conjunto específico de índices generalizados.

Por exemplo, para verificar os dados no índice 9 na árvore abaixo, precisamos do hash dos dados nos índices 8, 9, 5, 3, 1.
O hash de (8,9) deve ser igual ao hash (4), que faz hash com 5 para produzir 2, que faz hash com 3 para produzir a raiz da árvore 1. Se dados incorretos fossem fornecidos para 9, a raiz mudaria - detectaríamos isso e falharíamos em verificar o ramo.

```
* = dados necessários para gerar a prova

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15
```

## Leitura adicional {#further-reading}

- [Atualizando o Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Atualizando o Ethereum: Merkleização](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementações do SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Calculadora SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)