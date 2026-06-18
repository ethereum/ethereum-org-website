---
title: Comprendre le contrat intelligent de jeton ERC-20
description: Apprenez à implémenter le standard de jeton ERC-20 avec un exemple complet de contrat intelligent Solidity et des explications.
author: "jdourlens"
tags: ["contrats intelligents", "jetons", "solidity", "erc-20"]
skill: beginner
breadcrumb: Bases des jetons ERC-20
lang: fr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

L'un des [standards de contrats intelligents](/developers/docs/standards/) les plus importants sur Ethereum est connu sous le nom d'[ERC-20](/developers/docs/standards/tokens/erc-20/), qui s'est imposé comme le standard technique utilisé pour tous les contrats intelligents sur la chaîne de blocs Ethereum pour les implémentations de jetons fongibles.

L'ERC-20 définit une liste commune de règles auxquelles tous les jetons fongibles Ethereum doivent se conformer. Par conséquent, ce standard de jeton permet aux développeurs de tous types de prédire avec précision comment les nouveaux jetons fonctionneront au sein du système Ethereum dans son ensemble. Cela simplifie et facilite les tâches des développeurs, car ils peuvent poursuivre leur travail en sachant que chaque nouveau projet n'aura pas besoin d'être refait à chaque fois qu'un nouveau jeton est publié, tant que le jeton respecte les règles.

Voici, présentées sous forme d'interface, les fonctions qu'un ERC-20 doit implémenter. Si vous n'êtes pas sûr de ce qu'est une interface : consultez notre article sur la [programmation orientée objet (POO) en Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Voici une explication ligne par ligne de l'utilité de chaque fonction. Après cela, nous présenterons une implémentation simple du jeton ERC-20.

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Renvoie la quantité de jetons existants. Cette fonction est un getter et ne modifie pas l'état du contrat. Gardez à l'esprit qu'il n'y a pas de nombres à virgule flottante (floats) en Solidity. Par conséquent, la plupart des jetons adoptent 18 décimales et renverront l'offre totale (total supply) et d'autres résultats comme suit : 1000000000000000000 pour 1 jeton. Tous les jetons n'ont pas 18 décimales et c'est une chose à laquelle vous devez vraiment faire attention lorsque vous manipulez des jetons.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Renvoie la quantité de jetons possédés par une adresse (`account`). Cette fonction est un getter et ne modifie pas l'état du contrat.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Le standard ERC-20 permet à une adresse de donner une allocation à une autre adresse pour pouvoir en retirer des jetons. Ce getter renvoie le nombre restant de jetons que le `spender` sera autorisé à dépenser au nom du `owner`. Cette fonction est un getter, ne modifie pas l'état du contrat et devrait renvoyer 0 par défaut.

## Fonctions {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Déplace le montant (`amount`) de jetons de l'adresse de l'appelant de la fonction (`msg.sender`) vers l'adresse du destinataire. Cette fonction émet l'événement `Transfer` défini plus loin. Elle renvoie true si le transfert a été possible.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Définit le montant (`allowance`) que le `spender` est autorisé à transférer depuis le solde de l'appelant de la fonction (`msg.sender`). Cette fonction émet l'événement Approval. La fonction renvoie si l'allocation a été définie avec succès.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Déplace le montant (`amount`) de jetons de `sender` vers `recipient` en utilisant le mécanisme d'allocation. Le montant est ensuite déduit de l'allocation de l'appelant. Cette fonction émet l'événement `Transfer`.

## Événements {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Cet événement est émis lorsque le montant de jetons (value) est envoyé de l'adresse `from` à l'adresse `to`.

Dans le cas de la frappe de nouveaux jetons, le transfert se fait généralement depuis (`from`) l'adresse 0x00..0000, tandis que dans le cas où l'on vient brûler des jetons, le transfert se fait vers (`to`) 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Cet événement est émis lorsque le montant de jetons (`value`) est approuvé par le `owner` pour être utilisé par le `spender`.

## Une implémentation de base des jetons ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Voici le code le plus simple sur lequel baser votre jeton ERC-20 :

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

Une autre excellente implémentation du standard de jeton ERC-20 est l'[implémentation ERC-20 d'OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).