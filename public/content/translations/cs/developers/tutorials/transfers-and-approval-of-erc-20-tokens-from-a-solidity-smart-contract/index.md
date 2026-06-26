---
title: "Převody a schvalování tokenů ERC-20 z chytrého kontraktu v Solidity"
description: "Vytvořte chytrý kontrakt pro DEX, který zpracovává převody a schvalování tokenů ERC-20 pomocí Solidity."
author: "jdourlens"
tags: ["chytré kontrakty", "tokeny", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: "Převody ERC-20"
lang: cs
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V předchozím tutoriálu jsme studovali [anatomii tokenu ERC-20 v Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) na blockchainu Etherea. V tomto článku se podíváme, jak můžeme použít chytrý kontrakt k interakci s tokenem pomocí jazyka Solidity.

Pro tento chytrý kontrakt vytvoříme skutečnou cvičnou decentralizovanou burzu (DEX), kde může uživatel směnit ether za náš nově nasazený [token ERC-20](/developers/docs/standards/tokens/erc-20/).

Pro tento tutoriál použijeme jako základ kód, který jsme napsali v předchozím tutoriálu. Naše DEX vytvoří instanci kontraktu ve svém konstruktoru a bude provádět následující operace:

- směna tokenů za ether
- směna etheru za tokeny

Kód naší decentralizované burzy začneme přidáním naší jednoduché kódové základny ERC-20:

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

Náš nový chytrý kontrakt DEX nasadí ERC-20 a získá veškerou zásobu:

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

Nyní tedy máme naši DEX a ta má k dispozici celou rezervu tokenů. Kontrakt má dvě funkce:

- `buy`: Uživatel může poslat ether a získat výměnou tokeny
- `sell`: Uživatel se může rozhodnout poslat tokeny a získat zpět ether

## Funkce buy {#the-buy-function}

Pojďme naprogramovat funkci buy. Nejprve budeme muset zkontrolovat množství etheru, které zpráva obsahuje, a ověřit, že kontrakt vlastní dostatek tokenů a že zpráva obsahuje nějaký ether. Pokud kontrakt vlastní dostatek tokenů, pošle uživateli odpovídající počet tokenů a vyvolá událost `Bought`.

Všimněte si, že pokud v případě chyby zavoláme funkci require, odeslaný ether bude okamžitě vrácen (reverted) a předán zpět uživateli.

Abychom to udrželi jednoduché, směníme prostě 1 token za 1 Wei.

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

V případě, že je nákup úspěšný, měli bychom v transakci vidět dvě události: `Transfer` tokenu a událost `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## Funkce sell {#the-sell-function}

Funkce zodpovědná za prodej bude nejprve vyžadovat, aby uživatel předem schválil částku zavoláním funkce approve. Schválení převodu vyžaduje, aby uživatel zavolal token ERC20Basic, jehož instanci vytvořila DEX. Toho lze dosáhnout tak, že nejprve zavoláme funkci `token()` kontraktu DEX, abychom získali adresu, na které DEX nasadila kontrakt ERC20Basic s názvem `token`. Poté v naší relaci vytvoříme instanci tohoto kontraktu a zavoláme jeho funkci `approve`. Následně můžeme zavolat funkci `sell` naší DEX a provést swap našich tokenů zpět za ether. Takto to například vypadá v interaktivní relaci Brownie:

```python
#### Python v interaktivní konzoli Brownie...

# nasadit DEX
dex = DEX.deploy({'from':account1})

# zavolat funkci buy pro swap etheru za token
# 1e18 je 1 ether vyjádřený ve Wei
dex.buy({'from': account2, 1e18})

# získat adresu nasazení pro ERC-20 token
# který byl nasazen během vytváření DEX kontraktu
# dex.token() vrací nasazenou adresu pro token
token = ERC20Basic.at(dex.token())

# zavolat funkci schválit u tokenu
# schválit adresu DEX jako utrácejícího
# a kolik vašich tokenů smí utratit
token.approve(dex.address, 3e18, {'from':account2})

```

Když je pak zavolána funkce sell, zkontrolujeme, zda byl převod z adresy volajícího na adresu kontraktu úspěšný, a poté pošleme ethery zpět na adresu volajícího.

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

Pokud vše funguje, měli byste v transakci vidět 2 události (`Transfer` a `Sold`) a váš zůstatek tokenů i etheru by se měl aktualizovat.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

V tomto tutoriálu jsme viděli, jak zkontrolovat zůstatek a povolený limit tokenu ERC-20 a také jak pomocí rozhraní zavolat `Transfer` a `TransferFrom` chytrého kontraktu ERC-20.

Jakmile provedete transakci, máme tutoriál v JavaScriptu, jak [počkat a získat podrobnosti o transakcích](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/), které byly provedeny s vaším kontraktem, a [tutoriál pro dekódování událostí generovaných převody tokenů nebo jakýmikoli jinými událostmi](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), pokud máte ABI.

Zde je kompletní kód pro tento tutoriál:

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