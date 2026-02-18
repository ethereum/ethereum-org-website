---
title: Comment utiliser Slither pour trouver des bogues dans les contrats intelligents
description: Comment utiliser Slither pour trouver automatiquement des bogues dans les contrats intelligents
author: Trailofbits
lang: fr
tags:
  [
    "solidité",
    "contrats intelligents",
    "sécurité",
    "test"
  ]
skill: advanced
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Comment utiliser Slither {#how-to-use-slither}

Le but de ce tutoriel est de montrer comment utiliser Slither pour trouver automatiquement des bogues dans les contrats intelligents.

- [Installation](#installation)
- [Utilisation de la ligne de commande](#command-line)
- [Introduction à l'analyse statique](#static-analysis) : brève introduction à l'analyse statique
- [API](#api-basics) : description de l'API Python

## Installation {#installation}

Slither requiert Python >= 3.6. Il peut être installé via pip ou en utilisant docker.

Slither via pip :

```bash
pip3 install --user slither-analyzer
```

Slither via docker :

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_La dernière commande exécute eth-security-toolbox dans un docker qui a accès à votre répertoire actuel. Vous pouvez modifier les fichiers depuis votre hôte, et exécuter les outils sur les fichiers depuis le docker_

À l'intérieur de docker, exécutez :

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Exécuter un script {#running-a-script}

Pour exécuter un script python avec python 3 :

```bash
python3 script.py
```

### Ligne de commande {#command-line}

**Ligne de commande ou scripts définis par l'utilisateur.** Slither est livré avec un ensemble de détecteurs prédéfinis qui trouvent de nombreux bogues courants. Appeler Slither depuis la ligne de commande exécutera tous les détecteurs, aucune connaissance détaillée de l'analyse statique n'est requise :

```bash
slither project_paths
```

En plus des détecteurs, Slither dispose de fonctionnalités de révision de code via ses [printers](https://github.com/crytic/slither#printers) et ses [tools](https://github.com/crytic/slither#tools).

Utilisez [crytic.io](https://github.com/crytic) pour accéder à des détecteurs privés et à l'intégration GitHub.

## Analyse statique {#static-analysis}

Les capacités et la conception du framework d'analyse statique Slither ont été décrites dans des articles de blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) et un [article académique](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

L'analyse statique se présente sous différentes formes. Vous savez probablement que les compilateurs comme [clang](https://clang-analyzer.llvm.org/) et [gcc](https://lwn.net/Articles/806099/) s'appuient sur ces techniques de recherche, mais elles sous-tendent également ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) et des outils basés sur des méthodes formelles comme [Frama-C](https://frama-c.com/) et [Polyspace](https://www.mathworks.com/products/polyspace.html)).

Nous n'allons pas passer en revue de manière exhaustive les techniques d'analyse statique et les chercheurs ici. Au lieu de cela, nous nous concentrerons sur ce qui est nécessaire pour comprendre le fonctionnement de Slither afin que vous puissiez l'utiliser plus efficacement pour trouver des bogues et comprendre le code.

- [Représentation du code](#code-representation)
- [Analyse du code](#analysis)
- [Représentation intermédiaire](#intermediate-representation)

### Représentation du code {#code-representation}

Contrairement à une analyse dynamique, qui raisonne sur un seul chemin d'exécution, l'analyse statique raisonne sur tous les chemins à la fois. Pour ce faire, elle s'appuie sur une représentation différente du code. Les deux plus courantes sont l'arbre de syntaxe abstraite (AST) et le graphe de flot de contrôle (CFG).

### Arbres de syntaxe abstraits (AST) {#abstract-syntax-trees-ast}

Les AST sont utilisés chaque fois que le compilateur analyse le code. C'est probablement la structure la plus élémentaire sur laquelle une analyse statique peut être effectuée.

En bref, un AST est un arbre structuré où, généralement, chaque feuille contient une variable ou une constante et les nœuds internes sont des opérandes ou des opérations de flux de contrôle. Considérons le code suivant :

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

L'AST correspondant est présenté ci-dessous :

![AST](./ast.png)

Slither utilise l'AST exporté par solc.

Bien que simple à construire, l'AST est une structure imbriquée. Parfois, ce n'est pas la plus simple à analyser. Par exemple, pour identifier les opérations utilisées par l'expression `a + b <= a`, vous devez d'abord analyser `<=` puis `+`. Une approche courante consiste à utiliser le patron de conception visiteur, qui parcourt l'arbre de manière récursive. Slither contient un visiteur générique dans [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Le code suivant utilise `ExpressionVisitor` pour détecter si l'expression contient une addition :

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression est l'expression à tester
print(f'L\'expression {expression} contient une addition : {visitor.result()}')
```

### Graphe de flot de contrôle (CFG) {#control-flow-graph-cfg}

La deuxième représentation de code la plus courante est le graphe de flot de contrôle (CFG). Comme son nom l'indique, il s'agit d'une représentation basée sur un graphe qui expose tous les chemins d'exécution. Chaque nœud contient une ou plusieurs instructions. Les arêtes du graphe représentent les opérations de flux de contrôle (if/then/else, boucle, etc.). Le CFG de notre exemple précédent est :

![CFG](./cfg.png)

Le CFG est la représentation sur laquelle la plupart des analyses sont construites.

Il existe de nombreuses autres représentations du code. Chaque représentation a ses avantages et ses inconvénients en fonction de l'analyse que vous souhaitez effectuer.

### Analyse {#analysis}

Les types d'analyses les plus simples que vous pouvez effectuer avec Slither sont les analyses syntaxiques.

### Analyse syntaxique {#syntax-analysis}

Slither peut naviguer à travers les différents composants du code et leur représentation pour trouver des incohérences et des défauts en utilisant une approche de type reconnaissance de formes.

Par exemple, les détecteurs suivants recherchent des problèmes liés à la syntaxe :

- [Masquage de variable d'état](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing) : itère sur toutes les variables d'état et vérifie si l'une d'entre elles masque une variable d'un contrat hérité ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Interface ERC20 incorrecte](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface) : recherche les signatures de fonction ERC20 incorrectes ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Analyse sémantique {#semantic-analysis}

Contrairement à l'analyse syntaxique, une analyse sémantique va plus loin et analyse la « signification » du code. Cette famille comprend quelques grands types d'analyses. Elles mènent à des résultats plus puissants et utiles, mais sont aussi plus complexes à écrire.

Les analyses sémantiques sont utilisées pour les détections de vulnérabilités les plus avancées.

#### Analyse de dépendance des données {#fixed-point-computation}

Une variable `variable_a` est dite dépendante des données de `variable_b` s'il existe un chemin pour lequel la valeur de `variable_a` est influencée par `variable_b`.

Dans le code suivant, `variable_a` dépend de `variable_b` :

```solidity
// ...
variable_a = variable_b + 1;
```

Slither dispose de fonctionnalités intégrées de [dépendance des données](https://github.com/crytic/slither/wiki/data-dependency), grâce à sa représentation intermédiaire (abordée dans une section ultérieure).

Un exemple d'utilisation de la dépendance des données se trouve dans le [détecteur d'égalité stricte dangereuse](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Ici, Slither recherchera une comparaison d'égalité stricte à une valeur dangereuse ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), et informera l'utilisateur qu'il doit utiliser `>=` ou `<=` plutôt que `==`, pour empêcher un attaquant de piéger le contrat. Entre autres, le détecteur considérera comme dangereuse la valeur de retour d'un appel à `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), et utilisera le moteur de dépendance des données pour suivre son utilisation.

#### Calcul de point fixe {#fixed-point-computation}

Si votre analyse parcourt le CFG et suit les arêtes, vous êtes susceptible de voir des nœuds déjà visités. Par exemple, si une boucle est présentée comme ci-dessous :

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Votre analyse devra savoir quand s'arrêter. Il y a deux stratégies principales ici : (1) itérer sur chaque nœud un nombre fini de fois, (2) calculer un soi-disant _point fixe_. Un point fixe signifie essentiellement que l'analyse de ce nœud ne fournit plus aucune information significative.

Un exemple d'utilisation de point fixe se trouve dans les détecteurs de réentrance : Slither explore les nœuds et recherche les appels externes, l'écriture et la lecture dans le stockage. Une fois qu'il a atteint un point fixe ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), il arrête l'exploration et analyse les résultats pour voir si une réentrance est présente, à travers différents modèles de réentrance ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

L'écriture d'analyses utilisant un calcul de point fixe efficace requiert une bonne compréhension de la manière dont l'analyse propage ses informations.

### Représentation intermédiaire {#intermediate-representation}

Une représentation intermédiaire (RI) est un langage destiné à être plus adapté à l'analyse statique que le langage original. Slither traduit Solidity dans sa propre RI : [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Comprendre SlithIR n'est pas nécessaire si vous voulez seulement écrire des vérifications de base. Cependant, ce sera utile si vous prévoyez d'écrire des analyses sémantiques avancées. Les printers [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) et [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) vous aideront à comprendre comment le code est traduit.

## Principes de base de l'API {#api-basics}

Slither dispose d'une API qui vous permet d'explorer les attributs de base du contrat et de ses fonctions.

Pour charger une base de code :

```python
from slither import Slither
slither = Slither('/chemin/vers/le/projet')

```

### Explorer les contrats et les fonctions {#exploring-contracts-and-functions}

Un objet `Slither` possède :

- `contracts (list(Contract)` : liste de contrats
- `contracts_derived (list(Contract)` : liste de contrats qui ne sont pas hérités par un autre contrat (sous-ensemble de contrats)
- `get_contract_from_name (str)` : renvoie un contrat à partir de son nom

Un objet `Contract` possède :

- `name (str)` : nom du contrat
- `functions (list(Function))` : liste des fonctions
- `modifiers (list(Modifier))` : liste de modificateurs
- `all_functions_called (list(Function/Modifier))` : liste de toutes les fonctions internes accessibles par le contrat
- `inheritance (list(Contract))` : liste des contrats hérités
- `get_function_from_signature (str)` : renvoie une fonction à partir de sa signature
- `get_modifier_from_signature (str)` : renvoie un modificateur à partir de sa signature
- `get_state_variable_from_name (str)` : renvoie une StateVariable à partir de son nom

Un objet `Function` ou `Modifier` possède :

- `name (str)` : nom de la fonction
- `contract (contract)` : le contrat où la fonction est déclarée
- `nodes (list(Node))` : liste des nœuds composant le CFG de la fonction/du modificateur
- `entry_point (Node)` : point d'entrée du CFG
- `variables_read (list(Variable))` : liste des variables lues
- `variables_written (list(Variable))` : liste des variables écrites
- `state_variables_read (list(StateVariable))` : liste des variables d'état lues (sous-ensemble de `variables_read`)
- `state_variables_written (list(StateVariable))` : liste des variables d'état écrites (sous-ensemble de `variables_written`)
