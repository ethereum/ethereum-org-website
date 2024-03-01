---
title: Serialização simples
description: Explicação do formato SSZ do Ethereum
lang: pt-br
sidebarDepth: 2
---

A **serialização simples (SSZ ou simple serialize)** é o método de serialização usado na Beacon Chain. Ela substitui a serialização RLP usada na camada de execução em toda a camada de consenso, exceto no protocolo de descoberta de pares. SSZ foi projetado para ser determinístico e também para Merkleize (transformações em árvores de Merkle) de forma eficiente. SSZ pode ser pensado como tendo dois componentes: um esquema de serialização e um esquema de Merkleization que é projetado para trabalhar eficientemente com a estrutura de dados serializada.

## Como funciona o SSZ? {#how-does-ssz-work}

### Serialização {#serialization}

SSZ é um esquema de serialização que não é autodescritivo. Em vez disso, ele se baseia em um esquema que deve ser conhecido antecipadamente. O objetivo da serialização SSZ é representar objetos de complexidade arbitrária como strings de bytes. Este é um processo muito simples para "tipos básicos". O elemento é simplesmente convertido em bytes hexadecimais. Os tipos básicos incluem:

- inteiros sem sinal
- booleanos

Para tipos complexos de "composição", a serialização é mais complicada porque o tipo composto contém múltiplos elementos que podem ter diferentes tipos ou tamanhos diferentes, ou ambos. Onde todos esses objetos têm comprimentos fixos (ou seja, o tamanho dos elementos sempre será constante, independentemente de seus valores reais), a serialização é simplesmente uma conversão de cada elemento no tipo composto ordenado em strings de bytes little-endian. Estas strings de bytes estão unidas. O objeto serializado tem a representação de bytelist (array de bytes) dos elementos de comprimento fixo na mesma ordem em que aparecem no objeto desserializado.

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

`serialized` teria a seguinte estrutura (apenas preenchido com 4 bits aqui, mas preenchido com 32 bits na realidade e mantendo a representação `int` para clareza):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset for    number 3    value for
                              vector                   vector

```

dividido em linhas para clareza:

```
[
  37, 0, 0, 0,  # little-endian encoding of `number1`.
  55, 0, 0, 0,  # little-endian encoding of `number2`.
  16, 0, 0, 0,  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  22, 0, 0, 0,  # little-endian encoding of `number3`.
  1, 2, 3, 4,   # The actual values in `vector`.
]
```

Isso ainda é uma simplificação. Os inteiros e zeros nos esquemas acima, na verdade, seriam armazenados em bytelists, assim:

```
[
  10100101000000000000000000000000  # little-endian encoding of `number1`
  10110111000000000000000000000000  # little-endian encoding of `number2`.
  10010000000000000000000000000000  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  10010110000000000000000000000000  # little-endian encoding of `number3`.
  10000001100000101000001110000100   # The actual value of the `bytes` field.
]
```

Assim, os valores reais para tipos de comprimento variável são armazenados em uma pilha no final do objeto serializado com seus deslocamentos armazenados em suas posições corretas na lista ordenada de campos.

Existem também alguns casos especiais que requerem tratamento específico, como o tipo `BitList` que requer que seja adicionado um limite de comprimento durante a serialização e removido durante a desserialização. Os detalhes completos estão disponíveis na [especificação SSZ](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md).

### Desserialização {#deserialization}

Para desserializar este objeto é necessário o <b>esquema</b> (diagrama, desenho). O esquema define o layout preciso dos dados serializados, para que cada elemento específico possa ser desserializado, de um blob de bytes em algum objeto significativo, com os elementos tendo o tipo, valor, tamanho e posição corretos. É o esquema que diz ao desserializador quais valores são valores reais e quais são deslocamentos. Todos os nomes de campo desaparecem quando um objeto é serializado, mas reinstanciados na desserialização de acordo com o esquema.

Veja [ssz.dev](https://www.ssz.dev/overview) para uma explicação interativa sobre isso.

## "Merkleização" {#merkleization}

Esse objeto serializado SSZ pode então ser merkleizado, o seja, transformado em uma representação de árvore Merkle dos mesmos dados. Primeiro, o número de partes de 32 bytes no objeto serializado é determinado. Estas são as "folhas" da árvore. O número total de folhas deve ser uma potência de 2 para que a combinação das folhas eventualmente produza uma única raiz de árvore hash. Se este não for o caso natural, são adicionadas folhas extras que contêm 32 bytes de zeros. Diagramaticamente:

```
        hash tree root
            /     \
           /       \
          /         \
         /           \
   hash of leaves  hash of leaves
     1 and 2         3 and 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 leaf1     leaf2  leaf3     leaf4
```

Há também casos em que as folhas da árvore não se distribuem naturalmente, de maneira uniforme, como o fazem no exemplo acima. Por exemplo, a folha 4 pode ser um contêiner com vários elementos que exige "profundidade" adicional para serem adicionados à árvore Merkle, criando uma árvore desnivelada.

Em vez de nos referirmos a esses elementos da árvore como folha X, nó X etc., podemos dar a eles índices generalizados, começando com raiz = 1 e contando da esquerda para a direita ao longo de cada nível. Este é o índice generalizado explicado acima. Cada elemento na lista serializada tem um índice generalizado igual a `2**depth + idx` onde idx é sua posição indexada em zero no objeto serializado e a profundidade é o número de níveis na árvore Merkle, que pode ser determinado como a raiz quadrada do número de elementos (folhas).

## Índices generalizados {#generalized-indices}

Um índice generalizado é um número inteiro que representa um nó em uma árvore Merkle binária em que cada nó tem um índice generalizado `2 ** profundidade + índice da linha`.

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Essa representação produz um índice de nó para cada parte dos dados na árvore Merkle.

## Multiprovas {#multiproofs}

Fornecer a lista de índices generalizados, que representam um elemento específico, nos permite verificá-lo em relação à raiz da árvore hash. Esta raiz é nossa versão aceita da realidade. Qualquer dado que nos for fornecido pode ser verificado em relação a essa realidade, inserindo-o no lugar certo na árvore Merkle (determinado pelo seu índice generalizado) e observando que a raiz permanece constante. Há funções na especificação [aqui](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) que mostram como calcular o conjunto mínimo de nós necessários, para verificar o conteúdo de um conjunto particular de índices generalizados.

Por exemplo, para verificar o dado no índice 9 na árvore abaixo, precisamos do hash dos dados nos índices 8, 9, 5, 3, 1. O hash de (8,9) deve ser igual ao hash (4), que faz hash com 5 para produzir 2, que faz hash com 3 para produzir a raiz da árvore 1. Se dados incorretos fossem fornecidos para 9, a raiz mudaria; detectaríamos isso e falharíamos ao verificar a branch.

```
* = data required to generate proof

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Leia mais {#further-reading}

- [Atualização do Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Atualização do Ethereum: "Merkleização"](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementações SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Calculadora SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
