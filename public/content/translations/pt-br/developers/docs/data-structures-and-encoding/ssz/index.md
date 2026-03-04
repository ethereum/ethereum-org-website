---
title: "Serialização simples"
description: "Explicação do formato SSZ do Ethereum"
lang: pt-br
sidebarDepth: 2
---

**A serialização simples (SSZ)** é o método de serialização usado na Beacon Chain. Ela substitui a serialização RLP usada na camada de execução em toda a camada de consenso, exceto no protocolo de descoberta de pares. Para saber mais sobre a serialização RLP, consulte [Prefixo de comprimento recursivo (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ foi projetado para ser determinístico e também para Merkleize (transformações em árvores de Merkle) de forma eficiente. SSZ pode ser pensado como tendo dois componentes: um esquema de serialização e um esquema de Merkleization que é projetado para trabalhar eficientemente com a estrutura de dados serializada.

## Como funciona o SSZ? {#how-does-ssz-work}

### Serialização {#serialization}

SSZ é um esquema de serialização que não é autodescritivo. Em vez disso, ele se baseia em um esquema que deve ser conhecido antecipadamente. O objetivo da serialização SSZ é representar objetos de complexidade arbitrária como strings de bytes. Este é um processo muito simples para "tipos básicos". O elemento é simplesmente convertido em bytes hexadecimais. Os tipos básicos incluem:

- inteiros sem sinal
- booleanos

Para tipos complexos de "composição", a serialização é mais complicada porque o tipo composto contém múltiplos elementos que podem ter diferentes tipos ou tamanhos diferentes, ou ambos. Quando estes objetos têm todos comprimentos fixos (isto é, o tamanho dos elementos é sempre constante, independentemente dos seus valores reais), a serialização é simplesmente a conversão de cada elemento no tipo composto, ordenado em strings de bytes little-endian. Estas strings de bytes estão unidas. O objeto serializado tem a representação de bytelist (array de bytes) dos elementos de comprimento fixo na mesma ordem em que aparecem no objeto desserializado.

Para tipos com comprimentos variáveis, os dados reais são substituídos por um valor de "deslocamento" na posição desse elemento no objeto serializado. Os dados reais são adicionados a uma pilha (área de memória dinâmica) no final do objeto serializado. O valor de deslocamento é o índice para o início dos dados reais na pilha, atuando como um ponteiro para os bytes relevantes.

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

`serialized` teria a seguinte estrutura (apenas preenchido para 4 bits aqui, preenchido para 32 bits na realidade e mantendo a representação `int` para maior clareza):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    deslocamento    number3        valor
                              do vector                    do vector

```

dividido em linhas para clareza:

```
[
  37, 0, 0, 0,  # codificação little-endian de `number1`.
  55, 0, 0, 0,  # codificação little-endian de `number2`.
  16, 0, 0, 0,  # O "deslocamento" que indica onde o valor de `vector` começa (little-endian 16).
  22, 0, 0, 0,  # codificação little-endian de `number3`.
  1, 2, 3, 4,   # Os valores reais em `vector`.
]
```

Isso ainda é uma simplificação. Os inteiros e zeros nos esquemas acima, na verdade, seriam armazenados em bytelists, assim:

```
[
  10100101000000000000000000000000  # codificação little-endian de `number1`
  10110111000000000000000000000000  # codificação little-endian de `number2`.
  10010000000000000000000000000000  # O "deslocamento" que indica onde o valor de `vector` começa (little-endian 16).
  10010110000000000000000000000000  # codificação little-endian de `number3`.
  10000001100000101000001110000100   # O valor real do campo `bytes`.
]
```

Assim, os valores reais para tipos de comprimento variável são armazenados em uma pilha no final do objeto serializado com seus deslocamentos armazenados em suas posições corretas na lista ordenada de campos.

Há também alguns casos especiais que exigem tratamento específico, como o tipo `BitList`, que requer que um limite de comprimento seja adicionado durante a serialização e removido durante a desserialização. Detalhes completos estão disponíveis na [especificação SSZ](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md).

### Desserialização {#deserialization}

Para desserializar este objeto é necessário o <b>esquema</b> (diagrama, desenho). O esquema define o layout preciso dos dados serializados, para que cada elemento específico possa ser desserializado, de um blob de bytes em algum objeto significativo, com os elementos tendo o tipo, valor, tamanho e posição corretos. É o esquema que diz ao desserializador quais valores são valores reais e quais são deslocamentos. Todos os nomes de campo desaparecem quando um objeto é serializado, mas reinstanciados na desserialização de acordo com o esquema.

Consulte [ssz.dev](https://www.ssz.dev/overview) para obter uma explicação interativa sobre isso.

## Merkleização {#merkleization}

Esse objeto serializado SSZ pode então ser merkleizado, o seja, transformado em uma representação de árvore Merkle dos mesmos dados. Primeiro, o número de partes de 32 bytes no objeto serializado é determinado. Estas são as "folhas" da árvore. O número total de folhas deve ser uma potência de 2 para que a combinação das folhas eventualmente produza uma única raiz de árvore hash. Se este não for o caso natural, são adicionadas folhas extras que contêm 32 bytes de zeros. Diagramaticamente:

```
        raiz da árvore de hash
            /     \
           /       \
          /         \
         /           \
   hash das folhas  hash das folhas
     1 e 2           3 e 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 folha1    folha2   folha3    folha4
```

Há também casos em que as folhas da árvore não se distribuem naturalmente, de maneira uniforme, como o fazem no exemplo acima. Por exemplo, a folha 4 pode ser um contêiner com vários elementos que exige "profundidade" adicional para serem adicionados à árvore Merkle, criando uma árvore desnivelada.

Em vez de nos referirmos a esses elementos da árvore como folha X, nó X etc., podemos dar a eles índices generalizados, começando com raiz = 1 e contando da esquerda para a direita ao longo de cada nível. Este é o índice generalizado explicado acima. Cada elemento na lista serializada tem um índice generalizado igual a `2**depth + idx`, onde `idx` é sua posição indexada a zero no objeto serializado e a profundidade (`depth`) é o número de níveis na árvore Merkle, que pode ser determinada como o logaritmo de base dois do número de elementos (folhas).

## Índices generalizados {#generalized-indices}

Um índice generalizado é um número inteiro que representa um nó em uma árvore Merkle binária, onde cada nó tem um índice generalizado de `2 ** depth + index in row`.

```
        1           --profundidade = 0  2**0 + 0 = 1
    2       3       --profundidade = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --profundidade = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Essa representação produz um índice de nó para cada parte dos dados na árvore Merkle.

## Multiprovas {#multiproofs}

Fornecer a lista de índices generalizados, que representam um elemento específico, nos permite verificá-lo em relação à raiz da árvore hash. Esta raiz é nossa versão aceita da realidade. Qualquer dado que nos for fornecido pode ser verificado em relação a essa realidade, inserindo-o no lugar certo na árvore Merkle (determinado pelo seu índice generalizado) e observando que a raiz permanece constante. Há funções na especificação [aqui](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) que mostram como calcular o conjunto mínimo de nós necessários para verificar o conteúdo de um determinado conjunto de índices generalizados.

Por exemplo, para verificar o dado no índice 9 na árvore abaixo, precisamos do hash dos dados nos índices 8, 9, 5, 3, 1.
O hash de (8,9) deve ser igual ao hash (4), que faz hash com 5 para produzir 2, que faz hash com 3 para produzir a raiz da árvore 1. Se dados incorretos fossem fornecidos para 9, a raiz mudaria; detectaríamos isso e falharíamos ao verificar a branch.

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
