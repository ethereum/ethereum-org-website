---
title: "Rétro-ingénierie d'un contrat"
description: Comment comprendre un contrat lorsque vous n'avez pas le code source
author: Ori Pomerantz
lang: fr
tags: ["evm", "codes d'opération"]
skill: advanced
breadcrumb: Rétro-ingénierie
published: 2021-12-30
---
## Introduction {#introduction}

_Il n'y a pas de secrets sur la chaîne de blocs_, tout ce qui s'y passe est cohérent, vérifiable et accessible publiquement. Idéalement, [les contrats devraient avoir leur code source publié et vérifié sur Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Cependant, [ce n'est pas toujours le cas](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Dans cet article, vous apprendrez comment faire la rétro-ingénierie de contrats en examinant un contrat sans code source, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Il existe des décompilateurs, mais ils ne produisent pas toujours des [résultats exploitables](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). Dans cet article, vous apprendrez comment faire manuellement la rétro-ingénierie et comprendre un contrat à partir [des codes d'opération](https://github.com/wolflo/evm-opcodes), ainsi que comment interpréter les résultats d'un décompilateur.

Pour pouvoir comprendre cet article, vous devez déjà connaître les bases de l'EVM et être au moins un peu familier avec l'assembleur EVM. [Vous pouvez en apprendre davantage sur ces sujets ici](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Préparer le code exécutable {#prepare-the-executable-code}

Vous pouvez obtenir les codes d'opération en allant sur Etherscan pour le contrat, en cliquant sur l'onglet **Contract** puis sur **Switch to Opcodes View**. Vous obtenez une vue avec un code d'opération par ligne.

![Opcode View from Etherscan](opcode-view.png)

Cependant, pour pouvoir comprendre les sauts, vous devez savoir où se trouve chaque code d'opération dans le code. Pour ce faire, une méthode consiste à ouvrir une feuille de calcul Google (Google Spreadsheet) et à coller les codes d'opération dans la colonne C. [Vous pouvez ignorer les étapes suivantes en faisant une copie de cette feuille de calcul déjà préparée](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

L'étape suivante consiste à obtenir les emplacements corrects du code afin de pouvoir comprendre les sauts. Nous allons placer la taille du code d'opération dans la colonne B, et l'emplacement (en hexadécimal) dans la colonne A. Tapez cette fonction dans la cellule `B1` puis copiez-la et collez-la pour le reste de la colonne B, jusqu'à la fin du code. Après avoir fait cela, vous pouvez masquer la colonne B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Tout d'abord, cette fonction ajoute un octet pour le code d'opération lui-même, puis recherche `PUSH`. Les codes d'opération PUSH sont spéciaux car ils nécessitent des octets supplémentaires pour la valeur empilée. Si le code d'opération est un `PUSH`, nous extrayons le nombre d'octets et l'ajoutons.

Dans `A1`, mettez le premier décalage, zéro. Ensuite, dans `A2`, mettez cette fonction et copiez-collez-la à nouveau pour le reste de la colonne A :

```
=dec2hex(hex2dec(A1)+B1)
```

Nous avons besoin que cette fonction nous donne la valeur hexadécimale car les valeurs qui sont empilées avant les sauts (`JUMP` et `JUMPI`) nous sont données en hexadécimal.

## Le point d'entrée (0x00) {#the-entry-point-0x00}

Les contrats sont toujours exécutés à partir du premier octet. Voici la partie initiale du code :

| Décalage | Code d'opération | Pile (après le code d'opération) |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | Vide                    |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | Vide                    |

Ce code fait deux choses :

1. Écrire 0x80 comme une valeur de 32 octets aux emplacements mémoire 0x40-0x5F (0x80 est stocké dans 0x5F, et 0x40-0x5E sont tous des zéros).
2. Lire la taille des données d'appel. Normalement, les données d'appel pour un contrat Ethereum suivent [l'ABI (interface binaire-programme)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), qui nécessite au minimum quatre octets pour le sélecteur de fonction. Si la taille des données d'appel est inférieure à quatre, sauter à 0x5E.

![Flowchart for this portion](flowchart-entry.png)

### Le gestionnaire à 0x5E (pour les données d'appel non-ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Décalage | Code d'opération |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Cet extrait commence par un `JUMPDEST`. Les programmes de l'EVM (machine virtuelle Ethereum) lèvent une exception si vous sautez vers un code d'opération qui n'est pas `JUMPDEST`. Ensuite, il examine la CALLDATASIZE, et si elle est « vraie » (c'est-à-dire non nulle), il saute à 0x7C. Nous y reviendrons plus bas.

| Décalage | Code d'opération | Pile (après le code d'opération)                                                       |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | [Wei](/glossary/#wei) fourni par l'appel. Appelé `msg.value` en Solidity |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

Donc, lorsqu'il n'y a pas de données d'appel, nous lisons la valeur de Storage[6]. Nous ne savons pas encore ce qu'est cette valeur, mais nous pouvons chercher des transactions que le contrat a reçues sans données d'appel. Les transactions qui transfèrent simplement de l'ETH sans aucune donnée d'appel (et donc sans méthode) ont dans Etherscan la méthode `Transfer`. En fait, [la toute première transaction que le contrat a reçue](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) est un transfert.

Si nous regardons dans cette transaction et cliquons sur **Click to see More** (Cliquer pour voir plus), nous voyons que les données d'appel, appelées données d'entrée (input data), sont en effet vides (`0x`). Remarquez également que la valeur est de 1,559 ETH, ce qui sera pertinent plus tard.

![The call data is empty](calldata-empty.png)

Ensuite, cliquez sur l'onglet **State** (État) et développez le contrat que nous sommes en train de rétro-ingénierer (0x2510...). Vous pouvez voir que `Storage[6]` a bien changé pendant la transaction, et si vous changez Hex en **Number** (Nombre), vous voyez qu'il est devenu 1 559 000 000 000 000 000, la valeur transférée en wei (j'ai ajouté les espaces pour plus de clarté), correspondant à la valeur suivante du contrat.

![Le changement dans Storage[6]](storage6.png)

Si nous regardons les changements d'état causés par [d'autres transactions `Transfer` de la même période](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange), nous voyons que `Storage[6]` a suivi la valeur du contrat pendant un certain temps. Pour l'instant, nous l'appellerons `Value*`. L'astérisque (`*`) nous rappelle que nous ne _savons_ pas encore ce que fait cette variable, mais elle ne peut pas servir uniquement à suivre la valeur du contrat car il n'est pas nécessaire d'utiliser le stockage, qui est très coûteux, quand vous pouvez obtenir le solde de vos comptes en utilisant `ADDRESS BALANCE`. Le premier code d'opération pousse la propre adresse du contrat. Le second lit l'adresse au sommet de la pile et la remplace par le solde de cette adresse.

| Décalage | Code d'opération | Pile                                       |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

Nous allons continuer à tracer ce code à la destination du saut.

| Décalage | Code d'opération | Pile                                                       |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

Le `NOT` est au niveau du bit (bitwise), il inverse donc la valeur de chaque bit dans la valeur d'appel.

| Décalage | Code d'opération | Pile                                                                       |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

Nous sautons si `Value*` est inférieur ou égal à 2^256-CALLVALUE-1. Cela ressemble à une logique pour empêcher un dépassement de capacité (overflow). Et en effet, nous voyons qu'après quelques opérations dénuées de sens (l'écriture en mémoire est sur le point d'être supprimée, par exemple) au décalage 0x01DE, le contrat s'annule si le dépassement est détecté, ce qui est un comportement normal.

Notez qu'un tel dépassement est extrêmement improbable, car il nécessiterait que la valeur d'appel plus `Value*` soit comparable à 2^256 wei, soit environ 10^59 ETH. [L'offre totale d'ETH, au moment de la rédaction, est inférieure à deux cents millions](https://etherscan.io/stat/supply).

| Décalage | Code d'opération | Pile                                     |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

Si nous sommes arrivés ici, obtenez `Value* + CALLVALUE` et sautez au décalage 0x75.

| Décalage | Code d'opération | Pile                           |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

Si nous arrivons ici (ce qui nécessite que les données d'appel soient vides), nous ajoutons à `Value*` la valeur d'appel. Cela est cohérent avec ce que nous disons que les transactions `Transfer` font.

| Décalage | Code d'opération |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Enfin, videz la pile (ce qui n'est pas nécessaire) et signalez la fin réussie de la transaction.

Pour résumer, voici un organigramme pour le code initial.

![Entry point flowchart](flowchart-entry.png)

## Le gestionnaire à 0x7C {#the-handler-at-0x7c}

Je n'ai volontairement pas indiqué dans le titre ce que fait ce gestionnaire. Le but n'est pas de vous apprendre comment fonctionne ce contrat spécifique, mais comment faire de la rétro-ingénierie de contrats. Vous apprendrez ce qu'il fait de la même manière que moi, en suivant le code.

Nous arrivons ici depuis plusieurs endroits :

- S'il y a des données d'appel de 1, 2 ou 3 octets (à partir du décalage 0x63)
- Si la signature de la méthode est inconnue (à partir des décalages 0x42 et 0x5D)

| Décalage | Code d'opération | Pile                 |
| -------: | ---------------- | -------------------- |
|       7C | JUMPDEST         |
|       7D | PUSH1 0x00       | 0x00                 |
|       7F | PUSH2 0x009d     | 0x9D 0x00            |
|       82 | PUSH1 0x03       | 0x03 0x9D 0x00       |
|       84 | SLOAD            | Storage[3] 0x9D 0x00 |

Il s'agit d'une autre cellule de stockage, que je n'ai pu trouver dans aucune transaction, il est donc plus difficile de savoir ce qu'elle signifie. Le code ci-dessous rendra les choses plus claires.

| Décalage | Code d'opération                                  | Pile                            |
| -------: | ------------------------------------------------- | ------------------------------- |
|       85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|       9A | AND                                               | Storage[3]-en-adresse 0x9D 0x00 |

Ces codes d'opération tronquent la valeur que nous lisons dans Storage[3] à 160 bits, la longueur d'une adresse Ethereum.

| Décalage | Code d'opération | Pile                            |
| -------: | ---------------- | ------------------------------- |
|       9B | SWAP1            | 0x9D Storage[3]-en-adresse 0x00 |
|       9C | JUMP             | Storage[3]-en-adresse 0x00      |

Ce saut est superflu, puisque nous passons au code d'opération suivant. Ce code est loin d'être aussi efficace en gaz qu'il pourrait l'être.

| Décalage | Code d'opération | Pile                            |
| -------: | ---------------- | ------------------------------- |
|       9D | JUMPDEST         | Storage[3]-en-adresse 0x00      |
|       9E | SWAP1            | 0x00 Storage[3]-en-adresse      |
|       9F | POP              | Storage[3]-en-adresse           |
|       A0 | PUSH1 0x40       | 0x40 Storage[3]-en-adresse      |
|       A2 | MLOAD            | Mem[0x40] Storage[3]-en-adresse |

Tout au début du code, nous avons défini Mem[0x40] à 0x80. Si nous cherchons 0x40 plus tard, nous voyons que nous ne le modifions pas - nous pouvons donc supposer qu'il vaut 0x80.

| Décalage | Code d'opération | Pile                                              |
| -------: | ---------------- | ------------------------------------------------- |
|       A3 | CALLDATASIZE     | CALLDATASIZE 0x80 Storage[3]-en-adresse           |
|       A4 | PUSH1 0x00       | 0x00 CALLDATASIZE 0x80 Storage[3]-en-adresse      |
|       A6 | DUP3             | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-en-adresse |
|       A7 | CALLDATACOPY     | 0x80 Storage[3]-en-adresse                        |

Copie toutes les données d'appel en mémoire, en commençant à 0x80.

| Décalage | Code d'opération | Pile                                                                             |
| -------: | ---------------- | -------------------------------------------------------------------------------- |
|       A8 | PUSH1 0x00       | 0x00 0x80 Storage[3]-en-adresse                                                  |
|       AA | DUP1             | 0x00 0x00 0x80 Storage[3]-en-adresse                                             |
|       AB | CALLDATASIZE     | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-en-adresse                                |
|       AC | DUP4             | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-en-adresse                           |
|       AD | DUP6             | Storage[3]-en-adresse 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-en-adresse     |
|       AE | GAS              | GAS Storage[3]-en-adresse 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-en-adresse |
|       AF | DELEGATE_CALL    |

Maintenant, les choses sont beaucoup plus claires. Ce contrat peut agir comme un [contrat proxy](https://blog.openzeppelin.com/proxy-patterns/), appelant l'adresse dans Storage[3] pour faire le vrai travail. `DELEGATE_CALL` appelle un contrat distinct, mais reste dans le même stockage. Cela signifie que le contrat délégué, celui pour lequel nous sommes un proxy, accède au même espace de stockage. Les paramètres de l'appel sont :

- _Gaz_ : Tout le gaz restant
- _Adresse appelée_ : Storage[3]-en-adresse
- _Données d'appel_ : Les octets CALLDATASIZE commençant à 0x80, là où nous avons placé les données d'appel d'origine
- _Données de retour_ : Aucune (0x00 - 0x00) Nous obtiendrons les données de retour par d'autres moyens (voir ci-dessous)

| Décalage | Code d'opération | Pile                                                                                          |
| -------: | ---------------- | --------------------------------------------------------------------------------------------- |
|       B0 | RETURNDATASIZE   | RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse                       |
|       B1 | DUP1             | RETURNDATASIZE RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse        |
|       B2 | PUSH1 0x00       | 0x00 RETURNDATASIZE RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse   |
|       B4 | DUP5             | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse |
|       B5 | RETURNDATACOPY   | RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse                       |

Ici, nous copions toutes les données de retour dans le tampon mémoire commençant à 0x80.

| Décalage | Code d'opération | Pile                                                                                                                         |
| -------: | ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
|       B6 | DUP2             | (((succès/échec de l'appel))) RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse                        |
|       B7 | DUP1             | (((succès/échec de l'appel))) (((succès/échec de l'appel))) RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse |
|       B8 | ISZERO           | (((l'appel a-t-il échoué))) (((succès/échec de l'appel))) RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse |
|       B9 | PUSH2 0x00c0     | 0xC0 (((l'appel a-t-il échoué))) (((succès/échec de l'appel))) RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse |
|       BC | JUMPI            | (((succès/échec de l'appel))) RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse                        |
|       BD | DUP2             | RETURNDATASIZE (((succès/échec de l'appel))) RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse         |
|       BE | DUP5             | 0x80 RETURNDATASIZE (((succès/échec de l'appel))) RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse    |
|       BF | RETURN           |                                                                                                                              |

Donc, après l'appel, nous copions les données de retour dans le tampon 0x80 - 0x80+RETURNDATASIZE, et si l'appel réussit, nous exécutons alors `RETURN` avec exactement ce tampon.

### Échec de DELEGATECALL {#delegatecall-failed}

Si nous arrivons ici, à 0xC0, cela signifie que le contrat que nous avons appelé a été annulé. Comme nous ne sommes qu'un proxy pour ce contrat, nous voulons renvoyer les mêmes données et également annuler.

| Décalage | Code d'opération | Pile                                                                                                                |
| -------: | ---------------- | ------------------------------------------------------------------------------------------------------------------- |
|       C0 | JUMPDEST         | (((succès/échec de l'appel))) RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse               |
|       C1 | DUP2             | RETURNDATASIZE (((succès/échec de l'appel))) RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse|
|       C2 | DUP5             | 0x80 RETURNDATASIZE (((succès/échec de l'appel))) RETURNDATASIZE (((succès/échec de l'appel))) 0x80 Storage[3]-en-adresse |
|       C3 | REVERT           |

Nous exécutons donc `REVERT` avec le même tampon que celui utilisé pour `RETURN` plus tôt : 0x80 - 0x80+RETURNDATASIZE

![Call to proxy flowchart](flowchart-proxy.png)

## Appels ABI {#abi-calls}

Si la taille des données d'appel est de quatre octets ou plus, il peut s'agir d'un appel ABI valide.

| Décalage | Code d'opération | Pile                                                  |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((Premier mot (256 bits) des données d'appel)))      |
|     10 | PUSH1 0xe0   | 0xE0 (((Premier mot (256 bits) des données d'appel))) |
|     12 | SHR          | (((les 32 premiers bits (4 octets) des données d'appel)))    |

Etherscan nous indique que `1C` est un code d'opération inconnu, car [il a été ajouté après qu'Etherscan a écrit cette fonctionnalité](https://eips.ethereum.org/EIPS/eip-145) et ils ne l'ont pas mise à jour. Un [tableau des codes d'opération à jour](https://github.com/wolflo/evm-opcodes) nous montre qu'il s'agit d'un décalage vers la droite

| Décalage | Code d'opération | Pile                                                                                                     |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((les 32 premiers bits (4 octets) des données d'appel))) (((les 32 premiers bits (4 octets) des données d'appel)))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((les 32 premiers bits (4 octets) des données d'appel))) (((les 32 premiers bits (4 octets) des données d'appel))) |
|     19 | GT               | 0x3CD8045E>les-32-premiers-bits-des-donnees-d-appel (((les 32 premiers bits (4 octets) des données d'appel)))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>les-32-premiers-bits-des-donnees-d-appel (((les 32 premiers bits (4 octets) des données d'appel)))            |
|     1D | JUMPI            | (((les 32 premiers bits (4 octets) des données d'appel)))                                                           |

Diviser ainsi en deux les tests de correspondance de la signature de méthode permet d'économiser la moitié des tests en moyenne. Le code qui suit immédiatement ceci et le code en 0x43 suivent le même modèle : `DUP1` les 32 premiers bits des données d'appel, `PUSH4 (((method signature>`, exécutent `EQ` pour vérifier l'égalité, puis `JUMPI` si la signature de méthode correspond. Voici les signatures de méthode, leurs adresses et, si elle est connue, [la définition de méthode correspondante](https://www.4byte.directory/) :

| Méthode                                                                                | Signature de méthode | Décalage vers lequel sauter |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103              |
| ???                                                                                    | 0x81e580d3       | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158              |
| ???                                                                                    | 0x1f135823       | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED              |

Si aucune correspondance n'est trouvée, le code saute vers [le gestionnaire de proxy à 0x7C](#the-handler-at-0x7c), dans l'espoir que le contrat pour lequel nous sommes un proxy ait une correspondance.

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| Décalage | Code d'opération | Pile |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

La première chose que fait cette fonction est de vérifier que l'appel n'a pas envoyé d'ETH. Cette fonction n'est pas [`payable`](https://solidity-by-example.org/payable/). Si quelqu'un nous a envoyé de l'ETH, cela doit être une erreur et nous voulons `REVERT` pour éviter que cet ETH ne se retrouve là où il ne peut pas être récupéré.

| Décalage | Code d'opération | Pile |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] alias le contrat pour lequel nous sommes un proxy)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] alias le contrat pour lequel nous sommes un proxy)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] alias le contrat pour lequel nous sommes un proxy)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] alias le contrat pour lequel nous sommes un proxy))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] alias le contrat pour lequel nous sommes un proxy))) |
|    12D | SWAP2                                             | (((Storage[3] alias le contrat pour lequel nous sommes un proxy))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

Et 0x80 contient maintenant l'adresse du proxy

| Décalage | Code d'opération | Pile |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Le code E4 {#the-e4-code}

C'est la première fois que nous voyons ces lignes, mais elles sont partagées avec d'autres méthodes (voir ci-dessous). Nous appellerons donc la valeur dans la pile X, et rappelez-vous simplement que dans `splitter()`, la valeur de ce X est 0xA0.

| Décalage | Code d'opération | Pile |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

Ce code reçoit donc un pointeur de mémoire dans la pile (X), et amène le contrat à `RETURN` avec un tampon qui est 0x80 - X.

Dans le cas de `splitter()`, cela renvoie l'adresse pour laquelle nous sommes un proxy. `RETURN` renvoie le tampon dans 0x80-0x9F, qui est l'endroit où nous avons écrit ces données (décalage 0x130 ci-dessus).

## currentWindow() {#currentwindow}

Le code aux décalages 0x158-0x163 est identique à ce que nous avons vu en 0x103-0x10E dans `splitter()` (à l'exception de la destination `JUMPI`), nous savons donc que `currentWindow()` n'est pas non plus `payable`.

| Décalage | Code d'opération | Pile                 |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### Le code DA {#the-da-code}

Ce code est également partagé avec d'autres méthodes. Nous appellerons donc la valeur dans la pile Y, et rappelez-vous simplement que dans `currentWindow()`, la valeur de ce Y est Storage[1].

| Décalage | Code d'opération | Pile             |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Écrire Y dans 0x80-0x9F.

| Décalage | Code d'opération | Pile           |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

Et le reste est déjà expliqué [ci-dessus](#the-e4-code). Ainsi, les sauts vers 0xDA écrivent le sommet de la pile (Y) dans 0x80-0x9F, et renvoient cette valeur. Dans le cas de `currentWindow()`, cela renvoie Storage[1].

## merkleRoot() {#merkleroot}

Le code aux offsets 0xED-0xF8 est identique à ce que nous avons vu en 0x103-0x10E dans `splitter()` (à l'exception de la destination `JUMPI`), nous savons donc que `merkleRoot()` n'est pas non plus `payable`.

| Offset | Code d'opération | Pile                 |
| -----: | ---------------- | -------------------- |
|     F9 | JUMPDEST         |
|     FA | POP              |
|     FB | PUSH2 0x00da     | 0xDA                 |
|     FE | PUSH1 0x00       | 0x00 0xDA            |
|    100 | SLOAD            | Storage[0] 0xDA      |
|    101 | DUP2             | 0xDA Storage[0] 0xDA |
|    102 | JUMP             | Storage[0] 0xDA      |

Ce qui se passe après le saut, [nous l'avons déjà compris](#the-da-code). Donc `merkleRoot()` renvoie Storage[0].

## 0x81e580d3 {#0x81e580d3}

Le code aux décalages 0x138-0x143 est identique à ce que nous avons vu en 0x103-0x10E dans `splitter()` (à l'exception de la destination `JUMPI`), nous savons donc que cette fonction n'est pas non plus `payable`.

| Décalage | Code d'opération | Pile                                                         |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Il semble que cette fonction prenne au moins 32 octets (un mot) de données d'appel.

| Décalage | Code d'opération | Pile                                         |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

Si elle ne reçoit pas les données d'appel, la transaction est annulée sans aucune donnée de retour.

Voyons ce qui se passe si la fonction reçoit _effectivement_ les données d'appel dont elle a besoin.

| Décalage | Code d'opération | Pile                                     |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` est le premier mot des données d'appel _après_ la signature de la méthode

| Décalage | Code d'opération | Pile                                                                         |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Si le premier mot n'est pas inférieur à Storage[4], la fonction échoue. Elle est annulée sans aucune valeur de retour :

| Décalage | Code d'opération | Pile          |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

Si le calldataload(4) est inférieur à Storage[4], nous obtenons ce code :

| Décalage | Code d'opération | Pile                                                |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

Et les emplacements mémoire 0x00-0x1F contiennent maintenant la donnée 0x04 (0x00-0x1E sont tous des zéros, 0x1F vaut quatre)

| Décalage | Code d'opération | Pile                                                                    |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Il y a donc une table de correspondance dans le stockage, qui commence au SHA3 de 0x000...0004 et possède une entrée pour chaque valeur légitime de données d'appel (valeur inférieure à Storage[4]).

| Décalage | Code d'opération | Pile                                                                    |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Nous savons déjà ce que fait [le code au décalage 0xDA](#the-da-code), il renvoie la valeur au sommet de la pile à l'appelant. Cette fonction renvoie donc la valeur de la table de correspondance à l'appelant.

## 0x1f135823 {#0x1f135823}

Le code aux décalages 0xC4-0xCF est identique à ce que nous avons vu en 0x103-0x10E dans `splitter()` (à l'exception de la destination `JUMPI`), nous savons donc que cette fonction n'est pas non plus `payable`.

| Décalage | Code d'opération | Pile |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Valeur\* 0xDA      |
|     D8 | DUP2         | 0xDA Valeur\* 0xDA |
|     D9 | JUMP         | Valeur\* 0xDA      |

Nous savons déjà ce que fait [le code au décalage 0xDA](#the-da-code), il renvoie la valeur au sommet de la pile à l'appelant. Cette fonction renvoie donc `Value*`.

### Résumé des méthodes {#method-summary}

Avez-vous l'impression de comprendre le contrat à ce stade ? Pas moi. Jusqu'à présent, nous avons ces méthodes :

| Méthode | Signification |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfert | Accepter la valeur fournie par l'appel et augmenter `Value*` de ce montant |
| [splitter()](#splitter) | Renvoyer Storage[3], l'adresse du proxy |
| [currentWindow()](#currentwindow) | Renvoyer Storage[1] |
| [merkleRoot()](#merkleroot) | Renvoyer Storage[0] |
| [0x81e580d3](#0x81e580d3) | Renvoyer la valeur d'une table de correspondance, à condition que le paramètre soit inférieur à Storage[4] |
| [0x1f135823](#0x1f135823) | Renvoyer Storage[6], alias Valeur\* |

Mais nous savons que toute autre fonctionnalité est fournie par le contrat dans Storage[3]. Peut-être que si nous savions ce qu'est ce contrat, cela nous donnerait un indice. Heureusement, c'est la chaîne de blocs et tout est connu, du moins en théorie. Nous n'avons vu aucune méthode qui définit Storage[3], il a donc dû être défini par le constructeur.

## Le constructeur {#the-constructor}

Lorsque nous [regardons un contrat](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), nous pouvons également voir la transaction qui l'a créé.

![Click the create transaction](create-tx.png)

Si nous cliquons sur cette transaction, puis sur l'onglet **État**, nous pouvons voir les valeurs initiales des paramètres. Plus précisément, nous pouvons voir que Storage[3] contient [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Ce contrat doit contenir la fonctionnalité manquante. Nous pouvons le comprendre en utilisant les mêmes outils que ceux utilisés pour le contrat que nous examinons.

## Le contrat proxy {#the-proxy-contract}

En utilisant les mêmes techniques que celles utilisées pour le contrat original ci-dessus, nous pouvons voir que le contrat s'annule si :

- Il y a de l'ETH attaché à l'appel (0x05-0x0F)
- La taille des données d'appel est inférieure à quatre (0x10-0x19 et 0xBE-0xC2)

Et que les méthodes qu'il prend en charge sont :

| Méthode                                                                                                         | Signature de la méthode      | Décalage pour sauter à |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135                 |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151                 |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4                 |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110                 |
| ???                                                                                                             | 0x3f26479e                   | 0x0118                 |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3                 |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148                 |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107                 |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122                 |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8                 |

Nous pouvons ignorer les quatre méthodes du bas car nous ne les atteindrons jamais. Leurs signatures sont telles que notre contrat original s'en charge lui-même (vous pouvez cliquer sur les signatures pour voir les détails ci-dessus), ce doivent donc être des [méthodes qui sont remplacées](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

L'une des méthodes restantes est `claim(<params>)`, et une autre est `isClaimed(<params>)`, il semble donc s'agir d'un contrat d'airdrop. Au lieu de parcourir le reste code d'opération par code d'opération, nous pouvons [essayer le décompilateur](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), qui produit des résultats utilisables pour trois fonctions de ce contrat. La rétro-ingénierie des autres est laissée comme exercice au lecteur.

### scaleAmountByPercentage {#scaleamountbypercentage}

Voici ce que le décompilateur nous donne pour cette fonction :

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Le premier `require` teste que les données d'appel ont, en plus des quatre octets de la signature de la fonction, au moins 64 octets, ce qui est suffisant pour les deux paramètres. Si ce n'est pas le cas, il y a manifestement un problème.

L'instruction `if` semble vérifier que `_param1` n'est pas zéro, et que `_param1 * _param2` n'est pas négatif. C'est probablement pour éviter les cas de dépassement de capacité.

Enfin, la fonction renvoie une valeur mise à l'échelle.

### claim {#claim}

Le code créé par le décompilateur est complexe, et tout n'est pas pertinent pour nous. Je vais en ignorer une partie pour me concentrer sur les lignes qui, selon moi, fournissent des informations utiles.

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Nous voyons ici deux choses importantes :

- `_param2`, bien qu'il soit déclaré comme un `uint256`, est en fait une adresse
- `_param1` est la fenêtre réclamée, qui doit être `currentWindow` ou antérieure.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Nous savons donc maintenant que Storage[5] est un tableau de fenêtres et d'adresses, et indique si l'adresse a réclamé la récompense pour cette fenêtre.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

Nous savons que `unknown2eb4a7ab` est en fait la fonction `merkleRoot()`, donc ce code semble vérifier une [preuve de Merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Cela signifie que `_param4` est une preuve de Merkle.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

C'est ainsi qu'un contrat transfère son propre ETH à une autre adresse (contrat ou détenue en externe). Il l'appelle avec une valeur qui est le montant à transférer. Il semble donc qu'il s'agisse d'un airdrop d'ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Les deux dernières lignes nous indiquent que Storage[2] est également un contrat que nous appelons. Si nous [regardons la transaction du constructeur](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), nous voyons que ce contrat est [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), un contrat d'ether enveloppé (WETH) [dont le code source a été téléchargé sur Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Il semble donc que le contrat tente d'envoyer de l'ETH à `_param2`. S'il y parvient, tant mieux. Sinon, il tente d'envoyer du [WETH](https://weth.tkn.eth.limo/). Si `_param2` est un compte détenu en externe (EOA), il peut toujours recevoir de l'ETH, mais les contrats peuvent refuser de recevoir de l'ETH. Cependant, le WETH est un ERC-20 et les contrats ne peuvent pas refuser de l'accepter.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

À la fin de la fonction, nous voyons qu'une entrée de journal est générée. [Regardez les entrées de journal générées](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) et filtrez sur le sujet qui commence par `0xdbd5...`. Si nous [cliquons sur l'une des transactions qui a généré une telle entrée](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), nous voyons qu'il s'agit bien d'une réclamation : le compte a envoyé un message au contrat que nous rétro-ingénierons, et a reçu de l'ETH en retour.

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Cette fonction est très similaire à [`claim`](#claim) ci-dessus. Elle vérifie également une preuve de Merkle, tente de transférer de l'ETH au premier, et produit le même type d'entrée de journal.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

La principale différence est que le premier paramètre, la fenêtre à retirer, n'est pas là. Au lieu de cela, il y a une boucle sur toutes les fenêtres qui pourraient être réclamées.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

Il semble donc s'agir d'une variante de `claim` qui réclame toutes les fenêtres.

## Conclusion {#conclusion}

À présent, vous devriez savoir comment comprendre les contrats dont le code source n'est pas disponible, en utilisant soit les codes d'opération, soit (quand cela fonctionne) le décompilateur. Comme le montre la longueur de cet article, la rétro-ingénierie d'un contrat n'est pas triviale, mais dans un système où la sécurité est essentielle, c'est une compétence importante de pouvoir vérifier que les contrats fonctionnent comme promis.

[Découvrez d'autres de mes travaux ici](https://cryptodocguy.pro/).