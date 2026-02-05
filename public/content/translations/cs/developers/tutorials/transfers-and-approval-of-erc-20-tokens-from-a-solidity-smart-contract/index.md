---
title: Převody a schválení tokenů ERC-20 z chytrého kontraktu v Solidity
description: Vytvořte chytrý kontrakt DEX, který spravuje převody a schválení tokenů ERC-20 pomocí Solidity.
author: "jdourlens"
tags: [ "smart kontrakt účty", "tokeny", "solidity", "erc-20" ]
skill: intermediate
lang: cs
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V předchozím tutoriálu jsme prostudovali [anatomii tokenu ERC-20 v Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) na blockchainu Etherea. V tomto článku si ukážeme, jak můžeme použít chytrý kontrakt k interakci s tokenem pomocí jazyka Solidity.

Pro tento chytrý kontrakt vytvoříme skutečnou zkušební decentralizovanou burzu, kde může uživatel směňovat ether za náš nově nasazený [token ERC-20](/developers/docs/standards/tokens/erc-20/).

Pro tento tutoriál použijeme kód, který jsme napsali v předchozím tutoriálu, jako základ. Naše DEX vytvoří instanci kontraktu ve svém konstruktoru a provede následující operace:

- směna tokenů za ether
- směna etheru za tokeny

Začneme s kódem naší decentralizované burzy přidáním naší jednoduché kódové základny ERC20:

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

Náš nový chytrý kontrakt DEX nasadí ERC-20 a získá všechny dodané:

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

Takže nyní máme naši DEX a ta má k dispozici celou rezervu tokenů. Kontrakt má dvě funkce:

- `buy`: Uživatel může poslat ether a na oplátku dostat tokeny
- `sell`: Uživatel se může rozhodnout poslat tokeny, aby dostal zpět ether

## Funkce buy {#the-buy-function}

Naprogramujme funkci buy. Nejprve budeme muset zkontrolovat množství etheru, které zpráva obsahuje, a ověřit, že kontrakt vlastní dostatek tokenů a že zpráva obsahuje nějaký ether. Pokud kontrakt vlastní dostatek tokenů, pošle počet tokenů uživateli a vyšle událost `Bought`.

Všimněte si, že pokud v případě chyby zavoláme funkci require, zaslaný ether bude přímo vrácen a navrácen uživateli.

Pro zjednodušení směníme 1 token za 1 wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Musíte poslat nějaký ether");
    require(amountTobuy <= dexBalance, "Nedostatek tokenů v rezervě");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

V případě, že je nákup úspěšný, měli bychom v transakci vidět dvě události: událost `Transfer` tokenu a událost `Bought`.

![Dvě události v transakci: Transfer a Bought](./transfer-and-bought-events.png)

## Funkce sell {#the-sell-function}

Funkce zodpovědná za prodej bude nejprve vyžadovat, aby uživatel schválil částku tím, že předem zavolá funkci approve. Schválení převodu vyžaduje, aby uživatel zavolal token ERC20Basic, který byl vytvořen DEXem. Toho lze dosáhnout tím, že nejprve zavoláte funkci `token()` kontraktu DEX, abyste získali adresu, kam DEX nasadila kontrakt ERC20Basic nazvaný `token`. Poté v naší relaci vytvoříme instanci tohoto kontraktu a zavoláme jeho funkci `approve`. Poté jsme schopni zavolat funkci `sell` DEXu a směnit naše tokeny zpět za ether. Například takhle to vypadá v interaktivní relaci brownie:

```python
#### Python v interaktivní konzoli brownie...

# nasadit DEX
dex = DEX.deploy({'from':account1})

# zavolat funkci buy pro směnu etheru za token
# 1e18 je 1 ether vyjádřený ve wei
dex.buy({'from': account2, 1e18})

# získat adresu nasazení pro token ERC20
# který byl nasazen při vytváření kontraktu DEX
# dex.token() vrátí adresu nasazeného tokenu
token = ERC20Basic.at(dex.token())

# zavolat funkci approve tokenu
# schválit adresu dexu jako utrácejícího
# a kolik vašich tokenů smí utratit
token.approve(dex.address, 3e18, {'from':account2})

```

Poté, když je zavolána funkce sell, zkontrolujeme, zda byl převod z adresy volajícího na adresu kontraktu úspěšný, a poté pošleme ether zpět na adresu volajícího.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Musíte prodat alespoň nějaké tokeny");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Zkontrolujte povolenou částku tokenu");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Pokud vše funguje, měli byste v transakci vidět 2 události (`Transfer` a `Sold`) a váš zůstatek tokenů a etheru by měl být aktualizován.

![Dvě události v transakci: Transfer a Sold](./transfer-and-sold-events.png)

<Divider />

V tomto tutoriálu jsme viděli, jak zkontrolovat zůstatek a povolenou částku tokenu ERC-20 a také jak volat `Transfer` a `TransferFrom` chytrého kontraktu ERC20 pomocí rozhraní.

Jakmile provedete transakci, máme JavaScriptový tutoriál, jak [počkat a získat podrobnosti o transakcích](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/), které byly provedeny na vašem kontraktu, a [tutoriál pro dekódování událostí generovaných převody tokenů nebo jinými událostmi](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), pokud máte ABI.

Zde je kompletní kód k tutoriálu:

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
        require(amountTobuy > 0, "Musíte poslat nějaký ether");
        require(amountTobuy <= dexBalance, "Nedostatek tokenů v rezervě");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Musíte prodat alespoň nějaké tokeny");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Zkontrolujte povolenou částku tokenu");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
