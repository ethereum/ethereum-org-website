---
title: Comment utiliser Slither pour trouver des bugs dans les contrats intelligents
description: Comment utiliser Slither pour trouver automatiquement des bugs dans les contrats intelligents
author: Trailofbits
lang: fr
tags: ["Solidity", "contrats intelligents", "sécurité", "tests"]
skill: advanced
breadcrumb: Slither
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Comment utiliser Slither {#how-to-use-slither}

Le but de ce tutoriel est de montrer comment utiliser Slither pour trouver automatiquement des bugs dans les contrats intelligents.

- [Installation](#installation)
- [Utilisation en ligne de commande](#command-line)
- [Introduction à l'analyse statique](#static-analysis) : Brève introduction à l'analyse statique
- [API](#api-basics) : Description de l'API Python

## Installation {#installation}

Slither nécessite Python >= 3.6. Il peut être installé via pip ou en utilisant Docker.

Slither via pip :

```bash
pip3 install --user slither-analyzer
```

Slither via Docker :

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_La dernière commande exécute eth-security-toolbox dans un conteneur Docker qui a accès à votre répertoire actuel. Vous pouvez modifier les fichiers depuis votre hôte et exécuter les outils sur les fichiers depuis Docker._

À l'intérieur de Docker, exécutez :

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Exécuter un script {#running-a-script}

Pour exécuter un script Python avec Python 3 :

```bash
python3 script.py
```

### Ligne de commande {#command-line}

**Ligne de commande par rapport aux scripts définis par l'utilisateur.** Slither est livré avec un ensemble de détecteurs prédéfinis qui trouvent de nombreux bugs courants. Appeler Slither depuis la ligne de commande exécutera tous les détecteurs, aucune connaissance détaillée de l'analyse statique n'est nécessaire :

```bash
slither project_paths
```

En plus des détecteurs, Slither possède des capacités de révision de code grâce à ses [afficheurs (printers)](https://github.com/crytic/slither#printers) et [outils](https://github.com/crytic/slither#tools).

Utilisez [crytic.io](https://github.com/crytic) pour accéder à des détecteurs privés et à l'intégration GitHub.

## Analyse statique {#static-analysis}

Les capacités et la conception du framework d'analyse statique Slither ont été décrites dans des articles de blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) et un [article académique](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

L'analyse statique existe sous différentes formes. Vous réalisez très probablement que les compilateurs comme [clang](https://clang-analyzer.llvm.org/) et [gcc](https://lwn.net/Articles/806099/) dépendent de ces techniques de recherche, mais elles sous-tendent également [Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) et des outils basés sur des méthodes formelles comme [Frama-C](https://frama-c.com/) et [Polyspace](https://www.mathworks.com/products/polyspace.html).

Nous ne passerons pas en revue de manière exhaustive les techniques d'analyse statique et les chercheurs ici. Au lieu de cela, nous nous concentrerons sur ce qui est nécessaire pour comprendre comment fonctionne Slither afin que vous puissiez l'utiliser plus efficacement pour trouver des bugs et comprendre le code.

- [Représentation du code](#code-representation)
- [Analyse du code](#analysis)
- [Représentation intermédiaire](#intermediate-representation)

### Représentation du code {#code-representation}

Contrairement à une analyse dynamique, qui raisonne sur un seul chemin d'exécution, l'analyse statique raisonne sur tous les chemins à la fois. Pour ce faire, elle s'appuie sur une représentation de code différente. Les deux plus courantes sont l'arbre de syntaxe abstraite (AST) et le graphe de flux de contrôle (CFG).

### Arbres de syntaxe abstraite (AST) {#abstract-syntax-trees-ast}

Les AST sont utilisés chaque fois que le compilateur analyse du code. C'est probablement la structure la plus basique sur laquelle l'analyse statique peut être effectuée.

En résumé, un AST est un arbre structuré où, généralement, chaque feuille contient une variable ou une constante et les nœuds internes sont des opérandes ou des opérations de flux de contrôle. Considérez le code suivant :

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

L'AST correspondant est illustré dans :

![AST](./ast.png)

Slither utilise l'AST exporté par solc.

Bien que simple à construire, l'AST est une structure imbriquée. Parfois, ce n'est pas la plus simple à analyser. Par exemple, pour identifier les opérations utilisées par l'expression `a + b <= a`, vous devez d'abord analyser `<=` puis `+`. Une approche courante consiste à utiliser ce qu'on appelle le patron de conception visiteur (visitor pattern), qui navigue à travers l'arbre de manière récursive. Slither contient un visiteur générique dans [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Le code suivant utilise `ExpressionVisitor` pour détecter si l'expression contient une addition :

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
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Graphe de flux de contrôle (CFG) {#control-flow-graph-cfg}

La deuxième représentation de code la plus courante est le graphe de flux de contrôle (CFG). Comme son nom l'indique, il s'agit d'une représentation basée sur un graphe qui expose tous les chemins d'exécution. Chaque nœud contient une ou plusieurs instructions. Les arêtes du graphe représentent les opérations de flux de contrôle (if/then/else, boucle, etc.). Le CFG de notre exemple précédent est :

![CFG](./cfg.png)

Le CFG est la représentation sur laquelle la plupart des analyses sont construites.

De nombreuses autres représentations de code existent. Chaque représentation a des avantages et des inconvénients selon l'analyse que vous souhaitez effectuer.

### Analyse {#analysis}

Le type d'analyses le plus simple que vous pouvez effectuer avec Slither sont les analyses syntaxiques.

### Analyse syntaxique {#syntax-analysis}

Slither peut naviguer à travers les différents composants du code et leur représentation pour trouver des incohérences et des failles en utilisant une approche de type reconnaissance de motifs (pattern matching).

Par exemple, les détecteurs suivants recherchent des problèmes liés à la syntaxe :

- [Masquage de variable d'état (State variable shadowing)](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing) : itère sur toutes les variables d'état et vérifie si l'une d'elles masque une variable d'un contrat hérité ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Interface ERC-20 incorrecte](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface) : recherche des signatures de fonction ERC-20 incorrectes ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Analyse sémantique {#semantic-analysis}

Contrairement à l'analyse syntaxique, une analyse sémantique ira plus loin et analysera le « sens » du code. Cette famille comprend quelques grands types d'analyses. Elles conduisent à des résultats plus puissants et utiles, mais sont également plus complexes à écrire.

Les analyses sémantiques sont utilisées pour les détections de vulnérabilités les plus avancées.

#### Analyse des dépendances de données {#fixed-point-computation}

Une variable `variable_a` est dite dépendante des données de `variable_b` s'il existe un chemin pour lequel la valeur de `variable_a` est influencée par `variable_b`.

Dans le code suivant, `variable_a` est dépendante de `variable_b` :

```solidity
// ...
variable_a = variable_b + 1;
```

Slither est doté de capacités intégrées de [dépendance de données](https://github.com/crytic/slither/wiki/data-dependency), grâce à sa représentation intermédiaire (abordée dans une section ultérieure).

Un exemple d'utilisation de la dépendance de données peut être trouvé dans le [détecteur d'égalité stricte dangereuse](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Ici, Slither recherchera une comparaison d'égalité stricte avec une valeur dangereuse ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), et informera l'utilisateur qu'il devrait utiliser `>=` ou `<=` plutôt que `==`, pour empêcher un attaquant de piéger le contrat. Entre autres, le détecteur considérera comme dangereuse la valeur de retour d'un appel à `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), et utilisera le moteur de dépendance de données pour suivre son utilisation.

#### Calcul de point fixe {#fixed-point-computation-2}

Si votre analyse navigue à travers le CFG et suit les arêtes, vous êtes susceptible de voir des nœuds déjà visités. Par exemple, si une boucle est présentée comme indiqué ci-dessous :

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Votre analyse devra savoir quand s'arrêter. Il y a deux stratégies principales ici : (1) itérer sur chaque nœud un nombre fini de fois, (2) calculer ce qu'on appelle un _point fixe_ (fixpoint). Un point fixe signifie fondamentalement que l'analyse de ce nœud ne fournit aucune information significative.

Un exemple de point fixe utilisé peut être trouvé dans les détecteurs de réentrance : Slither explore les nœuds, et recherche les appels externes, les écritures et les lectures dans le stockage. Une fois qu'il a atteint un point fixe ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), il arrête l'exploration, et analyse les résultats pour voir si une réentrance est présente, à travers différents modèles de réentrance ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

L'écriture d'analyses utilisant un calcul de point fixe efficace nécessite une bonne compréhension de la façon dont l'analyse propage ses informations.

### Représentation intermédiaire {#intermediate-representation}

Une représentation intermédiaire (IR) est un langage censé être plus propice à l'analyse statique que l'original. Slither traduit Solidity vers sa propre IR : [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Comprendre SlithIR n'est pas nécessaire si vous souhaitez uniquement écrire des vérifications de base. Cependant, cela vous sera utile si vous prévoyez d'écrire des analyses sémantiques avancées. Les afficheurs (printers) [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) et [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) vous aideront à comprendre comment le code est traduit.

## Bases de l'API {#api-basics}

Slither possède une API qui vous permet d'explorer les attributs de base du contrat et de ses fonctions.

Pour charger une base de code :

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Explorer les contrats et les fonctions {#exploring-contracts-and-functions}

Un objet `Slither` possède :

- `contracts (list(Contract)` : liste des contrats
- `contracts_derived (list(Contract)` : liste des contrats qui ne sont pas hérités par un autre contrat (sous-ensemble de contrats)
- `get_contract_from_name (str)` : Retourne un contrat à partir de son nom

Un objet `Contract` possède :

- `name (str)` : Nom du contrat
- `functions (list(Function))` : Liste des fonctions
- `modifiers (list(Modifier))` : Liste des fonctions
- `all_functions_called (list(Function/Modifier))` : Liste de toutes les fonctions internes accessibles par le contrat
- `inheritance (list(Contract))` : Liste des contrats hérités
- `get_function_from_signature (str)` : Retourne une fonction (Function) à partir de sa signature
- `get_modifier_from_signature (str)` : Retourne un modificateur (Modifier) à partir de sa signature
- `get_state_variable_from_name (str)` : Retourne une variable d'état (StateVariable) à partir de son nom

Un objet `Function` ou `Modifier` possède :

- `name (str)` : Nom de la fonction
- `contract (contract)` : le contrat où la fonction est déclarée
- `nodes (list(Node))` : Liste des nœuds composant le CFG de la fonction/du modificateur
- `entry_point (Node)` : Point d'entrée du CFG
- `variables_read (list(Variable))` : Liste des variables lues
- `variables_written (list(Variable))` : Liste des variables écrites
- `state_variables_read (list(StateVariable))` : Liste des variables d'état lues (sous-ensemble de variables lues)
- `state_variables_written (list(StateVariable))` : Liste des variables d'état écrites (sous-ensemble de variables écrites)
