---
title: Transferts et approbation de jetons ERC-20 à partir d'un contrat intelligent Solidity
description: Créer un contrat intelligent de DEX qui gère les transferts et les approbations de jetons ERC-20 en utilisant Solidity.
author: "jdourlens"
tags: ["contrats intelligents", "jetons", "solidity", "erc-20"]
skill: intermediate
breadcrumb: Transferts ERC-20
lang: fr
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans le tutoriel précédent, nous avons étudié [l'anatomie d'un jeton ERC-20 en Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) sur la chaîne de blocs Ethereum. Dans cet article, nous verrons comment utiliser un contrat intelligent pour interagir avec un jeton en utilisant le langage Solidity.

Pour ce contrat intelligent, nous allons créer un véritable échange décentralisé (DEX) factice où un utilisateur peut échanger de l'ether contre notre [jeton ERC-20](/developers/docs/standards/tokens/erc-20/) nouvellement déployé.

Pour ce tutoriel, nous utiliserons le code que nous avons écrit dans le tutoriel précédent comme base. Notre DEX instanciera une instance du contrat dans son constructeur et effectuera les opérations suivantes :

- échanger des jetons contre de l'ether
- échanger de l'ether contre des jetons

Nous allons commencer le code de notre échange décentralisé en ajoutant notre base de code ERC-20 simple :

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

Notre nouveau contrat intelligent de DEX déploiera l'ERC-20 et obtiendra toute l'offre :

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

Nous avons donc maintenant notre DEX et il dispose de toute la réserve de jetons disponible. Le contrat possède deux fonctions :

- `buy` : L'utilisateur peut envoyer de l'ether et obtenir des jetons en échange
- `sell` : L'utilisateur peut décider d'envoyer des jetons pour récupérer de l'ether

## La fonction d'achat (buy) {#the-buy-function}

Codons la fonction d'achat. Nous devrons d'abord vérifier la quantité d'ether que le message contient et vérifier que le contrat possède suffisamment de jetons et que le message contient de l'ether. Si le contrat possède suffisamment de jetons, il enverra le nombre de jetons à l'utilisateur et émettra l'événement `Bought`.

Notez que si nous appelons la fonction require en cas d'erreur, l'ether envoyé sera directement annulé et rendu à l'utilisateur.

Pour faire simple, nous échangeons simplement 1 jeton contre 1 Wei.

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

Dans le cas où l'achat réussit, nous devrions voir deux événements dans la transaction : le `Transfer` du jeton et l'événement `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## La fonction de vente (sell) {#the-sell-function}

La fonction responsable de la vente exigera d'abord que l'utilisateur ait approuvé le montant en appelant la fonction approve au préalable. Approuver le transfert nécessite que le jeton ERC20Basic instancié par le DEX soit appelé par l'utilisateur. Cela peut être réalisé en appelant d'abord la fonction `token()` du contrat DEX pour récupérer l'adresse où le DEX a déployé le contrat ERC20Basic appelé `token`. Ensuite, nous créons une instance de ce contrat dans notre session et appelons sa fonction `approve`. Ensuite, nous sommes en mesure d'appeler la fonction `sell` du DEX et d'échanger nos jetons contre de l'ether. Par exemple, voici à quoi cela ressemble dans une session interactive Brownie :

```python
#### Python dans la console interactive Brownie...

# déployer le DEX
dex = DEX.deploy({'from':account1})

# appeler la fonction buy pour échanger de l'ether contre le jeton
# 1e18 est 1 ether exprimé en Wei
dex.buy({'from': account2, 1e18})

# obtenir l'adresse de déploiement du jeton ERC20
# qui a été déployé lors de la création du contrat DEX
# dex.token() renvoie l'adresse déployée pour le jeton
token = ERC20Basic.at(dex.token())

# appeler la fonction approuver du jeton
# approuver l'adresse du dex en tant que dépensier
# et combien de vos jetons il est autorisé à dépenser
token.approve(dex.address, 3e18, {'from':account2})

```

Ensuite, lorsque la fonction de vente est appelée, nous vérifierons si le transfert de l'adresse de l'appelant vers l'adresse du contrat a réussi, puis nous renverrons les ethers à l'adresse de l'appelant.

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

Si tout fonctionne, vous devriez voir 2 événements (un `Transfer` et un `Sold`) dans la transaction et votre solde de jetons ainsi que votre solde d'ether mis à jour.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

À partir de ce tutoriel, nous avons vu comment vérifier le solde et l'allocation d'un jeton ERC-20 et aussi comment appeler `Transfer` et `TransferFrom` d'un contrat intelligent ERC-20 en utilisant l'interface.

Une fois que vous avez effectué une transaction, nous avons un tutoriel JavaScript pour [attendre et obtenir des détails sur les transactions](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) qui ont été effectuées sur votre contrat et un [tutoriel pour décoder les événements générés par les transferts de jetons ou tout autre événement](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) tant que vous avez l'ABI.

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