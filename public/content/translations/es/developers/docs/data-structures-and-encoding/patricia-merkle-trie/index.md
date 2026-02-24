---
title: Merkle Patricia Trie
description: "Introducción a Merkle Patricia Trie."
lang: es
sidebarDepth: 2
---

El estado del Ethereum (el total de todas las cuentas, saldos y contratos inteligentes) está codificado en una versión especial de la estructura de datos, conocida conmúnmente en informática como el árbol de Merkle. Esta estructura es útil para muchas aplicaciones en criptografía porque crea una relación verificable entre todas las piezas individuales de datos entrelazadas en el árbol, lo que da como resultado un único valor de **raíz** que puede utilizarse para probar cosas sobre los datos.

La estructura de datos de Ethereum es un 'trie de Merkle-Patricia modificado', llamado así porque toma prestadas algunas características de PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric) y porque está diseñada para la recuperación eficiente de datos de los elementos que componen el estado de Ethereum.

Un trie de Merkle-Patricia es determinista y criptográficamente verificable: la única manera de generar una raíz de estado es calculándola a partir de cada pieza individual del estado, y dos estados que son idénticos se pueden probar fácilmente comparando el hash raíz y los hashes que lo llevaron a él (_una prueba de Merkle_). Por el contrario, no hay forma de crear dos estados diferentes con el mismo hash raíz, y cualquier intento de modificar el estado con diferentes valores dará como resultado un hash raíz de estado diferente. En teoría, esta estructura proporciona el 'santo grial' de la eficiencia `O(log(n))` para inserciones, búsquedas y eliminaciones.

En un futuro próximo, Ethereum planea migrar a una estructura de [árbol de Verkle](/roadmap/verkle-trees), lo que abrirá muchas posibilidades nuevas para futuras mejoras del protocolo.

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, sería útil tener conocimientos básicos de [hashes](https://en.wikipedia.org/wiki/Hash_function), [árboles de Merkle](https://en.wikipedia.org/wiki/Merkle_tree), [tries](https://en.wikipedia.org/wiki/Trie) y [serialización](https://en.wikipedia.org/wiki/Serialization). Este artículo comienza con una descripción de un [árbol de radix](https://en.wikipedia.org/wiki/Radix_tree) básico y, a continuación, introduce gradualmente las modificaciones necesarias para la estructura de datos más optimizada de Ethereum.

## Tries de radix básicos {#basic-radix-tries}

En un radix trie básico, cada nodo tiene el siguiente aspecto:

```
    [i_0, i_1 ... i_n, value]
```

Donde `i_0 ...` `i_n` representa los símbolos del alfabeto (a menudo binario o hexadecimal), `value` es el valor terminal en el nodo, y los valores en `i_0, i_1 ...` las ranuras `i_n` son `NULL` o punteros a (en nuestro caso, hashes de) otros nodos. Esto forma un almacén básico de `(clave, valor)`.

Digamos que quiere usar una estructura de datos de radix tree para mantener un orden sobre un conjunto de pares clave-valor. Para encontrar el valor actualmente asignado a la clave `dog` en el trie, primero convertiría `dog` en letras del alfabeto (lo que da `64 6f 67`) y luego descendería por el trie siguiendo esa ruta hasta encontrar el valor. Es decir, comienza buscando el hash raíz en una base de datos de clave/valor plana para encontrar el nodo raíz del trie. Se representa como una matriz de claves que apuntan a otros nodos. Usaría el valor en el índice `6` como clave y lo buscaría en la base de datos plana de clave/valor para obtener el nodo un nivel más abajo. Luego elegiría el índice `4` para buscar el siguiente valor, luego el índice `6`, y así sucesivamente, hasta que, una vez que haya seguido la ruta: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, buscaría el valor del nodo y devolvería el resultado.

Hay una diferencia entre buscar algo en el "trie" y en la base de datos clave/valor plana subyacente. Ambos definen arreglos de clave/valor, pero la base de datos subyacente puede hacer una búsqueda tradicional de 1 paso de una clave. La búsqueda de una clave en el trie requiere múltiples búsquedas en la base de datos subyacentes para llegar al valor final descrito anteriormente. Nos referiremos a esto último como una `ruta` para eliminar la ambigüedad.

Las operaciones de actualización y eliminación para los radix tries se pueden definir de la siguiente manera:

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

Un "Merkle" Radix tree se construye vinculando nodos utilizando digests de hashes criptográficos generados de forma determinista. Este direccionamiento de contenido (en la base de datos de clave/valor `key == keccak256(rlp(value))`) proporciona una garantía de integridad criptográfica de los datos almacenados. Si el hash raíz de un trie dado es conocido públicamente, entonces cualquier persona con acceso a los datos de las hojas subyacentes puede construir una prueba de que el trie incluye un valor dado en una ruta específica proporcionando los hashes de cada nodo que une un valor específico a la raíz del árbol.

Es imposible que un atacante proporcione una prueba de un par `(ruta, valor)` que no existe, ya que el hash raíz se basa en última instancia en todos los hashes que están por debajo de él. Cualquier modificación subyacente cambiaría el hash raíz. Puede pensar en el hash como una representación comprimida de la información estructural sobre los datos, asegurada por la protección previa a la imagen de la función de hashing.

Nos referiremos a una unidad atómica de un árbol de radix (p. ej., un único carácter hexadecimal o un número binario de 4 bits) como un "nibble". Al recorrer una ruta de un nibble a la vez, como se describió anteriormente, los nodos pueden hacer referencia a un máximo de 16 hijos, pero incluyen un elemento de `valor`. Por lo tanto, los representamos como una matriz de longitud 17. Llamamos a estas matrices de 17 elementos "nodos de rama".

## Trie de Merkle Patricia {#merkle-patricia-trees}

Los radix tries tienen una limitación importante: son ineficientes. Si desea almacenar un enlace `(ruta, valor)` donde la ruta, como en Ethereum, tiene 64 caracteres de largo (el número de nibbles en `bytes32`), necesitaremos más de un kilobyte de espacio adicional para almacenar un nivel por carácter, y cada búsqueda o eliminación tomará los 64 pasos completos. El Patricia trie presentado a continuación resuelve este problema.

### Optimización {#optimization}

Un nodo en un Merkle Patricia trie es uno de los siguientes:

1. `NULL` (representado como la cadena vacía)
2. `rama` Un nodo de 17 elementos `[ v0 ...` `v15, vt ]`
3. `hoja` Un nodo de 2 elementos `[ encodedPath, value ]`
4. `extensión` Un nodo de 2 elementos `[ encodedPath, key ]`

Con rutas de 64 caracteres, es inevitable que después de atravesar las primeras capas del trie, llegue a un nodo donde no exista un camino divergente durante al menos una parte del camino hacia abajo. Para evitar tener que crear hasta 15 nodos `NULL` dispersos a lo largo de la ruta, acortamos el descenso configurando un nodo de `extensión` con la forma `[ encodedPath, clave ]`, donde `encodedPath` contiene la "ruta parcial" para saltar (utilizando una codificación compacta que se describe a continuación), y la `clave` es para la siguiente búsqueda en la base de datos.

Para un nodo `hoja`, que se puede marcar con una bandera en el primer nibble de `encodedPath`, la ruta codifica todos los fragmentos de ruta del nodo anterior y podemos buscar el `valor` directamente.

Sin embargo, esta optimización anterior introduce ambigüedad.

Al atravesar rutas en nibbles, podemos terminar con un número impar de nibbles a recorrer, pero debido a que todos los datos se almacenan en formato de `bytes`. No es posible diferenciar entre, por ejemplo, el nibble `1` y los nibbles `01` (ambos deben almacenarse como `<01>`). Para especificar una longitud impar, la ruta parcial adquiere como prefijo un indicador o "bandera".

### Especificación: codificación compacta de secuencia hexadecimal con terminador opcional {#specification}

El marcado de la _longitud de la ruta parcial restante par o impar_ y del _nodo hoja o de extensión_, como se describe anteriormente, reside en el primer nibble de la ruta parcial de cualquier nodo de 2 elementos. Resultan en lo siguiente:

| hex char | bits | tipo de nodo parcial                  | longitud de la ruta |
| -------- | ---- | ------------------------------------- | ------------------- |
| 0        | 0000 | extensión                             | par                 |
| 1        | 0001 | extensión                             | impar               |
| 2        | 0010 | terminación (hoja) | par                 |
| 3        | 0011 | terminación (hoja) | impar               |

Para una longitud de ruta restante par (`0` o `2`), siempre le seguirá otro nibble de "relleno" `0`.

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarray ahora tiene una longitud par cuyo primer nibble son las banderas.
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

Ejemplos:

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Aquí está el código extendido para obtener un nodo en el Merkle Patricia trie:

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### Ejemplo de trie {#example-trie}

Supongamos que queremos un trie que contenga cuatro pares de ruta/valor: `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Primero, convertimos las rutas y los valores a `bytes`. A continuación, las representaciones de bytes reales para las _rutas_ se indican con `<>`, aunque los _valores_ se siguen mostrando como cadenas, indicadas con `''`, para facilitar la comprensión (también serían realmente `bytes`):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Ahora, construimos un trie con los siguientes pares clave/valor en la base de datos subyacente:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Cuando un nodo hace referencia a otro, lo que se incluye es `keccak256(rlp.encode(node))` si `len(rlp.encode(node)) >= 32`, o el propio `node` en caso contrario, donde `rlp.encode` es la función de codificación [RLP](/developers/docs/data-structures-and-encoding/rlp).

Tenga en cuenta que al actualizar un trie, es necesario almacenar el par clave/valor `(keccak256(x), x)` en una tabla de búsqueda persistente _si_ el nodo recién creado tiene una longitud >= 32. Sin embargo, si el nodo es más corto, no es necesario almacenar nada, ya que la función f(x) = x es reversible.

## Tries en Ethereum {#tries-in-ethereum}

Todos los merkle tries en la capa de ejecución de Ethereum utilizan un Merkle Patricia Trie.

Desde un encabezado de bloque hay 3 raíces de 3 de estos tries.

1. stateRoot
2. transactionsRoot
3. receiptsRoot

### Trie de estado {#state-trie}

Hay un trie de estado global, y se actualiza cada vez que un cliente procesa un bloque. En él, una `ruta` es siempre: `keccak256(ethereumAddress)` y un `valor` es siempre: `rlp(ethereumAccount)`. Más específicamente, una `cuenta` de Ethereum es un array de 4 elementos: `[nonce,balance,storageRoot,codeHash]`. En este punto, cabe señalar que este `storageRoot` es la raíz de otro trie de Patricia:

### Trie de almacenamiento {#storage-trie}

El trie de almacenamiento es donde residen _todos_ los datos del contrato. Hay un trie de almacenamiento separado para cada cuenta. Para recuperar valores en posiciones de almacenamiento específicas en una dirección determinada, se requieren la dirección de almacenamiento, la posición entera de los datos almacenados en el almacenamiento y el ID del bloque. Estos pueden pasarse como argumentos a `eth_getStorageAt` definido en la API de JSON-RPC, p. ej., para recuperar los datos en la ranura de almacenamiento 0 para la dirección `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Recuperar otros elementos en el almacenamiento es un poco más complicado porque primero se debe calcular la posición en el trie de almacenamiento. La posición se calcula como el hash `keccak256` de la dirección y la posición de almacenamiento, ambas rellenadas a la izquierda con ceros hasta una longitud de 32 bytes. Por ejemplo, la posición para los datos en la ranura de almacenamiento 1 para la dirección `0x391694e7e0b0cce554cb130d723a9d27458f9298` es:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

En una consola de Geth, esto se puede calcular de la siguiente manera:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Por lo tanto, la `ruta` es `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Esto ahora se puede utilizar para recuperar los datos del trie de almacenamiento como antes:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Nota: el `storageRoot` de una cuenta de Ethereum está vacío de forma predeterminada si no es una cuenta de contrato.

### Trie de transacciones {#transaction-trie}

Hay un trie de transacciones separado para cada bloque, que de nuevo almacena pares `(clave, valor)`. Una ruta aquí es: `rlp(transactionIndex)` que representa la clave que corresponde a un valor determinado por:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Puede encontrar más información sobre esto en la documentación de [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie de recibos {#receipts-trie}

Cada bloque tiene su propio trie de recibos. Una `ruta` aquí es: `rlp(transactionIndex)`. `transactionIndex` es su índice dentro del bloque en el que se incluyó. El trie de recibos nunca se actualiza. Al igual que en el trie de transacciones, hay recibos actuales y heredados. Para consultar un recibo específico en el trie de recibos, se requiere el índice de la transacción en su bloque, la carga útil del recibo y el tipo de transacción. El recibo devuelto puede ser de tipo `Receipt`, que se define como la concatenación de `TransactionType` y `ReceiptPayload`, o puede ser de tipo `LegacyReceipt`, que se define como `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Puede encontrar más información sobre esto en la documentación de [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Lecturas recomendadas {#further-reading}

- [Trie de Merkle Patricia modificado: cómo Ethereum guarda un estado](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling en Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Comprender el trie de Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
