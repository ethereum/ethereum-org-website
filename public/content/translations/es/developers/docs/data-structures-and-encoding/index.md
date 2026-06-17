---
title: "Estructuras de datos y codificación"
description: "Una descripción general de las estructuras de datos fundamentales de Ethereum."
lang: es
sidebarDepth: 2
---

Ethereum crea, almacena y transfiere grandes volúmenes de datos. Estos datos deben formatearse de manera estandarizada y eficiente en cuanto a memoria para permitir que cualquier persona pueda [ejecutar un nodo](/run-a-node/) en hardware de consumo relativamente modesto. Para lograr esto, se utilizan varias estructuras de datos específicas en la pila de Ethereum.

## Requisitos previos {#prerequisites}

Debería comprender los fundamentos de Ethereum y del [software de cliente](/developers/docs/nodes-and-clients/). Se recomienda estar familiarizado con la capa de red y con [el documento técnico de Ethereum](/whitepaper/).

## Estructuras de datos {#data-structures}

### Tries de Merkle Patricia {#patricia-merkle-tries}

Los tries de Merkle Patricia son estructuras que codifican pares clave-valor en un trie determinista y autenticado criptográficamente. Estos se utilizan ampliamente en toda la capa de ejecución de Ethereum.

[Más sobre los tries de Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Prefijo de longitud recursiva {#recursive-length-prefix}

El prefijo de longitud recursiva (RLP) es un método de serialización utilizado ampliamente en toda la capa de ejecución de Ethereum.

[Más sobre RLP](/developers/docs/data-structures-and-encoding/rlp)

### Serialización simple {#simple-serialize}

La serialización simple (SSZ) es el formato de serialización dominante en la capa de consenso de Ethereum debido a su compatibilidad con la merkleización.

[Más sobre SSZ](/developers/docs/data-structures-and-encoding/ssz)