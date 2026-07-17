---
title: Norme de jeton ERC-20
description: "Découvrez l'ERC-20, la norme pour les jetons fongibles sur Ethereum qui permet de créer des applications de jetons interopérables."
lang: fr
---

## Introduction {#introduction}

**Qu'est-ce qu'un jeton ?**

Les jetons peuvent représenter pratiquement n'importe quoi sur [Ethereum](/) :

- des points de réputation sur une plateforme en ligne
- les compétences d'un personnage dans un jeu
- des actifs financiers comme une action dans une entreprise
- une monnaie fiduciaire comme l'USD
- une once d'or
- et bien plus encore...

Une fonctionnalité aussi puissante d'Ethereum doit être gérée par une norme robuste, n'est-ce pas ? C'est exactement là que l'ERC-20 joue son rôle ! Cette norme permet aux développeurs de créer des applications de jetons qui sont interopérables avec d'autres produits et services. La norme ERC-20 est également utilisée pour fournir des fonctionnalités supplémentaires à l'[ether](/glossary/#ether).

**Qu'est-ce que l'ERC-20 ?**

L'ERC-20 introduit une norme pour les jetons fongibles, en d'autres termes, ils possèdent une propriété qui fait que chaque jeton est exactement le même (en type et en valeur) qu'un autre jeton. Par exemple, un jeton ERC-20 agit exactement comme l'ETH, ce qui signifie qu'un jeton est et sera toujours égal à tous les autres jetons.

## Prérequis {#prerequisites}

- [Comptes](/developers/docs/accounts)
- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Normes de jetons](/developers/docs/standards/tokens/)

## Corps {#body}

L'ERC-20 (Ethereum Request for Comments 20), proposé par Fabian Vogelsteller en novembre 2015, est une norme de jeton qui implémente une API pour les jetons au sein des contrats intelligents.

Exemples de fonctionnalités fournies par l'ERC-20 :

- transférer des jetons d'un compte à un autre
- obtenir le solde actuel de jetons d'un compte
- obtenir l'offre totale du jeton disponible sur le réseau
- approuver si un montant de jetons d'un compte peut être dépensé par un compte tiers

Si un contrat intelligent implémente les méthodes et événements suivants, il peut être appelé un contrat de jeton ERC-20 et, une fois déployé, il sera responsable du suivi des jetons créés sur Ethereum.

D'après l'[EIP-20](https://eips.ethereum.org/EIPS/eip-20) :

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

Voyons à quel point une norme est importante pour nous simplifier l'inspection de n'importe quel contrat de jeton ERC-20 sur Ethereum. Nous avons juste besoin de l'interface binaire-programme (ABI) du contrat pour créer une interface vers n'importe quel jeton ERC-20. Comme vous pouvez le voir ci-dessous, nous utiliserons une ABI simplifiée, pour en faire un exemple facile à aborder.

#### Exemple avec Web3.py {#web3py-example-2}

Tout d'abord, assurez-vous d'avoir installé la bibliothèque Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) :

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # ether enveloppé (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2 : DAI 2

# Ceci est une Interface Binaire d'Application (ABI) de contrat simplifiée d'un contrat de jeton ERC-20.
# Il exposera uniquement les méthodes : balanceOf(adresse), decimals(), symbol() et totalSupply()
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

### Problème de réception des jetons ERC-20 {#reception-issue}

**Au 20/06/2024, au moins 83 656 418 $ de jetons ERC-20 ont été perdus à cause de ce problème. Notez qu'une implémentation pure de l'ERC-20 est sujette à ce problème à moins que vous n'implémentiez un ensemble de restrictions supplémentaires en plus de la norme, comme indiqué ci-dessous.**

Lorsque des jetons ERC-20 sont envoyés à un contrat intelligent qui n'est pas conçu pour gérer les jetons ERC-20, ces jetons peuvent être définitivement perdus. Cela se produit parce que le contrat récepteur n'a pas la fonctionnalité pour reconnaître ou répondre aux jetons entrants, et il n'y a aucun mécanisme dans la norme ERC-20 pour notifier le contrat récepteur des jetons entrants. Les principales façons dont ce problème se manifeste sont :

1.	Mécanisme de transfert de jetons
  - Les jetons ERC-20 sont transférés à l'aide des fonctions transfer ou transferFrom
	-	Lorsqu'un utilisateur envoie des jetons à une adresse de contrat à l'aide de ces fonctions, les jetons sont transférés, que le contrat récepteur soit conçu pour les gérer ou non
2.	Manque de notification
	-	Le contrat récepteur ne reçoit pas de notification ou de rappel indiquant que des jetons lui ont été envoyés
	-	Si le contrat récepteur manque d'un mécanisme pour gérer les jetons (par exemple, une fonction de repli ou une fonction dédiée pour gérer la réception des jetons), les jetons sont effectivement bloqués à l'adresse du contrat
3.	Aucune gestion intégrée
	-	La norme ERC-20 n'inclut pas de fonction obligatoire à implémenter pour les contrats récepteurs, ce qui conduit à une situation où de nombreux contrats sont incapables de gérer correctement les jetons entrants

**Solutions possibles**

Bien qu'il ne soit pas possible d'empêcher complètement ce problème avec l'ERC-20, il existe des méthodes qui permettraient de réduire considérablement la possibilité d'une perte de jetons pour l'utilisateur final :

- Le problème le plus courant survient lorsqu'un utilisateur envoie des jetons à l'adresse du contrat de jeton lui-même (par exemple, des USDT déposés à l'adresse du contrat de jeton USDT). Il est recommandé de restreindre la fonction `transfer(..)` pour annuler de telles tentatives de transfert. Envisagez d'ajouter la vérification `require(_to != address(this));` dans l'implémentation de la fonction `transfer(..)`.
- La fonction `transfer(..)` en général n'est pas conçue pour déposer des jetons sur des contrats. Le modèle `approve(..) & transferFrom(..)` est plutôt utilisé pour déposer des jetons ERC-20 sur des contrats. Il est possible de restreindre la fonction de transfert pour interdire le dépôt de jetons sur n'importe quel contrat avec celle-ci, cependant cela peut rompre la compatibilité avec les contrats qui supposent que les jetons peuvent être déposés sur des contrats avec la fonction `transfer(..)` (par exemple, les pools de liquidité Uniswap).
- Partez toujours du principe que des jetons ERC-20 peuvent se retrouver dans votre contrat même si votre contrat n'est pas censé en recevoir. Il n'y a aucun moyen d'empêcher ou de rejeter les dépôts accidentels du côté du destinataire. Il est recommandé d'implémenter une fonction qui permettrait d'extraire les jetons ERC-20 déposés accidentellement.
- Envisagez d'utiliser des normes de jetons alternatives.

Certaines normes alternatives ont émergé de ce problème, telles que l'[ERC-223](/developers/docs/standards/tokens/erc-223) ou l'[ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Lectures complémentaires {#further-reading}

- [EIP-20 : Norme de jeton ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Jetons](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implémentation de l'ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Guide des jetons ERC-20 en Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Autres normes de jetons fongibles {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Coffres-forts tokenisés](/developers/docs/standards/tokens/erc-4626)

## Tutoriels : Construire avec l'ERC-20 sur Ethereum {#tutorials}

- [Parcours d'un contrat ERC-20](/developers/tutorials/erc20-annotated-code/) _– Un parcours annoté ligne par ligne de l'implémentation du contrat ERC-20 d'OpenZeppelin._
- [ERC-20 avec garde-fous](/developers/tutorials/erc20-with-safety-rails/) _– Comment ajouter des mesures de sécurité aux jetons ERC-20 pour aider les utilisateurs à éviter les erreurs courantes._
- [Envoyer des jetons à l'aide d'Ethers.js](/developers/tutorials/send-token-ethersjs/) _– Un guide pour débutants sur le transfert de jetons ERC-20 à l'aide d'Ethers.js._
- [Quelques astuces utilisées par les jetons frauduleux et comment les détecter](/developers/tutorials/scam-token-tricks/) _– Une exploration détaillée des modèles de jetons ERC-20 frauduleux et comment les identifier._