---
title: Transferuri și aprobarea de tokenuri ERC-20 dintr-un contract inteligent Solidity
description: Cum se utilizează un contract inteligent pentru a interacționa cu un token folosind limbajul Solidity
author: "jdourlens"
tags:
  ["contracte inteligente", "tokenuri", "solidity", "noțiuni de bază", "erc-20"]
skill: intermediar
lang: ro
sidebar: true
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

În tutorialul anterior am studiat [anatomia unui token ERC-20 în Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) pe Ethereum blockchain. În acest articol vom vedea cum putem folosi un contract inteligent pentru a interacționa cu un token folosind limbajul Solidity.

Pentru acest contract inteligent, vom crea un schimb descentralizat fictiv unde un utilizator poate tranzacționa Ethereum cu tokenul nostru [ERC-20](/developers/docs/standards/tokens/erc-20/) recent implementat.

Pentru acest tutorial vom folosi codul pe care l-am scris în tutorialul anterior ca bază. DEX-ul nostru va crea o instanță a contractului în constructorul său și va efectua operațiunile:

- schimbarea tokenurilor în eter
- schimbarea eterului în tokenuri

Vom începe codul nostru de schimb descentralizat prin adăugarea codului nostru de bază simplu ERC20:

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


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 100 ether;

    using SafeMath for uint256;

   constructor(uint256 total) public {
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
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
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

        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}
```

Noul nostru contract inteligent DEX va implementa ERC-20 și va obține toate informațiile furnizate:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() public {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // DE_FĂCUT
    }

    function sell(uint256 amount) public {
        // DE_FĂCUT
    }

}
```

Deci acum avem contractul nostru DEX și el are disponibile toate rezervele de tokenuri. Contractul are două funcții:

- `buy`: Utilizatorul poate trimite eter și obține tokenuri în schimb
- `sell`: Utilizatorul poate decide să trimită tokenuri pentru a obține eter înapoi

## Funcția de cumpărare {#the-buy-function}

Să programăm funcția de cumpărare. Mai întâi va trebui să verificăm cantitatea de eter pe care o conține mesajul și să verificăm dacă contractele dețin suficiente tokenuri și dacă mesajul are eter. În cazul în care contractul deține suficiente tokenuri, acesta va trimite numărul de tokenuri utilizatorului și va emite evenimentul `"Bought"`.

Reține că, dacă apelăm funcția „require” în cazul unei erori, eterul trimis va fi reîntors direct și retrimis utilizatorului.

Pentru a păstra lucrurile simple, schimbăm doar 1 token pentru 1 eter.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Trebuie să trimiți niște eter");
    require(amountTobuy <= dexBalance, "Nu există suficiente tokenuri în rezervă");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

În cazul în care cumpărarea are succes, ar trebui să vedem două evenimente în tranzacție: `Transfer`-ul de token și evenimentul `Bought`.

![Două evenimente în tranzacție: „Transfer” și „Bought”](./transfer-and-bought-events.png)

## Funcția de vânzare {#the-sell-function}

Funcția responsabilă pentru vânzare, „sell”, va solicita mai întâi utilizatorului să aprobe suma apelând în prealabil funcția „approve”. Atunci când funcția „sell” este apelată, vom verifica dacă „transferFrom" de la adresa apelantului la adresa contractului a avut succes și vom trimite eteri înapoi la adresa apelantului.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Trebuie să vinzi cel puțin câteva tokenuri");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Verifică alocația de tokenuri");
    token.transferFrom(msg.sender, address(this), amount);
    msg.sender.transfer(amount);
    emit Sold(amount);
}
```

Dacă totul merge bine ar trebui să ai 2 evenimente (un `„Transfer”` și un `„Sold”`) în tranzacție și soldul tokenului și al Ethereum actualizate.

![Două evenimente în tranzacție: „Transfer” și „Sold”](./transfer-and-bought-events.png)

<Divider />

În acest tutorial am văzut cum să verificăm soldul și alocația permisă de tokenuri ERC-20 și, de asemenea, cum să apelăm `„Transfer”` și `„TransferFrom”` ale unui contract inteligent ERC20 folosind interfața.

Odată ce ai făcut o tranzacție avem un tutorial JavaScript pentru a [aștepta și a obține detalii despre tranzacțiile](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) care au fost făcute contractului tău și un [tutorial pentru a decoda evenimente generate de transferurile de token sau orice alte evenimente](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/), atâta timp cât ai ABI-ul.

Aici este codul complet pentru acest tutorial:

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


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;

    using SafeMath for uint256;

   constructor() public {
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
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
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

        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}

contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() public {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "Trebuie să trimiți niște eter");
        require(amountTobuy <= dexBalance, "Nu există suficiente tokenuri în rezervă");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Trebuie să vinzi cel puțin câteva tokenuri");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Verifică alocația de tokenuri");
        token.transferFrom(msg.sender, address(this), amount);
        msg.sender.transfer(amount);
        emit Sold(amount);
    }

}
```
