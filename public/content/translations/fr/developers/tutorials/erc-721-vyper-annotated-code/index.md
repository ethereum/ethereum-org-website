---
title: "Explication détaillée du contrat ERC-721 en Vyper"
description: "Le contrat ERC-721 de Ryuya Nakamura et son fonctionnement"
author: Ori Pomerantz
lang: fr
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: "Vyper ERC-721"
published: 2021-04-01
---

## Introduction {#introduction}

Le standard [ERC-721](/developers/docs/standards/tokens/erc-721/) est utilisé pour détenir la propriété de jetons non fongibles (NFT).
Les jetons [ERC-20](/developers/docs/standards/tokens/erc-20/) se comportent comme une marchandise, car il n'y a aucune différence entre les jetons individuels.
En revanche, les jetons ERC-721 sont conçus pour des actifs similaires mais non identiques, tels que différents [dessins de chats](https://www.cryptokitties.co/)
ou des titres de propriété pour différents biens immobiliers.

Dans cet article, nous analyserons [le contrat ERC-721 de Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Ce contrat est écrit en [Vyper](https://vyper.readthedocs.io/en/latest/index.html), un langage de contrat similaire à Python conçu pour rendre
plus difficile l'écriture de code non sécurisé par rapport à Solidity.

## Le Contrat {#contract}

```python
# @dev Implémentation du standard de jeton non fongible ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Modifié à partir de : https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Les commentaires en Vyper, comme en Python, commencent par un hash (`#`) et continuent jusqu'à la fin de la ligne. Les commentaires qui incluent
`@<keyword>` sont utilisés par [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) pour produire une documentation lisible par l'homme.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

L'interface ERC-721 est intégrée au langage Vyper.
[Vous pouvez voir la définition du code ici](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
La définition de l'interface est écrite en Python, plutôt qu'en Vyper, car les interfaces sont utilisées non seulement au sein de la
chaîne de blocs, mais aussi lors de l'envoi d'une transaction à la chaîne de blocs depuis un client externe, qui peut être écrit en
Python.

La première ligne importe l'interface, et la seconde spécifie que nous l'implémentons ici.

### L'Interface ERC721Receiver {#receiver-interface}

```python
# Interface pour le contrat appelé par safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

L'ERC-721 prend en charge deux types de transfert :

- `transferFrom`, qui permet à l'expéditeur de spécifier n'importe quelle adresse de destination et place la responsabilité
  du transfert sur l'expéditeur. Cela signifie que vous pouvez transférer vers une adresse invalide, auquel cas
  le NFT est perdu pour de bon.
- `safeTransferFrom`, qui vérifie si l'adresse de destination est un contrat. Si c'est le cas, le contrat ERC-721
  demande au contrat récepteur s'il souhaite recevoir le NFT.

Pour répondre aux requêtes `safeTransferFrom`, un contrat récepteur doit implémenter `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

L'adresse `_from` est le propriétaire actuel du jeton. L'adresse `_operator` est celle qui a
demandé le transfert (ces deux adresses peuvent ne pas être les mêmes, en raison des allocations).

```python
            _tokenId: uint256,
```

Les identifiants de jetons ERC-721 font 256 bits. Généralement, ils sont créés par le hachage d'une description de ce que
le jeton représente.

```python
            _data: Bytes[1024]
```

La requête peut contenir jusqu'à 1024 octets de données utilisateur.

```python
        ) -> bytes32: view
```

Pour éviter les cas où un contrat accepte accidentellement un transfert, la valeur de retour n'est pas un booléen,
mais 256 bits avec une valeur spécifique.

Cette fonction est une `view`, ce qui signifie qu'elle peut lire l'état de la chaîne de blocs, mais pas le modifier.

### Événements {#events}

Les [événements](/developers/docs/smart-contracts/anatomy/#events-and-logs)
sont émis pour informer les utilisateurs et les serveurs en dehors de la chaîne de blocs des événements. Notez que le contenu des événements
n'est pas disponible pour les contrats sur la chaîne de blocs.

```python
# @dev Émis lorsque la propriété d'un NFT change par n'importe quel mécanisme. Cet événement est émis lorsque des NFT sont
#      créés (`from` == 0) et détruits (`to` == 0). Exception : lors de la création du contrat, n'importe quel
#      nombre de NFT peut être créé et assigné sans émettre de Transfer. Au moment de tout
#      transfert, l'adresse approuvée pour ce NFT (s'il y en a une) est réinitialisée à aucune.
# @param _from Expéditeur du NFT (si l'adresse est l'adresse zéro, cela indique la création du jeton).
# @param _to Destinataire du NFT (si l'adresse est l'adresse zéro, cela indique la destruction du jeton).
# @param _tokenId Le NFT qui a été transféré.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Ceci est similaire à l'événement de transfert ERC-20, sauf que nous signalons un `tokenId` au lieu d'un montant.
Personne ne possède l'adresse zéro, donc par convention, nous l'utilisons pour signaler la création et la destruction de jetons.

```python
# @dev Ceci est émis lorsque l'adresse approuvée pour un NFT est modifiée ou réaffirmée. L'adresse zéro
#      indique qu'il n'y a pas d'adresse approuvée. Lorsqu'un événement Transfer est émis, cela
#      indique également que l'adresse approuvée pour ce NFT (s'il y en a une) est réinitialisée à aucune.
# @param _owner Propriétaire du NFT.
# @param _approved Adresse que nous approuvons.
# @param _tokenId NFT que nous approuvons.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Une approbation ERC-721 est similaire à une allocation ERC-20. Une adresse spécifique est autorisée à transférer un jeton
spécifique. Cela fournit un mécanisme permettant aux contrats de répondre lorsqu'ils acceptent un jeton. Les contrats ne peuvent pas
écouter les événements, donc si vous leur transférez simplement le jeton, ils ne le « savent » pas. De cette façon, le
propriétaire soumet d'abord une approbation, puis envoie une requête au contrat : « J'ai approuvé le transfert du jeton
X pour vous, veuillez procéder... ».

C'est un choix de conception pour rendre le standard ERC-721 similaire au standard ERC-20. Étant donné que
les jetons ERC-721 ne sont pas fongibles, un contrat peut également identifier qu'il a reçu un jeton spécifique en
examinant la propriété du jeton.

```python
# @dev Ceci est émis lorsqu'un opérateur est activé ou désactivé pour un propriétaire. L'opérateur peut gérer
#      tous les NFT du propriétaire.
# @param _owner Propriétaire du NFT.
# @param _operator Adresse à laquelle nous définissons les droits d'opérateur.
# @param _approved Statut des droits d'opérateur (vrai si les droits d'opérateur sont accordés et faux s'ils sont
# révoqués).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Il est parfois utile d'avoir un _opérateur_ qui peut gérer tous les jetons d'un compte d'un type spécifique (ceux qui sont gérés par
un contrat spécifique), de manière similaire à une procuration. Par exemple, je pourrais vouloir donner un tel pouvoir à un contrat qui vérifie si
je ne l'ai pas contacté depuis six mois, et si c'est le cas, distribue mes actifs à mes héritiers (si l'un d'eux le demande, les contrats
ne peuvent rien faire sans être appelés par une transaction). Dans l'ERC-20, nous pouvons simplement donner une allocation élevée à un contrat d'héritage,
mais cela ne fonctionne pas pour l'ERC-721 car les jetons ne sont pas fongibles. Ceci en est l'équivalent.

La valeur `approved` nous indique si l'événement concerne une approbation ou le retrait d'une approbation.

### Variables d'État {#state-vars}

Ces variables contiennent l'état actuel des jetons : lesquels sont disponibles et qui les possède. La plupart d'entre elles
sont des objets `HashMap`, [des correspondances unidirectionnelles qui existent entre deux types](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapping de l'ID du NFT vers l'adresse qui le possède.
idToOwner: HashMap[uint256, address]

# @dev Mapping de l'ID du NFT vers l'adresse approuvée.
idToApprovals: HashMap[uint256, address]
```

Les identités des utilisateurs et des contrats dans Ethereum sont représentées par des adresses de 160 bits. Ces deux variables font correspondre
les identifiants de jetons à leurs propriétaires et à ceux approuvés pour les transférer (au maximum un pour chaque). Dans Ethereum,
les données non initialisées sont toujours à zéro, donc s'il n'y a pas de propriétaire ou de transférant approuvé, la valeur pour ce jeton
est zéro.

```python
# @dev Mapping de l'adresse du propriétaire vers le nombre de ses jetons.
ownerToNFTokenCount: HashMap[address, uint256]
```

Cette variable contient le nombre de jetons pour chaque propriétaire. Il n'y a pas de correspondance des propriétaires vers les jetons, donc
la seule façon d'identifier les jetons qu'un propriétaire spécifique possède est de regarder en arrière dans l'historique des événements de la chaîne de blocs
et de voir les événements `Transfer` appropriés. Nous pouvons utiliser cette variable pour savoir quand nous avons tous les NFT et n'avons
pas besoin de chercher plus loin dans le temps.

Notez que cet algorithme ne fonctionne que pour les interfaces utilisateur et les serveurs externes. Le code s'exécutant sur la chaîne de blocs
elle-même ne peut pas lire les événements passés.

```python
# @dev Mapping de l'adresse du propriétaire vers le mapping des adresses d'opérateurs.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Un compte peut avoir plus d'un seul opérateur. Un simple `HashMap` est insuffisant pour
en garder la trace, car chaque clé mène à une seule valeur. À la place, vous pouvez utiliser
`HashMap[address, bool]` comme valeur. Par défaut, la valeur pour chaque adresse est `False`, ce qui signifie qu'elle
n'est pas un opérateur. Vous pouvez définir les valeurs sur `True` selon les besoins.

```python
# @dev Adresse du frappeur, qui peut frapper un jeton
minter: address
```

De nouveaux jetons doivent être créés d'une manière ou d'une autre. Dans ce contrat, il y a une seule entité qui est autorisée à le faire, le
`minter`. Cela est probablement suffisant pour un jeu, par exemple. Pour d'autres objectifs, il pourrait être nécessaire
de créer une logique métier plus compliquée.

```python
# @dev Mapping de l'ID d'interface vers un booléen indiquant s'il est pris en charge ou non
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID d'interface ERC-165 de l'ERC-165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID d'interface ERC-165 de l'ERC-721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) spécifie un mécanisme permettant à un contrat de divulguer comment les applications
peuvent communiquer avec lui, et à quels ERC il se conforme. Dans ce cas, le contrat se conforme à l'ERC-165 et à l'ERC-721.

### Fonctions {#functions}

Ce sont les fonctions qui implémentent réellement l'ERC-721.

#### Constructeur {#constructor}

```python
@external
def __init__():
```

En Vyper, comme en Python, la fonction constructeur est appelée `__init__`.

```python
    """
    @dev Constructeur du contrat.
    """
```

En Python, et en Vyper, vous pouvez également créer un commentaire en spécifiant une chaîne multiligne (qui commence et se termine
par `"""`), et en ne l'utilisant d'aucune façon. Ces commentaires peuvent également inclure
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Pour accéder aux variables d'état, vous utilisez `self.<variable name>` (encore une fois, comme en Python).

#### Fonctions de Vue {#views}

Ce sont des fonctions qui ne modifient pas l'état de la chaîne de blocs, et peuvent donc être exécutées
gratuitement si elles sont appelées de l'extérieur. Si les fonctions de vue sont appelées par un contrat, elles doivent tout de même être exécutées sur
chaque nœud et coûtent donc du gaz.

```python
@view
@external
```

Ces mots-clés précédant une définition de fonction qui commencent par une arobase (`@`) sont appelés _décorations_. Ils
spécifient les circonstances dans lesquelles une fonction peut être appelée.

- `@view` spécifie que cette fonction est une vue.
- `@external` spécifie que cette fonction particulière peut être appelée par des transactions et par d'autres contrats.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Contrairement à Python, Vyper est un [langage à typage statique](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Vous ne pouvez pas déclarer une variable, ou un paramètre de fonction, sans identifier le [type de données](https://vyper.readthedocs.io/en/latest/types.html). Dans ce cas, le paramètre d'entrée est `bytes32`, une valeur de 256 bits
(256 bits est la taille de mot native de la [Machine Virtuelle Ethereum](/developers/docs/evm/)). La sortie est une valeur booléenne.
Par convention, les noms des paramètres de fonction commencent par un tiret bas (`_`).

```python
    """
    @dev L'identification de l'interface est spécifiée dans l'ERC-165.
    @param _interfaceID ID de l'interface
    """
    return self.supportedInterfaces[_interfaceID]
```

Renvoie la valeur de la HashMap `self.supportedInterfaces`, qui est définie dans le constructeur (`__init__`).

```python
### FONCTIONS VIEW ###
```

Ce sont les fonctions de vue qui rendent les informations sur les jetons disponibles pour les utilisateurs et les autres contrats.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Renvoie le nombre de NFT possédés par `_owner`.
         Annule si `_owner` est l'adresse zéro. Les NFT assignés à l'adresse zéro sont considérés comme invalides.
    @param _owner Adresse pour laquelle interroger le solde.
    """
    assert _owner != ZERO_ADDRESS
```

Cette ligne [affirme](https://vyper.readthedocs.io/en/latest/statements.html#assert) que `_owner` n'est pas
zéro. Si c'est le cas, il y a une erreur et l'opération est annulée.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Renvoie l'adresse du propriétaire du NFT.
         Annule si `_tokenId` n'est pas un NFT valide.
    @param _tokenId L'identifiant pour un NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Annule si `_tokenId` n'est pas un NFT valide
    assert owner != ZERO_ADDRESS
    return owner
```

Dans la Machine Virtuelle Ethereum (EVM), tout stockage qui n'a pas de valeur stockée est à zéro.
S'il n'y a pas de jeton à `_tokenId`, alors la valeur de `self.idToOwner[_tokenId]` est zéro. Dans ce
cas, la fonction est annulée.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Obtient l'adresse approuvée pour un seul NFT.
         Annule si `_tokenId` n'est pas un NFT valide.
    @param _tokenId ID du NFT pour lequel interroger l'approbation.
    """
    # Annule si `_tokenId` n'est pas un NFT valide
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Notez que `getApproved` _peut_ renvoyer zéro. Si le jeton est valide, il renvoie `self.idToApprovals[_tokenId]`.
S'il n'y a pas d'approbateur, cette valeur est zéro.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Vérifie si `_operator` est un opérateur approuvé pour `_owner`.
    @param _owner L'adresse qui possède les NFT.
    @param _operator L'adresse qui agit au nom du propriétaire.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Cette fonction vérifie si `_operator` est autorisé à gérer tous les jetons de `_owner` dans ce contrat.
Parce qu'il peut y avoir plusieurs opérateurs, il s'agit d'une HashMap à deux niveaux.

#### Fonctions d'Aide au Transfert {#transfer-helpers}

Ces fonctions implémentent des opérations qui font partie du transfert ou de la gestion des jetons.

```python

### FONCTIONS D'AIDE AU TRANSFERT ###

@view
@internal
```

Cette décoration, `@internal`, signifie que la fonction n'est accessible qu'à partir d'autres fonctions au sein du
même contrat. Par convention, les noms de ces fonctions commencent également par un tiret bas (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Renvoie si le dépensier donné peut transférer un ID de jeton donné
    @param spender adresse du dépensier à interroger
    @param tokenId uint256 ID du jeton à transférer
    @return bool si le msg.sender est approuvé pour l'ID de jeton donné,
        est un opérateur du propriétaire, ou est le propriétaire du jeton
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Il y a trois façons pour qu'une adresse soit autorisée à transférer un jeton :

1. L'adresse est le propriétaire du jeton
2. L'adresse est approuvée pour dépenser ce jeton
3. L'adresse est un opérateur pour le propriétaire du jeton

La fonction ci-dessus peut être une vue car elle ne modifie pas l'état. Pour réduire les coûts d'exploitation, toute
fonction qui _peut_ être une vue _devrait_ être une vue.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Ajoute un NFT à une adresse donnée
         Annule si `_tokenId` est possédé par quelqu'un.
    """
    # Annule si `_tokenId` est possédé par quelqu'un
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Change le propriétaire
    self.idToOwner[_tokenId] = _to
    # Change le suivi du nombre
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Retire un NFT d'une adresse donnée
         Annule si `_from` n'est pas le propriétaire actuel.
    """
    # Annule si `_from` n'est pas le propriétaire actuel
    assert self.idToOwner[_tokenId] == _from
    # Change le propriétaire
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Change le suivi du nombre
    self.ownerToNFTokenCount[_from] -= 1
```

Lorsqu'il y a un problème avec un transfert, nous annulons l'appel.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Efface une approbation d'une adresse donnée
         Annule si `_owner` n'est pas le propriétaire actuel.
    """
    # Annule si `_owner` n'est pas le propriétaire actuel
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Réinitialise les approbations
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Ne modifiez la valeur que si nécessaire. Les variables d'état vivent dans le stockage. L'écriture dans le stockage est
l'une des opérations les plus coûteuses que l'EVM (Machine Virtuelle Ethereum) effectue (en termes de
[gaz](/developers/docs/gas/)). Par conséquent, il est judicieux de la minimiser, même l'écriture de la
valeur existante a un coût élevé.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Exécute le transfert d'un NFT.
         Annule à moins que `msg.sender` ne soit le propriétaire actuel, un opérateur autorisé, ou l'adresse
         approuvée pour ce NFT. (REMARQUE : `msg.sender` n'est pas autorisé dans une fonction privée, passez donc `_sender`.)
         Annule si `_to` est l'adresse zéro.
         Annule si `_from` n'est pas le propriétaire actuel.
         Annule si `_tokenId` n'est pas un NFT valide.
    """
```

Nous avons cette fonction interne car il y a deux façons de transférer des jetons (régulière et sécurisée), mais
nous ne voulons qu'un seul emplacement dans le code où nous le faisons pour faciliter l'audit.

```python
    # Vérifie les prérequis
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Annule si `_to` est l'adresse zéro
    assert _to != ZERO_ADDRESS
    # Efface l'approbation. Annule si `_from` n'est pas le propriétaire actuel
    self._clearApproval(_from, _tokenId)
    # Retire le NFT. Annule si `_tokenId` n'est pas un NFT valide
    self._removeTokenFrom(_from, _tokenId)
    # Ajoute le NFT
    self._addTokenTo(_to, _tokenId)
    # Journalise le transfert
    log Transfer(_from, _to, _tokenId)
```

Pour émettre un événement en Vyper, vous utilisez une instruction `log` ([voir ici pour plus de détails](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Fonctions de Transfert {#transfer-funs}

```python

### FONCTIONS DE TRANSFERT ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Annule à moins que `msg.sender` ne soit le propriétaire actuel, un opérateur autorisé, ou l'adresse
         approuvée pour ce NFT.
         Annule si `_from` n'est pas le propriétaire actuel.
         Annule si `_to` est l'adresse zéro.
         Annule si `_tokenId` n'est pas un NFT valide.
    @notice L'appelant est responsable de confirmer que `_to` est capable de recevoir des NFT, sinon
            ils pourraient être perdus de façon permanente.
    @param _from Le propriétaire actuel du NFT.
    @param _to Le nouveau propriétaire.
    @param _tokenId Le NFT à transférer.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Cette fonction vous permet de transférer vers une adresse arbitraire. À moins que l'adresse ne soit un utilisateur, ou un contrat qui
sait comment transférer des jetons, tout jeton que vous transférez sera bloqué à cette adresse et inutile.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfère la propriété d'un NFT d'une adresse à une autre adresse.
         Annule à moins que `msg.sender` ne soit le propriétaire actuel, un opérateur autorisé, ou
         l'adresse approuvée pour ce NFT.
         Annule si `_from` n'est pas le propriétaire actuel.
         Annule si `_to` est l'adresse zéro.
         Annule si `_tokenId` n'est pas un NFT valide.
         Si `_to` est un contrat intelligent, il appelle `onERC721Received` sur `_to` et annule si
         la valeur de retour n'est pas `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         REMARQUE : bytes4 est représenté par bytes32 avec remplissage
    @param _from Le propriétaire actuel du NFT.
    @param _to Le nouveau propriétaire.
    @param _tokenId Le NFT à transférer.
    @param _data Données supplémentaires sans format spécifié, envoyées lors de l'appel à `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Il est acceptable de faire le transfert en premier car s'il y a un problème, nous allons de toute façon annuler,
donc tout ce qui a été fait dans l'appel sera annulé.

```python
    if _to.is_contract: # vérifie si `_to` est une adresse de contrat
```

Vérifiez d'abord si l'adresse est un contrat (si elle a du code). Sinon, supposez qu'il s'agit d'une adresse
d'utilisateur et que l'utilisateur pourra utiliser le jeton ou le transférer. Mais ne vous laissez pas bercer
par un faux sentiment de sécurité. Vous pouvez perdre des jetons, même avec `safeTransferFrom`, si vous les transférez
à une adresse pour laquelle personne ne connaît la clé privée.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Appelez le contrat cible pour voir s'il peut recevoir des jetons ERC-721.

```python
        # Annule si la destination du transfert est un contrat qui n'implémente pas 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Si la destination est un contrat, mais qui n'accepte pas les jetons ERC-721 (ou qui a décidé de ne pas accepter ce
transfert particulier), annulez.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Définit ou réaffirme l'adresse approuvée pour un NFT. L'adresse zéro indique qu'il n'y a pas d'adresse approuvée.
         Annule à moins que `msg.sender` ne soit le propriétaire actuel du NFT, ou un opérateur autorisé du propriétaire actuel.
         Annule si `_tokenId` n'est pas un NFT valide. (REMARQUE : Ce n'est pas écrit dans l'EIP)
         Annule si `_approved` est le propriétaire actuel. (REMARQUE : Ce n'est pas écrit dans l'EIP)
    @param _approved Adresse à approuver pour l'ID de NFT donné.
    @param _tokenId ID du jeton à approuver.
    """
    owner: address = self.idToOwner[_tokenId]
    # Annule si `_tokenId` n'est pas un NFT valide
    assert owner != ZERO_ADDRESS
    # Annule si `_approved` est le propriétaire actuel
    assert _approved != owner
```

Par convention, si vous ne voulez pas avoir d'approbateur, vous désignez l'adresse zéro, pas vous-même.

```python
    # Vérifie les prérequis
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Pour définir une approbation, vous pouvez être soit le propriétaire, soit un opérateur autorisé par le propriétaire.

```python
    # Définit l'approbation
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Active ou désactive l'approbation pour un tiers ("opérateur") de gérer tous les
         actifs de `msg.sender`. Cela émet également l'événement ApprovalForAll.
         Annule si `_operator` est le `msg.sender`. (REMARQUE : Ce n'est pas écrit dans l'EIP)
    @notice Cela fonctionne même si l'expéditeur ne possède aucun jeton à ce moment-là.
    @param _operator Adresse à ajouter à l'ensemble des opérateurs autorisés.
    @param _approved Vrai si l'opérateur est approuvé, faux pour révoquer l'approbation.
    """
    # Annule si `_operator` est le `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Frapper de Nouveaux Jetons et Brûler les Existants {#mint-burn}

Le compte qui a créé le contrat est le `minter`, le super utilisateur qui est autorisé à frapper
de nouveaux NFT. Cependant, même lui n'est pas autorisé à brûler des jetons existants. Seul le propriétaire, ou une entité
autorisée par le propriétaire, peut le faire.

```python
### FONCTIONS POUR FRAPPER ET BRÛLER ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Cette fonction renvoie toujours `True`, car si l'opération échoue, elle est annulée.

```python
    """
    @dev Fonction pour frapper des jetons
         Annule si `msg.sender` n'est pas le frappeur.
         Annule si `_to` est l'adresse zéro.
         Annule si `_tokenId` est possédé par quelqu'un.
    @param _to L'adresse qui recevra les jetons frappés.
    @param _tokenId L'ID du jeton à frapper.
    @return Un booléen qui indique si l'opération a réussi.
    """
    # Annule si `msg.sender` n'est pas le frappeur
    assert msg.sender == self.minter
```

Seul le frappeur (le compte qui a créé le contrat ERC-721) peut frapper de nouveaux jetons. Cela peut être un
problème à l'avenir si nous voulons changer l'identité du frappeur. Dans
un contrat de production, vous voudriez probablement une fonction qui permet au frappeur de transférer les
privilèges de frappeur à quelqu'un d'autre.

```python
    # Annule si `_to` est l'adresse zéro
    assert _to != ZERO_ADDRESS
    # Ajoute le NFT. Annule si `_tokenId` est possédé par quelqu'un
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Par convention, la frappe de nouveaux jetons compte comme un transfert depuis l'adresse zéro.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Brûle un jeton ERC-721 spécifique.
         Annule à moins que `msg.sender` ne soit le propriétaire actuel, un opérateur autorisé, ou l'adresse
         approuvée pour ce NFT.
         Annule si `_tokenId` n'est pas un NFT valide.
    @param _tokenId uint256 ID du jeton ERC-721 à brûler.
    """
    # Vérifie les prérequis
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Annule si `_tokenId` n'est pas un NFT valide
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Toute personne autorisée à transférer un jeton est autorisée à le brûler. Bien qu'un burn semble équivalent à un
transfert vers l'adresse zéro, l'adresse zéro ne reçoit pas réellement le jeton. Cela nous permet de
libérer tout le stockage qui était utilisé pour le jeton, ce qui peut réduire le coût en gaz de la transaction.

## Utiliser ce Contrat {#using-contract}

Contrairement à Solidity, Vyper n'a pas d'héritage. C'est un choix de conception délibéré pour rendre le
code plus clair et donc plus facile à sécuriser. Donc, pour créer votre propre contrat ERC-721 en Vyper, vous prenez [ce
contrat](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) et le modifiez
pour implémenter la logique métier que vous souhaitez.

## Conclusion {#conclusion}

Pour résumer, voici quelques-unes des idées les plus importantes de ce contrat :

- Pour recevoir des jetons ERC-721 avec un transfert sécurisé, les contrats doivent implémenter l'interface `ERC721Receiver`.
- Même si vous utilisez un transfert sécurisé, les jetons peuvent toujours rester bloqués si vous les envoyez à une adresse dont la clé privée
  est inconnue.
- Lorsqu'il y a un problème avec une opération, il est judicieux d'`revert` l'appel, plutôt que de simplement renvoyer
  une valeur d'échec.
- Les jetons ERC-721 existent lorsqu'ils ont un propriétaire.
- Il y a trois façons d'être autorisé à transférer un NFT. Vous pouvez être le propriétaire, être approuvé pour un jeton spécifique,
  ou être un opérateur pour tous les jetons du propriétaire.
- Les événements passés ne sont visibles qu'en dehors de la chaîne de blocs. Le code s'exécutant à l'intérieur de la chaîne de blocs ne peut pas les voir.

Maintenant, allez implémenter des contrats Vyper sécurisés.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).