---
title: Comment utiliser Echidna pour tester des contrats intelligents
description: Comment utiliser Echidna pour tester automatiquement des contrats intelligents
author: "Trailofbits"
lang: fr
tags: ["Solidity", "contrats intelligents", "sécurité", "tests", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Installation {#installation}

Echidna peut être installé via Docker, Homebrew ou en utilisant le binaire précompilé. Les exemples de ce tutoriel ont été testés avec Echidna 2.3.3 et solc 0.8.37.

### Echidna via Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_La dernière commande exécute l'image Echidna dans un conteneur Docker qui a accès à votre répertoire actuel. Vous pouvez modifier les fichiers depuis votre hôte et exécuter les outils sur les fichiers depuis Docker. L'image est également fournie avec [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) et [solc-select](https://github.com/crytic/solc-select)._

À l'intérieur de Docker, exécutez :

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Binaire {#binary}

Téléchargez la dernière version pour votre plateforme depuis [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). Sur macOS ou Linux, vous pouvez également exécuter `brew install echidna`, ce qui installe Slither et crytic-compile en même temps.

Lors de l'utilisation du binaire de la version, installez [Slither](https://github.com/crytic/slither) et [solc-select](https://github.com/crytic/solc-select) vous-même (par exemple `pip3 install slither-analyzer solc-select` dans un environnement virtuel Python) et sélectionnez une version du compilateur :

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Echidna fonctionne sans Slither, mais Slither extrait des constantes telles que les nombres magiques utilisés dans les instructions `require`, et plusieurs exemples ci-dessous en dépendent pour trouver des bugs rapidement.

## Introduction au fuzzing basé sur les propriétés {#introduction-to-property-based-fuzzing}

Echidna est un fuzzer basé sur les propriétés, que nous avons décrit dans nos précédents articles de blog ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

Le [fuzzing](https://wikipedia.org/wiki/Fuzzing) est une technique bien connue dans la communauté de la sécurité. Elle consiste à générer des entrées plus ou moins aléatoires pour trouver des bugs dans le programme. Les fuzzers pour les logiciels traditionnels (tels que [AFL](http://lcamtuf.coredump.cx/afl/) ou [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) sont reconnus comme des outils efficaces pour trouver des bugs.

Au-delà de la génération purement aléatoire d'entrées, il existe de nombreuses techniques et stratégies pour générer de bonnes entrées, notamment :

- Obtenir des retours de chaque exécution et guider la génération en les utilisant. Par exemple, si une entrée nouvellement générée mène à la découverte d'un nouveau chemin, il peut être judicieux de générer de nouvelles entrées proches de celle-ci.
- Générer l'entrée en respectant une contrainte structurelle. Par exemple, si votre entrée contient un en-tête avec une somme de contrôle, il sera logique de laisser le fuzzer générer des entrées validant cette somme de contrôle.
- Utiliser des entrées connues pour générer de nouvelles entrées : si vous avez accès à un grand ensemble de données d'entrées valides, votre fuzzer peut générer de nouvelles entrées à partir de celles-ci, plutôt que de recommencer sa génération de zéro. Celles-ci sont généralement appelées des _graines_ (seeds).

### Fuzzing basé sur les propriétés {#property-based-fuzzing}

Echidna appartient à une famille spécifique de fuzzers : le fuzzing basé sur les propriétés, fortement inspiré de [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Contrairement aux fuzzers classiques qui essaieront de trouver des plantages, Echidna essaiera de briser des invariants définis par l'utilisateur.

Dans les contrats intelligents, les invariants sont des fonctions Solidity qui peuvent représenter tout état incorrect ou invalide que le contrat peut atteindre, notamment :

- Contrôle d'accès incorrect : l'attaquant est devenu le propriétaire du contrat.
- Machine d'état incorrecte : les jetons peuvent être transférés alors que le contrat est en pause.
- Arithmétique incorrecte : l'utilisateur peut provoquer un dépassement de capacité par le bas (underflow) de son solde et obtenir des jetons gratuits illimités.

### Tester une propriété avec Echidna {#testing-a-property-with-echidna}

Nous allons voir comment tester un contrat intelligent avec Echidna. La cible est le contrat intelligent suivant [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) :

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Nous supposerons que ce jeton doit avoir les propriétés suivantes :

- N'importe qui peut avoir au maximum 1000 jetons
- Le jeton ne peut pas être transféré (ce n'est pas un jeton ERC-20)

### Écrire une propriété {#write-a-property}

Les propriétés d'Echidna sont des fonctions Solidity. Une propriété doit :

- N'avoir aucun argument
- Retourner `true` si elle réussit
- Avoir son nom commençant par `echidna`

Echidna va :

- Générer automatiquement des transactions arbitraires pour tester la propriété.
- Signaler toute transaction amenant une propriété à retourner `false` ou à lever une erreur.
- Ignorer les effets secondaires lors de l'appel d'une propriété (c'est-à-dire que si la propriété modifie une variable d'état, elle est ignorée après le test)

La propriété suivante vérifie que l'appelant n'a pas plus de 1000 jetons :

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Utilisez l'héritage pour séparer votre contrat de vos propriétés :

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) implémente la propriété et hérite du jeton.

### Initialiser un contrat {#initiate-a-contract}

Echidna a besoin d'un [constructeur](/developers/docs/smart-contracts/anatomy/#constructor-functions) sans argument. Si votre contrat nécessite une initialisation spécifique, vous devez le faire dans le constructeur.

Il y a quelques adresses spécifiques dans Echidna :

- `0x30000` qui appelle le constructeur.
- `0x10000`, `0x20000` et `0x30000` qui appellent aléatoirement les autres fonctions.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` où le contrat testé est déployé.

Nous n'avons besoin d'aucune initialisation particulière dans notre exemple actuel, par conséquent notre constructeur est vide.

### Exécuter Echidna {#run-echidna}

Echidna est lancé avec :

```sh
echidna contract.sol
```

Si contract.sol contient plusieurs contrats, vous pouvez spécifier la cible :

```sh
echidna contract.sol --contract MyContract
```

Lorsqu'il est exécuté dans un terminal, Echidna affiche une interface utilisateur interactive. Ajoutez `--format text` pour obtenir une sortie en texte brut comme dans les exemples ci-dessous.

### Résumé : Tester une propriété {#summary-testing-a-property}

Ce qui suit résume l'exécution d'Echidna sur notre exemple :

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Echidna a trouvé que la propriété est violée si `backdoor` est appelée.

## Filtrer les fonctions à appeler pendant une campagne de fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Nous allons voir comment filtrer les fonctions à fuzzer.
La cible est le contrat intelligent suivant :

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Ce petit exemple force Echidna à trouver une certaine séquence de transactions pour modifier une variable d'état.
C'est difficile pour un fuzzer.
Nous pouvons exécuter Echidna pour le vérifier :

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Filtrer les fonctions {#filtering-functions}

Echidna a du mal à trouver la bonne séquence pour tester ce contrat car les deux fonctions de réinitialisation (`reset1` et `reset2`) définiront toutes les variables d'état sur `false`.
Cependant, nous pouvons utiliser une fonctionnalité spéciale d'Echidna pour soit mettre sur liste noire la fonction de réinitialisation, soit mettre sur liste blanche uniquement les fonctions `f`, `g`,
`h` et `i`.

Pour mettre des fonctions sur liste noire, nous pouvons utiliser ce fichier de configuration :

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Une autre approche pour filtrer les fonctions consiste à lister les fonctions sur liste blanche. Pour ce faire, nous pouvons utiliser ce fichier de configuration :

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` est `true` par défaut.
- Le filtrage est effectué sur le nom complet de la fonction : le nom du contrat, un `.` et la signature de l'interface binaire d'application (ABI) (par exemple `C.f(uint256)`). Si vous avez `f()` et `f(uint256)`, vous pouvez choisir exactement laquelle filtrer. Un nom simple tel que `"reset1"` ne correspond à rien.

### Exécuter Echidna {#run-echidna-1}

Pour exécuter Echidna avec un fichier de configuration `blacklist.yaml` :

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Echidna trouvera la séquence de transactions pour falsifier la propriété presque immédiatement.

### Résumé : Filtrer les fonctions {#summary-filtering-functions}

Echidna peut soit mettre sur liste noire, soit mettre sur liste blanche les fonctions à appeler pendant une campagne de fuzzing en utilisant :

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna démarre une campagne de fuzzing soit en mettant sur liste noire `C.f1()`, `C.f2()` et `C.f3()`, soit en n'appelant que celles-ci, selon
la valeur du booléen `filterBlacklist`.

## Comment tester l'assertion de Solidity avec Echidna {#how-to-test-soliditys-assert-with-echidna}

Dans ce court tutoriel, nous allons montrer comment utiliser Echidna pour tester la vérification d'assertion dans les contrats. Supposons que nous ayons un contrat comme celui-ci :

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Depuis Solidity 0.8, les dépassements de capacité arithmétiques sont annulés par défaut. Le bloc `unchecked` restaure le comportement de bouclage (wrapping) afin que `counter` puisse subir un dépassement de capacité, ce qui est le bug que nous voulons qu'Echidna trouve.

### Écrire une assertion {#write-an-assertion}

Nous voulons nous assurer que `tmp` est inférieur ou égal à `counter` après avoir retourné sa différence. Nous pourrions écrire une
propriété Echidna, mais nous devrions stocker la valeur `tmp` quelque part. À la place, nous pourrions utiliser une assertion comme celle-ci :

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Exécuter Echidna {#run-echidna-2}

Pour activer le test d'échec d'assertion, passez `--test-mode assertion` en ligne de commande, ou créez un [fichier de configuration Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml` :

```yaml
testMode: assertion
```

Lorsque nous exécutons ce contrat dans Echidna, nous obtenons les résultats attendus :

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Comme vous pouvez le voir, Echidna signale un échec d'assertion dans la fonction `inc`. Il est possible d'ajouter plus d'une assertion par fonction, mais Echidna ne peut pas dire quelle assertion a échoué.

### Quand et comment utiliser les assertions {#when-and-how-use-assertions}

Les assertions peuvent être utilisées comme alternatives aux propriétés explicites, en particulier si les conditions à vérifier sont directement liées à l'utilisation correcte d'une opération `f`. L'ajout d'assertions après un certain code garantira que la vérification aura lieu immédiatement après son exécution :

```solidity
function f(..) public {
    // du code complexe
    ...
    assert (condition);
    ...
}

```

Au contraire, l'utilisation d'une propriété Echidna explicite exécutera aléatoirement des transactions et il n'y a pas de moyen facile d'imposer exactement quand elle sera vérifiée. Il est toujours possible de faire ce contournement :

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Cependant, il y a quelques problèmes :

- Cela échoue si `f` est déclarée comme `internal` ou `external`.
- Il n'est pas clair quels arguments doivent être utilisés pour appeler `f`.
- Si `f` est annulée, la propriété échouera.

En général, nous recommandons de suivre la [recommandation de John Regehr](https://blog.regehr.org/archives/1091) sur la façon d'utiliser les assertions :

- Ne forcez aucun effet secondaire pendant la vérification de l'assertion. Par exemple : `assert(ChangeStateAndReturn() == 1)`
- N'affirmez pas d'énoncés évidents. Par exemple `assert(var >= 0)` où `var` est déclaré comme `uint`.

Enfin, veuillez **ne pas utiliser** `require` au lieu de `assert`, car Echidna ne sera pas en mesure de le détecter (mais le contrat sera annulé de toute façon).

### Résumé : Vérification d'assertion {#summary-assertion-checking}

Ce qui suit résume l'exécution d'Echidna sur notre exemple :

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Echidna a trouvé que l'assertion dans `inc` peut échouer si cette fonction est appelée plusieurs fois avec de grands arguments.

## Collecter et modifier un corpus Echidna {#collecting-and-modifying-an-echidna-corpus}

Nous allons voir comment collecter et utiliser un corpus de transactions avec Echidna. La cible est le contrat intelligent suivant [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol) :

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Ce petit exemple force Echidna à trouver certaines valeurs pour modifier une variable d'état. C'est difficile pour un fuzzer.
Nous pouvons exécuter Echidna pour le vérifier :

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Cependant, nous pouvons toujours utiliser Echidna pour collecter un corpus lors de l'exécution de cette campagne de fuzzing.

### Collecter un corpus {#collecting-a-corpus}

Pour activer la collecte de corpus, créez un répertoire de corpus :

```sh
mkdir corpus-magic
```

Et un [fichier de configuration Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml` :

```yaml
corpusDir: "corpus-magic"
```

Maintenant, nous pouvons exécuter notre outil et vérifier le corpus collecté :

```sh
echidna magic.sol --config config.yaml
```

Echidna ne parvient toujours pas à trouver les bonnes valeurs magiques. Pour voir où il reste bloqué, regardez le rapport de couverture `corpus-magic/covered.*.txt` :

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

L'étiquette `r` signifie qu'Echidna a atteint la ligne mais que l'exécution y a été annulée, et les lignes après le dernier `require` ne sont jamais exécutées.

Les séquences de transactions collectées par Echidna sont stockées sous forme de fichiers JSON dans `corpus-magic/coverage/`. Par exemple, la première transaction de l'un de ces fichiers était :

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Clairement, cette entrée ne déclenchera pas l'échec dans notre propriété. Cependant, dans la prochaine étape, nous verrons comment la modifier pour cela.

### Amorcer un corpus {#seeding-a-corpus}

Echidna a besoin d'aide pour gérer la fonction `magic`. Nous allons copier et modifier l'entrée pour utiliser des
paramètres appropriés pour celle-ci (les noms de fichiers sont aléatoires, utilisez donc l'un de votre propre répertoire `corpus-magic/coverage/`) :

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Nous allons modifier `new.txt` pour qu'il contienne une seule transaction appelant `magic(42,129,333,0)`. Maintenant, nous pouvons réexécuter Echidna :

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Cette fois, il a trouvé que la propriété est violée immédiatement.

## Trouver des transactions avec une forte consommation de gaz {#finding-transactions-with-high-gas-consumption}

Nous allons voir comment trouver les transactions avec une forte consommation de gaz avec Echidna. Les anciennes versions d'Echidna avaient une option `estimateGas` pour cela ; elle a été supprimée dans Echidna 2.3.0. À la place, nous mesurons le gaz avec `gasleft()` et laissons le [mode d'optimisation](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) d'Echidna le maximiser. La cible est le contrat intelligent suivant :

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Ici, `expensive` peut avoir une forte consommation de gaz.

### Mesurer la consommation de gaz {#measuring-gas-consumption}

En mode d'optimisation, Echidna recherche des fonctions commençant par `echidna_` qui ne prennent aucun argument et retournent un `int256`, et essaie de trouver la séquence de transactions qui maximise la valeur retournée. Nous ajoutons un contrat de test qui appelle `f`, enregistre le gaz qu'il a utilisé et expose le maximum (enregistrez les deux contrats dans `gas.sol`) :

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Pour activer le mode d'optimisation, créez un fichier de configuration `config.yaml`. Dans cet exemple, nous allons également réduire la taille de la séquence de transactions pour rendre les résultats plus faciles à comprendre :

```yaml
testMode: optimization
seqLen: 2
```

### Exécuter Echidna {#run-echidna-3}

Une fois le fichier de configuration créé, nous pouvons exécuter Echidna comme ceci :

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- Le gaz affiché est mesuré par l'implémentation de la Machine Virtuelle Ethereum (EVM) sur laquelle Echidna s'exécute, [hevm](https://github.com/argotorg/hevm), et inclut la surcharge de l'appel interne depuis `measureF`.
- Le maximum n'est pas unique : chaque campagne est aléatoire, et les campagnes plus longues (par exemple `--test-limit 200000`) ont tendance à trouver des valeurs plus élevées.

### Filtrer les appels réduisant le gaz {#filtering-out-gas-reducing-calls}

Le tutoriel sur le **filtrage des fonctions à appeler pendant une campagne de fuzzing** ci-dessus montre comment
supprimer certaines fonctions de vos tests.  
Cela peut être critique pour obtenir une estimation précise du gaz.
Considérez l'exemple suivant :

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` appelle `check` et retourne son coût en gaz. Comme toute fonction de test Echidna, ses changements d'état sont ignorés par la suite.

Si Echidna peut appeler toutes les fonctions, il ne trouvera pas facilement de transactions avec un coût en gaz élevé :

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

C'est parce que le coût dépend de la taille de `addrs` et les appels aléatoires ont tendance à laisser le tableau presque vide.
Mettre sur liste noire `pop` et `clear`, cependant, nous donne de bien meilleurs résultats :

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

La réduction de la séquence d'appels pour ce résultat prend plusieurs minutes, car chaque relecture appelle la fonction coûteuse `check`.

### Résumé : Trouver des transactions avec une forte consommation de gaz {#summary-finding-transactions-with-high-gas-consumption}

Echidna peut trouver des transactions avec une forte consommation de gaz en mesurant le gaz avec `gasleft()` dans une fonction `echidna_` qui retourne un `int256`, et en s'exécutant en mode d'optimisation :

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna signalera la valeur maximale trouvée et la séquence de transactions qui l'a produite, une fois la campagne de fuzzing terminée.
