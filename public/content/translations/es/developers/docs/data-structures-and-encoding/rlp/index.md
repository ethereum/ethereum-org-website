---
title: Serialización de prefijo de longitud recursiva (RLP)
description: Una definición de la codificación RLP en la capa de ejecución de Ethereum.
lang: es
sidebarDepth: 2
---

La serialización de prefijo de longitud recursiva (RLP) se utiliza ampliamente en los clientes de ejecución de Ethereum. RLP estandariza la transferencia de datos entre nodos en un formato eficiente en cuanto a espacio. El propósito de RLP es codificar matrices anidadas arbitrariamente de datos binarios, y RLP es el método de codificación principal utilizado para serializar objetos en la capa de ejecución de Ethereum. El propósito principal de RLP es codificar la estructura; con la excepción de los enteros positivos, RLP delega la codificación de tipos de datos específicos (por ejemplo, cadenas, números de punto flotante) a protocolos de orden superior. Los enteros positivos deben representarse en formato binario big-endian sin ceros a la izquierda (lo que hace que el valor entero cero sea equivalente a la matriz de bytes vacía). Los enteros positivos deserializados con ceros a la izquierda deben ser tratados como inválidos por cualquier protocolo de orden superior que utilice RLP.

Más información en [el Libro Amarillo de Ethereum (Apéndice B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Para usar RLP para codificar un diccionario, las dos formas canónicas sugeridas son:

- usar `[[k1,v1],[k2,v2]...]` con claves en orden lexicográfico
- usar la codificación de árbol Patricia de nivel superior como lo hace [Ethereum](/)

## Definición {#definition}

La función de codificación RLP toma un elemento. Un elemento se define de la siguiente manera:

- una cadena (es decir, una matriz de bytes) es un elemento
- una lista de elementos es un elemento
- un entero positivo es un elemento

Por ejemplo, todos los siguientes son elementos:

- una cadena vacía;
- la cadena que contiene la palabra "cat";
- una lista que contiene cualquier número de cadenas;
- y estructuras de datos más complejas como `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- el número `100`

Tenga en cuenta que en el contexto del resto de esta página, 'cadena' significa "un cierto número de bytes de datos binarios"; no se utilizan codificaciones especiales y no se implica ningún conocimiento sobre el contenido de las cadenas (excepto lo requerido por la regla contra los enteros positivos no mínimos).

La codificación RLP se define de la siguiente manera:

- Para un entero positivo, se convierte a la matriz de bytes más corta cuya interpretación big-endian es el entero, y luego se codifica como una cadena de acuerdo con las reglas a continuación.
- Para un solo byte cuyo valor está en el rango `[0x00, 0x7f]` (decimal `[0, 127]`), ese byte es su propia codificación RLP.
- De lo contrario, si una cadena tiene una longitud de 0 a 55 bytes, la codificación RLP consiste en un solo byte con el valor **0x80** (dec. 128) más la longitud de la cadena seguida de la cadena. El rango del primer byte es, por lo tanto, `[0x80, 0xb7]` (dec. `[128, 183]`).
- Si una cadena tiene más de 55 bytes de longitud, la codificación RLP consiste en un solo byte con el valor **0xb7** (dec. 183) más la longitud en bytes de la longitud de la cadena en forma binaria, seguida de la longitud de la cadena, seguida de la cadena. Por ejemplo, una cadena de 1024 bytes de longitud se codificaría como `\xb9\x04\x00` (dec. `185, 4, 0`) seguida de la cadena. Aquí, `0xb9` (183 + 2 = 185) como el primer byte, seguido de los 2 bytes `0x0400` (dec. 1024) que denotan la longitud de la cadena real. El rango del primer byte es, por lo tanto, `[0xb8, 0xbf]` (dec. `[184, 191]`).
- Si una cadena tiene 2^64 bytes de longitud, o más, no puede ser codificada.
- Si la carga útil total de una lista (es decir, la longitud combinada de todos sus elementos codificados en RLP) tiene una longitud de 0 a 55 bytes, la codificación RLP consiste en un solo byte con el valor **0xc0** más la longitud de la carga útil seguida de la concatenación de las codificaciones RLP de los elementos. El rango del primer byte es, por lo tanto, `[0xc0, 0xf7]` (dec. `[192, 247]`).
- Si la carga útil total de una lista tiene más de 55 bytes de longitud, la codificación RLP consiste en un solo byte con el valor **0xf7** más la longitud en bytes de la longitud de la carga útil en forma binaria, seguida de la longitud de la carga útil, seguida de la concatenación de las codificaciones RLP de los elementos. El rango del primer byte es, por lo tanto, `[0xf8, 0xff]` (dec. `[248, 255]`).

De forma sucinta:

| Rango       | Byte 1     | Byte 2     | ...        | Byte 9                | Byte 10    | Significado                                   |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | cadena de un solo byte                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | cadena corta (0-55 bytes)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | cadena larga, N+1 bytes para la longitud, luego la carga útil |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | lista corta (0-55 bytes)                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | lista larga, N+1 bytes para la longitud, luego la carga útil |

- `p` = carga útil
- `n` = longitud (número de bytes de la carga útil)
- `N` = desplazamiento de la longitud de la longitud (siguen N+1 bytes de `n`)

En código, esto es:

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

## Ejemplos {#examples}

- la cadena "dog" = [ 0x83, 'd', 'o', 'g' ]
- la lista [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- la cadena vacía ('null') = `[ 0x80 ]`
- la lista vacía = `[ 0xc0 ]`
- el entero 0 = `[ 0x80 ]`
- el byte '\x00' = `[ 0x00 ]`
- el byte '\x0f' = `[ 0x0f ]`
- los bytes '\x04\x00' = `[ 0x82, 0x04, 0x00 ]`
- la [representación teórica de conjuntos](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) de tres, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- la cadena "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Decodificación RLP {#rlp-decoding}

De acuerdo con las reglas y el proceso de codificación RLP, la entrada de la decodificación RLP se considera como una matriz de datos binarios. El proceso de decodificación RLP es el siguiente:

1.  de acuerdo con el primer byte (es decir, el prefijo) de los datos de entrada y decodificando el tipo de datos, la longitud de los datos reales y el desplazamiento;

2.  de acuerdo con el tipo y el desplazamiento de los datos, decodificar los datos correspondientemente, respetando la regla de codificación mínima para enteros positivos;

3.  continuar decodificando el resto de la entrada;

Entre ellas, las reglas de decodificación de tipos de datos y desplazamiento son las siguientes:

1.  los datos son una cadena si el rango del primer byte (es decir, el prefijo) es [0x00, 0x7f], y la cadena es exactamente el primer byte en sí;

2.  los datos son una cadena si el rango del primer byte es [0x80, 0xb7], y la cadena cuya longitud es igual al primer byte menos 0x80 sigue al primer byte;

3.  los datos son una cadena si el rango del primer byte es [0xb8, 0xbf], y la longitud de la cadena cuya longitud en bytes es igual al primer byte menos 0xb7 sigue al primer byte, y la cadena sigue a la longitud de la cadena;

4.  los datos son una lista si el rango del primer byte es [0xc0, 0xf7], y la concatenación de las codificaciones RLP de todos los elementos de la lista cuya carga útil total es igual al primer byte menos 0xc0 sigue al primer byte;

5.  los datos son una lista si el rango del primer byte es [0xf8, 0xff], y la carga útil total de la lista cuya longitud es igual al primer byte menos 0xf7 sigue al primer byte, y la concatenación de las codificaciones RLP de todos los elementos de la lista sigue a la carga útil total de la lista;

En código, esto es:

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

## Lecturas adicionales {#further-reading}

- [RLP en Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum a nivel interno: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Temas relacionados {#related-topics}

- [Trie de Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)