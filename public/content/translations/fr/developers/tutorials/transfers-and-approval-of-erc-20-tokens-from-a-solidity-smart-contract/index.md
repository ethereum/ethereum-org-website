---
title: "Transferts et approbation de jetons ERC-20 à partir d'un contrat intelligent Solidity"
description: "Construire un contrat intelligent DEX qui gère les transferts et les approbations de jetons ERC-20 en utilisant Solidity."
author: "jdourlens"
tags:
  [
    "contrats intelligents",
    "jetons",
    "solidité",
    "erc-20"
  ]
skill: intermediate
lang: fr
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans le tutoriel précédent, nous avons étudié [l'anatomie d'un jeton ERC-20 dans Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) sur la blockchain Ethereum. Dans cet article, nous verrons comment nous pouvons utiliser un contrat intelligent pour interagir avec un jeton en utilisant le langage Solidity.

Pour ce contrat intelligent, nous allons créer un véritable échange décentralisé factice où un utilisateur pourra échanger de l'éther contre notre [jeton ERC-20](/developers/docs/standards/tokens/erc-20/) nouvellement déployé.

Pour ce tutoriel, nous utiliserons le code que nous avons écrit dans le tutoriel précédent comme base. Notre DEX instanciera une instance du contrat dans son constructeur et effectuera les opérations suivantes :

- échanger des jetons contre de l'éther
- échanger de l'éther contre des jetons

Nous allons commencer le code de notre échange décentralisé en ajoutant notre base de code ERC20 simple :

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

Notre nouveau contrat intelligent DEX déploiera l'ERC-20 et obtiendra toute la réserve de jetons :

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

Nous avons donc maintenant notre DEX et il dispose de toute la réserve de jetons. Le contrat a deux fonctions :

- `buy` : L'utilisateur peut envoyer de l'éther et obtenir des jetons en échange
- `sell` : L'utilisateur peut envoyer des jetons pour récupérer de l'éther

## La fonction buy {#the-buy-function}

Codons la fonction buy. Nous devrons d'abord vérifier la quantité d'éther que le message contient et vérifier que le contrat possède suffisamment de jetons et que le message contient bien de l'éther. Si le contrat possède suffisamment de jetons, il enverra le nombre de jetons à l'utilisateur et émettra l'événement `Bought`.

Notez que si nous appelons la fonction `require`, en cas d'erreur, l'éther envoyé sera directement annulé et rendu à l'utilisateur.

Pour simplifier, nous échangeons simplement 1 jeton contre 1 wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Vous devez envoyer de l'éther");
    require(amountTobuy <= dexBalance, "Pas assez de jetons dans la réserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Si l'achat réussit, nous devrions voir deux événements dans la transaction : l'événement de jeton `Transfer` et l'événement `Bought`.

![Deux événements dans la transaction : Transfer et Bought](./transfer-and-bought-events.png)

## La fonction sell {#the-sell-function}

La fonction responsable de la vente exigera d'abord que l'utilisateur ait approuvé le montant en appelant au préalable la fonction `approve`. L'approbation du transfert exige que le jeton ERC20Basic instancié par le DEX soit appelé par l'utilisateur. Cela peut être réalisé en appelant d'abord la fonction `token()` du contrat DEX pour récupérer l'adresse où le DEX a déployé le contrat ERC20Basic appelé `token`. Ensuite, nous créons une instance de ce contrat dans notre session et appelons sa fonction `approve`. Ensuite, nous pouvons appeler la fonction `sell` du DEX et échanger nos jetons contre de l'éther. Par exemple, voici à quoi cela ressemble dans une session interactive de Brownie :

```python
#### Python in interactive brownie console...

# déployer le DEX
dex = DEX.deploy({'from':account1})

# appeler la fonction buy pour échanger de l'éther contre un jeton
# 1e18 correspond à 1 éther exprimé en wei
dex.buy({'from': account2, 1e18})

# obtenir l'adresse de déploiement du jeton ERC20
# qui a été déployé lors de la création du contrat DEX
# dex.token() renvoie l'adresse déployée pour le jeton
token = ERC20Basic.at(dex.token())

# appeler la fonction approve du jeton
# approuver l'adresse du dex en tant que dépensier
# et le nombre de vos jetons qu'il est autorisé à dépenser
token.approve(dex.address, 3e18, {'from':account2})

```

Ensuite, lorsque la fonction `sell` est appelée, nous vérifierons si le transfert depuis l'adresse de l'appelant vers l'adresse du contrat a réussi, puis nous renverrons l'éther à l'adresse de l'appelant.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Vous devez vendre au moins quelques jetons");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Vérifiez l'allocation de jetons");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Si tout fonctionne, vous devriez voir 2 événements (un `Transfer` et un `Sold`) dans la transaction, et votre solde de jetons ainsi que votre solde d'éther mis à jour.

![Deux événements dans la transaction : Transfer et Sold](./transfer-and-sold-events.png)

<Divider />

Dans ce tutoriel, nous avons vu comment vérifier le solde et l'allocation d'un jeton ERC-20, ainsi que la manière d'appeler `Transfer` et `TransferFrom` d'un contrat intelligent ERC20 en utilisant l'interface.

Une fois que vous avez effectué une transaction, nous avons un tutoriel JavaScript pour [attendre et obtenir les détails sur les transactions](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) qui ont été effectuées sur votre contrat et un [tutoriel pour décoder les événements générés par les transferts de jetons ou tout autre événement](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) tant que vous avez l'ABI.

Voici le code complet du tutoriel :

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


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "Vous devez envoyer de l'éther");
        require(amountTobuy <= dexBalance, "Pas assez de jetons dans la réserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Vous devez vendre au moins quelques jetons");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Vérifiez l'allocation de jetons");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
