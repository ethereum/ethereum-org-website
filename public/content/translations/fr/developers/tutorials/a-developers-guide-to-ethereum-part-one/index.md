---
title: "Introduction à Ethereum pour les développeurs Python, partie 1"
description: "Une introduction au développement Ethereum, particulièrement utile pour ceux qui connaissent le langage de programmation Python."
author: Marc Garreau
lang: fr
tags: [ "python", "web3.py" ]
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Alors, vous avez entendu parler de ce truc qu'est Ethereum et vous êtes prêt à vous aventurer dans le terrier du lapin ? Cet article couvrira rapidement quelques notions de base de la blockchain, puis vous fera interagir avec un nœud Ethereum simulé – lecture de données de blocs, vérification des soldes de compte et envoi de transactions. Chemin faisant, nous soulignerons les différences entre les manières traditionnelles de créer des applications et ce nouveau paradigme décentralisé.

## Prérequis (non stricts) {#soft-prerequisites}

Cet article se veut accessible à un large éventail de développeurs. Nous utiliserons des [outils Python](/developers/docs/programming-languages/python/), mais ils ne sont qu'un prétexte pour présenter les idées. Pas de problème si vous n'êtes pas un développeur Python. Je vais toutefois partir de quelques hypothèses sur ce que vous savez déjà, afin que nous puissions rapidement passer aux éléments spécifiques à Ethereum.

Hypothèses :

- Vous savez utiliser un terminal,
- Vous avez écrit quelques lignes de code Python,
- Python version 3.6 ou supérieure est installé sur votre machine (l'utilisation d'un [environnement virtuel](https://realpython.com/effective-python-environment/#virtual-environments) est fortement encouragée), et
- vous avez utilisé `pip`, le programme d'installation de paquets de Python.
  Encore une fois, si l'un de ces points ne s'applique pas à vous, ou si vous ne prévoyez pas de reproduire le code de cet article, vous devriez tout de même pouvoir suivre sans problème.

## Les blockchains, en bref {#blockchains-briefly}

Il y a de nombreuses façons de décrire Ethereum, mais au cœur de celui-ci se trouve une blockchain. Les blockchains sont constituées d'une série de blocs, alors commençons par là. En termes simples, chaque bloc de la blockchain Ethereum n'est qu'un ensemble de métadonnées et une liste de transactions. Au format JSON, cela ressemble à ceci :

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Chaque [bloc](/developers/docs/blocks/) possède une référence au bloc qui le précède ; le `parentHash` est simplement le hachage du bloc précédent.

<FeaturedText>Remarque : Ethereum utilise régulièrement des <a href="https://wikipedia.org/wiki/Hash_function">fonctions de hachage</a> pour produire des valeurs de taille fixe (« hachages »). Les hachages jouent un rôle important dans Ethereum, mais pour l'instant, vous pouvez simplement les considérer comme des identifiants uniques.</FeaturedText>

![Un diagramme représentant une blockchain, y compris les données à l'intérieur de chaque bloc](./blockchain-diagram.png)

_Une blockchain est essentiellement une liste chaînée ; chaque bloc a une référence au bloc précédent._

Cette structure de données n'a rien de nouveau, mais les règles (c'est-à-dire les protocoles pair-à-pair) qui régissent le réseau le sont. Il n'y a pas d'autorité centrale ; le réseau de pairs doit collaborer pour maintenir le réseau, et rivaliser pour décider quelles transactions inclure dans le bloc suivant. Ainsi, lorsque vous voulez envoyer de l'argent à un ami, vous devez diffuser cette transaction sur le réseau, puis attendre qu'elle soit incluse dans un prochain bloc.

La seule façon pour la blockchain de vérifier que de l'argent a bien été envoyé d'un utilisateur à un autre est d'utiliser une devise native (c'est-à-dire, créée et régie par) de cette blockchain. Dans Ethereum, cette devise s'appelle l'ether, et la blockchain Ethereum contient le seul enregistrement officiel des soldes des comptes.

## Un nouveau paradigme {#a-new-paradigm}

Cette nouvelle pile technologique décentralisée a donné naissance à de nouveaux outils pour les développeurs. De tels outils existent dans de nombreux langages de programmation, mais nous allons les explorer à travers le prisme de Python. Pour le répéter : même si Python n'est pas votre langage de prédilection, vous ne devriez pas avoir de mal à suivre.

Les développeurs Python qui souhaitent interagir avec Ethereum se tourneront probablement vers [Web3.py](https://web3py.readthedocs.io/). Web3.py est une bibliothèque qui simplifie grandement la connexion à un nœud Ethereum, ainsi que l'envoi et la réception de données depuis celui-ci.

<FeaturedText>Remarque : Les termes « nœud Ethereum » et « client Ethereum » sont utilisés de manière interchangeable. Dans les deux cas, cela fait référence au logiciel qu'un participant du réseau Ethereum exécute. Ce logiciel peut lire les données des blocs, recevoir des mises à jour lorsque de nouveaux blocs sont ajoutés à la chaîne, diffuser de nouvelles transactions, et plus encore. Techniquement, le client est le logiciel, le nœud est l'ordinateur qui exécute le logiciel.</FeaturedText>

Les [clients Ethereum](/developers/docs/nodes-and-clients/) peuvent être configurés pour être joignables par [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP ou Websockets, donc Web3.py devra refléter cette configuration. Web3.py désigne ces options de connexion sous le nom de **fournisseurs**. Il vous faudra choisir l'un des trois fournisseurs pour lier l'instance Web3.py à votre nœud.

![Un diagramme montrant comment web3.py utilise l'IPC pour connecter votre application à un nœud Ethereum](./web3py-and-nodes.png)

_Configurez le nœud Ethereum et Web3.py pour qu'ils communiquent via le même protocole, par exemple, l'IPC dans ce diagramme._

Une fois que Web3.py est correctement configuré, vous pouvez commencer à interagir avec la blockchain. Voici quelques exemples d'utilisation de Web3.py en guise d'aperçu de ce qui suit :

```python
# lire les données du bloc :
w3.eth.get_block('latest')

# envoyer une transaction :
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Installation {#installation}

Dans ce tutoriel, nous travaillerons uniquement dans un interpréteur Python. Nous ne créerons ni répertoires, ni fichiers, ni classes ou fonctions.

<FeaturedText>Remarque : dans les exemples ci-dessous, les commandes qui commencent par `$` sont destinées à être exécutées dans le terminal. (Ne tapez pas le `$`, il indique simplement le début de la ligne.)</FeaturedText>

Tout d'abord, installez [IPython](https://ipython.org/) pour disposer d'un environnement convivial pour l'exploration. IPython offre, entre autres fonctionnalités, la complétion par tabulation, ce qui facilite grandement la découverte des possibilités de Web3.py.

```bash
pip install ipython
```

Web3.py est publié sous le nom `web3`. Installez-le comme suit :

```bash
pip install web3
```

Encore une chose : nous allons simuler une blockchain plus tard, ce qui requiert quelques dépendances supplémentaires. Vous pouvez les installer via :

```bash
pip install 'web3[tester]'
```

Vous êtes fin prêt !

Remarque : Le package `web3[tester]` fonctionne jusqu'à Python 3.10.xx

## Lancer un bac à sable {#spin-up-a-sandbox}

Ouvrez un nouvel environnement Python en exécutant `ipython` dans votre terminal. C'est comparable à l'exécution de `python`, mais avec beaucoup plus de fonctionnalités.

```bash
ipython
```

Cela affichera quelques informations sur les versions de Python et de IPython que vous utilisez, puis vous devriez voir une invite de saisie :

```python
In [1]:
```

Vous avez maintenant devant vous un shell Python interactif. Essentiellement, c'est un bac à sable dans lequel vous pouvez expérimenter. Si vous êtes arrivé jusqu’ici, il est temps d’importer Web3.py :

```python
In [1]: from web3 import Web3
```

## Présentation du module Web3 {#introducing-the-web3-module}

En plus d'être une passerelle vers Ethereum, le module [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) offre quelques fonctions utilitaires. Explorons-en quelques-unes.

Dans une application Ethereum, vous aurez souvent besoin de convertir des dénominations de monnaie. Le module Web3 fournit quelques méthodes d'assistance à cet effet : [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) et [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Note: Computers are notoriously bad at handling decimal math. To get around this, developers often store dollar amounts in cents. For example, an item with a price of $5.99 may be stored in the database as 599.

Un modèle similaire est utilisé lors du traitement des transactions en <b>ether</b>. Cependant, au lieu de deux décimales, l'ether en a 18 ! La plus petite dénomination d'ether s'appelle <b>wei</b>, c'est donc la valeur spécifiée lors de l'envoi de transactions.

1 ether = 1000000000000000000 wei

1 wei = 0,000000000000000001 ether

</FeaturedText>

Essayez de convertir certaines valeurs depuis et vers le wei. Notez qu'[il existe des noms pour la plupart des dénominations](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) entre l'ether et le wei. L'un des plus connus est le **gwei**, car c'est souvent ainsi que les frais de transaction sont représentés.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

D'autres méthodes utilitaires du module Web3 comprennent des convertisseurs de format de données (par ex., [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), des assistants d'adresse (par ex., [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)), et des fonctions de hachage (par ex., [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Beaucoup d'entre elles seront abordées plus tard dans la série. Pour afficher toutes les méthodes et propriétés disponibles, utilisez l'auto-complétion d'IPython en tapant `Web3`. et en appuyant deux fois sur la touche tabulation après le point.

## Discuter avec la chaîne {#talk-to-the-chain}

Les méthodes de commodité sont très bien, mais passons à la blockchain. L'étape suivante consiste à configurer Web3.py pour qu'il communique avec un nœud Ethereum. Ici, nous avons la possibilité d'utiliser les fournisseurs IPC, HTTP ou Websocket.

Nous n'allons pas suivre cette voie, mais un exemple de flux de travail complet utilisant le fournisseur HTTP pourrait ressembler à ceci :

- Téléchargez un nœud Ethereum, par ex., [Geth](https://geth.ethereum.org/).
- Démarrez Geth dans une fenêtre de terminal et attendez qu'il synchronise le réseau. Le port HTTP par défaut est `8545`, mais il est configurable.
- Indiquez à Web3.py de se connecter au nœud via HTTP, sur `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Utilisez l'instance `w3` pour interagir avec le nœud.

Bien que ce soit une façon « réelle » de le faire, le processus de synchronisation prend des heures et est inutile si vous voulez juste un environnement de développement. Web3.py expose un quatrième fournisseur à cet effet, l'**EthereumTesterProvider**. Ce fournisseur de test est relié à un nœud Ethereum simulé avec des autorisations assouplies et de la fausse monnaie pour s'exercer.

![Un diagramme montrant EthereumTesterProvider reliant votre application web3.py à un nœud Ethereum simulé](./ethereumtesterprovider.png)

_L'EthereumTesterProvider se connecte à un nœud simulé et est pratique pour des environnements de développement rapides._

Ce nœud simulé s'appelle [eth-tester](https://github.com/ethereum/eth-tester) et nous l'avons installé dans le cadre de la commande `pip install web3[tester]`. Configurer Web3.py pour utiliser ce fournisseur de test est aussi simple que :

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Vous êtes maintenant prêt à surfer sur la chaîne ! Personne ne dit ça. Je viens de l'inventer. Faisons un tour rapide.

## Le tour rapide {#the-quick-tour}

Tout d'abord, une vérification de base :

```python
In [5]: w3.is_connected()
Out[5]: True
```

Étant donné que nous utilisons le fournisseur de test, ce test n'est pas très utile, mais s'il échoue, il y a de fortes chances que vous ayez mal saisi quelque chose lors de l'instanciation de la variable `w3`. Vérifiez que vous avez bien inclus les parenthèses intérieures, c'est-à-dire `Web3.EthereumTesterProvider()`.

## Arrêt n°1 : [comptes](/developers/docs/accounts/) {#tour-stop-1-accounts}

Par commodité, le fournisseur de test a créé des comptes et les a préchargés avec de l'ether de test.

D'abord, jetons un œil à la liste de ces comptes :

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Si vous exécutez cette commande, vous devriez voir une liste de dix chaînes de caractères qui commencent par `0x`. Chacune est une **adresse publique** et est, à certains égards, analogue au numéro de compte d'un compte courant. Vous fourniriez cette adresse à quelqu'un qui voudrait vous envoyer de l'ether.

Comme mentionné, le fournisseur de test a préchargé chacun de ces comptes avec de l'ether de test. Voyons combien il y en a dans le premier compte :

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Ça fait beaucoup de zéros ! Avant d'aller rire jusqu'à la fausse banque, rappelez-vous la leçon précédente sur les dénominations de devises. Les valeurs en ether sont représentées dans la plus petite dénomination, le wei. Convertissons cela en ether :

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Un million d'ethers de test... ce n'est pas si mal.

## Arrêt n°2 : données des blocs {#tour-stop-2-block-data}

Jetons un coup d’œil à l’état de cette blockchain simulée :

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

Beaucoup d'informations sont retournées à propos d'un bloc, mais il y a juste quelques points à souligner ici :

- Le numéro de bloc est zéro, peu importe depuis combien de temps vous avez configuré le fournisseur de test. Contrairement au véritable réseau Ethereum, qui ajoute un nouveau bloc toutes les 12 secondes environ, cette simulation attendra que vous lui donniez du travail à faire.
- `transactions` est une liste vide, pour la même raison : nous n’avons encore rien fait. Ce premier bloc est un **bloc vide**, juste pour démarrer la chaîne.
- Notez que le `parentHash` n'est qu'un ensemble d'octets vides. Cela signifie qu'il s'agit du premier bloc de la chaîne, également connu sous le nom de **bloc de genèse**.

## Arrêt n°3 : [transactions](/developers/docs/transactions/) {#tour-stop-3-transactions}

Nous sommes bloqués au bloc zéro jusqu'à ce qu'il y ait une transaction en attente, alors créons-en une. Envoyez quelques ethers de test d'un compte à un autre :

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

C'est généralement à ce moment-là que vous devez attendre plusieurs secondes que votre transaction soit incluse dans un nouveau bloc. Le processus complet se déroule comme suit :

1. Soumettez une transaction et conservez le hachage de la transaction. Tant que le bloc contenant la transaction n'est pas créé et diffusé, la transaction est « en attente ».
   `tx_hash = w3.eth.send_transaction({ … })`
2. Attendez que la transaction soit incluse dans un bloc :
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Poursuivre la logique de l'application. Pour afficher la transaction réussie :
   `w3.eth.get_transaction(tx_hash)`

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

Vous verrez ici quelques détails familiers : les champs `from`, `to` et `value` doivent correspondre aux entrées de notre appel `send_transaction`. L'autre élément rassurant est que cette transaction a été incluse comme première transaction (`'transactionIndex': 0`) dans le bloc numéro 1.

Nous pouvons également vérifier facilement le succès de cette transaction en consultant les soldes des deux comptes concernés. Trois ethers auraient dû passer de l'un à l'autre.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Ce dernier semble bon ! Le solde est passé de 1 000 000 à 1 000 003 ethers. Mais qu'est-il arrivé au premier compte ? Il semble avoir perdu un peu plus de trois ethers. Hélas, rien dans la vie n'est gratuit, et l'utilisation du réseau public Ethereum exige que vous dédommagiez vos pairs pour leur rôle de soutien. De faibles frais de transaction ont été déduits du compte qui a soumis la transaction. Ces frais correspondent à la quantité de gaz brûlé (21 000 unités de gaz pour un transfert d'ETH) multipliée par des frais de base qui varient en fonction de l'activité du réseau, plus un pourboire qui va au validateur qui inclut la transaction dans un bloc.

En savoir plus sur le [gaz](/developers/docs/gas/#post-london)

<FeaturedText>Remarque : sur le réseau public, les frais de transaction sont variables en fonction de la demande du réseau et de la rapidité avec laquelle vous souhaitez qu'une transaction soit traitée. Si vous souhaitez obtenir une répartition de la manière dont les frais sont calculés, consultez mon article précédent sur la <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">façon dont les transactions sont incluses dans un bloc</a>.</FeaturedText>

## Et respirez {#and-breathe}

Cela fait un moment que nous y sommes, c'est donc le bon moment pour faire une pause. Le terrier du lapin se poursuit, et nous continuerons à l'explorer dans la deuxième partie de cette série. Quelques concepts à venir : la connexion à un nœud réel, les contrats intelligents et les jetons. Vous avez d'autres questions ? Faites-le moi savoir ! Vos commentaires influenceront la suite des événements. Les demandes sont les bienvenues via [Twitter](https://twitter.com/wolovim).
