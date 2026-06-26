---
title: Simple serialize
description: Explication du format SSZ d'Ethereum.
lang: fr
sidebarDepth: 2
---

**Simple serialize (SSZ)** est la méthode de sérialisation utilisée sur la chaîne balise. Elle remplace la sérialisation RLP utilisée sur la couche d'exécution partout à travers la couche de consensus, à l'exception du protocole de découverte des pairs. Pour en savoir plus sur la sérialisation RLP, consultez [Préfixe de longueur récursive (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ est conçu pour être déterministe et également pour se merkleiser efficacement. On peut considérer que SSZ comporte deux composants : un schéma de sérialisation et un schéma de merkleisation conçu pour fonctionner efficacement avec la structure de données sérialisée.

## Comment fonctionne SSZ ? {#how-does-ssz-work}

### Sérialisation {#serialization}

SSZ est un schéma de sérialisation qui n'est pas auto-descriptif ; il s'appuie plutôt sur un schéma qui doit être connu à l'avance. L'objectif de la sérialisation SSZ est de représenter des objets d'une complexité arbitraire sous forme de chaînes d'octets. C'est un processus très simple pour les « types de base ». L'élément est simplement converti en octets hexadécimaux. Les types de base incluent :

- les entiers non signés
- les booléens

Pour les types « composites » complexes, la sérialisation est plus compliquée car le type composite contient plusieurs éléments qui peuvent avoir des types différents, des tailles différentes, ou les deux. Lorsque ces objets ont tous des longueurs fixes (c'est-à-dire que la taille des éléments sera toujours constante, quelles que soient leurs valeurs réelles), la sérialisation est simplement une conversion de chaque élément du type composite ordonné en chaînes d'octets little-endian. Ces chaînes d'octets sont jointes ensemble. L'objet sérialisé possède la représentation en liste d'octets des éléments de longueur fixe dans le même ordre que celui dans lequel ils apparaissent dans l'objet désérialisé.

Pour les types à longueur variable, les données réelles sont remplacées par une valeur de « décalage » (offset) à la position de cet élément dans l'objet sérialisé. Les données réelles sont ajoutées à un tas (heap) à la fin de l'objet sérialisé. La valeur de décalage est l'indice du début des données réelles dans le tas, agissant comme un pointeur vers les octets correspondants.

L'exemple ci-dessous illustre comment le décalage fonctionne pour un conteneur avec des éléments de longueur fixe et variable :

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

`serialized` aurait la structure suivante (seulement complétée à 4 bits ici, complétée à 32 bits en réalité, et en gardant la représentation `int` pour plus de clarté) :

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2   décalage pour  number 3   valeur pour
                             le vecteur               le vecteur
```

divisé sur plusieurs lignes pour plus de clarté :

```
[
  37, 0, 0, 0,  # encodage little-endian de `number1`.
  55, 0, 0, 0,  # encodage little-endian de `number2`.
  16, 0, 0, 0,  # Le « décalage » qui indique où commence la valeur de `vector` (16 en little-endian).
  22, 0, 0, 0,  # encodage little-endian de `number3`.
  1, 2, 3, 4,   # Les valeurs réelles dans `vector`.
]
```

Ceci reste une simplification : les entiers et les zéros dans les schémas ci-dessus seraient en réalité stockés sous forme de listes d'octets, comme ceci :

```
[
  10100101000000000000000000000000  # encodage little-endian de `number1`
  10110111000000000000000000000000  # encodage little-endian de `number2`.
  10010000000000000000000000000000  # Le « décalage » qui indique où commence la valeur de `vector` (16 en little-endian).
  10010110000000000000000000000000  # encodage little-endian de `number3`.
  10000001100000101000001110000100   # La valeur réelle du champ `bytes`.
]
```

Ainsi, les valeurs réelles pour les types à longueur variable sont stockées dans un tas à la fin de l'objet sérialisé, avec leurs décalages stockés à leurs positions correctes dans la liste ordonnée des champs.

Il existe également des cas particuliers qui nécessitent un traitement spécifique, comme le type `BitList` qui nécessite l'ajout d'une limite de longueur lors de la sérialisation et sa suppression lors de la désérialisation. Tous les détails sont disponibles dans les [spécifications SSZ](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

### Désérialisation {#deserialization}

Désérialiser cet objet nécessite le <b>schéma</b>. Le schéma définit la disposition précise des données sérialisées afin que chaque élément spécifique puisse être désérialisé à partir d'un blob d'octets en un objet significatif dont les éléments ont le bon type, la bonne valeur, la bonne taille et la bonne position. C'est le schéma qui indique au désérialiseur quelles valeurs sont des valeurs réelles et lesquelles sont des décalages. Tous les noms de champs disparaissent lorsqu'un objet est sérialisé, mais sont réinstanciés lors de la désérialisation conformément au schéma.

Consultez [ssz.dev](https://www.ssz.dev/overview) pour une explication interactive à ce sujet.

## Merkleisation {#merkleization}

Cet objet sérialisé SSZ peut ensuite être merkleisé, c'est-à-dire transformé en une représentation en arbre de Merkle de ces mêmes données. Tout d'abord, le nombre de morceaux de 32 octets dans l'objet sérialisé est déterminé. Ce sont les « feuilles » de l'arbre. Le nombre total de feuilles doit être une puissance de 2 afin que le hachage conjoint des feuilles produise finalement une seule racine d'arbre de hachage (hash-tree-root). Si ce n'est pas naturellement le cas, des feuilles supplémentaires contenant 32 octets de zéros sont ajoutées. Sous forme de diagramme :

```
racine de l'arbre de hachage
            /          \
           /            \
          /              \
         /                \
hash des feuilles   hash des feuilles
     1 et 2               3 et 4
      /   \                /  \
     /     \              /    \
    /       \            /      \
feuille1  feuille2   feuille3  feuille4
```

Il y a aussi des cas où les feuilles de l'arbre ne se répartissent pas naturellement de manière uniforme comme dans l'exemple ci-dessus. Par exemple, la feuille 4 pourrait être un conteneur avec plusieurs éléments nécessitant l'ajout d'une « profondeur » supplémentaire à l'arbre de Merkle, créant ainsi un arbre asymétrique.

Au lieu de désigner ces éléments de l'arbre par feuille X, nœud X, etc., nous pouvons leur attribuer des indices généralisés, en commençant par la racine = 1 et en comptant de gauche à droite à chaque niveau. C'est l'indice généralisé expliqué ci-dessus. Chaque élément de la liste sérialisée a un indice généralisé égal à `2**depth + idx` où idx est sa position indexée à zéro dans l'objet sérialisé et la profondeur (depth) est le nombre de niveaux dans l'arbre de Merkle, qui peut être déterminé comme le logarithme en base deux du nombre d'éléments (feuilles).

## Indices généralisés {#generalized-indices}

Un indice généralisé est un entier qui représente un nœud dans un arbre de Merkle binaire où chaque nœud a un indice généralisé `2 ** depth + index in row`.

```
1           --profondeur = 0  2**0 + 0 = 1
    2       3       --profondeur = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --profondeur = 2  2**2 + 0 = 4, 2**2 + 1 = 5...
```

Cette représentation fournit un indice de nœud pour chaque donnée dans l'arbre de Merkle.

## Preuves multiples (Multiproofs) {#multiproofs}

Fournir la liste des indices généralisés représentant un élément spécifique nous permet de le vérifier par rapport à la racine de l'arbre de hachage (hash-tree-root). Cette racine est notre version acceptée de la réalité. Toute donnée qui nous est fournie peut être vérifiée par rapport à cette réalité en l'insérant au bon endroit dans l'arbre de Merkle (déterminé par son indice généralisé) et en observant que la racine reste constante. Il existe des fonctions dans les spécifications [ici](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) qui montrent comment calculer l'ensemble minimal de nœuds requis pour vérifier le contenu d'un ensemble particulier d'indices généralisés.

Par exemple, pour vérifier les données à l'indice 9 dans l'arbre ci-dessous, nous avons besoin du hash des données aux indices 8, 9, 5, 3, 1.
Le hash de (8,9) doit être égal au hash (4), qui est haché avec 5 pour produire 2, qui est haché avec 3 pour produire la racine de l'arbre 1. Si des données incorrectes étaient fournies pour 9, la racine changerait ; nous le détecterions et la vérification de la branche échouerait.

```
* = données requises pour générer la preuve

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15
```

## Complément d'information {#further-reading}

- [Mise à niveau d'Ethereum : SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Mise à niveau d'Ethereum : Merkleisation](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implémentations SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Calculateur SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)