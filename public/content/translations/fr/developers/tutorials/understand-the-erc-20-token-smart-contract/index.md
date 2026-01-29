---
title: Comprendre le contrat intelligent de jeton ERC-20
description: "Apprenez à mettre en œuvre la norme de jeton ERC-20 avec un exemple complet de contrat intelligent Solidity et son explication."
author: "jdourlens"
tags:
  [
    "contrats intelligents",
    "jetons",
    "solidité",
    "erc-20"
  ]
skill: beginner
lang: fr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

L'une des [normes de contrat intelligent](/developers/docs/standards/) les plus importantes sur Ethereum est connue sous le nom d'[ERC-20](/developers/docs/standards/tokens/erc-20/). Elle s'est imposée comme la norme technique utilisée pour tous les contrats intelligents sur la blockchain Ethereum pour les implémentations de jetons fongibles.

L'ERC-20 définit une liste commune de règles auxquelles tous les jetons Ethereum fongibles doivent adhérer. Par conséquent, cette norme de jeton permet aux développeurs de tous types de prédire avec précision comment les nouveaux jetons fonctionneront au sein du système Ethereum. Cela simplifie et facilite la tâche des développeurs, car ils peuvent poursuivre leur travail, sachant que les projets n'auront pas besoin d'être refaits à chaque sortie d'un nouveau jeton, tant que ce dernier respecte les règles.

Voici, présentées sous forme d'interface, les fonctions qu'un ERC-20 doit mettre en œuvre. Si vous n'êtes pas sûr de ce qu'est une interface, consultez notre article sur [la programmation orientée objet dans Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Renvoie le nombre total de jetons existants. Cette fonction est un getter et ne modifie pas l'état du contrat. Gardez à l'esprit qu'il n'y a pas de nombres à virgule flottante dans Solidity. Par conséquent, la plupart des jetons adoptent 18 décimales et renvoient l'offre totale et d'autres résultats sous la forme 1000000000000000000 pour 1 jeton. Tous les jetons n'ont pas 18 décimales, et c'est un point auquel vous devez vraiment faire attention lorsque vous manipulez des jetons.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Renvoie la quantité de jetons détenus par une adresse (`compte`). Cette fonction est un getter et ne modifie pas l'état du contrat.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

La norme ERC-20 permet à une adresse de donner une allocation (« allowance ») à une autre adresse afin que cette dernière puisse en retirer des jetons. Ce getter renvoie le nombre de jetons restants que le `spender` sera autorisé à dépenser au nom du `owner`. Cette fonction est un getter, ne modifie pas l'état du contrat et doit renvoyer 0 par défaut.

## Fonctions {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Déplace la quantité (`amount`) de jetons de l'adresse de l'appelant de la fonction (`msg.sender`) à l'adresse du destinataire. Cette fonction émet l'événement `Transfer` défini plus loin. Elle renvoie `true` si le transfert a été possible.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Définit le montant de l'`allowance` que le `spender` est autorisé à transférer depuis le solde de l'appelant de la fonction (`msg.sender`). Cette fonction émet l'événement `Approval`. La fonction renvoie une valeur indiquant si l'allocation a été définie avec succès.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Déplace la quantité (`amount`) de jetons de `sender` à `recipient` en utilisant le mécanisme d'allocation. La quantité `amount` est ensuite déduite de l'allocation de l'appelant. Cette fonction émet l'événement `Transfer`.

## Événements {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Cet événement est émis lorsque la quantité de jetons (`value`) est envoyée de l'adresse `from` à l'adresse `to`.

En cas de frappe de nouveaux jetons, le transfert est généralement `from` l'adresse 0x00..0000, tandis qu'en cas de destruction (« burn ») de jetons, le transfert est `to` l'adresse 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Cet événement est émis lorsque la quantité de jetons (`value`) est approuvée par le `owner` pour être utilisée par le `spender`.

## Une implémentation basique des jetons ERC-20 {#a-basic-implementation-of-erc-20-tokens}

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

Une autre excellente implémentation de la norme de jeton ERC-20 est l'[implémentation ERC-20 d'OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
