---
title: Norme de jeton non fongible ERC-721
description: Découvrez l'ERC-721, la norme pour les jetons non fongibles (NFT) qui représentent des actifs numériques uniques sur Ethereum.
lang: fr
---

## Introduction {#introduction}

**Qu'est-ce qu'un jeton non fongible ?**

Un jeton non fongible (NFT) est utilisé pour identifier quelque chose ou quelqu'un de manière unique. Ce type de jeton est parfait pour être utilisé sur des plateformes qui proposent des objets de collection, des clés d'accès, des billets de loterie, des places numérotées pour des concerts et des matchs de sport, etc. Ce type spécial de jeton offre des possibilités incroyables, il mérite donc une norme appropriée, et l'ERC-721 est venu résoudre ce problème !

**Qu'est-ce que l'ERC-721 ?**

L'ERC-721 introduit une norme pour les NFT, en d'autres termes, ce type de jeton est unique et peut avoir une valeur différente d'un autre jeton issu du même contrat intelligent, peut-être en raison de son âge, de sa rareté ou même d'autre chose comme son aspect visuel. Attendez, visuel ?

Oui ! Tous les NFT ont une variable `uint256` appelée `tokenId`, donc pour tout contrat ERC-721, la paire `contract address, uint256 tokenId` doit être globalement unique. Cela dit, une application décentralisée (dapp) peut avoir un « convertisseur » qui utilise le `tokenId` comme entrée et produit une image de quelque chose de cool, comme des zombies, des armes, des compétences ou d'incroyables chatons !

## Prérequis {#prerequisites}

- [Comptes](/developers/docs/accounts/)
- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Normes de jetons](/developers/docs/standards/tokens/)

## Corps {#body}

L'ERC-721 ([Ethereum](/) Request for Comments 721), proposé par William Entriken, Dieter Shirley, Jacob Evans et Nastassia Sachs en janvier 2018, est une norme de jeton non fongible qui implémente une API pour les jetons au sein des contrats intelligents.

Il fournit des fonctionnalités telles que le transfert de jetons d'un compte à un autre, l'obtention du solde actuel de jetons d'un compte, l'obtention du propriétaire d'un jeton spécifique et également l'offre totale du jeton disponible sur le réseau. En plus de celles-ci, il possède également d'autres fonctionnalités comme approuver qu'une quantité de jetons d'un compte puisse être déplacée par un compte tiers.

Si un contrat intelligent implémente les méthodes et événements suivants, il peut être appelé contrat de jeton non fongible ERC-721 et, une fois déployé, il sera responsable du suivi des jetons créés sur Ethereum.

D'après l'[EIP-721](https://eips.ethereum.org/EIPS/eip-721) :

### Méthodes {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

### Événements {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Exemples {#web3py-example}

Voyons à quel point une norme est importante pour nous simplifier l'inspection de tout contrat de jeton ERC-721 sur Ethereum.
Nous avons juste besoin de l'interface binaire-programme (ABI) du contrat pour créer une interface vers n'importe quel jeton ERC-721. Comme vous pouvez le voir ci-dessous, nous utiliserons une ABI simplifiée, pour en faire un exemple facile à aborder.

#### Exemple avec Web3.py {#web3py-example-2}

Tout d'abord, assurez-vous d'avoir installé la bibliothèque Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) :

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Contrat CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Enchères de vente CryptoKitties

# Il s'agit d'une interface binaire d'application (ABI) de contrat simplifiée d'un contrat NFT ERC-721.
# Il n'exposera que les méthodes : balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Utilisation de l'ABI de l'événement Transfer pour obtenir des informations sur les Kitties transférés.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Nous avons besoin de la signature de l'événement pour filtrer les journaux
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Remarques :
#   - Augmentez le nombre de blocs au-delà de 120 si aucun événement Transfer n'est renvoyé.
#   - Si vous n'avez trouvé aucun événement Transfer, vous pouvez également essayer d'obtenir un tokenId sur :
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Cliquez pour développer les journaux de l'événement et copiez son argument "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Collez le "tokenId" ici à partir du lien ci-dessus
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Le contrat CryptoKitties possède des événements intéressants autres que ceux de la norme.

Vérifions deux d'entre eux, `Pregnant` et `Birth`.

```python
# Utilisation de l'ABI des événements Pregnant et Birth pour obtenir des informations sur les nouveaux Kitties.
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# Nous avons besoin de la signature de l'événement pour filtrer les journaux
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Voici un événement Pregnant :
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Voici un événement Birth :
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT populaires {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) répertorie les meilleurs NFT sur Ethereum par volume de transferts.
- [CryptoKitties](https://www.cryptokitties.co/) est un jeu centré sur des créatures reproductibles, des objets de collection et tellement adorables que nous appelons CryptoKitties.
- [Sorare](https://sorare.com/) est un jeu mondial de fantasy football où vous pouvez rassembler des objets de collection en éditions limitées, gérer vos équipes et concourir pour gagner des prix.
- [L'Ethereum Name Service (ENS)](https://ens.domains/) offre un moyen sécurisé et décentralisé d'adresser des ressources à la fois sur et hors de la chaîne de blocs en utilisant des noms simples et lisibles par l'homme.
- [POAP](https://poap.xyz) distribue des NFT gratuits aux personnes qui assistent à des événements ou effectuent des actions spécifiques. Les POAP sont gratuits à créer et à distribuer.
- [Unstoppable Domains](https://unstoppabledomains.com/) est une entreprise basée à San Francisco qui crée des domaines sur des chaînes de blocs. Les domaines de chaîne de blocs remplacent les adresses de cryptomonnaie par des noms lisibles par l'homme et peuvent être utilisés pour permettre des sites Web résistants à la censure.
- [Gods Unchained Cards](https://godsunchained.com/) est un jeu de cartes à collectionner (TCG) sur la chaîne de blocs Ethereum qui utilise des NFT pour apporter une véritable propriété aux actifs du jeu.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) est une collection de 10 000 NFT uniques qui, en plus d'être une œuvre d'art dont la rareté est prouvable, agit comme un jeton d'adhésion au club, offrant des avantages aux membres qui augmentent avec le temps grâce aux efforts de la communauté.

## Lectures complémentaires {#further-reading}

- [EIP-721 : Norme de jeton non fongible ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Documentation ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implémentation ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API NFT d'Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Tutoriels : Construire avec des jetons non fongibles (ERC-721) sur Ethereum {#tutorials}

- [Tutoriel sur le contrat ERC-721 avec Vyper](/developers/tutorials/erc-721-vyper-annotated-code/) _– Une présentation annotée d'un contrat NFT ERC-721 complet écrit en Vyper._
- [Comment écrire et déployer un NFT (Partie 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– Guide étape par étape pour écrire et déployer votre premier contrat intelligent ERC-721._
- [Comment frapper un NFT (Partie 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– Comment frapper un NFT ERC-721 en utilisant votre contrat intelligent déployé et Web3._
- [Comment voir votre NFT dans votre portefeuille (Partie 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– Comment afficher votre NFT frappé dans MetaMask après le déploiement._
- [Tutoriel de frappe de NFT](/developers/tutorials/nft-minter/) _– Créez une application décentralisée (dapp) complète de frappe de NFT avec une interface React, MetaMask et Alchemy._