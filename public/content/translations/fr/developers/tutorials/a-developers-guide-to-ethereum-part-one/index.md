---
title: "Introduction à Ethereum pour les développeurs Python, partie 1"
description: "Une introduction au développement sur Ethereum, particulièrement utile pour ceux qui connaissent le langage de programmation Python"
author: Marc Garreau
lang: fr
tags:
  - python
  - web3.py
skill: beginner
breadcrumb: Ethereum avec Python
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Alors, vous avez entendu parler de ce truc appelé Ethereum et vous êtes prêt à plonger dans le terrier du lapin ? Cet article couvrira rapidement quelques bases de la chaîne de blocs, puis vous fera interagir avec un nœud Ethereum simulé : lire les données de bloc, vérifier les soldes de compte et envoyer des transactions. En cours de route, nous soulignerons les différences entre les méthodes traditionnelles de création d'applications et ce nouveau paradigme décentralisé.

## Prérequis (flexibles) {#soft-prerequisites}

Cet article se veut accessible à un large éventail de développeurs. Des [outils Python](/developers/docs/programming-languages/python/) seront utilisés, mais ils ne sont qu'un moyen de transmettre les idées : aucun problème si vous n'êtes pas un développeur Python. Je ferai cependant quelques suppositions sur ce que vous savez déjà, afin que nous puissions passer rapidement aux éléments spécifiques à Ethereum.

Suppositions :

- Vous savez vous débrouiller dans un terminal,
- Vous avez écrit quelques lignes de code Python,
- La version 3.6 ou supérieure de Python est installée sur votre machine (l'utilisation d'un [environnement virtuel](https://realpython.com/effective-python-environment/#virtual-environments) est fortement encouragée), et
- vous avez utilisé `pip`, le gestionnaire de paquets de Python.
  Encore une fois, si l'une de ces conditions n'est pas remplie, ou si vous ne prévoyez pas de reproduire le code de cet article, vous pourrez probablement tout de même suivre sans problème.

## Les chaînes de blocs, en bref {#blockchains-briefly}

Il existe de nombreuses façons de décrire Ethereum, mais en son cœur se trouve une chaîne de blocs. Les chaînes de blocs sont constituées d'une série de blocs, commençons donc par là. En termes simples, chaque bloc sur la chaîne de blocs Ethereum n'est constitué que de quelques métadonnées et d'une liste de transactions. Au format JSON, cela ressemble à peu près à ceci :

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Chaque [bloc](/developers/docs/blocks/) possède une référence au bloc qui le précède ; le `parentHash` est simplement le hash du bloc précédent.

<FeaturedText>Remarque : Ethereum utilise régulièrement des <a href="https://wikipedia.org/wiki/Hash_function">fonctions de hachage</a> pour produire des valeurs de taille fixe (« hashs »). Les hashs jouent un rôle important dans Ethereum, mais vous pouvez pour l'instant les considérer comme des identifiants uniques.</FeaturedText>

![A diagram depicting a blockchain including the data inside  each block](./blockchain-diagram.png)

_Une chaîne de blocs est essentiellement une liste chaînée ; chaque bloc possède une référence au bloc précédent._

Cette structure de données n'a rien de nouveau, mais les règles (c'est-à-dire les protocoles pair à pair) qui régissent le réseau le sont. Il n'y a pas d'autorité centrale ; le réseau de pairs doit collaborer pour maintenir le réseau, et rivaliser pour décider quelles transactions inclure dans le prochain bloc. Ainsi, lorsque vous souhaitez envoyer de l'argent à un ami, vous devrez diffuser cette transaction sur le réseau, puis attendre qu'elle soit incluse dans un bloc à venir.

La seule façon pour la chaîne de blocs de vérifier que l'argent a bien été envoyé d'un utilisateur à un autre est d'utiliser une monnaie native à (c'est-à-dire créée et régie par) cette chaîne de blocs. Dans Ethereum, cette monnaie s'appelle l'ether, et la chaîne de blocs Ethereum contient le seul registre officiel des soldes de compte.

## Un nouveau paradigme {#a-new-paradigm}

Cette nouvelle pile technologique décentralisée a donné naissance à de nouveaux outils pour les développeurs. De tels outils existent dans de nombreux langages de programmation, mais nous les examinerons sous l'angle de Python. Pour le répéter : même si Python n'est pas votre langage de prédilection, vous ne devriez pas avoir de mal à suivre.

Les développeurs Python qui souhaitent interagir avec Ethereum se tourneront probablement vers [Web3.py](https://web3py.readthedocs.io/). Web3.py est une bibliothèque qui simplifie grandement la façon dont vous vous connectez à un nœud Ethereum, puis envoyez et recevez des données de celui-ci.

<FeaturedText>Remarque : « nœud Ethereum » et « client Ethereum » sont utilisés de manière interchangeable. Dans les deux cas, cela fait référence au logiciel qu'un participant au réseau Ethereum exécute. Ce logiciel peut lire les données de bloc, recevoir des mises à jour lorsque de nouveaux blocs sont ajoutés à la chaîne, diffuser de nouvelles transactions, et plus encore. Techniquement, le client est le logiciel, le nœud est l'ordinateur qui exécute le logiciel.</FeaturedText>

Les [clients Ethereum](/developers/docs/nodes-and-clients/) peuvent être configurés pour être accessibles par [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP ou Websockets, Web3.py devra donc refléter cette configuration. Web3.py fait référence à ces options de connexion en tant que **fournisseurs** (providers). Vous devrez choisir l'un des trois fournisseurs pour lier l'instance Web3.py à votre nœud.

![A diagram showing how web3.py uses IPC to connect your application to an Ethereum node](./web3py-and-nodes.png)

_Configurez le nœud Ethereum et Web3.py pour qu'ils communiquent via le même protocole, par exemple, IPC dans ce diagramme._

Une fois Web3.py correctement configuré, vous pouvez commencer à interagir avec la chaîne de blocs. Voici quelques exemples d'utilisation de Web3.py en avant-goût de ce qui vous attend :

```python
# lire les données du bloc :
w3.eth.get_block('latest')

# envoyer une transaction :
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Installation {#installation}

Dans ce tutoriel, nous travaillerons uniquement dans un interpréteur Python. Nous ne créerons aucun répertoire, fichier, classe ou fonction.

<FeaturedText>Remarque : Dans les exemples ci-dessous, les commandes qui commencent par `$` sont destinées à être exécutées dans le terminal. (Ne tapez pas le `$`, il indique simplement le début de la ligne.)</FeaturedText>

Tout d'abord, installez [IPython](https://ipython.org/) pour disposer d'un environnement convivial à explorer. IPython offre la complétion par tabulation, entre autres fonctionnalités, ce qui permet de voir beaucoup plus facilement ce qu'il est possible de faire avec Web3.py.

```bash
pip install ipython
```

Web3.py est publié sous le nom `web3`. Installez-le comme ceci :

```bash
pip install web3
```

Encore une chose : nous allons simuler une chaîne de blocs plus tard, ce qui nécessite quelques dépendances supplémentaires. Vous pouvez les installer via :

```bash
pip install 'web3[tester]'
```

Vous êtes prêt à commencer !

Remarque : Le paquet `web3[tester]` fonctionne jusqu'à Python 3.10.xx

## Lancer un bac à sable {#spin-up-a-sandbox}

Ouvrez un nouvel environnement Python en exécutant `ipython` dans votre terminal. C'est comparable à l'exécution de `python`, mais avec plus de fonctionnalités.

```bash
ipython
```

Cela affichera quelques informations sur les versions de Python et d'IPython que vous exécutez, puis vous devriez voir une invite attendant une saisie :

```python
In [1]:
```

Vous êtes maintenant face à un shell Python interactif. Essentiellement, c'est un bac à sable pour jouer. Si vous êtes arrivé jusqu'ici, il est temps d'importer Web3.py :

```python
In [1]: from web3 import Web3
```

## Présentation du module Web3 {#introducing-the-web3-module}

En plus d'être une passerelle vers Ethereum, le module [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) offre quelques fonctions pratiques. Explorons-en quelques-unes.

Dans une application Ethereum, vous aurez souvent besoin de convertir des dénominations de devises. Le module Web3 fournit quelques méthodes d'aide juste pour cela : [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) et [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Remarque : Les ordinateurs sont notoirement mauvais pour gérer les mathématiques décimales. Pour contourner ce problème, les développeurs stockent souvent les montants en dollars sous forme de centimes. Par exemple, un article au prix de 5,99 $ peut être stocké dans la base de données sous la valeur 599.

Un modèle similaire est utilisé lors du traitement des transactions en <b>ether</b>. Cependant, au lieu de deux décimales, l'ether en a 18 ! La plus petite dénomination de l'ether s'appelle le <b>Wei</b>, c'est donc la valeur spécifiée lors de l'envoi de transactions.

1 ether = 1000000000000000000 Wei

1 Wei = 0.000000000000000001 ether

</FeaturedText>

Essayez de convertir quelques valeurs en Wei et inversement. Notez qu'[il existe des noms pour de nombreuses dénominations](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) entre l'ether et le Wei. L'une des plus connues d'entre elles est le **gwei**, car c'est souvent ainsi que les frais de transaction sont représentés.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

D'autres méthodes utilitaires du module Web3 incluent des convertisseurs de format de données (par ex., [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), des aides pour les adresses (par ex., [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) et des fonctions de hachage (par ex., [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Beaucoup d'entre elles seront abordées plus tard dans la série. Pour voir toutes les méthodes et propriétés disponibles, utilisez la saisie semi-automatique d'IPython en tapant `Web3`. et en appuyant deux fois sur la touche de tabulation après le point.

## Parler à la chaîne {#talk-to-the-chain}

Les méthodes pratiques sont formidables, mais passons à la chaîne de blocs. L'étape suivante consiste à configurer Web3.py pour communiquer avec un nœud Ethereum. Ici, nous avons la possibilité d'utiliser les fournisseurs IPC, HTTP ou Websocket.

Nous n'emprunterons pas cette voie, mais un exemple de flux de travail complet utilisant le fournisseur HTTP pourrait ressembler à ceci :

- Télécharger un nœud Ethereum, par ex., [Geth](https://geth.ethereum.org/).
- Démarrer Geth dans une fenêtre de terminal et attendre qu'il effectue la synchronisation du réseau. Le port HTTP par défaut est `8545`, mais il est configurable.
- Indiquer à Web3.py de se connecter au nœud via HTTP, sur `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Utiliser l'instance `w3` pour interagir avec le nœud.

Bien qu'il s'agisse d'une « vraie » façon de procéder, le processus de synchronisation prend des heures et n'est pas nécessaire si vous souhaitez simplement un environnement de développement. Web3.py expose un quatrième fournisseur à cet effet, l'**EthereumTesterProvider**. Ce fournisseur de test se connecte à un nœud Ethereum simulé avec des autorisations assouplies et de la fausse monnaie pour jouer.

![A diagram showing the EthereumTesterProvider linking your web3.py application to a simulated Ethereum node](./ethereumtesterprovider.png)

_L'EthereumTesterProvider se connecte à un nœud simulé et est pratique pour les environnements de développement rapides._

Ce nœud simulé s'appelle [eth-tester](https://github.com/ethereum/eth-tester) et nous l'avons installé dans le cadre de la commande `pip install web3[tester]`. Configurer Web3.py pour utiliser ce fournisseur de test est aussi simple que :

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Maintenant, vous êtes prêt à surfer sur la chaîne ! Ce n'est pas une expression courante. Je viens de l'inventer. Faisons un petit tour d'horizon.

## Le petit tour d'horizon {#the-quick-tour}

Commençons par le commencement, une vérification de base :

```python
In [5]: w3.is_connected()
Out[5]: True
```

Puisque nous utilisons le fournisseur de test, ce n'est pas un test très utile, mais s'il échoue, il y a de fortes chances que vous ayez fait une erreur de frappe lors de l'instanciation de la variable `w3`. Vérifiez bien que vous avez inclus les parenthèses intérieures, c'est-à-dire `Web3.EthereumTesterProvider()`.

## Étape n° 1 : les [comptes](/developers/docs/accounts/) {#tour-stop-1-accounts}

Pour des raisons pratiques, le fournisseur de test a créé quelques comptes et les a préchargés avec de l'ether de test.

Tout d'abord, voyons une liste de ces comptes :

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Si vous exécutez cette commande, vous devriez voir une liste de dix chaînes de caractères qui commencent par `0x`. Chacune est une **adresse publique** et est, d'une certaine manière, analogue au numéro de compte d'un compte courant. Vous fourniriez cette adresse à quelqu'un qui souhaiterait vous envoyer de l'ether.

Comme mentionné, le fournisseur de test a préchargé chacun de ces comptes avec de l'ether de test. Découvrons combien il y a sur le premier compte :

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Ça fait beaucoup de zéros ! Avant de vous réjouir en allant à la fausse banque, rappelez-vous la leçon sur les dénominations de devises vue plus tôt. Les valeurs en ether sont représentées dans la plus petite dénomination, le Wei. Convertissez cela en ether :

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Un million d'ethers de test — ce n'est quand même pas si mal.

## Étape n° 2 : les données de bloc {#tour-stop-2-block-data}

Jetons un coup d'œil à l'état de cette chaîne de blocs simulée :

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

Beaucoup d'informations sont renvoyées à propos d'un bloc, mais il n'y a que quelques points à souligner ici :

- Le numéro de bloc est zéro — peu importe depuis combien de temps vous avez configuré le fournisseur de test. Contrairement au véritable réseau Ethereum, qui ajoute un nouveau bloc toutes les 12 secondes, cette simulation attendra que vous lui donniez du travail à faire.
- `transactions` est une liste vide, pour la même raison : nous n'avons encore rien fait. Ce premier bloc est un **bloc vide**, juste pour lancer la chaîne.
- Remarquez que le `parentHash` n'est qu'un tas d'octets vides. Cela signifie qu'il s'agit du premier bloc de la chaîne, également connu sous le nom de **bloc genèse**.

## Étape n° 3 : les [transactions](/developers/docs/transactions/) {#tour-stop-3-transactions}

Nous sommes bloqués au bloc zéro jusqu'à ce qu'il y ait une transaction en attente, alors donnons-lui-en une. Envoyez quelques ethers de test d'un compte à un autre :

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

C'est généralement à ce stade que vous attendriez plusieurs secondes pour que votre transaction soit incluse dans un nouveau bloc. Le processus complet se déroule à peu près comme ceci :

1. Soumettre une transaction et conserver le hachage de transaction. Jusqu'à ce que le bloc contenant la transaction soit créé et diffusé, la transaction est « en attente ».
   `tx_hash = w3.eth.send_transaction({ … })`
2. Attendre que la transaction soit incluse dans un bloc :
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Poursuivre la logique de l'application. Pour voir la transaction réussie :
   `w3.eth.get_transaction(tx_hash)`

Notre environnement simulé ajoutera la transaction dans un nouveau bloc instantanément, nous pouvons donc voir la transaction immédiatement :

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

Vous verrez quelques détails familiers ici : les champs `from`, `to` et `value` doivent correspondre aux entrées de notre appel `send_transaction`. L'autre élément rassurant est que cette transaction a été incluse comme première transaction (`'transactionIndex': 0`) dans le bloc numéro 1.

Nous pouvons également vérifier facilement le succès de cette transaction en consultant les soldes des deux comptes impliqués. Trois ethers devraient avoir été transférés de l'un à l'autre.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Ce dernier semble correct ! Le solde est passé de 1 000 000 à 1 000 003 ethers. Mais qu'est-il arrivé au premier compte ? Il semble avoir perdu un peu plus de trois ethers. Hélas, rien n'est gratuit dans la vie, et l'utilisation du réseau public Ethereum exige que vous rémunériez vos pairs pour leur rôle de soutien. De petits frais de transaction ont été déduits du compte qui a soumis la transaction - ces frais correspondent à la quantité de gaz brûlé (21 000 unités de gaz pour un transfert d'ETH) multipliée par des frais de base qui varient en fonction de l'activité du réseau, plus des frais de priorité qui reviennent au validateur qui inclut la transaction dans un bloc.

En savoir plus sur le [gaz](/developers/docs/gas/#post-london)

<FeaturedText>Remarque : Sur le réseau public, les frais de transaction sont variables en fonction de la demande du réseau et de la rapidité avec laquelle vous souhaitez qu'une transaction soit traitée. Si vous êtes intéressé par une analyse détaillée de la façon dont les frais sont calculés, consultez mon article précédent sur <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">la façon dont les transactions sont incluses dans un bloc</a>.</FeaturedText>

## Et respirez {#and-breathe}

Nous y sommes depuis un moment, cela semble donc être le bon moment pour faire une pause. Le terrier du lapin continue, et nous poursuivrons notre exploration dans la deuxième partie de cette série. Quelques concepts à venir : la connexion à un vrai nœud, les contrats intelligents et les jetons. Vous avez d'autres questions ? Faites-le-moi savoir ! Vos retours influenceront la direction que nous prendrons à partir d'ici. Les demandes sont les bienvenues via [Twitter](https://twitter.com/wolovim).