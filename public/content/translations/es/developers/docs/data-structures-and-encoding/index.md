---
title: "Estructuras de datos y codificación"
description: "Visión general de las estructuras de datos fundamentales de Ethereum."
lang: es
sidebarDepth: 2
---

Ethereum crea, almacena y transfiere grandes cantidades de datos. Estos datos deben formatearse de manera estandarizada y eficiente en cuanto a la memoria para permitir que cualquiera [ejecute un nodo](/run-a-node/) en un hardware de consumo relativamente modesto. Para lograrlo, se utilizan varias estructuras de datos específicas en la pila de Ethereum.

## Requisitos previos {#prerequisites}

Debe comprender los fundamentos de Ethereum y el [software de cliente](/developers/docs/nodes-and-clients/). Se recomienda estar familiarizado con la capa de red y [el informe técnico de Ethereum](/whitepaper/).

## Estructuras de datos {#data-structures}

### Tries de Patricia Merkle {#patricia-merkle-tries}

Los Patricia Merkle Tries son estructuras que codifican pares clave-valor en un trie determinista y criptográficamente autenticado. Estos se utilizan en toda la capa de ejecución de Ethereum.

[Más sobre los tries de Patricia Merkle](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Prefijo de longitud recursiva {#recursive-length-prefix}

El prefijo de longitud recursiva (RLP) es un método de serialización que se utiliza extensivamente en toda la capa de ejecución de Ethereum.

[Más sobre RLP](/developers/docs/data-structures-and-encoding/rlp)

### Serialización simple {#simple-serialize}

Simple Serialize (SSZ) es el formato de serialización dominante en la capa de consenso de Ethereum debido a su compatibilidad con la merklelización (merklelization).

[Más sobre SSZ](/developers/docs/data-structures-and-encoding/ssz)
