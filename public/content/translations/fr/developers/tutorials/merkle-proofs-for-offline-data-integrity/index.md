---
title: Preuves de Merkle relatives à l'intégrité des données hors ligne
description: Assurer l'intégrité des données en chaîne pour les données stockées, principalement, hors chaîne
author: Ori Pomerantz
tags:
  - "stockage"
skill: advanced
lang: fr
published: 2021-12-30
---

## Introduction {#introduction}

Idéalement, nous souhaiterions tout conserver dans le stockage Ethereum, qui est lui-même stocké sur des milliers d'ordinateurs et bénéficie ainsi d'une disponibilité extrêmement élevée (les données ne peuvent pas être censurées) et d'une grande intégrité (les données ne peuvent pas être modifiées de manière non autorisée) sachant, cependant, que stocker un mot de 32 octets coûte normalement 20 000 gaz. Ce que je vais écrire ici aurait un coût équivalent à 6,60 $. À 21 cents par octet, c'est trop cher pour beaucoup d'utilisations.

Pour résoudre ce problème, l'écosystème Ethereum a développé [de nombreuses façons alternatives de stocker des données d'une manière décentralisée](/developers/docs/storage/). Habituellement, elles impliquent un compromis entre disponibilité et prix. Toutefois, l’intégrité est généralement assurée.

Dans cet article, vous apprendrez **comment** assurer l'intégrité des données sans avoir à les stocker sur la blockchain, en utilisant [les preuves de Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Comment ça marche ? {#how-does-it-work}

En théorie, nous pourrions simplement stocker le hachage des données de la chaîne et envoyer toutes les données dans les transactions qui en ont besoin. Cependant, cela reste encore trop cher. Un octet de données lors d'une transaction a un coût d'environ 16 gaz, soit environ un demi-cent actuellement ou environ 5 $ par kilo-octets. À 5 000 $ le mégaoctet, c'est encore trop cher pour de nombreuses utilisations même sans le coût supplémentaire de hachage des données.

La solution est de hacher de façon répétée différents sous-ensembles de données. Pour les données que vous n'avez pas besoin d'envoyer, vous pouvez ainsi juste envoyer un hachage. Vous pouvez le faire en utilisant un arbre de Merkle, une structure de données en arborescence où chaque nœud est un hachage des nœuds en dessous :

![Arbre de Merkle](tree.png)

Le hachage racine est la seule partie qui doit être stockée dans la chaîne. Pour prouver une certaine valeur, vous fournissez tous les hachages qui doivent être combinés avec elle pour obtenir la racine. Par exemple, pour prouver `C` vous fournissez `D`, `H(A-B)`, et `H(E-H)`.

![Preuve de la valeur de C](proof-c.png)

## Implémentation {#implementation}

[Le code échantillon est fourni ici](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Code hors chaîne {#off-chain-code}

Dans cet article, nous utilisons JavaScript pour les calculs hors chaîne. La plupart des applications décentralisées ont leur composant hors chaîne en JavaScript.

#### Création de la racine Merkle {#creating-the-merkle-root}

Premièrement, nous devons apporter la racine Merkle à la chaîne.

```javascript
const ethers = require("ethers")
```

[Nous utilisons la fonction de hachage du paquet ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// The raw data whose integrity we have to verify. The first two bytes a
// are a user identifier, and the last two bytes the amount of tokens the
// user owns at present.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Encoder chaque entrée sur un seul entier de 256 bits donne un code moins lisible que JSON, par exemple. Cependant, cela signifie un traitement beaucoup moins important pour récupérer les données contenues dans le contrat et ainsi, des frais de gaz moins élevés. [Vous pouvez lire le JSON sur la chaîne](https://github.com/chrisdotn/jsmnSol), c'est juste une mauvaise idée si celà peut-être évité.

```javascript
// The array of hash values, as BigInts
const hashArray = dataArray
```

Dans notre cas et pour commencer, nos données ont une valeur de 256 bits. Ainsi, aucun traitement n'est nécessaire. Si nous utilisons une structure de données plus compliquée, comme des chaînes de caractères, nous devons nous assurer de d'abord hacher les données pour obtenir un tableau de hachages. Notez que c'est aussi parce que nous ne nous soucions pas de savoir que les utilisateurs connaissent les informations des autres utilisateurs. Sinon, nous aurions dû réaliser un hachage de sorte que l'utilisateur 1 ne connaisse pas la valeur pour l'utilisateur 0, que l'utilisateur 2 ne connaisse pas la valeur pour l'utilisateur 3, etc.

```javascript
// Convert between the string the hash function expects and the
// BigInt we use everywhere else.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

La fonction de hachage des ethers s'attend à recevoir une chaîne JavaScript avec un nombre hexadécimal, tel que `0x60A7` et renvoie une autre chaîne de structure identique. Cependant, pour le reste du code, il est plus facile d'utiliser `BigInt` ainsi, nous convertissons en une chaîne hexadécimale et inversement.

```javascript
// Symmetrical hash of a pair so we won't care if the order is reversed.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Cette fonction est symétrique (hachage d'un [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Cela signifie que lorsque nous vérifions la preuve de Merkle, nous n'avons pas à nous soucier de savoir s'il faut mettre la valeur de la preuve avant ou après la valeur calculée. C'est ainsi que l'on vérifie la preuve de Merkle, donc moins nous devons le faire, mieux ce sera.

Attention : La cryptographie est plus complexe qu'il n'y paraît. La version initiale de cet article avait la fonction de hachage `hash(a^b)`. C'était une **mauvaise** idée car cela signifiait que si vous connaissiez les valeurs légitimes de `a` et `b` vous pouviez utiliser `b' = a^b^a` pour prouver la valeur désirée `a'`. Avec cette fonction, vous devriez calculer `b'` de telle sorte que `hash(a') ^ hash(b')` soit égal à une valeur connue (la prochaine branche sur le chemin vers la racine), ce qui est beaucoup plus difficile.

```javascript
// The value to denote that a certain branch is empty, doesn't
// have a value
const empty = 0n
```

Lorsque le nombre de valeurs n'est pas un nombre entier à deux chiffres, nous devons gérer les branches vides. Pour ce faire, le programme va mettre un zéro à la place.

![Arbre de Merkle avec branches manquantes](merkle-empty-hash.png)

```javascript
// Calculate one level up the tree of a hash array by taking the hash of
// each pair in sequence
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // To avoid over writing the input // Add an empty value if necessary (we need all the leaves to be // paired)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Cette fonction « escalade » un niveau dans l'arbre de Merkle en hachant les paires de valeurs de la couche actuelle. Notez que ce n'est pas l'implémentation la plus efficace, nous aurions pu éviter de copier l'entrée et juste ajouter `hashEmpty` lorsque cela est approprié dans la boucle, mais ce code est optimisé pour être plus lisible.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Climb up the tree until there is only one value, that is the // root. // // If a layer has an odd number of entries the // code in oneLevelUp adds an empty value, so if we have, for example, // 10 leaves we'll have 5 branches in the second layer, 3 // branches in the third, 2 in the fourth and the root is the fifth

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Pour obtenir la racine, escaladez jusqu'à ce qu'il ne reste qu'une seule valeur.

#### Créer une preuve de Merkle {#creating-a-merkle-proof}

Une preuve de Merkle est l'ensemble des valeurs à hacher ensemble avec la valeur prouvée pour récupérer la racine de Merkle. La valeur à prouver est souvent disponible à partir d'autres données. Je préfère ainsi la fournir séparément plutôt que dans le cadre du code.

```javascript
// A merkle proof consists of the value of the list of entries to
// hash with. Because we use a symmetrical hash function, we don't
// need the item's location to verify the proof, only to create it
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Until we reach the top
    while (currentLayer.length > 1) {
        // No odd length layers
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // If currentN is odd, add with the value before it to the proof
            ? currentLayer[currentN-1]
               // If it is even, add the value after it
            : currentLayer[currentN+1])

```

Nous hachons `(v[0],v[1])`, `(v[2],v[3])`, etc. Ainsi, pour les valeurs uniques, nous avons besoin de la suivante, pour les valeurs impaires de la précédente.

```javascript
        // Move to the next layer up
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Code en chaîne {#on-chain-code}

Enfin, nous avons le code qui vérifie la preuve. Le code en chaîne est écrit en [Solidity](https://docs.soliditylang.org/en/v0.8.11/). L'optimisation est beaucoup plus importante ici parce que les frais en gaz sont relativement élevés.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

J'ai écrit ceci en utilisant l'environnement de développement [Hardhat](https://hardhat.org/) qui nous permet d'avoir [une sortie console de Solidity](https://hardhat.org/tutorial/debugging-with-hardhat-network.html) durant le développement.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremely insecure, in production code access to
    // this function MUST BE strictly limited, probably to an
    // owner
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Définissez et obtenez des fonctions pour la racine de Merkle. Laisser tout le monde mettre à jour la racine de Merkle est une _très mauvaise idée_ dans un système en production. Je le fais ici par souci de simplicité pour l'exemple de code. **Ne le faites pas sur un système où l'intégrité des données importe réellement**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Cette fonction génère un hachage de la paire. Il s'agit juste de la traduction en Solidity du code JavaScript pour `hash` et `pairHash`.

**Remarque :** Ceci est un autre exemple d'optimisation pour une meilleure lisibilité. Si l'on s'en tient à [la définition de la fonction](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), il est possible de stocker les données sous la forme d'une valeur [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) et d'éviter les conversions.

```solidity
    // Verify a Merkle proof
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

En notation mathématique, la vérification par la preuve de Merkle ressemble à ceci : `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Ce code l'implémente.

## Les preuves de Merkle et les rollups ne font pas bon ménage {#merkle-proofs-and-rollups}

Les preuves de Merkle ne fonctionnent pas bien avec les [rollups](/developers/docs/scaling/#rollups). La raison en est que les rollups écrivent toutes les données de transaction sur L1, mais le processus sur L2. Le coût d'envoi d'une preuve Merkle avec une transaction est en moyenne de 638 gaz par couche (actuellement, un octet de données d'appel coûte 16 gaz s'il n'est pas nul, et 4 s'il est nul). Si nous avons 1 024 mots de données, une preuve de Merkle nécessite dix couches, soit un total de 6 380 gaz.

En cherchant un exemple avec [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), écrire du gaz en L1 coûte environ 100 gwei et le gaz en L2 coûte 0,001 gwei (c'est le prix normal, il peut augmenter s'il y a congestion). Ainsi, pour le coût d'un gaz L1, nous pouvons dépenser cent mille gaz pour le traitement L2. En supposant que nous n'ayons pas écrasé le stockage, cela signifie que nous pouvons écrire environ cinq mots à stocker sur L2 pour le prix d'un gaz L1. Pour une seule preuve de Merkle, nous pouvons écrire l'intégralité des 1 024 mots sur le stockage (en supposant qu'ils peuvent être calculés sur la chaîne pour commencer, au lieu d'être fourni dans une transaction) et disposons toujours de la majeure partie du gaz restant.

## Conclusion {#conclusion}

Dans la vie réelle, il se peut que vous n'ayez jamais à implémenter d'arbres de Merkle par vous-même. Il existe des bibliothèques bien connues et auditées que vous pouvez utiliser et, en général, il est préférable de ne pas implémenter des primitives cryptographiques par vous-même. Cependant, j'espère que, maintenant, vous comprendrez mieux les preuves de Merkle et que vous pourrez décider quand elles valent la peine d'être utilisées.

Notez que bien que les preuves de Merkle préservent _l'intégrité_, elles ne préservent pas _la disponibilité_. Savoir que personne d'autre ne peut se saisir de vos actifs est une petite consolation si le stockage de données décide d'en interdire l'accès et que vous ne pouvez pas non plus construire un arbre de Merkle pour y accéder. Ainsi, les arbres de Merkle sont mieux utilisés avec un type de stockage décentralisé, comme IPFS.
