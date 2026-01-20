---
title: "Mise en cache à volonté"
description: Apprenez comment créer et utiliser un contrat de mise en cache pour des transactions de rollup moins chères
author: Ori Pomerantz
tags: [ "couche 2", "mise en cache", "stockage" ]
skill: intermediate
published: 2022-09-15
lang: fr
---

Lors de l'utilisation de rollups, le coût d'un octet dans la transaction est bien plus élevé que le coût d'un emplacement de stockage. Par conséquent, il est logique de mettre en cache autant d'informations que possible en chaîne.

Dans cet article, vous apprendrez à créer et à utiliser un contrat de mise en cache de telle manière que toute valeur de paramètre susceptible d'être utilisée plusieurs fois soit mise en cache et disponible à l'utilisation (après la première fois) avec un nombre d'octets beaucoup plus faible, et comment écrire du code hors chaîne qui utilise ce cache.

Si vous voulez sauter l'article et voir directement le code source, [il est ici](https://github.com/qbzzt/20220915-all-you-can-cache). La pile de développement est [Foundry](https://getfoundry.sh/introduction/installation/).

## Conception générale {#overall-design}

Par souci de simplicité, nous supposerons que tous les paramètres de transaction sont de type `uint256` et longs de 32 octets. Lorsque nous recevons une transaction, nous analysons chaque paramètre comme ceci :

1. Si le premier octet est `0xFF`, prenez les 32 octets suivants comme valeur de paramètre et écrivez-la dans le cache.

2. Si le premier octet est `0xFE`, prenez les 32 octets suivants comme valeur de paramètre, mais ne l'écrivez _pas_ dans le cache.

3. Pour toute autre valeur, prenez les quatre bits de poids fort comme le nombre d'octets supplémentaires, et les quatre bits de poids faible comme les bits les plus significatifs de la clé du cache. Voici quelques exemples :

   | Octets dans les données d'appel | Clé du cache |
   | :------------------------------ | -----------: |
   | 0x0F                            |         0x0F |
   | 0x10,0x10                       |         0x10 |
   | 0x12,0xAC                       |       0x02AC |
   | 0x2D,0xEA, 0xD6                 |     0x0DEAD6 |

## Manipulation du cache {#cache-manipulation}

Le cache est implémenté dans [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Revenons dessus ligne par ligne.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Ces constantes sont utilisées pour interpréter les cas spéciaux où nous fournissons toutes les informations et souhaitons ou non les écrire dans le cache. L'écriture dans le cache nécessite deux opérations [`SSTORE`](https://www.evm.codes/#55) dans des emplacements de stockage précédemment inutilisés, au coût de 22 100 gaz chacune, nous rendons donc cela facultatif.

```solidity

    mapping(uint => uint) public val2key;
```

Une [correspondance](https://www.geeksforgeeks.org/solidity/solidity-mappings/) entre les valeurs et leurs clés. Ces informations sont nécessaires pour encoder les valeurs avant d'envoyer la transaction.

```solidity
    // L'emplacement n a la valeur pour la clé n+1, car nous devons préserver
    // zéro comme « pas dans le cache ».
    uint[] public key2val;
```

Nous pouvons utiliser un tableau pour la correspondance des clés aux valeurs car nous attribuons les clés, et par souci de simplicité, nous le faisons de manière séquentielle.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Lecture d'une entrée de cache non initialisée");
        return key2val[_key-1];
    }  // cacheRead
```

Lire une valeur à partir du cache.

```solidity
    // Écrire une valeur dans le cache si elle n'y est pas déjà
    // Uniquement public pour permettre au test de fonctionner
    function cacheWrite(uint _value) public returns (uint) {
        // Si la valeur est déjà dans le cache, retourner la clé actuelle
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Il n'y a aucun intérêt à mettre la même valeur dans le cache plus d'une fois. Si la valeur est déjà présente, il suffit de retourner la clé existante.

```solidity
        // Puisque 0xFE est un cas spécial, la plus grande clé que le cache peut
        // contenir est 0x0D suivie de 15 0xFF. Si la longueur du cache est déjà aussi
        // grande, on échoue.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "dépassement du cache");
```

Je ne pense pas que nous aurons jamais un cache aussi grand (environ 1,8\*10<sup>37</sup> entrées, ce qui nécessiterait environ 10<sup>27</sup> To de stockage). Cependant, je suis assez vieux pour me souvenir du fameux [« 640 Ko devraient suffire à tout le monde »](https://quoteinvestigator.com/2011/09/08/640k-enough/). Ce test est très peu coûteux.

```solidity
        // Écrire la valeur en utilisant la clé suivante
        val2key[_value] = key2val.length+1;
```

Ajoutez la recherche inversée (de la valeur à la clé).

```solidity
        key2val.push(_value);
```

Ajoutez la recherche directe (de la clé à la valeur). Comme nous attribuons des valeurs de manière séquentielle, nous pouvons simplement l'ajouter après la dernière valeur du tableau.

```solidity
        return key2val.length;
    }  // écritureCache
```

Retourner la nouvelle longueur de `key2val`, qui est la cellule où la nouvelle valeur est stockée.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Cette fonction lit une valeur à partir des données d'appel, de longueur arbitraire (jusqu'à 32 octets, la taille d'un mot).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "la limite de longueur de _calldataVal est de 32 octets");
        require(length + startByte <= msg.data.length,
            "_calldataVal tente de lire au-delà de calldatasize");
```

Cette fonction est interne, donc si le reste du code est écrit correctement, ces tests ne sont pas nécessaires. Cependant, ils ne coûtent pas cher, alors autant les avoir.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Ce code est en [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Il lit une valeur de 32 octets à partir des données d'appel. Cela fonctionne même si les données d'appel s'arrêtent avant `startByte+32`, car l'espace non initialisé dans l'EVM est considéré comme étant nul.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Nous n'avons pas nécessairement besoin d'une valeur de 32 octets. Cela permet de se débarrasser des octets excédentaires.

```solidity
        return _retVal;
    } // _calldataVal


    // Lire un seul paramètre depuis calldata, en commençant à _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Lire un seul paramètre à partir des données d'appel. Notez que nous devons retourner non seulement la valeur que nous avons lue, mais aussi l'emplacement de l'octet suivant, car les paramètres peuvent avoir une longueur allant de 1 à 33 octets.

```solidity
        // Le premier octet nous indique comment interpréter le reste
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity essaie de réduire le nombre de bogues en interdisant les [conversions de type implicites](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) potentiellement dangereuses. Une conversion descendante, par exemple de 256 bits à 8 bits, doit être explicite.

```solidity

        // Lire la valeur, mais ne pas l'écrire dans le cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Lire la valeur et l'écrire dans le cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Si nous arrivons ici, cela signifie que nous devons lire depuis le cache

        // Nombre d'octets supplémentaires à lire
        uint8 _extraBytes = _firstByte / 16;
```

Prenez le [quartet](https://fr.wikipedia.org/wiki/Quartet_\(informatique\)) inférieur et combinez-le avec les autres octets pour lire la valeur du cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Lire n paramètres (les fonctions savent combien de paramètres elles attendent)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Nous pourrions obtenir le nombre de paramètres à partir des données d'appel elles-mêmes, mais les fonctions qui nous appellent savent combien de paramètres elles attendent. Il est plus simple de les laisser nous le dire.

```solidity
        // Les paramètres que nous lisons
        uint[] memory params = new uint[](_paramNum);

        // Les paramètres commencent à l'octet 4, avant cela se trouve la signature de la fonction
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Lisez les paramètres jusqu'à ce que vous ayez le nombre requis. Si nous dépassons la fin des données d'appel, `_readParams` annulera l'appel.

```solidity

        return(params);
    }   // readParams

    // Pour tester _readParams, on teste la lecture de quatre paramètres
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Un grand avantage de Foundry est qu'il permet d'écrire des tests en Solidity ([voir Tester le cache ci-dessous](#testing-the-cache)). Cela facilite grandement les tests unitaires. Il s'agit d'une fonction qui lit quatre paramètres et les retourne pour que le test puisse vérifier s'ils étaient corrects.

```solidity
    // Obtenir une valeur, retourner les octets qui l'encoderont (en utilisant le cache si possible)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` est une fonction que le code hors chaîne appelle pour aider à créer des données d'appel qui utilisent le cache. Elle reçoit une seule valeur et retourne les octets qui l'encodent. Cette fonction est une `vue`, elle ne nécessite donc pas de transaction et, lorsqu'elle est appelée de l'extérieur, ne coûte pas de gaz.

```solidity
        uint _key = val2key[_val];

        // La valeur n'est pas encore dans le cache, on l'ajoute
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Dans l'[EVM](/developers/docs/evm/), tout le stockage non initialisé est supposé être nul. Donc, si nous cherchons la clé d'une valeur qui n'est pas là, nous obtenons un zéro. Dans ce cas, les octets qui l'encodent sont `INTO_CACHE` (afin qu'elle soit mise en cache la prochaine fois), suivis de la valeur réelle.

```solidity
        // Si la clé est <0x10, on la retourne comme un seul octet
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Les octets uniques sont les plus simples. Nous utilisons simplement [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) pour transformer un type `bytes<n>` en un tableau d'octets de n'importe quelle longueur. Malgré son nom, cela fonctionne bien lorsqu'on ne lui fournit qu'un seul argument.

```solidity
        // Valeur sur deux octets, encodée comme 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Lorsque nous avons une clé inférieure à 16<sup>3</sup>, nous pouvons l'exprimer en deux octets. Nous convertissons d'abord `_key`, qui est une valeur de 256 bits, en une valeur de 16 bits et utilisons un OU logique pour ajouter le nombre d'octets supplémentaires au premier octet. Ensuite, nous la convertissons en une valeur `bytes2`, qui peut être convertie en `bytes`.

```solidity
        // Il existe probablement une manière astucieuse de faire les lignes suivantes en boucle,
        // mais c'est une fonction de vue, donc j'optimise le temps du programmeur et
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

Les autres valeurs (3 octets, 4 octets, etc.) sont traitées de la même manière, mais avec des tailles de champ différentes.

```solidity
        // Si nous arrivons ici, quelque chose ne va pas.
        revert("Erreur dans encodeVal, ne devrait pas se produire");
```

Si nous arrivons ici, cela signifie que nous avons obtenu une clé qui n'est pas inférieure à 16\*256<sup>15</sup>. Mais `cacheWrite` limite les clés, donc nous ne pouvons même pas atteindre 14\*256<sup>16</sup> (ce qui donnerait un premier octet de 0xFE, et ressemblerait donc à `DONT_CACHE`). Mais cela ne coûte pas cher d'ajouter un test au cas où un futur programmeur introduirait un bogue.

```solidity
    } // encodeVal

}  // Cache
```

### Tester le cache {#testing-the-cache}

L'un des avantages de Foundry est qu'[il permet d'écrire des tests en Solidity](https://getfoundry.sh/forge/tests/overview/), ce qui facilite l'écriture de tests unitaires. Les tests pour la classe `Cache` sont [ici](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Le code de test étant répétitif, comme c'est souvent le cas, cet article n'explique que les parties intéressantes.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Il faut lancer `forge test -vv` pour la console.
import "forge-std/console.sol";
```

Ceci est juste du code standard nécessaire pour utiliser le paquet de test et `console.log`.

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

La fonction `setUp` est appelée avant chaque test. Dans ce cas, nous créons simplement un nouveau cache, afin que nos tests ne s'affectent pas les uns les autres.

```solidity
    function testCaching() public {
```

Les tests sont des fonctions dont le nom commence par `test`. Cette fonction vérifie la fonctionnalité de base du cache, en écrivant des valeurs et en les relisant.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

C'est ainsi que vous effectuez les tests réels, en utilisant les [`fonctions assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). Dans ce cas, nous vérifions que la valeur que nous avons écrite est bien celle que nous avons lue. Nous pouvons ignorer le résultat de `cache.cacheWrite` car nous savons que les clés de cache sont attribuées de manière linéaire.

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

D'abord, nous écrivons chaque valeur deux fois dans le cache et nous nous assurons que les clés sont les mêmes (ce qui signifie que la deuxième écriture n'a pas vraiment eu lieu).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

En théorie, il pourrait y avoir un bogue qui n'affecte pas les écritures consécutives dans le cache. Ici, nous effectuons donc des écritures non consécutives et nous voyons que les valeurs ne sont toujours pas réécrites.

```solidity
    // Lire un uint à partir d'un tampon mémoire (pour s'assurer de récupérer les paramètres
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

Yul ne prend pas en charge les structures de données au-delà de `uint256`, donc lorsque vous faites référence à une structure de données plus sophistiquée, telle que le tampon mémoire `_bytes`, vous obtenez l'adresse de cette structure. Solidity stocke les valeurs `bytes memory` sous la forme d'un mot de 32 octets qui contient la longueur, suivi des octets réels. Pour obtenir l'octet numéro `_start`, nous devons donc calculer `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Signature de la fonction pour fourParams(), grâce à
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Juste quelques valeurs constantes pour voir si nous obtenons les bonnes valeurs en retour
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Quelques constantes dont nous avons besoin pour les tests.

```solidity
    function testReadParam() public {
```

Appelez `fourParams()`, une fonction qui utilise `readParams`, pour tester que nous pouvons lire les paramètres correctement.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Nous ne pouvons pas utiliser le mécanisme ABI normal pour appeler une fonction en utilisant le cache, nous devons donc utiliser le mécanisme de bas niveau [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Ce mécanisme prend un `bytes memory` en entrée et le retourne (ainsi qu'une valeur booléenne) en sortie.

```solidity
        // Premier appel, le cache est vide
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Il est utile que le même contrat prenne en charge à la fois les fonctions mises en cache (pour les appels directement depuis les transactions) et les fonctions non mises en cache (pour les appels depuis d'autres contrats intelligents). Pour ce faire, nous devons continuer à nous appuyer sur le mécanisme de Solidity pour appeler la bonne fonction, au lieu de tout mettre dans [une fonction de repli (`fallback`)](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Cela rend la composabilité beaucoup plus facile. Un seul octet suffirait pour identifier la fonction dans la plupart des cas, nous gaspillons donc trois octets (16\*3=48 gaz). Cependant, au moment où j'écris ces lignes, ces 48 gaz coûtent 0,07 centime, ce qui est un coût raisonnable pour un code plus simple et moins sujet aux bogues.

```solidity
            // Première valeur, on l'ajoute au cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

La première valeur : un indicateur signalant qu'il s'agit d'une valeur complète qui doit être écrite dans le cache, suivi des 32 octets de la valeur. Les trois autres valeurs sont similaires, sauf que `VAL_B` n'est pas écrit dans le cache et que `VAL_C` est à la fois le troisième et le quatrième paramètre.

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

Nous commençons avec un cache vide, puis nous ajoutons `VAL_A` suivi de `VAL_C`. Nous nous attendons à ce que le premier ait la clé 1 et le second la clé 2.

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

            // Première valeur dans le cache
            bytes1(0x01),
```

Les clés de cache inférieures à 16 ne représentent qu'un seul octet.

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
    // Maximum trois octets, car remplir le cache jusqu'à quatre octets prend
    // trop de temps.
    function testEncodeValBig() public {
        // Mettre un certain nombre de valeurs dans le cache.
        // Pour rester simple, utiliser la clé n pour la valeur n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

La fonction `testEncodeVal` ci-dessus n'écrit que quatre valeurs dans le cache, donc [la partie de la fonction qui traite les valeurs multi-octets](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) n'est pas vérifiée. Mais ce code est compliqué et sujet aux erreurs.

La première partie de cette fonction est une boucle qui écrit toutes les valeurs de 1 à 0x1FFF dans le cache, dans l'ordre, afin que nous puissions encoder ces valeurs et savoir où elles vont.

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

Testez les valeurs d'un, deux et trois octets. Nous ne testons pas au-delà car cela prendrait trop de temps pour écrire suffisamment d'entrées dans la pile (au moins 0x10000000, soit environ un quart de milliard).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Tester qu'avec un tampon excessivement petit, nous obtenons une annulation
    function testShortCalldata() public {
```

Testez ce qui se passe dans le cas anormal où il n'y a pas assez de paramètres.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Puisqu'il y a annulation, le résultat que nous devrions obtenir est `false`.

```
    // Appeler avec des clés de cache qui ne sont pas là
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

Cette fonction reçoit quatre paramètres parfaitement légitimes, sauf que le cache est vide, donc il n'y a aucune valeur à lire.

```solidity
        .
        .
        .
    // Tester qu'avec un tampon excessivement long tout fonctionne
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

            // Et une autre valeur pour la « bonne chance »
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

Écrire des tests en Solidity est très bien, mais au final, une dapp doit être capable de traiter des requêtes provenant de l'extérieur de la chaîne pour être utile. Cet article montre comment utiliser la mise en cache dans une dapp avec `WORM`, qui signifie « Write Once, Read Many » (Écrire une fois, lire plusieurs fois). Si une clé n'est pas encore écrite, vous pouvez y écrire une valeur. Si la clé est déjà écrite, vous obtenez une annulation.

### Le contrat {#the-contract}

[Voici le contrat](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Il répète en grande partie ce que nous avons déjà fait avec `Cache` et `CacheTest`, nous ne couvrirons donc que les parties intéressantes.

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

Cette fonction est similaire à `fourParam` dans `CacheTest` ci-dessus. Comme nous ne suivons pas les spécifications de l'ABI, il est préférable de ne déclarer aucun paramètre dans la fonction.

```solidity
    // Pour faciliter les appels
    // Signature de la fonction pour writeEntryCached(), grâce à
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Le code externe qui appelle `writeEntryCached` devra construire manuellement les données d'appel, au lieu d'utiliser `worm.writeEntryCached`, car nous ne suivons pas les spécifications de l'ABI. Avoir cette valeur constante facilite simplement son écriture.

Notez que même si nous définissons `WRITE_ENTRY_CACHED` comme une variable d'état, pour la lire de l'extérieur, il est nécessaire d'utiliser sa fonction d'accès, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

La fonction de lecture est une `vue`, elle ne nécessite donc pas de transaction et ne coûte pas de gaz. Par conséquent, il n'y a aucun avantage à utiliser le cache pour le paramètre. Avec les fonctions de vue, il est préférable d'utiliser le mécanisme standard qui est plus simple.

### Le code de test {#the-testing-code}

[Voici le code de test du contrat](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Encore une fois, ne regardons que ce qui est intéressant.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Ceci (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) est la façon dont nous spécifions dans un test Foundry que l'appel suivant doit échouer, ainsi que la raison de l'échec. Cela s'applique lorsque nous utilisons la syntaxe `<contract>.<function name>()` plutôt que de construire les données d'appel et d'appeler le contrat en utilisant l'interface de bas niveau (`<contract>.call()`, etc.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Ici, nous utilisons le fait que `cacheWrite` retourne la clé du cache. Ce n'est pas quelque chose que nous nous attendrions à utiliser en production, car `cacheWrite` modifie l'état, et ne peut donc être appelé que lors d'une transaction. Les transactions n'ont pas de valeurs de retour ; si elles ont des résultats, ces derniers sont censés être émis sous forme d'événements. La valeur de retour de `cacheWrite` n'est donc accessible qu'à partir du code en chaîne, et le code en chaîne n'a pas besoin de mise en cache des paramètres.

```solidity
        (_success,) = address(worm).call(_callInput);
```

C'est ainsi que nous indiquons à Solidity que, bien que `<contract address>.call()` ait deux valeurs de retour, nous ne nous intéressons qu'à la première.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Puisque nous utilisons la fonction de bas niveau `<address>.call()`, nous ne pouvons pas utiliser `vm.expectRevert()` et devons regarder la valeur de succès booléenne que nous obtenons de l'appel.

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

C'est la manière de vérifier que le code [émet un événement correctement](https://getfoundry.sh/reference/cheatcodes/expect-emit/) dans Foundry.

### Le client {#the-client}

Une chose que vous n'obtenez pas avec les tests Solidity, c'est du code JavaScript que vous pouvez copier et coller dans votre propre application. Pour écrire ce code, j'ai déployé WORM sur [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), le nouveau réseau de test d'[Optimism](https://www.optimism.io/). Il se trouve à l'adresse [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Vous pouvez voir le code JavaScript pour le client ici](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Pour l'utiliser :

1. Clonez le dépôt git :

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Installez les paquets nécessaires :

   ```sh
   cd javascript
   yarn
   ```

3. Copiez le fichier de configuration :

   ```sh
   cp .env.example .env
   ```

4. Modifiez `.env` selon votre configuration :

   | Paramètre                                                     | Valeur                                                                                                                                                                                                                          |
   | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC                                                      | La mnémonique d'un compte qui dispose de suffisamment d'ETH pour payer une transaction. [Vous pouvez obtenir de l'ETH gratuit pour le réseau Optimism Goerli ici](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL vers Optimism Goerli. Le point de terminaison public, `https://goerli.optimism.io`, a un débit limité mais suffisant pour ce dont nous avons besoin ici.                                    |

5. Exécutez `index.js`.

   ```sh
   node index.js
   ```

   Cet exemple d'application écrit d'abord une entrée dans WORM, en affichant les données d'appel et un lien vers la transaction sur Etherscan. Ensuite, il relit cette entrée et affiche la clé qu'il utilise et les valeurs de l'entrée (valeur, numéro de bloc et auteur).

La plupart du client est du JavaScript de Dapp normal. Donc, encore une fois, nous ne passerons en revue que les parties intéressantes.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Il faut une nouvelle clé à chaque fois
    const key = await worm.encodeVal(Number(new Date()))
```

Un emplacement donné ne peut être écrit qu'une seule fois, nous utilisons donc l'horodatage pour nous assurer de ne pas réutiliser les emplacements.

```javascript
const val = await worm.encodeVal("0x600D")

// Écrire une entrée
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers s'attend à ce que les données d'appel soient une chaîne hexadécimale, `0x` suivi d'un nombre pair de chiffres hexadécimaux. Comme `key` et `val` commencent tous les deux par `0x`, nous devons supprimer ces en-têtes.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Comme pour le code de test Solidity, nous ne pouvons pas appeler une fonction mise en cache normalement. À la place, nous devons utiliser un mécanisme de plus bas niveau.

```javascript
    .
    .
    .
    // Lire l'entrée qui vient d'être écrite
    const realKey = '0x' + key.slice(4)  // supprimer l'indicateur FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Pour lire les entrées, nous pouvons utiliser le mécanisme normal. Il n'est pas nécessaire d'utiliser la mise en cache des paramètres avec les fonctions `view`.

## Conclusion {#conclusion}

Le code de cet article est une preuve de concept, le but est de rendre l'idée facile à comprendre. Pour un système prêt pour la production, vous pourriez vouloir implémenter des fonctionnalités supplémentaires :

- Gérer les valeurs qui ne sont pas de type `uint256`. Par exemple, des chaînes de caractères.
- Au lieu d'un cache global, vous pourriez avoir une correspondance entre les utilisateurs et les caches. Différents utilisateurs utilisent des valeurs différentes.
- Les valeurs utilisées pour les adresses sont distinctes de celles utilisées à d'autres fins. Il pourrait être judicieux d'avoir un cache séparé uniquement pour les adresses.
- Actuellement, les clés de cache suivent un algorithme « premier arrivé, clé la plus petite ». Les seize premières valeurs peuvent être envoyées en un seul octet. Les 4080 valeurs suivantes peuvent être envoyées sur deux octets. Le million de valeurs suivant est de trois octets, etc. Un système de production devrait conserver des compteurs d'utilisation sur les entrées du cache et les réorganiser de manière à ce que les seize valeurs _les plus courantes_ soient sur un octet, les 4 080 valeurs les plus courantes suivantes sur deux octets, etc.

  Cependant, c'est une opération potentiellement dangereuse. Imaginez la séquence d'événements suivante :

  1. Noam Naïf appelle `encodeVal` pour encoder l'adresse à laquelle il veut envoyer des jetons. Cette adresse est l'une des premières utilisées sur l'application, donc la valeur encodée est 0x06. C'est une fonction `view`, pas une transaction, donc c'est entre Noam et le nœud qu'il utilise, et personne d'autre n'est au courant.

  2. Pierre Propriétaire exécute l'opération de réorganisation du cache. Très peu de gens utilisent réellement cette adresse, elle est donc maintenant encodée en 0x201122. Une valeur différente, 10<sup>18</sup>, se voit attribuer 0x06.

  3. Noam Naïf envoie ses jetons à 0x06. Ils vont à l'adresse `0x0000000000000000000000000de0b6b3a7640000`, et comme personne ne connaît la clé privée de cette adresse, ils sont simplement bloqués là. Noam n'est _pas content_.

  Il existe des moyens de résoudre ce problème, ainsi que le problème connexe des transactions qui se trouvent dans le mempool pendant la réorganisation du cache, mais vous devez en être conscient.

J'ai fait ici une démonstration de la mise en cache avec Optimism, parce que je suis un employé d'Optimism et que c'est le rollup que je connais le mieux. Mais cela devrait fonctionner avec n'importe quel rollup qui facture un coût minimal pour le traitement interne, de sorte qu'en comparaison, l'écriture des données de transaction sur la L1 soit la principale dépense.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).

