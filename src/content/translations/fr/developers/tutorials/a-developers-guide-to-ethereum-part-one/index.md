---
title: Introduction à Ethereum pour développeurs Python, partie 1
description: Une introduction au développement Ethereum, particulièrement utile aux personnes disposant de connaissances en langage de programmation Python
author: Marc Garreau
lang: fr
tags:
  - "python"
  - "web3.py"
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Vous avez donc entendu parler d'Ethereum et êtes prêts à passer de l'autre côté du miroir ? Cet article couvrira rapidement certaines fonctionnalités de base propres aux blockchains, puis vous permettra d'interagir avec une simulation de nœud Ethereum - lecture des données de blocs, vérification des soldes de comptes et envoi de transactions. En cours de route, nous soulignerons les différences entre les méthodes classiques de création d'application et ce nouveau paradigme décentralisé.

## Prérequis (simple) {#soft-prerequisites}

Ce post se veut accessible à une large catégorie de développeurs. L'emploi d'[outils Python](/developers/docs/programming-languages/python/) sera réalisé, mais ils ne serviront qu'à véhiculer les idées – Ne vous inquiétez pas si vous n'êtes pas développeur Python. Toutefois, je vais faire quelques hypothèses sur ce que vous savez déjà, afin que nous puissions rapidement passer aux sujets spécifiques à Ethereum.

Hypothèses:

- vous savez utiliser un terminal,
- vous avez déjà écrit quelques lignes de code Python,
- La version 3.6 ou supérieure de Python est installée sur votre machine (l'utilisation d'un environnement virtuel [](https://realpython.com/effective-python-environment/#virtual-environments) est fortement recommandée), et
- vous avez déjà utilisé `pip`, l'installateur de paquets de Python. Encore une fois, si l'un de ces éléments n'est pas vrai, ou si vous ne prévoyez pas de reproduire le code de cet article, vous resterez capable de comprendre son contenu sans grande difficulté.

## Blockchains, en bref {#blockchains-briefly}

Il y a de nombreuses façons de décrire Ethereum, mais son cœur repose sur la Blockchain. Les Blockchains sont constituées d'une série de blocs, alors commençons par là. En termes simples, chaque bloc de la blockchain Ethereum n'est qu'un ensemble de métadonnées et de transactions. Dans le format JSON, cela ressemble à ceci :

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Chaque bloc [](/developers/docs/blocks/) possède une référence du bloc l'ayant précédé ; le `parentHash` est simplement le hash du bloc précédent.

<div class="featured">Note : le réseau Ethereum utilise régulièrement <a href="https://wikipedia.org/wiki/Hash_function">des fonctions de hachage</a> pour produire des valeurs de taille fixe (« hashes »). Les hachages (« hashes ») jouent un rôle important dans le réseau Ethereum, vous pouvez les considérer comme des identifiants uniques pour le moment.</div>

![Un diagramme décrivant la blockchain ainsi que les données internes de chaque bloc](./blockchain-diagram.png)

_Une blockchain est essentiellement une liste liée ; chaque bloc a une référence au bloc précédent._

Cette structure de données n'est pas nouvelle, mais les règles (c'est-à-dire les protocoles « peer-to-peer ») qui régissent le réseau le sont. Il n’y a pas d’autorité centrale; le réseau d'utilisateurs (pairs) doit collaborer pour pérenniser le réseau et s'affronter pour décider quelles transactions inclure dans le bloc suivant. Donc, quand vous voulez envoyer de l'argent à un ami, vous devrez diffuser cette transaction sur le réseau, puis attendre qu'elle soit incluse dans un bloc à venir.

La seule façon pour la chaîne de blocs de vérifier que l'argent a vraiment été envoyé d'un utilisateur à un autre est d'utiliser une devise native à (à savoir créée et régie par) la blockchain. Sur le réseau Ethereum, cette devise est appelée « ether », et la blockchain Ethereum contient le seul enregistrement officiel des soldes de compte.

## Un nouveau paradigme {#a-new-paradigm}

Cette nouvelle pile de technologies décentralisées a créé de nouveaux outils de développement. De tels outils existent dans de nombreux langages de programmation, mais nous allons les explorer via le language Python. Encore une fois : même si Python n’est pas votre langage de choix, il ne devrait pas être difficile de le comprendre.

Les développeurs Python qui veulent interagir avec le réseau Ethereum sont encouragés à utiliser [Web3.py](https://web3py.readthedocs.io/). Web3.py est une bibliothèque qui simplifie grandement la façon dont vous vous connectez à un nœud Ethereum, et par la suite envoyer et recevoir des données.

<div class="featured">Note : Les notions de « noeud Ethereum » et de « client Ethereum » sont utilisées de façon interchangeable. Dans les deux cas, il se réfère au logiciel qu'un participant au réseau Ethereum exécute. Ce logiciel peut lire les données de bloc, recevoir des mises à jour lorsque de nouveaux blocs sont ajoutés à la chaîne, diffuser de nouvelles transactions, et encore bien davantage. Techniquement, le client est le logiciel , le nœud est l'ordinateur qui exécute le logiciel.</div>

[Les clients Ethereum](/developers/docs/nodes-and-clients/) peuvent être configurés pour être accessibles par [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP ou Websockets, donc Web3. devra respecter cette configuration. Web3.py fait référence à ces options de connexion en tant que **fournisseurs**. Il vous faudra choisir l'un des trois fournisseurs pour lier l'instance Web3.py à votre nœud.

![Un diagramme montrant comment web3.py utilise IPC pour connecter votre application à un nœud Ethereum](./web3py-and-nodes.png)

_Configurez le noeud Ethereum et Web3.py afin qu'ils communiquent via le même protocole, par exemple via IPC dans ce diagramme._

Une fois que Web3.py est correctement configuré, vous pouvez commencer à interagir avec la blockchain. Voici quelques exemples d'utilisation de Web3.py pour avoir un aperçu de ce qui va se passer :

```python
# read block data:
w3.eth.get_block('latest')

# send a transaction:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Installation {#installation}

Dans ce qui suit, nous allons juste travailler au sein de l'interpréteur Python. Nous n'allons pas créer de répertoires, fichiers, classes ou fonctions.

<div class="featured">Note : dans les exemples ci-dessous, les commandes qui commencent par `$` sont censées être exécutées dans le terminal. (Ne tapez pas le `$`, cela signifie simplement que c'est le début de la ligne.)</div>

Tout d'abord, installez [IPython](https://ipython.org/) pour avoir un environnement convivial à explorer. IPython propose entre autres une fonctionnalité d'auto-completion en appuyant sur la touche TAB, ce qui facilite la navigation dans Web3.py.

```bash
pip install ipython
```

Web3.py est publié sous le nom `web3`. Installez-le comme suit :

```bash
pip install web3
```

Encore une chose : nous allons simuler une blockchain plus tard, ce qui requiert quelques dépendances supplémentaires. Vous pouvez les installer via :

```bash
pip install 'web3[tester]'
```

C'est tout !

## Lancer un sandbox {#spin-up-a-sandbox}

Ouvrez un nouvel environnement Python en exécutant `ipython` dans votre terminal. Ceci est comparable à l'exécution de `python`dans votre terminal, mais apporte plus d'avantages.

```bash
ipython
```

Cela affichera quelques informations sur les versions de Python et de IPython que vous utilisez, puis vous devriez voir une invite de saisie :

```python
In [1]:
```

Vous regardez un shell Python interactif. Essentiellement, il s'agit d'un bac à sable pour jouer. Si vous êtes arrivés jusqu’ici, il est temps d’importer Web3.py :

```python
In [1]: from web3 import Web3
```

## Introduction du module Web3 {#introducing-the-web3-module}

En plus d'être une passerelle vers Ethereum, le module [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) offre quelques fonctions pratiques. Examinons-en quelques unes.

Dans une application Ethereum, vous devrez généralement convertir des valeurs de devises. Le module Web3 fournit quelques méthodes juste pour cela : [fromWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) et [toWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<div class="featured">
Remarque : les ordinateurs sont notoirement peu efficaces pour la gestion des nombres décimaux. Pour contourner cela, les développeurs stockent souvent les montants en dollar en centimes. Par exemple, un article avec un prix de 5,99 $ peut être stocké dans la base de données comme 599.

Un schéma similaire est utilisé lors de la gestion des transactions en <b>ether</b>. Cependant, au lieu de deux décimaux, l'ether en a 18 ! La plus petite dénomination d'ether s'appelle <b>wei</b>, c'est la valeur spécifiée lors de l'envoi des transactions.

1 ether = 1000000000000000000 wei

1 wei = 0,00000000000001 ether

</div>

Essayez de convertir certaines valeurs depuis et vers le wei. Notez qu'il y a [des noms pour beaucoup de dénominations](https://web3py.readthedocs.io/en/stable/examples.html#converting-currency-denominations) entre ether et wei. L'une des plus connues est le **gwei**, car c'est souvent la façon dont les frais de transaction sont représentés.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Les autres méthodes utilitaires du module Web3 incluent les convertisseurs de format de données (par exemple, [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), les méthodes pour gérer les adresses (e. ., [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)), et les fonctions de hachage (par exemple, [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Beaucoup d'entre elles seront étudiées plus tard dans la série. Pour afficher toutes les méthodes et propriétés disponibles, utilisez l'auto-complétion de IPython en tapant `Web3`. et en appuyant sur la touche tabulation deux fois après le point.

## Parler à la chaîne {#talk-to-the-chain}

Ces méthodes sont très intéressantes, mais passons à la blockchain. L'étape suivante est de configurer Web3.py à des fins de communication avec un noeud Ethereum. Ici, nous avons la possibilité d'utiliser les fournisseurs IPC, HTTP, ou Websocket.

Nous n'allons pas explorer cette voie, mais un exemple de flux complet en utilisant le fournisseur HTTP pourrait ressembler à ceci :

- Télécharger un nœud Ethereum, par exemple [Geth](https://geth.ethereum.org/).
- Démarrez Geth dans une seule fenêtre de terminal et attendez qu'il synchronise le réseau. Le port HTTP par défaut est `8545`, mais il est configurable.
- Dites à Web3.py de se connecter au nœud via HTTP, sur `localhost:8545`. `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Utilisez l'instance `w3` pour interagir avec le nœud.

Bien qu’il s’agisse d’une « vraie » façon de le faire, le processus de synchronisation prend des heures et est inutile si vous voulez juste un environnement de développement. Web3.py expose un quatrième fournisseur à cet effet, l'**EthereumTesterProvider**. Ce fournisseur de testeur est relié à un nœud Ethereum simulé avec des autorisations réduites et des fausses devises pour jouer.

![Un diagramme montrant l'EthereumTesterProvider reliant votre application web3.py à un nœud Ethereum simulé](./ethereumtesterprovider.png)

_L'EthereumTesterProvider se connecte à un noeud simulé et est pratique pour des environnements de développement rapides._

Ce nœud simulé s'appelle [eth-testeur](https://github.com/ethereum/eth-tester) et nous l'avons installé dans le cadre de la commande `pip install web3[tester]`. Configurer Web3.py pour qu'il utilise ce fournisseur de testeur est aussi simple que :

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Maintenant vous êtes prêt à surfer sur la chaîne ! Ce n'est pas une chose que les gens disent. Je viens juste de l'inventer. Faisons un tour rapide.

## Le tour rapide {#the-quick-tour}

Tout d'abord, une vérification :

```python
In [5]: w3.isConnected()
Out[5]: True
```

Étant donné que nous utilisons le fournisseur de testeur, ce test n'est pas très important. Toutefois, s'il échoue, il y a des chances que vous ayez mal tapé quelque chose lors de l'instanciation de la variable `w3`. Vérifiez bien que vous avez inclus les parenthèses intérieures, à savoir `Web3.EthereumTesterProvider()`.

## Arrêt #1 : Les [comptes](/developers/docs/accounts/) {#tour-stop-1-accounts}

Afin de faciliter les tests, le fournisseur de testeur a créé des comptes et les a préchargés avec un esther de test.

D’abord, observons une liste de ces comptes :

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Si vous exécutez cette commande, vous devriez voir une liste de dix chaînes de caractères qui commencent par `0x`. Chacune d'entre elles est une **adresse publique** qui est, à certains égards, similaire au numéro de compte sur un compte bancaire. Vous pourriez fournir cette adresse à quelqu'un qui voudrait vous envoyer des ethers.

Comme mentionné, le fournisseur de testeur a préchargé chacun des comptes avec des ethers de test. Cherchons maintenant combien d'ethers contient le premier compte :

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Beaucoup de zéros ! Avant d'aller à la fausse banque et de vous remplir les poches tout le long du trajet, rappellez-vous la leçon de tout à l'heure sur les dénominations monétaires. La valeur en ether est présentée dans sa plus petite denomination , le wei. Convertissons-la en ether :

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Un million d'ethers de test — ça reste toujours intéressant.

## Arrêt #2 : Les données de bloc {#tour-stop-2-block-data}

Jetons un coup d’œil à l’état de cette blockchain simulée :

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

Beaucoup d'informations sont retournées à propos d'un bloc, mais juste quelques choses à signaler ici:

- Le numéro de bloc est zéro — peu importe depuis combien de temps vous avez configuré le fournisseur de testeur. Contrairement au véritable réseau Ethereum qui mine un nouveau bloc toutes les 12 secondes, cette simulation restera en attente jusqu'à ce que vous lui donniez une tâche à accomplir.
- `transactions` est une liste vide pour la même raison : nous n’avons rien fait pour le moment. Ce premier bloc est un bloc **vide**, juste conçu pour démarrer la chaîne.
- Notez que le `parentHash` n'est qu'un amas d'octets vides. Cela signifie qu'il s'agit du premier bloc de la chaîne, également connu sous le nom de **bloc de genèse**.

## Arrêt #3 : Les [transactions](/developers/docs/transactions/) {#tour-stop-3-transactions}

Nous sommes coincés au bloc zéro jusqu'à ce qu'il y ait une transaction en attente, alors en voilà une. Envoyez quelques ethers de test d'un compte à un autre :

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

C'est généralement le moment où vous devriez attendre pendant plusieurs secondes pour que votre transaction soit réalisée et intégrée dans un nouveau bloc. Le processus complet se déroule comme ceci :

1. Soumettez une transaction et attendez le hachage de la transaction. Jusqu'à ce que le bloc contenant la transaction soit créé et diffusé, la transaction sera « en attente. » `tx_hash = w3.eth.send_transaction({ … })`
2. Attendez que la transaction soit intégrée dans un bloc : `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Continuer la logique de l'application. Pour voir la transaction réussie : `w3.eth.get_transaction(tx_hash)`

Notre environnement simulé ajoutera la transaction dans un nouveau bloc instantanément, de sorte que nous pouvons immédiatement voir la transaction :

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

Vous verrez ici quelques détails familiers : les champs `from`, `to`, et `value` doivent correspondre aux entrées de notre appel `send_transaction`. L'autre bit rassurant est que cette transaction a été incluse comme la première transaction (`'transactionIndex': 0`) dans le bloc numéro 1.

Nous pouvons également facilement vérifier la réussite de cette transaction en examinant les soldes des deux comptes concernés. Trois ethers sont supposés être passés de l'un à l'autre.

```python
Entrée [12] : w3.eth.get_balance(w3.eth.accounts[0])
Sortie [12]: 999996999979000000000000

Entrée [13] : w3.eth.get_balance(w3.eth.accounts[1])
Sortie [13] : 1000003000000000000000000
```

Ce dernier semble bon ! Le solde est passé de 1 000 000 à 1 000 003 ethers. Mais qu'est-il arrivé au premier compte ? Il semble avoir perdu un peu plus que trois ethers. Hélas, rien dans la vie n'est gratuit et l'utilisation du réseau public Ethereum exige que vous compensiez vos pairs pour leur rôle de soutien. Une petite commission de transaction a été déduite du compte qui a soumis la transaction - cette commission correspond à la quantité de gaz brûlé (21 000 unités de gaz pour un transfert ETH) multipliée par une commission de base qui varie en fonction de l'activité du réseau plus un pourboire qui va au validateur qui inclut la transaction dans un bloc.

En savoir plus sur les[gaz](/developers/docs/gas/#post-london)

<div class="featured">Remarque : sur le réseau public, les commissions de transaction sont variables en fonction de la demande du réseau et de la rapidité avec laquelle vous souhaitez que soit traitée une transaction. Si vous êtes intéressé par la façon dont les frais sont calculés, vous pouvez consulter mon précédent article sur <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">la manière dont les transactions sont incluses dans un bloc</a>.</div>

## Et respirez... {#and-breathe}

Nous y sommes depuis un bon moment et il semble donc intéressant de faire une pause. Le terrier du lapin est toujours ouvert et nous continuerons à l'explorer dans la deuxième partie de cette série. Quelques concepts à venir : la connexion à un vrai nœud, les contrats intelligents et les jetons. Vous avez des questions complémentaires ? Faites-le moi savoir ! Vos commentaires influenceront notre chemin à partir d’ici. Vos demandes sont les bienvenues sur [Twitter](https://twitter.com/wolovim).
