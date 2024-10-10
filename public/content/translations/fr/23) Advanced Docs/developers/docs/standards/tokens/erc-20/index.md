---
title: Norme de jeton ERC-20
description:
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

Un écosystème aussi puissant qu'Ethereum doit être géré selon une norme robuste, non ? C'est exactement là que l'ERC-20 joue son rôle ! Cette norme permet aux développeurs de construire des applications de jetons interopérables avec d'autres produits et services. La norme ERC-20 est également utilisée pour fournir des fonctionnalités supplémentaires à l'[ether](/glossary/#ether).

**Qu'est-ce que l'ERC-20 ?**

L'ERC-20 introduit une norme standard pour les Jetons Fongibles. En d'autres termes, ils disposent d'une propriété qui fait que chaque jeton est exactement le même (en termes de type et de valeur) qu'un autre jeton. Par exemple, un jeton ERC-20 agit exactement comme de l'ETH, ce qui signifie que 1 jeton est et sera toujours égal à tous les autres jetons.

## Prérequis {#prerequisites}

- [Comptes](/developers/docs/accounts)
- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Normes de jetons](/developers/docs/standards/tokens/)

## Présentation {#body}

La demande de commentaires ERC-20, proposée par Fabian Vogelsteller en novembre 2015, est une norme de jeton qui implémente une API pour les jetons au sein des contrats intelligents.

Exemples de fonctionnalités fournies par ERC-20 :

- transférer des jetons d'un compte à un autre
- obtenir le solde actuel du jeton d'un compte
- obtenir la quantité totale du jeton disponible sur le réseau
- approuver si un montant de jeton d'un compte peut être dépensé par un compte tiers

Si un contrat intelligent implémente les méthodes et les événements suivants, il peut être nommé Contrat de jeton ERC-20 et, une fois déployé, sera responsable d'effectuer un suivi des jetons créés sur Ethereum.

De [EIP-20](https://eips.ethereum.org/EIPS/eip-20) :

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

### Évènements {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Exemples {#web3py-example}

Voyons pourquoi une norme est importante et pourquoi elle nous facilite le contrôle de tout contrat de jeton ERC-20 sur Ethereum. Nous avons juste besoin de l'interface binaire-programme (ABI) du contrat pour créer une interface à n'importe quel jeton ERC-20. Comme vous pouvez le voir ci-dessous, nous utiliserons une ABI simplifiée, pour en faire un exemple facile à comprendre.

#### Exemple Web3.py {#web3py-example}

Pour commencer, assurez-vous d'avoir installé la bibliothèque Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) :

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-20 Token Contract.
# It will expose only the methods: balanceOf(address), decimals(), symbol() and totalSupply()
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
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## Problèmes connus {#erc20-issues}

### Problème de réception de jeton ERC-20 {#reception-issue}

Quand des jetons ERC-20 sont envoyés à un contrat intelligent qui n'est pas conçu pour traiter des jetons ERC-20, ces jetons peuvent être définitivement perdus. Cela se produit parce que le contrat destinataire n'a pas la fonctionnalité nécessaire pour reconnaître ou répondre aux jetons entrants, et il n'existe aucun mécanisme dans la norme ERC-20 pour informer le contrat destinataire des jetons entrants. Ce problème se manifeste à travers ces principaux cas :

1.  Mécanisme de transfert de jetons
  - Les jetons ERC-20 sont transférés en utilisant les fonctions transfer ou transferFrom
    -   Lorsqu'un utilisateur envoie des jetons à une adresse de contrat en utilisant ces fonctions, les jetons sont transférés indépendamment du fait que le contrat récepteur soit conçu pour les gérer ou non
2.  Manque de notification
    -   Le contrat récepteur ne reçoit pas de notification ou de rappel indiquant que des jetons lui ont été envoyés
    -   Si le contrat récepteur ne dispose pas d'un mécanisme destiné à gérer les jetons (par exemple, une fonction de rappel ou une fonction dédiée à la réception des jetons), les jetons restent effectivement bloqués à l'adresse du contrat
3.  Aucune gestion intégrée
    -   La norme ERC-20 n'inclut pas de fonction obligatoire à mettre en œuvre pour les contrats de réception, ce qui conduit à une situation où de nombreux contrats ne sont pas en mesure de gérer correctement l'arrivée de jetons

Ce problème a donné naissance à des normes alternatives, telles que l'[ERC-223](/developers/docs/standards/tokens/erc-223)

## Complément d'information {#further-reading}

- [EIP-20 : ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Tokens](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implémentation ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Guide des jetons ERC20 Solidity](https://www.alchemy.com/overviews/erc20-solidity)


## Autres normes de jetons fongibles {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Coffre-fort à jetons](/developers/docs/standards/tokens/erc-4626)