---
title: Serialización de prefijo de longitud recursiva (RLP)
description: Definición de la codificación RLP en la capa de ejecución de Ethereum.
lang: es
sidebarDepth: 2
---

La serialización de prefijo de longitud recursiva (RLP) se utiliza ampliamente en los clientes de ejecución de Ethereum. El RLP estandariza la transferencia de datos entre nodos en un formato de uso de espacio eficiente. El propósito de RLP es codificar matrices anidadas arbitrariamente de datos binarios, y RLP es el método de codificación principal utilizado para serializar objetos en la capa de ejecución de Ethereum. El propósito principal de RLP es codificar estructuras, con la excepción de enteros positivos, RLP delega la codificación de tipos de datos específicos (p. ej., strings, floats) a protocolos de mayor orden. Los enteros positivos deben representarse en forma binaria big-endian sin ceros iniciales (lo que hace que el valor entero cero sea equivalente a la matriz de bytes vacía). Los enteros positivos deserializados con ceros iniciales deben ser tratados como no válidos por cualquier protocolo de alto orden que utilice RLP.

Consulte más información en [La hoja amarilla de Ethereum (Apéndice B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Para usar RLP para codificar un diccionario, las dos formas canónicas sugeridas son:

- usar `[[k1,v1],[k2,v2]...]` con claves en orden lexicográfico
- usar la codificación de Patricia Tree de nivel superior como lo hace Ethereum

## Definición {#definition}

La función de codificación RLP toma un elemento. Un elemento se define de la siguiente manera：

- una cadena (es decir, una matriz de bytes) es un elemento
- una lista de elementos es un elemento
- un entero positivo es un elemento

Por ejemplo, todos los siguientes son elementos:

- una cadena vacía;
- la cadena que contiene la palabra "gato";
- una lista que contiene cualquier número de cadenas;
- y estructuras de datos más complejas como `["gato", ["cachorro", "vaca"], "caballo", [[]], "cerdo", [""], "oveja"]`.
- el número `100`

Nótese que, en el contexto del resto de esta página, "string" se refiere a "cierta cantidad de bytes de datos binarios"; no se usan codificaciones especiales ni se implica conocimiento del contenido de las strings (excepto según lo requiera la regla contra enteros positivos no mínimos).

La codificación RLP se define de la siguiente manera:

- En el caso de un entero positivo, se lo convierte al array de bytes más corto cuya interpretación big endian es el entero y luego se codifica como una string según las reglas siguientes.
- Para un solo byte cuyo valor esté en el rango `[0x00, 0x7f]` (decimal `[0, 127]`), ese byte es su propia codificación RLP.
- De lo contrario, si una cadena tiene una longitud de 0-55 bytes, la codificación RLP consta de un solo byte con el valor **0x80** (dec. 128) más la longitud de la cadena seguida de la cadena. Por lo tanto, el rango del primer byte es `[0x80, 0xb7]` (dec. `[128, 183]`).
- Si una cadena tiene más de 55 bytes de largo, la codificación RLP consta de un solo byte con el valor **0xb7** (dec. 183) más la longitud en bytes de la longitud de la cadena en forma binaria, seguida de la longitud de la cadena, seguida de la cadena. Por ejemplo, una cadena de 1024 bytes de largo se codificaría como `\xb9\x04\x00` (dec. `185, 4, 0`) seguido de la cadena. Aquí, `0xb9` (183 + 2 = 185) como el primer byte, seguido de los 2 bytes `0x0400` (dec. 1024) que denotan la longitud de la cadena real. El rango del primer byte es, por lo tanto, `[0xb8, 0xbf]` (dec. `[184, 191]`).
- Si una string tiene una longitud mayor o igual a 2^64 bytes, no puede ser codificada.
- Si la carga útil total de una lista (es decir, la longitud combinada de todos sus elementos codificados con RLP) es de 0-55 bytes, la codificación RLP consta de un solo byte con un valor **0xc0** más la longitud de la lista, seguida de la concatenación de las codificaciones RLP de los elementos. Por lo tanto, el rango del primer byte es `[0xc0, 0xf7]` (dec. `[192, 247]`).
- Si la carga útil total de una lista tiene más de 55 bytes de longitud, la codificación RLP consta de un solo byte con un valor **0xf7** más la longitud en bytes de la longitud de la carga útil en forma binaria, seguida de la longitud de la carga útil, seguida de la concatenación de las codificaciones RLP de los elementos. Por lo tanto, el rango del primer byte es `[0xf8, 0xff]` (dec. `[248, 255]`).

En el código, esto es:

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
- la cadena vacía ("null") = `[ 0x80 ]`
- la lista vacía = `[ 0xc0 ]`
- el entero 0 = `[ 0x80 ]`
- el byte '\\x00' = `[ 0x00 ]`
- el byte '\\x0f' = `[ 0x0f ]`
- los bytes '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- la [representación teórica de conjunto](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) de tres, `[ [], [[]], [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- la cadena "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Decodificación RLP {#rlp-decoding}

De acuerdo con las reglas y el proceso de codificación RLP, la entrada de la decodificación RLP se considera una matriz de datos binarios. El proceso de decodificación RLP es el siguiente:

1.  de acuerdo con el primer byte (es decir, el prefijo) de los datos de entrada y la decodificación del tipo de datos, la longitud de los datos reales y el desplazamiento;

2.  de acuerdo con el tipo y offset de datos, decodificar los datos según corresponda, respetando la regla de codificación mínima para enteros positivos;

3.  continuar decodificando el resto de la entrada.

Entre ellos, las reglas de decodificación de tipos de datos y desplazamiento son las siguientes:

1.  los datos son una cadena si el rango del primer byte (es decir, el prefijo) es [0x00, 0x7f], y la cadena es exactamente el primer byte en sí;

2.  los datos son una cadena si el rango del primer byte es [0x80, 0xb7], y la cadena cuya longitud es igual al primer byte menos 0x80 sigue al primer byte;

3.  los datos son una cadena si el rango del primer byte es [0xb8, 0xbf], y la longitud de la cadena cuya longitud en bytes es igual al primer byte menos 0xb7 sigue al primer byte, y la cadena sigue la longitud de la cadena;

4.  los datos son una lista si el rango del primer byte es [0xc0, 0xf7], y la concatenación de las codificaciones RLP de todos los elementos de la lista cuya carga útil total es igual al primer byte menos 0xc0 sigue al primer byte;

5.  los datos son una lista si el rango del primer byte es [0xf8, 0xff], y la carga útil total de la lista cuya longitud es igual al primer byte menos 0xf7 sigue al primer byte, y la concatenación de las codificaciones RLP de todos los elementos de la lista sigue la carga útil total de la lista;

En el código, esto es:

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

## Más información {#further-reading}

- [RLP en Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum bajo el capó: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Prefijo de longitud recursiva de Ethereum en ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Temas relacionados {#related-topics}

- [Patricia merkle trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
