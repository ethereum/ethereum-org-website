---
title: Simple serialize
description: Explication du format SSZ d'Ethereum.
lang: fr
sidebarDepth: 2
---

**Simple serialize (SSZ)** est la méthode de sérialisation utilisée sur la chaîne phare. Elle remplace la sérialisation RLP utilisée sur la couche d'exécution dans toute la couche de consensus, à l'exception du protocole de découverte des pairs. SSZ est conçu pour être déterministe et pour effectuer un Merkleize efficace. On peut imaginer SSZ comme ayant deux composantes : un système de sérialisation et un système de Merkleization conçu pour fonctionner efficacement avec la structure de données sérialisées.

## Comment fonctionne SSZ ? {#how-does-ssz-work}

### La sérialisation {#serialization}

SSZ est un schéma de sérialisation qui n'est pas auto-décrit, mais qui repose sur un schéma qui doit être connu à l'avance. L'objectif de la sérialisation SSZ est de représenter des objets d'une complexité arbitraire sous forme de chaînes d'octets. Il s'agit d'un processus très simple pour les "types de base". L'élément est simplement converti en octets hexadécimaux. Les types de base comprennent :

- Les entiers non signés
- Les booléens

Pour les types "composites" complexes, la sérialisation est plus compliquée car le type composite contient plusieurs éléments, ces derniers étant susceptibles d'avoir des types différents ou des tailles différentes, ou les deux. Lorsque ces objets ont tous une longueur fixe (c'est-à-dire que la taille des éléments sera toujours constante, quelles que soient leurs valeurs réelles), la sérialisation est simplement une conversion de chaque élément du type composite ordonné en bytestrings little-endian. Ces bytestrings sont liés entre eux. L'objet sérialisé contient la représentation bytelist des éléments de longueur fixe dans le même ordre que celui dans lequel ils apparaissent dans l'objet désérialisé.

Pour les types de longueur variable, les données réelles sont remplacées par une valeur "offset" (de décalage) dans la position de cet élément dans l'objet sérialisé. Les données réelles sont ajoutées à un amas à la fin de l'objet sérialisé. La valeur de décalage est l'indice du début des données réelles dans l'amas, agissant comme un pointeur vers les octets concernés.

L'exemple ci-dessous illustre comment le décalage fonctionne pour un conteneur comportant des éléments de longueur fixe et variable :

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

`serialized` aurait la structure suivante (ici, elle n'est paddée que sur 4 bits, alors qu'elle est paddée sur 32 bits dans la réalité, et en gardant la représentation `int` pour plus de clarté) :

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset for    number 3    value for
                              vector                   vector

```

divisé sur différentes lignes pour plus de clarté :

```
[
  37, 0, 0, 0,  # little-endian encoding of `number1`.
  55, 0, 0, 0,  # little-endian encoding of `number2`.
  16, 0, 0, 0,  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  22, 0, 0, 0,  # little-endian encoding of `number3`.
  1, 2, 3, 4,   # The actual values in `vector`.
]
```

Il s'agit encore d'une simplification - les nombres entiers et les zéros présents dans les schémas ci-dessus seraient en fait stockés dans des bytelists, comme ceci :

```
[
  10100101000000000000000000000000  # little-endian encoding of `number1`
  10110111000000000000000000000000  # little-endian encoding of `number2`.
  10010000000000000000000000000000  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  10010110000000000000000000000000  # little-endian encoding of `number3`.
  10000001100000101000001110000100   # The actual value of the `bytes` field.
]
```

Ainsi, les valeurs réelles des types à longueur variable sont stockées dans un amas à la fin de l'objet sérialisé, et leurs décalages stockés dans leurs positions correctes dans la liste ordonnée des champs.

Il existe également des cas particuliers qui nécessitent un traitement spécifique, comme le type `BitList` qui nécessite l'ajout d'un plafond de longueur pendant la sérialisation et son retrait pendant la désérialisation. Tous les détails sont disponibles dans le [specSSZ](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md).

### La désérialisation {#deserialization}

La désérialisation de cet objet nécessite le <b>schéma</b>. Le schéma définit la disposition précise des données sérialisées afin que chaque élément spécifique puisse être désérialisé à partir d'un blob d'octets en un objet significatif dont les éléments ont le type, la valeur, la taille et la position appropriés. Ce schéma indique au désérialiseur quelles sont les valeurs réelles et quelles sont les valeurs décalées. Tous les noms de champs disparaissent lorsqu'un objet est sérialisé, mais sont réintégrés lors de la désérialisation selon le schéma.

Voir [ssz.dev](https://www.ssz.dev/overview) pour une explication interactive à ce sujet.

## La Merkleisation {#merkleization}

Cet objet sérialisé SSZ peut ensuite être merkléisé, c'est-à-dire transformé en une représentation en arbre de Merkle des mêmes données. Pour commencer, on détermine le nombre de morceaux de 32 octets dans l'objet sérialisé. Ce sont les "feuilles" de l'arbre. Le nombre total de feuilles doit être une puissance de 2 pour que le hachage des feuilles produise finalement une racine unique de l'arbre de hachage. Si ce n'est pas naturellement le cas, des feuilles supplémentaires contenant 32 octets de zéros sont ajoutées. De manière schématique :

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

Il existe également des cas où les feuilles de l'arbre ne se répartissent pas naturellement de manière égale comme dans l'exemple ci-dessus. Par exemple, la feuille 4 pourrait être un conteneur avec plusieurs éléments qui nécessitent une "profondeur" supplémentaire à ajouter à l'arbre de Merkle, créant ainsi un arbre inégal.

Au lieu de nous référer à ces éléments de l'arbre comme feuille X, nœud X, etc., nous pouvons leur donner des indices généralisés, en commençant par la racine = 1 et en comptant de gauche à droite sur chaque niveau. Il s'agit de l'indice généralisé expliqué ci-dessus. Chaque élément de la liste sérialisée a un index généralisé égal à `2**depth + idx` où idx est sa position indexée zéro dans l'objet sérialisé et la profondeur est le nombre de niveaux dans l'arbre de Merkle, qui peut être déterminé comme la racine carrée du nombre d'éléments (feuilles).

## Indices généralisés {#generalized-indices}

Un indice généralisé est un nombre entier qui représente un nœud dans un arbre de Merkle binaire où chaque nœud a un index généralisé `2 ** profondeur + index dans la rangée`.

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Cette représentation permet d'obtenir un indice de nœud pour chaque donnée de l'arbre de Merkle.

## Preuves multiples {#multiproofs}

Fournir la liste des indices généralisés représentant un élément spécifique nous permet de le vérifier par rapport à la racine de l'arbre de hachage. Cette racine est notre version acceptée de la réalité. Toute donnée qui nous est fournie peut être vérifiée par rapport à cette réalité en l'insérant au bon endroit dans l'arbre de Merkle (déterminé par son index généralisé) et en observant que la racine reste constante. La spécification contient [ici](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) des fonctions qui montrent comment calculer l'ensemble minimal de nœuds requis pour vérifier le contenu d'un ensemble particulier d'indices généralisés.

Par exemple, pour vérifier les données de l'indice 9 dans l'arbre ci-dessous, nous avons besoin du hachage des données aux indices 8, 9, 5, 3, 1. Le hachage de (8,9) devrait être égal au hachage (4), qui est haché avec 5 pour produire 2, qui est haché avec 3 pour produire la racine de l'arbre 1. Si des données incorrectes étaient fournies pour 9, la racine changerait - nous le détecterions et échouerions à vérifier la branche.

```
* = data required to generate proof

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Complément d'information {#further-reading}

- [Mise à jour Ethereum : SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Mise à jour Ethereum : Merkleisation](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implémentations SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Calculeur SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
