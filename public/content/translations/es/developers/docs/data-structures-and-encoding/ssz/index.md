---
title: Simple serialize
description: Explicación del formato SSZ de Ethereum.
lang: es
sidebarDepth: 2
---

**Simple serialize (SSZ)** es el método de serialización utilizado en la cadena de Baliza. Reemplaza la serialización RLP utilizada en la capa de ejecución en todas partes de la capa de consenso, excepto el protocolo de descubrimiento de pares. SSZ está diseñado para ser determinista y también para Merklealizar de manera eficiente. Se puede considerar que SSZ tiene dos componentes: un esquema de serialización y un esquema de Merkleización que está diseñado para funcionar de manera eficiente con la estructura de datos serializados.

## ¿Cómo funciona SSZ? {#how-does-ssz-work}

### Serialización {#serialization}

SSZ es un esquema de serialización que no se describe a sí mismo, sino que se basa en un esquema que debe conocerse de antemano. El objetivo de la serialización SSZ es representar objetos de complejidad arbitraria como cadenas de bytes. Este es un proceso muy sencillo para los "tipos básicos". El elemento simplemente se convierte en bytes hexadecimales. Los tipos básicos incluyen:

- números enteros sin signo (a menudo llamados uints)
- booleanos

Para los tipos "compuestos" complejos, la serialización es más complicada porque el tipo compuesto contiene múltiples elementos que podrían tener diferentes tipos o tamaños, o ambos. Cuando todos estos objetos tienen longitudes fijas (es decir, el tamaño de los elementos siempre va a ser constante, independientemente de sus valores reales), la serialización es simplemente una conversión de cada elemento en el tipo compuesto ordenado en cadenas de bytes little-endian. Estas cadenas de bytes están unidas. El objeto serializado tiene la representación bytelist de los elementos de longitud fija en el mismo orden en que aparecen en el objeto deserializado.

Para los tipos con longitudes variables, los datos reales se reemplazan por un valor de "desplazamiento" (offset) en la posición de ese elemento en el objeto serializado. Los datos reales se añaden a una pila al final del objeto serializado. El valor de desplazamiento es el índice para el inicio de los datos reales en la pila, actuando como un puntero a los bytes relevantes.

El siguiente ejemplo ilustra cómo funciona el desplazamiento para un contenedor con elementos de longitud fija y variable:

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

`serialized` tendría la siguiente estructura (solo acolchado a 4 bits aquí, acolchado a 32 bits en realidad, y manteniendo la representación `int` para mayor claridad):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset for    number 3    value for
                              vector                   vector

```

dividido en líneas para mayor claridad:

```
[
  37, 0, 0, 0,  # little-endian encoding of `number1`.
  55, 0, 0, 0,  # little-endian encoding of `number2`.
  16, 0, 0, 0,  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  22, 0, 0, 0,  # little-endian encoding of `number3`.
  1, 2, 3, 4,   # The actual values in `vector`.
]
```

Esto sigue siendo una simplificación: los enteros y los ceros en los esquemas anteriores en realidad serían bytelists, de la siguiente manera:

```
[
  10100101000000000000000000000000  # little-endian encoding of `number1`
  10110111000000000000000000000000  # little-endian encoding of `number2`.
  10010000000000000000000000000000  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  10010110000000000000000000000000  # little-endian encoding of `number3`.
  10000001100000101000001110000100   # The actual value of the `bytes` field.
]
```

Por lo tanto, los valores reales de los tipos de longitud variable se almacenan en una pila al final del objeto serializado con sus desplazamientos almacenados en sus posiciones correctas en la lista ordenada de campos.

También hay algunos casos especiales que requieren un tratamiento específico, como el tipo `BitList` que requiere que se agregue un límite de longitud durante la serialización y se elimine durante la deserialización. Los detalles completos están disponibles en la [ especificación de SSZ](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md).

### Deserialización {#deserialization}

Para deserializar este objeto se necesita el <b>esquema</b>. El esquema define el diseño preciso de los datos serializados para que cada elemento específico se pueda deserializar a partir de un blob de bytes en algún objeto significativo; los elementos tienen el tipo, el valor, el tamaño y la posición correctos. Es el esquema que le dice al deserializador qué valores son valores reales y cuáles son desplazamientos. Todos los nombres de campo desaparecen cuando un objeto se serializa, pero se vuelven a instanciar en la deserialización de acuerdo con el esquema.

Consulte [ssz.dev](https://www.ssz.dev/overview) para obtener una explicación interactiva sobre esto.

## Merklealización {#merkleization}

Este objeto serializado SSZ luego puede ser merkleizado, esto es, transformarse en una representación de árbol Merkle de los mismos datos. En primer lugar, se determina el número de chunks de 32 bytes en el objeto serializado. Estas son las "hojas" del árbol. El número total de hojas debe ser una potencia de 2 para que al hashear las hojas se produzca eventualmente una sola raíz de árbol de hash. Si este no es naturalmente el caso, se añaden hojas adicionales que contienen 32 bytes de ceros. De forma esquemática:

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

También hay casos en los que las hojas del árbol no se distribuyen de manera uniforme de forma natural como lo hacen en el ejemplo anterior. Por ejemplo, la hoja 4 podría ser un contenedor con múltiples elementos que requieran "profundidad" adicional para agregarse al árbol de Merkle, creando un árbol desigual.

En lugar de referirnos a estos elementos del árbol como hoja X, nodo X, etc., podemos darles índices generalizados, comenzando con la raíz = 1 y contando de izquierda a derecha a lo largo de cada nivel. Este es el índice generalizado explicado anteriormente. Cada elemento de la lista serializada tiene un índice generalizado igual a `2**profundidad + idx`, donde idx es su posición indexada a cero en el objeto serializado y la profundidad es el número de niveles en el árbol de Merkle, que se puede determinar como el logaritmo base dos del número de elementos (hojas).

## Índices generalizados {#generalized-indices}

Un índice generalizado es un entero que representa un nodo en un árbol binario de Merkle donde cada nodo tiene un índice generalizado `2 ** profundidad + índice en fila`.

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Esta representación produce un índice de nodo para cada dato en el árbol de Merkle.

## Multipruebas {#multiproofs}

Proporcionar la lista de índices generalizados que representan un elemento específico nos permite verificarlo contra la raíz del árbol de hash. Esta raíz es nuestra versión aceptada de la realidad. Cualquier dato que se nos proporcione se puede verificar frente a esa realidad insertándolo en el lugar correcto en el árbol de Merkle (determinado por su índice generalizado) y observando que la raíz permanezca constante. Hay funciones en la especificación [aquí](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) que muestran cómo calcular el conjunto mínimo de nodos necesarios para verificar el contenido de un conjunto particular de índices generalizados.

Por ejemplo, para verificar los datos del índice 9 en el árbol de abajo, necesitamos el hash de los datos en los índices 8, 9, 5, 3, 1. El hash de (8,9) debe ser igual al hash (4), que hashea con 5 para producir 2, que hashea con 3 para producir la raíz del árbol 1. Si se proporcionaran datos incorrectos para 9, la raíz cambiaría, lo detectaríamos y no podríamos verificar la rama.

```
* = data required to generate proof

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Más información {#further-reading}

- [Mejorar Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Mejorar Ethereum: merkleización](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementaciones de SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Calculadora de SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
