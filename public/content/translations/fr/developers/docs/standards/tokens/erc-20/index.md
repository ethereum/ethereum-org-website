---
title: Norme de jeton ERC-20
description: Learn about ERC-20, the standard for fungible tokens on Ethereum that enables interoperable token applications.
lang: fr
---

## Introduction {#introduction}

**Qu'est-ce qu'un jeton ?**

Un jeton peut représenter à peu près n'importe quoi sur Ethereum :

- Des points de réputation sur une plateforme en ligne
- Les compétences d'un personnage de jeu
- Des actifs financiers, comme une action dans une société
- Une monnaie fiduciaire comme l'EUR
- Une once d'or
- Et plus encore...

Un écosystème aussi puissant qu'Ethereum doit être géré selon une norme robuste, non ? C'est exactement là que l'ERC-20 joue son rôle ! Cette norme permet aux développeurs de créer des applications de jetons interopérables avec d'autres produits et services. La norme ERC-20 est également utilisée pour fournir des fonctionnalités supplémentaires à l'[ether](/glossary/#ether).

**Qu'est-ce que l'ERC-20 ?**

L'ERC-20 introduit une norme standard pour les Jetons Fongibles. En d'autres termes, ils disposent d'une propriété qui fait que chaque jeton est exactement le même (en termes de type et de valeur) qu'un autre jeton. Par exemple, un jeton ERC-20 agit exactement comme de l'ETH, ce qui signifie que 1 jeton est et sera toujours égal à tous les autres jetons.

## Prérequis {#prerequisites}

- [Comptes](/developers/docs/accounts)
- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Norme de jetons](/developers/docs/standards/tokens/)

## Corps {#body}

La demande de commentaires ERC-20, proposée par Fabian Vogelsteller en novembre 2015, est une norme de jeton qui
implémente une API pour les jetons au sein des contrats intelligents.

Exemples de fonctionnalités fournies par ERC-20 :

- transférer des jetons d'un compte à un autre
- obtenir le solde actuel du jeton d'un compte
- obtenir la quantité totale du jeton disponible sur le réseau
- approuver si un montant de jeton d'un compte peut être dépensé par un compte tiers

Si un contrat intelligent implémente les méthodes et les événements suivants, il peut être nommé Contrat de jeton ERC-20 et, une fois déployé, sera responsable d'effectuer un suivi des jetons créés sur Ethereum.

Provenant de l'[EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Méthodes {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### Événements {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Exemples {#web3py-example}

Voyons pourquoi une norme est importante et pourquoi elle nous facilite le contrôle de tout contrat de jeton ERC-20 sur Ethereum.
Nous avons juste besoin de l'interface binaire-programme (ABI) du contrat pour créer une interface à n'importe quel jeton ERC-20. Comme vous pouvez le voir ci-dessous, nous utiliserons une ABI simplifiée, pour en faire un exemple facile à comprendre.

#### Exemple Web3.py {#web3py-example}

Tout d'abord, assurez-vous d'avoir installé la bibliothèque Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) :

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Ether enveloppé (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2 : DAI 2

# Ceci est une Interface Binaire d'Application (ABI) de contrat simplifiée d'un contrat de jeton ERC-20.
# Elle exposera uniquement les méthodes : balanceOf(address), decimals(), symbol() et totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
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
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Offre totale :", totalSupply)
print("Solde de l'adresse :", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Offre totale :", totalSupply)
print("Solde de l'adresse :", addr_balance)
```

## Problèmes connus {#erc20-issues}

### Problème de réception de jetons ERC-20 {#reception-issue}

**Au 20 juin 2024, au moins 83 656 418 dollars de jetons ERC-20 ont été perdus en raison de ce problème. Notez qu'une implémentation pure d'ERC-20 est sujette à ce problème, à moins que vous n'implémentiez un ensemble de restrictions supplémentaires à la norme, comme indiqué ci-dessous.**

Quand des jetons ERC-20 sont envoyés à un contrat intelligent qui n'est pas conçu pour traiter des jetons ERC-20, ces jetons peuvent être définitivement perdus. Cela se produit parce que le contrat destinataire n'a pas la fonctionnalité nécessaire pour reconnaître ou répondre aux jetons entrants, et il n'existe aucun mécanisme dans la norme ERC-20 pour informer le contrat destinataire des jetons entrants. Ce problème se manifeste à travers ces principaux cas :

1. Mécanisme de transfert de jetons

- Les jetons ERC-20 sont transférés en utilisant les fonctions transfer ou transferFrom
  - Lorsqu'un utilisateur envoie des jetons à une adresse de contrat en utilisant ces fonctions, les jetons sont transférés indépendamment du fait que le contrat récepteur soit conçu pour les gérer ou non

2. Manque de notification
   - Le contrat récepteur ne reçoit pas de notification ou de rappel indiquant que des jetons lui ont été envoyés
   - Si le contrat récepteur ne dispose pas d'un mécanisme destiné à gérer les jetons (par exemple, une fonction de rappel ou une fonction dédiée à la réception des jetons), les jetons restent effectivement bloqués à l'adresse du contrat
3. Aucune gestion intégrée
   - La norme ERC-20 n'inclut pas de fonction obligatoire à mettre en œuvre pour les contrats de réception, ce qui conduit à une situation où de nombreux contrats ne sont pas en mesure de gérer correctement l'arrivée de jetons

**Solutions envisageables**

Bien qu’il ne soit pas possible d’éliminer complètement ce problème avec l’ERC-20, il existe des méthodes permettant de réduire significativement le risque de perte de jetons pour l’utilisateur final :

- Le problème le plus courant survient lorsqu'un utilisateur envoie des jetons à l'adresse du contrat du jeton lui-même (par exemple, des USDT déposés à l'adresse du contrat du jeton USDT). Il est recommandé de restreindre la fonction `transfer(..)` pour annuler de telles tentatives de transfert. Envisagez d'ajouter la vérification `require(_to != address(this));` dans l'implémentation de la fonction `transfer(..)`.
- En général, la fonction `transfer(..)` n'est pas conçue pour déposer des jetons dans des contrats. `approve(..) Pour déposer des jetons ERC-20 sur des contrats, on utilise plutôt le modèle `transferFrom(..)`. Il est possible de restreindre la fonction de transfert afin d'empêcher le dépôt de jetons vers des contrats. Toutefois, cela peut rompre la compatibilité avec certains contrats qui supposent que les jetons peuvent être déposés via la fonction `transfer(..)` (par exemple, les pools de liquidité d’Uniswap).
- Supposons toujours que les jetons ERC-20 peuvent se retrouver dans votre contrat même si votre contrat n'est jamais censé en recevoir. Il n'y a aucun moyen d'empêcher ou de rejeter les dépôts accidentels du côté des destinataires. Il est recommandé de mettre en œuvre une fonction qui permettrait d'extraire des jetons ERC-20 déposés accidentellement.
- Envisagez d'utiliser d'autres normes de jetons.

Certaines normes alternatives ont vu le jour suite à ce problème, comme [l'ERC-223](/developers/docs/standards/tokens/erc-223) ou [l'ERC-1363](/developers/docs/standards/tokens/erc-1363).

## En savoir plus {#further-reading}

- [EIP-20 : Standard de jeton ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Jetons](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implémentation de l'ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Guide des jetons ERC20 Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Autres normes de jetons fongibles {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Coffres-forts tokenisés](/developers/docs/standards/tokens/erc-4626)
