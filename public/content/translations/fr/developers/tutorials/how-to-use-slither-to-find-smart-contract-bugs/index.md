---
title: Comment utiliser Slither pour trouver des bugs de contrat intelligent
description: Comment utiliser Slither pour trouver automatiquement des bugs dans les contrats intelligents
author: Trailofbits
lang: fr
tags:
  - "solidity"
  - "contrats intelligents"
  - "sécurité"
  - "test"
  - "analyse statique"
skill: advanced
published: 2020-06-09
source: Créer des contrats sécurisés
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Comment utiliser Slither {#how-to-use-slither}

Le but de ce tutoriel est de démontrer comment utiliser Slither pour trouver automatiquement des bugs dans les contrats intelligents.

- [Installation](#installation)
- [Utilisation des lignes de commande](#command-line)
- [Introduction à l'analyse statique](#static-analysis): Brève introduction à l'analyse statique
- [API](#api-basics) : Description de l'API Python

## Installation {#installation}

Slither nécessite Python >= 3.6. Il peut être installé via pip ou avec docker.

Slither via pip :

```bash
pip3 install --user slither-analyzer
```

Slither via docker :

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_La dernière commande exécute eth-security-toolbox dans un docker qui a accès à votre répertoire courant. Vous pouvez changer les fichiers depuis votre hôte et exécuter les outils sur les fichiers depuis le docker_

Dans docker, lancez :

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

**Ligne de commande contre scripts définis par l'utilisateur.** Slither est livré avec un ensemble de détecteurs prédéfinis qui trouvent beaucoup de bogues communs. Faire appel à Slither à partir de la ligne de commande exécutera tous les détecteurs, aucune connaissance détaillée de l'analyse statique requise :

```bash
slither project_paths
```

En plus des détecteurs, Slither dispose de capacités de révision de code grâce à ses [printers](https://github.com/crytic/slither#printers) et [outils](https://github.com/crytic/slither#tools).

Utilisez [crytic.io](https://github.com/crytic) pour avoir accès à des détecteurs privés et à l'intégration GitHub.

## Analyse statique {#static-analysis}

Les capacités et la conception du cadre d'analyse statique Slither ont été décrites dans les articles de blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) et un [document académique](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

L'analyse statique existe dans différentes saveurs. Vous réalisez très probablement que les compilateurs comme [clang](https://clang-analyzer.llvm.org/) et [gcc](https://lwn.net/Articles/806099/) dépendent de ces techniques de recherche, mais il soutient aussi ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) et les outils basés sur des méthodes formelles telles que [Frama-C](https://frama-c.com/) et [Polyspace](https://www.mathworks.com/products/polyspace.html).

Nous ne passerons pas en revue de façon exhaustive les techniques d'analyse statique et le chercheur ici. Au lieu de cela, nous nous concentrerons sur ce qui est nécessaire pour comprendre le fonctionnement de Slither afin que vous puissiez l'utiliser plus efficacement pour trouver des bogues et comprendre du code.

- [Représentation du code](#code-representation)
- [Analyse de code](#analysis)
- [Représentation Intermédiaire](#intermediate-representation)

### Représentation du code {#code-representation}

Contrairement à une analyse dynamique, qui explique les raisons d'un seul chemin d'exécution, l'analyse statique explique tous les chemins en même temps. Pour ce faire, il repose sur une représentation du code différente. Les deux plus courants sont l'arborescence de syntaxe abstraite (AST) et le graphique de flux de contrôle (CFG).

### Arbres syntaxiques abstraits (AST) {#abstract-syntax-trees-ast}

AST est utilisé chaque fois que le compilateur analyse le code. C'est probablement la structure la plus basique sur laquelle une analyse statique peut être effectuée.

En un mot, un AST est un arbre structuré où, habituellement, chaque feuille contient une variable ou une constante, et les nœuds internes sont des opérandes ou des opérations de contrôle de flux. Considérez les codes suivants :

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

L'AST correspondant est affiché dans :

![AST](./ast.png)

Slither utilise l'AST exporté par solc.

Bien que simple à construire, l'AST est une structure imbriquée. Parfois, ce n'est pas le plus simple à analyser. Par exemple, pour identifier les opérations utilisées par l'expression `a + b <= a`, vous devez d'abord analyser `<=` puis `+`. Une approche commune est d'utiliser le design pattern « visiteur » pour naviguer dans l'arbre récursivement. Slither contient un visiteur générique dans [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Le code suivant utilise `ExpressionVisitor` pour détecter si l'expression contient un ajout :

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression correspond a l'expression qui sera testé
print(f'L’expression {expression} contient une addition: {visitor.result()}')
```

### Graphe de contrôle du flux (CFG) {#control-flow-graph-cfg}

La deuxième représentation de code la plus courante est le graphique de flux de contrôle (CFG). Comme son nom l'indique, il s'agit d'une représentation graphique qui expose tous les chemins d'exécution. Chaque nœud contient une ou plusieurs instructions. Les bords dans le graphique représentent les opérations de contrôle du flux (if/then/else, loop, etc.). Le CFG de notre exemple précédent est :

![CFG](./cfg.png)

Le CFG est la représentation sur laquelle la plupart des analyses sont construites.

De nombreuses autres représentations de code existent. Chaque représentation a des avantages et des inconvénients en fonction de l'analyse que vous voulez effectuer.

### Analyse {#analysis}

Les analyses les plus simples que vous pouvez effectuer avec Slither sont des analyses syntaxiques.

### Analyse syntaxique {#syntax-analysis}

Slither peut naviguer à travers les différents composants du code et de leur représentation pour trouver des incohérences et des défauts en utilisant une approche similaire à la recherche de modèles.

Par exemple, les détecteurs suivants recherchent les problèmes liés à la syntaxe :

- [State variavle shadowing>](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing) : itère sur toutes les variables d'état et vérifie si une variable est masquée à partir d'un contrat hérité ([état. y#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Interface ERC20 incorrecte](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface) : recherche des signatures de fonction ERC20 incorrectes ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Analyse sémantique {#semantic-analysis}

Contrairement à l'analyse syntaxique, une analyse sémantique ira plus loin et analysera le « sens » du code. Cette famille comprend quelques grands types d'analyse. Ils conduisent à des résultats plus puissants et utiles, mais sont également plus complexes à rédiger.

Les analyses sémantiques sont utilisées pour les détections de vulnérabilité les plus avancées.

#### Analyse des dépendances des données {#fixed-point-computation}

Une variable `variable_a` est dite dépendante des données de `variable_b` s'il y a un chemin pour lequel la valeur de `variable_a` est influencée par `variable_b`.

Dans le code suivant, `variable_a` est dépendant de `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither est livré avec des capacités intégrées grâce à sa représentation intermédiaire (discutée dans une section ultérieure).

Un exemple d'utilisation de la dépendance des données peut être trouvé dans le [dangereux détecteur strict d'égalité](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Ici, Slither recherchera une comparaison stricte de l'égalité avec une valeur dangereuse ([incorrect_strict_equality. y#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), et informera l'utilisateur qu'il doit utiliser `>=` ou `<=` au lieu de `==`, pour empêcher un attaquant de piéger le contrat. Entre autres, le détecteur considérera comme dangereux la valeur de retour d'un appel à `balanceOf(address)` ([incorrect_strict_equality. y#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), et utilisera le moteur de dépendance de données pour suivre son utilisation.

#### Calcul à decimales fixes {#fixed-point-computation}

Si votre analyse navigue à travers le CFG et suit les bords, vous êtes susceptible de voir des nœuds déjà visités. Par exemple, si une boucle est présentée tel qu'illustré ci-dessous :

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Votre analyse devra savoir quand s'arrêter. Il y a deux stratégies principales ici : (1) itérer sur chaque noeud un nombre limité de fois, (2) calculer un _fixpoint_. Un point fixe signifie que l'analyse de ce noeud ne fournit aucune information significative.

Un exemple de point fixe utilisé peut être trouvé dans les détecteurs de rétractation : Slither explore les nœuds et il est possible de chercher des appels externes, écrire et lire sur le stockage. Une fois qu'il a atteint un point fixe ([réentrance. y#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), il arrête l'exploration, et analyse les résultats pour voir si une réentrance est présente, à travers différents modèles de réentrance ([reentrancy_benign. y](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Écrire des analyses à l'aide de calculs fixes efficaces nécessite une bonne compréhension de la manière dont l'analyse propage ses informations.

### Représentation Intermédiaire {#intermediate-representation}

Une représentation intermédiaire (IR) est un langage destiné à être plus apte à une analyse statique que le langage original. Slither traduit Solidity à son propre IR : [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Comprendre SlithIR n'est pas nécessaire si vous voulez seulement écrire des vérifications de base. Cependant, il sera pratique si vous prévoyez d'écrire des analyses sémantiques avancées. Les imprimantes [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) et [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) vous aideront à comprendre comment le code est traduit.

## Les bases de l’API {#api-basics}

Slither a une API qui vous permet d'explorer les attributs de base du contrat et de ses fonctions.

Pour charger le code base :

```python
from slither import Slither
slither = Slither('/chemin/vers/projet')

```

### Exploration des contrats et fonctions {#exploring-contracts-and-functions}

Un objet `Slither` a :

- `contrats (list(Contrat)` : liste des contrats
- `contracts_derived (list(Contrat)` : liste des contrats qui ne sont pas hérités par un autre contrat (sous-ensemble de contrats)
- `get_contract_from_name (str)` : Renvoie un contrat à partir de son nom

Un objet `Contract` a :

- `name(str)` : Nom du contrat
- `fonctions(list(fonction))` : Liste des fonctions
- `modifiers(list(Modifier))` : Liste des fonctions
- `all_functions_called(list(Function/Modifier))` : Liste de toutes les fonctions internes accessibles par le contrat
- `inheritance(list(Contract))` : Liste des contrats hérités
- `get_function_from_signature(str)` : Renvoie une fonction à partir de sa signature
- `get_modifier_from_signature(str)` : Renvoie un Modifier à partir de sa signature
- `get_state_variable_from_name(str)` : Renvoie une StateVariable à partir de son nom

Un objet `Function` ou un `Modifier` a :

- `name(str)` : Nom de la fonction
- `contract (contract)` : le contrat où la fonction est déclarée
- `nodes(list(Node))` : Liste des noeuds composant la fonction/modifier de CFG
- `entry_point(Node)` : Point d’entrée du CFG
- `variables_read(list(Variable))` : Liste des variables de lecture
- `variables_written(list(Variable))` : Liste des variable d’écritures
- `state_variables_read(list(StateVariable))` : Liste des variables d’états de lectures (sous-ensemble de lecture des variables)
- `state_variables_read(list(StateVariable))` : Liste des variables d’états de lectures (sous-ensemble de lecture des variables)
