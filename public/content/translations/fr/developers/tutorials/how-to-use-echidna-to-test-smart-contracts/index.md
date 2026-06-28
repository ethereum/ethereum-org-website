---
title: Comment utiliser Echidna pour tester des contrats intelligents
description: Comment utiliser Echidna pour tester automatiquement des contrats intelligents
author: "Trailofbits"
lang: fr
tags: ["Solidity", "contrats intelligents", "sécurité", "test", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Installation {#installation}

Echidna peut être installé via Docker ou en utilisant le binaire précompilé.

### Echidna via Docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_La dernière commande exécute eth-security-toolbox dans un conteneur Docker qui a accès à votre répertoire actuel. Vous pouvez modifier les fichiers depuis votre hôte et exécuter les outils sur les fichiers depuis Docker._

À l'intérieur de Docker, exécutez :

```bash
solc-select 0.5.11
cd /home/training
```

### Binaire {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Introduction au fuzzing basé sur les propriétés {#introduction-to-property-based-fuzzing}

Echidna est un fuzzer basé sur les propriétés, que nous avons décrit dans nos précédents articles de blog ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Le fuzzing](https://wikipedia.org/wiki/Fuzzing) est une technique bien connue dans la communauté de la sécurité. Elle consiste à générer des entrées plus ou moins aléatoires pour trouver des bugs dans le programme. Les fuzzers pour les logiciels traditionnels (tels que [AFL](http://lcamtuf.coredump.cx/afl/) ou [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) sont reconnus comme des outils efficaces pour trouver des bugs.

Au-delà de la génération purement aléatoire d'entrées, il existe de nombreuses techniques et stratégies pour générer de bonnes entrées, notamment :

- Obtenir un retour d'information de chaque exécution et guider la génération en l'utilisant. Par exemple, si une entrée nouvellement générée conduit à la découverte d'un nouveau chemin, il peut être judicieux de générer de nouvelles entrées qui s'en rapprochent.
- Générer l'entrée en respectant une contrainte structurelle. Par exemple, si votre entrée contient un en-tête avec une somme de contrôle (checksum), il sera logique de laisser le fuzzer générer des entrées qui valident cette somme de contrôle.
- Utiliser des entrées connues pour générer de nouvelles entrées : si vous avez accès à un grand ensemble de données d'entrées valides, votre fuzzer peut générer de nouvelles entrées à partir de celles-ci, plutôt que de commencer sa génération de zéro. Celles-ci sont généralement appelées des _graines_ (seeds).

### Fuzzing basé sur les propriétés {#property-based-fuzzing}

Echidna appartient à une famille spécifique de fuzzers : le fuzzing basé sur les propriétés, fortement inspiré de [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Contrairement aux fuzzers classiques qui essaient de trouver des plantages, Echidna tentera de briser des invariants définis par l'utilisateur.

Dans les contrats intelligents, les invariants sont des fonctions Solidity qui peuvent représenter tout état incorrect ou invalide que le contrat peut atteindre, notamment :

- Contrôle d'accès incorrect : l'attaquant est devenu le propriétaire du contrat.
- Machine d'état incorrecte : les jetons peuvent être transférés alors que le contrat est en pause.
- Arithmétique incorrecte : l'utilisateur peut provoquer un dépassement de capacité par le bas (underflow) de son solde et obtenir des jetons gratuits illimités.

### Tester une propriété avec Echidna {#testing-a-property-with-echidna}

Nous allons voir comment tester un contrat intelligent avec Echidna. La cible est le contrat intelligent suivant [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) :

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
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
- Signaler toute transaction conduisant une propriété à retourner `false` ou à lever une erreur.
- Ignorer les effets secondaires lors de l'appel d'une propriété (c'est-à-dire que si la propriété modifie une variable d'état, elle est ignorée après le test)

La propriété suivante vérifie que l'appelant n'a pas plus de 1000 jetons :

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Utilisez l'héritage pour séparer votre contrat de vos propriétés :

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) implémente la propriété et hérite du jeton.

### Initialiser un contrat {#initiate-a-contract}

Echidna a besoin d'un [constructeur](/developers/docs/smart-contracts/anatomy/#constructor-functions) sans argument. Si votre contrat nécessite une initialisation spécifique, vous devez le faire dans le constructeur.

Il y a quelques adresses spécifiques dans Echidna :

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` qui appelle le constructeur.
- `0x10000`, `0x20000` et `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` qui appellent aléatoirement les autres fonctions.

Nous n'avons besoin d'aucune initialisation particulière dans notre exemple actuel, par conséquent notre constructeur est vide.

### Exécuter Echidna {#run-echidna}

Echidna est lancé avec :

```bash
echidna-test contract.sol
```

Si contract.sol contient plusieurs contrats, vous pouvez spécifier la cible :

```bash
echidna-test contract.sol --contract MyContract
```

### Résumé : Tester une propriété {#summary-testing-a-property}

Ce qui suit résume l'exécution d'Echidna sur notre exemple :

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna a trouvé que la propriété est violée si `backdoor` est appelée.

## Filtrer les fonctions à appeler pendant une campagne de fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Nous allons voir comment filtrer les fonctions à fuzzer.
La cible est le contrat intelligent suivant :

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Ce petit exemple force Echidna à trouver une certaine séquence de transactions pour modifier une variable d'état.
C'est difficile pour un fuzzer (il est recommandé d'utiliser un outil d'exécution symbolique comme [Manticore](https://github.com/trailofbits/manticore)).
Nous pouvons exécuter Echidna pour vérifier cela :

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Filtrer les fonctions {#filtering-functions}

Echidna a du mal à trouver la séquence correcte pour tester ce contrat car les deux fonctions de réinitialisation (`reset1` et `reset2`) définiront toutes les variables d'état à `false`.
Cependant, nous pouvons utiliser une fonctionnalité spéciale d'Echidna pour soit mettre sur liste noire la fonction de réinitialisation, soit mettre sur liste blanche uniquement les fonctions `f`, `g`,
`h` et `i`.

Pour mettre des fonctions sur liste noire, nous pouvons utiliser ce fichier de configuration :

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Une autre approche pour filtrer les fonctions consiste à lister les fonctions sur liste blanche. Pour ce faire, nous pouvons utiliser ce fichier de configuration :

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` est `true` par défaut.
- Le filtrage sera effectué uniquement par nom (sans paramètres). Si vous avez `f()` et `f(uint256)`, le filtre `"f"` correspondra aux deux fonctions.

### Exécuter Echidna {#run-echidna-1}

Pour exécuter Echidna avec un fichier de configuration `blacklist.yaml` :

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna trouvera la séquence de transactions pour falsifier la propriété presque immédiatement.

### Résumé : Filtrer les fonctions {#summary-filtering-functions}

Echidna peut soit mettre sur liste noire, soit mettre sur liste blanche les fonctions à appeler pendant une campagne de fuzzing en utilisant :

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna démarre une campagne de fuzzing soit en mettant sur liste noire `f1`, `f2` et `f3`, soit en n'appelant que celles-ci, selon
la valeur du booléen `filterBlacklist`.

## Comment tester l'assertion de Solidity avec Echidna {#how-to-test-soliditys-assert-with-echidna}

Dans ce court tutoriel, nous allons montrer comment utiliser Echidna pour tester la vérification d'assertion dans les contrats. Supposons que nous ayons un contrat comme celui-ci :

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Écrire une assertion {#write-an-assertion}

Nous voulons nous assurer que `tmp` est inférieur ou égal à `counter` après avoir retourné sa différence. Nous pourrions écrire une
propriété Echidna, mais nous aurions besoin de stocker la valeur `tmp` quelque part. À la place, nous pourrions utiliser une assertion comme celle-ci :

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Exécuter Echidna {#run-echidna-2}

Pour activer le test d'échec d'assertion, créez un [fichier de configuration Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml` :

```yaml
checkAsserts: true
```

Lorsque nous exécutons ce contrat dans Echidna, nous obtenons les résultats attendus :

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
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

En général, nous recommandons de suivre [la recommandation de John Regehr](https://blog.regehr.org/archives/1091) sur la façon d'utiliser les assertions :

- Ne forcez aucun effet secondaire pendant la vérification de l'assertion. Par exemple : `assert(ChangeStateAndReturn() == 1)`
- N'affirmez pas d'énoncés évidents. Par exemple `assert(var >= 0)` où `var` est déclarée comme `uint`.

Enfin, veuillez **ne pas utiliser** `require` au lieu de `assert`, car Echidna ne sera pas en mesure de le détecter (mais le contrat sera annulé de toute façon).

### Résumé : Vérification d'assertion {#summary-assertion-checking}

Ce qui suit résume l'exécution d'Echidna sur notre exemple :

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna a trouvé que l'assertion dans `inc` peut échouer si cette fonction est appelée plusieurs fois avec de grands arguments.

## Collecter et modifier un corpus Echidna {#collecting-and-modifying-an-echidna-corpus}

Nous allons voir comment collecter et utiliser un corpus de transactions avec Echidna. La cible est le contrat intelligent suivant [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol) :

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Ce petit exemple force Echidna à trouver certaines valeurs pour modifier une variable d'état. C'est difficile pour un fuzzer
(il est recommandé d'utiliser un outil d'exécution symbolique comme [Manticore](https://github.com/trailofbits/manticore)).
Nous pouvons exécuter Echidna pour vérifier cela :

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Cependant, nous pouvons toujours utiliser Echidna pour collecter un corpus lors de l'exécution de cette campagne de fuzzing.

### Collecter un corpus {#collecting-a-corpus}

Pour activer la collecte de corpus, créez un répertoire de corpus :

```bash
mkdir corpus-magic
```

Et un [fichier de configuration Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml` :

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Maintenant, nous pouvons exécuter notre outil et vérifier le corpus collecté :

```bash
echidna-test magic.sol --config config.yaml
```

Echidna ne peut toujours pas trouver les valeurs magiques correctes, mais nous pouvons jeter un œil au corpus qu'il a collecté.
Par exemple, l'un de ces fichiers était :

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Clairement, cette entrée ne déclenchera pas l'échec dans notre propriété. Cependant, dans la prochaine étape, nous verrons comment la modifier pour cela.

### Initialiser un corpus avec des graines (seeding) {#seeding-a-corpus}

Echidna a besoin d'aide pour gérer la fonction `magic`. Nous allons copier et modifier l'entrée pour utiliser des
paramètres appropriés pour celle-ci :

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Nous allons modifier `new.txt` pour appeler `magic(42,129,333,0)`. Maintenant, nous pouvons réexécuter Echidna :

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

Cette fois, il a trouvé que la propriété est violée immédiatement.

## Trouver des transactions avec une forte consommation de gaz {#finding-transactions-with-high-gas-consumption}

Nous allons voir comment trouver les transactions avec une forte consommation de gaz avec Echidna. La cible est le contrat intelligent suivant :

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Ici, `expensive` peut avoir une forte consommation de gaz.

Actuellement, Echidna a toujours besoin d'une propriété à tester : ici `echidna_test` retourne toujours `true`.
Nous pouvons exécuter Echidna pour vérifier cela :

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Mesurer la consommation de gaz {#measuring-gas-consumption}

Pour activer la consommation de gaz avec Echidna, créez un fichier de configuration `config.yaml` :

```yaml
estimateGas: true
```

Dans cet exemple, nous allons également réduire la taille de la séquence de transactions pour rendre les résultats plus faciles à comprendre :

```yaml
seqLen: 2
estimateGas: true
```

### Exécuter Echidna {#run-echidna-3}

Une fois le fichier de configuration créé, nous pouvons exécuter Echidna comme ceci :

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Le gaz affiché est une estimation fournie par [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Filtrer les appels réduisant le gaz {#filtering-out-gas-reducing-calls}

Le tutoriel sur **le filtrage des fonctions à appeler pendant une campagne de fuzzing** ci-dessus montre comment
supprimer certaines fonctions de vos tests.  
Cela peut être critique pour obtenir une estimation précise du gaz.
Considérez l'exemple suivant :

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Si Echidna peut appeler toutes les fonctions, il ne trouvera pas facilement les transactions avec un coût en gaz élevé :

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

C'est parce que le coût dépend de la taille de `addrs` et les appels aléatoires ont tendance à laisser le tableau presque vide.
Mettre sur liste noire `pop` et `clear`, cependant, nous donne de bien meilleurs résultats :

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Résumé : Trouver des transactions avec une forte consommation de gaz {#summary-finding-transactions-with-high-gas-consumption}

Echidna peut trouver des transactions avec une forte consommation de gaz en utilisant l'option de configuration `estimateGas` :

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna signalera une séquence avec la consommation de gaz maximale pour chaque fonction, une fois la campagne de fuzzing terminée.