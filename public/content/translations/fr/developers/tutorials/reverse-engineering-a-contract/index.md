---
title: "Ingénierie inverse d'un contrat"
description: Comment comprendre un contrat quand vous n'avez pas le code source
author: Ori Pomerantz
lang: fr
tags:
  - "evm"
  - "codes d'opérations"
skill: advanced
published: 2021-12-30
---

## Introduction {#introduction}

_Il n'y a aucun secret sur la blockchain_, tout ce qui se passe est cohérent, vérifiable et accessible au public. Idéalement, [les contrats devraient avoir leur code source publié et vérifié sur Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Or [ce n'est pas toujours le cas](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Dans cet article, vous apprendrez comment rétro-concevoir des contrats en prenant comme exemple un contrat sans code source, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Il existe des décompilateurs, mais ils ne produisent pas toujours [des résultats utilisables](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). Dans cet article, vous apprendrez comment rétro-concevoir manuellement et comprendre un contrat grâce aux [opcodes](https://github.com/wolflo/evm-opcodes) et également comment interpréter les résultats du décompilateur.

Pour être en mesure de comprendre cet article, vous devriez connaître les bases de l'EVM et être au moins familier avec l'assembleur EVM. [Vous pouvez en savoir plus sur ces sujets ici](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Préparer le Code Exécutable {#prepare-the-executable-code}

Vous pouvez récupérer les opcodes en cherchant le contrat sur Etherscan, cliquez sur l'onglet **Contract** et puis sur **Switch to Opcodes View**. Vous obtenez un affichage d'un opcode par ligne.

![Vue Opcode depuis Etherscan](opcode-view.png)

Pour être capable de comprendre les sauts, vous devez savoir où se trouve chaque opcode dans le code. Pour ce faire, vous pouvez ouvrir Google Spreadsheet et coller les codes d'opération dans le colonne C.[Vous pouvez sauter les étapes suivantes en faisant une copie de cette feuille de calcul](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

L'étape suivante est d'obtenir les emplacements corrects dans le code pour comprendre les sauts. Nous allons mettre la taille du code d'opération dans la colonne B et son emplacement (en hexadécimal) dans la colonne A. Entrez cette fonction dans la cellule `B1` et puis copiez-collez sur le reste de la colonne B jusqu'à la fin du code. Après cela, vous pouvez masquer la colonne B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Tout d'abord, cette fonction ajoute un octet au code d'opération, puis elle recherche le mot clé `PUSH`. Les codes d'opération PUSH sont spéciaux car ils doivent avoir des octets supplémentaires pour la valeur qui doit être poussée. Si l'opcode est un `PUSH`, nous extrayons le nombre d'octets et ajoutons la valeur à la taille de l'opcode.

Dans la cellule `A1`, déclarez la première valeur décalée à 0. Puis, dans la cellule `A2`, entrez cette fonction et copiez-collez la sur le reste de la colonne A :

```
=dec2hex(hex2dec(A1)+B1)
```

Nous avons besoin de cette fonction pour nous donner la valeur hexadécimale car les valeurs poussées avant les sauts (`JUMP` et `JUMPI`) nous sont données en hexadécimal.

## Le Point d'Entrée (0x00) {#the-entry-point-0x00}

Les contrats sont toujours exécutés à partir du premier octet. Ceci est la première partie du code :

| Décalage | Opcode       | Pile (après le code d'opération) |
| --------:| ------------ | -------------------------------- |
|        0 | PUSH1 0x80   | 0x80                             |
|        2 | PUSH1 0x40   | 0x40, 0x80                       |
|        4 | MSTORE       | Vide                             |
|        5 | PUSH1 0x04   | 0x04                             |
|        7 | CALLDATASIZE | CALLDATASIZE 0x04                |
|        8 | LT           | CALLDATASIZE<4                   |
|        9 | PUSH2 0x005e | 0x5E CALLDATASIZE<4              |
|        C | JUMPI        | Vide                             |

Ce code fait deux choses :

1. Écrit 0x80 sous la forme d'une valeur de 32 octets sur des emplacements de mémoire 0x40-0x5F (0x80 est stocké dans 0x5F, et 0x40-0x5E sont à zéro).
2. Lire la taille des données d'appel. Normalement, les données d'appel pour un contrat Ethereum suivent [l'ABI (interface binaire-programme)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), qui nécessite au minimum quatre octets pour le sélecteur de fonction. Si la taille des données d'appel est inférieure à quatre, il y a un saut à 0x5E.

![Organigramme de cette partie](flowchart-entry.png)

### Le Gestionnaire à 0x5E (pour les données d'appel non-ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Décalage | Opcode       |
| --------:| ------------ |
|       5E | JUMPDEST     |
|       5F | CALLDATASIZE |
|       60 | PUSH2 0x007c |
|       63 | JUMPI        |

Ce snippet commence avec un `JUMPDEST`. Les programmes EVM (machine virtuelle Ethereum) lèvent une exception si l'on saute à un code d'opération qui n'est pas `JUMPDEST`. Puis, il vérifie le CALLDATASIZE et si c'est « true » (c'est-à-dire, si ce n'est pas zéro), il saute à 0x7C. Nous verrons ça ci-dessous.

| Décalage | Opcode     | Pile (après l'opcode)                                                      |
| --------:| ---------- | -------------------------------------------------------------------------- |
|       64 | CALLVALUE  | [Wei](/glossary/#wei) fourni par l'appel. Appelé `msg.value` dans Solidity |
|       65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|       67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|       69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|       6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|       6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

Ainsi, lorsqu'il n'y a pas de données d'appel, nous lisons la valeur de Stockage[6]. Nous ne savons pas encore quelle est cette valeur, mais nous pouvons rechercher les transactions que le contrat a reçues sans aucune donnée d'appel. Les transactions qui transfèrent juste de l'ETH sans aucune donnée d'appel (et donc aucune méthode) disposent de la méthode `Transfer` dans Etherscan. En fait, [la toute première transaction reçue par le contrat](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) est un transfert.

Si nous regardons la transaction et que nous cliquons sur **Click to see More**, nous voyons que l'appel de donnée, appelé une donnée d'entrée, est en fait vide (`0x`). Notez aussi que la valeur est à 1.559 ETH, ce qui sera intéressant plus tard.

![Les données d'appel sont vides](calldata-empty.png)

Ensuite, cliquez sur l'onglet **State** et développez le contrat que nous rétro-concevons (0x2510...). Vous pouvez voir que `Stockage[6]` a changé pendant la transaction, et si vous changez l'hexadécimal en **Numéro**, vous voyez que la valeur transférée est maintenant affichée en wei : 1,559,000,000,000,000 (j'ai ajouté les virgules à des fins de clarté), correspondant à la valeur du prochain contrat.

![Le changement dans Stockage[6]](storage6.png)

Si nous regardons dans les changements d'état causés par [d'autres transactions `Transfer` de la même période](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) nous voyons que `Storage[6]` a suivi la valeur du contrat pendant un certain temps. Pour le moment, nous l'appellerons `Valeur*`. L'astérisque (`*`) nous rappelle que nous ne _savons_ pas ce que cette variable fait pour le moment, mais ça ne peut pas être simplement de tracer la valeur du contrat parce qu'il n'y a pas besoin d'utiliser  le stockage, qui est très cher, quand vous pouvez obtenir le solde de vos comptes à l'aide de `ADDRESS BALANCE`. Le premier code d'opérations dévoile la propre adresse du contrat. Le deuxième lit l'adresse en haut de la pile et la remplace par le solde de cette adresse.

| Décalage | Opcode       | Pile                                          |
| --------:| ------------ | --------------------------------------------- |
|       6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|       6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|       70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|       71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|       74 | JUMP         |                                               |

Nous continuerons à tracer ce code à la destination du saut.

| Décalage | Opcode     | Pile                                                          |
| --------:| ---------- | ------------------------------------------------------------- |
|      1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|      1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|      1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|      1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

Le `NOT` est au niveau des bits donc il inverse la valeur de chaque bit dans la valeur d'appel.

| Décalage | Opcode       | Pile                                                                            |
| --------:| ------------ | ------------------------------------------------------------------------------- |
|      1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|      1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|      1AE | ISZERO       | Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|      1AF | PUSH2 0x01df | 0x01DF Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|      1B2 | JUMPI        |                                                                                 |

On saute si `Value*` est inférieure à 2^256-CALLVALUE-1 ou égale à celle-ci. Cela ressemble à une logique pour éviter les dépassements. Et en effet, nous voyons qu'après quelques opérations absurdes (écrire en mémoire est sur le point d'être supprimé, par exemple) au décalage 0x01DE, le contrat annule si le dépassement est détecté, ce qui est le comportement normal.

Notez qu'un tel dépassement est extrêmement improbable, parce qu'il nécessiterait une valeur d'appel et `Value*` d'être d'un ordre de grandeur de 2^256 wei, environ 10^59 ETH. [L'offre d'ETH total, au moment ou l'on écrit ceci, est inférieur à deux cents millions](https://etherscan.io/stat/supply).

| Décalage | Opcode   | Pile                                        |
| --------:| -------- | ------------------------------------------- |
|      1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|      1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|      1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|      1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|      1E3 | JUMP     |                                             |

Si nous sommes arrivés ici, obtenons `Value* + CALLVALUE` et sautons au décalage 0x75.

| Décalage | Opcode   | Pile                              |
| --------:| -------- | --------------------------------- |
|       75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|       76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|       77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|       78 | SSTORE   | 0 CALLVALUE                       |

Si nous arrivons ici (ce qui nécessite que les données d'appel soient vides), nous ajoutons à `Value*` la valeur d'appel. Ceci est cohérent avec ce que nous disons sur ce que les transactions `Transfer` font.

| Décalage | Opcode |
| --------:| ------ |
|       79 | POP    |
|       7A | POP    |
|       7B | STOP   |

Enfin, effacez la pile (qui n'est pas nécessaire) et signalez la fin réussie de la transaction.

Pour tout résumer, voici un diagramme du code initial.

![Organigramme des points d'entrée](flowchart-entry.png)

## Le gestionnaire à 0x7C {#the-handler-at-0x7c}

J'ai sciemment omis de mettre dans la rubrique ce que fait ce gestionnaire. Le but n'est pas de vous enseigner comment fonctionne ce contrat spécifique, mais comment rétro-concevoir les contrats. Vous apprendrez ce qu'il fait de la même manière que moi, en suivant le code.

Nous arrivons ici de plusieurs façons :

- S'il y a des données d'appel de 1, 2 ou 3 octets (à partir du décalage 0x63)
- Si la signature de la méthode est inconnue (à partir des décalages 0x42 et 0x5D)

| Décalage | Opcode       | Pile                 |
| --------:| ------------ | -------------------- |
|       7C | JUMPDEST     |                      |
|       7D | PUSH1 0x00   | 0x00                 |
|       7F | PUSH2 0x009d | 0x9D 0x00            |
|       82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|       84 | SLOAD        | Storage[3] 0x9D 0x00 |

Il s'agit d'une autre cellule de stockage, une cellule que je n'ai pas trouvée dans aucune transaction, donc il est plus difficile de savoir ce que cela signifie. Le code ci-dessous clarifiera la question.

| Décalage | Opcode                                            | Pile                            |
| --------:| ------------------------------------------------- | ------------------------------- |
|       85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|       9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

Ces codes d'opération tronquent la valeur que nous lisons de Stockage[3] à 160 bits, la longueur d'une adresse Ethereum.

| Décalage | Opcode | Pile                            |
| --------:| ------ | ------------------------------- |
|       9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|       9C | JUMP   | Storage[3]-as-address 0x00      |

Ce saut est superflu puisque nous allons au prochain code d'opérations. Ce code n'est pas aussi efficace en gaz qu'il pourrait l'être.

| Décalage | Opcode     | Pile                            |
| --------:| ---------- | ------------------------------- |
|       9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|       9E | SWAP1      | 0x00 Storage[3]-as-address      |
|       9F | POP        | Storage[3]-as-address           |
|       A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|       A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

Au tout début du code, nous définissons Mem[0x40] à 0x80. Si nous cherchons 0x40 plus tard, nous voyons que nous ne le changeons pas - nous pouvons donc supposer qu'il est 0x80.

| Décalage | Opcode       | Pile                                              |
| --------:| ------------ | ------------------------------------------------- |
|       A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|       A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|       A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|       A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

Copiez toutes les données d'appel en mémoire, à partir de 0x80.

| Décalage | Opcode        | Pile                                                                             |
| --------:| ------------- | -------------------------------------------------------------------------------- |
|       A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|       AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|       AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|       AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|       AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|       AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|       AF | DELEGATE_CALL |                                                                                  |

Les choses sont maintenant beaucoup plus claires. Ce contrat peut agir comme un [proxy](https://blog.openzeppelin.com/proxy-patterns/), en appelant l'adresse dans Stockage[3] pour faire le travail réel. `DELEGATE_CALL` appelle un contrat séparé, mais reste dans le même stockage. Cela signifie que le contrat délégué, celui pour lequel nous sommes un proxy, accède au même espace de stockage. Les paramètres d'appel sont :

- _Gaz_ : Tout le gaz restant
- _Adresse appelée_ : Stockage[3] comme adresse
- _Données d'appel_ : Les octets CALLDATASIZE commençant à 0x80, où nous avons mis les données d'appel d'origine
- _Données de retour_ : Aucune (0x00 - 0x00), nous allons obtenir les données de retour par d'autres moyens (voir ci-dessous)

| Décalage | Opcode         | Pile                                                                                          |
| --------:| -------------- | --------------------------------------------------------------------------------------------- |
|       B0 | RETURNDATASIZE | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|       B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|       B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|       B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|       B5 | RETURNDATACOPY | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

Ici, nous copions toutes les données retournées dans le tampon de mémoire à partir de 0x80.

| Décalage | Opcode       | Pile                                                                                                                         |
| --------:| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|       B6 | DUP2         | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|       B7 | DUP1         | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|       B8 | ISZERO       | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|       B9 | PUSH2 0x00c0 | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|       BC | JUMPI        | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|       BD | DUP2         | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address               |
|       BE | DUP5         | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address          |
|       BF | RETOUR       |                                                                                                                              |

Donc, après l'appel, nous copions les données retournées dans le tampon 0x80 - 0x80+RETURNDATASIZE, et si l'appel réussit, nous retournons `RETURN` avec exactement ce tampon.

### Échec de DELEGATECALL {#delegatecall-failed}

Si nous arrivons ici, à 0xC0, cela signifie que le contrat que nous avons appelé a annulé son exécution. Étant donné que nous ne sommes qu'un proxy pour ce contrat, nous voulons retourner les mêmes données et annuler également.

| Décalage | Opcode   | Pile                                                                                                                |
| --------:| -------- | ------------------------------------------------------------------------------------------------------------------- |
|       C0 | JUMPDEST | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|       C1 | DUP2     | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|       C2 | DUP5     | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|       C3 | REVERT   |                                                                                                                     |

Donc nous annulons `REVERT` avec le même tampon que nous avons utilisé pour `RETURN` précédemment : 0x80 - 0x80+RETURNDATASIZE

![Organigramme de l'appel de proxy](flowchart-proxy.png)

## Appels ABI {#abi-calls}

Si la taille des données de l'appel est de quatre octets ou plus, il peut s'agir d'un appel ABI valide.

| Décalage | Opcode       | Pile                                              |
| --------:| ------------ | ------------------------------------------------- |
|        D | PUSH1 0x00   | 0x00                                              |
|        F | CALLDATALOAD | (((First word (256 bits) of the call data)))      |
|       10 | PUSH1 0xe0   | 0xE0 (((First word (256 bits) of the call data))) |
|       12 | SHR          | (((first 32 bits (4 bytes) of the call data)))    |

Etherscan nous dit que `1C` est un code d'opération inconnu, parce qu'[il a été ajouté après que Etherscan ait écrit cette fonctionnalité](https://eips.ethereum.org/EIPS/eip-145) et qu'ils ne l'ont pas mise à jour. Un [tableau d'opcode à jour](https://github.com/wolflo/evm-opcodes) nous montre que c'est un décalage à droite

| Décalage | Opcode           | Pile                                                                                                     |
| --------:| ---------------- | -------------------------------------------------------------------------------------------------------- |
|       13 | DUP1             | (((first 32 bits (4 bytes) of the call data))) (((first 32 bits (4 bytes) of the call data)))            |
|       14 | PUSH4 0x3cd8045e | 0x3CD8045E (((first 32 bits (4 bytes) of the call data))) (((first 32 bits (4 bytes) of the call data))) |
|       19 | GT               | 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))                 |
|       1A | PUSH2 0x0043     | 0x43 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))            |
|       1D | JUMPI            | (((first 32 bits (4 bytes) of the call data)))                                                           |

Diviser les tests de correspondance de la signature de la méthode en deux comme cela réduit les tests de moitié en moyenne. Le code qui suit immédiatement cela et le code en 0x43 suivent le même modèle : `DUP1` les 32 premiers bits des données d'appel, `PUSH4 (((méthode signature>`, exécutez `EQ` pour vérifier l'égalité, puis `JUMPI` si la signature de la méthode correspond. Voici les signatures de la méthode, leurs adresses, et si elles sont connues [la définition de méthode correspondante](https://www.4byte.directory/) :

| Méthode                                                                                | Signature de la méthode | Décalage vers lequel sauter |
| -------------------------------------------------------------------------------------- | ----------------------- | --------------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e              | 0x0103                      |
| ???                                                                                    | 0x81e580d3              | 0x0138                      |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4              | 0x0158                      |
| ???                                                                                    | 0x1f135823              | 0x00C4                      |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab              | 0x00ED                      |

Si aucune correspondance n'est trouvée, le code saute vers [le gestionnaire de proxy à 0x7C](#the-handler-at-0x7c), dans l'espoir que le contrat pour lequel nous sommes proxy ait une correspondance.

![Organigramme des appels ABI](flowchart-abi.png)

## splitter() {#splitter}

| Décalage | Opcode       | Pile                          |
| --------:| ------------ | ----------------------------- |
|      103 | JUMPDEST     |                               |
|      104 | CALLVALUE    | CALLVALUE                     |
|      105 | DUP1         | CALLVALUE CALLVALUE           |
|      106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|      107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|      10A | JUMPI        | CALLVALUE                     |
|      10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|      10D | DUP1         | 0x00 0x00 CALLVALUE           |
|      10E | REVERT       |                               |

La première chose que fait cette fonction est de vérifier que l'appel n'a pas envoyé d'ETH. Cette fonction n'est pas [`payable`](https://solidity-by-example.org/payable/). Si quelqu'un nous a envoyé des ETH, cela doit être une erreur et nous voulons `REVERT` pour éviter d'avoir cet ETH où il ne peut le récupérer.

| Décalage | Opcode                                            | Pile                                                                        |
| --------:| ------------------------------------------------- | --------------------------------------------------------------------------- |
|      10F | JUMPDEST                                          |                                                                             |
|      110 | POP                                               |                                                                             |
|      111 | PUSH1 0x03                                        | 0x03                                                                        |
|      113 | SLOAD                                             | (((Storage[3] a.k.a the contract for which we are a proxy)))                |
|      114 | PUSH1 0x40                                        | 0x40 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|      116 | MLOAD                                             | 0x80 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|      117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] a.k.a the contract for which we are a proxy))) |
|      12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] a.k.a the contract for which we are a proxy))) |
|      12D | SWAP2                                             | (((Storage[3] a.k.a the contract for which we are a proxy))) 0xFF...FF 0x80 |
|      12E | AND                                               | ProxyAddr 0x80                                                              |
|      12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|      130 | MSTORE                                            | 0x80                                                                        |

Et 0x80 contient maintenant l'adresse du proxy

| Décalage | Opcode       | Pile      |
| --------:| ------------ | --------- |
|      131 | PUSH1 0x20   | 0x20 0x80 |
|      133 | ADD          | 0xA0      |
|      134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|      137 | JUMP         | 0xA0      |

### Le code E4 {#the-e4-code}

C'est la première fois que nous voyons ces lignes, mais elles sont partagées avec d'autres méthodes (voir ci-dessous). Nous allons donc appeler la valeur dans la pile X, et n'oubliez pas que dans la fonction `splitter()` la valeur de ce X est 0xA0.

| Décalage | Opcode     | Pile        |
| --------:| ---------- | ----------- |
|       E4 | JUMPDEST   | X           |
|       E5 | PUSH1 0x40 | 0x40 X      |
|       E7 | MLOAD      | 0x80 X      |
|       E8 | DUP1       | 0x80 0x80 X |
|       E9 | SWAP2      | X 0x80 0x80 |
|       EA | SUB        | X-0x80 0x80 |
|       EB | SWAP1      | 0x80 X-0x80 |
|       EC | RETOUR     |             |

Ce code reçoit un pointeur de mémoire dans la pile (X), et entraîne le contrat à `RETURN` avec un tampon qui est 0x80 - X.

Dans le cas de `splitter()`, ceci retourne l'adresse pour laquelle nous sommes un proxy. `RETURN` retourne le tampon en 0x80-0x9F, où nous avons écrit ces données (décalage 0x130 ci-dessus).

## currentWindow() {#currentwindow}

Le code aux décalages 0x158-0x163 est identique à ce que nous avons vu en 0x103-0x10E dans `splitter()` (autre que la destination `JUMPI`), donc nous savons que `currentWindow()` n'est pas `payable` non plus.

| Décalage | Opcode       | Pile                 |
| --------:| ------------ | -------------------- |
|      164 | JUMPDEST     |                      |
|      165 | POP          |                      |
|      166 | PUSH2 0x00da | 0xDA                 |
|      169 | PUSH1 0x01   | 0x01 0xDA            |
|      16B | SLOAD        | Storage[1] 0xDA      |
|      16C | DUP2         | 0xDA Storage[1] 0xDA |
|      16D | JUMP         | Storage[1] 0xDA      |

### Le code DA {#the-da-code}

Ce code est aussi partagé avec d'autres méthodes. Nous allons donc appeler la valeur dans la pile Y, et n'oubliez pas que dans la fonction `currentWindow()` la valeur de ce Y est Stockage[1].

| Décalage | Opcode     | Pile             |
| --------:| ---------- | ---------------- |
|       DA | JUMPDEST   | Y 0xDA           |
|       DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|       DD | MLOAD      | 0x80 Y 0xDA      |
|       DE | SWAP1      | Y 0x80 0xDA      |
|       DF | DUP2       | 0x80 Y 0x80 0xDA |
|       E0 | MSTORE     | 0x80 0xDA        |

Écrire Y à 0x80-0x9F.

| Décalage | Opcode     | Pile           |
| --------:| ---------- | -------------- |
|       E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|       E3 | ADD        | 0xA0 0xDA      |

Et le reste est déjà expliqué [au-dessus](#the-e4-code). Donc les sauts à 0xDA écrivent la pile supérieure (Y) à 0x80-0x9F, et retournent cette valeur. Dans le cas de `currentWindow()`, il retourne Stockage[1].

## merkleRoot() {#merkleroot}

Le code aux décalages 0xED-0xF8 est identique à ce que nous avons vu en 0x103-0x10E dans `splitter()` (autre que la destination `JUMPI`), donc nous savons que `merkleRoot()` n'est pas `payable` non plus.

| Décalage | Opcode       | Pile                 |
| --------:| ------------ | -------------------- |
|       F9 | JUMPDEST     |                      |
|       FA | POP          |                      |
|       FB | PUSH2 0x00da | 0xDA                 |
|       FE | PUSH1 0x00   | 0x00 0xDA            |
|      100 | SLOAD        | Storage[0] 0xDA      |
|      101 | DUP2         | 0xDA Storage[0] 0xDA |
|      102 | JUMP         | Storage[0] 0xDA      |

[Nous avons déjà compris](#the-da-code) ce qu'il se passe après le saut. Donc `merkleRoot()` retourne Stockage[0].

## 0x81e580d3 {#0x81e580d3}

Le code aux décalages 0x138-0x143 est identique à ce que nous avons vu en 0x103-0x10E dans `splitter()` (autre que la destination `JUMPI`), donc nous savons que cette fonction n'est pas `payable` non plus.

| Décalage | Opcode       | Pile                                                         |
| --------:| ------------ | ------------------------------------------------------------ |
|      144 | JUMPDEST     |                                                              |
|      145 | POP          |                                                              |
|      146 | PUSH2 0x00da | 0xDA                                                         |
|      149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|      14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|      14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|      14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|      152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|      18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|      190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|      192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|      194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|      195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|      196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|      197 | SLT          | CALLDATASIZE-4<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|      198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|      199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|      19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Il semblerait que cette fonction prenne au moins 32 octets (un mot) de données d'appel.

| Décalage | Opcode | Pile                                         |
| --------:| ------ | -------------------------------------------- |
|      19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|      19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|      19F | REVERT |                                              |

Si elle ne récupère pas les données d'appel, la transaction est annulée sans aucune donnée retournée.

Voyons ce qui se passe si la fonction _obtient_ les données d'appel dont elle a besoin.

| Décalage | Opcode       | Pile                                     |
| --------:| ------------ | ---------------------------------------- |
|      1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|      1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|      1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` est le premier mot des données d'appel _après_ la signature de la méthode

| Décalage | Opcode       | Pile                                                                         |
| --------:| ------------ | ---------------------------------------------------------------------------- |
|      1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|      1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|      1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|      1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|      153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|      154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|      157 | JUMP         | calldataload(4) 0xDA                                                         |
|      16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|      16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|      171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|      172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|      173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|      174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|      175 | LT           | calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|      176 | PUSH2 0x017e | 0x017EC calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|      179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Si le premier mot n'est pas inférieur à Stockage[4], la fonction échoue. Elle s'annule sans valeur retournée :

| Décalage | Opcode     | Pile          |
| --------:| ---------- | ------------- |
|      17A | PUSH1 0x00 | 0x00 ...      |
|      17C | DUP1       | 0x00 0x00 ... |
|      17D | REVERT     |               |

Si le calldataload(4) est inférieur au Stockage[4], nous obtenons ce code :

| Décalage | Opcode     | Pile                                                |
| --------:| ---------- | --------------------------------------------------- |
|      17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|      17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|      181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|      182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|      183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

Et les emplacements mémoire 0x00-0x1F contiennent maintenant les données 0x04 (0x00-0x1E sont tous des zéros, 0x1F est quatre)

| Décalage | Opcode     | Pile                                                                    |
| --------:| ---------- | ----------------------------------------------------------------------- |
|      184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|      186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|      187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|      188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|      189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|      18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Il y a une table de recherche dans le stockage, qui commence à SHA3 de 0x000... 004 et a une entrée pour chaque valeur légitime de données d'appel (valeur au-dessous de Stockage[4]).

| Décalage | Opcode | Pile                                                                    |
| --------:| ------ | ----------------------------------------------------------------------- |
|      18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|      18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|      18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|      18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Nous savons déjà ce que fait [le code à la valeur décalée 0xDA](#the-da-code) , il retourne la valeur la plus élevée de la pile à l'appelant. Ainsi, cette fonction retourne la valeur de la table de recherche à l'appelant.

## 0x1f135823 {#0x1f135823}

Le code aux décalages 0xC4-0xCF est identique à ce que nous avons vu en 0x103-0x10E dans `splitter()` (autre que la destination `JUMPI`), donc nous savons que cette fonction n'est pas `payable` non plus.

| Décalage | Opcode       | Pile                |
| --------:| ------------ | ------------------- |
|       D0 | JUMPDEST     |                     |
|       D1 | POP          |                     |
|       D2 | PUSH2 0x00da | 0xDA                |
|       D5 | PUSH1 0x06   | 0x06 0xDA           |
|       D7 | SLOAD        | Value\* 0xDA      |
|       D8 | DUP2         | 0xDA Value\* 0xDA |
|       D9 | JUMP         | Value\* 0xDA      |

Nous savons déjà ce que fait [le code à la position 0xDA](#the-da-code) , il retourne la valeur la plus élevée de la pile à l'appelant. Donc cette fonction retourne `Value*`.

### Résumé de la méthode {#method-summary}

Avez-vous l'impression de comprendre le contrat à ce stade ? Non. Jusqu'à présent, nous disposons de ces méthodes :

| Méthode                           | Signification                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Transférer                        | Accepte la valeur fournie par l'appel et augmente `Value*` de ce montant                               |
| [splitter()](#splitter)           | Return Storage[3], the proxy address                                                                   |
| [currentWindow()](#currentwindow) | Return Storage[1]                                                                                      |
| [merkleRoot()](#merkeroot)        | Return Storage[0]                                                                                      |
| [0x81e580d3](#0x81e580d3)         | Retourne la valeur d'une table de recherche, à condition que le paramètre soit inférieur à Stockage[4] |
| [0x1f135823](#0x1f135823)         | Return Storage[6], a.k.a. Value\*                                                                    |

Mais nous savons que toute autre fonctionnalité est fournie par le contrat dans Stockage[3]. Peut-être que si nous savions quel est ce contrat, cela nous donnerait un indice. Heureusement, ceci est la blockchain et tout est connu, du moins en théorie. Nous n'avons pas vu de méthode qui définisse Stockage[3], donc il doit avoir été défini par le constructeur.

## Le Constructeur {#the-constructor}

Lorsque nous [regardons un contrat](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) nous pouvons également voir la transaction qui l'a créée.

![Cliquez sur la transaction de création](create-tx.png)

Si nous cliquons sur cette transaction, puis sur l'onglet **État** , nous pouvons voir les valeurs initiales des paramètres. Plus précisément, nous pouvons voir que Stockage[3] contient [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Ce contrat doit contenir la fonctionnalité manquante. Nous pouvons le comprendre en utilisant les mêmes outils que ceux utilisés pour le contrat que nous étudions.

## Le contrat de proxy {#the-proxy-contract}

En utilisant les mêmes techniques que celles utilisées pour le contrat original ci-dessus, nous pouvons voir que le contrat est annulé si :

- Il y a de l'ETH joint à l'appel (0x05-0x0F)
- La taille des données d'appel est inférieure à quatre (0x10-0x19 et 0xBE-0xC2)

Et que les méthodes qu'il supporte sont :

| Méthode                                                                                                         | Signature de la méthode      | Décalage vers lequel sauter |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/x/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135                      |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151                      |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4                      |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110                      |
| ???                                                                                                             | 0x3f26479e                   | 0x0118                      |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3                      |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148                      |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107                      |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122                      |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8                      |

Nous pouvons ignorer les quatre dernières méthodes parce que nous ne les atteindrons jamais. Leurs signatures sont telles que notre contrat original les prend en charge par lui-même (vous pouvez cliquer sur les signatures pour voir les détails ci-dessus), donc elles doivent être des [méthodes qui sont contournées](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Une des méthodes restantes est `claim(<params>)`, et une autre est `isClaimed(<params>)`, donc cela ressemble à un contrat d'airdrop. Au lieu de fouiller le code d'opération restant par opcode, nous pouvons [essayer le décompilateur](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), qui donne des résultats utilisables pour trois fonctions de ce contrat. La rétro-conception des autres est laissée au lecteur comme exercice de travail.

### scaleAmountByPercentage {#scaleamountbypercentage}

Voilà ce que nous donne le décompilateur pour cette fonction :

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Le premier `require` vérifie que les données d'appel ont, en plus des quatre octets de la signature de la fonction, au moins 64 octets, assez pour les deux paramètres. Si ce n'est pas le cas, il y a évidemment quelque chose qui ne va pas.

L'instruction `if` semble vérifier que `_param1` n'est pas zéro et que `_param1 * _param2` n'est pas négatif. C'est probablement pour éviter des cas de renvoi à la ligne.

Enfin, la fonction retourne une valeur mise à l'échelle.

### claim {#claim}

Le code que le décompilateur crée est complexe, et tout n'est pas pertinent pour nous. Je vais en passer une partie pour me concentrer sur les lignes qui je pense fournissent des informations utiles

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Nous voyons ici deux choses importantes :

- `_param2`, bien qu'il soit déclaré comme un `uint256`, est en fait une adresse
- `_param1` est la fenêtre revendiquée, qui doit être `currentWindow` ou antérieure.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Nous savons donc maintenant que Stockage[5] est un tableau de fenêtres et d'adresses, et si l'adresse a réclamé la récompense pour cette fenêtre.

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

C’est ainsi qu’un contrat transfère son propre ETH à une autre adresse (contrat ou propriété externe). Il l'appelle avec une valeur qui est le montant à transférer. On dirait donc qu'il s'agit d'un airdrop d'ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Les deux dernières lignes nous disent que Stockage[2] est également un contrat que nous appelons. Si nous [regardons la transaction constructeur](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) nous voyons que ce contrat est [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), un contrat de Wrapped Ether[dont le code source a été téléchargé sur Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Il semble donc que les contrats tentent d'envoyer de l'ETH à `_param2`. S'ils peuvent le faire, très bien. Sinon, il tente d'envoyer [WETH](https://weth.tkn.eth.limo/). Si `_param2` est un compte externe (EOA) alors il peut toujours recevoir de l'ETH, mais les contrats peuvent refuser de recevoir de l'ETH. Cependant, WETH est ERC-20 et les contrats ne peuvent pas refuser de l'accepter.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

À la fin de la fonction, nous voyons qu'une entrée de journal est générée. [Regardez les entrées de journal générées](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) et filtrez sur le sujet qui commence par `0xdbd5...`. Si nous [cliquons sur l'une des transactions qui ont généré une telle entrée](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) nous voyons qu'effectivement cela ressemble à une demande - le compte a envoyé un message au contrat que nous rétro-concevons et a reçu de l'ETH en retour.

![Une transaction de réclamation](claim-tx.png)

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

La principale différence est que le premier paramètre, la fenêtre du retrait, n'est pas là. Au lieu de cela, il y a une boucle sur toutes les fenêtres qui pourraient être réclamées.

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

Donc elle ressemble à une variante de `claim` qui réclame toutes les fenêtres.

## Conclusion {#conclusion}

À présent, vous devriez savoir comment comprendre les contrats dont le code source n'est pas disponible, en utilisant soit les codes d'opérations soit (quand cela fonctionne) le décompilateur. Comme le montre la longueur de cet article, rétro-concevoir un contrat n'est pas trivial, mais dans un système où la sécurité est essentielle, il est important d'être capable de vérifier que les contrats fonctionnent comme promis.
