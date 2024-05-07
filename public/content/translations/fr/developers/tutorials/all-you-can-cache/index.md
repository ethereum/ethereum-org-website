---
title: "Tout ce qui se cache"
description: Apprenez comment créer et utiliser un contrat de mise en cache pour des transactions moins chères sur le rollup
author: Ori Pomerantz
tags:
  - "Couche 2"
  - "mise en cache"
  - "stockage"
skill: intermediate
published: 2022-09-15
lang: fr
---

Lors de l'utilisation de rollups, le coût d'un octet dans la transaction est bien plus élevé que le coût d'un emplacement de stockage. Par conséquent, il est logique de mettre en cache autant d'informations que possible sur la blockchain.

Dans cet article, vous apprendrez comment créer et utiliser un contrat de mise en cache afin que toute valeur de paramètre susceptible d'être utilisée plusieurs fois soit mise en cache et disponible à l'utilisation (après la première fois) avec un nombre plus réduit d'octets, enfin vous apprendrez comment écrire du code qui utilise cette technique de mise en cache.

Si vous souhaitez ignorer l'article et simplement voir le code source, vous le trouverez [ici](https://github.com/qbzzt/20220915-all-you-can-cache). Le logiciel de développement utilisé est [Foundry](https://book.getfoundry.sh/getting-started/installation).

## Conception générale {#overall-design}

Pour simplifier, nous supposerons que tous les paramètres de transaction sont de type `uint256`, d'une longueur de 32 octets. Lorsque nous recevons une transaction, nous analyserons chaque paramètre de la manière suivante :

1. Si le premier octet est `0xFF`, prenez les 32 octets suivants comme valeur de paramètre et écrivez-la dans le cache.

2. Si le premier octet est `0xFE`, prenez les 32 octets suivants comme valeur de paramètre, mais _ne_ l'écrivez pas dans le cache.

3. Pour toute autre valeur, prenez les quatre premiers bits comme le nombre d'octets supplémentaires, et les quatre bits de fin comme les bits les plus significatifs de la clé de la mise en cache. Voici quelques exemples :

   | Octets dans les données d'appel | Clé de la mise en cache |
   |:------------------------------- | -----------------------:|
   | 0x0F                            |                    0x0F |
   | 0x10,0x10                       |                    0x10 |
   | 0x12,0xAC                       |                  0x02AC |
   | 0x2D,0xEA, 0xD6                 |                0x0DEAD6 |

## Manipulation du cache {#cache-manipulation}

La mise en cache est implémentée dans [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Revenons dessus ligne par ligne.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Ces constantes sont utilisées pour gérer les cas spéciaux où nous fournissons toutes les informations et souhaitons ou non les écrire dans la mise en cache. Écrire dans le cache nécessite deux opérations [`SSTORE`](https://www.evm.codes/#55) dans des emplacements de stockage précédemment libres, au coût de 22100 gaz chacune, cela est donc facultatif.

```solidity

    mapping(uint => uint) public val2key;
```

Une [correspondance](https://www.geeksforgeeks.org/solidity-mappings/) entre les valeurs et leurs clés. Ces informations sont nécessaires pour encoder les valeurs avant d'envoyer la transaction.

```solidity
    // Location n has the value for key n+1, because we need to preserve
    // zero as "not in the cache".
    uint[] public key2val;
```

Nous pouvons utiliser un tableau pour le mappage des clés aux valeurs car nous attribuons les clés, et pour simplifier, nous le faisons de manière séquentielle.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Lire une valeur dans le cache.

```solidity
    // Write a value to the cache if it's not there already
    // Only public to enable the test to work
    function cacheWrite(uint _value) public returns (uint) {
        // If the value is already in the cache, return the current key
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Il n'y a aucun intérêt à mettre la même valeur dans le cache plus d'une fois. Si la valeur est déjà présente, renvoyez simplement la clé existante.

```solidity
        // Since 0xFE is a special case, the largest key the cache can
        // hold is 0x0D followed by 15 0xFF's. If the cache length is already that
        // large, fail.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Je ne pense pas que nous aurons un cache aussi grand (environ 1.8\*10<sup>37</sup> valeurs, ce qui nécessiterait environ 10<sup>27</sup> To de stockage). Cependant, je suis assez vieux pour me rappeler que ["640 ko sera toujours suffisant"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Ce test est très peu coûteux.

```solidity
        // Write the value using the next key
        val2key[_value] = key2val.length+1;
```

Ajoutez la recherche inversée (trouver la clé en fonction de la valeur).

```solidity
        key2val.push(_value);
```

Ajoutez la recherche directe (trouver la valeur en fonction de la clé). Comme nous attribuons des valeurs de manière séquentielle, nous pouvons simplement l'ajouter après la dernière valeur du tableau.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Renvoyez la nouvelle longueur de `key2val`, qui est la cellule où la nouvelle valeur est stockée.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Cette fonction lit une valeur à partir du calldata d'une longueur arbitraire (jusqu'à 32 octets, la taille d'un mot).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Cette fonction est interne, donc si le reste du code est écrit correctement, ces tests ne sont pas nécessaires. Cependant, ils ne coûtent pas grand-chose, donc autant les inclure.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Ce code est en [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Il lit une valeur de 32 octets à partir du calldata. Cela fonctionne même si le calldata s'arrête avant `startByte+32` car l'espace non initialisé dans l'EVM est considéré comme nul.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Nous n'avons pas nécessairement besoin d'une valeur de 32 octets. Cela élimine les octets en trop.

```solidity
        return _retVal;
    } // _calldataVal


    // Read a single parameter from the calldata, starting at _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Lire un seul paramètre à partir du calldata. Notez que nous devons retourner non seulement la valeur que nous avons lue, mais également l'emplacement de l'octet suivant, car les paramètres peuvent avoir une longueur allant d'un octet à 33 octets.

```solidity
        // The first byte tells us how to interpret the rest
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity s'efforce de réduire le nombre de bugs en interdisant les [conversions implicites](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) car potentiellement dangereuses. Une réduction, par exemple de 256 bits à 8 bits, doit être explicitement indiquée.

```solidity

        // Read the value, but do not write it to the cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Read the value, and write it to the cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // If we got here it means that we need to read from the cache

        // Number of extra bytes to read
        uint8 _extraBytes = _firstByte / 16;
```

Prendre le [nibble](https://fr.wikipedia.org/wiki/Nibble) inférieur et le combiner avec les autres octets pour lire la valeur depuis le cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Read n parameters (functions know how many parameters they expect)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Nous pourrions obtenir le nombre de paramètres que nous avons à partir du calldata en lui-même, mais les fonctions qui nous appellent connaissent le nombre de paramètres qu'elles attendent. Il est plus facile de les laisser faire.

```solidity
        // The parameters we read
        uint[] memory params = new uint[](_paramNum);

        // Parameters start at byte 4, before that it's the function signature
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Lisez les paramètres jusqu'à obtenir le nombre requis. Si nous dépassons la fin du calldata, `_readParams` annulera l'appel.

```solidity

        return(params);
    }   // readParams

    // For testing _readParams, test reading four parameters
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Un grand avantage de Foundry est qu'il permet d'écrire des tests en Solidity ([voir le test du cache ci-dessous](#testing-the-cache)). Cela facilite grandement les tests unitaires. Voici une fonction qui lit quatre paramètres et les renvoie afin que le test puisse vérifier s'ils étaient corrects.

```solidity
    // Get a value, return bytes that will encode it (using the cache if possible)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` est une fonction qui appelle du code hors chaîne pour aider à créer des données d'appel qui utilisent le cache. Elle reçoit une seule valeur et renvoie les octets qui l'encodent. Cette fonction est une `lecture`, donc elle ne nécessite pas de transaction et lorsqu'elle est appelée de manière externe, elle ne coûte aucun gaz.

```solidity
        uint _key = val2key[_val];

        // The value isn't in the cache yet, add it
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Dans l'[EVM](/developers/docs/evm/), toute zone de stockage non initialisée est considérée comme valant zéro. Ainsi, si nous recherchons la clé d'une valeur qui n'existe pas, nous obtenons zéro. Dans ce cas, les octets qui l'encodent sont dans `INTO_CACHE` (afin qu'elle soit mise en cache la prochaine fois), suivis de la valeur réelle.

```solidity
        // If the key is <0x10, return it as a single byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Les simples octets sont les plus simples. Nous utilisons simplement [bytes.concat](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) pour convertir un type `bytes` en un tableau d'octets de n'importe quelle longueur. Malgré le nom, cela fonctionne quand même lorsqu'un seul argument est fourni.

```solidity
        // Two byte value, encoded as 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Lorsque nous avons une valeur inférieure à 16<sup>3,</sup> nous pouvons l'exprimer en seulement deux octets. Nous convertissons d'abord `_key`, qui est une valeur de 256 bits, en une valeur de 16 bits et utilisons un calcul logique pour ajouter le nombre d'octets au premier octet. Ensuite, nous le convertissons en une valeur `bytes2`, qui peut être convertie en `bytes`.

```solidity
        // There is probably a clever way to do the following lines as a loop,
        // but it's a view function so I'm optimizing for programmer time and
        // simplicity.

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

Les autres possibilités (3 octets, 4 octets, etc.) sont gérées de la même manière, mais avec des tailles de champ différentes.

```solidity
        // If we get here, something is wrong.
        revert("Error in encodeVal, should not happen");
```

Si nous en arrivons là, cela signifie que nous avons obtenu une valeur qui n'est pas inférieure à 16 * 256<sup>15</sup>. Mais `cacheWrite` limite les clés donc nous ne pouvons même pas atteindre 14\*256<sup>16</sup> (ce qui aurait un premier octet de 0xFE, donc cela ressemblerait à `DONT_CACHE`). Mais cela ne nous coûte pas beaucoup d'ajouter un test au cas où un futur programmeur introduirait un bug.

```solidity
    } // encodeVal

}  // Cache
```

### Tester le cache {#testing-the-cache}

L'un des avantages de Foundry est qu'[il vous permet d'écrire des tests en Solidity](https://book.getfoundry.sh/forge/tests), ce qui facilite l'écriture de tests de type. Les tests pour la classe `Cache` se trouvent [ici](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Comme le code de test est répétitif, comme c'est souvent le cas avec les tests, cet article n'explique que les parties utiles.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Need to run `forge test -vv` for the console.
import "forge-std/console.sol";
```

Il s'agit simplement d'un passe-partout nécessaire pour utiliser le package de test et `console.log`.

```solidity
import "src/Cache.sol";
```

Nous avons besoin de connaître le contrat que nous testons.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

La fonction `setUp` est appelée avant chaque test. Dans ce cas, nous créons simplement un nouveau cache, afin que nos tests ne s'affectent pas les uns les autres.

```solidity
    function testCaching() public {
```

Les tests sont des fonctions dont les noms commencent par `test`. Cette fonction vérifie la fonctionnalité de base du cache, en écrivant des valeurs puis en les lisant à nouveau.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

C'est ainsi que vous effectuez les tests réels en utilisant [ les fonctions `assert...`](https://book.getfoundry.sh/reference/forge-std/std-assertions). Dans ce cas, nous vérifions que la valeur que nous avons écrite est celle que nous avons lue. Nous pouvons ignorer le résultat de `cache.cacheWrite` car nous savons que les valeurs de cache sont assignées linéairement.

```solidity
        }
    }    // testCaching


    // Cache the same value multiple times, ensure that the key stays
    // the same
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Tout d'abord, nous écrivons chaque valeur deux fois dans le cache et nous nous assurons que les valeurs sont les mêmes (ce qui signifie que la deuxième écriture ne s'est pas réellement produite).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

En théorie, il pourrait y avoir un bug qui n'affecte pas les écritures consécutives dans le cache. Ici, nous effectuons donc quelques écritures qui ne sont pas consécutives et vérifions que les valeurs ne sont toujours pas réécrites.

```solidity
    // Read a uint from a memory buffer (to make sure we get back the parameters
    // we sent out)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Lire un mot de 256 bits à partir de la `mémoire tampon de bytes`. Cette fonction utilitaire nous permet de vérifier que nous obtenons les résultats corrects lorsque nous exécutons un appel de fonction qui utilise le cache.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul ne prend pas en charge les structures de données plus avancées que `uint256`, ainsi lorsque vous faites référence à une structure de données plus sophistiquée, telle que la mémoire tampon `_bytes`, vous obtenez l'adresse de cette structure. Solidity stocke les valeurs de `bytes memory` sous la forme d'un mot de 32 octets qui contient la longueur, suivie des octets réels. Par conséquent, pour obtenir l'octet numéro `_start`, nous devons calculer `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Function signature for fourParams(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Just some constant values to see we're getting the correct values back
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Quelques constantes dont nous avons besoin pour les tests.

```solidity
    function testReadParam() public {
```

Utilisez `fourParams()`, une fonction qui utilise `readParams`, pour tester si nous pouvons lire correctement les paramètres.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Nous ne pouvons pas utiliser le mécanisme ABI normal pour appeler une fonction en utilisant le cache, nous devons donc utiliser le mécanisme [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) de bas niveau. Ce mécanisme prend une `mémoire bytes` en entrée et renvoie celle-ci (ainsi qu'une valeur booléenne) en sortie.

```solidity
        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Il est utile que le même contrat prenne en charge à la fois les fonctions mises en cache (pour les appels directement à partir de transactions) et les fonctions non mises en cache (pour les appels à partir d'autres contrats intelligents). Pour ce faire, nous devons continuer à nous appuyer sur le mécanisme Solidity pour appeler la bonne fonction, au lieu de tout mettre dans une [`fonction de repli`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Cela rend la composabilité beaucoup plus facile. Un seul octet serait suffisant pour identifier la fonction dans la plupart des cas, nous gaspillons donc trois octets (16\*3=48 gaz). Cependant, au moment où j'écris cela, ces 48 gaz coûtent 0,07 cent, ce qui est un coût raisonnable pour un code plus simple et moins sujet aux bugs.

```solidity
            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

La première valeur : un indicateur indiquant qu'il s'agit d'une valeur qui doit être écrite en entier dans le cache, suivie de ses 32 octets. Les trois autres valeurs sont similaires, sauf que `VAL_B` n'est pas écrite dans le cache et que `VAL_C` est à la fois le troisième paramètre et le quatrième.

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

Nous nous attendons à ce que l'appel soit réussi.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Nous commençons avec un cache vide, puis ajoutons `VAL_A` suivi de `VAL_C`. Nous nous attendrions à ce que le premier ait la valeur 1 et le second la valeur 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Le résultat est composé des quatre paramètres. Ici, nous vérifions qu'il est correct.

```solidity
        // Second call, we can use the cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value in the Cache
            bytes1(0x01),
```

Les clés de cache inférieures à 16 ne représentent qu'un octet.

```solidity
            // Second value, don't add it to the cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Third and fourth values, same value
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

Cette fonction est similaire à `testReadParam`, à la différence près que nous utilisons `encodeVal()` au lieu d'écrire explicitement les paramètres.

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

Le seul test supplémentaire dans `testEncodeVal()` consiste à vérifier que la longueur de `_callInput` est correcte. Pour le premier appel, elle est de 4+33\*4. Pour le deuxième, où chaque valeur est déjà dans le cache, elle est de 4+1\*4.

```solidity
    // Test encodeVal when the key is more than a single byte
    // Maximum three bytes because filling the cache to four bytes takes
    // too long.
    function testEncodeValBig() public {
        // Put a number of values in the cache.
        // To keep things simple, use key n for value n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

La fonction `testEncodeVal` ci-dessus ne stocke que quatre valeurs dans le cache, donc [la partie de la fonction qui traite des valeurs multi-octets](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) n'est pas vérifiée. Mais ce code est compliqué et particulièrement sujet aux erreurs.

La première partie de cette fonction est une boucle qui écrit toutes les valeurs de 1 à 0x1FFF dans le cache en ordre, afin que nous puissions encoder ces valeurs et savoir où elles iront.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // One byte        0x0F
            cache.encodeVal(0x0010),   // Two bytes     0x1010
            cache.encodeVal(0x0100),   // Two bytes     0x1100
            cache.encodeVal(0x1000)    // Three bytes 0x201000
        );
```

Testez des valeurs d'un octet, de deux octets et de trois octets. Nous n'allons pas au-delà car cela prendrait trop de temps pour écrire suffisamment d'entrées dans la pile (au moins 0x10000000, soit environ un quart de milliard).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Test what with an excessively small buffer we get a revert
    function testShortCalldata() public {
```

Testez ce qui se passe dans le cas anormal où il n'y a pas suffisamment de paramètres.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Puisqu'il revient, le résultat que nous devrions obtenir est `false`.

```
    // Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Cette fonction obtient quatre paramètres parfaitement légitimes, à l'exception du fait que le cache est vide, il n'y a donc aucune valeur à lire.

```solidity
        .
        .
        .
    // Test what with an excessively long buffer everything works file
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Second value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Third value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Fourth value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // And another value for "good luck"
            bytes4(0x31112233)
        );
```

Cette fonction envoie cinq valeurs. Nous savons que la cinquième valeur est ignorée car ce n'est pas une entrée de cache valide, ce qui aurait provoqué un rejet si elle n'avait pas été incluse.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Exemple d'application {#a-sample-app}

Écrire des tests en Solidity c'est très bien, mais en fin de compte, une DApp doit être capable de traiter les demandes venant de la chaîne pour être utile. Cet article montre comment utiliser la mise en cache dans une DApp avec `WORM`, qui signifie « Écrire Une Fois, Lire Plusieurs fois » (en anglais "Write Once, Read Many"). Si une clé n'a pas encore été assignée, vous pouvez y écrire une valeur. Si la clé a déjà été assignée, cela annule l'écriture.

### Le contrat {#the-contract}

[Voici le contrat](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Cela répète en grande partie ce que nous avons déjà fait avec `Cache` et `CacheTest`, nous nous concentrons donc uniquement sur les parties intéressantes.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

La manière la plus simple d'utiliser `Cache` est de l'hériter dans notre propre contrat.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Cette fonction est similaire à `fourParam` dans `CacheTest` ci-dessus. Comme nous ne suivons pas les spécifications ABI, il est préférable de ne pas déclarer de paramètres dans la fonction.

```solidity
    // Make it easier to call us
    // Function signature for writeEntryCached(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Le code externe qui appelle `writeEntryCached` devra construire manuellement les données d'appel, au lieu d'utiliser `worm.writeEntryCached`, car nous ne suivons pas les spécifications ABI. Avoir cette valeur constante rend plus facile son écriture.

Notez que même si nous définissons `WRITE_ENTRY_CACHED` comme une variable d'état, pour la lire de l'extérieur, il est nécessaire d'utiliser la fonction getter pour cela, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

La fonction de lecture est en `lecture`, elle ne nécessite donc pas de transaction et ne coûte pas de gaz. En conséquence, il n'y a aucun avantage à utiliser le cache pour le paramètre. Avec les fonctions de type en lecture, il est préférable d'utiliser le mécanisme standard qui est plus simple.

### Code de test {#the-testing-code}

[Voici le code de test pour le contrat](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Encore une fois, regardons uniquement ce qui est intéressant.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Ceci (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) est la façon dont nous spécifions dans un test Foundry que le prochain appel devrait échouer, et la raison de cet échec. Cela s'applique lorsque nous utilisons la syntaxe `<contract>.<nom de la fonction>()` plutôt que de construire les données d'appel et d'appeler le contrat en utilisant l'interface de bas niveau (`<contract>.call()`, etc.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Ici, nous utilisons le fait que `cacheWrite` renvoie la clé du cache. Ce n'est pas quelque chose que nous prévoyons d'utiliser en production, car `cacheWrite` modifie l'état, et ne peut donc être appelé que lors d'une transaction. Les transactions n'ont pas de valeurs de retour, si elles ont des résultats, ces résultats sont censés être émis sous forme d'événements. Ainsi, la valeur de retour de `cacheWrite` n'est accessible qu'à partir du code sur la chaîne, et le code sur la chaîne n'a pas besoin de mise en cache des paramètres.

```solidity
        (_success,) = address(worm).call(_callInput);
```

C'est ainsi que nous indiquons à Solidity que, bien que `<contract address>.call()` ait deux valeurs de retour, nous ne nous préoccupons que de la première.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Puisque nous utilisons la fonction de bas niveau `<address>.call()`, nous ne pouvons pas utiliser `vm.expectRevert()` et devons regarder la valeur de résultat booléen que nous obtenons de l'appel.

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

C'est ainsi que nous vérifions que le code [émet correctement un événement](https://book.getfoundry.sh/cheatcodes/expect-emit) dans Foundry.

### Le client {#the-client}

Une chose que vous n'obtenez pas avec les tests Solidity, c'est du code JavaScript que vous pouvez couper et coller dans votre propre application. Pour écrire ce code, j'ai déployé WORM sur [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), le nouveau réseau de test d'[Optimism](https://www.optimism.io/). Il se trouve à l'adresse [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

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

4. Modifiez `.env` selon votre configuration :

   | Paramètre             | Valeur                                                                                                                                                                                          |
   | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC              | La mnémonique d'un compte qui dispose de suffisamment d'ETH pour payer une transaction. [Vous pouvez obtenir de l'ETH gratuit pour le réseau Optimism Goerli ici](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL vers Optimism Goerli. Le point de terminaison public, `https://goerli.optimism.io`, est à débit limité mais suffisant pour ce dont nous avons besoin ici                                    |

5. Exécutez `index.js`.

   ```sh
   node index.js
   ```

   Cet exemple d'application écrit d'abord une entrée dans WORM, affichant les données d'appel et un lien vers la transaction sur Etherscan. Ensuite, elle lit cette entrée, affiche la clé qu'elle utilise et les valeurs de l'entrée (valeur, numéro de bloc et auteur).

La plupart des clients sont du JavaScript Dapp normal. Donc, encore une fois, nous ne passerons en revue que les parties intéressantes.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Need a new key every time
    const key = await worm.encodeVal(Number(new Date()))
```

Un emplacement donné ne peut être écrit qu'une seule fois, donc nous utilisons l'horodatage pour nous assurer que nous ne réutilisons pas les emplacements.

```javascript
const val = await worm.encodeVal("0x600D")

// Write an entry
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers s'attend à ce que les données d'appel soient une chaîne hexadécimale, `0x` suivie d'un nombre pair de chiffres hexadécimaux. Comme `key` et `val` commencent tous les deux par `0x`, nous devons supprimer ces en-têtes.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Comme pour le code de test Solidity, nous ne pouvons normalement pas appeler une fonction de mise en cache. Au lieu de cela, nous devons utiliser un mécanisme de bas niveau.

```javascript
    .
    .
    .
    // Read the entry just written
    const realKey = '0x' + key.slice(4)  // remove the FF flag
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Pour lire les entrées, nous pouvons utiliser le mécanisme normal. Il n'est pas nécessaire d'utiliser la mise en cache des paramètres avec les fonctions `view`.

## Conclusion {#conclusion}

Le code dans cet article est une preuve de concept, le but étant de rendre l'idée facile à comprendre. Pour un système exploitable, vous devriez peut-être mettre en œuvre certaines fonctionnalités supplémentaires :

- Gérer les valeurs qui ne sont pas de type `uint256`. Par exemple, les chaines de caractères.
- Au lieu d'un cache global, peut-être avoir une correspondance entre les utilisateurs et les caches. Différents utilisateurs utilisent différentes valeurs.
- Les valeurs utilisées pour les adresses sont distinctes de celles utilisées à d'autres fins. Il pourrait être judicieux d'avoir un cache séparé uniquement pour les adresses.
- Actuellement, les clés de cache fonctionnent selon un algorithme « premier arrivé, clé la plus petite ». Les seize premières valeurs peuvent être envoyées en un seul octet. Les 4080 valeurs suivantes peuvent être envoyées en deux octets. Le million de valeurs suivant est de trois octets, etc. Un système de production doit conserver les compteurs d'utilisation sur les entrées du cache et les réorganiser de manière à ce que les seize valeurs _les plus courantes_ soient sur un octet, les 4 080 valeurs les plus courantes suivantes sur deux octets, etc.

  Cependant, c'est une opération potentiellement dangereuse. Imaginez la séquence d'événements suivante :

  1. Noam Naïf appelle `encodeVal` pour encoder l'adresse à laquelle il souhaite envoyer des tokens. Cette adresse est l'une des premières utilisées dans l'application, donc la valeur encodée est 0x06. Il s'agit d'une fonction en `lecture`, pas d'une transaction, donc elle concerne uniquement Noam et le nœud qu'il utilise, et personne d'autre n'est au courant

  2. Paulo Proprio exécute l'opération de réorganisation du cache. Très peu de gens utilisent réellement cette adresse, elle est donc maintenant encodée en 0x201122. Une valeur différente, 10<sup>18</sup>, se voit attribuer 0x06.

  3. Noam Naïf envoie ses tokens à 0x06. Ils vont à l'adresse `0x0000000000000000000000000de0b6b3a7640000`, et comme personne ne connaît la clé privée de cette adresse, ils restent bloqués là. Noam n'est _pas content_.

  Il existe des moyens de résoudre ce problème, ainsi que le problème lié aux transactions qui sont dans le mempool pendant la réorganisation du cache, mais vous devez en être conscient.

J'ai démontré la mise en cache ici avec Optimism, car je suis un employé d'Optimism et c'est la rollup que je connais le mieux. Mais cela devrait fonctionner avec n'importe quelle rollup qui facture un coût minimal pour le traitement interne, de sorte qu'en comparaison, l'écriture des données de la transaction sur L1 soit le principal coût.
