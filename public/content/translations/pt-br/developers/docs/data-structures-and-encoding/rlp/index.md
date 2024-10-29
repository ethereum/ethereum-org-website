---
title: Serialização do prefixo de comprimento recursivo (RLP)
description: Uma definição da codificação RLP na camada de execução do Ethereum
lang: pt-br
sidebarDepth: 2
---

A Serialização do prefixo de comprimento recursivo (RLP) é usado extensivamente nos clientes de execução Ethereum. RLP padroniza a transferência de dados entre nós em um formato eficiente em espaço. O objetivo do RLP é codificar arbitrariamente arrays de dados binários aninhados, e o RLP é o principal método de codificação usado para serializar objetos na camada de execução do Ethereum. O principal objetivo do RLP é codificar a estrutura; com exceção de números inteiros positivos, o RLP delega a codificação de tipos de dados específicos (por exemplo, strings, floats) para protocolos de ordem superior. Os inteiros positivos devem ser representados no formato binário big-endian, sem zeros à esquerda (tornando assim o valor inteiro zero equivalente ao array de bytes vazio). Inteiros positivos desserializados com zeros à esquerda devem ser tratados como inválidos por qualquer protocolo de ordem superior que use RLP.

Mais informações nas [ páginas amarelas Ethereum (Apêndice B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Para usar o RLP para codificar um dicionário, as duas formas canônicas são:

- usar `[[k1,v1],[k2,v2]...]` com chaves em ordem lexicográfica
- usar a codificação da Árvore Patricia de nível superior como Ethereum faz

## Definição {#definition}

A função de codificação RLP recebe um item. Um item é definido como abaixo：

- uma string (ou seja, um byte array) é um item
- uma lista de itens é um item
- um inteiro positivo é um item

Por exemplo, todos os seguintes são itens:

- uma string vazia;
- a string que contém a palavra "cat";
- uma lista contendo qualquer número de strings;
- e uma estrutura de dados mais complexa, como `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- o número `100`

Observe que, no contexto do restante desta página, 'string' significa "um certo número de bytes de dados binários"; nenhuma codificação especial é usada, e nenhum conhecimento sobre o conteúdo das strings é implícito (exceto conforme exigido pela regra contra inteiros positivos não mínimos).

A codificação RLP é definida da seguinte forma:

- Para um número inteiro positivo, ele é convertido para o menor array de bytes cuja interpretação big-endian é o número inteiro e, então, codificado como uma string de acordo com as regras abaixo.
- Para um único byte cujo valor está na faixa `[0x00, 0x7f]` (decimal `[0, 127]`), este byte é a sua própria codificação RLP.
- Caso contrário, se uma string tem de 0 a 55 bytes de comprimento, a codificação RLP consiste em um único byte com valor **0x80** (dec. 128) mais o comprimento da string seguida pela string. O intervalo do primeiro byte é, portanto, `[0x80, 0xb7]` (dec. `[128, 183]`).
- Se uma string tem mais de 55 bytes de comprimento, a codificação RLP consiste em um único byte com valor **0xb7** (dec. 183) mais o comprimento em bytes do comprimento da sequência de caracteres na forma binária, seguido pelo comprimento da string, seguido pela string. Por exemplo, uma string de 1024 bytes de comprimento seria codificada como `\xb9\x04\x00` (dec. `185, 4, 0`) seguida pela string. Aqui, `0xb9` (183 + 2 = 185) como o primeiro byte, seguido pelos 2 bytes `0x0400` (dec. 1024) que denotam o comprimento da string real. O intervalo do primeiro byte é, portanto, `[0x80, 0xb7]` (dec. `[184, 191]`).
- Se uma string tiver 2^64 bytes de comprimento ou mais, ela poderá não ser codificada.
- Se o total de carga de uma lista (ou seja, o comprimento combinado de totos os seus itens com codificação RLP) tiver 0 a 55 bytes de comprimento, a codificação RLP consiste em um único byte com valor **0xc0** mais o comprimento da carga seguido da concatenação das codificações dos itens. O intervalo do primeiro byte é, portanto, `[0x80, 0xb7]` (dec. `[192, 247]`).
- Se o payload total de uma lista tem mais de 55 bytes de comprimento, a codificação RLP consiste em um único byte com valor **0xf7** mais o comprimento em bytes do payload na forma binária, seguida pelo comprimento do payload, seguido pela concatenação das codificações RLP dos itens. O intervalo do primeiro byte é, portanto, `[0x80, 0xb7]` (dec. `[248, 255]`).

Em código, isto é:

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
     raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## Exemplos {#examples}

- a string "dog" = [ 0x83, 'd', 'o', 'g' ]
- a lista [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- a string vazia ('null') = `[ 0x80 ]`
- a lista vazia = `[ 0xc0 ]`
- o inteiro 0 = `[ 0x80 ]`
- o byte '\\x00' = `[ 0x00 ]`
- o byte '\\x0f' = `[ 0x0f ]`
- os bytes '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- [define a representação teórica](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) para três, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc0, 0xc1, 0xc0 ]`
- a string "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Decodificação RLP {#rlp-decoding}

De acordo com as regras e o processo de codificação RLP, a entrada da decodificação RLP é considerada uma matriz de dados binários. O processo de decodificação do RLP é o seguinte:

1.  de acordo com o primeiro byte (ou seja, o prefixo) dos dados de entrada e a decodificação do tipo de dados, o comprimento do dado em si e deslocamento;

2.  de acordo com o tipo e deslocamento dos dados, decodificar os dados de maneira correspondente, respeitando a regra de codificação mínima para inteiros positivos;

3.  continue a decodificar o resto da entrada;

Entre elas, as regras de decodificação de tipos de dados e deslocamento são as seguintes:

1.  os dados são uma string se a faixa do primeiro byte (por exemplo, prefixo) é [0x00, 0x7f], e a string é exatamente o primeiro byte;

2.  o dado é uma string se o intervalo do primeiro byte é [0x80, 0xb7], e a string cujo comprimento é igual ao primeiro byte menos 0x80 segue o primeiro byte;

3.  os dados são uma string se o intervalo do primeiro byte é [0xb8, 0xbf] e o comprimento da string cujo comprimento em bytes é igual ao primeiro byte menos 0xb7 segue primeiro byte, e a cadeia de caracteres segue o comprimento da string;

4.  os dados são uma lista se o intervalo do primeiro byte é [0xc0, 0xf7], e a concatenação das codificações RLP de todos os itens da lista que a carga total é igual ao primeiro byte menos 0xc0 e segue o primeiro byte;

5.  os dados são uma string se o intervalo do primeiro byte é [0xb8, 0xbf], e o payload total da lista cujo comprimento é igual ao primeiro byte menos 0xf7 segue o primeiro byte, e a concatenação das codificações RLP de todos os itens da lista segue o payload total da lista;

Em código, isto é:

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## Leitura adicional {#further-reading}

- [RLP em Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum nos bastidores: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Prefixo de comprimento recursivo do Ethereum em ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Tópicos relacionados {#related-topics}

- [Árvore Patricia Merkle](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
