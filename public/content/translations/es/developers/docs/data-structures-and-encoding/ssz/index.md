---
title: "Serialización simple"
description: "Explicación del formato SSZ de Ethereum."
lang: es
sidebarDepth: 2
---

**Serialización simple (SSZ)** es el método de serialización utilizado en la cadena de balizas. Reemplaza la serialización RLP utilizada en la capa de ejecución en toda la capa de consenso, excepto en el protocolo de descubrimiento de pares. Para obtener más información sobre la serialización RLP, consulte [Prefijo de longitud recursiva (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ está diseñado para ser determinista y también para la merkleización eficiente. Se puede pensar que SSZ tiene dos componentes: un esquema de serialización y un esquema de merkleización que está diseñado para funcionar de manera eficiente con la estructura de datos serializada.

## ¿Cómo funciona SSZ? {#how-does-ssz-work}

### Serialización {#serialization}

SSZ es un esquema de serialización que no se describe a sí mismo, sino que depende de un esquema que debe conocerse de antemano. El objetivo de la serialización SSZ es representar objetos de complejidad arbitraria como cadenas de bytes. Este es un proceso muy simple para los "tipos básicos". El elemento simplemente se convierte a bytes hexadecimales. Los tipos básicos incluyen:

- enteros sin signo
- booleanos

Para los tipos "compuestos" complejos, la serialización es más complicada porque el tipo compuesto contiene múltiples elementos que podrían tener diferentes tipos o diferentes tamaños, o ambos. Cuando todos estos objetos tienen longitudes fijas (es decir, el tamaño de los elementos siempre será constante independientemente de sus valores reales), la serialización es simplemente una conversión de cada elemento en el tipo compuesto ordenado en cadenas de bytes *little-endian*. Estas cadenas de bytes se unen. El objeto serializado tiene la representación de lista de bytes de los elementos de longitud fija en el mismo orden en que aparecen en el objeto deserializado.

Para los tipos con longitudes variables, los datos reales se reemplazan por un valor de "desplazamiento" (offset) en la posición de ese elemento en el objeto serializado. Los datos reales se agregan a un montículo (heap) al final del objeto serializado. El valor de desplazamiento es el índice para el inicio de los datos reales en el montículo, actuando como un puntero a los bytes relevantes.

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

`serialized` tendría la siguiente estructura (aquí solo rellenado a 4 bits, en realidad rellenado a 32 bits, y manteniendo la representación `int` para mayor claridad):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2  desplazamiento  number 3    valor para
                           para vector                  vector
```

dividido en líneas para mayor claridad:

```
[
  37, 0, 0, 0,  # codificación little-endian de `number1`.
  55, 0, 0, 0,  # codificación little-endian de `number2`.
  16, 0, 0, 0,  # El "desplazamiento" que indica dónde comienza el valor de `vector` (16 en little-endian).
  22, 0, 0, 0,  # codificación little-endian de `number3`.
  1, 2, 3, 4,   # Los valores reales en `vector`.
]
```

Esto sigue siendo una simplificación: los enteros y ceros en los esquemas anteriores en realidad se almacenarían como listas de bytes, de esta manera:

```
[
  10100101000000000000000000000000  # codificación little-endian de `number1`
  10110111000000000000000000000000  # codificación little-endian de `number2`.
  10010000000000000000000000000000  # El "desplazamiento" que indica dónde comienza el valor de `vector` (16 en little-endian).
  10010110000000000000000000000000  # codificación little-endian de `number3`.
  10000001100000101000001110000100   # El valor real del campo `bytes`.
]
```

Por lo tanto, los valores reales para los tipos de longitud variable se almacenan en un montículo al final del objeto serializado con sus desplazamientos almacenados en sus posiciones correctas en la lista ordenada de campos.

También hay algunos casos especiales que requieren un tratamiento específico, como el tipo `BitList` que requiere que se agregue un límite de longitud durante la serialización y se elimine durante la deserialización. Los detalles completos están disponibles en la [especificación de SSZ](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

### Deserialización
Para deserializar este objeto se requiere el <b>esquema</b>. El esquema define la disposición precisa de los datos serializados para que cada elemento específico pueda deserializarse desde un blob de bytes a un objeto significativo donde los elementos tengan el tipo, valor, tamaño y posición correctos. Es el esquema el que indica al deserializador qué valores son valores reales y cuáles son desplazamientos. Todos los nombres de los campos desaparecen cuando se serializa un objeto, pero se vuelven a instanciar durante la deserialización de acuerdo con el esquema.
## Merkleización {#merkleization}

Este objeto serializado SSZ puede luego ser merkleizado, es decir, transformado en una representación de árbol de Merkle de los mismos datos. Primero, se determina el número de fragmentos de 32 bytes en el objeto serializado. Estas son las "hojas" del árbol. El número total de hojas debe ser una potencia de 2 para que al aplicar hashing a las hojas juntas finalmente se produzca una única raíz del árbol hash (hash-tree-root). Si este no es el caso de forma natural, se agregan hojas adicionales que contienen 32 bytes de ceros. Esquemáticamente:

```
raíz del árbol hash
            /     \
           /       \
          /         \
         /           \
   hash de hojas   hash de hojas
      1 y 2           3 y 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 hoja1     hoja2  hoja3     hoja4
```

También hay casos en los que las hojas del árbol no se distribuyen uniformemente de forma natural como lo hacen en el ejemplo anterior. Por ejemplo, la hoja 4 podría ser un contenedor con múltiples elementos que requieren que se agregue "profundidad" adicional al árbol de Merkle, creando un árbol irregular.

En lugar de referirnos a estos elementos del árbol como hoja X, nodo X, etc., podemos darles índices generalizados, comenzando con la raíz = 1 y contando de izquierda a derecha a lo largo de cada nivel. Este es el índice generalizado explicado anteriormente. Cada elemento en la lista serializada tiene un índice generalizado igual a `2**depth + idx` donde idx es su posición indexada en cero en el objeto serializado y la profundidad es el número de niveles en el árbol de Merkle, que se puede determinar como el logaritmo en base dos del número de elementos (hojas).

## Índices generalizados {#generalized-indices}

Un índice generalizado es un número entero que representa un nodo en un árbol de Merkle binario donde cada nodo tiene un índice generalizado `2 ** depth + index in row`.

```
1           --profundidad = 0  2**0 + 0 = 1
    2       3       --profundidad = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --profundidad = 2  2**2 + 0 = 4, 2**2 + 1 = 5...
```

Esta representación produce un índice de nodo para cada fragmento de datos en el árbol de Merkle.

## Multipruebas {#multiproofs}

Proporcionar la lista de índices generalizados que representan un elemento específico nos permite verificarlo contra la raíz del árbol hash. Esta raíz es nuestra versión aceptada de la realidad. Cualquier dato que se nos proporcione puede verificarse contra esa realidad insertándolo en el lugar correcto en el árbol de Merkle (determinado por su índice generalizado) y observando que la raíz permanece constante. Hay funciones en la especificación [aquí](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) que muestran cómo calcular el conjunto mínimo de nodos requeridos para verificar el contenido de un conjunto particular de índices generalizados.

Por ejemplo, para verificar los datos en el índice 9 en el árbol a continuación, necesitamos el hash de los datos en los índices 8, 9, 5, 3, 1.
El hash de (8,9) debería ser igual al hash (4), que se somete a hashing con 5 para producir 2, que se somete a hashing con 3 para producir la raíz del árbol 1. Si se proporcionaran datos incorrectos para 9, la raíz cambiaría: detectaríamos esto y no podríamos verificar la rama.

```
* = datos requeridos para generar la prueba

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15
```

## Más información
- [Upgrading Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Upgrading Ethereum: Merkleización](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementaciones de SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Calculadora de SSZ](https://simpleserialize.com/)
