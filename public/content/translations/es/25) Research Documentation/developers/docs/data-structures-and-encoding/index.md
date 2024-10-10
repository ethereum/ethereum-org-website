---
title: Estructura de datos y codificación
description: Visión general de las estructuras de datos fundamentales de Ethereum.
lang: es
sidebarDepth: 2
---

Ethereum crea, almacena y transfiere grandes cantidades de datos. Estos datos deben ser formateados de forma estandarizada y eficiente en el uso de memoria para permitir a cualquiera [ejecutar un nodo](/run-a-node/) en hardware relativamente modesto para consumidores. Para lograrlo, se utilizan varias estructuras de datos específicas en la pila de Ethereum.

## Pre requisitos: {#prerequisites}

Es aconsejable entender los fundamentos de Ethereum y de [software cliente](/developers/docs/nodes-and-clients/). También es recomendable estar familiarizado con la capa de red y el [Informe sobre Ethereum](/whitepaper/).

## Estructura de datos {#data-structures}

### Patricia Merkle tries {#patricia-merkle-tries}

Los Patricia Merkle Tries son estructuras que codifican pares clave-valor en un trie determinista y criptográficamente autenticado. Estos se utilizan en toda la capa de ejecución de Ethereum.

[Más información sobre los Patricia Merkle Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Prefijo de longitud recursiva {#recursive-length-prefix}

El prefijo de longitud recursiva (RLP) es un método de serialización que se utiliza extensivamente en toda la capa de ejecución de Ethereum.

[Más información sobre el RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) es el formato de serialización dominante en la capa de consenso de Ethereum debido a su compatibilidad con la merklelización (merklelization).

[Más información sobre SSZ](/developers/docs/data-structures-and-encoding/ssz)
