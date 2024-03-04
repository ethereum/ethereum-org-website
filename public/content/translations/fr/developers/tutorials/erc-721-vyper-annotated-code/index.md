---
title: "Découvrir le contrat Vyper ERC-721"
description: Le contrat ERC-721 de Ryuya Nakamura et son fonctionnement
author: Ori Pomerantz
lang: fr
tags:
  - "vyper"
  - "erc-721"
  - "python"
skill: beginner
published: 2021-04-01
---

## Introduction {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) est une norme utilisée pour garantir la propriété des jetons non fongibles (NFT). Les jetons [ERC-20](/developers/docs/standards/tokens/erc-20/) se comportent comme une monnaie, car il n'y a aucune différence entre chacun d'eux. À l'inverse, les jetons ERC-721 ont été conçus pour des actifs qui sont similaires mais pas identiques, comme par exemple différents [dessins de chats](https://www.cryptokitties.co/) ou différents titres de propriété de biens immobiliers.

Dans cet article, nous allons décortiquer le [contrat ERC-721 de Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy). Ce contrat a été écrit en [Vyper](https://vyper.readthedocs.io/en/latest/index.html), un langage de contrat similaire à Python, conçu pour rendre plus difficile l'écriture de code non sécurisé que ce n'est le cas dans Solidity.

## Le contrat {#contract}

```python
# @dev Implémentation de la norme de jeton non fongible ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Modifié à partir de : https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Tout comme avec Python, les commentaires Vyper commencent par une empreinte numérique (`#`) et continuent jusqu'au bout de la ligne. Les commentaires qui comportent `@<keyword>` sont compris par [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) afin de produire une documentation compréhensible pour l'être humain.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

L'interface ERC-721 est intégrée au langage Vyper. [Vous pouvez lire sa définition en code Python ici](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py). La définition de l'interface est écrite en Python plutôt qu'en Vyper. En effet, les interfaces ne sont pas utilisées seulement au sein de la blockchain, mais aussi lors de l'envoi d'une transaction vers la blockchain depuis un client externe, qui peut avoir été écrit en Python.

La première ligne importe l'interface, et la deuxième spécifie que nous l'implémentons ici.

### L'interface ERC721Receiver {#receiver-interface}

```python
# Interface pour le contrat appelé par safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 autorise deux types de transfert :

- `transferFrom`, qui permet à l'expéditeur de spécifier n'importe quelle adresse de destination et fait reposer la responsabilité du transfert sur l'expéditeur. Cela signifie que vous pouvez effectuer un transfert vers une adresse erronée, auquel cas le NFT sera définitivement perdu.
- `safeTransferFrom`, qui vérifie si l'adresse de destination est un contrat. Si c'est le cas, le contrat ERC-721 demande au contrat destinataire s'il accepte de recevoir le NFT.

Pour répondre aux requêtes de `safeTransferFrom`, le contrat destinataire doit implémenter `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

L'adresse `_from` est le propriétaire actuel du jeton. L'adresse `_operator` est celle qui a demandé le transfert (les deux peuvent ne pas être identiques, en raison des quotas).

```python
            _tokenId: uint256,
```

Les identifiants des jetons ERC-721 comportent 256 bits. Il sont généralement créés par le hachage de la description qui représente le jeton.

```python
            _data: Bytes[1024]
```

La requête peut comporter jusqu'à 1024 octets de données utilisateur.

```python
        ) -> bytes32: view
```

Pour éviter les cas où un contrat accepte accidentellement un transfert, la valeur de retour n'est pas un booléen, mais 256 bits avec une valeur spécifique.

Cette fonction est de type `view`, ce qui signifie qu'elle peut consulter l'état de la blockchain, mais pas le modifier.

### Évènements {#events}

Les [évènements](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) sont émis pour informer les utilisateurs et les serveurs extérieurs à la blockchain des évènements. Notez que le contenu des évènements n'est pas accessible aux contrats sur la blockchain.

```python
# @dev Emits when ownership of any NFT changes by any mechanism. This event emits when NFTs are
#      created (`from` == 0) and destroyed (`to` == 0). Exception: during contract creation, any
#      number of NFTs may be created and assigned without emitting Transfer. At the time of any
#      transfer, the approved address for that NFT (if any) is reset to none.
# @param _from Sender of NFT (if address is zero address it indicates token creation).
# @param _to Receiver of NFT (if address is zero address it indicates token destruction).
# @param _tokenId The NFT that got transferred.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

On retrouve des similitudes avec l'évènement Transfer ERC-20, à l'exception du fait que nous fournissons un `tokenId` au lieu d'un montant. Personne n'est propriétaire de l'adresse zéro, donc par convention, on l'utilise pour indiquer la création et la destruction des jetons.

```python
# @dev This emits when the approved address for an NFT is changed or reaffirmed. The zero
#      address indicates there is no approved address. When a Transfer event emits, this also
#      indicates that the approved address for that NFT (if any) is reset to none.
# @param _owner Owner of NFT.
# @param _approved Address that we are approving.
# @param _tokenId NFT which we are approving.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Un évènement d'approbation ERC-721 est comparable à une autorisation ERC-20. Une adresse spécifique est autorisée à transférer un jeton spécifique. Cela donne un mécanisme permettant aux contrats de répondre lorsqu'ils acceptent un jeton. Les contrats ne peuvent pas écouter les évènements, donc si vous leur transférez simplement le jeton, ils n'en seront pas « informés ». De cette façon, le propriétaire envoie d'abord un évènement d'approbation, puis envoie une demande au contrat : « J'ai autorisé le transfert du jeton X, veuillez ... ».

Il s'agit d'un choix de conception visant à rendre la norme ERC-721 similaire à la norme ERC-20. Les jetons ERC-721 n'étant pas fongibles, un contrat peut aussi déterminer qu'il a reçu un jeton spécifique en regardant la propriété du jeton.

```python
# @dev This emits when an operator is enabled or disabled for an owner. The operator can manage
#      all NFTs of the owner.
# @param _owner Owner of NFT.
# @param _operator Address to which we are setting operator rights.
# @param _approved Status of operator rights(true if operator rights are given and false if
# revoked).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Il est parfois utile de disposer d'un _opérateur_ qui peut gérer tous les jetons d'un compte d'un type spécifique (ceux qui sont gérés par un contrat spécifique), à la manière d'une procuration. Par exemple, je pourrais vouloir donner ce rôle à un contrat qui vérifie si je ne l'ai pas contacté pendant six mois et qui, le cas échéant, distribuerait mes biens à mes héritiers (si l'un d'entre eux le demande, en effet, les contrats ne peuvent rien faire sans être appelés par une transaction). Avec ERC-20, nous avons simplement à allouer un quota élevé à un contrat d'héritage, mais cela ne fonctionne pas avec ERC-721, car les jetons ne sont pas fongibles. C'est l'équivalent.

La valeur `approved` nous indique si l'évènement concerne une approbation ou bien le retrait d'une approbation.

### Variables d'état {#state-vars}

Ces variables contiennent l'état actuel des jetons : lesquels sont disponibles et qui les possède. La plupart d'entre elles sont des objets de type `HashMap`, [une mise en correspondance (mapping) unidirectionnelle entre deux types](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapping from NFT ID to the address that owns it.
idToOwner: HashMap[uint256, address]

# @dev Mapping from NFT ID to approved address.
idToApprovals: HashMap[uint256, address]
```

Les identités des utilisateurs et les contrats sur Ethereum sont représentés par des adresses de 160 bits. Les deux variables ci-dessus mettent respectivement en correspondance les identifiants des jetons à leur propriétaire, et aux personnes autorisées à les transférer (au maximum un jeton pour chacun). Sur Ethereum, les données non initialisées sont toujours égales à zéro, donc s'il n'y a pas de propriétaire ou de transféreur approuvé, la valeur de ce jeton sera zéro.

```python
# @dev Mapping from owner address to count of his tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Cette variable contient le nombre de jetons pour chaque propriétaire. Il n'y a pas de correspondance entre les propriétaires et les jetons, donc la seule manière d'identifier les jetons qu'un propriétaire spécifique possède est de regarder dans l'historique des évènements de la blockchain et d'y trouver les évènements `Transfer` associés à ce dernier. Cette variable peut être utilisée pour déterminer quand nous avons tous les NFT et que nous n'avons pas besoin d'attendre plus longtemps.

Veuillez noter que cet algorithme ne fonctionne qu'avec les interfaces utilisateurs et les serveurs externes. Le code qui s'exécute sur la blockchain elle-même ne peut pas accéder aux évènements passés.

```python
# @dev Mapping from owner address to mapping of operator addresses.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Un compte peut avoir plus d'un opérateur. Une simple `HashMap` est insuffisante pour tous les stocker, parce que chaque clé correspond à une seule valeur. À la place, vous pouvez utiliser `HashMap[address, bool]` en tant que valeur. Par défaut, la valeur de chaque adresse est `False`, ce qui signifie qu'il ne s'agit pas d'un opérateur. Vous pouvez changer les valeurs à `True` si nécessaire.

```python
# @dev Address of minter, who can mint a token
minter: address
```

Les nouveaux jetons doivent être créés d'une manière ou d'une autre. Dans ce contrat, une seule entité est autorisée à le faire, le `minter`. Cela devrait suffire dans le cas d'un jeu, par exemple. Dans d'autres situations, il se pourrait que vous ayez besoin de créer une stratégie commerciale plus complexe.

```python
# @dev Mapping of interface id to bool about whether or not it's supported
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 interface ID of ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165 interface ID of ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) définit un mécanisme permettant à un contrat de préciser comment les applications peuvent communiquer avec ce dernier, auquel les normes ERC se conforment. Dans cet exemple, le contrat se conforme aux normes ERC-165 et ERC-721.

### Fonctions {#functions}

Ce sont les fonctions qui mettent véritablement ERC-721 en œuvre.

#### Constructeur {#constructor}

```python
@external
def __init__():
```

En Vyper, tout comme en Python, la fonction constructeur est appelée `__init__`.

```python
    """
    @dev Contract constructor.
    """
```

En Python, et en Vyper, vous pouvez aussi écrire des commentaires en spécifiant une chaîne de caractères multi-lignes (qui doit commencer et se terminer par `"""`), et ne l'utiliser en aucune façon. Les commentaires prennent également [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) en charge.

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Pour accéder aux variables d'état, on utilise `self.<variable name>` (encore une fois, comme en Python).

#### Fonctions « view » {#views}

Ce sont des fonctions qui ne modifient pas l'état de la blockchain, et qui peuvent donc être exécutées gratuitement lorsqu'elles sont appelées en externe. Si ces fonctions sont appelées par un contrat, elles doivent quand-même être exécutées sur chaque nœud, et coûtent ainsi du gaz.

```python
@view
@external
```

Ces mot-clés commençant par une arobase (`@`) précèdent une définition de fonction et s'appellent des _décorateurs_. Ils déterminent les circonstances dans lesquelles une fonction peut être appelée.

- `@view` spécifie que la fonction est de type « view ».
- `@external` spécifie que cette fonction peut être appelée par des transactions et par d'autres contrats.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

À la différence de Python, Vyper est un [langage à typage statique](https://wikipedia.org/wiki/Type_system#Static_type_checking). Vous ne pouvez pas déclarer une variable, ou un paramètre de fonction, sans préciser le [type de donnée](https://vyper.readthedocs.io/en/latest/types.html). Dans le cas présent, le paramètre d'entrée est `bytes32`, une valeur de 256 bits (cela correspond à la longueur de mot native au sein de la [machine virtuelle Ethereum](/developers/docs/evm/)). La valeur de sortie est de type booléen. Par convention, les noms des paramètres d'une fonction commencent par un tiret bas (`_`).

```python
    """
    @dev Interface identification is specified in ERC-165.
    @param _interfaceID Id of the interface
    """
    return self.supportedInterfaces[_interfaceID]
```

Retourne la valeur de type HashMap contenue dans `self.supportedInterfaces`, qui est définie dans le constructeur (`__init__`).

```python
### VIEW FUNCTIONS ###
```

Ce sont les fonctions « view » qui rendent les informations sur les jetons accessibles aux utilisateurs et aux autres contrats.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Returns the number of NFTs owned by `_owner`.
         Throws if `_owner` is the zero address. NFTs assigned to the zero address are considered invalid.
    @param _owner Address for whom to query the balance.
    """
    assert _owner != ZERO_ADDRESS
```

Cette ligne [confirme](https://vyper.readthedocs.io/en/latest/statements.html#assert) le fait qu'`_owner` n'est pas égal à zéro. Si c'est le cas, il y a une erreur et l'opération est annulée.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Returns the address of the owner of the NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId The identifier for an NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    return owner
```

Dans la machine virtuelle Ethereum (EVM), tout espace mémoire qui n'a pas de valeur stockée contient zéro. Si la valeur de `_tokenId` ne contient pas de jeton, alors la valeur de `self.idToOwner[_tokenId]` est égale à zéro. Dans ce cas, la fonction annule son exécution.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Get the approved address for a single NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId ID of the NFT to query the approval of.
    """
    # Throws if `_tokenId` is not a valid NFT
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Notez que `getApproved` _peut_ retourner zéro. Si le jeton est valide, la fonction retourne `self.idToApprovals[_tokenId]`. S'il n'y a pas d'approbateur, la valeur est égale à zéro.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Checks if `_operator` is an approved operator for `_owner`.
    @param _owner The address that owns the NFTs.
    @param _operator The address that acts on behalf of the owner.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

La fonction vérifie qu'`_operator` est autorisé à gérer tous les jetons d'`_owner` dans ce contrat. Comme il peut y avoir plusieurs opérateurs, il s'agit d'une HashMap à deux dimensions.

#### Fonctions relatives au transfert {#transfer-helpers}

Ces fonctions effectuent des opérations qui concernent le transfert ou la gestion des jetons.

```python

### TRANSFER FUNCTION HELPERS ###

@view
@internal
```

Ce décorateur, `@internal`, signifie que la fonction est uniquement accessible aux autres fonctions de ce contrat. Par convention, le nom de ces fonctions commence par un tiret bas (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Returns whether the given spender can transfer a given token ID
    @param spender address of the spender to query
    @param tokenId uint256 ID of the token to be transferred
    @return bool whether the msg.sender is approved for the given token ID,
        is an operator of the owner, or is the owner of the token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Il existe trois façons d'autoriser une adresse à transférer un jeton :

1. L'adresse est le propriétaire du jeton
2. L'adresse est autorisée à utiliser ce jeton
3. L'adresse est un opérateur pour le propriétaire du jeton

La fonction ci-dessus peut être « view », car elle ne modifie par l'état. Pour réduire les coûts d'exécution, toute fonction qui _peut_ être « view » _devrait_ être « view ».

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Add a NFT to a given address
         Throws if `_tokenId` is owned by someone.
    """
    # Throws if `_tokenId` is owned by someone
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Change the owner
    self.idToOwner[_tokenId] = _to
    # Change count tracking
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Remove a NFT from a given address
         Throws if `_from` is not the current owner.
    """
    # Throws if `_from` is not the current owner
    assert self.idToOwner[_tokenId] == _from
    # Change the owner
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Change count tracking
    self.ownerToNFTokenCount[_from] -= 1
```

Lorsqu'il y a un problème avec un transfert, on annule l'appel de la fonction.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Clear an approval of a given address
         Throws if `_owner` is not the current owner.
    """
    # Throws if `_owner` is not the current owner
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Reset approvals
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Ne changez cette valeur que si c'est nécessaire. Les variables d'état se trouvent dans le stockage. Modifier le stockage est une des opérations les plus coûteuses que l'EVM (la machine virtuelle Ethereum) peut effectuer (en termes de [gaz](/developers/docs/gas/)). Par conséquent, il est préférable de l'éviter, même pour écrire que la valeur existante a un coût élevé.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Execute transfer of a NFT.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT. (NOTE: `msg.sender` not allowed in private function so pass `_sender`.)
         Throws if `_to` is the zero address.
         Throws if `_from` is not the current owner.
         Throws if `_tokenId` is not a valid NFT.
    """
```

Nous avons cette fonction interne à disposition parce qu'il existe deux façons de transférer des jetons (« normale » et « sûre »), mais nous souhaitons que cela ne se passe qu'à un seul endroit du code, afin de simplifier l'audit.

```python
    # Check requirements
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Throws if `_to` is the zero address
    assert _to != ZERO_ADDRESS
    # Clear approval. Throws if `_from` is not the current owner
    self._clearApproval(_from, _tokenId)
    # Remove NFT. Throws if `_tokenId` is not a valid NFT
    self._removeTokenFrom(_from, _tokenId)
    # Add NFT
    self._addTokenTo(_to, _tokenId)
    # Log the transfer
    log Transfer(_from, _to, _tokenId)
```

Pour émettre un évènement dans Vyper, on utilise le mot-clé `log` ([cliquer ici pour plus de détails](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Fonctions de transfert {#transfer-funs}

```python

### TRANSFER FUNCTIONS ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
    @notice The caller is responsible to confirm that `_to` is capable of receiving NFTs or else
            they maybe be permanently lost.
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Cette fonction permet d'effectuer un transfert vers l'adresse souhaitée. À moins que l'adresse représente un utilisateur ou un contract capable de transférer des jetons, tout jeton que vous transférez sera bloqué à cette adresse et rendu inutilisable.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfers the ownership of an NFT from one address to another address.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the
         approved address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
         If `_to` is a smart contract, it calls `onERC721Received` on `_to` and throws if
         the return value is not `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTE: bytes4 is represented by bytes32 with padding
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    @param _data Additional data with no specified format, sent in call to `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Il est correct d'effectuer le transfert au début parce qu'en cas de problème, nous allons de toute façon revenir en arrière, ce qui revient à annuler tout ce qui aura été fait durant l'appel.

```python
    if _to.is_contract: # check if `_to` is a contract address
```

Vérifiez d'abord si l'adresse est un contrat (si elle comporte du code). Si ce n'est pas le cas, il s'agit d'une adresse utilisateur et celui-ci pourra alors utiliser le jeton ou bien le transférer. Mais ne vous laissez pas tromper par un faux sentiment de sécurité. Vous pouvez perdre vos jetons, même avec `safeTransferFrom`, si vous les transférez vers une adresse dont personne ne connaît la clé privée.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Appelez le contrat cible pour voir s'il peut recevoir des jetons ERC-721.

```python
        # Throws if transfer destination is a contract which does not implement 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Si le destinataire est un contrat, mais qui ne peut pas recevoir de jetons ERC-721 (ou qui a choisi de refuser ce transfert en particulier), annulez.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Set or reaffirm the approved address for an NFT. The zero address indicates there is no approved address.
         Throws unless `msg.sender` is the current NFT owner, or an authorized operator of the current owner.
         Throws if `_tokenId` is not a valid NFT. (NOTE: This is not written the EIP)
         Throws if `_approved` is the current owner. (NOTE: This is not written the EIP)
    @param _approved Address to be approved for the given NFT ID.
    @param _tokenId ID of the token to be approved.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    # Throws if `_approved` is the current owner
    assert _approved != owner
```

Par convention, si vous ne souhaitez pas avoir d'approbateur, vous désignez l'adresse zéro, pas la vôtre.

```python
    # Check requirements
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Pour définir une approbation, vous pouvez être soit le propriétaire, soit un opérateur autorisé par le propriétaire.

```python
    # Set the approval
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Enables or disables approval for a third party ("operator") to manage all of
         `msg.sender`'s assets. It also emits the ApprovalForAll event.
         Throws if `_operator` is the `msg.sender`. (NOTE: This is not written the EIP)
    @notice This works even if sender doesn't own any tokens at the time.
    @param _operator Address to add to the set of authorized operators.
    @param _approved True if the operators is approved, false to revoke approval.
    """
    # Throws if `_operator` is the `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Frapper de nouveaux jetons et détruire ceux existants {#mint-burn}

Le compte qui a créé le contrat est le `minter`, un super-utilisateur autorisé à frapper de nouveaux NFT. Cependant, même lui n'est pas autorisé à détruire des jetons existants. Seul le propriétaire, ou une entité autorisée par le propriétaire, peut faire cela.

```python
### MINT & BURN FUNCTIONS ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Cette fonction retourne toujours `True`, car si l'opération échoue, elle est annulée.

```python
    """
    @dev Function to mint tokens
         Throws if `msg.sender` is not the minter.
         Throws if `_to` is zero address.
         Throws if `_tokenId` is owned by someone.
    @param _to The address that will receive the minted tokens.
    @param _tokenId The token id to mint.
    @return A boolean that indicates if the operation was successful.
    """
    # Throws if `msg.sender` is not the minter
    assert msg.sender == self.minter
```

Seul le minter (le compte qui a créé le contrat ERC-721) peut créer de nouveaux jetons. Cela peut être un problème à l'avenir dans le cas où l'on souhaiterait changer l'identité du minter. Dans un contrat en production, vous voudriez probablement une fonction qui permette au minter de transférer des privilèges de minter à quelqu'un d'autre.

```python
    # Throws if `_to` is zero address
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Par convention, la création de nouveaux jetons compte comme un transfert depuis l'adresse zéro.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Burns a specific ERC721 token.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId uint256 id of the ERC721 token to be burned.
    """
    # Check requirements
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Toute personne autorisée à transférer un jeton est autorisée à le détruire. Bien que détruire un jeton semble équivalent à le transférer à l'adresse zéro, celle-ci ne reçoit pas réellement le jeton. Cela nous permet de libérer tout l'espace de stockage qui était utilisé pour le jeton, ce qui peut réduire les frais de gaz de la transaction.

# Utiliser ce contrat {#using-contract}

Contrairement à Solidity, Vyper n'a pas de système d'héritage. Il s'agit d'un choix de conception délibéré visant à rendre le code plus clair et donc plus facile à sécuriser. Donc pour créer votre propre contrat Vyper ERC-721, vous prenez [ce contrat](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) puis vous le modifiez en fonction de la stratégie commerciale que vous souhaitez mettre en œuvre.

# Conclusion {#conclusion}

Voici les principaux points à retenir sur ce contrat :

- Pour recevoir des jetons ERC-721 par un transfert sécurisé, les contrats doivent implémenter l'interface `ERC721Receiver`.
- Même si vous effectuez un transfert sécurisé, les jetons peuvent rester bloqués si vous les envoyez à une adresse dont la clé privée est inconnue.
- Lorsqu'il y a un problème avec une opération, il est judicieux de `revert` (annuler) l'appel, plutôt que de simplement retourner une valeur d'échec.
- Les tokens ERC-721 existent lorsqu'ils ont un propriétaire.
- Il existe trois façons d'être autorisé à transférer un NFT. Vous pouvez être le propriétaire, être approuvé pour un jeton spécifique, ou être un opérateur pour tous les jetons du propriétaire.
- Les évènements antérieurs sont uniquement visibles en dehors de la blockchain. Le code exécuté à l'intérieur de la blockchain ne peut pas les voir.

Vous êtes maintenant prêts à implémenter des contrats Vyper sécurisés.
