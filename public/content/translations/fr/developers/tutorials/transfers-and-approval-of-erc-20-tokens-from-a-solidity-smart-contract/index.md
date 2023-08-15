---
title: Transferts et approbation des jetons ERC-20 à partir d'un contrat intelligent de solidity
description: Comment utiliser un contrat intelligent pour interagir avec un jeton en utilisant le langage Solidity
author: "jdourlens"
tags:
  - "contrats intelligents"
  - "jetons"
  - "solidity"
  - "erc-20"
skill: intermediate
lang: fr
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans le tutoriel précédent, nous avons étudié [l'anatomie d'un jeton ERC-20 dans Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) sur la blockchain Ethereum. Dans cet article, nous allons voir comment nous pouvons utiliser un contrat intelligent pour interagir avec un jeton en utilisant le langage Solidity.

Pour ce contrat intelligent, nous allons créer un échange décentralisé vraiment factice où un utilisateur peut échanger de l'Ethereum contre notre jeton [ERC-20](/developers/docs/standards/tokens/erc-20/) nouvellement déployé.

Pour ce tutoriel, nous utiliserons le code que nous avons écrit dans le tutoriel précédent comme base. Notre DEX instanciera une instance du contrat dans son constructeur et effectuera les opérations de :

- échange de jetons en ethers
- échange d'ethers contre des jetons

Nous allons commencer notre code d'échange décentralisé en ajoutant notre simple base de code ERC20 :

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

Notre nouveau contrat intelligent DEX déploiera l'ERC-20 et fera tout le nécessaire :

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

Nous avons à présent notre DEX et il possède toute la réserve de jetons disponibles. Le contrat a deux fonctions :

- `Acheter` : L'utilisateur peut envoyer des ethers et obtenir des jetons en échange
- `sell` : L'utilisateur peut décider d'envoyer des jetons pour récupérer des ethers

## La fonction d'achat {#the-buy-function}

Codons la fonction achat. Nous devrons d'abord vérifier la quantité d'ethers que le message contient et vérifier que les contrats possèdent suffisamment de jetons et que le message contient un peu d'ethers dedans. Si le contrat possède suffisamment de jetons, il enverra le nombre de jetons à l'utilisateur et émettra l'événement `Acheté`.

Notez que si nous appelons la fonction require dans le cas d'une erreur, l'ether envoyé sera directement restauré et restitué à l'utilisateur.

Pour garder les choses simples, il suffit d'échanger 1 jeton contre 1 Wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Dans le cas où l'achat est réussi, nous devrions voir deux événements dans la transaction : le jeton `Transfert` et l'événement `Achat`.

![Deux événements dans la transaction : Transfert et Achat](./transfer-and-bought-events.png)

## La fonction de vente {#the-sell-function}

La fonction responsable de la vente demandera d'abord à l'utilisateur d'avoir approuvé le montant en appelant la fonction d'approbation au préalable. L'approbation du transfert nécessite que le jeton ERC20Basic, instancié par le DEX, soit appelé par l'utilisateur. Ceci peut être réalisé en appelant d'abord la fonction `token()` du contrat DEX pour récupérer l'adresse où DEX a déployé le contrat ERC20Basic appelé `token`. Ensuite, nous créons une instance de ce contrat dans notre session et appelons sa fonction `approve`. Ensuite, nous pouvons appeler la fonction DEX `sell` et échanger nos jetons contre des ethers. Par exemple, voici à quoi cela ressemble dans une session de navigation interactive :

```python
#### Python in interactive brownie console...

# deploy the DEX
dex = DEX.deploy({'from':account1})

# call the buy function to swap ether for token
# 1e18 is 1 ether denominated in wei
dex.buy({'from': account2, 1e18})

# get the deployment address for the ERC20 token
# that was deployed during DEX contract creation
# dex.token() returns the deployed address for token
token = ERC20Basic.at(dex.token())

# call the token's approve function
# approve the dex address as spender
# and how many of your tokens it is allowed to spend
token.approve(dex.address, 3e18, {'from':account2})

```

Ensuite, lorsque la fonction de vente est appelée, nous vérifierons si le transfert de l’adresse de l’appelant à l’adresse du contrat a été réussi et nous retournerons ensuite les ethers à l’adresse de l’appelant.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Si tout fonctionne, vous devriez voir 2 événements (un `Transfer` et `Sold`) dans la transaction et votre solde de jetons et Ethereum mis à jour.

![Deux événements dans la transaction : le transfert et la vente](./transfer-and-sold-events.png)

<Divider />

À partir de ce tutoriel, nous avons vu comment vérifier le solde et la provision d'un jeton ERC-20 et comment appeler `Transfer` et `TransferFrom` d'un contrat intelligent ERC20 à l'aide de l'interface.

Une fois que vous avez effectué une transaction, nous avons un tutoriel JavaScript pour [attendre et obtenir des détails sur les transactions](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) qui ont été réalisées dans votre contrat et un [tutoriel pour décoder les événements générés par des transferts de jetons ou tout autre événement](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) tant que vous disposez de l'ABI.

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
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
