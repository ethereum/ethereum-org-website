---
title: Comprendre le contrat intelligent de jeton ERC-20
description: Introduction au déploiement de votre premier contrat intelligent sur un réseau de test Ethereum
author: "jdourlens"
tags:
  - "contrats intelligents"
  - "jetons"
  - "solidity"
  - "erc-20"
skill: beginner
lang: fr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

L'un des plus importantes [normes de contrat intelligent](/developers/docs/standards/) sur Ethereum est connue sous le nom de [ERC-20](/developers/docs/standards/tokens/ERC-20/), qui est apparu comme le standard technique de référence pour tous les contrats intelligents sur la blockchain Ethereum pour les implémentations de jetons fongibles.

ERC-20 définit une liste commune de règles auxquelles tous les jetons Ethereum fongibles devraient adhérer. Par conséquent, cette norme de jeton permet aux développeurs de tous types de prédire avec précision comment de nouveaux jetons fonctionneront au sein du système Ethereum dans son ensemble. Cela simplifie et facilite les tâches des développeurs, car ils peuvent se concentrer sur leur travail tout en sachant que chacun de leurs projets et chaque nouveau projet n'aura pas besoin d'être refait ou modifié à chaque fois qu'un nouveau jeton est publié, à condition que le jeton respecte les règles.

Voici les fonctions, présentées comme une interface, que tout jeton ERC-20 doit implémenter. Si vous n'êtes pas sûr de ce qu'est une interface : consultez notre article sur la programmation [orientée objet dans Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

```solidity
pragma solidity ^0.6.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Voici une explication ligne par ligne de ce à quoi sert chaque fonction. Après cela, nous présenterons une implémentation simple du jeton ERC-20.

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Renvoie le nombre total de jetons existants. Cette fonction est un getter et ne modifie pas l'état du contrat. Gardez à l'esprit qu'il n'y a pas de nombres décimaux dans Solidity. C'est pourquoi la plupart des jetons adoptent 18 décimales et retournent le total des jetons ainsi que d'autres résultats sous la forme de 1000000000000000000 pour 1 jeton. Tous les jetons n'ont pas nécessairement 18 décimales et c'est donc un élément à surveiller lorsqu'on manipule des jetons.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Renvoie le nombre de jetons détenus par une adresse (`compte`). Cette fonction est un getter et ne modifie pas l'état du contrat.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

La norme ERC-20 permet à une adresse de donner une allocation (« allowance ») à une autre adresse pour pouvoir récupérer des jetons à partir de celle-ci. Ce getter retourne le nombre restant de jetons que le `dépenseur` sera autorisé à dépenser au nom du `propriétaire`. Cette fonction est un getter et ne modifie pas l'état du contrat et doit retourner 0 par défaut.

## Fonctions {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Déplace le montant `amount` de jetons de l'adresse de l'appelant de la fonction (`msg.sender`) à l'adresse du destinataire. Cette fonction émet l'événement `Transfert` que nous expliquerons plus tard. Il renvoie « vrai » si le transfert a été possible.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Définit le montant de `l'allocation` que le dépenseur `spender` est autorisé à transférer à partir du solde de l'appelant de la fonction (`msg.sender`). Cette fonction émet l'événement d'approbation « Approval ». La fonction retourne si l'allocation a été mise en place avec succès.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Déplace le montant `amount` de jetons de `l'expéditeur` vers `le destinataire` en utilisant le mécanisme de provision « allowance ». le montant est ensuite déduit de la provision « allowance » de l'appelant. Cette fonction émet l'événement `Transfert` .

## Événements {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Cet événement est émis lorsque le nombre de jetons (valeur) est envoyé depuis l'adresse `de` à l'adresse `à`.

Dans le cas du minage de nouveaux jetons, le transfert s'opère généralement `depuis` l'adresse 0x00..000 alors que dans le cas d'une destruction de jetons, le transfert s'opère `vers` l'adresse 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Cet événement est émis lorsque le nombre de jetons (`value`) est approuvé par le propriétaire `owner` pour etre utilisé par le dépenseur `spender`.

## Une implémentation basique des jetons ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Voici le code le plus simple possible à prendre comme base pour votre jeton ERC-20 :

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
    balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
    return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
```

Une autre excellente implémentation de la norme de jeton ERC-20 est l'implémentation [OpenZeppelin ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
