---
title: Structures de données et encodage
description: Un aperçu des structures de données fondamentales d'Ethereum.
lang: fr
sidebarDepth: 2
---

Ethereum crée, stocke et transfère de grands volumes de données. Ces données doivent être formatées de manière standardisée et économe en mémoire pour permettre à quiconque d'[exécuter un nœud](/run-a-node/) sur du matériel grand public relativement modeste. Pour y parvenir, plusieurs structures de données spécifiques sont utilisées sur la pile Ethereum.

## Prérequis {#prerequisites}

Vous devriez comprendre les principes fondamentaux d'Ethereum et des [logiciels clients](/developers/docs/nodes-and-clients/). Une familiarité avec la couche réseau et [le livre blanc d'Ethereum](/whitepaper/) est recommandée.

## Structures de données {#data-structures}

### Tries de Merkle Patricia {#patricia-merkle-tries}

Les tries de Merkle Patricia sont des structures qui encodent des paires clé-valeur dans un trie déterministe et authentifié cryptographiquement. Ils sont largement utilisés dans toute la couche d'exécution d'Ethereum.

[En savoir plus sur les tries de Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Le Recursive Length Prefix (RLP) est une méthode de sérialisation largement utilisée dans toute la couche d'exécution d'Ethereum.

[En savoir plus sur le RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) est le format de sérialisation dominant sur la couche de consensus d'Ethereum en raison de sa compatibilité avec la merklisation.

[En savoir plus sur SSZ](/developers/docs/data-structures-and-encoding/ssz)