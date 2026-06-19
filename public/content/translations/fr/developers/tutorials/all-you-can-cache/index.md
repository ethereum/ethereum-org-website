---
title: "Mise en cache à volonté"
description: "Apprenez à créer et utiliser un contrat de mise en cache pour des transactions de rollup moins chères"
author: Ori Pomerantz
tags: ["couche 2", "mise en cache", "stockage", "mise à l'échelle"]
skill: intermediate
breadcrumb: Mise en cache pour les rollup
published: 2022-09-15
lang: fr
---

Lors de l'utilisation de rollup, le coût d'un octet dans la transaction est beaucoup plus élevé que le coût d'un créneau de stockage. Par conséquent, il est judicieux de mettre en cache autant d'informations que possible onchain.

Dans cet article, vous apprendrez à créer et à utiliser un contrat de mise en cache de telle sorte que toute valeur de paramètre susceptible d'être utilisée plusieurs fois soit mise en cache et disponible pour être utilisée (après la première fois) avec un nombre d'octets beaucoup plus petit, et comment écrire du code hors chaîne qui utilise ce cache.

Si vous souhaitez ignorer l'article et voir directement le code source, [il se trouve ici](https://github.com/qbzzt/20220915-all-you-can-cache). La pile de développement est [Foundry](https://getfoundry.sh/introduction/installation/).

## Conception globale {#overall-design}

Par souci de simplicité, nous supposerons que tous les paramètres de transaction sont des `uint256`, d'une longueur de 32 octets. Lorsque nous recevons une transaction, nous analyserons chaque paramètre comme suit :

1. Si le premier octet est `0xFF`, prenez les 32 octets suivants comme valeur de paramètre et écrivez-la dans le cache.

2. Si le premier octet est `0xFE`, prenez les 32 octets suivants comme valeur de paramètre mais ne l'écrivez _pas_ dans le cache.

3. Pour toute autre valeur, prenez les quatre bits de poids fort comme nombre d'octets supplémentaires, et les quatre bits de poids faible comme bits les plus significatifs de la clé de cache. Voici quelques exemples :

   | Octets dans les données d'appel | Clé de cache |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## Manipulation du cache {#cache-manipulation}

Le cache est implémenté dans [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Passons-le en revue ligne par ligne.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Ces constantes sont utilisées pour interpréter les cas particuliers où nous fournissons toutes les informations et souhaitons ou non qu'elles soient écrites dans le cache. L'écriture dans le cache nécessite deux opérations [`SSTORE`](https://www.evm.codes/#55) dans des créneaux de stockage précédemment inutilisés pour un coût de 22 100 gaz chacune, nous la rendons donc facultative.

```solidity

    mapping(uint => uint) public val2key;
```

Un [mapping](https://www.geeksforgeeks.org/solidity/solidity-mappings/) entre les valeurs et leurs clés. Cette information est nécessaire pour encoder les valeurs avant d'envoyer la transaction.

```solidity
    // L'emplacement n a la valeur pour la clé n+1, car nous devons préserver
    // zéro comme "pas dans le cache".
    uint[] public key2val;
```

Nous pouvons utiliser un tableau pour le mapping des clés vers les valeurs car nous attribuons les clés, et par souci de simplicité, nous le faisons de manière séquentielle.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Lire une valeur depuis le cache.

```solidity
    // Écrire une valeur dans le cache si elle n'y est pas déjà
    // Uniquement public pour permettre au test de fonctionner
    function cacheWrite(uint _value) public returns (uint) {
        // Si la valeur est déjà dans le cache, renvoyer la clé actuelle
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Il ne sert à rien de placer la même valeur dans le cache plus d'une fois. Si la valeur s'y trouve déjà, il suffit de renvoyer la clé existante.

```solidity
        // Puisque 0xFE est un cas particulier, la plus grande clé que le cache peut
        // contenir est 0x0D suivi de 15 0xFF. Si la longueur du cache est déjà aussi
        // grande, échouer.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Je ne pense pas que nous aurons un jour un cache aussi grand (environ 1,8\*10<sup>37</sup> entrées, ce qui nécessiterait environ 10<sup>27</sup> To de stockage). Cependant, je suis assez vieux pour me souvenir que ["640 ko seraient toujours suffisants"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Ce test est très peu coûteux.

```solidity
        // Écrire la valeur en utilisant la clé suivante
        val2key[_value] = key2val.length+1;
```

Ajouter la recherche inversée (de la valeur vers la clé).

```solidity
        key2val.push(_value);
```

Ajouter la recherche directe (de la clé vers la valeur). Comme nous attribuons les valeurs de manière séquentielle, nous pouvons simplement l'ajouter après la dernière valeur du tableau.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Renvoyer la nouvelle longueur de `key2val`, qui est la cellule où la nouvelle valeur est stockée.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Cette fonction lit une valeur à partir des données d'appel d'une longueur arbitraire (jusqu'à 32 octets, la taille du mot).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Cette fonction est interne, donc si le reste du code est écrit correctement, ces tests ne sont pas nécessaires. Cependant, ils ne coûtent pas cher, autant les inclure.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Ce code est en [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Il lit une valeur de 32 octets à partir des données d'appel. Cela fonctionne même si les données d'appel s'arrêtent avant `startByte+32` car l'espace non initialisé dans l'EVM est considéré comme étant nul.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Nous ne voulons pas nécessairement une valeur de 32 octets. Cela permet de se débarrasser des octets excédentaires.

```solidity
        return _retVal;
    } // _calldataVal


    // Lire un seul paramètre à partir des données d'appel, en commençant à _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Lire un seul paramètre à partir des données d'appel. Notez que nous devons renvoyer non seulement la valeur que nous avons lue, mais aussi l'emplacement de l'octet suivant car les paramètres peuvent avoir une longueur allant de 1 à 33 octets.

```solidity
        // Le premier octet nous indique comment interpréter le reste
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity essaie de réduire le nombre de bugs en interdisant les [conversions de type implicites](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) potentiellement dangereuses. Une réduction, par exemple de 256 bits à 8 bits, doit être explicite.

```solidity

        // Lire la valeur, mais ne pas l'écrire dans le cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Lire la valeur, et l'écrire dans le cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Si nous sommes arrivés ici, cela signifie que nous devons lire à partir du cache

        // Nombre d'octets supplémentaires à lire
        uint8 _extraBytes = _firstByte / 16;
```

Prendre le [quartet](https://en.wikipedia.org/wiki/Nibble) inférieur et le combiner avec les autres octets pour lire la valeur depuis le cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Lire n paramètres (les fonctions savent combien de paramètres elles attendent)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Nous pourrions obtenir le nombre de paramètres que nous avons à partir des données d'appel elles-mêmes, mais les fonctions qui nous appellent savent combien de paramètres elles attendent. Il est plus simple de les laisser nous le dire.

```solidity
        // Les paramètres que nous lisons
        uint[] memory params = new uint[](_paramNum);

        // Les paramètres commencent à l'octet 4, avant cela c'est la signature de la fonction
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Lisez les paramètres jusqu'à ce que vous ayez le nombre dont vous avez besoin. Si nous dépassons la fin des données d'appel, `_readParams` annulera l'appel.

```solidity

        return(params);
    }   // readParams

    // Pour tester _readParams, tester la lecture de quatre paramètres
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Un grand avantage de Foundry est qu'il permet d'écrire des tests en Solidity ([voir Tester le cache ci-dessous](#testing-the-cache)). Cela facilite grandement les tests unitaires. Il s'agit d'une fonction qui lit quatre paramètres et les renvoie afin que le test puisse vérifier qu'ils étaient corrects.

```solidity
    // Obtenir une valeur, renvoyer les octets qui l'encoderont (en utilisant le cache si possible)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` est une fonction que le code hors chaîne appelle pour aider à créer des données d'appel qui utilisent le cache. Elle reçoit une seule valeur et renvoie les octets qui l'encodent. Cette fonction est une `view`, elle ne nécessite donc pas de transaction et, lorsqu'elle est appelée en externe, ne coûte aucun gaz.

```solidity
        uint _key = val2key[_val];

        // La valeur n'est pas encore dans le cache, l'ajouter
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Dans l'[EVM](/developers/docs/evm/), tout stockage non initialisé est supposé être constitué de zéros. Donc, si nous cherchons la clé d'une valeur qui ne s'y trouve pas, nous obtenons un zéro. Dans ce cas, les octets qui l'encodent sont `INTO_CACHE` (elle sera donc mise en cache la prochaine fois), suivis de la valeur réelle.

```solidity
        // Si la clé est <0x10, la renvoyer comme un seul octet
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Les octets uniques sont les plus simples. Nous utilisons simplement [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) pour transformer un type `bytes<n>` en un tableau d'octets qui peut être de n'importe quelle longueur. Malgré son nom, cela fonctionne très bien lorsqu'il est fourni avec un seul argument.

```solidity
        // Valeur de deux octets, encodée comme 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Lorsque nous avons une clé inférieure à 16<sup>3</sup>, nous pouvons l'exprimer sur deux octets. Nous convertissons d'abord `_key`, qui est une valeur de 256 bits, en une valeur de 16 bits et utilisons un OU logique pour ajouter le nombre d'octets supplémentaires au premier octet. Ensuite, nous la plaçons simplement dans une valeur `bytes2`, qui peut être convertie en `bytes`.

```solidity
        // Il y a probablement une façon intelligente de faire les lignes suivantes comme une boucle,
        // mais c'est une fonction view donc j'optimise pour le temps du programmeur et
        // la simplicité.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

Les autres valeurs (3 octets, 4 octets, etc.) sont gérées de la même manière, avec simplement des tailles de champ différentes.

```solidity
        // Si nous arrivons ici, quelque chose ne va pas.
        revert("Error in encodeVal, should not happen");
```

Si nous arrivons ici, cela signifie que nous avons obtenu une clé qui n'est pas inférieure à 16\*256<sup>15</sup>. Mais `cacheWrite` limite les clés, nous ne pouvons donc même pas atteindre 14\*256<sup>16</sup> (qui aurait un premier octet de 0xFE, et ressemblerait donc à `DONT_CACHE`). Mais cela ne nous coûte pas grand-chose d'ajouter un test au cas où un futur programmeur introduirait un bug.

```solidity
    } // encodeVal

}  // Cache
```

### Tester le cache {#testing-the-cache}

L'un des avantages de Foundry est qu'[il vous permet d'écrire des tests en Solidity](https://getfoundry.sh/forge/tests/overview/), ce qui facilite l'écriture de tests unitaires. Les tests pour la classe `Cache` se trouvent [ici](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Étant donné que le code de test est répétitif, comme le sont souvent les tests, cet article n'explique que les parties intéressantes.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Besoin d'exécuter `forge test -vv` pour la console.
import "forge-std/console.sol";
```

Il s'agit simplement de code passe-partout nécessaire pour utiliser le package de test et `console.log`.

```solidity
import "src/Cache.sol";
```

Nous devons connaître le contrat que nous testons.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

La fonction `setUp` est appelée avant chaque test. Dans ce cas, nous créons simplement un nouveau cache, afin que nos tests ne s'affectent pas mutuellement.

```solidity
    function testCaching() public {
```

Les tests sont des fonctions dont les noms commencent par `test`. Cette fonction vérifie la fonctionnalité de base du cache, en écrivant des valeurs et en les relisant.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

C'est ainsi que vous effectuez les tests réels, en utilisant les [fonctions `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). Dans ce cas, nous vérifions que la valeur que nous avons écrite est celle que nous lisons. Nous pouvons ignorer le résultat de `cache.cacheWrite` car nous savons que les clés de cache sont attribuées de manière linéaire.

```solidity
        }
    }    // testCaching


    // Mettre en cache la même valeur plusieurs fois, s'assurer que la clé reste
    // la même
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Tout d'abord, nous écrivons chaque valeur deux fois dans le cache et nous nous assurons que les clés sont les mêmes (ce qui signifie que la deuxième écriture n'a pas vraiment eu lieu).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

En théorie, il pourrait y avoir un bug qui n'affecte pas les écritures consécutives dans le cache. Donc, ici, nous effectuons quelques écritures qui ne sont pas consécutives et nous constatons que les valeurs ne sont toujours pas réécrites.

```solidity
    // Lire un uint à partir d'un tampon mémoire (pour s'assurer que nous récupérons les paramètres
    // que nous avons envoyés)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Lire un mot de 256 bits à partir d'un tampon `bytes memory`. Cette fonction utilitaire nous permet de vérifier que nous recevons les résultats corrects lorsque nous exécutons un appel de fonction qui utilise le cache.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul ne prend pas en charge les structures de données au-delà de `uint256`, donc lorsque vous faites référence à une structure de données plus sophistiquée, telle que le tampon mémoire `_bytes`, vous obtenez l'adresse de cette structure. Solidity stocke les valeurs `bytes memory` sous la forme d'un mot de 32 octets qui contient la longueur, suivi des octets réels, donc pour obtenir l'octet numéro `_start`, nous devons calculer `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Signature de fonction pour fourParams(), avec l'aimable autorisation de
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Juste quelques valeurs constantes pour voir que nous récupérons les bonnes valeurs
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Quelques constantes dont nous avons besoin pour les tests.

```solidity
    function testReadParam() public {
```

Appeler `fourParams()`, une fonction qui utilise `readParams`, pour tester que nous pouvons lire les paramètres correctement.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Nous ne pouvons pas utiliser le mécanisme ABI normal pour appeler une fonction utilisant le cache, nous devons donc utiliser le mécanisme de bas niveau [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Ce mécanisme prend un `bytes memory` en entrée et le renvoie (ainsi qu'une valeur booléenne) en sortie.

```solidity
        // Premier appel, le cache est vide
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Il est utile pour le même contrat de prendre en charge à la fois les fonctions mises en cache (pour les appels directs depuis les transactions) et les fonctions non mises en cache (pour les appels depuis d'autres contrats intelligents). Pour ce faire, nous devons continuer à nous appuyer sur le mécanisme Solidity pour appeler la bonne fonction, au lieu de tout mettre dans [une fonction `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Cela facilite grandement la composabilité. Un seul octet suffirait à identifier la fonction dans la plupart des cas, nous gaspillons donc trois octets (16\*3=48 gaz). Cependant, au moment où j'écris ces lignes, ces 48 gaz coûtent 0,07 centime, ce qui est un coût raisonnable pour un code plus simple et moins sujet aux bugs.

```solidity
            // Première valeur, l'ajouter au cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

La première valeur : un indicateur signalant qu'il s'agit d'une valeur complète qui doit être écrite dans le cache, suivi des 32 octets de la valeur. Les trois autres valeurs sont similaires, à l'exception du fait que `VAL_B` n'est pas écrit dans le cache et que `VAL_C` est à la fois le troisième et le quatrième paramètre.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

C'est ici que nous appelons réellement le contrat `Cache`.

```solidity
        assertEq(_success, true);
```

Nous nous attendons à ce que l'appel réussisse.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Nous commençons avec un cache vide, puis nous ajoutons `VAL_A` suivi de `VAL_C`. Nous nous attendons à ce que le premier ait la clé 1, et le second la clé 2.

```
assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

La sortie correspond aux quatre paramètres. Ici, nous vérifions qu'elle est correcte.

```solidity
        // Deuxième appel, nous pouvons utiliser le cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Première valeur dans le Cache
            bytes1(0x01),
```

Les clés de cache inférieures à 16 ne font qu'un seul octet.

```solidity
            // Deuxième valeur, ne pas l'ajouter au cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Troisième et quatrième valeurs, même valeur
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Les tests après l'appel sont identiques à ceux après le premier appel.

```solidity
    function testEncodeVal() public {
```

Cette fonction est similaire à `testReadParam`, sauf qu'au lieu d'écrire les paramètres explicitement, nous utilisons `encodeVal()`.

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

Le seul test supplémentaire dans `testEncodeVal()` consiste à vérifier que la longueur de `_callInput` est correcte. Pour le premier appel, elle est de 4+33\*4. Pour le second, où chaque valeur est déjà dans le cache, elle est de 4+1\*4.

```solidity
    // Tester encodeVal lorsque la clé fait plus d'un seul octet
    // Maximum trois octets car remplir le cache à quatre octets prend
    // trop de temps.
    function testEncodeValBig() public {
        // Mettre un certain nombre de valeurs dans le cache.
        // Pour garder les choses simples, utiliser la clé n pour la valeur n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

La fonction `testEncodeVal` ci-dessus n'écrit que quatre valeurs dans le cache, donc [la partie de la fonction qui traite les valeurs multi-octets](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) n'est pas vérifiée. Mais ce code est compliqué et sujet aux erreurs.

La première partie de cette fonction est une boucle qui écrit toutes les valeurs de 1 à 0x1FFF dans le cache dans l'ordre, afin que nous puissions encoder ces valeurs et savoir où elles vont.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Un octet        0x0F
            cache.encodeVal(0x0010),   // Deux octets     0x1010
            cache.encodeVal(0x0100),   // Deux octets     0x1100
            cache.encodeVal(0x1000)    // Trois octets 0x201000
        );
```

Tester les valeurs d'un octet, de deux octets et de trois octets. Nous ne testons pas au-delà car il faudrait trop de temps pour écrire suffisamment d'entrées dans la pile (au moins 0x10000000, soit environ un quart de milliard).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Tester qu'avec un tampon excessivement petit nous obtenons une annulation
    function testShortCalldata() public {
```

Tester ce qui se passe dans le cas anormal où il n'y a pas assez de paramètres.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Puisqu'il annule, le résultat que nous devrions obtenir est `false`.

```
// Appel avec des clés de cache qui ne sont pas là
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Première valeur, l'ajouter au cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Deuxième valeur
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Cette fonction obtient quatre paramètres parfaitement légitimes, sauf que le cache est vide, il n'y a donc aucune valeur à y lire.

```solidity
        .
        .
        .
    // Tester qu'avec un tampon excessivement long tout fonctionne correctement
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Premier appel, le cache est vide
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Première valeur, l'ajouter au cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Deuxième valeur, l'ajouter au cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Troisième valeur, l'ajouter au cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Quatrième valeur, l'ajouter au cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // Et une autre valeur pour la "bonne chance"
            bytes4(0x31112233)
        );
```

Cette fonction envoie cinq valeurs. Nous savons que la cinquième valeur est ignorée car ce n'est pas une entrée de cache valide, ce qui aurait provoqué une annulation si elle n'avait pas été incluse.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Un exemple d'application {#a-sample-app}

Écrire des tests en Solidity est une très bonne chose, mais en fin de compte, une application décentralisée (dapp) doit être capable de traiter des requêtes provenant de l'extérieur de la chaîne pour être utile. Cet article montre comment utiliser la mise en cache dans une dapp avec `WORM`, qui signifie "Write Once, Read Many" (Écrire une fois, lire plusieurs fois). Si une clé n'est pas encore écrite, vous pouvez y écrire une valeur. Si la clé est déjà écrite, vous obtenez une annulation.

### Le contrat {#the-contract}

[Voici le contrat](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Il répète en grande partie ce que nous avons déjà fait avec `Cache` et `CacheTest`, nous ne couvrons donc que les parties intéressantes.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

La façon la plus simple d'utiliser `Cache` est d'en hériter dans notre propre contrat.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Cette fonction est similaire à `fourParam` dans `CacheTest` ci-dessus. Comme nous ne suivons pas les spécifications de l'ABI, il est préférable de ne déclarer aucun paramètre dans la fonction.

```solidity
    // Rendre plus facile de nous appeler
    // Signature de fonction pour writeEntryCached(), avec l'aimable autorisation de
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Le code externe qui appelle `writeEntryCached` devra construire manuellement les données d'appel, au lieu d'utiliser `worm.writeEntryCached`, car nous ne suivons pas les spécifications de l'ABI. Avoir cette valeur constante facilite simplement son écriture.

Notez que même si nous définissons `WRITE_ENTRY_CACHED` comme une variable d'état, pour la lire en externe, il est nécessaire d'utiliser sa fonction getter, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

La fonction de lecture est une `view`, elle ne nécessite donc pas de transaction et ne coûte pas de gaz. Par conséquent, il n'y a aucun avantage à utiliser le cache pour le paramètre. Avec les fonctions de vue, il est préférable d'utiliser le mécanisme standard qui est plus simple.

### Le code de test {#the-testing-code}

[Voici le code de test pour le contrat](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Encore une fois, ne regardons que ce qui est intéressant.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[C'est ainsi (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) que nous spécifions dans un test Foundry que le prochain appel doit échouer, ainsi que la raison signalée pour un échec. Cela s'applique lorsque nous utilisons la syntaxe `<contract>.<function name>()` plutôt que de construire les données d'appel et d'appeler le contrat en utilisant l'interface de bas niveau (`<contract>.call()`, etc.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Ici, nous utilisons le fait que `cacheWrite` renvoie la clé de cache. Ce n'est pas quelque chose que nous nous attendrions à utiliser en production, car `cacheWrite` modifie l'état, et ne peut donc être appelé que lors d'une transaction. Les transactions n'ont pas de valeurs de retour ; si elles ont des résultats, ces résultats sont censés être émis sous forme d'événements. La valeur de retour de `cacheWrite` n'est donc accessible qu'à partir du code onchain, et le code onchain n'a pas besoin de la mise en cache des paramètres.

```solidity
        (_success,) = address(worm).call(_callInput);
```

C'est ainsi que nous disons à Solidity que bien que `<contract address>.call()` ait deux valeurs de retour, seule la première nous intéresse.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Puisque nous utilisons la fonction de bas niveau `<address>.call()`, nous ne pouvons pas utiliser `vm.expectRevert()` et devons examiner la valeur booléenne de succès que nous obtenons de l'appel.

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

C'est ainsi que nous vérifions que le code [émet correctement un événement](https://getfoundry.sh/reference/cheatcodes/expect-emit/) dans Foundry.

### Le client {#the-client}

Une chose que vous n'obtenez pas avec les tests Solidity, c'est du code JavaScript que vous pouvez copier-coller dans votre propre application. Pour écrire ce code, j'ai déployé WORM sur [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), le nouveau réseau de test d'[Optimism](https://www.optimism.io/). Il se trouve à l'adresse [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Vous pouvez voir le code JavaScript pour le client ici](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Pour l'utiliser :

1. Clonez le dépôt git :

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Installez les packages nécessaires :

   ```sh
   cd javascript
   yarn
   ```

3. Copiez le fichier de configuration :

   ```sh
   cp .env.example .env
   ```

4. Modifiez `.env` pour votre configuration :

   | Paramètre           | Valeur                                                                                                                                                               |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC            | La phrase mnémonique d'un compte qui a suffisamment d'ETH pour payer une transaction. [Vous pouvez obtenir des ETH gratuits pour le réseau Optimism Goerli ici](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | L'URL vers Optimism Goerli. Le point de terminaison public, `https://goerli.optimism.io`, est limité en débit mais suffisant pour ce dont nous avons besoin ici                                      |

5. Exécutez `index.js`.

   ```sh
   node index.js
   ```

   Cet exemple d'application écrit d'abord une entrée dans WORM, en affichant les données d'appel et un lien vers la transaction sur Etherscan. Ensuite, il relit cette entrée et affiche la clé qu'il utilise ainsi que les valeurs de l'entrée (valeur, numéro de bloc et auteur).

La majeure partie du client est du JavaScript de dapp normal. Donc, encore une fois, nous ne passerons en revue que les parties intéressantes.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Besoin d'une nouvelle clé à chaque fois
    const key = await worm.encodeVal(Number(new Date()))
```

Un créneau donné ne peut être écrit qu'une seule fois, nous utilisons donc l'horodatage pour nous assurer de ne pas réutiliser les créneaux.

```javascript
const val = await worm.encodeVal("0x600D")

// Écrire une entrée
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers s'attend à ce que les données d'appel soient une chaîne hexadécimale, `0x` suivie d'un nombre pair de chiffres hexadécimaux. Comme `key` et `val` commencent tous deux par `0x`, nous devons supprimer ces en-têtes.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Comme pour le code de test Solidity, nous ne pouvons pas appeler une fonction mise en cache normalement. Au lieu de cela, nous devons utiliser un mécanisme de plus bas niveau.

```javascript
    .
    .
    .
    // Lire l'entrée qui vient d'être écrite
    const realKey = '0x' + key.slice(4)  // supprimer le drapeau FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Pour lire les entrées, nous pouvons utiliser le mécanisme normal. Il n'est pas nécessaire d'utiliser la mise en cache des paramètres avec les fonctions `view`.

## Conclusion {#conclusion}

Le code de cet article est une preuve de concept, le but est de rendre l'idée facile à comprendre. Pour un système prêt pour la production, vous souhaiterez peut-être implémenter des fonctionnalités supplémentaires :

- Gérer les valeurs qui ne sont pas des `uint256`. Par exemple, les chaînes de caractères.
- Au lieu d'un cache global, avoir peut-être un mapping entre les utilisateurs et les caches. Différents utilisateurs utilisent différentes valeurs.
- Les valeurs utilisées pour les adresses sont distinctes de celles utilisées à d'autres fins. Il pourrait être judicieux d'avoir un cache séparé uniquement pour les adresses.
- Actuellement, les clés de cache reposent sur un algorithme "premier arrivé, plus petite clé". Les seize premières valeurs peuvent être envoyées sous la forme d'un seul octet. Les 4080 valeurs suivantes peuvent être envoyées sur deux octets. Le million de valeurs suivant environ prend trois octets, etc. Un système de production devrait conserver des compteurs d'utilisation sur les entrées de cache et les réorganiser de sorte que les seize valeurs _les plus courantes_ fassent un octet, les 4080 valeurs les plus courantes suivantes fassent deux octets, etc.

  Cependant, il s'agit d'une opération potentiellement dangereuse. Imaginez la séquence d'événements suivante :

  1. Noam Naïf appelle `encodeVal` pour encoder l'adresse à laquelle il souhaite envoyer des jetons. Cette adresse est l'une des premières utilisées sur l'application, la valeur encodée est donc 0x06. Il s'agit d'une fonction `view`, et non d'une transaction, c'est donc entre Noam et le nœud qu'il utilise, et personne d'autre n'est au courant.

  2. Owen Propriétaire exécute l'opération de réorganisation du cache. Très peu de personnes utilisent réellement cette adresse, elle est donc désormais encodée sous la forme 0x201122. Une valeur différente, 10<sup>18</sup>, se voit attribuer 0x06.

  3. Noam Naïf envoie ses jetons à 0x06. Ils vont à l'adresse `0x0000000000000000000000000de0b6b3a7640000`, et comme personne ne connaît la clé privée de cette adresse, ils y restent bloqués. Noam n'est _pas content_.

  Il existe des moyens de résoudre ce problème, ainsi que le problème connexe des transactions qui se trouvent dans la mempool pendant la réorganisation du cache, mais vous devez en être conscient.

J'ai fait la démonstration de la mise en cache ici avec Optimism, car je suis un employé d'Optimism et c'est le rollup que je connais le mieux. Mais cela devrait fonctionner avec n'importe quel rollup qui facture un coût minimal pour le traitement interne, de sorte qu'en comparaison, l'écriture des données de transaction sur la couche 1 (l1) constitue la dépense principale.

[Voir ici pour plus de mes travaux](https://cryptodocguy.pro/).