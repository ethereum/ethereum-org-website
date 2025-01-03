---
title: Comment utiliser Manticore pour trouver des bugs dans les contrats intelligents
description: Comment utiliser Manticore pour trouver automatiquement des bugs dans les smart contracts
author: Trailofbits
lang: fr
tags:
  - "solidity"
  - "contrats intelligents"
  - "sécurité"
  - "test"
  - "vérification formelle"
skill: advanced
published: 2020-01-13
source: Créer des contrats sécurisés
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Le but de ce tutoriel est de démontrer comment utiliser Manticore pour trouver automatiquement des bugs dans les contrats intelligents.

## Installation {#installation}

Manticore requiert >= python 3.6. Il peut être installé via pip ou avec docker.

### Manticore via Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_La dernière commande exécute eth-security-toolbox dans un docker qui a accès à votre répertoire actif. Vous pouvez changer les fichiers depuis votre invite, et exécuter les outils sur les fichiers depuis le docker_

Dans docker, lancez :

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

### L'exécution symbolique dynamique en quelques mots {#dynamic-symbolic-execution-in-a-nutshell}

L'exécution symbolique dynamique (DSE) est une technique d'analyse de programme qui explore un espace d'état avec un degré élevé de conscience sémantique. Cette technique est basée sur la découverte de « chemins de programme », représentée sous la forme de formules mathématiques appelées `prédicats de chemin`. Conceptuellement, cette technique opère sur les prédicats de chemin en deux étapes :

1. Ils sont construits en utilisant des contraintes sur les entrées du programme.
2. Ils sont utilisés pour générer des entrées de programme qui entraîneront l'exécution des chemins associés.

Cette approche ne produit aucun faux positif dans le sens où tous les états de programme identifiés peuvent être déclenchés lors de l'exécution concrète. Par exemple, si l'analyse trouve un dépassement d'entier, il est garanti reproductible.

### Exemple de prédicat de chemin {#path-predicate-example}

Pour avoir une idée du fonctionnement du DSE, prenez l'exemple suivant :

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

Chaque prédicat de chemin est une formule mathématique qui peut être donnée à un solveur [SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), qui tentera de résoudre l'équation. Pour le `chemin 1`, le solveur dira que le chemin peut être exploré avec `a = 65`. Pour le `Chemin 2`, le solveur peut attribuer à `a` toute valeur autre que 65, par exemple `a = 0`.

### Vérification des propriétés {#verifying-properties}

Manticore permet un contrôle total sur toutes les exécutions de chaque chemin. En conséquence, il vous permet d'ajouter des contraintes arbitraires à pratiquement n'importe quoi. Ce contrôle permet la création de propriétés sur le contrat.

Prenons l'exemple suivant :

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // pas de protections d’overflow
  return c;
}
```

Il n'y a ici qu'un seul chemin à explorer dans la fonction :

- Chemin 1 : `c = a + b`

En utilisant Manticore, vous pouvez vérifier le dépassement, et ajouter des contraintes au prédicat de chemin :

- `c = a + b AND (c < a OR c < b)`

S'il est possible de trouver une valorisation de `a` et `b` pour laquelle le prédicat de chemin ci-dessus est réalisable, cela signifie que vous avez trouvé un dépassement. Par exemple, le solveur peut générer l'entrée `a = 10 , b = MAXUINT256`.

Si vous envisagez une version fixe:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

La formule associée au contrôle de l'overflow serait :

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Cette formule ne peut pas être résolue, autrement dit c’est la **preuve** que la valeur `safe_add`, `c` augmentera toujours.

DSE est un outil puissant qui peut vérifier des contraintes arbitraires sur votre code.

## Lancer dans Manticore {#running-under-manticore}

Nous allons voir comment explorer un contrat intelligent avec l'API Manticore. La cible est le contrat intelligent suivant [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Vous pouvez exécuter Manticore directement sur le contrat intelligent par la commande suivante (`project` peut être un fichier Solidity, ou un répertoire de projet) :

```bash
$ manticore project
```

Vous obtiendrez une liste des cas de tests comme par exemple (l'ordre peut changer) :

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

Sans informations supplémentaires, Manticore explorera le contrat avec de nouvelles transactions symboliques jusqu’à ce qu’il n’explore plus de nouveaux chemins dans le contrat. Manticore ne lance pas de nouvelle transactions après le premier echec (par exemple : après un revert).

Le type de donnée que Manticore produira comme résultat sera de type dossier `mcore_*`. Parmi d’autres, vous trouverez dans le dossier :

- `global.summary` : avertissements de couverture de code et de compilateur
- `test_XXXXX.summary`: couverture de code, dernière instruction, soldes du compte par cas de test
- `test_XXXXX.tx`: liste détaillée des transactions par cas de test

Ici, Manticore a trouvé 7 cas de test, qui correspondent à (l'ordre des noms de fichier peut changer) :

|                      |      Transaction 0       |    Transaction 1    | Transaction 2       | Résultat |
| :------------------: | :----------------------: | :-----------------: | ------------------- | :------: |
| **test_00000000.tx** | La création des contrats |       f(!=65)       | f(!=65)             |   STOP   |
| **test_00000001.tx** |   Création du contrat    | fonction de secours |                     |  REVERT  |
| **test_00000002.tx** |   Création du contrat    |                     |                     |  RETOUR  |
| **test_00000003.tx** |   Création du contrat    |        f(65)        |                     |  REVERT  |
| **test_00000004.tx** |   Création du contrat    |       f(!=65)       |                     |   STOP   |
| **test_00000005.tx** |   Création du contrat    |       f(!=65)       | f(65)               |  REVERT  |
| **test_00000006.tx** |   Création du contrat    |       f(!=65)       | fonction de secours |  REVERT  |

_Le résumé d'exploration f(!=65) indique f appelé avec une valeur différente de 65._

Comme vous pouvez le constater, Manticore génère un scénario de test unique pour chaque transaction réussie ou annulée.

Utilisez le flag `--quick-mode` si vous voulez une exploration rapide du code (il désactive les détecteurs de bugs, le calcul du gaz, ...)

### Manipuler un contrat intelligent via l'API {#manipulate-a-smart-contract-through-the-api}

Cette section décrit comment manipuler un contrat intelligent à travers l'API Python de Manticore. Vous pouvez créer un nouveau fichier avec l'extension python `*.py` et écrivez le code nécessaire en ajoutant les commandes API (dont les bases seront décrites ci-dessous) dans ce fichier, puis exécutez-le avec la commande `$ python3 *. py`. Vous pouvez également exécuter les commandes ci-dessous directement dans la console python, pour exécuter la console en utilisant la commande `$ python3`.

### Création des comptes {#creating-accounts}

La première chose que vous devriez faire est d'initier une nouvelle blockchain avec les commandes suivantes :

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Une transaction brute est exécutée en utilisant [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Une transaction brute est exécutée en utilisant [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

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
# Init le contrat
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Résumé {#summary}

- Vous pouvez créer des comptes utilisateur et de contrat avec [m.create_account](https://manticore.readthedocs.io/en/latest/api.html#manticore.ethereum.ManticoreEVM.create_account) et [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Exécution des transactions {#executing-transactions}

Manticore supporte deux types de transactions :

- Transaction brute : toutes les fonctions sont explorées
- Transaction nommée : une seule fonction est explorée

#### Transaction brute {#raw-transaction}

Une transaction brute est exécutée en utilisant [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) :

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

L'appelant, l'adresse, les données ou la valeur de la transaction peut être soit concrète ou symbolique :

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) crée une valeur symbolique.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) crée une valeur symbolique.

Par exemple :

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Si les données sont symboliques, Manticore explorera toutes les fonctions du contrat pendant l'exécution de la transaction. Il sera utile de voir l'explication de la fonction de repli dans l'article [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) pour comprendre comment fonctionne la sélection de fonctions.

#### Transaction nommée {#named-transaction}

Les fonctions peuvent être exécutées via leur nom. Pour exécuter `f(uint var)` avec une valeur symbolique, à partir de user_account et avec 0 ether, utilisez :

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Si la `value` de la transaction n'est pas spécifiée, elle est de 0 par défaut.

#### Résumé {#summary-1}

- Les arguments d'une transaction peuvent être concrets ou symboliques
- Une transaction brute explorera toutes les fonctions
- Les fonctions peuvent être exécutées via leurs noms

### Espace de travail {#workspace}

`m.workspace` est le répertoire utilisé comme répertoire de sortie pour tous les fichiers générés :

```python
print("Les resultats sont dans {}".format(m.workspace))
```

### Terminer l'exploration {#terminate-the-exploration}

Pour arrêter l'exploration utilisez [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Aucune autre transaction ne devrait être envoyée une fois que cette méthode est appelée et Manticore génère des scénarios de test pour chaque chemin exploré.

### Résumé: Exécution sous Manticore {#summary-running-under-manticore}

En réunissant toutes les étapes précédentes, nous obtenons:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # stop the exploration
```

Vous trouverez tout le code ci-dessus dans le fichier [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Obtenir des chemins de lancement {#getting-throwing-paths}

Nous allons maintenant générer des entrées spécifiques pour les chemins soulevant une exception dans `f()`. La cible est le contrat intelligent suivant [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Utiliser les informations sur l'état d'objet {#using-state-information}

Chaque chemin exécuté a son état de la blockchain. Un état est soit prêt, soit il est tué, ce qui signifie qu'il atteint une instruction THROW ou REVERT :

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing) : la liste des états qui sont prêts (ils n'ont pas exécuté de REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings) : liste des états qui sont morts
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings) : tous les états

```python
for state in m.all_states:
    # do something with state
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

### Comment générer des cas de test {#how-to-generate-testcase}

Utilisez [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) pour générer un cas de test :

```python
m.generate_testcase(state, 'BugFound')
```

### Résumé {#summary-2}

- Vous pouvez itérer sur l'état avec m.all_states
- `state.platform.get_balance(account.address)` retourne le solde du compte
- `state.platform.transactions` retourne la liste des transactions
- `transaction.return_data` constitue les données retournées
- `m.generate_testcase(state, name)` génère des entrées pour l'état

### Résumé : Obtenir un chemin de lancement {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Verifie si l’execution se termine avec REVERT ou INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Vous trouverez tout le code ci-dessus dans le fichier [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Notez que nous aurions pu générer un script beaucoup plus simple, comme tous les états retournés par terminated_state ont REVERT ou INVALID dans leur résultat : cet exemple était uniquement destiné à montrer comment manipuler l'API._

## Ajouter des contraintes {#adding-constraints}

Nous verrons comment limiter l'exploration. Nous ferons l'hypothèse que la documentation de `f()` indique que la fonction n'est jamais appelée avec `a == 65`, donc tout bogue avec `a == 65` n'est pas un vrai bogue. La cible est le contrat intelligent suivant [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Le module [Opérateurs](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) facilite la manipulation des contraintes, entre autres il fournit :

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than),
- Operators.UGE (unsigned greater than or equal to),
- Operators.ULT (unsigned lower than),
- Operators.ULE (unsigned lower than or equal to).

Pour importer le module, utilisez ce qui suit :

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` est utilisé pour concaténer une table à une valeur. Par exemple, la valeur return_data d'une transaction doit être remplacée par une valeur à vérifier avec une autre valeur :

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Contraintes {#state-constraint}

Vous pouvez utiliser des contraintes globalement ou pour un état spécifique.

#### Contrainte globale {#state-constraint}

Utilisez `m.constrain(constraint)` pour ajouter une contrainte globale. Par exemple, vous pouvez appeler un contrat à partir d'une adresse symbolique, et restreindre cette adresse à des valeurs spécifiques:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Contrainte d'état {#state-constraint}

Utiliser l'état [state.constrain(contrainte)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) pour ajouter une contrainte à un état spécifique Il peut être utilisé pour contraindre l'état après son exploration pour vérifier une propriété dessus.

### Vérifier les contraintes {#checking-constraint}

Utilisez `solver.check(state.contraints)` pour savoir si une contrainte est toujours faisable. Par exemple, ce qui suit contraindra symbolic_value à être différent de 65 et vérifiera si l'état est toujours réalisable :

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # l’etat est possible
```

### Résumé: Ajouter des contraintes {#summary-adding-constraints}

En ajoutant des contraintes au code précédent, nous obtenons :

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

## Verifie si l’execution se termine par REVERT ou INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # on ne considere pas le chemin quand a==65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug trouve, les resultats sont dans {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'Pas de bug trouve')
```

Vous trouverez tout le code ci-dessus dans le fichier [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
