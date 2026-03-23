---
title: "Structures de données et encodage"
description: "Un aperçu des structures fondamentales de données Ethereum."
lang: fr
sidebarDepth: 2
---

Ethereum crée, stocke et transfère de grands volumes de données. Ces données doivent être formatées de manière standardisée et économe en mémoire pour permettre à quiconque d'[exécuter un nœud](/run-a-node/) sur du matériel grand public relativement modeste. Pour cela, plusieurs structures de données spécifiques sont utilisées sur la pile Ethereum.

## Prérequis {#prerequisites}

Vous devriez comprendre les fondamentaux d'Ethereum et les [logiciels clients](/developers/docs/nodes-and-clients/). Il est recommandé de vous familiariser avec la couche réseau et [le livre blanc d'Ethereum](/whitepaper/).

## Structures de données {#data-structures}

### Arbres de Merkle Patricia {#patricia-merkle-tries}

Les arbres de Merkle Patricia sont des structures qui permettent d'encoder des paires clé-valeur dans un arbre déterministe et authentifié cryptographiquement. Ils sont largement utilisés dans la couche d'exécution d'Ethereum.

[En savoir plus sur les arbres de Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Préfixe de longueur récursive {#recursive-length-prefix}

Le préfixe de longueur récursive (RLP) est une méthode de sérialisation largement utilisée à travers la couche d'exécution d'Ethereum.

[En savoir plus sur RLP](/developers/docs/data-structures-and-encoding/rlp)

### Sérialisation simple {#simple-serialize}

La sérialisation simple (Simple Serialize, ou SSZ) est le format de sérialisation dominant sur la couche de consensus d'Ethereum en raison de sa compatibilité avec la merklelization.

[En savoir plus sur SSZ](/developers/docs/data-structures-and-encoding/ssz)
