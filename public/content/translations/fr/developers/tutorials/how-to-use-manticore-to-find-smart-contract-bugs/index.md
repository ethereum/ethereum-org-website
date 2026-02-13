---
title: Comment utiliser Manticore pour trouver des bugs dans les contrats intelligents
description: Comment utiliser Manticore pour trouver automatiquement des bugs dans les contrats intelligents
author: Trailofbits
lang: fr
tags:
  [
    "solidité",
    "contrats intelligents",
    "sécurité",
    "test",
    "vérification formelle"
  ]
skill: advanced
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Le but de ce tutoriel est de montrer comment utiliser Manticore pour trouver automatiquement des bugs dans les contrats intelligents.

## Installation {#installation}

Manticore requiert python >= 3.6. Il peut être installé via pip ou en utilisant docker.

### Manticore via docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_La dernière commande exécute eth-security-toolbox dans un docker qui a accès à votre répertoire actuel. Vous pouvez modifier les fichiers depuis votre hôte, et exécuter les outils sur les fichiers depuis le docker_

À l'intérieur de docker, exécutez :

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore via pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 est recommandé.

### Exécuter un script {#running-a-script}

Pour exécuter un script python avec python 3 :

```bash
python3 script.py
```

## Introduction à l'exécution symbolique dynamique {#introduction-to-dynamic-symbolic-execution}

### L'exécution symbolique dynamique en bref {#dynamic-symbolic-execution-in-a-nutshell}

L'exécution symbolique dynamique (DSE) est une technique d'analyse de programme qui explore un espace d'état avec un degré élevé de conscience sémantique. Cette technique est basée sur la découverte de « chemins de programme », représentés par des formules mathématiques appelées `prédicats de chemin`. Conceptuellement, cette technique opère sur les prédicats de chemin en deux étapes :

1. Ils sont construits en utilisant des contraintes sur les entrées du programme.
2. Ils sont utilisés pour générer des entrées de programme qui entraîneront l'exécution des chemins associés.

Cette approche ne produit aucun faux positif dans le sens où tous les états de programme identifiés peuvent être déclenchés lors de l'exécution concrète. Par exemple, si l'analyse trouve un dépassement d'entier, sa reproductibilité est garantie.

### Exemple de prédicat de chemin {#path-predicate-example}

Pour avoir un aperçu du fonctionnement du DSE, considérez l'exemple suivant :

```solidity
function f(uint a){

  if (a == 65) {
      // Un bug est présent
  }

}
```

Comme `f()` contient deux chemins, un DSE construira deux prédicats de chemin différents :

- Chemin 1 : `a == 65`
- Chemin 2 : `Not (a == 65)`

Chaque prédicat de chemin est une formule mathématique qui peut être donnée à un [solveur SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), qui tentera de résoudre l'équation. Pour le `Chemin 1`, le solveur dira que le chemin peut être exploré avec `a = 65`. Pour le `Chemin 2`, le solveur peut donner à `a` n'importe quelle valeur autre que 65, par exemple `a = 0`.

### Vérifier les propriétés {#verifying-properties}

Manticore permet un contrôle total sur l'exécution de chaque chemin. En conséquence, il vous permet d'ajouter des contraintes arbitraires à pratiquement n'importe quoi. Ce contrôle permet la création de propriétés sur le contrat.

Prenons l'exemple suivant :

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // aucune protection contre le dépassement
  return c;
}
```

Il n'y a ici qu'un seul chemin à explorer dans la fonction :

- Chemin 1 : `c = a + b`

En utilisant Manticore, vous pouvez vérifier le dépassement et ajouter des contraintes au prédicat de chemin :

- `c = a + b AND (c < a OR c < b)`

S'il est possible de trouver des valeurs pour `a` et `b` pour lesquelles le prédicat de chemin ci-dessus est réalisable, cela signifie que vous avez trouvé un dépassement. Par exemple, le solveur peut générer l'entrée `a = 10, b = MAXUINT256`.

Si vous considérez une version corrigée :

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

La formule associée à la vérification de dépassement serait :

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Cette formule ne peut pas être résolue ; en d'autres termes, c'est une **preuve** que dans `safe_add`, `c` augmentera toujours.

DSE est donc un outil puissant, qui peut vérifier des contraintes arbitraires sur votre code.

## Exécution sous Manticore {#running-under-manticore}

Nous allons voir comment explorer un contrat intelligent avec l'API Manticore. La cible est le contrat intelligent suivant [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) :

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Lancer une exploration autonome {#run-a-standalone-exploration}

Vous pouvez exécuter Manticore directement sur le contrat intelligent avec la commande suivante (`project` peut être un fichier Solidity, ou un répertoire de projet) :

```bash
$ manticore project
```

Vous obtiendrez en sortie des cas de test comme celui-ci (l'ordre peut changer) :

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Sans informations supplémentaires, Manticore explorera le contrat avec de nouvelles transactions symboliques
jusqu’à ce qu’il n’explore plus de nouveaux chemins dans le contrat. Manticore n'exécute pas de nouvelles transactions après un échec (p. ex., après une annulation).

Manticore générera les informations dans un répertoire `mcore_*`. Vous trouverez notamment dans ce répertoire :

- `global.summary` : couverture et avertissements du compilateur
- `test_XXXXX.summary` : couverture, dernière instruction, soldes des comptes par cas de test
- `test_XXXXX.tx` : liste détaillée des transactions par cas de test

Ici, Manticore a trouvé 7 cas de test, qui correspondent à (l'ordre des noms de fichier peut changer) :

|                                                           |    Transaction 0    |        Transaction 1       | Transaction 2              | Résultat |
| :-------------------------------------------------------: | :-----------------: | :------------------------: | -------------------------- | :------: |
| **test_00000000.tx** | Création du contrat | f(!=65) | f(!=65) |   STOP   |
| **test_00000001.tx** | Création du contrat |     fonction de secours    |                            |  REVERT  |
| **test_00000002.tx** | Création du contrat |                            |                            |  RETOUR  |
| **test_00000003.tx** | Création du contrat |  f(65)  |                            |  REVERT  |
| **test_00000004.tx** | Création du contrat | f(!=65) |                            |   STOP   |
| **test_00000005.tx** | Création du contrat | f(!=65) | f(65)   |  REVERT  |
| **test_00000006.tx** | Création du contrat | f(!=65) | fonction de secours        |  REVERT  |

_Le résumé d'exploration f(!=65) indique que f est appelée avec une valeur différente de 65._

Comme vous pouvez le constater, Manticore génère un cas de test unique pour chaque transaction réussie ou annulée.

Utilisez l'option `--quick-mode` si vous voulez une exploration rapide du code (elle désactive les détecteurs de bugs, le calcul du gaz, etc.)

### Manipuler un contrat intelligent via l'API {#manipulate-a-smart-contract-through-the-api}

Cette section décrit en détail comment manipuler un contrat intelligent via l'API Python de Manticore. Vous pouvez créer un nouveau fichier avec l'extension python `.py` et y écrire le code nécessaire en ajoutant les commandes de l'API (dont les bases sont décrites ci-dessous), puis l'exécuter avec la commande `$ python3 *.py`. Vous pouvez également exécuter les commandes ci-dessous directement dans la console Python ; pour lancer la console, utilisez la commande `$ python3`.

### Créer des comptes {#creating-accounts}

La première chose à faire est d'initialiser une nouvelle blockchain avec les commandes suivantes :

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Un compte externe (non-contrat) est créé à l'aide de [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) :

```python
user_account = m.create_account(balance=1000)
```

Un contrat Solidity peut être déployé à l'aide de [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) :

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Initialiser le contrat
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Résumé {#summary}

- Vous pouvez créer des comptes d'utilisateur et des comptes de contrat avec [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) et [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Exécuter des transactions {#executing-transactions}

Manticore prend en charge deux types de transactions :

- Transaction brute : toutes les fonctions sont explorées
- Transaction nommée : une seule fonction est explorée

#### Transaction brute {#raw-transaction}

Une transaction brute est exécutée à l'aide de [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) :

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

L'appelant, l'adresse, les données ou la valeur de la transaction peuvent être soit concrets, soit symboliques :

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) crée une valeur symbolique.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) crée un tableau d'octets symbolique.

Par exemple :

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Si les données sont symboliques, Manticore explorera toutes les fonctions du contrat pendant l'exécution de la transaction. Il sera utile de consulter l'explication de la fonction de secours dans l'article [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) pour comprendre comment fonctionne la sélection de fonction.

#### Transaction nommée {#named-transaction}

Les fonctions peuvent être exécutées via leur nom.
Pour exécuter `f(uint var)` avec une valeur symbolique, à partir de user_account et avec 0 ether, utilisez :

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Si la `valeur` de la transaction n'est pas spécifiée, elle est de 0 par défaut.

#### Résumé {#summary-1}

- Les arguments d'une transaction peuvent être concrets ou symboliques
- Une transaction brute explorera toutes les fonctions
- Les fonctions peuvent être appelées par leur nom

### Espace de travail {#workspace}

`m.workspace` est le répertoire utilisé comme répertoire de sortie pour tous les fichiers générés :

```python
print("Les résultats se trouvent dans {}".format(m.workspace))
```

### Terminer l'exploration {#terminate-the-exploration}

Pour arrêter l'exploration, utilisez [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Aucune autre transaction ne devrait être envoyée une fois cette méthode appelée. Manticore génère alors des cas de test pour chaque chemin exploré.

### Résumé : Exécution sous Manticore {#summary-running-under-manticore}

En réunissant toutes les étapes précédentes, nous obtenons :

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Les résultats se trouvent dans {}".format(m.workspace))
m.finalize() # arrête l'exploration
```

Vous pouvez retrouver tout le code ci-dessus dans [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Obtenir les chemins qui lèvent une exception {#getting-throwing-paths}

Nous allons maintenant générer des entrées spécifiques pour les chemins levant une exception dans `f()`. La cible est toujours le contrat intelligent suivant [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) :

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Utiliser les informations d'état {#using-state-information}

Chaque chemin exécuté a son propre état de la blockchain. Un état est soit prêt, soit il est tué, ce qui signifie qu'il atteint une instruction THROW ou REVERT :

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing) : la liste des états qui sont prêts (ils n'ont pas exécuté d'instruction REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings) : la liste des états qui sont tués
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings) : tous les états

```python
for state in m.all_states:
    # faire quelque chose avec l'état
```

Vous pouvez accéder aux informations d'état. Par exemple :

- `state.platform.get_balance(account.address)` : le solde du compte
- `state.platform.transactions` : la liste des transactions
- `state.platform.transactions[-1].return_data` : les données retournées par la dernière transaction

Les données retournées par la dernière transaction sont un tableau, qui peut être converti en une valeur avec ABI.deserialize, par exemple :

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Comment générer un cas de test {#how-to-generate-testcase}

Utilisez [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) pour générer un cas de test :

```python
m.generate_testcase(state, 'BugFound')
```

### Résumé {#summary-2}

- Vous pouvez itérer sur l'état avec `m.all_states`
- `state.platform.get_balance(account.address)` retourne le solde du compte
- `state.platform.transactions` retourne la liste des transactions
- `transaction.return_data` correspond aux données retournées
- `m.generate_testcase(state, name)` génère des entrées pour l'état

### Résumé : Obtenir le chemin qui lève une exception {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Vérifier si une exécution se termine par REVERT ou INVALID

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Exception trouvée {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Vous pouvez retrouver tout le code ci-dessus dans [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Remarque : nous aurions pu générer un script beaucoup plus simple, car tous les états renvoyés par `terminated_state` ont REVERT ou INVALID dans leur résultat. Cet exemple visait uniquement à montrer comment manipuler l'API._

## Ajouter des contraintes {#adding-constraints}

Nous allons voir comment contraindre l'exploration. Nous ferons l'hypothèse que la
documentation de `f()` indique que la fonction n'est jamais appelée avec `a == 65`, donc tout bug avec `a == 65` n'est pas un vrai bug. La cible est toujours le contrat intelligent suivant [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) :

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Opérateurs {#operators}

Le module [Opérateurs](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) facilite la manipulation des contraintes. Il fournit entre autres :

- Operators.AND,
- Operators.OR,
- Operators.UGT (supérieur à, non signé),
- Operators.UGE (supérieur ou égal à, non signé),
- Operators.ULT (inférieur à, non signé),
- Operators.ULE (inférieur ou égal à, non signé).

Pour importer le module, utilisez ce qui suit :

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` est utilisé pour concaténer un tableau à une valeur. Par exemple, les `return_data` d'une transaction doivent être transformées en une valeur pour être comparées à une autre valeur :

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Contraintes {#state-constraint}

Vous pouvez utiliser des contraintes de manière globale ou pour un état spécifique.

#### Contrainte globale {#state-constraint}

Utilisez `m.constrain(constraint)` pour ajouter une contrainte globale.
Par exemple, vous pouvez appeler un contrat depuis une adresse symbolique et restreindre cette adresse à des valeurs spécifiques :

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Contrainte d'état {#state-constraint}

Utilisez [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) pour ajouter une contrainte à un état spécifique.
Cela peut être utilisé pour contraindre l'état après son exploration afin de vérifier une propriété sur celui-ci.

### Vérification de contrainte {#checking-constraint}

Utilisez `solver.check(state.constraints)` pour savoir si une contrainte est toujours réalisable.
Par exemple, ce qui suit contraindra `symbolic_value` à être différent de 65 et vérifiera si l'état est toujours réalisable :

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # l'état est réalisable
```

### Résumé : Ajouter des contraintes {#summary-adding-constraints}

En ajoutant une contrainte au code précédent, nous obtenons :

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## Vérifier si une exécution se termine par REVERT ou INVALID

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # nous ne considérons pas le chemin où a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug trouvé, les résultats sont dans {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'Aucun bug trouvé')
```

Vous pouvez retrouver tout le code ci-dessus dans [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
